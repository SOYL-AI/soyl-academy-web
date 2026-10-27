/**
 * ModelClient: the single metered entry point for model calls (D-021, CLAUDE.md rule 6).
 * Every call: estimate worst-case cost → reserve against the BudgetGuard (refused if it would
 * exceed a cap) → call the provider → meter actual tokens into INR paise → settle → emit a
 * UsageRecord to the sink. Structured calls validate the JSON against the zod schema and allow
 * one repair round-trip.
 */
import type { z } from 'zod/v4';
import { MODELS, costPaise, type ModelTier, type TokenUsage } from '@soyl/shared/config/models';
import { BudgetGuard, type BudgetLedger } from './budget';
import { parseJsonOutput, toJsonSchema } from './json-schema';
import { StreamInterruptedError } from './errors';
import { estimateMessagesTokens, estimateTokens } from './tokens';
import type {
  BatchStatus,
  ChatRequest,
  ChatResult,
  ModelProvider,
  ProviderRequest,
  RawCompletion,
  StructuredRequest,
  StructuredResult,
  UsageRecord,
} from './types';

export class StructuredOutputError extends Error {
  constructor(
    message: string,
    readonly issues: string[],
    readonly text: string,
    readonly calls: UsageRecord[],
  ) {
    super(message);
    this.name = 'StructuredOutputError';
  }
}

export interface ModelClientOptions {
  provider: ModelProvider;
  budget?: BudgetLedger;
  /** Receives every usage record (write it to the ledger / ai_requests). */
  onUsage?: (record: UsageRecord) => void | Promise<void>;
  /** Repair round-trips allowed when structured output fails validation. */
  maxRepairs?: number;
  now?: () => Date;
}

export interface BatchSubmitItem<T = unknown> {
  customId: string;
  request: ChatRequest | StructuredRequest<T>;
}

export type BatchFetchResult<T = unknown> =
  | { customId: string; ok: true; data: T; text: string; usage: UsageRecord }
  | { customId: string; ok: false; error: string; usage: UsageRecord | null };

function isStructured<T>(req: ChatRequest | StructuredRequest<T>): req is StructuredRequest<T> {
  return 'schema' in req && !!req.schema;
}

function issuesOf(error: z.ZodError): string[] {
  return error.issues.slice(0, 20).map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`);
}

export class ModelClient {
  readonly provider: ModelProvider;
  readonly budget: BudgetLedger;
  private readonly batchReservations = new Map<string, { id: number; paise: number }>();

  constructor(private readonly opts: ModelClientOptions) {
    this.provider = opts.provider;
    this.budget = opts.budget ?? BudgetGuard.unlimited();
  }

  /** Worst-case cost of a request in paise: estimated prompt tokens + the full output allowance. */
  estimateCostPaise(req: ChatRequest, opts: { batch?: boolean; extraInputTokens?: number } = {}): number {
    const usage: TokenUsage = {
      input_tokens: estimateMessagesTokens(req.messages) + (opts.extraInputTokens ?? 0),
      cached_input_tokens: 0,
      output_tokens: req.maxOutputTokens ?? MODELS[req.tier].max_output_tokens,
    };
    return costPaise(req.tier, usage, { batch: opts.batch });
  }

  private record(tier: ModelTier, raw: RawCompletion, latencyMs: number, batch: boolean, meta: ChatRequest['meta']): UsageRecord {
    return {
      provider: this.provider.name,
      model: raw.model,
      tier,
      usage: raw.usage,
      cost_paise: costPaise(tier, raw.usage, { batch }),
      batch,
      simulated: this.provider.simulated,
      latency_ms: latencyMs,
      request_id: raw.requestId,
      at: (this.opts.now?.() ?? new Date()).toISOString(),
      meta,
    };
  }

  private async emit(record: UsageRecord): Promise<void> {
    await this.opts.onUsage?.(record);
  }

  private async call(req: ProviderRequest, extraInputTokens = 0): Promise<{ raw: RawCompletion; usage: UsageRecord }> {
    const reservation = await this.budget.reserve(this.estimateCostPaise(req, { extraInputTokens }));
    const started = performance.now();
    let raw: RawCompletion;
    try {
      raw = await this.provider.complete(req);
    } catch (error) {
      await this.budget.release(reservation);
      throw error;
    }
    const usage = this.record(req.tier, raw, Math.round(performance.now() - started), false, req.meta);
    await this.budget.settle(reservation, usage.cost_paise);
    await this.emit(usage);
    return { raw, usage };
  }

  async chat(req: ChatRequest): Promise<ChatResult> {
    const { raw, usage } = await this.call(req);
    return { text: raw.text, finishReason: raw.finishReason, usage };
  }

  async stream(req: ChatRequest, onDelta: (text: string) => void): Promise<ChatResult> {
    if (!this.provider.stream) {
      const result = await this.chat(req);
      onDelta(result.text);
      return result;
    }
    const reservation = await this.budget.reserve(this.estimateCostPaise(req));
    const started = performance.now();
    let raw: RawCompletion;
    try {
      raw = await this.provider.stream(req, onDelta);
    } catch (error) {
      if (error instanceof StreamInterruptedError && error.partialText) {
        // Output was produced before the failure/cancel: meter it (estimated tokens) like a finished call.
        const partial: RawCompletion = {
          text: error.partialText,
          finishReason: error.cancelled ? 'cancelled' : 'interrupted',
          usage: { input_tokens: estimateMessagesTokens(req.messages), cached_input_tokens: 0, output_tokens: estimateTokens(error.partialText) },
          model: this.provider.simulated ? 'mock' : 'unknown',
          requestId: null,
        };
        const usage = this.record(req.tier, partial, Math.round(performance.now() - started), false, req.meta);
        await this.budget.settle(reservation, usage.cost_paise);
        await this.emit(usage);
        error.usage = usage;
      } else {
        await this.budget.release(reservation);
      }
      throw error;
    }
    const usage = this.record(req.tier, raw, Math.round(performance.now() - started), false, req.meta);
    await this.budget.settle(reservation, usage.cost_paise);
    await this.emit(usage);
    return { text: raw.text, finishReason: raw.finishReason, usage };
  }

  /** The provider request for a structured call (JSON Schema derived from the zod schema). */
  providerRequest<T>(req: StructuredRequest<T> | ChatRequest): ProviderRequest {
    if (!isStructured(req)) return req;
    const { schema, schemaName, ...rest } = req;
    return { ...rest, responseFormat: { name: schemaName, schema: toJsonSchema(schema) } };
  }

  async structured<T>(req: StructuredRequest<T>): Promise<StructuredResult<T>> {
    const maxRepairs = this.opts.maxRepairs ?? 1;
    const base = this.providerRequest(req);
    const schemaTokens = Math.ceil(JSON.stringify(base.responseFormat?.schema ?? {}).length / 4);
    const calls: UsageRecord[] = [];
    let messages = base.messages;
    for (let attempt = 0; ; attempt++) {
      const { raw, usage } = await this.call({ ...base, messages }, schemaTokens);
      calls.push(usage);
      const issues = this.validate(req.schema, raw.text);
      if (issues.ok) return { data: issues.data, text: raw.text, usage, calls, repairs: attempt };
      if (attempt >= maxRepairs)
        throw new StructuredOutputError(`structured output for ${req.schemaName} failed validation after ${attempt + 1} call(s)`, issues.issues, raw.text, calls);
      messages = [
        ...base.messages,
        { role: 'assistant', content: raw.text },
        {
          role: 'user',
          content: `That JSON does not satisfy the schema. Fix these problems and return the complete corrected JSON only:\n- ${issues.issues.join('\n- ')}`,
        },
      ];
    }
  }

  private validate<T>(schema: z.ZodType<T>, text: string): { ok: true; data: T } | { ok: false; issues: string[] } {
    let parsed: unknown;
    try {
      parsed = parseJsonOutput(text);
    } catch (error) {
      return { ok: false, issues: [`not valid JSON: ${(error as Error).message}`] };
    }
    const result = schema.safeParse(parsed);
    return result.success ? { ok: true, data: result.data } : { ok: false, issues: issuesOf(result.error) };
  }

  get supportsBatch(): boolean {
    return !!this.provider.batch;
  }

  /** Submits a Batch job. Reserves the worst-case batch-priced cost of all items up front. */
  async submitBatch(items: BatchSubmitItem[]): Promise<{ jobId: string; reservedPaise: number }> {
    const batch = this.provider.batch;
    if (!batch) throw new Error(`provider ${this.provider.name} does not support Batch`);
    const requests = items.map((it) => ({ customId: it.customId, request: this.providerRequest(it.request) }));
    const estimate = requests.reduce((sum, r) => sum + this.estimateCostPaise(r.request, { batch: true }), 0);
    const reservation = await this.budget.reserve(estimate);
    let jobId: string;
    try {
      ({ jobId } = await batch.submit(requests));
    } catch (error) {
      await this.budget.release(reservation);
      throw error;
    }
    this.batchReservations.set(jobId, reservation);
    return { jobId, reservedPaise: estimate };
  }

  async pollBatch(jobId: string): Promise<BatchStatus> {
    const batch = this.provider.batch;
    if (!batch) throw new Error(`provider ${this.provider.name} does not support Batch`);
    return batch.poll(jobId);
  }

  /**
   * Fetches a finished Batch job and validates each item against its request's schema. Settles the
   * reservation made at submit (or records the spend directly when resumed in another process).
   */
  async fetchBatch(jobId: string, items: BatchSubmitItem[]): Promise<BatchFetchResult[]> {
    const batch = this.provider.batch;
    if (!batch) throw new Error(`provider ${this.provider.name} does not support Batch`);
    const byId = new Map(items.map((it) => [it.customId, it]));
    const raw = await batch.fetch(jobId);
    const out: BatchFetchResult[] = [];
    let spent = 0;
    for (const r of raw) {
      const item = byId.get(r.customId);
      if (!item) continue;
      if (!r.ok) {
        out.push({ customId: r.customId, ok: false, error: r.error, usage: null });
        continue;
      }
      const usage = this.record(item.request.tier, r.completion, 0, true, item.request.meta);
      spent += usage.cost_paise;
      await this.emit(usage);
      if (isStructured(item.request)) {
        const v = this.validate(item.request.schema, r.completion.text);
        out.push(v.ok ? { customId: r.customId, ok: true, data: v.data, text: r.completion.text, usage } : { customId: r.customId, ok: false, error: v.issues.join('; '), usage });
      } else {
        out.push({ customId: r.customId, ok: true, data: r.completion.text, text: r.completion.text, usage });
      }
    }
    for (const id of byId.keys()) if (!raw.some((r) => r.customId === id)) out.push({ customId: id, ok: false, error: 'missing from batch output', usage: null });
    const reservation = this.batchReservations.get(jobId);
    if (reservation) {
      this.batchReservations.delete(jobId);
      await this.budget.settle(reservation, spent);
    } else {
      await this.budget.record(spent);
    }
    return out;
  }
}

/**
 * Azure OpenAI provider over the v1 REST API (`{endpoint}/openai/v1/...`), keyless: a bearer token
 * from a TokenCredential (DefaultAzureCredential → managed identity in Azure, `az login` locally;
 * INFRA-5). No API keys are accepted.
 *
 * - Chat completions with optional JSON Schema response_format.
 * - Retries on 408/429/5xx/network errors with backoff + jitter, honouring retry-after(-ms).
 * - A concurrency limiter shared by all calls from this provider instance.
 * - Batch: JSONL upload (purpose=batch) → /batches → poll → output file (half price).
 * - Streaming via SSE (hook for the AI gateway in M4).
 */
import { MODELS, MODEL_TIERS, type ModelTier, type TokenUsage } from '@soyl/shared/config/models';
import { createLimiter, type Limiter } from '../limiter';
import { HttpError, withRetry, type RetryOptions } from '../retry';
import type { BatchCapability, BatchItemResult, BatchState, ModelProvider, ProviderRequest, RawCompletion } from '../types';

export const COGNITIVE_SERVICES_SCOPE = 'https://cognitiveservices.azure.com/.default';

/** Structural subset of @azure/identity's TokenCredential, so tests can pass a fake. */
export interface TokenCredentialLike {
  getToken(scopes: string | string[]): Promise<{ token: string; expiresOnTimestamp: number } | null>;
}

export interface AzureOpenAIConfig {
  /** e.g. https://soyl-aoai-dev.openai.azure.com (no trailing path). */
  endpoint: string;
  deployments: Record<ModelTier, string>;
  /** Global-Batch deployments; default to `deployments`. */
  batchDeployments?: Partial<Record<ModelTier, string>>;
  credential: TokenCredentialLike;
  fetch?: typeof fetch;
  concurrency?: number;
  retry?: Partial<RetryOptions>;
  timeoutMs?: number;
  /**
   * Reasoning models reject a non-default temperature, so it is not sent unless this is true.
   * Templates still record the temperature they asked for.
   */
  sendTemperature?: boolean;
}

interface ChatCompletionResponse {
  id?: string;
  model?: string;
  choices?: { message?: { content?: string | null; refusal?: string | null }; finish_reason?: string }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number; prompt_tokens_details?: { cached_tokens?: number } };
}

function usageFrom(body: ChatCompletionResponse): TokenUsage {
  return {
    input_tokens: body.usage?.prompt_tokens ?? 0,
    cached_input_tokens: body.usage?.prompt_tokens_details?.cached_tokens ?? 0,
    output_tokens: body.usage?.completion_tokens ?? 0,
  };
}

export class AzureOpenAIProvider implements ModelProvider {
  readonly name = 'azure';
  readonly simulated = false;
  private readonly base: string;
  private readonly fetchImpl: typeof fetch;
  private readonly limit: Limiter;
  private token: { value: string; expires: number } | null = null;

  constructor(private readonly config: AzureOpenAIConfig) {
    if (!/^https:\/\//.test(config.endpoint)) throw new Error('AzureOpenAIProvider: endpoint must be an https URL');
    for (const tier of MODEL_TIERS) if (!config.deployments[tier]) throw new Error(`AzureOpenAIProvider: no deployment for tier "${tier}" (${MODELS[tier].deployment_env})`);
    this.base = `${config.endpoint.replace(/\/+$/, '')}/openai/v1`;
    this.fetchImpl = config.fetch ?? globalThis.fetch;
    this.limit = createLimiter(config.concurrency ?? 4);
  }

  deployment(tier: ModelTier, batch = false): string {
    return (batch ? this.config.batchDeployments?.[tier] : undefined) ?? this.config.deployments[tier];
  }

  private async authHeader(): Promise<string> {
    const now = Date.now();
    if (!this.token || this.token.expires - now < 5 * 60_000) {
      const t = await this.config.credential.getToken(COGNITIVE_SERVICES_SCOPE);
      if (!t) throw new Error('AzureOpenAIProvider: credential returned no token');
      this.token = { value: t.token, expires: t.expiresOnTimestamp };
    }
    return `Bearer ${this.token.value}`;
  }

  /** The JSON body for a chat completion; exported for tests and for Batch lines. */
  body(req: ProviderRequest, opts: { batch?: boolean; stream?: boolean } = {}): Record<string, unknown> {
    const body: Record<string, unknown> = {
      model: this.deployment(req.tier, opts.batch),
      messages: req.messages,
      max_completion_tokens: req.maxOutputTokens ?? MODELS[req.tier].max_output_tokens,
    };
    if (req.reasoningEffort) body.reasoning_effort = req.reasoningEffort;
    if (this.config.sendTemperature && req.temperature !== undefined) body.temperature = req.temperature;
    if (req.responseFormat)
      body.response_format = { type: 'json_schema', json_schema: { name: req.responseFormat.name, schema: req.responseFormat.schema, strict: false } };
    if (opts.stream) {
      body.stream = true;
      body.stream_options = { include_usage: true };
    }
    return body;
  }

  private async request(path: string, init: RequestInit & { json?: unknown } = {}): Promise<Response> {
    return this.limit(() =>
      withRetry(async () => {
        const headers = new Headers(init.headers);
        headers.set('authorization', await this.authHeader());
        headers.set('x-ms-client-request-id', crypto.randomUUID());
        let body = init.body;
        if (init.json !== undefined) {
          headers.set('content-type', 'application/json');
          body = JSON.stringify(init.json);
        }
        const res = await this.fetchImpl(`${this.base}${path}`, {
          method: init.method ?? (body ? 'POST' : 'GET'),
          headers,
          body,
          signal: AbortSignal.timeout(this.config.timeoutMs ?? 600_000),
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new HttpError(res.status, `Azure OpenAI ${path} → HTTP ${res.status}: ${text.slice(0, 500)}`, res.headers, text);
        }
        return res;
      }, this.config.retry),
    );
  }

  async complete(req: ProviderRequest): Promise<RawCompletion> {
    const res = await this.request('/chat/completions', { method: 'POST', json: this.body(req) });
    const body = (await res.json()) as ChatCompletionResponse;
    return this.toCompletion(body, res.headers.get('apim-request-id') ?? res.headers.get('x-request-id') ?? body.id ?? null);
  }

  private toCompletion(body: ChatCompletionResponse, requestId: string | null): RawCompletion {
    const choice = body.choices?.[0];
    if (choice?.message?.refusal) throw new Error(`model refused: ${choice.message.refusal}`);
    return {
      text: choice?.message?.content ?? '',
      finishReason: choice?.finish_reason ?? 'unknown',
      usage: usageFrom(body),
      model: body.model ?? 'unknown',
      requestId,
    };
  }

  async stream(req: ProviderRequest, onDelta: (text: string) => void): Promise<RawCompletion> {
    const res = await this.request('/chat/completions', { method: 'POST', json: this.body(req, { stream: true }) });
    if (!res.body) throw new Error('stream: empty body');
    const decoder = new TextDecoder();
    let buffer = '';
    let text = '';
    let finishReason = 'unknown';
    let model = 'unknown';
    let usage: TokenUsage = { input_tokens: 0, cached_input_tokens: 0, output_tokens: 0 };
    for await (const chunk of res.body as unknown as AsyncIterable<Uint8Array>) {
      buffer += decoder.decode(chunk, { stream: true });
      let nl: number;
      while ((nl = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') continue;
        const event = JSON.parse(data) as ChatCompletionResponse & { choices?: { delta?: { content?: string }; finish_reason?: string }[] };
        if (event.model) model = event.model;
        if (event.usage) usage = usageFrom(event);
        const choice = event.choices?.[0];
        const delta = choice?.delta?.content;
        if (delta) {
          text += delta;
          onDelta(delta);
        }
        if (choice?.finish_reason) finishReason = choice.finish_reason;
      }
    }
    return { text, finishReason, usage, model, requestId: res.headers.get('apim-request-id') };
  }

  readonly batch: BatchCapability = {
    submit: async (items) => {
      const jsonl = items
        .map((it) => JSON.stringify({ custom_id: it.customId, method: 'POST', url: '/chat/completions', body: this.body(it.request, { batch: true }) }))
        .join('\n');
      const form = new FormData();
      form.set('purpose', 'batch');
      form.set('file', new Blob([jsonl], { type: 'application/jsonl' }), 'batch.jsonl');
      const fileRes = await this.request('/files', { method: 'POST', body: form });
      const file = (await fileRes.json()) as { id: string };
      const batchRes = await this.request('/batches', {
        method: 'POST',
        json: { input_file_id: file.id, endpoint: '/chat/completions', completion_window: '24h' },
      });
      const batch = (await batchRes.json()) as { id: string };
      return { jobId: batch.id };
    },
    poll: async (jobId) => {
      const res = await this.request(`/batches/${encodeURIComponent(jobId)}`);
      const b = (await res.json()) as { status: string; request_counts?: { total?: number; completed?: number; failed?: number } };
      const known: BatchState[] = ['validating', 'in_progress', 'finalizing', 'completed', 'failed', 'expired', 'cancelled'];
      const state = (known.includes(b.status as BatchState) ? b.status : b.status === 'cancelling' ? 'in_progress' : 'failed') as BatchState;
      return {
        jobId,
        state,
        counts: { total: b.request_counts?.total ?? 0, completed: b.request_counts?.completed ?? 0, failed: b.request_counts?.failed ?? 0 },
      };
    },
    fetch: async (jobId) => {
      const res = await this.request(`/batches/${encodeURIComponent(jobId)}`);
      const b = (await res.json()) as { output_file_id?: string | null; error_file_id?: string | null };
      const results: BatchItemResult[] = [];
      for (const fileId of [b.output_file_id, b.error_file_id]) {
        if (!fileId) continue;
        const content = await (await this.request(`/files/${encodeURIComponent(fileId)}/content`)).text();
        for (const line of content.split('\n')) {
          if (!line.trim()) continue;
          const row = JSON.parse(line) as {
            custom_id: string;
            response?: { status_code?: number; request_id?: string; body?: ChatCompletionResponse };
            error?: { message?: string } | null;
          };
          if (row.response?.status_code === 200 && row.response.body) {
            try {
              results.push({ customId: row.custom_id, ok: true, completion: this.toCompletion(row.response.body, row.response.request_id ?? null) });
            } catch (error) {
              results.push({ customId: row.custom_id, ok: false, error: (error as Error).message });
            }
          } else {
            results.push({
              customId: row.custom_id,
              ok: false,
              error: row.error?.message ?? `HTTP ${row.response?.status_code ?? '?'}: ${JSON.stringify(row.response?.body ?? {}).slice(0, 300)}`,
            });
          }
        }
      }
      return results;
    },
  };
}

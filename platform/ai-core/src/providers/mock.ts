/**
 * Deterministic mock provider. Same seed + same request → same output, byte for byte.
 *
 * - Requests carrying `mock.fixture` are answered by the registered fixture function (the content
 *   pipeline registers one per asset type, so the whole pipeline runs offline and lint-clean).
 * - Other structured requests get a minimal instance of their JSON Schema.
 * - Plain chat gets a visibly placeholder sentence.
 *
 * Everything it returns is placeholder text and must never be presented as real content: the
 * model name is "mock" and callers record it in provenance. GEN-3: refuses to construct in
 * production unless `unsafeAllowInProduction` is passed (tests only).
 */
import { assertMockAllowed, type Env } from '../env';
import { sampleFromJsonSchema } from '../json-schema';
import { createRng, hashString, type Rng } from '../rng';
import { estimateMessagesTokens, estimateTokens } from '../tokens';
import type { BatchCapability, BatchItemResult, ModelProvider, ProviderRequest, RawCompletion } from '../types';

export const MOCK_MODEL = 'mock';

export interface MockFixtureContext {
  input: unknown;
  rng: Rng;
  seed: string;
  request: ProviderRequest;
}
export type MockFixture = (ctx: MockFixtureContext) => unknown;

export interface MockProviderOptions {
  seed?: string | number;
  fixtures?: Record<string, MockFixture>;
  env?: Env;
  /** Test-only escape hatch for GEN-3. */
  unsafeAllowInProduction?: boolean;
  /** Simulated failures for tests: return an error for the n-th call (0-based) by message. */
  failOnCall?: (callIndex: number, req: ProviderRequest) => Error | null;
}

function requestKey(req: ProviderRequest): string {
  return JSON.stringify([req.tier, req.messages, req.responseFormat?.name ?? null, req.mock ?? null]);
}

export class MockProvider implements ModelProvider {
  readonly name = 'mock';
  readonly simulated = true;
  readonly seed: string;
  private readonly fixtures: Map<string, MockFixture>;
  private calls = 0;
  private readonly jobs = new Map<string, BatchItemResult[]>();

  constructor(private readonly opts: MockProviderOptions = {}) {
    assertMockAllowed('MockProvider', opts.env ?? process.env, opts.unsafeAllowInProduction);
    this.seed = String(opts.seed ?? 'soyl');
    this.fixtures = new Map(Object.entries(opts.fixtures ?? {}));
  }

  register(name: string, fixture: MockFixture): void {
    this.fixtures.set(name, fixture);
  }

  hasFixture(name: string): boolean {
    return this.fixtures.has(name);
  }

  private produce(req: ProviderRequest): string {
    const rng = createRng(`${this.seed}|${hashString(requestKey(req))}`);
    if (req.mock?.fixture) {
      const fixture = this.fixtures.get(req.mock.fixture);
      if (!fixture) throw new Error(`MockProvider: no fixture registered for "${req.mock.fixture}"`);
      return JSON.stringify(fixture({ input: req.mock.input, rng, seed: this.seed, request: req }));
    }
    if (req.responseFormat) return JSON.stringify(sampleFromJsonSchema(req.responseFormat.schema, rng));
    return `[MOCK] Placeholder response from the mock provider (seed ${this.seed}). Not real content.`;
  }

  async complete(req: ProviderRequest): Promise<RawCompletion> {
    const index = this.calls++;
    const failure = this.opts.failOnCall?.(index, req);
    if (failure) throw failure;
    const text = this.produce(req);
    return {
      text,
      finishReason: 'stop',
      usage: { input_tokens: estimateMessagesTokens(req.messages), cached_input_tokens: 0, output_tokens: estimateTokens(text) },
      model: MOCK_MODEL,
      requestId: `mock-${index}`,
    };
  }

  async stream(req: ProviderRequest, onDelta: (text: string) => void): Promise<RawCompletion> {
    const result = await this.complete(req);
    for (let i = 0; i < result.text.length; i += 64) onDelta(result.text.slice(i, i + 64));
    return result;
  }

  readonly batch: BatchCapability = {
    submit: async (items) => {
      const jobId = `mock-batch-${hashString(this.seed + items.map((i) => i.customId).join(','))}-${this.jobs.size}`;
      const results: BatchItemResult[] = [];
      for (const item of items) {
        try {
          results.push({ customId: item.customId, ok: true, completion: await this.complete(item.request) });
        } catch (error) {
          results.push({ customId: item.customId, ok: false, error: (error as Error).message });
        }
      }
      this.jobs.set(jobId, results);
      return { jobId };
    },
    poll: async (jobId) => {
      const results = this.jobs.get(jobId);
      if (!results) return { jobId, state: 'expired', counts: { total: 0, completed: 0, failed: 0 } };
      const failed = results.filter((r) => !r.ok).length;
      return { jobId, state: 'completed', counts: { total: results.length, completed: results.length - failed, failed } };
    },
    fetch: async (jobId) => {
      const results = this.jobs.get(jobId);
      if (!results) throw new Error(`MockProvider: unknown batch job ${jobId} (mock jobs live in memory only)`);
      return results;
    },
  };
}

/**
 * Embeddings for tutor retrieval (ARCHITECTURE §10, ADR-014). Same rules as chat calls: one metered
 * client, keyless auth, a deterministic mock.
 *
 * - AzureOpenAIEmbedder: POST {endpoint}/openai/v1/embeddings with a bearer token (managed identity).
 * - MockEmbedder: a hashed bag-of-words vector (deterministic, unit length). Texts that share words
 *   get a higher cosine similarity, so pgvector retrieval can be tested in CI without a model.
 *   GEN-3: refuses production.
 */
import { EMBEDDING_MODEL } from '@soyl/shared/config/models';
import { assertMockAllowed, type Env } from './env';
import { CallerAbortedError } from './errors';
import { createRng, hashString } from './rng';
import { estimateTokens } from './tokens';
import { COGNITIVE_SERVICES_SCOPE, type TokenCredentialLike } from './providers/azure';
import { withRetry, HttpError, type RetryOptions } from './retry';

export interface EmbeddingResult {
  vectors: number[][];
  inputTokens: number;
  /** Metered cost in paise (unrounded). */
  costPaise: number;
  simulated: boolean;
}

export interface Embedder {
  readonly name: string;
  readonly model: string;
  readonly dimensions: number;
  readonly simulated: boolean;
  embed(texts: string[], signal?: AbortSignal): Promise<EmbeddingResult>;
}

export function embeddingCostPaise(inputTokens: number): number {
  return (inputTokens * EMBEDDING_MODEL.price_inr_per_1m.input * 100) / 1_000_000;
}

/** Lower-cased letter/number runs (any script). */
export function wordsOf(text: string): string[] {
  return (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).filter((w) => w.length > 1);
}

export class MockEmbedder implements Embedder {
  readonly name = 'mock';
  readonly model = 'mock-embedding';
  readonly simulated = true;
  constructor(
    readonly dimensions: number = EMBEDDING_MODEL.dimensions,
    opts: { env?: Env; unsafeAllowInProduction?: boolean } = {},
  ) {
    assertMockAllowed('MockEmbedder', opts.env ?? process.env, opts.unsafeAllowInProduction);
  }

  vector(text: string): number[] {
    const v = new Array<number>(this.dimensions).fill(0);
    for (const w of wordsOf(text)) {
      const rng = createRng(hashString(w));
      // Three buckets per word, signed: a sparse random projection.
      for (let k = 0; k < 3; k++) v[Math.floor(rng.next() * this.dimensions)]! += rng.next() < 0.5 ? -1 : 1;
    }
    const norm = Math.sqrt(v.reduce((n, x) => n + x * x, 0)) || 1;
    return v.map((x) => x / norm);
  }

  async embed(texts: string[], signal?: AbortSignal): Promise<EmbeddingResult> {
    if (signal?.aborted) throw new CallerAbortedError();
    const inputTokens = texts.reduce((n, t) => n + estimateTokens(t), 0);
    return { vectors: texts.map((t) => this.vector(t)), inputTokens, costPaise: embeddingCostPaise(inputTokens), simulated: true };
  }
}

export interface AzureEmbedderConfig {
  endpoint: string;
  deployment: string;
  credential: TokenCredentialLike;
  dimensions?: number;
  fetch?: typeof fetch;
  retry?: Partial<RetryOptions>;
  timeoutMs?: number;
}

export class AzureOpenAIEmbedder implements Embedder {
  readonly name = 'azure';
  readonly simulated = false;
  readonly dimensions: number;
  readonly model: string;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly config: AzureEmbedderConfig) {
    if (!/^https:\/\//.test(config.endpoint)) throw new Error('AzureOpenAIEmbedder: endpoint must be an https URL');
    this.dimensions = config.dimensions ?? EMBEDDING_MODEL.dimensions;
    this.model = config.deployment;
    this.fetchImpl = config.fetch ?? globalThis.fetch;
  }

  async embed(texts: string[], signal?: AbortSignal): Promise<EmbeddingResult> {
    const url = `${this.config.endpoint.replace(/\/+$/, '')}/openai/v1/embeddings`;
    const res = await withRetry(async () => {
      if (signal?.aborted) throw new CallerAbortedError();
      const token = await this.config.credential.getToken(COGNITIVE_SERVICES_SCOPE);
      if (!token) throw new Error('AzureOpenAIEmbedder: credential returned no token');
      const timeout = AbortSignal.timeout(this.config.timeoutMs ?? 60_000);
      const r = await this.fetchImpl(url, {
        method: 'POST',
        headers: { authorization: `Bearer ${token.token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model: this.config.deployment, input: texts, dimensions: this.dimensions }),
        signal: signal ? AbortSignal.any([timeout, signal]) : timeout,
      });
      if (!r.ok) {
        const text = await r.text().catch(() => '');
        throw new HttpError(r.status, `Azure OpenAI embeddings → HTTP ${r.status}: ${text.slice(0, 300)}`, r.headers, text);
      }
      return r;
    }, this.config.retry);
    const body = (await res.json()) as { data?: { index: number; embedding: number[] }[]; usage?: { prompt_tokens?: number } };
    const vectors = [...(body.data ?? [])].sort((a, b) => a.index - b.index).map((d) => d.embedding);
    if (vectors.length !== texts.length) throw new Error(`AzureOpenAIEmbedder: expected ${texts.length} vectors, got ${vectors.length}`);
    const inputTokens = body.usage?.prompt_tokens ?? texts.reduce((n, t) => n + estimateTokens(t), 0);
    return { vectors, inputTokens, costPaise: embeddingCostPaise(inputTokens), simulated: false };
  }
}

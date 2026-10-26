/**
 * Retries with exponential backoff and jitter for 429 and 5xx responses, honouring the server's
 * retry-after-ms / retry-after headers (Azure OpenAI sends both on 429).
 */

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly headers: Headers = new Headers(),
    readonly body: string = '',
  ) {
    super(message);
    this.name = 'HttpError';
  }

  get retryable(): boolean {
    return this.status === 408 || this.status === 429 || this.status >= 500;
  }
}

export interface RetryOptions {
  /** Retries after the first attempt. */
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  /** Upper bound on a server-requested wait; longer waits are capped to this. */
  maxRetryAfterMs: number;
  random: () => number;
  sleep: (ms: number) => Promise<void>;
  onRetry?: (info: { attempt: number; delayMs: number; error: unknown }) => void;
}

export const DEFAULT_RETRY: RetryOptions = {
  maxRetries: 5,
  baseDelayMs: 1_000,
  maxDelayMs: 60_000,
  maxRetryAfterMs: 120_000,
  random: Math.random,
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

/** Server-requested delay in ms, or null. Accepts retry-after-ms, retry-after seconds, or an HTTP date. */
export function retryAfterMs(headers: Headers, now: number = Date.now()): number | null {
  const ms = headers.get('retry-after-ms');
  if (ms !== null && ms.trim() !== '' && Number.isFinite(Number(ms))) return Math.max(0, Number(ms));
  const ra = headers.get('retry-after');
  if (ra === null || ra.trim() === '') return null;
  if (/^\d+(\.\d+)?$/.test(ra.trim())) return Math.max(0, Number(ra) * 1000);
  const date = Date.parse(ra);
  return Number.isNaN(date) ? null : Math.max(0, date - now);
}

/** Exponential backoff with "equal jitter": half fixed, half random. */
export function backoffMs(attempt: number, opts: Pick<RetryOptions, 'baseDelayMs' | 'maxDelayMs' | 'random'>): number {
  const exp = Math.min(opts.maxDelayMs, opts.baseDelayMs * 2 ** attempt);
  return Math.round(exp / 2 + opts.random() * (exp / 2));
}

export function isRetryable(error: unknown): boolean {
  if (error instanceof HttpError) return error.retryable;
  // Network failures from fetch surface as TypeError ("fetch failed") or AbortError on timeout.
  return error instanceof TypeError || (error instanceof Error && (error.name === 'AbortError' || error.name === 'TimeoutError'));
}

export async function withRetry<T>(fn: (attempt: number) => Promise<T>, options: Partial<RetryOptions> = {}): Promise<T> {
  const opts = { ...DEFAULT_RETRY, ...options };
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      if (attempt >= opts.maxRetries || !isRetryable(error)) throw error;
      const serverDelay = error instanceof HttpError ? retryAfterMs(error.headers) : null;
      const delayMs = serverDelay !== null ? Math.min(serverDelay, opts.maxRetryAfterMs) : backoffMs(attempt, opts);
      opts.onRetry?.({ attempt: attempt + 1, delayMs, error });
      await opts.sleep(delayMs);
    }
  }
}

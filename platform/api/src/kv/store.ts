/**
 * Key-value store behind rate limits, OTP lockouts and OAuth state (ARCHITECTURE §4 "Redis").
 * Two implementations: in-memory (local/tests, single process) and ioredis (CI redis:7, Azure Managed
 * Redis). Every operation that must be atomic is atomic in both (Lua on Redis, synchronous in memory).
 * Callers pass `now` (ms) so tests can use a fake clock.
 */
export interface WindowResult {
  /** True when the hit was recorded (count before the hit was below the limit). */
  allowed: boolean;
  /** Hits in the window after this call. */
  count: number;
  /** When allowed=false: ms until the oldest hit leaves the window. */
  retryAfterMs: number;
}

export interface KeyValueStore {
  readonly kind: 'memory' | 'redis';
  get(key: string, now: number): Promise<string | null>;
  set(key: string, value: string, ttlMs: number, now: number): Promise<void>;
  /** Sets only if absent. Returns true when set. */
  setIfAbsent(key: string, value: string, ttlMs: number, now: number): Promise<boolean>;
  /** Returns the value and deletes it (single use). */
  take(key: string, now: number): Promise<string | null>;
  del(key: string): Promise<void>;
  /**
   * Sliding window: if fewer than `limit` hits within `windowMs` before `now`, record a hit and return
   * allowed=true; otherwise record nothing and return allowed=false with retryAfterMs.
   */
  windowHit(key: string, windowMs: number, limit: number, now: number): Promise<WindowResult>;
  /** Hits within the window, without recording. */
  windowCount(key: string, windowMs: number, now: number): Promise<number>;
  /** Records a hit unconditionally; returns the count in the window after it. */
  windowAdd(key: string, windowMs: number, now: number): Promise<number>;
  ping(): Promise<void>;
  close(): Promise<void>;
}

export class KvUnavailableError extends Error {
  constructor(cause?: unknown) {
    super('key-value store unavailable', { cause });
    this.name = 'KvUnavailableError';
  }
}

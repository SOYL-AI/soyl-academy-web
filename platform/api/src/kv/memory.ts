/**
 * In-memory KeyValueStore for local development and tests (D-008). Single process only: config
 * refuses to run stg/prod without REDIS_URL. Expired entries are dropped lazily.
 */
import { KvUnavailableError, type KeyValueStore, type WindowResult } from './store';

interface Entry {
  value: string;
  expiresAt: number;
}

export class MemoryKv implements KeyValueStore {
  readonly kind = 'memory' as const;
  private values = new Map<string, Entry>();
  private windows = new Map<string, number[]>();
  /** Test hook: when true, every call throws (fault injection for API-16). */
  failing = false;

  private check() {
    if (this.failing) throw new KvUnavailableError(new Error('memory kv: injected failure'));
  }

  private live(key: string, now: number): Entry | undefined {
    const e = this.values.get(key);
    if (e && e.expiresAt <= now) {
      this.values.delete(key);
      return undefined;
    }
    return e;
  }

  async get(key: string, now: number) {
    this.check();
    return this.live(key, now)?.value ?? null;
  }

  async set(key: string, value: string, ttlMs: number, now: number) {
    this.check();
    this.values.set(key, { value, expiresAt: now + ttlMs });
  }

  async setIfAbsent(key: string, value: string, ttlMs: number, now: number) {
    this.check();
    if (this.live(key, now)) return false;
    this.values.set(key, { value, expiresAt: now + ttlMs });
    return true;
  }

  async take(key: string, now: number) {
    this.check();
    const e = this.live(key, now);
    this.values.delete(key);
    return e?.value ?? null;
  }

  async del(key: string) {
    this.check();
    this.values.delete(key);
    this.windows.delete(key);
  }

  private hits(key: string, windowMs: number, now: number): number[] {
    const list = (this.windows.get(key) ?? []).filter((t) => t > now - windowMs && t <= now);
    this.windows.set(key, list);
    return list;
  }

  async windowHit(key: string, windowMs: number, limit: number, now: number): Promise<WindowResult> {
    this.check();
    const list = this.hits(key, windowMs, now);
    if (list.length >= limit) {
      const oldest = list[0] ?? now;
      return { allowed: false, count: list.length, retryAfterMs: Math.max(1, oldest + windowMs - now) };
    }
    list.push(now);
    return { allowed: true, count: list.length, retryAfterMs: 0 };
  }

  async windowCount(key: string, windowMs: number, now: number) {
    this.check();
    return this.hits(key, windowMs, now).length;
  }

  async windowAdd(key: string, windowMs: number, now: number) {
    this.check();
    const list = this.hits(key, windowMs, now);
    list.push(now);
    return list.length;
  }

  async ping() {
    this.check();
  }

  async close() {
    this.clear();
  }

  /** Test helper. */
  clear() {
    this.values.clear();
    this.windows.clear();
  }
}

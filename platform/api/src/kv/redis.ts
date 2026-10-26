/**
 * ioredis KeyValueStore (CI redis:7, Azure Managed Redis with `noeviction`, INFRA-3).
 * Sliding windows are sorted sets scored by hit time; check-and-add is one Lua script so parallel
 * requests cannot all pass (AC-01). Members are `now:random` so equal timestamps stay distinct.
 * Every failure surfaces as KvUnavailableError so callers can fail closed (API-16).
 */
import { randomBytes } from 'node:crypto';
import { Redis, type RedisOptions } from 'ioredis';
import { KvUnavailableError, type KeyValueStore, type WindowResult } from './store';

const WINDOW_HIT = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
redis.call('ZREMRANGEBYSCORE', key, '-inf', now - window)
local count = redis.call('ZCARD', key)
if count >= limit then
  local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  local retry = window
  if oldest[2] then retry = tonumber(oldest[2]) + window - now end
  return {0, count, retry}
end
redis.call('ZADD', key, now, ARGV[4])
redis.call('PEXPIRE', key, window)
return {1, count + 1, 0}
`;

const WINDOW_ADD = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
redis.call('ZREMRANGEBYSCORE', key, '-inf', now - window)
redis.call('ZADD', key, now, ARGV[3])
redis.call('PEXPIRE', key, window)
return redis.call('ZCARD', key)
`;

const TAKE = `
local v = redis.call('GET', KEYS[1])
if v then redis.call('DEL', KEYS[1]) end
return v
`;

export class RedisKv implements KeyValueStore {
  readonly kind = 'redis' as const;
  private readonly redis: Redis;

  constructor(
    url: string,
    opts: RedisOptions = {},
    private readonly prefix = 'soyl:',
  ) {
    this.redis = new Redis(url, {
      // Fail fast instead of queueing: callers fail closed (API-16).
      maxRetriesPerRequest: 1,
      enableOfflineQueue: true,
      connectTimeout: 2000,
      commandTimeout: 2000,
      ...opts,
    });
    this.redis.on('error', () => {
      /* surfaced per command; avoid unhandled 'error' events */
    });
  }

  private k(key: string) {
    return this.prefix + key;
  }

  private async run<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      throw new KvUnavailableError(err);
    }
  }

  get(key: string) {
    return this.run(() => this.redis.get(this.k(key)));
  }

  async set(key: string, value: string, ttlMs: number) {
    await this.run(() => this.redis.set(this.k(key), value, 'PX', Math.max(1, Math.ceil(ttlMs))));
  }

  async setIfAbsent(key: string, value: string, ttlMs: number) {
    const r = await this.run(() => this.redis.set(this.k(key), value, 'PX', Math.max(1, Math.ceil(ttlMs)), 'NX'));
    return r === 'OK';
  }

  async take(key: string) {
    return (await this.run(() => this.redis.eval(TAKE, 1, this.k(key)))) as string | null;
  }

  async del(key: string) {
    await this.run(() => this.redis.del(this.k(key)));
  }

  private member(now: number) {
    return `${now}:${randomBytes(6).toString('hex')}`;
  }

  async windowHit(key: string, windowMs: number, limit: number, now: number): Promise<WindowResult> {
    const [ok, count, retry] = (await this.run(() =>
      this.redis.eval(WINDOW_HIT, 1, this.k(key), now, windowMs, limit, this.member(now)),
    )) as [number, number, number];
    return { allowed: ok === 1, count, retryAfterMs: ok === 1 ? 0 : Math.max(1, retry) };
  }

  async windowCount(key: string, windowMs: number, now: number) {
    return this.run(() => this.redis.zcount(this.k(key), `(${now - windowMs}`, now));
  }

  async windowAdd(key: string, windowMs: number, now: number) {
    return (await this.run(() => this.redis.eval(WINDOW_ADD, 1, this.k(key), now, windowMs, this.member(now)))) as number;
  }

  async ping() {
    await this.run(() => this.redis.ping());
  }

  async close() {
    this.redis.disconnect();
  }
}

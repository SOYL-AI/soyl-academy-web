/**
 * ioredis KeyValueStore (CI redis:7, Azure Managed Redis with `noeviction`, INFRA-3).
 *
 * Semantics match the memory store exactly, including the caller's clock (`now`), so tests with a
 * fake clock behave the same on both (the CI failure behind this: lockouts kept by Redis's own TTL
 * after the test clock had moved past them):
 * - Values are stored as `<expiresAtMs>|<value>` and are expired against `now`; the Redis TTL is only
 *   for cleanup.
 * - Sliding windows are sorted sets scored by hit time; only hits in (now − window, now] count.
 *   Check-and-add is one Lua script so parallel requests cannot all pass (AC-01). Members are
 *   `now:random` so equal timestamps stay distinct.
 * Every failure surfaces as KvUnavailableError so callers can fail closed (API-16).
 *
 * Entra auth (INFRA-3, REDIS_AUTH=entra): Azure Managed Redis with access keys disabled. The ACL
 * username is the managed identity's object id and the password is an Entra token for
 * https://redis.azure.com. The first command waits for the token; the connection is TLS (rediss://,
 * SNI = host). Before the token expires (REFRESH_MARGIN_MS) a fresh one is fetched and sent with
 * AUTH on the live connection, and stored in the client options so reconnects use it too. A failed
 * refresh is retried every 30 s; commands keep working on the authenticated connection meanwhile.
 */
import { randomBytes } from 'node:crypto';
import { Redis, type RedisOptions } from 'ioredis';
import { AZURE_RESOURCES, REFRESH_MARGIN_MS, type TokenProvider } from '@soyl/shared/azure/identity';
import { KvUnavailableError, type KeyValueStore, type WindowResult } from './store';

const WINDOW_HIT = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
redis.call('ZREMRANGEBYSCORE', key, '-inf', now - window)
local count = redis.call('ZCOUNT', key, '(' .. (now - window), now)
if count >= limit then
  local oldest = redis.call('ZRANGEBYSCORE', key, '(' .. (now - window), now, 'WITHSCORES', 'LIMIT', 0, 1)
  local retry = window
  if oldest[2] then retry = tonumber(oldest[2]) + window - now end
  return {0, count, retry}
end
redis.call('ZADD', key, now, ARGV[4])
local ttl = redis.call('PTTL', key)
if ttl < window then redis.call('PEXPIRE', key, window) end
return {1, count + 1, 0}
`;

const WINDOW_ADD = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
redis.call('ZREMRANGEBYSCORE', key, '-inf', now - window)
redis.call('ZADD', key, now, ARGV[3])
local ttl = redis.call('PTTL', key)
if ttl < window then redis.call('PEXPIRE', key, window) end
return redis.call('ZCOUNT', key, '(' .. (now - window), now)
`;

/** Sets only if there is no live value (expired against the caller's clock). */
const SET_IF_ABSENT = `
local v = redis.call('GET', KEYS[1])
if v then
  local exp = tonumber(string.match(v, '^(%d+)|'))
  if exp and exp > tonumber(ARGV[1]) then return 0 end
end
redis.call('SET', KEYS[1], ARGV[2], 'PX', ARGV[3])
return 1
`;

const TAKE = `
local v = redis.call('GET', KEYS[1])
if v then redis.call('DEL', KEYS[1]) end
return v
`;

/** `<expiresAt>|<value>` → value if still live at `now`. */
export function decodeValue(raw: unknown, now: number): string | null {
  // Lua nil comes back as null from Redis (false from some clients/mocks).
  if (typeof raw !== 'string') return null;
  const bar = raw.indexOf('|');
  if (bar < 1) return null;
  const exp = Number(raw.slice(0, bar));
  return Number.isFinite(exp) && exp > now ? raw.slice(bar + 1) : null;
}

const ttl = (ms: number) => Math.max(1, Math.ceil(ms));

export interface RedisEntraAuth {
  /** Object (principal) id of the managed identity: the Redis ACL username. */
  username: string;
  tokens: TokenProvider;
  /** Called when a background token refresh fails (it is retried). */
  onRefreshError?: (err: unknown) => void;
  now?: () => number;
  /** Retry delay after a failed refresh (default 30 s). */
  retryMs?: number;
}

/** TLS options for a rediss:// URL (SNI must be the host name for Azure Managed Redis). */
export function redisTlsOptions(url: string): Pick<RedisOptions, 'tls'> {
  try {
    const u = new URL(url);
    return u.protocol === 'rediss:' ? { tls: { servername: u.hostname } } : {};
  } catch {
    return {};
  }
}

export class RedisKv implements KeyValueStore {
  readonly kind = 'redis' as const;
  private readonly redis: Redis;
  private ready: Promise<void> | null = null;
  private refreshTimer: ReturnType<typeof setTimeout> | undefined;
  private closed = false;

  constructor(
    url: string,
    opts: RedisOptions = {},
    private readonly prefix = 'soyl:',
    /** Tests inject a client (ioredis-mock); production builds one from the URL. */
    client?: Redis,
    /** REDIS_AUTH=entra: managed-identity token as the password (Azure Managed Redis). */
    private readonly entra?: RedisEntraAuth,
  ) {
    this.redis =
      client ??
      new Redis(url, {
        // Fail fast instead of queueing: callers fail closed (API-16).
        maxRetriesPerRequest: 1,
        enableOfflineQueue: true,
        connectTimeout: 2000,
        commandTimeout: 2000,
        ...redisTlsOptions(url),
        // With Entra auth the first command connects, after the token is in the options.
        ...(entra ? { username: entra.username, lazyConnect: true } : {}),
        ...opts,
      });
    this.redis.on('error', () => {
      /* surfaced per command; avoid unhandled 'error' events */
    });
  }

  private k(key: string) {
    return this.prefix + key;
  }

  /** Entra auth: fetch the first token (once; retried on the next command after a failure). */
  private ensureAuth(): Promise<void> | null {
    if (!this.entra) return null;
    this.ready ??= this.authenticate(false).catch((err) => {
      this.ready = null;
      throw err;
    });
    return this.ready;
  }

  /** Puts a fresh token in the client options (reconnects) and, on a live connection, re-AUTHs. */
  private async authenticate(live: boolean): Promise<void> {
    const entra = this.entra!;
    const t = await entra.tokens.getToken(AZURE_RESOURCES.redis);
    this.redis.options.username = entra.username;
    this.redis.options.password = t.token;
    if (live && this.redis.status === 'ready') await this.redis.auth(entra.username, t.token);
    this.scheduleRefresh(t.expiresOnTimestamp);
  }

  private scheduleRefresh(expiresOn: number) {
    if (this.closed) return;
    clearTimeout(this.refreshTimer);
    const now = this.entra!.now?.() ?? Date.now();
    // Just inside the provider's refresh window, so it hands out a new token.
    const delay = Math.max(1000, expiresOn - REFRESH_MARGIN_MS - now + 1000);
    this.refreshTimer = setTimeout(() => void this.refresh(), delay);
    this.refreshTimer.unref?.();
  }

  private async refresh(): Promise<void> {
    if (this.closed) return;
    try {
      await this.authenticate(true);
    } catch (err) {
      this.entra!.onRefreshError?.(err);
      if (this.closed) return;
      this.refreshTimer = setTimeout(() => void this.refresh(), this.entra!.retryMs ?? 30_000);
      this.refreshTimer.unref?.();
    }
  }

  private async run<T>(fn: () => Promise<T>): Promise<T> {
    try {
      await this.ensureAuth();
      return await fn();
    } catch (err) {
      throw new KvUnavailableError(err);
    }
  }

  async get(key: string, now: number) {
    const raw = await this.run(() => this.redis.get(this.k(key)));
    const v = decodeValue(raw, now);
    if (raw !== null && v === null) await this.run(() => this.redis.del(this.k(key)));
    return v;
  }

  async set(key: string, value: string, ttlMs: number, now: number) {
    await this.run(() => this.redis.set(this.k(key), `${now + ttlMs}|${value}`, 'PX', ttl(ttlMs)));
  }

  async setIfAbsent(key: string, value: string, ttlMs: number, now: number) {
    const r = await this.run(() => this.redis.eval(SET_IF_ABSENT, 1, this.k(key), now, `${now + ttlMs}|${value}`, ttl(ttlMs)));
    return Number(r) === 1;
  }

  async take(key: string, now: number) {
    return decodeValue(await this.run(() => this.redis.eval(TAKE, 1, this.k(key))), now);
  }

  async del(key: string) {
    await this.run(() => this.redis.del(this.k(key)));
  }

  private member(now: number) {
    return `${now}:${randomBytes(6).toString('hex')}`;
  }

  async windowHit(key: string, windowMs: number, limit: number, now: number): Promise<WindowResult> {
    const [ok, count, retry] = (await this.run(() => this.redis.eval(WINDOW_HIT, 1, this.k(key), now, windowMs, limit, this.member(now)))) as [number, number, number];
    return { allowed: Number(ok) === 1, count: Number(count), retryAfterMs: Number(ok) === 1 ? 0 : Math.max(1, Number(retry)) };
  }

  async windowCount(key: string, windowMs: number, now: number) {
    return this.run(() => this.redis.zcount(this.k(key), `(${now - windowMs}`, now));
  }

  async windowAdd(key: string, windowMs: number, now: number) {
    return Number(await this.run(() => this.redis.eval(WINDOW_ADD, 1, this.k(key), now, windowMs, this.member(now))));
  }

  async ping() {
    await this.run(() => this.redis.ping());
  }

  async close() {
    this.closed = true;
    clearTimeout(this.refreshTimer);
    this.redis.disconnect();
  }
}

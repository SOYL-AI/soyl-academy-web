/**
 * Rate limiting on the KV store (API-RL-1, API-RL-2, AUTH-3, AUTH-5). Sliding windows keyed as the
 * bucket says (user, IP, device, attempt). Identifiers that are personal data (phone, email, IP) are
 * HMAC'd before they become key names, so Redis holds no readable personal data (AC-26).
 */
import { createHmac } from 'node:crypto';
import { RATE_LIMITS, type RateLimitBucketName, type WindowLimit } from '@soyl/shared/config/security';
import type { Clock } from './clock';
import { ApiProblem } from './errors';
import type { KeyValueStore, WindowResult } from './kv';

export interface LimitOutcome extends WindowResult {
  bucket: string;
}

export class RateLimiter {
  constructor(
    private readonly kv: KeyValueStore,
    private readonly clock: Clock,
    private readonly keySecret: string,
  ) {}

  /** Opaque, stable key part for a personal identifier. */
  keyPart(value: string): string {
    return createHmac('sha256', this.keySecret).update(value).digest('base64url').slice(0, 22);
  }

  /** Records a hit in `name` (if under the limit). */
  async hit(name: string, subject: string, limit: WindowLimit): Promise<LimitOutcome> {
    const r = await this.kv.windowHit(`rl:${name}:${this.keyPart(subject)}`, limit.windowSeconds * 1000, limit.limit, this.clock.now());
    return { ...r, bucket: name };
  }

  async count(name: string, subject: string, windowSeconds: number): Promise<number> {
    return this.kv.windowCount(`rl:${name}:${this.keyPart(subject)}`, windowSeconds * 1000, this.clock.now());
  }

  async add(name: string, subject: string, windowSeconds: number): Promise<number> {
    return this.kv.windowAdd(`rl:${name}:${this.keyPart(subject)}`, windowSeconds * 1000, this.clock.now());
  }

  /**
   * Checks several windows without recording, then records all of them only if every one has room.
   * Returns the first window that is full (or null when the hits were recorded).
   */
  async hitAll(name: string, subject: string, limits: readonly WindowLimit[]): Promise<LimitOutcome | null> {
    const now = this.clock.now();
    for (const l of limits) {
      const key = `rl:${name}:${l.windowSeconds}:${this.keyPart(subject)}`;
      const count = await this.kv.windowCount(key, l.windowSeconds * 1000, now);
      if (count >= l.limit) {
        // A full window records nothing and reports the exact wait.
        const r = await this.kv.windowHit(key, l.windowSeconds * 1000, l.limit, now);
        if (!r.allowed) return { ...r, bucket: `${name}:${l.windowSeconds}s` };
      }
    }
    for (const l of limits) {
      const key = `rl:${name}:${l.windowSeconds}:${this.keyPart(subject)}`;
      const r = await this.kv.windowHit(key, l.windowSeconds * 1000, l.limit, now);
      if (!r.allowed) return { ...r, bucket: `${name}:${l.windowSeconds}s` };
    }
    return null;
  }

  /** A named bucket from RATE_LIMITS. */
  bucket(name: RateLimitBucketName, subject: string): Promise<LimitOutcome> {
    return this.hit(name, subject, RATE_LIMITS[name]);
  }
}

/** 429 problem with Retry-After (seconds, rounded up). */
export function rateLimited(outcome: Pick<WindowResult, 'retryAfterMs'>, code: 'rate_limited' | 'otp_locked' = 'rate_limited'): ApiProblem {
  const seconds = Math.max(1, Math.ceil(outcome.retryAfterMs / 1000));
  return new ApiProblem(code, { retryAfterSeconds: seconds, headers: { 'retry-after': String(seconds) } });
}

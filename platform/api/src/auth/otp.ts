/**
 * One-time codes for phone and email (AUTH-2 .. AUTH-5, AC-01, AC-02).
 *
 * Storage (AUTH-4): one `verifications` row per (purpose, channel, identifier):
 *   identifier = `otp:<purpose>:<channel>:<HMAC(identifier)>`   (no readable phone/email in the table)
 *   value      = `v1:<attempts>:<HMAC-SHA256(OTP_PEPPER, channel:identifier \n purpose \n code)>`
 * The code itself is never stored, logged or returned (except the mock outbox, GEN-3).
 *
 * Rules:
 * - AUTH-2: 6 digits from crypto.randomInt; single use; bound to (identifier, purpose); a new code
 *   deletes the previous one; SMS 5 min, email 10 min.
 * - AUTH-3 / AC-01: the attempt counter is incremented by one conditional UPDATE (row lock), so
 *   parallel guesses cannot exceed 5 evaluations; the 6th try fails even with the right code.
 *   10 failures per identifier per rolling hour lock it for 1 h (no sends, no verifies); 30 per IP per
 *   hour → 429. Constant-time comparison.
 * - AUTH-5 / AC-02: send caps per identifier, per IP and a global hourly SMS cap (phone OTP pauses,
 *   email and Google stay up). Non-+91 mobiles → 400 before any provider call. Disposable email
 *   domains → 400. Responses do not depend on whether an account exists.
 */
import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';
import { and, eq, sql } from 'drizzle-orm';
import type { FastifyBaseLogger } from 'fastify';
import { verifications, type Database } from '@soyl/db';
import {
  DISPOSABLE_EMAIL_DOMAINS,
  INDIA_MOBILE_REGEX,
  OTP,
  TEST_PHONE_REGEX,
} from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import type { KeyValueStore } from '../kv';
import { authEvent, securityEvent } from '../logging';
import { rateLimited, type RateLimiter } from '../rate-limit';
import { otpEmail, type EmailSender } from './senders/email';
import type { SmsSender } from './senders/sms';

export type OtpChannel = 'phone' | 'email';
export type OtpPurpose = 'sign-in' | 'link';

export interface OtpRequestContext {
  ip: string;
  userAgent?: string;
  log: FastifyBaseLogger;
  userId?: string | null;
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export class OtpService {
  constructor(
    private readonly db: Database,
    private readonly kv: KeyValueStore,
    private readonly limiter: RateLimiter,
    private readonly clock: Clock,
    private readonly senders: { sms: SmsSender; email: EmailSender },
    private readonly opts: { pepper: string; allowTestPhones: boolean; smsGlobalHourlyCap: number },
  ) {}

  /** AUTH-1: +91 mobiles only (plus the reserved test range outside production). Throws 400. */
  normalizePhone(raw: string): string {
    const p = raw.replace(/[\s()-]/g, '');
    if (INDIA_MOBILE_REGEX.test(p)) return p;
    if (this.opts.allowTestPhones && TEST_PHONE_REGEX.test(p)) return p;
    throw new ApiProblem('validation_failed', { errors: [{ path: 'phoneNumber', message: 'Enter an Indian mobile number (+91 followed by 10 digits).' }] });
  }

  /** Lower-cased, syntactically valid, not disposable. Throws 400. */
  normalizeEmail(raw: string): string {
    const e = raw.trim().toLowerCase();
    if (e.length > 254 || !EMAIL_RE.test(e)) throw new ApiProblem('validation_failed', { errors: [{ path: 'email', message: 'Enter a valid email address.' }] });
    const domain = e.slice(e.lastIndexOf('@') + 1);
    if (domain.endsWith('.invalid') || DISPOSABLE_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`)))
      throw new ApiProblem('validation_failed', { errors: [{ path: 'email', message: 'Use a permanent email address.' }] });
    return e;
  }

  normalize(channel: OtpChannel, raw: string): string {
    return channel === 'phone' ? this.normalizePhone(raw) : this.normalizeEmail(raw);
  }

  private subject(channel: OtpChannel, identifier: string) {
    return `${channel}:${identifier}`;
  }

  /** verifications.identifier for this (purpose, channel, identifier). */
  verificationId(channel: OtpChannel, identifier: string, purpose: OtpPurpose): string {
    return `otp:${purpose}:${channel}:${this.limiter.keyPart(this.subject(channel, identifier))}`;
  }

  private codeHash(channel: OtpChannel, identifier: string, purpose: OtpPurpose, code: string): string {
    return createHmac('sha256', this.opts.pepper).update(`${this.subject(channel, identifier)}\n${purpose}\n${code}`).digest('hex');
  }

  private lockKey(channel: OtpChannel, identifier: string) {
    return `otp:lock:${this.limiter.keyPart(this.subject(channel, identifier))}`;
  }

  private async assertNotLocked(channel: OtpChannel, identifier: string): Promise<void> {
    const until = await this.kv.get(this.lockKey(channel, identifier), this.clock.now());
    if (until) throw rateLimited({ retryAfterMs: Number(until) - this.clock.now() }, 'otp_locked');
  }

  /** Sends a code. Returns the UI resend cooldown. Throws ApiProblem on limits. */
  async send(channel: OtpChannel, rawIdentifier: string, purpose: OtpPurpose, ctx: OtpRequestContext): Promise<{ identifier: string; resendAfterSeconds: number }> {
    const identifier = this.normalize(channel, rawIdentifier);
    const subject = this.subject(channel, identifier);
    const limits = OTP.send[channel];
    await this.assertNotLocked(channel, identifier);

    const idLimit = await this.limiter.hitAll(`otp-send-id`, subject, limits.perIdentifier);
    if (idLimit) {
      securityEvent(ctx.log, 'rate_limited', { bucket: `otp-send-${channel}-identifier`, window: idLimit.bucket });
      throw rateLimited(idLimit);
    }
    const ipLimit = await this.limiter.hitAll(`otp-send-${channel}-ip`, ctx.ip, limits.perIp);
    if (ipLimit) {
      securityEvent(ctx.log, 'rate_limited', { bucket: `otp-send-${channel}-ip`, window: ipLimit.bucket, ip: ctx.ip });
      throw rateLimited(ipLimit);
    }
    if (channel === 'phone') {
      const g = await this.limiter.hit('otp-send-phone-global', 'global', { limit: this.opts.smsGlobalHourlyCap, windowSeconds: 3600 });
      if (!g.allowed) {
        // AC-02: pause phone OTP; INFRA-12 alert fires on this event.
        securityEvent(ctx.log, 'otp_global_cap_reached', { cap: this.opts.smsGlobalHourlyCap, alert: true });
        throw new ApiProblem('phone_otp_paused', { headers: { 'retry-after': String(Math.ceil(g.retryAfterMs / 1000)) } });
      }
    }

    const code = String(randomInt(0, 10 ** OTP.length)).padStart(OTP.length, '0');
    const vid = this.verificationId(channel, identifier, purpose);
    const now = this.clock.now();
    const ttl = OTP.ttlSeconds[channel];
    await this.db.transaction(async (tx) => {
      // AUTH-2: a new code supersedes the previous one.
      await tx.delete(verifications).where(eq(verifications.identifier, vid));
      await tx.insert(verifications).values({
        identifier: vid,
        value: `v1:0:${this.codeHash(channel, identifier, purpose, code)}`,
        expiresAt: new Date(now + ttl * 1000),
        createdAt: new Date(now),
        updatedAt: new Date(now),
      });
    });

    try {
      if (channel === 'phone') await this.senders.sms.send({ to: identifier, kind: 'otp', vars: { otp: code, minutes: String(ttl / 60) } });
      else await this.senders.email.send(otpEmail(identifier, code, ttl / 60));
    } catch {
      await this.db.delete(verifications).where(eq(verifications.identifier, vid));
      authEvent(ctx.log, 'otp_send', { outcome: 'failure', method: channel, identifier, ip: ctx.ip, userAgent: ctx.userAgent, reason: 'provider_error', purpose });
      throw new ApiProblem('service_unavailable');
    }
    authEvent(ctx.log, 'otp_send', { outcome: 'success', method: channel, identifier, ip: ctx.ip, userAgent: ctx.userAgent, purpose, userId: ctx.userId });

    const recent = await this.limiter.count(`otp-send-id:900`, subject, 900).catch(() => 1);
    const cooldowns = OTP.resendCooldownSeconds;
    return { identifier, resendAfterSeconds: cooldowns[Math.min(Math.max(recent - 1, 0), cooldowns.length - 1)]! };
  }

  /** Verifies and consumes a code. Returns the normalised identifier. Throws ApiProblem on failure. */
  async verify(channel: OtpChannel, rawIdentifier: string, purpose: OtpPurpose, code: string, ctx: OtpRequestContext): Promise<string> {
    const identifier = this.normalize(channel, rawIdentifier);
    await this.assertNotLocked(channel, identifier);
    const ipFailures = await this.limiter.count('otp-fail-ip', ctx.ip, OTP.ipFailures.windowSeconds);
    if (ipFailures >= OTP.ipFailures.limit) {
      securityEvent(ctx.log, 'rate_limited', { bucket: 'otp-fail-ip', ip: ctx.ip });
      throw rateLimited({ retryAfterMs: OTP.ipFailures.windowSeconds * 1000 });
    }

    const vid = this.verificationId(channel, identifier, purpose);
    const now = new Date(this.clock.now());
    // AC-01: increment-then-compare in one statement; the row lock serialises parallel guesses.
    const updated = await this.db.execute<{ id: string; hash: string }>(sql`
      UPDATE ${verifications}
         SET value = 'v1:' || (split_part(value, ':', 2)::int + 1)::text || ':' || split_part(value, ':', 3),
             updated_at = ${now}
       WHERE identifier = ${vid}
         AND expires_at > ${now}
         AND value LIKE 'v1:%'
         AND split_part(value, ':', 2)::int < ${OTP.maxAttemptsPerCode}
   RETURNING id, split_part(value, ':', 3) AS hash`);
    const row = updated.rows[0];
    if (!row) {
      await this.recordFailure(channel, identifier, ctx, 'expired_or_dead');
      throw new ApiProblem('otp_expired');
    }
    const expected = Buffer.from(row.hash, 'hex');
    const actual = Buffer.from(this.codeHash(channel, identifier, purpose, /^\d{6}$/.test(code) ? code : '!'), 'hex');
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      await this.recordFailure(channel, identifier, ctx, 'wrong_code');
      throw new ApiProblem('otp_invalid');
    }
    // Single use: only one concurrent verifier can delete the row.
    const consumed = await this.db
      .delete(verifications)
      .where(and(eq(verifications.id, row.id), eq(verifications.identifier, vid)))
      .returning({ id: verifications.id });
    if (!consumed.length) {
      await this.recordFailure(channel, identifier, ctx, 'already_used');
      throw new ApiProblem('otp_expired');
    }
    authEvent(ctx.log, 'otp_verify', { outcome: 'success', method: channel, identifier, ip: ctx.ip, userAgent: ctx.userAgent, purpose, userId: ctx.userId });
    return identifier;
  }

  private async recordFailure(channel: OtpChannel, identifier: string, ctx: OtpRequestContext, reason: string) {
    authEvent(ctx.log, 'otp_verify', { outcome: 'failure', method: channel, identifier, ip: ctx.ip, userAgent: ctx.userAgent, reason, userId: ctx.userId });
    const f = OTP.identifierFailures;
    const n = await this.limiter.add('otp-fail-id', this.subject(channel, identifier), f.windowSeconds);
    await this.limiter.add('otp-fail-ip', ctx.ip, OTP.ipFailures.windowSeconds);
    if (n >= f.limit) {
      const until = this.clock.now() + f.lockSeconds * 1000;
      const set = await this.kv.setIfAbsent(this.lockKey(channel, identifier), String(until), f.lockSeconds * 1000, this.clock.now());
      if (set) {
        // The live code dies with the lock.
        await this.db.delete(verifications).where(eq(verifications.identifier, this.verificationId(channel, identifier, 'sign-in')));
        await this.db.delete(verifications).where(eq(verifications.identifier, this.verificationId(channel, identifier, 'link')));
        securityEvent(ctx.log, 'otp_lockout', { method: channel, lockSeconds: f.lockSeconds });
        authEvent(ctx.log, 'otp_lockout', { outcome: 'refused', method: channel, identifier, ip: ctx.ip, userAgent: ctx.userAgent });
      }
    }
  }

  /** PII.md deletion step: remove any pending codes for these identifiers. */
  async deleteFor(identifiers: { channel: OtpChannel; identifier: string }[]): Promise<void> {
    for (const { channel, identifier } of identifiers)
      for (const purpose of ['sign-in', 'link'] as const)
        await this.db.delete(verifications).where(eq(verifications.identifier, this.verificationId(channel, identifier, purpose)));
  }
}

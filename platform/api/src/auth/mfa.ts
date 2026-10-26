/**
 * AUTH-11: TOTP second factor for staff (reviewer, admin). ADR-011.
 *
 * - RFC 6238 (HMAC-SHA1, 6 digits, 30 s), ±1 step for clock drift. A time step is accepted at most
 *   once (`user_mfa.last_used_step`), so a shoulder-surfed or replayed code is useless.
 * - The secret is encrypted with AES-256-GCM under MFA_ENCRYPTION_KEY (Key Vault; never in the
 *   database), with the user id as associated data, so a row copied to another user does not decrypt.
 * - Recovery codes (10, shown once at confirmation) are stored as HMAC-SHA256(OTP_PEPPER, code) and
 *   removed when used.
 * - Wrong codes are counted per user (MFA.failures); at the limit verification locks for the window.
 * - A session that passes the factor gets `sessions.mfa_verified_at`. Policy `mfa: true` routes need
 *   a confirmed enrolment and a verified session; anything else is 403 `mfa_required` (fail closed).
 * - Disabling clears every session's mark, so other sessions must verify again.
 */
import { createCipheriv, createDecipheriv, createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto';
import { and, eq, isNotNull, sql } from 'drizzle-orm';
import { sessions, userMfa, type Database } from '@soyl/db';
import { MFA } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import type { RateLimiter } from '../rate-limit';

/* Base32 (RFC 4648, no padding) ---------------------------------------------------------------- */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Encode(buf: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = '';
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(s: string): Buffer {
  const clean = s.toUpperCase().replace(/[\s=-]/g, '');
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const i = ALPHABET.indexOf(ch);
    if (i < 0) throw new Error('invalid base32');
    value = (value << 5) | i;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

/* TOTP ------------------------------------------------------------------------------------------- */

export function totpAt(secret: Buffer, step: number, digits: number = MFA.totp.digits): string {
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(step));
  const mac = createHmac('sha1', secret).update(counter).digest();
  const offset = mac[mac.length - 1]! & 0x0f;
  const bin = ((mac[offset]! & 0x7f) << 24) | (mac[offset + 1]! << 16) | (mac[offset + 2]! << 8) | mac[offset + 3]!;
  return String(bin % 10 ** digits).padStart(digits, '0');
}

export const stepAt = (ms: number) => Math.floor(ms / 1000 / MFA.totp.periodSeconds);

/** The matching step within the drift window, or null. Constant-time comparison per candidate. */
export function matchTotp(secret: Buffer, code: string, nowMs: number): number | null {
  if (!/^\d{6}$/.test(code)) return null;
  const now = stepAt(nowMs);
  let found: number | null = null;
  for (let d = -MFA.driftSteps; d <= MFA.driftSteps; d++) {
    const expected = Buffer.from(totpAt(secret, now + d));
    if (timingSafeEqual(expected, Buffer.from(code)) && found === null) found = now + d;
  }
  return found;
}

/* Secret encryption (AES-256-GCM) ------------------------------------------------------------- */

export function encryptSecret(key: Buffer, userId: string, secret: Buffer): string {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  c.setAAD(Buffer.from(userId));
  const ct = Buffer.concat([c.update(secret), c.final()]);
  return ['v1', iv.toString('base64url'), ct.toString('base64url'), c.getAuthTag().toString('base64url')].join(':');
}

export function decryptSecret(key: Buffer, userId: string, enc: string): Buffer {
  const [v, iv, ct, tag] = enc.split(':');
  if (v !== 'v1' || !iv || !ct || !tag) throw new Error('unknown TOTP secret format');
  const d = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64url'));
  d.setAAD(Buffer.from(userId));
  d.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([d.update(Buffer.from(ct, 'base64url')), d.final()]);
}

/* Service ---------------------------------------------------------------------------------------- */

const RECOVERY_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';
const newRecoveryCode = () => {
  const chars = Array.from({ length: 10 }, () => RECOVERY_ALPHABET[randomInt(RECOVERY_ALPHABET.length)]).join('');
  return `${chars.slice(0, 5)}-${chars.slice(5)}`;
};
export const normaliseRecoveryCode = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export interface MfaStatus {
  enrolled: boolean;
  confirmed: boolean;
  sessionVerified: boolean;
  recoveryCodesRemaining: number;
}

export class MfaService {
  constructor(
    private readonly db: Database,
    private readonly clock: Clock,
    private readonly limiter: RateLimiter,
    private readonly opts: { encryptionKey: Buffer; pepper: string; issuer: string },
  ) {}

  private hashRecovery(code: string): string {
    return createHmac('sha256', this.opts.pepper).update(`mfa-recovery:${normaliseRecoveryCode(code)}`).digest('base64url');
  }

  private async row(userId: string) {
    const [r] = await this.db.select().from(userMfa).where(eq(userMfa.userId, userId));
    return r ?? null;
  }

  /** Policy check for `mfa: true` routes. */
  async sessionVerified(userId: string, sessionId: string): Promise<boolean> {
    const [r] = await this.db
      .select({ at: sessions.mfaVerifiedAt })
      .from(sessions)
      .innerJoin(userMfa, eq(userMfa.userId, sessions.userId))
      .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId), isNotNull(userMfa.confirmedAt), isNotNull(sessions.mfaVerifiedAt)));
    return !!r?.at;
  }

  async status(userId: string, sessionId: string): Promise<MfaStatus> {
    const r = await this.row(userId);
    return {
      enrolled: !!r,
      confirmed: !!r?.confirmedAt,
      sessionVerified: await this.sessionVerified(userId, sessionId),
      recoveryCodesRemaining: r?.confirmedAt ? r.recoveryCodeHashes.length : 0,
    };
  }

  /** Starts (or restarts) enrolment. A confirmed enrolment must be disabled first (409). */
  async enroll(userId: string, label: string) {
    const existing = await this.row(userId);
    if (existing?.confirmedAt) throw new ApiProblem('conflict', { detail: 'Two-step verification is already set up.' });
    const secret = randomBytes(MFA.totp.secretBytes);
    const enc = encryptSecret(this.opts.encryptionKey, userId, secret);
    const now = new Date(this.clock.now());
    await this.db
      .insert(userMfa)
      .values({ userId, totpSecretEnc: enc, createdAt: now, updatedAt: now })
      .onConflictDoUpdate({ target: userMfa.userId, set: { totpSecretEnc: enc, confirmedAt: null, recoveryCodeHashes: [], lastUsedStep: null, createdAt: now, updatedAt: now } });
    const b32 = base32Encode(secret);
    const issuer = encodeURIComponent(this.opts.issuer);
    const otpauthUri = `otpauth://totp/${issuer}:${encodeURIComponent(label)}?secret=${b32}&issuer=${issuer}&algorithm=${MFA.totp.algorithm}&digits=${MFA.totp.digits}&period=${MFA.totp.periodSeconds}`;
    return { secret: b32, otpauthUri, digits: MFA.totp.digits, periodSeconds: MFA.totp.periodSeconds, algorithm: MFA.totp.algorithm, expiresInSeconds: MFA.pendingEnrolmentSeconds };
  }

  private async assertNotLocked(userId: string): Promise<void> {
    const failures = await this.limiter.count('mfa.fail', userId, MFA.failures.windowSeconds);
    if (failures >= MFA.failures.limit) throw new ApiProblem('otp_locked', { retryAfterSeconds: MFA.failures.windowSeconds, headers: { 'retry-after': String(MFA.failures.windowSeconds) } });
  }

  private async fail(userId: string): Promise<never> {
    await this.limiter.add('mfa.fail', userId, MFA.failures.windowSeconds);
    throw new ApiProblem('otp_invalid');
  }

  /** Checks a TOTP code (replay-safe) and records the step. */
  private async checkCode(userId: string, r: typeof userMfa.$inferSelect, code: string): Promise<void> {
    const step = matchTotp(decryptSecret(this.opts.encryptionKey, userId, r.totpSecretEnc), code, this.clock.now());
    if (step === null || (r.lastUsedStep !== null && step <= r.lastUsedStep)) await this.fail(userId);
    // Conditional update: two parallel uses of one code cannot both win.
    const updated = await this.db
      .update(userMfa)
      .set({ lastUsedStep: step!, updatedAt: new Date(this.clock.now()) })
      .where(and(eq(userMfa.userId, userId), r.lastUsedStep === null ? isNullStep() : lessThanStep(step!)))
      .returning({ id: userMfa.id });
    if (!updated.length) await this.fail(userId);
  }

  private markSession(userId: string, sessionId: string) {
    return this.db.update(sessions).set({ mfaVerifiedAt: new Date(this.clock.now()) }).where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)));
  }

  /** Confirms enrolment with a first code: returns the one-time recovery codes; this session counts as verified. */
  async confirm(userId: string, sessionId: string, code: string): Promise<{ recoveryCodes: string[] }> {
    await this.assertNotLocked(userId);
    const r = await this.row(userId);
    if (!r || r.confirmedAt) throw new ApiProblem('conflict', { detail: r ? 'Two-step verification is already set up.' : 'Start enrolment first.' });
    if (this.clock.now() - r.createdAt.getTime() > MFA.pendingEnrolmentSeconds * 1000) throw new ApiProblem('otp_expired');
    await this.checkCode(userId, r, code);
    const codes = Array.from({ length: MFA.recoveryCodes }, newRecoveryCode);
    await this.db
      .update(userMfa)
      .set({ confirmedAt: new Date(this.clock.now()), recoveryCodeHashes: codes.map((c) => this.hashRecovery(c)) })
      .where(eq(userMfa.userId, userId));
    await this.markSession(userId, sessionId);
    return { recoveryCodes: codes };
  }

  /** Verifies this session with a TOTP code or a one-time recovery code. */
  async verify(userId: string, sessionId: string, input: { code?: string; recoveryCode?: string }): Promise<{ method: 'totp' | 'recovery_code'; recoveryCodesRemaining: number }> {
    await this.assertNotLocked(userId);
    const r = await this.row(userId);
    if (!r?.confirmedAt) throw new ApiProblem('conflict', { detail: 'Set up two-step verification first.' });
    if (input.code) {
      await this.checkCode(userId, r, input.code);
      await this.markSession(userId, sessionId);
      return { method: 'totp', recoveryCodesRemaining: r.recoveryCodeHashes.length };
    }
    const hash = this.hashRecovery(input.recoveryCode ?? '');
    if (!r.recoveryCodeHashes.includes(hash)) await this.fail(userId);
    const remaining = r.recoveryCodeHashes.filter((h) => h !== hash);
    const updated = await this.db
      .update(userMfa)
      .set({ recoveryCodeHashes: remaining, updatedAt: new Date(this.clock.now()) })
      .where(and(eq(userMfa.userId, userId), arrayContains(hash)))
      .returning({ id: userMfa.id });
    if (!updated.length) await this.fail(userId);
    await this.markSession(userId, sessionId);
    return { method: 'recovery_code', recoveryCodesRemaining: remaining.length };
  }

  /** Turns the factor off (needs a current code); every session of the user loses its MFA mark. */
  async disable(userId: string, code: string): Promise<void> {
    await this.assertNotLocked(userId);
    const r = await this.row(userId);
    if (!r?.confirmedAt) throw new ApiProblem('not_found');
    await this.checkCode(userId, r, code);
    await this.db.transaction(async (tx) => {
      await tx.delete(userMfa).where(eq(userMfa.userId, userId));
      await tx.update(sessions).set({ mfaVerifiedAt: null }).where(eq(sessions.userId, userId));
    });
  }
}

const isNullStep = () => sql`${userMfa.lastUsedStep} IS NULL`;
const lessThanStep = (step: number) => sql`(${userMfa.lastUsedStep} IS NULL OR ${userMfa.lastUsedStep} < ${step})`;
const arrayContains = (hash: string) => sql`${hash} = ANY(${userMfa.recoveryCodeHashes})`;

/**
 * CONSENT_PROVIDER=builtin — the interim built-in consent provider (D-039, ADR-022). It replaces nothing
 * in the gate: `ConsentService` still caches `consent_status` and every gated route still asks it. The
 * owner's external system (OA-08) can replace this provider later behind the same `ConsentProvider`
 * interface; the routes below then answer 409 consent_flow_unavailable.
 *
 * State machine (`consent_records`, one row per account):
 *
 *   (none) ──declare adult──────────────▶ granted (self_declared, audit row)
 *   (none) ──declare minor──────────────▶ required (age band minor)
 *   minor/required|revoked ──parent email──▶ pending (code emailed to the parent, 48 h, 5 tries)
 *   minor/pending ──parent email again──▶ pending (new code; old code dead; new parent → old link dead)
 *   minor/pending ──right code──────────▶ granted (parent_email_code)
 *   granted|pending ──student withdraws──▶ revoked (account_holder)
 *   any (minor) ──parent's link + confirm─▶ revoked (parent; "decline" when still pending)
 *   adult/granted ──declare minor───────▶ required (minor) — the grant is withdrawn
 *   minor ──declare adult───────────────▶ 409 age_band_locked (no self-upgrade around a parent)
 *
 * Every transition rewrites the `consent_status` cache at once (no 15-minute wait) and writes an audit
 * row with ids and states only. Leaving `granted` deletes the AI data PII.md lists for deletion
 * (conversations + messages, uploads + their blobs).
 *
 * Why a code and not a click-to-approve link (ADR-022): approval happens inside the student's signed-in
 * session, so no unauthenticated endpoint can grant anything; email link scanners that open every link
 * cannot approve; the code reuses the OTP pattern (keyed hash, attempt cap, expiry). The withdraw link is
 * the one unauthenticated action, and it can only switch features OFF; its page needs a button press.
 */
import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';
import { and, eq, inArray, isNotNull, sql } from 'drizzle-orm';
import type { FastifyBaseLogger } from 'fastify';
import { aiConversations, auditLog, consentRecords, normalizeEmail, uploads, type Database } from '@soyl/db';
import { AI_UPLOADS } from '@soyl/shared/config/ai-actions';
import { BUILTIN_CONSENT, type AgeBand, type ConsentMethod, type ConsentRevoker, type ConsentState } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { securityEvent } from '../logging';
import { rateLimited, type RateLimiter } from '../rate-limit';
import type { EmailSender } from '../auth/senders/email';
import type { BlobStore } from '../ai/blob';
import type { AuthUser } from '../types';
import type { ConsentFlow, ConsentProvider, ConsentStatus } from './provider';
import type { ConsentService } from './service';
import { parentConsentEmail } from './email';

type ConsentRecord = typeof consentRecords.$inferSelect;

/** The provider half: what the gate reads. Authoritative; no record = `required`. */
export class BuiltinConsentProvider implements ConsentProvider {
  readonly name = 'builtin';
  readonly isMock = false;

  constructor(private readonly db: Database) {}

  async getStatus(userId: string): Promise<ConsentStatus> {
    const [r] = await this.db.select().from(consentRecords).where(eq(consentRecords.userId, userId));
    if (!r) return { status: 'required', authoritative: true, providerRef: null, grantedAt: null, revokedAt: null };
    return { status: r.status as ConsentState, authoritative: true, providerRef: r.id, grantedAt: r.grantedAt, revokedAt: r.revokedAt };
  }

  /** The flow is interactive (age band, parent email, code) and runs on /me/consent; nothing to redirect to. */
  async startFlow(userId: string): Promise<ConsentFlow> {
    return { status: (await this.getStatus(userId)).status, redirectUrl: null };
  }
}

export function isBuiltinProvider(p: ConsentProvider): p is BuiltinConsentProvider {
  return p instanceof BuiltinConsentProvider;
}

export interface ConsentView {
  /** Which consent UI applies: `builtin` (this flow), `external` (start → redirect), `none` (no consent system yet). */
  flow: 'builtin' | 'external' | 'none';
  status: ConsentState;
  ageBand: AgeBand | null;
  method: ConsentMethod | null;
  /** Masked parent email while a request is pending or after approval. */
  parentEmailHint: string | null;
  codeExpiresAt: string | null;
  grantedAt: string | null;
  revokedAt: string | null;
  revokedBy: ConsentRevoker | null;
  policyVersion: string;
}

export interface ConsentRequestContext {
  ip: string;
  log: FastifyBaseLogger;
  requestId: string;
}

export interface BuiltinConsentDeps {
  db: Database;
  clock: Clock;
  limiter: RateLimiter;
  email: EmailSender;
  consent: ConsentService;
  /** OTP_PEPPER: keys the code hash, the parent-email hash and the withdraw-link signature (separate labels). */
  pepper: string;
  /** Public web origin + path base for links in the email. */
  publicBaseUrl: string;
  /** Blob store for deleting uploads on withdrawal (the AI runtime's). */
  blob: () => BlobStore;
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

/** "parent@gmail.com" → "p•••@gmail.com". */
export function maskEmail(email: string): string {
  const at = email.lastIndexOf('@');
  if (at < 1) return '•••';
  return `${[...email.slice(0, at)][0]}•••${email.slice(at)}`;
}

export class BuiltinConsentFlow {
  private readonly key: Buffer;

  constructor(private readonly d: BuiltinConsentDeps) {
    this.key = createHmac('sha256', d.pepper).update('soyl/consent/builtin/v1').digest();
  }

  private mac(label: string, value: string): string {
    return createHmac('sha256', this.key).update(`${label}\n${value}`).digest('hex');
  }

  private now(): Date {
    return new Date(this.d.clock.now());
  }

  private async record(userId: string): Promise<ConsentRecord | null> {
    const [r] = await this.d.db.select().from(consentRecords).where(eq(consentRecords.userId, userId));
    return r ?? null;
  }

  private async ensureRecord(userId: string): Promise<ConsentRecord> {
    await this.d.db.insert(consentRecords).values({ userId }).onConflictDoNothing();
    return (await this.record(userId))!;
  }

  static view(r: ConsentRecord | null): ConsentView {
    return {
      flow: 'builtin',
      status: (r?.status as ConsentState | undefined) ?? 'required',
      ageBand: (r?.ageBand as AgeBand | null | undefined) ?? null,
      method: (r?.method as ConsentMethod | null | undefined) ?? null,
      parentEmailHint: r && r.ageBand === 'minor' && (r.status === 'pending' || r.status === 'granted') ? r.parentEmailHint : null,
      codeExpiresAt: r?.status === 'pending' && r.codeExpiresAt ? r.codeExpiresAt.toISOString() : null,
      grantedAt: r?.status === 'granted' && r.grantedAt ? r.grantedAt.toISOString() : null,
      revokedAt: r?.status === 'revoked' && r.revokedAt ? r.revokedAt.toISOString() : null,
      revokedBy: r?.status === 'revoked' ? ((r.revokedBy as ConsentRevoker | null) ?? null) : null,
      policyVersion: BUILTIN_CONSENT.policyVersion,
    };
  }

  async view(userId: string): Promise<ConsentView> {
    return BuiltinConsentFlow.view(await this.record(userId));
  }

  /** Rewrites the gate cache from the record and records the transition (ids and states only, DB-8). */
  private async after(userId: string, actor: { userId: string | null; role: string }, action: string, r: ConsentRecord, ctx: ConsentRequestContext | null): Promise<void> {
    await this.d.consent.refresh(userId);
    await this.d.db.insert(auditLog).values({
      actorUserId: actor.userId,
      actorRole: actor.role,
      action,
      targetType: 'user',
      targetId: userId,
      after: { status: r.status, ageBand: r.ageBand, method: r.method, policyVersion: r.policyVersion, revokedBy: r.revokedBy },
      requestId: ctx?.requestId ?? null,
      createdAt: this.now(),
    });
  }

  /** Age band: 18+ self-consents (with an audit row); under 18 waits for a parent. */
  async declareAgeBand(user: AuthUser, band: AgeBand, ctx: ConsentRequestContext): Promise<ConsentView> {
    const now = this.now();
    const current = await this.ensureRecord(user.id);
    const actor = { userId: user.id, role: user.role };
    if (band === 'adult') {
      if (current.ageBand === 'minor') throw new ApiProblem('age_band_locked', { detail: 'An account declared as under 18 cannot switch itself to 18 or older.' });
      if (current.ageBand === 'adult' && current.status === 'granted') return BuiltinConsentFlow.view(current); // idempotent
      const [r] = await this.d.db
        .update(consentRecords)
        .set({
          ageBand: 'adult',
          status: 'granted',
          method: 'self_declared',
          policyVersion: BUILTIN_CONSENT.policyVersion,
          declaredAt: current.declaredAt ?? now,
          grantedAt: now,
          revokedAt: null,
          revokedBy: null,
          codeHash: null,
          codeExpiresAt: null,
          codeAttempts: 0,
          updatedAt: now,
        })
        .where(eq(consentRecords.userId, user.id))
        .returning();
      await this.after(user.id, actor, 'consent.self_declared', r!, ctx);
      return BuiltinConsentFlow.view(r!);
    }
    // minor
    if (current.ageBand === 'minor') return BuiltinConsentFlow.view(current); // idempotent
    const wasGranted = current.status === 'granted';
    const [r] = await this.d.db
      .update(consentRecords)
      .set({
        ageBand: 'minor',
        status: 'required',
        method: null,
        policyVersion: null,
        declaredAt: now,
        grantedAt: null,
        revokedAt: wasGranted ? now : null,
        revokedBy: null,
        updatedAt: now,
      })
      .where(eq(consentRecords.userId, user.id))
      .returning();
    await this.after(user.id, actor, 'consent.age_band_declared', r!, ctx);
    if (wasGranted) await this.deleteAiData(user.id, ctx.log);
    return BuiltinConsentFlow.view(r!);
  }

  /** Under 18: email a one-time approval code to the parent. Rate-limited per account, parent email and IP. */
  async requestParentApproval(user: AuthUser, rawParentEmail: string, ctx: ConsentRequestContext): Promise<ConsentView & { resendAfterSeconds: number }> {
    const current = await this.ensureRecord(user.id);
    if (current.ageBand !== 'minor') throw new ApiProblem('age_band_required', { detail: 'Parent approval is for accounts declared as under 18.' });
    if (current.status === 'granted') return { ...BuiltinConsentFlow.view(current), resendAfterSeconds: 0 }; // idempotent

    const parentEmail = rawParentEmail.trim().toLowerCase();
    const invalid = (message: string) => new ApiProblem('validation_failed', { errors: [{ path: 'body.parentEmail', message }] });
    if (parentEmail.length > 254 || !EMAIL_RE.test(parentEmail)) throw invalid('Enter a valid email address.');
    const parentNorm = normalizeEmail(parentEmail);
    if (!parentNorm) throw invalid('Enter a valid email address.');
    if (parentNorm === normalizeEmail(user.email)) throw invalid('Use your parent’s or guardian’s email, not your own.');

    const limits = BUILTIN_CONSENT.send;
    for (const [name, subject, l] of [
      ['consent-send-user', user.id, limits.perUser],
      ['consent-send-parent', `parent:${parentNorm}`, limits.perParentEmail],
      ['consent-send-ip', ctx.ip, limits.perIp],
    ] as const) {
      const hit = await this.d.limiter.hitAll(name, subject, l);
      if (hit) {
        securityEvent(ctx.log, 'rate_limited', { bucket: name, window: hit.bucket, userId: user.id });
        throw rateLimited(hit);
      }
    }

    const now = this.now();
    const parentHash = this.mac('parent-email', parentNorm);
    const newParent = current.parentEmailHash !== parentHash;
    const code = String(randomInt(0, 10 ** BUILTIN_CONSENT.codeLength)).padStart(BUILTIN_CONSENT.codeLength, '0');
    const expiresAt = new Date(now.getTime() + BUILTIN_CONSENT.codeTtlSeconds * 1000);
    const [r] = await this.d.db
      .update(consentRecords)
      .set({
        status: 'pending',
        parentEmailHash: parentHash,
        parentEmailHint: maskEmail(parentEmail),
        codeHash: this.codeHash(current.id, code),
        codeExpiresAt: expiresAt,
        codeAttempts: 0,
        codeSentAt: now,
        revokeGeneration: newParent ? sql`${consentRecords.revokeGeneration} + 1` : current.revokeGeneration,
        updatedAt: now,
      })
      .where(and(eq(consentRecords.userId, user.id), sql`${consentRecords.status} <> 'granted'`))
      .returning();
    if (!r) return { ...(await this.view(user.id)), resendAfterSeconds: 0 }; // granted meanwhile

    const base = this.d.publicBaseUrl;
    try {
      await this.d.email.send(
        parentConsentEmail({
          to: parentEmail,
          code,
          studentHint: maskEmail(user.email),
          hours: Math.round(BUILTIN_CONSENT.codeTtlSeconds / 3600),
          privacyUrl: `${base}/privacy`,
          termsUrl: `${base}/terms`,
          withdrawUrl: `${base}/me/consent/parent#t=${this.withdrawToken(r.id, r.revokeGeneration)}`,
        }),
      );
    } catch {
      // The code was never delivered: kill it so it cannot be guessed, and say so.
      await this.d.db
        .update(consentRecords)
        .set({ codeHash: null, codeExpiresAt: null, status: current.status === 'pending' ? 'required' : current.status, updatedAt: this.now() })
        .where(and(eq(consentRecords.id, r.id), eq(consentRecords.codeHash, r.codeHash!)));
      await this.d.consent.refresh(user.id);
      throw new ApiProblem('service_unavailable', { detail: 'We could not send the email. Please try again shortly.' });
    }
    await this.after(user.id, { userId: user.id, role: user.role }, 'consent.parent_code_sent', r, ctx);
    return { ...BuiltinConsentFlow.view(r), resendAfterSeconds: BUILTIN_CONSENT.resendAfterSeconds };
  }

  private codeHash(recordId: string, code: string): string {
    return this.mac('code', `${recordId}\n${code}`);
  }

  /** The student enters the code their parent gave them. Single use; 5 tries per code; 10 wrong per day. */
  async verifyCode(user: AuthUser, code: string, ctx: ConsentRequestContext): Promise<ConsentView> {
    const current = await this.record(user.id);
    if (current?.status === 'granted') return BuiltinConsentFlow.view(current); // idempotent replay
    if (!current || current.ageBand !== 'minor') throw new ApiProblem('age_band_required');

    const f = BUILTIN_CONSENT.verifyFailures;
    const failures = await this.d.limiter.count('consent-verify-fail', user.id, f.windowSeconds);
    if (failures >= f.limit) {
      securityEvent(ctx.log, 'rate_limited', { bucket: 'consent-verify-fail', userId: user.id });
      throw rateLimited({ retryAfterMs: f.windowSeconds * 1000 }, 'otp_locked');
    }

    const now = this.now();
    // Increment-then-compare in one statement: parallel guesses cannot exceed the attempt cap.
    const [row] = await this.d.db
      .update(consentRecords)
      .set({ codeAttempts: sql`${consentRecords.codeAttempts} + 1`, updatedAt: now })
      .where(
        and(
          eq(consentRecords.userId, user.id),
          eq(consentRecords.status, 'pending'),
          isNotNull(consentRecords.codeHash),
          sql`${consentRecords.codeExpiresAt} > ${now}`,
          sql`${consentRecords.codeAttempts} < ${BUILTIN_CONSENT.maxAttemptsPerCode}`,
        ),
      )
      .returning({ id: consentRecords.id, codeHash: consentRecords.codeHash });
    if (!row?.codeHash) {
      await this.d.limiter.add('consent-verify-fail', user.id, f.windowSeconds);
      throw new ApiProblem('consent_code_expired');
    }
    const expected = Buffer.from(row.codeHash, 'hex');
    const actual = Buffer.from(this.codeHash(row.id, /^\d{6}$/.test(code) ? code : '!'), 'hex');
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      await this.d.limiter.add('consent-verify-fail', user.id, f.windowSeconds);
      throw new ApiProblem('consent_code_invalid');
    }
    const [r] = await this.d.db
      .update(consentRecords)
      .set({
        status: 'granted',
        method: 'parent_email_code',
        policyVersion: BUILTIN_CONSENT.policyVersion,
        grantedAt: now,
        revokedAt: null,
        revokedBy: null,
        codeHash: null,
        codeExpiresAt: null,
        codeAttempts: 0,
        updatedAt: now,
      })
      .where(and(eq(consentRecords.id, row.id), eq(consentRecords.codeHash, row.codeHash)))
      .returning();
    if (!r) return this.view(user.id); // a parallel request consumed it
    await this.after(user.id, { userId: user.id, role: user.role }, 'consent.granted', r, ctx);
    return BuiltinConsentFlow.view(r);
  }

  /** The account holder withdraws (or cancels a pending request). Idempotent. */
  async withdraw(user: AuthUser, ctx: ConsentRequestContext): Promise<ConsentView> {
    const r = await this.revoke(eq(consentRecords.userId, user.id), 'account_holder', { userId: user.id, role: user.role }, ctx);
    return r ? BuiltinConsentFlow.view(r) : this.view(user.id);
  }

  /** `<record id>.<generation>.<HMAC>`: the parent's withdraw/decline link (no expiry; parents may withdraw any time). */
  withdrawToken(recordId: string, generation: number): string {
    return `${recordId}.${generation}.${this.mac('withdraw', `${recordId}\n${generation}`).slice(0, 43)}`;
  }

  private parseWithdrawToken(token: string): { recordId: string; generation: number } | null {
    const m = /^([0-9a-f-]{36})\.(\d{1,9})\.([0-9a-f]{43})$/.exec(token.trim());
    if (!m) return null;
    const expected = Buffer.from(this.withdrawToken(m[1]!, Number(m[2])));
    const given = Buffer.from(token.trim());
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
    return { recordId: m[1]!, generation: Number(m[2]) };
  }

  /** The parent's link: shows nothing about the student; withdraws (granted) or declines (pending). Idempotent. */
  async withdrawByParent(token: string, ctx: ConsentRequestContext): Promise<{ status: ConsentState; alreadyWithdrawn: boolean }> {
    const t = this.parseWithdrawToken(token);
    const invalid = () => {
      securityEvent(ctx.log, 'authz_denied', { reason: 'consent_withdraw_link_invalid', ip: ctx.ip });
      return new ApiProblem('consent_link_invalid');
    };
    if (!t) throw invalid();
    const [current] = await this.d.db.select().from(consentRecords).where(eq(consentRecords.id, t.recordId));
    if (!current || current.revokeGeneration !== t.generation || current.ageBand !== 'minor') throw invalid();
    if (current.status === 'revoked' || current.status === 'required') return { status: current.status as ConsentState, alreadyWithdrawn: true };
    const r = await this.revoke(and(eq(consentRecords.id, t.recordId), eq(consentRecords.revokeGeneration, t.generation))!, 'parent', { userId: null, role: 'parent' }, ctx);
    return { status: (r?.status as ConsentState | undefined) ?? 'revoked', alreadyWithdrawn: !r };
  }

  /** granted|pending → revoked; the code dies; leaving `granted` deletes the AI data (PII.md). */
  private async revoke(where: ReturnType<typeof eq>, by: ConsentRevoker, actor: { userId: string | null; role: string }, ctx: ConsentRequestContext): Promise<ConsentRecord | null> {
    const now = this.now();
    const [before] = await this.d.db.select({ status: consentRecords.status }).from(consentRecords).where(where);
    const [r] = await this.d.db
      .update(consentRecords)
      .set({ status: 'revoked', revokedAt: now, revokedBy: by, codeHash: null, codeExpiresAt: null, codeAttempts: 0, updatedAt: now })
      .where(and(where, inArray(consentRecords.status, ['granted', 'pending'])))
      .returning();
    if (!r) return null;
    await this.after(r.userId, actor, 'consent.revoked', r, ctx);
    if (before?.status === 'granted') await this.deleteAiData(r.userId, ctx.log);
    return r;
  }

  /**
   * PII.md "AI data" on withdrawal: AI conversations (messages cascade) and uploads with both blobs.
   * Rows are marked `deleted` in one transaction first (processing never resurrects them); blobs go
   * next; a row whose blob delete failed stays `deleted` for the storage lifecycle rule (30 days).
   */
  async deleteAiData(userId: string, log: FastifyBaseLogger): Promise<{ conversations: number; uploads: number }> {
    const now = this.now();
    const { conversations, marked } = await this.d.db.transaction(async (tx) => {
      const c = await tx.delete(aiConversations).where(eq(aiConversations.userId, userId)).returning({ id: aiConversations.id });
      const m = await tx
        .update(uploads)
        .set({ status: 'deleted', updatedAt: now })
        .where(eq(uploads.userId, userId))
        .returning({ id: uploads.id, blobKey: uploads.blobKey, processedKey: uploads.processedKey });
      return { conversations: c.length, marked: m };
    });
    const done: string[] = [];
    for (const u of marked) {
      try {
        const blob = this.d.blob();
        await blob.delete(AI_UPLOADS.containers.quarantine, u.blobKey);
        if (u.processedKey) await blob.delete(AI_UPLOADS.containers.clean, u.processedKey);
        done.push(u.id);
      } catch (err) {
        log.warn({ err, uploadId: u.id }, 'consent withdrawal: upload blob delete failed (lifecycle rule will remove it)');
      }
    }
    if (done.length) await this.d.db.delete(uploads).where(and(inArray(uploads.id, done), eq(uploads.status, 'deleted')));
    await this.d.db.insert(auditLog).values({
      actorUserId: null,
      actorRole: 'system',
      action: 'consent.ai_data_deleted',
      targetType: 'user',
      targetId: userId,
      after: { conversations, uploads: marked.length, blobsDeleted: done.length },
      createdAt: now,
    });
    return { conversations, uploads: marked.length };
  }
}

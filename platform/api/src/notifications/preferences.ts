/**
 * Email reminder settings and the signed email links (D-055).
 *
 *   view / update               the student's own switches (GET/PATCH /v1/me/email-preferences)
 *   setParentEmail              the optional "parent email for updates": stored as pending and ONE confirmation email
 *                               is sent (rate-limited per account, per address and per IP, like the consent code)
 *   resendParentConfirm         a new confirmation link to the stored pending address (same limits)
 *   removeParentEmail           the student removes it (the address is erased at once)
 *   confirmParent(token)        the parent pressed Confirm on the platform page (a POST; opening the link does nothing)
 *   unsubscribe(token)          one click from any reminder: student → their switch off; parent → address erased
 *
 * State of the parent address (`notification_preferences`):
 *
 *   none ──set──▶ pending (generation+1, confirm email) ──confirm (POST, ≤ 72 h, latest link only)──▶ active
 *   pending ──set same──▶ pending (new link, the old one dies) · ──set other──▶ pending (generation+1)
 *   active ──set same──▶ active (no email) · ──set other──▶ pending (generation+1: the old parent's links die)
 *   any ──remove (student) | unsubscribe (parent)──▶ none (address erased, generation+1)
 *
 * Nothing here can send email anywhere except the one confirmation email per (rate-limited) request.
 */
import { and, eq, sql } from 'drizzle-orm';
import { auditLog, normalizeEmail, notificationPreferences, users, type Database, type ParentEmailStatus } from '@soyl/db';
import { REMINDERS } from '@soyl/shared/config/notifications';
import { maskEmail } from '@soyl/shared/config/security';
import { publicName } from '@soyl/shared/config/public-names';
import type { FastifyBaseLogger } from 'fastify';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { securityEvent } from '../logging';
import { rateLimited, type RateLimiter } from '../rate-limit';
import type { EmailSender } from '../auth/senders/email';
import type { AuthUser } from '../types';
import { parentConfirmEmail } from './emails';
import type { EmailLinks } from './links';
import { studentHint } from './reminders';
import type { EmailTokens } from './tokens';

type Prefs = typeof notificationPreferences.$inferSelect;

export interface EmailPreferencesView {
  /** Masked student address (a***@gmail.com), or null for phone-only accounts. */
  studentEmail: string | null;
  /** Reminders to the student's own address are on (always false when unavailable). */
  reminders: boolean;
  /** False when the account has no usable email address (phone sign-up). */
  remindersAvailable: boolean;
  parent: {
    email: string | null;
    status: ParentEmailStatus;
    reminders: boolean;
    /** When a parent last unsubscribed (their address was erased then); null otherwise. */
    unsubscribedAt: string | null;
  };
}

export interface EmailRequestContext {
  ip: string;
  log: FastifyBaseLogger;
  requestId: string;
}

export interface EmailPreferencesDeps {
  db: Database;
  clock: Clock;
  limiter: RateLimiter;
  email: EmailSender;
  tokens: EmailTokens;
  links: EmailLinks;
}

/** Same address rule as the consent flow's parent email (consent/builtin.ts). */
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

/** The student has an address reminders can go to (verified, not a phone sign-up placeholder). */
export function hasStudentEmail(user: Pick<AuthUser, 'email' | 'emailVerified'>): boolean {
  return Boolean(user.email && user.emailVerified && !user.email.endsWith('.invalid'));
}

export class EmailPreferencesService {
  constructor(private readonly d: EmailPreferencesDeps) {}

  private now(): Date {
    return new Date(this.d.clock.now());
  }

  private async row(userId: string): Promise<Prefs | null> {
    const [r] = await this.d.db.select().from(notificationPreferences).where(eq(notificationPreferences.userId, userId));
    return r ?? null;
  }

  private async ensure(userId: string): Promise<Prefs> {
    await this.d.db.insert(notificationPreferences).values({ userId, studentReminders: REMINDERS.studentDefault }).onConflictDoNothing();
    return (await this.row(userId))!;
  }

  static view(user: Pick<AuthUser, 'email' | 'emailVerified'>, r: Prefs | null): EmailPreferencesView {
    const available = hasStudentEmail(user);
    const status = (r?.parentStatus as ParentEmailStatus | undefined) ?? 'none';
    return {
      studentEmail: available ? maskEmail(user.email) : null,
      reminders: available && (r?.studentReminders ?? REMINDERS.studentDefault),
      remindersAvailable: available,
      parent: {
        email: r?.parentEmail ? maskEmail(r.parentEmail) : null,
        status,
        reminders: r?.parentReminders ?? true,
        unsubscribedAt: status === 'none' && r?.parentUnsubscribedAt ? r.parentUnsubscribedAt.toISOString() : null,
      },
    };
  }

  async view(user: AuthUser): Promise<EmailPreferencesView> {
    return EmailPreferencesService.view(user, await this.row(user.id));
  }

  async update(user: AuthUser, patch: { reminders?: boolean; parentReminders?: boolean }): Promise<EmailPreferencesView> {
    if (patch.reminders === true && !hasStudentEmail(user)) throw new ApiProblem('reminders_unavailable');
    await this.ensure(user.id);
    const set: Partial<Prefs> = { updatedAt: this.now() };
    if (patch.reminders !== undefined) set.studentReminders = patch.reminders;
    if (patch.parentReminders !== undefined) set.parentReminders = patch.parentReminders;
    const [r] = await this.d.db.update(notificationPreferences).set(set).where(eq(notificationPreferences.userId, user.id)).returning();
    return EmailPreferencesService.view(user, r ?? null);
  }

  /** Adds or changes the parent address and sends ONE confirmation email to it. */
  async setParentEmail(user: AuthUser, raw: string, ctx: EmailRequestContext): Promise<EmailPreferencesView & { resendAfterSeconds: number }> {
    const address = raw.trim().toLowerCase();
    const invalid = (message: string) => new ApiProblem('validation_failed', { errors: [{ path: 'body.email', message }] });
    if (address.length > 254 || !EMAIL_RE.test(address)) throw invalid('Enter a valid email address.');
    const norm = normalizeEmail(address);
    if (!norm || address.endsWith('.invalid')) throw invalid('Enter a valid email address.');
    if (norm === normalizeEmail(user.email)) throw invalid('Use your parent’s or guardian’s email, not your own.');

    const current = await this.ensure(user.id);
    const same = current.parentEmail !== null && normalizeEmail(current.parentEmail) === norm;
    if (same && current.parentStatus === 'active') return { ...EmailPreferencesService.view(user, current), resendAfterSeconds: 0 }; // idempotent

    const limits = REMINDERS.parentConfirmSend;
    for (const [name, subject, l] of [
      ['reminder-confirm-user', user.id, limits.perUser],
      ['reminder-confirm-address', `addr:${norm}`, limits.perAddress],
      ['reminder-confirm-ip', ctx.ip, limits.perIp],
    ] as const) {
      const hit = await this.d.limiter.hitAll(name, subject, l);
      if (hit) {
        securityEvent(ctx.log, 'rate_limited', { bucket: name, window: hit.bucket, userId: user.id });
        throw rateLimited(hit);
      }
    }

    const now = this.now();
    // Same address still pending: a resend (new link, same generation). Anything else: a new generation.
    const generation = same && current.parentStatus === 'pending' ? current.parentGeneration : current.parentGeneration + 1;
    const [r] = await this.d.db
      .update(notificationPreferences)
      .set({
        parentEmail: address,
        parentStatus: 'pending',
        parentGeneration: generation,
        parentConfirmSentAt: now,
        parentConfirmedAt: null,
        parentReminders: true,
        parentUnsubscribedAt: null,
        updatedAt: now,
      })
      .where(and(eq(notificationPreferences.userId, user.id), eq(notificationPreferences.parentGeneration, current.parentGeneration)))
      .returning();
    if (!r) throw new ApiProblem('service_unavailable', { detail: 'Your settings changed at the same time. Please try again.' });

    try {
      await this.d.email.send(
        parentConfirmEmail({
          to: address,
          publicName: publicName(user.id, await this.publicNameSeed(user.id)),
          studentHint: studentHint(user.email, user.emailVerified),
          confirmUrl: this.d.links.parentConfirm(user.id, generation, now),
          hours: REMINDERS.parentConfirmTtlHours,
          parentMinGapDays: REMINDERS.parentMinGapDays,
          privacyUrl: this.d.links.page('/privacy'),
        }),
      );
    } catch (err) {
      // Never delivered: kill the link (it cannot be confirmed) and say so; the student can resend.
      await this.d.db
        .update(notificationPreferences)
        .set({ parentConfirmSentAt: null, updatedAt: this.now() })
        .where(and(eq(notificationPreferences.userId, user.id), eq(notificationPreferences.parentGeneration, generation), eq(notificationPreferences.parentConfirmSentAt, now)));
      ctx.log.warn({ notify: 'reminders', event: 'parent_confirm_send_failed', errorClass: (err as Error)?.name ?? 'Error' }, 'parent confirmation email failed');
      throw new ApiProblem('service_unavailable', { detail: 'We could not send the email. Please try again shortly.' });
    }
    ctx.log.info({ notify: 'reminders', event: 'parent_confirm_sent', resend: same }, 'parent confirmation email sent');
    return { ...EmailPreferencesService.view(user, r), resendAfterSeconds: REMINDERS.resendAfterSeconds };
  }

  /** Resends the confirmation to the stored pending address (new link; the old one dies). Same limits as a send. */
  async resendParentConfirm(user: AuthUser, ctx: EmailRequestContext): Promise<EmailPreferencesView & { resendAfterSeconds: number }> {
    const current = await this.row(user.id);
    if (!current?.parentEmail || current.parentStatus !== 'pending') return { ...EmailPreferencesService.view(user, current), resendAfterSeconds: 0 };
    return this.setParentEmail(user, current.parentEmail, ctx);
  }

  private async publicNameSeed(userId: string): Promise<number> {
    const res = await this.d.db.execute<{ seed: number }>(sql`SELECT public_name_seed AS seed FROM profiles WHERE user_id = ${userId}::uuid`);
    return Number(res.rows[0]?.seed ?? 0);
  }

  /** The student removes the parent address (erased at once; earlier links stop working). Idempotent. */
  async removeParentEmail(user: AuthUser): Promise<EmailPreferencesView> {
    const current = await this.row(user.id);
    if (!current || current.parentStatus === 'none') return EmailPreferencesService.view(user, current);
    const [r] = await this.d.db
      .update(notificationPreferences)
      .set({ ...clearedParent(current.parentGeneration + 1), updatedAt: this.now() })
      .where(eq(notificationPreferences.userId, user.id))
      .returning();
    return EmailPreferencesService.view(user, r ?? null);
  }

  /** The parent pressed Confirm. Only the latest link for the current address works, within the TTL. Idempotent. */
  async confirmParent(token: string, ctx: EmailRequestContext): Promise<{ status: 'active'; alreadyConfirmed: boolean }> {
    const p = this.d.tokens.parse(token);
    if (!p || p.purpose !== 'confirm') {
      securityEvent(ctx.log, 'authz_denied', { reason: 'email_link_invalid', ip: ctx.ip });
      throw new ApiProblem('email_link_invalid');
    }
    const r = await this.liveRow(p.userId);
    const expired = () => new ApiProblem('email_link_expired');
    if (!r || r.parentStatus === 'none' || r.parentGeneration !== p.generation || !r.parentConfirmSentAt) throw expired();
    if (!this.d.tokens.verifyConfirm(p, r.parentConfirmSentAt)) {
      // A forged MAC and a link replaced by a resend look the same from here.
      securityEvent(ctx.log, 'authz_denied', { reason: 'email_confirm_mismatch', ip: ctx.ip });
      throw expired();
    }
    if (r.parentStatus === 'active') return { status: 'active', alreadyConfirmed: true };
    const now = this.now();
    if (now.getTime() - r.parentConfirmSentAt.getTime() > REMINDERS.parentConfirmTtlHours * 3_600_000) throw expired();
    const [done] = await this.d.db
      .update(notificationPreferences)
      .set({ parentStatus: 'active', parentConfirmedAt: now, updatedAt: now })
      .where(
        and(
          eq(notificationPreferences.userId, p.userId),
          eq(notificationPreferences.parentGeneration, p.generation),
          eq(notificationPreferences.parentStatus, 'pending'),
          eq(notificationPreferences.parentConfirmSentAt, r.parentConfirmSentAt),
        ),
      )
      .returning({ id: notificationPreferences.id });
    if (!done) {
      const again = await this.liveRow(p.userId);
      if (again?.parentStatus === 'active' && again.parentGeneration === p.generation) return { status: 'active', alreadyConfirmed: true };
      throw expired();
    }
    await this.audit(p.userId, 'email.parent_confirmed', { generation: p.generation }, ctx);
    ctx.log.info({ notify: 'reminders', event: 'parent_confirmed' }, 'parent address confirmed');
    return { status: 'active', alreadyConfirmed: false };
  }

  /** One click from a reminder email: student → their reminders off; parent → their address erased. Idempotent. */
  async unsubscribe(token: string, ctx: EmailRequestContext): Promise<{ kind: 'student' | 'parent'; alreadyOff: boolean }> {
    const t = this.d.tokens.verifyUnsubscribe(token);
    if (!t) {
      securityEvent(ctx.log, 'authz_denied', { reason: 'email_link_invalid', ip: ctx.ip });
      throw new ApiProblem('email_link_invalid');
    }
    const now = this.now();
    if (t.purpose === 'student') {
      // A deleted or purged account has nothing left to switch off.
      const [u] = await this.d.db.select({ id: users.id }).from(users).where(and(eq(users.id, t.userId), sql`${users.deletedAt} IS NULL`));
      if (!u) return { kind: 'student', alreadyOff: true };
      await this.ensure(t.userId);
      const [r] = await this.d.db
        .update(notificationPreferences)
        .set({ studentReminders: false, updatedAt: now })
        .where(and(eq(notificationPreferences.userId, t.userId), eq(notificationPreferences.studentReminders, true)))
        .returning({ id: notificationPreferences.id });
      if (r) ctx.log.info({ notify: 'reminders', event: 'reminders_unsubscribed', kind: 'student' }, 'student unsubscribed from reminders');
      return { kind: 'student', alreadyOff: !r };
    }
    const [r] = await this.d.db
      .update(notificationPreferences)
      .set({ ...clearedParent(t.generation + 1), parentUnsubscribedAt: now, updatedAt: now })
      .where(and(eq(notificationPreferences.userId, t.userId), eq(notificationPreferences.parentGeneration, t.generation), sql`${notificationPreferences.parentStatus} <> 'none'`))
      .returning({ id: notificationPreferences.id });
    if (!r) return { kind: 'parent', alreadyOff: true };
    await this.audit(t.userId, 'email.parent_unsubscribed', { generation: t.generation }, ctx);
    ctx.log.info({ notify: 'reminders', event: 'reminders_unsubscribed', kind: 'parent' }, 'parent unsubscribed; address erased');
    return { kind: 'parent', alreadyOff: false };
  }

  /** The settings row of an account that still exists (not deleted). */
  private async liveRow(userId: string): Promise<Prefs | null> {
    const [r] = await this.d.db
      .select({ p: notificationPreferences })
      .from(notificationPreferences)
      .innerJoin(users, eq(users.id, notificationPreferences.userId))
      .where(and(eq(notificationPreferences.userId, userId), sql`${users.deletedAt} IS NULL`));
    return r?.p ?? null;
  }

  private async audit(userId: string, action: string, after: Record<string, unknown>, ctx: EmailRequestContext): Promise<void> {
    await this.d.db.insert(auditLog).values({
      actorUserId: null,
      actorRole: 'parent',
      action,
      targetType: 'user',
      targetId: userId,
      after,
      requestId: ctx.requestId,
      createdAt: this.now(),
    });
  }
}

/** The parent part of the row reset to "none" (the address erased). */
function clearedParent(generation: number): Partial<Prefs> {
  return { parentEmail: null, parentStatus: 'none', parentGeneration: generation, parentConfirmSentAt: null, parentConfirmedAt: null, parentReminders: true };
}

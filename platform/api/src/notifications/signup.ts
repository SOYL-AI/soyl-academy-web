/**
 * New student sign-up notice to the owner (SIGNUP_NOTIFY_EMAIL; owner request 2026-11-12).
 *
 * - Only new STUDENT accounts created through sign-in (IdentityService.afterCreate). Staff never sign up through
 *   it (DB-7: roles are granted by `admin bootstrap`), re-logins create nothing, seeded fixture users never pass here.
 * - Runs in the background after the account row is committed; the sign-in response never waits for it and never
 *   fails because of it (`signup_notify_failed`, alert, error class only).
 * - Data minimisation (D-039): the email carries the masked identifier, the sign-in method, the time (IST) and two
 *   aggregate counts. No full address, phone, user id, IP or user agent; the owner looks the account up in /admin,
 *   where reveals are audited (D-045).
 * - Flood guard: SIGNUP_NOTIFY.maxPerHour emails per rolling hour across instances (KV window); beyond it
 *   `signup_notify_suppressed` is logged instead.
 */
import { and, eq, isNull, sql } from 'drizzle-orm';
import { users, type Database } from '@soyl/db';
import { maskEmail, maskPhone } from '@soyl/shared/config/security';
import { SIGNUP_NOTIFY } from '@soyl/shared/config/notifications';
import type { Clock } from '../clock';
import { istDayStart } from '../ai/time';
import { BRAND, escapeHtml, type EmailMessage, type EmailSender } from '../auth/senders/email';
import { istDateTime } from '../future-builders/email';
import type { RateLimiter } from '../rate-limit';
import type { AuthUser } from '../types';

export type SignupMethod = 'phone' | 'email' | 'google';

export interface SignupNotifyLog {
  info(obj: object, msg?: string): void;
  warn(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

export interface SignupNotifierDeps {
  db: Database;
  clock: Clock;
  email: EmailSender;
  limiter: Pick<RateLimiter, 'hit'>;
  /** SIGNUP_NOTIFY_EMAIL; null = off. */
  to: string | null;
  /** PUBLIC_BASE_URL (no trailing slash); the email links to `${publicBaseUrl}/admin`. */
  publicBaseUrl: string;
  /** Default SIGNUP_NOTIFY.maxPerHour (tests lower it). */
  maxPerHour?: number;
}

export interface SignupNotice {
  /** Masked identifier: `a***@gmail.com` or `+91******3210`. */
  account: string;
  method: SignupMethod;
  at: Date;
  today: number;
  total: number;
}

const METHOD_LABELS: Record<SignupMethod, string> = { email: 'Email code', google: 'Google', phone: 'Phone code' };
const FLOOD_BUCKET = 'signup-notify';

/** The masked identifier for the method the student signed up with (never the full value). */
export function maskedAccount(user: Pick<AuthUser, 'email' | 'phoneNumber'>, method: SignupMethod): string {
  return (method === 'phone' ? maskPhone(user.phoneNumber) : maskEmail(user.email)) ?? '***';
}

const FONT = 'Arial,Helvetica,sans-serif';

/** The notice: plain text plus a simple HTML part in the platform email style (no images, no tracking). */
export function signupNoticeEmail(to: string, n: SignupNotice, adminUrl: string): EmailMessage {
  const headline = 'New student sign-up on SOYL Academy';
  const pairs: [string, string][] = [
    [n.method === 'phone' ? 'Phone' : 'Email', n.account],
    ['Signed up with', METHOD_LABELS[n.method]],
    ['Time', istDateTime(n.at)],
    ['Sign-ups today (IST)', String(n.today)],
    ['Student accounts in total', String(n.total)],
  ];
  const text = [headline, '', ...pairs.map(([k, v]) => `${k}: ${v}`), '', `Look the account up in the admin panel: ${adminUrl}`].join('\n');
  const h = escapeHtml;
  const rows = pairs
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-family:${FONT};font-size:14px;line-height:20px;color:${BRAND.muted};white-space:nowrap;">${h(k)}</td><td style="padding:6px 0;font-family:${FONT};font-size:14px;line-height:20px;color:${BRAND.ink};">${h(v)}</td></tr>`,
    )
    .join('');
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${h(headline)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.paper};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${BRAND.white};border:1px solid ${BRAND.line};border-radius:12px;">
<tr><td style="padding:28px 28px 8px 28px;font-family:${FONT};font-size:18px;font-weight:bold;color:${BRAND.ink};">SOYL <span style="color:${BRAND.cobalt};">Academy</span></td></tr>
<tr><td style="padding:8px 28px 0 28px;font-family:${FONT};font-size:20px;line-height:28px;font-weight:bold;color:${BRAND.ink};">${h(headline)}</td></tr>
<tr><td style="padding:16px 28px 0 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};border-radius:8px;"><tr><td style="padding:10px 16px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0">${rows}</table></td></tr></table></td></tr>
<tr><td style="padding:20px 28px 28px 28px;font-family:${FONT};font-size:15px;line-height:22px;color:${BRAND.ink};">Look the account up in the <a href="${h(adminUrl)}" style="color:${BRAND.cobalt};">admin panel</a>.</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
  return { to, tag: 'signup-notice', subject: `New SOYL sign-up (#${n.total})`, text, html };
}

export class SignupNotifier {
  private readonly pending = new Set<Promise<unknown>>();
  private log: SignupNotifyLog | undefined;

  constructor(private readonly d: SignupNotifierDeps) {}

  /** Fallback logger (the app logger) when the caller passes none. */
  useLog(log: SignupNotifyLog): void {
    this.log = log;
  }

  get enabled(): boolean {
    return Boolean(this.d.to);
  }

  /**
   * A new account was created and committed. Returns at once; the email goes out in the background.
   * Never throws.
   */
  accountCreated(user: AuthUser, method: SignupMethod, log?: SignupNotifyLog): void {
    const to = this.d.to;
    if (!to || user.role !== 'student') return;
    const l = log ?? this.log;
    const p = this.notify(to, user, method, l)
      .catch((err) => l?.error({ notify: 'signup', event: 'signup_notify_failed', errorClass: (err as Error)?.name ?? 'Error', alert: true }, 'sign-up notice failed'))
      .finally(() => this.pending.delete(p));
    this.pending.add(p);
  }

  /** Waits for notices in flight (tests, graceful shutdown). */
  async drain(): Promise<void> {
    while (this.pending.size) await Promise.allSettled([...this.pending]);
  }

  private async notify(to: string, user: AuthUser, method: SignupMethod, log: SignupNotifyLog | undefined): Promise<void> {
    const cap = this.d.maxPerHour ?? SIGNUP_NOTIFY.maxPerHour;
    const guard = await this.d.limiter.hit(FLOOD_BUCKET, 'global', { limit: cap, windowSeconds: 3600 });
    if (!guard.allowed) {
      log?.warn({ notify: 'signup', event: 'signup_notify_suppressed', method, cap }, 'sign-up notice suppressed: hourly cap reached');
      return;
    }
    const at = Number.isNaN(user.createdAt?.getTime()) ? new Date(this.d.clock.now()) : user.createdAt;
    const { today, total } = await this.counts(at);
    await this.d.email.send(signupNoticeEmail(to, { account: maskedAccount(user, method), method, at, today, total }, `${this.d.publicBaseUrl}/admin`));
    log?.info({ notify: 'signup', event: 'signup_notified', method }, 'sign-up notice sent');
  }

  /** Active student accounts: created since 00:00 IST of `at`'s IST day, and in total. */
  private async counts(at: Date): Promise<{ today: number; total: number }> {
    const dayStart = istDayStart(at).toISOString();
    const [row] = await this.d.db
      .select({
        total: sql<number>`count(*)::int`,
        today: sql<number>`(count(*) filter (where ${users.createdAt} >= ${dayStart}::timestamptz))::int`,
      })
      .from(users)
      .where(and(eq(users.role, 'student'), isNull(users.deletedAt)));
    return { today: Number(row?.today ?? 0), total: Number(row?.total ?? 0) };
  }
}

/**
 * Future Builders registrations and enquiries (ADR-027).
 *
 * Ingest (marketing server → API, after it verified the Razorpay payment): one row per Razorpay payment id
 * (idempotent: the checkout callback and the webhook safety net may both report it), a gap-free receipt number
 * FB-<cohort year>-NNNNNN under a transaction-scoped advisory lock, then the parent's confirmation email and the
 * optional staff notice in the background. An email failure never fails the ingest: the row records it and staff
 * resend from the admin panel.
 *
 * Admin (superadmin): filtered, keyset-paged lists with summary counts, CSV exports and resend. Every call is
 * written to audit_log (ids, filters and counts only, never the personal data itself, DB-8).
 */
import { and, desc, eq, gte, lt, ne, sql, type SQL } from 'drizzle-orm';
import { auditLog, fbEnrollments, fbLeads, type Database } from '@soyl/db';
import { formatRupees } from '@soyl/shared/billing/gst';
import type { EmailSender } from '../auth/senders/email';
import type { Clock } from '../clock';
import type { Config } from '../config';
import { ApiProblem } from '../errors';
import { confirmationEmail, staffEnrollmentEmail, staffLeadEmail } from './email';
import type { FbEnrollmentIngest, FbEnrollmentsQuery, FbLeadIngest, FbLeadsQuery } from './schemas';

export type FbEnrollment = typeof fbEnrollments.$inferSelect;
export type FbLead = typeof fbLeads.$inferSelect;

export interface FbLog {
  info(obj: Record<string, unknown>, msg: string): void;
  warn(obj: Record<string, unknown>, msg: string): void;
  error(obj: Record<string, unknown>, msg: string): void;
}

export interface FbActor {
  userId: string;
  role: string;
  requestId: string;
}

export interface FutureBuildersDeps {
  db: Database;
  clock: Clock;
  email: EmailSender;
  config: Config['futureBuilders'];
  publicBaseUrl: string;
  log?: FbLog;
}

/** Same-phone enquiries of one kind from one form within this window are treated as one (double submits, abuse). */
export const LEAD_DEDUPE_MS = 24 * 60 * 60 * 1000;
const MAX_EXPORT_ROWS = 50_000;
const IST_OFFSET_MS = 330 * 60_000;

export const AUDIT = {
  listEnrollments: 'admin.fb.enrollments.list',
  exportEnrollments: 'admin.fb.enrollments.export',
  resend: 'admin.fb.enrollment.resend',
  listLeads: 'admin.fb.leads.list',
  exportLeads: 'admin.fb.leads.export',
} as const;

export const ENROLLMENT_CSV_COLUMNS = [
  'Receipt number',
  'Paid at (IST)',
  'Parent name',
  'Student name',
  'Email',
  'Phone',
  'Grade',
  'Amount (INR)',
  'Offer',
  'Coupon',
  'Friend name',
  'Cohort',
  'Razorpay payment id',
  'Razorpay order id',
  'Source',
  'Email status',
] as const;

export const LEAD_CSV_COLUMNS = ['Created at (IST)', 'Kind', 'Parent name', 'Student name', 'Email', 'Phone', 'Grade', 'Form'] as const;

/** Spreadsheet formula injection guard (as the invoice CSV): cells starting with = + - @ get an apostrophe. */
export function csvCell(v: string | number | null): string {
  const s = v === null ? '' : String(v);
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

/** "2026-11-08 15:42" in IST. */
export const istStamp = (d: Date): string => new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 16).replace('T', ' ');
/** Start of an IST day as a UTC instant. */
const istDayStart = (day: string): Date => new Date(Date.parse(`${day}T00:00:00Z`) - IST_OFFSET_MS);
const nextDay = (day: string): string => new Date(Date.parse(`${day}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10);

/** The receipt year: the cohort's year (summer-2027 → 2027), else the IST year of the payment. */
export function receiptYear(cohort: string, paidAt: Date): number {
  const m = /(?:^|[-_])(20\d{2})$/.exec(cohort);
  return m ? Number(m[1]) : Number(new Date(paidAt.getTime() + IST_OFFSET_MS).toISOString().slice(0, 4));
}

export const formatReceipt = (year: number, seq: number) => `FB-${year}-${String(seq).padStart(6, '0')}`;

const encodeCursor = (at: Date, id: string) => Buffer.from(`${at.toISOString()}|${id}`).toString('base64url');
function decodeCursor(c: string): { at: Date; id: string } {
  const [at, id] = Buffer.from(c, 'base64url').toString('utf8').split('|');
  if (!at || !id || Number.isNaN(Date.parse(at)) || !/^[0-9a-f-]{36}$/.test(id))
    throw new ApiProblem('validation_failed', { errors: [{ path: 'querystring.cursor', message: 'Invalid cursor.' }] });
  return { at: new Date(at), id };
}

function checkRange(q: { from?: string; to?: string }): void {
  if (q.from && q.to && q.from > q.to) throw new ApiProblem('validation_failed', { errors: [{ path: 'querystring.to', message: 'must not be before from' }] });
}

export function enrollmentView(r: FbEnrollment) {
  return {
    id: r.id,
    receiptNumber: r.receiptNumber,
    paidAt: r.paidAt.toISOString(),
    parentName: r.parentName,
    studentName: r.studentName,
    email: r.email,
    phone: r.phone,
    grade: r.grade,
    amountPaise: r.amountPaise,
    currency: 'INR' as const,
    cohort: r.cohort,
    offer: r.offer as 'diwali-2026' | 'standard',
    coupon: r.coupon,
    friendName: r.friendName,
    razorpayPaymentId: r.razorpayPaymentId,
    razorpayOrderId: r.razorpayOrderId,
    source: r.source as 'checkout' | 'webhook',
    emailStatus: r.emailStatus as 'pending' | 'sent' | 'failed',
    emailAttempts: r.emailAttempts,
    emailSentAt: r.emailSentAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
  };
}

export function leadView(r: FbLead) {
  return {
    id: r.id,
    kind: r.kind as 'callback' | 'notify' | 'waitlist',
    parentName: r.parentName,
    studentName: r.studentName,
    email: r.email,
    phone: r.phone,
    grade: r.grade,
    source: r.source,
    createdAt: r.createdAt.toISOString(),
  };
}

export class FutureBuildersService {
  private readonly pending = new Set<Promise<unknown>>();

  constructor(private readonly d: FutureBuildersDeps) {}

  useLog(log: FbLog): void {
    this.d.log = log;
  }

  private now(): Date {
    return new Date(this.d.clock.now());
  }

  private get adminUrl(): string {
    return `${this.d.publicBaseUrl}/admin`;
  }

  /** Runs `job` after the response (never throws); `drain()` waits for it (tests, graceful shutdown). */
  private background(job: () => Promise<unknown>): void {
    const p = job()
      .catch((err) => this.d.log?.error({ fb: true, event: 'fb_background_failed', err: (err as Error).name }, 'future builders background job failed'))
      .finally(() => this.pending.delete(p));
    this.pending.add(p);
  }

  async drain(): Promise<void> {
    while (this.pending.size) await Promise.allSettled([...this.pending]);
  }

  /* ---- ingest -------------------------------------------------------------------------------------- */

  async ingestEnrollment(input: FbEnrollmentIngest): Promise<{ enrollmentId: string; receiptNumber: string; created: boolean }> {
    const { db } = this.d;
    const paidAt = new Date(input.paidAt);
    const find = async (tx: Pick<Database, 'select'>) =>
      (await tx.select().from(fbEnrollments).where(eq(fbEnrollments.razorpayPaymentId, input.razorpayPaymentId)))[0];

    const existing = await find(db);
    const { row, created } = existing
      ? { row: existing, created: false }
      : await db.transaction(async (tx) => {
          // One writer at a time: the second report of a payment sees the first, and receipt numbers have no gaps.
          await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtext('soyl.fb_enrollments'))`);
          const again = await find(tx);
          if (again) return { row: again, created: false };
          const year = receiptYear(input.cohort, paidAt);
          const res = await tx.execute<{ next: number | string }>(
            sql`SELECT coalesce(max(${fbEnrollments.receiptSeq}), 0) + 1 AS next FROM ${fbEnrollments} WHERE ${fbEnrollments.receiptYear} = ${year}`,
          );
          const seq = Number(res.rows[0]!.next);
          const now = this.now();
          const [inserted] = await tx
            .insert(fbEnrollments)
            .values({
              receiptNumber: formatReceipt(year, seq),
              receiptYear: year,
              receiptSeq: seq,
              razorpayOrderId: input.razorpayOrderId,
              razorpayPaymentId: input.razorpayPaymentId,
              amountPaise: input.amountPaise,
              currency: input.currency,
              paidAt,
              cohort: input.cohort,
              offer: input.offer,
              coupon: input.coupon,
              friendName: input.friendName,
              parentName: input.parentName,
              studentName: input.studentName,
              email: input.email,
              phone: input.phone,
              grade: input.grade,
              source: input.source,
              createdAt: now,
              updatedAt: now,
            })
            .returning();
          return { row: inserted!, created: true };
        });

    if (created) {
      this.d.log?.info({ fb: true, event: 'fb_enrollment_created', enrollmentId: row.id, receiptNumber: row.receiptNumber, source: row.source }, 'future builders registration recorded');
      this.background(async () => {
        await this.sendConfirmation(row.id);
        await this.notifyStaffOfEnrollment(row.id);
      });
    } else {
      const differs = row.razorpayOrderId !== input.razorpayOrderId || row.amountPaise !== input.amountPaise;
      // Ids only (no personal data); a mismatch means two different reports of one payment id: look at it.
      this.d.log?.[differs ? 'warn' : 'info'](
        { fb: true, event: differs ? 'fb_enrollment_mismatch' : 'fb_enrollment_duplicate', enrollmentId: row.id, source: input.source, alert: differs },
        differs ? 'future builders payment reported again with different order or amount; kept the first' : 'future builders payment already recorded',
      );
    }
    return { enrollmentId: row.id, receiptNumber: row.receiptNumber, created };
  }

  /**
   * Sends the parent's confirmation. Without `force` an already-sent email is skipped. A failure is recorded
   * (status failed, error class) and logged as an alert; a previously delivered email keeps status sent.
   */
  async sendConfirmation(id: string, o: { force?: boolean } = {}): Promise<'sent' | 'failed' | 'skipped'> {
    const { db } = this.d;
    const [row] = await db
      .update(fbEnrollments)
      .set({ emailAttempts: sql`${fbEnrollments.emailAttempts} + 1` })
      .where(and(eq(fbEnrollments.id, id), o.force ? undefined : ne(fbEnrollments.emailStatus, 'sent')))
      .returning();
    if (!row) return 'skipped';
    try {
      await this.d.email.send(confirmationEmail(row, { replyTo: this.d.config.replyTo }));
      await db.update(fbEnrollments).set({ emailStatus: 'sent', emailSentAt: this.now(), emailLastError: null }).where(eq(fbEnrollments.id, id));
      this.d.log?.info({ fb: true, event: 'fb_confirmation_emailed', enrollmentId: id, attempt: row.emailAttempts }, 'future builders confirmation emailed');
      return 'sent';
    } catch (err) {
      await db
        .update(fbEnrollments)
        .set({
          emailStatus: sql`CASE WHEN ${fbEnrollments.emailSentAt} IS NOT NULL THEN 'sent' ELSE 'failed' END`,
          emailLastError: ((err as Error).name || 'Error').slice(0, 60),
        })
        .where(eq(fbEnrollments.id, id));
      this.d.log?.error(
        { fb: true, event: 'fb_confirmation_email_failed', enrollmentId: id, attempt: row.emailAttempts, err: (err as Error).name, alert: true },
        'future builders confirmation email failed; staff can resend from /admin',
      );
      return 'failed';
    }
  }

  private async notifyStaffOfEnrollment(id: string): Promise<void> {
    const to = this.d.config.notifyEmail;
    if (!to) return;
    const [row] = await this.d.db.select().from(fbEnrollments).where(eq(fbEnrollments.id, id));
    if (!row) return;
    try {
      await this.d.email.send(staffEnrollmentEmail(to, row, this.adminUrl));
      await this.d.db.update(fbEnrollments).set({ staffNotifiedAt: this.now() }).where(eq(fbEnrollments.id, id));
    } catch (err) {
      this.d.log?.warn({ fb: true, event: 'fb_staff_notice_failed', enrollmentId: id, err: (err as Error).name }, 'future builders staff notice failed');
    }
  }

  async createLead(input: FbLeadIngest): Promise<{ leadId: string; created: boolean }> {
    const { db } = this.d;
    const now = this.now();
    const [dup] = await db
      .select({ id: fbLeads.id })
      .from(fbLeads)
      .where(and(eq(fbLeads.phone, input.phone), eq(fbLeads.kind, input.kind), eq(fbLeads.source, input.source), gte(fbLeads.createdAt, new Date(now.getTime() - LEAD_DEDUPE_MS))))
      .orderBy(desc(fbLeads.createdAt))
      .limit(1);
    if (dup) {
      this.d.log?.info({ fb: true, event: 'fb_lead_duplicate', leadId: dup.id, kind: input.kind }, 'future builders enquiry repeated within a day; kept the first');
      return { leadId: dup.id, created: false };
    }
    const [row] = await db
      .insert(fbLeads)
      .values({ kind: input.kind, parentName: input.parentName, studentName: input.studentName, email: input.email, phone: input.phone, grade: input.grade, source: input.source, createdAt: now, updatedAt: now })
      .returning();
    this.d.log?.info({ fb: true, event: 'fb_lead_created', leadId: row!.id, kind: row!.kind, source: row!.source }, 'future builders enquiry recorded');
    const to = this.d.config.notifyEmail;
    if (to)
      this.background(async () => {
        try {
          await this.d.email.send(staffLeadEmail(to, row!, this.adminUrl));
        } catch (err) {
          this.d.log?.warn({ fb: true, event: 'fb_staff_notice_failed', leadId: row!.id, err: (err as Error).name }, 'future builders staff notice failed');
        }
      });
    return { leadId: row!.id, created: true };
  }

  /* ---- admin ------------------------------------------------------------------------------------- */

  private async audit(actor: FbActor, action: string, targetId: string | null, after: Record<string, unknown>): Promise<void> {
    const targetType = action.startsWith('admin.fb.leads') ? 'fb_lead' : 'fb_enrollment';
    await this.d.db.insert(auditLog).values({ actorUserId: actor.userId, actorRole: actor.role, action, targetType, targetId, after, requestId: actor.requestId, createdAt: this.now() });
  }

  private enrollmentFilters(q: { from?: string; to?: string; emailStatus?: string }): SQL[] {
    checkRange(q);
    const c: SQL[] = [];
    if (q.from) c.push(gte(fbEnrollments.paidAt, istDayStart(q.from)));
    if (q.to) c.push(lt(fbEnrollments.paidAt, istDayStart(nextDay(q.to))));
    if (q.emailStatus) c.push(eq(fbEnrollments.emailStatus, q.emailStatus));
    return c;
  }

  private leadFilters(q: { from?: string; to?: string; kind?: string }): SQL[] {
    checkRange(q);
    const c: SQL[] = [];
    if (q.from) c.push(gte(fbLeads.createdAt, istDayStart(q.from)));
    if (q.to) c.push(lt(fbLeads.createdAt, istDayStart(nextDay(q.to))));
    if (q.kind) c.push(eq(fbLeads.kind, q.kind));
    return c;
  }

  private static filtersForAudit(q: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(q).filter(([k, v]) => v !== undefined && k !== 'cursor' && k !== 'limit'));
  }

  async listEnrollments(q: FbEnrollmentsQuery, actor: FbActor) {
    const { db } = this.d;
    const filters = this.enrollmentFilters(q);
    const after = q.cursor ? decodeCursor(q.cursor) : null;
    const pageWhere = after ? [...filters, sql`(${fbEnrollments.paidAt}, ${fbEnrollments.id}) < (${after.at.toISOString()}::timestamptz, ${after.id}::uuid)`] : filters;
    const rows = await db
      .select()
      .from(fbEnrollments)
      .where(and(...pageWhere))
      .orderBy(desc(fbEnrollments.paidAt), desc(fbEnrollments.id))
      .limit(q.limit + 1);
    const [sum] = await db
      .select({
        count: sql<number>`count(*)::int`,
        totalPaise: sql<number>`coalesce(sum(${fbEnrollments.amountPaise}), 0)::bigint`,
        emailFailed: sql<number>`count(*) FILTER (WHERE ${fbEnrollments.emailStatus} = 'failed')::int`,
      })
      .from(fbEnrollments)
      .where(and(...filters));
    const page = rows.slice(0, q.limit);
    const last = page[page.length - 1];
    await this.audit(actor, AUDIT.listEnrollments, null, { filters: FutureBuildersService.filtersForAudit(q), rows: page.length, page: after ? 'next' : 'first' });
    return {
      enrollments: page.map(enrollmentView),
      nextCursor: rows.length > q.limit && last ? encodeCursor(last.paidAt, last.id) : null,
      summary: { count: Number(sum?.count ?? 0), totalPaise: Number(sum?.totalPaise ?? 0), emailFailed: Number(sum?.emailFailed ?? 0) },
    };
  }

  async enrollmentsCsv(q: { from?: string; to?: string; emailStatus?: string }, actor: FbActor): Promise<string> {
    const rows = await this.d.db
      .select()
      .from(fbEnrollments)
      .where(and(...this.enrollmentFilters(q)))
      .orderBy(desc(fbEnrollments.paidAt), desc(fbEnrollments.id))
      .limit(MAX_EXPORT_ROWS);
    const lines = [ENROLLMENT_CSV_COLUMNS.join(',')];
    for (const r of rows)
      lines.push(
        [
          r.receiptNumber,
          istStamp(r.paidAt),
          r.parentName,
          r.studentName,
          r.email,
          r.phone,
          r.grade,
          formatRupees(r.amountPaise).replace(/,/g, ''),
          r.offer,
          r.coupon,
          r.friendName,
          r.cohort,
          r.razorpayPaymentId,
          r.razorpayOrderId,
          r.source,
          r.emailStatus,
        ]
          .map(csvCell)
          .join(','),
      );
    await this.audit(actor, AUDIT.exportEnrollments, null, { filters: FutureBuildersService.filtersForAudit(q), rows: rows.length });
    return `${lines.join('\r\n')}\r\n`;
  }

  /** Admin: email the parent's confirmation again now. Null when the registration does not exist. */
  async resend(id: string, actor: FbActor): Promise<{ emailStatus: 'sent' | 'failed' } | null> {
    const [row] = await this.d.db.select({ id: fbEnrollments.id }).from(fbEnrollments).where(eq(fbEnrollments.id, id));
    if (!row) return null;
    const r = await this.sendConfirmation(id, { force: true });
    const emailStatus = r === 'sent' ? 'sent' : 'failed';
    await this.audit(actor, AUDIT.resend, id, { emailStatus });
    return { emailStatus };
  }

  async listLeads(q: FbLeadsQuery, actor: FbActor) {
    const { db } = this.d;
    const filters = this.leadFilters(q);
    const after = q.cursor ? decodeCursor(q.cursor) : null;
    const pageWhere = after ? [...filters, sql`(${fbLeads.createdAt}, ${fbLeads.id}) < (${after.at.toISOString()}::timestamptz, ${after.id}::uuid)`] : filters;
    const rows = await db
      .select()
      .from(fbLeads)
      .where(and(...pageWhere))
      .orderBy(desc(fbLeads.createdAt), desc(fbLeads.id))
      .limit(q.limit + 1);
    const [sum] = await db.select({ count: sql<number>`count(*)::int` }).from(fbLeads).where(and(...filters));
    const page = rows.slice(0, q.limit);
    const last = page[page.length - 1];
    await this.audit(actor, AUDIT.listLeads, null, { filters: FutureBuildersService.filtersForAudit(q), rows: page.length, page: after ? 'next' : 'first' });
    return {
      leads: page.map(leadView),
      nextCursor: rows.length > q.limit && last ? encodeCursor(last.createdAt, last.id) : null,
      summary: { count: Number(sum?.count ?? 0) },
    };
  }

  async leadsCsv(q: { from?: string; to?: string; kind?: string }, actor: FbActor): Promise<string> {
    const rows = await this.d.db
      .select()
      .from(fbLeads)
      .where(and(...this.leadFilters(q)))
      .orderBy(desc(fbLeads.createdAt), desc(fbLeads.id))
      .limit(MAX_EXPORT_ROWS);
    const lines = [LEAD_CSV_COLUMNS.join(',')];
    for (const r of rows) lines.push([istStamp(r.createdAt), r.kind, r.parentName, r.studentName, r.email, r.phone, r.grade, r.source].map(csvCell).join(','));
    await this.audit(actor, AUDIT.exportLeads, null, { filters: FutureBuildersService.filtersForAudit(q), rows: rows.length });
    return `${lines.join('\r\n')}\r\n`;
  }
}

/**
 * The daily reminder run (D-055): worker job `notifications.reminders` (platform/worker/src/notification-jobs.ts),
 * cron REMINDERS.cron (12:00 UTC = 17:30 IST). Pure decisions (`reminderDue`, `isQuietHours`) are exported for
 * unit tests; `runReminders` takes a fixed `now` so tests drive every edge case.
 *
 * Who: students only (role student, not deleted, not banned, created at least REMINDERS.firstDayGraceHours ago).
 * - Student reminder: to the student's own verified `users.email` (no `.invalid` placeholder of phone sign-ups, no
 *   reserved fixture domain), while their switch is on (default on).
 * - Parent reminder: to the parent address the student added and the parent confirmed (`parent_status` active), while
 *   the student's parent switch is on, at most every REMINDERS.parentMinGapDays.
 * When: the student's last active IST day is at least REMINDERS.inactiveDays before today; the last reminder of that
 * kind was at least the gap ago; fewer than REMINDERS.maxUnanswered reminders of that kind went out since the last
 * activity (so any activity resets the count); never in the IST quiet hours (21:00–08:00), retries included.
 *
 * At-least-once safety (ADR-003): per user, kind and IST day a `reminder_log` row is claimed (`sending`) BEFORE the
 * email goes out, then marked `sent` or `failed`. A re-run skips `sent` rows; a retry the same day takes over
 * `failed` rows (and `sending` rows older than REMINDERS.staleClaimMinutes, i.e. a crashed run). A crash between the
 * provider accepting the email and the `sent` mark can at worst repeat that one email on a same-day retry.
 * When any send failed, the run throws after finishing the batch, so pg-boss retries it (backoff) the same evening.
 *
 * Logs carry counts and error classes only: never an address, a name or a chapter.
 */
import { and, desc, eq, isNull, sql } from 'drizzle-orm';
import { chapters, istDay, lessonProgress, reminderLog, subjects, type Database, type ReminderKind } from '@soyl/db';
import { REMINDERS } from '@soyl/shared/config/notifications';
import { PLANS } from '@soyl/shared/config/plans';
import { maskEmail } from '@soyl/shared/config/security';
import { publicName } from '@soyl/shared/config/public-names';
import type { EmailSender } from '../auth/senders/email';
import { dayNumber } from '../domain/gamification';
import { greetingName, parentReminderEmail, studentReminderEmail, type ContinueTarget } from './emails';
import { EMAIL_PAGES, lessonPath, type EmailLinks } from './links';

export type ReminderConfig = Pick<
  typeof REMINDERS,
  'inactiveDays' | 'minGapDays' | 'maxUnanswered' | 'firstDayGraceHours' | 'quietHoursIst' | 'studentDefault' | 'parentMinGapDays' | 'batchSize' | 'staleClaimMinutes' | 'skipEmailDomains' | 'skipEmailTlds'
>;

export interface ReminderLog {
  info(obj: object, msg?: string): void;
  warn(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

export interface ReminderRunDeps {
  db: Database;
  email: EmailSender;
  links: EmailLinks;
  /** The instant the run is evaluated at (UTC). */
  now: Date;
  log?: ReminderLog;
  signal?: AbortSignal;
  /** Defaults to REMINDERS. */
  config?: Partial<ReminderConfig>;
  /** Wall time elapsed since the run started (ms), for the quiet-hours check before each send. Tests may fake it. */
  elapsedMs?: () => number;
}

export interface ReminderRunResult {
  skipped?: 'quiet_hours';
  /** Students looked at (eligible for at least one kind). */
  evaluated: number;
  studentSent: number;
  parentSent: number;
  failed: number;
  /** Already handled today by an earlier run (claim not taken). */
  alreadyDone: number;
  /** Stopped part-way because the quiet hours began. */
  stoppedForQuietHours: boolean;
  notDue: { recentlyActive: number; gap: number; maxUnanswered: number; noEmail: number };
}

export class ReminderSendError extends Error {
  constructor(readonly failed: number) {
    super(`${failed} reminder email(s) failed; the job is retried`);
    this.name = 'ReminderSendError';
  }
}

const IST_OFFSET_MS = 330 * 60_000;

/** True from quietHoursIst.startMinute (21:00 IST) up to endMinute (08:00 IST). */
export function isQuietHours(at: Date, q: ReminderConfig['quietHoursIst'] = REMINDERS.quietHoursIst): boolean {
  const minute = Math.floor((((at.getTime() + IST_OFFSET_MS) % 86_400_000) + 86_400_000) % 86_400_000 / 60_000);
  return q.startMinute > q.endMinute ? minute >= q.startMinute || minute < q.endMinute : minute >= q.startMinute && minute < q.endMinute;
}

export type NotDueReason = 'recently_active' | 'gap' | 'max_unanswered';

/**
 * Whether a reminder of one kind is due today. `lastActiveDay` and `lastSentDay` are IST calendar days
 * (YYYY-MM-DD); `unanswered` counts reminders of that kind sent after the last active day.
 */
export function reminderDue(
  s: { today: string; lastActiveDay: string; lastSentDay: string | null; unanswered: number },
  rules: { inactiveDays: number; gapDays: number; maxUnanswered: number },
): { due: true } | { due: false; reason: NotDueReason } {
  const today = dayNumber(s.today);
  if (today - dayNumber(s.lastActiveDay) < rules.inactiveDays) return { due: false, reason: 'recently_active' };
  if (s.lastSentDay && today - dayNumber(s.lastSentDay) < rules.gapDays) return { due: false, reason: 'gap' };
  if (s.unanswered >= rules.maxUnanswered) return { due: false, reason: 'max_unanswered' };
  return { due: true };
}

/** A student address reminders may go to: verified, real (not a phone sign-up placeholder), not a reserved domain. */
export function reminderAddress(email: string | null | undefined, verified: boolean, cfg: Pick<ReminderConfig, 'skipEmailDomains' | 'skipEmailTlds'> = REMINDERS): string | null {
  if (!email || !verified) return null;
  const at = email.lastIndexOf('@');
  if (at < 1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  const tld = domain.slice(domain.lastIndexOf('.') + 1);
  if (cfg.skipEmailDomains.includes(domain) || cfg.skipEmailTlds.includes(tld)) return null;
  return email;
}

/** True when the free plan grants AI credits every day (the reminder may say so). */
export function creditsRefreshDaily(): boolean {
  return (PLANS.find((p) => p.id === 'free')?.creditsPerDay ?? 0) > 0;
}

/** The lesson the student left halfway (most recently touched deck part not completed), or null. */
export async function continueTarget(db: Database, userId: string, links: EmailLinks): Promise<(ContinueTarget & { chapterKey: string }) | null> {
  const [r] = await db
    .select({ key: chapters.key, title: chapters.title, part: lessonProgress.part, subjectName: subjects.name, classLevel: subjects.classLevel })
    .from(lessonProgress)
    .innerJoin(chapters, eq(chapters.id, lessonProgress.chapterId))
    .innerJoin(subjects, eq(subjects.id, chapters.subjectId))
    .where(and(eq(lessonProgress.userId, userId), isNull(lessonProgress.completedAt)))
    .orderBy(desc(lessonProgress.updatedAt))
    .limit(1);
  if (!r) return null;
  const path = lessonPath(r.key, r.part);
  if (!path) return null;
  return { chapterKey: r.key, chapterTitle: r.title, context: `${r.subjectName} · Class ${r.classLevel}`, url: links.page(path) };
}

interface Candidate {
  id: string;
  email: string;
  email_verified: boolean;
  display_name: string | null;
  public_name_seed: number | null;
  student_reminders: boolean | null;
  parent_email: string | null;
  parent_status: string | null;
  parent_reminders: boolean | null;
  parent_generation: number | null;
  last_active_day: string;
  student_last_sent: string | null;
  student_unanswered: number;
  parent_last_sent: string | null;
  parent_unanswered: number;
}

async function loadBatch(db: Database, after: string, now: Date, cfg: ReminderConfig): Promise<Candidate[]> {
  const graceCutoff = new Date(now.getTime() - cfg.firstDayGraceHours * 3_600_000).toISOString();
  const res = await db.execute<Candidate & Record<string, unknown>>(sql`
    WITH base AS (
      SELECT u.id, u.email, u.email_verified, p.display_name, p.public_name_seed,
        np.student_reminders, np.parent_email, np.parent_status, np.parent_reminders, np.parent_generation,
        GREATEST(
          (u.created_at AT TIME ZONE 'Asia/Kolkata')::date,
          s.last_active_ist_day,
          (SELECT (max(lp.updated_at) AT TIME ZONE 'Asia/Kolkata')::date FROM lesson_progress lp WHERE lp.user_id = u.id),
          (SELECT (max(pa.answered_at) AT TIME ZONE 'Asia/Kolkata')::date FROM practice_answers pa WHERE pa.user_id = u.id),
          (SELECT (max(GREATEST(a.created_at, a.submitted_at)) AT TIME ZONE 'Asia/Kolkata')::date FROM attempts a WHERE a.user_id = u.id),
          (SELECT (max(GREATEST(se.created_at, se.updated_at)) AT TIME ZONE 'Asia/Kolkata')::date FROM sessions se WHERE se.user_id = u.id),
          (SELECT (max(r.created_at) AT TIME ZONE 'Asia/Kolkata')::date FROM ai_requests r WHERE r.user_id = u.id)
        ) AS last_active
      FROM users u
      LEFT JOIN profiles p ON p.user_id = u.id
      LEFT JOIN streaks s ON s.user_id = u.id
      LEFT JOIN notification_preferences np ON np.user_id = u.id
      WHERE u.role = 'student' AND u.deleted_at IS NULL AND u.banned = false
        AND u.id > ${after}::uuid AND u.created_at <= ${graceCutoff}::timestamptz
        AND (COALESCE(np.student_reminders, ${cfg.studentDefault}) OR (np.parent_status = 'active' AND np.parent_reminders))
      ORDER BY u.id
      LIMIT ${cfg.batchSize}
    )
    SELECT b.id, b.email, b.email_verified, b.display_name, b.public_name_seed, b.student_reminders, b.parent_email,
      b.parent_status, b.parent_reminders, b.parent_generation,
      to_char(b.last_active, 'YYYY-MM-DD') AS last_active_day,
      (SELECT to_char(max(l.ist_day), 'YYYY-MM-DD') FROM reminder_log l WHERE l.user_id = b.id AND l.kind = 'student' AND l.status = 'sent') AS student_last_sent,
      (SELECT count(*)::int FROM reminder_log l WHERE l.user_id = b.id AND l.kind = 'student' AND l.status = 'sent' AND l.ist_day > b.last_active) AS student_unanswered,
      (SELECT to_char(max(l.ist_day), 'YYYY-MM-DD') FROM reminder_log l WHERE l.user_id = b.id AND l.kind = 'parent' AND l.status = 'sent') AS parent_last_sent,
      (SELECT count(*)::int FROM reminder_log l WHERE l.user_id = b.id AND l.kind = 'parent' AND l.status = 'sent' AND l.ist_day > b.last_active) AS parent_unanswered
    FROM base b
    ORDER BY b.id`);
  return res.rows as Candidate[];
}

/** Claims (user, kind, today). Null = already sent today, or another run holds a fresh claim. */
async function claim(db: Database, userId: string, kind: ReminderKind, today: string, now: Date, cfg: ReminderConfig): Promise<string | null> {
  const stale = new Date(now.getTime() - cfg.staleClaimMinutes * 60_000);
  const [row] = await db
    .insert(reminderLog)
    .values({ userId, kind, istDay: today, status: 'sending', attempts: 1, claimedAt: now })
    .onConflictDoUpdate({
      target: [reminderLog.userId, reminderLog.kind, reminderLog.istDay],
      set: { status: 'sending', attempts: sql`least(${reminderLog.attempts} + 1, 100)`, claimedAt: now, updatedAt: now },
      setWhere: sql`${reminderLog.status} = 'failed' OR (${reminderLog.status} = 'sending' AND ${reminderLog.claimedAt} < ${stale.toISOString()}::timestamptz)`,
    })
    .returning({ id: reminderLog.id });
  return row?.id ?? null;
}

async function mark(db: Database, id: string, status: 'sent' | 'failed', now: Date): Promise<void> {
  await db
    .update(reminderLog)
    .set({ status, sentAt: status === 'sent' ? now : null, updatedAt: now })
    .where(eq(reminderLog.id, id));
}

export async function runReminders(d: ReminderRunDeps): Promise<ReminderRunResult> {
  const cfg: ReminderConfig = { ...REMINDERS, ...d.config };
  const started = Date.now();
  const elapsed = d.elapsedMs ?? (() => Date.now() - started);
  const at = () => new Date(d.now.getTime() + elapsed());
  const result: ReminderRunResult = {
    evaluated: 0,
    studentSent: 0,
    parentSent: 0,
    failed: 0,
    alreadyDone: 0,
    stoppedForQuietHours: false,
    notDue: { recentlyActive: 0, gap: 0, maxUnanswered: 0, noEmail: 0 },
  };
  if (isQuietHours(d.now, cfg.quietHoursIst)) {
    d.log?.info({ notify: 'reminders', event: 'reminders_quiet_hours' }, 'reminders skipped: quiet hours (IST)');
    return { ...result, skipped: 'quiet_hours' };
  }
  const today = istDay(d.now);
  const credits = creditsRefreshDaily();
  const errorClasses = new Map<string, number>();
  const count = (reason: NotDueReason) => {
    if (reason === 'recently_active') result.notDue.recentlyActive++;
    else if (reason === 'gap') result.notDue.gap++;
    else result.notDue.maxUnanswered++;
  };

  let after = '00000000-0000-0000-0000-000000000000';
  outer: for (;;) {
    d.signal?.throwIfAborted();
    const batch = await loadBatch(d.db, after, d.now, cfg);
    if (!batch.length) break;
    after = batch[batch.length - 1]!.id;

    for (const c of batch) {
      d.signal?.throwIfAborted();
      result.evaluated++;
      const sends: { kind: ReminderKind; to: string }[] = [];

      if (c.student_reminders ?? cfg.studentDefault) {
        const to = reminderAddress(c.email, c.email_verified, cfg);
        if (!to) result.notDue.noEmail++;
        else {
          const due = reminderDue(
            { today, lastActiveDay: c.last_active_day, lastSentDay: c.student_last_sent, unanswered: Number(c.student_unanswered) },
            { inactiveDays: cfg.inactiveDays, gapDays: cfg.minGapDays, maxUnanswered: cfg.maxUnanswered },
          );
          if (due.due) sends.push({ kind: 'student', to });
          else count(due.reason);
        }
      }
      if (c.parent_status === 'active' && c.parent_reminders && c.parent_email) {
        const due = reminderDue(
          { today, lastActiveDay: c.last_active_day, lastSentDay: c.parent_last_sent, unanswered: Number(c.parent_unanswered) },
          { inactiveDays: cfg.inactiveDays, gapDays: cfg.parentMinGapDays, maxUnanswered: cfg.maxUnanswered },
        );
        if (due.due) sends.push({ kind: 'parent', to: c.parent_email });
        else count(due.reason);
      }
      if (!sends.length) continue;

      const target = await continueTarget(d.db, c.id, d.links);
      for (const s of sends) {
        // Quiet hours apply to every single send, also part-way through a run and on retries.
        if (isQuietHours(at(), cfg.quietHoursIst)) {
          result.stoppedForQuietHours = true;
          break outer;
        }
        const claimId = await claim(d.db, c.id, s.kind, today, d.now, cfg);
        if (!claimId) {
          result.alreadyDone++;
          continue;
        }
        const message =
          s.kind === 'student'
            ? studentReminderEmail({
                to: s.to,
                firstName: greetingName(c.display_name),
                target,
                dashboardUrl: d.links.page(EMAIL_PAGES.dashboard),
                creditsRefreshDaily: credits,
                minGapDays: cfg.minGapDays,
                unsubscribe: d.links.student(c.id),
                settingsUrl: d.links.page(EMAIL_PAGES.settings),
              })
            : parentReminderEmail({
                to: s.to,
                publicName: publicName(c.id, c.public_name_seed ?? 0),
                chapterTitle: target?.chapterTitle ?? null,
                minGapDays: cfg.parentMinGapDays,
                unsubscribe: d.links.parent(c.id, c.parent_generation ?? 0),
              });
        try {
          await d.email.send(message);
          await mark(d.db, claimId, 'sent', at());
          if (s.kind === 'student') result.studentSent++;
          else result.parentSent++;
        } catch (err) {
          await mark(d.db, claimId, 'failed', at());
          result.failed++;
          const name = (err as Error)?.name ?? 'Error';
          errorClasses.set(name, (errorClasses.get(name) ?? 0) + 1);
        }
      }
    }
    if (batch.length < cfg.batchSize) break;
  }

  const { notDue, ...counts } = result;
  d.log?.info({ notify: 'reminders', event: 'reminders_run', today, ...counts, notDue, errors: Object.fromEntries(errorClasses) }, 'reminder run finished');
  if (result.failed) {
    d.log?.error({ notify: 'reminders', event: 'reminders_send_failed', failed: result.failed, errors: Object.fromEntries(errorClasses), alert: true }, 'reminder emails failed; retrying');
    throw new ReminderSendError(result.failed);
  }
  return result;
}

/** The masked student address for the confirmation email and /me (`a***@gmail.com`), when the account has one. */
export function studentHint(email: string | null | undefined, verified: boolean): string | null {
  return email && verified && !email.endsWith('.invalid') ? maskEmail(email) : null;
}

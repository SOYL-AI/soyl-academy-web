/**
 * Owner notifications (backend-api, 2026-11-12) and student email reminders (D-055, 2026-11-14). Config, not code
 * (CLAUDE.md rule 4). No imports: the web shows some of these values.
 *
 * New student sign-up notice: one short email per new student account to SIGNUP_NOTIFY_EMAIL (an API app setting
 * in the Bicep params; unset = off). The flood guard caps the emails across all API instances (KV sliding window);
 * sign-ups beyond the cap are only logged (`signup_notify_suppressed`), the owner still sees them in /admin.
 */
export const SIGNUP_NOTIFY = {
  /** At most this many notice emails per rolling hour (all instances together). */
  maxPerHour: 60,
} as const;

/** A sliding-window limit (same shape as security.ts WindowLimit; this file has no imports). */
export interface ReminderWindowLimit {
  limit: number;
  windowSeconds: number;
}

/**
 * Email reminders for students who stop using the platform (D-055, owner 2026-11-14; closes the reminders part of
 * threat-model F-016). Email only: no SMS, no phone numbers. The worker job `notifications.reminders`
 * (platform/worker/src/notification-jobs.ts; logic in platform/api/src/notifications/reminders.ts) runs once a day.
 *
 * - Student reminders go only to the student's own verified `users.email`, never to the consent flow's parent
 *   address (stored hashed). Phone-only, deleted, banned, staff and fixture/test accounts get none.
 * - A parent gets email only at an address the student added on /me ("parent email for updates") AND the parent
 *   confirmed by pressing Confirm on the platform page. Until then only the confirmation email is sent to it.
 * - "Active" = anything the platform records for the student, taken as an IST calendar day: a streak day, a lesson
 *   position, a practice answer, a test attempt, an AI request, a sign-in or the daily session refresh, sign-up.
 * - No streak-loss threats, no guilt or fear-of-missing-out wording, no counts of days missed, no tracking pixels and
 *   no remote images (notifications/emails.ts).
 *
 * Kill switch: `enabled` here AND the worker setting REMINDERS_ENABLED. When REMINDERS_ENABLED is unset the job runs
 * in local/test/dev (mock email locally) and is OFF in stg/prod; production needs REMINDERS_ENABLED=true on the
 * worker, plus OTP_PEPPER and the ACS email settings there (the D-055 handoff lists the infra change).
 */
export const REMINDERS = {
  /** Master switch (config). REMINDERS_ENABLED=false on the worker also stops every send. */
  enabled: true,
  /** UTC cron of the daily run: 12:00 UTC = 17:30 IST, after school and well before the quiet hours. */
  cron: '0 12 * * *',
  /**
   * Days without activity before a reminder: sent when today (IST) minus the last active IST day is at least this.
   * 2 = active on Monday → the first reminder can go on Wednesday's run (nothing on Tuesday, nothing yet on Wednesday).
   */
  inactiveDays: 2,
  /** At most one student reminder every this many IST days (counted from the day of the last one sent). */
  minGapDays: 3,
  /** After this many reminders in a row with no return to the platform, stop. Any activity resets the count. */
  maxUnanswered: 4,
  /** Never in the first hours after sign-up (and never on the sign-up IST day). */
  firstDayGraceHours: 24,
  /** No sends from 21:00 IST up to 08:00 IST, retries included (minutes after IST midnight). */
  quietHoursIst: { startMinute: 21 * 60, endMinute: 8 * 60 },
  /** Reminders are on for a student until they turn them off (one click in the email, or on /me). */
  studentDefault: true,
  /** A confirmed parent address: at most one reminder every this many IST days (same inactivity rules otherwise). */
  parentMinGapDays: 7,
  /** The parent's confirmation link stays valid this long; a resend replaces it. */
  parentConfirmTtlHours: 72,
  /** Confirmation sends to a parent address: per student account, per address, per IP (like the consent code). */
  parentConfirmSend: {
    perUser: [
      { limit: 1, windowSeconds: 60 },
      { limit: 3, windowSeconds: 3600 },
      { limit: 5, windowSeconds: 24 * 3600 },
    ] as readonly ReminderWindowLimit[],
    perAddress: [
      { limit: 3, windowSeconds: 3600 },
      { limit: 5, windowSeconds: 24 * 3600 },
    ] as readonly ReminderWindowLimit[],
    perIp: [
      { limit: 10, windowSeconds: 3600 },
      { limit: 30, windowSeconds: 24 * 3600 },
    ] as readonly ReminderWindowLimit[],
  },
  /** UI resend cooldown after a confirmation send (the server limits above apply regardless). */
  resendAfterSeconds: 60,
  /** Students evaluated per database round trip. */
  batchSize: 200,
  /** A claim left in `sending` this long (a crashed run) may be taken over by a retry on the same IST day. */
  staleClaimMinutes: 15,
  /** Never sent to: the reserved fixture domains and these special-use top-level domains (RFC 2606 / 6761). */
  skipEmailDomains: ['example.com', 'example.org', 'example.net'] as readonly string[],
  skipEmailTlds: ['invalid', 'test', 'example', 'localhost'] as readonly string[],
} as const;

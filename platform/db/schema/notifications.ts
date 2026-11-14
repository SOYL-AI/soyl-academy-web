/**
 * Email reminders (D-055, migration 0018; backend-api 2026-11-14).
 *
 * - `notification_preferences`: one row per student who changed a setting or added a parent address. No row = the
 *   defaults (student reminders on, no parent). `parent_email` is the one plain-text address the platform keeps for
 *   someone other than the account holder: the student typed it on /me, and nothing but a confirmation email is sent
 *   to it until the parent confirms on the platform page (`parent_status` pending → active). `parent_generation`
 *   goes up whenever the address is set, changed or removed, so links in emails to an earlier address stop working.
 *   PII.md: deleted at account deletion (step 1) and when the student removes the address or the parent unsubscribes.
 * - `reminder_log`: one row per user, kind and IST day (the idempotency key): `sending` is the claim taken before
 *   the email goes out, then `sent` or `failed`. Only `sent` rows count for the gap and the unanswered count. No
 *   address is stored here; rows go with the account (cascade at purge).
 */
import { sql } from 'drizzle-orm';
import { boolean, check, date, index, integer, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, oneOf, timestamps, tstz } from './_shared';
import { users } from './identity';

export const PARENT_EMAIL_STATUSES = ['none', 'pending', 'active'] as const;
export type ParentEmailStatus = (typeof PARENT_EMAIL_STATUSES)[number];
export const REMINDER_KINDS = ['student', 'parent'] as const;
export type ReminderKind = (typeof REMINDER_KINDS)[number];
export const REMINDER_LOG_STATUSES = ['sending', 'sent', 'failed'] as const;
export type ReminderLogStatus = (typeof REMINDER_LOG_STATUSES)[number];

export const notificationPreferences = pgTable(
  'notification_preferences',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .unique('notification_preferences_user_id_unique')
      .references(() => users.id, { onDelete: 'cascade' }),
    /** Reminder emails to the student's own address (default on, REMINDERS.studentDefault). */
    studentReminders: boolean('student_reminders').notNull().default(true),
    /** The optional parent address for reminders, as typed (lower-cased); null when none. */
    parentEmail: text('parent_email'),
    parentStatus: text('parent_status').notNull().default('none'),
    /** The student's switch for reminders to the confirmed parent address. */
    parentReminders: boolean('parent_reminders').notNull().default(true),
    /** Bumped on every set/change/remove of the parent address; binds the confirm and parent unsubscribe links. */
    parentGeneration: integer('parent_generation').notNull().default(0),
    /** When the current confirmation link was sent (binds the link: a resend replaces it); null = none valid. */
    parentConfirmSentAt: tstz('parent_confirm_sent_at'),
    parentConfirmedAt: tstz('parent_confirmed_at'),
    /** When a parent last unsubscribed (their address is removed then); shown to the student, no address kept. */
    parentUnsubscribedAt: tstz('parent_unsubscribed_at'),
    ...timestamps(),
  },
  (t) => [
    oneOf('notification_preferences_parent_status_check', t.parentStatus, PARENT_EMAIL_STATUSES),
    check('notification_preferences_parent_email_check', sql`(${t.parentStatus} = 'none') = (${t.parentEmail} IS NULL)`),
    check('notification_preferences_parent_generation_check', sql`${t.parentGeneration} >= 0`),
  ],
);

export const reminderLog = pgTable(
  'reminder_log',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    /** The IST calendar day of the run (idempotency: one reminder per user, kind and day). */
    istDay: date('ist_day', { mode: 'string' }).notNull(),
    status: text('status').notNull().default('sending'),
    /** Delivery attempts on this day (a failed send may be retried the same day). */
    attempts: smallint('attempts').notNull().default(1),
    claimedAt: tstz('claimed_at').notNull(),
    sentAt: tstz('sent_at'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('reminder_log_user_kind_day_unique').on(t.userId, t.kind, t.istDay),
    index('reminder_log_ist_day_idx').on(t.istDay),
    oneOf('reminder_log_kind_check', t.kind, REMINDER_KINDS),
    oneOf('reminder_log_status_check', t.status, REMINDER_LOG_STATUSES),
    check('reminder_log_attempts_check', sql`${t.attempts} BETWEEN 1 AND 100`),
  ],
);

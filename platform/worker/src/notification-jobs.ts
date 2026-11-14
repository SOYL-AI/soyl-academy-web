/**
 * Notification jobs (D-055). The logic lives in @soyl/api (notifications/reminders.ts) so tests call it with a fixed
 * `now`; this file only wires it to pg-boss.
 *
 * - notifications.reminders  daily 12:00 UTC (17:30 IST, REMINDERS.cron): gentle reminder emails to students who have
 *                            not used the platform for REMINDERS.inactiveDays, and to a confirmed parent address.
 *                            Idempotent per user, kind and IST day (reminder_log claim → sent | failed). When a send
 *                            fails the run throws after the batch and pg-boss retries it (10 min, backoff); every
 *                            retry re-checks the IST quiet hours (21:00–08:00) and stops inside them.
 *
 * Runs only when REMINDERS.enabled AND the worker setting REMINDERS_ENABLED (default on in local/test/dev, off in
 * stg/prod) AND the worker has an email sender (ACS settings; the mock outbox locally) and OTP_PEPPER (the
 * unsubscribe links are signed with it, so they must match the API). Otherwise the run is a logged no-op.
 */
import { runReminders, type ReminderRunResult } from '@soyl/api/notifications/reminders';
import { EmailLinks } from '@soyl/api/notifications/links';
import { EmailTokens } from '@soyl/api/notifications/tokens';
import type { EmailSender } from '@soyl/api/billing/invoices/delivery';
import { REMINDERS } from '@soyl/shared/config/notifications';
import { defineJob, type JobDefinition, type JobQueueOptions } from './registry';

export const NOTIFICATION_JOB_NAMES = {
  reminders: 'notifications.reminders',
} as const;

export interface NotificationJobSettings {
  /** REMINDERS.enabled && REMINDERS_ENABLED. */
  enabled: boolean;
  email: EmailSender | null;
  /** OTP_PEPPER (same value as the API's, so the links verify there). */
  pepper: string | null;
  publicBaseUrl: string;
  /** API_PUBLIC_PATH (the web proxy prefix, ADR-005). */
  apiPublicPath: string;
}

export type RemindersJobResult = ReminderRunResult | { skipped: 'disabled' | 'not_configured' };

const NOTIFICATION_QUEUE: JobQueueOptions = {
  policy: 'stately',
  retryLimit: 3,
  retryDelay: 600,
  retryBackoff: true,
  retryDelayMax: 3600,
  expireInSeconds: 30 * 60,
  deleteAfterSeconds: 14 * 86_400,
};

export function notificationJobs(settings: NotificationJobSettings | undefined): JobDefinition[] {
  return [
    defineJob<unknown, RemindersJobResult>({
      name: NOTIFICATION_JOB_NAMES.reminders,
      description: 'Gentle reminder emails to inactive students and confirmed parent addresses (D-055)',
      cron: REMINDERS.cron,
      options: NOTIFICATION_QUEUE,
      handler: async (ctx) => {
        if (!settings?.enabled) {
          ctx.log.info('reminders skipped: switched off (REMINDERS.enabled / REMINDERS_ENABLED)');
          return { skipped: 'disabled' };
        }
        if (!settings.email || !settings.pepper) {
          ctx.log.warn('reminders skipped: the worker has no email sender or OTP_PEPPER', { alert: true, event: 'reminders_not_configured', email: Boolean(settings.email), linkSigning: Boolean(settings.pepper) });
          return { skipped: 'not_configured' };
        }
        const links = new EmailLinks({ publicBaseUrl: settings.publicBaseUrl, apiPublicPath: settings.apiPublicPath }, new EmailTokens(settings.pepper));
        return runReminders({
          db: ctx.db,
          email: settings.email,
          links,
          now: ctx.now,
          signal: ctx.signal,
          log: { info: (o, m) => ctx.log.info(m ?? 'reminders', o as Record<string, unknown>), warn: (o, m) => ctx.log.warn(m ?? 'reminders', o as Record<string, unknown>), error: (o, m) => ctx.log.error(m ?? 'reminders', o as Record<string, unknown>) },
        });
      },
    }),
  ] as JobDefinition[];
}

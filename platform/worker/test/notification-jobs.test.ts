/**
 * D-055 notifications.reminders wiring: registered with the 17:30 IST cron; a logged no-op when switched off or not
 * configured (no email sender / OTP_PEPPER); otherwise it runs the @soyl/api reminder logic with the job's `now`, and
 * its unsubscribe links verify with the same pepper. Config: REMINDERS_ENABLED defaults (on locally and in dev, off in
 * stg/prod), pepper rules. The cadence itself is covered in platform/api/test/email-reminders-job.test.ts.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { randomBytes } from 'node:crypto';
import { profiles, streaks, users } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { REMINDERS } from '@soyl/shared/config/notifications';
import { MockEmailSender } from '@soyl/api/billing/invoices/delivery';
import { EmailTokens } from '@soyl/api/notifications/tokens';
import { NOTIFICATION_JOB_NAMES, notificationJobs, type NotificationJobSettings } from '../src/notification-jobs';
import { allJobs } from '../src/jobs';
import { loadConfig } from '../src/config';
import { notificationSettings } from '../src/worker';
import type { JobContext } from '../src/registry';

let t: TestDb;
const pepper = randomBytes(32).toString('base64url');
const logs: { level: string; msg: string; fields?: Record<string, unknown> }[] = [];
const log = {
  info: (msg: string, fields?: Record<string, unknown>) => logs.push({ level: 'info', msg, fields }),
  warn: (msg: string, fields?: Record<string, unknown>) => logs.push({ level: 'warn', msg, fields }),
  error: (msg: string, fields?: Record<string, unknown>) => logs.push({ level: 'error', msg, fields }),
  debug: () => {},
  child: () => log,
} as unknown as JobContext['log'];
/** 12:00 UTC = 17:30 IST. */
const NOW = new Date('2031-01-15T12:00:00Z');
const settings = (o: Partial<NotificationJobSettings> = {}): NotificationJobSettings => ({
  enabled: true,
  email: new MockEmailSender(),
  pepper,
  publicBaseUrl: 'https://www.soylai.test',
  apiPublicPath: '/api/platform',
  ...o,
});
const handler = (s: NotificationJobSettings | undefined) => notificationJobs(s).find((j) => j.name === NOTIFICATION_JOB_NAMES.reminders)!.handler;

beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('notifications.reminders', () => {
  it('is registered daily at 12:00 UTC (17:30 IST)', () => {
    const job = allJobs().find((j) => j.name === 'notifications.reminders');
    expect(job?.cron).toBe(REMINDERS.cron);
    expect(REMINDERS.cron).toBe('0 12 * * *');
  });

  it('does nothing when switched off or not configured', async () => {
    const ctx = { db: t.db, now: NOW, log } as JobContext;
    expect(await handler(undefined)(ctx, {})).toEqual({ skipped: 'disabled' });
    expect(await handler(settings({ enabled: false }))(ctx, {})).toEqual({ skipped: 'disabled' });
    expect(await handler(settings({ email: null }))(ctx, {})).toEqual({ skipped: 'not_configured' });
    expect(await handler(settings({ pepper: null }))(ctx, {})).toEqual({ skipped: 'not_configured' });
    expect(JSON.stringify(logs)).not.toContain(pepper);
  });

  it('runs the reminder logic with the job clock; links verify with the same pepper', async () => {
    const email = `wk.${randomBytes(3).toString('hex')}@school.soyl.in`;
    const [u] = await t.db.insert(users).values({ name: 'SOYL learner', email, emailVerified: true, role: 'student', createdAt: new Date('2030-12-01T00:00:00Z') }).returning();
    await t.db.insert(profiles).values({ userId: u!.id });
    await t.db.insert(streaks).values({ userId: u!.id, lastActiveIstDay: '2031-01-10' });
    const s = settings();
    const result = await handler(s)({ db: t.db, now: NOW, log } as JobContext, {});
    expect(result).toMatchObject({ studentSent: 1, failed: 0 });
    const m = (s.email as MockEmailSender).last(email)!;
    const token = /#t=([^\s]+)/.exec(m.text)![1]!;
    expect(new EmailTokens(pepper).verifyUnsubscribe(token)).toMatchObject({ userId: u!.id, purpose: 'student' });
    expect(m.text).toContain('https://www.soylai.test/me/email/unsubscribe#t=');
  });
});

describe('worker config (D-055)', () => {
  const base = { DATABASE_URL: 'postgres://x@localhost/db', PGBOSS_MIGRATE: 'false' };
  it('REMINDERS_ENABLED defaults: on in local/test/dev, off in stg/prod; the setting wins', () => {
    expect(loadConfig({ APP_ENV: 'local' }).reminders.enabled).toBe(true);
    expect(loadConfig({ ...base, APP_ENV: 'dev' }).reminders.enabled).toBe(true);
    expect(loadConfig({ ...base, APP_ENV: 'stg' }).reminders.enabled).toBe(false);
    expect(loadConfig({ ...base, APP_ENV: 'prod' }).reminders.enabled).toBe(false);
    expect(loadConfig({ ...base, APP_ENV: 'prod', REMINDERS_ENABLED: 'true', OTP_PEPPER: pepper }).reminders.enabled).toBe(true);
    expect(loadConfig({ APP_ENV: 'local', REMINDERS_ENABLED: 'false' }).reminders.enabled).toBe(false);
  });

  it('the pepper: the dev placeholder only locally; none in prod means not configured, not a failed start', () => {
    expect(loadConfig({ APP_ENV: 'local' }).reminders.pepper).toMatch(/^local-dev-otp-pepper/);
    expect(loadConfig({ ...base, APP_ENV: 'prod' }).reminders.pepper).toBeNull();
    expect(() => loadConfig({ ...base, APP_ENV: 'prod', OTP_PEPPER: 'short' })).toThrow(/OTP_PEPPER/);
    expect(() => loadConfig({ ...base, APP_ENV: 'prod', OTP_PEPPER: 'local-dev-otp-pepper-not-for-deployment-0000000' })).toThrow(/placeholder/);
    const cfg = loadConfig({ ...base, APP_ENV: 'prod', PUBLIC_BASE_URL: 'https://www.soylai.com/' });
    expect(cfg.reminders).toMatchObject({ publicBaseUrl: 'https://www.soylai.com', apiPublicPath: '/api/platform' });
  });

  it('builds the job settings: no sender in prod without ACS settings, the mock outbox locally', () => {
    const prod = loadConfig({ ...base, APP_ENV: 'prod', REMINDERS_ENABLED: 'true', OTP_PEPPER: pepper });
    expect(notificationSettings(prod, {}).email).toBeNull();
    expect(notificationSettings(loadConfig({ APP_ENV: 'local' }), {}).email?.isMock).toBe(true);
    expect(notificationSettings(loadConfig({ APP_ENV: 'local', REMINDERS_ENABLED: 'false' }), {}).email).toBeNull();
  });
});

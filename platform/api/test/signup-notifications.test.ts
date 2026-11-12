/**
 * New student sign-up notice to the owner (SIGNUP_NOTIFY_EMAIL; notifications/signup.ts) on a real PostgreSQL:
 * one email per new student account (email, phone, Google), masked identifier only, correct counts; nothing for
 * re-logins, staff or an unset setting; an email outage never fails sign-up; the hourly flood guard.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { and, eq, gte, isNull, sql } from 'drizzle-orm';
import { bootstrapAdmin, users } from '@soyl/db';
import { SIGNUP_NOTIFY } from '@soyl/shared/config/notifications';
import { FakeClock } from '../src/clock';
import { loadConfig } from '../src/config';
import { MemoryKv } from '../src/kv';
import { RateLimiter } from '../src/rate-limit';
import { MockEmailSender } from '../src/auth/senders/email';
import { istDayStart } from '../src/ai/time';
import { maskedAccount, signupNoticeEmail, SignupNotifier } from '../src/notifications/signup';
import type { AuthUser } from '../src/types';
import { createHarness, PUBLIC_BASE, type Harness } from './helpers';

const OWNER = 'owner.notify@example.com';
const TAG = 'signup-notice';

let h: Harness;
let n = 0;
const uniq = () => `${Date.now().toString(36)}${(++n).toString(36)}`;
const phone = () => `+91555000${String(1000 + (n++ % 9000)).padStart(4, '0')}`;
const drain = () => h.services.signupNotifier.drain();
const notices = (m: MockEmailSender = h.email) => m.outbox.filter((e) => e.tag === TAG);

/** Active student accounts now: [created today (IST), total]. */
async function studentCounts(): Promise<{ today: number; total: number }> {
  const active = and(eq(users.role, 'student'), isNull(users.deletedAt));
  const [all] = await h.t.db.select({ n: sql<number>`count(*)::int` }).from(users).where(active);
  const [today] = await h.t.db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(and(active, gte(users.createdAt, istDayStart(new Date()))));
  return { today: Number(today!.n), total: Number(all!.n) };
}

beforeAll(async () => {
  h = await createHarness({ env: { SIGNUP_NOTIFY_EMAIL: OWNER } });
});
afterAll(async () => {
  await h?.close();
});
beforeEach(() => {
  h.email.failing = false;
});

describe('student sign-up notice', () => {
  it('an email sign-up sends exactly one notice to SIGNUP_NOTIFY_EMAIL with the masked address and counts', async () => {
    const before = notices().length;
    const mail = `asha.${uniq()}@example.com`;
    const c = h.client('203.0.113.77');
    const res = await c.signInEmail(mail);
    expect(res.isNewUser).toBe(true);
    await drain();

    const sent = notices().slice(before);
    expect(sent).toHaveLength(1);
    const m = sent[0]!;
    expect(m.to).toBe(OWNER);
    const counts = await studentCounts();
    expect(counts.total).toBeGreaterThanOrEqual(1);
    expect(m.subject).toBe(`New SOYL sign-up (#${counts.total})`);
    expect(m.text).toContain('Email: a***@example.com');
    expect(m.text).toContain('Signed up with: Email code');
    expect(m.text).toMatch(/Time: .+ IST/);
    expect(m.text).toContain(`Sign-ups today (IST): ${counts.today}`);
    expect(m.text).toContain(`Student accounts in total: ${counts.total}`);
    expect(m.text).toContain(`${PUBLIC_BASE}/admin`);
    expect(m.html).toContain(`href="${PUBLIC_BASE}/admin"`);
    expect(m.html).toContain('a***@example.com');
    // Data minimisation: no full address, user id, IP or user agent.
    for (const part of [m.subject, m.text, m.html!]) {
      expect(part).not.toContain(mail);
      expect(part).not.toContain(res.user.id);
      expect(part).not.toContain('203.0.113.77');
      expect(part).not.toContain('vitest-browser');
    }
    // the OTP email went to the student, the notice only to the owner
    expect(h.email.outbox.filter((e) => e.to === mail && e.tag === TAG)).toHaveLength(0);
  });

  it('counts go up with each sign-up; phone sign-ups show the masked number', async () => {
    const before = notices().length;
    const first = await studentCounts();
    const num = phone();
    const res = await h.client().signInPhone(num);
    expect(res.isNewUser).toBe(true);
    await drain();
    const sent = notices().slice(before);
    expect(sent).toHaveLength(1);
    expect(sent[0]!.subject).toBe(`New SOYL sign-up (#${first.total + 1})`);
    expect(sent[0]!.text).toContain(`Phone: ${num.slice(0, 3)}******${num.slice(-4)}`);
    expect(sent[0]!.text).toContain('Signed up with: Phone code');
    expect(sent[0]!.text).toContain(`Sign-ups today (IST): ${first.today + 1}`);
    expect(sent[0]!.text).toContain(`Student accounts in total: ${first.total + 1}`);
    expect(sent[0]!.text).not.toContain(num);
  });

  it('a Google sign-up sends one notice (method google, masked email)', async () => {
    const before = notices().length;
    const id = uniq();
    h.oidc.nextUser({ sub: `sub-${id}`, email: `gita.${id}@example.com`, name: 'Gita Sharma' });
    const { location } = await h.client().signInGoogle();
    expect(location).not.toContain('error');
    await drain();
    const sent = notices().slice(before);
    expect(sent).toHaveLength(1);
    expect(sent[0]!.text).toContain('Email: g***@example.com');
    expect(sent[0]!.text).toContain('Signed up with: Google');
    expect(sent[0]!.text).not.toContain('Gita');
    expect(sent[0]!.text).not.toContain(id);
  });

  it('a re-login sends nothing', async () => {
    const mail = `repeat.${uniq()}@example.com`;
    const c = h.client();
    await c.signInEmail(mail);
    await drain();
    const before = notices().length;
    h.clock.advance(31_000);
    const again = await c.signInEmail(mail);
    expect(again.isNewUser).toBe(false);
    await drain();
    expect(notices().length).toBe(before);
  });

  it('staff (created by admin bootstrap) signing in sends nothing; a non-student account never triggers a notice', async () => {
    const mail = `staff.${uniq()}@example.com`;
    const boot = await bootstrapAdmin(h.t.db, mail);
    expect(boot.created).toBe(true);
    const before = notices().length;
    const res = await h.client().signInEmail(mail);
    expect(res.isNewUser).toBe(false);
    expect(res.user.role).toBe('admin');
    await drain();
    expect(notices().length).toBe(before);

    // Defence in depth: the notifier ignores any non-student account handed to it.
    for (const role of ['admin', 'reviewer', 'parent'] as const) {
      h.services.signupNotifier.accountCreated({ ...fakeUser(), role }, 'email');
    }
    await drain();
    expect(notices().length).toBe(before);
  });

  it('an email outage never fails sign-up: logged as signup_notify_failed (alert, error class only)', async () => {
    const before = notices().length;
    const logsBefore = h.logs.length;
    h.email.failing = true; // phone sign-up: the OTP goes by SMS, only the notice email fails
    const num = phone();
    const res = await h.client().signInPhone(num);
    expect(res.isNewUser).toBe(true);
    await drain();
    expect(notices().length).toBe(before);
    const failed = h.logs.slice(logsBefore).filter((l) => l.event === 'signup_notify_failed');
    expect(failed).toHaveLength(1);
    expect(failed[0]).toMatchObject({ alert: true, errorClass: 'EmailDeliveryError' });
    expect(JSON.stringify(failed[0])).not.toContain(num);
    expect(JSON.stringify(failed[0])).not.toContain(OWNER);
    expect(JSON.stringify(failed[0])).not.toContain(res.user.id);
    // the account works
    const [u] = await h.t.db.select().from(users).where(eq(users.id, res.user.id));
    expect(u).toBeTruthy();
  });
});

describe('setting off', () => {
  it('no SIGNUP_NOTIFY_EMAIL: a sign-up sends no notice', async () => {
    const off = await createHarness({ t: h.t });
    try {
      expect(off.config.signupNotifyEmail).toBeNull();
      expect(off.services.signupNotifier.enabled).toBe(false);
      const res = await off.client().signInPhone(phone());
      expect(res.isNewUser).toBe(true);
      const mail = `off.${uniq()}@example.com`;
      expect((await off.client().signInEmail(mail)).isNewUser).toBe(true);
      await off.services.signupNotifier.drain();
      expect(notices(off.email)).toHaveLength(0);
      expect(off.email.outbox.every((m) => m.to === mail)).toBe(true);
    } finally {
      await off.close();
    }
  });

  it('config: unset or blank is off, a bad address is refused', () => {
    expect(loadConfig({}).signupNotifyEmail).toBeNull();
    expect(loadConfig({ SIGNUP_NOTIFY_EMAIL: '' }).signupNotifyEmail).toBeNull();
    expect(loadConfig({ SIGNUP_NOTIFY_EMAIL: '  ' }).signupNotifyEmail).toBeNull();
    expect(loadConfig({ SIGNUP_NOTIFY_EMAIL: OWNER }).signupNotifyEmail).toBe(OWNER);
    expect(() => loadConfig({ SIGNUP_NOTIFY_EMAIL: 'not-an-email' })).toThrow(/SIGNUP_NOTIFY_EMAIL/);
  });
});

function fakeUser(over: Partial<AuthUser> = {}): AuthUser {
  return {
    id: '00000000-0000-4000-8000-000000000000',
    name: 'Student',
    email: 'zara.k@example.com',
    emailVerified: true,
    phoneNumber: null,
    phoneNumberVerified: false,
    role: 'student',
    banned: false,
    deletedAt: null,
    createdAt: new Date(),
    ...over,
  };
}

describe('flood guard', () => {
  it('the default cap is a config constant', () => {
    expect(SIGNUP_NOTIFY.maxPerHour).toBeGreaterThan(0);
  });

  it('beyond maxPerHour notices are suppressed (logged), and resume after the hour', async () => {
    const clock = new FakeClock(Date.now());
    const kv = new MemoryKv();
    const email = new MockEmailSender();
    const logs: { level: string; obj: Record<string, unknown> }[] = [];
    const log = {
      info: (obj: object) => logs.push({ level: 'info', obj: obj as Record<string, unknown> }),
      warn: (obj: object) => logs.push({ level: 'warn', obj: obj as Record<string, unknown> }),
      error: (obj: object) => logs.push({ level: 'error', obj: obj as Record<string, unknown> }),
    };
    const notifier = new SignupNotifier({ db: h.t.db, clock, email, limiter: new RateLimiter(kv, clock, 'test-key'), to: OWNER, publicBaseUrl: PUBLIC_BASE, maxPerHour: 2 });
    notifier.useLog(log);
    try {
      for (let i = 0; i < 3; i++) {
        notifier.accountCreated(fakeUser(), 'email');
        await notifier.drain();
      }
      expect(notices(email)).toHaveLength(2);
      const suppressed = logs.filter((l) => l.obj.event === 'signup_notify_suppressed');
      expect(suppressed).toHaveLength(1);
      expect(suppressed[0]).toMatchObject({ level: 'warn', obj: { cap: 2, method: 'email' } });

      clock.advance(3_600_000 + 1_000);
      notifier.accountCreated(fakeUser(), 'google');
      await notifier.drain();
      expect(notices(email)).toHaveLength(3);
    } finally {
      await kv.close();
    }
  });
});

describe('notice email', () => {
  it('masks by method and escapes HTML', () => {
    expect(maskedAccount({ email: 'arjun@gmail.com', phoneNumber: null }, 'email')).toBe('a***@gmail.com');
    expect(maskedAccount({ email: 'arjun@gmail.com', phoneNumber: null }, 'google')).toBe('a***@gmail.com');
    expect(maskedAccount({ email: '919876543210@phone.soyl.invalid', phoneNumber: '+919876543210' }, 'phone')).toBe('+91******3210');
    const m = signupNoticeEmail(OWNER, { account: '<b>@x.com', method: 'email', at: new Date('2026-11-12T10:12:00Z'), today: 3, total: 41 }, `${PUBLIC_BASE}/admin`);
    expect(m.subject).toBe('New SOYL sign-up (#41)');
    expect(m.text).toContain('Time: 12 Nov 2026, 3:42 pm IST');
    expect(m.html).toContain('&lt;b&gt;@x.com');
    expect(m.html).not.toContain('<b>@x.com');
  });
});

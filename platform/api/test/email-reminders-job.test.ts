/**
 * D-055 reminder run (notifications/reminders.ts) on a real PostgreSQL with a fixed `now`: who gets a reminder and
 * when (inactive 1 vs 2 days, the gap, maxUnanswered and its reset, the first day), who never does (no email,
 * opt-out, deleted, banned, staff, fixtures), parent pending vs active and the parent gap, quiet hours, idempotent
 * re-runs, send failure and same-day retry, the stale-claim takeover, and the email itself (content rules, headers).
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { randomBytes } from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { lessonProgress, notificationPreferences, profiles, reminderLog, streaks, users } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { REMINDERS } from '@soyl/shared/config/notifications';
import { publicName } from '@soyl/shared/config/public-names';
import { AcsEmailSender, MockEmailSender } from '../src/auth/senders/email';
import { EmailLinks, lessonPath } from '../src/notifications/links';
import { EmailTokens } from '../src/notifications/tokens';
import { isQuietHours, reminderAddress, reminderDue, ReminderSendError, runReminders, type ReminderRunResult } from '../src/notifications/reminders';
import { parentConfirmEmail, parentReminderEmail, studentReminderEmail } from '../src/notifications/emails';
import { seedMiniCatalog } from './helpers';

const BASE = 'https://www.soylai.test';
const DAY = 86_400_000;
/** Wednesday 6 March 2030, 12:00 UTC = 17:30 IST (the cron time). */
const NOW = new Date('2030-03-06T12:00:00Z');
const TODAY = '2030-03-06';
const day = (offset: number) => new Date(Date.parse(`${TODAY}T00:00:00Z`) + offset * DAY).toISOString().slice(0, 10);

let t: TestDb;
let tokens: EmailTokens;
let links: EmailLinks;
let chapterId: string;
let n = 0;
const mail = new MockEmailSender();

/** A student created on 1 Feb 2030 whose last activity is `lastActive` (a streak day). */
async function student(o: { email?: string; lastActive?: string | null; displayName?: string; verified?: boolean; role?: string; createdAt?: Date; deleted?: boolean; banned?: boolean } = {}) {
  const email = o.email ?? `learner${++n}.${randomBytes(3).toString('hex')}@school.soyl.in`;
  const [u] = await t.db
    .insert(users)
    .values({
      name: 'SOYL learner',
      email,
      emailVerified: o.verified ?? true,
      role: o.role ?? 'student',
      banned: o.banned ?? false,
      deletedAt: o.deleted ? new Date('2030-02-20T00:00:00Z') : null,
      createdAt: o.createdAt ?? new Date('2030-02-01T06:00:00Z'),
    })
    .returning();
  await t.db.insert(profiles).values({ userId: u!.id, displayName: o.displayName ?? null });
  if (o.lastActive !== null) await t.db.insert(streaks).values({ userId: u!.id, currentDays: 1, longestDays: 1, lastActiveIstDay: o.lastActive ?? day(-2) });
  return { id: u!.id, email };
}

async function run(at: Date = NOW, o: { elapsedMs?: () => number } = {}): Promise<ReminderRunResult> {
  return runReminders({ db: t.db, email: mail, links, now: at, elapsedMs: o.elapsedMs ?? (() => 0) });
}
const to = (email: string) => mail.outbox.filter((m) => m.to === email);
const at = (offsetDays: number, utc = '12:00:00') => new Date(`${day(offsetDays)}T${utc}Z`);
async function setActive(userId: string, lastActive: string) {
  await t.db.update(streaks).set({ lastActiveIstDay: lastActive }).where(eq(streaks.userId, userId));
}

beforeAll(async () => {
  t = await createTestDb();
  tokens = new EmailTokens(randomBytes(32).toString('base64url'));
  links = new EmailLinks({ publicBaseUrl: BASE, apiPublicPath: '/api/platform' }, tokens);
  chapterId = (await seedMiniCatalog(t)).ch1.id;
});
afterAll(async () => {
  await t?.close();
});
beforeEach(() => {
  mail.failing = false;
});

describe('pure rules', () => {
  it('quiet hours are 21:00–08:00 IST, edges included at the start and excluded at the end', () => {
    expect(isQuietHours(new Date('2030-03-06T15:29:59Z'))).toBe(false); // 20:59:59 IST
    expect(isQuietHours(new Date('2030-03-06T15:30:00Z'))).toBe(true); // 21:00 IST
    expect(isQuietHours(new Date('2030-03-06T20:00:00Z'))).toBe(true); // 01:30 IST
    expect(isQuietHours(new Date('2030-03-07T02:29:59Z'))).toBe(true); // 07:59:59 IST
    expect(isQuietHours(new Date('2030-03-07T02:30:00Z'))).toBe(false); // 08:00 IST
    expect(isQuietHours(NOW)).toBe(false); // 17:30 IST, the cron
  });

  it('due only after inactiveDays, outside the gap, below maxUnanswered', () => {
    const rules = { inactiveDays: 2, gapDays: 3, maxUnanswered: 4 };
    expect(reminderDue({ today: TODAY, lastActiveDay: day(-1), lastSentDay: null, unanswered: 0 }, rules)).toEqual({ due: false, reason: 'recently_active' });
    expect(reminderDue({ today: TODAY, lastActiveDay: TODAY, lastSentDay: null, unanswered: 0 }, rules)).toEqual({ due: false, reason: 'recently_active' });
    expect(reminderDue({ today: TODAY, lastActiveDay: day(-2), lastSentDay: null, unanswered: 0 }, rules)).toEqual({ due: true });
    expect(reminderDue({ today: TODAY, lastActiveDay: day(-9), lastSentDay: day(-2), unanswered: 1 }, rules)).toEqual({ due: false, reason: 'gap' });
    expect(reminderDue({ today: TODAY, lastActiveDay: day(-9), lastSentDay: day(-3), unanswered: 1 }, rules)).toEqual({ due: true });
    expect(reminderDue({ today: TODAY, lastActiveDay: day(-30), lastSentDay: day(-3), unanswered: 4 }, rules)).toEqual({ due: false, reason: 'max_unanswered' });
  });

  it('addresses: verified, real, not a fixture or special-use domain', () => {
    expect(reminderAddress('a@school.soyl.in', true)).toBe('a@school.soyl.in');
    expect(reminderAddress('a@school.soyl.in', false)).toBeNull();
    expect(reminderAddress('p+91555@phone.soyl.invalid', true)).toBeNull();
    expect(reminderAddress('student.cbse10@example.com', true)).toBeNull();
    expect(reminderAddress('x@foo.test', true)).toBeNull();
    expect(reminderAddress(null, true)).toBeNull();
  });

  it('lesson links match the web routes (CBSE, CISCE, deck parts)', () => {
    expect(lessonPath('cbse-10-science-ch01', 0)).toBe('/learn/cbse/10/science/ch01/lesson');
    expect(lessonPath('cbse-10-social-science-ch03', 2)).toBe('/learn/cbse/10/social-science/ch03/lesson?part=2');
    expect(lessonPath('icse-9-physics-ch04', 0)).toBe('/learn/cisce/9/physics/ch04/lesson');
    expect(lessonPath('nonsense', 0)).toBeNull();
  });

  it('tokens: student and parent links verify; tampering, other purposes and other keys do not', () => {
    const id = '0190a0b0-0000-7000-8000-000000000001';
    const s = tokens.studentUnsubscribe(id);
    expect(tokens.verifyUnsubscribe(s)).toEqual({ userId: id, purpose: 'student', generation: 0 });
    expect(tokens.verifyUnsubscribe(tokens.parentUnsubscribe(id, 3))).toEqual({ userId: id, purpose: 'parent', generation: 3 });
    const flipped = `${s.slice(0, -1)}${s.endsWith('A') ? 'B' : 'A'}`;
    expect(tokens.verifyUnsubscribe(flipped)).toBeNull();
    expect(tokens.verifyUnsubscribe(s.replace(id, '0190a0b0-0000-7000-8000-000000000002'))).toBeNull();
    expect(tokens.verifyUnsubscribe(s.replace('.s0.', '.p0.'))).toBeNull();
    expect(tokens.verifyUnsubscribe(tokens.parentConfirm(id, 1, NOW))).toBeNull();
    expect(new EmailTokens('another-pepper-another-pepper-another-pepper').verifyUnsubscribe(s)).toBeNull();
    const c = tokens.parse(tokens.parentConfirm(id, 1, NOW))!;
    expect(tokens.verifyConfirm(c, NOW)).toBe(true);
    expect(tokens.verifyConfirm(c, new Date(NOW.getTime() + 1))).toBe(false);
  });
});

describe('emails', () => {
  const unsub = { page: `${BASE}/me/email/unsubscribe#t=x`, oneClick: `${BASE}/api/platform/v1/email/unsubscribe/one-click?token=x` };

  it('student reminder: warm, no streak or missed-day talk, no images or tracking, unsubscribe footer and RFC 8058 headers', () => {
    const m = studentReminderEmail({
      to: 'a@school.soyl.in',
      firstName: 'Asha',
      target: { chapterTitle: 'Chemical Reactions and Equations', context: 'Science · Class 10', url: `${BASE}/learn/cbse/10/science/ch01/lesson` },
      dashboardUrl: `${BASE}/dashboard`,
      creditsRefreshDaily: true,
      minGapDays: 3,
      unsubscribe: unsub,
      settingsUrl: `${BASE}/me#email-reminders`,
    });
    expect(m.text.startsWith('Hi Asha,')).toBe(true);
    expect(m.text).toContain('Chemical Reactions and Equations');
    expect(m.text).toContain(`${BASE}/learn/cbse/10/science/ch01/lesson`);
    expect(m.text).toContain('AI credits refresh every day');
    expect(m.text).toContain(`Unsubscribe from reminders: ${unsub.page}`);
    expect(m.text).toContain(`Manage email settings: ${BASE}/me#email-reminders`);
    expect(m.headers).toEqual({ 'List-Unsubscribe': `<${unsub.oneClick}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' });
    for (const part of [m.subject, m.text, m.html!]) {
      expect(part).not.toMatch(/streak|miss(ed|ing)? out|don.t lose|lose your|last chance|hurry|\b\d+ days? (ago|in a row|without)/i);
      expect(part).not.toMatch(/<img|background-image|url\(/i);
    }
    expect(m.html).toContain('href="https://www.soylai.test/me/email/unsubscribe#t=x"');
  });

  it('student reminder without a name or a lesson: "Hi there" and the dashboard; no credits line when not true', () => {
    const m = studentReminderEmail({ to: 'a@x.in', firstName: null, target: null, dashboardUrl: `${BASE}/dashboard`, creditsRefreshDaily: false, minGapDays: 3, unsubscribe: unsub, settingsUrl: `${BASE}/me` });
    expect(m.text.startsWith('Hi there,')).toBe(true);
    expect(m.text).toContain(`${BASE}/dashboard`);
    expect(m.text).toContain('weekly goal');
    expect(m.text).not.toContain('credits');
  });

  it('the ACS request carries the custom headers', async () => {
    const acs = new AcsEmailSender({ endpoint: 'https://acs.example.communication.azure.com', from: 'SOYL Academy <noreply@soylai.com>', accessKey: Buffer.from('k'.repeat(32)).toString('base64') });
    const m = parentReminderEmail({ to: 'p@x.in', publicName: 'Brave Otter 417', chapterTitle: null, minGapDays: 7, unsubscribe: unsub });
    const { init } = await acs.buildRequest(m);
    const body = JSON.parse(String(init.body));
    expect(body.headers).toEqual({ 'List-Unsubscribe': `<${unsub.oneClick}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' });
    expect(body.userEngagementTrackingDisabled).toBe(true);
    const { init: plain } = await acs.buildRequest({ to: 'p@x.in', subject: 's', text: 't', tag: 'otp' });
    expect(JSON.parse(String(plain.body)).headers).toBeUndefined();
  });

  it('parent confirmation: masked student, the confirm link, nothing else is promised', () => {
    const m = parentConfirmEmail({ to: 'p@x.in', publicName: 'Brave Otter 417', studentHint: 'a***@gmail.com', confirmUrl: `${BASE}/me/email/parent-confirm#t=abc`, hours: 72, parentMinGapDays: 7, privacyUrl: `${BASE}/privacy` });
    expect(m.text).toContain('a***@gmail.com');
    expect(m.text).toContain(`${BASE}/me/email/parent-confirm#t=abc`);
    expect(m.text).toContain('Nothing is sent to this address unless you confirm');
    expect(m.text).toContain('not a progress report');
    expect(m.headers).toBeUndefined();
  });
});

describe('who gets a student reminder', () => {
  it('inactive 1 day: nothing; inactive 2 days: one email with the lesson to continue, by display name', async () => {
    const one = await student({ lastActive: day(-1) });
    const two = await student({ lastActive: day(-2), displayName: 'Asha Rao' });
    await t.db.insert(lessonProgress).values({ userId: two.id, chapterId, unit: 'cbse-10-science-ch01', part: 1, slidePosition: 4, createdAt: new Date('2030-02-10T05:00:00Z'), updatedAt: new Date('2030-02-10T05:00:00Z') });
    const r = await run();
    expect(to(one.email)).toHaveLength(0);
    const [m] = to(two.email);
    expect(m).toBeDefined();
    expect(m!.tag).toBe('reminder-student');
    expect(m!.text.startsWith('Hi Asha,')).toBe(true);
    expect(m!.subject).toBe('Pick up Chemical Reactions and Equations where you left off');
    expect(m!.text).toContain(`${BASE}/learn/cbse/10/science/ch01/lesson?part=1`);
    expect(m!.text).toContain('Science · Class 10');
    const token = /#t=([^\s]+)/.exec(m!.text)![1]!;
    expect(tokens.verifyUnsubscribe(token)).toEqual({ userId: two.id, purpose: 'student', generation: 0 });
    expect(m!.headers!['List-Unsubscribe']).toBe(`<${BASE}/api/platform/v1/email/unsubscribe/one-click?token=${token}>`);
    expect(r.studentSent).toBeGreaterThanOrEqual(1);
    const [log] = await t.db.select().from(reminderLog).where(eq(reminderLog.userId, two.id));
    expect(log).toMatchObject({ kind: 'student', istDay: TODAY, status: 'sent', attempts: 1 });
  });

  it('no name and no lesson: "Hi there" and the dashboard link', async () => {
    const s = await student({ lastActive: day(-5) });
    await run();
    const [m] = to(s.email);
    expect(m!.text.startsWith('Hi there,')).toBe(true);
    expect(m!.text).toContain(`${BASE}/dashboard`);
  });

  it('a re-run the same day sends nothing again (idempotent)', async () => {
    const s = await student({ lastActive: day(-4) });
    await run();
    expect(to(s.email)).toHaveLength(1);
    const again = await run(new Date(NOW.getTime() + 30 * 60_000));
    expect(to(s.email)).toHaveLength(1);
    expect(again.alreadyDone + again.notDue.gap).toBeGreaterThanOrEqual(1);
    expect(await t.db.select().from(reminderLog).where(eq(reminderLog.userId, s.id))).toHaveLength(1);
  });

  it('the gap: nothing for minGapDays after a reminder, then the next one', async () => {
    const s = await student({ lastActive: day(-10) });
    await run();
    expect(to(s.email)).toHaveLength(1);
    await run(at(1));
    await run(at(2));
    expect(to(s.email)).toHaveLength(1);
    await run(at(REMINDERS.minGapDays));
    expect(to(s.email)).toHaveLength(2);
  });

  it(`stops after ${REMINDERS.maxUnanswered} unanswered reminders; activity resets the count`, async () => {
    const s = await student({ lastActive: day(-40) });
    const g = REMINDERS.minGapDays;
    for (let i = 0; i < REMINDERS.maxUnanswered + 2; i++) await run(at(-30 + i * g));
    expect(to(s.email)).toHaveLength(REMINDERS.maxUnanswered);
    // The student comes back (any activity), then goes quiet again: reminders resume.
    await setActive(s.id, day(-5));
    await run();
    expect(to(s.email)).toHaveLength(REMINDERS.maxUnanswered + 1);
  });

  it('never: phone-only, unverified, fixture domains, opted out, deleted, banned, staff, the first day', async () => {
    const never = [
      await student({ email: `p${randomBytes(3).toString('hex')}@phone.soyl.invalid`, lastActive: day(-9) }),
      await student({ verified: false, lastActive: day(-9) }),
      await student({ email: `fixture${randomBytes(3).toString('hex')}@example.com`, lastActive: day(-9) }),
      await student({ deleted: true, lastActive: day(-9) }),
      await student({ banned: true, lastActive: day(-9) }),
      await student({ role: 'reviewer', lastActive: day(-9) }),
      await student({ role: 'parent', lastActive: day(-9) }),
      // Signed up 10 hours ago (and never active since): the first day is always quiet.
      await student({ lastActive: null, createdAt: new Date(NOW.getTime() - 10 * 3_600_000) }),
    ];
    const optedOut = await student({ lastActive: day(-9) });
    await t.db.insert(notificationPreferences).values({ userId: optedOut.id, studentReminders: false });
    await run();
    for (const s of [...never, optedOut]) expect(to(s.email), s.email).toHaveLength(0);
  });

  it('a new account that never came back gets its first reminder once inactiveDays have passed since sign-up', async () => {
    const s = await student({ lastActive: null, createdAt: new Date(`${day(-2)}T06:00:00Z`) });
    await run(at(-1));
    expect(to(s.email)).toHaveLength(0);
    await run();
    expect(to(s.email)).toHaveLength(1);
  });

  it('recent activity in lessons, tests, AI or a sign-in counts, not only the streak', async () => {
    const s = await student({ lastActive: day(-9) });
    await t.db.insert(lessonProgress).values({ userId: s.id, chapterId, unit: 'cbse-10-science-ch01', part: 0, createdAt: at(-1), updatedAt: at(-1) });
    await run();
    expect(to(s.email)).toHaveLength(0);
  });
});

describe('parent reminders', () => {
  async function withParent(status: 'pending' | 'active', o: { studentReminders?: boolean; lastActive?: string } = {}) {
    const s = await student({ lastActive: o.lastActive ?? day(-4) });
    const parent = `parent.${randomBytes(3).toString('hex')}@home.soyl.in`;
    await t.db.insert(notificationPreferences).values({
      userId: s.id,
      studentReminders: o.studentReminders ?? false,
      parentEmail: parent,
      parentStatus: status,
      parentGeneration: 1,
      parentConfirmSentAt: at(-10),
      parentConfirmedAt: status === 'active' ? at(-9) : null,
    });
    return { ...s, parent };
  }

  it('pending: nothing to the parent; active: one short note naming the public name and the lesson, with its own unsubscribe', async () => {
    const pending = await withParent('pending');
    const active = await withParent('active');
    await t.db.insert(lessonProgress).values({ userId: active.id, chapterId, unit: 'cbse-10-science-ch01', part: 0, createdAt: at(-6), updatedAt: at(-6) });
    await run();
    expect(to(pending.parent)).toHaveLength(0);
    const [m] = to(active.parent);
    expect(m!.tag).toBe('reminder-parent');
    const name = publicName(active.id, 0);
    expect(m!.text).toContain(`${name} hasn’t opened SOYL Academy for a few days; they left Chemical Reactions and Equations halfway.`);
    expect(m!.text).toContain('not a progress report');
    expect(m!.text).not.toContain(active.email);
    const token = /#t=([^\s]+)/.exec(m!.text)![1]!;
    expect(tokens.verifyUnsubscribe(token)).toEqual({ userId: active.id, purpose: 'parent', generation: 1 });
    expect(m!.headers!['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click');
    // The student switched their own reminders off: the parent setting is independent.
    expect(to(active.email)).toHaveLength(0);
  });

  it(`the parent gap is ${REMINDERS.parentMinGapDays} days; the parent switch off stops them`, async () => {
    const p = await withParent('active', { lastActive: day(-20) });
    await run();
    await run(at(REMINDERS.minGapDays));
    await run(at(REMINDERS.parentMinGapDays - 1));
    expect(to(p.parent)).toHaveLength(1);
    await run(at(REMINDERS.parentMinGapDays));
    expect(to(p.parent)).toHaveLength(2);
    await t.db.update(notificationPreferences).set({ parentReminders: false }).where(eq(notificationPreferences.userId, p.id));
    await run(at(2 * REMINDERS.parentMinGapDays));
    expect(to(p.parent)).toHaveLength(2);
  });
});

describe('quiet hours, failures and retries', () => {
  it('a run inside the quiet hours sends nothing; a run that reaches 21:00 IST stops', async () => {
    const s = await student({ lastActive: day(-6) });
    const late = await run(new Date(`${TODAY}T16:00:00Z`)); // 21:30 IST
    expect(late.skipped).toBe('quiet_hours');
    expect(to(s.email)).toHaveLength(0);
    const early = await run(new Date(`${TODAY}T01:00:00Z`)); // 06:30 IST
    expect(early.skipped).toBe('quiet_hours');
    // Started at 20:59:59 IST; one second later, before the first send, it is 21:00.
    const crossing = await run(new Date(`${TODAY}T15:29:59Z`), { elapsedMs: () => 1000 });
    expect(crossing.stoppedForQuietHours).toBe(true);
    expect(to(s.email)).toHaveLength(0);
    expect(await t.db.select().from(reminderLog).where(and(eq(reminderLog.userId, s.id), eq(reminderLog.istDay, TODAY)))).toHaveLength(0);
  });

  it('a failed send marks the claim failed and throws (pg-boss retries); the same-day retry sends it once', async () => {
    const s = await student({ lastActive: day(-6) });
    const d = day(30);
    mail.failing = true;
    await expect(run(at(30))).rejects.toBeInstanceOf(ReminderSendError);
    expect(to(s.email)).toHaveLength(0);
    let [log] = await t.db.select().from(reminderLog).where(and(eq(reminderLog.userId, s.id), eq(reminderLog.istDay, d)));
    expect(log).toMatchObject({ status: 'failed', attempts: 1, sentAt: null });
    mail.failing = false;
    await run(new Date(at(30).getTime() + 10 * 60_000));
    expect(to(s.email)).toHaveLength(1);
    [log] = await t.db.select().from(reminderLog).where(and(eq(reminderLog.userId, s.id), eq(reminderLog.istDay, d)));
    expect(log).toMatchObject({ status: 'sent', attempts: 2 });
    await run(new Date(at(30).getTime() + 20 * 60_000));
    expect(to(s.email)).toHaveLength(1);
  });

  it('a claim left in "sending" by a crashed run is taken over only once it is stale', async () => {
    const s = await student({ lastActive: day(-6) });
    const d = day(60);
    await t.db.insert(reminderLog).values({ userId: s.id, kind: 'student', istDay: d, status: 'sending', claimedAt: at(60) });
    await run(new Date(at(60).getTime() + 5 * 60_000));
    expect(to(s.email)).toHaveLength(0);
    await run(new Date(at(60).getTime() + (REMINDERS.staleClaimMinutes + 1) * 60_000));
    expect(to(s.email)).toHaveLength(1);
  });

  it('logs counts only, never an address', async () => {
    const lines: string[] = [];
    const s = await student({ lastActive: day(-6) });
    await runReminders({ db: t.db, email: mail, links, now: at(90), elapsedMs: () => 0, log: { info: (o) => lines.push(JSON.stringify(o)), warn: (o) => lines.push(JSON.stringify(o)), error: (o) => lines.push(JSON.stringify(o)) } });
    expect(to(s.email).length).toBeGreaterThanOrEqual(1);
    expect(lines.join('\n')).not.toContain('@');
    expect(lines.join('\n')).toContain('reminders_run');
  });
});

describe('deletion', () => {
  it('the purge cascades the settings and the log', async () => {
    const s = await student({ lastActive: day(-6) });
    await t.db.insert(notificationPreferences).values({ userId: s.id, parentEmail: 'p@home.soyl.in', parentStatus: 'pending', parentGeneration: 1 });
    await t.db.insert(reminderLog).values({ userId: s.id, kind: 'student', istDay: day(-1), status: 'sent', claimedAt: at(-1), sentAt: at(-1) });
    await t.db.delete(users).where(eq(users.id, s.id));
    expect(await t.db.select().from(notificationPreferences).where(eq(notificationPreferences.userId, s.id))).toHaveLength(0);
    expect(await t.db.select().from(reminderLog).where(eq(reminderLog.userId, s.id))).toHaveLength(0);
  });
});

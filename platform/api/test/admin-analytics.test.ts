/**
 * Super-admin dashboard (D-045): role/capability/MFA gating, every analytics section against a seeded
 * fixture with known numbers (including IST day boundaries), the interest counters (allowlist, no user
 * link), the audited user lookup, and the server-observed counters. Real embedded PostgreSQL.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import { analyticsCounters, auditLog, staffCapabilities } from '@soyl/db';
import { base32Decode, stepAt, totpAt } from '../src/auth/mfa';
import { maskEmail, maskPhone } from '../src/domain/admin/users';
import { resolveRange, series } from '../src/domain/admin/analytics';
import { observeProblem, observeResponse } from '../src/domain/admin/observe';
import { createHarness, STAFF_EMAIL_TOTP, type Client, type Harness } from './helpers';
import { seedRealContent } from './content-fixture';

let h: Harness;
const SCI = 'cbse-10-science-ch01';
let n = 0;
const email = () => `aa.${Date.now().toString(36)}${++n}@example.com`;
const RANGE = '?from=2026-09-01&to=2026-09-30';
const ist = (local: string) => new Date(`${local}+05:30`).toISOString();

const ids: Record<string, string> = {};
let superadmin: Client;
let superadminId: string;

async function staff(role: 'reviewer' | 'admin', o: { superadmin?: boolean; mfa?: boolean } = {}): Promise<{ c: Client; id: string; email: string }> {
  const c = h.client();
  const mail = email();
  const { user } = await c.signInEmail(mail);
  await h.services.adapter().then((x) => x.updateUser(user.id, { role }));
  if (o.superadmin) await h.t.db.insert(staffCapabilities).values({ userId: user.id, capability: 'superadmin' });
  if (o.mfa ?? true) {
    const { secret } = (await c.post('/v1/me/mfa/totp/enroll')).json();
    const ok = await c.post('/v1/me/mfa/totp/confirm', { code: totpAt(base32Decode(secret), stepAt(h.clock.now())) });
    expect(ok.statusCode).toBe(200);
  }
  return { c, id: user.id, email: mail };
}

async function user(key: string, createdAtIst: string, mail: string, extra: { phone?: string; board?: string; classLevel?: number; consent?: string; ageBand?: string } = {}) {
  const res = await h.t.db.execute<{ id: string }>(sql`
    INSERT INTO users (name, email, email_verified, phone_number, role, created_at, updated_at)
    VALUES ('SOYL learner', ${mail}, true, ${extra.phone ?? null}, 'student', ${ist(createdAtIst)}::timestamptz, ${ist(createdAtIst)}::timestamptz) RETURNING id`);
  const id = res.rows[0]!.id;
  ids[key] = id;
  await h.t.db.execute(sql`INSERT INTO profiles (user_id, board, class_level) VALUES (${id}, ${extra.board ?? null}, ${extra.classLevel ?? null})`);
  if (extra.consent) await h.t.db.execute(sql`INSERT INTO consent_status (user_id, status, provider) VALUES (${id}, ${extra.consent}, 'builtin')`);
  if (extra.ageBand)
    await h.t.db.execute(sql`INSERT INTO consent_records (user_id, age_band, status, method, policy_version, granted_at, declared_at)
      VALUES (${id}, ${extra.ageBand}, 'granted', 'self_declared', 'v1', now(), now())`);
  return id;
}

beforeAll(async () => {
  h = await createHarness();
  await seedRealContent(h.t, (u) => u === SCI);
  const db = h.t.db;
  const [q] = (await db.execute<{ id: string; key: string; version: number; chapter_id: string }>(sql`SELECT id, key, version, chapter_id FROM questions WHERE unit = ${SCI} ORDER BY key LIMIT 1`)).rows;
  const [test] = (await db.execute<{ id: string }>(sql`SELECT id FROM tests LIMIT 1`)).rows;

  // Students (IST day boundaries: 00:10 IST is the previous UTC day; 00:00 IST belongs to the new day).
  await user('u1', '2026-09-01T00:10:00', 'asha@gmail.com', { board: 'cbse', classLevel: 10, consent: 'granted', ageBand: 'minor' });
  await user('u2', '2026-09-01T23:50:00', 'ravi@school.example.in', { board: 'cbse', classLevel: 10, consent: 'pending' });
  await user('u3', '2026-08-31T23:59:00', `919800000001@phone.soyl.invalid`, { phone: '+919800000001', board: 'cisce', classLevel: 9 });
  await user('u4', '2026-09-02T00:00:00', 'meera@yahoo.com', { classLevel: 12, consent: 'granted', ageBand: 'adult' });
  await user('u5', '2026-09-15T10:00:00', 'kabir@gmail.com', { consent: 'revoked' });
  await db.execute(sql`INSERT INTO accounts (account_id, provider_id, user_id, created_at, updated_at) VALUES ('g-ravi', 'google', ${ids.u2}, ${ist('2026-09-01T23:50:01')}::timestamptz, now())`);
  await db.execute(sql`UPDATE profiles SET guest_merged_at = ${ist('2026-09-01T00:11:00')}::timestamptz WHERE user_id = ${ids.u1}`);
  await db.execute(sql`INSERT INTO schools (name, name_normalized, source, created_by_user_id, created_at) VALUES ('Test School', 'test school', 'student', ${ids.u1}, ${ist('2026-09-05T10:00:00')}::timestamptz)`);

  // Learning activity: U2 day 0 (09-01), U1 day 1 (09-02, 00:30 IST = 09-01 UTC) and day 7, U4 day 1 (09-03).
  const answer = (u: string, at: string, correct: boolean) =>
    db.execute(sql`INSERT INTO practice_answers (user_id, question_id, question_key, question_version, chapter_id, correct, max_marks, grading, answered_at)
      VALUES (${ids[u]}, ${q!.id}, ${q!.key}, ${q!.version}, ${q!.chapter_id}, ${correct}, 1, 'auto', ${ist(at)}::timestamptz)`);
  await answer('u1', '2026-09-02T00:30:00', true);
  await answer('u1', '2026-09-08T09:00:00', false);
  await db.execute(sql`INSERT INTO lesson_progress (user_id, chapter_id, unit, created_at, updated_at, completed_at)
    VALUES (${ids.u2}, ${q!.chapter_id}, ${SCI}, ${ist('2026-09-01T23:55:00')}::timestamptz, ${ist('2026-09-01T23:56:00')}::timestamptz, ${ist('2026-09-01T23:56:00')}::timestamptz)`);
  await db.execute(sql`INSERT INTO attempts (user_id, test_id, status, started_at, deadline_at, submitted_at)
    VALUES (${ids.u4}, ${test!.id}, 'submitted', ${ist('2026-09-03T10:00:00')}::timestamptz, ${ist('2026-09-03T11:00:00')}::timestamptz, ${ist('2026-09-03T10:30:00')}::timestamptz)`);
  await db.execute(sql`INSERT INTO streaks (user_id, current_days, longest_days, last_active_ist_day) VALUES (${ids.u1}, 3, 5, (now() AT TIME ZONE 'Asia/Kolkata')::date), (${ids.u2}, 9, 9, '2026-09-01')`);

  // AI: grants, one spent request (7 reserved, 2 returned → 5 spent), one refunded, one moderated; spend near the cap.
  const cap = h.services.ai.config.dailySpendCapPaise;
  await db.execute(sql`INSERT INTO credit_ledger (user_id, kind, amount, action, ist_day) VALUES
    (${ids.u1}, 'grant', 50, 'daily_grant', '2026-09-02'), (${ids.u1}, 'grant', 10, 'learning_bonus_goal', '2026-09-02')`);
  await db.execute(sql`INSERT INTO credit_ledger (user_id, kind, amount, action, request_id, ist_day, reservation_expires_at) VALUES
    (${ids.u1}, 'reserve', -7, 'hard-doubt', 'req-aa-1', '2026-09-02', now()), (${ids.u1}, 'reserve', -1, 'quick-doubt', 'req-aa-2', '2026-09-02', now())`);
  await db.execute(sql`INSERT INTO credit_ledger (user_id, kind, amount, action, request_id, ist_day) VALUES
    (${ids.u1}, 'charge', 2, 'hard-doubt', 'req-aa-1', '2026-09-02'), (${ids.u1}, 'refund', 1, 'quick-doubt', 'req-aa-2', '2026-09-02')`);
  await db.execute(sql`INSERT INTO ai_requests (user_id, request_id, action, model_tier, model, status, created_at, degraded) VALUES
    (${ids.u1}, 'req-aa-1', 'hard-doubt', 'mid', 'mock', 'succeeded', ${ist('2026-09-02T10:00:00')}::timestamptz, false),
    (${ids.u1}, 'req-aa-2', 'quick-doubt', 'small', 'mock', 'failed', ${ist('2026-09-02T10:05:00')}::timestamptz, true),
    (${ids.u1}, 'req-aa-3', 'quick-doubt', 'small', 'mock', 'moderated', ${ist('2026-09-03T10:05:00')}::timestamptz, false)`);
  await db.execute(sql`INSERT INTO ai_spend_daily (ist_day, scope, spent_paise, requests) VALUES
    ('2026-09-02', 'all', ${cap * 0.9}, 2), ('2026-09-03', 'all', ${cap}, 1), ('2026-09-04', 'all', ${cap * 0.1}, 1)`);

  // Billing: one active monthly Pro subscription (₹299), one yearly Plus (₹2,388 → ₹199/month), a captured
  // payment with a partial refund, a paid Board Exam Pass order and a failed order.
  const plan = async (key: string) =>
    (await db.execute<{ id: string }>(sql`INSERT INTO plans (key, name, credits_per_day) VALUES (${key}, ${key}, 100) ON CONFLICT (key) DO UPDATE SET name = EXCLUDED.name RETURNING id`)).rows[0]!.id;
  const pro = await plan('pro');
  const plus = await plan('plus');
  const pass = await plan('board_exam_pass');
  await db.execute(sql`INSERT INTO subscriptions (user_id, plan_id, interval, razorpay_subscription_id, amount_paise, status, created_at) VALUES
    (${ids.u1}, ${pro}, 'monthly', 'sub_aa_1', 29900, 'active', ${ist('2026-09-10T09:00:00')}::timestamptz),
    (${ids.u4}, ${plus}, 'yearly', 'sub_aa_2', 238800, 'active', ${ist('2026-09-11T09:00:00')}::timestamptz)`);
  await db.execute(sql`INSERT INTO orders (user_id, plan_id, razorpay_order_id, receipt, amount_paise, status, created_at) VALUES
    (${ids.u2}, ${pass}, 'order_aa_1', 'rcpt_aa_1', 49900, 'paid', ${ist('2026-09-12T09:00:00')}::timestamptz),
    (${ids.u5}, ${pass}, 'order_aa_2', 'rcpt_aa_2', 49900, 'failed', ${ist('2026-09-16T09:00:00')}::timestamptz)`);
  await db.execute(sql`INSERT INTO payments (user_id, subscription_id, order_id, razorpay_payment_id, amount_paise, status, captured_at, refunded_paise) VALUES
    (${ids.u1}, (SELECT id FROM subscriptions WHERE razorpay_subscription_id = 'sub_aa_1'), NULL, 'pay_aa_1', 29900, 'partially_refunded', ${ist('2026-09-10T09:01:00')}::timestamptz, 10000),
    (${ids.u2}, NULL, (SELECT id FROM orders WHERE razorpay_order_id = 'order_aa_1'), 'pay_aa_2', 49900, 'captured', ${ist('2026-09-12T09:01:00')}::timestamptz, 0)`);

  // Interest counters on fixture days (written as the API would).
  await db.insert(analyticsCounters).values([
    { istDay: '2026-09-05', event: 'paywall_shown', dimension: 'quick-doubt', count: 3 },
    { istDay: '2026-09-06', event: 'paywall_shown', dimension: 'hard-doubt', count: 1 },
    { istDay: '2026-09-05', event: 'plans_view', dimension: '', count: 4 },
    { istDay: '2026-08-20', event: 'plans_view', dimension: '', count: 2 },
    { istDay: '2026-09-07', event: 'store_item_view', dimension: 'hoodie', count: 2 },
  ]);

  // Content reports: open for 2 h, 30 h and 10 days.
  const now = h.clock.now();
  for (const hours of [2, 30, 240])
    await db.execute(sql`INSERT INTO content_reports (content_type, content_id, unit, category, status, created_at)
      VALUES ('question', ${q!.id}, ${SCI}, 'typo', 'open', ${new Date(now - hours * 3_600_000).toISOString()}::timestamptz)`);

  const s = await staff('admin', { superadmin: true });
  superadmin = s.c;
  superadminId = s.id;
}, 240_000);

afterAll(async () => {
  await h?.close();
});

describe('access: superadmin only, staff MFA, rate-limited, never cached', () => {
  it('guests 401, students/parents 403, reviewers 403 (reports only), plain admins 403, superadmins need MFA only when STAFF_AUTH says totp', async () => {
    expect((await h.client().get(`/v1/admin/analytics/overview${RANGE}`)).statusCode).toBe(401);
    const student = h.client();
    await student.signInEmail(email());
    expect((await student.get(`/v1/admin/analytics/overview${RANGE}`)).json().code).toBe('forbidden');
    expect((await student.get('/v1/admin/me')).json().code).toBe('forbidden');

    const reviewer = await staff('reviewer');
    expect((await reviewer.c.get(`/v1/admin/analytics/overview${RANGE}`)).json().code).toBe('forbidden');
    expect((await reviewer.c.get('/v1/admin/users')).json().code).toBe('forbidden');
    expect((await reviewer.c.get('/v1/admin/me')).json()).toEqual({ userId: reviewer.id, role: 'reviewer', capabilities: [], sections: ['reports'] });
    expect((await reviewer.c.get('/v1/admin/reports')).statusCode).toBe(200);

    const admin = await staff('admin');
    expect((await admin.c.get(`/v1/admin/analytics/growth${RANGE}`)).json().code).toBe('forbidden');
    expect((await admin.c.post(`/v1/admin/users/${ids.u1}/reveal`)).json().code).toBe('forbidden');
    expect((await admin.c.get('/v1/admin/me')).json()).toMatchObject({ role: 'admin', capabilities: [], sections: ['reports'] });

    // Owner default (ADR-026, secondFactor 'none'): a superadmin without TOTP reaches the dashboard.
    const noMfa = await staff('admin', { superadmin: true, mfa: false });
    expect((await noMfa.c.get(`/v1/admin/analytics/overview${RANGE}`)).statusCode).toBe(200);
    expect((await noMfa.c.get('/v1/admin/me')).json()).toMatchObject({ userId: noMfa.id, capabilities: ['superadmin'] });
    // With STAFF_AUTH.secondFactor 'totp' (ADR-011) the same superadmin, signed in by email, needs MFA.
    const totp = await createHarness({ t: h.t, staffAuth: STAFF_EMAIL_TOTP });
    try {
      const c = totp.client();
      await c.signInEmail(noMfa.email);
      expect((await c.get(`/v1/admin/analytics/overview${RANGE}`)).json().code).toBe('mfa_required');
      expect((await c.get('/v1/admin/me')).json().code).toBe('mfa_required');
    } finally {
      await totp.close();
    }

    const ok = await superadmin.get(`/v1/admin/analytics/overview${RANGE}`);
    expect(ok.statusCode).toBe(200);
    expect(ok.headers['cache-control']).toBe('no-store');
    expect((await superadmin.get('/v1/admin/me')).json()).toEqual({ userId: superadminId, role: 'admin', capabilities: ['superadmin'], sections: ['analytics', 'users', 'reports'] });
    expect(h.logs.some((l) => l.event === 'authz_denied' && l.reason === 'capability')).toBe(true);
  });

  it('every analytics and user route is admin + superadmin capability + MFA with its own bucket', () => {
    const routes = h.app.routeTable.filter((r) => r.url.startsWith('/v1/admin/analytics/') || r.url.startsWith('/v1/admin/users'));
    expect(routes.length).toBe(12);
    for (const r of routes) {
      expect(r.policy, `${r.method} ${r.url}`).toMatchObject({ roles: ['admin'], mfa: true, capability: 'superadmin', csrf: true });
      expect(r.policy.rateLimit && r.policy.rateLimit.buckets?.[0], r.url).toMatch(/^admin\.(analytics|users)\.user$/);
    }
  });

  it('validates ranges: IST days, not in the future, from <= to, at most 180 days; defaults to the last 30 days', async () => {
    const bad = async (qs: string, path: string) => {
      const r = await superadmin.get(`/v1/admin/analytics/overview${qs}`);
      expect(r.statusCode, qs).toBe(400);
      expect(r.json().errors[0].path, qs).toBe(path);
    };
    await bad('?from=2026-09-31&to=2026-09-30', 'querystring.from');
    await bad('?from=2026-09-10&to=2026-09-01', 'querystring.from');
    await bad('?from=2026-01-01&to=2026-09-30', 'querystring.from');
    await bad('?to=2999-01-01', 'querystring.to');
    expect((await superadmin.get('/v1/admin/analytics/overview?from=2026-09-01&to=2026-09-30&x=1')).statusCode).toBe(400);
    const def = (await superadmin.get('/v1/admin/analytics/overview')).json();
    expect(def.range.days).toBe(30);
    expect(resolveRange({ from: '2026-04-04', to: '2026-09-30' }, '2026-10-28', new Date()).days).toBe(180);
    expect(resolveRange({ from: '2026-09-01', to: '2026-09-30' }, '2026-10-28', new Date())).toMatchObject({ previousFrom: '2026-08-02', previousTo: '2026-08-31' });
    expect(series('x', 'X', { from: '2026-09-01', to: '2026-09-03' }, [{ day: '2026-09-02', n: 2 }]).points.map((p) => p.value)).toEqual([0, 2, 0]);
  });
});

describe('analytics sections on the fixture', () => {
  it('overview: KPIs with the previous period, dense daily series on IST days', async () => {
    const o = (await superadmin.get(`/v1/admin/analytics/overview${RANGE}`)).json();
    expect(o.range).toMatchObject({ from: '2026-09-01', to: '2026-09-30', days: 30, previousFrom: '2026-08-02', previousTo: '2026-08-31', timezone: 'Asia/Kolkata' });
    const kpi = (k: string) => o.kpis.find((x: { key: string }) => x.key === k);
    expect(kpi('signups')).toMatchObject({ value: 4, previous: 1 });
    expect(kpi('active_users')).toMatchObject({ value: 3, previous: 0 });
    expect(kpi('lessons_completed')).toMatchObject({ value: 1 });
    expect(kpi('practice_answers')).toMatchObject({ value: 2 });
    expect(kpi('tests_submitted')).toMatchObject({ value: 1 });
    expect(kpi('ai_requests')).toMatchObject({ value: 3 });
    expect(kpi('revenue')).toMatchObject({ value: 29900 + 49900, unit: 'paise' });
    expect(kpi('total_users').value).toBeGreaterThanOrEqual(5);
    expect(o.signups.points).toHaveLength(30);
    const day = (s: { points: { date: string; value: number }[] }, d: string) => s.points.find((p) => p.date === d)!.value;
    expect(day(o.signups, '2026-09-01')).toBe(2); // 00:10 IST and 23:50 IST
    expect(day(o.signups, '2026-09-02')).toBe(1); // 00:00 IST exactly
    expect(day(o.dau, '2026-09-01')).toBe(1);
    expect(day(o.dau, '2026-09-02')).toBe(1); // 00:30 IST, still 1 Sep in UTC
    expect(day(o.dau, '2026-09-03')).toBe(1);
    expect(day(o.dau, '2026-09-08')).toBe(1);
  });

  it('growth: methods (inferred), weeks, consent funnel, boards/classes, schools, guest merges', async () => {
    const g = (await superadmin.get(`/v1/admin/analytics/growth${RANGE}`)).json();
    const tot = (k: string) => g.signupsByMethod.find((s: { key: string }) => s.key === k).points.reduce((a: number, p: { value: number }) => a + p.value, 0);
    expect([tot('email'), tot('google'), tot('phone')]).toEqual([3, 1, 0]);
    expect(g.signupsByWeek).toEqual([
      { week: '2026-08-31', email: 2, phone: 0, google: 1, total: 3 },
      { week: '2026-09-14', email: 1, phone: 0, google: 0, total: 1 },
    ]);
    const val = (list: { key: string; value: number }[], k: string) => list.find((x) => x.key === k)!.value;
    expect(val(g.consentFunnel, 'granted')).toBe(1);
    expect(val(g.consentFunnel, 'adult')).toBe(1);
    expect(val(g.consentFunnel, 'pending')).toBe(1);
    expect(val(g.consentFunnel, 'revoked')).toBe(1);
    expect(val(g.consentFunnel, 'none')).toBeGreaterThanOrEqual(1); // u3 (+ students signed in by other tests)
    expect(val(g.boards, 'cbse')).toBe(2);
    expect(val(g.boards, 'cisce')).toBe(1);
    expect(val(g.classes, '10')).toBe(2);
    expect(val(g.classes, '12')).toBe(1);
    expect(g.schoolsAdded).toBe(1);
    expect(g.guestMerges.points.find((p: { date: string }) => p.date === '2026-09-01').value).toBe(1);
  });

  it('engagement: DAU/WAU/MAU, activity totals, top chapters, streak buckets', async () => {
    const e = (await superadmin.get(`/v1/admin/analytics/engagement${RANGE}`)).json();
    expect(e.activeUsers).toBe(3);
    expect(e.mau).toBe(3); // 1–30 Sep
    expect(e.wau).toBe(0); // 24–30 Sep
    expect(e.stickiness).toBeCloseTo(4 / 30 / 3, 3);
    const t = Object.fromEntries(e.totals.map((x: { key: string; value: number }) => [x.key, x.value]));
    expect(t).toEqual({ lessons_opened: 1, lessons_completed: 1, practice_answers: 2, practice_solved: 1, tests_started: 1, tests_submitted: 1, live_joins: 0 });
    expect(e.topChapters[0]).toMatchObject({ key: SCI, practiceAnswers: 2, lessonsOpened: 1, total: 3 });
    expect(e.topSubjects[0]).toMatchObject({ key: 'cbse-10-science', total: 3 });
    const streak = Object.fromEntries(e.streaks.map((x: { label: string; value: number }) => [x.label, x.value]));
    expect(streak['2–3 days']).toBe(1); // u1, active today
    expect(streak['8–14 days']).toBe(0); // u2's 9-day streak lapsed
    expect(e.notesFlashcards.map((x: { value: number }) => x.value)).toEqual([0, 0]);
  });

  it('retention: D1/D7/D30 by sign-up week', async () => {
    const r = (await superadmin.get(`/v1/admin/analytics/retention${RANGE}`)).json();
    expect(r.days).toEqual([1, 7, 30]);
    expect(r.cohorts).toEqual([
      { week: '2026-08-31', size: 3, eligible: [3, 3, 3], retained: [2, 1, 0], rates: [0.667, 0.333, 0] },
      { week: '2026-09-14', size: 1, eligible: [1, 1, 1], retained: [0, 0, 0], rates: [0, 0, 0] },
    ]);
  });

  it('AI: actions, credits granted (incl. learning bonus) / spent / refunded, spend vs cap and the breaker, paywall, moderation', async () => {
    const a = (await superadmin.get(`/v1/admin/analytics/ai${RANGE}`)).json();
    const tot = (s: { points: { value: number }[] }) => s.points.reduce((x, p) => x + p.value, 0);
    expect(Object.fromEntries(a.actionsByType.map((s: { key: string }) => [s.key, tot(s as never)]))).toEqual({ 'hard-doubt': 1, 'quick-doubt': 2 });
    expect(Object.fromEntries(a.credits.totals.map((x: { key: string; value: number }) => [x.key, x.value]))).toEqual({ granted: 60, spent: 5, refunded: 1, expired: 0 });
    expect(a.credits.granted.map((s: { key: string; label: string }) => [s.key, s.label])).toEqual([
      ['daily_grant', 'Daily free credits'],
      ['learning_bonus_goal', 'Learning bonus (learning bonus goal)'],
    ]);
    const cap = h.services.ai.config.dailySpendCapPaise;
    expect(a.spend.capPaise).toBe(cap);
    expect(a.spend.days.find((d: { date: string }) => d.date === '2026-09-02')).toMatchObject({ status: 'degraded', share: 0.9 });
    expect(a.spend.days.find((d: { date: string }) => d.date === '2026-09-03')).toMatchObject({ status: 'paused', share: 1 });
    expect(a.spend.days.find((d: { date: string }) => d.date === '2026-09-04')).toMatchObject({ status: 'normal' });
    expect(a.spend.breakerDays).toBe(2);
    expect(a.spend.degradedRequests).toBe(1);
    expect(a.paywallTotal).toBe(4);
    expect(a.paywallShown).toEqual([
      { key: 'hard-doubt', label: 'hard-doubt', value: 1 },
      { key: 'quick-doubt', label: 'quick-doubt', value: 3 },
    ]);
    expect(tot(a.moderationBlocks)).toBe(1);
  });

  it('revenue: checkout funnel, active subscriptions and MRR, revenue, refunds, Board Exam Pass; coins zeros', async () => {
    const r = (await superadmin.get(`/v1/admin/analytics/revenue${RANGE}`)).json();
    expect(r.billingEnabled).toBe(false);
    expect(r.plansViews).toBe(4);
    expect(r.checkout).toMatchObject({ started: 4, completed: 2, failed: 1 });
    expect(r.activeSubscriptions).toEqual([
      { plan: 'plus', interval: 'yearly', count: 1, mrrPaise: 19900 },
      { plan: 'pro', interval: 'monthly', count: 1, mrrPaise: 29900 },
    ]);
    expect(r.mrrPaise).toBe(49800);
    expect(r.revenueTotalPaise).toBe(79800);
    expect(r.refundsPaise).toBe(10000);
    expect(r.boardExamPass).toEqual({ sales: 1, revenuePaise: 49900 });
    expect(r.coins).toMatchObject({ earnedTotal: 0, storeViews: 0, itemViews: [{ key: 'hoodie', label: 'hoodie', value: 2 }], redemptions: [] });
    // An empty period shows zeros, not errors (billing is off in production).
    const empty = (await superadmin.get('/v1/admin/analytics/revenue?from=2026-06-01&to=2026-06-30')).json();
    expect(empty).toMatchObject({ plansViews: 0, checkout: { started: 0, completed: 0, failed: 0 }, revenueTotalPaise: 0, refundsPaise: 0, boardExamPass: { sales: 0, revenuePaise: 0 } });
    expect(empty.revenue.points).toHaveLength(30);
  });

  it('interest: every allowlisted event with totals, the previous period and dimensions', async () => {
    const i = (await superadmin.get(`/v1/admin/analytics/interest${RANGE}`)).json();
    const ev = (k: string) => i.events.find((e: { event: string }) => e.event === k);
    expect(ev('plans_view')).toMatchObject({ source: 'client', total: 4, previousTotal: 2, byDimension: [] });
    expect(ev('paywall_shown')).toMatchObject({ source: 'server', total: 4 });
    expect(ev('paywall_shown').byDimension[0]).toEqual({ key: 'quick-doubt', label: 'quick-doubt', value: 3 });
    expect(ev('signup').total).toBe(0);
  });

  it('content: published chapters per subject, open reports by age', async () => {
    const c = (await superadmin.get(`/v1/admin/analytics/content${RANGE}`)).json();
    expect(c.subjects.find((s: { subject: string }) => s.subject === 'cbse-10-science')).toMatchObject({ published: 1 });
    expect(c.openReports.map((x: { value: number }) => x.value)).toEqual([1, 1, 0, 1]);
    expect(c.openReportsByType).toEqual([{ key: 'question', label: 'question', value: 3 }]);
  });
});

describe('POST /v1/events (interest counters)', () => {
  const today = () => new Date(h.clock.now() + 330 * 60_000).toISOString().slice(0, 10);
  const count = async (event: string, dimension = '') =>
    Number((await h.t.db.select().from(analyticsCounters).where(sql`${analyticsCounters.event} = ${event} AND ${analyticsCounters.dimension} = ${dimension} AND ${analyticsCounters.istDay} = ${today()}`))[0]?.count ?? 0);

  it('guests and members add allowlisted events; repeats in one request add up', async () => {
    const guest = h.client();
    const r = await guest.post('/v1/events', { events: [{ name: 'plans_view' }, { name: 'plan_select', dimension: 'pro' }, { name: 'plans_view' }] });
    expect(r.statusCode).toBe(202);
    expect(r.json()).toEqual({ accepted: 3 });
    const member = h.client();
    await member.signInEmail(email());
    expect((await member.post('/v1/events', { events: [{ name: 'store_item_view', dimension: 'hoodie' }] })).statusCode).toBe(202);
    expect(await count('plans_view')).toBe(2);
    expect(await count('plan_select', 'pro')).toBe(1);
    expect(await count('store_item_view', 'hoodie')).toBe(1);
  });

  it('refuses unknown names, unknown dimensions, missing/extra dimensions and server-only events, writing nothing', async () => {
    const c = h.client();
    const before = await h.t.db.select().from(analyticsCounters);
    const bad = async (events: unknown[]) => {
      const r = await c.post('/v1/events', { events });
      expect(r.statusCode, JSON.stringify(events)).toBe(400);
    };
    await bad([{ name: 'plans_view' }, { name: 'credit_card_number' }]);
    await bad([{ name: 'plan_select', dimension: 'gold' }]);
    await bad([{ name: 'plan_select' }]);
    await bad([{ name: 'plans_view', dimension: 'pro' }]);
    await bad([{ name: 'paywall_shown', dimension: 'quick-doubt' }]);
    await bad([{ name: 'signup', dimension: 'email' }]);
    await bad([{ name: 'plans_view', userId: 'x' }]);
    await bad([]);
    await bad(Array.from({ length: 11 }, () => ({ name: 'plans_view' })));
    const big = await c.request('POST', '/v1/events', { rawBody: JSON.stringify({ events: [{ name: 'plans_view', dimension: 'x'.repeat(1100) }] }) });
    expect(big.statusCode).toBe(413);
    expect(await h.t.db.select().from(analyticsCounters)).toEqual(before);
  });

  it('stores no user id, IP, session or user agent: the table has only day, event, dimension and count', async () => {
    const cols = (await h.t.db.execute<{ column_name: string }>(sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'analytics_counters' ORDER BY 1`)).rows.map((r) => r.column_name);
    expect(cols).toEqual(['count', 'created_at', 'dimension', 'event', 'id', 'ist_day', 'updated_at']);
    const c = h.client('198.51.100.77');
    await c.post('/v1/events', { events: [{ name: 'ask_ai_open' }] });
    const dump = JSON.stringify(await h.t.db.select().from(analyticsCounters));
    expect(dump).not.toContain('198.51.100.77');
    expect(dump).not.toContain('vitest-browser');
  });

  it('is rate-limited per IP (events.ip)', async () => {
    const c = h.client('198.51.100.78');
    const codes: number[] = [];
    for (let i = 0; i < 31; i++) codes.push((await c.post('/v1/events', { events: [{ name: 'dashboard_view' }] })).statusCode);
    expect(codes.slice(0, 30).every((s) => s === 202)).toBe(true);
    expect(codes[30]).toBe(429);
  });

  it('server-observed: sign-up by method, paywall by action, AI paused, checkout start by plan', async () => {
    const before = await count('signup', 'email');
    await h.client().signInEmail(email());
    expect(await count('signup', 'email')).toBe(before + 1);
    const log = { warn: () => {} };
    await observeProblem(h.services.counters, { params: { action: 'quick-doubt' }, log } as never, 'credits_exhausted');
    await observeProblem(h.services.counters, { params: { action: 'not-an-action' }, log } as never, 'credits_exhausted');
    await observeProblem(h.services.counters, { params: {}, log } as never, 'ai_paused');
    await observeProblem(h.services.counters, { params: {}, log } as never, 'forbidden');
    await observeResponse(h.services.counters, { method: 'POST', routeOptions: { url: '/v1/billing/subscriptions' }, body: { plan: 'pro', interval: 'monthly' }, log } as never, 201);
    await observeResponse(h.services.counters, { method: 'POST', routeOptions: { url: '/v1/billing/orders' }, body: { plan: 'board_exam_pass' }, log } as never, 409);
    expect(await count('paywall_shown', 'quick-doubt')).toBe(1);
    expect(await count('ai_paused')).toBe(1);
    expect(await count('checkout_start', 'pro')).toBe(1);
    expect(await count('checkout_start', 'board_exam_pass')).toBe(0);
  });
});

describe('user lookup (masked, audited)', () => {
  const audits = async (action: string) => h.t.db.select().from(auditLog).where(eq(auditLog.action, action));

  it('masks emails and phones', () => {
    expect(maskEmail('asha@gmail.com')).toBe('a***@g***.com');
    expect(maskEmail('ravi@school.example.in')).toBe('r***@s***.in');
    expect(maskEmail('919800000001@phone.soyl.invalid')).toBeNull();
    expect(maskPhone('+919800000001')).toBe('+91******01');
    expect(maskPhone(null)).toBeNull();
  });

  it('recent sign-ups: newest first, masked, no names, cursor paging, staff left out', async () => {
    const page = (await superadmin.get('/v1/admin/users?limit=100')).json();
    const body = JSON.stringify(page);
    expect(body).not.toContain('asha@gmail.com');
    expect(body).not.toContain('SOYL learner');
    const u1 = page.users.find((u: { id: string }) => u.id === ids.u1);
    expect(u1).toEqual({ id: ids.u1, maskedEmail: 'a***@g***.com', maskedPhone: null, method: 'email', role: 'student', board: 'cbse', classLevel: 10, consent: 'granted', createdAt: ist('2026-09-01T00:10:00') });
    expect(page.users.find((u: { id: string }) => u.id === ids.u3)).toMatchObject({ maskedEmail: null, maskedPhone: '+91******01', method: 'phone' });
    expect(page.users.find((u: { id: string }) => u.id === ids.u2)).toMatchObject({ method: 'google' });
    expect(page.users.some((u: { id: string }) => u.id === superadminId)).toBe(false);
    const p1 = (await superadmin.get('/v1/admin/users?limit=2')).json();
    const p2 = (await superadmin.get(`/v1/admin/users?limit=2&cursor=${p1.nextCursor}`)).json();
    expect(p2.users[0].id).not.toBe(p1.users[1].id);
    expect((await superadmin.get('/v1/admin/users?cursor=bad')).statusCode).toBe(400);
  });

  it('search by exact email returns the masked row and is audited without the address', async () => {
    const r = await superadmin.post('/v1/admin/users/search', { email: 'Asha@Gmail.com ' });
    expect(r.json().users).toHaveLength(1);
    expect(r.json().users[0]).toMatchObject({ id: ids.u1, maskedEmail: 'a***@g***.com' });
    expect((await superadmin.post('/v1/admin/users/search', { email: 'nobody@example.com' })).json().users).toEqual([]);
    const rows = await audits('admin.user.search');
    expect(rows).toHaveLength(2);
    expect(rows.find((a) => a.targetId === ids.u1)).toMatchObject({ actorUserId: superadminId, actorRole: 'admin', after: { found: 1 } });
    expect(JSON.stringify(rows)).not.toContain('asha');
  });

  it('reveal returns the full email and writes the audit log (who, what, when)', async () => {
    const r = await superadmin.post(`/v1/admin/users/${ids.u1}/reveal`);
    expect(r.json()).toEqual({ id: ids.u1, email: 'asha@gmail.com', audited: true });
    const [row] = await audits('admin.user.reveal_email');
    expect(row).toMatchObject({ actorUserId: superadminId, actorRole: 'admin', targetType: 'user', targetId: ids.u1, after: { fields: ['email'] } });
    expect(row!.requestId).toBe(r.headers['x-trace-id']);
    expect(row!.createdAt).toBeInstanceOf(Date);
    expect((await superadmin.post(`/v1/admin/users/${ids.u3}/reveal`)).json().email).toBeNull();
    expect((await superadmin.post('/v1/admin/users/0190a1b2-0000-7000-8000-000000000000/reveal')).statusCode).toBe(404);
  });

  it('summary is counts only (no chats, uploads or answers) and is audited', async () => {
    const r = await superadmin.get(`/v1/admin/users/${ids.u1}/summary`);
    expect(r.statusCode).toBe(200);
    const s = r.json();
    expect(s.activity).toMatchObject({ practiceAnswers: 2, practiceSolved: 1, lessonsOpened: 0, testsSubmitted: 0, currentStreak: 3 });
    expect(s.ai).toMatchObject({ creditsSpent30: 0 });
    expect(s.subscription).toMatchObject({ plan: 'free', status: null });
    expect(s).toMatchObject({ consent: 'granted', ageBand: 'minor', signInMethods: ['email'], hasSchool: false, audited: true });
    expect(JSON.stringify(s)).not.toContain('asha@gmail.com');
    const [row] = await audits('admin.user.view_summary');
    expect(row).toMatchObject({ actorUserId: superadminId, targetId: ids.u1 });
  });
});

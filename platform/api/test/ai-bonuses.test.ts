/**
 * D-044 credits: bonus credits for learning (+10 when the daily practice goal of 10 solves is met, +5 on
 * each 7-day streak milestone) on real PostgreSQL — exactly at the 10th solve, once under concurrent
 * answers, same IST day only (no rollover), consent `granted` only, shown in balance / ledger / history,
 * still behind the global spend breaker — and the "What can I do with my credits?" guide and the
 * per-IST-day history.
 */
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { and, eq, sql } from 'drizzle-orm';
import { chapters, consentStatus, creditLedger, questionKeys, questionRow, questions, splitQuestion, streaks } from '@soyl/db';
import { Question } from '@soyl/shared/content/question';
import { CREDIT_BONUSES } from '@soyl/shared/config/credit-bonuses';
import { DAILY_PRACTICE_GOAL } from '@soyl/shared/config/learning';
import { getPlan } from '@soyl/shared/config/plans';
import { checkDailyGoal } from '../src/ai/bonuses';
import { InsufficientCreditsError, ledgerInvariants } from '../src/ai/credits';
import { createAiHarness, type AiHarness } from './ai-fixture';
import { seedMiniCatalog, type Client } from './helpers';

let h: AiHarness;
const DAY = Date.parse('2026-11-02T06:00:00Z'); // Monday 11:30 IST
const IST_DAY = '2026-11-02';
const FREE = getPlan('free').creditsPerDay;
const GOAL = CREDIT_BONUSES.dailyGoal.credits;
const STREAK = CREDIT_BONUSES.streakMilestone.credits;
const TARGET = DAILY_PRACTICE_GOAL.target;
const QUESTIONS = 16;
const qid = (i: number) => `q_bonus_mcq_${String(i).padStart(4, '0')}`;

beforeAll(async () => {
  h = await createAiHarness();
  await seedMiniCatalog(h.t);
  const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, 'cbse-10-science-ch01'));
  for (let i = 1; i <= QUESTIONS; i++) {
    const parsed = Question.parse({
      id: qid(i),
      unit: 'cbse-10-science-ch01',
      type: 'mcq',
      stem_md: `Bonus practice question ${i}: pick A.`,
      options: [ { id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }, { id: 'c', text_md: 'C' } ],
      answer: { option_ids: ['a'] },
      solution_md: 'A is right.',
      marking_scheme: [{ step: 'all', marks: 1 }],
      marks: 1,
      difficulty: 2,
      competency: 'application',
      bloom: 'apply',
      topic_ids: ['cbse-10-science-ch01-t01'],
      expected_time_sec: 60,
      status: 'published',
    });
    const [row] = await h.t.db.insert(questions).values(questionRow(parsed, { chapterId: ch!.id, academicYear: '2026-27', pool: 'practice', embargoUntil: null })).returning();
    await h.t.db.insert(questionKeys).values({ questionId: row!.id, ...splitQuestion(parsed).key });
  }
});
afterAll(async () => {
  await h?.close();
});
beforeEach(() => {
  h.clock.set(DAY);
});

type Award = { kind: string; credits: number; label: string };
const solve = async (c: Client, i: number) => {
  const r = await c.post('/v1/practice/answers', { questionId: qid(i), response: { option_ids: ['a'] } });
  expect(r.statusCode, `solve ${i}`).toBe(200);
  expect(r.json().correct).toBe(true);
  return r.json() as { creditBonuses: Award[]; streak: { current: number } };
};
const miss = async (c: Client, i: number) => {
  const r = await c.post('/v1/practice/answers', { questionId: qid(i), response: { option_ids: ['b'] } });
  expect(r.statusCode).toBe(200);
  return r.json() as { creditBonuses: Award[]; streak: { current: number } };
};
const bonusRows = (userId: string, kind?: string) =>
  h.t.db
    .select()
    .from(creditLedger)
    .where(and(eq(creditLedger.userId, userId), kind ? eq(creditLedger.kind, kind) : sql`${creditLedger.kind} IN ('bonus_goal', 'bonus_streak')`));
const credits = async (c: Client) => (await c.get('/v1/credits')).json() as { balance: number; bonusToday: number; grantedToday: number };

describe('daily practice goal bonus (D-044)', () => {
  it('is granted exactly at the 10th question solved today; re-solving or wrong answers do not count', async () => {
    expect([GOAL, TARGET, FREE]).toEqual([10, 10, 50]);
    const { c, id } = await h.member();
    for (let i = 1; i < TARGET; i++) expect((await solve(c, i)).creditBonuses).toEqual([]);
    // A wrong answer and solving question 1 again are not new solves.
    expect((await miss(c, TARGET + 1)).creditBonuses).toEqual([]);
    expect((await solve(c, 1)).creditBonuses).toEqual([]);
    expect(await credits(c)).toMatchObject({ balance: FREE, bonusToday: 0 });
    expect(await bonusRows(id)).toEqual([]);

    const tenth = await solve(c, TARGET);
    expect(tenth.creditBonuses).toEqual([{ kind: 'bonus_goal', credits: GOAL, label: 'Daily practice goal bonus' }]);
    expect(await credits(c)).toMatchObject({ balance: FREE + GOAL, grantedToday: FREE, bonusToday: GOAL });
    expect((await solve(c, TARGET + 2)).creditBonuses).toEqual([]);
    const rows = await bonusRows(id);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ kind: 'bonus_goal', amount: GOAL, action: 'daily_practice_goal', istDay: IST_DAY, requestId: null });
    expect(rows[0]!.metadata).toMatchObject({ solved: TARGET, target: TARGET });

    // The ledger and the per-day history show it.
    const ledger = (await c.get('/v1/credits/ledger?limit=5')).json();
    expect(ledger.entries[0]).toMatchObject({ kind: 'bonus_goal', amount: GOAL, action: 'daily_practice_goal', label: 'Daily practice goal bonus', day: IST_DAY });
    const hist = (await c.get('/v1/me/credits/history')).json();
    expect(hist.days.at(-1)).toEqual({ day: IST_DAY, granted: FREE, bonus: GOAL, spent: 0, refunded: 0, held: 0, left: FREE + GOAL });
    const guide = (await c.get('/v1/me/credits/guide')).json();
    expect(guide.bonuses.dailyGoal).toEqual({ credits: GOAL, target: TARGET, solvedToday: TARGET + 1, earnedToday: true });
    expect(guide).toMatchObject({ balance: FREE + GOAL, bonusToday: GOAL });
    // Bonus credits are spendable like any other today.
    const r = randomUUID();
    await h.services.ai.credits.reserve({ userId: id, requestId: r, action: 'hard-doubt', credits: FREE + GOAL, plan: 'free' });
    await h.services.ai.credits.charge(id, r);
    expect(await credits(c)).toMatchObject({ balance: 0 });
  });

  it('is granted once when several answers complete the goal at the same time', async () => {
    const { c, id } = await h.member();
    for (let i = 1; i <= TARGET - 2; i++) await solve(c, i);
    const results = await Promise.all([TARGET - 1, TARGET, TARGET + 1, TARGET + 2, TARGET + 3].map((i) => solve(c, i)));
    expect(results.flatMap((r) => r.creditBonuses)).toEqual([{ kind: 'bonus_goal', credits: GOAL, label: 'Daily practice goal bonus' }]);
    // And racing the check itself never writes a second row (unique index).
    const raced = await Promise.all(Array.from({ length: 10 }, () => checkDailyGoal(h.t.db, id, new Date(h.clock.now()))));
    expect(raced.filter(Boolean)).toEqual([]);
    expect(await bonusRows(id, 'bonus_goal')).toHaveLength(1);
    expect(await credits(c)).toMatchObject({ balance: FREE + GOAL, bonusToday: GOAL });
  });

  it('can be used the same IST day only: it lapses at 00:00 IST with no rollover', async () => {
    const { c, id } = await h.member();
    h.clock.set(Date.parse('2026-11-02T18:20:00Z')); // 23:50 IST
    for (let i = 1; i <= TARGET; i++) await solve(c, i);
    expect(await credits(c)).toMatchObject({ balance: FREE + GOAL, bonusToday: GOAL });
    h.clock.set(Date.parse('2026-11-02T18:31:00Z')); // 00:01 IST next day
    expect(await credits(c)).toMatchObject({ balance: FREE, bonusToday: 0, grantedToday: FREE });
    await expect(h.services.ai.credits.reserve({ userId: id, requestId: randomUUID(), action: 'hard-doubt', credits: FREE + 1, plan: 'free' })).rejects.toBeInstanceOf(InsufficientCreditsError);
    const hist = (await c.get('/v1/me/credits/history?days=2')).json();
    expect(hist).toMatchObject({ timezone: 'Asia/Kolkata', from: '2026-11-02', to: '2026-11-03' });
    expect(hist.days).toEqual([
      { day: '2026-11-02', granted: FREE, bonus: GOAL, spent: 0, refunded: 0, held: 0, left: FREE + GOAL },
      { day: '2026-11-03', granted: FREE, bonus: 0, spent: 0, refunded: 0, held: 0, left: FREE },
    ]);
    // The new day's goal starts from zero: yesterday's solves do not count, and the same questions are not new.
    for (let i = 1; i <= TARGET; i++) expect((await solve(c, i)).creditBonuses).toEqual([]);
    expect((await c.get('/v1/me/credits/guide')).json().bonuses.dailyGoal).toMatchObject({ solvedToday: 0, earnedToday: false });
  });

  it('is never granted (or shown) without consent `granted` (D-014/D-039)', async () => {
    const { c, id } = await h.member();
    await h.t.db.update(consentStatus).set({ status: 'required' }).where(eq(consentStatus.userId, id));
    h.consent.setStatus(id, 'required');
    // A streak milestone would be due with the next answer, too.
    await miss(c, QUESTIONS);
    await h.t.db.update(streaks).set({ currentDays: 6, longestDays: 6, lastActiveIstDay: '2026-11-01' }).where(eq(streaks.userId, id));
    for (let i = 1; i <= TARGET + 1; i++) expect((await solve(c, i)).creditBonuses).toEqual([]);
    expect(await checkDailyGoal(h.t.db, id, new Date(h.clock.now()))).toBeNull();
    expect(await bonusRows(id)).toEqual([]);
    expect(await credits(c)).toMatchObject({ balance: FREE, bonusToday: 0 });
    expect((await c.get('/v1/me/credits/guide')).json().bonuses).toBeNull();
  });
});

describe('streak milestone bonus (D-044)', () => {
  it('+5 on streak days 7 and 14 (once per day), nothing on other days', async () => {
    const { c, id } = await h.member();
    await miss(c, 1); // creates the streak row (day 1)
    await h.t.db.update(streaks).set({ currentDays: 6, longestDays: 6, lastActiveIstDay: '2026-11-01' }).where(eq(streaks.userId, id));
    const day7 = await miss(c, 2);
    expect(day7.streak.current).toBe(7);
    expect(day7.creditBonuses).toEqual([{ kind: 'bonus_streak', credits: STREAK, label: 'Streak milestone bonus' }]);
    expect((await miss(c, 3)).creditBonuses).toEqual([]); // same day: once
    expect(await credits(c)).toMatchObject({ balance: FREE + STREAK, bonusToday: STREAK });

    h.clock.set(DAY + 86_400_000); // day 8
    const day8 = await miss(c, 4);
    expect([day8.streak.current, day8.creditBonuses]).toEqual([8, []]);

    await h.t.db.update(streaks).set({ currentDays: 13, longestDays: 13, lastActiveIstDay: '2026-11-03' }).where(eq(streaks.userId, id));
    h.clock.set(DAY + 2 * 86_400_000); // 2026-11-04: day 14
    const day14 = await miss(c, 5);
    expect(day14.streak.current).toBe(14);
    expect(day14.creditBonuses).toEqual([{ kind: 'bonus_streak', credits: STREAK, label: 'Streak milestone bonus' }]);
    const rows = await bonusRows(id, 'bonus_streak');
    expect(rows.map((r) => [r.istDay, r.amount, (r.metadata as { streakDays: number }).streakDays]).sort()).toEqual([
      ['2026-11-02', STREAK, 7],
      ['2026-11-04', STREAK, 14],
    ]);
    const guide = (await c.get('/v1/me/credits/guide')).json();
    expect(guide.bonuses.streakMilestone).toEqual({ credits: STREAK, everyDays: 7, currentStreak: 14, nextMilestone: 21, earnedToday: true });
    const ledger = (await c.get('/v1/credits/ledger?limit=3')).json();
    expect(ledger.entries.find((e: { kind: string }) => e.kind === 'bonus_streak')).toMatchObject({ amount: STREAK, label: 'Streak milestone bonus', day: '2026-11-04' });
  });
});

describe('the global spend breaker still applies to bonus credits', () => {
  it('pauses AI even with bonus credits in hand; the credits stay', async () => {
    const { c } = await h.member();
    for (let i = 1; i <= TARGET; i++) await solve(c, i);
    expect(await credits(c)).toMatchObject({ balance: FREE + GOAL });
    h.services.ai.breaker.setCapPaise(1_000);
    try {
      await h.services.ai.breaker.record(1_000, false); // global budget spent
      const paused = await c.post('/v1/ai/quick-doubt', { message: 'What is inertia?' });
      expect(paused.statusCode).toBe(503);
      expect(paused.json().code).toBe('ai_paused');
      expect((await c.get('/v1/ai/quote/quick-doubt')).json().status).toBe('paused');
      expect(await credits(c)).toMatchObject({ balance: FREE + GOAL });
    } finally {
      await h.t.db.execute(sql`DELETE FROM ai_spend_daily`);
      h.services.ai.breaker.setCapPaise(h.services.ai.config.dailySpendCapPaise);
    }
  });
});

describe('GET /v1/me/credits/guide and /history', () => {
  it('lists every action with its price, the plans that offer it and how many are left today', async () => {
    const { c } = await h.member();
    const res = await c.get('/v1/me/credits/guide');
    expect(res.statusCode).toBe(200);
    expect(res.headers['cache-control']).toBe('no-store');
    const g = res.json();
    expect(g).toMatchObject({ plan: 'free', planName: 'Free', dailyCredits: FREE, balance: FREE, bonusToday: 0, creditValuePaise: 10, day: IST_DAY, plansUrl: 'https://www.soylai.test/plans' });
    expect(g.plans).toEqual([
      { id: 'free', name: 'Free', creditsPerDay: 50 },
      { id: 'plus', name: 'Plus', creditsPerDay: 100 },
      { id: 'pro', name: 'Pro', creditsPerDay: 150 },
      { id: 'board_exam_pass', name: 'Board Exam Pass', creditsPerDay: 150 },
    ]);
    const by = Object.fromEntries(g.actions.map((a: { action: string }) => [a.action, a]));
    expect(Object.keys(by)).toEqual(['quick-doubt', 'explain-slide', 'hard-doubt', 'photo-doubt', 'evaluate-answer', 'evaluate-paper', 'paper-from-upload']);
    // "≈ 7 hard doubts left today" on the free 50.
    expect(by['hard-doubt']).toMatchObject({ credits: 7, perAnswer: false, maxCredits: 7, allowedForPlan: true, remainingToday: 7, mode: 'stream', requiresUpload: false });
    expect(by['hard-doubt'].perDay).toEqual([
      { plan: 'free', count: 7 },
      { plan: 'plus', count: 14 },
      { plan: 'pro', count: 21 },
      { plan: 'board_exam_pass', count: 21 },
    ]);
    expect(by['quick-doubt']).toMatchObject({ credits: 1, remainingToday: 50 });
    expect(by['photo-doubt']).toMatchObject({ credits: 12, remainingToday: 4, requiresUpload: true });
    expect(by['evaluate-paper']).toMatchObject({ credits: 7, perAnswer: true, maxCredits: 50, remainingToday: 7, mode: 'job' });
    expect(by['paper-from-upload']).toMatchObject({ credits: 80, allowedForPlan: false, remainingToday: 0, perDay: [{ plan: 'pro', count: 1 }, { plan: 'board_exam_pass', count: 1 }] });
    expect(by['quick-doubt'].guide).toMatch(/question/);
    expect(g.bonuses).toEqual({
      dailyGoal: { credits: 10, target: 10, solvedToday: 0, earnedToday: false },
      streakMilestone: { credits: 5, everyDays: 7, currentStreak: 0, nextMilestone: 7, earnedToday: false },
    });
    // Plus: still no paper-from-upload although 100 credits would pay for it (D-034 by feature).
    const plus = await h.member();
    h.plans.set(plus.id, 'plus');
    const pg = (await plus.c.get('/v1/me/credits/guide')).json();
    expect(pg.actions.find((a: { action: string }) => a.action === 'paper-from-upload')).toMatchObject({ allowedForPlan: false, remainingToday: 0 });
    expect(pg.actions.find((a: { action: string }) => a.action === 'hard-doubt')).toMatchObject({ remainingToday: 14 });
    expect((await h.client().get('/v1/me/credits/guide')).statusCode).toBe(401);
  });

  it('history: every IST day of the window, granted / bonus / spent / refunded / held / left', async () => {
    const { c, id } = await h.member();
    h.clock.set(DAY - 2 * 86_400_000);
    await c.get('/v1/credits'); // a grant two days ago
    h.clock.set(DAY);
    const spent = randomUUID();
    await h.services.ai.credits.reserve({ userId: id, requestId: spent, action: 'photo-doubt', credits: 12, plan: 'free' });
    await h.services.ai.credits.charge(id, spent);
    const failed = randomUUID();
    await h.services.ai.credits.reserve({ userId: id, requestId: failed, action: 'hard-doubt', credits: 7, plan: 'free' });
    await h.services.ai.credits.refund(id, failed, 'provider_error');
    const partial = randomUUID();
    await h.services.ai.credits.reserve({ userId: id, requestId: partial, action: 'evaluate-paper', credits: 21, plan: 'free' });
    await h.services.ai.credits.charge(id, partial, { usedCredits: 14 });
    await h.services.ai.credits.reserve({ userId: id, requestId: randomUUID(), action: 'quick-doubt', credits: 1, plan: 'free' }); // still open

    const res = await c.get('/v1/me/credits/history');
    expect(res.statusCode).toBe(200);
    const hist = res.json();
    expect(hist).toMatchObject({ timezone: 'Asia/Kolkata', from: '2026-10-20', to: IST_DAY });
    expect(hist.days).toHaveLength(14);
    expect(hist.days[11]).toEqual({ day: '2026-10-31', granted: FREE, bonus: 0, spent: 0, refunded: 0, held: 0, left: FREE });
    expect(hist.days[12]).toEqual({ day: '2026-11-01', granted: 0, bonus: 0, spent: 0, refunded: 0, held: 0, left: 0 });
    expect(hist.days[13]).toEqual({ day: IST_DAY, granted: FREE, bonus: 0, spent: 12 + 14, refunded: 7, held: 1, left: FREE - 12 - 14 - 1 });
    expect((await c.get('/v1/credits')).json()).toMatchObject({ balance: FREE - 12 - 14 - 1, spentToday: 26, reservedNow: 1 });
    expect((await c.get('/v1/me/credits/history?days=31')).json().days).toHaveLength(31);
    expect((await c.get('/v1/me/credits/history?days=32')).statusCode).toBe(400);
    expect((await c.get('/v1/me/credits/history?days=0')).statusCode).toBe(400);
    expect((await h.client().get('/v1/me/credits/history')).statusCode).toBe(401);
  });

  it('every reserve is resolved and no balance is negative after all of the above (ledger invariants)', async () => {
    const later = new Date(h.clock.now() + 16 * 60_000);
    await h.services.ai.credits.sweepExpired(later);
    expect(await ledgerInvariants(h.t.db, later)).toEqual({ negativeBalances: [], unresolvedExpired: 0, doubleResolved: 0 });
  });
});

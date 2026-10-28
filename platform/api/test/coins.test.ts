/**
 * SOYL Coins (D-037, ADR-020) on real content: check-in (idempotent, concurrent, IST day boundaries,
 * streak bonuses), daily challenge, solved milestones (guest-merged answers never count), chapter
 * mastery, test awards (series once, custom never), the daily cap, the store (digital redeem, limits,
 * equip), no double spend under concurrency (API and database guard), physical gating in the fixed order
 * (verification → consent → flag; production's `unavailable` consent refuses), the merch flow with staff
 * MFA, live-rank awards (consent-gated), history, and the account-deletion cascade.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq, sql } from 'drizzle-orm';
import { auditLog, chapters, coinLedger, coinRedemptions, coinWallets, istDay, liveEvents, liveRegistrations, practiceAnswers, questions, tests, users } from '@soyl/db';
import { CHAPTER_MASTERY, COIN_DAILY_CAP, COIN_EARN, STORE_ITEMS, type StoreItem } from '@soyl/shared/config/coins';
import { base32Decode, stepAt, totpAt } from '../src/auth/mfa';
import { ConsentService } from '../src/consent/service';
import { UnavailableConsentProvider } from '../src/consent/unavailable';
import { awardCoins } from '../src/domain/coins/ledger';
import { awardLiveRanks, onLeagueClosed } from '../src/domain/coins/awards';
import { decryptAddress, addressKey, redeem as redeemDomain, coinsHousekeeping, type StoreDeps } from '../src/domain/coins/store';
import { createHarness, type Client, type Harness } from './helpers';
import { seedRealContent } from './content-fixture';
import { itemKeys, responseFor } from './tests-fixture';

let h: Harness;
let hp: Harness; // physical redemption switched on
const SCI = 'cbse-10-science-ch01';
const MATH = 'cbse-10-mathematics-ch01';
const SHORT = 't_cbse10math_ch01_short';
let n = 0;
const email = () => `coins.${Date.now().toString(36)}${++n}@example.com`;
const ADDRESS = { recipientName: 'Asha Parent', line1: '12 MG Road', line2: null, city: 'Bengaluru', state: 'Karnataka', pincode: '560001', phone: '+919876543210' };

async function member(harness = h): Promise<{ c: Client; id: string }> {
  const c = harness.client();
  const r = await c.signInEmail(email());
  return { c, id: r.user.id };
}

/** Staff adjustment: how tests give a student coins (kind adjust, source admin). */
async function grant(harness: Harness, userId: string, amount: number) {
  await harness.t.db.transaction(async (tx) => {
    await tx.insert(coinWallets).values({ userId }).onConflictDoNothing();
    await tx.insert(coinLedger).values({ userId, kind: 'adjust', source: 'admin', amount, idempotencyKey: `test-grant:${userId}:${Math.random()}`, istDay: istDay(new Date(harness.clock.now())) });
  });
}

async function balance(harness: Harness, userId: string) {
  const [r] = await harness.t.db.select({ b: sql<number>`coalesce(sum(${coinLedger.amount}),0)::int` }).from(coinLedger).where(eq(coinLedger.userId, userId));
  return Number(r!.b);
}

/** A correct response for a stored practice question (from its key row). */
async function correctPracticeResponse(questionKey: string) {
  const res = await h.t.db.execute<{ answer: Record<string, unknown> }>(sql`SELECT k.answer FROM question_keys k JOIN questions q ON q.id = k.question_id WHERE q.key = ${questionKey} AND q.is_current ORDER BY q.version DESC LIMIT 1`);
  const a = res.rows[0]!.answer;
  if ('option_ids' in a) return { option_ids: a.option_ids };
  if ('value' in a) return { value: a.value };
  if ('blanks' in a) return { blanks: (a.blanks as { accepted: string[] }[]).map((b) => b.accepted[0]) };
  if ('pairs' in a) return { pairs: a.pairs };
  if ('order' in a) return { order: a.order };
  if ('output' in a) return { output: a.output };
  throw new Error('not objective');
}

/** Objective practice questions of a chapter that are not today's challenge. */
async function objectiveKeys(chapterKey: string): Promise<string[]> {
  const res = await h.t.db.execute<{ key: string }>(sql`
    SELECT DISTINCT q.key FROM questions q JOIN chapters c ON c.id = q.chapter_id
    WHERE c.key = ${chapterKey} AND q.pool = 'practice' AND q.is_current AND q.status IN ('published', 'reviewed')
      AND q.type IN ('mcq', 'true-false', 'assertion-reason', 'numerical', 'multi-select') ORDER BY q.key`);
  return res.rows.map((r) => r.key);
}

async function fakeAnswers(userId: string, chapterKey: string, count: number, source: 'app' | 'guest_merge', correctEvery = 1) {
  const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, chapterKey));
  const qs = await h.t.db.select({ id: questions.id, key: questions.key, version: questions.version }).from(questions).where(and(eq(questions.chapterId, ch!.id), eq(questions.isCurrent, true))).limit(count);
  if (qs.length < count) throw new Error(`only ${qs.length} questions in ${chapterKey}`);
  const at = new Date(h.clock.now() - 86_400_000);
  await h.t.db.insert(practiceAnswers).values(
    qs.map((q, i) => ({
      userId,
      questionId: q.id,
      questionKey: q.key,
      questionVersion: q.version,
      chapterId: ch!.id,
      response: {},
      correct: i % correctEvery === 0,
      marksAwarded: 1,
      maxMarks: 1,
      grading: 'auto',
      answeredAt: at,
      source,
    })),
  );
  return qs.map((q) => q.key);
}

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'required' });
  await seedRealContent(h.t, (u) => [SCI, MATH, 'cbse-10-science-ch02'].includes(u));
  hp = await createHarness({ t: h.t, consentDefault: 'required', env: { COINS_PHYSICAL_REDEMPTION_ENABLED: 'true' } });
});
afterAll(async () => {
  await hp?.close();
  await h?.close();
});

describe('check-in', () => {
  it('pays once per IST day, is idempotent under concurrency, and keeps a streak across IST midnight', async () => {
    const { c, id } = await member();
    // 23:59:59 IST on 28 Oct 2026 = 18:29:59 UTC.
    h.clock.set(Date.UTC(2026, 9, 28, 18, 29, 59));
    const results = await Promise.all([0, 1, 2, 3, 4].map(() => c.post('/v1/coins/check-in', {})));
    expect(results.every((r) => r.statusCode === 200)).toBe(true);
    const paid = results.map((r) => r.json()).filter((r) => !r.alreadyCheckedIn);
    expect(paid).toHaveLength(1);
    expect(paid[0]).toMatchObject({ day: '2026-10-28', streak: 1, coinsAwarded: COIN_EARN.dailyCheckIn, balance: COIN_EARN.dailyCheckIn });
    expect((await h.t.db.select().from(coinLedger).where(and(eq(coinLedger.userId, id), eq(coinLedger.source, 'checkin')))).length).toBe(1);

    // One second later it is 29 Oct in IST: a new day, streak 2.
    h.clock.set(Date.UTC(2026, 9, 28, 18, 30, 0));
    const next = (await c.post('/v1/coins/check-in', {})).json();
    expect(next).toMatchObject({ day: '2026-10-29', alreadyCheckedIn: false, streak: 2 });
    const summary = (await c.get('/v1/coins')).json();
    expect(summary).toMatchObject({ balance: 2 * COIN_EARN.dailyCheckIn, checkIn: { checkedInToday: true, current: 2 }, today: { day: '2026-10-29', cap: COIN_DAILY_CAP } });
    expect(summary.today.resetsAt).toBe('2026-10-29T18:30:00.000Z');
    expect(summary.checkIn.nextBonus).toMatchObject({ everyDays: 7, inDays: 5 });

    // A missed day restarts the streak (no freezes for check-ins).
    h.clock.set(Date.UTC(2026, 9, 30, 18, 30, 0)); // 31 Oct IST
    expect((await c.get('/v1/coins')).json().checkIn).toMatchObject({ checkedInToday: false, current: 0, longest: 2 });
    expect((await c.post('/v1/coins/check-in', {})).json()).toMatchObject({ day: '2026-10-31', streak: 1 });
    h.clock.set(Date.now());
  });

  it('pays the 7-day streak bonus on the 7th consecutive day, uncapped', async () => {
    const { c, id } = await member();
    const start = Date.UTC(2026, 10, 2, 6, 0, 0);
    let last: { streak: number; awards: { source: string; amount: number }[] } | null = null;
    for (let d = 0; d < 7; d++) {
      h.clock.set(start + d * 86_400_000);
      last = (await c.post('/v1/coins/check-in', {})).json();
    }
    expect(last!.streak).toBe(7);
    expect(last!.awards).toEqual(expect.arrayContaining([{ source: 'checkin_streak', amount: 5, cappedOut: false }]));
    expect(await balance(h, id)).toBe(7 * COIN_EARN.dailyCheckIn + 5);
    const [bonus] = await h.t.db.select().from(coinLedger).where(and(eq(coinLedger.userId, id), eq(coinLedger.source, 'checkin_streak')));
    expect(bonus).toMatchObject({ capped: false, idempotencyKey: `checkin_streak:${id}:2026-11-08:7` });
    h.clock.set(Date.now());
  });

  it('guests cannot check in', async () => {
    expect((await h.client().post('/v1/coins/check-in', {})).json().code).toBe('unauthenticated');
    expect((await h.client().get('/v1/coins')).json().code).toBe('unauthenticated');
  });
});

describe('daily challenge', () => {
  it('is deterministic per subject and day, practice-pool only; solving it pays once a day', async () => {
    const guest = (await h.client().get('/v1/coins/daily-challenge?board=cbse&class=10')).json();
    expect(guest).toMatchObject({ status: 'ok', board: 'cbse', classLevel: 10, coins: COIN_EARN.dailyChallenge, earnedToday: null });
    expect(guest.challenges.length).toBeGreaterThanOrEqual(2);
    const again = (await h.client().get('/v1/coins/daily-challenge?board=cbse&class=10')).json();
    expect(again.challenges.map((x: { question: { id: string } }) => x.question.id)).toEqual(guest.challenges.map((x: { question: { id: string } }) => x.question.id));
    for (const ch of guest.challenges) {
      const [q] = await h.t.db.select({ pool: questions.pool, type: questions.type }).from(questions).where(eq(questions.key, ch.question.id)).limit(1);
      expect(q!.pool).toBe('practice');
      expect(JSON.stringify(ch.question)).not.toMatch(/"answer"|solution_md|marking_scheme/);
    }
    expect((await h.client().get('/v1/coins/daily-challenge')).json()).toMatchObject({ status: 'class_required', challenges: [] });

    const { c, id } = await member();
    const [first, second] = guest.challenges as { subjectId: string; question: { id: string; version: number } }[];
    const wrong = await c.post('/v1/practice/answers', { questionId: first!.question.id, response: { option_ids: ['zz'] } });
    expect([200, 400]).toContain(wrong.statusCode);
    const right = (await c.post('/v1/practice/answers', { questionId: first!.question.id, response: await correctPracticeResponse(first!.question.id) })).json();
    expect(right.correct).toBe(true);
    expect(right.coinAwards).toEqual(expect.arrayContaining([{ source: 'daily_challenge', amount: COIN_EARN.dailyChallenge, cappedOut: false }]));
    // Again: nothing more. Another subject's challenge the same day: over dailyChallengeAwardsPerDay (1).
    expect((await c.post('/v1/practice/answers', { questionId: first!.question.id, response: await correctPracticeResponse(first!.question.id) })).json().coinsAwarded).toBe(0);
    const other = (await c.post('/v1/practice/answers', { questionId: second!.question.id, response: await correctPracticeResponse(second!.question.id) })).json();
    expect(other.coinAwards.filter((a: { source: string }) => a.source === 'daily_challenge')).toEqual([]);
    const mine = (await c.get('/v1/coins/daily-challenge?board=cbse&class=10')).json();
    expect(mine.earnedToday).toBe(1);
    expect(mine.challenges.find((x: { subjectId: string }) => x.subjectId === first!.subjectId).solved).toBe(true);
    expect((await h.t.db.select().from(coinLedger).where(and(eq(coinLedger.userId, id), eq(coinLedger.source, 'daily_challenge')))).length).toBe(1);
  });
});

describe('practice milestones and chapter mastery', () => {
  it('the 50-solved milestone counts distinct first-correct app answers; guest-merged answers never count', async () => {
    const { c, id } = await member();
    await fakeAnswers(id, SCI, 49, 'guest_merge');
    const keys = await objectiveKeys(MATH);
    const k = keys[0]!;
    let r = (await c.post('/v1/practice/answers', { questionId: k, response: await correctPracticeResponse(k) })).json();
    expect(r.coinAwards.filter((a: { source: string }) => a.source === 'solved_milestone')).toEqual([]);

    const other = await member();
    await fakeAnswers(other.id, SCI, 49, 'app');
    r = (await other.c.post('/v1/practice/answers', { questionId: k, response: await correctPracticeResponse(k) })).json();
    expect(r.coinAwards).toEqual(expect.arrayContaining([{ source: 'solved_milestone', amount: 20, cappedOut: false }]));
    // The same question right again is not a new solve; the milestone is never paid twice.
    r = (await other.c.post('/v1/practice/answers', { questionId: k, response: await correctPracticeResponse(k) })).json();
    expect(r.coinsAwarded).toBe(0);
    const s = (await other.c.get('/v1/coins')).json();
    expect(s.solved).toMatchObject({ count: 50, next: { solved: 200, coins: 60, reached: false } });
    expect(s.solved.milestones[0]).toMatchObject({ solved: 50, reached: true });
  });

  it('chapter mastery on first-try accuracy, once per chapter', async () => {
    const { c, id } = await member();
    const keys = await objectiveKeys(MATH);
    expect(keys.length).toBeGreaterThan(CHAPTER_MASTERY.minDistinct);
    // 19 earlier first tries in maths ch01, all right, then the 20th right through the API.
    const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, MATH));
    const qs = await h.t.db.select({ id: questions.id, key: questions.key, version: questions.version }).from(questions).where(and(eq(questions.chapterId, ch!.id), eq(questions.isCurrent, true), sql`${questions.key} IN (${sql.join(keys.slice(1, CHAPTER_MASTERY.minDistinct).map((x) => sql`${x}`), sql`, `)})`));
    await h.t.db.insert(practiceAnswers).values(qs.map((q) => ({ userId: id, questionId: q.id, questionKey: q.key, questionVersion: q.version, chapterId: ch!.id, response: {}, correct: true, marksAwarded: 1, maxMarks: 1, grading: 'auto', answeredAt: new Date(h.clock.now() - 3600_000), source: 'app' })));
    const k = keys[0]!;
    const r = (await c.post('/v1/practice/answers', { questionId: k, response: await correctPracticeResponse(k) })).json();
    expect(r.coinAwards).toEqual(expect.arrayContaining([{ source: 'chapter_mastered', amount: COIN_EARN.chapterMastered, cappedOut: false }]));
    const k2 = keys[CHAPTER_MASTERY.minDistinct]!;
    expect((await c.post('/v1/practice/answers', { questionId: k2, response: await correctPracticeResponse(k2) })).json().coinAwards.filter((a: { source: string }) => a.source === 'chapter_mastered')).toEqual([]);
    expect((await c.get('/v1/coins')).json().chaptersMastered).toBe(1);
  });

  it('re-answering a missed question correctly cannot lift first-try accuracy to mastery', async () => {
    const { c, id } = await member();
    const keys = await objectiveKeys(MATH);
    // 20 first tries, half wrong: 50% first-try accuracy.
    const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, MATH));
    const qs = await h.t.db.select({ id: questions.id, key: questions.key, version: questions.version }).from(questions).where(and(eq(questions.chapterId, ch!.id), eq(questions.isCurrent, true), sql`${questions.key} IN (${sql.join(keys.slice(0, 20).map((x) => sql`${x}`), sql`, `)})`));
    await h.t.db.insert(practiceAnswers).values(qs.map((q, i) => ({ userId: id, questionId: q.id, questionKey: q.key, questionVersion: q.version, chapterId: ch!.id, response: {}, correct: i % 2 === 0, marksAwarded: 1, maxMarks: 1, grading: 'auto', answeredAt: new Date(h.clock.now() - 3600_000), source: 'app' })));
    for (const q of qs.filter((_, i) => i % 2 === 1).slice(0, 6)) {
      const r = (await c.post('/v1/practice/answers', { questionId: q.key, response: await correctPracticeResponse(q.key) })).json();
      expect(r.coinAwards.filter((a: { source: string }) => a.source === 'chapter_mastered')).toEqual([]);
    }
  });
});

describe('tests', () => {
  it('a series test pays once (retakes nothing); a perfect paper pays its bonus; custom tests pay nothing', async () => {
    const { c, id } = await member();
    const submitPerfect = async () => {
      const s = (await c.post(`/v1/tests/${SHORT}/attempts`)).json();
      const ks = await itemKeys(h.t, SHORT);
      await c.request('PUT', `/v1/attempts/${s.attempt.id}/responses`, { body: { items: ks.map((k) => ({ itemId: k.itemId, seq: 1, response: responseFor(k, true) })) } });
      return (await c.post(`/v1/attempts/${s.attempt.id}/submit`)).json();
    };
    const first = await submitPerfect();
    expect(first.coinAwards.map((a: { source: string }) => a.source)).toContain('test_submitted');
    const again = await submitPerfect();
    expect(again.coinsAwarded).toBe(0);
    expect((await h.t.db.select().from(coinLedger).where(and(eq(coinLedger.userId, id), eq(coinLedger.source, 'test_submitted')))).length).toBe(1);

    const built = await c.post('/v1/tests/custom', { subjectId: 'cbse-10-mathematics', chapterIds: [MATH], questionCount: 10, types: ['mcq'] });
    if (built.statusCode === 201 || built.statusCode === 200) {
      const t = built.json();
      const s = (await c.post(`/v1/tests/${t.id}/attempts`)).json();
      const ks = await itemKeys(h.t, t.id);
      await c.request('PUT', `/v1/attempts/${s.attempt.id}/responses`, { body: { items: ks.map((k) => ({ itemId: k.itemId, seq: 1, response: responseFor(k, true) })) } });
      expect((await c.post(`/v1/attempts/${s.attempt.id}/submit`)).json().coinsAwarded).toBe(0);
    }
  });

  it('an empty paper pays nothing', async () => {
    const { c } = await member();
    const s = (await c.post(`/v1/tests/${SHORT}/attempts`)).json();
    expect((await c.post(`/v1/attempts/${s.attempt.id}/submit`)).json().coinsAwarded).toBe(0);
  });
});

describe('daily cap', () => {
  it('cuts capped awards to what is left of the IST day, records 0 so nothing is paid later, and resets at midnight IST', async () => {
    const { id } = await member();
    const now = new Date(Date.UTC(2026, 10, 20, 10, 0, 0));
    const run = (awards: Parameters<typeof awardCoins>[3], at = now) => h.t.db.transaction((tx) => awardCoins(tx, id, at, awards));
    const a = await run([{ source: 'test_submitted', amount: COIN_DAILY_CAP - 2, key: `cap-a:${id}` }]);
    expect(a[0]).toMatchObject({ amount: COIN_DAILY_CAP - 2, cappedOut: false });
    const b = await run([{ source: 'daily_challenge', amount: 5, key: `cap-b:${id}` }]);
    expect(b[0]).toMatchObject({ amount: 2, requested: 5, cappedOut: true });
    const c = await run([{ source: 'perfect_paper', amount: 10, key: `cap-c:${id}` }]);
    expect(c[0]).toMatchObject({ amount: 0, cappedOut: true });
    // Uncapped sources are paid in full; a capped-out key is never paid again, even on a new day.
    expect((await run([{ source: 'solved_milestone', amount: 20, key: `cap-d:${id}` }]))[0]).toMatchObject({ amount: 20, cappedOut: false });
    const tomorrow = new Date(Date.UTC(2026, 10, 20, 18, 30, 0));
    expect(await run([{ source: 'perfect_paper', amount: 10, key: `cap-c:${id}` }], tomorrow)).toEqual([]);
    expect((await run([{ source: 'perfect_paper', amount: 10, key: `cap-e:${id}` }], tomorrow))[0]).toMatchObject({ amount: 10, cappedOut: false });
    const [row] = await h.t.db.select().from(coinLedger).where(eq(coinLedger.idempotencyKey, `cap-c:${id}`));
    expect(row).toMatchObject({ amount: 0, capped: true, metadata: { requested: 10, cappedOut: true } });
  });
});

describe('store: digital items', () => {
  it('guests see the store; physical items show coming soon while redemption is off', async () => {
    const res = (await h.client().get('/v1/coins/store')).json();
    expect(res).toMatchObject({ balance: null, physicalRedemptionEnabled: false });
    for (const i of res.items) expect(i.state).toBe(i.type === 'physical' ? 'coming_soon' : 'sign_in');
  });

  it('redeems a digital item at once, equips it, refuses a second one and unaffordable items', async () => {
    const { c, id } = await member();
    const frame = STORE_ITEMS.find((i) => i.key === 'frame-saffron')!;
    expect((await c.post('/v1/coins/redeem', { itemKey: frame.key })).json()).toMatchObject({ code: 'coins_insufficient', balance: 0, price: frame.priceCoins });
    await grant(h, id, frame.priceCoins + 10);
    const r = await c.post('/v1/coins/redeem', { itemKey: frame.key });
    expect(r.statusCode).toBe(200);
    expect(r.json()).toMatchObject({ balance: 10, redemption: { itemKey: frame.key, itemType: 'digital', status: 'fulfilled', priceCoins: frame.priceCoins } });
    expect((await c.get('/v1/coins')).json().equipped).toEqual({ frame: frame.key, theme: null });
    expect((await c.post('/v1/coins/redeem', { itemKey: frame.key })).json().code).toBe('redemption_limit');
    expect((await c.post('/v1/coins/redeem', { itemKey: 'no-such-item' })).statusCode).toBe(404);
    expect((await c.post('/v1/coins/redeem', { itemKey: 'frame-constellation' })).json().code).toBe('not_eligible');
    const store = (await c.get('/v1/coins/store')).json();
    expect(store.items.find((i: { key: string }) => i.key === frame.key).state).toBe('owned');
    expect(store.items.find((i: { key: string }) => i.key === 'frame-constellation').state).toBe('locked');
    expect(store.items.find((i: { key: string }) => i.key === 'theme-midnight').state).toBe('insufficient_coins');
    // Equip: own items only.
    expect((await c.request('PUT', '/v1/coins/equipped', { body: { theme: 'theme-midnight' } })).statusCode).toBe(400);
    expect((await c.request('PUT', '/v1/coins/equipped', { body: { frame: null } })).json()).toEqual({ frame: null, theme: null });
    const hist = (await c.get('/v1/coins/history?limit=1')).json();
    expect(hist.entries[0]).toMatchObject({ kind: 'redeem', source: 'redemption', amount: -frame.priceCoins, balanceAfter: 10, detail: { itemKey: frame.key } });
    expect(hist.nextCursor).toBeTruthy();
    const page2 = (await c.get(`/v1/coins/history?limit=5&cursor=${hist.nextCursor}`)).json();
    expect(page2.entries[0]).toMatchObject({ kind: 'adjust', amount: frame.priceCoins + 10 });
  });

  it('no double spend: concurrent redemptions of two affordable-alone items succeed once', async () => {
    const { id } = await member();
    await grant(h, id, 100);
    const items: StoreItem[] = [
      { ...STORE_ITEMS[0]!, key: 'race-a', priceCoins: 60 },
      { ...STORE_ITEMS[0]!, key: 'race-b', priceCoins: 60, slot: 'theme' },
    ];
    const deps: StoreDeps = { db: h.t.db, consent: h.services.consent, physicalEnabled: false, masterKey: h.config.mfaEncryptionKey, items };
    const viewer = { id, emailVerified: true, phoneNumberVerified: false };
    const results = await Promise.allSettled([redeemDomain(deps, new Date(), viewer, 'race-a'), redeemDomain(deps, new Date(), viewer, 'race-b')]);
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1);
    expect((results.find((r) => r.status === 'rejected') as PromiseRejectedResult).reason).toMatchObject({ code: 'coins_insufficient' });
    expect(await balance(h, id)).toBe(40);
  });

  it('no double spend: the same item redeemed from five tabs at once is granted once', async () => {
    const { c, id } = await member();
    await grant(h, id, 1000);
    const res = await Promise.all([0, 1, 2, 3, 4].map(() => c.post('/v1/coins/redeem', { itemKey: 'theme-midnight' })));
    expect(res.filter((r) => r.statusCode === 200)).toHaveLength(1);
    expect(res.filter((r) => r.statusCode === 409).every((r) => r.json().code === 'redemption_limit')).toBe(true);
    expect(await balance(h, id)).toBe(900);
  });

  it('the database refuses a negative balance and duplicate keys whatever the app does', async () => {
    const { id } = await member();
    await grant(h, id, 5);
    const [r] = await h.t.db.insert(coinRedemptions).values({ userId: id, itemKey: 'frame-saffron', itemType: 'digital', priceCoins: 60, status: 'fulfilled' }).returning();
    await expect(
      h.t.db.insert(coinLedger).values({ userId: id, kind: 'redeem', source: 'redemption', amount: -60, idempotencyKey: `redeem:${r!.id}`, istDay: '2026-10-28', redemptionId: r!.id }),
    ).rejects.toMatchObject({ cause: { code: '23514' } });
    await expect(h.t.db.insert(coinLedger).values({ userId: id, kind: 'earn', source: 'checkin', amount: 1, idempotencyKey: `dup:${id}`, istDay: '2026-10-28' })).resolves.toBeDefined();
    await expect(h.t.db.insert(coinLedger).values({ userId: id, kind: 'earn', source: 'checkin', amount: 1, idempotencyKey: `dup:${id}`, istDay: '2026-10-28' })).rejects.toMatchObject({ cause: { code: '23505' } });
    // A refund must match a redeem exactly.
    await expect(h.t.db.insert(coinLedger).values({ userId: id, kind: 'refund', source: 'redemption', amount: 60, idempotencyKey: `refund:${r!.id}`, istDay: '2026-10-28', redemptionId: r!.id })).rejects.toMatchObject({ cause: { code: '23514' } });
    expect(await balance(h, id)).toBe(6);
  });
});

describe('store: physical merch', () => {
  it('gates in order: verification, then consent, then the redemption flag', async () => {
    const { c, id } = await member();
    await grant(h, id, 1000);
    await h.t.db.update(users).set({ emailVerified: false }).where(eq(users.id, id));
    expect((await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json().code).toBe('verification_required');
    await h.t.db.update(users).set({ emailVerified: true }).where(eq(users.id, id));
    expect((await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json().code).toBe('consent_required');
    h.consent.setStatus(id, 'granted');
    await h.services.consent.refresh(id);
    expect((await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json().code).toBe('redemption_disabled');
    expect(await balance(h, id)).toBe(1000);
    const store = (await c.get('/v1/coins/store')).json();
    expect(store.items.find((i: { key: string }) => i.key === 'sticker-pack').state).toBe('coming_soon');
  });

  it('production consent (`unavailable`) refuses physical redemption even with the flag on', async () => {
    const { id } = await member(hp);
    await grant(hp, id, 1000);
    const consent = new ConsentService(hp.t.db, new UnavailableConsentProvider(), hp.clock);
    const deps: StoreDeps = { db: hp.t.db, consent, physicalEnabled: true, masterKey: hp.config.mfaEncryptionKey };
    await expect(redeemDomain(deps, new Date(), { id, emailVerified: true, phoneNumberVerified: false }, 'sticker-pack')).rejects.toMatchObject({ code: 'consent_required' });
  });

  it('flag on + consent: request → address (encrypted) → staff approve → fulfil; consent needed state; audit', async () => {
    const { c, id } = await member(hp);
    await grant(hp, id, 2000);
    expect((await c.get('/v1/coins/store')).json().items.find((i: { key: string }) => i.key === 'sticker-pack').state).toBe('consent_needed');
    // No address can be sent before consent.
    const fakeId = '0190a1b2-0000-7000-8000-000000000000';
    expect((await c.request('PUT', `/v1/coins/redemptions/${fakeId}/address`, { body: ADDRESS })).json().code).toBe('consent_required');
    hp.consent.setStatus(id, 'granted');
    await hp.services.consent.refresh(id);
    expect((await c.get('/v1/coins/store')).json().items.find((i: { key: string }) => i.key === 'sticker-pack').state).toBe('available');
    const r = (await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json();
    expect(r).toMatchObject({ balance: 1400, redemption: { status: 'requested', addressOnFile: false } });
    expect((await c.request('PUT', `/v1/coins/redemptions/${r.redemption.id}/address`, { body: { ...ADDRESS, pincode: '012345' } })).statusCode).toBe(400);
    expect((await c.request('PUT', `/v1/coins/redemptions/${r.redemption.id}/address`, { body: { ...ADDRESS, line1: '<script>' } })).statusCode).toBe(400);
    const a = await c.request('PUT', `/v1/coins/redemptions/${r.redemption.id}/address`, { body: ADDRESS });
    expect(a.json()).toMatchObject({ status: 'parent_approval_pending', addressOnFile: true });
    const [row] = await hp.t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, r.redemption.id));
    expect(row!.addressEnc).toMatch(/^a1:/);
    expect(row!.addressEnc).not.toContain('MG Road');
    expect(decryptAddress(addressKey(hp.config.mfaEncryptionKey), row!.id, row!.addressEnc!)).toEqual(ADDRESS);
    expect(() => decryptAddress(addressKey(hp.config.mfaEncryptionKey), fakeId, row!.addressEnc!)).toThrow();
    // Someone else cannot touch it.
    const other = await member(hp);
    expect((await other.c.post(`/v1/coins/redemptions/${r.redemption.id}/cancel`, {})).statusCode).toBe(404);

    // Staff: student forbidden; staff without MFA refused; with MFA the queue shows the address (audited).
    expect((await c.get('/v1/admin/coins/redemptions')).json().code).toBe('forbidden');
    const staff = await mfaStaff(hp);
    const q = (await staff.get('/v1/admin/coins/redemptions?status=parent_approval_pending')).json();
    const mine = q.redemptions.find((x: { id: string }) => x.id === r.redemption.id);
    expect(mine).toMatchObject({ student: id, address: ADDRESS });
    const audits = await hp.t.db.select().from(auditLog).where(eq(auditLog.action, 'coins.redemptions.addresses_viewed'));
    expect(audits.length).toBeGreaterThan(0);
    expect(JSON.stringify(audits)).not.toContain('MG Road');
    // Consent revoked before approval: approval refused.
    hp.consent.setStatus(id, 'revoked');
    await hp.services.consent.refresh(id);
    expect((await staff.post(`/v1/admin/coins/redemptions/${r.redemption.id}/approve`, {})).json().code).toBe('consent_required');
    hp.consent.setStatus(id, 'granted');
    await hp.services.consent.refresh(id);
    expect((await staff.post(`/v1/admin/coins/redemptions/${r.redemption.id}/fulfil`, { trackingRef: 'DTDC123' })).json().code).toBe('conflict');
    expect((await staff.post(`/v1/admin/coins/redemptions/${r.redemption.id}/approve`, {})).json()).toMatchObject({ status: 'approved' });
    expect((await c.post(`/v1/coins/redemptions/${r.redemption.id}/cancel`, {})).json().code).toBe('conflict');
    expect((await staff.post(`/v1/admin/coins/redemptions/${r.redemption.id}/fulfil`, { trackingRef: 'DTDC123' })).json()).toMatchObject({ status: 'fulfilled', trackingRef: 'DTDC123' });
    expect((await hp.t.db.select().from(auditLog).where(eq(auditLog.targetId, r.redemption.id))).map((x) => x.action).sort()).toEqual(['coins.redemption.approve', 'coins.redemption.fulfil']);

    // Housekeeping erases the address after the retention period.
    await coinsHousekeeping(hp.t.db, new Date(Date.now() + 40 * 86_400_000));
    const [after] = await hp.t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, r.redemption.id));
    expect(after).toMatchObject({ addressEnc: null, status: 'fulfilled' });
    expect(after!.addressErasedAt).not.toBeNull();
  });

  it('cancel and staff reject refund exactly; the item limit and requests without an address expire', async () => {
    const { c, id } = await member(hp);
    hp.consent.setStatus(id, 'granted');
    await hp.services.consent.refresh(id);
    await grant(hp, id, 1300);
    const r1 = (await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json();
    const r2 = (await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json();
    expect((await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json().code).toBe('redemption_limit');
    expect(await balance(hp, id)).toBe(100);
    expect((await c.post(`/v1/coins/redemptions/${r1.redemption.id}/cancel`, {})).json()).toMatchObject({ status: 'cancelled', statusReason: 'student_cancelled' });
    expect(await balance(hp, id)).toBe(700);
    expect((await c.post(`/v1/coins/redemptions/${r1.redemption.id}/cancel`, {})).json().code).toBe('conflict');
    await c.request('PUT', `/v1/coins/redemptions/${r2.redemption.id}/address`, { body: ADDRESS });
    const staff = await mfaStaff(hp);
    expect((await staff.post(`/v1/admin/coins/redemptions/${r2.redemption.id}/reject`, {})).json()).toMatchObject({ status: 'refunded', statusReason: 'staff_rejected', addressOnFile: false });
    expect(await balance(hp, id)).toBe(1300);
    const refunds = await hp.t.db.select().from(coinLedger).where(and(eq(coinLedger.userId, id), eq(coinLedger.kind, 'refund')));
    expect(refunds.map((x) => x.amount)).toEqual([600, 600]);
    // A request left without an address is cancelled and refunded by housekeeping.
    const r3 = (await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json();
    expect((await coinsHousekeeping(hp.t.db, new Date(Date.now() + 15 * 86_400_000))).cancelled).toBeGreaterThanOrEqual(1);
    const [row3] = await hp.t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, r3.redemption.id));
    expect(row3).toMatchObject({ status: 'cancelled', statusReason: 'address_timeout' });
    expect(await balance(hp, id)).toBe(1300);
  });

  it('account deletion erases addresses, cancels open merch with a refund; the purge removes the ledger and detaches redemptions', async () => {
    const { c, id } = await member(hp);
    hp.consent.setStatus(id, 'granted');
    await hp.services.consent.refresh(id);
    await grant(hp, id, 700);
    const r = (await c.post('/v1/coins/redeem', { itemKey: 'sticker-pack' })).json();
    await c.request('PUT', `/v1/coins/redemptions/${r.redemption.id}/address`, { body: ADDRESS });
    const del = await c.delete('/v1/me');
    expect(del.statusCode).toBeLessThan(300);
    const [row] = await hp.t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, r.redemption.id));
    expect(row).toMatchObject({ status: 'cancelled', statusReason: 'account_deleted', addressEnc: null, trackingRef: null });
    expect(await balance(hp, id)).toBe(700);
    await hp.t.db.delete(users).where(eq(users.id, id));
    expect(await hp.t.db.select().from(coinLedger).where(eq(coinLedger.userId, id))).toEqual([]);
    expect(await hp.t.db.select().from(coinWallets).where(eq(coinWallets.userId, id))).toEqual([]);
    const [detached] = await hp.t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, r.redemption.id));
    expect(detached).toMatchObject({ userId: null, addressEnc: null });
  });
});

describe('live ranks and leagues (consent-gated)', () => {
  it('pays rank tiers after results are published, only with consent granted, once', async () => {
    const a = await member();
    const b = await member();
    const cc = await member();
    h.consent.setStatus(a.id, 'granted');
    await h.services.consent.refresh(a.id);
    const [t] = await h.t.db.select({ id: tests.id }).from(tests).where(eq(tests.key, SHORT)).limit(1);
    const now = new Date();
    const [ev] = await h.t.db
      .insert(liveEvents)
      .values({ key: `live-coins-${Date.now()}`, academicYear: '2026-27', testId: t!.id, title: 'Coins live mock', registrationOpensAt: new Date(now.getTime() - 3 * 3600_000), startsAt: new Date(now.getTime() - 2 * 3600_000), endsAt: new Date(now.getTime() - 3600_000), status: 'results_published', resultsPublishedAt: now })
      .returning();
    await h.t.db.insert(liveRegistrations).values([
      { liveEventId: ev!.id, userId: a.id, finalRank: 1 },
      { liveEventId: ev!.id, userId: b.id, finalRank: 2 },
      { liveEventId: ev!.id, userId: cc.id, finalRank: 500 },
    ]);
    const tiers = COIN_EARN.liveRankTiers;
    expect((await awardLiveRanks(h.t.db, now, { minParticipants: 50 })).awarded).toBe(0); // too few participants
    const r = await awardLiveRanks(h.t.db, now, { minParticipants: 3 });
    expect(r).toMatchObject({ awarded: 1, skippedNoConsent: 1 });
    expect(r.coins).toBe(tiers.find((x) => x.maxRank === 1)!.coins);
    expect((await awardLiveRanks(h.t.db, now, { minParticipants: 3 })).awarded).toBe(0);
    // b's consent arrives later: paid on the next run inside the window.
    h.consent.setStatus(b.id, 'granted');
    await h.services.consent.refresh(b.id);
    expect((await awardLiveRanks(h.t.db, new Date(now.getTime() + 86_400_000), { minParticipants: 3 })).awarded).toBe(1);
    expect((await a.c.get('/v1/coins/history')).json().entries[0]).toMatchObject({ source: 'live_rank', detail: { rank: 1 } });
    // The achievement-gated drop sees the rank.
    const store = (await a.c.get('/v1/coins/store')).json();
    expect(store.items.find((i: { key: string }) => i.key === 'topper-jacket-2027').eligible).toBe(true);
  });

  it('league promotion and top finish pay consenting members with XP, once per league', async () => {
    const a = await member();
    const b = await member();
    h.consent.setStatus(a.id, 'granted');
    await h.services.consent.refresh(a.id);
    const leagueId = '0190a1b2-0000-7000-8000-0000000000aa';
    const standings = [
      { userId: a.id, rank: 1, xp: 120, outcome: 'promoted' as const },
      { userId: b.id, rank: 2, xp: 90, outcome: 'promoted' as const },
    ];
    const paid = await h.t.db.transaction((tx) => onLeagueClosed(tx, leagueId, new Date(), standings));
    expect(paid).toBe(COIN_EARN.leaguePromotion + COIN_EARN.leagueTopFinishTiers.find((x) => x.maxRank === 1)!.coins);
    expect(await h.t.db.transaction((tx) => onLeagueClosed(tx, leagueId, new Date(), standings))).toBe(0);
    expect(await balance(h, b.id)).toBe(0);
  });
});

/** A staff client with a TOTP-verified, fresh session. */
async function mfaStaff(harness: Harness): Promise<Client> {
  const s = harness.client();
  const { user } = await s.signInEmail(email());
  await harness.services.adapter().then((x) => x.updateUser(user.id, { role: 'admin' }));
  const { secret } = (await s.post('/v1/me/mfa/totp/enroll')).json();
  const code = totpAt(base32Decode(secret), stepAt(harness.clock.now()));
  const ok = await s.post('/v1/me/mfa/totp/confirm', { code });
  if (ok.statusCode !== 200) throw new Error(`mfa confirm ${ok.statusCode} ${ok.body}`);
  return s;
}

/**
 * SOYL Coins jobs (ADR-021): registration, live-mock rank awards (consent-gated, idempotent across runs)
 * and housekeeping (address retention, requests without an address cancelled and refunded).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { boards, classes, coinLedger, coinRedemptions, coinWallets, liveEvents, liveRegistrations, subjects, tests } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { COIN_EARN, COIN_STORE } from '@soyl/shared/config/coins';
import { COINS_JOB_NAMES, coinsJobs } from '../src/coins-jobs';
import { allJobs, JOB_NAMES } from '../src/jobs';
import { DAY, makeUser, NOW } from './helpers';
import type { JobContext } from '../src/registry';

let t: TestDb;
let testId: string;
const log = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {}, child: () => log } as unknown as JobContext['log'];
const ctxAt = (now: Date) => ({ db: t.db, now, log }) as unknown as JobContext;
const job = (name: string) => coinsJobs().find((j) => j.name === name)!;

beforeAll(async () => {
  t = await createTestDb();
  const [b] = await t.db.insert(boards).values({ code: 'cbse', name: 'CBSE' }).returning();
  const [c] = await t.db.insert(classes).values({ boardId: b!.id, level: 10, exam: 'cbse', name: 'Class 10' }).returning();
  const [s] = await t.db
    .insert(subjects)
    .values({ key: 'cbse-10-science', academicYear: '2026-27', boardId: b!.id, classId: c!.id, exam: 'cbse', classLevel: 10, code: '086', name: 'Science', language: 'en', script: 'Latn', tier: 'core', wave: 1, priority: 1, theoryOnly: false, hasBoardExam: true, sourceStatus: 'verified', source: 'test' })
    .returning();
  const [tt] = await t.db
    .insert(tests)
    .values({ key: 't_coins_live', academicYear: '2026-27', kind: 'live', paperType: 'chapter-test-short', subjectId: s!.id, chapterKeys: [], title: 'Live', durationMin: 10, totalMarks: 1, status: 'published', definition: {} })
    .returning();
  testId = tt!.id;
});
afterAll(async () => {
  await t?.close();
});

describe('coins jobs', () => {
  it('are registered with the worker', () => {
    const names = allJobs().map((j) => j.name);
    expect(names).toEqual(expect.arrayContaining([JOB_NAMES.coinsLiveRankAwards, JOB_NAMES.coinsHousekeeping]));
    expect(job(COINS_JOB_NAMES.liveRankAwards).cron).toBe('*/15 * * * *');
    expect(job(COINS_JOB_NAMES.housekeeping).cron).toBe('15 21 * * *');
  });

  it('live-rank awards: only ranked students with consent granted, only events with enough participants, once', async () => {
    const [ev] = await t.db
      .insert(liveEvents)
      .values({ key: 'live-coins-1', academicYear: '2026-27', testId, title: 'Live', registrationOpensAt: new Date(NOW.getTime() - 3 * 3600_000), startsAt: new Date(NOW.getTime() - 2 * 3600_000), endsAt: new Date(NOW.getTime() - 3600_000), status: 'results_published', resultsPublishedAt: NOW })
      .returning();
    const n = COIN_EARN.liveRankMinParticipants;
    const consenting = await makeUser(t.db, { consent: 'granted' });
    const pending = await makeUser(t.db, { consent: 'pending' });
    const others: string[] = [];
    for (let i = 0; i < n - 2; i++) others.push(await makeUser(t.db));
    await t.db.insert(liveRegistrations).values([
      { liveEventId: ev!.id, userId: consenting, finalRank: 1 },
      { liveEventId: ev!.id, userId: pending, finalRank: 2 },
      ...others.map((userId, i) => ({ liveEventId: ev!.id, userId, finalRank: 3 + i })),
    ]);
    const first = await job(COINS_JOB_NAMES.liveRankAwards).handler(ctxAt(NOW), null);
    expect(first).toMatchObject({ events: 1, awarded: 1, coins: COIN_EARN.liveRankTiers.find((x) => x.maxRank === 1)!.coins });
    expect((first as { skippedNoConsent: number }).skippedNoConsent).toBeGreaterThanOrEqual(1);
    expect(await job(COINS_JOB_NAMES.liveRankAwards).handler(ctxAt(NOW), null)).toMatchObject({ awarded: 0 });
    // Outside the award window the event is not looked at any more.
    const late = new Date(NOW.getTime() + (COIN_EARN.liveRankAwardWindowDays + 1) * DAY);
    expect(await job(COINS_JOB_NAMES.liveRankAwards).handler(ctxAt(late), null)).toMatchObject({ events: 0 });
    const rows = await t.db.select().from(coinLedger).where(eq(coinLedger.source, 'live_rank'));
    expect(rows.map((r) => r.userId)).toEqual([consenting]);
  });

  it('housekeeping erases shipped addresses after retention and cancels requests without an address (refunded)', async () => {
    const u = await makeUser(t.db);
    await t.db.insert(coinWallets).values({ userId: u });
    await t.db.insert(coinLedger).values({ userId: u, kind: 'adjust', source: 'admin', amount: 1000, idempotencyKey: `grant:${u}`, istDay: '2026-10-01' });
    const [shipped] = await t.db
      .insert(coinRedemptions)
      .values({ userId: u, itemKey: 'tee', itemType: 'physical', priceCoins: 400, status: 'fulfilled', addressEnc: 'a1:x:y:z', fulfilledAt: new Date(NOW.getTime() - (COIN_STORE.addressRetentionDaysAfterFulfilment + 1) * DAY) })
      .returning();
    const [stale] = await t.db
      .insert(coinRedemptions)
      .values({ userId: u, itemKey: 'notebook', itemType: 'physical', priceCoins: 300, status: 'requested', createdAt: new Date(NOW.getTime() - (COIN_STORE.addressDeadlineDays + 1) * DAY) })
      .returning();
    await t.db.insert(coinLedger).values({ userId: u, kind: 'redeem', source: 'redemption', amount: -300, idempotencyKey: `redeem:${stale!.id}`, istDay: '2026-10-01', redemptionId: stale!.id });
    expect(await job(COINS_JOB_NAMES.housekeeping).handler(ctxAt(NOW), null)).toEqual({ addressesErased: 1, cancelled: 1 });
    const [a] = await t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, shipped!.id));
    expect(a).toMatchObject({ addressEnc: null, status: 'fulfilled' });
    const [b] = await t.db.select().from(coinRedemptions).where(eq(coinRedemptions.id, stale!.id));
    expect(b).toMatchObject({ status: 'cancelled', statusReason: 'address_timeout' });
    const refunds = await t.db.select().from(coinLedger).where(and(eq(coinLedger.userId, u), eq(coinLedger.kind, 'refund')));
    expect(refunds.map((r) => r.amount)).toEqual([300]);
    expect(await job(COINS_JOB_NAMES.housekeeping).handler(ctxAt(NOW), null)).toEqual({ addressesErased: 0, cancelled: 0 });
  });
});

import { describe, expect, it } from 'vitest';
import {
  CAPPED_SOURCES,
  CHAPTER_MASTERY,
  COIN_DAILY_CAP,
  COIN_EARN,
  COIN_EARN_SOURCES,
  COIN_STORE,
  COIN_TEST_RULES,
  INDIA_STATES,
  STORE_ITEMS,
  cappedAmount,
  howToEarn,
  inDropWindow,
  milestonesReached,
  rankTierCoins,
  storeItem,
  streakBonusesFor,
} from './coins';
import { TEST_XP_RULES } from './gamification';

const positiveInt = (n: number) => Number.isInteger(n) && n > 0;

describe('coins config: earning', () => {
  it('every amount is a positive whole number of coins', () => {
    for (const n of [COIN_EARN.dailyCheckIn, COIN_EARN.dailyChallenge, COIN_EARN.chapterMastered, COIN_EARN.testSubmitted, COIN_EARN.perfectPaper, COIN_EARN.liveParticipation, COIN_EARN.leaguePromotion])
      expect(positiveInt(n), String(n)).toBe(true);
    for (const b of COIN_EARN.checkInStreakBonuses) expect(positiveInt(b.coins) && positiveInt(b.everyDays) && b.everyDays >= 2).toBe(true);
    for (const t of [...COIN_EARN.liveRankTiers, ...COIN_EARN.leagueTopFinishTiers]) expect(positiveInt(t.coins) && positiveInt(t.maxRank)).toBe(true);
    for (const m of COIN_EARN.solvedMilestones) expect(positiveInt(m.coins) && positiveInt(m.solved)).toBe(true);
    expect(positiveInt(COIN_EARN.dailyChallengeAwardsPerDay)).toBe(true);
    expect(positiveInt(COIN_EARN.liveRankMinParticipants)).toBe(true);
    expect(positiveInt(COIN_EARN.liveRankAwardWindowDays)).toBe(true);
  });

  it('milestones and tiers are strictly ordered: a harder target pays more', () => {
    const ms = COIN_EARN.solvedMilestones;
    for (let i = 1; i < ms.length; i++) {
      expect(ms[i]!.solved).toBeGreaterThan(ms[i - 1]!.solved);
      expect(ms[i]!.coins).toBeGreaterThan(ms[i - 1]!.coins);
    }
    for (const tiers of [COIN_EARN.liveRankTiers, COIN_EARN.leagueTopFinishTiers]) {
      const sorted = [...tiers].sort((a, b) => a.maxRank - b.maxRank);
      expect(new Set(sorted.map((t) => t.maxRank)).size).toBe(sorted.length);
      for (let i = 1; i < sorted.length; i++) expect(sorted[i]!.coins).toBeLessThan(sorted[i - 1]!.coins);
    }
    const days = COIN_EARN.checkInStreakBonuses.map((b) => b.everyDays);
    expect(new Set(days).size).toBe(days.length);
  });

  it('the daily cap admits a full ordinary day but is not unbounded', () => {
    const ordinaryDay = COIN_EARN.dailyCheckIn + COIN_EARN.dailyChallenge * COIN_EARN.dailyChallengeAwardsPerDay + COIN_EARN.testSubmitted;
    expect(COIN_DAILY_CAP).toBeGreaterThanOrEqual(ordinaryDay);
    expect(COIN_DAILY_CAP).toBeGreaterThanOrEqual(COIN_EARN.liveParticipation + COIN_EARN.dailyCheckIn);
    expect(COIN_DAILY_CAP).toBeLessThan(STORE_ITEMS.filter((i) => i.type === 'physical').reduce((m, i) => Math.min(m, i.priceCoins), Infinity) / 10);
    for (const s of CAPPED_SOURCES) expect(COIN_EARN_SOURCES).toContain(s);
    // Milestone, rank and league awards are never capped (brief / D-037).
    for (const s of ['solved_milestone', 'live_rank', 'league_promotion', 'league_top_finish', 'checkin_streak'] as const) expect(CAPPED_SOURCES).not.toContain(s);
  });

  it('reuses the XP anti-grinding numbers', () => {
    expect(COIN_TEST_RULES.minAnsweredShare).toBe(TEST_XP_RULES.testMinAnsweredShare);
    expect(COIN_TEST_RULES.perfectMinAutoMarks).toBe(TEST_XP_RULES.perfectMinAutoMarks);
    expect(CHAPTER_MASTERY.accuracy).toBeGreaterThan(0.5);
    expect(CHAPTER_MASTERY.accuracy).toBeLessThanOrEqual(1);
    expect(positiveInt(CHAPTER_MASTERY.minDistinct)).toBe(true);
  });

  it('how-to-earn lists every earn source once', () => {
    const rows = howToEarn();
    expect(rows.map((r) => r.key).sort()).toEqual([...COIN_EARN_SOURCES].sort());
    for (const r of rows) expect(r.capped).toBe(CAPPED_SOURCES.includes(r.key as never));
  });
});

describe('coins config: store', () => {
  it('items are well-formed', () => {
    const keys = STORE_ITEMS.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const i of STORE_ITEMS) {
      expect(i.key).toMatch(/^[a-z0-9][a-z0-9-]{1,60}$/);
      expect(i.name.length).toBeGreaterThan(2);
      expect(i.description.length).toBeGreaterThan(5);
      expect(i.image).toMatch(/^[a-z0-9-]+$/);
      expect(positiveInt(i.priceCoins), i.key).toBe(true);
      expect(positiveInt(i.maxPerUser), i.key).toBe(true);
      if (i.stock !== null) expect(positiveInt(i.stock), i.key).toBe(true);
      expect(i.type === 'digital' ? !!i.slot : i.slot === undefined, i.key).toBe(true);
      if (i.type === 'digital') expect(i.maxPerUser, `${i.key}: a digital item is owned once`).toBe(1);
      for (const d of [i.availableFrom, i.availableUntil]) if (d) expect(Number.isNaN(Date.parse(d)), i.key).toBe(false);
      if (i.availableFrom && i.availableUntil) expect(Date.parse(i.availableUntil)).toBeGreaterThan(Date.parse(i.availableFrom));
      expect(!!i.eligibility === !!i.eligibilityLabel, `${i.key}: eligibility needs a label`).toBe(true);
    }
  });

  it('has the default line-up: digital frames and themes, physical merch, one achievement-gated limited drop', () => {
    const digital = STORE_ITEMS.filter((i) => i.type === 'digital');
    expect(digital.some((i) => i.slot === 'frame')).toBe(true);
    expect(digital.some((i) => i.slot === 'theme')).toBe(true);
    for (const k of ['sticker-pack', 'notebook', 'bottle', 'tee', 'hoodie']) expect(storeItem(k)?.type).toBe('physical');
    const drops = STORE_ITEMS.filter((i) => i.type === 'physical' && i.eligibility && i.stock !== null && i.availableUntil);
    expect(drops.length).toBeGreaterThanOrEqual(1);
  });

  it('merch is genuinely exclusive: physical prices take months of steady learning', () => {
    const steadyDay = COIN_EARN.dailyCheckIn + COIN_EARN.dailyChallenge + COIN_EARN.testSubmitted; // ~11 coins
    const cheapestPhysical = Math.min(...STORE_ITEMS.filter((i) => i.type === 'physical' && !i.eligibility).map((i) => i.priceCoins));
    const dearest = Math.max(...STORE_ITEMS.filter((i) => i.type === 'physical').map((i) => i.priceCoins));
    expect(cheapestPhysical / steadyDay).toBeGreaterThanOrEqual(30); // a month or more
    expect(dearest / COIN_DAILY_CAP).toBeGreaterThanOrEqual(120); // even at the cap every day: 4+ months
    // Digital items stay reachable within weeks.
    for (const i of STORE_ITEMS.filter((x) => x.type === 'digital')) expect(i.priceCoins).toBeLessThan(cheapestPhysical);
  });

  it('D-038: no redemptions at launch — every item is a draft and the master switch is off', () => {
    expect(COIN_STORE.redemptionEnabled).toBe(false);
    expect(STORE_ITEMS.filter((i) => i.active)).toEqual([]);
  });

  it('physical redemption is off by default (OA-19, OA-08)', () => {
    expect(COIN_STORE.physicalRedemptionEnabled).toBe(false);
    expect(positiveInt(COIN_STORE.addressRetentionDaysAfterFulfilment)).toBe(true);
    expect(positiveInt(COIN_STORE.addressDeadlineDays)).toBe(true);
    expect(INDIA_STATES.length).toBe(36);
  });
});

describe('coins helpers', () => {
  it('rank tiers pick the best matching tier', () => {
    const tiers = [{ maxRank: 1, coins: 500 }, { maxRank: 100, coins: 100 }, { maxRank: 10, coins: 250 }];
    expect(rankTierCoins(1, tiers)?.coins).toBe(500);
    expect(rankTierCoins(2, tiers)?.coins).toBe(250);
    expect(rankTierCoins(10, tiers)?.coins).toBe(250);
    expect(rankTierCoins(11, tiers)?.coins).toBe(100);
    expect(rankTierCoins(101, tiers)).toBeNull();
    expect(rankTierCoins(null, tiers)).toBeNull();
    expect(rankTierCoins(0, tiers)).toBeNull();
  });

  it('streak bonuses fire on multiples', () => {
    const b = [{ everyDays: 7, coins: 5 }, { everyDays: 30, coins: 25 }];
    expect(streakBonusesFor(6, b)).toEqual([]);
    expect(streakBonusesFor(7, b)).toEqual([{ everyDays: 7, coins: 5 }]);
    expect(streakBonusesFor(30, b)).toEqual([{ everyDays: 30, coins: 25 }]);
    expect(streakBonusesFor(210, b)).toHaveLength(2);
    expect(streakBonusesFor(0, b)).toEqual([]);
  });

  it('milestones reached and not yet awarded', () => {
    expect(milestonesReached(49, new Set()).length).toBe(0);
    expect(milestonesReached(50, new Set()).map((m) => m.solved)).toEqual([50]);
    expect(milestonesReached(250, new Set([50])).map((m) => m.solved)).toEqual([200]);
  });

  it('caps cut an award to what is left of the day', () => {
    expect(cappedAmount(5, 0, 40)).toBe(5);
    expect(cappedAmount(5, 38, 40)).toBe(2);
    expect(cappedAmount(5, 40, 40)).toBe(0);
    expect(cappedAmount(5, 45, 40)).toBe(0);
  });

  it('drop windows', () => {
    const item = { availableFrom: '2027-01-01T00:00:00.000Z', availableUntil: '2027-01-31T00:00:00.000Z' };
    expect(inDropWindow(item, Date.parse('2026-12-31T23:59:59Z'))).toBe('upcoming');
    expect(inDropWindow(item, Date.parse('2027-01-15T00:00:00Z'))).toBe('open');
    expect(inDropWindow(item, Date.parse('2027-02-01T00:00:00Z'))).toBe('ended');
    expect(inDropWindow({ availableFrom: null, availableUntil: null }, 0)).toBe('open');
  });
});

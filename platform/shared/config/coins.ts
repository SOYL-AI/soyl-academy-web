/**
 * SOYL Coins (D-037, ADR-020): an earn-only reward currency, redeemable for digital items and exclusive
 * merch, LeetCode-style. Coins cannot be bought, transferred or converted to cash or AI credits, and
 * have no cash value. Every number here is owner-tunable; `coins.test.ts` checks the config is
 * internally consistent. No imports except gamification (pure numbers): the web shows the same values.
 *
 * Anti-grinding (reuses the XP rules in gamification.ts):
 * - practice coins count only **distinct first-correct** answers given in the app (never guest-merged
 *   ones, never a second correct answer to the same question);
 * - test coins need `TEST_XP_RULES.testMinAnsweredShare` of the paper answered, once per test, never for
 *   custom tests (they can be built at will);
 * - every repeatable source is once per IST day, and `COIN_DAILY_CAP` limits the day's capped sources;
 * - no random rewards, loot boxes or paid boosts (D-037).
 */
import { TEST_XP_RULES } from './gamification';

/** Where a ledger `earn` row came from (stored in `coin_ledger.source`). */
export const COIN_EARN_SOURCES = [
  'checkin',
  'checkin_streak',
  'daily_challenge',
  'solved_milestone',
  'chapter_mastered',
  'test_submitted',
  'perfect_paper',
  'live_participation',
  'live_rank',
  'league_promotion',
  'league_top_finish',
] as const;
export type CoinEarnSource = (typeof COIN_EARN_SOURCES)[number];

/** Every `coin_ledger.source` value: earn sources plus redemption bookkeeping and staff adjustments. */
export const COIN_LEDGER_SOURCES = [...COIN_EARN_SOURCES, 'redemption', 'admin'] as const;
export type CoinLedgerSource = (typeof COIN_LEDGER_SOURCES)[number];

export interface RankTier {
  /** Awarded when the final rank is at most this (the best matching tier only). */
  maxRank: number;
  coins: number;
}

export interface StreakBonus {
  /** Awarded each time the check-in streak reaches a multiple of this many consecutive IST days. */
  everyDays: number;
  coins: number;
}

export interface SolvedMilestone {
  /** Distinct practice questions answered correctly in the app (first-correct). */
  solved: number;
  coins: number;
}

export const COIN_EARN = {
  /** Explicit "Check in" once per IST day (signing in alone earns nothing: bots sign in too). */
  dailyCheckIn: 1,
  /** Bonus on top of the day's check-in when the check-in streak reaches a multiple of `everyDays`. */
  checkInStreakBonuses: [
    { everyDays: 7, coins: 5 },
    { everyDays: 30, coins: 25 },
  ] as readonly StreakBonus[],
  /** First correct answer on the IST day to that day's challenge question for a subject. */
  dailyChallenge: 5,
  /** At most this many daily-challenge awards per IST day (across subjects). */
  dailyChallengeAwardsPerDay: 1,
  /** One-off milestones on distinct first-correct practice answers. */
  solvedMilestones: [
    { solved: 50, coins: 20 },
    { solved: 200, coins: 60 },
    { solved: 500, coins: 150 },
    { solved: 1000, coins: 300 },
  ] as readonly SolvedMilestone[],
  /** Once per chapter: `chapterMastery.minDistinct` questions tried with first-try accuracy ≥ `accuracy`. */
  chapterMastered: 10,
  /** First graded submission of a series test (not custom, not live), at least `testMinAnsweredShare` answered. */
  testSubmitted: 5,
  /** Every auto-graded item right on a series or live paper (TEST_XP_RULES.perfectMinAutoMarks or more), once per test. */
  perfectPaper: 10,
  /** Live All-India mock participation (graded, at least `testMinAnsweredShare` answered), once per event. */
  liveParticipation: 15,
  /**
   * Live mock final rank (consent-gated: only students with consent `granted` are ranked publicly, so
   * only they are awarded). Best tier only; only for events with at least `liveRankMinParticipants`.
   */
  liveRankTiers: [
    { maxRank: 1, coins: 500 },
    { maxRank: 10, coins: 250 },
    { maxRank: 100, coins: 100 },
  ] as readonly RankTier[],
  liveRankMinParticipants: 200,
  /** How long after results are published the rank-award job keeps looking (late consent still counts). */
  liveRankAwardWindowDays: 30,
  /** Weekly league (consent-gated like leagues themselves): promotion to the next tier. */
  leaguePromotion: 10,
  /** Weekly league top finish in the division (best tier only; in addition to promotion). */
  leagueTopFinishTiers: [
    { maxRank: 1, coins: 30 },
    { maxRank: 3, coins: 15 },
  ] as readonly RankTier[],
} as const;

/** Chapter mastery for coins: first answers only (a re-answered question cannot lift accuracy). */
export const CHAPTER_MASTERY = { minDistinct: 20, accuracy: 0.8 } as const;

/** Test coin rules reuse the XP anti-grinding numbers. */
export const COIN_TEST_RULES = { minAnsweredShare: TEST_XP_RULES.testMinAnsweredShare, perfectMinAutoMarks: TEST_XP_RULES.perfectMinAutoMarks } as const;

/**
 * Per-IST-day cap on the "capped" sources (check-in, daily challenge, chapter mastery, tests, live
 * participation). Milestones, streak bonuses, rank and league awards are uncapped: they are rare and
 * one-off by construction. An award that would pass the cap is cut to what is left (possibly 0, which
 * is still recorded so the event is not awarded again later).
 */
export const COIN_DAILY_CAP = 40;

export const CAPPED_SOURCES: readonly CoinEarnSource[] = [
  'checkin',
  'daily_challenge',
  'chapter_mastered',
  'test_submitted',
  'perfect_paper',
  'live_participation',
];

/* ------------------------------------------------------------------------------------------------
 * Store
 * ---------------------------------------------------------------------------------------------- */

export type StoreItemType = 'digital' | 'physical';
export type DigitalSlot = 'frame' | 'theme';

/** Who may redeem an item, beyond having the coins. Evaluated server-side from the student's own record. */
export type StoreEligibility =
  /** Was awarded live-mock rank coins for a final rank of at most `maxRank` (consent-gated by construction). */
  | { kind: 'live_rank'; maxRank: number }
  /** At least this many distinct first-correct practice answers. */
  | { kind: 'solved'; count: number }
  /** Longest daily check-in streak of at least this many days. */
  | { kind: 'checkin_streak'; days: number }
  /** At least this many chapters mastered (coin award count). */
  | { kind: 'chapters_mastered'; count: number };

export interface StoreItem {
  key: string;
  name: string;
  description: string;
  /** Placeholder image key (artwork pending; the web maps it to an illustration). */
  image: string;
  type: StoreItemType;
  /** Digital items: what the item changes when equipped. */
  slot?: DigitalSlot;
  priceCoins: number;
  /** Total units for everyone (null = unlimited). Cancelled/refunded redemptions return their unit. */
  stock: number | null;
  /** Limited-drop window (ISO instants, UTC); outside it the item is shown but cannot be redeemed. */
  availableFrom: string | null;
  availableUntil: string | null;
  eligibility: StoreEligibility | null;
  /** Human copy for the eligibility rule (shown on locked items). */
  eligibilityLabel: string | null;
  /** How many one student may redeem (open + fulfilled redemptions). */
  maxPerUser: number;
  active: boolean;
}

/**
 * Prices: a steady learner earns roughly 10–20 coins a day (check-in, the daily challenge, a test)
 * plus milestones, so stickers take ~1–2 months and the hoodie most of a school year. That is the point:
 * merch you cannot buy, only earn.
 */
export const STORE_ITEMS: readonly StoreItem[] = [
  {
    key: 'frame-saffron',
    name: 'Saffron profile frame',
    description: 'A warm saffron ring around your profile picture.',
    image: 'frame-saffron',
    type: 'digital',
    slot: 'frame',
    priceCoins: 60,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: null,
    eligibilityLabel: null,
    maxPerUser: 1,
    active: true,
  },
  {
    key: 'frame-constellation',
    name: 'Constellation frame',
    description: 'A starfield frame for students who have solved 200 questions.',
    image: 'frame-constellation',
    type: 'digital',
    slot: 'frame',
    priceCoins: 150,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: { kind: 'solved', count: 200 },
    eligibilityLabel: 'Solve 200 practice questions',
    maxPerUser: 1,
    active: true,
  },
  {
    key: 'theme-midnight',
    name: 'Midnight study theme',
    description: 'A calm dark accent for your dashboard.',
    image: 'theme-midnight',
    type: 'digital',
    slot: 'theme',
    priceCoins: 100,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: null,
    eligibilityLabel: null,
    maxPerUser: 1,
    active: true,
  },
  {
    key: 'theme-streak-flame',
    name: 'Streak flame theme',
    description: 'Unlocked by checking in 30 days in a row.',
    image: 'theme-streak-flame',
    type: 'digital',
    slot: 'theme',
    priceCoins: 120,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: { kind: 'checkin_streak', days: 30 },
    eligibilityLabel: 'Check in 30 days in a row',
    maxPerUser: 1,
    active: true,
  },
  {
    key: 'sticker-pack',
    name: 'SOYL sticker pack',
    description: 'Six die-cut stickers for your laptop or notebook.',
    image: 'sticker-pack',
    type: 'physical',
    priceCoins: 600,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: null,
    eligibilityLabel: null,
    maxPerUser: 2,
    active: true,
  },
  {
    key: 'notebook',
    name: 'SOYL notebook',
    description: 'A ruled A5 notebook with the SOYL mark.',
    image: 'notebook',
    type: 'physical',
    priceCoins: 1200,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: null,
    eligibilityLabel: null,
    maxPerUser: 2,
    active: true,
  },
  {
    key: 'bottle',
    name: 'SOYL steel bottle',
    description: 'An insulated steel bottle for long study days.',
    image: 'bottle',
    type: 'physical',
    priceCoins: 2500,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: null,
    eligibilityLabel: null,
    maxPerUser: 1,
    active: true,
  },
  {
    key: 'tee',
    name: 'SOYL T-shirt',
    description: 'A soft cotton tee. Earned, never sold.',
    image: 'tee',
    type: 'physical',
    priceCoins: 4000,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: null,
    eligibilityLabel: null,
    maxPerUser: 1,
    active: true,
  },
  {
    key: 'hoodie',
    name: 'SOYL hoodie',
    description: 'The hoodie. Most of a school year of steady learning.',
    image: 'hoodie',
    type: 'physical',
    priceCoins: 7500,
    stock: null,
    availableFrom: null,
    availableUntil: null,
    eligibility: null,
    eligibilityLabel: null,
    maxPerUser: 1,
    active: true,
  },
  {
    key: 'topper-jacket-2027',
    name: 'All-India Topper jacket (2027 drop)',
    description: 'A limited varsity jacket for students who finished in the top 100 of a live All-India mock.',
    image: 'topper-jacket',
    type: 'physical',
    priceCoins: 3000,
    stock: 100,
    availableFrom: '2027-01-01T00:00:00.000Z',
    availableUntil: '2027-03-31T18:29:59.000Z',
    eligibility: { kind: 'live_rank', maxRank: 100 },
    eligibilityLabel: 'Finish in the top 100 of a live All-India mock',
    maxPerUser: 1,
    active: true,
  },
];

export const COIN_STORE = {
  /**
   * Default for COINS_PHYSICAL_REDEMPTION_ENABLED (env overrides). Off until OA-19 (vendor + budget)
   * and OA-08 (consent system) are done; physical items show "Coming soon".
   */
  physicalRedemptionEnabled: false,
  /** Shipping address is erased this many days after fulfilment (PII.md: minimised). */
  addressRetentionDaysAfterFulfilment: 30,
  /** A physical redemption still waiting for its address after this many days is cancelled and refunded. */
  addressDeadlineDays: 14,
} as const;

/** Physical-redemption statuses (coin_redemptions.status). Digital redemptions go straight to `fulfilled`. */
export const REDEMPTION_STATUSES = ['requested', 'parent_approval_pending', 'approved', 'fulfilled', 'cancelled', 'refunded'] as const;
export type RedemptionStatus = (typeof REDEMPTION_STATUSES)[number];
/** Statuses that hold a unit of stock and count towards `maxPerUser`. */
export const OPEN_OR_DONE_REDEMPTION: readonly RedemptionStatus[] = ['requested', 'parent_approval_pending', 'approved', 'fulfilled'];

/** Indian states and union territories accepted in shipping addresses. */
export const INDIA_STATES: readonly string[] = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

/* ------------------------------------------------------------------------------------------------
 * Helpers (pure; used by the API and the web)
 * ---------------------------------------------------------------------------------------------- */

export function storeItem(key: string, items: readonly StoreItem[] = STORE_ITEMS): StoreItem | undefined {
  return items.find((i) => i.key === key);
}

/** The best rank tier for a rank (null when none applies). */
export function rankTierCoins(rank: number | null | undefined, tiers: readonly RankTier[]): RankTier | null {
  if (rank === null || rank === undefined || rank < 1) return null;
  const sorted = [...tiers].sort((a, b) => a.maxRank - b.maxRank);
  return sorted.find((t) => rank <= t.maxRank) ?? null;
}

/** Streak bonuses due on a check-in that brings the streak to `streak` days. */
export function streakBonusesFor(streak: number, bonuses: readonly StreakBonus[] = COIN_EARN.checkInStreakBonuses): StreakBonus[] {
  if (streak < 1) return [];
  return bonuses.filter((b) => streak % b.everyDays === 0);
}

/** Milestones reached at `solved` that are not yet in `awarded` (by `solved` threshold). */
export function milestonesReached(solved: number, awarded: ReadonlySet<number>, milestones: readonly SolvedMilestone[] = COIN_EARN.solvedMilestones): SolvedMilestone[] {
  return milestones.filter((m) => solved >= m.solved && !awarded.has(m.solved));
}

/** Whether an item is inside its limited-drop window at `nowMs`. */
export function inDropWindow(item: Pick<StoreItem, 'availableFrom' | 'availableUntil'>, nowMs: number): 'upcoming' | 'open' | 'ended' {
  if (item.availableFrom && nowMs < Date.parse(item.availableFrom)) return 'upcoming';
  if (item.availableUntil && nowMs > Date.parse(item.availableUntil)) return 'ended';
  return 'open';
}

/** What a capped award actually pays, given what was already earned from capped sources today. */
export function cappedAmount(amount: number, earnedCappedToday: number, cap: number = COIN_DAILY_CAP): number {
  return Math.max(0, Math.min(amount, cap - earnedCappedToday));
}

/** "How to earn" rows for the /coins page, from the numbers above (single source of truth). */
export function howToEarn(): { key: string; label: string; coins: string; capped: boolean }[] {
  const e = COIN_EARN;
  const bonuses = e.checkInStreakBonuses.map((b) => `+${b.coins} every ${b.everyDays} days`).join(', ');
  const tiers = (t: readonly RankTier[]) => [...t].sort((a, b) => a.maxRank - b.maxRank).map((x) => (x.maxRank === 1 ? `${x.coins} for 1st` : `${x.coins} for top ${x.maxRank}`)).join(', ');
  return [
    { key: 'checkin', label: 'Check in once a day', coins: String(e.dailyCheckIn), capped: true },
    { key: 'checkin_streak', label: 'Check-in streak bonus', coins: bonuses, capped: false },
    { key: 'daily_challenge', label: 'Solve the daily challenge', coins: String(e.dailyChallenge), capped: true },
    { key: 'solved_milestone', label: 'Practice milestones (different questions right first time)', coins: e.solvedMilestones.map((m) => `${m.coins} at ${m.solved}`).join(', '), capped: false },
    { key: 'chapter_mastered', label: `Master a chapter (${CHAPTER_MASTERY.minDistinct}+ questions, ${Math.round(CHAPTER_MASTERY.accuracy * 100)}% first-try accuracy)`, coins: String(e.chapterMastered), capped: true },
    { key: 'test_submitted', label: 'Finish a series test (first time, at least half answered)', coins: String(e.testSubmitted), capped: true },
    { key: 'perfect_paper', label: 'Perfect paper', coins: String(e.perfectPaper), capped: true },
    { key: 'live_participation', label: 'Take a live All-India mock', coins: String(e.liveParticipation), capped: true },
    { key: 'live_rank', label: 'Live mock top ranks (with parent consent)', coins: tiers(e.liveRankTiers), capped: false },
    { key: 'league_promotion', label: 'Weekly league promotion', coins: String(e.leaguePromotion), capped: false },
    { key: 'league_top_finish', label: 'Weekly league top finish', coins: tiers(e.leagueTopFinishTiers), capped: false },
  ];
}

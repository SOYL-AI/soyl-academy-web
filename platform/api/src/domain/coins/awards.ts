/**
 * Where coins are earned (D-037, ADR-020). Hooks run inside the transaction of the learning event that
 * earns them, next to the XP awards (ARCHITECTURE §12), so an award and its event commit together:
 *
 *   check-in             POST /v1/coins/check-in (explicit; once per IST day; streak bonuses)
 *   practice             submitAnswer → onPracticeCorrect: daily challenge, solved milestones, chapter mastery
 *   tests                finalizeAttempt → onTestGraded: series test, perfect paper, live participation
 *   live ranks           worker `coins.live-rank-awards` → awardLiveRanks (after results are published)
 *   leagues              closeLeague → onLeagueClosed (promotion, top finish)
 *
 * Anti-grinding: practice counts distinct first-correct answers given in the app (`source = 'app'`);
 * tests need COIN_TEST_RULES.minAnsweredShare answered and pay once per test; custom tests pay nothing;
 * every key is unique in the ledger. Consent: rank and league awards only for consent `granted` (D-014).
 */
import { and, eq, gte, inArray, isNotNull, isNull, sql } from 'drizzle-orm';
import { chapters, coinLedger, coinWallets, consentStatus, istDay, liveEvents, liveRegistrations, practiceAnswers, users, type Database } from '@soyl/db';
import {
  CHAPTER_MASTERY,
  COIN_EARN,
  COIN_TEST_RULES,
  milestonesReached,
  rankTierCoins,
  streakBonusesFor,
  type RankTier,
} from '@soyl/shared/config/coins';
import { dayNumber } from '../gamification';
import { awardCoins, cappedEarnedOn, coinsPaid, lockWallet, type AwardOutcome, type Db, type Tx } from './ledger';

export interface CoinAwardDto {
  source: AwardOutcome['source'];
  amount: number;
  cappedOut: boolean;
}
export const toDto = (o: AwardOutcome[]): CoinAwardDto[] => o.map((x) => ({ source: x.source, amount: x.amount, cappedOut: x.cappedOut }));

/* Check-in --------------------------------------------------------------------------------------- */

export interface CheckInResult {
  day: string;
  alreadyCheckedIn: boolean;
  streak: number;
  longest: number;
  awards: CoinAwardDto[];
  coinsAwarded: number;
}

/** Once per IST day. A missed day restarts the check-in streak (no freezes: it is a separate habit from learning). */
export async function checkIn(db: Database, now: Date, userId: string): Promise<CheckInResult> {
  return db.transaction(async (tx) => {
    const w = await lockWallet(tx, userId);
    const day = istDay(now);
    const gap = w.lastCheckinIstDay ? dayNumber(day) - dayNumber(w.lastCheckinIstDay) : null;
    // Same day (or an earlier day on a skewed clock): nothing changes.
    if (gap !== null && gap <= 0) return { day, alreadyCheckedIn: true, streak: w.checkinStreak, longest: w.checkinLongest, awards: [], coinsAwarded: 0 };
    const streak = gap === 1 ? w.checkinStreak + 1 : 1;
    const longest = Math.max(w.checkinLongest, streak);
    await tx.update(coinWallets).set({ checkinStreak: streak, checkinLongest: longest, lastCheckinIstDay: day, updatedAt: now }).where(eq(coinWallets.userId, userId));
    const outcomes = await awardCoins(tx, userId, now, [
      { source: 'checkin', amount: COIN_EARN.dailyCheckIn, key: `checkin:${userId}:${day}`, metadata: { streakDays: streak } },
      ...streakBonusesFor(streak).map((b) => ({
        source: 'checkin_streak' as const,
        amount: b.coins,
        key: `checkin_streak:${userId}:${day}:${b.everyDays}`,
        metadata: { streakDays: streak, everyDays: b.everyDays },
      })),
    ]);
    return { day, alreadyCheckedIn: false, streak, longest, awards: toDto(outcomes), coinsAwarded: coinsPaid(outcomes) };
  });
}

/** The check-in streak as the student sees it today (a missed day shows 0 without writing). */
export function checkInView(w: { checkinStreak: number; checkinLongest: number; lastCheckinIstDay: string | null } | undefined, today: string) {
  if (!w?.lastCheckinIstDay) return { current: 0, longest: w?.checkinLongest ?? 0, checkedInToday: false, lastCheckInDay: null };
  const gap = dayNumber(today) - dayNumber(w.lastCheckinIstDay);
  return { current: gap <= 1 ? w.checkinStreak : 0, longest: w.checkinLongest, checkedInToday: gap <= 0, lastCheckInDay: w.lastCheckinIstDay };
}

/* Practice --------------------------------------------------------------------------------------- */

/** Distinct practice questions answered correctly in the app (guest-merged answers never count). */
export async function solvedCount(db: Db, userId: string): Promise<number> {
  const [r] = await db
    .select({ n: sql<number>`count(DISTINCT ${practiceAnswers.questionKey})::int` })
    .from(practiceAnswers)
    .where(and(eq(practiceAnswers.userId, userId), eq(practiceAnswers.correct, true), eq(practiceAnswers.source, 'app')));
  return Number(r?.n ?? 0);
}

/** First-try stats in one chapter: each question counts once, by the student's first checked app answer. */
export async function chapterFirstTry(db: Db, userId: string, chapterId: string): Promise<{ distinct: number; correct: number }> {
  const res = await db.execute<{ distinct: number; correct: number }>(sql`
    SELECT count(*)::int AS distinct, count(*) FILTER (WHERE correct)::int AS correct FROM (
      SELECT DISTINCT ON (question_key) question_key, correct
      FROM ${practiceAnswers}
      WHERE user_id = ${userId} AND chapter_id = ${chapterId} AND source = 'app' AND correct IS NOT NULL
      ORDER BY question_key, answered_at, id) firsts`);
  const r = res.rows[0];
  return { distinct: Number(r?.distinct ?? 0), correct: Number(r?.correct ?? 0) };
}

export const masteredBy = (s: { distinct: number; correct: number }) => s.distinct >= CHAPTER_MASTERY.minDistinct && s.correct / s.distinct >= CHAPTER_MASTERY.accuracy;

export interface PracticeCoinContext {
  userId: string;
  now: Date;
  questionKey: string;
  chapterId: string;
  chapterKey: string;
  /** Subject key of the chapter, and today's challenge question key for that subject (computed before the transaction). */
  subjectKey: string;
  challengeKey: string | null;
  /** The answer was right and is the student's first correct app answer to this question. */
  firstCorrect: boolean;
  correct: boolean;
}

/** Runs after a stored practice answer, in its transaction. */
export async function onPracticeAnswer(tx: Tx, c: PracticeCoinContext): Promise<AwardOutcome[]> {
  if (!c.correct) {
    // A wrong first try can still complete mastery's question count only together with accuracy: nothing to pay.
    return [];
  }
  await lockWallet(tx, c.userId);
  const day = istDay(c.now);
  const awards: Parameters<typeof awardCoins>[3] = [];

  if (c.challengeKey && c.challengeKey === c.questionKey) {
    const [done] = await tx
      .select({ n: sql<number>`count(*)::int` })
      .from(coinLedger)
      .where(and(eq(coinLedger.userId, c.userId), eq(coinLedger.istDay, day), eq(coinLedger.source, 'daily_challenge')));
    if (Number(done?.n ?? 0) < COIN_EARN.dailyChallengeAwardsPerDay)
      awards.push({
        source: 'daily_challenge',
        amount: COIN_EARN.dailyChallenge,
        key: `challenge:${c.userId}:${day}:${c.subjectKey}`,
        metadata: { subjectId: c.subjectKey, chapterId: c.chapterKey },
      });
  }

  if (c.firstCorrect) {
    const solved = await solvedCount(tx, c.userId);
    const paid = new Set(
      (await tx.select({ m: sql<number>`(${coinLedger.metadata}->>'milestone')::int` }).from(coinLedger).where(and(eq(coinLedger.userId, c.userId), eq(coinLedger.source, 'solved_milestone')))).map((r) => Number(r.m)),
    );
    for (const m of milestonesReached(solved, paid))
      awards.push({ source: 'solved_milestone', amount: m.coins, key: `milestone:${c.userId}:solved_${m.solved}`, metadata: { milestone: m.solved } });

    const first = await chapterFirstTry(tx, c.userId, c.chapterId);
    if (masteredBy(first))
      awards.push({ source: 'chapter_mastered', amount: COIN_EARN.chapterMastered, key: `chapter_mastered:${c.userId}:${c.chapterKey}`, metadata: { chapterId: c.chapterKey } });
  }
  return awardCoins(tx, c.userId, c.now, awards);
}

/* Tests ------------------------------------------------------------------------------------------ */

export interface TestCoinContext {
  userId: string;
  now: Date;
  testKey: string;
  testKind: string;
  liveEventId: string | null;
  answeredShare: number;
  perfect: boolean;
}

/** Runs in the grading transaction (finalizeAttempt), once per attempt; keys make retakes pay nothing. */
export async function onTestGraded(tx: Tx, c: TestCoinContext): Promise<AwardOutcome[]> {
  if (c.testKind === 'custom') return [];
  const awards: Parameters<typeof awardCoins>[3] = [];
  if (c.answeredShare >= COIN_TEST_RULES.minAnsweredShare) {
    if (c.liveEventId)
      awards.push({ source: 'live_participation', amount: COIN_EARN.liveParticipation, key: `live:${c.userId}:${c.liveEventId}`, metadata: { testKey: c.testKey } });
    else awards.push({ source: 'test_submitted', amount: COIN_EARN.testSubmitted, key: `test:${c.userId}:${c.testKey}`, metadata: { testKey: c.testKey } });
  }
  if (c.perfect) awards.push({ source: 'perfect_paper', amount: COIN_EARN.perfectPaper, key: `perfect:${c.userId}:${c.testKey}`, metadata: { testKey: c.testKey } });
  return awardCoins(tx, c.userId, c.now, awards);
}

/* Live ranks (worker) ---------------------------------------------------------------------------- */

export interface LiveRankAwardResult {
  events: number;
  awarded: number;
  coins: number;
  skippedNoConsent: number;
}

/**
 * For every live event whose results were published in the last `liveRankAwardWindowDays` and that had
 * at least `liveRankMinParticipants` ranked students: pay the rank tier to each ranked student whose
 * consent is `granted` (cached consent_status; D-014 — ranks are consent-gated). Idempotent per
 * (student, event); a student whose consent arrives later is paid on a later run inside the window.
 */
export async function awardLiveRanks(
  db: Database,
  now: Date,
  cfg: { tiers?: readonly RankTier[]; minParticipants?: number; windowDays?: number } = {},
): Promise<LiveRankAwardResult> {
  const tiers = cfg.tiers ?? COIN_EARN.liveRankTiers;
  const minParticipants = cfg.minParticipants ?? COIN_EARN.liveRankMinParticipants;
  const since = new Date(now.getTime() - (cfg.windowDays ?? COIN_EARN.liveRankAwardWindowDays) * 86_400_000);
  const maxRank = Math.max(0, ...tiers.map((t) => t.maxRank));
  const events = await db
    .select({ id: liveEvents.id })
    .from(liveEvents)
    .where(and(eq(liveEvents.status, 'results_published'), isNotNull(liveEvents.resultsPublishedAt), gte(liveEvents.resultsPublishedAt, since)));
  const result: LiveRankAwardResult = { events: 0, awarded: 0, coins: 0, skippedNoConsent: 0 };
  for (const ev of events) {
    const [count] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(liveRegistrations)
      .where(and(eq(liveRegistrations.liveEventId, ev.id), isNotNull(liveRegistrations.finalRank)));
    if (Number(count?.n ?? 0) < minParticipants) continue;
    result.events++;
    const ranked = await db
      .select({ userId: liveRegistrations.userId, rank: liveRegistrations.finalRank, consent: consentStatus.status })
      .from(liveRegistrations)
      .innerJoin(users, and(eq(users.id, liveRegistrations.userId), isNull(users.deletedAt)))
      .leftJoin(consentStatus, eq(consentStatus.userId, liveRegistrations.userId))
      .where(and(eq(liveRegistrations.liveEventId, ev.id), isNotNull(liveRegistrations.finalRank), sql`${liveRegistrations.finalRank} <= ${maxRank}`));
    for (const r of ranked) {
      const tier = rankTierCoins(r.rank, tiers);
      if (!tier) continue;
      if (r.consent !== 'granted') {
        result.skippedNoConsent++;
        continue;
      }
      const out = await db.transaction((tx) =>
        awardCoins(tx, r.userId, now, [{ source: 'live_rank', amount: tier.coins, key: `live_rank:${r.userId}:${ev.id}`, metadata: { rank: r.rank, tier: tier.maxRank } }]),
      );
      if (out.length) {
        result.awarded++;
        result.coins += coinsPaid(out);
      }
    }
  }
  return result;
}

/* Leagues ---------------------------------------------------------------------------------------- */

export interface LeagueStandingForCoins {
  userId: string;
  rank: number;
  xp: number;
  outcome: 'promoted' | 'stayed' | 'relegated';
}

/**
 * Runs in the league-close transaction: promotion and top-finish coins for members whose consent is
 * still `granted` (leagues are consent-gated, D-014) and who earned XP that week. Idempotent per league.
 */
export async function onLeagueClosed(tx: Tx, leagueId: string, now: Date, standings: LeagueStandingForCoins[]): Promise<number> {
  const eligible = standings.filter((s) => s.xp > 0 && (s.outcome === 'promoted' || rankTierCoins(s.rank, COIN_EARN.leagueTopFinishTiers)));
  if (!eligible.length) return 0;
  const granted = new Set(
    (await tx.select({ userId: consentStatus.userId }).from(consentStatus).where(and(inArray(consentStatus.userId, eligible.map((s) => s.userId)), eq(consentStatus.status, 'granted')))).map(
      (r) => r.userId,
    ),
  );
  let paid = 0;
  for (const s of eligible) {
    if (!granted.has(s.userId)) continue;
    const awards: Parameters<typeof awardCoins>[3] = [];
    if (s.outcome === 'promoted') awards.push({ source: 'league_promotion', amount: COIN_EARN.leaguePromotion, key: `league_promotion:${s.userId}:${leagueId}`, metadata: { rank: s.rank } });
    const tier = rankTierCoins(s.rank, COIN_EARN.leagueTopFinishTiers);
    if (tier) awards.push({ source: 'league_top_finish', amount: tier.coins, key: `league_top:${s.userId}:${leagueId}`, metadata: { rank: s.rank, tier: tier.maxRank } });
    paid += coinsPaid(await awardCoins(tx, s.userId, now, awards));
  }
  return paid;
}

/* Reads ------------------------------------------------------------------------------------------ */

/** Earn counts the store's eligibility rules need. */
export async function eligibilityStats(db: Db, userId: string) {
  const [r] = await db
    .select({
      bestLiveRank: sql<number | null>`(SELECT min((${coinLedger.metadata}->>'rank')::int) FROM ${coinLedger} WHERE ${coinLedger.userId} = ${userId} AND ${coinLedger.source} = 'live_rank')`,
      chaptersMastered: sql<number>`(SELECT count(*)::int FROM ${coinLedger} WHERE ${coinLedger.userId} = ${userId} AND ${coinLedger.source} = 'chapter_mastered')`,
      checkinLongest: sql<number>`coalesce((SELECT ${coinWallets.checkinLongest} FROM ${coinWallets} WHERE ${coinWallets.userId} = ${userId}), 0)`,
    })
    .from(sql`(SELECT 1) AS one`);
  return {
    bestLiveRank: r?.bestLiveRank === null || r?.bestLiveRank === undefined ? null : Number(r.bestLiveRank),
    chaptersMastered: Number(r?.chaptersMastered ?? 0),
    checkinLongest: Number(r?.checkinLongest ?? 0),
    solved: await solvedCount(db, userId),
  };
}

export { cappedEarnedOn };

/** Chapter id → subject key, for the practice hook (read before the transaction). */
export async function subjectKeyOfChapter(db: Database, chapterId: string): Promise<string | null> {
  const res = await db.execute<{ key: string }>(sql`SELECT s.key FROM ${chapters} c JOIN subjects s ON s.id = c.subject_id WHERE c.id = ${chapterId}`);
  return res.rows[0]?.key ?? null;
}

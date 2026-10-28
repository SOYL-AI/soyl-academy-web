/**
 * Gamification basics (ARCHITECTURE §12, CONTEXT §11): XP events, IST-day streaks with one freeze per
 * IST week, and a minimal badge set evaluated by the API after learning events (the worker takes over
 * badge evaluation when heavier criteria arrive). Numbers: platform/shared/config/gamification.ts.
 *
 * - XP is idempotent per (user, kind, source) — `xp_events_idempotency_unique` — so retries and
 *   replays never double-award. `streaks.total_xp`/`level` are recomputed from xp_events.
 * - A streak day is an IST calendar day with learning activity (a saved practice answer, a graded test or a lesson
 *   completion). One missed day per IST week (Monday–Sunday) is covered by the automatic freeze.
 * - Leaderboards/leagues are M3+ and consent-gated (D-014); nothing here is shown to other users.
 */
import { and, eq, inArray, sql } from 'drizzle-orm';
import { attempts, badges, istDay, lessonProgress, practiceAnswers, streaks, userBadges, xpEvents, type Database } from '@soyl/db';
import { BADGES, STREAK, levelForXp, type BadgeDefinition } from '@soyl/shared/config/gamification';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
type Db = Database | Tx;

/* IST calendar-day arithmetic on YYYY-MM-DD strings ------------------------------------------- */

const DAY_MS = 86_400_000;
export const dayNumber = (d: string) => Math.round(Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10))) / DAY_MS);
export const dayString = (n: number) => new Date(n * DAY_MS).toISOString().slice(0, 10);
/** IST Monday (YYYY-MM-DD) of the week containing day `d`. */
export function weekMonday(d: string): string {
  const n = dayNumber(d);
  const weekday = new Date(n * DAY_MS).getUTCDay(); // 0 = Sunday
  return dayString(n - ((weekday + 6) % 7));
}

/* XP --------------------------------------------------------------------------------------------- */

export interface XpAward {
  kind: (typeof xpEvents.$inferInsert)['kind'];
  amount: number;
  sourceType: string;
  sourceId: string;
}

/** Inserts XP events (idempotent); returns the XP actually awarded. Call refreshTotals afterwards. */
export async function awardXp(tx: Db, userId: string, now: Date, awards: XpAward[]): Promise<number> {
  const rows = awards.filter((a) => a.amount > 0);
  if (!rows.length) return 0;
  const inserted = await tx
    .insert(xpEvents)
    .values(rows.map((a) => ({ userId, ...a, istDay: istDay(now), createdAt: now, updatedAt: now })))
    .onConflictDoNothing()
    .returning({ amount: xpEvents.amount });
  return inserted.reduce((s, r) => s + r.amount, 0);
}

/** streaks.total_xp and level from the XP ledger (creates the row on first use). */
export async function refreshTotals(tx: Db, userId: string): Promise<{ totalXp: number; level: number }> {
  const [sum] = await tx.select({ xp: sql<number>`coalesce(sum(${xpEvents.amount}), 0)::int` }).from(xpEvents).where(eq(xpEvents.userId, userId));
  const totalXp = sum?.xp ?? 0;
  const { level } = levelForXp(totalXp);
  await tx
    .insert(streaks)
    .values({ userId, totalXp, level })
    .onConflictDoUpdate({ target: streaks.userId, set: { totalXp, level } });
  return { totalXp, level };
}

/* Streaks ---------------------------------------------------------------------------------------- */

export interface StreakView {
  current: number;
  longest: number;
  lastActiveDay: string | null;
  /** True when today is not yet counted and the streak survives only if the student learns today. */
  atRisk: boolean;
  freezeAvailableThisWeek: boolean;
}

type StreakRow = typeof streaks.$inferSelect;

/** Records learning activity on the IST day of `now` and returns the updated streak. */
export async function recordActivity(tx: Tx, userId: string, now: Date): Promise<StreakView> {
  const today = istDay(now);
  await tx.insert(streaks).values({ userId }).onConflictDoNothing();
  const [row] = await tx.select().from(streaks).where(eq(streaks.userId, userId)).for('update');
  const s = row!;
  if (s.lastActiveIstDay === today) return streakView(s, today);
  let current = 1;
  let freezeUsedWeek = s.freezeUsedWeek;
  if (s.lastActiveIstDay) {
    const gap = dayNumber(today) - dayNumber(s.lastActiveIstDay);
    if (gap === 1) current = s.currentDays + 1;
    else if (gap === 2 && STREAK.freezesPerWeek > 0) {
      const missed = dayString(dayNumber(today) - 1);
      if (s.freezeUsedWeek !== weekMonday(missed)) {
        current = s.currentDays + 1;
        freezeUsedWeek = weekMonday(missed);
      }
    } else if (gap <= 0) current = s.currentDays; // clock skew: never shrink on an earlier day
  }
  const longest = Math.max(s.longestDays, current);
  const [updated] = await tx
    .update(streaks)
    .set({ currentDays: current, longestDays: longest, lastActiveIstDay: today, freezeUsedWeek })
    .where(eq(streaks.userId, userId))
    .returning();
  return streakView(updated!, today);
}

/** What the student sees today (a broken streak shows as 0 without writing anything). */
export function streakView(s: Pick<StreakRow, 'currentDays' | 'longestDays' | 'lastActiveIstDay' | 'freezeUsedWeek'> | undefined, today: string): StreakView {
  const freezeAvailableThisWeek = !s?.freezeUsedWeek || s.freezeUsedWeek !== weekMonday(today);
  if (!s?.lastActiveIstDay) return { current: 0, longest: s?.longestDays ?? 0, lastActiveDay: null, atRisk: false, freezeAvailableThisWeek };
  const gap = dayNumber(today) - dayNumber(s.lastActiveIstDay);
  const missed = dayString(dayNumber(today) - 1);
  const alive = gap <= 1 || (gap === 2 && STREAK.freezesPerWeek > 0 && s.freezeUsedWeek !== weekMonday(missed));
  return {
    current: alive ? s.currentDays : 0,
    longest: s.longestDays,
    lastActiveDay: s.lastActiveIstDay,
    atRisk: alive && gap >= 1,
    freezeAvailableThisWeek,
  };
}

/* Badges ----------------------------------------------------------------------------------------- */

const synced = new WeakMap<object, Promise<Map<string, string>>>();

/** Upserts the configured badges once per database handle; returns key → badge id. */
export function ensureBadges(db: Database): Promise<Map<string, string>> {
  let p = synced.get(db);
  if (!p) {
    p = (async () => {
      for (const b of BADGES)
        await db
          .insert(badges)
          .values({ key: b.key, name: b.name, description: b.description, icon: b.icon, criteria: b.criteria })
          .onConflictDoUpdate({ target: badges.key, set: { name: b.name, description: b.description, icon: b.icon, criteria: b.criteria } });
      const rows = await db.select({ id: badges.id, key: badges.key }).from(badges).where(inArray(badges.key, BADGES.map((b) => b.key)));
      return new Map(rows.map((r) => [r.key, r.id]));
    })();
    p.catch(() => synced.delete(db));
    synced.set(db, p);
  }
  return p;
}

export async function learnerStats(tx: Db, userId: string) {
  const [r] = await tx.select({
    lessons: sql<number>`(SELECT count(*)::int FROM ${lessonProgress} WHERE ${lessonProgress.userId} = ${userId} AND ${lessonProgress.completedAt} IS NOT NULL)`,
    correct: sql<number>`(SELECT count(DISTINCT ${practiceAnswers.questionKey})::int FROM ${practiceAnswers} WHERE ${practiceAnswers.userId} = ${userId} AND ${practiceAnswers.correct})`,
    longest: sql<number>`coalesce((SELECT ${streaks.longestDays} FROM ${streaks} WHERE ${streaks.userId} = ${userId}), 0)`,
  }).from(sql`(SELECT 1) AS one`);
  return r!;
}

/** Test badges (M3): different tests graded, perfect papers, longest run of IST days with a graded test. */
export async function testStats(tx: Db, userId: string) {
  const [r] = await tx.select({
    tests: sql<number>`(SELECT count(DISTINCT ${attempts.testId})::int FROM ${attempts} WHERE ${attempts.userId} = ${userId} AND ${attempts.gradedAt} IS NOT NULL)`,
    perfect: sql<number>`(SELECT count(*)::int FROM ${xpEvents} WHERE ${xpEvents.userId} = ${userId} AND ${xpEvents.sourceType} = 'test_perfect')`,
    dayStreak: sql<number>`(SELECT coalesce(max(n), 0)::int FROM (
      SELECT count(*) AS n FROM (
        SELECT d, d - (row_number() OVER (ORDER BY d))::int AS grp FROM (
          SELECT DISTINCT (${attempts.submittedAt} AT TIME ZONE 'Asia/Kolkata')::date AS d FROM ${attempts}
          WHERE ${attempts.userId} = ${userId} AND ${attempts.gradedAt} IS NOT NULL) days) runs
      GROUP BY grp) streaks)`,
  }).from(sql`(SELECT 1) AS one`);
  return r!;
}

export async function chaptersMastered(tx: Db, userId: string, c: Extract<BadgeDefinition['criteria'], { kind: 'chapters_mastered' }>): Promise<number> {
  const rows = await tx
    .select({ chapterId: practiceAnswers.chapterId })
    .from(practiceAnswers)
    .where(and(eq(practiceAnswers.userId, userId), sql`${practiceAnswers.correct} IS NOT NULL`))
    .groupBy(practiceAnswers.chapterId)
    .having(sql`count(*) >= ${c.minAnswered} AND avg(CASE WHEN ${practiceAnswers.correct} THEN 1.0 ELSE 0.0 END) >= ${c.accuracy}`);
  return rows.length;
}

/** Awards newly earned badges; returns their keys. */
export async function evaluateBadges(db: Database, tx: Db, userId: string, now: Date): Promise<string[]> {
  const ids = await ensureBadges(db);
  const have = new Set((await tx.select({ badgeId: userBadges.badgeId }).from(userBadges).where(eq(userBadges.userId, userId))).map((r) => r.badgeId));
  const pending = BADGES.filter((b) => ids.has(b.key) && !have.has(ids.get(b.key)!));
  if (!pending.length) return [];
  const stats = await learnerStats(tx, userId);
  const needsTests = pending.some((b) => b.criteria.kind === 'tests_submitted' || b.criteria.kind === 'perfect_scores' || b.criteria.kind === 'test_day_streak');
  const tests = needsTests ? await testStats(tx, userId) : { tests: 0, perfect: 0, dayStreak: 0 };
  const earned: string[] = [];
  for (const b of pending) {
    const c = b.criteria;
    const ok =
      c.kind === 'lessons_completed' ? stats.lessons >= c.count
      : c.kind === 'practice_correct' ? stats.correct >= c.count
      : c.kind === 'streak_days' ? stats.longest >= c.count
      : c.kind === 'tests_submitted' ? tests.tests >= c.count
      : c.kind === 'perfect_scores' ? tests.perfect >= c.count
      : c.kind === 'test_day_streak' ? tests.dayStreak >= c.count
      : (await chaptersMastered(tx, userId, c)) >= c.count;
    if (ok) earned.push(b.key);
  }
  if (earned.length)
    await tx
      .insert(userBadges)
      .values(earned.map((k) => ({ userId, badgeId: ids.get(k)!, awardedAt: now })))
      .onConflictDoNothing();
  return earned;
}

export async function badgesFor(db: Database, userId: string) {
  const ids = await ensureBadges(db);
  const awarded = new Map(
    (await db.select({ badgeId: userBadges.badgeId, awardedAt: userBadges.awardedAt }).from(userBadges).where(eq(userBadges.userId, userId))).map((r) => [r.badgeId, r.awardedAt]),
  );
  return BADGES.map((b) => {
    const at = awarded.get(ids.get(b.key)!);
    return { key: b.key, name: b.name, description: b.description, icon: b.icon, awarded: !!at, awardedAt: at ? at.toISOString() : null };
  });
}

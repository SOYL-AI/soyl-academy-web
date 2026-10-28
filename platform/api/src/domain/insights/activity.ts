/**
 * GET /v1/me/activity: learning activity per IST calendar day (GEN-6) for a LeetCode-style heatmap.
 * Computed on read from practice_answers, lesson_progress and attempts (no new tables). Every query
 * is scoped to the caller (API-7) and uses a user_id-leading index.
 *
 * A day is "active" when it has a saved practice answer, a lesson part finished or a test submitted —
 * the same activity that counts for the streak (domain/gamification.ts recordActivity).
 */
import { eq, sql } from 'drizzle-orm';
import { istDay, streaks, type Database } from '@soyl/db';
import { ACTIVITY } from '@soyl/shared/config/learning';
import type { Clock } from '../../clock';
import { dayNumber, dayString, streakView } from '../gamification';
import { solvedAnswer } from '../practice';

export interface DayCounts {
  answered: number;
  solved: number;
  lessonsCompleted: number;
  testsSubmitted: number;
}

/** The instant an IST calendar day starts (00:00 Asia/Kolkata), as an ISO string. */
export const istDayStart = (day: string) => new Date(`${day}T00:00:00+05:30`).toISOString();
/** The IST day `n - 1` days before `to` (so the window [from, to] has n days). */
export const windowStart = (to: string, days: number) => dayString(dayNumber(to) - (days - 1));

/** SQL: the IST calendar day of a timestamptz column, as YYYY-MM-DD text. */
const IST_DAY = (col: string) => sql.raw(`to_char((${col} AT TIME ZONE '${ACTIVITY.timezone}')::date, 'YYYY-MM-DD')`);

/**
 * Activity counts per IST day from `fromDay` (inclusive; null = all time). `solved` counts a question
 * on the day it was first solved (auto-checked right or self-marked full marks), so solving it again
 * later does not count twice; guest-merged answers count on the day the guest answered.
 */
export async function activityByDay(db: Database, userId: string, fromDay: string | null): Promise<Map<string, DayCounts>> {
  const from = fromDay ? istDayStart(fromDay) : '-infinity';
  const [answered, solved, lessons, tests] = await Promise.all([
    db.execute<{ day: string; n: number }>(sql`
      SELECT ${IST_DAY('answered_at')} AS day, count(*)::int AS n FROM practice_answers
      WHERE user_id = ${userId} AND answered_at >= ${from}::timestamptz GROUP BY 1`),
    db.execute<{ day: string; n: number }>(sql`
      SELECT ${IST_DAY('first_solved')} AS day, count(*)::int AS n FROM (
        SELECT min(answered_at) FILTER (WHERE ${solvedAnswer('practice_answers')}) AS first_solved FROM practice_answers
        WHERE user_id = ${userId} GROUP BY question_key) f
      WHERE first_solved >= ${from}::timestamptz GROUP BY 1`),
    db.execute<{ day: string; n: number }>(sql`
      SELECT ${IST_DAY('completed_at')} AS day, count(*)::int AS n FROM lesson_progress
      WHERE user_id = ${userId} AND completed_at >= ${from}::timestamptz GROUP BY 1`),
    db.execute<{ day: string; n: number }>(sql`
      SELECT ${IST_DAY('submitted_at')} AS day, count(*)::int AS n FROM attempts
      WHERE user_id = ${userId} AND submitted_at >= ${from}::timestamptz GROUP BY 1`),
  ]);
  const out = new Map<string, DayCounts>();
  const add = (rows: { day: string; n: number }[], k: keyof DayCounts) => {
    for (const r of rows) {
      const d = out.get(r.day) ?? { answered: 0, solved: 0, lessonsCompleted: 0, testsSubmitted: 0 };
      d[k] += Number(r.n);
      out.set(r.day, d);
    }
  };
  add(answered.rows, 'answered');
  add(solved.rows, 'solved');
  add(lessons.rows, 'lessonsCompleted');
  add(tests.rows, 'testsSubmitted');
  return out;
}

/** Count of active IST days from `fromDay` on (null = all time). */
export async function activeDays(db: Database, userId: string, fromDay: string | null): Promise<number> {
  const from = fromDay ? istDayStart(fromDay) : '-infinity';
  const res = await db.execute<{ n: number }>(sql`
    SELECT count(*)::int AS n FROM (
      SELECT ${IST_DAY('answered_at')} FROM practice_answers WHERE user_id = ${userId} AND answered_at >= ${from}::timestamptz
      UNION SELECT ${IST_DAY('completed_at')} FROM lesson_progress WHERE user_id = ${userId} AND completed_at >= ${from}::timestamptz
      UNION SELECT ${IST_DAY('submitted_at')} FROM attempts WHERE user_id = ${userId} AND submitted_at >= ${from}::timestamptz) d`);
  return Number(res.rows[0]?.n ?? 0);
}

export async function activitySummary(db: Database, clock: Clock, userId: string, days: number) {
  const to = istDay(new Date(clock.now()));
  const from = windowStart(to, days);
  const [byDay, allTime, [s]] = await Promise.all([activityByDay(db, userId, from), activeDays(db, userId, null), db.select().from(streaks).where(eq(streaks.userId, userId))]);
  const calendar = [...byDay.entries()]
    // A row after "today" (clock skew; never expected) stays out of the window.
    .filter(([day, d]) => day <= to && d.answered + d.lessonsCompleted + d.testsSubmitted > 0)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, d]) => ({ date, ...d, total: d.answered + d.lessonsCompleted + d.testsSubmitted }));
  const totals = { answered: 0, solved: 0, lessonsCompleted: 0, testsSubmitted: 0, activeDays: calendar.length };
  for (const d of calendar) {
    totals.answered += d.answered;
    totals.solved += d.solved;
    totals.lessonsCompleted += d.lessonsCompleted;
    totals.testsSubmitted += d.testsSubmitted;
  }
  return { timezone: ACTIVITY.timezone, from, to, days, calendar, totals, streak: streakView(s, to), activeDaysAllTime: allTime };
}

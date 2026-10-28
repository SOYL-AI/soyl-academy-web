/**
 * Bonus credits for learning (D-044; config @soyl/shared/config/credit-bonuses, DAILY_PRACTICE_GOAL in
 * @soyl/shared/config/learning).
 *
 *   bonus_goal    +10 on the IST day the daily practice goal is met (10 questions first solved that day).
 *                 Checked after a practice answer or self-mark that solves a question is committed
 *                 (follow-up, so concurrent answers each see every committed solve; the last one grants).
 *   bonus_streak  +5 on each 7-day streak milestone, checked inside recordActivity when the streak day is
 *                 recorded (under the streak row lock).
 *
 * Both are rows in `credit_ledger` for that IST day, so they count towards that day's balance only and
 * lapse at the 00:00 IST reset with the daily grant (no rollover). The partial unique index
 * `credit_ledger_one_bonus_per_day` (migration 0014) makes a second grant for the same rule and day insert
 * nothing, so concurrent triggers are idempotent. A bonus row is positive, so it can never make a balance
 * negative and needs no wallet lock.
 *
 * Only students allowed to use AI earn bonuses: consent `granted` (cached consent_status, D-014/D-039,
 * as for coin rewards). Purchases and SOYL Coins never grant credits (D-037).
 */
import { and, eq, inArray, sql } from 'drizzle-orm';
import { consentStatus, creditLedger, istDay, type Database } from '@soyl/db';
import { CREDIT_BONUSES, CREDIT_BONUS_KINDS, isStreakMilestone, type CreditBonusKind } from '@soyl/shared/config/credit-bonuses';
import { DAILY_PRACTICE_GOAL } from '@soyl/shared/config/learning';

type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
type Exec = Database | Tx;

/** A bonus that was just granted (practice answer responses carry these for a toast). */
export interface CreditBonusAward {
  kind: CreditBonusKind;
  credits: number;
  label: string;
}

const RULE_BY_KIND = {
  bonus_goal: CREDIT_BONUSES.dailyGoal,
  bonus_streak: CREDIT_BONUSES.streakMilestone,
} as const satisfies Record<CreditBonusKind, { kind: CreditBonusKind; action: string; label: string; credits: number }>;

export const bonusLabel = (kind: string): string | null => (kind in RULE_BY_KIND ? RULE_BY_KIND[kind as CreditBonusKind].label : null);

/** The instant an IST calendar day starts, and the next day's start. */
function istBounds(day: string): { start: string; end: string } {
  const start = new Date(`${day}T00:00:00+05:30`);
  return { start: start.toISOString(), end: new Date(start.getTime() + 86_400_000).toISOString() };
}

/** D-014/D-039: only consent `granted` (the cached status, as for coin rewards). */
export async function bonusEligible(db: Exec, userId: string): Promise<boolean> {
  const [c] = await db.select({ status: consentStatus.status }).from(consentStatus).where(eq(consentStatus.userId, userId));
  return c?.status === 'granted';
}

/** Bonus kinds already granted to the user on `day`. */
export async function bonusesOn(db: Exec, userId: string, day: string): Promise<Map<CreditBonusKind, number>> {
  const rows = await db
    .select({ kind: creditLedger.kind, amount: creditLedger.amount })
    .from(creditLedger)
    .where(and(eq(creditLedger.userId, userId), eq(creditLedger.istDay, day), inArray(creditLedger.kind, [...CREDIT_BONUS_KINDS])));
  return new Map(rows.map((r) => [r.kind as CreditBonusKind, r.amount]));
}

/**
 * Inserts one bonus row for (user, kind, day) unless it exists (unique index). Checks consent first.
 * Returns the award when this call wrote it, null otherwise.
 */
export async function grantBonus(db: Exec, userId: string, kind: CreditBonusKind, now: Date, metadata: Record<string, unknown>): Promise<CreditBonusAward | null> {
  if (!(await bonusEligible(db, userId))) return null;
  const rule = RULE_BY_KIND[kind];
  const inserted = await db
    .insert(creditLedger)
    .values({ userId, kind, amount: rule.credits, action: rule.action, istDay: istDay(now), metadata, createdAt: now })
    .onConflictDoNothing()
    .returning({ id: creditLedger.id });
  return inserted.length ? { kind, credits: rule.credits, label: rule.label } : null;
}

/**
 * Questions first solved on IST `day` (D-042 "solved"; a question counts once, on the day of its first
 * solving answer — the weekly goal and heatmap definition). The day's solving answer must be one the
 * student made in the app: guest-merged answers carry device timestamps, so they never earn credits.
 */
export async function solvedOnDay(db: Exec, userId: string, day: string): Promise<number> {
  const { start, end } = istBounds(day);
  const solved = sql.raw(`(pa.correct IS TRUE OR (pa.grading = 'self' AND pa.marks_awarded IS NOT NULL AND pa.marks_awarded >= pa.max_marks))`);
  const r = await db.execute<{ n: number }>(sql`
    SELECT count(*)::int AS n FROM (
      SELECT pa.question_key FROM practice_answers pa
      WHERE pa.user_id = ${userId} AND ${solved}
        AND pa.question_key IN (
          SELECT pa.question_key FROM practice_answers pa
          WHERE pa.user_id = ${userId} AND pa.source = 'app' AND pa.answered_at >= ${start}::timestamptz AND pa.answered_at < ${end}::timestamptz AND ${solved})
      GROUP BY pa.question_key
      HAVING min(pa.answered_at) >= ${start}::timestamptz AND min(pa.answered_at) < ${end}::timestamptz) f`);
  return Number(r.rows[0]?.n ?? 0);
}

/**
 * Follow-up after a solving practice answer or self-mark is committed: grants `bonus_goal` once the
 * day's solves reach DAILY_PRACTICE_GOAL.target. Cheap exits first: already granted today, then consent.
 */
export async function checkDailyGoal(db: Database, userId: string, now: Date, target: number = DAILY_PRACTICE_GOAL.target): Promise<CreditBonusAward | null> {
  const day = istDay(now);
  if ((await bonusesOn(db, userId, day)).has('bonus_goal')) return null;
  if (!(await bonusEligible(db, userId))) return null;
  const solved = await solvedOnDay(db, userId, day);
  if (solved < target) return null;
  return grantBonus(db, userId, 'bonus_goal', now, { solved, target });
}

/** Inside recordActivity, after the streak day is recorded: +5 on days 7, 14, 21, … of the streak. */
export async function checkStreakMilestone(tx: Tx, userId: string, streakDays: number, now: Date): Promise<CreditBonusAward | null> {
  if (!isStreakMilestone(streakDays)) return null;
  return grantBonus(tx, userId, 'bonus_streak', now, { streakDays });
}

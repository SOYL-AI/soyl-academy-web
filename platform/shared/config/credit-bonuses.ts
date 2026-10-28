/**
 * Bonus AI credits for learning (D-044, CONTEXT §6). Owner-tunable; no imports (the web imports this file).
 *
 * - `bonus_goal`: +credits on the IST day the student's **daily practice goal** is met
 *   (DAILY_PRACTICE_GOAL in learning.ts: questions first solved that IST day, D-042 "solved").
 * - `bonus_streak`: +credits on each streak milestone (every `everyDays` days: 7, 14, 21, …), granted when
 *   the streak day is recorded.
 *
 * Rules (enforced by the API and the database):
 * - Same IST day only: a bonus row counts towards that day's balance, so it lapses at the 00:00 IST reset
 *   like the daily grant (no rollover).
 * - At most one row per rule per student per IST day (unique index `credit_ledger_one_bonus_per_day`,
 *   migration 0014), so concurrent triggers are idempotent.
 * - Only for students allowed to use AI (consent `granted`, D-014/D-039). Others earn nothing and the
 *   guide shows them nothing.
 * - Never from SOYL Coins, coin redemption or purchases (D-037): coins never convert to credits.
 */

/** Ledger kinds of the bonus rows (credit_ledger.kind). */
export const CREDIT_BONUS_KINDS = ['bonus_goal', 'bonus_streak'] as const;
export type CreditBonusKind = (typeof CREDIT_BONUS_KINDS)[number];

export interface CreditBonusRule {
  kind: CreditBonusKind;
  /** credit_ledger.action of the row. */
  action: string;
  /** Student-facing label (history, toast). */
  label: string;
  credits: number;
}

export const CREDIT_BONUSES = {
  dailyGoal: { kind: 'bonus_goal', action: 'daily_practice_goal', label: 'Daily practice goal bonus', credits: 10 },
  streakMilestone: { kind: 'bonus_streak', action: 'streak_milestone', label: 'Streak milestone bonus', credits: 5, everyDays: 7 },
} as const satisfies { dailyGoal: CreditBonusRule; streakMilestone: CreditBonusRule & { everyDays: number } };

/** True on streak days 7, 14, 21, … (CREDIT_BONUSES.streakMilestone.everyDays). */
export function isStreakMilestone(streakDays: number, everyDays: number = CREDIT_BONUSES.streakMilestone.everyDays): boolean {
  return Number.isInteger(streakDays) && streakDays > 0 && everyDays > 0 && streakDays % everyDays === 0;
}

/** The next milestone strictly after `streakDays` (0 → 7, 7 → 14, 13 → 14). */
export function nextStreakMilestone(streakDays: number, everyDays: number = CREDIT_BONUSES.streakMilestone.everyDays): number {
  const d = Math.max(0, Math.floor(streakDays));
  return (Math.floor(d / everyDays) + 1) * everyDays;
}

/** GET /v1/me/credits/history?days=: per-IST-day usage (default and maximum window). */
export const CREDIT_HISTORY = { defaultDays: 14, maxDays: 31 } as const;

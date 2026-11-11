/**
 * The midnight refill (docs/redesign-ink-and-wash.md §4, device 5): the free daily AI allowance, drawn as painted
 * drops by components/ink/CreditsMeter, and the rules that refill it. Every number is read from config:
 * - the allowance: the Free plan's `creditsPerDay` (platform/shared/config/plans.ts, D-044);
 * - when it refills: 00:00 in `CREDIT_RESET_TIME_ZONE`, no rollover (platform/shared/config/credits.ts);
 * - the learning bonuses: `CREDIT_BONUSES` (platform/shared/config/credit-bonuses.ts), same IST day only.
 */
import { CREDIT_BONUSES } from '@/platform/shared/config/credit-bonuses';
import { CREDIT_RESET_TIME_ZONE } from '@/platform/shared/config/credits';
import { getPlan } from '@/platform/shared/config/plans';

/** Time zones as a parent would name them. An unknown zone is shown by its IANA name rather than guessed. */
const ZONE_NAMES: Record<string, string> = { 'Asia/Kolkata': 'India time' };

export function zoneName(timeZone: string): string {
  return ZONE_NAMES[timeZone] ?? timeZone;
}

export interface Bonus {
  credits: number;
  /** "the day the daily practice goal is met" */
  when: string;
}

export interface Refill {
  /** Free AI credits a logged-in student gets every day. */
  freePerDay: number;
  /** "midnight, India time" */
  refillsAt: string;
  bonuses: Bonus[];
}

export function midnightRefill(): Refill {
  const goal = CREDIT_BONUSES.dailyGoal;
  const streak = CREDIT_BONUSES.streakMilestone;
  return {
    freePerDay: getPlan('free').creditsPerDay,
    refillsAt: `midnight, ${zoneName(CREDIT_RESET_TIME_ZONE)}`,
    bonuses: [
      { credits: goal.credits, when: 'the day the daily practice goal is met' },
      { credits: streak.credits, when: `every ${streak.everyDays}-day streak` },
    ],
  };
}

/**
 * How many drops draw `credits`: one drop a credit up to 60, so the free allowance is counted drop by drop;
 * above that one drop stands for 5 or 10 credits, so a meter never runs to hundreds of drops.
 */
export function drops(credits: number): { count: number; perDrop: number } {
  const n = Math.max(0, Math.floor(credits));
  const perDrop = n <= 60 ? 1 : n <= 300 ? 5 : 10;
  return { count: Math.ceil(n / perDrop), perDrop };
}

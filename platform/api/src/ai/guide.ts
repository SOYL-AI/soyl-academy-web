/**
 * GET /v1/me/credits/guide (D-044 "What can I do with my credits?"): every AI action with its price, the
 * plans that offer it and how many the student can still do today, plus the learning bonuses. Pure
 * config + today's balance + two small reads (the goal and streak progress); nothing is written except
 * the lazy daily grant that every balance read does.
 *
 * Bonuses are shown only to students who can earn them (consent `granted`, D-014/D-039); for everyone
 * else `bonuses` is null ("non-consented accounts earn nothing and see nothing").
 */
import { eq } from 'drizzle-orm';
import { istDay, streaks, type Database } from '@soyl/db';
import { AI_ACTIONS, AI_ACTION_IDS, actionAllowedOnPlan, minCredits } from '@soyl/shared/config/ai-actions';
import { CREDIT_BONUSES, nextStreakMilestone } from '@soyl/shared/config/credit-bonuses';
import { CREDIT_VALUE_PAISE } from '@soyl/shared/config/credits';
import { DAILY_PRACTICE_GOAL } from '@soyl/shared/config/learning';
import { PLANS } from '@soyl/shared/config/plans';
import type { Clock } from '../clock';
import { streakView } from '../domain/gamification';
import { bonusEligible, bonusesOn, solvedOnDay } from './bonuses';
import type { CreditService } from './credits';

export interface CreditGuideBonuses {
  dailyGoal: { credits: number; target: number; solvedToday: number; earnedToday: boolean };
  streakMilestone: { credits: number; everyDays: number; currentStreak: number; nextMilestone: number; earnedToday: boolean };
}

export interface GuideDeps {
  db: Database;
  clock: Clock;
  credits: CreditService;
  plansUrl: string;
}

export async function creditGuide(d: GuideDeps, userId: string) {
  const b = await d.credits.balance(userId);
  const now = new Date(d.clock.now());
  const day = istDay(now);
  const plans = [...PLANS].sort((x, y) => x.order - y.order);
  const current = plans.find((p) => p.id === b.plan)!;

  const actions = AI_ACTION_IDS.map((id) => {
    const a = AI_ACTIONS[id];
    const unit = minCredits(a);
    const allowed = actionAllowedOnPlan(a, current);
    return {
      action: id,
      label: a.label,
      guide: a.guide,
      credits: unit,
      perAnswer: a.pricing.kind === 'per_answer',
      maxCredits: a.pricing.kind === 'flat' ? a.pricing.credits : a.pricing.maxCredits,
      mode: a.mode,
      requiresUpload: a.uploadKinds.length > 0,
      allowedForPlan: allowed,
      /** "≈ 7 hard doubts left today": whole actions today's balance pays for (0 when the plan lacks it). */
      remainingToday: allowed ? Math.floor(Math.max(0, b.balance) / unit) : 0,
      /** How many a day each plan's daily credits pay for (bonuses not included); only plans that offer it. */
      perDay: plans.filter((p) => actionAllowedOnPlan(a, p)).map((p) => ({ plan: p.id, count: Math.floor(p.creditsPerDay / unit) })),
    };
  });

  let bonuses = null;
  if (await bonusEligible(d.db, userId)) {
    const [granted, solvedToday, [s]] = await Promise.all([
      bonusesOn(d.db, userId, day),
      solvedOnDay(d.db, userId, day),
      d.db.select().from(streaks).where(eq(streaks.userId, userId)),
    ]);
    const streak = streakView(s, day);
    bonuses = {
      dailyGoal: {
        credits: CREDIT_BONUSES.dailyGoal.credits,
        target: DAILY_PRACTICE_GOAL.target,
        solvedToday,
        earnedToday: granted.has('bonus_goal'),
      },
      streakMilestone: {
        credits: CREDIT_BONUSES.streakMilestone.credits,
        everyDays: CREDIT_BONUSES.streakMilestone.everyDays,
        currentStreak: streak.current,
        /** The next streak length that earns the bonus (7, 14, …). */
        nextMilestone: nextStreakMilestone(streak.current),
        earnedToday: granted.has('bonus_streak'),
      },
    };
  }

  return {
    plan: b.plan,
    planName: b.planName,
    dailyCredits: b.dailyCredits,
    balance: b.balance,
    bonusToday: b.bonusToday,
    creditValuePaise: CREDIT_VALUE_PAISE,
    day: b.day,
    resetAt: b.resetAt.toISOString(),
    resetInSeconds: b.resetInSeconds,
    plansUrl: d.plansUrl,
    plans: plans.map((p) => ({ id: p.id, name: p.name, creditsPerDay: p.creditsPerDay })),
    actions,
    bonuses,
  };
}

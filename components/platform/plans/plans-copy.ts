/**
 * /plans "How AI credits work" copy (D-044). Every number comes from config: daily credits from the plans the API
 * returns (platform/shared/config/plans.ts), prices from AI_ACTIONS (ai-actions.ts) and the learning bonuses from
 * CREDIT_BONUSES (credit-bonuses.ts). Nothing here hard-codes an allowance or a price (unit test).
 */
import { AI_ACTIONS, quoteCredits, type AiActionId } from '@/platform/shared/config/ai-actions';
import { CREDIT_BONUSES } from '@/platform/shared/config/credit-bonuses';

const credits = (n: number) => `${n} credit${n === 1 ? '' : 's'}`;

/** Actions shown as examples, cheapest first. */
const EXAMPLES: readonly AiActionId[] = ['quick-doubt', 'explain-slide', 'hard-doubt', 'photo-doubt', 'evaluate-answer'];

export interface PlanLike {
  id: string;
  name: string;
  creditsPerDay: number;
}

export function allowanceLine(plans: readonly PlanLike[]): string {
  const free = plans.find((p) => p.id === 'free');
  const paid = plans.filter((p) => p.id !== 'free');
  const head = free ? `Every logged-in student gets ${free.creditsPerDay} free AI credits a day` : 'Every logged-in student gets free AI credits every day';
  return paid.length ? `${head}; ${paid.map((p) => `${p.name} gives ${p.creditsPerDay}`).join(', ')}.` : `${head}.`;
}

export function priceExamples(): string[] {
  return EXAMPLES.map((id) => {
    const a = AI_ACTIONS[id];
    return `${a.label}: ${credits(quoteCredits(a))}${a.pricing.kind === 'per_answer' ? ' per answer' : ''}`;
  });
}

export function bonusCopy(): string {
  const g = CREDIT_BONUSES.dailyGoal;
  const st = CREDIT_BONUSES.streakMilestone;
  return `Learning earns bonus credits too: +${g.credits} on the day you meet your daily practice goal and +${st.credits} on every ${st.everyDays}-day streak. Credits reset at midnight (India time); they do not roll over.`;
}

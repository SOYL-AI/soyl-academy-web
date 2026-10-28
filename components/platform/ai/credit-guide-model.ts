/**
 * View-models for the D-044 credits UI (pure; tested): the "What can I do with my credits?" guide
 * (GET /v1/me/credits/guide), the bonus lines, the bonus-credit toast (creditBonuses[] on practice answers) and
 * the per-IST-day usage history (GET /v1/me/credits/history). Every number comes from the API, which reads it from
 * config (plans.ts, ai-actions.ts, credit-bonuses.ts); nothing here hard-codes a price or an allowance.
 */
import type { CreditBonusAward, CreditGuide, CreditHistory } from '@/platform/shared/api-client';

type GuideAction = CreditGuide['actions'][number];

/** "1 credit", "7 credits". */
export function credits(n: number): string {
  return `${n} credit${n === 1 ? '' : 's'}`;
}

/** "the Pro and Board Exam Pass plans", "the Pro plan". */
export function planList(names: readonly string[]): string {
  if (names.length === 0) return 'a paid plan';
  const list = names.length === 1 ? names[0]! : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  return `the ${list} plan${names.length === 1 ? '' : 's'}`;
}

export function priceText(a: Pick<GuideAction, 'credits' | 'perAnswer' | 'maxCredits'>): string {
  return a.perAnswer ? `${credits(a.credits)} per answer, at most ${a.maxCredits} a paper` : credits(a.credits);
}

export interface GuideRow {
  action: GuideAction['action'];
  label: string;
  guide: string;
  price: string;
  allowed: boolean;
  /** "≈ 7 left today", "Not enough credits left today", "Part of the Pro and Board Exam Pass plans". */
  left: string;
}

export function guideRows(g: Pick<CreditGuide, 'actions' | 'plans'>): GuideRow[] {
  const nameOf = new Map(g.plans.map((p) => [p.id, p.name]));
  return g.actions.map((a) => ({
    action: a.action,
    label: a.label,
    guide: a.guide,
    price: priceText(a),
    allowed: a.allowedForPlan,
    left: !a.allowedForPlan
      ? `Part of ${planList(a.perDay.map((p) => nameOf.get(p.plan) ?? p.plan))}`
      : a.remainingToday > 0
        ? `≈ ${a.remainingToday} left today`
        : 'Not enough credits left today',
  }));
}

/** "50 credits left today (10 of them bonus credits) on Free." */
export function balanceLine(g: Pick<CreditGuide, 'balance' | 'bonusToday' | 'planName'>): string {
  return `${credits(g.balance)} left today${g.bonusToday > 0 ? ` (including ${g.bonusToday} bonus)` : ''} on ${g.planName}.`;
}

export interface BonusLine {
  key: 'dailyGoal' | 'streakMilestone';
  title: string;
  detail: string;
  earned: boolean;
  /** Progress for a bar: current of target. */
  current: number;
  target: number;
}

/** The two learning bonuses with today's progress; [] without consent (the API sends `bonuses: null`). */
export function bonusLines(g: Pick<CreditGuide, 'bonuses'>): BonusLine[] {
  if (!g.bonuses) return [];
  const { dailyGoal: goal, streakMilestone: st } = g.bonuses;
  const sinceLast = st.currentStreak - (st.nextMilestone - st.everyDays);
  return [
    {
      key: 'dailyGoal',
      title: `+${credits(goal.credits).replace('credit', 'AI credit')} for hitting today's practice goal`,
      detail: goal.earnedToday ? 'Earned today. Well done!' : `Solve ${goal.target} practice questions today: ${Math.min(goal.solvedToday, goal.target)} of ${goal.target} so far.`,
      earned: goal.earnedToday,
      current: goal.earnedToday ? goal.target : Math.min(goal.solvedToday, goal.target),
      target: goal.target,
    },
    {
      key: 'streakMilestone',
      title: `+${credits(st.credits).replace('credit', 'AI credit')} on every ${st.everyDays}-day streak`,
      detail: st.earnedToday ? `Earned today for your ${st.currentStreak}-day streak.` : `Your streak: ${st.currentStreak} day${st.currentStreak === 1 ? '' : 's'}. Next bonus at ${st.nextMilestone} days.`,
      earned: st.earnedToday,
      current: st.earnedToday ? st.everyDays : Math.max(0, Math.min(st.everyDays, sinceLast)),
      target: st.everyDays,
    },
  ];
}

/** The toast for a bonus award: "+10 AI credits for hitting today's practice goal". */
export function bonusToastText(award: Pick<CreditBonusAward, 'kind' | 'credits'>): string {
  const n = `+${award.credits} AI credit${award.credits === 1 ? '' : 's'}`;
  return award.kind === 'bonus_goal' ? `${n} for hitting today's practice goal` : `${n} for your learning streak`;
}

/* History ---------------------------------------------------------------------------------------- */

export interface HistoryRow {
  day: string;
  /** "Mon 26 Oct" */
  label: string;
  /** "26" (axis) */
  short: string;
  granted: number;
  bonus: number;
  spent: number;
  refunded: number;
  received: number;
}

/** IST calendar day 'YYYY-MM-DD' → "Mon 26 Oct" (the date itself, no time-zone shift). */
export function dayName(day: string): string {
  const [y, m, d] = day.split('-').map(Number);
  if (!y || !m || !d) return day;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function historyRows(h: Pick<CreditHistory, 'days'>): HistoryRow[] {
  return h.days.map((d) => ({
    day: d.day,
    label: dayName(d.day),
    short: String(Number(d.day.slice(8, 10))),
    granted: d.granted,
    bonus: d.bonus,
    spent: d.spent,
    refunded: d.refunded,
    received: d.granted + d.bonus,
  }));
}

export function historySummary(rows: readonly HistoryRow[]): string {
  if (rows.length === 0) return 'No credit history yet.';
  const sum = (k: 'received' | 'bonus' | 'spent' | 'refunded') => rows.reduce((n, r) => n + r[k], 0);
  const used = rows.filter((r) => r.spent > 0).length;
  return `Last ${rows.length} days: ${sum('received')} credits received (${sum('bonus')} of them bonus), ${sum('spent')} used on ${used} day${used === 1 ? '' : 's'}, ${sum('refunded')} refunded.`;
}

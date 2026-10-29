/**
 * What a practice answer earned, said and shown (lazy: loaded the first time an answer earns something, so the
 * lesson and practice pages do not carry it up front):
 * - badges → "New badge!" toast with the badge names, and the badge celebration;
 * - a level reached (XP before + XP awarded crosses a LEVEL_THRESHOLDS step) → toast and level celebration;
 * - D-044 bonus credits (`creditBonuses[]`) → "+10 AI credits for hitting today's practice goal" toast, the goal
 *   (or bonus) celebration, and the header credit chip refreshed.
 */
import type { CreditBonusAward } from '@/platform/shared/api-client';
import { BADGES, levelForXp } from '@/platform/shared/config/gamification';
import { bonusToastText } from '../ai/credit-guide-model';
import { celebrate } from './events';

interface ToastLike {
  show: (o: { title: string; description?: string; tone?: 'neutral' | 'success' | 'danger' }) => number;
}

export interface RewardResult {
  xpAwarded: number;
  badgesAwarded: readonly string[];
  creditBonuses?: readonly CreditBonusAward[];
}

export interface RewardDeps {
  toast: ToastLike;
  /** Total XP before this answer, when known (members). */
  xpBefore: number | null;
  refreshCredits?: () => unknown;
}

export function badgeName(key: string): string {
  return BADGES.find((b) => b.key === key)?.name ?? key;
}

/** The level reached by this answer, or null. */
export function levelUp(xpBefore: number | null, xpAwarded: number): number | null {
  if (xpBefore === null || !(xpAwarded > 0)) return null;
  const before = levelForXp(xpBefore).level;
  const after = levelForXp(xpBefore + xpAwarded).level;
  return after > before ? after : null;
}

export function announceRewards(res: RewardResult, deps: RewardDeps): void {
  if (res.badgesAwarded.length) {
    deps.toast.show({ title: 'New badge!', description: res.badgesAwarded.map(badgeName).join(', '), tone: 'success' });
    const first = res.badgesAwarded[0]!;
    celebrate({ kind: 'badge', badge: first, name: badgeName(first) });
  }
  const level = levelUp(deps.xpBefore, res.xpAwarded);
  if (level !== null) {
    deps.toast.show({ title: `Level ${level} reached!`, description: 'Keep learning to unlock more avatars.', tone: 'success' });
    celebrate({ kind: 'level', level });
  }
  const bonuses = res.creditBonuses ?? [];
  for (const b of bonuses) deps.toast.show({ title: bonusToastText(b), tone: 'success' });
  const goal = bonuses.find((b) => b.kind === 'bonus_goal');
  if (goal) celebrate({ kind: 'goal', credits: goal.credits });
  else if (bonuses[0]) celebrate({ kind: 'bonus', credits: bonuses[0].credits });
  if (bonuses.length) void deps.refreshCredits?.();
}

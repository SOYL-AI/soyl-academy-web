import { describe, expect, it } from 'vitest';
import { CREDIT_BONUSES, CREDIT_BONUS_KINDS, CREDIT_HISTORY, isStreakMilestone, nextStreakMilestone } from './credit-bonuses';
import { DAILY_PRACTICE_GOAL } from './learning';

describe('credit bonuses (D-044)', () => {
  it('are +10 for the daily practice goal (10 questions solved in an IST day) and +5 every 7 streak days', () => {
    expect(CREDIT_BONUSES.dailyGoal).toMatchObject({ kind: 'bonus_goal', credits: 10 });
    expect(CREDIT_BONUSES.streakMilestone).toMatchObject({ kind: 'bonus_streak', credits: 5, everyDays: 7 });
    expect(DAILY_PRACTICE_GOAL).toMatchObject({ metric: 'questions_solved', target: 10 });
    expect([...CREDIT_BONUS_KINDS].sort()).toEqual([CREDIT_BONUSES.dailyGoal.kind, CREDIT_BONUSES.streakMilestone.kind].sort());
    expect(CREDIT_HISTORY.defaultDays).toBe(14);
    expect(CREDIT_HISTORY.maxDays).toBeGreaterThanOrEqual(CREDIT_HISTORY.defaultDays);
  });

  it('streak milestones are 7, 14, 21, …', () => {
    expect([0, 1, 6, 7, 8, 13, 14, 21, 22, 28].filter((d) => isStreakMilestone(d))).toEqual([7, 14, 21, 28]);
    expect(isStreakMilestone(-7)).toBe(false);
    expect(isStreakMilestone(7.5)).toBe(false);
    expect([0, 1, 6, 7, 13, 14].map((d) => nextStreakMilestone(d))).toEqual([7, 7, 7, 14, 14, 21]);
  });
});

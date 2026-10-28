import { describe, expect, it } from 'vitest';
import { BADGES } from '../config/gamification';
import { DASHBOARD } from '../config/learning';
import {
  accuracy,
  addDays,
  badgeProgress,
  dashboardWindows,
  dayRuns,
  effectiveWeeklyGoal,
  istWeek,
  latestEvents,
  levelCounts,
  nextBadge,
  percentOf,
  pickFocus,
  reallyAttempted,
  testPercentSummary,
  weeklyGoalView,
  type BadgeStats,
  type FocusCandidate,
} from './dashboard';

const NONE: BadgeStats = { lessonsCompleted: 0, practiceCorrect: 0, currentStreak: 0, testsGraded: 0, perfectScores: 0, testDayRun: 0, chaptersMastered: 0 };

describe('IST weeks and windows', () => {
  it('weeks run Monday–Sunday', () => {
    // 2026-11-02 is a Monday, 2026-11-08 a Sunday.
    expect(istWeek('2026-11-02')).toEqual({ from: '2026-11-02', to: '2026-11-08' });
    expect(istWeek('2026-11-05')).toEqual({ from: '2026-11-02', to: '2026-11-08' });
    expect(istWeek('2026-11-08')).toEqual({ from: '2026-11-02', to: '2026-11-08' });
    expect(istWeek('2026-11-09')).toEqual({ from: '2026-11-09', to: '2026-11-15' });
    // Across a month and a year boundary, and a leap day.
    expect(istWeek('2027-01-01')).toEqual({ from: '2026-12-28', to: '2027-01-03' });
    expect(istWeek('2028-02-29')).toEqual({ from: '2028-02-28', to: '2028-03-05' });
  });

  it('dashboard windows: this and last week, the last 7 days and the 7 before', () => {
    const w = dashboardWindows('2026-11-04');
    expect(w).toEqual({
      today: '2026-11-04',
      thisWeek: { from: '2026-11-02', to: '2026-11-08' },
      lastWeek: { from: '2026-10-26', to: '2026-11-01' },
      recent: { from: '2026-10-29', to: '2026-11-04' },
      previous: { from: '2026-10-22', to: '2026-10-28' },
    });
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
    expect(dashboardWindows('2026-11-04', 1).recent).toEqual({ from: '2026-11-04', to: '2026-11-04' });
  });
});

describe('small aggregates', () => {
  it('accuracy is null without checked answers and clamped otherwise', () => {
    expect(accuracy(0, 0)).toBeNull();
    expect(accuracy(2, 3)).toBe(0.667);
    expect(accuracy(5, 3)).toBe(1);
    expect(accuracy(1, Number.NaN)).toBeNull();
  });

  it('test percentages: mean and best, null without any; percentOf guards empty papers', () => {
    expect(testPercentSummary([])).toEqual({ average: null, best: null });
    expect(testPercentSummary([50, 75, 100])).toEqual({ average: 75, best: 100 });
    expect(testPercentSummary([33.33, 66.67, Number.NaN, 140])).toEqual({ average: 66.7, best: 100 });
    expect(percentOf(7, 20)).toBe(35);
    expect(percentOf(7, 0)).toBeNull();
    expect(percentOf(null, 20)).toBeNull();
  });

  it('day runs: longest and current (ending today or yesterday)', () => {
    expect(dayRuns([], '2026-11-05')).toEqual({ current: 0, longest: 0 });
    expect(dayRuns(['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-05'], '2026-11-05')).toEqual({ current: 1, longest: 3 });
    expect(dayRuns(['2026-11-03', '2026-11-04', '2026-11-04'], '2026-11-05')).toEqual({ current: 2, longest: 2 });
    expect(dayRuns(['2026-11-01', '2026-11-02'], '2026-11-05')).toEqual({ current: 0, longest: 2 });
    expect(dayRuns(['2026-02-28', '2026-03-01'], '2026-03-01')).toEqual({ current: 2, longest: 2 });
  });

  it('level counts include every level', () => {
    expect(levelCounts(['mastered', 'not_started', 'mastered'])).toEqual({ not_started: 1, attempted: 0, familiar: 0, proficient: 0, mastered: 2 });
  });
});

describe('focus areas', () => {
  const ch = (id: string, over: Partial<FocusCandidate> = {}): FocusCandidate => ({
    chapterId: id,
    level: 'attempted',
    score: 20,
    firstTryAccuracy: 0.5,
    practiceAttempted: 10,
    chapterTestPct: null,
    ...over,
  });

  it('only really attempted chapters (enough questions or a chapter test) count', () => {
    expect(reallyAttempted({ practiceAttempted: DASHBOARD.focus.minAttempted - 1, chapterTestPct: null })).toBe(false);
    expect(reallyAttempted({ practiceAttempted: DASHBOARD.focus.minAttempted, chapterTestPct: null })).toBe(true);
    expect(reallyAttempted({ practiceAttempted: 0, chapterTestPct: 0 })).toBe(true);
    const r = pickFocus([ch('a', { practiceAttempted: 1 }), ch('b', { practiceAttempted: 0, chapterTestPct: 40 })]);
    expect(r.weakest.map((c) => c.chapterId)).toEqual(['b']);
    expect(r.strongest).toEqual([]);
  });

  it('weakest lowest first, strongest highest first, never both, at most perSide each, deterministic ties', () => {
    const list = [
      ch('c1', { score: 40, level: 'familiar' }),
      ch('c2', { score: 10 }),
      ch('c3', { score: 10, firstTryAccuracy: 0.2 }),
      ch('c4', { score: 55, level: 'familiar' }),
      ch('c5', { score: 90, level: 'mastered' }),
      ch('c6', { score: 70, level: 'proficient', firstTryAccuracy: 0.9 }),
      ch('c7', { score: 70, level: 'proficient', firstTryAccuracy: 0.8 }),
      ch('c8', { score: 62, level: 'proficient' }),
    ];
    const r = pickFocus(list);
    expect(r.weakest.map((c) => c.chapterId)).toEqual(['c3', 'c2', 'c1']);
    expect(r.strongest.map((c) => c.chapterId)).toEqual(['c5', 'c6', 'c7']);
    expect(r.weakest.length).toBe(DASHBOARD.focus.perSide);
    expect(pickFocus([...list].reverse())).toEqual(r);
    // One strong chapter only: it is a strength, not a weakness.
    expect(pickFocus([ch('x', { level: 'mastered', score: 95 })])).toEqual({ weakest: [], strongest: [expect.objectContaining({ chapterId: 'x' })] });
  });
});

describe('next badge', () => {
  it('a brand-new student is pointed at the first configured badge', () => {
    const n = nextBadge(new Set(), NONE);
    expect(n).toMatchObject({ key: BADGES[0]!.key, current: 0, progress: 0 });
  });

  it('picks the highest progress among unearned badges; ties keep config order', () => {
    const stats: BadgeStats = { ...NONE, lessonsCompleted: 1, practiceCorrect: 40, currentStreak: 2 };
    const earned = new Set(['first-lesson', 'first-correct']);
    // practice-50: 40/50 = 0.8 beats streak-3: 2/3 = 0.667 and lessons-10: 0.1.
    expect(nextBadge(earned, stats)).toMatchObject({ key: 'practice-50', current: 40, target: 50, progress: 0.8 });
    expect(nextBadge(new Set([...earned, 'practice-50']), stats)).toMatchObject({ key: 'streak-3', current: 2, target: 3 });
  });

  it('progress is capped at the target and badges map to their stat', () => {
    expect(badgeProgress({ criteria: { kind: 'tests_submitted', count: 10 } }, { ...NONE, testsGraded: 25 })).toEqual({ current: 10, target: 10 });
    expect(badgeProgress({ criteria: { kind: 'streak_days', count: 7 } }, { ...NONE, currentStreak: 3 })).toEqual({ current: 3, target: 7 });
    expect(badgeProgress({ criteria: { kind: 'test_day_streak', count: 3 } }, { ...NONE, testDayRun: 2 })).toEqual({ current: 2, target: 3 });
    expect(badgeProgress({ criteria: { kind: 'chapters_mastered', count: 1, accuracy: 0.8, minAnswered: 20 } }, { ...NONE, chaptersMastered: 0 })).toEqual({ current: 0, target: 1 });
    expect(badgeProgress({ criteria: { kind: 'perfect_scores', count: 1 } }, { ...NONE, perfectScores: 1 })).toEqual({ current: 1, target: 1 });
  });

  it('null when every badge is earned', () => {
    expect(nextBadge(new Set(BADGES.map((b) => b.key)), NONE)).toBeNull();
  });
});

describe('weekly goal', () => {
  it('default until set; stored goals are clamped to the config bounds', () => {
    expect(effectiveWeeklyGoal(null)).toEqual({ target: DASHBOARD.weeklyGoal.default, isDefault: true });
    expect(effectiveWeeklyGoal(undefined)).toEqual({ target: DASHBOARD.weeklyGoal.default, isDefault: true });
    expect(effectiveWeeklyGoal(40)).toEqual({ target: 40, isDefault: false });
    expect(effectiveWeeklyGoal(1)).toEqual({ target: DASHBOARD.weeklyGoal.min, isDefault: false });
    expect(effectiveWeeklyGoal(5000)).toEqual({ target: DASHBOARD.weeklyGoal.max, isDefault: false });
  });

  it('progress, remaining, met and days left in the IST week', () => {
    expect(weeklyGoalView(10, 4, '2026-11-02')).toEqual({ metric: 'questions_solved', target: 10, isDefault: false, progress: 4, remaining: 6, met: false, weekStart: '2026-11-02', weekEnd: '2026-11-08', daysLeft: 7 });
    expect(weeklyGoalView(10, 12, '2026-11-08')).toMatchObject({ progress: 12, remaining: 0, met: true, daysLeft: 1 });
    expect(weeklyGoalView(null, 0, '2026-11-05')).toMatchObject({ target: DASHBOARD.weeklyGoal.default, isDefault: true, daysLeft: 4 });
  });

  it('config bounds are consistent', () => {
    const g = DASHBOARD.weeklyGoal;
    expect(g.min).toBeLessThanOrEqual(g.default);
    expect(g.default).toBeLessThanOrEqual(g.max);
  });
});

describe('recent events', () => {
  it('newest first, deterministic ties, capped', () => {
    const ev = [
      { kind: 'lesson', id: 'a', at: '2026-11-01T10:00:00.000Z' },
      { kind: 'test', id: 'b', at: '2026-11-02T10:00:00.000Z' },
      { kind: 'badge', id: 'c', at: '2026-11-02T10:00:00.000Z' },
      { kind: 'practice', id: 'd', at: '2026-10-30T10:00:00.000Z' },
    ];
    expect(latestEvents(ev).map((e) => e.id)).toEqual(['c', 'b', 'a', 'd']);
    expect(latestEvents(ev, 2).map((e) => e.id)).toEqual(['c', 'b']);
    expect(latestEvents(ev, 0)).toEqual([]);
  });
});

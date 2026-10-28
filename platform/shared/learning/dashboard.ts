/**
 * Student dashboard aggregation (pure; no I/O). The API feeds it the caller's stored progress
 * (GET /v1/me/dashboard); the formulas live here so they are unit-tested in one place and the web can
 * reuse them. Numbers: ../config/learning.ts (DASHBOARD) and ../config/gamification.ts (BADGES).
 *
 * Days are IST calendar days given as YYYY-MM-DD strings; weeks run Monday–Sunday (GEN-6).
 */
import { BADGES, type BadgeDefinition } from '../config/gamification';
import { DASHBOARD, MASTERY_LEVELS, type MasteryLevel, type WeeklyGoalMetric } from '../config/learning';

/* IST calendar days ---------------------------------------------------------------------------- */

const DAY_MS = 86_400_000;
const toNum = (d: string) => Math.round(Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10))) / DAY_MS);
const toDay = (n: number) => new Date(n * DAY_MS).toISOString().slice(0, 10);

export const addDays = (day: string, n: number): string => toDay(toNum(day) + n);
export const daysBetween = (from: string, to: string): number => toNum(to) - toNum(from);

export interface DayRange {
  /** First day (inclusive). */
  from: string;
  /** Last day (inclusive). */
  to: string;
}

/** The Monday–Sunday IST week containing `day`. */
export function istWeek(day: string): DayRange {
  const n = toNum(day);
  const weekday = new Date(n * DAY_MS).getUTCDay(); // 0 = Sunday
  const from = toDay(n - ((weekday + 6) % 7));
  return { from, to: addDays(from, 6) };
}

export interface DashboardWindows {
  today: string;
  thisWeek: DayRange;
  lastWeek: DayRange;
  /** The last DASHBOARD.accuracyWindowDays days, today included. */
  recent: DayRange;
  /** The same number of days just before `recent`. */
  previous: DayRange;
}

export function dashboardWindows(today: string, accuracyDays: number = DASHBOARD.accuracyWindowDays): DashboardWindows {
  const thisWeek = istWeek(today);
  const lastWeek = { from: addDays(thisWeek.from, -7), to: addDays(thisWeek.from, -1) };
  const recent = { from: addDays(today, -(accuracyDays - 1)), to: today };
  const previous = { from: addDays(recent.from, -accuracyDays), to: addDays(recent.from, -1) };
  return { today, thisWeek, lastWeek, recent, previous };
}

/* Small aggregates ------------------------------------------------------------------------------ */

const r3 = (x: number) => Math.round(x * 1000) / 1000;
const r1 = (x: number) => Math.round(x * 10) / 10;

/** correct ÷ checked (0–1, 3 decimals), null when nothing was checked. */
export function accuracy(correct: number, checked: number): number | null {
  if (!Number.isFinite(checked) || checked <= 0) return null;
  return r3(Math.min(1, Math.max(0, correct / checked)));
}

/** Mean and best of test percentages (0–100, 1 decimal); null without any. */
export function testPercentSummary(percentages: readonly number[]): { average: number | null; best: number | null } {
  const ps = percentages.filter((p) => Number.isFinite(p)).map((p) => Math.min(100, Math.max(0, p)));
  if (!ps.length) return { average: null, best: null };
  return { average: r1(ps.reduce((s, p) => s + p, 0) / ps.length), best: r1(Math.max(...ps)) };
}

/** score ÷ max as a percentage (1 decimal), null when the paper has no marks. */
export function percentOf(score: number | null, max: number | null): number | null {
  if (score === null || max === null || !Number.isFinite(max) || max <= 0) return null;
  return r1(Math.min(100, Math.max(0, (score / max) * 100)));
}

/**
 * Runs of consecutive IST days in a set of days: the longest run, and the current run (the run that
 * ends today or yesterday, so it can still be extended today; 0 otherwise).
 */
export function dayRuns(days: readonly string[], today: string): { current: number; longest: number } {
  const ns = [...new Set(days.map(toNum))].sort((a, b) => a - b);
  let longest = 0;
  let run = 0;
  let prev = Number.NaN;
  for (const n of ns) {
    run = n === prev + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = n;
  }
  const t = toNum(today);
  const last = ns.length ? ns[ns.length - 1]! : Number.NaN;
  const current = last === t || last === t - 1 ? run : 0;
  return { current, longest };
}

/* Mastery level counts -------------------------------------------------------------------------- */

export function levelCounts(levels: readonly MasteryLevel[]): Record<MasteryLevel, number> {
  const out = Object.fromEntries(MASTERY_LEVELS.map((l) => [l, 0])) as Record<MasteryLevel, number>;
  for (const l of levels) out[l]++;
  return out;
}

/* Focus areas ----------------------------------------------------------------------------------- */

export interface FocusCandidate {
  chapterId: string;
  level: MasteryLevel;
  /** 0–100 mastery score. */
  score: number;
  firstTryAccuracy: number | null;
  /** Distinct practice questions answered. */
  practiceAttempted: number;
  /** Latest graded chapter-test percentage, null when none. */
  chapterTestPct: number | null;
}

/** "Really attempted": enough distinct practice questions answered, or a graded chapter test. */
export function reallyAttempted(c: Pick<FocusCandidate, 'practiceAttempted' | 'chapterTestPct'>): boolean {
  return c.practiceAttempted >= DASHBOARD.focus.minAttempted || c.chapterTestPct !== null;
}

/**
 * Up to DASHBOARD.focus.perSide weakest and strongest chapters among the really attempted ones.
 * Strongest: levels in DASHBOARD.focus.strongLevels, highest score first. Weakest: every other level,
 * lowest score first. Ties: lower (weakest) / higher (strongest) first-try accuracy, then chapter id,
 * so the order is deterministic. A chapter is never on both lists.
 */
export function pickFocus<T extends FocusCandidate>(chapters: readonly T[]): { weakest: T[]; strongest: T[] } {
  const strong = new Set<MasteryLevel>(DASHBOARD.focus.strongLevels);
  const real = chapters.filter(reallyAttempted);
  const acc = (c: T) => c.firstTryAccuracy ?? 0;
  const byId = (a: T, b: T) => (a.chapterId < b.chapterId ? -1 : a.chapterId > b.chapterId ? 1 : 0);
  const weakest = real
    .filter((c) => !strong.has(c.level))
    .sort((a, b) => a.score - b.score || acc(a) - acc(b) || byId(a, b))
    .slice(0, DASHBOARD.focus.perSide);
  const strongest = real
    .filter((c) => strong.has(c.level))
    .sort((a, b) => b.score - a.score || acc(b) - acc(a) || byId(a, b))
    .slice(0, DASHBOARD.focus.perSide);
  return { weakest, strongest };
}

/* Next badge ------------------------------------------------------------------------------------ */

/** What badge progress is measured against (the same quantities evaluateBadges checks). */
export interface BadgeStats {
  /** Lesson deck parts completed. */
  lessonsCompleted: number;
  /** Different practice questions auto-checked right. */
  practiceCorrect: number;
  /** The streak as shown today (0 when broken). Progress toward a streak badge is the current streak. */
  currentStreak: number;
  /** Different tests with a graded attempt. */
  testsGraded: number;
  perfectScores: number;
  /** Current run of IST days with a graded test (ends today or yesterday). */
  testDayRun: number;
  /** Chapters meeting the chapters_mastered criterion. */
  chaptersMastered: number;
}

export function badgeProgress(def: Pick<BadgeDefinition, 'criteria'>, s: BadgeStats): { current: number; target: number } {
  const c = def.criteria;
  const current =
    c.kind === 'lessons_completed' ? s.lessonsCompleted
    : c.kind === 'practice_correct' ? s.practiceCorrect
    : c.kind === 'streak_days' ? s.currentStreak
    : c.kind === 'tests_submitted' ? s.testsGraded
    : c.kind === 'perfect_scores' ? s.perfectScores
    : c.kind === 'test_day_streak' ? s.testDayRun
    : s.chaptersMastered;
  const target = Math.max(1, c.count);
  return { current: Math.max(0, Math.min(target, Math.floor(current))), target };
}

export interface NextBadge {
  key: string;
  name: string;
  description: string;
  icon: string;
  current: number;
  target: number;
  /** current ÷ target, 0–1 (3 decimals). */
  progress: number;
}

/**
 * The unearned badge closest to being earned: highest current ÷ target; ties keep the BADGES order
 * (easier badges are listed first). Null when every badge is earned.
 */
export function nextBadge(earned: ReadonlySet<string>, stats: BadgeStats, defs: readonly BadgeDefinition[] = BADGES): NextBadge | null {
  let best: NextBadge | null = null;
  for (const d of defs) {
    if (earned.has(d.key)) continue;
    const { current, target } = badgeProgress(d, stats);
    const progress = r3(current / target);
    if (!best || progress > best.progress) best = { key: d.key, name: d.name, description: d.description, icon: d.icon, current, target, progress };
  }
  return best;
}

/* Weekly goal ------------------------------------------------------------------------------------ */

/** The goal in effect: the student's own (clamped to the config bounds) or the default. */
export function effectiveWeeklyGoal(stored: number | null | undefined): { target: number; isDefault: boolean } {
  const g = DASHBOARD.weeklyGoal;
  if (stored === null || stored === undefined || !Number.isFinite(stored)) return { target: g.default, isDefault: true };
  return { target: Math.min(g.max, Math.max(g.min, Math.round(stored))), isDefault: false };
}

export interface WeeklyGoalView {
  metric: WeeklyGoalMetric;
  target: number;
  isDefault: boolean;
  progress: number;
  remaining: number;
  met: boolean;
  weekStart: string;
  weekEnd: string;
  /** Days left in the IST week, today included (7 on Monday, 1 on Sunday). */
  daysLeft: number;
}

export function weeklyGoalView(stored: number | null | undefined, progressThisWeek: number, today: string): WeeklyGoalView {
  const { target, isDefault } = effectiveWeeklyGoal(stored);
  const week = istWeek(today);
  const progress = Math.max(0, Math.floor(progressThisWeek));
  return {
    metric: DASHBOARD.weeklyGoal.metric,
    target,
    isDefault,
    progress,
    remaining: Math.max(0, target - progress),
    met: progress >= target,
    weekStart: week.from,
    weekEnd: week.to,
    daysLeft: daysBetween(today, week.to) + 1,
  };
}

/* Recent activity -------------------------------------------------------------------------------- */

/** Newest first by `at` (ISO instant), ties by kind then id, at most `limit`. */
export function latestEvents<T extends { at: string; kind: string; id: string }>(events: readonly T[], limit: number = DASHBOARD.recentLimit): T[] {
  return [...events]
    .sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : a.kind < b.kind ? -1 : a.kind > b.kind ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    .slice(0, Math.max(0, limit));
}

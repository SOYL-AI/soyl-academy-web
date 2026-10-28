/**
 * Student dashboard view-models (D-043): pure functions from `GET /v1/me/dashboard` (and the insights APIs) to
 * what the page shows, including the text alternative of every chart. No invented metrics: every number here
 * is a field of the API response or a direct ratio of two of them. Tested in __tests__/dashboard.test.tsx.
 */
import type { ChapterLink, DashboardProfile, MyDashboard, RecentEvent, SolvedByDifficulty, TestHistoryItem, WeeklyGoal } from '@/platform/shared/api-client';
import { DASHBOARD } from '@/platform/shared/config/learning';
import { examLabel, learnPath, type BoardSlug } from '../lib/catalog';
import { dayLabel } from '../me/heatmap-model';

export type Direction = 'up' | 'down' | 'same' | 'none';
export interface Delta {
  direction: Direction;
  /** Short sentence, e.g. "3 more than last week". Empty when there is nothing to compare. */
  text: string;
}

const plural = (n: number, one: string, many = `${one}s`) => `${n.toLocaleString('en-IN')} ${n === 1 ? one : many}`;

/** This period vs the one before, in counts ("3 more than last week"). */
export function countDelta(current: number, previous: number, period = 'last week'): Delta {
  const d = current - previous;
  if (d > 0) return { direction: 'up', text: `${d.toLocaleString('en-IN')} more than ${period}` };
  if (d < 0) return { direction: 'down', text: `${(-d).toLocaleString('en-IN')} fewer than ${period}` };
  if (current === 0) return { direction: 'none', text: '' };
  return { direction: 'same', text: `Same as ${period}` };
}

/** 0–1 → whole percent; null stays null. */
export const pct = (v: number | null | undefined): number | null => (v == null ? null : Math.round(v * 100));

/** Accuracy now vs the 7 days before, in percentage points. */
export function accuracyDelta(recent: number | null, previous: number | null): Delta {
  const a = pct(recent);
  const b = pct(previous);
  if (a === null) return { direction: 'none', text: '' };
  if (b === null) return { direction: 'none', text: 'Nothing checked the 7 days before' };
  const d = a - b;
  if (d > 0) return { direction: 'up', text: `Up ${d} points on the 7 days before` };
  if (d < 0) return { direction: 'down', text: `Down ${-d} points on the 7 days before` };
  return { direction: 'same', text: 'Same as the 7 days before' };
}

export interface KpiTile {
  key: 'solved' | 'accuracy' | 'lessons' | 'tests' | 'active';
  label: string;
  value: string;
  sub: string;
  delta: Delta | null;
}

export function kpiTiles(d: Pick<MyDashboard, 'totals'>): KpiTile[] {
  const t = d.totals;
  const acc = pct(t.accuracy.recent.accuracy);
  const tests = t.tests;
  return [
    {
      key: 'solved',
      label: 'Solved this week',
      value: t.solved.thisWeek.toLocaleString('en-IN'),
      sub: `${t.solved.allTime.toLocaleString('en-IN')} all time`,
      delta: countDelta(t.solved.thisWeek, t.solved.lastWeek),
    },
    {
      key: 'accuracy',
      label: 'Accuracy, last 7 days',
      value: acc === null ? '–' : `${acc}%`,
      sub: t.accuracy.recent.checked > 0 ? `${t.accuracy.recent.right} of ${plural(t.accuracy.recent.checked, 'checked answer')} right` : 'No auto-checked answers yet',
      delta: accuracyDelta(t.accuracy.recent.accuracy, t.accuracy.previous.accuracy),
    },
    {
      key: 'lessons',
      label: 'Lessons completed',
      value: t.lessonsCompleted.allTime.toLocaleString('en-IN'),
      sub: `${t.lessonsCompleted.thisWeek} this week`,
      delta: countDelta(t.lessonsCompleted.thisWeek, t.lessonsCompleted.lastWeek),
    },
    {
      key: 'tests',
      label: 'Tests taken',
      value: tests.submitted.allTime.toLocaleString('en-IN'),
      sub: tests.averagePct === null ? 'No marked tests yet' : `Average ${Math.round(tests.averagePct)}% · best ${Math.round(tests.bestPct ?? tests.averagePct)}%`,
      delta: null,
    },
    {
      key: 'active',
      label: 'Active days this week',
      value: `${t.activeDays.thisWeek}/7`,
      sub: `${plural(t.activeDays.allTime, 'day')} all time`,
      delta: countDelta(t.activeDays.thisWeek, t.activeDays.lastWeek),
    },
  ];
}

/** A brand-new account: nothing answered, finished or submitted yet. */
export function isNewAccount(d: Pick<MyDashboard, 'totals'>): boolean {
  const t = d.totals;
  return t.answered.allTime === 0 && t.lessonsCompleted.allTime === 0 && t.tests.submitted.allTime === 0;
}

/* ── Header ─────────────────────────────────────────────────────────────── */

/** "Good morning" by the hour in India (IST), never the device zone. */
export function greeting(now: Date): string {
  const h = (now.getUTCHours() + 5 + Math.floor((now.getUTCMinutes() + 30) / 60)) % 24;
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

/** "CBSE Class 10", "ICSE Class 9", or null when the class is not set. */
export function classLine(profile: Pick<DashboardProfile, 'board' | 'classLevel'>): string | null {
  if (!profile.board || !profile.classLevel) return null;
  return `${examLabel(profile.board as BoardSlug, profile.classLevel)} Class ${profile.classLevel}`;
}

export function schoolLine(school: DashboardProfile['school']): string | null {
  if (!school) return null;
  return school.city ? `${school.name}, ${school.city}` : school.name;
}

export type ProfilePrompt =
  /** Board and/or class missing: ask inline. */
  | { kind: 'class'; missing: ('board' | 'classLevel')[] }
  /** Consent granted, no school saved: link to the profile. */
  | { kind: 'school' }
  /** Consent not granted: the school can only be added after approval (D-014), so link to the consent flow. */
  | { kind: 'school-consent' };

/** Prompts from `profile.missing` and `profile.schoolStatus` (the API decides; the page only reads). */
export function profilePrompts(profile: Pick<DashboardProfile, 'missing' | 'schoolStatus'>): ProfilePrompt[] {
  const out: ProfilePrompt[] = [];
  const cls = profile.missing.filter((m): m is 'board' | 'classLevel' => m === 'board' || m === 'classLevel');
  if (cls.length) out.push({ kind: 'class', missing: cls });
  if (profile.schoolStatus === 'consent_required') out.push({ kind: 'school-consent' });
  else if (profile.missing.includes('school')) out.push({ kind: 'school' });
  return out;
}

/* ── Weekly goal ────────────────────────────────────────────────────────── */

/** Bounds and default of the weekly goal (config, the same numbers the API enforces). */
export const GOAL_MIN: number = DASHBOARD.weeklyGoal.min;
export const GOAL_MAX: number = DASHBOARD.weeklyGoal.max;
export const GOAL_DEFAULT: number = DASHBOARD.weeklyGoal.default;

/** A goal the student typed: an integer 5–300, else an error sentence. */
export function parseGoal(raw: string): { ok: true; value: number } | { ok: false; error: string } {
  const t = raw.trim();
  if (!/^\d{1,4}$/.test(t)) return { ok: false, error: `Enter a whole number from ${GOAL_MIN} to ${GOAL_MAX}.` };
  const n = Number(t);
  if (n < GOAL_MIN || n > GOAL_MAX) return { ok: false, error: `Choose a goal from ${GOAL_MIN} to ${GOAL_MAX} questions.` };
  return { ok: true, value: n };
}

export interface GoalView {
  percent: number;
  label: string;
  status: string;
}

export function goalView(g: Pick<WeeklyGoal, 'target' | 'progress' | 'remaining' | 'met' | 'daysLeft'>): GoalView {
  const percent = g.target > 0 ? Math.min(100, Math.round((g.progress / g.target) * 100)) : 0;
  const label = `Weekly goal: ${g.progress} of ${g.target} questions solved this week`;
  const status = g.met
    ? `Goal met. ${g.progress > g.target ? `${g.progress - g.target} extra so far.` : 'Well done!'}`
    : `${plural(g.remaining, 'question')} to go · ${plural(g.daysLeft, 'day')} left`;
  return { percent, label, status };
}

/** The dashboard's goal after a new target is saved ( → Me.weeklyGoal); progress stays the API's. */
export function withTarget(g: WeeklyGoal, saved: { target: number; isDefault: boolean }): WeeklyGoal {
  return { ...g, target: saved.target, isDefault: saved.isDefault, remaining: Math.max(0, saved.target - g.progress), met: g.progress >= saved.target };
}

/* ── Solved by difficulty (LeetCode) ────────────────────────────────────── */

export interface DifficultyRow {
  band: 'easy' | 'medium' | 'hard';
  label: string;
  solved: number;
  total: number;
  percent: number;
}

const share = (solved: number, total: number) => (total > 0 ? Math.round((solved / total) * 100) : 0);

export function difficultyView(sbd: SolvedByDifficulty): { solved: number; total: number; percent: number; rows: DifficultyRow[]; summary: string } {
  const rows: DifficultyRow[] = (['easy', 'medium', 'hard'] as const).map((band) => ({
    band,
    label: band === 'easy' ? 'Easy' : band === 'medium' ? 'Medium' : 'Hard',
    solved: sbd[band].solved,
    total: sbd[band].total,
    percent: share(sbd[band].solved, sbd[band].total),
  }));
  const summary =
    sbd.all.total === 0
      ? 'No practice questions in your subjects yet.'
      : `Solved ${sbd.all.solved} of ${sbd.all.total} practice questions: ` + rows.map((r) => `${r.label} ${r.solved} of ${r.total}`).join(', ') + '.';
  return { solved: sbd.all.solved, total: sbd.all.total, percent: share(sbd.all.solved, sbd.all.total), rows, summary };
}

/* ── Mastery scope ──────────────────────────────────────────────────────── */

export function scopeText(scope: MyDashboard['scope']): string {
  if (scope.kind === 'none' || scope.chapterCount === 0) return 'Set your class or start a chapter to see your mastery.';
  const chapters = plural(scope.chapterCount, 'chapter');
  const subjects = plural(scope.subjectCount, 'subject');
  if (scope.kind === 'class' && scope.board && scope.classLevel) {
    return `${chapters} in ${subjects} of ${examLabel(scope.board as BoardSlug, scope.classLevel)} Class ${scope.classLevel} with lessons or practice`;
  }
  return `${chapters} in the ${subjects} you have practised`;
}

/** What the difficulty counts cover. */
export function difficultyScopeNote(scope: MyDashboard['scope']): string {
  if (scope.kind === 'class') return 'Every practice question in your class subjects that have practice.';
  if (scope.kind === 'activity') return 'Practice questions in the subjects you have practised. Set your class to count all of them.';
  return 'Set your class to count the practice questions in your subjects.';
}

/** /learn/cbse/10/science from `cbse-10-science` (CISCE ids start with icse/isc), else null. */
export function subjectHref(subjectId: string): string | null {
  const m = /^(cbse|icse|isc)-(\d{1,2})-([a-z0-9-]+)$/.exec(subjectId);
  if (!m) return null;
  return learnPath(m[1] === 'cbse' ? 'cbse' : 'cisce', Number(m[2]), subjectId);
}

/* ── Chapters ───────────────────────────────────────────────────────────── */

export function chapterLinkHref(link: ChapterLink, view?: 'practice'): string {
  const base = `/learn/${link.board}/${link.classLevel}/${link.subjectSlug}/${link.chapterSlug}`;
  return view ? `${base}/${view}` : base;
}

/* ── Test score trend ───────────────────────────────────────────────────── */

export interface TrendPoint {
  attemptId: string;
  title: string;
  subjectName: string;
  day: string;
  percentage: number;
  marking: 'auto' | 'self';
  autoSubmitted: boolean;
}

/** Oldest → newest, attempts with a percentage only (the API sends newest first, ≤ 20). */
export function trendPoints(history: readonly TestHistoryItem[]): TrendPoint[] {
  return history
    .filter((t) => t.percentage !== null)
    .map((t) => ({ attemptId: t.attemptId, title: t.title, subjectName: t.subjectName, day: t.day, percentage: t.percentage!, marking: t.marking, autoSubmitted: t.autoSubmitted }))
    .reverse();
}

export function trendSummary(points: readonly TrendPoint[]): string {
  if (points.length === 0) return 'No marked tests yet.';
  const first = points[0]!;
  const last = points[points.length - 1]!;
  const best = Math.max(...points.map((p) => p.percentage));
  const avg = points.reduce((n, p) => n + p.percentage, 0) / points.length;
  const self = points.filter((p) => p.marking === 'self').length;
  const range = points.length === 1 ? `${fmtPct(last.percentage)} on ${dayLabel(last.day)}` : `from ${fmtPct(first.percentage)} on ${dayLabel(first.day)} to ${fmtPct(last.percentage)} on ${dayLabel(last.day)}`;
  return `Your last ${plural(points.length, 'marked test')}: ${range}. Average ${fmtPct(avg)}, best ${fmtPct(best)}.${self ? ` ${self} include${self === 1 ? 's' : ''} marks you gave yourself.` : ''}`;
}

export const fmtPct = (n: number): string => `${Math.round(n * 10) / 10}%`;

export const TEST_KIND_LABELS: Record<TestHistoryItem['kind'], string> = {
  chapter: 'Chapter test',
  unit: 'Unit test',
  term: 'Term paper',
  full: 'Board paper',
  live: 'Live mock',
  custom: 'Custom test',
};

/* ── Recent activity ────────────────────────────────────────────────────── */

/** "Today", "Yesterday" or "26 Oct 2026" (IST days from the API). */
export function relativeDay(day: string, today: string): string {
  if (day === today) return 'Today';
  const ms = (d: string) => Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)));
  if (ms(today) - ms(day) === 86_400_000) return 'Yesterday';
  return dayLabel(day);
}

export interface RecentRow {
  id: string;
  kind: RecentEvent['kind'];
  text: string;
  href: string | null;
  when: string;
}

export function recentRows(events: readonly RecentEvent[], today: string): RecentRow[] {
  return events.map((e) => {
    const when = relativeDay(e.day, today);
    switch (e.kind) {
      case 'lesson':
        return { id: e.id, kind: e.kind, when, href: chapterLinkHref(e.chapter.link), text: `Finished lesson part ${e.part}: ${e.chapter.title} (${e.chapter.subjectName})` };
      case 'practice':
        return {
          id: e.id,
          kind: e.kind,
          when,
          href: chapterLinkHref(e.chapter.link, 'practice'),
          text: `Practised ${e.chapter.title} (${e.chapter.subjectName}): ${plural(e.answered, 'answer')}, ${e.solved} solved`,
        };
      case 'test':
        return { id: e.id, kind: e.kind, when, href: `/tests/result/${e.attemptId}`, text: `${TEST_KIND_LABELS[e.testKind]}: ${e.title}${e.percentage !== null ? `, ${fmtPct(e.percentage)}` : ''}` };
      case 'badge':
        return { id: e.id, kind: e.kind, when, href: '/me#badges', text: `Earned the ${e.name} badge` };
    }
  });
}

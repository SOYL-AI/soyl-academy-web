/**
 * Progress (`/me/progress`, design language v3 §10 "Progress") view-models: the analytics that used to be on Home,
 * honest and readable. Pure functions from GET /v1/me/dashboard and /v1/me/activity. Rules (DESIGN-LANGUAGE §1.2):
 * a stat with no data is hidden (an empty state explains it instead of a zero), trends are written in words, and no
 * "N of 7,537" denominators (totals over 1,000 are left out). Tested in __tests__/progress-model.test.ts.
 */
import type { DashboardProfile, MyDashboard, SolvedByDifficulty, TestHistoryItem } from '@/platform/shared/api-client';
import type { IconName } from '@/components/platform/ui/kit/Icon';
import type { StatTrend } from '@/components/platform/ui/kit/Stat';
import type { StatusTone } from '@/components/platform/ui/kit/Lists';
import type { Tint } from '@/components/platform/ui/kit/tints';
import { examLabel, type BoardSlug } from '../lib/catalog';
import { accuracyDelta, countDelta, fmtPct, pct, TEST_KIND_LABELS, type Delta } from '../dashboard/model';
import { weekRange } from '../dashboard/home-model';

const n = (v: number) => v.toLocaleString('en-IN');
const plural = (count: number, one: string, many = `${one}s`) => `${n(count)} ${count === 1 ? one : many}`;

/** Totals larger than this are not shown as denominators ("3 of 7,537" reads as failure, not progress). */
export const MAX_DENOMINATOR = 1000;

/** A dashboard Delta as a StatCard trend (nothing to compare → no trend line). */
export function toTrend(d: Delta): StatTrend | undefined {
  if (d.direction === 'none' || !d.text) return undefined;
  return { direction: d.direction === 'same' ? 'flat' : d.direction, text: d.text };
}

export interface StatView {
  key: 'solved' | 'accuracy' | 'lessons' | 'days';
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  trend?: StatTrend;
  icon: IconName;
  tint: Tint;
  /** The raw value for tests (data-value). */
  raw: string;
}

/**
 * The four headline stats: solved this week, accuracy (last 7 days), lessons done, study days this week. A stat
 * the student has no data for yet is left out; a brand-new student gets none (the page shows an empty state).
 */
export function progressStats(d: Pick<MyDashboard, 'totals'>): StatView[] {
  const t = d.totals;
  const out: StatView[] = [];
  if (t.answered.allTime > 0 || t.solved.allTime > 0) {
    out.push({
      key: 'solved',
      label: 'Solved this week',
      value: n(t.solved.thisWeek),
      hint: `${n(t.solved.allTime)} all time`,
      trend: toTrend(countDelta(t.solved.thisWeek, t.solved.lastWeek)),
      icon: 'checkCircle',
      tint: 'green',
      raw: String(t.solved.thisWeek),
    });
  }
  const acc = pct(t.accuracy.recent.accuracy);
  if (acc !== null) {
    out.push({
      key: 'accuracy',
      label: 'Accuracy',
      value: String(acc),
      unit: '%',
      hint: `Last 7 days · ${n(t.accuracy.recent.right)} of ${plural(t.accuracy.recent.checked, 'checked answer')} right`,
      trend: toTrend(accuracyDelta(t.accuracy.recent.accuracy, t.accuracy.previous.accuracy)),
      icon: 'target',
      tint: 'blue',
      raw: `${acc}%`,
    });
  }
  if (t.lessonsCompleted.allTime > 0) {
    out.push({
      key: 'lessons',
      label: 'Lessons done',
      value: n(t.lessonsCompleted.allTime),
      hint: `${n(t.lessonsCompleted.thisWeek)} this week`,
      trend: toTrend(countDelta(t.lessonsCompleted.thisWeek, t.lessonsCompleted.lastWeek)),
      icon: 'play',
      tint: 'violet',
      raw: String(t.lessonsCompleted.allTime),
    });
  }
  if (t.activeDays.allTime > 0) {
    out.push({
      key: 'days',
      label: 'Study days',
      value: String(t.activeDays.thisWeek),
      unit: 'of 7',
      hint: `This week · ${plural(t.activeDays.allTime, 'day')} all time`,
      trend: toTrend(countDelta(t.activeDays.thisWeek, t.activeDays.lastWeek)),
      icon: 'calendar',
      tint: 'orange',
      raw: `${t.activeDays.thisWeek}/7`,
    });
  }
  return out;
}

/* ── Practice by difficulty ──────────────────────────────────────────────── */

export interface DifficultyStat {
  band: 'easy' | 'medium' | 'hard';
  label: string;
  solved: number;
  /** "of 120 in your subjects" only when the total is small enough to mean something. */
  hint: string;
  tint: Tint;
}

const BAND_TINT = { easy: 'green', medium: 'yellow', hard: 'red' } as const;

export function difficultyStats(sbd: SolvedByDifficulty): DifficultyStat[] {
  return (['easy', 'medium', 'hard'] as const).map((band) => {
    const b = sbd[band];
    const label = band === 'easy' ? 'Easy' : band === 'medium' ? 'Medium' : 'Hard';
    const hint = b.total > 0 && b.total <= MAX_DENOMINATOR ? `of ${n(b.total)} in your subjects` : b.solved === 1 ? 'question solved' : 'questions solved';
    return { band, label, solved: b.solved, hint, tint: BAND_TINT[band] };
  });
}

/* ── Header ──────────────────────────────────────────────────────────────── */

/** "CBSE Class 10 · this week, 10–16 Nov" (or "This week, 10–16 Nov" without a class). */
export function progressSubtitle(profile: Pick<DashboardProfile, 'board' | 'classLevel'>, week: { from: string; to: string }): string {
  const range = weekRange(week.from, week.to);
  if (!profile.board || !profile.classLevel) return `This week, ${range}`;
  return `${examLabel(profile.board as BoardSlug, profile.classLevel)} Class ${profile.classLevel} · this week, ${range}`;
}

/* ── Test scores ─────────────────────────────────────────────────────────── */

/** "Sat 15 Nov" for an IST calendar day (YYYY-MM-DD). */
export function shortDay(ymd: string): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', ...o }).format(d);
  return `${f({ weekday: 'short' })} ${f({ day: 'numeric' })} ${f({ month: 'short' })}`;
}

export interface TestRowView {
  attemptId: string;
  title: string;
  href: string;
  meta: string;
  day: string;
  score: string;
  percent: string;
  marking: 'auto' | 'self';
  pills: { tone: StatusTone; text: string }[];
}

export function testRows(history: readonly TestHistoryItem[], limit = 8): TestRowView[] {
  return history.slice(0, limit).map((t) => ({
    attemptId: t.attemptId,
    title: t.title,
    href: `/tests/result/${t.attemptId}`,
    meta: `${TEST_KIND_LABELS[t.kind]} · ${t.subjectName}`,
    day: shortDay(t.day),
    score: `${n(t.score)}/${n(t.maxScore)}`,
    percent: t.percentage === null ? '–' : fmtPct(t.percentage),
    marking: t.marking,
    pills: [
      t.marking === 'self' ? { tone: 'highlight' as const, text: 'Self-marked' } : { tone: 'success' as const, text: 'Auto-marked' },
      ...(t.autoSubmitted ? [{ tone: 'neutral' as const, text: 'Time-up' }] : []),
    ],
  }));
}

/** The score chart only means something from 3 marked tests (DESIGN-LANGUAGE §10 Progress). */
export const MIN_CHART_POINTS = 3;

/* ── Activity ────────────────────────────────────────────────────────────── */

/** The heatmap only after this many active days in its window; before that, this week's strip. */
export const HEATMAP_MIN_DAYS = 7;

export function showHeatmap(activeDaysInWindow: number): boolean {
  return activeDaysInWindow >= HEATMAP_MIN_DAYS;
}

/* ── Focus ───────────────────────────────────────────────────────────────── */

export function focusMeta(c: MyDashboard['focus']['weakest'][number]): string {
  const acc = c.firstTryAccuracy === null ? null : Math.round(c.firstTryAccuracy * 100);
  const practised = c.practiceTotal > 0 && c.practiceTotal <= MAX_DENOMINATOR ? `${n(c.practiceAttempted)} of ${n(c.practiceTotal)} practised` : `${n(c.practiceAttempted)} practised`;
  return [c.subjectName, practised, acc !== null ? `${acc}% right first time` : null, c.chapterTestPct !== null ? `chapter test ${fmtPct(c.chapterTestPct)}` : null].filter(Boolean).join(' · ');
}

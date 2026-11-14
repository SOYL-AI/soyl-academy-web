/**
 * Progress (`/me/progress`, design language v3 §10 "Progress") view-models: the analytics that used to be on Home,
 * honest and readable. Pure functions from GET /v1/me/dashboard and /v1/me/activity. Rules (DESIGN-LANGUAGE §1.2):
 * a stat with no data is hidden (an empty state explains it instead of a zero), trends are written in words, and no
 * "N of 7,537" denominators (totals over 1,000 are left out). Tested in __tests__/progress-model.test.ts.
 */
import type { DashboardProfile, MyDashboard, MyPlayerCard, SolvedByDifficulty, SubjectMastery, TestHistoryItem } from '@/platform/shared/api-client';
import { CARD_ATTRIBUTES, PLAYER_CARD } from '@/platform/shared/config/learning';
import type { RadarAxis } from '@/components/platform/ui/kit/RadarChart';
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

/* ── Player card radar and subject radar (progress radar, 2026-11-14) ─────────── */

/** The card's scale: 40 at the centre, 99 on the outer ring; grid rings at 40/60/80/99 (40 is the centre). */
export const CARD_RADAR = { min: PLAYER_CARD.floor, max: PLAYER_CARD.ceiling, rings: [PLAYER_CARD.floor, 60, 80, PLAYER_CARD.ceiling] } as const;

/**
 * A card is "rated" (numbers on the card and the radar) only when it is not provisional: before that the page shows
 * the blank card and a dashed hexagon, never the floor numbers (PLAYER_CARD.provisional: 10 checked answers and 3
 * active days in the window).
 */
export function isRatedCard(card: MyPlayerCard | null | undefined): card is MyPlayerCard {
  return !!card && card.attributes.length > 0 && !card.provisional;
}

/**
 * The card radar's axes. Rated: the card's own attributes in card order (Speed is left out until it has data, so the
 * shape is a pentagon then; the caption says why). Unrated: all six attribute names (for the blank hexagon; the
 * values are never shown).
 */
export function cardRadarAxes(card: MyPlayerCard | null | undefined): RadarAxis[] {
  if (isRatedCard(card)) return card.attributes.map((a) => ({ key: a.key, label: a.label, value: a.value, max: CARD_RADAR.max }));
  return CARD_ATTRIBUTES.map((key) => ({ key, label: PLAYER_CARD.attributes[key].label, value: CARD_RADAR.min, max: CARD_RADAR.max }));
}

/** The line under the card radar: the scale, and why Speed is missing when it is. */
export function cardRadarCaption(card: MyPlayerCard): string {
  const speed = card.attributes.some((a) => a.key === 'SPD') ? '' : ` Speed joins your card after ${PLAYER_CARD.attributes.SPD.minItems} timed test questions answered right.`;
  return `The centre is ${CARD_RADAR.min} and the outer ring ${CARD_RADAR.max}.${speed}`;
}

/** The blank card's line before the first rating. */
export const UNRATED_TITLE = `Solve ${PLAYER_CARD.provisional.minCheckedQuestions} questions to get rated`;

/** What it takes to get rated (from config, so the copy follows the rule). */
export function unratedText(): string {
  const p = PLAYER_CARD.provisional;
  return `Your card is rated once you have checked ${plural(p.minCheckedQuestions, 'practice answer')} and learned on ${plural(p.minActiveDays, 'different day')} in the last ${PLAYER_CARD.attributes.CON.windowDays / 7} weeks. Here is where each part stands:`;
}

/** The subject radar shows 3 to this many axes; more are counted in "+N more". */
export const SUBJECT_RADAR_MAX = 8;
/** Fewer subjects than this: a ranked bar list instead of a radar. */
export const SUBJECT_RADAR_MIN = 3;

/**
 * A subject's name for chart labels only: parenthetical text ("Mathematics (Standard 041 / Basic 241)" →
 * "Mathematics", "Biology (Science Paper 3)" → "Biology"), anything after a spaced dash ("Hindi — Course A" →
 * "Hindi") and a trailing subject code ("Physics 042", "Physics - 042", "Maths 041/241") are dropped. Never empty: falls
 * back to the full name. Tables and accessible text keep the full name.
 */
export function shortSubjectName(name: string): string {
  const s = name
    .replace(/\s*\([^()]*\)/g, ' ')
    .split(/\s+[—–]\s+/)[0]!
    .replace(/\s*(?:[-–—:]\s*)?(?:code\s*)?\d{3}(?:\s*\/\s*\d{3})*\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  return s || name.trim();
}

/**
 * Mastery over the chapters the student has started (any level above "not started"), 0–100, rounded. Uses the
 * chapters in the response; if they are missing, the subject score (a mean over every chapter, untouched = 0) is
 * scaled back up to the started chapters.
 */
export function startedMastery(x: SubjectMastery): number {
  const started = x.chapters.filter((c) => c.level !== 'not_started');
  if (started.length) return Math.round(started.reduce((n, c) => n + c.score, 0) / started.length);
  const count = x.chapterCount - x.levels.not_started;
  return count > 0 ? Math.min(100, Math.round((x.score * x.chapterCount) / count)) : 0;
}

/** "3 of 15 chapters started" (table, sentence, bars) and "3/15 chapters" (under a chart label). */
export function chaptersStartedText(started: number, total: number): { full: string; short: string } {
  return { full: `${n(started)} of ${n(total)} ${total === 1 ? 'chapter' : 'chapters'} started`, short: `${n(started)}/${n(total)} ${total === 1 ? 'chapter' : 'chapters'}` };
}

export interface SubjectBarView {
  subjectId: string;
  name: string;
  /** Mastery over the chapters started. */
  score: number;
  started: number;
  chapterCount: number;
}

export type SubjectRadarView =
  | { kind: 'none' }
  | { kind: 'bars'; bars: SubjectBarView[] }
  | { kind: 'radar'; axes: RadarAxis[]; more: number };

/**
 * Mastery by subject (GET /v1/me/mastery `subjects`). Each value is the mean mastery over the chapters the student
 * has started (`startedMastery`), with "N of M chapters started" beside it, so a subject is not judged on chapters
 * not yet opened. Subjects with no chapter started are left out. Ranked by chapters started (then value, then name),
 * so the radar keeps the subjects the student works on: the top `SUBJECT_RADAR_MAX`, with the rest counted. Fewer
 * than `SUBJECT_RADAR_MIN` subjects: bars, highest value first. Chart labels use `shortSubjectName`.
 */
export function subjectRadar(subjects: readonly SubjectMastery[]): SubjectRadarView {
  const ranked = subjects
    .map((x) => ({ x, started: x.chapterCount - x.levels.not_started, score: startedMastery(x) }))
    .filter((r) => r.x.chapterCount > 0 && r.started > 0)
    .sort((a, b) => b.started - a.started || b.score - a.score || a.x.name.localeCompare(b.x.name));
  if (ranked.length === 0) return { kind: 'none' };
  if (ranked.length < SUBJECT_RADAR_MIN) {
    return {
      kind: 'bars',
      bars: [...ranked].sort((a, b) => b.score - a.score || a.x.name.localeCompare(b.x.name)).map((r) => ({ subjectId: r.x.subjectId, name: r.x.name, score: r.score, started: r.started, chapterCount: r.x.chapterCount })),
    };
  }
  const shown = ranked.slice(0, SUBJECT_RADAR_MAX);
  return {
    kind: 'radar',
    axes: shown.map((r) => {
      const ch = chaptersStartedText(r.started, r.x.chapterCount);
      return { key: r.x.subjectId, label: r.x.name, short: shortSubjectName(r.x.name), value: r.score, max: 100, note: ch.full, noteShort: ch.short };
    }),
    more: ranked.length - shown.length,
  };
}

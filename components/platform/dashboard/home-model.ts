/**
 * Home (`/me/dashboard`, design language v3 §10 "Home") view-models: pure functions from the session, GET
 * /v1/me/dashboard, the learner progress, the chapter hub, live events and the league to what the calm "today"
 * page shows. Copy follows the age stage (DESIGN-LANGUAGE §6); every time and day is India time. No invented
 * numbers: each value is an API field or a direct count of one. Tested in __tests__/home-model.test.ts.
 */
import type { ChapterHub, DailyChallenge, LiveEvent, Schemas, WeeklyGoal } from '@/platform/shared/api-client';
import type { ChapterSnapshot } from '../lib/learner';
import { learnPath, type BoardSlug } from '../lib/catalog';
import { lessonHref } from '../lib/lesson-links';
import { chapterHref } from '../learn/links';
import { subjectStyle, subjectTintFor } from '../learn/subject-style';
import type { SubjectArtKind } from '@/components/platform/ui/art/subject-art';
import type { LeaderboardRow } from '@/components/platform/ui/kit/Rail';
import type { Tint } from '@/components/platform/ui/kit/tints';
import type { StatusTone } from '@/components/platform/ui/kit/Lists';
import type { Stage } from '../shell/stage';

type LeagueCurrent = Schemas['LeagueCurrent'];

const IST = 'Asia/Kolkata';
const n = (v: number) => v.toLocaleString('en-IN');
const plural = (count: number, one: string, many = `${one}s`) => `${n(count)} ${count === 1 ? one : many}`;

/* ── Greeting and the one line under it ──────────────────────────────────── */

export type DayPart = 'Good morning' | 'Good afternoon' | 'Good evening';

/**
 * The hero title per stage (§6 copy tone): junior "Hi Asha, ready to explore?", middle "Good evening, Asha",
 * senior "Evening, Asha". `part` is null before mount (static HTML never bakes the hour): a neutral "Hi, Asha".
 */
export function homeTitle(stage: Stage, part: DayPart | null, name: string | null): string {
  const who = name?.trim() || null;
  if (stage === 'junior') return who ? `Hi ${who}, ready to explore?` : 'Hi, ready to explore?';
  if (!part) return who ? `Hi, ${who}` : 'Hi there';
  if (stage === 'senior') {
    const short = part.replace(/^Good (\w)/, (_, c: string) => c.toUpperCase());
    return who ? `${short}, ${who}` : part;
  }
  return who ? `${part}, ${who}` : part;
}

export interface SubtitleInput {
  /** Nothing answered, finished or submitted and nothing to continue. */
  fresh: boolean;
  goal: Pick<WeeklyGoal, 'met' | 'remaining' | 'daysLeft' | 'target'>;
  /** Current streak (days) and whether today already counts. Null while loading. */
  streak: { current: number; today: boolean } | null;
}

/** One encouraging line under the greeting: streak or goal, never a guilt trip and never a zero. */
export function homeSubtitle(stage: Stage, x: SubtitleInput): string {
  const pick = <T,>(v: { junior: T; middle: T; senior: T }) => v[stage];
  if (x.fresh) {
    return pick({
      junior: 'Lessons, practice and tests are all free. Pick any subject to begin.',
      middle: 'Everything here is free. Pick a subject and start with a short lesson.',
      senior: 'Start with any subject. Lessons, practice and tests are free.',
    });
  }
  if (x.goal.met) {
    return pick({
      junior: 'You hit this week’s goal. Anything extra is a bonus.',
      middle: 'You met this week’s goal. Anything more is a bonus.',
      senior: 'Weekly goal met. Extra practice still builds mastery.',
    });
  }
  const s = x.streak;
  if (s && s.current >= 2 && s.today) {
    return pick({ junior: `Nice one! ${s.current} days in a row.`, middle: `Good work: ${s.current} days in a row.`, senior: `${s.current} days in a row.` });
  }
  if (s && s.current >= 2) {
    return pick({
      junior: `Your ${s.current}-day streak is waiting. One short lesson keeps it going.`,
      middle: `One short lesson keeps your ${s.current}-day streak going.`,
      senior: `${s.current}-day streak. One session today keeps it.`,
    });
  }
  const left = plural(x.goal.remaining, 'question');
  return pick({
    junior: `${left} to go for this week’s goal. You can do it.`,
    middle: `${left} to go for this week’s goal.`,
    senior: `${left} left on this week’s goal · ${plural(x.goal.daysLeft, 'day')} to go.`,
  });
}

/* ── The next step (the hero's one primary action) ───────────────────────── */

export interface NextStep {
  href: string;
  label: string;
  /** What the link opens (data-kind, tests). */
  kind: 'lesson' | 'practice' | 'chapter' | 'class' | 'learn';
}

/** Total lesson parts of a chapter from its hub (0 when it has no lesson). */
export function lessonParts(hub: ChapterHub | null): number {
  return hub?.assets.lesson.available ? hub.assets.lesson.parts.length : 0;
}

/** "Continue Chapter 3" in the stage's tone; senior names the chapter when it is short enough for a pill. */
export function continueLabel(stage: Stage, chapter: Pick<ChapterSnapshot, 'number' | 'title'>): string {
  const num = chapter.number ?? null;
  const title = chapter.title?.trim() || null;
  if (stage === 'junior') return num ? `Let’s go: Chapter ${num}` : 'Let’s go';
  if (stage === 'senior' && title && title.length <= 24) return `Continue: ${title}`;
  return num ? `Continue Chapter ${num}` : 'Continue';
}

/**
 * Where "Continue" goes: the lesson part the student was on while the lesson is unfinished, then practice once
 * every part is done (when the chapter has practice), else the chapter hub. Without a chapter: the class hub
 * ("Pick a subject"), or /learn when the class is not set.
 */
export function nextStep(stage: Stage, x: { chapter: ChapterSnapshot | null; hub: ChapterHub | null; board: BoardSlug | null; classLevel: number | null }): NextStep {
  const c = x.chapter;
  const base = c ? chapterHref(c.chapterId) : null;
  if (c && base) {
    const label = continueLabel(stage, c);
    const parts = lessonParts(x.hub);
    if (x.hub && parts > 0 && c.lessonPartsCompleted < parts) {
      const listed = x.hub.assets.lesson.parts;
      const part = c.lastPart !== null && listed.some((p) => p.part === c.lastPart) ? c.lastPart : listed[0]?.part;
      return { href: lessonHref(base, listed, part), label, kind: 'lesson' };
    }
    if (x.hub?.assets.practice.available) return { href: `${base}/practice`, label, kind: 'practice' };
    return { href: base, label, kind: 'chapter' };
  }
  if (x.board && x.classLevel) return { href: learnPath(x.board, x.classLevel), label: 'Pick a subject', kind: 'class' };
  return { href: '/learn', label: 'Pick a subject', kind: 'learn' };
}

/** "Science · Chapter 1 · Part 2 of 3" (or "… · Lesson done" / "… · 4 answered"). */
export function continueMeta(chapter: ChapterSnapshot, hub: ChapterHub | null, subjectName: string | null): string {
  const bits: string[] = [];
  if (subjectName) bits.push(subjectName);
  if (chapter.number) bits.push(`Chapter ${chapter.number}`);
  const parts = lessonParts(hub);
  if (parts > 0 && chapter.lessonPartsCompleted >= parts) bits.push('Lesson done');
  else if (parts > 1 && chapter.lastPart !== null) {
    const idx = hub!.assets.lesson.parts.findIndex((p) => p.part === chapter.lastPart);
    if (idx >= 0) bits.push(`On part ${idx + 1} of ${parts}`);
  }
  if (chapter.answered > 0) bits.push(`${n(chapter.answered)} answered`);
  return bits.join(' · ');
}

/** Lesson parts done as a bar ("1 of 3 parts"), or null when the chapter has no multi-part lesson. */
export function continueProgress(chapter: ChapterSnapshot, hub: ChapterHub | null): { value: number; label: string } | null {
  const parts = lessonParts(hub);
  if (parts === 0) return null;
  const done = Math.min(parts, chapter.lessonPartsCompleted);
  return { value: (done / parts) * 100, label: parts === 1 ? (done ? 'Lesson done' : 'Lesson started') : `${done} of ${parts} parts done` };
}

/* ── Subjects ────────────────────────────────────────────────────────────── */

export interface SubjectLook {
  tint: Tint;
  art: SubjectArtKind;
  /** "hi" for a Devanagari name. */
  lang?: string;
}

const DEVANAGARI = /[ऀ-ॿ]/;

/**
 * A subject's tint and glyph, the same on every page: the subject-art kind's tint (DESIGN-LANGUAGE §2: Maths
 * blue, Science green, English pink, Hindi red …), or the course pages' hue for subjects without a kind.
 */
export function subjectLook(subjectId: string, name: string, language?: string | null): SubjectLook {
  const st = subjectStyle(subjectId, name, language);
  return { tint: subjectTintFor(subjectId, name, language), art: st.art, ...(DEVANAGARI.test(name) || language === 'hi' ? { lang: 'hi' } : {}) };
}

/** Mastery under this many percent is not named on a subject card (it reads as failure, not progress). */
export const MASTERY_SHOWN_FROM = 10;

export interface SubjectCardView extends SubjectLook {
  subjectId: string;
  name: string;
  href: string;
  meta: string;
  progress: { value: number; label: string } | null;
  started: number;
}

/**
 * Your subjects: the class subjects that have lessons (the daily-challenge list, one per subject with content),
 * with mastery where the student has started (GET /v1/me/mastery) and chapters started (GET /v1/me/progress).
 */
export function subjectCards(
  subjects: readonly { subjectId: string; name: string }[],
  board: BoardSlug,
  classLevel: number,
  mastery: readonly { subjectId: string; score: number; chapterCount: number }[],
  started: ReadonlyMap<string, number>,
  stage: Stage,
): SubjectCardView[] {
  return subjects.map((sub) => {
    const m = mastery.find((x) => x.subjectId === sub.subjectId);
    const count = started.get(sub.subjectId) ?? 0;
    // The bar shows chapters started (always encouraging, never "0% mastery"); mastery is named once it means something.
    const total = m?.chapterCount ?? 0;
    const meta =
      count === 0
        ? stage === 'junior'
          ? 'Ready when you are'
          : 'Not started yet'
        : m && m.score >= MASTERY_SHOWN_FROM
          ? `${m.score}% mastery`
          : stage === 'junior'
            ? 'Off to a good start'
            : 'Started';
    return {
      subjectId: sub.subjectId,
      name: sub.name,
      href: learnPath(board, classLevel, sub.subjectId),
      meta,
      progress: count > 0 && total > 0 ? { value: (Math.min(count, total) / total) * 100, label: `${n(Math.min(count, total))} of ${plural(total, 'chapter')}` } : null,
      started: count,
      ...subjectLook(sub.subjectId, sub.name),
    };
  });
}

/** Subjects with content from the daily-challenge list (one entry per subject), in the API's order. */
export function contentSubjects(dc: Pick<DailyChallenge, 'challenges'> | null): { subjectId: string; name: string }[] {
  if (!dc) return [];
  const seen = new Set<string>();
  return dc.challenges.filter((c) => !seen.has(c.subjectId) && seen.add(c.subjectId)).map((c) => ({ subjectId: c.subjectId, name: c.subjectName }));
}

/* ── Study your way ──────────────────────────────────────────────────────── */

export interface ModeView {
  mode: 'lesson' | 'notes' | 'flashcards' | 'practice' | 'tests';
  href: string | null;
  meta: string;
}

/** The chapter's study modes with their real state, plus Tests. A mode the chapter does not have yet is shown as
 *  "Coming soon" (disabled), never as a broken link. */
export function modeTiles(chapterId: string, hub: ChapterHub, chapter: ChapterSnapshot | null): ModeView[] {
  const base = chapterHref(chapterId) ?? '/learn';
  const a = hub.assets;
  const parts = a.lesson.available ? a.lesson.parts.length : 0;
  const done = chapter ? Math.min(parts, chapter.lessonPartsCompleted) : 0;
  return [
    {
      mode: 'lesson',
      href: a.lesson.available ? `${base}/lesson` : null,
      meta: !a.lesson.available ? 'Coming soon' : parts > 1 ? (done > 0 ? `${done} of ${parts} parts done` : `${parts} parts · ${n(a.lesson.slideCount)} slides`) : `${n(a.lesson.slideCount)} slides`,
    },
    { mode: 'notes', href: a.notes.available ? `${base}/notes` : null, meta: a.notes.available ? plural(a.notes.sections, 'section') : 'Coming soon' },
    { mode: 'flashcards', href: a.flashcards.available ? `${base}/flashcards` : null, meta: a.flashcards.available ? plural(a.flashcards.count, 'card') : 'Coming soon' },
    {
      mode: 'practice',
      href: a.practice.available ? `${base}/practice` : null,
      meta: !a.practice.available ? 'Coming soon' : chapter && chapter.answered > 0 ? `${n(chapter.answered)} of ${plural(a.practice.count, 'question')} tried` : plural(a.practice.count, 'question'),
    },
    { mode: 'tests', href: '/tests', meta: a.tests.available && a.tests.count > 0 ? `${plural(a.tests.count, 'chapter test')} · free` : 'Free chapter and board papers' },
  ];
}

/* ── Upcoming live mocks ─────────────────────────────────────────────────── */

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-IN', { timeZone: IST, ...opts });
const WEEKDAY = fmt({ weekday: 'short' });
const DAY_MONTH = fmt({ day: 'numeric', month: 'short' });
const TIME = fmt({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

/** "Sat 15 Nov" in India time. */
export function istDayLabel(iso: string | number | Date): string {
  const d = new Date(iso);
  return `${WEEKDAY.format(d)} ${DAY_MONTH.format(d)}`;
}

/** "3 h", "45 min", "1 h 30 min". */
export function durationText(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export interface UpcomingMock {
  id: string;
  time: string;
  timeSub: string;
  title: string;
  meta: string;
  href: string;
  status: { tone: StatusTone; text: string } | null;
  tint: Tint;
}

const OPEN_PHASES: ReadonlySet<LiveEvent['phase']> = new Set(['upcoming', 'registration_open', 'live']);

/** The next live mocks that can still be joined (live now first, then by start time), at most `limit`. */
export function upcomingMocks(events: readonly LiveEvent[], nowMs: number, limit = 3): UpcomingMock[] {
  return events
    .filter((e) => OPEN_PHASES.has(e.phase) && Date.parse(e.lateStartUntil) > nowMs)
    .sort((a, b) => (a.phase === 'live' ? 0 : 1) - (b.phase === 'live' ? 0 : 1) || Date.parse(a.startsAt) - Date.parse(b.startsAt))
    .slice(0, limit)
    .map((e) => {
      const starts = new Date(e.startsAt);
      const status: UpcomingMock['status'] =
        e.phase === 'live' ? { tone: 'live', text: 'Live now' } : e.me?.registered ? { tone: 'success', text: 'Registered' } : e.phase === 'registration_open' ? { tone: 'info', text: 'Open to join' } : null;
      return {
        id: e.id,
        time: WEEKDAY.format(starts),
        timeSub: DAY_MONTH.format(starts),
        title: e.title,
        meta: `${TIME.format(starts)} · ${durationText(e.durationMin)} · ${n(e.totalMarks)} marks`,
        href: `/tests/live/${encodeURIComponent(e.id)}`,
        status,
        tint: subjectLook(e.subject.id, e.subject.name).tint,
      };
    });
}

/* ── Weekly league ───────────────────────────────────────────────────────── */

/** Top five of the student's league plus their own row when they are lower down ("You" is written). */
export function leagueRows(l: Pick<LeagueCurrent, 'standings' | 'me'>, top = 5): LeaderboardRow[] {
  const row = (s: LeagueCurrent['standings'][number]): LeaderboardRow => ({ rank: s.rank, name: s.name ?? 'A student', avatar: s.avatar, score: s.xp, ...(s.isMe ? { you: true } : {}) });
  const rows = l.standings.slice(0, top).map(row);
  if (!rows.some((r) => r.you)) {
    const mine = l.standings.find((s) => s.isMe);
    if (mine) rows.push(row(mine));
  }
  return rows;
}

export const ZONE_TEXT = { promotion: 'Promotion zone', safe: 'Safe this week', relegation: 'Relegation zone' } as const;

/* ── Goal card ───────────────────────────────────────────────────────────── */

/** "10–16 Nov" (or "28 Oct – 3 Nov") for an IST week. */
export function weekRange(from: string, to: string): string {
  const d = (ymd: string) => new Date(`${ymd}T12:00:00Z`);
  const a = d(from);
  const b = d(to);
  const day = (x: Date) => x.getUTCDate();
  const mon = (x: Date) => new Intl.DateTimeFormat('en-IN', { month: 'short', timeZone: 'UTC' }).format(x);
  return mon(a) === mon(b) ? `${day(a)}–${day(b)} ${mon(b)}` : `${day(a)} ${mon(a)} – ${day(b)} ${mon(b)}`;
}

/** The ring's title line ("13 more to go", "Goal met · 2 extra"). */
export function goalTitle(stage: Stage, g: Pick<WeeklyGoal, 'met' | 'progress' | 'target' | 'remaining'>): string {
  if (g.met) {
    const extra = g.progress - g.target;
    return stage === 'junior' ? (extra > 0 ? `Goal smashed: ${n(extra)} extra` : 'Goal reached. Nice one!') : extra > 0 ? `Goal met · ${n(extra)} extra` : 'Goal met';
  }
  return `${n(g.remaining)} more to go`;
}

/** The ring's caption: days left, and what counts (stage tone). */
export function goalCaption(stage: Stage, g: Pick<WeeklyGoal, 'met' | 'daysLeft'>): string {
  const counts = stage === 'junior' ? 'New questions you get right count.' : stage === 'senior' ? 'First-time solves count.' : 'New practice questions you solve count.';
  if (g.met) return counts;
  return `${g.daysLeft === 0 ? 'Last day this week.' : `${plural(g.daysLeft, 'day')} left this week.`} ${counts}`;
}

/** Days of the activity calendar with anything done (YYYY-MM-DD, IST). */
export function activeDays(calendar: readonly { date: string; total: number }[]): string[] {
  return calendar.filter((d) => d.total > 0).map((d) => d.date);
}

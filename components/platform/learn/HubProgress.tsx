'use client';

/**
 * The chapter hub's private half (ADR-010 §1): members → GET /v1/me/progress/chapters/:id (client-side, after the
 * public ISR page is on screen); guests → soyl_guest_v1 on this device. Small islands read one context.
 * Design language v3 (ADR-032): the resume point as a ContinueCard, "Study your way" ModeTiles with real state in
 * their meta line, the learning path as a List of steps, and the chapter's mastery for the rail.
 */
import Link from 'next/link';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { MyChapterProgress } from '@/platform/shared/api-client';
import { Badge, ProgressBar } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { StatusPill } from '@/components/platform/ui/kit/Lists';
import { MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { ContinueCard, IconTile, ModeTile } from '@/components/platform/ui/kit/Tiles';
import { STUDY_MODES, type StudyMode, type Tint } from '@/components/platform/ui/kit/tints';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { chapterSummary, guestAnswersFor, readGuestLessonPosition, readGuestProgress } from '../lib/guest-storage';
import { lessonHref } from '../lib/lesson-links';
import { chapterMastery, evidenceFrom, MASTERY_HINT_TEXT, MASTERY_LABELS } from '../lib/mastery';
import { useStage } from '../shell/StageProvider';
import { continuePill } from './copy';
import { useCourseMastery } from './MasteryProvider';
import v from './v3.module.css';

export interface PartState {
  part: number;
  slide: number | null;
  completed: boolean;
}

export interface HubProgressState {
  source: 'member' | 'device';
  parts: PartState[];
  practiceAnswered: number;
  practiceCorrect: number;
}

const Ctx = createContext<HubProgressState | null>(null);

export function HubProgressProvider({ chapterId, parts, children }: { chapterId: string; parts: { part: number; slideCount: number }[]; children: ReactNode }) {
  const { state } = useSession();
  const [progress, setProgress] = useState<HubProgressState | null>(null);
  const partsKey = parts.map((p) => p.part).join(',');

  useEffect(() => {
    if (state.status === 'loading') return;
    let cancelled = false;
    if (state.status === 'member') {
      api
        .get('/v1/me/progress/chapters/{id}', { params: { id: chapterId } })
        .then((res: MyChapterProgress) => {
          if (cancelled) return;
          setProgress({
            source: 'member',
            parts: res.lessons.map((l) => ({ part: l.part, slide: l.slide, completed: l.completedAt !== null })),
            practiceAnswered: res.practice.questionsAnswered,
            practiceCorrect: res.practice.questionsCorrect,
          });
        })
        .catch(() => {
          if (!cancelled) setProgress(null);
        });
    } else {
      const p = readGuestProgress();
      const summary = chapterSummary(p, chapterId);
      const answers = guestAnswersFor(p, chapterId);
      const list = partsKey ? partsKey.split(',').map(Number) : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
      setProgress({
        source: 'device',
        parts: list.map((part, i) => {
          const l = readGuestLessonPosition(p, chapterId, part) ?? (i === 0 ? readGuestLessonPosition(p, chapterId, undefined) : null);
          return { part, slide: l ? l.slide : null, completed: l?.completed ?? false };
        }),
        practiceAnswered: summary.practiceAnswered,
        practiceCorrect: [...answers.values()].filter(Boolean).length,
      });
    }
    return () => {
      cancelled = true;
    };
  }, [state.status, chapterId, partsKey]);

  return <Ctx.Provider value={progress}>{children}</Ctx.Provider>;
}

export function useHubProgress(): HubProgressState | null {
  return useContext(Ctx);
}

/** "Slide 5 of 21" / "Done" under a lesson part. */
export function PartProgress({ part, slideCount }: { part: number; slideCount: number }) {
  const p = useHubProgress()?.parts.find((x) => x.part === part);
  if (!p || (p.slide === null && !p.completed)) return null;
  if (p.completed)
    return (
      <Badge tone="success" icon="check" data-testid={`part-${part}-done`}>
        Done
      </Badge>
    );
  return (
    <span className={v.partProgress} data-testid={`part-${part}-progress`}>
      <ProgressBar value={(p.slide ?? 0) + 1} max={slideCount} label="Part progress" valueText={`Slide ${(p.slide ?? 0) + 1} of ${slideCount}`} hideLabel thin />
      <span>
        Slide {(p.slide ?? 0) + 1} of {slideCount}
      </span>
    </span>
  );
}

export function PracticeProgress({ total }: { total: number }) {
  const p = useHubProgress();
  if (!p || p.practiceAnswered === 0) return null;
  return (
    <span className={v.progressNote} data-testid="practice-progress">
      {p.practiceCorrect} correct of {p.practiceAnswered} answered · {total} questions
      {p.source === 'device' ? ' (on this device)' : ''}
    </span>
  );
}

/* ── The resume point and the study modes ───────────────────────────────────────────────────────────────── */

export interface HubPart {
  part: number;
  slideCount: number;
  /** "Part 1: Equations …" (or the chapter title for a single-part lesson). */
  label: string;
}

export interface HubAssets {
  base: string;
  /** Lesson parts in order; [] when the lesson is not ready yet. */
  parts: HubPart[];
  notes: { available: boolean; sections: number };
  flashcards: { available: boolean; count: number };
  practice: { available: boolean; count: number };
  tests: { count: number; href: string };
}

/** The lesson part to open next: the one in progress, else the first not completed, else the first. */
export function resumePart(parts: readonly HubPart[], p: HubProgressState | null): { part: HubPart; state: PartState | null } | null {
  if (parts.length === 0) return null;
  const st = (x: HubPart) => p?.parts.find((y) => y.part === x.part) ?? null;
  const inProgress = parts.find((x) => {
    const s = st(x);
    return !!s && s.slide !== null && !s.completed;
  });
  if (inProgress) return { part: inProgress, state: st(inProgress) };
  const open = parts.find((x) => !st(x)?.completed);
  if (open) return { part: open, state: st(open) };
  return { part: parts[0]!, state: st(parts[0]!) };
}

type ResumeKind = 'continue-lesson' | 'start-lesson' | 'next-part' | 'practice' | 'notes';

/** What "continue" means on this chapter right now (pure; tested). */
export function hubResume(a: HubAssets, p: HubProgressState | null): { kind: ResumeKind; part?: HubPart; slide?: number } | null {
  const lessonDone = a.parts.length > 0 && !!p && a.parts.every((x) => p.parts.find((y) => y.part === x.part)?.completed);
  if (a.parts.length > 0 && !lessonDone) {
    const r = resumePart(a.parts, p)!;
    if (r.state && r.state.slide !== null && !r.state.completed) return { kind: 'continue-lesson', part: r.part, slide: r.state.slide };
    const anyDone = !!p?.parts.some((x) => x.completed);
    return { kind: anyDone ? 'next-part' : 'start-lesson', part: r.part };
  }
  if (a.practice.available && stepState('practice', true, p, a.practice.count) !== 'done') return { kind: 'practice' };
  if (a.notes.available) return { kind: 'notes' };
  return null;
}

/** The chapter's ONE primary action (DESIGN-LANGUAGE §10 "Chapter hub"): a ContinueCard to the resume point. */
export function HubContinue({ assets, chapterTitle, tint, art, lang }: { assets: HubAssets; chapterTitle: string; tint: Tint; art: ReactNode; lang?: string }) {
  const p = useHubProgress();
  const { pick, stage } = useStage();
  const r = hubResume(assets, p);
  if (!r) return null;
  const common = { tint, art, lang } as const;
  if (r.kind === 'continue-lesson' || r.kind === 'start-lesson' || r.kind === 'next-part') {
    const part = r.part!;
    const going = r.kind === 'continue-lesson';
    const slide = (r.slide ?? 0) + 1;
    return (
      <ContinueCard
        {...common}
        href={lessonHref(assets.base, assets.parts, part.part)}
        eyebrow={going ? 'Continue where you left off' : r.kind === 'next-part' ? 'Up next' : pick({ junior: 'Start here', middle: 'Start here', senior: 'Start with the lesson' })}
        title={part.label}
        meta={going ? `Lesson · Slide ${slide} of ${part.slideCount}` : `Lesson · ${part.slideCount} slides`}
        progress={going ? { value: (slide / Math.max(1, part.slideCount)) * 100, label: `${Math.round((slide / Math.max(1, part.slideCount)) * 100)}%` } : undefined}
        cta={continuePill(stage, going ? 'continue' : 'start')}
        data-testid={going ? 'continue-lesson' : 'continue-next'}
      />
    );
  }
  if (r.kind === 'practice') {
    const answered = p?.practiceAnswered ?? 0;
    return (
      <ContinueCard
        {...common}
        href={`${assets.base}/practice`}
        eyebrow={answered > 0 ? 'Continue where you left off' : 'Up next'}
        title={`Practice: ${chapterTitle}`}
        meta={answered > 0 ? `${answered} of ${assets.practice.count} answered` : `${assets.practice.count} questions with instant checks`}
        progress={answered > 0 ? { value: (answered / Math.max(1, assets.practice.count)) * 100, label: `${answered} of ${assets.practice.count}` } : undefined}
        cta={continuePill(stage, answered > 0 ? 'continue' : 'start')}
        data-testid="continue-next"
      />
    );
  }
  return (
    <ContinueCard
      {...common}
      href={`${assets.base}/notes`}
      eyebrow="Revise"
      title={`Notes: ${chapterTitle}`}
      meta={`${assets.notes.sections} sections with key terms and exam tips`}
      cta={pick({ junior: "Let's read", middle: 'Read', senior: 'Read' })}
      data-testid="continue-next"
    />
  );
}

/** "Study your way": one ModeTile per study mode, with what the student has done in each. */
export function StudyModes({ assets }: { assets: HubAssets }) {
  const p = useHubProgress();
  const r = resumePart(assets.parts, p);
  const lessonState = stepState('lesson', assets.parts.length > 0, p);
  const partIndex = r ? assets.parts.indexOf(r.part) : 0;
  const slides = assets.parts.reduce((n, x) => n + x.slideCount, 0);
  const lessonMeta =
    lessonState === 'done'
      ? 'Done · watch again'
      : lessonState === 'progress' && r
        ? assets.parts.length > 1
          ? `Part ${partIndex + 1} of ${assets.parts.length}`
          : `Slide ${(r.state?.slide ?? 0) + 1} of ${r.part.slideCount}`
        : `${assets.parts.length > 1 ? `${assets.parts.length} parts · ` : ''}${slides} slides`;
  const answered = p?.practiceAnswered ?? 0;
  const soon = 'Coming soon';
  const tile = (mode: StudyMode, available: boolean, href: string, meta: string, title?: string) => (
    <ModeTile key={mode} mode={mode} title={title} href={available ? href : undefined} disabled={!available} meta={available ? meta : soon} data-testid={`mode-${mode}`} />
  );
  return (
    <>
      {tile('lesson', assets.parts.length > 0, r ? lessonHref(assets.base, assets.parts, r.part.part) : `${assets.base}/lesson`, lessonMeta)}
      {tile('notes', assets.notes.available, `${assets.base}/notes`, `${assets.notes.sections} sections`)}
      {tile('flashcards', assets.flashcards.available, `${assets.base}/flashcards`, `${assets.flashcards.count} cards`)}
      {tile('practice', assets.practice.available, `${assets.base}/practice`, answered > 0 ? `${answered} of ${assets.practice.count} answered` : `${assets.practice.count} questions`)}
      {tile('tests', true, assets.tests.href, assets.tests.count > 0 ? `${assets.tests.count} free ${assets.tests.count === 1 ? 'test' : 'tests'}` : 'Free, board pattern', 'Chapter test')}
    </>
  );
}

/* ── ADR-023: the chapter's learning path (Lesson → Notes → Flashcards → Practice → Chapter test) ────── */

export type StepKind = 'lesson' | 'notes' | 'flashcards' | 'practice' | 'test';
export type StepState = 'done' | 'progress' | 'todo' | 'soon';

/** A step's state from the hub progress (pure; tested). Notes, flashcards and tests are not tracked here. */
export function stepState(kind: StepKind, available: boolean, p: HubProgressState | null, practiceTotal = 0): StepState {
  if (!available) return 'soon';
  if (!p) return 'todo';
  if (kind === 'lesson') {
    if (p.parts.length > 0 && p.parts.every((x) => x.completed)) return 'done';
    return p.parts.some((x) => x.completed || x.slide !== null) ? 'progress' : 'todo';
  }
  if (kind === 'practice') {
    if (practiceTotal > 0 && p.practiceCorrect >= Math.ceil(practiceTotal * 0.6)) return 'done';
    return p.practiceAnswered > 0 ? 'progress' : 'todo';
  }
  return 'todo';
}

const STATE_TEXT: Record<StepState, string> = { done: 'Done', progress: 'In progress', todo: 'Not started', soon: 'Coming soon' };
const STEP_MODE: Record<StepKind, StudyMode> = { lesson: 'lesson', notes: 'notes', flashcards: 'flashcards', practice: 'practice', test: 'tests' };

/**
 * One step of the path as a List row: the mode's IconTile, title (+ Beta), what it holds, and its state written
 * as a pill ("Done", "In progress", "Coming soon"). With `href` the row is one link; `children` go below the row
 * (the lesson's parts).
 */
export function PathStep({
  kind,
  number,
  available,
  practiceTotal,
  testId,
  title,
  meta,
  href,
  badge,
  lang,
  children,
}: {
  kind: StepKind;
  number: number;
  available: boolean;
  practiceTotal?: number;
  testId: string;
  title: string;
  meta?: ReactNode;
  href?: string;
  badge?: ReactNode;
  lang?: string;
  children?: ReactNode;
}) {
  const progress = useHubProgress();
  const state = stepState(kind, available, progress, practiceTotal);
  const mode = STUDY_MODES[STEP_MODE[kind]];
  const body = (
    <>
      <IconTile icon={state === 'done' ? 'check' : mode.icon} tint={state === 'soon' ? 'neutral' : mode.tint} size="md" />
      <span className={v.stepText}>
        <span className={v.stepTitle}>
          <span className="p-visually-hidden">Step {number}: </span>
          {title}
          {badge}
        </span>
        {meta && (
          <span className={v.stepMeta} lang={lang}>
            {meta}
          </span>
        )}
      </span>
      <span className={v.stepTrail}>
        {state === 'done' && <StatusPill tone="success">Done</StatusPill>}
        {state === 'progress' && <StatusPill tone="info">In progress</StatusPill>}
        {state === 'soon' && <StatusPill tone="neutral">Coming soon</StatusPill>}
        {state === 'todo' && <span className="p-visually-hidden">{STATE_TEXT.todo}</span>}
        {href && <Icon name="chevronRight" size={18} />}
      </span>
    </>
  );
  return (
    <li className={v.step} data-state={state} data-testid={testId} data-step={kind}>
      {href ? (
        <Link href={href} className={v.stepRow}>
          {body}
        </Link>
      ) : (
        <div className={v.stepRow}>{body}</div>
      )}
      {children}
    </li>
  );
}

/** Chapter mastery for the rail: ring, level, what to do next (members: API; guests: device). */
export function HubMastery({ chapterId, lessonParts, practiceTotal }: { chapterId: string; lessonParts: number; practiceTotal: number }) {
  const m = useCourseMastery();
  const progress = useHubProgress();
  // The hub's own progress is the freshest for this chapter (members: GET /v1/me/progress/chapters/:id).
  const local = progress
    ? chapterMastery(
        evidenceFrom(
          {
            lessonPartsStarted: progress.parts.filter((x) => x.slide !== null || x.completed).length,
            lessonPartsCompleted: progress.parts.filter((x) => x.completed).length,
            answered: progress.practiceAnswered,
            correct: progress.practiceCorrect,
          },
          { lessonParts, practiceTotal },
        ),
      )
    : null;
  const fromApi = m.chapter(chapterId, { lessonParts, practiceTotal });
  const pick = fromApi.source === 'api' && fromApi.level !== 'not_started' ? fromApi : local ? { level: local.level, score: local.score, hints: local.hints } : fromApi;
  return (
    <div className={v.mastery} data-testid="chapter-mastery" data-level={pick.level}>
      <ProgressRing value={pick.score} size={64} stroke={7} level={pick.level} label={`Chapter mastery: ${MASTERY_LABELS[pick.level]}, ${pick.score}%`} />
      <div>
        <p className={v.masteryLevel}>
          <MasteryPip level={pick.level} /> {MASTERY_LABELS[pick.level]}
          {pick.level !== 'not_started' ? ` · ${pick.score}%` : ''}
        </p>
        {pick.hints.length > 0 && (
          <ul className={v.masteryHints}>
            {pick.hints.slice(0, 2).map((h) => (
              <li key={h}>{MASTERY_HINT_TEXT[h]}</li>
            ))}
          </ul>
        )}
        {pick.level === 'mastered' && <p className={v.masteryHints}>You have mastered this chapter. Keep it fresh with a chapter test.</p>}
      </div>
    </div>
  );
}

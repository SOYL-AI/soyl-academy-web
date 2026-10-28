'use client';

/**
 * The hub's private half (ADR-010 §1): members → GET /v1/me/progress/chapters/:id (client-side, after the
 * public ISR page is on screen); guests → soyl_guest_v1 on this device. Small islands read one context.
 */
import Link from 'next/link';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { MyChapterProgress } from '@/platform/shared/api-client';
import { Badge } from '@/components/platform/ui/kit/Display';
import { ProgressBar } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { chapterSummary, guestAnswersFor, readGuestLessonPosition, readGuestProgress } from '../lib/guest-storage';
import { lessonHref, type PartLike } from '../lib/lesson-links';
import { MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { chapterMastery, evidenceFrom, MASTERY_HINT_TEXT, MASTERY_LABELS } from '../lib/mastery';
import { useCourseMastery } from './MasteryProvider';
import s from './hub.module.css';
import c from './course.module.css';

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

/** "Slide 5 of 21" / "Done" next to a lesson part. */
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
    <span className={s.partProgress} data-testid={`part-${part}-progress`}>
      <ProgressBar value={(p.slide ?? 0) + 1} max={slideCount} label={`Part progress`} valueText={`Slide ${(p.slide ?? 0) + 1} of ${slideCount}`} hideLabel thin />
      <span>
        Slide {(p.slide ?? 0) + 1} of {slideCount}
      </span>
    </span>
  );
}

/** "Continue: Part 2, slide 7" when something is in progress. */
export function ContinueLesson({ base, parts, titles }: { base: string; parts: PartLike[]; titles: Record<number, string> }) {
  const progress = useHubProgress();
  const inProgress = progress?.parts.find((p) => p.slide !== null && !p.completed);
  if (!inProgress) return null;
  return (
    <Link href={lessonHref(base, parts, inProgress.part)} className={s.continue} data-testid="continue-lesson">
      <Icon name="play" size={18} />
      <span>
        Continue {parts.length > 1 ? `${titles[inProgress.part] ?? `part ${inProgress.part}`}, ` : ''}slide {(inProgress.slide ?? 0) + 1}
      </span>
    </Link>
  );
}

export function PracticeProgress({ total }: { total: number }) {
  const p = useHubProgress();
  if (!p || p.practiceAnswered === 0) return null;
  return (
    <span className={s.partProgress} data-testid="practice-progress">
      {p.practiceCorrect} correct of {p.practiceAnswered} answered · {total} questions
      {p.source === 'device' ? ' (on this device)' : ''}
    </span>
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

export function PathStep({
  kind,
  number,
  available,
  practiceTotal,
  testId,
  children,
}: {
  kind: StepKind;
  number: number;
  available: boolean;
  practiceTotal?: number;
  testId: string;
  children: ReactNode;
}) {
  const progress = useHubProgress();
  const state = stepState(kind, available, progress, practiceTotal);
  return (
    <li className={c.step} data-state={state} data-testid={testId} data-step={kind}>
      <span className={c.stepDot} aria-hidden="true">
        {state === 'done' ? <Icon name="check" size={20} /> : number}
      </span>
      <div className={c.stepCard}>
        {children}
        {state !== 'soon' && <span className="p-visually-hidden">Step {number}: {STATE_TEXT[state]}</span>}
      </div>
    </li>
  );
}

/** Chapter mastery at the top of the hub: ring, level, what to do next (members: API; guests: device). */
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
    <section className={c.hubHead} aria-label="Your mastery of this chapter" data-testid="chapter-mastery" data-level={pick.level}>
      <ProgressRing value={pick.score} size={64} stroke={7} level={pick.level} label={`Chapter mastery: ${MASTERY_LABELS[pick.level]}, ${pick.score}%`} />
      <div className={c.hubHeadBody}>
        <p className={c.hubLevel}>
          <MasteryPip level={pick.level} /> {MASTERY_LABELS[pick.level]}
          {pick.level !== 'not_started' ? ` · ${pick.score}%` : ''}
        </p>
        {pick.hints.length > 0 && (
          <ul className={c.hubHints}>
            {pick.hints.slice(0, 2).map((h) => (
              <li key={h}>{MASTERY_HINT_TEXT[h]}</li>
            ))}
          </ul>
        )}
        {pick.level === 'mastered' && <p className={c.hubHints}>You have mastered this chapter. Keep it fresh with a chapter test.</p>}
      </div>
    </section>
  );
}

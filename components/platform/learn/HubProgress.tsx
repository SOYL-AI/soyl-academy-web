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
import s from './hub.module.css';

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

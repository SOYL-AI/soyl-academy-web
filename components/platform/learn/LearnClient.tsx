'use client';

/**
 * Small client islands for the static /learn pages. Everything else on those pages is server-rendered.
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/platform/ui/kit/Button';

import { useSession } from '../auth/SessionProvider';
import { chapterSummary, readGuestProgress, rememberGuestBoardClass, type ChapterGuestSummary } from '../lib/guest-storage';
import type { BoardSlug } from '../lib/catalog';
import s from './learn.module.css';

/** Remembers the class a guest opens, so the profile can be filled after sign-up (merge-guest). */
export function RememberClass({ board, classLevel }: { board: BoardSlug; classLevel: number }) {
  const { state } = useSession();
  useEffect(() => {
    if (state.status === 'guest') rememberGuestBoardClass(board, classLevel);
  }, [state.status, board, classLevel]);
  return null;
}

/**
 * Per-chapter progress kept on this device (guests, and members before merge). Server-side progress for
 * members needs GET /v1/me/progress (M2 request in the handoff).
 */
export function ChapterProgressNote({ chapterId }: { chapterId: string }) {
  const [summary, setSummary] = useState<ChapterGuestSummary | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setSummary(chapterSummary(readGuestProgress(), chapterId));
  }, [chapterId]);
  if (!summary) return null;
  const parts: string[] = [];
  if (summary.lessonCompleted) parts.push('Lesson done');
  else if (summary.lessonSlide !== null) parts.push(`Lesson: slide ${summary.lessonSlide + 1}`);
  if (summary.practiceAnswered > 0) parts.push(`${summary.practiceCorrect}/${summary.practiceAnswered} practice correct`);
  if (parts.length === 0) return null;
  return <span className={s.progressNote}>{parts.join(' · ')}</span>;
}

export interface ChapterTestItem {
  id: string;
  title: string;
  durationMin: number;
  totalMarks: number;
}

/**
 * Tests need an account (CONTEXT §5): guests get a login prompt that returns here. Each test links to the
 * subject's test series (M3), where it starts.
 */
export function ChapterTestsCard({ tests = [], seriesHref }: { tests?: ChapterTestItem[]; seriesHref?: string }) {
  const { state, openLogin } = useSession();
  return (
    <div className={s.testsBody} data-testid="chapter-tests">
      {tests.length > 0 && (
        <ul className={s.testList}>
          {tests.map((t) => (
            <li key={t.id}>
              {seriesHref ? <Link href={`${seriesHref}#test-${t.id}`}>{t.title.replace(/s+—.*$/, '')}</Link> : t.title.replace(/s+—.*$/, '')} · {t.totalMarks} marks · {t.durationMin} min
            </li>
          ))}
        </ul>
      )}
      {state.status === 'member' ? (
        seriesHref ? (
          <p className={s.viewBlurb}>
            <Link href={seriesHref} data-testid="chapter-tests-link">
              All tests for this subject
            </Link>
          </p>
        ) : null
      ) : (
        <div>
          <Button
            size="sm"
            variant="secondary"
            disabled={state.status === 'loading'}
            onClick={() => openLogin({ reason: 'Log in to take chapter tests. They are free, and your results are saved.' })}
          >
            Log in to take tests
          </Button>
        </div>
      )}
    </div>
  );
}

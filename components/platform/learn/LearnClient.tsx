'use client';

/**
 * Small client islands for the static /learn pages. Everything else on those pages is server-rendered.
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/platform/ui/kit/Button';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';

import { useSession } from '../auth/SessionProvider';
import { chapterSummary, readGuestProgress, rememberGuestBoardClass, type ChapterGuestSummary } from '../lib/guest-storage';
import type { BoardSlug } from '../lib/catalog';
import v from './v3.module.css';

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
  return <span className={v.progressNote}>{parts.join(' · ')}</span>;
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
  const short = (title: string) => title.replace(/\s+—.*$/, '');
  return (
    <div className={v.tests} data-testid="chapter-tests">
      {tests.length > 0 ? (
        <ul className={v.testList}>
          {tests.map((t) => (
            <li key={t.id} className={v.testItem}>
              {seriesHref ? <Link href={`${seriesHref}#test-${t.id}`}>{short(t.title)}</Link> : <b>{short(t.title)}</b>}
              <span className={v.testMeta}>
                {t.totalMarks} marks · {t.durationMin} min
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={v.railText}>Short and long chapter tests in the board pattern, with results and analysis.</p>
      )}
      {state.status === 'member' ? (
        seriesHref ? (
          <ButtonLink href={seriesHref} variant="soft" size="sm" iconEnd="chevronRight" data-testid="chapter-tests-link">
            All tests for this subject
          </ButtonLink>
        ) : null
      ) : (
        <div>
          <Button
            size="sm"
            variant="soft"
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

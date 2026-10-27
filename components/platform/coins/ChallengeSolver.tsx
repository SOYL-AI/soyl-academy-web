'use client';

/**
 * The daily-challenge "Solve" dialog (ADR-020 §2). Loaded only when a student presses Solve, with the
 * question renderer chunk (Markdown, KaTeX, visuals), so the hub's first-load JS stays small. Answers go
 * through the normal POST /v1/practice/answers (usePracticeAnswer), which pays the challenge coins.
 */
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { DailyChallengeEntry, PracticeAnswerResult } from '@/platform/shared/api-client';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import { usePracticeAnswer } from '../practice/usePracticeAnswer';
import { challengeLang } from './coins-logic';
import s from './coins.module.css';

type SlotsModule = typeof import('@/components/platform/ui/question/slots');

export interface ChallengeSolverProps {
  entry: DailyChallengeEntry;
  practiceHref: string;
  onClose: () => void;
  onAnswered: (result: PracticeAnswerResult) => void;
}

export function ChallengeSolver({ entry, practiceHref, onClose, onAnswered }: ChallengeSolverProps) {
  const practice = usePracticeAnswer(entry.chapterId);
  const [mod, setMod] = useState<SlotsModule | null>(null);
  const lang = challengeLang(entry.subjectId);
  useEffect(() => {
    let alive = true;
    import('@/components/platform/ui/question/slots').then((m) => alive && setMod(m));
    return () => {
      alive = false;
    };
  }, []);
  const slots = useMemo(() => (mod ? mod.buildQuestionSlots(entry.question, lang) : null), [mod, entry.question, lang]);

  return (
    <Dialog open onClose={onClose} title={`Daily challenge: ${entry.subjectName}`} description={entry.chapterTitle} className={s.solverDialog}>
      <div data-testid="challenge-solver" data-question-id={entry.question.id}>
        {slots ? (
          <QuestionCard
            question={entry.question}
            slots={slots}
            lang={lang}
            headingLevel="h3"
            compact
            submit={(response) => practice.submit(entry.question, response)}
            onAnswered={onAnswered}
            selfAssess={practice.selfAssess}
            onLogin={practice.onLogin}
            describeError={practice.describeError}
          />
        ) : (
          <div aria-busy="true" aria-label="Loading the question">
            <Skeleton lines={3} />
          </div>
        )}
        <p className={s.small}>
          <Link href={practiceHref}>More practice from this chapter</Link>
        </p>
      </div>
    </Dialog>
  );
}

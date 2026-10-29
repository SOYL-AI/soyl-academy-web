'use client';

/**
 * The question on a lesson `check` slide, answered inline (POST /v1/practice/answers). Its content
 * (`slots`) was rendered on the server; the interactive card is a lazy chunk (CheckQuestionCard.tsx), so the
 * lesson's first-load JS does not carry the question engine. The result survives the slide leaving the DOM (the
 * player keeps only nearby slides mounted) through CheckResultsContext, which also tells the player.
 */
import { createContext, lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { PracticeAnswerResult, StudentQuestion } from '@/platform/shared/api-client';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import s from './lesson.module.css';

const CheckQuestionCard = lazy(() => import('./CheckQuestionCard').then((m) => ({ default: m.CheckQuestionCard })));

export interface CheckResults {
  get: (questionId: string) => PracticeAnswerResult | undefined;
  set: (questionId: string, result: PracticeAnswerResult) => void;
}
export const CheckResultsContext = createContext<CheckResults | null>(null);

/** Keeps check results for the player's lifetime; `onResult` tells the player (bottom-bar Check, end-of-part summary). */
export function CheckResultsProvider({ children, onResult }: { children: ReactNode; onResult?: (questionId: string, result: PracticeAnswerResult) => void }) {
  const [results] = useState(() => new Map<string, PracticeAnswerResult>());
  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  });
  const value = useMemo<CheckResults>(
    () => ({
      get: (id) => results.get(id),
      set: (id, r) => {
        results.set(id, r);
        onResultRef.current?.(id, r);
      },
    }),
    [results],
  );
  return <CheckResultsContext.Provider value={value}>{children}</CheckResultsContext.Provider>;
}

export function CheckQuestion(props: { chapterId: string; question: StudentQuestion; slots: QuestionSlots; lang?: string }) {
  return (
    <Suspense fallback={<div className={s.checkLoading} aria-hidden="true" />}>
      <CheckQuestionCard {...props} />
    </Suspense>
  );
}

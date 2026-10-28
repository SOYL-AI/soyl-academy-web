'use client';

/**
 * The question on a lesson `check` slide, answered inline (POST /v1/practice/answers). Its content
 * (`slots`) was rendered on the server; only the interaction is client code. The result survives the
 * slide leaving the DOM (the player keeps only nearby slides mounted) through CheckResultsContext.
 */
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { PracticeAnswerResult, StudentQuestion } from '@/platform/shared/api-client';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import { ReportMistake } from '../report/ReportMistake';
import { usePracticeAnswer } from '../practice/usePracticeAnswer';

interface Results {
  get: (questionId: string) => PracticeAnswerResult | undefined;
  set: (questionId: string, result: PracticeAnswerResult) => void;
}
const CheckResultsContext = createContext<Results | null>(null);

/** Keeps check results for the player's lifetime; `onResult` tells the player (bottom-bar Check, end-of-part summary). */
export function CheckResultsProvider({ children, onResult }: { children: ReactNode; onResult?: (questionId: string, result: PracticeAnswerResult) => void }) {
  const [results] = useState(() => new Map<string, PracticeAnswerResult>());
  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  });
  const value = useMemo<Results>(
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

export function CheckQuestion({ chapterId, question, slots, lang }: { chapterId: string; question: StudentQuestion; slots: QuestionSlots; lang?: string }) {
  const results = useContext(CheckResultsContext);
  const practice = usePracticeAnswer(chapterId);
  return (
    <QuestionCard
      question={question}
      slots={slots}
      lang={lang}
      compact
      headingLevel="h3"
      initialResult={results?.get(question.id) ?? null}
      submit={(response) => practice.submit(question, response)}
      onAnswered={(r) => results?.set(question.id, r)}
      selfAssess={practice.selfAssess}
      onLogin={practice.onLogin}
      describeError={practice.describeError}
      actions={<ReportMistake target={{ chapterId, contentType: 'question', questionId: question.id }} what="this question" compact />}
    />
  );
}

'use client';

/**
 * The question on a lesson `check` slide, answered inline (POST /v1/practice/answers). Its content
 * (`slots`) was rendered on the server; only the interaction is client code. The result survives the
 * slide leaving the DOM (the player keeps only nearby slides mounted) through CheckResultsContext.
 */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PracticeAnswerResult, StudentQuestion } from '@/platform/shared/api-client';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import { ReportMistake } from '../report/ReportMistake';
import { usePracticeAnswer } from '../practice/usePracticeAnswer';

type Results = Map<string, PracticeAnswerResult>;
const CheckResultsContext = createContext<Results | null>(null);

export function CheckResultsProvider({ children }: { children: ReactNode }) {
  // One mutable map for the player's lifetime (results are written after answering, never read for rendering of the provider).
  const [results] = useState<Results>(() => new Map());
  return <CheckResultsContext.Provider value={results}>{children}</CheckResultsContext.Provider>;
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

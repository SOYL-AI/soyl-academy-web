'use client';

/**
 * The interactive part of a lesson check question (lazy chunk, CheckQuestion.tsx): the UI kit's QuestionCard wired
 * to POST /v1/practice/answers. Check slides are never among the first slides, and the player mounts the next two
 * slides ahead, so this chunk loads before the student reaches the question.
 */
import { useContext } from 'react';
import type { StudentQuestion } from '@/platform/shared/api-client';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import { ReportMistake } from '../report/ReportMistake';
import { usePracticeAnswer } from '../practice/usePracticeAnswer';
import { CheckResultsContext } from './CheckQuestion';

export function CheckQuestionCard({ chapterId, question, slots, lang }: { chapterId: string; question: StudentQuestion; slots: QuestionSlots; lang?: string }) {
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

'use client';

/**
 * Wires QuestionCard to the API for practice and lesson check slides (backend-api M2 point 5):
 * - submit → POST /v1/practice/answers (guests too: checked, not stored);
 * - guests: the result is kept on this device (soyl_guest_v1, CONTEXT §5) when it is auto-graded;
 * - members: written answers can be self-marked (PATCH /v1/practice/answers/:id);
 * - XP / badges / streak from the response are announced with a toast.
 */
import { useCallback, useMemo } from 'react';
import { isApiError, type PracticeAnswerResult, type PracticeResponse, type StudentQuestion } from '@/platform/shared/api-client';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { recordGuestPracticeAnswer } from '../lib/guest-storage';

export function practiceErrorMessage(err: unknown): string {
  if (isApiError(err, 'rate_limited')) {
    const s = err.retryAfterSeconds;
    return `You are answering very fast. Please wait ${s && s < 120 ? `${Math.ceil(s)} seconds` : 'a minute'} and try again.`;
  }
  if (isApiError(err, 'validation_failed')) return 'Please check your answer: something in it could not be read.';
  if (isApiError(err, 'not_found')) return 'This question has changed. Reload the page to get the latest version.';
  if (isApiError(err) && (err.code === 'network_error' || err.status >= 500 || err.code === 'upstream_timeout')) {
    return 'We could not reach SOYL Academy. Check your connection and try again.';
  }
  return 'Could not check your answer. Please try again.';
}

export interface PracticeAnswerApi {
  submit: (question: StudentQuestion, response: PracticeResponse) => Promise<PracticeAnswerResult>;
  selfAssess: ((answerId: string, marks: number) => Promise<void>) | undefined;
  onLogin: () => void;
  describeError: (err: unknown) => string;
  isMember: boolean;
}

export function usePracticeAnswer(chapterId: string): PracticeAnswerApi {
  const { state, openLogin } = useSession();
  const toast = useToast();
  const isMember = state.status === 'member';

  const submit = useCallback(
    async (question: StudentQuestion, response: PracticeResponse) => {
      const res = await api.post('/v1/practice/answers', { body: { questionId: question.id, version: question.version, response } });
      if (!res.stored && res.correct !== null) recordGuestPracticeAnswer(chapterId, question.id, res.correct);
      if (res.badgesAwarded.length) toast.show({ title: 'New badge!', description: res.badgesAwarded.join(', '), tone: 'success' });
      return res;
    },
    [chapterId, toast],
  );

  const selfAssess = useCallback(async (answerId: string, marks: number) => {
    await api.patch('/v1/practice/answers/{id}', { params: { id: answerId }, body: { marks } });
  }, []);

  const onLogin = useCallback(() => openLogin({ reason: 'Log in to save your self-marks and keep your practice in your account. It is free.' }), [openLogin]);

  return useMemo(
    () => ({ submit, selfAssess: isMember ? selfAssess : undefined, onLogin, describeError: practiceErrorMessage, isMember }),
    [submit, selfAssess, onLogin, isMember],
  );
}

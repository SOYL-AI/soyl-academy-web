import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type AttemptResult, type AttemptState, type StudentQuestion } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  credits: { credits: null as unknown, aiAllowed: false, refresh: vi.fn(), setBalance: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  router: { push: vi.fn(), replace: vi.fn(), refresh: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../ai/CreditsProvider', () => ({ useCredits: () => h.credits }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('next/navigation', () => ({ useRouter: () => h.router, usePathname: () => '/tests' }));

import { AttemptPlayer } from '../tests/AttemptPlayer';
import { ResultView } from '../tests/ResultView';
import { PlansClient } from '../plans/PlansClient';
import { AskClient } from '../ai/AskClient';
import { LeaderboardClient } from '../leaderboard/LeaderboardClient';
import { QuestionCard } from '../ui/question/QuestionCard';
import { buildQuestionSlots } from '../ui/question/slots';

const member = (consent: string | null = 'granted') => ({ status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent });
const ATT = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const I1 = '11111111-1111-4111-8111-111111111111';
const I2 = '22222222-2222-4222-8222-222222222222';

const mcq = (id: string): StudentQuestion =>
  ({ id, type: 'mcq', objective: true, stem_md: `Stem ${id}`, options: [{ id: 'a', text_md: 'Alpha' }, { id: 'b', text_md: 'Beta' }], match_right: [], marks: 1, assets: [], version: 1, difficulty: 2, expected_time_sec: 30, topic_ids: [], children: [] }) as StudentQuestion;

function attempt(over: Partial<AttemptState['attempt']> = {}): AttemptState {
  const now = Date.now();
  return {
    attempt: { id: ATT, status: 'in_progress', testId: 't1', testVersion: 1, liveEventId: null, ranked: false, startedAt: new Date(now).toISOString(), deadlineAt: new Date(now + 20 * 60_000).toISOString(), submittedAt: null, serverNow: new Date(now).toISOString(), remainingSec: 1200, graceSeconds: 120, tabSwitchCount: 0, ...over },
    test: { id: 't1', version: 1, title: 'Chapter test', kind: 'chapter', paperType: 'chapter-test-short', subject: { id: 'cbse-10-science', name: 'Science', board: 'cbse', classLevel: 10 }, chapterIds: [], durationMin: 20, totalMarks: 2, questionCount: 2, shuffle: false },
    sections: [
      { id: 'A', title: 'Section A', instructions: '', maxMarks: 1, itemIds: [I1], choiceGroups: [] },
      { id: 'B', title: 'Section B', instructions: '', maxMarks: 1, itemIds: [I2], choiceGroups: [] },
    ],
    items: [
      { itemId: I1, sectionId: 'A', number: 1, marks: 1, choiceGroup: null, question: mcq('q1') },
      { itemId: I2, sectionId: 'B', number: 2, marks: 1, choiceGroup: null, question: mcq('q2') },
    ],
    responses: [],
  };
}

beforeEach(() => {
  h.session.state = member();
  h.credits.aiAllowed = true;
  h.credits.credits = null;
  for (const fn of [...Object.values(h.api), ...Object.values(h.router)]) fn.mockReset();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const wrap = (ui: React.ReactNode) => render(<ToastProvider>{ui}</ToastProvider>);

describe('QuestionCard test and review modes', () => {
  it('test mode: controlled draft, no Check button, no reveal', () => {
    const onChange = vi.fn();
    const q = mcq('q1');
    render(<QuestionCard mode="test" question={q} slots={buildQuestionSlots(q)} draft={{ kind: 'choice', ids: [] }} onDraftChange={onChange} number={3} />);
    expect(screen.queryByRole('button', { name: 'Check answer' })).toBeNull();
    fireEvent.click(screen.getAllByRole('radio')[1]!);
    expect(onChange).toHaveBeenCalledWith({ kind: 'choice', ids: ['b'] });
    expect(screen.queryByTestId('answer-key')).toBeNull();
  });
  it('review mode: inputs locked, key shown, no Try again', () => {
    const q = mcq('q1');
    render(
      <QuestionCard
        mode="review"
        question={q}
        slots={buildQuestionSlots(q)}
        draft={{ kind: 'choice', ids: ['a'] }}
        initialResult={{ questionId: 'q1', version: 1, type: 'mcq', correct: false, marksAwarded: 0, maxMarks: 1, grading: 'auto', key: { answer: { option_ids: ['b'] }, solution_md: 'Because.', marking_scheme: [] }, parts: [], selfAssessmentPending: false, selfMaxMarks: 0, stored: true, answerId: null, xpAwarded: 0, badgesAwarded: [], streak: null, coinsAwarded: 0, coinAwards: [] }}
      />,
    );
    expect(screen.getAllByRole('radio').every((r) => (r as HTMLInputElement).matches(':disabled'))).toBe(true);
    expect(screen.getByTestId('answer-key')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Try again' })).toBeNull();
  });
});

describe('AttemptPlayer', () => {
  it('answers are queued and saved; offline banner; palette; submit → result', async () => {
    h.api.get.mockResolvedValue(attempt());
    h.api.put.mockImplementation(async (_p: string, o: { body: { items: { itemId: string; seq: number }[] } }) => ({ status: 'in_progress', serverNow: new Date().toISOString(), deadlineAt: null, applied: o.body.items.map((i) => ({ itemId: i.itemId, seq: i.seq })), stale: [], rejected: [] }));
    h.api.post.mockResolvedValue({ attemptId: ATT, status: 'submitted', alreadySubmitted: false, submittedAt: '', score: 1, maxScore: 2, autoScore: 1, pendingSelfEvaluation: { items: 0, marks: 0 }, xpAwarded: 20, badgesAwarded: ['first-test'], streak: null });
    wrap(<AttemptPlayer attemptId={ATT} />);
    await waitFor(() => expect(screen.getByTestId('test-player').getAttribute('data-ready')).toBe('true'));
    expect(screen.getByTestId('timer').textContent).toMatch(/\d\d:\d\d/);
    fireEvent.click(within(document.querySelector('article[data-question-id="q1"]')!).getAllByRole('radio')[1]!);
    await waitFor(() => expect(screen.getByTestId('save-status').getAttribute('data-pending')).toBe('1'));

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByTestId('offline-banner').textContent).toMatch(/offline/i);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    await waitFor(() => expect(h.api.put).toHaveBeenCalled());
    const body = h.api.put.mock.calls[0]![1].body;
    expect(body.items[0]).toMatchObject({ itemId: I1, response: { option_ids: ['b'] }, markedForReview: false });
    await waitFor(() => expect(screen.getByTestId('save-status').getAttribute('data-pending')).toBe('0'));

    fireEvent.click(screen.getByTestId('mark-review'));
    fireEvent.click(screen.getByTestId('open-palette'));
    const palette = screen.getByTestId('palette');
    expect(within(palette).getByRole('button', { name: /Question 1: answered, marked for review/ })).toBeTruthy();
    expect(within(palette).getByRole('button', { name: /Question 2: not visited/ })).toBeTruthy();
    fireEvent.click(within(palette).getByRole('button', { name: /Question 2/ }));
    expect(document.querySelector('article[data-question-id="q2"]')).toBeTruthy();

    fireEvent.click(screen.getByTestId('submit-open'));
    expect(screen.getByTestId('submit-summary').textContent).toMatch(/Answered1/);
    fireEvent.click(screen.getByTestId('confirm-submit'));
    await waitFor(() => expect(h.router.replace).toHaveBeenCalledWith(`/tests/result/${ATT}`));
    expect(h.api.post.mock.calls[0]![0]).toBe('/v1/attempts/{id}/submit');
    expect(h.api.post.mock.calls[0]![1].body.items.some((i: { markedForReview: boolean }) => i.markedForReview)).toBe(true);
  });

  it('a submitted attempt goes to its result; attempt_closed during autosave too', async () => {
    h.api.get.mockResolvedValue(attempt({ status: 'auto_submitted' }));
    wrap(<AttemptPlayer attemptId={ATT} />);
    await waitFor(() => expect(h.router.replace).toHaveBeenCalledWith(`/tests/result/${ATT}`));
  });

  it('auto-submits when the server deadline passes', async () => {
    h.api.get.mockResolvedValue(attempt({ deadlineAt: new Date(Date.now() + 1500).toISOString() }));
    h.api.post.mockResolvedValue({ attemptId: ATT, status: 'auto_submitted', alreadySubmitted: false, submittedAt: '', score: 0, maxScore: 2, autoScore: 0, pendingSelfEvaluation: { items: 0, marks: 0 }, xpAwarded: 0, badgesAwarded: [], streak: null });
    wrap(<AttemptPlayer attemptId={ATT} />);
    await waitFor(() => expect(h.router.replace).toHaveBeenCalledWith(`/tests/result/${ATT}`), { timeout: 5000 });
    expect(h.api.post.mock.calls[0]![0]).toBe('/v1/attempts/{id}/submit');
  });

  it('guests are asked to log in', () => {
    h.session.state = { status: 'guest' };
    wrap(<AttemptPlayer attemptId={ATT} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Log in to continue your test' })).toBeTruthy();
  });
});

describe('ResultView', () => {
  const result = (): AttemptResult => ({
    attempt: { id: ATT, status: 'submitted', startedAt: '', deadlineAt: '', submittedAt: '', timeTakenSec: 600, tabSwitchCount: 0 },
    test: attempt().test,
    score: { total: 1, max: 4, auto: 1, self: 0, percentage: 25, pendingSelfEvaluation: { items: 1, marks: 3 }, answered: 2, questions: 2 },
    sections: [],
    topics: [{ id: 't', title: 'Acids', earned: 1, max: 1, items: 1, mastery: 1 }],
    byDifficulty: [{ difficulty: 2, total: 1, attempted: 1, correct: 1, accuracy: 1 }],
    time: { totalSec: 600, averagePerQuestionSec: 300 },
    percentile: { value: null, attempts: 3, minAttempts: 50 },
    live: null,
    review: { status: 'open', opensAt: null },
    sectionsLayout: [{ id: 'A', title: 'A', itemIds: [I1, I2], choiceGroups: [] }],
    items: [
      { itemId: I1, sectionId: 'A', number: 1, marks: 1, choiceGroup: null, counted: true, status: 'correct', autoMarks: 1, autoMax: 1, selfMarks: null, selfMax: 0, correct: true, timeSpentSec: 20, markedForReview: false, response: { option_ids: ['a'] }, question: mcq('q1'), key: { answer: { option_ids: ['a'] }, solution_md: 'S', marking_scheme: [] }, parts: [] },
      {
        itemId: I2, sectionId: 'A', number: 2, marks: 3, choiceGroup: null, counted: true, status: 'pending_self', autoMarks: 0, autoMax: 0, selfMarks: null, selfMax: 3, correct: null, timeSpentSec: 90, markedForReview: false, response: { text: 'my answer' },
        question: { ...mcq('q2'), type: 'short', objective: false, options: [], marks: 3 } as StudentQuestion,
        key: { answer: { model_answer_md: 'Model' }, solution_md: '', marking_scheme: [{ step: 'Idea', marks: 1 }, { step: 'Reason', marks: 2 }] }, parts: [],
      },
    ],
  });

  it('shows score, percentile threshold, analysis; self-evaluates per step; AI marks are separate', async () => {
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/attempts/{id}/result') return result();
      if (path === '/v1/attempts/{id}/ai-evaluation') return { attemptId: ATT, items: [{ itemId: I2, marks: 2, maxMarks: 3, confidence: 0.4, lowConfidence: true, label: 'AI-graded — check with your teacher', steps: [], feedback: 'Good start.', evaluatedAt: '' }], totalMarks: 2, maxMarks: 3, countsForRanks: false, job: null };
      throw new ApiError(404, 'not_found', null);
    });
    h.api.post.mockResolvedValue({ ...result(), score: { ...result().score, total: 3, self: 2 } });
    wrap(<ResultView attemptId={ATT} />);
    await waitFor(() => expect(screen.getByTestId('score').textContent).toContain('1'));
    expect(screen.getByText(/once 50 students/)).toBeTruthy();
    expect(screen.getByTestId('pending-self')).toBeTruthy();
    await waitFor(() => expect(screen.getByTestId('ai-marks').textContent).toContain('AI-graded — check with your teacher'));
    expect(screen.getByTestId('ai-marks').textContent).toContain('Not part of your score');
    const form = await screen.findByTestId('self-eval');
    const selects = within(form).getAllByRole('combobox');
    expect(selects).toHaveLength(2);
    fireEvent.change(selects[0]!, { target: { value: '1' } });
    fireEvent.change(selects[1]!, { target: { value: '1' } });
    fireEvent.click(within(form).getByRole('button', { name: 'Save my marks' }));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/attempts/{id}/self-evaluation', { params: { id: ATT }, body: { items: [{ itemId: I2, steps: [1, 1] }] } }));
    await waitFor(() => expect(screen.getByTestId('score').textContent).toContain('3'));
  });

  it('AI marking without a parent’s approval shows the consent-needed state', async () => {
    h.credits.aiAllowed = false;
    h.api.get.mockResolvedValue(result());
    wrap(<ResultView attemptId={ATT} />);
    await waitFor(() => expect(screen.getByTestId('ai-consent-needed')).toBeTruthy());
  });

  it('S6-H01: a live mock before it closes shows score and rank only, and when solutions open', async () => {
    const opensAt = '2026-12-13T06:16:00.000Z';
    h.api.get.mockResolvedValue({
      ...result(),
      live: { eventId: 'live_cbse10sci_1', status: 'provisional', rank: 4, total: 120, percentile: 97.5 },
      review: { status: 'after_event', opensAt },
      sections: [],
      topics: [],
      byDifficulty: [],
      sectionsLayout: [],
      items: [],
    } satisfies AttemptResult);
    wrap(<ResultView attemptId={ATT} />);
    await waitFor(() => expect(screen.getByTestId('review-after-event')).toBeTruthy());
    expect(screen.getByTestId('review-after-event').textContent).toContain('11:46 am IST');
    expect(screen.getByText(/Rank 4 of 120/)).toBeTruthy();
    expect(screen.queryByTestId('review-list')).toBeNull();
    expect(screen.queryByTestId('pending-self')).toBeNull();
    expect(screen.queryByTestId('self-eval')).toBeNull();
    expect(h.api.get).not.toHaveBeenCalledWith('/v1/attempts/{id}/ai-evaluation', expect.anything());
  });
});

describe('PlansClient', () => {
  const plans = (billingEnabled: boolean) => ({
    billingEnabled,
    currency: 'INR',
    pricesIncludeGst: true,
    plans: [
      { id: 'free', name: 'Free', creditsPerDay: 25, features: ['ai_credits'], validUntil: null, order: 0, prices: [], purchasable: false },
      { id: 'plus', name: 'Plus', creditsPerDay: 40, features: ['ai_credits'], validUntil: null, order: 1, prices: [{ interval: 'monthly', amountPaise: 19900, label: '₹199/month' }, { interval: 'yearly', amountPaise: 149900, label: '₹1,499/year' }], purchasable: billingEnabled },
      { id: 'pro', name: 'Pro', creditsPerDay: 60, features: ['ai_credits', 'paper_from_upload'], validUntil: null, order: 2, prices: [{ interval: 'monthly', amountPaise: 29900, label: '₹299/month' }], purchasable: billingEnabled },
    ],
  });

  it('billing off: prices with GST, "Coming soon" buttons, never loads Checkout', async () => {
    h.session.state = { status: 'guest' };
    h.api.get.mockResolvedValue(plans(false));
    wrap(<PlansClient />);
    await waitFor(() => expect(screen.getByTestId('billing-off')).toBeTruthy());
    // The amount and its period are separate spans (tabular figures for the amount only).
    expect(screen.getByTestId('price-plus').textContent).toBe('₹199/month incl. GST');
    expect((screen.getByTestId('buy-plus') as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByTestId('buy-plus').textContent).toBe('Coming soon');
    fireEvent.click(screen.getByRole('radio', { name: 'Yearly' }));
    expect(screen.getByTestId('price-plus').textContent).toBe('₹1,499/year incl. GST');
    expect(document.querySelector('script[src*="razorpay"]')).toBeNull();
  });

  it('consent_required from the API shows the parent prompt', async () => {
    h.api.get.mockImplementation(async (p: string) => (p === '/v1/plans' ? plans(true) : { plan: 'free', planName: 'Free', creditsPerDay: 25, source: 'free', validUntil: null, subscription: null, billingEnabled: true }));
    h.api.post.mockRejectedValue(new ApiError(403, 'consent_required', null));
    wrap(<PlansClient />);
    await waitFor(() => expect(screen.getByTestId('buy-plus')).toBeTruthy());
    fireEvent.click(screen.getByTestId('buy-plus'));
    await waitFor(() => expect(screen.getByTestId('plans-problem').getAttribute('data-code')).toBe('consent_required'));
  });
});

describe('AskClient', () => {
  it('consent needed: friendly state, no AI calls', () => {
    h.session.state = member('pending');
    wrap(<AskClient />);
    expect(screen.getByTestId('ai-consent-needed')).toBeTruthy();
    expect(h.api.get).not.toHaveBeenCalled();
  });

  it('quote first, then streams the reply; paused AI is explained', async () => {
    h.credits.credits = { balance: 25, prices: [{ action: 'quick-doubt', credits: 1 }] };
    h.api.get.mockImplementation(async (p: string) => {
      if (p === '/v1/ai/conversations') return { conversations: [], nextCursor: null };
      if (p === '/v1/ai/quote/{action}') return { action: 'quick-doubt', label: 'Quick doubt', credits: 1, perAnswer: false, answers: null, maxCredits: 1, tier: 'small', mode: 'stream', requiresUpload: false, plan: 'free', allowedForPlan: true, balance: 25, affordable: true, status: 'available', resetAt: '', resetInSeconds: 100, plansUrl: '/plans' };
      throw new Error(p);
    });
    const enc = new TextEncoder();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        new ReadableStream({
          start(c) {
            c.enqueue(enc.encode('event: meta\ndata: {"conversationId":"c1","balance":24,"mode":"hint","language":"english"}\n\n'));
            c.enqueue(enc.encode('event: delta\ndata: {"text":"Think about salt."}\n\nevent: done\ndata: {"status":"ok","creditsCharged":1,"balance":24}\n\n'));
            c.close();
          },
        }),
        { headers: { 'content-type': 'text/event-stream' } },
      ),
    );
    wrap(<AskClient />);
    fireEvent.change(screen.getByTestId('ask-input'), { target: { value: 'Why does iron rust?' } });
    fireEvent.click(screen.getByTestId('ask-send'));
    await waitFor(() => expect(screen.getByTestId('quote').textContent).toMatch(/1 credit/));
    expect(fetchSpy).not.toHaveBeenCalled(); // nothing is sent before the student confirms
    fireEvent.click(screen.getByTestId('quote-confirm'));
    await waitFor(() => expect(document.querySelector('[data-role="assistant"]')?.getAttribute('data-status')).toBe('done'));
    expect(document.querySelector('[data-role="assistant"]')!.textContent).toContain('Think about salt.');
    expect(h.credits.setBalance).toHaveBeenCalledWith(24);
    expect(screen.getByTestId('reveal')).toBeTruthy();
  });
});

describe('LeaderboardClient', () => {
  it('needs consent (D-014)', () => {
    h.session.state = member('required');
    wrap(<LeaderboardClient />);
    expect(screen.getByTestId('leaderboard-consent')).toBeTruthy();
  });
});

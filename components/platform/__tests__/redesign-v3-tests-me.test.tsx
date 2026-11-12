/**
 * Design language v3 (ADR-032 §10) for the Tests pages and the profile: the pure view-models (series meta, row
 * status, attempt rows, score bands, live timeline, activity figures) and the restyled pages' structure (kit pieces,
 * kept testids, stage copy, one h1). Data flows are covered by m34-components.test.tsx.
 */
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AttemptResult, LiveEvent, StudentQuestion, TestSeries } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';
import { StageProvider } from '../shell/StageProvider';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn(), signOut: vi.fn(), updateUser: vi.fn(), clearLocal: vi.fn() },
  credits: { credits: null as unknown, aiAllowed: true, refresh: vi.fn(), setBalance: vi.fn(), openGuide: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  router: { push: vi.fn(), replace: vi.fn(), refresh: vi.fn() },
  content: vi.fn(),
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../ai/CreditsProvider', () => ({ useCredits: () => h.credits, useOptionalCredits: () => h.credits }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('../learn/content-subjects', () => ({ fetchContentSubjects: h.content }));
vi.mock('next/navigation', () => ({ useRouter: () => h.router, usePathname: () => '/tests' }));

import { seriesMeta, TestsHome } from '../tests/TestsHome';
import { seriesLook, SeriesClient, testStatus } from '../tests/SeriesClient';
import { ResultView, SCORE_LINES, scoreBand } from '../tests/ResultView';
import { attemptRow } from '../tests/player-model';
import { liveEventItem, upcomingLive } from '../tests/live-timeline';
import { activityFigures } from '../me/MeInsights';

const ATT = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const member = { status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent: null };
const wrap = (ui: React.ReactNode, stage: 'junior' | 'middle' | 'senior' = 'middle') =>
  render(
    <StageProvider stage={stage} classLevel={null} source="default">
      <ToastProvider>{ui}</ToastProvider>
    </StageProvider>,
  );

const live = (over: Partial<LiveEvent> = {}): LiveEvent => ({
  id: 'live_1',
  title: 'Science full mock',
  phase: 'registration_open',
  subject: { id: 'cbse-10-science', name: 'Science' },
  testId: 't1',
  durationMin: 180,
  totalMarks: 80,
  registrationOpensAt: '2026-11-10T04:30:00.000Z',
  startsAt: '2026-11-15T04:30:00.000Z',
  lateStartUntil: '2026-11-15T05:00:00.000Z',
  endsAt: '2026-11-15T07:30:00.000Z',
  resultsPublishedAt: null,
  ranksBeta: true,
  me: null,
  ...over,
});

beforeEach(() => {
  h.session.state = member;
  for (const fn of [...Object.values(h.api), h.content]) fn.mockReset();
});
afterEach(cleanup);

describe('tests view-models', () => {
  it('series meta says how many tests and that they are free; full papers are named', () => {
    expect(seriesMeta(undefined)).toBe('Coming soon');
    expect(seriesMeta({ total: 0, chapterTests: 0, fullPapers: 0 })).toBe('Coming soon');
    expect(seriesMeta({ total: 12, chapterTests: 12, fullPapers: 0 })).toBe('12 tests · free');
    expect(seriesMeta({ total: 1, chapterTests: 1, fullPapers: 0 })).toBe('1 test · free');
    expect(seriesMeta({ total: 20, chapterTests: 14, fullPapers: 3 })).toBe('20 tests · 3 full papers');
  });

  it('a series row writes its status: not started, in progress, best score', () => {
    expect(testStatus(null)).toMatchObject({ key: 'not-started', label: 'Not started', tone: 'neutral' });
    expect(testStatus({ attempts: 0, bestScore: null, maxScore: 20, activeAttemptId: null, lastAttemptId: null } as never)).toMatchObject({ label: 'Not started' });
    expect(testStatus({ attempts: 1, bestScore: null, maxScore: 20, activeAttemptId: ATT, lastAttemptId: null } as never)).toMatchObject({ key: 'in-progress', label: 'In progress', tone: 'info' });
    expect(testStatus({ attempts: 2, bestScore: 16.5, maxScore: 20, activeAttemptId: null, lastAttemptId: ATT } as never)).toMatchObject({ key: 'done', label: 'Best 16.5/20', tone: 'success' });
  });

  it('series groups: tests are pink, full papers violet', () => {
    expect(seriesLook('chapter')).toEqual({ icon: 'clock', tint: 'pink' });
    expect(seriesLook('full')).toEqual({ icon: 'list', tint: 'violet' });
    expect(seriesLook('unit').tint).toBe('pink');
  });

  it('attempt rows: result or resume link, IST date, score and status in words', () => {
    const done = attemptRow({ id: ATT, status: 'submitted', score: 16, maxScore: 20, submittedAt: '2026-11-12T20:00:00.000Z', startedAt: null, liveEventId: null });
    expect(done).toEqual({ href: `/tests/result/${ATT}`, done: true, date: '13 Nov', score: '16/20', status: 'Marked', tone: 'success' });
    const going = attemptRow({ id: ATT, status: 'in_progress', score: null, maxScore: 20, submittedAt: null, startedAt: '2026-11-12T05:00:00.000Z', liveEventId: null });
    expect(going).toMatchObject({ href: `/tests/attempt/${ATT}`, done: false, score: '–', status: 'In progress', tone: 'info' });
    expect(attemptRow({ id: ATT, status: 'auto_submitted', score: 4, maxScore: 80, submittedAt: '2026-11-12T05:00:00.000Z', startedAt: null, liveEventId: 'live_1' }).status).toBe('Live mock');
  });

  it('score bands and their stage copy', () => {
    expect(scoreBand(null)).toBeNull();
    expect(scoreBand(80)).toBe('strong');
    expect(scoreBand(40)).toBe('steady');
    expect(scoreBand(39.9)).toBe('start');
    for (const band of ['strong', 'steady', 'start'] as const) {
      const lines = SCORE_LINES[band];
      expect(new Set([lines.junior, lines.middle, lines.senior]).size).toBe(3);
      for (const l of Object.values(lines)) expect(l).not.toMatch(/!/);
    }
  });

  it('live timeline: IST day, date and time, subject tint, status written; only open mocks, soonest first', () => {
    const item = liveEventItem(live());
    expect(item).toMatchObject({ time: 'Sun', timeSub: '15 Nov', title: 'Science full mock', meta: '10:00 IST · 3 h · Science', href: '/tests/live/live_1', tint: 'green' });
    const { container } = render(<>{liveEventItem(live({ me: { registered: true, attemptId: null, attemptStatus: null } })).status}</>);
    expect(container.textContent).toBe('Registered');
    const list = upcomingLive([live({ id: 'c', phase: 'closed' }), live({ id: 'b', startsAt: '2026-11-20T04:30:00.000Z' }), live({ id: 'a', phase: 'live', startsAt: '2026-11-13T04:30:00.000Z' })]);
    expect(list.map((e) => e.id)).toEqual(['a', 'b']);
  });

  it('activity figures: only what is known', () => {
    expect(activityFigures(null, null)).toEqual({ streak: 0, longest: 0, solved: null, lessons: null, tests: null });
    expect(activityFigures({ current: 3, longest: 9 }, { solved: 24, lessonsCompleted: 5, testsSubmitted: 2 })).toEqual({ streak: 3, longest: 9, solved: 24, lessons: 5, tests: 2 });
  });
});

describe('/tests hub (v3)', () => {
  const subjects = {
    academicYear: '2026-27',
    board: 'cbse',
    classLevel: 10,
    subjects: [
      { id: 'cbse-10-science', name: 'Science', language: 'en', tier: 'core' },
      { id: 'cbse-10-sanskrit', name: 'Sanskrit', language: 'sa', tier: 'language' },
    ],
  };
  const series = (full: number): Pick<TestSeries, 'series'> => ({
    series: [
      { id: 'c', kind: 'chapter', title: 'Chapter tests', tests: [{ id: 't1' }, { id: 't2' }] },
      { id: 'f', kind: 'full', title: 'Full papers', tests: Array.from({ length: full }, (_, i) => ({ id: `f${i}` })) },
    ] as never,
  });

  it('subjects with tests as subject cards (data-has-tests), the rest under coming soon; recent attempts as a table; live mocks timeline', async () => {
    h.content.mockResolvedValue([{ subjectId: 'cbse-10-science' }]);
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/catalog/{board}/{class}/subjects') return subjects;
      if (path === '/v1/test-series') return series(1);
      if (path === '/v1/live-events') return { events: [live(), live({ id: 'old', phase: 'results_published' })] };
      if (path === '/v1/me/attempts') return { attempts: [{ id: ATT, testId: 't1', title: 'Chapter 2 test', kind: 'chapter', status: 'submitted', liveEventId: null, startedAt: null, deadlineAt: null, submittedAt: '2026-11-12T05:00:00.000Z', score: 16, maxScore: 20 }], nextCursor: null };
      throw new Error(path);
    });
    wrap(<TestsHome />);
    const list = await screen.findByTestId('subject-list');
    const science = within(list).getByRole('link', { name: /Science/ });
    expect(science.textContent).toMatch(/Full series/);
    expect(science.closest('li')!.getAttribute('data-has-tests')).toBe('true');
    const more = screen.getByTestId('more-subjects');
    expect(within(more).getByRole('link', { name: /Sanskrit/ }).textContent).toMatch(/Coming soon/);
    expect(more.querySelector('[data-has-tests]')).toBeNull();
    const timeline = await screen.findByRole('list', { name: 'Upcoming live mocks' });
    expect(within(timeline).getAllByRole('listitem')).toHaveLength(1);
    const table = await screen.findByRole('table');
    expect(within(table).getByRole('link', { name: 'Chapter 2 test' }).getAttribute('href')).toBe(`/tests/result/${ATT}`);
    expect(within(table).getByText('16/20')).toBeTruthy();
    expect(screen.queryByText(/₹|credit/i)).toBeNull(); // tests are free: no prices or credits near them
  });

  it('no live mocks: the rail is hidden; no attempts: a calm empty state in the stage tone', async () => {
    h.content.mockResolvedValue([]);
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/catalog/{board}/{class}/subjects') return subjects;
      if (path === '/v1/live-events') return { events: [] };
      if (path === '/v1/me/attempts') return { attempts: [], nextCursor: null };
      throw new Error(path);
    });
    wrap(<TestsHome />, 'junior');
    await screen.findByText('Your first test will show up here.');
    expect(screen.queryByRole('complementary')).toBeNull();
    expect(screen.getByTestId('subject-list')).toBeTruthy();
  });
});

describe('series page (v3)', () => {
  it('tests as list rows with duration and marks meta, a status pill and one action each', async () => {
    h.api.get.mockResolvedValue({
      subject: { id: 'cbse-10-science', name: 'Science' },
      liveEvents: [live()],
      series: [
        {
          id: 'g1',
          kind: 'chapter',
          title: 'Chapter tests',
          tests: [
            { id: 't1', title: 'Chapter test — Acids', questionCount: 10, totalMarks: 20, durationMin: 30, chapter: { id: 'c2', number: 2 }, me: { attempts: 0, bestScore: null, maxScore: 20, activeAttemptId: null, lastAttemptId: null } },
            { id: 't2', title: 'Chapter test — Metals', questionCount: 10, totalMarks: 20, durationMin: 30, chapter: { id: 'c3', number: 3 }, me: { attempts: 1, bestScore: 15, maxScore: 20, activeAttemptId: null, lastAttemptId: ATT } },
            { id: 't3', title: 'Chapter test — Carbon', questionCount: 10, totalMarks: 20, durationMin: 30, chapter: null, me: { attempts: 1, bestScore: null, maxScore: 20, activeAttemptId: ATT, lastAttemptId: null } },
          ],
        },
      ],
    });
    wrap(<SeriesClient subjectId="cbse-10-science" subjectName="Science" />);
    const rows = await screen.findAllByTestId('test-card');
    expect(rows).toHaveLength(3);
    expect(within(rows[0]!).getByRole('heading', { level: 3, name: 'Chapter test — Acids' })).toBeTruthy();
    expect(rows[0]!.textContent).toContain('10 questions · 20 marks · 30 min · Chapter 2');
    expect(rows[0]!.textContent).toContain('Not started');
    expect(within(rows[0]!).getByTestId('start-test-open').textContent).toBe('Start');
    expect(rows[1]!.textContent).toContain('Best 15/20');
    expect(within(rows[1]!).getByTestId('start-test-open').textContent).toBe('Take again');
    expect(within(rows[1]!).getByRole('link', { name: 'Last result' }).getAttribute('href')).toBe(`/tests/result/${ATT}`);
    expect(rows[2]!.getAttribute('data-status')).toBe('in-progress');
    expect(within(rows[2]!).getByTestId('resume-test').getAttribute('href')).toBe(`/tests/attempt/${ATT}`);
    expect(screen.getByRole('list', { name: 'All-India live mocks' })).toBeTruthy();
    expect(screen.queryByText(/₹|credit/i)).toBeNull();
  });
});

describe('result page (v3)', () => {
  const q = { id: 'q1', type: 'mcq', objective: true, stem_md: 'Stem', options: [{ id: 'a', text_md: 'A' }], match_right: [], marks: 1, assets: [], version: 1, difficulty: 2, expected_time_sec: 30, topic_ids: [], children: [] } as unknown as StudentQuestion;
  const result = (pct: number | null): AttemptResult =>
    ({
      attempt: { id: ATT, status: 'submitted', startedAt: '', deadlineAt: '', submittedAt: '', timeTakenSec: 600, tabSwitchCount: 0 },
      test: { id: 't1', version: 1, title: 'Chapter test', kind: 'chapter', paperType: 'x', subject: { id: 'cbse-10-science', name: 'Science', board: 'cbse', classLevel: 10 }, chapterIds: [], durationMin: 20, totalMarks: 4, questionCount: 1, shuffle: false },
      score: { total: 3, max: 4, auto: 3, self: 0, percentage: pct, pendingSelfEvaluation: { items: 0, marks: 0 }, answered: 1, questions: 1 },
      sections: [
        { id: 'A', title: 'Section A', score: 2, maxScore: 2 },
        { id: 'B', title: 'Section B', score: 1, maxScore: 2 },
      ],
      topics: [],
      byDifficulty: [],
      time: { totalSec: 600, averagePerQuestionSec: 300 },
      percentile: { value: 88.4, attempts: 80, minAttempts: 50 },
      live: null,
      review: { status: 'open', opensAt: null },
      sectionsLayout: [{ id: 'A', title: 'A', itemIds: ['i1'], choiceGroups: [] }],
      items: [{ itemId: 'i1', sectionId: 'A', number: 1, marks: 1, choiceGroup: null, counted: true, status: 'correct', autoMarks: 1, autoMax: 1, selfMarks: null, selfMax: 0, correct: true, timeSpentSec: 20, markedForReview: false, response: { option_ids: ['a'] }, question: q, key: { answer: { option_ids: ['a'] }, solution_md: 'S', marking_scheme: [] }, parts: [] }],
    }) as unknown as AttemptResult;

  it('score hero with a ring, the band line in the stage tone, stats, a section table; exactly one h1', async () => {
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/attempts/{id}/result') return result(75);
      return { attemptId: ATT, items: [], totalMarks: 0, maxMarks: 0, countsForRanks: false, job: null };
    });
    wrap(<ResultView attemptId={ATT} />, 'senior');
    await waitFor(() => expect(screen.getByTestId('score').textContent).toContain('3'));
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('img', { name: 'Score: 75%' })).toBeTruthy();
    expect(screen.getByText('Strong score.')).toBeTruthy();
    expect(screen.getByTestId('percentile').textContent).toContain('88');
    const sections = screen.getByRole('region', { name: 'Score by section' });
    expect(within(sections).getAllByRole('row')).toHaveLength(3);
    expect(within(sections).getByText('50%')).toBeTruthy();
    expect(screen.getByRole('group', { name: 'Show' }).querySelectorAll('button[aria-pressed="true"]')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Back to tests' }).getAttribute('href')).toBe('/tests');
  });

  it('no percentage yet (written answers to mark): no ring and no band line', async () => {
    h.api.get.mockImplementation(async (path: string) => (path === '/v1/attempts/{id}/result' ? result(null) : { attemptId: ATT, items: [], totalMarks: 0, maxMarks: 0, countsForRanks: false, job: null }));
    wrap(<ResultView attemptId={ATT} />);
    await screen.findByTestId('score');
    expect(screen.queryByRole('img', { name: /^Score:/ })).toBeNull();
    expect(screen.queryByText(SCORE_LINES.strong.middle)).toBeNull();
  });
});

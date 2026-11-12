/**
 * Progress (`/me/progress`, design language v3 §10 "Progress"): the view-models (honest stats, no denominators over
 * 1,000, IST days, heatmap only from 7 active days) and the page (members only, one h1, every section, a calm
 * welcome instead of zeros for a brand-new student, the weekly goal editor in the rail).
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MyDashboard } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn(), updateUser: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  progress: { progress: null as unknown, ready: true, refresh: () => undefined },
}));
vi.mock('next/navigation', () => ({ usePathname: () => '/me/progress', useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('../learn/ProgressProvider', () => ({ useLearnerProgress: () => h.progress }));

import { ProgressClient, ProgressView } from '../progress/ProgressClient';
import { difficultyStats, focusMeta, progressStats, progressSubtitle, shortDay, showHeatmap, testRows, toTrend } from '../progress/progress-model';

const zero = { allTime: 0, thisWeek: 0, lastWeek: 0 };
const win = (checked = 0, right = 0) => ({ from: '2026-11-07', to: '2026-11-13', checked, right, accuracy: checked ? right / checked : null });
const LINK = { board: 'cbse', classLevel: 10, subjectId: 'cbse-10-science', subjectSlug: 'science', chapterId: 'cbse-10-science-ch01', chapterSlug: 'ch01' } as const;

function dash(over: Partial<MyDashboard> = {}): MyDashboard {
  return {
    timezone: 'Asia/Kolkata',
    today: '2026-11-13',
    thisWeek: { from: '2026-11-09', to: '2026-11-15' },
    lastWeek: { from: '2026-11-02', to: '2026-11-08' },
    profile: { board: 'cbse', classLevel: 10, school: null, schoolStatus: 'not_set', missing: ['school'] },
    totals: {
      solved: { ...zero },
      answered: { ...zero },
      accuracy: { recent: win(), previous: win() },
      lessonsCompleted: { ...zero },
      tests: { submitted: { ...zero }, distinctTests: 0, averagePct: null, bestPct: null },
      activeDays: { thisWeek: 0, lastWeek: 0, allTime: 0 },
    },
    scope: { kind: 'class', board: 'cbse', classLevel: 10, subjectCount: 5, chapterCount: 99 },
    solvedByDifficulty: { all: { solved: 0, total: 7537 }, easy: { solved: 0, total: 4234 }, medium: { solved: 0, total: 2400 }, hard: { solved: 0, total: 903 } },
    mastery: { score: 0, chapterCount: 99, levels: { not_started: 99, attempted: 0, familiar: 0, proficient: 0, mastered: 0 } },
    testHistory: [],
    focus: { weakest: [], strongest: [] },
    recent: [],
    badges: { earned: 0, total: 12, next: { key: 'first_lesson', name: 'First lesson', description: 'Finish your first lesson.', icon: 'book', current: 0, target: 1, progress: 0 } },
    weeklyGoal: { metric: 'questions_solved', target: 20, isDefault: true, progress: 0, remaining: 20, met: false, weekStart: '2026-11-09', weekEnd: '2026-11-15', daysLeft: 3 },
    ...over,
  };
}

const focusCh = { chapterId: 'cbse-10-science-ch01', number: 1, title: 'Chemical Reactions and Equations', subjectId: 'cbse-10-science', subjectName: 'Science', level: 'attempted' as const, score: 22, firstTryAccuracy: 0.4, practiceAttempted: 5, practiceTotal: 60, chapterTestPct: null, link: LINK };

function active(): MyDashboard {
  return dash({
    totals: {
      solved: { allTime: 14, thisWeek: 9, lastWeek: 5 },
      answered: { allTime: 30, thisWeek: 18, lastWeek: 12 },
      accuracy: { recent: win(20, 15), previous: win(10, 6) },
      lessonsCompleted: { allTime: 4, thisWeek: 1, lastWeek: 3 },
      tests: { submitted: { allTime: 3, thisWeek: 1, lastWeek: 1 }, distinctTests: 3, averagePct: 61, bestPct: 72 },
      activeDays: { thisWeek: 3, lastWeek: 3, allTime: 9 },
    },
    solvedByDifficulty: { all: { solved: 14, total: 7537 }, easy: { solved: 8, total: 4234 }, medium: { solved: 4, total: 400 }, hard: { solved: 2, total: 903 } },
    mastery: { score: 6, chapterCount: 99, levels: { not_started: 95, attempted: 2, familiar: 1, proficient: 1, mastered: 0 } },
    testHistory: [
      { attemptId: 'a3', testId: 't3', title: 'Acids: chapter test', kind: 'chapter', subjectId: 'cbse-10-science', subjectName: 'Science', submittedAt: '2026-11-12T10:00:00Z', day: '2026-11-12', autoSubmitted: true, score: 18, maxScore: 25, percentage: 72, autoScore: 18, selfScore: 0, marking: 'auto', liveEventId: null },
      { attemptId: 'a2', testId: 't2', title: 'Real Numbers: chapter test', kind: 'chapter', subjectId: 'cbse-10-mathematics', subjectName: 'Mathematics', submittedAt: '2026-11-10T10:00:00Z', day: '2026-11-10', autoSubmitted: false, score: 10, maxScore: 20, percentage: 50, autoScore: 6, selfScore: 4, marking: 'self', liveEventId: null },
      { attemptId: 'a1', testId: 't1', title: 'Chemical reactions: chapter test', kind: 'chapter', subjectId: 'cbse-10-science', subjectName: 'Science', submittedAt: '2026-11-08T10:00:00Z', day: '2026-11-08', autoSubmitted: false, score: 15, maxScore: 25, percentage: 60, autoScore: 15, selfScore: 0, marking: 'auto', liveEventId: null },
    ],
    focus: { weakest: [focusCh], strongest: [{ ...focusCh, chapterId: 'cbse-10-science-ch02', number: 2, title: 'Acids, Bases and Salts', level: 'proficient', link: { ...LINK, chapterId: 'cbse-10-science-ch02', chapterSlug: 'ch02' } }] },
    recent: [{ kind: 'practice', id: 'p1', at: '2026-11-13T05:00:00.000Z', day: '2026-11-13', chapter: { chapterId: LINK.chapterId, title: 'Chemical Reactions and Equations', subjectId: LINK.subjectId, subjectName: 'Science', link: LINK }, answered: 4, solved: 3 }],
    badges: { earned: 2, total: 12, next: { key: 'streak_3', name: 'On a roll', description: 'Learn on 3 days in a row.', icon: 'flame', current: 1, target: 3, progress: 0.33 } },
    weeklyGoal: { metric: 'questions_solved', target: 20, isDefault: false, progress: 9, remaining: 11, met: false, weekStart: '2026-11-09', weekEnd: '2026-11-15', daysLeft: 3 },
  });
}

const activity = (activeDays: number) => ({
  timezone: 'Asia/Kolkata',
  from: '2026-06-27',
  to: '2026-11-13',
  days: 140,
  calendar: Array.from({ length: activeDays }, (_, i) => ({ date: `2026-11-${String(13 - i).padStart(2, '0')}`, answered: 2, solved: 1, lessonsCompleted: 0, testsSubmitted: 0, total: 2 })),
  totals: { answered: 2 * activeDays, solved: activeDays, lessonsCompleted: 0, testsSubmitted: 0, activeDays },
  streak: { current: 3, longest: 5, lastActiveDay: '2026-11-13', atRisk: false, freezeAvailableThisWeek: true },
  activeDaysAllTime: 9,
});

const member = { status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent: 'granted' };
const wrap = (ui: ReactNode) => render(<ToastProvider>{ui}</ToastProvider>);

function routeGets(map: Record<string, unknown>) {
  h.api.get.mockImplementation((path: string) => (path in map ? Promise.resolve(map[path]) : new Promise(() => undefined)));
}

beforeEach(() => {
  h.session = { state: { status: 'guest' }, openLogin: vi.fn(), updateUser: vi.fn() };
  for (const fn of Object.values(h.api)) fn.mockReset();
});
afterEach(() => cleanup());

describe('progress view-models', () => {
  it('stats: only what has data, trends in words', () => {
    expect(progressStats(dash())).toEqual([]);
    const st = Object.fromEntries(progressStats(active()).map((x) => [x.key, x]));
    expect(Object.keys(st)).toEqual(['solved', 'accuracy', 'lessons', 'days']);
    expect(st.solved).toMatchObject({ value: '9', hint: '14 all time', trend: { direction: 'up', text: '4 more than last week' }, raw: '9' });
    expect(st.accuracy).toMatchObject({ value: '75', unit: '%', hint: 'Last 7 days · 15 of 20 checked answers right', trend: { direction: 'up', text: 'Up 15 points on the 7 days before' }, raw: '75%' });
    expect(st.lessons!.trend).toEqual({ direction: 'down', text: '2 fewer than last week' });
    expect(st.days).toMatchObject({ value: '3', unit: 'of 7', raw: '3/7', trend: { direction: 'flat', text: 'Same as last week' } });
    // Practised but nothing auto-checked in the last 7 days: no accuracy card rather than a dash.
    const noAcc = active();
    noAcc.totals.accuracy.recent = win();
    expect(progressStats(noAcc).map((x) => x.key)).toEqual(['solved', 'lessons', 'days']);
    expect(toTrend({ direction: 'none', text: '' })).toBeUndefined();
  });

  it('difficulty: never a denominator over 1,000', () => {
    expect(difficultyStats(active().solvedByDifficulty).map((b) => [b.label, b.solved, b.hint])).toEqual([
      ['Easy', 8, 'questions solved'],
      ['Medium', 4, 'of 400 in your subjects'],
      ['Hard', 2, 'of 903 in your subjects'],
    ]);
    expect(focusMeta({ ...focusCh, practiceTotal: 1500 })).toBe('Science · 5 practised · 40% right first time');
    expect(focusMeta(focusCh)).toBe('Science · 5 of 60 practised · 40% right first time');
  });

  it('header, IST days, test rows, heatmap threshold', () => {
    expect(progressSubtitle(active().profile, active().thisWeek)).toBe('CBSE Class 10 · this week, 9–15 Nov');
    expect(progressSubtitle({ board: null, classLevel: null }, { from: '2026-10-26', to: '2026-11-01' })).toBe('This week, 26 Oct – 1 Nov');
    expect(shortDay('2026-11-15')).toBe('Sun 15 Nov');
    const rows = testRows(active().testHistory);
    expect(rows[0]).toMatchObject({ day: 'Thu 12 Nov', score: '18/25', percent: '72%', meta: 'Chapter test · Science', pills: [{ tone: 'success', text: 'Auto-marked' }, { tone: 'neutral', text: 'Time-up' }] });
    expect(rows[1]!.pills).toEqual([{ tone: 'highlight', text: 'Self-marked' }]);
    expect(showHeatmap(6)).toBe(false);
    expect(showHeatmap(7)).toBe(true);
  });
});

describe('ProgressClient', () => {
  it('guests: one h1 and the /me-style log-in prompt that returns here; no private requests', () => {
    wrap(<ProgressClient />);
    expect(screen.getByTestId('progress-guest')).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    fireEvent.click(screen.getByTestId('progress-login'));
    expect(h.session.openLogin).toHaveBeenCalledWith(expect.objectContaining({ returnTo: '/me/progress' }));
    expect(h.api.get).not.toHaveBeenCalled();
  });

  it('members: skeleton, then the page', async () => {
    h.session = { ...h.session, state: member };
    routeGets({ '/v1/me/dashboard': active() });
    wrap(<ProgressClient />);
    expect(screen.getByTestId('progress-loading').getAttribute('aria-busy')).toBe('true');
    expect(await screen.findByTestId('progress')).toBeTruthy();
  });
});

describe('ProgressView', () => {
  it('a brand-new student: one calm welcome and what will show up, no zero stats, no ring at 0', () => {
    h.session = { ...h.session, state: member };
    routeGets({});
    wrap(<ProgressView d={dash()} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByTestId('progress').getAttribute('data-new')).toBe('true');
    expect(screen.getByTestId('progress-empty').textContent).toContain('What you will see here');
    for (const id of ['kpi-solved', 'mastery-tile', 'tests-tile', 'difficulty-tile', 'focus-tile', 'activity-card', 'recent-tile']) expect(screen.queryByTestId(id)).toBeNull();
    expect(screen.queryByText('7,537')).toBeNull();
    const goal = screen.getByTestId('weekly-goal');
    expect(goal.querySelector('[role="img"]')).toBeNull();
    expect(goal.textContent).toContain('20 new questions a week');
  });

  it('an active student: stats, mastery, scores (table + chart from 3), difficulty, focus, activity, recent, rail', async () => {
    h.session = { ...h.session, state: member };
    routeGets({
      '/v1/me/activity': activity(3),
      '/v1/me/mastery': { subjects: [{ subjectId: 'cbse-10-science', name: 'Science', classLevel: 10, score: 34, chapterCount: 13, levels: { not_started: 10, attempted: 1, familiar: 1, proficient: 1, mastered: 0 }, chapters: [] }] },
    });
    wrap(<ProgressView d={active()} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByTestId('kpi-solved').getAttribute('data-value')).toBe('9');
    expect(screen.getByTestId('kpi-accuracy').getAttribute('data-value')).toBe('75%');
    expect(screen.getByRole('group', { name: 'This week' })).toBeTruthy();
    // Mastery per subject (a 40 px ring each).
    const mastery = await screen.findByRole('list', { name: 'Mastery by subject' });
    expect(within(mastery).getByRole('link').getAttribute('href')).toBe('/learn/cbse/10/science');
    expect(mastery.textContent).toContain('3 of 13 chapters started');
    // Test scores: a table with marking in words, the chart from 3 marked tests.
    const rows = screen.getAllByTestId('test-row');
    expect(rows.map((r) => r.getAttribute('data-marking'))).toEqual(['auto', 'self', 'auto']);
    expect(within(rows[0]!).getByRole('link').getAttribute('href')).toBe('/tests/result/a3');
    expect(screen.getByTestId('score-trend').getAttribute('data-points')).toBe('3');
    // Difficulty, focus, activity (week strip below 7 active days), recent.
    expect(screen.getByTestId('difficulty-chart').getAttribute('data-solved')).toBe('14');
    expect(screen.queryByText(/4,234/)).toBeNull();
    expect(screen.getByTestId('focus-practise').getAttribute('href')).toBe('/learn/cbse/10/science/ch01/practice');
    expect(within(screen.getByTestId('focus-strongest')).getByText('Proficient')).toBeTruthy();
    await waitFor(() => expect(screen.getByRole('list', { name: 'Study days this week' })).toBeTruthy());
    expect(screen.queryByTestId('heatmap')).toBeNull();
    expect(screen.getByTestId('progress-streak').textContent).toBe('3 day streak');
    expect(screen.getByTestId('recent-row-practice').querySelector('a')!.getAttribute('href')).toBe('/learn/cbse/10/science/ch01/practice');
    // Rail: goal ring + editor, player card, badges teaser.
    const goal = screen.getByTestId('weekly-goal');
    expect(within(goal).getByRole('img').getAttribute('aria-label')).toBe('Weekly goal: 9 of 20 questions solved this week');
    expect(within(goal).getByTestId('goal-change')).toBeTruthy();
    expect(screen.getByTestId('card-preview')).toBeTruthy();
    expect(screen.getByTestId('badge-tile').textContent).toContain('On a roll');
    expect(screen.getByTestId('badge-tile').textContent).toContain('2 of 12');
  });

  it('the heatmap from 7 active days; fewer than 3 marked tests: no chart', async () => {
    h.session = { ...h.session, state: member };
    routeGets({ '/v1/me/activity': activity(7), '/v1/me/mastery': { subjects: [] } });
    const d = active();
    d.testHistory = d.testHistory.slice(0, 2);
    wrap(<ProgressView d={d} />);
    expect(await screen.findByTestId('heatmap')).toBeTruthy();
    expect(screen.queryByTestId('score-trend')).toBeNull();
    expect(screen.getAllByTestId('test-row')).toHaveLength(2);
  });

  it('weekly goal edit in the rail: validation, PATCH, the ring follows the saved target', async () => {
    h.session = { ...h.session, state: member };
    routeGets({});
    h.api.patch.mockResolvedValue({ weeklyGoal: { target: 8, isDefault: false } });
    wrap(<ProgressView d={active()} />);
    const goal = screen.getByTestId('weekly-goal');
    fireEvent.click(within(goal).getByTestId('goal-change'));
    const input = within(goal).getByLabelText('Questions to solve each week');
    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.click(within(goal).getByTestId('goal-save'));
    expect(goal.textContent).toContain('Choose a goal from 5 to 300 questions.');
    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.click(within(goal).getByTestId('goal-save'));
    await waitFor(() => expect(goal.querySelector('[data-target]')!.getAttribute('data-target')).toBe('8'));
    expect(h.api.patch).toHaveBeenCalledWith('/v1/me', { body: { weeklyGoal: 8 } });
    expect(goal.textContent).toContain('Goal met · 1 extra');
  });
});

/**
 * D-043: the student dashboard (view-models, empty states, prompts from `profile.missing` / `schoolStatus`,
 * chart text alternatives, weekly goal edit), the school picker on /me (debounce, pick, create, validation,
 * clear, consent gate), the default landing after login and the Home entry in the app shell.
 */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type Me, type MyDashboard, type School, type TestHistoryItem } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  pathname: '/me/dashboard',
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn(), updateUser: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  progress: { progress: null as unknown, ready: true, refresh: () => undefined },
  credits: { credits: null as unknown, aiAllowed: false },
  coins: { summary: null as unknown },
}));
vi.mock('next/navigation', () => ({ usePathname: () => h.pathname, useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('../learn/ProgressProvider', () => ({ useLearnerProgress: () => h.progress }));
vi.mock('../ai/CreditsProvider', () => ({ useCredits: () => h.credits }));
vi.mock('../coins/CoinsProvider', () => ({ useCoins: () => h.coins, useOptionalCoins: () => h.coins }));

import {
  accuracyDelta,
  chapterLinkHref,
  countDelta,
  difficultyView,
  goalView,
  greeting,
  isNewAccount,
  kpiTiles,
  parseGoal,
  profilePrompts,
  recentRows,
  relativeDay,
  scopeText,
  subjectHref,
  trendPoints,
  trendSummary,
  withTarget,
} from '../dashboard/model';
import { DifficultyChart, ScoreTrendChart } from '../dashboard/charts';
import { DashboardClient, DashboardView } from '../dashboard/DashboardClient';
import { WeeklyGoalEditor } from '../dashboard/WeeklyGoalEditor';
import { checkNewSchool, SCHOOL_SEARCH_DEBOUNCE_MS, SchoolSetting } from '../me/SchoolSetting';
import { DASHBOARD_PATH, defaultLoginReturnTo } from '../lib/return-to';
import { AppShell, HOME_NAV, isCurrentSection, navFor } from '../shell/AppShell';
import { ThemeProvider } from '../shell/ThemeProvider';
import { greeting as learnGreeting } from '../learn/LearnHome';

const LINK = { board: 'cbse', classLevel: 10, subjectId: 'cbse-10-science', subjectSlug: 'science', chapterId: 'cbse-10-science-ch01', chapterSlug: 'ch01' } as const;
const zero = { allTime: 0, thisWeek: 0, lastWeek: 0 };
const window7 = (from: string, to: string, checked = 0, right = 0) => ({ from, to, checked, right, accuracy: checked ? Math.round((right / checked) * 1000) / 1000 : null });

/** A brand-new account (exactly what the API returns before any activity, board/class not set). */
function emptyDashboard(over: Partial<MyDashboard> = {}): MyDashboard {
  return {
    timezone: 'Asia/Kolkata',
    today: '2026-10-28',
    thisWeek: { from: '2026-10-26', to: '2026-11-01' },
    lastWeek: { from: '2026-10-19', to: '2026-10-25' },
    profile: { board: null, classLevel: null, school: null, schoolStatus: 'consent_required', missing: ['board', 'classLevel'] },
    totals: {
      solved: { ...zero },
      answered: { ...zero },
      accuracy: { recent: window7('2026-10-22', '2026-10-28'), previous: window7('2026-10-15', '2026-10-21') },
      lessonsCompleted: { ...zero },
      tests: { submitted: { ...zero }, distinctTests: 0, averagePct: null, bestPct: null },
      activeDays: { thisWeek: 0, lastWeek: 0, allTime: 0 },
    },
    scope: { kind: 'none', board: null, classLevel: null, subjectCount: 0, chapterCount: 0 },
    solvedByDifficulty: { all: { solved: 0, total: 0 }, easy: { solved: 0, total: 0 }, medium: { solved: 0, total: 0 }, hard: { solved: 0, total: 0 } },
    mastery: { score: 0, chapterCount: 0, levels: { not_started: 0, attempted: 0, familiar: 0, proficient: 0, mastered: 0 } },
    testHistory: [],
    focus: { weakest: [], strongest: [] },
    recent: [],
    badges: { earned: 0, total: 12, next: { key: 'first_steps', name: 'First steps', description: 'Solve your first question', icon: 'spark', current: 0, target: 1, progress: 0 } },
    weeklyGoal: { metric: 'questions_solved', target: 20, isDefault: true, progress: 0, remaining: 20, met: false, weekStart: '2026-10-26', weekEnd: '2026-11-01', daysLeft: 5 },
    ...over,
  };
}

function test(over: Partial<TestHistoryItem> = {}): TestHistoryItem {
  return {
    attemptId: '11111111-1111-4111-8111-111111111111',
    testId: 'cbse-10-science-ch01-t1',
    title: 'Chemical Reactions: chapter test 1',
    kind: 'chapter',
    subjectId: 'cbse-10-science',
    subjectName: 'Science',
    submittedAt: '2026-10-27T10:00:00.000Z',
    day: '2026-10-27',
    autoSubmitted: false,
    score: 18,
    maxScore: 25,
    percentage: 72,
    autoScore: 18,
    selfScore: 0,
    marking: 'auto',
    liveEventId: null,
    ...over,
  };
}

const focus = (over: Partial<MyDashboard['focus']['weakest'][number]> = {}) => ({
  chapterId: 'cbse-10-science-ch01',
  number: 1,
  title: 'Chemical Reactions and Equations',
  subjectId: 'cbse-10-science',
  subjectName: 'Science',
  level: 'attempted' as const,
  score: 22,
  firstTryAccuracy: 0.4,
  practiceAttempted: 5,
  practiceTotal: 60,
  chapterTestPct: null,
  link: LINK,
  ...over,
});

/** An active CBSE 10 student with consent, a little practice and two tests. */
function activeDashboard(): MyDashboard {
  return emptyDashboard({
    profile: { board: 'cbse', classLevel: 10, school: { id: '22222222-2222-4222-8222-222222222222', name: "St. Mary's School", city: 'Mumbai', state: 'Maharashtra', board: 'cbse', verified: false }, schoolStatus: 'set', missing: [] },
    totals: {
      solved: { allTime: 14, thisWeek: 9, lastWeek: 5 },
      answered: { allTime: 30, thisWeek: 18, lastWeek: 12 },
      accuracy: { recent: window7('2026-10-22', '2026-10-28', 20, 15), previous: window7('2026-10-15', '2026-10-21', 10, 6) },
      lessonsCompleted: { allTime: 4, thisWeek: 1, lastWeek: 3 },
      tests: { submitted: { allTime: 2, thisWeek: 1, lastWeek: 1 }, distinctTests: 2, averagePct: 61, bestPct: 72 },
      activeDays: { thisWeek: 3, lastWeek: 3, allTime: 9 },
    },
    scope: { kind: 'class', board: 'cbse', classLevel: 10, subjectCount: 3, chapterCount: 42 },
    solvedByDifficulty: { all: { solved: 14, total: 300 }, easy: { solved: 8, total: 120 }, medium: { solved: 4, total: 100 }, hard: { solved: 2, total: 80 } },
    mastery: { score: 6, chapterCount: 42, levels: { not_started: 38, attempted: 2, familiar: 1, proficient: 1, mastered: 0 } },
    testHistory: [test(), test({ attemptId: '33333333-3333-4333-8333-333333333333', title: 'Acids: chapter test 1', day: '2026-10-20', percentage: 50, marking: 'self', selfScore: 4 })],
    focus: { weakest: [focus()], strongest: [focus({ chapterId: 'cbse-10-science-ch02', number: 2, title: 'Acids, Bases and Salts', level: 'proficient', score: 81, link: { ...LINK, chapterId: 'cbse-10-science-ch02', chapterSlug: 'ch02' } })] },
    recent: [
      { kind: 'practice', id: 'p1', at: '2026-10-28T05:00:00.000Z', day: '2026-10-28', chapter: { chapterId: LINK.chapterId, title: 'Chemical Reactions and Equations', subjectId: LINK.subjectId, subjectName: 'Science', link: LINK }, answered: 4, solved: 3 },
      { kind: 'test', id: 't1', at: '2026-10-27T10:00:00.000Z', day: '2026-10-27', attemptId: '11111111-1111-4111-8111-111111111111', testId: 'x', title: 'Chemical Reactions: chapter test 1', testKind: 'chapter', percentage: 72 },
      { kind: 'lesson', id: 'l1', at: '2026-10-20T10:00:00.000Z', day: '2026-10-20', chapter: { chapterId: LINK.chapterId, title: 'Chemical Reactions and Equations', subjectId: LINK.subjectId, subjectName: 'Science', link: LINK }, part: 2 },
      { kind: 'badge', id: 'b1', at: '2026-10-20T10:00:00.000Z', day: '2026-10-20', badgeKey: 'first_steps', name: 'First steps', icon: 'spark' },
    ],
    badges: { earned: 1, total: 12, next: { key: 'ten', name: 'Ten solved', description: 'Solve 10 questions', icon: 'spark', current: 9, target: 10, progress: 0.9 } },
    weeklyGoal: { metric: 'questions_solved', target: 20, isDefault: true, progress: 9, remaining: 11, met: false, weekStart: '2026-10-26', weekEnd: '2026-11-01', daysLeft: 5 },
  });
}

const member = (consent = 'granted') => ({ status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent });
const loading = { status: 'loading' } as const;

function routeGets(map: Record<string, unknown>) {
  h.api.get.mockImplementation((path: string) => (path in map ? (map[path] instanceof Error ? Promise.reject(map[path]) : Promise.resolve(map[path])) : new Promise(() => undefined)));
}

const wrap = (ui: ReactNode) => render(<ToastProvider>{ui}</ToastProvider>);

beforeEach(() => {
  h.pathname = '/me/dashboard';
  h.session = { state: { status: 'guest' }, openLogin: vi.fn(), updateUser: vi.fn() };
  for (const fn of Object.values(h.api)) fn.mockReset();
  h.progress = { progress: null, ready: true, refresh: () => undefined };
  h.credits = { credits: null, aiAllowed: false };
  h.coins = { summary: null };
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

/* ── View-models ──────────────────────────────────────────────────────────── */

describe('dashboard view-models', () => {
  it('deltas: counts vs last week and accuracy in points; nothing to compare says nothing', () => {
    expect(countDelta(9, 5)).toEqual({ direction: 'up', text: '4 more than last week' });
    expect(countDelta(2, 5)).toEqual({ direction: 'down', text: '3 fewer than last week' });
    expect(countDelta(3, 3)).toEqual({ direction: 'same', text: 'Same as last week' });
    expect(countDelta(0, 0)).toEqual({ direction: 'none', text: '' });
    expect(accuracyDelta(0.75, 0.6)).toEqual({ direction: 'up', text: 'Up 15 points on the 7 days before' });
    expect(accuracyDelta(0.5, 0.6).direction).toBe('down');
    expect(accuracyDelta(0.6, 0.6).direction).toBe('same');
    expect(accuracyDelta(0.6, null)).toEqual({ direction: 'none', text: 'Nothing checked the 7 days before' });
    expect(accuracyDelta(null, 0.4)).toEqual({ direction: 'none', text: '' });
  });

  it('KPI tiles use only API fields; a new account shows zeros and dashes, never invented numbers', () => {
    const fresh = kpiTiles(emptyDashboard());
    expect(fresh.map((k) => [k.key, k.value])).toEqual([
      ['solved', '0'],
      ['accuracy', '–'],
      ['lessons', '0'],
      ['tests', '0'],
      ['active', '0/7'],
    ]);
    expect(fresh.find((k) => k.key === 'tests')!.sub).toBe('No marked tests yet');
    expect(fresh.find((k) => k.key === 'accuracy')!.sub).toBe('No auto-checked answers yet');
    expect(isNewAccount(emptyDashboard())).toBe(true);

    const d = activeDashboard();
    expect(isNewAccount(d)).toBe(false);
    const tiles = Object.fromEntries(kpiTiles(d).map((k) => [k.key, k]));
    expect(tiles.solved).toMatchObject({ value: '9', sub: '14 all time', delta: { direction: 'up', text: '4 more than last week' } });
    expect(tiles.accuracy).toMatchObject({ value: '75%', sub: '15 of 20 checked answers right', delta: { direction: 'up', text: 'Up 15 points on the 7 days before' } });
    expect(tiles.lessons).toMatchObject({ value: '4', sub: '1 this week', delta: { direction: 'down' } });
    expect(tiles.tests).toMatchObject({ value: '2', sub: 'Average 61% · best 72%', delta: null });
    expect(tiles.active).toMatchObject({ value: '3/7', sub: '9 days all time', delta: { direction: 'same' } });
  });

  it('greeting is by the IST hour (and /learn re-exports the same function)', () => {
    expect(greeting(new Date('2026-10-28T02:00:00Z'))).toBe('Good morning'); // 07:30 IST
    expect(greeting(new Date('2026-10-28T08:00:00Z'))).toBe('Good afternoon'); // 13:30 IST
    expect(greeting(new Date('2026-10-28T13:00:00Z'))).toBe('Good evening'); // 18:30 IST
    expect(learnGreeting).toBe(greeting);
  });

  it('prompts come from profile.missing and schoolStatus only', () => {
    expect(profilePrompts({ missing: ['board', 'classLevel'], schoolStatus: 'consent_required' })).toEqual([{ kind: 'class', missing: ['board', 'classLevel'] }, { kind: 'school-consent' }]);
    expect(profilePrompts({ missing: ['classLevel', 'school'], schoolStatus: 'not_set' })).toEqual([{ kind: 'class', missing: ['classLevel'] }, { kind: 'school' }]);
    expect(profilePrompts({ missing: [], schoolStatus: 'set' })).toEqual([]);
    // Consent not granted: never the school prompt, only the way to approval.
    expect(profilePrompts({ missing: [], schoolStatus: 'consent_required' })).toEqual([{ kind: 'school-consent' }]);
  });

  it('weekly goal: 5–300 whole numbers, progress text, saved target recomputes remaining', () => {
    expect(parseGoal('25')).toEqual({ ok: true, value: 25 });
    expect(parseGoal(' 300 ')).toEqual({ ok: true, value: 300 });
    expect(parseGoal('4')).toMatchObject({ ok: false });
    expect(parseGoal('301')).toMatchObject({ ok: false });
    expect(parseGoal('12.5')).toMatchObject({ ok: false });
    expect(parseGoal('')).toMatchObject({ ok: false });
    const g = activeDashboard().weeklyGoal;
    expect(goalView(g)).toEqual({ percent: 45, label: 'Weekly goal: 9 of 20 questions solved this week', status: '11 questions to go · 5 days left' });
    expect(goalView({ ...g, progress: 22, remaining: 0, met: true }).status).toBe('Goal met. 2 extra so far.');
    expect(goalView({ ...g, progress: 22, remaining: 0, met: true }).percent).toBe(100);
    expect(withTarget(g, { target: 8, isDefault: false })).toMatchObject({ target: 8, isDefault: false, remaining: 0, met: true, progress: 9 });
    expect(withTarget(g, { target: 50, isDefault: false })).toMatchObject({ remaining: 41, met: false });
  });

  it('difficulty, scope and links', () => {
    const v = difficultyView(activeDashboard().solvedByDifficulty);
    expect(v.percent).toBe(5);
    expect(v.rows.map((r) => [r.label, r.solved, r.total])).toEqual([
      ['Easy', 8, 120],
      ['Medium', 4, 100],
      ['Hard', 2, 80],
    ]);
    expect(v.summary).toBe('Solved 14 of 300 practice questions: Easy 8 of 120, Medium 4 of 100, Hard 2 of 80.');
    expect(difficultyView(emptyDashboard().solvedByDifficulty).summary).toBe('No practice questions in your subjects yet.');
    expect(scopeText(activeDashboard().scope)).toBe('42 chapters in 3 subjects of CBSE Class 10 with lessons or practice');
    expect(scopeText({ kind: 'activity', board: null, classLevel: null, subjectCount: 1, chapterCount: 14 })).toBe('14 chapters in the 1 subject you have practised');
    expect(scopeText(emptyDashboard().scope)).toMatch(/^Set your class/);
    expect(subjectHref('cbse-10-science')).toBe('/learn/cbse/10/science');
    expect(subjectHref('icse-9-physics')).toBe('/learn/cisce/9/physics');
    expect(subjectHref('nope')).toBeNull();
    expect(chapterLinkHref(LINK)).toBe('/learn/cbse/10/science/ch01');
    expect(chapterLinkHref(LINK, 'practice')).toBe('/learn/cbse/10/science/ch01/practice');
  });

  it('test trend: oldest first, unmarked attempts left out, summary names self-marking', () => {
    const history = [test({ attemptId: 'a3', percentage: 80, day: '2026-10-27' }), test({ attemptId: 'a2', percentage: null }), test({ attemptId: 'a1', percentage: 40, day: '2026-10-20', marking: 'self' })];
    const pts = trendPoints(history);
    expect(pts.map((p) => p.attemptId)).toEqual(['a1', 'a3']);
    expect(trendSummary(pts)).toBe('Your last 2 marked tests: from 40% on 20 Oct 2026 to 80% on 27 Oct 2026. Average 60%, best 80%. 1 includes marks you gave yourself.');
    expect(trendSummary([])).toBe('No marked tests yet.');
  });

  it('recent activity: text, IST relative day and links per kind', () => {
    expect(relativeDay('2026-10-28', '2026-10-28')).toBe('Today');
    expect(relativeDay('2026-10-27', '2026-10-28')).toBe('Yesterday');
    expect(relativeDay('2026-02-28', '2026-03-01')).toBe('Yesterday'); // across a month end
    expect(relativeDay('2024-02-28', '2024-03-01')).toBe('28 Feb 2024'); // leap year: two days
    const rows = recentRows(activeDashboard().recent, '2026-10-28');
    expect(rows.map((r) => [r.kind, r.when, r.href])).toEqual([
      ['practice', 'Today', '/learn/cbse/10/science/ch01/practice'],
      ['test', 'Yesterday', '/tests/result/11111111-1111-4111-8111-111111111111'],
      ['lesson', '20 Oct 2026', '/learn/cbse/10/science/ch01'],
      ['badge', '20 Oct 2026', '/me#badges'],
    ]);
    expect(rows[0]!.text).toBe('Practised Chemical Reactions and Equations (Science): 4 answers, 3 solved');
    expect(rows[1]!.text).toBe('Chapter test: Chemical Reactions: chapter test 1, 72%');
    expect(rows[3]!.text).toBe('Earned the First steps badge');
  });
});

/* ── Charts: text alternatives, not colour alone ──────────────────────────── */

describe('dashboard charts', () => {
  it('difficulty chart: every band written out, summary as the ring label and caption', () => {
    render(<DifficultyChart data={activeDashboard().solvedByDifficulty} />);
    const fig = screen.getByTestId('difficulty-chart');
    expect(fig.getAttribute('data-solved')).toBe('14');
    expect(screen.getByRole('img').getAttribute('aria-label')).toBe('Solved 14 of 300 practice questions: Easy 8 of 120, Medium 4 of 100, Hard 2 of 80.');
    for (const band of ['Easy', 'Medium', 'Hard']) expect(within(fig).getByText(band)).toBeTruthy();
    expect(fig.querySelector('figcaption')!.textContent).toContain('Hard 2 of 80');
  });

  it('score trend: labelled image, a hidden data table, self-marked bars hatched and in the legend', () => {
    const pts = trendPoints(activeDashboard().testHistory);
    render(<ScoreTrendChart points={pts} />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('aria-label')).toMatch(/^Test scores chart\. Your last 2 marked tests: from 50% on 20 Oct 2026 to 72% on 27 Oct 2026/);
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(3);
    expect(within(table).getByText('Includes self-marking')).toBeTruthy();
    const bars = [...img.querySelectorAll('rect[data-marking]')];
    expect(bars.map((b) => b.getAttribute('data-marking'))).toEqual(['self', 'auto']);
    expect(bars[0]!.getAttribute('fill')).toBe('url(#soyl-self-hatch)');
    expect(bars[1]!.getAttribute('fill')).toBeNull();
    expect(bars[0]!.querySelector('title')!.textContent).toBe('Acids: chapter test 1, 20 Oct 2026: 50% (includes self-marking)');
    expect(screen.getByText('Includes self-marking', { selector: 'span' })).toBeTruthy();
  });
});

/* ── The page ─────────────────────────────────────────────────────────────── */

const loadingHooks = { card: { status: 'loading' as const }, activity: { status: 'loading' as const }, mastery: { status: 'loading' as const } };

describe('DashboardView', () => {
  it('brand-new account: welcome, class prompt, consent link instead of a school prompt, every block has an empty state', () => {
    h.session = { state: member('required'), openLogin: vi.fn(), updateUser: vi.fn() };
    wrap(<DashboardView d={emptyDashboard()} name="Asha" consent={false} {...loadingHooks} onProfileChanged={vi.fn()} />);
    expect(screen.getByTestId('dashboard').getAttribute('data-new')).toBe('true');
    expect(screen.getByTestId('dashboard-welcome')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/^Good (morning|afternoon|evening), Asha$/);
    expect(screen.getByTestId('dashboard-profile-line').textContent).toBe('Board and class not set');
    expect(screen.getByTestId('prompt-class')).toBeTruthy();
    expect(screen.queryByTestId('prompt-school')).toBeNull();
    expect(screen.getByTestId('prompt-school-consent').querySelector('a')!.getAttribute('href')).toBe('/me/consent?next=%2Fme%2Fdashboard');
    expect(screen.getByTestId('kpi-accuracy').getAttribute('data-value')).toBe('–');
    expect(screen.getByTestId('mastery-tile').textContent).toContain('Set your board and class, or start any chapter');
    expect(screen.getByTestId('tests-tile').textContent).toContain('Take a chapter test to see your scores here.');
    expect(screen.getByTestId('focus-tile').textContent).toContain('Answer at least 3 practice questions');
    expect(screen.getByTestId('recent-tile').textContent).toContain('will be listed here');
    expect(screen.getByTestId('weekly-goal').getAttribute('data-target')).toBe('20');
    // League: consent-gated, explained, no league request.
    expect(screen.getByTestId('league-locked')).toBeTruthy();
    expect(h.api.get).not.toHaveBeenCalledWith('/v1/leagues/current');
  });

  it('active student: profile line with school, school prompt only when missing with consent, tests with marking tags, focus links', () => {
    routeGets({ '/v1/leagues/current': { status: 'active', league: null, me: null } });
    h.session = { state: member(), openLogin: vi.fn(), updateUser: vi.fn() };
    const d = activeDashboard();
    const { unmount } = wrap(<DashboardView d={d} name={null} consent {...loadingHooks} onProfileChanged={vi.fn()} />);
    expect(screen.queryByTestId('dashboard-welcome')).toBeNull();
    expect(screen.getByTestId('dashboard-profile-line').textContent).toBe("CBSE Class 10 · St. Mary's School, Mumbai");
    expect(screen.queryByTestId('prompt-class')).toBeNull();
    expect(screen.queryByTestId('prompt-school')).toBeNull();
    expect(screen.queryByTestId('prompt-school-consent')).toBeNull();
    const rows = screen.getAllByTestId('test-row');
    expect(rows.map((r) => [r.getAttribute('data-marking'), within(r).getByText(/marked$/).textContent])).toEqual([
      ['auto', 'Auto-marked'],
      ['self', 'Self-marked'],
    ]);
    expect(rows[0]!.getAttribute('href')).toBe('/tests/result/11111111-1111-4111-8111-111111111111');
    expect(screen.getByTestId('focus-practise').getAttribute('href')).toBe('/learn/cbse/10/science/ch01/practice');
    expect(within(screen.getByTestId('focus-strongest')).getByText('Chapter 2: Acids, Bases and Salts')).toBeTruthy();
    expect(screen.getAllByTestId('recent-row')).toHaveLength(4);
    expect(screen.getByTestId('badge-tile').textContent).toContain('9 of 10');
    expect(screen.getByTestId('league-card')).toBeTruthy();
    expect(h.api.get).toHaveBeenCalledWith('/v1/leagues/current');
    unmount();

    const notSet = { ...d, profile: { ...d.profile, school: null, schoolStatus: 'not_set' as const, missing: ['school' as const] } };
    wrap(<DashboardView d={notSet} name={null} consent {...loadingHooks} onProfileChanged={vi.fn()} />);
    expect(screen.getByTestId('prompt-school').querySelector('a')!.getAttribute('href')).toBe('/me#school');
    expect(screen.getByTestId('dashboard-profile-line').textContent).toBe('CBSE Class 10');
  });

  it('level, XP, coins from the card and the streak from activity', () => {
    const card = { status: 'ready' as const, data: { publicName: 'Brave Otter 123', level: 4, xp: 1250, coins: 37, overall: 55, tier: 'bronze' as const, provisional: true, formulaVersion: 1, attributes: [], asOfDay: '2026-10-28' } };
    const activity = { status: 'ready' as const, data: { timezone: 'Asia/Kolkata' as const, from: '2026-06-11', to: '2026-10-28', days: 140, calendar: [], totals: { answered: 0, solved: 0, lessonsCompleted: 0, testsSubmitted: 0, activeDays: 0 }, streak: { current: 3, longest: 5, lastActiveDay: '2026-10-28', atRisk: false, freezeAvailableThisWeek: true }, activeDaysAllTime: 9 } };
    wrap(<DashboardView d={activeDashboard()} name="Asha" consent={false} card={card} activity={activity} mastery={{ status: 'loading' }} onProfileChanged={vi.fn()} />);
    const stats = screen.getByRole('list', { name: 'Your stats' });
    expect(stats.textContent).toContain('3 day streak');
    expect(stats.textContent).toContain('Level 4 · 1,250 XP');
    expect(stats.textContent).toContain('37 coins');
    expect(screen.getByTestId('heatmap')).toBeTruthy();
  });

  it('class prompt saves board and class, then reloads the dashboard', async () => {
    h.session = { state: member('required'), openLogin: vi.fn(), updateUser: vi.fn() };
    h.api.patch.mockResolvedValue({ board: 'cbse', classLevel: 9 });
    const reload = vi.fn();
    wrap(<DashboardView d={emptyDashboard()} name={null} consent={false} {...loadingHooks} onProfileChanged={reload} />);
    const prompt = screen.getByTestId('prompt-class');
    fireEvent.click(within(prompt).getByTestId('prompt-class-save'));
    expect(within(prompt).getByRole('alert').textContent).toBe('Choose your board and your class.');
    expect(h.api.patch).not.toHaveBeenCalled();
    fireEvent.change(within(prompt).getByLabelText('Board'), { target: { value: 'cbse' } });
    fireEvent.change(within(prompt).getByLabelText('Class'), { target: { value: '9' } });
    fireEvent.click(within(prompt).getByTestId('prompt-class-save'));
    await waitFor(() => expect(reload).toHaveBeenCalled());
    expect(h.api.patch).toHaveBeenCalledWith('/v1/me', { body: { board: 'cbse', classLevel: 9 } });
    expect(h.session.updateUser).toHaveBeenCalledWith({ board: 'cbse', classLevel: 9 });
  });

  it('weekly goal edit: validation, PATCH, the ring follows the saved target', async () => {
    h.session = { state: member(), openLogin: vi.fn(), updateUser: vi.fn() };
    routeGets({});
    h.api.patch.mockResolvedValue({ weeklyGoal: { target: 8, isDefault: false } });
    wrap(<DashboardView d={activeDashboard()} name={null} consent={false} {...loadingHooks} onProfileChanged={vi.fn()} />);
    const tile = screen.getByTestId('weekly-goal');
    fireEvent.click(within(tile).getByTestId('goal-change'));
    const input = within(tile).getByLabelText('Questions to solve each week');
    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.click(within(tile).getByTestId('goal-save'));
    expect(tile.textContent).toContain('Choose a goal from 5 to 300 questions.');
    expect(h.api.patch).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.click(within(tile).getByTestId('goal-save'));
    await waitFor(() => expect(tile.getAttribute('data-target')).toBe('8'));
    expect(h.api.patch).toHaveBeenCalledWith('/v1/me', { body: { weeklyGoal: 8 } });
    expect(tile.textContent).toContain('Goal met.');
    expect(within(tile).getByRole('img').getAttribute('aria-label')).toBe('Weekly goal: 9 of 8 questions solved this week');
  });
});

describe('DashboardClient', () => {
  it('guests: sign-in prompt that returns to the dashboard, and the progress on this device', () => {
    h.progress = { progress: { source: 'device', lessonsCompleted: 2, practiceAnswered: 5, practiceCorrect: 3, subjects: [], chapters: {}, streak: null, xp: null, level: null, levelProgress: null, accuracy: 0.6 }, ready: true, refresh: () => undefined };
    wrap(<DashboardClient />);
    expect(screen.getByTestId('dashboard-guest')).toBeTruthy();
    expect(screen.getByTestId('device-progress').textContent).toContain('2 lessons done');
    fireEvent.click(screen.getByTestId('dashboard-login'));
    expect(h.session.openLogin).toHaveBeenCalledWith(expect.objectContaining({ returnTo: '/me/dashboard' }));
    expect(h.api.get).not.toHaveBeenCalled();
  });

  it('loading session: skeleton; members: skeleton, then the page; an error offers a retry', async () => {
    h.session = { state: loading, openLogin: vi.fn(), updateUser: vi.fn() };
    const { unmount } = wrap(<DashboardClient />);
    expect(screen.getByTestId('dashboard-loading').getAttribute('aria-busy')).toBe('true');
    unmount();

    h.session = { state: member(), openLogin: vi.fn(), updateUser: vi.fn() };
    let fail = true;
    h.api.get.mockImplementation((path: string) => {
      if (path === '/v1/me/dashboard') return fail ? Promise.reject(new ApiError(503, 'service_unavailable', null)) : Promise.resolve(activeDashboard());
      return new Promise(() => undefined);
    });
    wrap(<DashboardClient />);
    expect(screen.getByTestId('dashboard-loading')).toBeTruthy();
    expect(await screen.findByText('We could not load your dashboard')).toBeTruthy();
    fail = false;
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByTestId('dashboard')).toBeTruthy();
    expect(screen.getByTestId('kpi-solved').getAttribute('data-value')).toBe('9');
  });
});

describe('WeeklyGoalEditor (profile)', () => {
  it('shows the current goal, saves a new one, and goes back to the default with null', async () => {
    const onSaved = vi.fn();
    h.api.patch.mockResolvedValueOnce({ weeklyGoal: { target: 40, isDefault: false } }).mockResolvedValueOnce({ weeklyGoal: { target: 20, isDefault: true } });
    const { rerender } = wrap(<WeeklyGoalEditor target={20} isDefault showSummary onSaved={onSaved} />);
    expect(screen.getByTestId('weekly-goal-value').textContent).toBe('20 questions a week (default)');
    fireEvent.click(screen.getByTestId('goal-change'));
    expect(screen.queryByText(/Use the default/)).toBeNull();
    fireEvent.change(screen.getByLabelText('Questions to solve each week'), { target: { value: 'forty' } });
    fireEvent.click(screen.getByTestId('goal-save'));
    expect(screen.getByText('Enter a whole number from 5 to 300.')).toBeTruthy();
    fireEvent.change(screen.getByLabelText('Questions to solve each week'), { target: { value: '40' } });
    fireEvent.click(screen.getByTestId('goal-save'));
    await waitFor(() => expect(onSaved).toHaveBeenCalledWith({ target: 40, isDefault: false }));
    rerender(
      <ToastProvider>
        <WeeklyGoalEditor target={40} isDefault={false} showSummary onSaved={onSaved} />
      </ToastProvider>,
    );
    expect(screen.getByTestId('weekly-goal-value').textContent).toBe('40 questions a week');
    fireEvent.click(screen.getByTestId('goal-change'));
    fireEvent.click(screen.getByRole('button', { name: 'Use the default (20)' }));
    await waitFor(() => expect(onSaved).toHaveBeenLastCalledWith({ target: 20, isDefault: true }));
    expect(h.api.patch).toHaveBeenLastCalledWith('/v1/me', { body: { weeklyGoal: null } });
  });
});

/* ── School on the profile ────────────────────────────────────────────────── */

function me(over: Partial<Me> = {}): Me {
  return {
    id: '00000000-0000-4000-8000-000000000001',
    role: 'student',
    displayName: 'Asha',
    board: 'cbse',
    classLevel: 10,
    publicName: 'Brave Otter 123',
    locale: 'en-IN',
    consent: 'granted',
    school: null,
    weeklyGoal: { target: 20, isDefault: true },
    methods: { phone: null, email: 'a@example.com', google: false },
    guestMergedAt: null,
    createdAt: '2026-10-01T00:00:00.000Z',
    ...over,
  } as Me;
}

const SCHOOL: School = { id: '44444444-4444-4444-8444-444444444444', name: 'Kendriya Vidyalaya No. 1', city: 'Pune', state: 'Maharashtra', board: 'cbse', verified: true };

describe('school picker', () => {
  it('checkNewSchool: the shared validator, with friendly messages and a clean body', () => {
    expect(checkNewSchool({ name: 'School of rahul@gmail.com', city: 'Pune', state: '', board: '' })).toEqual({ ok: false, errors: { name: 'The school name must not contain emails, links or handles.' } });
    expect(checkNewSchool({ name: 'Good School', city: 'Pune 411001', state: '', board: '' })).toMatchObject({ ok: false, errors: { city: expect.stringMatching(/^The city /) } });
    expect(checkNewSchool({ name: 'ab', city: '', state: 'Atlantis', board: '' })).toMatchObject({ ok: false, errors: { name: expect.any(String), city: expect.any(String), state: expect.any(String) } });
    expect(checkNewSchool({ name: "  St.  Mary's   School ", city: 'Mumbai', state: 'maharashtra', board: 'cisce' })).toEqual({ ok: true, body: { name: "St. Mary's School", city: 'Mumbai', state: 'Maharashtra', board: 'cisce' } });
    expect(checkNewSchool({ name: 'Good School', city: 'Pune', state: '', board: '' })).toEqual({ ok: true, body: { name: 'Good School', city: 'Pune' } });
  });

  it('not consented: one line and the approval link, no controls and no school request', () => {
    const onChange = vi.fn();
    wrap(<SchoolSetting me={me({ consent: 'required' })} onChange={onChange} />);
    const locked = screen.getByTestId('school-locked');
    expect(locked.querySelector('a')!.getAttribute('href')).toBe('/me/consent?next=%2Fme');
    expect(screen.queryByTestId('school-search')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(h.api.get).not.toHaveBeenCalled();
    expect(h.api.patch).not.toHaveBeenCalled();
  });

  it('search is debounced and needs 2 letters; picking a result saves it by id', async () => {
    vi.useFakeTimers();
    h.api.get.mockResolvedValue({ schools: [SCHOOL] });
    const onChange = vi.fn();
    h.api.patch.mockResolvedValue(me({ school: SCHOOL }));
    wrap(<SchoolSetting me={me()} onChange={onChange} />);
    expect(screen.getByText(/Private: only you can see your school/)).toBeTruthy();
    const box = screen.getByLabelText('Find your school');
    fireEvent.change(box, { target: { value: 'k' } });
    await act(async () => vi.advanceTimersByTime(SCHOOL_SEARCH_DEBOUNCE_MS * 2));
    expect(h.api.get).not.toHaveBeenCalled(); // too short
    fireEvent.change(box, { target: { value: 'ke' } });
    await act(async () => vi.advanceTimersByTime(SCHOOL_SEARCH_DEBOUNCE_MS - 50));
    fireEvent.change(box, { target: { value: 'kendriya' } });
    await act(async () => vi.advanceTimersByTime(SCHOOL_SEARCH_DEBOUNCE_MS - 50));
    expect(h.api.get).not.toHaveBeenCalled(); // still typing
    await act(async () => vi.advanceTimersByTime(60));
    expect(h.api.get).toHaveBeenCalledTimes(1);
    expect(h.api.get).toHaveBeenCalledWith('/v1/schools', expect.objectContaining({ query: { q: 'kendriya' } }));
    vi.useRealTimers();
    const option = await screen.findByTestId('school-option');
    expect(option.textContent).toContain('Pune, Maharashtra');
    fireEvent.click(option);
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ school: SCHOOL })));
    expect(h.api.patch).toHaveBeenCalledWith('/v1/me', { body: { school: { schoolId: SCHOOL.id } } });
  });

  it('no results, then "Add my school": browser validation first, then find-or-create, API field errors shown', async () => {
    h.api.get.mockResolvedValue({ schools: [] });
    const onChange = vi.fn();
    wrap(<SchoolSetting me={me()} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Find your school'), { target: { value: 'tiny school' } });
    expect(await screen.findByTestId('school-no-results', undefined, { timeout: 2000 })).toBeTruthy();
    fireEvent.click(screen.getByTestId('school-add'));
    const form = screen.getByTestId('school-add-form');
    fireEvent.change(within(form).getByLabelText(/School name/), { target: { value: 'Call 9876543210 School' } });
    fireEvent.change(within(form).getByLabelText(/City or town/), { target: { value: 'Pune' } });
    fireEvent.click(within(form).getByTestId('school-save'));
    expect(form.textContent).toContain('The school name must not contain phone or roll numbers.');
    expect(h.api.patch).not.toHaveBeenCalled();

    // The API can still refuse (e.g. a blocked word list update): its field error lands on the field.
    h.api.patch.mockRejectedValueOnce(new ApiError(400, 'validation_failed', { type: 'about:blank', title: 'Bad', status: 400, code: 'validation_failed', traceId: 't', errors: [{ path: 'body.school.name', message: 'x' }] }));
    fireEvent.change(within(form).getByLabelText(/School name/), { target: { value: 'Tiny Tots Public School' } });
    fireEvent.change(within(form).getByLabelText('State (optional)'), { target: { value: 'Maharashtra' } });
    fireEvent.click(within(form).getByTestId('school-save'));
    expect(await within(form).findByText('Check the school name: no links, emails, phone numbers or rude words.')).toBeTruthy();
    expect(h.api.patch).toHaveBeenLastCalledWith('/v1/me', { body: { school: { name: 'Tiny Tots Public School', city: 'Pune', state: 'Maharashtra' } } });

    const created = { ...SCHOOL, id: '55555555-5555-4555-8555-555555555555', name: 'Tiny Tots Public School', verified: false };
    h.api.patch.mockResolvedValueOnce(me({ school: created }));
    fireEvent.click(within(form).getByTestId('school-save'));
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ school: created })));
  });

  it('a saved school can be removed (PATCH school: null)', async () => {
    const onChange = vi.fn();
    h.api.patch.mockResolvedValue(me({ school: null }));
    wrap(<SchoolSetting me={me({ school: SCHOOL })} onChange={onChange} />);
    expect(screen.getByTestId('school-current').textContent).toContain('Kendriya Vidyalaya No. 1');
    expect(screen.getByText('Verified')).toBeTruthy();
    fireEvent.click(screen.getByTestId('school-remove'));
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ school: null })));
    expect(h.api.patch).toHaveBeenCalledWith('/v1/me', { body: { school: null } });
  });

  it('a refused save (rate limit, consent) explains itself', async () => {
    h.api.get.mockResolvedValue({ schools: [SCHOOL] });
    h.api.patch.mockRejectedValue(new ApiError(403, 'consent_required', null));
    wrap(<SchoolSetting me={me()} onChange={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Find your school'), { target: { value: 'kendriya' } });
    fireEvent.click(await screen.findByTestId('school-option', undefined, { timeout: 2000 }));
    expect(await screen.findByText(/needs approval first/)).toBeTruthy();
  });
});

/* ── Landing after login, shell navigation ────────────────────────────────── */

describe('default landing after login', () => {
  it('the platform home lands on the dashboard; every other page returns to itself', () => {
    expect(DASHBOARD_PATH).toBe('/me/dashboard');
    expect(defaultLoginReturnTo({ pathname: '/learn', search: '' })).toBe('/me/dashboard');
    expect(defaultLoginReturnTo({ pathname: '/learn', search: '?authError=oauth_state' })).toBe('/me/dashboard');
    expect(defaultLoginReturnTo({ pathname: '/learn/cbse/10/science', search: '' })).toBe('/learn/cbse/10/science');
    expect(defaultLoginReturnTo({ pathname: '/tests', search: '?x=1' })).toBe('/tests?x=1');
    expect(defaultLoginReturnTo({ pathname: '/me/dashboard', search: '' })).toBe('/me/dashboard');
  });
});

describe('app shell: Home for members', () => {
  it('top bar: Home first for members only; tab bar: still five, Home replaces Ranks for members', () => {
    expect(navFor(false, 'top').map((n) => n.label)).toEqual(['Learn', 'Tests', 'Ask AI', 'Leaderboard']);
    expect(navFor(true, 'top').map((n) => n.label)).toEqual(['Home', 'Learn', 'Tests', 'Ask AI', 'Leaderboard']);
    expect(navFor(false, 'tabs').map((n) => n.short)).toEqual(['Learn', 'Tests', 'Ask AI', 'Ranks', 'Me']);
    const tabs = navFor(true, 'tabs');
    expect(tabs.map((n) => n.short)).toEqual(['Home', 'Learn', 'Tests', 'Ask AI', 'Me']);
    expect(tabs[0]!.href).toBe('/me/dashboard');
    expect(isCurrentSection('/leaderboard', tabs[0]!)).toBe(true);
    expect(isCurrentSection('/me/dashboard', tabs[4]!)).toBe(false);
    expect(isCurrentSection('/me/consent', tabs[4]!)).toBe(true);
    expect(isCurrentSection('/leaderboard', HOME_NAV)).toBe(false);
  });

  it('renders Home as the current page on the dashboard (member)', () => {
    window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener: () => undefined, removeEventListener: () => undefined })) as unknown as typeof window.matchMedia;
    h.session = { state: member(), openLogin: vi.fn(), updateUser: vi.fn() };
    render(
      <ThemeProvider>
        <AppShell>
          <p>page</p>
        </AppShell>
      </ThemeProvider>,
    );
    const navs = [...document.querySelectorAll<HTMLElement>('nav[aria-label="Learning platform"]')];
    const home = within(navs[1]!).getByRole('link', { name: 'Home' });
    expect(home.getAttribute('href')).toBe('/me/dashboard');
    expect(home.getAttribute('aria-current')).toBe('page');
    expect(within(navs[1]!).getByRole('link', { name: 'Me' }).hasAttribute('aria-current')).toBe(false);
    expect(within(navs[1]!).queryByRole('link', { name: 'Ranks' })).toBeNull();
    expect(within(navs[0]!).getByRole('link', { name: 'Home', hidden: true }).getAttribute('href')).toBe('/me/dashboard');
  });
});

describe('app shell: the way back to the main site (owner, 2026-10-28)', () => {
  function shell() {
    window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener: () => undefined, removeEventListener: () => undefined })) as unknown as typeof window.matchMedia;
    return render(
      <ThemeProvider>
        <AppShell>
          <p>page</p>
        </AppShell>
      </ThemeProvider>,
    );
  }

  it('guests and members: a top-bar link and a phone row, both plain links to /, named for what they do', () => {
    for (const state of [{ status: 'guest' }, member()]) {
      h.session = { state, openLogin: vi.fn(), updateUser: vi.fn() };
      h.pathname = '/learn/cbse/10/science';
      shell();
      // The phone row (the top-bar link is display: none here: jsdom applies the module CSS without media queries).
      expect(screen.getByRole('link', { name: 'Back to soylai.com, the SOYL main website' }).getAttribute('href')).toBe('/');
      const bar = screen.getByTestId('main-site-link');
      expect(bar.getAttribute('href')).toBe('/');
      expect(bar.getAttribute('aria-label')).toBe('Back to soylai.com, the SOYL main website');
      expect(bar.textContent).toBe('soylai.com');
      expect(screen.getByTestId('main-site-link').textContent).toContain('soylai.com');
      expect(screen.getByTestId('main-site-row-link').textContent).toContain('Back to soylai.com');
      // The SOYL mark stays the academy home.
      expect(screen.getByRole('link', { name: 'SOYL Academy, learning home' }).getAttribute('href')).toBe('/learn');
      cleanup();
    }
  });

  it('immersive pages keep the top-bar link but drop the phone row (their controls own the screen)', () => {
    h.pathname = '/learn/cbse/10/science/ch01/lesson';
    shell();
    expect(screen.getByTestId('main-site-link')).toBeTruthy();
    expect(screen.queryByTestId('main-site-row-link')).toBeNull();
  });
});

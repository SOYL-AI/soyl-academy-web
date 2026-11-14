/**
 * Progress (`/me/progress`, design language v3 §10 "Progress"): the view-models (honest stats, no denominators over
 * 1,000, IST days, heatmap only from 7 active days) and the page (members only, one h1, every section, a calm
 * welcome instead of zeros for a brand-new student, the weekly goal editor in the rail). Progress radar
 * (2026-11-14): the player card section (`#card`: rated card + attribute radar, or the blank card and a dashed
 * hexagon before the first rating) and the subject radar (3–8 axes, bars below 3, "+N more" above 8).
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MyDashboard, MyPlayerCard, SubjectMastery } from '@/platform/shared/api-client';
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
import { cardRadarAxes, cardRadarCaption, difficultyStats, focusMeta, isRatedCard, progressStats, progressSubtitle, shortDay, showHeatmap, subjectRadar, testRows, toTrend, unratedText } from '../progress/progress-model';

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

const attr = (key: string, label: string, value: number, explain: string) => ({ key, label, value, raw: (value - 40) / 59, weight: 0.2, explain }) as MyPlayerCard['attributes'][number];
function playerCard(over: Partial<MyPlayerCard> = {}): MyPlayerCard {
  return {
    publicName: 'Brave Otter 123',
    avatar: { id: 'otter', bg: 'sky', isDefault: true },
    level: 4,
    xp: 1240,
    coins: 30,
    overall: 77,
    tier: 'gold',
    provisional: false,
    formulaVersion: 1,
    asOfDay: '2026-11-13',
    attributes: [
      attr('ACC', 'Accuracy', 81, '78% right first time on 40 questions'),
      attr('CON', 'Consistency', 64, 'Learned on 7 days of the last 28 (full at 16)'),
      attr('BRE', 'Breadth', 70, '10 chapters explored (full at 20)'),
      attr('MAS', 'Mastery', 75, 'Average mastery 60/100 on 10 chapters'),
      attr('TST', 'Tests', 90, 'Average 85% over 3 tests'),
    ],
    ...over,
  };
}
const subj = (subjectId: string, name: string, score: number, started: number, chapterCount = 12): SubjectMastery =>
  ({ subjectId, name, classLevel: 10, score, chapterCount, levels: { not_started: chapterCount - started, attempted: started, familiar: 0, proficient: 0, mastered: 0 }, chapters: [] }) as SubjectMastery;

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
    // Rail: goal ring + editor, badges teaser; the player card moved to the page's first section (no rail copy).
    const goal = screen.getByTestId('weekly-goal');
    expect(within(goal).getByRole('img').getAttribute('aria-label')).toBe('Weekly goal: 9 of 20 questions solved this week');
    expect(within(goal).getByTestId('goal-change')).toBeTruthy();
    expect(screen.queryByTestId('card-preview')).toBeNull();
    expect(screen.getByTestId('card-section')).toBeTruthy();
    expect(screen.getByRole('complementary').getAttribute('aria-label')).toBe('Your weekly goal and badges');
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

describe('progress radar view-models', () => {
  it('the card is rated only when it is not provisional; axes follow the card (no Speed without data)', () => {
    expect(isRatedCard(playerCard())).toBe(true);
    expect(isRatedCard(playerCard({ provisional: true }))).toBe(false);
    expect(isRatedCard(playerCard({ attributes: [] }))).toBe(false);
    expect(isRatedCard(null)).toBe(false);
    expect(cardRadarAxes(playerCard()).map((a) => [a.key, a.label, a.value, a.max])).toEqual([
      ['ACC', 'Accuracy', 81, 99],
      ['CON', 'Consistency', 64, 99],
      ['BRE', 'Breadth', 70, 99],
      ['MAS', 'Mastery', 75, 99],
      ['TST', 'Tests', 90, 99],
    ]);
    // Unrated: the six names for the blank hexagon (values never shown).
    expect(cardRadarAxes(playerCard({ provisional: true })).map((a) => a.label)).toEqual(['Accuracy', 'Consistency', 'Speed', 'Breadth', 'Mastery', 'Tests']);
    expect(cardRadarCaption(playerCard())).toBe('The centre is 40 and the outer ring 99. Speed joins your card after 10 timed test questions answered right.');
    const withSpeed = playerCard();
    withSpeed.attributes.splice(2, 0, attr('SPD', 'Speed', 66, 'On 12 test questions you got right, you took 90% of the expected time'));
    expect(cardRadarCaption(withSpeed)).toBe('The centre is 40 and the outer ring 99.');
    expect(unratedText()).toBe('Your card is rated once you have checked 10 practice answers and learned on 3 different days in the last 4 weeks. Here is where each part stands:');
  });

  it('subjects: none, bars below 3 (highest first), a radar of 3–8 ranked by chapters started, "+N more" above 8', () => {
    expect(subjectRadar([])).toEqual({ kind: 'none' });
    expect(subjectRadar([subj('x', 'Empty', 0, 0, 0)])).toEqual({ kind: 'none' });
    expect(subjectRadar([subj('m', 'Mathematics', 12, 3), subj('s', 'Science', 34, 1)])).toEqual({
      kind: 'bars',
      bars: [
        { subjectId: 's', name: 'Science', score: 34 },
        { subjectId: 'm', name: 'Mathematics', score: 12 },
      ],
    });
    const three = subjectRadar([subj('e', 'English', 5, 1), subj('m', 'Mathematics', 12.6, 3), subj('s', 'Science', 34, 3)]);
    if (three.kind !== 'radar') throw new Error('expected a radar');
    expect(three.axes.map((a) => [a.key, a.value, a.max])).toEqual([
      ['s', 34, 100],
      ['m', 13, 100],
      ['e', 5, 100],
    ]);
    expect(three.more).toBe(0);
    const eleven = subjectRadar(Array.from({ length: 11 }, (_, i) => subj(`s${i}`, `Subject ${i}`, 50, i + 1)));
    if (eleven.kind !== 'radar') throw new Error('expected a radar');
    expect(eleven.axes).toHaveLength(8);
    expect(eleven.axes[0]!.key).toBe('s10');
    expect(eleven.axes.map((a) => a.key)).not.toContain('s0');
    expect(eleven.more).toBe(3);
  });
});

describe('player card section (#card) and subject radar', () => {
  it('a rated card: the full card, a radar in its tier colour, every attribute with its explanation', async () => {
    h.session = { ...h.session, state: member };
    routeGets({ '/v1/me/card': playerCard(), '/v1/me/mastery': { subjects: [] } });
    wrap(<ProgressView d={active()} />);
    const section = screen.getByTestId('card-section');
    expect(section.querySelector('h2')!.id).toBe('card');
    expect(section.getAttribute('aria-labelledby')).toBe('card');
    // The card is the first section of the main column.
    expect(section.parentElement!.firstElementChild).toBe(section);
    const radar = await within(section).findByTestId('card-radar');
    expect(within(section).getByTestId('player-card').getAttribute('data-tier')).toBe('gold');
    expect(radar.getAttribute('data-tone')).toBe('gold');
    expect(radar.getAttribute('data-axes')).toBe('5');
    expect(radar.querySelector('[role="img"]')!.getAttribute('aria-label')).toBe('Your card attributes, from 40 to 99: Accuracy 81, Consistency 64, Breadth 70, Mastery 75 and Tests 90.');
    expect(radar.textContent).toContain('Speed joins your card after 10 timed test questions');
    const attrs = within(section).getByTestId('card-attributes');
    expect(attrs.getAttribute('data-rated')).toBe('true');
    expect(attrs.textContent).toContain('Learned on 7 days of the last 28 (full at 16)');
    expect(attrs.textContent).toContain('90');
    expect(within(section).queryByTestId('player-card-blank')).toBeNull();
    // Nothing links to the old /me#card anchor.
    expect(document.querySelector('a[href="/me#card"]')).toBeNull();
  });

  it('a provisional card: the blank card and a dashed hexagon, no numbers, what it takes, where each part stands', async () => {
    h.session = { ...h.session, state: member };
    routeGets({ '/v1/me/card': playerCard({ provisional: true, overall: 41, tier: 'bronze' }), '/v1/me/mastery': { subjects: [] } });
    wrap(<ProgressView d={active()} />);
    const section = screen.getByTestId('card-section');
    const radar = await within(section).findByTestId('card-radar');
    expect(radar.hasAttribute('data-blank')).toBe(true);
    expect(radar.getAttribute('data-axes')).toBe('6');
    expect(radar.querySelector('[data-testid="radar-shape"]')).toBeNull();
    expect(radar.querySelector('[role="img"]')!.getAttribute('aria-label')).toBe('Your card attributes: not rated yet (Accuracy, Consistency, Speed, Breadth, Mastery and Tests).');
    expect(within(section).getByTestId('player-card-blank').textContent).toContain('Solve 10 questions to get rated');
    expect(within(section).queryByTestId('player-card')).toBeNull();
    expect(section.textContent).toContain('Your card is rated once you have checked 10 practice answers');
    const attrs = within(section).getByTestId('card-attributes');
    expect(attrs.getAttribute('data-rated')).toBe('false');
    expect(attrs.textContent).toContain('78% right first time on 40 questions');
    // No ratings: the radar has no digits, the attribute list no values or bars (the explanations' own counts stay).
    expect(radar.textContent).not.toMatch(/\d/);
    for (const v of ['81', '64', '70', '75', '41']) expect(attrs.textContent).not.toContain(` ${v}`);
    expect(attrs.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });

  it('a brand-new student: the welcome first, then the blank card; the card could not load: a calm message', async () => {
    h.session = { ...h.session, state: member };
    routeGets({ '/v1/me/card': playerCard({ provisional: true }) });
    wrap(<ProgressView d={dash()} />);
    const welcome = screen.getByTestId('progress-empty');
    const section = screen.getByTestId('card-section');
    expect(welcome.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect((await within(section).findByTestId('card-radar')).hasAttribute('data-blank')).toBe(true);
    expect(screen.queryByTestId('subjects-section')).toBeNull();
    cleanup();
    h.api.get.mockImplementation((path: string) => (path === '/v1/me/card' ? Promise.reject(new Error('down')) : new Promise(() => undefined)));
    wrap(<ProgressView d={active()} />);
    expect(await screen.findByText('Your card could not load')).toBeTruthy();
    expect(screen.queryByTestId('card-radar')).toBeNull();
  });

  it('subjects: a radar of the top 8 with "+N more" to the Mastery list; bars below 3', async () => {
    h.session = { ...h.session, state: member };
    const many = Array.from({ length: 10 }, (_, i) => subj(`cbse-10-s${i}`, `Subject ${i}`, 10 + i, i + 1));
    routeGets({ '/v1/me/mastery': { subjects: many } });
    wrap(<ProgressView d={active()} />);
    const section = await screen.findByTestId('subjects-section');
    const radar = await within(section).findByTestId('subjects-radar');
    expect(radar.getAttribute('data-axes')).toBe('8');
    expect(radar.querySelector('[role="img"]')!.getAttribute('aria-label')).toMatch(/^Subject mastery, from 0 to 100%: Subject 9 19%, Subject 8 18%, .* and Subject 2 12%\.$/);
    const more = within(section).getByRole('link', { name: /\+2 more subjects/ });
    expect(more.getAttribute('href')).toBe('#mastery-title');
    expect(document.getElementById('mastery-title')).toBeTruthy();
    // The subject section sits right above Mastery.
    expect(section.nextElementSibling!.getAttribute('data-testid')).toBe('mastery-tile');
    cleanup();
    routeGets({ '/v1/me/mastery': { subjects: [subj('cbse-10-mathematics', 'Mathematics', 12, 3), subj('cbse-10-science', 'Science', 34, 1)] } });
    wrap(<ProgressView d={active()} />);
    const bars = await screen.findByTestId('subjects-bars');
    expect(screen.queryByTestId('subjects-radar')).toBeNull();
    expect(within(bars).getAllByRole('progressbar').map((b) => [b.getAttribute('aria-label'), b.getAttribute('aria-valuetext')])).toEqual([
      ['Science', '34% mastery'],
      ['Mathematics', '12% mastery'],
    ]);
    expect(screen.getByRole('list', { name: 'Your subjects by mastery' })).toBeTruthy();
  });
});

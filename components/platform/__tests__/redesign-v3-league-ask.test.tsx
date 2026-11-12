/**
 * Redesign v3 (ADR-032 §10): /leaderboard and /ask pieces.
 * - League: zone groups and rules (pure), standings rows with "You" written and zone pills, the "Your place" box in
 *   words, the header crest, upcoming live mocks as a Timeline (IST), guests get a Log in button.
 * - Ask: one rail with the credits guide (ghost button) and recent chats as a list of buttons that reopen a chat;
 *   the composer keeps its radio pills and testids.
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LiveEvent } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  credits: { credits: null as unknown, aiAllowed: true, refresh: vi.fn(), setBalance: vi.fn(), openGuide: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  router: { push: vi.fn(), replace: vi.fn(), refresh: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../ai/CreditsProvider', () => ({ useCredits: () => h.credits, useOptionalCredits: () => h.credits }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('next/navigation', () => ({ useRouter: () => h.router, usePathname: () => '/leaderboard' }));

import { LeaderboardClient, liveEventItem } from '../leaderboard/LeaderboardClient';
import { leagueRules, WeeklyLeague, ZONE_LABELS, zoneGroups, zoneRows, type League } from '../leaderboard/WeeklyLeague';
import { AskClient } from '../ai/AskClient';

type Standing = League['standings'][number];

const member = { status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent: 'required' };
const st = (rank: number, zone: Standing['zone'], isMe = false): Standing => ({ rank, name: `Clever Otter ${100 + rank}`, avatar: null, xp: 500 - rank * 10, zone, isMe });

function league(standings: Standing[], over: Partial<NonNullable<League['league']>> = {}): League {
  return {
    status: 'active',
    scope: 'class',
    serverNow: '2026-11-13T06:30:00.000Z',
    week: { start: '2026-11-09', end: '2026-11-15', startsAt: '2026-11-08T18:30:00.000Z', endsAt: '2026-11-15T18:30:00.000Z' },
    cohort: { key: 'cbse-10', board: 'cbse', classLevel: 10 },
    league: { id: '9b2b6f6a-1c1d-4d3e-8f00-000000000001', tier: { level: 2, key: 'silver', name: 'Silver', icon: 'silver' }, division: 3, size: 20, capacity: 30, promotionPlaces: 2, relegationPlaces: 2, minXpToPromote: 50, isTopTier: false, isBottomTier: false, ...over },
    standings,
    me: standings.find((x) => x.isMe) ? { rank: standings.find((x) => x.isMe)!.rank, xp: standings.find((x) => x.isMe)!.xp, zone: standings.find((x) => x.isMe)!.zone } : null,
    lastWeek: null,
  } as League;
}

const STANDINGS = [st(1, 'promotion'), st(2, 'promotion'), st(3, 'safe', true), st(4, 'safe'), st(5, 'relegation')];

function liveEvent(over: Partial<LiveEvent> = {}): LiveEvent {
  return {
    id: 'ev1',
    title: 'Science full mock',
    phase: 'registration_open',
    subject: { id: 'cbse-10-science', name: 'Science' },
    testId: 't1',
    durationMin: 180,
    totalMarks: 80,
    registrationOpensAt: '2026-11-10T04:30:00.000Z',
    startsAt: '2026-11-15T04:30:00.000Z', // Sun 15 Nov, 10:00 IST
    lateStartUntil: '2026-11-15T05:00:00.000Z',
    endsAt: '2026-11-15T07:30:00.000Z',
    resultsPublishedAt: null,
    ranksBeta: true,
    me: { registered: true, attemptId: null, attemptStatus: null },
    ...over,
  } as LiveEvent;
}

beforeEach(() => {
  h.session.state = member;
  h.credits.credits = null;
  for (const fn of [...Object.values(h.api), ...Object.values(h.router), h.session.openLogin, h.credits.openGuide]) fn.mockReset();
});
afterEach(cleanup);

const wrap = (ui: React.ReactNode) => render(<ToastProvider>{ui}</ToastProvider>);

describe('league model', () => {
  it('zoneGroups follows zoneRows: one group per zone, a pill-less first group when the list starts outside promotion', () => {
    expect(zoneGroups(STANDINGS).map((g) => [g.zone, g.rows.map((r) => r.rank)])).toEqual([
      ['promotion', [1, 2]],
      ['safe', [3, 4]],
      ['relegation', [5]],
    ]);
    const noPromotion = [st(1, 'safe'), st(2, 'safe'), st(3, 'relegation')];
    expect(zoneRows(noPromotion)[0]).toMatchObject({ kind: 'row' });
    expect(zoneGroups(noPromotion).map((g) => g.zone)).toEqual([null, 'relegation']);
    expect(zoneGroups([])).toEqual([]);
  });

  it('leagueRules says the promotion and relegation places in words', () => {
    const L = league(STANDINGS).league!;
    expect(leagueRules(L)).toBe('Top 2 move up (at least 50 XP). Bottom 2 move down.');
    expect(leagueRules({ ...L, isTopTier: true, relegationPlaces: 0 })).toBe('Top tier: stay at the top.');
    expect(leagueRules({ ...L, promotionPlaces: 0, minXpToPromote: 0, relegationPlaces: 0 })).toBe('Promotion places open as more students join your division.');
  });

  it('an upcoming live mock becomes a Timeline item in India time with its status written', () => {
    const item = liveEventItem(liveEvent());
    expect(item).toMatchObject({ id: 'ev1', time: 'Sun', timeSub: '15 Nov', title: 'Science full mock', meta: '10:00 IST · 3 h · Science', href: '/tests/live/ev1', tint: 'green' });
    render(<>{item.status}</>);
    expect(screen.getByText('Registered')).toBeTruthy();
    cleanup();
    render(<>{liveEventItem(liveEvent({ me: null })).status}</>);
    expect(screen.getByText('Registration open')).toBeTruthy();
  });
});

describe('WeeklyLeague (v3)', () => {
  it('standings: "You" written on the own row (aria-current), zones as pills, the place box in words, a podium', () => {
    render(<WeeklyLeague league={league(STANDINGS)} now={Date.parse('2026-11-13T06:30:00.000Z')} />);
    const section = screen.getByTestId('weekly-league');
    expect(within(section).getByRole('heading', { level: 2 }).textContent).toContain('Silver league');
    expect(section.textContent).toContain('Week ends in 2d 12h.');
    const rows = screen.getAllByTestId('league-row');
    expect(rows).toHaveLength(5);
    const mine = rows.find((r) => r.getAttribute('aria-current') === 'true')!;
    expect(mine.textContent).toContain('You');
    expect(mine.textContent).toContain('Clever Otter 103');
    for (const z of ['promotion', 'safe', 'relegation'] as const) expect(screen.getByRole('list', { name: ZONE_LABELS[z] })).toBeTruthy();
    expect(screen.getByTestId('league-me').textContent).toMatch(/Your place.*Rank #3.*470 XP.*Safe zone/);
    expect(screen.getByRole('list', { name: 'Top three' }).querySelectorAll('li')).toHaveLength(3);
  });

  it('class required: a way to set the class; loading is busy', () => {
    const { unmount } = render(<WeeklyLeague league={{ ...league([]), status: 'class_required', league: null }} now={null} />);
    expect(within(screen.getByTestId('league-class-required')).getByRole('link', { name: 'Set my class' }).getAttribute('href')).toBe('/me');
    unmount();
    render(<WeeklyLeague league={null} now={null} />);
    expect(screen.getByLabelText('Loading your league').getAttribute('aria-busy')).toBe('true');
  });
});

describe('LeaderboardClient (v3)', () => {
  it('members: one h1 "Weekly league", the tier crest once the league loads, upcoming mocks in the rail', async () => {
    h.api.get.mockImplementation(async (p: string) => {
      if (p === '/v1/leagues/current') return league(STANDINGS);
      if (p === '/v1/live-events') return { events: [liveEvent()] };
      if (p === '/v1/me/attempts') return { attempts: [], nextCursor: null };
      throw new Error(p);
    });
    wrap(<LeaderboardClient />);
    expect(screen.getAllByRole('heading', { level: 1 }).map((x) => x.textContent)).toEqual(['Weekly league']);
    await waitFor(() => expect(screen.getByTestId('league-crest').textContent).toContain('Silver tier'));
    expect(screen.getByTestId('leaderboards')).toBeTruthy();
    const rail = screen.getByRole('complementary', { name: 'Live mocks and league rules' });
    await waitFor(() => expect(within(rail).getByRole('list', { name: 'Upcoming live mocks' }).textContent).toContain('Science full mock'));
    expect(within(rail).getByText('Registered')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /All-India mock ranks/ })).toBeTruthy();
  });

  it('guests: the h1, an explanation and a Log in button that opens the login sheet', () => {
    h.session.state = { status: 'guest' };
    wrap(<LeaderboardClient />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2, name: 'Log in to join your weekly league' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(h.session.openLogin).toHaveBeenCalledWith(expect.objectContaining({ returnTo: '/leaderboard' }));
    expect(h.api.get).not.toHaveBeenCalled();
  });
});

describe('AskClient (v3 layout)', () => {
  it('rail: credits guide (ghost button) and recent chats as buttons that reopen a chat; composer testids kept', async () => {
    h.credits.credits = { balance: 42, prices: [{ action: 'quick-doubt', credits: 1 }] };
    h.api.get.mockImplementation(async (p: string) => {
      if (p === '/v1/ai/conversations') return { conversations: [{ id: 'c1', title: 'Why iron rusts', createdAt: '2026-11-12T05:00:00.000Z', lastMessageAt: '2026-11-12T05:10:00.000Z' }], nextCursor: null };
      if (p === '/v1/ai/conversations/{id}') return { conversation: { id: 'c1' }, messages: [{ id: 'm1', role: 'user', content: 'Why does iron rust?' }, { id: 'm2', role: 'assistant', content: 'Think about water and air.' }] };
      throw new Error(p);
    });
    wrap(<AskClient />);
    expect(screen.getByTestId('ask-empty').textContent).toContain('What are you stuck on?');
    for (const name of [/^Quick doubt/, /^Step by step/, /^Photo of a question/]) expect(screen.getByRole('radio', { name })).toBeTruthy();
    expect(screen.getByTestId('ask-input')).toBeTruthy();
    expect(screen.getByTestId('ask-send').textContent).toContain('1 credit');

    const rail = screen.getByRole('complementary', { name: 'AI credits and recent chats' });
    expect(within(rail).getByTestId('ask-credits').textContent).toContain('42 credits');
    fireEvent.click(within(rail).getByRole('button', { name: 'What can I do with my credits?' }));
    expect(h.credits.openGuide).toHaveBeenCalled();

    const chats = await within(rail).findByRole('list', { name: 'Recent chats' });
    fireEvent.click(within(chats).getByRole('button', { name: /Why iron rusts/ }));
    await waitFor(() => expect(screen.getByTestId('thread').textContent).toContain('Think about water and air.'));
    expect(screen.queryByTestId('ask-empty')).toBeNull();
    expect(h.api.get).toHaveBeenCalledWith('/v1/ai/conversations/{id}', { params: { id: 'c1' } });
    expect(within(rail).getByTestId('new-chat')).toBeTruthy();
  });

  it('guests: a log-in card, no history request', () => {
    h.session.state = { status: 'guest' };
    wrap(<AskClient />);
    expect(screen.getByRole('heading', { level: 2, name: 'Log in to ask the AI tutor' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(h.session.openLogin).toHaveBeenCalled();
    expect(h.api.get).not.toHaveBeenCalled();
  });
});

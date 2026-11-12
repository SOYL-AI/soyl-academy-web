/**
 * Design language v3 (ADR-032) for /coins, /store and /plans: the view-models and the page structure the
 * restyle introduced (yellow balance card, ways to earn as a List, history as a table, the store's teaser grid
 * with rarity frames, plan Cards with the current plan as a pill, the "free forever" card, GST wording).
 */
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type CoinsSummary } from '@/platform/shared/api-client';
import { howToEarn } from '@/platform/shared/config/coins';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';
import { StageProvider } from '../shell/StageProvider';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  credits: { credits: null as unknown, aiAllowed: true, refresh: vi.fn(), setBalance: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../ai/CreditsProvider', () => ({ useCredits: () => h.credits, useOptionalCredits: () => h.credits }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }), usePathname: () => '/coins' }));

import { CoinsProvider } from '../coins/CoinsProvider';
import { CoinsClient, HowToEarn } from '../coins/CoinsClient';
import { StoreClient } from '../coins/StoreClient';
import { earnVisual, historyRow } from '../coins/coins-logic';
import { FEATURED_PLAN, FreeForever, PlansClient, planLook } from '../plans/PlansClient';

const member = () => ({ status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent: 'granted' });

function summary(): CoinsSummary {
  return {
    balance: 120,
    lifetimeEarned: 140,
    today: { day: '2026-10-28', earnedCapped: 6, cap: 40, remaining: 34, earnedTotal: 6, resetsAt: new Date(Date.now() + 5 * 3_600_000).toISOString() },
    checkIn: { checkedInToday: false, current: 6, longest: 9, coins: 0, nextBonus: null },
    solved: { count: 63, milestones: [{ solved: 50, coins: 20, reached: true }, { solved: 200, coins: 60, reached: false }], next: { solved: 200, coins: 60, reached: false } },
    chaptersMastered: 2,
    equipped: { frame: null, theme: null },
  };
}

function routeGets(map: Record<string, unknown>) {
  h.api.get.mockImplementation(async (path: string) => {
    if (path in map) return map[path];
    throw new ApiError(404, 'not_found', null);
  });
}

const wrap = (ui: ReactNode) =>
  render(
    <ToastProvider>
      <CoinsProvider>{ui}</CoinsProvider>
    </ToastProvider>,
  );

beforeEach(() => {
  h.session.state = member();
  for (const fn of Object.values(h.api)) fn.mockReset();
});
afterEach(() => cleanup());

const entry = (over: Record<string, unknown> = {}) => ({
  id: 'e1',
  kind: 'earn',
  source: 'checkin',
  amount: 1,
  balanceAfter: 1201,
  istDay: '2026-10-28',
  cappedOut: false,
  redemptionId: null,
  detail: {},
  createdAt: '2026-10-28T20:00:00.000Z',
  ...over,
});

describe('coins view-models', () => {
  it('historyRow writes the sign, the IST date, the cap note and the refund label', () => {
    const plus = historyRow(entry() as never);
    expect(plus).toMatchObject({ label: 'Daily check-in', amountText: '+1', tone: 'plus', balanceText: '1,201', note: null });
    // 20:00 UTC on 28 Oct is 29 Oct in India.
    expect(plus.date).toBe('29 Oct 2026');
    expect(historyRow(entry({ amount: -60, kind: 'redeem', source: 'redemption' }) as never)).toMatchObject({ amountText: '-60', tone: 'minus' });
    expect(historyRow(entry({ amount: 0, cappedOut: true }) as never)).toMatchObject({ amountText: '0', tone: 'zero', note: 'Daily limit reached' });
    expect(historyRow(entry({ kind: 'refund', source: 'redemption', amount: 60 }) as never).label).toBe('Coins returned');
  });

  it('every way to earn from the config has its own icon; unknown keys fall back to the coin', () => {
    for (const r of howToEarn()) expect(earnVisual(r.key).icon, r.key).not.toBe('coin');
    expect(earnVisual('something_new')).toEqual({ icon: 'coin', tint: 'yellow' });
  });
});

describe('/coins (v3)', () => {
  it('ways to earn: one list row per config source, the coins written, "Daily limit" as a pill on capped ones', () => {
    render(<HowToEarn />);
    const earn = screen.getByTestId('how-to-earn');
    expect(within(earn).getByRole('heading', { level: 2, name: 'Ways to earn' })).toBeTruthy();
    const list = within(earn).getByRole('list', { name: 'Ways to earn SOYL Coins' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(howToEarn().length);
    expect(within(list).getAllByText('Daily limit')).toHaveLength(howToEarn().filter((r) => r.capped).length);
    expect(earn.textContent).toContain('Check in once a day');
  });

  it('member: balance in a yellow card with the check-in and the store link; history as a table', async () => {
    routeGets({ '/v1/coins': summary(), '/v1/coins/history': { entries: [entry(), entry({ id: 'e2', source: 'redemption', kind: 'redeem', amount: -60 })], nextCursor: null } });
    wrap(<CoinsClient />);
    const balance = await screen.findByTestId('coins-balance');
    const hero = balance.closest('section')!;
    expect(hero.getAttribute('data-tint')).toBe('yellow');
    expect(within(hero).getByTestId('check-in-button')).toBeTruthy();
    expect(within(hero).getByTestId('store-link').getAttribute('href')).toBe('/store');
    await waitFor(() => expect(screen.getAllByTestId('coin-history-row')).toHaveLength(2));
    const rows = screen.getAllByTestId('coin-history-row');
    expect(rows[0]!.tagName).toBe('TR');
    expect(rows[0]!.getAttribute('data-source')).toBe('checkin');
    expect(within(screen.getByRole('table', { name: 'Coin history' })).getAllByRole('columnheader').map((c) => c.textContent)).toEqual(['What', 'Coins', 'Balance']);
    expect(rows[1]!.textContent).toContain('-60');
    expect(screen.getByTestId('coins-milestones').textContent).toContain('Reached');
  });

  it('junior stage: friendlier copy, same features', async () => {
    routeGets({ '/v1/coins': summary(), '/v1/coins/history': { entries: [], nextCursor: null } });
    render(
      <StageProvider stage="junior" classLevel={7} source="profile">
        <ToastProvider>
          <CoinsProvider>
            <CoinsClient />
          </CoinsProvider>
        </ToastProvider>
      </StageProvider>,
    );
    expect(await screen.findByText('Every coin here came from learning. Keep it up.')).toBeTruthy();
    expect(await screen.findByText('No coins yet: your first ones are one tap away')).toBeTruthy();
    expect(screen.getByTestId('check-in-button')).toBeTruthy();
  });
});

describe('/store (v3, redemption off: D-038)', () => {
  it('one h1 in the hero, three teasers in a labelled grid with rarity frames, no prices or redeem', async () => {
    routeGets({ '/v1/coins': summary(), '/v1/coins/store': { balance: 120, redemptionEnabled: false, physicalRedemptionEnabled: false, consentStatus: 'granted', verified: true, items: [] }, '/v1/coins/redemptions': { redemptions: [] } });
    wrap(<StoreClient />);
    expect(await screen.findByTestId('store-coming-soon')).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const grid = screen.getByRole('list', { name: 'Rewards coming soon' });
    const teasers = within(grid).getAllByTestId('store-teaser');
    expect(teasers.map((t) => t.getAttribute('data-rarity'))).toEqual(['epic', 'rare', 'legendary']);
    expect(screen.getByTestId('store-how-to-earn').getAttribute('href')).toBe('/coins');
    expect(screen.queryByRole('button', { name: /redeem/i })).toBeNull();
  });
});

describe('/plans (v3)', () => {
  const plans = (pricesIncludeGst: boolean) => ({
    billingEnabled: true,
    currency: 'INR',
    pricesIncludeGst,
    defaultPlaceOfSupply: '29',
    plans: [
      { id: 'free', name: 'Free', creditsPerDay: 25, features: ['ai_credits'], validUntil: null, order: 0, prices: [], purchasable: false },
      { id: 'plus', name: 'Plus', creditsPerDay: 40, features: ['ai_credits'], validUntil: null, order: 1, prices: [{ interval: 'monthly', amountPaise: 19900, label: '₹199/month' }], purchasable: true },
      { id: 'pro', name: 'Pro', creditsPerDay: 60, features: ['ai_credits', 'paper_from_upload'], validUntil: null, order: 2, prices: [{ interval: 'monthly', amountPaise: 29900, label: '₹299/month' }], purchasable: true },
    ],
  });
  const sub = (plan: string, planName: string) => ({ plan, planName, creditsPerDay: 40, source: 'subscription', validUntil: null, subscription: null, billingEnabled: true });

  it('plan looks are decorative and stable; the featured plan is Pro', () => {
    expect(FEATURED_PLAN).toBe('pro');
    expect(planLook('plus')).toEqual({ icon: 'sparkles', tint: 'blue' });
    expect(planLook('board_exam_pass').tint).toBe('yellow');
    expect(planLook('unknown').icon).toBe('sparkles');
  });

  it('the "free forever" card is a green card outside every plan card', async () => {
    h.session.state = { status: 'guest' };
    h.api.get.mockResolvedValue(plans(false));
    render(
      <ToastProvider>
        <PlansClient />
      </ToastProvider>,
    );
    const free = await screen.findByTestId('free-forever');
    expect(free.getAttribute('data-tint')).toBe('green');
    expect(within(free).getByRole('heading', { name: 'Learning and tests are free forever' })).toBeTruthy();
    expect(free.closest('[data-plan]')).toBeNull();
    // Guests have no "Your plan" pill.
    expect(screen.queryByText('Your plan')).toBeNull();
  });

  it('member on Plus: "Your plan" pill on the Plus card, Manage instead of Buy; one primary (Pro), GST never written when not registered', async () => {
    routeGets({ '/v1/plans': plans(false), '/v1/me/subscription': sub('plus', 'Plus') });
    render(
      <ToastProvider>
        <PlansClient />
      </ToastProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('current-plan').textContent).toContain('Plus'));
    const plus = document.querySelector('[data-plan="plus"]') as HTMLElement;
    expect(within(plus).getByText('Your plan')).toBeTruthy();
    expect(within(plus).queryByTestId('buy-plus')).toBeNull();
    expect(within(plus).getByRole('link', { name: 'Manage your plan' }).getAttribute('href')).toBe('/me#subscription');
    expect(screen.getByTestId('buy-pro').className).toMatch(/primary/);
    expect(screen.getByTestId('plans').textContent).not.toMatch(/GST/);
    for (const card of Array.from(document.querySelectorAll('[data-plan]'))) expect(card.tagName).toBe('LI');
  });

  it('GST-registered: "incl. GST" stays inside the price', async () => {
    h.session.state = { status: 'guest' };
    h.api.get.mockResolvedValue(plans(true));
    render(
      <ToastProvider>
        <PlansClient />
      </ToastProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('price-plus').textContent).toBe('₹199/month incl. GST'));
  });

  it('FreeForever follows the stage for its words only', () => {
    render(
      <StageProvider stage="senior" classLevel={12} source="profile">
        <FreeForever />
      </StageProvider>,
    );
    expect(screen.getByTestId('free-forever').textContent).toContain('every test stay free on every plan');
  });
});

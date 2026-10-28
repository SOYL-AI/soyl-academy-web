import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type CoinsSummary, type CoinStore, type CoinStoreItem, type DailyChallenge, type StudentQuestion } from '@/platform/shared/api-client';
import { howToEarn } from '@/platform/shared/config/coins';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }), usePathname: () => '/coins' }));

import { CoinsProvider } from '../coins/CoinsProvider';
import { CoinChip } from '../coins/CoinChip';
import { CheckIn } from '../coins/CheckIn';
import { CoinsClient } from '../coins/CoinsClient';
import { StoreClient } from '../coins/StoreClient';
import { DailyChallengeCard } from '../coins/DailyChallengeCard';
import { usePracticeAnswer } from '../practice/usePracticeAnswer';

const member = () => ({ status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent: 'granted' });
const RID = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

function summary(over: Partial<CoinsSummary> = {}): CoinsSummary {
  return {
    balance: 120,
    lifetimeEarned: 140,
    today: { day: '2026-10-28', earnedCapped: 6, cap: 40, remaining: 34, earnedTotal: 26, resetsAt: new Date(Date.now() + 5 * 3_600_000).toISOString() },
    checkIn: { checkedInToday: false, current: 6, longest: 9, coins: 0, nextBonus: { everyDays: 7, coins: 5, inDays: 1 } },
    solved: {
      count: 63,
      milestones: [
        { solved: 50, coins: 20, reached: true },
        { solved: 200, coins: 60, reached: false },
      ],
      next: { solved: 200, coins: 60, reached: false },
    },
    chaptersMastered: 2,
    equipped: { frame: null, theme: null },
    ...over,
  };
}

function item(key: string, over: Partial<CoinStoreItem> = {}): CoinStoreItem {
  return {
    key,
    name: key,
    description: `About ${key}`,
    image: key,
    type: 'digital',
    slot: 'frame',
    priceCoins: 60,
    stock: null,
    remaining: null,
    availableFrom: null,
    availableUntil: null,
    eligibilityLabel: null,
    eligible: null,
    owned: 0,
    maxPerUser: 1,
    state: 'available',
    ...over,
  };
}

function store(items: CoinStoreItem[], over: Partial<CoinStore> = {}): CoinStore {
  return { balance: 120, redemptionEnabled: true, physicalRedemptionEnabled: false, consentStatus: 'granted', verified: true, items, ...over };
}

/** GET routing for the mocked client. */
function routeGets(map: Record<string, unknown>) {
  h.api.get.mockImplementation(async (path: string) => {
    if (path in map) {
      const v = map[path];
      if (v instanceof Error) throw v;
      return typeof v === 'function' ? (v as () => unknown)() : v;
    }
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
  h.session.openLogin.mockReset();
  for (const fn of Object.values(h.api)) fn.mockReset();
});
afterEach(() => cleanup());

describe('coin chip and check-in', () => {
  it('chip shows the balance, links to /coins and marks an open check-in', async () => {
    routeGets({ '/v1/coins': summary() });
    wrap(<CoinChip />);
    const chip = await screen.findByTestId('coin-chip');
    expect(chip.getAttribute('href')).toBe('/coins');
    expect(chip.getAttribute('data-balance')).toBe('120');
    expect(chip.textContent).toContain('120 coins, daily check-in open, SOYL Coins');
  });
  it('guests have no chip and no coins call', () => {
    h.session.state = { status: 'guest' };
    wrap(<CoinChip />);
    expect(screen.queryByTestId('coin-chip')).toBeNull();
    expect(h.api.get).not.toHaveBeenCalled();
  });
  it('check-in pays once, announces the bonus and disables the button', async () => {
    let checked = false;
    routeGets({ '/v1/coins': () => (checked ? summary({ balance: 126, checkIn: { checkedInToday: true, current: 7, longest: 9, coins: 6, nextBonus: { everyDays: 7, coins: 5, inDays: 7 } } }) : summary()) });
    h.api.post.mockImplementation(async () => {
      checked = true;
      return {
        day: '2026-10-28',
        alreadyCheckedIn: false,
        streak: 7,
        longest: 9,
        coinsAwarded: 6,
        awards: [
          { source: 'checkin', amount: 1, cappedOut: false },
          { source: 'checkin_streak', amount: 5, cappedOut: false },
        ],
        balance: 126,
      };
    });
    wrap(
      <>
        <CoinChip />
        <CheckIn />
      </>,
    );
    const button = await screen.findByTestId('check-in-button');
    expect(button.textContent).toContain('Check in (+1 coin)');
    expect(screen.getByText('Check in today for a +5 coins streak bonus.')).toBeTruthy();
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId('check-in-result').textContent).toBe('+1 coin: daily check-in · +5 coins: check-in streak bonus'));
    expect(h.api.post).toHaveBeenCalledWith('/v1/coins/check-in', { body: {} });
    expect(screen.getByTestId('check-in-result').getAttribute('aria-live')).toBe('polite');
    expect((screen.getByTestId('check-in-button') as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByTestId('check-in-button').textContent).toContain('Checked in today');
    expect(screen.getByTestId('check-in-streak').textContent).toContain('7-day streak · best 9');
    expect(screen.getByTestId('coin-chip').getAttribute('data-balance')).toBe('126');
  });
  it('already checked in: disabled from the start', async () => {
    routeGets({ '/v1/coins': summary({ checkIn: { checkedInToday: true, current: 3, longest: 3, coins: 1, nextBonus: { everyDays: 7, coins: 5, inDays: 4 } } }) });
    wrap(<CheckIn />);
    const button = await screen.findByTestId('check-in-button');
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByText('+5 coins streak bonus in 4 check-ins.')).toBeTruthy();
  });
});

describe('/coins', () => {
  it('guest: log in prompt and how to earn from the config', async () => {
    h.session.state = { status: 'guest' };
    wrap(<CoinsClient />);
    expect(screen.getByRole('heading', { name: 'Log in to earn SOYL Coins' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(h.session.openLogin).toHaveBeenCalled();
    const earn = screen.getByTestId('how-to-earn');
    expect(within(earn).getAllByRole('listitem')).toHaveLength(howToEarn().length);
    expect(earn.textContent).toContain('Solve the daily challenge');
  });
  it('member: balance, today against the cap, milestones and paged history', async () => {
    const entry = (id: string, source: string, amount: number) => ({
      id,
      kind: amount < 0 ? 'redeem' : 'earn',
      source,
      amount,
      balanceAfter: 100,
      istDay: '2026-10-28',
      cappedOut: false,
      redemptionId: null,
      detail: {},
      createdAt: '2026-10-28T06:00:00.000Z',
    });
    let page = 0;
    routeGets({
      '/v1/coins': summary(),
      '/v1/coins/history': () => {
        page += 1;
        return page === 1
          ? { entries: [entry('e1aaaaaa-0000-4000-8000-000000000001', 'daily_challenge', 5), entry('e1aaaaaa-0000-4000-8000-000000000002', 'redemption', -60)], nextCursor: 'c2' }
          : { entries: [entry('e1aaaaaa-0000-4000-8000-000000000003', 'checkin', 1)], nextCursor: null };
      },
    });
    wrap(<CoinsClient />);
    expect((await screen.findByTestId('coins-balance')).getAttribute('data-balance')).toBe('120');
    expect(screen.getByRole('progressbar', { name: 'Coins from daily sources' }).getAttribute('aria-valuetext')).toBe('6 of 40');
    expect(screen.getByTestId('coins-today').textContent).toContain('34 coins left from daily sources today.');
    expect(screen.getByTestId('coins-milestones').textContent).toContain('63');
    await waitFor(() => expect(screen.getAllByTestId('coin-history-row')).toHaveLength(2));
    expect(screen.getAllByTestId('coin-history-row')[0]!.textContent).toContain('Daily challenge');
    expect(screen.getAllByTestId('coin-history-row')[1]!.textContent).toContain('-60');
    fireEvent.click(screen.getByTestId('history-more'));
    await waitFor(() => expect(screen.getAllByTestId('coin-history-row')).toHaveLength(3));
    expect(h.api.get).toHaveBeenCalledWith('/v1/coins/history', { query: { limit: 20, cursor: 'c2' } });
    expect(screen.queryByTestId('history-more')).toBeNull();
  });
});

describe('/store while redemption is off (D-038, the launch default)', () => {
  it('member: "Exclusive rewards — coming soon", how to earn, no items, prices, redeem or equip', async () => {
    routeGets({ '/v1/coins': summary(), '/v1/coins/redemptions': { redemptions: [] }, '/v1/coins/store': store([], { redemptionEnabled: false }) });
    wrap(<StoreClient />);
    expect(await screen.findByTestId('store-coming-soon')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Exclusive rewards — coming soon');
    expect(screen.getByTestId('store').getAttribute('data-redemption')).toBe('off');
    expect(screen.getByText(/Our merch is being designed now/)).toBeTruthy();
    expect(screen.getAllByTestId('store-teaser')).toHaveLength(3);
    expect(screen.getByTestId('store-how-to-earn').getAttribute('href')).toBe('/coins');
    expect(screen.getByText('Solve the daily challenge')).toBeTruthy();
    await waitFor(() => expect(screen.getByTestId('store-balance').textContent).toContain('120'));
    for (const id of ['store-item', 'redeem', 'equip', 'my-redemptions', 'address-form']) expect(screen.queryByTestId(id), id).toBeNull();
    expect(screen.queryByRole('button', { name: /redeem/i })).toBeNull();
  });
  it('guest: coming soon with a log-in call to action', async () => {
    h.session.state = { status: 'guest' };
    routeGets({ '/v1/coins/store': store([], { redemptionEnabled: false, balance: null, consentStatus: null, verified: null }) });
    wrap(<StoreClient />);
    expect(await screen.findByTestId('store-coming-soon')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Log in to start earning' }));
    expect(h.session.openLogin).toHaveBeenCalled();
    expect(screen.queryByTestId('store-item')).toBeNull();
  });
  it('earlier redemptions stay visible (and cancellable) after the switch is turned off', async () => {
    const order = { id: RID, itemKey: 'sticker-pack', itemName: 'SOYL sticker pack', itemType: 'physical', priceCoins: 600, status: 'parent_approval_pending', statusReason: null, addressOnFile: true, trackingRef: null, createdAt: '2026-10-28T06:00:00.000Z', updatedAt: '2026-10-28T06:00:00.000Z' };
    routeGets({ '/v1/coins': summary(), '/v1/coins/redemptions': { redemptions: [order] }, '/v1/coins/store': store([], { redemptionEnabled: false }) });
    wrap(<StoreClient />);
    expect(await screen.findByTestId('redemption')).toBeTruthy();
    expect(screen.getByTestId('cancel-redemption')).toBeTruthy();
  });
});

describe('/store with redemption switched on (behind COINS_REDEMPTION_ENABLED)', () => {
  it('guest: items with log in to redeem, merch coming soon', async () => {
    h.session.state = { status: 'guest' };
    routeGets({ '/v1/coins/store': store([item('frame-saffron', { state: 'sign_in' }), item('hoodie', { type: 'physical', slot: null, priceCoins: 7500, state: 'coming_soon' })], { balance: null, consentStatus: null, verified: null }) });
    wrap(<StoreClient />);
    const cards = await screen.findAllByTestId('store-item');
    expect(cards).toHaveLength(2);
    expect(within(cards[0]!).getByRole('button', { name: 'Log in to redeem' })).toBeTruthy();
    expect(within(cards[1]!).getByTestId('item-state').textContent).toBe('Coming soon');
    expect(screen.getByTestId('merch-coming-soon')).toBeTruthy();
    expect(screen.queryByTestId('my-redemptions')).toBeNull();
  });

  it('locked, limited-drop, stock and consent/verification states are explained', async () => {
    routeGets({
      '/v1/coins': summary(),
      '/v1/coins/redemptions': { redemptions: [] },
      '/v1/coins/store': store(
        [
          item('frame-constellation', { state: 'locked', eligibilityLabel: 'Solve 200 practice questions', eligible: false }),
          item('topper-jacket', { type: 'physical', slot: null, state: 'upcoming', stock: 100, remaining: 37, availableFrom: new Date(Date.now() + 3 * 86_400_000 + 90 * 60_000).toISOString(), availableUntil: new Date(Date.now() + 90 * 86_400_000).toISOString() }),
          item('notebook', { type: 'physical', slot: null, state: 'consent_needed' }),
          item('bottle', { type: 'physical', slot: null, state: 'verification_needed' }),
        ],
        { physicalRedemptionEnabled: true, consentStatus: 'required' },
      ),
    });
    wrap(<StoreClient />);
    const [locked, drop, consent, verify] = await screen.findAllByTestId('store-item');
    expect(locked!.textContent).toContain('Locked');
    expect(within(locked!).getByTestId('item-note').textContent).toBe('Unlock: Solve 200 practice questions.');
    expect(within(drop!).getByTestId('stock').textContent).toBe('37 of 100 left');
    await waitFor(() => expect(within(drop!).getByTestId('drop-countdown').textContent).toContain('Drops in 3d 1h'));
    expect(within(consent!).getByRole('link', { name: 'Parent approval needed' }).getAttribute('href')).toBe('/me');
    expect(within(consent!).getByTestId('item-note').textContent).toContain('A parent or guardian must approve');
    expect(within(verify!).getByRole('link', { name: 'Verify to redeem' }).getAttribute('href')).toBe('/me');
    expect(screen.getByTestId('merch-consent')).toBeTruthy();
  });

  it('digital: confirm → redeem → unlocked toast → equip', async () => {
    let owned = false;
    routeGets({
      '/v1/coins': () => summary({ balance: owned ? 60 : 120, equipped: { frame: null, theme: null } }),
      '/v1/coins/redemptions': { redemptions: [] },
      '/v1/coins/store': () => store([item('frame-saffron', { state: owned ? 'owned' : 'available', owned: owned ? 1 : 0 })]),
    });
    h.api.post.mockImplementation(async () => {
      owned = true;
      return { redemption: { id: RID, itemKey: 'frame-saffron', itemName: 'frame-saffron', itemType: 'digital', priceCoins: 60, status: 'fulfilled', statusReason: null, addressOnFile: false, trackingRef: null, createdAt: '2026-10-28T06:00:00.000Z', updatedAt: '2026-10-28T06:00:00.000Z' }, balance: 60 };
    });
    h.api.put.mockResolvedValue({ frame: 'frame-saffron', theme: null });
    wrap(<StoreClient />);
    fireEvent.click(await screen.findByTestId('redeem'));
    const dialog = await screen.findByRole('dialog', { name: 'Redeem frame-saffron?' });
    expect(dialog.textContent).toContain('Balance after: 60 coins.');
    fireEvent.click(within(dialog).getByTestId('confirm-redeem'));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/coins/redeem', { body: { itemKey: 'frame-saffron' } }));
    expect(await screen.findByText('Unlocked: frame-saffron')).toBeTruthy();
    const equip = await screen.findByTestId('equip');
    fireEvent.click(equip);
    await waitFor(() => expect(h.api.put).toHaveBeenCalledWith('/v1/coins/equipped', { body: { frame: 'frame-saffron' } }));
  });

  it('redeem refusal shows friendly copy in the dialog', async () => {
    routeGets({ '/v1/coins': summary(), '/v1/coins/redemptions': { redemptions: [] }, '/v1/coins/store': store([item('frame-saffron')]) });
    h.api.post.mockRejectedValue(new ApiError(409, 'out_of_stock', { type: 'x', title: 'Out', status: 409, code: 'out_of_stock', traceId: 't' }));
    wrap(<StoreClient />);
    fireEvent.click(await screen.findByTestId('redeem'));
    fireEvent.click(await screen.findByTestId('confirm-redeem'));
    expect((await screen.findByTestId('redeem-error')).textContent).toContain('sold out');
  });

  it('physical: the address form appears only after the API creates a requested redemption; validated; then cancel', async () => {
    const requested = { id: RID, itemKey: 'sticker-pack', itemName: 'SOYL sticker pack', itemType: 'physical', priceCoins: 600, status: 'requested', statusReason: null, addressOnFile: false, trackingRef: null, createdAt: '2026-10-28T06:00:00.000Z', updatedAt: '2026-10-28T06:00:00.000Z' };
    let orders: unknown[] = [];
    routeGets({
      '/v1/coins': summary({ balance: 700 }),
      '/v1/coins/redemptions': () => ({ redemptions: orders }),
      '/v1/coins/store': store([item('sticker-pack', { type: 'physical', slot: null, priceCoins: 600, name: 'SOYL sticker pack', maxPerUser: 2 })], { physicalRedemptionEnabled: true }),
    });
    h.api.post.mockImplementation(async (path: string) => {
      if (path === '/v1/coins/redeem') {
        orders = [requested];
        return { redemption: requested, balance: 100 };
      }
      orders = [{ ...requested, status: 'cancelled', addressOnFile: false }];
      return { ...requested, status: 'cancelled' };
    });
    h.api.put.mockImplementation(async () => {
      orders = [{ ...requested, status: 'parent_approval_pending', addressOnFile: true }];
      return orders[0];
    });
    wrap(<StoreClient />);
    expect(screen.queryByTestId('address-form')).toBeNull();
    fireEvent.click(await screen.findByTestId('redeem'));
    const confirm = await screen.findByRole('dialog', { name: 'Redeem SOYL sticker pack?' });
    expect(confirm.textContent).toContain('A parent or guardian approves the order');
    fireEvent.click(within(confirm).getByTestId('confirm-redeem'));
    const form = await screen.findByTestId('address-form');
    // Invalid first: nothing is sent.
    fireEvent.click(within(form).getByTestId('address-submit'));
    expect(await within(form).findByText('Please check the highlighted fields.')).toBeTruthy();
    expect(h.api.put).not.toHaveBeenCalled();
    fireEvent.change(within(form).getByLabelText(/Recipient’s name/), { target: { value: 'Asha Rao' } });
    fireEvent.change(within(form).getByLabelText(/Address line 1/), { target: { value: '12 MG Road' } });
    fireEvent.change(within(form).getByLabelText(/City or town/), { target: { value: 'Bengaluru' } });
    fireEvent.change(within(form).getByLabelText(/State or union territory/), { target: { value: 'Karnataka' } });
    fireEvent.change(within(form).getByLabelText(/PIN code/), { target: { value: '560001' } });
    fireEvent.change(within(form).getByLabelText(/Mobile number for the courier/), { target: { value: '98765 43210' } });
    fireEvent.click(within(form).getByTestId('address-submit'));
    await waitFor(() =>
      expect(h.api.put).toHaveBeenCalledWith('/v1/coins/redemptions/{id}/address', {
        params: { id: RID },
        body: { recipientName: 'Asha Rao', line1: '12 MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', phone: '+919876543210' },
      }),
    );
    await waitFor(() => expect(screen.queryByTestId('address-form')).toBeNull());
    const order = await screen.findByTestId('redemption');
    await waitFor(() => expect(screen.getByTestId('redemption').getAttribute('data-status')).toBe('parent_approval_pending'));
    expect(order.textContent).toContain('Waiting for approval');
    fireEvent.click(within(screen.getByTestId('redemption')).getByTestId('cancel-redemption'));
    fireEvent.click(await screen.findByTestId('confirm-cancel'));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/coins/redemptions/{id}/cancel', { params: { id: RID }, body: {} }));
    expect(await screen.findByText('Order cancelled')).toBeTruthy();
  });
});

const q = (id: string, type = 'mcq'): StudentQuestion =>
  ({ id, type, objective: true, stem_md: `Stem ${id}`, options: [{ id: 'a', text_md: 'Alpha' }, { id: 'b', text_md: 'Beta' }], match_right: [], marks: 1, assets: [], version: 1, difficulty: 2, expected_time_sec: 30, topic_ids: [], children: [] }) as StudentQuestion;

function challenge(over: Partial<DailyChallenge> = {}): DailyChallenge {
  return {
    day: '2026-10-28',
    resetsAt: new Date(Date.now() + 3_600_000).toISOString(),
    coins: 5,
    awardsPerDay: 1,
    earnedToday: 0,
    board: 'cbse',
    classLevel: 10,
    status: 'ok',
    challenges: [
      { subjectId: 'cbse-10-science', subjectName: 'Science', chapterId: 'cbse-10-science-ch01', chapterTitle: 'Chemical Reactions', question: q('q-sci'), solved: false },
      { subjectId: 'cbse-10-maths', subjectName: 'Mathematics', chapterId: 'cbse-10-maths-ch01', chapterTitle: 'Real Numbers', question: q('q-math', 'numerical'), solved: true },
    ],
    ...over,
  };
}

describe('daily challenge card', () => {
  it('guest: sees the challenges and "Log in to earn coins"', async () => {
    h.session.state = { status: 'guest' };
    routeGets({ '/v1/coins/daily-challenge': challenge({ earnedToday: null }) });
    wrap(<DailyChallengeCard board="cbse" classLevel={10} />);
    expect(await screen.findByTestId('daily-challenge')).toBeTruthy();
    expect(h.api.get).toHaveBeenCalledWith('/v1/coins/daily-challenge', { query: { board: 'cbse', class: 10 } });
    expect(screen.getAllByTestId('challenge-item')).toHaveLength(2);
    fireEvent.click(screen.getByTestId('challenge-login'));
    expect(h.session.openLogin).toHaveBeenCalled();
    expect(screen.getByTestId('challenge-status').textContent).toContain('Log in to earn coins');
  });
  it('no class known: renders nothing', async () => {
    h.session.state = { status: 'guest' };
    routeGets({ '/v1/coins/daily-challenge': challenge({ status: 'class_required', board: null, classLevel: null, challenges: [] }) });
    const { container } = wrap(<DailyChallengeCard />);
    await waitFor(() => expect(h.api.get).toHaveBeenCalledWith('/v1/coins/daily-challenge', { query: {} }));
    expect(container.querySelector('[data-testid="daily-challenge"]')).toBeNull();
  });
  it('member: solved state, check-in, earned-today message', async () => {
    routeGets({ '/v1/coins': summary(), '/v1/coins/daily-challenge': challenge({ earnedToday: 1 }) });
    wrap(<DailyChallengeCard board="cbse" classLevel={10} />);
    const card = await screen.findByTestId('daily-challenge');
    expect(card.getAttribute('data-earned')).toBe('true');
    const [sci, maths] = screen.getAllByTestId('challenge-item');
    expect(sci!.getAttribute('data-solved')).toBe('false');
    expect(maths!.getAttribute('data-solved')).toBe('true');
    expect(within(sci!).getByRole('button', { name: 'Solve: Science daily challenge' })).toBeTruthy();
    expect(await screen.findByTestId('check-in-button')).toBeTruthy();
    expect(screen.getByTestId('challenge-status').textContent).toContain('You earned today’s challenge coins.');
  });
});

describe('practice answers announce coins', () => {
  function Probe() {
    const p = usePracticeAnswer('cbse-10-science-ch01');
    return (
      <button type="button" onClick={() => void p.submit(q('q-sci'), { option_ids: ['b'] } as never)}>
        answer
      </button>
    );
  }
  it('a daily-challenge award shows a toast and bumps the chip', async () => {
    let calls = 0;
    routeGets({ '/v1/coins': () => summary({ balance: calls++ === 0 ? 120 : 125 }) });
    h.api.post.mockResolvedValue({ stored: true, correct: true, badgesAwarded: [], xpAwarded: 0, coinsAwarded: 5, coinAwards: [{ source: 'daily_challenge', amount: 5, cappedOut: false }] });
    wrap(
      <>
        <CoinChip />
        <Probe />
      </>,
    );
    await screen.findByTestId('coin-chip');
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'answer' }));
    });
    expect(await screen.findByText('SOYL Coins earned')).toBeTruthy();
    expect(screen.getByText('+5 coins: daily challenge')).toBeTruthy();
    expect(screen.getByTestId('coin-chip').getAttribute('data-balance')).toBe('125');
  });
});

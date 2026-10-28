import { describe, expect, it, vi } from 'vitest';
import { ApiError, type CoinStoreItem, type StoreItemState } from '@/platform/shared/api-client';
import { COIN_LEDGER_SOURCES, INDIA_STATES } from '@/platform/shared/config/coins';
import { announceCoins } from '../coins/announce';
import {
  canCancel,
  challengeLang,
  coinsProblemMessage,
  coinsText,
  dropLine,
  EMPTY_ADDRESS,
  formatSpan,
  needsAddress,
  REDEMPTION_STATUS_LABELS,
  SOURCE_LABELS,
  stateCopy,
  summariseAwards,
  validateAddress,
} from '../coins/coins-logic';

const problem = (code: string, status = 409) => new ApiError(status, code, { type: 'x', title: 't', status, code, traceId: 'tr' });

describe('award notes (ADR-021)', () => {
  it('sums paid awards and names their sources', () => {
    const r = summariseAwards([
      { source: 'daily_challenge', amount: 5, cappedOut: false },
      { source: 'solved_milestone', amount: 20, cappedOut: false },
    ]);
    expect(r).toEqual({ total: 25, text: '+5 coins: daily challenge · +20 coins: practice milestone', capped: false });
  });
  it('a capped-out award pays nothing but is reported', () => {
    expect(summariseAwards([{ source: 'test_submitted', amount: 0, cappedOut: true }])).toEqual({ total: 0, text: null, capped: true });
    expect(summariseAwards([{ source: 'checkin', amount: 1, cappedOut: false }]).text).toBe('+1 coin: daily check-in');
    expect(summariseAwards(undefined)).toEqual({ total: 0, text: null, capped: false });
  });
  it('every ledger source has a label', () => {
    for (const src of COIN_LEDGER_SOURCES) expect(SOURCE_LABELS[src], src).toBeTruthy();
  });
  it('coinsText pluralises and groups Indian style', () => {
    expect(coinsText(1)).toBe('1 coin');
    expect(coinsText(7500)).toBe('7,500 coins');
    expect(coinsText(150000)).toBe('1,50,000 coins');
  });
  it('announceCoins: toast + chip for paid coins, a cap note for 0, silence otherwise', () => {
    const toast = { show: vi.fn(() => 1) };
    const coins = { addEarned: vi.fn() };
    announceCoins(5, [{ source: 'daily_challenge', amount: 5, cappedOut: false }], toast, coins);
    expect(coins.addEarned).toHaveBeenCalledWith(5);
    expect(toast.show).toHaveBeenLastCalledWith(expect.objectContaining({ title: 'SOYL Coins earned', description: '+5 coins: daily challenge', tone: 'success' }));
    announceCoins(0, [{ source: 'daily_challenge', amount: 0, cappedOut: true }], toast, coins);
    expect(toast.show).toHaveBeenLastCalledWith(expect.objectContaining({ title: 'Today’s coin limit reached' }));
    toast.show.mockClear();
    announceCoins(0, [], toast, null);
    expect(toast.show).not.toHaveBeenCalled();
  });
});

describe('problem copy', () => {
  it.each([
    ['coins_insufficient', 'enough coins'],
    ['item_unavailable', 'Limited drops'],
    ['out_of_stock', 'sold out'],
    ['redemption_limit', 'already redeemed'],
    ['not_eligible', 'achievement'],
    ['verification_required', 'Verify your email or phone'],
    ['consent_required', 'parent or guardian'],
    ['consent_unavailable', 'parent approval right now'],
    ['redemption_disabled', 'opens soon'],
  ])('%s', (code, text) => {
    expect(coinsProblemMessage(problem(code))).toContain(text);
  });
  it('falls back to the shared messages and never shows server text', () => {
    expect(coinsProblemMessage(new ApiError(0, 'network_error', null))).toContain('could not reach');
    expect(coinsProblemMessage(new Error('SQL boom'))).toBe('Something went wrong. Please try again.');
  });
});

describe('store item states', () => {
  const item = (state: StoreItemState, over: Partial<CoinStoreItem> = {}) => ({ state, type: 'physical' as const, eligibilityLabel: null, priceCoins: 600, ...over });
  it('maps every state to a label and an action', () => {
    const states: StoreItemState[] = ['available', 'sign_in', 'insufficient_coins', 'locked', 'owned', 'limit_reached', 'sold_out', 'upcoming', 'ended', 'coming_soon', 'verification_needed', 'consent_needed'];
    for (const st of states) expect(stateCopy(item(st), 0).label, st).toBeTruthy();
    expect(stateCopy(item('available'), 700).action).toBe('redeem');
    expect(stateCopy(item('sign_in'), null).action).toBe('sign_in');
    expect(stateCopy(item('consent_needed'), 700)).toMatchObject({ action: 'consent', label: 'Parent approval needed' });
    expect(stateCopy(item('verification_needed'), 700).action).toBe('verify');
    expect(stateCopy(item('coming_soon'), 700)).toMatchObject({ label: 'Coming soon', action: 'none' });
    expect(stateCopy(item('owned', { type: 'digital' }), 0).action).toBe('equip');
    expect(stateCopy(item('owned'), 0).action).toBe('none');
  });
  it('explains what is missing', () => {
    expect(stateCopy(item('insufficient_coins'), 450).note).toBe('150 coins to go.');
    expect(stateCopy(item('locked', { eligibilityLabel: 'Solve 200 practice questions' }), 0).note).toBe('Unlock: Solve 200 practice questions.');
  });
});

describe('time', () => {
  it('formatSpan', () => {
    expect(formatSpan(0)).toBe('0m');
    expect(formatSpan(30_000)).toBe('<1m');
    expect(formatSpan(12 * 60_000)).toBe('12m');
    expect(formatSpan((5 * 60 + 12) * 60_000)).toBe('5h 12m');
    expect(formatSpan((3 * 24 + 4) * 3_600_000)).toBe('3d 4h');
  });
  it('dropLine: before, during and after a limited drop', () => {
    const drop = { availableFrom: '2027-01-01T00:00:00.000Z', availableUntil: '2027-03-31T18:29:59.000Z' };
    expect(dropLine(drop, Date.parse('2026-12-29T20:00:00.000Z'))).toBe('Drops in 2d 4h');
    expect(dropLine(drop, Date.parse('2027-03-31T13:29:59.000Z'))).toBe('Ends in 5h 0m');
    expect(dropLine(drop, Date.parse('2027-04-02T00:00:00.000Z'))).toBe('Drop ended');
    expect(dropLine({ availableFrom: null, availableUntil: null }, Date.now())).toBeNull();
  });
});

describe('redemptions', () => {
  it('cancel before approval only; address only while requested', () => {
    expect(canCancel({ itemType: 'physical', status: 'requested' })).toBe(true);
    expect(canCancel({ itemType: 'physical', status: 'parent_approval_pending' })).toBe(true);
    expect(canCancel({ itemType: 'physical', status: 'approved' })).toBe(false);
    expect(canCancel({ itemType: 'digital', status: 'fulfilled' })).toBe(false);
    expect(needsAddress({ itemType: 'physical', status: 'requested', addressOnFile: false })).toBe(true);
    expect(needsAddress({ itemType: 'physical', status: 'parent_approval_pending', addressOnFile: true })).toBe(false);
    for (const k of Object.keys(REDEMPTION_STATUS_LABELS)) expect(REDEMPTION_STATUS_LABELS[k as keyof typeof REDEMPTION_STATUS_LABELS]).toBeTruthy();
  });
});

describe('shipping address (mirrors the API schema)', () => {
  const good = { recipientName: ' Asha Rao ', line1: '12 MG Road', line2: '', city: 'Bengaluru', state: 'Karnataka', pincode: '560 001', phone: '098765 43210' };
  it('accepts and normalises a valid address', () => {
    const r = validateAddress(good);
    expect(r.errors).toEqual({});
    expect(r.value).toEqual({ recipientName: 'Asha Rao', line1: '12 MG Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', phone: '+919876543210' });
  });
  it('keeps line 2 when given', () => {
    expect(validateAddress({ ...good, line2: 'Near the park' }).value?.line2).toBe('Near the park');
  });
  it('refuses what the API refuses', () => {
    const r = validateAddress({ ...EMPTY_ADDRESS, line1: '<script>', city: 'x'.repeat(61), state: 'Atlantis', pincode: '012345', phone: '+15551234567', line2: '{x}' });
    expect(r.value).toBeNull();
    expect(Object.keys(r.errors).sort()).toEqual(['city', 'line1', 'line2', 'phone', 'pincode', 'recipientName', 'state']);
    expect(validateAddress({ ...good, phone: '5550001234' }).errors.phone).toBeTruthy(); // the API's mobile rule: 6–9 first digit
    expect(validateAddress({ ...good, pincode: '56000' }).errors.pincode).toBe('A 6-digit PIN code.');
  });
  it('accepts every state in the config', () => {
    for (const st of INDIA_STATES) expect(validateAddress({ ...good, state: st }).errors.state).toBeUndefined();
  });
});

describe('daily challenge language', () => {
  it('Hindi subjects render as hi', () => {
    expect(challengeLang('cbse-10-hindi-a')).toBe('hi');
    expect(challengeLang('isc-12-hindi')).toBe('hi');
    expect(challengeLang('cbse-10-science')).toBeUndefined();
  });
});

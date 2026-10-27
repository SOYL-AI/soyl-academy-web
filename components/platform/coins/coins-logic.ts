/**
 * SOYL Coins (D-037, ADR-020): pure helpers for the coins chip, /coins, /store and award notes.
 * Every number comes from the API or `platform/shared/config/coins.ts`; nothing is hardcoded here.
 */
import { isApiError, type CoinAward, type CoinLedgerSource, type CoinRedemption, type CoinStoreItem, type ShippingAddress, type StoreItemState } from '@/platform/shared/api-client';
import { INDIA_STATES } from '@/platform/shared/config/coins';
import { INDIA_MOBILE_REGEX } from '@/platform/shared/config/security';
import { nationalDigits } from '../lib/phone';
import { problemMessage } from '../lib/problems';

/** Short names for ledger sources ("+5 coins: daily challenge"). */
export const SOURCE_LABELS: Record<CoinLedgerSource, string> = {
  checkin: 'daily check-in',
  checkin_streak: 'check-in streak bonus',
  daily_challenge: 'daily challenge',
  solved_milestone: 'practice milestone',
  chapter_mastered: 'chapter mastered',
  test_submitted: 'test finished',
  perfect_paper: 'perfect paper',
  live_participation: 'live mock',
  live_rank: 'live mock rank',
  league_promotion: 'league promotion',
  league_top_finish: 'league top finish',
  redemption: 'store',
  admin: 'adjustment by SOYL',
};

export function coinsText(n: number): string {
  return `${n.toLocaleString('en-IN')} ${Math.abs(n) === 1 ? 'coin' : 'coins'}`;
}

export interface AwardSummary {
  /** Coins actually paid. */
  total: number;
  /** "+5 coins: daily challenge · +1 coin: daily check-in", or null when nothing was paid. */
  text: string | null;
  /** True when an award was cut by today's cap (the cap note should be shown). */
  capped: boolean;
}

/** What a practice answer / test submit / check-in paid, as one line for a toast or an inline note. */
export function summariseAwards(awards: readonly CoinAward[] | null | undefined): AwardSummary {
  const list = awards ?? [];
  const paid = list.filter((a) => a.amount > 0);
  const total = paid.reduce((n, a) => n + a.amount, 0);
  const text = paid.length ? paid.map((a) => `+${coinsText(a.amount)}: ${SOURCE_LABELS[a.source] ?? a.source}`).join(' · ') : null;
  return { total, text, capped: list.some((a) => a.cappedOut) };
}

export const CAP_NOTE = 'You reached today’s coin limit. Milestones still count; more coins tomorrow.';

/** Friendly copy for coins problems (ADR-020); other codes fall back to the shared messages. */
export function coinsProblemMessage(err: unknown): string {
  if (!isApiError(err)) return problemMessage(err);
  switch (err.code) {
    case 'coins_insufficient':
      return 'You do not have enough coins for this yet. Keep learning: coins come from practice, tests and your daily check-in.';
    case 'item_unavailable':
      return 'This item cannot be redeemed right now. Limited drops can only be redeemed while the drop is open.';
    case 'out_of_stock':
      return 'This item has sold out. Every unit has been earned by another student.';
    case 'redemption_limit':
      return 'You have already redeemed this item as many times as allowed.';
    case 'not_eligible':
      return 'This item is unlocked by an achievement you have not reached yet.';
    case 'verification_required':
      return 'Verify your email or phone number on your profile first, so we can reach you about your order.';
    case 'consent_required':
      return 'A parent or guardian needs to approve before merch can be sent to your home. Ask them from your profile.';
    case 'consent_unavailable':
      return 'We could not check parent approval right now. Please try again shortly.';
    case 'redemption_disabled':
      return 'Merch redemption opens soon. Keep earning coins: your balance is safe.';
    case 'validation_failed':
      return 'Please check the address: some fields are not valid.';
    case 'conflict':
      return 'This order has changed. Reload the page to see its latest status.';
    default:
      return problemMessage(err);
  }
}

/* ── Store item states ────────────────────────────────────────────────────── */

export interface StateCopy {
  /** Short label on the card's button or badge. */
  label: string;
  /** One-line explanation under the price (null when the label says it all). */
  note: string | null;
  /** What the main button does. */
  action: 'redeem' | 'sign_in' | 'consent' | 'verify' | 'equip' | 'none';
}

export function stateCopy(item: Pick<CoinStoreItem, 'state' | 'type' | 'eligibilityLabel' | 'priceCoins'>, balance: number | null): StateCopy {
  const state: StoreItemState = item.state;
  switch (state) {
    case 'available':
      return { label: 'Redeem', note: null, action: 'redeem' };
    case 'sign_in':
      return { label: 'Log in to redeem', note: 'Coins are earned by learning. Log in to start earning.', action: 'sign_in' };
    case 'insufficient_coins': {
      const need = balance === null ? null : Math.max(0, item.priceCoins - balance);
      return { label: 'Keep earning', note: need ? `${coinsText(need)} to go.` : 'Not enough coins yet.', action: 'none' };
    }
    case 'locked':
      return { label: 'Locked', note: item.eligibilityLabel ? `Unlock: ${item.eligibilityLabel}.` : 'Unlocked by an achievement.', action: 'none' };
    case 'owned':
      return { label: 'Owned', note: null, action: item.type === 'digital' ? 'equip' : 'none' };
    case 'limit_reached':
      return { label: 'Redeemed', note: 'You have redeemed the most allowed for this item.', action: 'none' };
    case 'sold_out':
      return { label: 'Sold out', note: 'Every unit has been earned.', action: 'none' };
    case 'upcoming':
      return { label: 'Dropping soon', note: null, action: 'none' };
    case 'ended':
      return { label: 'Drop ended', note: 'This limited drop is over.', action: 'none' };
    case 'coming_soon':
      return { label: 'Coming soon', note: 'Merch redemption opens soon. Keep earning: your coins are safe.', action: 'none' };
    case 'verification_needed':
      return { label: 'Verify to redeem', note: 'Merch needs a verified email or phone, so we can reach you about delivery.', action: 'verify' };
    case 'consent_needed':
      return { label: 'Parent approval needed', note: 'A parent or guardian must approve before we can send merch to your home.', action: 'consent' };
    default:
      return { label: 'Unavailable', note: null, action: 'none' };
  }
}

/* ── Time ─────────────────────────────────────────────────────────────────── */

/** "3d 4h", "5h 12m", "12m", "<1m". */
export function formatSpan(ms: number): string {
  if (ms <= 0) return '0m';
  const totalMin = Math.floor(ms / 60_000);
  if (totalMin < 1) return '<1m';
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  if (d > 0) return `${d}d ${h}h`;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** Limited-drop line for a card: "Drops in 3d 4h", "Ends in 5h 12m", or null for always-on items. */
export function dropLine(item: Pick<CoinStoreItem, 'availableFrom' | 'availableUntil'>, nowMs: number): string | null {
  const from = item.availableFrom ? Date.parse(item.availableFrom) : null;
  const until = item.availableUntil ? Date.parse(item.availableUntil) : null;
  if (from !== null && nowMs < from) return `Drops in ${formatSpan(from - nowMs)}`;
  if (until !== null && nowMs <= until) return `Ends in ${formatSpan(until - nowMs)}`;
  if (until !== null && nowMs > until) return 'Drop ended';
  return null;
}

/** "28 Oct 2026" in IST. */
export function istDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

/** "28 Oct, 6:05 pm" in IST. */
export function istDateTimeShort(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
}

/* ── Redemptions ──────────────────────────────────────────────────────────── */

export const REDEMPTION_STATUS_LABELS: Record<CoinRedemption['status'], string> = {
  requested: 'Waiting for your address',
  parent_approval_pending: 'Waiting for approval',
  approved: 'Approved, packing',
  fulfilled: 'Done',
  cancelled: 'Cancelled, coins returned',
  refunded: 'Not approved, coins returned',
};

export function canCancel(r: Pick<CoinRedemption, 'itemType' | 'status'>): boolean {
  return r.itemType === 'physical' && (r.status === 'requested' || r.status === 'parent_approval_pending');
}

/** The API accepts an address only for a physical redemption still in `requested`. */
export function needsAddress(r: Pick<CoinRedemption, 'itemType' | 'status' | 'addressOnFile'>): boolean {
  return r.itemType === 'physical' && r.status === 'requested' && !r.addressOnFile;
}

/* ── Shipping address (mirrors ShippingAddressSchema in the API) ──────────── */

export type AddressField = 'recipientName' | 'line1' | 'line2' | 'city' | 'state' | 'pincode' | 'phone';
export type AddressDraft = Record<AddressField, string>;

export const EMPTY_ADDRESS: AddressDraft = { recipientName: '', line1: '', line2: '', city: '', state: '', pincode: '', phone: '' };
export const ADDRESS_LIMITS: Record<Exclude<AddressField, 'state' | 'pincode' | 'phone'>, number> = { recipientName: 80, line1: 120, line2: 120, city: 60 };
export const PINCODE_RE = /^[1-9]\d{5}$/;
/** The API refuses control characters and markup brackets in address text. */
const TEXT_RE = /^[^<>{}\u0000-\u001f]*$/;

function textError(value: string, max: number, required: boolean): string | null {
  const v = value.trim();
  if (!v) return required ? 'This is required.' : null;
  if (v.length > max) return `Use at most ${max} characters.`;
  if (!TEXT_RE.test(v)) return 'Use letters, numbers and normal punctuation.';
  return null;
}

export function validateAddress(d: AddressDraft): { value: ShippingAddress | null; errors: Partial<Record<AddressField, string>> } {
  const errors: Partial<Record<AddressField, string>> = {};
  for (const f of ['recipientName', 'line1', 'line2', 'city'] as const) {
    const e = textError(d[f], ADDRESS_LIMITS[f], f !== 'line2');
    if (e) errors[f] = e;
  }
  if (!INDIA_STATES.includes(d.state)) errors.state = 'Choose a state or union territory.';
  const pin = d.pincode.replace(/\s/g, '');
  if (!PINCODE_RE.test(pin)) errors.pincode = 'A 6-digit PIN code.';
  const digits = nationalDigits(d.phone);
  const phone = digits.length === 10 ? `+91${digits}` : '';
  if (!INDIA_MOBILE_REGEX.test(phone)) errors.phone = 'A 10-digit Indian mobile number (starts with 6, 7, 8 or 9).';
  if (Object.keys(errors).length) return { value: null, errors };
  const line2 = d.line2.trim();
  return {
    value: { recipientName: d.recipientName.trim(), line1: d.line1.trim(), ...(line2 ? { line2 } : {}), city: d.city.trim(), state: d.state as ShippingAddress['state'], pincode: pin, phone },
    errors,
  };
}

/** Hindi subjects render in Devanagari (font and `lang`); the API sends no language on a challenge. */
export function challengeLang(subjectId: string): string | undefined {
  return /(^|-)hindi(-|$)/.test(subjectId) ? 'hi' : undefined;
}

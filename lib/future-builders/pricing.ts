import { FRIEND_CODE, FRIEND_DISCOUNT, LIST_PRICE, getActiveOffer, today, type Offer } from '@/content/future-builders';

export interface Coupon {
  code: string;
  discount: number;
  message: string;
  /** FRIEND500 is only valid with the referring/enrolling friend's name. */
  needsFriendName?: boolean;
}

/** The only accepted code, during the early-bird offer and after it (owner, 8 Nov 2026). */
const COUPONS: Record<string, Omit<Coupon, 'code'>> = {
  [FRIEND_CODE]: {
    discount: FRIEND_DISCOUNT,
    message: `₹${FRIEND_DISCOUNT} friend discount applied. Your friend gets ₹${FRIEND_DISCOUNT} too.`,
    needsFriendName: true,
  },
};

export function findCoupon(raw: string | undefined | null): Coupon | null {
  const code = (raw ?? '').trim().toUpperCase();
  const coupon = Object.prototype.hasOwnProperty.call(COUPONS, code) ? COUPONS[code] : undefined;
  return coupon ? { code, ...coupon } : null;
}

/** A friend's name counts once it has at least 2 non-space characters. */
export function hasFriendName(friendName: string | null | undefined): boolean {
  return (friendName ?? '').trim().length >= 2;
}

export interface Quote {
  offer: Offer;
  /** ₹11,999, shown struck through. */
  listPrice: number;
  /** The offer's price before any code. */
  basePrice: number;
  /** The code that counted, or null (an unknown code, or FRIEND500 without a friend's name). */
  coupon: Coupon | null;
  discount: number;
  /** What is charged, in rupees. */
  total: number;
}

/**
 * The one pricing rule, shared by the form (display) and the payment API (charge):
 * the offer in force at `now` (Children’s Day early-bird or standard), less FRIEND500 when a friend's
 * name is given. The payment API always prices the order by the server clock.
 */
export function quote(raw: string | undefined | null, friendName?: string | null, now: Date = today()): Quote {
  const offer = getActiveOffer(now);
  const found = findCoupon(raw);
  const coupon = found && (!found.needsFriendName || hasFriendName(friendName)) ? found : null;
  const discount = coupon ? coupon.discount : 0;
  return { offer, listPrice: LIST_PRICE, basePrice: offer.price, coupon, discount, total: offer.price - discount };
}

/** Final price in rupees. */
export function priceFor(raw: string | undefined | null, friendName?: string | null, now: Date = today()): number {
  return quote(raw, friendName, now).total;
}

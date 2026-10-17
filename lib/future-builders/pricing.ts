import { BASE_PRICE, EARLY_BIRD_CODE, FRIEND_CODE, FRIEND_DISCOUNT } from '@/content/future-builders';

export interface Coupon {
  code: string;
  discount: number;
  message: string;
  /** FRIEND500 is only valid with the referring/enrolling friend's name. */
  needsFriendName?: boolean;
}

const COUPONS: Record<string, Omit<Coupon, 'code'>> = {
  [EARLY_BIRD_CODE]: {
    discount: Math.floor(BASE_PRICE * 0.1),
    message: '10% early-bird discount applied!',
  },
  [FRIEND_CODE]: {
    discount: FRIEND_DISCOUNT,
    message: `₹${FRIEND_DISCOUNT} friend discount applied! Your friend gets ₹${FRIEND_DISCOUNT} too.`,
    needsFriendName: true,
  },
  SOYL500: { discount: 500, message: '₹500 discount applied!' },
};

export function findCoupon(raw: string | undefined | null): Coupon | null {
  const code = (raw ?? '').trim().toUpperCase();
  const coupon = COUPONS[code];
  return coupon ? { code, ...coupon } : null;
}

/** Final price in rupees. Shared by the form (display) and the payment API (charge). */
export function priceFor(raw: string | undefined | null, friendName?: string): number {
  const coupon = findCoupon(raw);
  if (!coupon) return BASE_PRICE;
  if (coupon.needsFriendName && !friendName?.trim()) return BASE_PRICE;
  return BASE_PRICE - coupon.discount;
}

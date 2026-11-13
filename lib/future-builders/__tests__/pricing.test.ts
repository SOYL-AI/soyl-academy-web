import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CAMP,
  EARLY_BIRD_OFFER,
  LIST_PRICE,
  STANDARD_OFFER,
  getActiveOffer,
  getCohortState,
  getOpenCohort,
  getUpcomingCohort,
  previewNow,
  rupees,
  type Camp,
} from '@/content/future-builders';
import { findCoupon, priceFor, quote } from '../pricing';

const at = (iso: string) => new Date(iso);
const DIWALI_DAY = at('2026-11-10T12:00:00+05:30');
const LAST_MINUTE = at('2026-11-20T23:59:00+05:30');
const LAST_SECOND = at('2026-11-20T23:59:59.999+05:30');
const MIDNIGHT = at('2026-11-21T00:00:00+05:30');
const AFTER = at('2026-11-22T12:00:00+05:30');

describe('prices (owner, 8 Nov 2026)', () => {
  it('are in rupees: list ₹11,999, early-bird ₹3,299, standard ₹9,999', () => {
    expect(LIST_PRICE).toBe(11999);
    expect(EARLY_BIRD_OFFER.price).toBe(3299);
    expect(STANDARD_OFFER.price).toBe(9999);
    expect(rupees(LIST_PRICE)).toBe('₹11,999');
    expect(rupees(3299)).toBe('₹3,299');
  });
});

describe('getActiveOffer: early-bird (Diwali, then Children’s Day) until 20 Nov 2026 23:59 IST, then standard', () => {
  it('is the early-bird during the offer (Diwali days and Children’s Day alike), including its last minute and second', () => {
    for (const now of [at('2026-11-08T00:00:00+05:30'), DIWALI_DAY, at('2026-11-14T12:00:00+05:30'), LAST_MINUTE, LAST_SECOND]) {
      expect(getActiveOffer(now).slug).toBe('diwali-2026');
    }
  });
  it('is the standard fee from 21 Nov 00:00 IST (= 20 Nov 18:30 UTC)', () => {
    expect(getActiveOffer(MIDNIGHT).slug).toBe('standard');
    expect(getActiveOffer(at('2026-11-20T18:30:00Z')).slug).toBe('standard');
    expect(getActiveOffer(at('2026-11-20T18:29:59Z')).slug).toBe('diwali-2026');
    expect(getActiveOffer(AFTER)).toEqual(STANDARD_OFFER);
  });
  it('only the early-bird carries the theme, named for Children’s Day', () => {
    expect(getActiveOffer(DIWALI_DAY).theme).toBe('festive');
    expect(getActiveOffer(DIWALI_DAY)).toMatchObject({ name: 'Children’s Day early-bird', label: 'Children’s Day offer', campaign: 'childrens-day-2026', endsLabel: '20 Nov, 11:59 pm' });
    expect(getActiveOffer(AFTER).theme).toBeUndefined();
  });
});

describe('codes: only FRIEND500', () => {
  it('finds FRIEND500 in any case and with spaces', () => {
    expect(findCoupon('FRIEND500')?.discount).toBe(500);
    expect(findCoupon(' friend500 ')?.code).toBe('FRIEND500');
    expect(findCoupon('FRIEND500')?.needsFriendName).toBe(true);
  });
  it('rejects the retired codes and anything else', () => {
    for (const code of ['BUILDER10', 'SOYL500', 'ARNAV15', 'DIWALI', '', 'constructor', '__proto__', null, undefined]) {
      expect(findCoupon(code)).toBeNull();
    }
  });
});

describe('quote / priceFor', () => {
  it('early-bird: ₹3,299; with FRIEND500 and a friend’s name ₹2,799', () => {
    expect(priceFor(null, null, DIWALI_DAY)).toBe(3299);
    expect(priceFor('FRIEND500', 'Asha', DIWALI_DAY)).toBe(2799);
    expect(priceFor('friend500', 'Asha', LAST_MINUTE)).toBe(2799);
  });
  it('after the early-bird: ₹9,999; with FRIEND500 and a name ₹9,499', () => {
    expect(priceFor(undefined, undefined, MIDNIGHT)).toBe(9999);
    expect(priceFor('FRIEND500', 'Asha', AFTER)).toBe(9499);
  });
  it('FRIEND500 without a friend’s name (or a 1-letter one) gives no discount', () => {
    expect(priceFor('FRIEND500', '', DIWALI_DAY)).toBe(3299);
    expect(priceFor('FRIEND500', '   ', DIWALI_DAY)).toBe(3299);
    expect(priceFor('FRIEND500', 'A', AFTER)).toBe(9999);
    expect(quote('FRIEND500', null, DIWALI_DAY).coupon).toBeNull();
  });
  it('retired codes are charged the full offer price', () => {
    expect(priceFor('BUILDER10', null, DIWALI_DAY)).toBe(3299);
    expect(priceFor('SOYL500', 'Asha', AFTER)).toBe(9999);
    expect(priceFor('ARNAV15', null, AFTER)).toBe(9999);
  });
  it('a quote carries the list price, the offer and the discount', () => {
    expect(quote('FRIEND500', 'Asha', DIWALI_DAY)).toMatchObject({
      listPrice: 11999,
      basePrice: 3299,
      discount: 500,
      total: 2799,
      offer: { slug: 'diwali-2026' },
      coupon: { code: 'FRIEND500' },
    });
  });
});

describe('camp state: registration open from 8 Nov 2026 to 31 Mar 2027 23:59 IST', () => {
  it('the Summer 2027 camp is month-level: April–May 2027, no exact dates', () => {
    expect(CAMP).toMatchObject({ slug: 'summer-2027', months: 'April–May 2027', startMonth: '2027-04', endMonth: '2027-05' });
    expect(CAMP?.dates).toBeUndefined();
  });
  it('is upcoming before registration opens', () => {
    const now = at('2026-11-07T23:59:00+05:30');
    expect(getCohortState(now)).toBe('upcoming');
    expect(getOpenCohort(now)).toBeNull();
    expect(getUpcomingCohort(now)?.slug).toBe('summer-2027');
  });
  it('is open from the relaunch', () => {
    expect(getCohortState(at('2026-11-08T00:00:00+05:30'))).toBe('open');
    expect(getOpenCohort(DIWALI_DAY)?.slug).toBe('summer-2027');
    expect(getOpenCohort(at('2027-02-01T12:00:00+05:30'))?.slug).toBe('summer-2027');
  });
  it('is closing-soon in the last 5 days and still takes payment at 23:59 on 31 Mar', () => {
    expect(getCohortState(at('2027-03-27T12:00:00+05:30'))).toBe('closing-soon');
    expect(getOpenCohort(at('2027-03-31T23:59:00+05:30'))).not.toBeNull();
  });
  it('is waitlist (no payment) from 1 Apr 2027 00:00 IST', () => {
    const now = at('2027-04-01T00:00:00+05:30');
    expect(getOpenCohort(now)).toBeNull();
    expect(getUpcomingCohort(now)).toBeNull();
    expect(getCohortState(now)).toBe('waitlist');
  });
  it('is waitlist when no camp is set', () => {
    expect(getCohortState(DIWALI_DAY, null)).toBe('waitlist');
  });
  it('works for any camp passed in', () => {
    const other: Camp = { ...(CAMP as Camp), registrationOpens: '2027-06-01T00:00:00+05:30', registrationCloses: '2027-06-30T23:59:59+05:30' };
    expect(getCohortState(at('2027-05-01T12:00:00+05:30'), other)).toBe('upcoming');
    expect(getCohortState(at('2027-06-10T12:00:00+05:30'), other)).toBe('open');
  });
});

describe('COHORT_PREVIEW_DATE (development only)', () => {
  afterEach(() => vi.unstubAllEnvs());
  it('reads a day as noon IST, or a full timestamp', () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', '2026-11-20');
    expect(previewNow()?.toISOString()).toBe('2026-11-20T06:30:00.000Z');
    vi.stubEnv('COHORT_PREVIEW_DATE', '2026-11-15T23:58:00+05:30');
    expect(previewNow()?.toISOString()).toBe('2026-11-15T18:28:00.000Z');
  });
  it('ignores garbage and empty values', () => {
    vi.stubEnv('COHORT_PREVIEW_DATE', 'soon');
    expect(previewNow()).toBeNull();
    vi.stubEnv('COHORT_PREVIEW_DATE', '');
    expect(previewNow()).toBeNull();
  });
});

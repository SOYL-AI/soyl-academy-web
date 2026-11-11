import { describe, expect, it } from 'vitest';
import { formatInr, getPlan, planPrice, PLANS, type Plan } from '@/platform/shared/config/plans';
import { boardExamPass, formatIstDate } from '@/lib/home/numbers';
import { DAYS_PER_PERIOD, daysCovered, perDayFor, priceRows } from './per-day';

const NOV_11 = new Date('2026-11-11T06:00:00Z'); // 11:30 IST

/** The rule written out again, independently: nearest 10 paise, whole rupees from ₹10 up. */
function expected(amountPaise: number, days: number): string {
  const paise = amountPaise / days;
  const ten = Math.max(10, Math.round(paise / 10) * 10);
  return ten >= 1000 ? `₹${Math.round(paise / 100)}` : `₹${(ten / 100).toFixed(2)}`;
}

describe('daysCovered', () => {
  it('spreads a month over 30 days and a year over 365', () => {
    expect(daysCovered('monthly', null, NOV_11)).toBe(30);
    expect(daysCovered('yearly', null, NOV_11)).toBe(365);
  });

  it('spreads a pass over the IST days left, today included', () => {
    // 11 Nov 2026 to 31 Mar 2027: 20 + 31 + 31 + 28 + 31 days.
    expect(daysCovered('one_time', '2027-03-31T23:59:59+05:30', NOV_11)).toBe(141);
    // 23:30 IST on 31 March is still the last day.
    expect(daysCovered('one_time', '2027-03-31T23:59:59+05:30', new Date('2027-03-31T18:00:00Z'))).toBe(1);
  });

  it('has no days for a pass that ended or has no end', () => {
    expect(daysCovered('one_time', '2027-03-31T23:59:59+05:30', new Date('2027-04-01T00:10:00+05:30'))).toBeNull();
    expect(daysCovered('one_time', null, NOV_11)).toBeNull();
    expect(daysCovered('one_time', 'not a date', NOV_11)).toBeNull();
  });
});

describe('perDayFor', () => {
  it('rounds to 10 paise, and to whole rupees from ₹10 up', () => {
    expect(perDayFor({ interval: 'monthly', amountPaise: 19_900 }, null, NOV_11)).toBe('₹6.60'); // 663.3 paise
    expect(perDayFor({ interval: 'yearly', amountPaise: 149_900 }, null, NOV_11)).toBe('₹4.10'); // 410.7 paise
    expect(perDayFor({ interval: 'monthly', amountPaise: 29_900 }, null, NOV_11)).toBe('₹10'); // 996.7 paise
    expect(perDayFor({ interval: 'monthly', amountPaise: 60_000 }, null, NOV_11)).toBe('₹20');
  });

  it('is null for a free plan', () => {
    expect(perDayFor({ interval: 'monthly', amountPaise: 0 }, null, NOV_11)).toBeNull();
  });

  it('gives the pass the same figure as the homepage clock', () => {
    const pass = getPlan('board_exam_pass');
    const price = planPrice('board_exam_pass', 'one_time')!;
    expect(perDayFor(price, pass.validUntil, NOV_11)).toBe(boardExamPass(NOV_11)!.perDay);
  });
});

describe('priceRows (from config)', () => {
  const rows = priceRows(NOV_11);

  it('has one row per paid price in plans.ts, in display order', () => {
    const paid = [...PLANS].sort((a, b) => a.order - b.order).flatMap((p) => p.prices.filter((x) => x.amountPaise > 0).map((x) => `${p.id}:${x.interval}`));
    expect(rows.map((r) => `${r.planId}:${r.interval}`).sort()).toEqual([...paid].sort());
    const order = rows.map((r) => getPlan(r.planId).order);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('reads every amount from config and spreads it by the rule', () => {
    for (const r of rows) {
      const plan = getPlan(r.planId);
      const price = plan.prices.find((x) => x.interval === r.interval)!;
      expect(r.price).toBe(formatInr(price.amountPaise));
      expect(r.planName).toBe(plan.name);
      const days = r.interval === 'one_time' ? daysCovered('one_time', plan.validUntil, NOV_11)! : DAYS_PER_PERIOD[r.interval];
      expect(r.perDay).toBe(expected(price.amountPaise, days));
      expect(r.period).toBe({ monthly: 'a month', yearly: 'a year', one_time: 'once' }[r.interval]);
      expect(r.until).toBe(r.interval === 'one_time' && plan.validUntil ? formatIstDate(new Date(plan.validUntil)) : null);
    }
  });

  it('puts monthly before yearly within a plan', () => {
    const plus = rows.filter((r) => r.planId === 'plus').map((r) => r.interval);
    expect(plus.indexOf('monthly')).toBeLessThan(plus.indexOf('yearly'));
  });

  it('leaves out a pass that has ended, and free plans', () => {
    expect(priceRows(new Date('2027-04-02T06:00:00Z')).some((r) => r.interval === 'one_time')).toBe(false);
    const freeOnly: Plan[] = [{ ...getPlan('free') }];
    expect(priceRows(NOV_11, freeOnly)).toEqual([]);
  });
});

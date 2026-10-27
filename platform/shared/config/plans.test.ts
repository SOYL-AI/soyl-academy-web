import { describe, expect, it } from 'vitest';
import { BILLING, PLANS, Plan, formatInr, getPlan, planPrice, priceLabel } from './plans';
import { readFlags } from './flags';

describe('plans config', () => {
  it('matches CONTEXT.md §6–7', () => {
    for (const plan of PLANS) Plan.parse(plan);
    expect(getPlan('free').creditsPerDay).toBe(25);
    expect(getPlan('plus').creditsPerDay).toBe(40);
    expect(getPlan('pro').creditsPerDay).toBe(60);
    expect(getPlan('board_exam_pass').creditsPerDay).toBe(60);
    expect(getPlan('plus').prices).toEqual([
      { interval: 'monthly', amountPaise: 19_900 },
      { interval: 'yearly', amountPaise: 149_900 },
    ]);
    expect(getPlan('pro').prices).toEqual([
      { interval: 'monthly', amountPaise: 29_900 },
      { interval: 'yearly', amountPaise: 249_900 },
    ]);
    expect(getPlan('board_exam_pass').prices).toEqual([{ interval: 'one_time', amountPaise: 49_900 }]);
    expect(getPlan('board_exam_pass').validUntil).toBe('2027-03-31T23:59:59+05:30');
  });

  it('formats INR', () => {
    expect(formatInr(19_900)).toBe('₹199');
    expect(formatInr(149_900)).toBe('₹1,499');
    expect(formatInr(250)).toBe('₹2.50');
  });
});

describe('flags', () => {
  it('default to off', () => {
    expect(readFlags({})).toEqual({ platformEnabled: false, billingEnabled: false });
  });
  it('turn on only for explicit true', () => {
    expect(readFlags({ PLATFORM_ENABLED: 'true', BILLING_ENABLED: 'yes' })).toEqual({
      platformEnabled: true,
      billingEnabled: false,
    });
  });
});

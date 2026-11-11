import { describe, expect, it } from 'vitest';
import { CREDIT_BONUSES } from '@/platform/shared/config/credit-bonuses';
import { CREDIT_RESET_TIME_ZONE } from '@/platform/shared/config/credits';
import { getPlan } from '@/platform/shared/config/plans';
import { drops, midnightRefill, zoneName } from './refill';

describe('midnightRefill', () => {
  const refill = midnightRefill();

  it('reads the free allowance from plans.ts', () => {
    expect(refill.freePerDay).toBe(getPlan('free').creditsPerDay);
  });

  it('refills at midnight in the configured time zone', () => {
    expect(CREDIT_RESET_TIME_ZONE).toBe('Asia/Kolkata');
    expect(refill.refillsAt).toBe('midnight, India time');
  });

  it('reads both learning bonuses from credit-bonuses.ts', () => {
    expect(refill.bonuses.map((b) => b.credits)).toEqual([CREDIT_BONUSES.dailyGoal.credits, CREDIT_BONUSES.streakMilestone.credits]);
    expect(refill.bonuses[1]!.when).toBe(`every ${CREDIT_BONUSES.streakMilestone.everyDays}-day streak`);
  });
});

describe('zoneName', () => {
  it('names India time and never guesses another zone', () => {
    expect(zoneName('Asia/Kolkata')).toBe('India time');
    expect(zoneName('Europe/London')).toBe('Europe/London');
  });
});

describe('drops', () => {
  it('draws one drop a credit up to 60', () => {
    expect(drops(getPlan('free').creditsPerDay)).toEqual({ count: getPlan('free').creditsPerDay, perDrop: 1 });
    expect(drops(60)).toEqual({ count: 60, perDrop: 1 });
  });

  it('groups larger amounts so the meter stays short', () => {
    expect(drops(150)).toEqual({ count: 30, perDrop: 5 });
    expect(drops(101)).toEqual({ count: 21, perDrop: 5 });
    expect(drops(1000)).toEqual({ count: 100, perDrop: 10 });
  });

  it('never draws a negative or fractional count', () => {
    expect(drops(-3)).toEqual({ count: 0, perDrop: 1 });
    expect(drops(10.7)).toEqual({ count: 10, perDrop: 1 });
  });
});

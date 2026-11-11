import { describe, expect, it } from 'vitest';
import { getPlan, planPrice } from '@/platform/shared/config/plans';
import { AI_ACTIONS } from '@/platform/shared/config/ai-actions';
import { FIRST_PAPERS } from '@/content/exam-dates';
import { boardExamPass, daysToFirstPaper, daysUntil, formatIstDate, freeCreditsPerDay, istDate, perDayLabel, quickDoubtCredits } from './numbers';

describe('IST days', () => {
  it('counts calendar days in IST, not UTC', () => {
    // 19:00 UTC on 10 Nov is 00:30 IST on 11 Nov.
    const lateUtc = new Date('2026-11-10T19:00:00Z');
    expect(daysUntil(istDate('2026-11-11'), lateUtc)).toBe(0);
    expect(daysUntil(istDate('2026-11-12'), lateUtc)).toBe(1);
    // 18:00 UTC is 23:30 IST, still 10 Nov.
    expect(daysUntil(istDate('2026-11-11'), new Date('2026-11-10T18:00:00Z'))).toBe(1);
  });

  it('formats dates in IST', () => {
    expect(formatIstDate(new Date('2027-03-31T23:59:59+05:30'))).toBe('31 March 2027');
  });
});

describe('config numbers', () => {
  it('reads the free allowance and the doubt price from config', () => {
    expect(freeCreditsPerDay()).toBe(getPlan('free').creditsPerDay);
    const p = AI_ACTIONS['quick-doubt'].pricing;
    expect(quickDoubtCredits()).toBe(p.kind === 'flat' ? p.credits : null);
  });
});

describe('perDayLabel', () => {
  it('rounds to the nearest 10 paise below ₹10 a day', () => {
    expect(perDayLabel(49_900, 141)).toBe('₹3.50'); // 353.9 paise
    expect(perDayLabel(49_900, 1)).toBe('₹499');
    expect(perDayLabel(10_000, 3)).toBe('₹33');
    expect(perDayLabel(100, 30)).toBe('₹0.10'); // never shows ₹0.00
  });

  it('switches to whole rupees when the rounding reaches ₹10', () => {
    expect(perDayLabel(29_900, 30)).toBe('₹10'); // 996.7 paise, not "₹10.00"
    expect(perDayLabel(29_700, 30)).toBe('₹9.90');
  });

  it('refuses zero days', () => {
    expect(() => perDayLabel(49_900, 0)).toThrow();
  });
});

describe('boardExamPass', () => {
  const plan = getPlan('board_exam_pass');
  const price = planPrice('board_exam_pass', 'one_time');

  it('spreads the config price over the days left, today included', () => {
    const offer = boardExamPass(new Date('2026-11-10T06:00:00Z'));
    expect(offer).not.toBeNull();
    expect(offer!.price).toBe(`₹${(price!.amountPaise / 100).toLocaleString('en-IN')}`);
    const end = new Date(plan.validUntil!);
    expect(offer!.until).toBe(formatIstDate(end));
    // 10 Nov 2026 to 31 Mar 2027 inclusive is 142 days.
    expect(offer!.daysLeft).toBe(142);
    expect(offer!.perDay).toBe(perDayLabel(price!.amountPaise, 142));
  });

  it('is gone once the pass has ended', () => {
    expect(boardExamPass(new Date('2027-04-01T00:30:00+05:30'))).toBeNull();
  });

  it('is still on sale on its last day', () => {
    expect(boardExamPass(new Date('2027-03-31T22:00:00+05:30'))?.daysLeft).toBe(1);
  });
});

describe('daysToFirstPaper', () => {
  it('has no number without an official date sheet', () => {
    if (FIRST_PAPERS.some((p) => p.exam === 'isc' && p.classLevel === 12)) return;
    expect(daysToFirstPaper('isc', 12, new Date('2026-11-10T06:00:00Z'))).toBeNull();
  });

  it('every official entry names its source and a valid date', () => {
    for (const p of FIRST_PAPERS) {
      expect(p.source).toMatch(/^https:\/\/(www\.)?(cbse\.gov\.in|cbseacademic\.nic\.in|cisce\.org)\//);
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(istDate(p.date).getTime())).toBe(false);
    }
  });
});

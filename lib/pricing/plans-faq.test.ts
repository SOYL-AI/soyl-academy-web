import { describe, expect, it } from 'vitest';
import { formatIstDate } from '@/lib/home/numbers';
import { getPlan } from '@/platform/shared/config/plans';
import { plansFaq } from './plans-faq';
import { midnightRefill } from './refill';

describe('plansFaq', () => {
  const faq = plansFaq();

  it('has a short list of plain questions', () => {
    expect(faq.length).toBeGreaterThanOrEqual(3);
    expect(faq.length).toBeLessThanOrEqual(5);
    for (const f of faq) {
      expect(f.question.endsWith('?')).toBe(true);
      expect(f.answer).not.toMatch(/[—–]/); // no dashes in visible copy
    }
  });

  it('reads the refill time and the pass end date from config', () => {
    const text = faq.map((f) => f.answer).join(' ');
    expect(text).toContain(midnightRefill().refillsAt);
    const pass = getPlan('board_exam_pass');
    expect(text).toContain(formatIstDate(new Date(pass.validUntil!)));
  });

  it('carries no number that config does not supply', () => {
    const pass = getPlan('board_exam_pass');
    const allowed = new Set(formatIstDate(new Date(pass.validUntil!)).match(/\d+/g));
    for (const f of faq) for (const n of `${f.question} ${f.answer}`.match(/\d+/g) ?? []) expect(allowed.has(n) || n === '18', `${n} in "${f.answer}"`).toBe(true);
  });

  it('promises no refund (the refund policy page is linked instead)', () => {
    expect(faq.map((f) => f.answer).join(' ')).not.toMatch(/refund/i);
  });
});

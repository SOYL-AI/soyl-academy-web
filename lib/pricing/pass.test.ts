import { describe, expect, it } from 'vitest';
import { FIRST_PAPERS } from '@/content/exam-dates';
import { getPlan } from '@/platform/shared/config/plans';
import { examDays, featureSentence } from './pass';

describe('examDays', () => {
  it('lists only exams with an official date sheet, never an estimate', () => {
    const lines = examDays(new Date('2026-11-11T06:00:00Z'));
    expect(lines.length).toBe(FIRST_PAPERS.filter((p) => p.date >= '2026-11-11').length);
    for (const l of lines) expect(l).toMatch(/^(CBSE|ICSE|ISC) Class (10|12): /);
  });
});

describe('featureSentence (from plans.ts)', () => {
  it('reads the pass credits and features from config', () => {
    const pass = getPlan('board_exam_pass');
    const line = featureSentence('board_exam_pass');
    expect(line.startsWith(`${pass.creditsPerDay} AI credits a day`)).toBe(true);
    expect(line.endsWith('.')).toBe(true);
    expect(line.includes('a weekly report for a parent')).toBe(pass.features.includes('parent_weekly_report'));
    expect(line.includes('papers made from your own uploads')).toBe(pass.features.includes('paper_from_upload'));
    expect(line.match(/\d+/g)).toEqual([String(pass.creditsPerDay)]);
  });

  it('joins the last feature with "and"', () => {
    expect(featureSentence('board_exam_pass')).toMatch(/, [^,]+ and a weekly report for a parent\.$/);
    expect(featureSentence('free')).toBe(`${getPlan('free').creditsPerDay} AI credits a day.`);
  });
});

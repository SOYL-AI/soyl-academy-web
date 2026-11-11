import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getPlan, plansWithFeature } from '@/platform/shared/config/plans';
import { REPORT_SAMPLE, reportPlans, reportView, subjectPigment, WEEK_DAYS, type ReportSampleData } from './report-sample';

describe('the sample report', () => {
  it('is internally consistent', () => {
    expect(REPORT_SAMPLE.activeDays).toBeGreaterThanOrEqual(0);
    expect(REPORT_SAMPLE.activeDays).toBeLessThanOrEqual(WEEK_DAYS);
    expect(REPORT_SAMPLE.stuck.length).toBeGreaterThan(0);
    for (const c of REPORT_SAMPLE.stuck) if (c.firstTryAccuracy !== null) expect(c.firstTryAccuracy).toBeGreaterThanOrEqual(0);
    expect(REPORT_SAMPLE.latestTest.percentage ?? 0).toBeLessThanOrEqual(100);
  });

  it('names only real chapters of its board and class (platform/catalog)', () => {
    for (const c of REPORT_SAMPLE.stuck) {
      const slug = c.subjectName.toLowerCase().replace(/\s+/g, '-');
      const file = resolve(process.cwd(), `platform/catalog/${REPORT_SAMPLE.board}/${REPORT_SAMPLE.classLevel}/${slug}/syllabus.yaml`);
      expect(readFileSync(file, 'utf8'), `${c.title} in ${file}`).toContain(`title: "${c.title}"`);
    }
  });
});

describe('reportView', () => {
  const view = reportView();

  it('shows each figure with its unit', () => {
    expect(view.who).toBe('CBSE · Class 10');
    expect(view.rows).toEqual([
      { label: 'Days active', value: `${REPORT_SAMPLE.activeDays} of 7` },
      { label: 'Lessons finished', value: String(REPORT_SAMPLE.lessonsCompleted.thisWeek), note: `${REPORT_SAMPLE.lessonsCompleted.lastWeek} the week before` },
      { label: 'Questions solved', value: String(REPORT_SAMPLE.solved.thisWeek), note: `${REPORT_SAMPLE.solved.lastWeek} the week before` },
      { label: 'Tests', value: `${REPORT_SAMPLE.testsSubmitted} submitted`, note: `Latest: Science, ${REPORT_SAMPLE.latestTest.percentage}%` },
      { label: 'AI help', value: `${REPORT_SAMPLE.aiCreditsSpent} credits used` },
    ]);
  });

  it('turns first-try accuracy into a percentage and gives each subject its pigment', () => {
    expect(view.stuck[0]).toEqual({ subject: 'Science', title: 'Acids, Bases and Salts', note: '45% right first time', pigment: 'madder' });
    expect(view.stuck[1]!.pigment).toBe('indigo');
  });

  it('handles the edges: one credit, no tests, no accuracy, too many days', () => {
    const edge: ReportSampleData = { ...REPORT_SAMPLE, aiCreditsSpent: 1, testsSubmitted: 0, activeDays: 9, stuck: [{ subjectName: 'Hindi', title: 'x', firstTryAccuracy: null }] };
    const v = reportView(edge);
    expect(v.rows.find((r) => r.label === 'AI help')!.value).toBe('1 credit used');
    expect(v.rows.find((r) => r.label === 'Tests')!.note).toBeUndefined();
    expect(v.activeDays).toBe(7);
    expect(v.stuck[0]).toMatchObject({ note: null, pigment: 'ink' });
  });
});

describe('subjectPigment', () => {
  it('follows DESIGN.md §2', () => {
    expect(['Mathematics', 'Science', 'Chemistry', 'Biology', 'Social Science', 'English'].map(subjectPigment)).toEqual(['indigo', 'madder', 'turmeric', 'leaf', 'henna', 'ink']);
  });
});

describe('reportPlans (from config)', () => {
  it('names every plan with the weekly report, in display order', () => {
    const ids = plansWithFeature('parent_weekly_report');
    expect(ids.length).toBeGreaterThan(0);
    const line = reportPlans();
    for (const id of ids) expect(line).toContain(getPlan(id).name);
    // Today: Pro and the Board Exam Pass (D-034, CONTEXT §7).
    if (ids.join() === 'pro,board_exam_pass') expect(line).toBe('Pro and the Board Exam Pass');
  });
});

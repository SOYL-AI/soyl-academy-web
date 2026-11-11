/**
 * The SAMPLE weekly report for a parent (docs/redesign-ink-and-wash.md §4, device 8), shown on /parents and
 * /plans by components/ink/ReportSample. The page labels it "Sample" and says the figures are made up.
 *
 * The report itself is not built yet: on 2026-11-11 `parent_weekly_report` is a plan feature id in
 * platform/shared/config/plans.ts and nothing else (no API route, worker job or email in platform/ or
 * components/platform). So the sample shows only figures the platform already computes for a student's IST week
 * (Monday to Sunday), and every field below is typed against the API field it would be read from:
 * GET /v1/me/dashboard (`MyDashboard`) and GET /v1/me/credits/history (`CreditHistory`). A field the API does not
 * have cannot be added here without a type error. When the real report is built, check this against it.
 */
import type { CreditHistory, FocusChapter, MyDashboard, TestHistoryItem } from '@/platform/shared/api-client';
import { getPlan, plansWithFeature, type PlanId } from '@/platform/shared/config/plans';

type Totals = MyDashboard['totals'];

export interface ReportSampleData {
  board: NonNullable<MyDashboard['profile']['board']>;
  classLevel: NonNullable<MyDashboard['profile']['classLevel']>;
  /** totals.activeDays.thisWeek: days with a practice answer, a lesson part finished or a test submitted. */
  activeDays: Totals['activeDays']['thisWeek'];
  lessonsCompleted: Pick<Totals['lessonsCompleted'], 'thisWeek' | 'lastWeek'>;
  solved: Pick<Totals['solved'], 'thisWeek' | 'lastWeek'>;
  testsSubmitted: Totals['tests']['submitted']['thisWeek'];
  /** The newest entry of testHistory. */
  latestTest: Pick<TestHistoryItem, 'subjectName' | 'percentage'>;
  /** focus.weakest: chapters really attempted, weakest first. */
  stuck: Pick<FocusChapter, 'subjectName' | 'title' | 'firstTryAccuracy'>[];
  /** The week's `spent` in GET /v1/me/credits/history, added up. */
  aiCreditsSpent: CreditHistory['days'][number]['spent'];
}

/** Days in a report week (Monday to Sunday, IST; platform/shared/learning/dashboard.ts istWeek). */
export const WEEK_DAYS = 7;

/**
 * MADE-UP FIGURES. Chapter titles are real CBSE Class 10 chapters (platform/catalog/cbse/10, checked by the
 * test); everything else is invented for the sample and the page says so.
 */
export const REPORT_SAMPLE: ReportSampleData = {
  board: 'cbse',
  classLevel: 10,
  activeDays: 5,
  lessonsCompleted: { thisWeek: 6, lastWeek: 4 },
  solved: { thisWeek: 48, lastWeek: 31 },
  testsSubmitted: 2,
  latestTest: { subjectName: 'Science', percentage: 68 },
  stuck: [
    { subjectName: 'Science', title: 'Acids, Bases and Salts', firstTryAccuracy: 0.45 },
    { subjectName: 'Mathematics', title: 'Quadratic Equations', firstTryAccuracy: 0.52 },
  ],
  aiCreditsSpent: 41,
};

/** Subject pigments (DESIGN.md §2): Mathematics indigo, Science and Physics madder, Chemistry turmeric, Biology leaf, Social Science henna, languages ink. */
export type SubjectPigment = 'indigo' | 'madder' | 'turmeric' | 'leaf' | 'henna' | 'ink';
const PIGMENTS: Record<string, SubjectPigment> = {
  Mathematics: 'indigo',
  Science: 'madder',
  Physics: 'madder',
  Chemistry: 'turmeric',
  Biology: 'leaf',
  'Social Science': 'henna',
};
export function subjectPigment(subjectName: string): SubjectPigment {
  return PIGMENTS[subjectName] ?? 'ink';
}

const BOARD_NAME: Record<ReportSampleData['board'], string> = { cbse: 'CBSE', cisce: 'CISCE' };
const pct = (ratio: number) => `${Math.round(ratio * 100)}%`;
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export interface ReportRow {
  label: string;
  value: string;
  /** A second, quieter line. */
  note?: string;
}

export interface ReportView {
  /** "CBSE · Class 10" */
  who: string;
  /** Out of WEEK_DAYS, for the row of day marks. */
  activeDays: number;
  rows: ReportRow[];
  stuck: { subject: string; title: string; note: string | null; pigment: SubjectPigment }[];
}

/** The sample as the card shows it. Pure, so the words and figures are unit-tested. */
export function reportView(sample: ReportSampleData = REPORT_SAMPLE): ReportView {
  const latest = sample.latestTest.percentage === null ? sample.latestTest.subjectName : `${sample.latestTest.subjectName}, ${sample.latestTest.percentage}%`;
  return {
    who: `${BOARD_NAME[sample.board]} · Class ${sample.classLevel}`,
    activeDays: Math.min(WEEK_DAYS, Math.max(0, sample.activeDays)),
    rows: [
      { label: 'Days active', value: `${sample.activeDays} of ${WEEK_DAYS}` },
      { label: 'Lessons finished', value: String(sample.lessonsCompleted.thisWeek), note: `${sample.lessonsCompleted.lastWeek} the week before` },
      { label: 'Questions solved', value: String(sample.solved.thisWeek), note: `${sample.solved.lastWeek} the week before` },
      { label: 'Tests', value: `${sample.testsSubmitted} submitted`, note: sample.testsSubmitted > 0 ? `Latest: ${latest}` : undefined },
      { label: 'AI help', value: plural(sample.aiCreditsSpent, 'credit', 'credits') + ' used' },
    ],
    stuck: sample.stuck.map((c) => ({
      subject: c.subjectName,
      title: c.title,
      note: c.firstTryAccuracy === null ? null : `${pct(c.firstTryAccuracy)} right first time`,
      pigment: subjectPigment(c.subjectName),
    })),
  };
}

/** Plan names with the article a parent would use: "Pro", "the Board Exam Pass". */
const ARTICLE: Partial<Record<PlanId, string>> = { board_exam_pass: 'the ' };

/** "Pro and the Board Exam Pass": the plans whose features include the weekly report (plans.ts). */
export function reportPlans(): string {
  const names = plansWithFeature('parent_weekly_report').map((id) => `${ARTICLE[id] ?? ''}${getPlan(id).name}`);
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/**
 * The exam clock on /plans (docs/redesign-ink-and-wash.md §4, device 6), without a door: /plans does not know the
 * visitor's class, so it lists the boards that have an official date sheet (content/exam-dates.ts; none yet,
 * and then the page says the month), and what the Board Exam Pass includes, read from the plan's features in
 * platform/shared/config/plans.ts.
 */
import { daysToFirstPaper } from '@/lib/home/numbers';
import type { BoardExam } from '@/content/exam-dates';
import { getPlan, type PlanFeature, type PlanId } from '@/platform/shared/config/plans';

const EXAMS: readonly { exam: BoardExam; classLevel: 10 | 12; name: string }[] = [
  { exam: 'cbse', classLevel: 10, name: 'CBSE Class 10' },
  { exam: 'cbse', classLevel: 12, name: 'CBSE Class 12' },
  { exam: 'icse', classLevel: 10, name: 'ICSE Class 10' },
  { exam: 'isc', classLevel: 12, name: 'ISC Class 12' },
];

/** "CBSE Class 10: 97 days to the first paper", only for exams with an official date sheet. */
export function examDays(now: Date): string[] {
  return EXAMS.flatMap(({ exam, classLevel, name }) => {
    const d = daysToFirstPaper(exam, classLevel, now);
    if (d === null) return [];
    return [d === 0 ? `${name}: the first paper is today` : `${name}: ${d} ${d === 1 ? 'day' : 'days'} to the first paper`];
  });
}

/** Plan features in a parent's words (the same ideas as PlansClient's FEATURE_TEXT, phrased to sit in one sentence). */
const FEATURE_PHRASE: Record<Exclude<PlanFeature, 'ai_credits'>, string> = {
  paper_from_upload: 'papers made from your own uploads',
  priority_ai_evaluation: 'priority AI checking of written answers',
  parent_weekly_report: 'a weekly report for a parent',
};

/** "150 AI credits a day, papers made from your own uploads, … and a weekly report for a parent." */
export function featureSentence(planId: PlanId): string {
  const plan = getPlan(planId);
  const parts = plan.features.map((f) => (f === 'ai_credits' ? `${plan.creditsPerDay} AI credits a day` : FEATURE_PHRASE[f]));
  if (parts.length <= 1) return `${parts.join('')}.`;
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}.`;
}

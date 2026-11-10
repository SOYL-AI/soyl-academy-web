/**
 * Every number the homepage shows about the learning platform, computed from config (CLAUDE.md golden rule 4:
 * config, not code). A hard-coded rupee figure or allowance on the page is a bug; change the config instead.
 *
 * Days are counted in IST calendar days (CLAUDE.md: store UTC, compute days in Asia/Kolkata).
 */
import { AI_ACTIONS } from '@/platform/shared/config/ai-actions';
import { formatInr, getPlan, planPrice } from '@/platform/shared/config/plans';
import { firstPaperFor, type BoardExam } from '@/content/exam-dates';

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** The IST calendar day of an instant, as a day number (days since 1970-01-01 in IST). */
export function istDay(at: Date): number {
  return Math.floor((at.getTime() + IST_OFFSET_MS) / DAY_MS);
}

/** IST calendar days from `now` to the day of `target` (0 on the day itself, negative once it has passed). */
export function daysUntil(target: Date, now: Date): number {
  return istDay(target) - istDay(now);
}

/** A `YYYY-MM-DD` date in IST, as the instant at its IST midnight. */
export function istDate(ymd: string): Date {
  return new Date(`${ymd}T00:00:00+05:30`);
}

/** "31 March 2027" for an instant, in IST. */
export function formatIstDate(at: Date): string {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(at);
}

/** AI credits every free account gets each IST day (plans.ts). */
export function freeCreditsPerDay(): number {
  return getPlan('free').creditsPerDay;
}

/** Credits a quick doubt costs (ai-actions.ts). Flat-priced today; null if it ever stops being flat. */
export function quickDoubtCredits(): number | null {
  const pricing = AI_ACTIONS['quick-doubt'].pricing;
  return pricing.kind === 'flat' ? pricing.credits : null;
}

/**
 * Price per day, rounded to the nearest 10 paise, as a label: "₹3.50". From ₹10 a day up, whole rupees.
 * "About" belongs in the sentence, not here.
 */
export function perDayLabel(amountPaise: number, days: number): string {
  if (days <= 0) throw new Error('perDayLabel needs at least one day');
  const perDayPaise = amountPaise / days;
  if (perDayPaise >= 1000) return formatInr(Math.round(perDayPaise / 100) * 100);
  const tenPaise = Math.max(10, Math.round(perDayPaise / 10) * 10);
  return `₹${(tenPaise / 100).toFixed(2)}`;
}

export interface PassOffer {
  /** "₹499" */
  price: string;
  /** "₹3.50": the price spread over the days the pass still covers, today included. */
  perDay: string;
  /** "31 March 2027" */
  until: string;
  daysLeft: number;
}

/** The Board Exam Pass in a parent's units, or null when it is not on sale (no price, or past its end). */
export function boardExamPass(now: Date): PassOffer | null {
  const plan = getPlan('board_exam_pass');
  const price = planPrice('board_exam_pass', 'one_time');
  if (!price || !plan.validUntil) return null;
  const end = new Date(plan.validUntil);
  const daysLeft = daysUntil(end, now) + 1; // bought today, it covers today too
  if (daysLeft <= 0) return null;
  return { price: formatInr(price.amountPaise), perDay: perDayLabel(price.amountPaise, daysLeft), until: formatIstDate(end), daysLeft };
}

/** Days to the first board paper, only from an official date sheet (content/exam-dates.ts); null otherwise. */
export function daysToFirstPaper(exam: BoardExam, classLevel: number, now: Date): number | null {
  const paper = firstPaperFor(exam, classLevel);
  if (!paper) return null;
  const days = daysUntil(istDate(paper.date), now);
  return days >= 0 ? days : null;
}

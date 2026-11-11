/**
 * The short FAQ on /plans (docs/redesign-ink-and-wash.md §3.3). Every answer rests on a rule that is already true:
 * learning and tests are free (CLAUDE.md golden rule 3, CONTEXT §5); AI waits for the reset and nothing else is
 * blocked (CONTEXT §6); a student needs a parent's approval, or to confirm they are 18 or older, before buying
 * (D-014, D-039, the billing API's `consent_required`); renewals and the pass's end date as PlansClient and
 * plans.ts state them. Dates and times are read from config. No refund promise is made here: the refund policy
 * page is linked, and it speaks for itself.
 */
import { formatIstDate } from '@/lib/home/numbers';
import { getPlan } from '@/platform/shared/config/plans';
import { midnightRefill } from './refill';

export interface FaqItem {
  question: string;
  answer: string;
}

export function plansFaq(): FaqItem[] {
  const pass = getPlan('board_exam_pass');
  const passEnd = pass.validUntil ? ` The ${pass.name} is paid once and ends on ${formatIstDate(new Date(pass.validUntil))}.` : '';
  return [
    {
      question: 'Is learning really free?',
      answer: 'Yes. Lessons, notes, flashcards, practice and tests are free on every plan. Tests need a free account; lessons and practice do not. A plan only adds AI credits.',
    },
    {
      question: 'What happens when the AI credits run out?',
      answer: `AI help waits until ${midnightRefill().refillsAt}, when the day’s credits come back. Lessons, practice and tests keep working.`,
    },
    {
      question: 'Who can buy a plan?',
      answer: 'A parent pays, by UPI or card, through Razorpay. A student under 18 needs a parent to approve their account first.',
    },
    {
      question: 'What if we change our minds?',
      answer: `Monthly and yearly plans renew until you cancel, and the plan stays until the end of the period you paid for.${passEnd}`,
    },
  ];
}

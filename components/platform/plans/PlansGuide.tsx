/**
 * /plans above the plan cards (docs/redesign-ink-and-wash.md §3.3 and §4: "let a parent decide in a minute"):
 *
 *   1 ledger   free, always | metered (AI), with the midnight refill drawn as drops   (devices 2 and 5)
 *   2 clock    the board exam month (or days, from official date sheets only) and the pass per day (6 and 7)
 *   3 report   a SAMPLE weekly report, and the plans it comes with                    (8)
 *   4 FAQ      four answers that rest on existing rules, and the refund policy link
 *
 * A server component: zero client JS. Every number is read from platform/shared/config through lib/pricing
 * (unit-tested, `npm run test:pricing`). The plan cards, Razorpay and the purchase flow stay in PlansClient,
 * untouched; it alone knows whether billing is on (from the API), so nothing here says it.
 */
import Link from 'next/link';
import { CreditsMeter } from '@/components/ink/CreditsMeter';
import { LedgerColumns } from '@/components/ink/LedgerColumns';
import { PerDay } from '@/components/ink/PerDay';
import { ReportSample } from '@/components/ink/ReportSample';
import { BOARD_EXAMS_MONTH_LINE } from '@/content/exam-dates';
import { boardExamPass } from '@/lib/home/numbers';
import { examDays, featureSentence } from '@/lib/pricing/pass';
import { plansFaq } from '@/lib/pricing/plans-faq';
import { midnightRefill } from '@/lib/pricing/refill';
import { reportPlans } from '@/lib/pricing/report-sample';
import { getPlan } from '@/platform/shared/config/plans';
import g from './guide.module.css';

function Plus() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlansGuide({ now }: { now: Date }) {
  const refill = midnightRefill();
  const pass = boardExamPass(now);
  const passName = getPlan('board_exam_pass').name;
  const exams = examDays(now);
  const faq = plansFaq();

  return (
    <div className={g.guide}>
      <section aria-labelledby="ledger-title" className={g.band}>
        <h2 id="ledger-title" className={g.head}>
          Learning is free. AI has a meter.
        </h2>
        <LedgerColumns>
          <CreditsMeter credits={refill.freePerDay} refillsAt={refill.refillsAt} bonuses={refill.bonuses} />
        </LedgerColumns>
      </section>

      {pass ? (
        <section aria-labelledby="clock-title" className={`${g.band} ${g.split}`} data-testid="exam-pass">
          <div>
            <h2 id="clock-title" className={g.head}>
              {BOARD_EXAMS_MONTH_LINE}
            </h2>
            {exams.length ? (
              <ul className={g.exams}>
                {exams.map((line) => (
                  <li key={line}>{line}.</li>
                ))}
              </ul>
            ) : null}
            <p className={g.lead}>Lessons, notes, practice and mock papers stay free, before the exam and after it.</p>
          </div>
          <div className={g.card}>
            <p className={g.label}>{passName}</p>
            <p className={g.offer}>
              {pass.price} once. <PerDay perDay={pass.perDay} until={pass.until} className={g.perDay} />.
            </p>
            <p className={g.small}>{featureSentence('board_exam_pass')}</p>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="report-title" className={`${g.band} ${g.split}`}>
        <div>
          <h2 id="report-title" className={g.head}>
            The weekly report
          </h2>
          <p className={g.lead}>A short note for a parent each week: what was studied and practised, and where it got hard.</p>
          <p className={g.lead}>It comes with {reportPlans()}.</p>
        </div>
        <ReportSample />
      </section>

      <section aria-labelledby="plans-faq-title" className={`${g.band} ${g.split}`}>
        <h2 id="plans-faq-title" className={g.head}>
          Before you choose
        </h2>
        <div className={g.faq}>
          {faq.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <Plus />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
          <Link href="/refund-policy" className={g.policy}>
            Cancellation and refund policy
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Button';
import {
  BASE_PRICE,
  CONTACT_HOURS,
  SCHEDULE,
  SEATS_TOTAL,
  VALUE_LINE,
  formatCohortDate,
  type Cohort,
  type CohortState,
  type UpcomingCohort,
} from '@/content/future-builders';
import { cn } from '@/lib/utils';

export const PRICE = `₹${BASE_PRICE.toLocaleString('en-IN')}`;

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="t-small mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 border-t border-rule pt-5">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted">{k}</dt>
          <dd className="t-num text-right text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

interface StatusCardProps {
  state: CohortState;
  /** The cohort taking registrations, if any. */
  cohort: Cohort | null;
  /** The announced cohort whose registration hasn't opened yet. */
  upcoming: UpcomingCohort | null;
  lastCohortName?: string;
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Hero aside: where registration stands, the dates (or what is known so far) and the fee. */
export function StatusCard({ state, cohort, upcoming, lastCohortName }: StatusCardProps) {
  if (!cohort && upcoming) {
    return (
      <div className="module p-6 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.4)] md:p-8">
        <p className="t-eyebrow inline-flex items-center gap-2.5 rounded-full bg-highlighter px-3.5 py-1.5 text-ink">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />
          Registration opens {upcoming.registrationOpensLabel}
        </p>
        <p className="t-title mt-5">{upcoming.name}</p>
        <p className="mt-2 text-ink">{capitalise(upcoming.window)}.</p>
        <Facts
          rows={[
            ['Format', 'Live online, recorded'],
            ['Timetable', 'Announced at registration'],
            ['Cohort size', `At most ${SEATS_TOTAL} students`],
            ['Fee', `${PRICE}, kit included`],
          ]}
        />
        <p className="t-small mt-4 text-muted">Exact dates aren’t set yet. We’ll tell you the day registration opens.</p>
      </div>
    );
  }

  if (!cohort) {
    return (
      <div className="module p-6 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.4)] md:p-8">
        <p className="t-eyebrow inline-flex items-center gap-2.5 rounded-full bg-highlighter px-3.5 py-1.5 text-ink">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />
          Waitlist open
        </p>
        <p className="t-title mt-5">Next cohort: dates being set</p>
        <p className="mt-3 text-muted">
          {lastCohortName ? `Registration for the ${lastCohortName} has closed. ` : ''}Waitlisted families hear the new dates before registration opens to everyone.
        </p>
        <Facts
          rows={[
            ['Format', 'Live online, weekends'],
            ['Length', `12 weeks · ${CONTACT_HOURS} hours`],
            ['Class times', SCHEDULE.short],
            ['Cohort size', `At most ${SEATS_TOTAL} students`],
            ['Current fee', `${PRICE}, kit included`],
          ]}
        />
        <p className="t-small mt-4 text-muted">The next cohort’s fee is confirmed with its dates.</p>
      </div>
    );
  }

  const closing = state === 'closing-soon';
  return (
    <div className="module p-6 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.4)] md:p-8">
      <p className="t-eyebrow inline-flex items-center gap-2.5 rounded-full bg-highlighter px-3.5 py-1.5 text-ink">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />
        {cohort.name}
      </p>
      <p className="t-title mt-5">
        {closing ? (
          <>
            Registration closes <span className="mark">{formatCohortDate(cohort.registrationCloses)}</span>
          </>
        ) : (
          <>Registration open until {formatCohortDate(cohort.registrationCloses)}</>
        )}
      </p>
      <Facts
        rows={[
          ['Orientation', formatCohortDate(cohort.orientation, true)],
          ['Classes start', formatCohortDate(cohort.classesStart, true)],
          ['Demo Day', formatCohortDate(cohort.ends, true)],
          ['Class times', SCHEDULE.short],
          ['Cohort size', `At most ${SEATS_TOTAL} students`],
        ]}
      />
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rule pt-5">
        <span className="t-small text-muted">The fee, kit included</span>
        <span className="t-num font-serif text-[2.25rem] leading-none">{PRICE}</span>
      </div>
    </div>
  );
}

const INCLUDED = [
  `12 weeks of live classes: ${CONTACT_HOURS} contact hours`,
  'A recording of every session',
  'A personal ESP32-C3 hardware kit, shipped free in India and theirs to keep',
  'Demo Day, a recorded pitch and a certificate of completion',
  `A cohort of at most ${SEATS_TOTAL}, building in teams of 3–4`,
];

function Check({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="9" className="fill-cobalt-soft" />
      <path d="M5.2 9.3l2.4 2.4 5-5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The one price, what it includes, and the refund terms in plain words. */
export function PriceCard({
  mode,
  cohortName,
  opensLabel,
  className,
}: {
  mode: 'open' | 'upcoming' | 'waitlist';
  cohortName?: string;
  opensLabel?: string;
  className?: string;
}) {
  const open = mode === 'open';
  // While the next cohort's format isn't fixed, don't restate the weekly hours.
  const included = mode === 'upcoming' ? ['Live classes across all four modules', ...INCLUDED.slice(1)] : INCLUDED;
  return (
    <div className={cn('tri-top relative overflow-hidden rounded-[var(--radius-md)] border border-rule bg-white p-6 pt-8 md:p-8 md:pt-10', className)}>
      <p className="t-eyebrow text-muted">{mode === 'waitlist' ? 'The current fee' : `The fee · ${cohortName}`}</p>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="t-num font-serif text-[clamp(3rem,6vw,4.25rem)] leading-none tracking-[-0.02em]">{PRICE}</span>
        <span className="text-muted">one payment, everything included</span>
      </p>
      <p className="t-small mt-3 text-muted">
        {open
          ? 'This is the full amount charged at checkout: nothing is added for the kit or delivery.'
          : mode === 'upcoming'
            ? `Confirmed when registration opens ${opensLabel}. Asking to be notified is free and commits you to nothing.`
            : 'The next cohort’s fee is confirmed when its dates are announced. Joining the waitlist is free and commits you to nothing.'}
      </p>

      <h3 className="t-label mt-7 font-semibold text-ink">What it includes</h3>
      <ul className="mt-3 space-y-2.5">
        {included.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <Check className="mt-1 shrink-0 text-cobalt" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {mode !== 'upcoming' && <p className="t-small mt-4 text-muted">{VALUE_LINE}</p>}

      <div className="mt-7 rounded-[var(--radius-sm)] bg-paper p-5">
        <h3 className="t-label font-semibold text-ink">If it isn’t the right fit</h3>
        <ul className="t-small mt-2 space-y-2 text-ink">
          <li>
            <span className="font-semibold">Session 1 guarantee.</span> Ask within 24 hours of Session 1 for a full refund, and keep the kit.
          </li>
          <li>
            <span className="font-semibold">Plans change before the start.</span> Cancel more than 48 hours before the first class for a full refund, or move to a later cohort.
          </li>
        </ul>
        <Link href="/refund-policy" className="arrow-link t-small mt-3">
          Read the refund policy <ArrowRight />
        </Link>
      </div>

      {open && <p className="t-small mt-5 text-muted">Secure checkout by Razorpay. Have a discount code? Add it in the form.</p>}
    </div>
  );
}

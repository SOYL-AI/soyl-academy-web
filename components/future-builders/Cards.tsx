import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Button';
import {
  STANDARD_OFFER,
  campTimingLine,
  formatCohortDate,
  rupees,
  type Camp,
  type CohortState,
  type Offer,
} from '@/content/future-builders';
import { cn } from '@/lib/utils';
import styles from './diwali.module.css';

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

/** ₹11,999 struck through, then the price charged. */
export function PriceLine({ list, price, className, size = 'md' }: { list: number; price: number; className?: string; size?: 'md' | 'lg' }) {
  return (
    <p className={cn('flex flex-wrap items-baseline gap-x-3 gap-y-1', className)}>
      <span className={cn('t-num font-serif leading-none tracking-[-0.02em]', size === 'lg' ? 'text-[clamp(3rem,6vw,4.25rem)]' : 'text-[2.25rem]')}>
        <span className="sr-only">Now </span>
        {rupees(price)}
      </span>
      <span className="t-num text-muted">
        <span className="sr-only">, list price </span>
        <s>{rupees(list)}</s>
      </span>
    </p>
  );
}

interface StatusCardProps {
  state: CohortState;
  /** The camp taking registrations, if any. */
  camp: Camp | null;
  /** The camp whose registration hasn't opened yet. */
  upcoming: Camp | null;
  offer: Offer;
  listPrice: number;
}


/** Hero aside: where registration stands, when the camp runs and the fee. */
export function StatusCard({ state, camp, upcoming, offer, listPrice }: StatusCardProps) {
  const shown = camp ?? upcoming;
  const diwali = offer.theme === 'diwali' && !!camp;

  if (!shown) {
    return (
      <div className="module p-6 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.4)] md:p-8">
        <p className="t-eyebrow inline-flex items-center gap-2.5 rounded-full bg-highlighter px-3.5 py-1.5 text-ink">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />
          Waitlist open
        </p>
        <p className="t-title mt-5">Next camp: dates being set</p>
        <p className="mt-3 text-muted">Registration has closed. Waitlisted families hear the next dates and fee first.</p>
        <Facts
          rows={[
            ['Format', 'Live online, recorded'],
            ['Grades', '7 to 12'],
          ]}
        />
      </div>
    );
  }

  const closing = state === 'closing-soon';
  return (
    <div className={cn('module p-6 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.4)] md:p-8', diwali && styles.cardAccent)}>
      <p className="t-eyebrow inline-flex items-center gap-2.5 rounded-full bg-highlighter px-3.5 py-1.5 text-ink">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />
        {camp ? (closing ? 'Registration closing soon' : 'Registration open') : 'Opening soon'}
      </p>
      <p className="t-title mt-5">Future Builders {shown.name}</p>
      <p className="mt-2 text-ink">{campTimingLine(shown)}.</p>
      <Facts
        rows={[
          ['Format', 'Live online, recorded'],
          ['When', `${shown.months}, in the summer break`],
          ['Grades', '7 to 12, no experience needed'],
          camp
            ? ['Registration', `${closing ? 'Closes' : 'Open until'} ${formatCohortDate(camp.registrationCloses, true)}`]
            : ['Registration', `Opens ${shown.registrationOpensLabel}`],
        ]}
      />
      <div className="mt-5 border-t border-rule pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <span className="t-small text-muted">{diwali ? `${offer.name}, kit included` : 'The fee, kit included'}</span>
          <PriceLine list={listPrice} price={offer.price} />
        </div>
        {diwali && offer.endsLabel && (
          <p className="t-small mt-2 text-right text-muted">
            Until {offer.endsLabel}; {rupees(STANDARD_OFFER.price)} after that.
          </p>
        )}
      </div>
    </div>
  );
}

const INCLUDED = [
  'Live online classes across all four modules: software, AI, IoT and entrepreneurship',
  'A recording of every session',
  'A personal ESP32-C3 hardware kit, shipped free in India and theirs to keep',
  'Demo Day, a recorded pitch and a certificate of completion',
  'A team project in groups of 3–4, reviewed by an instructor',
];

function Check({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="9" className="fill-cobalt-soft" />
      <path d="M5.2 9.3l2.4 2.4 5-5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The one price (list price struck through), what it includes, and the refund terms in plain words. */
export function PriceCard({
  mode,
  campName,
  opensLabel,
  offer,
  listPrice,
  className,
}: {
  mode: 'open' | 'upcoming' | 'waitlist';
  campName?: string;
  opensLabel?: string;
  offer: Offer;
  listPrice: number;
  className?: string;
}) {
  const open = mode === 'open';
  const diwali = open && offer.theme === 'diwali';
  return (
    <div className={cn('tri-top relative overflow-hidden rounded-[var(--radius-md)] border border-rule bg-white p-6 pt-8 md:p-8 md:pt-10', diwali && styles.cardAccent, className)}>
      <p className="t-eyebrow text-muted">{mode === 'waitlist' ? 'The last fee' : `The fee · ${campName}`}</p>
      {diwali && (
        <p className={cn('t-small mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold', styles.chip)}>
          {offer.name} · until {offer.endsLabel}
        </p>
      )}
      <PriceLine list={listPrice} price={offer.price} size="lg" className="mt-3" />
      <p className="mt-2 text-muted">One payment, everything included.</p>
      <p className="t-small mt-3 text-muted">
        {open
          ? `This is the full amount charged at checkout: nothing is added for the kit or delivery.${diwali ? ` From the end of the offer the fee is ${rupees(STANDARD_OFFER.price)}.` : ''}`
          : mode === 'upcoming'
            ? `Confirmed when registration opens ${opensLabel}. Asking to be notified is free and commits you to nothing.`
            : 'The next camp’s fee is confirmed when its dates are announced. Joining the waitlist is free and commits you to nothing.'}
      </p>

      <h3 className="t-label mt-7 font-semibold text-ink">What it includes</h3>
      <ul className="mt-3 space-y-2.5">
        {INCLUDED.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <Check className="mt-1 shrink-0 text-cobalt" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-[var(--radius-sm)] bg-paper p-5">
        <h3 className="t-label font-semibold text-ink">If it isn’t the right fit</h3>
        <ul className="t-small mt-2 space-y-2 text-ink">
          <li>
            <span className="font-semibold">Session 1 guarantee.</span> Ask within 24 hours of Session 1 for a full refund, and keep the kit.
          </li>
          <li>
            <span className="font-semibold">Plans change before the start.</span> Cancel more than 48 hours before the first class for a full refund, or move to a later camp.
          </li>
        </ul>
        <Link href="/refund-policy" className="arrow-link t-small mt-3">
          Read the refund policy <ArrowRight />
        </Link>
      </div>

      {open && <p className="t-small mt-5 text-muted">Secure checkout by Razorpay. Registering with a friend? Use code FRIEND500 in the form.</p>}
    </div>
  );
}


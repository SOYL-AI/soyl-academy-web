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
import { Dab } from '@/components/brush/marks';
import styles from './offer.module.css';

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="t-small mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 border-t border-ink/15 pt-5">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-graphite">{k}</dt>
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
      <span className="t-num text-graphite">
        <span className="sr-only">, list price </span>
        <s className="decoration-vermilion decoration-2">{rupees(list)}</s>
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
  const festive = offer.theme === 'festive' && !!camp;

  if (!shown) {
    return (
      <div className="leaf tape tilt-r p-6 md:p-8">
        <p className="hand inline-flex items-center gap-2.5 text-[1.3rem] text-vermilion-ink">
          <Dab ink="vermilion" />
          Waitlist open
        </p>
        <p className="t-title mt-5">Next camp: dates being set</p>
        <p className="mt-3 text-graphite">Registration has closed. Waitlisted families hear the next dates and fee first.</p>
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
    <div className={cn('leaf tape tilt-r p-6 md:p-8', festive && styles.cardAccent)}>
      <p className="hand inline-flex items-center gap-2.5 text-[1.3rem] text-vermilion-ink">
        <Dab ink="vermilion" />
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
      <div className="mt-5 border-t border-ink/15 pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <span className="t-small text-graphite">{festive ? `${offer.name}, kit included` : 'The fee, kit included'}</span>
          <PriceLine list={listPrice} price={offer.price} />
        </div>
        {festive && offer.endsLabel && (
          <p className="t-small mt-2 text-right text-graphite">
            Until {offer.endsLabel}; {rupees(STANDARD_OFFER.price)} after that.
          </p>
        )}
      </div>
    </div>
  );
}

const INCLUDED = [
  'Live online classes: software, AI, IoT and entrepreneurship',
  'A recording of every session',
  'A personal ESP32-C3 kit, shipped free in India, theirs to keep',
  'Demo Day, a recorded pitch and a certificate of completion',
  'A team project in groups of 3–4, reviewed by an instructor',
];

function Check({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <path d="M3 9.6 C 4.6 10.8, 6 12.4, 7 14 C 9 9.4, 11.6 6, 15.4 3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  const festive = open && offer.theme === 'festive';
  return (
    <div className={cn('leaf tape-r relative p-6 pt-8 md:p-8 md:pt-10', festive && styles.cardAccent, className)}>
      <p className="hand text-[1.25rem] text-graphite">{mode === 'waitlist' ? 'The last fee' : `The fee · ${campName}`}</p>
      {festive && (
        <p className={cn('t-small mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold', styles.chip)}>
          {offer.name} · until {offer.endsLabel}
        </p>
      )}
      <PriceLine list={listPrice} price={offer.price} size="lg" className="mt-3" />
      <p className="mt-2 text-graphite">One payment, everything included.</p>
      <p className="t-small mt-3 text-graphite">
        {open
          ? `This is the full amount charged at checkout: nothing is added for the kit or delivery.${festive ? ` From the end of the offer the fee is ${rupees(STANDARD_OFFER.price)}.` : ''}`
          : mode === 'upcoming'
            ? `Confirmed when registration opens ${opensLabel}. Asking to be notified is free and commits you to nothing.`
            : 'The next camp’s fee is confirmed when its dates are announced. Joining the waitlist is free and commits you to nothing.'}
      </p>

      <h3 className="t-label mt-7 font-semibold text-ink">What it includes</h3>
      <ul className="mt-3 space-y-2.5">
        {INCLUDED.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <Check className="mt-1 shrink-0 text-sap" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="sketch-soft mt-7 bg-sheet p-5">
        <h3 className="t-label font-semibold text-ink">If it isn’t the right fit</h3>
        <ul className="t-small mt-2 space-y-2 text-ink">
          <li>
            <span className="font-semibold">Session 1 guarantee.</span> Ask within 24 hours of Session 1 for a full refund, and keep the kit.
          </li>
          <li>
            <span className="font-semibold">Plans change before the start.</span> Cancel more than 48 hours before the first class for a full refund, or move to a later camp.
          </li>
        </ul>
        <Link href="/refund-policy" className="t-small mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
          Read the refund policy <ArrowRight />
        </Link>
      </div>

      {open && <p className="t-small mt-5 text-graphite">Secure checkout by Razorpay. Registering with a friend? Use code FRIEND500 in the form.</p>}
    </div>
  );
}


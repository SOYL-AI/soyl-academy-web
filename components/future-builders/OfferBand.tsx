import { rupees, type Offer } from '@/content/future-builders';
import { cn } from '@/lib/utils';
import { OfferCountdown } from './OfferCountdown';
import styles from './offer.module.css';

/** A paper kite with a ribboned tail (decorative), for the Children's Day offer. */
export function Kite({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={cn(styles.kite, className)}>
      <path d="M30 4 50 22 30 42 10 22z" fill="#ffc94a" />
      <path d="M30 4 50 22 30 22z" fill="#f28c28" />
      <path d="M30 22 30 42 10 22z" fill="#f28c28" />
      <path d="M30 4v38M10 22h40" stroke="#fff7e8" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M30 42c-2 6 4 8 2 13s-6 5-4 8" fill="none" stroke="#fff7e8" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27 48l3 1.6-3 1.6zM35 48l-3 1.6 3 1.6z" fill="#ffc94a" />
      <path d="M28 57l3 1.4-3 1.4zM36 57l-3 1.4 3 1.4z" fill="#f28c28" />
    </svg>
  );
}

/** A medallion drawn in line (decorative): petal rings around a dotted centre. */
export function Rangoli({ className }: { className?: string }) {
  const outer = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
  const dots = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle r="96" strokeDasharray="2 5" />
      <circle r="86" />
      {dots.map((a) => (
        <circle key={`d${a}`} r="2.2" cx={0} cy={-91} transform={`rotate(${a})`} fill="currentColor" stroke="none" />
      ))}
      {outer.map((a) => (
        <path key={`o${a}`} d="M0-80C10-66 10-50 0-38C-10-50-10-66 0-80z" transform={`rotate(${a})`} />
      ))}
      <circle r="38" />
      {inner.map((a) => (
        <path key={`i${a}`} d="M0-36C7-28 7-20 0-12C-7-20-7-28 0-36z" transform={`rotate(${a})`} fill="currentColor" fillOpacity="0.35" />
      ))}
      <circle r="10" />
      <circle r="4" fill="currentColor" />
    </svg>
  );
}

interface OfferBandProps {
  offer: Offer;
  listPrice: number;
  /** Price after the offer, for the "ended" text. */
  nextPrice: number;
  /** Dev preview clock offset, see OfferCountdown. */
  offsetMs?: number;
}

/**
 * The page opens with the offer while it runs: price, list price, end time and a live countdown.
 * A full-width band above the regular hero, so the programme content below keeps its usual look.
 */
export function OfferBand({ offer, listPrice, nextPrice, offsetMs }: OfferBandProps) {
  if (!offer.endsAt) return null;
  return (
    <section className={styles.band} aria-labelledby="offer-band-title">
      <Rangoli className={cn(styles.rangoli, styles.rangoliLeft)} />
      <Rangoli className={cn(styles.rangoli, styles.rangoliRight)} />
      <div className="page grid-12 items-center gap-y-7 py-9 md:py-12">
        <div className="col-span-12 lg:col-span-7">
          <p className={cn('t-eyebrow flex items-center gap-2.5', styles.eyebrow)}>
            <Kite size={30} />
            {offer.name} · Future Builders summer camp
          </p>
          <p id="offer-band-title" className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-serif leading-none">
            <span className={cn('t-num text-[clamp(3rem,9vw,4.75rem)] tracking-[-0.02em]', styles.price)}>
              <span className="sr-only">{offer.name}: </span>
              {rupees(offer.price)}
            </span>
            <span className={cn('t-num text-[clamp(1.5rem,4vw,2rem)]', styles.muted)}>
              (<span className="sr-only">list price </span>
              <s>{rupees(listPrice)}</s>)
            </span>
          </p>
          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed">
            <span className={cn('t-small mr-2 inline-block rounded-full px-2.5 py-0.5 font-semibold', styles.save)}>Save {rupees(listPrice - offer.price)}</span>
            The full programme, live online with the hardware kit, this Children’s Day only.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:justify-self-end">
          <p className="t-small font-semibold">Offer ends {offer.endsLabel} (IST)</p>
          <OfferCountdown
            endsAt={offer.endsAt}
            offsetMs={offsetMs}
            endedText={`The ${offer.label ?? offer.name} has ended. The fee is now ${rupees(nextPrice)}.`}
            className="mt-3"
          />
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#enroll" className={styles.cta} data-track="enrol" data-track-at={offer.campaign ?? 'offer'}>
              Register at {rupees(offer.price)}
            </a>
            <a href="#talk" className={cn('font-semibold', styles.ctaSecondary)} data-track="talk" data-track-at={offer.campaign ?? 'offer'}>
              Talk to us first
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

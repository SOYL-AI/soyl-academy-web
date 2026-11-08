import { rupees, type Offer } from '@/content/future-builders';
import { cn } from '@/lib/utils';
import { DiwaliCountdown } from './DiwaliCountdown';
import styles from './diwali.module.css';

/** A clay diya with a softly glowing flame (decorative). */
export function Diya({ id, className, size = 28 }: { id: string; className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={cn(styles.diya, className)}>
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd56b" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffd56b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-clay`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9692f" />
          <stop offset="100%" stopColor="#8f2f17" />
        </linearGradient>
      </defs>
      <circle className={styles.halo} cx="32" cy="22" r="20" fill={`url(#${id}-glow)`} />
      <g className={styles.flame}>
        <path d="M32 6c4.6 6.4 7 10.8 7 14.6A7 7 0 0 1 32 27.5a7 7 0 0 1-7-6.9C25 16.8 27.4 12.4 32 6z" fill="#ffb627" />
        <path d="M32 13.5c2.3 3.3 3.4 5.6 3.4 7.4a3.4 3.4 0 0 1-6.8 0c0-1.8 1.1-4.1 3.4-7.4z" fill="#fff3c4" />
      </g>
      <path d="M6 33c8 2.6 17 3.6 26 3.6S50 35.6 58 33c-1.8 10.6-12.4 18-26 18S7.8 43.6 6 33z" fill={`url(#${id}-clay)`} />
      <path d="M12 38.5c6 1.8 13 2.7 20 2.7s14-.9 20-2.7" fill="none" stroke="#ffc94a" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      <circle cx="22" cy="45" r="1.4" fill="#ffc94a" />
      <circle cx="32" cy="46.5" r="1.4" fill="#ffc94a" />
      <circle cx="42" cy="45" r="1.4" fill="#ffc94a" />
      <ellipse cx="32" cy="55" rx="15" ry="2.2" fill="#000" opacity="0.18" />
    </svg>
  );
}

/** A rangoli medallion drawn in line (decorative): petal rings around a dotted centre. */
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

interface DiwaliOfferBandProps {
  offer: Offer;
  listPrice: number;
  /** Price after the offer, for the "ended" text. */
  nextPrice: number;
  /** Dev preview clock offset, see DiwaliCountdown. */
  offsetMs?: number;
}

/**
 * The page opens with the offer while it runs: price, list price, end time and a live countdown.
 * A full-width band above the regular hero, so the programme content below keeps its usual look.
 */
export function DiwaliOfferBand({ offer, listPrice, nextPrice, offsetMs }: DiwaliOfferBandProps) {
  if (!offer.endsAt) return null;
  return (
    <section className={styles.band} aria-labelledby="diwali-offer-title">
      <Rangoli className={cn(styles.rangoli, styles.rangoliLeft)} />
      <Rangoli className={cn(styles.rangoli, styles.rangoliRight)} />
      <div className="page grid-12 items-center gap-y-7 py-9 md:py-12">
        <div className="col-span-12 lg:col-span-7">
          <p className={cn('t-eyebrow flex items-center gap-2.5', styles.eyebrow)}>
            <Diya id="dw-band" size={30} />
            {offer.name} · Future Builders summer camp
          </p>
          <p id="diwali-offer-title" className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-serif leading-none">
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
            The full programme, live online with the hardware kit, for this Diwali only.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:justify-self-end">
          <p className="t-small font-semibold">Offer ends {offer.endsLabel} (IST)</p>
          <DiwaliCountdown
            endsAt={offer.endsAt}
            offsetMs={offsetMs}
            endedText={`The Diwali offer has ended. The fee is now ${rupees(nextPrice)}.`}
            className="mt-3"
          />
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#enroll" className={styles.cta} data-track="enrol" data-track-at="diwali">
              Register at {rupees(offer.price)}
            </a>
            <a href="#talk" className={cn('font-semibold', styles.ctaSecondary)} data-track="talk" data-track-at="diwali">
              Talk to us first
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

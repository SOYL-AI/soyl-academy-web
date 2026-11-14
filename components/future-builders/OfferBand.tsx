import { rupees, type Offer } from '@/content/future-builders';
import { cn } from '@/lib/utils';
import { Marked } from '@/components/brush/marks';
import { OfferCountdown } from './OfferCountdown';
import styles from './offer.module.css';

/** A paper kite with a ribboned tail (decorative), for the Children's Day offer, in the brush pigments. */
export function Kite({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={cn(styles.kite, className)}>
      <path d="M30 4 50 22 30 42 10 22z" fill="#e2b13c" />
      <path d="M30 4 50 22 30 22z" fill="#cf4a2e" />
      <path d="M30 22 30 42 10 22z" fill="#2b48c8" />
      <path d="M30 4v38M10 22h40" stroke="#1f1c19" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M30 42c-2 6 4 8 2 13s-6 5-4 8" fill="none" stroke="#1f1c19" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27 48l3 1.6-3 1.6zM35 48l-3 1.6 3 1.6z" fill="#cf4a2e" />
      <path d="M28 57l3 1.4-3 1.4zM36 57l-3 1.4 3 1.4z" fill="#e2b13c" />
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
 * The page opens with the offer while it runs (ADR-033 brush styling): a ticket pinned to the page with the price,
 * the struck-through list price, the end time and a live countdown.
 */
export function OfferBand({ offer, listPrice, nextPrice, offsetMs }: OfferBandProps) {
  if (!offer.endsAt) return null;
  return (
    <section className={cn('bg-sheet-deep', styles.band)} aria-labelledby="offer-band-title">
      <div className="page py-7 md:py-10">
        <div className="leaf tape tape-r grid-12 items-center gap-y-7 px-5 py-7 md:px-10 md:py-9">
          <div className="col-span-12 lg:col-span-7">
            <p className="hand flex items-center gap-2.5 text-[1.3rem] text-vermilion-ink">
              <Kite size={30} />
              {offer.name} · Future Builders summer camp
            </p>
            <p id="offer-band-title" className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-serif leading-none">
              <span className="t-num text-[clamp(3rem,9vw,4.75rem)] tracking-[-0.02em] text-ink">
                <span className="sr-only">{offer.name}: </span>
                {rupees(offer.price)}
              </span>
              <span className="t-num text-[clamp(1.5rem,4vw,2rem)] text-graphite">
                <span className="sr-only">list price </span>
                <Marked mark="strike" ink="vermilion" weight={3} load delay={400}>
                  {rupees(listPrice)}
                </Marked>
              </span>
            </p>
            <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink">
              <span className="swipe mr-1 font-semibold">Save {rupees(listPrice - offer.price)}.</span> The full programme with the hardware kit, this Children’s Day only.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:justify-self-end">
            <p className="t-small font-semibold text-ink">Offer ends {offer.endsLabel} (IST)</p>
            <OfferCountdown
              endsAt={offer.endsAt}
              offsetMs={offsetMs}
              endedText={`The ${offer.label ?? offer.name} has ended. The fee is now ${rupees(nextPrice)}.`}
              className="mt-3"
            />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#enroll"
                className="press btn-brush inline-flex h-[52px] items-center justify-center bg-ink px-7 font-semibold text-sheet hover:bg-ultramarine"
                data-track="enrol"
                data-track-at={offer.campaign ?? 'offer'}
              >
                Register at {rupees(offer.price)}
              </a>
              <a
                href="#talk"
                className="inline-flex min-h-11 items-center font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine"
                data-track="talk"
                data-track-at={offer.campaign ?? 'offer'}
              >
                Talk to us first
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

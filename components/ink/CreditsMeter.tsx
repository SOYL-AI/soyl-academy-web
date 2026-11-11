import { drops, type Bonus } from '@/lib/pricing/refill';
import { cn } from '@/lib/utils';
import s from './CreditsMeter.module.css';

interface CreditsMeterProps {
  /** AI credits a day: the Free plan's `creditsPerDay` (lib/pricing/refill.ts `midnightRefill()`). */
  credits: number;
  /** "midnight, India time" */
  refillsAt: string;
  /** The learning bonuses (credit-bonuses.ts), drawn as small leaf drops. */
  bonuses?: readonly Bonus[];
  className?: string;
}

/**
 * The midnight refill (plan §4, device 5): the free daily AI allowance drawn as painted drops, one drop a credit
 * (grouped when the number is large, `drops()`), with when it refills and what learning adds. The drops wipe in
 * once when they scroll into view (RevealObserver), the refill in miniature; with reduced motion or without JS
 * they are simply there. The drops are decorative; the caption carries every number.
 *
 * Numbers come in as props from config; nothing here hard-codes an allowance.
 */
export function CreditsMeter({ credits, refillsAt, bonuses = [], className }: CreditsMeterProps) {
  const meter = drops(credits);
  return (
    <div className={cn(s.meter, className)} data-testid="credits-meter">
      <div className={s.drops} aria-hidden="true" data-reveal="ink-wipe">
        {Array.from({ length: meter.count }, (_, i) => (
          <span key={i} className={s.drop} />
        ))}
      </div>
      <div className={s.caption}>
        <p className={s.amount}>
          <span className={s.number}>{credits}</span> free AI credits every day
        </p>
        <p>
          {meter.perDrop > 1 ? `Each drop is ${meter.perDrop} credits. ` : ''}They refill at {refillsAt}. Credits left at the end of a day do not carry over.
        </p>
      </div>
      {bonuses.length ? (
        <ul className={s.bonuses} aria-label="Bonus credits for learning">
          {bonuses.map((b) => (
            <li key={b.when} className={s.bonus}>
              <span className={s.bonusDrops} aria-hidden="true">
                {Array.from({ length: drops(b.credits).count }, (_, i) => (
                  <span key={i} className={s.bonusDrop} />
                ))}
              </span>
              <span>
                <strong>+{b.credits}</strong> on {b.when}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

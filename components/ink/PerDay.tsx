import type { PriceRow } from '@/lib/pricing/price-rows';
import { cn } from '@/lib/utils';
import s from './PerDay.module.css';

/**
 * A price in a parent's units (plan §4, device 7): "About ₹6.60 a day", optionally "until 31 March 2027".
 * The figure is computed by lib/pricing/per-day.ts from config (never written here). Works on paper and inside
 * the platform, where it follows the app's light or dark theme.
 */
export function PerDay({ perDay, until, className }: { perDay: string; until?: string | null; className?: string }) {
  return (
    <span className={cn(s.perDay, className)}>
      About <span className={s.money}>{perDay}</span> a day{until ? ` until ${until}` : ''}
    </span>
  );
}

/**
 * Every paid price with its per-day figure, one line per plan (`priceRows()` from lib/pricing/price-rows.ts):
 * "Plus, 100 AI credits a day: ₹199 a month, about ₹6.60 a day". A description list, so each price is read with
 * its plan.
 */
export function PriceList({ rows, className }: { rows: readonly PriceRow[]; className?: string }) {
  const plans: { id: string; name: string; credits: number; rows: PriceRow[] }[] = [];
  for (const r of rows) {
    const last = plans[plans.length - 1];
    if (last && last.id === r.planId) last.rows.push(r);
    else plans.push({ id: r.planId, name: r.planName, credits: r.creditsPerDay, rows: [r] });
  }
  return (
    <dl className={cn(s.list, className)}>
      {plans.map((p) => (
        <div key={p.id} className={s.row} data-plan={p.id}>
          <dt className={s.plan}>
            {p.name}
            <span className={s.credits}>{p.credits} AI credits a day</span>
          </dt>
          <dd className={s.prices}>
            {p.rows.map((r) => (
              <p key={r.interval} className={s.price}>
                <span>
                  <span className={cn(s.money, s.amount)}>{r.price}</span> {r.period}
                </span>
                <PerDay perDay={r.perDay} until={r.until} className={s.each} />
              </p>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

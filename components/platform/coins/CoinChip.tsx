'use client';

/** Header chip: the member's SOYL Coins balance, linking to /coins. A dot marks an open daily check-in. */
import Link from 'next/link';
import { cx } from '@/components/platform/ui/cx';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { coinsText } from './coins-format';
import { useCoins } from './CoinsProvider';
import s from './coins.module.css';

export function CoinChip({ className }: { className?: string }) {
  const { summary } = useCoins();
  if (!summary) return null;
  const open = !summary.checkIn.checkedInToday;
  return (
    <Link href="/coins" className={cx(s.chip, className)} data-testid="coin-chip" data-balance={summary.balance}>
      <span className="p-visually-hidden">
        {coinsText(summary.balance)}
        {open ? ', daily check-in open' : ''}, SOYL Coins
      </span>
      <Icon name="coin" size={18} className={s.chipIcon} />
      <span className={s.chipBalance} aria-hidden="true">
        {summary.balance.toLocaleString('en-IN')}
      </span>
      {open && <span className={s.chipDot} aria-hidden="true" />}
    </Link>
  );
}

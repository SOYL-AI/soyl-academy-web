'use client';

import { useEffect, useState } from 'react';
import { cx } from '../cx';
import { Icon } from './Icon';
import s from './Display.module.css';

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** The next 00:00 in Asia/Kolkata (credits reset daily at IST midnight, CONTEXT §6). IST has no DST. */
export function nextIstMidnight(now: Date): Date {
  const ist = new Date(now.getTime() + IST_OFFSET_MS);
  const nextUtcMidnightOfIstDay = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate() + 1);
  return new Date(nextUtcMidnightOfIstDay - IST_OFFSET_MS);
}

/** "5h 12m", "12m", "<1m". */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return '0m';
  const totalMin = Math.floor(ms / 60_000);
  if (totalMin < 1) return '<1m';
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export interface CreditChipProps {
  /** Credits left today. Display only; the API is the source of truth. */
  balance: number;
  /** When the balance resets; defaults to the next IST midnight. */
  resetAt?: Date | string;
  /** Show a warning border at or below this balance. */
  lowAt?: number;
  className?: string;
}

/**
 * Placeholder credit display (M1): balance + reset countdown. The countdown renders only after
 * mount, so server HTML and hydration never disagree about the time.
 */
export function CreditChip({ balance, resetAt, lowAt = 3, className }: CreditChipProps) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const reset = now ? (resetAt ? new Date(resetAt) : nextIstMidnight(now)) : null;
  const countdown = now && reset ? formatCountdown(reset.getTime() - now.getTime()) : null;
  const label = `${balance} AI credit${balance === 1 ? '' : 's'} left today${countdown ? `, resets in ${countdown}` : ', resets at midnight IST'}`;

  return (
    <span className={cx(s.credit, balance <= lowAt && s.creditLow, className)}>
      <span className="p-visually-hidden">{label}</span>
      <Icon name="spark" size={18} className={s.creditIcon} />
      <span className={s.creditBalance} aria-hidden="true">
        {balance}
      </span>
      <span className={s.creditReset} aria-hidden="true">
        {countdown ? `resets in ${countdown}` : 'resets 12 am IST'}
      </span>
    </span>
  );
}

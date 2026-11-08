'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './diwali.module.css';

interface Left {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function timeLeft(endsAtMs: number, nowMs: number): Left {
  const total = Math.max(0, endsAtMs - nowMs);
  const s = Math.floor(total / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60, total };
}

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`;

interface Props {
  /** ISO timestamp, exclusive. */
  endsAt: string;
  /** Dev preview only: the server's preview "now" minus its real now, so the clock matches COHORT_PREVIEW_DATE. */
  offsetMs?: number;
  /** Shown once the countdown reaches zero (the page is cached for a few minutes). */
  endedText: string;
  className?: string;
}

/**
 * Live countdown to the end of the offer. The digits tick every second but are hidden from
 * screen readers; the timer's accessible name is a sentence that changes once a minute, and it
 * is not a live region, so nothing is announced unprompted. Renders nothing until mounted, so the
 * server HTML never disagrees with the client clock.
 */
export function DiwaliCountdown({ endsAt, offsetMs = 0, endedText, className }: Props) {
  const endsAtMs = new Date(endsAt).getTime();
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    const tick = () => setLeft(timeLeft(endsAtMs, Date.now() + offsetMs));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endsAtMs, offsetMs]);

  if (!left) return <div className={cn(styles.count, className)} style={{ minHeight: 64 }} aria-hidden="true" />;
  if (left.total === 0) {
    return (
      <p role="status" className={cn('font-semibold', className)}>
        {endedText}
      </p>
    );
  }

  const label = `Offer ends in ${[left.days ? plural(left.days, 'day') : '', plural(left.hours, 'hour'), plural(left.minutes, 'minute')].filter(Boolean).join(', ')}`;
  const units: [number, string][] = [
    [left.days, left.days === 1 ? 'day' : 'days'],
    [left.hours, 'hrs'],
    [left.minutes, 'min'],
    [left.seconds, 'sec'],
  ];
  return (
    <div role="timer" aria-label={label} className={cn(styles.count, className)}>
      {units.map(([n, unit]) => (
        <span key={unit} className={styles.countBox} aria-hidden="true">
          <span className={cn(styles.countNum, 'font-serif')}>{String(n).padStart(2, '0')}</span>
          <span className={styles.countUnit}>{unit}</span>
        </span>
      ))}
    </div>
  );
}

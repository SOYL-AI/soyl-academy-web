'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LAST_SEATS,
  REGISTRATION_CLOSES,
  REGISTRATION_CLOSES_AT,
  SCHOLARSHIP_SEATS,
  SEATS_FILLED,
  SEATS_LEFT,
  SEATS_TOTAL,
  seatsLabel,
} from '@/content/future-builders';

/** "Seats left: 7 of 10" with one block per seat. Values come from content/future-builders.ts. */
export function SeatCounter({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <p className={cn('font-bold flex items-center gap-2', compact ? 'text-sm' : 'text-base sm:text-lg', LAST_SEATS && 'text-brand-red')}>
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
        </span>
        {seatsLabel}
      </p>
      <div className="flex gap-1" role="img" aria-label={`${SEATS_FILLED} of ${SEATS_TOTAL} seats taken`}>
        {Array.from({ length: SEATS_TOTAL }, (_, i) => (
          <span
            key={i}
            className={cn(
              'border-2 border-brand-black rounded-[3px]',
              compact ? 'h-3 w-4' : 'h-4 w-5 sm:w-6',
              i < SEATS_FILLED ? 'bg-brand-black' : 'bg-white'
            )}
          />
        ))}
      </div>
      {SCHOLARSHIP_SEATS > 0 && SEATS_LEFT > 0 && (
        <p className="text-sm font-bold text-brand-blue">
          {SCHOLARSHIP_SEATS} need-based scholarship seat{SCHOLARSHIP_SEATS === 1 ? '' : 's'} available — ask on WhatsApp.
        </p>
      )}
    </div>
  );
}

function remaining(): number {
  return new Date(REGISTRATION_CLOSES_AT).getTime() - Date.now();
}

/** Live "Registration closes in 4d 6h 12m". Renders the static date until mounted, so SSR and client agree. */
export function RegistrationCountdown({ className }: { className?: string }) {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(remaining());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  let text = `Registration closes ${REGISTRATION_CLOSES}`;
  if (ms !== null) {
    if (ms <= 0) {
      text = 'Registration has closed · message us for the waitlist';
    } else {
      const d = Math.floor(ms / 86_400_000);
      const h = Math.floor((ms % 86_400_000) / 3_600_000);
      const m = Math.floor((ms % 3_600_000) / 60_000);
      text = `Registration closes in ${d > 0 ? `${d}d ` : ''}${h}h ${m}m`;
    }
  }

  return (
    <p className={cn('font-bold tabular-nums', className)} aria-live="off">
      ⏳ {text}
    </p>
  );
}

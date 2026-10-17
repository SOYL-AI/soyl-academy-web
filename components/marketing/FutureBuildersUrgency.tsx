'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  REGISTRATION_CLOSES,
  REGISTRATION_CLOSES_AT,
  SCHOLARSHIP_SEATS,
} from '@/content/future-builders';

const DAY = 86_400_000;
const HOUR = 3_600_000;
const MINUTE = 60_000;

/** Milliseconds until registration closes; null until mounted, so SSR and client agree. */
function useDeadline() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(new Date(REGISTRATION_CLOSES_AT).getTime() - Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return ms;
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

function deadlineText(ms: number | null) {
  if (ms === null) return `Registration closes ${REGISTRATION_CLOSES}`;
  if (ms <= 0) return 'Registration has closed · message us for the waitlist';
  const d = Math.floor(ms / DAY);
  const h = Math.floor((ms % DAY) / HOUR);
  const m = Math.floor((ms % HOUR) / MINUTE);
  if (d === 0) return `Last day! Registration closes in ${h}h ${m}m`;
  return `${plural(d, 'day')} ${plural(h, 'hr')} left to register · closes ${REGISTRATION_CLOSES}`;
}

/** Inline "5 days 3 hrs left to register · closes Oct 22". */
export function RegistrationCountdown({ className }: { className?: string }) {
  const ms = useDeadline();
  return (
    <span className={cn('font-bold tabular-nums', className)}>
      ⏳ {deadlineText(ms)}
    </span>
  );
}

/** Large days / hours / minutes tiles counting down to registration close. */
export function DeadlineCounter({ className, compact = false }: { className?: string; compact?: boolean }) {
  const ms = useDeadline();
  const left = ms === null ? null : Math.max(0, ms);
  const units = [
    { label: 'Days', value: left === null ? null : Math.floor(left / DAY) },
    { label: 'Hrs', value: left === null ? null : Math.floor((left % DAY) / HOUR) },
    { label: 'Mins', value: left === null ? null : Math.floor((left % HOUR) / MINUTE) },
  ];

  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <p className={cn('font-bold text-brand-red flex items-center gap-2', compact ? 'text-sm' : 'text-base sm:text-lg')}>
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
        </span>
        {ms !== null && ms <= 0 ? 'Registration has closed' : `Registration closes ${REGISTRATION_CLOSES}, 11:59 pm IST`}
      </p>
      <div className="flex gap-2" role="timer" aria-label={deadlineText(ms)}>
        {units.map((u) => (
          <div
            key={u.label}
            className={cn(
              'flex flex-col items-center justify-center border-2 border-brand-black rounded-lg bg-white shadow-[2px_2px_0_0_#141414]',
              compact ? 'w-14 py-1' : 'w-16 sm:w-20 py-2'
            )}
          >
            <span className={cn('font-bold tabular-nums leading-none', compact ? 'text-xl' : 'text-3xl sm:text-4xl')}>
              {u.value === null ? '–' : String(u.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-black/60 mt-1">{u.label}</span>
          </div>
        ))}
      </div>
      {SCHOLARSHIP_SEATS > 0 && (
        <p className="text-sm font-bold text-brand-blue">
          {SCHOLARSHIP_SEATS} need-based scholarship seat{SCHOLARSHIP_SEATS === 1 ? '' : 's'} available — ask on WhatsApp.
        </p>
      )}
    </div>
  );
}

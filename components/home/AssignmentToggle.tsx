'use client';

import { useState } from 'react';
import { shift } from '@/content/home';
import { cn } from '@/lib/utils';

type Mode = 'old' | 'soyl';

const OPTIONS: { mode: Mode; label: string }[] = [
  { mode: 'old', label: 'Traditional' },
  { mode: 'soyl', label: 'SOYL' },
];

/**
 * One assignment, two lives. Static by default (rests on the SOYL version);
 * the toggle swaps in place. Both cards share one grid cell, so switching never
 * changes the height of the page.
 */
export function AssignmentToggle() {
  const [mode, setMode] = useState<Mode>('soyl');
  const isOld = mode === 'old';

  return (
    <div>
      <div
        role="group"
        aria-label="Compare the traditional and SOYL versions of the assignment"
        className="relative mb-5 inline-grid grid-cols-2 rounded-full border border-rule bg-paper p-1"
      >
        {/* Sliding thumb */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)]',
            isOld ? 'translate-x-0' : 'translate-x-full'
          )}
        />
        {OPTIONS.map((opt) => {
          const active = mode === opt.mode;
          return (
            <button
              key={opt.mode}
              type="button"
              aria-pressed={active}
              onClick={() => setMode(opt.mode)}
              className={cn(
                'relative z-10 h-10 min-w-[7.5rem] rounded-full px-5 text-[15px] font-semibold transition-colors duration-300',
                active ? 'text-white' : 'text-ink hover:text-cobalt'
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="grid">
        {/* The worksheet */}
        <article
          aria-hidden={!isOld}
          style={{ gridArea: '1 / 1' }}
          className={cn(
            'rounded-[var(--radius-md)] border border-rule bg-paper px-6 py-8 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] md:px-10 md:py-10',
            isOld ? 'opacity-100' : 'pointer-events-none invisible translate-y-2 opacity-0'
          )}
        >
          <div className="mb-6 flex items-baseline justify-between gap-3">
            <span className="t-label text-muted">{shift.old.subject}</span>
            <span className="t-label t-num text-muted">Due Monday</span>
          </div>
          <p className="t-eyebrow mb-3 text-muted">Homework</p>
          <p className="t-title max-w-[22ch]">{shift.old.prompt}</p>
          <p className="t-small mt-10 max-w-[44ch] border-l-2 border-red-pen pl-3 text-ink">
            One prompt, one answer, one mark. A chatbot can write it in seconds, and the mark looks the same.
          </p>
        </article>

        {/* The SOYL challenge */}
        <article
          aria-hidden={isOld}
          style={{ gridArea: '1 / 1' }}
          className={cn(
            'rounded-[var(--radius-md)] border border-rule bg-white px-6 py-8 shadow-[0_30px_60px_-40px_rgba(20,20,20,0.35)] transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] md:px-10 md:py-10',
            isOld ? 'pointer-events-none invisible translate-y-2 opacity-0' : 'opacity-100'
          )}
        >
          <p className="t-eyebrow mb-3 text-cobalt">{shift.soyl.eyebrow}</p>
          <p className="t-title mb-7 max-w-[24ch]">{shift.soyl.prompt}</p>
          <ul className="border-t border-rule">
            {shift.soyl.tasks.map((task) => (
              <li key={task.tag} className="flex items-start justify-between gap-4 border-b border-rule py-4">
                <span>{task.text}</span>
                <span className="t-label shrink-0 rounded-full bg-highlighter px-2.5 py-0.5 text-ink">{task.tag}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

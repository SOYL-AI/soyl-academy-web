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
        className="mb-4 inline-flex border border-ink bg-white p-0.5"
      >
        {OPTIONS.map((opt) => {
          const active = mode === opt.mode;
          return (
            <button
              key={opt.mode}
              type="button"
              aria-pressed={active}
              onClick={() => setMode(opt.mode)}
              className={cn(
                'press h-10 min-w-[7.5rem] px-4 text-[15px] font-semibold',
                active ? 'bg-ink text-white' : 'text-ink hover:bg-paper'
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
            'ruled margin-line border border-rule px-6 py-8 pl-14 transition-opacity duration-200 md:px-10 md:pl-16',
            isOld ? 'opacity-100' : 'pointer-events-none invisible opacity-0'
          )}
        >
          <div className="mb-6 flex items-baseline justify-between gap-3">
            <span className="t-label text-muted">{shift.old.subject}</span>
            <span className="t-label t-num text-muted">Due Monday</span>
          </div>
          <p className="t-label mb-2 text-muted">Homework</p>
          <p className="t-title max-w-[22ch]">{shift.old.prompt}</p>
          <p className="t-small mt-8 max-w-[40ch] border-l-2 border-red-pen pl-3 text-ink">
            One prompt, one answer, one mark. A chatbot can write it in seconds, and the mark looks the same.
          </p>
        </article>

        {/* The SOYL challenge */}
        <article
          aria-hidden={isOld}
          style={{ gridArea: '1 / 1' }}
          className={cn(
            'border border-rule border-t-2 border-t-cobalt bg-white px-6 py-8 transition-opacity duration-200 md:px-10',
            isOld ? 'pointer-events-none invisible opacity-0' : 'opacity-100'
          )}
        >
          <p className="t-label mb-2 text-cobalt">{shift.soyl.eyebrow}</p>
          <p className="t-title mb-6 max-w-[24ch]">{shift.soyl.prompt}</p>
          <ul className="border-t border-rule">
            {shift.soyl.tasks.map((task) => (
              <li key={task.tag} className="flex items-start justify-between gap-4 border-b border-rule py-3.5">
                <span>{task.text}</span>
                <span className="t-label shrink-0 bg-highlighter px-2 py-0.5 text-ink">{task.tag}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

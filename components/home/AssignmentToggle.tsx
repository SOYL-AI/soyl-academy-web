'use client';

import { useState } from 'react';
import { Chip } from '@/components/ink/Chip';
import { Dab } from '@/components/ink/Dab';
import { Wash } from '@/components/ink/Wash';
import { shift } from '@/content/home';
import { cn } from '@/lib/utils';

type Mode = 'old' | 'soyl';

const OPTIONS: { mode: Mode; label: string }[] = [
  { mode: 'old', label: 'Traditional' },
  { mode: 'soyl', label: 'SOYL' },
];

/**
 * One assignment, two lives (/schools). It rests on the SOYL version; two chips swap the card in place. Both
 * cards share one grid cell, so switching never changes the height of the page. The SOYL card is a product
 * moment, so it lies on the painted wash; the worksheet lies on plain paper.
 */
export function AssignmentToggle() {
  const [mode, setMode] = useState<Mode>('soyl');
  const isOld = mode === 'old';

  return (
    <div>
      <div role="group" aria-label="Show the assignment as" className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => (
          <Chip key={opt.mode} pressed={mode === opt.mode} onClick={() => setMode(opt.mode)}>
            {opt.label}
          </Chip>
        ))}
      </div>

      <div className="mt-6 grid">
        {/* The worksheet: plain paper, inset like the SOYL card so the two line up. */}
        <div className={cn('flex p-3 transition-opacity duration-150 [grid-area:1/1] sm:p-5', isOld ? 'opacity-100' : 'invisible opacity-0')}>
          <article
            aria-hidden={!isOld}
            aria-label="The traditional assignment"
            className="flex-1 rounded-[var(--radius-md)] border border-rule bg-paper-2 p-6 md:p-8"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="ink-label">{shift.old.subject}</span>
              <span className="ink-label">{shift.old.due}</span>
            </div>
            <p className="ink-title mt-6 max-w-[22ch]">{shift.old.prompt}</p>
            <p className="mt-10 max-w-[44ch] border-l-2 border-madder pl-3 text-[0.9375rem] text-ink">{shift.old.note}</p>
          </article>
        </div>

        {/* The SOYL challenge */}
        <Wash
          className={cn('px-4 py-5 transition-opacity duration-150 [grid-area:1/1] sm:p-5', isOld ? 'invisible opacity-0' : 'opacity-100')}
        >
          <article
            aria-hidden={isOld}
            aria-label="The SOYL assignment"
            className="rounded-[var(--radius-md)] border border-rule bg-paper p-6 md:p-8"
          >
            <p className="ink-label">{shift.soyl.eyebrow}</p>
            <p className="ink-title mt-3 max-w-[24ch]">{shift.soyl.prompt}</p>
            <ul className="mt-6 border-t border-rule">
              {shift.soyl.tasks.map((task) => (
                <li key={task.tag} className="flex flex-col gap-1 border-b border-rule py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span>{task.text}</span>
                  <span className="ink-label inline-flex shrink-0 items-center gap-1.5 text-ink">
                    <Dab pigment="indigo" className="text-[1.3rem]" />
                    {task.tag}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </Wash>
      </div>
    </div>
  );
}

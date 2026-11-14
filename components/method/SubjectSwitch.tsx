'use client';

import './method.css';
import { useId, useRef, useState } from 'react';
import { Dab } from '@/components/brush/marks';
import { sheets, subjects } from '@/content/method';
import { cn } from '@/lib/utils';

/**
 * "Same five stages, any subject" (ADR-034): a tablist of four subjects; the panel shows what a pupil does in each
 * stage of that subject. Arrow keys, Home and End move between tabs (roving tabindex).
 */
export function SubjectSwitch() {
  const [at, setAt] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const subject = subjects[at]!;

  const move = (to: number) => {
    const n = (to + subjects.length) % subjects.length;
    setAt(n);
    tabs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Subjects" className="flex flex-wrap gap-2">
        {subjects.map((s, i) => (
          <button
            key={s.name}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === at}
            aria-controls={`${base}-panel`}
            tabIndex={i === at ? 0 : -1}
            onClick={() => setAt(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                move(i + 1);
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                move(i - 1);
              } else if (e.key === 'Home') {
                e.preventDefault();
                move(0);
              } else if (e.key === 'End') {
                e.preventDefault();
                move(subjects.length - 1);
              }
            }}
            className={cn(
              'press btn-brush inline-flex h-11 items-center px-5 text-[15px] font-semibold transition-colors',
              i === at ? 'bg-ink text-sheet' : 'border-2 border-ink/80 bg-transparent text-ink hover:bg-ochre-soft'
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div key={subject.name} role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${at}`} className="subject-panel mt-8">
        <p className="hand text-[1.35rem] text-vermilion-ink">{subject.medium}</p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {subject.does.map((line, i) => (
            <li key={i} className={cn('leaf flex flex-col p-4 md:p-5', i % 2 ? 'lg:rotate-[0.6deg]' : 'lg:-rotate-[0.5deg]')}>
              <span className="flex items-center gap-2 text-[14px] font-semibold text-graphite">
                <Dab ink={sheets[i]!.ink} className="h-3 w-3" />
                {sheets[i]!.name}
              </span>
              <span className="mt-2 font-serif text-[1.3rem] leading-[1.15] tracking-[-0.01em]">{line}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

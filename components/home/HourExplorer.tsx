'use client';

import { useId, useRef, useState } from 'react';
import { hour, type Subject } from '@/content/home';
import { BrushArt } from '@/components/brush/BrushArt';
import { PALETTE } from '@/components/brush/palette';
import { cn } from '@/lib/utils';

const STOPS: [number, number][] = [
  [0.1, 0.56],
  [0.3, 0.34],
  [0.5, 0.6],
  [0.7, 0.36],
  [0.9, 0.54],
];
const DAB = ['var(--color-ochre)', 'var(--color-ultramarine)', 'var(--color-vermilion)', 'var(--color-sap)', 'var(--color-ochre)'];

/**
 * The pupil's hour: the five stages on a hand-drawn path, with a subject switch (an ARIA tablist: arrow keys,
 * Home/End). Every stage's text is in the server HTML for the default subject; switching only swaps text.
 */
export function HourExplorer() {
  const [subject, setSubject] = useState<Subject>('Science');
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = hour.subjects.length;
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setSubject(hour.subjects[next]);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div role="tablist" aria-label="Subject" className="sketch inline-flex flex-wrap gap-1 bg-[#FFFDF8] p-1.5">
          {hour.subjects.map((s, i) => {
            const active = s === subject;
            return (
              <button
                key={s}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${id}-tab-${s}`}
                aria-selected={active}
                aria-controls={`${id}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setSubject(s)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  'btn-brush h-10 min-w-[5.5rem] px-4 text-[15px] font-semibold transition-colors duration-200',
                  active ? 'bg-ink text-sheet' : 'text-ink hover:bg-ochre-soft'
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
        <p className="hand text-[1.25rem] text-graphite" aria-live="polite">
          {hour.medium[subject]}
        </p>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${subject}`} className="mt-10">
        {/* Wide screens: the path, painted once; the stages sit under its stations. */}
        <BrushArt
          art="path"
          options={{ stops: STOPS, pigments: ['ochre', 'ultramarine', 'vermilion', 'sap', 'ochre'] }}
          seed={5}
          bg={PALETTE.sheetDeep}
          stepMs={70}
          className="hidden h-36 w-full md:block lg:h-40"
        />
        <ol key={subject} className="stage-panel grid gap-y-7 md:-mt-2 md:grid-cols-5 md:gap-x-5">
          {hour.stages.map((stage, i) => (
            <li key={stage.name} className="relative flex gap-4 md:block md:text-center">
              <span
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 md:hidden"
                style={{ background: DAB[i], borderRadius: '58% 42% 55% 45% / 47% 58% 42% 53%' }}
              />
              <div>
                <p className="font-serif text-[1.75rem] leading-none tracking-[-0.015em]">{stage.name}</p>
                <p className="hand mt-1 text-[1.05rem] text-graphite">{stage.method}</p>
                <p className="mt-3 max-w-[22ch] font-medium leading-snug md:mx-auto">{stage.does[subject]}</p>
                <p className="mt-3 text-[0.9rem] text-graphite">
                  <span className="t-eyebrow mr-1 text-[0.72rem] text-vermilion-ink">We measure</span> {stage.measure}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

import type { CSSProperties } from 'react';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { photo } from '@/content/credits';

/**
 * What a pilot looks like (/schools): ten weeks in three phases, drawn to scale on one ten-week track so the
 * length of each phase is visible, not only stated. The weeks are the pilot's real plan (the same as the
 * schools FAQ in content/faqs.ts); nothing here is an outcome.
 */
export const PILOT_WEEKS = 10;

export const PILOT_PHASES = [
  { phase: 'Introduce', from: 1, to: 2, line: 'Training for a core group of early-adopter teachers. Map 2 or 3 key units to SOYL.' },
  { phase: 'Implement', from: 3, to: 8, line: 'Teachers run SOYL assignments, with ongoing support based on how students respond.' },
  { phase: 'Evaluate', from: 9, to: 10, line: 'Review student work, teacher feedback and depth of learning; plan a wider rollout.' },
] as const;

const weeks = (from: number, to: number) => (from === to ? `Week ${from}` : to === from + 1 ? `Weeks ${from} and ${to}` : `Weeks ${from} to ${to}`);

export function PilotPlan() {
  const p = photo('chalk-maths');
  return (
    <Section id="pilot" aria-labelledby="pilot-title" className="scroll-mt-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <h2 id="pilot-title" className="ink-head max-w-[14ch]">
            Ten weeks. Your curriculum.
          </h2>
          <Stroke pigment="turmeric" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
          <p className="ink-lead mt-6 max-w-[46ch]">
            SOYL works alongside your existing standards, whether CBSE, ICSE, a state board, IB or IGCSE. It changes how learning is assessed, not what is taught.
          </p>

          <ol className="mt-10 border-t border-ink">
            {PILOT_PHASES.map((ph) => {
              const bar = {
                left: `${((ph.from - 1) / PILOT_WEEKS) * 100}%`,
                width: `${((ph.to - ph.from + 1) / PILOT_WEEKS) * 100}%`,
              } as CSSProperties;
              return (
                <li key={ph.phase} className="grid gap-x-6 gap-y-2 border-b border-rule py-5 sm:grid-cols-[9rem_1fr]">
                  <div>
                    <h3 className="font-serif text-[1.6rem] leading-none">{ph.phase}</h3>
                    <p className="mt-2 text-[0.9375rem] tabular-nums text-graphite">{weeks(ph.from, ph.to)}</p>
                  </div>
                  <div>
                    {/* The ten-week track, with this phase drawn on it. Decorative: the weeks are in the text. */}
                    <div aria-hidden="true" className="relative mt-1 h-2 rounded-[2px] bg-paper-3">
                      <span className="absolute inset-y-0 rounded-[2px] bg-indigo" style={bar} />
                    </div>
                    <p className="mt-3 text-graphite">{ph.line}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Beside the plan on wide screens only: on a phone or tablet it would be a tall picture after the facts. */}
        <div className="hidden lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:block">
          <InkPhoto src={p.src} alt={p.alt} aspect="4 / 5" position="45% 50%" sizes="(min-width: 1320px) 480px, 38vw" />
        </div>
      </div>
    </Section>
  );
}

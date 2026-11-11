import type { ReactNode } from 'react';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { hero } from '@/content/home';
import { MiniSimulator } from './MiniSimulator';

export interface HowItWorksStep {
  title: string;
  line: string;
}

interface HowItWorksProps {
  /** The section's anchor (the /schools HowTo structured data points at `#workflow`). */
  id: string;
  title: ReactNode;
  intro?: string;
  /** The steps in order, as each page already states them (/schools: six, /teachers: four). */
  steps: readonly HowItWorksStep[];
  /** The heading over the simulator, e.g. "What your pupils see". */
  tryTitle: string;
}

/**
 * How it works, beside a SOYL question played as a pupil (/schools and /teachers, plan §3.3). The steps are text
 * only: there are no real product screenshots yet (content/media.ts), so none are shown. The simulator is the
 * real interaction, on the painted wash.
 */
export function HowItWorks({ id, title, intro, steps, tryTitle }: HowItWorksProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} ground="paper-2" aria-labelledby={titleId} className="scroll-mt-16">
      <h2 id={titleId} className="ink-head max-w-[18ch]">
        {title}
      </h2>
      <Stroke pigment="indigo" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
      {intro ? <p className="ink-lead mt-6 max-w-[52ch]">{intro}</p> : null}

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <ol className="lg:col-span-5">
          {steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-t border-rule py-5 first:border-t-0 first:pt-0">
              <span aria-hidden="true" className="font-serif text-[1.6rem] leading-none tabular-nums text-indigo">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[1.0625rem] font-semibold leading-snug">{step.title}</h3>
                <p className="mt-1 text-graphite">{step.line}</p>
              </div>
            </li>
          ))}
        </ol>

        <div id="try" className="scroll-mt-24 lg:col-span-7 lg:pl-4">
          <h3 className="ink-title">{tryTitle}</h3>
          <div className="mt-6">
            <MiniSimulator />
          </div>
          <p className="mt-6 max-w-[52ch] text-[0.9375rem] text-graphite">{hero.caption}</p>
        </div>
      </div>
    </Section>
  );
}

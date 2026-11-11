import { InkLink } from '@/components/ink/Button';
import { Dab } from '@/components/ink/Dab';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { method, shift } from '@/content/home';
import { AssignmentToggle } from './AssignmentToggle';

/**
 * The shift (/schools; moved from the homepage, docs/redesign-ink-and-wash.md §3.2 and §3.3): one assignment in
 * two lives, and beside it the five verbs of the SOYL Method that the SOYL card is tagged with. The verbs are a
 * plain list (the old marquee is gone); /method walks them one by one.
 */
export function Shift() {
  return (
    <Section id="shift" aria-labelledby="shift-title" className="scroll-mt-16">
      <h2 id="shift-title" className="ink-head max-w-[16ch]">
        {shift.headline}
      </h2>
      <Stroke pigment="madder" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
      <p className="ink-lead mt-6 max-w-[52ch]">{shift.intro}</p>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <AssignmentToggle />
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <h3 className="ink-title">{method.headline}</h3>
          <p className="mt-3 text-graphite">{method.intro}</p>
          <ul className="mt-6 border-t border-rule">
            {method.steps.map((step) => (
              <li key={step.verb} className="flex items-baseline gap-3 border-b border-rule py-3">
                <Dab pigment="indigo" className="text-[1.3rem]" />
                <span>
                  <span className="font-semibold">{step.verb}.</span> <span className="text-graphite">{step.line}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <InkLink href="/method" variant="quiet" arrow>
              Walk the SOYL Method
            </InkLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

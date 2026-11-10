import { Dab } from '@/components/ink/Dab';
import { InkLink } from '@/components/ink/Button';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { freeCreditsPerDay } from '@/lib/home/numbers';

/**
 * Screen 2, the honest ledger (plan §3.2 and §4, device 2): what is free, the one thing that is metered, and
 * why. Rests on golden rule 3 (learning and tests are free; only AI costs credits). The allowance is read from
 * platform/shared/config/plans.ts. Only rendered with the platform on.
 */
const FREE = ['Lessons', 'Notes and flashcards', 'Practice with instant checks', 'Chapter tests, mock papers and All-India mocks'];

export function Ledger() {
  const credits = freeCreditsPerDay();
  return (
    <Section ground="paper-2" aria-labelledby="ledger-title">
      <h2 id="ledger-title" className="ink-head max-w-[15ch]">
        Everything you need to pass is free.
      </h2>
      <Stroke pigment="indigo" width="6em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />

      <div className="mt-10 grid gap-5 md:grid-cols-12">
        <div className="rounded-[var(--radius-md)] border border-rule bg-paper p-6 md:col-span-7 md:p-8">
          <p className="ink-label">Free, always</p>
          <ul className="mt-5 space-y-4">
            {FREE.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[1.0625rem]">
                <Dab pigment="leaf" className="text-[1.7rem]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.9375rem] text-muted">Tests and mock papers need a free account. Lessons and practice do not.</p>
        </div>

        <div className="flex flex-col rounded-[var(--radius-md)] border border-rule bg-paper p-6 md:col-span-5 md:p-8">
          <p className="ink-label">Metered</p>
          <p className="mt-5 flex items-center gap-3 text-[1.0625rem]">
            <Dab pigment="turmeric" className="text-[1.7rem]" />
            AI help
          </p>
          <p className="mt-5 text-graphite">
            AI costs money to run, so it is the one thing with a meter. You get{' '}
            <span className="font-semibold text-ink tabular-nums">{credits} credits</span> free every day.
          </p>
          <div className="mt-auto pt-6">
            <InkLink href="/plans" variant="quiet" arrow>
              See what AI costs
            </InkLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

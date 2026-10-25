import { hero } from '@/content/home';
import { PRIMARY_CTA } from '@/lib/site';
import { ButtonLink } from '@/components/notebook/Button';
import { Label } from '@/components/notebook/SectionHeader';
import { MiniSimulator } from './MiniSimulator';

export function Hero() {
  return (
    <section className="rule-b overflow-hidden">
      <div className="page grid-12 items-center gap-y-10 py-12 md:py-16 lg:py-20">
        <div className="col-span-12 lg:col-span-6 lg:pr-6">
          <Label className="mb-6">{hero.label}</Label>
          <h1 className="t-display max-w-[13ch]">
            {hero.headline} <span className="mark whitespace-nowrap">{hero.highlight}</span>
          </h1>
          <p className="t-lead mt-6 max-w-[44ch] text-ink md:mt-8">{hero.support}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>

        {/* The question screen, live: graph paper behind, red margin line, a real interaction */}
        <div id="try-it" className="col-span-12 scroll-mt-20 lg:col-span-6">
          <div className="graph-grid margin-line border border-rule p-3 pl-7 [--margin-x:0.875rem] md:p-6 md:pl-16 md:[--margin-x:2.25rem]">
            <MiniSimulator />
            <p className="t-small mt-4 max-w-[48ch] text-muted">{hero.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { hero, howItWorks } from '@/content/home';
import { media } from '@/content/media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductShot } from '@/components/ui/ProductShot';
import { MiniSimulator } from './MiniSimulator';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section scroll-mt-16 bg-paper">
      <div className="page">
        <SectionHeader label={howItWorks.label} num="03" title={howItWorks.headline} intro={howItWorks.intro} />

        <div className="grid-12 mt-12 gap-y-12 md:mt-16">
          <ol className="col-span-12 lg:col-span-5">
            {howItWorks.steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={{ '--d': `${i * 80}ms` } as React.CSSProperties}
                className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-rule-strong py-6 first:border-t-0 first:pt-0 md:py-7"
              >
                <span className="t-num font-serif text-[2.75rem] leading-[0.9] text-cobalt">{i + 1}</span>
                <div>
                  <h3 className="t-subtitle">{step.title}</h3>
                  <p className="mt-1.5 text-muted">{step.line}</p>
                  <ProductShot slot={media[step.media]} sizes="(min-width: 1024px) 420px, 90vw" className="mt-5" />
                </div>
              </li>
            ))}
          </ol>

          {/* A real interaction, not a screenshot */}
          <div id="try-it" className="col-span-12 scroll-mt-24 lg:col-span-7 lg:col-start-6 lg:pl-4" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <p className="t-eyebrow mb-4 text-muted">Try a SOYL question</p>
            <MiniSimulator />
            <p className="t-small mt-4 max-w-[52ch] text-muted">{hero.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

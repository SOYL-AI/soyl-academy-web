import { howItWorks } from '@/content/home';
import { media } from '@/content/media';
import { SectionHeader } from '@/components/notebook/SectionHeader';
import { ProductShot } from '@/components/notebook/ProductShot';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section rule-t scroll-mt-16">
      <div className="page">
        <SectionHeader label={howItWorks.label} num="03" title={howItWorks.headline} intro={howItWorks.intro} />

        <ol className="mt-10 grid grid-cols-1 gap-px border border-rule bg-rule md:mt-14 md:grid-cols-2">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-5 bg-white p-5 md:p-7">
              <div className="flex items-baseline gap-4">
                <span className="t-num font-serif text-[2.25rem] leading-none text-cobalt">{i + 1}</span>
                <div>
                  <h3 className="t-subtitle">{step.title}</h3>
                  <p className="mt-1 text-muted">{step.line}</p>
                </div>
              </div>
              <ProductShot
                slot={media[step.media]}
                sizes="(min-width: 1240px) 560px, (min-width: 768px) 46vw, 92vw"
                className="mt-auto"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

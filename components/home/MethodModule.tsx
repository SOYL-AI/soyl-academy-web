import Link from 'next/link';
import { method } from '@/content/home';
import { images } from '@/content/images';
import { Label } from '@/components/ui/SectionHeader';
import { ArrowRight } from '@/components/ui/Button';
import { Photo } from '@/components/media/Photo';

/** The five verbs, scrolling past as a quiet band. Decorative: the list below carries the content. */
function VerbMarquee() {
  const row = method.steps.map((s) => s.verb);
  return (
    <div aria-hidden="true" className="marquee-wrap overflow-hidden border-y border-rule py-5 md:py-7">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {[...row, ...row].map((verb, i) => (
              <span key={`${copy}-${i}`} className="flex items-center font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-[-0.02em]">
                <span className={i % 2 ? 't-accent text-muted' : ''}>{verb}</span>
                <span className="mx-6 inline-block h-2.5 w-2.5 rounded-full bg-red-pen md:mx-10" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The SOYL Method: five verbs, one photograph. */
export function MethodModule() {
  return (
    <section aria-labelledby="method-heading">
      <VerbMarquee />
      <div className="section">
        <div className="page grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <div data-reveal>
              <Label num="02" className="mb-6">{method.label}</Label>
              <h2 id="method-heading" className="t-headline max-w-[12ch]">
                Learning is a <span className="t-accent">verb.</span>
              </h2>
              <p className="t-lead mt-6 max-w-[42ch]">{method.intro}</p>
            </div>

            <ol className="mt-12 border-t border-rule">
              {method.steps.map((step, i) => (
                <li key={step.verb} data-reveal style={{ '--d': `${i * 70}ms` } as React.CSSProperties}>
                  <div className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b border-rule py-5 md:grid-cols-[3.5rem_12rem_1fr] md:py-6">
                    <span className="t-label t-num text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-serif text-[1.875rem] leading-none tracking-[-0.015em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 md:text-[2.25rem]">
                      {step.verb}
                    </h3>
                    <p className="col-start-2 mt-2 text-muted md:col-start-3 md:mt-0">{step.line}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link href="/method" className="arrow-link mt-8" data-reveal>
              Read the SOYL Method <ArrowRight />
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <Photo
                image={images.studentsDebating}
                aspect="aspect-[4/5]"
                large
                parallax
                sizes="(min-width: 1320px) 470px, (min-width: 1024px) 38vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

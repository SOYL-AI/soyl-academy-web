import Link from 'next/link';
import { method } from '@/content/home';
import { Label } from '@/components/notebook/SectionHeader';
import { ArrowRight } from '@/components/notebook/Button';

/** The SOYL Method as one compact boxed module, not five full-height sections. */
export function MethodModule() {
  return (
    <section className="section-tight">
      <div className="page">
        <div className="bleed grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-[1.7fr_repeat(5,1fr)]">
          {/* Yellow block: the one solid colour in this viewport */}
          <div className="flex flex-col justify-between gap-6 bg-highlighter p-6 sm:col-span-2 md:col-span-5 md:p-8 xl:col-span-1">
            <div>
              <Label num="02" className="mb-4 text-ink [&>span:first-child]:bg-ink">
                {method.label}
              </Label>
              <h2 className="t-headline">{method.headline}</h2>
            </div>
            <div>
              <p className="max-w-[34ch] text-ink">{method.intro}</p>
              <Link href="/method" className="arrow-link mt-4 decoration-ink/40">
                Read the method <ArrowRight />
              </Link>
            </div>
          </div>

          <ol className="contents">
            {method.steps.map((step, i) => (
              <li
                key={step.verb}
                className="flex flex-col justify-between gap-6 bg-white p-5 last:sm:col-span-2 md:p-6 last:md:col-span-1"
              >
                <span className="t-label t-num text-muted">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="t-title">{step.verb}</h3>
                  <p className="t-small mt-2 text-muted">{step.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

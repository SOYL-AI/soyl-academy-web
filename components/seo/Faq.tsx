import type { FaqItem } from '@/content/faqs';
import { Label } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

interface FaqProps {
  faqs: FaqItem[];
  heading?: string;
  label?: string;
  num?: string;
  className?: string;
}

/**
 * Visible FAQ list. Native <details>/<summary>: keyboard accessible with zero
 * JS, and every answer is in the server-rendered HTML.
 *
 * The matching FAQPage JSON-LD is emitted by the page via `faqNode()` — the
 * schema must always mirror exactly what is visible here.
 */
export function Faq({ faqs, heading = 'Common questions', label = 'FAQ', num, className }: FaqProps) {
  return (
    <section aria-labelledby="faq-heading" className={cn('section', className)}>
      <div className="page grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-4" data-reveal>
          <Label num={num} className="mb-6">{label}</Label>
          <h2 id="faq-heading" className="max-w-[14ch] font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.018em]">
            {heading}
          </h2>
        </div>

        <div className="col-span-12 border-t border-ink lg:col-span-7 lg:col-start-6" data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-start justify-between gap-6 py-5 md:py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="t-subtitle transition-colors duration-200 group-hover:text-cobalt">{faq.question}</h3>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule-strong text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-cobalt group-open:bg-cobalt group-open:text-white"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="max-w-[62ch] pb-7 pr-12 text-muted">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

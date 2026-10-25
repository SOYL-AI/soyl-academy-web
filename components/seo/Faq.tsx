import type { FaqItem } from '@/content/faqs';
import { Label } from '@/components/notebook/SectionHeader';
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
    <section aria-labelledby="faq-heading" className={cn('section rule-t', className)}>
      <div className="page grid-12 gap-y-8">
        <div className="col-span-12 lg:col-span-4">
          <Label num={num} className="mb-5">{label}</Label>
          <h2 id="faq-heading" className="t-title max-w-[16ch]">
            {heading}
          </h2>
        </div>

        <div className="module col-span-12 lg:col-span-8">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-rule last:border-b-0">
              <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 px-5 py-4 md:px-6 [&::-webkit-details-marker]:hidden">
                <h3 className="t-subtitle transition-colors duration-150 group-hover:text-cobalt">{faq.question}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border border-rule-strong text-ink transition-transform duration-200 group-open:rotate-45"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="max-w-[64ch] px-5 pb-6 text-muted md:px-6">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

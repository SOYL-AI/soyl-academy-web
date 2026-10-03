import type { FaqItem } from '@/content/faqs';

interface FaqProps {
  faqs: FaqItem[];
  heading?: string;
  eyebrow?: string;
  /** `section` = full-width homepage band; `inline` = sits inside a page container. */
  variant?: 'section' | 'inline';
}

/**
 * Visible FAQ list. Uses native <details>/<summary> so it is keyboard
 * accessible with zero JS, and every answer is in the server-rendered HTML
 * (crawlers and AI engines read closed <details> content).
 *
 * The matching FAQPage JSON-LD is emitted by the page via `faqNode()` — the
 * schema must always mirror exactly what is visible here.
 */
export function Faq({
  faqs,
  heading = 'Frequently asked questions',
  eyebrow = 'FAQ',
  variant = 'inline',
}: FaqProps) {
  const list = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <div className="lg:col-span-4">
        <p className="text-eyebrow text-ink-lighter mb-4">{eyebrow}</p>
        <h2 id="faq-heading" className="text-headline text-ink">{heading}</h2>
      </div>

      <div className="lg:col-span-8 border-t border-ink/15">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-ink/15">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="text-subhead text-ink transition-colors duration-300 group-hover:text-cobalt">
                {faq.question}
              </h3>
              <span
                aria-hidden="true"
                className="mt-2 shrink-0 text-ink-light transition-transform duration-300 group-open:rotate-45"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2v12M2 8h12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="pb-8 pr-10 text-lg text-ink-light leading-relaxed max-w-[62ch]">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );

  if (variant === 'section') {
    return (
      <section
        aria-labelledby="faq-heading"
        className="w-full bg-white section-padding"
      >
        <div className="container-default">{list}</div>
      </section>
    );
  }

  return <section className="mb-32">{list}</section>;
}

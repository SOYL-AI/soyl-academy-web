import type { FaqItem } from '@/content/faqs';

/**
 * Screen 6, the questions (plan §3.2). Native disclosure, no script; every answer is in the HTML, so the FAQ
 * structured data (faqNode, rendered by the page) mirrors exactly what is visible.
 */
export function HomeFaq({ faqs, heading = 'Questions, answered.' }: { faqs: FaqItem[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-title" className="section pt-0">
      <div className="page grid gap-8 md:grid-cols-12">
        <h2 id="faq-title" className="ink-head self-start md:col-span-4">
          {heading}
        </h2>
        <div className="md:col-span-8">
          {faqs.map((f) => (
            <details key={f.question} className="group border-b border-rule py-1 first:border-t">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 text-[1.125rem] font-medium [&::-webkit-details-marker]:hidden">
                {f.question}
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false" className="shrink-0 transition-transform duration-150 group-open:rotate-45">
                  <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="max-w-[62ch] pb-5 text-graphite">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

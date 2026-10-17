import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { futureBuildersFaqs } from '@/content/future-builders-faqs';

/**
 * Native <details> accordion: every answer is in the server-rendered HTML,
 * so crawlers, link previews and no-JS visitors see full answers.
 */
export function FutureBuildersFaq() {
  return (
    <div className="mb-24 md:mb-48 border-t-2 border-brand-black/10 pt-16 md:pt-32">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What parents need to know.</h2>
            <p className="text-xl text-brand-black/70 leading-relaxed mb-8">
              We focus on measurable outcomes. Your child will leave with a working prototype, a code portfolio, and a fundamental understanding of modern technology.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {futureBuildersFaqs.map((item, index) => (
                <details
                  key={item.question}
                  open={index === 0}
                  className="group border-2 border-brand-black rounded-xl overflow-hidden bg-brand-cream/50 hover:bg-white open:bg-white open:shadow-[6px_6px_0_0_#141414] transition-colors duration-300"
                >
                  <summary className="w-full text-left px-6 py-5 flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-bold text-xl pr-8">{item.question}</h3>
                    <span aria-hidden="true" className="w-8 h-8 rounded-full border-2 border-brand-black flex items-center justify-center shrink-0 transition-transform duration-300 group-open:rotate-180 group-open:bg-brand-yellow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-lg text-brand-black/80 leading-relaxed border-t-2 border-brand-black/5 mx-6">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

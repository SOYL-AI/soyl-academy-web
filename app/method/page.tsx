import { FinalCta } from '@/components/home/FinalCta';
import { PageHero } from '@/components/notebook/PageHero';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { methodFaqs } from '@/content/faqs';
import { pillars } from '@/content/method';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, methodTermSetNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/method' });

export default function MethodPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/method', mainEntityId: `${absoluteUrl('/method')}#method` }),
          breadcrumbNode('/method', topLevelCrumbs('/method')),
          methodTermSetNode(pillars),
          faqNode('/method', methodFaqs)
        )}
      />

      <PageHero
        label="The SOYL Method"
        title={
          <>
            Learning should be <span className="mark">demonstrated</span>.
          </>
        }
        intro="Not only through what a student can submit, but through what they can do, apply and defend. Five pillars, one idea: make the thinking visible."
      />

      <section className="section-tight">
        <div className="page">
          <ol className="border-t border-rule">
            {pillars.map((p) => (
              <li key={p.num} className="grid-12 gap-y-6 border-b border-rule py-10 md:py-14">
                <div className="col-span-12 md:col-span-4">
                  <p className="t-label t-num text-muted">Pillar {p.num}</p>
                  <h2 className="t-headline mt-3">{p.name}</h2>
                  <p className="mt-2 font-serif text-[1.375rem] text-muted">{p.tagline}</p>
                </div>
                <div className="col-span-12 md:col-span-7 md:col-start-6">
                  <p className="t-lead text-ink">{p.content[0]}</p>
                  <p className="mt-4 text-muted">{p.content[1]}</p>
                  <div className="mt-8 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
                    <div className="ruled p-5">
                      <p className="t-label mb-2 text-muted">Traditional</p>
                      <p className="text-ink line-through decoration-red-pen decoration-2">{p.traditional}</p>
                    </div>
                    <div className="border-t-2 border-t-cobalt bg-white p-5">
                      <p className="t-label mb-2 text-cobalt">SOYL</p>
                      <p className="font-medium text-ink">{p.soyl}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight">
        <div className="page">
          <div className="on-dark grid-12 gap-y-8 bg-cobalt-deep px-6 py-12 text-white md:px-12 md:py-16">
            <div className="col-span-12 lg:col-span-6">
              <p className="t-label mb-5 flex items-center gap-2.5 text-white">
                <span aria-hidden="true" className="h-px w-5 bg-highlighter" />
                Teachers and technology
              </p>
              <h2 className="t-headline">Technology assists teachers. It doesn’t replace them.</h2>
            </div>
            <div className="col-span-12 space-y-6 lg:col-span-5 lg:col-start-8">
              <div>
                <h3 className="t-subtitle">Teacher control</h3>
                <p className="mt-2 text-white">
                  The tools extend a teacher’s reach and give deeper insight, but the teaching decisions, the relationships and the final assessment stay human.
                </p>
              </div>
              <div>
                <h3 className="t-subtitle">Responsible use</h3>
                <p className="mt-2 text-white">
                  AI is a powerful learning tool when it’s a thought partner, not a shortcut. Students stay accountable for the integrity of their work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq faqs={methodFaqs} heading="Questions about the SOYL Method" />
      <FinalCta />
    </>
  );
}

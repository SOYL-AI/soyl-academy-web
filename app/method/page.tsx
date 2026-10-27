import { FinalCta } from '@/components/home/FinalCta';
import { PageHero } from '@/components/ui/PageHero';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { methodFaqs } from '@/content/faqs';
import { images, type EditorialImage } from '@/content/images';
import { pillars } from '@/content/method';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, methodTermSetNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';
import { cn } from '@/lib/utils';

export const metadata = createMetadata({ path: '/method' });

/** One photograph per pillar, alternating sides. */
const PILLAR_IMAGES: Record<string, EditorialImage> = {
  Understand: images.studentThinking,
  Apply: images.studentsBuilding,
  Create: images.classroomMaking,
  Defend: images.studentsDebating,
  Reflect: images.studentsPresenting,
};

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
            Learning should be <span className="t-accent">demonstrated.</span>
          </>
        }
        intro="Not only through what a student can submit, but through what they can do, apply and defend. Five pillars, one idea: make the thinking visible."
      />

      <section className="pb-16 md:pb-24">
        <div className="page">
          <ol>
            {pillars.map((p, i) => {
              const image = PILLAR_IMAGES[p.name];
              const flip = i % 2 === 1;
              return (
                <li key={p.num} className="grid-12 items-center gap-y-8 border-t border-rule py-14 md:py-20">
                  {image && (
                    <div className={cn('col-span-12 lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}>
                      <Photo
                        image={image}
                        aspect="aspect-[4/3] lg:aspect-[4/5]"
                        large
                        parallax
                        sizes="(min-width: 1320px) 480px, (min-width: 1024px) 40vw, 100vw"
                      />
                    </div>
                  )}
                  <div className={cn('col-span-12 lg:col-span-6', flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7')} data-reveal>
                    <p className="t-eyebrow t-num text-muted">Pillar {p.num}</p>
                    <h2 className="t-headline mt-4">{p.name}</h2>
                    <p className="t-accent mt-2 text-[1.5rem] text-muted">{p.tagline}</p>
                    <p className="t-lead mt-6 text-ink">{p.content[0]}</p>
                    <p className="mt-4 text-muted">{p.content[1]}</p>
                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-[var(--radius-md)] bg-paper p-5">
                        <p className="t-eyebrow mb-2 text-muted">Traditional</p>
                        <p className="text-ink line-through decoration-red-pen decoration-2">{p.traditional}</p>
                      </div>
                      <div className="rounded-[var(--radius-md)] border border-ink/80 bg-white p-5">
                        <p className="t-eyebrow mb-2 text-cobalt">SOYL</p>
                        <p className="font-medium text-ink">{p.soyl}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section-tight">
        <div className="page">
          <div className="on-dark grid-12 gap-y-10 rounded-[var(--radius-lg)] bg-ink px-6 py-12 text-white md:px-12 md:py-20">
            <div className="col-span-12 lg:col-span-6" data-reveal>
              <p className="t-eyebrow mb-6 text-white/70">Teachers and technology</p>
              <h2 className="t-headline max-w-[16ch]">
                Technology assists teachers. It doesn’t <span className="t-accent text-highlighter">replace</span> them.
              </h2>
            </div>
            <div className="col-span-12 space-y-8 lg:col-span-5 lg:col-start-8" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              <div className="border-t border-white/25 pt-6">
                <h3 className="t-subtitle">Teacher control</h3>
                <p className="mt-2 text-white/80">
                  The tools extend a teacher’s reach and give deeper insight, but the teaching decisions, the relationships and the final assessment stay human.
                </p>
              </div>
              <div className="border-t border-white/25 pt-6">
                <h3 className="t-subtitle">Responsible use</h3>
                <p className="mt-2 text-white/80">
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

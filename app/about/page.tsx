import { ClosingCta } from '@/components/ink/ClosingCta';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { PageIntro } from '@/components/ink/PageIntro';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { StructuredData } from '@/components/seo/StructuredData';
import { PHOTO_CREDITS, photo } from '@/content/credits';
import { finalCta } from '@/content/home';
import { ORGANIZATION_ID, SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/about' });

/**
 * About, in Ink and wash (plan §3.3, phase 5): why SOYL exists (the old model against the new reality, on paper
 * and on slate), what it builds, who builds it, and the credits for every photograph on the site (DESIGN.md §6).
 */
export default function AboutPage() {
  const marking = photo('hands-red-pencil');
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/about', mainEntityId: ORGANIZATION_ID }),
          breadcrumbNode('/about', topLevelCrumbs('/about'))
        )}
      />

      <PageIntro
        title={
          <>
            <span className="block">Answers are cheap.</span>
            <span className="block">Thinking is not.</span>
          </>
        }
        lead="For most of history, a correct answer meant a student had learned. Today technology can produce the answer for free, so school has to ask for something more."
        photo={{ slug: 'chalk-alt', position: '45% 40%' }}
        className="[&_h1]:max-w-[19ch]"
      />

      {/* The argument in two grounds: paper for the world that was, slate for the one we are in. */}
      <section aria-label="The old model and the new reality" className="pb-16 md:pb-24">
        <div className="page grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="rounded-[var(--radius-md)] bg-paper-2 p-7 md:p-10">
            <h2 className="text-[0.9375rem] font-semibold text-graphite">The old model</h2>
            <p className="ink-title mt-5 text-[clamp(1.45rem,2.2vw,1.85rem)]">
              The essay and the worksheet belonged to a world where producing the work was proof of effort.
            </p>
          </div>
          <div className="on-dark rounded-[var(--radius-md)] bg-slate p-7 text-chalk md:p-10">
            <h2 className="text-[0.9375rem] font-semibold text-chalk-muted">The new reality</h2>
            <p className="ink-title mt-5 text-[clamp(1.45rem,2.2vw,1.85rem)]">
              When the work can be generated for free, we have to assess the process, not just the product.
            </p>
          </div>
        </div>
      </section>

      <Section ground="paper-2" aria-labelledby="build-title">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <InkPhoto src={marking.src} alt={marking.alt} aspect="4 / 3" position="55% 45%" sizes="(min-width: 1320px) 500px, (min-width: 1024px) 40vw, 92vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="build-title" className="ink-head max-w-[20ch]">
              Teachers remain the irreplaceable core.
            </h2>
            <Stroke pigment="madder" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
            <p className="ink-lead mt-6 text-ink">Software can generate content. It can’t inspire, build relationships or read a room.</p>
            <p className="mt-5 max-w-[56ch] text-graphite">
              SOYL builds tools that give teachers time back and a clearer view of each pupil’s thinking, so they can do what only people can: mentor, challenge and guide. Alongside the school platform, we run Future Builders, a summer camp where students in Grades 7–12 build real products.
            </p>
          </div>
        </div>
      </Section>

      <section aria-label="Company" className="border-b border-rule">
        <div className="page flex flex-col gap-2 py-8 text-[0.9375rem] text-graphite md:flex-row md:items-center md:justify-between">
          <p>SOYL Academy is built by {SITE_LEGAL_NAME}, Bengaluru 560043.</p>
          <p>
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="link">
              {SITE_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      {/* Credits for the real photographs on the site (content/credits.ts, DESIGN.md §6). */}
      <section aria-labelledby="credits-title" className="py-14 md:py-20">
        <div className="page grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <h2 id="credits-title" className="ink-title">
              Photographs
            </h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-9">
            {PHOTO_CREDITS.map((c) => (
              <li key={c.slug} className="flex items-start gap-4 border-t border-rule py-4 text-[0.9375rem] leading-[1.55] text-graphite">
                <InkPhoto src={c.src} alt="" aspect="1 / 1" masked={false} sizes="56px" className="w-14 shrink-0 rounded-[var(--radius-xs)]" />
                <p>
                  {c.alt}: photo by{' '}
                  <a href={c.photographerUrl} className="link" rel="noopener noreferrer">
                    {c.photographer}
                  </a>{' '}
                  on{' '}
                  <a href={c.sourceUrl} className="link" rel="noopener noreferrer">
                    {c.source}
                  </a>
                  .
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta headline={finalCta.headline} line={finalCta.line} />
    </>
  );
}

import { FinalCta } from '@/components/home/FinalCta';
import { PageHero } from '@/components/ui/PageHero';
import { Label } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { StructuredData } from '@/components/seo/StructuredData';
import { images } from '@/content/images';
import { ORGANIZATION_ID, SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/about' });

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/about', mainEntityId: ORGANIZATION_ID }),
          breadcrumbNode('/about', topLevelCrumbs('/about'))
        )}
      />

      <PageHero
        label="About SOYL Academy"
        title={
          <>
            Answers are cheap. <span className="t-accent">Thinking is not.</span>
          </>
        }
        intro="For most of history, a correct answer meant a student had learned. Today technology can produce the answer for free, so school has to ask for something more."
        image={images.classroomMaking}
        imageLayout="wide"
      />

      <section className="section">
        <div className="page grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-[var(--radius-lg)] bg-paper p-7 md:p-12" data-reveal>
            <p className="t-eyebrow mb-6 text-muted">The old model</p>
            <p className="t-title">The essay and the worksheet belonged to a world where producing the work was proof of effort.</p>
          </div>
          <div className="on-dark rounded-[var(--radius-lg)] bg-ink p-7 text-white md:p-12" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <p className="t-eyebrow mb-6 text-highlighter">The new reality</p>
            <p className="t-title">When the work can be generated for free, we have to assess the process, not just the product.</p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <Photo
              image={images.teacherMentoring}
              aspect="aspect-[4/3]"
              large
              parallax
              sizes="(min-width: 1320px) 600px, (min-width: 1024px) 48vw, 100vw"
            />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal>
            <Label num="01" className="mb-6">What we build</Label>
            <h2 className="t-headline max-w-[14ch]">
              Teachers remain the <span className="t-accent">irreplaceable</span> core.
            </h2>
            <p className="t-lead mt-6 text-ink">
              Software can generate content. It can’t inspire, build relationships or read a room.
            </p>
            <p className="mt-5 text-muted">
              SOYL builds tools that give teachers time back and a clearer view of each pupil’s thinking, so they can do what only people can: mentor, challenge and guide. Alongside the school platform, we run Future Builders, a weekend programme where students in Grades 7–12 build real products.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight rule-t">
        <div className="page t-small flex flex-col gap-2 text-muted md:flex-row md:justify-between">
          <p>SOYL Academy is built by {SITE_LEGAL_NAME}, Bengaluru 560043.</p>
          <p>
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="link">
              {SITE_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

import { FinalCta } from '@/components/home/FinalCta';
import { PageHero } from '@/components/notebook/PageHero';
import { Label } from '@/components/notebook/SectionHeader';
import { StructuredData } from '@/components/seo/StructuredData';
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
            Answers are cheap. <span className="mark">Thinking is not.</span>
          </>
        }
        intro="For most of history, a correct answer meant a student had learned. Today technology can produce the answer for free, so school has to ask for something more."
      />

      <section className="section">
        <div className="page grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-2">
          <div className="ruled margin-line p-6 pl-14 md:p-10 md:pl-16">
            <p className="t-label mb-4 text-muted">The old model</p>
            <p className="t-title">The essay and the worksheet belonged to a world where producing the work was proof of effort.</p>
          </div>
          <div className="border-t-2 border-t-cobalt bg-white p-6 md:p-10">
            <p className="t-label mb-4 text-cobalt">The new reality</p>
            <p className="t-title">When the work can be generated for free, we have to assess the process, not just the product.</p>
          </div>
        </div>
      </section>

      <section className="section rule-t">
        <div className="page grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Label className="mb-5">What we build</Label>
            <h2 className="t-headline max-w-[16ch]">Teachers remain the irreplaceable core.</h2>
          </div>
          <div className="col-span-12 space-y-5 lg:col-span-5 lg:col-start-8">
            <p className="t-lead text-ink">
              Software can generate content. It can’t inspire, build relationships or read a room.
            </p>
            <p className="text-muted">
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

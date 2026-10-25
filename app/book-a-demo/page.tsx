import { DemoForm } from '@/components/forms/DemoForm';
import { PageHero } from '@/components/notebook/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/book-a-demo' });

const WHAT_HAPPENS = [
  { title: 'We get in touch', line: 'By email or phone, to find a time that suits you.' },
  { title: 'We show you SOYL', line: 'The teacher, student and parent views, live.' },
  { title: 'We plan a pilot', line: 'If it fits, a ten-week pilot shaped around your curriculum.' },
];

export default function BookDemoPage() {
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/book-a-demo' }), breadcrumbNode('/book-a-demo', topLevelCrumbs('/book-a-demo')))}
      />
      <PageHero
        label="Book a demo"
        title="See SOYL with your own eyes."
        intro="Tell us a little about your school. It takes a minute, and we’ll take it from there."
        size="headline"
      />

      <section className="section-tight">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <DemoForm />
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <h2 className="t-subtitle mb-5">What happens next</h2>
            <ol className="border-t border-rule">
              {WHAT_HAPPENS.map((s, i) => (
                <li key={s.title} className="flex gap-4 border-b border-rule py-4">
                  <span className="t-num font-serif text-[1.75rem] leading-none text-cobalt">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="t-small mt-0.5 text-muted">{s.line}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="t-small mt-6 text-muted">
              Prefer email? Write to{' '}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="link">
                {SITE_CONTACT_EMAIL}
              </a>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

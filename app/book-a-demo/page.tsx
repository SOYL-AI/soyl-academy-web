import { DemoForm } from '@/components/forms/DemoForm';
import { PageHero } from '@/components/ui/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { Arrow, Marked, Note } from '@/components/brush/marks';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/book-a-demo' });

const WHAT_HAPPENS = [
  { title: 'We get in touch', line: 'By email or phone, to find a time that suits you.' },
  { title: 'You see a mission from both sides', line: 'The pupil’s hour, the Thoughtprint, and the teacher’s Monday screen, live.' },
  { title: 'We plan a pilot', line: 'If it fits, ten weeks shaped around your curriculum.' },
];

export default function BookDemoPage() {
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/book-a-demo' }), breadcrumbNode('/book-a-demo', topLevelCrumbs('/book-a-demo')))}
      />
      <PageHero
        tone="blue"
        label="Book a demo"
        title={
          <>
            See a mission from{' '}
            <Marked mark="under" ink="ultramarine" load delay={700} weight={4.5}>
              both sides.
            </Marked>
          </>
        }
        intro="Tell us a little about your school. It takes a minute; we’ll take it from there."
        size="headline"
      />

      <section className="pb-20 md:pb-28">
        <div className="page grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <DemoForm />
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-4">
            <h2 className="hand mb-2 text-[1.4rem] text-vermilion-ink">What happens next</h2>
            <ol className="border-t-2 border-ink">
              {WHAT_HAPPENS.map((s, i) => (
                <li key={s.title} className="flex gap-4 border-b border-ink/15 py-5">
                  <span className="t-num font-serif text-[2.2rem] italic leading-none text-ultramarine">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="t-small mt-1 text-graphite">{s.line}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[1.15rem]">
              <Note ink="graphite" tilt={-2}>
                Prefer email?
              </Note>
              <Arrow to="right" ink="graphite" className="mx-2 inline-block h-5 w-12 align-middle" />
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="link text-base font-medium">
                {SITE_CONTACT_EMAIL}
              </a>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

import { DemoForm } from '@/components/forms/DemoForm';
import { StructuredData } from '@/components/seo/StructuredData';
import { Photo } from '@/components/media/Photo';
import { Arrow, Marked, Note } from '@/components/brush/marks';
import { NextSteps } from '@/components/contact/NextSteps';
import { images } from '@/content/images';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/book-a-demo' });

const WHAT_HAPPENS = [
  { title: 'We get in touch', line: 'By email or phone, to find a time that suits you.' },
  { title: 'You see a mission from both sides', line: 'The pupil’s hour, the Thoughtprint, and the teacher’s Monday screen, live.' },
  { title: 'We plan a pilot', line: 'If it fits, ten weeks shaped around your curriculum.' },
];

/**
 * Book a demo (ADR-034): conversion first. The headline and the form open the page; beside them, a taped photo
 * and the next three steps as a drawn path.
 */
export default function BookDemoPage() {
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/book-a-demo' }), breadcrumbNode('/book-a-demo', topLevelCrumbs('/book-a-demo')))}
      />

      <section className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="page grid-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="hand rise text-[1.25rem] text-ultramarine">Book a demo</p>
            <h1 className="t-headline rise mt-2 max-w-[15ch]" style={{ '--d': '60ms' } as React.CSSProperties}>
              See a mission from{' '}
              <Marked mark="under" ink="ultramarine" load delay={650} weight={4.5}>
                both sides.
              </Marked>
            </h1>
            <p className="t-lead rise mt-4 max-w-[46ch] text-graphite" style={{ '--d': '140ms' } as React.CSSProperties}>
              Tell us a little about your school. It takes a minute; we’ll take it from there.
            </p>
            <div className="rise mt-8 md:mt-10" style={{ '--d': '200ms' } as React.CSSProperties}>
              <DemoForm />
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto max-w-[380px] rotate-[1.6deg] bg-white p-2 pb-4 shadow-[0_24px_48px_-28px_rgba(31,28,25,0.5)] lg:mx-0">
                <span aria-hidden="true" className="tape absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-3deg]" />
                <Photo image={images.teacherOneToOne} aspect="aspect-[4/3]" reveal={false} sizes="(min-width: 1024px) 360px, 90vw" />
                <p className="hand px-2 pt-3 text-[1.1rem] leading-snug text-graphite">One mission, seen from the pupil’s side and the teacher’s.</p>
              </div>

              <div className="mt-12">
                <NextSteps steps={WHAT_HAPPENS} />
              </div>

              <p className="mt-10 text-[1.15rem]">
                <Note ink="graphite" tilt={-2}>
                  Prefer email?
                </Note>
                <Arrow to="right" ink="graphite" className="mx-2 inline-block h-5 w-12 align-middle" />
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="link text-base font-medium">
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

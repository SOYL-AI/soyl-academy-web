import Link from 'next/link';
import { DoorPicker } from '@/components/home/DoorPicker';
import { DoorStateProvider } from '@/components/home/DoorState';
import { Arrow } from '@/components/ink/Button';
import { FaqList } from '@/components/ink/FaqList';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { PageIntro } from '@/components/ink/PageIntro';
import { StructuredData } from '@/components/seo/StructuredData';
import { photo } from '@/content/credits';
import { studentsFaqs } from '@/content/faqs';
import { PLATFORM_ENABLED } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/students' });

/**
 * For students, merged into free learning (docs/redesign-ink-and-wash.md §3.3): a short page that hands straight
 * to the homepage door. The URL keeps answering 200.
 *
 * With the platform on, the door's own picker sits under the heading (board, class, "Open Class N" into /learn),
 * sharing the homepage's stored pick. With it off (GEN-4) there is no platform link: the door's "open soon"
 * line instead. Then Future Builders, which takes students without their school, and three questions.
 */
export default function StudentsPage() {
  const fb = photo('arduino-team');
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/students' }), breadcrumbNode('/students', topLevelCrumbs('/students')), faqNode('/students', studentsFaqs))}
      />

      <PageIntro
        title="Every lesson is free."
        lead="Classes 7 to 12. CBSE, ICSE and ISC. Lessons, notes, flashcards and practice cost nothing, and you only ever pay for AI."
        actions={
          <div className="w-full">
            {PLATFORM_ENABLED ? (
              <>
                <p className="ink-ask">What are you studying?</p>
                <DoorStateProvider remember>
                  <DoorPicker />
                </DoorStateProvider>
              </>
            ) : (
              <p className="ink-ask">Free lessons for Classes 7 to 12 open soon.</p>
            )}
          </div>
        }
        photo={{ slug: 'desk-pages', position: '62% 70%' }}
      />

      <section aria-labelledby="fb-title" className="pb-16 md:pb-24">
        <div className="page">
          <Link
            href="/future-builders"
            className="group grid items-center gap-6 rounded-[var(--radius-md)] bg-[#F3D36B] p-5 text-ink md:grid-cols-12 md:gap-8 md:p-6"
          >
            <div className="md:col-span-5">
              <InkPhoto src={fb.src} alt={fb.alt} aspect="3 / 2" sizes="(min-width: 1320px) 480px, (min-width: 768px) 38vw, 88vw" />
            </div>
            <div className="md:col-span-7">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink/75">Future Builders · Grades 7 to 12</p>
              <h2 id="fb-title" className="ink-title mt-2">
                Want to build something real?
              </h2>
              <p className="mt-3 max-w-[52ch] text-ink/85">
                A live online summer camp in software, AI, IoT robotics and entrepreneurship. You build a working product and pitch it, and you can join without your school.
              </p>
              <span className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold">
                About Future Builders
                <Arrow className="transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <FaqList faqs={studentsFaqs} heading="Questions from students" />
    </>
  );
}

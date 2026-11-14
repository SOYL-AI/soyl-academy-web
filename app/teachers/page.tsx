import Link from 'next/link';
import { FinalCta } from '@/components/home/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { Arrow, Dab, Marked, Note, type Ink } from '@/components/brush/marks';
import { MissionBrief } from '@/components/teachers/MissionBrief';
import { MondayGroup } from '@/components/teachers/MondayGroup';
import { homeFaqs } from '@/content/faqs';
import { images } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/teachers' });

const STEPS = [
  { title: 'Set the outcomes', line: 'Class, chapter, and two to four things pupils should be able to do. Type them in your own words.' },
  { title: 'Read the brief', line: 'What pupils will do, the misconceptions we will listen for, and every question if you want it.' },
  { title: 'Approve', line: 'Nothing reaches a pupil before you do. Each pupil then takes their own path through it.' },
];

const MONDAY_POINTS: { text: string; ink: Ink }[] = [
  { text: 'Grouped by what to teach, never by score.', ink: 'ultramarine' },
  { text: 'Every label shows its evidence: a quote, a clip, a photo, the attempt.', ink: 'vermilion' },
  { text: 'Confirm, change or reject a label in one tap. Your corrections are kept and teach the engine.', ink: 'ochre' },
  { text: 'Pupils who are stuck are marked “needs you”, so no one slips through.', ink: 'sap' },
];

const FAQ_QUESTIONS = [
  'Who decides what pupils are asked, the AI or the teacher?',
  'Do the hints give pupils the answer?',
  'What does the teacher see afterwards?',
];
const faqs = homeFaqs.filter((f) => FAQ_QUESTIONS.includes(f.question));

export default function TeachersPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/teachers' }),
          breadcrumbNode('/teachers', topLevelCrumbs('/teachers')),
          faqNode('/teachers', faqs)
        )}
      />

      <PageHero
        tone="blue"
        label="For teachers"
        title={
          <>
            Set outcomes, <span className="t-accent">not questions.</span>
          </>
        }
        intro="Say what pupils should be able to do. SOYL drafts the mission, you read a short brief and approve it, and on Monday you see who needs what."
        actions={
          <>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href="#brief" variant="secondary" size="lg">
              See a brief
            </ButtonLink>
          </>
        }
        image={images.teacherMentoring}
      />

      {/* 01 · Three steps */}
      <section className="section">
        <div className="page">
          <SectionHeader label="How you make a mission" num="01" title="Outcomes in. A mission out." layout="stack" />
          <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <span className="t-num font-serif text-[3rem] italic leading-none text-vermilion-ink">{i + 1}</span>
                <h3 className="mt-3 font-serif text-[1.75rem] leading-tight tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-2 max-w-[34ch] text-graphite">{s.line}</p>
                {i < STEPS.length - 1 && <Arrow to="right" ink="graphite" className="absolute -right-8 top-2 hidden h-10 w-20 md:block lg:-right-4" />}
              </li>
            ))}
          </ol>
          <p className="mt-12 text-[1.3rem]" data-reveal>
            <Note ink="vermilion-ink" tilt={-2}>
              Teachers approve every mission.
            </Note>
          </p>
        </div>
      </section>

      {/* 02 · The mission brief */}
      <section id="brief" className="section scroll-mt-16 bg-sheet-deep">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5 lg:pt-6">
            <SectionHeader
              label="The mission brief"
              num="02"
              title={
                <>
                  One screen. <Marked mark="under" ink="ultramarine">Everything</Marked> you approve.
                </>
              }
              intro="No two pupils follow the same path, so you approve the pool behind the mission rather than one fixed list. The question editor is still there, behind “See every question”."
              layout="stack"
            />
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <MissionBrief />
          </div>
        </div>
      </section>

      {/* 03 · Monday */}
      <section className="section">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5 lg:pt-6">
            <SectionHeader
              label="After the mission"
              num="03"
              title="Monday: who needs what."
              layout="stack"
            />
            <ul className="mt-8 space-y-4" data-reveal>
              {MONDAY_POINTS.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <Dab ink={p.ink} className="mt-1.5" />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <MondayGroup />
            <p className="mt-5 text-graphite">
              Seven days later a short recheck shows whether it stuck.{' '}
              <Link href="/students" className="font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
                See the pupil’s side
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={faqs} heading="Questions from teachers" className="bg-sheet-deep" />
      <FinalCta headline="Try it with your next chapter." line="Book a demo and we’ll build a mission from your outcomes, then show you the brief and the Monday screen." />
    </>
  );
}

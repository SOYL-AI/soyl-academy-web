import Link from 'next/link';
import { FinalCta } from '@/components/home/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { PALETTE } from '@/components/brush/palette';
import { Dab, Marked, Note, type Ink } from '@/components/brush/marks';
import { ClassView } from '@/components/schools/ClassView';
import { schoolsFaqs } from '@/content/faqs';
import { renames } from '@/content/home';
import { images } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, howToNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/schools' });

/** The pilot, in three phases. Also the page's HowTo structured data, so keep the two identical. */
const PILOT = [
  { title: 'Introduce', weeks: 'Weeks 1–2', desc: 'Training for a core group of early-adopter teachers. Map two or three units to missions.' },
  { title: 'Implement', weeks: 'Weeks 3–8', desc: 'Teachers run missions with their classes, with our support as pupils respond.' },
  { title: 'Evaluate', weeks: 'Weeks 9–10', desc: 'Review the Thoughtprints, the rechecks and teacher feedback; plan a wider rollout.' },
];

const MEASURES: { title: string; line: string; ink: Ink }[] = [
  { title: 'Learning inside the hour', line: 'Pupils who started a mission with a misconception and were secure on it by the end.', ink: 'ultramarine' },
  { title: 'Learning that sticks', line: 'What is still secure at the seven-day recheck.', ink: 'sap' },
  { title: 'Teachers acting on it', line: 'Groups where a teacher approved or edited a next move within the week.', ink: 'vermilion' },
  { title: 'Trust in the diagnosis', line: 'How often teachers confirm the labels the engine suggests.', ink: 'ochre' },
  { title: 'Screen time kept in check', line: 'Missions that finish inside the hour, and how long they usually take.', ink: 'ultramarine' },
];

const CARE = [
  'Teachers approve every mission before a pupil sees it.',
  'Every diagnosis shows its evidence, and a teacher can correct it in one tap.',
  'Pupils choose to speak, type or write on paper. Paper work is off-screen.',
  'No mark is ever the headline, for pupils, parents or teachers.',
];

export default function SchoolsPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/schools' }),
          breadcrumbNode('/schools', topLevelCrumbs('/schools')),
          howToNode(
            'A SOYL Academy pilot',
            'How a school brings SOYL missions into its classes over a ten-week pilot, in three phases.',
            PILOT.map((p) => ({ title: `${p.title} (${p.weeks.toLowerCase()})`, desc: p.desc }))
          ),
          faqNode('/schools', schoolsFaqs)
        )}
      />

      <PageHero
        tone="red"
        label="For schools"
        title={
          <>
            Bring missions to <span className="t-accent">every class.</span>
          </>
        }
        intro="When AI can write the answer, a finished worksheet proves nothing. Missions ask pupils to do the thinking, and show your teachers how each pupil got there."
        actions={
          <>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              Plan a pilot
            </ButtonLink>
            <ButtonLink href="#workflow" variant="secondary" size="lg">
              See the pilot
            </ButtonLink>
          </>
        }
        image={images.classroomWide}
      />

      {/* 01 · What changes */}
      <section className="section">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeader label="What changes" num="01" title="The output is no longer the proof." layout="stack" />
          </div>
          <ul className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-12" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            {renames.map((r) => (
              <li key={r.now} className="border-t border-ink/15 py-5 first:border-t-2 first:border-ink">
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <Marked mark="strike" ink="vermilion" weight={2.5} className="text-graphite">
                    {r.old}
                  </Marked>
                  <span aria-hidden="true" className="text-graphite">
                    →
                  </span>
                  <span className="font-serif text-[1.75rem] leading-none tracking-[-0.015em]">{r.now}</span>
                </p>
                <p className="mt-2 text-graphite">{r.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 · The pilot */}
      <section id="workflow" className="section scroll-mt-16 bg-sheet-deep">
        <div className="page">
          <SectionHeader
            label="What a pilot looks like"
            num="02"
            title={
              <>
                Ten weeks. <span className="t-accent">Your</span> curriculum.
              </>
            }
            intro="Missions sit on top of the chapters you already teach. They change how learning is shown, not what is taught."
          />
          <BrushArt
            art="path"
            options={{
              stops: [
                [1 / 6, 0.58],
                [0.5, 0.38],
                [5 / 6, 0.56],
              ],
              pigments: ['ultramarine', 'vermilion', 'sap'],
            }}
            seed={14}
            stepMs={80}
            bg={PALETTE.sheetDeep}
            className="mt-10 hidden h-32 w-full md:block"
          />
          <ol className="mt-10 grid gap-8 md:-mt-1 md:grid-cols-3 md:gap-6 md:text-center">
            {PILOT.map((p, i) => (
              <li key={p.title} className="flex gap-4 md:block" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <Dab ink={(['ultramarine', 'vermilion', 'sap'] as Ink[])[i]} className="mt-2 h-4 w-4 md:hidden" />
                <div>
                  <p className="hand text-[1.15rem] text-graphite">{p.weeks}</p>
                  <h3 className="font-serif text-[2rem] leading-none tracking-[-0.015em]">{p.title}</h3>
                  <p className="mx-auto mt-3 max-w-[30ch] text-graphite">{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 · What leaders see */}
      <section className="section">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              label="For heads of department"
              num="03"
              title="Misconceptions by class, over time."
              intro="Teachers work from their own Monday screen. Leaders get a class view: which ideas are still open, where a Fix mission went out, and what held at the recheck."
              layout="stack"
            />
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <ClassView />
          </div>
        </div>
      </section>

      {/* 04 · What we measure */}
      <section className="section bg-sheet-deep">
        <div className="page">
          <SectionHeader label="What we measure" num="04" title="Did they learn it, and did it stick?" layout="stack" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" data-reveal>
            {MEASURES.map((m) => (
              <li key={m.title} className="leaf p-5">
                <Dab ink={m.ink} className="h-4 w-4" />
                <h3 className="mt-4 font-serif text-[1.35rem] leading-tight tracking-[-0.01em]">{m.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-snug text-graphite">{m.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 · Care */}
      <section className="section">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader label="Teachers stay in control" num="05" title="Careful with children’s thinking, and their data." layout="stack" />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-12" data-reveal>
            <ul className="border-t-2 border-ink">
              {CARE.map((c) => (
                <li key={c} className="border-b border-ink/15 py-4 font-medium">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-graphite">
              How we handle pupils’ data is set out in our{' '}
              <Link href="/privacy" className="font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
                privacy policy
              </Link>
              .
            </p>
            <p className="mt-6 text-[1.25rem]">
              <Note ink="vermilion-ink" tilt={-2}>
                Start small: one group of teachers, one term.
              </Note>
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={schoolsFaqs} heading="Questions from school leaders" className="bg-sheet-deep" />
      <FinalCta headline="Start with one group of teachers." line="Book a demo to see a mission from both sides and plan a ten-week pilot for your school." />
    </>
  );
}

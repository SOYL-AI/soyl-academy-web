import Link from 'next/link';
import { FinalCta } from '@/components/home/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { Photo } from '@/components/media/Photo';
import { Dab, Marked, Note, type Ink } from '@/components/brush/marks';
import { Scene } from '@/components/story/Scene';
import { Kinetic } from '@/components/story/Kinetic';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Tilt } from '@/components/story/Tilt';
import { TermLine } from '@/components/schools/TermLine';
import { TermClassView } from '@/components/schools/TermClassView';
import { schoolsFaqs } from '@/content/faqs';
import { renames } from '@/content/home';
import { images, type ImageKey } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, howToNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/schools' });

/** The pilot, in three phases. Also the page's HowTo structured data and the FAQ answer, so keep all three identical. */
const PILOT = [
  { title: 'Introduce', weeks: 'Weeks 1–2', desc: 'Training for a core group of early-adopter teachers. Map two or three units to missions.' },
  { title: 'Implement', weeks: 'Weeks 3–8', desc: 'Teachers run missions with their classes, with our support as pupils respond.' },
  { title: 'Evaluate', weeks: 'Weeks 9–10', desc: 'Review the Thoughtprints, the rechecks and teacher feedback; plan a wider rollout.' },
];

const PHASE_INK: Record<string, { ink: Ink; colour: string }> = {
  Introduce: { ink: 'ultramarine', colour: 'var(--color-ultramarine)' },
  Implement: { ink: 'vermilion', colour: 'var(--color-vermilion)' },
  Evaluate: { ink: 'sap', colour: 'var(--color-sap)' },
};

/** The term, told week by week. Every line restates the pilot above. */
const TERM: { when: string; phase: string; title: string; line: string; image: ImageKey }[] = [
  { when: 'Week 1', phase: 'Introduce', title: 'A core group of teachers', line: 'Training for the early adopters. Start small: one group, one term.', image: 'schoolAssembly' },
  { when: 'Week 2', phase: 'Introduce', title: 'Your units, mapped to missions', line: 'Two or three units from the chapters you already teach.', image: 'deskPencils' },
  { when: 'Week 3', phase: 'Implement', title: 'The first missions', line: 'One scene, five stages, about 45 minutes. Every pupil on their own path.', image: 'pupilsReading' },
  { when: 'Every Monday', phase: 'Implement', title: 'Groups, not scores', line: 'Teachers start the week with pupils grouped by misconception, and a next move for each group.', image: 'studentsDebating' },
  { when: 'Weeks 3–8', phase: 'Implement', title: 'With our support', line: 'We stay close while pupils respond, and adjust missions with your teachers.', image: 'groupOnGrass' },
  { when: 'Week 9', phase: 'Evaluate', title: 'Read the evidence', line: 'The Thoughtprints, the seven-day rechecks and what your teachers say.', image: 'magnifier' },
  { when: 'Week 10', phase: 'Evaluate', title: 'Decide what’s next', line: 'Plan a wider rollout, with the evidence in front of you.', image: 'studentsPresenting' },
];

const QUESTIONS: { q: string; a: React.ReactNode; ink: Ink }[] = [
  {
    q: 'Does it fit our board?',
    a: 'Missions are built from the chapters and outcomes you already teach: CBSE, ICSE or a state board. They change how learning is shown, not what is taught.',
    ink: 'ultramarine',
  },
  {
    q: 'Is it careful with children?',
    a: (
      <>
        Teachers approve every mission before a pupil sees it. Every diagnosis shows its evidence and can be corrected in one tap. Our{' '}
        <Link href="/privacy" className="font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
          privacy policy
        </Link>{' '}
        sets out how pupils’ data is handled.
      </>
    ),
    ink: 'vermilion',
  },
  {
    q: 'What does it ask of teachers?',
    a: 'Set outcomes, not questions. Read one short brief and approve it. Start Monday with groups instead of a pile of marking.',
    ink: 'ochre',
  },
  {
    q: 'What about screen time?',
    a: 'Pupils choose to speak, type or write on paper, and paper work is off-screen. No mission runs past an hour.',
    ink: 'sap',
  },
];

const MEASURES: { title: string; line: string; ink: Ink }[] = [
  { title: 'Did they learn it in the hour?', line: 'Pupils who started with a misconception and were secure on it by the end.', ink: 'ultramarine' },
  { title: 'Did it stick?', line: 'What is still secure at the seven-day recheck.', ink: 'sap' },
  { title: 'Did teachers act on it?', line: 'Groups where a teacher approved or edited a next move within the week.', ink: 'vermilion' },
  { title: 'Do teachers trust the diagnosis?', line: 'How often teachers confirm the labels the engine suggests.', ink: 'ochre' },
  { title: 'Was screen time kept in check?', line: 'Missions that finish inside the hour, and how long they usually take.', ink: 'ultramarine' },
];

function WeekStrip() {
  return (
    <div className="leaf px-5 pb-5 pt-5 md:px-6" aria-label="The pilot: weeks 1 to 2 Introduce, 3 to 8 Implement, 9 to 10 Evaluate" role="img">
      <p className="hand text-[1.1rem] leading-none text-vermilion-ink">One term</p>
      <div className="mt-3 grid grid-cols-10 gap-1.5" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => {
          const phase = i < 2 ? 'Introduce' : i < 8 ? 'Implement' : 'Evaluate';
          return (
            <span key={i} className="week-cell grid aspect-square place-items-center text-[0.7rem] font-semibold text-sheet" style={{ background: PHASE_INK[phase]!.colour }}>
              {i + 1}
            </span>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1.5 text-[0.78rem] text-graphite" aria-hidden="true">
        <span className="col-span-2">Introduce</span>
        <span className="col-span-6 text-center">Implement</span>
        <span className="col-span-2 text-right">Evaluate</span>
      </div>
    </div>
  );
}

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
      <ChapterRail label="A term with SOYL" />

      {/* Prologue */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="hand flex items-center gap-2 text-[1.25rem] text-vermilion-ink">
              <Dab ink="vermilion" /> For schools · a ten-week pilot
            </p>
            <Kinetic as="h1" load className="t-display mt-4 max-w-[12ch]">
              <Kinetic.Word i={0}>A</Kinetic.Word> <Kinetic.Word i={1}>term</Kinetic.Word> <Kinetic.Word i={2}>with</Kinetic.Word>{' '}
              <Kinetic.Word i={3} className="t-accent">
                missions.
              </Kinetic.Word>
            </Kinetic>
            <p className="t-lead mt-6 max-w-[40ch] text-ink">
              One group of teachers, the chapters you already teach, ten weeks. Here is how the term unfolds.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                Plan a pilot
              </ButtonLink>
              <ButtonLink href="#term" variant="secondary" size="lg">
                Walk through the term
              </ButtonLink>
            </div>
          </div>
          <div className="relative col-span-12 lg:col-span-6">
            <Photo image={images.walkToSchool} aspect="aspect-[4/3]" backdrop="red" priority sizes="(min-width: 1024px) 600px, 100vw" />
            <div className="relative z-10 -mt-8 ml-auto w-[min(100%,21rem)] rotate-[1.5deg] md:-mt-16 lg:absolute lg:-bottom-14 lg:-left-12 lg:mt-0 lg:rotate-[-1.5deg]">
              <WeekStrip />
            </div>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section id="why" data-chapter="Why now" className="section relative scroll-mt-16 bg-sheet-deep">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="hand text-[1.3rem] text-vermilion-ink">Why now</p>
            <Kinetic as="h2" className="t-headline mt-2 max-w-[14ch]" text="When AI can write the answer, a finished worksheet proves nothing." />
            <ul className="mt-10 max-w-[30rem]" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              {renames.map((r) => (
                <li key={r.now} className="border-t border-ink/15 py-4 first:border-t-2 first:border-ink">
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <Marked mark="strike" ink="vermilion" weight={2.5} className="text-graphite">
                      {r.old}
                    </Marked>
                    <span aria-hidden="true" className="text-graphite">
                      →
                    </span>
                    <span className="font-serif text-[1.65rem] leading-none tracking-[-0.015em]">{r.now}</span>
                  </p>
                  <p className="mt-1.5 text-[0.95rem] text-graphite">{r.line}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8">
            <Photo image={images.schoolVerandah} aspect="aspect-[3/4]" large sizes="(min-width: 1024px) 480px, (min-width: 768px) 66vw, 100vw" />
            <p className="mt-4 text-[1.2rem]">
              <Note ink="graphite" tilt={-2}>
                Missions change how learning is shown, not what is taught.
              </Note>
            </p>
          </div>
        </div>
      </section>

      {/* The term */}
      <section id="term" data-chapter="The term" className="section relative scroll-mt-16">
        <div className="page">
          <div className="max-w-[44rem]">
            <p className="hand text-[1.3rem] text-ultramarine">The term</p>
            <Kinetic as="h2" className="t-headline mt-2" text="Ten weeks, one step at a time." />
          </div>

          <TermLine className="mt-14 md:mt-20">
            <div className="term-track left-[11px] md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
              <span className="term-fill" />
            </div>
            <ol className="relative space-y-14 md:space-y-24">
              {TERM.map((t, i) => {
                const right = i % 2 === 1;
                const phase = PHASE_INK[t.phase]!;
                const first = i === 0 || TERM[i - 1]!.phase !== t.phase;
                return (
                  <li key={t.when} className="term-step relative grid gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0" data-reveal style={{ '--dot': phase.colour } as React.CSSProperties}>
                    <span aria-hidden="true" className="term-dot absolute left-[1px] top-1.5 h-6 w-6 rounded-full md:left-1/2 md:top-8 md:-translate-x-1/2" />
                    <div className={right ? 'md:order-2 md:pl-4' : 'md:pr-4 md:text-right'}>
                      {first && (
                        <p className={`mb-3 inline-flex items-center gap-2 rounded-full bg-sheet-deep px-3 py-1 text-[0.85rem] font-semibold ${right ? '' : 'md:flex-row-reverse'}`}>
                          <Dab ink={phase.ink} /> {t.phase}
                        </p>
                      )}
                      <p className="hand text-[1.25rem] leading-none text-graphite">{t.when}</p>
                      <h3 className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05] tracking-[-0.02em]">{t.title}</h3>
                      <p className={`mt-3 max-w-[34ch] text-graphite ${right ? '' : 'md:ml-auto'}`}>{t.line}</p>
                    </div>
                    <div className={right ? 'md:order-1 md:pr-4' : 'md:pl-4'}>
                      <Tilt max={4} className={`max-w-[26rem] ${right ? 'md:ml-auto' : ''}`}>
                        <div className={`leaf p-2 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}>
                          <Photo image={images[t.image]} aspect="aspect-[3/2]" reveal={false} sizes="(min-width: 768px) 420px, 90vw" className="rounded-[3px]" />
                        </div>
                      </Tilt>
                    </div>
                  </li>
                );
              })}
            </ol>
          </TermLine>
        </div>
      </section>

      {/* What leaders see, across the term */}
      <Scene id="leaders" chapter="What leaders see" length={2.6} mobileLength={2.3} steps={3} underNav aria-label="What leaders see: misconceptions by class across the term" className="bg-sheet-deep">
        <div className="page grid h-full grid-rows-[auto_1fr] gap-4 pb-6 pt-6 md:pt-10 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-10 lg:pb-10">
          <div className="lg:col-span-4">
            <p className="hand text-[1.15rem] leading-none text-graphite md:text-[1.25rem]">For heads of department</p>
            <p className="mt-1 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.025em]" aria-hidden="true">
              Week{' '}
              <span className="inline-grid [&>*]:[grid-area:1/1]">
                <span data-only="0">3</span>
                <span data-only="1">6</span>
                <span data-only="2">10</span>
              </span>
            </p>
            <h2 className="sr-only">What leaders see, from week 3 to week 10</h2>
            <div className="relative mt-3 min-h-[4.5rem] md:mt-6 md:min-h-[8rem]">
              <p data-only="0" className="absolute inset-x-0 top-0 text-[1.02rem] leading-snug md:text-[1.3rem] md:leading-snug">
                Early on, most ideas are still open. Each one is a misconception a mission has found.
              </p>
              <p data-only="1" className="absolute inset-x-0 top-0 text-[1.02rem] leading-snug md:text-[1.3rem] md:leading-snug">
                Mid-term, Fix missions are out where teachers chose to act.
              </p>
              <p data-only="2" className="absolute inset-x-0 top-0 text-[1.02rem] leading-snug md:text-[1.3rem] md:leading-snug">
                By week 10 you can see what held at the seven-day recheck, class by class.
              </p>
            </div>
          </div>
          <div className="min-h-0 lg:col-span-8">
            <TermClassView />
          </div>
        </div>
      </Scene>

      {/* Your questions */}
      <section id="questions" data-chapter="Your questions" className="section relative scroll-mt-16">
        <div className="page">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="hand text-[1.3rem] text-vermilion-ink">What leaders ask us</p>
              <h2 className="t-headline mt-2 max-w-[14ch]">Four questions, short answers.</h2>
            </div>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {QUESTIONS.map((q, i) => (
              <li key={q.q} className={`leaf p-6 md:p-8 ${i % 2 ? 'md:translate-y-8' : ''}`} data-reveal style={{ '--d': `${i * 100}ms` } as React.CSSProperties}>
                <p className="flex items-start gap-3">
                  <Dab ink={q.ink} className="mt-2.5 h-4 w-4" />
                  <span className="font-serif text-[1.6rem] leading-tight tracking-[-0.015em]">{q.q}</span>
                </p>
                <p className="mt-3 pl-7 text-graphite">{q.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* At week 10 */}
      <section id="measures" data-chapter="At week 10" className="section relative scroll-mt-16 bg-sheet-deep">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28">
            <p className="hand text-[1.3rem] text-sap">At week 10</p>
            <Kinetic as="h2" className="t-headline mt-2 max-w-[13ch]" text="Five things you’ll know." />
            <div className="mt-10 hidden lg:block">
              <Photo image={images.teacherCircle} aspect="aspect-[3/2]" backdrop="blue" backdropSide="left" sizes="440px" />
            </div>
          </div>
          <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
            {MEASURES.map((m, i) => (
              <li key={m.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-ink/15 py-6 first:border-t-2 first:border-ink" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <span className="t-num font-serif text-[1.6rem] italic leading-none text-graphite">{i + 1}</span>
                <span>
                  <span className="flex items-center gap-2.5">
                    <Dab ink={m.ink} />
                    <span className="font-serif text-[1.5rem] leading-tight tracking-[-0.01em]">{m.title}</span>
                  </span>
                  <span className="mt-1.5 block max-w-[40ch] text-graphite">{m.line}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq faqs={schoolsFaqs} heading="Questions from school leaders" />
      <FinalCta headline="Start with one group of teachers." line="Book a demo to see a mission from both sides and plan a ten-week pilot for your school." />
    </>
  );
}

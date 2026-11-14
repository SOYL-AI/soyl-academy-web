import Link from 'next/link';
import { FinalCta } from '@/components/home/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { Photo } from '@/components/media/Photo';
import { Arrow, Dab, Marked, Note } from '@/components/brush/marks';
import { Scene } from '@/components/story/Scene';
import { Kinetic } from '@/components/story/Kinetic';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Film } from '@/components/story/Film';
import { MissionBrief } from '@/components/teachers/MissionBrief';
import { MondayGroup } from '@/components/teachers/MondayGroup';
import { MondayField } from '@/components/teachers/MondayField';
import { DayHeading, WeekPlanner } from '@/components/teachers/Week';
import { homeFaqs } from '@/content/faqs';
import { images } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/teachers' });

const OUTCOMES = [
  'Explain the difference between power and energy.',
  'Work out the units an appliance uses.',
  'Predict brightness in series and parallel circuits.',
];

const NEVER = ['Write twenty questions.', 'Mark thirty-two worksheets.', 'Chase a countdown timer.', 'Guess who understood.'];

const FAQ_QUESTIONS = [
  'Who decides what pupils are asked, the AI or the teacher?',
  'Do the hints give pupils the answer?',
  'Is there a timer or a question counter?',
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
      <ChapterRail label="A teacher’s week" />

      {/* Prologue: the week ahead */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="hand flex items-center gap-2 text-[1.25rem] text-vermilion-ink">
              <Dab ink="vermilion" /> For teachers · a week with missions
            </p>
            <Kinetic as="h1" load className="t-display mt-4 max-w-[12ch]">
              <Kinetic.Word i={0}>Set</Kinetic.Word> <Kinetic.Word i={1}>outcomes,</Kinetic.Word>{' '}
              <Kinetic.Word i={2}>
                <Marked mark="strike" ink="vermilion" load delay={1100} className="text-graphite">
                  not
                </Marked>
              </Kinetic.Word>{' '}
              <Kinetic.Word i={3} className="t-accent">
                questions.
              </Kinetic.Word>
            </Kinetic>
            <p className="t-lead mt-6 max-w-[40ch] text-ink">
              Say what pupils should be able to do. Approve the mission. On Monday, see who needs what. Here is the week.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                {PRIMARY_CTA.label}
              </ButtonLink>
              <Film />
            </div>
          </div>
          <div className="relative col-span-12 lg:col-span-6">
            <Photo image={images.teacherOneToOne} aspect="aspect-[4/3]" backdrop="blue" priority sizes="(min-width: 1024px) 600px, 100vw" />
            <div className="relative z-10 -mt-10 ml-auto w-[min(100%,24rem)] rotate-[1.2deg] md:-mt-24 md:mr-[-1rem] lg:absolute lg:-bottom-16 lg:-left-14 lg:mt-0 lg:w-[19rem] lg:rotate-[-1.5deg]">
              <WeekPlanner />
            </div>
          </div>
        </div>
      </section>

      {/* Friday: outcomes */}
      <section id="friday" data-chapter="Friday" className="section relative scroll-mt-16">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <DayHeading id="friday" />
            <p className="t-lead mt-8 max-w-[34ch] text-ink" data-reveal>
              Three things pupils should be able to do, in your own words. About ten minutes.
            </p>
            <p className="mt-6 text-[1.3rem]" data-reveal>
              <Note ink="vermilion-ink" tilt={-2}>
                No questions to write.
              </Note>
            </p>
          </div>
          <div className="relative col-span-12 lg:col-span-6 lg:col-start-7">
            <div aria-hidden="true" className="absolute -right-6 -top-10 hidden w-[58%] rotate-[4deg] opacity-90 md:block">
              <Photo image={{ ...images.deskPencils, alt: '' }} aspect="aspect-[4/3]" reveal={false} sizes="340px" className="rounded-[4px]" />
            </div>
            <figure aria-label="Example: outcomes for a mission" className="leaf relative z-10 mt-10 max-w-[30rem] px-6 pb-7 pt-6 md:mt-24 md:px-8" data-reveal>
              <figcaption className="flex items-center justify-between gap-4 border-b border-ink/10 pb-3 text-[0.85rem]">
                <span className="font-semibold">New mission</span>
                <span className="text-graphite">Class 8B · Electricity · Example</span>
              </figcaption>
              <p className="mt-5 text-[0.85rem] font-semibold text-graphite">Pupils should be able to…</p>
              <ol className="mt-3 space-y-3">
                {OUTCOMES.map((o, i) => (
                  <li key={o} className="flex gap-3" data-reveal style={{ '--d': `${200 + i * 260}ms` } as React.CSSProperties}>
                    <span className="t-num font-serif text-[1.3rem] italic leading-none text-ultramarine">{i + 1}</span>
                    <span className="border-b border-dashed border-ink/25 pb-2 font-serif text-[1.25rem] leading-snug">{o}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 inline-flex rounded-md bg-ink px-3.5 py-2 text-[0.875rem] font-semibold text-sheet" aria-hidden="true">
                Draft the mission
              </p>
            </figure>
          </div>
        </div>
      </section>

      {/* Saturday: the brief, approved */}
      <section id="saturday" data-chapter="Saturday" className="section relative scroll-mt-16 bg-sheet-deep">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:sticky lg:top-28 lg:col-span-5">
            <DayHeading id="saturday" tone="ultramarine" />
            <p className="t-lead mt-8 max-w-[34ch] text-ink" data-reveal>
              SOYL has drafted the mission. One screen shows what pupils will do and the misconceptions it will listen for.
            </p>
            <ul className="mt-6 space-y-3 text-graphite" data-reveal>
              <li className="flex gap-3">
                <Dab ink="ultramarine" className="mt-1.5" />
                Every question is there if you want to see it.
              </li>
              <li className="flex gap-3">
                <Dab ink="ochre" className="mt-1.5" />
                Change the wording, remove an item, or regenerate.
              </li>
              <li className="flex gap-3">
                <Dab ink="vermilion" className="mt-1.5" />
                Nothing reaches a pupil until you approve it.
              </li>
            </ul>
          </div>
          <div className="relative col-span-12 lg:col-span-7" data-reveal>
            <MissionBrief />
            <div
              aria-hidden="true"
              className="stamp pointer-events-none absolute right-3 top-16 px-4 py-2 text-center md:bottom-4 md:right-8 md:top-auto md:px-5 md:py-2.5"
            >
              <span className="block text-[0.75rem] font-bold uppercase tracking-[0.18em]">Approved</span>
              <span className="hand block text-[1.5rem] leading-none md:text-[1.8rem]">by you</span>
            </div>
          </div>
        </div>
      </section>

      {/* Wednesday: the mission */}
      <section id="wednesday" data-chapter="Wednesday" className="section relative scroll-mt-16">
        <div className="page">
          <DayHeading id="wednesday" tone="ochre" />
          <div className="grid-12 mt-10 items-end gap-y-10 md:mt-14">
            <div className="col-span-12 lg:col-span-8">
              <Photo image={images.teacherCircle} aspect="aspect-[16/10]" large sizes="(min-width: 1024px) 840px, 100vw" />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Kinetic as="p" className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.08] tracking-[-0.02em]" text="Every pupil takes their own path. You walk the room." />
              <ul className="mt-8 space-y-3 text-graphite" data-reveal>
                <li className="flex gap-3">
                  <Dab ink="ultramarine" className="mt-1.5" />
                  Pupils speak, type, or work in their notebook.
                </li>
                <li className="flex gap-3">
                  <Dab ink="vermilion" className="mt-1.5" />
                  Hints ask and point. They never give the answer.
                </li>
                <li className="flex gap-3">
                  <Dab ink="sap" className="mt-1.5" />
                  No timer, no question counter. Around 45 minutes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Monday: the class sorts itself */}
      <Scene id="monday" chapter="Monday" length={3} mobileLength={2.6} steps={4} underNav aria-label="Monday, 8:10 am: the class grouped by misconception" className="bg-sheet-deep">
        <div className="page grid h-full grid-rows-[auto_1fr] gap-4 pb-6 pt-6 md:pt-10 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-8 lg:pb-10">
          <div className="lg:col-span-5">
            <p className="hand text-[1.15rem] leading-none text-graphite md:text-[1.25rem]">8:10 am · before the bell</p>
            <h2 className="mt-1 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.025em]">Monday</h2>
            <div className="relative mt-4 min-h-[5.5rem] md:mt-8 md:min-h-[9rem]">
              <p data-only="0" className="absolute inset-x-0 top-0 text-[1.05rem] leading-snug md:text-[1.4rem] md:leading-snug">
                Thirty pupils did the mission. You don’t have thirty worksheets to mark.
              </p>
              <p data-only="1" className="absolute inset-x-0 top-0 text-[1.05rem] leading-snug md:text-[1.4rem] md:leading-snug">
                SOYL has read every attempt and grouped the class by what they think, never by score.
              </p>
              <p data-only="2" className="absolute inset-x-0 top-0 text-[1.05rem] leading-snug md:text-[1.4rem] md:leading-snug">
                Each group comes with its evidence and a suggested next move.{' '}
                <span className="hidden md:inline">Pick one to see its pupils.</span>
              </p>
              <p data-only="3" className="absolute inset-x-0 top-0 text-[1.05rem] leading-snug md:text-[1.4rem] md:leading-snug">
                Confirm, change or skip each move. You’re ready before the bell.
              </p>
            </div>
            <p className="hand mt-2 hidden text-[1.05rem] text-graphite md:block">An example class.</p>
          </div>
          <div className="relative min-h-0 lg:col-span-7 lg:h-[min(34rem,72svh)]">
            <div className="leaf h-full min-h-[300px] p-3 md:p-5">
              <MondayField />
            </div>
          </div>
        </div>
      </Scene>

      {/* Monday, one group opened */}
      <section className="section-tight">
        <div className="page grid-12 items-center gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="hand text-[1.25rem] text-vermilion-ink">Open a group</p>
            <h2 className="t-title mt-2 max-w-[18ch]">Every label shows its evidence.</h2>
            <p className="mt-4 max-w-[38ch] text-graphite">
              A voice clip, a photo of the working, the attempt where it went wrong. Correct a label in one tap; your corrections are kept.
            </p>
            <div className="mt-8 hidden lg:block">
              <Photo image={images.teacherLeaning} aspect="aspect-[3/2]" backdrop="yellow" backdropSide="left" sizes="420px" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal>
            <MondayGroup />
          </div>
        </div>
      </section>

      {/* Next Tuesday: the recheck */}
      <section id="tuesday" data-chapter="Next Tuesday" className="section relative scroll-mt-16 bg-sheet-deep">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <DayHeading id="tuesday" tone="sap" />
            <p className="t-lead mt-8 max-w-[34ch] text-ink" data-reveal>
              Seven days later, a five-minute recheck, cold. It shows whether the fix stuck.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <figure aria-label="Example: the nine pupils who mixed up power and energy, at the seven-day recheck" className="leaf px-6 pb-7 pt-6 md:px-8" data-reveal>
              <figcaption className="flex items-center justify-between gap-4 text-[0.85rem]">
                <span className="font-semibold">Recheck · Mixes up power and energy</span>
                <span className="text-graphite">Example</span>
              </figcaption>
              <ul className="mt-6 flex flex-wrap gap-3" aria-hidden="true">
                {Array.from({ length: 9 }, (_, i) => (
                  <li key={i} className="re-dot" {...(i < 7 ? { 'data-turn': '' } : {})} style={{ '--i': i } as React.CSSProperties} />
                ))}
              </ul>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[0.95rem]">
                <span className="flex items-center gap-2">
                  <Dab ink="sap" /> 7 now secure
                </span>
                <span className="flex items-center gap-2">
                  <Dab ink="vermilion" /> 2 get another short Fix mission
                </span>
              </p>
              <div className="mt-6 grid grid-cols-[auto_1fr] items-center gap-4 border-t border-ink/10 pt-5">
                <Photo image={{ ...images.handsSquaredPaper, alt: '' }} aspect="aspect-square" reveal={false} sizes="96px" className="w-20 rounded-[4px] md:w-24" />
                <p className="text-[0.95rem] text-graphite">The result goes into each pupil’s Story, alongside their Thoughtprint.</p>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* What you won't do */}
      <section id="never" data-chapter="What you won’t do" className="section relative scroll-mt-16">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <p className="hand text-[1.3rem] text-vermilion-ink">And all week, you won’t</p>
            <p className="mt-6 hidden lg:block">
              <Arrow to="down-right" ink="vermilion" className="h-20 w-28" />
            </p>
          </div>
          <ul className="col-span-12 lg:col-span-8">
            {NEVER.map((n, i) => (
              <li key={n} className="border-t border-ink/15 py-4 first:border-t-2 first:border-ink md:py-5" data-reveal style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
                <Marked mark="strike" ink="vermilion" weight={3.5} delay={300 + i * 120} className="font-serif text-[clamp(1.35rem,3.6vw,3rem)] leading-tight tracking-[-0.02em] text-graphite">
                  {n}
                </Marked>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq faqs={faqs} heading="Questions from teachers" className="bg-sheet-deep" />
      <section className="section-tight">
        <div className="page">
          <p className="text-graphite">
            Curious what it feels like from the other side?{' '}
            <Link href="/students" className="font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
              See the pupil’s hour
            </Link>
          </p>
        </div>
      </section>
      <FinalCta headline="Try it with your next chapter." line="Book a demo and we’ll build a mission from your outcomes, then show you the brief and the Monday screen." />
    </>
  );
}

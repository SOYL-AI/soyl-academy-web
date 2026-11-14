import type { CSSProperties } from 'react';
import { FinalCta } from '@/components/home/FinalCta';
import { MiniSimulator } from '@/components/home/MiniSimulator';
import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { Arrow, Dab, Marked, Note } from '@/components/brush/marks';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Film } from '@/components/story/Film';
import { Kinetic } from '@/components/story/Kinetic';
import { Tilt } from '@/components/story/Tilt';
import { BriefSheet } from '@/components/method/BriefSheet';
import { FlipPad } from '@/components/method/FlipPad';
import { SubjectSwitch } from '@/components/method/SubjectSwitch';
import { methodFaqs } from '@/content/faqs';
import { images } from '@/content/images';
import { brief, hero, houseRules, monday, pillars, recheck, thoughtprint } from '@/content/method';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, methodTermSetNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/method' });

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/**
 * How missions work (ADR-034): the life of one mission, told in chapters. The brief Ms Rao signs, Ira's hour on a
 * flip-pad (the page's one pinned scene), the same stages in any subject, a moment to try, the Thoughtprint, Monday's
 * groups, the recheck a week later, and the house rules. Ira and Ms Rao are illustrative and labelled so. The SOYL
 * Method's five pillars stay in the JSON-LD (DefinedTermSet) and name each stage on the pad.
 */
export default function MethodPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/method', mainEntityId: `${absoluteUrl('/method')}#method` }),
          breadcrumbNode('/method', topLevelCrumbs('/method')),
          methodTermSetNode(pillars),
          faqNode('/method', methodFaqs)
        )}
      />
      <ChapterRail label="Chapters of this page" />

      {/* Prologue */}
      <section id="prologue" data-chapter="Prologue" className="overflow-hidden">
        <div className="page grid-12 items-center gap-y-14 pb-16 pt-10 md:pb-24 md:pt-16">
          <div className="col-span-12 lg:col-span-6">
            <p className="rise hand flex items-center gap-2 text-[1.25rem] text-vermilion-ink">
              <Dab ink="vermilion" /> {hero.label}
            </p>
            <Kinetic as="h1" load text={hero.title} className="t-display mt-4 max-w-[11ch]" />
            <p className="rise t-lead mt-6 max-w-[44ch] text-graphite" style={d(350)}>
              {hero.intro}
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" style={d(450)}>
              <ButtonLink href="#brief" size="lg" arrow>
                Follow the mission
              </ButtonLink>
              <Film />
            </div>
          </div>

          <div className="relative col-span-12 md:col-span-10 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <Photo
              image={images.classroomWide}
              backdrop="blue"
              priority
              settle
              large
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              sizes="(min-width: 1320px) 500px, (min-width: 1024px) 40vw, 90vw"
            />
            <div className="rise absolute -bottom-10 -left-2 w-[min(78%,330px)] md:-left-10" style={d(600)}>
              <div className="leaf tape -rotate-3 px-5 pb-5 pt-6">
                <p className="t-eyebrow text-[0.7rem] text-graphite">{hero.ticket.tag}</p>
                <p className="mt-2 font-serif text-[1.35rem] leading-[1.15] tracking-[-0.01em]">{hero.ticket.scene}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="page -mt-6 pb-8 text-right text-[1rem] md:-mt-10">
          <Note ink="graphite" tilt={-1}>
            {hero.note}
          </Note>
        </p>
      </section>

      {/* Chapter 1: the brief */}
      <section id="brief" data-chapter="The brief" className="section bg-sheet-deep">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="hand text-[1.3rem] text-vermilion-ink" data-reveal>
              {brief.when}
            </p>
            <Kinetic as="h2" text={brief.title} className="t-headline mt-2 max-w-[15ch]" />
            <p className="t-lead mt-5 max-w-[42ch] text-graphite" data-reveal style={d(120)}>
              {brief.line}
            </p>
            <div className="mt-10 hidden max-w-[300px] lg:block" data-reveal style={d(200)}>
              <Photo image={images.deskPencils} aspect="aspect-[4/3]" reveal={false} sizes="300px" className="-rotate-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7">
            <BriefSheet />
          </div>
        </div>
      </section>

      {/* Chapter 2: the hour (pinned) */}
      <FlipPad />

      {/* Chapter 3: any subject */}
      <section id="subjects" data-chapter="Any subject" className="section">
        <div className="page">
          <div className="grid-12 items-end gap-y-4">
            <Kinetic as="h2" text="Same five stages. Any subject." className="t-headline col-span-12 max-w-[14ch] lg:col-span-7" />
            <p className="t-lead col-span-12 max-w-[40ch] text-graphite lg:col-span-5" data-reveal style={d(120)}>
              The medium changes with the subject. The diagnosis works the same way everywhere.
            </p>
          </div>
          <div className="mt-10 md:mt-14" data-reveal>
            <SubjectSwitch />
          </div>
        </div>
      </section>

      {/* Chapter 4: try a moment */}
      <section id="try" data-chapter="Try one" className="section bg-sheet-deep">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="hand text-[1.3rem] text-vermilion-ink" data-reveal>
              A moment from a maths mission
            </p>
            <h2 className="t-headline mt-2 max-w-[13ch]" data-reveal>
              Getting it wrong is part of the{' '}
              <Marked mark="under" ink="vermilion" weight={4}>
                work.
              </Marked>
            </h2>
            <p className="t-lead mt-5 max-w-[40ch] text-graphite" data-reveal style={d(120)}>
              Every try stays on the page. Ask for a nudge if you need one. The guide will never just tell you.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={d(150)}>
            <MiniSimulator />
          </div>
        </div>
      </section>

      {/* Chapter 5: the Thoughtprint */}
      <section id="thoughtprint" data-chapter="Thoughtprint" className="section overflow-hidden">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="hand text-[1.3rem] text-vermilion-ink" data-reveal>
              The end of the hour
            </p>
            <Kinetic as="h2" text={thoughtprint.title} className="t-headline mt-2 max-w-[14ch]" />
            <p className="t-lead mt-5 max-w-[40ch] text-graphite" data-reveal style={d(120)}>
              {thoughtprint.line}
            </p>
            <p className="mt-8 text-[1.25rem]" data-reveal style={d(200)}>
              <Note ink="vermilion-ink" tilt={-2}>
                No mark. No percentage. Ever.
              </Note>
            </p>
          </div>
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7" data-reveal style={d(120)}>
            <Tilt>
              <article aria-label="Example Thoughtprint" className="leaf tape-r relative overflow-hidden px-6 pb-7 pt-8 md:px-9">
                <div className="grid items-center gap-6 sm:grid-cols-[1fr_200px]">
                  <div>
                    <p className="t-eyebrow text-graphite">Thoughtprint · Example</p>
                    <p className="hand mt-4 text-[1.2rem] text-ultramarine">Ira can now</p>
                    <p className="mt-1 font-serif text-[clamp(1.45rem,2.3vw,1.85rem)] leading-[1.15] tracking-[-0.015em]">{thoughtprint.canNow}</p>
                  </div>
                  <div className="relative mx-auto aspect-square w-[180px] sm:w-full">
                    <BrushArt art="thoughtprint" options={{ ridges: 14, weight: 0.9 }} seed={44} bg="#fffdf8" className="absolute inset-0" />
                  </div>
                </div>
                <dl className="mt-6 grid gap-5 border-t border-ink/10 pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-[14px] font-semibold text-graphite">Where her thinking turned</dt>
                    <dd className="mt-1">{thoughtprint.turned}</dd>
                  </div>
                  <div>
                    <dt className="text-[14px] font-semibold text-graphite">Still open</dt>
                    <dd className="mt-1">{thoughtprint.open}</dd>
                  </div>
                </dl>
              </article>
            </Tilt>
          </div>
        </div>
      </section>

      {/* Chapter 6: Monday */}
      <section id="monday" data-chapter="Monday" className="section bg-sheet-deep">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <div className="relative">
              <Photo image={images.teacherMentoring} backdrop="red" backdropSide="left" aspect="aspect-[4/3]" sizes="(min-width: 1024px) 600px, 92vw" />
              <p className="absolute -bottom-6 right-2 text-[1.1rem] md:right-6">
                <span className="leaf inline-block -rotate-2 px-3 py-1.5">
                  <Note ink="graphite" tilt={0}>
                    {monday.when}
                  </Note>
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Kinetic as="h2" text={monday.title} className="t-headline max-w-[15ch]" />
            <p className="t-lead mt-5 max-w-[40ch] text-graphite" data-reveal style={d(120)}>
              {monday.line}
            </p>
            <ol className="mt-8 space-y-3" aria-label="Example Monday groups" data-reveal style={d(180)}>
              {monday.groups.map((g) => (
                <li key={g.name} className="leaf p-4 md:p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-semibold">{g.name}</p>
                    <p className="flex shrink-0 items-center gap-2 text-[14px] text-graphite">
                      <span aria-hidden="true" className="flex flex-wrap gap-[3px]">
                        {Array.from({ length: Math.min(g.count, 14) }, (_, i) => (
                          <Dab key={i} ink={g.ink} className="h-2 w-2" />
                        ))}
                      </span>
                      {g.count} pupils
                    </p>
                  </div>
                  <p className="mt-2 text-[15px] leading-snug text-graphite">
                    <span className="hand text-[1.05rem] text-vermilion-ink">Next move:</span> {g.move}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[14px] text-graphite">Example class. {monday.needsYou}.</p>
          </div>
        </div>
      </section>

      {/* Chapter 7: a week later */}
      <section id="recheck" data-chapter="A week later" className="relative isolate overflow-hidden">
        <div className="page section-tight grid-12 items-end gap-y-8 pb-6 md:pb-10">
          <div className="col-span-12 lg:col-span-6">
            <p className="hand text-[1.3rem] text-vermilion-ink" data-reveal>
              {recheck.when}
            </p>
            <Kinetic as="h2" text={recheck.title} className="t-display mt-2" />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p className="t-lead max-w-[44ch] text-graphite" data-reveal>
              {recheck.line}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3" data-reveal style={d(120)}>
              {recheck.states.map((s) => (
                <li key={s.label} className="flex items-center gap-2 font-semibold">
                  <Dab ink={s.ink} className="h-3.5 w-3.5" />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative h-28 md:h-36">
          <BrushArt art="storyline" options={{ dots: 7 }} seed={19} className="absolute inset-0" />
        </div>
        <p className="page pb-16 pt-2 text-right text-[1.3rem] md:pb-24">
          <Note ink="ultramarine" tilt={-1.5}>
            {recheck.story}
          </Note>
        </p>
      </section>

      {/* Chapter 8: house rules */}
      <section id="rules" data-chapter="House rules" className="section bg-sheet-deep">
        <div className="page grid-12 items-center gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Kinetic as="h2" text="Written into every mission." className="t-headline max-w-[12ch]" />
            <p className="t-lead mt-5 max-w-[38ch] text-graphite" data-reveal style={d(120)}>
              Six rules from the product spec. Not settings a school can switch off.
            </p>
            <Arrow to="right" ink="graphite" className="ml-auto mt-8 hidden h-12 w-36 lg:block" />
          </div>
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7" data-reveal style={d(150)}>
            <div className="leaf ruled tape relative px-7 pb-8 pt-10 md:px-10">
              <ol className="space-y-[0.6rem]">
                {houseRules.map((rule, i) => (
                  <li key={rule} className="flex items-baseline gap-4">
                    <span className="hand w-6 shrink-0 text-right text-[1.2rem] text-vermilion-ink">{i + 1}.</span>
                    <span className="hand text-[clamp(1.35rem,2.4vw,1.75rem)] leading-[1.35] text-ink">{rule}</span>
                  </li>
                ))}
              </ol>
              <p className="hand mt-6 text-right text-[1.4rem] text-ultramarine">— SOYL</p>
            </div>
          </div>
        </div>
      </section>

      <Faq faqs={methodFaqs} heading="Questions about missions" />
      <FinalCta />
    </>
  );
}

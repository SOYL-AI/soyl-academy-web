import Link from 'next/link';
import { ArrowRight, ButtonLink } from '@/components/ui/Button';
import { FinalCta } from '@/components/home/FinalCta';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { PALETTE } from '@/components/brush/palette';
import { Arrow, Dab, Marked, Note, type Ink } from '@/components/brush/marks';
import { Scene } from '@/components/story/Scene';
import { Kinetic } from '@/components/story/Kinetic';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Tilt } from '@/components/story/Tilt';
import { FlipCard } from '@/components/parents/FlipCard';
import '@/components/parents/parents.css';
import { parentsFaqs } from '@/content/faqs';
import { images } from '@/content/images';
import { APP_URL, PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/parents' });

const PROMPTS: { q: string; ink: Ink; tilt: string }[] = [
  { q: 'What did you predict? Were you right?', ink: 'ultramarine', tilt: '-rotate-2' },
  { q: 'Where did you change your mind?', ink: 'vermilion', tilt: 'rotate-1' },
  { q: 'Can you teach me how it works?', ink: 'sap', tilt: '-rotate-1' },
];

const PROMISES: { title: string; line: string; ink: Ink }[] = [
  { title: 'Never a mark first', line: 'Every card leads with what your child can now do.', ink: 'vermilion' },
  { title: 'Never more than an hour', line: 'Most missions end around 45 minutes. Work on paper doesn’t count as screen time.', ink: 'ochre' },
  { title: 'Never the answer', line: 'Hints ask and point. Your child does the thinking.', ink: 'ultramarine' },
];

const STORY: { when: string; subject: string; line: string; tilt: string }[] = [
  { when: 'June', subject: 'Maths', line: 'Can spot why a worked solution goes wrong.', tilt: 'tilt-l' },
  { when: 'August', subject: 'English', line: 'Can persuade in a short spoken argument.', tilt: 'tilt-r' },
  { when: 'October', subject: 'History', line: 'Can explain a choice from 1857 and its cost.', tilt: 'tilt-l' },
  { when: 'November', subject: 'Science', line: 'Can explain power and energy, and why bills grow.', tilt: 'tilt-r' },
];

export default function ParentsPage() {
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/parents' }), breadcrumbNode('/parents', topLevelCrumbs('/parents')), faqNode('/parents', parentsFaqs))}
      />
      <ChapterRail label="What comes home" />

      {/* Prologue: an evening at home */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="hand flex items-center gap-2 text-[1.25rem] text-[#8a6410]">
              <Dab ink="ochre" /> For parents · what comes home
            </p>
            <Kinetic as="h1" load className="t-display mt-4 max-w-[13ch]">
              <Kinetic.Word i={0}>See</Kinetic.Word> <Kinetic.Word i={1}>what</Kinetic.Word> <Kinetic.Word i={2}>your</Kinetic.Word>{' '}
              <Kinetic.Word i={3}>child</Kinetic.Word>{' '}
              <Kinetic.Word i={4} className="t-accent">
                can now do.
              </Kinetic.Word>
            </Kinetic>
            <p className="t-lead mt-6 max-w-[40ch] text-ink">
              After every mission your child brings home a Thoughtprint: what they can now do, the moment it clicked, and what was fixed on the way. Not a mark.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="#tonight" size="lg" arrow>
                See what comes home
              </ButtonLink>
              <a href={APP_URL} className="arrow-link">
                Child already on SOYL? See their work <ArrowRight />
              </a>
            </div>
          </div>
          <div className="relative col-span-12 lg:col-span-6">
            <Photo image={images.parentReading} aspect="aspect-[4/3]" backdrop="yellow" priority sizes="(min-width: 1024px) 600px, 100vw" />
            <p className="absolute -bottom-10 left-4 text-[1.3rem] md:-bottom-8 md:left-10">
              <Note ink="graphite" tilt={-3}>
                An evening at home.
              </Note>
            </p>
          </div>
        </div>
      </section>

      {/* Tonight: the worksheet turns over */}
      <Scene
        id="tonight"
        chapter="Tonight"
        length={2.8}
        mobileLength={2.4}
        steps={3}
        underNav
        aria-label="Tonight: a mark on a worksheet, and the Thoughtprint that comes home instead"
        className="bg-sheet-deep"
      >
        <div className="page grid h-full grid-rows-[auto_1fr] gap-5 pb-6 pt-6 md:pt-10 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-8 lg:pb-10">
          <div className="lg:col-span-5">
            <p className="hand text-[1.15rem] leading-none text-graphite md:text-[1.25rem]">7:30 pm · at the table</p>
            <h2 className="mt-1 font-serif text-[clamp(2.1rem,5vw,4rem)] leading-[0.95] tracking-[-0.025em]">Tonight</h2>
            <div className="relative mt-4 min-h-[6.5rem] md:mt-8 md:min-h-[9rem]">
              <p data-only="0" className="absolute inset-x-0 top-0 text-[1.05rem] leading-snug md:text-[1.4rem] md:leading-snug">
                “How was school?” “Fine.” “What did you get?” <span className="whitespace-nowrap">“Seven out of ten.”</span>
              </p>
              <p data-only="1" className="absolute inset-x-0 top-0 text-[1.05rem] leading-snug md:text-[1.4rem] md:leading-snug">
                A mark tells you how many. Not what they understood, or what comes next.
              </p>
              <p data-only="2" className="absolute inset-x-0 top-0 text-[1.05rem] leading-snug md:text-[1.4rem] md:leading-snug">
                After a mission, a Thoughtprint comes home instead. What your child can now do, and where it clicked.
              </p>
            </div>
          </div>
          <div className="relative mx-auto h-full max-h-[min(34rem,62svh)] min-h-[340px] w-full max-w-[26rem] lg:col-span-6 lg:col-start-7 lg:max-h-[min(36rem,72svh)]">
            <FlipCard />
          </div>
        </div>
      </Scene>

      {/* At dinner: better questions */}
      <section id="dinner" data-chapter="At dinner" className="section relative scroll-mt-16">
        <div className="page grid-12 items-center gap-y-12">
          <div className="relative col-span-12 md:col-span-6 lg:col-span-5">
            <Photo image={images.parentTablet} aspect="aspect-[4/5]" backdrop="red" backdropSide="left" sizes="(min-width: 1024px) 460px, (min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <p className="hand text-[1.3rem] text-vermilion-ink">At dinner</p>
            <h2 className="t-headline mt-2 max-w-[14ch]">
              Ask something better than{' '}
              <Marked mark="strike" ink="vermilion" className="text-graphite">
                “what did you get?”
              </Marked>
            </h2>
            <ul className="mt-10 space-y-5">
              {PROMPTS.map((p, i) => (
                <li key={p.q} className={`slip ${p.tilt} max-w-[26rem] px-6 py-5`} data-reveal style={{ '--d': `${i * 140}ms` } as React.CSSProperties}>
                  <p className="flex items-start gap-3">
                    <Dab ink={p.ink} className="mt-2" />
                    <span className="font-serif text-[1.35rem] leading-snug tracking-[-0.01em] md:text-[1.5rem]">{p.q}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[38ch] text-graphite" data-reveal>
              The Thoughtprint gives you the way in. Sometimes the teacher adds two lines for home, too.
            </p>
          </div>
        </div>
      </section>

      {/* Over a year: the Story */}
      <section id="story" data-chapter="Over a year" className="section relative scroll-mt-16 overflow-hidden bg-sheet-deep">
        <div className="page">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="hand text-[1.3rem] text-ultramarine">Over a year</p>
              <Kinetic as="h2" className="t-headline mt-2 max-w-[16ch]" text="Every Thoughtprint becomes part of their Story." />
            </div>
            <p className="col-span-12 max-w-[40ch] text-graphite lg:col-span-4 lg:col-start-9" data-reveal>
              SOYL stands for Story of Your Life. Over a year, the Thoughtprints add up to a record of how your child thinks, not a list of marks.
            </p>
          </div>
          <BrushArt art="storyline" options={{ dots: 4 }} seed={8} bg={PALETTE.sheetDeep} className="mt-12 hidden h-24 w-full md:block" />
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 md:-mt-2 lg:grid-cols-4" aria-label="An example Story">
            {STORY.map((s, i) => (
              <li key={s.when} data-reveal style={{ '--d': `${i * 110}ms` } as React.CSSProperties}>
                <Tilt>
                  <div className={`leaf p-5 ${s.tilt}`}>
                    <BrushArt art="thoughtprint" options={{ ridges: 9, blooms: false, weight: 0.7 }} seed={40 + i} bg="#fffdf8" className="-mt-1 mb-2 h-14 w-14" />
                    <p className="hand text-[1.15rem] text-vermilion-ink">
                      {s.when} · {s.subject}
                    </p>
                    <p className="mt-2 font-serif text-[1.3rem] leading-tight tracking-[-0.01em]">{s.line}</p>
                  </div>
                </Tilt>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[1.15rem]">
            <Note ink="graphite" tilt={-2}>
              An example Story. Yours will look different.
            </Note>
          </p>
        </div>
      </section>

      {/* Our promises */}
      <section id="promises" data-chapter="Our promises" className="section relative scroll-mt-16">
        <div className="page grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="hand text-[1.3rem] text-[#8a6410]">Our promises</p>
            <h2 className="t-headline mt-2 max-w-[12ch]">
              No marks as <span className="t-accent">headlines.</span>
            </h2>
            <div className="mt-10 hidden lg:block">
              <Photo image={images.lampHomework} aspect="aspect-[3/2]" backdrop="yellow" sizes="440px" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ul className="border-t-2 border-ink">
              {PROMISES.map((p, i) => (
                <li key={p.title} className="border-b border-ink/15 py-6" data-reveal style={{ '--d': `${i * 110}ms` } as React.CSSProperties}>
                  <p className="flex items-center gap-3">
                    <Dab ink={p.ink} className="h-4 w-4" />
                    <span className="font-serif text-[1.75rem] leading-tight tracking-[-0.015em]">{p.title}</span>
                  </p>
                  <p className="mt-2 max-w-[40ch] pl-7 text-graphite">{p.line}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-graphite" data-reveal>
              Teachers approve every mission before your child sees it. How we handle pupils’ data is set out in our{' '}
              <Link href="/privacy" className="font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Their school, and Future Builders */}
      <section id="school" data-chapter="Their school" className="section relative scroll-mt-16 bg-sheet-deep">
        <div className="page grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-6" data-reveal>
            <p className="hand text-[1.3rem] text-vermilion-ink">Is your child’s school on SOYL?</p>
            <h2 className="t-headline mt-2 max-w-[13ch]">Tell their school about it.</h2>
            <p className="t-lead mt-6 max-w-[44ch] text-graphite">
              SOYL works through schools. If missions would help your child’s class, share this page with their teacher or principal, or book a demo on their behalf.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                {PRIMARY_CTA.label}
              </ButtonLink>
              <Arrow to="loop-up" ink="vermilion" className="hidden h-16 w-14 md:block" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <Link href="/future-builders" className="group block">
              <Photo image={images.fbPresentation} aspect="aspect-[3/2]" backdrop="blue" reveal={false} sizes="(min-width: 1024px) 480px, 100vw" />
              <div className="mt-8">
                <p className="hand text-[1.15rem] text-ultramarine">Grades 7–12 · summer camp</p>
                <h3 className="mt-1 font-serif text-[1.9rem] leading-tight tracking-[-0.015em]">Future Builders</h3>
                <p className="mt-2 max-w-[42ch] text-graphite">A separate, paid live online camp where students build a working product across software, AI, IoT robotics and entrepreneurship.</p>
                <span className="arrow-link mt-5">
                  About Future Builders <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Faq faqs={parentsFaqs} heading="Questions from parents" />
      <FinalCta headline="Tell your child’s school." line="Share this page with their teacher or principal, or book a demo and we’ll show them a mission from both sides." />
    </>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { MiniSimulator } from '@/components/home/MiniSimulator';
import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { Dab, InkPath, Marked, Note } from '@/components/brush/marks';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Kinetic } from '@/components/story/Kinetic';
import { Tilt } from '@/components/story/Tilt';
import { Trail } from '@/components/students/Trail';
import { hero, stops, story, struck } from '@/components/students/copy';
import { studentsFaqs } from '@/content/faqs';
import { images, type EditorialImage } from '@/content/images';
import { cn } from '@/lib/utils';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/students' });

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** The route down the trail: a gentle pencil meander through the stops. */
const ROUTE = 'M50 0 C 64 40, 36 90, 50 140 S 64 230, 50 280 S 36 370, 50 420 S 64 510, 50 560 S 36 650, 50 700 S 64 790, 50 840 S 40 940, 50 1000';

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M3 12.5 C 9 11.5, 14 12.8, 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.5 6.5 L 20.5 12 L 14.5 17.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * For pupils (ADR-034): "Your story", in the second person. A trail down the page with six stops (arrive, build,
 * defend, fix, look back, your Story grows) that inks itself in as you scroll, the quiz furniture a mission doesn't
 * have, a moment to try, an example Thoughtprint and Story, and where to go next. No pinned scenes.
 */
export default function StudentsPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/students' }),
          breadcrumbNode('/students', topLevelCrumbs('/students')),
          faqNode('/students', studentsFaqs)
        )}
      />
      <ChapterRail label="Chapters of this page" />

      {/* Start */}
      <section id="start" data-chapter="Start" className="overflow-hidden">
        <div className="page grid-12 items-center gap-y-14 pb-16 pt-10 md:pb-24 md:pt-16">
          <div className="col-span-12 lg:col-span-6">
            <p className="rise hand flex items-center gap-2 text-[1.25rem] text-vermilion-ink">
              <Dab ink="vermilion" /> {hero.label}
            </p>
            <Kinetic as="h1" load text={hero.title} className="t-display mt-4 max-w-[12ch]" />
            <p className="rise t-lead mt-6 max-w-[42ch] text-graphite" style={d(350)}>
              {hero.intro}
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-4" style={d(450)}>
              <ButtonLink href="#path" size="lg" arrow>
                Walk the path
              </ButtonLink>
              <ButtonLink href="#try" variant="secondary" size="lg">
                Try a moment
              </ButtonLink>
            </div>
          </div>
          <div className="relative col-span-12 md:col-span-10 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <Photo
              image={images.notebookOutdoors}
              backdrop="yellow"
              priority
              settle
              large
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              sizes="(min-width: 1320px) 500px, (min-width: 1024px) 40vw, 90vw"
            />
            <p className="rise absolute -bottom-7 -left-1 text-[1.3rem] md:-left-8" style={d(650)}>
              <span className="leaf inline-block -rotate-3 px-4 py-2">
                <Note ink="ultramarine" tilt={0}>
                  your path, your pace
                </Note>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* The path */}
      <Trail id="path" chapter="The path" className="bg-sheet-deep py-20 md:py-28">
        <div className="page">
          <Kinetic as="h2" text="Six stops. One hour, or less." className="t-headline max-w-[13ch] md:mx-auto md:text-center" />
          <p className="t-lead mt-4 max-w-[40ch] text-graphite md:mx-auto md:text-center" data-reveal style={d(120)}>
            Every mission walks the same route. What you do along it is up to you.
          </p>
        </div>

        <div className="page mt-14 md:mt-20">
          <div className="relative">
          {/* The route: pencil underneath, ink drawn in as you go. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-[-0.4rem] top-0 h-full w-10 md:left-1/2 md:w-28 md:-translate-x-1/2"
          >
            <path d={ROUTE} fill="none" stroke="var(--color-pencil)" strokeWidth="3" strokeDasharray="6 9" opacity="0.7" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            className="trail-ink pointer-events-none absolute bottom-0 left-[-0.4rem] top-0 h-full w-10 md:left-1/2 md:w-28 md:-translate-x-1/2"
          >
            <path d={ROUTE} pathLength={1} fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
          </svg>

          <ol className="relative space-y-20 md:space-y-28">
            {stops.map((s, i) => {
              const image: EditorialImage = images[s.image];
              const right = i % 2 === 1;
              return (
                <li key={s.title} className="relative pl-14 md:grid md:grid-cols-2 md:gap-x-36 md:pl-0" data-reveal="fade">
                  {/* Marker on the route */}
                  <span
                    aria-hidden="true"
                    className="trail-marker absolute left-[0.85rem] top-1 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-2 border-ink bg-ochre-soft font-serif text-[0.95rem] italic md:left-1/2 md:top-10 md:h-11 md:w-11 md:text-[1.1rem]"
                  >
                    {i + 1}
                  </span>

                  <div className={cn('md:self-center', right ? 'md:order-2' : 'md:text-right')}>
                    <p className="hand text-[1.15rem] text-vermilion-ink">Stop {i + 1}</p>
                    <h3 className="mt-1 font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.05] tracking-[-0.02em]">{s.title}</h3>
                    <p className={cn('mt-3 max-w-[36ch] text-[1.08rem] leading-snug text-graphite', !right && 'md:ml-auto')}>{s.line}</p>
                    {s.note && (
                      <p className="mt-4 text-[1.2rem]">
                        <Note ink={s.ink === 'ochre' ? 'vermilion-ink' : s.ink} tilt={right ? -2 : 2}>
                          {s.note}
                        </Note>
                      </p>
                    )}
                  </div>

                  <div className={cn('mt-6 md:mt-0', right ? 'md:order-1' : '')}>
                    <Tilt max={4} className={cn('max-w-[460px]', right ? 'md:ml-auto' : '')}>
                      <figure className={cn('bg-white p-2 pb-3 shadow-[0_22px_44px_-26px_rgba(31,28,25,0.5)]', right ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]')}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            placeholder="blur"
                            sizes="(min-width: 768px) 460px, 85vw"
                            className="object-cover"
                            style={image.focus ? { objectPosition: image.focus } : undefined}
                          />
                        </div>
                      </figure>
                    </Tilt>
                  </div>
                </li>
              );
            })}
          </ol>
          </div>
        </div>
      </Trail>

      {/* Nothing ticking */}
      <section id="quiet" data-chapter="Nothing ticking" className="section">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Kinetic as="h2" text="Nothing ticking." className="t-display" />
            <p className="t-lead mt-5 max-w-[38ch] text-graphite" data-reveal style={d(120)}>
              No timer on your screen, no question counter, no running score. And hints that help you think, not hints that think for you.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal style={d(150)}>
            <div className="leaf relative px-6 py-8 md:px-9 md:py-10">
              <p className="t-eyebrow text-graphite">What you won’t see</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {struck.map((s, i) => (
                  <li key={s} className="rounded-[8px] border border-ink/20 bg-sheet px-3.5 py-2 font-mono text-[0.95rem] text-graphite">
                    <Marked mark="strike" ink="vermilion" weight={4} delay={200 + i * 180}>
                      {s}
                    </Marked>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[1.35rem]">
                <Note ink="sap" tilt={-1.5}>
                  Take the time you need. Most missions end around 45 minutes.
                </Note>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Try one */}
      <section id="try" data-chapter="Try one" className="section bg-sheet-deep">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="hand text-[1.3rem] text-vermilion-ink" data-reveal>
              Try one
            </p>
            <h2 className="t-headline mt-2 max-w-[13ch]" data-reveal>
              Getting it wrong is part of the{' '}
              <Marked mark="under" ink="vermilion" weight={4}>
                work.
              </Marked>
            </h2>
            <p className="t-lead mt-5 max-w-[40ch] text-graphite" data-reveal style={d(120)}>
              Every try stays on the page and nobody minds how many it takes. Ask for a nudge if you need one.
            </p>
            <p className="mt-8 text-[1.25rem]" data-reveal style={d(200)}>
              <Note ink="ultramarine" tilt={-2}>
                The guide nudges. You do the thinking.
              </Note>
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={d(150)}>
            <MiniSimulator />
          </div>
        </div>
      </section>

      {/* Your Story */}
      <section id="story" data-chapter="Your Story" className="section overflow-hidden">
        <div className="page">
          <div className="grid-12 items-end gap-y-6">
            <Kinetic as="h2" text="You leave with a Thoughtprint, not a mark." className="t-headline col-span-12 max-w-[15ch] lg:col-span-7" />
            <p className="t-lead col-span-12 max-w-[40ch] text-graphite lg:col-span-5" data-reveal style={d(120)}>
              It shows what you can now do and where your thinking turned. Every Thoughtprint adds a page to your Story.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16" aria-label="An example Story">
            {story.map((p, i) => (
              <li key={p.subject} data-reveal style={d(i * 120)}>
                <Tilt max={5}>
                  <article className={cn('leaf relative px-5 pb-6 pt-5', i === 1 ? 'lg:translate-y-6 lg:rotate-[1deg]' : 'lg:-rotate-[1deg]')}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="t-eyebrow text-[0.7rem] text-graphite">Example · {p.when}</p>
                        <p className="mt-1 font-serif text-[1.6rem] leading-none tracking-[-0.015em]">{p.subject}</p>
                      </div>
                      <div className="relative -mr-1 -mt-1 h-24 w-24 shrink-0">
                        <BrushArt art="thoughtprint" options={{ ridges: 10, blooms: i !== 1, weight: 0.8 }} seed={p.seed} bg="#fffdf8" className="absolute inset-0" />
                      </div>
                    </div>
                    <p className="hand mt-3 text-[1.1rem] text-ultramarine">You can now</p>
                    <p className="mt-0.5 leading-snug">{p.can}</p>
                  </article>
                </Tilt>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-right text-[1.3rem]">
            <Note ink="vermilion-ink" tilt={-2}>
              No mark. No percentage. Ever.
            </Note>
          </p>
        </div>
      </section>

      {/* AI */}
      <section className="section-tight bg-sheet-deep" aria-labelledby="ai-heading">
        <div className="page grid-12 items-end gap-y-6">
          <h2 id="ai-heading" className="t-headline col-span-12 max-w-[16ch] lg:col-span-7" data-reveal>
            Use AI to think better, not to <Marked mark="strike" ink="vermilion">skip</Marked> thinking.
          </h2>
          <p className="t-lead col-span-12 max-w-[44ch] text-graphite lg:col-span-5" data-reveal style={d(120)}>
            You can use AI tools. But the guide asks about your own reasoning, so a pasted answer won’t get you through Defend.
          </p>
        </div>
      </section>

      {/* Future Builders */}
      <section className="section-tight">
        <div className="page">
          <Link href="/future-builders" className="leaf group grid-12 items-center gap-y-6 p-5 md:p-7" data-reveal>
            <div className="col-span-12 md:col-span-4">
              <Photo image={images.fbIot} aspect="aspect-[3/2]" zoom reveal={false} sizes="(min-width: 768px) 360px, 100vw" />
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p className="hand text-[1.2rem] text-vermilion-ink">Grades 7–12</p>
              <h2 className="t-title mt-1">Want to build something real? Try Future Builders.</h2>
              <p className="mt-3 max-w-[48ch] text-graphite">A live summer camp: code, train an AI model, wire a device, and pitch it on Demo Day.</p>
              <span className="relative mt-5 inline-flex items-center gap-2 font-semibold">
                About Future Builders
                <ArrowRight />
                <InkPath mark="under" ink="vermilion" weight={3} className="ink-hover absolute -bottom-1 left-0 h-2 w-full" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <Faq faqs={studentsFaqs} heading="Questions from pupils" />

      {/* Where to next */}
      <section className="relative isolate overflow-hidden">
        <BrushArt
          art="wash"
          options={{
            blooms: [
              { x: 0.06, y: 0.2, r: 0.55, pigment: 'ultramarine', opacity: 45 },
              { x: 0.96, y: 0.85, r: 0.6, pigment: 'ochre', opacity: 65 },
            ],
          }}
          seed={8}
          stepMs={90}
          className="absolute inset-0 -z-10"
        />
        <div className="page section grid-12 items-end gap-y-8">
          <h2 className="t-display col-span-12 max-w-[13ch] lg:col-span-8" data-reveal>
            Your story starts with one{' '}
            <Marked mark="under" ink="vermilion" weight={5}>
              mission.
            </Marked>
          </h2>
          <div className="col-span-12 lg:col-span-4" data-reveal style={d(120)}>
            <p className="t-lead max-w-[36ch]">Missions come through your school. Show this page to a teacher, or to whoever looks after you at home.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/schools" size="lg" arrow>
                For your school
              </ButtonLink>
              <ButtonLink href="/parents" variant="secondary" size="lg">
                For parents
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

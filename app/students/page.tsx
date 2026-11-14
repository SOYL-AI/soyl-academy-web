import Link from 'next/link';
import { MiniSimulator } from '@/components/home/MiniSimulator';
import { PageHero } from '@/components/ui/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { Dab, InkPath, Marked, Note, type Ink } from '@/components/brush/marks';
import { studentsFaqs } from '@/content/faqs';
import { images } from '@/content/images';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/students' });

/** What a mission feels like, from the pupil's side. Pinned notes, slightly askew. */
const FEELS: { title: string; line: string; ink: Ink; tilt: string }[] = [
  { title: 'One scene', line: 'A lab bench, 1857 Meerut, a conversation. Not a list of questions.', ink: 'ultramarine', tilt: 'tilt-l' },
  { title: 'Your own path', line: 'What comes next depends on how you think. No two pupils get the same mission.', ink: 'vermilion', tilt: 'tilt-r' },
  { title: 'Your way of answering', line: 'Say it, type it, or write in your notebook and snap a photo.', ink: 'ochre', tilt: 'tilt-r' },
  { title: 'Nothing ticking', line: 'No timer, no question counter, no running score on your screen.', ink: 'sap', tilt: 'tilt-l' },
];

/**
 * For pupils (ADR-033): what a mission feels like from the inside, a maths moment to try, the Thoughtprint and the
 * Story. Short, warm and plain.
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

      <PageHero
        tone="red"
        label="For pupils"
        title={
          <>
            Your mission. <span className="t-accent">Your</span> path.
          </>
        }
        intro="No list of questions. One scene where you work it out your way, with a guide who asks good questions and never gives the answer."
        actions={
          <ButtonLink href="#try" size="lg" arrow>
            Try a moment
          </ButtonLink>
        }
        image={images.studentsBuilding}
      />

      <section className="section bg-sheet-deep" aria-labelledby="feels-heading">
        <div className="page">
          <SectionHeader id="feels-heading" label="What it feels like" num="01" title="Less like a quiz. More like a story." layout="stack" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {FEELS.map((f) => (
              <li key={f.title} className={`leaf p-6 ${f.tilt}`}>
                <Dab ink={f.ink} className="h-4 w-4" />
                <p className="mt-3 font-serif text-[1.7rem] leading-none tracking-[-0.015em]">{f.title}</p>
                <p className="mt-3 leading-snug text-graphite">{f.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="try" className="section" aria-labelledby="try-heading">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              id="try-heading"
              label="Try one"
              num="02"
              title={
                <>
                  Getting it wrong is part of the <Marked mark="under" ink="vermilion" weight={4}>work.</Marked>
                </>
              }
              intro="Every try stays on the page and nobody minds how many it takes. Ask for a nudge if you need one."
              layout="stack"
            />
            <p className="mt-8 text-[1.25rem]" data-reveal>
              <Note ink="ultramarine" tilt={-2}>
                The guide nudges. You do the thinking.
              </Note>
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <MiniSimulator />
          </div>
        </div>
      </section>

      <section className="section bg-sheet-deep" aria-labelledby="after-heading">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              id="after-heading"
              label="At the end"
              num="03"
              title="You leave with a Thoughtprint, not a mark."
              intro="It shows what you can now do and where your thinking turned. Every Thoughtprint adds a page to your Story."
              layout="stack"
            />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <article aria-label="Example Thoughtprint" className="leaf tape tilt-r relative px-6 pb-7 pt-8 md:px-8">
              <div className="flex items-start justify-between gap-4">
                <p className="t-eyebrow text-graphite">Example</p>
                <BrushArt art="thoughtprint" options={{ ridges: 11, blooms: false, weight: 0.8 }} seed={31} bg="#fffdf8" className="-mr-2 -mt-4 h-20 w-20 shrink-0" />
              </div>
              <p className="hand -mt-1 text-[1.3rem] text-ultramarine">You can now</p>
              <p className="mt-1 max-w-[24ch] font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1] tracking-[-0.015em]">
                Plot any point on a grid, and spot when x and y have swapped places.
              </p>
              <p className="mt-6 border-t border-ink/10 pt-4 text-[0.92rem] font-semibold text-graphite">Where your thinking turned</p>
              <p className="mt-1">“Across first, then up. I had them the wrong way round.”</p>
            </article>
            <p className="mt-6 text-right text-[1.2rem]">
              <Note ink="vermilion-ink" tilt={-2}>
                No mark. No percentage. Ever.
              </Note>
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="ai-heading">
        <div className="page grid-12 items-end gap-y-6">
          <h2 id="ai-heading" className="t-headline col-span-12 max-w-[16ch] lg:col-span-7" data-reveal>
            Use AI to think better, not to <Marked mark="strike" ink="vermilion">skip</Marked> thinking.
          </h2>
          <p className="t-lead col-span-12 max-w-[44ch] text-graphite lg:col-span-5" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            You can use AI tools. But the guide asks about your own reasoning, so a pasted answer won’t get you through Defend.
          </p>
        </div>
      </section>

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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 12.5 C 9 11.5, 14 12.8, 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M14.5 6.5 L 20.5 12 L 14.5 17.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <InkPath mark="under" ink="vermilion" weight={3} className="ink-hover absolute -bottom-1 left-0 h-2 w-full" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <Faq faqs={studentsFaqs} heading="Questions from pupils" />
    </>
  );
}


import Link from 'next/link';
import { ArrowRight, ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { PALETTE } from '@/components/brush/palette';
import { Dab, Note, type Ink } from '@/components/brush/marks';
import { ParentThoughtprint } from '@/components/parents/ParentThoughtprint';
import { images } from '@/content/images';
import { APP_URL, PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/parents' });

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
      <StructuredData data={graph(webPageNode({ path: '/parents' }), breadcrumbNode('/parents', topLevelCrumbs('/parents')))} />

      <PageHero
        tone="yellow"
        label="For parents"
        title={
          <>
            See what your child <span className="t-accent">can now do.</span>
          </>
        }
        intro="After every mission your child gets a Thoughtprint: what they can now do, the moment it clicked, and what was fixed along the way. Not a mark."
        actions={
          <a href={APP_URL} className="arrow-link">
            Child already on SOYL? See their work <ArrowRight />
          </a>
        }
        aside={<ParentThoughtprint />}
      />

      {/* 01 · Three promises */}
      <section className="section">
        <div className="page">
          <SectionHeader
            label="What we promise"
            num="01"
            title={
              <>
                No marks as <span className="t-accent">headlines.</span>
              </>
            }
            layout="stack"
          />
          <ul className="mt-12 grid gap-8 md:grid-cols-3" data-reveal>
            {PROMISES.map((p) => (
              <li key={p.title} className="border-t-2 border-ink pt-5">
                <Dab ink={p.ink} className="h-4 w-4" />
                <h3 className="mt-4 font-serif text-[1.75rem] leading-tight tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2 max-w-[34ch] text-graphite">{p.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 · The Story */}
      <section className="section bg-sheet-deep">
        <div className="page">
          <SectionHeader
            label="Over a year"
            num="02"
            title="Every Thoughtprint becomes part of their Story."
            intro="SOYL stands for Story of Your Life. Over a year, the Thoughtprints add up to a record of how your child thinks, not a list of marks."
          />
          <BrushArt art="storyline" options={{ dots: 4 }} seed={8} bg={PALETTE.sheetDeep} className="mt-10 hidden h-24 w-full md:block" />
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 md:-mt-2 lg:grid-cols-4" aria-label="Example Story">
            {STORY.map((s) => (
              <li key={s.when} className={`leaf p-5 ${s.tilt}`} data-reveal>
                <p className="hand text-[1.15rem] text-vermilion-ink">
                  {s.when} · {s.subject}
                </p>
                <p className="mt-2 font-serif text-[1.3rem] leading-tight tracking-[-0.01em]">{s.line}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[1.15rem]">
            <Note ink="graphite" tilt={-2}>
              An example Story. Yours will look different.
            </Note>
          </p>
        </div>
      </section>

      {/* 03 · Tell their school, and Future Builders */}
      <section className="section">
        <div className="page grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6" data-reveal>
            <SectionHeader label="Is your child’s school on SOYL?" num="03" title="Tell their school about it." layout="stack" />
            <p className="t-lead mt-6 max-w-[44ch] text-graphite">
              SOYL works through schools. If missions would help your child’s class, share this page with their teacher or principal, or book a demo on their behalf.
            </p>
            <div className="mt-8">
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                {PRIMARY_CTA.label}
              </ButtonLink>
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
    </>
  );
}

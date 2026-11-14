import { FinalCta } from '@/components/home/FinalCta';
import { PageHero } from '@/components/ui/PageHero';
import { Label, SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { Marked, Note } from '@/components/brush/marks';
import { images } from '@/content/images';
import { ORGANIZATION_ID, SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/about' });

const BELIEFS = [
  { title: 'Teachers approve every mission.', line: 'Nothing reaches a pupil before a teacher has read the brief and said yes.' },
  { title: 'A mark is never the headline.', line: 'What a pupil can now do comes first, on every screen.' },
  { title: 'Pupils choose the medium.', line: 'Speak it, type it, or write it on paper and snap a photo.' },
  { title: 'Never more than 60 minutes.', line: 'Designed for about 45. A mission plans to finish early, not to fill the hour.' },
];

/** About (ADR-033): Story of Your Life, and why assignments are becoming missions. */
export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/about', mainEntityId: ORGANIZATION_ID }),
          breadcrumbNode('/about', topLevelCrumbs('/about'))
        )}
      />

      <PageHero
        tone="red"
        label="About SOYL · Story of Your Life"
        title={
          <>
            Answers are cheap. <span className="t-accent">Thinking is not.</span>
          </>
        }
        intro="A correct answer used to prove a pupil had learned. Now technology writes it for free. So we are replacing assignments with missions: work that asks pupils to think, and shows how they did."
        aside={
          <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px]">
            <BrushArt art="thoughtprint" options={{}} seed={41} stepMs={55} eager className="absolute inset-0" />
          </div>
        }
      />

      {/* Why: the old model against the new reality. */}
      <section className="section bg-sheet-deep">
        <div className="page">
          <SectionHeader label="Why missions" num="01" title="A generated answer can’t defend itself." layout="stack" />
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
            <article className="ruled leaf tilt-l px-6 pb-8 pl-16 pt-7 md:pl-[4.25rem]" data-reveal>
              <p className="t-eyebrow text-graphite">The old model</p>
              <p className="mt-5 font-serif text-[clamp(1.5rem,2.3vw,1.95rem)] leading-[1.15]">
                The essay and the worksheet belonged to a world where{' '}
                <Marked mark="strike" ink="vermilion" weight={3}>
                  producing the work
                </Marked>{' '}
                was proof of effort.
              </p>
            </article>
            <article className="leaf tape tilt-r px-6 pb-8 pt-9 md:px-9" data-reveal style={{ '--d': '120ms', '--tape': 'var(--color-ultramarine)' } as React.CSSProperties}>
              <p className="hand text-[1.25rem] text-ultramarine">The new reality</p>
              <p className="mt-3 font-serif text-[clamp(1.5rem,2.3vw,1.95rem)] leading-[1.15]">
                When the work can be generated for free, we look at the process: how a pupil predicts, builds, defends and fixes.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* What we believe. */}
      <section className="section">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader label="What we believe" num="02" title="Four rules we don’t break." layout="stack" />
          </div>
          <ol className="col-span-12 border-t-2 border-ink lg:col-span-7 lg:col-start-6" data-reveal>
            {BELIEFS.map((b, i) => (
              <li key={b.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-ink/15 py-6 md:grid-cols-[3.5rem_1fr]">
                <span className="hand text-[2rem] leading-none text-vermilion-ink">{i + 1}</span>
                <div>
                  <p className="font-serif text-[clamp(1.45rem,2.2vw,1.85rem)] leading-tight tracking-[-0.012em]">{b.title}</p>
                  <p className="mt-1.5 text-graphite">{b.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Teachers at the centre. */}
      <section className="section bg-sheet-deep">
        <div className="page grid-12 items-center gap-y-14">
          <div className="col-span-12 lg:col-span-6">
            <Photo
              backdrop="red"
              backdropSide="left"
              image={images.teacherMentoring}
              aspect="aspect-[4/3]"
              large
              sizes="(min-width: 1320px) 600px, (min-width: 1024px) 48vw, 100vw"
            />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal>
            <Label num="03" className="mb-5">
              What we build
            </Label>
            <h2 className="t-headline max-w-[14ch]">
              Teachers stay at the <span className="t-accent">centre.</span>
            </h2>
            <p className="t-lead mt-6 text-graphite">
              Software can draft a mission. It can’t inspire, build relationships or read a room. SOYL gives teachers time back and a clear view of each pupil’s thinking.
            </p>
            <p className="mt-5 text-graphite">
              Alongside missions for schools, we run Future Builders, a summer camp where students in Grades 7–12 build real products.
            </p>
            <p className="mt-8 text-[1.15rem]">
              <Note ink="vermilion-ink" tilt={-2}>
                SOYL = Story of Your Life. Every mission adds a page.
              </Note>
            </p>
          </div>
        </div>

        <div className="page mt-16 md:mt-20">
          <div className="t-small flex flex-col gap-2 border-t border-ink/15 pt-6 text-graphite md:flex-row md:justify-between">
            <p>SOYL Academy is built by {SITE_LEGAL_NAME}, Bengaluru 560043.</p>
            <p>
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="link">
                {SITE_CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

import { FinalCta } from '@/components/home/FinalCta';
import { Photo } from '@/components/media/Photo';
import { StructuredData } from '@/components/seo/StructuredData';
import { BrushArt } from '@/components/brush/BrushArt';
import { Dab, Marked, Note } from '@/components/brush/marks';
import { PALETTE } from '@/components/brush/palette';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Kinetic } from '@/components/story/Kinetic';
import { Tilt } from '@/components/story/Tilt';
import { BookOpening } from '@/components/about/BookOpening';
import { images, type EditorialImage } from '@/content/images';
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

const IDEAS: { word: string; was: string; line: string; image: EditorialImage; ink: 'ultramarine' | 'vermilion' | 'ochre'; tilt: string }[] = [
  { word: 'Missions', was: 'not assignments', line: 'One scene, about 45 minutes, and a different path for every pupil.', image: images.magnifier, ink: 'ultramarine', tilt: '-rotate-[1.6deg]' },
  { word: 'Thoughtprints', was: 'not marks', line: 'What a pupil can now do, and how they got there.', image: images.notebookOutdoors, ink: 'vermilion', tilt: 'rotate-[1.2deg]' },
  { word: 'Stories', was: 'not records', line: 'Every Thoughtprint, in order. Story of Your Life.', image: images.walkToSchool, ink: 'ochre', tilt: '-rotate-[0.8deg]' },
];

/**
 * About (ADR-034): the company's story, told like the opening of a book. A title page whose cover opens on scroll,
 * then three chapters and an open last page.
 */
export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/about', mainEntityId: ORGANIZATION_ID }),
          breadcrumbNode('/about', topLevelCrumbs('/about'))
        )}
      />
      <ChapterRail label="Our story" />

      <BookOpening />

      {/* Chapter one: why homework stopped telling teachers anything. */}
      <section id="chapter-one" data-chapter="Chapter one" className="section bg-sheet-deep">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="hand text-[1.25rem] text-vermilion-ink">Chapter one</p>
            <Kinetic as="h2" text="A generated answer can’t defend itself." className="t-headline mt-3 max-w-[15ch]" />
            <div className="mt-10 space-y-6">
              <article className="ruled leaf tilt-l px-6 pb-7 pl-16 pt-6 md:pl-[4.25rem]" data-reveal>
                <p className="t-eyebrow text-graphite">The old model</p>
                <p className="mt-4 font-serif text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.18]">
                  The essay and the worksheet belonged to a world where{' '}
                  <Marked mark="strike" ink="vermilion" weight={3}>
                    producing the work
                  </Marked>{' '}
                  was proof of effort.
                </p>
              </article>
              <article
                className="leaf tape tilt-r ml-auto max-w-[34rem] px-6 pb-7 pt-8 md:px-8"
                data-reveal
                style={{ '--d': '140ms', '--tape': 'var(--color-ultramarine)' } as React.CSSProperties}
              >
                <p className="hand text-[1.2rem] text-ultramarine">The new reality</p>
                <p className="mt-2 font-serif text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.18]">
                  When the work can be generated for free, we look at the process: how a pupil predicts, builds, defends and fixes.
                </p>
              </article>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Photo
              image={images.lampHomework}
              backdrop="red"
              backdropSide="right"
              aspect="aspect-[4/5]"
              large
              parallax
              sizes="(min-width: 1320px) 520px, (min-width: 1024px) 40vw, 100vw"
            />
            <p className="mt-6 text-[1.1rem]">
              <Note ink="graphite" tilt={-2}>
                The answer is on the page. The thinking never was.
              </Note>
            </p>
          </div>
        </div>
      </section>

      {/* Chapter two: what we believe. */}
      <section id="chapter-two" data-chapter="Chapter two" className="section">
        <div className="page">
          <p className="hand text-[1.25rem] text-vermilion-ink">Chapter two</p>
          <Kinetic as="h2" text="Three new words for school work." className="t-headline mt-3 max-w-[16ch]" />

          <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {IDEAS.map((idea, i) => (
              <li key={idea.word} data-reveal style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
                <Tilt className={idea.tilt}>
                  <figure className="lift bg-white p-2.5 pb-5 shadow-[0_22px_44px_-28px_rgba(31,28,25,0.5)]">
                    <Photo image={idea.image} aspect="aspect-[4/3]" reveal={false} sizes="(min-width: 1320px) 400px, (min-width: 768px) 31vw, 100vw" />
                    <figcaption className="px-2 pt-5">
                      <p className="flex items-baseline gap-2.5">
                        <Dab ink={idea.ink} className="translate-y-[-2px]" />
                        <span className="font-serif text-[1.85rem] leading-none tracking-[-0.015em]">{idea.word}</span>
                        <span className="hand text-[1.05rem] text-graphite">{idea.was}</span>
                      </p>
                      <p className="mt-3 text-graphite">{idea.line}</p>
                    </figcaption>
                  </figure>
                </Tilt>
              </li>
            ))}
          </ul>

          <div className="mt-20 grid-12 gap-y-8 md:mt-28">
            <div className="col-span-12 lg:col-span-4">
              <h3 className="t-title max-w-[14ch]">Four rules we don’t break.</h3>
              <p className="mt-3 text-[1.1rem]">
                <Note ink="vermilion-ink" tilt={-2}>
                  signed, SOYL
                </Note>
              </p>
            </div>
            <ol className="col-span-12 border-t-2 border-ink lg:col-span-7 lg:col-start-6">
              {BELIEFS.map((b, i) => (
                <li
                  key={b.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-ink/15 py-6 md:grid-cols-[3.5rem_1fr]"
                  data-reveal
                  style={{ '--d': `${i * 80}ms` } as React.CSSProperties}
                >
                  <span className="hand text-[2rem] leading-none text-vermilion-ink">{i + 1}</span>
                  <div>
                    <p className="font-serif text-[clamp(1.4rem,2.1vw,1.8rem)] leading-tight tracking-[-0.012em]">{b.title}</p>
                    <p className="mt-1.5 text-graphite">{b.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Chapter three: what SOYL means. */}
      <section id="chapter-three" data-chapter="Chapter three" className="section relative isolate overflow-hidden bg-sheet-deep">
        <div className="page">
          <p className="hand text-[1.25rem] text-vermilion-ink">Chapter three</p>
          <h2 className="t-headline mt-3 max-w-[18ch]">Four letters, one idea.</h2>

          <p
            className="kinetic mt-12 flex flex-wrap items-baseline gap-x-[0.35em] gap-y-2 font-serif text-[clamp(3rem,10vw,8.5rem)] leading-[0.95] tracking-[-0.03em] md:mt-16"
            data-reveal="fade"
          >
            {[
              ['S', 'tory', 'text-ultramarine'],
              ['O', 'f', 'text-vermilion-ink'],
              ['Y', 'our', 'text-[#9a7414]'],
              ['L', 'ife.', 'text-sap'],
            ].map(([l, rest, c], i) => (
              <span key={l} className="kw" style={{ '--wi': i * 2 } as React.CSSProperties}>
                <span className={c}>{l}</span>
                {rest}
              </span>
            ))}
          </p>
        </div>

        <BrushArt art="storyline" options={{ dots: 11 }} seed={23} bg={PALETTE.sheetDeep} className="mt-10 h-24 w-full md:mt-14 md:h-32" />

        <div className="page mt-10 grid-12 items-center gap-y-12 md:mt-14">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <p className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.15] tracking-[-0.015em]">
              Every pupil writes their own story. Every mission adds a page.
            </p>
            <p className="t-lead mt-6 text-graphite">
              Software can draft a mission. It can’t inspire, build relationships or read a room. So teachers stay at the centre: SOYL gives them time back and a clear view of each pupil’s thinking.
            </p>
            <p className="mt-5 text-graphite">
              Alongside missions for schools, we run Future Builders, a summer camp where students in Grades 7–12 build real products.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Photo
              image={images.teacherCircle}
              backdrop="blue"
              backdropSide="left"
              aspect="aspect-[4/3]"
              large
              sizes="(min-width: 1320px) 600px, (min-width: 1024px) 48vw, 100vw"
            />
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

      {/* The last page is open. */}
      <div id="last-page" data-chapter="The last page">
        <FinalCta headline="The next chapter is yours." line="See a mission from both sides, or tell us about your school." />
      </div>
    </>
  );
}

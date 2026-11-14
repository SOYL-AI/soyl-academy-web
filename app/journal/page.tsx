import '@/components/journal/journal.css';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Button';
import { ArticleImage } from '@/components/journal/ArticleImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { Photo } from '@/components/media/Photo';
import { Kinetic } from '@/components/story/Kinetic';
import { Tilt } from '@/components/story/Tilt';
import { images } from '@/content/images';
import { formatArticleDate, formatReadingTime, journalArticles } from '@/content/journal';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, journalListNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/journal' });

const TILTS = ['-rotate-[1.2deg]', 'rotate-[0.9deg]', '-rotate-[0.6deg]'];

/** The Journal (ADR-034): a small magazine. A nameplate, the lead story, then every other essay as a numbered print. */
export default function JournalPage() {
  const articles = [...journalArticles].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = articles;

  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({
            path: '/journal',
            mainEntityId: `${absoluteUrl('/journal')}#list`,
            dateModified: articles[0]?.date,
          }),
          breadcrumbNode('/journal', topLevelCrumbs('/journal')),
          journalListNode(journalArticles)
        )}
      />

      {/* The nameplate. */}
      <header className="page pb-10 pt-8 md:pb-14 md:pt-12">
        <div className="masthead-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3 text-graphite">
          <p className="t-eyebrow">The SOYL Journal</p>
          <p className="t-small">
            {articles.length} essays{articles[0] ? <> · latest {formatArticleDate(articles[0].date)}</> : null}
          </p>
        </div>
        <div className="grid-12 items-end gap-y-6 pt-6 md:pt-8">
          <div className="col-span-12 lg:col-span-8">
            <Kinetic
              as="h1"
              load
              text="Notes on learning after AI."
              className="font-serif text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.035em]"
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="relative ml-auto hidden w-full max-w-[300px] rotate-[2deg] bg-white p-2 shadow-[0_20px_40px_-26px_rgba(31,28,25,0.5)] lg:block">
              <span aria-hidden="true" className="tape absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-4deg]" />
              <Photo image={images.deskPencils} aspect="aspect-[4/3]" reveal={false} sizes="300px" />
            </div>
            <p className="t-lead mt-0 max-w-[34ch] text-graphite lg:mt-6">Essays on missions, thinking, and the school that’s coming next.</p>
          </div>
        </div>
        <div className="masthead-rule mt-8 md:mt-10" />
      </header>

      <section className="pb-20 md:pb-28">
        <div className="page">
          {featured && (
            <article aria-labelledby="lead-story">
              <Link href={`/journal/${featured.slug}`} className="journal-card group grid-12 items-center gap-y-8">
                <div className="col-span-12 lg:col-span-7">
                  <div className="print -rotate-[0.8deg]">
                    <ArticleImage article={featured} aspect="aspect-[3/2]" large priority sizes="(min-width: 1320px) 700px, (min-width: 1024px) 56vw, 100vw" />
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-5 lg:pl-4">
                  <p className="flex items-baseline gap-3">
                    <span className="t-num font-serif text-[2.4rem] italic leading-none text-vermilion-ink">01</span>
                    <span className="hand text-[1.15rem] text-graphite">the lead story</span>
                  </p>
                  <ArticleMeta date={featured.date} readingTime={featured.readingTime} category={featured.category} className="mt-5" />
                  <h2 id="lead-story" className="t-headline mt-3">
                    <span className="card-title">{featured.title}</span>
                  </h2>
                  <p className="t-lead mt-5 max-w-[44ch] text-graphite">{featured.excerpt}</p>
                  <span className="arrow-link mt-7">
                    Read the essay <ArrowRight />
                  </span>
                </div>
              </Link>
            </article>
          )}

          <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 border-t border-ink/15 pt-14 md:mt-28 md:grid-cols-3">
            {rest.map((a, i) => (
              <li key={a.slug} data-reveal style={{ '--d': `${i * 110}ms` } as React.CSSProperties}>
                <Tilt max={4}>
                  <Link href={`/journal/${a.slug}`} className="journal-card group block">
                    <span className="t-num mb-3 block font-serif text-[1.6rem] italic leading-none text-vermilion-ink">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                    <div className={`print ${TILTS[i % TILTS.length]}`}>
                      <ArticleImage article={a} sizes="(min-width: 1320px) 390px, (min-width: 768px) 31vw, 100vw" />
                    </div>
                    <ArticleMeta date={a.date} readingTime={a.readingTime} category={a.category} className="mt-6" />
                    <h3 className="t-title mt-2">
                      <span className="card-title">{a.title}</span>
                    </h3>
                    <p className="mt-2 text-graphite">{a.excerpt}</p>
                  </Link>
                </Tilt>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ArticleMeta({ date, readingTime, category, className }: { date: string; readingTime: number; category: string; className?: string }) {
  return (
    <p className={`t-label flex flex-wrap items-center gap-x-2 text-graphite ${className ?? ''}`}>
      <span className="hand text-[1.15rem] text-vermilion-ink">{category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{formatArticleDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{formatReadingTime(readingTime)}</span>
    </p>
  );
}

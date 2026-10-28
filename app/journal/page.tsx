import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { ArrowRight } from '@/components/ui/Button';
import { ArticleImage } from '@/components/journal/ArticleImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { formatArticleDate, formatReadingTime, journalArticles } from '@/content/journal';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, journalListNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/journal' });

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

      <PageHero
        tone="red"
        label="The SOYL Journal"
        title={
          <>
            Ideas about learning, technology and the <span className="t-accent">school that’s coming next.</span>
          </>
        }
        size="headline"
      />

      <section className="pb-20 md:pb-28">
        <div className="page">
          {featured && (
            <article className="border-t border-ink pt-10 md:pt-14">
              <Link href={`/journal/${featured.slug}`} className="group grid-12 items-center gap-y-8">
                <div className="col-span-12 lg:col-span-7">
                  <ArticleImage
                    article={featured}
                    aspect="aspect-[3/2]"
                    large
                    priority
                    sizes="(min-width: 1320px) 700px, (min-width: 1024px) 56vw, 100vw"
                  />
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <ArticleMeta date={featured.date} readingTime={featured.readingTime} category={featured.category} />
                  <h2 className="t-headline mt-4 transition-colors duration-200 group-hover:text-cobalt">{featured.title}</h2>
                  <p className="t-lead mt-5 max-w-[44ch]">{featured.excerpt}</p>
                  <span className="arrow-link mt-7">
                    Read the essay <ArrowRight />
                  </span>
                </div>
              </Link>
            </article>
          )}

          <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 border-t border-rule pt-12 md:mt-24 md:grid-cols-3">
            {rest.map((a, i) => (
              <li key={a.slug} data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <ArticleImage article={a} sizes="(min-width: 1320px) 390px, (min-width: 768px) 31vw, 100vw" />
                  <div className="mt-5">
                    <ArticleMeta date={a.date} readingTime={a.readingTime} category={a.category} />
                  </div>
                  <h3 className="t-title mt-2 transition-colors duration-200 group-hover:text-cobalt">{a.title}</h3>
                  <p className="mt-2 text-muted">{a.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ArticleMeta({ date, readingTime, category }: { date: string; readingTime: number; category: string }) {
  return (
    <p className="t-label flex flex-wrap items-center gap-x-2 text-muted">
      <span className="text-red-ink">{category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{formatArticleDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{formatReadingTime(readingTime)}</span>
    </p>
  );
}

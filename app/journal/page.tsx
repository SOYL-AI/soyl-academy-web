import Link from 'next/link';
import { PageHero } from '@/components/notebook/PageHero';
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
        label="The SOYL Journal"
        title={
          <>
            Ideas about learning, technology and the <span className="mark">school that’s coming next.</span>
          </>
        }
        size="headline"
      />

      <section className="section-tight">
        <div className="page">
          {featured && (
            <article className="ruled margin-line mb-px border border-rule p-6 pl-14 md:p-10 md:pl-20">
              <Link href={`/journal/${featured.slug}`} className="group block">
                <ArticleMeta date={featured.date} readingTime={featured.readingTime} category={featured.category} />
                <h2 className="t-headline mt-4 max-w-[20ch] group-hover:text-cobalt">{featured.title}</h2>
                <p className="t-lead mt-4 max-w-[56ch]">{featured.excerpt}</p>
                <span className="arrow-link mt-6">Read the essay</span>
              </Link>
            </article>
          )}
          <ul className="grid grid-cols-1 gap-px border border-t-0 border-rule bg-rule md:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug} className="bg-white">
                <Link href={`/journal/${a.slug}`} className="group flex h-full flex-col p-5 md:p-6">
                  <ArticleMeta date={a.date} readingTime={a.readingTime} category={a.category} />
                  <h3 className="t-title mt-3 group-hover:text-cobalt">{a.title}</h3>
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
      <span className="text-ink">{category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{formatArticleDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{formatReadingTime(readingTime)}</span>
    </p>
  );
}

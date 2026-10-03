import Link from 'next/link';
import { StructuredData } from '@/components/seo/StructuredData';
import { formatArticleDate, formatReadingTime, journalArticles } from '@/content/journal';
import { createMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbNode,
  graph,
  journalListNode,
  topLevelCrumbs,
  webPageNode,
} from '@/lib/seo/schema';
import { absoluteUrl } from '@/lib/seo/config';

export const metadata = createMetadata({ path: '/journal' });

export default function JournalPage() {
  const [featured, ...rest] = journalArticles || [];

  return (
    <div className="min-h-screen bg-white text-ink pt-24 pb-16">
      <StructuredData
        data={graph(
          webPageNode({
            path: '/journal',
            mainEntityId: `${absoluteUrl('/journal')}#list`,
            dateModified: [...journalArticles].map((a) => a.date).sort().at(-1),
          }),
          breadcrumbNode('/journal', topLevelCrumbs('/journal')),
          journalListNode(journalArticles)
        )}
      />
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase text-cobalt mb-4">The SOYL Journal</p>
          <h1 className="text-headline text-ink">
            Ideas about learning, technology and the school that&rsquo;s coming next.
          </h1>
        </header>

        {featured && (
          <article className="mb-16 pb-16 border-b border-ink/10">
            <Link href={`/journal/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] bg-ink/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-ink/10 transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div>
                  <div className="flex items-center gap-3 text-sm text-ink/60 mb-4">
                    <time dateTime={featured.date}>{formatArticleDate(featured.date)}</time>
                    <span>&middot;</span>
                    <span>{formatReadingTime(featured.readingTime)}</span>
                    <span>&middot;</span>
                    <span className="text-cobalt">{featured.category}</span>
                  </div>
                  <h2 className="text-subhead text-ink mb-4 group-hover:text-cobalt transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-lg text-ink/80 leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        )}

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {rest.map((article) => (
            <article key={article.slug} className="group border-t border-ink/10 pt-8">
              <Link href={`/journal/${article.slug}`} className="block">
                <div className="flex items-center gap-3 text-sm text-ink/60 mb-3">
                  <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                  <span>&middot;</span>
                  <span>{formatReadingTime(article.readingTime)}</span>
                  <span>&middot;</span>
                  <span className="text-cobalt">{article.category}</span>
                </div>
                <h3 className="text-subhead text-ink mb-3 group-hover:text-cobalt transition-colors">
                  {article.title}
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

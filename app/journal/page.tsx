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
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export const metadata = createMetadata({ path: '/journal' });

export default function JournalPage() {
  const [featured, ...rest] = journalArticles || [];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-black pt-16 md:pt-32 pb-16 md:pb-32">
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
      <Container>
        <header className="mb-12 md:mb-24">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-widest uppercase text-brand-blue mb-6">The SOYL Journal</p>
            <h1 className="text-5xl md:text-7xl font-bold max-w-4xl tracking-tight leading-tight">
              Ideas about learning, technology and the <span className="bg-brand-yellow px-2">school that&rsquo;s coming next.</span>
            </h1>
          </ScrollReveal>
        </header>

        {featured && (
          <ScrollReveal delay={0.1}>
            <article className="mb-12 md:mb-24 pb-12 md:pb-24 border-b border-brand-black/10">
              <Link href={`/journal/${featured.slug}`} className="group block">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="aspect-[4/3] bg-brand-black/5 relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-brand-black/10 transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-brand-black/40 mb-6">
                      <time dateTime={featured.date}>{formatArticleDate(featured.date)}</time>
                      <span>&middot;</span>
                      <span>{formatReadingTime(featured.readingTime)}</span>
                      <span>&middot;</span>
                      <span className="text-brand-blue">{featured.category}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 transition-colors group-hover:text-brand-blue leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-xl text-brand-black/70 leading-relaxed">
                      {featured.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          </ScrollReveal>
        )}

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-24">
          {rest.map((article, index) => (
            <ScrollReveal key={article.slug} delay={index * 0.1}>
              <article className="group">
                <Link href={`/journal/${article.slug}`} className="block">
                  <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-brand-black/40 mb-4">
                    <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                    <span>&middot;</span>
                    <span>{formatReadingTime(article.readingTime)}</span>
                    <span>&middot;</span>
                    <span className="text-brand-blue">{article.category}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 transition-colors group-hover:text-brand-blue leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-lg text-brand-black/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}

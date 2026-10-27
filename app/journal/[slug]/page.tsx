import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FinalCta } from '@/components/home/FinalCta';
import { ArticleImage } from '@/components/journal/ArticleImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { formatArticleDate, formatReadingTime, getArticleBySlug, journalArticles } from '@/content/journal';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { articleNode, breadcrumbNode, graph, webPageNode } from '@/lib/seo/schema';

interface Props {
  // Next 16: route params arrive as a Promise and must be awaited.
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: 'Article not found', robots: { index: false, follow: false } };
  }

  return createMetadata({
    path: `/journal/${article.slug}`,
    title: article.title,
    description: article.excerpt,
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.date,
    authors: [article.author || 'SOYL Academy'],
    section: article.category,
    keywords: [article.category, 'SOYL Academy', 'outcome-based learning', 'AI in education'],
  });
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const path = `/journal/${article.slug}`;
  const paragraphs = article.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const related = journalArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({
            path,
            type: 'WebPage',
            name: article.title,
            description: article.excerpt,
            datePublished: article.date,
            dateModified: article.date,
            mainEntityId: `${absoluteUrl(path)}#article`,
          }),
          breadcrumbNode(path, [
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/journal' },
            { name: article.title, path },
          ]),
          articleNode(article)
        )}
      />

      <article>
        <header>
          <div className="page grid-12 pb-10 pt-10 md:pb-14 md:pt-16">
            <div className="col-span-12 lg:col-span-9">
              <nav aria-label="Breadcrumb" className="t-label rise mb-8 text-muted">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover-line hover:text-ink">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/journal" className="hover-line hover:text-ink">Journal</Link></li>
                </ol>
              </nav>
              <p className="t-label rise flex flex-wrap gap-x-2 text-muted">
                <span className="text-ink">{article.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{formatReadingTime(article.readingTime)}</span>
              </p>
              <h1 className="t-display rise mt-5 max-w-[16ch]" style={{ '--d': '80ms' } as React.CSSProperties}>{article.title}</h1>
              <p className="t-lead mt-6 max-w-[56ch]">{article.excerpt}</p>
              {article.author && <p className="t-small mt-6 text-muted">By {article.author}</p>}
            </div>
          </div>
          {article.photo && (
            <div className="page">
              <ArticleImage article={article} aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" large priority sizes="(min-width: 1320px) 1210px, 100vw" />
            </div>
          )}
        </header>

        <div className="page grid-12 section-tight">
          <div className="col-span-12 space-y-6 text-[1.125rem] leading-[1.75] md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-3 [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-serif [&>p:first-child]:first-letter:text-[4.25rem] [&>p:first-child]:first-letter:leading-[0.85]">
            {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>Article coming soon.</p>}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <aside aria-labelledby="keep-reading" className="section-tight">
          <div className="page">
            <h2 id="keep-reading" className="t-eyebrow mb-8 border-t border-ink pt-8 text-muted">Keep reading</h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/journal/${item.slug}`} className="group grid grid-cols-[7.5rem_1fr] items-start gap-5 sm:grid-cols-[10rem_1fr]">
                    <ArticleImage article={item} aspect="aspect-square" sizes="160px" />
                    <div>
                    <p className="t-title transition-colors duration-200 group-hover:text-cobalt">{item.title}</p>
                    <p className="mt-2 text-muted">{item.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}

      <FinalCta />
    </>
  );
}

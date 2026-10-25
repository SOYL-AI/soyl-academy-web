import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FinalCta } from '@/components/home/FinalCta';
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
        <header className="rule-b">
          <div className="page grid-12 py-12 md:py-16">
            <div className="col-span-12 lg:col-span-9">
              <nav aria-label="Breadcrumb" className="t-label mb-8 text-muted">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover:text-ink hover:underline">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/journal" className="hover:text-ink hover:underline">Journal</Link></li>
                </ol>
              </nav>
              <p className="t-label flex flex-wrap gap-x-2 text-muted">
                <span className="text-ink">{article.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{formatReadingTime(article.readingTime)}</span>
              </p>
              <h1 className="t-display mt-5 max-w-[18ch]">{article.title}</h1>
              <p className="t-lead mt-6 max-w-[56ch] text-ink">{article.excerpt}</p>
              {article.author && <p className="t-small mt-6 text-muted">By {article.author}</p>}
            </div>
          </div>
        </header>

        <div className="page grid-12 section-tight">
          <div className="col-span-12 space-y-6 text-[1.125rem] leading-[1.7] md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-3">
            {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>Article coming soon.</p>}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <aside aria-labelledby="keep-reading" className="section-tight rule-t">
          <div className="page">
            <h2 id="keep-reading" className="t-label mb-6 text-muted">Keep reading</h2>
            <ul className="grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug} className="bg-white">
                  <Link href={`/journal/${item.slug}`} className="group block h-full p-5 md:p-6">
                    <p className="t-title group-hover:text-cobalt">{item.title}</p>
                    <p className="mt-2 text-muted">{item.excerpt}</p>
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

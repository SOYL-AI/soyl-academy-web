import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  formatArticleDate,
  formatReadingTime,
  getArticleBySlug,
  journalArticles,
} from '@/content/journal';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { articleNode, breadcrumbNode, graph, webPageNode } from '@/lib/seo/schema';
import { Container } from '@/components/layout/Container';

interface Props {
  // Next 16: route params arrive as a Promise and must be awaited.
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return (journalArticles || []).map((article) => ({
    slug: article.slug,
  }));
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

  if (!article) {
    notFound();
  }

  const path = `/journal/${article.slug}`;
  const paragraphs = article.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const related = journalArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-black pt-16 md:pt-32 pb-16 md:pb-32">
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

      <article className="container mx-auto px-6 max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-12 text-sm font-bold tracking-widest uppercase text-brand-black/50">
          <ol className="flex flex-wrap items-center gap-3">
            <li>
              <Link href="/" className="hover:text-brand-black transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/journal" className="hover:text-brand-black transition-colors">
                Journal
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mb-16">
          <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-brand-black/50 mb-8">
            <span className="text-brand-blue">{article.category}</span>
            <span>&middot;</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            <span>&middot;</span>
            <span>{formatReadingTime(article.readingTime)}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">{article.title}</h1>
          <p className="text-2xl text-brand-black/70 leading-relaxed mb-8">{article.excerpt}</p>
          {article.author && <p className="text-lg font-bold text-brand-black">By {article.author}</p>}
        </header>

        <div className="mx-auto leading-relaxed space-y-8 text-xl text-brand-black/80">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>Article content coming soon.</p>
          )}
        </div>

        {related.length > 0 && (
          <aside aria-labelledby="keep-reading" className="mt-24 pt-12 border-t border-brand-black/10">
            <h2 id="keep-reading" className="text-sm font-bold tracking-widest uppercase text-brand-blue mb-8">
              Keep reading
            </h2>
            <ul className="space-y-12">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/journal/${item.slug}`} className="group block">
                    <p className="text-3xl font-bold transition-colors group-hover:text-brand-blue mb-3">
                      {item.title}
                    </p>
                    <p className="text-xl text-brand-black/70">{item.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <footer className="mt-24 pt-12 border-t border-brand-black/10">
          <Link
            href="/journal"
            className="text-brand-blue hover:text-brand-black transition-colors font-bold flex items-center gap-2"
          >
            &larr; Back to Journal
          </Link>
        </footer>
      </article>
    </div>
  );
}

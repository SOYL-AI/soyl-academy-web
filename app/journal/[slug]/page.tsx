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
    <div className="min-h-screen bg-white text-ink pt-24 pb-24">
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

      <article className="container mx-auto px-6 max-w-[640px]">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-cobalt transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/journal" className="hover:text-cobalt transition-colors">
                Journal
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-ink/60 mb-6 uppercase tracking-wider">
            <span className="text-cobalt">{article.category}</span>
            <span>&middot;</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            <span>&middot;</span>
            <span>{formatReadingTime(article.readingTime)}</span>
          </div>
          <h1 className="text-hero text-ink leading-tight mb-8">{article.title}</h1>
          <p className="text-xl text-ink/70 leading-relaxed mb-6">{article.excerpt}</p>
          {article.author && <p className="text-lg text-ink/80">By {article.author}</p>}
        </header>

        <div className="prose prose-lg prose-ink mx-auto font-sans leading-relaxed space-y-6 text-lg text-ink/85">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>Article content coming soon.</p>
          )}
        </div>

        {related.length > 0 && (
          <aside aria-labelledby="keep-reading" className="mt-20 pt-10 border-t border-ink/10">
            <h2 id="keep-reading" className="text-eyebrow text-ink-lighter mb-6">
              Keep reading
            </h2>
            <ul className="space-y-6">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/journal/${item.slug}`} className="group block">
                    <p className="text-subhead text-ink transition-colors group-hover:text-cobalt">
                      {item.title}
                    </p>
                    <p className="text-ink/70 mt-1">{item.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <footer className="mt-16 pt-10 border-t border-ink/10">
          <Link
            href="/journal"
            className="text-cobalt hover:text-ink transition-colors font-medium flex items-center gap-2"
          >
            &larr; Back to Journal
          </Link>
        </footer>
      </article>
    </div>
  );
}

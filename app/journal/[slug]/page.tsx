import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClosingCta } from '@/components/ink/ClosingCta';
import { Stroke } from '@/components/ink/Stroke';
import { ArticleImage } from '@/components/journal/ArticleImage';
import { ArticleMeta } from '@/components/journal/ArticleMeta';
import { StructuredData } from '@/components/seo/StructuredData';
import { finalCta } from '@/content/home';
import { getArticleBySlug, journalArticles } from '@/content/journal';
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

/**
 * A journal essay, in Ink and wash (plan §3.3, phase 5), set for reading: the heading in Zodiak with one drawn
 * stroke, the photograph beside it, then the text in Switzer at about 65 characters a line.
 */
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
        <header className="pb-10 pt-8 md:pb-14 md:pt-12 lg:pt-14">
          <div className="page grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <nav aria-label="Breadcrumb" className="mb-6 text-[0.9375rem] text-muted">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-ink hover:underline">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/journal" className="hover:text-ink hover:underline">
                      Journal
                    </Link>
                  </li>
                </ol>
              </nav>
              <ArticleMeta date={article.date} readingTime={article.readingTime} category={article.category} />
              <h1 className="ink-hero mt-4 max-w-[16ch]">{article.title}</h1>
              <Stroke pigment="indigo" width="5em" reveal={false} className="text-[clamp(2.6rem,6.2vw,5rem)]" />
              <p className="ink-lead mt-6 max-w-[48ch]">{article.excerpt}</p>
              {article.author ? <p className="mt-5 text-[0.9375rem] text-muted">By {article.author}</p> : null}
            </div>
            <div className="lg:col-span-5">
              <ArticleImage article={article} aspect="4 / 3" priority sizes="(min-width: 1320px) 480px, (min-width: 1024px) 38vw, 92vw" />
            </div>
          </div>
        </header>

        <div className="page pb-16 md:pb-24">
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="max-w-[65ch] border-t border-rule pt-8 text-[1.0625rem] leading-[1.75] text-ink md:pt-10 md:text-[1.1875rem] lg:col-span-7 [&>p+p]:mt-[1.1em]">
              {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>Article coming soon.</p>}
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <aside aria-labelledby="keep-reading" className="pb-16 md:pb-24">
          <div className="page">
            <h2 id="keep-reading" className="ink-title border-t border-rule pt-8">
              Keep reading
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-8 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/journal/${item.slug}`} className="group grid grid-cols-[6.5rem_1fr] items-start gap-5 sm:grid-cols-[9rem_1fr]">
                    <ArticleImage article={item} aspect="1 / 1" masked={false} sizes="144px" />
                    <div>
                      <p className="ink-title transition-colors duration-150 group-hover:text-indigo">{item.title}</p>
                      <p className="mt-2 text-graphite">{item.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      ) : null}

      <ClosingCta headline={finalCta.headline} line={finalCta.line} />
    </>
  );
}

import '@/components/journal/journal.css';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FinalCta } from '@/components/home/FinalCta';
import { ArticleImage } from '@/components/journal/ArticleImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { Kinetic } from '@/components/story/Kinetic';
import { Tilt } from '@/components/story/Tilt';
import { Dab } from '@/components/brush/marks';
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
        <div aria-hidden="true" className="read-thread" />
        <header>
          <div className="page grid-12 pb-10 pt-10 md:pb-14 md:pt-16">
            <div className="col-span-12 lg:col-span-9">
              <nav aria-label="Breadcrumb" className="t-label rise mb-8 text-graphite">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="underline-offset-4 hover:text-ink hover:underline">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/journal" className="underline-offset-4 hover:text-ink hover:underline">Journal</Link></li>
                </ol>
              </nav>
              <p className="t-label rise flex flex-wrap items-baseline gap-x-2 text-graphite">
                <span className="hand text-[1.2rem] text-vermilion-ink">{article.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{formatReadingTime(article.readingTime)}</span>
              </p>
              <Kinetic as="h1" load delay={80} text={article.title} className="t-display mt-5 max-w-[16ch]" />
              <p className="t-lead mt-6 max-w-[56ch] text-graphite">{article.excerpt}</p>
              {article.author && <p className="hand mt-6 text-[1.2rem] text-graphite">By {article.author}</p>}
            </div>
          </div>
          {article.photo && (
            <div className="page">
              <ArticleImage article={article} aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" large priority parallax sizes="(min-width: 1320px) 1210px, 100vw" />
            </div>
          )}
        </header>

        <div className="page grid-12 section-tight">
          <div className="essay col-span-12 max-w-[68ch] space-y-6 text-[1.125rem] leading-[1.8] text-ink/90 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-3">
            {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>Article coming soon.</p>}
          </div>
          {/* The end mark: S·O·Y·L in its four pigments. */}
          <p aria-hidden="true" className="col-span-12 mt-12 flex items-center justify-center gap-2.5 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-3">
            <Dab ink="ultramarine" />
            <Dab ink="vermilion" />
            <Dab ink="ochre" />
            <Dab ink="sap" />
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <aside aria-labelledby="keep-reading" className="section-tight">
          <div className="page">
            <h2 id="keep-reading" className="hand mb-8 border-t-2 border-ink pt-6 text-[1.4rem] text-vermilion-ink">Keep reading</h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Tilt max={4}>
                    <Link href={`/journal/${item.slug}`} className="journal-card group grid grid-cols-[7.5rem_1fr] items-start gap-5 sm:grid-cols-[10rem_1fr]">
                      <div className="print -rotate-[1.2deg]">
                        <ArticleImage article={item} aspect="aspect-square" sizes="160px" />
                      </div>
                      <div>
                        <p className="t-title"><span className="card-title">{item.title}</span></p>
                        <p className="mt-2 text-graphite">{item.excerpt}</p>
                      </div>
                    </Link>
                  </Tilt>
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

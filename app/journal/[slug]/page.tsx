import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Assume getArticleBySlug is available or imported from the same place
import { journalArticles, getArticleBySlug } from '@/content/journal';

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
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | SOYL Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      authors: [article.author || 'SOYL Academy'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-ink pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            author: {
              '@type': 'Person',
              name: article.author || 'SOYL Academy',
            },
            datePublished: article.date,
          }),
        }}
      />
      
      <article className="container mx-auto px-6 max-w-[640px]">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-ink/60 mb-6 uppercase tracking-wider">
            <span className="text-cobalt">{article.category}</span>
            <span>&middot;</span>
            <time dateTime={article.date}>{article.date}</time>
            <span>&middot;</span>
            <span>{article.readingTime}</span>
          </div>
          <h1 className="text-hero text-ink leading-tight mb-8">
            {article.title}
          </h1>
          {article.author && (
            <p className="text-lg text-ink/80">By {article.author}</p>
          )}
        </header>

        <div className="prose prose-lg prose-ink mx-auto font-sans leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: article.content || '<p>Article content coming soon.</p>' }} />
        </div>

        <footer className="mt-20 pt-10 border-t border-ink/10">
          <Link href="/journal" className="text-cobalt hover:text-ink transition-colors font-medium flex items-center gap-2">
            &larr; Back to Journal
          </Link>
        </footer>
      </article>
    </div>
  );
}

import Link from 'next/link';
import { Arrow } from '@/components/ink/Button';
import { PageIntro } from '@/components/ink/PageIntro';
import { ArticleImage } from '@/components/journal/ArticleImage';
import { ArticleMeta } from '@/components/journal/ArticleMeta';
import { StructuredData } from '@/components/seo/StructuredData';
import { journalArticles } from '@/content/journal';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, journalListNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/journal' });

/**
 * The journal, in Ink and wash (plan §3.3, phase 5): a quiet opener, the latest essay large, the rest in a row.
 * Real photographs (components/journal/ArticleImage) printed as duotones.
 */
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

      <PageIntro size="head" title="The SOYL Journal" lead="Ideas about learning, technology and the school that’s coming next." className="pb-8 md:pb-12" />

      <section aria-label="Essays" className="pb-20 md:pb-28">
        <div className="page">
          {featured ? (
            <article className="border-t border-rule pt-10 md:pt-12">
              <Link href={`/journal/${featured.slug}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <ArticleImage article={featured} priority sizes="(min-width: 1320px) 700px, (min-width: 1024px) 56vw, 92vw" />
                </div>
                <div className="lg:col-span-5">
                  <ArticleMeta date={featured.date} readingTime={featured.readingTime} category={featured.category} />
                  <h2 className="ink-head mt-3 transition-colors duration-150 group-hover:text-indigo">{featured.title}</h2>
                  <p className="ink-lead mt-5 max-w-[40ch]">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-indigo">
                    Read the essay
                    <Arrow className="transition-transform duration-150 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <ul className="mt-14 grid gap-x-6 gap-y-12 border-t border-rule pt-10 md:mt-20 md:grid-cols-3 md:pt-12">
              {rest.map((a) => (
                <li key={a.slug}>
                  <article>
                    <Link href={`/journal/${a.slug}`} className="group block">
                      <ArticleImage article={a} sizes="(min-width: 1320px) 390px, (min-width: 768px) 30vw, 92vw" />
                      <div className="mt-5">
                        <ArticleMeta date={a.date} readingTime={a.readingTime} category={a.category} />
                      </div>
                      <h3 className="ink-title mt-2 transition-colors duration-150 group-hover:text-indigo">{a.title}</h3>
                      <p className="mt-2 text-graphite">{a.excerpt}</p>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </>
  );
}

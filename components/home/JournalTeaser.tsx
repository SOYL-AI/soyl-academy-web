import Link from 'next/link';
import { journalTeaser } from '@/content/home';
import { formatArticleDate, journalArticles } from '@/content/journal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArrowRight } from '@/components/ui/Button';
import { ArticleImage } from '@/components/journal/ArticleImage';

export function JournalTeaser() {
  const latest = [...journalArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="section">
      <div className="page">
        <SectionHeader
          label={journalTeaser.label}
          num="06"
          title={journalTeaser.headline}
          aside={
            <Link href={journalTeaser.link.href} className="arrow-link">
              {journalTeaser.link.label} <ArrowRight />
            </Link>
          }
        />
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-16 md:grid-cols-3">
          {latest.map((a, i) => (
            <li key={a.slug} data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <ArticleImage article={a} sizes="(min-width: 1320px) 390px, (min-width: 768px) 31vw, 100vw" />
                <p className="t-label mt-5 flex flex-wrap gap-x-2 text-muted">
                  <span className="text-red-ink">{a.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={a.date}>{formatArticleDate(a.date)}</time>
                </p>
                <h3 className="t-title mt-2 transition-colors duration-200 group-hover:text-cobalt">{a.title}</h3>
                <p className="mt-2 text-muted">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

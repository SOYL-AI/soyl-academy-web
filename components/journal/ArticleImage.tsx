import { InkPhoto } from '@/components/ink/InkPhoto';
import { photo } from '@/content/credits';
import type { JournalArticle } from '@/content/journal';
import { cn } from '@/lib/utils';

/**
 * The real photograph for each journal article (content/credits.ts, Pexels), by article slug. Ink and wash
 * (phase 5) retires the generated pictures in public/images, so the `photo` field of content/journal.ts (an
 * image key into content/images.ts) is no longer read by the journal pages. A new article without an entry here
 * gets the typographic card.
 *
 * Rules (DESIGN.md §6): hands, desks and boards; no recognisable child's face beside a claim or a number.
 */
const ARTICLE_PHOTOS: Record<string, { slug: string; position?: string }> = {
  'homework-after-chatgpt': { slug: 'hands-writing-night', position: '35% 55%' },
  'why-outcomes-matter': { slug: 'electronics-top' },
  'should-schools-ban-ai': { slug: 'desk-pages', position: '50% 60%' },
  'learning-to-defend-an-idea': { slug: 'chalk-maths', position: '60% 50%' },
};

/** The editorial photograph for a journal article, printed as a duotone, or a quiet typographic card. */
export function ArticleImage({
  article,
  sizes,
  aspect = '3 / 2',
  priority,
  masked = true,
  className,
}: {
  article: JournalArticle;
  sizes: string;
  /** CSS aspect-ratio of the box, e.g. "3 / 2". */
  aspect?: string;
  priority?: boolean;
  /** Print inside the ragged panel wash (default) or as a plain rectangle (small thumbnails). */
  masked?: boolean;
  className?: string;
}) {
  const entry = ARTICLE_PHOTOS[article.slug];
  if (entry) {
    const p = photo(entry.slug);
    return <InkPhoto src={p.src} alt={p.alt} aspect={aspect} sizes={sizes} priority={priority} position={entry.position} masked={masked} className={cn(!masked && 'rounded-[var(--radius-sm)]', className)} />;
  }
  return (
    <div aria-hidden="true" className={cn('flex items-end rounded-[var(--radius-md)] bg-paper-2 p-6', className)} style={{ aspectRatio: aspect }}>
      <span className="font-serif text-[2rem] leading-none text-muted">{article.category}</span>
    </div>
  );
}

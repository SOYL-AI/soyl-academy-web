import type { JournalArticle } from '@/content/journal';
import { images } from '@/content/images';
import { Photo } from '@/components/media/Photo';
import { cn } from '@/lib/utils';

/**
 * The photograph for a journal article as a print on the page (ADR-033/034), or a quiet paper card with the
 * category in handwriting when there is none.
 */
export function ArticleImage({
  article,
  sizes,
  aspect = 'aspect-[3/2]',
  priority,
  large,
  parallax,
}: {
  article: JournalArticle;
  sizes: string;
  aspect?: string;
  priority?: boolean;
  large?: boolean;
  /** Scroll-linked drift (the reading view's header image). */
  parallax?: boolean;
}) {
  if (article.photo) {
    return (
      <div className={cn('leaf', large ? 'p-2 md:p-2.5' : 'p-1.5')}>
        <Photo
          image={images[article.photo]}
          aspect={aspect}
          sizes={sizes}
          priority={priority}
          settle={priority}
          large={large}
          zoom={!parallax}
          parallax={parallax}
          reveal={false}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={cn('leaf relative flex items-end overflow-hidden p-6', aspect)}
      style={{
        backgroundImage:
          'radial-gradient(ellipse 70% 60% at 22% 28%, var(--color-ochre-soft) 0 55%, transparent 72%), radial-gradient(ellipse 55% 50% at 82% 78%, var(--color-ultramarine-soft) 0 50%, transparent 70%)',
      }}
    >
      <span className="hand text-[1.6rem] leading-none text-graphite">{article.category}</span>
    </div>
  );
}

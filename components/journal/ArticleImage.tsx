import type { JournalArticle } from '@/content/journal';
import { images } from '@/content/images';
import { Photo } from '@/components/media/Photo';

/** The editorial photograph for a journal article, or a quiet typographic card when there is none. */
export function ArticleImage({
  article,
  sizes,
  aspect = 'aspect-[3/2]',
  priority,
  large,
}: {
  article: JournalArticle;
  sizes: string;
  aspect?: string;
  priority?: boolean;
  large?: boolean;
}) {
  if (article.photo) {
    return (
      <Photo
        image={images[article.photo]}
        aspect={aspect}
        sizes={sizes}
        priority={priority}
        settle={priority}
        large={large}
        zoom
        reveal={false}
      />
    );
  }
  return (
    <div aria-hidden="true" className={`frame ${aspect} flex items-end p-6`}>
      <span className="font-serif text-[2rem] leading-none text-muted">{article.category}</span>
    </div>
  );
}

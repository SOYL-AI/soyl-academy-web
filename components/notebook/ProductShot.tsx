import Image from 'next/image';
import type { MediaSlot } from '@/content/media';
import { SHOW_CONTENT_TODOS } from '@/lib/site';
import { cn } from '@/lib/utils';
import { TodoSlot } from './TodoSlot';

interface ProductShotProps {
  slot: MediaSlot;
  kind?: 'Screenshot' | 'Photo';
  /** `sizes` for the responsive image. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * A real product screen, short loop or photograph from content/media.ts.
 * Missing files render as a labelled TODO frame (or nothing in launch mode).
 */
export function ProductShot({ slot, kind = 'Screenshot', sizes, priority, className }: ProductShotProps) {
  const ratio = `${slot.width} / ${slot.height}`;

  if (!slot.src) {
    if (!SHOW_CONTENT_TODOS) return null;
    return <TodoSlot brief={slot.brief} kind={kind} ratio={ratio} className={className} />;
  }

  if (slot.loop) {
    return (
      <video
        className={cn('block h-auto w-full border border-rule bg-white', className)}
        style={{ aspectRatio: ratio }}
        poster={slot.src}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label={slot.alt}
      >
        <source src={slot.loop} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={slot.src}
      alt={slot.alt}
      width={slot.width}
      height={slot.height}
      sizes={sizes}
      priority={priority}
      className={cn('block h-auto w-full border border-rule bg-white', className)}
    />
  );
}

import Image from 'next/image';
import type { MediaSlot } from '@/content/media';
import { cn } from '@/lib/utils';

/** True when a real product screen or loop has been supplied for the slot. */
export function hasMedia(slot: MediaSlot): boolean {
  return Boolean(slot.src);
}

interface ProductShotProps {
  slot: MediaSlot;
  /** `sizes` for the responsive image. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * A real product screen or short loop from content/media.ts. Renders nothing
 * until the file exists: the editorial layouts stand on their own without it.
 */
export function ProductShot({ slot, sizes, priority, className }: ProductShotProps) {
  if (!slot.src) return null;
  const ratio = `${slot.width} / ${slot.height}`;

  if (slot.loop) {
    return (
      <video
        className={cn('block h-auto w-full rounded-[var(--radius-md)] border border-rule bg-white', className)}
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
      preload={priority}
      className={cn('block h-auto w-full rounded-[var(--radius-md)] border border-rule bg-white', className)}
    />
  );
}

import Image from 'next/image';
import type { EditorialImage } from '@/content/images';
import { cn } from '@/lib/utils';
import type { Tone } from '@/components/ui/SectionHeader';

interface PhotoProps {
  image: EditorialImage;
  /** `sizes` for the responsive image: be honest, it decides the download. */
  sizes: string;
  /** Tailwind aspect class for the frame, e.g. "aspect-[4/5]". */
  aspect?: string;
  /**
   * Hero image: fetched at high priority, no reveal. Deliberately not preloaded: on
   * phones the hero photo sits under the headline, the text is the LCP element, and a
   * preload would spend the critical first second of a slow connection on it.
   */
  priority?: boolean;
  /** Clip-path wipe in when scrolled into view. */
  reveal?: boolean;
  /** Scroll-linked drift (CSS scroll-driven animation, where supported). */
  parallax?: boolean;
  /** Slow zoom on hover (for linked cards). */
  zoom?: boolean;
  /** Settle from a slight zoom on page load (hero). */
  settle?: boolean;
  large?: boolean;
  className?: string;
  imgClassName?: string;
  delay?: number;
  /** A block of accent colour offset behind the photo (blue, red or yellow). */
  backdrop?: Tone;
  /** Which corner the backdrop peeks out from. */
  backdropSide?: 'left' | 'right';
}

/**
 * An editorial photograph in a rounded frame. next/image with a static import:
 * intrinsic size (no CLS), blur placeholder, AVIF/WebP, lazy below the fold.
 */
export function Photo({
  image,
  sizes,
  aspect = 'aspect-[4/3]',
  priority,
  reveal = true,
  parallax,
  zoom,
  settle,
  large,
  className,
  imgClassName,
  delay,
  backdrop,
  backdropSide = 'right',
}: PhotoProps) {
  const photo = (
    <div
      className={cn('frame', large && 'frame-lg', aspect, parallax && 'parallax', zoom && 'zoom-img', className)}
      data-reveal={reveal && !priority ? 'image' : undefined}
      style={delay ? ({ '--d': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        fetchPriority={priority ? 'high' : undefined}
        placeholder="blur"
        className={cn('object-cover', settle && 'settle', imgClassName)}
        style={image.focus ? { objectPosition: image.focus } : undefined}
      />
    </div>
  );

  if (!backdrop) return photo;
  return (
    <div className={cn('relative isolate', `tone-${backdrop}`)}>
      <div
        aria-hidden="true"
        className={cn(
          'absolute -z-10 rounded-[var(--radius-lg)] bg-[var(--tone)]',
          backdropSide === 'right'
            ? '-bottom-3 -right-3 left-6 top-6 md:-bottom-5 md:-right-5 md:left-10 md:top-10'
            : '-bottom-3 -left-3 right-6 top-6 md:-bottom-5 md:-left-5 md:right-10 md:top-10'
        )}
      />
      {photo}
    </div>
  );
}

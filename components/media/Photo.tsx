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
  // Brush (ADR-033): a print pinned to the page with a strip of tape, a pigment wash peeking out behind it.
  const tape = { blue: 'var(--color-ultramarine)', red: 'var(--color-vermilion)', yellow: 'var(--color-ochre)' }[backdrop];
  const wash = { blue: 'var(--color-ultramarine-soft)', red: 'var(--color-vermilion-soft)', yellow: 'var(--color-ochre-soft)' }[backdrop];
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className={cn('absolute -z-10', backdropSide === 'right' ? '-bottom-6 -right-6 left-12 top-10' : '-bottom-6 -left-6 right-12 top-10')}
        style={{ background: wash, borderRadius: '46% 54% 42% 58% / 55% 41% 59% 45%', filter: 'blur(1px)' }}
      />
      <div className={cn('leaf tape p-2 md:p-2.5', backdropSide === 'right' ? 'tilt-r' : 'tilt-l')} style={{ '--tape': tape } as React.CSSProperties}>
        {photo}
      </div>
    </div>
  );
}

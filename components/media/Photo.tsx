import Image from 'next/image';
import type { EditorialImage } from '@/content/images';
import { cn } from '@/lib/utils';

interface PhotoProps {
  image: EditorialImage;
  /** `sizes` for the responsive image: be honest, it decides the download. */
  sizes: string;
  /** Tailwind aspect class for the frame, e.g. "aspect-[4/5]". */
  aspect?: string;
  /** Above-the-fold hero image: preloaded, never lazy. */
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
}: PhotoProps) {
  return (
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
        preload={priority}
        placeholder="blur"
        className={cn('object-cover', settle && 'settle', imgClassName)}
        style={image.focus ? { objectPosition: image.focus } : undefined}
      />
    </div>
  );
}

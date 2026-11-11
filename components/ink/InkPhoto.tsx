import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';
import s from './ink.module.css';

interface InkPhotoProps {
  src: string | StaticImageData;
  /** Describe what the photograph shows; it is content, not decoration. */
  alt: string;
  /** The box the photograph fills (it is cropped with object-fit: cover). */
  aspect?: string;
  sizes: string;
  /** Day: indigo-deep to paper. Night: slate to warm chalk. */
  night?: boolean;
  /** Print inside the ragged panel wash instead of a plain rectangle. Default true. */
  masked?: boolean;
  priority?: boolean;
  /** Focal point for the crop, as object-position (for example "50% 30%"). */
  position?: string;
  className?: string;
}

/**
 * A real photograph printed in the language (plan §2.6): a duotone inside the painted panel, so it reads as an
 * ink print rather than a stock photograph. Rules: real photographs only (no generated people); prefer hands,
 * desks, books and backs of heads; a recognisable child's face never sits beside a price, a claim or a number;
 * credits go in content/credits.ts.
 */
export function InkPhoto({ src, alt, aspect = '4 / 3', sizes, night, masked = true, priority, position, className }: InkPhotoProps) {
  return (
    <div className={cn(s.photo, night && s.photoNight, masked && s.photoMasked, className)} style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill sizes={sizes} loading={priority ? 'eager' : undefined} fetchPriority={priority ? 'high' : undefined} style={{ objectFit: 'cover', objectPosition: position }} />
    </div>
  );
}

import Image from 'next/image';

interface VideoLoopProps {
  src: string;
  /** Shown as the poster, and as the whole thing under reduced motion. */
  poster: string;
  /** Describes the still — the video itself is decorative. */
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * A decorative, silent, looping clip.
 *
 * Reduced motion is handled in CSS rather than JS: the still and the video are
 * both rendered, and exactly one of the two media queries always matches. That
 * keeps this a Server Component, avoids a hydration flash, and — combined with
 * `preload="none"` — means reduced-motion users never fetch the video at all.
 */
export function VideoLoop({
  src,
  poster,
  alt,
  className = '',
  sizes = '100vw',
}: VideoLoopProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Reduced-motion path */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className="motion-still object-cover"
      />

      {/* Motion path. Decorative: the still above carries the description. */}
      <video
        className="motion-clip absolute inset-0 h-full w-full object-cover"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

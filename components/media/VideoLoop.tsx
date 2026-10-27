'use client';

import { useEffect, useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

interface VideoLoopProps {
  src: string;
  /** The still: shown first, under reduced motion, and without JS. */
  poster: StaticImageData;
  /** Describes the still. The clip itself is decorative. */
  alt: string;
  sizes: string;
  className?: string;
}

/**
 * A silent, decorative loop that never competes with the page:
 * - nothing is downloaded until the frame is near the viewport (`preload="none"`,
 *   no `autoplay` attribute), so it never affects LCP;
 * - it pauses when scrolled away;
 * - under prefers-reduced-motion (and without JS) only the still is shown.
 */
export function VideoLoop({ src, poster, alt, sizes, className }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay refused (e.g. data saver): the poster stays.
          });
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image src={poster} alt={alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
      <video
        ref={ref}
        className="motion-clip absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 data-[playing]:opacity-100"
        onPlaying={(e) => {
          e.currentTarget.dataset.playing = '';
        }}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

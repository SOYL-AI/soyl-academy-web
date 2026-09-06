'use client';

import * as React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EditorialImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | 'auto';
  containerClassName?: string;
}

export function EditorialImage({
  src,
  alt,
  aspectRatio = 'auto',
  className,
  containerClassName,
  priority,
  ...props
}: EditorialImageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (containerRef.current && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, { scope: containerRef });

  const aspectRatioClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    'auto': 'aspect-auto',
  }[aspectRatio];

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden bg-[#F4F0E7]', aspectRatioClass, containerClassName)}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn('object-cover', className)}
        priority={priority}
        fill={aspectRatio !== 'auto'}
        {...(aspectRatio === 'auto' ? { width: props.width || 1200, height: props.height || 800 } : {})}
        {...props}
      />
    </div>
  );
}

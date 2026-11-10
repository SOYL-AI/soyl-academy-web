import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import s from './ink.module.css';

/** Thirds of the stroke that are drawn: 0 (nothing yet) to 3 (closed). */
export type RingProgress = 0 | 1 | 2 | 3;

/** The stroke runs 336deg (tools/art/process.py); the mask needs a little more to show its tail whole. */
const THIRD_DEG = 112;
export const ringSweep = (progress: RingProgress) => (progress >= 3 ? 360 : progress * THIRD_DEG);

const LAYERS = {
  day: { wash: '/art/wash.webp', sun: '/art/sun.webp', rays: '/art/rays.webp', ring: '/art/ring.webp' },
  night: { wash: '/art/wash-chalk.webp', sun: '/art/sun-lamp.webp', rays: '/art/rays-chalk.webp', ring: '/art/ring-chalk.webp' },
} as const;

interface RingProps {
  /** How much of the ring is drawn, in thirds. Default 3 (closed). Changing it animates the stroke, 900 ms a third. */
  progress?: RingProgress;
  /** Day: ink on paper. Night: chalk on slate (the app's dark theme). */
  night?: boolean;
  /**
   * When the drawn part appears: `load` draws it on first paint (the hero), `view` when it first scrolls into
   * view (RevealObserver), `none` shows it as it is. Reduced motion: always as it is.
   */
  draw?: 'load' | 'view' | 'none';
  /** Which painted layers lie under the ring. Default: all of them. */
  layers?: { wash?: boolean; sun?: boolean; rays?: boolean };
  /** Preload the ring plate (use when the ring is the hero, so it can be the LCP image). */
  priority?: boolean;
  /** Rendered width of the ring, for the image optimiser, e.g. "(min-width: 1024px) 520px, 90vw". */
  sizes: string;
  /** When given, the ring is announced as an image with this label; otherwise it is decorative. */
  label?: string;
  /** Content centred inside the ring (the playable question, a number). */
  children?: ReactNode;
  className?: string;
}

/**
 * The site's single signature (plan §2.1): one dry-brush ink ring, an enso, painted with p5.brush and shipped as
 * registered image layers (no canvas or WebGL on the site). It can be unfinished: every try a visitor makes
 * lays a third of the stroke, and the right answer closes it. One ring per page.
 *
 * The stroke is revealed by a conic mask whose angle is the registered `--sweep` property (app/globals.css), so
 * it draws in the direction it was painted. Without @property support it still shows the right amount, unanimated.
 */
export function Ring({ progress = 3, night, draw = 'none', layers, priority, sizes, label, children, className }: RingProps) {
  const set = LAYERS[night ? 'night' : 'day'];
  const show = { wash: true, sun: true, rays: true, ...layers };
  const sweep = ringSweep(progress);
  const style = {
    '--ring-to': `${sweep}deg`,
    // Draw time follows the amount drawn: 900 ms a third.
    '--ring-ms': `${Math.max(1, Math.round(sweep / THIRD_DEG)) * 900}ms`,
  } as CSSProperties;

  const layer = (src: string, extra?: string) => (
    <span aria-hidden="true" className={cn(s.ringLayer, extra)}>
      <Image src={src} alt="" fill sizes={sizes} />
    </span>
  );

  return (
    <div
      className={cn(s.ring, draw === 'load' && s.drawLoad, className)}
      style={style}
      data-reveal={draw === 'view' ? 'ink-ring' : undefined}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {show.wash ? layer(set.wash) : null}
      {show.sun ? layer(set.sun) : null}
      {show.rays ? layer(set.rays) : null}
      <span aria-hidden="true" data-ring-stroke="" className={cn(s.ringLayer, s.ringStroke)}>
        <Image src={set.ring} alt="" fill sizes={sizes} priority={priority} />
      </span>
      {children ? <div className={s.ringInner}>{children}</div> : null}
    </div>
  );
}

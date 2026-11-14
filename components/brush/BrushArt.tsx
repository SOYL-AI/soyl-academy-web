'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { canPaint, isAutomated, paint, prefersReducedMotion } from './engine';
import { PALETTE } from './palette';
import type { ArtName, ArtOptions } from './recipes';

interface BrushArtProps<A extends ArtName> {
  art: A;
  options: ArtOptions[A];
  /** A fixed seed paints the same picture every time; 'visit' paints a new one per visit (stable under automation). */
  seed?: number | 'visit';
  /** Milliseconds between strokes while it draws itself (0 = as fast as the frame budget allows). */
  stepMs?: number;
  /** Paint as soon as the page has loaded, without waiting to be scrolled near (the hero). */
  eager?: boolean;
  /** The background the artwork sits on (must match the section). Defaults to the paper colour. */
  bg?: string;
  className?: string;
  /** Static fallback (an SVG) shown before painting starts and when the browser cannot paint. */
  children?: React.ReactNode;
}

/**
 * A p5.brush painting (ADR-033). Decorative: aria-hidden, no layout of its own (it fills its box), painted after
 * the page has loaded and only when near the viewport. Repaints instantly when its width changes a lot.
 */
export function BrushArt<A extends ArtName>({ art, options, seed = 1, stepMs = 0, eager = false, bg = PALETTE.sheet, className, children }: BrushArtProps<A>) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [painted, setPainted] = useState(false);
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    if (!canPaint()) {
      box.dataset.paint = 'off';
      return;
    }

    const automated = isAutomated();
    // Screenshots and tests: every painting starts on load and reports when it is done (data-paint), and none
    // repaints on resize, so a full-page capture (which stretches the viewport) stays still.
    box.dataset.paint = 'wait';
    const still = automated || prefersReducedMotion();
    const resolvedSeed = seed === 'visit' ? (automated ? 7 : Math.floor(Math.random() * 1e9)) : seed;
    const opts = JSON.parse(optionsKey) as ArtOptions[A];

    let cancel: (() => void) | null = null;
    let lastW = 0;
    // Eager (the hero): do not wait to be scrolled to. Everything waits for the page to load and settle.
    let visible = eager || automated;
    let ready = false;

    const start = (instant: boolean) => {
      const { width, height } = box.getBoundingClientRect();
      if (width < 4 || height < 4) return;
      cancel?.();
      lastW = width;
      cancel = paint({
        canvas,
        w: width,
        h: height,
        seed: resolvedSeed,
        art,
        options: opts,
        stepMs,
        instant,
        bg,
        onDone: () => {
          box.dataset.paint = 'done';
        },
      });
      box.dataset.paint = 'busy';
      setPainted(true);
    };

    const maybeStart = () => {
      if (ready && visible && lastW === 0) start(still);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        // Eager and automated paintings never wait to be scrolled to (the observer's first report, "off screen",
        // used to override that, so full-page screenshots caught the footer painted or not at random).
        visible = eager || automated || Boolean(entry?.isIntersecting);
        maybeStart();
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(box);

    const ro = new ResizeObserver(() => {
      if (automated) return;
      const w = box.getBoundingClientRect().width;
      if (lastW > 0 && Math.abs(w - lastW) / lastW > 0.12) start(true);
    });
    ro.observe(box);

    // Wait for the page to finish loading and the main thread to be idle before the first painting.
    let idleId: number | undefined;
    const onReady = () => {
      const go = () => {
        ready = true;
        maybeStart();
      };
      if (typeof window.requestIdleCallback === 'function') idleId = window.requestIdleCallback(go, { timeout: eager ? 600 : 1500 });
      else idleId = globalThis.setTimeout(go, 300) as unknown as number;
    };
    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady, { once: true });

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('load', onReady);
      if (idleId !== undefined) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
        else globalThis.clearTimeout(idleId);
      }
      cancel?.();
    };
  }, [art, optionsKey, seed, stepMs, eager, bg]);

  return (
    <div ref={boxRef} aria-hidden="true" className={cn('pointer-events-none relative', className)}>
      {children && <div className={cn('absolute inset-0 transition-opacity duration-500', painted && 'opacity-0')}>{children}</div>}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

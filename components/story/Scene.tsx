'use client';

import './story.css';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A scroll-told scene (ADR-034): a tall section whose stage sticks while the page scrolls past it. Native scroll,
 * no wheel hijacking. This island only writes two things on the section, once per animation frame while the scene
 * is near the viewport:
 *   --p          progress through the scene, 0 → 1 (CSS uses it for scrubbed movement; see `progress` for the
 *                cheaper --sp on chosen elements, or an event)
 *   data-step    the current step, 0 … steps-1 (CSS shows [data-at] / [data-only] children, see story.css)
 * and the text of any [data-count] counters inside it (data-from, data-to, data-range="a,b", data-format="clock").
 *
 * Keep scenes short (≤ 3 screens). Server-render the content as children; nothing here re-renders on scroll.
 */

interface SceneProps {
  /** Anchor id (also used by the chapter rail when `chapter` is set). */
  id?: string;
  /** Chapter title for the chapter rail. */
  chapter?: string;
  /** Height in screens on tablets and desktops. */
  length?: number;
  /** Height in screens on phones (defaults to `length`). */
  mobileLength?: number;
  /** Number of discrete steps. */
  steps?: number;
  className?: string;
  stageClassName?: string;
  /** Leave room for the sticky header at the top of the stage (default true; false for full-bleed stages). */
  underNav?: boolean;
  /**
   * Where progress goes. Writing --p on the section re-styles every element in it each frame, which is fine for a
   * small scene and costly for a big one.
   *   'css' (default)  --p on the section (inherited by everything in it)
   *   'targets'        --sp, a non-inherited number (story.css), only on the scene's [data-p] elements; their CSS
   *                    must not hand a derived custom property down to children that do not need it
   *   'event'          nothing in CSS; a `sceneprogress` event ({ detail: p }) for an island that moves a few
   *                    elements itself (the 3D opening)
   */
  progress?: 'css' | 'targets' | 'event';
  'aria-label'?: string;
  children: ReactNode;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const live = new Set<HTMLElement>();
/** Each scene's [data-count] counters and [data-p] targets, found once (the content is server-rendered). */
const counters = new WeakMap<HTMLElement, HTMLElement[]>();
const targets = new WeakMap<HTMLElement, HTMLElement[]>();
/** The last progress written per scene: a scene that is near the screen but not moving writes nothing. */
const written = new WeakMap<HTMLElement, string>();
let frame = 0;
let io: IntersectionObserver | null = null;

function pad(n: number, w: number) {
  return String(n).padStart(w, '0');
}

function tick() {
  frame = 0;
  const vh = window.innerHeight;
  // Read every rect first, then write: no layout thrash.
  const reads = Array.from(live, (el) => ({ el, r: el.getBoundingClientRect() }));
  for (const { el, r } of reads) {
    const total = r.height - vh;
    const p = total > 0 ? clamp(-r.top / total) : r.top <= 0 ? 1 : 0;
    const steps = Number(el.dataset.steps || 0);
    if (steps > 1) {
      const step = String(Math.min(steps - 1, Math.floor(p * steps)));
      if (el.dataset.step !== step) el.dataset.step = step;
    }
    const value = p.toFixed(4);
    if (written.get(el) === value) continue;
    written.set(el, value);
    const mode = el.dataset.progress;
    if (mode === 'event') el.dispatchEvent(new CustomEvent('sceneprogress', { detail: p }));
    else if (mode === 'targets') targets.get(el)?.forEach((t) => t.style.setProperty('--sp', value));
    else el.style.setProperty('--p', value);
    counters.get(el)?.forEach((c) => {
      const from = Number(c.dataset.from || 0);
      const to = Number(c.dataset.to || 0);
      const [a, b] = (c.dataset.range || '0,1').split(',').map(Number);
      const t = clamp((p - (a ?? 0)) / Math.max(0.0001, (b ?? 1) - (a ?? 0)));
      const v = Math.round(from + (to - from) * t);
      const text = c.dataset.format === 'clock' ? `${pad(Math.floor(v / 60), 2)}:${pad(v % 60, 2)}` : String(v);
      if (c.textContent !== text) c.textContent = text;
    });
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function observe(el: HTMLElement) {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const t = e.target as HTMLElement;
          if (e.isIntersecting) live.add(t);
          else live.delete(t);
        }
        schedule();
      },
      { rootMargin: '50% 0px 50% 0px' }
    );
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }
  counters.set(el, Array.from(el.querySelectorAll<HTMLElement>('[data-count]')));
  targets.set(el, Array.from(el.querySelectorAll<HTMLElement>('[data-p]')));
  written.delete(el);
  io.observe(el);
}

function unobserve(el: HTMLElement) {
  live.delete(el);
  io?.unobserve(el);
}

export function Scene({
  id,
  chapter,
  length = 3,
  mobileLength,
  steps = 0,
  className,
  stageClassName,
  underNav = true,
  progress = 'css',
  children,
  ...rest
}: SceneProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    observe(el);
    schedule();
    return () => unobserve(el);
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      data-chapter={chapter}
      data-steps={steps || undefined}
      data-step={steps ? '0' : undefined}
      data-progress={progress === 'css' ? undefined : progress}
      aria-label={rest['aria-label']}
      className={cn('scene', className)}
      style={{ '--len': length, '--len-m': mobileLength ?? length } as CSSProperties}
    >
      <div className={cn('scene-stage', underNav && 'scene-stage--under-nav', stageClassName)}>{children}</div>
    </section>
  );
}

'use client';

import './students.css';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * The pupil's trail (ADR-034): a long, normally scrolling section with a pencil route down it. This island only
 * writes --p, how far the middle of the screen has travelled through the trail (0 → 1), once per frame while it is
 * on screen; CSS inks the route in up to that point. No pinning, no scroll hijacking.
 */
export function Trail({ children, className, id, chapter }: { children: ReactNode; className?: string; id?: string; chapter?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    let frame = 0;
    let on = false;
    const tick = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const schedule = () => {
      if (on && !frame) frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      on = Boolean(e?.isIntersecting);
      schedule();
    });
    io.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id={id} data-chapter={chapter} className={`trail relative ${className ?? ''}`}>
      {children}
    </section>
  );
}

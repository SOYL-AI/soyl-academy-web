'use client';

import './schools.css';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * The term's timeline (/schools): writes `--f`, how far the middle of the screen has travelled down the timeline
 * (0 → 1), so the drawn line fills as the reader scrolls. Native scroll; one passive listener while it is near the
 * viewport. Under reduced motion the line is simply full (schools.css).
 */
export function TermLine({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const f = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      el.style.setProperty('--f', f.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener('scroll', onScroll);
        onScroll();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`term relative ${className ?? ''}`}>
      {children}
    </div>
  );
}

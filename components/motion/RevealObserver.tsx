'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll reveals for every `[data-reveal]` element on the page, with no
 * animation library.
 *
 * Progressive by design:
 * - Without JS nothing is ever hidden (the hidden state needs `data-rs`, which only this sets).
 * - Elements already on screen when the page hydrates are left alone, so nothing
 *   that was painted disappears and the LCP element is never touched.
 * - Only elements that start below the fold are marked `pending` (hidden by CSS with
 *   opacity/transform/clip-path: no layout change, so no CLS), then `in` on entry.
 * - prefers-reduced-motion: does nothing.
 *
 * Mounted once in the root layout; re-scans after each client-side navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.rs = 'in';
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    const fold = window.innerHeight * 0.9;
    document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-rs])').forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      el.dataset.rs = 'pending';
      io.observe(el);
    });

    return () => {
      io.disconnect();
      // Anything still waiting (e.g. a section that survives the navigation) is shown.
      document.querySelectorAll<HTMLElement>('[data-rs="pending"]').forEach((el) => {
        el.dataset.rs = 'in';
      });
    };
  }, [pathname]);

  return null;
}

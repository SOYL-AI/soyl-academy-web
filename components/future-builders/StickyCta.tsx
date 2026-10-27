'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface StickyCtaProps {
  /** Short status, e.g. "₹5,499 · closes 22 Oct" or "Next cohort: dates soon". */
  line: string;
  label: string;
  /** Analytics action label for the button. */
  track: string;
  /** Element ids: the bar shows once `after` has scrolled away, and hides while any of `hideOver` is on screen. */
  after: string;
  hideOver: string[];
}

/**
 * Phones only: a slim bar with the page's one action, once the hero's buttons
 * have scrolled away. Same rules as the earlier mobile-enrol button: it hides
 * while the cookie bar is open and wherever the form or the closing call to
 * action is already on screen, so it never covers what it points to.
 * One IntersectionObserver, no scroll listener; hidden bars are not focusable.
 */
export function StickyCta({ line, label, track, after, hideOver }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = document.getElementById(after);
    const blockers = hideOver.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const footer = document.querySelector('footer');
    if (footer) blockers.push(footer);
    if (!start) return;

    let pastStart = false;
    const onScreen = new Set<Element>();
    const cookieOpen = () => {
      const bar = document.querySelector('.cookie-bar');
      return !!bar && getComputedStyle(bar).display !== 'none';
    };
    const update = () => setVisible(pastStart && onScreen.size === 0 && !cookieOpen());

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === start) {
          // Past the hero buttons = no longer visible and above the viewport.
          pastStart = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        } else if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      update();
    });
    io.observe(start);
    blockers.forEach((el) => io.observe(el));

    // The cookie bar is added/removed as a direct child of <body>.
    const mo = new MutationObserver(update);
    mo.observe(document.body, { childList: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [after, hideOver]);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_32px_-20px_rgba(20,20,20,0.35)] backdrop-blur-md transition-[transform,visibility] duration-300 ease-out md:hidden',
        visible ? 'visible translate-y-0' : 'invisible translate-y-full'
      )}
    >
      <div className="page flex min-h-[68px] items-center justify-between gap-3 py-2.5">
        <p className="t-small min-w-0 leading-snug text-ink">{line}</p>
        <div className="flex shrink-0 items-center gap-3">
          <a href="#talk" className="t-small font-semibold text-ink underline decoration-rule-strong underline-offset-4" data-track="talk" data-track-at="sticky">
            Talk to us
          </a>
          <a
            href="#enroll"
            className="press inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-[15px] font-semibold text-white hover:bg-cobalt"
            data-track={track}
            data-track-at="sticky"
          >
            {label}
          </a>
        </div>
      </div>
    </div>
  );
}

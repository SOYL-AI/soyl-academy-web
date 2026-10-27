'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/track';

/**
 * One delegated click listener for the page's calls to action, so the sections
 * stay server components. Mark a link with:
 *   data-track="enrol|waitlist|talk|whatsapp|share"  data-track-at="hero|status|…"
 * Events are consent-gated and carry no personal data (see lib/analytics/track.ts).
 */
export function CtaTracker({ state }: { state: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!el) return;
      trackEvent('fb_cta_click', {
        action: el.dataset.track ?? 'unknown',
        location: el.dataset.trackAt ?? 'unknown',
        state,
      });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [state]);

  return null;
}

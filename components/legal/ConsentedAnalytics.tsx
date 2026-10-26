'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { isPlatformPath } from '@/platform/shared/config/platform-routes';
import { CONSENT_CHANGED_EVENT, readConsent, type CookiePreferences } from './consent';

/** Drops events for learning-platform URLs (client-side navigation after the scripts loaded). */
function dropPlatformEvents<T extends { url: string }>(event: T): T | null {
  return isPlatformPath(event.url) ? null : event;
}

/**
 * Privacy-respecting analytics: Vercel Web Analytics and Speed Insights are
 * cookieless and record no sessions, and even so they only load once the
 * visitor has allowed analytics.
 *
 * Never on learning-platform pages (ADR-001 §8, WEB-1, D-014): nothing renders on a platform path,
 * and events for platform URLs are dropped if the scripts were loaded on a marketing page first.
 */
export function ConsentedAnalytics() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllowed(readConsent()?.analytics === true);
    const onChange = (e: Event) => setAllowed((e as CustomEvent<CookiePreferences>).detail.analytics);
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  if (!allowed || isPlatformPath(pathname)) return null;
  return (
    <>
      <Analytics beforeSend={dropPlatformEvents} />
      <SpeedInsights beforeSend={dropPlatformEvents} />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CONSENT_CHANGED_EVENT, readConsent, type CookiePreferences } from './consent';

/**
 * Privacy-respecting analytics: Vercel Web Analytics and Speed Insights are
 * cookieless and record no sessions, and even so they only load once the
 * visitor has allowed analytics.
 */
export function ConsentedAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllowed(readConsent()?.analytics === true);
    const onChange = (e: Event) => setAllowed((e as CustomEvent<CookiePreferences>).detail.analytics);
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  if (!allowed) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

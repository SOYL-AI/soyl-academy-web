'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { isPlatformPath } from '@/platform/shared/config/platform-routes';
import { CONSENT_CHANGED_EVENT, readConsent, type CookiePreferences } from './consent';

/** Google tag (Google Ads) container. A public ID, not a secret. */
export const GOOGLE_TAG_ID = 'GTM-WC7CFG2T';

/**
 * Consent Mode defaults sent before the tag loads (ADR-031). The visitor has opted in to advertising
 * cookies, so ad storage is on for measuring ad clicks and conversions; ad personalisation (remarketing
 * audiences) stays off because the privacy policy promises no behavioural advertising aimed at students;
 * analytics storage stays off because the cookie bar promises cookieless analytics.
 */
const CONSENT_GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
} as const;

const CONSENT_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
} as const;

/** Google's install snippet, with the consent defaults first so no tag runs before them. */
const BOOT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',${JSON.stringify(CONSENT_GRANTED)});
gtag('js',new Date());
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}';document.head.appendChild(s);`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads the Google tag only on marketing pages, and only after the visitor allows "Advertising" in the
 * cookie bar. Never on learning-platform pages (D-014: no third-party pixels for students): nothing renders
 * there, and if the tag was loaded on a marketing page first, client-side navigation into the platform (or
 * withdrawing consent) denies all storage and reloads the page so the third-party script is gone.
 */
export function ConsentedGoogleTag() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const injected = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllowed(readConsent()?.advertising === true);
    const onChange = (e: Event) => setAllowed((e as CustomEvent<CookiePreferences>).detail.advertising === true);
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  const active = allowed && !isPlatformPath(pathname);

  useEffect(() => {
    if (active) {
      injected.current = true;
    } else if (injected.current) {
      window.gtag?.('consent', 'update', CONSENT_DENIED);
      window.location.reload();
    }
  }, [active]);

  if (!active) return null;
  return (
    <Script id="google-tag" strategy="afterInteractive">
      {BOOT}
    </Script>
  );
}

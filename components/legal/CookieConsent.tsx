'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { inkButtonClasses } from '@/components/ink/Button';
import { OPEN_COOKIE_SETTINGS_EVENT, readConsent, writeConsent } from './consent';

/**
 * Cookie notice. A slim, non-blocking bar at the bottom of the page — never a
 * modal and never covering the hero. It is server-rendered (so it paints with
 * the page instead of popping in after hydration) and hidden by CSS once a
 * choice exists. Re-opened from "Cookie preferences" in the footer.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(true);
  const [forced, setForced] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const headingId = useId();

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      // Reading localStorage can only happen after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
    }

    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setCustom(true);
      setForced(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const save = (prefs: { analytics: boolean; marketing: boolean }) => {
    writeConsent(prefs);
    document.documentElement.dataset.consent = '1';
    setOpen(false);
    setCustom(false);
    setForced(false);
  };

  if (!open) return null;

  // Ink and wash (phase 5): paper bar, ink buttons with soft corners (never pills), 44 px targets. The class names
  // and the DOM shape stay as they were: app/globals.css hides `.cookie-bar` once a choice exists, and
  // components/platform/shell/platform-global.css restyles `.cookie-bar` h2, p, a, label, button and
  // `button:first-child` (the primary choice) for the app's dark theme.
  return (
    <section
      aria-labelledby={headingId}
      data-forced={forced || undefined}
      className="cookie-bar fixed inset-x-0 bottom-0 z-50 border-t border-ink/15 bg-paper"
    >
      <div className="page flex flex-col gap-3 py-3 md:flex-row md:items-center md:gap-8 md:py-4">
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="text-[0.9375rem] font-semibold leading-[1.4] text-ink">
            Cookies
          </h2>
          <p className="max-w-[70ch] text-[0.875rem] leading-[1.55] text-graphite">
            Essential cookies keep the site working. With your OK we also use cookieless analytics.{' '}
            <Link href="/privacy#cookies" className="link">
              Cookie policy
            </Link>
          </p>

          {custom && (
            <fieldset className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6">
              <legend className="sr-only">Choose cookie categories</legend>
              <label className="flex min-h-11 items-center gap-2.5 text-[0.875rem] text-muted">
                <input type="checkbox" checked disabled className="h-[1.125rem] w-[1.125rem] accent-indigo" />
                Essential (always on)
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[0.875rem] text-ink">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-[1.125rem] w-[1.125rem] cursor-pointer accent-indigo"
                />
                Analytics
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[0.875rem] text-ink">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-[1.125rem] w-[1.125rem] cursor-pointer accent-indigo"
                />
                Preferences (remember offers and form details)
              </label>
            </fieldset>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-2">
          {custom ? (
            <button type="button" onClick={() => save({ analytics, marketing })} className={inkButtonClasses('primary')}>
              Save choices
            </button>
          ) : (
            <>
              <button type="button" onClick={() => save({ analytics: true, marketing: true })} className={inkButtonClasses('primary')}>
                Accept all
              </button>
              <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={inkButtonClasses('secondary')}>
                Essential only
              </button>
              {/* border-0 and a currentColor underline: the platform's dark rules colour every button's border and
                  text, and this one stays a plain underlined word there, as it was. */}
              <button
                type="button"
                onClick={() => setCustom(true)}
                className={inkButtonClasses('quiet', 'md', 'border-0 px-2 [text-decoration-color:color-mix(in_srgb,currentColor_45%,transparent)]')}
              >
                Choose
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

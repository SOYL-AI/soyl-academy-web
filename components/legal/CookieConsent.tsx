'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
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

  return (
    <section
      aria-labelledby={headingId}
      data-forced={forced || undefined}
      className="cookie-bar fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-white/95 backdrop-blur-md shadow-[0_-12px_32px_-20px_rgba(20,20,20,0.35)]"
    >
      <div className="page flex flex-col gap-3 py-3 md:flex-row md:items-center md:gap-8 md:py-4">
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="t-label text-ink">
            Cookies
          </h2>
          <p className="t-small max-w-[70ch] text-muted">
            Essential cookies keep the site working. With your OK we also use cookieless analytics.{' '}
            <Link href="/privacy#cookies" className="link">
              Cookie policy
            </Link>
          </p>

          {custom && (
            <fieldset className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
              <legend className="sr-only">Choose cookie categories</legend>
              <label className="t-small flex items-center gap-2 text-muted">
                <input type="checkbox" checked disabled className="h-4 w-4 accent-cobalt" />
                Essential (always on)
              </label>
              <label className="t-small flex cursor-pointer items-center gap-2 text-ink">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 accent-cobalt"
                />
                Analytics
              </label>
              <label className="t-small flex cursor-pointer items-center gap-2 text-ink">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-4 w-4 accent-cobalt"
                />
                Preferences (remember offers and form details)
              </label>
            </fieldset>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {custom ? (
            <button
              type="button"
              onClick={() => save({ analytics, marketing })}
              className="press h-10 rounded-full bg-ink px-5 text-[15px] font-semibold text-white hover:bg-cobalt"
            >
              Save choices
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => save({ analytics: true, marketing: true })}
                className="press h-10 rounded-full bg-ink px-5 text-[15px] font-semibold text-white hover:bg-cobalt"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => save({ analytics: false, marketing: false })}
                className="press h-10 rounded-full border border-ink/25 px-5 text-[15px] font-semibold text-ink hover:border-ink hover:bg-ink hover:text-white"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => setCustom(true)}
                className="h-10 px-2 text-[15px] font-medium text-ink underline underline-offset-4 hover:text-cobalt"
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

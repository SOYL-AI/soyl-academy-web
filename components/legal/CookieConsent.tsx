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
  const [advertising, setAdvertising] = useState(false);
  const headingId = useId();

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      // Reading localStorage can only happen after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
      setAdvertising(saved.advertising);
    }

    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setAdvertising(current?.advertising ?? false);
      setCustom(true);
      setForced(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const save = (prefs: { analytics: boolean; marketing: boolean; advertising: boolean }) => {
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
      className="cookie-bar fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-white/95 backdrop-blur-md shadow-[0_-12px_32px_-20px_rgba(20,20,20,0.35)] [html:not([data-platform-theme])_&]:border-t-2 [html:not([data-platform-theme])_&]:border-ink [html:not([data-platform-theme])_&]:bg-[#fffdf8]/95"
    >
      <div className="page flex flex-col gap-3 py-3 md:flex-row md:items-center md:gap-8 md:py-4">
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="t-label text-ink [html:not([data-platform-theme])_&]:font-[family-name:var(--font-hand)] [html:not([data-platform-theme])_&]:text-[1.2rem] [html:not([data-platform-theme])_&]:font-normal [html:not([data-platform-theme])_&]:text-vermilion-ink">
            Cookies
          </h2>
          <p className="t-small max-w-[70ch] text-muted [html:not([data-platform-theme])_&]:text-graphite">
            Essential cookies keep the site working. With your OK we also use cookieless analytics and Google Ads cookies that measure our ads.{' '}
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
              <label className="t-small flex cursor-pointer items-center gap-2 text-ink">
                <input
                  type="checkbox"
                  checked={advertising}
                  onChange={(e) => setAdvertising(e.target.checked)}
                  className="h-4 w-4 accent-cobalt"
                />
                Advertising (measure our Google ads)
              </label>
            </fieldset>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {custom ? (
            <button
              type="button"
              onClick={() => save({ analytics, marketing, advertising })}
              className="press h-11 rounded-full bg-ink px-5 text-[15px] font-semibold text-white hover:bg-cobalt [html:not([data-platform-theme])_&]:rounded-[255px_22px_225px_22px/22px_225px_22px_255px] [html:not([data-platform-theme])_&]:text-sheet [html:not([data-platform-theme])_&]:hover:bg-ultramarine"
            >
              Save choices
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => save({ analytics: true, marketing: true, advertising: true })}
                className="press h-11 rounded-full bg-ink px-5 text-[15px] font-semibold text-white hover:bg-cobalt [html:not([data-platform-theme])_&]:rounded-[255px_22px_225px_22px/22px_225px_22px_255px] [html:not([data-platform-theme])_&]:text-sheet [html:not([data-platform-theme])_&]:hover:bg-ultramarine"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => save({ analytics: false, marketing: false, advertising: false })}
                className="press h-11 rounded-full border border-ink/25 px-5 text-[15px] font-semibold text-ink hover:border-ink hover:bg-ink hover:text-white [html:not([data-platform-theme])_&]:rounded-[255px_22px_225px_22px/22px_225px_22px_255px] [html:not([data-platform-theme])_&]:border-2 [html:not([data-platform-theme])_&]:border-ink [html:not([data-platform-theme])_&]:hover:bg-ochre-soft [html:not([data-platform-theme])_&]:hover:text-ink"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => setCustom(true)}
                className="h-11 px-2 text-[15px] font-medium text-ink underline underline-offset-4 hover:text-cobalt [html:not([data-platform-theme])_&]:decoration-pencil [html:not([data-platform-theme])_&]:decoration-2"
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

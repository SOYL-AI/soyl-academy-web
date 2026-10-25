'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FutureBuildersBannerProps {
  /** Stable key per cohort, so dismissing one cohort doesn't hide the next. */
  cohortKey: string;
  message: string;
}

/**
 * Slim, dismissible homepage mention of Future Builders. Rendered only while
 * registration is open or closing soon (decided on the server from
 * content/future-builders.ts). Never a modal; never covers content.
 */
export function FutureBuildersBanner({ cohortKey, message }: FutureBuildersBannerProps) {
  const storageKey = `soyl_fb_banner_dismissed:${cohortKey}`;
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (window.localStorage.getItem(storageKey) === '1') setDismissed(true);
    } catch {
      // Storage blocked: show the banner.
    }
  }, [storageKey]);

  if (dismissed) return null;

  return (
    <aside aria-label="Future Builders" className="border-b border-rule bg-white">
      <div className="page flex min-h-11 items-center justify-between gap-4 py-2">
        <p className="t-small text-ink">
          <span className="font-semibold">Future Builders</span>
          <span aria-hidden="true" className="mx-2 text-muted">·</span>
          {message}{' '}
          <Link href="/future-builders" className="link font-medium">
            See the programme
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            try {
              window.localStorage.setItem(storageKey, '1');
            } catch {
              // ignore
            }
          }}
          className="press -mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted hover:text-ink"
        >
          <span className="sr-only">Dismiss</span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

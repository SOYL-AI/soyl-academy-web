'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './DiwaliOfferTab.module.css';

interface DiwaliOfferTabProps {
  /** Stable key per offer, so dismissing this offer doesn't hide a later one. */
  offerKey: string;
  /** e.g. "₹3,299" */
  price: string;
  /** e.g. "₹11,999" (read to screen readers as the list price). */
  listPrice: string;
  /** Exclusive end, ISO: the tab hides itself at that moment even on a cached page. */
  endsAt: string;
  /** Dev preview only (COHORT_PREVIEW_DATE): server preview "now" minus real now. */
  offsetMs?: number;
}

/**
 * Homepage "Diwali offer" side tab: a small fixed link to /future-builders, never a pop-up or modal.
 * Phones: a compact pill bottom-right; from md, a vertical tab on the right edge. Rendered by the
 * server only while the offer runs; dismissible (remembered in localStorage when storage works).
 * Shown after mount, so a dismissed tab never flashes and server HTML never depends on storage.
 */
export function DiwaliOfferTab({ offerKey, price, listPrice, endsAt, offsetMs = 0 }: DiwaliOfferTabProps) {
  const storageKey = `soyl_fb_offer_tab_dismissed:${offerKey}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(storageKey) === '1';
    } catch {
      // Storage blocked: show the tab.
    }
    const left = new Date(endsAt).getTime() - (Date.now() + offsetMs);
    if (dismissed || left <= 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only state once after hydration
    setVisible(true);
    // Hide at the end of the offer if the page stays open (setTimeout caps at ~24.8 days).
    const timer = left < 2 ** 31 - 1 ? window.setTimeout(() => setVisible(false), left) : undefined;
    return () => window.clearTimeout(timer);
  }, [storageKey, endsAt, offsetMs]);

  if (!visible) return null;

  return (
    <aside aria-label="Diwali offer" className={styles.tab}>
      <Link href="/future-builders" className={styles.link}>
        <svg className={styles.diya} width="18" height="18" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <path d="M32 6c4.6 6.4 7 10.8 7 14.6A7 7 0 0 1 32 27.5a7 7 0 0 1-7-6.9C25 16.8 27.4 12.4 32 6z" fill="#ffb627" />
          <path d="M32 13.5c2.3 3.3 3.4 5.6 3.4 7.4a3.4 3.4 0 0 1-6.8 0c0-1.8 1.1-4.1 3.4-7.4z" fill="#fff3c4" />
          <path d="M6 33c8 2.6 17 3.6 26 3.6S50 35.6 58 33c-1.8 10.6-12.4 18-26 18S7.8 43.6 6 33z" fill="#d9692f" />
        </svg>
        <span>
          Diwali offer · <span className={styles.price}>{price}</span>
          <span className="sr-only"> instead of {listPrice} for the Future Builders summer camp</span>
        </span>
      </Link>
      <button
        type="button"
        className={styles.close}
        onClick={() => {
          setVisible(false);
          try {
            window.localStorage.setItem(storageKey, '1');
          } catch {
            // ignore
          }
        }}
      >
        <span className="sr-only">Dismiss the Diwali offer</span>
        <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
}

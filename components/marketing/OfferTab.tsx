'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './OfferTab.module.css';

interface OfferTabProps {
  /** Stable key per offer, so dismissing this offer doesn't hide a later one. */
  offerKey: string;
  /** e.g. "Children’s Day offer". */
  label: string;
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
 * Homepage offer side tab (e.g. "Children’s Day offer"): a small fixed link to /future-builders, never a pop-up or modal.
 * Phones: a compact pill bottom-right; from md, a vertical tab on the right edge. Rendered by the
 * server only while the offer runs; dismissible (remembered in localStorage when storage works).
 * Shown after mount, so a dismissed tab never flashes and server HTML never depends on storage.
 */
export function OfferTab({ offerKey, label, price, listPrice, endsAt, offsetMs = 0 }: OfferTabProps) {
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
    <aside aria-label={label} className={styles.tab}>
      <Link href="/future-builders" className={styles.link}>
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <path d="M30 4 50 22 30 42 10 22z" fill="#ffc94a" />
          <path d="M30 4 50 22 30 22zM30 22 30 42 10 22z" fill="#f28c28" />
          <path d="M30 42c-2 6 4 8 2 13s-6 5-4 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span>
          {label} · <span className={styles.price}>{price}</span>
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
        <span className="sr-only">Dismiss the {label}</span>
        <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
}

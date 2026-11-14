'use client';

import { useEffect, useState } from 'react';
import { REGISTRATION_STORAGE_KEY } from '@/lib/future-builders/registration';

interface Details {
  receiptNumber: string | null;
  email: string | null;
  student: string | null;
}

const RECEIPT_RE = /^[A-Z0-9][A-Z0-9-]{2,39}$/i;

/**
 * Receipt number (from the URL, set by the form after server verification) and the email address
 * the confirmation went to (same-tab sessionStorage only, so it never appears in a URL). Without
 * either, the page still reads correctly: "check your inbox".
 */
export function useRegistrationDetails(): Details | null {
  const [details, setDetails] = useState<Details | null>(null);
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('receipt');
    let stored: Partial<Details> = {};
    try {
      stored = JSON.parse(window.sessionStorage.getItem(REGISTRATION_STORAGE_KEY) ?? '{}') as Partial<Details>;
    } catch {
      // Storage blocked or empty.
    }
    const receipt = fromUrl && RECEIPT_RE.test(fromUrl) ? fromUrl : typeof stored.receiptNumber === 'string' && RECEIPT_RE.test(stored.receiptNumber) ? stored.receiptNumber : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only state once after hydration
    setDetails({
      receiptNumber: receipt,
      email: typeof stored.email === 'string' && stored.email.includes('@') ? stored.email : null,
      student: typeof stored.student === 'string' && stored.student ? stored.student : null,
    });
  }, []);
  return details;
}

export function RegistrationHeadline() {
  const d = useRegistrationDetails();
  return <>{d?.student ? `${d.student} is registered.` : 'Your child is registered.'}</>;
}

/** The receipt and where the confirmation email went. */
export function RegistrationReceipt() {
  const d = useRegistrationDetails();
  return (
    <dl className="t-small mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-ink/15 pt-5">
      <dt className="text-graphite">Receipt number</dt>
      <dd className="t-num text-right font-mono text-[15px] text-ink" aria-live="polite">
        {d?.receiptNumber ?? 'In your confirmation email'}
      </dd>
      <dt className="text-graphite">Confirmation email</dt>
      <dd className="text-right text-ink" aria-live="polite">
        {d?.email ? <>Sent to <span className="break-all font-semibold">{d.email}</span></> : 'Sent to the email address you gave'}
      </dd>
    </dl>
  );
}

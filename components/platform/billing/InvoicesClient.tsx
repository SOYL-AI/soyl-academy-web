'use client';

/**
 * /me/invoices (ADR-024): the student's invoices and credit notes from GET /v1/me/invoices, newest first,
 * each with a PDF download (GET /v1/me/invoices/:id/pdf through the same-origin proxy; owner only).
 * States: loading, guest (log in, back here), error (retry), empty. Mobile first (360 px), light and dark
 * through the platform tokens.
 */
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { API_BROWSER_BASE, type Invoice } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import s from './invoices.module.css';

/** Same-origin download URL of one document's PDF. */
export function invoicePdfUrl(id: string): string {
  return `${API_BROWSER_BASE}/v1/me/invoices/${encodeURIComponent(id)}/pdf`;
}

/** "SOYL/2026-27/000001" → "SOYL-2026-27-000001.pdf" (matches the API's file name). */
export function invoiceFileName(number: string): string {
  return `${number.replace(/[^A-Za-z0-9-]+/g, '-')}.pdf`;
}

/** "2026-10-28" → "28 Oct 2026" (dates are IST calendar dates already). */
export function formatIssueDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function InvoicesClient() {
  const { state, openLogin } = useSession();
  const [list, setList] = useState<Invoice[] | null>(null);
  const [error, setError] = useState(false);
  const member = state.status === 'member';

  const load = useCallback(async () => {
    try {
      const r = await api.get('/v1/me/invoices');
      setList(r.invoices);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load the student's own documents once signed in
    if (member) void load();
  }, [member, load]);

  if (state.status === 'loading') return <Skeleton lines={4} />;
  if (state.status === 'guest') {
    return (
      <EmptyState
        title="Log in to see your invoices"
        icon="lock"
        headingLevel="h2"
        action={<Button onClick={() => openLogin({ returnTo: '/me/invoices', reason: 'Log in to see and download your invoices.' })}>Log in</Button>}
      >
        Invoices for plans you bought are kept in your account.
      </EmptyState>
    );
  }
  if (error) {
    return (
      <EmptyState title="We could not load your invoices" icon="alert" headingLevel="h2" action={<Button variant="secondary" onClick={() => void load()}>Try again</Button>}>
        Check your connection and try again.
      </EmptyState>
    );
  }
  if (!list) {
    return (
      <div aria-busy="true" aria-label="Loading invoices">
        <Skeleton variant="block" height={88} />
      </div>
    );
  }
  if (!list.length) {
    return (
      <EmptyState title="No invoices yet" icon="book" headingLevel="h2" action={<Link href="/plans">See plans</Link>}>
        When you buy a plan, its invoice appears here and is emailed to the person who paid. Lessons, practice and tests are always free.
      </EmptyState>
    );
  }

  return (
    <div className={s.page} data-testid="invoices">
      <ul className={s.list}>
        {list.map((inv) => (
          <li key={inv.id} className={s.item} data-type={inv.type}>
            <div className={s.main}>
              <p className={s.title}>
                {inv.type === 'credit_note' ? <Badge tone="accent">Refund</Badge> : null} {inv.title} <span className={s.number}>{inv.number}</span>
              </p>
              <p className={s.meta}>
                {formatIssueDate(inv.issueDate)} · {inv.planName}
                {inv.originalNumber ? ` · against ${inv.originalNumber}` : ''}
              </p>
            </div>
            <p className={s.amount}>{inv.type === 'credit_note' ? `− ${inv.totalLabel}` : inv.totalLabel}</p>
            <a className={s.download} href={invoicePdfUrl(inv.id)} download={invoiceFileName(inv.number)} data-testid="invoice-download">
              Download PDF<span className={s.sr}> of {inv.title.toLowerCase()} {inv.number}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={s.note}>Invoices are kept for 8 years, as the law requires, even if you delete your account.</p>
    </div>
  );
}

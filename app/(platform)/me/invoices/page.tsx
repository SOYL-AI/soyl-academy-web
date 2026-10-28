/**
 * /me/invoices — the student's invoices and credit notes with PDF downloads (ADR-024). Private: not indexed,
 * rendered per request so the proxy's CSP nonce applies (WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { InvoicesClient } from '@/components/platform/billing/InvoicesClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Your invoices', robots: { index: false, follow: false } };

export default async function InvoicesPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={[
          { name: 'Profile', path: '/me' },
          { name: 'Invoices', path: '/me/invoices' },
        ]}
        title="Invoices"
        lead="Invoices for the plans you bought, and credit notes for refunds."
        structuredData={false}
      />
      <InvoicesClient />
    </div>
  );
}

/**
 * /me/consent/parent — the page behind the link in the parent's approval email (D-039, ADR-022). No sign-in:
 * the signed token is in the URL fragment (#t=…), so it never reaches a server log, and the page acts only
 * when the parent presses the button (email link scanners that open links cannot withdraw anything, and
 * nothing here can switch a feature on). Rendered per request (nonce CSP, WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ParentWithdrawClient } from '@/components/platform/consent/ParentWithdrawClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Parent approval', robots: { index: false, follow: false }, referrer: 'no-referrer' };

export default async function ParentConsentPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Parent approval', path: '/me/consent/parent' }]} title="Parent approval" lead="Withdraw or decline approval for your child’s extra features on SOYL Academy." structuredData={false} />
      <ParentWithdrawClient />
    </div>
  );
}

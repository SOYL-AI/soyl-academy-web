/**
 * /me/consent — parent approval for paid plans (D-052, ADR-030; flow D-039, ADR-022): age group, then for
 * under-18s the parent's emailed approval code. Reachable from /plans and /me. `?next=/ask` (passed through safeReturnTo) offers a way back.
 * Rendered per request so the proxy's CSP nonce applies (WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ConsentPageClient } from '@/components/platform/consent/ConsentPageClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Parent approval', robots: { index: false, follow: false } };

export default async function ConsentPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={[
          { name: 'Profile', path: '/me' },
          { name: 'Parent approval', path: '/me/consent' },
        ]}
        title="Parent approval for paid plans"
        lead="Only needed to buy a paid plan. Lessons, practice, tests, AI help with free daily credits and leaderboards are open without it."
        structuredData={false}
      />
      <ConsentPageClient />
    </div>
  );
}

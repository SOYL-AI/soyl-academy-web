/**
 * /me/consent — turn on the consent-gated features (D-039, ADR-022): age group, then for under-18s the
 * parent's emailed approval code. `?next=/ask` (passed through safeReturnTo) offers a way back.
 * Rendered per request so the proxy's CSP nonce applies (WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ConsentPageClient } from '@/components/platform/consent/ConsentPageClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Turn on extra features', robots: { index: false, follow: false } };

export default async function ConsentPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={[
          { name: 'Profile', path: '/me' },
          { name: 'Extra features', path: '/me/consent' },
        ]}
        title="Turn on extra features"
        lead="AI help, photo doubts, leaderboards and rewards need approval. Lessons, practice and tests are always free and open."
        structuredData={false}
      />
      <ConsentPageClient />
    </div>
  );
}

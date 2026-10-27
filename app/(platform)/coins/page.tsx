/**
 * /coins — SOYL Coins: balance, today against the daily cap, check-in, how to earn, milestones and history
 * (D-037, ADR-020). Member data, so rendered per request with the nonce CSP (WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { CoinsClient } from '@/components/platform/coins/CoinsClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'SOYL Coins', robots: { index: false, follow: true } };

export default async function CoinsPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'SOYL Coins', path: '/coins' }]} title="SOYL Coins" lead="Earned by learning, never bought. Spend them in the SOYL Store." structuredData={false} />
      <CoinsClient />
    </div>
  );
}

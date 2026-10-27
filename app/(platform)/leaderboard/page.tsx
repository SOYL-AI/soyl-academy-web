/**
 * /leaderboard — weekly leagues and All-India mock ranks (ARCHITECTURE §3.1: login, client). Consent-gated
 * (D-014). Rendered per request (nonce CSP, WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { LeaderboardClient } from '@/components/platform/leaderboard/LeaderboardClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Leaderboards', robots: { index: false, follow: true } };

export default async function LeaderboardPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Leaderboards', path: '/leaderboard' }]} title="Leaderboards" lead="Weekly leagues and All-India mock ranks. First name and last initial only." structuredData={false} />
      <LeaderboardClient />
    </div>
  );
}

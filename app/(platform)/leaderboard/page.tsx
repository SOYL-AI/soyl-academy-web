/**
 * /leaderboard — weekly leagues and All-India mock ranks (ARCHITECTURE §3.1: login, client; D-052: no approval
 * needed). Rendered per request (nonce CSP, WEB-3). The page title ("Weekly league", with the tier crest once the
 * league loads) is the client's GreetingHeader (design language v3, ADR-032).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { LeaderboardClient } from '@/components/platform/leaderboard/LeaderboardClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Leaderboards', robots: { index: false, follow: true } };

export default async function LeaderboardPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <LeaderboardClient />
    </div>
  );
}

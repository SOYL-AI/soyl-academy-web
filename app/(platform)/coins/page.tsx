/**
 * /coins — SOYL Coins: balance, today against the daily cap, check-in, how to earn, milestones and history
 * (D-037, ADR-021; design language v3, ADR-032: a plain greeting header, then the yellow balance card). Member
 * data, so rendered per request with the nonce CSP (WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { GreetingHeader } from '@/components/platform/ui/kit/Greeting';
import { CoinsClient } from '@/components/platform/coins/CoinsClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'SOYL Coins', robots: { index: false, follow: true } };

export default async function CoinsPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <GreetingHeader title="SOYL Coins" subtitle="Earned by learning, never bought. They will redeem exclusive rewards in the SOYL Store." />
      <CoinsClient />
    </div>
  );
}

/**
 * /store — the SOYL Store: digital rewards and exclusive merch, redeemed with earned SOYL Coins (D-037,
 * ADR-021). Guests may look; members redeem and add a delivery address (personal data), so the page is
 * rendered per request with the nonce CSP (WEB-3). The page's h1 is in the store hero.
 */
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { StoreClient } from '@/components/platform/coins/StoreClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata = platformMetadata({
  title: 'SOYL Store: earned, never sold',
  description: 'Profile rewards and SOYL merch you cannot buy: every item is paid for with SOYL Coins earned by learning.',
  path: '/store',
  index: false,
});

export default async function StorePage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <StoreClient />
    </div>
  );
}

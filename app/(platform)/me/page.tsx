/**
 * /me — profile, board/class, consent status, sign-in methods, logout, account deletion
 * (ARCHITECTURE §3.1: login, client). Rendered per request so the proxy's CSP nonce applies (WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { MeClient } from '@/components/platform/me/MeClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Your profile', robots: { index: false, follow: false } };

export default async function MePage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <MeClient />
    </div>
  );
}

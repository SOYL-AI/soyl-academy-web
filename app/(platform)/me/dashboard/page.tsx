/**
 * /me/dashboard — the student's learning-progress dashboard (D-043). Private data is fetched in the browser
 * (ADR-010); the page is rendered per request so the proxy's CSP nonce applies (WEB-3, like /me). It lives under
 * /me so the literal proxy matcher and the login return-to list already cover it; /dashboard redirects here.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { DashboardClient } from '@/components/platform/dashboard/DashboardClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Your dashboard', robots: { index: false, follow: false } };

export default async function DashboardPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <DashboardClient />
    </div>
  );
}

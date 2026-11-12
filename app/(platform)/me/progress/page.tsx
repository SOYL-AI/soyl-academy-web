/**
 * /me/progress — the student's analytics (design language v3 §10 "Progress", ADR-032): mastery, test scores,
 * practice by difficulty, focus areas and activity, moved off Home. Members only (guests get the /me-style log-in
 * prompt); private data is fetched in the browser (ADR-010). Rendered per request so the proxy's CSP nonce applies
 * (WEB-3, like /me and /me/dashboard). Under /me, so the literal proxy matcher (`/me/:path*`), the platform
 * prefixes (`isPlatformPath`) and the login return-to list (`RETURN_TO_PREFIXES`) already cover it.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { ProgressClient } from '@/components/platform/progress/ProgressClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Your progress', robots: { index: false, follow: false } };

export default async function ProgressPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <ProgressClient />
    </div>
  );
}

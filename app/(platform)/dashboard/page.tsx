/**
 * /dashboard — short link to the student dashboard at /me/dashboard (D-043). With the platform flag off it is
 * the marketing 404 (GEN-4). Rendered per request and redirected before anything streams, so it answers with a
 * plain 307 and no body (proxy.ts does not match this path; a redirect needs no page security headers).
 */
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { DASHBOARD_PATH } from '@/components/platform/lib/return-to';

export default async function DashboardShortLink() {
  requirePlatform();
  await connection();
  redirect(DASHBOARD_PATH);
}

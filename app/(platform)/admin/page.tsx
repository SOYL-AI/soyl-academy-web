/**
 * /admin (ARCHITECTURE §3.1: role admin/reviewer, client). Minimal M2 shell: staff MFA (AUTH-11: enrol or
 * verify a TOTP code) and the "Report a mistake" queue. Rendered per request so the proxy's CSP nonce
 * applies (WEB-3); never indexed.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { AdminApp } from '@/components/platform/admin/AdminApp';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Staff', robots: { index: false, follow: false } };

export default async function AdminPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <AdminApp />
    </div>
  );
}

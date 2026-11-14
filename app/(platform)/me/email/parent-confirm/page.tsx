/**
 * /me/email/parent-confirm — the page behind the link in the parent-address confirmation email (D-055). No sign-in:
 * the signed token is in the URL fragment (#t=…), so it never reaches a server log. Opening the page confirms nothing;
 * only the parent's button press (a POST) turns reminders to the address on. Rendered per request (nonce CSP, WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ParentConfirmClient } from '@/components/platform/me/EmailPreferencesLinks';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Confirm reminder emails', robots: { index: false, follow: false }, referrer: 'no-referrer' };

export default async function ParentConfirmPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Confirm reminder emails', path: '/me/email/parent-confirm' }]} title="Reminder emails for a parent" lead="Confirm that you would like occasional reminders about a student on SOYL Academy." structuredData={false} />
      <ParentConfirmClient />
    </div>
  );
}

/**
 * /me/email/unsubscribe — the page behind "Unsubscribe" in reminder emails (D-055). No sign-in: the signed token is in
 * the URL fragment (#t=…), so it never reaches a server log, and nothing changes until the person presses the button
 * (link scanners that open links cannot unsubscribe anyone). Rendered per request (nonce CSP, WEB-3).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { EmailUnsubscribeClient } from '@/components/platform/me/EmailPreferencesLinks';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Unsubscribe from reminders', robots: { index: false, follow: false }, referrer: 'no-referrer' };

export default async function EmailUnsubscribePage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Unsubscribe', path: '/me/email/unsubscribe' }]} title="Reminder emails" lead="Stop SOYL Academy reminder emails to your address." structuredData={false} />
      <EmailUnsubscribeClient />
    </div>
  );
}

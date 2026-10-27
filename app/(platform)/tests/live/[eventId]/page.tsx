/**
 * /tests/live/[eventId] — All-India mock event (ARCHITECTURE §3.1: login, client). Rendered per request
 * (nonce CSP, WEB-3).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { LiveEventClient } from '@/components/platform/tests/LiveEventClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'All-India live mock', robots: { index: false, follow: true } };

export default async function LiveEventPage({ params }: { params: Promise<{ eventId: string }> }) {
  requirePlatform();
  await connection();
  const { eventId } = await params;
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(eventId)) notFound();
  return (
    <div className={shell.page}>
      <LiveEventClient eventId={eventId} />
    </div>
  );
}

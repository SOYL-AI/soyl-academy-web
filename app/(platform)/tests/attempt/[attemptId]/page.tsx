/**
 * /tests/attempt/[attemptId] — the test player (ARCHITECTURE §3.1: login, client). Rendered per request so
 * the nonce CSP applies (WEB-3). The attempt id only selects the attempt; the API checks ownership.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { AttemptPlayer } from '@/components/platform/tests/AttemptPlayer';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Test', robots: { index: false, follow: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AttemptPage({ params }: { params: Promise<{ attemptId: string }> }) {
  requirePlatform();
  await connection();
  const { attemptId } = await params;
  if (!UUID.test(attemptId)) notFound();
  return (
    <div className={shell.page}>
      <AttemptPlayer attemptId={attemptId.toLowerCase()} />
    </div>
  );
}

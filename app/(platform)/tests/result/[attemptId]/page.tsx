/**
 * /tests/result/[attemptId] — results, analysis, self-evaluation and AI evaluation (ARCHITECTURE §3.1:
 * login, client). Rendered per request so the nonce CSP applies (WEB-3).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { ResultView } from '@/components/platform/tests/ResultView';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Test result', robots: { index: false, follow: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  requirePlatform();
  await connection();
  const { attemptId } = await params;
  if (!UUID.test(attemptId)) notFound();
  return (
    <div className={shell.page}>
      <ResultView attemptId={attemptId.toLowerCase()} />
    </div>
  );
}

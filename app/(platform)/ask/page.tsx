/**
 * /ask — AI tutor and photo doubts (ARCHITECTURE §3.1: login for AI, client). Rendered per request so the
 * nonce CSP applies (WEB-3); connect-src also allows the upload origin for photo doubts (ADR-018).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { AskClient } from '@/components/platform/ai/AskClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Ask the AI tutor', robots: { index: false, follow: true } };

export default async function AskPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Ask AI', path: '/ask' }]} title="Ask the AI tutor" lead="A hint first, then the full solution. Ask in English or Hinglish." structuredData={false} />
      <AskClient />
    </div>
  );
}

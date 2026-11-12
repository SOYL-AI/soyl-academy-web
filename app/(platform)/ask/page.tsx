/**
 * /ask — AI tutor and photo doubts (ARCHITECTURE §3.1: login for AI, client). Rendered per request so the
 * nonce CSP applies (WEB-3); connect-src also allows the upload origin for photo doubts (ADR-018).
 * Design language v3 (ADR-032 §10 "Ask AI"): a plain greeting header; the credits chip is in the top bar here.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { GreetingHeader } from '@/components/platform/ui/kit/Greeting';
import { AskClient } from '@/components/platform/ai/AskClient';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/ai/ai.module.css';

export const metadata: Metadata = { title: 'Ask the AI tutor', robots: { index: false, follow: true } };

export default async function AskPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <div className={s.askPage}>
        <GreetingHeader title="Ask the AI tutor" subtitle="A hint first, then the full solution. Ask in English or Hinglish." />
        <AskClient />
      </div>
    </div>
  );
}

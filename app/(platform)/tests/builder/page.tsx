/**
 * /tests/builder — custom test builder (ARCHITECTURE §3.1: login, client). Rendered per request so the
 * nonce CSP applies (WEB-3); its upload origin is allowed for "Papers like my school's" (ADR-018).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { BuilderClient } from '@/components/platform/tests/BuilderClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = { title: 'Build your own test', robots: { index: false, follow: true } };

export default async function BuilderPage() {
  requirePlatform();
  await connection();
  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={[
          { name: 'Tests', path: '/tests' },
          { name: 'Build a test', path: '/tests/builder' },
        ]}
        title="Build your own test"
        lead="Pick chapters and question types. We make a paper from our question bank. Free."
        structuredData={false}
      />
      <BuilderClient />
    </div>
  );
}

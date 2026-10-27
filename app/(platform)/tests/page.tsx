/**
 * /tests — test series catalogue (ARCHITECTURE §3.1: public list, login to start; client). The shell is
 * static; subjects and the student's attempts load in the browser.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { TestsHome } from '@/components/platform/tests/TestsHome';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = platformMetadata({
  title: 'Free test series: chapter tests, mock papers and live All-India mocks',
  description: 'Free board-pattern chapter tests, unit tests, full mock papers and live All-India mocks for CBSE and CISCE, with results and analysis.',
  path: '/tests',
});

export default async function TestsPage() {
  requirePlatform();
  await connection(); // S6-L03: rendered per request so the proxy's CSP nonce applies
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Tests', path: '/tests' }]} title="Tests" lead="Chapter tests, unit tests, full mock papers and live All-India mocks. Free, with results and analysis." />
      <TestsHome />
    </div>
  );
}

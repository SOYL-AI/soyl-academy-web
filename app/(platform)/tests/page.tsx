/**
 * /tests — test series catalogue (ARCHITECTURE §3.1: public list, login to start; client; design language v3,
 * ADR-032 §10 "Tests hub"). Rendered per request (the proxy's CSP nonce, S6-L03), so the date chip is today's
 * date in India time; subjects, live mocks and the student's attempts load in the browser.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { DateChip, GreetingHeader } from '@/components/platform/ui/kit/Greeting';
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
      <GreetingHeader
        title="Tests"
        subtitle="Practise like the real paper: chapter tests, full mocks and live All-India mocks. Free, with results and analysis."
        aside={<DateChip />}
        actions={
          <>
            <ButtonLink href="/tests/builder" icon="plus">
              Build your own test
            </ButtonLink>
            <ButtonLink href="/leaderboard" icon="trophy" variant="soft">
              Leaderboards
            </ButtonLink>
          </>
        }
        data-testid="tests-header"
      />
      <TestsHome />
    </div>
  );
}

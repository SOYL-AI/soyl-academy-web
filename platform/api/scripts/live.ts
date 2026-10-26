/**
 * Live All-India mock administration (ADR-012). From platform/:
 *
 *   npm run live -w @soyl/api -- schedule [--subject cbse-10-science ...] [--year 2026-27]
 *   npm run live -w @soyl/api -- list
 *
 * `schedule` creates (or updates in place) the Wave 1 sittings of LIVE_MOCK_SITTINGS
 * (shared/config/tests.ts: 13 Dec 2026 and 17 Jan 2027, 10:00 IST) for every Wave 1 subject whose
 * live paper can be assembled from its live_reserved pool; it prints generation requests for the
 * rest. Local-only flags (refused when APP_ENV=prod):
 *   --allow-practice-pool   fill papers from practice items (dev data only; AC-11)
 *   --fallback unit-test    use this paper type when the board blueprint cannot be filled
 *   --dev-in <minutes>      add a "Dev live mock" sitting starting in N minutes (repeats allowed)
 *
 * Target database: DATABASE_URL, else the persistent local embedded server (port 54320), as for the
 * db and content CLIs.
 */
import { DbAccess } from '@soyl/content-pipeline/stores';
import { loadCatalog } from '@soyl/content-pipeline/catalog';
import { defaultPaths } from '@soyl/content-pipeline/paths';
import { liveEvents, tests } from '@soyl/db';
import { asc, eq } from 'drizzle-orm';
import type { PaperType } from '@soyl/shared/content/blueprint';
import { configuredSittings, scheduleLiveMocks, type Sitting } from '../src/domain/tests/live-admin';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : undefined;
}
const flag = (name: string) => process.argv.includes(`--${name}`);
const many = (name: string) => process.argv.flatMap((a, i) => (a === `--${name}` && process.argv[i + 1] ? [process.argv[i + 1]!] : []));

async function main() {
  const command = process.argv[2];
  if (command !== 'schedule' && command !== 'list') {
    console.error('usage: npm run live -w @soyl/api -- schedule [--subject KEY ...] [--allow-practice-pool] [--fallback unit-test] [--dev-in MIN] | list');
    process.exit(2);
  }
  const production = process.env.APP_ENV === 'prod' || process.env.NODE_ENV === 'production';
  const year = arg('year') ?? process.env.ACADEMIC_YEAR ?? '2026-27';
  const access = new DbAccess(process.env, (l) => console.log(l));
  try {
    const { db } = await access.get();
    if (command === 'list') {
      const rows = await db.select({ key: liveEvents.key, title: liveEvents.title, startsAt: liveEvents.startsAt, endsAt: liveEvents.endsAt, status: liveEvents.status, test: tests.key }).from(liveEvents).innerJoin(tests, eq(tests.id, liveEvents.testId)).where(eq(liveEvents.academicYear, year)).orderBy(asc(liveEvents.startsAt));
      for (const r of rows) console.log(`${r.key.padEnd(28)} ${r.status.padEnd(18)} ${r.startsAt.toISOString()} → ${r.endsAt.toISOString()}  ${r.test}  ${r.title}`);
      console.log(`${rows.length} live event(s)`);
      return;
    }
    const sittings: Sitting[] = configuredSittings();
    const devIn = arg('dev-in');
    if (devIn) sittings.push({ sitting: 'dev', title: 'Dev live mock', starts: new Date(Math.ceil((Date.now() + Number(devIn) * 60_000) / 60_000) * 60_000) });
    const results = await scheduleLiveMocks(db, {
      year,
      catalog: loadCatalog(defaultPaths(process.env).catalogDir),
      subjects: many('subject').length ? many('subject') : undefined,
      sittings,
      allowPracticePool: flag('allow-practice-pool'),
      allowRepeats: !!devIn && !production,
      fallbackPaper: arg('fallback') as PaperType | undefined,
      production,
    });
    for (const r of results) {
      console.log(`${r.subject.padEnd(36)} sitting ${String(r.sitting).padEnd(3)} ${r.status.padEnd(9)} ${r.eventKey ?? ''} ${r.startsAt ?? ''} ${r.detail}`);
      for (const q of r.requests.slice(0, 3)) console.log(`    request ${q.missing} × ${q.type}${q.marks ? `/${q.marks}m` : ''}: ${q.reason}`);
    }
    const scheduled = results.filter((r) => r.status !== 'skipped').length;
    console.log(`live: ${scheduled} event(s) scheduled or current, ${results.length - scheduled} skipped (generation requests above)`);
  } finally {
    await access.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

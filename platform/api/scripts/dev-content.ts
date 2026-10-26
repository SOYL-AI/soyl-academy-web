/**
 * Local development only: publish every hand-authored chapter (platform/content/authored) and
 * exemplar (platform/content-templates/exemplars) into the embedded dev database at start-up, so the
 * web can be built against real lessons, notes, flashcards, practice and tests.
 *
 * Uses the content pipeline's own publish stage (`content -- publish --authored`, pipeline-engineer M2):
 * every item becomes `published`, releases are written to a local blob directory and ingested with
 * ingestChapterRelease (DB-6 split, release membership, activation), chapter tests with
 * ingestTestDefinition. Skip with DEV_CONTENT=off. Never part of the server bundle (scripts/ only).
 *
 * Then (backend-api M3) the test series the bank allows: the pipeline's own `assemble --series` for CBSE
 * 10 Science and Maths (unit tests, full mocks, May track; the rest become generation requests), and
 * the live mocks: the two Wave 1 sittings plus a "Dev live mock" starting DEV_LIVE_IN minutes after
 * start-up (default 10; `off` skips it), filled from the practice pool with the unit-test blueprint as a
 * fallback (local only: production live papers come from the live_reserved pool, AC-11).
 */
import os from 'node:os';
import path from 'node:path';
import { createDb } from '@soyl/db';
import { scheduleLiveMocks, configuredSittings, type Sitting } from '../src/domain/tests/live-admin';

export async function publishDevContent(databaseUrl: string, log: (line: string) => void = (l) => console.log(`[dev-content] ${l}`)): Promise<void> {
  if (process.env.DEV_CONTENT === 'off') {
    log('DEV_CONTENT=off: no content published');
    return;
  }
  const started = Date.now();
  const { db, pool, close } = createDb(databaseUrl);
  try {
    const [{ openPipeline }, { DbAccess }, { publishCommand }, { LocalBlobStore }, { PostgresStateStore }] = await Promise.all([
      import('@soyl/content-pipeline/pipeline'),
      import('@soyl/content-pipeline/stores'),
      import('@soyl/content-pipeline/commands/publish'),
      import('@soyl/content-pipeline/blob'),
      import('@soyl/content-pipeline/state-pg'),
    ]);
    const quiet: string[] = [];
    const p = openPipeline(
      {},
      {
        dbAccess: DbAccess.fromPool(db, pool, databaseUrl),
        blob: new LocalBlobStore(path.join(os.tmpdir(), 'soyl-dev-content-blob')),
        store: new PostgresStateStore(pool),
        env: { ...process.env, APP_ENV: 'local' },
        log: (l) => quiet.push(l),
      },
    );
    const { results, exitCode } = await publishCommand(p, {}, { authored: true });
    const ok = results.filter((r) => r.status === 'published' || r.status === 'unchanged');
    log(`${ok.length} chapter(s) published (${ok.reduce((n, r) => n + r.questions, 0)} questions, ${ok.reduce((n, r) => n + r.tests, 0)} tests) in ${Math.round((Date.now() - started) / 1000)} s`);
    for (const r of results.filter((x) => x.status === 'refused' || x.status === 'failed')) log(`  ${r.unit}: ${r.status} — ${r.message}`);
    if (exitCode !== 0) log('some chapters were not published (see above); the server starts anyway');

    // Test series the bank allows (pipeline stage 7), then the live mocks.
    const { assembleCommand } = await import('@soyl/content-pipeline/commands/assemble');
    const a = openPipeline(
      {},
      {
        paths: { outDir: path.join(os.tmpdir(), 'soyl-dev-assemble') },
        dbAccess: DbAccess.fromPool(db, pool, databaseUrl),
        store: new PostgresStateStore(pool),
        env: { ...process.env, APP_ENV: 'local' },
        log: (l) => quiet.push(l),
      },
    );
    for (const subject of ['science', 'mathematics']) {
      const { results: assembled } = await assembleCommand(a, { board: 'cbse', class: 10, subject }, { series: true, source: 'db' });
      for (const r of assembled) log(`assembled ${r.subject}: ${r.tests.length} test(s) (${r.tests.map((t) => t.test.id.replace(/^t_[a-z0-9]+_/, '')).join(', ') || 'none'}); ${r.requests.length} generation request(s)`);
    }
    const sittings: Sitting[] = configuredSittings();
    const devIn = process.env.DEV_LIVE_IN ?? '10';
    if (devIn !== 'off') sittings.push({ sitting: 'dev', title: 'Dev live mock', starts: new Date(Math.ceil((Date.now() + Number(devIn) * 60_000) / 60_000) * 60_000) });
    const live = await scheduleLiveMocks(db, { year: process.env.ACADEMIC_YEAR ?? '2026-27', catalog: a.catalog, subjects: ['cbse-10-science', 'cbse-10-mathematics'], sittings, allowPracticePool: true, allowRepeats: true, fallbackPaper: 'unit-test' });
    for (const r of live) log(`live ${r.subject} sitting ${r.sitting}: ${r.status}${r.eventKey ? ` ${r.eventKey} at ${r.startsAt}` : ''} (${r.detail})`);
  } finally {
    await close();
  }
}

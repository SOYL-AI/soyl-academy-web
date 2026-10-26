/**
 * Local development only: publish every hand-authored chapter (platform/content/authored) and
 * exemplar (platform/content-templates/exemplars) into the embedded dev database at start-up, so the
 * web can be built against real lessons, notes, flashcards, practice and tests.
 *
 * Uses the content pipeline's own publish stage (`content -- publish --authored`, pipeline-engineer M2):
 * every item becomes `published`, releases are written to a local blob directory and ingested with
 * ingestChapterRelease (DB-6 split, release membership, activation), chapter tests with
 * ingestTestDefinition. Skip with DEV_CONTENT=off. Never part of the server bundle (scripts/ only).
 */
import os from 'node:os';
import path from 'node:path';
import { createDb } from '@soyl/db';

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
  } finally {
    await close();
  }
}

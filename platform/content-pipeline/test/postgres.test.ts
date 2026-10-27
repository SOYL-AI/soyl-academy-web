/**
 * Stages 5–9 against real PostgreSQL (embedded locally, the CI service container in CI):
 * PostgresStateStore + row-locked shared budget, publish (blob + ingest + activate, idempotent,
 * version bumps), rollback, assembled test ingestion, coverage from published content, and the mock
 * end-to-end generate → lint → verify → originality → tts → publish --allow-mock.
 */
import fs from 'node:fs';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { BudgetExceededError } from '@soyl/ai-core';
import { configValues, contentReleases, questions as questionsTable, testSeries, tests as testsTable } from '@soyl/db/schema';
import { seedCatalog } from '@soyl/db';
import { createTestDb, stopTestServer, type TestDb } from '@soyl/db/testing';
import { assembleCommand, assembleSubject, bankFromDb, bankFromFiles, ingestTests, toFrozenSeries } from '../src/commands/assemble';
import { writeFrozenSeries } from '../src/assemble/frozen';
import { coverageCommand } from '../src/commands/coverage';
import { generateCommand } from '../src/commands/generate';
import { lintCommand } from '../src/commands/lint';
import { originalityCommand } from '../src/commands/originality';
import { publishCommand, rollbackCommand } from '../src/commands/publish';
import { ttsCommand } from '../src/commands/tts';
import { verifyCommand } from '../src/commands/verify';
import { planSubjectTests } from '../src/assemble/series';
import { openPipeline } from '../src/pipeline';
import { startRun, finishRun } from '../src/pipeline';
import { PgBudget, PostgresStateStore } from '../src/state-pg';
import { DbAccess } from '../src/stores';
import { defaultPaths } from '../src/paths';
import { sharedCatalog, tempDir } from './helpers';

let t: TestDb;

/** A catalog copy with only the subjects these tests use, so the seed takes seconds. */
function smallCatalog(): string {
  const src = defaultPaths().catalogDir;
  const dst = path.join(tempDir('soyl-catalog-'), 'catalog');
  for (const rel of ['cbse/subjects.yaml', 'cbse/10/science', 'cbse/10/mathematics', 'cbse/12/physics', 'cbse/blueprints/10', 'cbse/blueprints/12'])
    fs.cpSync(path.join(src, rel), path.join(dst, rel), { recursive: true });
  return dst;
}

function pgPipeline(extraEnv: Record<string, string> = {}, paths: Record<string, string> = {}) {
  const dir = tempDir();
  const logs: string[] = [];
  const p = openPipeline(
    { provider: 'mock' },
    {
      paths: { stateDir: path.join(dir, 'state'), outDir: path.join(dir, 'out'), ...paths },
      env: { NODE_ENV: 'test', ...extraEnv },
      log: (l) => logs.push(l),
      catalog: sharedCatalog(),
      store: new PostgresStateStore(t.pool),
      dbAccess: DbAccess.fromPool(t.db, t.pool, t.url),
    },
  );
  return { p, logs, dir };
}

beforeAll(async () => {
  t = await createTestDb();
  await seedCatalog(t.db, { dir: smallCatalog() });
}, 300_000);

afterAll(async () => {
  await t?.close();
  await stopTestServer();
}, 120_000);

describe('PostgresStateStore', () => {
  it('round-trips runs, items, unit status and the spend ledger', async () => {
    const { p } = pgPipeline();
    const active = await startRun(p, 'verify', { subject: 'science' });
    const item = { unit: 'cbse-10-science-ch01', stage: 'verify' as const, key: 'q:x', status: 'needs_review' as const, attempts: 3, run_id: active.run.id, template: 't@1', model: 'mock', usage: { input_tokens: 10, cached_input_tokens: 0, output_tokens: 5 }, cost_paise: 1.5, output: 'a.json', error: 'bad', updated_at: new Date().toISOString(), findings: { errors: 1, warnings: 0 } };
    const rec = await p.store.putItem(item);
    expect(rec.status).toBe('needs_review');
    expect(rec.items['q:x']).toMatchObject({ attempts: 3, usage: item.usage, findings: { errors: 1, warnings: 0 }, cost_paise: 1.5 });
    await p.store.putItem({ ...item, key: 'q:y', status: 'done', error: null });
    expect((await p.store.getUnitStage('cbse-10-science-ch01', 'verify'))!.status).toBe('needs_review');
    expect((await p.store.listUnitStages({ stage: 'verify', unitPrefix: 'cbse-10-science' })).length).toBe(1);
    await p.store.recordSpend({ at: new Date().toISOString(), run_id: active.run.id, provider: 'mock', model: 'mock', tier: 'verify', unit: item.unit, stage: 'verify', item: 'q:x', usage: item.usage, cost_paise: 2.25, batch: false, simulated: true });
    expect(await p.store.spentPaise({ simulated: true, runId: active.run.id })).toBe(2.25);
    active.counts = { done: 1, needs_review: 1 };
    const run = await finishRun(p, active);
    expect(run.status).toBe('partial');
    expect((await p.store.getRun(run.id))!.counts).toEqual({ done: 1, needs_review: 1 });
  });

  it('shares one cap across parallel runs with row-locked reservations', async () => {
    const { p } = pgPipeline();
    const caps = { run: 1_000_000, total: 1000 };
    const runs = await Promise.all([startRun(p, 'generate', {}), startRun(p, 'generate', {})]);
    const budgets = runs.map((r) => new PgBudget(t.pool, r.run.id, caps, true));
    const attempts = await Promise.allSettled(Array.from({ length: 8 }, (_, i) => budgets[i % 2]!.reserve(300)));
    expect(attempts.filter((a) => a.status === 'fulfilled')).toHaveLength(3);
    expect(attempts.filter((a) => a.status === 'rejected').every((a) => (a as PromiseRejectedResult).reason instanceof BudgetExceededError)).toBe(true);
    for (const r of runs) await finishRun(p, r); // releases reservations of finished runs
  });

  it('reads the real-money cap from the content_budget view', async () => {
    const { p } = pgPipeline();
    await t.db.insert(configValues).values({ key: 'CONTENT_BUDGET_INR', value: 5 }).onConflictDoUpdate({ target: configValues.key, set: { value: 5 } });
    const run = await startRun(p, 'generate', {});
    const real = new PgBudget(t.pool, run.run.id, { run: 1e9, total: 1e9 }, false);
    await expect(real.reserve(600)).rejects.toBeInstanceOf(BudgetExceededError); // ₹5 = 500 paise
    const ok = await real.reserve(400);
    await real.release(ok);
    await finishRun(p, run);
    await t.db.delete(configValues).where(eq(configValues.key, 'CONTENT_BUDGET_INR'));
  });
});

describe('publish, rollback, tests and coverage', () => {
  it('publishes hand-authored chapters and exemplars, idempotently', async () => {
    const { p, logs } = pgPipeline();
    const first = await publishCommand(p, { board: 'cbse', class: 10, subject: 'science', chapter: 1 }, { authored: true });
    expect(first.exitCode).toBe(0);
    expect(first.results[0]).toMatchObject({ unit: 'cbse-10-science-ch01', status: 'published', version: 1, tests: 2 });
    const [rel] = await t.db.select().from(contentReleases).where(eq(contentReleases.unit, 'cbse-10-science-ch01'));
    expect(rel).toMatchObject({ status: 'active', blobKey: 'content/releases/cbse-10-science-ch01/1.json' });
    expect(await p.blob.exists('content/releases/cbse-10-science-ch01/1.json')).toBe(true);
    const qs = await t.db.select({ status: questionsTable.status }).from(questionsTable).where(eq(questionsTable.unit, 'cbse-10-science-ch01'));
    expect(qs.length).toBe(77);
    expect(qs.every((q) => q.status === 'published')).toBe(true);
    const again = await publishCommand(p, { board: 'cbse', class: 10, subject: 'science', chapter: 1 }, { authored: true });
    expect(again.results[0]!.status).toBe('unchanged');
    expect(logs.join('\n')).toMatch(/unchanged/);
  }, 180_000);

  it('bumps the versions of changed items, keeps the rest, and rolls back', async () => {
    const authored = tempDir('soyl-authored-');
    const src = path.join(defaultPaths().catalogDir, '..', 'content', 'authored', 'science', 'cbse-10-science-ch02');
    const unitDir = path.join(authored, 'science', 'cbse-10-science-ch02');
    fs.cpSync(src, unitDir, { recursive: true });
    const { p } = pgPipeline({}, { authoredDir: authored });
    const scope = { board: 'cbse', class: 10, subject: 'science', chapter: 2 };
    expect((await publishCommand(p, scope, { authored: true })).results[0]).toMatchObject({ status: 'published', version: 1 });
    const release = JSON.parse(fs.readFileSync(path.join(unitDir, 'release.json'), 'utf8'));
    const edited = release.questions[0].id;
    release.questions[0].solution_md += ' (Reviewed.)';
    fs.writeFileSync(path.join(unitDir, 'release.json'), JSON.stringify(release));
    expect((await publishCommand(p, scope, { authored: true })).results[0]).toMatchObject({ status: 'published', version: 2 });
    const rows = await t.db.select({ key: questionsTable.key, version: questionsTable.version, current: questionsTable.isCurrent }).from(questionsTable).where(eq(questionsTable.key, edited));
    expect(rows.map((r) => [r.version, r.current]).sort()).toEqual([[1, false], [2, true]]);
    const untouched = await t.db.select({ version: questionsTable.version }).from(questionsTable).where(eq(questionsTable.key, release.questions[1].id));
    expect(untouched.map((r) => r.version)).toEqual([1]);
    expect((await rollbackCommand(p, 'cbse-10-science-ch02', 1)).exitCode).toBe(0);
    const active = await t.db.select({ version: contentReleases.version }).from(contentReleases).where(and(eq(contentReleases.unit, 'cbse-10-science-ch02'), eq(contentReleases.status, 'active')));
    expect(active).toEqual([{ version: 1 }]);
    expect((await rollbackCommand(p, 'cbse-10-science-ch02', 9)).exitCode).toBe(1);
  }, 180_000);

  it('ingests assembled tests from the published bank; unchanged tests stay, changed ones get a new version', async () => {
    const { p } = pgPipeline();
    const science = p.catalog.subjectsById.get('cbse-10-science')!;
    const bank = await bankFromDb(p, science, '2026-27');
    expect(bank.items.length).toBeGreaterThanOrEqual(77);
    expect(bank.chapterTests.get('cbse-10-science-ch01')).toEqual(new Set(['chapter-test-short', 'chapter-test-long']));
    const plan = planSubjectTests(p.catalog, science, { series: false, academicYear: '2026-27', chapters: [1] });
    const a = assembleSubject(plan, { ...bank, chapterTests: new Map() });
    const list = a.tests.map(({ test }) => ({ test: { ...test, id: `${test.id}_auto` }, series: null }));
    expect(await ingestTests(p, science.id, '2026-27', list)).toEqual({ ingested: 2, unchanged: 0 });
    expect(await ingestTests(p, science.id, '2026-27', list)).toEqual({ ingested: 0, unchanged: 2 });
    const changed = [{ ...list[0]!, test: { ...list[0]!.test, sections: list[0]!.test.sections.slice().reverse() } }];
    expect(await ingestTests(p, science.id, '2026-27', changed)).toEqual({ ingested: 1, unchanged: 0 });
    const versions = await t.db.select({ version: testsTable.version, status: testsTable.status }).from(testsTable).where(eq(testsTable.key, list[0]!.test.id));
    expect(versions.map((v) => [v.version, v.status]).sort()).toEqual([[1, 'retired'], [2, 'published']]);
  }, 180_000);

  it('counts published content for coverage', async () => {
    const { p } = pgPipeline();
    const r = await coverageCommand(p, { board: 'cbse', class: 10, subject: 'science' }, { source: 'db' });
    const s = r.report.subjects[0]!;
    expect(s.have.deck).toBeGreaterThanOrEqual(2);
    expect(s.have.chapter_tests).toBeGreaterThanOrEqual(4);
    expect(r.report.source).toMatch(/Postgres/);
  }, 120_000);
});

describe('frozen test series in the release step (publish --authored, ADR-019)', () => {
  it('publishes a frozen series idempotently: re-runs and new questions never change or duplicate it', async () => {
    const authored = tempDir('soyl-authored-series-');
    const src = path.join(defaultPaths().authoredDir, 'science', 'cbse-10-science-ch02');
    const unitDir = path.join(authored, 'science', 'cbse-10-science-ch02');
    fs.cpSync(src, unitDir, { recursive: true });
    const { p } = pgPipeline({}, { authoredDir: authored });
    const science = p.catalog.subjectsById.get('cbse-10-science')!;
    // A two-chapter unit test (ch01 exemplar + ch02) frozen from the files bank.
    const plan = planSubjectTests(p.catalog, science, { series: true, academicYear: '2026-27' });
    const unit1 = plan.papers.find((x) => x.spec.id === 't_cbse10sci_unit_1')!;
    const chapters = ['cbse-10-science-ch01', 'cbse-10-science-ch02'];
    const bank = bankFromFiles(p, science);
    const built = assembleSubject({ ...plan, papers: [{ ...unit1, spec: { ...unit1.spec, chapters } }] }, { ...bank, items: bank.items.filter((q) => chapters.includes(q.unit)) });
    expect(built.tests).toHaveLength(1);
    writeFrozenSeries(p.paths, toFrozenSeries(built, '2026-27', 'test'));
    const scope = { board: 'cbse', class: 10, subject: 'science' };
    const seriesRows = () => t.db.select({ id: testSeries.id }).from(testSeries).where(eq(testSeries.key, 'ts_cbse10sci_unit_tests'));
    const testRows = () => t.db.select({ version: testsTable.version, status: testsTable.status, definition: testsTable.definition }).from(testsTable).where(eq(testsTable.key, 't_cbse10sci_unit_1'));

    const first = await publishCommand(p, scope, { authored: true });
    expect(first.exitCode).toBe(0);
    expect(first.results.find((r) => r.unit === 'series:cbse-10-science')).toMatchObject({ status: 'published', tests: 1 });
    expect(await seriesRows()).toHaveLength(1);
    const [v1] = await testRows();
    expect(v1).toMatchObject({ version: 1, status: 'published' });

    // Re-running the release: nothing new.
    const again = await publishCommand(p, scope, { authored: true });
    expect(again.results.find((r) => r.unit === 'series:cbse-10-science')).toMatchObject({ status: 'unchanged' });
    expect(await seriesRows()).toHaveLength(1);
    expect(await testRows()).toHaveLength(1);

    // New questions land in a chapter: the chapter gets a new release, the published paper stays as it is.
    const release = JSON.parse(fs.readFileSync(path.join(unitDir, 'release.json'), 'utf8'));
    const added = { ...release.questions[0], id: 'q_cbse10sci_ch02_901', stem_md: `${release.questions[0].stem_md} (new practice variant for the release test)` };
    release.questions.push(added);
    fs.writeFileSync(path.join(unitDir, 'release.json'), JSON.stringify(release));
    const third = await publishCommand(p, scope, { authored: true });
    expect(third.results.find((r) => r.unit === 'cbse-10-science-ch02')!.status).toBe('published');
    expect(third.results.find((r) => r.unit === 'series:cbse-10-science')).toMatchObject({ status: 'unchanged' });
    const rows = await testRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]!.definition).toEqual(v1!.definition);

    // assemble --series --source db reuses the frozen paper instead of re-assembling it.
    const a = await assembleCommand(p, scope, { series: true, source: 'db' });
    expect(a.results[0]!.tests.find((x) => x.test.id === 't_cbse10sci_unit_1')!.test.sections).toEqual((v1!.definition as { sections: unknown }).sections);
    expect(await testRows()).toHaveLength(1);

    // A frozen paper that references an unpublished question is refused (exit 1), never published partially.
    const broken = toFrozenSeries(built, '2026-27', 'test');
    broken.tests[0]!.test.sections[0]!.items[0]!.question_id = 'q_cbse10sci_ch02_999';
    writeFrozenSeries(p.paths, broken);
    const refused = await publishCommand(p, scope, { authored: true });
    expect(refused.exitCode).toBe(1);
    expect(refused.results.find((r) => r.unit === 'series:cbse-10-science')).toMatchObject({ status: 'refused' });
    expect(await testRows()).toHaveLength(1);
  }, 300_000);
});

describe('mock end to end for a chapter with no hand-written content', () => {
  it('generate → lint → verify → originality → tts → publish --allow-mock, and mock never counts', async () => {
    const { p } = pgPipeline();
    const scope = { board: 'cbse', class: 12, subject: 'physics', chapter: 1 };
    expect((await generateCommand(p, scope)).exitCode).toBe(0);
    expect((await lintCommand(p, scope)).exitCode).toBe(0);
    expect((await verifyCommand(p, scope)).exitCode).toBe(0);
    expect((await originalityCommand(p, scope)).exitCode).toBe(0);
    expect((await ttsCommand(p, scope)).exitCode).toBe(0);
    const refused = await publishCommand(p, scope);
    expect(refused.results[0]).toMatchObject({ status: 'refused' });
    expect(refused.results[0]!.message).toMatch(/--allow-mock/);
    const prod = pgPipeline({ NODE_ENV: 'production' }, { outDir: p.paths.outDir });
    expect((await publishCommand(prod.p, scope, { allowMock: true })).exitCode).toBe(1);
    const ok = await publishCommand(p, scope, { allowMock: true });
    expect(ok.results[0]).toMatchObject({ status: 'published', version: 1 });
    const [rel] = await t.db.select().from(contentReleases).where(eq(contentReleases.unit, 'cbse-12-physics-ch01'));
    expect((rel!.checks as Record<string, string>).mock).toBeTruthy();
    const cov = await coverageCommand(p, { board: 'cbse', class: 12, subject: 'physics' }, { source: 'db' });
    expect(cov.report.subjects[0]!.have.deck).toBe(0);
    expect(cov.report.subjects[0]!.mock_units).toBe(1);
    const stages = await p.store.listUnitStages({ unitPrefix: 'cbse-12-physics-ch01' });
    expect(new Set(stages.map((s) => s.stage))).toEqual(new Set(['outline', 'generate', 'lint', 'verify', 'originality', 'tts', 'publish']));
  }, 300_000);
});

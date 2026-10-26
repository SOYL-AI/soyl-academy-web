/**
 * Stage 7 `assemble`: builds TestDefinitions from blueprints (engine.ts) for the subjects in scope.
 *
 *   npm run content -- assemble --board cbse --class 10 --subject science [--series] [--chapter N]
 *                                [--source db|files] [--allow-mock] [--strict]
 *
 * Without --series: chapter tests (short + long) for every chapter that has none yet. With --series:
 * also unit tests, full mocks (per paper variant), the CBSE 10 May track or term papers (series.ts).
 *
 * Bank: `--source db` (default) = published, current question versions in Postgres (what students
 * can see); `--source files` = hand-authored chapters, exemplars and verified pipeline output in out/.
 * With the db source, assembled tests are ingested (ingestTestDefinition, status published, with
 * test_series rows); a test whose content changed gets a new version, an unchanged one is left alone.
 *
 * When the bank lacks items, the paper is not built and a generation request is recorded:
 * out/assemble/<subject>/generation-requests.json, the state store (stage "assemble", item
 * `request:<test id>`, status pending) and the console. Nothing fails silently.
 */
import path from 'node:path';
import { and, desc, eq, inArray, sql } from 'drizzle-orm';
import { blueprints as blueprintsTable, questions as questionsTable, subjects as subjectsTable, testSeries, tests as testsTable } from '@soyl/db/schema';
import { ingestTestDefinition } from '@soyl/db/content-ingest';
import type { Subject, TestDefinition } from '@soyl/shared/content/index';
import { subjectsInScope, type Scope } from '../catalog';
import { table, writeJson } from '../io';
import type { Pipeline } from '../pipeline';
import { loadAuthoredUnits, loadOutUnit, outUnits } from '../sources';
import { assemblePaper, type BankItem, type GenerationRequest } from '../assemble/engine';
import { planSubjectTests, type PlannedPaper } from '../assemble/series';

export const PUBLISHABLE_STATUSES = new Set(['auto_verified', 'published', 'reviewed']);

export interface Bank {
  items: BankItem[];
  /** unit → paper types that already have a published chapter test. */
  chapterTests: Map<string, Set<string>>;
  source: 'db' | 'files';
}

export async function bankFromDb(p: Pipeline, subject: Subject, academicYear: string): Promise<Bank> {
  const { db } = await p.dbAccess.get();
  const rows = await db
    .select({ key: questionsTable.key, version: questionsTable.version, unit: questionsTable.unit, type: questionsTable.type, marks: questionsTable.marks, difficulty: questionsTable.difficulty, competency: questionsTable.competency, topicKeys: questionsTable.topicKeys })
    .from(questionsTable)
    .where(and(eq(questionsTable.academicYear, academicYear), eq(questionsTable.isCurrent, true), inArray(questionsTable.status, ['published', 'reviewed']), eq(questionsTable.pool, 'practice'), sql`${questionsTable.unit} LIKE ${`${subject.id}-ch%`}`));
  const items: BankItem[] = rows.map((r) => ({ id: r.key, version: r.version, unit: r.unit, type: r.type as BankItem['type'], marks: Number(r.marks), difficulty: r.difficulty, competency: r.competency as BankItem['competency'], topic_ids: r.topicKeys }));
  const tests = await db
    .select({ paperType: testsTable.paperType, chapterKeys: testsTable.chapterKeys })
    .from(testsTable)
    .innerJoin(subjectsTable, eq(testsTable.subjectId, subjectsTable.id))
    .where(and(eq(subjectsTable.key, subject.id), eq(testsTable.academicYear, academicYear), eq(testsTable.status, 'published'), inArray(testsTable.paperType, ['chapter-test-short', 'chapter-test-long'])));
  const chapterTests = new Map<string, Set<string>>();
  for (const t of tests) for (const u of t.chapterKeys) chapterTests.set(u, new Set([...(chapterTests.get(u) ?? []), t.paperType]));
  return { items, chapterTests, source: 'db' };
}

export function bankFromFiles(p: Pipeline, subject: Subject, opts: { allowMock?: boolean } = {}): Bank {
  const items: BankItem[] = [];
  const chapterTests = new Map<string, Set<string>>();
  const prefix = `${subject.id}-ch`;
  const authored = loadAuthoredUnits(p).filter((u) => u.unit.startsWith(prefix) && !u.problems.length);
  const generated = outUnits(p)
    .filter((u) => u.startsWith(prefix) && !authored.some((a) => a.unit === u))
    .flatMap((u) => loadOutUnit(p, u) ?? [])
    .filter((u) => !u.problems.length && (opts.allowMock || !u.mock));
  for (const u of [...authored, ...generated]) {
    for (const q of u.questions) {
      if (u.origin === 'pipeline' && !PUBLISHABLE_STATUSES.has(q.status)) continue;
      items.push({ id: q.id, version: q.version, unit: u.unit, type: q.type, marks: q.marks, difficulty: q.difficulty, competency: q.competency, topic_ids: q.topic_ids });
    }
    for (const t of u.tests) if (t.kind === 'chapter') chapterTests.set(u.unit, new Set([...(chapterTests.get(u.unit) ?? []), t.paper_type]));
  }
  return { items, chapterTests, source: 'files' };
}

export interface AssembledSubject {
  subject: string;
  tests: { test: TestDefinition; planned: PlannedPaper }[];
  requests: GenerationRequest[];
  notes: string[];
}

/** Plans and assembles every paper for one subject from a bank (pure apart from logging). */
export function assembleSubject(plan: ReturnType<typeof planSubjectTests>, bank: Bank): AssembledSubject {
  const used = new Map<string, Set<string>>();
  const out: AssembledSubject = { subject: plan.subject.id, tests: [], requests: [], notes: [...plan.notes] };
  for (const planned of plan.papers) {
    const exclude = used.get(planned.series) ?? new Set<string>();
    const r = assemblePaper({ ...planned.spec, exclude }, bank.items);
    if (r.ok) {
      r.used.forEach((id) => exclude.add(id));
      used.set(planned.series, exclude);
      out.tests.push({ test: r.test, planned });
    } else out.requests.push(...r.requests);
  }
  return out;
}

async function ingestAssembled(p: Pipeline, a: AssembledSubject, academicYear: string): Promise<{ ingested: number; unchanged: number }> {
  const { db } = await p.dbAccess.get();
  let ingested = 0;
  let unchanged = 0;
  const [subjectRow] = await db.select({ id: subjectsTable.id }).from(subjectsTable).where(and(eq(subjectsTable.key, a.subject), eq(subjectsTable.academicYear, academicYear)));
  if (!subjectRow) throw new Error(`subject ${a.subject} (${academicYear}) is not in the database; run "npm run db -w @soyl/db -- seed catalog"`);
  const seriesIds = new Map<string, string>();
  for (const { test, planned } of a.tests) {
    let seriesId: string | null = null;
    if (planned.seriesTitle) {
      const key = `ts_${test.id.replace(/^t_/, '').replace(/_(unit|mock|may|halfyearly|annual|term)(_\d+)?$/, '')}_${planned.series.replace(/[^a-z0-9]+/g, '_')}`;
      seriesId = seriesIds.get(key) ?? null;
      if (!seriesId) {
        const [row] = await db
          .insert(testSeries)
          .values({ key, academicYear, subjectId: subjectRow.id, title: planned.seriesTitle, track: planned.track, status: 'published' })
          .onConflictDoUpdate({ target: [testSeries.key, testSeries.academicYear], set: { title: planned.seriesTitle, track: planned.track, status: 'published' } })
          .returning({ id: testSeries.id });
        seriesId = row!.id;
        seriesIds.set(key, seriesId);
      }
    }
    const [latest] = await db.select({ version: testsTable.version, definition: testsTable.definition }).from(testsTable).where(and(eq(testsTable.key, test.id), eq(testsTable.academicYear, academicYear))).orderBy(desc(testsTable.version)).limit(1);
    const same = latest && JSON.stringify((latest.definition as TestDefinition).sections) === JSON.stringify(test.sections);
    if (same) {
      unchanged++;
      continue;
    }
    const def = { ...test, version: (latest?.version ?? 0) + 1 };
    const [bp] = await db.select({ id: blueprintsTable.id }).from(blueprintsTable).where(and(eq(blueprintsTable.key, test.blueprint_id ?? ''), eq(blueprintsTable.academicYear, academicYear)));
    if (latest) await db.update(testsTable).set({ status: 'retired' }).where(and(eq(testsTable.key, test.id), eq(testsTable.academicYear, academicYear), eq(testsTable.status, 'published')));
    await ingestTestDefinition(db, def, { academicYear, status: 'published', seriesId, seriesPosition: planned.seriesTitle ? planned.position : null, blueprintId: bp?.id ?? null });
    ingested++;
  }
  return { ingested, unchanged };
}

export interface AssembleOptions {
  series?: boolean;
  source?: 'db' | 'files';
  allowMock?: boolean;
  strict?: boolean;
  verbose?: boolean;
}

export async function assembleCommand(p: Pipeline, scope: Scope, opts: AssembleOptions = {}): Promise<{ results: AssembledSubject[]; exitCode: number }> {
  if (!scope.subject && !scope.class) {
    p.log('assemble needs a scope: --board, --class and --subject (or at least --class)');
    return { results: [], exitCode: 1 };
  }
  const subjects = subjectsInScope(p.catalog, scope).filter((s) => p.catalog.syllabi.has(s.id));
  if (!subjects.length) {
    p.log('no subjects with a syllabus in scope');
    return { results: [], exitCode: 1 };
  }
  const source = opts.source ?? 'db';
  const results: AssembledSubject[] = [];
  for (const subject of subjects) {
    const year = p.catalog.syllabi.get(subject.id)!.academic_year;
    const bank = source === 'db' ? await bankFromDb(p, subject, year) : bankFromFiles(p, subject, { allowMock: opts.allowMock });
    const plan = planSubjectTests(p.catalog, subject, { series: !!opts.series, academicYear: year, chapters: scope.chapter ? [scope.chapter] : undefined, existingChapterTests: bank.chapterTests });
    const a = assembleSubject(plan, bank);
    const dir = path.join(p.paths.outDir, 'assemble', subject.id);
    for (const { test } of a.tests) writeJson(path.join(dir, 'tests', `${test.id}.json`), test);
    writeJson(path.join(dir, 'generation-requests.json'), { subject: subject.id, at: new Date().toISOString(), bank: { source: bank.source, questions: bank.items.length }, requests: a.requests });
    const now = new Date().toISOString();
    for (const r of a.requests)
      await p.store.putItem({ unit: r.chapters.length === 1 ? r.chapters[0]! : `${subject.id}-ch00`, stage: 'assemble', key: `request:${r.paper_id}:${r.section ?? 'scope'}:${r.type}:${r.marks ?? ''}`, status: 'pending', attempts: 0, run_id: null, template: null, model: null, usage: null, cost_paise: 0, output: path.relative(p.paths.outDir, path.join(dir, 'generation-requests.json')).split(path.sep).join('/'), error: `${r.missing} × ${r.type}${r.marks ? ` (${r.marks} marks)` : ''}: ${r.reason}`, updated_at: now });
    let ingest = '';
    if (source === 'db' && a.tests.length) {
      const n = await ingestAssembled(p, a, year);
      ingest = `; Postgres: ${n.ingested} ingested, ${n.unchanged} unchanged`;
    }
    p.log(`${subject.id}: bank ${bank.items.length} question(s) from ${bank.source}; ${a.tests.length}/${plan.papers.length} paper(s) assembled${ingest}; ${a.requests.length} generation request(s)`);
    if (a.tests.length)
      p.log(table(['test', 'paper', 'marks', 'items', 'chapters'], a.tests.map(({ test }) => [test.id, test.paper_type, test.total_marks, test.sections.reduce((n, s) => n + s.items.length, 0), test.chapter_ids.length]), ['l', 'l', 'r', 'r', 'r']));
    const shown = opts.verbose ? a.requests : a.requests.slice(0, 12);
    for (const r of shown) p.log(`  request ${r.paper_id} ${r.section ? `§${r.section} ` : ''}${r.missing} × ${r.type}${r.marks ? `/${r.marks}m` : ''}${r.chapters.length <= 3 ? ` [${r.chapters.join(', ')}]` : ` [${r.chapters.length} chapters]`}: ${r.reason}`);
    if (a.requests.length > shown.length) p.log(`  … ${a.requests.length - shown.length} more in ${path.relative(process.cwd(), path.join(dir, 'generation-requests.json'))}`);
    for (const n of a.notes.slice(0, opts.verbose ? undefined : 6)) p.log(`  note: ${n}`);
    results.push(a);
  }
  const requests = results.reduce((n, r) => n + r.requests.length, 0);
  return { results, exitCode: opts.strict && requests ? 2 : 0 };
}

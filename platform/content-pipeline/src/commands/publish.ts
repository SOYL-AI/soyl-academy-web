/**
 * Stage 9 `publish` (ARCHITECTURE §7.3–7.4, §8.1): builds a ChapterRelease per unit, writes it to
 * the BlobStore at content/releases/<unit>/<version>.json, ingests it into Postgres
 * (ingestChapterRelease, which activates it) together with the unit's chapter tests
 * (ingestTestDefinition), and records the result in the state store (stage "publish").
 *
 *   generated units (out/)   need a clean lint and a verify report; only auto_verified questions ship
 *                            (needs_review ones stay out); chapter tests are assembled from the release
 *   --authored               platform/content/authored + content-templates/exemplars: every item;
 *                            tests.json is ingested with its question versions remapped
 *
 * Beta posture (§7.3, CONTEXT §4): items go draft/auto_verified → published.
 * Versioning: an item whose content is unchanged keeps its version; a changed item gets version + 1
 * (tests reference question versions, so past attempts never change). A unit whose content equals
 * its active release is skipped ("unchanged"); otherwise the release version is the latest + 1.
 * Mock output (provenance model "mock") is refused unless --allow-mock, and always in production.
 * Rollback: `rollback --unit <id> --to <version>` re-activates an earlier release.
 */
import path from 'node:path';
import { and, desc, eq, isNull, ne } from 'drizzle-orm';
import { activateRelease, ingestChapterRelease, sha256Json } from '@soyl/db/content-ingest';
import { contentReleases, decks as decksTable, flashcardSets, notes as notesTable, questions as questionsTable } from '@soyl/db/schema';
import { ChapterRelease, releaseBlobKey, type Deck, type FlashcardSet, type Notes, type Question, type TestDefinition } from '@soyl/shared/content/index';
import { findChapter, subjectsInScope, unitsInScope, type Scope } from '../catalog';
import { readJsonIf, table } from '../io';
import { unitOutDir } from '../paths';
import type { Pipeline } from '../pipeline';
import { loadOutUnit, type ContentUnit } from '../sources';
import { assemblePaper, type BankItem } from '../assemble/engine';
import { planSubjectTests } from '../assemble/series';
import { ingestTests } from './assemble';
import { applyAudio, audioManifestFile, type AudioManifestFile } from './tts';
import { authoredInScope } from './verify';

export function isProduction(env: Record<string, string | undefined>): boolean {
  return env.NODE_ENV === 'production' || env.APP_ENV === 'prod';
}

export interface PublishResult {
  unit: string;
  status: 'published' | 'unchanged' | 'refused' | 'failed';
  version: number | null;
  questions: number;
  tests: number;
  message: string;
}

type Db = Awaited<ReturnType<Pipeline['dbAccess']['get']>>['db'];

/** Current version and content hash of an item kind, for version bumps. */
async function currentRow(db: Db, kind: 'deck' | 'notes' | 'flashcards' | 'question', unit: string, year: string, key: string | number | null): Promise<{ version: number; hash: string | null } | null> {
  if (kind === 'question') {
    const [r] = await db.select({ version: questionsTable.version, hash: questionsTable.contentHash }).from(questionsTable).where(and(eq(questionsTable.key, String(key)), eq(questionsTable.isCurrent, true)));
    return r ?? null;
  }
  if (kind === 'deck') {
    const partCond = key === null ? isNull(decksTable.part) : eq(decksTable.part, Number(key));
    const [r] = await db.select({ version: decksTable.version, hash: decksTable.contentHash }).from(decksTable).where(and(eq(decksTable.unit, unit), eq(decksTable.academicYear, year), partCond, eq(decksTable.isCurrent, true)));
    return r ?? null;
  }
  const t = kind === 'notes' ? notesTable : flashcardSets;
  const [r] = await db.select({ version: t.version, hash: t.contentHash }).from(t).where(and(eq(t.unit, unit), eq(t.academicYear, year), eq(t.isCurrent, true)));
  return r ?? null;
}

/** Same version when the content is unchanged, else current + 1 (new items start at 1). */
async function versioned<T extends { version: number }>(db: Db, kind: 'deck' | 'notes' | 'flashcards' | 'question', unit: string, year: string, key: string | number | null, item: T): Promise<T> {
  const cur = await currentRow(db, kind, unit, year, key);
  if (!cur) return { ...item, version: 1 };
  const same = { ...item, version: cur.version };
  return sha256Json(same) === cur.hash ? same : { ...item, version: cur.version + 1 };
}

const published = <T extends { status?: string }>(x: T): T => ({ ...x, status: 'published' });

function contentSha(r: { decks: Deck[]; notes: Notes; flashcards: FlashcardSet; questions: Question[] }): string {
  return sha256Json({ decks: r.decks, notes: r.notes, flashcards: r.flashcards, questions: r.questions });
}

async function publishUnit(p: Pipeline, u: ContentUnit, opts: { allowMock: boolean }): Promise<PublishResult> {
  const base = { unit: u.unit, version: null, questions: 0, tests: 0 };
  const refuse = (message: string): PublishResult => ({ ...base, status: 'refused', message });
  if (u.problems.length) return refuse(`content does not parse: ${u.problems.slice(0, 2).join('; ')}`);
  if (u.mock && (!opts.allowMock || isProduction(p.env)))
    return refuse(isProduction(p.env) ? 'mock placeholder content can never be published in production' : 'mock placeholder content: pass --allow-mock to publish it to a non-production database');
  if (!u.notes || !u.flashcards || !u.decks.length) return refuse('decks, notes and flashcards are all required');
  const ref = findChapter(p.catalog, u.unit);
  if (!ref) return refuse('chapter is not in the catalog');
  const year = ref.syllabus.academic_year;

  // Which questions ship.
  let questions = u.questions;
  const checks: Record<string, string> = { source: u.origin };
  if (u.origin === 'pipeline') {
    const lint = readJsonIf<{ errors: number; warnings: number }>(path.join(unitOutDir(p.paths.outDir, u.unit), 'lint.json'));
    if (!lint || lint.errors) return refuse(lint ? `lint has ${lint.errors} error(s)` : 'not linted (run lint)');
    const verify = readJsonIf<{ passed: number; needs_review: string[]; regenerated: string[] }>(path.join(unitOutDir(p.paths.outDir, u.unit), 'verify.json'));
    if (!verify) return refuse('not verified (run verify)');
    const originality = readJsonIf<{ flags: { severity: string; item: string; ref: string }[] }>(path.join(unitOutDir(p.paths.outDir, u.unit), 'originality.json'));
    const blocked = new Set((originality?.flags ?? []).filter((f) => f.severity === 'error' && f.item === 'questions').map((f) => f.ref));
    const otherBlocked = (originality?.flags ?? []).filter((f) => f.severity === 'error' && f.item !== 'questions');
    if (otherBlocked.length) return refuse(`originality errors in ${[...new Set(otherBlocked.map((f) => f.item))].join(', ')}`);
    questions = questions.filter((q) => q.status === 'auto_verified' && !blocked.has(q.id));
    const ids = new Set(questions.map((q) => q.id));
    const missingChecks = u.decks.flatMap(({ deck }) => deck.slides.filter((s) => s.check_question_id && !ids.has(s.check_question_id)).map((s) => s.check_question_id!));
    if (missingChecks.length) return refuse(`check-slide question(s) did not pass verify: ${missingChecks.slice(0, 5).join(', ')}`);
    checks.lint = `${lint.errors} errors, ${lint.warnings} warnings`;
    checks.verify = `${verify.passed} passed, ${verify.regenerated.length} regenerated, ${verify.needs_review.length} need review (excluded)`;
    checks.originality = originality ? `${originality.flags.length} flag(s)` : 'not run';
  }
  if (u.mock) checks.mock = 'true: placeholder content published with --allow-mock (non-production)';

  // Audio: generated decks carry it; authored decks get it from the tts manifest (real audio only, unless --allow-mock).
  let decks = u.decks;
  const manifest = readJsonIf<AudioManifestFile>(audioManifestFile(p, u.unit));
  if (u.origin !== 'pipeline' && manifest && (!manifest.simulated || (opts.allowMock && !isProduction(p.env)))) decks = applyAudio(decks, manifest.decks);
  const simulatedAudio = u.origin === 'pipeline' ? u.mock : !!manifest?.simulated && decks !== u.decks;
  checks.audio = `${decks.reduce((n, d) => n + d.deck.slides.filter((s) => s.audio).length, 0)}/${decks.reduce((n, d) => n + d.deck.slides.length, 0)} slides${simulatedAudio ? ' (mock silence)' : ''}`;

  const { db } = await p.dbAccess.get();
  const vDecks = await Promise.all(decks.map(({ deck }) => versioned(db, 'deck', u.unit, year, deck.part, published(deck))));
  const vNotes = await versioned(db, 'notes', u.unit, year, null, published(u.notes));
  const vCards = await versioned(db, 'flashcards', u.unit, year, null, published(u.flashcards));
  const vQuestions = await Promise.all(questions.map((q) => versioned(db, 'question', u.unit, year, q.id, published(q))));
  const sha = contentSha({ decks: vDecks, notes: vNotes, flashcards: vCards, questions: vQuestions });

  const [active] = await db.select().from(contentReleases).where(and(eq(contentReleases.unit, u.unit), eq(contentReleases.academicYear, year), eq(contentReleases.status, 'active')));
  const [latest] = await db.select({ version: contentReleases.version }).from(contentReleases).where(and(eq(contentReleases.unit, u.unit), eq(contentReleases.academicYear, year))).orderBy(desc(contentReleases.version)).limit(1);
  let version: number;
  let status: PublishResult['status'] = 'published';
  if (active && (active.checks as Record<string, string>).content_sha === sha) {
    version = active.version;
    status = 'unchanged';
  } else {
    version = (latest?.version ?? 0) + 1;
    const release = ChapterRelease.parse({
      unit: u.unit,
      version,
      academic_year: year,
      created_at: new Date().toISOString(),
      decks: vDecks,
      notes: vNotes,
      flashcards: vCards,
      questions: vQuestions,
      build: { run_id: null, checks: { ...checks, content_sha: sha } },
    });
    const bytes = new TextEncoder().encode(`${JSON.stringify(release, null, 2)}\n`);
    const key = releaseBlobKey(u.unit, version);
    const put = await p.blob.put(key, bytes, 'application/json');
    await ingestChapterRelease(db, release, { blobKey: key, sha256: put.sha256 });
  }

  // Chapter tests: authored tests.json (versions remapped) or assembled from the release's own bank.
  const versions = new Map(vQuestions.map((q) => [q.id, q.version]));
  let tests: TestDefinition[] = [];
  const notes: string[] = [];
  if (u.origin !== 'pipeline') {
    tests = u.tests
      .filter((t) => t.sections.every((s) => s.items.every((i) => versions.has(i.question_id))))
      .map((t) => ({ ...t, sections: t.sections.map((s) => ({ ...s, items: s.items.map((i) => ({ ...i, question_version: versions.get(i.question_id)! })) })) }));
    if (tests.length < u.tests.length) notes.push(`${u.tests.length - tests.length} test(s) reference questions not in the release; skipped`);
  } else {
    const bank: BankItem[] = vQuestions.map((q) => ({ id: q.id, version: q.version, unit: u.unit, type: q.type, marks: q.marks, difficulty: q.difficulty, competency: q.competency, topic_ids: q.topic_ids }));
    const plan = planSubjectTests(p.catalog, ref.subject, { series: false, academicYear: year, chapters: [ref.chapter.number] });
    const exclude = new Set<string>();
    for (const planned of plan.papers) {
      const r = assemblePaper({ ...planned.spec, exclude }, bank);
      if (r.ok) {
        tests.push(r.test);
        r.used.forEach((id) => exclude.add(id));
      } else notes.push(`${planned.spec.id}: ${r.requests.map((x) => `${x.missing} × ${x.type}${x.marks ? `/${x.marks}m` : ''}`).join(', ')} missing (generation request)`);
    }
  }
  const t = tests.length ? await ingestTests(p, ref.subject.id, year, tests.map((test) => ({ test, series: null }))) : { ingested: 0, unchanged: 0 };
  await p.store.putItem({ unit: u.unit, stage: 'publish', key: 'release', status: 'done', attempts: 1, run_id: null, template: null, model: u.mock ? 'mock' : null, usage: null, cost_paise: 0, output: releaseBlobKey(u.unit, version), error: null, updated_at: new Date().toISOString() });
  return {
    unit: u.unit,
    status,
    version,
    questions: vQuestions.length,
    tests: tests.length,
    message: [status === 'unchanged' ? 'content equals the active release' : `blob ${releaseBlobKey(u.unit, version)}`, `tests ${t.ingested} new / ${t.unchanged} unchanged`, ...notes].join('; '),
  };
}

export async function publishCommand(p: Pipeline, scope: Scope, opts: { authored?: boolean; allowMock?: boolean } = {}): Promise<{ results: PublishResult[]; exitCode: number }> {
  if (opts.allowMock && isProduction(p.env)) {
    p.log('publish: --allow-mock is refused in production (GEN-3)');
    return { results: [], exitCode: 1 };
  }
  let units: ContentUnit[];
  if (opts.authored) units = authoredInScope(p, scope);
  else {
    const inScope = new Set(subjectsInScope(p.catalog, scope).map((s) => s.id));
    units = unitsInScope(p.catalog, scope)
      .filter((r) => inScope.has(r.subject.id))
      .flatMap((r) => loadOutUnit(p, r.chapter.id) ?? []);
  }
  if (!units.length) {
    p.log(opts.authored ? 'no hand-authored chapters or exemplars in scope' : 'nothing to publish: no generated units in scope under out/ (or use --authored)');
    return { results: [], exitCode: 1 };
  }
  p.log(`blob store: ${p.blob.describe()}`);
  const results: PublishResult[] = [];
  for (const u of units) {
    try {
      results.push(await publishUnit(p, u, { allowMock: !!opts.allowMock }));
    } catch (e) {
      results.push({ unit: u.unit, status: 'failed', version: null, questions: 0, tests: 0, message: (e as Error).message });
    }
  }
  p.log(table(['unit', 'status', 'version', 'questions', 'tests', 'detail'], results.map((r) => [r.unit, r.status, r.version ?? '—', r.questions, r.tests, r.message]), ['l', 'l', 'r', 'r', 'r', 'l']));
  const bad = results.filter((r) => r.status === 'refused' || r.status === 'failed').length;
  p.log(`publish: ${results.filter((r) => r.status === 'published').length} published, ${results.filter((r) => r.status === 'unchanged').length} unchanged, ${bad} refused/failed`);
  return { results, exitCode: bad ? 1 : 0 };
}

/** `rollback --unit <id> --to <version>`: re-activates an earlier release of a unit. */
export async function rollbackCommand(p: Pipeline, unit: string, to: number): Promise<{ exitCode: number }> {
  const ref = findChapter(p.catalog, unit);
  const year = ref?.syllabus.academic_year;
  const { db } = await p.dbAccess.get();
  const where = year ? and(eq(contentReleases.unit, unit), eq(contentReleases.academicYear, year)) : eq(contentReleases.unit, unit);
  const releases = await db.select().from(contentReleases).where(where).orderBy(desc(contentReleases.version));
  const target = releases.find((r) => r.version === to);
  if (!target) {
    p.log(`no release ${unit}@${to}; available: ${releases.map((r) => `${r.version} (${r.status})`).join(', ') || 'none'}`);
    return { exitCode: 1 };
  }
  const before = releases.find((r) => r.status === 'active');
  if (before?.id === target.id) {
    p.log(`${unit}@${to} is already active`);
    return { exitCode: 0 };
  }
  await activateRelease(db, target.id);
  const after = await db.select({ version: contentReleases.version, status: contentReleases.status }).from(contentReleases).where(and(where, ne(contentReleases.status, 'ingested'))).orderBy(desc(contentReleases.version));
  p.log(`${unit}: active release ${before ? `${before.version} → ` : ''}${to}`);
  p.log(after.map((r) => `  ${r.version}: ${r.status}`).join('\n'));
  return { exitCode: 0 };
}

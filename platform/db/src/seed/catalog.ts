/**
 * `seed catalog`: loads platform/catalog/<board>/subjects.yaml (D-020), every syllabus.yaml and every
 * blueprints/*.yaml, validated with the shared zod schemas, as an idempotent upsert keyed by
 * (catalog id, academic_year). Running it twice leaves the same rows; an unchanged syllabus file is
 * skipped by content hash. Rows removed from the YAML are not deleted (content may reference them);
 * that is reported instead.
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';
import { and, eq, gt, inArray, sql, type SQL } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import { getTableColumns } from 'drizzle-orm';
import { SubjectsFile, SyllabusFile, type Subject } from '@soyl/shared/content/catalog';
import { Blueprint } from '@soyl/shared/content/blueprint';
import { examFor, type ClassLevel } from '@soyl/shared/content/ids';
import type { Database } from '../client';
import { blueprints, boards, chapters, classes, learningOutcomes, subjects, syllabusVersions, topics } from '../../schema/index';

export const DEFAULT_CATALOG_DIR = fileURLToPath(new URL('../../../catalog', import.meta.url));

const BOARD_NAMES: Record<string, string> = { cbse: 'CBSE', cisce: 'CISCE' };
const CLASS_LEVELS: ClassLevel[] = [7, 8, 9, 10, 11, 12];

export interface CatalogSeedReport {
  dir: string;
  academicYears: string[];
  boards: number;
  classes: number;
  subjects: number;
  syllabi: { loaded: number; unchanged: number };
  chapters: number;
  topics: number;
  learningOutcomes: number;
  blueprints: number;
  /** Files that failed validation or reference unknown subjects. The seed fails if this is non-empty. */
  errors: string[];
}

type Log = (m: string) => void;

function walk(dir: string, match: (rel: string) => boolean, base = dir, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'sources' || entry.name.startsWith('.')) continue;
      walk(full, match, base, out);
    } else if (match(path.relative(base, full).split(path.sep).join('/'))) out.push(full);
  }
  return out.sort();
}

function readYaml(file: string): unknown {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex');

/** `SET col = excluded.col` for every column except the conflict target and id/created_at. */
function excludedSet<T extends PgTable>(table: T, skip: string[]): Record<string, SQL> {
  const set: Record<string, SQL> = {};
  for (const [key, col] of Object.entries(getTableColumns(table))) {
    if (['id', 'createdAt', ...skip].includes(key)) continue;
    set[key] = sql.raw(`excluded."${col.name}"`);
  }
  return set;
}

function zodMessage(file: string, err: { issues?: { path: PropertyKey[]; message: string }[] }): string {
  const issues = (err.issues ?? []).slice(0, 5).map((i) => `${i.path.map(String).join('.')}: ${i.message}`);
  return `${file}: ${issues.join('; ')}`;
}

export async function seedCatalog(db: Database, opts: { dir?: string; log?: Log } = {}): Promise<CatalogSeedReport> {
  const dir = path.resolve(opts.dir ?? process.env.SOYL_CATALOG_DIR ?? DEFAULT_CATALOG_DIR);
  const log = opts.log ?? (() => {});
  const rel = (f: string) => path.relative(dir, f).split(path.sep).join('/');
  const report: CatalogSeedReport = {
    dir,
    academicYears: [],
    boards: 0,
    classes: 0,
    subjects: 0,
    syllabi: { loaded: 0, unchanged: 0 },
    chapters: 0,
    topics: 0,
    learningOutcomes: 0,
    blueprints: 0,
    errors: [],
  };

  // ---- parse everything first, so a bad file fails the run before any write
  const subjectFiles = walk(dir, (r) => /^[^/]+\/subjects\.yaml$/.test(r));
  if (!subjectFiles.length) throw new Error(`no <board>/subjects.yaml found under ${dir}`);
  const allSubjects: { subject: Subject; year: string }[] = [];
  for (const f of subjectFiles) {
    const parsed = SubjectsFile.safeParse(readYaml(f));
    if (!parsed.success) report.errors.push(zodMessage(rel(f), parsed.error));
    else for (const s of parsed.data.subjects) allSubjects.push({ subject: s, year: parsed.data.academic_year });
  }
  const syllabi = walk(dir, (r) => r.endsWith('/syllabus.yaml')).flatMap((f) => {
    const parsed = SyllabusFile.safeParse(readYaml(f));
    if (!parsed.success) {
      report.errors.push(zodMessage(rel(f), parsed.error));
      return [];
    }
    return [{ file: rel(f), data: parsed.data }];
  });
  const blueprintFiles = walk(dir, (r) => /\/blueprints\/[^/]+\.ya?ml$/.test(r)).flatMap((f) => {
    const parsed = Blueprint.safeParse(readYaml(f));
    if (!parsed.success) {
      report.errors.push(zodMessage(rel(f), parsed.error));
      return [];
    }
    return [{ file: rel(f), data: parsed.data }];
  });
  const known = new Set(allSubjects.map((s) => `${s.subject.id}@${s.year}`));
  for (const s of syllabi)
    if (!known.has(`${s.data.subject_id}@${s.data.academic_year}`))
      report.errors.push(`${s.file}: subject ${s.data.subject_id} (${s.data.academic_year}) is not in any subjects.yaml`);
  for (const b of blueprintFiles)
    if (b.data.subject_id && !known.has(`${b.data.subject_id}@${b.data.academic_year}`))
      report.errors.push(`${b.file}: subject ${b.data.subject_id} (${b.data.academic_year}) is not in any subjects.yaml`);
  if (report.errors.length) throw Object.assign(new Error(`catalog has ${report.errors.length} invalid file(s):\n${report.errors.join('\n')}`), { report });

  report.academicYears = [...new Set(allSubjects.map((s) => s.year))].sort();

  await db.transaction(async (tx) => {
    // ---- boards and classes (reference data)
    const boardRows = await tx
      .insert(boards)
      .values(Object.entries(BOARD_NAMES).map(([code, name]) => ({ code, name })))
      .onConflictDoUpdate({ target: boards.code, set: excludedSet(boards, ['code']) })
      .returning({ id: boards.id, code: boards.code });
    const boardId = new Map(boardRows.map((b) => [b.code, b.id]));
    report.boards = boardRows.length;

    const classRows = await tx
      .insert(classes)
      .values(
        boardRows.flatMap((b) =>
          CLASS_LEVELS.map((level) => ({
            boardId: b.id,
            level,
            exam: examFor(b.code as 'cbse' | 'cisce', level),
            name: `Class ${level}`,
          })),
        ),
      )
      .onConflictDoUpdate({ target: [classes.boardId, classes.level], set: excludedSet(classes, ['boardId', 'level']) })
      .returning({ id: classes.id, boardId: classes.boardId, level: classes.level });
    const classId = new Map(classRows.map((c) => [`${c.boardId}:${c.level}`, c.id]));
    report.classes = classRows.length;

    // ---- subjects
    const subjectId = new Map<string, string>();
    for (let i = 0; i < allSubjects.length; i += 500) {
      const batch = allSubjects.slice(i, i + 500).map(({ subject: s, year }) => {
        const b = boardId.get(s.board)!;
        return {
          key: s.id,
          academicYear: year,
          boardId: b,
          classId: classId.get(`${b}:${s.class}`)!,
          exam: s.exam,
          classLevel: s.class,
          code: s.code,
          name: s.name,
          language: s.language,
          script: s.script,
          tier: s.tier,
          wave: s.wave,
          priority: s.priority,
          theoryOnly: s.theory_only,
          hasBoardExam: s.has_board_exam,
          sourceStatus: s.source_status,
          source: s.source,
          notes: s.notes ?? null,
          variants: s.variants,
        };
      });
      const rows = await tx
        .insert(subjects)
        .values(batch)
        .onConflictDoUpdate({ target: [subjects.key, subjects.academicYear], set: excludedSet(subjects, ['key', 'academicYear']) })
        .returning({ id: subjects.id, key: subjects.key, academicYear: subjects.academicYear });
      for (const r of rows) subjectId.set(`${r.key}@${r.academicYear}`, r.id);
    }
    report.subjects = subjectId.size;

    // ---- syllabi → chapters → topics → learning outcomes
    for (const { file, data } of syllabi) {
      const sid = subjectId.get(`${data.subject_id}@${data.academic_year}`)!;
      const contentHash = hash(data);
      const existing = await tx
        .select({ hash: syllabusVersions.contentHash })
        .from(syllabusVersions)
        .where(and(eq(syllabusVersions.subjectId, sid), eq(syllabusVersions.academicYear, data.academic_year)));
      if (existing[0]?.hash === contentHash) {
        report.syllabi.unchanged++;
        continue;
      }
      const year = data.academic_year;
      const chapterRows = await tx
        .insert(chapters)
        .values(
          data.chapters.map((ch) => ({
            subjectId: sid,
            key: ch.id,
            academicYear: year,
            number: ch.number,
            title: ch.title,
            titleEn: ch.title_en ?? null,
            syllabusUnit: ch.unit ?? null,
            removedTopics: ch.removed_topics,
            literatureTexts: ch.literature_texts,
            boardAssessed: ch.board_assessed,
          })),
        )
        .onConflictDoUpdate({ target: [chapters.key, chapters.academicYear], set: excludedSet(chapters, ['key', 'academicYear']) })
        .returning({ id: chapters.id, key: chapters.key });
      const chapterId = new Map(chapterRows.map((c) => [c.key, c.id]));

      const topicValues = data.chapters.flatMap((ch) =>
        ch.topics.map((t, i) => ({
          chapterId: chapterId.get(ch.id)!,
          key: t.id,
          academicYear: year,
          position: i + 1,
          title: t.title,
          titleEn: t.title_en ?? null,
          boardAssessed: t.board_assessed,
        })),
      );
      const topicRows = await tx
        .insert(topics)
        .values(topicValues)
        .onConflictDoUpdate({ target: [topics.key, topics.academicYear], set: excludedSet(topics, ['key', 'academicYear']) })
        .returning({ id: topics.id, key: topics.key });
      const topicId = new Map(topicRows.map((t) => [t.key, t.id]));

      const outcomeValues = data.chapters.flatMap((ch) =>
        ch.topics.flatMap((t) =>
          t.learning_outcomes.map((text, i) => ({ topicId: topicId.get(t.id)!, academicYear: year, position: i + 1, text })),
        ),
      );
      if (outcomeValues.length)
        await tx
          .insert(learningOutcomes)
          .values(outcomeValues)
          .onConflictDoUpdate({
            target: [learningOutcomes.topicId, learningOutcomes.position],
            set: excludedSet(learningOutcomes, ['topicId', 'position']),
          });
      // Outcomes removed from a topic: drop the tail positions (nothing references outcomes).
      for (const ch of data.chapters)
        for (const t of ch.topics)
          await tx
            .delete(learningOutcomes)
            .where(and(eq(learningOutcomes.topicId, topicId.get(t.id)!), gt(learningOutcomes.position, t.learning_outcomes.length)));

      await tx
        .insert(syllabusVersions)
        .values({
          subjectId: sid,
          academicYear: year,
          sourceStatus: data.source_status,
          sources: data.sources,
          examNotes: data.exam_notes ?? null,
          units: data.units,
          removedTopics: data.removed_topics,
          contentHash,
          sourcePath: file,
        })
        .onConflictDoUpdate({
          target: [syllabusVersions.subjectId, syllabusVersions.academicYear],
          set: excludedSet(syllabusVersions, ['subjectId', 'academicYear']),
        });
      report.syllabi.loaded++;
      log(`syllabus ${file}: ${data.chapters.length} chapters`);
    }

    // ---- blueprints
    for (const { file, data } of blueprintFiles) {
      await tx
        .insert(blueprints)
        .values({
          key: data.id,
          academicYear: data.academic_year,
          board: data.board,
          exam: data.exam,
          classLevel: data.class,
          subjectId: data.subject_id ? subjectId.get(`${data.subject_id}@${data.academic_year}`)! : null,
          paperType: data.paper_type,
          durationMin: data.duration_min,
          totalMarks: data.total_marks,
          sourceStatus: data.source_status,
          definition: data,
          sourcePath: file,
          contentHash: hash(data),
        })
        .onConflictDoUpdate({ target: [blueprints.key, blueprints.academicYear], set: excludedSet(blueprints, ['key', 'academicYear']) });
    }
    report.blueprints = blueprintFiles.length;

    // ---- totals in the database for the seeded years (idempotency is checked on these)
    const years = report.academicYears;
    const count = async (table: PgTable, col: Parameters<typeof inArray>[0]) =>
      Number((await tx.select({ n: sql<number>`count(*)` }).from(table).where(inArray(col, years)))[0]!.n);
    report.chapters = await count(chapters, chapters.academicYear);
    report.topics = await count(topics, topics.academicYear);
    report.learningOutcomes = await count(learningOutcomes, learningOutcomes.academicYear);
  });

  return report;
}

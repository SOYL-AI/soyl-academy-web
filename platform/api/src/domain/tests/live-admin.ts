/**
 * Scheduling the All-India live mocks (CONTEXT §10; LIVE_MOCK_SITTINGS in shared/config/tests.ts;
 * ADR-012). Used by `npm run live -w @soyl/api -- schedule` and by local dev. Not part of any route.
 *
 * For each sitting and each subject in scope:
 *   1. the live paper: an existing published `t_<subject>_live_<n>` is reused; otherwise the content
 *      pipeline's engine assembles one from the subject's board blueprint. Candidates are the
 *      subject's `live_reserved` items (AC-11: never seen in practice or other tests); papers of
 *      earlier sittings are excluded (no repeats across the live series). With
 *      `allowPracticePool` (local dev only — refused in production) practice items may fill it.
 *      Shortages are reported as the engine's generation requests and that event is not created.
 *   2. live_reserved items of the paper are embargoed until the event starts (AC-11).
 *   3. the event row: window = sitting start + the paper's duration, late start 15 min, registration
 *      opening `registrationOpensDaysBefore` days ahead. Re-running updates a scheduled event in place.
 */
import { and, desc, eq, inArray, sql } from 'drizzle-orm';
import { chapters, ingestTestDefinition, liveEvents, questions, subjects, testItems, tests, type Database } from '@soyl/db';
import { assemblePaper, type BankItem, type GenerationRequest } from '@soyl/content-pipeline/assemble/engine';
import { blueprintFor, testIdBase } from '@soyl/content-pipeline/assemble/series';
import type { Catalog } from '@soyl/content-pipeline/catalog';
import { LIVE_MOCK_CLASSES, LIVE_MOCK_SITTINGS, TEST_ENGINE } from '@soyl/shared/config/tests';
import type { PaperType } from '@soyl/shared/content/blueprint';
import type { QuestionType } from '@soyl/shared/content/question';
import { TestDefinition } from '@soyl/shared/content/test';
import { STUDENT_VISIBLE } from '../content';

export interface Sitting {
  sitting: number | 'dev';
  title: string;
  starts: Date;
}

export interface ScheduleOptions {
  year: string;
  catalog: Catalog;
  /** Subject keys; default: every Wave 1 subject (classes 10 and 12) with a syllabus. */
  subjects?: string[];
  sittings?: Sitting[];
  /** Local dev only: practice-pool items may fill the paper (refused when `production`). */
  allowPracticePool?: boolean;
  /** Paper type when the subject's board blueprint cannot be filled (local dev: 'unit-test'). */
  fallbackPaper?: PaperType;
  production?: boolean;
  now?: Date;
}

export interface ScheduledEvent {
  subject: string;
  sitting: number | 'dev';
  status: 'scheduled' | 'updated' | 'unchanged' | 'skipped';
  eventKey: string | null;
  testKey: string | null;
  startsAt: string | null;
  endsAt: string | null;
  detail: string;
  requests: GenerationRequest[];
}

export const configuredSittings = (): Sitting[] => LIVE_MOCK_SITTINGS.map((s) => ({ sitting: s.sitting, title: s.title, starts: new Date(s.starts) }));

async function liveBank(db: Database, year: string, subjectKey: string, pools: string[]) {
  const rows = await db
    .select({ id: questions.id, key: questions.key, version: questions.version, unit: questions.unit, type: questions.type, marks: questions.marks, difficulty: questions.difficulty, competency: questions.competency, topicKeys: questions.topicKeys, pool: questions.pool })
    .from(questions)
    .where(and(eq(questions.academicYear, year), eq(questions.isCurrent, true), inArray(questions.status, [...STUDENT_VISIBLE]), inArray(questions.pool, pools), sql`${questions.unit} LIKE ${`${subjectKey}-ch%`}`));
  // Live-reserved items first: the engine breaks score ties by bank order after its seeded shuffle,
  // so ordering alone does not decide; dev papers simply mix both pools.
  return rows.map((q) => ({ id: q.key, version: q.version, unit: q.unit, type: q.type as QuestionType, marks: Number(q.marks), difficulty: q.difficulty, competency: q.competency as BankItem['competency'], topic_ids: q.topicKeys, rowId: q.id, pool: q.pool }));
}

export async function scheduleLiveMocks(db: Database, opts: ScheduleOptions): Promise<ScheduledEvent[]> {
  if (opts.allowPracticePool && opts.production) throw new Error('allowPracticePool is refused in production (AC-11: live items must not be practice items)');
  const sittings = opts.sittings ?? configuredSittings();
  const subjectsInScope = opts.catalog.subjects.filter((s) => (opts.subjects ? opts.subjects.includes(s.id) : (LIVE_MOCK_CLASSES as readonly number[]).includes(s.class) && s.has_board_exam) && opts.catalog.syllabi.has(s.id));
  const out: ScheduledEvent[] = [];
  for (const subject of subjectsInScope) {
    const [subjectRow] = await db.select({ id: subjects.id }).from(subjects).where(and(eq(subjects.key, subject.id), eq(subjects.academicYear, opts.year)));
    if (!subjectRow) {
      out.push({ subject: subject.id, sitting: 0, status: 'skipped', eventKey: null, testKey: null, startsAt: null, endsAt: null, detail: 'subject not in the database (seed the catalog)', requests: [] });
      continue;
    }
    const pools = opts.allowPracticePool ? ['live_reserved', 'practice'] : ['live_reserved'];
    const bank = await liveBank(db, opts.year, subject.id, pools);
    const base = testIdBase(subject.id);
    const used = new Set<string>();
    // Items of live papers that already exist are never reused by another sitting.
    const existingLive = await db
      .select({ key: questions.key })
      .from(testItems)
      .innerJoin(tests, eq(tests.id, testItems.testId))
      .innerJoin(questions, eq(questions.id, testItems.questionId))
      .where(and(eq(tests.subjectId, subjectRow.id), eq(tests.kind, 'live'), eq(tests.academicYear, opts.year)));
    existingLive.forEach((r) => used.add(r.key));

    for (const s of sittings) {
      const testKey = `${base.replace(/^t_/, 't_')}_live_${s.sitting}`;
      const eventKey = `live_${base.replace(/^t_/, '')}_${s.sitting}`;
      const [existing] = await db
        .select({ id: tests.id, durationMin: tests.durationMin })
        .from(tests)
        .where(and(eq(tests.key, testKey), eq(tests.academicYear, opts.year), eq(tests.status, 'published')))
        .orderBy(desc(tests.version))
        .limit(1);
      let testId = existing?.id ?? null;
      let durationMin = existing?.durationMin ?? 0;
      let requests: GenerationRequest[] = [];
      let paperNote = 'existing paper';
      if (!testId) {
        const syllabus = opts.catalog.syllabi.get(subject.id)!;
        const assessed = syllabus.chapters.filter((c) => c.board_assessed !== false).map((c) => c.id);
        const attempt = (paper: PaperType, chapters: string[]) => {
          const bp = blueprintFor(opts.catalog, subject, paper);
          if (!bp) return { ok: false as const, requests: [] as GenerationRequest[], note: `no ${paper} blueprint` };
          const r = assemblePaper({ id: testKey, title: `${s.title} — ${subject.name}`, blueprint: bp, subjectId: subject.id, chapters, seed: `${testKey}@${opts.year}`, exclude: used }, bank);
          return r.ok ? { ...r, note: `${paper} paper` } : { ...r, note: `${paper} blueprint cannot be filled` };
        };
        let r = attempt('board', assessed);
        if (!r.ok && opts.fallbackPaper) {
          const withQuestions = assessed.filter((c) => bank.some((q) => q.unit === c));
          const fb = attempt(opts.fallbackPaper, withQuestions.length ? withQuestions : assessed);
          if (fb.ok) r = fb;
          else requests = [...(r.ok ? [] : r.requests), ...fb.requests];
        } else if (!r.ok) requests = r.requests;
        if (!r.ok) {
          out.push({ subject: subject.id, sitting: s.sitting, status: 'skipped', eventKey: null, testKey: null, startsAt: null, endsAt: null, detail: `no live paper: ${r.note} (${requests.reduce((n, q) => n + q.missing, 0)} item(s) missing)`, requests });
          continue;
        }
        const def = TestDefinition.parse({ ...r.test, kind: 'live', shuffle: true });
        r.used.forEach((k) => used.add(k));
        const ingested = await ingestTestDefinition(db, def, { academicYear: opts.year, status: 'published' });
        testId = ingested.testId;
        durationMin = def.duration_min;
        paperNote = r.note;
      }
      const startsAt = s.starts;
      const endsAt = new Date(startsAt.getTime() + durationMin * 60_000);
      const opensAt = new Date(Math.min(startsAt.getTime(), startsAt.getTime() - TEST_ENGINE.live.registrationOpensDaysBefore * 86_400_000));
      // AC-11: reserved items stay embargoed until the start (the view hides them; the engine checks too).
      await db
        .update(questions)
        .set({ embargoUntil: startsAt })
        .where(and(eq(questions.pool, 'live_reserved'), inArray(questions.id, db.select({ id: testItems.questionId }).from(testItems).where(eq(testItems.testId, testId)))));
      const [prev] = await db.select().from(liveEvents).where(and(eq(liveEvents.key, eventKey), eq(liveEvents.academicYear, opts.year)));
      const title = `${s.title} — ${subject.name}`;
      if (!prev) {
        await db.insert(liveEvents).values({ key: eventKey, academicYear: opts.year, testId, title, registrationOpensAt: opensAt, startsAt, lateStartMinutes: TEST_ENGINE.live.lateStartMinutes, endsAt });
      } else if (prev.status === 'scheduled' && (prev.startsAt.getTime() !== startsAt.getTime() || prev.endsAt.getTime() !== endsAt.getTime() || prev.title !== title || prev.testId !== testId)) {
        await db.update(liveEvents).set({ testId, title, registrationOpensAt: opensAt, startsAt, endsAt }).where(eq(liveEvents.id, prev.id));
      }
      out.push({
        subject: subject.id,
        sitting: s.sitting,
        status: !prev ? 'scheduled' : prev.status === 'scheduled' && (prev.startsAt.getTime() !== startsAt.getTime() || prev.endsAt.getTime() !== endsAt.getTime() || prev.title !== title || prev.testId !== testId) ? 'updated' : 'unchanged',
        eventKey,
        testKey,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        detail: paperNote,
        requests,
      });
    }
  }
  return out;
}

/** Chapters with at least one question in the given pools (dev reporting). */
export async function chaptersWithQuestions(db: Database, subjectKey: string, year: string): Promise<string[]> {
  const rows = await db
    .selectDistinct({ key: chapters.key })
    .from(questions)
    .innerJoin(chapters, eq(chapters.id, questions.chapterId))
    .where(and(eq(questions.academicYear, year), sql`${questions.unit} LIKE ${`${subjectKey}-ch%`}`));
  return rows.map((r) => r.key).sort();
}

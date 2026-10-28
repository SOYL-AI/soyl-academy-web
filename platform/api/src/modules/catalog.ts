/**
 * Catalog (ARCHITECTURE §4.1, §7.1): boards → classes → subjects → chapters from the seeded catalog
 * for the configured academic year. Public (guests allowed), cacheable (ETag + Cache-Control),
 * default rate limits, fail open on a KV outage (API-16: learning reads keep working).
 */
import { createHash } from 'node:crypto';
import { and, asc, eq, inArray } from 'drizzle-orm';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { boards, chapters, classes, subjects, topics } from '@soyl/db';
import { SubjectId } from '@soyl/shared/content/ids';
import { ApiProblem } from '../errors';
import { policies } from '../policy';
import { BoardSchema, withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { schoolAssessmentKind, topicAssessment } from '../domain/assessment';
import { SchoolAssessmentSchema } from './content-schemas';

export const CATALOG_CACHE_CONTROL = 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400';

const BoardsResponse = z
  .object({
    academicYear: z.string(),
    boards: z.array(
      z.object({
        code: BoardSchema,
        name: z.string(),
        classes: z.array(z.object({ level: z.number().int(), exam: z.enum(['cbse', 'icse', 'isc']), name: z.string() })),
      }),
    ),
  })
  .meta({ id: 'CatalogBoards' });

const SubjectSummary = z
  .object({
    id: z.string(),
    name: z.string(),
    code: z.string().nullable(),
    exam: z.enum(['cbse', 'icse', 'isc']),
    classLevel: z.number().int(),
    language: z.string(),
    script: z.string(),
    tier: z.enum(['core', 'language', 'elective']),
    wave: z.number().int(),
    hasBoardExam: z.boolean(),
    theoryOnly: z.boolean(),
    variants: z.array(z.object({ code: z.string().nullable(), name: z.string() })),
  })
  .meta({ id: 'CatalogSubject' });

const SubjectsResponse = z.object({ academicYear: z.string(), board: BoardSchema, classLevel: z.number().int(), subjects: z.array(SubjectSummary) }).meta({ id: 'CatalogSubjects' });

const ChaptersResponse = z
  .object({
    academicYear: z.string(),
    subject: SubjectSummary,
    chapters: z.array(
      z.object({
        id: z.string(),
        number: z.number().int(),
        title: z.string(),
        titleEn: z.string().nullable(),
        unit: z.string().nullable(),
        /** false: school assessment only, not in the board exam (label it). */
        boardAssessed: z.boolean(),
        schoolAssessment: SchoolAssessmentSchema.nullable(),
        /** Topic flags are effective: every topic of a school-only chapter is school-only. */
        topics: z.array(z.object({ id: z.string(), title: z.string(), titleEn: z.string().nullable(), boardAssessed: z.boolean(), schoolAssessment: SchoolAssessmentSchema.nullable() })),
      }),
    ),
  })
  .meta({ id: 'CatalogChapters' });

function cached<T>(request: FastifyRequest, reply: FastifyReply, body: T): T | FastifyReply {
  const etag = `"${createHash('sha256').update(JSON.stringify(body)).digest('base64url').slice(0, 27)}"`;
  reply.header('etag', etag);
  reply.header('cache-control', CATALOG_CACHE_CONTROL);
  if (request.headers['if-none-match'] === etag) return reply.status(304).send();
  return body;
}

type SubjectRow = typeof subjects.$inferSelect;
function subjectDto(s: SubjectRow) {
  return {
    id: s.key,
    name: s.name,
    code: s.code,
    exam: s.exam as 'cbse' | 'icse' | 'isc',
    classLevel: s.classLevel,
    language: s.language,
    script: s.script,
    tier: s.tier as 'core' | 'language' | 'elective',
    wave: s.wave,
    hasBoardExam: s.hasBoardExam,
    theoryOnly: s.theoryOnly,
    variants: ((s.variants as { code?: string | null; name: string }[]) ?? []).map((v) => ({ code: v.code ?? null, name: v.name })),
  };
}

export function registerCatalogRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, config } = deps;
  const year = config.academicYear;

  app.get('/v1/catalog/boards', {
    config: { policy: policies.publicRead() },
    schema: { tags: ['catalog'], summary: 'Boards and their classes', response: withProblems({ 200: BoardsResponse, 304: z.null() }) },
    handler: async (request, reply) => {
      const rows = await db
        .select({ code: boards.code, name: boards.name, level: classes.level, exam: classes.exam, className: classes.name })
        .from(boards)
        .innerJoin(classes, eq(classes.boardId, boards.id))
        .orderBy(asc(boards.code), asc(classes.level));
      const byBoard = new Map<string, { code: 'cbse' | 'cisce'; name: string; classes: { level: number; exam: 'cbse' | 'icse' | 'isc'; name: string }[] }>();
      for (const r of rows) {
        const b = byBoard.get(r.code) ?? { code: r.code as 'cbse' | 'cisce', name: r.name, classes: [] };
        b.classes.push({ level: r.level, exam: r.exam as 'cbse' | 'icse' | 'isc', name: r.className });
        byBoard.set(r.code, b);
      }
      return cached(request, reply, { academicYear: year, boards: [...byBoard.values()] });
    },
  });

  app.get('/v1/catalog/:board/:class/subjects', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['catalog'],
      summary: 'Subjects for a board and class',
      params: z.strictObject({ board: BoardSchema, class: z.coerce.number().int().min(7).max(12) }),
      response: withProblems({ 200: SubjectsResponse, 304: z.null() }),
    },
    handler: async (request, reply) => {
      const { board, class: level } = request.params;
      const rows = await db
        .select({ s: subjects })
        .from(subjects)
        .innerJoin(boards, eq(boards.id, subjects.boardId))
        .where(and(eq(boards.code, board), eq(subjects.classLevel, level), eq(subjects.academicYear, year)))
        .orderBy(asc(subjects.priority), asc(subjects.tier), asc(subjects.name));
      return cached(request, reply, { academicYear: year, board, classLevel: level, subjects: rows.map((r) => subjectDto(r.s)) });
    },
  });

  app.get('/v1/catalog/subjects/:id/chapters', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['catalog'],
      summary: 'Chapters (with topics) of a subject, in board order',
      params: z.strictObject({ id: SubjectId }),
      response: withProblems({ 200: ChaptersResponse, 304: z.null() }),
    },
    handler: async (request, reply) => {
      const [subject] = await db.select().from(subjects).where(and(eq(subjects.key, request.params.id), eq(subjects.academicYear, year)));
      if (!subject) throw new ApiProblem('not_found');
      const chapterRows = await db.select().from(chapters).where(eq(chapters.subjectId, subject.id)).orderBy(asc(chapters.number));
      const topicRows = chapterRows.length
        ? await db
            .select()
            .from(topics)
            .where(inArray(topics.chapterId, chapterRows.map((c) => c.id)))
            .orderBy(asc(topics.chapterId), asc(topics.position))
        : [];
      const byChapter = new Map<string, typeof topicRows>();
      for (const t of topicRows) byChapter.set(t.chapterId, [...(byChapter.get(t.chapterId) ?? []), t]);
      return cached(request, reply, {
        academicYear: year,
        subject: subjectDto(subject),
        chapters: chapterRows.map((c) => ({
          id: c.key,
          number: c.number,
          title: c.title,
          titleEn: c.titleEn,
          unit: c.syllabusUnit,
          boardAssessed: c.boardAssessed,
          schoolAssessment: schoolAssessmentKind(c.boardAssessed, c.title, c.syllabusUnit),
          topics: (byChapter.get(c.id) ?? []).map((t) => ({
            id: t.key,
            title: t.title,
            titleEn: t.titleEn,
            ...topicAssessment({ boardAssessed: c.boardAssessed, title: c.title, unit: c.syllabusUnit }, t),
          })),
        })),
      });
    },
  });
}

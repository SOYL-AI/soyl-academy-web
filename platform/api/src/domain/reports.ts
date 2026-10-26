/**
 * "Report a mistake" (CONTEXT §4): any visitor, signed in or not, can flag a deck slide, a notes
 * section, a flashcard or a question. Reports land in `content_reports` (status open) for the admin
 * queue; Wave 1 reports are fixed within 24 hours.
 *
 * The comment is free text from a child: it is normalised (NFC), stripped of control, zero-width and
 * bidi-override characters, capped at 1000 characters, and stored as plain text. The admin UI renders
 * it as text, never as HTML or Markdown (WEB-7). Rate limits: reports.user, reports.ip.
 */
import { and, desc, eq, lt, or, sql, type SQL } from 'drizzle-orm';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { contentReports, flashcardSets, notes, questions, type Database } from '@soyl/db';
import { CONTENT_REPORTS } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { deckParts, visible, type ChapterRef } from './content';

export const REPORT_CONTENT_TYPES = ['deck', 'notes', 'flashcard_set', 'question'] as const;
export type ReportContentType = (typeof REPORT_CONTENT_TYPES)[number];

/** NFC; drops C0/C1 controls except newline and tab, zero-width and bidi controls; at most 2 blank lines in a row. */
export function sanitiseComment(raw: string | undefined | null): string | null {
  if (raw === undefined || raw === null) return null;
  const text = raw
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f-\u009f]/g, '')
    .replace(/[​-‏‪-‮⁠-⁤⁦-⁩﻿￹-￻]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (!text) return null;
  if ([...text].length > CONTENT_REPORTS.maxCommentChars)
    throw new ApiProblem('validation_failed', { errors: [{ path: 'body.comment', message: `At most ${CONTENT_REPORTS.maxCommentChars} characters.` }] });
  return text;
}

export interface ReportInput {
  contentType: ReportContentType;
  part?: number;
  questionId?: string;
  itemRef?: string;
  reason: string;
  comment?: string;
}

async function resolveContentId(db: Database, chapter: ChapterRef, year: string, input: ReportInput): Promise<string> {
  const vis = (t: { chapterId: AnyPgColumn; isCurrent: AnyPgColumn; status: AnyPgColumn; academicYear: AnyPgColumn }): SQL => and(eq(t.chapterId, chapter.id), visible(t, year))!;
  switch (input.contentType) {
    case 'deck': {
      const parts = await deckParts(db, chapter.id, year);
      const d = input.part === undefined ? parts[0] : parts.find((p) => p.part === input.part);
      if (d) return d.id;
      break;
    }
    case 'notes': {
      const [n] = await db.select({ id: notes.id }).from(notes).where(vis(notes));
      if (n) return n.id;
      break;
    }
    case 'flashcard_set': {
      const [f] = await db.select({ id: flashcardSets.id }).from(flashcardSets).where(vis(flashcardSets));
      if (f) return f.id;
      break;
    }
    case 'question': {
      if (!input.questionId) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.questionId', message: 'Required when reporting a question.' }] });
      // Any visible current question of the chapter, whichever pool: a test item can be reported after the test.
      const [q] = await db
        .select({ id: questions.id })
        .from(questions)
        .where(and(vis(questions), eq(questions.key, input.questionId), sql`(${questions.pool} <> 'live_reserved' OR ${questions.embargoUntil} <= now())`));
      if (q) return q.id;
      break;
    }
  }
  throw new ApiProblem('not_found');
}

export async function createReport(db: Database, clock: Clock, year: string, userId: string | null, chapter: ChapterRef, input: ReportInput) {
  const message = sanitiseComment(input.comment);
  const contentId = await resolveContentId(db, chapter, year, input);
  const now = new Date(clock.now());
  const [row] = await db
    .insert(contentReports)
    .values({
      userId,
      contentType: input.contentType,
      contentId,
      unit: chapter.key,
      itemRef: input.contentType === 'question' ? [input.questionId, input.itemRef].filter(Boolean).join('#') : (input.itemRef ?? null),
      category: input.reason,
      message,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: contentReports.id, status: contentReports.status, createdAt: contentReports.createdAt });
  return { id: row!.id, status: row!.status as 'open', createdAt: row!.createdAt.toISOString() };
}

/** Admin queue (staff + MFA): newest first, keyset-paged by (created_at, id). */
export async function listReports(db: Database, opts: { status: string; cursor?: string; limit: number }) {
  let after: SQL | undefined;
  if (opts.cursor) {
    const [at, id] = Buffer.from(opts.cursor, 'base64url').toString('utf8').split('|');
    const when = new Date(String(at));
    if (!id || Number.isNaN(when.getTime()) || !/^[0-9a-f-]{36}$/.test(id))
      throw new ApiProblem('validation_failed', { errors: [{ path: 'querystring.cursor', message: 'Invalid cursor.' }] });
    after = or(lt(contentReports.createdAt, when), and(eq(contentReports.createdAt, when), lt(contentReports.id, id)));
  }
  const where = and(eq(contentReports.status, opts.status), after);
  const rows = await db
    .select()
    .from(contentReports)
    .where(where)
    .orderBy(desc(contentReports.createdAt), desc(contentReports.id))
    .limit(opts.limit + 1);
  const page = rows.slice(0, opts.limit);
  const last = page[page.length - 1];
  return {
    reports: page.map((r) => ({
      id: r.id,
      unit: r.unit,
      contentType: r.contentType as ReportContentType,
      contentId: r.contentId,
      itemRef: r.itemRef,
      reason: r.category,
      comment: r.message,
      status: r.status,
      reporter: (r.userId ? 'member' : 'guest') as 'member' | 'guest',
      createdAt: r.createdAt.toISOString(),
    })),
    nextCursor: rows.length > opts.limit && last ? Buffer.from(`${last.createdAt.toISOString()}|${last.id}`).toString('base64url') : null,
  };
}

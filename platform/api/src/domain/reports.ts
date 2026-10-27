/**
 * "Report a mistake" (CONTEXT §4): any visitor, signed in or not, can flag a deck slide, a notes
 * section, a flashcard or a question. Reports land in `content_reports` (status open) for the admin
 * queue; Wave 1 reports are fixed within 24 hours.
 *
 * The comment is free text from a child: it is normalised (NFC), stripped of control, zero-width and
 * bidi-override characters, capped at 1000 characters, and stored as plain text. The admin UI renders
 * it as text, never as HTML or Markdown (WEB-7). Rate limits: reports.user, reports.ip.
 *
 * "Report this AI answer" (AC-15, backend-api M5): `contentType: 'ai_answer'` reports an assistant
 * message of the caller's own conversation (members only; anyone else's conversation is 404). The
 * message is named by `messageId` (from GET /v1/ai/conversations/:id) or by the stream's `requestId`
 * (the SSE `meta` event), so the web can report straight after an answer. The row stores the message id
 * (`content_id`) and `conv:<conversation id>` (`item_ref`), never the message text; the message itself
 * is purged with the conversation after 30 days (PII.md). Reporting the same answer again returns the
 * open report. `inappropriate` reports also raise an ops alert (a log line without content), as unsafe
 * output is a moderation incident.
 */
import { and, desc, eq, lt, or, sql, type SQL } from 'drizzle-orm';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { aiConversations, aiMessages, aiRequests, chapters, contentReports, flashcardSets, notes, questions, type Database } from '@soyl/db';
import { CONTENT_REPORTS } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { deckParts, visible, type ChapterRef, type ReleaseItemType } from './content';

/** What students report: content items (with a chapter) and AI answers. */
export const REPORT_CONTENT_TYPES = ['deck', 'notes', 'flashcard_set', 'question', 'ai_answer'] as const;
export type ReportContentType = (typeof REPORT_CONTENT_TYPES)[number];
export type ContentReportType = Exclude<ReportContentType, 'ai_answer'>;
/** Reasons that make sense for an AI answer (audio and typo belong to authored content). */
export const AI_REPORT_REASONS = ['wrong_answer', 'wrong_content', 'inappropriate', 'rendering', 'other'] as const;

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
  contentType: ContentReportType;
  part?: number;
  questionId?: string;
  itemRef?: string;
  reason: string;
  comment?: string;
}

async function resolveContentId(db: Database, chapter: ChapterRef, year: string, input: ReportInput): Promise<string> {
  const vis = (t: { id: AnyPgColumn; chapterId: AnyPgColumn; isCurrent: AnyPgColumn; status: AnyPgColumn; academicYear: AnyPgColumn }, type: ReleaseItemType): SQL =>
    and(eq(t.chapterId, chapter.id), visible(t, type, chapter, year))!;
  switch (input.contentType) {
    case 'deck': {
      const parts = await deckParts(db, chapter, year);
      const d = input.part === undefined ? parts[0] : parts.find((p) => p.part === input.part);
      if (d) return d.id;
      break;
    }
    case 'notes': {
      const [n] = await db.select({ id: notes.id }).from(notes).where(vis(notes, 'notes'));
      if (n) return n.id;
      break;
    }
    case 'flashcard_set': {
      const [f] = await db.select({ id: flashcardSets.id }).from(flashcardSets).where(vis(flashcardSets, 'flashcard_set'));
      if (f) return f.id;
      break;
    }
    case 'question': {
      if (!input.questionId) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.questionId', message: 'Required when reporting a question.' }] });
      // Any visible current question of the chapter, whichever pool: a test item can be reported after the test.
      const [q] = await db
        .select({ id: questions.id })
        .from(questions)
        .where(and(vis(questions, 'question'), eq(questions.key, input.questionId), sql`(${questions.pool} <> 'live_reserved' OR ${questions.embargoUntil} <= now())`));
      if (q) return q.id;
      break;
    }
  }
  throw new ApiProblem('not_found');
}

export interface AiReportInput {
  conversationId: string;
  messageId?: string;
  requestId?: string;
  reason: (typeof AI_REPORT_REASONS)[number];
  comment?: string;
}

/** The assistant message being reported, in the caller's own conversation; 404 otherwise. */
async function resolveAiAnswer(db: Database, userId: string, input: AiReportInput) {
  const [conv] = await db
    .select({ id: aiConversations.id, chapterKey: chapters.key })
    .from(aiConversations)
    .leftJoin(chapters, eq(chapters.id, aiConversations.chapterId))
    .where(and(eq(aiConversations.id, input.conversationId), eq(aiConversations.userId, userId)));
  if (!conv) throw new ApiProblem('not_found');
  const target = input.messageId ? eq(aiMessages.id, input.messageId) : eq(aiRequests.requestId, input.requestId!);
  const [msg] = await db
    .select({ id: aiMessages.id })
    .from(aiMessages)
    .leftJoin(aiRequests, eq(aiRequests.id, aiMessages.aiRequestId))
    .where(and(eq(aiMessages.conversationId, conv.id), eq(aiMessages.role, 'assistant'), target))
    .orderBy(desc(aiMessages.createdAt))
    .limit(1);
  if (!msg) throw new ApiProblem('not_found');
  return { messageId: msg.id, conversationId: conv.id, unit: conv.chapterKey ?? 'ai' };
}

export interface ReportLog {
  warn(obj: object, msg: string): void;
}

/** POST /v1/content-reports with contentType ai_answer (members only). Idempotent per answer while open. */
export async function createAiAnswerReport(db: Database, clock: Clock, log: ReportLog, userId: string, input: AiReportInput) {
  if (!input.messageId === !input.requestId)
    throw new ApiProblem('validation_failed', { errors: [{ path: 'body.messageId', message: 'Give exactly one of messageId or requestId for an AI answer.' }] });
  const message = sanitiseComment(input.comment);
  const target = await resolveAiAnswer(db, userId, input);
  const [open] = await db
    .select({ id: contentReports.id, createdAt: contentReports.createdAt })
    .from(contentReports)
    .where(and(eq(contentReports.userId, userId), eq(contentReports.contentType, 'ai_answer'), eq(contentReports.contentId, target.messageId), eq(contentReports.status, 'open')));
  if (open) return { receipt: { id: open.id, status: 'open' as const, createdAt: open.createdAt.toISOString() }, created: false };
  const now = new Date(clock.now());
  const [row] = await db
    .insert(contentReports)
    .values({
      userId,
      contentType: 'ai_answer',
      contentId: target.messageId,
      unit: target.unit,
      itemRef: `conv:${target.conversationId}`,
      category: input.reason,
      message,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: contentReports.id, createdAt: contentReports.createdAt });
  if (input.reason === 'inappropriate')
    log.warn({ alert: true, alertKind: 'ai_answer_reported_inappropriate', reportId: row!.id, messageId: target.messageId }, 'a student reported an AI answer as inappropriate (review queue)');
  return { receipt: { id: row!.id, status: 'open' as const, createdAt: row!.createdAt.toISOString() }, created: true };
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

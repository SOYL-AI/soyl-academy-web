/**
 * AI gateway jobs in the worker (ADR-013): registration, the reservation sweeper (AC-08), the AI job
 * sweep (upload processing), content indexing for retrieval, retention (30 days) and the cost
 * guardrail with the ledger-invariant alert. Handlers are called directly with a fixed `now`.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { aiConversations, aiJobs as aiJobsTable, aiMessages, aiRequests, boards, chapters, classes, contentChunks, creditLedger, notes, subjects, uploads } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { localRuntime } from '@soyl/api/ai/runtime';
import { MemoryAlertSink } from '@soyl/api/ai/spend';
import type { MemoryBlobStore } from '@soyl/api/ai/blob';
import { allJobs } from '../src/jobs';
import { AI_JOB_NAMES, aiJobs } from '../src/ai-jobs';
import { memoryLogger } from '../src/logger';
import { makeUser, NOW } from './helpers';

let t: TestDb;
const log = memoryLogger();
const alerts = new MemoryAlertSink();
const runtime = { ...localRuntime(() => NOW.getTime()), alerts };
const blob = runtime.blob as MemoryBlobStore;
const jobs = aiJobs({ appEnv: 'test', env: { APP_ENV: 'test' }, academicYear: '2026-27', runtime });
const handler = (name: string) => jobs.find((j) => j.name === name)!.handler;
const ctx = (now: Date = NOW) => ({ db: t.db, now, log });

// A minimal valid PNG (header + IHDR + IDAT + IEND).
function png(): Buffer {
  const chunk = (type: string, data: Buffer) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    return Buffer.concat([len, Buffer.from(type, 'latin1'), data, Buffer.alloc(4)]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(100, 0);
  ihdr.writeUInt32BE(80, 4);
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('tEXt', Buffer.from('GPS home')), chunk('IDAT', Buffer.alloc(8)), chunk('IEND', Buffer.alloc(0))]);
}

beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('AI jobs in the worker', () => {
  it('registers the five AI jobs with UTC crons alongside the existing ones', () => {
    const names = allJobs({ ai: { appEnv: 'test', env: { APP_ENV: 'test' }, runtime } }).map((j) => j.name);
    expect(names).toEqual(expect.arrayContaining(Object.values(AI_JOB_NAMES)));
    expect(jobs.map((j) => [j.name, j.cron])).toEqual([
      ['ai.jobs', '* * * * *'],
      ['credits.sweep-reservations', '*/5 * * * *'],
      ['ai.index-content', '20 * * * *'],
      ['ai.retention', '0 21 * * *'],
      ['ai.cost-guardrail', '30 3 * * *'],
    ]);
  });

  it('credits.sweep-reservations refunds expired reservations and closes their requests (AC-08)', async () => {
    const userId = await makeUser(t.db);
    const requestId = `sweep-${Date.now()}`;
    await t.db.insert(creditLedger).values([
      { userId, kind: 'grant', amount: 25, action: 'daily_grant', istDay: '2026-10-26' },
      { userId, kind: 'reserve', amount: -6, action: 'hard-doubt', requestId, istDay: '2026-10-26', reservationExpiresAt: new Date(NOW.getTime() - 60_000) },
    ]);
    await t.db.insert(aiRequests).values({ userId, requestId, action: 'hard-doubt', modelTier: 'mid', model: 'x', status: 'streaming' });
    expect(await handler(AI_JOB_NAMES.sweepReservations)(ctx(), undefined)).toEqual({ refunded: 1 });
    expect(await handler(AI_JOB_NAMES.sweepReservations)(ctx(), undefined)).toEqual({ refunded: 0 }); // idempotent
    const rows = await t.db.select().from(creditLedger).where(eq(creditLedger.requestId, requestId));
    expect(rows.map((r) => [r.kind, r.amount])).toEqual(expect.arrayContaining([['refund', 6]]));
    const [req] = await t.db.select().from(aiRequests).where(eq(aiRequests.requestId, requestId));
    expect(req).toMatchObject({ status: 'failed', errorCode: 'reservation_expired' });
  });

  it('ai.jobs runs queued upload processing (cleaned derivative, quarantine deleted)', async () => {
    const userId = await makeUser(t.db);
    const key = `${userId}/q1`;
    await blob.put('uploads-quarantine', key, png(), 'image/png');
    const [u] = await t.db.insert(uploads).values({ userId, kind: 'photo_doubt', blobKey: key, contentType: 'image/png', status: 'uploaded', expiresAt: new Date(NOW.getTime() + 30 * 86_400_000) }).returning();
    await t.db.insert(aiJobsTable).values({ kind: 'upload_process', userId, payload: { uploadId: u!.id }, runAfter: new Date(NOW.getTime() - 1000) });
    expect(await handler(AI_JOB_NAMES.jobs)(ctx(), undefined)).toEqual({ ran: 1 });
    const [after] = await t.db.select().from(uploads).where(eq(uploads.id, u!.id));
    expect(after).toMatchObject({ status: 'ready', processedContentType: 'image/png' });
    expect(blob.has('uploads-quarantine', key)).toBe(false);
    expect((await blob.get('uploads', after!.processedKey!, 10_000_000)).toString('latin1')).not.toContain('GPS');
    expect(await handler(AI_JOB_NAMES.jobs)(ctx(), undefined)).toEqual({ ran: 0 });
  });

  it('ai.index-content indexes published notes into searchable chunks, idempotently', async () => {
    const [b] = await t.db.insert(boards).values({ code: 'cbse', name: 'CBSE' }).returning();
    const [c] = await t.db.insert(classes).values({ boardId: b!.id, level: 10, exam: 'cbse', name: 'Class 10' }).returning();
    const [s] = await t.db
      .insert(subjects)
      .values({ key: 'cbse-10-science', academicYear: '2026-27', boardId: b!.id, classId: c!.id, exam: 'cbse', classLevel: 10, code: '086', name: 'Science', language: 'en', script: 'Latn', tier: 'core', wave: 1, priority: 1, theoryOnly: false, hasBoardExam: true, sourceStatus: 'verified', source: 'test' })
      .returning();
    const [ch] = await t.db.insert(chapters).values({ subjectId: s!.id, key: 'cbse-10-science-ch10', academicYear: '2026-27', number: 10, title: 'Light' }).returning();
    await t.db.insert(notes).values({
      unit: 'cbse-10-science-ch10',
      chapterId: ch!.id,
      academicYear: '2026-27',
      version: 1,
      status: 'published',
      title: 'Light — notes',
      body: { title: 'Light — notes', sections: [{ heading: 'Refraction', body_md: 'Light bends when it passes from one medium to another.' }, { heading: 'Lenses', body_md: 'A convex lens converges light.' }], exam_tips_md: 'Draw ray diagrams.' },
    });
    const first = await handler(AI_JOB_NAMES.indexContent)(ctx(), undefined);
    expect(first).toMatchObject({ chapters: 1, inserted: 3, failed: 0 });
    expect(await handler(AI_JOB_NAMES.indexContent)(ctx(), undefined)).toMatchObject({ inserted: 0, removed: 0 });
    const rows = await t.db.select({ text: contentChunks.text }).from(contentChunks).where(eq(contentChunks.chapterId, ch!.id));
    expect(rows.map((r) => r.text.split('\n')[0])).toEqual(expect.arrayContaining(['Light — notes — Refraction', 'Light — notes — Lenses']));
  });

  it('ai.retention removes 30-day-old messages, jobs and uploads', async () => {
    const userId = await makeUser(t.db);
    const old = new Date(NOW.getTime() - 31 * 86_400_000);
    const [conv] = await t.db.insert(aiConversations).values({ userId, kind: 'tutor', title: 'my doubt', createdAt: old, updatedAt: old }).returning();
    await t.db.insert(aiMessages).values([
      { conversationId: conv!.id, role: 'user', content: 'old question', createdAt: old },
      { conversationId: conv!.id, role: 'assistant', content: 'old answer', createdAt: old },
    ]);
    await t.db.insert(aiJobsTable).values({ kind: 'evaluation', userId, status: 'succeeded', result: { x: 1 }, createdAt: old });
    await blob.put('uploads', `${userId}/old.png`, png(), 'image/png');
    await t.db.insert(uploads).values({ userId, kind: 'photo_doubt', blobKey: `${userId}/old-q`, contentType: 'image/png', status: 'ready', processedKey: `${userId}/old.png`, expiresAt: new Date(NOW.getTime() - 1000) });
    const r = await handler(AI_JOB_NAMES.retention)(ctx(), undefined);
    expect(r).toMatchObject({ messages: 2, conversations: 1, jobs: 1 });
    expect((r as { uploads: number }).uploads).toBeGreaterThanOrEqual(1);
    expect(blob.has('uploads', `${userId}/old.png`)).toBe(false);
    expect(await t.db.select().from(aiConversations).where(eq(aiConversations.userId, userId))).toEqual([]);
  });

  it('ai.cost-guardrail alerts on expensive actions and on ledger invariant violations', async () => {
    const userId = await makeUser(t.db);
    await t.db.insert(aiRequests).values(
      Array.from({ length: 10 }, (_, i) => ({ userId, requestId: `cg-${i}-${Date.now()}`, action: 'photo-doubt', modelTier: 'mid', model: 'm', status: 'succeeded', costInrPaise: 95, creditsCharged: 10, createdAt: new Date(NOW.getTime() - 86_400_000) })),
    );
    // A corrupt day: more reserved than granted (cannot happen through CreditService).
    await t.db.insert(creditLedger).values([
      { userId, kind: 'grant', amount: 1, action: 'daily_grant', istDay: '2026-10-20' },
      { userId, kind: 'reserve', amount: -5, action: 'x', requestId: `neg-${Date.now()}`, istDay: '2026-10-20', reservationExpiresAt: new Date(NOW.getTime() + 86_400_000) },
    ]);
    alerts.alerts.length = 0;
    const r = (await handler(AI_JOB_NAMES.costGuardrail)(ctx(), undefined)) as { alerts: number; invariants: { negativeBalances: unknown[] } };
    expect(r.alerts).toBe(1);
    expect(r.invariants.negativeBalances).toHaveLength(1);
    expect(alerts.alerts.map((a) => [a.kind, a.severity])).toEqual([
      ['cost_guardrail', 'warning'], // 95 % of the price (critical from 100 %)
      ['invariant', 'critical'],
    ]);
  });
});

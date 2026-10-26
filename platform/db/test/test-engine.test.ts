/**
 * Migration 0007 (backend-api M3, ADR-012): autosave sequence numbers, the attempt score split and
 * the per-test score buckets that percentiles read. Constraints the API relies on, plus cascades.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import { createTestDb, type TestDb } from '../src/testing';
import { attempts, responses, testScoreBuckets, tests, users } from '../schema/index';
import { CHECK, UNIQUE, expectPgError, insertQuestion, makeChapter, makeTest, makeUser, sampleQuestion } from './helpers';

let t: TestDb;
beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

async function fixture() {
  const { chapter, subject } = await makeChapter(t.db);
  const q = await insertQuestion(t.db, chapter, sampleQuestion(chapter.key));
  const { test, items } = await makeTest(t.db, subject.id, chapter.key, [q.id]);
  const user = await makeUser(t.db);
  const now = new Date();
  const [a] = await t.db
    .insert(attempts)
    .values({ userId: user.id, testId: test.id, status: 'in_progress', startedAt: now, deadlineAt: new Date(now.getTime() + 60_000) })
    .returning();
  return { test, item: items[0]!, user, attempt: a! };
}

describe('responses.client_seq', () => {
  it('defaults to 0, rejects negatives and only moves forward with a guarded upsert', async () => {
    const { attempt, item } = await fixture();
    const [r] = await t.db.insert(responses).values({ attemptId: attempt.id, testItemId: item.id, answer: { option_ids: ['a'] } }).returning();
    expect(r!.clientSeq).toBe(0);
    await expectPgError(() => t.db.update(responses).set({ clientSeq: -1 }).where(eq(responses.id, r!.id)), { code: CHECK, constraint: 'responses_client_seq_check' });

    // The API's upsert: apply only when the incoming sequence is higher (ADR-012).
    const save = (seq: number, answer: unknown) =>
      t.db
        .insert(responses)
        .values({ attemptId: attempt.id, testItemId: item.id, answer, clientSeq: seq })
        .onConflictDoUpdate({
          target: [responses.attemptId, responses.testItemId],
          set: { answer: sql`excluded.answer`, clientSeq: sql`excluded.client_seq` },
          setWhere: sql`${responses.clientSeq} < excluded.client_seq`,
        })
        .returning({ seq: responses.clientSeq });
    expect(await save(5, { option_ids: ['b'] })).toEqual([{ seq: 5 }]);
    expect(await save(3, { option_ids: ['c'] })).toEqual([]); // stale: ignored
    expect(await save(5, { option_ids: ['c'] })).toEqual([]); // replay: ignored
    const [after] = await t.db.select().from(responses).where(eq(responses.id, r!.id));
    expect(after!.answer).toEqual({ option_ids: ['b'] });
    // bigint holds millisecond-epoch sequences
    expect(await save(1_790_000_000_000_123, { option_ids: ['a'] })).toEqual([{ seq: 1_790_000_000_000_123 }]);
  });
});

describe('attempts score split', () => {
  it('stores auto/self score, time taken and the stats flag; new columns default sensibly', async () => {
    const { attempt } = await fixture();
    expect(attempt.autoScore).toBeNull();
    expect(attempt.selfScore).toBeNull();
    expect(attempt.countsForStats).toBe(false);
    const [a] = await t.db
      .update(attempts)
      .set({ status: 'submitted', submittedAt: new Date(), autoScore: 12.5, selfScore: 3, score: 15.5, timeTakenSec: 600, countsForStats: true, gradedAt: new Date() })
      .where(eq(attempts.id, attempt.id))
      .returning();
    expect([a!.autoScore, a!.selfScore, a!.score, a!.timeTakenSec, a!.countsForStats]).toEqual([12.5, 3, 15.5, 600, true]);
  });
});

describe('test_score_buckets', () => {
  it('one row per test and bucket; counts increment atomically; cascades with the test', async () => {
    const { test } = await fixture();
    const bump = (bucket: number) =>
      t.db
        .insert(testScoreBuckets)
        .values({ testId: test.id, bucket, attempts: 1 })
        .onConflictDoUpdate({ target: [testScoreBuckets.testId, testScoreBuckets.bucket], set: { attempts: sql`${testScoreBuckets.attempts} + 1` } });
    await Promise.all(Array.from({ length: 20 }, () => bump(7)));
    await bump(10);
    const rows = await t.db.select().from(testScoreBuckets).where(eq(testScoreBuckets.testId, test.id)).orderBy(testScoreBuckets.bucket);
    expect(rows.map((r) => [r.bucket, r.attempts])).toEqual([
      [7, 20],
      [10, 1],
    ]);
    await expectPgError(() => t.db.insert(testScoreBuckets).values({ testId: test.id, bucket: 7 }), { code: UNIQUE, constraint: 'test_score_buckets_test_bucket_unique' });
    await expectPgError(() => t.db.insert(testScoreBuckets).values({ testId: test.id, bucket: -1 }), { code: CHECK, constraint: 'test_score_buckets_bucket_check' });
    await t.db.delete(attempts).where(eq(attempts.testId, test.id)); // attempts RESTRICT test deletion
    await t.db.delete(tests).where(eq(tests.id, test.id));
    expect(await t.db.select().from(testScoreBuckets).where(eq(testScoreBuckets.testId, test.id))).toEqual([]);
  });

  it('attempts and responses cascade on account purge', async () => {
    const { attempt, item, user } = await fixture();
    await t.db.insert(responses).values({ attemptId: attempt.id, testItemId: item.id, clientSeq: 2 });
    await t.db.delete(users).where(eq(users.id, user.id));
    expect(await t.db.select().from(attempts).where(eq(attempts.id, attempt.id))).toEqual([]);
    expect(await t.db.select().from(responses).where(eq(responses.attemptId, attempt.id))).toEqual([]);
  });
});

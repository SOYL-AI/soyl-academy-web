import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import { consentStatus, guardianLinks, profiles, sessions, users, verifications } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { ACCOUNT, CONSENT } from '@soyl/shared/config/security';
import {
  allJobs,
  daysBefore,
  deleteInBatches,
  JOB_NAMES,
  purgeDeletedAccounts,
  purgeUnconsentedAccounts,
  sweepExpiredSessions,
  sweepExpiredVerifications,
} from '../src/jobs';
import { memoryLogger } from '../src/logger';
import type { JobContext } from '../src/registry';
import { DAY, NOW, ago, makeSession, makeUser, makeVerification, userIds } from './helpers';

let t: TestDb;
let ctx: JobContext;
const log = memoryLogger();

beforeAll(async () => {
  t = await createTestDb();
  ctx = { db: t.db, now: NOW, log };
});
afterAll(async () => {
  await t?.close();
});
beforeEach(async () => {
  // Cascades remove every per-user row.
  await t.db.execute(sql`DELETE FROM users`);
  await t.db.execute(sql`DELETE FROM verifications`);
});

describe('daysBefore', () => {
  it('subtracts whole days in UTC milliseconds', () => {
    expect(daysBefore(NOW, 30).toISOString()).toBe('2026-09-26T00:00:00.000Z');
  });
});

describe('account.purge', () => {
  it('uses ACCOUNT.purgeAfterDays (30)', () => {
    expect(ACCOUNT.purgeAfterDays).toBe(30);
  });

  it('hard-deletes only accounts deleted more than 30 days ago, and cascades', async () => {
    const old = await makeUser(t.db, { deletedAt: ago(31), consent: 'granted', withProfile: true, withSession: true });
    const exactly = await makeUser(t.db, { deletedAt: ago(30), withSession: true });
    const justOver = await makeUser(t.db, { deletedAt: new Date(ago(30).getTime() - 1) });
    const recent = await makeUser(t.db, { deletedAt: ago(29) });
    const active = await makeUser(t.db, { createdAt: ago(400), withProfile: true });
    const parent = await makeUser(t.db, { role: 'parent' });
    await t.db.insert(guardianLinks).values({ parentUserId: parent, studentUserId: old });

    const res = await purgeDeletedAccounts(ctx);
    expect(res).toEqual({ deleted: 2 });

    const left = await userIds(t.db);
    expect(left.has(old)).toBe(false);
    expect(left.has(justOver)).toBe(false);
    expect(left.has(exactly)).toBe(true); // boundary: exactly at the TTL is kept (strict <)
    expect(left.has(recent)).toBe(true);
    expect(left.has(active)).toBe(true);
    expect(left.has(parent)).toBe(true);

    // FK cascades removed the purged user's rows.
    expect(await t.db.select().from(sessions).where(eq(sessions.userId, old))).toHaveLength(0);
    expect(await t.db.select().from(profiles).where(eq(profiles.userId, old))).toHaveLength(0);
    expect(await t.db.select().from(consentStatus).where(eq(consentStatus.userId, old))).toHaveLength(0);
    expect(await t.db.select().from(guardianLinks).where(eq(guardianLinks.parentUserId, parent))).toHaveLength(0);
    // Untouched users keep theirs.
    expect(await t.db.select().from(sessions).where(eq(sessions.userId, exactly))).toHaveLength(1);
    expect(await t.db.select().from(profiles).where(eq(profiles.userId, active))).toHaveLength(1);

    // Idempotent: a re-run finds nothing more.
    expect(await purgeDeletedAccounts(ctx)).toEqual({ deleted: 0 });
  });

  it('works in batches until a short batch', async () => {
    for (let i = 0; i < 5; i++) await makeUser(t.db, { deletedAt: ago(40 + i) });
    await makeUser(t.db, { deletedAt: ago(1) });
    expect(await purgeDeletedAccounts(ctx, { batchSize: 2 })).toEqual({ deleted: 5 });
    expect((await userIds(t.db)).size).toBe(1);
  });

  it('honours a different retention', async () => {
    const u = await makeUser(t.db, { deletedAt: ago(8) });
    expect(await purgeDeletedAccounts(ctx, { purgeAfterDays: 7 })).toEqual({ deleted: 1 });
    expect((await userIds(t.db)).has(u)).toBe(false);
  });
});

describe('account.purge-unconsented (AUTH-15)', () => {
  it('defaults to CONSENT.unconsentedAccountTtlDays (30)', () => {
    expect(CONSENT.unconsentedAccountTtlDays).toBe(30);
  });

  it('deletes old students without granted consent; keeps everyone else', async () => {
    const missing = await makeUser(t.db, { createdAt: ago(31), withProfile: true, withSession: true });
    const required = await makeUser(t.db, { createdAt: ago(31), consent: 'required' });
    const pending = await makeUser(t.db, { createdAt: ago(45), consent: 'pending' });
    const granted = await makeUser(t.db, { createdAt: ago(45), consent: 'granted' });
    const revoked = await makeUser(t.db, { createdAt: ago(45), consent: 'revoked' });
    const atTtl = await makeUser(t.db, { createdAt: ago(30), consent: 'pending' });
    const young = await makeUser(t.db, { createdAt: ago(29) });
    const alreadyDeleted = await makeUser(t.db, { createdAt: ago(45), deletedAt: ago(1) });
    const parent = await makeUser(t.db, { role: 'parent', createdAt: ago(90) });
    const reviewer = await makeUser(t.db, { role: 'reviewer', createdAt: ago(90), consent: 'pending' });
    const admin = await makeUser(t.db, { role: 'admin', createdAt: ago(90) });
    await t.db.insert(guardianLinks).values({ parentUserId: parent, studentUserId: pending });

    expect(await purgeUnconsentedAccounts(ctx)).toEqual({ deleted: 3 });

    const left = await userIds(t.db);
    for (const gone of [missing, required, pending]) expect(left.has(gone)).toBe(false);
    for (const kept of [granted, revoked, atTtl, young, alreadyDeleted, parent, reviewer, admin]) expect(left.has(kept)).toBe(true);

    expect(await t.db.select().from(sessions).where(eq(sessions.userId, missing))).toHaveLength(0);
    expect(await t.db.select().from(profiles).where(eq(profiles.userId, missing))).toHaveLength(0);
    expect(await t.db.select().from(guardianLinks)).toHaveLength(0);
    expect(await t.db.select().from(consentStatus).where(eq(consentStatus.userId, granted))).toHaveLength(1);

    expect(await purgeUnconsentedAccounts(ctx)).toEqual({ deleted: 0 });
  });

  it('honours UNCONSENTED_ACCOUNT_TTL_DAYS and batches', async () => {
    const a = await makeUser(t.db, { createdAt: ago(11) });
    const b = await makeUser(t.db, { createdAt: ago(12), consent: 'required' });
    const c = await makeUser(t.db, { createdAt: ago(13), consent: 'pending' });
    const d = await makeUser(t.db, { createdAt: ago(9) });
    expect(await purgeUnconsentedAccounts(ctx, { ttlDays: 10, batchSize: 1 })).toEqual({ deleted: 3 });
    const left = await userIds(t.db);
    expect([a, b, c].some((id) => left.has(id))).toBe(false);
    expect(left.has(d)).toBe(true);
  });
});

describe('auth.sweep-verifications', () => {
  it('deletes rows that expired before now', async () => {
    const expired = await makeVerification(t.db, new Date(NOW.getTime() - 1));
    const longGone = await makeVerification(t.db, ago(3));
    const atNow = await makeVerification(t.db, NOW);
    const future = await makeVerification(t.db, new Date(NOW.getTime() + 5 * 60_000));
    expect(await sweepExpiredVerifications(ctx, { batchSize: 1 })).toEqual({ deleted: 2 });
    const left = new Set((await t.db.select({ id: verifications.id }).from(verifications)).map((r) => r.id));
    expect(left.has(expired)).toBe(false);
    expect(left.has(longGone)).toBe(false);
    expect(left.has(atNow)).toBe(true);
    expect(left.has(future)).toBe(true);
  });
});

describe('auth.sweep-sessions', () => {
  it('deletes expired sessions only, never users', async () => {
    const u = await makeUser(t.db);
    const expired = await makeSession(t.db, u, ago(1));
    const atNow = await makeSession(t.db, u, NOW);
    const live = await makeSession(t.db, u, new Date(NOW.getTime() + DAY));
    expect(await sweepExpiredSessions(ctx)).toEqual({ deleted: 1 });
    const left = new Set((await t.db.select({ id: sessions.id }).from(sessions)).map((r) => r.id));
    expect(left.has(expired)).toBe(false);
    expect(left.has(atNow)).toBe(true);
    expect(left.has(live)).toBe(true);
    expect((await userIds(t.db)).has(u)).toBe(true);
  });
});

describe('deleteInBatches', () => {
  it('rejects a bad batch size', async () => {
    await expect(deleteInBatches(t.db, () => sql`SELECT 1`, 0)).rejects.toThrow(/positive integer/);
  });

  it('stops when the signal is aborted', async () => {
    const ac = new AbortController();
    ac.abort(new Error('stopping'));
    await expect(deleteInBatches(t.db, () => sql`SELECT 1`, 10, ac.signal)).rejects.toThrow('stopping');
  });
});

describe('allJobs', () => {
  it('declares every job with a UTC cron and a handler that runs on an empty database', async () => {
    const jobs = allJobs({ unconsentedAccountTtlDays: 30 });
    expect(jobs.map((j) => j.name).sort()).toEqual(Object.values(JOB_NAMES).sort());
    for (const job of jobs) {
      expect(job.cron?.split(' ')).toHaveLength(5);
      expect(job.options.policy).toBe('stately');
      expect(job.options.retryLimit).toBeGreaterThan(0);
      const emptyAi: Record<string, unknown> = {
        [JOB_NAMES.aiJobs]: { ran: 0 },
        [JOB_NAMES.creditsSweepReservations]: { refunded: 0 },
        [JOB_NAMES.aiIndexContent]: { chapters: 0, inserted: 0, removed: 0, embedded: 0, failed: 0 },
        [JOB_NAMES.aiRetention]: { messages: 0, conversations: 0, jobs: 0, uploads: 0 },
        [JOB_NAMES.aiCostGuardrail]: { actions: [], alerts: 0, invariants: { negativeBalances: [], unresolvedExpired: 0, doubleResolved: 0 } },
      };
      const empty =
        job.name in emptyAi ? emptyAi[job.name] : job.name === JOB_NAMES.attemptsAutoSubmit ? { submitted: 0, failed: 0 } : job.name === JOB_NAMES.liveFinalize ? { events: 0, autoSubmitted: 0, ranked: 0 } : job.name === JOB_NAMES.billingReconcile ? { skipped: 'no_provider' } : job.name === JOB_NAMES.billingExpire ? { ordersExpired: 0, subscriptionsResynced: 0, entitlementsLapsed: 0, errors: 0 } : { deleted: 0 };
      expect(await job.handler(ctx, null)).toEqual(empty);
    }
  });

  it('passes the configured TTL to account.purge-unconsented', async () => {
    const u = await makeUser(t.db, { createdAt: ago(6) });
    const job = allJobs({ unconsentedAccountTtlDays: 5 }).find((j) => j.name === JOB_NAMES.accountPurgeUnconsented)!;
    expect(await job.handler(ctx, null)).toEqual({ deleted: 1 });
    expect((await t.db.select().from(users).where(eq(users.id, u))).length).toBe(0);
  });
});

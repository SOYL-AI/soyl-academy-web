import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PgBoss } from 'pg-boss';
import { verifications } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { allJobs, JOB_NAMES } from '../src/jobs';
import { memoryLogger } from '../src/logger';
import { assertValidJobs, defineJob, registerJobs, type BossLike, type JobDefinition } from '../src/registry';
import { NOW, ago, makeVerification, waitForJob } from './helpers';

type Call = [string, ...unknown[]];

function fakeBoss(existing: Record<string, { policy: string }> = {}) {
  const calls: Call[] = [];
  const handlers = new Map<string, (jobs: unknown[]) => Promise<unknown>>();
  const boss = {
    getQueue: async (name: string) => (existing[name] ? { name, ...existing[name] } : null),
    createQueue: async (name: string, options: unknown) => void calls.push(['createQueue', name, options]),
    updateQueue: async (name: string, options: unknown) => void calls.push(['updateQueue', name, options]),
    work: async (name: string, options: unknown, handler: (jobs: unknown[]) => Promise<unknown>) => {
      calls.push(['work', name, options]);
      handlers.set(name, handler);
      return `worker-${name}`;
    },
    schedule: async (name: string, cron: string, data: unknown, options: unknown) => void calls.push(['schedule', name, cron, data, options]),
    unschedule: async (name: string) => void calls.push(['unschedule', name]),
  } as unknown as BossLike;
  return { boss, calls, handlers };
}

const fakeJob = (data: unknown = {}) => ({ id: 'job-1', name: 'x', data, retryCount: 0, signal: new AbortController().signal });

describe('assertValidJobs', () => {
  const base = { description: 'd', options: {}, handler: async () => null };
  it('rejects bad names, duplicates and malformed crons', () => {
    expect(() => assertValidJobs([{ ...base, name: 'NoDot' }])).toThrow(/invalid job name/);
    expect(() => assertValidJobs([{ ...base, name: 'a.b' }, { ...base, name: 'a.b' }])).toThrow(/duplicate/);
    expect(() => assertValidJobs([{ ...base, name: 'a.b', cron: '* * *' }])).toThrow(/5 fields/);
    expect(() => assertValidJobs(allJobs())).not.toThrow();
  });
});

describe('registerJobs (fake boss)', () => {
  const db = {} as never;

  it('creates queues, starts a worker per queue, schedules crons in UTC and unschedules cron-less jobs', async () => {
    const log = memoryLogger();
    const { boss, calls } = fakeBoss();
    const onDemand = defineJob<unknown, null>({ name: 'test.on-demand', description: 'd', options: { retryLimit: 1 }, handler: async () => null });
    const jobs = [...allJobs(), onDemand as JobDefinition];
    const registered = await registerJobs(boss, jobs, { db, log, pollingIntervalSeconds: 1 });

    expect(registered.map((r) => r.name)).toEqual(jobs.map((j) => j.name));
    for (const job of allJobs()) {
      expect(calls).toContainEqual(['createQueue', job.name, job.options]);
      expect(calls).toContainEqual(['work', job.name, { batchSize: 1, pollingIntervalSeconds: 1 }]);
      expect(calls).toContainEqual(['schedule', job.name, job.cron, null, { tz: 'UTC' }]);
    }
    expect(calls).toContainEqual(['unschedule', 'test.on-demand']);
    expect(registered.find((r) => r.name === 'test.on-demand')).toEqual({ name: 'test.on-demand', cron: null, workerId: 'worker-test.on-demand' });
    expect(log.lines.some((l) => l.msg === 'jobs registered')).toBe(true);
  });

  it('updates existing queues (without policy) and warns when the policy differs', async () => {
    const log = memoryLogger();
    const { boss, calls } = fakeBoss({ [JOB_NAMES.accountPurge]: { policy: 'standard' }, [JOB_NAMES.sweepSessions]: { policy: 'stately' } });
    await registerJobs(boss, allJobs(), { db, log });
    const update = calls.find((c) => c[0] === 'updateQueue' && c[1] === JOB_NAMES.accountPurge);
    expect(update?.[2]).not.toHaveProperty('policy');
    expect(update?.[2]).toMatchObject({ retryLimit: 3 });
    expect(calls.some((c) => c[0] === 'createQueue' && c[1] === JOB_NAMES.accountPurge)).toBe(false);
    const warnings = log.lines.filter((l) => l.level === 'warn');
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatchObject({ queue: JOB_NAMES.accountPurge, current: 'standard', wanted: 'stately' });
    // default polling interval
    expect(calls).toContainEqual(['work', JOB_NAMES.accountPurge, { batchSize: 1, pollingIntervalSeconds: 10 }]);
  });

  it('skips updateQueue when only the policy is declared', async () => {
    const { boss, calls } = fakeBoss({ 'test.only-policy': { policy: 'standard' } });
    const job = defineJob({ name: 'test.only-policy', description: 'd', options: { policy: 'standard' }, handler: async () => null });
    await registerJobs(boss, [job as JobDefinition], { db, log: memoryLogger() });
    expect(calls.some((c) => c[0] === 'updateQueue')).toBe(false);
  });

  it('wraps handlers: passes ctx with the clock, returns the result, reports success; rethrows failures', async () => {
    const log = memoryLogger();
    const { boss, handlers } = fakeBoss();
    const seen: unknown[] = [];
    const ok = defineJob<{ x: number }, { ok: true }>({
      name: 'test.ok',
      description: 'd',
      options: {},
      handler: async (ctx, data) => {
        seen.push(ctx.now.toISOString(), data, ctx.db, typeof ctx.log.info);
        return { ok: true };
      },
    });
    const bad = defineJob({ name: 'test.bad', description: 'd', options: {}, handler: async () => Promise.reject(new Error('boom')) });
    const successes: string[] = [];
    await registerJobs(boss, [ok as JobDefinition, bad as JobDefinition], { db, log, now: () => NOW, onJobSuccess: (n) => successes.push(n) });

    await expect(handlers.get('test.ok')!([fakeJob({ x: 1 })])).resolves.toEqual({ ok: true });
    expect(seen).toEqual([NOW.toISOString(), { x: 1 }, db, 'function']);
    expect(successes).toEqual(['test.ok']);
    expect(log.lines.find((l) => l.msg === 'job completed')).toMatchObject({ job: 'test.ok', jobId: 'job-1', result: { ok: true } });

    await expect(handlers.get('test.bad')!([fakeJob()])).rejects.toThrow('boom');
    expect(log.lines.find((l) => l.msg === 'job failed')).toMatchObject({ job: 'test.bad', err: { name: 'Error', message: 'boom' } });
    expect(successes).toEqual(['test.ok']);
  });
});

describe('registerJobs (real pg-boss on the test database)', () => {
  let t: TestDb;
  let boss: PgBoss;

  beforeAll(async () => {
    t = await createTestDb();
    boss = new PgBoss({ connectionString: t.url, schema: 'pgboss', migrate: true, supervise: false, max: 3 });
    boss.on('error', () => {});
    await boss.start();
  });
  afterAll(async () => {
    await boss?.stop({ graceful: false });
    await t?.close();
  });

  it('registers every job, stores UTC schedules, and processes a sent job end-to-end', async () => {
    const log = memoryLogger();
    const registered = await registerJobs(boss, allJobs(), { db: t.db, log, pollingIntervalSeconds: 0.5 });
    expect(registered).toHaveLength(Object.keys(JOB_NAMES).length);

    const queues = await boss.getQueues(Object.values(JOB_NAMES));
    expect(queues.map((q) => q.name).sort()).toEqual(Object.values(JOB_NAMES).sort());
    for (const q of queues) {
      expect(q.policy).toBe('stately');
      expect(q.retryLimit).toBe(q.name === JOB_NAMES.attemptsAutoSubmit || q.name === JOB_NAMES.liveFinalize ? 2 : 3);
    }
    const schedules = await boss.getSchedules();
    expect(schedules.map((s) => [s.name, s.cron, s.timezone]).sort()).toEqual(
      allJobs()
        .map((j) => [j.name, j.cron, 'UTC'])
        .sort(),
    );

    const expired = await makeVerification(t.db, ago(1, new Date()));
    const live = await makeVerification(t.db, new Date(Date.now() + 10 * 60_000));
    const id = await boss.send(JOB_NAMES.sweepVerifications, {});
    expect(id).toBeTruthy();
    const job = await waitForJob(boss, JOB_NAMES.sweepVerifications, id!);
    expect(job.state).toBe('completed');
    expect(job.output).toEqual({ deleted: 1 });

    const left = (await t.db.select({ id: verifications.id }).from(verifications)).map((r) => r.id);
    expect(left).toEqual([live]);
    expect(left).not.toContain(expired);

    // Registering again (another replica, a restart) is harmless.
    await expect(registerJobs(boss, allJobs(), { db: t.db, log, pollingIntervalSeconds: 0.5 })).resolves.toHaveLength(Object.keys(JOB_NAMES).length);
  });
});

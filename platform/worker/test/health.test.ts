import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createDb } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { checkDatabase, createHealthServer } from '../src/health';
import { memoryLogger } from '../src/logger';
import { httpGet } from './helpers';

let t: TestDb;
beforeAll(async () => {
  t = await createTestDb();
});
afterAll(async () => {
  await t?.close();
});

describe('checkDatabase', () => {
  it('is true for a working pool', async () => {
    expect(await checkDatabase(t.pool)).toBe(true);
  });

  it('is false for a closed pool', async () => {
    const { pool } = createDb(t.url, { max: 1 });
    await pool.end();
    expect(await checkDatabase(pool)).toBe(false);
  });

  it('is false for an unreachable server', async () => {
    const { pool, close } = createDb('postgres://nobody:nothing@127.0.0.1:1/none', { max: 1, pool: { connectionTimeoutMillis: 1000 } });
    expect(await checkDatabase(pool)).toBe(false);
    await close();
  });

  it('is false when the query does not answer in time', async () => {
    const hanging = { query: () => new Promise(() => {}) } as never;
    expect(await checkDatabase(hanging, 50)).toBe(false);
  });
});

describe('health server', () => {
  it('serves /healthz, /readyz and 404 with no internal detail', async () => {
    let live = false;
    let ready = true;
    const health = createHealthServer({ isLive: () => live, isReady: async () => ready, log: memoryLogger() });
    const port = await health.listen(0, '127.0.0.1');
    try {
      expect(await httpGet(port, '/healthz')).toEqual({ status: 503, body: '{"status":"starting"}' });
      live = true;
      expect(await httpGet(port, '/healthz')).toEqual({ status: 200, body: '{"status":"ok"}' });
      expect(await httpGet(port, '/healthz?probe=1')).toEqual({ status: 200, body: '{"status":"ok"}' });
      expect(await httpGet(port, '/readyz')).toEqual({ status: 200, body: '{"status":"ready"}' });
      ready = false;
      expect(await httpGet(port, '/readyz')).toEqual({ status: 503, body: '{"status":"not_ready"}' });
      expect(await httpGet(port, '/metrics')).toEqual({ status: 404, body: '{"status":"not_found"}' });
      expect((await httpGet(port, '/healthz', 'POST')).status).toBe(404);
      expect((await httpGet(port, '/healthz', 'HEAD')).status).toBe(200);
    } finally {
      await health.close();
      await health.close(); // idempotent
    }
  });

  it('answers 503 when the readiness check throws, and logs a warning', async () => {
    const log = memoryLogger();
    const health = createHealthServer({ isLive: () => true, isReady: () => Promise.reject(new Error('postgres://u:secret@db/x down')), log });
    const port = await health.listen(0, '127.0.0.1');
    try {
      expect(await httpGet(port, '/readyz')).toEqual({ status: 503, body: '{"status":"not_ready"}' });
      const line = log.lines.find((l) => l.msg === 'readiness check threw');
      expect(JSON.stringify(line)).not.toContain('secret');
    } finally {
      await health.close();
    }
  });

  it('rejects listen when the port is taken; close before listen is a no-op', async () => {
    const a = createHealthServer({ isLive: () => true, isReady: async () => true, log: memoryLogger() });
    const b = createHealthServer({ isLive: () => true, isReady: async () => true, log: memoryLogger() });
    await b.close();
    const port = await a.listen(0, '127.0.0.1');
    try {
      await expect(b.listen(port, '127.0.0.1')).rejects.toThrow(/EADDRINUSE/);
    } finally {
      await a.close();
    }
  });
});

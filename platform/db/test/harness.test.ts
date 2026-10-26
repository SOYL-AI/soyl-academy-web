/** `@soyl/db/testing`: isolated databases on one shared server, cleaned up on close. */
import pg from 'pg';
import { describe, expect, it } from 'vitest';
import { sql } from 'drizzle-orm';
import { createTestDb, testServerUrl } from '../src/testing';
import { users } from '../schema/index';

async function databaseExists(name: string) {
  const c = new pg.Client({ connectionString: await testServerUrl() });
  await c.connect();
  try {
    return (await c.query('SELECT 1 FROM pg_database WHERE datname = $1', [name])).rowCount === 1;
  } finally {
    await c.end();
  }
}

describe('createTestDb', () => {
  it('uses one shared server for the run (global setup) unless TEST_DATABASE_URL is set', async () => {
    const url = await testServerUrl();
    if (process.env.TEST_DATABASE_URL) expect(url).toBe(process.env.TEST_DATABASE_URL);
    else if (!process.env.DATABASE_URL) expect(url).toBe(process.env.SOYL_TEST_SERVER_URL);
  });

  it('creates isolated, migrated databases in parallel and drops them on close', async () => {
    const dbs = await Promise.all([createTestDb(), createTestDb(), createTestDb()]);
    expect(new Set(dbs.map((d) => d.name)).size).toBe(3);
    await dbs[0]!.db.insert(users).values({ name: 'Only here', email: 'only-here@example.com' });
    const counts = await Promise.all(dbs.map(async (d) => (await d.db.select().from(users)).length));
    expect(counts).toEqual([1, 0, 0]);
    for (const d of dbs) {
      await d.close();
      expect(await databaseExists(d.name)).toBe(false);
    }
  });

  it('gives an empty database with migrate: false', async () => {
    const d = await createTestDb({ migrate: false });
    try {
      const r = await d.db.execute<{ n: number }>(sql`SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema = 'public'`);
      expect(r.rows[0]!.n).toBe(0);
    } finally {
      await d.close();
    }
  });
});

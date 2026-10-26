/**
 * DATABASE_AUTH=entra (INFRA-2): node-postgres gets an async password function that returns a fresh
 * managed-identity token for every new connection. Azure is emulated with a LOGIN role whose password
 * is the current "token": rotating the role's password is what a token expiry looks like, so a pool
 * that still sent the old token would fail to open new connections.
 */
import { randomBytes } from 'node:crypto';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { sql } from 'drizzle-orm';
import { AZURE_RESOURCES, REFRESH_MARGIN_MS, StaticTokenProvider } from '@soyl/shared/azure/identity';
import { createDb, databaseAuthMode, entraPassword, pgConnectionConfig, pgPasswordFromEnv } from '../src/client';
import { createTestDb, type TestDb } from '../src/testing';

let t: TestDb;
let admin: pg.Client;
const role = `soyl_entra_${randomBytes(4).toString('hex')}`;
let roleUrl: string;
let passwordAuthEnforced = true;

async function setPassword(p: string) {
  await admin.query(`ALTER ROLE ${role} PASSWORD '${p}'`);
}

beforeAll(async () => {
  t = await createTestDb({ migrate: false });
  admin = new pg.Client({ connectionString: t.url });
  await admin.connect();
  await admin.query(`CREATE ROLE ${role} LOGIN PASSWORD 'token-1'`);
  await admin.query(`GRANT CONNECT ON DATABASE ${admin.escapeIdentifier(t.name)} TO ${role}`);
  const u = new URL(t.url);
  u.username = role;
  u.password = '';
  roleUrl = u.toString();
  // Some CI/local servers trust localhost connections; then only the token plumbing can be checked.
  const probe = new pg.Client(pgConnectionConfig(roleUrl, async () => 'definitely-wrong'));
  passwordAuthEnforced = await probe.connect().then(
    () => false,
    () => true,
  );
  await probe.end().catch(() => {});
  console.info(`entra-auth test: password auth enforced by this server: ${passwordAuthEnforced}`);
});

afterAll(async () => {
  await admin?.query(`DROP OWNED BY ${role}`).catch(() => {});
  await admin?.query(`DROP ROLE IF EXISTS ${role}`).catch(() => {});
  await admin?.end();
  await t?.close();
});

describe('DATABASE_AUTH', () => {
  it('defaults to password and accepts entra', () => {
    expect(databaseAuthMode({})).toBe('password');
    expect(databaseAuthMode({ DATABASE_AUTH: 'entra' })).toBe('entra');
    expect(() => databaseAuthMode({ DATABASE_AUTH: 'kerberos' })).toThrow(/DATABASE_AUTH/);
    expect(pgPasswordFromEnv({})).toBeUndefined();
    expect(typeof pgPasswordFromEnv({ DATABASE_AUTH: 'entra' }, new StaticTokenProvider(() => ({ token: 'x', expiresOnTimestamp: 0 })))).toBe('function');
  });

  it('keeps the password function (a parsed URL would otherwise override it with "")', () => {
    const fn = async () => 'tok';
    const c = pgConnectionConfig('postgresql://id-soyl-api-prod@psql.example.com:5432/soyl?sslmode=verify-full', fn);
    expect(c.password).toBe(fn);
    expect(c.user).toBe('id-soyl-api-prod');
    expect(c.host).toBe('psql.example.com');
    expect(c.database).toBe('soyl');
    expect(Number(c.port)).toBe(5432);
    expect(c.ssl).toBeTruthy();
    expect((c as { connectionString?: string }).connectionString).toBeUndefined();
    expect(() => pgConnectionConfig('postgresql://u:secret@h/db', fn)).toThrow(/must not contain a password/);
  });
});

describe('Entra token as the Postgres password', () => {
  it('asks for a postgres-audience token per new connection and picks up a rotated token', async () => {
    let now = Date.now();
    let current = 'token-1';
    const issued: string[] = [];
    // Behaves like the managed-identity provider: caches the token until 5 min before expiry.
    let cached: { token: string; exp: number } | null = null;
    const provider = new StaticTokenProvider((resource) => {
      expect(resource).toBe(AZURE_RESOURCES.postgres);
      if (!cached || cached.exp - now <= REFRESH_MARGIN_MS) {
        cached = { token: current, exp: now + 60 * 60_000 };
        issued.push(current);
      }
      return { token: cached.token, expiresOnTimestamp: cached.exp };
    });

    const { db, pool, close } = createDb(roleUrl, { max: 2, password: entraPassword(provider), pool: { idleTimeoutMillis: 50 } });
    try {
      const who = await db.execute<{ u: string }>(sql`select current_user as u`);
      expect(who.rows[0]!.u).toBe(role);
      expect(issued).toEqual(['token-1']);

      // A long-lived connection keeps working after the "token" is rotated (Postgres checks it only at login).
      const held = await pool.connect();
      await setPassword('token-2');
      current = 'token-2';
      expect((await held.query('select 1 as ok')).rows[0].ok).toBe(1);
      held.release(true); // discard it so the next query needs a new connection

      // The cached token is still within its lifetime: a new connection reuses it...
      await new Promise((r) => setTimeout(r, 120)); // let idle clients close
      if (passwordAuthEnforced) await expect(pool.query('select 1')).rejects.toThrow();
      // ...until the provider's refresh window, when a fresh token is fetched for new connections.
      now += 60 * 60_000 - REFRESH_MARGIN_MS + 1000;
      await new Promise((r) => setTimeout(r, 120));
      expect((await pool.query('select 2 as ok')).rows[0].ok).toBe(2);
      expect(issued).toEqual(['token-1', 'token-2']);
      expect(provider.calls).toBeGreaterThanOrEqual(3);
    } finally {
      await close();
    }
  });

  it('a wrong token is refused (fail closed, no fallback to another credential)', async () => {
    if (!passwordAuthEnforced) return; // trust auth on this server: nothing to prove
    const { pool, close } = createDb(roleUrl, { max: 1, password: async () => 'not-the-token' });
    try {
      await expect(pool.query('select 1')).rejects.toThrow(/password authentication failed/);
    } finally {
      await close();
    }
  });

  it('createDb uses the token function from DATABASE_AUTH=entra by default', async () => {
    const before = process.env.DATABASE_AUTH;
    process.env.DATABASE_AUTH = 'entra';
    try {
      // The default provider is the managed identity / Azure CLI; only the wiring is checked here.
      const { pool, close } = createDb(roleUrl, { max: 1 });
      expect(typeof (pool.options as { password?: unknown }).password).toBe('function');
      expect((pool.options as { maxLifetimeSeconds?: number }).maxLifetimeSeconds).toBe(30 * 60);
      await close();
    } finally {
      if (before === undefined) delete process.env.DATABASE_AUTH;
      else process.env.DATABASE_AUTH = before;
    }
  });
});

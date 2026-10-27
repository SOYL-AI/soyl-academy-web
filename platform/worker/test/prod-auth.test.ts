/** Production auth wiring: Entra Postgres tokens for pg-boss, and the AUTH-15 purge guard. */
import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config';
import { allJobs, JOB_NAMES } from '../src/jobs';
import { bossOptions } from '../src/worker';

const PROD = { APP_ENV: 'prod', DATABASE_URL: 'postgresql://id-soyl-worker-prod@psql.example.com:5432/soyl?sslmode=verify-full' };

describe('DATABASE_AUTH=entra', () => {
  it('is parsed from the environment (default password)', () => {
    expect(loadConfig({ APP_ENV: 'test' }).databaseAuth).toBe('password');
    expect(loadConfig({ ...PROD, DATABASE_AUTH: 'entra' }).databaseAuth).toBe('entra');
    expect(() => loadConfig({ ...PROD, DATABASE_AUTH: 'nope' })).toThrow(/DATABASE_AUTH/);
  });

  it('pg-boss gets the token function and parsed fields instead of a connection string', () => {
    const config = loadConfig({ ...PROD, DATABASE_AUTH: 'entra' });
    const password = async () => 'token';
    const o = bossOptions(config, PROD.DATABASE_URL, password) as Record<string, unknown>;
    expect(o.connectionString).toBeUndefined();
    expect(o.password).toBe(password);
    expect(o).toMatchObject({ user: 'id-soyl-worker-prod', host: 'psql.example.com', database: 'soyl', migrate: false, schema: 'pgboss' });
    expect(o.ssl).toBeTruthy();
    // Password auth (local/CI) is unchanged.
    expect(bossOptions(config, 'postgres://u:p@h/d')).toMatchObject({ connectionString: 'postgres://u:p@h/d' });
  });
});

describe('AUTH-15 purge guard', () => {
  const names = (purge: boolean) => allJobs({ unconsentedPurge: purge }).map((j) => j.name);

  it('is on by default and with a real consent provider', () => {
    expect(loadConfig({ APP_ENV: 'test' }).unconsentedPurge).toBe(true);
    expect(loadConfig({ ...PROD, CONSENT_PROVIDER: 'owner' }).unconsentedPurge).toBe(true);
    expect(names(true)).toContain(JOB_NAMES.accountPurgeUnconsented);
  });

  it('is off with CONSENT_PROVIDER=unavailable (nobody can reach granted), unless forced on', () => {
    expect(loadConfig({ ...PROD, CONSENT_PROVIDER: 'unavailable' }).unconsentedPurge).toBe(false);
    expect(loadConfig({ ...PROD, CONSENT_PROVIDER: 'unavailable', UNCONSENTED_PURGE: 'on' }).unconsentedPurge).toBe(true);
    // D-039: with the built-in provider consent is optional for learning, so auto keeps the purge off too.
    expect(loadConfig({ ...PROD, CONSENT_PROVIDER: 'builtin' }).unconsentedPurge).toBe(false);
    expect(loadConfig({ ...PROD, CONSENT_PROVIDER: 'builtin', UNCONSENTED_PURGE: 'on' }).unconsentedPurge).toBe(true);
    expect(loadConfig({ ...PROD, UNCONSENTED_PURGE: 'off' }).unconsentedPurge).toBe(false);
    expect(names(false)).not.toContain(JOB_NAMES.accountPurgeUnconsented);
    expect(names(false)).toContain(JOB_NAMES.accountPurge);
  });
});

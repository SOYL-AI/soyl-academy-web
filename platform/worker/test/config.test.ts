import { describe, expect, it } from 'vitest';
import { ConfigError, loadConfig } from '../src/config';

const URL = 'postgres://app@db.internal:5432/soyl';

describe('loadConfig', () => {
  it('has local defaults', () => {
    const c = loadConfig({});
    expect(c).toMatchObject({
      appEnv: 'local',
      isLocal: true,
      databaseUrl: undefined,
      healthPort: 8081,
      healthHost: '0.0.0.0',
      logLevel: 'info',
      pgboss: { schema: 'pgboss', migrate: true, appRole: 'soyl_app' },
      unconsentedAccountTtlDays: 30,
      shutdownTimeoutMs: 20_000,
    });
  });

  it('requires DATABASE_URL outside local/test', () => {
    for (const APP_ENV of ['dev', 'stg', 'prod']) {
      expect(() => loadConfig({ APP_ENV })).toThrow(ConfigError);
      expect(() => loadConfig({ APP_ENV })).toThrow(`DATABASE_URL is required when APP_ENV=${APP_ENV}`);
    }
    expect(() => loadConfig({ APP_ENV: 'test' })).not.toThrow();
  });

  it('defaults PGBOSS_MIGRATE to true only for local/test', () => {
    expect(loadConfig({ APP_ENV: 'test' }).pgboss.migrate).toBe(true);
    expect(loadConfig({ APP_ENV: 'local' }).pgboss.migrate).toBe(true);
    expect(loadConfig({ APP_ENV: 'dev', DATABASE_URL: URL }).pgboss.migrate).toBe(false);
    expect(loadConfig({ APP_ENV: 'stg', DATABASE_URL: URL }).pgboss.migrate).toBe(false);
    expect(loadConfig({ APP_ENV: 'prod', DATABASE_URL: URL }).pgboss.migrate).toBe(false);
  });

  it('accepts explicit PGBOSS_MIGRATE values, but never true in stg/prod (DB-1)', () => {
    expect(loadConfig({ APP_ENV: 'test', PGBOSS_MIGRATE: 'false' }).pgboss.migrate).toBe(false);
    expect(loadConfig({ APP_ENV: 'test', PGBOSS_MIGRATE: '0' }).pgboss.migrate).toBe(false);
    expect(loadConfig({ APP_ENV: 'dev', DATABASE_URL: URL, PGBOSS_MIGRATE: '1' }).pgboss.migrate).toBe(true);
    expect(() => loadConfig({ APP_ENV: 'prod', DATABASE_URL: URL, PGBOSS_MIGRATE: 'true' })).toThrow(/PGBOSS_MIGRATE must be false/);
    expect(() => loadConfig({ APP_ENV: 'stg', DATABASE_URL: URL, PGBOSS_MIGRATE: 'true' })).toThrow(/DB-1/);
    expect(() => loadConfig({ PGBOSS_MIGRATE: 'yes' })).toThrow(ConfigError);
  });

  it('treats empty strings as unset', () => {
    const c = loadConfig({ APP_ENV: 'test', PGBOSS_MIGRATE: '', WORKER_HEALTH_PORT: '', DATABASE_URL: '' });
    expect(c.pgboss.migrate).toBe(true);
    expect(c.healthPort).toBe(8081);
    expect(c.databaseUrl).toBeUndefined();
  });

  it('parses overrides and validates them', () => {
    const c = loadConfig({
      APP_ENV: 'prod',
      DATABASE_URL: URL,
      WORKER_HEALTH_PORT: '9000',
      PGBOSS_SCHEMA: 'jobs',
      PGBOSS_APP_ROLE: 'worker_app',
      LOG_LEVEL: 'warn',
      UNCONSENTED_ACCOUNT_TTL_DAYS: '45',
      WORKER_SHUTDOWN_TIMEOUT_MS: '5000',
    });
    expect(c).toMatchObject({
      appEnv: 'prod',
      isLocal: false,
      databaseUrl: URL,
      healthPort: 9000,
      logLevel: 'warn',
      pgboss: { schema: 'jobs', migrate: false, appRole: 'worker_app' },
      unconsentedAccountTtlDays: 45,
      shutdownTimeoutMs: 5000,
    });
    for (const bad of [
      { APP_ENV: 'production' },
      { PGBOSS_SCHEMA: 'Bad-Schema' },
      { PGBOSS_SCHEMA: 'x; drop table users' },
      { PGBOSS_APP_ROLE: 'Role' },
      { WORKER_HEALTH_PORT: '70000' },
      { UNCONSENTED_ACCOUNT_TTL_DAYS: '0' },
      { LOG_LEVEL: 'loud' },
    ]) {
      expect(() => loadConfig(bad), JSON.stringify(bad)).toThrow(ConfigError);
    }
  });

  it('lists every problem in the error', () => {
    try {
      loadConfig({ APP_ENV: 'prod', PGBOSS_MIGRATE: 'true' });
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigError);
      expect((err as ConfigError).problems).toHaveLength(2);
    }
  });
});

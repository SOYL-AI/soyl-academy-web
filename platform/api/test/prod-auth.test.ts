/**
 * Production auth configuration (D-031): email OTP only (AUTH_METHODS), ACS email with the managed
 * identity, CONSENT_PROVIDER=unavailable, Entra auth for Azure Managed Redis.
 */
import { randomBytes, randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import RedisMock from 'ioredis-mock';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { AZURE_RESOURCES, REFRESH_MARGIN_MS, StaticTokenProvider } from '@soyl/shared/azure/identity';
import { CONSENT } from '@soyl/shared/config/security';
import { buildApp, type App } from '../src/app';
import { FakeClock } from '../src/clock';
import { loadConfig } from '../src/config';
import { createProviders } from '../src/providers';
import { MemoryKv, RedisKv, createKv, redisTlsOptions } from '../src/kv';
import { AcsEmailSender, MockEmailSender, otpEmail } from '../src/auth/senders/email';
import { DisabledSmsSender } from '../src/auth/senders/disabled';
import { UnavailableConsentProvider } from '../src/consent/unavailable';
import { MEMBER_ROLES } from '../src/policy';
import { Client, ORIGIN, PUBLIC_BASE, type Harness } from './helpers';

const secret = () => randomBytes(32).toString('base64url');
const S = (c: string) => c.repeat(40);

/** The production env as Bicep sets it (values are fakes). */
const prodEnv = {
  APP_ENV: 'prod',
  PUBLIC_BASE_URL: 'https://www.soylai.com',
  DATABASE_URL: 'postgresql://id-soyl-api-prod@psql-soyl-prod.postgres.database.azure.com:5432/soyl?sslmode=verify-full',
  DATABASE_AUTH: 'entra',
  REDIS_URL: 'rediss://redis-soyl-prod.centralindia.redis.azure.net:10000',
  REDIS_AUTH: 'entra',
  REDIS_USERNAME: '00000000-0000-0000-0000-000000000001',
  EDGE_SECRET_CURRENT: S('a'),
  EDGE_SECRET_PREVIOUS: S('a'),
  AUTH_SECRET: S('b'),
  OTP_PEPPER: S('c'),
  MFA_ENCRYPTION_KEY: Buffer.alloc(32, 7).toString('base64'),
  AUTH_METHODS: 'email',
  EMAIL_PROVIDER: 'acs',
  ACS_ENDPOINT: 'https://acs-soyl-prod.india.communication.azure.com',
  EMAIL_FROM: 'noreply@soylai.com',
  CONSENT_PROVIDER: 'unavailable',
  PLATFORM_ENABLED: 'false',
};

describe('production config (D-031)', () => {
  it('loads with email only: no Google, SMS or consent-system settings needed', () => {
    const c = loadConfig(prodEnv);
    expect(c.authMethods).toEqual(['email']);
    expect(c.google.clientId).toBe('');
    expect(c.edgeSecrets).toEqual([S('a')]); // current = previous right after the first deploy: deduplicated
    expect(c).toMatchObject({ databaseAuth: 'entra', redis: { auth: 'entra', username: prodEnv.REDIS_USERNAME }, consent: { provider: 'unavailable' } });
    expect(c.email).toMatchObject({ provider: 'acs', acsEndpoint: prodEnv.ACS_ENDPOINT, from: 'noreply@soylai.com' });
  });

  it('EDGE_SECRET_CURRENT + EDGE_SECRET_PREVIOUS give two valid secrets during rotation', () => {
    expect(loadConfig({ ...prodEnv, EDGE_SECRET_PREVIOUS: S('d') }).edgeSecrets).toEqual([S('a'), S('d')]);
  });

  it('GEN-3 still refuses mocks for ENABLED methods only', () => {
    // SMS mock is fine while phone is disabled (it is never constructed: a non-delivering sender is used).
    expect(() => loadConfig({ ...prodEnv, SMS_PROVIDER: 'mock' })).not.toThrow();
    expect(() => loadConfig({ ...prodEnv, AUTH_METHODS: 'email,phone', SMS_PROVIDER: 'mock' })).toThrow(/SMS_PROVIDER=mock cannot run/);
    expect(() => loadConfig({ ...prodEnv, EMAIL_PROVIDER: 'mock' })).toThrow(/EMAIL_PROVIDER=mock cannot run/);
    // Enabling Google requires its settings again.
    expect(() => loadConfig({ ...prodEnv, AUTH_METHODS: 'email,google' })).toThrow(/GOOGLE_CLIENT_ID is required/);
    expect(() => loadConfig({ ...prodEnv, AUTH_METHODS: 'email,google', GOOGLE_CLIENT_ID: 'x', GOOGLE_CLIENT_SECRET: 'y', GOOGLE_ISSUER: 'http://127.0.0.1:1' })).toThrow(/GOOGLE_ISSUER must be/);
  });

  it('providers: ACS with a managed-identity token, phone disabled, consent unavailable', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const fakeFetch = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(null, { status: 202 });
    }) as unknown as typeof fetch;
    const tokens = new StaticTokenProvider((resource) => ({ token: `mi-token-for:${resource}`, expiresOnTimestamp: Date.now() + 3600_000 }));
    const p = createProviders(loadConfig(prodEnv), { tokens, fetch: fakeFetch });
    expect(p.email).toBeInstanceOf(AcsEmailSender);
    expect(p.sms).toBeInstanceOf(DisabledSmsSender);
    expect(p.consent).toBeInstanceOf(UnavailableConsentProvider);
    expect([p.sms.isMock, p.email.isMock, p.consent.isMock]).toEqual([false, false, false]);

    await p.email.send(otpEmail('student@example.com', '482913', 10));
    const { url, init } = calls[0]!;
    expect(url).toBe('https://acs-soyl-prod.india.communication.azure.com/emails:send?api-version=2023-03-31');
    expect((init.headers as Record<string, string>).authorization).toBe(`Bearer mi-token-for:${AZURE_RESOURCES.communication}`);
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ senderAddress: 'noreply@soylai.com', recipients: { to: [{ address: 'student@example.com' }] }, userEngagementTrackingDisabled: true });
    await expect(p.sms.send({ to: '+919876543210', kind: 'notice', vars: { notice: 'x' } })).rejects.toThrow(/disabled/);
  });
});

describe('OTP email', () => {
  const m = otpEmail('a@example.com', '482913', 10);

  it('has the code, expiry and never-share warning in text and HTML', () => {
    expect(m.subject).toBe('482913 is your SOYL Academy sign-in code');
    expect(m.text).toMatch(/sign-in code is 482913/);
    expect(m.text).toMatch(/expires in 10 minutes/);
    expect(m.text).toMatch(/Never share this code/);
    expect(m.text.match(/\b\d{6}\b/)?.[0]).toBe('482913'); // the mock outbox reads the first 6-digit number
    expect(m.html).toContain('482913');
    expect(m.html).toMatch(/expires in <strong>10 minutes<\/strong>/);
    expect(m.html).toMatch(/Never share this code/);
    expect(m.html).toContain('SOYL');
  });

  it('has no external images, links, scripts or tracking', () => {
    const html = m.html!;
    expect(html).not.toMatch(/<img|<script|<a\s|<link|url\(|https?:\/\//i);
    expect(m.text).not.toMatch(/https?:\/\//);
  });

  it('escapes HTML in the code', () => {
    expect(otpEmail('a@example.com', '<b>1</b>', 10).html).toContain('&lt;b&gt;1&lt;/b&gt;');
  });
});

describe('Redis Entra auth (Azure Managed Redis)', () => {
  it('TLS with SNI for rediss://', () => {
    expect(redisTlsOptions('rediss://redis-soyl-prod.centralindia.redis.azure.net:10000')).toEqual({ tls: { servername: 'redis-soyl-prod.centralindia.redis.azure.net' } });
    expect(redisTlsOptions('redis://localhost:6379')).toEqual({});
  });

  it('createKv picks Entra auth from config', async () => {
    const tokens = new StaticTokenProvider(() => ({ token: 't', expiresOnTimestamp: Date.now() + 3600_000 }));
    const kv = createKv({ redisUrl: 'rediss://cache.example:10000', redis: { auth: 'entra', username: 'oid' } }, { tokens });
    expect(kv).toBeInstanceOf(RedisKv);
    await kv.close();
    expect(createKv({ redisUrl: undefined })).toBeInstanceOf(MemoryKv);
  });

  it('username = object id, password = token for redis.azure.com; re-AUTH before expiry', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
    try {
      let n = 0;
      const issued: string[] = [];
      const tokens = new StaticTokenProvider((resource) => {
        expect(resource).toBe(AZURE_RESOURCES.redis);
        const token = `redis-token-${++n}`;
        issued.push(token);
        return { token, expiresOnTimestamp: Date.now() + 60 * 60_000 };
      });
      const mock = new RedisMock();
      const auth = vi.fn(async (..._args: string[]) => 'OK');
      Object.assign(mock, { auth });
      const kv = new RedisKv('rediss://cache.example:10000', {}, `soyl-test:${randomUUID()}:`, mock as never, { username: 'mi-object-id', tokens });

      await kv.set('k', 'v', 60_000, Date.now());
      expect(await kv.get('k', Date.now())).toBe('v');
      expect(mock.options).toMatchObject({ username: 'mi-object-id', password: 'redis-token-1' });
      expect(issued).toEqual(['redis-token-1']); // one token for many commands

      // Live connection: just inside the refresh window the token is replaced with AUTH.
      (mock as unknown as { status: string }).status = 'ready';
      await vi.advanceTimersByTimeAsync(60 * 60_000 - REFRESH_MARGIN_MS + 2000);
      expect(issued).toEqual(['redis-token-1', 'redis-token-2']);
      expect(auth).toHaveBeenCalledWith('mi-object-id', 'redis-token-2');
      expect(mock.options.password).toBe('redis-token-2'); // reconnects use the new token
      await kv.close();
    } finally {
      vi.useRealTimers();
    }
  });

  it('a failed refresh is reported and retried; commands keep failing closed only if the first token fails', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
    try {
      let fail = false;
      let n = 0;
      const errors: unknown[] = [];
      const tokens = new StaticTokenProvider(() => {
        if (fail) throw new Error('identity endpoint down');
        return { token: `t${++n}`, expiresOnTimestamp: Date.now() + 60 * 60_000 };
      });
      const mock = new RedisMock();
      Object.assign(mock, { auth: vi.fn(async () => 'OK') });
      const kv = new RedisKv('rediss://c:10000', {}, `soyl-test:${randomUUID()}:`, mock as never, { username: 'oid', tokens, onRefreshError: (e) => errors.push(e), retryMs: 30_000 });
      await kv.ping();
      (mock as unknown as { status: string }).status = 'ready';
      fail = true;
      await vi.advanceTimersByTimeAsync(60 * 60_000 - REFRESH_MARGIN_MS + 2000);
      expect(errors).toHaveLength(1);
      await kv.ping(); // the authenticated connection keeps working
      fail = false;
      await vi.advanceTimersByTimeAsync(30_000);
      expect(mock.options.password).toBe('t2');
      await kv.close();

      // First token unavailable → the command fails closed (KvUnavailableError), then recovers.
      fail = true;
      const kv2 = new RedisKv('rediss://c:10000', {}, `soyl-test:${randomUUID()}:`, new RedisMock() as never, { username: 'oid', tokens });
      await expect(kv2.ping()).rejects.toThrow();
      fail = false;
      await expect(kv2.ping()).resolves.toBeUndefined();
      await kv2.close();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('email-only sign-in + CONSENT_PROVIDER=unavailable (app)', () => {
  let t: TestDb;
  let app: App;
  let h: Harness;
  const edgeSecrets: [string, string] = [secret(), secret()];

  beforeAll(async () => {
    t = await createTestDb();
    // APP_ENV=test so the email mock can deliver codes; everything else as in production.
    const config = loadConfig({
      APP_ENV: 'test',
      PLATFORM_ENABLED: 'true',
      PUBLIC_BASE_URL: PUBLIC_BASE,
      EDGE_SECRETS: edgeSecrets.join(','),
      AUTH_SECRET: secret(),
      OTP_PEPPER: secret(),
      AUTH_METHODS: 'email',
      CONSENT_PROVIDER: 'unavailable',
      LOG_LEVEL: 'silent',
    });
    const providers = createProviders(config);
    expect(providers.email).toBeInstanceOf(MockEmailSender);
    app = await buildApp(
      { config, db: t.db, kv: new MemoryKv(), clock: new FakeClock(Date.now()), providers },
      {
        extraRoutes: (a) => {
          a.post('/v1/test/ai', { config: { policy: { roles: [...MEMBER_ROLES], csrf: true, rateLimit: { buckets: [] }, consent: 'ai' } } }, async () => ({ ok: true }));
          a.post('/v1/test/leaderboard', { config: { policy: { roles: [...MEMBER_ROLES], csrf: true, rateLimit: { buckets: [] }, consent: 'leaderboards' } } }, async () => ({ ok: true }));
          a.post('/v1/test/attempt', { config: { policy: { roles: [...MEMBER_ROLES], csrf: true, rateLimit: { buckets: [] }, consent: 'test_attempts' } } }, async () => ({ ok: true }));
        },
      },
    );
    h = { app, edgeSecrets, email: providers.email } as unknown as Harness;
  });

  afterAll(async () => {
    await app?.close();
    await t?.close();
  });

  it('GET /v1/auth/methods lists only email, cacheable for guests, behind the edge secret', async () => {
    const c = new Client(h);
    const res = await c.get('/v1/auth/methods');
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ methods: ['email'], email: true, phone: false, google: false });
    expect(res.headers['cache-control']).toBe('public, max-age=300, s-maxage=300');
    expect((await c.get('/v1/auth/methods', { edge: null })).statusCode).toBe(403);
  });

  it.each([
    ['POST', '/v1/auth/phone/send-otp', { phoneNumber: '+919876543210' }],
    ['POST', '/v1/auth/phone/verify', { phoneNumber: '+919876543210', code: '123456' }],
    ['POST', '/v1/auth/phone/send-otp', { not: 'even valid' }],
    ['GET', '/v1/auth/google/start', undefined],
    ['GET', '/v1/auth/google/callback?state=x&code=y', undefined],
  ] as const)('%s %s → 404 method_disabled', async (method, url, body) => {
    const res = await new Client(h).request(method, url, body === undefined ? {} : { body });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ code: 'method_disabled', status: 404 });
  });

  it('disabled routes still require the edge secret and an allowed Origin first', async () => {
    const c = new Client(h);
    expect((await c.post('/v1/auth/phone/send-otp', { phoneNumber: '+919876543210' }, { edge: null })).statusCode).toBe(403);
    expect((await c.post('/v1/auth/phone/send-otp', { phoneNumber: '+919876543210' }, { origin: 'https://evil.example' })).json().code).toBe('origin_not_allowed');
  });

  it('email sign-in works; consent is pending and cannot be granted', async () => {
    const c = new Client(h);
    const { consent } = await c.signInEmail(`unavailable.${Date.now()}@example.com`);
    expect(consent).toBe('pending');
    const flow = await c.post('/v1/me/consent/start');
    expect(flow.statusCode).toBe(200);
    expect(flow.json()).toEqual({ status: 'pending', redirectUrl: null });
    const me = await c.get('/v1/me');
    expect(me.json().consent).toBe('pending');
    // Linking a phone is a disabled method too.
    expect((await c.post('/v1/auth/link/phone/send-otp', { phoneNumber: '+919876543210' })).json().code).toBe('method_disabled');
  });

  it('every consent-gated feature answers the friendly consent problem; tests/learning work', async () => {
    const c = new Client(h);
    await c.signInEmail(`gated.${Date.now()}@example.com`);
    for (const url of ['/v1/test/ai', '/v1/test/leaderboard']) {
      const res = await c.post(url);
      expect(res.statusCode).toBe(403);
      expect(res.json()).toMatchObject({ code: 'consent_required', title: 'A parent or guardian needs to give consent first.' });
    }
    // School is not collected at all since D-039 (it was gated under D-014): refused before any consent check.
    const school = await c.patch('/v1/me', { schoolId: randomUUID() });
    expect(school.statusCode).toBe(400);
    expect(school.json().code).toBe('validation_failed');
    // D-014: tests are not gated.
    expect((await c.post('/v1/test/attempt')).statusCode).toBe(200);
    expect(CONSENT.gatedFeatures).toEqual(expect.arrayContaining(['ai', 'leaderboards', 'rank_cards', 'profile_school_city']));
  });

  it('the Origin used by the client matches the allowlist', () => {
    expect(ORIGIN).toBe(PUBLIC_BASE);
  });
});

/**
 * Unit suites: config (GEN-3, API-1, AUTH-12), provider factory (GEN-3), senders with fake fetch,
 * KV stores, log redaction (API-14), return-to (AUTH-13), display names (AC-18), JSON shape (API-5),
 * masking (AUTH-14), OpenAPI drift.
 */
import { createHash, createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { Writable } from 'node:stream';
import { describe, expect, it } from 'vitest';
import pino from 'pino';
import { maskEmail, maskIdentifier, maskPhone, safeReturnTo } from '@soyl/shared/config/security';
import { ConfigError, DEV_DEFAULTS, loadConfig } from '../src/config';
import { createProviders, MockInProductionError } from '../src/providers';
import { AcsEmailSender, EmailDeliveryError, MockEmailSender, otpEmail } from '../src/auth/senders/email';
import { MockSmsSender, Msg91SmsSender, SmsDeliveryError } from '../src/auth/senders/sms';
import { MemoryKv, RedisKv, createKv, type KeyValueStore } from '../src/kv';
import { loggerOptions, pathWithoutQuery, scrub } from '../src/logging';
import { validateDisplayName } from '../src/domain/display-name';
import { jsonShapeProblem } from '../src/http/json';
import { matchEdgeSecret, trustedClientIp } from '../src/http/edge';
import { RateLimiter } from '../src/rate-limit';
import { FakeClock } from '../src/clock';
import { MockConsentProvider } from '../src/consent/mock';
import { generateOpenApi } from '../scripts/openapi';

const S = (c: string) => c.repeat(40);
const prodEnv = {
  APP_ENV: 'prod',
  PUBLIC_BASE_URL: 'https://www.soylai.com',
  DATABASE_URL: 'postgres://u@db/x',
  REDIS_URL: 'rediss://cache:6380',
  EDGE_SECRETS: S('a'),
  AUTH_SECRET: S('b'),
  OTP_PEPPER: S('c'),
  MFA_ENCRYPTION_KEY: Buffer.alloc(32, 7).toString('base64'),
  GOOGLE_CLIENT_ID: 'id',
  GOOGLE_CLIENT_SECRET: 'secret',
  SMS_PROVIDER: 'msg91',
  SMS_PROVIDER_API_KEY: 'k',
  SMS_DLT_TEMPLATE_IDS: '{"otp":"1107","notice":"1108"}',
  EMAIL_PROVIDER: 'acs',
  ACS_ENDPOINT: 'https://soyl.india.communication.azure.com',
  // D-031: production has no consent adapter yet (OA-08) and sends email with its managed identity.
  CONSENT_PROVIDER: 'unavailable',
};

describe('config', () => {
  it('local defaults work without any env', () => {
    const c = loadConfig({});
    expect(c).toMatchObject({ appEnv: 'local', isLocal: true, port: 8080, publicOrigin: 'http://localhost:3000', secureCookies: false, platformEnabled: false });
    expect(c.edgeSecrets).toEqual([DEV_DEFAULTS.edgeSecret]);
    expect(c.google.redirectUri).toBe('http://localhost:3000/api/platform/v1/auth/google/callback');
  });

  it('a complete production config loads', () => {
    const c = loadConfig(prodEnv);
    expect(c).toMatchObject({ isProduction: true, secureCookies: true, allowedOrigins: ['https://www.soylai.com'] });
    expect(c.google.issuer).toBe('https://accounts.google.com');
    expect(c.sms.templateIds).toEqual({ otp: '1107', notice: '1108' });
  });

  it('production never falls back to, or accepts, a DEV_DEFAULTS value (GEN-1, gitleaks placeholders)', () => {
    const vars: Record<keyof typeof DEV_DEFAULTS, string> = {
      edgeSecret: 'EDGE_SECRETS',
      authSecret: 'AUTH_SECRET',
      otpPepper: 'OTP_PEPPER',
      googleClientId: 'GOOGLE_CLIENT_ID',
      googleClientSecret: 'GOOGLE_CLIENT_SECRET',
      mfaEncryptionKey: 'MFA_ENCRYPTION_KEY',
    };
    for (const appEnv of ['dev', 'stg', 'prod'] as const) {
      const env = { ...prodEnv, APP_ENV: appEnv };
      const loaded = loadConfig(env);
      const values = [loaded.edgeSecrets.join(','), loaded.authSecret, loaded.otpPepper, loaded.google.clientId, loaded.google.clientSecret, loaded.mfaEncryptionKey.toString('base64')];
      for (const dev of Object.values(DEV_DEFAULTS)) expect(values.some((v) => v.includes(dev)), `${appEnv}: ${dev}`).toBe(false);
      for (const [key, name] of Object.entries(vars) as [keyof typeof DEV_DEFAULTS, string][]) {
        expect(() => loadConfig({ ...env, [name]: undefined }), `${appEnv} ${name} unset`).toThrow(new RegExp(`${name} is required`));
        expect(() => loadConfig({ ...env, [name]: DEV_DEFAULTS[key] }), `${appEnv} ${name} = dev default`).toThrow(new RegExp(`${name} uses the public development default`));
      }
    }
    expect(() => loadConfig({ ...prodEnv, MFA_ENCRYPTION_KEY: Buffer.alloc(16).toString('base64') })).toThrow(/MFA_ENCRYPTION_KEY must be 32 bytes/);
    expect(loadConfig({ APP_ENV: 'local' }).mfaEncryptionKey.length).toBe(32);
  });

  it.each([
    ['missing DATABASE_URL', { DATABASE_URL: undefined }, /DATABASE_URL is required/],
    ['missing REDIS_URL', { REDIS_URL: undefined }, /REDIS_URL is required/],
    ['missing edge secrets', { EDGE_SECRETS: undefined }, /EDGE_SECRETS is required/],
    ['three edge secrets', { EDGE_SECRETS: `${S('a')},${S('d')},${S('e')}` }, /at most two/],
    ['short edge secret', { EDGE_SECRETS: 'short' }, /at least 32/],
    ['dev edge secret', { EDGE_SECRETS: DEV_DEFAULTS.edgeSecret }, /public development default/],
    ['short auth secret', { AUTH_SECRET: 'x' }, /AUTH_SECRET must be at least 32/],
    ['http base URL', { PUBLIC_BASE_URL: 'http://www.soylai.com' }, /must be https/],
    ['wildcard origin', { ALLOWED_ORIGINS: 'https://*.vercel.app' }, /exact origin/],
    ['mock Google in prod (GEN-3)', { GOOGLE_ISSUER: 'http://127.0.0.1:9999' }, /GOOGLE_ISSUER must be/],
    ['dev OTP outbox in prod', { DEV_OTP_OUTBOX: 'true' }, /DEV_OTP_OUTBOX/],
    ['msg91 without template', { SMS_DLT_TEMPLATE_IDS: '{}' }, /SMS_DLT_TEMPLATE_IDS.otp/],
    ['bad template json', { SMS_DLT_TEMPLATE_IDS: 'nope' }, /JSON object/],
    ['acs without endpoint', { ACS_ENDPOINT: undefined }, /ACS_ENDPOINT is required/],
    ['acs access key in prod (keyless)', { ACS_EMAIL_ACCESS_KEY: 'a2V5' }, /not allowed in production/],
    ['mock consent in prod (GEN-3)', { CONSENT_PROVIDER: 'mock' }, /CONSENT_PROVIDER=mock cannot run/],
    ['unknown auth method', { AUTH_METHODS: 'email,carrier-pigeon' }, /unknown method/],
    ['no auth method', { AUTH_METHODS: ' , ' }, /at least one/],
    ['entra redis without username', { REDIS_AUTH: 'entra' }, /REDIS_USERNAME/],
    ['entra redis without TLS', { REDIS_AUTH: 'entra', REDIS_USERNAME: 'oid', REDIS_URL: 'redis://cache:10000' }, /rediss:\/\//],
    ['invalid APP_ENV', { APP_ENV: 'production' }, /APP_ENV/],
  ])('refuses %s', (_l, patch, re) => {
    expect(() => loadConfig({ ...prodEnv, ...patch })).toThrow(re);
  });

  it('ConfigError lists every problem', () => {
    try {
      loadConfig({ APP_ENV: 'stg' });
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigError);
      expect((err as ConfigError).problems.length).toBeGreaterThan(4);
    }
  });
});

describe('provider factory (GEN-3)', () => {
  it('local config gets mocks', () => {
    const p = createProviders(loadConfig({}));
    expect([p.sms.isMock, p.email.isMock, p.consent.isMock]).toEqual([true, true, true]);
  });

  it.each([
    ['SMS', { SMS_PROVIDER: 'mock' }],
    ['email', { EMAIL_PROVIDER: 'mock' }],
    ['consent', { CONSENT_PROVIDER: 'mock' }],
  ])('refuses the mock %s provider in production', (_l, patch) => {
    // Config refuses it first; the factory refuses it again if config is bypassed.
    expect(() => createProviders(loadConfig({ ...prodEnv, ...patch }))).toThrow(/GEN-3/);
    const bypass = { ...loadConfig({ ...prodEnv, APP_ENV: 'stg', ...patch }), isProduction: true };
    expect(() => createProviders(bypass)).toThrow(MockInProductionError);
  });

  it('stg mock SMS delivers only to the reserved test range', async () => {
    const stg = loadConfig({ ...prodEnv, APP_ENV: 'stg', SMS_PROVIDER: 'mock', EMAIL_PROVIDER: 'mock' });
    const p = createProviders(stg);
    const sms = p.sms as MockSmsSender;
    await sms.send({ to: '+919876543210', kind: 'otp', vars: { otp: '123456' } });
    await sms.send({ to: '+915550001111', kind: 'otp', vars: { otp: '654321' } });
    expect(sms.outbox.map((m) => m.to)).toEqual(['+915550001111']);
  });
});

describe('senders (fake fetch)', () => {
  it('ACS: signs the request with HMAC-SHA256 as Azure documents', async () => {
    const key = Buffer.from('test-key-0123456789abcdef').toString('base64');
    const calls: { url: string; init: RequestInit }[] = [];
    const fakeFetch = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(null, { status: 202 });
    }) as unknown as typeof fetch;
    const s = new AcsEmailSender({ endpoint: 'https://soyl.india.communication.azure.com', from: 'SOYL <no-reply@soylai.com>', accessKey: key, fetch: fakeFetch, now: () => new Date('2026-10-26T06:00:00Z') });
    await s.send(otpEmail('a@example.com', '123456', 10));
    const { url, init } = calls[0]!;
    expect(url).toBe('https://soyl.india.communication.azure.com/emails:send?api-version=2023-03-31');
    const body = String(init.body);
    expect(JSON.parse(body)).toMatchObject({ senderAddress: 'no-reply@soylai.com', recipients: { to: [{ address: 'a@example.com' }] }, content: { subject: '123456 is your SOYL Academy sign-in code' } });
    const h = init.headers as Record<string, string>;
    const hash = createHash('sha256').update(body).digest('base64');
    expect(h['x-ms-content-sha256']).toBe(hash);
    expect(h['x-ms-date']).toBe('Mon, 26 Oct 2026 06:00:00 GMT');
    const sig = createHmac('sha256', Buffer.from(key, 'base64'))
      .update(`POST\n/emails:send?api-version=2023-03-31\nMon, 26 Oct 2026 06:00:00 GMT;soyl.india.communication.azure.com;${hash}`)
      .digest('base64');
    expect(h.authorization).toBe(`HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature=${sig}`);
  });

  it('ACS: bearer token mode and failure mapping', async () => {
    const fail = (async () => new Response('{"error":{"message":"internal detail"}}', { status: 401 })) as unknown as typeof fetch;
    const s = new AcsEmailSender({ endpoint: 'https://x.communication.azure.com', from: 'a@b.c', getToken: async () => 'tok', fetch: fail });
    expect((await s.buildRequest(otpEmail('a@example.com', '1', 1))).init.headers).toMatchObject({ authorization: 'Bearer tok' });
    await expect(s.send(otpEmail('a@example.com', '1', 1))).rejects.toThrow(EmailDeliveryError);
    expect(() => new AcsEmailSender({ endpoint: 'https://x', from: 'a' })).toThrow();
  });

  it('MSG91: flow API with DLT template, authkey header and 91-prefixed mobiles', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const ok = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return Response.json({ type: 'success' });
    }) as unknown as typeof fetch;
    const s = new Msg91SmsSender({ authKey: 'AK', templateIds: { otp: 'T-OTP' }, senderId: 'SOYLAI', fetch: ok });
    await s.send({ to: '+919876543210', kind: 'otp', vars: { otp: '123456', minutes: '5' } });
    expect(calls[0]!.url).toBe('https://control.msg91.com/api/v5/flow');
    expect(calls[0]!.init.headers).toMatchObject({ authkey: 'AK', 'content-type': 'application/json' });
    expect(JSON.parse(String(calls[0]!.init.body))).toEqual({ template_id: 'T-OTP', sender: 'SOYLAI', short_url: '0', recipients: [{ mobiles: '919876543210', otp: '123456', minutes: '5' }] });
    await expect(s.send({ to: '+919876543210', kind: 'notice', vars: {} })).rejects.toThrow(SmsDeliveryError);
    const errBody = new Msg91SmsSender({ authKey: 'AK', templateIds: { otp: 'T' }, fetch: (async () => Response.json({ type: 'error' })) as unknown as typeof fetch });
    await expect(errBody.send({ to: '+919876543210', kind: 'otp', vars: {} })).rejects.toThrow(SmsDeliveryError);
    const http500 = new Msg91SmsSender({ authKey: 'AK', templateIds: { otp: 'T' }, fetch: (async () => new Response('x', { status: 500 })) as unknown as typeof fetch });
    await expect(http500.send({ to: '+919876543210', kind: 'otp', vars: {} })).rejects.toThrow(SmsDeliveryError);
  });

  it('mock senders expose the last code and simulate outages', async () => {
    const e = new MockEmailSender();
    await e.send(otpEmail('X@Example.com', '654321', 10));
    expect(e.lastCode('x@example.com')).toBe('654321');
    e.failing = true;
    await expect(e.send(otpEmail('x@example.com', '1', 1))).rejects.toThrow();
    const c = new MockConsentProvider('granted', true);
    expect((await c.getStatus('u')).status).toBe('granted');
    expect((await c.startFlow('u')).status).toBe('granted');
  });
});

async function kvContract(kv: KeyValueStore) {
  const now = 1_000_000;
  await kv.set('a', '1', 1000, now);
  expect(await kv.get('a', now + 10)).toBe('1');
  expect(await kv.setIfAbsent('a', '2', 1000, now)).toBe(false);
  expect(await kv.take('a', now)).toBe('1');
  expect(await kv.take('a', now)).toBeNull();
  expect(await kv.setIfAbsent('b', 'x', 1000, now)).toBe(true);
  await kv.del('b');
  expect(await kv.get('b', now)).toBeNull();
  const results = [];
  for (let i = 0; i < 4; i++) results.push(await kv.windowHit('w', 1000, 3, now + i));
  expect(results.map((r) => r.allowed)).toEqual([true, true, true, false]);
  expect(results[3]!.retryAfterMs).toBe(1000 - 3);
  expect(await kv.windowCount('w', 1000, now + 3)).toBe(3);
  expect((await kv.windowHit('w', 1000, 3, now + 1001)).allowed).toBe(true);
  expect(await kv.windowAdd('w2', 1000, now)).toBe(1);
  expect(await kv.windowAdd('w2', 1000, now)).toBe(2);
  // Expiry follows the caller's clock, not the store's own (fake clocks in tests; the CI Redis failure).
  await kv.set('ttl', 'v', 10, 0);
  expect(await kv.get('ttl', 9)).toBe('v');
  expect(await kv.get('ttl', 10)).toBeNull();
  await kv.set('lock', 'x', 3_600_000, now);
  expect(await kv.get('lock', now + 3_600_000 - 1)).toBe('x');
  expect(await kv.get('lock', now + 3_600_000 + 1000)).toBeNull();
  await kv.set('s', 'old', 100, now);
  expect(await kv.setIfAbsent('s', 'new', 100, now + 50)).toBe(false);
  expect(await kv.setIfAbsent('s', 'new', 100, now + 100)).toBe(true);
  expect(await kv.get('s', now + 150)).toBe('new');
  await kv.set('t', 'gone', 100, now);
  expect(await kv.take('t', now + 100)).toBeNull();
  expect(await kv.get('t', now)).toBeNull();
  await kv.set('pipe', 'a|b', 100, now);
  expect(await kv.get('pipe', now)).toBe('a|b');
  // Window hits recorded "in the future" (a clock set backwards) do not count.
  expect((await kv.windowHit('wf', 1000, 1, now + 500)).allowed).toBe(true);
  expect(await kv.windowCount('wf', 1000, now)).toBe(0);
  expect((await kv.windowHit('wf', 1000, 1, now)).allowed).toBe(true);
  expect((await kv.windowHit('wf', 1000, 1, now + 1)).allowed).toBe(false);
  expect(await kv.windowAdd('wf2', 1000, now + 500)).toBe(1);
  expect(await kv.windowAdd('wf2', 1000, now)).toBe(1);
  await kv.del('wf');
  expect(await kv.windowCount('wf', 1000, now)).toBe(0);
  await kv.ping();
}

describe('KV stores', () => {
  it('memory store meets the contract', async () => {
    const kv = new MemoryKv();
    await kvContract(kv);
    await kv.set('ttl', 'v', 10, 0);
    expect(await kv.get('ttl', 11)).toBeNull();
    kv.failing = true;
    await expect(kv.ping()).rejects.toThrow();
    await kv.close();
  });

  it('redis store meets the same contract on ioredis-mock (Lua scripts included)', async () => {
    const RedisMock = (await import('ioredis-mock')).default;
    const kv = new RedisKv('redis://mock', {}, `soyl-mock:${Date.now()}:`, new RedisMock() as never);
    try {
      await kvContract(kv);
    } finally {
      await kv.close();
    }
  });

  it.runIf(Boolean(process.env.REDIS_URL))('redis store meets the contract (CI redis:7)', async () => {
    const kv = new RedisKv(process.env.REDIS_URL!, {}, `soyl-unit:${Date.now()}:`);
    try {
      await kvContract(kv);
    } finally {
      await kv.close();
    }
  });

  it('createKv picks memory without REDIS_URL', () => {
    expect(createKv({ redisUrl: undefined }).kind).toBe('memory');
  });

  it('rate limiter keys never contain the raw identifier', async () => {
    const kv = new MemoryKv();
    const rl = new RateLimiter(kv, new FakeClock(0), 'k'.repeat(32));
    expect(rl.keyPart('+919876543210')).not.toContain('9876');
    const r = await rl.bucket('auth.ip', '203.0.113.1');
    expect(r.allowed).toBe(true);
  });
});

describe('logging (API-14)', () => {
  function capture() {
    const lines: string[] = [];
    const stream = new Writable({
      write(c, _e, cb) {
        lines.push(String(c));
        cb();
      },
    });
    const opts = loggerOptions('info', stream);
    const { stream: s, ...rest } = opts;
    return { log: pino(rest, s), lines };
  }

  it('redacts OTPs, codes, tokens, cookies and the edge secret anywhere in the object', () => {
    const { log, lines } = capture();
    log.info(
      {
        otp: '123456',
        code: '654321',
        nested: { sessionToken: 'tok-abc', clientSecret: 'shh', deep: { password: 'pw', idToken: 'idt' } },
        headers: { cookie: '__Host-soyl_session=abc', authorization: 'Bearer z', 'x-soyl-edge-auth': 'edge-xyz' },
        body: { phoneNumber: '+919876543210' },
        ok: 'visible',
      },
      'test',
    );
    const out = lines.join('');
    for (const secret of ['123456', '654321', 'tok-abc', 'shh', 'pw', 'idt', 'abc', 'Bearer z', 'edge-xyz', '9876543210']) expect(out).not.toContain(secret);
    expect(out).toContain('visible');
    expect(JSON.parse(out).time).toMatch(/^\d{4}-\d{2}-\d{2}T.*Z$/);
  });

  it('scrub keeps errors and caps arrays', () => {
    const e = new Error('x');
    expect(scrub({ e }) as object).toMatchObject({ e });
    expect((scrub({ a: Array.from({ length: 100 }, (_, i) => i) }) as { a: number[] }).a).toHaveLength(50);
    expect(pathWithoutQuery('/v1/x?email=a@b.c#f')).toBe('/v1/x');
    expect(pathWithoutQuery(undefined)).toBe('');
  });

  it('masks identifiers (AUTH-14)', () => {
    expect(maskPhone('+919876543210')).toBe('+91******3210');
    expect(maskEmail('arjun@gmail.com')).toBe('a***@gmail.com');
    expect(maskIdentifier('arjun@gmail.com')).toBe('a***@gmail.com');
    expect(maskIdentifier('+919876543210')).toBe('+91******3210');
    expect(maskIdentifier(null)).toBeNull();
    expect(maskPhone('12')).toBe('***');
    expect(maskEmail('@x')).toBe('***');
  });
});

describe('return-to (AUTH-13)', () => {
  it.each(['//evil.com', '/\\evil.com', 'https://evil.com', 'javascript:alert(1)', '/%2F%2Fevil.com', '/%5Cevil.com', 'learn', '', '/admin\n', '/unknown', '/learning', '/learn%0d%0aSet-Cookie:x', null, 42])(
    'rejects %j',
    (raw) => expect(safeReturnTo(raw)).toBe('/learn'),
  );
  it.each(['/learn', '/learn/cbse/10', '/tests/attempt/abc?x=1', '/me#sessions', '/plans'])('accepts %j', (raw) => expect(safeReturnTo(raw)).toBe(raw));
});

describe('display names (AC-18)', () => {
  it.each(['Priya', 'Priya S.', "D'Souza", 'Anne-Marie', 'अनन्या', 'Rohit  Kumar'])('accepts %j', (n) => expect(validateDisplayName(n).ok).toBe(true));
  it.each(['P', 'Call 98765 43210', 'me@x.com', 'go to www.x', 'x.com', 'Ravi_99', 'B1tch', 'shiiit', 'Moderator', 'Pri‮ya', 'abcdefghijklmnopqrstu'])('rejects %j', (n) =>
    expect(validateDisplayName(n).ok).toBe(false),
  );
});

describe('JSON shape and edge helpers', () => {
  it('measures depth and array length', () => {
    expect(jsonShapeProblem({ a: [1, { b: 2 }] })).toBeNull();
    expect(jsonShapeProblem({ a: { a: { a: 1 } } }, 2)).toMatch(/nesting/);
    expect(jsonShapeProblem({ a: [1, 2, 3] }, 10, 2)).toMatch(/array/);
  });

  it('matches edge secrets in constant time and parses client IPs', () => {
    expect(matchEdgeSecret('b'.repeat(40), ['a'.repeat(40), 'b'.repeat(40)])).toBe(1);
    expect(matchEdgeSecret(undefined, ['a'])).toBeNull();
    expect(matchEdgeSecret(['x'], ['x'])).toBeNull();
    expect(matchEdgeSecret('x'.repeat(600), ['x'.repeat(600)])).toBeNull();
    expect(trustedClientIp(' 2001:db8::1 ')).toBe('2001:db8::1');
    expect(trustedClientIp('1.2.3.4, 5.6.7.8')).toBeNull();
    expect(trustedClientIp(undefined)).toBeNull();
  });
});

describe('OpenAPI', () => {
  it('the committed openapi.json matches the routes (run `npm run openapi -w @soyl/api`)', async () => {
    const committed = JSON.parse(readFileSync(new URL('../openapi.json', import.meta.url), 'utf8'));
    const generated = JSON.parse(await generateOpenApi());
    expect(generated).toEqual(committed);
    expect(Object.keys(generated.paths)).not.toContain('/v1/dev/otp-outbox');
  });
});

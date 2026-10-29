/**
 * Test harness: a real PostgreSQL database per test file (@soyl/db createTestDb), the in-memory KV
 * (or Redis when REDIS_URL is set, as in CI), mock SMS/email/consent providers, a mock OIDC provider
 * standing in for Google, a fake clock and a log capture. Secrets are generated per run (GEN-1).
 */
import type { StoreItem } from '@soyl/shared/config/coins';
import type { StaffAuthPolicy } from '@soyl/shared/config/security';
import { randomBytes } from 'node:crypto';
import { Writable } from 'node:stream';
import type { FastifyInstance, LightMyRequestResponse } from 'fastify';
import { boards, chapters, classes, subjects, topics } from '@soyl/db';
import { createTestDb, type TestDb } from '@soyl/db/testing';
import { buildApp, type App, type BuildAppOptions } from '../src/app';
import { FakeClock } from '../src/clock';
import { loadConfig, type Config } from '../src/config';
import { MemoryKv, RedisKv, type KeyValueStore } from '../src/kv';
import { MockEmailSender } from '../src/auth/senders/email';
import { MockSmsSender } from '../src/auth/senders/sms';
import { MockConsentProvider } from '../src/consent/mock';
import type { ConsentProvider } from '../src/consent/provider';
import { MockOidcServer } from '../src/dev/mock-oidc';
import type { Services } from '../src/services';
import type { AiDeps } from '../src/ai/services';

export const PUBLIC_BASE = 'https://www.soylai.test';
export const ORIGIN = PUBLIC_BASE;
export const STAFF_DOMAIN = 'staff.soylai.test';

export interface Harness {
  app: App;
  t: TestDb;
  config: Config;
  clock: FakeClock;
  kv: KeyValueStore;
  sms: MockSmsSender;
  email: MockEmailSender;
  consent: MockConsentProvider;
  oidc: MockOidcServer;
  edgeSecrets: [string, string];
  logs: Record<string, unknown>[];
  services: Services;
  client(ip?: string): Client;
  close(): Promise<void>;
}

export interface HarnessOptions {
  env?: Record<string, string | undefined>;
  consentDefault?: 'required' | 'pending' | 'granted' | 'revoked';
  extraRoutes?: BuildAppOptions['extraRoutes'];
  /** Reuse a database (several apps on one DB). */
  t?: TestDb;
  /** AI gateway runtime overrides (default: local stand-ins). */
  ai?: AiDeps;
  /** SOYL Coins store items override (default: config STORE_ITEMS). */
  coinItems?: readonly StoreItem[];
  /** Another consent provider instead of the mock (e.g. the built-in one, D-039); `h.consent` is then unused. */
  consentProvider?: (t: TestDb) => ConsentProvider;
  /** Staff sign-in policy (default STAFF_AUTH: email OTP, no second factor; ADR-026). */
  staffAuth?: StaffAuthPolicy;
}

/** ADR-011 policy: staff routes need a TOTP-verified session (email sign-in). */
export const STAFF_EMAIL_TOTP: StaffAuthPolicy = { signInMethods: ['email'], secondFactor: 'totp' };
/** The original AUTH-11 policy: Google Workspace sign-in only, plus TOTP. */
export const STAFF_GOOGLE_TOTP: StaffAuthPolicy = { signInMethods: ['google'], secondFactor: 'totp' };

const secret = () => randomBytes(32).toString('base64url');

export async function createHarness(opts: HarnessOptions = {}): Promise<Harness> {
  const t = opts.t ?? (await createTestDb());
  const clientId = 'test-client';
  const clientSecret = secret();
  const redirectUri = `${PUBLIC_BASE}/api/platform/v1/auth/google/callback`;
  const oidc = new MockOidcServer({ clientId, clientSecret, redirectUris: [redirectUri] });
  const issuer = await oidc.start();
  const edgeSecrets: [string, string] = [secret(), secret()];
  const config = loadConfig({
    APP_ENV: 'test',
    PLATFORM_ENABLED: 'true',
    PUBLIC_BASE_URL: PUBLIC_BASE,
    EDGE_SECRETS: edgeSecrets.join(','),
    AUTH_SECRET: secret(),
    OTP_PEPPER: secret(),
    GOOGLE_ISSUER: issuer,
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    ADMIN_GOOGLE_DOMAINS: STAFF_DOMAIN,
    LOG_LEVEL: 'info',
    REDIS_URL: process.env.REDIS_URL,
    ...opts.env,
  }, { staffAuth: opts.staffAuth });
  const clock = new FakeClock(Date.now());
  // Every harness gets its own key namespace, so per-IP/global limits never leak between test files or apps.
  // TEST_KV=redis-mock runs the Redis store (Lua scripts) on ioredis-mock locally, as CI runs it on redis:7.
  const ns = `soyl-test:${randomBytes(6).toString('hex')}:`;
  const kv: KeyValueStore = process.env.REDIS_URL
    ? new RedisKv(process.env.REDIS_URL, {}, ns)
    : process.env.TEST_KV === 'redis-mock'
      ? new RedisKv('redis://mock', {}, ns, new (await import('ioredis-mock')).default() as never)
      : new MemoryKv();
  const sms = new MockSmsSender();
  const email = new MockEmailSender();
  const consent = new MockConsentProvider(opts.consentDefault ?? 'required');
  const logs: Record<string, unknown>[] = [];
  const logStream = new Writable({
    write(chunk, _enc, cb) {
      for (const line of String(chunk).split('\n')) if (line.trim()) logs.push(JSON.parse(line));
      cb();
    },
  });
  let app: App;
  try {
    app = await buildApp(
      { config, db: t.db, kv, clock, providers: { sms, email, consent: opts.consentProvider ? opts.consentProvider(t) : consent }, google: { allowInsecure: true }, ai: opts.ai, coins: opts.coinItems ? { items: opts.coinItems } : undefined },
      { logStream, extraRoutes: opts.extraRoutes },
    );
  } catch (err) {
    await oidc.stop();
    await kv.close();
    if (!opts.t) await t.close();
    throw err;
  }
  const h: Harness = {
    app,
    t,
    config,
    clock,
    kv,
    sms,
    email,
    consent,
    oidc,
    edgeSecrets,
    logs,
    services: app.services,
    client: (ip?: string) => new Client(h, ip),
    close: async () => {
      await app.close();
      await kv.close();
      await oidc.stop();
      if (!opts.t) await t.close();
    },
  };
  return h;
}

export interface RequestOptions {
  body?: unknown;
  rawBody?: string;
  headers?: Record<string, string | undefined>;
  origin?: string | null;
  edge?: string | null;
  cookies?: boolean;
}

/** A browser-like client: edge secret + client IP (as the web proxy adds them), Origin, cookie jar. */
export class Client {
  jar = new Map<string, string>();
  constructor(
    private readonly h: Harness,
    public ip = `203.0.113.${Math.floor(Math.random() * 200) + 1}`,
  ) {}

  cookieHeader(): string | undefined {
    if (!this.jar.size) return undefined;
    return [...this.jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
  }

  absorb(res: LightMyRequestResponse) {
    const set = res.headers['set-cookie'];
    for (const c of Array.isArray(set) ? set : set ? [set] : []) {
      const [pair, ...attrs] = String(c).split(';');
      const i = pair!.indexOf('=');
      const name = pair!.slice(0, i).trim();
      const value = pair!.slice(i + 1).trim();
      const maxAge = attrs.map((a) => a.trim()).find((a) => a.toLowerCase().startsWith('max-age='));
      if (!value || maxAge === 'Max-Age=0') this.jar.delete(name);
      else this.jar.set(name, value);
    }
  }

  async request(method: string, url: string, o: RequestOptions = {}): Promise<LightMyRequestResponse> {
    const headers: Record<string, string> = {};
    if (o.edge !== null) headers['x-soyl-edge-auth'] = o.edge ?? this.h.edgeSecrets[0];
    headers['x-soyl-client-ip'] = this.ip;
    headers['user-agent'] = 'vitest-browser/1.0';
    if (o.origin !== null) headers.origin = o.origin ?? ORIGIN;
    if (o.body !== undefined || o.rawBody !== undefined) headers['content-type'] = 'application/json';
    const cookie = o.cookies === false ? undefined : this.cookieHeader();
    if (cookie) headers.cookie = cookie;
    for (const [k, v] of Object.entries(o.headers ?? {})) {
      if (v === undefined) delete headers[k];
      else headers[k] = v;
    }
    const res = await (this.h.app as FastifyInstance).inject({
      method: method as 'GET',
      url,
      headers,
      payload: o.rawBody ?? (o.body !== undefined ? JSON.stringify(o.body) : undefined),
    });
    this.absorb(res);
    return res;
  }

  get(url: string, o?: RequestOptions) {
    return this.request('GET', url, o);
  }
  post(url: string, body?: unknown, o?: RequestOptions) {
    return this.request('POST', url, { ...o, body });
  }
  patch(url: string, body?: unknown, o?: RequestOptions) {
    return this.request('PATCH', url, { ...o, body });
  }
  delete(url: string, o?: RequestOptions) {
    return this.request('DELETE', url, o);
  }

  /** Full email OTP sign-in. */
  async signInEmail(email: string, returnTo?: string) {
    const sent = await this.post('/v1/auth/email/send-otp', { email });
    if (sent.statusCode !== 200) throw new Error(`send-otp ${sent.statusCode} ${sent.body}`);
    const code = this.h.email.lastCode(email)!;
    const res = await this.post('/v1/auth/email/verify', { email, code, ...(returnTo ? { returnTo } : {}) });
    if (res.statusCode !== 200) throw new Error(`verify ${res.statusCode} ${res.body}`);
    return res.json() as { user: { id: string; role: string }; isNewUser: boolean; consent: string; returnTo: string };
  }

  /** Full phone OTP sign-in. */
  async signInPhone(phoneNumber: string) {
    const sent = await this.post('/v1/auth/phone/send-otp', { phoneNumber });
    if (sent.statusCode !== 200) throw new Error(`send-otp ${sent.statusCode} ${sent.body}`);
    const code = this.h.sms.lastCode(phoneNumber)!;
    const res = await this.post('/v1/auth/phone/verify', { phoneNumber, code });
    if (res.statusCode !== 200) throw new Error(`verify ${res.statusCode} ${res.body}`);
    return res.json() as { user: { id: string; role: string }; isNewUser: boolean; consent: string };
  }

  /**
   * Google through the mock provider: /start → provider /authorize → callback. Returns the final
   * redirect Location. `beforeCallback` can tamper with the callback query.
   */
  async signInGoogle(o: { returnTo?: string; intent?: 'signin' | 'link'; mutateCallback?: (q: URLSearchParams) => void; dropStateCookie?: boolean } = {}) {
    const qs = new URLSearchParams();
    if (o.returnTo) qs.set('returnTo', o.returnTo);
    if (o.intent) qs.set('intent', o.intent);
    const start = await this.get(`/v1/auth/google/start${qs.size ? `?${qs}` : ''}`);
    if (start.statusCode !== 302) throw new Error(`start ${start.statusCode} ${start.body}`);
    const authorize = await fetch(String(start.headers.location), { redirect: 'manual' });
    const back = new URL(String(authorize.headers.get('location')));
    o.mutateCallback?.(back.searchParams);
    if (o.dropStateCookie) for (const k of [...this.jar.keys()]) if (k.includes('soyl_oauth')) this.jar.delete(k);
    const cb = await this.get(`/v1/auth/google/callback?${back.searchParams}`);
    return { start, callback: cb, location: String(cb.headers.location ?? '') };
  }
}

/** Minimal catalog rows (two boards, a few classes/subjects/chapters/topics). */
export async function seedMiniCatalog(t: TestDb, academicYear = '2026-27') {
  const [cbse] = await t.db.insert(boards).values({ code: 'cbse', name: 'CBSE' }).returning();
  const [cisce] = await t.db.insert(boards).values({ code: 'cisce', name: 'CISCE' }).returning();
  const [c10] = await t.db.insert(classes).values({ boardId: cbse!.id, level: 10, exam: 'cbse', name: 'Class 10' }).returning();
  await t.db.insert(classes).values({ boardId: cisce!.id, level: 10, exam: 'icse', name: 'Class 10 (ICSE)' });
  const subjectBase = {
    academicYear,
    boardId: cbse!.id,
    classId: c10!.id,
    exam: 'cbse',
    classLevel: 10,
    language: 'en',
    script: 'Latn',
    wave: 1,
    priority: 1,
    theoryOnly: false,
    hasBoardExam: true,
    sourceStatus: 'verified',
    source: 'test fixture',
  };
  const [science] = await t.db
    .insert(subjects)
    .values({ ...subjectBase, key: 'cbse-10-science', code: '086', name: 'Science', tier: 'core' })
    .returning();
  await t.db.insert(subjects).values({ ...subjectBase, key: 'cbse-10-hindi-a', code: '002', name: 'Hindi A', tier: 'language', language: 'hi', script: 'Deva', variants: [{ code: '002', name: 'Hindi Course A' }] });
  const [ch1] = await t.db
    .insert(chapters)
    .values({ subjectId: science!.id, key: 'cbse-10-science-ch01', academicYear, number: 1, title: 'Chemical Reactions and Equations' })
    .returning();
  const [ch2] = await t.db
    .insert(chapters)
    .values({ subjectId: science!.id, key: 'cbse-10-science-ch02', academicYear, number: 2, title: 'Acids, Bases and Salts' })
    .returning();
  await t.db.insert(topics).values([
    { chapterId: ch1!.id, key: 'cbse-10-science-ch01-t01', academicYear, position: 1, title: 'Chemical equations' },
    { chapterId: ch1!.id, key: 'cbse-10-science-ch01-t02', academicYear, position: 2, title: 'Types of reactions' },
    { chapterId: ch2!.id, key: 'cbse-10-science-ch02-t01', academicYear, position: 1, title: 'Indicators' },
  ]);
  return { science: science!, ch1: ch1!, ch2: ch2! };
}

export function securityEvents(logs: Record<string, unknown>[], event?: string) {
  return logs.filter((l) => l.security === true && (!event || l.event === event));
}

export function authEvents(logs: Record<string, unknown>[], event?: string) {
  return logs.filter((l) => l.auth === true && (!event || l.event === event));
}

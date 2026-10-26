import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { isPlatformPath } from '../config/platform-routes';
import { ApiError, buildPath, buildQuery, createApiClient, isApiError } from './index';

const here = fileURLToPath(new URL('.', import.meta.url));

describe('generated schema', () => {
  it('matches platform/api/openapi.json (run `npm run generate:api-client -w @soyl/shared`)', () => {
    const dir = mkdtempSync(join(tmpdir(), 'soyl-api-client-'));
    try {
      const out = join(dir, 'schema.gen.ts');
      const cli = join(here, '..', '..', 'node_modules', 'openapi-typescript', 'bin', 'cli.js');
      execFileSync(process.execPath, [cli, join(here, '..', '..', 'api', 'openapi.json'), '-o', out], { stdio: 'pipe' });
      const norm = (s: string) => s.replace(/\r\n/g, '\n');
      expect(norm(readFileSync(join(here, 'schema.gen.ts'), 'utf8'))).toBe(norm(readFileSync(out, 'utf8')));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 60_000);
});

describe('path and query building', () => {
  it('encodes params so they cannot add segments', () => {
    expect(buildPath('/v1/catalog/{board}/{class}/subjects', { board: 'cbse', class: 10 })).toBe('/v1/catalog/cbse/10/subjects');
    expect(buildPath('/v1/catalog/subjects/{id}/chapters', { id: '../x/y' })).toBe('/v1/catalog/subjects/..%2Fx%2Fy/chapters');
    expect(() => buildPath('/v1/me/sessions/{id}', {})).toThrow(/Missing path parameter/);
  });
  it('skips undefined query values', () => {
    expect(buildQuery({ returnTo: '/learn?x=1', intent: undefined })).toBe('?returnTo=%2Flearn%3Fx%3D1');
    expect(buildQuery()).toBe('');
  });
});

function fakeFetch(status: number, body: unknown, contentType = 'application/json') {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const fn = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    const payload = body === null ? null : typeof body === 'string' ? body : JSON.stringify(body);
    return new Response(payload, { status, headers: payload === null ? {} : { 'content-type': contentType } });
  }) as unknown as typeof fetch;
  return { fn, calls };
}

describe('createApiClient', () => {
  it('sends JSON with same-origin credentials and parses the 200 body', async () => {
    const f = fakeFetch(200, { sent: true, resendAfterSeconds: 30 });
    const api = createApiClient({ fetch: f.fn });
    const res = await api.post('/v1/auth/email/send-otp', { body: { email: 'a@example.com' } });
    expect(res.resendAfterSeconds).toBe(30);
    expect(f.calls[0]!.url).toBe('/api/platform/v1/auth/email/send-otp');
    expect(f.calls[0]!.init.method).toBe('POST');
    expect(f.calls[0]!.init.credentials).toBe('same-origin');
    expect((f.calls[0]!.init.headers as Record<string, string>)['content-type']).toBe('application/json');
    expect(f.calls[0]!.init.body).toBe('{"email":"a@example.com"}');
  });

  it('sends no content type for body-less POSTs (sign-out)', async () => {
    const f = fakeFetch(204, null);
    const api = createApiClient({ fetch: f.fn });
    expect(await api.post('/v1/auth/sign-out')).toBeNull();
    expect((f.calls[0]!.init.headers as Record<string, string>)['content-type']).toBeUndefined();
    expect(f.calls[0]!.init.body).toBeUndefined();
  });

  it('turns problem+json into ApiError with code and retry-after', async () => {
    const problem = { type: 'about:blank', title: 'Too many', status: 429, code: 'otp_locked', traceId: 't', retryAfterSeconds: 3600 };
    const api = createApiClient({ fetch: fakeFetch(429, problem, 'application/problem+json').fn });
    const err = await api.post('/v1/auth/phone/verify', { body: { phoneNumber: '+915550000001', code: '000000' } }).catch((e: unknown) => e);
    expect(isApiError(err, 'otp_locked')).toBe(true);
    expect((err as ApiError).status).toBe(429);
    expect((err as ApiError).retryAfterSeconds).toBe(3600);
  });

  it('maps non-JSON failures and network errors to stable codes', async () => {
    const api502 = createApiClient({ fetch: fakeFetch(502, 'bad gateway', 'text/plain').fn });
    await expect(api502.get('/v1/session')).rejects.toMatchObject({ status: 502, code: 'service_unavailable' });
    const apiNet = createApiClient({
      fetch: (async () => {
        throw new TypeError('fetch failed');
      }) as unknown as typeof fetch,
    });
    await expect(apiNet.get('/v1/session')).rejects.toMatchObject({ status: 0, code: 'network_error' });
  });

  it('uses a server base URL and extra headers when given', async () => {
    const f = fakeFetch(200, { academicYear: '2026-27', boards: [] });
    const api = createApiClient({ baseUrl: 'http://api.local/', fetch: f.fn, headers: { 'x-test': '1' } });
    await api.get('/v1/catalog/boards');
    expect(f.calls[0]!.url).toBe('http://api.local/v1/catalog/boards');
    expect((f.calls[0]!.init.headers as Record<string, string>)['x-test']).toBe('1');
  });
});

describe('isPlatformPath', () => {
  it.each([
    ['/learn', true],
    ['/learn/cbse/10', true],
    ['/me?x=1', true],
    ['/api/platform/v1/session', true],
    ['https://www.soylai.com/tests/series', true],
    ['/', false],
    ['/learning', false],
    ['/about', false],
    ['/api/enroll', false],
    ['/students', false],
    [null, false],
  ])('%s → %s', (path, expected) => {
    expect(isPlatformPath(path)).toBe(expected);
  });
});

describe('PLATFORM_PREFIXES single source', () => {
  it('matches the marketing regression inventory (platform/e2e/marketing/routes.ts)', async () => {
    const { PLATFORM_PREFIXES } = await import('../config/platform-routes');
    const routes = await import('../../e2e/marketing/routes');
    expect([...routes.PLATFORM_PREFIXES]).toEqual([...PLATFORM_PREFIXES]);
  }, 30_000);
});

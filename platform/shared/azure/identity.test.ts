/** Managed-identity token provider against a fake Container Apps identity endpoint. */
import { describe, expect, it } from 'vitest';
import {
  AZURE_RESOURCES,
  AzureCliTokenProvider,
  createTokenProvider,
  ManagedIdentityTokenProvider,
  REFRESH_MARGIN_MS,
  TokenProviderError,
} from './identity';

interface Call {
  url: URL;
  headers: Record<string, string>;
}

function fakeEndpoint(responses: (() => Response)[], calls: Call[]): typeof fetch {
  let i = 0;
  return (async (input: string | URL | Request, init?: RequestInit) => {
    const headers: Record<string, string> = {};
    new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
    calls.push({ url: new URL(String(input)), headers });
    const next = responses[Math.min(i++, responses.length - 1)]!;
    return next();
  }) as typeof fetch;
}

const tokenResponse = (token: string, expiresOnSec: number) => () =>
  new Response(JSON.stringify({ access_token: token, expires_on: String(expiresOnSec), resource: 'x', token_type: 'Bearer' }), { status: 200 });

describe('ManagedIdentityTokenProvider', () => {
  it('calls the endpoint with api-version, resource, client_id and the identity header', async () => {
    const calls: Call[] = [];
    let now = 1_000_000_000_000;
    const p = new ManagedIdentityTokenProvider({
      endpoint: 'http://localhost:42356/msi/token',
      header: 'hdr-123',
      clientId: 'client-abc',
      fetch: fakeEndpoint([tokenResponse('t1', now / 1000 + 3600)], calls),
      now: () => now,
    });
    const t = await p.getToken(`${AZURE_RESOURCES.postgres}/.default`);
    expect(t).toEqual({ token: 't1', expiresOnTimestamp: now + 3600_000 });
    expect(calls).toHaveLength(1);
    const u = calls[0]!.url;
    expect(u.searchParams.get('api-version')).toBe('2019-08-01');
    expect(u.searchParams.get('resource')).toBe(AZURE_RESOURCES.postgres);
    expect(u.searchParams.get('client_id')).toBe('client-abc');
    expect(calls[0]!.headers['x-identity-header']).toBe('hdr-123');
  });

  it('caches per resource until 5 minutes before expiry, then refreshes', async () => {
    const calls: Call[] = [];
    let now = 1_000_000_000_000;
    const exp = now / 1000 + 3600;
    const p = new ManagedIdentityTokenProvider({
      endpoint: 'http://mi/token',
      header: 'h',
      fetch: fakeEndpoint([tokenResponse('t1', exp), tokenResponse('t2', exp + 3600), tokenResponse('r1', exp)], calls),
      now: () => now,
    });
    expect((await p.getToken(AZURE_RESOURCES.postgres)).token).toBe('t1');
    now += 3600_000 - REFRESH_MARGIN_MS - 1000; // still > margin left
    expect((await p.getToken(AZURE_RESOURCES.postgres)).token).toBe('t1');
    expect(calls).toHaveLength(1);
    now += 2000; // inside the margin
    expect((await p.getToken(AZURE_RESOURCES.postgres)).token).toBe('t2');
    expect(calls).toHaveLength(2);
    // Another resource has its own cache entry.
    expect((await p.getToken(AZURE_RESOURCES.redis)).token).toBe('r1');
    expect(calls).toHaveLength(3);
  });

  it('shares one in-flight request between concurrent callers', async () => {
    const calls: Call[] = [];
    const now = 1_000_000_000_000;
    const p = new ManagedIdentityTokenProvider({ endpoint: 'http://mi/token', header: 'h', fetch: fakeEndpoint([tokenResponse('t1', now / 1000 + 3600)], calls), now: () => now });
    const all = await Promise.all([1, 2, 3, 4].map(() => p.getToken(AZURE_RESOURCES.communication)));
    expect(new Set(all.map((t) => t.token))).toEqual(new Set(['t1']));
    expect(calls).toHaveLength(1);
  });

  it('retries transient failures (network, 404 identity not ready, 429, 5xx) with backoff', async () => {
    const calls: Call[] = [];
    const sleeps: number[] = [];
    const now = 1_000_000_000_000;
    const p = new ManagedIdentityTokenProvider({
      endpoint: 'http://mi/token',
      header: 'h',
      fetch: fakeEndpoint(
        [
          () => {
            throw new TypeError('fetch failed');
          },
          () => new Response('not yet', { status: 404 }),
          () => new Response('slow down', { status: 429 }),
          () => new Response('boom', { status: 503 }),
          tokenResponse('ok', now / 1000 + 3600),
        ],
        calls,
      ),
      now: () => now,
      sleep: async (ms) => void sleeps.push(ms),
    });
    expect((await p.getToken(AZURE_RESOURCES.redis)).token).toBe('ok');
    expect(calls).toHaveLength(5);
    expect(sleeps).toEqual([500, 1000, 2000, 4000]);
  });

  it('does not retry a permanent error (400) and does not cache failures', async () => {
    const calls: Call[] = [];
    const now = 1_000_000_000_000;
    const p = new ManagedIdentityTokenProvider({
      endpoint: 'http://mi/token',
      header: 'h',
      fetch: fakeEndpoint([() => new Response('{"error":"invalid_resource"}', { status: 400 }), tokenResponse('later', now / 1000 + 3600)], calls),
      now: () => now,
      sleep: async () => {},
    });
    const err = await p.getToken('https://nope').catch((e: unknown) => e);
    expect(err).toBeInstanceOf(TokenProviderError);
    expect((err as TokenProviderError).status).toBe(400);
    expect((err as Error).message).not.toContain('invalid_resource'); // provider bodies are never surfaced
    expect(calls).toHaveLength(1);
    expect((await p.getToken('https://nope')).token).toBe('later');
  });

  it('gives up after maxAttempts', async () => {
    const calls: Call[] = [];
    const p = new ManagedIdentityTokenProvider({ endpoint: 'http://mi/token', header: 'h', maxAttempts: 3, fetch: fakeEndpoint([() => new Response('x', { status: 500 })], calls), sleep: async () => {} });
    await expect(p.getToken(AZURE_RESOURCES.postgres)).rejects.toThrow(/HTTP 500/);
    expect(calls).toHaveLength(3);
  });
});

describe('createTokenProvider', () => {
  it('uses the managed identity when IDENTITY_ENDPOINT/IDENTITY_HEADER are set', () => {
    const p = createTokenProvider({ IDENTITY_ENDPOINT: 'http://mi/token', IDENTITY_HEADER: 'h', AZURE_CLIENT_ID: 'c', APP_ENV: 'prod' });
    expect(p.kind).toBe('managed-identity');
  });

  it('refuses the developer fallback in production', () => {
    expect(() => createTokenProvider({ APP_ENV: 'prod' })).toThrow(/disabled in production/);
  });

  it('falls back to the Azure CLI outside production', () => {
    expect(createTokenProvider({ APP_ENV: 'local' }).kind).toBe('azure-cli');
    expect(createTokenProvider({ APP_ENV: 'dev' }).kind).toBe('azure-cli');
  });

  it('AzureCliTokenProvider parses az output and caches', async () => {
    let n = 0;
    const now = 1_000_000_000_000;
    const p = new AzureCliTokenProvider({
      now: () => now,
      run: async (args) => {
        n++;
        expect(args).toEqual(['account', 'get-access-token', '--resource', AZURE_RESOURCES.storage, '--output', 'json']);
        return JSON.stringify({ accessToken: 'cli-token', expires_on: now / 1000 + 3600 });
      },
    });
    expect((await p.getToken(`${AZURE_RESOURCES.storage}/.default`)).token).toBe('cli-token');
    await p.getToken(AZURE_RESOURCES.storage);
    expect(n).toBe(1);
  });
});

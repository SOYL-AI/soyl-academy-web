/**
 * ai-core additions for the AI gateway (M4): vision/file inputs on the wire, caller cancellation and
 * metering of partial streams (F-008), the disabled provider, embeddings (mock + Azure request shape),
 * and token estimates for images.
 */
import { describe, expect, it } from 'vitest';
import {
  AzureOpenAIEmbedder,
  AzureOpenAIProvider,
  CallerAbortedError,
  DisabledProvider,
  MockEmbedder,
  MockInProductionError,
  MockProvider,
  MockText,
  ModelClient,
  ProviderUnavailableError,
  StreamInterruptedError,
  createEmbedder,
  createProvider,
  embeddingCostPaise,
  estimateMessagesTokens,
  toWireMessage,
  type UsageRecord,
} from './index';
import { IMAGE_TOKENS_ESTIMATE } from './tokens';

const env = { APP_ENV: 'test' };
const credential = { getToken: async () => ({ token: 'tok', expiresOnTimestamp: Date.now() + 3_600_000 }) };
const deployments = { small: 'luna', mid: 'sol', verify: 'astra' };

describe('vision inputs', () => {
  it('plain messages stay strings; images and PDFs become content parts (data: URLs only)', () => {
    expect(toWireMessage({ role: 'user', content: 'hi' })).toEqual({ role: 'user', content: 'hi' });
    const m = toWireMessage({ role: 'user', content: 'q', images: [{ dataUrl: 'data:image/png;base64,AAAA' }], files: [{ dataUrl: 'data:application/pdf;base64,JVBE', filename: 'p.pdf' }] });
    expect(m.content).toEqual([
      { type: 'text', text: 'q' },
      { type: 'image_url', image_url: { url: 'data:image/png;base64,AAAA', detail: 'high' } },
      { type: 'file', file: { filename: 'p.pdf', file_data: 'data:application/pdf;base64,JVBE' } },
    ]);
    expect(() => toWireMessage({ role: 'user', content: 'q', images: [{ dataUrl: 'https://evil.example/x.png' }] })).toThrow(/data: URLs/);
    expect(() => toWireMessage({ role: 'user', content: 'q', files: [{ dataUrl: 'data:text/html;base64,PGh0bWw+', filename: 'x' }] })).toThrow(/PDF/);
    const p = new AzureOpenAIProvider({ endpoint: 'https://aoai.example.com', deployments, credential });
    expect((p.body({ tier: 'mid', messages: [{ role: 'user', content: 'q', images: [{ dataUrl: 'data:image/jpeg;base64,/9j/' }] }] }).messages as { content: unknown[] }[])[0]!.content).toHaveLength(2);
  });

  it('counts images in token estimates', () => {
    const base = estimateMessagesTokens([{ role: 'user', content: 'q' }]);
    expect(estimateMessagesTokens([{ role: 'user', content: 'q', images: [{ dataUrl: 'data:image/png;base64,AA' }] }])).toBe(base + IMAGE_TOKENS_ESTIMATE);
  });
});

describe('cancellation and partial streams (F-008)', () => {
  it('meters the output produced before a mid-stream failure and attaches it to the error', async () => {
    const usages: UsageRecord[] = [];
    const p = new MockProvider({ env, failMidStream: () => 64 });
    p.register('long', () => new MockText('x'.repeat(300)));
    const client = new ModelClient({ provider: p, onUsage: (u) => void usages.push(u) });
    let seen = '';
    const err = await client.stream({ tier: 'small', messages: [{ role: 'user', content: 'q' }], mock: { fixture: 'long' } }, (d) => (seen += d)).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(StreamInterruptedError);
    expect((err as StreamInterruptedError).partialText).toBe('x'.repeat(64));
    expect(seen).toBe('x'.repeat(64));
    expect(usages).toHaveLength(1);
    expect(usages[0]!.usage.output_tokens).toBe(16);
    expect((err as StreamInterruptedError).usage).toBe(usages[0]);
  });

  it('a call cancelled before any output is neither metered nor retried', async () => {
    const usages: UsageRecord[] = [];
    const client = new ModelClient({ provider: new MockProvider({ env }), onUsage: (u) => void usages.push(u) });
    const ac = new AbortController();
    ac.abort();
    await expect(client.stream({ tier: 'small', messages: [{ role: 'user', content: 'q' }], signal: ac.signal }, () => {})).rejects.toBeInstanceOf(CallerAbortedError);
    expect(usages).toEqual([]);
    const p = new MockProvider({ env, streamDelayMs: 2 });
    p.register('long', () => new MockText('y'.repeat(640)));
    const ac2 = new AbortController();
    const e2 = await new ModelClient({ provider: p }).stream({ tier: 'small', messages: [{ role: 'user', content: 'q' }], mock: { fixture: 'long' }, signal: ac2.signal }, () => ac2.abort()).catch((e: unknown) => e);
    expect(e2).toMatchObject({ name: 'StreamInterruptedError', cancelled: true, partialText: 'y'.repeat(64) });
  });

  it('the Azure provider never retries a cancelled call', async () => {
    let calls = 0;
    const p = new AzureOpenAIProvider({
      endpoint: 'https://aoai.example.com',
      deployments,
      credential,
      retry: { sleep: async () => {}, random: () => 0 },
      fetch: (async (_u: string, init: RequestInit) => {
        calls++;
        await new Promise((r) => setTimeout(r, 5));
        if (init.signal?.aborted) throw Object.assign(new Error('aborted'), { name: 'AbortError' });
        return new Response('busy', { status: 503 });
      }) as unknown as typeof fetch,
    });
    const ac = new AbortController();
    setTimeout(() => ac.abort(), 1);
    await expect(p.complete({ tier: 'small', messages: [{ role: 'user', content: 'q' }], signal: ac.signal })).rejects.toBeInstanceOf(CallerAbortedError);
    expect(calls).toBe(1);
  });

  it('the Azure stream reports partial text when the connection drops', async () => {
    const enc = new TextEncoder();
    let pulls = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(c) {
        if (pulls++ === 0) c.enqueue(enc.encode('data: {"choices":[{"delta":{"content":"Hello "}}]}\n\n'));
        else c.error(new Error('socket hang up'));
      },
    });
    const p = new AzureOpenAIProvider({ endpoint: 'https://aoai.example.com', deployments, credential, fetch: (async () => new Response(body)) as unknown as typeof fetch });
    const err = await p.stream({ tier: 'small', messages: [{ role: 'user', content: 'q' }] }, () => {}).catch((e: unknown) => e);
    expect(err).toMatchObject({ name: 'StreamInterruptedError', partialText: 'Hello ', cancelled: false });
  });
});

describe('disabled provider and factory', () => {
  it('AI_PROVIDER=disabled refuses every call with ProviderUnavailableError', async () => {
    const p = await createProvider({ provider: 'disabled' });
    expect(p).toBeInstanceOf(DisabledProvider);
    await expect(p.complete({ tier: 'small', messages: [] })).rejects.toBeInstanceOf(ProviderUnavailableError);
    await expect(p.stream!({ tier: 'small', messages: [] }, () => {})).rejects.toBeInstanceOf(ProviderUnavailableError);
  });
});

describe('embeddings', () => {
  it('mock: deterministic unit vectors, metered as simulated; refused in production', async () => {
    const e = new MockEmbedder(32, { env });
    const r = await e.embed(['photosynthesis in leaves', 'photosynthesis in leaves']);
    expect(r.vectors[0]).toEqual(r.vectors[1]);
    expect(Math.hypot(...r.vectors[0]!)).toBeCloseTo(1, 6);
    expect(r).toMatchObject({ simulated: true, inputTokens: 12 });
    expect(r.costPaise).toBeCloseTo(embeddingCostPaise(12), 9);
    expect(() => new MockEmbedder(32, { env: { APP_ENV: 'prod' } })).toThrow(MockInProductionError);
    const ac = new AbortController();
    ac.abort();
    await expect(e.embed(['x'], ac.signal)).rejects.toBeInstanceOf(CallerAbortedError);
  });

  it('azure: keyless request to /openai/v1/embeddings, vectors in input order', async () => {
    const seen: { url: string; body: Record<string, unknown>; auth: string | null }[] = [];
    const e = new AzureOpenAIEmbedder({
      endpoint: 'https://aoai.example.com/',
      deployment: 'emb',
      credential,
      dimensions: 3,
      fetch: (async (url: string, init: RequestInit) => {
        seen.push({ url, body: JSON.parse(String(init.body)), auth: new Headers(init.headers).get('authorization') });
        return new Response(JSON.stringify({ data: [{ index: 1, embedding: [0, 1, 0] }, { index: 0, embedding: [1, 0, 0] }], usage: { prompt_tokens: 7 } }));
      }) as unknown as typeof fetch,
    });
    const r = await e.embed(['a', 'b']);
    expect(r.vectors).toEqual([[1, 0, 0], [0, 1, 0]]);
    expect(r).toMatchObject({ inputTokens: 7, simulated: false });
    expect(seen[0]).toMatchObject({ url: 'https://aoai.example.com/openai/v1/embeddings', auth: 'Bearer tok', body: { model: 'emb', input: ['a', 'b'], dimensions: 3 } });
    const bad = new AzureOpenAIEmbedder({ endpoint: 'https://aoai.example.com', deployment: 'emb', credential, retry: { maxRetries: 0 }, fetch: (async () => new Response('{"data":[]}')) as unknown as typeof fetch });
    await expect(bad.embed(['a'])).rejects.toThrow(/expected 1 vectors/);
    expect(() => new AzureOpenAIEmbedder({ endpoint: 'http://x', deployment: 'e', credential })).toThrow();
  });

  it('factory: mock, azure (only when configured) or none', async () => {
    expect(await createEmbedder({ provider: 'mock', env })).toBeInstanceOf(MockEmbedder);
    expect(await createEmbedder({ provider: 'disabled', env })).toBeNull();
    expect(await createEmbedder({ provider: 'azure', env, credential })).toBeNull();
    expect(await createEmbedder({ provider: 'azure', env: { AZURE_OPENAI_ENDPOINT: 'https://a.example.com', AZURE_OPENAI_DEPLOYMENT_EMBEDDING: 'emb' }, credential })).toBeInstanceOf(AzureOpenAIEmbedder);
  });
});

import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { MODELS, costPaise } from '@soyl/shared/config/models';
import {
  AzureOpenAIProvider,
  BudgetExceededError,
  BudgetGuard,
  HttpError,
  MockInProductionError,
  MockProvider,
  ModelClient,
  ProviderConfigError,
  StructuredOutputError,
  azureConfigFromEnv,
  backoffMs,
  createLimiter,
  createProvider,
  estimateTokens,
  retryAfterMs,
  toJsonSchema,
  withRetry,
} from './index';

const noSleep = { sleep: async () => {}, random: () => 0.5 };

describe('metering (models.ts prices → paise)', () => {
  it('prices input, cached input and output separately', () => {
    // mid: ₹110 / ₹11 / ₹880 per 1M tokens
    const paise = costPaise('mid', { input_tokens: 1_000_000, cached_input_tokens: 0, output_tokens: 0 });
    expect(paise).toBeCloseTo(11_000, 6);
    expect(costPaise('mid', { input_tokens: 1_000_000, cached_input_tokens: 1_000_000, output_tokens: 0 })).toBeCloseTo(1_100, 6);
    expect(costPaise('mid', { input_tokens: 0, cached_input_tokens: 0, output_tokens: 1_000_000 })).toBeCloseTo(88_000, 6);
  });

  it('applies the Batch discount', () => {
    const u = { input_tokens: 10_000, cached_input_tokens: 2_000, output_tokens: 5_000 };
    expect(costPaise('mid', u, { batch: true })).toBeCloseTo(costPaise('mid', u) * MODELS.mid.batch_price_factor, 9);
  });

  it('reproduces the CONTEXT §6 per-action costs within 10%', () => {
    const quickDoubt = costPaise('small', { input_tokens: 600, cached_input_tokens: 0, output_tokens: 100 }) / 100;
    const hardDoubt = costPaise('mid', { input_tokens: 1_500, cached_input_tokens: 0, output_tokens: 400 }) / 100;
    const paperFromUpload = costPaise('mid', { input_tokens: 15_000, cached_input_tokens: 0, output_tokens: 5_000 }) / 100;
    expect(Math.abs(quickDoubt - 0.03) / 0.03).toBeLessThan(0.1);
    expect(Math.abs(hardDoubt - 0.53) / 0.53).toBeLessThan(0.1);
    expect(Math.abs(paperFromUpload - 6.1) / 6.1).toBeLessThan(0.1);
  });

  it('marks every price as unverified until OA-02', () => {
    for (const m of Object.values(MODELS)) expect(m.price_status).toBe('unverified');
  });

  it('every client call returns a usage record with cost', async () => {
    const records: unknown[] = [];
    const client = new ModelClient({ provider: new MockProvider({ seed: 1 }), onUsage: (r) => void records.push(r) });
    const res = await client.chat({ tier: 'small', messages: [{ role: 'user', content: 'Hello there, explain photosynthesis.' }] });
    expect(res.usage.provider).toBe('mock');
    expect(res.usage.model).toBe('mock');
    expect(res.usage.simulated).toBe(true);
    expect(res.usage.usage.input_tokens).toBeGreaterThan(0);
    expect(res.usage.cost_paise).toBeCloseTo(costPaise('small', res.usage.usage), 9);
    expect(records).toHaveLength(1);
  });

  it('estimates tokens for Latin and Devanagari text', () => {
    expect(estimateTokens('abcd'.repeat(10))).toBe(10);
    expect(estimateTokens('नमस्ते')).toBeGreaterThan(estimateTokens('namaste'));
  });
});

describe('BudgetGuard', () => {
  it('refuses a reservation that would exceed the run cap and keeps earlier spend', () => {
    const guard = new BudgetGuard({ runCapPaise: 1_000, totalCapPaise: 10_000 });
    const r1 = guard.reserve(600);
    guard.settle(r1, 550);
    expect(() => guard.reserve(500)).toThrow(BudgetExceededError);
    try {
      guard.reserve(500);
    } catch (e) {
      expect((e as BudgetExceededError).scope).toBe('run');
    }
    expect(guard.reserve(450).paise).toBe(450);
  });

  it('enforces the total cap including spend from earlier runs', () => {
    const guard = new BudgetGuard({ runCapPaise: 10_000, totalCapPaise: 1_000, spentTotalPaise: 900 });
    expect(() => guard.reserve(200)).toThrowError(/total budget/);
  });

  it('counts outstanding reservations', () => {
    const guard = new BudgetGuard({ runCapPaise: 1_000, totalCapPaise: 1_000 });
    const r = guard.reserve(800);
    expect(() => guard.reserve(300)).toThrow(BudgetExceededError);
    guard.release(r);
    expect(() => guard.reserve(300)).not.toThrow();
  });

  it('stops a client at the cap without calling the provider', async () => {
    let calls = 0;
    // Each call returns ~10k output tokens (≈176 paise on small) and reserves max_output_tokens (16k ≈ 282 paise).
    const provider = new MockProvider({ seed: 1, failOnCall: () => (calls++, null), fixtures: { long: () => 'x'.repeat(40_000) } });
    const guard = new BudgetGuard({ runCapPaise: 600, totalCapPaise: 1e9 });
    const client = new ModelClient({ provider, budget: guard });
    const req = { tier: 'small' as const, messages: [{ role: 'user' as const, content: 'hi' }], mock: { fixture: 'long' } };
    await client.chat(req);
    await client.chat(req);
    await expect(client.chat(req)).rejects.toBeInstanceOf(BudgetExceededError);
    expect(calls).toBe(2);
    expect(guard.snapshot().spentRunPaise).toBeGreaterThan(0);
  });
});

describe('retry and backoff', () => {
  it('reads retry-after-ms, retry-after seconds and HTTP dates', () => {
    expect(retryAfterMs(new Headers({ 'retry-after-ms': '1500' }))).toBe(1500);
    expect(retryAfterMs(new Headers({ 'retry-after': '7' }))).toBe(7000);
    const now = Date.parse('2026-10-26T00:00:00Z');
    expect(retryAfterMs(new Headers({ 'retry-after': 'Mon, 26 Oct 2026 00:00:03 GMT' }), now)).toBe(3000);
    expect(retryAfterMs(new Headers())).toBeNull();
  });

  it('backs off exponentially with jitter, capped', () => {
    const opts = { baseDelayMs: 1000, maxDelayMs: 8000 };
    expect(backoffMs(0, { ...opts, random: () => 0 })).toBe(500);
    expect(backoffMs(0, { ...opts, random: () => 1 })).toBe(1000);
    expect(backoffMs(2, { ...opts, random: () => 1 })).toBe(4000);
    expect(backoffMs(10, { ...opts, random: () => 1 })).toBe(8000);
  });

  it('retries 429 honouring retry-after, then succeeds', async () => {
    const sleeps: number[] = [];
    let n = 0;
    const result = await withRetry(
      async () => {
        if (n++ < 2) throw new HttpError(429, 'busy', new Headers({ 'retry-after': '2' }));
        return 'ok';
      },
      { sleep: async (ms) => void sleeps.push(ms), random: () => 0.5 },
    );
    expect(result).toBe('ok');
    expect(sleeps).toEqual([2000, 2000]);
  });

  it('does not retry 400 and gives up after maxRetries on 503', async () => {
    let n = 0;
    await expect(withRetry(async () => (n++, Promise.reject(new HttpError(400, 'bad'))), noSleep)).rejects.toThrow('bad');
    expect(n).toBe(1);
    n = 0;
    await expect(withRetry(async () => (n++, Promise.reject(new HttpError(503, 'down'))), { ...noSleep, maxRetries: 3 })).rejects.toThrow('down');
    expect(n).toBe(4);
  });
});

describe('limiter', () => {
  it('never runs more than N at once', async () => {
    const limit = createLimiter(2);
    let active = 0;
    let peak = 0;
    await Promise.all(
      Array.from({ length: 8 }, () =>
        limit(async () => {
          active++;
          peak = Math.max(peak, active);
          await new Promise((r) => setTimeout(r, 2));
          active--;
        }),
      ),
    );
    expect(peak).toBe(2);
  });
});

describe('MockProvider', () => {
  const Schema = z.object({ title: z.string().min(3), count: z.number().int().min(2), tags: z.array(z.enum(['a', 'b'])).min(1) });

  it('is deterministic by seed', async () => {
    const fixture = ({ rng }: { rng: { int: (a: number, b: number) => number } }) => ({ value: rng.int(1, 1_000_000) });
    const make = (seed: number) => new MockProvider({ seed, fixtures: { f: fixture } });
    const req = { tier: 'mid' as const, messages: [{ role: 'user' as const, content: 'x' }], mock: { fixture: 'f' } };
    const a = await make(7).complete(req);
    const b = await make(7).complete(req);
    const c = await make(8).complete(req);
    expect(a.text).toBe(b.text);
    expect(a.text).not.toBe(c.text);
  });

  it('returns schema-valid structured output without a fixture', async () => {
    const client = new ModelClient({ provider: new MockProvider({ seed: 3 }) });
    const res = await client.structured({ tier: 'mid', schema: Schema, schemaName: 'thing', messages: [{ role: 'user', content: 'make a thing' }] });
    expect(Schema.safeParse(res.data).success).toBe(true);
    expect(res.data.title).toContain('MOCK');
  });

  it('refuses to construct in production (GEN-3) unless the explicit test flag is set', async () => {
    expect(() => new MockProvider({ env: { NODE_ENV: 'production' } })).toThrow(MockInProductionError);
    expect(() => new MockProvider({ env: { APP_ENV: 'prod' } })).toThrow(MockInProductionError);
    await expect(createProvider({ provider: 'mock', env: { NODE_ENV: 'production' } })).rejects.toThrow(MockInProductionError);
    expect(() => new MockProvider({ env: { NODE_ENV: 'production' }, unsafeAllowInProduction: true })).not.toThrow();
    expect(() => new MockProvider({ env: { NODE_ENV: 'development' } })).not.toThrow();
  });

  it('runs Batch jobs in memory', async () => {
    const client = new ModelClient({ provider: new MockProvider({ seed: 1 }) });
    const items = ['x', 'y'].map((id) => ({
      customId: id,
      request: { tier: 'mid' as const, schema: Schema, schemaName: 'thing', messages: [{ role: 'user' as const, content: id }] },
    }));
    const { jobId } = await client.submitBatch(items);
    expect((await client.pollBatch(jobId)).state).toBe('completed');
    const results = await client.fetchBatch(jobId, items);
    expect(results.every((r) => r.ok)).toBe(true);
    expect(results[0]!.ok && results[0]!.usage.batch).toBe(true);
  });
});

describe('ModelClient structured output', () => {
  it('repairs once, then fails with the validation issues', async () => {
    const Schema = z.object({ n: z.number().min(10) });
    let call = 0;
    const provider = new MockProvider({ fixtures: { bad: () => ({ n: 1 }), good: () => ({ n: call++ === 0 ? 1 : 12 }) } });
    const client = new ModelClient({ provider });
    const ok = await client.structured({ tier: 'mid', schema: Schema, schemaName: 'n', messages: [{ role: 'user', content: 'a' }], mock: { fixture: 'good' } });
    expect(ok.repairs).toBe(1);
    expect(ok.calls).toHaveLength(2);
    await expect(
      client.structured({ tier: 'mid', schema: Schema, schemaName: 'n', messages: [{ role: 'user', content: 'a' }], mock: { fixture: 'bad' } }),
    ).rejects.toBeInstanceOf(StructuredOutputError);
  });

  it('derives a JSON Schema from zod', () => {
    const js = toJsonSchema(z.object({ a: z.string(), b: z.number().default(1) }));
    expect(js.type).toBe('object');
    expect(js.required).toEqual(['a']);
  });
});

describe('AzureOpenAIProvider', () => {
  const deployments = { small: 'luna-dep', mid: 'sol-dep', verify: 'astra-dep' };
  const credential = { getToken: async () => ({ token: 'test-token', expiresOnTimestamp: Date.now() + 3_600_000 }) };
  const okBody = {
    id: 'chatcmpl-1',
    model: 'gpt-6.1-sol',
    choices: [{ message: { content: '{"n":12}' }, finish_reason: 'stop' }],
    usage: { prompt_tokens: 1200, completion_tokens: 300, prompt_tokens_details: { cached_tokens: 1000 } },
  };

  function fakeFetch(responses: Response[]) {
    const calls: { url: string; init: RequestInit }[] = [];
    const fn = (async (url: string | URL, init?: RequestInit) => {
      calls.push({ url: String(url), init: init ?? {} });
      const next = responses.shift();
      if (!next) throw new Error('no more fake responses');
      return next;
    }) as typeof fetch;
    return { fn, calls };
  }

  it('sends a keyless v1 chat request with a JSON Schema response format', async () => {
    const { fn, calls } = fakeFetch([new Response(JSON.stringify(okBody), { status: 200, headers: { 'apim-request-id': 'req-1' } })]);
    const provider = new AzureOpenAIProvider({ endpoint: 'https://soyl-aoai.openai.azure.com/', deployments, credential, fetch: fn });
    const client = new ModelClient({ provider });
    const Schema = z.object({ n: z.number() });
    const res = await client.structured({
      tier: 'mid',
      schema: Schema,
      schemaName: 'n_schema',
      messages: [{ role: 'system', content: 'sys' }, { role: 'user', content: 'hi' }],
      maxOutputTokens: 2000,
      temperature: 0.3,
      reasoningEffort: 'low',
    });
    expect(res.data).toEqual({ n: 12 });
    expect(calls).toHaveLength(1);
    const { url, init } = calls[0]!;
    expect(url).toBe('https://soyl-aoai.openai.azure.com/openai/v1/chat/completions');
    const headers = new Headers(init.headers);
    expect(headers.get('authorization')).toBe('Bearer test-token');
    expect(headers.get('api-key')).toBeNull();
    expect(headers.get('content-type')).toBe('application/json');
    const body = JSON.parse(String(init.body));
    expect(body.model).toBe('sol-dep');
    expect(body.max_completion_tokens).toBe(2000);
    expect(body.reasoning_effort).toBe('low');
    expect(body.temperature).toBeUndefined();
    expect(body.response_format.type).toBe('json_schema');
    expect(body.response_format.json_schema.name).toBe('n_schema');
    expect(body.response_format.json_schema.schema.properties.n.type).toBe('number');
    expect(res.usage.usage).toEqual({ input_tokens: 1200, cached_input_tokens: 1000, output_tokens: 300 });
    expect(res.usage.request_id).toBe('req-1');
    expect(res.usage.simulated).toBe(false);
    expect(res.usage.cost_paise).toBeCloseTo(costPaise('mid', res.usage.usage), 9);
  });

  it('retries a 429 with retry-after-ms', async () => {
    const { fn, calls } = fakeFetch([
      new Response('rate limited', { status: 429, headers: { 'retry-after-ms': '250' } }),
      new Response(JSON.stringify(okBody), { status: 200 }),
    ]);
    const sleeps: number[] = [];
    const provider = new AzureOpenAIProvider({
      endpoint: 'https://x.openai.azure.com',
      deployments,
      credential,
      fetch: fn,
      retry: { sleep: async (ms) => void sleeps.push(ms) },
    });
    const out = await provider.complete({ tier: 'small', messages: [{ role: 'user', content: 'q' }] });
    expect(out.text).toBe('{"n":12}');
    expect(calls).toHaveLength(2);
    expect(sleeps).toEqual([250]);
  });

  it('submits, polls and fetches a Batch job', async () => {
    const output = [
      { custom_id: 'a', response: { status_code: 200, request_id: 'r-a', body: okBody } },
      { custom_id: 'b', response: { status_code: 400, body: { error: { message: 'bad' } } } },
    ]
      .map((l) => JSON.stringify(l))
      .join('\n');
    const { fn, calls } = fakeFetch([
      new Response(JSON.stringify({ id: 'file-in' }), { status: 200 }),
      new Response(JSON.stringify({ id: 'batch-1' }), { status: 200 }),
      new Response(JSON.stringify({ status: 'completed', request_counts: { total: 2, completed: 1, failed: 1 } }), { status: 200 }),
      new Response(JSON.stringify({ output_file_id: 'file-out', error_file_id: null }), { status: 200 }),
      new Response(output, { status: 200 }),
    ]);
    const provider = new AzureOpenAIProvider({ endpoint: 'https://x.openai.azure.com', deployments, batchDeployments: { mid: 'sol-batch' }, credential, fetch: fn });
    const { jobId } = await provider.batch.submit([
      { customId: 'a', request: { tier: 'mid', messages: [{ role: 'user', content: '1' }] } },
      { customId: 'b', request: { tier: 'mid', messages: [{ role: 'user', content: '2' }] } },
    ]);
    expect(jobId).toBe('batch-1');
    expect(calls[0]!.url).toMatch(/\/openai\/v1\/files$/);
    expect(calls[0]!.init.body).toBeInstanceOf(FormData);
    const jsonl = await ((calls[0]!.init.body as FormData).get('file') as Blob).text();
    expect(JSON.parse(jsonl.split('\n')[0]!)).toMatchObject({ custom_id: 'a', method: 'POST', url: '/chat/completions', body: { model: 'sol-batch' } });
    expect(JSON.parse(String(calls[1]!.init.body))).toEqual({ input_file_id: 'file-in', endpoint: '/chat/completions', completion_window: '24h' });
    expect((await provider.batch.poll(jobId)).state).toBe('completed');
    const results = await provider.batch.fetch(jobId);
    expect(results.map((r) => [r.customId, r.ok])).toEqual([
      ['a', true],
      ['b', false],
    ]);
  });

  it('is configured from env and explains what is missing', () => {
    expect(() => azureConfigFromEnv({})).toThrow(ProviderConfigError);
    expect(() => azureConfigFromEnv({})).toThrow(/AZURE_OPENAI_ENDPOINT.*AZURE_OPENAI_DEPLOYMENT_SMALL/);
    const cfg = azureConfigFromEnv({
      AZURE_OPENAI_ENDPOINT: 'https://x.openai.azure.com',
      AZURE_OPENAI_DEPLOYMENT_SMALL: 's',
      AZURE_OPENAI_DEPLOYMENT_MID: 'm',
      // Ignored: D-033 — the verify pass runs on the Sol (mid) deployment; there is no separate verify model.
      AZURE_OPENAI_DEPLOYMENT_VERIFY: 'v',
    });
    expect(cfg.deployments).toEqual({ small: 's', mid: 'm', verify: 'm' });
  });

  it('rejects a non-https endpoint', () => {
    expect(() => new AzureOpenAIProvider({ endpoint: 'http://x', deployments, credential })).toThrow(/https/);
  });
});

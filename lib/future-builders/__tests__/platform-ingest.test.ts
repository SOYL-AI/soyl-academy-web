import { describe, expect, it, vi } from 'vitest';
import {
  CLIENT_IP_HEADER,
  EDGE_AUTH_HEADER,
  clientIpFrom,
  ENROLLMENTS_PATH,
  INGEST_KEY_HEADER,
  IngestError,
  LEADS_PATH,
  readIngestConfig,
  recordEnrollment,
  recordLead,
  type EnrollmentPayload,
  type IngestConfig,
} from '@/lib/platform-ingest';

// Generated per run so no secret-shaped literal lives in git (gitleaks).
const EDGE = `edge-${crypto.randomUUID()}`;
const KEY = `ingest-${crypto.randomUUID()}`;

const ENROLLMENT: EnrollmentPayload = {
  razorpayOrderId: 'order_1',
  razorpayPaymentId: 'pay_1',
  amountPaise: 329900,
  currency: 'INR',
  paidAt: '2026-11-10T06:30:00.000Z',
  cohort: 'summer-2027',
  offer: 'diwali-2026',
  coupon: null,
  friendName: null,
  parentName: 'Priya Sharma',
  studentName: 'Arjun',
  email: 'priya@example.com',
  phone: '+919876543210',
  grade: '9',
  source: 'checkout',
};
const OK_ENROLLMENT = { enrollmentId: 'enr_1', receiptNumber: 'FB-2027-000001', created: true };

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

function config(fetchImpl: IngestConfig['fetch'], over: Partial<IngestConfig> = {}): IngestConfig {
  return { origin: 'https://api.test', edgeSecret: EDGE, ingestKey: KEY, timeoutMs: 1000, retryDelayMs: 0, fetch: fetchImpl, ...over };
}

describe('readIngestConfig', () => {
  const env = { PLATFORM_API_ORIGIN: 'https://api.test/', PLATFORM_EDGE_SECRET: EDGE, FB_INGEST_KEY: KEY };
  it('reads the three server variables and strips trailing slashes', () => {
    expect(readIngestConfig(env)).toMatchObject({ origin: 'https://api.test', edgeSecret: EDGE, ingestKey: KEY, timeoutMs: 8000 });
  });
  it('is null when any is missing or the origin has a path', () => {
    expect(readIngestConfig({ ...env, FB_INGEST_KEY: '' })).toBeNull();
    expect(readIngestConfig({ ...env, PLATFORM_EDGE_SECRET: undefined })).toBeNull();
    expect(readIngestConfig({ ...env, PLATFORM_API_ORIGIN: undefined })).toBeNull();
    expect(readIngestConfig({ ...env, PLATFORM_API_ORIGIN: 'https://api.test/v1' })).toBeNull();
    expect(readIngestConfig({ ...env, PLATFORM_API_ORIGIN: 'ftp://api.test' })).toBeNull();
  });
  it('never reads NEXT_PUBLIC_ variants', () => {
    expect(readIngestConfig({ PLATFORM_API_ORIGIN: 'https://api.test', NEXT_PUBLIC_PLATFORM_EDGE_SECRET: EDGE, NEXT_PUBLIC_FB_INGEST_KEY: KEY })).toBeNull();
  });
});

describe('recordEnrollment', () => {
  it('POSTs the payload as JSON with both auth headers, and returns the receipt', async () => {
    const fetchMock = vi.fn(async () => json(200, OK_ENROLLMENT));
    await expect(recordEnrollment(config(fetchMock), ENROLLMENT)).resolves.toEqual(OK_ENROLLMENT);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(`https://api.test${ENROLLMENTS_PATH}`);
    expect(url).toBe('https://api.test/v1/ingest/future-builders/enrollments');
    expect(init.method).toBe('POST');
    const headers = init.headers as Record<string, string>;
    expect(headers['content-type']).toBe('application/json');
    expect(headers[EDGE_AUTH_HEADER]).toBe(EDGE);
    expect(headers[INGEST_KEY_HEADER]).toBe(KEY);
    expect(EDGE_AUTH_HEADER).toBe('x-soyl-edge-auth');
    expect(INGEST_KEY_HEADER).toBe('x-soyl-ingest-key');
    expect(JSON.parse(init.body as string)).toEqual(ENROLLMENT);
  });

  it('forwards the parent IP as x-soyl-client-ip only when given', async () => {
    const fetchMock = vi.fn(async () => json(200, OK_ENROLLMENT));
    await recordEnrollment(config(fetchMock), ENROLLMENT, '203.0.113.7');
    await recordEnrollment(config(fetchMock), ENROLLMENT);
    const headersOf = (i: number) => (fetchMock.mock.calls[i] as unknown as [string, RequestInit])[1].headers as Record<string, string>;
    expect(CLIENT_IP_HEADER).toBe('x-soyl-client-ip');
    expect(headersOf(0)[CLIENT_IP_HEADER]).toBe('203.0.113.7');
    expect(headersOf(1)).not.toHaveProperty(CLIENT_IP_HEADER);
  });

  it('retries once after a 5xx and succeeds', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json(503, { error: 'busy' })).mockResolvedValueOnce(json(200, { ...OK_ENROLLMENT, created: false }));
    await expect(recordEnrollment(config(fetchMock), ENROLLMENT)).resolves.toMatchObject({ created: false });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('retries once after a network error and a 429', async () => {
    const network = vi.fn().mockRejectedValueOnce(new TypeError('fetch failed')).mockResolvedValueOnce(json(200, OK_ENROLLMENT));
    await expect(recordEnrollment(config(network), ENROLLMENT)).resolves.toEqual(OK_ENROLLMENT);
    const limited = vi.fn().mockResolvedValueOnce(json(429, {})).mockResolvedValueOnce(json(200, OK_ENROLLMENT));
    await expect(recordEnrollment(config(limited), ENROLLMENT)).resolves.toEqual(OK_ENROLLMENT);
  });

  it('gives up after the one retry', async () => {
    const fetchMock = vi.fn(async () => json(502, {}));
    const err = await recordEnrollment(config(fetchMock), ENROLLMENT).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(IngestError);
    expect((err as IngestError).status).toBe(502);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not retry a 4xx (bad key, bad payload)', async () => {
    for (const status of [400, 401, 403, 422]) {
      const fetchMock = vi.fn(async () => json(status, { error: 'no' }));
      await expect(recordEnrollment(config(fetchMock), ENROLLMENT)).rejects.toMatchObject({ status });
      expect(fetchMock).toHaveBeenCalledOnce();
    }
  });

  it('times out a hung request, retries, and reports the timeout', async () => {
    const hang = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
        }),
    );
    await expect(recordEnrollment(config(hang, { timeoutMs: 20 }), ENROLLMENT)).rejects.toThrow(/timed out after 20 ms/);
    expect(hang).toHaveBeenCalledTimes(2);
  });

  it('rejects a 200 with an unexpected body', async () => {
    const fetchMock = vi.fn(async () => json(200, { ok: true }));
    await expect(recordEnrollment(config(fetchMock), ENROLLMENT)).rejects.toThrow(/unexpected body/);
    const notJson = vi.fn(async () => new Response('<html>', { status: 200 }));
    await expect(recordEnrollment(config(notJson), ENROLLMENT)).rejects.toThrow(/unexpected body/);
  });
});

describe('clientIpFrom', () => {
  const h = (init: Record<string, string>) => new Headers(init);
  it('takes the first x-forwarded-for hop, else x-real-ip', () => {
    expect(clientIpFrom(h({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1', 'x-real-ip': '198.51.100.2' }))).toBe('203.0.113.7');
    expect(clientIpFrom(h({ 'x-real-ip': '198.51.100.2' }))).toBe('198.51.100.2');
    expect(clientIpFrom(h({ 'x-forwarded-for': ' 2001:DB8::1 ' }))).toBe('2001:db8::1');
  });
  it('drops anything that is not a plain IP literal', () => {
    expect(clientIpFrom(h({}))).toBeNull();
    expect(clientIpFrom(h({ 'x-forwarded-for': 'evil.example, 10.0.0.1' }))).toBeNull();
    expect(clientIpFrom(h({ 'x-forwarded-for': '999.1.1.1' }))).toBeNull();
    expect(clientIpFrom(h({ 'x-forwarded-for': 'unknown', 'x-real-ip': '198.51.100.2' }))).toBe('198.51.100.2');
  });
});

describe('recordLead', () => {
  it('POSTs to the leads endpoint and returns the lead id (201)', async () => {
    const fetchMock = vi.fn(async () => json(201, { leadId: 'lead_1' }));
    const lead = { kind: 'callback' as const, parentName: 'Priya', phone: '+919876543210', source: 'fb_summer_2027' };
    await expect(recordLead(config(fetchMock), lead)).resolves.toEqual({ leadId: 'lead_1' });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(`https://api.test${LEADS_PATH}`);
    expect(url).toBe('https://api.test/v1/ingest/future-builders/leads');
    expect(JSON.parse(init.body as string)).toEqual(lead);
  });
});

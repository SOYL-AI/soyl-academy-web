import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, isApiError } from '@/platform/shared/api-client';

const h = vi.hoisted(() => ({ api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));

import { SseParser, streamAiAction, type AiStreamEvent } from '../ai/sse';
import { aiBlockFrom, aiMessage, creditsText, newIdempotencyKey, safePlansPath } from '../ai/problems';
import { fitWithin, uploadForAi, UploadRejected } from '../ai/upload';
import { applyEvent, type ChatMessage } from '../ai/useAiStream';
import { checkoutOptions } from '../plans/razorpay';
import { billingProblem, featureText } from '../plans/PlansClient';

afterEach(() => {
  for (const fn of Object.values(h.api)) fn.mockReset();
});

const enc = new TextEncoder();
function sseResponse(chunks: string[], status = 200, type = 'text/event-stream'): Response {
  const body = new ReadableStream<Uint8Array>({
    start(c) {
      for (const ch of chunks) c.enqueue(enc.encode(ch));
      c.close();
    },
  });
  return new Response(body, { status, headers: { 'content-type': type } });
}

describe('SSE parser (ai-gateway M4 protocol)', () => {
  it('parses events split across chunks, CRLF, comments, multi-line data; ignores unknown events', () => {
    const p = new SseParser();
    const out: AiStreamEvent[] = [];
    out.push(...p.push('event: meta\ndata: {"requestId":"r","conversationId":"c","credits":1,"balance":24,"mode":"hint"}\n\n: keep-alive\n\nevent: del'));
    out.push(...p.push('ta\r\ndata: {"text":"Hel"}\r\n\r\nevent: delta\ndata: {"text":\ndata: "lo"}\n\nevent: ping\ndata: {}\n\n'));
    out.push(...p.push('event: done\ndata: {"status":"ok","creditsCharged":1,"balance":24}'));
    out.push(...p.end());
    expect(out.map((e) => e.type)).toEqual(['meta', 'delta', 'delta', 'done']);
    expect(out[2]).toEqual({ type: 'delta', data: { text: 'lo' } });
    expect(new SseParser().push('event: delta\ndata: not json\n\n')).toEqual([]);
  });

  it('streamAiAction posts with the Idempotency-Key and dispatches events in order', async () => {
    const fetchImpl = vi.fn(async () => sseResponse(['event: meta\ndata: {"conversationId":"c1","balance":23,"mode":"hint","language":"hinglish"}\n\n', 'event: delta\ndata: {"text":"[MOCK] Hint"}\n\nevent: done\ndata: {"status":"ok","creditsCharged":1,"balance":23}\n\n']));
    const events: string[] = [];
    await streamAiAction('quick-doubt', { message: 'why?' }, { idempotencyKey: 'key-12345678', fetchImpl: fetchImpl as unknown as typeof fetch, onEvent: (e) => events.push(e.type) }); // gitleaks:allow (placeholder idempotency key)
    expect(events).toEqual(['meta', 'delta', 'done']);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/platform/v1/ai/quick-doubt');
    expect((init.headers as Record<string, string>)['idempotency-key']).toBe('key-12345678');
    expect(init.credentials).toBe('same-origin');
    expect(JSON.parse(String(init.body))).toEqual({ message: 'why?' });
  });

  it('problem+json before the stream becomes an ApiError with the paywall fields', async () => {
    const problem = { type: 'x', title: 'Out of credits', status: 402, code: 'credits_exhausted', traceId: 't', balance: 0, required: 6, resetAt: '2026-10-27T18:30:00.000Z', resetInSeconds: 3600, plansUrl: 'https://evil.example/plans' };
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(problem), { status: 402, headers: { 'content-type': 'application/problem+json' } }));
    const err = await streamAiAction('hard-doubt', { message: 'x' }, { idempotencyKey: 'k-12345678', fetchImpl: fetchImpl as unknown as typeof fetch, onEvent: () => {} }).catch((e) => e);
    expect(isApiError(err, 'credits_exhausted')).toBe(true);
    const block = aiBlockFrom(err);
    expect(block).toEqual({ kind: 'paywall', balance: 0, required: 6, resetAt: '2026-10-27T18:30:00.000Z', resetInSeconds: 3600, plansUrl: '/plans' });
  });

  it('maps every gateway code to a page state', () => {
    const e = (code: string, status = 400, extra = {}) => new ApiError(status, code, { type: '', title: '', status, code, traceId: '', ...extra });
    expect(aiBlockFrom(e('plan_required', 403, { plan: 'pro', plansUrl: '/plans?x=1' }))).toEqual({ kind: 'plan', plan: 'pro', plansUrl: '/plans' });
    expect(aiBlockFrom(e('consent_required', 403)).kind).toBe('consent');
    expect(aiBlockFrom(e('ai_paused', 503)).kind).toBe('paused');
    expect(aiBlockFrom(e('ai_unavailable', 503)).kind).toBe('unavailable');
    expect(aiBlockFrom(e('ai_busy', 429)).kind).toBe('busy');
    expect(aiBlockFrom(e('ai_blocked_during_test', 409)).kind).toBe('during-test');
    expect(aiBlockFrom(e('validation_failed', 400, { errors: [{ path: 'body.message', message: 'x' }] }))).toEqual({ kind: 'other', message: expect.stringMatching(/Type your question/) });
    expect(aiMessage(new Error('x'))).toMatch(/Something went wrong/);
    expect(creditsText(1)).toBe('1 credit');
    expect(safePlansPath('/plans')).toBe('/plans');
    expect(safePlansPath('javascript:alert(1)')).toBe('/plans');
    expect(newIdempotencyKey()).toMatch(/^[A-Za-z0-9_\-:.]{8,128}$/);
  });

  it('applyEvent: deltas append, refusals replace text, errors say whether credits were refunded', () => {
    let m: ChatMessage = { id: 'a', role: 'assistant', text: '', status: 'streaming' };
    m = applyEvent(m, { type: 'meta', data: { mode: 'hint', language: 'hindi' } as never });
    m = applyEvent(m, { type: 'delta', data: { text: 'abc' } });
    m = applyEvent(m, { type: 'delta', data: { text: 'def' } });
    expect(m).toMatchObject({ text: 'abcdef', mode: 'hint', language: 'hindi' });
    expect(applyEvent(m, { type: 'done', data: { status: 'ok', creditsCharged: 1, balance: 1 } }).status).toBe('done');
    const r = applyEvent(m, { type: 'refusal', data: { kind: 'self_harm', message: 'Call 14416', creditsRefunded: 1 } });
    expect(r).toMatchObject({ status: 'refused', text: 'Call 14416', refusalKind: 'self_harm', note: 'Your credits were refunded.' });
    const e1 = applyEvent({ ...m, text: '' }, { type: 'error', data: { code: 'ai_failed', message: 'server words', creditsRefunded: 6 } });
    expect(e1.note).toBe('The AI could not finish this answer. Your credits were refunded.');
    const e2 = applyEvent(m, { type: 'error', data: { code: 'ai_interrupted', message: 'x', creditsCharged: 6 } });
    expect(e2.note).toBe('The answer was cut off. The part shown was charged.');
  });
});

describe('uploads (ai-gateway M4 handoff §7)', () => {
  it('fits images within 2048 px', () => {
    expect(fitWithin(4000, 3000)).toEqual({ width: 2048, height: 1536 });
    expect(fitWithin(1000, 3000)).toEqual({ width: 683, height: 2048 });
    expect(fitWithin(800, 600)).toEqual({ width: 800, height: 600 });
    expect(fitWithin(0, 10)).toEqual({ width: 0, height: 0 });
  });

  it('create → PUT with exactly the signed headers, no credentials → complete → poll until ready', async () => {
    h.api.post.mockImplementation(async (path: string) => {
      if (path === '/v1/ai/uploads') return { uploadId: 'up1', uploadUrl: 'https://blob.example/q/up1?sig=x', method: 'PUT', headers: { 'x-ms-blob-type': 'BlockBlob', 'content-type': 'image/jpeg' }, uploadExpiresAt: '', maxBytes: 1, expiresAt: '' };
      return { id: 'up1', status: 'uploaded' };
    });
    h.api.get.mockResolvedValueOnce({ id: 'up1', status: 'scanning' }).mockResolvedValueOnce({ id: 'up1', status: 'ready', rejectReason: null });
    const fetchImpl = vi.fn(async () => new Response(null, { status: 201 }));
    const stages: string[] = [];
    const blob = new Blob(['jpeg-bytes'], { type: 'image/jpeg' });
    const up = await uploadForAi({ kind: 'photo_doubt', blob, contentType: 'image/jpeg', fetchImpl: fetchImpl as unknown as typeof fetch, pollMs: 1, onStage: (s) => stages.push(s) });
    expect(up.status).toBe('ready');
    expect(h.api.post.mock.calls[0]).toEqual(['/v1/ai/uploads', { body: { kind: 'photo_doubt', contentType: 'image/jpeg', bytes: blob.size }, signal: undefined }]);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://blob.example/q/up1?sig=x');
    expect(init).toMatchObject({ method: 'PUT', credentials: 'omit', headers: { 'x-ms-blob-type': 'BlockBlob', 'content-type': 'image/jpeg' } });
    expect(stages).toEqual(['uploading', 'checking']);
  });

  it('a rejected upload explains why in plain words', async () => {
    h.api.post.mockImplementation(async (path: string) => (path === '/v1/ai/uploads' ? { uploadId: 'u', uploadUrl: 'https://b/x', headers: {} } : { id: 'u', status: 'rejected', rejectReason: 'unsafe_content' }));
    const err = await uploadForAi({ kind: 'photo_doubt', blob: new Blob(['x']), contentType: 'image/jpeg', fetchImpl: (async () => new Response(null, { status: 201 })) as unknown as typeof fetch }).catch((e) => e);
    expect(err).toBeInstanceOf(UploadRejected);
    expect(err.message).toMatch(/only a photo of your question/);
  });
});

describe('plans (billing-razorpay M4 handoff)', () => {
  it('Checkout options never carry prefill; subscriptions vs orders', () => {
    const handlers = { onPaid: vi.fn(), onDismiss: vi.fn() };
    const sub = checkoutOptions({ kind: 'subscription', keyId: 'rzp_test_1', subscriptionId: 'sub_1', plan: 'plus', interval: 'monthly', amountPaise: 19900, currency: 'INR', label: '₹199/month', name: 'SOYL', description: 'Plus', reused: false }, handlers);
    expect(sub).toMatchObject({ key: 'rzp_test_1', subscription_id: 'sub_1', name: 'SOYL' });
    expect(sub).not.toHaveProperty('prefill');
    expect(sub).not.toHaveProperty('order_id');
    const order = checkoutOptions({ kind: 'order', keyId: 'k', orderId: 'order_1', plan: 'board_exam_pass', amountPaise: 49900, currency: 'INR', label: '', name: '', description: '', validUntil: '', reused: false }, handlers);
    expect(order).toMatchObject({ order_id: 'order_1', amount: 49900 });
    expect(order).not.toHaveProperty('prefill');
    // The handler ignores Checkout's response (AC-10): nothing is forwarded.
    (order.handler as (r: unknown) => void)({ razorpay_payment_id: 'pay_x', razorpay_signature: 'sig' });
    expect(handlers.onPaid).toHaveBeenCalledWith();
  });

  it('features come from the API (D-034: no per-plan hard-coding); problems are friendly', () => {
    expect(featureText('ai_credits', { creditsPerDay: 40 })).toBe('40 AI credits every day');
    expect(featureText('paper_from_upload', { creditsPerDay: 60 })).toMatch(/Papers like my school/);
    expect(featureText('new_shiny_thing', { creditsPerDay: 1 })).toBe('New shiny thing');
    expect(billingProblem(new ApiError(403, 'consent_required', null)).message).toMatch(/parent/);
    expect(billingProblem(new ApiError(403, 'billing_disabled', null)).message).toMatch(/not on sale/);
    expect(billingProblem(new ApiError(409, 'already_subscribed', null)).code).toBe('already_subscribed');
    expect(billingProblem(new ApiError(503, 'billing_unavailable', null)).message).toMatch(/not available/);
  });
});

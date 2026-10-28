/**
 * Spend controls (ARCHITECTURE §10, D-015, F-009, AC-06, CONTEXT §6 guardrail): the global daily
 * breaker and the free-tier sub-budget (60 %), degrade-to-small-tier then pause, alerts at 50/80/100 %
 * exactly once, recovery at 00:00 IST or when the cap is raised, and the 7-day cost guardrail.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { eq, sql } from 'drizzle-orm';
import { aiRequests } from '@soyl/db';
import { costGuardrail } from '../src/ai/maintenance';
import { createAiHarness, sse, type AiHarness } from './ai-fixture';

let h: AiHarness;
const DAY1 = Date.parse('2026-11-05T06:00:00Z'); // 11:30 IST

beforeAll(async () => {
  h = await createAiHarness();
});
afterAll(async () => {
  await h?.close();
});
beforeEach(async () => {
  h.clock.set(DAY1);
  h.services.ai.breaker.setCapPaise(1_000); // ₹10 a day; the free tier may use ₹6
  await h.t.db.execute(sql`DELETE FROM ai_spend_daily`);
  h.alerts.alerts.length = 0;
});

const breaker = () => h.services.ai.breaker;

describe('spend breaker', () => {
  it('alerts at 50/80/100 % exactly once per budget per day (concurrent increments included)', async () => {
    await breaker().record(300, false);
    expect(h.alerts.alerts).toEqual([]);
    await Promise.all(Array.from({ length: 5 }, () => breaker().record(60, false))); // → 60 %
    expect(h.alerts.alerts.map((a) => a.data.threshold)).toEqual([0.5]);
    await breaker().record(250, false); // 85 %
    await breaker().record(10, false);
    await breaker().record(200, false); // 105 %
    expect(h.alerts.alerts.map((a) => [a.data.scope, a.data.threshold, a.severity])).toEqual([
      ['all', 0.5, 'info'],
      ['all', 0.8, 'warning'],
      ['all', 1, 'critical'],
    ]);
    expect(h.alerts.alerts[2]!.message).toMatch(/paused/);
    // Free-tier spend counts in both budgets; the free budget has its own alerts.
    h.alerts.alerts.length = 0;
    await h.t.db.execute(sql`DELETE FROM ai_spend_daily`);
    await breaker().record(310, true); // free 51.7 %, all 31 %
    expect(h.alerts.alerts.map((a) => [a.data.scope, a.data.threshold])).toEqual([['free', 0.5]]);
  });

  it('free-tier sub-budget (D-015): free students pause while subscribers keep getting answers', async () => {
    await breaker().record(600, true); // free budget full; overall 60 %
    const free = await h.member();
    const paid = await h.member();
    h.plans.set(paid.id, 'plus');
    const paused = await free.c.post('/v1/ai/quick-doubt', { message: 'What is inertia?' });
    expect(paused.statusCode).toBe(503);
    expect(paused.json().code).toBe('ai_paused');
    expect(Number(paused.headers['retry-after'])).toBe(12.5 * 3600); // 11:30 IST → 00:00 IST
    expect((await free.c.get('/v1/ai/quote/quick-doubt')).json().status).toBe('paused');
    expect((await free.c.get('/v1/credits')).json().balance).toBe(50); // nothing reserved
    const ok = await paid.c.post('/v1/ai/quick-doubt', { message: 'What is inertia?' });
    expect(ok.statusCode).toBe(200);
    expect(sse(ok).at(-1)!.data.status).toBe('succeeded');
    expect((await free.c.get('/v1/catalog/boards')).statusCode).toBe(200); // never blocks non-AI
  });

  it('degraded (≥ 80 %): mid-tier doubts run on the small tier; vision and evaluation pause', async () => {
    await breaker().record(850, false);
    const paid = await h.member();
    h.plans.set(paid.id, 'pro');
    expect((await paid.c.get('/v1/ai/quote/hard-doubt')).json()).toMatchObject({ status: 'degraded', tier: 'small', credits: 7 });
    expect((await paid.c.get('/v1/ai/quote/photo-doubt')).json().status).toBe('paused');
    const ev = sse(await paid.c.post('/v1/ai/hard-doubt', { message: 'Derive the equation of motion v = u + at' }));
    expect(ev[0]!.data).toMatchObject({ tier: 'small', degraded: true, credits: 7 });
    const [row] = await h.t.db.select().from(aiRequests).where(eq(aiRequests.requestId, String(ev[0]!.data.requestId)));
    expect(row).toMatchObject({ modelTier: 'small', degraded: true, status: 'succeeded' });
    const photo = await paid.c.post('/v1/ai/photo-doubt', { uploadId: '0190f5b0-0000-7000-8000-000000000001' });
    expect(photo.statusCode).toBe(503);
    expect(photo.json().code).toBe('ai_paused');
  });

  it('trips at 100 % for everyone and recovers at 00:00 IST, or when the owner raises the cap', async () => {
    await breaker().record(1_000, false);
    const paid = await h.member();
    h.plans.set(paid.id, 'pro');
    expect((await paid.c.post('/v1/ai/quick-doubt', { message: 'What is friction?' })).statusCode).toBe(503);
    expect((await breaker().state(false)).status).toBe('paused');
    h.clock.set(Date.parse('2026-11-05T18:31:00Z')); // 00:01 IST next day
    expect((await breaker().state(false)).status).toBe('normal');
    expect((await paid.c.post('/v1/ai/quick-doubt', { message: 'What is friction?' })).statusCode).toBe(200);
    h.clock.set(DAY1);
    breaker().setCapPaise(10_000);
    expect((await breaker().state(false)).status).toBe('normal');
    expect((await paid.c.post('/v1/ai/quick-doubt', { message: 'What is a lever?' })).statusCode).toBe(200);
  });

  it('a zero cap pauses AI entirely (owner kill switch)', async () => {
    breaker().setCapPaise(0);
    expect((await breaker().state(true)).status).toBe('paused');
  });
});

describe('7-day cost guardrail (CONTEXT §6)', () => {
  it('alerts for actions whose real cost exceeds 80 % of their credit price; ignores thin samples', async () => {
    const { id } = await h.member();
    const now = new Date(DAY1);
    const row = (action: string, cost: number, credits: number, daysAgo: number, i: number) => ({
      userId: id,
      requestId: `guard-${action}-${daysAgo}-${i}-${Math.random()}`,
      action,
      modelTier: 'mid',
      model: 'mock',
      status: 'succeeded',
      costInrPaise: cost,
      creditsQuoted: credits,
      creditsCharged: credits,
      createdAt: new Date(now.getTime() - daysAgo * 86_400_000),
      updatedAt: now,
    });
    await h.t.db.insert(aiRequests).values([
      ...Array.from({ length: 12 }, (_, i) => row('hard-doubt', 55, 6, 1, i)), // ₹0.55 vs ₹0.60 → 92 %
      ...Array.from({ length: 12 }, (_, i) => row('quick-doubt', 3, 1, 2, i)), // 30 %
      ...Array.from({ length: 3 }, (_, i) => row('photo-doubt', 200, 10, 1, i)), // 200 % but only 3 requests
      ...Array.from({ length: 12 }, (_, i) => row('evaluate-paper', 500, 6, 9, i)), // outside the window
    ]);
    const report = await costGuardrail(h.t.db, h.alerts, now);
    const by = Object.fromEntries(report.map((r) => [r.action, r]));
    expect(by['hard-doubt']).toMatchObject({ requests: 12, alerted: true });
    expect(by['hard-doubt']!.ratio).toBeCloseTo(55 / 60, 3);
    expect(by['quick-doubt']).toMatchObject({ alerted: false });
    expect(by['photo-doubt']).toMatchObject({ requests: 3, alerted: false });
    expect(by['evaluate-paper']).toBeUndefined();
    expect(h.alerts.alerts.map((a) => [a.kind, a.data.action, a.severity])).toEqual([['cost_guardrail', 'hard-doubt', 'warning']]);
  });
});

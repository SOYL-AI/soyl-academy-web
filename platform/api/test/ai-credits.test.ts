/**
 * Credits on real PostgreSQL (CONTEXT §6, ARCHITECTURE §11.1, AC-07, AC-08, F-008): lazy daily grant
 * per plan, balance and reset time, reserve/charge/refund, N parallel reserves never overspend, every
 * reserve resolved (sweeper, races), 00:00 IST reset with no rollover, plan top-up (billing contract),
 * ledger paging, quote before the action, paywall problem on exhaustion — and non-AI never blocked.
 */
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { creditLedger } from '@soyl/db';
import { ledgerInvariants, InsufficientCreditsError } from '../src/ai/credits';
import { createAiHarness, type AiHarness } from './ai-fixture';

let h: AiHarness;
const IST_1530 = Date.parse('2026-11-02T10:00:00Z');

beforeAll(async () => {
  h = await createAiHarness();
  h.clock.set(IST_1530);
});
afterAll(async () => {
  await h?.close();
});

const credits = () => h.services.ai.credits;

describe('balance and the lazy daily grant', () => {
  it('a free student gets 25 credits on first touch, once per IST day, and sees the reset time', async () => {
    const { c, id } = await h.member();
    const res = await c.get('/v1/credits');
    expect(res.statusCode).toBe(200);
    const b = res.json();
    expect(b).toMatchObject({ plan: 'free', planName: 'Free', dailyCredits: 25, balance: 25, grantedToday: 25, reservedNow: 0, spentToday: 0, day: '2026-11-02', resetAt: '2026-11-02T18:30:00.000Z', resetInSeconds: 8.5 * 3600, plansUrl: 'https://www.soylai.test/plans' });
    expect(b.prices).toEqual(expect.arrayContaining([
      { action: 'quick-doubt', label: 'Quick doubt', credits: 1, perAnswer: false, maxCredits: 1, allowedForPlan: true },
      { action: 'evaluate-paper', label: 'AI evaluation of a full paper', credits: 6, perAnswer: true, maxCredits: 40, allowedForPlan: true },
      { action: 'paper-from-upload', label: 'Papers like my school’s', credits: 60, perAnswer: false, maxCredits: 60, allowedForPlan: false },
    ]));
    expect(res.headers['cache-control']).toBe('no-store');
    await c.get('/v1/credits');
    const grants = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.userId, id), eq(creditLedger.kind, 'grant')));
    expect(grants).toHaveLength(1);
    expect(grants[0]).toMatchObject({ amount: 25, action: 'daily_grant', istDay: '2026-11-02', planId: 'free' });
    expect((await h.client().get('/v1/credits')).statusCode).toBe(401);
  });

  it('concurrent first requests of the day write exactly one grant (DB-2)', async () => {
    const { id } = await h.member();
    const views = await Promise.all(Array.from({ length: 10 }, () => credits().balance(id)));
    expect(views.every((v) => v.balance === 25)).toBe(true);
    const grants = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.userId, id), eq(creditLedger.kind, 'grant')));
    expect(grants).toHaveLength(1);
  });

  it('plans: Plus 40 and Pro / Board Exam Pass 60; buying mid-day tops today up (billing contract), no claw-back on downgrade', async () => {
    const { c, id } = await h.member();
    const r = await credits().reserve({ userId: id, requestId: randomUUID(), action: 'quick-doubt', credits: 5, plan: 'free' });
    expect(r.balance).toBe(20);
    h.plans.set(id, 'plus');
    const plus = (await c.get('/v1/credits')).json();
    expect(plus).toMatchObject({ plan: 'plus', dailyCredits: 40, balance: 35, grantedToday: 40 });
    const topups = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.userId, id), eq(creditLedger.action, 'plan_topup')));
    expect(topups.map((t) => t.amount)).toEqual([15]);
    expect((await credits().applyPlanChange(id, 'board_exam_pass')).balance).toBe(55);
    h.plans.set(id, 'free');
    expect((await c.get('/v1/credits')).json()).toMatchObject({ plan: 'free', balance: 55 });
    const pro = await h.member();
    h.plans.set(pro.id, 'pro');
    expect((await pro.c.get('/v1/credits')).json()).toMatchObject({ plan: 'pro', dailyCredits: 60, balance: 60 });
  });
});

describe('reserve, charge, refund (F-008, AC-08)', () => {
  it('settles each reservation exactly once; refunds return exactly what was held', async () => {
    const { id } = await h.member();
    const a = randomUUID();
    expect(await credits().reserve({ userId: id, requestId: a, action: 'hard-doubt', credits: 6, plan: 'free' })).toMatchObject({ created: true, state: 'open', credits: 6, balance: 19 });
    expect(await credits().charge(id, a)).toBe('charged');
    expect(await credits().charge(id, a)).toBe('already_charged');
    expect(await credits().refund(id, a, 'late')).toBe('already_charged');
    const again = await credits().reserve({ userId: id, requestId: a, action: 'hard-doubt', credits: 6, plan: 'free' });
    expect(again).toMatchObject({ created: false, state: 'charged' });
    const b = randomUUID();
    await credits().reserve({ userId: id, requestId: b, action: 'photo-doubt', credits: 10, plan: 'free' });
    expect((await credits().balance(id)).balance).toBe(9);
    expect(await credits().refund(id, b, 'provider_error')).toBe('refunded');
    expect(await credits().charge(id, b)).toBe('already_refunded');
    expect((await credits().balance(id))).toMatchObject({ balance: 19, spentToday: 6, reservedNow: 0 });
    // Per-answer actions return the unused part of the quote; 0 used is a refund.
    const c = randomUUID();
    await credits().reserve({ userId: id, requestId: c, action: 'evaluate-paper', credits: 18, plan: 'free' });
    expect(await credits().charge(id, c, { usedCredits: 12 })).toBe('charged');
    expect((await credits().balance(id))).toMatchObject({ balance: 7, spentToday: 18 });
    const d = randomUUID();
    await credits().reserve({ userId: id, requestId: d, action: 'evaluate-paper', credits: 6, plan: 'free' });
    expect(await credits().charge(id, d, { usedCredits: 0 })).toBe('refunded');
    await expect(credits().reserve({ userId: id, requestId: randomUUID(), action: 'photo-doubt', credits: 10, plan: 'free' })).rejects.toBeInstanceOf(InsufficientCreditsError);
    await expect(credits().reserve({ userId: id, requestId: randomUUID(), action: 'x', credits: 0, plan: 'free' })).rejects.toThrow(/invalid credit amount/);
    await expect(credits().charge(id, 'no-such-request')).rejects.toThrow(/no reservation/);
    const inv = await ledgerInvariants(h.t.db, new Date(h.clock.now()));
    expect(inv).toEqual({ negativeBalances: [], unresolvedExpired: 0, doubleResolved: 0 });
  });

  it('N parallel reserves never overspend: 20 × 10 credits on a balance of 25 → exactly 2 succeed (AC-07)', async () => {
    const { id } = await h.member();
    await credits().balance(id);
    const results = await Promise.allSettled(Array.from({ length: 20 }, () => credits().reserve({ userId: id, requestId: randomUUID(), action: 'photo-doubt', credits: 10, plan: 'free' })));
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(2);
    expect(results.filter((r) => r.status === 'rejected' && r.reason instanceof InsufficientCreditsError)).toHaveLength(18);
    expect((await credits().balance(id)).balance).toBe(5);
    expect((await ledgerInvariants(h.t.db, new Date(h.clock.now()))).negativeBalances).toEqual([]);
  });

  it('every reserve is resolved: the sweeper refunds expired reservations, and a charge racing it loses or wins cleanly', async () => {
    const { id } = await h.member();
    const stale = randomUUID();
    await credits().reserve({ userId: id, requestId: stale, action: 'quick-doubt', credits: 1, plan: 'free' });
    expect((await credits().sweepExpired(new Date(h.clock.now()))).refunded).toBe(0);
    const later = new Date(h.clock.now() + 16 * 60_000);
    const swept = await credits().sweepExpired(later);
    expect(swept.requestIds).toContain(stale);
    expect(await credits().charge(id, stale)).toBe('already_refunded');
    // Race: a charge and the sweeper at the same moment → exactly one resolution row.
    for (let i = 0; i < 5; i++) {
      const r = randomUUID();
      await credits().reserve({ userId: id, requestId: r, action: 'quick-doubt', credits: 1, plan: 'free' });
      const [x, y] = await Promise.all([credits().charge(id, r), credits().sweepExpired(later)]);
      const rows = await h.t.db.select().from(creditLedger).where(eq(creditLedger.requestId, r));
      expect(rows.filter((row) => row.kind === 'charge' || row.kind === 'refund')).toHaveLength(1);
      expect(['charged', 'already_refunded']).toContain(x);
      void y;
    }
    const inv = await ledgerInvariants(h.t.db, later, 0);
    expect(inv.unresolvedExpired).toBe(0);
    expect(inv.doubleResolved).toBe(0);
  });
});

describe('00:00 IST reset (no rollover)', () => {
  it('unused credits do not roll over; a reservation from before midnight settles on its own day', async () => {
    const { c, id } = await h.member();
    h.clock.set(Date.parse('2026-11-02T18:29:00Z')); // 23:59 IST
    const late = randomUUID();
    await credits().reserve({ userId: id, requestId: late, action: 'hard-doubt', credits: 6, plan: 'free' });
    const spent = randomUUID();
    await credits().reserve({ userId: id, requestId: spent, action: 'photo-doubt', credits: 10, plan: 'free' });
    await credits().charge(id, spent);
    const before = (await c.get('/v1/credits')).json();
    expect(before).toMatchObject({ day: '2026-11-02', resetInSeconds: 60, balance: 9, spentToday: 10, reservedNow: 6 });
    h.clock.set(Date.parse('2026-11-02T18:31:00Z')); // 00:01 IST
    const after = (await c.get('/v1/credits')).json();
    expect(after).toMatchObject({ day: '2026-11-03', balance: 25, grantedToday: 25, resetAt: '2026-11-03T18:30:00.000Z' });
    expect(await credits().charge(id, late)).toBe('charged');
    const settle = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.requestId, late), eq(creditLedger.kind, 'charge')));
    expect(settle[0]!.istDay).toBe('2026-11-02');
    expect((await c.get('/v1/credits')).json().balance).toBe(25);
    h.clock.set(IST_1530);
  });
});

describe('ledger, quote and paywall', () => {
  it('pages the ledger newest first with labels', async () => {
    const { c, id } = await h.member();
    for (let i = 0; i < 3; i++) {
      const r = randomUUID();
      await credits().reserve({ userId: id, requestId: r, action: 'quick-doubt', credits: 1, plan: 'free' });
      await credits().charge(id, r);
    }
    const p1 = (await c.get('/v1/credits/ledger?limit=4')).json();
    expect(p1.entries).toHaveLength(4);
    expect(p1.entries[0]).toMatchObject({ kind: 'charge', amount: 0, label: 'Quick doubt' });
    const p2 = (await c.get(`/v1/credits/ledger?limit=4&cursor=${p1.nextCursor}`)).json();
    expect(p2.entries.at(-1)).toMatchObject({ kind: 'grant', amount: 25, label: 'Daily credits', action: 'daily_grant' });
    expect(p2.nextCursor).toBeNull();
    expect((await c.get('/v1/credits/ledger?limit=500')).statusCode).toBe(400);
  });

  it('shows the cost before the action; refuses with a paywall problem when credits run out; non-AI keeps working', async () => {
    const { c, id } = await h.member();
    const q = (await c.get('/v1/ai/quote/hard-doubt')).json();
    expect(q).toMatchObject({ action: 'hard-doubt', credits: 6, tier: 'mid', mode: 'stream', balance: 25, affordable: true, allowedForPlan: true, status: 'available', plansUrl: 'https://www.soylai.test/plans' });
    expect((await c.get('/v1/ai/quote/evaluate-paper?answers=9')).json()).toMatchObject({ credits: 40, perAnswer: true, answers: 9, maxCredits: 40 });
    expect((await c.get('/v1/ai/quote/paper-from-upload')).json()).toMatchObject({ credits: 60, allowedForPlan: false, requiresUpload: true, mode: 'job' });
    expect((await c.get('/v1/ai/quote/teleport')).statusCode).toBe(400);
    const all = randomUUID();
    await credits().reserve({ userId: id, requestId: all, action: 'hard-doubt', credits: 25, plan: 'free' });
    await credits().charge(id, all);
    expect((await c.get('/v1/ai/quote/quick-doubt')).json()).toMatchObject({ balance: 0, affordable: false });
    const res = await c.post('/v1/ai/quick-doubt', { message: 'What is refraction?' });
    expect(res.statusCode).toBe(402);
    expect(res.headers['content-type']).toContain('application/problem+json');
    expect(res.json()).toMatchObject({ code: 'credits_exhausted', balance: 0, required: 1, plan: 'free', plansUrl: 'https://www.soylai.test/plans', resetAt: '2026-11-02T18:30:00.000Z', resetInSeconds: 8.5 * 3600 });
    // Never block non-AI features.
    expect((await c.get('/v1/catalog/boards')).statusCode).toBe(200);
    expect((await c.get('/v1/credits')).statusCode).toBe(200);
  });
});

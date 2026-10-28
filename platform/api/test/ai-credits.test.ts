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
  it('a free student gets 50 credits on first touch (D-044), once per IST day, and sees the reset time', async () => {
    const { c, id } = await h.member();
    const res = await c.get('/v1/credits');
    expect(res.statusCode).toBe(200);
    const b = res.json();
    expect(b).toMatchObject({ plan: 'free', planName: 'Free', dailyCredits: 50, balance: 50, grantedToday: 50, bonusToday: 0, reservedNow: 0, spentToday: 0, day: '2026-11-02', resetAt: '2026-11-02T18:30:00.000Z', resetInSeconds: 8.5 * 3600, plansUrl: 'https://www.soylai.test/plans' });
    expect(b.prices).toEqual(expect.arrayContaining([
      { action: 'quick-doubt', label: 'Quick doubt', credits: 1, perAnswer: false, maxCredits: 1, allowedForPlan: true },
      { action: 'hard-doubt', label: 'Step-by-step doubt', credits: 7, perAnswer: false, maxCredits: 7, allowedForPlan: true },
      { action: 'photo-doubt', label: 'Photo doubt', credits: 12, perAnswer: false, maxCredits: 12, allowedForPlan: true },
      { action: 'evaluate-paper', label: 'AI evaluation of a full paper', credits: 7, perAnswer: true, maxCredits: 50, allowedForPlan: true },
      { action: 'paper-from-upload', label: 'Papers like my school’s', credits: 80, perAnswer: false, maxCredits: 80, allowedForPlan: false },
    ]));
    expect(res.headers['cache-control']).toBe('no-store');
    await c.get('/v1/credits');
    const grants = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.userId, id), eq(creditLedger.kind, 'grant')));
    expect(grants).toHaveLength(1);
    expect(grants[0]).toMatchObject({ amount: 50, action: 'daily_grant', istDay: '2026-11-02', planId: 'free' });
    expect((await h.client().get('/v1/credits')).statusCode).toBe(401);
  });

  it('concurrent first requests of the day write exactly one grant (DB-2)', async () => {
    const { id } = await h.member();
    const views = await Promise.all(Array.from({ length: 10 }, () => credits().balance(id)));
    expect(views.every((v) => v.balance === 50)).toBe(true);
    const grants = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.userId, id), eq(creditLedger.kind, 'grant')));
    expect(grants).toHaveLength(1);
  });

  it('plans: Plus 100 and Pro / Board Exam Pass 150 (D-044); buying mid-day tops today up (billing contract), no claw-back on downgrade', async () => {
    const { c, id } = await h.member();
    const r = await credits().reserve({ userId: id, requestId: randomUUID(), action: 'quick-doubt', credits: 5, plan: 'free' });
    expect(r.balance).toBe(45);
    h.plans.set(id, 'plus');
    const plus = (await c.get('/v1/credits')).json();
    expect(plus).toMatchObject({ plan: 'plus', dailyCredits: 100, balance: 95, grantedToday: 100 });
    const topups = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.userId, id), eq(creditLedger.action, 'plan_topup')));
    expect(topups.map((t) => t.amount)).toEqual([50]);
    expect((await credits().applyPlanChange(id, 'board_exam_pass')).balance).toBe(145);
    h.plans.set(id, 'free');
    expect((await c.get('/v1/credits')).json()).toMatchObject({ plan: 'free', balance: 145 });
    const pro = await h.member();
    h.plans.set(pro.id, 'pro');
    expect((await pro.c.get('/v1/credits')).json()).toMatchObject({ plan: 'pro', dailyCredits: 150, balance: 150 });
  });
});

describe('reserve, charge, refund (F-008, AC-08)', () => {
  it('settles each reservation exactly once; refunds return exactly what was held', async () => {
    const { id } = await h.member();
    const a = randomUUID();
    expect(await credits().reserve({ userId: id, requestId: a, action: 'hard-doubt', credits: 7, plan: 'free' })).toMatchObject({ created: true, state: 'open', credits: 7, balance: 43 });
    expect(await credits().charge(id, a)).toBe('charged');
    expect(await credits().charge(id, a)).toBe('already_charged');
    expect(await credits().refund(id, a, 'late')).toBe('already_charged');
    const again = await credits().reserve({ userId: id, requestId: a, action: 'hard-doubt', credits: 7, plan: 'free' });
    expect(again).toMatchObject({ created: false, state: 'charged' });
    const b = randomUUID();
    await credits().reserve({ userId: id, requestId: b, action: 'photo-doubt', credits: 12, plan: 'free' });
    expect((await credits().balance(id)).balance).toBe(31);
    expect(await credits().refund(id, b, 'provider_error')).toBe('refunded');
    expect(await credits().charge(id, b)).toBe('already_refunded');
    expect((await credits().balance(id))).toMatchObject({ balance: 43, spentToday: 7, reservedNow: 0 });
    // Per-answer actions return the unused part of the quote; 0 used is a refund.
    const c = randomUUID();
    await credits().reserve({ userId: id, requestId: c, action: 'evaluate-paper', credits: 21, plan: 'free' });
    expect(await credits().charge(id, c, { usedCredits: 14 })).toBe('charged');
    expect((await credits().balance(id))).toMatchObject({ balance: 29, spentToday: 21 });
    const d = randomUUID();
    await credits().reserve({ userId: id, requestId: d, action: 'evaluate-paper', credits: 7, plan: 'free' });
    expect(await credits().charge(id, d, { usedCredits: 0 })).toBe('refunded');
    // 29 left: a 30-credit reserve is refused and leaves the balance alone.
    await expect(credits().reserve({ userId: id, requestId: randomUUID(), action: 'evaluate-paper', credits: 30, plan: 'free' })).rejects.toBeInstanceOf(InsufficientCreditsError);
    expect((await credits().balance(id)).balance).toBe(29);
    await expect(credits().reserve({ userId: id, requestId: randomUUID(), action: 'x', credits: 0, plan: 'free' })).rejects.toThrow(/invalid credit amount/);
    await expect(credits().charge(id, 'no-such-request')).rejects.toThrow(/no reservation/);
    const inv = await ledgerInvariants(h.t.db, new Date(h.clock.now()));
    expect(inv).toEqual({ negativeBalances: [], unresolvedExpired: 0, doubleResolved: 0 });
  });

  it('N parallel reserves never overspend: 20 × 12 credits on a balance of 50 → exactly 4 succeed (AC-07)', async () => {
    const { id } = await h.member();
    await credits().balance(id);
    const results = await Promise.allSettled(Array.from({ length: 20 }, () => credits().reserve({ userId: id, requestId: randomUUID(), action: 'photo-doubt', credits: 12, plan: 'free' })));
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(4);
    expect(results.filter((r) => r.status === 'rejected' && r.reason instanceof InsufficientCreditsError)).toHaveLength(16);
    expect((await credits().balance(id)).balance).toBe(2);
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
    await credits().reserve({ userId: id, requestId: late, action: 'hard-doubt', credits: 7, plan: 'free' });
    const spent = randomUUID();
    await credits().reserve({ userId: id, requestId: spent, action: 'photo-doubt', credits: 12, plan: 'free' });
    await credits().charge(id, spent);
    const before = (await c.get('/v1/credits')).json();
    expect(before).toMatchObject({ day: '2026-11-02', resetInSeconds: 60, balance: 31, spentToday: 12, reservedNow: 7 });
    h.clock.set(Date.parse('2026-11-02T18:31:00Z')); // 00:01 IST
    const after = (await c.get('/v1/credits')).json();
    expect(after).toMatchObject({ day: '2026-11-03', balance: 50, grantedToday: 50, resetAt: '2026-11-03T18:30:00.000Z' });
    expect(await credits().charge(id, late)).toBe('charged');
    const settle = await h.t.db.select().from(creditLedger).where(and(eq(creditLedger.requestId, late), eq(creditLedger.kind, 'charge')));
    expect(settle[0]!.istDay).toBe('2026-11-02');
    expect((await c.get('/v1/credits')).json().balance).toBe(50);
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
    expect(p2.entries.at(-1)).toMatchObject({ kind: 'grant', amount: 50, label: 'Daily credits', action: 'daily_grant' });
    expect(p2.nextCursor).toBeNull();
    expect((await c.get('/v1/credits/ledger?limit=500')).statusCode).toBe(400);
  });

  it('shows the cost before the action; refuses with a paywall problem when credits run out; non-AI keeps working', async () => {
    const { c, id } = await h.member();
    const q = (await c.get('/v1/ai/quote/hard-doubt')).json();
    expect(q).toMatchObject({ action: 'hard-doubt', credits: 7, tier: 'mid', mode: 'stream', balance: 50, affordable: true, allowedForPlan: true, status: 'available', plansUrl: 'https://www.soylai.test/plans' });
    expect((await c.get('/v1/ai/quote/evaluate-paper?answers=5')).json()).toMatchObject({ credits: 35, perAnswer: true, answers: 5, maxCredits: 50 });
    expect((await c.get('/v1/ai/quote/evaluate-paper?answers=9')).json()).toMatchObject({ credits: 50, perAnswer: true, answers: 9, maxCredits: 50 });
    expect((await c.get('/v1/ai/quote/paper-from-upload')).json()).toMatchObject({ credits: 80, allowedForPlan: false, requiresUpload: true, mode: 'job' });
    expect((await c.get('/v1/ai/quote/teleport')).statusCode).toBe(400);
    const all = randomUUID();
    await credits().reserve({ userId: id, requestId: all, action: 'hard-doubt', credits: 50, plan: 'free' });
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

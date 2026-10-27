/**
 * Live All-India mocks: registration window, questions only after the start (embargoed pool,
 * AC-11), late start ≤ 15 min, deadline cap, one attempt per event, per-attempt shuffle, provisional
 * ranks in the KV sorted set, consent-gated leaderboard with auto-generated public names (D-039, F-017,
 * D-014), account deletion removing KV ranks, the worker's final-rank snapshot, unranked attempts
 * after the event, and the schedule CLI logic (Wave 1 sittings, dev fallback, production refusal).
 */
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { and, eq } from 'drizzle-orm';
import { attempts, chapters, consentStatus, ingestTestDefinition, liveEvents, liveRegistrations, questionKeys, questionRow, questions, splitQuestion, tests } from '@soyl/db';
import { Question } from '@soyl/shared/content/question';
import { publicName } from '@soyl/shared/config/public-names';
import { TestDefinition } from '@soyl/shared/content/test';
import { LIVE_MOCK_SITTINGS, TEST_ENGINE } from '@soyl/shared/config/tests';
import { loadCatalog } from '@soyl/content-pipeline/catalog';
import { createHarness, type Client, type Harness } from './helpers';
import { realReleases, seedRealContent } from './content-fixture';
import { forbiddenKeys } from './tests-fixture';
import { compositeScore, decodeComposite, firstNameLastInitial, LiveRanks, livePhase } from '../src/domain/tests/live';
import { finalizeLiveEvents } from '../src/domain/tests/live-finalize';
import { configuredSittings, scheduleLiveMocks } from '../src/domain/tests/live-admin';

let h: Harness;
const MATHS = 'cbse-10-mathematics-ch01';
const YEAR = '2026-27';
const MIN = 60_000;
let n = 0;

async function member(displayName?: string): Promise<{ c: Client; id: string; email: string }> {
  const c = h.client();
  const email = `live.${Date.now().toString(36)}${++n}@example.com`;
  const r = await c.signInEmail(email);
  if (displayName) expect((await c.patch('/v1/me', { displayName })).statusCode).toBe(200);
  return { c, id: r.user.id, email };
}

/** A live test of `count` mcq items copied into the live_reserved pool, embargoed until `embargo`, and its event. */
async function makeLive(tag: string, startsAt: number, opts: { embargo?: number; count?: number; durationMin?: number } = {}) {
  const count = opts.count ?? 6;
  const durationMin = opts.durationMin ?? 60;
  const src = realReleases((u) => u === MATHS)[0]!.release.questions.filter((q) => q.type === 'mcq' && !q.children.length).slice(0, count);
  const [ch] = await h.t.db.select().from(chapters).where(eq(chapters.key, MATHS));
  const ids: string[] = [];
  for (const [i, q] of src.entries()) {
    const copy = Question.parse({ ...q, id: `q_live_${tag}_${i}`, status: 'published', version: 1 });
    const [row] = await h.t.db.insert(questions).values(questionRow(copy, { chapterId: ch!.id, academicYear: YEAR, pool: 'live_reserved', embargoUntil: new Date(opts.embargo ?? startsAt) })).returning();
    await h.t.db.insert(questionKeys).values({ questionId: row!.id, ...splitQuestion(copy).key });
    ids.push(copy.id);
  }
  const def = TestDefinition.parse({
    id: `t_cbse10math_live_${tag}`,
    kind: 'live',
    paper_type: 'board',
    blueprint_id: null,
    title: `Live ${tag}`,
    subject_id: 'cbse-10-mathematics',
    chapter_ids: [MATHS],
    duration_min: durationMin,
    total_marks: count,
    shuffle: true,
    sections: [{ id: 'A', title: 'Section A', instructions: '', items: ids.map((id) => ({ question_id: id, question_version: 1, marks: 1, choice_group: null })), choice_groups: [] }],
  });
  const { testId } = await ingestTestDefinition(h.t.db, def, { academicYear: YEAR, status: 'published' });
  const [ev] = await h.t.db
    .insert(liveEvents)
    .values({ key: `live_cbse10math_${tag}`, academicYear: YEAR, testId, title: `All-India Mock ${tag}`, registrationOpensAt: new Date(startsAt - 3 * 86_400_000), startsAt: new Date(startsAt), lateStartMinutes: 15, endsAt: new Date(startsAt + durationMin * MIN) })
    .returning();
  return { testKey: def.id, eventKey: ev!.key, eventId: ev!.id, startsAt, questionIds: ids };
}

/** Answers `right` of the items correctly. */
async function answer(c: Client, attemptId: string, items: { itemId: string; question: { options: { id: string }[] } }[], testKey: string, right: number) {
  const rows = await h.t.db
    .select({ key: questions.key, answer: questionKeys.answer })
    .from(questions)
    .innerJoin(questionKeys, eq(questionKeys.questionId, questions.id))
    .where(eq(questions.pool, 'live_reserved'));
  const keyOf = new Map(rows.map((r) => [r.key, (r.answer as { option_ids: string[] }).option_ids]));
  void testKey;
  const body = items.map((it, i) => {
    const qk = (it as unknown as { question: { id: string } }).question.id;
    const correct = keyOf.get(qk)!;
    const wrong = it.question.options.map((o) => o.id).find((o) => !correct.includes(o))!;
    return { itemId: it.itemId, seq: 1, response: { option_ids: i < right ? correct : [wrong] } };
  });
  const r = await c.request('PUT', `/v1/attempts/${attemptId}/responses`, { body: { items: body } });
  expect(r.statusCode).toBe(200);
}

beforeAll(async () => {
  h = await createHarness({ consentDefault: 'granted' });
  await seedRealContent(h.t, (u) => u === MATHS || u === 'cbse-10-mathematics-ch02');
});
afterAll(async () => {
  await h?.close();
});

describe('ranks helpers', () => {
  it('composite scores order by marks, then less time; names are first name + last initial', () => {
    expect(compositeScore(40, 600)).toBeGreaterThan(compositeScore(39.5, 10));
    expect(compositeScore(40, 600)).toBeGreaterThan(compositeScore(40, 601));
    expect(decodeComposite(compositeScore(37.5, 1234))).toEqual({ score: 37.5, timeTakenSec: 1234 });
    expect(firstNameLastInitial('Priya Sharma')).toBe('Priya S.');
    expect(firstNameLastInitial('  aarav   kumar  singh ')).toBe('aarav S.');
    expect(firstNameLastInitial('Meera')).toBe('Meera');
    expect(firstNameLastInitial('राहुल शर्मा')).toBe('राहुल श.');
    expect(firstNameLastInitial(null)).toBeNull();
    expect(firstNameLastInitial('   ')).toBeNull();
  });
});

describe('live window', () => {
  it('registration, waiting room without questions, start only from starts_at, shuffled paper, deadline, one attempt', async () => {
    const now = h.clock.now();
    const L = await makeLive('w1', now + 60 * MIN);
    const a = await member('Priya Sharma');
    const b = await member('Aarav Kumar');

    const list = (await a.c.get('/v1/live-events?subject=cbse-10-mathematics')).json() as { events: { id: string; phase: string; me: { registered: boolean } }[] };
    expect(list.events.find((e) => e.id === L.eventKey)).toMatchObject({ phase: 'registration_open', me: { registered: false } });
    const guestList = (await h.client().get('/v1/live-events')).json() as { events: { id: string; me: unknown }[] };
    expect(guestList.events.find((e) => e.id === L.eventKey)!.me).toBeNull();
    const reg = await a.c.post(`/v1/live-events/${L.eventKey}/register`);
    expect(reg.statusCode).toBe(200);
    expect(reg.json()).toMatchObject({ id: L.eventKey, me: { registered: true } });
    expect((await a.c.post(`/v1/live-events/${L.eventKey}/register`)).statusCode).toBe(200); // idempotent

    // Before the start: no questions anywhere.
    const early = await a.c.post(`/v1/tests/${L.testKey}/attempts`);
    expect(early.statusCode).toBe(409);
    expect(early.json().code).toBe('live_not_open');
    const waiting = await a.c.post(`/v1/tests/${L.testKey}/attempts`, { start: false });
    expect(waiting.statusCode).toBe(201);
    expect(waiting.json()).toMatchObject({ attempt: { status: 'created', ranked: true, liveEventId: L.eventKey }, items: [] });
    expect((await a.c.get(`/v1/tests/${L.testKey}`)).json()).toMatchObject({ kind: 'live', questionCount: 6, live: { id: L.eventKey } });
    const practice = await a.c.get(`/v1/chapters/${MATHS}/practice?limit=25`);
    expect(practice.body).not.toContain('q_live_w1');
    // The leaderboard has nothing yet.
    expect((await a.c.get(`/v1/live-events/${L.eventKey}/leaderboard`)).json()).toMatchObject({ status: 'not_started', entries: [] });

    // At the start.
    h.clock.set(L.startsAt + MIN);
    const sa = await a.c.post(`/v1/tests/${L.testKey}/attempts`);
    expect(sa.statusCode).toBe(200);
    const stA = sa.json() as { attempt: { id: string; status: string; deadlineAt: string; graceSeconds: number }; items: { itemId: string; question: { id: string; options: { id: string }[] } }[] };
    expect(stA.attempt.status).toBe('in_progress');
    expect(stA.attempt.graceSeconds).toBe(TEST_ENGINE.graceSeconds.live);
    expect(Date.parse(stA.attempt.deadlineAt)).toBe(L.startsAt + MIN + 60 * MIN);
    expect(stA.items).toHaveLength(6);
    expect(forbiddenKeys(stA)).toEqual([]);
    const sb = (await b.c.post(`/v1/tests/${L.testKey}/attempts`)).json() as typeof stA; // starting registers
    const orderA = stA.items.map((i) => i.question.id).join();
    const orderB = sb.items.map((i) => i.question.id).join();
    const optsA = stA.items.map((i) => i.question.options.map((o) => o.id).join('')).join('|');
    const optsB = sb.items.map((i) => i.question.options.map((o) => o.id).join('')).join('|');
    expect(orderA !== orderB || optsA !== optsB).toBe(true); // per-attempt shuffle
    // Reload keeps the same order.
    const reload = (await a.c.get(`/v1/attempts/${stA.attempt.id}`)).json() as typeof stA;
    expect(reload.items.map((i) => i.question.id).join()).toBe(orderA);
    const [regB] = await h.t.db.select().from(liveRegistrations).where(and(eq(liveRegistrations.liveEventId, L.eventId), eq(liveRegistrations.userId, b.id)));
    expect(regB).toBeDefined();

    // Late start allowed up to 15 minutes, then refused for newcomers (AC-11 (e)).
    const c3 = await member('Meera Iyer');
    h.clock.set(L.startsAt + 14 * MIN);
    const late = (await c3.c.post(`/v1/tests/${L.testKey}/attempts`)).json() as typeof stA;
    expect(Date.parse(late.attempt.deadlineAt)).toBe(L.startsAt + 14 * MIN + 60 * MIN);
    const d = await member();
    h.clock.set(L.startsAt + 16 * MIN);
    const tooLate = await d.c.post(`/v1/tests/${L.testKey}/attempts`);
    expect(tooLate.statusCode).toBe(409);
    expect(tooLate.json().code).toBe('live_not_open');
    expect((await d.c.post(`/v1/live-events/${L.eventKey}/register`)).statusCode).toBe(409);
    // Existing attempts resume.
    expect((await a.c.post(`/v1/tests/${L.testKey}/attempts`)).json().attempt.id).toBe(stA.attempt.id);

    // Scores: A 5/6, B 3/6, C3 6/6 (C3 not consented → unnamed).
    await answer(a.c, stA.attempt.id, stA.items, L.testKey, 5);
    await answer(b.c, sb.attempt.id, sb.items, L.testKey, 3);
    await answer(c3.c, late.attempt.id, late.items, L.testKey, 6);
    h.clock.set(L.startsAt + 30 * MIN);
    for (const [c, id] of [[a.c, stA.attempt.id], [b.c, sb.attempt.id], [c3.c, late.attempt.id]] as const) expect((await c.post(`/v1/attempts/${id}/submit`)).statusCode).toBe(200);
    // One attempt per live event, ever.
    const again = await a.c.post(`/v1/tests/${L.testKey}/attempts`);
    expect(again.statusCode).toBe(409);
    expect(again.json().code).toBe('attempt_closed');

    await h.t.db.update(consentStatus).set({ status: 'required' }).where(eq(consentStatus.userId, c3.id));
    h.consent.setStatus(c3.id, 'required');
    const lb = await a.c.get(`/v1/live-events/${L.eventKey}/leaderboard`);
    expect(lb.statusCode).toBe(200);
    const board = lb.json() as { status: string; total: number; entries: { rank: number; name: string | null; score: number; isMe: boolean }[]; me: { rank: number; score: number } };
    expect(board.status).toBe('provisional');
    expect(board.total).toBe(3);
    expect(board.entries).toEqual([
      { rank: 1, name: null, score: 6, isMe: false },
      { rank: 2, name: publicName(a.id), score: 5, isMe: true },
      { rank: 3, name: publicName(b.id), score: 3, isMe: false },
    ]);
    expect(board.me).toMatchObject({ rank: 2, score: 5 });
    // F-017 / D-039: no ids, emails or real names (not even first names) anywhere in the leaderboard.
    expect(lb.body).not.toMatch(/Priya|Aarav|Sharma|Kumar|@example\.com/);
    expect(lb.body).not.toContain(a.id);
    // D-014: viewing needs consent.
    const denied = await c3.c.get(`/v1/live-events/${L.eventKey}/leaderboard`);
    expect(denied.statusCode).toBe(403);
    expect(denied.json().code).toBe('consent_required');
    // The result shows the provisional live rank.
    expect((await a.c.get(`/v1/attempts/${stA.attempt.id}/result`)).json().live).toMatchObject({ eventId: L.eventKey, status: 'provisional', rank: 2, total: 3 });

    // Account deletion (fresh sign-in) removes the KV rank entry.
    await b.c.signInEmail(b.email);
    const del = await b.c.delete('/v1/me');
    expect(del.statusCode).toBe(200);
    expect(await new LiveRanks(h.kv).rankOf(L.eventId, b.id)).toBeNull();
    h.clock.set(Date.now());
  });

  it('refuses to serve items still under embargo even inside the window (AC-11)', async () => {
    const now = h.clock.now();
    const L = await makeLive('emb', now + 10 * MIN, { embargo: now + 24 * 60 * MIN, count: 3 });
    const a = await member();
    h.clock.set(L.startsAt + MIN);
    const r = await a.c.post(`/v1/tests/${L.testKey}/attempts`);
    expect(r.statusCode).toBe(409);
    expect(r.json().code).toBe('test_unavailable');
    h.clock.set(Date.now());
  });

  it('the deadline is capped at the window end + late minutes; final ranks are snapshotted by the worker job', async () => {
    const now = h.clock.now();
    // A 30-minute window but a 60-minute paper: the cap wins.
    const L = await makeLive('fin', now + 5 * MIN, { count: 4, durationMin: 60 });
    await h.t.db.update(liveEvents).set({ endsAt: new Date(L.startsAt + 30 * MIN) }).where(eq(liveEvents.id, L.eventId));
    const a = await member('Kavya Rao');
    const b = await member('Ishaan Das');
    const c = await member('Zoya Khan');
    h.clock.set(L.startsAt + 2 * MIN);
    const sa = (await a.c.post(`/v1/tests/${L.testKey}/attempts`)).json();
    expect(Date.parse(sa.attempt.deadlineAt)).toBe(L.startsAt + 30 * MIN + 15 * MIN);
    const sb = (await b.c.post(`/v1/tests/${L.testKey}/attempts`)).json();
    const sc = (await c.c.post(`/v1/tests/${L.testKey}/attempts`)).json();
    await answer(a.c, sa.attempt.id, sa.items, L.testKey, 4);
    await answer(b.c, sb.attempt.id, sb.items, L.testKey, 2);
    await answer(c.c, sc.attempt.id, sc.items, L.testKey, 2);
    h.clock.set(L.startsAt + 10 * MIN);
    await a.c.post(`/v1/attempts/${sa.attempt.id}/submit`);
    h.clock.set(L.startsAt + 12 * MIN);
    await b.c.post(`/v1/attempts/${sb.attempt.id}/submit`); // same marks as C, but faster than C's auto-submit
    // C never submits: the worker auto-submits it at the end.
    const closeAt = L.startsAt + 45 * MIN + TEST_ENGINE.graceSeconds.live * 1000;
    expect((await finalizeLiveEvents({ db: h.t.db, now: new Date(closeAt) })).events).toBe(0); // not yet: finalize delay
    const done = await finalizeLiveEvents({ db: h.t.db, now: new Date(closeAt + TEST_ENGINE.live.finalizeDelaySeconds * 1000) });
    expect(done.autoSubmitted).toBeGreaterThanOrEqual(1);
    expect(done.ranked).toBeGreaterThanOrEqual(3);
    const regs = await h.t.db.select().from(liveRegistrations).where(eq(liveRegistrations.liveEventId, L.eventId));
    const rankOf = (id: string) => regs.find((r) => r.userId === id)!;
    expect([rankOf(a.id).finalRank, rankOf(b.id).finalRank, rankOf(c.id).finalRank]).toEqual([1, 2, 3]);
    expect(Number(rankOf(a.id).percentile)).toBe(100);
    expect(Number(rankOf(a.id).score)).toBe(4);
    const [ev] = await h.t.db.select().from(liveEvents).where(eq(liveEvents.id, L.eventId));
    expect(ev!.status).toBe('results_published');
    // Re-running is a no-op.
    expect((await finalizeLiveEvents({ db: h.t.db, now: new Date(closeAt + 10 * MIN) })).events).toBe(0);
    h.clock.set(closeAt + 5 * MIN);
    const lb = (await a.c.get(`/v1/live-events/${L.eventKey}/leaderboard`)).json();
    expect(lb).toMatchObject({ status: 'final', total: 3, me: { rank: 1, score: 4, percentile: 100 } });
    expect(lb.entries.map((e: { name: string }) => e.name)).toEqual([publicName(a.id), publicName(b.id), publicName(c.id)]);
    expect((await c.c.get(`/v1/attempts/${sc.attempt.id}/result`)).json().live).toMatchObject({ status: 'final', rank: 3, total: 3 });
    // After the event the paper can be taken again, unranked.
    const unranked = await c.c.post(`/v1/tests/${L.testKey}/attempts`);
    expect(unranked.statusCode).toBe(201);
    expect(unranked.json().attempt).toMatchObject({ ranked: false, liveEventId: null, status: 'in_progress' });
    const rows = await h.t.db.select().from(attempts).where(eq(attempts.userId, c.id));
    expect(rows).toHaveLength(2);
    h.clock.set(Date.now());
  });

  it('phases: upcoming → registration_open → live → writing → closed → results_published; cancelled', () => {
    const t0 = Date.UTC(2026, 11, 13, 4, 30);
    const ev = { id: 'x', key: 'k', academicYear: YEAR, testId: 't', title: 'T', registrationOpensAt: new Date(t0 - 86_400_000), startsAt: new Date(t0), lateStartMinutes: 15, endsAt: new Date(t0 + 180 * MIN), status: 'scheduled', resultsPublishedAt: null };
    expect(livePhase(ev, t0 - 2 * 86_400_000)).toBe('upcoming');
    expect(livePhase(ev, t0 - 1)).toBe('registration_open');
    expect(livePhase(ev, t0)).toBe('live');
    expect(livePhase(ev, t0 + 15 * MIN)).toBe('writing');
    expect(livePhase(ev, t0 + 195 * MIN + 59_999)).toBe('writing');
    expect(livePhase(ev, t0 + 195 * MIN + 60_000)).toBe('closed');
    expect(livePhase({ ...ev, status: 'results_published' }, t0)).toBe('results_published');
    expect(livePhase({ ...ev, status: 'cancelled' }, t0)).toBe('cancelled');
  });
});

describe('GET /v1/live-events/:id', () => {
  it('timeline, registration window, your status and rank availability through the event', async () => {
    const now = h.clock.now();
    const L = await makeLive('det', now + 60 * MIN, { count: 3, durationMin: 30 });
    const url = `/v1/live-events/${L.eventKey}`;
    expect((await h.client().get('/v1/live-events/live_nope_1')).statusCode).toBe(404);
    expect((await h.client().get('/v1/live-events/not-an-id')).statusCode).toBe(400);

    const guest = await h.client().get(url);
    expect(guest.statusCode).toBe(200);
    expect(guest.headers['cache-control']).toBe('no-store');
    const g = guest.json();
    const start = new Date(L.startsAt);
    const iso = (ms: number) => new Date(ms).toISOString();
    expect(g).toMatchObject({
      id: L.eventKey,
      phase: 'registration_open',
      testId: L.testKey,
      durationMin: 30,
      lateStartMinutes: 15,
      startsAt: start.toISOString(),
      lateStartUntil: iso(L.startsAt + 15 * MIN),
      latestDeadlineAt: iso(L.startsAt + 45 * MIN),
      writingUntil: iso(L.startsAt + 45 * MIN + TEST_ENGINE.graceSeconds.live * 1000),
      graceSeconds: TEST_ENGINE.graceSeconds.live,
      registration: { open: true, opensAt: iso(L.startsAt - 3 * 86_400_000), closesAt: iso(L.startsAt + 15 * MIN) },
      ranks: { status: 'not_started', beta: true, requiresConsent: true, consentGranted: null, canView: false },
      me: null,
    });
    expect(g.timeline.map((p: { phase: string }) => p.phase)).toEqual(['upcoming', 'registration_open', 'live', 'writing', 'closed', 'results_published']);
    expect(g.timeline[2]).toEqual({ phase: 'live', from: start.toISOString(), until: iso(L.startsAt + 15 * MIN) });
    expect(g.timeline[5]).toEqual({ phase: 'results_published', from: null, until: null });

    const a = await member('Nisha Bose');
    const before = (await a.c.get(url)).json();
    expect(before.me).toEqual({ registered: false, attemptId: null, attemptStatus: null, deadlineAt: null, canRegister: true, canStart: false, canResume: false, result: null });
    expect(before.ranks).toMatchObject({ consentGranted: true, canView: false });
    await a.c.post(`${url}/register`);
    expect((await a.c.get(url)).json().me).toMatchObject({ registered: true, canRegister: false, canStart: false });

    const noConsent = await member('Tara Sen');
    await h.t.db.update(consentStatus).set({ status: 'pending' }).where(eq(consentStatus.userId, noConsent.id));
    h.consent.setStatus(noConsent.id, 'pending');

    h.clock.set(L.startsAt + MIN);
    expect((await a.c.get(url)).json()).toMatchObject({ phase: 'live', me: { canStart: true, canResume: false }, ranks: { status: 'provisional', canView: true } });
    expect((await noConsent.c.get(url)).json()).toMatchObject({ ranks: { status: 'provisional', consentGranted: false, canView: false }, me: { canStart: true, canRegister: true } });
    const started = (await a.c.post(`/v1/tests/${L.testKey}/attempts`)).json();
    const live = (await a.c.get(url)).json();
    expect(live.me).toMatchObject({ attemptId: started.attempt.id, attemptStatus: 'in_progress', deadlineAt: started.attempt.deadlineAt, canStart: false, canResume: true });
    await answer(a.c, started.attempt.id, started.items, L.testKey, 3);
    h.clock.set(L.startsAt + 20 * MIN);
    expect((await a.c.get(url)).json()).toMatchObject({ phase: 'writing', registration: { open: false }, me: { canResume: true } });
    await a.c.post(`/v1/attempts/${started.attempt.id}/submit`);
    expect((await a.c.get(url)).json().me).toMatchObject({ attemptStatus: 'submitted', canResume: false, result: null });

    const closeAt = L.startsAt + 45 * MIN + TEST_ENGINE.graceSeconds.live * 1000 + TEST_ENGINE.live.finalizeDelaySeconds * 1000;
    await finalizeLiveEvents({ db: h.t.db, now: new Date(closeAt) });
    h.clock.set(closeAt + MIN);
    const after = (await a.c.get(url)).json();
    expect(after).toMatchObject({ phase: 'results_published', ranks: { status: 'final', canView: true }, me: { result: { rank: 1, score: 3, percentile: expect.any(Number) } } });
    expect(after.timeline[4].until).toBe(after.resultsPublishedAt);
    expect(after.timeline[5].from).toBe(after.resultsPublishedAt);

    await h.t.db.update(liveEvents).set({ status: 'cancelled' }).where(eq(liveEvents.id, L.eventId));
    expect((await a.c.get(url)).json()).toMatchObject({ phase: 'cancelled', ranks: { status: 'unavailable', canView: false }, me: { result: null, canRegister: false } });
    h.clock.set(Date.now());
  });
});

describe('scheduling (npm run live -- schedule)', () => {
  it('Wave 1 sittings are 13 Dec 2026 and 17 Jan 2027, 10:00 IST', () => {
    expect(configuredSittings().map((s) => s.starts.toISOString())).toEqual(['2026-12-13T04:30:00.000Z', '2027-01-17T04:30:00.000Z']);
    expect(LIVE_MOCK_SITTINGS.map((s) => s.ends)).toEqual(['2026-12-13T13:00:00+05:30', '2027-01-17T13:00:00+05:30']);
  });

  it('reports generation requests when the live pool cannot fill a board paper; dev fallback fills it from practice; production refuses that', async () => {
    const catalog = loadCatalog(path.resolve(import.meta.dirname, '..', '..', 'catalog'));
    const strict = await scheduleLiveMocks(h.t.db, { year: YEAR, catalog, subjects: ['cbse-10-mathematics'] });
    expect(strict.every((r) => r.status === 'skipped' && r.requests.length > 0)).toBe(true);
    await expect(scheduleLiveMocks(h.t.db, { year: YEAR, catalog, subjects: ['cbse-10-mathematics'], allowPracticePool: true, production: true })).rejects.toThrow(/refused in production/);

    const dev = await scheduleLiveMocks(h.t.db, { year: YEAR, catalog, subjects: ['cbse-10-mathematics'], allowPracticePool: true, fallbackPaper: 'unit-test' });
    expect(dev.map((r) => [r.sitting, r.status])).toEqual([
      [1, 'scheduled'],
      [2, 'scheduled'],
    ]);
    expect(dev[0]).toMatchObject({ eventKey: 'live_cbse10math_1', testKey: 't_cbse10math_live_1', startsAt: '2026-12-13T04:30:00.000Z' });
    const [t1] = await h.t.db.select().from(tests).where(eq(tests.key, 't_cbse10math_live_1'));
    expect(t1).toMatchObject({ kind: 'live', shuffle: true, status: 'published' });
    const [e1] = await h.t.db.select().from(liveEvents).where(eq(liveEvents.key, 'live_cbse10math_1'));
    expect(e1!.endsAt.getTime() - e1!.startsAt.getTime()).toBe(t1!.durationMin * MIN);
    expect(e1!.startsAt.getTime() - e1!.registrationOpensAt.getTime()).toBe(TEST_ENGINE.live.registrationOpensDaysBefore * 86_400_000);
    // The two sittings share no question.
    const def1 = t1!.definition as TestDefinition;
    const [t2] = await h.t.db.select().from(tests).where(eq(tests.key, 't_cbse10math_live_2'));
    const ids = (d: TestDefinition) => new Set(d.sections.flatMap((s) => s.items.map((i) => i.question_id)));
    const overlap = [...ids(def1)].filter((q) => ids(t2!.definition as TestDefinition).has(q));
    expect(overlap).toEqual([]);
    // Re-running changes nothing.
    const again = await scheduleLiveMocks(h.t.db, { year: YEAR, catalog, subjects: ['cbse-10-mathematics'], allowPracticePool: true, fallbackPaper: 'unit-test' });
    expect(again.map((r) => r.status)).toEqual(['unchanged', 'unchanged']);
    // A dev sitting soon after now.
    const soon = new Date(h.clock.now() + 10 * MIN);
    const devRun = await scheduleLiveMocks(h.t.db, { year: YEAR, catalog, subjects: ['cbse-10-mathematics'], allowPracticePool: true, allowRepeats: true, fallbackPaper: 'unit-test', sittings: [{ sitting: 'dev', title: 'Dev live mock', starts: soon }] });
    expect(devRun[0]).toMatchObject({ status: 'scheduled', eventKey: 'live_cbse10math_dev' });
  });
});

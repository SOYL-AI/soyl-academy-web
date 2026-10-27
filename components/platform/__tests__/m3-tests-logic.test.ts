import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type SaveResponsesRequest, type SaveResponsesResult, type StudentQuestion } from '@/platform/shared/api-client';
import {
  AutosaveQueue,
  backoffMs,
  isRetryable,
  MemoryQueueStorage,
  nextSeq,
  validSnapshot,
  type SaveTransport,
} from '../tests/autosave';
import { choiceGroupOf, paletteState, paperOrder, statesFromServer, summarise, testProblemMessage } from '../tests/player-model';
import { clockOffset, countdownText, durationText, formatClock, remainingMs, spokenTime } from '../tests/timer';
import { fromResponse, initialDraft, toResponse, toTestResponse } from '../ui/question/model';

const A = '11111111-1111-4111-8111-111111111111';
const B = '22222222-2222-4222-8222-222222222222';
const C = '33333333-3333-4333-8333-333333333333';

function ok(body: SaveResponsesRequest, extra: Partial<SaveResponsesResult> = {}): SaveResponsesResult {
  return {
    status: 'in_progress',
    serverNow: '2026-10-27T10:00:00.000Z',
    deadlineAt: '2026-10-27T11:00:00.000Z',
    applied: body.items.map((i) => ({ itemId: i.itemId, seq: i.seq })),
    stale: [],
    rejected: [],
    ...extra,
  };
}

function setup(transport: SaveTransport, opts: { now?: () => number; storage?: MemoryQueueStorage } = {}) {
  const events = { closed: 0, rejected: [] as string[], times: [] as string[], statuses: [] as string[] };
  const storage = opts.storage ?? new MemoryQueueStorage();
  const q = new AutosaveQueue({
    attemptId: 'att-1',
    storage,
    transport,
    now: opts.now,
    onClosed: () => events.closed++,
    onRejected: (items) => events.rejected.push(...items.map((i) => i.itemId)),
    onServerTime: (t) => events.times.push(t),
    onStatus: (st) => events.statuses.push(st),
  });
  return { q, storage, events };
}

afterEach(() => vi.useRealTimers());

describe('autosave queue (backend-api M3 handoff §4)', () => {
  it('seq is Date.now() at the change and strictly increasing per item, even if the clock goes back', () => {
    expect(nextSeq(undefined, 1000)).toBe(1000);
    expect(nextSeq(1000, 1000)).toBe(1001);
    expect(nextSeq(5000, 1200)).toBe(5001);
    expect(nextSeq(1000, 2000.7)).toBe(2000);
    let t = 10_000;
    const { q } = setup(async (b) => ok(b), { now: () => t });
    const a = q.record(A, { response: { option_ids: ['a'] }, markedForReview: false, timeSpentSec: 3 });
    t = 9_000; // clock went backwards
    const b = q.record(A, { response: { option_ids: ['b'] }, markedForReview: false, timeSpentSec: 4 });
    expect(b.seq).toBe(a.seq + 1);
    expect(q.pending).toBe(1); // one pending state per item: the latest
    expect(q.entries()[0]!.response).toEqual({ option_ids: ['b'] });
  });

  it('persists every change per attempt and restores it in a new page (reload / crash)', async () => {
    const storage = new MemoryQueueStorage();
    const first = setup(async (b) => ok(b), { storage });
    first.q.record(A, { response: { text: 'my answer' }, markedForReview: true, timeSpentSec: 30 });
    first.q.noteTabSwitch();
    await first.q.settled();
    const second = setup(async (b) => ok(b), { storage });
    const restored = await second.q.init();
    expect(restored).toHaveLength(1);
    expect(restored[0]).toMatchObject({ itemId: A, response: { text: 'my answer' }, markedForReview: true, timeSpentSec: 30 });
    expect(second.q.tabSwitchCount).toBe(1);
  });

  it('sends ≤ 200 items per batch with the cumulative tab-switch count and changedAt', async () => {
    const sent: SaveResponsesRequest[] = [];
    const { q } = setup(async (b) => {
      sent.push(b);
      return ok(b);
    });
    for (let i = 0; i < 205; i++) q.record(`item-${String(i).padStart(3, '0')}`, { response: null, markedForReview: false, timeSpentSec: 0 });
    q.noteTabSwitch();
    q.noteTabSwitch();
    const r = await q.flush();
    expect(r).toMatchObject({ ok: true, sent: 205 });
    expect(sent.map((b) => b.items.length)).toEqual([200, 5]);
    expect(sent[0]!.tabSwitchCount).toBe(2);
    expect(sent[0]!.items[0]).toHaveProperty('changedAt');
    expect(q.pending).toBe(0);
  });

  it('drops applied/stale/rejected entries with seq ≤ the sent seq, keeps newer local changes', async () => {
    let t = 1000;
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const { q, events } = setup(
      async (b) => {
        await gate;
        return ok(b, {
          applied: [{ itemId: A, seq: b.items.find((i) => i.itemId === A)!.seq }],
          stale: [{ itemId: B, seq: b.items.find((i) => i.itemId === B)!.seq, storedSeq: 99_999 }],
          rejected: [{ itemId: C, seq: b.items.find((i) => i.itemId === C)!.seq, reason: 'after_deadline' }],
        });
      },
      { now: () => t },
    );
    q.record(A, { response: { option_ids: ['a'] }, markedForReview: false, timeSpentSec: 1 });
    q.record(B, { response: { option_ids: ['b'] }, markedForReview: false, timeSpentSec: 1 });
    q.record(C, { response: { option_ids: ['c'] }, markedForReview: false, timeSpentSec: 1 });
    const flushing = q.flush();
    t = 2000;
    q.record(A, { response: { option_ids: ['d'] }, markedForReview: false, timeSpentSec: 2 }); // changed while in flight
    release();
    await flushing;
    expect(q.entries().map((e) => e.itemId)).toEqual([A]);
    expect(q.entries()[0]!.response).toEqual({ option_ids: ['d'] });
    expect(events.rejected).toEqual([C]);
    expect(events.times).toContain('2026-10-27T10:00:00.000Z');
    // A later change to B beats what the server stored.
    expect(q.record(B, { response: null, markedForReview: false, timeSpentSec: 1 }).seq).toBe(100_000);
  });

  it('retries with backoff on network errors, 5xx and 429 (Retry-After); keeps everything', async () => {
    let t = 0;
    const transport = vi.fn<SaveTransport>().mockRejectedValueOnce(new ApiError(0, 'network_error', null)).mockRejectedValueOnce(new ApiError(503, 'service_unavailable', null)).mockImplementation(async (b) => ok(b));
    const { q, events } = setup(transport, { now: () => t });
    q.record(A, { response: { value: 3 }, markedForReview: false, timeSpentSec: 1 });
    expect(await q.flush()).toMatchObject({ ok: false, retryInMs: 2000 });
    expect(events.statuses).toContain('offline');
    expect(q.pending).toBe(1);
    expect(await q.flush()).toMatchObject({ ok: false, sent: 0 }); // backing off: no request
    expect(transport).toHaveBeenCalledTimes(1);
    t = 2500;
    expect(await q.flush()).toMatchObject({ ok: false, retryInMs: 4000 }); // 5xx: second failure
    t = 3000;
    expect(await q.flush({ force: true })).toMatchObject({ ok: true, sent: 1 }); // back online: flush at once
    expect(q.pending).toBe(0);
    expect(isRetryable(new ApiError(429, 'rate_limited', null))).toBe(true);
    expect(isRetryable(new ApiError(400, 'validation_failed', null))).toBe(false);
    expect(backoffMs(1, 7)).toBe(7000);
    expect(backoffMs(10)).toBe(30_000);
  });

  it('409 attempt_closed stops the queue and reports it; 400 drops the batch (never jams)', async () => {
    const closed = setup(async () => {
      throw new ApiError(409, 'attempt_closed', null);
    });
    closed.q.record(A, { response: null, markedForReview: true, timeSpentSec: 0 });
    expect(await closed.q.flush()).toMatchObject({ closed: true });
    expect(closed.events.closed).toBe(1);
    expect(closed.q.isClosed).toBe(true);
    expect(await closed.q.flush()).toMatchObject({ closed: true, sent: 0 });

    const bad = setup(async () => {
      throw new ApiError(400, 'validation_failed', null);
    });
    bad.q.record(A, { response: { text: 'x' }, markedForReview: false, timeSpentSec: 0 });
    await bad.q.flush();
    expect(bad.q.pending).toBe(0);
  });

  it('a reply saying the attempt is submitted closes the queue', async () => {
    const { q, events } = setup(async (b) => ok(b, { status: 'auto_submitted' }));
    q.record(A, { response: { option_ids: ['a'] }, markedForReview: false, timeSpentSec: 1 });
    expect(await q.flush()).toMatchObject({ closed: true });
    expect(events.closed).toBe(1);
  });

  it('submitBody carries the remaining queue; clear() removes it from the device (WEB-10)', async () => {
    const storage = new MemoryQueueStorage();
    const { q } = setup(async (b) => ok(b), { storage });
    q.record(A, { response: { blanks: ['x', ''] }, markedForReview: false, timeSpentSec: 5 });
    q.noteTabSwitch();
    expect(q.submitBody()).toMatchObject({ tabSwitchCount: 1, items: [{ itemId: A, response: { blanks: ['x', ''] }, timeSpentSec: 5 }] });
    await q.settled();
    expect(storage.data.has('att-1')).toBe(true);
    await q.clear();
    expect(storage.data.has('att-1')).toBe(false);
    expect(q.pending).toBe(0);
  });

  it('concurrent flushes share one request; dropIfNotNewer keeps only newer local entries', async () => {
    const transport = vi.fn<SaveTransport>(async (b) => ok(b));
    const { q } = setup(transport, { now: () => 5000 });
    q.record(A, { response: null, markedForReview: false, timeSpentSec: 0 });
    await Promise.all([q.flush(), q.flush(), q.flush()]);
    expect(transport).toHaveBeenCalledTimes(1);
    q.record(B, { response: null, markedForReview: false, timeSpentSec: 0 });
    expect(q.dropIfNotNewer(B, 4000)).toBe(false);
    expect(q.dropIfNotNewer(B, 6000)).toBe(true);
  });

  it('validSnapshot rejects other attempts and malformed entries', () => {
    expect(validSnapshot(null, 'x')).toBeNull();
    expect(validSnapshot({ v: 1, attemptId: 'y', entries: {} }, 'x')).toBeNull();
    const snap = validSnapshot(
      { v: 1, attemptId: 'x', entries: { [A]: { itemId: A, seq: 5, response: null, markedForReview: 'yes', timeSpentSec: 1e9 }, [B]: { itemId: C, seq: 1 }, bad: { itemId: 'bad', seq: -1 } }, lastSeq: { [A]: 5, z: 'q' }, tabSwitchCount: -3 },
      'x',
    )!;
    expect(Object.keys(snap.entries)).toEqual([A]);
    expect(snap.entries[A]).toMatchObject({ markedForReview: false, timeSpentSec: 86_400 });
    expect(snap.lastSeq).toEqual({ [A]: 5 });
    expect(snap.tabSwitchCount).toBe(0);
  });
});

describe('server-authoritative timer (AC-12)', () => {
  it('offset from serverNow; remaining from deadlineAt and the offset', () => {
    const local = Date.parse('2026-10-27T10:00:00.000Z');
    const offset = clockOffset('2026-10-27T10:00:30.000Z', local); // device is 30 s behind
    expect(offset).toBe(30_000);
    expect(remainingMs('2026-10-27T10:10:00.000Z', offset, local)).toBe(9.5 * 60_000);
    expect(remainingMs(null, offset, local)).toBeNull();
    expect(clockOffset('garbage', local)).toBe(0);
  });
  it('formats', () => {
    expect(formatClock(3_909_000)).toBe('1:05:09');
    expect(formatClock(299_001)).toBe('05:00');
    expect(formatClock(-5)).toBe('00:00');
    expect(spokenTime(40_000)).toBe('40 seconds');
    expect(spokenTime(65 * 60_000)).toBe('1 hour 5 minutes');
    expect(durationText(180)).toBe('3 h');
    expect(durationText(90)).toBe('1 h 30 min');
    expect(countdownText(2 * 86_400_000 + 4 * 3_600_000)).toBe('2 d 4 h');
    expect(countdownText(45_000)).toBe('45 s');
  });
});

describe('player model', () => {
  const state = {
    sections: [
      { id: 'A', title: 'Section A', instructions: '', maxMarks: 2, itemIds: [A, B], choiceGroups: [] },
      { id: 'B', title: 'Section B', instructions: '', maxMarks: 5, itemIds: [C, 'd'], choiceGroups: [{ id: 'g1', attempt: 1, of: 2, itemIds: [C, 'd'] }] },
    ],
    items: [A, B, C, 'd'].map((id) => ({ itemId: id })),
    responses: [{ itemId: A, response: { option_ids: ['a'] }, markedForReview: true, timeSpentSec: 12, seq: 1, savedAt: '' }],
  };
  it('paper order follows sections, never ids; choice groups', () => {
    expect(paperOrder(state as never)).toEqual([A, B, C, 'd']);
    expect(choiceGroupOf(state as never, 'd')).toMatchObject({ attempt: 1, of: 2, index: 1 });
    expect(choiceGroupOf(state as never, A)).toBeNull();
  });
  it('palette states and summary', () => {
    const st = statesFromServer(state as never);
    expect(paletteState(st[A])).toBe('answered-marked');
    expect(paletteState(st[B])).toBe('not-visited');
    expect(paletteState({ response: null, markedForReview: true, visited: true, timeSpentSec: 0 })).toBe('marked');
    expect(paletteState({ response: null, markedForReview: false, visited: true, timeSpentSec: 0 })).toBe('visited');
    expect(summarise([A, B, C, 'd'], st)).toEqual({ answered: 1, notAnswered: 3, marked: 1, notVisited: 3, total: 4 });
  });
  it('problem text for test-engine codes', () => {
    expect(testProblemMessage(new ApiError(409, 'attempt_closed', null))).toMatch(/already been submitted/);
    expect(testProblemMessage(new ApiError(422, 'bank_too_small', { type: '', title: '', status: 422, code: 'bank_too_small', traceId: '', detail: 'only 3 questions' }))).toMatch(/only 3 questions/);
    expect(testProblemMessage(new ApiError(0, 'network_error', null))).toMatch(/connection/);
  });
});

const q = (over: Partial<StudentQuestion>): StudentQuestion =>
  ({ id: 'q', type: 'mcq', objective: true, stem_md: 'x', options: [], match_right: [], marks: 1, assets: [], version: 1, difficulty: 1, expected_time_sec: 30, topic_ids: [], children: [], ...over }) as StudentQuestion;

describe('fromResponse / toTestResponse (resume an attempt)', () => {
  it('round-trips every response kind', () => {
    const mcq = q({ options: [{ id: 'a', text_md: 'A' }, { id: 'b', text_md: 'B' }] });
    expect(fromResponse(mcq, { option_ids: ['b', 'zz'] })).toEqual({ kind: 'choice', ids: ['b'] });
    expect(fromResponse(q({ type: 'numerical' }), { value: -2.5 })).toEqual({ kind: 'value', text: '-2.5' });
    expect(fromResponse(q({ type: 'fill-blank', stem_md: 'a ____ b ____' }), { blanks: ['x'] })).toEqual({ kind: 'blanks', values: ['x', ''] });
    const match = q({ type: 'match', options: [{ id: '1', text_md: '' }], match_right: [{ id: 'p', text_md: '' }] });
    expect(fromResponse(match, { pairs: [{ left_id: '1', right_id: 'p' }, { left_id: '9', right_id: 'p' }] })).toEqual({ kind: 'pairs', pairs: { '1': 'p' } });
    const ord = q({ type: 'ordering', options: [{ id: 'x', text_md: '' }, { id: 'y', text_md: '' }] });
    expect(fromResponse(ord, { order: ['y', 'x'] })).toEqual({ kind: 'order', ids: ['y', 'x'] });
    expect(fromResponse(ord, { order: ['y'] })).toEqual({ kind: 'order', ids: ['x', 'y'] });
    expect(fromResponse(q({ type: 'long' }), { text: 'essay' })).toEqual({ kind: 'text', text: 'essay' });
    expect(fromResponse(q({ type: 'code-output' }), { output: '1\n2' })).toEqual({ kind: 'output', text: '1\n2' });
    expect(fromResponse(mcq, null)).toEqual(initialDraft(mcq));
    const pairs: [StudentQuestion, object][] = [
      [mcq, { option_ids: ['a'] }],
      [q({ type: 'numerical' }), { value: 42 }],
      [match, { pairs: [{ left_id: '1', right_id: 'p' }] }],
      [ord, { order: ['y', 'x'] }],
      [q({ type: 'long' }), { text: 'essay' }],
    ];
    for (const [question, response] of pairs) expect(toResponse(fromResponse(question, response as never))).toEqual(response);
  });

  it('case-based parts with an internal-choice alternative', () => {
    const cb = q({
      type: 'case-based',
      children: [
        { id: 'c1', type: 'mcq', objective: true, stem_md: '', options: [{ id: 'a', text_md: '' }], match_right: [], marks: 1, assets: [], alternatives: [] },
        { id: 'c2', type: 'short', objective: false, stem_md: '', options: [], match_right: [], marks: 2, assets: [], alternatives: [{ id: 'c2b', type: 'short', objective: false, stem_md: '', options: [], match_right: [], marks: 2, assets: [] }] },
      ],
    });
    const d = fromResponse(cb, { parts: [{ id: 'c2', alternative: 'c2b', response: { text: 'alt answer' } }, { id: 'c1', response: { option_ids: ['a'] } }] });
    expect(d).toEqual({ kind: 'parts', parts: { c1: { draft: { kind: 'choice', ids: ['a'] } }, c2: { alternative: 'c2b', draft: { kind: 'text', text: 'alt answer' } } } });
    expect(toTestResponse(d)).toEqual({ parts: [{ id: 'c1', response: { option_ids: ['a'] } }, { id: 'c2', alternative: 'c2b', response: { text: 'alt answer' } }] });
    expect(fromResponse(cb, { parts: [{ id: 'c2', alternative: 'forged', response: { text: 'y' } }] })).toMatchObject({ parts: { c2: { draft: { kind: 'text', text: 'y' } } } });
  });

  it('toTestResponse: null for empty drafts and unparsable numbers', () => {
    expect(toTestResponse({ kind: 'choice', ids: [] })).toBeNull();
    expect(toTestResponse({ kind: 'value', text: '12 cm' })).toBeNull();
    expect(toTestResponse({ kind: 'value', text: '1,200' })).toEqual({ value: 1200 });
    expect(toTestResponse({ kind: 'text', text: '   ' })).toBeNull();
    expect(toTestResponse({ kind: 'blanks', values: ['a', ''] })).toEqual({ blanks: ['a', ''] });
    expect(toTestResponse({ kind: 'parts', parts: { c1: { draft: { kind: 'value', text: 'abc' } } } })).toBeNull();
  });
});

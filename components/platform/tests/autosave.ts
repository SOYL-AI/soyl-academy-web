/**
 * The test player's autosave queue (backend-api M3 handoff "What web-platform M3 needs" §4; ADR-012 §3;
 * ADR-018 §1). Pure logic with injected storage, transport and clock, so every rule is unit-tested:
 *
 * - One pending state per item: `{itemId, seq, response, markedForReview, timeSpentSec, changedAt}`.
 * - `seq` = Date.now() at the change, strictly increasing per item (a clock that goes back gets last + 1).
 * - Persisted per attempt on every change (IndexedDB in the browser: idb-storage.ts), so answers survive a
 *   reload, a crash and up to 10+ minutes offline (ARCHITECTURE §3.2).
 * - Flushed in batches of ≤ 200 with the cumulative `tabSwitchCount`. On reply, every entry listed in
 *   `applied`, `stale` or `rejected` whose seq ≤ the sent seq is dropped; newer local changes stay.
 * - Retries with backoff only on network errors, 5xx and 429 (Retry-After). 409 `attempt_closed` stops the
 *   queue (the player shows the result). Any other 4xx is a programming error: logged, the batch dropped.
 * - `rejected: after_deadline` items are reported so the student can be told they did not count (F-007).
 */
import { isApiError, type PracticeResponse, type SaveResponsesRequest, type SaveResponsesResult } from '@/platform/shared/api-client';

export const AUTOSAVE_MAX_BATCH = 200;
/** Backoff after a failed flush: 2 s, 4 s, 8 s … capped (the 10 s cadence keeps trying). */
export const BACKOFF_BASE_MS = 2_000;
export const BACKOFF_MAX_MS = 30_000;

export interface QueueEntry {
  itemId: string;
  seq: number;
  response: PracticeResponse | null;
  markedForReview: boolean;
  timeSpentSec: number;
  /** Device time of the change (ISO, advisory: F-007). */
  changedAt: string;
}

export interface QueueSnapshot {
  v: 1;
  attemptId: string;
  /** Pending (unsent or unacknowledged) item states. */
  entries: Record<string, QueueEntry>;
  /** Highest seq ever used per item (survives flushes, so seq never repeats on this device). */
  lastSeq: Record<string, number>;
  tabSwitchCount: number;
  updatedAt: number;
}

export interface QueueStorage {
  load(attemptId: string): Promise<QueueSnapshot | null>;
  save(snapshot: QueueSnapshot): Promise<void>;
  clear(attemptId: string): Promise<void>;
}

export type SaveTransport = (body: SaveResponsesRequest, opts: { keepalive: boolean }) => Promise<SaveResponsesResult>;

export type QueueStatus = 'idle' | 'saving' | 'saved' | 'offline' | 'error' | 'closed';

export interface RejectedItem {
  itemId: string;
  seq: number;
  reason: string;
}

export interface QueueEvents {
  /** Every successful reply: keep the timer in sync (offset = serverNow − local now). */
  onServerTime?: (serverNow: string, deadlineAt: string | null, status: string) => void;
  /** 409 attempt_closed: the attempt is over (submitted elsewhere, or auto-submitted). */
  onClosed?: () => void;
  /** Saves the server refused because they arrived after deadline + grace. */
  onRejected?: (items: RejectedItem[]) => void;
  /** Status changes, for the "Saved / Saving… / Offline" indicator. */
  onStatus?: (status: QueueStatus, pending: number) => void;
}

export interface FlushResult {
  sent: number;
  ok: boolean;
  closed?: boolean;
  retryInMs?: number;
}

export function emptySnapshot(attemptId: string, now: number): QueueSnapshot {
  return { v: 1, attemptId, entries: {}, lastSeq: {}, tabSwitchCount: 0, updatedAt: now };
}

/** Accepts only a well-formed snapshot of this attempt (storage may hold anything). */
export function validSnapshot(raw: unknown, attemptId: string): QueueSnapshot | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Partial<QueueSnapshot>;
  if (s.v !== 1 || s.attemptId !== attemptId || typeof s.entries !== 'object' || s.entries === null) return null;
  const entries: Record<string, QueueEntry> = {};
  for (const [id, e] of Object.entries(s.entries)) {
    if (!e || typeof e !== 'object' || e.itemId !== id || !Number.isSafeInteger(e.seq) || e.seq < 1) continue;
    entries[id] = {
      itemId: id,
      seq: e.seq,
      response: e.response ?? null,
      markedForReview: e.markedForReview === true,
      timeSpentSec: Number.isFinite(e.timeSpentSec) ? Math.max(0, Math.min(86_400, Math.floor(e.timeSpentSec))) : 0,
      changedAt: typeof e.changedAt === 'string' ? e.changedAt : new Date(0).toISOString(),
    };
  }
  const lastSeq: Record<string, number> = {};
  for (const [id, n] of Object.entries(s.lastSeq ?? {})) if (Number.isSafeInteger(n)) lastSeq[id] = n as number;
  return {
    v: 1,
    attemptId,
    entries,
    lastSeq,
    tabSwitchCount: Number.isSafeInteger(s.tabSwitchCount) && (s.tabSwitchCount as number) >= 0 ? (s.tabSwitchCount as number) : 0,
    updatedAt: typeof s.updatedAt === 'number' ? s.updatedAt : 0,
  };
}

/** Next seq for an item: Date.now(), but strictly above anything used before on this device. */
export function nextSeq(last: number | undefined, now: number): number {
  const t = Math.floor(now);
  return last !== undefined && t <= last ? last + 1 : t;
}

/** Is this error worth retrying (network, 5xx, 429)? */
export function isRetryable(err: unknown): boolean {
  if (!isApiError(err)) return true; // fetch threw something unexpected: treat as a network problem
  if (err.code === 'network_error' || err.status === 0) return true;
  if (err.status === 429 || err.code === 'rate_limited') return true;
  return err.status >= 500;
}

export function isOfflineError(err: unknown): boolean {
  return !isApiError(err) || err.code === 'network_error' || err.status === 0 || err.code === 'upstream_unavailable' || err.status === 502 || err.status === 504;
}

export function backoffMs(failures: number, retryAfterSeconds?: number): number {
  if (retryAfterSeconds && retryAfterSeconds > 0) return Math.min(retryAfterSeconds * 1000, 5 * 60_000);
  return Math.min(BACKOFF_BASE_MS * 2 ** Math.max(0, failures - 1), BACKOFF_MAX_MS);
}

export interface AutosaveQueueOptions extends QueueEvents {
  attemptId: string;
  storage: QueueStorage;
  transport: SaveTransport;
  now?: () => number;
  maxBatch?: number;
  log?: (message: string, detail?: unknown) => void;
}

export class AutosaveQueue {
  private snap: QueueSnapshot;
  private inflight: Promise<FlushResult> | null = null;
  private failures = 0;
  private retryAt = 0;
  private closed = false;
  private status: QueueStatus = 'idle';
  private writes: Promise<void> = Promise.resolve();
  private readonly now: () => number;
  private readonly maxBatch: number;

  constructor(private readonly o: AutosaveQueueOptions) {
    this.now = o.now ?? Date.now;
    this.maxBatch = Math.max(1, Math.min(o.maxBatch ?? AUTOSAVE_MAX_BATCH, AUTOSAVE_MAX_BATCH));
    this.snap = emptySnapshot(o.attemptId, this.now());
  }

  /** Loads what an earlier page left on this device. Returns the pending entries (to merge into the UI). */
  async init(): Promise<QueueEntry[]> {
    try {
      const loaded = validSnapshot(await this.o.storage.load(this.o.attemptId), this.o.attemptId);
      if (loaded) this.snap = loaded;
    } catch (err) {
      this.o.log?.('autosave: could not read the local queue', err);
    }
    this.emit();
    return Object.values(this.snap.entries);
  }

  get pending(): number {
    return Object.keys(this.snap.entries).length;
  }

  get isClosed(): boolean {
    return this.closed;
  }

  get tabSwitchCount(): number {
    return this.snap.tabSwitchCount;
  }

  entries(): QueueEntry[] {
    return Object.values(this.snap.entries);
  }

  /** Keeps a server-known seq so a local change is always newer than what the server stored. */
  noteServerSeq(itemId: string, seq: number): void {
    if (Number.isSafeInteger(seq) && seq > (this.snap.lastSeq[itemId] ?? 0)) this.snap.lastSeq[itemId] = seq;
  }

  /** Drops a pending local entry that the server already has (same or newer seq). */
  dropIfNotNewer(itemId: string, serverSeq: number): boolean {
    const e = this.snap.entries[itemId];
    if (e && e.seq <= serverSeq) {
      delete this.snap.entries[itemId];
      this.persist();
      return true;
    }
    return false;
  }

  /** Records the item's full current state as a new change. */
  record(itemId: string, state: { response: PracticeResponse | null; markedForReview: boolean; timeSpentSec: number }): QueueEntry {
    const now = this.now();
    const seq = nextSeq(this.snap.lastSeq[itemId], now);
    this.snap.lastSeq[itemId] = seq;
    const entry: QueueEntry = {
      itemId,
      seq,
      response: state.response,
      markedForReview: state.markedForReview,
      timeSpentSec: Math.max(0, Math.min(86_400, Math.floor(state.timeSpentSec))),
      changedAt: new Date(now).toISOString(),
    };
    this.snap.entries[itemId] = entry;
    this.persist();
    if (this.status === 'saved' || this.status === 'idle') this.setStatus('idle');
    else this.emit();
    return entry;
  }

  noteTabSwitch(): void {
    this.snap.tabSwitchCount += 1;
    this.persist();
  }

  /** The body for POST /v1/attempts/:id/submit (the final batch, one round trip). */
  submitBody(): SaveResponsesRequest {
    return { items: this.batch(this.maxBatch).map(toWire), tabSwitchCount: this.snap.tabSwitchCount };
  }

  /** Is a retry waiting (backoff)? The player still calls flush() on its cadence; it returns early. */
  get backingOff(): boolean {
    return this.now() < this.retryAt;
  }

  /**
   * Sends pending entries (all of them, in batches). Concurrent calls share one flush. `force` ignores the
   * backoff (the browser came back online, page hide, before submit). `keepalive` for page hide.
   */
  flush(opts: { force?: boolean; keepalive?: boolean } = {}): Promise<FlushResult> {
    if (this.inflight) return this.inflight;
    if (this.closed) return Promise.resolve({ sent: 0, ok: false, closed: true });
    if (this.pending === 0 && !opts.keepalive) return Promise.resolve({ sent: 0, ok: true });
    if (!opts.force && this.backingOff) return Promise.resolve({ sent: 0, ok: false, retryInMs: this.retryAt - this.now() });
    this.inflight = this.run(opts.keepalive === true).finally(() => {
      this.inflight = null;
    });
    return this.inflight;
  }

  private batch(n: number): QueueEntry[] {
    return Object.values(this.snap.entries)
      .sort((a, b) => a.changedAt.localeCompare(b.changedAt) || a.seq - b.seq)
      .slice(0, n);
  }

  private async run(keepalive: boolean): Promise<FlushResult> {
    let sent = 0;
    // Keepalive requests are limited to 64 KB in browsers: one smaller batch, best effort.
    const size = keepalive ? Math.min(this.maxBatch, 25) : this.maxBatch;
    for (let round = 0; round < 50; round++) {
      const batch = this.batch(size);
      if (batch.length === 0 && round > 0) break;
      if (batch.length === 0) break;
      this.setStatus('saving');
      let res: SaveResponsesResult;
      try {
        res = await this.o.transport({ items: batch.map(toWire), tabSwitchCount: this.snap.tabSwitchCount }, { keepalive });
      } catch (err) {
        return this.fail(err, sent);
      }
      this.failures = 0;
      this.retryAt = 0;
      sent += batch.length;
      const sentSeq = new Map(batch.map((e) => [e.itemId, e.seq]));
      for (const list of [res.applied, res.stale, res.rejected]) {
        for (const r of list) {
          const e = this.snap.entries[r.itemId];
          const s = sentSeq.get(r.itemId);
          if (e && s !== undefined && e.seq <= s) delete this.snap.entries[r.itemId];
        }
      }
      for (const r of res.stale) this.noteServerSeq(r.itemId, r.storedSeq);
      // Anything in the batch the server did not mention at all is still pending; never loop on it.
      const unanswered = batch.filter((e) => this.snap.entries[e.itemId]?.seq === e.seq && !res.applied.some((a) => a.itemId === e.itemId));
      this.persist();
      this.o.onServerTime?.(res.serverNow, res.deadlineAt, res.status);
      if (res.rejected.length) this.o.onRejected?.(res.rejected.map((r) => ({ itemId: r.itemId, seq: r.seq, reason: r.reason })));
      if (res.status === 'submitted' || res.status === 'auto_submitted') {
        this.close();
        return { sent, ok: true, closed: true };
      }
      if (unanswered.length === batch.length) break;
    }
    this.setStatus(this.pending === 0 ? 'saved' : 'idle');
    return { sent, ok: true };
  }

  private fail(err: unknown, sent: number): FlushResult {
    if (isApiError(err, 'attempt_closed') || (isApiError(err) && err.status === 409)) {
      this.close();
      return { sent, ok: false, closed: true };
    }
    if (isApiError(err) && (err.status === 404 || err.status === 403 || err.status === 401)) {
      // Not this user's attempt any more (logged out, deleted): stop; the player reloads the state.
      this.setStatus('error');
      return { sent, ok: false };
    }
    if (isRetryable(err)) {
      this.failures += 1;
      const wait = backoffMs(this.failures, isApiError(err) ? err.retryAfterSeconds : undefined);
      this.retryAt = this.now() + wait;
      this.setStatus(isOfflineError(err) ? 'offline' : 'error');
      return { sent, ok: false, retryInMs: wait };
    }
    // 400 and other client errors: a bug on our side. Log it and drop the batch so the queue never jams.
    this.o.log?.('autosave: the server refused a batch; dropping it', err);
    for (const e of this.batch(this.maxBatch)) delete this.snap.entries[e.itemId];
    this.persist();
    this.setStatus('error');
    return { sent, ok: false };
  }

  private close(): void {
    if (this.closed) return;
    this.closed = true;
    this.setStatus('closed');
    this.o.onClosed?.();
  }

  /** After submit: the queue is cleared from the device (WEB-10). */
  async clear(): Promise<void> {
    this.snap = emptySnapshot(this.o.attemptId, this.now());
    await this.writes.catch(() => {});
    try {
      await this.o.storage.clear(this.o.attemptId);
    } catch (err) {
      this.o.log?.('autosave: could not clear the local queue', err);
    }
    this.emit();
  }

  /** Waits for pending writes to device storage (tests; before navigation). */
  async settled(): Promise<void> {
    await this.writes.catch(() => {});
  }

  private persist(): void {
    this.snap.updatedAt = this.now();
    const copy: QueueSnapshot = structuredCloneSafe(this.snap);
    this.writes = this.writes
      .catch(() => {})
      .then(() => this.o.storage.save(copy))
      .catch((err) => this.o.log?.('autosave: could not write the local queue', err));
  }

  private setStatus(status: QueueStatus): void {
    this.status = status;
    this.emit();
  }

  private emit(): void {
    this.o.onStatus?.(this.status, this.pending);
  }
}

function toWire(e: QueueEntry): SaveResponsesRequest['items'][number] {
  return { itemId: e.itemId, seq: e.seq, response: e.response, markedForReview: e.markedForReview, timeSpentSec: e.timeSpentSec, changedAt: e.changedAt };
}

function structuredCloneSafe<T>(v: T): T {
  return typeof structuredClone === 'function' ? structuredClone(v) : (JSON.parse(JSON.stringify(v)) as T);
}

/** In-memory storage (tests; browsers without IndexedDB, e.g. some private modes). */
export class MemoryQueueStorage implements QueueStorage {
  readonly data = new Map<string, QueueSnapshot>();
  async load(attemptId: string) {
    const s = this.data.get(attemptId);
    return s ? structuredCloneSafe(s) : null;
  }
  async save(snapshot: QueueSnapshot) {
    this.data.set(snapshot.attemptId, structuredCloneSafe(snapshot));
  }
  async clear(attemptId: string) {
    this.data.delete(attemptId);
  }
}

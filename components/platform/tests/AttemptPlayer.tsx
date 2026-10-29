'use client';

/**
 * Test player (ARCHITECTURE §3.2; backend-api M3 handoff "What web-platform M3 needs"; ADR-018 §1).
 *
 * - Server-authoritative timer: offset from every `serverNow`; at zero the queue is flushed and the paper
 *   submitted. If the tab slept past the deadline, the server has auto-submitted: we go to the result.
 * - Autosave: every change is recorded in the per-attempt queue on this device (IndexedDB) at once, sent
 *   every 10 s while something changed, on tab hide / page hide (keepalive), when the browser comes back
 *   online, and with the submit itself. Answering works offline (10+ minutes); nothing is lost on reload.
 * - Palette (answered / marked / seen / not visited), section navigation, choice groups ("attempt any N"),
 *   mark for review, clear answer, submit confirmation, tab-switch count (recorded, never punished).
 * - Questions render through the shared QuestionCard in test mode: no Check button, no key (F-006).
 */
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isApiError, type AttemptItem, type AttemptState, type SubmitResult } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Button, IconButton } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { fromResponse, initialDraft, toTestResponse, type Draft } from '@/components/platform/ui/question/model';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import { useSession } from '../auth/SessionProvider';
import { summariseAwards } from '../coins/coins-format';
import { useOptionalCoins } from '../coins/CoinsProvider';
import { api } from '../lib/api-browser';
import { AutosaveQueue, type QueueStatus } from './autosave';
import { createQueueStorage } from './idb-storage';
import {
  choiceGroupOf,
  marksText,
  PALETTE_LABELS,
  paletteState,
  paperOrder,
  resultPath,
  attemptPath,
  statesFromServer,
  summarise,
  testProblemMessage,
  type ItemUiState,
} from './player-model';
import { ANNOUNCE_AT_MS, clockOffset, durationText, formatClock, remainingMs, spokenTime } from './timer';
import s from './tests.module.css';

type SlotsModule = typeof import('@/components/platform/ui/question/slots');

/** Autosave cadence (TEST_ENGINE.autosave.intervalSeconds, platform/shared/config/tests.ts). */
export const AUTOSAVE_INTERVAL_MS = 10_000;
/** Typing is recorded to the queue after this pause (choices and marks are recorded at once). */
const RECORD_DEBOUNCE_MS = 400;

function langFor(subjectId: string): string | undefined {
  return /-hindi(?:-|$)/.test(subjectId) ? 'hi' : undefined;
}

export function AttemptPlayer({ attemptId }: { attemptId: string }) {
  const { state: session, openLogin } = useSession();
  const router = useRouter();
  const [attempt, setAttempt] = useState<AttemptState | null>(null);
  const [error, setError] = useState<{ message: string; notFound?: boolean } | null>(null);
  const [starting, setStarting] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api.get('/v1/attempts/{id}', { params: { id: attemptId } });
      if (res.attempt.status === 'submitted' || res.attempt.status === 'auto_submitted') {
        router.replace(resultPath(attemptId));
        return;
      }
      setAttempt(res);
      setError(null);
    } catch (err) {
      setError({ message: testProblemMessage(err), notFound: isApiError(err, 'not_found') });
    }
  }, [attemptId, router]);

  const memberId = session.status === 'member' ? session.user.id : null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch the attempt once the member is known
    if (memberId) void load();
  }, [memberId, load]);

  if (session.status === 'guest') {
    return (
      <EmptyState
        title="Log in to continue your test"
        headingLevel="h1"
        icon="lock"
        action={<Button onClick={() => openLogin({ reason: 'Log in to continue your test. Your answers are saved to your account.' })}>Log in</Button>}
      >
        Tests are free. Your answers are saved to your account.
      </EmptyState>
    );
  }
  if (error) {
    return (
      <EmptyState title={error.notFound ? 'Test not found' : 'We could not open this test'} headingLevel="h1" icon="alert" action={<Button variant="secondary" onClick={() => void load()}>Try again</Button>}>
        {error.message}
      </EmptyState>
    );
  }
  if (!attempt) {
    return (
      <div aria-busy="true" aria-label="Loading your test" className={s.loading}>
        <Skeleton lines={2} />
        <Skeleton variant="block" height={220} />
      </div>
    );
  }
  if (attempt.attempt.status === 'created') {
    const start = async () => {
      setStarting(true);
      try {
        const res = await api.post('/v1/tests/{id}/attempts', { params: { id: attempt.test.id }, body: { start: true } });
        if (res.attempt.id !== attemptId) router.replace(attemptPath(res.attempt.id));
        else setAttempt(res);
      } catch (err) {
        setError({ message: testProblemMessage(err) });
      } finally {
        setStarting(false);
      }
    };
    return <StartScreen attempt={attempt} onStart={() => void start()} starting={starting} />;
  }
  return <Player key={attempt.attempt.id} initial={attempt} />;
}

function StartScreen({ attempt, onStart, starting }: { attempt: AttemptState; onStart: () => void; starting: boolean }) {
  const t = attempt.test;
  return (
    <section className={s.startCard} aria-labelledby="start-title" data-testid="test-start">
      <h1 id="start-title" className={s.startTitle}>
        {t.title}
      </h1>
      <p className={s.muted}>
        {t.subject.name} · {marksText(t.totalMarks)} · {durationText(t.durationMin)} · {t.questionCount} questions
      </p>
      <ul className={s.instructions}>
        <li>The timer starts when you press Start and keeps running if you close the page.</li>
        <li>Your answers save automatically, even if your internet drops. Keep answering.</li>
        <li>You can mark questions to review and change answers until you submit.</li>
        {attempt.sections.map((sec) => (
          <li key={sec.id}>
            <strong>{sec.title}</strong>
            {sec.instructions ? `: ${sec.instructions}` : ''}
          </li>
        ))}
      </ul>
      <Button size="lg" onClick={onStart} loading={starting} data-testid="start-test">
        Start test
      </Button>
    </section>
  );
}

/* ── The running paper ─────────────────────────────────────────────────────────────────────────── */

function Player({ initial }: { initial: AttemptState }) {
  const router = useRouter();
  const toast = useToast();
  const coins = useOptionalCoins();
  const attemptId = initial.attempt.id;
  const order = useMemo(() => paperOrder(initial), [initial]);
  const itemsById = useMemo(() => new Map(initial.items.map((it) => [it.itemId, it])), [initial]);
  const lang = langFor(initial.test.subject.id);

  const [slotsModule, setSlotsModule] = useState<SlotsModule | null>(null);
  const [states, setStates] = useState<Record<string, ItemUiState>>(() => statesFromServer(initial));
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [index, setIndex] = useState(() => {
    const firstOpen = order.findIndex((id) => !initial.responses.some((r) => r.itemId === id));
    return firstOpen >= 0 ? firstOpen : 0;
  });
  const [ready, setReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ status: QueueStatus; pending: number }>({ status: 'idle', pending: 0 });
  const [online, setOnline] = useState(true);
  const [deadline, setDeadline] = useState<string | null>(initial.attempt.deadlineAt);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState<'idle' | 'manual' | 'auto'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [rejected, setRejected] = useState(0);

  const offset = useRef(clockOffset(initial.attempt.serverNow));
  const queue = useRef<AutosaveQueue | null>(null);
  // The latest item states, readable synchronously by the queue writer (React state updates are async).
  const statesRef = useRef(states);
  const timers = useRef(new Map<string, number>());
  const entered = useRef<{ id: string; at: number } | null>(null);
  const finished = useRef(false);
  const rejectedRef = useRef(0);

  const currentId = order[index]!;
  const item = itemsById.get(currentId)!;

  const goToResult = useCallback(
    (late: number) => {
      finished.current = true;
      router.replace(`${resultPath(attemptId)}${late > 0 ? `?late=${late}` : ''}`);
    },
    [attemptId, router],
  );

  // Renderer chunk (Markdown, KaTeX, visuals) for the questions.
  useEffect(() => {
    let alive = true;
    import('@/components/platform/ui/question/slots').then((m) => alive && setSlotsModule(m));
    return () => {
      alive = false;
    };
  }, []);

  // The autosave queue: load what this device kept, merge it with the server's saved answers.
  useEffect(() => {
    const q = new AutosaveQueue({
      attemptId,
      storage: createQueueStorage(),
      transport: (body, { keepalive }) => api.put('/v1/attempts/{id}/responses', { params: { id: attemptId }, body, keepalive }),
      onServerTime: (serverNow, deadlineAt) => {
        offset.current = clockOffset(serverNow);
        if (deadlineAt) setDeadline(deadlineAt);
      },
      onClosed: () => {
        if (!finished.current) goToResult(rejectedRef.current);
      },
      onRejected: (items) => {
        rejectedRef.current += items.length;
        setRejected(rejectedRef.current);
      },
      onStatus: (status, pending) => setSaveStatus({ status, pending }),
      log: (m, d) => console.warn(m, d),
    });
    queue.current = q;
    let alive = true;
    void q.init().then((local) => {
      if (!alive) return;
      const serverSeq = new Map(initial.responses.map((r) => [r.itemId, r.seq]));
      for (const [id, seq] of serverSeq) q.noteServerSeq(id, seq);
      const newer = local.filter((e) => itemsById.has(e.itemId) && !q.dropIfNotNewer(e.itemId, serverSeq.get(e.itemId) ?? 0));
      if (newer.length) {
        const prev = statesRef.current;
        const next = { ...prev };
        for (const e of newer) next[e.itemId] = { response: e.response, markedForReview: e.markedForReview, visited: true, timeSpentSec: Math.max(e.timeSpentSec, prev[e.itemId]?.timeSpentSec ?? 0) };
        statesRef.current = next;
        setStates(next);
        setDrafts((prev) => {
          const next = { ...prev };
          for (const e of newer) next[e.itemId] = fromResponse(itemsById.get(e.itemId)!.question, e.response);
          return next;
        });
      }
      setReady(true);
      if (q.pending) void q.flush({ force: true });
    });
    return () => {
      alive = false;
    };
  }, [attemptId, initial, itemsById, goToResult]);

  /** Writes debounced changes into the queue now (before a flush, page hide or submit). */
  const recordNow = useCallback((itemId?: string) => {
    const q = queue.current;
    if (!q) return;
    const ids = itemId ? [itemId] : [...timers.current.keys()];
    for (const id of ids) {
      const t = timers.current.get(id);
      if (t === undefined) continue;
      window.clearTimeout(t);
      timers.current.delete(id);
      const st = statesRef.current[id];
      if (st) q.record(id, { response: st.response, markedForReview: st.markedForReview, timeSpentSec: st.timeSpentSec });
    }
  }, []);

  const scheduleRecord = useCallback(
    (itemId: string, delay: number) => {
      const old = timers.current.get(itemId);
      if (old !== undefined) window.clearTimeout(old);
      timers.current.set(itemId, window.setTimeout(() => recordNow(itemId), delay));
      if (delay === 0) recordNow(itemId);
    },
    [recordNow],
  );

  const update = useCallback(
    (itemId: string, patch: Partial<ItemUiState>, delay: number | null) => {
      const prev = statesRef.current;
      const next = { ...prev, [itemId]: { ...(prev[itemId] ?? { response: null, markedForReview: false, visited: true, timeSpentSec: 0 }), ...patch } };
      statesRef.current = next;
      setStates(next);
      if (delay !== null) scheduleRecord(itemId, delay);
    },
    [scheduleRecord],
  );

  // Visiting an item: mark it seen; time on the previous item is added when leaving it.
  useEffect(() => {
    const prev = entered.current;
    const now = Date.now();
    if (prev && prev.id !== currentId) {
      const secs = Math.floor((now - prev.at) / 1000);
      if (secs >= 2) {
        const st = statesRef.current[prev.id];
        update(prev.id, { timeSpentSec: (st?.timeSpentSec ?? 0) + secs }, 0);
      }
    }
    entered.current = { id: currentId, at: now };
    // Seen-but-unanswered is shown in the palette only; it is not saved.
    if (!statesRef.current[currentId]?.visited) update(currentId, { visited: true }, null);
  }, [currentId, update]);

  const flush = useCallback(
    (opts: { force?: boolean; keepalive?: boolean } = {}) => {
      recordNow();
      return queue.current?.flush(opts);
    },
    [recordNow],
  );

  // Cadence, connectivity, tab switches, page hide.
  useEffect(() => {
    const tick = window.setInterval(() => {
      if (queue.current?.pending) void flush();
    }, AUTOSAVE_INTERVAL_MS);
    const goOnline = () => {
      setOnline(true);
      void flush({ force: true });
    };
    const goOffline = () => setOnline(false);
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        queue.current?.noteTabSwitch();
        void flush({ force: true, keepalive: true });
      } else if (navigator.onLine) void flush({ force: true });
    };
    const onPageHide = () => void flush({ force: true, keepalive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the browser's connectivity at mount
    setOnline(navigator.onLine);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, [flush]);

  const submit = useCallback(
    async (kind: 'manual' | 'auto') => {
      if (finished.current) return;
      const q = queue.current;
      if (!q) return;
      setSubmitting(kind);
      setSubmitError(null);
      try {
        recordNow();
        await q.settled();
        if (q.pending > 200) await q.flush({ force: true });
        const res: SubmitResult = await api.post('/v1/attempts/{id}/submit', { params: { id: attemptId }, body: q.submitBody() });
        await q.clear();
        const paid = summariseAwards(res.coinAwards);
        if (paid.total > 0) coins?.addEarned(paid.total);
        const extra = [
          res.xpAwarded > 0 ? `+${res.xpAwarded} XP` : '',
          res.badgesAwarded.length ? `New badge: ${res.badgesAwarded.join(', ')}` : '',
          paid.text ?? '',
          paid.capped && paid.total === 0 ? 'Today’s coin limit reached' : '',
        ]
          .filter(Boolean)
          .join(' · ');
        toast.show({ title: res.status === 'auto_submitted' ? 'Time is up. Your test was submitted.' : 'Test submitted', description: extra || undefined, tone: 'success' });
        goToResult(rejectedRef.current);
      } catch (err) {
        if (isApiError(err, 'attempt_closed')) {
          await q.clear();
          goToResult(rejectedRef.current);
          return;
        }
        setSubmitting('idle');
        setSubmitError(
          isApiError(err) && (err.code === 'network_error' || err.status >= 500)
            ? 'You seem to be offline. Your answers are safe on this device. We will submit as soon as you are back online.'
            : testProblemMessage(err),
        );
      }
    },
    [attemptId, goToResult, recordNow, toast, coins],
  );

  // Auto-submit retries once the connection comes back.
  useEffect(() => {
    if (!submitError || submitting !== 'idle') return;
    const retry = () => void submit('auto');
    window.addEventListener('online', retry);
    return () => window.removeEventListener('online', retry);
  }, [submitError, submitting, submit]);

  const onExpire = useCallback(() => {
    setConfirmOpen(false);
    setPaletteOpen(false);
    void submit('auto');
  }, [submit]);

  const onDraftChange = (d: Draft) => {
    setDrafts((p) => ({ ...p, [currentId]: d }));
    const typing = d.kind === 'text' || d.kind === 'output' || d.kind === 'value' || d.kind === 'blanks' || d.kind === 'parts';
    update(currentId, { response: toTestResponse(d) }, typing ? RECORD_DEBOUNCE_MS : 0);
  };
  const toggleMark = () => update(currentId, { markedForReview: !states[currentId]?.markedForReview }, 0);
  const clearAnswer = () => {
    setDrafts((p) => ({ ...p, [currentId]: initialDraft(item.question) }));
    update(currentId, { response: null }, 0);
  };

  const slots: QuestionSlots | null = useMemo(() => (slotsModule ? slotsModule.buildQuestionSlots(item.question, lang) : null), [slotsModule, item, lang]);

  const sectionOf = (id: string) => initial.sections.find((sec) => sec.itemIds.includes(id));
  const section = sectionOf(currentId);
  const group = choiceGroupOf(initial, currentId);
  const summary = summarise(order, states);
  const draft = drafts[currentId] ?? fromResponse(item.question, states[currentId]?.response ?? null);
  const marked = states[currentId]?.markedForReview ?? false;
  const offlineNow = !online || saveStatus.status === 'offline';

  const goTo = (i: number) => {
    setIndex(Math.max(0, Math.min(order.length - 1, i)));
    setPaletteOpen(false);
    document.getElementById('question-top')?.focus({ preventScroll: false });
  };

  return (
    <div className={s.player} data-testid="test-player" data-ready={ready && slots ? 'true' : 'false'} data-attempt-id={attemptId}>
      <header className={s.topbar}>
        <div className={s.topTitle}>
          <h1 className={s.paperTitle}>{initial.test.title}</h1>
          <SaveIndicator status={saveStatus.status} pending={saveStatus.pending} offline={offlineNow} />
        </div>
        <Button variant="secondary" size="sm" onClick={() => setConfirmOpen(true)} data-testid="submit-open">
          Submit test
        </Button>
      </header>
      {rejected > 0 && (
        <div className={s.warn} role="alert" data-testid="late-banner">
          <Icon name="alert" size={20} />
          <p>{rejected === 1 ? 'One answer' : `${rejected} answers`} reached us after time was up, so they did not count.</p>
        </div>
      )}
      {submitError && (
        <div className={s.warn} role="alert">
          <Icon name="alert" size={20} />
          <p>{submitError}</p>
          <Button size="sm" variant="secondary" onClick={() => void submit('manual')}>
            Try again
          </Button>
        </div>
      )}

      {initial.sections.length > 1 && (
        <nav className={s.sections} aria-label="Sections">
          <ul>
            {initial.sections.map((sec) => {
              const done = sec.itemIds.filter((id) => states[id]?.response).length;
              const current = sec.id === section?.id;
              return (
                <li key={sec.id}>
                  <button type="button" className={cx(s.sectionTab, current && s.sectionTabOn)} aria-current={current ? 'true' : undefined} onClick={() => goTo(order.indexOf(sec.itemIds[0]!))}>
                    {sec.title}
                    <span className={s.sectionCount}>
                      {done}/{sec.itemIds.length}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div id="question-top" tabIndex={-1} className={s.questionArea}>
        <p className={s.position} aria-live="polite">
          Question {index + 1} of {order.length}
          {section && initial.sections.length > 1 ? ` · ${section.title}` : ''}
          {marked && (
            <Badge tone="warning" icon="flag">
              Marked for review
            </Badge>
          )}
        </p>
        {group && (
          <p className={s.groupNote} data-testid="choice-group">
            <Icon name="info" size={16} /> Attempt any {group.attempt} of these {group.of} (option {group.index + 1} of {group.of}). If you answer more, the best {group.attempt === 1 ? 'one counts' : `${group.attempt} count`}.
          </p>
        )}
        {slots ? (
          <QuestionCard
            key={currentId}
            mode="test"
            question={item.question}
            slots={slots}
            number={item.number}
            lang={lang}
            draft={draft}
            onDraftChange={onDraftChange}
            actions={
              <>
                <Button variant={marked ? 'primary' : 'secondary'} size="sm" icon="flag" aria-pressed={marked} onClick={toggleMark} data-testid="mark-review">
                  {marked ? 'Marked for review' : 'Mark for review'}
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAnswer} disabled={!states[currentId]?.response}>
                  Clear answer
                </Button>
              </>
            }
          />
        ) : (
          <div aria-busy="true" aria-label="Loading question" className={s.loading}>
            <Skeleton lines={3} />
            <Skeleton variant="block" height={160} />
          </div>
        )}
      </div>


      {/* Sticky dock at the bottom (thumb reach; the marketing header owns the top edge). */}
      <div className={s.dock}>
        {offlineNow && (
          <div className={s.offline} role="status" data-testid="offline-banner">
            <Icon name="wifiOff" size={20} />
            <p>
              <strong>You are offline.</strong> Keep answering: answers are saved on this device
              {saveStatus.pending ? ` (${saveStatus.pending} waiting)` : ''} and sent when you reconnect. The timer keeps running.
            </p>
          </div>
        )}
        <nav className={s.bottomNav} aria-label="Question navigation">
          <IconButton icon="chevronLeft" label="Previous question" variant="secondary" onClick={() => goTo(index - 1)} disabled={index === 0} />
          <Timer deadline={deadline} offset={offset} onExpire={onExpire} />
          <Button variant="secondary" size="sm" icon="grid" onClick={() => setPaletteOpen(true)} data-testid="open-palette" aria-haspopup="dialog" aria-label={`${summary.answered}/${summary.total} answered: all questions`}>
            {summary.answered}/{summary.total}
          </Button>
          {index < order.length - 1 ? (
            <Button onClick={() => goTo(index + 1)} data-testid="next-question">
              Next <Icon name="chevronRight" size={18} />
            </Button>
          ) : (
            <Button onClick={() => setConfirmOpen(true)} data-testid="review-submit">
              Submit
            </Button>
          )}
        </nav>
      </div>

      <Dialog open={paletteOpen} onClose={() => setPaletteOpen(false)} title="All questions" description={`${summary.answered} answered · ${summary.marked} marked · ${summary.notVisited} not visited`} variant="sheet">
        <Palette initial={initial} order={order} states={states} currentId={currentId} onPick={(id) => goTo(order.indexOf(id))} />
        <div className={s.paletteFooter}>
          <Button
            block
            onClick={() => {
              setPaletteOpen(false);
              setConfirmOpen(true);
            }}
          >
            Submit test
          </Button>
        </div>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Submit your test?"
        dismissOnBackdrop={false}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Keep working
            </Button>
            <Button onClick={() => void submit('manual')} loading={submitting !== 'idle'} data-testid="confirm-submit">
              Submit now
            </Button>
          </>
        }
      >
        <dl className={s.confirmStats} data-testid="submit-summary">
          <div>
            <dt>Answered</dt>
            <dd>{summary.answered}</dd>
          </div>
          <div>
            <dt>Not answered</dt>
            <dd>{summary.notAnswered}</dd>
          </div>
          <div>
            <dt>Marked for review</dt>
            <dd>{summary.marked}</dd>
          </div>
        </dl>
        <p className={s.muted}>You cannot change your answers after you submit.</p>
        {saveStatus.pending > 0 && <p className={s.muted}>{saveStatus.pending} recent answers will be sent with your submission.</p>}
      </Dialog>

      {submitting === 'auto' && (
        <div className={s.overlay} role="alert" aria-live="assertive">
          <p>Time is up. Submitting your answers…</p>
        </div>
      )}
    </div>
  );
}

/* ── Palette ───────────────────────────────────────────────────────────────────────────────────── */

function Palette({ initial, order, states, currentId, onPick }: { initial: AttemptState; order: string[]; states: Record<string, ItemUiState>; currentId: string; onPick: (id: string) => void }) {
  const items = new Map(initial.items.map((it) => [it.itemId, it]));
  return (
    <div className={s.palette} data-testid="palette">
      <ul className={s.legend} aria-label="Key">
        <li>
          <span className={cx(s.cell, s['cell-answered'])} aria-hidden="true" /> Answered
        </li>
        <li>
          <span className={cx(s.cell, s['cell-marked'])} aria-hidden="true" /> Marked
        </li>
        <li>
          <span className={cx(s.cell, s['cell-visited'])} aria-hidden="true" /> Seen
        </li>
        <li>
          <span className={cx(s.cell, s['cell-not-visited'])} aria-hidden="true" /> Not visited
        </li>
      </ul>
      {initial.sections.map((sec) => (
        <section key={sec.id} aria-label={sec.title}>
          {initial.sections.length > 1 && <h3 className={s.paletteSection}>{sec.title}</h3>}
          <ol className={s.grid}>
            {sec.itemIds.map((id) => {
              const it = items.get(id) as AttemptItem;
              const st = paletteState(states[id]);
              const pos = order.indexOf(id) + 1;
              const group = choiceGroupOf(initial, id);
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={cx(s.cell, s[`cell-${st}`], id === currentId && s.cellCurrent)}
                    data-state={st}
                    aria-current={id === currentId ? 'true' : undefined}
                    aria-label={`Question ${pos}${group ? ` (choice ${group.index + 1} of ${group.of})` : ''}: ${PALETTE_LABELS[st]}`}
                    onClick={() => onPick(id)}
                  >
                    {it.number}
                    {group && group.index > 0 ? (
                      <span className={s.cellOr} aria-hidden="true">
                        or
                      </span>
                    ) : null}
                    {(st === 'marked' || st === 'answered-marked') && <Icon name="flag" size={12} className={s.cellFlag} />}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

/* ── Timer and save status ─────────────────────────────────────────────────────────────────────── */

function Timer({ deadline, offset, onExpire }: { deadline: string | null; offset: { current: number }; onExpire: () => void }) {
  const [left, setLeft] = useState<number | null>(null);
  const [announce, setAnnounce] = useState('');
  const fired = useRef(false);
  const announced = useRef(new Set<number>());
  const expire = useRef(onExpire);
  useEffect(() => {
    expire.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const tick = () => {
      const ms = remainingMs(deadline, offset.current);
      setLeft(ms);
      if (ms === null) return;
      for (const mark of ANNOUNCE_AT_MS) {
        if (ms <= mark && ms > mark - 60_000 && !announced.current.has(mark)) {
          announced.current.add(mark);
          setAnnounce(`${spokenTime(mark)} left`);
        }
      }
      if (ms <= 0 && !fired.current) {
        fired.current = true;
        expire.current();
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline, offset]);

  const low = left !== null && left <= 5 * 60_000;
  return (
    <div className={cx(s.timer, low && s.timerLow)} data-testid="timer">
      <Icon name="clock" size={18} />
      <span role="timer" aria-label={left === null ? 'No time limit' : `Time left: ${spokenTime(left)}`}>
        <span aria-hidden="true">{left === null ? '—' : formatClock(left)}</span>
      </span>
      <span className="p-visually-hidden" aria-live="polite">
        {announce}
      </span>
    </div>
  );
}

function SaveIndicator({ status, pending, offline }: { status: QueueStatus; pending: number; offline: boolean }) {
  const text = offline
    ? `Offline · ${pending} saved on device`
    : status === 'saving'
      ? 'Saving…'
      : status === 'error'
        ? 'Could not save · retrying'
        : pending > 0
          ? 'Saved on device'
          : 'All answers saved';
  return (
    <span className={cx(s.saveStatus, offline && s.saveOffline)} data-testid="save-status" data-status={offline ? 'offline' : status} data-pending={pending}>
      {text}
    </span>
  );
}

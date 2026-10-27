'use client';

/**
 * All-India live mock (ARCHITECTURE §3.1, §9; backend-api M3 handoff §9): phases
 *   upcoming → registration_open (Register) → live (Start, until lateStartUntil) → writing (only students
 *   who started can resume) → closed ("results soon") → results_published (ranks).
 * The leaderboard needs consent (D-014): on 403 consent_required (or no approval yet) a friendly
 * consent-needed state. Names are first name + last initial, "Student" when that student's consent is
 * not granted; ranks are labelled beta. After the event the same paper can be taken unranked.
 */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { isApiError, type LiveEvent, type LiveLeaderboard } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, Card, CardTitle, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { useSession } from '../auth/SessionProvider';
import { AiNotice } from '../ai/AiDialogs';
import { api } from '../lib/api-browser';
import { attemptPath, LIVE_PHASE_LABELS, marksText, resultPath, scoreText, testProblemMessage } from './player-model';
import { countdownText, durationText, istDateTime } from './timer';
import s from './tests.module.css';

const POLL_MS = 30_000;

export function LiveEventClient({ eventId }: { eventId: string }) {
  const { state, openLogin } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [event, setEvent] = useState<LiveEvent | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await api.get('/v1/live-events');
      setEvent(res.events.find((e) => e.id === eventId) ?? null);
      setError(null);
    } catch (err) {
      setError(testProblemMessage(err));
    }
  }, [eventId]);

  useEffect(() => {
    if (state.status === 'loading') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- members see their registration
    void load();
    const id = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(id);
  }, [load, state.status]);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (error) {
    return (
      <EmptyState title="We could not load this live mock" headingLevel="h1" icon="alert" action={<Button variant="secondary" onClick={() => void load()}>Try again</Button>}>
        {error}
      </EmptyState>
    );
  }
  if (event === undefined) return <Skeleton lines={4} />;
  if (event === null) {
    return (
      <EmptyState title="Live mock not found" headingLevel="h1" icon="alert" action={<Link href="/tests">See all tests</Link>}>
        It may have been cancelled or moved.
      </EmptyState>
    );
  }

  const member = state.status === 'member';
  const me = event.me;
  const needLogin = () => openLogin({ reason: 'Log in to register for the All-India mock. It is free.' });

  const register = async () => {
    if (!member) return needLogin();
    setBusy(true);
    try {
      await api.post('/v1/live-events/{id}/register', { params: { id: event.id } });
      toast.show({ title: 'You are registered', description: `Starts ${istDateTime(event.startsAt)}.`, tone: 'success' });
      await load();
    } catch (err) {
      toast.show({ title: testProblemMessage(err), tone: 'danger' });
    } finally {
      setBusy(false);
    }
  };

  const start = async () => {
    if (!member) return needLogin();
    setBusy(true);
    try {
      const res = await api.post('/v1/tests/{id}/attempts', { params: { id: event.testId }, body: { start: true } });
      router.push(attemptPath(res.attempt.id));
    } catch (err) {
      setBusy(false);
      if (isApiError(err, 'attempt_closed') && me?.attemptId) router.push(resultPath(me.attemptId));
      else toast.show({ title: testProblemMessage(err), tone: 'danger' });
    }
  };

  const target =
    event.phase === 'upcoming' ? event.registrationOpensAt : event.phase === 'registration_open' ? event.startsAt : event.phase === 'live' ? event.lateStartUntil : event.phase === 'writing' ? event.endsAt : null;
  const left = now !== null && target ? Date.parse(target) - now : null;
  const submitted = me?.attemptStatus === 'submitted' || me?.attemptStatus === 'auto_submitted';

  return (
    <div className={s.stack} data-testid="live-event" data-phase={event.phase}>
      <header className={s.scoreHero}>
        <p className={s.row}>
          <Badge tone={event.phase === 'live' ? 'danger' : 'accent'}>{LIVE_PHASE_LABELS[event.phase] ?? event.phase}</Badge>
          {event.ranksBeta && <Badge tone="warning">Ranks in beta</Badge>}
        </p>
        <h1 className={s.startTitle}>{event.title}</h1>
        <p className={s.muted}>
          {event.subject.name} · {marksText(event.totalMarks)} · {durationText(event.durationMin)}
        </p>
        <p className={s.muted}>
          Starts {istDateTime(event.startsAt)}. You can start until {istDateTime(event.lateStartUntil)}.
        </p>
        {left !== null && left > 0 && (
          <p className={s.countdown} role="timer" aria-live="off" data-testid="countdown">
            {event.phase === 'upcoming' ? 'Registration opens in ' : event.phase === 'registration_open' ? 'Starts in ' : event.phase === 'live' ? 'Start within ' : 'Ends in '}
            {countdownText(left)}
          </p>
        )}
      </header>

      <Card as="section" aria-labelledby="live-action">
        <CardTitle as="h2" id="live-action">
          {event.phase === 'results_published' ? 'Results' : 'Take part'}
        </CardTitle>
        {event.phase === 'cancelled' && <p>This live mock was cancelled.</p>}
        {event.phase === 'upcoming' && <p>Registration opens {istDateTime(event.registrationOpensAt)}.</p>}
        {event.phase === 'registration_open' &&
          (me?.registered ? (
            <p data-testid="registered">
              <Icon name="check" size={18} /> You are registered. Come back when it starts.
            </p>
          ) : (
            <Button onClick={() => void register()} loading={busy} data-testid="live-register">
              {member ? 'Register (free)' : 'Log in to register'}
            </Button>
          ))}
        {event.phase === 'live' &&
          (me?.attemptId && !submitted ? (
            <Link href={attemptPath(me.attemptId)}>Continue your paper</Link>
          ) : submitted && me?.attemptId ? (
            <Link href={resultPath(me.attemptId)}>See your result</Link>
          ) : (
            <Button onClick={() => void start()} loading={busy} data-testid="live-start">
              {member ? 'Start now' : 'Log in to start'}
            </Button>
          ))}
        {event.phase === 'writing' &&
          (me?.attemptId && !submitted ? (
            <Link href={attemptPath(me.attemptId)}>Continue your paper</Link>
          ) : (
            <p>The paper is in progress. New starts are closed. You can take this paper unranked after the event.</p>
          ))}
        {event.phase === 'closed' && <p>The paper has ended. Ranks are being worked out: results soon.</p>}
        {event.phase === 'results_published' && (
          <>
            {me?.attemptId && <Link href={resultPath(me.attemptId)}>Your result</Link>}
            <p className={s.muted}>You can still take this paper for practice. It will not be ranked.</p>
            <Button variant="secondary" onClick={() => void start()} loading={busy}>
              Take it unranked
            </Button>
          </>
        )}
      </Card>

      {(event.phase === 'live' || event.phase === 'writing' || event.phase === 'closed' || event.phase === 'results_published') && <Leaderboard eventId={event.id} />}
    </div>
  );
}

export function Leaderboard({ eventId, compact }: { eventId: string; compact?: boolean }) {
  const { state } = useSession();
  const [board, setBoard] = useState<LiveLeaderboard | null>(null);
  const [problem, setProblem] = useState<'consent' | 'error' | null>(null);
  const member = state.status === 'member';
  const consent = member && state.consent === 'granted';

  useEffect(() => {
    if (!member || !consent) return;
    let alive = true;
    api
      .get('/v1/live-events/{id}/leaderboard', { params: { id: eventId }, query: { limit: compact ? 10 : 50 } })
      .then((b) => alive && setBoard(b))
      .catch((err) => alive && setProblem(isApiError(err, 'consent_required') ? 'consent' : 'error'));
    return () => {
      alive = false;
    };
  }, [member, consent, eventId, compact]);

  return (
    <Card as="section" aria-labelledby={`lb-${eventId}`} data-testid="leaderboard">
      <CardTitle as="h2" id={`lb-${eventId}`}>
        Leaderboard <Badge tone="warning">Beta</Badge> {board?.status === 'provisional' && <Badge>Provisional</Badge>}
      </CardTitle>
      {!member ? (
        <p className={s.muted}>Log in to see the leaderboard.</p>
      ) : !consent || problem === 'consent' ? (
        <AiNotice block={{ kind: 'consent' }} feature="The leaderboard" />
      ) : problem === 'error' ? (
        <p className={s.muted}>The leaderboard is not available right now.</p>
      ) : !board ? (
        <Skeleton lines={3} />
      ) : board.status === 'not_started' || board.entries.length === 0 ? (
        <p className={s.muted}>Ranks appear once students submit.</p>
      ) : (
        <>
          {board.me && (
            <p data-testid="my-rank">
              Your rank: <strong>{board.me.rank}</strong> of {board.total} · {scoreText(board.me.score)} / {scoreText(board.maxScore)}
              {board.me.percentile !== null ? ` · percentile ${Math.round(board.me.percentile)}` : ''}
            </p>
          )}
          <div className={s.tableWrap}>
            <table className={s.board}>
              <caption className="p-visually-hidden">Top students</caption>
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Student</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {board.entries.map((e) => (
                  <tr key={`${e.rank}-${e.name ?? ''}-${e.isMe}`} data-me={e.isMe ? 'true' : undefined}>
                    <td>{e.rank}</td>
                    <td>
                      {e.name ?? 'Student'}
                      {e.isMe ? ' (you)' : ''}
                    </td>
                    <td>{scoreText(e.score)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.muted}>Ranks use auto-graded marks only; ties go to the faster paper. Names show first name and last initial.</p>
        </>
      )}
    </Card>
  );
}

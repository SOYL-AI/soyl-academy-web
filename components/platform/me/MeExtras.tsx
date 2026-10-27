'use client';

/**
 * /me additions for M3/M4 (ARCHITECTURE §3.1: subscription, credits history):
 * - Your tests: GET /v1/me/attempts (cursor paging) → resume or see the result;
 * - Subscription: GET /v1/me/subscription, cancel renewal (POST /v1/billing/cancel: cancel at period end);
 * - AI credits: today's balance and reset (GET /v1/credits) and the history (GET /v1/credits/ledger).
 */
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { CreditLedger, Credits, MyAttempt, MySubscription } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Badge, Card, CardTitle, Skeleton } from '@/components/platform/ui/kit/Display';
import { formatCountdown } from '@/components/platform/ui/kit/CreditChip';
import { useCredits } from '../ai/CreditsProvider';
import { creditsText } from '../ai/problems';
import { api } from '../lib/api-browser';
import { problemMessage } from '../lib/problems';
import { attemptPath, resultPath, scoreText } from '../tests/player-model';
import s from './me.module.css';

function shortDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

export function MyAttemptsCard() {
  const [list, setList] = useState<MyAttempt[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (after: string | null) => {
    setBusy(true);
    try {
      const res = await api.get('/v1/me/attempts', { query: { limit: 10, ...(after ? { cursor: after } : {}) } });
      setList((prev) => (after ? [...(prev ?? []), ...res.attempts] : res.attempts));
      setCursor(res.nextCursor);
    } catch {
      setList((prev) => prev ?? []);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first page on mount
    void load(null);
  }, [load]);

  return (
    <Card as="section" aria-labelledby="attempts-title" id="attempts" data-testid="my-attempts">
      <CardTitle as="h2" id="attempts-title">
        Your tests
      </CardTitle>
      {list === null ? (
        <Skeleton lines={3} />
      ) : list.length === 0 ? (
        <p className={s.muted}>
          No tests yet. <Link href="/tests">Find a test</Link>
        </p>
      ) : (
        <ul className={s.list}>
          {list.map((a) => {
            const done = a.status === 'submitted' || a.status === 'auto_submitted';
            return (
              <li key={a.id} className={s.listRow}>
                <Link href={done ? resultPath(a.id) : attemptPath(a.id)}>{a.title}</Link>
                <span className={s.muted}>
                  {done ? `${scoreText(a.score)} / ${scoreText(a.maxScore)} · ${shortDate(a.submittedAt)}` : a.status === 'created' ? 'Not started' : 'In progress'}
                  {a.liveEventId ? ' · Live mock' : ''}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {cursor && (
        <Button variant="ghost" size="sm" loading={busy} onClick={() => void load(cursor)}>
          Show more
        </Button>
      )}
    </Card>
  );
}

export function SubscriptionCard() {
  const [sub, setSub] = useState<MySubscription | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api
      .get('/v1/me/subscription')
      .then((m) => alive && setSub(m))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  const cancel = async () => {
    setBusy(true);
    setError(null);
    try {
      setSub(await api.post('/v1/billing/cancel', { body: {} }));
      setConfirm(false);
    } catch (err) {
      setError(problemMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const recurring = sub?.subscription;
  const canCancel = !!recurring && !recurring.cancelAtPeriodEnd && !['cancelled', 'completed', 'expired', 'halted'].includes(recurring.status);

  return (
    <Card as="section" aria-labelledby="sub-title" id="subscription" data-testid="subscription">
      <CardTitle as="h2" id="sub-title">
        Plan
      </CardTitle>
      {!sub ? (
        <Skeleton lines={2} />
      ) : (
        <>
          <p>
            <strong>{sub.planName}</strong> · {creditsText(sub.creditsPerDay)} a day
            {sub.validUntil && sub.plan !== 'free' ? ` · until ${shortDate(sub.validUntil)}` : ''}
          </p>
          {recurring && (
            <p className={s.muted}>
              {recurring.interval === 'yearly' ? 'Yearly' : 'Monthly'} plan ·{' '}
              {recurring.cancelAtPeriodEnd ? <Badge tone="warning">Ends {shortDate(recurring.currentPeriodEnd)}, will not renew</Badge> : recurring.currentPeriodEnd ? `renews ${shortDate(recurring.currentPeriodEnd)}` : recurring.status}
            </p>
          )}
          <div className={s.actions}>
            <Link href="/plans">{sub.plan === 'free' ? 'See plans' : 'Change plan'}</Link>
            {canCancel && (
              <Button variant="secondary" size="sm" onClick={() => setConfirm(true)} data-testid="cancel-plan">
                Cancel renewal
              </Button>
            )}
          </div>
          {error && (
            <p className={s.formError} role="alert">
              {error}
            </p>
          )}
        </>
      )}
      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Cancel your plan?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Keep my plan
            </Button>
            <Button variant="danger" loading={busy} onClick={() => void cancel()} data-testid="confirm-cancel-plan">
              Cancel renewal
            </Button>
          </>
        }
      >
        <p>You keep your plan until the end of the period you paid for. After that you go back to the free daily credits.</p>
      </Dialog>
    </Card>
  );
}

const KIND_TEXT: Record<CreditLedger['entries'][number]['kind'], string> = { grant: 'Daily credits', reserve: 'Used', charge: 'Settled', refund: 'Refunded', expire: 'Expired' };

export function CreditsCard() {
  const { aiAllowed } = useCredits();
  const [credits, setCredits] = useState<Credits | null>(null);
  const [ledger, setLedger] = useState<CreditLedger['entries'] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);

  const load = useCallback(async (after: string | null) => {
    try {
      const res = await api.get('/v1/credits/ledger', { query: { limit: 20, ...(after ? { cursor: after } : {}) } });
      setLedger((prev) => (after ? [...(prev ?? []), ...res.entries] : res.entries));
      setCursor(res.nextCursor);
    } catch {
      setLedger((prev) => prev ?? []);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    api
      .get('/v1/credits')
      .then((c) => alive && setCredits(c))
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- history on mount
    void load(null);
    return () => {
      alive = false;
    };
  }, [load]);

  return (
    <Card as="section" aria-labelledby="credits-title" id="credits" data-testid="credits">
      <CardTitle as="h2" id="credits-title">
        AI credits
      </CardTitle>
      {credits ? (
        <p>
          <strong>{creditsText(credits.balance)}</strong> left today of {credits.dailyCredits} ({credits.planName}). Resets in {formatCountdown(credits.resetInSeconds * 1000)} (00:00 IST).
        </p>
      ) : (
        <Skeleton lines={1} />
      )}
      {!aiAllowed && <p className={s.muted}>AI features switch on once a parent approves your account.</p>}
      <details>
        <summary>Credits history</summary>
        {ledger === null ? (
          <Skeleton lines={3} />
        ) : ledger.length === 0 ? (
          <p className={s.muted}>No AI use yet.</p>
        ) : (
          <ul className={s.list} data-testid="ledger">
            {ledger.map((e) => (
              <li key={e.id} className={s.listRow}>
                <span>
                  {KIND_TEXT[e.kind]}: {e.label}
                </span>
                <span className={s.muted}>
                  {e.kind === 'reserve' ? '−' : e.kind === 'charge' && e.amount === 0 ? '' : '+'}
                  {e.kind === 'charge' && e.amount === 0 ? '' : Math.abs(e.amount)} · {new Date(e.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                </span>
              </li>
            ))}
          </ul>
        )}
        {cursor && (
          <Button variant="ghost" size="sm" onClick={() => void load(cursor)}>
            Show more
          </Button>
        )}
      </details>
    </Card>
  );
}

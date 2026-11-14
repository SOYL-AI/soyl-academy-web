'use client';

/**
 * The two pages behind links in reminder emails (D-055), no sign-in needed:
 * - /me/email/unsubscribe#t=…     stop reminder emails (a student's own, or a parent's)
 * - /me/email/parent-confirm#t=…  a parent confirms the address a student added
 * The token comes from the URL fragment: it is read once, kept in memory and removed from the address bar, so it
 * stays out of history, server logs and Referer headers. Nothing changes until the person presses the button:
 * email link scanners that open every link cannot unsubscribe or confirm anyone (a GET never changes state).
 */
import { useEffect, useState } from 'react';
import { Button } from '@/components/platform/ui/kit/Button';
import { Card, CardTitle } from '@/components/platform/ui/kit/Display';
import { REMINDERS } from '@/platform/shared/config/notifications';
import { api } from '../lib/api-browser';
import { emailProblemMessage } from './EmailPreferences';
import s from './EmailPreferences.module.css';

/** `#t=<token>` → token, shape-checked (the API verifies the signature). Same shape as notifications/tokens.ts. */
export function emailTokenFromHash(hash: string): string | null {
  const t = new URLSearchParams(hash.replace(/^#/, '')).get('t');
  return t && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[spc]\d{1,9}\.[A-Za-z0-9_-]{43}$/.test(t) ? t : null;
}

type Phase<T> = { kind: 'loading' } | { kind: 'missing' } | { kind: 'ready'; token: string } | { kind: 'done'; result: T };

function useFragmentToken<T>(): [Phase<T>, (p: Phase<T>) => void] {
  const [phase, setPhase] = useState<Phase<T>>({ kind: 'loading' });
  useEffect(() => {
    const token = emailTokenFromHash(window.location.hash);
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the fragment once on the client
    setPhase(token ? { kind: 'ready', token } : { kind: 'missing' });
  }, []);
  return [phase, setPhase];
}

function Missing() {
  return (
    <p className={s.error} role="alert">
      This link is incomplete. Open it straight from the email, or copy the whole link into the address bar.
    </p>
  );
}

export function EmailUnsubscribeClient() {
  const [phase, setPhase] = useFragmentToken<{ kind: 'student' | 'parent'; alreadyOff: boolean }>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm(token: string) {
    setBusy(true);
    setError(null);
    try {
      setPhase({ kind: 'done', result: await api.post('/v1/email/unsubscribe', { body: { token } }) });
    } catch (err) {
      setError(emailProblemMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={s.page}>
      <Card as="section" aria-labelledby="unsubscribe-title" data-testid="email-unsubscribe" data-phase={phase.kind}>
        <CardTitle as="h2" id="unsubscribe-title">
          Stop reminder emails
        </CardTitle>
        {phase.kind === 'loading' && <p className={s.muted}>Loading…</p>}
        {phase.kind === 'missing' && <Missing />}
        {phase.kind === 'ready' && (
          <div className={s.form}>
            <p className={s.muted}>Press the button to stop SOYL Academy reminder emails to this address. Nothing else about the account changes.</p>
            {error && (
              <p className={s.error} role="alert">
                {error}
              </p>
            )}
            <div className={s.actions}>
              <Button loading={busy} onClick={() => void confirm(phase.token)} data-testid="email-unsubscribe-confirm">
                Unsubscribe
              </Button>
            </div>
          </div>
        )}
        {phase.kind === 'done' && (
          <p className={s.ok} role="status" data-testid="email-unsubscribe-done">
            {phase.result.alreadyOff ? 'You were already unsubscribed. ' : 'Done: no more reminder emails. '}
            {phase.result.kind === 'student'
              ? 'You can turn them back on any time under Email reminders on your profile page.'
              : 'We have removed your address. You will only hear from us again if the student adds it again and you confirm.'}
          </p>
        )}
      </Card>
      {phase.kind === 'done' && phase.result.kind === 'student' && (
        <a className={s.link} href="/me#email-reminders">
          Go to my email settings
        </a>
      )}
    </div>
  );
}

export function ParentConfirmClient() {
  const [phase, setPhase] = useFragmentToken<{ alreadyConfirmed: boolean }>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm(token: string) {
    setBusy(true);
    setError(null);
    try {
      setPhase({ kind: 'done', result: await api.post('/v1/email/parent-confirm', { body: { token } }) });
    } catch (err) {
      setError(emailProblemMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={s.page}>
      <Card as="section" aria-labelledby="parent-confirm-title" data-testid="parent-confirm" data-phase={phase.kind}>
        <CardTitle as="h2" id="parent-confirm-title">
          Confirm reminder emails
        </CardTitle>
        {phase.kind === 'loading' && <p className={s.muted}>Loading…</p>}
        {phase.kind === 'missing' && <Missing />}
        {phase.kind === 'ready' && (
          <div className={s.form}>
            <p className={s.muted}>
              A student added this address on their SOYL Academy profile. If you confirm, you may get a short note when they have not opened SOYL Academy for a few days: at
              most one every {REMINDERS.parentMinGapDays} days. It is not a progress report, and every email has a one-click unsubscribe.
            </p>
            <p className={s.muted}>If you do not know this student, close this page: nothing will be sent to you.</p>
            {error && (
              <p className={s.error} role="alert">
                {error}
              </p>
            )}
            <div className={s.actions}>
              <Button loading={busy} onClick={() => void confirm(phase.token)} data-testid="parent-confirm-button">
                Confirm
              </Button>
            </div>
          </div>
        )}
        {phase.kind === 'done' && (
          <p className={s.ok} role="status" data-testid="parent-confirm-done">
            {phase.result.alreadyConfirmed ? 'This address was already confirmed. ' : 'Thank you, your address is confirmed. '}
            You can unsubscribe from any reminder with one click.
          </p>
        )}
      </Card>
    </div>
  );
}

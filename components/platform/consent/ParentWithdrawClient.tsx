'use client';

/**
 * The parent's withdraw/decline page (D-039, ADR-022). The token comes from the URL fragment (#t=…): it is
 * read once, kept in memory and removed from the address bar, so it stays out of history, logs and
 * Referer headers. Nothing happens until the parent presses the button; the API call can only switch
 * features off. The page shows nothing about the student.
 */
import { useEffect, useState } from 'react';
import { Button } from '@/components/platform/ui/kit/Button';
import { Card, CardTitle } from '@/components/platform/ui/kit/Display';
import { api } from '../lib/api-browser';
import { problemMessage } from '../lib/problems';
import { UNLOCKS } from './ConsentFlow';
import c from './consent.module.css';

/** `#t=<token>` → token (shape-checked; the API verifies the signature). */
export function tokenFromHash(hash: string): string | null {
  const t = new URLSearchParams(hash.replace(/^#/, '')).get('t');
  return t && /^[0-9a-f-]{36}\.\d{1,9}\.[0-9a-f]{43}$/.test(t) ? t : null;
}

type Phase = { kind: 'loading' } | { kind: 'missing' } | { kind: 'ready'; token: string } | { kind: 'done'; already: boolean };

export function ParentWithdrawClient() {
  const [phase, setPhase] = useState<Phase>({ kind: 'loading' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = tokenFromHash(window.location.hash);
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the fragment once on the client
    setPhase(token ? { kind: 'ready', token } : { kind: 'missing' });
  }, []);

  async function withdraw(token: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await api.post('/v1/consent/parent/withdraw', { body: { token } });
      setPhase({ kind: 'done', already: res.alreadyWithdrawn });
    } catch (err) {
      setError(problemMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={c.page}>
      <Card as="section" aria-labelledby="parent-consent-title" data-testid="parent-withdraw" data-phase={phase.kind}>
        <CardTitle as="h2" id="parent-consent-title">
          Withdraw or decline approval
        </CardTitle>
        {phase.kind === 'loading' && <p className={c.muted}>Loading…</p>}
        {phase.kind === 'missing' && (
          <p className={c.error} role="alert">
            This link is incomplete. Open it straight from the email we sent you, or copy the whole link into the address bar.
          </p>
        )}
        {phase.kind === 'ready' && (
          <div className={c.form}>
            <p className={c.muted}>Withdrawing switches these off at once for your child’s account: {UNLOCKS.join(', ')}. Their AI conversations and uploaded photos are deleted.</p>
            <p className={c.muted}>If you have not approved yet, this declines the request and the code in the email stops working. Lessons, practice, tests and progress are not affected.</p>
            {error && (
              <p className={c.error} role="alert">
                {error}
              </p>
            )}
            <div className={c.actions}>
              <Button variant="danger" loading={busy} onClick={() => void withdraw(phase.token)} data-testid="parent-withdraw-confirm">
                Withdraw approval
              </Button>
            </div>
          </div>
        )}
        {phase.kind === 'done' && (
          <p className={c.ok} role="status" data-testid="parent-withdraw-done">
            {phase.already ? 'Approval was already withdrawn. Nothing else to do.' : 'Done. Approval is withdrawn and those features are off.'} If your child asks again, you will get a new email,
            and nothing switches on unless you give them the new code.
          </p>
        )}
      </Card>
    </div>
  );
}

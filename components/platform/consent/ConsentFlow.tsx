'use client';

/**
 * The consent flow (D-039, ADR-022) for `/me/consent` and the approval card on `/me`.
 *
 * Built-in provider (CONSENT_PROVIDER=builtin):
 *   1. age band: "18 or older" (with an explicit agreement → on at once) or "Under 18";
 *   2. under 18: the parent's email (must differ from the student's own) → the API emails a code;
 *   3. the student enters the code the parent gives them → approved;
 *   then status (who approved, when) and "Withdraw approval".
 * Other providers keep the earlier behaviour: `external` = start + redirect (ConsentNotice), `none` = not yet.
 *
 * Lessons, practice and tests never need any of this (D-014); the copy says so on every step.
 */
import Link from 'next/link';
import { useCallback, useEffect, useId, useState, type FormEvent } from 'react';
import { isApiError, type ConsentView } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Badge, Card, CardTitle, Skeleton } from '@/components/platform/ui/kit/Display';
import { OTPInput, TextInput } from '@/components/platform/ui/kit/Field';
import { useSession } from '../auth/SessionProvider';
import { ConsentNotice } from '../auth/ConsentNotice';
import { api } from '../lib/api-browser';
import { problemMessage } from '../lib/problems';
import c from './consent.module.css';

export type { ConsentView };

/** What switches on with approval (mirrors the parent email, platform/api/src/consent/email.ts). */
export const UNLOCKS = ['AI tutor and AI marking', 'Photo doubts', 'Leaderboards, leagues and SOYL Coins rewards'] as const;

const dateText = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }) : '';

const BADGE: Record<ConsentView['status'], { text: string; tone: 'success' | 'warning' | 'neutral' }> = {
  granted: { text: 'On', tone: 'success' },
  pending: { text: 'Waiting for a parent', tone: 'warning' },
  required: { text: 'Off', tone: 'neutral' },
  revoked: { text: 'Withdrawn', tone: 'neutral' },
};

export interface ConsentFlowProps {
  /** Safe same-site path to offer after approval (already passed through safeReturnTo). */
  next?: string | null;
  /** Called after any change (so /me can refresh its own copy). */
  onChanged?: (view: ConsentView) => void;
}

export function ConsentFlow({ next, onChanged }: ConsentFlowProps) {
  const { refresh } = useSession();
  const [view, setView] = useState<ConsentView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setView(await api.get('/v1/me/consent'));
      setLoadError(null);
    } catch (err) {
      setLoadError(problemMessage(err));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch GET /v1/me/consent once; state is set after the response
    void load();
  }, [load]);

  const changed = useCallback(
    async (v: ConsentView) => {
      setView(v);
      onChanged?.(v);
      await refresh(); // the session's consent state drives /ask, /leaderboard and /plans
    },
    [onChanged, refresh],
  );

  const titleId = useId();
  const Title = (
    <CardTitle as="h2" id={titleId}>
      Extra features <Badge tone={view ? BADGE[view.status].tone : 'neutral'}>{view ? BADGE[view.status].text : '…'}</Badge>
    </CardTitle>
  );

  if (!view) {
    return (
      <Card as="section" aria-labelledby={titleId} data-testid="consent-flow" aria-busy={!loadError}>
        {Title}
        {loadError ? (
          <>
            <p className={c.error} role="alert">
              {loadError}
            </p>
            <div className={c.actions}>
              <Button variant="secondary" onClick={() => void load()}>
                Try again
              </Button>
            </div>
          </>
        ) : (
          <Skeleton variant="text" lines={2} />
        )}
      </Card>
    );
  }

  if (view.flow === 'external') {
    return <ConsentNotice consent={view.status} onChanged={async () => void (await load(), await refresh())} />;
  }

  return (
    <Card as="section" aria-labelledby={titleId} data-testid="consent-flow" data-consent={view.status} data-age-band={view.ageBand ?? 'none'}>
      {Title}
      <p className={c.muted}>Lessons, practice and tests are always free and open. Approval only switches on: {UNLOCKS.join(', ')}.</p>
      {view.flow === 'none' ? (
        <p className={c.muted} data-testid="consent-none">
          Approval is not available yet. We will let you know when it is.
        </p>
      ) : view.status === 'granted' ? (
        <Granted view={view} next={next} onChanged={changed} />
      ) : view.ageBand === null ? (
        <AgeStep onChanged={changed} />
      ) : view.ageBand === 'adult' ? (
        <AdultOff view={view} onChanged={changed} />
      ) : view.status === 'pending' ? (
        <CodeStep view={view} onChanged={changed} />
      ) : (
        <ParentStep view={view} onChanged={changed} />
      )}
    </Card>
  );
}

type StepProps = { onChanged: (v: ConsentView) => Promise<void> };

/** Field messages from a 400 validation problem (the API's own words, e.g. "not your own email"), else the friendly text. */
function messageOf(err: unknown): string {
  if (isApiError(err, 'validation_failed')) {
    const m = err.problem?.errors?.[0]?.message;
    if (m) return m;
  }
  return problemMessage(err);
}

function useAction() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(false);
    }
  };
  return { busy, error, setError, run };
}

function ErrorLine({ error }: { error: string | null }) {
  return error ? (
    <p className={c.error} role="alert" data-testid="consent-error">
      {error}
    </p>
  ) : null;
}

function PrivacyLink() {
  return (
    <a href="/privacy" className={c.inlineLink} target="_blank" rel="noopener">
      privacy notice
    </a>
  );
}

function AgeStep({ onChanged }: StepProps) {
  const [band, setBand] = useState<'adult' | 'minor' | null>(null);
  const [agree, setAgree] = useState(false);
  const { busy, error, setError, run } = useAction();
  const name = useId();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!band) return setError('Choose your age group.');
    if (band === 'adult' && !agree) return setError('Tick the box to confirm.');
    void run(async () => onChanged(await api.post('/v1/me/consent/age-band', { body: band === 'adult' ? { ageBand: 'adult', agree: true } : { ageBand: 'minor' } })));
  };

  return (
    <form className={c.form} onSubmit={submit} noValidate data-testid="consent-age">
      <fieldset className={c.choices}>
        <legend className={c.legend}>How old are you?</legend>
        <label className={c.choice}>
          <input type="radio" name={name} value="minor" checked={band === 'minor'} onChange={() => setBand('minor')} />
          <span className={c.choiceText}>
            <strong>Under 18</strong>
            <span>A parent or guardian approves by email. It takes a minute.</span>
          </span>
        </label>
        <label className={c.choice}>
          <input type="radio" name={name} value="adult" checked={band === 'adult'} onChange={() => setBand('adult')} />
          <span className={c.choiceText}>
            <strong>18 or older</strong>
            <span>You approve for yourself.</span>
          </span>
        </label>
      </fieldset>
      {band === 'adult' && (
        <label className={c.check}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>
            I am 18 or older and I agree to the <PrivacyLink />: my AI questions and photos are kept for 30 days, and leaderboards show an
            auto-generated name, never my real name.
          </span>
        </label>
      )}
      <p className={c.small}>We only ask for an age group, never your date of birth.</p>
      <ErrorLine error={error} />
      <div className={c.actions}>
        <Button type="submit" loading={busy}>
          Continue
        </Button>
      </div>
    </form>
  );
}

function ParentStep({ view, onChanged }: StepProps & { view: ConsentView }) {
  const [email, setEmail] = useState('');
  const { busy, error, setError, run } = useAction();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setError('Enter your parent’s or guardian’s email address.');
    void run(async () => onChanged(await api.post('/v1/me/consent/parent', { body: { parentEmail: v } })));
  };

  return (
    <form className={c.form} onSubmit={submit} noValidate data-testid="consent-parent">
      {view.status === 'revoked' && (
        <p className={c.muted} role="status">
          {view.revokedBy === 'parent' ? 'A parent withdrew or declined approval' : 'You withdrew approval'}
          {view.revokedAt ? ` on ${dateText(view.revokedAt)}` : ''}. You can ask again.
        </p>
      )}
      <TextInput
        label="Parent’s or guardian’s email"
        hint="We email them a 6-digit code and a short note on what this switches on. We do not keep their address."
        type="email"
        inputMode="email"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        name="parentEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error ?? undefined}
        required
      />
      <div className={c.actions}>
        <Button type="submit" loading={busy}>
          Send code to my parent
        </Button>
      </div>
    </form>
  );
}

function CodeStep({ view, onChanged }: StepProps & { view: ConsentView }) {
  const [code, setCode] = useState('');
  const [changing, setChanging] = useState(false);
  const { busy, error, run } = useAction();
  const verify = (value: string) => void run(async () => onChanged(await api.post('/v1/me/consent/verify', { body: { code: value } })));

  if (changing) return <ParentStep view={{ ...view, status: 'required' }} onChanged={onChanged} />;

  return (
    <div className={c.form} data-testid="consent-code">
      <p className={c.hint} role="status">
        We emailed <strong>{view.parentEmailHint}</strong>. Ask them for the 6-digit code{view.codeExpiresAt ? ` (it works until ${dateText(view.codeExpiresAt)})` : ''}.
      </p>
      <form
        className={c.form}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (code.length === 6) verify(code);
        }}
      >
        <OTPInput label="Approval code from your parent" value={code} onChange={setCode} onComplete={verify} error={error ?? undefined} name="approvalCode" />
        <div className={c.actions}>
          <Button type="submit" loading={busy} disabled={code.length !== 6}>
            Turn on
          </Button>
        </div>
      </form>
      <div className={c.actions}>
        <Button variant="ghost" onClick={() => setChanging(true)}>
          Send again or use another email
        </Button>
        <WithdrawButton label="Cancel request" onChanged={onChanged} />
      </div>
    </div>
  );
}

function AdultOff({ view, onChanged }: StepProps & { view: ConsentView }) {
  const [agree, setAgree] = useState(false);
  const { busy, error, setError, run } = useAction();
  return (
    <form
      className={c.form}
      noValidate
      data-testid="consent-adult-off"
      onSubmit={(e) => {
        e.preventDefault();
        if (!agree) return setError('Tick the box to confirm.');
        void run(async () => onChanged(await api.post('/v1/me/consent/age-band', { body: { ageBand: 'adult', agree: true } })));
      }}
    >
      <p className={c.muted}>You switched these features off{view.revokedAt ? ` on ${dateText(view.revokedAt)}` : ''}.</p>
      <label className={c.check}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>
          I am 18 or older and I agree to the <PrivacyLink />.
        </span>
      </label>
      <ErrorLine error={error} />
      <div className={c.actions}>
        <Button type="submit" loading={busy}>
          Turn on again
        </Button>
      </div>
    </form>
  );
}

function Granted({ view, next, onChanged }: StepProps & { view: ConsentView; next?: string | null }) {
  const who = view.method === 'self_declared' ? 'You confirmed you are 18 or older' : `Approved by a parent${view.parentEmailHint ? ` (${view.parentEmailHint})` : ''}`;
  return (
    <div className={c.form} data-testid="consent-granted">
      <p className={c.ok} role="status">
        {who}
        {view.grantedAt ? ` on ${dateText(view.grantedAt)}` : ''}. AI help, photo doubts, leaderboards and rewards are on.
      </p>
      <div className={c.actions}>
        {next && (
          <Link href={next} className={c.link} data-testid="consent-continue">
            Continue
          </Link>
        )}
        <WithdrawButton label="Withdraw approval" onChanged={onChanged} confirm />
      </div>
    </div>
  );
}

function WithdrawButton({ label, onChanged, confirm }: StepProps & { label: string; confirm?: boolean }) {
  const [open, setOpen] = useState(false);
  const { busy, error, run } = useAction();
  const go = () =>
    void run(async () => {
      await onChanged(await api.post('/v1/me/consent/withdraw'));
      setOpen(false);
    });
  return (
    <>
      <Button variant="secondary" loading={busy && !open} onClick={() => (confirm ? setOpen(true) : go())} data-testid="consent-withdraw">
        {label}
      </Button>
      {!confirm && <ErrorLine error={error} />}
      {confirm && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Withdraw approval?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Keep it on
              </Button>
              <Button variant="danger" loading={busy} onClick={go} data-testid="consent-withdraw-confirm">
                Withdraw
              </Button>
            </>
          }
        >
          <p>AI help, photo doubts, leaderboards and rewards switch off at once, and your AI conversations and uploaded photos are deleted.</p>
          <p>Lessons, practice, tests and your progress stay.</p>
          <ErrorLine error={error} />
        </Dialog>
      )}
    </>
  );
}

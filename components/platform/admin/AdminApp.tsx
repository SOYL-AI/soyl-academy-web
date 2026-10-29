'use client';

/**
 * Staff area (M2 minimal shell; backend-api M2 point 8).
 *
 * 1. Role gate: guests are asked to sign in (staff use the methods in STAFF_AUTH; owner default: the email
 *    one-time code, ADR-026); students and parents see "staff only". The API enforces roles anyway
 *    (policy.staff); this is only the UI.
 * 2. MFA (AUTH-11): the UI follows the API. Only when a staff call returns `mfa_required` (STAFF_AUTH
 *    secondFactor 'totp') does it read GET /v1/me/mfa and either enrol (QR of the otpauth URI + the secret,
 *    confirm with a code, show the 10 recovery codes once) or verify (a 6-digit code, or a recovery code).
 *    Enrolment needs a fresh sign-in (`fresh_session_required`). With no second factor it goes straight in.
 * 3. GET /v1/admin/me decides the sections (D-045). Superadmins get the dashboard tabs (Overview, Growth,
 *    Engagement, Retention, AI and credits, Revenue, Interest, Content, Users) plus Reports; other staff
 *    see the reports queue only. Analytics and Users are lazy chunks.
 * 4. The content reports queue (GET /v1/admin/reports, newest first, cursor paging). Comments are shown as
 *    plain text (React text nodes), never as Markdown or HTML.
 *
 * Nothing about MFA is stored in the browser (WEB-5).
 */
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { isApiError, type AdminContentReports, type AdminMe, type MfaEnrollment, type MfaStatus } from '@/platform/shared/api-client';
import { STAFF_AUTH } from '@/platform/shared/config/security';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { OTPInput, TextInput } from '@/components/platform/ui/kit/Field';
import { Tabs } from '@/components/platform/ui/kit/Tabs';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { problemMessage } from '../lib/problems';
import { istToday, presetRange, tabsFor, type AdminTabId, type DateRange } from './analytics/model';
import s from './admin.module.css';

const QrCode = lazy(() => import('./QrCode').then((m) => ({ default: m.QrCode })));
// D-045 super-admin sections: separate chunks, so reviewers (Reports only) never download them.
const Analytics = lazy(() => import('./analytics/Analytics'));
const UsersPanel = lazy(() => import('./analytics/UsersPanel'));

type Report = AdminContentReports['reports'][number];
const STATUSES = ['open', 'triaged', 'fixed', 'rejected', 'duplicate'] as const;
type ReportStatus = (typeof STATUSES)[number];

type Gate =
  | { step: 'checking' }
  | { step: 'enrol-start' }
  | { step: 'enrol-confirm'; enrollment: MfaEnrollment }
  | { step: 'recovery-codes'; codes: string[] }
  | { step: 'verify' }
  | { step: 'ready' };

/** The login prompt's reason line, from the staff sign-in policy (config, ADR-026). */
export function staffSignInReason(methods: readonly string[] = STAFF_AUTH.signInMethods): string {
  if (methods.includes('email')) return 'Staff sign in with the email code sent to their SOYL email address.';
  return 'Staff sign in with their SOYL Google account.';
}

export function mfaErrorMessage(err: unknown): string {
  if (isApiError(err, 'otp_invalid')) return 'That code is not right. Check the time on your phone and try the newest code.';
  if (isApiError(err, 'otp_expired')) return 'The set-up expired. Start again.';
  if (isApiError(err, 'otp_locked')) return `Too many wrong codes. Try again in ${Math.ceil((err.retryAfterSeconds ?? 900) / 60)} minutes.`;
  if (isApiError(err, 'fresh_session_required')) return 'For your safety, sign in again before setting up the authenticator.';
  if (isApiError(err, 'validation_failed')) return 'Enter the 6-digit code from your authenticator app, or a recovery code.';
  return problemMessage(err);
}

export function AdminApp() {
  const { state, openLogin } = useSession();

  if (state.status === 'loading') return <Skeleton lines={4} />;
  if (state.status === 'guest') {
    return (
      <>
      <h1 className="p-visually-hidden">Staff</h1>
      <EmptyState
        title="Staff sign-in"
        headingLevel="h2"
        icon="lock"
        action={<Button onClick={() => openLogin({ reason: staffSignInReason() })}>Log in</Button>}
      >
        This area is for SOYL Academy reviewers and admins.
      </EmptyState>
      </>
    );
  }
  if (state.user.role !== 'reviewer' && state.user.role !== 'admin') {
    return (
      <>
      <h1 className="p-visually-hidden">Staff</h1>
      <EmptyState title="Staff only" headingLevel="h2" icon="lock">
        This area is for SOYL Academy reviewers and admins. Your account does not have access.
      </EmptyState>
      </>
    );
  }
  return <StaffArea onSignInAgain={() => openLogin({ reason: 'Sign in again to set up your authenticator.' })} />;
}

function StaffArea({ onSignInAgain }: { onSignInAgain: () => void }) {
  const [gate, setGate] = useState<Gate>({ step: 'checking' });
  const [me, setMe] = useState<AdminMe | null>(null);
  const [tab, setTab] = useState<AdminTabId | null>(null);
  const [range, setRange] = useState<DateRange>(() => presetRange(30, istToday()));
  const [error, setError] = useState<string | null>(null);

  const routeMfa = useCallback(async () => {
    try {
      const mfa: MfaStatus = await api.get('/v1/me/mfa');
      setGate(mfa.confirmed ? (mfa.sessionVerified ? { step: 'ready' } : { step: 'verify' }) : { step: 'enrol-start' });
    } catch (err) {
      setError(mfaErrorMessage(err));
    }
  }, []);

  /** Role, capabilities and sections (GET /v1/admin/me; staff role, + a TOTP-verified session when configured). */
  const loadMe = useCallback(async () => {
    setError(null);
    try {
      const m = await api.get('/v1/admin/me');
      setMe(m);
      setTab((t) => t ?? tabsFor(m)[0]?.id ?? 'reports');
      setGate({ step: 'ready' });
    } catch (err) {
      if (isApiError(err, 'mfa_required')) await routeMfa();
      else setError(problemMessage(err));
    }
  }, [routeMfa]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first load decides the MFA step
    void loadMe();
  }, [loadMe]);

  /** A section hit `mfa_required` (the session lost its verification): ask for the code again. */
  const onProblem = useCallback(
    (err: unknown) => {
      if (isApiError(err, 'mfa_required')) {
        setGate({ step: 'checking' });
        void routeMfa();
      } else setError(problemMessage(err));
    },
    [routeMfa],
  );

  const tabs = tabsFor(me);
  const superadmin = tabs.length > 1;
  const panel = (id: AdminTabId) => {
    if (id === 'reports') return <ReportsPanel onProblem={onProblem} />;
    if (id === 'users')
      return (
        <Suspense fallback={<Skeleton lines={4} />}>
          <UsersPanel onProblem={onProblem} />
        </Suspense>
      );
    return (
      <Suspense fallback={<Skeleton lines={6} />}>
        <Analytics tab={id} range={range} onRangeChange={setRange} onProblem={onProblem} />
      </Suspense>
    );
  };

  return (
    <div className={cx(s.admin, superadmin && s.wide)}>
      <h1 className={s.title}>{superadmin ? 'Admin dashboard' : 'Staff'}</h1>
      {error && (
        <p className={s.error} role="alert">
          <Icon name="alert" size={16} /> {error}
        </p>
      )}
      {gate.step === 'checking' && <Skeleton lines={3} />}
      {gate.step === 'enrol-start' && <EnrolStart onEnrolled={(enrollment) => setGate({ step: 'enrol-confirm', enrollment })} onSignInAgain={onSignInAgain} />}
      {gate.step === 'enrol-confirm' && <EnrolConfirm enrollment={gate.enrollment} onConfirmed={(codes) => setGate({ step: 'recovery-codes', codes })} onRestart={() => setGate({ step: 'enrol-start' })} />}
      {gate.step === 'recovery-codes' && <RecoveryCodes codes={gate.codes} onDone={() => void loadMe()} />}
      {gate.step === 'verify' && <Verify onVerified={() => void loadMe()} />}
      {gate.step === 'ready' &&
        me &&
        tab &&
        (superadmin ? (
          <Tabs label="Admin sections" value={tab} onChange={(id) => setTab(id as AdminTabId)} tabs={tabs.map((t) => ({ id: t.id, label: t.label, content: t.id === tab ? panel(t.id) : null }))} />
        ) : (
          panel('reports')
        ))}
    </div>
  );
}

/** The "Report a mistake" queue (every staff role). Comments are plain text (WEB-7). */
function ReportsPanel({ onProblem }: { onProblem: (err: unknown) => void }) {
  const [status, setStatus] = useState<ReportStatus>('open');
  const [reports, setReports] = useState<Report[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadReports = useCallback(
    async (after: string | null, st: ReportStatus) => {
      setBusy(true);
      try {
        const page = await api.get('/v1/admin/reports', { query: { status: st, limit: 25, ...(after ? { cursor: after } : {}) } });
        setReports((prev) => (after && prev ? [...prev, ...page.reports] : page.reports));
        setCursor(page.nextCursor);
      } catch (err) {
        onProblem(err);
      } finally {
        setBusy(false);
      }
    },
    [onProblem],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reload when the status filter changes
    void loadReports(null, status);
  }, [loadReports, status]);

  return (
    <section aria-labelledby="reports-title" className={s.section}>
      <div className={s.sectionHead}>
        <h2 id="reports-title" className={s.subtitle}>
          Content reports
        </h2>
        <label className={s.filter}>
          Status{' '}
          <select value={status} onChange={(e) => setStatus(e.target.value as ReportStatus)} className={s.select}>
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!reports && <Skeleton lines={3} />}
      {reports && reports.length === 0 && <p className={s.muted}>No {status} reports.</p>}
      {reports && reports.length > 0 && (
        <ol className={s.reports} data-testid="reports">
          {reports.map((r) => (
            <li key={r.id} className={s.report}>
              <div className={s.reportHead}>
                <Badge tone={r.reason === 'wrong_answer' || r.reason === 'wrong_content' ? 'danger' : 'neutral'}>{r.reason.replace(/_/g, ' ')}</Badge>
                <span className={s.muted}>
                  {new Date(r.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} · {r.reporter}
                </span>
              </div>
              <p className={s.reportWhere}>
                <code>{r.unit}</code> · {r.contentType.replace('_', ' ')}
                {r.itemRef ? (
                  <>
                    {' '}
                    · <code>{r.itemRef}</code>
                  </>
                ) : null}
              </p>
              {r.comment && <p className={s.comment}>{r.comment}</p>}
            </li>
          ))}
        </ol>
      )}
      {cursor && (
        <Button variant="secondary" size="sm" loading={busy} onClick={() => void loadReports(cursor, status)}>
          Load more
        </Button>
      )}
    </section>
  );
}

function EnrolStart({ onEnrolled, onSignInAgain }: { onEnrolled: (e: MfaEnrollment) => void; onSignInAgain: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  return (
    <section className={s.card} aria-labelledby="mfa-title" data-testid="mfa-enrol">
      <h2 id="mfa-title" className={s.subtitle}>
        Set up two-step sign-in
      </h2>
      <p>Staff accounts need an authenticator app (Google Authenticator, Microsoft Authenticator or similar). It takes a minute.</p>
      {error !== null && (
        <p className={s.error} role="alert">
          {mfaErrorMessage(error)}
        </p>
      )}
      <div className={s.row}>
        <Button
          loading={busy}
          onClick={async () => {
            setBusy(true);
            setError(null);
            try {
              onEnrolled(await api.post('/v1/me/mfa/totp/enroll'));
            } catch (err) {
              setError(err);
            } finally {
              setBusy(false);
            }
          }}
        >
          Set up authenticator
        </Button>
        {isApiError(error, 'fresh_session_required') && (
          <Button variant="secondary" onClick={onSignInAgain}>
            Sign in again
          </Button>
        )}
      </div>
    </section>
  );
}

function EnrolConfirm({ enrollment, onConfirmed, onRestart }: { enrollment: MfaEnrollment; onConfirmed: (codes: string[]) => void; onRestart: () => void }) {
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const confirm = async (value: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await api.post('/v1/me/mfa/totp/confirm', { body: { code: value } });
      onConfirmed(res.recoveryCodes);
    } catch (err) {
      setError(mfaErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className={s.card} aria-labelledby="mfa-scan" data-testid="mfa-confirm">
      <h2 id="mfa-scan" className={s.subtitle}>
        Scan this code
      </h2>
      <p>Open your authenticator app, add an account, and scan the QR code. Then enter the 6-digit code it shows.</p>
      <Suspense fallback={<Skeleton variant="block" width={224} height={224} />}>
        <QrCode text={enrollment.otpauthUri} label="QR code for your authenticator app" />
      </Suspense>
      <details>
        <summary>Can&apos;t scan? Enter the key instead</summary>
        <p>
          Key: <code className={s.secret}>{enrollment.secret.replace(/(.{4})/g, '$1 ').trim()}</code>
          <br />
          {enrollment.digits} digits, every {enrollment.periodSeconds} seconds ({enrollment.algorithm}). This set-up expires in {Math.round(enrollment.expiresInSeconds / 60)} minutes.
        </p>
      </details>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code.length === enrollment.digits) void confirm(code);
        }}
      >
        <OTPInput label="Code from your app" length={enrollment.digits} value={code} onChange={setCode} onComplete={(v) => void confirm(v)} error={error ?? undefined} />
        <div className={s.row}>
          <Button type="submit" loading={busy} disabled={code.length !== enrollment.digits}>
            Confirm
          </Button>
          <Button variant="ghost" onClick={onRestart}>
            Start again
          </Button>
        </div>
      </form>
    </section>
  );
}

function RecoveryCodes({ codes, onDone }: { codes: string[]; onDone: () => void }) {
  return (
    <section className={s.card} aria-labelledby="mfa-codes" data-testid="mfa-recovery-codes">
      <h2 id="mfa-codes" className={s.subtitle}>
        Save your recovery codes
      </h2>
      <p>
        <strong>These are shown only once.</strong> Each code signs you in once if you lose your phone. Keep them somewhere safe (a password manager), not in
        email or chat.
      </p>
      <ol className={s.codes}>
        {codes.map((c) => (
          <li key={c}>
            <code>{c}</code>
          </li>
        ))}
      </ol>
      <Button onClick={onDone}>I have saved them</Button>
    </section>
  );
}

function Verify({ onVerified }: { onVerified: () => void }) {
  const [code, setCode] = useState('');
  const [recovery, setRecovery] = useState('');
  const [useRecovery, setUseRecovery] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const verify = async (body: { code: string } | { recoveryCode: string }) => {
    setBusy(true);
    setError(null);
    try {
      await api.post('/v1/me/mfa/verify', { body });
      onVerified();
    } catch (err) {
      setError(mfaErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className={s.card} aria-labelledby="mfa-verify" data-testid="mfa-verify">
      <h2 id="mfa-verify" className={s.subtitle}>
        Two-step sign-in
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (useRecovery) void verify({ recoveryCode: recovery.trim() });
          else if (code.length === 6) void verify({ code });
        }}
      >
        {useRecovery ? (
          <TextInput label="Recovery code" value={recovery} onChange={(e) => setRecovery(e.target.value)} autoComplete="off" spellCheck={false} error={error ?? undefined} />
        ) : (
          <OTPInput label="Code from your authenticator app" length={6} value={code} onChange={setCode} onComplete={(v) => void verify({ code: v })} error={error ?? undefined} />
        )}
        <div className={s.row}>
          <Button type="submit" loading={busy}>
            Verify
          </Button>
          <Button variant="ghost" onClick={() => setUseRecovery((u) => !u)}>
            {useRecovery ? 'Use the app code' : 'Use a recovery code'}
          </Button>
        </div>
      </form>
    </section>
  );
}

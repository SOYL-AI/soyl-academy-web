'use client';

/**
 * /me (ARCHITECTURE §3.1): profile (display name, board, class → PATCH /v1/me), the public leaderboard
 * name (D-039), the consent flow and its status (D-014, D-039: ConsentFlow), sign-in methods, sign out (WEB-9), sign out other devices, account deletion (DELETE /v1/me,
 * needs a fresh session: AUTH-9).
 */
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useState, type FormEvent } from 'react';
import { isApiError, type Me } from '@/platform/shared/api-client';
import { DISPLAY_NAME } from '@/platform/shared/config/security';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Avatar, Badge, Card, CardTitle, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { TextInput } from '@/components/platform/ui/kit/Field';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { useSession } from '../auth/SessionProvider';
import { ConsentFlow } from '../consent/ConsentFlow';
import { CreditsCard, MyAttemptsCard, SubscriptionCard } from './MeExtras';
import { api } from '../lib/api-browser';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, learnPath, type BoardSlug } from '../lib/catalog';
import { maskedPhone } from '../lib/phone';
import { problemMessage } from '../lib/problems';
import { googleStartUrl } from '../lib/return-to';
import shell from '../shell/shell.module.css';
import s from './me.module.css';

function maskEmailForDisplay(email: string): string {
  const at = email.lastIndexOf('@');
  return at > 1 ? `${email[0]}${'*'.repeat(Math.min(6, at - 1))}${email.slice(at)}` : email;
}

export function MeClient() {
  const { state, openLogin } = useSession();
  const [me, setMe] = useState<Me | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setMe(await api.get('/v1/me'));
      setLoadError(null);
    } catch (err) {
      if (isApiError(err, 'unauthenticated') || (isApiError(err) && err.status === 401)) setMe(null);
      else setLoadError(problemMessage(err));
    }
  }, []);

  const userId = state.status === 'member' ? state.user.id : null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch GET /v1/me when the member changes; state is set after the response
    if (userId) void load();
  }, [userId, load]);

  if (state.status === 'loading' || (state.status === 'member' && !me && !loadError)) {
    return (
      <>
        <h1 className={shell.title}>Your profile</h1>
        <div className={s.stack} aria-busy="true">
          <Skeleton variant="text" lines={3} />
        </div>
      </>
    );
  }

  if (state.status === 'guest') {
    return (
      <>
        <h1 className={shell.title}>Your profile</h1>
        <EmptyState
          title="Log in to see your profile"
          headingLevel="h2"
          action={<Button onClick={() => openLogin({ returnTo: '/me', reason: 'Log in to see your profile, progress and settings.' })}>Log in</Button>}
        >
          Your board, class and progress are saved to your account.
        </EmptyState>
      </>
    );
  }

  if (!me) {
    return (
      <>
        <h1 className={shell.title}>Your profile</h1>
        <EmptyState title="We could not load your profile" icon="alert" headingLevel="h2" action={<Button variant="secondary" onClick={() => void load()}>Try again</Button>}>
          {loadError}
        </EmptyState>
      </>
    );
  }

  return <Profile me={me} onChange={setMe} />;
}

function Profile({ me, onChange }: { me: Me; onChange: (me: Me) => void }) {
  const { signOut } = useSession();
  const name = me.displayName?.trim() || 'Student';
  return (
    <>
      <div className={s.hero}>
        <Avatar name={name} size={56} decorative />
        <div>
          <h1 className={shell.title}>{name}</h1>
          <p className={shell.lead}>
            {me.board && me.classLevel ? `${examLabel(me.board, me.classLevel)} Class ${me.classLevel}` : 'Choose your board and class below'}
          </p>
        </div>
      </div>
      <div className={s.stack}>
        <div id="consent">
          <ConsentFlow onChanged={(v) => onChange({ ...me, consent: v.status })} />
        </div>
        <ProfileForm me={me} onSaved={onChange} />
        <PublicName me={me} onChange={onChange} />
        <MyAttemptsCard />
        <SubscriptionCard />
        <CreditsCard />
        <Methods me={me} />
        <Card as="section" aria-labelledby="signout-title">
          <CardTitle as="h2" id="signout-title">
            Sign out
          </CardTitle>
          <div className={s.actions}>
            <Button variant="secondary" onClick={() => void signOut()} data-testid="logout-button">
              Log out
            </Button>
            <SignOutOthers />
          </div>
        </Card>
        <DeleteAccount />
      </div>
    </>
  );
}

function ProfileForm({ me, onSaved }: { me: Me; onSaved: (me: Me) => void }) {
  const { updateUser } = useSession();
  const toast = useToast();
  const [displayName, setDisplayName] = useState(me.displayName ?? '');
  const [board, setBoard] = useState<BoardSlug | ''>(me.board ?? '');
  const [classLevel, setClassLevel] = useState<string>(me.classLevel ? String(me.classLevel) : '');
  const [nameError, setNameError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const boardId = useId();
  const classId = useId();

  async function save(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const trimmed = displayName.trim();
    if (trimmed && (trimmed.length < DISPLAY_NAME.minLength || trimmed.length > DISPLAY_NAME.maxLength)) {
      setNameError(`Use ${DISPLAY_NAME.minLength} to ${DISPLAY_NAME.maxLength} characters.`);
      return;
    }
    setNameError(null);
    const patch: { displayName?: string | null; board?: BoardSlug; classLevel?: number } = {};
    if (trimmed !== (me.displayName ?? '')) patch.displayName = trimmed || null;
    if (board && board !== me.board) patch.board = board;
    if (classLevel && Number(classLevel) !== me.classLevel) patch.classLevel = Number(classLevel);
    if (Object.keys(patch).length === 0) {
      toast.show({ title: 'Nothing to save' });
      return;
    }
    setSaving(true);
    try {
      const next = await api.patch('/v1/me', { body: patch });
      onSaved(next);
      updateUser({ displayName: next.displayName, board: next.board, classLevel: next.classLevel });
      toast.show({ title: 'Profile saved', tone: 'success' });
    } catch (err) {
      if (isApiError(err, 'validation_failed') && err.problem?.errors?.some((x) => x.path.includes('displayName'))) {
        setNameError('Choose a different name: no phone numbers, and nothing rude.');
      } else setFormError(problemMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card as="section" aria-labelledby="profile-title">
      <CardTitle as="h2" id="profile-title">
        Profile
      </CardTitle>
      <form className={s.form} onSubmit={save} noValidate>
        <TextInput
          label="Display name"
          hint="Shown on your profile. Use a first name or nickname, not your full name."
          error={nameError ?? undefined}
          value={displayName}
          maxLength={DISPLAY_NAME.maxLength}
          autoComplete="nickname"
          onChange={(e) => setDisplayName(e.target.value)}
          name="displayName"
        />
        <div className={s.row}>
          <div className={s.selectField}>
            <label htmlFor={boardId} className={s.label}>
              Board
            </label>
            <select id={boardId} className={s.select} value={board} onChange={(e) => setBoard(e.target.value as BoardSlug)} name="board">
              <option value="" disabled>
                Choose
              </option>
              {BOARDS.map((b) => (
                <option key={b} value={b}>
                  {BOARD_NAMES[b]}
                </option>
              ))}
            </select>
          </div>
          <div className={s.selectField}>
            <label htmlFor={classId} className={s.label}>
              Class
            </label>
            <select id={classId} className={s.select} value={classLevel} onChange={(e) => setClassLevel(e.target.value)} name="classLevel">
              <option value="" disabled>
                Choose
              </option>
              {CLASS_LEVELS.map((c) => (
                <option key={c} value={String(c)}>
                  {board === 'cisce' ? `Class ${c} (${examLabel('cisce', c)})` : `Class ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        {formError && (
          <p className={s.formError} role="alert">
            {formError}
          </p>
        )}
        <div className={s.actions}>
          <Button type="submit" loading={saving}>
            Save
          </Button>
          {me.board && me.classLevel && (
            <a className={s.textLink} href={learnPath(me.board, me.classLevel)}>
              Go to my subjects
            </a>
          )}
        </div>
      </form>
    </Card>
  );
}

function Methods({ me }: { me: Me }) {
  return (
    <Card as="section" aria-labelledby="methods-title">
      <CardTitle as="h2" id="methods-title">
        Ways to log in
      </CardTitle>
      <ul className={s.methods}>
        <li>
          <span>Phone</span>
          <span>{me.methods.phone ? maskedPhone(me.methods.phone) : <Badge>Not added</Badge>}</span>
        </li>
        <li>
          <span>Email</span>
          <span>{me.methods.email ? maskEmailForDisplay(me.methods.email) : <Badge>Not added</Badge>}</span>
        </li>
        <li>
          <span>Google</span>
          <span>
            {me.methods.google ? (
              <Badge tone="success">Connected</Badge>
            ) : (
              <a className={s.textLink} href={googleStartUrl('/me', 'link')}>
                Connect Google
              </a>
            )}
          </span>
        </li>
      </ul>
    </Card>
  );
}

function SignOutOthers() {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="ghost"
      loading={busy}
      onClick={async () => {
        setBusy(true);
        try {
          const res = await api.delete('/v1/me/sessions');
          toast.show({ title: res.revoked > 0 ? `Logged out of ${res.revoked} other device${res.revoked === 1 ? '' : 's'}` : 'No other devices were logged in' });
        } catch (err) {
          toast.show({ title: problemMessage(err), tone: 'danger' });
        } finally {
          setBusy(false);
        }
      }}
    >
      Log out other devices
    </Button>
  );
}

const CONFIRM_WORD = 'DELETE';

function DeleteAccount() {
  const { clearLocal, openLogin } = useSession();
  const toast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setBusy(true);
    setError(null);
    try {
      await api.delete('/v1/me');
      setOpen(false);
      clearLocal();
      toast.show({ title: 'Your account is deleted', description: 'You have been logged out everywhere.', tone: 'success' });
      router.push('/learn');
    } catch (err) {
      if (isApiError(err, 'fresh_session_required')) {
        setOpen(false);
        openLogin({ returnTo: '/me', reason: 'For your safety, log in again, then delete your account.' });
      } else setError(problemMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card as="section" aria-labelledby="delete-title" className={s.danger}>
      <CardTitle as="h2" id="delete-title">
        Delete account
      </CardTitle>
      <p className={s.muted}>
        This removes your profile, progress and test results. You are logged out on every device. It cannot be undone.
      </p>
      <Button variant="danger" onClick={() => setOpen(true)} data-testid="delete-account">
        Delete my account
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setTyped('');
          setError(null);
        }}
        title="Delete your account?"
        description="Your profile, progress and results will be removed. This cannot be undone."
        dismissOnBackdrop={false}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Keep my account
            </Button>
            <Button variant="danger" loading={busy} disabled={typed.trim().toUpperCase() !== CONFIRM_WORD} onClick={() => void confirm()} data-testid="confirm-delete">
              Delete for ever
            </Button>
          </>
        }
      >
        <TextInput label={`Type ${CONFIRM_WORD} to confirm`} value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} error={error ?? undefined} name="confirmDelete" />
      </Dialog>
    </Card>
  );
}

/** D-039: the only name other students see. Auto-generated; the student can roll a new one. */
function PublicName({ me, onChange }: { me: Me; onChange: (me: Me) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function regenerate() {
    setBusy(true);
    setError(null);
    try {
      const r = await api.post('/v1/me/public-name');
      onChange({ ...me, publicName: r.publicName });
    } catch (err) {
      setError(problemMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card as="section" aria-labelledby="public-name-title" data-testid="public-name">
      <CardTitle as="h2" id="public-name-title">
        Your name on leaderboards
      </CardTitle>
      <p className={s.muted}>
        Other students only ever see this made-up name, never your real name or email: <strong data-testid="public-name-value">{me.publicName}</strong>
      </p>
      {error && (
        <p className={s.formError} role="alert">
          {error}
        </p>
      )}
      <div className={s.actions}>
        <Button variant="secondary" loading={busy} onClick={() => void regenerate()}>
          Give me a new name
        </Button>
      </div>
    </Card>
  );
}

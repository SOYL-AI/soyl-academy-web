'use client';

/**
 * Super-admin user lookup (D-045): recent sign-ups (masked email/phone, no names), exact-email search,
 * and per account an audited "reveal email" and an audited counts-only summary. Nothing is cached in the
 * browser; a revealed email lives only in this component's state.
 */
import { useCallback, useEffect, useState } from 'react';
import { isApiError, type AdminUserRow, type AdminUserSummary } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { TextInput } from '@/components/platform/ui/kit/Field';
import { api } from '../../lib/api-browser';
import { problemMessage } from '../../lib/problems';
import { CsvButton } from './Charts';
import { csvFileName, formatCount, istToday } from './model';
import s from './analytics.module.css';

const when = (iso: string) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
const consentLabel: Record<string, string> = { required: 'none', pending: 'waiting for parent', granted: 'granted', revoked: 'withdrawn' };

export default function UsersPanel({ onProblem }: { onProblem: (err: unknown) => void }) {
  const [users, setUsers] = useState<AdminUserRow[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');
  const [found, setFound] = useState<AdminUserRow[] | null>(null);

  const fail = useCallback(
    (err: unknown) => {
      if (isApiError(err, 'mfa_required')) onProblem(err);
      else setError(problemMessage(err));
    },
    [onProblem],
  );

  const load = useCallback(
    async (after: string | null) => {
      setBusy(true);
      setError(null);
      try {
        const page = await api.get('/v1/admin/users', { query: { limit: 25, ...(after ? { cursor: after } : {}) } });
        setUsers((prev) => (after && prev ? [...prev, ...page.users] : page.users));
        setCursor(page.nextCursor);
      } catch (err) {
        fail(err);
      } finally {
        setBusy(false);
      }
    },
    [fail],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first page on mount
    void load(null);
  }, [load]);

  const search = async () => {
    setError(null);
    try {
      setFound((await api.post('/v1/admin/users/search', { body: { email: query.trim() } })).users);
    } catch (err) {
      fail(err);
    }
  };

  const today = istToday();
  return (
    <div className={s.dash} data-testid="users">
      <p className={s.note} role="note">
        Emails are masked. Revealing an email or opening a summary is recorded in the audit log with your account and the time. Summaries show counts only.
      </p>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      <form
        className={s.search}
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim().length >= 3) void search();
        }}
      >
        <TextInput label="Find by exact email (support)" type="email" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" spellCheck={false} />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>
      {found && (
        <section aria-label="Search result" className={s.panel}>
          {found.length === 0 ? <p className={s.muted}>No account has that email.</p> : <UserList users={found} onProblem={fail} />}
        </section>
      )}
      <section aria-labelledby="recent-title" className={s.panel}>
        <div className={s.panelHead}>
          <h3 id="recent-title" className={s.panelTitle}>
            Recent sign-ups
          </h3>
          {users && (
            <CsvButton
              name={csvFileName('recent-signups', { from: users[users.length - 1]?.createdAt.slice(0, 10) ?? today, to: today })}
              header={['created_at', 'masked_email', 'masked_phone', 'method', 'board', 'class', 'consent']}
              rows={users.map((u) => [u.createdAt, u.maskedEmail, u.maskedPhone, u.method, u.board, u.classLevel, u.consent])}
            />
          )}
        </div>
        {!users && <Skeleton lines={4} />}
        {users && users.length === 0 && <p className={s.muted}>No sign-ups yet.</p>}
        {users && users.length > 0 && <UserList users={users} onProblem={fail} />}
        {cursor && (
          <Button variant="secondary" size="sm" loading={busy} onClick={() => void load(cursor)}>
            Load more
          </Button>
        )}
      </section>
    </div>
  );
}

function UserList({ users, onProblem }: { users: AdminUserRow[]; onProblem: (err: unknown) => void }) {
  return (
    <ul className={s.userList}>
      {users.map((u) => (
        <UserItem key={u.id} user={u} onProblem={onProblem} />
      ))}
    </ul>
  );
}

function UserItem({ user, onProblem }: { user: AdminUserRow; onProblem: (err: unknown) => void }) {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [summary, setSummary] = useState<AdminUserSummary | null>(null);
  const [busy, setBusy] = useState<'reveal' | 'summary' | null>(null);
  const run = async (what: 'reveal' | 'summary') => {
    setBusy(what);
    try {
      if (what === 'reveal') setEmail((await api.post('/v1/admin/users/{id}/reveal', { params: { id: user.id }, body: {} })).email);
      else setSummary(await api.get('/v1/admin/users/{id}/summary', { params: { id: user.id } }));
    } catch (err) {
      onProblem(err);
    } finally {
      setBusy(null);
    }
  };
  return (
    <li className={s.userItem} data-testid="user-row">
      <div className={s.userMain}>
        <span className={s.userEmail}>{email !== undefined ? (email ?? 'no email (phone sign-in)') : (user.maskedEmail ?? user.maskedPhone ?? 'phone account')}</span>
        <span className={s.muted}>
          {user.method} · {user.board ? user.board.toUpperCase() : 'board not set'} · {user.classLevel ? `class ${user.classLevel}` : 'class not set'} · consent {consentLabel[user.consent] ?? user.consent} · {when(user.createdAt)}
        </span>
      </div>
      <div className={s.userActions}>
        {email === undefined && (
          <Button variant="ghost" size="sm" loading={busy === 'reveal'} onClick={() => void run('reveal')}>
            Reveal email
          </Button>
        )}
        <Button variant="ghost" size="sm" loading={busy === 'summary'} onClick={() => void run('summary')}>
          {summary ? 'Refresh summary' : 'Summary'}
        </Button>
      </div>
      {summary && <Summary s2={summary} />}
    </li>
  );
}

function Summary({ s2 }: { s2: AdminUserSummary }) {
  const a = s2.activity;
  const rows: [string, string][] = [
    ['Sign-in methods', s2.signInMethods.join(', ') || '–'],
    ['Consent', `${s2.consent ?? 'none'}${s2.ageBand ? ` (${s2.ageBand === 'adult' ? '18 or older' : 'under 18'})` : ''}`],
    ['Lessons opened / completed', `${formatCount(a.lessonsOpened)} / ${formatCount(a.lessonsCompleted)}`],
    ['Practice answers / solved', `${formatCount(a.practiceAnswers)} / ${formatCount(a.practiceSolved)}`],
    ['Tests started / submitted', `${formatCount(a.testsStarted)} / ${formatCount(a.testsSubmitted)}`],
    ['Active days (last 30)', formatCount(a.activeDays30)],
    ['Last active', a.lastActiveDay ?? 'never'],
    ['Current streak / XP', `${formatCount(a.currentStreak)} days / ${formatCount(a.totalXp)}`],
    ['AI requests (30 days)', formatCount(s2.ai.requests30)],
    ['Credits granted / spent (30 days)', `${formatCount(s2.ai.creditsGranted30)} / ${formatCount(s2.ai.creditsSpent30)}`],
    ['Coins balance / earned', `${formatCount(s2.coins.balance)} / ${formatCount(s2.coins.earned)}`],
    ['Plan', `${s2.subscription.plan}${s2.subscription.status ? ` (${s2.subscription.status})` : ''}`],
    ['School saved', s2.hasSchool ? 'yes' : 'no'],
  ];
  return (
    <dl className={s.summaryList} data-testid="user-summary">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

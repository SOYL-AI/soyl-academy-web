'use client';

/**
 * The student dashboard (D-043; route /me/dashboard). Private data, so it is fetched in the browser (ADR-010):
 * `GET /v1/me/dashboard` (totals, accuracy windows, difficulty split, mastery, tests, focus, recent, badges,
 * weekly goal), plus `GET /v1/me/card` (level, XP, coins, player card), `GET /v1/me/activity` (streak and
 * heatmap) and `GET /v1/me/mastery` (per-subject mastery). Every block has a skeleton, an empty state for a
 * brand-new account and degrades on its own when its request fails. Guests get a sign-in prompt with what
 * this device has recorded (the existing guest model).
 */
import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import type { MyDashboard, MyMastery, WeeklyGoal } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, EmptyState, ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon, type IconName } from '@/components/platform/ui/kit/Icon';
import { MasteryBar, MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, chapterSlug, examLabel, learnPath, type BoardSlug } from '../lib/catalog';
import { continueChapter } from '../lib/learner';
import { problemMessage } from '../lib/problems';
import { DASHBOARD_PATH } from '../lib/return-to';
import { useLearnerProgress } from '../learn/ProgressProvider';
import { useActivity, useMastery, usePlayerCard, type Loadable } from '../learn/useInsights';
import { chapterHref } from '../learn/links';
import { Heatmap } from '../me/Heatmap';
import { dayLabel } from '../me/heatmap-model';
import { DifficultyChart, ScoreTrendChart } from './charts';
import {
  chapterLinkHref,
  difficultyScopeNote,
  classLine,
  fmtPct,
  goalView,
  greeting,
  isNewAccount,
  kpiTiles,
  profilePrompts,
  recentRows,
  schoolLine,
  scopeText,
  subjectHref,
  TEST_KIND_LABELS,
  trendPoints,
  withTarget,
  type Delta,
  type ProfilePrompt,
  type RecentRow,
} from './model';
import { CardTeaser, LeagueLocked, LeagueTeaser } from './Teasers';
import { WeeklyGoalEditor } from './WeeklyGoalEditor';
import s from './dashboard.module.css';

export function DashboardClient() {
  const { state } = useSession();
  if (state.status === 'loading') return <DashboardSkeleton />;
  if (state.status === 'guest') return <GuestDashboard />;
  return <MemberDashboard userId={state.user.id} name={state.user.displayName?.trim() || null} consent={state.consent === 'granted'} />;
}

function DashboardSkeleton() {
  return (
    <div className={s.page} aria-busy="true" data-testid="dashboard-loading">
      <h1 className={s.title}>Your dashboard</h1>
      <Skeleton lines={2} />
      <div className={s.grid}>
        <Skeleton variant="block" height={140} />
        <Skeleton variant="block" height={140} />
        <Skeleton variant="block" height={180} className={s.wide} />
      </div>
    </div>
  );
}

/* ── Guests ────────────────────────────────────────────────────────────────── */

function GuestDashboard() {
  const { openLogin } = useSession();
  const { progress, ready } = useLearnerProgress();
  const next = continueChapter(progress);
  const href = next ? chapterHref(next.chapterId) : null;
  return (
    <div className={s.page} data-testid="dashboard-guest">
      <div>
        <p className={s.kicker}>Your dashboard</p>
        <h1 className={s.title}>See all your progress in one place</h1>
      </div>
      <EmptyState
        title="Log in to see your dashboard"
        headingLevel="h2"
        icon="target"
        action={
          <Button onClick={() => openLogin({ returnTo: DASHBOARD_PATH, reason: 'Log in to see your progress dashboard. It is free.' })} data-testid="dashboard-login">
            Log in or sign up
          </Button>
        }
      >
        A free account keeps your streak, weekly goal, mastery and test scores on every device. Lessons, practice and tests stay free.
      </EmptyState>
      <section className={`${s.tile} ${s.device}`} aria-labelledby="device-title" data-testid="device-progress">
        <h2 id="device-title" className={s.tileTitle}>
          On this device
        </h2>
        {!ready ? (
          <Skeleton lines={2} />
        ) : !progress || (progress.lessonsCompleted === 0 && progress.practiceAnswered === 0) ? (
          <p className={s.muted}>Nothing yet. Open a chapter and try its lesson or practice: your progress is kept on this device until you log in.</p>
        ) : (
          <>
            <ul className={s.deviceStats}>
              <li>
                <b>{progress.lessonsCompleted}</b> lessons done
              </li>
              <li>
                <b>{progress.practiceAnswered}</b> answered
              </li>
              <li>
                <b>{progress.practiceCorrect}</b> correct
              </li>
            </ul>
            <p className={s.muted}>It moves into your account when you log in.</p>
          </>
        )}
        {next && href ? (
          <Link href={href} className={s.more} data-testid="continue-card">
            Continue{next.title ? `: ${next.title}` : ` chapter ${next.number ?? chapterSlug(next.chapterId)}`} <Icon name="chevronRight" size={16} />
          </Link>
        ) : (
          <Link href="/learn" className={s.more}>
            Start learning <Icon name="chevronRight" size={16} />
          </Link>
        )}
      </section>
    </div>
  );
}

/* ── Members ───────────────────────────────────────────────────────────────── */

function MemberDashboard({ userId, name, consent }: { userId: string; name: string | null; consent: boolean }) {
  const [reload, setReload] = useState(0);
  const key = `${userId}:${reload}`;
  const [result, setResult] = useState<{ key: string; value: Loadable<MyDashboard> } | null>(null);
  useEffect(() => {
    let alive = true;
    api
      .get('/v1/me/dashboard')
      .then((data) => alive && setResult({ key, value: { status: 'ready', data } }))
      .catch(() => alive && setResult({ key, value: { status: 'error' } }));
    return () => {
      alive = false;
    };
  }, [key]);
  const card = usePlayerCard();
  const activity = useActivity(140);
  const mastery = useMastery();
  // A reload (after saving the class) keeps the previous data on screen until the new response arrives.
  const data = result?.value.status === 'ready' ? result.value.data : null;

  if (!data) {
    if (result?.key === key && result.value.status === 'error') {
      return (
        <div className={s.page}>
          <h1 className={s.title}>Your dashboard</h1>
          <EmptyState title="We could not load your dashboard" icon="alert" headingLevel="h2" action={<Button variant="secondary" onClick={() => setReload((n) => n + 1)}>Try again</Button>}>
            Your progress is safe. Check your connection and try again.
          </EmptyState>
        </div>
      );
    }
    return <DashboardSkeleton />;
  }
  return <DashboardView d={data} name={name} consent={consent} card={card} activity={activity} mastery={mastery} onProfileChanged={() => setReload((n) => n + 1)} />;
}

export function DashboardView({
  d,
  name,
  consent,
  card,
  activity,
  mastery,
  onProfileChanged,
}: {
  d: MyDashboard;
  name: string | null;
  consent: boolean;
  card: ReturnType<typeof usePlayerCard>;
  activity: ReturnType<typeof useActivity>;
  mastery: Loadable<MyMastery>;
  onProfileChanged: () => void;
}) {
  const [now] = useState(() => new Date());
  const [goal, setGoal] = useState<{ base: WeeklyGoal; value: WeeklyGoal } | null>(null);
  const weeklyGoal = goal?.base === d.weeklyGoal ? goal.value : d.weeklyGoal;
  const prompts = profilePrompts(d.profile);
  const fresh = isNewAccount(d);
  const pick = d.profile.board && d.profile.classLevel ? { board: d.profile.board as BoardSlug, classLevel: d.profile.classLevel } : null;
  const learnHref = pick ? learnPath(pick.board, pick.classLevel) : '/learn';
  return (
    <div className={s.page} data-testid="dashboard" data-new={fresh || undefined}>
      <DashboardHeader d={d} name={name} now={now} card={card} activity={activity} />
      {prompts.map((p) => (
        <Prompt key={p.kind} prompt={p} profile={d.profile} onSaved={onProfileChanged} />
      ))}
      {fresh && (
        <section className={s.welcome} aria-labelledby="welcome-title" data-testid="dashboard-welcome">
          <h2 id="welcome-title">Your dashboard fills in as you learn</h2>
          <p>Open a chapter, read the lesson and solve a few practice questions. Your solved count, accuracy, mastery and test scores will show up here.</p>
          <Link href={learnHref} className={s.welcomeGo}>
            <Icon name="play" size={18} /> Start learning
          </Link>
        </section>
      )}
      <Kpis d={d} />
      <div className={s.grid}>
        <GoalTile goal={weeklyGoal} onSaved={(saved) => setGoal({ base: d.weeklyGoal, value: withTarget(weeklyGoal, saved) })} />
        <section className={s.tile} aria-labelledby="diff-title" data-testid="difficulty-tile">
          <div className={s.tileHead}>
            <h2 id="diff-title" className={s.tileTitle}>
              Solved by difficulty
            </h2>
            <Link href={learnHref} className={s.more}>
              Practise
            </Link>
          </div>
          <DifficultyChart data={d.solvedByDifficulty} />
          <p className={s.muted}>{difficultyScopeNote(d.scope)}</p>
        </section>
        <MasteryTile d={d} mastery={mastery} />
        <TestsTile d={d} />
        <FocusTile d={d} />
        <section className={`${s.tile} ${s.wide}`} aria-labelledby="activity-title" data-testid="activity-card">
          <div className={s.tileHead}>
            <h2 id="activity-title" className={s.tileTitle}>
              Activity
            </h2>
            <Link href="/me#activity" className={s.more}>
              Profile
            </Link>
          </div>
          {activity.status === 'ready' ? (
            <Heatmap activity={activity.data} />
          ) : activity.status === 'error' ? (
            <p className={s.muted}>Your activity could not load. Try again later.</p>
          ) : (
            <Skeleton variant="block" height={110} />
          )}
        </section>
        <RecentTile d={d} />
        <BadgeTile d={d} />
        <CardTeaser card={card} />
        {consent ? <LeagueTeaser /> : <LeagueLocked />}
      </div>
    </div>
  );
}

/* ── Header ───────────────────────────────────────────────────────────────── */

function DashboardHeader({ d, name, now, card, activity }: { d: MyDashboard; name: string | null; now: Date; card: ReturnType<typeof usePlayerCard>; activity: ReturnType<typeof useActivity> }) {
  const { progress } = useLearnerProgress();
  const streak = activity.status === 'ready' ? activity.data.streak : progress?.streak ?? null;
  const cls = classLine(d.profile);
  const school = schoolLine(d.profile.school);
  return (
    <header className={s.head}>
      <div>
        <p className={s.kicker}>Your dashboard</p>
        <h1 className={s.title}>
          {greeting(now)}
          {name ? `, ${name}` : ''}
        </h1>
        <p className={s.headMeta} data-testid="dashboard-profile-line">
          {cls ?? 'Board and class not set'}
          {school ? ` · ${school}` : ''}
        </p>
      </div>
      <ul className={s.stats} aria-label="Your stats">
        <li className={s.stat} data-testid="dashboard-streak">
          <Icon name="flame" size={18} className={streak?.current ? s.statFlame : s.statCold} />
          <span>
            <b>{streak?.current ?? 0}</b> day streak
          </span>
        </li>
        {card.status === 'ready' ? (
          <>
            <li className={s.stat}>
              <Icon name="spark" size={18} />
              <span>
                Level <b>{card.data.level}</b> · <b>{card.data.xp.toLocaleString('en-IN')}</b> XP
              </span>
            </li>
            <li className={s.stat}>
              <Icon name="coin" size={18} />
              <span>
                <b>{card.data.coins.toLocaleString('en-IN')}</b> coins
              </span>
            </li>
          </>
        ) : card.status === 'loading' ? (
          <li className={s.stat} aria-hidden="true">
            <Skeleton width={120} />
          </li>
        ) : null}
      </ul>
    </header>
  );
}

function Prompt({ prompt, profile, onSaved }: { prompt: ProfilePrompt; profile: MyDashboard['profile']; onSaved: () => void }) {
  if (prompt.kind === 'class') return <ClassPrompt profile={profile} onSaved={onSaved} />;
  if (prompt.kind === 'school') {
    return (
      <p className={s.note} data-testid="prompt-school">
        <Icon name="book" size={16} /> Add your school to your profile. It stays private: other students never see it.
        <Link href="/me#school" className={s.more}>
          Add my school
        </Link>
      </p>
    );
  }
  return (
    <p className={s.note} data-testid="prompt-school-consent">
      <Icon name="lock" size={16} /> You can add your school after a parent approves extra features.
      <Link href="/me/consent?next=%2Fme%2Fdashboard" className={s.more}>
        How to approve
      </Link>
    </p>
  );
}

function ClassPrompt({ profile, onSaved }: { profile: MyDashboard['profile']; onSaved: () => void }) {
  const { updateUser } = useSession();
  const [board, setBoard] = useState<BoardSlug | ''>((profile.board as BoardSlug | null) ?? '');
  const [classLevel, setClassLevel] = useState(profile.classLevel ? String(profile.classLevel) : '');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!board || !classLevel) {
      setError('Choose your board and your class.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const me = await api.patch('/v1/me', { body: { board, classLevel: Number(classLevel) } });
      updateUser({ board: me.board, classLevel: me.classLevel });
      onSaved();
    } catch (err) {
      setError(problemMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={s.prompt} aria-labelledby="class-prompt-title" data-testid="prompt-class">
      <p id="class-prompt-title" className={s.promptText}>
        What do you study? Your board and class pick the subjects, mastery and league on this page.
      </p>
      <form className={s.promptForm} onSubmit={save} noValidate>
        <div>
          <label htmlFor="dash-board">Board</label>
          <select id="dash-board" className={s.select} value={board} onChange={(e) => setBoard(e.target.value as BoardSlug)}>
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
        <div>
          <label htmlFor="dash-class">Class</label>
          <select id="dash-class" className={s.select} value={classLevel} onChange={(e) => setClassLevel(e.target.value)}>
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
        <Button type="submit" loading={busy} data-testid="prompt-class-save">
          Save
        </Button>
      </form>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

/* ── KPIs ─────────────────────────────────────────────────────────────────── */

const DELTA_ICON: Record<Delta['direction'], IconName | null> = { up: 'arrowUp', down: 'arrowDown', same: null, none: null };

function Kpis({ d }: { d: MyDashboard }) {
  return (
    <ul className={s.kpis} aria-label="This week at a glance" data-testid="kpis">
      {kpiTiles(d).map((k) => (
        <li key={k.key} className={s.kpi} data-testid={`kpi-${k.key}`} data-value={k.value}>
          <p className={s.kpiLabel}>{k.label}</p>
          <p className={s.kpiValue}>{k.value}</p>
          <p className={s.kpiSub}>{k.sub}</p>
          {k.delta && k.delta.text && (
            <p className={s.delta} data-direction={k.delta.direction}>
              {DELTA_ICON[k.delta.direction] && <Icon name={DELTA_ICON[k.delta.direction]!} size={14} />}
              {k.delta.text}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ── Weekly goal ──────────────────────────────────────────────────────────── */

function GoalTile({ goal, onSaved }: { goal: WeeklyGoal; onSaved: (saved: { target: number; isDefault: boolean }) => void }) {
  const v = goalView(goal);
  return (
    <section className={s.tile} aria-labelledby="goal-title" data-testid="weekly-goal" data-progress={goal.progress} data-target={goal.target}>
      <div className={s.tileHead}>
        <h2 id="goal-title" className={s.tileTitle}>
          Weekly goal
        </h2>
        <span className={s.muted}>
          {dayLabel(goal.weekStart).replace(/ \d{4}$/, '')} – {dayLabel(goal.weekEnd).replace(/ \d{4}$/, '')}
        </span>
      </div>
      <div className={s.goal}>
        <ProgressRing value={v.percent} size={112} stroke={9} label={v.label} level={goal.met ? 'mastered' : undefined}>
          <span className={s.ringStack}>
            <span className={s.ringBig}>
              {goal.progress}/{goal.target}
            </span>
            <span className={s.ringSmall}>solved</span>
          </span>
        </ProgressRing>
        <div className={s.goalText}>
          <p className={s.goalStatus}>{v.status}</p>
          <p className={s.muted}>
            Solve {goal.target} practice questions for the first time this week{goal.isDefault ? ' (the starting goal; change it any time)' : ''}.
          </p>
          <WeeklyGoalEditor target={goal.target} isDefault={goal.isDefault} onSaved={onSaved} />
        </div>
      </div>
    </section>
  );
}

/* ── Mastery ──────────────────────────────────────────────────────────────── */

function MasteryTile({ d, mastery }: { d: MyDashboard; mastery: Loadable<MyMastery> }) {
  const subjects = mastery.status === 'ready' ? mastery.data.subjects.filter((x) => x.chapterCount > 0) : [];
  return (
    <section className={`${s.tile} ${s.wide}`} aria-labelledby="mastery-title" data-testid="mastery-tile">
      <div className={s.tileHead}>
        <h2 id="mastery-title" className={s.tileTitle}>
          Mastery
        </h2>
        <span className={s.muted}>{scopeText(d.scope)}</span>
      </div>
      {d.scope.kind === 'none' || d.mastery.chapterCount === 0 ? (
        <p className={s.muted}>Set your board and class, or start any chapter, to see how many chapters you have mastered.</p>
      ) : (
        <div className={s.masteryTop}>
          <ProgressRing value={d.mastery.score} size={72} stroke={7} label={`Overall mastery: ${d.mastery.score}%`} />
          <MasteryBar counts={d.mastery.levels} label={`${d.mastery.chapterCount} chapters by mastery level`} />
        </div>
      )}
      {mastery.status === 'loading' ? (
        <Skeleton lines={2} />
      ) : subjects.length > 0 ? (
        <ul className={s.subjects} aria-label="Mastery by subject">
          {subjects.map((sub) => {
            const href = subjectHref(sub.subjectId);
            const body = (
              <>
                <span className={s.rowMain}>
                  <span className={s.rowTitle}>{sub.name}</span>
                  <MasteryBar counts={sub.levels} legend={false} label={`${sub.name}: chapters by mastery level`} />
                </span>
                <span className={s.score}>{sub.score}%</span>
              </>
            );
            return <li key={sub.subjectId}>{href ? <Link href={href} className={s.rowLink}>{body}</Link> : <span className={s.rowLink}>{body}</span>}</li>;
          })}
        </ul>
      ) : null}
    </section>
  );
}

/* ── Tests ────────────────────────────────────────────────────────────────── */

function TestsTile({ d }: { d: MyDashboard }) {
  const points = trendPoints(d.testHistory);
  const latest = d.testHistory.slice(0, 5);
  return (
    <section className={`${s.tile} ${s.wide}`} aria-labelledby="tests-title" data-testid="tests-tile">
      <div className={s.tileHead}>
        <h2 id="tests-title" className={s.tileTitle}>
          Test scores
        </h2>
        <Link href="/me#attempts" className={s.more}>
          All your tests
        </Link>
      </div>
      {d.testHistory.length === 0 ? (
        <p className={s.muted}>
          Take a chapter test to see your scores here.{' '}
          <Link href="/tests" className={s.more}>
            Find a test
          </Link>
        </p>
      ) : (
        <>
          {points.length > 0 && <ScoreTrendChart points={points} />}
          <ul className={s.tests} aria-label="Latest tests">
            {latest.map((t) => (
              <li key={t.attemptId}>
                <Link href={`/tests/result/${t.attemptId}`} className={s.rowLink} data-testid="test-row" data-marking={t.marking}>
                  <span className={s.rowMain}>
                    <span className={s.rowTitle}>{t.title}</span>
                    <span className={s.rowMeta}>
                      {TEST_KIND_LABELS[t.kind]} · {t.subjectName} · {dayLabel(t.day)}
                    </span>
                    <span className={s.tags}>
                      <Badge tone={t.marking === 'self' ? 'highlight' : 'neutral'}>{t.marking === 'self' ? 'Self-marked' : 'Auto-marked'}</Badge>
                      {t.autoSubmitted && <Badge>Submitted at time-up</Badge>}
                    </span>
                  </span>
                  <span className={s.score}>{t.percentage === null ? '–' : fmtPct(t.percentage)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/* ── Focus areas ──────────────────────────────────────────────────────────── */

function FocusTile({ d }: { d: MyDashboard }) {
  const { weakest, strongest } = d.focus;
  return (
    <section className={`${s.tile} ${s.wide}`} aria-labelledby="focus-title" data-testid="focus-tile">
      <h2 id="focus-title" className={s.tileTitle}>
        Focus areas
      </h2>
      {weakest.length === 0 && strongest.length === 0 ? (
        <p className={s.muted}>Answer at least 3 practice questions in a chapter (or take its chapter test) and your weakest and strongest chapters will show here.</p>
      ) : (
        <div className={s.focus}>
          <div>
            <h3 className={s.focusTitle}>Practise next</h3>
            {weakest.length === 0 ? (
              <p className={s.muted}>No weak chapters right now. Keep going!</p>
            ) : (
              <ul className={s.focusList} data-testid="focus-weakest">
                {weakest.map((c) => (
                  <FocusItem key={c.chapterId} c={c} weak />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className={s.focusTitle}>Your strongest</h3>
            {strongest.length === 0 ? (
              <p className={s.muted}>Reach Proficient in a chapter to see it here.</p>
            ) : (
              <ul className={s.focusList} data-testid="focus-strongest">
                {strongest.map((c) => (
                  <FocusItem key={c.chapterId} c={c} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function FocusItem({ c, weak = false }: { c: MyDashboard['focus']['weakest'][number]; weak?: boolean }) {
  const acc = c.firstTryAccuracy === null ? null : Math.round(c.firstTryAccuracy * 100);
  return (
    <li className={s.focusItem}>
      <span className={s.rowTitle}>
        Chapter {c.number}: {c.title}
      </span>
      <span className={s.rowMeta}>
        {c.subjectName} · {c.practiceAttempted}/{c.practiceTotal} practised{acc !== null ? ` · ${acc}% right first time` : ''}
        {c.chapterTestPct !== null ? ` · chapter test ${fmtPct(c.chapterTestPct)}` : ''}
      </span>
      <MasteryPip level={c.level} showLabel />
      <span className={s.focusActions}>
        {weak ? (
          <Link href={chapterLinkHref(c.link, 'practice')} className={s.more} data-testid="focus-practise">
            Practise now <Icon name="chevronRight" size={16} />
          </Link>
        ) : (
          <Link href={chapterLinkHref(c.link)} className={s.more}>
            Open chapter <Icon name="chevronRight" size={16} />
          </Link>
        )}
      </span>
    </li>
  );
}

/* ── Recent activity and next badge ───────────────────────────────────────── */

const RECENT_ICON: Record<RecentRow['kind'], IconName> = { lesson: 'book', practice: 'check', test: 'clock', badge: 'trophy' };

function RecentTile({ d }: { d: MyDashboard }) {
  const rows = recentRows(d.recent, d.today);
  return (
    <section className={s.tile} aria-labelledby="recent-title" data-testid="recent-tile">
      <h2 id="recent-title" className={s.tileTitle}>
        Recent activity
      </h2>
      {rows.length === 0 ? (
        <p className={s.muted}>Lessons you finish, practice, tests and badges will be listed here.</p>
      ) : (
        <ul className={s.recent}>
          {rows.map((r) => {
            const body = (
              <>
                <span className={s.recentIcon} aria-hidden="true">
                  <Icon name={RECENT_ICON[r.kind]} size={16} />
                </span>
                <span className={s.rowMain}>
                  <span className={s.rowTitle}>{r.text}</span>
                  <span className={s.rowMeta}>{r.when}</span>
                </span>
              </>
            );
            return (
              <li key={r.id} data-kind={r.kind} data-testid="recent-row">
                {r.href ? (
                  <Link href={r.href} className={`${s.rowLink} ${s.recentRow}`}>
                    {body}
                  </Link>
                ) : (
                  <span className={`${s.rowLink} ${s.recentRow}`}>{body}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function BadgeTile({ d }: { d: MyDashboard }) {
  const next = d.badges.next;
  return (
    <section className={s.tile} aria-labelledby="badge-title" data-testid="badge-tile">
      <div className={s.tileHead}>
        <h2 id="badge-title" className={s.tileTitle}>
          Next badge
        </h2>
        <Link href="/me#badges" className={s.more}>
          {d.badges.earned} of {d.badges.total} earned
        </Link>
      </div>
      {next ? (
        <>
          <p className={s.leagueTier}>
            <Icon name="trophy" size={22} /> {next.name}
          </p>
          <p className={s.muted}>{next.description}</p>
          <ProgressBar value={next.current} max={next.target} label={`Progress to ${next.name}`} valueText={`${next.current} of ${next.target}`} />
        </>
      ) : (
        <p className={s.muted}>You have earned every badge. Amazing!</p>
      )}
    </section>
  );
}

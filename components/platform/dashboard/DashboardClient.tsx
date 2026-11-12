'use client';

/**
 * Home (`/me/dashboard`, D-043; design language v3 §10 "Home", ADR-032): one calm "today" screen that starts
 * today's learning. A greeting hero with ONE primary action (the real next step), "Continue where you left off",
 * this week's goal, your subjects, the chapter's study modes, and a rail with upcoming live mocks, the weekly league,
 * today's daily challenge and AI credits. The analytics live on Progress (`/me/progress`).
 *
 * Private data is fetched in the browser (ADR-010): GET /v1/me/dashboard (profile prompts, weekly goal, totals),
 * /v1/me/progress (via the shell's ProgressProvider: what to continue), /v1/me/activity (streak and this week),
 * /v1/me/mastery (subject progress), /v1/chapters/{id} (what the chapter has), /v1/coins/daily-challenge (subjects
 * with content, the challenge), /v1/live-events, /v1/leagues/current. Every block has its own loading and failure
 * state. Guests get a sign-in prompt with what this device has recorded (the existing guest model).
 */
import Link from 'next/link';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { ChapterHub, MyDashboard } from '@/platform/shared/api-client';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { AnimalAvatar } from '@/components/platform/ui/kit/AnimalAvatar';
import { Button } from '@/components/platform/ui/kit/Button';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Card, EmptyState, SkeletonCard, Skeleton, cardLinkClass } from '@/components/platform/ui/kit/Display';
import { GreetingHeader, greetingFor } from '@/components/platform/ui/kit/Greeting';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { CardGrid, PageSection } from '@/components/platform/ui/kit/Page';
import { ContinueCard, IconTile, ModeTile, SubjectCard } from '@/components/platform/ui/kit/Tiles';
import { consentAllows } from '@/platform/shared/config/consent';
import { useSession } from '../auth/SessionProvider';
import { useNow } from '../coins/useNow';
import { trackInterest } from '../lib/interest';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, chapterSlug, examLabel, type BoardSlug } from '../lib/catalog';
import { continueChapter, type ChapterSnapshot } from '../lib/learner';
import { problemMessage } from '../lib/problems';
import { DASHBOARD_PATH } from '../lib/return-to';
import { api } from '../lib/api-browser';
import { useMyAvatar } from '../me/MyAvatarProvider';
import { useLearnerProgress } from '../learn/ProgressProvider';
import { useActivity, useMastery } from '../learn/useInsights';
import { chapterHref } from '../learn/links';
import { useStage } from '../shell/StageProvider';
import { CreditsTile } from './CreditsTile';
import { ChallengeCard, GoalCard, LeagueCard, LeagueLocked, UpcomingCard } from './HomeRail';
import {
  activeDays,
  contentSubjects,
  continueMeta,
  continueProgress,
  homeSubtitle,
  homeTitle,
  modeTiles,
  nextStep,
  subjectCards,
  subjectLook,
  type DayPart,
} from './home-model';
import { isNewAccount, profilePrompts, schoolLine, type ProfilePrompt } from './model';
import { useChapterHub, useDailyChallenge, useLeague, useLiveEvents, useMyDashboard } from './useHomeData';
import s from './home.module.css';

export function DashboardClient() {
  const { state } = useSession();
  // The hour is read after mount only (static HTML never bakes a time); the shell renders members client-side.
  const now = useNow(60_000);
  useEffect(() => {
    trackInterest('dashboard_view'); // D-045: aggregate count, only after analytics consent
  }, []);
  if (state.status === 'loading') return <HomeSkeleton />;
  if (state.status === 'guest') return <GuestHome />;
  // D-052: AI credits and the league need no consent (unless CONSENT_REQUIRED switches them back on).
  return (
    <MemberHome
      userId={state.user.id}
      name={state.user.displayName?.trim() || null}
      ai={consentAllows(state.consent, 'ai')}
      leagues={consentAllows(state.consent, 'leaderboards')}
      now={now}
    />
  );
}

function HomeSkeleton() {
  return (
    <div className={s.home} aria-busy="true" data-testid="dashboard-loading">
      <GreetingHeader variant="hero" title="Welcome back" subtitle={<Skeleton width={220} />} />
      <div className={s.board}>
        <div className={s.layout}>
          <div className={s.goalSlot}>
            <SkeletonCard lines={3} />
          </div>
          <div className={s.mainSlot}>
            <SkeletonCard thumb lines={2} />
            <SkeletonCard lines={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Guests ────────────────────────────────────────────────────────────────── */

function GuestHome() {
  const { openLogin } = useSession();
  const { progress, ready } = useLearnerProgress();
  const next = continueChapter(progress);
  const href = next ? chapterHref(next.chapterId) : null;
  const has = !!progress && (progress.lessonsCompleted > 0 || progress.practiceAnswered > 0);
  return (
    <div className={s.home} data-testid="dashboard-guest">
      <GreetingHeader title="Your home for learning" subtitle="Log in to keep your streak, weekly goal, mastery and test scores on every device. Lessons, practice and tests stay free." />
      <Card className={s.guestCard}>
        <EmptyState
          title="Log in to see your home"
          headingLevel="h2"
          icon="target"
          tint="blue"
          compact
          action={
            <Button onClick={() => openLogin({ returnTo: DASHBOARD_PATH, reason: 'Log in to see your progress dashboard. It is free.' })} data-testid="dashboard-login">
              Log in or sign up
            </Button>
          }
        >
          A free account. No name needed.
        </EmptyState>
      </Card>
      <section className={s.device} aria-labelledby="device-title" data-testid="device-progress">
        <h2 id="device-title" className={s.deviceTitle}>
          On this device
        </h2>
        {!ready ? (
          <Skeleton lines={2} />
        ) : !has ? (
          <p className={s.muted}>Nothing yet. Open a chapter and try its lesson or practice: your progress is kept on this device until you log in.</p>
        ) : (
          <>
            <ul className={s.deviceStats}>
              <li>
                <b>{progress!.lessonsCompleted.toLocaleString('en-IN')}</b> lessons done
              </li>
              <li>
                <b>{progress!.practiceAnswered.toLocaleString('en-IN')}</b> answered
              </li>
              <li>
                <b>{progress!.practiceCorrect.toLocaleString('en-IN')}</b> correct
              </li>
            </ul>
            <p className={s.muted}>It moves into your account when you log in.</p>
          </>
        )}
        {next && href ? (
          <Link href={href} className={s.textLink} data-testid="continue-card">
            Continue{next.title ? `: ${next.title}` : ` chapter ${next.number ?? chapterSlug(next.chapterId)}`} <Icon name="chevronRight" size={16} />
          </Link>
        ) : (
          <Link href="/learn" className={s.textLink}>
            Start learning <Icon name="chevronRight" size={16} />
          </Link>
        )}
      </section>
    </div>
  );
}

/* ── Members ───────────────────────────────────────────────────────────────── */

function MemberHome({ userId, name, ai, leagues, now }: { userId: string; name: string | null; ai: boolean; leagues: boolean; now: number | null }) {
  const [reload, setReload] = useState(0);
  const dash = useMyDashboard(userId, reload);
  if (dash.status !== 'ready') {
    if (dash.status === 'error') {
      return (
        <div className={s.home}>
          <GreetingHeader title="Your home" />
          <EmptyState title="We could not load your home" icon="alert" headingLevel="h2" action={<Button variant="secondary" onClick={() => setReload((n) => n + 1)}>Try again</Button>}>
            Your progress is safe. Check your connection and try again.
          </EmptyState>
        </div>
      );
    }
    return <HomeSkeleton />;
  }
  return <HomeView d={dash.data} name={name} ai={ai} leagues={leagues} now={now} onProfileChanged={() => setReload((n) => n + 1)} />;
}

export interface HomeViewProps {
  d: MyDashboard;
  name: string | null;
  /** AI credits card: the student may use AI (consentAllows 'ai'; every member since D-052). */
  ai: boolean;
  /** The league card instead of the locked one (consentAllows 'leaderboards'; every member since D-052). */
  leagues: boolean;
  /** Epoch ms after mount (null before: no greeting by the hour yet). */
  now: number | null;
  onProfileChanged: () => void;
}

export function HomeView({ d, name, ai, leagues, now, onProfileChanged }: HomeViewProps) {
  const { state } = useSession();
  const { stage, pick: byStage } = useStage();
  const { progress, ready } = useLearnerProgress();
  const activity = useActivity(7);
  const mastery = useMastery();
  const mine = useMyAvatar();
  const userId = state.status === 'member' ? state.user.id : null;

  const board = (d.profile.board as BoardSlug | null) ?? null;
  const classLevel = d.profile.classLevel ?? null;
  const prompts = profilePrompts(d.profile);
  const chapter = ready ? continueChapter(progress) : null;
  const hub = useChapterHub(chapter?.chapterId ?? null);
  const hubData = hub.status === 'ready' ? hub.data : null;
  const fresh = isNewAccount(d) && ready && !chapter;
  const dc = useDailyChallenge(board, classLevel);
  const live = useLiveEvents(true, board, classLevel);
  const league = useLeague(leagues, userId);

  const streak = activity.status === 'ready' ? activity.data.streak : progress?.streak ?? null;
  const today = d.today;
  const part: DayPart | null = now === null ? null : greetingFor(new Date(now));
  const title = homeTitle(stage, part, name);
  const subtitle = homeSubtitle(stage, { fresh, goal: d.weeklyGoal, streak: streak ? { current: streak.current, today: streak.lastActiveDay === today } : null });
  const next = nextStep(stage, { chapter, hub: hubData, board, classLevel });
  const school = schoolLine(d.profile.school);
  const cls = board && classLevel ? `${examLabel(board, classLevel)} · Class ${classLevel}` : null;

  const started = useMemo(() => new Map((progress?.subjects ?? []).map((x) => [x.subjectId, x.chapters.length])), [progress]);
  const subjects = board && classLevel && dc.status === 'ready' ? subjectCards(contentSubjects(dc.data), board, classLevel, mastery.status === 'ready' ? mastery.data.subjects : [], started, stage) : null;
  const chapterSubject = chapter ? (progress?.subjects.find((x) => x.subjectId === chapter.subjectId)?.name ?? hubData?.subject.name ?? null) : null;

  return (
    <div className={s.home} data-testid="dashboard" data-new={fresh || undefined} data-stage-copy={stage}>
      <GreetingHeader
        variant="hero"
        eyebrow={
          <span data-testid="dashboard-profile-line">
            {cls ?? 'Board and class not set'}
            {school ? ` · ${school}` : ''}
          </span>
        }
        title={title}
        subtitle={subtitle}
        actions={
          <ButtonLink href={next.href} icon={next.kind === 'class' || next.kind === 'learn' ? 'book' : 'play'} size="lg" data-testid="home-next" data-kind={next.kind}>
            {next.label}
          </ButtonLink>
        }
        art={
          <span className={s.heroArt} data-testid="dashboard-avatar">
            <AnimalAvatar avatar={mine?.avatar ?? null} size={byStage({ junior: 128, middle: 112, senior: 96 })} decorative />
          </span>
        }
      />

      {prompts.length > 0 && (
        <div className={s.prompts}>
          {prompts.map((p) => (
            <Prompt key={p.kind} prompt={p} profile={d.profile} onSaved={onProfileChanged} />
          ))}
        </div>
      )}

      <div className={s.board}>
        <div className={s.layout}>
          <aside className={s.goalSlot} aria-label="This week">
            <GoalCard goal={d.weeklyGoal} fresh={fresh} active={activity.status === 'ready' ? activeDays(activity.data.calendar) : null} today={today} />
          </aside>

          <div className={s.mainSlot}>
            {chapter && <ContinueBlock chapter={chapter} hub={hubData} subjectName={chapterSubject} />}
            {fresh && <Welcome hasSubjects={!!subjects?.length} />}

            {board && classLevel && (
              <PageSection
                id="subjects-title"
                title="Your subjects"
                count={subjects?.length || undefined}
                action={{ href: `/learn/${board}/${classLevel}`, label: 'See all' }}
                data-testid="home-subjects"
              >
                {subjects === null ? (
                  dc.status === 'error' ? (
                    <p className={s.muted}>Your subjects could not load. Open them from Learn.</p>
                  ) : (
                    <div className={s.skeletonGrid} aria-busy="true">
                      <SkeletonCard thumb lines={1} />
                      <SkeletonCard thumb lines={1} />
                    </div>
                  )
                ) : subjects.length === 0 ? (
                  <div className={s.quiet} data-testid="home-subjects-empty">
                    <IconTile icon="book" tint="blue" size="md" />
                    <p className={s.quietText}>
                      <b>Lessons for your class are on the way</b>
                      <span>You can open any other class in the meantime. Everything is free.</span>
                    </p>
                    <ButtonLink href="/learn" size="sm" variant="secondary">
                      Browse classes
                    </ButtonLink>
                  </div>
                ) : (
                  <CardGrid label="Your subjects">
                    {subjects.map((sub) => (
                      <SubjectCard
                        key={sub.subjectId}
                        href={sub.href}
                        title={sub.name}
                        lang={sub.lang}
                        meta={sub.meta}
                        tint={sub.tint}
                        art={<SubjectGlyph kind={sub.art} size={32} />}
                        progress={sub.progress ?? undefined}
                        variant={stage === 'senior' && subjects.length > 6 ? 'plain' : 'tinted'}
                      />
                    ))}
                  </CardGrid>
                )}
              </PageSection>
            )}

            {chapter && hubData && <StudyModes chapter={chapter} hub={hubData} />}

            <Link href="/me/progress" className={cardLinkClass(s.progressLink)} data-testid="progress-link">
              <IconTile icon="chart" tint="teal" size="md" />
              <span className={s.progressText}>
                <span className={s.progressTitle}>See all your progress</span>
                <span className={s.progressMeta}>Mastery, test scores, focus areas and your activity</span>
              </span>
              <Icon name="arrowRight" size={20} className={s.progressArrow} />
            </Link>
          </div>

          <aside className={s.railSlot} aria-label="More for today">
            <UpcomingCard events={live} now={now} />
            {leagues ? <LeagueCard league={league} /> : <LeagueLocked />}
            {board && classLevel && <ChallengeCard data={dc} board={board} classLevel={classLevel} />}
            {ai && <CreditsTile />}
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ── Continue and study modes ─────────────────────────────────────────────── */

function ContinueBlock({ chapter, hub, subjectName }: { chapter: ChapterSnapshot; hub: ChapterHub | null; subjectName: string | null }) {
  const href = chapterHref(chapter.chapterId);
  if (!href) return null;
  const look = subjectLook(chapter.subjectId, subjectName ?? hub?.subject.name ?? '', hub?.subject.language);
  const progress = continueProgress(chapter, hub);
  return (
    <ContinueCard
      href={href}
      title={chapter.title ?? hub?.chapter.title ?? `Chapter ${chapter.number ?? chapterSlug(chapter.chapterId)}`}
      lang={look.lang}
      meta={continueMeta(chapter, hub, subjectName ?? hub?.subject.name ?? null)}
      tint={look.tint}
      art={<SubjectGlyph kind={look.art} size={56} />}
      progress={progress ?? undefined}
      cta="Open chapter"
      data-testid="continue-card"
    />
  );
}

function StudyModes({ chapter, hub }: { chapter: ChapterSnapshot; hub: ChapterHub }) {
  const tiles = modeTiles(chapter.chapterId, hub, chapter);
  return (
    <PageSection id="modes-title" title="Study your way" description={`Chapter ${hub.chapter.number}: ${hub.chapter.title}`} data-testid="home-modes">
      <CardGrid label="Study modes" min={200}>
        {tiles.map((t) => (
          <ModeTile key={t.mode} mode={t.mode} href={t.href ?? undefined} meta={t.meta} disabled={!t.href} />
        ))}
      </CardGrid>
    </PageSection>
  );
}

function Welcome({ hasSubjects }: { hasSubjects: boolean }) {
  const { pick } = useStage();
  const steps = [
    { icon: 'book' as const, tint: 'blue' as const, title: 'Pick a subject', text: hasSubjects ? 'Your subjects are below.' : 'Start from Pick a subject above.' },
    { icon: 'play' as const, tint: 'violet' as const, title: 'Watch a short lesson', text: pick({ junior: 'Slides with pictures and sound.', middle: 'Slides you can read or listen to.', senior: 'Read or listen, at your pace.' }) },
    { icon: 'target' as const, tint: 'green' as const, title: 'Practise a few questions', text: 'Every answer is checked right away.' },
  ];
  return (
    <section className={s.welcome} aria-labelledby="welcome-title" data-testid="dashboard-welcome">
      <h2 id="welcome-title" className={s.welcomeTitle}>
        {pick({ junior: 'Start in three easy steps', middle: 'Start in three steps', senior: 'How to start' })}
      </h2>
      <ol className={s.steps}>
        {steps.map((st) => (
          <li key={st.title} className={s.step}>
            <IconTile icon={st.icon} tint={st.tint} size="md" />
            <span className={s.stepText}>
              <b>{st.title}</b>
              <span>{st.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── Profile prompts (compact) ────────────────────────────────────────────── */

function Prompt({ prompt, profile, onSaved }: { prompt: ProfilePrompt; profile: MyDashboard['profile']; onSaved: () => void }) {
  if (prompt.kind === 'class') return <ClassPrompt profile={profile} onSaved={onSaved} />;
  if (prompt.kind === 'school') {
    return (
      <p className={s.note} data-testid="prompt-school">
        <IconTile icon="book" tint="yellow" size="sm" />
        <span className={s.noteText}>Add your school. Only you can see it.</span>
        <Link href="/me#school" className={s.textLink}>
          Add my school
        </Link>
      </p>
    );
  }
  return (
    <p className={s.note} data-testid="prompt-school-consent">
      <IconTile icon="lock" tint="neutral" size="sm" />
      <span className={s.noteText}>You can add your school after a parent approves your account.</span>
      <Link href="/me/consent?next=%2Fme%2Fdashboard" className={s.textLink}>
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
    <section className={s.classPrompt} aria-labelledby="class-prompt-title" data-testid="prompt-class">
      <p id="class-prompt-title" className={s.classPromptText}>
        <b>What do you study?</b> Your board and class pick your subjects and your league.
      </p>
      <form className={s.classForm} onSubmit={save} noValidate>
        <div className={s.field}>
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
        <div className={s.field}>
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
        <Button type="submit" variant="secondary" loading={busy} data-testid="prompt-class-save" className={s.classSave}>
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

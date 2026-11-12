'use client';

/**
 * Progress (`/me/progress`, design language v3 §10 "Progress", ADR-032): the analytics that used to be on Home,
 * honest and readable. Members only; guests get the same log-in prompt as /me.
 *
 * Private data in the browser (ADR-010): GET /v1/me/dashboard (totals, difficulty, mastery, tests, focus, recent,
 * badges, weekly goal), /v1/me/mastery (per subject), /v1/me/activity (streak and calendar), /v1/me/card (player
 * card). Each block has a skeleton and its own empty state; a brand-new student sees what will appear, never zeros.
 */
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import type { MyDashboard, WeeklyGoal } from '@/platform/shared/api-client';
import { BadgeMedal } from '@/components/platform/ui/art/Art';
import { Button } from '@/components/platform/ui/kit/Button';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Card, EmptyState, ProgressBar, Skeleton, SkeletonCard } from '@/components/platform/ui/kit/Display';
import { GoalRing, WeekStrip, weekDays } from '@/components/platform/ui/kit/Goal';
import { GreetingHeader } from '@/components/platform/ui/kit/Greeting';
import { DataTable, dataTableNum, List, ListRow, StatusPill } from '@/components/platform/ui/kit/Lists';
import { MasteryBar, MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { PageColumns, PageSection } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { StatCard, StatGrid } from '@/components/platform/ui/kit/Stat';
import { IconTile } from '@/components/platform/ui/kit/Tiles';
import type { IconName } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { MASTERY_LABELS } from '../lib/mastery';
import { ScoreTrendChart } from '../dashboard/charts';
import { activeDays, goalCaption, goalTitle } from '../dashboard/home-model';
import { chapterLinkHref, isNewAccount, recentRows, scopeText, subjectHref, trendPoints, withTarget, type RecentRow } from '../dashboard/model';
import { useMyDashboard } from '../dashboard/useHomeData';
import { WeeklyGoalEditor } from '../dashboard/WeeklyGoalEditor';
import { useActivity, useMastery, usePlayerCard } from '../learn/useInsights';
import { Heatmap } from '../me/Heatmap';
import { BlankPlayerCard, PlayerCard } from '../me/PlayerCard';
import { useStage } from '../shell/StageProvider';
import { difficultyStats, focusMeta, MIN_CHART_POINTS, progressStats, progressSubtitle, showHeatmap, testRows } from './progress-model';
import s from './progress.module.css';

const PATH = '/me/progress';

export function ProgressClient() {
  const { state, openLogin } = useSession();
  if (state.status === 'loading') return <ProgressSkeleton />;
  if (state.status === 'guest') {
    return (
      <div className={s.page} data-testid="progress-guest">
        <GreetingHeader title="Your progress" subtitle="Mastery, test scores, focus areas and your activity, all in one place." />
        <Card className={s.guestCard}>
          <EmptyState
            title="Log in to see your progress"
            headingLevel="h2"
            icon="chart"
            tint="teal"
            compact
            action={
              <Button onClick={() => openLogin({ returnTo: PATH, reason: 'Log in to see your progress. It is free.' })} data-testid="progress-login">
                Log in
              </Button>
            }
          >
            Your streak, weekly goal, mastery and test scores are saved to your account. Lessons, practice and tests stay free.
          </EmptyState>
        </Card>
      </div>
    );
  }
  return <MemberProgress userId={state.user.id} />;
}

function ProgressSkeleton() {
  return (
    <div className={s.page} aria-busy="true" data-testid="progress-loading">
      <GreetingHeader title="Your progress" subtitle={<Skeleton width={220} />} />
      <div className={s.skeletonStats}>
        <SkeletonCard lines={1} />
        <SkeletonCard lines={1} />
      </div>
      <SkeletonCard lines={3} />
    </div>
  );
}

function MemberProgress({ userId }: { userId: string }) {
  const [reload, setReload] = useState(0);
  const dash = useMyDashboard(userId, reload);
  if (dash.status === 'error') {
    return (
      <div className={s.page}>
        <GreetingHeader title="Your progress" />
        <EmptyState title="We could not load your progress" icon="alert" headingLevel="h2" action={<Button variant="secondary" onClick={() => setReload((n) => n + 1)}>Try again</Button>}>
          Your progress is safe. Check your connection and try again.
        </EmptyState>
      </div>
    );
  }
  if (dash.status !== 'ready') return <ProgressSkeleton />;
  return <ProgressView d={dash.data} />;
}

export function ProgressView({ d }: { d: MyDashboard }) {
  const fresh = isNewAccount(d);
  const stats = progressStats(d);
  const activity = useActivity(140);
  return (
    <div className={s.page} data-testid="progress" data-new={fresh || undefined}>
      <GreetingHeader title="Your progress" subtitle={progressSubtitle(d.profile, d.thisWeek)} />
      <PageColumns railLabel="Your card, badges and goal" rail={<ProgressRail d={d} fresh={fresh} />}>
        {fresh || stats.length === 0 ? (
          <FreshWelcome />
        ) : (
          <div className={s.statsWrap}>
            <StatGrid label="This week" className={s.stats}>
              {stats.map((st) => (
                <div key={st.key} className={s.statCell} data-testid={`kpi-${st.key}`} data-value={st.raw}>
                  <StatCard label={st.label} value={st.value} unit={st.unit} hint={st.hint} trend={st.trend} icon={st.icon} tint={st.tint} />
                </div>
              ))}
            </StatGrid>
          </div>
        )}
        {!fresh && (
          <>
            <MasterySection d={d} />
            <TestsSection d={d} />
            <DifficultySection d={d} />
            <FocusSection d={d} />
            <ActivitySection activity={activity} today={d.today} />
            <RecentSection d={d} />
          </>
        )}
      </PageColumns>
    </div>
  );
}

/* ── Brand-new student: one welcome, and what will show up (no zeros) ─────────── */

type QuietTint = 'violet' | 'pink' | 'green' | 'orange' | 'blue' | 'neutral';

const COMING: { icon: IconName; tint: QuietTint; title: string; text: string }[] = [
  { icon: 'layers', tint: 'violet', title: 'Mastery', text: 'How far you are in every chapter, from Attempted to Mastered.' },
  { icon: 'clock', tint: 'pink', title: 'Test scores', text: 'Your chapter tests and board papers, with a chart from your third test.' },
  { icon: 'target', tint: 'green', title: 'Practice by difficulty', text: 'Easy, medium and hard questions you have solved.' },
  { icon: 'star', tint: 'orange', title: 'Focus areas', text: 'The chapters to practise next, and your strongest ones.' },
  { icon: 'calendar', tint: 'blue', title: 'Activity', text: 'Your streak and the days you studied.' },
];

function FreshWelcome() {
  const { pick } = useStage();
  return (
    <section className={s.fresh} aria-labelledby="fresh-title" data-testid="progress-empty">
      <div className={s.freshHead}>
        <IconTile icon="sparkles" tint="teal" size="lg" />
        <div className={s.freshText}>
          <h2 id="fresh-title" className={s.freshTitle}>
            {pick({ junior: 'Your progress starts with one question', middle: 'Your progress fills in as you learn', senior: 'Nothing to show yet' })}
          </h2>
          <p className={s.muted}>Finish a lesson or solve a practice question and this page comes alive.</p>
        </div>
        <ButtonLink href="/me/dashboard" size="sm" className={s.freshAction}>
          Pick a subject
        </ButtonLink>
      </div>
      <h3 className={s.subTitle}>What you will see here</h3>
      <List label="What you will see here" inset>
        {COMING.map((c) => (
          <ListRow key={c.title} leading={<IconTile icon={c.icon} tint={c.tint} size="sm" />} title={c.title} meta={c.text} />
        ))}
      </List>
    </section>
  );
}

/** A calm one-row empty state inside a section (the kit EmptyState is sized for a whole card). */
function QuietEmpty({ icon, tint, title, children, action, testId }: { icon: IconName; tint: QuietTint; title: string; children: ReactNode; action?: ReactNode; testId?: string }) {
  return (
    <div className={s.quiet} data-testid={testId}>
      <IconTile icon={icon} tint={tint} size="md" />
      <p className={s.quietText}>
        <b>{title}</b>
        <span>{children}</span>
      </p>
      {action && <span className={s.quietAction}>{action}</span>}
    </div>
  );
}

/* ── Mastery ──────────────────────────────────────────────────────────────── */

function MasterySection({ d }: { d: MyDashboard }) {
  const mastery = useMastery();
  const subjects = mastery.status === 'ready' ? mastery.data.subjects.filter((x) => x.chapterCount > 0) : [];
  const none = d.scope.kind === 'none' || d.mastery.chapterCount === 0;
  return (
    <PageSection id="mastery-title" title="Mastery" description={none ? undefined : scopeText(d.scope)} data-testid="mastery-tile">
      {none ? (
        <QuietEmpty icon="layers" tint="violet" title="No mastery yet">
          Set your board and class, or start any chapter, to see how many chapters you have mastered.
        </QuietEmpty>
      ) : (
        <Card className={s.masteryCard}>
          <div className={s.masteryTop}>
            {d.mastery.score > 0 && <ProgressRing value={d.mastery.score} size={72} stroke={7} label={`Overall mastery: ${d.mastery.score}%`} />}
            <MasteryBar counts={d.mastery.levels} label={`${d.mastery.chapterCount} chapters by mastery level`} />
          </div>
          {mastery.status === 'loading' ? (
            <Skeleton lines={2} />
          ) : subjects.length > 0 ? (
            <List label="Mastery by subject" inset>
              {subjects.map((sub) => {
                const touched = sub.chapterCount - sub.levels.not_started;
                return (
                  <ListRow
                    key={sub.subjectId}
                    href={subjectHref(sub.subjectId) ?? undefined}
                    leading={<ProgressRing value={sub.score} size={40} stroke={4} label={`${sub.name}: ${sub.score}% mastery`} />}
                    title={sub.name}
                    meta={`${touched} of ${sub.chapterCount} chapters started${sub.levels.mastered ? ` · ${sub.levels.mastered} mastered` : ''}`}
                  />
                );
              })}
            </List>
          ) : null}
        </Card>
      )}
    </PageSection>
  );
}

/* ── Test scores ──────────────────────────────────────────────────────────── */

function TestsSection({ d }: { d: MyDashboard }) {
  const { pick } = useStage();
  const points = trendPoints(d.testHistory);
  const rows = testRows(d.testHistory);
  return (
    <PageSection id="tests-title" title="Test scores" action={d.testHistory.length ? { href: '/me#attempts', label: 'All your tests' } : undefined} data-testid="tests-tile">
      {rows.length === 0 ? (
        <QuietEmpty
          icon="clock"
          tint="pink"
          title={pick({ junior: 'Nothing here yet', middle: 'No tests yet', senior: 'No attempts yet' })}
          action={
            <ButtonLink href="/tests" size="sm" variant="secondary">
              Find a test
            </ButtonLink>
          }
          testId="tests-empty"
        >
          {pick({ junior: 'Your first test will show up here. Tests are free.', middle: 'Tests are free. Your scores appear here.', senior: 'Chapter tests and board papers are free.' })}
        </QuietEmpty>
      ) : (
        <Card className={s.testsCard}>
          {points.length >= MIN_CHART_POINTS && <ScoreTrendChart points={points} />}
          <DataTable caption="Your recent tests" hideCaption>
            <thead>
              <tr>
                <th scope="col">Test</th>
                <th scope="col">Date</th>
                <th scope="col" className={dataTableNum}>
                  Score
                </th>
                <th scope="col">Marking</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.attemptId} data-testid="test-row" data-marking={t.marking}>
                  <th scope="row">
                    <Link href={t.href} className={s.rowLink}>
                      {t.title}
                    </Link>
                    <span className={s.rowMeta}>{t.meta}</span>
                  </th>
                  <td className={s.nowrap}>{t.day}</td>
                  <td className={dataTableNum}>
                    <b>{t.percent}</b>
                    <span className={s.rowMeta}>{t.score}</span>
                  </td>
                  <td>
                    <span className={s.pills}>
                      {t.pills.map((p) => (
                        <StatusPill key={p.text} tone={p.tone}>
                          {p.text}
                        </StatusPill>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Card>
      )}
    </PageSection>
  );
}

/* ── Practice by difficulty ───────────────────────────────────────────────── */

const BAND_ICON: Record<'easy' | 'medium' | 'hard', IconName> = { easy: 'circle', medium: 'halfCircle', hard: 'target' };

function DifficultySection({ d }: { d: MyDashboard }) {
  const sbd = d.solvedByDifficulty;
  return (
    <PageSection id="difficulty-title" title="Practice by difficulty" description="Practice questions you have solved, by how hard they are." data-testid="difficulty-tile">
      {sbd.all.solved === 0 ? (
        <QuietEmpty icon="target" tint="green" title="Nothing solved yet">
          Questions you get right in practice are counted here: easy, medium and hard.
        </QuietEmpty>
      ) : (
        <div data-testid="difficulty-chart" data-solved={sbd.all.solved}>
          <StatGrid label="Solved by difficulty">
            {difficultyStats(sbd).map((b) => (
              <StatCard key={b.band} label={b.label} value={b.solved.toLocaleString('en-IN')} hint={b.hint} icon={BAND_ICON[b.band]} tint={b.tint} />
            ))}
          </StatGrid>
        </div>
      )}
    </PageSection>
  );
}

/* ── Focus areas ──────────────────────────────────────────────────────────── */

function FocusSection({ d }: { d: MyDashboard }) {
  const { weakest, strongest } = d.focus;
  return (
    <PageSection id="focus-title" title="Focus areas" data-testid="focus-tile">
      {weakest.length === 0 && strongest.length === 0 ? (
        <QuietEmpty icon="star" tint="orange" title="Not enough practice yet">
          Answer at least 3 practice questions in a chapter (or take its chapter test) and your weakest and strongest chapters show here.
        </QuietEmpty>
      ) : (
        <div className={s.focus}>
          <div className={s.focusCol} data-testid="focus-weakest">
            <h3 className={s.subTitle}>Practise next</h3>
            {weakest.length === 0 ? (
              <p className={s.muted}>No weak chapters right now. Keep going.</p>
            ) : (
              <List label="Chapters to practise next">
                {weakest.map((c) => (
                  <ListRow
                    key={c.chapterId}
                    leading={<MasteryPip level={c.level} />}
                    title={`Chapter ${c.number}: ${c.title}`}
                    meta={focusMeta(c)}
                    trailing={
                      <ButtonLink href={chapterLinkHref(c.link, 'practice')} size="sm" variant="soft" data-testid="focus-practise" aria-label={`Practise now: Chapter ${c.number}, ${c.title}`}>
                        Practise now
                      </ButtonLink>
                    }
                  />
                ))}
              </List>
            )}
          </div>
          <div className={s.focusCol} data-testid="focus-strongest">
            <h3 className={s.subTitle}>Your strongest</h3>
            {strongest.length === 0 ? (
              <p className={s.muted}>Reach Proficient in a chapter to see it here.</p>
            ) : (
              <List label="Your strongest chapters">
                {strongest.map((c) => (
                  <ListRow
                    key={c.chapterId}
                    href={chapterLinkHref(c.link)}
                    leading={<IconTile icon="checkCircle" tint="green" size="sm" />}
                    title={`Chapter ${c.number}: ${c.title}`}
                    meta={focusMeta(c)}
                    trailing={<StatusPill tone="success">{MASTERY_LABELS[c.level]}</StatusPill>}
                  />
                ))}
              </List>
            )}
          </div>
        </div>
      )}
    </PageSection>
  );
}

/* ── Activity ─────────────────────────────────────────────────────────────── */

function ActivitySection({ activity, today }: { activity: ReturnType<typeof useActivity>; today: string }) {
  const a = activity.status === 'ready' ? activity.data : null;
  return (
    <PageSection id="activity-title" title="Activity" action={{ href: '/me#activity', label: 'On your profile' }} data-testid="activity-card">
      <Card className={s.activityCard}>
        {activity.status === 'error' ? (
          <p className={s.muted}>Your activity could not load. Try again later.</p>
        ) : !a ? (
          <Skeleton variant="block" height={110} />
        ) : (
          <>
            <ul className={s.streaks} aria-label="Streaks">
              <li data-testid="progress-streak">
                <IconTile icon="flame" tint="orange" size="sm" />
                <span>
                  <b>{a.streak.current}</b> day streak
                </span>
              </li>
              <li>
                <IconTile icon="star" tint="yellow" size="sm" />
                <span>
                  <b>{a.streak.longest}</b> longest
                </span>
              </li>
              <li>
                <IconTile icon="calendar" tint="blue" size="sm" />
                <span>
                  <b>{a.activeDaysAllTime}</b> study {a.activeDaysAllTime === 1 ? 'day' : 'days'}
                </span>
              </li>
            </ul>
            {showHeatmap(a.totals.activeDays) ? (
              <Heatmap activity={a} />
            ) : (
              <div className={s.weekOnly}>
                <WeekStrip days={weekDays(activeDays(a.calendar), today)} label="Study days this week" />
                <p className={s.muted}>Study on 7 different days and your activity calendar appears here.</p>
              </div>
            )}
          </>
        )}
      </Card>
    </PageSection>
  );
}

/* ── Recent activity ──────────────────────────────────────────────────────── */

const RECENT: Record<RecentRow['kind'], { icon: IconName; tint: 'blue' | 'green' | 'pink' | 'yellow' }> = {
  lesson: { icon: 'play', tint: 'blue' },
  practice: { icon: 'target', tint: 'green' },
  test: { icon: 'clock', tint: 'pink' },
  badge: { icon: 'trophy', tint: 'yellow' },
};

function RecentSection({ d }: { d: MyDashboard }) {
  const rows = recentRows(d.recent, d.today);
  return (
    <PageSection id="recent-title" title="Recent activity" data-testid="recent-tile">
      {rows.length === 0 ? (
        <QuietEmpty icon="list" tint="neutral" title="Nothing yet" testId="recent-empty">
          Lessons you finish, practice, tests and badges will be listed here.
        </QuietEmpty>
      ) : (
        <List label="Recent activity">
          {rows.map((r) => (
            <ListRow key={r.id} href={r.href ?? undefined} leading={<IconTile icon={RECENT[r.kind].icon} tint={RECENT[r.kind].tint} size="sm" />} title={r.text} meta={r.when} data-testid={`recent-row-${r.kind}`} />
          ))}
        </List>
      )}
    </PageSection>
  );
}

/* ── Rail: player card, badges, weekly goal ───────────────────────────────── */

function ProgressRail({ d, fresh }: { d: MyDashboard; fresh: boolean }) {
  const card = usePlayerCard();
  const { stage } = useStage();
  const [goal, setGoal] = useState<{ base: WeeklyGoal; value: WeeklyGoal } | null>(null);
  const g = goal?.base === d.weeklyGoal ? goal.value : d.weeklyGoal;
  const next = d.badges.next;
  return (
    <>
      <RailCard id="weekly-goal" title="Weekly goal" aside={<span className={s.railAside}>Monday to Sunday</span>} data-testid="weekly-goal">
        <div className={s.goalBody} data-progress={g.progress} data-target={g.target}>
          {fresh && g.progress === 0 ? (
            <p className={s.goalFresh}>
              <IconTile icon="target" tint="green" size="md" />
              <span>
                <b>{g.target} new questions a week</b>
                <span>{g.isDefault ? 'The starting goal. Change it any time.' : 'Your own goal.'}</span>
              </span>
            </p>
          ) : (
            <GoalRing value={g.progress} target={g.target} unit="questions" size={96} label={`Weekly goal: ${g.progress} of ${g.target} questions solved this week`} title={goalTitle(stage, g)} caption={g.isDefault ? `${goalCaption(stage, g)} The starting goal: change it any time.` : goalCaption(stage, g)} />
          )}
          <WeeklyGoalEditor target={g.target} isDefault={g.isDefault} onSaved={(saved) => setGoal({ base: d.weeklyGoal, value: withTarget(g, saved) })} />
        </div>
      </RailCard>

      <RailCard id="card-title" title="Your player card" action={{ href: '/me#card', label: 'Details' }} data-testid="card-preview">
        <div className={s.cardWrap}>
          {card.status === 'ready' && card.data.attributes.length > 0 ? (
            <PlayerCard card={card.data} compact />
          ) : (
            <BlankPlayerCard compact title={card.status === 'loading' ? 'Loading your card' : card.status === 'error' ? 'Your card could not load' : 'Solve 10 questions to get rated'} />
          )}
        </div>
        <p className={s.railText}>Only you can see your card. It changes as you learn.</p>
      </RailCard>

      <RailCard id="badges-title" title="Badges" aside={<StatusPill tone="neutral">{`${d.badges.earned} of ${d.badges.total}`}</StatusPill>} action={{ href: '/me#badges', label: 'See all' }} data-testid="badge-tile">
        {next ? (
          <div className={s.badgeNext}>
            <div className={s.badgeHead}>
              <BadgeMedal badge={next.key} size={48} decorative />
              <p className={s.badgeText}>
                <span className={s.badgeKicker}>Next badge</span>
                <b>{next.name}</b>
                <span>{next.description}</span>
              </p>
            </div>
            <ProgressBar value={next.current} max={next.target} label={`Progress to ${next.name}`} valueText={`${next.current} of ${next.target}`} />
          </div>
        ) : (
          <p className={s.railText}>You have earned every badge. Amazing work.</p>
        )}
      </RailCard>
    </>
  );
}

'use client';

/**
 * Home's rail cards (design language v3 §10 "Home"): this week's goal with the week strip, upcoming live mocks,
 * the weekly league (top five and You), today's daily challenge. Each card hides itself when it has nothing useful
 * to say (no empty boxes for a new student) and degrades on its own when its request fails.
 */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import type { DailyChallenge, DailyChallengeEntry, LiveEvent, PracticeAnswerResult, Schemas, WeeklyGoal } from '@/platform/shared/api-client';
import { LeagueCrest } from '@/components/platform/ui/art/LeagueCrest';
import { Button } from '@/components/platform/ui/kit/Button';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { GoalRing, WeekStrip, weekDays } from '@/components/platform/ui/kit/Goal';
import { List, ListRow, StatusPill, Timeline } from '@/components/platform/ui/kit/Lists';
import { LeaderboardMini, RailCard } from '@/components/platform/ui/kit/Rail';
import { IconTile } from '@/components/platform/ui/kit/Tiles';
import { useStage } from '../shell/StageProvider';
import { coinsText } from '../coins/coins-format';
import { learnPath, type BoardSlug } from '../lib/catalog';
import type { Loadable } from '../learn/useInsights';
import { goalCaption, goalTitle, leagueRows, upcomingMocks, weekRange, ZONE_TEXT } from './home-model';
import s from './home.module.css';

const ChallengeSolver = dynamic(() => import('../coins/ChallengeSolver').then((m) => m.ChallengeSolver), { ssr: false });

type LeagueCurrent = Schemas['LeagueCurrent'];

/* ── This week's goal ─────────────────────────────────────────────────────── */

export function GoalCard({ goal, fresh, active, today }: { goal: WeeklyGoal; fresh: boolean; active: string[] | null; today: string }) {
  const { pick, stage } = useStage();
  return (
    <RailCard
      id="goal-title"
      title="This week’s goal"
      aside={<span className={s.railAside}>{weekRange(goal.weekStart, goal.weekEnd)}</span>}
      action={{ href: '/me/progress#weekly-goal', label: 'Change' }}
      data-testid="today-goal"
    >
      <div className={s.goalBody} data-progress={goal.progress} data-target={goal.target}>
        {fresh ? (
          <div className={s.goalFresh}>
            <IconTile icon="target" tint="green" size="lg" />
            <p className={s.goalFreshText}>
              <b>Solve {goal.target} new practice questions</b>
              <span>
                {pick({
                  junior: 'Your ring starts filling with your first right answer.',
                  middle: 'Your ring fills in as you practise.',
                  senior: 'The ring tracks first-time solves, Monday to Sunday.',
                })}
              </span>
            </p>
          </div>
        ) : (
          <GoalRing
            value={goal.progress}
            target={goal.target}
            unit="questions"
            label={`Weekly goal: ${goal.progress} of ${goal.target} questions solved this week`}
            title={goalTitle(stage, goal)}
            caption={goalCaption(stage, goal)}
          />
        )}
        {!fresh && active !== null && <WeekStrip days={weekDays(active, today)} label="Study days this week" />}
      </div>
    </RailCard>
  );
}

/* ── Upcoming live mocks ──────────────────────────────────────────────────── */

export function UpcomingCard({ events, now }: { events: Loadable<LiveEvent[]>; now: number | null }) {
  if (events.status !== 'ready' || now === null) return null;
  const items = upcomingMocks(events.data, now, 2);
  if (items.length === 0) return null;
  return (
    <RailCard id="live-title" title="Upcoming live mocks" action={{ href: '/tests', label: 'All tests' }} data-testid="home-live">
      <Timeline
        label="Upcoming live mocks"
        items={items.map((m) => ({
          id: m.id,
          time: m.time,
          timeSub: m.timeSub,
          title: m.title,
          meta: m.meta,
          href: m.href,
          tint: m.tint,
          status: m.status ? <StatusPill tone={m.status.tone}>{m.status.text}</StatusPill> : undefined,
        }))}
      />
    </RailCard>
  );
}

/* ── Weekly league ────────────────────────────────────────────────────────── */

export function LeagueCard({ league }: { league: Loadable<LeagueCurrent> }) {
  if (league.status === 'loading') {
    return (
      <RailCard id="league-title" title="Weekly league" data-testid="league-card">
        <Skeleton lines={3} />
      </RailCard>
    );
  }
  if (league.status !== 'ready') return null;
  const l = league.data;
  // class_required: the class prompt at the top of Home already says the class picks the league.
  if (l.status !== 'active' || !l.league || l.standings.length === 0) return null;
  const rows = leagueRows(l);
  return (
    <RailCard
      id="league-title"
      title="Weekly league"
      aside={
        <span className={s.tier} data-tier={l.league.tier.key}>
          <LeagueCrest level={l.league.tier.level} size={20} decorative />
          {l.league.tier.name}
        </span>
      }
      action={{ href: '/leaderboard', label: 'See all' }}
      data-testid="league-card"
    >
      <LeaderboardMini label="Top five this week" rows={rows} unit="XP" />
      {l.me && (
        <p className={s.railText}>
          You are <b>#{l.me.rank}</b> with {l.me.xp.toLocaleString('en-IN')} XP · {ZONE_TEXT[l.me.zone]}
        </p>
      )}
    </RailCard>
  );
}

/** Only if CONSENT_REQUIRED.leaderboards is switched back on: no league request, and how to unlock it. */
export function LeagueLocked() {
  return (
    <RailCard id="league-title" title="Weekly league" data-testid="league-locked">
      <p className={s.railText}>Leagues and leaderboards open after a parent approves (or you confirm you are 18 or older).</p>
      <Link href="/me/consent?next=%2Fme%2Fdashboard" className={s.textLink}>
        How to unlock
      </Link>
    </RailCard>
  );
}

/* ── Daily challenge (the next reward) ───────────────────────────────────── */

const SHOWN = 3;

export function ChallengeCard({ data, board, classLevel }: { data: Loadable<DailyChallenge>; board: BoardSlug; classLevel: number }) {
  const [open, setOpen] = useState<DailyChallengeEntry | null>(null);
  const [solvedNow, setSolvedNow] = useState<Record<string, boolean>>({});
  const [earnedNow, setEarnedNow] = useState(0);
  const onAnswered = useCallback((entry: DailyChallengeEntry, r: PracticeAnswerResult) => {
    if (r.correct === true) setSolvedNow((m) => ({ ...m, [entry.question.id]: true }));
    const paid = (r.coinAwards ?? []).filter((a) => a.source === 'daily_challenge').reduce((n, a) => n + a.amount, 0);
    if (paid > 0) setEarnedNow((n) => n + 1);
  }, []);
  if (data.status !== 'ready' || data.data.status !== 'ok' || data.data.challenges.length === 0) return null;
  const d = data.data;
  const earned = (d.earnedToday ?? 0) + earnedNow;
  const done = earned >= d.awardsPerDay;
  const list = d.challenges.slice(0, SHOWN);
  return (
    <RailCard
      id="challenge-title"
      title="Daily challenge"
      tint="yellow"
      aside={<StatusPill tone="highlight">+{coinsText(d.coins)}</StatusPill>}
      action={d.challenges.length > SHOWN ? { href: learnPath(board, classLevel), label: 'All subjects' } : undefined}
      data-testid="home-challenge"
    >
      <p className={s.railText} aria-live="polite" data-earned={done ? 'true' : 'false'}>
        {done ? 'You earned today’s challenge coins. The other questions are still good practice.' : `Get any one right today for +${coinsText(d.coins)}. New questions every day.`}
      </p>
      <List label="Today’s challenge questions" className={s.challengeList}>
        {list.map((c) => {
          const solved = solvedNow[c.question.id] === true || c.solved === true;
          return (
            <ListRow
              key={c.question.id}
              title={c.subjectName}
              meta={c.chapterTitle}
              trailing={
                solved ? (
                  <StatusPill tone="success">Solved</StatusPill>
                ) : (
                  <Button size="sm" variant="soft" onClick={() => setOpen(c)} aria-label={`Solve: ${c.subjectName} daily challenge`}>
                    Solve
                  </Button>
                )
              }
            />
          );
        })}
      </List>
      {open && (
        <ChallengeSolver
          entry={open}
          practiceHref={`${learnPath(board, classLevel, open.subjectId, open.chapterId)}/practice`}
          onClose={() => setOpen(null)}
          onAnswered={(r) => onAnswered(open, r)}
        />
      )}
    </RailCard>
  );
}

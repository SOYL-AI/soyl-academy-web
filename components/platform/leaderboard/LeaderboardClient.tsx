'use client';

/**
 * /leaderboard (ARCHITECTURE §3.1, §12; CONTEXT §11; D-052; design language v3, ADR-032 §10 "Leaderboard").
 * Leaderboards need no approval since D-052: every member sees them (auto-generated public names only, D-039). The
 * consent-needed state remains for the case where CONSENT_REQUIRED.leaderboards is switched back on.
 * - Header: "Weekly league" with the tier crest (once the league loads).
 * - Weekly league (ADR-023): GET /v1/leagues/current as a tiered league with a podium, LeaderboardMini-style rows and
 *   promotion / relegation zones as status pills (WeeklyLeague).
 * - All-India mock ranks: the live events the student took (GET /v1/me/attempts → liveEventId) and the current
 *   events, each with its leaderboard.
 * - Rail: upcoming live mocks (Timeline) and how leagues work. Guests get the explanation and a Log in button (the
 *   platform's login is a sheet opened in place, not a page, so it is a Button, like the top bar's Log in).
 */
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import type { LiveEvent, MyAttempt } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { GreetingHeader } from '@/components/platform/ui/kit/Greeting';
import { StatusPill, Timeline } from '@/components/platform/ui/kit/Lists';
import { PageColumns, PageSection } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { LeagueCrest } from '@/components/platform/ui/art/LeagueCrest';
import { consentAllows } from '@/platform/shared/config/consent';
import { useSession } from '../auth/SessionProvider';
import { AiNotice } from '../ai/AiDialogs';
import { api } from '../lib/api-browser';
import { useStage } from '../shell/StageProvider';
import { Leaderboard } from '../tests/LiveEventClient';
import { LIVE_PHASE_LABELS } from '../tests/player-model';
import { useLeague, weekEndsIn, WeeklyLeague, type LeagueState } from './WeeklyLeague';
import s from './league.module.css';

import { liveEventItem, PHASE_TONES } from '../tests/live-timeline';

/** Re-exported for older imports: the Timeline item lives with the tests (the Tests hub shows the same mocks). */
export { liveEventItem };

function Header({ league, now, subtitle }: { league?: LeagueState; now?: number | null; subtitle?: ReactNode }) {
  const { pick } = useStage();
  const L = league && league !== 'error' ? league.league : null;
  const ends = league && league !== 'error' && L ? weekEndsIn(league, now ?? null) : null;
  const sub =
    subtitle ??
    (L
      ? `${L.tier.name} league · Division ${L.division}${ends ? ` · ends in ${ends}` : ''}. ${pick({ junior: 'Every lesson and question you finish adds XP.', middle: 'XP from lessons, practice and tests counts.', senior: 'XP from this week’s learning only.' })}`
      : 'Weekly leagues for your class and All-India mock ranks.');
  return (
    <GreetingHeader
      title="Weekly league"
      subtitle={sub}
      aside={
        L ? (
          <span className={s.crest} data-testid="league-crest">
            <LeagueCrest level={L.tier.level} size={72} decorative />
            <span className="p-visually-hidden">{L.tier.name} tier</span>
          </span>
        ) : undefined
      }
    />
  );
}

function HowLeaguesWork() {
  return (
    <RailCard id="how-leagues" title="How leagues work">
      <ul className={s.how}>
        <li>You play against students of your class in a small division.</li>
        <li>XP comes only from learning: lessons, practice and tests. Nothing is bought.</li>
        <li>When the week ends (India time), the top places move up a tier and the bottom places move down.</li>
        <li>Everyone appears under an auto-generated name, never a real name.</li>
      </ul>
    </RailCard>
  );
}

export function LeaderboardClient() {
  const { state, openLogin } = useSession();
  const [events, setEvents] = useState<LiveEvent[] | null>(null);
  const [mine, setMine] = useState<MyAttempt[]>([]);
  const member = state.status === 'member';
  const consent = member && consentAllows(state.consent, 'leaderboards');
  const { league, now } = useLeague(consent);

  useEffect(() => {
    if (!consent) return;
    let alive = true;
    Promise.all([api.get('/v1/live-events').catch(() => ({ events: [] as LiveEvent[] })), api.get('/v1/me/attempts', { query: { limit: 50 } }).catch(() => ({ attempts: [] as MyAttempt[] }))]).then(([ev, at]) => {
      if (!alive) return;
      setEvents(ev.events);
      setMine(at.attempts.filter((a) => a.liveEventId));
    });
    return () => {
      alive = false;
    };
  }, [consent]);

  if (state.status === 'loading') {
    return (
      <div className={s.stack}>
        <Header />
        <div aria-busy="true" aria-label="Loading leaderboards">
          <Skeleton variant="block" height={220} />
        </div>
      </div>
    );
  }
  if (state.status === 'guest') {
    return (
      <div className={s.stack}>
        <Header subtitle="Weekly leagues for your class and All-India mock ranks. Free for every logged-in student." />
        <PageColumns rail={<HowLeaguesWork />} railLabel="About leagues">
          <div className={s.guest}>
            <EmptyState
              title="Log in to join your weekly league"
              headingLevel="h2"
              tint="yellow"
              art={<LeagueCrest level={1} size={72} decorative />}
              action={
                <Button icon="trophy" onClick={() => openLogin({ returnTo: '/leaderboard', reason: 'Log in to join your weekly league. It is free.' })}>
                  Log in
                </Button>
              }
            >
              Earn XP from lessons, practice and tests, climb your division and move up a tier each week. Leaderboards show an auto-generated name for each student, never a real name.
            </EmptyState>
          </div>
        </PageColumns>
      </div>
    );
  }
  if (!consent) {
    return (
      <div className={s.stack}>
        <Header />
        <div data-testid="leaderboard-consent">
          <AiNotice block={{ kind: 'consent' }} feature="Leaderboards and leagues" />
        </div>
      </div>
    );
  }

  const taken = new Set(mine.map((a) => a.liveEventId));
  const shown = (events ?? []).filter((e) => taken.has(e.id) || e.phase === 'live' || e.phase === 'writing' || e.phase === 'results_published');
  const upcoming = (events ?? []).filter((e) => e.phase === 'upcoming' || e.phase === 'registration_open');

  const rail = (
    <>
      <RailCard id="upcoming-title" title="Coming up" action={{ href: '/tests', label: 'All tests' }} data-testid="upcoming-mocks">
        {events === null ? (
          <Skeleton lines={2} />
        ) : upcoming.length === 0 ? (
          <p className={s.muted}>No live mocks are scheduled right now. New ones appear here.</p>
        ) : (
          <Timeline label="Upcoming live mocks" items={upcoming.map(liveEventItem)} />
        )}
      </RailCard>
      <HowLeaguesWork />
    </>
  );

  return (
    <div className={s.stack} data-testid="leaderboards">
      <Header league={league} now={now} />
      <PageColumns rail={rail} railLabel="Live mocks and league rules">
        <WeeklyLeague league={league} now={now} />

        <PageSection id="mock-ranks" title="All-India mock ranks" count={shown.length > 0 ? shown.length : undefined} description="Ranks use auto-graded marks only.">
          {events === null ? (
            <Skeleton lines={3} />
          ) : shown.length === 0 ? (
            <EmptyState title="No ranked mocks yet" icon="trophy" tint="pink" compact>
              Register for a live mock under Coming up. Your rank shows here after it.
            </EmptyState>
          ) : (
            <div className={s.mocks}>
              {shown.map((e) => (
                <div key={e.id} className={s.mock}>
                  <p className={s.mockHead}>
                    <Link href={`/tests/live/${encodeURIComponent(e.id)}`} className={s.mockLink}>
                      {e.title}
                    </Link>
                    <span className={s.mockMeta}>
                      {e.subject.name} <StatusPill tone={PHASE_TONES[e.phase] ?? 'neutral'}>{LIVE_PHASE_LABELS[e.phase] ?? e.phase}</StatusPill>
                    </span>
                  </p>
                  <Leaderboard eventId={e.id} compact />
                </div>
              ))}
            </div>
          )}
        </PageSection>
      </PageColumns>
    </div>
  );
}

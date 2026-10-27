'use client';

/**
 * /leaderboard (ARCHITECTURE §3.1, §12; CONTEXT §11; D-014). Leaderboards need a parent's approval: until
 * then a friendly consent-needed state (production today: CONSENT_PROVIDER=unavailable → everyone sees it).
 * - All-India mock ranks: the live events the student took (GET /v1/me/attempts → liveEventId) and the
 *   current events, each with its consent-gated leaderboard.
 * - Weekly leagues (class / school / city): the API has no league endpoint yet (handoff gap), so the
 *   section explains what is coming instead of showing an empty table.
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { LiveEvent, MyAttempt } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, Card, CardTitle, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { useSession } from '../auth/SessionProvider';
import { AiNotice } from '../ai/AiDialogs';
import { api } from '../lib/api-browser';
import { Leaderboard } from '../tests/LiveEventClient';
import { LIVE_PHASE_LABELS } from '../tests/player-model';
import { istDateTime } from '../tests/timer';
import s from '../tests/tests.module.css';

export function LeaderboardClient() {
  const { state, openLogin } = useSession();
  const [events, setEvents] = useState<LiveEvent[] | null>(null);
  const [mine, setMine] = useState<MyAttempt[]>([]);
  const member = state.status === 'member';
  const consent = member && state.consent === 'granted';

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

  if (state.status === 'loading') return <Skeleton lines={3} />;
  if (state.status === 'guest') {
    return (
      <EmptyState title="Log in to see leaderboards" headingLevel="h2" icon="trophy" action={<Button onClick={() => openLogin()}>Log in</Button>}>
        Leaderboards show first name and last initial only.
      </EmptyState>
    );
  }
  if (!consent) {
    return (
      <div className={s.stack} data-testid="leaderboard-consent">
        <AiNotice block={{ kind: 'consent' }} feature="Leaderboards and leagues" />
      </div>
    );
  }

  const taken = new Set(mine.map((a) => a.liveEventId));
  const shown = (events ?? []).filter((e) => taken.has(e.id) || e.phase === 'live' || e.phase === 'writing' || e.phase === 'results_published');
  const upcoming = (events ?? []).filter((e) => e.phase === 'upcoming' || e.phase === 'registration_open');

  return (
    <div className={s.stack} data-testid="leaderboards">
      <Card as="section" aria-labelledby="leagues-title">
        <CardTitle as="h2" id="leagues-title">
          Weekly leagues <Badge>Coming soon</Badge>
        </CardTitle>
        <p className={s.muted}>Earn XP from lessons, practice and tests. Weekly leagues for your class start soon (school and city leagues are opt-in).</p>
      </Card>

      <section aria-labelledby="mock-ranks">
        <h2 id="mock-ranks" className={s.sectionHeading}>
          All-India mock ranks
        </h2>
        {events === null ? (
          <Skeleton lines={3} />
        ) : shown.length === 0 ? (
          <p className={s.muted}>No ranked mocks yet. Register for the next one below.</p>
        ) : (
          <div className={s.stack}>
            {shown.map((e) => (
              <div key={e.id}>
                <p className={s.meta}>
                  <Link href={`/tests/live/${encodeURIComponent(e.id)}`}>{e.title}</Link> · {e.subject.name} · {LIVE_PHASE_LABELS[e.phase] ?? e.phase}
                </p>
                <Leaderboard eventId={e.id} compact />
              </div>
            ))}
          </div>
        )}
      </section>

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-title">
          <h2 id="upcoming-title" className={s.sectionHeading}>
            Coming up
          </h2>
          <ul className={s.cards}>
            {upcoming.map((e) => (
              <li key={e.id}>
                <Link href={`/tests/live/${encodeURIComponent(e.id)}`} className={s.linkCard}>
                  <span className={s.linkTitle}>{e.title}</span>
                  <span className={s.meta}>
                    {e.subject.name} · {istDateTime(e.startsAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

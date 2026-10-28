'use client';

/**
 * Compact teasers on the dashboard: the private player card (→ /me) and the weekly league (→ /leaderboard).
 * The league is consent-gated (D-014): without consent no league request is made and the tile explains how to
 * unlock it. (Moved here from the /learn home, ADR-023.)
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { MyPlayerCard, Schemas } from '@/platform/shared/api-client';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { api } from '../lib/api-browser';
import type { Loadable } from '../learn/useInsights';
import { BlankPlayerCard, PlayerCard } from '../me/PlayerCard';
import s from './dashboard.module.css';

type LeagueCurrent = Schemas['LeagueCurrent'];

export function CardTeaser({ card }: { card: Loadable<MyPlayerCard> }) {
  return (
    <Link href="/me#card" className={s.teaser} data-testid="card-preview">
      {card.status === 'ready' && card.data.attributes.length > 0 ? (
        <PlayerCard card={card.data} compact />
      ) : (
        <BlankPlayerCard compact title={card.status === 'loading' ? 'Loading your card' : 'Solve 10 questions to get rated'} />
      )}
      <span className={s.more}>
        Your player card <Icon name="chevronRight" size={16} />
      </span>
    </Link>
  );
}

const ZONE_TEXT = { promotion: 'Promotion zone', safe: 'Safe', relegation: 'Relegation zone' } as const;

export function LeagueTeaser() {
  const [league, setLeague] = useState<LeagueCurrent | null | 'error'>(null);
  useEffect(() => {
    let alive = true;
    api
      .get('/v1/leagues/current')
      .then((l) => alive && setLeague(l))
      .catch(() => alive && setLeague('error'));
    return () => {
      alive = false;
    };
  }, []);
  return (
    <Link href="/leaderboard" className={`${s.teaser} ${s.teaserLeft}`} data-testid="league-card">
      <h2 className={s.tileTitle}>Weekly league</h2>
      {league === null ? (
        <Skeleton lines={2} />
      ) : league === 'error' || league.status !== 'active' || !league.league ? (
        <p className={s.muted}>{league !== 'error' && league.status === 'class_required' ? 'Set your class to join a league.' : 'Earn XP this week to climb your league.'}</p>
      ) : (
        <>
          <p className={s.leagueTier} data-tier={league.league.tier.key}>
            <Icon name="trophy" size={22} /> {league.league.tier.name}
          </p>
          {league.me ? (
            <p className={s.muted}>
              Rank <b className={s.ink}>#{league.me.rank}</b> · {league.me.xp} XP · {ZONE_TEXT[league.me.zone]}
            </p>
          ) : (
            <p className={s.muted}>Earn XP to appear in the standings.</p>
          )}
        </>
      )}
      <span className={s.more}>
        Leaderboard <Icon name="chevronRight" size={16} />
      </span>
    </Link>
  );
}

export function LeagueLocked() {
  return (
    <div className={`${s.teaser} ${s.teaserLeft}`} data-testid="league-locked">
      <h2 className={s.tileTitle}>Weekly league</h2>
      <p className={s.muted}>Leagues and leaderboards open after a parent approves (or you confirm you are 18 or older).</p>
      <Link href="/me/consent?next=%2Fme%2Fdashboard" className={s.more}>
        How to unlock
      </Link>
    </div>
  );
}

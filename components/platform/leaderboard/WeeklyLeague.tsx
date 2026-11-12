'use client';

/**
 * Weekly league (ADR-023; design language v3, ADR-032; GET /v1/leagues/current, no consent needed D-052): the
 * week's countdown and rules, a podium for the top three and the division standings as LeaderboardMini-style rows
 * (rank, animal avatar, name, XP; the student's own row highlighted and labelled "You" in words), grouped by the
 * promotion / safe / relegation zones with a StatusPill per zone. Names are the auto-generated public names (D-039).
 * XP comes only from learning; nothing here is random or bought. The page header (LeaderboardClient) shows the tier
 * crest, so the data is loaded once by `useLeague()` and passed in.
 */
import { useEffect, useState, type ReactNode } from 'react';
import type { Schemas } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Card, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { AnimalAvatar } from '@/components/platform/ui/kit/AnimalAvatar';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { StatusPill, type StatusTone } from '@/components/platform/ui/kit/Lists';
import { api } from '../lib/api-browser';
import { formatSpan } from '../coins/coins-format';
import s from './league.module.css';

export type League = Schemas['LeagueCurrent'];
type Standing = League['standings'][number];
type Zone = Standing['zone'];

export const ZONE_LABELS: Record<Zone, string> = { promotion: 'Promotion zone', safe: 'Safe zone', relegation: 'Relegation zone' };
export const ZONE_TONES: Record<Zone, StatusTone> = { promotion: 'success', safe: 'neutral', relegation: 'danger' };

/** Rows with a divider wherever the zone changes (pure; tested). */
export function zoneRows(standings: readonly Standing[]): Array<{ kind: 'row'; s: Standing } | { kind: 'divider'; zone: Zone }> {
  const out: Array<{ kind: 'row'; s: Standing } | { kind: 'divider'; zone: Zone }> = [];
  let prev: Zone | null = null;
  for (const st of standings) {
    if ((prev === null && st.zone === 'promotion') || (prev !== null && st.zone !== prev)) out.push({ kind: 'divider', zone: st.zone });
    out.push({ kind: 'row', s: st });
    prev = st.zone;
  }
  return out;
}

/** The standings split into zone groups (pure; tested). A group's `zone` is null when the list does not start in a
 *  labelled zone (no promotion places): those rows are shown without a pill, as zoneRows() puts no divider there. */
export function zoneGroups(standings: readonly Standing[]): Array<{ zone: Zone | null; rows: Standing[] }> {
  const groups: Array<{ zone: Zone | null; rows: Standing[] }> = [];
  for (const r of zoneRows(standings)) {
    if (r.kind === 'divider') groups.push({ zone: r.zone, rows: [] });
    else {
      if (groups.length === 0) groups.push({ zone: null, rows: [] });
      groups[groups.length - 1]!.rows.push(r.s);
    }
  }
  return groups.filter((g) => g.rows.length > 0);
}

/** "Top 5 move up (at least 50 XP). Bottom 3 move down." (pure; tested). */
export function leagueRules(L: NonNullable<League['league']>): string {
  const up = L.isTopTier
    ? 'Top tier: stay at the top.'
    : L.promotionPlaces > 0
      ? `Top ${L.promotionPlaces} move up${L.minXpToPromote > 0 ? ` (at least ${L.minXpToPromote.toLocaleString('en-IN')} XP)` : ''}.`
      : 'Promotion places open as more students join your division.';
  return L.relegationPlaces > 0 ? `${up} Bottom ${L.relegationPlaces} move down.` : up;
}

export type LeagueState = League | null | 'error';

/** GET /v1/leagues/current once; `now` is the server's clock at load (for the week countdown). */
export function useLeague(enabled = true): { league: LeagueState; now: number | null } {
  const [league, setLeague] = useState<LeagueState>(null);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    api
      .get('/v1/leagues/current')
      .then((l) => {
        if (!alive) return;
        setLeague(l);
        setNow(Date.parse(l.serverNow));
      })
      .catch(() => alive && setLeague('error'));
    return () => {
      alive = false;
    };
  }, [enabled]);
  return { league, now };
}

/** "3d 4h" until the IST week ends, or null before the clock is known. */
export function weekEndsIn(league: League, now: number | null): string | null {
  return now !== null ? formatSpan(Date.parse(league.week.endsAt) - now) : null;
}

const MEDAL: Record<number, string> = { 1: 'gold', 2: 'silver', 3: 'bronze' };

function Notice({ title, children, testId }: { title: string; children: ReactNode; testId?: string }) {
  return (
    <Card as="section" aria-labelledby="league-title" className={s.notice} data-testid={testId}>
      <h2 id="league-title" className={s.title}>
        {title}
      </h2>
      {children}
    </Card>
  );
}

export function WeeklyLeague({ league, now }: { league: LeagueState; now: number | null }) {
  if (league === null) {
    return (
      <div aria-busy="true" aria-label="Loading your league">
        <Skeleton variant="block" height={260} />
      </div>
    );
  }
  if (league === 'error') {
    return (
      <Notice title="This week’s standings">
        <p className={s.muted}>We could not load your league. Try again later.</p>
      </Notice>
    );
  }
  if (league.status === 'class_required') {
    return (
      <Notice title="Choose your class to join a league" testId="league-class-required">
        <p className={s.muted}>Leagues are for your class. Choose your board and class first.</p>
        <div>
          <ButtonLink href="/me" variant="soft" size="sm">
            Set my class
          </ButtonLink>
        </div>
      </Notice>
    );
  }
  if (league.status === 'students_only' || !league.league) {
    return (
      <Notice title="This week’s standings">
        <p className={s.muted}>{league.status === 'students_only' ? 'Leagues are for student accounts.' : 'You join a league when you earn your first XP this week.'}</p>
      </Notice>
    );
  }

  const L = league.league;
  const endsIn = weekEndsIn(league, now);
  const top = league.standings.slice(0, 3);
  return (
    <section className={s.league} data-tier={L.tier.key} aria-labelledby="league-title" data-testid="weekly-league">
      <div className={s.head}>
        <div className={s.headBody}>
          <h2 id="league-title" className={s.title}>
            {L.tier.name} league <span className={s.division}>Division {L.division}</span>
          </h2>
          <p className={s.muted}>
            {endsIn ? `Week ends in ${endsIn}. ` : ''}
            {leagueRules(L)}
          </p>
        </div>
        {league.me && (
          <p className={s.me} data-zone={league.me.zone} data-testid="league-me">
            <span className={s.meLabel}>Your place</span>
            <span className={s.meRank}>
              <span className="p-visually-hidden">Rank </span>#{league.me.rank}
            </span>
            <span className={s.meXp}>{league.me.xp.toLocaleString('en-IN')} XP</span>
            <StatusPill tone={ZONE_TONES[league.me.zone]}>{ZONE_LABELS[league.me.zone]}</StatusPill>
          </p>
        )}
      </div>

      {league.lastWeek?.outcome && (
        <p className={s.lastWeek} data-outcome={league.lastWeek.outcome}>
          Last week: {league.lastWeek.outcome === 'promoted' ? `promoted from ${league.lastWeek.tier.name}` : league.lastWeek.outcome === 'relegated' ? `moved down from ${league.lastWeek.tier.name}` : `stayed in ${league.lastWeek.tier.name}`}
          {league.lastWeek.finalRank ? ` (finished #${league.lastWeek.finalRank})` : ''}.
        </p>
      )}

      {top.length >= 3 ? (
        <ol className={s.podium} aria-label="Top three">
          {top.map((p) => (
            <li key={p.rank} className={cx(s.place, p.isMe && s.placeMe)} data-place={p.rank}>
              <span className={s.podiumAvatar}>
                <AnimalAvatar avatar={p.avatar} size={p.rank === 1 ? 64 : 48} ring={p.rank === 1 ? 'gold' : p.rank === 2 ? 'silver' : 'bronze'} decorative />
                <span className={s.medal} aria-hidden="true">
                  {p.rank}
                </span>
              </span>
              <span className={s.placeName}>{p.isMe ? 'You' : (p.name ?? 'A student')}</span>
              <span className={s.placeXp}>{p.xp.toLocaleString('en-IN')} XP</span>
              <span className={s.plinth} aria-hidden="true" />
            </li>
          ))}
        </ol>
      ) : league.standings.length > 0 ? null : (
        <EmptyState title="Nobody has XP yet this week" headingLevel="h3" icon="trophy" tint="yellow" compact>
          Finish a lesson or practise to take the lead.
        </EmptyState>
      )}

      {league.standings.length > 0 && (
        <div className={s.standings} role="group" aria-label="Division standings this week" data-testid="league-standings">
          {zoneGroups(league.standings).map((g, i) => (
            <div key={`${g.zone ?? 'top'}-${i}`} className={s.zone} data-zone={g.zone ?? undefined}>
              {g.zone && (
                <p className={s.zoneHead}>
                  <StatusPill tone={ZONE_TONES[g.zone]} dot>
                    {ZONE_LABELS[g.zone]}
                  </StatusPill>
                </p>
              )}
              <ol className={s.rows} aria-label={g.zone ? ZONE_LABELS[g.zone] : 'Standings'}>
                {g.rows.map((r) => (
                  <li key={r.rank} className={s.row} data-zone={r.zone} data-you={r.isMe || undefined} aria-current={r.isMe ? 'true' : undefined} data-testid="league-row">
                    <span className={s.rank} data-medal={MEDAL[r.rank]}>
                      <span className="p-visually-hidden">Rank </span>
                      {r.rank}
                    </span>
                    <AnimalAvatar avatar={r.avatar} size={36} decorative />
                    <span className={s.name}>
                      {r.isMe ? (
                        <>
                          <b>You</b>
                          <span className={s.realName}> · {r.name ?? 'A student'}</span>
                        </>
                      ) : (
                        (r.name ?? 'A student')
                      )}
                    </span>
                    <span className={s.xp}>
                      {r.xp.toLocaleString('en-IN')} <span className={s.unit}>XP</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

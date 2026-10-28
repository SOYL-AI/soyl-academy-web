'use client';

/**
 * Weekly league (ADR-023, FIFA Ultimate Team / Duolingo style; GET /v1/leagues/current, consent-gated D-014):
 * a tier crest, the week's countdown, a podium for the top three and the division standings with promotion and
 * relegation zones. Names are the auto-generated public names (D-039). XP comes only from learning; nothing
 * here is random or bought.
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Schemas } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Card, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { api } from '../lib/api-browser';
import { formatSpan } from '../coins/coins-logic';
import s from './league.module.css';

type League = Schemas['LeagueCurrent'];
type Standing = League['standings'][number];

export const ZONE_LABELS: Record<Standing['zone'], string> = { promotion: 'Promotion zone', safe: 'Safe zone', relegation: 'Relegation zone' };

/** Rows with a divider wherever the zone changes (pure; tested). */
export function zoneRows(standings: readonly Standing[]): Array<{ kind: 'row'; s: Standing } | { kind: 'divider'; zone: Standing['zone'] }> {
  const out: Array<{ kind: 'row'; s: Standing } | { kind: 'divider'; zone: Standing['zone'] }> = [];
  let prev: Standing['zone'] | null = null;
  for (const st of standings) {
    if ((prev === null && st.zone === 'promotion') || (prev !== null && st.zone !== prev)) out.push({ kind: 'divider', zone: st.zone });
    out.push({ kind: 'row', s: st });
    prev = st.zone;
  }
  return out;
}

export function WeeklyLeague() {
  const [league, setLeague] = useState<League | null | 'error'>(null);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
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
  }, []);

  if (league === null) return <Skeleton variant="block" height={220} />;
  if (league === 'error') {
    return (
      <Card as="section" aria-labelledby="league-title">
        <h2 id="league-title" className={s.title}>
          Weekly league
        </h2>
        <p className={s.muted}>We could not load your league. Try again later.</p>
      </Card>
    );
  }
  if (league.status === 'class_required') {
    return (
      <Card as="section" aria-labelledby="league-title" data-testid="league-class-required">
        <h2 id="league-title" className={s.title}>
          Weekly league
        </h2>
        <p className={s.muted}>Leagues are for your class. Choose your board and class first.</p>
        <Link href="/me" className={s.link}>
          Set my class
        </Link>
      </Card>
    );
  }
  if (league.status === 'students_only' || !league.league) {
    return (
      <Card as="section" aria-labelledby="league-title">
        <h2 id="league-title" className={s.title}>
          Weekly league
        </h2>
        <p className={s.muted}>{league.status === 'students_only' ? 'Leagues are for student accounts.' : 'You join a league when you earn your first XP this week.'}</p>
      </Card>
    );
  }

  const L = league.league;
  const endsIn = now !== null ? formatSpan(Date.parse(league.week.endsAt) - now) : null;
  const top = league.standings.slice(0, 3);
  return (
    <section className={s.league} data-tier={L.tier.key} aria-labelledby="league-title" data-testid="weekly-league">
      <header className={s.head}>
        <span className={s.crest} aria-hidden="true">
          <Icon name="shield" size={34} />
          <span className={s.crestLevel}>{L.tier.level}</span>
        </span>
        <div className={s.headBody}>
          <h2 id="league-title" className={s.title}>
            {L.tier.name} league <span className={s.division}>Division {L.division}</span>
          </h2>
          <p className={s.muted}>
            {endsIn ? `Week ends in ${endsIn}. ` : ''}
            {L.isTopTier ? 'Top tier: stay at the top. ' : L.promotionPlaces > 0 ? `Top ${L.promotionPlaces} move up${L.minXpToPromote > 0 ? ` (at least ${L.minXpToPromote} XP)` : ''}. ` : 'Promotion places open as more students join your division. '}
            {L.relegationPlaces > 0 ? `Bottom ${L.relegationPlaces} move down.` : ''}
          </p>
        </div>
        {league.me && (
          <p className={s.me} data-zone={league.me.zone} data-testid="league-me">
            <span className={s.meRank}>#{league.me.rank}</span>
            <span>
              {league.me.xp} XP · {ZONE_LABELS[league.me.zone]}
            </span>
          </p>
        )}
      </header>

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
              <span className={s.medal} aria-hidden="true">
                {p.rank}
              </span>
              <span className={s.placeName}>{p.isMe ? 'You' : (p.name ?? 'A student')}</span>
              <span className={s.placeXp}>{p.xp} XP</span>
              <span className={s.plinth} aria-hidden="true" />
            </li>
          ))}
        </ol>
      ) : league.standings.length > 0 ? null : (
        <EmptyState title="Nobody has XP yet this week" headingLevel="h3" icon="trophy">
          Finish a lesson or practise to take the lead.
        </EmptyState>
      )}

      {league.standings.length > 0 && (
        <table className={s.table}>
          <caption className="p-visually-hidden">Division standings this week</caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Student</th>
              <th scope="col">XP</th>
            </tr>
          </thead>
          <tbody>
            {zoneRows(league.standings).map((r, i) =>
              r.kind === 'divider' ? (
                <tr key={`d${i}`} className={s.divider} data-zone={r.zone}>
                  <td colSpan={3}>{ZONE_LABELS[r.zone]}</td>
                </tr>
              ) : (
                <tr key={r.s.rank} className={cx(s.row, r.s.isMe && s.rowMe)} data-zone={r.s.zone} aria-current={r.s.isMe ? 'true' : undefined}>
                  <td className={s.rank}>{r.s.rank}</td>
                  <td>
                    {r.s.name ?? 'A student'}
                    {r.s.isMe && <span className={s.you}> (you)</span>}
                  </td>
                  <td className={s.xp}>{r.s.xp}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}

/**
 * Right-rail cards (design language v3, ADR-032). Server-safe.
 *
 * - RailCard: a titled card for the right rail (and for the stacked column on phones): today's goal, league,
 *   next reward, upcoming live mocks. Optional tint and a "See all" link.
 * - LeaderboardMini: the top of a league with animal avatars, medals for 1–3 and the student's own row
 *   highlighted and labelled "You" (in words, not only colour).
 */
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../cx';
import { AnimalAvatar, type AvatarValue } from './AnimalAvatar';
import { Icon } from './Icon';
import type { Tint } from './tints';
import s from './Rail.module.css';

export interface RailCardProps {
  title: ReactNode;
  /** Heading id (labels the section). */
  id: string;
  children: ReactNode;
  action?: { href: string; label: string };
  /** A small node beside the title (a StatusPill, a period "This week"). */
  aside?: ReactNode;
  tint?: Tint;
  headingLevel?: 'h2' | 'h3';
  className?: string;
  'data-testid'?: string;
}

export function RailCard({ title, id, children, action, aside, tint, headingLevel: H = 'h2', className, 'data-testid': testId }: RailCardProps) {
  const style = tint ? ({ '--rail-tint': `var(--p-tint-${tint})` } as CSSProperties) : undefined;
  return (
    <section className={cx(s.card, tint && s.tinted, className)} style={style} aria-labelledby={id} data-testid={testId}>
      <div className={s.head}>
        <H id={id} className={s.title}>
          {title}
        </H>
        {aside}
        {action && (
          <Link href={action.href} className={s.action}>
            {action.label}
            <Icon name="chevronRight" size={16} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export interface LeaderboardRow {
  rank: number;
  name: string;
  avatar: AvatarValue | null;
  score: number;
  you?: boolean;
}

export interface LeaderboardMiniProps {
  rows: readonly LeaderboardRow[];
  /** "XP" (default). */
  unit?: string;
  label: string;
  className?: string;
}

const MEDAL: Record<number, string> = { 1: 'gold', 2: 'silver', 3: 'bronze' };

export function LeaderboardMini({ rows, unit = 'XP', label, className }: LeaderboardMiniProps) {
  return (
    <ol className={cx(s.board, className)} aria-label={label}>
      {rows.map((r) => (
        <li key={`${r.rank}-${r.name}`} className={s.boardRow} data-you={r.you || undefined}>
          <span className={s.rank} data-medal={MEDAL[r.rank]}>
            <span className="p-visually-hidden">Rank </span>
            {r.rank}
          </span>
          <AnimalAvatar avatar={r.avatar} size={36} decorative />
          <span className={s.name}>
            {r.you ? (
              <>
                <b>You</b>
                <span className={s.realName}> · {r.name}</span>
              </>
            ) : (
              r.name
            )}
          </span>
          <span className={s.score}>
            {r.score.toLocaleString('en-IN')} <span className={s.unit}>{unit}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

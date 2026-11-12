/**
 * KPI cards (design language v3, ADR-032). Server-safe.
 * StatCard: one number with its label, an optional unit, hint and trend (always written, never colour only).
 * Show a stat only when it means something to the student today: no "3 of 7,537" denominators, no empty charts.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Icon, type IconName } from './Icon';
import { IconTile } from './Tiles';
import type { Tint } from './tints';
import s from './Stat.module.css';

export interface StatTrend {
  direction: 'up' | 'down' | 'flat';
  /** The trend in words ("3 more than last week"). */
  text: string;
}

export interface StatCardProps {
  label: string;
  value: ReactNode;
  unit?: string;
  hint?: ReactNode;
  trend?: StatTrend;
  icon?: IconName;
  tint?: Tint;
  /** Makes the whole card a link (e.g. to /me/progress). */
  href?: string;
  className?: string;
  'data-testid'?: string;
}

const TREND_ICON: Record<StatTrend['direction'], IconName> = { up: 'arrowUp', down: 'arrowDown', flat: 'arrowRight' };

export function StatCard({ label, value, unit, hint, trend, icon, tint = 'blue', href, className, 'data-testid': testId }: StatCardProps) {
  const body = (
    <>
      <div className={s.top}>
        <span className={s.label}>{label}</span>
        {icon && <IconTile icon={icon} tint={tint} size="sm" />}
      </div>
      <p className={s.value}>
        {value}
        {unit && <span className={s.unit}> {unit}</span>}
      </p>
      {trend && (
        <p className={s.trend} data-direction={trend.direction}>
          <Icon name={TREND_ICON[trend.direction]} size={14} />
          {trend.text}
        </p>
      )}
      {hint && <p className={s.hint}>{hint}</p>}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cx(s.stat, s.link, className)} data-testid={testId}>
        {body}
      </Link>
    );
  return (
    <div className={cx(s.stat, className)} data-testid={testId}>
      {body}
    </div>
  );
}

/** A row of StatCards: 2 columns on phones, up to 4 on wide screens. */
export function StatGrid({ children, label, className }: { children: ReactNode; label?: string; className?: string }) {
  return (
    <div className={cx(s.grid, className)} role={label ? 'group' : undefined} aria-label={label}>
      {children}
    </div>
  );
}

/**
 * The greeting at the top of a "today" page (design language v3, ADR-032). Server-safe.
 *
 * - GreetingHeader: eyebrow, a big friendly title ("Good evening, Asha"), one line under it, ONE primary action,
 *   an optional aside (DateChip) and optional art (the student's AnimalAvatar). `variant="hero"` puts it on a soft
 *   tinted panel (Home); `plain` is for other pages. The title size follows the age stage (--p-stage-greet).
 * - DateChip: today's date as a calm chip (day number in a circle, weekday and month), in India time.
 * - greetingFor(date): "Good morning" / "Good afternoon" / "Good evening" by the hour in Asia/Kolkata.
 */
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../cx';
import type { Tint } from './tints';
import s from './Greeting.module.css';

const IST = 'Asia/Kolkata';

/** Hour 0–23 in India time. */
export function istHour(date: Date): number {
  return Number(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: IST }).format(date));
}

export function greetingFor(date: Date = new Date()): 'Good morning' | 'Good afternoon' | 'Good evening' {
  const h = istHour(date);
  if (h >= 4 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  return 'Good evening';
}

export interface GreetingHeaderProps {
  /** Small line above the title ("Thursday, 12 November" or "CBSE Class 10"). */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** One primary action (ButtonLink), optionally one secondary. */
  actions?: ReactNode;
  /** Right side on wide screens (DateChip, a stat). */
  aside?: ReactNode;
  /** Decorative art on the hero (e.g. <AnimalAvatar size={112} decorative />). */
  art?: ReactNode;
  variant?: 'plain' | 'hero';
  /** Hero panel tint (default: brand paper in light, a deep blue tint in dark). */
  tint?: Tint;
  /** The title element (default h1: the greeting is the page title). */
  as?: 'h1' | 'h2';
  className?: string;
  'data-testid'?: string;
}

export function GreetingHeader({ eyebrow, title, subtitle, actions, aside, art, variant = 'plain', tint, as: H = 'h1', className, 'data-testid': testId }: GreetingHeaderProps) {
  const style = tint ? ({ '--greet-tint': `var(--p-tint-${tint})` } as CSSProperties) : undefined;
  return (
    <header className={cx(s.greeting, variant === 'hero' && s.hero, !!art && s.withArt, className)} style={style} data-testid={testId} data-variant={variant}>
      {variant === 'hero' && <span className={s.decor} aria-hidden="true" />}
      <div className={s.text}>
        {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
        <H className={s.title}>{title}</H>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        {actions && <div className={s.actions}>{actions}</div>}
      </div>
      {aside && <div className={s.aside}>{aside}</div>}
      {art && (
        <div className={s.art} aria-hidden="true">
          {art}
        </div>
      )}
    </header>
  );
}

export function DateChip({ date = new Date(), className }: { date?: Date; className?: string }) {
  const day = new Intl.DateTimeFormat('en-IN', { day: 'numeric', timeZone: IST }).format(date);
  const weekday = new Intl.DateTimeFormat('en-IN', { weekday: 'long', timeZone: IST }).format(date);
  const month = new Intl.DateTimeFormat('en-IN', { month: 'long', timeZone: IST }).format(date);
  return (
    <span className={cx(s.dateChip, className)}>
      <span className={s.dateDay} aria-hidden="true">
        {day}
      </span>
      <span className={s.dateText} aria-hidden="true">
        <b>{weekday}</b>
        <span>{month}</span>
      </span>
      <span className="p-visually-hidden">
        Today is {weekday}, {day} {month}
      </span>
    </span>
  );
}

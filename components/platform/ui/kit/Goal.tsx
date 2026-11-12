/**
 * Today's goal and the week (design language v3, ADR-032). Server-safe.
 *
 * - GoalRing: a big ring with "15 / 20" in the middle (the unit under it) and a caption beside it.
 * - WeekStrip: Mon–Sun check dots (done, today, missed, upcoming). Every day's state is written for screen
 *   readers and the shapes differ (check, ring, empty, dashed), so colour is never the only cue.
 * - weekDays(activeDays, today): builds the strip's days for the week (Monday first) from YYYY-MM-DD strings in
 *   India time (store UTC, compute days in Asia/Kolkata: CLAUDE.md).
 */
import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from './Icon';
import { ProgressRing } from './Mastery';
import s from './Goal.module.css';

export interface GoalRingProps {
  value: number;
  target: number;
  /** Under the numbers: "questions", "min", "lessons". */
  unit: string;
  /** Accessible summary, e.g. "Today's goal: 15 of 20 questions". */
  label: string;
  /** Beside the ring: one encouraging line and what is left. */
  title?: ReactNode;
  caption?: ReactNode;
  size?: number;
  className?: string;
}

export function GoalRing({ value, target, unit, label, title, caption, size = 112, className }: GoalRingProps) {
  const pct = target > 0 ? Math.min(100, (value / target) * 100) : 0;
  const done = target > 0 && value >= target;
  return (
    <div className={cx(s.goal, className)} data-done={done || undefined}>
      <ProgressRing value={pct} size={size} stroke={Math.max(8, Math.round(size / 11))} label={label} level={done ? 'mastered' : undefined} className={s.ring}>
        <span className={s.center}>
          <span className={s.numbers}>
            <b>{value.toLocaleString('en-IN')}</b>
            <span className={s.of}>/{target.toLocaleString('en-IN')}</span>
          </span>
          <span className={s.unit}>{done ? 'done' : unit}</span>
        </span>
      </ProgressRing>
      {(title || caption) && (
        <div className={s.copy}>
          {title && <p className={s.title}>{title}</p>}
          {caption && <p className={s.caption}>{caption}</p>}
        </div>
      )}
    </div>
  );
}

export type WeekDayState = 'done' | 'today' | 'today-done' | 'missed' | 'upcoming';

export interface WeekDay {
  /** "Mon". */
  label: string;
  /** YYYY-MM-DD (India time). */
  date: string;
  state: WeekDayState;
}

const STATE_TEXT: Record<WeekDayState, string> = {
  done: 'studied',
  today: 'today, not yet',
  'today-done': 'today, studied',
  missed: 'no study',
  upcoming: 'coming up',
};

export function WeekStrip({ days, label = 'This week', className }: { days: readonly WeekDay[]; label?: string; className?: string }) {
  return (
    <ol className={cx(s.week, className)} aria-label={label}>
      {days.map((d) => (
        <li key={d.date} className={s.day} data-state={d.state}>
          <span className={s.dot} aria-hidden="true">
            {(d.state === 'done' || d.state === 'today-done') && <Icon name="check" size={16} strokeWidth={3} />}
          </span>
          <span className={s.dayLabel} aria-hidden="true">
            {d.label}
          </span>
          <span className="p-visually-hidden">
            {d.label}: {STATE_TEXT[d.state]}
          </span>
        </li>
      ))}
    </ol>
  );
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

function addDays(ymd: string, n: number): string {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Today's date (YYYY-MM-DD) in India time. */
export function istToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** The week containing `today` (Monday first), each day marked from the active days. */
export function weekDays(activeDays: Iterable<string>, today: string = istToday()): WeekDay[] {
  const active = new Set(activeDays);
  const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7; // Monday = 0
  const monday = addDays(today, -dow);
  return DAY_LABELS.map((label, i) => {
    const date = addDays(monday, i);
    const on = active.has(date);
    const state: WeekDayState = date === today ? (on ? 'today-done' : 'today') : date > today ? 'upcoming' : on ? 'done' : 'missed';
    return { label, date, state };
  });
}

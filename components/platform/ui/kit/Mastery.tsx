/**
 * Progress and mastery displays (design-system, ADR-023). Server-safe (no 'use client'), CSS only.
 * - MasteryPip: one chapter's level as a small square (Khan style) + optional label.
 * - MasteryBar: how many chapters are at each level, as one segmented bar with a legend in text.
 * - ProgressRing: a 0–100 ring with the number in the middle (subjects, chapter score, solved share).
 * - DifficultyTag: Easy / Medium / Hard (LeetCode colours, text always written).
 * Colour is never the only cue: every display writes the level or number too (WCAG 1.4.1).
 */
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../cx';
import s from './Mastery.module.css';

export type MasteryLevelName = 'not_started' | 'attempted' | 'familiar' | 'proficient' | 'mastered';
export const MASTERY_ORDER: readonly MasteryLevelName[] = ['not_started', 'attempted', 'familiar', 'proficient', 'mastered'];
const LABELS: Record<MasteryLevelName, string> = {
  not_started: 'Not started',
  attempted: 'Attempted',
  familiar: 'Familiar',
  proficient: 'Proficient',
  mastered: 'Mastered',
};

export function MasteryPip({ level, showLabel = false, size = 'md', className }: { level: MasteryLevelName; showLabel?: boolean; size?: 'sm' | 'md'; className?: string }) {
  return (
    <span className={cx(s.pipWrap, className)} data-mastery={level}>
      <span className={cx(s.pip, size === 'sm' && s.pipSm)} data-level={level} aria-hidden="true" />
      <span className={showLabel ? s.pipLabel : 'p-visually-hidden'}>{LABELS[level]}</span>
    </span>
  );
}

export function MasteryBar({ counts, label = 'Chapters by mastery level', legend = true, className }: { counts: Record<MasteryLevelName, number>; label?: string; legend?: boolean; className?: string }) {
  const total = MASTERY_ORDER.reduce((n, l) => n + (counts[l] ?? 0), 0);
  const summary = MASTERY_ORDER.filter((l) => counts[l]).map((l) => `${counts[l]} ${LABELS[l].toLowerCase()}`).join(', ');
  return (
    <div className={cx(s.bar, className)}>
      <div className={s.barTrack} role="img" aria-label={`${label}: ${summary || 'no chapters'}`}>
        {total > 0 &&
          [...MASTERY_ORDER].reverse().map((l) =>
            counts[l] ? <span key={l} className={s.barSeg} data-level={l} style={{ flexGrow: counts[l] } as CSSProperties} /> : null,
          )}
      </div>
      {legend && (
        <ul className={s.legend} aria-hidden="true">
          {[...MASTERY_ORDER].reverse().map((l) => (
            <li key={l}>
              <span className={s.pip} data-level={l} />
              {LABELS[l]} <b>{counts[l] ?? 0}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  label,
  level,
  children,
  className,
}: {
  /** 0–100. */
  value: number;
  size?: number;
  stroke?: number;
  /** Accessible text, e.g. "Science: 42% mastery". */
  label: string;
  /** Colours the ring by mastery level; default accent. */
  level?: MasteryLevelName;
  children?: ReactNode;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className={cx(s.ring, className)} style={{ width: size, height: size } as CSSProperties} role="img" aria-label={label} data-level={level}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
        <circle className={s.ringTrack} cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" />
        <circle
          className={s.ringFill}
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${(c * v) / 100} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className={s.ringCenter} aria-hidden="true">
        {children ?? `${v}%`}
      </span>
    </span>
  );
}

export type DifficultyName = 'easy' | 'medium' | 'hard';
const DIFFICULTY_LABELS: Record<DifficultyName, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

export function DifficultyTag({ band, className }: { band: DifficultyName; className?: string }) {
  return (
    <span className={cx(s.diff, className)} data-band={band}>
      {DIFFICULTY_LABELS[band]}
    </span>
  );
}

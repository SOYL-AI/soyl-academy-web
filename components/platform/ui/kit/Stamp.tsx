/**
 * The rubber stamp (design-system, ADR-029; DESIGN.md §1, docs/redesign-ink-and-wash.md §2.1).
 *
 * A double-ringed, slightly rotated stamp: the label runs around the top of the ring, an optional caption
 * around the bottom, the number sits in the middle in Zodiak. Madder by default; leaf (`tone="solved"`) for a
 * goal met. The language allows it in two places ONLY: **streak days and rank cards**. Anywhere else it is a
 * tell and is cut at review.
 *
 * Server-safe (no 'use client'): one inline SVG and a CSS module, no image request. `useId` keeps each stamp's
 * text paths and its texture filter unique on the page. The worn edge is a fixed-seed SVG filter, so the server
 * and the client draw the same stamp. Colour is never the only cue: the accessible name says everything the
 * stamp shows.
 */
import { useId, type CSSProperties } from 'react';
import { cx } from '../cx';
import s from './Stamp.module.css';

export type StampTone = 'madder' | 'solved';

export interface StampProps {
  /** The mark in the middle: a streak count (`7`), a rank (`#3`). Up to four characters read well. */
  value: string | number;
  /** Set around the top of the ring in capitals: "day streak", "weekly rank". Up to about 16 characters. */
  label: string;
  /** Optional line around the bottom of the ring: a date, a league. Up to about 18 characters. */
  caption?: string;
  /** `madder` (default) or `solved` (leaf: a goal met, a promotion). */
  tone?: StampTone;
  /** Diameter in px (default 112, at least 72). */
  size?: number;
  /** Rotation in degrees, kept within ±12 (default -7). */
  tilt?: number;
  /** Accessible name; defaults to "<value> <label>, <caption>". */
  ariaLabel?: string;
  /** The same fact is written next to the stamp: hide it from assistive technology. */
  decorative?: boolean;
  className?: string;
}

export const STAMP_MAX_TILT = 12;
export const STAMP_MIN_SIZE = 72;

/** Rotation in degrees, within ±STAMP_MAX_TILT (non-numbers become 0). */
export function stampTilt(tilt: number): number {
  if (!Number.isFinite(tilt)) return 0;
  return Math.max(-STAMP_MAX_TILT, Math.min(STAMP_MAX_TILT, tilt));
}

/** The accessible name: what the stamp shows, in reading order. */
export function stampName(value: string | number, label: string, caption?: string): string {
  const main = `${String(value).trim()} ${label.trim()}`.trim();
  const tail = caption?.trim();
  return tail ? `${main}, ${tail}` : main;
}

/** Size steps for the ring text, by length, so a longer label still fits its half of the ring. */
function arcStep(text: string, comfortable: number): 'md' | 'sm' | 'xs' {
  const n = [...text].length;
  if (n <= comfortable) return 'md';
  return n <= comfortable + 4 ? 'sm' : 'xs';
}

export function Stamp({ value, label, caption, tone = 'madder', size = 112, tilt = -7, ariaLabel, decorative = false, className }: StampProps) {
  const uid = useId().replace(/[^A-Za-z0-9_-]/g, '');
  const topPath = `stamp-top-${uid}`;
  const bottomPath = `stamp-bottom-${uid}`;
  const wear = `stamp-wear-${uid}`;
  const mark = String(value).trim();
  const diameter = Math.max(STAMP_MIN_SIZE, Math.round(Number.isFinite(size) ? size : 112));
  const style = { '--stamp-size': `${diameter}px`, '--stamp-tilt': `${stampTilt(tilt)}deg` } as CSSProperties;
  const a11y = decorative ? { 'aria-hidden': true as const } : { role: 'img', 'aria-label': ariaLabel ?? stampName(value, label, caption) };
  return (
    <span {...a11y} className={cx(s.stamp, className)} data-tone={tone} style={style}>
      <svg className={s.svg} viewBox="0 0 120 120" width={diameter} height={diameter} aria-hidden="true" focusable="false">
        <defs>
          {/* Top: clockwise from the left through the top (letters stand outward). Bottom: anticlockwise through
              the bottom (letters stand inward), so both read left to right. */}
          <path id={topPath} d="M 22 60 A 38 38 0 0 1 98 60" />
          <path id={bottomPath} d="M 14 60 A 46 46 0 0 0 106 60" />
          <filter id={wear} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={4} result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale={1.4} xChannelSelector="R" yChannelSelector="G" result="edge" />
            <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves={2} seed={11} result="blots" />
            <feColorMatrix in="blots" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.05" result="press" />
            <feComposite in="edge" in2="press" operator="in" />
          </filter>
        </defs>
        <g filter={`url(#${wear})`}>
          <circle className={s.ringOuter} cx="60" cy="60" r="56" />
          <circle className={s.ringInner} cx="60" cy="60" r="50.5" />
          <circle className={s.dot} cx="17" cy="60" r="1.8" />
          <circle className={s.dot} cx="103" cy="60" r="1.8" />
          <text className={s.arc} data-step={arcStep(label, 12)}>
            <textPath href={`#${topPath}`} startOffset="50%">
              {label.toLocaleUpperCase('en-IN')}
            </textPath>
          </text>
          {caption ? (
            <text className={s.arc} data-step={arcStep(caption, 14)}>
              <textPath href={`#${bottomPath}`} startOffset="50%">
                {caption.toLocaleUpperCase('en-IN')}
              </textPath>
            </text>
          ) : null}
          <text className={s.mark} data-length={Math.min([...mark].length, 5)} x="60" y="60">
            {mark}
          </text>
        </g>
      </svg>
    </span>
  );
}

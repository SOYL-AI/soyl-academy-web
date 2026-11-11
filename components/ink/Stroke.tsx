import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import s from './ink.module.css';

export type StrokePigment = 'indigo' | 'madder' | 'turmeric' | 'chalk';

const PIGMENT: Record<StrokePigment, string> = {
  indigo: s.strokeIndigo,
  madder: s.strokeMadder,
  turmeric: s.strokeTurmeric,
  chalk: s.strokeChalk,
};

interface StrokeProps {
  pigment?: StrokePigment;
  /** Width in em of the surrounding text (default 11em, never wider than its container). */
  width?: string;
  /** Sit inline after a word or number instead of on its own line. */
  inline?: boolean;
  /** Wipe in once when it scrolls into view (RevealObserver). Default true. */
  reveal?: boolean;
  /** Reveal delay in ms. */
  delay?: number;
  className?: string;
}

/**
 * One painted brush stroke under a section heading or a number (plan §2.1: one per section). Decorative: hidden
 * from assistive technology, never the only carrier of meaning.
 */
export function Stroke({ pigment = 'indigo', width, inline, reveal = true, delay, className }: StrokeProps) {
  const style: CSSProperties = {};
  if (width) style.width = `min(100%, ${width})`;
  if (delay) (style as Record<string, string>)['--d'] = `${delay}ms`;
  return (
    <span
      aria-hidden="true"
      data-reveal={reveal ? 'ink-wipe' : undefined}
      className={cn(s.stroke, inline && s.strokeInline, PIGMENT[pigment], className)}
      style={style}
    />
  );
}

/**
 * REVIEWED RENDERER (WEB-6/WEB-7): one of the two places the platform injects HTML.
 * The HTML comes only from renderMathToString (KaTeX, trust off). No 'use client': in a Server
 * Component this costs zero client JS; KaTeX CSS is imported here so it only loads on routes
 * that render maths (ARCHITECTURE §3.2).
 */
import 'katex/dist/katex.min.css';
import { cx } from '../cx';
import { renderMathToString } from './math';
import s from './render.module.css';

export interface MathProps {
  tex: string;
  className?: string;
}

/** Display maths (own line, centred, scrolls horizontally on narrow screens instead of overflowing). */
export function MathBlock({ tex, className }: MathProps) {
  return (
    <div
      className={cx(s.mathBlock, className)}
      data-math="display"
      // Focusable so a formula wider than a 360 px screen can be scrolled by keyboard (axe scrollable-region-focusable).
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: renderMathToString(tex, true) }}
    />
  );
}

/** Inline maths inside running text. */
export function MathInline({ tex, className }: MathProps) {
  return <span className={cx(s.mathInline, className)} data-math="inline" dangerouslySetInnerHTML={{ __html: renderMathToString(tex, false) }} />;
}

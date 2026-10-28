/**
 * Empty-state illustrations (design-system, 2026-10-29): original spot drawings on a 120 × 96 grid, coloured only
 * with theme tokens so they sit naturally in light and dark mode. Always decorative (the empty state's heading
 * and text say what is going on).
 */
import { circle as C, ellipse as E, line as L, path as P, type SvgNode } from './svg-tree';

export const EMPTY_ART_KINDS = ['no-tests', 'no-activity', 'no-chats', 'no-badges', 'not-found', 'offline'] as const;
export type EmptyArtKind = (typeof EMPTY_ART_KINDS)[number];

const BLOB = 'var(--p-accent-soft)';
const PAPER = 'var(--p-surface)';
const LINE = 'var(--p-ink-muted)';
const QUIET = 'var(--p-surface-3)';
const ACCENT = 'var(--p-accent)';
const HIGHLIGHT = 'var(--p-highlight)';
const RED = 'var(--p-brand-red)';

const ln = (d: string, w = 2.2, stroke = LINE) => L(d, stroke, w);
const blob = (): SvgNode => P('M18 58c-6-20 8-42 34-46 22-3 44 6 50 24 6 19-6 40-30 46-24 6-48-4-54-24Z', BLOB);
const sparkle = (x: number, y: number, r = 4, fill = HIGHLIGHT): SvgNode => P(`M${x} ${y - r}l${r * 0.3} ${r * 0.7} ${r * 0.7} ${r * 0.3}-${r * 0.7} ${r * 0.3}-${r * 0.3} ${r * 0.7}-${r * 0.3}-${r * 0.7}-${r * 0.7}-${r * 0.3} ${r * 0.7}-${r * 0.3}Z`, fill);

const ART: Record<EmptyArtKind, SvgNode[]> = {
  // A clipboard with blank answer lines and a pencil.
  'no-tests': [
    blob(),
    P('M38 18h40v62H38Z', PAPER),
    ln('M38 18h40v62H38Z'),
    P('M50 13h16v9H50Z', QUIET),
    ln('M50 13h16v9H50Z', 2),
    ...[34, 46, 58].flatMap((y) => [C(46, y, 3, 'none', { stroke: LINE, strokeWidth: 1.8 }), ln(`M54 ${y}h16`, 2, QUIET)]),
    P('M82 30l8 8-22 22-10 2 2-10Z', HIGHLIGHT),
    ln('M82 30l8 8-22 22-10 2 2-10ZM78 34l8 8', 2),
    sparkle(96, 22),
  ],
  // An empty calendar and a sprout.
  'no-activity': [
    blob(),
    P('M26 22h56v52H26Z', PAPER),
    ln('M26 22h56v52H26Z'),
    P('M26 22h56v10H26Z', ACCENT, { opacity: 0.85 }),
    ln('M38 17v9M70 17v9', 2.6),
    ...[0, 1, 2, 3, 4].flatMap((col) => [0, 1, 2].map((row) => P(`M${32 + col * 10} ${38 + row * 11}h7v7h-7Z`, QUIET))),
    P('M90 78c0-10 0-16-2-22', 'none', { stroke: 'var(--p-success)', strokeWidth: 2.4, strokeLinecap: 'round' }),
    P('M88 62c-6-1-10-5-10-11 6 0 10 4 10 11Z', 'var(--p-success)'),
    P('M89 57c1-6 6-9 11-9 0 6-4 9-11 9Z', 'var(--p-success)', { opacity: 0.7 }),
    ln('M80 79h18', 2.4),
  ],
  // Two speech bubbles, one waiting with dots.
  'no-chats': [
    blob(),
    P('M22 26h50a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H40l-10 9v-9h-8a6 6 0 0 1-6-6V32a6 6 0 0 1 6-6Z', PAPER),
    ln('M22 26h50a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H40l-10 9v-9h-8a6 6 0 0 1-6-6V32a6 6 0 0 1 6-6Z'),
    ...[36, 47, 58].map((x) => C(x, 42, 3.4, LINE)),
    P('M66 50h30a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-4v8l-9-8H66a6 6 0 0 1-6-6V56a6 6 0 0 1 6-6Z', ACCENT),
    P('M76 59l2.4 5.6 5.6 2.4-5.6 2.4-2.4 5.6-2.4-5.6-5.6-2.4 5.6-2.4Z', PAPER),
    sparkle(98, 30),
  ],
  // An empty medal outline waiting to be earned.
  'no-badges': [
    blob(),
    P('M48 54l-8 26 10-5 6 7 6-24Z', QUIET),
    P('M72 54l8 26-10-5-6 7-6-24Z', QUIET),
    C(60, 40, 22, PAPER),
    C(60, 40, 22, 'none', { stroke: LINE, strokeWidth: 2.4, strokeDasharray: '5 5' }),
    C(60, 40, 14, 'none', { stroke: QUIET, strokeWidth: 3 }),
    P('M60 31l3 6.2 6.8 1-5 4.8 1.2 6.8-6-3.2-6 3.2 1.2-6.8-5-4.8 6.8-1Z', HIGHLIGHT),
    sparkle(90, 18, 5),
    sparkle(28, 26, 3.4, ACCENT),
  ],
  // A magnifier over a dotted trail that ends in a question.
  'not-found': [
    blob(),
    P('M18 74c10-8 16-2 26-10s6-18 18-22', 'none', { stroke: LINE, strokeWidth: 2.2, strokeDasharray: '2 6', strokeLinecap: 'round' }),
    C(18, 74, 4, RED),
    C(66, 40, 18, PAPER),
    C(66, 40, 18, 'none', { stroke: LINE, strokeWidth: 3 }),
    ln('M79 53l15 15', 6),
    P('M60 34c0-4 3-6 6-6s6 2 6 5c0 4-6 4-6 9', 'none', { stroke: ACCENT, strokeWidth: 3, strokeLinecap: 'round' }),
    C(66, 49, 2, ACCENT),
    sparkle(98, 24),
  ],
  // A cloud with a broken connection.
  offline: [
    blob(),
    P('M34 62a14 14 0 0 1 2-28 20 20 0 0 1 38-4 16 16 0 0 1 12 32Z', PAPER),
    ln('M34 62a14 14 0 0 1 2-28 20 20 0 0 1 38-4 16 16 0 0 1 12 32Z'),
    ln('M46 50a14 14 0 0 1 20 0M52 56a6 6 0 0 1 8 0', 2.4, ACCENT),
    C(56, 61, 2.2, ACCENT),
    ln('M40 36l32 30', 3, RED),
    E(60, 84, 24, 3, QUIET),
  ],
};

export function emptyArt(kind: EmptyArtKind): SvgNode[] {
  return ART[kind];
}

/**
 * Badge medals (design-system, 2026-10-29) for every badge in platform/shared/config/gamification.ts BADGES, and
 * league tier crests (Bronze … Diamond, plus the player card's Elite). Original flat drawings on a 64 × 64 grid.
 *
 * Badges: a family colour (lessons blue, practice green, streaks orange, mastery violet, tests teal, perfect gold),
 * a shape that grows with the effort (round → hexagon → star) and a white symbol. Locked badges use theme tokens
 * (a quiet grey medal with a lock), so they sit calmly in both themes.
 */
import { circle as C, ellipse as E, line as L, pair, path as P, type SvgNode } from './svg-tree';

type Shape = 'round' | 'hex' | 'star';

interface Family {
  base: string;
  light: string;
  dark: string;
}

const FAMILIES = {
  lessons: { base: '#2b6fd6', light: '#7fb0f5', dark: '#1a4a9c' },
  practice: { base: '#1f9d6b', light: '#74d3a8', dark: '#126645' },
  streak: { base: '#e8590c', light: '#ffa45c', dark: '#a63c05' },
  mastery: { base: '#6d3fd6', light: '#b29cf5', dark: '#46249a' },
  tests: { base: '#0d7a8a', light: '#5cc6d3', dark: '#075560' },
  perfect: { base: '#c98a06', light: '#f5d36b', dark: '#8a5c00' },
} as const satisfies Record<string, Family>;

const LOCKED: Family = { base: 'var(--p-surface-3)', light: 'var(--p-surface-2)', dark: 'var(--p-border-strong)' };
const WHITE = '#ffffff';

function starPath(cx: number, cy: number, outer: number, inner: number, points: number): string {
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  }
  return `${d}Z`;
}

function hexPath(cx: number, cy: number, r: number): string {
  let d = '';
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  }
  return `${d}Z`;
}

function medal(shape: Shape, f: Family, symbol: SvgNode[], ribbon = true): SvgNode[] {
  const cy = 27;
  const outer = shape === 'star' ? P(starPath(32, cy, 25, 20.5, 12), f.dark) : shape === 'hex' ? P(hexPath(32, cy, 24), f.dark) : C(32, cy, 23, f.dark);
  const face = shape === 'star' ? C(32, cy, 18.5, f.base) : shape === 'hex' ? P(hexPath(32, cy, 19.5), f.base) : C(32, cy, 19, f.base);
  return [
    ...(ribbon ? [P('M20 42l-6 20 8-4 5 6 5-18Z', f.base), P('M44 42l6 20-8-4-5 6-5-18Z', f.dark)] : []),
    outer,
    face,
    E(26, 19, 7, 4, WHITE, -30, { opacity: 0.18 }),
    ...symbol,
  ];
}

const S = (d: string, w = 3) => L(d, WHITE, w);

const SYMBOLS: Record<string, { family: keyof typeof FAMILIES; shape: Shape; symbol: SvgNode[] }> = {
  'first-lesson': { family: 'lessons', shape: 'round', symbol: [P('M20 21c4-2 8-2 12 1v15c-4-3-8-3-12-1Z', WHITE), P('M44 21c-4-2-8-2-12 1v15c4-3 8-3 12-1Z', WHITE, { opacity: 0.8 })] },
  'lessons-10': {
    family: 'lessons',
    shape: 'hex',
    symbol: [P('M21 33h22v4H21Z', WHITE), P('M23 27h18v4H23Z', WHITE, { opacity: 0.85 }), P('M25 21h14v4H25Z', WHITE, { opacity: 0.7 }), P('M27 15h10v4H27Z', WHITE, { opacity: 0.55 })],
  },
  'first-correct': { family: 'practice', shape: 'round', symbol: [S('M22 27.5l6.5 6.5L42 20.5', 4)] },
  'practice-50': { family: 'practice', shape: 'hex', symbol: [C(32, 27, 11, 'none', { stroke: WHITE, strokeWidth: 3 }), C(32, 27, 5, WHITE), S('M40 19l6-6M42 13h4v4', 2.4)] },
  'practice-250': { family: 'practice', shape: 'star', symbol: [P('M34.5 14L24 29.5h7L29 40l11-15.5h-7Z', WHITE)] },
  'streak-3': { family: 'streak', shape: 'round', symbol: [P('M32 40c-5.5 0-9-3.6-9-8.4 0-4.6 3.4-7.6 5-11.6 1.4 2.4 2 4 2 5.6 1.6-2.4 3-5.6 3-9.6 4 3 8 8.8 8 15.6 0 4.8-3.5 8.4-9 8.4Z', WHITE)] },
  'streak-7': {
    family: 'streak',
    shape: 'hex',
    symbol: [
      P('M32 40c-5.5 0-9-3.6-9-8.4 0-4.6 3.4-7.6 5-11.6 1.4 2.4 2 4 2 5.6 1.6-2.4 3-5.6 3-9.6 4 3 8 8.8 8 15.6 0 4.8-3.5 8.4-9 8.4Z', WHITE),
      P('M32 38c-2.6 0-4.4-1.8-4.4-4.2 0-2.4 1.8-4 2.8-6 .8 1.6 1.2 2.4 1.2 3.4.8-1 1.6-2.2 1.6-4 2 1.6 3.2 4 3.2 6.6 0 2.4-1.8 4.2-4.4 4.2Z', '#e8590c'),
    ],
  },
  'chapter-master': { family: 'mastery', shape: 'star', symbol: [P(starPath(32, 27.5, 12, 5.4, 5), WHITE)] },
  'first-test': {
    family: 'tests',
    shape: 'round',
    symbol: [P('M23 17h18v22H23Z', WHITE), P('M28 14h8v5h-8Z', '#075560'), L('M27 30l3.5 3.5 7-8', '#0d7a8a', 2.6)],
  },
  'tests-10': {
    family: 'tests',
    shape: 'star',
    symbol: [P('M32 17l15 6-15 6-15-6Z', WHITE), P('M23 26v6c3 3 6 4 9 4s6-1 9-4v-6l-9 3.6Z', WHITE, { opacity: 0.85 }), S('M45 23v8', 2)],
  },
  'perfect-score': {
    family: 'perfect',
    shape: 'star',
    symbol: [P('M21 34l-2-15 7.5 6L32 15l5.5 10 7.5-6-2 15Z', WHITE), P('M21 36h22v3.4H21Z', WHITE)],
  },
  'test-streak-3': {
    family: 'tests',
    shape: 'hex',
    symbol: [P('M21 18h22v20H21Z', WHITE), P('M21 18h22v5H21Z', '#075560'), ...[25, 32, 39].map((x) => C(x, 30.5, 2.4, '#0d7a8a'))],
  },
};

export const BADGE_ART_KEYS: readonly string[] = Object.keys(SYMBOLS);

const LOCK: SvgNode[] = [C(48, 44, 9, 'var(--p-surface)'), C(48, 44, 7.6, 'var(--p-ink-muted)'), P('M44.4 43.4h7.2v5.4h-7.2Z', 'var(--p-surface)'), L('M45.9 43.4v-1.8a2.1 2.1 0 0 1 4.2 0v1.8', 'var(--p-surface)', 1.4)];

/** The medal for a badge key; unknown keys get a plain star medal. Locked: grey with a lock. */
export function badgeArt(key: string, locked = false): SvgNode[] {
  const def = SYMBOLS[key] ?? { family: 'mastery' as const, shape: 'round' as Shape, symbol: [P(starPath(32, 27.5, 11, 5, 5), WHITE)] };
  if (!locked) return medal(def.shape, FAMILIES[def.family], def.symbol);
  const ghost = def.symbol.map(([tag, attrs, children]): SvgNode => [tag, { ...attrs, ...(attrs.fill && attrs.fill !== 'none' ? { fill: 'var(--p-ink-subtle)' } : {}), ...(attrs.stroke ? { stroke: 'var(--p-ink-subtle)' } : {}), opacity: 0.55 }, children]);
  return [...medal(def.shape, LOCKED, ghost), ...LOCK];
}

/* League tier crests --------------------------------------------------------------------------- */

export type CrestTier = 'bronze' | 'silver' | 'gold' | 'sapphire' | 'diamond' | 'elite';
export const CREST_TIERS: readonly CrestTier[] = ['bronze', 'silver', 'gold', 'sapphire', 'diamond', 'elite'];

const CREST_COLOURS: Record<CrestTier, Family> = {
  bronze: { base: '#b06a2c', light: '#e3a46a', dark: '#7a4316' },
  silver: { base: '#8d97a3', light: '#dde2e8', dark: '#5f6873' },
  gold: { base: '#d9a520', light: '#f8de7e', dark: '#9a7000' },
  sapphire: { base: '#1f5fbf', light: '#8fb6f5', dark: '#123d80' },
  diamond: { base: '#13a3b8', light: '#b5f0f6', dark: '#0b6b7a' },
  elite: { base: '#6d3fd6', light: '#c7b5fb', dark: '#43229a' },
};

const SHIELD = 'M32 6l20 7v14c0 14-8.6 24.4-20 30-11.4-5.6-20-16-20-30V13Z';
const SHIELD_IN = 'M32 11l15.4 5.4v10.8c0 11-6.6 19.4-15.4 24-8.8-4.6-15.4-13-15.4-24V16.4Z';

/** A crest per tier, more ornate as tiers rise (1 Bronze … 5 Diamond; Elite is the player card's top frame). */
export function crestArt(tier: CrestTier): SvgNode[] {
  const c = CREST_COLOURS[tier];
  const rank = { bronze: 1, silver: 2, gold: 3, sapphire: 4, diamond: 5, elite: 5 }[tier];
  const wings: SvgNode[] =
    rank >= 3
      ? pair([P('M14 22C6 22 2 28 3 36c4-3 7-3 10-2-3 2-5 5-5 9 4-3 7-4 9-3Z', c.light), P('M13 27c-3 0-6 2-7 5', 'none', { stroke: c.dark, strokeWidth: 1.4, strokeLinecap: 'round' })])
      : [];
  const crown: SvgNode[] =
    rank >= 5
      ? [P('M22 8l4 5 6-8 6 8 4-5 1 9H21Z', c.light), C(32, 4.5, 1.8, c.light), C(22, 7.4, 1.4, c.light), C(42, 7.4, 1.4, c.light)]
      : [];
  const emblem: SvgNode[] =
    rank >= 4
      ? [P('M32 18l9 9-9 15-9-15Z', c.light), P('M23 27h18l-9 15Z', c.base, { opacity: 0.55 }), P('M27.5 22.5h9L32 27Z', WHITE, { opacity: 0.55 })]
      : rank === 2
        ? [P('M20 30l12-8 12 8v5l-12-8-12 8Z', c.light), P(starPath(32, 39.5, 5, 2.2, 5), WHITE)]
        : [P(starPath(32, 30, rank === 3 ? 11 : 9, rank === 3 ? 4.8 : 4, 5), rank === 3 ? WHITE : c.light)];
  return [...wings, P(SHIELD, c.dark), P(SHIELD_IN, c.base), P('M32 11l15.4 5.4v10.8c0 2-.2 3.8-.6 5.6C40 28 34 26 32 11Z', WHITE, { opacity: 0.14 }), ...emblem, ...crown];
}

/** League tier number (1-based, LEAGUE_TIERS order) → crest. */
export function crestForLeague(level: number): CrestTier {
  return (['bronze', 'silver', 'gold', 'sapphire', 'diamond'] as const)[Math.min(5, Math.max(1, Math.round(level))) - 1]!;
}

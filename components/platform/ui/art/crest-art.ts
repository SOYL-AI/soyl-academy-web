/**
 * League tier crests (design-system, 2026-10-29): Bronze … Diamond (LEAGUE_TIERS order) plus the player card's Elite.
 * Original flat shields on a 64 × 64 grid, more ornate as tiers rise (star → chevron → wings → gem → crown).
 */
import { circle as C, pair, path as P, type SvgNode } from './svg-tree';

const WHITE = '#ffffff';

interface Family {
  base: string;
  light: string;
  dark: string;
}

function starPath(cx: number, cy: number, outer: number, inner: number, points: number): string {
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  }
  return `${d}Z`;
}

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

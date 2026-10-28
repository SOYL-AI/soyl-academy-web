/**
 * React wrappers for the platform's original artwork. Each wrapper lives in its own module chain so a page only
 * pays for what it shows: badges and crests (badge-art.ts), subject glyphs (subject-art.ts), empty states
 * (empty-art.ts). All are server-renderable (no hooks).
 */
import { BADGES, LEAGUE_TIERS } from '@/platform/shared/config/gamification';
import { badgeArt, crestArt, crestForLeague, type CrestTier } from './badge-art';
import { SvgTree } from './SvgTree';

export const CREST_NAMES: Record<CrestTier, string> = { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', sapphire: 'Sapphire', diamond: 'Diamond', elite: 'Elite' };

/** A badge medal. Named "Week warrior badge" (or "… badge, not earned yet"); decorative when the name is printed beside it. */
export function BadgeMedal({ badge, locked = false, size = 56, decorative = false, className }: { badge: string; locked?: boolean; size?: number; decorative?: boolean; className?: string }) {
  const name = BADGES.find((b) => b.key === badge)?.name ?? 'Badge';
  return <SvgTree nodes={badgeArt(badge, locked)} size={size} className={className} title={decorative ? undefined : `${name} badge${locked ? ', not earned yet' : ''}`} data-art={`badge-${badge}${locked ? '-locked' : ''}`} />;
}

/** A league crest by tier key or 1-based league level. */
export function LeagueCrest({ tier, level, size = 48, decorative = false, className }: { tier?: CrestTier; level?: number; size?: number; decorative?: boolean; className?: string }) {
  const t = tier ?? crestForLeague(level ?? 1);
  const name = level ? LEAGUE_TIERS[level - 1]?.name ?? CREST_NAMES[t] : CREST_NAMES[t];
  return <SvgTree nodes={crestArt(t)} size={size} className={className} title={decorative ? undefined : `${name} crest`} data-art={`crest-${t}`} />;
}

/** A league (or player-card) tier crest (crest-art.ts). Import-light: no config, no other art. */
import { crestArt, crestForLeague, type CrestTier } from './crest-art';
import { SvgTree } from './SvgTree';

export const CREST_NAMES: Record<CrestTier, string> = { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', sapphire: 'Sapphire', diamond: 'Diamond', elite: 'Elite' };

/** By tier key or by 1-based league level. Named "Gold league crest" unless decorative. */
export function LeagueCrest({ tier, level, size = 48, decorative = false, className }: { tier?: CrestTier; level?: number; size?: number; decorative?: boolean; className?: string }) {
  const t = tier ?? crestForLeague(level ?? 1);
  return <SvgTree nodes={crestArt(t)} size={size} className={className} title={decorative ? undefined : `${CREST_NAMES[t]} crest`} data-art={`crest-${t}`} />;
}

/**
 * Badge medal (badge-art.ts). Server-renderable (no hooks). League crests are in LeagueCrest.tsx, so a page that
 * shows one does not carry the twelve medals.
 */
import { BADGES } from '@/platform/shared/config/gamification';
import { badgeArt } from './badge-art';
import { SvgTree } from './SvgTree';

/** A badge medal. Named "Week warrior badge" (or "… badge, not earned yet"); decorative when the name is printed beside it. */
export function BadgeMedal({ badge, locked = false, size = 56, decorative = false, className }: { badge: string; locked?: boolean; size?: number; decorative?: boolean; className?: string }) {
  const name = BADGES.find((b) => b.key === badge)?.name ?? 'Badge';
  return <SvgTree nodes={badgeArt(badge, locked)} size={size} className={className} title={decorative ? undefined : `${name} badge${locked ? ', not earned yet' : ''}`} data-art={`badge-${badge}${locked ? '-locked' : ''}`} />;
}

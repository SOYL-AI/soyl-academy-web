/**
 * Avatar picker view-model (pure; tested): GET /v1/me/avatars → groups by unlock rule (starters first), lock state
 * and progress in words ("Reach level 8 — you're level 5"), and what a save would do.
 */
import { isApiError, type AvatarCatalog } from '@/platform/shared/api-client';
import { LEAGUE_TIERS } from '@/platform/shared/config/gamification';

export type CatalogAvatar = AvatarCatalog['avatars'][number];
export type GroupKey = 'starter' | 'level' | 'badge' | 'streak' | 'league_tier' | 'live_mocks';

export const GROUP_TITLES: Record<GroupKey, string> = {
  starter: 'Starters',
  level: 'Level rewards',
  badge: 'Badge rewards',
  streak: 'Streak rewards',
  league_tier: 'League rewards',
  live_mocks: 'Live mock rewards',
};

const ORDER: readonly GroupKey[] = ['starter', 'level', 'badge', 'streak', 'league_tier', 'live_mocks'];

export interface AvatarGroup {
  key: GroupKey;
  title: string;
  avatars: CatalogAvatar[];
  unlocked: number;
}

/** Sort key inside a group: the threshold (level 2 before level 15). */
function threshold(a: CatalogAvatar): number {
  const r = a.unlock;
  return r.kind === 'level' ? r.level : r.kind === 'streak' ? r.days : r.kind === 'league_tier' ? r.tier : r.kind === 'live_mocks' ? r.count : 0;
}

/** Starters (plus the student's public-name animal) first, then each unlock rule kind, unlocked first within a threshold. */
export function avatarGroups(catalog: Pick<AvatarCatalog, 'avatars'>): AvatarGroup[] {
  const by = new Map<GroupKey, CatalogAvatar[]>();
  for (const a of catalog.avatars) {
    const key: GroupKey = a.isPublicNameAnimal ? 'starter' : a.unlock.kind;
    by.set(key, [...(by.get(key) ?? []), a]);
  }
  return ORDER.filter((k) => by.has(k)).map((key) => {
    const avatars = [...by.get(key)!].sort((x, y) => Number(y.isPublicNameAnimal) - Number(x.isPublicNameAnimal) || threshold(x) - threshold(y));
    return { key, title: GROUP_TITLES[key], avatars, unlocked: avatars.filter((a) => a.unlocked).length };
  });
}

const tierName = (t: number) => LEAGUE_TIERS[t - 1]?.name ?? `tier ${t}`;
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** How far the student is: "Reach level 8 — you're level 5". Unlocked avatars: why they are open. */
export function unlockText(a: Pick<CatalogAvatar, 'unlocked' | 'isPublicNameAnimal' | 'unlock' | 'unlockLabel' | 'progress'>): string {
  if (a.isPublicNameAnimal) return 'The animal in your public name';
  const r = a.unlock;
  if (a.unlocked) return r.kind === 'starter' ? 'Available to everyone' : `Unlocked: ${a.unlockLabel.charAt(0).toLowerCase()}${a.unlockLabel.slice(1)}`;
  const cur = a.progress.current;
  switch (r.kind) {
    case 'level':
      return `${a.unlockLabel} — you're level ${Math.max(1, cur)}`;
    case 'badge':
      return `${a.unlockLabel} — not earned yet`;
    case 'streak':
      return `${a.unlockLabel} — your longest is ${plural(cur, 'day')}`;
    case 'league_tier':
      return `${a.unlockLabel} — ${cur === 0 ? 'you have not played a league yet' : `your best is ${tierName(cur)}`}`;
    case 'live_mocks':
      return `${a.unlockLabel} — ${cur === 0 ? 'none yet' : `${cur} so far`}`;
    default:
      return a.unlockLabel;
  }
}

/** What saving would do: nothing to save, locked (explained), or a PATCH body. */
export function saveState(catalog: Pick<AvatarCatalog, 'avatars' | 'current'>, pick: { id: string; bg: string }): { kind: 'same' } | { kind: 'locked'; reason: string } | { kind: 'save'; body: { avatar: { id: string; bg: string } } } {
  const a = catalog.avatars.find((x) => x.id === pick.id);
  if (!a) return { kind: 'locked', reason: 'Choose an avatar.' };
  if (!a.unlocked) return { kind: 'locked', reason: `${a.animal} is locked. ${unlockText(a)}.` };
  if (!catalog.current.isDefault && catalog.current.id === pick.id && catalog.current.bg === pick.bg) return { kind: 'same' };
  return { kind: 'save', body: { avatar: { id: pick.id, bg: pick.bg } } };
}

/** PATCH /v1/me { avatar } failure → our own words (never server text). */
export function avatarSaveError(err: unknown): string {
  if (isApiError(err, 'avatar_locked')) return 'That avatar is still locked. Keep learning to unlock it; your avatar has not changed.';
  if (isApiError(err, 'validation_failed')) return 'That avatar could not be saved. Pick another one.';
  if (isApiError(err, 'rate_limited')) return 'Too many changes at once. Wait a moment and try again.';
  if (isApiError(err) && (err.code === 'network_error' || err.status >= 500)) return 'We could not reach SOYL Academy. Check your connection and try again.';
  return 'Your avatar could not be saved. Please try again.';
}

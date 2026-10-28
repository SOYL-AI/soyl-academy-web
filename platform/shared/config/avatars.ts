/**
 * Student avatars (owner request, 2026-10-28). A student picks an animal avatar and a background colour;
 * it is shown next to their pseudonymous public name everywhere that name appears (leagues, live-mock
 * ranks, their own pages). Not personal data: an avatar is a choice from a fixed list.
 *
 * - **64 animals**, exactly PUBLIC_NAME_ANIMALS (public-names.ts), so "Sturdy Giraffe 304" can wear a giraffe.
 *   Ids are the lower-case animal names. Append only, like the name lists.
 * - **8 background themes**, as design-token names (the UI kit maps `p-avatar-<id>` to colours that work in
 *   light and dark mode). Every background is available to everyone.
 * - **Unlocks by learning only**: 16 starters for everyone from day one, plus the animal of the student's
 *   own public name; the rest unlock by level, badges, streak length, the league tier reached and
 *   live All-India mock participation. No purchases, no coins, no randomness (D-037, D-038; children's
 *   product rules as in learning.ts). Every rule is monotonic (levels, badges, longest streak, best tier and
 *   mocks taken never go down), so an unlocked avatar stays unlocked — except the public-name animal,
 *   which follows the current name.
 *
 * No runtime imports beyond sibling config files without dependencies (the web imports this file).
 */
import { BADGES, LEAGUE_TIERS } from './gamification';
import { PUBLIC_NAME_ANIMALS, fnv1a, publicNameAnimal } from './public-names';

/* Backgrounds ------------------------------------------------------------------------------------ */

export const AVATAR_BACKGROUND_IDS = ['sky', 'mint', 'sunflower', 'coral', 'lavender', 'meadow', 'peach', 'ocean'] as const;
export type AvatarBackgroundId = (typeof AVATAR_BACKGROUND_IDS)[number];

export interface AvatarBackground {
  id: AvatarBackgroundId;
  label: string;
  /** Design token (CSS custom property without the leading `--`), defined by the platform UI kit. */
  token: string;
}

export const AVATAR_BACKGROUNDS: readonly AvatarBackground[] = AVATAR_BACKGROUND_IDS.map((id) => ({
  id,
  label: id.charAt(0).toUpperCase() + id.slice(1),
  token: `p-avatar-${id}`,
}));

/* Unlock rules ----------------------------------------------------------------------------------- */

export type AvatarUnlockRule =
  /** Available to everyone from day one. */
  | { kind: 'starter' }
  /** Reach this level (gamification.ts levelForXp). */
  | { kind: 'level'; level: number }
  /** Earn this badge (gamification.ts BADGES key). */
  | { kind: 'badge'; badge: string }
  /** A streak of at least this many IST days, ever (longest streak). */
  | { kind: 'streak'; days: number }
  /** Play a weekly league in this tier or higher (1-based position in LEAGUE_TIERS). */
  | { kind: 'league_tier'; tier: number }
  /** Take part in this many live All-India mocks (submitted attempts). */
  | { kind: 'live_mocks'; count: number };

export type AvatarUnlockKind = AvatarUnlockRule['kind'];
export const AVATAR_UNLOCK_KINDS = ['starter', 'level', 'badge', 'streak', 'league_tier', 'live_mocks'] as const satisfies readonly AvatarUnlockKind[];

export interface AvatarDefinition {
  /** Lower-case animal name, e.g. 'giraffe'. */
  id: string;
  /** The animal as it appears in public names, e.g. 'Giraffe'. */
  animal: string;
  unlock: AvatarUnlockRule;
}

const starter: AvatarUnlockRule = { kind: 'starter' };
const level = (n: number): AvatarUnlockRule => ({ kind: 'level', level: n });
const badge = (key: string): AvatarUnlockRule => ({ kind: 'badge', badge: key });
const streak = (days: number): AvatarUnlockRule => ({ kind: 'streak', days });
const tier = (t: number): AvatarUnlockRule => ({ kind: 'league_tier', tier: t });
const mocks = (count: number): AvatarUnlockRule => ({ kind: 'live_mocks', count });

/** Unlock rule per animal (every PUBLIC_NAME_ANIMALS entry exactly once; config test). Owner-tunable. */
const UNLOCKS: Readonly<Record<string, AvatarUnlockRule>> = {
  // 16 starters
  Otter: starter, Panda: starter, Dolphin: starter, Koala: starter, Penguin: starter, Rabbit: starter,
  Sparrow: starter, Squirrel: starter, Turtle: starter, Zebra: starter, Deer: starter, Elephant: starter,
  Fox: starter, Giraffe: starter, Kiwi: starter, Owl: starter,
  // Levels (22)
  Parrot: level(2), Finch: level(2), Camel: level(3), Gecko: level(3), Falcon: level(4), Puffin: level(4),
  Crane: level(5), Heron: level(5), Gazelle: level(6), Lemur: level(6), Llama: level(7), Quail: level(7),
  Moose: level(8), Pelican: level(8), Bison: level(9), Seal: level(9), Swan: level(10), Tapir: level(10),
  Whale: level(12), Walrus: level(12), Narwhal: level(15), Wombat: level(15),
  // Badges (12: one per badge)
  Myna: badge('first-lesson'), Beaver: badge('lessons-10'), Robin: badge('first-correct'), Macaw: badge('practice-50'),
  Rhino: badge('practice-250'), Bulbul: badge('streak-3'), Hoopoe: badge('streak-7'), Hornbill: badge('chapter-master'),
  Kingfisher: badge('first-test'), Raven: badge('tests-10'), Panther: badge('perfect-score'), Starling: badge('test-streak-3'),
  // Streak length (5)
  Badger: streak(14), Mongoose: streak(21), Lynx: streak(30), Ibex: streak(50), Yak: streak(100),
  // League tier reached (5: Bronze … Diamond)
  Langur: tier(1), Leopard: tier(2), Tiger: tier(3), Jaguar: tier(4), Peacock: tier(5),
  // Live All-India mocks (4)
  Toucan: mocks(1), Eagle: mocks(3), Cheetah: mocks(5), Lion: mocks(10),
};

export const avatarIdForAnimal = (animal: string): string => animal.toLowerCase();

/** In PUBLIC_NAME_ANIMALS order. A missing rule would be a config error (the test lists it); it falls back to locked at level 999. */
export const AVATARS: readonly AvatarDefinition[] = PUBLIC_NAME_ANIMALS.map((animal) => ({
  id: avatarIdForAnimal(animal),
  animal,
  unlock: UNLOCKS[animal] ?? level(999),
}));

export const AVATAR_IDS: readonly string[] = AVATARS.map((a) => a.id);

const BY_ID = new Map(AVATARS.map((a) => [a.id, a]));

export function avatarById(id: string): AvatarDefinition | null {
  return BY_ID.get(id) ?? null;
}

export function isAvatarId(id: string): boolean {
  return BY_ID.has(id);
}

export function isAvatarBackgroundId(id: string): id is AvatarBackgroundId {
  return (AVATAR_BACKGROUND_IDS as readonly string[]).includes(id);
}

/* Learner state and helpers ---------------------------------------------------------------------- */

/** What unlocks are measured against (GET /v1/me/avatars computes it from stored progress). */
export interface AvatarLearnerState {
  level: number;
  /** Earned badge keys. */
  badges: readonly string[];
  /** Longest streak ever, in IST days. */
  longestStreak: number;
  /** Highest league tier played (1-based), 0 = never in a league. */
  bestLeagueTier: number;
  /** Live All-India mocks with a submitted attempt. */
  liveMocks: number;
  /** Avatar id of the student's current public-name animal (always unlocked); null = none. */
  publicNameAvatar: string | null;
}

export const EMPTY_AVATAR_STATE: AvatarLearnerState = { level: 1, badges: [], longestStreak: 0, bestLeagueTier: 0, liveMocks: 0, publicNameAvatar: null };

/** Progress towards a rule: `current` (capped at `target`) of `target`; starters are 1 of 1. */
export function avatarProgress(rule: AvatarUnlockRule, s: AvatarLearnerState): { current: number; target: number } {
  const cap = (current: number, target: number) => ({ current: Math.max(0, Math.min(target, Math.floor(current))), target });
  switch (rule.kind) {
    case 'starter':
      return { current: 1, target: 1 };
    case 'level':
      return cap(s.level, rule.level);
    case 'badge':
      return cap(s.badges.includes(rule.badge) ? 1 : 0, 1);
    case 'streak':
      return cap(s.longestStreak, rule.days);
    case 'league_tier':
      return cap(s.bestLeagueTier, rule.tier);
    case 'live_mocks':
      return cap(s.liveMocks, rule.count);
  }
}

/** How to unlock, in words: "Reach level 5", "Earn the Week warrior badge", "Reach the Gold league". */
export function avatarUnlockLabel(rule: AvatarUnlockRule): string {
  switch (rule.kind) {
    case 'starter':
      return 'Available to everyone';
    case 'level':
      return `Reach level ${rule.level}`;
    case 'badge':
      return `Earn the ${BADGES.find((b) => b.key === rule.badge)?.name ?? rule.badge} badge`;
    case 'streak':
      return `Keep a ${rule.days}-day learning streak`;
    case 'league_tier':
      return `Play in the ${LEAGUE_TIERS[rule.tier - 1]?.name ?? `tier ${rule.tier}`} league`;
    case 'live_mocks':
      return rule.count === 1 ? 'Take part in a live All-India mock' : `Take part in ${rule.count} live All-India mocks`;
  }
}

export function isAvatarUnlocked(def: AvatarDefinition, s: AvatarLearnerState): boolean {
  if (s.publicNameAvatar === def.id) return true;
  const p = avatarProgress(def.unlock, s);
  return p.current >= p.target;
}

/** Ids of the avatars `s` has unlocked, in AVATARS order. */
export function unlockedAvatars(s: AvatarLearnerState): string[] {
  return AVATARS.filter((a) => isAvatarUnlocked(a, s)).map((a) => a.id);
}

export interface AvatarChoice {
  id: string;
  bg: AvatarBackgroundId;
}

/**
 * The avatar a student wears until they pick one: their public-name animal on a background seeded by
 * the same (account id, public-name seed), so it is stable and changes when they pick a new name. The
 * public name depends on the account id as well as the seed, so both are needed.
 */
export function defaultAvatar(userId: string, publicNameSeed = 0): AvatarChoice {
  return {
    id: avatarIdForAnimal(publicNameAnimal(userId, publicNameSeed)),
    bg: AVATAR_BACKGROUND_IDS[fnv1a(`bg:${userId}:${publicNameSeed}`) % AVATAR_BACKGROUND_IDS.length]!,
  };
}

/** What to show: the stored choice when both parts are valid, else the default. */
export function effectiveAvatar(userId: string, publicNameSeed: number, stored: { id: string | null; bg: string | null }): AvatarChoice & { isDefault: boolean } {
  if (stored.id && stored.bg && isAvatarId(stored.id) && isAvatarBackgroundId(stored.bg)) return { id: stored.id, bg: stored.bg, isDefault: false };
  return { ...defaultAvatar(userId, publicNameSeed), isDefault: true };
}

/** Config self-check used by the tests: every animal has exactly one valid rule. */
export function avatarConfigProblems(): string[] {
  const problems: string[] = [];
  const animals = new Set(PUBLIC_NAME_ANIMALS);
  for (const k of Object.keys(UNLOCKS)) if (!animals.has(k)) problems.push(`unlock rule for unknown animal ${k}`);
  for (const a of PUBLIC_NAME_ANIMALS) if (!(a in UNLOCKS)) problems.push(`no unlock rule for ${a}`);
  const badgeKeys = new Set(BADGES.map((b) => b.key));
  for (const a of AVATARS) {
    const r = a.unlock;
    if (r.kind === 'badge' && !badgeKeys.has(r.badge)) problems.push(`${a.id}: unknown badge ${r.badge}`);
    if (r.kind === 'league_tier' && (r.tier < 1 || r.tier > LEAGUE_TIERS.length)) problems.push(`${a.id}: league tier ${r.tier} out of range`);
    if ((r.kind === 'level' && r.level < 2) || (r.kind === 'streak' && r.days < 1) || (r.kind === 'live_mocks' && r.count < 1)) problems.push(`${a.id}: threshold too low`);
  }
  return problems;
}

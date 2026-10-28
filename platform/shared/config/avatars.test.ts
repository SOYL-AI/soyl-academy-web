import { describe, expect, it } from 'vitest';
import {
  AVATARS,
  AVATAR_BACKGROUNDS,
  AVATAR_BACKGROUND_IDS,
  AVATAR_IDS,
  EMPTY_AVATAR_STATE,
  avatarById,
  avatarConfigProblems,
  avatarProgress,
  defaultAvatar,
  effectiveAvatar,
  isAvatarBackgroundId,
  isAvatarId,
  unlockedAvatars,
  type AvatarLearnerState,
} from './avatars';
import { BADGES, LEAGUE_TIERS } from './gamification';
import { PUBLIC_NAME_ANIMALS, publicName } from './public-names';

const state = (s: Partial<AvatarLearnerState> = {}): AvatarLearnerState => ({ ...EMPTY_AVATAR_STATE, ...s });
const starters = AVATARS.filter((a) => a.unlock.kind === 'starter').map((a) => a.id);

describe('avatar config', () => {
  it('has exactly the 64 public-name animals, 8 backgrounds and a valid rule for each', () => {
    expect(AVATARS).toHaveLength(64);
    expect(AVATARS.map((a) => a.animal)).toEqual([...PUBLIC_NAME_ANIMALS]);
    expect(new Set(AVATAR_IDS).size).toBe(64);
    for (const id of AVATAR_IDS) expect(id).toMatch(/^[a-z]+$/);
    expect(AVATAR_BACKGROUND_IDS).toHaveLength(8);
    expect(AVATAR_BACKGROUNDS.map((b) => b.token)).toEqual(AVATAR_BACKGROUND_IDS.map((id) => `p-avatar-${id}`));
    expect(avatarConfigProblems()).toEqual([]);
    expect(isAvatarId('giraffe')).toBe(true);
    expect(isAvatarId('Giraffe')).toBe(false);
    expect(isAvatarId('unicorn')).toBe(false);
    expect(isAvatarBackgroundId('sky')).toBe(true);
    expect(isAvatarBackgroundId('#ff0000')).toBe(false);
  });

  it('gives about 16 starters and unlocks the rest by level, badge, streak, league tier and live mocks only', () => {
    expect(starters).toHaveLength(16);
    const kinds = new Map<string, number>();
    for (const a of AVATARS) kinds.set(a.unlock.kind, (kinds.get(a.unlock.kind) ?? 0) + 1);
    expect(Object.fromEntries(kinds)).toEqual({ starter: 16, level: 22, badge: 12, streak: 5, league_tier: 5, live_mocks: 4 });
    // Every badge and every league tier unlocks one avatar.
    expect(AVATARS.flatMap((a) => (a.unlock.kind === 'badge' ? [a.unlock.badge] : [])).sort()).toEqual(BADGES.map((b) => b.key).sort());
    expect(AVATARS.flatMap((a) => (a.unlock.kind === 'league_tier' ? [a.unlock.tier] : [])).sort()).toEqual(LEAGUE_TIERS.map((_, i) => i + 1));
    expect(unlockedAvatars(EMPTY_AVATAR_STATE)).toEqual(starters);
  });
});

describe('unlockedAvatars', () => {
  it('unlocks by level', () => {
    expect(unlockedAvatars(state({ level: 1 }))).not.toContain('parrot');
    expect(unlockedAvatars(state({ level: 2 }))).toEqual(expect.arrayContaining(['parrot', 'finch']));
    expect(unlockedAvatars(state({ level: 4 }))).not.toContain('crane');
    expect(unlockedAvatars(state({ level: 15 }))).toEqual(expect.arrayContaining(['narwhal', 'wombat', 'whale', 'swan']));
    expect(avatarProgress(avatarById('crane')!.unlock, state({ level: 3 }))).toEqual({ current: 3, target: 5 });
  });

  it('unlocks by badge', () => {
    expect(unlockedAvatars(state())).not.toContain('robin');
    expect(unlockedAvatars(state({ badges: ['first-correct'] }))).toContain('robin');
    expect(unlockedAvatars(state({ badges: ['first-correct'] }))).not.toContain('macaw');
    expect(avatarProgress(avatarById('robin')!.unlock, state())).toEqual({ current: 0, target: 1 });
  });

  it('unlocks by longest streak', () => {
    expect(unlockedAvatars(state({ longestStreak: 13 }))).not.toContain('badger');
    expect(unlockedAvatars(state({ longestStreak: 14 }))).toContain('badger');
    expect(unlockedAvatars(state({ longestStreak: 100 }))).toEqual(expect.arrayContaining(['badger', 'mongoose', 'lynx', 'ibex', 'yak']));
  });

  it('unlocks by league tier reached (and every lower tier)', () => {
    expect(unlockedAvatars(state({ bestLeagueTier: 0 }))).not.toContain('langur');
    const gold = unlockedAvatars(state({ bestLeagueTier: 3 }));
    expect(gold).toEqual(expect.arrayContaining(['langur', 'leopard', 'tiger']));
    expect(gold).not.toContain('jaguar');
    expect(gold).not.toContain('peacock');
  });

  it('unlocks by live-mock participation', () => {
    expect(unlockedAvatars(state({ liveMocks: 1 }))).toContain('toucan');
    expect(unlockedAvatars(state({ liveMocks: 4 }))).toEqual(expect.arrayContaining(['toucan', 'eagle']));
    expect(unlockedAvatars(state({ liveMocks: 4 }))).not.toContain('cheetah');
    expect(unlockedAvatars(state({ liveMocks: 10 }))).toContain('lion');
  });

  it('always includes the student’s own public-name animal', () => {
    expect(unlockedAvatars(state({ publicNameAvatar: 'peacock' }))).toContain('peacock');
    expect(unlockedAvatars(state({ publicNameAvatar: 'peacock' }))).toHaveLength(17);
  });
});

describe('defaultAvatar', () => {
  const id = '01900000-0000-7000-8000-000000000001';

  it('is the public-name animal on a seeded background: stable per (id, seed), changes with the seed', () => {
    for (let seed = 0; seed < 50; seed++) {
      const d = defaultAvatar(id, seed);
      const animal = publicName(id, seed).split(' ')[1]!;
      expect(d.id).toBe(animal.toLowerCase());
      expect(AVATAR_BACKGROUND_IDS).toContain(d.bg);
      expect(defaultAvatar(id, seed)).toEqual(d);
    }
    expect(new Set(Array.from({ length: 50 }, (_, s) => defaultAvatar(id, s).bg)).size).toBeGreaterThan(4);
    expect(defaultAvatar(id)).toEqual(defaultAvatar(id, 0));
  });

  it('effectiveAvatar uses a valid stored choice and otherwise the default', () => {
    expect(effectiveAvatar(id, 3, { id: 'tiger', bg: 'mint' })).toEqual({ id: 'tiger', bg: 'mint', isDefault: false });
    expect(effectiveAvatar(id, 3, { id: null, bg: null })).toEqual({ ...defaultAvatar(id, 3), isDefault: true });
    expect(effectiveAvatar(id, 3, { id: 'unicorn', bg: 'mint' }).isDefault).toBe(true);
    expect(effectiveAvatar(id, 3, { id: 'tiger', bg: 'neon' }).isDefault).toBe(true);
  });
});

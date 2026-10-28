/**
 * Student avatars (config @soyl/shared/config/avatars; profiles.avatar_id / avatar_bg, migration 0014).
 *
 * - GET /v1/me shows the avatar the student wears ({ id, bg, isDefault }); GET /v1/me/avatars lists every
 *   avatar with its unlock rule, progress and lock state; PATCH /v1/me { avatar } picks one (403
 *   avatar_locked when it is not unlocked) or resets to the default (null).
 * - Public surfaces that show the pseudonymous public name (league standings, live-mock ranks) show the
 *   avatar next to it — ids from the config only, never user ids or real names (leaderboardIdentities).
 * - The learner state behind the unlocks is read from the caller's own rows (API-7): level and longest
 *   streak (streaks), badges (user_badges), highest league tier played (league_memberships) and live mocks
 *   with a submitted attempt (attempts).
 */
import { and, eq, sql } from 'drizzle-orm';
import { badges, profiles, userBadges, type Database } from '@soyl/db';
import {
  AVATARS,
  AVATAR_BACKGROUNDS,
  avatarById,
  avatarIdForAnimal,
  avatarProgress,
  avatarUnlockLabel,
  defaultAvatar,
  effectiveAvatar,
  isAvatarUnlocked,
  type AvatarBackgroundId,
  type AvatarLearnerState,
} from '@soyl/shared/config/avatars';
import { publicNameAnimal } from '@soyl/shared/config/public-names';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';

export interface AvatarDto {
  id: string;
  bg: AvatarBackgroundId;
}

type ProfileAvatarFields = { publicNameSeed: number | null; avatarId: string | null; avatarBg: string | null } | null | undefined;

/** What the student wears now (stored choice or the default for their public name). */
export function avatarFor(userId: string, p: ProfileAvatarFields): AvatarDto & { isDefault: boolean } {
  return effectiveAvatar(userId, p?.publicNameSeed ?? 0, { id: p?.avatarId ?? null, bg: p?.avatarBg ?? null });
}

/** The learner state behind the unlocks (the caller's own rows only). */
export async function avatarLearnerState(db: Database, userId: string, publicNameSeed: number): Promise<AvatarLearnerState> {
  const [counts, earned] = await Promise.all([
    db.execute<{ level: number | null; longest: number | null; tier: number | null; mocks: number | null }>(sql`
      SELECT
        (SELECT level FROM streaks WHERE user_id = ${userId}) AS level,
        (SELECT longest_days FROM streaks WHERE user_id = ${userId}) AS longest,
        (SELECT max(tier)::int FROM league_memberships WHERE user_id = ${userId}) AS tier,
        (SELECT count(DISTINCT live_event_id)::int FROM attempts
          WHERE user_id = ${userId} AND live_event_id IS NOT NULL AND submitted_at IS NOT NULL) AS mocks`),
    db.select({ key: badges.key }).from(userBadges).innerJoin(badges, eq(badges.id, userBadges.badgeId)).where(eq(userBadges.userId, userId)),
  ]);
  const r = counts.rows[0];
  return {
    level: Math.max(1, Number(r?.level ?? 1)),
    longestStreak: Number(r?.longest ?? 0),
    bestLeagueTier: Number(r?.tier ?? 0),
    liveMocks: Number(r?.mocks ?? 0),
    badges: earned.map((b) => b.key),
    publicNameAvatar: avatarIdForAnimal(publicNameAnimal(userId, publicNameSeed)),
  };
}

async function profileOf(db: Database, userId: string) {
  const [p] = await db
    .select({ publicNameSeed: profiles.publicNameSeed, avatarId: profiles.avatarId, avatarBg: profiles.avatarBg })
    .from(profiles)
    .where(eq(profiles.userId, userId));
  return p ?? null;
}

/** GET /v1/me/avatars: every avatar with its rule, progress and lock state, plus the backgrounds. */
export async function avatarCatalog(db: Database, userId: string) {
  const p = await profileOf(db, userId);
  const seed = p?.publicNameSeed ?? 0;
  const state = await avatarLearnerState(db, userId, seed);
  const avatars = AVATARS.map((a) => ({
    id: a.id,
    animal: a.animal,
    unlocked: isAvatarUnlocked(a, state),
    /** Unlocked because it is the animal of your public name (it follows the name). */
    isPublicNameAnimal: a.id === state.publicNameAvatar,
    unlock: a.unlock,
    unlockLabel: avatarUnlockLabel(a.unlock),
    progress: avatarProgress(a.unlock, state),
  }));
  return {
    current: avatarFor(userId, p),
    default: defaultAvatar(userId, seed),
    backgrounds: AVATAR_BACKGROUNDS.map((b) => ({ id: b.id, label: b.label, token: b.token })),
    unlockedCount: avatars.filter((a) => a.unlocked).length,
    total: avatars.length,
    avatars,
  };
}

/**
 * PATCH /v1/me { avatar }: the choice must be unlocked now (403 avatar_locked). null = back to the default.
 * Returns the profile columns to write.
 */
export async function avatarUpdate(db: Database, userId: string, input: { id: string; bg: AvatarBackgroundId } | null): Promise<{ avatarId: string | null; avatarBg: string | null }> {
  if (input === null) return { avatarId: null, avatarBg: null };
  const def = avatarById(input.id);
  if (!def) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.avatar.id', message: 'Unknown avatar.' }] });
  const p = await profileOf(db, userId);
  const state = await avatarLearnerState(db, userId, p?.publicNameSeed ?? 0);
  if (!isAvatarUnlocked(def, state)) throw new ApiProblem('avatar_locked', { detail: `${avatarUnlockLabel(def.unlock)} to unlock the ${def.animal}.`, fields: { avatar: def.id } });
  return { avatarId: def.id, avatarBg: input.bg };
}

/**
 * After the public name changes (POST /v1/me/public-name): a picked avatar that was unlocked only as the
 * old name's animal goes back to the default, so cycling names cannot collect animals.
 */
export async function dropAvatarIfLocked(db: Database, clock: Clock, userId: string): Promise<void> {
  const p = await profileOf(db, userId);
  if (!p?.avatarId) return;
  const def = avatarById(p.avatarId);
  const state = await avatarLearnerState(db, userId, p.publicNameSeed ?? 0);
  if (def && isAvatarUnlocked(def, state)) return;
  await db
    .update(profiles)
    .set({ avatarId: null, avatarBg: null, updatedAt: new Date(clock.now()) })
    .where(and(eq(profiles.userId, userId), eq(profiles.avatarId, p.avatarId)));
}

/** zod schemas for student avatars (@soyl/shared/config/avatars; GET/PATCH /v1/me, GET /v1/me/avatars, public boards). */
import { z } from 'zod/v4';
import { AVATAR_BACKGROUND_IDS, AVATAR_IDS, AVATAR_UNLOCK_KINDS } from '@soyl/shared/config/avatars';

export const AvatarIdSchema = z.enum(AVATAR_IDS as [string, ...string[]]).meta({ id: 'AvatarId', description: 'Lower-case animal of the public-name list, e.g. "giraffe" (@soyl/shared/config/avatars).' });
export const AvatarBackgroundSchema = z.enum(AVATAR_BACKGROUND_IDS).meta({ id: 'AvatarBackground', description: 'Background theme; the UI kit token is `p-avatar-<id>`.' });

/** An avatar as shown on public boards next to the public name. */
export const AvatarRefSchema = z.object({ id: AvatarIdSchema, bg: AvatarBackgroundSchema }).meta({ id: 'AvatarRef' });

/** Your own avatar: isDefault until you pick one (the default is your public-name animal on a seeded background). */
export const MyAvatarSchema = z.object({ id: AvatarIdSchema, bg: AvatarBackgroundSchema, isDefault: z.boolean() }).meta({ id: 'MyAvatar' });

/** PATCH /v1/me `avatar`: pick an unlocked avatar and a background, or null for the default. */
export const AvatarInput = z.strictObject({ id: AvatarIdSchema, bg: AvatarBackgroundSchema }).nullable().meta({ id: 'AvatarChoice' });

export const AvatarUnlockRuleSchema = z
  .discriminatedUnion('kind', [
    z.object({ kind: z.literal('starter') }),
    z.object({ kind: z.literal('level'), level: z.number().int() }),
    z.object({ kind: z.literal('badge'), badge: z.string() }),
    z.object({ kind: z.literal('streak'), days: z.number().int() }),
    z.object({ kind: z.literal('league_tier'), tier: z.number().int() }),
    z.object({ kind: z.literal('live_mocks'), count: z.number().int() }),
  ])
  .meta({ id: 'AvatarUnlockRule', description: `One of ${AVATAR_UNLOCK_KINDS.join(', ')}. league_tier is 1-based (Bronze = 1). Learning only: no purchases, no coins.` });

export const AvatarCatalogResponse = z
  .object({
    current: MyAvatarSchema,
    /** What `PATCH /v1/me { avatar: null }` goes back to. */
    default: AvatarRefSchema,
    backgrounds: z.array(z.object({ id: AvatarBackgroundSchema, label: z.string(), token: z.string() })),
    unlockedCount: z.number().int(),
    total: z.number().int(),
    avatars: z.array(
      z.object({
        id: AvatarIdSchema,
        animal: z.string(),
        unlocked: z.boolean(),
        /** Unlocked as the animal of your current public name (a new name changes it). */
        isPublicNameAnimal: z.boolean(),
        unlock: AvatarUnlockRuleSchema,
        /** "Reach level 5", "Earn the Week warrior badge", … */
        unlockLabel: z.string(),
        /** Progress towards `unlock` (current capped at target; starters 1/1). */
        progress: z.object({ current: z.number().int(), target: z.number().int() }),
      }),
    ),
  })
  .meta({ id: 'AvatarCatalog', description: 'Every avatar with its unlock rule and your progress. Backgrounds are open to everyone.' });

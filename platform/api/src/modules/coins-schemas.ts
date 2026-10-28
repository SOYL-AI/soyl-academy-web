/** zod schemas for SOYL Coins (ADR-021), shared by the coins routes and the practice/test responses. */
import { z } from 'zod/v4';
import { COIN_EARN_SOURCES, COIN_LEDGER_SOURCES, INDIA_STATES, REDEMPTION_STATUSES } from '@soyl/shared/config/coins';
import { INDIA_MOBILE_REGEX } from '@soyl/shared/config/security';

export const CoinEarnSourceSchema = z.enum(COIN_EARN_SOURCES).meta({ id: 'CoinEarnSource' });

export const CoinAwardSchema = z.object({ source: CoinEarnSourceSchema, amount: z.number().int(), cappedOut: z.boolean() }).meta({ id: 'CoinAward' });

/** Added to practice-answer and test-submit results: coins this event paid (0 for guests). */
export const coinAwardFields = {
  coinsAwarded: z.number().int(),
  coinAwards: z.array(CoinAwardSchema),
};

const Milestone = z.object({ solved: z.number().int(), coins: z.number().int(), reached: z.boolean() });

export const CoinsSummarySchema = z
  .object({
    balance: z.number().int(),
    lifetimeEarned: z.number().int(),
    today: z.object({
      day: z.iso.date(),
      /** Coins from capped sources today and the cap they share. */
      earnedCapped: z.number().int(),
      cap: z.number().int(),
      remaining: z.number().int(),
      earnedTotal: z.number().int(),
      resetsAt: z.iso.datetime(),
    }),
    checkIn: z.object({
      checkedInToday: z.boolean(),
      current: z.number().int(),
      longest: z.number().int(),
      coins: z.number().int(),
      /** The next streak bonus: in how many check-ins (counting today's if not done yet). */
      nextBonus: z.object({ everyDays: z.number().int(), coins: z.number().int(), inDays: z.number().int() }).nullable(),
    }),
    solved: z.object({ count: z.number().int(), milestones: z.array(Milestone), next: Milestone.nullable() }),
    chaptersMastered: z.number().int(),
    equipped: z.object({ frame: z.string().nullable(), theme: z.string().nullable() }),
  })
  .meta({ id: 'CoinsSummary' });

export const CoinHistorySchema = z
  .object({
    entries: z.array(
      z.object({
        id: z.uuid(),
        kind: z.enum(['earn', 'redeem', 'refund', 'adjust']),
        source: z.enum(COIN_LEDGER_SOURCES),
        amount: z.number().int(),
        balanceAfter: z.number().int(),
        istDay: z.iso.date(),
        cappedOut: z.boolean(),
        redemptionId: z.uuid().nullable(),
        detail: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])),
        createdAt: z.iso.datetime(),
      }),
    ),
    nextCursor: z.string().nullable(),
  })
  .meta({ id: 'CoinHistory' });

export const CheckInResultSchema = z
  .object({
    day: z.iso.date(),
    alreadyCheckedIn: z.boolean(),
    streak: z.number().int(),
    longest: z.number().int(),
    coinsAwarded: z.number().int(),
    awards: z.array(CoinAwardSchema),
    balance: z.number().int(),
  })
  .meta({ id: 'CoinCheckIn' });

export const ItemStateSchema = z
  .enum(['available', 'sign_in', 'insufficient_coins', 'locked', 'owned', 'limit_reached', 'sold_out', 'upcoming', 'ended', 'coming_soon', 'verification_needed', 'consent_needed'])
  .meta({ id: 'StoreItemState' });

export const StoreSchema = z
  .object({
    balance: z.number().int().nullable(),
    physicalRedemptionEnabled: z.boolean(),
    consentStatus: z.enum(['required', 'pending', 'granted', 'revoked']).nullable(),
    verified: z.boolean().nullable(),
    items: z.array(
      z.object({
        key: z.string(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        type: z.enum(['digital', 'physical']),
        slot: z.enum(['frame', 'theme']).nullable(),
        priceCoins: z.number().int(),
        stock: z.number().int().nullable(),
        remaining: z.number().int().nullable(),
        availableFrom: z.string().nullable(),
        availableUntil: z.string().nullable(),
        eligibilityLabel: z.string().nullable(),
        eligible: z.boolean().nullable(),
        owned: z.number().int().nullable(),
        maxPerUser: z.number().int(),
        state: ItemStateSchema,
      }),
    ),
  })
  .meta({ id: 'CoinStore' });

export const RedemptionSchema = z
  .object({
    id: z.uuid(),
    itemKey: z.string(),
    itemName: z.string(),
    itemType: z.enum(['digital', 'physical']),
    priceCoins: z.number().int(),
    status: z.enum(REDEMPTION_STATUSES),
    statusReason: z.string().nullable(),
    addressOnFile: z.boolean(),
    trackingRef: z.string().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .meta({ id: 'CoinRedemption' });

const text = (max: number) => z.string().trim().min(1).max(max).regex(/^[^<>{}\u0000-\u001f]*$/, 'Use letters, numbers and normal punctuation.');

export const ShippingAddressSchema = z
  .strictObject({
    recipientName: text(80),
    line1: text(120),
    line2: text(120).nullish(),
    city: text(60),
    state: z.enum(INDIA_STATES as [string, ...string[]]),
    pincode: z.string().regex(/^[1-9]\d{5}$/, 'A 6-digit PIN code.'),
    phone: z.string().regex(INDIA_MOBILE_REGEX, 'An Indian mobile number as +91XXXXXXXXXX.'),
  })
  .meta({ id: 'ShippingAddress' });

export const DailyChallengeSchema = z.object({
  day: z.iso.date(),
  resetsAt: z.iso.datetime(),
  coins: z.number().int(),
  awardsPerDay: z.number().int(),
  /** Signed in: challenge awards already earned today (null for guests). */
  earnedToday: z.number().int().nullable(),
  board: z.enum(['cbse', 'cisce']).nullable(),
  classLevel: z.number().int().nullable(),
  /** `class_required`: no board/class given and none on the profile. */
  status: z.enum(['ok', 'class_required']),
});

/**
 * SOYL Coins (D-037, ADR-021). Earn-only; never bought, transferred or converted. Member routes are
 * scoped to the caller (API-7) and never cached.
 *
 *   GET   /v1/coins                                  balance, today vs the daily cap, check-in streak, milestones
 *   GET   /v1/coins/history?cursor=&limit=           your ledger, newest first
 *   POST  /v1/coins/check-in                         once per IST day (idempotent)
 *   GET   /v1/coins/daily-challenge?board=&class=    today's challenge per subject (guests may look)
 *   GET   /v1/coins/store                            items with your state (guests may look)
 *   POST  /v1/coins/redeem                           digital: granted at once; physical: verified + consent + flag
 *   GET   /v1/coins/redemptions                      your redemptions
 *   PUT   /v1/coins/redemptions/:id/address          shipping address (physical; only after the gates pass)
 *   POST  /v1/coins/redemptions/:id/cancel           before approval; coins come back
 *   PUT   /v1/coins/equipped                         equip owned frame/theme
 *
 * Staff (reviewer/admin + two-step verified session; writes also need a fresh session, AUTH-9):
 *   GET   /v1/admin/coins/redemptions?status=        review queue (addresses decrypted only to ship; audit-logged)
 *   POST  /v1/admin/coins/redemptions/:id/approve    parent approval confirmed (consent re-checked), ok to ship
 *   POST  /v1/admin/coins/redemptions/:id/fulfil     shipped, with a tracking reference
 *   POST  /v1/admin/coins/redemptions/:id/reject     refused; coins refunded, address erased
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { eq } from 'drizzle-orm';
import { z } from 'zod/v4';
import { istDay, profiles } from '@soyl/db';
import { REDEMPTION_STATUSES } from '@soyl/shared/config/coins';
import { STAFF_ROLES, policies, type RoutePolicy } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import { nextIstMidnight } from '../ai/time';
import { checkIn } from '../domain/coins/awards';
import { challengeCoins, dailyChallenges } from '../domain/coins/challenge';
import { balanceOf, history } from '../domain/coins/ledger';
import {
  adminApprove,
  adminFulfil,
  adminListRedemptions,
  adminReject,
  cancelRedemption,
  equip,
  myRedemptions,
  redeem,
  storeView,
  submitAddress,
  type StoreDeps,
} from '../domain/coins/store';
import { coinsSummary } from '../domain/coins/summary';
import { StudentQuestionSchema } from './content-schemas';
import {
  CheckInResultSchema,
  CoinHistorySchema,
  CoinsSummarySchema,
  DailyChallengeSchema,
  RedemptionSchema,
  ShippingAddressSchema,
  StoreSchema,
} from './coins-schemas';

const ItemKey = z.string().min(2).max(64).regex(/^[a-z0-9][a-z0-9-]*$/);
const RedemptionParams = z.strictObject({ id: z.uuid() });
const EmptyBody = z.strictObject({}).nullish();

const DailyChallengeResponse = DailyChallengeSchema.extend({
  challenges: z.array(
    z.object({
      subjectId: z.string(),
      subjectName: z.string(),
      chapterId: z.string(),
      chapterTitle: z.string(),
      question: StudentQuestionSchema,
      solved: z.boolean().nullable(),
    }),
  ),
}).meta({ id: 'DailyChallenge' });

const AdminRedemption = RedemptionSchema.extend({
  student: z.uuid().nullable(),
  address: ShippingAddressSchema.nullable(),
}).meta({ id: 'AdminCoinRedemption' });

const staffRead = (): RoutePolicy => ({ roles: STAFF_ROLES, csrf: true, rateLimit: { buckets: [] }, consent: false, mfa: true });
const staffWrite = (): RoutePolicy => ({ ...staffRead(), fresh: true });
const coinsWrite = (): RoutePolicy => policies.member({ rateLimit: { buckets: ['coins.write.user'] } });

export function registerCoinsRoutes(appIn: FastifyInstance, deps: AppDeps, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, config, clock } = deps;
  const year = config.academicYear;
  const now = () => new Date(clock.now());
  const store: StoreDeps = {
    db,
    consent: services.consent,
    redemptionEnabled: config.coins.redemptionEnabled,
    physicalEnabled: config.coins.physicalRedemptionEnabled,
    masterKey: config.mfaEncryptionKey,
    items: deps.coins?.items,
  };

  app.get('/v1/coins', {
    config: { policy: policies.member() },
    schema: { tags: ['coins'], summary: 'Your SOYL Coins: balance, today against the daily cap, check-in streak, milestones', response: withProblems({ 200: CoinsSummarySchema }) },
    handler: async (request) => coinsSummary(db, now(), request.auth!.user.id),
  });

  app.get('/v1/coins/history', {
    config: { policy: policies.member() },
    schema: {
      tags: ['coins'],
      summary: 'Your coin history (earned, redeemed, refunded), newest first',
      querystring: z.strictObject({ cursor: z.string().max(200).optional(), limit: z.coerce.number().int().min(1).max(100).default(30) }),
      response: withProblems({ 200: CoinHistorySchema }),
    },
    handler: async (request) => history(db, request.auth!.user.id, request.query),
  });

  app.post('/v1/coins/check-in', {
    config: { policy: coinsWrite() },
    schema: { tags: ['coins'], summary: 'Daily check-in (once per IST day; idempotent)', body: EmptyBody, response: withProblems({ 200: CheckInResultSchema }) },
    handler: async (request) => {
      const r = await checkIn(db, now(), request.auth!.user.id);
      return { ...r, balance: await balanceOf(db, request.auth!.user.id) };
    },
  });

  app.get('/v1/coins/daily-challenge', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['coins'],
      summary: "Today's daily challenge question for each subject of a board and class (defaults to your profile)",
      querystring: z.strictObject({ board: z.enum(['cbse', 'cisce']).optional(), class: z.coerce.number().int().min(7).max(12).optional() }),
      response: withProblems({ 200: DailyChallengeResponse }),
    },
    handler: async (request) => {
      const at = now();
      const day = istDay(at);
      const userId = request.auth?.user.id ?? null;
      let board = request.query.board ?? null;
      let classLevel = request.query.class ?? null;
      if ((!board || !classLevel) && userId) {
        const [p] = await db.select({ board: profiles.board, classLevel: profiles.classLevel }).from(profiles).where(eq(profiles.userId, userId));
        board ??= (p?.board as 'cbse' | 'cisce' | null) ?? null;
        classLevel ??= p?.classLevel ?? null;
      }
      const base = { day, resetsAt: nextIstMidnight(at).toISOString(), ...challengeCoins(), board, classLevel };
      if (!board || !classLevel) return { ...base, earnedToday: userId ? 0 : null, status: 'class_required' as const, challenges: [] };
      const r = await dailyChallenges(db, year, board, classLevel, day, at.getTime(), userId);
      return { ...base, earnedToday: userId ? r.earnedToday : null, status: 'ok' as const, challenges: r.entries };
    },
  });

  app.get('/v1/coins/store', {
    config: { policy: policies.publicRead() },
    schema: { tags: ['coins'], summary: 'The SOYL store: items, prices, drops and what you can redeem', response: withProblems({ 200: StoreSchema }) },
    handler: async (request) => storeView(store, now(), request.auth ? request.auth.user : null),
  });

  app.post('/v1/coins/redeem', {
    config: { policy: policies.member({ rateLimit: { buckets: ['coins.redeem.user'] } }) },
    schema: {
      tags: ['coins'],
      summary: 'Redeem coins for an item. Digital items are granted at once; merch needs a verified account, parent consent and redemption switched on, then an address.',
      body: z.strictObject({ itemKey: ItemKey }),
      response: withProblems({ 200: z.object({ redemption: RedemptionSchema, balance: z.number().int() }).meta({ id: 'CoinRedeemResult' }) }),
    },
    handler: async (request) => redeem(store, now(), request.auth!.user, request.body.itemKey),
  });

  app.get('/v1/coins/redemptions', {
    config: { policy: policies.member() },
    schema: { tags: ['coins'], summary: 'Your redemptions', response: withProblems({ 200: z.object({ redemptions: z.array(RedemptionSchema) }).meta({ id: 'CoinRedemptions' }) }) },
    handler: async (request) => ({ redemptions: await myRedemptions(db, request.auth!.user.id) }),
  });

  app.put('/v1/coins/redemptions/:id/address', {
    config: { policy: policies.member({ rateLimit: { buckets: ['coins.write.user'] }, consent: 'physical_rewards' }) },
    schema: {
      tags: ['coins'],
      summary: 'Shipping address for a merch redemption (only after verification, parent consent and redemption are in place)',
      params: RedemptionParams,
      body: ShippingAddressSchema,
      response: withProblems({ 200: RedemptionSchema }),
    },
    handler: async (request) => submitAddress(store, now(), request.auth!.user, request.params.id, request.body),
  });

  app.post('/v1/coins/redemptions/:id/cancel', {
    config: { policy: coinsWrite() },
    schema: { tags: ['coins'], summary: 'Cancel a merch redemption before approval (coins come back)', params: RedemptionParams, body: EmptyBody, response: withProblems({ 200: RedemptionSchema }) },
    handler: async (request) => cancelRedemption(store, now(), request.auth!.user.id, request.params.id),
  });

  app.put('/v1/coins/equipped', {
    config: { policy: coinsWrite() },
    schema: {
      tags: ['coins'],
      summary: 'Equip an owned profile frame or theme (null takes it off)',
      body: z.strictObject({ frame: ItemKey.nullable().optional(), theme: ItemKey.nullable().optional() }),
      response: withProblems({ 200: z.object({ frame: z.string().nullable(), theme: z.string().nullable() }).meta({ id: 'CoinEquipped' }) }),
    },
    handler: async (request) => equip(store, now(), request.auth!.user.id, request.body),
  });

  /* Staff -------------------------------------------------------------------------------------- */

  app.get('/v1/admin/coins/redemptions', {
    config: { policy: staffRead() },
    schema: {
      tags: ['admin'],
      summary: 'Merch redemptions by status (staff, two-step verified). Addresses only while under review or approved; viewing is audit-logged.',
      querystring: z.strictObject({ status: z.enum(REDEMPTION_STATUSES).default('parent_approval_pending'), limit: z.coerce.number().int().min(1).max(100).default(50) }),
      response: withProblems({ 200: z.object({ redemptions: z.array(AdminRedemption) }).meta({ id: 'AdminCoinRedemptions' }) }),
    },
    handler: async (request) => ({ redemptions: await adminListRedemptions(store, request.auth!.user, { ...request.query, requestId: String(request.id) }) }),
  });

  app.post('/v1/admin/coins/redemptions/:id/approve', {
    config: { policy: staffWrite() },
    schema: { tags: ['admin'], summary: "Approve a merch redemption after review (the student's consent is re-checked)", params: RedemptionParams, body: EmptyBody, response: withProblems({ 200: RedemptionSchema }) },
    handler: async (request) => adminApprove(store, now(), request.auth!.user, request.params.id, String(request.id)),
  });

  app.post('/v1/admin/coins/redemptions/:id/fulfil', {
    config: { policy: staffWrite() },
    schema: {
      tags: ['admin'],
      summary: 'Mark an approved merch redemption shipped',
      params: RedemptionParams,
      body: z.strictObject({ trackingRef: z.string().trim().min(3).max(64).regex(/^[A-Za-z0-9 ._:/-]+$/) }),
      response: withProblems({ 200: RedemptionSchema }),
    },
    handler: async (request) => adminFulfil(store, now(), request.auth!.user, request.params.id, request.body.trackingRef, String(request.id)),
  });

  app.post('/v1/admin/coins/redemptions/:id/reject', {
    config: { policy: staffWrite() },
    schema: {
      tags: ['admin'],
      summary: 'Reject a merch redemption: coins are refunded and the address erased',
      params: RedemptionParams,
      body: z.strictObject({ reason: z.enum(['staff_rejected', 'out_of_stock']).default('staff_rejected') }),
      response: withProblems({ 200: RedemptionSchema }),
    },
    handler: async (request) => adminReject(store, now(), request.auth!.user, request.params.id, request.body.reason, String(request.id)),
  });
}

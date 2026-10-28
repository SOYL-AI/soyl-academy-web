/**
 * /v1/me — the signed-in user's own data. Every query is scoped to `request.auth.user.id` (API-7);
 * ids of other users' resources return 404.
 *
 *   GET    /v1/me                    profile, consent, sign-in methods
 *   PATCH  /v1/me                    board, classLevel, displayName, locale (API-8 allowlist; D-039: no school or city)
 *   DELETE /v1/me                    anonymise + revoke now, purge ≤ 30 days (fresh session)
 *   POST   /v1/me/merge-guest        guest progress, once per account (256 KB body)
 *   POST   /v1/me/consent/start      start the parental-consent flow (built-in flow: modules/consent.ts)
 *   POST   /v1/me/public-name        a new random public (leaderboard) name (D-039)
 *   GET    /v1/me/sessions           this account's sessions (AUTH-10)
 *   DELETE /v1/me/sessions/:id       revoke one (404 if not yours)
 *   DELETE /v1/me/sessions           revoke all others
 */
import { randomInt } from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { profiles } from '@soyl/db';
import { publicName, PUBLIC_NAME_MAX_SEED } from '@soyl/shared/config/public-names';
import { ACCOUNT, BODY_LIMITS, type ConsentState } from '@soyl/shared/config/security';
import { ApiProblem } from '../errors';
import { authEvent } from '../logging';
import { policies } from '../policy';
import { BoardSchema, ClassLevelSchema, ConsentStateSchema, LocaleSchema, RoleSchema, withProblems } from '../schemas';
import type { AppDeps, Services } from '../services';
import { GuestProgress, MergeGuestResponse } from '../contract/guest';
import { validateDisplayName } from '../domain/display-name';
import { loadProfile } from '../domain/profile';
import { mergeGuestProgress } from '../domain/guest-merge';
import { deleteAccount } from '../domain/account-deletion';
import { removeFromLiveBoards } from '../domain/tests/live';

const MeResponse = z
  .object({
    id: z.uuid(),
    role: RoleSchema,
    displayName: z.string().nullable(),
    board: BoardSchema.nullable(),
    classLevel: ClassLevelSchema.nullable(),
    /** D-039: the only name other students ever see (leaderboards, leagues, live ranks); auto-generated. */
    publicName: z.string(),
    locale: z.string(),
    consent: ConsentStateSchema,
    methods: z.object({ phone: z.string().nullable(), email: z.string().nullable(), google: z.boolean() }),
    guestMergedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'Me' });

const PatchMeBody = z
  .strictObject({
    displayName: z.string().max(100).nullable().optional(),
    board: BoardSchema.optional(),
    classLevel: ClassLevelSchema.optional(),
    locale: LocaleSchema.optional(),
  })
  .refine((b) => Object.keys(b).length > 0, 'at least one field')
  .meta({ id: 'PatchMe', description: 'API-8: only these fields; role, status, xp, school, city etc. are rejected (400; D-039: no school or city).' });

const SessionsResponse = z.object({
  sessions: z.array(
    z.object({ id: z.uuid(), current: z.boolean(), createdAt: z.iso.datetime(), lastActiveAt: z.iso.datetime(), expiresAt: z.iso.datetime(), userAgent: z.string().nullable() }),
  ),
});

const DeleteMeResponse = z.object({ deleted: z.literal(true), purgeAfter: z.iso.datetime() }).meta({ id: 'DeleteMeResponse' });
const ConsentStartResponse = z.object({ status: ConsentStateSchema, redirectUrl: z.url().nullable() }).meta({ id: 'ConsentStartResponse' });

export function registerMeRoutes(appIn: FastifyInstance, services: Services, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, clock, config } = deps;

  async function me(userId: string) {
    const user = await services.identity.userById(userId);
    if (!user) throw new ApiProblem('not_found');
    const p = await loadProfile(db, userId);
    const consent: ConsentState = await services.consent.getStatus(userId);
    return {
      id: user.id,
      role: user.role,
      displayName: p?.displayName ?? null,
      board: (p?.board as 'cbse' | 'cisce' | null | undefined) ?? null,
      classLevel: p?.classLevel ?? null,
      publicName: publicName(user.id, p?.publicNameSeed ?? 0),
      locale: p?.locale ?? 'en-IN',
      consent,
      methods: await services.identity.methods(userId),
      guestMergedAt: p?.guestMergedAt?.toISOString() ?? null,
      createdAt: user.createdAt.toISOString(),
    };
  }

  app.get('/v1/me', {
    config: { policy: policies.member() },
    schema: { tags: ['me'], summary: 'Your profile, consent state and sign-in methods', response: withProblems({ 200: MeResponse }) },
    handler: async (request) => me(request.auth!.user.id),
  });

  app.patch('/v1/me', {
    config: { policy: policies.member({ rateLimit: { buckets: ['me.write.user'] } }) },
    schema: { tags: ['me'], summary: 'Update profile fields (allowlist)', body: PatchMeBody, response: withProblems({ 200: MeResponse }) },
    handler: async (request) => {
      const userId = request.auth!.user.id;
      const b = request.body;
      const set: Partial<typeof profiles.$inferInsert> = {};
      if (b.displayName !== undefined) {
        if (b.displayName === null) set.displayName = null;
        else {
          const r = validateDisplayName(b.displayName);
          if (!r.ok) throw new ApiProblem('validation_failed', { errors: [{ path: 'body.displayName', message: `Display name ${r.reason}.` }] });
          set.displayName = r.value;
        }
      }
      if (b.board !== undefined) set.board = b.board;
      if (b.classLevel !== undefined) set.classLevel = b.classLevel;
      if (b.locale !== undefined) set.locale = b.locale;
      await db
        .insert(profiles)
        .values({ userId, ...set })
        .onConflictDoUpdate({ target: profiles.userId, set: { ...set, updatedAt: new Date(clock.now()) } });
      return me(userId);
    },
  });

  app.delete('/v1/me', {
    config: { policy: policies.member({ fresh: true }) },
    schema: {
      tags: ['me'],
      summary: 'Delete your account: personal data is removed now, the rest is purged within 30 days. Needs a fresh sign-in.',
      response: withProblems({ 200: DeleteMeResponse }),
    },
    handler: async (request, reply) => {
      const user = request.auth!.user;
      const result = await deleteAccount(db, clock, services.otp, user, { purgeAfterDays: ACCOUNT.purgeAfterDays, requestId: String(request.id) });
      // PII.md: provisional live-mock ranks are KV entries keyed by user id. Best effort: the rows go with the purge anyway.
      await removeFromLiveBoards(db, deps.kv, user.id).catch((err) => request.log.warn({ err }, 'live leaderboard cleanup failed'));
      // S6-M02: the uploaded photos/papers and their cleaned copies leave Blob storage now; anything that
      // fails here stays marked `deleted` and the worker's uploads.purge-deleted retries it.
      await services.ai.uploads
        .purgeDeleted(new Date(clock.now()), { userId: user.id })
        .then((r) => {
          if (r.failed) request.log.warn({ userId: user.id, failed: r.failed }, 'upload blob deletion deferred to the worker');
        })
        .catch((err) => request.log.warn({ err, userId: user.id }, 'upload blob deletion deferred to the worker'));
      services.sessions.clear(reply);
      reply.header('clear-site-data', '"cookies"');
      authEvent(request.log, 'account_deleted', { outcome: 'success', userId: user.id, ip: request.clientIp, userAgent: request.headers['user-agent'] });
      authEvent(request.log, 'sessions_revoked_all', { outcome: 'success', userId: user.id, reason: 'account_deleted' });
      request.auth = null;
      return { deleted: true as const, purgeAfter: result.purgeAfter.toISOString() };
    },
  });

  app.post('/v1/me/merge-guest', {
    bodyLimit: BODY_LIMITS.mergeGuestBytes,
    config: { policy: policies.member({ consent: 'merge_guest' }) },
    schema: {
      tags: ['me'],
      summary: 'Merge guest progress (localStorage soyl_guest_v1) into the account. Once per account; replays return alreadyMerged.',
      body: GuestProgress,
      response: withProblems({ 200: MergeGuestResponse }),
    },
    handler: async (request) => mergeGuestProgress(db, clock, request.auth!.user.id, config.academicYear, request.body),
  });

  app.post('/v1/me/consent/start', {
    config: { policy: policies.member() },
    schema: { tags: ['me'], summary: 'Start (or resume) the parental-consent flow', response: withProblems({ 200: ConsentStartResponse }) },
    handler: async (request) => {
      const flow = await services.consent.startFlow(request.auth!.user.id);
      return { status: flow.status, redirectUrl: flow.redirectUrl ?? null };
    },
  });

  app.post('/v1/me/public-name', {
    config: { policy: policies.member({ rateLimit: { buckets: ['public-name.user'] } }) },
    schema: {
      tags: ['me'],
      summary: 'Pick a new random public name (the auto-generated name shown on leaderboards; real names never are)',
      response: withProblems({ 200: z.object({ publicName: z.string() }).meta({ id: 'PublicNameResponse' }) }),
    },
    handler: async (request) => {
      const userId = request.auth!.user.id;
      const seed = randomInt(1, PUBLIC_NAME_MAX_SEED);
      await db
        .insert(profiles)
        .values({ userId, publicNameSeed: seed })
        .onConflictDoUpdate({ target: profiles.userId, set: { publicNameSeed: seed, updatedAt: new Date(clock.now()) } });
      return { publicName: publicName(userId, seed) };
    },
  });

  app.get('/v1/me/sessions', {
    config: { policy: policies.member() },
    schema: { tags: ['me'], summary: 'Your active sessions', response: withProblems({ 200: SessionsResponse }) },
    handler: async (request) => {
      const auth = request.auth!;
      const rows = await services.sessions.list(auth.user.id);
      return {
        sessions: rows.map((s) => ({
          id: s.id,
          current: s.id === auth.session.id,
          createdAt: s.createdAt.toISOString(),
          lastActiveAt: s.updatedAt.toISOString(),
          expiresAt: s.expiresAt.toISOString(),
          userAgent: s.userAgent ? s.userAgent.slice(0, 200) : null,
        })),
      };
    },
  });

  app.delete('/v1/me/sessions/:id', {
    config: { policy: policies.member() },
    schema: { tags: ['me'], summary: 'Revoke one of your sessions', params: z.strictObject({ id: z.uuid() }), response: withProblems({ 204: z.null() }) },
    handler: async (request, reply) => {
      const auth = request.auth!;
      await services.sessions.revokeById(auth.user.id, request.params.id);
      authEvent(request.log, 'session_revoked', { outcome: 'success', userId: auth.user.id, ip: request.clientIp, sessionId: request.params.id });
      if (request.params.id === auth.session.id) services.sessions.clear(reply);
      return reply.status(204).send(null);
    },
  });

  app.delete('/v1/me/sessions', {
    config: { policy: policies.member() },
    schema: { tags: ['me'], summary: 'Sign out everywhere else', response: withProblems({ 200: z.object({ revoked: z.number().int() }) }) },
    handler: async (request) => {
      const auth = request.auth!;
      const revoked = await services.sessions.revokeOthers(auth.user.id, auth.session.id);
      authEvent(request.log, 'sessions_revoked_all', { outcome: 'success', userId: auth.user.id, ip: request.clientIp, revoked, reason: 'others' });
      return { revoked };
    },
  });
}

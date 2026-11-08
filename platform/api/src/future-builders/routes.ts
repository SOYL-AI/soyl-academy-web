/**
 * Future Builders routes (ADR-027).
 *
 * Ingest, server-to-server from the marketing site (never through the browser proxy, which forwards only
 * allow-listed headers, so it can never carry x-soyl-ingest-key):
 *
 *   POST /v1/ingest/future-builders/enrollments   a verified Razorpay payment → registration + parent email
 *   POST /v1/ingest/future-builders/leads         an enquiry (callback / notify / waitlist)
 *
 *   Auth: the edge secret (x-soyl-edge-auth, every /v1 route, 403 without it) AND x-soyl-ingest-key equal to
 *   FB_INGEST_KEY (or FB_INGEST_KEY_PREVIOUS while rotating), compared in constant time; 401 when missing or
 *   wrong. No session and no browser Origin (AUTH-12 exempt like the HMAC-verified Razorpay webhook: the key is
 *   a server secret no browser holds). Per-IP limit `fb.ingest.ip` on top of the defaults.
 *
 * Admin (superadmin: role admin + `superadmin` capability + staff MFA when configured; every call audited):
 *
 *   GET  /v1/admin/future-builders/enrollments?from&to&emailStatus&limit&cursor
 *   GET  /v1/admin/future-builders/enrollments/export?from&to&emailStatus      text/csv
 *   POST /v1/admin/future-builders/enrollments/:id/resend
 *   GET  /v1/admin/future-builders/leads?from&to&kind&limit&cursor
 *   GET  /v1/admin/future-builders/leads/export?from&to&kind                    text/csv
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import type { Config } from '../config';
import { ApiProblem } from '../errors';
import { matchEdgeSecret } from '../http/edge';
import { securityEvent } from '../logging';
import { EVERYONE, policies, type RoutePolicy } from '../policy';
import { withProblems } from '../schemas';
import type { FbActor, FutureBuildersService } from './service';
import {
  FbEnrollmentIngest,
  FbEnrollmentIngestResult,
  FbEnrollmentsExportQuery,
  FbEnrollmentsPage,
  FbEnrollmentsQuery,
  FbLeadIngest,
  FbLeadIngestResult,
  FbLeadsExportQuery,
  FbLeadsPage,
  FbLeadsQuery,
  FbResendResult,
} from './schemas';

export const INGEST_HEADER = 'x-soyl-ingest-key';
const INGEST_BODY_LIMIT = 16 * 1024;

const ingestPolicy = (): RoutePolicy => ({ roles: EVERYONE, csrf: false, rateLimit: { buckets: ['fb.ingest.ip'] }, consent: false });
const adminPolicy = (): RoutePolicy => policies.superadmin('admin.fb.user');

const IdParams = z.strictObject({ id: z.uuid() });
const EmptyBody = z.strictObject({}).nullish();
const Csv = z.string().meta({ description: 'text/csv; charset=utf-8' });

export function registerFutureBuildersRoutes(appIn: FastifyInstance, fb: FutureBuildersService, config: Config): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const keys = config.futureBuilders.ingestKeys;

  /** Route-level onRequest: after edge auth and the route policy, before the body is parsed. */
  const requireIngestKey = async (request: FastifyRequest) => {
    const presented = request.headers[INGEST_HEADER];
    if (!keys.length || matchEdgeSecret(presented, keys) === null) {
      securityEvent(request.log, 'ingest_auth_failed', { present: typeof presented === 'string', route: request.routeOptions.url, ip: request.clientIp });
      throw new ApiProblem('ingest_auth_failed');
    }
  };

  const actor = (request: FastifyRequest): FbActor => ({ userId: request.auth!.user.id, role: request.auth!.user.role, requestId: String(request.id) });

  app.post('/v1/ingest/future-builders/enrollments', {
    bodyLimit: INGEST_BODY_LIMIT,
    onRequest: requireIngestKey,
    config: { policy: ingestPolicy() },
    schema: {
      tags: ['ingest'],
      summary: 'Record a verified Future Builders payment (marketing server only: x-soyl-edge-auth + x-soyl-ingest-key). Idempotent on razorpayPaymentId.',
      body: FbEnrollmentIngest,
      response: withProblems({ 200: FbEnrollmentIngestResult }),
    },
    handler: async (request) => fb.ingestEnrollment(request.body),
  });

  app.post('/v1/ingest/future-builders/leads', {
    bodyLimit: INGEST_BODY_LIMIT,
    onRequest: requireIngestKey,
    config: { policy: ingestPolicy() },
    schema: {
      tags: ['ingest'],
      summary: 'Record a Future Builders enquiry (marketing server only). The same phone, kind and form within a day returns the first lead.',
      body: FbLeadIngest,
      response: withProblems({ 201: FbLeadIngestResult }),
    },
    handler: async (request, reply) => {
      const { leadId } = await fb.createLead(request.body);
      return reply.status(201).send({ leadId });
    },
  });

  // ---- admin --------------------------------------------------------------------------------------
  app.get('/v1/admin/future-builders/enrollments', {
    config: { policy: adminPolicy() },
    schema: {
      tags: ['admin'],
      summary: 'Future Builders registrations, newest payment first, with totals over the filters (superadmin; audited). from/to are IST days.',
      querystring: FbEnrollmentsQuery,
      response: withProblems({ 200: FbEnrollmentsPage }),
    },
    handler: async (request) => fb.listEnrollments(request.query, actor(request)),
  });

  app.get('/v1/admin/future-builders/enrollments/export', {
    config: { policy: adminPolicy() },
    schema: { tags: ['admin'], summary: 'Future Builders registrations as CSV (superadmin; audited)', querystring: FbEnrollmentsExportQuery, response: withProblems({ 200: Csv }) },
    handler: async (request, reply) => {
      const csv = await fb.enrollmentsCsv(request.query, actor(request));
      return reply.header('content-type', 'text/csv; charset=utf-8').header('content-disposition', 'attachment; filename="future-builders-registrations.csv"').send(csv);
    },
  });

  app.post('/v1/admin/future-builders/enrollments/:id/resend', {
    config: { policy: adminPolicy() },
    schema: { tags: ['admin'], summary: "Email the parent's confirmation again (superadmin; audited)", params: IdParams, body: EmptyBody, response: withProblems({ 200: FbResendResult }) },
    handler: async (request) => {
      const r = await fb.resend(request.params.id, actor(request));
      if (!r) throw new ApiProblem('not_found');
      return r;
    },
  });

  app.get('/v1/admin/future-builders/leads', {
    config: { policy: adminPolicy() },
    schema: {
      tags: ['admin'],
      summary: 'Future Builders enquiries, newest first, with the count over the filters (superadmin; audited). from/to are IST days.',
      querystring: FbLeadsQuery,
      response: withProblems({ 200: FbLeadsPage }),
    },
    handler: async (request) => fb.listLeads(request.query, actor(request)),
  });

  app.get('/v1/admin/future-builders/leads/export', {
    config: { policy: adminPolicy() },
    schema: { tags: ['admin'], summary: 'Future Builders enquiries as CSV (superadmin; audited)', querystring: FbLeadsExportQuery, response: withProblems({ 200: Csv }) },
    handler: async (request, reply) => {
      const csv = await fb.leadsCsv(request.query, actor(request));
      return reply.header('content-type', 'text/csv; charset=utf-8').header('content-disposition', 'attachment; filename="future-builders-enquiries.csv"').send(csv);
    },
  });

  appIn.addHook('onClose', async () => fb.drain());
}

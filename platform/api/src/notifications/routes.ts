/**
 * Email reminder routes (D-055).
 *
 *   GET    /v1/me/email-preferences          your reminder settings (masked addresses)
 *   PATCH  /v1/me/email-preferences          { reminders?, parentReminders? }
 *   PUT    /v1/me/parent-email               { email } → pending; one confirmation email (rate-limited)
 *   POST   /v1/me/parent-email/resend        a new confirmation email to the pending address (rate-limited)
 *   DELETE /v1/me/parent-email               remove the parent address (erased at once)
 *   POST   /v1/email/parent-confirm          { token } the parent pressed Confirm (no session)
 *   POST   /v1/email/unsubscribe             { token } the unsubscribe page's button (no session)
 *   POST   /v1/email/unsubscribe/one-click   ?token= RFC 8058 List-Unsubscribe-Post from the mailbox provider
 *
 * The signed-link routes need no session and can only switch email off — except parent-confirm, which turns on
 * reminders to an address the student chose, and only after the parent's own button press (a GET of the page does
 * nothing). The one-click route is the one more AUTH-12 exemption (csrf=false): mailbox providers POST from their own
 * servers without an Origin and with a form body, so it runs in its own context that accepts
 * application/x-www-form-urlencoded (ignored) and verifies the HMAC token from the query, like the Razorpay webhook.
 */
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { PARENT_EMAIL_STATUSES } from '@soyl/db';
import { EVERYONE, type RoutePolicy } from '../policy';
import { withProblems } from '../schemas';
import type { Services } from '../services';
import type { EmailRequestContext } from './preferences';

const EmailPreferences = z
  .object({
    studentEmail: z.string().nullable().meta({ description: 'Your address, masked (a***@gmail.com); null for a phone-only account.' }),
    reminders: z.boolean().meta({ description: 'Reminder emails to your own address are on.' }),
    remindersAvailable: z.boolean().meta({ description: 'False when the account has no email address (phone sign-up): no reminders possible.' }),
    parent: z.object({
      email: z.string().nullable().meta({ description: 'The parent address, masked; null when none.' }),
      status: z.enum(PARENT_EMAIL_STATUSES).meta({ description: 'none | pending (waiting for the parent to confirm) | active (confirmed).' }),
      reminders: z.boolean().meta({ description: 'Your switch for reminders to the confirmed parent address.' }),
      unsubscribedAt: z.iso.datetime().nullable().meta({ description: 'When a parent last unsubscribed (their address was erased then).' }),
    }),
  })
  .meta({ id: 'EmailPreferences' });

const EmailPreferencesPatch = z.strictObject({ reminders: z.boolean().optional(), parentReminders: z.boolean().optional() }).meta({ id: 'EmailPreferencesPatch' });
const ParentEmailBody = z.strictObject({ email: z.string().min(3).max(254) }).meta({ id: 'ParentEmailBody' });
const ParentEmailResponse = EmailPreferences.extend({ resendAfterSeconds: z.number().int().min(0) }).meta({ id: 'ParentEmailResponse' });
const TokenBody = z.strictObject({ token: z.string().min(10).max(200) }).meta({ id: 'EmailTokenBody' });
const ParentConfirmResponse = z.object({ status: z.literal('active'), alreadyConfirmed: z.boolean() }).meta({ id: 'ParentConfirmResponse' });
const UnsubscribeResponse = z.object({ kind: z.enum(['student', 'parent']), alreadyOff: z.boolean() }).meta({ id: 'EmailUnsubscribeResponse' });
const OneClickQuery = z.strictObject({ token: z.string().min(10).max(200) });

/** The form body a mailbox provider sends (RFC 8058: `List-Unsubscribe=One-Click`); read and ignored. */
const ONE_CLICK_BODY_LIMIT = 2048;

export function registerEmailReminderRoutes(appIn: FastifyInstance, services: Services): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const prefs = services.emailPreferences;
  const ctx = (request: FastifyRequest): EmailRequestContext => ({ ip: request.clientIp, log: request.log, requestId: String(request.id) });
  // Students only: reminders are about a student's own learning.
  const read: RoutePolicy = { roles: ['student'], csrf: true, rateLimit: { buckets: [] }, consent: false };
  const write: RoutePolicy = { roles: ['student'], csrf: true, rateLimit: { buckets: ['email.prefs.user'] }, consent: false };
  const link: RoutePolicy = { roles: EVERYONE, csrf: true, rateLimit: { buckets: ['email.link.ip'] }, consent: false };

  app.get('/v1/me/email-preferences', {
    config: { policy: read },
    schema: { tags: ['me'], summary: 'Your reminder email settings: your address (masked), whether reminders are on, and the optional parent address (D-055)', response: withProblems({ 200: EmailPreferences }) },
    handler: async (request) => prefs.view(request.auth!.user),
  });

  app.patch('/v1/me/email-preferences', {
    config: { policy: write },
    schema: {
      tags: ['me'],
      summary: 'Turn reminder emails to you, or to your confirmed parent address, on or off. Turning yours on needs an email address (409 reminders_unavailable).',
      body: EmailPreferencesPatch,
      response: withProblems({ 200: EmailPreferences }),
    },
    handler: async (request) => prefs.update(request.auth!.user, request.body),
  });

  app.put('/v1/me/parent-email', {
    config: { policy: write },
    schema: {
      tags: ['me'],
      summary: 'Add or change the optional parent email for reminders. Only a confirmation email is sent to it; reminders start after the parent confirms. Rate-limited per account, address and IP.',
      body: ParentEmailBody,
      response: withProblems({ 200: ParentEmailResponse }),
    },
    handler: async (request) => prefs.setParentEmail(request.auth!.user, request.body.email, ctx(request)),
  });

  app.post('/v1/me/parent-email/resend', {
    config: { policy: write },
    schema: {
      tags: ['me'],
      summary: 'Send the confirmation email again to the pending parent address (the earlier link stops working). Same rate limits as adding it; no-op unless pending.',
      response: withProblems({ 200: ParentEmailResponse }),
    },
    handler: async (request) => prefs.resendParentConfirm(request.auth!.user, ctx(request)),
  });

  app.delete('/v1/me/parent-email', {
    config: { policy: write },
    schema: { tags: ['me'], summary: 'Remove the parent email (erased at once; links already sent to it stop working). Idempotent.', response: withProblems({ 200: EmailPreferences }) },
    handler: async (request) => prefs.removeParentEmail(request.auth!.user),
  });

  app.post('/v1/email/parent-confirm', {
    config: { policy: link },
    schema: {
      tags: ['email'],
      summary: "The parent's Confirm button (token from the confirmation email; no sign-in). Only the latest link for the current address works, for 72 hours. Idempotent.",
      body: TokenBody,
      response: withProblems({ 200: ParentConfirmResponse }),
    },
    handler: async (request) => prefs.confirmParent(request.body.token, ctx(request)),
  });

  app.post('/v1/email/unsubscribe', {
    config: { policy: link },
    schema: {
      tags: ['email'],
      summary: 'Unsubscribe from reminder emails (token from the email; no sign-in). A student token turns the student’s reminders off; a parent token erases the parent address. Idempotent.',
      body: TokenBody,
      response: withProblems({ 200: UnsubscribeResponse }),
    },
    handler: async (request) => prefs.unsubscribe(request.body.token, ctx(request)),
  });

  // RFC 8058 one-click: its own context, so the form parser exists only here (everything else stays JSON-only, API-5).
  void appIn.register(async (child) => {
    child.addContentTypeParser(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'], { parseAs: 'string', bodyLimit: ONE_CLICK_BODY_LIMIT }, (_req, _body, done) => done(null, {}));
    child.withTypeProvider<ZodTypeProvider>().post('/v1/email/unsubscribe/one-click', {
      bodyLimit: ONE_CLICK_BODY_LIMIT,
      // AUTH-12 exempt: the mailbox provider sends no Origin; the HMAC token is the authorisation, and it can only switch email off.
      config: { policy: { roles: EVERYONE, csrf: false, rateLimit: { buckets: ['email.link.ip'] }, consent: false } satisfies RoutePolicy },
      schema: {
        tags: ['email'],
        summary: 'RFC 8058 one-click unsubscribe (List-Unsubscribe-Post). Token in the query; any form body is ignored. Same effect as POST /v1/email/unsubscribe.',
        querystring: OneClickQuery,
        response: withProblems({ 200: UnsubscribeResponse }),
      },
      handler: async (request) => prefs.unsubscribe(request.query.token, ctx(request)),
    });
  });
}

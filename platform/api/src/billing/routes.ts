/**
 * Billing routes (ARCHITECTURE §4.1 billing row, §11.2; ADR-016).
 *
 *   GET  /v1/plans                    public: plans, INR labels (GST-inclusive only when GST-registered), purchasable flags
 *   POST /v1/billing/subscriptions    student: Plus/Pro monthly/yearly → Razorpay subscription + Checkout params
 *   POST /v1/billing/orders           student: Board Exam Pass → Razorpay order + Checkout params
 *   POST /v1/billing/cancel           student: cancel the subscription (paid period honoured)
 *   POST /v1/billing/refresh          student: server-side re-sync after Checkout (no payment data accepted)
 *   GET  /v1/me/subscription          member: plan in force, source, subscription status
 *   POST /v1/webhooks/razorpay        Razorpay only: raw body, HMAC verified (AUTH-12 exempt)
 *   + the invoice routes (invoices/routes.ts, ADR-024)
 *
 * Purchases: 403 billing_disabled while BILLING_ENABLED=false; 403 consent_required until consent is
 * granted. Purchase responses never grant anything (no entitlement until Razorpay confirms payment).
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { PlanId } from '@soyl/shared/config/plans';
import { GST_STATE_CODES } from '@soyl/shared/billing/gst';
import { registerInvoiceRoutes } from './invoices/routes';
import { ApiProblem } from '../errors';
import { EVERYONE, policies, type RoutePolicy } from '../policy';
import { withProblems } from '../schemas';
import { EVENT_ID_HEADER, SIGNATURE_HEADER } from './razorpay/signature';
import type { BillingService } from './service';

/** Razorpay webhook bodies are small; anything bigger is not Razorpay. */
export const WEBHOOK_BODY_LIMIT = 256 * 1024;

const Interval = z.enum(['monthly', 'yearly', 'one_time']);
const PlanPriceView = z.object({ interval: Interval, amountPaise: z.number().int(), label: z.string() });
const PlansResponse = z
  .object({
    billingEnabled: z.boolean(),
    currency: z.literal('INR'),
    /** True only when the seller is GST-registered (platform/shared/config/invoicing.ts); then labels read "incl. GST". */
    pricesIncludeGst: z.boolean(),
    /** GST state code used when the buyer picks no state at checkout (the seller's state). */
    defaultPlaceOfSupply: z.string(),
    plans: z.array(
      z.object({
        id: PlanId,
        name: z.string(),
        creditsPerDay: z.number().int(),
        features: z.array(z.string()),
        validUntil: z.iso.datetime().nullable(),
        order: z.number().int(),
        prices: z.array(PlanPriceView),
        purchasable: z.boolean(),
      }),
    ),
  })
  .meta({ id: 'PlansResponse', description: 'Plans and INR prices from platform/shared/config/plans.ts (GST-inclusive when pricesIncludeGst).' });

/** Optional checkout details for the invoice (ADR-024): the buyer's state (GST place of supply) and a name. */
const CheckoutBuyer = {
  placeOfSupply: z.enum(GST_STATE_CODES).optional().meta({ description: 'GST state code of the buyer (place of supply). Default: the seller state.' }),
  buyerName: z
    .string()
    .trim()
    .regex(/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'’-]{0,79}$/, "English letters, spaces and . ' - only (as it should appear on the invoice)")
    .optional()
    .meta({ description: 'Name printed on the invoice (optional).' }),
};

const SubscriptionRequest = z
  .strictObject({ plan: z.enum(['plus', 'pro']), interval: z.enum(['monthly', 'yearly']), ...CheckoutBuyer })
  .meta({ id: 'BillingSubscriptionRequest' });
const OrderRequest = z.strictObject({ plan: z.literal('board_exam_pass'), ...CheckoutBuyer }).meta({ id: 'BillingOrderRequest' });
/** No body, or `{}`. Anything else (e.g. Checkout's razorpay_payment_id/signature) is refused: 400 (API-8, F-020). */
const EmptyRequest = z.strictObject({}).nullish().meta({ id: 'EmptyRequest' });

const SubscriptionCheckout = z
  .object({
    kind: z.literal('subscription'),
    keyId: z.string(),
    subscriptionId: z.string(),
    plan: PlanId,
    interval: z.enum(['monthly', 'yearly']),
    amountPaise: z.number().int(),
    currency: z.literal('INR'),
    label: z.string(),
    name: z.string(),
    description: z.string(),
    reused: z.boolean(),
  })
  .meta({
    id: 'SubscriptionCheckout',
    description: 'Razorpay Checkout options: { key: keyId, subscription_id: subscriptionId, name, description }. Completing Checkout does not grant the plan; poll GET /v1/me/subscription (after POST /v1/billing/refresh).',
  });

const OrderCheckout = z
  .object({
    kind: z.literal('order'),
    keyId: z.string(),
    orderId: z.string(),
    plan: PlanId,
    amountPaise: z.number().int(),
    currency: z.literal('INR'),
    label: z.string(),
    name: z.string(),
    description: z.string(),
    validUntil: z.iso.datetime(),
    reused: z.boolean(),
  })
  .meta({ id: 'OrderCheckout', description: 'Razorpay Checkout options: { key: keyId, order_id: orderId, amount: amountPaise, currency, name, description }.' });

const SubscriptionView = z
  .object({
    plan: PlanId,
    planName: z.string(),
    creditsPerDay: z.number().int(),
    source: z.enum(['free', 'subscription', 'order', 'admin', 'promo']),
    validUntil: z.iso.datetime().nullable(),
    subscription: z
      .object({
        id: z.uuid(),
        plan: PlanId,
        interval: z.enum(['monthly', 'yearly']),
        status: z.string(),
        currentPeriodEnd: z.iso.datetime().nullable(),
        cancelAtPeriodEnd: z.boolean(),
      })
      .nullable(),
    billingEnabled: z.boolean(),
  })
  .meta({ id: 'MySubscription' });

const WebhookAck = z.object({ received: z.literal(true), duplicate: z.boolean(), outcome: z.string() }).meta({ id: 'RazorpayWebhookAck' });

const studentPurchase = (): RoutePolicy => ({ roles: ['student'], csrf: true, rateLimit: { buckets: [] }, consent: false });

export function registerBillingRoutes(appIn: FastifyInstance, billing: BillingService): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();

  app.get('/v1/plans', {
    config: { policy: policies.publicRead() },
    schema: { tags: ['billing'], summary: 'Plans and prices (INR)', response: withProblems({ 200: PlansResponse }) },
    handler: async (_request, reply) => {
      reply.header('cache-control', 'public, max-age=60');
      return billing.publicPlans();
    },
  });

  app.post('/v1/billing/subscriptions', {
    config: { policy: studentPurchase() },
    schema: { tags: ['billing'], summary: 'Start a Plus/Pro subscription (returns Razorpay Checkout parameters)', body: SubscriptionRequest, response: withProblems({ 201: SubscriptionCheckout }) },
    handler: async (request, reply) => {
      const out = await billing.createSubscription(request.auth!.user.id, request.body, request.log);
      return reply.status(201).send(out);
    },
  });

  app.post('/v1/billing/orders', {
    config: { policy: studentPurchase() },
    schema: { tags: ['billing'], summary: 'Buy the Board Exam Pass (returns Razorpay Checkout parameters)', body: OrderRequest, response: withProblems({ 201: OrderCheckout }) },
    handler: async (request, reply) => {
      const out = await billing.createOrder(request.auth!.user.id, request.body, request.log);
      return reply.status(201).send(out);
    },
  });

  app.post('/v1/billing/cancel', {
    config: { policy: studentPurchase() },
    schema: { tags: ['billing'], summary: 'Cancel the subscription (a paid period runs to its end)', body: EmptyRequest, response: withProblems({ 200: SubscriptionView }) },
    handler: async (request) => billing.cancel(request.auth!.user.id, request.log),
  });

  app.post('/v1/billing/refresh', {
    config: { policy: studentPurchase() },
    schema: {
      tags: ['billing'],
      summary: 'Re-check open purchases with Razorpay (call after Checkout; takes no payment data)',
      body: EmptyRequest,
      response: withProblems({ 200: SubscriptionView }),
    },
    handler: async (request) => billing.refresh(request.auth!.user.id, request.log),
  });

  app.get('/v1/me/subscription', {
    config: { policy: policies.member() },
    schema: { tags: ['billing'], summary: 'The plan in force and the subscription status', response: withProblems({ 200: SubscriptionView }) },
    handler: async (request) => billing.view(request.auth!.user.id),
  });

  registerInvoiceRoutes(appIn, billing.invoices);
  // Deliveries started after a webhook finish (or fail into the worker sweep) before the app closes.
  appIn.addHook('onClose', async () => billing.invoices.drain());

  // Raw-body route in its own encapsulated context: the HMAC is computed over the exact bytes (AC-09),
  // so this context replaces the JSON parser with a Buffer one. Everything else keeps the JSON parser.
  void appIn.register(async (child) => {
    child.removeAllContentTypeParsers();
    child.addContentTypeParser('application/json', { parseAs: 'buffer', bodyLimit: WEBHOOK_BODY_LIMIT }, (_req, body, done) => done(null, body));
    child.withTypeProvider<ZodTypeProvider>().post('/v1/webhooks/razorpay', {
      bodyLimit: WEBHOOK_BODY_LIMIT,
      // AUTH-12 exempt (HMAC-verified); guests (Razorpay has no session); IP limits still apply.
      config: { policy: { roles: EVERYONE, csrf: false, rateLimit: { buckets: [] }, consent: false } satisfies RoutePolicy },
      schema: {
        tags: ['billing'],
        summary: 'Razorpay webhook (X-Razorpay-Signature over the raw body; X-Razorpay-Event-Id)',
        response: withProblems({ 200: WebhookAck }),
      },
      handler: async (request, reply) => {
        const raw = Buffer.isBuffer(request.body) ? request.body : Buffer.alloc(0);
        const res = await billing.webhooks.handle(raw, request.headers[SIGNATURE_HEADER], request.headers[EVENT_ID_HEADER], request.log);
        if (res.status === 200) return reply.status(200).send(res.body);
        if (res.status === 404) throw new ApiProblem('not_found');
        if (res.status === 503) throw new ApiProblem('billing_unavailable', { headers: { 'retry-after': '60' } });
        throw new ApiProblem('bad_request', { detail: `Webhook rejected: ${res.reason}.` });
      },
    });
  });
}

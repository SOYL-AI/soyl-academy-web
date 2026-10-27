/**
 * Billing service (CONTEXT §5–7, ARCHITECTURE §11.2, ADR-016): plans, purchases, cancellation, the
 * student's subscription view, and the server-side refresh after Checkout.
 *
 * Who decides entitlement: never the client (AC-10, F-020). Purchase endpoints only create a Razorpay
 * subscription/order bound to the student (notes.soyl_user_id) and return Checkout parameters. The
 * Checkout `handler` callback in the browser is ignored: entitlement is written only by sync.ts from
 * state re-fetched from Razorpay (webhook, `POST /v1/billing/refresh`, reconciliation).
 *
 * Consent (D-014, ADR-016): buying is for a parent. Until the account's consent status is `granted`,
 * purchases are refused (403 consent_required); with CONSENT_PROVIDER=unavailable (production today)
 * nobody can buy. Cancelling, the subscription view and webhooks never depend on consent or on
 * BILLING_ENABLED, so an existing subscription can always be managed and renewals keep applying.
 */
import { and, desc, eq, gt, inArray, sql } from 'drizzle-orm';
import type { FastifyBaseLogger } from 'fastify';
import { orders, subscriptions, type Database } from '@soyl/db';
import { uuidv7 } from '@soyl/db/ids';
import { BILLING, getPlan, PLANS, planPrice, priceLabel, type PlanId } from '@soyl/shared/config/plans';
import type { Clock } from '../clock';
import type { ConsentService } from '../consent/service';
import { ApiProblem } from '../errors';
import type { KeyValueStore } from '../kv';
import { securityEvent } from '../logging';
import type { BillingConfig } from './config';
import { BillingEntitlementService, type CreditTopUpHook, type EntitlementSource } from './entitlements';
import { requirePlanRows } from './plans';
import { RazorpayApiError, type RazorpayClient } from './razorpay/types';
import { atomicSync, syncOrder, syncPayment, syncSubscription, type SyncResult } from './sync';
import { WebhookProcessor } from './webhooks';

const MIN = 60_000;
/** Subscription statuses that hold (or are about to hold) a plan: a second purchase is refused. */
export const LIVE_SUBSCRIPTION_STATUSES = ['authenticated', 'active', 'pending'] as const;
/** Statuses `POST /v1/billing/cancel` acts on. */
const CANCELLABLE = ['created', 'authenticated', 'active', 'pending'] as const;

export type SubscriptionPlanId = Extract<PlanId, 'plus' | 'pro'>;
export type RecurringInterval = 'monthly' | 'yearly';

export interface BillingLog {
  info(obj: Record<string, unknown>, msg: string): void;
  warn(obj: Record<string, unknown>, msg: string): void;
  error(obj: Record<string, unknown>, msg: string): void;
}

export interface BillingServiceDeps {
  db: Database;
  clock: Clock;
  kv: KeyValueStore;
  config: BillingConfig;
  razorpay: RazorpayClient | null;
  consent: ConsentService;
  log?: BillingLog;
}

export interface PublicPlan {
  id: PlanId;
  name: string;
  creditsPerDay: number;
  features: string[];
  validUntil: string | null;
  order: number;
  prices: { interval: 'monthly' | 'yearly' | 'one_time'; amountPaise: number; label: string }[];
  purchasable: boolean;
}

export interface SubscriptionCheckout {
  kind: 'subscription';
  keyId: string;
  subscriptionId: string;
  plan: PlanId;
  interval: RecurringInterval;
  amountPaise: number;
  currency: typeof BILLING.currency;
  label: string;
  name: string;
  description: string;
  reused: boolean;
}

export interface OrderCheckout {
  kind: 'order';
  keyId: string;
  orderId: string;
  plan: PlanId;
  amountPaise: number;
  currency: typeof BILLING.currency;
  label: string;
  name: string;
  description: string;
  validUntil: string;
  reused: boolean;
}

export interface SubscriptionView {
  plan: PlanId;
  planName: string;
  creditsPerDay: number;
  source: EntitlementSource;
  validUntil: string | null;
  subscription: {
    id: string;
    plan: PlanId;
    interval: RecurringInterval;
    status: string;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
  } | null;
  billingEnabled: boolean;
}

export class BillingService {
  readonly entitlements: BillingEntitlementService;
  readonly webhooks: WebhookProcessor;
  private creditHook: CreditTopUpHook | null = null;

  constructor(private readonly d: BillingServiceDeps) {
    this.entitlements = new BillingEntitlementService(d.db);
    this.webhooks = new WebhookProcessor({
      db: d.db,
      razorpay: d.razorpay,
      secrets: d.config.webhookSecrets,
      clock: d.clock,
      plans: () => requirePlanRows(d.db),
      onGranted: (g) => this.onGranted(g),
    });
  }

  get razorpay(): RazorpayClient | null {
    return this.d.razorpay;
  }

  get config(): BillingConfig {
    return this.d.config;
  }

  /** Logger for background billing events (plan granted, credit top-up failures). */
  useLog(log: BillingLog): void {
    this.d.log = log;
  }

  /** AI gateway hook: CreditService.applyPlanChange (see entitlements.ts). */
  setCreditHook(hook: CreditTopUpHook | null): void {
    this.creditHook = hook;
  }

  private now(): Date {
    return new Date(this.d.clock.now());
  }

  private async onGranted(g: { userId: string; plan: PlanId }): Promise<void> {
    this.d.log?.info({ billing: true, event: 'plan_granted', userId: g.userId, plan: g.plan }, 'plan granted');
    if (!this.creditHook) return;
    try {
      await this.creditHook.applyPlanChange(g.userId, g.plan);
    } catch (err) {
      // The credits service also tops up lazily on the next credits read; never fail the payment path.
      this.d.log?.warn({ billing: true, event: 'credit_topup_failed', userId: g.userId, plan: g.plan, err: (err as Error).name }, 'credit top-up failed');
    }
  }

  /* ---- GET /v1/plans --------------------------------------------------------------------------- */

  publicPlans(): { billingEnabled: boolean; currency: typeof BILLING.currency; pricesIncludeGst: true; plans: PublicPlan[] } {
    const now = this.now();
    const open = this.d.config.enabled && this.d.razorpay !== null;
    return {
      billingEnabled: this.d.config.enabled,
      currency: BILLING.currency,
      pricesIncludeGst: true,
      plans: [...PLANS]
        .sort((a, b) => a.order - b.order)
        .map((p) => ({
          id: p.id,
          name: p.name,
          creditsPerDay: p.creditsPerDay,
          features: [...p.features],
          validUntil: p.validUntil ? new Date(p.validUntil).toISOString() : null,
          order: p.order,
          prices: p.prices.map((x) => ({ interval: x.interval, amountPaise: x.amountPaise, label: priceLabel(x) })),
          purchasable: open && p.prices.length > 0 && (!p.validUntil || now < new Date(p.validUntil)),
        })),
    };
  }

  /* ---- purchases ------------------------------------------------------------------------------- */

  private async assertCanPurchase(userId: string, log: FastifyBaseLogger): Promise<RazorpayClient> {
    if (!this.d.config.enabled) throw new ApiProblem('billing_disabled');
    if (!this.d.razorpay) throw new ApiProblem('billing_unavailable');
    let status: string;
    try {
      status = await this.d.consent.getStatus(userId, { strict: true });
    } catch {
      throw new ApiProblem('consent_unavailable');
    }
    if (status !== 'granted') {
      securityEvent(log, 'consent_denied', { userId, feature: 'purchases', status });
      throw new ApiProblem('consent_required', { detail: 'A parent or guardian needs to give consent before a purchase.' });
    }
    return this.d.razorpay;
  }

  private razorpayFailure(err: unknown, log: FastifyBaseLogger, what: string): never {
    if (err instanceof RazorpayApiError) {
      log.error({ billing: true, event: 'razorpay_call_failed', what, status: err.status, code: err.code }, 'razorpay call failed');
      throw new ApiProblem('billing_unavailable');
    }
    throw err;
  }

  async createSubscription(userId: string, input: { plan: SubscriptionPlanId; interval: RecurringInterval }, log: FastifyBaseLogger): Promise<SubscriptionCheckout> {
    const razorpay = await this.assertCanPurchase(userId, log);
    const now = this.now();
    const plan = getPlan(input.plan);
    const price = planPrice(input.plan, input.interval);
    if (!price) throw new ApiProblem('plan_unavailable');
    const rows = await requirePlanRows(this.d.db);
    const row = rows.get(input.plan)!;
    const rzPlanId = (row.razorpayPlanIds as Record<string, string | undefined>)[input.interval];
    if (!rzPlanId) {
      log.error({ billing: true, event: 'plans_not_synced', plan: input.plan, interval: input.interval }, 'run `npm run billing -w @soyl/api -- sync-plans`');
      throw new ApiProblem('billing_unavailable');
    }
    const current = await this.entitlements.current(userId, now);
    if (getPlan(current.plan).creditsPerDay >= plan.creditsPerDay && current.source !== 'free')
      throw new ApiProblem('already_subscribed', { detail: `Your ${getPlan(current.plan).name} plan already includes this.` });

    const label = priceLabel(price);
    const checkout = (subscriptionId: string, reused: boolean): SubscriptionCheckout => ({
      kind: 'subscription',
      keyId: razorpay.keyId,
      subscriptionId,
      plan: input.plan,
      interval: input.interval,
      amountPaise: price.amountPaise,
      currency: BILLING.currency,
      label,
      name: BILLING.checkoutName,
      description: `${plan.name} — ${label}`,
      reused,
    });

    return this.d.db.transaction(async (tx) => {
      // One purchase at a time per student (double clicks, two tabs).
      await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtextextended(${`billing-purchase:${userId}`}, 0))`);
      const mine = await tx.select().from(subscriptions).where(eq(subscriptions.userId, userId)).orderBy(desc(subscriptions.createdAt));
      if (mine.some((s) => (LIVE_SUBSCRIPTION_STATUSES as readonly string[]).includes(s.status)))
        throw new ApiProblem('already_subscribed', { detail: 'Cancel the current subscription before choosing another plan.' });
      const reuse = mine.find(
        (s) => s.status === 'created' && s.planId === row.id && s.interval === input.interval && s.razorpayPlanId === rzPlanId && now.getTime() - s.createdAt.getTime() < BILLING.reusePendingMinutes * MIN,
      );
      if (reuse) return checkout(reuse.razorpaySubscriptionId, true);
      let rz;
      try {
        rz = await razorpay.createSubscription({
          plan_id: rzPlanId,
          total_count: BILLING.subscriptionTotalCount[input.interval],
          quantity: 1,
          customer_notify: 0,
          expire_by: Math.floor(now.getTime() / 1000) + BILLING.subscriptionAuthWindowHours * 3600,
          notes: { app: BILLING.notesApp, soyl_user_id: userId, soyl_plan: input.plan, soyl_interval: input.interval },
        });
      } catch (err) {
        this.razorpayFailure(err, log, 'createSubscription');
      }
      await tx.insert(subscriptions).values({
        userId,
        planId: row.id,
        interval: input.interval,
        razorpaySubscriptionId: rz.id,
        razorpayPlanId: rzPlanId,
        amountPaise: price.amountPaise,
        status: 'created',
        createdAt: now,
        updatedAt: now,
      });
      log.info({ billing: true, event: 'subscription_created', userId, plan: input.plan, interval: input.interval, subscriptionId: rz.id }, 'subscription created');
      return checkout(rz.id, false);
    });
  }

  async createOrder(userId: string, input: { plan: 'board_exam_pass' }, log: FastifyBaseLogger): Promise<OrderCheckout> {
    const razorpay = await this.assertCanPurchase(userId, log);
    const now = this.now();
    const plan = getPlan(input.plan);
    const price = planPrice(input.plan, 'one_time');
    if (!price || !plan.validUntil || now >= new Date(plan.validUntil)) throw new ApiProblem('plan_unavailable', { detail: `${plan.name} is no longer on sale.` });
    const rows = await requirePlanRows(this.d.db);
    const row = rows.get(input.plan)!;
    const current = await this.entitlements.current(userId, now);
    if (current.plan === input.plan) throw new ApiProblem('already_subscribed', { detail: `You already have the ${plan.name}.` });

    const label = priceLabel(price);
    const checkout = (orderId: string, reused: boolean): OrderCheckout => ({
      kind: 'order',
      keyId: razorpay.keyId,
      orderId,
      plan: input.plan,
      amountPaise: price.amountPaise,
      currency: BILLING.currency,
      label,
      name: BILLING.checkoutName,
      description: `${plan.name} — ${label}`,
      validUntil: new Date(plan.validUntil!).toISOString(),
      reused,
    });

    return this.d.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtextextended(${`billing-purchase:${userId}`}, 0))`);
      const [reuse] = await tx
        .select()
        .from(orders)
        .where(and(eq(orders.userId, userId), eq(orders.planId, row.id), eq(orders.status, 'created'), eq(orders.amountPaise, price.amountPaise), gt(orders.createdAt, new Date(now.getTime() - BILLING.reusePendingMinutes * MIN))))
        .orderBy(desc(orders.createdAt))
        .limit(1);
      if (reuse) return checkout(reuse.razorpayOrderId, true);
      const receipt = `bep_${uuidv7(now.getTime()).replace(/-/g, '')}`;
      let rz;
      try {
        rz = await razorpay.createOrder({
          amount: price.amountPaise,
          currency: BILLING.currency,
          receipt,
          notes: { app: BILLING.notesApp, soyl_user_id: userId, soyl_plan: input.plan },
        });
      } catch (err) {
        this.razorpayFailure(err, log, 'createOrder');
      }
      await tx.insert(orders).values({ userId, planId: row.id, razorpayOrderId: rz.id, receipt, amountPaise: price.amountPaise, currency: BILLING.currency, status: 'created', createdAt: now, updatedAt: now });
      log.info({ billing: true, event: 'order_created', userId, plan: input.plan, orderId: rz.id }, 'order created');
      return checkout(rz.id, false);
    });
  }

  /* ---- cancel / view / refresh ------------------------------------------------------------------- */

  async cancel(userId: string, log: FastifyBaseLogger): Promise<SubscriptionView> {
    const razorpay = this.d.razorpay;
    if (!razorpay) throw new ApiProblem('billing_unavailable');
    const [sub] = await this.d.db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, userId), inArray(subscriptions.status, [...CANCELLABLE])))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);
    if (!sub) throw new ApiProblem('not_found', { detail: 'There is no subscription to cancel.' });
    // A paid period is honoured to its end; an unpaid (created/authenticated) one is cancelled now.
    const atCycleEnd = sub.status === 'active' || sub.status === 'pending';
    try {
      await razorpay.cancelSubscription(sub.razorpaySubscriptionId, { atCycleEnd });
    } catch (err) {
      this.razorpayFailure(err, log, 'cancelSubscription');
    }
    if (atCycleEnd) await this.d.db.update(subscriptions).set({ cancelAtPeriodEnd: true, updatedAt: this.now() }).where(eq(subscriptions.id, sub.id));
    try {
      await this.syncEntity('subscription', sub.razorpaySubscriptionId);
    } catch (err) {
      // Cancelled at Razorpay; the webhook / reconciliation applies the rest.
      if (!(err instanceof RazorpayApiError)) throw err;
    }
    log.info({ billing: true, event: 'subscription_cancel_requested', userId, subscriptionId: sub.razorpaySubscriptionId, atCycleEnd }, 'subscription cancelled');
    return this.view(userId);
  }

  async view(userId: string): Promise<SubscriptionView> {
    const now = this.now();
    const cur = await this.entitlements.current(userId, now);
    const rows = await requirePlanRows(this.d.db);
    const mine = await this.d.db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).orderBy(desc(subscriptions.createdAt)).limit(10);
    const sub = mine.find((s) => (LIVE_SUBSCRIPTION_STATUSES as readonly string[]).includes(s.status)) ?? mine.find((s) => s.status !== 'expired' && s.status !== 'created') ?? null;
    const keyOf = (planId: string) => [...rows.entries()].find(([, r]) => r.id === planId)![0];
    const p = getPlan(cur.plan);
    return {
      plan: cur.plan,
      planName: p.name,
      creditsPerDay: p.creditsPerDay,
      source: cur.source,
      validUntil: cur.validUntil?.toISOString() ?? null,
      subscription: sub
        ? {
            id: sub.id,
            plan: keyOf(sub.planId),
            interval: sub.interval as RecurringInterval,
            status: sub.status,
            currentPeriodEnd: sub.currentPeriodEnd?.toISOString() ?? null,
            cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
          }
        : null,
      billingEnabled: this.d.config.enabled,
    };
  }

  /**
   * After Checkout reports success, the web calls this (with no payment data — the browser's
   * razorpay_payment_id/signature are never read, F-020). It re-syncs the student's own open
   * orders/subscriptions from Razorpay, so the plan applies even if the webhook is late.
   */
  async refresh(userId: string, log: FastifyBaseLogger): Promise<SubscriptionView> {
    const now = this.now();
    const hit = await this.d.kv.windowHit(`billing:refresh:${userId}`, MIN, BILLING.refreshPerMinute, now.getTime());
    if (!hit.allowed) {
      const seconds = Math.max(1, Math.ceil(hit.retryAfterMs / 1000));
      throw new ApiProblem('rate_limited', { retryAfterSeconds: seconds, headers: { 'retry-after': String(seconds) } });
    }
    if (this.d.razorpay) {
      const since = new Date(now.getTime() - 24 * 60 * MIN);
      const subs = await this.d.db
        .select({ id: subscriptions.razorpaySubscriptionId })
        .from(subscriptions)
        .where(and(eq(subscriptions.userId, userId), inArray(subscriptions.status, ['created', 'authenticated', 'active', 'pending'])));
      const ords = await this.d.db
        .select({ id: orders.razorpayOrderId })
        .from(orders)
        .where(and(eq(orders.userId, userId), inArray(orders.status, ['created', 'attempted']), gt(orders.createdAt, since)));
      try {
        for (const s of subs) this.logSync(log, await this.syncEntity('subscription', s.id), 'refresh');
        for (const o of ords) this.logSync(log, await this.syncEntity('order', o.id), 'refresh');
      } catch (err) {
        if (!(err instanceof RazorpayApiError)) throw err;
        log.warn({ billing: true, event: 'refresh_refetch_failed', status: err.status }, 'refresh could not reach Razorpay');
      }
    }
    return this.view(userId);
  }

  logSync(log: Pick<BillingLog, 'warn' | 'info'>, r: SyncResult, via: string): void {
    if (r.outcome === 'rejected') log.warn({ security: true, event: 'billing_binding_rejected', via, entityId: r.entityId, reason: r.reason }, 'security: billing_binding_rejected');
    else if (r.changes.length) log.info({ billing: true, event: 'billing_synced', via, entityId: r.entityId, changes: r.changes.length }, 'billing state synced');
  }

  /** Re-sync one Razorpay entity (reconciliation, CLI, refresh). */
  async syncEntity(kind: 'order' | 'subscription' | 'payment', id: string, opts: { dryRun?: boolean } = {}): Promise<SyncResult> {
    const razorpay = this.d.razorpay;
    if (!razorpay) throw new Error('billing provider is not configured');
    const plans = await requirePlanRows(this.d.db);
    const now = this.now();
    const r = await atomicSync(this.d.db, (tx) => {
      const d = { tx, razorpay, now, plans, dryRun: opts.dryRun };
      return kind === 'order' ? syncOrder(d, id) : kind === 'subscription' ? syncSubscription(d, id) : syncPayment(d, id);
    });
    if (r.granted && !opts.dryRun) await this.onGranted(r.granted);
    return r;
  }
}

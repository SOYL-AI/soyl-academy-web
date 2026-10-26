/**
 * Billing test harness: the normal API harness (real PostgreSQL, KV, mock providers, fake clock) with
 * billing switched on, the Razorpay stub, a per-run webhook secret, plans synced to the stub, and
 * helpers that play Razorpay's side (signed webhook delivery).
 */
import { randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { LightMyRequestResponse } from 'fastify';
import { entitlements, orders, payments, subscriptions, webhookEvents } from '@soyl/db';
import { syncPlans } from '../src/billing/plans';
import { RazorpayStub, signWebhook, type SimEvent } from '../src/billing/razorpay';
import { createHarness, type Client, type Harness, type HarnessOptions } from './helpers';

export interface BillingHarness extends Harness {
  stub: RazorpayStub;
  webhookSecret: string;
  /** Delivers a signed webhook like Razorpay does (through the edge proxy). */
  deliver(ev: SimEvent, opts?: { secret?: string; rawBody?: string; eventId?: string; headers?: Record<string, string | undefined> }): Promise<LightMyRequestResponse>;
  deliverAll(events: SimEvent[]): Promise<LightMyRequestResponse[]>;
  /** A signed-in student (consent granted unless `consent` says otherwise). */
  student(opts?: { consent?: 'granted' | 'pending' | 'required' }): Promise<{ c: Client; userId: string }>;
}

let seq = 0;
export const email = (p: string) => `${p}.${Date.now().toString(36)}${++seq}@example.com`;

export async function createBillingHarness(opts: HarnessOptions = {}): Promise<BillingHarness> {
  const webhookSecret = randomBytes(24).toString('base64url');
  const h = await createHarness({
    consentDefault: 'granted',
    ...opts,
    env: { BILLING_ENABLED: 'true', RAZORPAY_PROVIDER: 'stub', RAZORPAY_WEBHOOK_SECRET: webhookSecret, ...opts.env },
  });
  const stub = h.services.billing.razorpay as RazorpayStub;
  if (stub) await syncPlans(h.t.db, stub, { now: new Date(h.clock.now()) });
  const bh = h as BillingHarness;
  bh.stub = stub;
  bh.webhookSecret = webhookSecret;
  bh.deliver = async (ev, o = {}) => {
    const signed = signWebhook(ev, o.secret ?? webhookSecret, { rawBody: o.rawBody, eventId: o.eventId });
    const headers: Record<string, string | undefined> = { ...signed.headers, origin: undefined, ...o.headers };
    // Razorpay's IPs reach us through the web proxy (edge secret + client IP), never with a cookie.
    return h.client('198.51.100.7').request('POST', '/v1/webhooks/razorpay', { rawBody: signed.rawBody, headers, origin: null, cookies: false });
  };
  bh.deliverAll = async (events) => {
    const out: LightMyRequestResponse[] = [];
    for (const ev of events) out.push(await bh.deliver(ev));
    return out;
  };
  bh.student = async (o = {}) => {
    const c = h.client();
    const { user } = await c.signInEmail(email('buyer'));
    if (o.consent && o.consent !== 'granted') {
      h.consent.setStatus(user.id, o.consent);
      await h.services.consent.refresh(user.id);
    }
    return { c, userId: user.id };
  };
  return bh;
}

/** Rows for assertions. */
export async function billingRows(h: Harness, userId: string) {
  const db = h.t.db;
  return {
    subscriptions: await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)),
    orders: await db.select().from(orders).where(eq(orders.userId, userId)),
    payments: await db.select().from(payments).where(eq(payments.userId, userId)),
    entitlements: await db.select().from(entitlements).where(eq(entitlements.userId, userId)),
  };
}

export async function eventRows(h: Harness, eventId: string) {
  return h.t.db.select().from(webhookEvents).where(eq(webhookEvents.eventId, eventId));
}

export const planFor = (h: Harness, userId: string, at?: number) => h.services.billing.entitlements.planFor(userId, new Date(at ?? h.clock.now()));

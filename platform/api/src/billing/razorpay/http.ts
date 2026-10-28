/**
 * Real Razorpay REST client (test or live keys). HTTP Basic auth with key id + key secret, JSON
 * bodies, 10 s timeout, responses validated with zod. Error bodies are never surfaced to clients
 * (API-13); they are mapped to RazorpayApiError with Razorpay's error code only.
 */
import { z } from 'zod/v4';
import {
  RazorpayApiError,
  RazorpayNotFoundError,
  RzpInvoice,
  RzpOrder,
  RzpPayment,
  RzpPlan,
  RzpSubscription,
  type CreateOrderInput,
  type CreatePlanInput,
  type CreateSubscriptionInput,
  type RazorpayClient,
} from './types';

export interface RazorpayHttpOptions {
  keyId: string;
  keySecret: string;
  baseUrl: string;
  fetch?: typeof fetch;
  timeoutMs?: number;
}

const ErrorBody = z.looseObject({ error: z.looseObject({ code: z.string().optional(), description: z.string().optional() }).optional() });
const Collection = <T extends z.ZodType>(item: T) => z.looseObject({ count: z.number().int(), items: z.array(item) });

/** Razorpay ids are `<prefix>_<alphanumeric>`; anything else never reaches a URL. */
const ID = /^[a-z]{2,6}_[A-Za-z0-9]{6,40}$/;

export class RazorpayHttpClient implements RazorpayClient {
  readonly mode = 'razorpay' as const;
  readonly keyId: string;
  private readonly auth: string;
  private readonly doFetch: typeof fetch;

  constructor(private readonly opts: RazorpayHttpOptions) {
    this.keyId = opts.keyId;
    this.auth = `Basic ${Buffer.from(`${opts.keyId}:${opts.keySecret}`).toString('base64')}`;
    this.doFetch = opts.fetch ?? fetch;
  }

  private async call<T extends z.ZodType>(method: 'GET' | 'POST', path: string, schema: T, body?: unknown): Promise<z.infer<T>> {
    let res: Response;
    try {
      res = await this.doFetch(`${this.opts.baseUrl}${path}`, {
        method,
        headers: { authorization: this.auth, accept: 'application/json', ...(body !== undefined ? { 'content-type': 'application/json' } : {}) },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(this.opts.timeoutMs ?? 10_000),
      });
    } catch (err) {
      throw new RazorpayApiError(`razorpay ${method} ${path.split('?')[0]} failed: ${(err as Error).name}`, 0);
    }
    const text = await res.text();
    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
    if (!res.ok) {
      const e = ErrorBody.safeParse(json);
      const code = e.success ? (e.data.error?.code ?? null) : null;
      const description = e.success ? (e.data.error?.description ?? '') : '';
      if (res.status === 404 || (res.status === 400 && /does not exist/i.test(description))) throw new RazorpayNotFoundError(path.split('?')[0]!);
      throw new RazorpayApiError(`razorpay ${method} ${path.split('?')[0]} answered ${res.status}`, res.status, code);
    }
    const parsed = schema.safeParse(json);
    if (!parsed.success) throw new RazorpayApiError(`razorpay ${method} ${path.split('?')[0]}: unexpected response shape`, 502, 'BAD_SHAPE', false);
    return parsed.data;
  }

  private id(id: string): string {
    if (!ID.test(id)) throw new RazorpayNotFoundError('malformed id');
    return encodeURIComponent(id);
  }

  async listPlans() {
    const out: RzpPlan[] = [];
    for (let skip = 0; ; skip += 100) {
      const page = await this.call('GET', `/plans?count=100&skip=${skip}`, Collection(RzpPlan));
      out.push(...page.items);
      if (page.items.length < 100) return out;
    }
  }

  createPlan(input: CreatePlanInput) {
    return this.call('POST', '/plans', RzpPlan, input);
  }

  createSubscription(input: CreateSubscriptionInput) {
    return this.call('POST', '/subscriptions', RzpSubscription, input);
  }

  async fetchSubscription(id: string) {
    return this.call('GET', `/subscriptions/${this.id(id)}`, RzpSubscription);
  }

  async cancelSubscription(id: string, opts: { atCycleEnd: boolean }) {
    return this.call('POST', `/subscriptions/${this.id(id)}/cancel`, RzpSubscription, { cancel_at_cycle_end: opts.atCycleEnd ? 1 : 0 });
  }

  createOrder(input: CreateOrderInput) {
    return this.call('POST', '/orders', RzpOrder, input);
  }

  async fetchOrder(id: string) {
    return this.call('GET', `/orders/${this.id(id)}`, RzpOrder);
  }

  async fetchOrderPayments(id: string) {
    return (await this.call('GET', `/orders/${this.id(id)}/payments`, Collection(RzpPayment))).items;
  }

  async fetchPayment(id: string) {
    return this.call('GET', `/payments/${this.id(id)}`, RzpPayment);
  }

  async fetchInvoice(id: string) {
    return this.call('GET', `/invoices/${this.id(id)}`, RzpInvoice);
  }

  async fetchSubscriptionInvoices(id: string) {
    const out: RzpInvoice[] = [];
    for (let skip = 0; ; skip += 100) {
      const page = await this.call('GET', `/invoices?subscription_id=${this.id(id)}&count=100&skip=${skip}`, Collection(RzpInvoice));
      out.push(...page.items);
      if (page.items.length < 100) return out;
    }
  }
}

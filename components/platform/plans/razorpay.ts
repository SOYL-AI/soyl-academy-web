/**
 * Razorpay Checkout in the browser (billing-razorpay M4 handoff "What web needs for /plans"; ADR-018 §4).
 * - checkout.js is loaded only on /plans, only when the student presses Buy (WEB-1).
 * - No `prefill`: the account is the child's; a parent pays.
 * - The success handler never forwards Checkout's response anywhere (AC-10): the page asks the API to
 *   re-sync (POST /v1/billing/refresh) and polls GET /v1/me/subscription; the plan is decided server-side.
 */
import type { OrderCheckout, SubscriptionCheckout } from '@/platform/shared/api-client';

export const RAZORPAY_CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

interface RazorpayInstance {
  open(): void;
  on?(event: string, cb: (...args: unknown[]) => void): void;
}
type RazorpayCtor = new (options: Record<string, unknown>) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

let loading: Promise<RazorpayCtor> | null = null;

export function loadCheckout(timeoutMs = 20_000): Promise<RazorpayCtor> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (loading) return loading;
  loading = new Promise<RazorpayCtor>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_SRC;
    script.async = true;
    const timer = window.setTimeout(() => reject(new Error('checkout timeout')), timeoutMs);
    script.onload = () => {
      window.clearTimeout(timer);
      if (window.Razorpay) resolve(window.Razorpay);
      else reject(new Error('checkout missing'));
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error('checkout failed to load'));
    };
    document.head.appendChild(script);
  }).catch((err) => {
    loading = null;
    throw err;
  });
  return loading;
}

/** Checkout options from the API's 201 response. Only these fields; never `prefill`. */
export function checkoutOptions(c: SubscriptionCheckout | OrderCheckout, handlers: { onPaid: () => void; onDismiss: () => void }): Record<string, unknown> {
  const base = {
    key: c.keyId,
    name: c.name,
    description: c.description,
    currency: c.currency,
    // The response is deliberately ignored: the API re-fetches the payment from Razorpay (AC-10).
    handler: () => handlers.onPaid(),
    modal: { ondismiss: () => handlers.onDismiss() },
    theme: { color: '#1f4fd1' },
  };
  return c.kind === 'subscription' ? { ...base, subscription_id: c.subscriptionId } : { ...base, order_id: c.orderId, amount: c.amountPaise };
}

import { track } from '@vercel/analytics';
import { readConsent } from '@/components/legal/consent';

/**
 * Conversion events for Vercel Web Analytics (custom events).
 *
 * - Sent only when the visitor has allowed analytics in the cookie banner; the
 *   same consent that mounts <Analytics /> in ConsentedAnalytics.tsx. Before that
 *   this is a no-op, so nothing is queued or sent.
 * - Never pass personal data: no names, emails, phone numbers or free text.
 *   Properties are fixed labels (where on the page, which action, cohort state).
 * - Custom events need a Vercel plan that includes them; on other plans Vercel
 *   simply ignores them.
 */
export type FbEvent =
  | 'fb_cta_click'
  | 'fb_waitlist_submit'
  | 'fb_callback_request'
  | 'fb_checkout_open'
  | 'fb_payment_success'
  | 'fb_coupon_applied';

type EventProps = Record<string, string | number | boolean | null>;

export function trackEvent(name: FbEvent, props?: EventProps) {
  if (typeof window === 'undefined') return;
  if (readConsent()?.analytics !== true) return;
  try {
    track(name, props);
  } catch {
    // Analytics must never break a form or a link.
  }
}

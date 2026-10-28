/**
 * Product-interest counters from platform pages (D-045, D-014): POST /v1/events.
 *
 * - Sends **only when the visitor accepted analytics** in the cookie bar: the same stored choice that
 *   marketing's ConsentedAnalytics reads (`readConsent()?.analytics === true`, components/legal/consent.ts,
 *   imported read-only; marketing code is unchanged). Before that, or after a refusal, this is a no-op.
 * - Fixed event names and dimension values from the allowlist (@soyl/shared/config/analytics); never
 *   ids, URLs, names or free text. The server stores counts per day only (no user, session or IP).
 * - Debounced: the same (event, dimension) is sent at most once per 30 minutes per tab, and events
 *   are batched (≤ 10 per request, ANALYTICS.events.maxPerRequest). Failures are ignored.
 */
import { readConsent } from '@/components/legal/consent';
import type { AnalyticsEventName } from '@/platform/shared/config/analytics';
import { api } from './api-browser';

/** Mirrors ANALYTICS.clientDebounceMs and ANALYTICS.events.maxPerRequest (the config module pulls in the store catalogue, so it is not imported here). */
export const INTEREST_DEBOUNCE_MS = 30 * 60 * 1000;
export const INTEREST_BATCH_MAX = 10;
const FLUSH_DELAY_MS = 1500;

type Hit = { name: AnalyticsEventName; dimension?: string };

const lastSent = new Map<string, number>();
let queue: Hit[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

export function analyticsAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  return readConsent()?.analytics === true;
}

/** True when this (event, dimension) should be queued now; records the time. Exported for tests. */
export function shouldSend(key: string, now: number): boolean {
  const prev = lastSent.get(key);
  if (prev !== undefined && now - prev < INTEREST_DEBOUNCE_MS) return false;
  lastSent.set(key, now);
  return true;
}

async function flush(): Promise<void> {
  timer = null;
  while (queue.length) {
    const events = queue.slice(0, INTEREST_BATCH_MAX);
    queue = queue.slice(INTEREST_BATCH_MAX);
    try {
      await api.post('/v1/events', { body: { events }, keepalive: true } as never);
    } catch {
      // Counting must never break a page.
    }
  }
}

/** Counts one product-interest event (after analytics consent only). */
export function trackInterest(name: AnalyticsEventName, dimension?: string): void {
  if (!analyticsAllowed()) return;
  const key = `${name}|${dimension ?? ''}`;
  if (!shouldSend(key, Date.now())) return;
  queue.push(dimension ? { name, dimension } : { name });
  if (!timer) timer = setTimeout(() => void flush(), FLUSH_DELAY_MS);
}

/** Test hook: forget debounce state and pending events. */
export function resetInterestForTests(): void {
  lastSent.clear();
  queue = [];
  if (timer) clearTimeout(timer);
  timer = null;
}

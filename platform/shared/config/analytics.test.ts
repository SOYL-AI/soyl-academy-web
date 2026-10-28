import { describe, expect, it } from 'vitest';
import { allowedCounter, ANALYTICS, ANALYTICS_DIMENSIONS, ANALYTICS_EVENTS, CLIENT_EVENT_NAMES } from './analytics';

describe('interest counter allowlist (D-045)', () => {
  it('accepts allowlisted (event, dimension) pairs and stores "" for events without one', () => {
    expect(allowedCounter('plans_view', undefined, { client: true })).toBe('');
    expect(allowedCounter('plan_select', 'pro', { client: true })).toBe('pro');
    expect(allowedCounter('store_item_view', 'hoodie', { client: true })).toBe('hoodie');
    expect(allowedCounter('paywall_shown', 'quick-doubt', { client: false })).toBe('quick-doubt');
  });

  it('refuses unknown events and values, missing or extra dimensions, and server-only events from clients', () => {
    expect(allowedCounter('toString', undefined, { client: true })).toBeNull();
    expect(allowedCounter('plan_select', 'free', { client: true })).toBeNull();
    expect(allowedCounter('plan_select', undefined, { client: true })).toBeNull();
    expect(allowedCounter('plans_view', 'pro', { client: true })).toBeNull();
    expect(allowedCounter('signup', 'email', { client: true })).toBeNull();
    expect(allowedCounter('checkout_start', 'pro', { client: true })).toBeNull();
  });

  it('names and values fit the database checks (event pattern, dimension ≤ 64 chars)', () => {
    for (const name of Object.keys(ANALYTICS_EVENTS)) expect(name).toMatch(/^[a-z][a-z0-9_]{1,63}$/);
    for (const values of Object.values(ANALYTICS_DIMENSIONS)) for (const v of values) expect(v.length).toBeLessThanOrEqual(64);
    expect(CLIENT_EVENT_NAMES).not.toContain('signup');
    expect(ANALYTICS.maxRangeDays).toBe(180);
  });
});

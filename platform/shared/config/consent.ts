/**
 * Which features need consent (D-052, ADR-030). Config, not code (golden rule 4): flipping one value
 * here re-gates a feature everywhere — the route policies (`policies.member({ consent })` →
 * ConsentService.assertAllowed), the cached `consent_status` checks in the API (leaderboard names,
 * league placement, live ranks, coin and credit awards, the school on the profile) and the web notices.
 *
 * D-052 (owner, 2026-11-12): "the consent step is necessary only when the student decides to move to a
 * paid plan"; "for the leaderboard no need parent approval". So only buying needs consent, plus the
 * physical-reward redemption that collects a child's shipping address (D-037; off in production).
 * Everything else — AI actions, photo uploads, leaderboards, leagues, live-mock ranks, coin rewards,
 * AI learning bonuses, the school on the profile — works for a student who never consented.
 *
 * Residual risk (ADR-030): DPDP s.9 ties verifiable parental consent to processing a child's data, not to
 * payment. Revisit before the DPDP Rules' consent obligations apply (~2027, OA-14).
 *
 * Only `import type` from ./security, so security.ts can import this file without a runtime cycle.
 */
import type { ConsentFeature, ConsentState } from './security';

export type ConsentRequirements = Readonly<Record<ConsentFeature, boolean>>;

/** true = the feature needs consent `granted`; false = open to every signed-in student. */
export const CONSENT_REQUIRED = {
  /** D-052: buying a paid plan (subscriptions and one-time orders). Buying is for a parent. */
  purchases: true,
  /**
   * SOYL Coins physical merch (D-037): redemption collects a child's name, phone and shipping address,
   * so it stays consent-gated (off in production: no physical items are listed).
   */
  physical_rewards: true,
  ai: false,
  uploads: false,
  leaderboards: false,
  rank_cards: false,
  profile_school_city: false,
  notifications: false,
  merge_guest: false,
  test_attempts: false,
} as const satisfies ConsentRequirements;

/** Whether `feature` needs consent `granted`. */
export function consentRequiredFor(feature: ConsentFeature, required: ConsentRequirements = CONSENT_REQUIRED): boolean {
  return required[feature] === true;
}

/**
 * Whether a student whose (cached) consent status is `status` may use `feature`: always when the feature
 * needs no consent, else only with `granted`. A missing status (no row yet) counts as not granted.
 */
export function consentAllows(status: ConsentState | string | null | undefined, feature: ConsentFeature, required: ConsentRequirements = CONSENT_REQUIRED): boolean {
  return !consentRequiredFor(feature, required) || status === 'granted';
}

/** The features that need consent, in declaration order. */
export function consentGatedFeatures(required: ConsentRequirements = CONSENT_REQUIRED): ConsentFeature[] {
  return (Object.keys(required) as ConsentFeature[]).filter((f) => required[f]);
}

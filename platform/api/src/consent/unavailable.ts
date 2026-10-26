/**
 * CONSENT_PROVIDER=unavailable (D-031): production runs before the owner's consent system has an
 * adapter (OA-08). Every account is `pending` and consent can never be granted here, so every
 * consent-gated feature (CONSENT.gatedFeatures, D-014: AI, uploads, leaderboards/rank cards,
 * school/city, notifications) stays OFF and answers 403 consent_required, while learning, practice
 * and tests (not gated) work for everyone.
 *
 * Not a mock (GEN-3): it is a real, fail-closed provider, so it is allowed with APP_ENV=prod. It is
 * authoritative, so a stale cached value can never be read back as `granted`.
 */
import type { ConsentFlow, ConsentProvider, ConsentStatus } from './provider';

export class UnavailableConsentProvider implements ConsentProvider {
  readonly name = 'unavailable';
  readonly isMock = false;

  async getStatus(): Promise<ConsentStatus> {
    return { status: 'pending', authoritative: true, providerRef: null, grantedAt: null };
  }

  /** There is no consent flow yet: the account stays `pending` and no redirect is offered. */
  async startFlow(): Promise<ConsentFlow> {
    return { status: 'pending', redirectUrl: null };
  }
}

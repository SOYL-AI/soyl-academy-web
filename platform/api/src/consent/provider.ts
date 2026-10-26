/**
 * Parental consent (ARCHITECTURE §5, CONTEXT §12, API-11, D-014). The owner's existing consent system
 * is outside this repo and its contract is unknown (OA-08), so the platform talks to it only through
 * this interface. The real adapter implements these two calls server-to-server; the browser is never
 * trusted for consent state.
 */
import type { ConsentState } from '@soyl/shared/config/security';

export interface ConsentStatus {
  status: ConsentState;
  /** The consent system's own id for this child, if it has one. */
  providerRef?: string | null;
  grantedAt?: Date | null;
  revokedAt?: Date | null;
  /**
   * False when the provider has no record and returned a default (the mock does this). The cache then
   * keeps an existing value instead of overwriting it, so seeded fixture states survive sign-in.
   */
  authoritative?: boolean;
}

export interface ConsentFlow {
  status: ConsentState;
  /** Where to send the parent (absolute https URL of the consent system), if the flow is web-based. */
  redirectUrl?: string | null;
}

export interface ConsentProvider {
  readonly name: string;
  /** Mock providers refuse to start in production (GEN-3). */
  readonly isMock: boolean;
  getStatus(userId: string): Promise<ConsentStatus>;
  startFlow(userId: string): Promise<ConsentFlow>;
}

export class ConsentUnavailableError extends Error {
  constructor(cause?: unknown) {
    super('consent provider unavailable', { cause });
    this.name = 'ConsentUnavailableError';
  }
}

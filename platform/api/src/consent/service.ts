/**
 * Consent cache and gate (API-11, API-16, D-014).
 *
 * `consent_status` caches the provider's answer for CONSENT.cacheTtlSeconds and is refreshed on every
 * sign-in. If the cache is stale and the provider is down, the gate fails closed (503
 * consent_unavailable) for gated features; status displays fall back to the cached value.
 */
import { eq, sql } from 'drizzle-orm';
import { consentStatus, type Database } from '@soyl/db';
import { CONSENT, type ConsentFeature, type ConsentState } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import { ApiProblem } from '../errors';
import { ConsentUnavailableError, type ConsentFlow, type ConsentProvider } from './provider';

export function isGated(feature: ConsentFeature, gated: readonly ConsentFeature[] = CONSENT.gatedFeatures): boolean {
  return gated.includes(feature);
}

export class ConsentService {
  constructor(
    private readonly db: Database,
    private readonly provider: ConsentProvider,
    private readonly clock: Clock,
    private readonly gatedFeatures: readonly ConsentFeature[] = CONSENT.gatedFeatures,
  ) {}

  private async cached(userId: string) {
    const [row] = await this.db.select().from(consentStatus).where(eq(consentStatus.userId, userId));
    return row ?? null;
  }

  /** Asks the provider and writes the cache. Throws ConsentUnavailableError on provider failure. */
  async refresh(userId: string): Promise<ConsentState> {
    let s;
    try {
      s = await this.provider.getStatus(userId);
    } catch (err) {
      throw err instanceof ConsentUnavailableError ? err : new ConsentUnavailableError(err);
    }
    const now = new Date(this.clock.now());
    if (s.authoritative === false) {
      const row = await this.cached(userId);
      if (row && row.provider !== 'pending-first-check') {
        await this.db.update(consentStatus).set({ fetchedAt: now }).where(eq(consentStatus.userId, userId));
        return row.status as ConsentState;
      }
    }
    await this.db
      .insert(consentStatus)
      .values({
        userId,
        status: s.status,
        provider: this.provider.name,
        providerRef: s.providerRef ?? null,
        grantedAt: s.status === 'granted' ? (s.grantedAt ?? now) : null,
        revokedAt: s.status === 'revoked' ? (s.revokedAt ?? now) : null,
        fetchedAt: now,
      })
      .onConflictDoUpdate({
        target: consentStatus.userId,
        set: {
          status: s.status,
          provider: this.provider.name,
          providerRef: s.providerRef ?? null,
          grantedAt: s.status === 'granted' ? sql`coalesce(${consentStatus.grantedAt}, ${s.grantedAt ?? now})` : null,
          revokedAt: s.status === 'revoked' ? (s.revokedAt ?? now) : null,
          fetchedAt: now,
        },
      });
    return s.status;
  }

  /** Refresh on sign-in; an outage leaves the cached value (or `required` for a new account). */
  async refreshOnLogin(userId: string): Promise<ConsentState> {
    try {
      return await this.refresh(userId);
    } catch {
      const row = await this.cached(userId);
      if (!row)
        await this.db.insert(consentStatus).values({ userId, status: 'required', provider: this.provider.name }).onConflictDoNothing();
      return (row?.status as ConsentState | undefined) ?? 'required';
    }
  }

  /**
   * The current state: the cache while fresh, else the provider. `strict` (gates) throws
   * ConsentUnavailableError when the cache is stale and the provider is down; otherwise the stale
   * value (or `required`) is returned.
   */
  async getStatus(userId: string, opts: { strict?: boolean } = {}): Promise<ConsentState> {
    const row = await this.cached(userId);
    const fresh = row && this.clock.now() - row.fetchedAt.getTime() < CONSENT.cacheTtlSeconds * 1000;
    if (row && fresh) return row.status as ConsentState;
    try {
      return await this.refresh(userId);
    } catch (err) {
      if (opts.strict) throw err;
      return (row?.status as ConsentState | undefined) ?? 'required';
    }
  }

  /** API-11 gate: 403 consent_required unless granted; 503 consent_unavailable when it cannot be checked. */
  async assertAllowed(userId: string, feature: ConsentFeature): Promise<void> {
    if (!isGated(feature, this.gatedFeatures)) return;
    let status: ConsentState;
    try {
      status = await this.getStatus(userId, { strict: true });
    } catch {
      throw new ApiProblem('consent_unavailable');
    }
    if (status !== 'granted') throw new ApiProblem('consent_required', { detail: `Consent status: ${status}.` });
  }

  isGated(feature: ConsentFeature): boolean {
    return isGated(feature, this.gatedFeatures);
  }

  async startFlow(userId: string): Promise<ConsentFlow> {
    let flow: ConsentFlow;
    try {
      flow = await this.provider.startFlow(userId);
    } catch {
      throw new ApiProblem('consent_unavailable');
    }
    const now = new Date(this.clock.now());
    await this.db
      .insert(consentStatus)
      .values({ userId, status: flow.status, provider: this.provider.name, fetchedAt: now, grantedAt: flow.status === 'granted' ? now : null })
      .onConflictDoUpdate({
        target: consentStatus.userId,
        set: { status: flow.status, fetchedAt: now, grantedAt: flow.status === 'granted' ? now : null },
      });
    return flow;
  }
}

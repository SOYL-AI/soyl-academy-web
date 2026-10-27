/**
 * Which plan a student is on (CONTEXT §6–7), read from `entitlements` — rows written only by the
 * server-verified Razorpay paths (webhooks, server-side re-sync, reconciliation; AC-10). This is the
 * real implementation of the AI gateway's `EntitlementService` contract
 * (platform/api/src/ai/entitlements.ts on platform/ai-gateway/m4):
 *
 *   planFor(userId, at) → the plan in force at `at`; 'free' when there is none; throws only when the
 *   database is unreachable (the gateway then fails closed).
 *
 * An entitlement is in force when valid_from ≤ at ≤ valid_until and it is not revoked at `at`. When
 * several are (e.g. Board Exam Pass and a Plus subscription), the one with the most daily credits wins.
 */
import { and, desc, eq, gt, isNull, lte, or, gte } from 'drizzle-orm';
import { entitlements, plans, type Database } from '@soyl/db';
import { getPlan, type PlanId } from '@soyl/shared/config/plans';

/** Structurally the AI gateway's EntitlementService (ai/entitlements.ts). */
export interface EntitlementServiceContract {
  readonly name: string;
  planFor(userId: string, at: Date): Promise<PlanId>;
}

export type EntitlementSource = 'free' | 'subscription' | 'order' | 'admin' | 'promo';

export interface CurrentEntitlement {
  plan: PlanId;
  source: EntitlementSource;
  entitlementId: string | null;
  validFrom: Date | null;
  validUntil: Date | null;
  subscriptionId: string | null;
  orderId: string | null;
}

export const FREE_ENTITLEMENT: CurrentEntitlement = { plan: 'free', source: 'free', entitlementId: null, validFrom: null, validUntil: null, subscriptionId: null, orderId: null };

export class BillingEntitlementService implements EntitlementServiceContract {
  readonly name = 'billing';

  constructor(private readonly db: Database) {}

  async current(userId: string, at: Date): Promise<CurrentEntitlement> {
    const rows = await this.db
      .select({
        id: entitlements.id,
        plan: plans.key,
        source: entitlements.source,
        validFrom: entitlements.validFrom,
        validUntil: entitlements.validUntil,
        subscriptionId: entitlements.subscriptionId,
        orderId: entitlements.orderId,
        credits: plans.creditsPerDay,
        order: plans.displayOrder,
      })
      .from(entitlements)
      .innerJoin(plans, eq(plans.id, entitlements.planId))
      .where(
        and(
          eq(entitlements.userId, userId),
          lte(entitlements.validFrom, at),
          gte(entitlements.validUntil, at),
          or(isNull(entitlements.revokedAt), gt(entitlements.revokedAt, at)),
        ),
      )
      .orderBy(desc(plans.creditsPerDay), desc(plans.displayOrder), desc(entitlements.validUntil))
      .limit(1);
    const r = rows[0];
    if (!r) return FREE_ENTITLEMENT;
    return {
      plan: r.plan as PlanId,
      source: r.source as EntitlementSource,
      entitlementId: r.id,
      validFrom: r.validFrom,
      validUntil: r.validUntil,
      subscriptionId: r.subscriptionId,
      orderId: r.orderId,
    };
  }

  async planFor(userId: string, at: Date): Promise<PlanId> {
    return (await this.current(userId, at)).plan;
  }

  /** Daily credits of the plan in force (convenience for callers without plan config). */
  async creditsPerDay(userId: string, at: Date): Promise<number> {
    return getPlan(await this.planFor(userId, at)).creditsPerDay;
  }
}

/**
 * The AI gateway's credit hook (ARCHITECTURE §11.2 "credits for the new plan apply immediately"):
 * `CreditService.applyPlanChange(userId, plan)` tops today's grant up to the new plan's daily credits.
 * Called after the transaction that granted the plan commits. Default: none (the credits service also
 * tops up lazily on the next credits read, because planFor already returns the new plan).
 */
export interface CreditTopUpHook {
  applyPlanChange(userId: string, plan: PlanId): Promise<unknown>;
}

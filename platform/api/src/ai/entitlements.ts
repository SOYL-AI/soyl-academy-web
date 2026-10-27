/**
 * Which plan a student is on (CONTEXT §6–7). The real implementation is `BillingEntitlementService`
 * (billing/entitlements.ts, ADR-016), over `entitlements` rows written only by the server-verified
 * Razorpay paths (AC-10: the client never decides entitlement). AiServices uses it by default; tests
 * inject `StaticEntitlementService`; `FreeEntitlementService` remains for stand-alone stand-ins.
 *
 * Contract for billing:
 * - `planFor(userId, at)` returns the plan in force at `at` (server clock). Called once per AI request
 *   and per credits read, BEFORE any credit transaction opens (it may use its own pool connection).
 * - It must never throw for "no subscription": return 'free'. Throw only when the entitlement store is
 *   unreachable; the gateway then fails closed (503) for AI and shows the cached plan nowhere.
 * - When a plan starts mid-day, call `CreditService.applyPlanChange(userId, plan)` so today's grant is
 *   topped up to the new plan's daily credits (ARCHITECTURE §11.2 "top-up of the day's difference").
 */
import type { PlanId } from '@soyl/shared/config/plans';

/** planFor(userId, at) from the `entitlements` table: 'free' when none; throws only if Postgres is unreachable. */
export { BillingEntitlementService } from '../billing/entitlements';

export interface EntitlementService {
  readonly name: string;
  planFor(userId: string, at: Date): Promise<PlanId>;
}

/** Every student on the free plan (stand-alone stand-in; the app uses BillingEntitlementService). */
export class FreeEntitlementService implements EntitlementService {
  readonly name = 'free-default';
  async planFor(): Promise<PlanId> {
    return 'free';
  }
}

/** Tests and local demos: a fixed plan per user, 'free' otherwise. */
export class StaticEntitlementService implements EntitlementService {
  readonly name = 'static';
  private readonly plans = new Map<string, PlanId>();
  set(userId: string, plan: PlanId): void {
    this.plans.set(userId, plan);
  }
  async planFor(userId: string): Promise<PlanId> {
    return this.plans.get(userId) ?? 'free';
  }
}

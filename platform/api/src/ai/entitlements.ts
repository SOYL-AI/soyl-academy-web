/**
 * Which plan a student is on (CONTEXT §6–7). The billing agent (M4 billing) owns entitlements and
 * replaces the default below with an implementation over `entitlements`/`subscriptions` written by
 * the Razorpay webhook path (AC-10: the client never decides entitlement).
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

export interface EntitlementService {
  readonly name: string;
  planFor(userId: string, at: Date): Promise<PlanId>;
}

/** Until billing lands: every student is on the free plan. */
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

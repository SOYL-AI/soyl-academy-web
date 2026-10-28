/**
 * Server-observed interest counters (D-045). The API counts these itself, where they happen, so the
 * browser cannot inflate them and no consent banner is involved (nothing about the visitor is stored):
 *
 * - `paywall_shown` (dimension: the AI action): an AI action refused with 402 `credits_exhausted`;
 * - `ai_paused`: an AI action refused because the daily spend cap paused AI;
 * - `checkout_start` (dimension: the plan): POST /v1/billing/subscriptions or /orders answered 201;
 * - `signup` (dimension: the method): counted in auth/identity.ts when an account is created;
 * - `checkout_complete` (dimension: the plan): for billing's payment-captured path to call
 *   `services.counters.observe('checkout_complete', plan)`; until then the dashboard reads completed
 *   checkouts from the payments table.
 *
 * Everything is best effort: a failure is logged and never changes the response.
 */
import type { FastifyRequest } from 'fastify';
import { AI_ACTION_IDS } from '@soyl/shared/config/ai-actions';
import type { InterestCounters } from './counters';

const CHECKOUT_ROUTES = new Set(['/v1/billing/subscriptions', '/v1/billing/orders']);

export async function observeProblem(counters: InterestCounters, request: FastifyRequest, code: string): Promise<void> {
  if (code === 'credits_exhausted') {
    const action = (request.params as { action?: unknown } | undefined)?.action;
    if (typeof action === 'string' && (AI_ACTION_IDS as readonly string[]).includes(action)) await counters.observe('paywall_shown', action, request.log);
  } else if (code === 'ai_paused') await counters.observe('ai_paused', null, request.log);
}

export async function observeResponse(counters: InterestCounters, request: FastifyRequest, status: number): Promise<void> {
  if (status !== 201 || request.method !== 'POST' || !CHECKOUT_ROUTES.has(request.routeOptions.url ?? '')) return;
  const plan = (request.body as { plan?: unknown } | undefined)?.plan;
  if (typeof plan === 'string') await counters.observe('checkout_start', plan, request.log);
}

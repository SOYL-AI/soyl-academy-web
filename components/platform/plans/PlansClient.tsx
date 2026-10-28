'use client';

/**
 * /plans (billing-razorpay M4 handoff "What web needs for /plans"; CONTEXT §7; D-034):
 * - cards from GET /v1/plans: names, daily credits, features (from the API, not hard-coded per plan) and
 *   price labels ("incl. GST" only when `pricesIncludeGst`: the seller is not GST-registered yet); buttons
 *   off when `purchasable` is false (billing off → "Coming soon");
 * - invoice details (ADR-024): the payer's state (GST place of supply; default the seller's state) and an
 *   optional name for the invoice, sent with the purchase;
 * - Buy: POST /v1/billing/subscriptions | /orders → Razorpay Checkout (no prefill) → on success
 *   POST /v1/billing/refresh {} and poll GET /v1/me/subscription (every 2.5 s, up to 60 s) until the plan
 *   changes. The browser never decides the plan (AC-10);
 * - states: guest (log in, back here), consent_required (a parent must approve), billing_disabled,
 *   already_subscribed (manage), plan_unavailable, service unavailable.
 */
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { isApiError, type MySubscription, type PlansResponse, type PlanView } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { useCredits } from '../ai/CreditsProvider';
import { api } from '../lib/api-browser';
import { GST_STATES } from '@/platform/shared/billing/gst';
import { Field } from '@/components/platform/ui/kit/Field';
import field from '@/components/platform/ui/kit/Interactive.module.css';
import { trackInterest } from '../lib/interest';
import { checkoutOptions, loadCheckout } from './razorpay';
import s from './plans.module.css';

/** The API's rule for the optional invoice name (platform/api/src/billing/routes.ts CheckoutBuyer). */
export const INVOICE_NAME = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'’-]{0,79}$/;

export const ACTIVATION_POLL_MS = 2_500;
export const ACTIVATION_TIMEOUT_MS = 60_000;

/** Plan feature ids (platform/shared/config/plans.ts PlanFeature) → words. Unknown ids are humanised. */
const FEATURE_TEXT: Record<string, string> = {
  paper_from_upload: '“Papers like my school’s” from a sample paper',
  priority_ai_evaluation: 'Priority AI marking of written answers',
  parent_weekly_report: 'Weekly progress report for parents',
};

/**
 * "₹1,499/year" → amount "₹1,499" (tabular figures) + suffix "/year" (proportional, so "one-time" keeps its
 * normal hyphen: Inter's tabular hyphen rendered "one - time"). No price (the Free plan) → "₹0", so the card
 * does not say "Free" twice (Lead review 2026-10-28).
 */
export function priceParts(label: string | null): { amount: string; suffix: string } {
  if (!label) return { amount: '₹0', suffix: '' };
  const m = /^(₹\s?[\d,]+(?:\.\d+)?)(.*)$/.exec(label);
  return m ? { amount: m[1]!, suffix: m[2]! } : { amount: label, suffix: '' };
}

export function featureText(id: string, plan: Pick<PlanView, 'creditsPerDay'>): string {
  if (id === 'ai_credits') return `${plan.creditsPerDay} AI credits every day`;
  return FEATURE_TEXT[id] ?? id.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
}

type Interval = 'monthly' | 'yearly';

export type BuyState =
  | { kind: 'idle' }
  | { kind: 'working'; planId: string }
  | { kind: 'activating'; planId: string }
  | { kind: 'done'; planName: string }
  | { kind: 'dismissed' }
  | { kind: 'problem'; code: string; message: string };

export function billingProblem(err: unknown): { code: string; message: string } {
  if (!isApiError(err)) return { code: 'error', message: 'Something went wrong. Please try again.' };
  switch (err.code) {
    case 'consent_required':
      return { code: err.code, message: 'A parent needs to approve your account before you can buy a plan.' };
    case 'consent_unavailable':
      return { code: err.code, message: 'We cannot check your parent’s approval right now. Please try again later.' };
    case 'billing_disabled':
      return { code: err.code, message: 'Plans are not on sale yet. AI credits stay free every day.' };
    case 'already_subscribed':
      return { code: err.code, message: 'You already have this plan. You can manage it from your profile.' };
    case 'plan_unavailable':
      return { code: err.code, message: 'This plan is no longer on sale.' };
    case 'billing_unavailable':
      return { code: err.code, message: 'Payments are not available right now. Please try again in a few minutes.' };
    case 'unauthenticated':
      return { code: err.code, message: 'Please log in again.' };
    case 'rate_limited':
      return { code: err.code, message: 'Please wait a moment and try again.' };
    default:
      return { code: err.code, message: err.status >= 500 ? 'Payments are not available right now. Please try again in a few minutes.' : 'Something went wrong. Please try again.' };
  }
}

export function PlansClient() {
  const { state, openLogin } = useSession();
  const { refresh: refreshCredits } = useCredits();
  const [plans, setPlans] = useState<PlansResponse | null>(null);
  const [error, setError] = useState(false);
  const [mine, setMine] = useState<MySubscription | null>(null);
  const [interval, setInterval_] = useState<Interval>('monthly');
  const [buy, setBuy] = useState<BuyState>({ kind: 'idle' });
  const [placeOfSupply, setPlaceOfSupply] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const member = state.status === 'member';

  const load = useCallback(async () => {
    try {
      setPlans(await api.get('/v1/plans'));
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  const loadMine = useCallback(async () => {
    try {
      const m = await api.get('/v1/me/subscription');
      setMine(m);
      return m;
    } catch {
      return null;
    }
  }, []);

  // D-045 interest counter (aggregate; only after analytics consent).
  useEffect(() => trackInterest('plans_view'), []);

  useEffect(() => {
    if (state.status === 'loading') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- plans (members: no-store) and the current plan
    void load();
    if (member) void loadMine();
  }, [state.status, member, load, loadMine]);

  /** After Checkout: re-sync, then poll until the API grants the plan (≤ 60 s). */
  const activate = useCallback(
    async (plan: PlanView) => {
      setBuy({ kind: 'activating', planId: plan.id });
      try {
        await api.post('/v1/billing/refresh', { body: {} });
      } catch {
        // The webhook may still grant it; keep polling.
      }
      const until = Date.now() + ACTIVATION_TIMEOUT_MS;
      while (Date.now() < until) {
        const m = await loadMine();
        if (m && m.plan === plan.id) {
          setBuy({ kind: 'done', planName: m.planName });
          void refreshCredits();
          return;
        }
        await new Promise((r) => setTimeout(r, ACTIVATION_POLL_MS));
      }
      setBuy({ kind: 'problem', code: 'slow', message: 'Payment received. Your plan is taking longer than usual to switch on: it will appear on your profile within a few minutes. You will not be charged twice.' });
    },
    [loadMine, refreshCredits],
  );

  const start = async (plan: PlanView) => {
    trackInterest('plan_select', plan.id);
    if (!member) {
      trackInterest('signup_prompt_click', 'plans');
      openLogin({ returnTo: '/plans', reason: 'Log in to choose a plan. Lessons, practice and tests stay free.' });
      return;
    }
    const name = buyerName.trim();
    if (name && !INVOICE_NAME.test(name)) return; // the field shows the error
    setBuy({ kind: 'working', planId: plan.id });
    // Invoice details (ADR-024): the state is always sent (default: the seller's); the name only when given.
    const stateCode = placeOfSupply ?? plans?.defaultPlaceOfSupply;
    const invoice = {
      ...(stateCode && GST_STATES.some((st) => st.code === stateCode) ? { placeOfSupply: stateCode as (typeof GST_STATES)[number]['code'] } : {}),
      ...(name ? { buyerName: name } : {}),
    };
    try {
      const checkout =
        plan.id === 'board_exam_pass'
          ? await api.post('/v1/billing/orders', { body: { plan: 'board_exam_pass', ...invoice } })
          : await api.post('/v1/billing/subscriptions', { body: { plan: plan.id as 'plus' | 'pro', interval, ...invoice } });
      const Razorpay = await loadCheckout();
      const rzp = new Razorpay(
        checkoutOptions(checkout, {
          onPaid: () => void activate(plan),
          onDismiss: () => setBuy((b) => (b.kind === 'working' ? { kind: 'dismissed' } : b)),
        }),
      );
      rzp.open();
    } catch (err) {
      if (err instanceof Error && !isApiError(err) && /checkout/.test(err.message)) {
        setBuy({ kind: 'problem', code: 'checkout', message: 'The payment window could not open. Check your connection and try again.' });
      } else setBuy({ kind: 'problem', ...billingProblem(err) });
    }
  };

  const cancel = async () => {
    try {
      setMine(await api.post('/v1/billing/cancel', { body: {} }));
    } catch (err) {
      setBuy({ kind: 'problem', ...billingProblem(err) });
    }
  };

  if (error) {
    return (
      <EmptyState title="We could not load the plans" icon="alert" headingLevel="h2" action={<Button variant="secondary" onClick={() => void load()}>Try again</Button>}>
        Check your connection and try again.
      </EmptyState>
    );
  }
  if (!plans) {
    return (
      <div aria-busy="true" aria-label="Loading plans" className={s.grid}>
        <Skeleton variant="block" height={220} />
        <Skeleton variant="block" height={220} />
      </div>
    );
  }

  const ordered = [...plans.plans].sort((a, b) => a.order - b.order);
  const hasYearly = ordered.some((p) => p.prices.some((x) => x.interval === 'yearly'));
  const consentNeeded = member && state.consent !== 'granted';
  const showInvoiceDetails = member && plans.billingEnabled && !consentNeeded && ordered.some((p) => p.purchasable);
  const nameError = buyerName.trim() && !INVOICE_NAME.test(buyerName.trim()) ? "Use English letters, spaces and . ' - only." : undefined;

  return (
    <div className={s.page} data-testid="plans" data-billing={plans.billingEnabled ? 'on' : 'off'}>
      {!plans.billingEnabled && (
        <p className={s.notice} role="status" data-testid="billing-off">
          <Icon name="info" size={18} /> Plans are not on sale yet. Everyone gets free AI credits every day; lessons, practice and tests are always free.
        </p>
      )}
      {consentNeeded && plans.billingEnabled && (
        <p className={s.notice} role="note" data-testid="plans-consent">
          <Icon name="lock" size={18} /> A parent needs to approve your account (or you confirm you are 18 or older) before you can buy a plan.{' '}
          <Link href="/me/consent?next=%2Fplans">Ask a parent to approve</Link>
        </p>
      )}
      {mine && mine.plan !== 'free' && (
        <p className={s.current} data-testid="current-plan">
          <Icon name="check" size={18} /> Your plan: <strong>{mine.planName}</strong> ({mine.creditsPerDay} credits a day)
          {mine.validUntil ? `, until ${new Date(mine.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}.{' '}
          <Link href="/me#subscription">Manage</Link>
        </p>
      )}
      {buy.kind === 'activating' && (
        <p className={s.current} role="status" data-testid="activating">
          <Icon name="clock" size={18} /> Payment received — activating your plan…
        </p>
      )}
      {buy.kind === 'done' && (
        <p className={s.success} role="status" data-testid="activated">
          <Icon name="check" size={18} /> {buy.planName} is active. Your extra credits are ready.
        </p>
      )}
      {buy.kind === 'dismissed' && (
        <p className={s.notice} role="status">
          Payment not completed. You have not been charged.
        </p>
      )}
      {buy.kind === 'problem' && (
        <p className={s.problem} role="alert" data-testid="plans-problem" data-code={buy.code}>
          <Icon name="alert" size={18} /> {buy.message}
          {buy.code === 'already_subscribed' && (
            <>
              {' '}
              <Link href="/me#subscription">Manage your plan</Link>
            </>
          )}
          {buy.code === 'consent_required' && (
            <>
              {' '}
              <Link href="/me/consent?next=%2Fplans">Ask a parent to approve</Link>
            </>
          )}
        </p>
      )}

      {hasYearly && (
        <div className={s.toggle} role="radiogroup" aria-label="Billing period">
          {(['monthly', 'yearly'] as const).map((iv) => (
            <label key={iv} className={cx(s.toggleOption, interval === iv && s.toggleOn)}>
              <input type="radio" name="interval" value={iv} checked={interval === iv} onChange={() => setInterval_(iv)} />
              {iv === 'monthly' ? 'Monthly' : 'Yearly'}
            </label>
          ))}
        </div>
      )}

      {showInvoiceDetails && (
        <fieldset className={s.invoice} data-testid="invoice-details">
          <legend className={s.invoiceLegend}>Invoice details</legend>
          <Field label="State" hint="Where the person paying lives. It goes on the invoice; if you are not sure, keep the default.">
            {(control) => (
              <select
                {...control}
                className={field.input}
                value={placeOfSupply ?? plans.defaultPlaceOfSupply}
                onChange={(e) => setPlaceOfSupply(e.target.value)}
                name="placeOfSupply"
                autoComplete="address-level1"
                data-testid="invoice-state"
              >
                {GST_STATES.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Name on the invoice (optional)" error={nameError}>
            {(control) => (
              <input
                {...control}
                className={field.input}
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                maxLength={80}
                autoComplete="name"
                name="buyerName"
                data-testid="invoice-name"
              />
            )}
          </Field>
        </fieldset>
      )}

      <ul className={s.grid}>
        {ordered.map((p) => {
          const price = p.prices.find((x) => x.interval === (p.id === 'board_exam_pass' ? 'one_time' : interval)) ?? p.prices[0];
          const isCurrent = (mine?.plan ?? 'free') === p.id;
          const busy = (buy.kind === 'working' || buy.kind === 'activating') && buy.planId === p.id;
          return (
            <li key={p.id} className={cx(s.card, p.id === 'pro' && s.cardFeatured)} data-plan={p.id}>
              <h2 className={s.planName}>
                {p.name} {p.id === 'pro' && <Badge tone="accent">Most AI</Badge>}
              </h2>
              <p className={s.price} data-testid={`price-${p.id}`}>
                {(() => {
                  const parts = priceParts(price?.label ?? null);
                  return (
                    <>
                      <span className={s.amount}>{parts.amount}</span>
                      {parts.suffix && <span className={s.per}>{parts.suffix}</span>}
                    </>
                  );
                })()}
                {price && plans.pricesIncludeGst && <span className={s.gst}> incl. GST</span>}
              </p>
              {p.validUntil && <p className={s.muted}>Valid until {new Date(p.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })}</p>}
              <ul className={s.features}>
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={16} /> {featureText(f, p)}
                  </li>
                ))}
              </ul>
              {p.id === 'free' ? (
                <p className={s.muted}>{isCurrent && member ? 'Your current plan' : 'For every logged-in student'}</p>
              ) : isCurrent ? (
                <Badge tone="success">Your plan</Badge>
              ) : (
                <Button
                  block
                  onClick={() => void start(p)}
                  loading={busy}
                  disabled={!plans.billingEnabled || !p.purchasable || consentNeeded}
                  data-testid={`buy-${p.id}`}
                >
                  {!plans.billingEnabled || !p.purchasable ? 'Coming soon' : member ? `Choose ${p.name}` : 'Log in to choose'}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      <p className={s.muted}>
        {plans.pricesIncludeGst ? 'Prices include GST. ' : ''}Payments are handled by Razorpay (UPI, cards). An invoice is emailed for every payment and kept under <Link href="/me/invoices">Invoices</Link>. Monthly and yearly plans renew automatically until you cancel; you keep the plan until the end of the period you paid for.</p>

      {mine?.subscription && !mine.subscription.cancelAtPeriodEnd && (mine.subscription.status === 'active' || mine.subscription.status === 'authenticated') && (
        <p>
          <Button variant="ghost" size="sm" onClick={() => void cancel()}>
            Cancel renewal
          </Button>
        </p>
      )}
    </div>
  );
}

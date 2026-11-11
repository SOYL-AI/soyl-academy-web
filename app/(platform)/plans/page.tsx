/**
 * /plans — AI plans and Razorpay Checkout (ARCHITECTURE §3.1: public, static; billing-razorpay M4 handoff
 * "What web needs for /plans"). The only platform page whose CSP allows Razorpay Checkout (WEB-1, WEB-3,
 * ADR-018 §4); checkout.js is added to the page only when the student presses Buy.
 *
 * "Ink and wash" phase 3 (docs/redesign-ink-and-wash.md §3.3): above the cards, what a parent needs to decide
 * (PlansGuide: the ledger and the midnight refill, the exam month and the pass per day, a sample weekly report,
 * a short FAQ and the refund policy), every number from config. The cards and the purchase flow (PlansClient)
 * are unchanged apart from labels and a per-day line.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { Arrow } from '@/components/ink/Button';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { pricesIncludeGst } from '@/platform/shared/config/invoicing';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { PlansClient } from '@/components/platform/plans/PlansClient';
import { PlansGuide } from '@/components/platform/plans/PlansGuide';
import shell from '@/components/platform/shell/shell.module.css';
import g from '@/components/platform/plans/guide.module.css';

export const metadata: Metadata = platformMetadata({
  title: 'AI plans: more AI credits every day',
  // "Prices include GST" only while the seller is GST-registered (platform/shared/config/invoicing.ts).
  description: `Lessons, practice and tests are free. Plans add more AI tutor credits each day.${pricesIncludeGst() ? ' Prices include GST.' : ''}`,
  path: '/plans',
});

export default async function PlansPage() {
  requirePlatform();
  await connection(); // S6-L03: rendered per request so the proxy's CSP nonce applies
  // Per request (after connection()), so the pass's days left are counted from today.
  const now = new Date();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Plans', path: '/plans' }]} title="AI plans" lead="Lessons, practice and tests are always free. Plans only add AI credits.">
        <a href="#choose" className={g.jump}>
          Go to the plans
          <Arrow />
        </a>
      </PageHeader>
      <PlansGuide now={now} />
      <section id="choose" aria-labelledby="choose-title" className={g.choose}>
        <h2 id="choose-title" className={g.head}>
          Choose a plan
        </h2>
        <PlansClient />
      </section>
    </div>
  );
}

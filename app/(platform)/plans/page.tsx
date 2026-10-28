/**
 * /plans — AI plans and Razorpay Checkout (ARCHITECTURE §3.1: public, static; billing-razorpay M4 handoff
 * "What web needs for /plans"). The only platform page whose CSP allows Razorpay Checkout (WEB-1, WEB-3,
 * ADR-018 §4); checkout.js is added to the page only when the student presses Buy.
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { pricesIncludeGst } from '@/platform/shared/config/invoicing';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { PlansClient } from '@/components/platform/plans/PlansClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = platformMetadata({
  title: 'AI plans: more AI credits every day',
  // "Prices include GST" only while the seller is GST-registered (platform/shared/config/invoicing.ts).
  description: `Lessons, practice and tests are free. Plans add more AI tutor credits each day.${pricesIncludeGst() ? ' Prices include GST.' : ''}`,
  path: '/plans',
});

export default async function PlansPage() {
  requirePlatform();
  await connection(); // S6-L03: rendered per request so the proxy's CSP nonce applies
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Plans', path: '/plans' }]} title="AI plans" lead="Lessons, practice and tests are always free. Plans only add AI credits." />
      <PlansClient />
    </div>
  );
}

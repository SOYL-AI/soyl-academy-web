/**
 * /plans — AI plans and Razorpay Checkout (ARCHITECTURE §3.1: public, static; billing-razorpay M4 handoff
 * "What web needs for /plans"). The only platform page whose CSP allows Razorpay Checkout (WEB-1, WEB-3,
 * ADR-018 §4); checkout.js is added to the page only when the student presses Buy.
 */
import type { Metadata } from 'next';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { PlansClient } from '@/components/platform/plans/PlansClient';
import shell from '@/components/platform/shell/shell.module.css';

export const metadata: Metadata = platformMetadata({
  title: 'AI plans: more AI credits every day',
  description: 'Lessons, practice and tests are free. Plans add more AI tutor credits each day. Prices include GST.',
  path: '/plans',
});

export default function PlansPage() {
  requirePlatform();
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[{ name: 'Plans', path: '/plans' }]} title="AI plans" lead="Lessons, practice and tests are always free. Plans only add AI credits." />
      <PlansClient />
    </div>
  );
}

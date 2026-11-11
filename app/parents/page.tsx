import { InkLink } from '@/components/ink/Button';
import { CreditsMeter } from '@/components/ink/CreditsMeter';
import { Dab } from '@/components/ink/Dab';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { LedgerColumns } from '@/components/ink/LedgerColumns';
import { PriceList } from '@/components/ink/PerDay';
import { ReportSample } from '@/components/ink/ReportSample';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { Wash } from '@/components/ink/Wash';
import { StructuredData } from '@/components/seo/StructuredData';
import { photo } from '@/content/credits';
import { CONSENT_STEPS, SAFETY } from '@/content/parents';
import { priceRows } from '@/lib/pricing/price-rows';
import { midnightRefill } from '@/lib/pricing/refill';
import { reportPlans } from '@/lib/pricing/report-sample';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';
import { PLATFORM_ENABLED, PRIMARY_CTA } from '@/lib/site';

export const metadata = createMetadata({ path: '/parents' });

// The Board Exam Pass per day depends on today's date (lib/pricing/per-day.ts); re-check hourly.
export const revalidate = 3600;

/** With the platform on, the page's one action is the plans; with it off there is no platform link (GEN-4). */
const ACTION = PLATFORM_ENABLED ? { label: 'See the plans', href: '/plans' } : PRIMARY_CTA;

/**
 * /parents, "Ink and wash" (docs/redesign-ink-and-wash.md §3.3, phase 3): show the payer what they receive.
 *
 *   1 opening   the promise, one action, a real photograph (no number or price beside the child's face)
 *   2 report    the weekly report itself, a SAMPLE with made-up figures, on the painted wash
 *   3 ledger    what is free and what is metered; the midnight refill; plans per day (platform on)
 *   4 consent   consent and safety in plain words, from the rules as built
 *
 * One action: "See the plans" with the platform on, "Book a demo" with it off. Every number is read from
 * config through lib/pricing (unit-tested); the consent and safety lines are content/parents.ts, with their
 * sources. Retires the page's AI-generated images (plan §2.6).
 */
export default function ParentsPage() {
  const hero = photo('parents-reading');
  const refill = midnightRefill();
  const prices = PLATFORM_ENABLED ? priceRows(new Date()) : [];

  return (
    <>
      <StructuredData data={graph(webPageNode({ path: '/parents' }), breadcrumbNode('/parents', topLevelCrumbs('/parents')))} />

      <section aria-labelledby="parents-title" className="pb-14 pt-10 md:pb-20 md:pt-14 lg:pt-16">
        <div className="page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <h1 id="parents-title" className="ink-hero text-[clamp(2.6rem,5.2vw,4.2rem)] max-w-[12ch]">
              See your child’s week.
            </h1>
            <Stroke pigment="indigo" width="5em" reveal={false} className="text-[clamp(2.6rem,5.2vw,4.2rem)]" />
            <p className="ink-lead mt-5 max-w-[36ch]">One short report a week: what they studied and practised, and where it got hard.</p>
            <div className="mt-9">
              <InkLink href={ACTION.href} size="lg" arrow>
                {ACTION.label}
              </InkLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <InkPhoto src={hero.src} alt={hero.alt} aspect="4 / 3" sizes="(min-width: 1320px) 600px, (min-width: 1024px) 46vw, 92vw" priority position="40% 40%" />
          </div>
        </div>
      </section>

      <Section ground="paper-2" aria-labelledby="report-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="report-title" className="ink-head max-w-[14ch]">
              This is the weekly report.
            </h2>
            <Stroke pigment="indigo" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
            <p className="ink-lead mt-6 max-w-[38ch]">Days studied, lessons and questions, tests, and the chapters where it got hard. It comes with {reportPlans()}.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Wash className="mx-auto max-w-[34rem] px-4 py-6 sm:px-6 sm:py-7">
              <ReportSample />
            </Wash>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="ledger-title">
        <h2 id="ledger-title" className="ink-head max-w-[16ch]">
          Learning is free. AI has a meter.
        </h2>
        <Stroke pigment="turmeric" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
        {PLATFORM_ENABLED ? null : <p className="ink-ask mt-8">Free lessons for Classes 7 to 12 open soon.</p>}
        <LedgerColumns className="mt-10">
          <CreditsMeter credits={refill.freePerDay} refillsAt={refill.refillsAt} bonuses={refill.bonuses} />
          {prices.length ? (
            <div className="mt-2">
              <p className="ink-label">Plans add more AI credits a day</p>
              <PriceList rows={prices} className="mt-3" />
              <div className="mt-6">
                <InkLink href={ACTION.href} variant="quiet" arrow>
                  {ACTION.label}
                </InkLink>
              </div>
            </div>
          ) : null}
        </LedgerColumns>
      </Section>

      <Section ground="paper-2" aria-labelledby="consent-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="consent-title" className="ink-head max-w-[13ch]">
              You decide what AI your child can use.
            </h2>
            <Stroke pigment="madder" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-7">
              {CONSENT_STEPS.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3">
                  <span aria-hidden="true" className="font-serif text-[1.6rem] leading-[1.1] text-indigo tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <p className="ink-title">{step.title}</p>
                    <p className="mt-2 max-w-[56ch] text-graphite">{step.line}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12 border-t border-rule pt-8">
              <h3 className="ink-label">In plain words</h3>
              <ul className="mt-5 grid gap-4">
                {SAFETY.map((line) => (
                  <li key={line} className="flex gap-3">
                    <Dab pigment="ink" className="mt-[0.2em] text-[1.25rem]" />
                    <span className="max-w-[60ch]">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

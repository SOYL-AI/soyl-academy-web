import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/refund-policy',
  title: 'Cancellation & Refund Policy | SOYL Academy',
  description: 'Official cancellation and refund policy of SOYL Academy, including our 100% Session 1 Money-Back Guarantee.',
});

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black pt-32 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block bg-brand-yellow px-3 py-1 rounded border border-brand-black mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-black">
                Fair & Transparent Policies
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-brand-black">
              Cancellation & Refund Policy
            </h1>
            <p className="text-sm font-bold text-brand-black/60">
              Last updated: October 2026 • SOYL AI Private Limited (Begakuru 560043)
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-10 text-brand-black/85 leading-relaxed font-medium">
            {/* Highlight: Money-back Guarantee */}
            <section className="bg-brand-yellow/30 p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl" role="img" aria-label="Shield">🛡️</span>
                <h2 className="text-2xl font-bold text-brand-black">1. 100% Session 1 Money-Back Guarantee</h2>
              </div>
              <p className="mb-3 text-brand-black font-semibold">
                We believe in the transformative experience of our cohorts. If your child attends Session 1 and does not love building their project, you are entitled to a 100% full refund with zero questions asked.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-brand-black/90">
                <li>
                  <strong>Eligibility:</strong> Simply notify us within 24 hours of the completion of Session 1 via email (<code>outreach@soyl.cloud</code>) or WhatsApp (<code>+91 7022509965</code>).
                </li>
                <li>
                  <strong>Keep the Hardware Kit:</strong> You do NOT need to return the delivered ESP32-C3 hardware kit. It remains yours to keep as our gift to encourage your child&apos;s continued curiosity.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">2. Cancellation Prior to Cohort Start</h2>
              <p className="mb-3">
                If you need to cancel your enrollment before the cohort start date:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>More than 48 hours before Day 1:</strong> You will receive a 100% full refund.
                </li>
                <li>
                  <strong>Alternative Rescheduling:</strong> You may also elect to transfer your enrollment and hardware kit to any upcoming cohort date at no additional fee.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">3. Refund Processing & Timelines</h2>
              <p className="mb-3">
                Once a refund request is received and verified:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>Processing Window:</strong> Refunds are initiated through our payment processor (Razorpay) within 24–48 business hours.
                </li>
                <li>
                  <strong>Credit to Original Payment Source:</strong> The credited amount will reflect in your bank account, credit card, or UPI account within <strong>5 to 7 working days</strong>, depending on your issuing bank&apos;s settlement schedule.
                </li>
                <li>
                  <strong>Confirmation:</strong> An automated confirmation email and Razorpay refund reference ID will be sent to the parent email address provided during enrollment.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">4. Mid-Cohort Cancellations</h2>
              <p className="mb-3">
                Because seats in live mentor cohorts are strictly capped at 20 students to guarantee 1:1 project guidance:
              </p>
              <p className="text-sm">
                Cancellations requested after the 24-hour window following Session 1 are non-refundable. However, in cases of medical emergency or unavoidable schedule conflicts, we will gladly defer the student&apos;s seat to the next cohort round without extra charge.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">5. How to Initiate a Cancellation or Refund</h2>
              <p className="mb-4">
                To request a refund, simply reach out to our admissions team with your student&apos;s name and enrollment email:
              </p>
              <div className="p-4 bg-brand-cream rounded-xl border border-brand-black/20 space-y-2 text-sm">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:outreach@soyl.cloud" className="text-brand-blue font-bold underline underline-offset-4">
                    outreach@soyl.cloud
                  </a>
                </p>
                <p>
                  <strong>WhatsApp Helpline:</strong>{' '}
                  <a
                    href="https://wa.me/917022509965"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue font-bold underline underline-offset-4"
                  >
                    +91 7022509965
                  </a>
                </p>
                <p>
                  <strong>Entity:</strong> SOYL AI Private Limited, Begakuru 560043, India
                </p>
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t-2 border-brand-black/20 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="text-sm font-bold text-brand-blue hover:text-brand-black underline underline-offset-4"
            >
              ← Back to SOYL Academy Home
            </Link>
            <div className="flex gap-4">
              <Link
                href="/shipping-policy"
                className="text-sm font-bold text-brand-black/70 hover:text-brand-black underline underline-offset-4"
              >
                Shipping Policy →
              </Link>
              <Link
                href="/terms"
                className="text-sm font-bold text-brand-black/70 hover:text-brand-black underline underline-offset-4"
              >
                Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

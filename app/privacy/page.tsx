import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/privacy',
  title: 'Privacy & Cookie Policy | SOYL Academy',
  description: 'Privacy Policy and Cookie Notice of SOYL Academy (SOYL AI Private Limited) under India DPDP Act and GDPR.',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black pt-32 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block bg-brand-yellow px-3 py-1 rounded border border-brand-black mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-black">
                Legal & Compliance Notice
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-brand-black">
              Privacy & Cookie Policy
            </h1>
            <p className="text-sm font-bold text-brand-black/60">
              Last updated: October 2026 • Compliant with India DPDP Act 2023 & GDPR
            </p>
          </div>

          {/* Legal Content */}
          <div className="space-y-10 text-brand-black/85 leading-relaxed font-medium">
            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">1. Who We Are</h2>
              <p className="mb-3">
                SOYL Academy is operated by <strong>SOYL AI Private Limited</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), having its registered office at <strong>Begakuru 560043</strong>, India.
              </p>
              <p>
                If you have questions regarding this Privacy Policy or your personal data, you can contact our Data Protection Team at{' '}
                <a href="mailto:outreach@soyl.cloud" className="text-brand-blue font-bold underline underline-offset-4">
                  outreach@soyl.cloud
                </a>.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">2. Data We Collect</h2>
              <p className="mb-4">
                We only collect data necessary to provide education services, process cohort enrollment, and deliver physical hardware kits:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Parent & Student Contact Information:</strong> Parent name, student name, email address, phone number, and student grade (Grades 7 to 12).</li>
                <li><strong>Shipping & Delivery Details:</strong> Physical address provided for doorstep shipping of the ESP32-C3 hardware kit.</li>
                <li><strong>Payment Information:</strong> Transactions are securely processed through Razorpay. We do not store credit card, debit card, or UPI credentials on our servers.</li>
                <li><strong>Educational Submissions:</strong> Prototype source code, capstone project pitch materials, and feedback provided during the Future Builders program.</li>
              </ul>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">3. Cookie & Tracking Policy</h2>
              <p className="mb-4">
                We respect your digital privacy and adhere to the principle of data minimization:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-brand-cream rounded-xl border border-brand-black/20">
                  <h3 className="font-bold text-lg text-brand-black mb-1">Strictly Necessary Cookies</h3>
                  <p className="text-sm text-brand-black/75">
                    Essential for site security, session state, checkout integrity, and navigation. These cannot be disabled.
                  </p>
                </div>
                <div className="p-4 bg-brand-cream rounded-xl border border-brand-black/20">
                  <h3 className="font-bold text-lg text-brand-black mb-1">Analytics & Performance</h3>
                  <p className="text-sm text-brand-black/75">
                    We use privacy-first, cookie-free aggregated telemetry (such as Vercel Web Analytics) to understand page performance without tracking individual personal identities across other websites.
                  </p>
                </div>
                <div className="p-4 bg-brand-cream rounded-xl border border-brand-black/20">
                  <h3 className="font-bold text-lg text-brand-black mb-1">Functional & Preference Storage</h3>
                  <p className="text-sm text-brand-black/75">
                    Browser storage used to remember your coupon codes (e.g. <code>BUILDER10</code>) and popup dismissal state so you are not interrupted repeatedly.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">4. Protection of Student Data (Grades 7–12)</h2>
              <p className="mb-3">
                Because our cohorts serve students in Grades 7 through 12, all registrations must be submitted or authorized by a parent or legal guardian.
              </p>
              <p>
                We do not sell student data, build commercial profiling databases, or target students with behavioral advertising.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">5. Your Legal Rights</h2>
              <p className="mb-4">
                Under the <strong>Digital Personal Data Protection Act, 2023 (India)</strong> and the <strong>GDPR</strong>, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Access a summary of the personal data we hold about you or your child.</li>
                <li>Request correction of inaccurate or incomplete personal data.</li>
                <li>Request erasure and deletion of your personal data (&quot;Right to be Forgotten&quot;).</li>
                <li>Withdraw consent at any time without affecting past processing legality.</li>
              </ul>
              <p>
                To exercise any of these rights, please email us at{' '}
                <a href="mailto:outreach@soyl.cloud" className="text-brand-blue font-bold underline underline-offset-4">
                  outreach@soyl.cloud
                </a>.
              </p>
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
            <Link
              href="/terms"
              className="text-sm font-bold text-brand-black/70 hover:text-brand-black underline underline-offset-4"
            >
              View Terms of Service →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

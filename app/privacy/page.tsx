import { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/privacy',
  title: 'Privacy & Cookie Policy | SOYL Academy',
  description: 'Privacy Policy and Cookie Notice of SOYL Academy (SOYL AI Private Limited) under India DPDP Act and GDPR.',
});

export default function PrivacyPage() {
  return (
    <div className="section-tight">
      <div className="page">
        <div className="max-w-3xl lg:ml-[16.666%]">
          {/* Header */}
          <div className="mb-12">
            <div className="t-label mb-5 flex items-center gap-2.5 text-muted before:h-px before:w-5 before:bg-red-pen before:content-['']">
              <span >
                Legal & Compliance Notice
              </span>
            </div>
            <h1 className="t-headline mb-4">
              Privacy & Cookie Policy
            </h1>
            <p className="t-small text-muted">
              Last updated: October 2026 • Compliant with India DPDP Act 2023 & GDPR
            </p>
          </div>

          {/* Legal Content */}
          <div className="border-t border-rule text-ink">
            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">1. Who We Are</h2>
              <p className="mb-3">
                SOYL Academy is operated by <strong>SOYL AI Private Limited</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), having its registered office at <strong>Bengaluru 560043</strong>, India.
              </p>
              <p>
                If you have questions regarding this Privacy Policy or your personal data, you can contact our Data Protection Team at{' '}
                <a href="mailto:outreach@soyl.cloud" className="link font-medium">
                  outreach@soyl.cloud
                </a>.
              </p>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">2. Data We Collect</h2>
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

            <section id="cookies" className="scroll-mt-20 border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">3. Cookie & Tracking Policy</h2>
              <p className="mb-4">
                We respect your digital privacy and adhere to the principle of data minimization:
              </p>
              <div className="space-y-4">
                <div className="border border-rule bg-white p-4">
                  <h3 className="font-semibold mb-1">Strictly Necessary Cookies</h3>
                  <p className="t-small text-muted">
                    Essential for site security, session state, checkout integrity, and navigation. These cannot be disabled.
                  </p>
                </div>
                <div className="border border-rule bg-white p-4">
                  <h3 className="font-semibold mb-1">Analytics & Performance</h3>
                  <p className="t-small text-muted">
                    We use privacy-first, cookie-free aggregated telemetry (such as Vercel Web Analytics) to understand page performance without tracking individual personal identities across other websites.
                  </p>
                </div>
                <div className="border border-rule bg-white p-4">
                  <h3 className="font-semibold mb-1">Functional & Preference Storage</h3>
                  <p className="t-small text-muted">
                    Browser storage used to remember your coupon codes (e.g. <code>BUILDER10</code>) and popup dismissal state so you are not interrupted repeatedly.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">4. Protection of Student Data (Grades 7–12)</h2>
              <p className="mb-3">
                Because our cohorts serve students in Grades 7 through 12, all registrations must be submitted or authorized by a parent or legal guardian.
              </p>
              <p>
                We do not sell student data, build commercial profiling databases, or target students with behavioral advertising.
              </p>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">5. Third-Party Service Providers</h2>
              <p className="mb-4">
                We only share personal data with trusted sub-processors strictly necessary to deliver our educational services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>Payment Aggregator:</strong> Razorpay Software Private Limited (PCI-DSS Level 1 compliant tokenized payment processing).</li>
                <li><strong>Logistics Partners:</strong> Delhivery, BlueDart, DTDC, and India Post for doorstep delivery of hardware kits.</li>
                <li><strong>Infrastructure & Telemetry:</strong> Vercel Inc. for secure global hosting and privacy-friendly web analytics.</li>
                <li><strong>Direct Communication:</strong> WhatsApp/Meta for student cohort announcements and support.</li>
              </ul>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">6. Your Legal Rights</h2>
              <p className="mb-4">
                Under the <strong>Digital Personal Data Protection Act, 2023 (India)</strong> and the <strong>GDPR</strong>, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
                <li>Access a summary of the personal data we hold about you or your child.</li>
                <li>Request correction of inaccurate or incomplete personal data.</li>
                <li>Request erasure and deletion of your personal data (&quot;Right to be Forgotten&quot;).</li>
                <li>Withdraw consent at any time without affecting past processing legality.</li>
                <li>Nominate another individual to exercise rights in case of death or incapacity (under DPDP Act).</li>
              </ul>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">7. Grievance Redressal & Contact Officer</h2>
              <p className="mb-4 text-sm">
                In accordance with the Information Technology Act 2000 and the Digital Personal Data Protection Act 2023, the details of our Grievance Officer are provided below:
              </p>
              <div className="border border-rule bg-white p-4 text-sm space-y-2">
                <p><strong>Entity:</strong> SOYL AI Private Limited</p>
                <p><strong>Designation:</strong> Data Protection & Grievance Redressal Officer</p>
                <p><strong>Registered Address:</strong> Bengaluru 560043, Karnataka, India</p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:outreach@soyl.cloud" className="link font-medium">
                    outreach@soyl.cloud
                  </a>
                </p>
                <p>
                  <strong>WhatsApp Helpline:</strong>{' '}
                  <a href="https://wa.me/917022509965" className="link font-medium">
                    +91 7022509965
                  </a>
                </p>
                <p className="t-small text-muted">
                  Grievances are acknowledged within 24 hours and addressed within 15 working days.
                </p>
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-rule flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="t-small link font-medium"
            >
              ← Back to SOYL Academy Home
            </Link>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/terms"
                className="t-small text-muted underline underline-offset-4 hover:text-ink"
              >
                Terms of Service →
              </Link>
              <Link
                href="/refund-policy"
                className="t-small text-muted underline underline-offset-4 hover:text-ink"
              >
                Refund Policy →
              </Link>
              <Link
                href="/shipping-policy"
                className="t-small text-muted underline underline-offset-4 hover:text-ink"
              >
                Shipping Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

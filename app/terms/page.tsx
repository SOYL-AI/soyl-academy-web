import { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/terms',
  title: 'Terms of Service | SOYL Academy',
  description: 'Terms of Service and Enrollment Conditions for SOYL Academy and the Future Builders Programme.',
});

export default function TermsPage() {
  return (
    <div className="section-tight">
      <div className="page">
        <div className="max-w-3xl lg:ml-[16.666%]">
          {/* Header */}
          <div className="mb-12">
            <div className="t-label mb-5 flex items-center gap-2.5 text-muted before:h-px before:w-5 before:bg-red-pen before:content-['']">
              <span >
                Terms & Conditions
              </span>
            </div>
            <h1 className="t-headline mb-4">
              Terms of Service
            </h1>
            <p className="t-small text-muted">
              Last updated: October 2026 • SOYL AI Private Limited
            </p>
          </div>

          {/* Terms Content */}
          <div className="border-t border-rule text-ink">
            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">1. Agreement to Terms</h2>
              <p>
                By enrolling in any program offered by <strong>SOYL Academy</strong> (operated by <strong>SOYL AI Private Limited</strong>, Bengaluru 560043, India) or accessing our websites, you agree to these Terms of Service.
              </p>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">2. Program Enrollment & Eligibility</h2>
              <p className="mb-3">
                The Future Builders Programme is designed for students in <strong>Grades 7 through 12</strong>. Because participants are minors, enrollment must be executed by a parent or legal guardian who accepts financial and supervisory responsibility.
              </p>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">3. Hardware Kit Delivery</h2>
              <p className="mb-3">
                Enrollment in the Future Builders cohort includes a personal physical ESP32-C3 hardware kit shipped directly to the address provided during registration.
              </p>
              <p>
                Please ensure accurate delivery addresses. We are not responsible for delays caused by postal disruptions or incorrect shipping inputs.
              </p>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">4. Session 1 Money-Back Guarantee</h2>
              <p className="mb-3">
                We maintain a <strong>100% Session 1 Money-Back Guarantee</strong>. Have your student attend the first weekend of live classes. If they do not wish to continue, notify our team via email (<a href="mailto:outreach@soyl.cloud" className="link">outreach@soyl.cloud</a>) or WhatsApp within 24 hours of Session 1 to receive a 100% full refund.
              </p>
              <p>
                The delivered physical ESP32-C3 hardware kit remains yours to keep.
              </p>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">5. Intellectual Property & Project Ownership</h2>
              <p className="mb-3">
                <strong>Student Project Ownership:</strong> Students own 100% of the intellectual property, source code, and design prototypes created during the cohort.
              </p>
              <p>
                <strong>Course Materials:</strong> All curriculum documents, worksheets, slides, and proprietary pedagogical materials provided by SOYL Academy remain the intellectual property of SOYL AI Private Limited.
              </p>
            </section>

            <section className="border-b border-rule py-8">
              <h2 className="t-subtitle mb-3">6. Governing Law & Contact</h2>
              <p className="mb-3">
                These terms are governed by the laws of India. For questions or notices, contact us at:
              </p>
              <p className="text-sm">
                <strong>SOYL AI Private Limited</strong><br />
                Address: Bengaluru 560043, India<br />
                Email:{' '}
                <a href="mailto:outreach@soyl.cloud" className="link font-medium">
                  outreach@soyl.cloud
                </a>
              </p>
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
                href="/privacy"
                className="t-small text-muted underline underline-offset-4 hover:text-ink"
              >
                Privacy Policy →
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

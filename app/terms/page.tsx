import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/terms',
  title: 'Terms of Service | SOYL Academy',
  description: 'Terms of Service and Enrollment Conditions for SOYL Academy and the Future Builders Programme.',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black pt-32 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block bg-brand-yellow px-3 py-1 rounded border border-brand-black mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-black">
                Terms & Conditions
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-brand-black">
              Terms of Service
            </h1>
            <p className="text-sm font-bold text-brand-black/60">
              Last updated: October 2026 • SOYL AI Private Limited
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-10 text-brand-black/85 leading-relaxed font-medium">
            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">1. Agreement to Terms</h2>
              <p>
                By enrolling in any program offered by <strong>SOYL Academy</strong> (operated by <strong>SOYL AI Private Limited</strong>, Begakuru 560043, India) or accessing our websites, you agree to these Terms of Service.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">2. Program Enrollment & Eligibility</h2>
              <p className="mb-3">
                The Future Builders Programme is designed for students in <strong>Grades 7 through 12</strong>. Because participants are minors, enrollment must be executed by a parent or legal guardian who accepts financial and supervisory responsibility.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">3. Hardware Kit Delivery</h2>
              <p className="mb-3">
                Enrollment in the Future Builders cohort includes a personal physical ESP32-C3 hardware kit shipped directly to the address provided during registration.
              </p>
              <p>
                Please ensure accurate delivery addresses. We are not responsible for delays caused by postal disruptions or incorrect shipping inputs.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">4. Session 1 Money-Back Guarantee</h2>
              <p className="mb-3">
                We maintain a <strong>100% Session 1 Money-Back Guarantee</strong>. Have your student attend the first weekend of live classes. If they do not wish to continue, notify our team via email (<a href="mailto:outreach@soyl.cloud" className="text-brand-blue underline">outreach@soyl.cloud</a>) or WhatsApp within 24 hours of Session 1 to receive a 100% full refund.
              </p>
              <p>
                The delivered physical ESP32-C3 hardware kit remains yours to keep.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">5. Intellectual Property & Project Ownership</h2>
              <p className="mb-3">
                <strong>Student Project Ownership:</strong> Students own 100% of the intellectual property, source code, and design prototypes created during the cohort.
              </p>
              <p>
                <strong>Course Materials:</strong> All curriculum documents, worksheets, slides, and proprietary pedagogical materials provided by SOYL Academy remain the intellectual property of SOYL AI Private Limited.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">6. Governing Law & Contact</h2>
              <p className="mb-3">
                These terms are governed by the laws of India. For questions or notices, contact us at:
              </p>
              <p className="text-sm">
                <strong>SOYL AI Private Limited</strong><br />
                Address: Begakuru 560043, India<br />
                Email:{' '}
                <a href="mailto:outreach@soyl.cloud" className="text-brand-blue font-bold underline">
                  outreach@soyl.cloud
                </a>
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
              href="/privacy"
              className="text-sm font-bold text-brand-black/70 hover:text-brand-black underline underline-offset-4"
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

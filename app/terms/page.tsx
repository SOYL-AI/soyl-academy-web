import { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/terms',
  title: 'Terms of Service',
  description: 'Terms of Service and Enrollment Conditions for SOYL Academy and the Future Builders Programme.',
});

// Ink and wash (phase 5): restyled with components/legal/LegalPage. The terms are unchanged.
export default function TermsPage() {
  return (
    <LegalPage
      label="Terms & Conditions"
      title="Terms of Service"
      updated="Last updated: October 2026 • SOYL AI Private Limited"
      links={[
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/refund-policy', label: 'Refund Policy' },
        { href: '/shipping-policy', label: 'Shipping Policy' },
      ]}
    >
      <LegalSection>
        <h2>1. Agreement to Terms</h2>
        <p>
          By enrolling in any program offered by <strong>SOYL Academy</strong> (operated by <strong>SOYL AI Private Limited</strong>, Bengaluru 560043, India) or accessing our websites, you agree to these Terms of Service.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>2. Program Enrollment & Eligibility</h2>
        <p>
          The Future Builders Programme is designed for students in <strong>Grades 7 through 12</strong>. Because participants are minors, enrollment must be executed by a parent or legal guardian who accepts financial and supervisory responsibility.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>3. Hardware Kit Delivery</h2>
        <p>
          Enrollment in the Future Builders cohort includes a personal physical ESP32-C3 hardware kit shipped directly to the address provided during registration.
        </p>
        <p>
          Please ensure accurate delivery addresses. We are not responsible for delays caused by postal disruptions or incorrect shipping inputs.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>4. Session 1 Money-Back Guarantee</h2>
        <p>
          We maintain a <strong>100% Session 1 Money-Back Guarantee</strong>. Have your student attend Session 1, the first live class. If they do not wish to continue, notify our team via email (<a href="mailto:outreach@soyl.cloud" className="link">outreach@soyl.cloud</a>) or WhatsApp within 24 hours of Session 1 to receive a 100% full refund.
        </p>
        <p>
          The delivered physical ESP32-C3 hardware kit remains yours to keep.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>5. Intellectual Property & Project Ownership</h2>
        <p>
          <strong>Student Project Ownership:</strong> Students own 100% of the intellectual property, source code, and design prototypes created during the cohort.
        </p>
        <p>
          <strong>Course Materials:</strong> All curriculum documents, worksheets, slides, and proprietary pedagogical materials provided by SOYL Academy remain the intellectual property of SOYL AI Private Limited.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>6. Governing Law & Contact</h2>
        <p>
          These terms are governed by the laws of India. For questions or notices, contact us at:
        </p>
        <p>
          <strong>SOYL AI Private Limited</strong><br />
          Address: Bengaluru 560043, India<br />
          Email:{' '}
          <a href="mailto:outreach@soyl.cloud" className="link font-medium">
            outreach@soyl.cloud
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}

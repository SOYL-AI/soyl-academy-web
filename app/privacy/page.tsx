import { Metadata } from 'next';
import { LegalNote, LegalPage, LegalSection, legalQuiet } from '@/components/legal/LegalPage';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/privacy',
  title: 'Privacy & Cookie Policy',
  description: 'Privacy Policy and Cookie Notice of SOYL Academy (SOYL AI Private Limited) under India DPDP Act and GDPR.',
});

// Ink and wash (phase 5): restyled with components/legal/LegalPage. The policy text is unchanged.
export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal & Compliance Notice"
      title="Privacy & Cookie Policy"
      updated="Last updated: October 2026 • Compliant with India DPDP Act 2023 & GDPR"
      links={[
        { href: '/terms', label: 'Terms of Service' },
        { href: '/refund-policy', label: 'Refund Policy' },
        { href: '/shipping-policy', label: 'Shipping Policy' },
      ]}
    >
      <LegalSection>
        <h2>1. Who We Are</h2>
        <p>
          SOYL Academy is operated by <strong>SOYL AI Private Limited</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), having its registered office at <strong>Bengaluru 560043</strong>, India.
        </p>
        <p>
          If you have questions regarding this Privacy Policy or your personal data, you can contact our Data Protection Team at{' '}
          <a href="mailto:outreach@soyl.cloud" className="link font-medium">
            outreach@soyl.cloud
          </a>.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>2. Data We Collect</h2>
        <p>
          We only collect data necessary to provide education services, process cohort enrollment, and deliver physical hardware kits:
        </p>
        <ul>
          <li><strong>Parent & Student Contact Information:</strong> Parent name, student name, email address, phone number, and student grade (Grades 7 to 12).</li>
          <li><strong>Shipping & Delivery Details:</strong> Physical address provided for doorstep shipping of the ESP32-C3 hardware kit.</li>
          <li><strong>Payment Information:</strong> Transactions are securely processed through Razorpay. We do not store credit card, debit card, or UPI credentials on our servers.</li>
          <li><strong>Educational Submissions:</strong> Prototype source code, capstone project pitch materials, and feedback provided during the Future Builders program.</li>
        </ul>
      </LegalSection>

      <LegalSection id="cookies">
        <h2>3. Cookie & Tracking Policy</h2>
        <p>
          We respect your digital privacy and adhere to the principle of data minimization:
        </p>
        <div className="mt-5">
          <LegalNote>
            <h3>Strictly Necessary Cookies</h3>
            <p className={legalQuiet}>
              Essential for site security, session state, checkout integrity, and navigation. These cannot be disabled.
            </p>
          </LegalNote>
          <LegalNote>
            <h3>Analytics & Performance</h3>
            <p className={legalQuiet}>
              We use privacy-first, cookie-free aggregated telemetry (such as Vercel Web Analytics) to understand page performance without tracking individual personal identities across other websites.
            </p>
          </LegalNote>
          <LegalNote>
            <h3>Functional & Preference Storage</h3>
            <p className={legalQuiet}>
              Browser storage used to remember your coupon codes (e.g. <code>FRIEND500</code>) and popup dismissal state so you are not interrupted repeatedly.
            </p>
          </LegalNote>
        </div>
      </LegalSection>

      <LegalSection>
        <h2>4. Protection of Student Data (Grades 7–12)</h2>
        <p>
          Because our cohorts serve students in Grades 7 through 12, all registrations must be submitted or authorized by a parent or legal guardian.
        </p>
        <p>
          We do not sell student data, build commercial profiling databases, or target students with behavioral advertising.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>5. Third-Party Service Providers</h2>
        <p>
          We only share personal data with trusted sub-processors strictly necessary to deliver our educational services:
        </p>
        <ul>
          <li><strong>Payment Aggregator:</strong> Razorpay Software Private Limited (PCI-DSS Level 1 compliant tokenized payment processing).</li>
          <li><strong>Logistics Partners:</strong> Delhivery, BlueDart, DTDC, and India Post for doorstep delivery of hardware kits.</li>
          <li><strong>Infrastructure & Telemetry:</strong> Vercel Inc. for secure global hosting and privacy-friendly web analytics.</li>
          <li><strong>Registration Records:</strong> Future Builders registrations, payment confirmations and enquiries are stored on SOYL&apos;s platform, hosted on Microsoft Azure in India.</li>
          <li><strong>Direct Communication:</strong> WhatsApp/Meta for student cohort announcements and support.</li>
        </ul>
      </LegalSection>

      <LegalSection>
        <h2>6. Your Legal Rights</h2>
        <p>
          Under the <strong>Digital Personal Data Protection Act, 2023 (India)</strong> and the <strong>GDPR</strong>, you have the right to:
        </p>
        <ul>
          <li>Access a summary of the personal data we hold about you or your child.</li>
          <li>Request correction of inaccurate or incomplete personal data.</li>
          <li>Request erasure and deletion of your personal data (&quot;Right to be Forgotten&quot;).</li>
          <li>Withdraw consent at any time without affecting past processing legality.</li>
          <li>Nominate another individual to exercise rights in case of death or incapacity (under DPDP Act).</li>
        </ul>
      </LegalSection>

      <LegalSection>
        <h2>7. Grievance Redressal & Contact Officer</h2>
        <p>
          In accordance with the Information Technology Act 2000 and the Digital Personal Data Protection Act 2023, the details of our Grievance Officer are provided below:
        </p>
        <LegalNote className="mt-5 space-y-1.5">
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
          <p className={legalQuiet}>
            Grievances are acknowledged within 24 hours and addressed within 15 working days.
          </p>
        </LegalNote>
      </LegalSection>
    </LegalPage>
  );
}

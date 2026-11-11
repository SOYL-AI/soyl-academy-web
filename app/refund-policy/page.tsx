import { Metadata } from 'next';
import { Dab } from '@/components/ink/Dab';
import { LegalNote, LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/refund-policy',
  title: 'Cancellation & Refund Policy',
  description: 'Official cancellation and refund policy of SOYL Academy, including our 100% Session 1 Money-Back Guarantee.',
});

// Ink and wash (phase 5): restyled with components/legal/LegalPage. The policy text is unchanged; the shield
// emoji beside the guarantee is now a painted turmeric dab (decorative).
export default function RefundPolicyPage() {
  return (
    <LegalPage
      label="Fair & Transparent Policies"
      title="Cancellation & Refund Policy"
      updated="Last updated: October 2026 • SOYL AI Private Limited (Bengaluru 560043)"
      links={[
        { href: '/shipping-policy', label: 'Shipping Policy' },
        { href: '/terms', label: 'Terms of Service' },
      ]}
    >
      {/* Highlight: Money-back Guarantee */}
      <LegalSection highlight>
        <div className="flex items-start gap-3">
          <Dab pigment="turmeric" className="text-[2rem]" />
          <h2>1. 100% Session 1 Money-Back Guarantee</h2>
        </div>
        <p className="font-semibold">
          We believe in the transformative experience of our cohorts. If your child attends Session 1 and does not love building their project, you are entitled to a 100% full refund with zero questions asked.
        </p>
        <ul>
          <li>
            <strong>Eligibility:</strong> Simply notify us within 24 hours of the completion of Session 1 via email (<code>outreach@soyl.cloud</code>) or WhatsApp (<code>+91 7022509965</code>).
          </li>
          <li>
            <strong>Keep the Hardware Kit:</strong> You do NOT need to return the delivered ESP32-C3 hardware kit. It remains yours to keep as our gift to encourage your child&apos;s continued curiosity.
          </li>
        </ul>
      </LegalSection>

      <LegalSection>
        <h2>2. Cancellation Prior to Cohort Start</h2>
        <p>
          If you need to cancel your enrollment before the cohort start date:
        </p>
        <ul>
          <li>
            <strong>More than 48 hours before Day 1:</strong> You will receive a 100% full refund.
          </li>
          <li>
            <strong>Alternative Rescheduling:</strong> You may also elect to transfer your enrollment and hardware kit to any upcoming cohort date at no additional fee.
          </li>
        </ul>
      </LegalSection>

      <LegalSection>
        <h2>3. Refund Processing & Timelines</h2>
        <p>
          Once a refund request is received and verified:
        </p>
        <ul>
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
      </LegalSection>

      <LegalSection>
        <h2>4. Mid-Cohort Cancellations</h2>
        <p>
          Because places in our live, mentor-led camps are planned and prepared in advance:
        </p>
        <p>
          Cancellations requested after the 24-hour window following Session 1 are non-refundable. However, in cases of medical emergency or unavoidable schedule conflicts, we will gladly defer the student&apos;s seat to the next cohort round without extra charge.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>5. How to Initiate a Cancellation or Refund</h2>
        <p>
          To request a refund, simply reach out to our admissions team with your student&apos;s name and enrollment email:
        </p>
        <LegalNote className="mt-5 space-y-1.5">
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:outreach@soyl.cloud" className="link font-medium">
              outreach@soyl.cloud
            </a>
          </p>
          <p>
            <strong>WhatsApp Helpline:</strong>{' '}
            <a
              href="https://wa.me/917022509965"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-medium"
            >
              +91 7022509965
            </a>
          </p>
          <p>
            <strong>Entity:</strong> SOYL AI Private Limited, Bengaluru 560043, India
          </p>
        </LegalNote>
      </LegalSection>
    </LegalPage>
  );
}

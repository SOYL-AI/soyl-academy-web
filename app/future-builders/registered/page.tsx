import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { RegistrationHeadline, RegistrationReceipt } from '@/components/future-builders/RegistrationDetails';
import { CAMP, FRIEND_CODE, FRIEND_DISCOUNT, WHATSAPP_DISPLAY, whatsappLink, whatsappShareLink } from '@/content/future-builders';
import { SITE_URL } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  path: '/future-builders/registered',
  title: 'Registration confirmed — Future Builders',
  description: 'Your Future Builders registration is confirmed. Your receipt and next steps are in your email.',
  noIndex: true,
});

const HELP_URL = whatsappLink('Hi, I have just registered for the Future Builders summer camp and have a question.');

/**
 * Where the form lands after /api/razorpay/verify has confirmed the payment and the platform has
 * recorded it (and emailed the parent). Calm and factual: receipt, email, what happens next, help.
 * Not indexed, not in the sitemap.
 */
export default function RegisteredPage() {
  const months = CAMP?.months ?? 'the summer';
  const steps: [string, string][] = [
    ['Check your inbox', 'Your confirmation and receipt are in the email we just sent (or the spam folder).'],
    ['Dates and timetable', `The camp runs in ${months}. We send the exact dates and timetable well before it starts.`],
    ['Your hardware kit', 'We ask for your address before the camp and ship the kit free in India. It’s your child’s to keep.'],
    ['Orientation', 'Before the first class, you and your child meet the instructors and set up the tools together.'],
  ];

  return (
    <section className="section" aria-labelledby="registered-heading">
      <div className="page grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <Label className="mb-6">Future Builders · Registration confirmed</Label>
          <h1 id="registered-heading" className="t-headline max-w-[16ch]">
            <RegistrationHeadline />
          </h1>
          <p className="t-lead mt-6 max-w-[48ch] text-graphite">
            Thank you. Your payment is confirmed and your place in the {CAMP?.name ?? 'summer camp'} is recorded. Nothing more to do today.
          </p>

          <ol className="mt-10 border-t-2 border-ink">
            {steps.map(([title, line], i) => (
              <li key={title} className="flex gap-5 border-b border-ink/15 py-5">
                <span className="t-num font-serif text-[1.75rem] italic leading-none text-vermilion-ink">{i + 1}</span>
                <div>
                  <h2 className="t-subtitle">{title}</h2>
                  <p className="mt-1 max-w-[56ch] text-graphite">{line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="col-span-12 lg:col-span-5 lg:pl-6" aria-label="Your registration">
          <div className="leaf tape tilt-r p-6 md:p-8" style={{ '--tape': 'var(--color-sap)' } as React.CSSProperties}>
            <p className="t-label inline-flex items-center gap-2 text-success">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="9" cy="9" r="9" fill="currentColor" />
                <path d="M5.2 9.3l2.4 2.4 5-5.2" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Payment received
            </p>
            <p className="t-title mt-4">Confirmation sent</p>
            <RegistrationReceipt />
            <p className="t-small mt-5 text-graphite">
              Keep the receipt number for any question about your registration. The refund terms are on the{' '}
              <Link href="/refund-policy" className="link">
                refund policy
              </Link>{' '}
              page.
            </p>
          </div>

          <div className="sketch-soft mt-8 bg-sheet-deep p-6">
            <h2 className="t-label font-semibold text-ink">Need help?</h2>
            <p className="t-small mt-2 text-ink">
              Message us on WhatsApp at {WHATSAPP_DISPLAY} (9am–9pm) with your receipt number, and we’ll sort it out.
            </p>
            <a href={HELP_URL} target="_blank" rel="noopener noreferrer" className="arrow-link t-small mt-3">
              WhatsApp us <ArrowRight />
            </a>
          </div>

          <div className="leaf mt-6 p-6">
            <h2 className="t-label font-semibold text-ink">Know a family who’d enjoy this?</h2>
            <p className="t-small mt-2 text-graphite">
              Share code <strong className="text-ink">{FRIEND_CODE}</strong>: they save ₹{FRIEND_DISCOUNT} when they register with your child’s name, and we send you ₹{FRIEND_DISCOUNT} back.
            </p>
            <a
              href={whatsappShareLink(`My child has joined the Future Builders summer camp by SOYL Academy (software, AI, IoT and entrepreneurship, Grades 7–12). Use code ${FRIEND_CODE} to save ₹${FRIEND_DISCOUNT}: ${SITE_URL}/future-builders?coupon=${FRIEND_CODE}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link t-small mt-3"
            >
              Share on WhatsApp <ArrowRight />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

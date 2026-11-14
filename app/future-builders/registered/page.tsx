import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { BrushArt } from '@/components/brush/BrushArt';
import { PALETTE } from '@/components/brush/palette';
import { Dab, Note, type Ink } from '@/components/brush/marks';
import { Kinetic } from '@/components/story/Kinetic';
import { RegistrationHeadline, RegistrationReceipt } from '@/components/future-builders/RegistrationDetails';
import { CAMP, FRIEND_CODE, FRIEND_DISCOUNT, WHATSAPP_DISPLAY, whatsappLink, whatsappShareLink } from '@/content/future-builders';
import { images } from '@/content/images';
import { SITE_URL } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  path: '/future-builders/registered',
  title: 'Registration confirmed — Future Builders',
  description: 'Your Future Builders registration is confirmed. Your receipt and next steps are in your email.',
  noIndex: true,
});

const HELP_URL = whatsappLink('Hi, I have just registered for the Future Builders summer camp and have a question.');
const STEP_INK: Ink[] = ['ultramarine', 'vermilion', 'ochre', 'sap'];

/**
 * Where the form lands after /api/razorpay/verify has confirmed the payment and the platform has
 * recorded it (and emailed the parent). A warm "welcome to the cohort" (ADR-034), then the facts:
 * receipt, email, what happens next, help. Not indexed, not in the sitemap.
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
    <>
      {/* Welcome: a wash of colour, the headline, two prints */}
      <section className="relative isolate overflow-hidden" aria-labelledby="registered-heading">
        <BrushArt
          art="wash"
          options={{
            blooms: [
              { x: 0.92, y: 0.2, r: 0.42, pigment: 'ochre', opacity: 70 },
              { x: 0.08, y: 0.95, r: 0.36, pigment: 'sap', opacity: 40 },
              { x: 0.7, y: 0.9, r: 0.22, pigment: 'vermilion', opacity: 45 },
            ],
          }}
          seed={21}
          stepMs={70}
          eager
          bg={PALETTE.sheet}
          className="absolute inset-0 -z-10"
        />
        <div className="page grid-12 items-center gap-y-10 pb-14 pt-12 md:pb-20 md:pt-20">
          <div className="col-span-12 lg:col-span-7">
            <div className="rise">
              <Label className="mb-6">Future Builders · Registration confirmed</Label>
            </div>
            <p className="hand rise text-[1.5rem] text-vermilion-ink md:text-[1.8rem]" style={{ '--d': '80ms' } as React.CSSProperties}>
              Welcome to the cohort.
            </p>
            <h1 id="registered-heading" className="t-display rise mt-2 max-w-[14ch]" style={{ '--d': '160ms' } as React.CSSProperties}>
              <RegistrationHeadline />
            </h1>
            <Kinetic
              className="t-lead mt-6 max-w-[48ch] text-graphite"
              delay={400}
              load
              text={`Thank you. Your payment is confirmed and your place in the ${CAMP?.name ?? 'summer camp'} is recorded. Nothing more to do today.`}
            />
          </div>
          <div aria-hidden="true" className="relative col-span-12 hidden h-[340px] lg:col-span-5 lg:block">
            <div className="absolute right-0 top-0 w-[78%] rotate-[3deg] bg-white p-2 pb-3 shadow-[0_26px_50px_-30px_rgba(31,28,25,0.6)]">
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Image src={images.groupOnGrass.src} alt="" fill sizes="340px" className="object-cover" />
              </span>
              <span className="hand block px-1 pt-2 text-right text-[1.1rem] text-graphite">Your team: 3–4 builders.</span>
            </div>
            <div className="absolute bottom-0 left-0 w-[52%] -rotate-[5deg] bg-white p-1.5 pb-2 shadow-[0_22px_44px_-26px_rgba(31,28,25,0.6)]">
              <span className="relative block aspect-square overflow-hidden">
                <Image src={images.handsBreadboard.src} alt="" fill sizes="220px" className="object-cover" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-10 md:pt-14" aria-label="What happens next and your receipt">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="hand text-[1.4rem] text-graphite">From here to the first class</h2>
            <ol className="relative mt-6">
              {/* The path from today to the first class */}
              <span aria-hidden="true" className="absolute bottom-8 left-[0.95rem] top-3 w-0 border-l-2 border-dashed border-ink/25" />
              {steps.map(([title, line], i) => (
                <li key={title} className="relative flex gap-5 pb-8 last:pb-0" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                  <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sheet">
                    <Dab ink={STEP_INK[i]} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="t-subtitle">
                      <span className="t-num mr-2 font-serif italic text-vermilion-ink">{i + 1}</span>
                      {title}
                    </h3>
                    <p className="mt-1 max-w-[56ch] text-graphite">{line}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-[1.2rem]">
              <Note ink="graphite" tilt={-1.5}>
                Parents are invited to Demo Day.
              </Note>
            </p>
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
    </>
  );
}

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FutureBuildersMobileEnroll } from '@/components/marketing/FutureBuildersMobileEnroll';
import { createMetadata } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/StructuredData';
import { faqNode, graph, webPageNode } from '@/lib/seo/schema';
import { futureBuildersFaqs } from '@/content/future-builders-faqs';
import { RegistrationCountdown, SeatCounter } from '@/components/marketing/FutureBuildersUrgency';
import {
  CLASSES_START_DATE,
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  ORIENTATION_DATE,
  REGISTRATION_CLOSES,
  SCHEDULE,
  SEATS_TOTAL,
  STATUS_BADGE,
  VALUE_LINE,
  whatsappLink,
  whatsappShareLink,
} from '@/content/future-builders';
import { SITE_URL } from '@/lib/seo/config';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { FutureBuildersForm } from '@/components/forms/FutureBuildersForm';
import { DrawnUnderline } from '@/components/motion/DrawnUnderline';
import { FutureBuildersCurriculum } from '@/components/sections/FutureBuildersCurriculum';
import { FutureBuildersPortfolioValue } from '@/components/sections/FutureBuildersPortfolioValue';
import { FutureBuildersFaq } from '@/components/sections/FutureBuildersFaq';
import { FutureBuildersWhatsAppButton, FutureBuildersWhatsAppInlineBanner } from '@/components/marketing/FutureBuildersWhatsAppButton';

export const metadata: Metadata = createMetadata({ path: '/future-builders', title: 'Future Builders Programme | SOYL Academy', description: 'Join the Future Builders 12-week online cohort for Grades 7 to 12. Students build real working prototypes across Software, AI, IoT, and Entrepreneurship.', keywords: ['online coding classes for kids', 'robotics for students', 'AI course for teenagers', 'IoT programming for grades 7 to 12', 'entrepreneurship for kids', 'Future Builders SOYL'] });

export default function FutureBuildersPage() {
  return (
    <div className="bg-brand-cream text-brand-black min-h-screen pt-32 pb-28 md:py-32 overflow-x-hidden">
      <StructuredData data={[graph(webPageNode({ path: '/future-builders' }), faqNode('/future-builders', futureBuildersFaqs)), { "@context": "https://schema.org", "@type": "Course", "name": "Future Builders Programme", "description": "A 12-week builder's workshop for Grades 7 to 12. Learn software development, AI, IoT robotics, and entrepreneurship.", "provider": { "@type": "Organization", "name": "SOYL Academy", "sameAs": "https://soylai.com" }, "educationalCredentialAwarded": "Certificate of Completion", "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseSchedule": { "@type": "Schedule", "repeatFrequency": "P1W", "byDay": ["https://schema.org/Saturday", "https://schema.org/Sunday"] }, "startDate": "2026-10-20", "endDate": "2027-01-12", "offers": { "@type": "Offer", "price": "5499", "priceCurrency": "INR", "category": "Paid" } } }]} />

      <Container>
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="inline-block bg-brand-yellow px-4 py-2 mb-4 border-2 border-brand-black shadow-[4px_4px_0_0_#141414] rounded-xl">
                <p className="font-bold tracking-widest uppercase text-brand-black text-sm">{STATUS_BADGE}</p>
              </div>
              <p className="font-bold text-brand-black/70 mb-8">Live online &bull; Grades 7 to 12 &bull; Only {SEATS_TOTAL} seats</p>
              <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-bold tracking-tight mb-8 leading-[1.05]">
                Build a<br />
                <span className="relative inline-block whitespace-nowrap">
                  real product.
                  <DrawnUnderline className="absolute -bottom-[0.1em] left-0 h-[0.14em] w-full text-brand-blue" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-black/80 max-w-2xl leading-relaxed mb-10">
                12 weekends. 75 contact hours. One working prototype.<br /> 
                A hands-on workshop covering Software, AI, IoT, and Entrepreneurship.
              </p>
              <div className="mb-8 flex flex-col gap-4 rounded-2xl border-2 border-brand-black bg-white p-5 shadow-[4px_4px_0_0_#141414] max-w-xl">
                <SeatCounter />
                <RegistrationCountdown className="text-brand-black" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <Link href="#enroll" className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-brand-black bg-brand-yellow px-7 py-3 text-lg font-bold shadow-[4px_4px_0_0_#141414] hover:bg-brand-black hover:text-brand-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
                  Enroll now — ₹5,499
                </Link>
                <a href={whatsappLink('Hi, I have a question about Future Builders')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-brand-black bg-[#25D366] px-6 py-3 text-lg font-bold text-white shadow-[4px_4px_0_0_#141414] hover:bg-[#20ba59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
                  Ask on WhatsApp
                </a>
              </div>
              <p className="font-bold mb-3 max-w-lg">{VALUE_LINE}</p>
              <p className="text-sm leading-relaxed mb-8 max-w-lg">
                Hardware kit included, yours to keep. Full refund if requested within 24 hours of Session 1.{' '}
                <Link href="/refund-policy" className="font-bold underline underline-offset-4">Read refund conditions</Link>.
              </p>
              <div className="flex flex-wrap gap-6 md:gap-10 border-t-2 border-brand-black/10 pt-8">
                <div>
                  <p className="text-4xl font-bold">12</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50 mt-1">Weeks</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-brand-blue">{CLASSES_START_DATE}</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50 mt-1">Classes from</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-brand-red">₹5499</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50 mt-1">Includes Kit</p>
                </div>
              </div>
              <p className="mt-6 text-sm font-bold text-brand-black/70">
                Orientation {ORIENTATION_DATE} &bull; Classes from {CLASSES_START_DATE} &bull; Registration closes {REGISTRATION_CLOSES}
              </p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5 relative">
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[4/5] w-full border-4 border-brand-black shadow-[16px_16px_0_0_#141414] overflow-hidden rounded-2xl bg-brand-black/5 rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="/images/future-builders/iot_wiring.jpg" 
                  alt="Student wiring an IoT circuit" 
                  fill 
                  className="object-cover"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-brand-blue text-brand-cream p-4 border-2 border-brand-black rounded-2xl shadow-[6px_6px_0_0_#141414] animate-bounce" style={{ animationDuration: '3s' }}>
                <p className="font-bold text-lg">ESP32-C3 Kit</p>
              </div>
              <div className="absolute top-12 -right-8 bg-brand-yellow text-brand-black p-4 border-2 border-brand-black rounded-2xl shadow-[6px_6px_0_0_#141414] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <p className="font-bold text-lg">No prior coding!</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <section aria-labelledby="schedule-heading" className="mb-20">
          <h2 id="schedule-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Dates &amp; class times.</h2>
          <p className="text-lg text-brand-black/70 mb-8 max-w-2xl">Live on video every weekend, built around school. Every session is recorded, so a missed class never means falling behind.</p>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { date: ORIENTATION_DATE, label: 'Orientation', note: 'Meet the instructors, set up tools, see the plan for 12 weeks.', tone: 'bg-white' },
              { date: REGISTRATION_CLOSES, label: 'Registration closes', note: `Or earlier, once all ${SEATS_TOTAL} seats are taken.`, tone: 'bg-brand-yellow' },
              { date: CLASSES_START_DATE, label: 'Classes begin', note: 'Week 1: logic and first Python programs.', tone: 'bg-white' },
              { date: 'Week 12', label: 'Demo Day', note: 'Teams present their working prototypes to parents and guests.', tone: 'bg-white' },
            ].map((step) => (
              <li key={step.label} className={`${step.tone} border-2 border-brand-black rounded-2xl p-5 shadow-[4px_4px_0_0_#141414]`}>
                <p className="text-3xl font-bold mb-1">{step.date}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-3">{step.label}</p>
                <p className="text-brand-black/80 leading-relaxed">{step.note}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-2 border-brand-black rounded-2xl p-5 bg-brand-blue text-brand-cream shadow-[4px_4px_0_0_#141414]">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-cream/70 mb-2">Every weekend</p>
              <p className="text-2xl font-bold">{SCHEDULE.days}</p>
              <p className="text-brand-cream/80 mt-1">{SCHEDULE.hours}</p>
            </div>
            <div className="border-2 border-brand-black rounded-2xl p-5 bg-white shadow-[4px_4px_0_0_#141414]">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50 mb-2">Total</p>
              <p className="text-2xl font-bold">12 weeks · 75 contact hours</p>
              <p className="text-brand-black/70 mt-1">Exact session timings confirmed at orientation.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="programme-details" className="mb-20 border-y-2 border-brand-black/10 py-10 sm:py-14">
          <h2 id="programme-details" className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">The programme at a glance.</h2>
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {[
              ['Live online learning', `12 weeks and 75 contact hours, live on ${SCHEDULE.days}. Recordings are available if a student misses a class.`],
              ['Beginners welcome', 'For Grades 7–12. No prior coding experience required; students start with basic logic before progressing to software, AI, and hardware.'],
              ['Build with a team', 'Teams of 3–4 build a working prototype and present their final product on Demo Day.'],
              ['Your hardware kit', 'The personal ESP32-C3 kit is sent around week 3 or 4 of the programme and is yours to keep.'],
              ['What the fee covers', `₹5,499 covers the 12-week programme and hardware kit, with free shipping across India. ${VALUE_LINE.split(' · ')[0]}.`],
              ['Try the first session', 'Attend Session 1. If it is not the right fit, request a full refund within 24 hours of Session 1. You can keep the kit.'],
            ].map(([title, description]) => (
              <div key={title} className="border-t border-brand-black/15 py-5">
                <dt className="font-bold text-lg mb-2">{title}</dt>
                <dd className="text-brand-black/80 leading-relaxed max-w-prose">{description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-brand-black/80">Questions about the timetable or what your child needs?{' '}
            <a href={whatsappLink('Hi, could you share the Future Builders timetable and equipment requirements?')} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-blue underline underline-offset-4">Ask an instructor before enrolling</a>.
          </p>
        </section>

        {/* Interactive Curriculum Section */}
        <FutureBuildersCurriculum />

        {/* College & Portfolio Ready Value Proposition (Grades 10-12) */}
        <FutureBuildersPortfolioValue />

        {/* Bring-a-friend offer */}
        <section aria-labelledby="friend-offer" className="mb-24 grid gap-6 lg:grid-cols-12 items-center border-2 border-brand-black rounded-2xl bg-brand-yellow p-6 sm:p-10 shadow-[8px_8px_0_0_#141414]">
          <div className="lg:col-span-8">
            <p className="text-sm font-bold uppercase tracking-widest mb-3">Bring a friend · build as a team</p>
            <h2 id="friend-offer" className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">You both save ₹{FRIEND_DISCOUNT}.</h2>
            <p className="text-lg leading-relaxed max-w-2xl">
              Projects are built in teams of 3–4, so it&apos;s better with a friend. Enrol together, or get referred by someone already in, and use code{' '}
              <strong className="font-mono bg-brand-black text-brand-cream px-2 py-0.5 rounded">{FRIEND_CODE}</strong> at checkout. Your friend gets ₹{FRIEND_DISCOUNT} too: off their fee, or refunded if they&apos;ve already paid.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href={`/future-builders?coupon=${FRIEND_CODE}#enroll`} className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-brand-black bg-brand-black px-6 py-3 text-lg font-bold text-brand-cream hover:bg-brand-blue">
              Enrol with {FRIEND_CODE}
            </Link>
            <a href={whatsappShareLink(`Check out Future Builders by SOYL Academy: a 12-week online course for Grades 7–12 (software, AI, IoT, with a hardware kit). Use code ${FRIEND_CODE} and we both save ₹${FRIEND_DISCOUNT}: ${SITE_URL}/future-builders?coupon=${FRIEND_CODE}`)}target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-brand-black bg-white px-6 py-3 text-lg font-bold hover:bg-brand-cream">
              Share with a friend on WhatsApp
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <FutureBuildersFaq />

        {/* Registration Section */}
        <div id="enroll" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Secure your spot for October.</h2>
                <p className="text-xl text-brand-black/70 leading-relaxed mb-6">
                  Only {SEATS_TOTAL} students per cohort, so every project gets individual instructor attention. Teams of 3–4 build and pitch their final product.
                </p>
                <div className="mb-8 flex flex-col gap-3">
                  <SeatCounter />
                  <RegistrationCountdown />
                </div>
                <div className="space-y-6 border-y-2 border-brand-black/10 py-8 mb-8">
                  <div className="flex justify-between items-center gap-4 text-lg">
                    <span className="font-bold text-brand-black/60">Orientation</span>
                    <span className="font-bold text-brand-black text-right">{ORIENTATION_DATE}, 2026</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 text-lg">
                    <span className="font-bold text-brand-black/60">Classes from</span>
                    <span className="font-bold text-brand-black text-right">{CLASSES_START_DATE}, 2026</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 text-lg">
                    <span className="font-bold text-brand-black/60">Class times</span>
                    <span className="font-bold text-brand-black text-right">{SCHEDULE.short}</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 text-lg">
                    <span className="font-bold text-brand-black/60">Registration closes</span>
                    <span className="font-bold text-brand-red text-right">{REGISTRATION_CLOSES}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-brand-black/60">Hardware Kit</span>
                    <span className="font-bold text-brand-black">Yours to keep</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-brand-black/60">Format</span>
                    <span className="font-bold text-brand-black">Online Live Weekends</span>
                  </div>
                </div>
                <div className="bg-brand-blue p-8 text-brand-cream border-2 border-brand-black shadow-[8px_8px_0_0_#141414] rounded-2xl hover:-translate-y-2 transition-transform duration-300 mb-6">
                  <h4 className="font-bold text-2xl mb-3">ESP32 Hardware Kit</h4>
                  <p className="text-brand-cream/80 text-lg">Every student receives a personal ₹700 value physical kit: ESP32-C3 microcontroller, breadboard, sensors (temperature, light, distance), LEDs, and a servo motor.</p>
                </div>

                {/* Session 1 Money-Back Guarantee Card */}
                <div className="bg-brand-yellow/30 border-2 border-brand-black shadow-[6px_6px_0_0_#141414] rounded-2xl p-6 sm:p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🛡️</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-black">
                      100% Risk-Free Policy
                    </span>
                  </div>
                  <h4 className="font-bold text-xl text-brand-black mb-2">
                    Session 1 Money-Back Guarantee
                  </h4>
                  <p className="text-sm text-brand-black/80 font-medium leading-relaxed">
                    Attend the first weekend. If your child doesn&apos;t love building their first project, get a 100% full refund, no questions asked. The hardware kit is yours to keep.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <FutureBuildersForm />
              </ScrollReveal>
            </div>
          </div>

          {/* Inline WhatsApp Doubts Banner */}
          <ScrollReveal delay={0.15}>
            <FutureBuildersWhatsAppInlineBanner />
          </ScrollReveal>
        </div>

      </Container>

      {/* Floating WhatsApp Chat Button */}
      <FutureBuildersMobileEnroll />
      <FutureBuildersWhatsAppButton />
    </div>
  );
}



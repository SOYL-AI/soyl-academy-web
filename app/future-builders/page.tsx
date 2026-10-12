import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FutureBuildersMobileEnroll } from '@/components/marketing/FutureBuildersMobileEnroll';
import { createMetadata } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/StructuredData';
import { graph, webPageNode } from '@/lib/seo/schema';
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
      <StructuredData data={[graph(webPageNode({ path: '/future-builders' })), { "@context": "https://schema.org", "@type": "Course", "name": "Future Builders Programme", "description": "A 12-week builder's workshop for Grades 7 to 12. Learn software development, AI, IoT robotics, and entrepreneurship.", "provider": { "@type": "Organization", "name": "SOYL Academy", "sameAs": "https://soylai.com" }, "educationalCredentialAwarded": "Certificate of Completion", "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "startDate": "2026-10-20", "endDate": "2027-01-12", "offers": { "@type": "Offer", "price": "5499", "priceCurrency": "INR", "category": "Paid" } } }]} />

      <Container>
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="inline-block bg-brand-yellow px-4 py-2 mb-8 border-2 border-brand-black shadow-[4px_4px_0_0_#141414] rounded-xl">
                <p className="font-bold tracking-widest uppercase text-brand-black text-sm">Online Cohort &bull; Grades 7 to 12</p>
              </div>
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
              <div className="flex flex-col items-start gap-4 mb-5">
                <Link href="#enroll" className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-brand-black bg-brand-yellow px-7 py-3 text-lg font-bold shadow-[4px_4px_0_0_#141414] hover:bg-brand-black hover:text-brand-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
                  Enroll now — ₹5,499
                </Link>
                <a href="https://wa.me/917022509965?text=Hi%2C%20I%20have%20a%20question%20about%20Future%20Builders" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-blue underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
                  Ask an instructor on WhatsApp
                </a>
              </div>
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
                  <p className="text-4xl font-bold text-brand-blue">Oct 20</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50 mt-1">Starts</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-brand-red">₹5499</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50 mt-1">Includes Kit</p>
                </div>
              </div>
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

        <section aria-labelledby="programme-details" className="mb-20 border-y-2 border-brand-black/10 py-10 sm:py-14">
          <h2 id="programme-details" className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">The programme at a glance.</h2>
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {[
              ['Live online learning', '12 weeks and 75 contact hours, with live weekend sessions. Recordings are available if a student misses a class.'],
              ['Beginners welcome', 'For Grades 7–12. No prior coding experience required; students start with basic logic before progressing to software, AI, and hardware.'],
              ['Build with a team', 'Teams of 3–4 build a working prototype and present their final product on Demo Day.'],
              ['Your hardware kit', 'The personal ESP32-C3 kit is sent around week 3 or 4 of the programme and is yours to keep.'],
              ['What the fee covers', '₹5,499 covers the 12-week programme and hardware kit, with free shipping across India.'],
              ['Try the first session', 'Attend Session 1. If it is not the right fit, request a full refund within 24 hours of Session 1. You can keep the kit.'],
            ].map(([title, description]) => (
              <div key={title} className="border-t border-brand-black/15 py-5">
                <dt className="font-bold text-lg mb-2">{title}</dt>
                <dd className="text-brand-black/80 leading-relaxed max-w-prose">{description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-brand-black/80">Questions about the timetable or what your child needs?{' '}
            <a href="https://wa.me/917022509965?text=Hi%2C%20could%20you%20share%20the%20Future%20Builders%20timetable%20and%20equipment%20requirements%3F" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-blue underline underline-offset-4">Ask an instructor before enrolling</a>.
          </p>
        </section>

        {/* Interactive Curriculum Section */}
        <FutureBuildersCurriculum />

        {/* College & Portfolio Ready Value Proposition (Grades 10-12) */}
        <FutureBuildersPortfolioValue />

        {/* FAQ Section */}
        <FutureBuildersFaq />

        {/* Registration Section */}
        <div id="enroll" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">Secure your spot for October.</h2>
                <p className="text-xl text-brand-black/70 leading-relaxed mb-8">
                  Cohorts are strictly limited to ensure individual instructor attention. Teams of 3-4 will build and pitch their final product.
                </p>
                <div className="space-y-6 border-y-2 border-brand-black/10 py-8 mb-8">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-brand-black/60">Starts on</span>
                    <span className="font-bold text-brand-black">Oct 20, 2026</span>
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



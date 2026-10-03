import { Metadata } from 'next';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/seo/config';

import { createMetadata } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/StructuredData';
import { graph, webPageNode } from '@/lib/seo/schema';
import { getPage } from '@/lib/seo/pages';

export const metadata: Metadata = createMetadata({ path: '/future-builders' });

export default function FutureBuildersPage() {
  return (
    <>
      <style>{`
        /* Hide global Header and Footer */
        header, footer { display: none !important; }
        
        /* Force body background */
        body { background-color: #F7F5EF !important; color: #141414 !important; }
        
        /* Custom highlight block */
        .highlight-yellow {
          background-color: #F4C93E;
          padding: 0 0.15em;
          margin: 0 -0.1em;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          display: inline-block;
          line-height: 1;
        }

        .eyebrow-blue {
          color: #2F3E9E;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          display: block;
        }

        .cta-btn {
          background-color: #141414;
          color: #F7F5EF;
          font-weight: 600;
          padding: 1rem 2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background-color 0.2s, transform 0.2s;
        }
        
        .cta-btn:hover {
          background-color: #2F3E9E;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Header - Custom for this page */}
      <StructuredData data={graph(webPageNode(getPage('/future-builders')))} />
      <div className="w-full px-5 py-6 flex justify-between items-center border-b border-[#141414]/10 bg-[#F7F5EF]">
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-3 h-3 bg-white border border-[#141414]" />
            <div className="w-3 h-3 bg-[#F4C93E] border border-[#141414]" />
            <div className="w-3 h-3 bg-[#B4392E] border border-[#141414]" />
            <div className="w-3 h-3 bg-[#2F3E9E] border border-[#141414]" />
          </div>
          <span className="font-bold border border-[#141414] px-2 py-0.5 text-sm uppercase tracking-wide">
            {SITE_NAME}
          </span>
        </div>
      </div>

      <main className="bg-[#F7F5EF]">
        
        {/* 1. Hero */}
        <section className="px-5 pt-12 pb-16 md:pt-20 md:pb-24 max-w-4xl mx-auto text-center border-b border-[#141414]/10">
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6 text-[#141414]">
            Your child will build something <span className="highlight-yellow">real.</span><br className="hidden md:block"/> And pitch it.
          </h1>
          <p className="text-lg md:text-xl text-[#141414]/80 mb-10 max-w-2xl mx-auto">
            The Future Builders Programme teaches students to think, build, and explain their ideas in the age of AI.
          </p>
          <a href="#enroll-form" className="cta-btn text-lg">
            Enroll Now
          </a>
          <div className="mt-16 w-full aspect-video relative overflow-hidden bg-[#EFE9DA]">
            <Image 
              src="/images/future-builders/hero_presentation.jpg" 
              alt="Indian middle-school student presenting an electronics board to classmates in a classroom" 
              fill 
              className="object-cover" 
              priority
            />
          </div>
        </section>

        {/* 2. Why this matters now */}
        <section className="px-5 py-16 md:py-24 max-w-3xl mx-auto border-b border-[#141414]/10">
          <span className="eyebrow-blue">The Shift</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Anyone can get an answer from AI now. The real test is whether a child can <span className="highlight-yellow">build, explain, and defend</span> an idea.
          </h2>
          <p className="text-lg text-[#141414]/80">
            We are moving past the era where submitting a correct worksheet was enough. Future Builders is a 12-week intensive that replaces passive consumption with active creation.
          </p>
        </section>

        {/* 3. What your child walks away with */}
        <section className="px-5 py-16 md:py-24 max-w-5xl mx-auto border-b border-[#141414]/10">
          <span className="eyebrow-blue">Outcomes</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What they walk away with</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#141414]/10 bg-white">
              <div className="text-4xl font-bold text-[#141414] mb-2">01</div>
              <h3 className="text-xl font-bold mb-3">A Working Product</h3>
              <p className="text-[#141414]/70 text-sm">Not a theoretical essay. A functioning hardware or software prototype that solves a real problem they care about.</p>
            </div>
            <div className="p-8 border border-[#141414]/10 bg-white">
              <div className="text-4xl font-bold text-[#141414] mb-2">02</div>
              <h3 className="text-xl font-bold mb-3">Personal Electronics Kit</h3>
              <p className="text-[#141414]/70 text-sm">Every child receives an ESP32 microcontroller, sensors, and breadboard to keep and continue building at home.</p>
            </div>
            <div className="p-8 border border-[#141414]/10 bg-white">
              <div className="text-4xl font-bold text-[#141414] mb-2">03</div>
              <h3 className="text-xl font-bold mb-3">A Live Pitch</h3>
              <p className="text-[#141414]/70 text-sm">The ability to stand in front of an audience, explain their technical decisions, and defend their methodology.</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a href="#enroll-form" className="cta-btn">Enroll Now</a>
          </div>
        </section>

        {/* 4. Who's running this */}
        <section className="px-5 py-16 md:py-24 max-w-5xl mx-auto border-b border-[#141414]/10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow-blue">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Expert instruction, real credibility.</h2>
              <p className="text-lg text-[#141414]/80 mb-6">
                Future Builders is designed and led by the founders of SOYL Academy, bringing years of NGO teaching history and over 35+ successful technical workshops to the classroom.
              </p>
              <div className="flex bg-white border border-[#141414]/10 divide-x divide-[#141414]/10">
                <div className="p-6 flex-1">
                  <div className="text-3xl font-bold mb-1">35+</div>
                  <div className="text-xs text-[#141414]/60 uppercase tracking-wide">Workshops Run</div>
                </div>
                <div className="p-6 flex-1">
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-xs text-[#141414]/60 uppercase tracking-wide">Project Completion</div>
                </div>
              </div>
            </div>
            <div className="w-full aspect-[4/3] relative bg-[#EFE9DA]">
              <Image 
                src="/images/future-builders/cohort_group.jpg" 
                alt="Cohort of Indian students and instructors after a workshop" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 5. A Saturday at SOYL */}
        <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto border-b border-[#141414]/10">
          <span className="eyebrow-blue">How It Runs</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">A Saturday at SOYL</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12 items-start">
            <div className="w-full aspect-square relative bg-[#EFE9DA]">
              <Image 
                src="/images/future-builders/saturday_workshop.jpg" 
                alt="Instructor pointing at laptop screen while student wires a breadboard" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-[#2F3E9E]">01</span>
                <div>
                  <h4 className="font-bold mb-1">Opening Challenge</h4>
                  <p className="text-sm text-[#141414]/80">A new problem is introduced. No immediate answers are given.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-[#2F3E9E]">02</span>
                <div>
                  <h4 className="font-bold mb-1">Concept Demo</h4>
                  <p className="text-sm text-[#141414]/80">A 15-minute primer on the technical tool needed for the day.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-[#2F3E9E]">03</span>
                <div>
                  <h4 className="font-bold mb-1">Guided Build</h4>
                  <p className="text-sm text-[#141414]/80">Students get their hands dirty, connecting wires and writing code.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-[#2F3E9E]">04</span>
                <div>
                  <h4 className="font-bold mb-1">Team Challenge</h4>
                  <p className="text-sm text-[#141414]/80">Applying the morning's concept to a novel, unexpected problem.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl font-bold text-[#2F3E9E]">05</span>
                <div>
                  <h4 className="font-bold mb-1">Reflect</h4>
                  <p className="text-sm text-[#141414]/80">Documenting failures and explaining what they learned.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. The 12-week build journey */}
        <section className="px-5 py-16 md:py-24 max-w-5xl mx-auto border-b border-[#141414]/10">
          <span className="eyebrow-blue">The Programme</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">The 12-Week Build Journey</h2>
          
          <div className="space-y-24">
            {/* Stage 1 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 relative aspect-[4/3] bg-[#EFE9DA]">
                <Image src="/images/future-builders/software_coding.jpg" alt="Students writing code" fill className="object-cover" />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4">Commanding the Computer</h3>
                <p className="mb-6 text-[#141414]/80">Students learn that software isn't magic. They write logic, break things, and fix errors.</p>
                <div className="bg-[#EFE9DA] p-5 text-sm">
                  <strong className="block mb-1">Used for:</strong>
                  Building the foundational logic needed to control hardware later in the programme.
                </div>
              </div>
            </div>
            
            {/* Stage 2 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] bg-[#EFE9DA]">
                <Image src="/images/future-builders/ai_classifier.jpg" alt="Student training an AI classifier" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Demystifying AI</h3>
                <p className="mb-6 text-[#141414]/80">Instead of consuming AI, they train it. They build simple vision classifiers and see how bias enters the system.</p>
                <div className="bg-[#EFE9DA] p-5 text-sm">
                  <strong className="block mb-1">Used for:</strong>
                  Understanding what AI actually is—math and data, not magic.
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 relative aspect-[4/3] bg-[#EFE9DA]">
                <Image src="/images/future-builders/iot_wiring.jpg" alt="Hands wiring an ESP32" fill className="object-cover" />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4">Bridging Digital and Physical</h3>
                <p className="mb-6 text-[#141414]/80">Sensors, microcontrollers, and LEDs. They make a computer reach out and touch the real world.</p>
                <div className="bg-[#EFE9DA] p-5 text-sm">
                  <strong className="block mb-1">Used for:</strong>
                  Their final project hardware stack (ESP32 and basic circuits).
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] bg-[#EFE9DA]">
                <Image src="/images/future-builders/entrepreneurship_pitch.jpg" alt="Student presenting project" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">The Pitch</h3>
                <p className="mb-6 text-[#141414]/80">A great build is useless if you can't explain it. They learn to frame a problem, present a solution, and defend it.</p>
                <div className="bg-[#EFE9DA] p-5 text-sm">
                  <strong className="block mb-1">Used for:</strong>
                  Demo Day, and every presentation they will ever give.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <a href="#enroll-form" className="cta-btn">Enroll Now</a>
          </div>
        </section>

        {/* 7. Safety & what you'll see (Dark Section) */}
        <section className="px-5 py-16 md:py-24 bg-[#2F3E9E] text-white border-b border-[#141414]/10">
          <div className="max-w-5xl mx-auto">
            <span className="text-white/60 text-sm font-semibold tracking-wide uppercase mb-6 display-block">Visibility & Outcomes</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">You'll see what they build.</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-xl mb-2">Safe, Low-Voltage Hardware</h4>
                  <p className="text-white/80">All electronics operate on safe, 5-volt USB power. No soldering is required—everything uses breadboards.</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Weekly Evidence</h4>
                  <p className="text-white/80">Every week, you receive a link to a digital portfolio showing exactly what your child built that Saturday.</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Demo Day</h4>
                  <p className="text-white/80">The 12th week is Demo Day. You and the school principal are invited to watch them pitch their final prototype live.</p>
                </div>
              </div>
              <div className="w-full aspect-[4/3] relative bg-[#141414]">
                <Image 
                  src="/images/future-builders/demo_day.jpg" 
                  alt="Students presenting at Demo Day to parents and teachers" 
                  fill 
                  className="object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8. What other parents say */}
        <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto border-b border-[#141414]/10">
          <span className="eyebrow-blue">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What parents say</h2>
          
          {/* TODO: Content gap: placeholder text until real pilot-cohort quotes are supplied */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-[#141414]/10">
              <p className="text-lg italic mb-6">"My daughter used to just consume YouTube all weekend. Now she's actually building things with her hands. The change in her confidence is remarkable."</p>
              <div className="font-bold">— Placeholder Parent Quote</div>
              <div className="text-sm text-[#141414]/60">Grade 7 Parent</div>
            </div>
            <div className="p-8 bg-white border border-[#141414]/10">
              <p className="text-lg italic mb-6">"I finally understand how things work inside my phone. When I presented my project on Demo Day, even the principal was asking me technical questions!"</p>
              <div className="font-bold">— Placeholder Student Quote</div>
              <div className="text-sm text-[#141414]/60">Grade 8 Student</div>
            </div>
          </div>
        </section>

        {/* 9. Enroll Form (Destination) */}
        <section id="enroll-form" className="px-5 py-16 md:py-24 max-w-2xl mx-auto text-center border-b border-[#141414]/10 scroll-mt-10">
          <span className="eyebrow-blue">Reserve a Seat</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your child's school has brought Future Builders to their grade.</h2>
          <p className="text-lg text-[#141414]/80 mb-4">
            Cohorts are strictly limited to 24–30 students to ensure individual instructor attention. 
          </p>
          <p className="text-[#141414]/60 text-sm mb-10">
            Clicking Enroll Now will take you to the school's official registration portal.
          </p>
          
          <button className="cta-btn w-full text-lg justify-center py-4">
            Enroll Now
          </button>
        </section>

        {/* 10. FAQ */}
        <section className="px-5 py-16 md:py-24 max-w-3xl mx-auto border-b border-[#141414]/10">
          <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-[#141414]/10 bg-white open:bg-[#F7F5EF] transition-colors">
              <summary className="font-bold text-lg p-5 cursor-pointer list-none flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-[#2F3E9E]">
                What if my child misses a Saturday?
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-5 pt-0 text-[#141414]/80">
                They will have access to the weekly digital catch-up guide, and instructors arrive early the following week to help students who need to wire their boards to match the cohort.
              </div>
            </details>
            <details className="group border border-[#141414]/10 bg-white open:bg-[#F7F5EF] transition-colors">
              <summary className="font-bold text-lg p-5 cursor-pointer list-none flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-[#2F3E9E]">
                Do we keep the hardware kit?
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-5 pt-0 text-[#141414]/80">
                Yes. The microcontroller, breadboard, and initial sensors are yours to keep so your child can continue experimenting after the programme ends.
              </div>
            </details>
            <details className="group border border-[#141414]/10 bg-white open:bg-[#F7F5EF] transition-colors">
              <summary className="font-bold text-lg p-5 cursor-pointer list-none flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-[#2F3E9E]">
                What if my child isn't technical yet?
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-5 pt-0 text-[#141414]/80">
                The programme uses a dual-track model. The <strong>Explorer Track</strong> focuses on understanding concepts and presenting them, while the <strong>Builder Track</strong> dives deep into code. Students naturally gravitate to the level that challenges them appropriately.
              </div>
            </details>
            <details className="group border border-[#141414]/10 bg-white open:bg-[#F7F5EF] transition-colors">
              <summary className="font-bold text-lg p-5 cursor-pointer list-none flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-[#2F3E9E]">
                What is the withdrawal process?
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-5 pt-0 text-[#141414]/80">
                If your child feels the programme isn't for them after the first session, you can withdraw for a full refund (minus the cost of the hardware kit if it has been opened).
              </div>
            </details>
          </div>
        </section>

      </main>

      {/* 11. Final CTA + contact (Footer Band) */}
      <div className="bg-[#141414] text-[#F7F5EF] px-5 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start?</h2>
            <a href="#enroll-form" className="cta-btn !bg-white !text-[#141414] hover:!bg-[#F4C93E]">
              Enroll Now
            </a>
          </div>
          <div className="md:text-right">
            <div className="font-bold text-xl mb-2">SOYL Academy</div>
            <p className="text-white/70 text-sm mb-4">hello@soylacademy.com<br/>Bengaluru, India</p>
            <p className="italic text-white/50 text-sm">Story Of Your Life</p>
          </div>
        </div>
      </div>
    </>
  );
}

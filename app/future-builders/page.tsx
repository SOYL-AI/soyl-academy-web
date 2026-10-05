import { Metadata } from 'next';
import Image from 'next/image';
import { createMetadata } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/StructuredData';
import { graph, webPageNode } from '@/lib/seo/schema';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { FutureBuildersForm } from '@/components/forms/FutureBuildersForm';
import { DrawnUnderline } from '@/components/motion/DrawnUnderline';
import { FutureBuildersCurriculum } from '@/components/sections/FutureBuildersCurriculum';
import { FutureBuildersFaq } from '@/components/sections/FutureBuildersFaq';

export const metadata: Metadata = createMetadata({ 
  path: '/future-builders',
  title: 'Future Builders Programme',
  description: 'A 12-week builder\'s workshop for Grades 7 to 10. Software, AI, IoT and Entrepreneurship.',
});

export default function FutureBuildersPage() {
  return (
    <div className="bg-brand-cream text-brand-black min-h-screen pt-32 pb-16 md:py-32 overflow-x-hidden">
      <StructuredData
        data={graph(
          webPageNode({ path: '/future-builders' })
        )}
      />

      <Container>
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="inline-block bg-brand-yellow px-4 py-2 mb-8 border-2 border-brand-black shadow-[4px_4px_0_0_#141414] rounded-xl">
                <p className="font-bold tracking-widest uppercase text-brand-black text-sm">Online Cohort ?" Grades 7 to 10</p>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
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

        {/* Interactive Curriculum Section */}
        <FutureBuildersCurriculum />

        <FutureBuildersFaq />`n`n        {/* Registration Section */}
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
                <div className="bg-brand-blue p-8 text-brand-cream border-2 border-brand-black shadow-[8px_8px_0_0_#141414] rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                  <h4 className="font-bold text-2xl mb-3">ESP32 Hardware Kit</h4>
                  <p className="text-brand-cream/80 text-lg">Every student receives a personal ₹700 value physical kit: ESP32-C3 microcontroller, breadboard, sensors (temperature, light, distance), LEDs, and a servo motor.</p>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <FutureBuildersForm />
              </ScrollReveal>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}

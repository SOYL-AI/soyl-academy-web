import { Metadata } from 'next';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/StructuredData';
import { graph, webPageNode } from '@/lib/seo/schema';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { FutureBuildersForm } from '@/components/forms/FutureBuildersForm';
import { DrawnUnderline } from '@/components/motion/DrawnUnderline';

export const metadata: Metadata = createMetadata({ 
  path: '/future-builders',
  title: 'Future Builders Programme',
  description: 'A 12-week builder\'s workshop for Grades 6 to 9. Software, AI, IoT and Entrepreneurship.',
});

export default function FutureBuildersPage() {
  return (
    <div className="bg-brand-cream text-brand-black min-h-screen pt-32 pb-16 md:py-32">
      <StructuredData
        data={graph(
          webPageNode({ path: '/future-builders' })
        )}
      />

      <Container>
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-48">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="inline-block bg-brand-yellow px-4 py-2 mb-8 border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
                <p className="font-bold tracking-widest uppercase text-brand-black text-sm">Online Cohort ?" Grades 6 to 9</p>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
                The Future<br />
                <span className="relative inline-block whitespace-nowrap">
                  Builders
                  <DrawnUnderline className="absolute -bottom-[0.1em] left-0 h-[0.14em] w-full text-brand-blue" />
                </span> Programme.
              </h1>
              <p className="text-xl md:text-2xl text-brand-black/80 max-w-2xl leading-relaxed mb-10">
                A 12-week builder's workshop covering software development, artificial intelligence, IoT robotics, and entrepreneurship. Ending in one working product built by your child.
              </p>
              <div className="flex flex-wrap gap-4 md:gap-8 border-t-2 border-brand-black/10 pt-8">
                <div>
                  <p className="text-3xl font-bold">12 Weeks</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50">Duration</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-brand-blue">Oct 20th</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50">Cohort Starts</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-brand-red">4 Builds</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-black/50">Shipped</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[4/5] w-full border-2 border-brand-black shadow-[12px_12px_0_0_#141414] overflow-hidden rounded-sm bg-brand-black/5">
                <Image 
                  src="/images/future-builders/iot_wiring.jpg" 
                  alt="Student wiring an IoT circuit" 
                  fill 
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* What we teach / Curriculum */}
        <div className="mb-24 md:mb-48 border-t-2 border-brand-black/10 pt-16 md:pt-32">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-16 max-w-2xl">Twelve weeks.<br/>Four builds.</h2>
          </ScrollReveal>

          <div className="space-y-12">
            {[
              {
                weeks: 'Weeks 1?"3',
                title: 'Software & Systems',
                desc: 'Python from scratch, plus how apps, networks and databases actually work.',
                usedFor: 'Each student writes a working program ?" a quiz, calculator or decision tool ?" and designs the data behind their capstone.',
                color: 'bg-brand-blue/10 text-brand-blue',
              },
              {
                weeks: 'Weeks 4?"6',
                title: 'Artificial Intelligence',
                desc: 'How machines learn, where AI goes wrong, and how to use it with judgement.',
                usedFor: 'Students train a small classifier, test it, catch its mistakes and add a verified AI feature to their product.',
                color: 'bg-brand-yellow/30 text-brand-yellow',
              },
              {
                weeks: 'Weeks 7?"9',
                title: 'IoT & Robotics',
                desc: 'Safe, low-voltage electronics: sensors, lights, buzzers and automation.',
                usedFor: 'Each student wires their own kit so their product can sense the real world ?" temperature, light, distance ?" and act on it.',
                color: 'bg-brand-black/5 text-brand-black',
              },
              {
                weeks: 'Weeks 10?"12',
                title: 'Entrepreneurship',
                desc: 'Finding a real problem, talking to users, estimating costs, pitching.',
                usedFor: 'Teams turn their build into a product and defend it at Demo Day ?" in front of teachers, parents and invited guests.',
                color: 'bg-brand-red/10 text-brand-red',
              }
            ].map((build, i) => (
              <ScrollReveal key={build.title} delay={i * 0.1}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b-2 border-brand-black/10 pb-12">
                  <div className="md:col-span-3">
                    <p className="text-sm font-bold tracking-widest uppercase text-brand-blue mb-2">{build.weeks}</p>
                    <h3 className="text-3xl font-bold">{build.title}</h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-xl text-brand-black/70 leading-relaxed">{build.desc}</p>
                  </div>
                  <div className="md:col-span-4">
                    <div className="bg-brand-tan p-6 border-l-4 border-brand-black">
                      <p className="text-sm font-bold tracking-widest uppercase mb-2">Used For:</p>
                      <p className="text-brand-black/80">{build.usedFor}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Registration Section */}
        <div id="enroll" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Join the October Cohort.</h2>
                <p className="text-xl text-brand-black/70 leading-relaxed mb-8">
                  The programme uses a dual-track model. The <strong>Explorer Track (Grades 6-7)</strong> focuses on understanding concepts and presenting them, while the <strong>Builder Track (Grades 8-9)</strong> dives deep into code.
                </p>
                <div className="space-y-6 border-y-2 border-brand-black/10 py-8 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Starts on</span>
                    <span className="font-bold text-brand-blue">Oct 20, 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Hardware Kit</span>
                    <span className="font-bold text-brand-black/70">Included (Delivered)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Format</span>
                    <span className="font-bold text-brand-black/70">Online Live</span>
                  </div>
                </div>
                <div className="bg-brand-blue p-8 text-brand-cream border-2 border-brand-black shadow-[8px_8px_0_0_#141414]">
                  <h4 className="font-bold text-xl mb-2">Hardware Kit Included</h4>
                  <p className="text-brand-cream/80">Every student receives a physical kit containing an ESP32 microcontroller, breadboard, temperature, humidity and distance sensors, LEDs, and a buzzer.</p>
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

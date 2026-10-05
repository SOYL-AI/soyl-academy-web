import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { schoolsFaqs } from '@/content/faqs';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, howToNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';
import Link from 'next/link';

export const metadata = createMetadata({ path: '/schools' });

const workflowSteps = [
  { step: 1, title: 'Teacher Design', desc: 'Educators frame the learning objective using SOYL\'s challenge structure.' },
  { step: 2, title: 'Student Context', desc: 'Students are presented with the scenario and constraints.' },
  { step: 3, title: 'Strategy & Ideation', desc: 'Students map out their approach before jumping to solutions.' },
  { step: 4, title: 'Student Action', desc: 'Students research, build, write, or create their solution, documenting their process.' },
  { step: 5, title: 'Defense & Reflection', desc: 'Students articulate why they made their choices and what they learned.' },
  { step: 6, title: 'Educator Review', desc: 'Teachers evaluate the evidence of thinking, guided by SOYL\'s insight engine.' }
];

export default function SchoolsPage() {
  return (
    <div className="py-16 md:py-32 bg-brand-cream text-brand-black min-h-screen">
      <StructuredData
        data={graph(
          webPageNode({ path: '/schools' }),
          breadcrumbNode('/schools', topLevelCrumbs('/schools')),
          howToNode(
            'The SOYL Academy assignment workflow',
            'How a teacher designs, assigns and evaluates an outcome-based SOYL challenge in six steps.',
            workflowSteps
          ),
          faqNode('/schools', schoolsFaqs)
        )}
      />
      <Container>
        <section className="mb-24 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-8">
              <ScrollReveal>
                <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-8">For Schools</h3>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight max-w-[15ch]">
                  Change what homework means.
                </h1>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-4 pb-4">
              <ScrollReveal delay={0.1}>
                <p className="text-xl md:text-2xl text-brand-black/70 mb-8 leading-relaxed">
                  Traditional assignments no longer reliably demonstrate learning. Build classrooms where thinking is visible.
                </p>
                <Link
                  href="/contact"
                  className="press inline-flex items-center justify-center bg-brand-black text-brand-cream px-8 py-4 text-lg font-bold transition-colors hover:bg-brand-black/90"
                >
                  Enquire about a pilot
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-brand-black/5">
              <Image
                src="/images/classroom_wide_establishing.jpg"
                alt="A secondary classroom in use"
                fill
                className="object-cover grayscale mix-blend-multiply"
                sizes="100vw"
                priority
              />
            </div>
          </ScrollReveal>
        </section>

        <section className="mb-24 md:mb-48 border-t border-brand-black/10 pt-12 md:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                The output is no longer the proof.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="text-xl md:text-2xl leading-relaxed text-brand-black/80 space-y-8">
                <p>
                  When AI can produce a B+ essay or solve calculus in seconds, the artifact alone proves nothing. If it can be generated without effort, how do we know learning occurred?
                </p>
                <p className="font-bold text-brand-black bg-brand-yellow/30 inline-block px-2">
                  The solution is not to ban technology. The solution is to change the assignment.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Teacher Workflow */}
        <section id="workflow" className="mb-24 md:mb-48 scroll-mt-32">
          <ScrollReveal>
            <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-16">The SOYL Workflow</h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
            {workflowSteps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.05}>
                <div className="border-t-2 border-brand-black pt-6">
                  <div className="text-4xl font-bold text-brand-black mb-4">0{step.step}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-brand-black/70 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mb-24 md:mb-48 bg-brand-black text-brand-cream p-8 md:p-32 rounded-[2rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Seamless Curriculum Alignment</h2>
              <p className="text-xl text-brand-cream/70 mb-8 leading-relaxed">
                The SOYL Method does not require you to throw away your curriculum. It is a pedagogical overlay that integrates with your existing standards—whether Common Core, IB, IGCSE, or local frameworks.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h3 className="text-sm font-bold tracking-widest text-brand-yellow uppercase mb-12">What a Pilot Looks Like</h3>
              <div className="space-y-12">
                <div className="border-l border-brand-cream/20 pl-6">
                  <h4 className="text-xl font-bold mb-2">Phase 1: Introduce (Weeks 1-2)</h4>
                  <p className="text-brand-cream/60">PD for early-adopter teachers. Mapping 2-3 key units.</p>
                </div>
                <div className="border-l border-brand-cream/20 pl-6">
                  <h4 className="text-xl font-bold mb-2">Phase 2: Implement (Weeks 3-8)</h4>
                  <p className="text-brand-cream/60">Teachers deploy challenges. Ongoing support based on student responses.</p>
                </div>
                <div className="border-l border-brand-cream/20 pl-6">
                  <h4 className="text-xl font-bold mb-2">Phase 3: Evaluate (Weeks 9-10)</h4>
                  <p className="text-brand-cream/60">Review portfolios, feedback, and assess depth of learning.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Faq faqs={schoolsFaqs} heading="Questions from school leaders" />

      </Container>
    </div>
  );
}

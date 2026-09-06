import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Schools | SOYL Academy',
  description: 'Change what homework means. Discover how SOYL Academy helps schools implement outcome-based learning.',
};

const workflowSteps = [
  { step: 1, title: 'Define Objective', desc: 'Teachers select the core concept and the desired demonstration of learning.' },
  { step: 2, title: 'Generate Context', desc: 'SOYL assists in creating a robust, real-world scenario tailored to the curriculum.' },
  { step: 3, title: 'Assign Challenge', desc: 'Students receive the scenario and the success criteria, not a rigid set of instructions.' },
  { step: 4, title: 'Student Action', desc: 'Students research, build, write, or create their solution, documenting their process.' },
  { step: 5, title: 'Defense & Reflection', desc: 'Students articulate why they made their choices and what they learned.' },
  { step: 6, title: 'Educator Review', desc: 'Teachers evaluate the evidence of thinking, guided by SOYL\'s insight engine.' }
];

export default function SchoolsPage() {
  return (
    <div className="py-24 md:py-32 bg-white text-ink">
      <Container>
        {/* Hero Section */}
        <section className="mb-24 md:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-14 md:mb-20">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <Badge className="mb-8">For Schools</Badge>
                <h1 className="text-hero mb-8 max-w-[16ch]">
                  Change what homework means.
                </h1>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-20">
              <ScrollReveal delay={0.1}>
                <p className="text-lead text-ink-light mb-10 max-w-[40ch]">
                  Traditional assignments no longer reliably demonstrate
                  learning. Partner with SOYL Academy to build classrooms where
                  thinking is visible.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 h-12 px-6 bg-ink text-white text-[15px] font-medium rounded-sm transition-colors duration-300 hover:bg-cobalt"
                >
                  Enquire about a pilot
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Establishing plate — the room, not a close crop */}
          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[16/10] md:aspect-[12/5] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/classroom_wide_establishing.jpg"
                alt="A secondary classroom in use, groups working at separate tables while the teacher moves between them"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </ScrollReveal>
        </section>

        {/* Problem Statement & Philosophy */}
        <section className="mb-32">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-headline mb-8">The output is no longer the proof.</h2>
              <div className="text-lg text-ink/80 space-y-6 text-left md:text-center">
                <p>
                  When artificial intelligence can produce a B+ essay, solve calculus problems, and write boilerplate code in seconds, the traditional model of education faces an existential crisis. If the artifact alone can be generated without effort, how do we know if learning has occurred?
                </p>
                <p className="font-medium text-ink">
                  SOYL Academy believes the solution is not to ban technology, nor to retreat to pen-and-paper exams. The solution is to change the assignment.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Teacher Workflow */}
        <section className="mb-32">
          <ScrollReveal>
            <h2 className="text-subhead text-center mb-16">The SOYL Workflow</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.05}>
                <div className="bg-white p-8 rounded-xl border border-ink/10 h-full flex flex-col">
                  <div className="text-subhead text-cobalt mb-6">{`0${step.step}`}</div>
                  <h3 className="text-xl font-sans font-bold mb-3">{step.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Curriculum Alignment & Pilot */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="text-subhead mb-6">Seamless Curriculum Alignment</h2>
              <p className="text-lg text-ink/80 mb-6">
                The SOYL Method does not require you to throw away your curriculum. It is a pedagogical overlay that integrates with your existing standards—whether Common Core, IB, IGCSE, or local frameworks.
              </p>
              <p className="text-lg text-ink/80">
                We work with instructional leaders to map SOYL challenges directly to the learning objectives you already need to hit, transforming how they are assessed rather than what is taught.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-ink text-paper p-10 rounded-2xl">
                <h2 className="text-subhead mb-8 text-highlighter">What a Pilot Looks Like</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Phase 1: Introduce (Weeks 1-2)</h3>
                    <p className="text-paper/70">Professional development for a core cohort of early-adopter teachers. Mapping 2-3 key units to the SOYL framework.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Phase 2: Implement (Weeks 3-8)</h3>
                    <p className="text-paper/70">Teachers deploy SOYL challenges in the classroom. Ongoing support and refinement based on initial student responses.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Phase 3: Evaluate (Weeks 9-10)</h3>
                    <p className="text-paper/70">Review of student portfolios, teacher feedback, and assessment of learning depth. Planning for wider rollout.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <ScrollReveal>
            <div className="py-20 border-t border-ink/10">
              <h2 className="text-headline mb-8">Ready to bring SOYL to your classrooms?</h2>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-cobalt text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-cobalt/90 transition-transform hover:scale-105"
              >
                Start the Conversation
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </Container>
    </div>
  );
}

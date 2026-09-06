import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The SOYL Method | SOYL Academy',
  description: 'Learning should be demonstrated through what a student can do, not merely through what they can submit. Discover the 5 pillars of the SOYL Method.',
};

const pillars = [
  {
    num: '01',
    name: 'Understand',
    tagline: 'Comprehension beyond the surface.',
    content: [
      'True understanding is not the ability to regurgitate facts, but the capacity to map new information to existing knowledge structures.',
      'In a world where answers are instantly available, understanding must be measured by a student\'s ability to identify relationships, contrast differing perspectives, and recognize the boundaries of their own knowledge.'
    ],
    traditional: 'Read chapter 4 and answer the 10 questions at the end.',
    soyl: 'Given this new concept, explain it using an analogy related to your favorite hobby.'
  },
  {
    num: '02',
    name: 'Apply',
    tagline: 'Knowledge in action.',
    content: [
      'Application tests the utility of knowledge. It asks students to take an abstract concept and use it to solve a concrete problem in a novel context.',
      'When students apply what they\'ve learned, they invariably encounter friction—the gap between theory and reality. Navigating this friction is where true learning occurs.'
    ],
    traditional: 'Solve these 20 similar equations.',
    soyl: 'Use these mathematical principles to optimize the layout of a school garden.'
  },
  {
    num: '03',
    name: 'Create',
    tagline: 'Synthesis and expression.',
    content: [
      'Creation requires synthesis. It demands that students pull from multiple domains, evaluate options, make decisions, and construct something that did not previously exist.',
      'This pillar focuses on originality, coherence, and the ability to bring an idea to fruition, demonstrating mastery over the underlying components.'
    ],
    traditional: 'Write a standard 5-paragraph essay on the causes of the Civil War.',
    soyl: 'Create a historical artifact (like a diary entry or a newspaper article) that reflects the tension of the era, and defend its historical accuracy.'
  },
  {
    num: '04',
    name: 'Defend',
    tagline: 'Reasoning and justification.',
    content: [
      'If you cannot defend your position, you do not truly hold it. The ability to articulate why a decision was made, why a solution works, or why an argument is sound is paramount.',
      'Defending work requires students to anticipate counterarguments, evaluate evidence, and communicate their reasoning with clarity and conviction.'
    ],
    traditional: 'Select the correct multiple-choice answer.',
    soyl: 'Present your solution to the class and answer three challenging questions about your methodology.'
  },
  {
    num: '05',
    name: 'Reflect',
    tagline: 'Metacognition and growth.',
    content: [
      'Reflection is the engine of improvement. It requires students to look back at their process, identify what worked, what failed, and what they would do differently.',
      'By cultivating metacognition, students learn how to learn. They become self-aware practitioners capable of continuous growth.'
    ],
    traditional: 'Receive a grade of B- and move on to the next unit.',
    soyl: 'Write a brief retrospective on your project: what was the hardest part, and how did you overcome it?'
  }
];

export default function MethodPage() {
  return (
    <div className="py-24 md:py-32 bg-white text-ink">
      <Container>
        {/* Hero Section */}
        <section className="mb-32">
          <ScrollReveal>
            <Badge className="mb-8">The SOYL Method</Badge>
            <h1 className="text-4xl md:text-6xl font-editorial tracking-tight leading-tight max-w-4xl mb-8">
              Learning should be demonstrated through what a student can do, not merely through what they can submit.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl text-xl text-ink/80 space-y-6">
              <p>
                For decades, educational assignments have been transactional: teachers assign a task, students submit a product, and a grade is returned. This system worked when the production of the artifact itself guaranteed that thinking had occurred.
              </p>
              <p>
                Today, the artifact alone proves nothing. When technology can generate essays, solve equations, and write code in seconds, we can no longer assess learning solely by looking at the final submission. We must assess the process, the reasoning, and the student&apos;s ability to wield knowledge.
              </p>
              <p>
                The SOYL Method is an outcome-based framework designed to make thinking visible. It moves beyond transactional submissions to focus on five fundamental demonstrations of learning.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* The 5 Pillars */}
        <section className="mb-32">
          <div className="space-y-32">
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.num} delay={0.1 * index}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                  <div className="md:col-span-4">
                    <span className="text-6xl md:text-8xl font-editorial text-cobalt block mb-4">{pillar.num}</span>
                    <h2 className="text-3xl font-sans font-medium mb-2">{pillar.name}</h2>
                    <p className="text-lg text-teacher-red font-editorial italic">{pillar.tagline}</p>
                  </div>
                  
                  <div className="md:col-span-8 space-y-12">
                    <div className="text-lg text-ink/80 space-y-6">
                      {pillar.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="bg-white p-8 border border-ink/10 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-teacher-red"></div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-ink/60 mb-6">The Shift</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-sm font-semibold mb-3 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-ink/30 mr-2"></span>
                            Traditional Assignment
                          </h4>
                          <p className="text-ink/70">{pillar.traditional}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-3 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-cobalt mr-2"></span>
                            SOYL Assignment
                          </h4>
                          <p className="font-medium">{pillar.soyl}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Teacher Control & Technology */}
        <section className="mb-32">
          <ScrollReveal>
            <div className="bg-ink text-paper p-12 md:p-24 rounded-2xl">
              <div className="max-w-4xl mx-auto text-center space-y-12">
                <h2 className="text-3xl md:text-5xl font-editorial leading-tight">
                  Technology assists teachers. Technology must never visually or philosophically appear to replace educators.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                  <div>
                    <h3 className="text-xl font-sans font-medium mb-4 text-highlighter">Teacher Control</h3>
                    <p className="text-paper/80 leading-relaxed">
                      The SOYL Method places the educator firmly in the driver&apos;s seat. Our tools are designed to amplify a teacher&apos;s reach, handle administrative burden, and provide deeper insights, but the pedagogical decisions, the relationships, and the final assessments remain entirely human.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-sans font-medium mb-4 text-highlighter">Responsible Use</h3>
                    <p className="text-paper/80 leading-relaxed">
                      We believe AI is a powerful tool for learning when used as a thought partner, not a shortcut. The SOYL Method teaches students how to use technology responsibly, demanding transparency in their process and holding them accountable for the integrity of their work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA */}
        <section className="text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-editorial mb-8">Ready to change how learning is demonstrated?</h2>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-cobalt text-white px-8 py-4 rounded-full font-medium hover:bg-cobalt/90 transition-colors"
            >
              Get in touch
            </Link>
          </ScrollReveal>
        </section>
      </Container>
    </div>
  );
}

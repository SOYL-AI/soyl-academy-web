import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What We Teach | SOYL Academy',
  description: 'Discover SOYL Academy\'s programs and workshops. Some things are better learned together.',
};

const programs = [
  {
    id: 'ai-tech',
    category: 'AI & Technology',
    title: 'Applied Intelligence',
    description: 'Move beyond prompting. Learn to build systems, automate workflows, and use AI as a co-creator rather than a search engine. We teach students the foundational concepts of artificial intelligence and how to wield these tools ethically and effectively.',
    tags: ['Machine Learning Basics', 'Prompt Engineering', 'Ethical AI', 'Workflow Automation'],
    status: 'Coming Soon'
  },
  {
    id: 'build-make',
    category: 'Building & Making',
    title: 'Digital Craftsmanship',
    description: 'The distance between an idea and a product has never been shorter. This program focuses on bringing ideas to life through code, design, and prototyping. Students learn that creating something functional is the ultimate demonstration of understanding.',
    tags: ['Web Development', 'UI/UX Design', 'Rapid Prototyping', 'Product Thinking'],
    status: 'Coming Soon'
  },
  {
    id: 'comm-ideas',
    category: 'Communication & Ideas',
    title: 'The Art of Argument',
    description: 'In an era of deepfakes and algorithmic feeds, clarity of thought and expression is a superpower. We teach students how to construct robust arguments, defend their ideas against critique, and communicate complex concepts simply.',
    tags: ['Debate', 'Editorial Writing', 'Data Storytelling', 'Media Literacy'],
    status: 'Coming Soon'
  },
  {
    id: 'problem-solving',
    category: 'Problem Solving',
    title: 'Systems Thinking',
    description: 'Complex problems rarely have simple answers. This curriculum trains students to look at the whole system, identify feedback loops, and design interventions. We move from linear cause-and-effect to holistic understanding.',
    tags: ['Systems Mapping', 'Root Cause Analysis', 'Design Thinking', 'Simulation'],
    status: 'Coming Soon'
  }
];

export default function WhatWeTeachPage() {
  return (
    <div className="py-24 md:py-32 bg-white text-ink">
      <Container>
        {/* Hero Section */}
        <section className="mb-32">
          <ScrollReveal>
            <Badge className="mb-8">What We Teach</Badge>
            <h1 className="text-5xl md:text-7xl font-editorial tracking-tight leading-tight max-w-4xl mb-8">
              Some things are better learned together.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl text-xl text-ink/80 space-y-6">
              <p>
                While our digital platform enables better assignments anywhere, SOYL Academy also hosts specialized offline workshops, immersive programs, and collaborative experiences.
              </p>
              <p>
                These intensive sessions are designed to push students beyond their comfort zones, placing them in collaborative environments where they must negotiate, build, and defend their ideas in real-time.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Programs */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.1}>
                <div className="group border border-ink/10 p-10 rounded-2xl hover:border-cobalt transition-colors duration-300 h-full flex flex-col bg-bone">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-sm font-bold uppercase tracking-widest text-teacher-red">
                      {program.category}
                    </span>
                    {program.status && (
                      <span className="text-xs px-3 py-1 bg-ink/5 text-ink/60 rounded-full font-medium">
                        {program.status}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-3xl font-editorial mb-4">{program.title}</h2>
                  <p className="text-ink/70 leading-relaxed mb-8 flex-grow">
                    {program.description}
                  </p>
                  
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">Topics Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {program.tags.map(tag => (
                        <span key={tag} className="text-sm px-3 py-1 border border-ink/10 rounded-full text-ink/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-ink/50 italic">
            Note: Program offerings are continually updated. Architecture designed for future CMS integration.
          </div>
        </section>

        {/* CTA */}
        <section>
          <ScrollReveal>
            <div className="bg-highlighter/20 p-12 md:p-20 rounded-3xl text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-editorial mb-6">Bring SOYL to your school</h2>
              <p className="text-lg text-ink/80 mb-10 max-w-2xl mx-auto">
                We partner with forward-thinking educational institutions to deliver these programs on-campus. Custom curriculum alignment is available.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-ink text-white px-8 py-4 rounded-full font-medium hover:bg-ink/80 transition-colors"
              >
                Discuss School Partnerships
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </Container>
    </div>
  );
}

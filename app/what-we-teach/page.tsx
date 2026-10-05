import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { whatWeTeachFaqs } from '@/content/faqs';
import { createMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/config';
import {
  breadcrumbNode,
  faqNode,
  graph,
  programListNode,
  topLevelCrumbs,
  webPageNode,
} from '@/lib/seo/schema';
import Link from 'next/link';

export const metadata = createMetadata({ path: '/what-we-teach' });

const programs = [
  {
    id: 'ai-tech',
    category: 'AI & Technology',
    title: 'Applied Intelligence',
    description: 'Move beyond prompting. Learn to build systems, automate workflows, and use AI as a co-creator rather than a search engine.',
    tags: ['Machine Learning Basics', 'Prompt Engineering', 'Ethical AI', 'Workflow Automation'],
    status: 'Coming Soon'
  },
  {
    id: 'build-make',
    category: 'Building & Making',
    title: 'Digital Craftsmanship',
    description: 'The distance between an idea and a product has never been shorter. Bring ideas to life through code, design, and prototyping.',
    tags: ['Web Development', 'UI/UX Design', 'Rapid Prototyping', 'Product Thinking'],
    status: 'Coming Soon'
  },
  {
    id: 'comm-ideas',
    category: 'Communication & Ideas',
    title: 'The Art of Argument',
    description: 'In an era of deepfakes and algorithmic feeds, clarity of thought and expression is a superpower.',
    tags: ['Debate', 'Editorial Writing', 'Data Storytelling', 'Media Literacy'],
    status: 'Coming Soon'
  },
  {
    id: 'problem-solving',
    category: 'Problem Solving',
    title: 'Systems Thinking',
    description: 'Complex problems rarely have simple answers. Learn to map systems, identify feedback loops, and design interventions.',
    tags: ['Systems Mapping', 'Root Cause Analysis', 'Design Thinking', 'Simulation'],
    status: 'Coming Soon'
  }
];

export default function WhatWeTeachPage() {
  return (
    <div className="py-16 md:py-32 bg-brand-cream text-brand-black min-h-screen">
      <StructuredData
        data={graph(
          webPageNode({
            path: '/what-we-teach',
            mainEntityId: `${absoluteUrl('/what-we-teach')}#programs`,
          }),
          breadcrumbNode('/what-we-teach', topLevelCrumbs('/what-we-teach')),
          programListNode(programs),
          faqNode('/what-we-teach', whatWeTeachFaqs)
        )}
      />
      <Container>
        <section className="mb-24 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12 md:mb-24">
            <ScrollReveal>
              <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-8">What We Teach</h3>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight">
                Some things are better learned <span className="bg-brand-yellow px-2">together</span>.
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="text-xl md:text-2xl text-brand-black/70 space-y-6">
                <p>
                  While our digital platform enables better assignments anywhere, SOYL Academy also hosts specialized offline workshops, immersive programs, and collaborative experiences.
                </p>
                <p>
                  These intensive sessions push students beyond their comfort zones, placing them in environments where they must negotiate, build, and defend ideas in real-time.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-brand-black/5">
              <Image
                src="/images/classroom_wide_making.jpg"
                alt="A workshop-style classroom with several groups building and testing at once"
                fill
                className="object-cover grayscale mix-blend-multiply"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </section>

        {/* Programs */}
        <section className="mb-24 md:mb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 border-t border-brand-black/10 pt-12 md:pt-24">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.1}>
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6 border-b-2 border-brand-black pb-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-brand-red">
                      {program.category}
                    </span>
                    {program.status && (
                      <span className="text-xs px-3 py-1 bg-brand-yellow font-bold uppercase tracking-widest text-brand-black">
                        {program.status}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-6">{program.title}</h2>
                  <p className="text-xl text-brand-black/70 leading-relaxed mb-12 flex-grow">
                    {program.description}
                  </p>
                  
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-black/40 mb-4">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {program.tags.map(tag => (
                        <span key={tag} className="text-sm font-medium px-4 py-2 border border-brand-black/10 rounded-full text-brand-black/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <Faq faqs={whatWeTeachFaqs} heading="Questions about our programs" />

        <section className="mt-48 text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-brand-black text-brand-cream p-8 md:p-32 rounded-[2rem]">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Bring SOYL to your school</h2>
              <p className="text-xl text-brand-cream/70 mb-12 leading-relaxed">
                We partner with forward-thinking educational institutions to deliver these programs on-campus. Custom curriculum alignment is available.
              </p>
              <Link 
                href="/contact" 
                className="press inline-flex items-center justify-center bg-brand-yellow text-brand-black px-10 py-5 text-lg font-bold transition-colors hover:bg-brand-yellow/90"
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

import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { pillars } from '@/content/method';
import { methodFaqs } from '@/content/faqs';
import { createMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/config';
import {
  breadcrumbNode,
  faqNode,
  graph,
  methodTermSetNode,
  topLevelCrumbs,
  webPageNode,
} from '@/lib/seo/schema';
import Link from 'next/link';

export const metadata = createMetadata({ path: '/method' });

export default function MethodPage() {
  return (
    <div className="py-24 md:py-32 bg-white text-ink">
      <StructuredData
        data={graph(
          webPageNode({
            path: '/method',
            mainEntityId: `${absoluteUrl('/method')}#method`,
          }),
          breadcrumbNode('/method', topLevelCrumbs('/method')),
          methodTermSetNode(pillars),
          faqNode('/method', methodFaqs)
        )}
      />
      <Container>
        {/* Hero Section */}
        <section className="mb-32">
          <ScrollReveal>
            <Badge className="mb-8">The SOYL Method</Badge>
            <h1 className="text-hero max-w-4xl mb-8">
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
                    <span className="text-headline text-cobalt block mb-4">{pillar.num}</span>
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
                <h2 className="text-headline leading-tight">
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

        <Faq
          faqs={methodFaqs}
          heading="Questions about the SOYL Method"
        />

        {/* CTA */}
        <section className="text-center">
          <ScrollReveal>
            <h2 className="text-subhead mb-8">Ready to change how learning is demonstrated?</h2>
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

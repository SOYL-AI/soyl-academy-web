import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
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
    <div className="py-24 md:py-32 bg-brand-cream text-brand-black min-h-screen">
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
        <section className="mb-48 mt-12">
          <ScrollReveal>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              Learning should be <span className="bg-brand-yellow px-2">demonstrated</span>.
            </h1>
            <p className="text-2xl md:text-4xl font-medium leading-tight max-w-4xl">
              Not merely through what a student can submit, but through what they can do, apply, and defend.
            </p>
          </ScrollReveal>
        </section>

        {/* The 5 Pillars */}
        <section className="mb-48">
          <div className="space-y-32">
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.num} delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start pt-16 border-t border-brand-black/10">
                  <div className="md:col-span-4 sticky top-32">
                    <span className="text-sm font-bold tracking-widest text-brand-blue uppercase block mb-4">Pillar {pillar.num}</span>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">{pillar.name}</h2>
                    <p className="text-xl md:text-2xl text-brand-black/50">{pillar.tagline}</p>
                  </div>
                  
                  <div className="md:col-span-8 space-y-16">
                    <div className="text-2xl leading-relaxed text-brand-black/90">
                      <p>{pillar.content[0]}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-widest text-brand-black/40 uppercase">Traditional</h4>
                        <p className="text-lg line-through decoration-brand-red/50 text-brand-black/60">{pillar.traditional}</p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-widest text-brand-blue uppercase">SOYL Method</h4>
                        <p className="text-xl font-medium">{pillar.soyl}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Teacher Control & Technology */}
        <section className="mb-48">
          <ScrollReveal>
            <div className="bg-brand-black text-brand-cream p-16 md:p-32 rounded-[2rem]">
              <div className="max-w-4xl space-y-16">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                  Technology assists teachers.<br />
                  <span className="text-brand-yellow">It does not replace them.</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div>
                    <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-brand-cream/50">Teacher Control</h3>
                    <p className="text-xl leading-relaxed">
                      Our tools amplify a teacher&apos;s reach and provide deeper insights, but the pedagogical decisions, the relationships, and the final assessments remain entirely human.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-brand-cream/50">Responsible Use</h3>
                    <p className="text-xl leading-relaxed">
                      We believe AI is a powerful tool for learning when used as a thought partner, not a shortcut. We hold students accountable for the integrity of their work.
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
      </Container>
    </div>
  );
}

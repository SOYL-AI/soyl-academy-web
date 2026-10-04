import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { StructuredData } from '@/components/seo/StructuredData';
import { ORGANIZATION_ID } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';
import Image from 'next/image';

export const metadata = createMetadata({ path: '/about' });

export default function AboutPage() {
  return (
    <div className="py-32 bg-brand-cream text-brand-black min-h-screen">
      <StructuredData
        data={graph(
          webPageNode({ path: '/about', mainEntityId: ORGANIZATION_ID }),
          breadcrumbNode('/about', topLevelCrumbs('/about'))
        )}
      />
      <Container>
        <section className="mb-48 max-w-5xl">
          <ScrollReveal>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
              Answers are cheap.<br />
              <span className="bg-brand-yellow px-2 leading-tight">Thinking is not.</span>
            </h1>
            <p className="text-xl md:text-3xl text-brand-black/80 max-w-3xl leading-relaxed">
              For most of history, if a student could produce the correct answer, it meant they had successfully learned. Today, technology has commoditized the answer.
            </p>
          </ScrollReveal>
        </section>

        <section className="mb-48 border-t border-brand-black/10 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-black/5">
                <Image 
                  src="/images/classroom_wide_making.jpg" 
                  alt="Students presenting their project findings" 
                  fill
                  className="object-cover grayscale mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            
            <div className="space-y-16">
              <ScrollReveal delay={0.1}>
                <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-6">The Old Model</h3>
                <p className="text-2xl md:text-4xl font-medium leading-tight">
                  The essay and the worksheet were anchored in a world where producing the artifact was proof of effort.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-6">The New Reality</h3>
                <p className="text-2xl md:text-4xl font-medium leading-tight">
                  When the artifact can be generated for free, we can no longer assess the product. We must assess the process.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="mb-48 text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-7xl font-bold mb-12">
              Educators remain the <br /> irreplaceable core.
            </h2>
            <p className="text-xl md:text-2xl text-brand-black/70 mb-16 leading-relaxed">
              Algorithms can generate content, but they cannot inspire, they cannot build relationships, and they cannot read a room. SOYL Academy builds tools to empower human teachers to do what only humans can do: mentor, challenge, and guide.
            </p>
          </ScrollReveal>
        </section>
        
        <section className="pt-12 border-t border-brand-black/10">
          <ScrollReveal>
            <p className="text-sm text-brand-black/50 text-center font-medium tracking-widest uppercase">
              SOYL Academy is an initiative of SOYL AI Private Limited.
            </p>
          </ScrollReveal>
        </section>
      </Container>
    </div>
  );
}

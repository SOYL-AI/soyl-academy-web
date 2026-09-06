import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export const metadata: Metadata = {
  title: 'About | SOYL Academy',
  description: 'Answers changed. School has to change too. Discover the educational thesis behind SOYL Academy.',
};

export default function AboutPage() {
  return (
    <div className="py-24 md:py-32 bg-white text-ink">
      <Container>
        {/* Hero Section */}
        <section className="mb-24 md:mb-32">
          <ScrollReveal>
            <div className="max-w-4xl">
              <h1 className="text-display mb-12">
                Answers changed.<br/>
                <span className="text-teacher-red">School has to change too.</span>
              </h1>
            </div>
          </ScrollReveal>
        </section>

        {/* Story / Thesis Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5 md:col-start-1">
              <ScrollReveal>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-8">
                  <Image 
                    src="/images/students_presenting.jpg" 
                    alt="Students presenting their project findings" 
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </ScrollReveal>
            </div>
            
            <div className="md:col-span-6 md:col-start-7 space-y-10 text-lg text-ink/80 leading-relaxed flex flex-col justify-center">
              <ScrollReveal delay={0.1}>
                <p>
                  For most of human history, information was scarce. Education was built around the acquisition, retention, and basic processing of facts. If a student could produce the correct answer, it meant they had successfully stored the information.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <p>
                  Today, technology has commoditized the &ldquo;answer.&rdquo; We carry infinite information in our pockets, and artificial intelligence can synthesize it in seconds. Yet, our fundamental model of assessing learning—the assignment, the essay, the worksheet—remains anchored in a world where producing the artifact was proof of effort.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <p className="text-2xl font-editorial text-ink leading-snug my-8 border-l-4 border-cobalt pl-6">
                  When the artifact can be generated for free, we can no longer assess the product. We must assess the process.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <p>
                  This is the educational thesis of SOYL Academy. We believe that learning still requires profound, uncomfortable thinking. But we must change how that thinking is demonstrated. Assignments must evolve from tasks of production to tasks of application, defense, and creation.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <p>
                  Crucially, we believe that <strong className="text-ink">educators remain the irreplaceable core of learning</strong>. Algorithms can generate content, but they cannot inspire, they cannot build relationships, and they cannot read a room. SOYL Academy builds tools to empower human teachers to do what only humans can do: mentor, challenge, and guide.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Footer / Corporate Mention */}
        <section className="mt-32 pt-12 border-t border-ink/10">
          <ScrollReveal>
            <p className="text-sm text-ink/50 text-center font-medium tracking-wide uppercase">
              SOYL Academy is an initiative of SOYL AI Private Limited.
            </p>
          </ScrollReveal>
        </section>
      </Container>
    </div>
  );
}

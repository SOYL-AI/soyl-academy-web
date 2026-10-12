import Image from 'next/image';
import { FutureBuildersFeature } from '@/components/marketing/FutureBuildersFeature';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { studentsFaqs } from '@/content/faqs';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/students' });

const actions = [
  { word: 'Solve.', color: 'text-brand-blue' },
  { word: 'Build.', color: 'text-brand-red' },
  { word: 'Argue.', color: 'text-brand-yellow' },
  { word: 'Explain.', color: 'text-brand-black' },
  { word: 'Reflect.', color: 'text-brand-blue/70' }
];

export default function StudentsPage() {
  return (
    <div className="pt-32 pb-16 md:py-32 bg-brand-cream text-brand-black min-h-screen">
      <StructuredData
        data={graph(
          webPageNode({ path: '/students' }),
          breadcrumbNode('/students', topLevelCrumbs('/students')),
          faqNode('/students', studentsFaqs)
        )}
      />
      <Container>
        <FutureBuildersFeature />
        <section className="mb-24 md:mb-48 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-black/5">
              <Image
                src="/images/students_debating.jpg"
                alt="Two students disagreeing across a table"
                fill
                className="object-cover grayscale mix-blend-multiply"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
            </div>
          </ScrollReveal>
          
          <div className="pl-0 lg:pl-12">
            <ScrollReveal delay={0.1}>
              <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-8">For Students</h3>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-12">
                Learn beyond<br />the answer.
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="text-xl md:text-2xl text-brand-black/70 leading-relaxed space-y-8">
                <p>
                  School shouldn&apos;t just be about finding the right answer to a question someone else has already solved. It should be about learning how to think when the answer isn&apos;t obvious.
                </p>
                <p>
                  At SOYL, we challenge you to learn through doing. No more endless worksheets or formulaic essays. We want to see what you can build, how you reason, and how you tackle real problems.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Graphic Statements */}
        <section className="mb-24 md:mb-48">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 py-24 border-y border-brand-black/10">
              {actions.map((action) => (
                <span 
                  key={action.word} 
                  className={`text-5xl md:text-8xl font-bold tracking-tight ${action.color} transform transition-transform hover:-translate-y-2 cursor-default`}
                >
                  {action.word}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Responsible AI */}
        <section className="mb-24 md:mb-48 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="bg-brand-black text-brand-cream p-8 md:p-32 rounded-[2rem] text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-12">Use AI to think better, not to skip thinking.</h2>
              <p className="text-xl md:text-2xl text-brand-cream/70 max-w-3xl mx-auto leading-relaxed">
                We know you have access to powerful AI tools. We expect you to use them. But in a SOYL assignment, you can&apos;t just copy-paste an answer. You have to explain your process, defend your choices, and prove that the ideas are yours. Technology is your co-pilot, but you are flying the plane.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <Faq faqs={studentsFaqs} heading="Questions from students" />

      </Container>
    </div>
  );
}

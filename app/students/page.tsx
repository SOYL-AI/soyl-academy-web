import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'For Students | SOYL Academy',
  description: 'Learn beyond the answer. Solve, build, argue, explain, and reflect.',
};

const actions = [
  { word: 'Solve.', color: 'text-cobalt' },
  { word: 'Build.', color: 'text-teacher-red' },
  { word: 'Argue.', color: 'text-highlighter' },
  { word: 'Explain.', color: 'text-ink' },
  { word: 'Reflect.', color: 'text-cobalt/70' }
];

export default function StudentsPage() {
  return (
    <div className="py-24 md:py-32 bg-white text-ink">
      <Container>
        {/* Hero Section */}
        <section className="mb-24 md:mb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/students_debating.jpg"
                alt="Two students disagreeing across a table, one making a case with an open hand while the others listen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
            </div>
          </ScrollReveal>
          
          <div>
            <ScrollReveal delay={0.1}>
              <Badge className="mb-8">For Students</Badge>
              <h1 className="text-hero mb-8">
                Learn beyond the answer.
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="text-xl text-ink/80 leading-relaxed space-y-6 mb-10 max-w-lg">
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
        <section className="mb-32 overflow-hidden">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-16 md:gap-y-8 py-12 border-y border-ink/10">
              {actions.map((action) => (
                <span 
                  key={action.word} 
                  className={`text-headline ${action.color} transform transition-transform hover:scale-110 cursor-default`}
                >
                  {action.word}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Responsible AI */}
        <section className="mb-32 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-paper p-10 md:p-16 rounded-3xl text-center">
              <h2 className="text-headline mb-6">Use AI to think better, not to skip thinking.</h2>
              <p className="text-lg text-ink/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                We know you have access to powerful AI tools. We expect you to use them. But in a SOYL assignment, you can&apos;t just copy-paste an answer. You have to explain your process, defend your choices, and prove that the ideas are yours. Technology is your co-pilot, but you are flying the plane.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Coming Soon CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="p-12 border-2 border-dashed border-ink/20 rounded-2xl">
              <Badge className="mb-6 mx-auto bg-ink/5 text-ink">Coming Soon</Badge>
              <h2 className="text-2xl font-sans font-medium mb-4">Individual Access</h2>
              <p className="text-ink/60 mb-8">
                Currently, SOYL Academy is available exclusively through partner schools. We are working on opening access directly to individual students who want to challenge themselves.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="#">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 rounded-full border border-ink/20 focus:outline-none focus:border-cobalt bg-transparent"
                  disabled
                />
                <button 
                  type="button"
                  className="bg-ink text-white px-6 py-3 rounded-full font-medium opacity-50 cursor-not-allowed"
                  disabled
                >
                  Join Waitlist
                </button>
              </form>
              <p className="text-xs text-ink/40 mt-4">(Waitlist placeholder)</p>
            </div>
          </ScrollReveal>
        </section>
      </Container>
    </div>
  );
}

import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

// Indent class drives the composition — the statements step across the grid
// rather than sitting in a centred stack.
const STATEMENTS = [
  { text: 'Solve something.', indent: '', mark: 'highlight' },
  { text: 'Build something.', indent: 'md:pl-[12%]', mark: null },
  { text: 'Argue something.', indent: 'md:pl-[24%]', mark: null },
  { text: 'Explain something.', indent: 'md:pl-[12%]', mark: null },
  { text: 'Change your mind about something.', indent: '', mark: 'circle' },
] as const;

export function StudentExperience() {
  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-default">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 md:mb-28">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-cobalt mb-7">For Students</p>
              <h2 className="text-display text-ink">
                Less busywork.
                <br />
                More doing.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
              <p className="text-lead text-ink-light max-w-[40ch]">
                A SOYL assignment isn&rsquo;t something you finish by filling a
                page. It asks you to investigate, make decisions, build ideas and
                explain how you got there.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-6 md:space-y-10 mb-24 md:mb-32">
          {STATEMENTS.map((statement, i) => (
            <ScrollReveal key={statement.text} delay={i * 0.06}>
              <p className={`text-headline text-ink ${statement.indent}`}>
                <span className="relative inline-block">
                  {statement.mark === 'highlight' ? (
                    <span className="highlight-mark">{statement.text}</span>
                  ) : (
                    statement.text
                  )}

                  {statement.mark === 'circle' && (
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[190%] text-teacher-red pointer-events-none"
                      viewBox="0 0 200 100"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M100,8 C155,8 194,29 194,50 C194,72 155,92 100,92 C45,92 6,72 6,50 C6,29 45,8 100,8 C132,8 152,13 156,16"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/students_building_project.jpg"
                  alt="Students assembling a working prototype on a workbench, mid-discussion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-subhead text-ink max-w-[24ch]">
                Learning should leave you with more than a submitted file.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

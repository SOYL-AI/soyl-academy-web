import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const STEPS = [
  { num: '01', title: 'Choose your curriculum' },
  { num: '02', title: 'Choose what students should learn' },
  { num: '03', title: 'Create the activity' },
  { num: '04', title: 'Review and shape it' },
  { num: '05', title: 'Assign it' },
  { num: '06', title: 'See evidence of learning' },
];

export function ForTeachers() {
  return (
    <section className="w-full bg-bone section-padding">
      <div className="container-default">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 md:mb-24">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-ink-light mb-7">For Teachers</p>
              <h2 className="text-headline text-ink max-w-[18ch]">
                You know your students. SOYL helps you challenge them.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-16">
              <p className="text-lead text-ink-light max-w-[42ch]">
                Start with what you&rsquo;re already teaching. Choose the
                learning outcome you want to see. SOYL helps turn it into an
                activity designed around understanding and application.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Wide documentary photograph, given room to breathe */}
        <ScrollReveal delay={0.05}>
          <div className="relative aspect-[4/3] md:aspect-[2/1] w-full overflow-hidden rounded-lg mb-16 md:mb-24">
            <Image
              src="/images/teacher_mentoring.jpg"
              alt="A teacher crouched beside a group of students, asking a question about their work"
              fill
              className="object-cover"
              sizes="(max-width: 1180px) 100vw, 1180px"
            />
          </div>
        </ScrollReveal>

        {/* Process rail — horizontal on desktop, a vertical list on mobile */}
        <ScrollReveal delay={0.1}>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border-t border-ink/15">
            {STEPS.map((step) => (
              <li
                key={step.num}
                className="border-b border-ink/15 lg:border-b-0 lg:border-r last:border-r-0 py-7 pr-6 lg:pt-8 lg:pb-16"
              >
                <span className="block text-small font-semibold text-cobalt tabular-nums mb-4">
                  {step.num}
                </span>
                <span className="block text-body font-medium text-ink max-w-[20ch]">
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <p className="text-headline text-ink">
                The teacher stays in charge.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
              <p className="text-lead text-ink-light max-w-[38ch]">
                Technology can help create possibilities. Educational judgement
                belongs to the educator.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

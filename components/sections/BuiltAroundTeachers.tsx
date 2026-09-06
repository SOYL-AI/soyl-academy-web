import { ScrollReveal } from '@/components/motion/ScrollReveal';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Teacher-led',
    desc: "Nothing matters more than the educator's understanding of the student and the classroom.",
  },
  {
    num: '02',
    title: 'Curriculum-aware',
    desc: 'Activities begin with what students are actually expected to learn.',
  },
  {
    num: '03',
    title: 'Outcome-first',
    desc: 'Start with the capability you want to develop. Then design the assignment around it.',
  },
];

export function BuiltAroundTeachers() {
  return (
    <section className="w-full bg-white section-padding">
      <div className="container-default">
        <ScrollReveal>
          <h2 className="text-headline text-ink max-w-[16ch] mb-16 md:mb-24">
            AI should support judgement. Not replace it.
          </h2>
        </ScrollReveal>

        <div className="border-t border-ink/15">
          {PRINCIPLES.map((principle, idx) => (
            <ScrollReveal key={principle.num} delay={idx * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-b border-ink/15 py-10 md:py-14">
                <div className="md:col-span-2">
                  <span className="text-small font-semibold text-ink-lighter tabular-nums">
                    {principle.num}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-subhead text-ink">{principle.title}</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-lead text-ink-light max-w-[44ch]">
                    {principle.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ScrollReveal } from '@/components/motion/ScrollReveal';

const CONCEPTS = [
  {
    number: '01',
    title: 'Understand',
    tagline: 'Know more than the answer.',
    body: 'Build the concepts and context needed to make sense of a problem.',
  },
  {
    number: '02',
    title: 'Apply',
    tagline: 'Use what you know.',
    body: 'Take learning outside the textbook and put it into a new situation.',
  },
  {
    number: '03',
    title: 'Create',
    tagline: 'Make something with it.',
    body: 'A solution. A model. An argument. A plan. An experiment.',
  },
  {
    number: '04',
    title: 'Defend',
    tagline: 'Explain your thinking.',
    body: 'Students should be able to communicate not only what they chose, but why.',
  },
  {
    number: '05',
    title: 'Reflect',
    tagline: 'Look again.',
    body: 'What worked? What changed? What would you do differently?',
  },
];

export function SoylMethod() {
  return (
    <section className="w-full bg-white section-padding">
      <div className="container-default">
        <ScrollReveal>
          <div className="mb-20 md:mb-28 max-w-4xl">
            <p className="text-eyebrow text-cobalt mb-7">The SOYL Method</p>
            <h2 className="text-display text-ink">Learning is a verb.</h2>
          </div>
        </ScrollReveal>

        {/* Five rows, ruled like an index — no cards */}
        <ol className="border-t border-ink/15">
          {CONCEPTS.map((concept, index) => (
            <ScrollReveal key={concept.number} delay={index * 0.05}>
              <li className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-b border-ink/15 py-10 md:py-14 group">
                <div className="md:col-span-2">
                  <span className="text-subhead text-ink-lighter tabular-nums transition-colors duration-500 group-hover:text-cobalt">
                    {concept.number}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-headline text-ink">{concept.title}</h3>
                </div>

                <div className="md:col-span-6 md:pt-2 max-w-[42ch]">
                  <p className="text-subhead text-ink mb-4">{concept.tagline}</p>
                  <p className="text-body text-ink-light">{concept.body}</p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal>
          <div className="pt-20 md:pt-28 max-w-5xl">
            <p className="text-manifesto text-ink mb-10">
              Understand. Apply. Create. Defend. Reflect.
            </p>
            <p className="text-lead text-ink-light max-w-[46ch]">
              That&rsquo;s what an assignment should ask a student to do.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

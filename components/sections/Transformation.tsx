import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const OUTCOMES = ['Apply', 'Reason', 'Create', 'Defend'];

export function Transformation() {
  return (
    <section className="w-full bg-white section-padding">
      <div className="container-default">
        <ScrollReveal>
          <h2 className="text-headline text-ink max-w-[16ch] mb-16 md:mb-24">
            Now change the assignment.
          </h2>
        </ScrollReveal>

        {/* The new brief — a document, not a card. Cobalt arrives here. */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t-2 border-cobalt pt-8 md:pt-10">
            <div className="lg:col-span-3">
              <p className="text-eyebrow text-cobalt">The Energy Challenge</p>
            </div>

            <div className="lg:col-span-9">
              <p className="text-subhead text-ink max-w-[40ch] mb-8">
                Your school wants to reduce its electricity consumption by 25%
                without making classrooms less comfortable.
              </p>
              <div className="text-lead text-ink-light max-w-[52ch] space-y-2">
                <p>
                  Propose a plan using what you know about energy and
                  sustainability.
                </p>
                <p>Choose three actions. Explain why each would work.</p>
                <p>Defend one trade-off your plan requires.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Outcome labels — a measured row, not badges */}
        <ScrollReveal delay={0.15}>
          <ul className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-border">
            {OUTCOMES.map((outcome) => (
              <li
                key={outcome}
                className="border-b border-r border-border md:border-b-0 last:border-r-0 md:[&:nth-child(2)]:border-r py-6 pr-4"
              >
                <span className="block text-subhead text-cobalt">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-headline text-ink mb-6">
                Same subject.
                <br />
                Very different learning.
              </p>
              <p className="text-lead text-ink-light max-w-[44ch]">
                SOYL turns curriculum into experiences where understanding has to
                become visible.
              </p>
            </div>

            <div className="lg:col-span-5 lg:text-right">
              <Link
                href="/method"
                className="group inline-flex items-center gap-2 text-lead font-medium text-ink border-b border-ink pb-1 transition-colors duration-300 hover:text-cobalt hover:border-cobalt"
              >
                Explore the SOYL Method
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

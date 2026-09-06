import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const CATEGORIES = [
  {
    title: 'AI & Technology',
    description:
      'Understand the tools shaping the world — and learn to use them thoughtfully.',
  },
  {
    title: 'Building & Making',
    description: 'Learn by designing, experimenting and creating.',
  },
  {
    title: 'Communication & Ideas',
    description: 'Question, present, debate and defend what you believe.',
  },
  {
    title: 'Problem Solving',
    description:
      "Work through problems where there isn't always one correct answer.",
  },
];

export function WhatWeTeach() {
  return (
    <section className="w-full bg-white section-padding">
      <div className="container-default">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-cobalt mb-7">Beyond the platform</p>
              <h2 className="text-headline text-ink max-w-[16ch]">
                Some things are better learned together.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
              <p className="text-lead text-ink-light max-w-[40ch]">
                SOYL Academy is also building workshops, learning programs and
                classroom experiences around skills students need beyond a
                textbook.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* A ruled index, not a grid of cards */}
        <div className="border-t border-ink/15">
          {CATEGORIES.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline border-b border-ink/15 py-9 md:py-12">
                <div className="md:col-span-5">
                  <h3 className="text-subhead text-ink">{category.title}</h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-body text-ink-light max-w-[40ch]">
                    {category.description}
                  </p>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span className="text-small text-ink-lighter">
                    Coming soon
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <Link
            href="/what-we-teach"
            className="group inline-flex items-center gap-2 mt-14 text-lead font-medium text-ink border-b border-ink pb-1 transition-colors duration-300 hover:text-cobalt hover:border-cobalt"
          >
            Discover what we teach
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
        </ScrollReveal>
      </div>
    </section>
  );
}

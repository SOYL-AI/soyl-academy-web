'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { subjects } from '@/content/home';
import { SubjectPreview } from '@/components/visuals/SubjectPreviews';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TiltCard } from '@/components/motion/TiltCard';
import { useMotionOk } from '@/components/motion/useMotionOk';

const TINT: Record<string, string> = {
  chemistry: 'bg-brand-blue/10',
  physics: 'bg-brand-black/5',
  english: 'bg-brand-yellow/30',
  biology: 'bg-brand-black/5',
  maths: 'bg-brand-blue/10',
};

/**
 * Section 6 — subjects. Assignments are not just a text box.
 *
 * Five cards with live concept previews that hint at future subject
 * simulators. Labelled "Concept preview" — these are not shipped features.
 * Mobile: a swipeable row. Desktop: a 3 + 2 grid. Cards lean toward the pointer.
 */
export function SubjectExperiences() {
  const ok = useMotionOk();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const active = ok && inView;

  return (
    <section className="w-full bg-brand-cream section-padding overflow-x-clip">
      <div className="container-default">
        <ScrollReveal>
          <p className="text-eyebrow mb-7 text-brand-blue">{subjects.eyebrow}</p>
          <div className="mb-12 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
            <h2 className="text-display max-w-[12ch] text-brand-black">{subjects.headline}</h2>
            <p className="text-lead max-w-[26ch] text-brand-black/70">{subjects.support}</p>
          </div>
        </ScrollReveal>

        <div
          ref={ref}
          className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {subjects.items.map((item, i) => (
            <TiltCard
              key={item.id}
              className={cn(
                'w-[78vw] max-w-[340px] shrink-0 snap-center lg:w-auto lg:max-w-none',
                i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
              )}
            >
              <article className="h-full overflow-hidden rounded-xl border border-border">
                <div className={cn('relative aspect-[4/3] w-full', TINT[item.id])}>
                  <div className="absolute inset-0 p-4">
                    <SubjectPreview id={item.id} active={active} />
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-brand-cream/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-black/70">
                    {subjects.tag}
                  </span>
                </div>
                <div className="bg-brand-cream p-6 md:p-7">
                  <h3 className="text-subhead mb-2 text-brand-black">{item.name}</h3>
                  <p className="text-body text-brand-black/70">{item.line}</p>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

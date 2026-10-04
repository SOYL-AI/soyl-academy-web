'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/motion';
import { AssignmentCard, type AssignmentMode } from '@/components/visuals/AssignmentCard';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { useMotionOk } from '@/components/motion/useMotionOk';

const OPTIONS: { mode: AssignmentMode; label: string }[] = [
  { mode: 'old', label: 'Traditional' },
  { mode: 'soyl', label: 'SOYL' },
];

/**
 * Section 3 — the same assignment, rebuilt.
 *
 * Plays itself once when it scrolls into view (worksheet gets struck through,
 * the challenge arrives, its four outcomes pop in). Visitors can then replay
 * either state with the toggle. Reduced motion: rests on the SOYL state.
 */
export function AssignmentTransform() {
  const ok = useMotionOk();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.55 });
  const [mode, setMode] = useState<AssignmentMode>('old');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!ok || !seen || touched) return;
    const t = setTimeout(() => setMode('soyl'), 900);
    return () => clearTimeout(t);
  }, [ok, seen, touched]);

  const shown: AssignmentMode = ok ? mode : 'soyl';

  return (
    <section className="w-full bg-white section-padding">
      <div className="container-default">
        <ScrollReveal>
          <p className="text-eyebrow mb-7 text-cobalt">The SOYL version</p>
          <h2 className="text-headline mb-14 max-w-[14ch] text-ink md:mb-20">
            Now change the assignment.
          </h2>
        </ScrollReveal>

        <div ref={ref} className="mx-auto max-w-[640px]">
          <div
            role="group"
            aria-label="Switch between the traditional and SOYL assignment"
            className="relative mx-auto mb-8 flex w-fit rounded-full border border-border-dark bg-bone p-1"
          >
            {OPTIONS.map((opt) => {
              const active = shown === opt.mode;
              return (
                <button
                  key={opt.mode}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setTouched(true);
                    setMode(opt.mode);
                  }}
                  className="press relative z-10 h-10 min-w-[7.5rem] rounded-full px-5 text-[15px] font-medium"
                >
                  {active && (
                    <motion.span
                      layoutId="transform-toggle"
                      transition={spring.snappy}
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                    />
                  )}
                  <span className={cn('transition-colors duration-200', active ? 'text-white' : 'text-ink')}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          <AssignmentCard mode={shown} />
        </div>

        <ScrollReveal delay={0.1}>
          <p className="text-subhead mt-16 text-center text-ink md:mt-24">
            Same subject. Very different learning.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/motion';
import { problem } from '@/content/home';
import { AssignmentCard } from '@/components/visuals/AssignmentCard';
import { useMotionOk } from '@/components/motion/useMotionOk';

const N = problem.chain.length;

/**
 * Section 2 — show the problem, don't explain it.
 *
 * One pinned scene. As the visitor scrolls: the worksheet sits there, the
 * chain Prompt → AI → Answer → Submit → A+ lights up node by node, then the
 * scene dims and the verdict arrives.
 *
 * Motion path: sticky, scroll-linked. Static path (SSR, no-JS, reduced motion):
 * normal flow, every node lit, verdict visible — nothing is hidden behind scroll.
 */
export function ProblemSequence() {
  const ok = useMotionOk();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, 'change', (v) => {
    // Node i lights at 0.08 + 0.12·i, so the last one lands at ~0.56.
    setStage(Math.min(N, Math.max(0, Math.floor((v - 0.08) / 0.12) + 1)));
  });
  const lit = ok ? stage : N;

  const dim = useTransform(p, [0.64, 0.84], [1, 0.1]);
  const verdictOpacity = useTransform(p, [0.64, 0.8], [0, 1]);
  const verdictY = useTransform(p, [0.64, 0.8], [32, 0]);
  const circle = useTransform(p, [0.78, 0.93], [0, 1]);

  return (
    <section
      ref={ref}
      id="how-it-works"
      className={cn('relative w-full bg-bone', ok && 'h-[340svh]')}
    >
      <div
        className={cn(
          'container-default',
          ok ? 'sticky top-0 flex h-svh items-center justify-center' : 'section-padding'
        )}
      >
        <div className="relative w-full">
          {/* The scene: worksheet + the chain it actually goes through */}
          <motion.div style={ok ? { opacity: dim } : undefined} className="mx-auto max-w-[600px]">
            <AssignmentCard mode="old" />

            <ol
              aria-label="How the assignment really gets done"
              className="mt-10 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-3 md:mt-14"
            >
              {problem.chain.map((label, i) => {
                const on = i < lit;
                const isGrade = i === N - 1;
                return (
                  <li key={label} className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ scale: on ? 1 : 0.9, opacity: on ? 1 : 0.32 }}
                      transition={isGrade ? spring.playful : spring.snappy}
                      className={cn(
                        'inline-block rounded-full border px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300 md:px-5 md:text-body',
                        isGrade
                          ? 'border-teacher-red font-editorial text-[1.2rem] italic text-teacher-red md:text-[1.35rem]'
                          : on
                            ? 'border-ink bg-ink text-white'
                            : 'border-ink/25 text-ink'
                      )}
                    >
                      {label}
                    </motion.span>
                    {!isGrade && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className={cn('transition-opacity duration-300', i < lit - 1 ? 'opacity-70' : 'opacity-15')}
                      >
                        <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.div>

          {/* The verdict */}
          <motion.div
            style={ok ? { opacity: verdictOpacity, y: verdictY } : undefined}
            className={cn(
              'text-center',
              ok ? 'absolute inset-0 flex flex-col items-center justify-center' : 'mt-16 md:mt-24'
            )}
          >
            <p className="text-headline mb-2 text-ink-light">{problem.line1}</p>
            <p className="text-display text-ink">
              Except{' '}
              <span className="relative inline-block whitespace-nowrap">
                the learning
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[170%] w-[124%] -translate-x-1/2 -translate-y-1/2 text-teacher-red"
                  viewBox="0 0 200 100"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M100,10 C150,10 190,30 190,50 C190,70 150,90 100,90 C50,90 10,70 10,50 C10,30 50,10 100,10 C130,10 150,15 152,17"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={ok ? { pathLength: circle } : undefined}
                  />
                </svg>
              </span>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

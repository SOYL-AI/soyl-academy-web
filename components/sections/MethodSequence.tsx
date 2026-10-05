'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/motion';
import { method } from '@/content/home';
import { MethodIcon } from '@/components/visuals/MethodIcons';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { useMotionOk } from '@/components/motion/useMotionOk';

/**
 * Section 4 — the SOYL Method as a sequence you scroll through.
 *
 * Desktop: a sticky stage on the left redraws the icon of whichever step is
 * centred on screen; the five verbs scroll past on the right.
 * Mobile: no sticky stage — each row carries its own small icon instead.
 * Each step is one verb and one short sentence.
 */
export function MethodSequence() {
  const ok = useMotionOk();
  const [active, setActive] = useState(0);
  const current = method.steps[active];

  return (
    <section className="w-full bg-brand-cream section-padding">
      <div className="container-default">
        <ScrollReveal>
          <p className="text-eyebrow mb-7 text-brand-blue">{method.eyebrow}</p>
          <h2 className="text-display mb-16 text-brand-black md:mb-24">{method.headline}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 md:gap-16">
          {/* Sticky stage (desktop only) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-brand-black/5">
                <span className="absolute left-7 top-6 text-subhead tabular-nums text-brand-black-lighter">
                  0{active + 1}
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={ok ? { opacity: 0, scale: 0.9, rotate: -4 } : false}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={ok ? { opacity: 0, scale: 1.05 } : undefined}
                    transition={spring.settle}
                    className="absolute inset-0 flex items-center justify-center p-16"
                  >
                    <MethodIcon id={current.id} draw={ok} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2" aria-hidden="true">
                  {method.steps.map((s, i) => (
                    <span
                      key={s.id}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-500',
                        i === active ? 'w-8 bg-cobalt' : 'w-1.5 bg-ink/20'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* The five verbs */}
          <ol className="lg:col-span-7">
            {method.steps.map((step, i) => (
              <motion.li
                key={step.id}
                viewport={{ margin: '-45% 0px -45% 0px' }}
                onViewportEnter={() => setActive(i)}
                className="group flex min-h-[38svh] flex-col justify-center border-t border-ink/15 py-10 last:border-b lg:min-h-[52svh]"
              >
                <MethodIcon id={step.id} draw={false} className="mb-6 h-14 w-14 lg:hidden" />
                <span
                  className={cn(
                    'mb-3 text-small font-semibold tabular-nums transition-colors duration-500',
                    i === active ? 'text-brand-blue' : 'text-brand-black-lighter'
                  )}
                >
                  0{i + 1}
                </span>
                <h3
                  className={cn(
                    'text-display transition-colors duration-500',
                    i === active ? 'text-brand-black' : 'text-brand-black/25 lg:text-brand-black/20'
                  )}
                >
                  {step.verb}
                </h3>
                <p className="text-lead mt-5 max-w-[26ch] text-brand-black-light">{step.line}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

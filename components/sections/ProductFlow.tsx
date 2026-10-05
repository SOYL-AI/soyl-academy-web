'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DEMO_STEP_MS, spring } from '@/lib/motion';
import { productFlow } from '@/content/home';
import { MockWindow } from '@/components/visuals/ProductMocks';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { useMotionOk } from '@/components/motion/useMotionOk';

const steps = productFlow.steps;

/**
 * Section 5 — the product, shown instead of described.
 *
 * Six steps, one animated mock-up. It auto-advances only while it is on
 * screen, and stops for good the moment the visitor picks a step themselves.
 * Reduced motion: no auto-advance; the visitor steps through manually.
 */
export function ProductFlow() {
  const ok = useMotionOk();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  const auto = ok && inView && !manual;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), DEMO_STEP_MS);
    return () => clearTimeout(t);
  }, [auto, active]);

  const current = steps[active];

  return (
    <section className="w-full bg-brand-tan section-padding">
      <div className="container-default">
        <ScrollReveal>
          <p className="text-eyebrow mb-7 text-brand-blue">{productFlow.eyebrow}</p>
          <h2 className="text-headline mb-12 max-w-[14ch] text-brand-black md:mb-20">{productFlow.headline}</h2>
        </ScrollReveal>

        <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
          {/* Steps */}
          <div className="lg:col-span-5">
            <ol className="hide-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.id} className="shrink-0 snap-start lg:border-t lg:border-ink/15 lg:last:border-b">
                    <button
                      type="button"
                      onClick={() => {
                        setManual(true);
                        setActive(i);
                      }}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        'press relative flex w-full items-start gap-4 rounded-full border px-4 py-2.5 text-left lg:rounded-none lg:border-0 lg:px-0 lg:py-5',
                        isActive
                          ? 'border-ink bg-ink text-white lg:bg-transparent lg:text-brand-black'
                          : 'border-border-dark text-brand-black/70 hover:border-ink hover:text-brand-black lg:border-0'
                      )}
                    >
                      <span
                        className={cn(
                          'text-small font-semibold tabular-nums transition-colors lg:pt-1',
                          isActive ? 'text-white lg:text-brand-blue' : 'text-brand-black/70er'
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[15px] font-medium lg:text-subhead lg:whitespace-normal">
                          {step.label}
                        </span>
                        <span
                          className={cn(
                            'mt-1 hidden text-body text-brand-black/70 transition-all duration-500 lg:block',
                            isActive ? 'max-h-12 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                          )}
                        >
                          {step.line}
                        </span>
                      </span>

                      {/* Auto-advance progress (desktop rail) */}
                      {isActive && (
                        <motion.span
                          key={`${active}-${auto}`}
                          initial={{ scaleX: auto ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: auto ? DEMO_STEP_MS / 1000 : 0, ease: 'linear' }}
                          className="absolute bottom-0 left-0 hidden h-[2px] w-full origin-left bg-brand-blue lg:block"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Mobile caption for the current step (desktop shows it in the rail) */}
            <p className="text-lead mt-5 text-brand-black/70 lg:hidden" aria-live="polite">
              {current.line}
            </p>
          </div>

          {/* The mock-up */}
          <div className="lg:col-span-7">
            <p className="sr-only" aria-live="polite">
              Step {active + 1} of {steps.length}: {current.label}. {current.line}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={spring.settle}
              >
                <MockWindow id={current.id} step={active + 1} total={steps.length} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

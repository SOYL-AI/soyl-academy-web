'use client';

import * as React from 'react';
import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { manifesto } from '@/content/home';
import { useMotionOk } from '@/components/motion/useMotionOk';

/** One word whose opacity is tied to scroll progress between `from` and `to`. */
function Word({
  word,
  progress,
  from,
  to,
  mark,
}: {
  word: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
  mark?: boolean;
}) {
  const opacity = useTransform(progress, [from, to], [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn('inline-block', mark && 'rounded-sm bg-brand-yellow px-[0.12em] text-brand-black')}
    >
      {word}
    </motion.span>
  );
}

/** Lays words out and gives each its own slice of [start, end]. */
function Words({
  text,
  progress,
  start,
  end,
  markLast,
  motionOk,
}: {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  markLast?: boolean;
  motionOk: boolean;
}) {
  const words = text.split(' ');
  const step = (end - start) / words.length;
  return (
    <>
      {words.map((w, i) => {
        const isMark = Boolean(markLast) && i === words.length - 1;
        return (
          <React.Fragment key={`${w}-${i}`}>
            {motionOk ? (
              <Word word={w} progress={progress} from={start + i * step} to={start + (i + 1) * step} mark={isMark} />
            ) : (
              <span className={cn('inline-block', isMark && 'rounded-sm bg-brand-yellow px-[0.12em] text-brand-black')}>{w}</span>
            )}{' '}
          </React.Fragment>
        );
      })}
    </>
  );
}

const STATEMENT =
  'text-[clamp(2.25rem,6.4vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance';

/**
 * Section 8 — the philosophy moment. A dark, near-silent stage where two
 * sentences are read aloud by the scrollbar, one word at a time.
 *
 * Motion path: sticky + scroll-linked. Static path: normal flow, fully lit.
 */
export function PhilosophyManifesto() {
  const ok = useMotionOk();
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const closingOpacity = useTransform(p, [0.8, 0.92], [0, 1]);
  const closingY = useTransform(p, [0.8, 0.92], [20, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="manifesto-heading"
      className={cn('relative w-full bg-brand-blue text-brand-cream', ok && 'h-[250svh] md:h-[290svh]')}
    >
      <div
        className={cn(
          'container-default',
          ok ? 'sticky top-0 flex h-svh flex-col justify-center' : 'section-padding-lg'
        )}
      >
        <p className="text-eyebrow mb-8 text-brand-cream/70 md:mb-10">Our belief</p>

        <h2 id="manifesto-heading" className={cn(STATEMENT, 'mb-8 max-w-[18ch] md:mb-12')}>
          <Words text={manifesto.first} progress={p} start={0.04} end={0.4} motionOk={ok} />
        </h2>

        <p className={cn(STATEMENT, 'max-w-[20ch]')}>
          <Words text={manifesto.second} progress={p} start={0.42} end={0.78} markLast motionOk={ok} />
        </p>

        <motion.p
          style={ok ? { opacity: closingOpacity, y: closingY } : undefined}
          className="mt-10 font-editorial text-[clamp(1.75rem,3vw,2.5rem)] italic text-brand-yellow md:mt-14"
        >
          {manifesto.closing}
        </motion.p>
      </div>
    </section>
  );
}

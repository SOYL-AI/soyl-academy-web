'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/motion';
import { problem } from '@/content/home';

export type AssignmentMode = 'old' | 'soyl';

const TASKS = [
  { text: 'Choose three actions.', tag: 'Create' },
  { text: 'Explain why they work.', tag: 'Reason' },
  { text: 'Defend one trade-off.', tag: 'Defend' },
] as const;

/* Parent drives the sequence with `animate={mode}`; children only declare their states. */
const list: Variants = {
  old: {},
  soyl: { transition: { staggerChildren: 0.3, delayChildren: 0.75 } },
};
const rise: Variants = {
  old: { opacity: 0, y: 10 },
  soyl: { opacity: 1, y: 0, transition: spring.settle },
};
const pop: Variants = {
  old: { opacity: 0, scale: 0.4 },
  soyl: { opacity: 1, scale: 1, transition: { ...spring.playful, delay: 0.18 } },
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={pop}
      className="shrink-0 rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-blue"
    >
      {children}
    </motion.span>
  );
}

interface AssignmentCardProps {
  mode: AssignmentMode;
  /** Smaller type and padding, for use inside the hero composition. */
  compact?: boolean;
  className?: string;
}

/**
 * The signature SOYL visual: one assignment, two lives.
 *
 * `old`  — a ruled worksheet. Slightly crooked, because it is a relic.
 * `soyl` — the same subject, rebuilt as a challenge. Square, structured.
 *
 * Both layers share one grid cell so the card never changes height (no layout
 * shift). The inactive layer is `aria-hidden` and non-interactive.
 */
export function AssignmentCard({ mode, compact = false, className }: AssignmentCardProps) {
  const isOld = mode === 'old';

  return (
    <div className={cn('relative grid', className)}>
      {/* ───────── The worksheet ───────── */}
      <motion.article
        aria-hidden={!isOld}
        initial={false}
        animate={{ opacity: isOld ? 1 : 0, y: isOld ? 0 : -16, rotate: isOld ? -1.2 : -3.5 }}
        transition={{
          ...spring.settle,
          opacity: { duration: 0.35, delay: isOld ? 0.2 : 0.7 },
        }}
        style={{ gridArea: '1 / 1' }}
        className={cn(
          'paper-ruled relative rounded-sm shadow-[0_18px_40px_-22px_rgba(23,23,23,0.45)]',
          compact ? 'px-5 py-6 md:px-7 md:py-7' : 'px-7 py-9 md:px-12 md:py-12',
          !isOld && 'pointer-events-none'
        )}
      >
        <div
          className={cn('absolute top-0 bottom-0 w-px bg-teacher-red/35', compact ? 'left-7' : 'left-9 md:left-14')}
          aria-hidden="true"
        />
        <div className={cn('relative', compact ? 'pl-5' : 'pl-6 md:pl-8')}>
          <header className="mb-6 flex items-baseline justify-between gap-3 border-b border-ink/15 pb-3">
            <span className="text-eyebrow text-ink/70">Science — Class VIII</span>
            <span className="text-small tabular-nums text-ink/45">__ / __ / ____</span>
          </header>
          <p className="mb-2 text-small font-semibold text-ink/55">Assignment</p>
          <p
            className={cn(
              'max-w-[24ch] text-ink line-through decoration-2 transition-[text-decoration-color] duration-500',
              compact ? 'text-[1.15rem] leading-snug' : 'text-subhead',
              isOld ? 'decoration-transparent' : 'decoration-teacher-red'
            )}
          >
            {problem.prompt}
          </p>
        </div>
      </motion.article>

      {/* ───────── The SOYL challenge ───────── */}
      <motion.article
        aria-hidden={isOld}
        initial={false}
        animate={{ opacity: isOld ? 0 : 1, y: isOld ? 18 : 0, scale: isOld ? 0.97 : 1 }}
        transition={{
          ...spring.settle,
          opacity: { duration: 0.35, delay: isOld ? 0 : 0.5 },
          y: { ...spring.settle, delay: isOld ? 0 : 0.5 },
          scale: { ...spring.settle, delay: isOld ? 0 : 0.5 },
        }}
        style={{ gridArea: '1 / 1' }}
        className={cn(
          'relative rounded-sm border border-border-dark border-t-2 border-t-cobalt bg-white shadow-[0_18px_40px_-26px_rgba(23,23,23,0.35)]',
          compact ? 'px-5 py-6 md:px-7 md:py-7' : 'px-7 py-9 md:px-12 md:py-12',
          isOld && 'pointer-events-none'
        )}
      >
        <motion.div variants={list} initial={false} animate={mode}>
          <motion.p variants={rise} className="mb-3 text-eyebrow text-brand-blue">
            The Energy Challenge
          </motion.p>

          <motion.div variants={rise} className="mb-6 flex items-start justify-between gap-4">
            <p
              className={cn(
                'max-w-[28ch] text-ink',
                compact ? 'text-[1.05rem] leading-snug' : 'text-subhead'
              )}
            >
              Your school must cut electricity use by 25%.
            </p>
            <Tag>Apply</Tag>
          </motion.div>

          <ul className="space-y-3 border-t border-border pt-5">
            {TASKS.map((task) => (
              <motion.li
                key={task.tag}
                variants={rise}
                className="flex items-center justify-between gap-4"
              >
                <span className={cn('text-ink-light', compact ? 'text-[0.95rem]' : 'text-lead')}>
                  {task.text}
                </span>
                <Tag>{task.tag}</Tag>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.article>
    </div>
  );
}

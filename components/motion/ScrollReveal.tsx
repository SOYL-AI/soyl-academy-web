'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { distance, spring } from '@/lib/motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Kept for API compatibility. Reveals are spring-driven; duration is ignored. */
  duration?: number;
  className?: string;
}

const OFFSETS = {
  up: { x: 0, y: distance.reveal },
  down: { x: 0, y: -distance.reveal },
  left: { x: distance.reveal, y: 0 },
  right: { x: -distance.reveal, y: 0 },
  none: { x: 0, y: 0 },
} as const;

/**
 * The standard "arrive and settle" reveal.
 *
 * Content travels a short distance on a spring and comes to rest, rather than
 * fading up on a timer. Opacity only needs to be quick — the motion carries it.
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // No transform and no fade — the content is simply present.
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const { x, y } = OFFSETS[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        ...spring.settle,
        delay,
        opacity: { duration: 0.35, delay },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

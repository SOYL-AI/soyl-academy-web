'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Seconds. */
  duration?: number;
  className?: string;
}

const OFFSETS = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
} as const;

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
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
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

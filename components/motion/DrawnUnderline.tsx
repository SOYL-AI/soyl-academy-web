'use client';

import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

/**
 * A hand-drawn teacher's-pen underline that traces itself when scrolled into
 * view. Place it inside a `relative inline-block` parent.
 */
export function DrawnUnderline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M4 11 C 60 3, 110 15, 160 8 S 262 4, 296 10"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.5, ease: ease.out }}
      />
    </svg>
  );
}

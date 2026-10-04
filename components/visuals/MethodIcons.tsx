'use client';

import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

/**
 * Five line icons for the SOYL Method, drawn on a 120×120 grid.
 * Each icon has `base` strokes (ink) and `accent` strokes (cobalt). When
 * `draw` is true they trace themselves in; otherwise they render complete.
 */
const ICONS: Record<string, { base: string[]; accent: string[] }> = {
  understand: {
    base: ['M52 24a28 28 0 1 0 0 56a28 28 0 1 0 0-56', 'M73 75l26 26'],
    accent: ['M38 52c4-9 24-9 28 0', 'M52 46v2'],
  },
  apply: {
    base: ['M60 18a42 42 0 1 0 0 84a42 42 0 1 0 0-84', 'M60 40a20 20 0 1 0 0 40a20 20 0 1 0 0-40'],
    accent: ['M102 18L62 58', 'M102 18v20', 'M102 18H82'],
  },
  create: {
    base: ['M22 98l8-26L76 26l18 18-46 46z'],
    accent: ['M66 36l18 18', 'M96 14v12', 'M90 20h12', 'M20 52v8', 'M16 56h8'],
  },
  defend: {
    base: ['M20 28h80v52H58L38 100V80H20z'],
    accent: ['M36 46h48', 'M36 60h30'],
  },
  reflect: {
    base: ['M98 60a38 38 0 1 1-13-28.5'],
    accent: ['M88 14v22H66'],
  },
};

interface MethodIconProps {
  id: string;
  draw?: boolean;
  className?: string;
}

export function MethodIcon({ id, draw = true, className }: MethodIconProps) {
  const icon = ICONS[id];
  if (!icon) return null;

  const path = (d: string, color: string, delay: number) => (
    <motion.path
      key={d}
      d={d}
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={draw ? { pathLength: 0, opacity: 0 } : false}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: ease.out }}
    />
  );

  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      {icon.base.map((d, i) => path(d, 'var(--color-ink)', i * 0.12))}
      {icon.accent.map((d, i) => path(d, 'var(--color-cobalt)', 0.3 + i * 0.1))}
    </svg>
  );
}

'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { distance, spring } from '@/lib/motion';
import { useMotionOk } from './useMotionOk';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. Keep small: this should read as "weight", not a gimmick. */
  max?: number;
}

/**
 * A card that lifts and leans toward the pointer.
 * Mouse only — touch and pen get no tilt (it would fight scrolling), and
 * reduced-motion users get a static card.
 */
export function TiltCard({ children, className, max = 5 }: TiltCardProps) {
  const ok = useMotionOk();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, spring.tilt);
  const rotateY = useSpring(ry, spring.tilt);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ok || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={ok ? { y: -distance.lift } : undefined}
      transition={spring.settle}
      style={ok ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}

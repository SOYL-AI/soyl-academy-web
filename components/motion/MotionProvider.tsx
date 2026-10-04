'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Wraps the app once. `reducedMotion="user"` makes every framer-motion
 * component honour the OS "reduce motion" setting: transform and layout
 * animations are dropped, only opacity/colour changes remain.
 * CSS animations are covered by the global rule in globals.css.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

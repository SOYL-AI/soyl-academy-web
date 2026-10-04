'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * True only once we *know* the user is fine with motion.
 *
 * `useReducedMotion()` is `null` during SSR and the first client render, so
 * this is `false` there. Components therefore server-render their complete,
 * static state (readable with no JS, and hydration-safe) and only switch to
 * the animated experience after mount. Anything scroll-pinned or auto-playing
 * must be gated on this.
 */
export function useMotionOk(): boolean {
  return useReducedMotion() === false;
}

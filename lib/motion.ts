/**
 * SOYL motion tokens — the single source of truth for how things move.
 * See docs/motion-system.md.
 *
 * Principle: things have weight. They travel a short distance and settle
 * (spring), they never just fade. Opacity is a supporting actor.
 */

/** Easing for non-spring tweens (matches `--ease-out-expo` in globals.css). */
export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

/** Springs. Pick by feel, not by number. */
export const spring = {
  /** Default. Content arriving and settling. Barely overshoots. */
  settle: { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.9 },
  /** UI state changes (toggles, chips, selection). Quick and crisp. */
  snappy: { type: 'spring' as const, stiffness: 520, damping: 34 },
  /** Small moments of delight (tags popping in, checks). Visible overshoot. */
  playful: { type: 'spring' as const, stiffness: 380, damping: 17 },
  /** Pointer-follow (tilt). Soft so it never feels twitchy. */
  tilt: { stiffness: 180, damping: 18, mass: 0.6 },
};

/** Travel distances (px). Small on purpose. */
export const distance = {
  reveal: 24,
  lift: 6,
};

/** Delay between siblings (s). */
export const stagger = 0.07;

/** How long each step of an auto-playing demo is shown (ms). */
export const DEMO_STEP_MS = 4200;

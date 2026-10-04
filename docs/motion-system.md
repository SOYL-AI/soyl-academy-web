# SOYL Academy Motion System

## Philosophy
Our motion design aims to feel snappy, physical, and intentional. We reject generic "fade-in-up" scrubbing effects in favor of distinct, purposeful interaction points and scroll-driven stories.

## Core Technologies
- **Framer Motion:** Primary engine for complex sequences, layout animations, and physics-based springs.
- **Tailwind CSS:** Utilities used for simple hovers, transform origins, and basic transitions.
- **CSS Animation Primitives:** Reusable global keyframes defined in `globals.css` (e.g., `.press`, `.word-rise`).

## Global Rules
- **Respect Reduced Motion:** All animations **must** degrade gracefully for users who prefer reduced motion. We implement a custom hook `useMotionOk` that manages the SSR boundary while respecting OS-level reduced motion preferences.
- **Immediate Interactivity:** Hover and press states must use snappy physics (no long cubic-bezier delays).
- **Sticky vs. Pinning:** For scroll stories, we prefer native CSS `position: sticky` combined with `useScroll` over heavy DOM manipulation/pinning (e.g., GSAP ScrollTrigger).

## Spring Tokens (`lib/motion.ts`)
We standardize on physical springs instead of traditional easings.

- `spring.settle`: `type: "spring", stiffness: 100, damping: 20, mass: 1`
  - Used for large spatial shifts, entering views, and elements "settling" into place.
- `spring.snappy`: `type: "spring", stiffness: 400, damping: 30`
  - Used for UI interaction, hovers, micro-interactions.
- `spring.playful`: `type: "spring", stiffness: 300, damping: 15, mass: 0.8`
  - Used for Duolingo-style bounces, floating elements, or joyful moments.
- `spring.tilt`: `type: "spring", stiffness: 150, damping: 20`
  - Used for 3D card tilt tracking or physics dragging.

## Reusable Primitives
- **`.press`:** Applied to all interactive buttons to scale down slightly on `:active`, giving physical feedback.
- **`.word-rise`:** A specific sequence for dramatic hero typography entering from a masked baseline.
- **`.float-slow`:** A gentle, continuous Y-axis oscillation for background graphical elements.
- **`TiltCard`:** A wrapper component that applies physics-based 3D rotation tracking the user's mouse pointer.
- **`DrawnUnderline`:** An SVG primitive that "draws" an underline beneath text upon scrolling into view.

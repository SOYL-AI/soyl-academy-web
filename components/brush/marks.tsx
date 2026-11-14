import { cn } from '@/lib/utils';

/**
 * Hand-drawn marks (ADR-033): plain SVG strokes that trace themselves when the page loads (`trigger="load"`) or
 * when their `[data-reveal]` ancestor scrolls in (see `.ink` in globals.css). Server components, decorative,
 * visible without JS and under reduced motion.
 */

export type Ink = 'vermilion' | 'ultramarine' | 'ochre' | 'sap' | 'ink' | 'graphite';

const INK_VAR: Record<Ink, string> = {
  vermilion: 'var(--color-vermilion)',
  ultramarine: 'var(--color-ultramarine)',
  ochre: 'var(--color-ochre)',
  sap: 'var(--color-sap)',
  ink: 'var(--color-ink)',
  graphite: 'var(--color-graphite)',
};

const PATHS = {
  under: { box: '0 0 300 16', d: ['M3 10 C 52 4, 104 13, 156 8 S 252 3, 297 9'] },
  strike: { box: '0 0 300 16', d: ['M2 9 C 60 4, 118 12, 170 7 S 262 4, 298 8', 'M292 12 C 214 9, 132 13, 14 6'] },
  ring: {
    box: '0 0 300 90',
    d: ['M168 8 C 86 2, 8 18, 8 46 C 8 76, 104 86, 186 81 C 266 76, 300 54, 288 30 C 276 8, 196 2, 118 9'],
  },
  scribble: { box: '0 0 300 20', d: ['M4 12 C 60 4, 120 16, 170 8 S 260 6, 296 11', 'M30 17 C 110 12, 190 18, 280 14'] },
} as const;

type MarkName = keyof typeof PATHS;

interface InkPathProps {
  mark: MarkName;
  ink?: Ink;
  /**
   * Stroke width in viewBox units. The box stretches mostly sideways, so near-horizontal strokes keep about this
   * thickness. (No vector-effect: with pathLength it breaks the dash maths and long marks render with gaps.)
   */
  weight?: number;
  /** Trace on page load instead of on scroll-in. */
  load?: boolean;
  /** Extra delay before tracing, in ms. */
  delay?: number;
  className?: string;
}

/** A bare mark in its own box; size it with className. */
export function InkPath({ mark, ink = 'vermilion', weight = 3, load, delay, className }: InkPathProps) {
  const { box, d } = PATHS[mark];
  return (
    <svg
      viewBox={box}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('ink', className)}
      data-draw={load ? 'load' : undefined}
      style={{ color: INK_VAR[ink], ...(delay !== undefined ? { '--ink-d': `${delay}ms` } : {}) } as React.CSSProperties}
    >
      {d.map((path, i) => (
        <path
          key={path}
          d={path}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={i === 0 ? weight : weight * 0.7}
          strokeOpacity={i === 0 ? 1 : 0.85}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

interface MarkedProps {
  children: React.ReactNode;
  mark?: 'under' | 'strike' | 'ring';
  ink?: Ink;
  weight?: number;
  load?: boolean;
  delay?: number;
  className?: string;
}

/** A word or short phrase with a mark under, through or around it. */
export function Marked({ children, mark = 'under', ink = 'vermilion', weight, load, delay, className }: MarkedProps) {
  return (
    <span className={cn('marked', className)}>
      {children}
      <InkPath
        mark={mark}
        ink={ink}
        weight={weight ?? (mark === 'ring' ? 2.5 : mark === 'strike' ? 4 : 3.5)}
        load={load}
        delay={delay}
        className={`ink-${mark}`}
      />
    </span>
  );
}

const ARROWS = {
  /** Curls down and to the right. */
  'down-right': { box: '0 0 120 90', d: ['M6 8 C 30 4, 64 14, 78 40 C 88 58, 92 70, 100 80', 'M86 72 L 100 82 L 106 64'] },
  /** Curls down and to the left. */
  'down-left': { box: '0 0 120 90', d: ['M114 8 C 90 4, 56 14, 42 40 C 32 58, 28 70, 20 80', 'M34 72 L 20 82 L 14 64'] },
  /** A long gentle sweep to the right. */
  right: { box: '0 0 160 50', d: ['M4 32 C 40 10, 96 8, 150 24', 'M134 12 L 151 24 L 134 34'] },
  /** Loops once, then points up. */
  'loop-up': { box: '0 0 110 120', d: ['M14 112 C 30 80, 76 96, 70 70 C 64 46, 30 58, 46 34 C 56 20, 66 14, 70 6', 'M58 14 L 70 4 L 78 18'] },
} as const;

/** A hand-drawn arrow, for annotations. */
export function Arrow({
  to = 'down-right',
  ink = 'ink',
  weight = 2,
  load,
  delay,
  className,
}: {
  to?: keyof typeof ARROWS;
  ink?: Ink;
  weight?: number;
  load?: boolean;
  delay?: number;
  className?: string;
}) {
  const { box, d } = ARROWS[to];
  return (
    <svg
      viewBox={box}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('ink', className)}
      data-draw={load ? 'load' : undefined}
      style={{ color: INK_VAR[ink], ...(delay !== undefined ? { '--ink-d': `${delay}ms` } : {}) } as React.CSSProperties}
    >
      {d.map((path) => (
        <path key={path} d={path} pathLength={1} stroke="currentColor" strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** A handwritten note in the guide's voice. */
export function Note({
  children,
  ink = 'graphite',
  tilt = -2,
  className,
}: {
  children: React.ReactNode;
  ink?: Ink | 'vermilion-ink';
  tilt?: number;
  className?: string;
}) {
  const colour = ink === 'vermilion-ink' ? 'var(--color-vermilion-ink)' : INK_VAR[ink];
  return (
    <span className={cn('hand inline-block', className)} style={{ color: colour, rotate: `${tilt}deg` }}>
      {children}
    </span>
  );
}

/** A small watercolour-like dot (CSS only), for list bullets and eyebrows. */
export function Dab({ ink = 'ochre', className }: { ink?: Ink; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block h-3 w-3 shrink-0', className)}
      style={{
        background: `radial-gradient(circle at 38% 35%, color-mix(in srgb, ${INK_VAR[ink]} 55%, white) 0 28%, ${INK_VAR[ink]} 70%)`,
        borderRadius: '58% 42% 55% 45% / 47% 58% 42% 53%',
        opacity: 0.9,
      }}
    />
  );
}

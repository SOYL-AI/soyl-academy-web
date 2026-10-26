/**
 * Diagrams and visuals are content-as-code (CONTEXT §8): structured specs that the web renders
 * deterministically. Never AI-generated raster images where labels or numbers matter.
 *
 * Raw SVG is allowed but is sanitised at render time (allow-list of elements/attributes,
 * no scripts, no event handlers, no external references) — see threat model.
 */
import { z } from 'zod/v4';

const Point = z.tuple([z.number(), z.number()]);

export const SvgVisual = z.object({
  kind: z.literal('svg'),
  /** A complete <svg> element with a viewBox. Sanitised before rendering. */
  spec: z.string().startsWith('<svg').max(60_000),
  alt: z.string().min(5),
  caption: z.string().optional(),
});

export const PlotVisual = z.object({
  kind: z.literal('plot'),
  spec: z.object({
    x: z.object({ min: z.number(), max: z.number(), label: z.string().optional() }),
    y: z.object({ min: z.number(), max: z.number(), label: z.string().optional() }),
    /**
     * `expr` is a function of x in this grammar only (checked at pipeline stage 4, parsed without eval
     * by the renderer; ADR-007): numbers, x, pi, e; + - * / and ^ (right-associative), unary minus,
     * parentheses; sin cos tan asin acos atan sqrt abs ln log exp floor ceil (log = log10, ln = natural);
     * implicit multiplication only before a name or "(" (2x, 2(x+1), (x+1)(x-1), 3sin(x)), never before a
     * number (x2, e3 are errors; no 1e3 notation). Example: "x^2 - 2x + 1".
     */
    functions: z
      .array(z.object({ expr: z.string().min(1).max(200), label: z.string().optional(), domain: Point.optional() }))
      .default([]),
    /**
     * Marked points. Lint requires each to lie on one of the functions (or a vline/hline) unless
     * `on_curve: false`; when any marked point is a zero of a function, every real zero of that
     * function in view must be marked.
     */
    points: z.array(z.object({ at: Point, label: z.string().optional(), on_curve: z.boolean().optional() })).default([]),
    /** Vertical lines x = c (asymptotes, x = 3, axes of symmetry). Contract v2 (M2). */
    vlines: z.array(z.object({ x: z.number(), label: z.string().optional(), dashed: z.boolean().optional() })).optional(),
    /** Horizontal lines y = c. Contract v2 (M2). */
    hlines: z.array(z.object({ y: z.number(), label: z.string().optional(), dashed: z.boolean().optional() })).optional(),
    series: z
      .array(z.object({ label: z.string(), points: z.array(Point), kind: z.enum(['line', 'bar', 'scatter']).default('line') }))
      .default([]),
    grid: z.boolean().default(true),
    /** Points sampled per function by the renderer (default 200). */
    samples: z.number().int().min(10).max(2000).optional(),
  }),
  alt: z.string().min(5),
  caption: z.string().optional(),
});

export const LABEL_POSITIONS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'] as const;

/**
 * A geometry point: a bare [x, y], or an object with label options. `label: false` hides the label
 * (helper points such as ray ends); a string replaces the point name as the label; `label_position`
 * is a compass hint for crowded vertices.
 */
export const GeometryPoint = z.union([
  Point,
  z.object({ at: Point, label: z.union([z.string(), z.literal(false)]).optional(), label_position: z.enum(LABEL_POSITIONS).optional() }),
]);
export type GeometryPoint = z.infer<typeof GeometryPoint>;

/** Coordinates of a geometry point in either form. */
export function pointAt(p: GeometryPoint): [number, number] {
  return Array.isArray(p) ? p : p.at;
}

const Mark = z.union([z.literal(1), z.literal(2), z.literal(3)]);

/**
 * Geometry figures drawn from computed coordinates.
 *
 * Coordinate system: origin at the BOTTOM-LEFT of the canvas, x to the right, **y up** (maths
 * convention; the renderer flips for the screen). Every point lies in [0, width] × [0, height] and
 * one drawing unit is the same length on both axes. Numeric length labels share one scale unless
 * `not_to_scale` is set; `scale` states it explicitly (drawing units per real unit). Stage 4 checks
 * that referenced points exist, points and circles stay on the canvas, right-angle marks measure 90°,
 * degree labels match the drawn angle, and length labels agree with the scale.
 */
export const GeometryVisual = z.object({
  kind: z.literal('geometry'),
  spec: z.object({
    width: z.number().positive().default(10),
    height: z.number().positive().default(10),
    points: z.record(z.string(), GeometryPoint),
    segments: z
      .array(
        z.object({
          from: z.string(),
          to: z.string(),
          label: z.string().optional(),
          dashed: z.boolean().optional(),
          /** Equal-length tick marks (1–3 ticks; same count = equal sides). */
          ticks: Mark.optional(),
          /** Parallel marks (1–3 arrowheads; same count = parallel). */
          arrows: Mark.optional(),
        }),
      )
      .default([]),
    /** Infinite lines through two points. */
    lines: z.array(z.object({ through: z.tuple([z.string(), z.string()]), label: z.string().optional(), dashed: z.boolean().optional() })).default([]),
    /** Half-lines from a point through another. */
    rays: z.array(z.object({ from: z.string(), through: z.string(), label: z.string().optional(), dashed: z.boolean().optional() })).default([]),
    circles: z.array(z.object({ center: z.string(), radius: z.number().positive(), label: z.string().optional() })).default([]),
    angles: z
      .array(
        z.object({
          at: z.string(),
          from: z.string(),
          to: z.string(),
          label: z.string().optional(),
          right: z.boolean().optional(),
          /** Arc count for equal-angle marks (1–3). */
          arcs: Mark.optional(),
        }),
      )
      .default([]),
    polygons: z
      .array(
        z.object({
          vertices: z.array(z.string()).min(3),
          fill: z.boolean().optional(),
          /** Visual emphasis, e.g. to tell two triangles apart in a proof step. */
          highlight: z.enum(['shade', 'outline', 'accent']).optional(),
        }),
      )
      .default([]),
    /** Drawing units per real unit, e.g. { unit: 'cm', per_unit: 0.5 }. */
    scale: z.object({ unit: z.enum(['mm', 'cm', 'm', 'km']), per_unit: z.number().positive() }).optional(),
    /** The figure is deliberately not drawn to scale (say so in the caption); length checks are skipped. */
    not_to_scale: z.boolean().optional(),
  }),
  alt: z.string().min(5),
  caption: z.string().optional(),
});

export const ChemVisual = z.object({
  kind: z.literal('chem'),
  spec: z.union([
    z.object({ smiles: z.string().min(1), name: z.string().optional() }),
    /** A reaction in mhchem notation, e.g. "2H2 + O2 -> 2H2O". */
    z.object({ equation: z.string().min(1) }),
  ]),
  alt: z.string().min(5),
  caption: z.string().optional(),
});

export const TableVisual = z.object({
  kind: z.literal('table'),
  /** Header and body cells are inline Markdown with $…$ maths (no block elements, no HTML, no links). */
  spec: z.object({
    headers: z.array(z.string()).min(1),
    rows: z.array(z.array(z.string())).min(1),
  }),
  alt: z.string().min(5),
  caption: z.string().optional(),
});

export const FlowVisual = z.object({
  kind: z.literal('flow'),
  spec: z.object({
    direction: z.enum(['LR', 'TB']).default('LR'),
    nodes: z.array(z.object({ id: z.string(), label: z.string() })).min(2),
    edges: z.array(z.object({ from: z.string(), to: z.string(), label: z.string().optional() })).default([]),
  }),
  alt: z.string().min(5),
  caption: z.string().optional(),
});

/** Flow: the renderer may switch LR to TB in narrow containers. Geometry conventions: see GeometryVisual. */
export const Visual = z.discriminatedUnion('kind', [
  SvgVisual,
  PlotVisual,
  GeometryVisual,
  ChemVisual,
  TableVisual,
  FlowVisual,
]);
export type Visual = z.infer<typeof Visual>;

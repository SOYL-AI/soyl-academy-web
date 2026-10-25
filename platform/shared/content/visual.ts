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
    functions: z
      .array(z.object({ expr: z.string(), label: z.string().optional(), domain: Point.optional() }))
      .default([]),
    points: z.array(z.object({ at: Point, label: z.string().optional() })).default([]),
    series: z
      .array(z.object({ label: z.string(), points: z.array(Point), kind: z.enum(['line', 'bar', 'scatter']).default('line') }))
      .default([]),
    grid: z.boolean().default(true),
  }),
  alt: z.string().min(5),
  caption: z.string().optional(),
});

export const GeometryVisual = z.object({
  kind: z.literal('geometry'),
  spec: z.object({
    width: z.number().positive().default(10),
    height: z.number().positive().default(10),
    points: z.record(z.string(), Point),
    segments: z.array(z.object({ from: z.string(), to: z.string(), label: z.string().optional(), dashed: z.boolean().optional() })).default([]),
    circles: z.array(z.object({ center: z.string(), radius: z.number().positive(), label: z.string().optional() })).default([]),
    angles: z.array(z.object({ at: z.string(), from: z.string(), to: z.string(), label: z.string().optional(), right: z.boolean().optional() })).default([]),
    polygons: z.array(z.object({ vertices: z.array(z.string()).min(3), fill: z.boolean().optional() })).default([]),
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

export const Visual = z.discriminatedUnion('kind', [
  SvgVisual,
  PlotVisual,
  GeometryVisual,
  ChemVisual,
  TableVisual,
  FlowVisual,
]);
export type Visual = z.infer<typeof Visual>;

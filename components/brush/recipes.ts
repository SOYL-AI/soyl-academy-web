/**
 * Painting recipes for the marketing artwork (ADR-033). Each recipe draws in logical (CSS pixel) units with a
 * top-left origin and returns its strokes as steps, so the engine can paint them one at a time.
 *
 * Every recipe takes only JSON options, because the <BrushArt> island receives them from server components.
 */
import type { PaintContext, Recipe, Step } from './random';
import { PALETTE, type Pigment } from './palette';

type Pt = [number, number];

const TAU = Math.PI * 2;

function pigment(name: Pigment | 'ink' | 'graphite') {
  return PALETTE[name];
}

/** A soft watercolour bloom. */
function bloom(ctx: PaintContext, x: number, y: number, r: number, colour: string, opacity: number): Step {
  const { b } = ctx;
  return () => {
    b.noStroke();
    b.noHatch();
    b.fillBleed(0.28, 'out');
    b.fillTexture(0.55, 0.45);
    b.fill(colour, opacity);
    b.circle(x, y, r, 0.9);
    b.noFill();
  };
}

/** A pencil / pen line along points, as one spline. */
function strokeAlong(ctx: PaintContext, pts: [number, number, number][], brush: string, colour: string, weight: number): Step {
  const { b } = ctx;
  return () => {
    if (pts.length < 2) return;
    b.noFill();
    b.set(brush, colour, weight);
    b.spline(pts, 0.5);
  };
}

/* ── Thoughtprint: a fingerprint of thinking, drawn ridge by ridge ─────────────────────────────────────────── */

export interface ThoughtprintOptions {
  /** Ridges (default 18). */
  ridges?: number;
  /** Watercolour blooms behind the print (default true). */
  blooms?: boolean;
  /** Mark the "turning point" with a vermilion ring (default true). */
  turn?: boolean;
  /** Line weight multiplier. */
  weight?: number;
}

export function thoughtprintSteps(ctx: PaintContext, opts: ThoughtprintOptions): Step[] {
  const { b, w, h, rand } = ctx;
  const steps: Step[] = [];
  const cx = w / 2;
  const cy = h * 0.5;
  const R = Math.min(w, h) * 0.44;
  const ridges = opts.ridges ?? 17;
  const weight = opts.weight ?? 1;
  const tilt = -0.28 + rand() * 0.14;
  const phase = rand() * 100;

  if (opts.blooms !== false) {
    steps.push(bloom(ctx, cx - R * 0.5, cy - R * 0.42, R * 0.38, PALETTE.ochre, 80));
    steps.push(bloom(ctx, cx + R * 0.62, cy + R * 0.3, R * 0.32, PALETTE.ultramarine, 60));
    steps.push(bloom(ctx, cx - R * 0.15, cy + R * 0.55, R * 0.2, PALETTE.vermilion, 55));
  }

  const gap = R / (ridges + 1);
  const coloured = new Map<number, string>([
    [Math.floor(ridges * 0.3), PALETTE.ultramarine],
    [Math.floor(ridges * 0.58), PALETTE.vermilion],
  ]);
  let turnAt: Pt | null = null;

  // A loop-type print: the core is a tight hairpin, ridges wrap it and open into arches at the base.
  for (let i = 0; i < ridges; i++) {
    const r = gap * (i + 1);
    const ox = cx + Math.sin(i * 0.22 + phase) * gap * 0.35;
    const oy = cy - i * gap * 0.18;
    const outer = i > ridges * 0.55;
    const open = outer ? 0.55 + (i / ridges) * 0.5 : 0.18 + rand() * 0.12;
    const start = Math.PI / 2 + open / 2;
    const sweep = TAU - open;
    // Break the longer ridges into 2–3 strokes, as real ridges break.
    const breaks = i < 4 ? 1 : 1 + Math.floor(rand() * 2.4);
    const segLen = sweep / breaks;
    for (let s = 0; s < breaks; s++) {
      const a0 = start + s * segLen + (s > 0 ? 0.05 + rand() * 0.06 : 0);
      const a1 = start + (s + 1) * segLen;
      const pts: [number, number, number][] = [];
      const n = Math.max(8, Math.ceil(((a1 - a0) * r) / 9));
      for (let k = 0; k <= n; k++) {
        const a = a0 + ((a1 - a0) * k) / n;
        const wob = 1 + 0.035 * (b.noise(Math.cos(a) * 0.9 + phase, Math.sin(a) * 0.9 + i * 0.05) - 0.5) * 2;
        // Taller than wide, with a flatter base where the arches open.
        const ex = Math.cos(a) * r * 0.78 * wob;
        const ey = Math.sin(a) * r * (Math.sin(a) > 0 ? 0.92 : 1.08) * wob;
        const x = ox + ex * Math.cos(tilt) - ey * Math.sin(tilt);
        const y = oy + ex * Math.sin(tilt) + ey * Math.cos(tilt);
        const p = 0.6 + 0.45 * Math.sin((k / n) * Math.PI);
        pts.push([x, y, p]);
      }
      const colour = coloured.get(i) ?? (i % 5 === 4 ? PALETTE.graphite : PALETTE.ink);
      const brush = i % 3 === 0 && !coloured.has(i) ? 'HB' : 'pen';
      steps.push(strokeAlong(ctx, pts, brush, colour, (coloured.has(i) ? 1.7 : 1.2) * weight));
      if (coloured.get(i) === PALETTE.vermilion && s === 0 && pts.length > 4) {
        const mid = pts[Math.floor(pts.length * 0.3)];
        turnAt = [mid[0], mid[1]];
      }
    }
  }

  if (opts.turn !== false && turnAt) {
    const [tx, ty] = turnAt;
    steps.push(() => {
      b.noFill();
      b.set('pen', PALETTE.vermilion, 1.6);
      b.circle(tx, ty, gap * 1.4, 0.7);
    });
  }
  return steps;
}

/* ── Wash: soft watercolour blooms, for section backgrounds ────────────────────────────────────────────────── */

export interface WashOptions {
  /** Blooms as [x, y, radius] fractions of the canvas (radius of the smaller side), plus pigment and opacity. */
  blooms: { x: number; y: number; r: number; pigment: Pigment; opacity?: number }[];
}

export function washSteps(ctx: PaintContext, opts: WashOptions): Step[] {
  const s = Math.min(ctx.w, ctx.h);
  return opts.blooms.map((bl) => bloom(ctx, bl.x * ctx.w, bl.y * ctx.h, bl.r * s, pigment(bl.pigment), bl.opacity ?? 60));
}

/* ── Mission path: a hand-drawn line through the five stages ─────────────────────────────────────────────────── */

export interface PathOptions {
  /** Station centres as fractions of the canvas. */
  stops: Pt[];
  pigments: Pigment[];
  /** Index of the lit stage (gets a fuller wash). */
  lit?: number;
}

export function pathSteps(ctx: PaintContext, opts: PathOptions): Step[] {
  const { b, w, h, rand } = ctx;
  const steps: Step[] = [];
  const stops = opts.stops.map(([x, y]) => [x * w, y * h] as Pt);
  const rad = Math.min(34, Math.max(24, Math.min(w, h) * 0.16));

  // Watercolour dabs under each station.
  stops.forEach(([x, y], i) => {
    const lit = opts.lit === i;
    steps.push(bloom(ctx, x + (rand() - 0.5) * 6, y + (rand() - 0.5) * 6, rad * (lit ? 1.5 : 1.05), pigment(opts.pigments[i % opts.pigments.length]), lit ? 140 : 95));
  });

  // The path itself, wandering between stations.
  for (let i = 0; i < stops.length - 1; i++) {
    const [x0, y0] = stops[i];
    const [x1, y1] = stops[i + 1];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    const pts: [number, number, number][] = [];
    const n = 10;
    const bend = (rand() - 0.5) * len * 0.22;
    for (let k = 0; k <= n; k++) {
      const t = k / n;
      // Start and end outside the station rings.
      const tt = (rad * 1.15) / len + t * (1 - (rad * 2.3) / len);
      const curve = Math.sin(tt * Math.PI) * bend;
      pts.push([x0 + dx * tt + nx * curve, y0 + dy * tt + ny * curve, 0.7 + 0.3 * Math.sin(t * Math.PI)]);
    }
    steps.push(strokeAlong(ctx, pts, 'pen', PALETTE.graphite, 1.1));
  }

  // Station rings.
  stops.forEach(([x, y], i) => {
    steps.push(() => {
      b.noFill();
      b.set('pen', PALETTE.ink, opts.lit === i ? 1.6 : 1.2);
      b.circle(x, y, rad, 0.5);
    });
  });
  return steps;
}

/* ── Loop: nodes around an ellipse, joined by arrows ─────────────────────────────────────────────────────────── */

export interface LoopOptions {
  nodes: number;
  pigments: Pigment[];
}

export function loopSteps(ctx: PaintContext, opts: LoopOptions): Step[] {
  const { b, w, h, rand } = ctx;
  const steps: Step[] = [];
  const cx = w / 2;
  const cy = h / 2;
  const rx = w * 0.38;
  const ry = h * 0.36;
  const pos = (i: number): Pt => {
    const a = -Math.PI / 2 + (i / opts.nodes) * TAU;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
  };

  
  for (let i = 0; i < opts.nodes; i++) {
    const [x, y] = pos(i);
    steps.push(bloom(ctx, x, y, Math.min(w, h) * 0.07, pigment(opts.pigments[i % opts.pigments.length]), 70));
  }

  for (let i = 0; i < opts.nodes; i++) {
    const a0 = -Math.PI / 2 + (i / opts.nodes) * TAU + 0.36;
    const a1 = -Math.PI / 2 + ((i + 1) / opts.nodes) * TAU - 0.36;
    const pts: [number, number, number][] = [];
    const n = 12;
    const out = 1 + (rand() - 0.5) * 0.06;
    for (let k = 0; k <= n; k++) {
      const a = a0 + ((a1 - a0) * k) / n;
      pts.push([cx + Math.cos(a) * rx * out, cy + Math.sin(a) * ry * out, 0.6 + 0.4 * Math.sin((k / n) * Math.PI)]);
    }
    steps.push(strokeAlong(ctx, pts, 'pen', PALETTE.graphite, 1.1));
    // Arrow head at the end, along the tangent.
    const [ex, ey] = [pts[n][0], pts[n][1]];
    const [px, py] = [pts[n - 1][0], pts[n - 1][1]];
    const ang = Math.atan2(ey - py, ex - px);
    const len = 11;
    steps.push(() => {
      b.set('pen', PALETTE.ink, 1.2);
      b.line(ex, ey, ex - Math.cos(ang - 0.5) * len, ey - Math.sin(ang - 0.5) * len);
      b.line(ex, ey, ex - Math.cos(ang + 0.5) * len, ey - Math.sin(ang + 0.5) * len);
    });
  }
  return steps;
}

/* ── Storyline: one meandering pencil line with milestones (the footer, the Story) ───────────────────────────── */

export interface StorylineOptions {
  /** Milestones along the line. */
  dots?: number;
}

export function storylineSteps(ctx: PaintContext, opts: StorylineOptions): Step[] {
  const { b, w, h, rand } = ctx;
  const steps: Step[] = [];
  const dots = opts.dots ?? 7;
  const pts: [number, number, number][] = [];
  const n = 60;
  const phase = rand() * 10;
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const x = -10 + t * (w + 20);
    const y = h * 0.55 + Math.sin(t * Math.PI * 2.2 + phase) * h * 0.18 + (b.noise(t * 3 + phase) - 0.5) * h * 0.2;
    pts.push([x, y, 0.6 + 0.4 * b.noise(t * 5)]);
  }
  const pig: Pigment[] = ['ochre', 'ultramarine', 'vermilion', 'sap'];
  for (let d = 0; d < dots; d++) {
    const idx = Math.round(((d + 0.5) / dots) * n);
    const [x, y] = pts[idx];
    steps.push(bloom(ctx, x, y, Math.min(30, h * 0.16) * (0.7 + rand() * 0.6), pigment(pig[d % pig.length]), 100));
  }
  // Draw the line in a few pieces so it travels across the page.
  const pieces = 6;
  for (let p = 0; p < pieces; p++) {
    const a = Math.floor((p / pieces) * n);
    const z = Math.floor(((p + 1) / pieces) * n);
    steps.push(strokeAlong(ctx, pts.slice(a, z + 1), 'pen', PALETTE.ink, 1.5));
  }
  for (let d = 0; d < dots; d++) {
    const idx = Math.round(((d + 0.5) / dots) * n);
    const [x, y] = pts[idx];
    steps.push(() => {
      b.noFill();
      b.set('pen', PALETTE.ink, 1);
      b.circle(x, y, 5 + rand() * 2, 0.4);
    });
  }
  return steps;
}

/* ── Registry: what <BrushArt art="…"> can paint ─────────────────────────────────────────────────────────────── */

export type ArtName = 'thoughtprint' | 'wash' | 'path' | 'loop' | 'storyline';

export type ArtOptions = {
  thoughtprint: ThoughtprintOptions;
  wash: WashOptions;
  path: PathOptions;
  loop: LoopOptions;
  storyline: StorylineOptions;
};

export function recipeFor<A extends ArtName>(art: A, options: ArtOptions[A]): Recipe {
  switch (art) {
    case 'thoughtprint':
      return (ctx) => thoughtprintSteps(ctx, options as ThoughtprintOptions);
    case 'wash':
      return (ctx) => washSteps(ctx, options as WashOptions);
    case 'path':
      return (ctx) => pathSteps(ctx, options as PathOptions);
    case 'loop':
      return (ctx) => loopSteps(ctx, options as LoopOptions);
    case 'storyline':
      return (ctx) => storylineSteps(ctx, options as StorylineOptions);
    default:
      return () => [];
  }
}

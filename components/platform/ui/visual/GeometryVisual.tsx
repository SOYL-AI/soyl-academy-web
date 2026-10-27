/**
 * `geometry` visual: points, segments (with equal-length ticks and parallel arrows), infinite lines and
 * rays (clipped to the canvas), circles, angles (1–3 arcs or a right-angle mark) and polygons (fill or
 * highlight) from named coordinates. Maths convention: origin bottom-left, y up. Server-renderable SVG.
 */
import type { ReactNode } from 'react';
import { pointAt, type GeometryPoint, type Visual } from '@/platform/shared/content/visual';
import { clipParam, LABEL_PROPS, round, svgLabel, type Box } from './svg-utils';
import s from './visual.module.css';

export type GeometrySpec = Extract<Visual, { kind: 'geometry' }>['spec'];
type P = { x: number; y: number };

const SIZE = 300;
const PAD = 26;
/** Lines and rays stop this far inside the viewBox edge. */
const CLIP_INSET = 3;
const DASH = '6 5';

export function GeometryVisual({ spec, alt }: { spec: GeometrySpec; alt: string }) {
  const width = spec.width > 0 ? spec.width : 10;
  const height = spec.height > 0 ? spec.height : 10;
  const k = SIZE / Math.max(width, height);
  const vw = width * k + 2 * PAD;
  const vh = height * k + 2 * PAD;
  const box: Box = { x0: CLIP_INSET, y0: CLIP_INSET, x1: vw - CLIP_INSET, y1: vh - CLIP_INSET };
  const pts = new Map<string, P>();
  const labels = new Map<string, { text: string | false; position?: string }>();
  for (const [name, raw] of Object.entries(spec.points ?? {}) as [string, GeometryPoint][]) {
    const [x, y] = pointAt(raw);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    pts.set(name, { x: PAD + x * k, y: PAD + (height - y) * k });
    if (!Array.isArray(raw)) labels.set(name, { text: raw.label ?? name, position: raw.label_position });
  }
  const all = [...pts.values()];
  const mean = (list: P[]): P | null =>
    list.length ? { x: list.reduce((a, p) => a + p.x, 0) / list.length, y: list.reduce((a, p) => a + p.y, 0) / list.length } : null;
  const centroid = mean(all) ?? { x: vw / 2, y: vh / 2 };
  const get = (name: string) => pts.get(name);

  // Neighbours (segments and polygon edges) give each label a local "inside" to move away from,
  // so figures drawn side by side each get their labels outside their own shape.
  const neighbours = new Map<string, Set<string>>();
  const link = (a: string, b: string) => {
    if (a === b) return;
    if (!neighbours.has(a)) neighbours.set(a, new Set());
    if (!neighbours.has(b)) neighbours.set(b, new Set());
    neighbours.get(a)!.add(b);
    neighbours.get(b)!.add(a);
  };
  (spec.segments ?? []).forEach((seg) => link(seg.from, seg.to));
  (spec.polygons ?? []).forEach((poly) => poly.vertices.forEach((v, i) => link(v, poly.vertices[(i + 1) % poly.vertices.length])));
  // Lines and rays add directions (not neighbours): a line continues both ways through each of its points,
  // a ray leaves its start point and continues both ways through its "through" point. Opposite directions
  // cancel, so a point in the middle of a line gets its label beside the line, never on it.
  const extraDirs = new Map<string, P[]>();
  const addDir = (name: string, d: P) => {
    if (!pts.has(name)) return;
    if (!extraDirs.has(name)) extraDirs.set(name, []);
    extraDirs.get(name)!.push(d);
  };
  const lineDirs: { a: P; u: P; spec: { label?: string; dashed?: boolean }; ray: boolean }[] = [];
  (spec.lines ?? []).forEach((ln) => {
    if (!Array.isArray(ln.through)) return;
    const [na, nb] = ln.through;
    const a = get(na);
    const b = get(nb);
    const u = a && b ? norm({ x: b.x - a.x, y: b.y - a.y }) : null;
    if (!a || !u) return;
    for (const n of [na, nb]) {
      addDir(n, u);
      addDir(n, { x: -u.x, y: -u.y });
    }
    lineDirs.push({ a, u, spec: ln, ray: false });
  });
  (spec.rays ?? []).forEach((ray) => {
    const a = get(ray.from);
    const b = get(ray.through);
    const u = a && b ? norm({ x: b.x - a.x, y: b.y - a.y }) : null;
    if (!a || !u) return;
    addDir(ray.from, u);
    addDir(ray.through, u);
    addDir(ray.through, { x: -u.x, y: -u.y });
    lineDirs.push({ a, u, spec: ray, ray: true });
  });

  /** Centre of the polygon containing all given points, else of their neighbourhood, else of the figure. */
  const localCentre = (...names: string[]): P => {
    const poly = (spec.polygons ?? []).find((pg) => names.every((n) => pg.vertices.includes(n)));
    if (poly) return mean(poly.vertices.map((v) => pts.get(v)).filter((v): v is P => !!v)) ?? centroid;
    const near = names.flatMap((n) => [n, ...(neighbours.get(n) ?? [])]);
    const uniq = [...new Set(near)].map((n) => pts.get(n)).filter((v): v is P => !!v);
    return uniq.length > names.length ? mean(uniq)! : centroid;
  };
  const awayFrom = (p: P, from: P, dist: number): P => {
    const dx = p.x - from.x;
    const dy = p.y - from.y;
    const len = Math.hypot(dx, dy);
    return len < 1e-6 ? { x: p.x + dist * 0.7, y: p.y - dist * 0.7 } : { x: p.x + (dx / len) * dist, y: p.y + (dy / len) * dist };
  };
  /** Label direction for a vertex: opposite the mean direction to its neighbours (and lines/rays through it). */
  const labelPos = (name: string, p: P, dist: number): P => {
    const dirs = [...(neighbours.get(name) ?? [])]
      .map((n) => pts.get(n))
      .filter((v): v is P => !!v)
      .map((q) => {
        const len = Math.hypot(q.x - p.x, q.y - p.y) || 1;
        return { x: (q.x - p.x) / len, y: (q.y - p.y) / len };
      })
      .concat(extraDirs.get(name) ?? []);
    if (dirs.length === 0) return awayFrom(p, centroid, dist);
    const ux = dirs.reduce((a, d) => a + d.x, 0);
    const uy = dirs.reduce((a, d) => a + d.y, 0);
    const len = Math.hypot(ux, uy);
    // Collinear directions on both sides (a point on a line): put the label above/below the line.
    if (len < 0.2) {
      const nx = -dirs[0].y;
      const ny = dirs[0].x;
      return ny <= 0 ? { x: p.x + nx * dist, y: p.y + ny * dist } : { x: p.x - nx * dist, y: p.y - ny * dist };
    }
    return { x: p.x - (ux / len) * dist, y: p.y - (uy / len) * dist };
  };
  const anchorFor = (from: P, to: P) => (Math.abs(to.x - from.x) < 3 ? 'middle' : to.x > from.x ? 'start' : 'end');
  /** Unit normal to u on the side away from `inside`. */
  const outward = (at: P, u: P, inside: P): P => {
    const n = { x: -u.y, y: u.x };
    return (at.x + n.x - inside.x) ** 2 + (at.y + n.y - inside.y) ** 2 < (at.x - inside.x) ** 2 + (at.y - inside.y) ** 2 ? { x: -n.x, y: -n.y } : n;
  };
  const text = (key: string, at: P, label: string, anchor: 'start' | 'middle' | 'end' = 'middle', bold = false) => (
    <text key={key} {...LABEL_PROPS} x={round(at.x)} y={round(at.y)} textAnchor={anchor} fontWeight={bold ? 600 : undefined}>
      {svgLabel(label)}
    </text>
  );

  // Layers, bottom to top: polygon fills, circles, lines/rays, segments, highlight outlines, angles, points.
  const fills: ReactNode[] = [];
  const outlines: ReactNode[] = [];
  const out: ReactNode[] = [];

  (spec.polygons ?? []).forEach((poly, i) => {
    const vs = poly.vertices.map(get);
    if (vs.some((v) => !v)) return;
    const d = vs.map((v, j) => `${j ? 'L' : 'M'}${round(v!.x)} ${round(v!.y)}`).join('') + 'Z';
    const hl = poly.highlight;
    if (hl === 'outline' || hl === 'accent') {
      // Fill below everything; the accent outline goes above the segments so it is not painted over.
      const fill = hl === 'accent' ? 'var(--diagram-accent)' : poly.fill ? 'var(--diagram-fill)' : 'none';
      fills.push(<path key={`poly${i}`} d={d} fill={fill} fillOpacity={hl === 'accent' ? 0.16 : undefined} stroke="none" data-highlight={hl} />);
      outlines.push(
        <path key={`polyo${i}`} d={d} fill="none" stroke="var(--diagram-accent)" strokeWidth={hl === 'outline' ? 3.25 : 2.5} strokeLinejoin="round" data-highlight={hl} />,
      );
    } else {
      const filled = poly.fill || hl === 'shade';
      fills.push(
        <path key={`poly${i}`} d={d} fill={filled ? 'var(--diagram-fill)' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinejoin="round" data-highlight={hl} />,
      );
    }
  });

  (spec.circles ?? []).forEach((c, i) => {
    const center = get(c.center);
    if (!center || !(c.radius > 0)) return;
    const r = c.radius * k;
    out.push(<circle key={`c${i}`} cx={round(center.x)} cy={round(center.y)} r={round(r)} fill="none" stroke="var(--diagram-accent)" strokeWidth={2} />);
    if (c.label) out.push(text(`cl${i}`, { x: center.x + r * Math.SQRT1_2 + 4, y: center.y - r * Math.SQRT1_2 - 4 }, c.label, 'start'));
  });

  lineDirs.forEach(({ a, u, spec: ln, ray }, i) => {
    const range = clipParam(a, u, box, ray ? 0 : -Infinity, Infinity);
    if (!range) return;
    const [t0, t1] = range;
    const start = { x: a.x + u.x * t0, y: a.y + u.y * t0 };
    const end = { x: a.x + u.x * t1, y: a.y + u.y * t1 };
    const kind = ray ? 'ray' : 'line';
    // A ray's stroke stops short of the arrow tip so the line cap does not poke through it.
    const stop = ray ? Math.max(t0, t1 - 4) : t1;
    out.push(
      <line
        key={`${kind}${i}`}
        data-mark={kind}
        x1={round(start.x)}
        y1={round(start.y)}
        x2={round(a.x + u.x * stop)}
        y2={round(a.y + u.y * stop)}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeDasharray={ln.dashed ? DASH : undefined}
        strokeLinecap="round"
      />,
    );
    const n = outward(end, u, centroid);
    if (ray) {
      const base = { x: end.x - u.x * 9, y: end.y - u.y * 9 };
      const w1 = { x: base.x + n.x * 4.5, y: base.y + n.y * 4.5 };
      const w2 = { x: base.x - n.x * 4.5, y: base.y - n.y * 4.5 };
      out.push(
        <path key={`rayh${i}`} data-mark="arrowhead" d={`M${round(end.x)} ${round(end.y)}L${round(w1.x)} ${round(w1.y)}L${round(w2.x)} ${round(w2.y)}Z`} fill="currentColor" stroke="none" />,
      );
    }
    if (ln.label) {
      const back = Math.min(ray ? 24 : 18, (t1 - t0) / 2);
      out.push(text(`${kind}l${i}`, { x: end.x - u.x * back + n.x * 12, y: end.y - u.y * back + n.y * 12 + 4 }, ln.label));
    }
  });

  (spec.segments ?? []).forEach((seg, i) => {
    const a = get(seg.from);
    const b = get(seg.to);
    if (!a || !b) return;
    out.push(
      <line key={`s${i}`} x1={round(a.x)} y1={round(a.y)} x2={round(b.x)} y2={round(b.y)} stroke="currentColor" strokeWidth={2} strokeDasharray={seg.dashed ? DASH : undefined} strokeLinecap="round" />,
    );
    const u = norm({ x: b.x - a.x, y: b.y - a.y });
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    if (u && (seg.ticks || seg.arrows)) {
      const n = { x: -u.y, y: u.x };
      const at = (c: P, along: number, across: number) => `${round(c.x + u.x * along + n.x * across)} ${round(c.y + u.y * along + n.y * across)}`;
      if (seg.ticks) {
        const count = markCount(seg.ticks);
        let d = '';
        for (let j = 0; j < count; j++) {
          const off = (j - (count - 1) / 2) * 4;
          d += `M${at(mid, off, 5)}L${at(mid, off, -5)}`;
        }
        out.push(<path key={`st${i}`} data-mark="ticks" d={d} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />);
      }
      if (seg.arrows) {
        const count = markCount(seg.arrows);
        // With ticks too, the chevrons sit a little towards `to`.
        const centre = seg.ticks ? { x: mid.x + u.x * 14, y: mid.y + u.y * 14 } : mid;
        let d = '';
        for (let j = 0; j < count; j++) {
          const tip = (j - (count - 1) / 2) * 5 + 3;
          d += `M${at(centre, tip - 6, 4.5)}L${at(centre, tip, 0)}L${at(centre, tip - 6, -4.5)}`;
        }
        out.push(<path key={`sa${i}`} data-mark="arrows" d={d} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />);
      }
    }
    if (seg.label && u) {
      // Perpendicular offset, on the side away from the shape this segment belongs to.
      const n = outward(mid, u, localCentre(seg.from, seg.to));
      out.push(text(`sl${i}`, { x: mid.x + n.x * 14, y: mid.y + n.y * 14 + 4 }, seg.label));
    }
  });

  out.push(...outlines);

  (spec.angles ?? []).forEach((ang, i) => {
    const v = get(ang.at);
    const a = get(ang.from);
    const b = get(ang.to);
    if (!v || !a || !b) return;
    const u1 = norm({ x: a.x - v.x, y: a.y - v.y });
    const u2 = norm({ x: b.x - v.x, y: b.y - v.y });
    if (!u1 || !u2) return;
    let labelDist = 34;
    if (ang.right) {
      const r = 12;
      const p1 = { x: v.x + u1.x * r, y: v.y + u1.y * r };
      const p2 = { x: p1.x + u2.x * r, y: p1.y + u2.y * r };
      const p3 = { x: v.x + u2.x * r, y: v.y + u2.y * r };
      out.push(<path key={`a${i}`} data-mark="right-angle" d={`M${round(p1.x)} ${round(p1.y)}L${round(p2.x)} ${round(p2.y)}L${round(p3.x)} ${round(p3.y)}`} fill="none" stroke="var(--diagram-accent)" strokeWidth={1.75} />);
    } else {
      const t1 = Math.atan2(u1.y, u1.x);
      let delta = Math.atan2(u2.y, u2.x) - t1;
      while (delta <= -Math.PI) delta += 2 * Math.PI;
      while (delta > Math.PI) delta -= 2 * Math.PI;
      const count = markCount(ang.arcs);
      // Equal-angle marks: 1–3 concentric arcs, 4 px apart.
      for (let j = 0; j < count; j++) {
        const r = 20 + j * 4;
        const s1 = { x: v.x + Math.cos(t1) * r, y: v.y + Math.sin(t1) * r };
        const s2 = { x: v.x + Math.cos(t1 + delta) * r, y: v.y + Math.sin(t1 + delta) * r };
        out.push(
          <path key={`a${i}-${j}`} data-mark="arc" d={`M${round(s1.x)} ${round(s1.y)}A${r} ${r} 0 0 ${delta > 0 ? 1 : 0} ${round(s2.x)} ${round(s2.y)}`} fill="none" stroke="var(--diagram-accent)" strokeWidth={1.75} />,
        );
      }
      labelDist += (count - 1) * 4;
    }
    if (ang.label) {
      const bis = norm({ x: u1.x + u2.x, y: u1.y + u2.y }) ?? { x: u1.y, y: -u1.x };
      out.push(text(`al${i}`, { x: v.x + bis.x * labelDist, y: v.y + bis.y * labelDist + 4 }, ang.label));
    }
  });

  for (const [name, p] of pts) {
    const opts = labels.get(name);
    const label = opts ? opts.text : name;
    // label_position is a compass hint; y is already in screen space here.
    const lp = opts?.position ? compass(p, opts.position, 14) : labelPos(name, p, 14);
    out.push(
      <g key={`p-${name}`}>
        <circle cx={round(p.x)} cy={round(p.y)} r={3} fill="currentColor" />
        {label !== false && text('t', { x: lp.x, y: lp.y + 4 }, label, anchorFor(p, lp), true)}
      </g>,
    );
  }

  return (
    <svg viewBox={`0 0 ${round(vw)} ${round(vh)}`} role="img" aria-label={alt} className={s.svg} data-visual="geometry" style={{ maxWidth: Math.max(240, round(vw * 1.2)) }}>
      <g aria-hidden="true">
        {fills}
        {out}
      </g>
    </svg>
  );
}

/** 1–3 marks; anything else (missing, out of range) is 1. */
function markCount(n: unknown): number {
  return n === 2 || n === 3 ? n : 1;
}

const COMPASS: Record<string, [number, number]> = {
  n: [0, -1], ne: [Math.SQRT1_2, -Math.SQRT1_2], e: [1, 0], se: [Math.SQRT1_2, Math.SQRT1_2],
  s: [0, 1], sw: [-Math.SQRT1_2, Math.SQRT1_2], w: [-1, 0], nw: [-Math.SQRT1_2, -Math.SQRT1_2],
};

function compass(p: P, position: string, dist: number): P {
  const [dx, dy] = COMPASS[position] ?? [0, -1];
  return { x: p.x + dx * dist, y: p.y + dy * dist };
}

function norm(p: P): P | null {
  const len = Math.hypot(p.x, p.y);
  return len < 1e-9 ? null : { x: p.x / len, y: p.y / len };
}

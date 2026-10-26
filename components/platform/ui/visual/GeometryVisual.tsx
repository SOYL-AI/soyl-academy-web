/**
 * `geometry` visual: points, segments, circles, angles (arc or right-angle mark) and polygons
 * from named coordinates. Maths convention: origin bottom-left, y up. Server-renderable SVG.
 */
import type { ReactNode } from 'react';
import { pointAt, type GeometryPoint, type Visual } from '@/platform/shared/content/visual';
import { LABEL_PROPS, round } from './svg-utils';
import s from './visual.module.css';

export type GeometrySpec = Extract<Visual, { kind: 'geometry' }>['spec'];
type P = { x: number; y: number };

const SIZE = 300;
const PAD = 26;

export function GeometryVisual({ spec, alt }: { spec: GeometrySpec; alt: string }) {
  const width = spec.width > 0 ? spec.width : 10;
  const height = spec.height > 0 ? spec.height : 10;
  const k = SIZE / Math.max(width, height);
  const vw = width * k + 2 * PAD;
  const vh = height * k + 2 * PAD;
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
  (spec.segments ?? []).forEach((s) => link(s.from, s.to));
  (spec.polygons ?? []).forEach((poly) => poly.vertices.forEach((v, i) => link(v, poly.vertices[(i + 1) % poly.vertices.length])));
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
  /** Label direction for a vertex: opposite the mean direction to its neighbours. */
  const labelPos = (name: string, p: P, dist: number): P => {
    const ns = [...(neighbours.get(name) ?? [])].map((n) => pts.get(n)).filter((v): v is P => !!v);
    if (ns.length === 0) return awayFrom(p, centroid, dist);
    let ux = 0;
    let uy = 0;
    for (const q of ns) {
      const len = Math.hypot(q.x - p.x, q.y - p.y) || 1;
      ux += (q.x - p.x) / len;
      uy += (q.y - p.y) / len;
    }
    const len = Math.hypot(ux, uy);
    // Collinear neighbours on both sides (a point on a line): put the label above/below the line.
    if (len < 0.2) {
      const q = ns[0];
      const l = Math.hypot(q.x - p.x, q.y - p.y) || 1;
      const nx = -(q.y - p.y) / l;
      const ny = (q.x - p.x) / l;
      return ny <= 0 ? { x: p.x + nx * dist, y: p.y + ny * dist } : { x: p.x - nx * dist, y: p.y - ny * dist };
    }
    return { x: p.x - (ux / len) * dist, y: p.y - (uy / len) * dist };
  };
  const anchorFor = (from: P, to: P) => (Math.abs(to.x - from.x) < 3 ? 'middle' : to.x > from.x ? 'start' : 'end');
  const get = (name: string) => pts.get(name);
  const out: ReactNode[] = [];

  (spec.polygons ?? []).forEach((poly, i) => {
    const vs = poly.vertices.map(get);
    if (vs.some((v) => !v)) return;
    const d = vs.map((v, j) => `${j ? 'L' : 'M'}${round(v!.x)} ${round(v!.y)}`).join('') + 'Z';
    out.push(<path key={`poly${i}`} d={d} fill={poly.fill ? 'var(--diagram-fill)' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />);
  });

  (spec.circles ?? []).forEach((c, i) => {
    const center = get(c.center);
    if (!center || !(c.radius > 0)) return;
    const r = c.radius * k;
    out.push(<circle key={`c${i}`} cx={round(center.x)} cy={round(center.y)} r={round(r)} fill="none" stroke="var(--diagram-accent)" strokeWidth={2} />);
    if (c.label) {
      const lp = { x: center.x + r * Math.SQRT1_2 + 4, y: center.y - r * Math.SQRT1_2 - 4 };
      out.push(
        <text key={`cl${i}`} {...LABEL_PROPS} x={round(lp.x)} y={round(lp.y)}>
          {c.label}
        </text>,
      );
    }
  });

  (spec.segments ?? []).forEach((seg, i) => {
    const a = get(seg.from);
    const b = get(seg.to);
    if (!a || !b) return;
    out.push(
      <line key={`s${i}`} x1={round(a.x)} y1={round(a.y)} x2={round(b.x)} y2={round(b.y)} stroke="currentColor" strokeWidth={2} strokeDasharray={seg.dashed ? '6 5' : undefined} strokeLinecap="round" />,
    );
    if (seg.label) {
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      // Perpendicular offset, on the side away from the shape this segment belongs to.
      const inside = localCentre(seg.from, seg.to);
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      let nx = -(b.y - a.y) / len;
      let ny = (b.x - a.x) / len;
      if ((mid.x + nx - inside.x) ** 2 + (mid.y + ny - inside.y) ** 2 < (mid.x - inside.x) ** 2 + (mid.y - inside.y) ** 2) {
        nx = -nx;
        ny = -ny;
      }
      const lp = { x: mid.x + nx * 14, y: mid.y + ny * 14 + 4 };
      out.push(
        <text key={`sl${i}`} {...LABEL_PROPS} x={round(lp.x)} y={round(lp.y)} textAnchor="middle">
          {seg.label}
        </text>,
      );
    }
  });

  (spec.angles ?? []).forEach((ang, i) => {
    const v = get(ang.at);
    const a = get(ang.from);
    const b = get(ang.to);
    if (!v || !a || !b) return;
    const u1 = norm({ x: a.x - v.x, y: a.y - v.y });
    const u2 = norm({ x: b.x - v.x, y: b.y - v.y });
    if (!u1 || !u2) return;
    if (ang.right) {
      const r = 12;
      const p1 = { x: v.x + u1.x * r, y: v.y + u1.y * r };
      const p2 = { x: p1.x + u2.x * r, y: p1.y + u2.y * r };
      const p3 = { x: v.x + u2.x * r, y: v.y + u2.y * r };
      out.push(<path key={`a${i}`} d={`M${round(p1.x)} ${round(p1.y)}L${round(p2.x)} ${round(p2.y)}L${round(p3.x)} ${round(p3.y)}`} fill="none" stroke="var(--diagram-accent)" strokeWidth={1.75} />);
    } else {
      const r = 20;
      const t1 = Math.atan2(u1.y, u1.x);
      let delta = Math.atan2(u2.y, u2.x) - t1;
      while (delta <= -Math.PI) delta += 2 * Math.PI;
      while (delta > Math.PI) delta -= 2 * Math.PI;
      const s1 = { x: v.x + Math.cos(t1) * r, y: v.y + Math.sin(t1) * r };
      const s2 = { x: v.x + Math.cos(t1 + delta) * r, y: v.y + Math.sin(t1 + delta) * r };
      out.push(
        <path key={`a${i}`} d={`M${round(s1.x)} ${round(s1.y)}A${r} ${r} 0 0 ${delta > 0 ? 1 : 0} ${round(s2.x)} ${round(s2.y)}`} fill="none" stroke="var(--diagram-accent)" strokeWidth={1.75} />,
      );
    }
    if (ang.label) {
      const bis = norm({ x: u1.x + u2.x, y: u1.y + u2.y }) ?? { x: u1.y, y: -u1.x };
      const lp = { x: v.x + bis.x * 34, y: v.y + bis.y * 34 + 4 };
      out.push(
        <text key={`al${i}`} {...LABEL_PROPS} x={round(lp.x)} y={round(lp.y)} textAnchor="middle">
          {ang.label}
        </text>,
      );
    }
  });

  for (const [name, p] of pts) {
    const opts = labels.get(name);
    const text = opts ? opts.text : name;
    // label_position is a compass hint; y is already in screen space here.
    const lp = opts?.position ? compass(p, opts.position, 14) : labelPos(name, p, 14);
    out.push(
      <g key={`p-${name}`}>
        <circle cx={round(p.x)} cy={round(p.y)} r={3} fill="currentColor" />
        {text !== false && (
          <text {...LABEL_PROPS} x={round(lp.x)} y={round(lp.y + 4)} textAnchor={anchorFor(p, lp)} fontWeight={600}>
            {text}
          </text>
        )}
      </g>,
    );
  }

  return (
    <svg viewBox={`0 0 ${round(vw)} ${round(vh)}`} role="img" aria-label={alt} className={s.svg} data-visual="geometry" style={{ maxWidth: Math.max(240, round(vw * 1.2)) }}>
      <g aria-hidden="true">{out}</g>
    </svg>
  );
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

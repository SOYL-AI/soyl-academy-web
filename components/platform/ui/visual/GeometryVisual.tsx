/**
 * `geometry` visual: points, segments, circles, angles (arc or right-angle mark) and polygons
 * from named coordinates. Maths convention: origin bottom-left, y up. Server-renderable SVG.
 */
import type { ReactNode } from 'react';
import type { Visual } from '@/platform/shared/content/visual';
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
  for (const [name, [x, y]] of Object.entries(spec.points ?? {})) {
    if (Number.isFinite(x) && Number.isFinite(y)) pts.set(name, { x: PAD + x * k, y: PAD + (height - y) * k });
  }
  const all = [...pts.values()];
  const centroid = all.length ? { x: all.reduce((a, p) => a + p.x, 0) / all.length, y: all.reduce((a, p) => a + p.y, 0) / all.length } : { x: vw / 2, y: vh / 2 };
  const away = (p: P, dist: number): P => {
    const dx = p.x - centroid.x;
    const dy = p.y - centroid.y;
    const len = Math.hypot(dx, dy);
    return len < 1e-6 ? { x: p.x + dist * 0.7, y: p.y - dist * 0.7 } : { x: p.x + (dx / len) * dist, y: p.y + (dy / len) * dist };
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
      // Perpendicular offset, on the side away from the figure's centre.
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      let nx = -(b.y - a.y) / len;
      let ny = (b.x - a.x) / len;
      if ((mid.x + nx - centroid.x) ** 2 + (mid.y + ny - centroid.y) ** 2 < (mid.x - centroid.x) ** 2 + (mid.y - centroid.y) ** 2) {
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
    const lp = away(p, 14);
    out.push(
      <g key={`p-${name}`}>
        <circle cx={round(p.x)} cy={round(p.y)} r={3} fill="currentColor" />
        <text {...LABEL_PROPS} x={round(lp.x)} y={round(lp.y + 4)} textAnchor={anchorFor(p, lp)} fontWeight={600}>
          {name}
        </text>
      </g>,
    );
  }

  return (
    <svg viewBox={`0 0 ${round(vw)} ${round(vh)}`} role="img" aria-label={alt} className={s.svg} data-visual="geometry" style={{ maxWidth: Math.max(240, round(vw * 1.2)) }}>
      <g aria-hidden="true">{out}</g>
    </svg>
  );
}

function norm(p: P): P | null {
  const len = Math.hypot(p.x, p.y);
  return len < 1e-9 ? null : { x: p.x / len, y: p.y / len };
}

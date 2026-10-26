/**
 * Visual spec checks (ADR-007). Every kind must compile: SVG against the allow-list, plot
 * expressions through the safe parser and sampled over the domain, geometry/flow references
 * resolved, tables rectangular, chemistry through KaTeX mhchem or the SMILES alphabet.
 */
import { pointAt, type Visual } from '@soyl/shared/content/index';
import { ExprError, evaluate, parseExpr } from './expr';
import { checkMhchem, checkSmiles } from './math';
import { checkSvg } from './svg';

export interface VisualIssue {
  rule: string;
  severity: 'error' | 'warning';
  message: string;
}

export interface VisualCheck {
  issues: VisualIssue[];
  /** Student-visible strings inside the spec (labels, cells, SVG text) for the text rules. */
  texts: { text: string; kind: 'md' | 'plain' }[];
  /** ids defined by a raw SVG. */
  svgIds: string[];
  /** mhchem equation of a chem visual (for the balance check). */
  equation: string | null;
}

export function checkVisual(v: Visual): VisualCheck {
  const issues: VisualIssue[] = [];
  const texts: VisualCheck['texts'] = [{ text: v.alt, kind: 'plain' }];
  let svgIds: string[] = [];
  let equation: string | null = null;
  if (v.caption) texts.push({ text: v.caption, kind: 'md' });
  const err = (rule: string, message: string) => issues.push({ rule, severity: 'error', message });
  const warn = (rule: string, message: string) => issues.push({ rule, severity: 'warning', message });

  switch (v.kind) {
    case 'svg': {
      const r = checkSvg(v.spec);
      r.errors.forEach((m) => err('svg.allowlist', m));
      r.warnings.forEach((m) => warn('svg.style', m));
      r.texts.forEach((t) => texts.push({ text: t, kind: 'plain' }));
      svgIds = r.ids;
      break;
    }
    case 'plot': {
      const { x, y, functions, points, series } = v.spec;
      if (!(x.min < x.max)) err('visual.plot', `x range ${x.min}..${x.max} is empty`);
      if (!(y.min < y.max)) err('visual.plot', `y range ${y.min}..${y.max} is empty`);
      if (!functions.length && !points.length && !series.length) err('visual.plot', 'plot has nothing to draw');
      for (const f of functions) {
        if (f.label) texts.push({ text: f.label, kind: 'md' });
        const [from, to] = f.domain ?? [x.min, x.max];
        if (!(from < to)) err('visual.plot', `domain ${from}..${to} of "${f.expr}" is empty`);
        try {
          const ast = parseExpr(f.expr);
          let finite = 0;
          let inView = 0;
          for (let k = 0; k <= 64; k++) {
            const value = evaluate(ast, from + ((to - from) * k) / 64);
            if (Number.isFinite(value)) {
              finite++;
              if (value >= y.min && value <= y.max) inView++;
            }
          }
          if (!finite) err('visual.plot', `"${f.expr}" is never finite on ${from}..${to}`);
          else if (!inView) warn('visual.plot', `"${f.expr}" never enters the y range ${y.min}..${y.max}`);
        } catch (e) {
          err('visual.plot', `expression "${f.expr}": ${e instanceof ExprError ? e.message : (e as Error).message}`);
        }
      }
      for (const l of v.spec.vlines ?? []) {
        if (l.label) texts.push({ text: l.label, kind: 'md' });
        if (!(l.x >= x.min && l.x <= x.max)) err('visual.plot', `vertical line x = ${l.x} is outside the x range ${x.min}..${x.max}`);
      }
      for (const l of v.spec.hlines ?? []) {
        if (l.label) texts.push({ text: l.label, kind: 'md' });
        if (!(l.y >= y.min && l.y <= y.max)) err('visual.plot', `horizontal line y = ${l.y} is outside the y range ${y.min}..${y.max}`);
      }
      for (const p of points) {
        if (p.label) texts.push({ text: p.label, kind: 'md' });
        if (!p.at.every(Number.isFinite)) err('visual.plot', 'point with non-finite coordinates');
      }
      for (const issue of checkPlotPoints(v.spec)) err('visual.plot-points', issue);
      for (const s of series) {
        texts.push({ text: s.label, kind: 'plain' });
        if (!s.points.length) err('visual.plot', `series "${s.label}" has no points`);
        if (!s.points.every((p) => p.every(Number.isFinite))) err('visual.plot', `series "${s.label}" has non-finite points`);
      }
      if (x.label) texts.push({ text: x.label, kind: 'md' });
      if (y.label) texts.push({ text: y.label, kind: 'md' });
      break;
    }
    case 'geometry': {
      const s = v.spec;
      // Not to scale: the flag, or a caption that says so ("not to scale", "different scales").
      const notToScale = !!s.not_to_scale || /not\s+(?:drawn\s+)?to\s+scale|different\s+scales/i.test(v.caption ?? '');
      const P = new Map(Object.entries(s.points).map(([name, p]) => [name, pointAt(p)] as const));
      const need = (name: string, where: string): boolean => {
        if (P.has(name)) return true;
        err('visual.geometry', `${where} refers to unknown point "${name}"`);
        return false;
      };
      for (const [name, [px, py]] of P) {
        if (!Number.isFinite(px) || !Number.isFinite(py)) err('visual.geometry', `point ${name} has non-finite coordinates`);
        else if (px < 0 || py < 0 || px > s.width || py > s.height) err('visual.geometry', `point ${name} (${px}, ${py}) is outside the canvas 0..${s.width} × 0..${s.height} (origin bottom-left, y up)`);
      }
      for (const [name, p] of Object.entries(s.points)) if (!Array.isArray(p) && typeof p.label === 'string') texts.push({ text: p.label, kind: 'md' });
      const lengthLabels: { where: string; drawn: number; value: number; unit: string | null }[] = [];
      s.segments.forEach((g, i) => {
        const ok = need(g.from, `segment ${i + 1}`) && need(g.to, `segment ${i + 1}`);
        if (g.from === g.to) err('visual.geometry', `segment ${i + 1} has zero length`);
        if (g.label) texts.push({ text: g.label, kind: 'md' });
        const len = g.label ? lengthLabel(g.label) : null;
        if (ok && len) lengthLabels.push({ where: `segment ${g.from}${g.to}`, drawn: dist(P.get(g.from)!, P.get(g.to)!), ...len });
      });
      s.lines.forEach((l, i) => {
        l.through.forEach((n) => need(n, `line ${i + 1}`));
        if (l.through[0] === l.through[1]) err('visual.geometry', `line ${i + 1} needs two different points`);
        if (l.label) texts.push({ text: l.label, kind: 'md' });
      });
      s.rays.forEach((r, i) => {
        need(r.from, `ray ${i + 1}`);
        need(r.through, `ray ${i + 1}`);
        if (r.from === r.through) err('visual.geometry', `ray ${i + 1} needs two different points`);
        if (r.label) texts.push({ text: r.label, kind: 'md' });
      });
      s.circles.forEach((c, i) => {
        if (need(c.center, `circle ${i + 1}`)) {
          const [x, y] = P.get(c.center)!;
          if (x - c.radius < -1e-9 || y - c.radius < -1e-9 || x + c.radius > s.width + 1e-9 || y + c.radius > s.height + 1e-9) err('visual.geometry', `circle ${i + 1} at ${c.center} leaves the canvas`);
        }
        if (c.label) texts.push({ text: c.label, kind: 'md' });
      });
      s.angles.forEach((a, i) => {
        const ok = [a.at, a.from, a.to].map((p) => need(p, `angle ${i + 1}`)).every(Boolean);
        if (a.label) texts.push({ text: a.label, kind: 'md' });
        if (!ok) return;
        const measured = angleAt(P.get(a.at)!, P.get(a.from)!, P.get(a.to)!);
        if (a.right && Math.abs(measured - 90) > 0.5) err('visual.geometry', `angle at ${a.at} is marked right but measures ${measured.toFixed(1)}°`);
        const deg = a.label ? degreeLabel(a.label) : null;
        if (deg !== null && !notToScale && Math.abs(measured - deg) > 0.6) err('visual.geometry', `angle at ${a.at} is labelled ${deg}° but measures ${measured.toFixed(1)}°`);
      });
      s.polygons.forEach((p, i) => p.vertices.forEach((name) => need(name, `polygon ${i + 1}`)));
      // Length labels agree with one scale (the stated one, or the first labelled segment's).
      if (!notToScale && lengthLabels.length) {
        const ref = s.scale ? { k: s.scale.per_unit, from: `scale ${s.scale.per_unit} per ${s.scale.unit}` } : { k: lengthLabels[0]!.drawn / lengthLabels[0]!.value, from: lengthLabels[0]!.where };
        for (const l of s.scale ? lengthLabels : lengthLabels.slice(1)) {
          const k = l.drawn / l.value;
          if (Math.abs(k - ref.k) > 0.01 * ref.k)
            err('visual.geometry', `${l.where} is labelled ${l.value}${l.unit ? ` ${l.unit}` : ''} but is drawn ${l.drawn.toFixed(3)} units long, off the scale of ${ref.from} (set not_to_scale and say so in the caption if intended)`);
        }
      }
      break;
    }
    case 'chem': {
      if ('equation' in v.spec) {
        equation = v.spec.equation;
        const r = checkMhchem(v.spec.equation);
        if (r.error) err('visual.chem', `mhchem equation does not parse: ${r.error}`);
      } else {
        const e = checkSmiles(v.spec.smiles);
        if (e) err('visual.chem', e);
        if (v.spec.name) texts.push({ text: v.spec.name, kind: 'plain' });
      }
      break;
    }
    case 'table': {
      const width = v.spec.headers.length;
      v.spec.rows.forEach((row, i) => {
        if (row.length !== width) err('visual.table', `row ${i + 1} has ${row.length} cells, header has ${width}`);
      });
      for (const cell of [...v.spec.headers, ...v.spec.rows.flat()]) texts.push({ text: cell, kind: 'md' });
      break;
    }
    case 'flow': {
      const ids = new Set<string>();
      for (const n of v.spec.nodes) {
        if (ids.has(n.id)) err('visual.flow', `duplicate node id "${n.id}"`);
        ids.add(n.id);
        texts.push({ text: n.label, kind: 'md' });
      }
      v.spec.edges.forEach((e, i) => {
        if (!ids.has(e.from)) err('visual.flow', `edge ${i + 1} starts at unknown node "${e.from}"`);
        if (!ids.has(e.to)) err('visual.flow', `edge ${i + 1} ends at unknown node "${e.to}"`);
        if (e.label) texts.push({ text: e.label, kind: 'md' });
      });
      break;
    }
  }
  return { issues, texts, svgIds, equation };
}

const dist = (a: readonly [number, number], b: readonly [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Angle at V between rays VA and VB, in degrees. */
export function angleAt(V: readonly [number, number], A: readonly [number, number], B: readonly [number, number]): number {
  const a = [A[0] - V[0], A[1] - V[1]];
  const b = [B[0] - V[0], B[1] - V[1]];
  const cos = (a[0]! * b[0]! + a[1]! * b[1]!) / (Math.hypot(a[0]!, a[1]!) * Math.hypot(b[0]!, b[1]!));
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}

/** "4.5 cm", "$6$", "7" → a numeric length label; anything else (x, 2x, "AB") → null. */
export function lengthLabel(label: string): { value: number; unit: string | null } | null {
  const m = /^(\d+(?:\.\d+)?)\s*(mm|cm|m|km)?$/.exec(label.replace(/\$/g, '').replace(/\\,|\\ |~/g, ' ').trim());
  return m && Number(m[1]) > 0 ? { value: Number(m[1]), unit: m[2] ?? null } : null;
}

/** "40°", "$40^\circ$", "40^{\circ}" → 40; anything else → null. */
export function degreeLabel(label: string): number | null {
  const m = /^(\d+(?:\.\d+)?)\s*(?:°|\^\s*\\circ|\^\s*\{\s*\\circ\s*\})$/.exec(label.replace(/\$/g, '').trim());
  return m ? Number(m[1]) : null;
}

type PlotSpec = Extract<Visual, { kind: 'plot' }>['spec'];

/**
 * Plot point sanity (maths producer feedback): every marked point lies on one of the functions (or a
 * vline/hline) unless it sets `on_curve: false`; and when a marked point is a zero of a function,
 * every real zero of that function inside the view is marked too. Tolerances: 2% of the y range
 * for "on the curve", 1.5% of the x range for "the same zero".
 */
export function checkPlotPoints(spec: PlotSpec): string[] {
  const issues: string[] = [];
  const { x, y } = spec;
  const yTol = Math.max(1e-9, 0.02 * (y.max - y.min));
  const xTol = Math.max(1e-9, 0.015 * (x.max - x.min));
  const fns = spec.functions.flatMap((f) => {
    try {
      const ast = parseExpr(f.expr);
      const [from, to] = f.domain ?? [x.min, x.max];
      return [{ expr: f.expr, f: (t: number) => evaluate(ast, t), from: Math.max(from, x.min), to: Math.min(to, x.max) }];
    } catch {
      return [];
    }
  });
  if (!fns.length) return issues;
  const onFn = (p: readonly number[], fn: (typeof fns)[number]) => p[0]! >= fn.from - xTol && p[0]! <= fn.to + xTol && Math.abs(fn.f(p[0]!) - p[1]!) <= yTol;
  for (const p of spec.points) {
    if (p.on_curve === false || !p.at.every(Number.isFinite)) continue;
    const onLine = (spec.vlines ?? []).some((l) => Math.abs(l.x - p.at[0]) <= xTol) || (spec.hlines ?? []).some((l) => Math.abs(l.y - p.at[1]) <= yTol);
    if (!onLine && !fns.some((fn) => onFn(p.at, fn)))
      issues.push(`point (${p.at.join(', ')})${p.label ? ` "${p.label}"` : ''} is not on any plotted curve (set on_curve: false if that is intended)`);
  }
  for (const fn of fns) {
    const markedZeros = spec.points.filter((p) => Math.abs(p.at[1]) <= yTol && onFn(p.at, fn));
    if (!markedZeros.length) continue;
    for (const z of realZeros(fn.f, fn.from, fn.to, yTol))
      if (!markedZeros.some((p) => Math.abs(p.at[0] - z) <= xTol))
        issues.push(`"${fn.expr}" has a zero at x ≈ ${+z.toFixed(3)} that is not marked (its other zeros are)`);
  }
  return issues;
}

/** Real zeros of f on [a, b]: sign changes refined by bisection, plus touching zeros (local |f| minima ≈ 0). */
export function realZeros(f: (x: number) => number, a: number, b: number, tol: number): number[] {
  const n = 2000;
  const xs = Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);
  const ys = xs.map((t) => f(t));
  const zeros: number[] = [];
  const push = (z: number) => {
    if (!zeros.some((q) => Math.abs(q - z) <= (b - a) / 200)) zeros.push(z);
  };
  for (let i = 0; i < n; i++) {
    const [y0, y1] = [ys[i]!, ys[i + 1]!];
    if (!Number.isFinite(y0) || !Number.isFinite(y1)) continue;
    if (y0 === 0) push(xs[i]!);
    else if (y0 * y1 < 0) {
      // A sign change across a pole is not a zero: require small values on both sides.
      if (Math.min(Math.abs(y0), Math.abs(y1)) > 50 * tol) continue;
      let [lo, hi] = [xs[i]!, xs[i + 1]!];
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        if (f(lo) * f(mid) <= 0) hi = mid;
        else lo = mid;
      }
      push((lo + hi) / 2);
    } else if (i > 0 && Math.abs(y0) <= Math.abs(ys[i - 1]!) && Math.abs(y0) <= Math.abs(y1) && Math.abs(y0) < tol / 10) push(xs[i]!);
  }
  if (Number.isFinite(ys[n]!) && ys[n] === 0) push(xs[n]!);
  return zeros.sort((p, q) => p - q);
}

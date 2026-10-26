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
      for (const p of points) {
        if (p.label) texts.push({ text: p.label, kind: 'md' });
        if (!p.at.every(Number.isFinite)) err('visual.plot', 'point with non-finite coordinates');
      }
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

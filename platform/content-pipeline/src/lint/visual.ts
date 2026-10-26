/**
 * Visual spec checks (ADR-007). Every kind must compile: SVG against the allow-list, plot
 * expressions through the safe parser and sampled over the domain, geometry/flow references
 * resolved, tables rectangular, chemistry through KaTeX mhchem or the SMILES alphabet.
 */
import type { Visual } from '@soyl/shared/content/index';
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
      const names = new Set(Object.keys(s.points));
      const need = (name: string, where: string) => {
        if (!names.has(name)) err('visual.geometry', `${where} refers to unknown point "${name}"`);
      };
      for (const [name, [px, py]] of Object.entries(s.points)) {
        if (!Number.isFinite(px) || !Number.isFinite(py)) err('visual.geometry', `point ${name} has non-finite coordinates`);
        else if (px < 0 || py < 0 || px > s.width || py > s.height) warn('visual.geometry', `point ${name} (${px}, ${py}) lies outside 0..${s.width} × 0..${s.height}`);
      }
      s.segments.forEach((g, i) => {
        need(g.from, `segment ${i + 1}`);
        need(g.to, `segment ${i + 1}`);
        if (g.from === g.to) err('visual.geometry', `segment ${i + 1} has zero length`);
        if (g.label) texts.push({ text: g.label, kind: 'md' });
      });
      s.circles.forEach((c, i) => {
        need(c.center, `circle ${i + 1}`);
        if (c.label) texts.push({ text: c.label, kind: 'md' });
      });
      s.angles.forEach((a, i) => {
        [a.at, a.from, a.to].forEach((p) => need(p, `angle ${i + 1}`));
        if (a.label) texts.push({ text: a.label, kind: 'md' });
      });
      s.polygons.forEach((p, i) => p.vertices.forEach((name) => need(name, `polygon ${i + 1}`)));
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

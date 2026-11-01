// Working-line checker for ICSE 10 Mathematics ch05. Every equation typed in a worked example, the notes or
// a model answer is parsed from its TeX (into the pipeline's expression grammar) and checked against the
// verified quadratic from quad.mjs:
//   * a quadratic line (e.g. "(3x + 2)(x - 4) = 0", "x(2x + 5) = 12") must be a non-zero multiple of the
//     verified ax² + bx + c at six sample points (so it has exactly the same roots);
//   * a linear line ("3x + 2 = 0", "x = 4", "x = \dfrac{6 \pm \sqrt{28}}{4}") must give a verified root;
//   * alternatives joined by "\text{ or }" (or a ± line) must give exactly the verified roots between them;
//   * a line that is not a polynomial (fractions with x in a denominator) must vanish at every verified root;
//   * a line with no unknown (D = 49 - 24 = 25, \sqrt{17} \approx 4.1231) must be true arithmetic, and
//     every "\approx" must be a correct rounding to the places written;
//   * "x \approx 2.78" must be a verified root rounded correctly to the places written.
// Sides with other letters (D, b^2 - 4ac) are labels and are skipped. A line that cannot be parsed stops the build.
import { f } from './lib.mjs';
import { places } from './quad.mjs';

/** TeX arithmetic → the pipeline expression grammar; variable v becomes x. */
export function texToExpr(t, v = 'x') {
  let s = t.replace(/\\left|\\right/g, '').replace(/\\[,;!]|\\ |\\quad|\\qquad/g, ' ').replace(/\\times|\\cdot/g, '*');
  let guard = 0;
  const SQ = /\\sqrt\{([^{}]*)\}/;
  const FR = /\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/;
  while ((SQ.test(s) || FR.test(s)) && guard++ < 80) s = s.replace(SQ, (m, a) => `sqrt(${a})`).replace(FR, (m, a, b) => `((${a})/(${b}))`);
  if (/\\[a-zA-Z]/.test(s)) throw new Error(`unsupported TeX in a working line: ${t}`);
  s = s.replace(/\{/g, '(').replace(/\}/g, ')');
  if (v !== 'x') s = s.replace(new RegExp(`(?<![a-zA-Z])${v}(?![a-zA-Z])`, 'g'), 'x');
  if (/\)\s*\d/.test(s)) throw new Error(`write \\times between ")" and a number: ${t}`);
  return s.trim();
}
/** True when a side contains letters other than the variable (after removing TeX commands): a label such as D or b^2 - 4ac. */
function symbolic(side, v) {
  const bare = side.replace(/\\text\{[^}]*\}/g, '').replace(/\\[a-zA-Z]+/g, '').replace(/sqrt/g, '');
  return new RegExp(`[a-zA-Z]`).test(bare.replace(new RegExp(`(?<![a-zA-Z])${v}(?![a-zA-Z])`, 'g'), ''));
}
const SAMPLES = [0, 1, 2, 3, 4, 5].map((i) => 0.3137 + 0.917 * i);
const close = (u, w, rel = 1e-9) => Math.abs(u - w) <= rel * Math.max(1, Math.abs(u), Math.abs(w));
const OR = /\\(?:quad|qquad)?\s*\\text\{\s*or\s*\}\s*(?:\\(?:quad|qquad))?|\\text\{\s*or\s*\}/;
const isDecimal = (s) => /^-?\d+(\.\d+)?$/.test(s.trim());

function parseSide(side, v) {
  if (symbolic(side, v)) return null;
  const g = f(texToExpr(side, v));
  const dep = !close(g(0.4321), g(1.789), 1e-12) || !close(g(-2.3), g(0.4321), 1e-12);
  return { tex: side.trim(), g, dep, bare: side.trim() === v };
}
/** Degree of g if it is a polynomial of degree ≤ 2 on the samples, else null. */
function polyDegree(g) {
  const y = SAMPLES.map(g);
  if (y.some((t) => !Number.isFinite(t))) return null;
  const scale = Math.max(1, ...y.map(Math.abs));
  const diff = (arr) => arr.slice(1).map((t, i) => t - arr[i]);
  const d1 = diff(y), d2 = diff(d1), d3 = diff(d2);
  if (d3.some((t) => Math.abs(t) > 1e-8 * scale)) return null;
  if (d2.every((t) => Math.abs(t) < 1e-9 * scale)) return d1.every((t) => Math.abs(t) < 1e-9 * scale) ? 0 : 1;
  return 2;
}
/** The rounding claim "value ≈ literal" is right: literal is value rounded to its own number of places. */
function roundsTo(value, literal) {
  const k = places(literal);
  const scaled = Math.abs(value) * 10 ** k;
  if (Math.abs(scaled - Math.floor(scaled) - 0.5) < 1e-7) return false;
  return Math.abs(Number((Math.sign(value) * Math.round(scaled) / 10 ** k).toFixed(k)) - Number(literal)) < 1e-12;
}

/** Roots claimed by one alternative (a linear equation, "x = c" or "x ≈ c"); throws if it is not one. */
function claimedRoot(piece, ctx, errs) {
  const { sides, ops } = splitSides(piece);
  const ps = sides.map((s) => parseSide(s, ctx.v));
  if (ps[0]?.bare && ops[0] === 'approx') {
    const lit = sides[1].trim();
    if (!isDecimal(lit)) throw new Error(`"${piece}": an approximate root must be a decimal`);
    const hit = ctx.roots.find((r) => roundsTo(r, lit));
    if (hit === undefined) errs.push(`"${piece}": no verified root rounds to ${lit}`);
    return { approx: true, root: hit };
  }
  const xs = ps.filter((p) => p && p.dep);
  const cs = ps.filter((p) => p && !p.dep);
  constantChain(sides, ops, ps, errs, piece);
  if (xs.length !== 1 || !cs.length) throw new Error(`"${piece}": expected one side in ${ctx.v} and a value`);
  const i = ps.indexOf(xs[0]);
  const other = i === 0 ? ps.find((p, j) => j > 0 && p) : ps[i - 1];
  const g = (x) => xs[0].g(x) - other.g(x);
  if (polyDegree(g) !== 1) throw new Error(`"${piece}": alternative is not linear`);
  const root = -g(0) / (g(1) - g(0));
  if (!ctx.roots.some((r) => close(r, root, 1e-9))) errs.push(`"${piece}": gives ${root}, not a verified root (${ctx.roots.join(', ')})`);
  return { approx: false, root };
}
function splitSides(piece) {
  const parts = piece.split(/(=|\\approx)/);
  const sides = [], ops = [];
  parts.forEach((p, i) => (i % 2 ? ops.push(p === '=' ? 'eq' : 'approx') : sides.push(p)));
  return { sides, ops };
}
/** Consecutive numeric sides joined by = must be equal; by ≈ the right one must be a correct rounding. */
function constantChain(sides, ops, ps, errs, where) {
  let prev = null, op = 'eq';
  ps.forEach((p, i) => {
    if (i > 0 && ops[i - 1] === 'approx') op = 'approx';
    if (!p || p.dep) { if (p?.dep) { prev = null; op = 'eq'; } return; }
    const val = p.g(0);
    if (prev) {
      if (op === 'eq' && !close(prev.val, val)) errs.push(`"${where}": ${prev.tex} = ${p.tex} is false (${prev.val} vs ${val})`);
      if (op === 'approx') {
        if (!isDecimal(p.tex)) errs.push(`"${where}": the right side of ≈ must be a decimal (${p.tex})`);
        else if (!roundsTo(prev.val, p.tex)) errs.push(`"${where}": ${prev.val} does not round to ${p.tex}`);
      }
    }
    prev = { val, tex: p.tex };
    op = 'eq';
  });
}

/** Check one working line; returns a list of error strings. ctx = { q: [a, b, c] | null, roots: [...], v }. */
export function checkLine(line, ctx = { q: null, roots: [], v: 'x' }) {
  const errs = [];
  const pieces = line.split(/\\Rightarrow|\\implies|\\therefore/).map((p) => p.trim()).filter(Boolean);
  for (const piece of pieces) {
    // alternatives: "x = 4 \text{ or } x = -\dfrac{2}{3}" or a ± line
    let alts = null;
    if (OR.test(piece)) alts = piece.split(new RegExp(OR.source, 'g')).map((p) => p.trim()).filter(Boolean);
    else if (/\\pm|\\mp/.test(piece)) alts = [piece.replace(/\\pm/g, '+').replace(/\\mp/g, '-'), piece.replace(/\\pm/g, '-').replace(/\\mp/g, '+')];
    if (alts) {
      const got = alts.map((a) => claimedRoot(a, ctx, errs));
      const exact = got.filter((g) => !g.approx).map((g) => g.root);
      const covered = ctx.roots.filter((r) => got.some((g) => g.root !== undefined && close(g.root, r, 1e-9)));
      if (covered.length !== ctx.roots.length) errs.push(`"${piece}": alternatives give ${got.map((g) => g.root).join(', ')}, verified roots are ${ctx.roots.join(', ')}`);
      if (new Set(exact.map((r) => r.toFixed(9))).size !== exact.length && ctx.roots.length > 1) errs.push(`"${piece}": repeated root`);
      continue;
    }
    const { sides, ops } = splitSides(piece);
    if (sides.length < 2) throw new Error(`no equation in working piece "${piece}" of "${line}"`);
    const ps = sides.map((s) => parseSide(s, ctx.v));
    const xs = ps.filter((p) => p && p.dep);
    if (!xs.length) { constantChain(sides, ops, ps, errs, piece); if (ps.filter(Boolean).length < 2) throw new Error(`nothing to check in "${piece}"`); continue; }
    if (ps[0]?.bare && ps.slice(1).every((p) => !p || !p.dep)) { claimedRoot(piece, ctx, errs); continue; }
    if (ops.includes('approx')) throw new Error(`"${piece}": ≈ in an equation with ${ctx.v}`);
    const parsed = ps.filter(Boolean);
    // an identity chain (expansion or factorisation, every side in x): all sides identical, and a multiple of the verified quadratic
    if (parsed.length >= 2 && parsed.every((p) => p.dep) && parsed.every((p) => SAMPLES.every((t) => close(p.g(t), parsed[0].g(t))))) {
      if (ctx.q && polyDegree(parsed[0].g) === 2) {
        const [a, b, c] = ctx.q;
        const ratios = SAMPLES.map((t) => parsed[0].g(t) / (a * t * t + b * t + c));
        if (!ratios.every((t) => close(t, ratios[0], 1e-8))) errs.push(`"${piece}": identity, but not a multiple of the verified quadratic`);
      } else if (ctx.q) errs.push(`"${piece}": identity of degree ${polyDegree(parsed[0].g)}, not the verified quadratic`);
      continue;
    }
    // equation in x: every side but the last is the same expression (expansions); the last is the right-hand side
    for (let i = 0; i + 2 < parsed.length; i++) if (!SAMPLES.every((t) => close(parsed[i].g(t), parsed[i + 1].g(t)))) errs.push(`"${piece}": ${parsed[i].tex} and ${parsed[i + 1].tex} are not identical`);
    const L = parsed[0], R = parsed[parsed.length - 1];
    const g = (x) => L.g(x) - R.g(x);
    const deg = polyDegree(g);
    if (deg === 2 && ctx.q) {
      const [a, b, c] = ctx.q;
      const qf = (x) => a * x * x + b * x + c;
      const ratios = SAMPLES.filter((t) => Math.abs(qf(t)) > 1e-6).map((t) => g(t) / qf(t));
      if (!ratios.every((t) => close(t, ratios[0], 1e-8)) || Math.abs(ratios[0]) < 1e-12) errs.push(`"${piece}": not a multiple of ${a}x^2 + ${b}x + ${c}`);
    } else if (deg === 1) {
      const root = -g(0) / (g(1) - g(0));
      if (!ctx.roots.some((r) => close(r, root, 1e-9))) errs.push(`"${piece}": linear, gives ${root}, not a verified root`);
    } else if (deg === 0) {
      errs.push(`"${piece}": the unknown cancels`);
    } else {
      // rational (or quadratic without a reference): must vanish at every verified root
      if (!ctx.roots.length) errs.push(`"${piece}": no verified roots to substitute`);
      for (const r of ctx.roots) {
        const val = g(r), scale = Math.max(1, Math.abs(L.g(r)), Math.abs(R.g(r)));
        if (!(Math.abs(val) <= 1e-9 * scale)) errs.push(`"${piece}": does not vanish at the root ${r} (${val})`);
      }
      if (SAMPLES.every((t) => Math.abs(g(t)) < 1e-12)) errs.push(`"${piece}": identity, not an equation`);
    }
  }
  return errs;
}

/**
 * Working lines for one equation: md for Markdown and a verifier for the item's check.
 * ctx: a Qd object (q, roots, v) or { q: null, roots: [], v } for arithmetic-only lines.
 */
export function steps(ctx, lines) {
  return {
    lines,
    md: lines.map((l) => `$${l}$`),
    verify(C, label = '') { for (const l of lines) { const e = checkLine(l, ctx); C.assert(!e.length, `${label}working line "${l}" ${e.length ? e.join('; ') : 'checked'}`); } },
    must(msg = '') { for (const l of lines) { const e = checkLine(l, ctx); if (e.length) throw new Error(`${msg}: ${e.join('; ')}`); } return this; },
  };
}
export const ARITH = { q: null, roots: [], v: 'x' };

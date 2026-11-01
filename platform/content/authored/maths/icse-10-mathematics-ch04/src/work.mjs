// Checks typed working lines. Every inequality written in a worked example, solution or model answer
// (e.g. "-6 < -2x \le 6 \Rightarrow 3 > x \ge -3") is parsed from its TeX, evaluated numerically at
// each end point exactly, end points ± 0.0001 and 321 points of a 0.25 grid offset from the
// integers (−40 to 40), and compared with the verified solution set from ineq.mjs. A step that changes the
// solution set (a sign not reversed, an arithmetic slip, a wrong end point) stops the build.
import { f } from './lib.mjs';
import { inSet, fr, num } from './ineq.mjs';

/** TeX arithmetic → the pipeline expression grammar ("2x + 1", "((x - 2)/(4))"). */
export function texToExpr(t) {
  let s = t.replace(/\\left|\\right/g, '').replace(/\\,|\\;|\\ /g, ' ').replace(/\\times|\\cdot/g, '*');
  // \dfrac{A}{B} → ((A)/(B)), innermost first
  const FR = /\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/;
  let guard = 0;
  while (FR.test(s) && guard++ < 50) s = s.replace(FR, (m, a, b) => `((${a})/(${b}))`);
  if (/\\[a-zA-Z]/.test(s)) throw new Error(`unsupported TeX in a working line: ${t}`);
  s = s.replace(/\{/g, '(').replace(/\}/g, ')');
  // implicit products the grammar does not allow: ")2" and "x2", "x(" are not used; ")(" and "2(" are fine
  if (/\)\s*\d/.test(s)) throw new Error(`write a × between ")" and a number: ${t}`);
  return s.trim();
}
const RELS = /(\\leq?(?![a-z])|\\geq?(?![a-z])|<|>)/;
const CMP = { '<': (d) => d < 0, '>': (d) => d > 0, le: (d) => d <= 0, ge: (d) => d >= 0 };
/** Predicate x ↦ boolean for one chain "a REL b REL c" (all in x). */
export function predicate(piece) {
  const parts = piece.split(RELS).map((p) => p.trim());
  if (parts.length < 3) return null;
  const sides = [], rels = [];
  parts.forEach((p, i) => (i % 2 ? rels.push(p.startsWith('\\le') ? 'le' : p.startsWith('\\ge') ? 'ge' : p) : sides.push(f(texToExpr(p)))));
  return (x) => rels.every((rel, i) => { let d = sides[i](x) - sides[i + 1](x); if (Math.abs(d) < 1e-9) d = 0; return CMP[rel](d); });
}
/** Pieces of a line separated by \Rightarrow / \implies / \iff. */
const pieces = (line) => line.split(/\\Rightarrow|\\implies|\\iff|\\Leftrightarrow/).map((p) => p.trim()).filter(Boolean);

/** Sample points for set S: its end points exactly, end points ± 1e-4, and a 0.25 grid from −40 to 40 offset by 0.013. */
function samples(S) {
  const pts = [];
  for (const I of S) for (const e of [I.lo, I.hi]) if (e !== null) { pts.push(e); pts.push(fr(num(e) + 1e-4)); pts.push(fr(num(e) - 1e-4)); }
  for (let k = -160; k <= 160; k++) pts.push(fr(k * 250 + 13, 1000));
  return pts;
}
/** True when every piece of the TeX line has exactly the solution set S over R. */
export function equivalent(line, S) {
  const ps = pieces(line).map(predicate).filter(Boolean);
  if (!ps.length) throw new Error(`no inequality in working line ${line}`);
  for (const P of ps) for (const x of samples(S)) if (P(num(x)) !== inSet(S, x)) return false;
  return true;
}
/**
 * Working lines for one set: returns the lines as "$…$" Markdown plus a verifier for the item's check.
 * Usage: const w = steps(S, ['3x + 2 < 14', '3x < 12 \\Rightarrow x < 4']); … w.md … ; check: w.verify(C).
 */
export function steps(S, lines) {
  return {
    lines,
    md: lines.map((l) => `$${l}$`),
    verify(C, label = '') { lines.forEach((l) => C.assert(equivalent(l, S), `${label}working line "${l}" has the verified solution set`)); },
    must(msg = '') { lines.forEach((l) => { if (!equivalent(l, S)) throw new Error(`${msg} working line "${l}" changes the solution set`); }); return this; },
  };
}

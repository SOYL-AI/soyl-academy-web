// Shared helpers for CBSE 11 Mathematics ch05 (Linear Inequalities): String.raw with line breaks, a solver that checks itself
// against brute force, and small formatting helpers.
import { lin, ineq1, solve1, agree, ivTex, condTex, frTex, relTex, fr, F, add, sub, mul, div, num } from './ineq.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, notin) becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };

/**
 * S([a, b], rel, [c, d]) solves a x + b rel c x + d. Coefficients may be integers or [n, d] pairs. The answer is checked against the
 * inequality at every x = k/840 with |x| <= 24 and beside its end point (ineq.agree) before it is returned.
 */
export function S(L, rel, R) {
  const l = lin(L[0], L[1]), rr = lin(R[0], R[1]);
  const pred = ineq1(l, rel, rr);
  const s = solve1(l, rel, rr);
  agree(pred, [s.iv]);
  return { ...s, l, rr, pred, cond: condTex(s.iv), ivT: ivTex(s.iv) };
}
/** "a x + b" as TeX for display in stems (integers only). */
export const linTex = (a, b = 0) => `${a === 1 ? '' : a === -1 ? '-' : a}x${b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${-b}`}`.replace(/^0x \+ /, '').replace(/^0x - /, '-');
export const T = (s) => `$${s}$`;
/** Options for an interval-valued mcq: the displayed strings are also the values compared with the re-solved target. */
export const optsOf = (xs) => xs.map((s) => `$${s}$`);
export { frTex, relTex, fr, F, add, sub, mul, div, num, ivTex, condTex };

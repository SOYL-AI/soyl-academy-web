// Polynomial helpers for CBSE 9 Mathematics ch02 Introduction to Polynomials. Coefficients are exact fractions (Fr), highest power
// first. Values, remainders, quotients, zeroes and factorisations are computed here and cross-checked by multiplying back.
import { Fr, F, gcd, must, r } from '../../cbse-9-mathematics-ch01/src/nm.mjs';
export { Fr, F, gcd, must, r };

export const P = (...c) => trim(c.map((x) => Fr.of(x)));
function trim(p) { let i = 0; while (i < p.length - 1 && p[i].n === 0) i++; return p.slice(i); }
export const deg = (p) => (p.length === 1 && p[0].n === 0 ? -1 : p.length - 1);
export const padd = (p, q) => { const n = Math.max(p.length, q.length); const a = Array(n - p.length).fill(F(0)).concat(p), b = Array(n - q.length).fill(F(0)).concat(q); return trim(a.map((x, i) => x.add(b[i]))); };
export const pneg = (p) => p.map((x) => x.mul(-1));
export const psub = (p, q) => padd(p, pneg(q));
export const pscale = (p, k) => trim(p.map((x) => x.mul(k)));
export function pmul(p, q) {
  const out = Array(p.length + q.length - 1).fill(F(0));
  p.forEach((a, i) => q.forEach((b, j) => { out[i + j] = out[i + j].add(a.mul(b)); }));
  return trim(out);
}
export const peq = (p, q) => { const a = trim(p), b = trim(q); return a.length === b.length && a.every((x, i) => x.eq(b[i])); };
/** Value p(x) for exact x (Horner). */
export const peval = (p, x) => { let v = F(0); for (const c of p) v = v.mul(x).add(c); return v; };
/** Floating-point value, for second-route checks. */
export const pnum = (p, x) => p.reduce((v, c) => v * x + c.num(), 0);
/** Long division: p = d q + rem with deg rem < deg d. */
export function pdivmod(p, d) {
  must(d.length > 0 && d[0].n !== 0, 'divisor is not zero');
  let rem = p.slice(), q = [];
  while (rem.length >= d.length && !(rem.length === 1 && rem[0].n === 0)) {
    const c = rem[0].div(d[0]);
    q.push(c);
    const sub = d.map((x) => x.mul(c));
    rem = rem.map((x, i) => (i < sub.length ? x.sub(sub[i]) : x)).slice(1);
    if (!rem.length) rem = [F(0)];
  }
  return { q: q.length ? q : [F(0)], r: trim(rem) };
}
/** Polynomial with the given roots and leading coefficient. */
export const fromRoots = (roots, lead = 1) => roots.reduce((p, a) => pmul(p, P(1, F(0).sub(Fr.of(a)))), P(lead));
/** Rational zeroes by the rational-root candidates +-a/b (a divides the constant term, b the leading coefficient). */
export function ratRoots(p) {
  const lead = Math.abs(p[0].n), cst = Math.abs(p[p.length - 1].n);
  const divs = (n) => { const o = []; for (let k = 1; k <= Math.abs(n); k++) if (n % k === 0) o.push(k); return o; };
  if (cst === 0) return null;
  const seen = new Set(), out = [];
  for (const a of divs(cst)) for (const b of divs(lead)) for (const s of [1, -1]) {
    const x = F(s * a, b);
    if (!seen.has(x.toString())) { seen.add(x.toString()); if (peval(p, x).n === 0) out.push(x); }
  }
  return out.sort((u, v) => u.num() - v.num());
}
// ---------------------------------------------------------------- TeX
const coefTex = (a, k) => (k > 0 && a.eq(1) ? '' : a.d === 1 ? String(a.n) : a.tex());
const powTex = (k, v) => (k === 0 ? '' : k === 1 ? v : `${v}^{${k}}`);
/** TeX of the polynomial in variable v, highest power first. */
export function ptex(p, v = 'x') {
  const parts = [];
  p.forEach((c, i) => {
    if (c.n === 0) return;
    const k = p.length - 1 - i, a = c.n < 0 ? c.mul(-1) : c;
    const body = `${coefTex(a, k)}${powTex(k, v)}`;
    parts.push(parts.length === 0 ? (c.n < 0 ? `-${body}` : body) : `${c.n < 0 ? '-' : '+'} ${body}`);
  });
  return parts.length ? parts.join(' ') : '0';
}
/** TeX of the linear factor (x - a) with sign tidied: x - 3, x + 2, x - 1/2 as (2x - 1) when withDen is true. */
export const linTex = (a, v = 'x') => (a.d === 1 ? (a.n < 0 ? `${v} + ${-a.n}` : a.n === 0 ? v : `${v} - ${a.n}`) : `${a.d}${v} ${a.n < 0 ? '+' : '-'} ${Math.abs(a.n)}`);
/** TeX of a value as p(a) argument: negatives and fractions. */
export const argTex = (a) => a.tex();
export const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;

// Exact mensuration arithmetic for ICSE 10 Mathematics ch19 (cylinder, cone, sphere).
// Every dimension is an exact fraction (Fr); every formula returns the COEFFICIENT OF PI as an exact fraction, so
// "pi = 22/7" values are exact rationals too. Text is always printed from these values (n), never typed twice.
// Self-test at the bottom of the file runs on import.
import { Fr, F } from './fr.mjs';

export const must = (c, m) => { if (!c) throw new Error(m); };
export const fr = (v) => Fr.of(v);
export const PI = F(22, 7);
export const PI314 = fr(3.14);

/** Value of k pi for pi = p (default 22/7). */
export const pv = (k, p = PI) => k.mul(p);

const isqrtBig = (v) => { const s = Math.round(Math.sqrt(v)); return s * s === v ? s : null; };
/** Exact square root of a non-negative fraction, or throws. */
export function sqrtFr(x) {
  const a = isqrtBig(x.n), b = isqrtBig(x.d);
  must(a !== null && b !== null, `sqrt of ${x} is not rational`);
  return F(a, b);
}

/** Terminating decimal string of a fraction (throws if it does not terminate). */
export function dec(x) {
  let d = x.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  must(d === 1, `${x} is not a terminating decimal`);
  if (x.isInt()) return String(x.n);
  const neg = x.n < 0, nn = Math.abs(x.n);
  let k = 0;
  const den = x.d;
  while ((10 ** k) % den !== 0) k++;
  const scaled = (nn * (10 ** k)) / den;
  let s = String(scaled).padStart(k + 1, '0');
  s = `${s.slice(0, s.length - k)}.${s.slice(s.length - k)}`;
  s = s.replace(/0+$/, '').replace(/\.$/, '');
  return (neg ? '-' : '') + s;
}
/** n(x): integer or terminating decimal (the printed form). */
export const n = (x) => dec(fr(x));
/** Fraction in maths mode. */
export const dfrac = (x) => (fr(x).isInt() ? String(fr(x).n) : `\\dfrac{${fr(x).n}}{${fr(x).d}}`);
/** Coefficient of pi printed: "154\\pi" (or "\\dfrac{4}{3}\\pi"). */
export const piTex = (k) => (k.eq(1) ? '\\pi' : `${k.isInt() ? k.n : `\\dfrac{${k.n}}{${k.d}}`}\\pi`);

// ---------------------------------------------------------------- formulas (coefficient of pi)
const Z = (v) => fr(v);
export const cyl = {
  csa: (r, h) => Z(2).mul(r).mul(h),
  tsa: (r, h) => Z(2).mul(r).mul(r.add(h)),
  vol: (r, h) => r.mul(r).mul(h),
  /** hollow cylinder with outer radius R, inner radius r, height h */
  hvol: (R, r, h) => R.mul(R).sub(r.mul(r)).mul(h),
  htsa: (R, r, h) => Z(2).mul(R.add(r)).mul(R.sub(r).add(h)),
  hcsaOuter: (R, h) => Z(2).mul(R).mul(h),
  hcsaInner: (r, h) => Z(2).mul(r).mul(h),
};
export const cone = {
  l: (r, h) => sqrtFr(r.mul(r).add(h.mul(h))),
  csa: (r, l) => r.mul(l),
  tsa: (r, l) => r.mul(r.add(l)),
  vol: (r, h) => r.mul(r).mul(h).div(3),
};
export const sph = {
  sa: (r) => Z(4).mul(r).mul(r),
  vol: (r) => Z(4).mul(r).mul(r).mul(r).div(3),
  shell: (R, r) => Z(4).mul(R.pow(3).sub(r.pow(3))).div(3),
  shellSA: (R, r) => Z(4).mul(R.mul(R).add(r.mul(r))),
};
export const hem = {
  csa: (r) => Z(2).mul(r).mul(r),
  tsa: (r) => Z(3).mul(r).mul(r),
  vol: (r) => Z(2).mul(r).mul(r).mul(r).div(3),
  shell: (R, r) => Z(2).mul(R.pow(3).sub(r.pow(3))).div(3),
};
/** Cube root of a non-negative fraction, or throws. */
export function cbrtFr(x) {
  const c = (v) => { const s = Math.round(Math.cbrt(v)); return s ** 3 === v ? s : null; };
  const a = c(x.n), b = c(x.d);
  must(a !== null && b !== null, `cube root of ${x} is not rational`);
  return F(a, b);
}

// ---------------------------------------------------------------- units
export const CM3_PER_L = 1000;
export const L_PER_M3 = 1000;

// ---------------------------------------------------------------- self-test
{
  const seven = fr(7), ten = fr(10);
  must(pv(cyl.vol(seven, ten)).eq(1540), 'cylinder 7,10 volume 1540');
  must(pv(cyl.tsa(seven, ten)).eq(748), 'cylinder TSA 748');
  must(cone.l(fr(7), fr(24)).eq(25), 'slant 25');
  must(pv(sph.vol(fr(21))).eq(38808), 'sphere 21');
  must(pv(hem.tsa(fr(14))).eq(1848), 'hemisphere 14 TSA');
  must(dec(fr(2.25)) === '2.25' && dec(F(1, 8)) === '0.125' && dec(F(7, 1)) === '7' && dec(F(1, 20)) === '0.05', 'dec');
  must(sqrtFr(F(25, 4)).eq(F(5, 2)), 'sqrtFr');
}

// exports for convenience
export { Fr, F };
/** Rupees: integer or terminating decimal. */
export const rs = (x) => `₹ ${n(x)}`;

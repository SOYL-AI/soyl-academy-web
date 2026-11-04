// Exact complex-rational arithmetic for CBSE 11 Mathematics ch04 (Complex Numbers and Quadratic Equations).
// Real and imaginary parts are BigInt fractions, so sums, products, quotients, powers of i, conjugates and
// squared moduli are exact. Moduli are exact surds; arguments are computed numerically with atan2.
import { geom, plot } from './lib.mjs';

// ------------------------------------------------------------------ fractions (BigInt)
const ab = (a) => (a < 0n ? -a : a);
const gcdB = (a, b) => { a = ab(a); b = ab(b); while (b) [a, b] = [b, a % b]; return a; };
export const fr = (n, d = 1n) => {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('zero denominator');
  if (d < 0n) { n = -n; d = -d; }
  const k = gcdB(n, d) || 1n;
  return { n: n / k, d: d / k };
};
const asF = (v) => (typeof v === 'object' && v !== null && 'n' in v ? v : Array.isArray(v) ? fr(v[0], v[1]) : fr(v));
export const fadd = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
export const fsub = (a, b) => fr(a.n * b.d - b.n * a.d, a.d * b.d);
export const fmul = (a, b) => fr(a.n * b.n, a.d * b.d);
export const fdiv = (a, b) => fr(a.n * b.d, a.d * b.n);
export const fneg = (a) => fr(-a.n, a.d);
export const feq = (a, b) => a.n === b.n && a.d === b.d;
export const fzero = (a) => a.n === 0n;
export const fnum = (a) => Number(a.n) / Number(a.d);
export const fabs = (a) => fr(ab(a.n), a.d);
export const ftex = (a) => (a.d === 1n ? `${a.n}` : `${a.n < 0n ? '-' : ''}\\dfrac{${ab(a.n)}}{${a.d}}`);

// ------------------------------------------------------------------ complex numbers
/** C(3, -4) = 3 - 4i; parts may be integers or [num, den] pairs. */
export const C = (re, im = 0) => ({ re: asF(re), im: asF(im) });
export const I = C(0, 1);
export const cadd = (a, b) => C(fadd(a.re, b.re), fadd(a.im, b.im));
export const csub = (a, b) => C(fsub(a.re, b.re), fsub(a.im, b.im));
export const cmul = (a, b) => C(fsub(fmul(a.re, b.re), fmul(a.im, b.im)), fadd(fmul(a.re, b.im), fmul(a.im, b.re)));
export const cconj = (a) => C(a.re, fneg(a.im));
export const cneg = (a) => C(fneg(a.re), fneg(a.im));
export const cmod2 = (a) => fadd(fmul(a.re, a.re), fmul(a.im, a.im));
export const cdiv = (a, b) => {
  const d = cmod2(b);
  if (fzero(d)) throw new Error('division by zero');
  const n = cmul(a, cconj(b));
  return C(fdiv(n.re, d), fdiv(n.im, d));
};
export const cinv = (a) => cdiv(C(1), a);
export const ceq = (a, b) => feq(a.re, b.re) && feq(a.im, b.im);
export const cpow = (a, n) => {
  if (n < 0) return cinv(cpow(a, -n));
  let out = C(1), base = a, k = n;
  while (k > 0) { if (k & 1) out = cmul(out, base); base = cmul(base, base); k >>= 1; }
  return out;
};
export const cnum = (a) => [fnum(a.re), fnum(a.im)];
export const isReal = (a) => fzero(a.im);
export const isImag = (a) => fzero(a.re) && !fzero(a.im);

const imAbs = (f) => (feq(f, fr(1)) ? 'i' : `${ftex(f)}i`);
/** LaTeX of a + bi in the usual form (a, bi, a + bi, a - bi, i, -i). */
export const ctex = (z) => {
  const { re, im } = z;
  if (fzero(im)) return ftex(re);
  const imt = imAbs(fabs(im));
  if (fzero(re)) return `${im.n < 0n ? '-' : ''}${imt}`;
  return `${ftex(re)} ${im.n < 0n ? '-' : '+'} ${imt}`;
};
/** (re) + (im)i with a bracket round the whole number, for use inside products. */
export const cpar = (z) => `(${ctex(z)})`;

// ------------------------------------------------------------------ exact surds and moduli
const isqrtB = (n) => { if (n < 2n) return n; let x = BigInt(Math.floor(Math.sqrt(Number(n)))); while (x * x > n) x--; while ((x + 1n) * (x + 1n) <= n) x++; return x; };
/** sqrt of a non-negative fraction as an exact surd: { tex, num, square (sqrt is rational), coef, rad, den }. */
export function surd(q) {
  if (q.n < 0n) throw new Error('surd of a negative fraction');
  const m = q.n * q.d;
  let s = 1n, rest = m;
  for (let p = 2n; p * p <= rest; p++) while (rest % (p * p) === 0n) { rest /= p * p; s *= p; }
  const k = gcdB(s, q.d);
  const coef = s / k, den = q.d / k;
  let tex;
  if (rest === 1n) tex = den === 1n ? `${coef}` : `\\dfrac{${coef}}{${den}}`;
  else {
    const top = `${coef === 1n ? '' : coef}\\sqrt{${rest}}`;
    tex = den === 1n ? top : `\\dfrac{${top}}{${den}}`;
  }
  const num = (Number(coef) * Math.sqrt(Number(rest))) / Number(den);
  return { tex, num, square: rest === 1n, coef, rad: rest, den };
}
export const cmod = (z) => surd(cmod2(z));
/** Principal argument in degrees, in (-180, 180], numerically (atan2). */
export const cargDeg = (z) => (Math.atan2(fnum(z.im), fnum(z.re)) * 180) / Math.PI;
export const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// ------------------------------------------------------------------ floating complex numbers (for polar form and surd roots)
export const fc = {
  mul: ([a, b], [c, d]) => [a * c - b * d, a * d + b * c],
  add: ([a, b], [c, d]) => [a + c, b + d],
  scale: ([a, b], k) => [a * k, b * k],
  polar: (r, deg) => [r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180)],
  abs: ([a, b]) => Math.hypot(a, b),
  near: ([a, b], [c, d], e = 1e-9) => Math.abs(a - c) < e && Math.abs(b - d) < e,
};

// ------------------------------------------------------------------ quadratics a x^2 + b x + c = 0 with real coefficients
/**
 * Solves a x^2 + b x + c = 0 over the complex numbers and checks the roots by substitution.
 * Exact substitution (BigInt fractions) when the roots are complex-rational, otherwise floating substitution.
 */
export function quad(a, b, c) {
  a = asF(a); b = asF(b); c = asF(c);
  const D = fsub(fmul(b, b), fmul(fr(4), fmul(a, c)));
  const re = fdiv(fneg(b), fmul(fr(2), a));
  let roots, exact = false, imTex, reTex = ftex(re);
  if (D.n < 0n) {
    const s = surd(fdiv(fneg(D), fmul(fr(4), fmul(a, a))));      // |imaginary part| = sqrt(-D) / (2|a|)
    imTex = s.square ? imAbs(fr(s.coef, s.den)) : `${s.tex}\\,i`;
    if (s.square) {
      exact = true;
      const im = fr(s.coef, s.den);
      roots = [C(re, im), C(re, fneg(im))];
      const A = C(a), B = C(b), Cc = C(c);
      for (const z of roots) if (!ceq(cadd(cadd(cmul(A, cmul(z, z)), cmul(B, z)), Cc), C(0))) throw new Error('exact root substitution failed');
      if (!ceq(cadd(roots[0], roots[1]), C(fdiv(fneg(b), a)))) throw new Error('sum of roots');
      if (!ceq(cmul(roots[0], roots[1]), C(fdiv(c, a)))) throw new Error('product of roots');
    } else {
      const im = s.num, ar = fnum(a), br = fnum(b), cr = fnum(c);
      roots = [[fnum(re), im], [fnum(re), -im]];
      for (const z of roots) {
        const r = fc.add(fc.add(fc.scale(fc.mul(z, z), ar), fc.scale(z, br)), [cr, 0]);
        if (fc.abs(r) > 1e-9) throw new Error('surd root substitution failed');
      }
    }
  } else {
    const s = surd(D);
    const rr = D.n === 0n ? [re, re] : s.square ? [fadd(re, fdiv(fr(s.coef, s.den), fmul(fr(2), a))), fsub(re, fdiv(fr(s.coef, s.den), fmul(fr(2), a)))] : null;
    roots = rr ?? [[fnum(re) + s.num / (2 * Math.abs(fnum(a))), 0], [fnum(re) - s.num / (2 * Math.abs(fnum(a))), 0]];
    exact = !!rr;
  }
  const pm = fzero(re) ? `\\pm ${imTex}` : `${reTex} \\pm ${imTex}`;
  return { D, a, b, c, re, roots, exact, reTex, imTex, pm, complex: D.n < 0n };
}

// ------------------------------------------------------------------ figures
/** plot() whose 'free' points are also flagged on_curve:false for the pipeline lint. */
export function plotF(spec, alt, caption) {
  const v = plot(spec, alt, caption);
  (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; });
  return v;
}
/**
 * Argand diagram. pts: [{ z: C(...), label, vec: true|false }]; every number is drawn as a point (a, b) with
 * the real part across and the imaginary part up; vec adds the arrow-less segment from the origin.
 * extra: { fns, vlines, hlines, lines: [[z1, z2, label]] } for circles and segments.
 */
export function argand({ x, y, pts, lines = [], fns = [] }, alt, caption) {
  const series = [];
  for (const p of pts) if (p.vec) series.push({ label: p.vecLabel ?? `from the origin to ${p.plain ?? 'the point'}`, points: [[0, 0], cnum(p.z)], kind: 'line' });
  for (const [z1, z2, label] of lines) series.push({ label, points: [cnum(z1), cnum(z2)], kind: 'line' });
  const v = plotF({ x, y, xl: 'Real axis', yl: 'Imaginary axis', fns, pts: pts.map((p) => [...cnum(p.z), p.label, p.curve ? undefined : 'free']) }, alt, caption);
  v.spec.series = series;
  return v;
}


/**
 * Polar-form figure: axes through O, the point P = (re, im) drawn to scale (s drawing units per unit), the segment OP,
 * a dashed perpendicular to the real axis and the angle from the positive real axis to OP labelled with its measure.
 */
export function polarFig({ re, im, argDeg, s = 1.7, zLabel, angleLabel, alt, caption }) {
  const W = 9, H = 8, ox = 4.5, oy = 4;
  const rd = (v) => Math.round(v * 1000) / 1000;
  const px = rd(ox + re * s), py = rd(oy + im * s);
  const points = {
    O: { at: [ox, oy], label: '$O$', label_position: 'sw' },
    Xp: { at: [8.6, oy], label: 'Real axis', label_position: 'n' },
    Xn: { at: [0.4, oy], label: false },
    Yp: { at: [ox, 7.6], label: 'Imaginary axis', label_position: 'e' },
    Yn: { at: [ox, 0.4], label: false },
    P: { at: [px, py], label: zLabel, label_position: re >= 0 ? 'ne' : 'nw' },
  };
  const segments = [{ from: 'Xn', to: 'Xp', arrows: 1 }, { from: 'Yn', to: 'Yp', arrows: 1 }, { from: 'O', to: 'P' }];
  const angles = [{ at: 'O', from: 'Xp', to: 'P', label: angleLabel }];
  if (Math.abs(im) > 1e-9 && Math.abs(re) > 1e-9) {
    points.F = { at: [px, oy], label: false };
    segments.push({ from: 'P', to: 'F', dashed: true });
    angles.push({ at: 'F', from: 'P', to: 'O', right: true });
  }
  return geom({ width: W, height: H, points, segments, angles, not_to_scale: true }, alt, caption);
}
export { geom };

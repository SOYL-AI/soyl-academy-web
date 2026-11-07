// Exact complex arithmetic for ISC 11 Mathematics ch05 (Complex Numbers).
// Real and imaginary parts are BigInt fractions, so sums, products, quotients, powers of i, conjugates, squared moduli
// and square roots (when they are Gaussian-rational) are exact. The cube roots of unity live in the exact ring
// Z[w] = { a + b w : a, b rational } with w^2 = -1 - w. Arguments are computed numerically with atan2.
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
export const cscale = (a, k) => C(fmul(a.re, asF(k)), fmul(a.im, asF(k)));
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
/** Bracketed LaTeX, for use inside products and powers. */
export const cpar = (z) => `(${ctex(z)})`;
export const tz = (z) => `$${ctex(z)}$`;

// ------------------------------------------------------------------ exact surds, moduli, arguments
const isqrtB = (n) => { if (n < 2n) return n; let x = BigInt(Math.floor(Math.sqrt(Number(n)))); while (x * x > n) x--; while ((x + 1n) * (x + 1n) <= n) x++; return x; };
/** sqrt of a non-negative fraction as an exact surd: { tex, num, square (sqrt is rational), coef, rad, den }. */
export function surd(q) {
  if (q.n < 0n) throw new Error('surd of a negative fraction');
  if (q.n === 0n) return { tex: '0', num: 0, square: true, coef: 0n, rad: 1n, den: 1n, rat: fr(0) };
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
  return { tex, num, square: rest === 1n, coef, rad: rest, den, rat: rest === 1n ? fr(coef, den) : null };
}
export const cmod = (z) => surd(cmod2(z));
/** Principal argument in degrees, in (-180, 180], numerically (atan2). */
export const cargDeg = (z) => { const a = (Math.atan2(fnum(z.im), fnum(z.re)) * 180) / Math.PI; return a === -180 ? 180 : a; };
export const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (x) => (x * 180) / Math.PI;
/** Reduce an angle in degrees into (-180, 180]. */
export const wrapDeg = (a) => { let t = ((a % 360) + 360) % 360; if (t > 180) t -= 360; return t; };

// ------------------------------------------------------------------ square root of a complex number
/**
 * Square roots of a + ib by the standard method: x^2 - y^2 = a, 2xy = b, x^2 + y^2 = |z|.
 * Returns { exact, roots: [z1, z2], m, x2, y2 } with exact Gaussian-rational roots when |z|, (|z| + a)/2 and
 * (|z| - a)/2 are all squares of rationals; otherwise exact: false and roots are floating pairs [x, y].
 */
export function csqrt(z) {
  const m2 = cmod2(z);
  const sm = surd(m2);
  if (sm.square) {
    const m = sm.rat;
    const x2 = fdiv(fadd(m, z.re), fr(2)), y2 = fdiv(fsub(m, z.re), fr(2));
    const sx = surd(x2), sy = surd(y2);
    if (sx.square && sy.square) {
      let x = sx.rat, y = sy.rat;
      if (z.im.n < 0n) y = fneg(y);
      const root = C(x, y);
      if (!ceq(cmul(root, root), z)) throw new Error('exact square root failed the squaring check');
      return { exact: true, roots: [root, cneg(root)], m, x2, y2 };
    }
  }
  const [a, b] = cnum(z), m = Math.hypot(a, b);
  const x = Math.sqrt((m + a) / 2), y = (b < 0 ? -1 : 1) * Math.sqrt((m - a) / 2);
  const out = { exact: false, roots: [[x, y], [-x, -y]], m };
  const sq = (p) => [p[0] * p[0] - p[1] * p[1], 2 * p[0] * p[1]];
  if (Math.abs(sq(out.roots[0])[0] - a) > 1e-9 || Math.abs(sq(out.roots[0])[1] - b) > 1e-9) throw new Error('floating square root failed the squaring check');
  return out;
}

// ------------------------------------------------------------------ floating complex numbers (polar form, surd values)
export const fc = {
  mul: ([a, b], [c, d]) => [a * c - b * d, a * d + b * c],
  add: ([a, b], [c, d]) => [a + c, b + d],
  scale: ([a, b], k) => [a * k, b * k],
  polar: (r, d) => [r * Math.cos((d * Math.PI) / 180), r * Math.sin((d * Math.PI) / 180)],
  abs: ([a, b]) => Math.hypot(a, b),
  arg: ([a, b]) => deg(Math.atan2(b, a)),
  near: ([a, b], [c, d], e = 1e-9) => Math.abs(a - c) < e && Math.abs(b - d) < e,
};

// ------------------------------------------------------------------ the ring Z[w], w = (-1 + i sqrt 3)/2, w^2 = -1 - w
/** W(a, b) = a + b w with rational a, b. Everything is exact. */
export const W = (a, b = 0) => ({ a: asF(a), b: asF(b) });
export const W1 = W(1, 0), WW = W(0, 1), WW2 = W(-1, -1);
export const wadd = (x, y) => W(fadd(x.a, y.a), fadd(x.b, y.b));
export const wsub = (x, y) => W(fsub(x.a, y.a), fsub(x.b, y.b));
export const wneg = (x) => W(fneg(x.a), fneg(x.b));
// (a + b w)(c + d w) = ac + (ad + bc) w + bd w^2 = (ac - bd) + (ad + bc - bd) w
export const wmul = (x, y) => W(fsub(fmul(x.a, y.a), fmul(x.b, y.b)), fsub(fadd(fmul(x.a, y.b), fmul(x.b, y.a)), fmul(x.b, y.b)));
export const wpow = (x, n) => { let out = W1; for (let k = 0; k < n; k++) out = wmul(out, x); return out; };
export const weq = (x, y) => feq(x.a, y.a) && feq(x.b, y.b);
/** Conjugate of a + b w is a + b w^2 = (a - b) - b w. */
export const wconj = (x) => W(fsub(x.a, x.b), fneg(x.b));
/** Floating value [re, im] of a + b w. */
export const wnum = (x) => [fnum(x.a) - fnum(x.b) / 2, (fnum(x.b) * Math.sqrt(3)) / 2];
/** w^n for any integer n (w^3 = 1). */
export const wp = (n) => wpow(WW, ((n % 3) + 3) % 3);

// ------------------------------------------------------------------ figures
/** plot() whose 'free' points are also flagged on_curve:false for the pipeline lint. */
export function plotF(spec, alt, caption) {
  const v = plot(spec, alt, caption);
  (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; });
  return v;
}
/**
 * Argand diagram. pts: [{ z: C(...) or [re, im], label, vec: true|false, curve }]; every number is drawn as a point
 * (a, b) with the real part across and the imaginary part up; vec adds the segment from the origin.
 * lines: [[z1, z2, label]] for extra segments; fns for circles (points with curve: true lie on a function).
 */
export function argand({ x, y, pts, lines = [], fns = [] }, alt, caption) {
  const num = (z) => (Array.isArray(z) ? z : cnum(z));
  const series = [];
  for (const p of pts) if (p.vec) series.push({ label: p.vecLabel ?? `from the origin to ${p.plain ?? 'the point'}`, points: [[0, 0], num(p.z)], kind: 'line' });
  for (const [z1, z2, label] of lines) series.push({ label, points: [num(z1), num(z2)], kind: 'line' });
  const v = plotF({ x, y, xl: 'Real axis', yl: 'Imaginary axis', fns, pts: pts.map((p) => [...num(p.z), p.label, p.curve ? undefined : 'free']) }, alt, caption);
  v.spec.series = series;
  return v;
}

/**
 * Polar-form figure: axes through O, the point P = (re, im) drawn to scale (s drawing units per unit), the segment OP,
 * a dashed perpendicular to the real axis and the angle from the positive real axis to OP labelled with its measure.
 */
export function polarFig({ re, im, s = 1.7, zLabel, angleLabel, alt, caption }) {
  const Wd = 9, H = 8, ox = 4.5, oy = 4;
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
  return geom({ width: Wd, height: H, points, segments, angles, not_to_scale: true }, alt, caption);
}

/** Unit circle with the cube roots of unity at 0, 120 and 240 degrees joined into a triangle (drawn to scale). */
export function unityFig({ alt, caption }) {
  const Wd = 7, O = [3.5, 3.5], R = 2.6;
  const rd = (v) => Math.round(v * 1000) / 1000;
  const at = (d) => [rd(O[0] + R * Math.cos(rad(d))), rd(O[1] + R * Math.sin(rad(d)))];
  const points = {
    O: { at: O, label: '$O$', label_position: 'sw' },
    XL: { at: [0.3, 3.5], label: false }, XR: { at: [6.7, 3.5], label: false },
    YB: { at: [3.5, 0.3], label: false }, YT: { at: [3.5, 6.7], label: false },
    P1: { at: at(0), label: '$1$', label_position: 'se' },
    PW: { at: at(120), label: '$\\omega$', label_position: 'nw' },
    PW2: { at: at(240), label: '$\\omega^2$', label_position: 'sw' },
  };
  const segments = [{ from: 'XL', to: 'XR' }, { from: 'YB', to: 'YT' }, { from: 'P1', to: 'PW' }, { from: 'PW', to: 'PW2' }, { from: 'PW2', to: 'P1' }, { from: 'O', to: 'PW', dashed: true }, { from: 'O', to: 'PW2', dashed: true }, { from: 'O', to: 'P1', dashed: true }];
  const angles = [{ at: 'O', from: 'P1', to: 'PW', label: '$120^\\circ$' }];
  return geom({ width: Wd, height: Wd, points, segments, circles: [{ center: 'O', radius: R }], angles }, alt, caption);
}
export { geom, plot };

// ------------------------------------------------------------------ small formatting helpers
export const r = String.raw;
export const rn = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const D = (s) => `$${s}$`;
export const f2 = (v) => { const t = (Math.round(v * 100) / 100).toFixed(2); return t === '-0.00' ? '0.00' : t; };
export const f3 = (v) => { const t = (Math.round(v * 1e3) / 1e3).toFixed(3); return t === '-0.000' ? '0.000' : t; };
export const f4 = (v) => { const t = (Math.round(v * 1e4) / 1e4).toFixed(4); return t === '-0.0000' ? '0.0000' : t; };
export const dg = (v) => `$${v}^\\circ$`;

// Exact arithmetic for ISC 11 Mathematics ch06 Quadratic Equations.
// Fractions are reduced integer pairs. Roots live in the ring Q[s] with s^2 = d (d an integer): a root a + b s is a real surd
// when d > 0 (s = sqrt d) and a non-real number when d < 0 (s = i sqrt(-d)); d = -1 gives ordinary complex numbers a + bi.
// Every claimed root is verified by exact substitution in that ring, and every symmetric function of the roots is computed
// from the actual roots and compared with the formula in the coefficients.

/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, neq) becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

// ---------------------------------------------------------------- fractions
export const fr = (n, d = 1) => {
  if (d === 0) throw new Error('zero denominator');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  return { n: n / g, d: d / g };
};
const F = (x) => (typeof x === 'number' ? fr(x) : x);
export const fadd = (x, y) => fr(F(x).n * F(y).d + F(y).n * F(x).d, F(x).d * F(y).d);
export const fsub = (x, y) => fr(F(x).n * F(y).d - F(y).n * F(x).d, F(x).d * F(y).d);
export const fmul = (x, y) => fr(F(x).n * F(y).n, F(x).d * F(y).d);
export const fdiv = (x, y) => fr(F(x).n * F(y).d, F(x).d * F(y).n);
export const fneg = (x) => fr(-F(x).n, F(x).d);
export const feq = (x, y) => F(x).n === F(y).n && F(x).d === F(y).d;
export const fval = (x) => F(x).n / F(x).d;
export const fpow = (x, k) => { let t = fr(1); for (let i = 0; i < k; i++) t = fmul(t, x); return t; };
/** plain-text fraction "n/d" or "n" */
export const fstr = (x) => (F(x).d === 1 ? String(F(x).n) : `${F(x).n}/${F(x).d}`);
/** LaTeX of a fraction with \dfrac */
export const ftex = (x) => { const v = F(x); return v.d === 1 ? String(v.n) : `${v.n < 0 ? '-' : ''}\\dfrac{${Math.abs(v.n)}}{${v.d}}`; };

// ---------------------------------------------------------------- ring Q[s], s^2 = d
export const E = (a, b = 0) => ({ a: F(a), b: F(b) });
export const eadd = (x, y) => ({ a: fadd(x.a, y.a), b: fadd(x.b, y.b) });
export const esub = (x, y) => ({ a: fsub(x.a, y.a), b: fsub(x.b, y.b) });
export const escale = (k, x) => ({ a: fmul(k, x.a), b: fmul(k, x.b) });
export const emul = (x, y, d) => ({ a: fadd(fmul(x.a, y.a), fmul(fmul(x.b, y.b), d)), b: fadd(fmul(x.a, y.b), fmul(x.b, y.a)) });
export const ezero = (x) => x.a.n === 0 && x.b.n === 0;
export const eeq = (x, y) => feq(x.a, y.a) && feq(x.b, y.b);
export const epow = (x, k, d) => { let t = E(1); for (let i = 0; i < k; i++) t = emul(t, x, d); return t; };
/** reciprocal: 1 / (a + b s) = (a - b s) / (a^2 - d b^2) */
export const einv = (x, d) => {
  const n = fsub(fmul(x.a, x.a), fmul(d, fmul(x.b, x.b)));
  if (n.n === 0) throw new Error('division by zero in ring');
  return { a: fdiv(x.a, n), b: fdiv(fneg(x.b), n) };
};
/** polynomial with coefficients (highest power first, numbers or fractions) at a + b s */
export const polyAt = (coeffs, x, d) => coeffs.reduce((acc, c) => eadd(emul(acc, x, d), E(c)), E(0));
/** is a + b s a root of the polynomial? (a, b numbers or fractions) */
export const isRoot = (coeffs, a, b, d) => ezero(polyAt(coeffs, E(a, b), d));

/** roots of ax^2 + bx + c as elements of Q[s], s^2 = D (the discriminant) */
export function quad(a, b, c) {
  const D = b * b - 4 * a * c;
  const m = fr(-b, 2 * a), h = fr(1, 2 * a);
  const r1 = { a: m, b: h }, r2 = { a: m, b: fneg(h) };
  return { a, b, c, D, r1, r2, d: D };
}
/** verify the formula roots by substitution, and sum and product against -b/a and c/a; returns the facts */
export function verifyQuad(a, b, c) {
  const q = quad(a, b, c);
  const coeffs = [a, b, c];
  const ok1 = ezero(polyAt(coeffs, q.r1, q.d)), ok2 = ezero(polyAt(coeffs, q.r2, q.d));
  const sum = eadd(q.r1, q.r2), prod = emul(q.r1, q.r2, q.d);
  const sumOk = ezero({ a: fsub(sum.a, fr(-b, a)), b: sum.b }), prodOk = ezero({ a: fsub(prod.a, fr(c, a)), b: prod.b });
  if (!(ok1 && ok2 && sumOk && prodOk)) throw new Error(`verifyQuad failed for ${a}, ${b}, ${c}`);
  return { ...q, sum: fr(-b, a), prod: fr(c, a) };
}
/** the polynomial x^2 - S x + P (as integer coefficients [A, B, C] after clearing denominators, A > 0) */
export function formEq(S, P) {
  const s = F(S), p = F(P);
  const L = (s.d * p.d) / gcd(s.d, p.d);
  let A = L, B = -fval(s) * L, C = fval(p) * L;
  A = Math.round(A); B = Math.round(B); C = Math.round(C);
  const g = gcd(gcd(A, Math.abs(B)), Math.abs(C));
  return [A / g, B / g, C / g];
}
/** coefficients -> display text "A x^2 + B x + C = 0" (LaTeX), skipping zero terms and unit coefficients */
export function eqTex(coeffs, v = 'x') {
  const deg = coeffs.length - 1;
  let out = '';
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const p = deg - i;
    const mag = Math.abs(c);
    const term = p === 0 ? String(mag) : `${mag === 1 ? '' : mag}${v}${p === 1 ? '' : `^{${p}}`}`;
    out += out ? (c < 0 ? ` - ${term}` : ` + ${term}`) : (c < 0 ? `-${term}` : term);
  });
  return `${out} = 0`;
}
/** discriminant */
export const disc = (a, b, c) => b * b - 4 * a * c;
export const isSquare = (n) => n >= 0 && Number.isInteger(Math.sqrt(n));
/** nature of roots of a quadratic with integer coefficients */
export function nature(a, b, c) {
  const D = disc(a, b, c);
  if (D < 0) return 'non-real';
  if (D === 0) return 'equal';
  return isSquare(D) ? 'rational' : 'irrational';
}
/** s^k + t^k from s, p of a quadratic (Newton): returns fractions for k = 1, 2, 3, 4 */
export function powerSums(S, P, upto = 4) {
  const out = [fr(2), F(S)]; // p0 = 2, p1 = S
  for (let k = 2; k <= upto; k++) out.push(fsub(fmul(S, out[k - 1]), fmul(P, out[k - 2])));
  return out;
}
/** vertex of a x^2 + b x + c: x = -b/2a, value = c - b^2/4a */
export const vertex = (a, b, c) => { const x = fr(-b, 2 * a); const y = fsub(fr(c), fr(b * b, 4 * a)); return { x, y }; };
/** value of a x^2 + b x + c at a fraction */
export const qval = (a, b, c, x) => fadd(fadd(fmul(a, fmul(x, x)), fmul(b, x)), fr(c));
/** integer roots of ax^2+bx+c in a window, for cross-checks */
export const intRoots = (a, b, c, lo = -200, hi = 200) => range(lo, hi).filter((x) => a * x * x + b * x + c === 0);
/** exact check that two real functions agree on an integer grid / 8 */
export const near = (u, v, tol = 1e-9) => Math.abs(u - v) <= tol;
export const xs8 = range(-80, 80).map((k) => k / 8);

/** r1^k + r2^k computed from the actual roots in Q[s]; the s-part must vanish (symmetric), returns a fraction */
export function rootsPow(q, k) {
  const t = eadd(epow(q.r1, k, q.d), epow(q.r2, k, q.d));
  if (t.b.n !== 0) throw new Error('rootsPow: result not rational');
  return t.a;
}
/** product of roots computed from the actual roots, as a fraction */
export function rootsProd(q) {
  const t = emul(q.r1, q.r2, q.d);
  if (t.b.n !== 0) throw new Error('rootsProd: not rational');
  return t.a;
}
/** does the polynomial (integer coefficients) vanish at both pm roots a +- b s ? */
export const isPmRoot = (coeffs, a, b, d) => isRoot(coeffs, a, b, d) && isRoot(coeffs, a, fneg(F(b)), d);
/** do the quadratic's coefficients [A, B, C] vanish at the (fraction) roots listed? */
export const hasRoots = (coeffs, roots) => roots.every((x) => ezero(polyAt(coeffs, E(x), 1)));

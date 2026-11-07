// Identity registry for ISC 11 Mathematics ch05 (Complex Numbers).
// Every rule taught or used in the chapter is tested EXACTLY (BigInt fractions, Z[w] for the cube roots of unity) on a grid of
// Gaussian rationals, and the argument rules numerically on a grid of non-zero numbers in all four quadrants.
// verifyAll() throws if any rule fails or covers too few cases to mean anything; it returns the case counts.
import { C, I, fr, cadd, csub, cmul, cdiv, cinv, cconj, cneg, cpow, cmod2, ceq, cscale, csqrt, cnum, cargDeg, wrapDeg, near, feq, fadd, fmul, fnum,
  W, W1, WW, WW2, wadd, wsub, wmul, wpow, weq, wconj, wnum, wp, fc, surd } from './cx.mjs';

const VALS = [-4, -3, -2, -1, 0, 1, 2, 3, 5];
const GRID = [];
for (const a of VALS) for (const b of VALS) GRID.push(C(a, b));
GRID.push(C([1, 2], [-3, 4]), C([-5, 3], [2, 7]), C([7, 5], [-1, 6]));
const NZ = GRID.filter((z) => !(z.re.n === 0n && z.im.n === 0n));
const NOTNEG = NZ.filter((z) => !(z.im.n === 0n && z.re.n < 0n));

export function verifyAll() {
  const n = {};
  const need = (name, count, min, ok) => { if (!ok) throw new Error(`identity failed: ${name}`); if (count < min) throw new Error(`identity ${name} covers only ${count} cases`); n[name] = count; };
  const each2 = (list, f) => { let c = 0, ok = true; for (const x of list) for (const y of list) { ok = ok && f(x, y); c++; } return [c, ok]; };
  const each1 = (list, f) => { let c = 0, ok = true; for (const x of list) { ok = ok && f(x); c++; } return [c, ok]; };
  let c, ok;

  // ---- powers of i
  [c, ok] = each1(Array.from({ length: 81 }, (_, k) => k - 40), (k) => ceq(cpow(I, k), cpow(I, ((k % 4) + 4) % 4)) && ceq(cadd(cadd(cpow(I, k), cpow(I, k + 1)), cadd(cpow(I, k + 2), cpow(I, k + 3))), C(0)));
  need('i^n cycle of four and four consecutive powers sum to 0', c, 81, ok);
  // ---- algebra
  [c, ok] = each2(GRID, (x, y) => ceq(cadd(x, y), cadd(y, x)) && ceq(cmul(x, y), cmul(y, x)) && ceq(csub(cadd(x, y), y), x) && ceq(cadd(x, cneg(x)), C(0)));
  need('commutative sum and product, additive inverse', c, 81 * 81, ok);
  [c, ok] = each2(NZ, (x, y) => ceq(cmul(cdiv(x, y), y), x) && ceq(cmul(x, cinv(x)), C(1)) && ceq(cinv(x), cscale(cconj(x), fr(cmod2(x).d, cmod2(x).n))));
  need('division undone by multiplication; z times 1/z = 1; 1/z = conjugate over |z|^2', c, 70 * 70, ok);
  // ---- conjugate
  [c, ok] = each2(GRID, (x, y) => ceq(cconj(cadd(x, y)), cadd(cconj(x), cconj(y))) && ceq(cconj(cmul(x, y)), cmul(cconj(x), cconj(y))) && ceq(cconj(cconj(x)), x) && ceq(cmul(x, cconj(x)), C(cmod2(x))) && ceq(cadd(x, cconj(x)), C(fadd(x.re, x.re))));
  need('conjugate of sum and product, z times conjugate = |z|^2', c, 81 * 81, ok);
  [c, ok] = each2(NZ, (x, y) => ceq(cconj(cdiv(x, y)), cdiv(cconj(x), cconj(y))));
  need('conjugate of a quotient', c, 70 * 70, ok);
  // ---- modulus (squared, exact)
  [c, ok] = each2(GRID, (x, y) => feq(cmod2(cmul(x, y)), fmul(cmod2(x), cmod2(y))) && feq(cmod2(cconj(x)), cmod2(x)));
  need('|z1 z2|^2 = |z1|^2 |z2|^2 and |conjugate| = |z|', c, 81 * 81, ok);
  [c, ok] = each2(NZ, (x, y) => feq(cmod2(cdiv(x, y)), fr(cmod2(x).n * cmod2(y).d, cmod2(x).d * cmod2(y).n)));
  need('|z1/z2|^2 = |z1|^2 / |z2|^2', c, 70 * 70, ok);
  [c, ok] = each2(GRID, (x, y) => { const a = Math.sqrt(fnum(cmod2(x))), b = Math.sqrt(fnum(cmod2(y))), s = Math.sqrt(fnum(cmod2(cadd(x, y)))); return s <= a + b + 1e-12 && Math.abs(a - b) <= s + 1e-12; });
  need('triangle inequality and |z1 - z2| >= ||z1| - |z2||', c, 81 * 81, ok);
  // ---- square roots
  const roots = [];
  for (let x = -7; x <= 7; x++) for (let y = -7; y <= 7; y++) if (!(x === 0 && y === 0)) roots.push([x, y]);
  [c, ok] = each1(roots, ([x, y]) => { const z = cpow(C(x, y), 2); const s = csqrt(z); return s.exact && ceq(cmul(s.roots[0], s.roots[0]), z) && (ceq(s.roots[0], C(x, y)) || ceq(s.roots[1], C(x, y))); });
  need('square root by x^2 - y^2 = a, 2xy = b recovers every Gaussian square', c, 200, ok);
  [c, ok] = each1([C(0, 1), C(3, 0), C(0, 2), C(1, 1), C(-2, 5), C(5, 6)], (z) => { const s = csqrt(z); return !s.exact ? Math.abs(Math.hypot(...s.roots[0]) ** 2 - Math.hypot(...cnum(z))) < 1e-9 : true; });
  need('floating square roots have squared modulus |z|', c, 6, ok);
  // ---- cube roots of unity (exact in Z[w])
  const WG = [];
  for (const a of [-3, -2, -1, 0, 1, 2, 4]) for (const b of [-3, -1, 0, 2, 3, 5]) WG.push(W(a, b));
  const w2 = WW2;
  ok = weq(wpow(WW, 3), W1) && weq(wadd(wadd(W1, WW), w2), W(0, 0)) && weq(wmul(WW, WW), w2) && weq(wconj(WW), w2) && weq(wmul(WW, w2), W1) && weq(wadd(W1, w2), wsub(W(0, 0), WW)) && weq(wmul(wadd(W1, WW), wadd(W1, w2)), W1);
  need('w^3 = 1, 1 + w + w^2 = 0, w^2 is the conjugate of w, w w^2 = 1, (1 + w)(1 + w^2) = 1', 7, 7, ok);
  [c, ok] = each1(Array.from({ length: 61 }, (_, k) => k - 30), (k) => weq(wpow(WW, ((k % 3) + 3) % 3), wp(k)) && weq(wadd(wadd(wp(k), wp(k + 1)), wp(k + 2)), W(0, 0)) && weq(wmul(wp(k), wp(-k)), W1));
  need('w^n cycle of three, three consecutive powers sum to 0, w^n w^-n = 1', c, 61, ok);
  ok = weq(wmul(wadd(W1, wmul(W(2, 0), WW)), wadd(W1, wmul(W(2, 0), WW))), W(-3, 0));
  need('(1 + 2w)^2 = -3, so 1 + 2w = i sqrt 3', 1, 1, ok);
  [c, ok] = each1([[1, 1, 1], [2, 3, 5], [1, 2, 3], [4, -1, 2], [3, 3, -2], [0, 1, 7], [5, 2, 1], [-3, 4, 1]], ([a, b, cc]) => {
    const lhs = wmul(wadd(wadd(W(a, 0), wmul(W(b, 0), WW)), wmul(W(cc, 0), w2)), wadd(wadd(W(a, 0), wmul(W(b, 0), w2)), wmul(W(cc, 0), WW)));
    return weq(lhs, W(a * a + b * b + cc * cc - a * b - b * cc - cc * a, 0));
  });
  need('(a + b w + c w^2)(a + b w^2 + c w) = a^2 + b^2 + c^2 - ab - bc - ca', c, 8, ok);
  [c, ok] = each1([-3, -1, 0, 2, 5, 7], (x) => { const X = W(x, 0); const lhs = wmul(wmul(wsub(X, W1), wsub(X, WW)), wsub(X, w2)); return weq(lhs, W(x ** 3 - 1, 0)); });
  need('x^3 - 1 = (x - 1)(x - w)(x - w^2)', c, 6, ok);
  [c, ok] = each2(WG, (x, y) => { const p = wnum(wmul(x, y)), q = fc.mul(wnum(x), wnum(y)); return fc.near(p, q, 1e-9) && fc.near(wnum(wconj(x)), [wnum(x)[0], -wnum(x)[1]], 1e-9); });
  need('Z[w] multiplication and conjugation agree with the complex numbers (w = (-1 + i sqrt 3)/2)', c, WG.length * WG.length, ok);
  ok = fc.near(wnum(WW), [-0.5, Math.sqrt(3) / 2], 1e-12) && fc.near(wnum(w2), [-0.5, -Math.sqrt(3) / 2], 1e-12) && near(fc.arg(wnum(WW)), 120, 1e-9) && near(fc.arg(wnum(w2)), -120, 1e-9) && near(fc.abs(wnum(WW)), 1, 1e-12);
  need('w has modulus 1 and argument 120 degrees; w^2 has argument -120 degrees', 1, 1, ok);
  // ---- argument rules (numeric, non-zero numbers)
  [c, ok] = each2(NZ, (x, y) => near(wrapDeg(cargDeg(cmul(x, y)) - cargDeg(x) - cargDeg(y)), 0, 1e-8) && near(wrapDeg(cargDeg(cdiv(x, y)) - cargDeg(x) + cargDeg(y)), 0, 1e-8));
  need('arg(z1 z2) = arg z1 + arg z2 and arg(z1/z2) = arg z1 - arg z2 (mod 360)', c, 70 * 70, ok);
  [c, ok] = each1(NOTNEG, (x) => near(cargDeg(cconj(x)), -cargDeg(x), 1e-9) && near(wrapDeg(cargDeg(cneg(x)) - cargDeg(x) - 180), 0, 1e-8) && near(wrapDeg(cargDeg(cinv(x)) + cargDeg(x)), 0, 1e-8));
  need('arg of conjugate, negative and reciprocal', c, 60, ok);
  [c, ok] = each1(NZ, (x) => { const [a, b] = cnum(x), m = Math.hypot(a, b), t = cargDeg(x); return near(m * Math.cos(t * Math.PI / 180), a, 1e-9) && near(m * Math.sin(t * Math.PI / 180), b, 1e-9); });
  need('polar form r cos t, r sin t returns a and b', c, 70, ok);
  return n;
}

// Identity registry for ISC 11 Mathematics ch04 (compound, multiple and sub-multiple angles).
// Every identity taught or used in this chapter is listed once with
//   num(x, y): a pair of floating-point sides (radians), tested on a dense grid in all four quadrants, and
//   ex(a, b): a pair of EXACT sides in Q(sqrt2, sqrt3) (angles a, b in degrees, multiples of 15), tested at every admissible pair.
// verifyAll() throws if any identity fails either test, or if a test covers too few points to mean anything.
import { sinD, cosD, tanD, cotD, tanDefined, add, sub, mul, div, el, eq, fr, isZero, ALL15, holds1, holds2, gridRad, near, fin } from './trig.mjs';

const S = Math.sin, C = Math.cos, T = Math.tan;
const cotN = (x) => C(x) / S(x);
const h = (v) => mul(v, el(fr(1, 2)));
const two = el(2);
const sq = (v) => mul(v, v);
const one = el(1);

// helpers for exact sides
const sn = sinD, cs = cosD;
const safeTan = (a) => (tanDefined(a) ? tanD(a) : null);
const defT = (...ds) => ds.every((d) => tanDefined(d));
const defCot = (...ds) => ds.every((d) => !isZero(sinD(d)));

/** Each entry: [name, kind, num, ex, ok]  kind: '2' two angles, '1' one angle (ex angles multiples of 30 when halves occur). */
export const IDS = {
  sinAdd: { k: 2, num: (x, y) => [S(x + y), S(x) * C(y) + C(x) * S(y)], ex: (a, b) => [sn(a + b), add(mul(sn(a), cs(b)), mul(cs(a), sn(b)))] },
  sinSub: { k: 2, num: (x, y) => [S(x - y), S(x) * C(y) - C(x) * S(y)], ex: (a, b) => [sn(a - b), sub(mul(sn(a), cs(b)), mul(cs(a), sn(b)))] },
  cosAdd: { k: 2, num: (x, y) => [C(x + y), C(x) * C(y) - S(x) * S(y)], ex: (a, b) => [cs(a + b), sub(mul(cs(a), cs(b)), mul(sn(a), sn(b)))] },
  cosSub: { k: 2, num: (x, y) => [C(x - y), C(x) * C(y) + S(x) * S(y)], ex: (a, b) => [cs(a - b), add(mul(cs(a), cs(b)), mul(sn(a), sn(b)))] },
  tanAdd: { k: 2, ok: (a, b) => defT(a, b, a + b) && !isZero(sub(one, mul(tanD(a), tanD(b)))), num: (x, y) => [T(x + y), (T(x) + T(y)) / (1 - T(x) * T(y))], ex: (a, b) => [tanD(a + b), div(add(tanD(a), tanD(b)), sub(one, mul(tanD(a), tanD(b))))] },
  tanSub: { k: 2, ok: (a, b) => defT(a, b, a - b) && !isZero(add(one, mul(tanD(a), tanD(b)))), num: (x, y) => [T(x - y), (T(x) - T(y)) / (1 + T(x) * T(y))], ex: (a, b) => [tanD(a - b), div(sub(tanD(a), tanD(b)), add(one, mul(tanD(a), tanD(b))))] },
  cotAdd: { k: 2, ok: (a, b) => defCot(a, b, a + b) && !isZero(add(cotD(a), cotD(b))), num: (x, y) => [cotN(x + y), (cotN(x) * cotN(y) - 1) / (cotN(y) + cotN(x))], ex: (a, b) => [cotD(a + b), div(sub(mul(cotD(a), cotD(b)), one), add(cotD(b), cotD(a)))] },
  cotSub: { k: 2, ok: (a, b) => defCot(a, b, a - b) && !isZero(sub(cotD(b), cotD(a))), num: (x, y) => [cotN(x - y), (cotN(x) * cotN(y) + 1) / (cotN(y) - cotN(x))], ex: (a, b) => [cotD(a - b), div(add(mul(cotD(a), cotD(b)), one), sub(cotD(b), cotD(a)))] },
  // double angle
  sin2: { k: 1, num: (x) => [S(2 * x), 2 * S(x) * C(x)], ex: (a) => [sn(2 * a), mul(two, mul(sn(a), cs(a)))] },
  cos2a: { k: 1, num: (x) => [C(2 * x), C(x) ** 2 - S(x) ** 2], ex: (a) => [cs(2 * a), sub(sq(cs(a)), sq(sn(a)))] },
  cos2b: { k: 1, num: (x) => [C(2 * x), 2 * C(x) ** 2 - 1], ex: (a) => [cs(2 * a), sub(mul(two, sq(cs(a))), one)] },
  cos2c: { k: 1, num: (x) => [C(2 * x), 1 - 2 * S(x) ** 2], ex: (a) => [cs(2 * a), sub(one, mul(two, sq(sn(a))))] },
  tan2: { k: 1, ok: (a) => defT(a, 2 * a) && !isZero(sub(one, sq(tanD(a)))), num: (x) => [T(2 * x), (2 * T(x)) / (1 - T(x) ** 2)], ex: (a) => [tanD(2 * a), div(mul(two, tanD(a)), sub(one, sq(tanD(a))))] },
  sin2t: { k: 1, ok: (a) => defT(a), num: (x) => [S(2 * x), (2 * T(x)) / (1 + T(x) ** 2)], ex: (a) => [sn(2 * a), div(mul(two, tanD(a)), add(one, sq(tanD(a))))] },
  cos2t: { k: 1, ok: (a) => defT(a), num: (x) => [C(2 * x), (1 - T(x) ** 2) / (1 + T(x) ** 2)], ex: (a) => [cs(2 * a), div(sub(one, sq(tanD(a))), add(one, sq(tanD(a))))] },
  cos4: { k: 1, num: (x) => [C(4 * x), 8 * C(x) ** 4 - 8 * C(x) ** 2 + 1], ex: (a) => [cs(4 * a), add(sub(mul(el(8), mul(sq(cs(a)), sq(cs(a)))), mul(el(8), sq(cs(a)))), one)] },
  // triple angle
  sin3: { k: 1, num: (x) => [S(3 * x), 3 * S(x) - 4 * S(x) ** 3], ex: (a) => [sn(3 * a), sub(mul(el(3), sn(a)), mul(el(4), mul(sn(a), sq(sn(a)))))] },
  cos3: { k: 1, num: (x) => [C(3 * x), 4 * C(x) ** 3 - 3 * C(x)], ex: (a) => [cs(3 * a), sub(mul(el(4), mul(cs(a), sq(cs(a)))), mul(el(3), cs(a)))] },
  tan3: { k: 1, ok: (a) => defT(a, 3 * a) && !isZero(sub(one, mul(el(3), sq(tanD(a))))), num: (x) => [T(3 * x), (3 * T(x) - T(x) ** 3) / (1 - 3 * T(x) ** 2)], ex: (a) => [tanD(3 * a), div(sub(mul(el(3), tanD(a)), mul(tanD(a), sq(tanD(a)))), sub(one, mul(el(3), sq(tanD(a)))))] },
  sin3b: { k: 1, num: (x) => [S(3 * x) / S(x), 3 - 4 * S(x) ** 2], ex: (a) => [isZero(sn(a)) ? null : div(sn(3 * a), sn(a)), sub(el(3), mul(el(4), sq(sn(a))))], ok: (a) => !isZero(sn(a)) },
  cos3b: { k: 1, num: (x) => [C(3 * x), C(x) * (2 * C(2 * x) - 1)], ex: (a) => [cs(3 * a), mul(cs(a), sub(mul(two, cs(2 * a)), one))] },
  // half angle (a multiple of 30 so that a/2 is a multiple of 15)
  halfSin: { k: 1, half: true, num: (x) => [S(x / 2) ** 2, (1 - C(x)) / 2], ex: (a) => [sq(sn(a / 2)), h(sub(one, cs(a)))] },
  halfCos: { k: 1, half: true, num: (x) => [C(x / 2) ** 2, (1 + C(x)) / 2], ex: (a) => [sq(cs(a / 2)), h(add(one, cs(a)))] },
  halfTan1: { k: 1, half: true, ok: (a) => defT(a / 2) && !isZero(sn(a)), num: (x) => [T(x / 2), (1 - C(x)) / S(x)], ex: (a) => [tanD(a / 2), div(sub(one, cs(a)), sn(a))] },
  halfTan2: { k: 1, half: true, ok: (a) => defT(a / 2) && !isZero(add(one, cs(a))), num: (x) => [T(x / 2), S(x) / (1 + C(x))], ex: (a) => [tanD(a / 2), div(sn(a), add(one, cs(a)))] },
  halfTan3: { k: 1, half: true, ok: (a) => defT(a / 2) && !isZero(add(one, cs(a))), num: (x) => [T(x / 2) ** 2, (1 - C(x)) / (1 + C(x))], ex: (a) => [sq(tanD(a / 2)), div(sub(one, cs(a)), add(one, cs(a)))] },
  // one-third angle (a multiple of 45 so a/3 is a multiple of 15)
  third: { k: 1, third: true, num: (x) => [S(x), 3 * S(x / 3) - 4 * S(x / 3) ** 3], ex: (a) => [sn(a), sub(mul(el(3), sn(a / 3)), mul(el(4), mul(sn(a / 3), sq(sn(a / 3)))))] },
  thirdC: { k: 1, third: true, num: (x) => [C(x), 4 * C(x / 3) ** 3 - 3 * C(x / 3)], ex: (a) => [cs(a), sub(mul(el(4), mul(cs(a / 3), sq(cs(a / 3)))), mul(el(3), cs(a / 3)))] },
  // sum and difference to product (C, D with C + D and C - D multiples of 30 degrees)
  sinPlus: { k: 2, par: true, num: (x, y) => [S(x) + S(y), 2 * S((x + y) / 2) * C((x - y) / 2)], ex: (a, b) => [add(sn(a), sn(b)), mul(two, mul(sn((a + b) / 2), cs((a - b) / 2)))] },
  sinMinus: { k: 2, par: true, num: (x, y) => [S(x) - S(y), 2 * C((x + y) / 2) * S((x - y) / 2)], ex: (a, b) => [sub(sn(a), sn(b)), mul(two, mul(cs((a + b) / 2), sn((a - b) / 2)))] },
  cosPlus: { k: 2, par: true, num: (x, y) => [C(x) + C(y), 2 * C((x + y) / 2) * C((x - y) / 2)], ex: (a, b) => [add(cs(a), cs(b)), mul(two, mul(cs((a + b) / 2), cs((a - b) / 2)))] },
  cosMinus: { k: 2, par: true, num: (x, y) => [C(x) - C(y), -2 * S((x + y) / 2) * S((x - y) / 2)], ex: (a, b) => [sub(cs(a), cs(b)), mul(el(-2), mul(sn((a + b) / 2), sn((a - b) / 2)))] },
  // product to sum
  p2sSC: { k: 2, num: (x, y) => [2 * S(x) * C(y), S(x + y) + S(x - y)], ex: (a, b) => [mul(two, mul(sn(a), cs(b))), add(sn(a + b), sn(a - b))] },
  p2sCS: { k: 2, num: (x, y) => [2 * C(x) * S(y), S(x + y) - S(x - y)], ex: (a, b) => [mul(two, mul(cs(a), sn(b))), sub(sn(a + b), sn(a - b))] },
  p2sCC: { k: 2, num: (x, y) => [2 * C(x) * C(y), C(x + y) + C(x - y)], ex: (a, b) => [mul(two, mul(cs(a), cs(b))), add(cs(a + b), cs(a - b))] },
  p2sSS: { k: 2, num: (x, y) => [2 * S(x) * S(y), C(x - y) - C(x + y)], ex: (a, b) => [mul(two, mul(sn(a), sn(b))), sub(cs(a - b), cs(a + b))] },
};

const grid1 = gridRad.filter((_, i) => i % 3 === 0);
const gridX = gridRad.filter((_, i) => i % 7 === 0), gridY = gridRad.filter((_, i) => i % 11 === 0);
const sizes = {};
export function verifyAll() {
  for (const [name, I] of Object.entries(IDS)) {
    // numeric
    let n = 0;
    if (I.k === 2) {
      for (const x of gridX) for (const y of gridY) {
        const [u, v] = I.num(x, y);
        if (!fin(u) || !fin(v)) continue;
        if (!near(u, v, 1e-8)) throw new Error(`identity ${name} fails numerically at x=${x}, y=${y}: ${u} vs ${v}`);
        n++;
      }
    } else {
      for (const x of grid1) {
        const [u, v] = I.num(x);
        if (!fin(u) || !fin(v)) continue;
        if (!near(u, v, 1e-8)) throw new Error(`identity ${name} fails numerically at x=${x}: ${u} vs ${v}`);
        n++;
      }
    }
    if (n < 100) throw new Error(`identity ${name}: only ${n} numeric points`);
    // exact
    let m = 0;
    const okf = I.ok ?? (() => true);
    if (I.k === 2) {
      for (const a of ALL15) for (const b of ALL15) {
        if (I.par && ((a + b) % 30 !== 0 || (a - b) % 30 !== 0)) continue;
        if (!okf(a, b)) continue;
        const [u, v] = I.ex(a, b);
        if (!eq(u, v)) throw new Error(`identity ${name} fails exactly at a=${a}, b=${b}`);
        m++;
      }
    } else {
      for (const a of ALL15) {
        if (I.half && a % 30 !== 0) continue;
        if (I.third && a % 45 !== 0) continue;
        if (!okf(a)) continue;
        const [u, v] = I.ex(a);
        if (!eq(u, v)) throw new Error(`identity ${name} fails exactly at a=${a}`);
        m++;
      }
    }
    if (m < 6) throw new Error(`identity ${name}: only ${m} exact points`);
    sizes[name] = [n, m];
  }
  // tan(A + B + C) general and the special case A + B + C = pi
  let t3 = 0;
  for (const x of gridX.filter((_, i) => i % 4 === 0)) for (const y of gridY.filter((_, i) => i % 4 === 0)) for (const z of [0.31, 0.77, 1.9, -0.52, 2.6]) {
    const L = T(x + y + z), R = (T(x) + T(y) + T(z) - T(x) * T(y) * T(z)) / (1 - T(x) * T(y) - T(y) * T(z) - T(z) * T(x));
    if (!fin(L) || !fin(R)) continue;
    if (!near(L, R, 1e-6)) throw new Error('tan(A+B+C) fails');
    t3++;
  }
  if (t3 < 500) throw new Error(`tan(A+B+C): ${t3} points`);
  let t4 = 0;
  for (const x of gridX) for (const y of gridY) {
    const z = Math.PI - x - y;
    const a = T(x) + T(y) + T(z), b = T(x) * T(y) * T(z);
    if (!fin(a) || !fin(b) || Math.abs(a) > 1e6) continue;
    if (!near(a, b, 1e-6)) throw new Error('tan sum = product fails');
    t4++;
  }
  if (t4 < 1000) throw new Error(`tan sum = product: ${t4}`);
  sizes.tanABC = [t3, 0]; sizes.tanSumProd = [t4, 0];
  return sizes;
}

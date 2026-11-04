// CBSE 11 Mathematics ch04 Complex Numbers and Quadratic Equations — objective items (mcq, assertion-reason, true-false,
// fill-blank, numerical) with independent re-solve checks: every value is recomputed with exact BigInt-fraction complex
// arithmetic (cx.mjs); moduli are exact surds; arguments come from atan2; roots are checked by substitution.
import { Q, mk } from './lib.mjs';
import { C, I, cadd, csub, cmul, cdiv, cinv, cconj, cneg, cpow, cmod, cmod2, ceq, ctex, cnum, cargDeg, fr, fnum, fmul, fc, quad, surd, near, range } from './cx.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, notin) becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const T = (z) => `$${ctex(z)}$`;
const optsOf = (zs) => zs.map(T);
const KEY = (arr, target) => {
  const hits = arr.map((z, k) => (ceq(z, target) ? 'abcd'[k] : null)).filter(Boolean);
  if (hits.length !== 1) throw new Error(`option set must have exactly one match, got ${hits}`);
  return hits[0];
};
/** Brute-force integer solutions (x, y) of a pair of linear conditions, used to re-solve equality items. */
const solveInts = (test) => { const out = []; for (const x of range(-30, 30)) for (const y of range(-30, 30)) if (test(x, y)) out.push([x, y]); return out; };

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The imaginary part of the complex number $7 - 5i$ is`, opts: ['$-5$', '$5$', '$-5i$', '$7$'], key: 'a', sol: r`Write $7 - 5i = 7 + (-5)i$. The imaginary part is the real coefficient of $i$, that is $-5$, without the letter $i$ and with its sign.`, d: 1, c: 'recall', t: [1], time: 30 }), (Cx) => { const z = C(7, -5); Cx.which(['-5', '5', '-5i', '7'], String(fnum(z.im))); });
{
  const vals = [cpow(I, 58), C(1), I, cneg(I)];
  Q('m02', mk.mcq({ stem: r`In the complex numbers, the power $i^{58}$ has the value`, opts: optsOf(vals), key: 'a', sol: r`The powers of $i$ repeat in a cycle of length four. Since $58 = 4 \times 14 + 2$, $i^{58} = i^{2} = -1$. Reading the remainder as $0$ would give $1$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(58 % 4 === 2, '58 = 4 x 14 + 2'); Cx.assert(ceq(cpow(I, 2), C(-1)), 'i^2 = -1'); Cx.which(vals.map(ctex), ctex(cpow(I, 58))); });
}
Q('m03', mk.mcq({ stem: r`For every integer $n$, the sum $i^{n} + i^{n+1} + i^{n+2} + i^{n+3}$ equals`, opts: ['$0$', '$1$', '$-1$', '$i$'], key: 'a', sol: r`Factor out $i^{n}$: the sum is $i^{n}(1 + i + i^2 + i^3) = i^{n}(1 + i - 1 - i) = 0$. So four consecutive powers always cancel.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { const ok = range(-12, 12).every((n) => ceq(cadd(cadd(cpow(I, n), cpow(I, n + 1)), cadd(cpow(I, n + 2), cpow(I, n + 3))), C(0))); Cx.assert(ok, 'zero for n = -12..12'); Cx.which(['0', '1', '-1', 'i'], '0'); });
{
  const A = C(6, -2), B = C(-4, 9), D = C(3, 1);
  const right = csub(cadd(A, B), D);
  const vals = [csub(cadd(A, B), cneg(D)), right, C(7, -12), C(-1, 8)];
  Q('m04', mk.mcq({ stem: r`Collecting real parts and imaginary parts separately, $(6 - 2i) + (-4 + 9i) - (3 + i)$ simplifies to`, opts: optsOf(vals), key: 'b', sol: r`Real parts: $6 - 4 - 3 = -1$. Imaginary parts: $-2 + 9 - 1 = 6$. So the result is $-1 + 6i$. Forgetting to change both signs of $3 + i$ gives $5 + 8i$ or $-1 + 8i$.`, d: 1, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(ceq(right, C(-1, 6)), '-1 + 6i'); Cx.which(vals.map(ctex), ctex(right)); });
}
{
  const a = C(5, -2), b = C(3, 4), right = cmul(a, b);
  const vals = [C(7, 14), right, C(15, -8), C(23, 26)];
  Q('m05', mk.mcq({ stem: r`The product $(5 - 2i)(3 + 4i)$ equals`, opts: optsOf(vals), key: 'b', sol: r`$(5 - 2i)(3 + 4i) = 15 + 20i - 6i - 8i^2 = 15 + 14i + 8 = 23 + 14i$. Dropping the $i^2$ term, or giving it the wrong sign, leads to $15 + 14i$, $7 + 14i$ or $23 + 26i$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(ceq(right, C(23, 14)), '23 + 14i'); Cx.which(vals.map(ctex), ctex(right)); });
}
{
  const z = C(4, 3), sq = cmul(z, z), right = cconj(sq);
  const vals = [sq, cneg(sq), right, C(25, -24)];
  Q('m06', mk.mcq({ stem: r`If $z = 4 + 3i$, the conjugate of $z^2$ is`, opts: optsOf(vals), key: 'c', sol: r`$z^2 = 16 + 24i + 9i^2 = 7 + 24i$, and changing the sign of the imaginary part gives $\overline{z^2} = 7 - 24i$. The same value comes from $(\bar z)^2 = (4 - 3i)^2$. Option (d) forgets $i^2 = -1$.`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(ceq(sq, C(7, 24)) && ceq(right, cmul(cconj(z), cconj(z))), '7 - 24i and (conj z)^2 agree'); Cx.which(vals.map(ctex), ctex(right)); });
}
{
  const z = C(5, 12), inv = cinv(z);
  const vals = [C([5, 169], [-12, 169]), C(5, -12), C([5, 169], [12, 169]), C([5, 13], [-12, 13])];
  Q('m07', mk.mcq({ stem: r`The multiplicative inverse of the complex number $5 + 12i$ is`, opts: optsOf(vals), key: 'a', sol: r`Multiply top and bottom of $\dfrac{1}{5 + 12i}$ by the conjugate $5 - 12i$: the denominator becomes $25 + 144 = 169$, so the inverse is $\dfrac{5 - 12i}{169}$. Dividing by $13$ instead of $169$ uses the modulus instead of its square.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(ceq(cmul(z, inv), C(1)), 'z times its inverse is 1'); Cx.which(vals.map(ctex), ctex(inv)); });
}
{
  const n = C(2, 9), d = C(1, -2), right = cdiv(n, d);
  const vals = [C([16, 3], [-13, 3]), right, C(4, 1), C([-16, 5], [-13, 5])];
  Q('m08', mk.mcq({ stem: r`Rationalising the denominator, $\dfrac{2 + 9i}{1 - 2i}$ becomes`, opts: optsOf(vals), key: 'b', sol: r`Multiply by $\dfrac{1 + 2i}{1 + 2i}$: the numerator is $(2 + 9i)(1 + 2i) = 2 + 4i + 9i - 18 = -16 + 13i$ and the denominator is $1 + 4 = 5$. So the quotient is $\dfrac{-16 + 13i}{5}$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(ceq(right, C([-16, 5], [13, 5])) && ceq(cmul(right, d), n), 'quotient times divisor returns the dividend'); Cx.which(vals.map(ctex), ctex(right)); });
}
{
  const sols = solveInts((x, y) => x + 2 * y === 7 && 3 * x - y === -7);
  Q('m09', mk.mcq({ stem: r`Real numbers $x$ and $y$ satisfy $(x + 2y) + i(3x - y) = 7 - 7i$. The value of $x + y$ is`, opts: ['$-3$', '$7$', '$3$', '$4$'], key: 'c', sol: r`Equal complex numbers have equal real parts and equal imaginary parts: $x + 2y = 7$ and $3x - y = -7$. Then $y = 3x + 7$, so $7x + 14 = 7$, giving $x = -1$ and $y = 4$. Hence $x + y = 3$.`, d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(sols.length === 1 && sols[0].join() === '-1,4', 'x = -1, y = 4'); Cx.which([-3, 7, 3, 4], sols[0][0] + sols[0][1]); });
}
{
  // z + 3 conj(z) = 8 + 4i, z = a + bi: brute force over halves
  const found = [];
  for (const a of range(-40, 40).map((k) => k / 2)) for (const b of range(-40, 40).map((k) => k / 2)) { const z = C([Math.round(a * 2), 2], [Math.round(b * 2), 2]); if (ceq(cadd(z, cmul(C(3), cconj(z))), C(8, 4))) found.push(z); }
  const right = found[0];
  const vals = [C(2, 2), right, C(4, -2), C(2, -4)];
  Q('m10', mk.mcq({ stem: r`The complex number $z$ satisfies $z + 3\bar z = 8 + 4i$. Then $z$ equals`, opts: optsOf(vals), key: 'b', sol: r`Let $z = a + bi$, so $\bar z = a - bi$ and $z + 3\bar z = 4a - 2bi$. Comparing with $8 + 4i$: $4a = 8$ gives $a = 2$ and $-2b = 4$ gives $b = -2$. So $z = 2 - 2i$.`, d: 3, c: 'application', t: [1, 2], time: 90 }), (Cx) => { Cx.assert(found.length === 1 && ceq(right, C(2, -2)), 'unique solution 2 - 2i'); Cx.which(vals.map(ctex), ctex(right)); });
}
{
  const z = C(-4, -9), mod = cmod(z);
  Q('m11', mk.mcq({ stem: r`How far from the origin of the Argand plane does the point representing $-4 - 9i$ lie?`, opts: [r`$\sqrt{97}$`, '$13$', '$97$', r`$\sqrt{65}$`], key: 'a', sol: r`The distance is the modulus $|-4 - 9i| = \sqrt{(-4)^2 + (-9)^2} = \sqrt{16 + 81} = \sqrt{97}$. Option (b) adds the two coordinates and (c) forgets the square root.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(mod.tex === '\\sqrt{97}', 'exact surd'); Cx.which([Math.sqrt(97), 13, 97, Math.sqrt(65)], mod.num); });
}
{
  const z = cdiv(cmul(C(1, 1), C(2, -1)), C(1, -2));
  Q('m12', mk.mcq({ stem: r`Let $w = \dfrac{(1 + i)(2 - i)}{1 - 2i}$. The modulus $|w|$ equals`, opts: [r`$\sqrt{2}$`, '$2$', r`$\sqrt{10}$`, '$1$'], key: 'a', sol: r`Use $\left|\dfrac{z_1 z_2}{z_3}\right| = \dfrac{|z_1||z_2|}{|z_3|} = \dfrac{\sqrt{2}\cdot\sqrt{5}}{\sqrt{5}} = \sqrt{2}$. Option (b) is $|w|^2$, and (c) forgets to divide by $|1 - 2i|$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(ceq(z, C([1, 5], [7, 5])), 'w = (1 + 7i)/5'); Cx.assert(cmod(z).tex === '\\sqrt{2}', '|w| = sqrt 2'); Cx.which([Math.sqrt(2), 2, Math.sqrt(10), 1], cmod(z).num); });
}
{
  const w = cinv(C(-2, 1));
  const quad = (z) => (fnum(z.re) > 0 && fnum(z.im) > 0 ? 1 : fnum(z.re) < 0 && fnum(z.im) > 0 ? 2 : fnum(z.re) < 0 && fnum(z.im) < 0 ? 3 : 4);
  Q('m13', mk.mcq({ stem: r`The point representing $\dfrac{1}{-2 + i}$ on the Argand plane lies in the`, opts: ['first quadrant', 'second quadrant', 'third quadrant', 'fourth quadrant'], key: 'c', sol: r`$\dfrac{1}{-2 + i} = \dfrac{-2 - i}{(-2)^2 + 1^2} = \dfrac{-2 - i}{5}$. Both the real part $-\dfrac{2}{5}$ and the imaginary part $-\dfrac{1}{5}$ are negative: third quadrant. Taking the position of $-2 + i$ itself gives the second quadrant.`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(ceq(w, C([-2, 5], [-1, 5])), '(-2 - i)/5'); Cx.which([1, 2, 3, 4], quad(w)); });
}
{
  const member = ([x, y]) => Math.abs(Math.hypot(x, y) - 6) < 1e-9;
  const sample = [[6, 0], [0, 6], [-6, 0], [0, -6], [3.6, 4.8], [-4.8, -3.6], [1, 0], [7, 0], [6, 6], [0, 0], [36, 0], [3, 3], [6, 1]];
  const preds = [([x, y]) => (x - 6) ** 2 + y ** 2 === 36, ([x, y]) => x * x + y * y === 36, ([x, y]) => x * x + y * y === 6, ([x, y]) => Math.abs(x) + Math.abs(y) === 6];
  Q('m14', mk.mcq({ stem: r`Every point $z$ of the Argand plane with $|z| = 6$ lies on`, opts: [r`a circle of radius $6$ centred at $6 + 0i$`, r`a circle of radius $6$ centred at the origin`, r`a circle of radius $\sqrt{6}$ centred at the origin`, r`a square whose vertices are at distance $6$ from the origin`], key: 'b', sol: r`$|z| = 6$ means the distance of $z$ from the origin is $6$, which describes the circle $x^2 + y^2 = 36$ about the origin. Option (c) confuses $|z|$ with $|z|^2$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.which(preds.map((p) => sample.every((s) => p(s) === member(s))), true); });
}
{
  const z = C(1, -1);
  const pv = (rad, deg) => fc.polar(rad, deg);
  Q('m15', mk.mcq({ stem: r`In polar form, the number $1 - i$ is written`, opts: [r`$\sqrt{2}\left(\cos 45^\circ + i \sin 45^\circ\right)$`, r`$\sqrt{2}\left(\cos(-45^\circ) + i \sin(-45^\circ)\right)$`, r`$2\left(\cos(-45^\circ) + i \sin(-45^\circ)\right)$`, r`$\sqrt{2}\left(\cos 135^\circ + i \sin 135^\circ\right)$`], key: 'b', sol: r`The modulus is $r = \sqrt{1 + 1} = \sqrt{2}$. The point $(1, -1)$ is in the fourth quadrant on the line through the origin at $45^\circ$ below the real axis, so the principal argument is $-45^\circ$. Option (c) uses $2$, the square of the modulus.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(cmod(z).tex === '\\sqrt{2}' && near(cargDeg(z), -45), 'r = sqrt 2, arg -45'); Cx.which([pv(Math.SQRT2, 45), pv(Math.SQRT2, -45), pv(2, -45), pv(Math.SQRT2, 135)], cnum(z)); });
}
{
  const q = quad(1, 2, 10);
  Q('m17', mk.mcq({ stem: r`The roots of the quadratic equation $x^2 + 2x + 10 = 0$ are`, opts: [r`$-1 \pm 3i$`, r`$1 \pm 3i$`, r`$-2 \pm 6i$`, r`$-1 \pm 9i$`], key: 'a', sol: r`The discriminant is $2^2 - 4(1)(10) = -36$, so $x = \dfrac{-2 \pm \sqrt{-36}}{2} = \dfrac{-2 \pm 6i}{2} = -1 \pm 3i$. Skipping the division by $2a$ gives $-2 \pm 6i$.`, d: 2, c: 'application', t: [3], time: 75 }), (Cx) => { Cx.assert(q.exact && q.D.n === -36n, 'D = -36, exact roots'); Cx.which(['-1 \\pm 3i', '1 \\pm 3i', '-2 \\pm 6i', '-1 \\pm 9i'], q.pm); });
}
{
  const z = C(2, 3);
  const found = solveInts((p, q) => { const s = cadd(cadd(cmul(z, z), cmul(C(p), z)), C(q)); return ceq(s, C(0)); });
  Q('m20', mk.mcq({ stem: r`The real numbers $p$ and $q$ are such that $2 + 3i$ is a root of $x^2 + px + q = 0$. Then $(p, q)$ is`, opts: ['$(-4, 13)$', '$(4, 13)$', '$(-4, 5)$', '$(4, -13)$'], key: 'a', sol: r`The coefficients are real, so the other root is the conjugate $2 - 3i$. Sum of roots $= 4 = -p$, so $p = -4$; product $= (2 + 3i)(2 - 3i) = 4 + 9 = 13 = q$.`, d: 4, c: 'analysis', t: [3], time: 120 }), (Cx) => { Cx.assert(found.length === 1 && found[0].join() === '-4,13', 'p = -4, q = 13'); Cx.which([[-4, 13], [4, 13], [-4, 5], [4, -13]], found[0]); });
}
{
  const zs = [C(3, 4), C(-2, 5), C(1, -1), C(0, 7), C(6, 0)];
  const cands = [(z) => cnum(C(cmod2(z))), (z) => cnum(cmul(z, z)), (z) => [2 * fnum(z.re), 0], (z) => [cmod(z).num, 0]];
  Q('m21', mk.mcq({ stem: r`For a complex number $z$, the product $z\,\bar z$ is the same as`, opts: ['$|z|^2$', '$z^2$', r`$2\,\mathrm{Re}(z)$`, '$|z|$'], key: 'a', sol: r`With $z = a + bi$: $z\bar z = (a + bi)(a - bi) = a^2 - b^2 i^2 = a^2 + b^2 = |z|^2$. For $z = 3 + 4i$ the product is $25$, while $|z| = 5$ and $z^2 = -7 + 24i$.`, d: 1, c: 'recall', t: [2], time: 45 }), (Cx) => { Cx.which(cands.map((f) => zs.every((z) => fc.near(f(z), cnum(cmul(z, cconj(z)))))), true); });
}
{
  const z = cinv(C(3, -2));
  const vals = [[fr(3, 13), fr(2, 13)], [fr(3, 13), fr(-2, 13)], [fr(1, 3), fr(1, 2)], [fr(3), fr(2)]];
  Q('m22', mk.mcq({ stem: r`The real part and the imaginary part of $\dfrac{1}{3 - 2i}$ are respectively`, opts: [r`$\dfrac{3}{13}$ and $\dfrac{2}{13}$`, r`$\dfrac{3}{13}$ and $-\dfrac{2}{13}$`, r`$\dfrac{1}{3}$ and $\dfrac{1}{2}$`, '$3$ and $2$'], key: 'a', sol: r`$\dfrac{1}{3 - 2i} = \dfrac{3 + 2i}{9 + 4} = \dfrac{3}{13} + \dfrac{2}{13}i$. The imaginary part is positive because the conjugate $3 + 2i$ flips the sign of the denominator's imaginary part.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(ceq(z, C([3, 13], [2, 13])), '(3 + 2i)/13'); Cx.which(vals.map(([a, b]) => `${a.n}/${a.d},${b.n}/${b.d}`), `${z.re.n}/${z.re.d},${z.im.n}/${z.im.d}`); });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`For every complex number $z$, the sum $z + \bar z$ is a real number.`, r: r`If $z = a + bi$ then $z + \bar z = 2a$.`, key: 'a', sol: r`$z + \bar z = (a + bi) + (a - bi) = 2a$, and $a$ is real, so R is true. This computation is exactly why A holds: the imaginary parts cancel.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { const zs = [C(3, 4), C(-2, -7), C([1, 2], [3, 5]), C(0, 9)]; Cx.assert(zs.every((z) => ceq(cadd(z, cconj(z)), C(fmul(z.re, fr(2)), 0))), 'z + conj z = 2 Re z, real'); Cx.key('a'); });
Q('ar2', mk.ar({ a: r`The modulus of the complex number $3 - 4i$ is $5$.`, r: r`The modulus of $a + bi$ is $|a + bi| = a + b$.`, key: 'c', sol: r`A is true: $\sqrt{9 + 16} = 5$. R is false: the modulus is $\sqrt{a^2 + b^2}$, not $a + b$ (for $3 - 4i$ the sum would be $-1$, which cannot be a distance).`, d: 2, c: 'understanding', t: [2] }), (Cx) => { const z = C(3, -4); Cx.assert(cmod(z).num === 5 && 3 + -4 !== 5, '|3 - 4i| = 5, a + b = -1'); Cx.key('c'); });
Q('ar3', mk.ar({ a: r`$\sqrt{-4} \times \sqrt{-9} = \sqrt{36} = 6$.`, r: r`$\sqrt{-4} = 2i$ and $\sqrt{-9} = 3i$.`, key: 'd', sol: r`R is true: $(2i)^2 = -4$ and $(3i)^2 = -9$. Then $\sqrt{-4}\sqrt{-9} = (2i)(3i) = 6i^2 = -6$, not $6$. The rule $\sqrt{a}\sqrt{b} = \sqrt{ab}$ is valid only for non-negative $a$ and $b$, so A is false.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(ceq(cmul(C(0, 2), C(0, 3)), C(-6)) && ceq(cmul(C(0, 2), C(0, 2)), C(-4)), '(2i)(3i) = -6'); Cx.key('d'); });
{
  const z = C(1, 1), z4 = cpow(z, 4);
  Q('ar4', mk.ar({ a: r`$(1 + i)^4 = -4$.`, r: r`$i^4 = 1$.`, key: 'b', sol: r`Both are true. But R does not explain A: the reason for A is $(1 + i)^2 = 1 + 2i + i^2 = 2i$, and then $(2i)^2 = 4i^2 = -4$.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(ceq(z4, C(-4)) && ceq(cpow(I, 4), C(1)) && ceq(cmul(z, z), C(0, 2)), '(1 + i)^4 = -4, i^4 = 1, (1 + i)^2 = 2i'); Cx.key('b'); });
}
{
  const q = quad(1, 4, 7);
  Q('ar5', mk.ar({ a: r`The equation $x^2 + 4x + 7 = 0$ has two non-real roots that are conjugates of each other.`, r: r`The coefficients of the equation are real and its discriminant $4^2 - 4(1)(7) = -12$ is negative.`, key: 'a', sol: r`R is true. For a quadratic with real coefficients a negative discriminant gives roots $\dfrac{-4 \pm i\sqrt{12}}{2} = -2 \pm i\sqrt{3}$, a conjugate pair. So R is the reason for A.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(q.D.n === -12n && q.complex && !q.exact, 'D = -12, surd roots'); Cx.assert(q.pm === '-2 \\pm \\sqrt{3}\\,i', q.pm); Cx.key('a'); });
}

// =============================================================== true-false
{
  const a = C(2, 3), b = C(2, -3), c1 = I, c2 = I;
  Q('tf1', mk.tf({ stem: r`The product of two non-real complex numbers can be a real number.`, key: 't', sol: r`For example $i \times i = -1$ and $(2 + 3i)(2 - 3i) = 13$: each factor is non-real but the product is real.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(ceq(cmul(a, b), C(13)) && ceq(cmul(c1, c2), C(-1)), 'products 13 and -1'); Cx.key('t'); });
}
{
  const zs = [C(3, 4), C(-5, 12), C([1, 2], [-3, 4]), C(0, -6), C(7, 0)];
  Q('tf2', mk.tf({ stem: r`A non-zero complex number and its conjugate lie at the same distance from the origin of the Argand plane.`, key: 't', sol: r`$|\bar z| = \sqrt{a^2 + (-b)^2} = \sqrt{a^2 + b^2} = |z|$. The two points are mirror images in the real axis.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(zs.every((z) => feqMod(z)), '|conj z| = |z|'); Cx.key('t'); });
  function feqMod(z) { const u = cmod2(z), v = cmod2(cconj(z)); return u.n === v.n && u.d === v.d; }
}
{
  const v = cpow(I, 100);
  Q('tf3', mk.tf({ stem: r`The power $i^{100}$ equals $-1$.`, key: 'f', sol: r`$100 = 4 \times 25$, so $i^{100} = (i^4)^{25} = 1^{25} = 1$, not $-1$. The value $-1$ would belong to an exponent leaving remainder $2$ on division by $4$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(ceq(v, C(1)) && 100 % 4 === 0, 'i^100 = 1'); Cx.key('f'); });
}
Q('tf4', mk.tf({ stem: r`In the complex numbers, the inequality $2 + 3i > 1 + 2i$ is a meaningful statement that is true.`, key: 'f', sol: r`Non-real complex numbers cannot be ordered: there is no consistent meaning of "greater than" for them, so the inequality has no meaning. Only their moduli (real numbers) can be compared, e.g. $|2 + 3i| = \sqrt{13}$ and $|1 + 2i| = \sqrt{5}$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(cmod2(C(2, 3)).n === 13n && cmod2(C(1, 2)).n === 5n, 'moduli sqrt 13 and sqrt 5'); Cx.key('f'); });
Q('tf6', mk.tf({ stem: r`The principal argument of the purely imaginary number $-4i$ is $-90^\circ$.`, key: 't', sol: r`The point $(0, -4)$ is on the negative imaginary axis, a quarter-turn clockwise from the positive real axis, so its principal argument is $-90^\circ$.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(near(cargDeg(C(0, -4)), -90), 'arg(-4i) = -90'); Cx.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`In the complex numbers, $i^{35}$ equals ____.`, acc: [['-i', '−i']], sol: r`$35 = 4 \times 8 + 3$, so $i^{35} = i^{3} = i^2 \cdot i = -i$.`, d: 2, c: 'application', t: [1] }), (Cx) => { Cx.assert(ceq(cpow(I, 35), cneg(I)), 'i^35 = -i'); Cx.blank('-i'); });
Q('fb2', mk.fill({ stem: r`The conjugate of $-6 + 2i$ is ____.`, acc: [['-6-2i', '-6 - 2i', '−6−2i', '−6 − 2i']], sol: r`The conjugate keeps the real part and reverses the sign of the imaginary part: $\overline{-6 + 2i} = -6 - 2i$.`, d: 1, c: 'recall', t: [2] }), (Cx) => { Cx.assert(ceq(cconj(C(-6, 2)), C(-6, -2)), 'conj'); Cx.blank('-6-2i'); });
{
  const z = C(9, -12);
  Q('fb3', mk.fill({ stem: r`The distance of the point $9 - 12i$ from the origin of the Argand plane is ____ units.`, acc: [['15']], sol: r`$|9 - 12i| = \sqrt{81 + 144} = \sqrt{225} = 15$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(cmod(z).square && cmod(z).num === 15, '15'); Cx.blank(15); });
}
{
  const z = cinv(C(2, 1));
  Q('fb4', mk.fill({ stem: r`When $\dfrac{1}{2 + i}$ is written as $a + bi$, the real part $a$ is ____.`, acc: [['2/5', '0.4']], sol: r`$\dfrac{1}{2 + i} = \dfrac{2 - i}{4 + 1} = \dfrac{2}{5} - \dfrac{1}{5}i$, so $a = \dfrac{2}{5} = 0.4$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(ceq(z, C([2, 5], [-1, 5])), '(2 - i)/5'); Cx.blank(0.4); });
}
{
  const q = quad(1, 0, 16);
  Q('fb5', mk.fill({ stem: r`The two roots of $x^2 + 16 = 0$ in the complex numbers are $4i$ and ____.`, acc: [['-4i', '−4i']], sol: r`$x^2 = -16$ gives $x = \pm\sqrt{-16} = \pm 4i$, so the other root is $-4i$.`, d: 1, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(q.exact && ceq(q.roots[0], C(0, 4)) && ceq(q.roots[1], C(0, -4)), 'roots +-4i'); Cx.blank('-4i'); });
}

// =============================================================== numerical
{
  const z = cdiv(cmul(C(2, 1), C(2, 1)), C(1, -1));
  Q('n01', mk.num({ stem: r`Write $\dfrac{(2 + i)^2}{1 - i}$ in the form $a + bi$ and find the sum $a + b$.`, value: 3, sol: r`$(2 + i)^2 = 3 + 4i$ and $\dfrac{3 + 4i}{1 - i} = \dfrac{(3 + 4i)(1 + i)}{2} = \dfrac{-1 + 7i}{2}$. So $a + b = -\dfrac{1}{2} + \dfrac{7}{2} = 3$.`, scheme: [['(2 + i)^2 = 3 + 4i and rationalising', 0.5], ['a + b = 3', 0.5]], d: 3, c: 'application', t: [1], time: 120 }), (Cx) => { Cx.assert(ceq(z, C([-1, 2], [7, 2])), '(-1 + 7i)/2'); Cx.val(fnum(z.re) + fnum(z.im)); });
}
{
  const p = cmul(C(8, -6), C(5, 12));
  Q('n02', mk.num({ stem: r`Find the modulus $|(8 - 6i)(5 + 12i)|$ without first expanding the product, and then confirm it by expanding.`, value: 130, sol: r`$|z_1 z_2| = |z_1||z_2| = \sqrt{64 + 36} \cdot \sqrt{25 + 144} = 10 \times 13 = 130$. Check: $(8 - 6i)(5 + 12i) = 112 + 66i$ and $\sqrt{112^2 + 66^2} = \sqrt{16900} = 130$.`, scheme: [['10 and 13', 0.5], ['130', 0.5]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(ceq(p, C(112, 66)) && cmod(p).square && cmod(p).num === 130 && cmod(C(8, -6)).num * cmod(C(5, 12)).num === 130, '130'); Cx.val(cmod(p).num); });
}
{
  const kfound = range(-60, 60).filter((k) => { const z = cdiv(C(k, 3), C(2, -1)); return z.im.n === 0n; });
  Q('n03', mk.num({ stem: r`Find the real number $k$ for which $\dfrac{k + 3i}{2 - i}$ is a real number.`, value: -6, sol: r`$\dfrac{k + 3i}{2 - i} = \dfrac{(k + 3i)(2 + i)}{5} = \dfrac{(2k - 3) + (k + 6)i}{5}$. It is real when the imaginary part vanishes: $k + 6 = 0$, so $k = -6$.`, scheme: [['Imaginary part (k + 6)/5', 0.5], ['k = -6', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(kfound.join() === '-6', 'k = -6'); Cx.val(kfound[0]); });
}
{
  const as = range(1, 30).filter((a) => cmod2(C(a, -2)).n === 40n);
  Q('n04', mk.num({ stem: r`Find the positive real number $a$ for which the point $a - 2i$ lies at distance $2\sqrt{10}$ from the origin of the Argand plane.`, value: 6, sol: r`$|a - 2i|^2 = a^2 + 4 = (2\sqrt{10})^2 = 40$, so $a^2 = 36$ and $a = 6$ (the positive value).`, scheme: [['a^2 + 4 = 40', 0.5], ['a = 6', 0.5]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(as.join() === '6' && cmod(C(6, -2)).tex === '2\\sqrt{10}', 'a = 6, modulus 2 sqrt 10'); Cx.val(as[0]); });
}
{
  const q = quad(1, -10, 169);
  Q('n05', mk.num({ stem: r`Both roots of $x^2 - 10x + 169 = 0$ are non-real. Find their common modulus.`, value: 13, sol: r`$x = \dfrac{10 \pm \sqrt{100 - 676}}{2} = \dfrac{10 \pm 24i}{2} = 5 \pm 12i$. The modulus of each is $\sqrt{25 + 144} = \sqrt{169} = 13$.`, scheme: [['Roots 5 plus or minus 12i', 0.5], ['Modulus 13', 0.5]], d: 3, c: 'application', t: [3], time: 120 }), (Cx) => { Cx.assert(q.exact && ceq(q.roots[0], C(5, 12)) && ceq(q.roots[1], C(5, -12)), '5 +- 12i'); Cx.val(cmod(q.roots[0]).num); });
}
{
  const v = cpow(C(1, -1), 8);
  Q('n06', mk.num({ stem: r`Evaluate $(1 - i)^8$, which turns out to be a real number.`, value: 16, sol: r`$(1 - i)^2 = 1 - 2i + i^2 = -2i$, so $(1 - i)^8 = (-2i)^4 = 16\,i^4 = 16$.`, scheme: [['(1 - i)^2 = -2i', 0.5], ['16', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(ceq(cmul(C(1, -1), C(1, -1)), C(0, -2)) && ceq(v, C(16)), '(1 - i)^8 = 16'); Cx.val(fnum(v.re)); });
}

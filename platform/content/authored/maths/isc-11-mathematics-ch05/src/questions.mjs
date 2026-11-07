// ISC 11 Mathematics ch05 Complex Numbers: objective items (mcq, assertion-reason, true-false, fill-blank, numerical) with
// independent re-solve checks. Option values are typed independently of the option text and compared with a target that is
// recomputed from the givens in exact complex arithmetic (cx.mjs); moduli and arguments are re-checked numerically.
import { Q, mk } from './lib.mjs';
import { C, I, fr, cadd, csub, cmul, cdiv, cinv, cconj, cneg, cpow, cmod2, ceq, cnum, cargDeg, csqrt, near, fc, rad, deg, wrapDeg,
  W, W1, WW, WW2, wadd, wsub, wmul, wpow, weq, wneg, wconj, wnum, wp } from './cx.mjs';

const r = String.raw;
const s2 = Math.SQRT2, s3 = Math.sqrt(3), s5 = Math.sqrt(5);
const cn = cnum;
/** Principal root of z as floats, from the exact or floating square root (the root with the sign of Im z). */
const rootOf = (z) => { const s = csqrt(z); return s.exact ? cn(s.roots[0]) : s.roots[0]; };
const quad = (z) => { const [a, b] = cn(z); return a > 0 && b > 0 ? 'I' : a < 0 && b > 0 ? 'II' : a < 0 ? 'III' : 'IV'; };

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The reciprocal of the imaginary unit, written as the fraction $\dfrac{1}{i}$, simplifies to`, opts: [r`$-i$`, r`$i$`, r`$-1$`, r`$1$`], key: 'a', sol: r`Multiply top and bottom by $i$: $\dfrac{1}{i} = \dfrac{i}{i^2} = \dfrac{i}{-1} = -i$. Option (b) would need $i^2 = 1$.`, d: 1, c: 'recall', t: [1], time: 40 }),
  (C_) => C_.which([[0, -1], [0, 1], [-1, 0], [1, 0]], cn(cinv(I))));
Q('m02', mk.mcq({ stem: r`For every whole number $n$, the power $i^{4n + 3}$ is equal to`, opts: [r`$-i$`, r`$i$`, r`$-1$`, r`$1$`], key: 'a', sol: r`$i^{4n + 3} = (i^4)^n \cdot i^3 = 1 \cdot (-i) = -i$. The exponent leaves remainder $3$ on division by $4$.`, d: 2, c: 'understanding', t: [1], time: 45 }),
  (C_) => { C_.assert([0, 1, 2, 5, 11].every((n) => ceq(cpow(I, 4 * n + 3), C(0, -1))), 'i^(4n+3) = -i'); C_.which([[0, -1], [0, 1], [-1, 0], [1, 0]], cn(cpow(I, 31))); });
Q('m03', mk.mcq({ stem: r`The value of $i^{102} - i^{53}$ is`, opts: [r`$-1 - i$`, r`$-1 + i$`, r`$1 - i$`, r`$1 + i$`], key: 'a', sol: r`$102 = 4(25) + 2$ gives $i^{102} = i^2 = -1$, and $53 = 4(13) + 1$ gives $i^{53} = i$. So the value is $-1 - i$.`, d: 2, c: 'application', t: [1], time: 75 }),
  (C_) => C_.which([[-1, -1], [-1, 1], [1, -1], [1, 1]], cn(csub(cpow(I, 102), cpow(I, 53)))));
{
  const z1 = C(-2, 7), z2 = C(5, -3), v = csub(cmul(C(3), z1), cmul(C(2), z2));
  Q('m04', mk.mcq({ stem: r`With $z_1 = -2 + 7i$ and $z_2 = 5 - 3i$, the number $3z_1 - 2z_2$ is`, opts: [r`$-16 + 27i$`, r`$-16 + 15i$`, r`$4 + 27i$`, r`$4 + 15i$`], key: 'a', sol: r`$3z_1 = -6 + 21i$ and $2z_2 = 10 - 6i$, so $3z_1 - 2z_2 = (-6 - 10) + (21 + 6)i = -16 + 27i$. Options (c) and (d) add $2z_2$ in some part.`, d: 2, c: 'understanding', t: [1], time: 75 }),
    (C_) => C_.which([[-16, 27], [-16, 15], [4, 27], [4, 15]], cn(v)));
}
Q('m05', mk.mcq({ stem: r`The product $(6 + i)(2 - 3i)$ is equal to`, opts: [r`$15 - 16i$`, r`$9 - 16i$`, r`$15 + 16i$`, r`$12 - 3i$`], key: 'a', sol: r`$(6 + i)(2 - 3i) = 12 - 18i + 2i - 3i^2 = 12 + 3 - 16i = 15 - 16i$. Option (b) forgets that $-3i^2 = +3$.`, d: 2, c: 'understanding', t: [1], time: 75 }),
  (C_) => C_.which([[15, -16], [9, -16], [15, 16], [12, -3]], cn(cmul(C(6, 1), C(2, -3)))));
{
  const z = C(6, -8), inv = cinv(z);
  Q('m06', mk.mcq({ stem: r`Written in the form $a + ib$, the reciprocal of $6 - 8i$ is`, opts: [r`$\dfrac{3}{50} + \dfrac{2}{25}i$`, r`$\dfrac{3}{5} + \dfrac{4}{5}i$`, r`$\dfrac{3}{50} - \dfrac{2}{25}i$`, r`$\dfrac{3}{5} - \dfrac{4}{5}i$`], key: 'a', sol: r`$\dfrac{1}{z} = \dfrac{\bar z}{|z|^2} = \dfrac{6 + 8i}{36 + 64} = \dfrac{6 + 8i}{100} = \dfrac{3}{50} + \dfrac{2}{25}i$. Option (b) divides by $|z|$ instead of $|z|^2$.`, d: 2, c: 'understanding', t: [1], time: 75 }),
    (C_) => { C_.assert(ceq(cmul(inv, z), C(1)), 'inverse'); C_.which([[3 / 50, 2 / 25], [3 / 5, 4 / 5], [3 / 50, -2 / 25], [3 / 5, -4 / 5]], cn(inv)); });
}
Q('m07', mk.mcq({ stem: r`When $\dfrac{-5 + 5i}{2 + i}$ is simplified to the form $a + ib$, the result is`, opts: [r`$-1 + 3i$`, r`$-3 + i$`, r`$-1 - 3i$`, r`$1 - 3i$`], key: 'a', sol: r`Multiply top and bottom by $2 - i$: the numerator is $(-5 + 5i)(2 - i) = -5 + 15i$ and the denominator is $4 + 1 = 5$, so the quotient is $-1 + 3i$. Option (b) multiplies by $2 + i$ instead.`, d: 3, c: 'application', t: [1], time: 90 }),
  (C_) => { C_.assert(ceq(cmul(cdiv(C(-5, 5), C(2, 1)), C(2, 1)), C(-5, 5)), 'undo'); C_.which([[-1, 3], [-3, 1], [-1, -3], [1, -3]], cn(cdiv(C(-5, 5), C(2, 1)))); });
Q('m08', mk.mcq({ stem: r`The real numbers $x$ and $y$ satisfy $(3x - 2y) + i(x + 4y) = 5 + 11i$. The product $xy$ equals`, opts: [r`$6$`, r`$5$`, r`$1$`, r`$18$`], key: 'a', sol: r`Equating parts: $3x - 2y = 5$ and $x + 4y = 11$. Doubling the first and adding gives $7x = 21$, so $x = 3$ and $y = 2$, and $xy = 6$.`, d: 3, c: 'application', t: [1], time: 90 }),
  (C_) => { const hits = []; for (let x = -20; x <= 20; x++) for (let y = -20; y <= 20; y++) if (ceq(C(3 * x - 2 * y, x + 4 * y), C(5, 11))) hits.push([x, y]); C_.assert(hits.length === 1 && hits[0].join() === '3,2', 'unique x=3, y=2'); C_.which([6, 5, 1, 18], 3 * 2); });
Q('m09', mk.mcq({ stem: r`The conjugate of the complex number $8 - 11i$ is`, opts: [r`$8 + 11i$`, r`$-8 + 11i$`, r`$-8 - 11i$`, r`$11 - 8i$`], key: 'a', sol: r`The conjugate keeps the real part and changes the sign of the imaginary part, so $\overline{8 - 11i} = 8 + 11i$.`, d: 1, c: 'recall', t: [2], time: 30 }),
  (C_) => C_.which([[8, 11], [-8, 11], [-8, -11], [11, -8]], cn(cconj(C(8, -11)))));
Q('m10', mk.mcq({ stem: r`Which of these four expressions has real part $0$ for every complex number $z$?`, opts: [r`$z - \bar z$`, r`$z + \bar z$`, r`$z\bar z$`, r`$\dfrac{z}{\bar z}$`], key: 'a', sol: r`For $z = a + ib$, $z - \bar z = 2ib$ has real part $0$. The sum is $2a$ and the product is $a^2 + b^2$, both real, and $\dfrac{z}{\bar z}$ has real part $\dfrac{a^2 - b^2}{a^2 + b^2}$.`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C_) => { const Z = []; for (const a of [-3, -1, 0, 2, 5]) for (const b of [-4, -2, 1, 3]) Z.push(C(a, b)); const zero = (f) => Z.every((z) => f(z).re.n === 0n); C_.which([zero((z) => csub(z, cconj(z))), zero((z) => cadd(z, cconj(z))), zero((z) => cmul(z, cconj(z))), zero((z) => cdiv(z, cconj(z)))], true); });
Q('m11', mk.mcq({ stem: r`The modulus of the quotient $\dfrac{1 - 2i}{3 + 4i}$ is`, opts: [r`$\dfrac{\sqrt{5}}{5}$`, r`$\sqrt{5}$`, r`$\dfrac{\sqrt{5}}{25}$`, r`$\dfrac{3}{5}$`], key: 'a', sol: r`$\left|\dfrac{z_1}{z_2}\right| = \dfrac{|z_1|}{|z_2|} = \dfrac{\sqrt{1 + 4}}{\sqrt{9 + 16}} = \dfrac{\sqrt{5}}{5}$. Option (c) divides by $|z_2|^2$.`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C_) => { const q = cdiv(C(1, -2), C(3, 4)); C_.assert(near(Math.hypot(...cn(q)), s5 / 5, 1e-12) && cmod2(q).n * 5n === cmod2(q).d, '|q|^2 = 1/5'); C_.which([s5 / 5, s5, s5 / 25, 0.6], Math.hypot(...cn(q))); });
Q('m12', mk.mcq({ stem: r`On the Argand plane, the point $-3$ lies on the negative real axis. Its principal argument is`, opts: [r`$180^\circ$`, r`$-180^\circ$`, r`$0^\circ$`, r`$90^\circ$`], key: 'a', sol: r`The principal argument lies in $(-180^\circ, 180^\circ]$. The negative real axis is half a turn from the positive real axis, so the argument is $180^\circ$, not $-180^\circ$.`, d: 1, c: 'understanding', t: [2, 3], time: 45 }),
  (C_) => C_.which([180, -180, 0, 90], cargDeg(C(-3, 0))));
Q('m13', mk.mcq({ stem: r`The principal argument of the complex number $-5 - 5i$ is`, opts: [r`$-135^\circ$`, r`$135^\circ$`, r`$-45^\circ$`, r`$45^\circ$`], key: 'a', sol: r`The point $(-5, -5)$ is in quadrant III and the related angle is $\tan^{-1}\dfrac{5}{5} = 45^\circ$. So $\theta = -180^\circ + 45^\circ = -135^\circ$.`, d: 2, c: 'application', t: [2, 3], time: 60 }),
  (C_) => C_.which([-135, 135, -45, 45], cargDeg(C(-5, -5))));
Q('m14', mk.mcq({ stem: r`The non-zero numbers $z_1$ and $z_2$ have principal arguments $40^\circ$ and $150^\circ$. The principal argument of $z_1 z_2$ is`, opts: [r`$-170^\circ$`, r`$190^\circ$`, r`$-110^\circ$`, r`$110^\circ$`], key: 'a', sol: r`Arguments add under multiplication: $40^\circ + 150^\circ = 190^\circ$. The principal value must lie in $(-180^\circ, 180^\circ]$, so subtract $360^\circ$ to get $-170^\circ$.`, d: 3, c: 'application', t: [2], time: 75 }),
  (C_) => { const z1 = fc.polar(2, 40), z2 = fc.polar(3, 150); C_.assert(near(fc.arg(fc.mul(z1, z2)), -170, 1e-9) && near(wrapDeg(190), -170), 'arg of the product'); C_.which([-170, 190, -110, 110], fc.arg(fc.mul(z1, z2))); });
Q('m15', mk.mcq({ stem: r`The polar form of $\sqrt{3} + i$ is`, opts: [r`$2(\cos 30^\circ + i\sin 30^\circ)$`, r`$2(\cos 60^\circ + i\sin 60^\circ)$`, r`$4(\cos 30^\circ + i\sin 30^\circ)$`, r`$2(\cos 150^\circ + i\sin 150^\circ)$`], key: 'a', sol: r`$r = \sqrt{3 + 1} = 2$ and $\tan\theta = \dfrac{1}{\sqrt{3}}$ with the point in quadrant I, so $\theta = 30^\circ$. Option (c) uses $r^2$ for $r$.`, d: 2, c: 'understanding', t: [3], time: 75 }),
  (C_) => C_.which([fc.polar(2, 30), fc.polar(2, 60), fc.polar(4, 30), fc.polar(2, 150)], [s3, 1]));
Q('m16', mk.mcq({ stem: r`In the form $a + ib$, the number $2(\cos 210^\circ + i\sin 210^\circ)$ is`, opts: [r`$-\sqrt{3} - i$`, r`$-\sqrt{3} + i$`, r`$\sqrt{3} - i$`, r`$-1 - \sqrt{3}\,i$`], key: 'a', sol: r`$\cos 210^\circ = -\dfrac{\sqrt{3}}{2}$ and $\sin 210^\circ = -\dfrac{1}{2}$, so the number is $-\sqrt{3} - i$. Both parts are negative because $210^\circ$ is in quadrant III.`, d: 2, c: 'understanding', t: [3], time: 75 }),
  (C_) => C_.which([[-s3, -1], [-s3, 1], [s3, -1], [-1, -s3]], fc.polar(2, 210)));
Q('m17', mk.mcq({ stem: r`The square roots of $15 + 8i$ are`, opts: [r`$\pm(4 + i)$`, r`$\pm(4 - i)$`, r`$\pm(3 + 4i)$`, r`$\pm(8 + i)$`], key: 'a', sol: r`$|z| = \sqrt{225 + 64} = 17$, so $x^2 = \dfrac{17 + 15}{2} = 16$ and $y^2 = \dfrac{17 - 15}{2} = 1$. Since $2xy = 8 > 0$, $x$ and $y$ have the same sign: $\pm(4 + i)$.`, d: 2, c: 'application', t: [4], time: 90 }),
  (C_) => { const z = C(15, 8); C_.which([cn(cmul(C(4, 1), C(4, 1))), cn(cmul(C(4, -1), C(4, -1))), cn(cmul(C(3, 4), C(3, 4))), cn(cmul(C(8, 1), C(8, 1)))], cn(z)); C_.assert(ceq(csqrt(z).roots[0], C(4, 1)), 'root'); });
Q('m18', mk.mcq({ stem: r`The square roots of the purely imaginary number $-8i$ are`, opts: [r`$\pm(2 - 2i)$`, r`$\pm(2 + 2i)$`, r`$\pm(4 - 4i)$`, r`$\pm(1 - i)$`], key: 'a', sol: r`$|z| = 8$, so $x^2 = y^2 = 4$. The product $2xy = -8$ is negative, so $x$ and $y$ have opposite signs: $\pm(2 - 2i)$. Check: $(2 - 2i)^2 = 4 - 8i - 4 = -8i$.`, d: 3, c: 'application', t: [4], time: 90 }),
  (C_) => { const z = C(0, -8); C_.which([cn(cmul(C(2, -2), C(2, -2))), cn(cmul(C(2, 2), C(2, 2))), cn(cmul(C(4, -4), C(4, -4))), cn(cmul(C(1, -1), C(1, -1)))], cn(z)); C_.assert(ceq(csqrt(z).roots[0], C(2, -2)), 'root'); });
Q('m19', mk.mcq({ stem: r`If $\omega$ is a complex cube root of unity, then $1 + \omega + \omega^2$ is equal to`, opts: [r`$0$`, r`$1$`, r`$-1$`, r`$\omega$`], key: 'a', sol: r`The roots of $x^3 - 1 = (x - 1)(x^2 + x + 1)$ other than $1$ satisfy $x^2 + x + 1 = 0$, so $1 + \omega + \omega^2 = 0$.`, d: 1, c: 'recall', t: [5], time: 30 }),
  (C_) => { C_.assert(weq(wadd(wadd(W1, WW), WW2), W(0, 0)), 'exact sum'); C_.which([[0, 0], [1, 0], [-1, 0], wnum(WW)], wnum(wadd(wadd(W1, WW), WW2))); });
Q('m20', mk.mcq({ stem: r`For a complex cube root of unity $\omega$, the sum $\omega^{47} + \omega^{-29}$ equals`, opts: [r`$-1$`, r`$1$`, r`$0$`, r`$2\omega$`], key: 'a', sol: r`$47 = 3(15) + 2$ gives $\omega^{47} = \omega^2$; $-29 = 3(-10) + 1$ gives $\omega^{-29} = \omega$. So the sum is $\omega + \omega^2 = -1$.`, d: 2, c: 'application', t: [5], time: 75 }),
  (C_) => { const v = wadd(wp(47), wp(-29)); C_.assert(weq(wpow(WW, 47), WW2) && weq(wp(-29), WW), 'residues'); C_.which([[-1, 0], [1, 0], [0, 0], wnum(wmul(W(2, 0), WW))], wnum(v)); });
Q('m21', mk.mcq({ stem: r`If $\omega$ is a complex cube root of unity, then $(1 + \omega)^7$ equals`, opts: [r`$-\omega^2$`, r`$\omega^2$`, r`$-\omega$`, r`$\omega$`], key: 'a', sol: r`$1 + \omega = -\omega^2$, so $(1 + \omega)^7 = -\omega^{14}$. Since $14 = 3(4) + 2$, $\omega^{14} = \omega^2$ and the value is $-\omega^2$.`, d: 3, c: 'application', t: [5], time: 90 }),
  (C_) => { const v = wpow(wadd(W1, WW), 7); C_.which([wnum(wneg(WW2)), wnum(WW2), wnum(wneg(WW)), wnum(WW)], wnum(v)); C_.assert(weq(v, wneg(WW2)), 'exact'); });
Q('m22', mk.mcq({ stem: r`With $\omega$ a complex cube root of unity, the product $(2 + \omega)(2 + \omega^2)$ equals`, opts: [r`$3$`, r`$5$`, r`$7$`, r`$1$`], key: 'a', sol: r`$(2 + \omega)(2 + \omega^2) = 4 + 2(\omega + \omega^2) + \omega^3 = 4 - 2 + 1 = 3$.`, d: 2, c: 'application', t: [5], time: 75 }),
  (C_) => { const v = wmul(wadd(W(2, 0), WW), wadd(W(2, 0), WW2)); C_.assert(weq(v, W(3, 0)), 'exact 3'); C_.which([3, 5, 7, 1], wnum(v)[0]); });
Q('m23', mk.mcq({ stem: r`A complex number $z$ satisfies $z + \dfrac{1}{z} = -1$. The value of $z^3$ is`, opts: [r`$1$`, r`$-1$`, r`$\omega$`, r`$0$`], key: 'a', sol: r`Multiplying by $z$ gives $z^2 + z + 1 = 0$. So $z$ is $\omega$ or $\omega^2$, and in both cases $z^3 = 1$.`, d: 4, c: 'analysis', t: [5], time: 90 }),
  (C_) => { const both = [WW, WW2].every((z) => weq(wadd(z, wpow(z, 2)), wneg(W1)) && weq(wmul(z, wpow(z, 2)), W1) && weq(wpow(z, 3), W1)); C_.assert(both, 'z + 1/z = -1 for w and w^2, z^3 = 1'); C_.which([[1, 0], [-1, 0], wnum(WW), [0, 0]], wnum(wpow(WW, 3))); });
Q('m24', mk.mcq({ stem: r`Exactly one of the following numbers has square $5 - 12i$. Which one?`, opts: [r`$3 - 2i$`, r`$3 + 2i$`, r`$2 - 3i$`, r`$2 + 3i$`], key: 'a', sol: r`$(3 - 2i)^2 = 9 - 12i + 4i^2 = 5 - 12i$. The others square to $5 + 12i$, $-5 - 12i$ and $-5 + 12i$.`, d: 2, c: 'understanding', t: [4], time: 60 }),
  (C_) => C_.which([C(3, -2), C(3, 2), C(2, -3), C(2, 3)].map((z) => cn(cmul(z, z))), [5, -12]));
Q('m25', mk.mcq({ stem: r`The quotient $\dfrac{5 - i}{2 + 3i}$ is represented on the Argand plane by a point in quadrant`, opts: [r`I`, r`II`, r`III`, r`IV`], key: 'd', sol: r`$\dfrac{(5 - i)(2 - 3i)}{4 + 9} = \dfrac{7 - 17i}{13}$. The real part is positive and the imaginary part is negative, so the point is in quadrant IV.`, d: 3, c: 'application', t: [1, 3], time: 90 }),
  (C_) => C_.which(['I', 'II', 'III', 'IV'], quad(cdiv(C(5, -1), C(2, 3)))));

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The power $i^{203}$ equals $-i$.`, r: r`Because $i^4 = 1$, the value of $i^n$ depends only on the remainder of $n$ on division by $4$.`, key: 'a', sol: r`R is true. For A, $203 = 4(50) + 3$ gives $i^{203} = i^3 = -i$, so A is true and R is the reason.`, d: 2, c: 'understanding', t: [1] }),
  (C_) => { C_.assert(ceq(cpow(I, 203), C(0, -1)) && [0, 1, 2, 3, 7, 12, 25].every((n) => ceq(cpow(I, n + 4), cpow(I, n))), 'A and R hold'); C_.key('a'); });
Q('ar2', mk.ar({ a: r`For all complex numbers $z_1$ and $z_2$, $|z_1 z_2| = |z_1|\,|z_2|$.`, r: r`For every complex number $z$, a number and its conjugate have the same modulus, $|\bar z| = |z|$.`, key: 'b', sol: r`Both statements are true. But R is a different property: it says nothing about products, so it cannot explain A, which comes from $|z_1 z_2|^2 = z_1 z_2\bar z_1 \bar z_2$.`, d: 3, c: 'analysis', t: [2] }),
  (C_) => { const Z = [C(1, 2), C(-3, 4), C(5, -2), C(0, 7)]; C_.assert(Z.every((x) => Z.every((y) => cmod2(cmul(x, y)).n * cmod2(x).d * cmod2(y).d === cmod2(x).n * cmod2(y).n * cmod2(cmul(x, y)).d)) && Z.every((x) => ceq(C(cmod2(cconj(x))), C(cmod2(x)))), 'both hold'); C_.key('b'); });
Q('ar3', mk.ar({ a: r`The principal argument of $-4 - 4i$ is $-135^\circ$.`, r: r`For $z = a + ib$ with $a \ne 0$, the principal argument is always $\tan^{-1}\dfrac{b}{a}$.`, key: 'c', sol: r`A is true: the point is in quadrant III with related angle $45^\circ$. R is false: for $-4 - 4i$ it gives $\tan^{-1} 1 = 45^\circ$, which is the related angle, not the argument.`, d: 3, c: 'analysis', t: [2, 3] }),
  (C_) => { C_.assert(near(cargDeg(C(-4, -4)), -135, 1e-9) && !near(deg(Math.atan(1)), cargDeg(C(-4, -4)), 1), 'A true, R false'); C_.key('c'); });
Q('ar4', mk.ar({ a: r`The square roots of $8 + 6i$ are $\pm(3 - i)$.`, r: r`If $x + iy$ is a square root of $a + ib$, then $x^2 - y^2 = a$ and $2xy = b$.`, key: 'd', sol: r`R is true by expanding $(x + iy)^2$. For A: $|z| = 10$, $x^2 = 9$, $y^2 = 1$, and $2xy = 6 > 0$ gives $\pm(3 + i)$. But $(3 - i)^2 = 8 - 6i$, so A is false.`, d: 3, c: 'analysis', t: [4] }),
  (C_) => { const z = C(8, 6); C_.assert(ceq(cmul(C(3, 1), C(3, 1)), z) && !ceq(cmul(C(3, -1), C(3, -1)), z) && ceq(cmul(C(3, -1), C(3, -1)), cconj(z)), 'A false, R true'); C_.key('d'); });
Q('ar5', mk.ar({ a: r`If $\omega$ is a complex cube root of unity, then $(1 + \omega)(1 + \omega^2) = 1$.`, r: r`$1 + \omega = -\omega^2$ and $1 + \omega^2 = -\omega$, and $\omega^3 = 1$.`, key: 'a', sol: r`R is true from $1 + \omega + \omega^2 = 0$ and $\omega^3 = 1$. Then $(1 + \omega)(1 + \omega^2) = (-\omega^2)(-\omega) = \omega^3 = 1$, so A follows from R.`, d: 3, c: 'application', t: [5] }),
  (C_) => { C_.assert(weq(wadd(W1, WW), wneg(WW2)) && weq(wadd(W1, WW2), wneg(WW)) && weq(wmul(wadd(W1, WW), wadd(W1, WW2)), W1), 'A and R hold'); C_.key('a'); });
Q('ar6', mk.ar({ a: r`If $\omega$ is a complex cube root of unity, then $\omega^{60} + \omega^{61} + \omega^{62} = 0$.`, r: r`Every power of $\omega$ is equal to $1$.`, key: 'c', sol: r`A is true: the three powers are $1$, $\omega$, $\omega^2$ in some order, with sum $0$. R is false: $\omega^2 \ne 1$, since $\omega^2 = \dfrac{-1 - i\sqrt{3}}{2}$.`, d: 3, c: 'analysis', t: [5] }),
  (C_) => { C_.assert(weq(wadd(wadd(wp(60), wp(61)), wp(62)), W(0, 0)) && !weq(WW2, W1) && !weq(WW, W1), 'A true, R false'); C_.key('c'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`For every integer $k$, the power $i^{4k + 2}$ has one and the same value.`, key: 't', sol: r`$i^{4k + 2} = (i^4)^k\, i^2 = 1 \cdot (-1) = -1$ for every integer $k$, including negative $k$.`, d: 1, c: 'understanding', t: [1] }),
  (C_) => { C_.assert([-5, -2, -1, 0, 1, 3, 9].every((k) => ceq(cpow(I, 4 * k + 2), C(-1))), 'i^(4k+2) = -1'); C_.key('t'); });
Q('tf2', mk.tf({ stem: r`The principal argument of a non-zero complex number may be $-180^\circ$.`, key: 'f', sol: r`The principal argument is taken in $(-180^\circ, 180^\circ]$: $-180^\circ$ is excluded and the angle for the negative real axis is written $180^\circ$.`, d: 1, c: 'understanding', t: [2, 3] }),
  (C_) => { C_.assert(cargDeg(C(-6, 0)) === 180 && cargDeg(C(-6, -1)) > -180 && cargDeg(C(-6, -1)) < -170, 'the convention'); C_.key('f'); });
Q('tf3', mk.tf({ stem: r`The two square roots of any non-zero complex number are negatives of each other.`, key: 't', sol: r`If $w^2 = z$ then $(-w)^2 = w^2 = z$ too, and a quadratic equation $w^2 = z$ has no more than two roots.`, d: 2, c: 'understanding', t: [4] }),
  (C_) => { C_.assert([C(3, 4), C(-5, 12), C(0, 2), C(7, 0)].every((z) => { const s = csqrt(z); return s.exact ? ceq(s.roots[1], cneg(s.roots[0])) : true; }), 'roots are negatives'); C_.key('t'); });
Q('tf4', mk.tf({ stem: r`The conjugate of the product of two complex numbers is the product of their conjugates.`, key: 't', sol: r`$\overline{z_1 z_2} = \bar z_1\,\bar z_2$. For $z_1 = a + ib$ and $z_2 = c + id$, both sides equal $(ac - bd) - i(ad + bc)$.`, d: 2, c: 'understanding', t: [2] }),
  (C_) => { const Z = [C(1, 2), C(-3, 4), C(5, -2), C(0, 7), C(2, 0)]; C_.assert(Z.every((x) => Z.every((y) => ceq(cconj(cmul(x, y)), cmul(cconj(x), cconj(y))))), 'rule'); C_.key('t'); });
Q('tf5', mk.tf({ stem: r`If $\omega$ is a complex cube root of unity, then $\omega^4 = \omega^2$.`, key: 'f', sol: r`$\omega^4 = \omega^3\cdot\omega = \omega$, not $\omega^2$. In general $\omega^n$ is decided by the remainder of $n$ on division by $3$.`, d: 2, c: 'understanding', t: [5] }),
  (C_) => { C_.assert(weq(wpow(WW, 4), WW) && !weq(wpow(WW, 4), WW2), 'w^4 = w'); C_.key('f'); });
Q('tf6', mk.tf({ stem: r`The three cube roots of unity lie on one straight line in the Argand plane.`, key: 'f', sol: r`They lie on the unit circle at $0^\circ$, $120^\circ$ and $240^\circ$ and form an equilateral triangle, so no straight line contains all three.`, d: 2, c: 'understanding', t: [5] }),
  (C_) => { const P = [[1, 0], [-0.5, s3 / 2], [-0.5, -s3 / 2]]; const area = Math.abs((P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1])) / 2; C_.assert(area > 1 && near(area, (3 * s3) / 4, 1e-12), 'non-collinear (triangle area 3 sqrt3 / 4)'); C_.key('f'); });
Q('tf7', mk.tf({ stem: r`If $z$ is a non-zero complex number that is not a negative real number, the principal argument of $\dfrac{1}{z}$ is the negative of that of $z$.`, key: 't', sol: r`$\dfrac{1}{z} = \dfrac{\bar z}{|z|^2}$ has the argument of $\bar z$, which is $-\arg z$ when $z$ is not on the negative real axis.`, d: 3, c: 'analysis', t: [2] }),
  (C_) => { const Z = [C(1, 2), C(-3, 4), C(5, -2), C(0, 7), C(-2, -9), C(4, 0)]; C_.assert(Z.every((z) => near(cargDeg(cinv(z)), -cargDeg(z), 1e-9)), 'arg 1/z = -arg z'); C_.key('t'); });
Q('tf8', mk.tf({ stem: r`For real numbers $p$ and $q$, the numbers $p + iq$ and $q + ip$ have equal moduli.`, key: 't', sol: r`$|p + iq| = \sqrt{p^2 + q^2}$ and $|q + ip| = \sqrt{q^2 + p^2}$, which are equal.`, d: 1, c: 'understanding', t: [2] }),
  (C_) => { C_.assert([[3, 4], [-5, 12], [0, 7], [2, -9]].every(([p, q]) => cmod2(C(p, q)).n === cmod2(C(q, p)).n), 'equal'); C_.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The product $(4 + 5i)(4 - 5i)$ equals ____.`, acc: [['41']], sol: r`A number times its conjugate is real: $(4 + 5i)(4 - 5i) = 16 - 25i^2 = 16 + 25 = 41$.`, d: 1, c: 'understanding', t: [1, 2] }),
  (C_) => C_.blank(Number(cmul(C(4, 5), C(4, -5)).re.n)));
Q('fb2', mk.fill({ stem: r`If $\dfrac{26}{5 - i} = 5 + ki$ with $k$ real, then $k =$ ____.`, acc: [['1']], sol: r`$\dfrac{26}{5 - i} = \dfrac{26(5 + i)}{25 + 1} = 5 + i$, so $k = 1$.`, d: 2, c: 'application', t: [1] }),
  (C_) => { const q = cdiv(C(26), C(5, -1)); C_.assert(ceq(q, C(5, 1)), 'quotient'); C_.blank(Number(q.im.n)); });
Q('fb3', mk.fill({ stem: r`In degrees, the principal argument of $2 - 2\sqrt{3}\,i$ is ____.`, acc: [['-60']], sol: r`The modulus is $4$ and $\tan\alpha = \sqrt{3}$ gives the related angle $60^\circ$. The point is in quadrant IV, so $\theta = -60$.`, d: 2, c: 'application', t: [2, 3] }),
  (C_) => { C_.assert(near(fc.arg([2, -2 * s3]), -60, 1e-9) && near(fc.abs([2, -2 * s3]), 4, 1e-12), 'arg -60'); C_.blank(Math.round(fc.arg([2, -2 * s3]))); });
Q('fb4', mk.fill({ stem: r`For a positive number $k$, the square of $k + 2i$ is $21 + 20i$. Then $k =$ ____.`, acc: [['5']], sol: r`$(k + 2i)^2 = k^2 - 4 + 4ki$. Equating real parts, $k^2 - 4 = 21$, so $k = 5$; the imaginary part $4k = 20$ agrees.`, d: 2, c: 'application', t: [4] }),
  (C_) => { const hits = []; for (let k = 1; k <= 30; k++) if (ceq(cmul(C(k, 2), C(k, 2)), C(21, 20))) hits.push(k); C_.assert(hits.join() === '5', 'k = 5 only'); C_.blank(hits[0]); });
Q('fb5', mk.fill({ stem: r`Let $\omega$ be a non-real cube root of $1$. Adding the exponents and reducing modulo $3$, the number $\omega^{16}\cdot\omega^{14}$ comes to ____.`, acc: [['1']], sol: r`$\omega^{16}\omega^{14} = \omega^{30} = (\omega^3)^{10} = 1$.`, d: 2, c: 'application', t: [5] }),
  (C_) => { const v = wmul(wp(16), wp(14)); C_.assert(weq(v, W1) && weq(wpow(WW, 30), W1), 'w^30 = 1'); C_.blank(Number(v.a.n)); });
Q('fb6', mk.fill({ stem: r`The modulus of $12 - 5i$ is ____.`, acc: [['13']], sol: r`$|12 - 5i| = \sqrt{144 + 25} = \sqrt{169} = 13$.`, d: 1, c: 'recall', t: [2] }),
  (C_) => { C_.assert(cmod2(C(12, -5)).n === 169n, '169'); C_.blank(Math.sqrt(169)); });

// =============================================================== numerical
{
  const v = 13 / 17;
  Q('n01', mk.num({ stem: r`Find the modulus of $\dfrac{12 + 5i}{15 - 8i}$, correct to four decimal places.`, value: 0.7647, tol: 0.00006, sol: r`$\left|\dfrac{12 + 5i}{15 - 8i}\right| = \dfrac{\sqrt{144 + 25}}{\sqrt{225 + 64}} = \dfrac{13}{17} \approx 0.7647$.`, scheme: [['Quotient rule with both moduli', 0.5], ['0.7647', 0.5]], d: 2, c: 'understanding', t: [2], time: 75 }),
    (C_) => { C_.assert(near(Math.hypot(...cn(cdiv(C(12, 5), C(15, -8)))), v, 1e-12), 'direct'); C_.val(v, 0.00006); });
}
{
  const hits = []; for (let p = -40; p <= 40; p++) { const z = cmul(C(2, -3), C(p, 4)); if (z.re.n === 0n) hits.push(p); }
  Q('n02', mk.num({ stem: r`Find the real number $p$ for which the product $(2 - 3i)(p + 4i)$ is purely imaginary.`, value: -6, sol: r`$(2 - 3i)(p + 4i) = 2p + 8i - 3p\,i + 12 = (2p + 12) + (8 - 3p)i$. The real part vanishes when $2p + 12 = 0$, so $p = -6$.`, scheme: [['Expansion with $i^2 = -1$', 0.5], ['$-6$', 0.5]], d: 2, c: 'application', t: [1], time: 75 }),
    (C_) => { C_.assert(hits.join() === '-6' && !ceq(cmul(C(2, -3), C(-6, 4)), C(0)), 'unique p'); C_.val(hits[0]); });
}
Q('n03', mk.num({ stem: r`Find, in degrees, the principal argument of $-2 - 2\sqrt{3}\,i$.`, value: -120, sol: r`The modulus is $4$ and $\tan\alpha = \sqrt{3}$ gives the related angle $60^\circ$. In quadrant III, $\theta = -180 + 60 = -120$.`, scheme: [['Related angle $60^\\circ$ and quadrant III', 0.5], ['$-120$', 0.5]], d: 2, c: 'application', t: [2, 3], time: 75 }),
  (C_) => C_.val(Math.round(fc.arg([-2, -2 * s3]) * 1e9) / 1e9));
{
  Q('n04', mk.num({ stem: r`One square root of $40 - 42i$ is $x + iy$ with $x > 0$. Find $x$.`, value: 7, sol: r`$|z| = \sqrt{1600 + 1764} = 58$, so $x^2 = \dfrac{58 + 40}{2} = 49$ and $x = 7$. Then $y^2 = \dfrac{58 - 40}{2} = 9$ and $2xy < 0$ gives $y = -3$.`, scheme: [['$|z| = 58$ and $x^2 = 49$', 0.5], ['$7$', 0.5]], d: 3, c: 'application', t: [4], time: 90 }),
    (C_) => { const s = csqrt(C(40, -42)); C_.assert(s.exact && ceq(s.roots[0], C(7, -3)) && s.m.n === 58n, 'root 7 - 3i'); C_.val(Number(s.roots[0].re.n)); });
}
{
  const v = wpow(wadd(wadd(W(2, 0), wmul(W(5, 0), WW)), wmul(W(2, 0), WW2)), 3);
  Q('n05', mk.num({ stem: r`If $\omega$ is a complex cube root of unity, find the value of $(2 + 5\omega + 2\omega^2)^3$.`, value: 27, sol: r`$2 + 5\omega + 2\omega^2 = 2(1 + \omega + \omega^2) + 3\omega = 3\omega$, so the cube is $27\omega^3 = 27$.`, scheme: [['Reduction to $3\\omega$ using $1 + \\omega + \\omega^2 = 0$', 0.5], ['$27$', 0.5]], d: 3, c: 'application', t: [5], time: 90 }),
    (C_) => { C_.assert(weq(v, W(27, 0)) && weq(wadd(wadd(W(2, 0), wmul(W(5, 0), WW)), wmul(W(2, 0), WW2)), wmul(W(3, 0), WW)), 'exact 27'); C_.val(Number(v.a.n)); });
}
{
  const a = 4, b = -1, c = 2;
  const lhs = wmul(wadd(wadd(W(a, 0), wmul(W(b, 0), WW)), wmul(W(c, 0), WW2)), wadd(wadd(W(a, 0), wmul(W(b, 0), WW2)), wmul(W(c, 0), WW)));
  const v = a * a + b * b + c * c - a * b - b * c - c * a;
  Q('n06', mk.num({ stem: r`With $\omega$ a complex cube root of unity, evaluate $(4 - \omega + 2\omega^2)(4 - \omega^2 + 2\omega)$.`, value: 19, sol: r`For $(a + b\omega + c\omega^2)(a + b\omega^2 + c\omega) = a^2 + b^2 + c^2 - ab - bc - ca$ with $a = 4$, $b = -1$, $c = 2$: $16 + 1 + 4 + 4 + 2 - 8 = 19$.`, scheme: [['Identity with $a = 4$, $b = -1$, $c = 2$ substituted', 0.5], ['$19$', 0.5]], d: 3, c: 'application', t: [5], time: 90 }),
    (C_) => { C_.assert(weq(lhs, W(v, 0)) && v === 19, 'exact 19'); C_.val(v); });
}

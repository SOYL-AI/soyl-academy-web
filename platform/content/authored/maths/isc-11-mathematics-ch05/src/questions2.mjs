// ISC 11 Mathematics ch05 Complex Numbers: short (2 and 3 marks) and long (5 marks, in parts) items.
// Every number in a model answer is recomputed: Gaussian-rational values with exact fractions, cube-root-of-unity expressions in
// Z[w], identities on grids of Gaussian rationals, moduli and arguments numerically.
import { Q, mk } from './lib.mjs';
import { C, I, fr, cadd, csub, cmul, cdiv, cinv, cconj, cneg, cpow, cmod2, ceq, cnum, cargDeg, csqrt, near, fc, deg, wrapDeg, feq, fmul, fadd, fnum,
  W, W1, WW, WW2, wadd, wsub, wmul, wpow, weq, wneg, wp } from './cx.mjs';

const r = String.raw;
const s2 = Math.SQRT2, s3 = Math.sqrt(3);
const cn = cnum;
const GRID = []; for (const a of [-4, -3, -1, 0, 2, 5]) for (const b of [-5, -2, 1, 3, 4]) GRID.push(C(a, b));
const NZ = GRID.filter((z) => !(z.re.n === 0n && z.im.n === 0n));

// =============================================================== short answer (2 marks)
{
  const q = cdiv(C(5, 1), C(2, -3));
  Q('s201', mk.short({ marks: 2, stem: r`Express $\dfrac{5 + i}{2 - 3i}$ in the form $a + ib$.`, model: r`Multiply the numerator and the denominator by the conjugate $2 + 3i$ of the divisor. The numerator is $(5 + i)(2 + 3i) = 10 + 15i + 2i - 3 = 7 + 17i$ and the denominator is $4 + 9 = 13$. So the quotient is $\dfrac{7}{13} + \dfrac{17}{13}i$.`, sol: 'Rationalise with the conjugate of the divisor.', scheme: [['Numerator $7 + 17i$ and denominator $13$', 1], ['Result $\\dfrac{7}{13} + \\dfrac{17}{13}i$', 1]], d: 2, c: 'application', t: [1], time: 90 }),
    (C_) => { C_.assert(ceq(q, C([7, 13], [17, 13])) && ceq(cmul(C(5, 1), C(2, 3)), C(7, 17)) && cmod2(C(2, -3)).n === 13n, 'quotient'); C_.model([7, 17, 13]); });
}
Q('s202', mk.short({ marks: 2, stem: r`For real numbers $a$ and $b$, show that $(a + ib)^2 + (a - ib)^2$ is a real number, and find it.`, model: r`$(a + ib)^2 = a^2 - b^2 + 2abi$ and $(a - ib)^2 = a^2 - b^2 - 2abi$. Adding, the imaginary parts cancel and the sum is $2(a^2 - b^2)$, which is real.`, sol: 'Expand both squares; the imaginary parts cancel.', scheme: [['Both squares expanded', 1], ['Sum $2(a^2 - b^2)$, real', 1]], d: 2, c: 'understanding', t: [1, 2], time: 75 }),
  (C_) => { C_.assert(GRID.every((z) => { const a = Number(z.re.n), b = Number(z.im.n); return ceq(cadd(cpow(z, 2), cpow(cconj(z), 2)), C(2 * (a * a - b * b))); }), 'identity on a grid'); C_.model(['2(a^2 - b^2)']); });
Q('s203', mk.short({ marks: 2, stem: r`Find the value of $i^{111} + i^{-111}$.`, model: r`$111 = 4(27) + 3$, so $i^{111} = i^3 = -i$. Also $-111 = 4(-28) + 1$, so $i^{-111} = i$. Hence the sum is $-i + i = 0$.`, sol: 'Reduce each exponent modulo $4$.', scheme: [['Both powers reduced', 1], ['Sum $0$', 1]], d: 2, c: 'application', t: [1], time: 75 }),
  (C_) => { C_.assert(ceq(cpow(I, 111), C(0, -1)) && ceq(cpow(I, -111), I) && ceq(cadd(cpow(I, 111), cpow(I, -111)), C(0)), 'sum zero'); C_.model([111, 27, 28]); });
{
  const z = C(-12, 5), inv = cinv(z);
  Q('s204', mk.short({ marks: 2, stem: r`Using the conjugate and the squared modulus, express $\dfrac{1}{-12 + 5i}$ as a number $a + ib$.`, model: r`$\dfrac{1}{z} = \dfrac{\bar z}{|z|^2}$ with $\bar z = -12 - 5i$ and $|z|^2 = 144 + 25 = 169$. So the inverse is $-\dfrac{12}{169} - \dfrac{5}{169}i$.`, sol: 'Conjugate over squared modulus.', scheme: [['$\\bar z$ and $|z|^2 = 169$', 1], ['Inverse $-\\dfrac{12}{169} - \\dfrac{5}{169}i$', 1]], d: 2, c: 'understanding', t: [1], time: 75 }),
    (C_) => { C_.assert(ceq(inv, C([-12, 169], [-5, 169])) && ceq(cmul(inv, z), C(1)) && cmod2(z).n === 169n, 'inverse'); C_.model([12, 5, 169]); });
}
{
  const z = [2 * s3, -2];
  Q('s205', mk.short({ marks: 2, stem: r`Find the modulus and the principal argument of $2\sqrt{3} - 2i$.`, model: r`The modulus is $r = \sqrt{12 + 4} = 4$. The related angle satisfies $\tan\alpha = \dfrac{2}{2\sqrt{3}} = \dfrac{1}{\sqrt{3}}$, so $\alpha = 30^\circ$. The point is in quadrant IV, so the principal argument is $-30^\circ$.`, sol: 'Modulus from the surd sum; related angle, then the quadrant.', scheme: [['Modulus $4$', 1], ['Principal argument $-30^\\circ$ with the quadrant', 1]], d: 2, c: 'application', t: [2, 3], time: 90 }),
    (C_) => { C_.assert(near(fc.abs(z), 4, 1e-12) && near(fc.arg(z), -30, 1e-9) && near(deg(Math.atan(1 / s3)), 30, 1e-9), 'values'); C_.model([4, 30]); });
}
{
  const z = fc.polar(6, 135);
  Q('s206', mk.short({ marks: 2, stem: r`Write $6(\cos 135^\circ + i\sin 135^\circ)$ in the form $a + ib$.`, model: r`$\cos 135^\circ = -\dfrac{\sqrt{2}}{2}$ and $\sin 135^\circ = \dfrac{\sqrt{2}}{2}$. So the number is $6\left(-\dfrac{\sqrt{2}}{2}\right) + 6\cdot\dfrac{\sqrt{2}}{2}\,i = -3\sqrt{2} + 3\sqrt{2}\,i$.`, sol: 'Evaluate the cosine and sine, then multiply by $6$.', scheme: [['Values of $\\cos 135^\\circ$ and $\\sin 135^\\circ$', 1], ['$-3\\sqrt{2} + 3\\sqrt{2}\\,i$', 1]], d: 2, c: 'understanding', t: [3], time: 75 }),
    (C_) => { C_.assert(near(z[0], -3 * s2, 1e-12) && near(z[1], 3 * s2, 1e-12), 'a + ib'); C_.model([3, 2, 135]); });
}
Q('s207', mk.short({ marks: 2, stem: r`Find the square roots of $-3 + 4i$.`, model: r`Let $(x + iy)^2 = -3 + 4i$. Then $x^2 - y^2 = -3$, $2xy = 4$, and $x^2 + y^2 = |z| = 5$. So $x^2 = 1$ and $y^2 = 4$. Since $2xy > 0$, the roots are $\pm(1 + 2i)$.`, sol: 'Equate parts and use the modulus.', scheme: [['Equations and $x^2 = 1$, $y^2 = 4$', 1], ['Roots $\\pm(1 + 2i)$ with the sign rule', 1]], d: 2, c: 'application', t: [4], time: 90 }),
  (C_) => { const z = C(-3, 4), s = csqrt(z); C_.assert(s.exact && ceq(s.roots[0], C(1, 2)) && s.m.n === 5n && ceq(cmul(C(1, 2), C(1, 2)), z), 'roots'); C_.model([1, 2, 4, 5]); });
Q('s208', mk.short({ marks: 2, stem: r`If $\omega$ is a complex cube root of unity, show that $(1 + \omega)^3 + (1 + \omega^2)^3 = -2$.`, model: r`Since $1 + \omega + \omega^2 = 0$, we have $1 + \omega = -\omega^2$ and $1 + \omega^2 = -\omega$. Then $(1 + \omega)^3 + (1 + \omega^2)^3 = -\omega^6 - \omega^3 = -1 - 1 = -2$.`, sol: 'Replace each bracket using $1 + \\omega + \\omega^2 = 0$.', scheme: [['$1 + \\omega = -\\omega^2$ and $1 + \\omega^2 = -\\omega$', 1], ['Cubes and the value $-2$', 1]], d: 3, c: 'application', t: [5], time: 90 }),
  (C_) => { const v = wadd(wpow(wadd(W1, WW), 3), wpow(wadd(W1, WW2), 3)); C_.assert(weq(v, W(-2, 0)), 'exact -2'); C_.model([2, 6, 3]); });
{
  const z1 = C(2, -5), z2 = C(4, 1), p = cmul(z1, z2);
  Q('s209', mk.short({ marks: 2, stem: r`For $z_1 = 2 - 5i$ and $z_2 = 4 + i$, verify that $\overline{z_1 z_2} = \bar z_1\,\bar z_2$.`, model: r`$z_1 z_2 = (2 - 5i)(4 + i) = 8 + 2i - 20i + 5 = 13 - 18i$, so $\overline{z_1 z_2} = 13 + 18i$. Also $\bar z_1\bar z_2 = (2 + 5i)(4 - i) = 8 - 2i + 20i + 5 = 13 + 18i$. The two are equal.`, sol: 'Compute both sides separately.', scheme: [['$\\overline{z_1 z_2} = 13 + 18i$', 1], ['$\\bar z_1\\bar z_2 = 13 + 18i$', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
    (C_) => { C_.assert(ceq(p, C(13, -18)) && ceq(cconj(p), C(13, 18)) && ceq(cmul(cconj(z1), cconj(z2)), C(13, 18)), 'both sides'); C_.model([13, 18]); });
}
{
  const z = C(5, 2), P = [cn(z), cn(cconj(z)), cn(cneg(z))];
  const area = Math.abs((P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1])) / 2;
  Q('s210', mk.short({ marks: 2, stem: r`The points $z$, $\bar z$ and $-z$ are plotted on the Argand plane for $z = 5 + 2i$. Find the area of the triangle that they form.`, model: r`The points are $(5, 2)$, $(5, -2)$ and $(-5, -2)$. The first two are $4$ apart on a vertical line and the last two are $10$ apart on a horizontal line, so the angle at $(5, -2)$ is a right angle. The area is $\dfrac{1}{2}\cdot 4\cdot 10 = 20$.`, sol: 'Place the three points; the sides are vertical and horizontal.', scheme: [['Coordinates and the two perpendicular sides $4$ and $10$', 1], ['Area $20$', 1]], d: 3, c: 'application', t: [3], time: 90 }),
    (C_) => { C_.assert(near(area, 20, 1e-12) && P[0][0] === P[1][0] && P[1][1] === P[2][1], 'area 20'); C_.model([4, 10, 20]); });
}

// =============================================================== short answer (3 marks)
{
  const a = cdiv(C(1, 3), C(1, -3)), v = cmul(a, a);
  Q('s301', mk.short({ marks: 3, stem: r`Express $\left(\dfrac{1 + 3i}{1 - 3i}\right)^2$ in the form $a + ib$.`, model: r`$\dfrac{1 + 3i}{1 - 3i} = \dfrac{(1 + 3i)^2}{1 + 9} = \dfrac{1 + 6i - 9}{10} = \dfrac{-8 + 6i}{10} = \dfrac{-4 + 3i}{5}$.

Squaring, $\left(\dfrac{-4 + 3i}{5}\right)^2 = \dfrac{16 - 24i - 9}{25} = \dfrac{7 - 24i}{25} = \dfrac{7}{25} - \dfrac{24}{25}i$.`, sol: 'Simplify the quotient first, then square.', scheme: [['Quotient $\\dfrac{-4 + 3i}{5}$', 1], ['Squaring with $i^2 = -1$', 1], ['Result $\\dfrac{7}{25} - \\dfrac{24}{25}i$', 1]], d: 3, c: 'application', t: [1], time: 120 }),
    (C_) => { C_.assert(ceq(a, C([-4, 5], [3, 5])) && ceq(v, C([7, 25], [-24, 25])), 'values'); C_.model([4, 3, 5, 7, 24, 25]); });
}
{
  const hits = []; for (let x = -12; x <= 12; x++) for (let y = -12; y <= 12; y++) if (ceq(cadd(cdiv(C(x), C(1, 1)), cdiv(C(y), C(2, -1))), C(4, -1))) hits.push([x, y]);
  Q('s302', mk.short({ marks: 3, stem: r`Find the real numbers $x$ and $y$ for which $\dfrac{x}{1 + i} + \dfrac{y}{2 - i} = 4 - i$.`, model: r`$\dfrac{x}{1 + i} = \dfrac{x(1 - i)}{2}$ and $\dfrac{y}{2 - i} = \dfrac{y(2 + i)}{5}$. The equation becomes $\left(\dfrac{x}{2} + \dfrac{2y}{5}\right) + \left(-\dfrac{x}{2} + \dfrac{y}{5}\right)i = 4 - i$.

Equating parts: $\dfrac{x}{2} + \dfrac{2y}{5} = 4$ and $-\dfrac{x}{2} + \dfrac{y}{5} = -1$. Adding gives $\dfrac{3y}{5} = 3$, so $y = 5$; then $\dfrac{x}{2} = 4 - 2 = 2$, so $x = 4$.`, sol: 'Rationalise each fraction, then equate real and imaginary parts.', scheme: [['Both fractions rationalised', 1], ['Two real equations', 1], ['$x = 4$, $y = 5$', 1]], d: 3, c: 'application', t: [1], time: 150 }),
    (C_) => { C_.assert(hits.length === 1 && hits[0].join() === '4,5', 'unique solution'); C_.model([4, 5, 2]); });
}
Q('s303', mk.short({ marks: 3, stem: r`Prove that $|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2\left(|z_1|^2 + |z_2|^2\right)$ for any complex numbers $z_1$ and $z_2$.`, model: r`Use $|w|^2 = w\bar w$. Then $|z_1 + z_2|^2 = (z_1 + z_2)(\bar z_1 + \bar z_2) = |z_1|^2 + z_1\bar z_2 + \bar z_1 z_2 + |z_2|^2$.

Similarly $|z_1 - z_2|^2 = |z_1|^2 - z_1\bar z_2 - \bar z_1 z_2 + |z_2|^2$. Adding, the cross terms cancel and the sum is $2|z_1|^2 + 2|z_2|^2$.`, sol: 'Expand each squared modulus as a product with the conjugate.', scheme: [['$|z_1 + z_2|^2$ expanded', 1], ['$|z_1 - z_2|^2$ expanded', 1], ['Cross terms cancel; result', 1]], d: 3, c: 'analysis', t: [2], time: 150 }),
  (C_) => { C_.assert(GRID.every((x) => GRID.every((y) => { const l = fadd(cmod2(cadd(x, y)), cmod2(csub(x, y))), rr = fmul(fr(2), fadd(cmod2(x), cmod2(y))); return l.n === rr.n && l.d === rr.d; })), 'identity on a grid'); C_.model(['2|z_1|^2 + 2|z_2|^2']); });
{
  const a = -3, b = fr(4, 3);
  const z = C(-3, [4, 3]);
  Q('s304', mk.short({ marks: 3, stem: r`Find the complex number $z$ that satisfies $\bar z + 4i = 2z + 3$.`, model: r`Let $z = a + ib$. Then $a - ib + 4i = 2a + 2ib + 3$.

Real parts: $a = 2a + 3$, so $a = -3$. Imaginary parts: $-b + 4 = 2b$, so $b = \dfrac{4}{3}$. Hence $z = -3 + \dfrac{4}{3}i$.`, sol: 'Write $z = a + ib$ and equate real and imaginary parts.', scheme: [['Substitution of $z = a + ib$', 1], ['$a = -3$', 1], ['$b = \\dfrac{4}{3}$ and $z$', 1]], d: 3, c: 'application', t: [2], time: 120 }),
    (C_) => { C_.assert(ceq(cadd(cconj(z), C(0, 4)), cadd(cmul(C(2), z), C(3))), 'z satisfies the equation'); C_.model([3, 4]); });
}
{
  const num = [2, 2], den = [s3, -1], q = fc.mul(num, [den[0] / 4, 1 / 4]);   // (2 + 2i)(sqrt3 + i)/4 = (2+2i)/(sqrt3 - i)
  Q('s305', mk.short({ marks: 3, stem: r`The number $z$ is defined by $z = \dfrac{2 + 2i}{\sqrt{3} - i}$. Determine $|z|$ and the principal value of $\arg z$.`, model: r`$|2 + 2i| = \sqrt{8} = 2\sqrt{2}$ and $|\sqrt{3} - i| = \sqrt{3 + 1} = 2$, so $|z| = \dfrac{2\sqrt{2}}{2} = \sqrt{2}$.

$\arg(2 + 2i) = 45^\circ$ and $\arg(\sqrt{3} - i) = -30^\circ$, so $\arg z = 45^\circ - (-30^\circ) = 75^\circ$, which lies in the principal range.`, sol: 'Use the quotient rules for the modulus and the argument.', scheme: [['Moduli of numerator and denominator', 1], ['$|z| = \\sqrt{2}$', 1], ['$\\arg z = 75^\\circ$ with the range check', 1]], d: 3, c: 'application', t: [2, 3], time: 120 }),
    (C_) => { C_.assert(near(fc.abs(q), s2, 1e-12) && near(fc.arg(q), 75, 1e-9) && near(fc.arg(num), 45) && near(fc.arg(den), -30, 1e-9), 'modulus sqrt 2, argument 75'); C_.model([2, 75, 45, 30]); });
}
{
  const z = C(-16, -30), s = csqrt(z);
  Q('s306', mk.short({ marks: 3, stem: r`Find the square roots of $-16 - 30i$.`, model: r`Let $(x + iy)^2 = -16 - 30i$. Then $x^2 - y^2 = -16$ and $2xy = -30$. The modulus is $|z| = \sqrt{256 + 900} = 34$, so $x^2 + y^2 = 34$.

Hence $x^2 = \dfrac{34 - 16}{2} = 9$ and $y^2 = \dfrac{34 + 16}{2} = 25$. Since $2xy < 0$, $x$ and $y$ have opposite signs: the roots are $\pm(3 - 5i)$.`, sol: 'Use the three equations; the sign of $2xy$ pairs the signs.', scheme: [['Equations and $|z| = 34$', 1], ['$x^2 = 9$ and $y^2 = 25$', 1], ['Roots $\\pm(3 - 5i)$ with the sign rule', 1]], d: 3, c: 'application', t: [4], time: 120 }),
    (C_) => { C_.assert(s.exact && ceq(s.roots[0], C(3, -5)) && s.m.n === 34n && ceq(cmul(C(3, -5), C(3, -5)), z), 'roots'); C_.model([34, 9, 25]); });
}
Q('s307', mk.short({ marks: 3, stem: r`Solve $x^3 = 1$ over the complex numbers. Writing $\omega = \dfrac{-1 + i\sqrt{3}}{2}$, show that $\omega^2 = \dfrac{-1 - i\sqrt{3}}{2}$.`, model: r`$x^3 - 1 = (x - 1)(x^2 + x + 1) = 0$. So $x = 1$ or $x^2 + x + 1 = 0$, which gives $x = \dfrac{-1 \pm i\sqrt{3}}{2}$.

Take $\omega = \dfrac{-1 + i\sqrt{3}}{2}$. Then $\omega^2 = \dfrac{1 - 2i\sqrt{3} - 3}{4} = \dfrac{-2 - 2i\sqrt{3}}{4} = \dfrac{-1 - i\sqrt{3}}{2}$, so the three cube roots are $1$, $\omega$, $\omega^2$.`, sol: 'Factorise $x^3 - 1$, use the quadratic formula, then square.', scheme: [['Factorisation of $x^3 - 1$', 1], ['Roots of $x^2 + x + 1 = 0$', 1], ['$\\omega^2$ computed', 1]], d: 3, c: 'understanding', t: [5], time: 120 }),
  (C_) => { C_.assert(weq(wmul(wsub(WW, W1), wsub(WW2, W1)), W(3, 0)) && weq(wadd(wadd(W1, WW), WW2), W(0, 0)) && weq(wmul(WW, WW), WW2) && weq(wmul(wadd(W1, wmul(W(2, 0), WW)), wadd(W1, wmul(W(2, 0), WW))), W(-3, 0)), 'exact'); C_.model(['\\dfrac{-1 - i\\sqrt{3}}{2}']); });
Q('s308', mk.short({ marks: 3, stem: r`Let $\omega$ be a non-real cube root of $1$. Evaluate the product $(1 - \omega)(1 - \omega^2)(1 - \omega^4)(1 - \omega^5)$.`, model: r`Since $\omega^3 = 1$, $\omega^4 = \omega$ and $\omega^5 = \omega^2$. The product is $[(1 - \omega)(1 - \omega^2)]^2$.

Now $(1 - \omega)(1 - \omega^2) = 1 - \omega - \omega^2 + \omega^3 = 1 - (\omega + \omega^2) + 1 = 1 + 1 + 1 = 3$. So the value is $3^2 = 9$.`, sol: 'Reduce the powers; pair the factors.', scheme: [['$\\omega^4 = \\omega$, $\\omega^5 = \\omega^2$', 1], ['$(1 - \\omega)(1 - \\omega^2) = 3$', 1], ['Value $9$', 1]], d: 3, c: 'application', t: [5], time: 120 }),
  (C_) => { const f = (k) => wsub(W1, wpow(WW, k)); const v = wmul(wmul(f(1), f(2)), wmul(f(4), f(5))); C_.assert(weq(v, W(9, 0)) && weq(wmul(f(1), f(2)), W(3, 0)), 'exact 9'); C_.model([3, 9]); });
Q('s309', mk.short({ marks: 3, stem: r`If $\omega$ is a complex cube root of unity, prove that $(x + y)(x + y\omega)(x + y\omega^2) = x^3 + y^3$.`, model: r`Multiply the last two factors: $(x + y\omega)(x + y\omega^2) = x^2 + xy(\omega + \omega^2) + y^2\omega^3$.

Using $\omega + \omega^2 = -1$ and $\omega^3 = 1$, this is $x^2 - xy + y^2$. Then $(x + y)(x^2 - xy + y^2) = x^3 + y^3$.`, sol: 'Multiply two factors first, then use the sum of cubes.', scheme: [['Product of the two $\\omega$ factors expanded', 1], ['$x^2 - xy + y^2$ using $\\omega + \\omega^2 = -1$', 1], ['Multiplication by $x + y$', 1]], d: 3, c: 'application', t: [5], time: 120 }),
  (C_) => { const xs = [-3, -1, 0, 2, 5]; C_.assert(xs.every((x) => xs.every((y) => weq(wmul(wmul(W(x + y, 0), wadd(W(x, 0), wmul(W(y, 0), WW))), wadd(W(x, 0), wmul(W(y, 0), WW2))), W(x ** 3 + y ** 3, 0)))), 'identity on a grid in Z[w]'); C_.model(['x^2 - xy + y^2']); });
Q('s310', mk.short({ marks: 3, stem: r`For $-\pi < \theta < \pi$, find the modulus and the principal argument of $z = 1 + \cos\theta + i\sin\theta$.`, model: r`Use $1 + \cos\theta = 2\cos^2\dfrac{\theta}{2}$ and $\sin\theta = 2\sin\dfrac{\theta}{2}\cos\dfrac{\theta}{2}$. Then $z = 2\cos\dfrac{\theta}{2}\left(\cos\dfrac{\theta}{2} + i\sin\dfrac{\theta}{2}\right)$.

For $-\pi < \theta < \pi$ we have $-\dfrac{\pi}{2} < \dfrac{\theta}{2} < \dfrac{\pi}{2}$, so $\cos\dfrac{\theta}{2} > 0$. Hence $|z| = 2\cos\dfrac{\theta}{2}$ and $\arg z = \dfrac{\theta}{2}$.`, sol: 'Half-angle forms give a polar form; check the sign of the factor.', scheme: [['Half-angle forms of $1 + \\cos\\theta$ and $\\sin\\theta$', 1], ['Polar form with factor $2\\cos\\dfrac{\\theta}{2}$', 1], ['Positivity of the factor; $|z|$ and $\\arg z$', 1]], d: 4, c: 'analysis', t: [2, 3], time: 150 }),
  (C_) => { const ths = [-3, -2.2, -1, -0.3, 0.4, 1.3, 2.5, 3.1]; C_.assert(ths.every((t) => { const z = [1 + Math.cos(t), Math.sin(t)]; return near(fc.abs(z), 2 * Math.cos(t / 2), 1e-12) && near(fc.arg(z) * Math.PI / 180, t / 2, 1e-12) && Math.cos(t / 2) > 0; }), 'modulus and argument'); C_.model(['2\\cos\\dfrac{\\theta}{2}']); });
Q('s311', mk.short({ marks: 3, stem: r`The point $z = x + iy$ moves so that $|z - 1| = |z - 5i|$. Find the equation of its path in $x$ and $y$.`, model: r`$|z - 1|^2 = (x - 1)^2 + y^2$ and $|z - 5i|^2 = x^2 + (y - 5)^2$. Setting them equal: $x^2 - 2x + 1 + y^2 = x^2 + y^2 - 10y + 25$.

Simplifying gives $x - 5y + 12 = 0$, a straight line: the perpendicular bisector of the segment joining the points $1$ and $5i$.`, sol: 'Square both moduli and compare.', scheme: [['Squared moduli in $x$ and $y$', 1], ['Equation $x - 5y + 12 = 0$', 1], ['Interpretation as a straight line', 1]], d: 3, c: 'application', t: [3], time: 120 }),
  (C_) => { const pts = [[-12, 0], [3, 3], [-2, 2], [8, 4], [-7, 1]]; C_.assert(pts.every(([x, y]) => x - 5 * y + 12 === 0 && near(Math.hypot(x - 1, y), Math.hypot(x, y - 5), 1e-12)) && !near(Math.hypot(0 - 1, 0), Math.hypot(0, 0 - 5), 1e-9) && 0 - 0 + 12 !== 0, 'points on the line are equidistant; (0, 0) is not'); C_.model([12, 5, 25]); });

// =============================================================== long answer (5 marks, in parts)
{
  const z = cdiv(C(1, 1), C(1, -1));
  let n = 1; while (!ceq(cpow(z, n), C(1))) n++;
  Q('l01', mk.long({ stem: r`Let $z = \dfrac{1 + i}{1 - i}$.

(a) Show that $z = i$. [2]

(b) Find the value of $z^{66} + z^{-45}$. [2]

(c) Find the smallest positive integer $n$ for which $z^n = 1$. [1]`, model: r`(a) Multiply the numerator and the denominator by $1 + i$: $z = \dfrac{(1 + i)^2}{1 + 1} = \dfrac{1 + 2i - 1}{2} = \dfrac{2i}{2} = i$.

(b) Since $z = i$, $z^{66} = i^{66}$ with $66 = 4(16) + 2$, so $i^{66} = -1$. Also $-45 = 4(-12) + 3$, so $z^{-45} = i^3 = -i$. The value is $-1 - i$.

(c) The powers of $i$ are $i, -1, -i, 1$, so $i^n = 1$ first when $n = 4$.`, sol: 'Rationalise to get $z = i$; reduce exponents modulo $4$.', scheme: [['(a) Multiplication by the conjugate', 1], ['(a) $z = i$', 1], ['(b) Exponents reduced modulo $4$', 1], ['(b) Value $-1 - i$', 1], ['(c) $n = 4$ with reason', 1]], d: 3, c: 'application', t: [1], time: 330 }),
    (C_) => { C_.assert(ceq(z, I) && ceq(cadd(cpow(z, 66), cpow(z, -45)), C(-1, -1)) && n === 4 && ceq(cpow(I, 66), C(-1)) && ceq(cpow(I, -45), C(0, -1)), 'values'); C_.model([66, 45, 4, 16, 12]); });
}
{
  const pts = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [20, 21, 29]];
  const cases = pts.flatMap(([a, b, c]) => [C([a, c], [b, c]), C([b, c], [-a, c])]);
  const D = (x, y) => fadd(fmul(fadd(x, fr(1)), fadd(x, fr(1))), fmul(y, y));
  Q('l02', mk.long({ stem: r`Let $z = x + iy$ with $z \ne -1$.

(a) Write $\dfrac{z - 1}{z + 1}$ in the form $u + iv$, giving $u$ and $v$ in terms of $x$ and $y$. [3]

(b) The quotient is purely imaginary and not zero. Show that $|z| = 1$. [2]`, model: r`(a) Multiply the numerator and the denominator by $\bar{(z + 1)} = (x + 1) - iy$. The numerator is $(x - 1 + iy)(x + 1 - iy) = (x^2 - 1 + y^2) + 2yi$, and the denominator is $(x + 1)^2 + y^2$.

So $u = \dfrac{x^2 + y^2 - 1}{(x + 1)^2 + y^2}$ and $v = \dfrac{2y}{(x + 1)^2 + y^2}$.

(b) Purely imaginary means $u = 0$, so $x^2 + y^2 = 1$, that is $|z| = 1$. (Non-zero means $v \ne 0$, so $y \ne 0$.)`, sol: 'Rationalise with the conjugate of the denominator; set the real part to zero.', scheme: [['(a) Multiplication by the conjugate of $z + 1$', 1], ['(a) Numerator expanded', 1], ['(a) $u$ and $v$ stated', 1], ['(b) $u = 0$', 1], ['(b) $x^2 + y^2 = 1$, so $|z| = 1$', 1]], d: 4, c: 'analysis', t: [2], time: 420 }),
    (C_) => { const ok = cases.every((z) => { const q = cdiv(csub(z, C(1)), cadd(z, C(1))); const d = D(z.re, z.im); const u = fr(0), v = fdiv2(fmul(fr(2), z.im), d); return feq(q.re, u) && feq(q.im, v) && cmod2(z).n === cmod2(z).d; }); const gen = [C(2, 3), C([1, 2], [-5, 3]), C(-4, 1), C(0, 5)].every((z) => { const q = cdiv(csub(z, C(1)), cadd(z, C(1))), d = D(z.re, z.im); return feq(q.re, fdiv2(csub(C(cmod2(z)), C(1)).re, d)) && feq(q.im, fdiv2(fmul(fr(2), z.im), d)); }); C_.assert(ok && gen, 'u, v formulae in general and u = 0 on |z| = 1'); C_.model(['2yi', 'x^2 + y^2 = 1']); });
  function fdiv2(a, b) { return fr(a.n * b.d, a.d * b.n); }
}
{
  const z = [-3 * s3, 3], w = [1, s3], zw = fc.mul(z, w);
  Q('l03', mk.long({ stem: r`Let $z = -3\sqrt{3} + 3i$ and $w = 1 + i\sqrt{3}$.

(a) Find the modulus and the principal argument of $z$, and write $z$ in polar form. [3]

(b) The modulus of $w$ is $2$ and its argument is $60^\circ$. Use the rules for products to find the modulus and principal argument of $zw$, and write $zw$ in the form $a + ib$. [2]`, model: r`(a) $|z| = \sqrt{27 + 9} = 6$. The related angle has $\tan\alpha = \dfrac{3}{3\sqrt{3}} = \dfrac{1}{\sqrt{3}}$, so $\alpha = 30^\circ$. The point is in quadrant II, so $\arg z = 180^\circ - 30^\circ = 150^\circ$ and $z = 6(\cos 150^\circ + i\sin 150^\circ)$.

(b) Moduli multiply and arguments add: $|zw| = 6 \times 2 = 12$ and $\arg(zw) = 150^\circ + 60^\circ = 210^\circ$, which is $-150^\circ$ in the principal range. So $zw = 12(\cos(-150^\circ) + i\sin(-150^\circ)) = 12\left(-\dfrac{\sqrt{3}}{2}\right) + 12\left(-\dfrac{1}{2}\right)i = -6\sqrt{3} - 6i$.`, sol: 'Related angle and quadrant for $z$; multiply moduli, add arguments for $zw$.', scheme: [['(a) $|z| = 6$', 1], ['(a) $\\arg z = 150^\\circ$', 1], ['(a) Polar form', 1], ['(b) $|zw| = 12$ and $\\arg(zw) = -150^\\circ$', 1], ['(b) $-6\\sqrt{3} - 6i$', 1]], d: 3, c: 'application', t: [2, 3], time: 400 }),
    (C_) => { C_.assert(near(fc.abs(z), 6, 1e-12) && near(fc.arg(z), 150, 1e-9) && near(fc.abs(w), 2, 1e-12) && near(fc.arg(w), 60, 1e-9) && near(fc.abs(zw), 12, 1e-9) && near(fc.arg(zw), -150, 1e-9) && near(zw[0], -6 * s3, 1e-9) && near(zw[1], -6, 1e-9) && fc.near(fc.polar(12, -150), zw, 1e-9) && near(wrapDeg(210), -150), 'values'); C_.model([6, 150, 12, 210, '-6\\sqrt{3} - 6i']); });
}
{
  const A = C(1, 2), B = C(5, 3), Cc = C(2, -2);
  const AB = csub(B, A), AC = csub(Cc, A), BC = csub(Cc, B);
  Q('l04', mk.long({ stem: r`The numbers $z_1 = 1 + 2i$, $z_2 = 5 + 3i$ and $z_3 = 2 - 2i$ are represented on the Argand plane by the points $A$, $B$ and $C$.

(a) Find the lengths $AB$, $AC$ and $BC$. [2]

(b) Show that triangle $ABC$ is right-angled and isosceles, and find its area. [2]

(c) Show that $z_3 - z_1 = -i(z_2 - z_1)$. [1]`, model: r`(a) $AB = |z_2 - z_1| = |4 + i| = \sqrt{17}$, $AC = |z_3 - z_1| = |1 - 4i| = \sqrt{17}$ and $BC = |z_3 - z_2| = |-3 - 5i| = \sqrt{34}$.

(b) $AB = AC$, so the triangle is isosceles. Also $AB^2 + AC^2 = 17 + 17 = 34 = BC^2$, so the angle at $A$ is a right angle. The area is $\dfrac{1}{2}\cdot AB\cdot AC = \dfrac{17}{2}$.

(c) $-i(z_2 - z_1) = -i(4 + i) = -4i - i^2 = 1 - 4i$, which is $z_3 - z_1$.`, sol: 'Distances are moduli of differences; test with the converse of Pythagoras.', scheme: [['(a) Differences of the numbers', 1], ['(a) $\\sqrt{17}$, $\\sqrt{17}$, $\\sqrt{34}$', 1], ['(b) Isosceles and right angle at $A$', 1], ['(b) Area $\\dfrac{17}{2}$', 1], ['(c) $-i(4 + i) = 1 - 4i$', 1]], d: 3, c: 'application', t: [3], time: 400 }),
    (C_) => { C_.assert(cmod2(AB).n === 17n && cmod2(AC).n === 17n && cmod2(BC).n === 34n && ceq(AC, cmul(C(0, -1), AB)) && ceq(AB, C(4, 1)) && ceq(AC, C(1, -4)) && ceq(BC, C(-3, -5)), 'values'); C_.model([17, 34, 4, 1]); });
}
{
  const z = C(11, -60), s = csqrt(z), nz = cneg(z);
  Q('l05', mk.long({ stem: r`(a) Find the square roots of $11 - 60i$. [3]

(b) Hence write down the square roots of $-11 + 60i$, explaining your method. [2]`, model: r`(a) Let $(x + iy)^2 = 11 - 60i$. Then $x^2 - y^2 = 11$ and $2xy = -60$. The modulus is $|z| = \sqrt{121 + 3600} = 61$, so $x^2 + y^2 = 61$.

Hence $x^2 = \dfrac{61 + 11}{2} = 36$ and $y^2 = \dfrac{61 - 11}{2} = 25$. Since $2xy < 0$, the roots are $\pm(6 - 5i)$.

(b) Since $-11 + 60i = i^2(11 - 60i)$, its square roots are $\pm i(6 - 5i)$. Now $i(6 - 5i) = 6i + 5 = 5 + 6i$, so the roots are $\pm(5 + 6i)$. Check: $(5 + 6i)^2 = 25 + 60i - 36 = -11 + 60i$.`, sol: 'Method of equating parts for (a); multiply the roots by $i$ for (b).', scheme: [['(a) Equations and $|z| = 61$', 1], ['(a) $x^2 = 36$, $y^2 = 25$', 1], ['(a) Roots $\\pm(6 - 5i)$', 1], ['(b) $-11 + 60i = i^2(11 - 60i)$', 1], ['(b) Roots $\\pm(5 + 6i)$', 1]], d: 3, c: 'application', t: [4], time: 400 }),
    (C_) => { C_.assert(s.exact && ceq(s.roots[0], C(6, -5)) && s.m.n === 61n && ceq(cmul(I, C(6, -5)), C(5, 6)) && ceq(cmul(C(5, 6), C(5, 6)), nz) && ceq(cmul(cmul(I, I), z), nz), 'roots'); C_.model([61, 36, 25, 5, 6]); });
}
{
  const e = wmul(wadd(wadd(W(3, 0), wmul(W(3, 0), WW)), wmul(W(5, 0), WW2)), wadd(wadd(W(3, 0), wmul(W(5, 0), WW)), wmul(W(3, 0), WW2)));
  Q('l06', mk.long({ stem: r`Let $\omega$ be a complex cube root of unity, so $\omega^3 = 1$ and $\omega \ne 1$.

(a) Starting from $\omega^3 - 1 = 0$, show that $1 + \omega + \omega^2 = 0$. [2]

(b) Hence simplify $(3 + 3\omega + 5\omega^2)(3 + 5\omega + 3\omega^2)$. [3]`, model: r`(a) $\omega^3 - 1 = (\omega - 1)(\omega^2 + \omega + 1) = 0$. Since $\omega \ne 1$, the factor $\omega - 1$ is not zero, so $1 + \omega + \omega^2 = 0$.

(b) $3 + 3\omega + 5\omega^2 = 3(1 + \omega + \omega^2) + 2\omega^2 = 2\omega^2$ and $3 + 5\omega + 3\omega^2 = 3(1 + \omega + \omega^2) + 2\omega = 2\omega$.

The product is $2\omega^2\cdot 2\omega = 4\omega^3 = 4$.`, sol: 'Factorise $\\omega^3 - 1$; group each bracket with $1 + \\omega + \\omega^2$.', scheme: [['(a) Factorisation of $\\omega^3 - 1$', 1], ['(a) Cancelling the non-zero factor', 1], ['(b) First bracket $2\\omega^2$', 1], ['(b) Second bracket $2\\omega$', 1], ['(b) Product $4$', 1]], d: 3, c: 'application', t: [5], time: 360 }),
    (C_) => { C_.assert(weq(wmul(wsub(WW, W1), wadd(wadd(W1, WW), WW2)), wsub(wpow(WW, 3), W1)) && weq(wadd(wadd(W(3, 0), wmul(W(3, 0), WW)), wmul(W(5, 0), WW2)), wmul(W(2, 0), WW2)) && weq(wadd(wadd(W(3, 0), wmul(W(5, 0), WW)), wmul(W(3, 0), WW2)), wmul(W(2, 0), WW)) && weq(e, W(4, 0)), 'exact 4'); C_.model([2, 4]); });
}
{
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const P1 = [1, 0], Pw = fc.polar(1, 120), Pw2 = fc.polar(1, 240);
  Q('l07', mk.long({ stem: r`(a) Write $\omega = \dfrac{-1 + i\sqrt{3}}{2}$ and $\omega^2$ in polar form. [2]

(b) The points $1$, $\omega$ and $\omega^2$ are plotted on the Argand plane. Find the three distances between them and deduce the shape of the triangle they form. [3]`, model: r`(a) $|\omega| = \sqrt{\dfrac{1}{4} + \dfrac{3}{4}} = 1$. The point $\left(-\dfrac{1}{2}, \dfrac{\sqrt{3}}{2}\right)$ is in quadrant II with related angle $60^\circ$, so $\omega = \cos 120^\circ + i\sin 120^\circ$. Also $\omega^2 = \dfrac{-1 - i\sqrt{3}}{2} = \cos 240^\circ + i\sin 240^\circ$, which has principal argument $-120^\circ$.

(b) $1 - \omega = \dfrac{3 - i\sqrt{3}}{2}$, so $|1 - \omega|^2 = \dfrac{9 + 3}{4} = 3$. Next $\omega - \omega^2 = i\sqrt{3}$, so $|\omega - \omega^2| = \sqrt{3}$. Finally $\omega^2 - 1 = \dfrac{-3 - i\sqrt{3}}{2}$, so $|\omega^2 - 1|^2 = 3$.

All three distances equal $\sqrt{3}$, so the triangle is equilateral.`, sol: 'Modulus and argument of $\\omega$; distances are moduli of differences.', scheme: [['(a) $|\\omega| = 1$ and $\\omega$ in polar form', 1], ['(a) $\\omega^2$ in polar form', 1], ['(b) $|1 - \\omega|^2 = 3$', 1], ['(b) $|\\omega - \\omega^2|$ and $|\\omega^2 - 1|$', 1], ['(b) Equilateral conclusion', 1]], d: 4, c: 'analysis', t: [5], time: 400 }),
    (C_) => { C_.assert(near(dist(P1, Pw), s3, 1e-12) && near(dist(Pw, Pw2), s3, 1e-12) && near(dist(Pw2, P1), s3, 1e-12) && near(fc.arg(Pw2), -120, 1e-9) && near(fc.abs(Pw), 1, 1e-12) && weq(wsub(WW, WW2), wmul(W(1, 0), W(1, 2))) && weq(wmul(W(1, 2), W(1, 2)), W(-3, 0)), 'equilateral with side sqrt 3'); C_.model([3, 120, 240, 60]); });
}

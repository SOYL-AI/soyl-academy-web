// CBSE 11 Mathematics ch04 Complex Numbers and Quadratic Equations — written items (short 2 and 3 marks, long 5 marks, case-based)
// with re-solve checks. Every complex number inside a model answer is built from exact BigInt-fraction arithmetic (cx.mjs).
import { Q, caseQ, child, mk } from './lib.mjs';
import { C, I, cadd, csub, cmul, cdiv, cinv, cconj, cneg, cpow, cmod, cmod2, ceq, ctex, cnum, cargDeg, fr, fnum, fc, quad, surd, near, range, argand, polarFig } from './cx.mjs';
import { r, T } from './questions.mjs';

const solveInts = (test) => { const out = []; for (const x of range(-30, 30)) for (const y of range(-30, 30)) if (test(x, y)) out.push([x, y]); return out; };
const tx = (z) => `$${ctex(z)}$`;

// =============================================================== short answer, 2 marks
{
  const sols = solveInts((x, y) => ceq(cadd(C(4 * x + 1), C(0, 2 * y - 3)), C(9, 5)));
  Q('s201', mk.short({ marks: 2, stem: r`Find the real numbers $x$ and $y$ for which $(4x + 1) + i(2y - 3)$ and $9 + 5i$ are the same complex number.`, model: r`Equal complex numbers have equal real parts and equal imaginary parts.\n\nReal parts: $4x + 1 = 9$, so $x = 2$.\n\nImaginary parts: $2y - 3 = 5$, so $y = 4$.\n\nCheck: $(4 \cdot 2 + 1) + i(2 \cdot 4 - 3) = 9 + 5i$.`, sol: 'Compare real parts, then imaginary parts.', scheme: [['x = 2 from the real parts', 1], ['y = 4 from the imaginary parts', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(sols.length === 1 && sols[0].join() === '2,4', 'x = 2, y = 4'); Cx.model([2, 4, 9, 5]); });
}
{
  const z = C(1, 2), z2 = cmul(z, z), z3 = cmul(z2, z);
  Q('s202', mk.short({ marks: 2, stem: r`Compute $(1 + 2i)^3$ and give the answer as a single complex number in the form $a + bi$.`, model: `$(1 + 2i)^2 = 1 + 4i + 4i^2 = ${ctex(z2)}$.\n\nThen $(1 + 2i)^3 = (${ctex(z2)})(1 + 2i) = -3 - 6i + 4i + 8i^2 = ${ctex(z3)}$.`, sol: 'Square first, then multiply once more; use i squared equals minus one.', scheme: [['(1 + 2i)^2 = -3 + 4i', 1], ['Final value -11 - 2i', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(ceq(z2, C(-3, 4)) && ceq(z3, C(-11, -2)), '-3 + 4i then -11 - 2i'); Cx.model(['-3 + 4i', '-11 - 2i']); });
}
{
  const z = C(-3, 2), inv = cinv(z);
  Q('s203', mk.short({ marks: 2, stem: r`Find the multiplicative inverse of $-3 + 2i$ and write it in the form $a + bi$.`, model: `The inverse is $\\dfrac{1}{-3 + 2i}$. Multiply top and bottom by the conjugate $-3 - 2i$:\n\n$\\dfrac{-3 - 2i}{(-3)^2 + 2^2} = \\dfrac{-3 - 2i}{13} = ${ctex(inv)}$.\n\nCheck: $(-3 + 2i)(-3 - 2i) = 9 + 4 = 13$.`, sol: 'Multiply by the conjugate over itself.', scheme: [['Multiplying by the conjugate; denominator 13', 1], ['Inverse written as a + bi', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(ceq(inv, C([-3, 13], [-2, 13])) && ceq(cmul(z, inv), C(1)), 'inverse (-3 - 2i)/13'); Cx.model(['13', ctex(inv)]); });
}
{
  const z = C(7, -24), p = cmul(z, cconj(z)), m = cmod(z);
  Q('s204', mk.short({ marks: 2, stem: r`For $z = 7 - 24i$, compute $z\bar z$ and $|z|^2$ separately, and show that they are equal.`, model: `$z\\bar z = (7 - 24i)(7 + 24i) = 49 - 576i^2 = 49 + 576 = ${ctex(p)}$.\n\n$|z| = \\sqrt{49 + 576} = \\sqrt{625} = ${m.tex}$, so $|z|^2 = ${m.num * m.num}$.\n\nBoth equal $625$.`, sol: 'Use (a + bi)(a - bi) = a squared plus b squared.', scheme: [['z times conjugate z = 625', 1], ['|z| = 25, |z|^2 = 625', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(ceq(p, C(625)) && m.square && m.num === 25 && cmod2(z).n === 625n, '625 and 25'); Cx.model([625, 25]); });
}
{
  const v = cadd(cmul(C(2), cpow(I, 14)), cmul(C(-3), cpow(I, -9)));
  Q('s205', mk.short({ marks: 2, stem: r`Write $2i^{14} - 3i^{-9}$ in the form $a + bi$.`, model: `$i^{14} = i^{2} = -1$, so $2i^{14} = -2$.\n\n$i^{-9} = \\dfrac{1}{i^{9}} = \\dfrac{1}{i} = \\dfrac{i}{i^2} = -i$, so $-3i^{-9} = 3i$.\n\nTherefore $2i^{14} - 3i^{-9} = ${ctex(v)}$.`, sol: 'Reduce each exponent modulo 4; treat the negative power as a reciprocal.', scheme: [['i^14 = -1', 1], ['i^(-9) = -i and total -2 + 3i', 1]], d: 3, c: 'application', t: [1], time: 105 }), (Cx) => { Cx.assert(ceq(cpow(I, 14), C(-1)) && ceq(cpow(I, -9), cneg(I)) && ceq(v, C(-2, 3)), '-2 + 3i'); Cx.model(['-2 + 3i', '-i']); });
}
{
  const place = (z) => { const a = fnum(z.re), b = fnum(z.im); return b === 0 ? (a > 0 ? 'positive real axis' : 'negative real axis') : a === 0 ? (b > 0 ? 'positive imaginary axis' : 'negative imaginary axis') : a > 0 && b > 0 ? 'first quadrant' : a < 0 && b > 0 ? 'second quadrant' : a < 0 && b < 0 ? 'third quadrant' : 'fourth quadrant'; };
  const zs = [C(-4, 1), C(6, -7), C(-3, 0), C(0, -2)];
  const where = zs.map(place);
  Q('s206', mk.short({ marks: 2, stem: r`State where each of these points of the Argand plane lies (a quadrant, or an axis): $-4 + i$, $6 - 7i$, $-3$ and $-2i$.`, model: `$-4 + i$ has a negative real part and a positive imaginary part: **${where[0]}**.\n\n$6 - 7i$ has a positive real part and a negative imaginary part: **${where[1]}**.\n\n$-3$ has imaginary part $0$: it is on the **${where[2]}**. $-2i$ has real part $0$: it is on the **${where[3]}**.`, sol: 'Signs of the real and imaginary parts decide the quadrant; a zero part means an axis.', scheme: [['The two quadrants correct', 1], ['The two axis points correct', 1]], d: 1, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(where.join('|') === 'second quadrant|fourth quadrant|negative real axis|negative imaginary axis', where.join('|')); Cx.model(['second quadrant', 'fourth quadrant', 'negative real axis', 'negative imaginary axis']); });
}
{
  const z = cmul(C(1, 1), C(3, -4)), m = cmod(z);
  Q('s207', mk.short({ marks: 2, stem: r`Let $z = (1 + i)(3 - 4i)$. Find the conjugate of $z$ and the modulus of $z$ (as an exact surd).`, model: `$z = 3 - 4i + 3i - 4i^2 = ${ctex(z)}$.\n\nConjugate: $\\bar z = ${ctex(cconj(z))}$.\n\nModulus: $|z| = \\sqrt{49 + 1} = \\sqrt{50} = ${m.tex}$. (Check: $|1 + i|\\,|3 - 4i| = \\sqrt{2} \\times 5$.)`, sol: 'Expand first, then conjugate and modulus.', scheme: [['z = 7 - i and its conjugate 7 + i', 1], ['|z| = 5 sqrt 2', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(ceq(z, C(7, -1)) && ceq(cconj(z), C(7, 1)) && m.tex === '5\\sqrt{2}' && near(m.num, cmod(C(1, 1)).num * 5), '7 - i, 7 + i, 5 sqrt 2'); Cx.model(['7 - i', '7 + i', '5\\sqrt{2}']); });
}
{
  const q = quad(1, 6, 25);
  Q('s208', mk.short({ marks: 2, stem: r`Solve $x^2 + 6x + 25 = 0$ in the complex numbers.`, model: `The discriminant is $6^2 - 4(1)(25) = ${q.D.n}$, which is negative.\n\n$x = \\dfrac{-6 \\pm \\sqrt{-64}}{2} = \\dfrac{-6 \\pm 8i}{2} = ${q.pm}$, that is $x = -3 + 4i$ or $x = -3 - 4i$.`, sol: 'Negative discriminant: square root of minus sixty-four is eight times i.', scheme: [['Discriminant -64', 1], ['Roots -3 plus or minus 4i', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(q.exact && q.D.n === -64n && ceq(q.roots[0], C(-3, 4)) && ceq(q.roots[1], C(-3, -4)), 'roots -3 +- 4i'); Cx.model([-64, '-3 + 4i', '-3 - 4i']); });
}

// =============================================================== short answer, 3 marks
{
  const n = C(3, 5), d = C(2, -3), q = cdiv(n, d);
  Q('s301', mk.short({ marks: 3, stem: r`Express $\dfrac{3 + 5i}{2 - 3i}$ in the form $a + bi$ and verify your answer by multiplying it back by the divisor.`, model: `Multiply top and bottom by the conjugate $2 + 3i$ of the denominator.\n\nNumerator: $(3 + 5i)(2 + 3i) = 6 + 9i + 10i + 15i^2 = ${ctex(cmul(n, cconj(d)))}$. Denominator: $4 + 9 = 13$.\n\nSo the quotient is $${ctex(q)}$.\n\nCheck: $\\left(${ctex(q)}\\right)(2 - 3i) = 3 + 5i$.`, sol: 'Rationalise with the conjugate, then check by multiplication.', scheme: [['Multiplying by the conjugate', 1], ['Numerator -9 + 19i over 13', 1], ['Verification', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(ceq(cmul(n, cconj(d)), C(-9, 19)) && ceq(q, C([-9, 13], [19, 13])) && ceq(cmul(q, d), n), 'quotient (-9 + 19i)/13'); Cx.model(['-9 + 19i', 13, '3 + 5i']); });
}
{
  const sols = solveInts((x, y) => ceq(cmul(C(x, y), C(2, -3)), C(8, 1)));
  Q('s302', mk.short({ marks: 3, stem: r`Find real numbers $x$ and $y$ such that $(x + iy)(2 - 3i) = 8 + i$.`, model: `Expand: $(x + iy)(2 - 3i) = 2x - 3xi + 2yi - 3yi^2 = (2x + 3y) + (2y - 3x)i$.\n\nEquate with $8 + i$: $2x + 3y = 8$ and $2y - 3x = 1$.\n\nMultiply the first by $3$ and the second by $2$ and add: $13y = 26$, so $y = 2$; then $2x = 8 - 6$ gives $x = 1$.\n\nCheck: $(1 + 2i)(2 - 3i) = 2 - 3i + 4i + 6 = 8 + i$.`, sol: 'Expand, then compare the real and imaginary parts to get two linear equations.', scheme: [['Expansion into real and imaginary parts', 1], ['The two equations', 1], ['x = 1 and y = 2', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(sols.length === 1 && sols[0].join() === '1,2', 'x = 1, y = 2'); Cx.model([1, 2, 8, 26]); });
}
{
  const zs = [C(5, -3), C(-2, 7), C([1, 2], [3, 4])];
  const ok = zs.every((z) => { const s = cadd(z, cconj(z)), d = csub(z, cconj(z)); return s.im.n === 0n && d.re.n === 0n; });
  const z = C(5, -3);
  Q('s303', mk.short({ marks: 3, stem: r`For a complex number $z = a + bi$, prove that $z + \bar z$ is always a real number and $z - \bar z$ is always purely imaginary. Illustrate with $z = 5 - 3i$.`, model: `$z + \\bar z = (a + bi) + (a - bi) = 2a$, which is real.\n\n$z - \\bar z = (a + bi) - (a - bi) = 2bi$, which has real part $0$: purely imaginary.\n\nFor $z = 5 - 3i$: $z + \\bar z = ${ctex(cadd(z, cconj(z)))}$ and $z - \\bar z = ${ctex(csub(z, cconj(z)))}$.`, sol: 'Add and subtract the two forms term by term.', scheme: [['z + conjugate = 2a', 1], ['z - conjugate = 2bi', 1], ['The illustration 10 and -6i', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (Cx) => { Cx.assert(ok && ceq(cadd(z, cconj(z)), C(10)) && ceq(csub(z, cconj(z)), C(0, -6)), 'real sum, imaginary difference'); Cx.model(['2a', '2bi', 10, '-6i']); });
}
{
  const z1 = C(3, -1), z2 = C(1, 2), p = cmul(z1, z2), q = cdiv(z1, z2);
  const m1 = cmod(z1), m2 = cmod(z2), mp = cmod(p), mq = cmod(q);
  Q('s304', mk.short({ marks: 3, stem: r`For $z_1 = 3 - i$ and $z_2 = 1 + 2i$, verify the two rules $|z_1 z_2| = |z_1|\,|z_2|$ and $\left|\dfrac{z_1}{z_2}\right| = \dfrac{|z_1|}{|z_2|}$.`, model: `$|z_1| = \\sqrt{10}$ and $|z_2| = \\sqrt{5}$.\n\n**Product:** $z_1 z_2 = 3 + 6i - i - 2i^2 = ${ctex(p)}$, so $|z_1 z_2| = \\sqrt{50} = ${mp.tex}$. Also $|z_1||z_2| = \\sqrt{10}\\sqrt{5} = \\sqrt{50}$. Equal.\n\n**Quotient:** $\\dfrac{z_1}{z_2} = \\dfrac{(3 - i)(1 - 2i)}{5} = ${ctex(q)}$, so $\\left|\\dfrac{z_1}{z_2}\\right| = \\dfrac{\\sqrt{50}}{5} = ${mq.tex}$. Also $\\dfrac{\\sqrt{10}}{\\sqrt{5}} = \\sqrt{2}$. Equal.`, sol: 'Find each modulus separately, then compare.', scheme: [['The two moduli', 1], ['Product rule verified', 1], ['Quotient rule verified', 1]], d: 3, c: 'application', t: [2], time: 165 }), (Cx) => { Cx.assert(ceq(p, C(5, 5)) && ceq(q, C([1, 5], [-7, 5])) && mp.tex === '5\\sqrt{2}' && mq.tex === '\\sqrt{2}' && near(mp.num, m1.num * m2.num) && near(mq.num, m1.num / m2.num), 'product 5 + 5i, quotient (1 - 7i)/5'); Cx.model(['5 + 5i', '5\\sqrt{2}', '\\sqrt{2}']); });
}
{
  const z1 = C(4, 1), z2 = C(1, 3), s = cadd(z1, z2);
  const m1 = cmod(z1), m2 = cmod(z2), ms = cmod(s);
  const lhs = ms.num, rhs = m1.num + m2.num;
  const fig = argand({ x: [-1, 7], y: [-1, 6], pts: [{ z: z1, label: '$z_1$', vec: true, vecLabel: 'arrow from the origin to z one' }, { z: z2, label: '$z_2$', vec: true, vecLabel: 'arrow from the origin to z two' }, { z: s, label: '$z_1 + z_2$', vec: true, vecLabel: 'arrow from the origin to the sum' }], lines: [[z1, s, 'side parallel to z two'], [z2, s, 'side parallel to z one']] }, 'Argand plane with the points z one equal to 4 plus i, z two equal to 1 plus 3 i and their sum 5 plus 4 i. The origin, z one, the sum and z two are the corners of a parallelogram; the diagonal from the origin to the sum is shorter than the two sides added.', r`The sum $z_1 + z_2$ is the fourth corner of the parallelogram on $z_1$ and $z_2$.`);
  Q('s305', mk.short({ marks: 3, stem: r`The figure shows the points $z_1 = 4 + i$, $z_2 = 1 + 3i$ and $z_1 + z_2$ on the Argand plane. Find the three moduli and show that $|z_1 + z_2| < |z_1| + |z_2|$ here.`, assets: [fig], model: `$z_1 + z_2 = ${ctex(s)}$ (the fourth corner of the parallelogram).\n\n$|z_1| = \\sqrt{16 + 1} = \\sqrt{17} \\approx ${m1.num.toFixed(3)}$, $|z_2| = \\sqrt{1 + 9} = \\sqrt{10} \\approx ${m2.num.toFixed(3)}$ and $|z_1 + z_2| = \\sqrt{25 + 16} = \\sqrt{41} \\approx ${lhs.toFixed(3)}$.\n\nThen $|z_1| + |z_2| \\approx ${rhs.toFixed(3)}$, which exceeds $${lhs.toFixed(3)}$. So $|z_1 + z_2| < |z_1| + |z_2|$: the diagonal is shorter than the two sides together.`, sol: 'Find each modulus and compare decimals.', scheme: [['z1 + z2 = 5 + 4i', 1], ['Three moduli', 1], ['The inequality shown', 1]], d: 3, c: 'application', t: [2], time: 165 }), (Cx) => { Cx.assert(ceq(s, C(5, 4)) && cmod2(z1).n === 17n && cmod2(z2).n === 10n && ms.rad === 41n, 'moduli sqrt 17, sqrt 10, sqrt 41'); Cx.assert(lhs < rhs && near(lhs, 6.403124, 1e-5) && near(rhs, 7.285, 1e-3), 'sqrt 41 < sqrt 17 + sqrt 10'); Cx.model(['5 + 4i', '6.403', '7.285']); });
}
{
  const q = quad(3, -4, 6);
  Q('s306', mk.short({ marks: 3, stem: r`Solve $3x^2 - 4x + 6 = 0$ over the complex numbers, and check that the sum of the roots is $\dfrac{4}{3}$.`, model: `The discriminant is $(-4)^2 - 4(3)(6) = 16 - 72 = ${q.D.n}$.\n\n$x = \\dfrac{4 \\pm \\sqrt{-56}}{6} = \\dfrac{4 \\pm 2i\\sqrt{14}}{6} = ${q.pm}$.\n\nThe two roots share the real part $\\dfrac{2}{3}$, so their sum is $2 \\times \\dfrac{2}{3} = \\dfrac{4}{3}$, as required.`, sol: 'sqrt of -56 is 2 sqrt 14 times i.', scheme: [['Discriminant -56', 1], ['Roots with the surd simplified', 1], ['Sum 4/3 checked', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(q.D.n === -56n && !q.exact && q.pm === '\\dfrac{2}{3} \\pm \\dfrac{\\sqrt{14}}{3}\\,i', q.pm); Cx.model([-56, 14, '\dfrac{4}{3}']); });
}
{
  const z = C(-2, 2), m = cmod(z), ang = cargDeg(z);
  Q('s308', mk.short({ marks: 3, stem: r`Write $-2 + 2i$ in polar form. State its modulus and its principal argument, and check by expanding the polar form.`, model: `Modulus: $r = \\sqrt{4 + 4} = \\sqrt{8} = ${m.tex}$.\n\nThe point $(-2, 2)$ is in the second quadrant, on the line making $45^\\circ$ with the negative real axis, so $\\theta = 180^\\circ - 45^\\circ = ${ang}^\\circ$.\n\nPolar form: $2\\sqrt{2}\\left(\\cos 135^\\circ + i\\sin 135^\\circ\\right)$. Check: $2\\sqrt{2}\\cos 135^\\circ = -2$ and $2\\sqrt{2}\\sin 135^\\circ = 2$.`, sol: 'Second quadrant: the argument is 180 degrees minus the related angle.', scheme: [['Modulus 2 sqrt 2', 1], ['Argument 135 degrees', 1], ['Polar form and check', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(m.tex === '2\\sqrt{2}' && near(ang, 135) && fc.near(fc.polar(m.num, 135), [-2, 2]), 'r = 2 sqrt 2, theta = 135'); Cx.model(['2\\sqrt{2}', 135, -2, 2]); });
}

// =============================================================== long answer, 5 marks
{
  const z1 = C(2, -3), z2 = C(-1, 4);
  const sum = cadd(z1, z2), dif = csub(z1, z2), pr = cmul(z1, z2), q = cdiv(z1, z2), sq = cmul(z1, z1);
  Q('l01', mk.long({ stem: r`Let $z_1 = 2 - 3i$ and $z_2 = -1 + 4i$. Find, in the form $a + bi$:\n\n(a) $z_1 + z_2$ and $z_1 - z_2$\n\n(b) $z_1 z_2$\n\n(c) $\dfrac{z_1}{z_2}$\n\n(d) $z_1^2$`, model: `**(a)** $z_1 + z_2 = (2 - 1) + (-3 + 4)i = ${ctex(sum)}$ and $z_1 - z_2 = (2 + 1) + (-3 - 4)i = ${ctex(dif)}$.\n\n**(b)** $z_1 z_2 = (2 - 3i)(-1 + 4i) = -2 + 8i + 3i - 12i^2 = ${ctex(pr)}$.\n\n**(c)** Multiply by the conjugate $-1 - 4i$: numerator $(2 - 3i)(-1 - 4i) = -2 - 8i + 3i + 12i^2 = -14 - 5i$; denominator $1 + 16 = 17$. So $\\dfrac{z_1}{z_2} = ${ctex(q)}$.\n\n**(d)** $z_1^2 = 4 - 12i + 9i^2 = ${ctex(sq)}$.`, sol: 'Treat i as a symbol with i squared equal to minus one; rationalise the quotient.', scheme: [['(a) sum and difference', 1], ['(b) product 10 + 11i', 1.5], ['(c) quotient (-14 - 5i)/17', 1.5], ['(d) square -5 - 12i', 1]], d: 2, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(ceq(sum, C(1, 1)) && ceq(dif, C(3, -7)) && ceq(pr, C(10, 11)) && ceq(q, C([-14, 17], [-5, 17])) && ceq(sq, C(-5, -12)), 'values'); Cx.assert(ceq(cmul(q, z2), z1), 'quotient times divisor gives dividend'); Cx.model(['1 + i', '3 - 7i', '10 + 11i', '-14 - 5i', '-5 - 12i']); });
}
{
  const sols = solveInts((a, b) => ceq(csub(cmul(C(3), C(a, b)), cmul(C(2), C(a, -b))), C(5, 10)));
  const z = C(5, 2);
  Q('l02', mk.long({ stem: r`A complex number $z$ satisfies $3z - 2\bar z = 5 + 10i$.\n\n(a) Find $z$.\n\n(b) Find $|z|$.\n\n(c) Find $\dfrac{1}{z}$ in the form $a + bi$.\n\n(d) Find $z^2$ and $\dfrac{z}{\bar z}$.`, model: `**(a)** Put $z = a + bi$. Then $3z - 2\\bar z = 3a + 3bi - 2a + 2bi = a + 5bi$. Comparing with $5 + 10i$: $a = 5$ and $5b = 10$, so $b = 2$ and $z = ${ctex(z)}$.\n\n**(b)** $|z| = \\sqrt{25 + 4} = ${cmod(z).tex}$.\n\n**(c)** $\\dfrac{1}{z} = \\dfrac{5 - 2i}{29} = ${ctex(cinv(z))}$.\n\n**(d)** $z^2 = 25 + 20i + 4i^2 = ${ctex(cmul(z, z))}$ and $\\dfrac{z}{\\bar z} = \\dfrac{(5 + 2i)^2}{29} = ${ctex(cdiv(z, cconj(z)))}$.`, sol: 'Write z as a plus bi and compare parts; then use the conjugate for the reciprocal.', scheme: [['(a) z = 5 + 2i', 1.5], ['(b) |z| = sqrt 29', 1], ['(c) reciprocal', 1], ['(d) z squared and z over conjugate', 1.5]], d: 3, c: 'application', t: [1, 2], time: 330 }), (Cx) => { Cx.assert(sols.length === 1 && sols[0].join() === '5,2', 'z = 5 + 2i'); Cx.assert(cmod(z).tex === '\\sqrt{29}' && ceq(cmul(z, cinv(z)), C(1)) && ceq(cmul(z, z), C(21, 20)) && ceq(cdiv(z, cconj(z)), C([21, 29], [20, 29])), '(b)-(d)'); Cx.model(['5 + 2i', '\\sqrt{29}', '29', '21 + 20i']); });
}
{
  const cyc = [1, 2, 3, 4].map((n) => cpow(I, n));
  const s23 = range(0, 23).reduce((acc, k) => cadd(acc, cpow(I, k)), C(0));
  const p10 = cpow(C(1, 1), 10);
  Q('l03', mk.long({ stem: r`The powers of $i$ repeat in a cycle.\n\n(a) Write the values of $i$, $i^2$, $i^3$ and $i^4$.\n\n(b) Use the cycle to evaluate $i^{83}$ and $i^{-26}$.\n\n(c) Find $1 + i + i^2 + \cdots + i^{23}$.\n\n(d) Evaluate $(1 + i)^{10}$.`, model: `**(a)** $i = i$, $i^2 = -1$, $i^3 = i^2 \\cdot i = -i$, $i^4 = (i^2)^2 = 1$. The cycle has length $4$.\n\n**(b)** $83 = 4 \\times 20 + 3$, so $i^{83} = i^3 = ${ctex(cpow(I, 83))}$. For the negative power, $i^{-26} = \\dfrac{1}{i^{26}}$ and $26 = 4 \\times 6 + 2$ gives $i^{26} = -1$, so $i^{-26} = ${ctex(cpow(I, -26))}$.\n\n**(c)** The $24$ terms form $6$ complete cycles, each with sum $1 + i - 1 - i = 0$. So the total is $${ctex(s23)}$.\n\n**(d)** $(1 + i)^2 = 2i$, so $(1 + i)^{10} = (2i)^5 = 32\\,i^5 = 32i^{4} \\cdot i = ${ctex(p10)}$.`, sol: 'Reduce every exponent modulo 4; group terms in fours.', scheme: [['(a) the four values', 1], ['(b) i^83 = -i and i^-26 = -1', 1.5], ['(c) sum is 0 with reason', 1], ['(d) (1 + i)^10 = 32i', 1.5]], d: 3, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(cyc.map(ctex).join('|') === 'i|-1|-i|1', 'cycle'); Cx.assert(ceq(cpow(I, 83), cneg(I)) && ceq(cpow(I, -26), C(-1)) && ceq(s23, C(0)) && ceq(p10, C(0, 32)), '(b)-(d)'); Cx.model(['-i', -1, 0, '32i']); });
}
{
  const z = C(-8, 6), zb = cconj(z), nz = cneg(z), fourth = cneg(zb);
  const fig = argand({ x: [-12, 12], y: [-12, 12], pts: [{ z, label: '$z$', curve: true }, { z: zb, label: r`$\bar z$`, curve: true }, { z: nz, label: '$-z$', curve: true }, { z: fourth, label: '$P$', curve: true }], fns: [{ expr: 'sqrt(100 - x^2)', domain: [-10, 10], label: 'circle, centre at the origin' }, { expr: '-sqrt(100 - x^2)', domain: [-10, 10] }] }, 'Argand plane with a circle centred at the origin through four marked points: z equal to minus 8 plus 6 i in the second quadrant, its conjugate at minus 8 minus 6 i in the third quadrant, minus z at 8 minus 6 i in the fourth quadrant, and a fourth point P at 8 plus 6 i in the first quadrant.', 'The points $z$, $\\bar z$, $-z$ and $P$ all lie on one circle about the origin.');
  const mod = cmod(z);
  Q('l04', mk.long({ stem: r`The figure shows $z = -8 + 6i$ together with $\bar z$, $-z$ and a fourth point $P$ on the Argand plane.\n\n(a) In which quadrants do $z$, $\bar z$ and $-z$ lie?\n\n(b) Find $|z|$, $|\bar z|$ and $|-z|$.\n\n(c) What do the answers to (b) say about the circle in the figure? State its centre and radius.\n\n(d) Write down the complex number $P$ in terms of $z$.`, assets: [fig], model: `**(a)** $z = -8 + 6i$: second quadrant. $\\bar z = ${ctex(zb)}$: third quadrant. $-z = ${ctex(nz)}$: fourth quadrant.\n\n**(b)** $|z| = \\sqrt{64 + 36} = \\sqrt{100} = ${mod.tex}$. $|\\bar z| = \\sqrt{64 + 36} = 10$ and $|-z| = \\sqrt{64 + 36} = 10$.\n\n**(c)** All three points are at distance $10$ from the origin, so they lie on the circle $|w| = 10$ with centre at the origin and radius $10$.\n\n**(d)** $P = 8 + 6i$ is the mirror image of $z$ in the imaginary axis: $P = -\\bar z = ${ctex(fourth)}$.`, sol: 'Signs give the quadrant; equal moduli mean the same circle about the origin.', scheme: [['(a) the three quadrants', 1], ['(b) three equal moduli 10', 1.5], ['(c) centre origin, radius 10', 1], ['(d) P = -(conjugate of z) = 8 + 6i', 1.5]], d: 3, c: 'application', t: [2], time: 330 }), (Cx) => { Cx.assert(mod.square && mod.num === 10 && cmod(zb).num === 10 && cmod(nz).num === 10 && cmod(fourth).num === 10, 'all moduli 10'); Cx.assert(ceq(fourth, C(8, 6)) && ceq(zb, C(-8, -6)) && ceq(nz, C(8, -6)), 'points'); Cx.model(['-8 - 6i', '8 - 6i', 10, '8 + 6i']); });
}
{
  const re = -Math.sqrt(3), im = 1;
  const fig = polarFig({ re, im, argDeg: 150, s: 1.7, zLabel: r`$z$`, angleLabel: r`$150^\circ$`, alt: 'Axes with the point z equal to minus root 3 plus i in the second quadrant; the segment from the origin to z has length 2 and makes an angle of 150 degrees with the positive real axis; a dashed perpendicular drops from z to the real axis.', caption: r`$z = -\sqrt{3} + i$, drawn on the Argand plane (not to scale).` });
  const mod = Math.hypot(re, im), ang = (Math.atan2(im, re) * 180) / Math.PI, back = fc.polar(2, 150);
  Q('l05', mk.long({ stem: r`The figure shows the point $z = -\sqrt{3} + i$ on the Argand plane.\n\n(a) Find $|z|$.\n\n(b) In which quadrant does $z$ lie, and what angle does $OZ$ make with the negative real axis (where $\tan\alpha = \dfrac{|\text{imaginary part}|}{|\text{real part}|}$)?\n\n(c) State the principal argument of $z$.\n\n(d) Write $z$ in polar form, and check by expanding it.`, assets: [fig], model: r`**(a)** $|z| = \sqrt{3 + 1} = 2$.\n\n**(b)** The real part is negative and the imaginary part positive: second quadrant. $\tan\alpha = \dfrac{1}{\sqrt{3}}$, so $\alpha = 30^\circ$ with the negative real axis.\n\n**(c)** The argument is measured from the positive real axis: $\theta = 180^\circ - 30^\circ = 150^\circ$.\n\n**(d)** $z = 2\left(\cos 150^\circ + i\sin 150^\circ\right)$. Check: $2\cos 150^\circ = -\sqrt{3}$ and $2\sin 150^\circ = 1$, which are the real and imaginary parts of $z$.`, sol: 'Find the related angle, then use the quadrant to get the argument.', scheme: [['(a) modulus 2', 1], ['(b) second quadrant and 30 degrees', 1], ['(c) argument 150 degrees', 1], ['(d) polar form', 1], ['(d) check by expanding', 1]], d: 3, c: 'application', t: [3], time: 330 }), (Cx) => { Cx.assert(near(mod, 2) && near(ang, 150) && fc.near(back, [re, im]), 'r = 2, theta = 150, expansion matches'); Cx.assert(near((Math.atan2(1, Math.sqrt(3)) * 180) / Math.PI, 30), 'related angle 30'); Cx.model([2, 30, 150]); });
}
{
  const q = quad(2, -6, 5);
  const sum = cadd(q.roots[0], q.roots[1]), prod = cmul(q.roots[0], q.roots[1]);
  Q('l06', mk.long({ stem: r`Consider the equation $2x^2 - 6x + 5 = 0$.\n\n(a) Find its discriminant and say what kind of roots it has.\n\n(b) Solve it for $x$.\n\n(c) Verify that the sum of the roots is $3$ and the product of the roots is $\dfrac{5}{2}$.\n\n(d) Show that the two roots are at equal distance from the origin and find that distance.`, model: `**(a)** $D = (-6)^2 - 4(2)(5) = 36 - 40 = ${q.D.n}$. It is negative, so the roots are non-real and conjugate.\n\n**(b)** $x = \\dfrac{6 \\pm \\sqrt{-4}}{4} = \\dfrac{6 \\pm 2i}{4} = ${q.pm}$, i.e. $x = ${ctex(q.roots[0])}$ or $x = ${ctex(q.roots[1])}$.\n\n**(c)** Sum $= \\left(\\dfrac{3}{2} + \\dfrac{1}{2}i\\right) + \\left(\\dfrac{3}{2} - \\dfrac{1}{2}i\\right) = ${ctex(sum)}$. Product $= \\dfrac{9}{4} - \\dfrac{1}{4}i^2 = \\dfrac{9}{4} + \\dfrac{1}{4} = ${ctex(prod)}$, that is $\\dfrac{5}{2}$.\n\n**(d)** For each root $|x|^2 = \\dfrac{9}{4} + \\dfrac{1}{4} = \\dfrac{5}{2}$, so both roots are at distance $\\sqrt{\\dfrac{5}{2}} = ${surd(fr(5, 2)).tex}$ from the origin. This is $\\sqrt{c/a}$ for the equation.`, sol: 'A conjugate pair has equal moduli; the product of the roots equals the square of that modulus.', scheme: [['(a) D = -4, non-real roots', 1], ['(b) roots (3 plus or minus i)/2', 1.5], ['(c) sum 3 and product 5/2', 1.5], ['(d) equal moduli sqrt(5/2)', 1]], d: 3, c: 'application', t: [3], time: 330 }), (Cx) => { Cx.assert(q.exact && q.D.n === -4n && ceq(q.roots[0], C([3, 2], [1, 2])) && ceq(q.roots[1], C([3, 2], [-1, 2])), 'roots (3 +- i)/2'); Cx.assert(ceq(sum, C(3)) && ceq(prod, C([5, 2])) && cmod2(q.roots[0]).n === 5n && cmod2(q.roots[0]).d === 2n && ceq(C(cmod2(q.roots[0])), C(cmod2(q.roots[1]))), 'sum, product, equal moduli'); Cx.model([-4, 3, 2.5, '\\dfrac{\\sqrt{10}}{2}']); });
}

// =============================================================== case-based
{
  const Z1 = C(8, 6), Z2 = C(2, -3), I1 = C(2, -1);
  const series = cadd(Z1, Z2), volt = cmul(I1, Z1), ratio = cdiv(Z1, Z2);
  caseQ('c01', {
    passage: r`In an imagined electronics lab, the opposition of an alternating-current circuit element is described by a complex number $Z = R + Xi$ (in ohms), where $R$ is the resistance and $X$ the reactance. (Engineers write $j$ for $i$; here we use $i$.) Two elements have impedances $Z_1 = 8 + 6i$ and $Z_2 = 2 - 3i$. When elements are joined in series their impedances add. A current $I = 2 - i$ (in amperes) flowing through $Z_1$ gives the voltage $V = I \cdot Z_1$.`,
    d: 3, c: 'application',
    model: `(a) Option (b). (b) $10$. (c) (i) $V = ${ctex(volt)}$. Or (ii) $\\dfrac{Z_1}{Z_2} = ${ctex(ratio)}$.`,
    sol: `(a) $Z_1 + Z_2 = ${ctex(series)}$. (b) $\\sqrt{64 + 36} = 10$. (c) (i) $(2 - i)(8 + 6i) = 16 + 12i - 8i - 6i^2 = ${ctex(volt)}$. (ii) $\\dfrac{(8 + 6i)(2 + 3i)}{13} = ${ctex(ratio)}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The total impedance of $Z_1$ and $Z_2$ joined in series is', opts: ['$6 + 9i$', '$10 + 3i$', '$10 - 3i$', '$16 - 18i$'], key: 'b', sol: r`Add real parts and imaginary parts: $(8 + 2) + (6 - 3)i = 10 + 3i$. Option (d) multiplies the parts instead of adding them.`, d: 2, c: 'application', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'The size of the impedance $Z_1$ is its modulus $|Z_1|$. Find it in ohms.', value: 10, unit: 'ohm', sol: r`$|Z_1| = \sqrt{8^2 + 6^2} = \sqrt{100} = 10$ ohm.`, scheme: [['10', 1]], d: 2, c: 'application', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the voltage $V = I \\cdot Z_1$ as a complex number.', model: `$V = (2 - i)(8 + 6i) = 16 + 12i - 8i - 6i^2 = 16 + 4i + 6 = ${ctex(volt)}$ volts.`, sol: 'Multiply out and use i squared equals minus one.', scheme: [['Expansion with the i^2 term', 1], ['V = 22 + 4i', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the quotient $\\dfrac{Z_1}{Z_2}$ in the form $a + bi$.', model: `$\\dfrac{8 + 6i}{2 - 3i} = \\dfrac{(8 + 6i)(2 + 3i)}{4 + 9} = \\dfrac{16 + 24i + 12i - 18}{13} = ${ctex(ratio)}$.`, sol: 'Rationalise with the conjugate of the denominator.', scheme: [['Multiplying by the conjugate', 1], ['(-2 + 36i)/13', 1]], d: 3, c: 'application', t: [1], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['6 + 9i', '10 + 3i', '10 - 3i', '16 - 18i'], ctex(series));
    Cx.child('a').assert(ceq(series, C(10, 3)), '10 + 3i');
    Cx.child('b').val(cmod(Z1).num);
    Cx.child('c').assert(ceq(volt, C(22, 4)), 'V = 22 + 4i');
    Cx.child('c').model(['22 + 4i']);
    Cx.child('cii').assert(ceq(ratio, C([-2, 13], [36, 13])) && ceq(cmul(ratio, Z2), Z1), '(-2 + 36i)/13');
    Cx.child('cii').model([13, 36]);
  });
}
{
  const p = C(3, 2), mirror = cconj(p), turned = cmul(I, p), half = cmul(I, turned), full = cpow(I, 4);
  caseQ('c02', {
    passage: r`A game (imagined) records every position on the screen as a complex number, with the real part as the horizontal and the imaginary part as the vertical coordinate, measured from the centre of the screen. A player stands at $p = 3 + 2i$. A "mirror" spell replaces the position $z$ by its conjugate $\bar z$. A "turn" spell replaces $z$ by $iz$.`,
    d: 3, c: 'application',
    model: `(a) Option (c). (b) $13$. (c) (i) $ip = ${ctex(turned)}$, second quadrant, and $|ip|^2 = 13$. Or (ii) after two turns $-p = ${ctex(half)}$; after four turns back at $p$.`,
    sol: `(a) $\\bar p = ${ctex(mirror)}$. (b) $9 + 4 = 13$. (c) (i) $i(3 + 2i) = 3i + 2i^2 = ${ctex(turned)}$. (ii) $i^2 p = -p$ and $i^4 p = p$.`,
    children: [
      child('a', mk.mcq({ stem: 'After the mirror spell the player stands at', opts: ['$-3 + 2i$', '$-3 - 2i$', '$3 - 2i$', '$2 + 3i$'], key: 'c', sol: r`The conjugate of $3 + 2i$ keeps the real part and reverses the sign of the imaginary part: $3 - 2i$. The player is reflected across the horizontal axis through the centre.`, d: 2, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the value of $|p|^2$, the square of the straight-line distance of the player from the centre.', value: 13, sol: r`$|p|^2 = 3^2 + 2^2 = 9 + 4 = 13$.`, scheme: [['13', 1]], d: 2, c: 'application', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Where does the player stand after one turn spell, in which quadrant, and what is the new value of $|z|^2$?', model: `$ip = i(3 + 2i) = 3i + 2i^2 = ${ctex(turned)}$. Its real part is negative and its imaginary part positive: second quadrant. $|ip|^2 = 4 + 9 = 13$, the same as before: a turn does not change the distance from the centre.`, sol: 'Multiply by i and compare the squared moduli.', scheme: [['ip = -2 + 3i and its quadrant', 1], ['|ip|^2 = 13', 1]], d: 3, c: 'application', t: [1, 2], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** The player casts the turn spell twice and then four times (starting from $p$ each time). Find the position after each, using powers of $i$.', model: `Twice: $i^2 p = -p = ${ctex(half)}$.\n\nFour times: $i^4 p = p = 3 + 2i$, because $i^4 = ${ctex(full)}$. The player is back where they started.`, sol: 'Use i squared and i to the fourth.', scheme: [['Two turns: -3 - 2i', 1], ['Four turns: back to 3 + 2i', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([C(-3, 2), C(-3, -2), C(3, -2), C(2, 3)].map(ctex), ctex(mirror));
    Cx.child('b').val(fnum(cmod2(p)));
    Cx.child('c').assert(ceq(turned, C(-2, 3)) && cmod2(turned).n === 13n, 'ip = -2 + 3i, modulus squared 13');
    Cx.child('c').model(['-2 + 3i', 13]);
    Cx.child('cii').assert(ceq(half, C(-3, -2)) && ceq(full, C(1)) && ceq(cmul(full, p), p), 'i^2 p = -p, i^4 p = p');
    Cx.child('cii').model(['-3 - 2i', '3 + 2i']);
  });
}
{
  const q = quad(1, 4, 29);
  const sum = cadd(q.roots[0], q.roots[1]), prod = cmul(q.roots[0], q.roots[1]);
  caseQ('c03', {
    passage: r`The motion of a toy spring (imagined) in a classroom model is described by the equation $x^2 + 4x + 29 = 0$. Its roots decide the type of motion: real roots mean no swinging, non-real roots mean the toy swings while the swing dies down.`,
    d: 3, c: 'application',
    model: `(a) Option (c). (b) $-100$. (c) (i) $x = ${q.pm}$. Or (ii) sum $= -4$, product $= 29$, and each root has modulus $\\sqrt{29}$.`,
    sol: `(a) With real coefficients and negative discriminant the roots are non-real conjugates. (b) $16 - 116 = ${q.D.n}$. (c) (i) $\\dfrac{-4 \\pm 10i}{2}$. (ii) Sum of $-2 + 5i$ and $-2 - 5i$ is $-4$; product $4 + 25 = 29$.`,
    children: [
      child('a', mk.mcq({ stem: 'The roots of the equation are', opts: ['two different real numbers', 'two equal real numbers', 'two non-real numbers that are conjugates of each other', 'one real and one non-real number'], key: 'c', sol: r`The discriminant is negative and the coefficients are real, so the roots are a non-real conjugate pair. This is the case where the toy swings.`, d: 2, c: 'understanding', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'Find the discriminant $b^2 - 4ac$ of the equation.', value: -100, sol: r`$b^2 - 4ac = 16 - 4(1)(29) = 16 - 116 = -100$.`, scheme: [['-100', 1]], d: 2, c: 'application', t: [3], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Solve the equation to find both roots.', model: `$x = \\dfrac{-4 \\pm \\sqrt{-100}}{2} = \\dfrac{-4 \\pm 10i}{2} = ${q.pm}$, that is $x = -2 + 5i$ or $x = -2 - 5i$.`, sol: 'Square root of minus one hundred is ten times i.', scheme: [['Quadratic formula with D = -100', 1], ['Roots -2 plus or minus 5i', 1]], d: 2, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Verify that the sum of the roots is $-4$ and that the product of the roots is $29$, then find the modulus of either root.', model: `Sum: $(-2 + 5i) + (-2 - 5i) = ${ctex(sum)}$. Product: $(-2 + 5i)(-2 - 5i) = 4 + 25 = ${ctex(prod)}$.\n\nModulus of $-2 + 5i$: $\\sqrt{4 + 25} = \\sqrt{29}$, the same for the conjugate root.`, sol: 'Add and multiply the two roots; take the modulus of one.', scheme: [['Sum and product', 1], ['Modulus sqrt 29', 1]], d: 4, c: 'analysis', t: [3, 2], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['real', 'equal', 'conjugate', 'mixed'], q.complex ? 'conjugate' : 'real');
    Cx.child('b').val(Number(q.D.n));
    Cx.child('c').assert(q.exact && ceq(q.roots[0], C(-2, 5)) && ceq(q.roots[1], C(-2, -5)), '-2 +- 5i');
    Cx.child('c').model(['-2 + 5i', '-2 - 5i']);
    Cx.child('cii').assert(ceq(sum, C(-4)) && ceq(prod, C(29)) && cmod2(q.roots[0]).n === 29n, 'sum -4, product 29, modulus squared 29');
    Cx.child('cii').model([-4, 29]);
  });
}
{
  const P = C(5, 12), Qz = cconj(P), R = cadd(P, Qz);
  const reflect = [([x, y]) => [x, -y], ([x, y]) => [-x, y], ([x, y]) => [-x, -y], ([x, y]) => [y, x]];
  caseQ('c04', {
    passage: r`A delivery company (imagined) draws its service area on the Argand plane, with distances in kilometres and the depot at the origin. Two relay towers stand at the points $P = 5 + 12i$ and $Q = 5 - 12i$.`,
    d: 3, c: 'application',
    model: `(a) Option (a). (b) $24$. (c) (i) $|P| = |Q| = 13$, so both towers lie on the circle of radius $13$ km about the depot. Or (ii) $P + Q = ${ctex(R)}$ and $|P + Q| = 10 < 26$.`,
    sol: r`(a) $Q = \bar P$. (b) $|P - Q| = |24i| = 24$. (c) (i) $\sqrt{25 + 144} = 13$. (ii) $P + Q = 10$ and $13 + 13 = 26$.`,
    children: [
      child('a', mk.mcq({ stem: 'Tower $Q$ is the mirror image of tower $P$ in the', opts: ['real axis', 'imaginary axis', 'origin', r`line through the origin at $45^\circ$ to the real axis`], key: 'a', sol: r`$Q = 5 - 12i$ is the conjugate of $P = 5 + 12i$: same real part, opposite imaginary part. That is reflection in the real axis.`, d: 2, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the distance between the two towers, that is $|P - Q|$, in kilometres.', value: 24, unit: 'km', sol: r`$P - Q = (5 + 12i) - (5 - 12i) = 24i$, so $|P - Q| = 24$ km.`, scheme: [['24', 1]], d: 2, c: 'application', t: [1, 2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the distance of each tower from the depot, and say what these distances show about the two towers.', model: r`$|P| = \sqrt{25 + 144} = 13$ and $|Q| = \sqrt{25 + 144} = 13$. The towers are equally far from the depot: both lie on the circle of radius $13$ km with centre at the depot.`, sol: 'Use the modulus formula; conjugates have equal moduli.', scheme: [['|P| = |Q| = 13', 1], ['Common circle about the depot', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** A beacon $R$ is placed at the point $P + Q$. Find $R$, find $|R|$, and compare $|R|$ with $|P| + |Q|$.', model: `$R = (5 + 12i) + (5 - 12i) = ${ctex(R)}$, on the real axis, so $|R| = 10$. Also $|P| + |Q| = 13 + 13 = 26$. Since $10 < 26$, $|P + Q| < |P| + |Q|$: the triangle inequality holds strictly here.`, sol: 'Add the two numbers; compare the moduli.', scheme: [['R = 10 and |R| = 10', 1], ['10 < 26 stated', 1]], d: 3, c: 'application', t: [1, 2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(reflect.map((f) => { const [x, y] = f([5, 12]); return x === 5 && y === -12; }), true);
    Cx.child('b').val(cmod(csub(P, Qz)).num);
    Cx.child('c').assert(cmod(P).num === 13 && cmod(Qz).num === 13, '|P| = |Q| = 13');
    Cx.child('c').model([13]);
    Cx.child('cii').assert(ceq(R, C(10)) && cmod(R).num === 10 && cmod(P).num + cmod(Qz).num === 26 && 10 < 26, 'R = 10, 10 < 26');
    Cx.child('cii').model([10, 26]);
  });
}

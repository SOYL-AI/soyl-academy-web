// Visuals for ISC 11 Mathematics ch05 (Complex Numbers): every table cell, figure coordinate and number quoted in an alt text is
// computed here from exact complex arithmetic (cx.mjs) or floating polar form, and asserted.
import { table, flow } from './lib.mjs';
import { C, I, fr, cadd, csub, cmul, cdiv, cinv, cconj, cneg, cpow, cmod, cmod2, ceq, ctex, cnum, cargDeg, csqrt, cscale, fnum, ftex, fc, near, range, deg, rad, tz, D, r, f2, f3, f4,
  W, W1, WW, WW2, wadd, wmul, wpow, weq, wnum, wp, plotF, argand, polarFig, unityFig } from './cx.mjs';

const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
const s3 = Math.sqrt(3);
export const V = {};

// ================================================================ deck 1: algebra, conjugate, modulus
V.route1 = flow('LR', [['a', 'Why new numbers'], ['b', 'Powers of $i$'], ['c', 'Add, subtract, multiply'], ['d', 'Inverse and division'], ['e', 'Conjugate and modulus']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: why we need new numbers, powers of i, adding, subtracting and multiplying, inverses and division, and finally the conjugate and the modulus.', 'Part 1 at a glance.');

must(-3 + 5 === 2 && 3 * (7 / 3) === 7 && Math.abs(Math.SQRT2 ** 2 - 2) < 1e-12 && ceq(cmul(I, I), C(-1)) && ceq(cmul(C(0, -1), C(0, -1)), C(-1)), 'need table');
V.need = table(['Equation', 'Smallest number system with a solution', 'Solution'], [
  [D('x + 5 = 2'), 'Integers', D('x = -3')],
  [D('3x = 7'), 'Rational numbers', D('x = \\dfrac{7}{3}')],
  [D('x^2 = 2'), 'Real numbers', D('x = \\pm\\sqrt{2}')],
  [D('x^2 = -1'), 'Complex numbers', D('x = \\pm i')],
], 'Table of four equations and the smallest number system that solves each: x plus 5 equals 2 needs the integers, with x equal minus 3; 3x equals 7 needs the rational numbers; x squared equals 2 needs the real numbers; and x squared equals minus 1 needs the complex numbers, with solutions plus or minus i.', 'Each enlargement of the numbers solves equations the last one could not.');

const defZs = [C(9, -2), C(-4, 6), C(11, 0), C(0, 7), C([1, 2], [-3, 4])];
const kind = (z) => (z.im.n === 0n ? 'real' : z.re.n === 0n ? 'purely imaginary' : 'non-real');
must(defZs.map(kind).join() === 'non-real,non-real,real,purely imaginary,non-real', 'kinds');
V.def = table(['Complex number $z$', r`$\mathrm{Re}(z)$`, r`$\mathrm{Im}(z)$`, 'Kind'], defZs.map((z) => [tz(z), D(ftex(z.re)), D(ftex(z.im)), kind(z)]), 'Table of five complex numbers with their real and imaginary parts: 9 minus 2 i has real part 9 and imaginary part minus 2; minus 4 plus 6 i has parts minus 4 and 6; 11 is real; 7 i is purely imaginary; and one half minus three quarters i has parts one half and minus three quarters.', r`$z = a + ib$: the imaginary part is the real number $b$, not $ib$.`);

const pn = [12, 25, 38, 47, -5, -10];
V.pow = table(['Exponent $n$', 'Division by $4$', '$i^n$'], pn.map((n) => { const q = Math.floor(n / 4), rem = n - 4 * q; must(ceq(cpow(I, n), cpow(I, rem)), 'power cycle'); return [`$${n}$`, `$${n} = 4(${q}) + ${rem}$`, `$${ctex(cpow(I, n))}$`]; }), 'Table of powers of i by division of the exponent by 4: i to the 12 is 1, i to the 25 is i, i to the 38 is minus 1, i to the 47 is minus i; negative exponents follow the same cycle, so i to the minus 5 is minus i and i to the minus 10 is minus 1.', r`Write $n = 4q + r$ with $0 \le r \le 3$; then $i^n = i^r$.`);
must(pn.map((n) => ctex(cpow(I, n))).join() === '1,i,-1,-i,-i,-1', 'power values');

const we1v = [cpow(I, 74), cpow(I, -37), cpow(cpow(I, 19), 2)], we1s = cadd(cadd(we1v[0], we1v[1]), we1v[2]);
must(ceq(we1v[0], C(-1)) && ceq(we1v[1], C(0, -1)) && ceq(we1v[2], C(-1)) && ceq(we1s, C(-2, -1)), 'WE1 powers');
V.we1 = table(['Term', 'Reduction', 'Value'], [
  [D('i^{74}'), D('74 = 4(18) + 2'), tz(we1v[0])],
  [D('i^{-37}'), D('-37 = 4(-10) + 3'), tz(we1v[1])],
  [D('(i^{19})^2'), D('i^{19} = i^{3} = -i') + ', then squared', tz(we1v[2])],
  ['Sum', D('-1 + (-i) + (-1)'), tz(we1s)],
], 'Worked example 1 table: i to the 74 is minus 1, i to the minus 37 is minus i, and i to the 19 squared is minus 1; the sum is minus 2 minus i.', 'Reduce each exponent, then add.');

const z1 = C(-2, 7), z2 = C(5, -3), zs = cadd(z1, z2), zd = csub(z1, z2);
must(ceq(zs, C(3, 4)) && ceq(zd, C(-7, 10)) && ceq(cneg(z1), C(2, -7)) && ceq(cadd(z1, cneg(z1)), C(0)), 'sum, difference, additive inverse');
V.add = table(['Operation', 'Working', 'Result'], [
  [D('z_1 + z_2'), D('(-2 + 5) + (7 - 3)i'), tz(zs)],
  [D('z_1 - z_2'), D('(-2 - 5) + (7 + 3)i'), tz(zd)],
  [D('-z_1') + ', the additive inverse', D('-(-2 + 7i)'), tz(cneg(z1))],
  [D('z_1 + (-z_1)'), D('(-2 + 2) + (7 - 7)i'), D('0')],
], 'Table for z one equal minus 2 plus 7 i and z two equal 5 minus 3 i: the sum is 3 plus 4 i, the difference is minus 7 plus 10 i, the additive inverse of z one is 2 minus 7 i, and a number plus its additive inverse is 0.', r`$z_1 = -2 + 7i$, $z_2 = 5 - 3i$: work part by part.`);

const mp = cmul(C(6, 1), C(2, -3));
must(ceq(mp, C(15, -16)) && 6 * 2 === 12 && 6 * -3 === -18 && 1 * 2 === 2 && 1 * -3 === -3, '(6 + i)(2 - 3i)');
V.mul = table(['Step', 'Working'], [['Expand', r`$(6 + i)(2 - 3i) = 12 - 18i + 2i - 3i^2$`], ['Replace $i^2$ by $-1$', r`$= 12 - 18i + 2i + 3$`], ['Collect', `$= ${ctex(mp)}$`]], 'Table showing the product of 6 plus i and 2 minus 3 i: expand into four terms, replace i squared by minus 1, and collect to get 15 minus 16 i.', r`Expand like brackets, then use $i^2 = -1$.`);

const sq1 = cpow(C(3, 2), 2), sq2 = cpow(C(3, -2), 2), sqd = csub(sq1, sq2);
must(ceq(sq1, C(5, 12)) && ceq(sq2, C(5, -12)) && ceq(sqd, C(0, 24)), 'WE2 squares');
V.we2 = table(['Step', 'Working', 'Result'], [
  [D('(3 + 2i)^2'), D('9 + 12i + 4i^2'), tz(sq1)],
  [D('(3 - 2i)^2'), D('9 - 12i + 4i^2'), tz(sq2)],
  ['Difference', D(`(${ctex(sq1)}) - (${ctex(sq2)})`), tz(sqd)],
], 'Worked example 2 table: three plus 2 i squared is 5 plus 12 i, three minus 2 i squared is 5 minus 12 i, and their difference is 24 i, which is purely imaginary.', 'The real parts cancel and only the imaginary part survives.');

const invZs = [C(7, 1), C(4, -9), C(-3, -2)];
V.inv = table(['$z$', r`$\bar z$`, '$|z|^2$', r`$\dfrac{1}{z} = \dfrac{\bar z}{|z|^2}$`], invZs.map((z) => { const iv = cinv(z); must(ceq(cmul(z, iv), C(1)) && ceq(iv, cscale(cconj(z), fr(cmod2(z).d, cmod2(z).n))), 'inverse'); return [tz(z), tz(cconj(z)), `$${ftex(cmod2(z))}$`, tz(iv)]; }), 'Table of three complex numbers with their conjugates, squared moduli and multiplicative inverses: for 7 plus i the squared modulus is 50 and the inverse is 7 over 50 minus 1 over 50 i; for 4 minus 9 i it is 97; for minus 3 minus 2 i it is 13.', r`The inverse is the conjugate divided by $|z|^2$.`);

const dq = cdiv(C(14, -5), C(4, 1)), dnum = cmul(C(14, -5), C(4, -1));
must(ceq(dnum, C(51, -34)) && cmod2(C(4, 1)).n === 17n && ceq(dq, C(3, -2)) && ceq(cmul(dq, C(4, 1)), C(14, -5)), 'WE3 division');
V.we3 = table(['Step', 'Working'], [['Conjugate of the divisor', r`$4 + i \to 4 - i$`], ['Numerator', `$(14 - 5i)(4 - i) = 56 - 14i - 20i + 5i^2 = ${ctex(dnum)}$`], ['Denominator', r`$(4 + i)(4 - i) = 16 + 1 = 17$`], ['Quotient', `$\\dfrac{${ctex(dnum)}}{17} = ${ctex(dq)}$`], ['Check', `$(${ctex(dq)})(4 + i) = 14 - 5i$`]], 'Table dividing 14 minus 5 i by 4 plus i: multiply top and bottom by 4 minus i, the numerator is 51 minus 34 i, the denominator is 17, the quotient is 3 minus 2 i and multiplying back gives 14 minus 5 i.', 'Division is rationalising with the conjugate.');

const eqSol = []; for (const x of range(-30, 30)) for (const y of range(-30, 30)) if (ceq(C(3 * x - y, 2 * x + 5 * y), C(11, 13))) eqSol.push([x, y]);
must(eqSol.length === 1 && eqSol[0].join() === '4,1' && 5 * 11 + 13 === 68 && 15 + 2 === 17, 'WE4 x = 4, y = 1');
V.we4 = table(['Step', 'Working'], [['Real parts equal', r`$3x - y = 11$`], ['Imaginary parts equal', r`$2x + 5y = 13$`], ['Eliminate $y$', r`$5(3x - y) + (2x + 5y) = 55 + 13$, so $17x = 68$ and $x = 4$`], ['Find $y$', r`$y = 3(4) - 11 = 1$`], ['Check', `$(12 - 1) + i(8 + 5) = ${ctex(C(11, 13))}$`]], 'Table solving the equation 3x minus y plus i times 2x plus 5y equal 11 plus 13 i: equate the real parts and the imaginary parts, eliminate y to get 17x equal 68, so x is 4 and y is 1, and check.', r`$a + ib = c + id \iff a = c$ and $b = d$.`);

const c1 = C(2, 7), c2 = C(4, -3), cs = cadd(c1, c2), cp = cmul(c1, c2), cq = cdiv(c1, c2);
must(ceq(cs, C(6, 4)) && ceq(cp, C(29, 22)) && ceq(cq, C([-13, 25], [34, 25])), 'conjugate rules values');
must(ceq(cconj(cs), cadd(cconj(c1), cconj(c2))) && ceq(cconj(cp), cmul(cconj(c1), cconj(c2))) && ceq(cconj(cq), cdiv(cconj(c1), cconj(c2))) && ceq(cconj(cp), C(29, -22)), 'conjugate rules');
V.conj = table(['Rule', 'Left side', 'Right side'], [
  [D('\\overline{z_1 + z_2} = \\bar z_1 + \\bar z_2'), D(`\\overline{${ctex(cs)}} = ${ctex(cconj(cs))}`), D(`(${ctex(cconj(c1))}) + (${ctex(cconj(c2))}) = ${ctex(cconj(cs))}`)],
  [D('\\overline{z_1 z_2} = \\bar z_1\\,\\bar z_2'), D(`\\overline{${ctex(cp)}} = ${ctex(cconj(cp))}`), D(`(${ctex(cconj(c1))})(${ctex(cconj(c2))}) = ${ctex(cconj(cp))}`)],
  [D('\\overline{\\left(\\dfrac{z_1}{z_2}\\right)} = \\dfrac{\\bar z_1}{\\bar z_2}'), D(`\\overline{${ctex(cq)}} = ${ctex(cconj(cq))}`), D(`\\dfrac{${ctex(cconj(c1))}}{${ctex(cconj(c2))}} = ${ctex(cdiv(cconj(c1), cconj(c2)))}`)],
], 'Table checking the conjugate rules for z one equal 2 plus 7 i and z two equal 4 minus 3 i: the conjugate of the sum 6 plus 4 i is 6 minus 4 i on both sides; the conjugate of the product 29 plus 22 i is 29 minus 22 i on both sides; and the conjugate of the quotient is minus 13 over 25 minus 34 over 25 i on both sides.', r`$z_1 = 2 + 7i$, $z_2 = 4 - 3i$: the conjugate passes through sums, products and quotients.`);

const m1 = C(1, 4), m2 = C(5, -2), mpz = cmul(m1, m2), mqz = cdiv(m1, m2);
must(ceq(mpz, C(13, 18)) && cmod2(mpz).n === 493n && cmod2(m1).n === 17n && cmod2(m2).n === 29n && 17n * 29n === 493n && ceq(mqz, C([-3, 29], [22, 29])) && near(Math.hypot(...cnum(mqz)), Math.sqrt(17 / 29), 1e-12) && near(Math.sqrt(493) / 29, Math.sqrt(17 / 29), 1e-12), 'modulus rules values');
V.mod = table(['Rule', 'Left side', 'Right side'], [
  [r`$|z_1 z_2| = |z_1||z_2|$`, `$|${ctex(mpz)}| = \\sqrt{493}$`, `$\\sqrt{17}\\cdot\\sqrt{29} = \\sqrt{493}$`],
  [r`$\left|\dfrac{z_1}{z_2}\right| = \dfrac{|z_1|}{|z_2|}$`, `$\\dfrac{\\sqrt{493}}{29} \\approx ${f3(Math.sqrt(493) / 29)}$`, `$\\dfrac{\\sqrt{17}}{\\sqrt{29}} \\approx ${f3(Math.sqrt(17 / 29))}$`],
  [r`$|\bar z| = |z|$`, `$|${ctex(cconj(m1))}| = \\sqrt{17}$`, `$|${ctex(m1)}| = \\sqrt{17}$`],
  [r`$z\bar z = |z|^2$`, `$(${ctex(m1)})(${ctex(cconj(m1))}) = 17$`, `$(\\sqrt{17})^2 = 17$`],
], 'Table checking four modulus rules for z one equal 1 plus 4 i and z two equal 5 minus 2 i: the product 13 plus 18 i has modulus root 493, which is root 17 times root 29; the quotient has modulus about 0.766 both ways; a number and its conjugate have modulus root 17; and z times its conjugate is 17, the modulus squared.', r`$z_1 = 1 + 4i$, $z_2 = 5 - 2i$.`);

const sqn = cpow(C(1, 4), 2), wq = cdiv(sqn, C(5, -2));
must(ceq(sqn, C(-15, 8)) && cmod2(sqn).n === 289n && ceq(wq, C([-91, 29], [10, 29])) && cmod2(C(-91, 10)).n === 8381n && 8381n === 289n * 29n && near(17 / Math.sqrt(29), Math.hypot(...cnum(wq)), 1e-12), 'WE5 modulus');
V.we5 = table(['Step', 'Working'], [['Square the numerator', r`$(1 + 4i)^2 = 1 + 8i - 16 = -15 + 8i$, with modulus $\sqrt{225 + 64} = 17$`], ['Modulus of the denominator', r`$|5 - 2i| = \sqrt{29}$`], ['Quotient rule', r`$\dfrac{17}{\sqrt{29}} = \dfrac{17\sqrt{29}}{29}$`], ['Check by dividing', r`$\dfrac{-15 + 8i}{5 - 2i} = \dfrac{-91 + 10i}{29}$ and $\sqrt{8281 + 100} = \sqrt{8381} = 17\sqrt{29}$`]], 'Table finding the modulus of 1 plus 4 i squared over 5 minus 2 i: the square is minus 15 plus 8 i with modulus 17, the denominator has modulus root 29, so the answer is 17 over root 29, and direct division gives minus 91 plus 10 i over 29 whose modulus is 17 root 29 over 29.', 'Use the rules for the modulus before expanding anything.');

V.summary1 = flow('LR', [['i', r`$i^2 = -1$; powers repeat every $4$`], ['a', 'Add, subtract, multiply like brackets'], ['d', r`Inverse $\dfrac{\bar z}{|z|^2}$; divide with the conjugate`], ['c', r`Conjugate rules; $|z| = \sqrt{a^2 + b^2}$`]], [['i', 'a'], ['a', 'd'], ['d', 'c']], 'Summary flow of Part 1: the imaginary unit squares to minus 1 and its powers repeat; complex numbers add, subtract and multiply like brackets; the inverse and division use the conjugate over the squared modulus; and the conjugate and modulus follow simple rules.', 'Part 1 in four steps.');
V.tips1 = table(['Question type', 'How marks are usually given'], [['Powers of $i$ (2)', 'exponents reduced 1, value 1'], ['Quotient in the form $a + ib$ (2-3)', 'conjugate step 1, expansion 1, answer 1'], ['Find $x$ and $y$ (3)', 'equating real and imaginary parts 1, two equations solved 2'], ['Modulus or conjugate rule (2-3)', 'rule stated 1, both sides computed 1-2']], 'Exam tips table for Part 1: powers of i earn the reduced exponents and the value; a quotient in the form a plus i b earns the conjugate step, the expansion and the answer; finding x and y earns equating the parts and solving; modulus and conjugate rules earn the rule and both sides computed.', 'Show the conjugate step; it carries the method marks.');

// ================================================================ deck 2: Argand plane, argument, polar form, roots
V.route2 = flow('LR', [['a', 'Argand plane'], ['b', 'Argument and its rules'], ['c', 'Polar form'], ['d', 'Square roots'], ['e', 'Cube roots of unity']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the Argand plane, the argument and its rules, polar form, square roots of a complex number, and the cube roots of unity.', 'Part 2 at a glance.');

const qZs = [C(5, 2), C(-4, 3), C(-2, -5), C(3, -4)];
V.plane = argand({ x: [-7, 7], y: [-7, 7], pts: qZs.map((z, k) => ({ z, label: `$${ctex(z)}$`, vec: true, vecLabel: `arrow from the origin to the point ${k + 1}` })) }, 'The Argand plane with four points, one in each quadrant: 5 plus 2 i in the first, minus 4 plus 3 i in the second, minus 2 minus 5 i in the third and 3 minus 4 i in the fourth, each joined to the origin. The real part is read along the horizontal axis and the imaginary part along the vertical axis.', r`$a + ib$ is the point $(a, b)$: real part across, imaginary part up.`);

const rz = C(5, 2), rzb = cconj(rz), rnz = cneg(rz), rnzb = cconj(rnz);
must(ceq(rzb, C(5, -2)) && ceq(rnz, C(-5, -2)) && ceq(rnzb, C(-5, 2)) && [rz, rzb, rnz, rnzb].every((z) => cmod2(z).n === 29n), 'reflections');
V.reflect = argand({ x: [-7, 7], y: [-5, 5], pts: [{ z: rz, label: '$z$' }, { z: rzb, label: r`$\bar z$` }, { z: rnz, label: '$-z$' }, { z: rnzb, label: r`$-\bar z$` }], lines: [[rz, rzb, 'right side of the rectangle'], [rzb, rnz, 'bottom side of the rectangle'], [rnz, rnzb, 'left side of the rectangle'], [rnzb, rz, 'top side of the rectangle']] }, 'The Argand plane with z equal 5 plus 2 i, its conjugate 5 minus 2 i, minus z equal minus 5 minus 2 i and minus the conjugate, minus 5 plus 2 i. The four points are the corners of a rectangle centred at the origin; the conjugate is the mirror image in the real axis and minus z is the image in the origin.', r`$\bar z$ reflects in the real axis; $-z$ reflects in the origin.`);

const p1 = C(-2, 3), p2 = C(5, 1), ps = cadd(p1, p2);
must(ceq(ps, C(3, 4)) && cmod2(ps).n === 25n && cmod2(p1).n === 13n && cmod2(p2).n === 26n && cmod2(csub(p1, p2)).n === 53n && 5 < Math.sqrt(13) + Math.sqrt(26), 'parallelogram and triangle inequality');
V.sum = argand({ x: [-4, 7], y: [-1, 6], pts: [{ z: p1, label: '$z_1$', vec: true, vecLabel: 'arrow from the origin to z one' }, { z: p2, label: '$z_2$', vec: true, vecLabel: 'arrow from the origin to z two' }, { z: ps, label: '$z_1 + z_2$', vec: true, vecLabel: 'arrow from the origin to the sum' }], lines: [[p1, ps, 'side parallel to z two'], [p2, ps, 'side parallel to z one'], [p1, p2, 'segment joining z one and z two']] }, `The Argand plane with z one equal minus 2 plus 3 i, z two equal 5 plus i and their sum 3 plus 4 i, the fourth corner of a parallelogram on the origin, z one and z two. The sum has modulus 5, which is less than root 13 plus root 26, about 8.7, and the segment joining z one to z two has length root 53.`, r`$|z_1 + z_2| = 5 < \sqrt{13} + \sqrt{26}$; the distance between the points is $|z_1 - z_2| = \sqrt{53}$.`);

const quadName = (z) => (z.im.n === 0n ? (z.re.n > 0n ? 'positive real axis' : 'negative real axis') : z.re.n === 0n ? (z.im.n > 0n ? 'positive imaginary axis' : 'negative imaginary axis') : z.re.n > 0n && z.im.n > 0n ? 'quadrant I' : z.re.n < 0n && z.im.n > 0n ? 'quadrant II' : z.re.n < 0n ? 'quadrant III' : 'quadrant IV');
const alpha = (z) => deg(Math.atan(Math.abs(fnum(z.im)) / Math.abs(fnum(z.re))));
const argRows = [C(3, 4), C(-3, 4), C(-3, -4), C(3, -4)].map((z) => { const a = cargDeg(z), al = alpha(z); const want = fnum(z.re) > 0 ? (fnum(z.im) > 0 ? al : -al) : fnum(z.im) > 0 ? 180 - al : -(180 - al); must(near(a, want, 1e-9), 'quadrant rule'); return [tz(z), quadName(z), `$${f2(al)}^\\circ$`, `$${f2(a)}^\\circ$`]; });
const axRows = [[C(8, 0), 0], [C(0, 3), 90], [C(-6, 0), 180], [C(0, -2), -90]].map(([z, a]) => { must(near(cargDeg(z), a, 1e-9), 'axis argument'); return [tz(z), quadName(z), 'not needed', `$${a}^\\circ$`]; });
V.argT = table(['$z$', 'Position', 'Related angle $\\alpha$', 'Principal argument $\\theta$'], [...argRows, ...axRows], 'Table of principal arguments: 3 plus 4 i has 53.13 degrees, minus 3 plus 4 i has 126.87 degrees, minus 3 minus 4 i has minus 126.87 degrees and 3 minus 4 i has minus 53.13 degrees, all from the related angle 53.13 degrees; the positive real axis has 0, the positive imaginary axis 90, the negative real axis 180 and the negative imaginary axis minus 90 degrees.', r`$\theta = \alpha,\ 180^\circ - \alpha,\ -(180^\circ - \alpha),\ -\alpha$ in quadrants I, II, III, IV.`);

const a1 = C(-12, -5), a2 = C(-15, 8);
must(cmod2(a1).n === 169n && cmod2(a2).n === 289n && near(cargDeg(a1), -(180 - alpha(a1)), 1e-9) && near(cargDeg(a2), 180 - alpha(a2), 1e-9) && fc.near(fc.polar(13, cargDeg(a1)), cnum(a1), 1e-9) && fc.near(fc.polar(17, cargDeg(a2)), cnum(a2), 1e-9), 'WE1 arguments');
V.we1a = table(['Quantity', `$z_1 = ${ctex(a1)}$`, `$z_2 = ${ctex(a2)}$`], [['Modulus', '$13$', '$17$'], ['Position', quadName(a1), quadName(a2)], ['Related angle', `$${f2(alpha(a1))}^\\circ$`, `$${f2(alpha(a2))}^\\circ$`], ['Principal argument', `$-180^\\circ + ${f2(alpha(a1))}^\\circ = ${f2(cargDeg(a1))}^\\circ$`, `$180^\\circ - ${f2(alpha(a2))}^\\circ = ${f2(cargDeg(a2))}^\\circ$`]], 'Worked example 1 table: minus 12 minus 5 i has modulus 13, lies in quadrant III with related angle 22.62 degrees, so its principal argument is minus 157.38 degrees; minus 15 plus 8 i has modulus 17, lies in quadrant II with related angle 28.07 degrees, so its principal argument is 151.93 degrees.', 'Find the quadrant first, then place the related angle.');

const g1 = C(1, 2), g2 = C(3, 1), gp = cmul(g1, g2), gq = cdiv(g1, g2);
must(ceq(gp, C(1, 7)) && ceq(gq, C([1, 2], [1, 2])) && near(cargDeg(gp), cargDeg(g1) + cargDeg(g2), 1e-9) && near(cargDeg(gq), cargDeg(g1) - cargDeg(g2), 1e-9) && near(cargDeg(gq), 45, 1e-9) && near(cargDeg(cconj(g1)), -cargDeg(g1), 1e-9), 'argument rules');
V.argP = table(['Left side', 'Value', 'Right side', 'Value'], [
  [D('\\arg(z_1 z_2)'), `$${f2(cargDeg(gp))}^\\circ$`, D('\\arg z_1 + \\arg z_2'), `$${f2(cargDeg(g1) + cargDeg(g2))}^\\circ$`],
  [D('\\arg\\dfrac{z_1}{z_2}'), `$${f2(cargDeg(gq))}^\\circ$`, D('\\arg z_1 - \\arg z_2'), `$${f2(cargDeg(g1) - cargDeg(g2))}^\\circ$`],
  [D('\\arg\\bar z_1'), `$${f2(cargDeg(cconj(g1)))}^\\circ$`, D('-\\arg z_1'), `$${f2(-cargDeg(g1))}^\\circ$`],
], 'Table checking the argument rules for z one equal 1 plus 2 i and z two equal 3 plus i: the product is 1 plus 7 i with argument 81.87 degrees, equal to 63.43 plus 18.43; the quotient is one half plus one half i with argument 45 degrees, equal to 63.43 minus 18.43; and the conjugate of z one has argument minus 63.43 degrees, the negative of the argument of z one.', r`$z_1 = 1 + 2i$, $z_2 = 3 + i$: arguments add under products and subtract under quotients (mod $360^\circ$).`);

must(near(Math.hypot(3 * s3, 3), 6, 1e-12) && near(deg(Math.atan2(3, 3 * s3)), 30, 1e-9) && fc.near(fc.polar(6, 30), [3 * s3, 3], 1e-12), 'polar figure');
V.polFig = polarFig({ re: 3 * s3, im: 3, s: 0.7, zLabel: r`$z$`, angleLabel: r`$30^\circ$`, alt: 'Axes with the point z equal 3 root 3 plus 3 i in the first quadrant. The segment from the origin to z has length 6 and makes an angle of 30 degrees with the positive real axis; a dashed perpendicular goes down to the real axis.', caption: r`$z = 3\sqrt{3} + 3i$: modulus $6$, argument $30^\circ$ (not to scale).` });

const wz = fc.polar(8, -150);
must(near(fc.abs([-4 * s3, -4]), 8, 1e-12) && near(fc.arg([-4 * s3, -4]), -150, 1e-9) && fc.near(wz, [-4 * s3, -4], 1e-12) && near(deg(Math.atan(4 / (4 * s3))), 30, 1e-9), 'WE2 polar');
V.we2p = table(['Step', 'Working'], [['Modulus', r`$r = \sqrt{48 + 16} = 8$`], ['Position', 'quadrant III (both parts negative)'], ['Related angle', r`$\tan\alpha = \dfrac{4}{4\sqrt{3}} = \dfrac{1}{\sqrt{3}}$, so $\alpha = 30^\circ$`], ['Argument', r`$\theta = -180^\circ + 30^\circ = -150^\circ$`], ['Polar form', r`$8\left(\cos(-150^\circ) + i\sin(-150^\circ)\right)$`], ['Check', r`$8\cos 150^\circ = -4\sqrt{3}$ and $8\sin(-150^\circ) = -4$`]], 'Table converting minus 4 root 3 minus 4 i to polar form: modulus 8, quadrant III, related angle 30 degrees, principal argument minus 150 degrees, so 8 times cosine of minus 150 degrees plus i sine of minus 150 degrees; expanding gives minus 4 root 3 and minus 4 again.', r`$z = -4\sqrt{3} - 4i$.`);

const e1 = fc.polar(8, 120), e2 = fc.polar(10, 270);
must(fc.near(e1, [-4, 4 * s3], 1e-9) && fc.near(e2, [0, -10], 1e-9), 'WE3 conversions');
V.we3p = table(['Polar form', 'Values of cosine and sine', 'Result'], [
  [D('8(\\cos 120^\\circ + i\\sin 120^\\circ)'), D('\\cos 120^\\circ = -\\dfrac{1}{2},\\ \\sin 120^\\circ = \\dfrac{\\sqrt{3}}{2}'), D('-4 + 4\\sqrt{3}\\,i')],
  [D('10(\\cos 270^\\circ + i\\sin 270^\\circ)'), D('\\cos 270^\\circ = 0,\\ \\sin 270^\\circ = -1'), D('-10i')],
], 'Worked example 3 table: 8 times cosine 120 degrees plus i sine 120 degrees is minus 4 plus 4 root 3 i, and 10 times cosine 270 degrees plus i sine 270 degrees is minus 10 i.', r`$a = r\cos\theta$ and $b = r\sin\theta$.`);

const pa = fc.polar(2, 20), pb = fc.polar(3, 70), pprod = fc.mul(pa, pb), pquo = fc.mul(pa, [Math.cos(rad(-70)) / 3, Math.sin(rad(-70)) / 3]);
must(fc.near(pprod, [0, 6], 1e-9) && near(fc.abs(pquo), 2 / 3, 1e-12) && near(fc.arg(pquo), -50, 1e-9), 'polar product and quotient');
V.polProd = table(['Step', 'Working'], [['Product: modulus', r`$2 \times 3 = 6$`], ['Product: argument', r`$20^\circ + 70^\circ = 90^\circ$`], ['Product', r`$6(\cos 90^\circ + i\sin 90^\circ) = 6i$`], ['Quotient $\\dfrac{z_1}{z_2}$', r`modulus $\dfrac{2}{3}$, argument $20^\circ - 70^\circ = -50^\circ$`], ['Check', 'multiplying the two numbers out gives $0 + 6i$']], 'Table for z one equal 2 times cosine 20 degrees plus i sine 20 degrees and z two equal 3 times cosine 70 degrees plus i sine 70 degrees: the product has modulus 6 and argument 90 degrees, so it is 6 i; the quotient has modulus two thirds and argument minus 50 degrees.', 'Multiply the moduli and add the arguments.');

V.sqrtFlow = flow('LR', [['a', r`Let $(x + iy)^2 = a + ib$`], ['b', r`Equate parts: $x^2 - y^2 = a$ and $2xy = b$`], ['c', r`Add $x^2 + y^2 = |z|$`], ['d', r`Solve for $x^2$ and $y^2$`], ['e', r`Take roots; the sign of $b$ pairs the signs`], ['f', 'Check by squaring']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow diagram of the method for square roots: let x plus i y squared equal a plus i b, equate the real and imaginary parts, add the equation x squared plus y squared equal the modulus, solve for x squared and y squared, take roots and pair the signs by the sign of b, then check by squaring.', 'Six steps from the equation to the roots.');

const sz = C(-21, -20), ss = csqrt(sz);
must(ss.exact && ss.m.n === 29n && ss.x2.n === 4n && ss.y2.n === 25n && ceq(ss.roots[0], C(2, -5)) && ceq(cmul(C(2, -5), C(2, -5)), sz) && cmod2(sz).n === 841n, 'WE4 square root');
V.we4s = table(['Step', 'Working'], [['Modulus', r`$|z| = \sqrt{441 + 400} = 29$`], ['Equations', r`$x^2 - y^2 = -21$ and $x^2 + y^2 = 29$`], ['Solve', r`$x^2 = \dfrac{29 - 21}{2} = 4$ and $y^2 = \dfrac{29 + 21}{2} = 25$`], ['Signs', r`$2xy = -20 < 0$, so $x$ and $y$ have opposite signs: $x = 2$, $y = -5$`], ['Roots', r`$\pm(2 - 5i)$`], ['Check', r`$(2 - 5i)^2 = 4 - 20i - 25 = -21 - 20i$`]], 'Worked example 4 table: the number minus 21 minus 20 i has modulus 29; x squared is 4 and y squared is 25; the product 2xy is negative so the signs are opposite; the square roots are plus or minus 2 minus 5 i, and squaring 2 minus 5 i gives minus 21 minus 20 i.', r`Square roots of $z = -21 - 20i$.`);

const rzz = C(7, 24), rr = csqrt(rzz);
must(rr.exact && ceq(rr.roots[0], C(4, 3)) && cmod2(rzz).n === 625n && near(cargDeg(C(4, 3)), cargDeg(rzz) / 2, 1e-9) && near(cargDeg(rzz), 73.7398, 1e-3), 'roots geometry');
V.roots = argand({ x: [-9, 9], y: [-6, 26], pts: [{ z: rzz, label: '$z = 7 + 24i$', vec: true, vecLabel: 'arrow from the origin to z' }, { z: C(4, 3), label: '$4 + 3i$', vec: true, vecLabel: 'arrow from the origin to the first root' }, { z: C(-4, -3), label: '$-4 - 3i$', vec: true, vecLabel: 'arrow from the origin to the second root' }] }, 'The Argand plane with z equal 7 plus 24 i, modulus 25 and argument about 73.74 degrees, and its two square roots 4 plus 3 i and minus 4 minus 3 i. The roots lie at opposite points, each at distance 5, the square root of 25, and the first root has half the argument of z, about 36.87 degrees.', 'The two roots are opposite points; each has modulus $\\sqrt{|z|}$ and half the argument.');

const wvals = [[W1, '$1$', '0'], [WW, r`$-\dfrac{1}{2} + \dfrac{\sqrt{3}}{2}i$`, '120'], [WW2, r`$-\dfrac{1}{2} - \dfrac{\sqrt{3}}{2}i$`, '-120']];
for (const [w, , a] of wvals) must(weq(wpow(w, 3), W1) && near(fc.abs(wnum(w)), 1, 1e-12) && near(fc.arg(wnum(w)), Number(a), 1e-9) && fc.near(fc.mul(fc.mul(wnum(w), wnum(w)), wnum(w)), [1, 0], 1e-12), 'cube roots table');
V.omega = table(['Number', 'Value', 'Modulus', 'Argument', 'Cube'], wvals.map(([, v, a], k) => [['$1$', r`$\omega$`, r`$\omega^2$`][k], v, '$1$', `$${a}^\\circ$`, '$1$']), 'Table of the three cube roots of unity: 1, omega equal minus one half plus root 3 over 2 times i, and omega squared equal minus one half minus root 3 over 2 times i. Each has modulus 1, the arguments are 0, 120 and minus 120 degrees, and the cube of each is 1.', r`$x^3 = 1$ has the roots $1$, $\omega$, $\omega^2$ with $\omega = \dfrac{-1 + i\sqrt{3}}{2}$.`);

V.unity = unityFig({ alt: 'The unit circle with the three cube roots of unity: 1 at angle 0 degrees, omega at 120 degrees and omega squared at 240 degrees. They are joined into a triangle with all three sides equal, so the three roots are the corners of an equilateral triangle inscribed in the circle.', caption: r`$1$, $\omega$, $\omega^2$ divide the unit circle into three equal arcs of $120^\circ$.` });
{
  const P = [[1, 0], [-0.5, s3 / 2], [-0.5, -s3 / 2]], d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  must(near(d(P[0], P[1]), s3, 1e-12) && near(d(P[1], P[2]), s3, 1e-12) && near(d(P[2], P[0]), s3, 1e-12), 'equilateral triangle');
}
const wex = [25, -14, 38], wexv = wex.map((n) => (weq(wp(n), W1) ? '1' : weq(wp(n), WW) ? r`\omega` : r`\omega^2`));
must(wexv.join() === ['\\omega', '\\omega', '\\omega^2'].join() && weq(wadd(wadd(W1, WW), WW2), W(0, 0)) && weq(wadd(W1, WW), W(1, 1)) && weq(WW2, W(-1, -1)), 'omega examples');
V.omegaP = table(['Property', 'Illustration'], [
  [D('1 + \\omega + \\omega^2 = 0'), D('1 + \\left(-\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i\\right) + \\left(-\\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}i\\right) = 0')],
  [D('\\omega^3 = 1'), D('\\omega^{3k} = 1') + ' for every integer ' + D('k')],
  [D('\\bar\\omega = \\omega^2') + ' and ' + D('\\dfrac{1}{\\omega} = \\omega^2'), D('|\\omega| = 1') + ', so ' + D('\\omega\\bar\\omega = 1')],
  [D('1 + \\omega = -\\omega^2') + ' and ' + D('1 + \\omega^2 = -\\omega'), 'from ' + D('1 + \\omega + \\omega^2 = 0')],
  [D('\\omega^n') + ' by the remainder of ' + D('n') + ' on division by ' + D('3'), D(`\\omega^{25} = ${wexv[0]}`) + ', ' + D(`\\omega^{-14} = ${wexv[1]}`) + ', ' + D(`\\omega^{38} = ${wexv[2]}`)],
], 'Table of the properties of the cube roots of unity: omega plus omega squared plus 1 is 0, omega cubed is 1, the conjugate of omega is omega squared and so is 1 over omega, 1 plus omega is minus omega squared, and powers of omega depend only on the remainder of the exponent on division by 3, for example omega to the 25 is omega.', 'Reduce every exponent modulo 3.');

const o1 = wmul(wadd(wadd(W1, wmul(W(-1, 0), WW)), WW2), wadd(wadd(W1, WW), wmul(W(-1, 0), WW2)));
must(weq(wadd(wadd(W1, wmul(W(-1, 0), WW)), WW2), wmul(W(-2, 0), WW)) && weq(wadd(wadd(W1, WW), wmul(W(-1, 0), WW2)), wmul(W(-2, 0), WW2)) && weq(o1, W(4, 0)), 'WE omega 1');
V.we1w = table(['Step', 'Working'], [['First bracket', r`$1 + \omega^2 = -\omega$, so $1 - \omega + \omega^2 = -\omega - \omega = -2\omega$`], ['Second bracket', r`$1 + \omega = -\omega^2$, so $1 + \omega - \omega^2 = -2\omega^2$`], ['Product', r`$(-2\omega)(-2\omega^2) = 4\omega^3 = 4$`]], 'Worked example 1 table for omega: the first bracket 1 minus omega plus omega squared equals minus 2 omega, the second bracket 1 plus omega minus omega squared equals minus 2 omega squared, and the product is 4 times omega cubed, which is 4.', r`Group each bracket with $1 + \omega + \omega^2 = 0$.`);

const [wa, wb, wc] = [2, 3, 5], wv = wa * wa + wb * wb + wc * wc - wa * wb - wb * wc - wc * wa;
const wlhs = wmul(wadd(wadd(W(wa, 0), wmul(W(wb, 0), WW)), wmul(W(wc, 0), WW2)), wadd(wadd(W(wa, 0), wmul(W(wb, 0), WW2)), wmul(W(wc, 0), WW)));
must(wv === 7 && weq(wlhs, W(7, 0)) && 4 + 9 + 25 - 6 - 15 - 10 === 7, 'WE omega 2');
V.we2w = table(['Step', 'Working'], [['Expand', r`$a^2 + b^2 + c^2 + (ab + bc + ca)(\omega + \omega^2)$, using $\omega^3 = 1$ and $\omega^4 = \omega$`], ['Use $\\omega + \\omega^2 = -1$', r`$a^2 + b^2 + c^2 - ab - bc - ca$`], ['Substitute $a = 2$, $b = 3$, $c = 5$', r`$4 + 9 + 25 - 6 - 15 - 10 = 7$`]], 'Worked example 2 table for omega: the product of a plus b omega plus c omega squared and a plus b omega squared plus c omega expands to a squared plus b squared plus c squared minus ab minus bc minus ca; with a equal 2, b equal 3 and c equal 5 this is 4 plus 9 plus 25 minus 6 minus 15 minus 10, which is 7.', r`$(a + b\omega + c\omega^2)(a + b\omega^2 + c\omega) = a^2 + b^2 + c^2 - ab - bc - ca$.`);

V.summary2 = flow('LR', [['a', r`Argand plane; $\bar z$ and $-z$ are reflections`], ['b', 'Argument: quadrant first; products add arguments'], ['c', r`Polar form $r(\cos\theta + i\sin\theta)$`], ['d', r`Square root: $x^2 - y^2 = a$, $2xy = b$`], ['e', r`Cube roots of unity: $1 + \omega + \omega^2 = 0$, $\omega^3 = 1$`]], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Summary flow of Part 2: the Argand plane and its reflections, the argument by quadrant with its product rule, the polar form, the square root by equating parts, and the cube roots of unity with their two key properties.', 'Part 2 in five steps.');
V.tips2 = table(['Question type', 'How marks are usually given'], [['Modulus and argument (2-3)', 'modulus 1, quadrant and related angle 1, argument 1'], ['Polar form (3)', 'modulus 1, argument 1, form written 1'], ['Square root of $a + ib$ (3)', 'equations 1, $x^2$ and $y^2$ 1, roots with signs 1'], ['Cube roots of unity (2-3)', 'reduction of powers 1, use of $1 + \\omega + \\omega^2 = 0$ 1, value 1']], 'Exam tips table for Part 2: modulus and argument earn the modulus, the quadrant with related angle, and the argument; polar form earns the modulus, the argument and the form; square roots earn the equations, the two squares and the signed roots; cube roots of unity earn the reduced powers, the sum rule and the value.', 'Always state the quadrant and the sign pairing of the roots.');

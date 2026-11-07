// Figures and tables for CBSE 9 Mathematics ch02 Introduction to Polynomials. Every value, remainder, quotient and zero shown is
// computed with exact-fraction polynomial arithmetic (pm.mjs) and asserted with must(); the single plot marks every zero of its curve.
import { table, flow, plot } from './lib.mjs';
import { r, F, P, must, deg, padd, pmul, peq, peval, pnum, pdivmod, ptex, ratRoots, fromRoots, linTex, near } from './pm.mjs';

const $ = (s) => `$${s}$`;
const nt = (p) => p.filter((c) => c.n !== 0).length;
const nameOf = (p) => ['constant', 'linear', 'quadratic', 'cubic'][deg(p)] ?? `of degree ${deg(p)}`;
const termsName = (n) => ['', 'monomial', 'binomial', 'trinomial'][n] ?? `${n} terms`;

// ---------------------------------------------------------------- deck 1
const isPoly = [[r`3x^{2} - 5x + 7`, [2, 1, 0]], [r`x^{2} + \dfrac{1}{x}`, [2, -1]], [r`\sqrt{x} + 4`, [0.5, 0]], ['9', [0]], [r`2x^{-3} + x`, [-3, 1]], [r`\dfrac{x^{3}}{4} - x`, [3, 1]]];
export const tYesNo = table(['Expression', 'Polynomial?', 'Why'], isPoly.map(([t, ex]) => { const ok = ex.every((e) => Number.isInteger(e) && e >= 0); return [$(t), ok ? 'yes' : 'no', ok ? 'all powers of $x$ are whole numbers' : 'a power of $x$ is not a whole number']; }), 'Table of six expressions: 3x squared minus 5x plus 7, the constant 9, and x cubed over 4 minus x are polynomials; x squared plus 1 over x, root x plus 4, and 2 x to the minus 3 plus x are not, because a power of x is not a whole number.', 'A polynomial in $x$ has only whole-number powers of $x$.');
must(isPoly.map(([, ex]) => ex.every((e) => Number.isInteger(e) && e >= 0)).join() === 'true,false,false,true,false,true', 'polynomial or not');

const pp = P(4, -7, 1, -9);
export const tParts = table(['Term', 'Coefficient', 'Power of $x$'], pp.map((c, i) => { const k = pp.length - 1 - i; return [$(k === 0 ? String(c.n) : ptex(P(c, ...Array(k).fill(0)))), $(String(c.n)), String(k)]; }), 'Table of the terms of 4x cubed minus 7x squared plus x minus 9: the term 4x cubed has coefficient 4 and power 3, minus 7x squared has coefficient minus 7 and power 2, x has coefficient 1 and power 1, and minus 9 is the constant term with power 0.', 'The degree is the highest power: $3$.');
must(deg(pp) === 3 && pp[2].n === 1, 'parts of 4x^3 - 7x^2 + x - 9');

export const tDeg = table(['Degree', 'Name', 'Form', 'Example'], [['$0$', 'constant', '$c \\ne 0$', '$9$'], ['$1$', 'linear', '$ax + b$, $a \\ne 0$', '$5x - 2$'], ['$2$', 'quadratic', '$ax^{2} + bx + c$, $a \\ne 0$', '$3x^{2} - x + 4$'], ['$3$', 'cubic', '$ax^{3} + bx^{2} + cx + d$, $a \\ne 0$', '$x^{3} - 8$']].map((row, i) => { must(deg(P(...[[9], [5, -2], [3, -1, 4], [1, 0, 0, -8]][i])) === i, 'degree names'); return row; }), 'Table of polynomials by degree: degree 0 is a constant such as 9; degree 1 is linear, like 5x minus 2; degree 2 is quadratic, like 3x squared minus x plus 4; degree 3 is cubic, like x cubed minus 8.', 'The degree is the highest power of $x$ with a non-zero coefficient.');

const tmEx = [[P(5, 0, 0, 0, 0), '5x^{4}'], [P(1, 0, 0, -8), 'x^{3} - 8'], [P(2, 1, -3), '2x^{2} + x - 3'], [P(1, -2, 3, -4), 'x^{3} - 2x^{2} + 3x - 4']];
export const tTerms = table(['Polynomial', 'Number of terms', 'Name', 'Degree'], tmEx.map(([p, t]) => [$(t), String(nt(p)), nt(p) <= 3 ? termsName(nt(p)) : 'polynomial with 4 terms', String(deg(p))]), 'Table of polynomials by number of terms: 5x to the 4 is a monomial of degree 4; x cubed minus 8 is a binomial of degree 3; 2x squared plus x minus 3 is a trinomial of degree 2; and x cubed minus 2x squared plus 3x minus 4 has four terms and degree 3.', 'Monomial: one term. Binomial: two terms. Trinomial: three terms.');
must(tmEx.map(([p]) => nt(p)).join() === '1,2,3,4', 'term counts');

const ex1 = [[P(6, -1), '6x - 1'], [P(7), '7'], [P(1, 4, -1, 2), 'x^{3} + 4x^{2} - x + 2'], [P(3, 0, 0), '3x^{2}'], [P(1, 0, 0, -2, 0, 0), 'x^{5} - 2x^{2}']];
export const tEx1 = table(['Polynomial', 'Degree', 'Terms', 'Description'], ex1.map(([p, t]) => [$(t), String(deg(p)), String(nt(p)), `${nameOf(p)} ${nt(p) <= 3 ? termsName(nt(p)) : 'polynomial'}`.replace('constant monomial', 'constant (monomial)')]), 'Table for worked example 1: 6x minus 1 has degree 1 and two terms; 7 has degree 0 and one term; x cubed plus 4x squared minus x plus 2 has degree 3 and four terms; 3x squared has degree 2 and one term; x to the 5 minus 2x squared has degree 5 and two terms.', 'Read off the highest power and count the terms.');
must(ex1.map(([p]) => deg(p)).join() === '1,0,3,2,5' && ex1.map(([p]) => nt(p)).join() === '2,1,4,1,2', 'worked example 1');

const pv = P(1, -4, 1, 6), pvs = [-2, -1, 0, 1, 2, 3];
must(pvs.map((a) => peval(pv, F(a)).num()).join() === '-20,0,6,4,0,0' && ratRoots(pv).map(String).join() === '-1,2,3', 'value table');
export const tVal = table(['$x$', '$p(x) = x^{3} - 4x^{2} + x + 6$', 'Is it a zero?'], pvs.map((a) => { const v = peval(pv, F(a)); return [$(String(a)), $(String(v.n)), v.n === 0 ? 'yes' : 'no']; }), 'Table of values of p of x equal to x cubed minus 4x squared plus x plus 6: p of minus 2 is minus 20, p of minus 1 is 0, p of 0 is 6, p of 1 is 4, and p of 2 and p of 3 are both 0, so minus 1, 2 and 3 are zeroes.', 'A zero is a value of $x$ where $p(x) = 0$.');

const pe2 = P(2, -3, 1, -5);
must(peval(pe2, F(2)).eq(F(1)) && peval(pe2, F(-1)).eq(F(-11)) && peval(pe2, F(0)).eq(F(-5)) && peval(pe2, F(1, 2)).eq(F(-5)), 'worked example 2');
export const tEx2 = table(['Value wanted', 'Substitute', 'Result'], [[$('p(2)'), $(r`2(8) - 3(4) + 2 - 5 = 16 - 12 + 2 - 5`), $('1')], [$('p(-1)'), $(r`2(-1) - 3(1) + (-1) - 5 = -2 - 3 - 1 - 5`), $('-11')], [$('p(0)'), $(r`0 - 0 + 0 - 5`), $('-5')], [$(r`p\left(\dfrac{1}{2}\right)`), $(r`\dfrac{2}{8} - \dfrac{3}{4} + \dfrac{1}{2} - 5`), $('-5')]], 'Table for worked example 2 with p of x equal to 2x cubed minus 3x squared plus x minus 5: p of 2 is 1, p of minus 1 is minus 11, p of 0 is minus 5 and p of one half is minus 5.', 'Replace every $x$ by the number and simplify.');

const zr = [[P(3, -12), 4], [P(5, 2), [-2, 5]], [P(7, 0), 0]];
export const tZero = table(['Polynomial', 'Solve $p(x) = 0$', 'Zero', 'Check'], [[$('3x - 12'), $('3x = 12'), $('4'), $('3(4) - 12 = 0')], [$('5x + 2'), $('5x = -2'), $(r`-\dfrac{2}{5}`), $(r`5\left(-\dfrac{2}{5}\right) + 2 = 0`)], [$('ax + b'), $('ax = -b'), $(r`-\dfrac{b}{a}`), $(r`a\left(-\dfrac{b}{a}\right) + b = 0`)]], 'Table of zeroes of linear polynomials: 3x minus 12 has zero 4; 5x plus 2 has zero minus two fifths; and ax plus b, with a not zero, has zero minus b over a.', 'A linear polynomial has exactly one zero: $-\\dfrac{b}{a}$.');
must(peval(P(3, -12), F(4)).n === 0 && peval(P(5, 2), F(-2, 5)).n === 0, 'linear zeroes'); void zr;

const qp = P(1, -2, -3);
must(ratRoots(qp).map(String).join() === '-1,3' && peval(qp, F(1)).eq(F(-4)) && peval(qp, F(0)).eq(F(-3)), 'plot polynomial');
export const fPlot = plot({ x: [-3, 5], y: [-5, 9], fns: [{ expr: 'x^2 - 2x - 3', label: '$y = x^2 - 2x - 3$' }], pts: [[-1, 0, '(−1, 0)'], [3, 0, '(3, 0)'], [0, -3, '(0, −3)']] }, 'The curve y equals x squared minus 2x minus 3 is a U-shaped curve opening upwards. It meets the x-axis at minus 1 and 3, which are the zeroes of the polynomial, and meets the y-axis at minus 3.', 'The zeroes of $p(x) = x^{2} - 2x - 3$ are $-1$ and $3$, where the curve meets the $x$-axis.');

const q3 = P(1, 2, -15);
must(ratRoots(q3).map(String).join() === '-5,3' && [...Array(31).keys()].map((k) => k - 15).filter((k) => peval(P(1, 0, -k, 6), F(2)).n === 0).join() === '7', 'worked example 3');
export const tEx3 = table(['Question', 'Working', 'Answer'], [[$(r`x^{2} + 2x - 15`), $(r`p(3) = 9 + 6 - 15 = 0,\ p(-5) = 25 - 10 - 15 = 0`), 'zeroes $3$ and $-5$'], [r`$2$ is a zero of $x^{3} - kx + 6$`, $(r`p(2) = 8 - 2k + 6 = 0`), $('k = 7')]], 'Table for worked example 3: for x squared plus 2x minus 15, p of 3 and p of minus 5 are both 0, so 3 and minus 5 are zeroes; for x cubed minus kx plus 6 to have the zero 2, 8 minus 2k plus 6 must be 0, so k is 7.', 'Substitute the number and solve for the unknown.');

const cnt = [[P(1, 0, 1), 'x^{2} + 1', 0], [P(1, 0, 0, 0), 'x^{3}', 1], [P(1, 0, -1, 0), 'x^{3} - x', 3]];
cnt.forEach(([p, , c]) => must([...Array(41).keys()].map((k) => k - 20).filter((k) => peval(p, F(k)).n === 0).length === c, 'zero counts'));
export const tCount = table(['Polynomial', 'Degree', 'Zeroes (real)'], [[$('x^{2} + 1'), '2', '0: $x^{2} + 1 \\ge 1$ for every $x$'], [$('x^{3}'), '3', '1: only $0$'], [$('x^{3} - x'), '3', '3: $-1$, $0$, $1$'], [$('x - 4'), '1', '1: $4$']], 'Table of zero counts: x squared plus 1 has degree 2 and no real zero; x cubed has degree 3 and one zero, 0; x cubed minus x has degree 3 and three zeroes, minus 1, 0 and 1; x minus 4 has degree 1 and one zero, 4.', 'A polynomial of degree $n$ has at most $n$ zeroes.');

export const sumFlow1 = flow('LR', [['a', 'Polynomial in one variable: terms and coefficients'], ['b', 'Degree: constant, linear, quadratic, cubic'], ['c', r`Value $p(a)$`], ['d', r`Zero: $p(a) = 0$`]], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow: a polynomial has terms with coefficients; its degree gives the name; p of a is its value at a; and a zero is a value of x where the polynomial is 0.', 'Part 1 at a glance.');

// ---------------------------------------------------------------- deck 2
const pd = P(1, 2, -5, 1), dd = pdivmod(pd, P(1, -2));
must(peq(dd.q, P(1, 4, 3)) && dd.r[0].eq(F(7)) && peq(padd(pmul(P(1, -2), dd.q), dd.r), pd), 'division x^3 + 2x^2 - 5x + 1 by x - 2');
export const tAnalogy = table(['', 'Whole numbers', 'Polynomials'], [['Dividend', '$17$', $(r`x^{3} + 2x^{2} - 5x + 1`)], ['Divisor', '$5$', $('x - 2')], ['Quotient', '$3$', $('x^{2} + 4x + 3')], ['Remainder', '$2$', $('7')], ['Check', '$17 = 5 \\times 3 + 2$', $(r`p(x) = (x - 2)(x^{2} + 4x + 3) + 7`)]], 'Table comparing division of numbers and polynomials: 17 divided by 5 gives quotient 3 and remainder 2; x cubed plus 2x squared minus 5x plus 1 divided by x minus 2 gives quotient x squared plus 4x plus 3 and remainder 7; in both, dividend equals divisor times quotient plus remainder.', 'Dividend $=$ divisor $\\times$ quotient $+$ remainder.');
must(17 === 5 * 3 + 2, 'whole-number analogy');

// synthetic division by x - 2
const steps = []; { let carry = F(0); pd.forEach((c, i) => { const sum = c.add(carry.mul(2)); steps.push([String(c.n), i === 0 ? '—' : String(carry.mul(2).n), String(sum.n)]); carry = sum; }); }
must(steps.map((s) => s[2]).join() === '1,4,3,7', 'synthetic division');
export const tSynth = table(['Coefficient of $p(x)$', 'Add $2 \\times$ previous result', 'Result'], steps.map(([c, m, s]) => [$(c), m === '—' ? 'bring down' : $(m), $(s)]), 'Table of synthetic division of x cubed plus 2x squared minus 5x plus 1 by x minus 2: bring down 1, then 2 plus 2 times 1 gives 4, then minus 5 plus 2 times 4 gives 3, then 1 plus 2 times 3 gives 7; so the quotient is x squared plus 4x plus 3 and the remainder is 7.', 'The last result is the remainder; the others are the quotient.');

const as = [1, -1, 2, -2, 3];
must(as.every((a) => pdivmod(pd, P(1, -a)).r[0].eq(peval(pd, F(a)))), 'remainder theorem, many divisors');
export const tRem = table(['Divisor', 'Remainder by division', '$p(a)$'], as.map((a) => { const rr = pdivmod(pd, P(1, -a)).r[0]; return [$(linTex(F(a))), $(String(rr.n)), $(`p(${a}) = ${peval(pd, F(a)).n}`)]; }), 'Table for p of x equal to x cubed plus 2x squared minus 5x plus 1: dividing by x minus 1 leaves remainder minus 1, by x plus 1 leaves 7, by x minus 2 leaves 7, by x plus 2 leaves 11, and by x minus 3 leaves 31; each equals p of a.', 'The remainder on dividing by $x - a$ is $p(a)$.');

const e1 = P(1, -5, 2, 9);
must(pdivmod(e1, P(1, -3)).r[0].eq(F(-3)) && pdivmod(e1, P(1, 2)).r[0].eq(F(-23)), 'worked example 1');
export const tEx1b = table(['Divisor', 'Zero of divisor', 'Remainder $p(a)$'], [[$('x - 3'), $('3'), $(r`27 - 45 + 6 + 9 = -3`)], [$('x + 2'), $('-2'), $(r`-8 - 20 - 4 + 9 = -23`)]], 'Table for worked example 1 with p of x equal to x cubed minus 5x squared plus 2x plus 9: dividing by x minus 3 gives remainder p of 3, which is minus 3; dividing by x plus 2 gives remainder p of minus 2, which is minus 23.', 'Put $x$ equal to the zero of the divisor.');

const pl = P(8, -6, 1, 4);
must(peval(pl, F(1, 2)).eq(F(4)) && pdivmod(pl, P(2, -1)).r[0].eq(F(4)), 'ax + b divisor');
export const tLin = table(['Divisor', 'Zero of the divisor', 'Remainder of $8x^{3} - 6x^{2} + x + 4$'], [[$('2x - 1'), $(r`\dfrac{1}{2}`), $(r`p\left(\dfrac{1}{2}\right) = 1 - \dfrac{3}{2} + \dfrac{1}{2} + 4 = 4`)], [$('x + 3'), $('-3'), $(`p(-3) = ${peval(pl, F(-3)).n}`)]], 'Table: dividing 8x cubed minus 6x squared plus x plus 4 by 2x minus 1 leaves remainder p of one half, which is 4; dividing by x plus 3 leaves p of minus 3, which is minus 269.', 'For $ax + b$, the remainder is $p\\left(-\\dfrac{b}{a}\\right)$.');
must(peval(pl, F(-3)).eq(F(-269)) && 1 - 1.5 + 0.5 + 4 === 4, 'p(-3) = -269');

const ks = [...Array(41).keys()].map((k) => k - 20).filter((k) => peval(P(1, k, -3, 5), F(2)).eq(F(15)));
must(ks.join() === '2', 'find k, remainder 15');
export const tEx2b = table(['Step', 'Working'], [['Remainder on dividing by $x - 2$', '$p(2)$'], ['Compute', $(r`p(2) = 8 + 4k - 6 + 5 = 7 + 4k`)], ['Set equal to the given remainder', $('7 + 4k = 15')], ['Solve', $('k = 2')]], 'Table for worked example 2: the remainder of x cubed plus k x squared minus 3x plus 5 on division by x minus 2 is p of 2, which is 7 plus 4k; setting this equal to 15 gives k equal to 2.', 'Use the theorem to build an equation in $k$.');

export const factFlow = flow('LR', [['a', r`$(x - a)$ divides $p(x)$ exactly`], ['b', r`Remainder $= 0$`], ['c', r`$p(a) = 0$`], ['d', r`$a$ is a zero of $p(x)$`]], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'a']], 'Flow showing four equivalent statements: x minus a divides p of x exactly, the remainder is 0, p of a is 0, and a is a zero of p of x.', 'The factor theorem: these four statements go together.');

const p7 = P(1, -7, 14, -8);
must(peval(p7, F(2)).n === 0 && peval(p7, F(-1)).eq(F(-30)) && ratRoots(p7).map(String).join() === '1,2,4', 'worked example 3 (factor test)');
export const tEx3b = table(['Test', 'Value', 'Conclusion'], [[$('x - 2'), $(r`p(2) = 8 - 28 + 28 - 8 = 0`), 'a factor'], [$('x + 1'), $(r`p(-1) = -1 - 7 - 14 - 8 = -30`), 'not a factor']], 'Table for worked example 3 with p of x equal to x cubed minus 7x squared plus 14x minus 8: p of 2 is 0, so x minus 2 is a factor; p of minus 1 is minus 30, which is not 0, so x plus 1 is not a factor.', 'Zero value: factor. Non-zero value: not a factor.');

const p4 = P(1, 2, -13, 10), cand4 = [1, -1, 2, -2, 5, -5, 10, -10];
must(ratRoots(p4).map(String).join() === '-5,1,2', 'trial roots');
export const tTrial = table(['Try $a$', '$p(a)$', 'Zero?'], cand4.map((a) => { const v = peval(p4, F(a)); return [$(String(a)), $(String(v.n)), v.n === 0 ? 'yes' : 'no']; }), 'Table of trial values of p of x equal to x cubed plus 2x squared minus 13x plus 10, for a equal to the factors of 10: p of 1 is 0, p of 2 is 0 and p of minus 5 is 0, while p of minus 1, minus 2, 5, 10 and minus 10 are not 0.', 'Try the factors of the constant term, positive and negative.');

const f4 = pmul(pmul(P(1, -1), P(1, -2)), P(1, 5)), d4 = pdivmod(p4, P(1, -1));
must(peq(f4, p4) && peq(d4.q, P(1, 3, -10)) && d4.r[0].n === 0 && peq(pmul(P(1, 5), P(1, -2)), P(1, 3, -10)), 'worked example 4');
export const tEx4 = table(['Step', 'Working'], [['Find a zero', $(r`p(1) = 1 + 2 - 13 + 10 = 0`)], ['Divide by $x - 1$', $(r`x^{3} + 2x^{2} - 13x + 10 = (x - 1)(x^{2} + 3x - 10)`)], ['Factorise the quotient', $(r`x^{2} + 3x - 10 = (x + 5)(x - 2)`)], ['Result', $(r`(x - 1)(x - 2)(x + 5)`)]], 'Table for worked example 4: p of 1 is 0, so x minus 1 is a factor; dividing gives x squared plus 3x minus 10, which factorises as x plus 5 times x minus 2; so x cubed plus 2x squared minus 13x plus 10 is x minus 1, x minus 2, x plus 5.', 'Check by multiplying the three factors back.');

const p5 = P(2, -5, -14, 8), d5 = pdivmod(p5, P(1, -4)), f5 = pmul(pmul(P(1, -4), P(2, -1)), P(1, 2));
must(peval(p5, F(4)).n === 0 && peq(d5.q, P(2, 3, -2)) && peq(f5, p5) && peq(pmul(P(2, -1), P(1, 2)), P(2, 3, -2)), 'worked example 5');
export const tEx5 = table(['Step', 'Working'], [['Find a zero', $(r`p(4) = 128 - 80 - 56 + 8 = 0`)], ['Divide by $x - 4$', $(r`2x^{3} - 5x^{2} - 14x + 8 = (x - 4)(2x^{2} + 3x - 2)`)], ['Split the middle term', $(r`2x^{2} + 4x - x - 2 = 2x(x + 2) - 1(x + 2) = (2x - 1)(x + 2)`)], ['Result', $(r`(x - 4)(2x - 1)(x + 2)`)]], 'Table for worked example 5: p of 4 is 0, so x minus 4 is a factor; dividing gives 2x squared plus 3x minus 2, which splits as 2x minus 1 times x plus 2; so the cubic is x minus 4, 2x minus 1, x plus 2.', 'A leading coefficient other than 1 gives a factor like $2x - 1$.');

const ab = [...Array(21).keys()].flatMap((a) => [...Array(21).keys()].map((b) => [a - 10, b - 10])).filter(([a, b]) => peval(P(1, a, b, -6), F(2)).n === 0 && peval(P(1, a, b, -6), F(-1)).n === 0);
const f6 = pmul(pmul(P(1, -2), P(1, 1)), P(1, 3));
must(ab.length === 1 && ab[0].join() === '2,-5' && peq(f6, P(1, 2, -5, -6)), 'worked example 6');
export const tEx6 = table(['Condition', 'Equation'], [[$(r`x - 2`) + ' is a factor', $(r`p(2) = 8 + 4a + 2b - 6 = 0,\ \text{so } 2a + b = -1`)], [$(r`x + 1`) + ' is a factor', $(r`p(-1) = -1 + a - b - 6 = 0,\ \text{so } a - b = 7`)], ['Solve', $(r`3a = 6,\ a = 2,\ b = -5`)], ['Third factor', $(r`x^{3} + 2x^{2} - 5x - 6 = (x - 2)(x + 1)(x + 3)`)]], 'Table for worked example 6: with x minus 2 and x plus 1 as factors of x cubed plus a x squared plus b x minus 6, we get 2a plus b equal to minus 1 and a minus b equal to 7, so a is 2 and b is minus 5, and the third factor is x plus 3.', 'Each factor gives one equation.');

export const sumFlow2 = flow('LR', [['a', 'Division: dividend = divisor x quotient + remainder'], ['b', r`Remainder theorem: remainder $= p(a)$`], ['c', r`Factor theorem: $p(a) = 0 \iff x - a$ is a factor`], ['d', 'Factorise a cubic: find a zero, divide, factorise the quadratic']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow: division of polynomials; the remainder theorem; the factor theorem; and factorising a cubic by finding one zero, dividing, and factorising the quadratic quotient.', 'Part 2 at a glance.');

export { near, r, pnum };

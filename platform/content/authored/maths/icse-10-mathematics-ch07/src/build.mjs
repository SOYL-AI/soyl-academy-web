// Build ICSE 10 Mathematics ch07 Factorisation of Polynomials: Remainder and Factor Theorems. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch07/src/build.mjs
// Every remainder, quotient, zero, factorisation and unknown coefficient on the slides, in the notes and in the
// tables is computed by poly.mjs with exact fractions (remainders by evaluation and by long division, which must
// agree; factorisations expanded back), every typed working line is checked by work.mjs, and every plot marks
// all the zeros of its curves (checked numerically by lib.mjs).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { P, F, lin, factorise, evalLine, btex, zeroOf, rationalZeros, solveUnknowns, disc } from './poly.mjs';
import { steps, xctx, kctx, xkctx, zctx, IDX, ARITH } from './work.mjs';

setUnit('icse-10-mathematics-ch07');
const { rem, isFactor, factorWork, divLines } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const d = (s) => `$${s}$`;
const S = (ctx, lines, msg) => steps(ctx, lines).must(msg);
const neg = (t) => (t.startsWith('-') ? `−${t.slice(1)}` : t);
const lbl = (x, y) => `(${neg(String(x))}, ${neg(String(y))})`;
const tplLine = (names, tpl, tex, msg) => S({ ...xkctx(names, tpl) }, [`f(x) = ${tex}`], msg);

// ---------------------------------------------------------------- worked examples and figures (asserted)
// Deck 1 title: x^3 - 3x^2 - 6x + 8 = (x + 2)(x - 1)(x - 4); remainder on division by (x - 3) is f(3) = -10
const fT = P(1, -3, -6, 8), zT = rationalZeros(fT), rT = rem(fT, lin(1, -3));
must(zT.map(String).join() === '-2,1,4' && rT.value.eq(-10), 'title cubic');
const pTitle = plot({ x: [-3, 5], y: [-30, 30], fns: [{ expr: fT.tex(), label: `$y = ${fT.tex()}$` }], pts: [...zT.map((z) => [z.num(), 0, lbl(z, 0)]), [3, -10, lbl(3, -10)]] }, 'Graph of y equals x cubed minus 3 x squared minus 6 x plus 8, crossing the x-axis at minus 2, 1 and 4; the marked point at x equals 3 has height minus 10, the remainder when the polynomial is divided by x minus 3.', 'The remainder on division by $(x - 3)$ is the height of the graph at $x = 3$: $f(3) = -10$.');

// division by a linear expression: (2x^3 - 3x^2 + 4x - 5) by (x - 2)
const fD = P(2, -3, 4, -5), dD = lin(1, -2), divD = divLines(fD, dD);
divD.w.must('division table');
must(divD.q.tex() === '2x^2 + x + 6' && divD.r.co(0).eq(7), 'division D');
const leadTex = (p) => P(p.lead, ...Array(p.deg).fill(0)).tex();
const divTable = (dv, st, alt, caption) => table(['Step', 'Divide the leading terms', 'Multiply back', 'Subtract to get'], st.map((s, i) => [String(i + 1), d(`\\dfrac{${leadTex(s.dividend)}}{${leadTex(dv)}} = ${s.term.tex()}`), d(`${s.term.tex() === '1' ? '' : s.term.tex()}${btex(dv)} = ${s.prod.tex()}`), d(s.rem.tex())]), alt, caption);
const tDiv = divTable(dD, divD.st, 'Table of the long division of 2 x cubed minus 3 x squared plus 4 x minus 5 by x minus 2 in three steps: quotient terms 2 x squared, then x, then 6; after the last subtraction the remainder is 7.', 'Quotient $2x^2 + x + 6$, remainder $7$: $2x^3 - 3x^2 + 4x - 5 = (x - 2)(2x^2 + x + 6) + 7$.');
S(xctx(fD, { refs: [fD] }), [r`2x^3 - 3x^2 + 4x - 5 = (x - 2)(2x^2 + x + 6) + 7`], 'division identity');
const remRows = [lin(1, -2), lin(1, -1), lin(1, 1), lin(1, 3)].map((dv) => { const x = rem(fD, dv); return [d(btex(dv)), d(fD.divBy(dv).r.tex()), d(`f(${x.z.tex()}) = ${x.value.tex()}`)]; });
must(remRows.map((row) => row[1]).join() === '$7$,$-2$,$-14$,$-98$', 'remainder table');
S(xctx(fD), remRows.map((row) => row[2].slice(1, -1)), 'remainder table values');
const tRem = table(['Divisor', 'Remainder by long division', 'Value of $f(x)$ at the zero of the divisor'], remRows, 'Table for f of x equals 2 x cubed minus 3 x squared plus 4 x minus 5: dividing by x minus 2, x minus 1, x plus 1 and x plus 3 leaves remainders 7, minus 2, minus 14 and minus 98, exactly the values f of 2, f of 1, f of minus 1 and f of minus 3.', 'Long division and substitution give the same remainder every time.');

// Example 1: x^3 + 4x^2 - 3x + 5 by (x + 3)
const f1 = P(1, 4, -3, 5), r1 = rem(f1, lin(1, 3));
const w1 = S(xctx(f1, { refs: [f1] }), [r1.ev.tex, `${f1.tex()} = (x + 3)(${r1.q.tex()}) + 23`], 'example 1');
must(r1.value.eq(23) && r1.q.tex() === 'x^2 + x - 6', 'example 1 values');
const p1 = plot({ x: [-5, 2], y: [-10, 30], fns: [{ expr: f1.tex(), label: `$y = ${f1.tex()}$` }], pts: [[-3, 23, lbl(-3, 23)]] }, 'Graph of y equals x cubed plus 4 x squared minus 3 x plus 5 for x from minus 5 to 2, with the point at x equals minus 3 marked at height 23, the remainder on division by x plus 3.', 'At $x = -3$ the graph is at height $23$: the remainder.');

// Example 2: 4x^3 - 2x^2 + 3x + 1 by (2x - 1)
const f2 = P(4, -2, 3, 1), r2 = rem(f2, lin(2, -1)), q2 = f2.divBy(lin(2, -1)).q;
const w2 = S(xctx(f2, { refs: [f2] }), [r2.ev.tex, `${f2.tex()} = (2x - 1)(${q2.tex()}) + \\dfrac{5}{2}`], 'example 2');
must(r2.value.eq(F(5, 2)), 'example 2 value');
const zRows = [lin(1, -4), lin(1, 3), lin(2, -1), lin(3, 2)];
const tZero = table(['Divisor', 'Put it equal to $0$', 'Remainder'], zRows.map((dv) => [d(btex(dv)), d(`x = ${zeroOf(dv).tex()}`), d(`f(${zeroOf(dv).tex()})`.replace(/f\((-?)\\dfrac\{(\d+)\}\{(\d+)\}\)/, 'f\\left($1\\dfrac{$2}{$3}\\right)'))]), 'Table of the value to substitute: for x minus 4 use 4; for x plus 3 use minus 3; for 2 x minus 1 use one half; for 3 x plus 2 use minus two thirds.', 'Substitute the value of $x$ that makes the divisor zero.');
must(zRows.map((dv) => zeroOf(dv).toString()).join() === '4,-3,1/2,-2/3', 'zero table');

// Example 3: x^3 + kx^2 - 7x + 4, remainder 6 on division by (x - 2)
const t3 = (e) => P(1, e.k, -7, 4), k3 = solveUnknowns(['k'], t3, [{ at: 2, value: 6 }]);
const w3 = S(kctx(['k'], t3, k3), [r`f(2) = 2^3 + k \times 2^2 - 7 \times 2 + 4 = 8 + 4k - 14 + 4 = 4k - 2`, r`4k - 2 = 6`, r`4k = 8`, r`k = 2`], 'example 3');
tplLine(['k'], t3, r`x^3 + kx^2 - 7x + 4`, 'example 3 polynomial');
const f3 = t3(k3);
must(k3.k.eq(2) && f3.at(2).eq(6), 'example 3 check');
const p3 = plot({ x: [-5, 3], y: [-40, 30], fns: [{ expr: f3.tex(), label: `$y = ${f3.tex()}$` }], pts: [[2, 6, lbl(2, 6)]] }, 'Graph of y equals x cubed plus 2 x squared minus 7 x plus 4, the polynomial with k equal to 2, passing through the marked point with x equal to 2 and height 6, the given remainder.', 'With $k = 2$ the graph passes through $(2, 6)$: the remainder is $6$.');

// Example 4: x^3 + px^2 + qx - 6, remainder 8 by (x - 2) and -4 by (x + 1)
const t4 = (e) => P(1, e.p, e.q, -6), pq4 = solveUnknowns(['p', 'q'], t4, [{ at: 2, value: 8 }, { at: -1, value: -4 }]);
const w4 = S(kctx(['p', 'q'], t4, pq4), [r`f(2) = 8 + 4p + 2q - 6 = 8 \Rightarrow 2p + q = 3`, r`f(-1) = -1 + p - q - 6 = -4 \Rightarrow p - q = 3`, r`3p = 6`, r`p = 2`, r`q = -1`], 'example 4');
tplLine(['p', 'q'], t4, r`x^3 + px^2 + qx - 6`, 'example 4 polynomial');
must(pq4.p.eq(2) && pq4.q.eq(-1) && t4(pq4).at(2).eq(8) && t4(pq4).at(-1).eq(-4), 'example 4 check');
const tCond = table(['Divisor', 'Substitute', 'Remainder', 'Equation'], [['$(x - 2)$', '$x = 2$', '$8$', '$2p + q = 3$'], ['$(x + 1)$', '$x = -1$', '$-4$', '$p - q = 3$']], 'Table turning each condition into an equation: dividing by x minus 2 leaves 8, which gives 2 p plus q equals 3; dividing by x plus 1 leaves minus 4, which gives p minus q equals 3.', 'Two conditions give two linear equations in $p$ and $q$.');
S(kctx(['p', 'q'], t4, pq4), [r`2p + q = 3`, r`p - q = 3`], 'condition table');

// Factor theorem figure: 2x^3 - x^2 - 7x + 6 = (x + 2)(x - 1)(2x - 3)
const fF = P(2, -1, -7, 6), zF = rationalZeros(fF);
must(zF.map(String).join() === '-2,1,3/2' && factorise(fF).tex === '(x + 2)(x - 1)(2x - 3)', 'factor figure');
const pF = plot({ x: [-3, 2.5], y: [-12, 14], fns: [{ expr: fF.tex(), label: `$y = ${fF.tex()}$` }], pts: zF.map((z) => [z.num(), 0, lbl(z.num(), 0)]) }, 'Graph of y equals 2 x cubed minus x squared minus 7 x plus 6, crossing the x-axis at minus 2, 1 and 1.5; the factors are x plus 2, x minus 1 and 2 x minus 3.', 'Each zero gives a factor: $-2 \\to (x + 2)$, $1 \\to (x - 1)$, $\\dfrac{3}{2} \\to (2x - 3)$.');

// Example 5: test (x - 3) and (x + 1) for x^3 - 2x^2 - 2x - 3
const f5 = P(1, -2, -2, -3), r5a = rem(f5, lin(1, -3)), r5b = rem(f5, lin(1, 1));
const w5 = S(xctx(f5, { zeros: [3], refs: [f5] }), [r5a.ev.tex, r5b.ev.tex, `${f5.tex()} = (x - 3)(${r5a.q.tex()})`], 'example 5');
must(r5a.value.isZero() && r5b.value.eq(-4) && disc(r5a.q).sign() < 0, 'example 5 values');
const tTest = table(['Expression', 'Substitute', 'Value of $f(x)$', 'Factor?'], [['$(x - 3)$', '$x = 3$', '$0$', 'yes'], ['$(x + 1)$', '$x = -1$', '$-4$', 'no: remainder $-4$']], 'Table testing two expressions for f of x equals x cubed minus 2 x squared minus 2 x minus 3: at x equals 3 the value is 0, so x minus 3 is a factor; at x equals minus 1 the value is minus 4, so x plus 1 is not a factor.', 'Value $0$ means a factor; any other value is the remainder.');

// Example 6: (2x + 3) is a factor of 2x^3 + 5x^2 - x - 6
const f6 = P(2, 5, -1, -6), r6 = rem(f6, lin(2, 3)), z6 = rationalZeros(f6);
const w6 = S(xctx(f6, { zeros: z6, refs: [f6, r6.q] }), [r6.ev.tex], 'example 6');
const q6 = f6.divBy(lin(2, 3)).q;
const w6b = S(xctx(f6, { zeros: z6, refs: [f6] }), [`${f6.tex()} = (2x + 3)(${q6.tex()})`], 'example 6 quotient');
must(r6.value.isZero() && q6.tex() === 'x^2 + x - 2' && z6.map(String).join() === '-2,-3/2,1', 'example 6 values');
const p6 = plot({ x: [-3, 2], y: [-14, 30], fns: [{ expr: f6.tex(), label: `$y = ${f6.tex()}$` }], pts: z6.map((z) => [z.num(), 0, lbl(z.num(), 0)]) }, 'Graph of y equals 2 x cubed plus 5 x squared minus x minus 6, crossing the x-axis at minus 2, minus 1.5 and 1; the zero minus 1.5 matches the factor 2 x plus 3.', 'The zero $-\\dfrac{3}{2}$ matches the factor $(2x + 3)$.');

const tLink = table(['If $f(a)$ is…', 'then dividing by $(x - a)$…', 'and the graph of $y = f(x)$ at $x = a$…'], [['not $0$', 'leaves the remainder $f(a)$', 'is at height $f(a)$, off the axis'], ['$0$', 'leaves no remainder: $(x - a)$ is a factor', 'meets the $x$-axis: $a$ is a zero']], 'Table linking the two theorems: if f of a is not zero, dividing by x minus a leaves the remainder f of a and the graph is off the axis at a; if f of a is zero, x minus a is a factor and the graph meets the x-axis at a.', 'The factor theorem is the remainder theorem with remainder $0$.');
const sum1 = table(['Idea', 'Key fact'], [['Division', '$f(x) = (x - a)q(x) + r$, with $r$ a constant'], ['Remainder theorem', 'remainder on division by $(x - a)$ is $f(a)$; by $(ax + b)$ it is $f\\left(-\\dfrac{b}{a}\\right)$'], ['Unknown coefficient', 'remainder in terms of $k$ = given remainder'], ['Factor theorem', '$(x - a)$ is a factor exactly when $f(a) = 0$']], 'Summary table for part 1: division gives f of x equals x minus a times q of x plus r; the remainder theorem; finding unknown coefficients; the factor theorem.', 'Part 1 on one card.');

// Deck 2 title: x^3 + x^2 - 10x + 8 = (x + 4)(x - 1)(x - 2)
const fT2 = P(1, 1, -10, 8), zT2 = rationalZeros(fT2);
must(zT2.map(String).join() === '-4,1,2', 'title 2');
const pT2 = plot({ x: [-5, 3], y: [-45, 30], fns: [{ expr: fT2.tex(), label: `$y = ${fT2.tex()}$` }], pts: zT2.map((z) => [z.num(), 0, lbl(z.num(), 0)]) }, 'Graph of y equals x cubed plus x squared minus 10 x plus 8, crossing the x-axis at minus 4, 1 and 2, so it factorises as x plus 4, times x minus 1, times x minus 2.', 'Three zeros, three linear factors: $(x + 4)(x - 1)(x - 2)$.');
const fUnk = flow('LR', [['a', 'Each given factor $(x - a)$: write $f(a) = 0$'], ['b', 'Each given remainder $R$: write $f(a) = R$'], ['c', 'Simplify to linear equations in the unknowns'], ['d', 'Solve (simultaneously if two)'], ['e', 'Substitute back to check']], [['a', 'c'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for unknown coefficients: each given factor x minus a gives f of a equals zero; each given remainder R gives f of a equals R; simplify to linear equations; solve them, simultaneously if there are two; substitute back to check.', 'One condition for each unknown.');

// Example 1 (deck 2): (x + 2) is a factor of 2x^3 + kx^2 - 13x - 6
const tA = (e) => P(2, e.k, -13, -6), kA = solveUnknowns(['k'], tA, [{ at: -2, value: 0 }]);
const fA = tA(kA), qA = fA.divBy(lin(1, 2)).q, zA = rationalZeros(fA);
const wA = S(kctx(['k'], tA, kA), [r`f(-2) = 2 \times (-2)^3 + k \times (-2)^2 - 13 \times (-2) - 6 = -16 + 4k + 26 - 6 = 4k + 4`, r`4k + 4 = 0`, r`k = -1`], 'deck 2 example 1');
tplLine(['k'], tA, r`2x^3 + kx^2 - 13x - 6`, 'deck 2 example 1 polynomial');
const wAx = S(xctx(fA, { zeros: zA, refs: [fA] }), [`${fA.tex()} = (x + 2)(${qA.tex()}) = (x + 2)(2x + 1)(x - 3)`], 'deck 2 example 1 factors');
must(kA.k.eq(-1) && qA.tex() === '2x^2 - 5x - 3' && zA.map(String).join() === '-2,-1/2,3', 'deck 2 example 1 values');
const pA = plot({ x: [-3, 3.5], y: [-32, 24], fns: [{ expr: fA.tex(), label: `$y = ${fA.tex()}$` }], pts: zA.map((z) => [z.num(), 0, lbl(z.num(), 0)]) }, 'Graph of y equals 2 x cubed minus x squared minus 13 x minus 6, crossing the x-axis at minus 2, minus 0.5 and 3, matching the factors x plus 2, 2 x plus 1 and x minus 3.', 'With $k = -1$: zeros $-2$, $-\\dfrac{1}{2}$ and $3$.');

// Example 2 (deck 2): (x - 2) and (x + 3) are factors of x^3 + ax^2 + bx - 12
const tB = (e) => P(1, e.a, e.b, -12), abB = solveUnknowns(['a', 'b'], tB, [{ at: 2, value: 0 }, { at: -3, value: 0 }]);
const fB = tB(abB), zB = rationalZeros(fB);
const wB = S(kctx(['a', 'b'], tB, abB), [r`f(2) = 8 + 4a + 2b - 12 = 0 \Rightarrow 2a + b = 2`, r`f(-3) = -27 + 9a - 3b - 12 = 0 \Rightarrow 3a - b = 13`, r`5a = 15`, r`a = 3`, r`b = -4`], 'deck 2 example 2');
tplLine(['a', 'b'], tB, r`x^3 + ax^2 + bx - 12`, 'deck 2 example 2 polynomial');
const wBx = S(xctx(fB, { zeros: zB, refs: [fB] }), [r`x^3 + 3x^2 - 4x - 12 = (x - 2)(x + 3)(x + 2)`], 'deck 2 example 2 third factor');
must(abB.a.eq(3) && abB.b.eq(-4) && zB.map(String).join() === '-3,-2,2', 'deck 2 example 2 values');
const tCond2 = table(['Factor', 'Condition', 'Equation'], [['$(x - 2)$', '$f(2) = 0$', '$2a + b = 2$'], ['$(x + 3)$', '$f(-3) = 0$', '$3a - b = 13$'], ['Solve', 'add the equations', '$a = 3$, $b = -4$']], 'Table for two given factors: x minus 2 gives f of 2 equals 0, that is 2 a plus b equals 2; x plus 3 gives f of minus 3 equals 0, that is 3 a minus b equals 13; adding gives a equals 3 and b equals minus 4.', 'Two factors, two equations, two unknowns.');
S(kctx(['a', 'b'], tB, abB), [r`2a + b = 2`, r`3a - b = 13`, r`a = 3`, r`b = -4`], 'condition table 2');

const fFact = flow('LR', [['a', 'Try divisors of the constant term (and fractions if the leading coefficient is not $1$)'], ['b', 'Find $a$ with $f(a) = 0$: $(x - a)$ is a factor'], ['c', 'Divide: $f(x) = (x - a)q(x)$'], ['d', 'Factorise the quadratic $q(x)$'], ['e', 'Check by expanding or by a value']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for factorising a cubic completely: try divisors of the constant term; find a value a that makes f of a zero, so x minus a is a factor; divide to get a quadratic quotient; factorise the quotient; check by expanding or by substituting a value.', 'Trial, divide, factorise, check.');

// Example 3 (deck 2): x^3 - 3x^2 - 10x + 24
const fC = P(1, -3, -10, 24), fwC = factorWork(fC);
fwC.w.must('deck 2 example 3');
must(fwC.trialLines.length === 3 && fwC.z.eq(2) && fwC.q.tex() === 'x^2 - x - 12', `deck 2 example 3 ${fwC.full}`);
const tTrialC = table(['$x$', '$f(x)$', 'Factor?'], [1, -1, 2].map((a) => [d(String(a)), d(fC.at(a).tex()), fC.at(a).isZero() ? `yes: $${btex(lin(1, -a))}$` : 'no']), 'Trial table for x cubed minus 3 x squared minus 10 x plus 24: at 1 the value is 12, at minus 1 it is 30, at 2 it is 0, so x minus 2 is a factor.', 'Try $\\pm 1$, $\\pm 2$, … (divisors of $24$) until the value is $0$.');
must([1, -1, 2].map((a) => fC.at(a).tex()).join() === '12,30,0', 'trial table C');

// Example 4 (deck 2): 2x^3 - 3x^2 - 17x + 30 with long division by (x - 2)
const fDd = P(2, -3, -17, 30), fwD = factorWork(fDd, { trials: [1, 2] }), divDd = divLines(fDd, lin(1, -2));
fwD.w.must('deck 2 example 4'); divDd.w.must('deck 2 example 4 division');
must(fwD.q.tex() === '2x^2 + x - 15' && divDd.r.isZero(), 'deck 2 example 4 values');
const tDiv2 = divTable(lin(1, -2), divDd.st, 'Table of the long division of 2 x cubed minus 3 x squared minus 17 x plus 30 by x minus 2: quotient terms 2 x squared, then x, then minus 15; the remainder is 0.', 'Quotient $2x^2 + x - 15$, remainder $0$.');
const w4q = S(xctx(fwD.q, { refs: [fwD.q] }), [r`2x^2 + x - 15 = 2x^2 + 6x - 5x - 15 = 2x(x + 3) - 5(x + 3) = (x + 3)(2x - 5)`], 'deck 2 example 4 quotient');

// Example 5 (deck 2): x^3 + x^2 - 4x + 6 = (x + 3)(x^2 - 2x + 2)
const fE = P(1, 1, -4, 6), trE = [1, -1, 2, -2, 3, -3], fwE = factorWork(fE, { trials: trE });
fwE.w.must('deck 2 example 5');
must(fwE.q.tex() === 'x^2 - 2x + 2' && disc(fwE.q).eq(-4) && rationalZeros(fE).map(String).join() === '-3', 'deck 2 example 5 values');
S(ARITH, [r`(-2)^2 - 4 \times 1 \times 2 = -4`], 'deck 2 example 5 discriminant');
const pE = plot({ x: [-4, 2], y: [-30, 15], fns: [{ expr: fE.tex(), label: `$y = ${fE.tex()}$` }], pts: [[-3, 0, lbl(-3, 0)]] }, 'Graph of y equals x cubed plus x squared minus 4 x plus 6, crossing the x-axis only once, at minus 3; the quadratic factor x squared minus 2 x plus 2 is never zero.', 'Only one zero: the quadratic factor $x^2 - 2x + 2$ cannot be factorised further.');
const tTrialE = table(['$x$', ...trE.map((a) => d(String(a)))], [['$f(x)$', ...trE.map((a) => d(fE.at(a).tex()))]], 'Trial table for x cubed plus x squared minus 4 x plus 6 at 1, minus 1, 2, minus 2, 3 and minus 3: the values are 4, 10, 10, 10, 30 and 0, so only x plus 3 is a factor.', 'Only $x = -3$ gives $0$.');
must(trE.map((a) => fE.at(a).tex()).join() === '4,10,10,10,30,0', 'trial table E');

// Choosing trial values
const ex1 = P(1, -4, 1, 2), ex2 = P(1, 4, 2, -1);
must(ex1.at(1).isZero() && ex2.at(-1).isZero() && isFactor(P(2, 5, -1, -6), lin(2, 3)), 'trial rules examples');
const tRules = table(['Clue', 'Then', 'Example'], [['Coefficients add up to $0$', '$f(1) = 0$: $(x - 1)$ is a factor', '$x^3 - 4x^2 + x + 2$: $1 - 4 + 1 + 2 = 0$'], ['Coefficients of even powers and of odd powers have equal sums', '$f(-1) = 0$: $(x + 1)$ is a factor', '$x^3 + 4x^2 + 2x - 1$: $4 - 1 = 1 + 2$'], ['Leading coefficient $1$', 'try the divisors of the constant term', '$x^3 - 3x^2 - 10x + 24$: try $\\pm 1, \\pm 2, \\pm 3, \\ldots$'], ['Leading coefficient not $1$', 'also try fractions $\\dfrac{p}{q}$, $q$ dividing the leading coefficient', '$2x^3 + 5x^2 - x - 6$: $x = -\\dfrac{3}{2}$ works']], 'Table of clues for trial values: if the coefficients add up to zero, x minus 1 is a factor; if the even-power and odd-power coefficients have equal sums, x plus 1 is a factor; with leading coefficient 1 try divisors of the constant term; otherwise also try fractions.', 'Quick tests save time in the exam.');
S(ARITH, [r`1 - 4 + 1 + 2 = 0`, r`4 - 1 = 1 + 2`], 'rules arithmetic');

// Checking a factorisation by values
const chk = [0, 1, -1].map((a) => [a, fDd.at(a), lin(1, -2).at(a).mul(lin(2, -5).at(a)).mul(lin(1, 3).at(a))]);
must(chk.every(([, u, v]) => u.eq(v)) && factorise(fDd).tex === '(x + 3)(x - 2)(2x - 5)', 'check table');
const tCheck = table(['$x$', '$f(x) = 2x^3 - 3x^2 - 17x + 30$', '$(x - 2)(2x - 5)(x + 3)$', 'Equal?'], chk.map(([a, u]) => [d(String(a)), d(u.tex()), d(`${lin(1, -2).at(a).ptex()} \\times ${lin(2, -5).at(a).ptex()} \\times ${lin(1, 3).at(a).ptex()} = ${u.tex()}`), 'yes']), 'Table checking the factorisation of 2 x cubed minus 3 x squared minus 17 x plus 30 at x equals 0, 1 and minus 1: the polynomial and the product of factors both give 30, 12 and 42.', 'A quick value check catches sign slips.');
S(ARITH, chk.map(([a, u]) => `${lin(1, -2).at(a).ptex()} \\times ${lin(2, -5).at(a).ptex()} \\times ${lin(1, 3).at(a).ptex()} = ${u.tex()}`), 'check table arithmetic');
const sum2 = table(['Task', 'Method'], [['Find $k$ from a factor', 'put $f(a) = 0$ and solve'], ['Find two unknowns', 'two conditions give two linear equations; solve simultaneously'], ['Factorise a cubic', 'trial, divide, factorise the quadratic quotient'], ['Quotient with no real zeros', 'stop: it cannot be factorised further'], ['Check', 'expand, or compare values at $x = 0, 1, -1$']], 'Summary table for part 2: find k from a factor with f of a equal to zero; two unknowns from two conditions; factorise a cubic by trial, division and factorising the quadratic; stop when the quotient has no real zeros; check by expanding or by values.', 'Part 2 on one card.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Remainder and Factor Theorems — Part 1: The remainder theorem and the factor theorem',
  goals: ['Divide a polynomial by a linear expression and write dividend = divisor × quotient + remainder', 'Find a remainder without long division, using the remainder theorem', 'Find unknown coefficients when remainders are given', 'Use the factor theorem to test whether a linear expression is a factor'],
  slides: [
    sl('title', 'Remainder and Factor Theorems, Part 1', { b: 'Dividing a polynomial by $(x - a)$ leaves a remainder you can find without dividing: it is the value of the polynomial at $x = a$.', v: pTitle, n: 'Welcome to the remainder and factor theorems. Look at the graph. When this cubic is divided by x minus three, the remainder is minus ten, and minus ten is exactly the height of the graph at x equals three. Where the graph meets the x axis, the remainder is zero, and that gives a factor. In this part you will see why.' }),
    sl('concept', 'What you will be able to do', { ul: ['Divide a polynomial by a **linear expression**', 'Find a **remainder** quickly with the **remainder theorem**', 'Find **unknown coefficients** from given remainders', 'Test **factors** with the **factor theorem**'], n: 'These are your goals for part one. First we see what happens when a polynomial is divided by a linear expression. Then we find remainders without long division, use remainders to find missing coefficients, and finally test whether an expression is a factor.' }),
    sl('concept', 'Dividing by a linear expression', { b: 'Long division of a polynomial by $(x - a)$ gives a quotient $q(x)$ and a remainder $r$. Because the divisor has degree $1$, the remainder is a **constant**.', v: tDiv, m: [r`f(x) = (x - a)\,q(x) + r`], n: 'Long division of polynomials works like long division of numbers. Divide the leading terms, multiply back, subtract, and repeat. We stop when what is left has a smaller degree than the divisor. A linear divisor always leaves a constant. Here the quotient is two x squared plus x plus six, and the remainder is seven.' }),
    sl('concept', 'The remainder theorem', { b: 'When $f(x)$ is divided by $(x - a)$, the remainder is $f(a)$. **Why:** put $x = a$ in $f(x) = (x - a)q(x) + r$; the first term becomes $0$, so $f(a) = r$.', v: tRem, m: [r`f(a) = (a - a)\,q(a) + r = r`], n: 'Here is the shortcut. Write the division as f of x equals x minus a, times the quotient, plus the remainder. Now put x equal to a. The bracket becomes zero, so everything vanishes except the remainder. The table checks this four times: long division and substitution always agree.' }),
    sl('check', 'Quick check: a remainder', { b: 'Substitute the value that makes the divisor zero.', chk: 'm02', n: 'Which value makes x minus one equal to zero? Substitute it into the polynomial carefully.' }),
    sl('example', 'Worked example 1: dividing by (x + 3)', { b: 'Find the remainder when $x^3 + 4x^2 - 3x + 5$ is divided by $(x + 3)$.', ul: ['**Step 1 —** $x + 3 = 0$ gives $x = -3$.', `**Step 2 —** ${w1.md[0]}.`, `**Check by division —** ${w1.md[1]}.`, '**Answer —** the remainder is $23$.'], v: p1, n: 'The divisor is x plus three, which is zero when x is minus three. So we substitute minus three. Take care with the signs: minus three cubed is minus twenty seven, and four times nine is thirty six. The total is twenty three. Long division gives the same remainder, but with much more work.' }),
    sl('example', 'Worked example 2: dividing by (2x − 1)', { b: 'Find the remainder when $4x^3 - 2x^2 + 3x + 1$ is divided by $(2x - 1)$.', ul: [r`**Step 1 —** $2x - 1 = 0$ gives $x = \dfrac{1}{2}$.`, `**Step 2 —** ${w2.md[0]}.`, `**Check by division —** ${w2.md[1]}.`, r`**Answer —** the remainder is $\dfrac{5}{2}$.`], v: tZero, n: 'When the divisor is two x minus one, do not substitute one. Put the divisor equal to zero: two x minus one equals zero gives x equals one half. So the remainder is f of one half, which works out to five halves. The table shows the value to use for other divisors.' }),
    sl('check', 'Quick check: which value?', { b: 'Put the divisor equal to $0$.', chk: 'fb1', n: 'Solve x plus five equals zero. That value goes into the polynomial.' }),
    sl('concept', 'Finding an unknown coefficient', { b: 'If a remainder is given, write the remainder theorem with the unknown, and solve the equation.', v: fUnk, n: 'Sometimes a coefficient is missing and the remainder is given instead. Substitute the zero of the divisor, keeping the unknown as a letter. You get an expression for the remainder. Set it equal to the given remainder and solve. With two unknowns, you need two conditions, and you solve them together.' }),
    sl('example', 'Worked example 3: one unknown', { b: 'When $x^3 + kx^2 - 7x + 4$ is divided by $(x - 2)$, the remainder is $6$. Find $k$.', ul: [`**Step 1 —** ${w3.md[0]}.`, `**Step 2 —** ${w3.md[1]}, so ${w3.md[2]}.`, `**Answer —** ${w3.md[3]}.`], v: p3, n: 'Substitute two, keeping k as a letter. Eight plus four k minus fourteen plus four simplifies to four k minus two. The remainder must be six, so four k minus two equals six. That gives k equals two. The graph of the finished polynomial passes through the point two, six.' }),
    sl('example', 'Worked example 4: two unknowns', { b: 'The polynomial $x^3 + px^2 + qx - 6$ leaves remainder $8$ when divided by $(x - 2)$, and $-4$ when divided by $(x + 1)$. Find $p$ and $q$.', ul: [`**Step 1 —** ${w4.md[0]}.`, `**Step 2 —** ${w4.md[1]}.`, `**Step 3 —** adding, ${w4.md[2]}, so ${w4.md[3]}.`, `**Answer —** ${w4.md[3]} and ${w4.md[4]}.`], v: tCond, n: 'Each condition gives one equation. Substituting two gives two p plus q equals three. Substituting minus one gives p minus q equals three. Add the equations to remove q: three p equals six, so p is two. Then q is minus one. Always substitute back to check both remainders.' }),
    sl('concept', 'The factor theorem', { b: '$(x - a)$ is a factor of $f(x)$ exactly when $f(a) = 0$. A zero of the graph at $x = a$ means a factor $(x - a)$; a zero at $x = \\dfrac{b}{c}$ means a factor $(cx - b)$.', v: pF, n: 'If the remainder is zero, the divisor goes in exactly, so it is a factor. That is the factor theorem: x minus a is a factor exactly when f of a is zero. On the graph, each crossing of the x axis gives a factor. A crossing at three halves gives the factor two x minus three.' }),
    sl('example', 'Worked example 5: testing factors', { b: 'Test whether $(x - 3)$ and $(x + 1)$ are factors of $x^3 - 2x^2 - 2x - 3$.', ul: [`**Step 1 —** ${w5.md[0]}, so $(x - 3)$ **is** a factor.`, `**Step 2 —** ${w5.md[1]}, so $(x + 1)$ is **not** a factor.`, `**Note —** ${w5.md[2]}.`], v: tTest, n: 'Test each expression separately. For x minus three, substitute three: the value is zero, so it is a factor. For x plus one, substitute minus one: the value is minus four, so it is not a factor, and minus four is the remainder. Dividing by x minus three leaves x squared plus x plus one.' }),
    sl('check', 'Quick check: spot the factor', { b: 'Try the values that make each expression zero.', chk: 'm06', n: 'Add up the coefficients. What does that tell you about x minus one?' }),
    sl('example', 'Worked example 6: a factor (2x + 3)', { b: 'Show that $(2x + 3)$ is a factor of $2x^3 + 5x^2 - x - 6$.', ul: [r`**Step 1 —** $2x + 3 = 0$ gives $x = -\dfrac{3}{2}$.`, `**Step 2 —** ${w6.md[0]}.`, `**Conclusion —** the value is $0$, so $(2x + 3)$ is a factor: ${w6b.md[0]}.`], v: p6, n: 'Put two x plus three equal to zero: x is minus three halves. Substitute carefully, cubing and squaring the fraction first. The terms add up to zero, so two x plus three is a factor. The graph crosses the x axis at minus one and a half, as expected.' }),
    sl('concept', 'Remainder or factor?', { b: 'One substitution answers both questions: the value $f(a)$ is the remainder, and if it is $0$, $(x - a)$ is a factor.', v: tLink, n: 'The two theorems work together. Substitute the zero of the divisor. If the answer is not zero, it is the remainder, and the graph is off the axis there. If the answer is zero, the divisor is a factor, and the graph meets the axis. The factor theorem is simply the remainder theorem with remainder zero.' }),
    sl('check', 'Quick check: which factor?', { b: 'Which value of $x$ makes $(x + 2)$ zero?', chk: 'tf6', n: 'Remember: x minus a goes with f of a. Which expression goes with f of two?' }),
    sl('summary', 'Summary', { ul: ['$f(x) = (x - a)q(x) + r$; a linear divisor leaves a constant remainder', 'Remainder on division by $(x - a)$ is $f(a)$; by $(ax + b)$ it is $f\\left(-\\dfrac{b}{a}\\right)$', 'Given remainders: one equation per condition', '$(x - a)$ is a factor exactly when $f(a) = 0$'], v: sum1, n: 'To sum up part one. Dividing by a linear expression leaves a constant remainder. The remainder theorem finds it by substituting the zero of the divisor. A given remainder gives an equation for an unknown coefficient. And when the value is zero, the factor theorem tells you the divisor is a factor.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Remainder (2 marks):** correct value substituted 1 + remainder 1', '**Unknown coefficient (3 marks):** substitution 1 + equation 1 + value 1', '**Mistake:** substituting $a$ for $(x + a)$ instead of $-a$', '**Mistake:** substituting $1$ for $(2x - 1)$ instead of $\\dfrac{1}{2}$', '**Mistake:** sign slips with negative values: $(-2)^2 = 4$ but $(-2)^3 = -8$', '**Mistake:** saying "factor" when the value is not $0$'], n: 'Always write the value you substitute and show each term, because the first mark is for the substitution. Put the divisor equal to zero to find that value. Watch the signs when you cube a negative number. And only call an expression a factor when the value is exactly zero; otherwise it is the remainder.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Remainder and Factor Theorems — Part 2: Unknown coefficients and factorising cubics completely',
  goals: ['Find unknown coefficients when one or two factors are given', 'Find a factor of a cubic by trial', 'Divide and factorise a cubic polynomial completely', 'Recognise a quadratic factor that cannot be factorised further, and check a factorisation'],
  slides: [
    sl('title', 'Remainder and Factor Theorems, Part 2', { b: 'A cubic with three zeros splits into three linear factors. The factor theorem finds the first one.', v: pT2, n: 'Welcome to part two. This cubic meets the x axis three times, at minus four, one and two, so it splits into three linear factors. In this part you will find missing coefficients from given factors, and learn to factorise any cubic in the syllabus completely, starting from a single trial value.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find **unknown coefficients** from given **factors**', 'Find a **first factor by trial**', '**Divide** and **factorise** a cubic completely', 'Recognise a quadratic that **cannot be factorised further**, and **check** your answer'], n: 'These are your goals for part two. We use the factor theorem to find missing coefficients. Then we factorise cubics: try a value, divide, and factorise what is left. Finally we learn to check an answer quickly.' }),
    sl('concept', 'Unknown coefficients from factors', { b: 'A given factor $(x - a)$ means $f(a) = 0$. Each factor or remainder gives one equation; two unknowns need two conditions.', v: fUnk, n: 'If x minus a is a factor, then f of a is zero. That gives an equation in the unknown coefficient. With two unknowns, you need two conditions, either two factors, or a factor and a remainder. Each gives a linear equation, and you solve the pair simultaneously.' }),
    sl('example', 'Worked example 1: find k, then factorise', { b: 'Find $k$ if $(x + 2)$ is a factor of $2x^3 + kx^2 - 13x - 6$, and factorise the polynomial completely.', ul: [`**Step 1 —** ${wA.md[0]}.`, `**Step 2 —** ${wA.md[1]}, so ${wA.md[2]}.`, `**Step 3 —** ${wAx.md[0]}.`], v: pA, n: 'Since x plus two is a factor, f of minus two is zero. Keep k as a letter: the value simplifies to four k plus four, so k is minus one. Now divide by x plus two. The quotient is two x squared minus five x minus three, which splits as two x plus one, times x minus three.' }),
    sl('check', 'Quick check: find k', { b: 'Use $f(2) = 0$.', chk: 'n03', n: 'Substitute two, keep k as a letter, and set the result equal to zero.' }),
    sl('example', 'Worked example 2: two factors given', { b: 'Both $(x - 2)$ and $(x + 3)$ are factors of $x^3 + ax^2 + bx - 12$. Find $a$ and $b$, and the third factor.', ul: [`**Step 1 —** ${wB.md[0]}.`, `**Step 2 —** ${wB.md[1]}.`, `**Step 3 —** adding, ${wB.md[2]}, so ${wB.md[3]} and ${wB.md[4]}.`, `**Third factor —** ${wBx.md[0]}.`], v: tCond2, n: 'Each factor gives an equation. From f of two equals zero, two a plus b equals two. From f of minus three equals zero, three a minus b equals thirteen. Adding them gives five a equals fifteen, so a is three and b is minus four. The polynomial then factorises with a third factor, x plus two.' }),
    sl('concept', 'Factorising a cubic completely', { b: 'Find one zero $a$ by trial, divide by $(x - a)$, then factorise the quadratic quotient.', v: fFact, n: 'Here is the method for any cubic in the syllabus. Try small values that divide the constant term until the polynomial is zero. That value gives one factor. Divide by it to get a quadratic. Then factorise the quadratic by splitting the middle term. Finally, check your answer.' }),
    sl('example', 'Worked example 3: trial, then divide', { b: 'Factorise $x^3 - 3x^2 - 10x + 24$ completely.', ul: [`**Step 1 —** ${d(fwC.trialLines[0])}; ${d(fwC.trialLines[1])}.`, `**Step 2 —** ${d(fwC.trialLines[2])}, so $(x - 2)$ is a factor.`, `**Step 3 —** ${d(fwC.idLine)}.`, `**Answer —** ${d(`${fC.tex()} = ${fwC.full}`)}.`], v: tTrialC, n: 'The constant term is twenty four, so try its divisors. One gives twelve, minus one gives thirty, but two gives zero. So x minus two is a factor. Dividing leaves x squared minus x minus twelve, which factorises as x minus four, times x plus three.' }),
    sl('example', 'Worked example 4: long division', { b: 'Factorise $2x^3 - 3x^2 - 17x + 30$ completely.', ul: [`**Step 1 —** ${d(fwD.trialLines[0])}; ${d(fwD.trialLines[1])}, so $(x - 2)$ is a factor.`, '**Step 2 —** divide by $(x - 2)$ (table): quotient $2x^2 + x - 15$, remainder $0$.', `**Step 3 —** ${w4q.md[0]}.`, `**Answer —** $${fDd.tex()} = (x - 2)(2x - 5)(x + 3)$.`], v: tDiv2, n: 'One gives twelve, but two gives zero, so x minus two is a factor. The table shows the long division: divide the leading terms, multiply back and subtract, three times. The quotient is two x squared plus x minus fifteen, which splits as x plus three, times two x minus five.' }),
    sl('check', 'Quick check: where to start', { b: 'Which values could be zeros?', chk: 'm10', n: 'Think about which numbers can divide the constant term.' }),
    sl('example', 'Worked example 5: a quadratic that will not split', { b: 'Factorise $x^3 + x^2 - 4x + 6$ as far as possible.', ul: ['**Step 1 —** trial: only $x = -3$ gives $0$ (table).', `**Step 2 —** ${d(fwE.idLine)}.`, r`**Step 3 —** for $x^2 - 2x + 2$: $(-2)^2 - 4 \times 1 \times 2 = -4 < 0$, so it has no linear factors.`, r`**Answer —** $(x + 3)(x^2 - 2x + 2)$.`], v: pE, n: 'Trying values, only minus three gives zero, so x plus three is a factor. Dividing leaves x squared minus two x plus two. Its discriminant is negative, so it has no real zeros and no linear factors. The graph agrees: it crosses the axis only once. We stop here.' }),
    sl('concept', 'Choosing trial values', { b: 'A few quick tests tell you where to start.', v: tRules, n: 'Before trying values at random, use the clues. If the coefficients add up to zero, x minus one is a factor. If the even power coefficients and the odd power coefficients have the same sum, x plus one is a factor. Otherwise try the divisors of the constant term, and fractions when the leading coefficient is not one.' }),
    sl('check', 'Quick check: the other two factors', { b: 'Divide, then factorise the quadratic.', chk: 'm14', n: 'Divide by x plus one, then find two numbers for the quadratic.' }),
    sl('concept', 'Checking a factorisation', { b: 'Substitute easy values such as $x = 0, 1, -1$ into the polynomial and into your product of factors: they must agree.', v: tCheck, n: 'Always check. Put x equal to zero, one and minus one in the original polynomial and in your factors. The numbers must match. At zero, the product of the constant terms of the factors must equal the constant term. A mismatch shows a sign slip at once.' }),
    sl('check', 'Quick check: true or false?', { b: 'Think about what $f(1)$ is.', chk: 'tf1', n: 'What do you get when you put x equal to one in any polynomial?' }),
    sl('summary', 'Summary', { ul: ['Given factor $(x - a)$: $f(a) = 0$; two unknowns need two conditions', 'Factorise a cubic: trial value, divide, factorise the quadratic', 'Trial values divide the constant term; fractions if the leading coefficient is not $1$', 'A quadratic with negative discriminant cannot be factorised further', 'Check with $x = 0, 1, -1$'], v: sum2, n: 'To sum up part two. A given factor gives f of a equals zero, an equation for an unknown. To factorise a cubic, find one zero by trial, divide, and factorise the quadratic quotient. Stop if the quadratic has no real zeros. Always check your answer with simple values.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Find $k$ and factorise (4 marks):** $f(a) = 0$ 1 + $k$ 1 + quotient 1 + factors 1', '**Factorise a cubic (3 marks):** trial value 1 + quotient 1 + complete factorisation 1', '**Mistake:** stopping at $(x - a)\\times$ quadratic when the quadratic still factorises', '**Mistake:** sign errors in the quotient: check by expanding', '**Mistake:** writing roots such as $x = 2$ instead of factors such as $(x - 2)$', '**Mistake:** a factor such as $(2x - 5)$ written as $\\left(x - \\dfrac{5}{2}\\right)$ without the 2'], n: 'Show the trial value that gives zero, the division, and the final product of factors: each earns a mark. Do not stop at a quadratic factor that still splits. Give factors, not roots. And if a zero is a fraction such as five halves, write the factor as two x minus five, so the product still equals the polynomial.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch07', version: 1, title: 'Factorisation of Polynomials: Remainder and Factor Theorems — chapter notes', language: 'en',
  sections: [
    { heading: '1. Dividing a polynomial by a linear expression', body_md: r`- **Division algorithm:** dividend = divisor × quotient + remainder, that is $f(x) = (x - a)q(x) + r$.
- The remainder has a smaller degree than the divisor, so on division by a linear expression it is a **constant**.
- Long division: divide the leading terms, multiply back, subtract; repeat until the remainder is a constant.

*Example:* $2x^3 - 3x^2 + 4x - 5 = (x - 2)(2x^2 + x + 6) + 7$.

This chapter uses polynomials of degree up to $3$ only; polynomials of degree higher than $3$ are not in the ICSE 2027 syllabus.`, key_terms: [{ term: 'Quotient', definition_md: 'The polynomial $q(x)$ in $f(x) = (x - a)q(x) + r$.' }, { term: 'Remainder', definition_md: 'What is left after dividing; for a linear divisor it is a constant.' }], formulas: [{ latex: 'f(x) = (x - a)\\,q(x) + r', label: 'Division algorithm' }], visual: tDiv, topic_ids: [topic(1)] },
    { heading: '2. The remainder theorem', body_md: r`When $f(x)$ is divided by $(x - a)$, the **remainder is $f(a)$**. Put $x = a$ in $f(x) = (x - a)q(x) + r$: the first term becomes $0$.

- Divisor $(x + a)$: remainder $f(-a)$.
- Divisor $(ax + b)$: remainder $f\left(-\dfrac{b}{a}\right)$; divisor $(ax - b)$: remainder $f\left(\dfrac{b}{a}\right)$.
- Rule: **put the divisor equal to $0$** and substitute that value.

*Example:* $x^3 + 4x^2 - 3x + 5$ divided by $(x + 3)$: $f(-3) = -27 + 36 + 9 + 5 = 23$.`, key_terms: [{ term: 'Remainder theorem', definition_md: 'The remainder when $f(x)$ is divided by $(x - a)$ is $f(a)$.' }, { term: 'Zero of a divisor', definition_md: 'The value of $x$ that makes the divisor $0$; for $2x - 1$ it is $\\dfrac{1}{2}$.' }], formulas: [{ latex: 'r = f(a)', label: 'Divisor x − a' }, { latex: 'r = f\\left(-\\dfrac{b}{a}\\right)', label: 'Divisor ax + b' }], visual: tRem, visuals: [tZero, p1], topic_ids: [topic(1)] },
    { heading: '3. Unknown coefficients from given remainders', body_md: r`1. Substitute the zero of each divisor, keeping the unknowns as letters.
2. Set each result equal to the given remainder: one **linear equation** per condition.
3. Solve (simultaneously for two unknowns) and substitute back to check.

*Examples:* $x^3 + kx^2 - 7x + 4$ leaves $6$ on division by $(x - 2)$: $4k - 2 = 6$, so $k = 2$. Equal remainders: set the two remainders equal to each other.`, key_terms: [{ term: 'Condition', definition_md: 'A given remainder or factor; each gives one equation in the unknowns.' }], formulas: [{ latex: 'f(a) = R', label: 'Remainder R on division by x − a' }], visual: fUnk, visuals: [tCond, p3], topic_ids: [topic(1)] },
    { heading: '4. The factor theorem', body_md: r`$(x - a)$ is a **factor** of $f(x)$ exactly when $f(a) = 0$ (the remainder theorem with remainder $0$).

- $f(-a) = 0 \iff (x + a)$ is a factor; $f\left(\dfrac{b}{c}\right) = 0 \iff (cx - b)$ is a factor.
- A zero of $f$ is where the graph of $y = f(x)$ meets the $x$-axis: each zero gives a factor.
- If $f(a) \ne 0$, then $(x - a)$ is not a factor and $f(a)$ is the remainder.`, key_terms: [{ term: 'Factor theorem', definition_md: '$(x - a)$ is a factor of $f(x)$ if and only if $f(a) = 0$.' }, { term: 'Zero of a polynomial', definition_md: 'A value $a$ with $f(a) = 0$.' }], formulas: [{ latex: 'f(a) = 0 \\iff (x - a) \\text{ is a factor}', label: 'Factor theorem' }], visual: pF, visuals: [tTest, tLink], topic_ids: [topic(2)] },
    { heading: '5. Unknown coefficients from given factors', body_md: r`- One factor $(x - a)$ and one unknown: solve $f(a) = 0$.
- Two unknowns: use two conditions (two factors, or a factor and a remainder) and solve the two linear equations together.
- A divisor such as $x^2 - x - 2$ is the product $(x - 2)(x + 1)$: use $f(2) = 0$ and $f(-1) = 0$.

*Example:* $(x - 2)$ and $(x + 3)$ are factors of $x^3 + ax^2 + bx - 12$: $2a + b = 2$ and $3a - b = 13$, so $a = 3$, $b = -4$.`, key_terms: [{ term: 'Simultaneous equations', definition_md: 'Two linear equations in two unknowns, solved together.' }], formulas: [{ latex: 'f(a) = 0', label: 'Given factor x − a' }], visual: tCond2, visuals: [pA], topic_ids: [topic(2)] },
    { heading: '6. Factorising a cubic completely', body_md: r`1. **Trial:** try divisors of the constant term ($\pm 1, \pm 2, \ldots$); if the leading coefficient is not $1$, also try fractions $\dfrac{p}{q}$ with $q$ dividing it.
2. When $f(a) = 0$, $(x - a)$ is a factor. **Divide** (long division or by inspection): $f(x) = (x - a)q(x)$.
3. **Factorise the quadratic** $q(x)$ by splitting the middle term.
4. If $q(x)$ has a negative discriminant, it **cannot be factorised further**.

*Example:* $x^3 - 3x^2 - 10x + 24$: $f(2) = 0$, quotient $x^2 - x - 12$, so $(x - 2)(x - 4)(x + 3)$.`, key_terms: [{ term: 'Complete factorisation', definition_md: 'Writing the polynomial as a product of factors none of which can be factorised further.' }, { term: 'Trial value', definition_md: 'A value tried in $f(x)$ to find a zero, usually a divisor of the constant term.' }], formulas: [{ latex: 'f(x) = (x - a)\\,q(x)', label: 'After finding a zero a' }], visual: fFact, visuals: [tTrialC, tDiv2, pE], topic_ids: [topic(3)] },
    { heading: '7. Quick tests and checking', body_md: r`- Sum of coefficients $= 0$: $f(1) = 0$, so $(x - 1)$ is a factor.
- Sum of coefficients of even powers $=$ sum of coefficients of odd powers: $f(-1) = 0$, so $(x + 1)$ is a factor.
- **Check** a factorisation by expanding, or by comparing values at $x = 0, 1, -1$.
- Give the answer as **factors**, e.g. $(2x - 5)$, not as roots such as $x = \dfrac{5}{2}$.`, key_terms: [{ term: 'Checking by values', definition_md: 'Substituting easy values into the polynomial and into the product of factors; they must agree.' }], formulas: [], visual: tRules, visuals: [tCheck], topic_ids: [topic(2), topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Remainder (2 marks):* value substituted 1; remainder 1.
- *Unknown coefficient (3 marks):* remainder or factor written in terms of $k$ 1; equation 1; value 1.
- *Two unknowns (4 marks):* each equation 1 + 1; solving 1; values 1.
- *Factorise a cubic (3–4 marks):* trial value giving $0$ 1; quotient 1; complete factorisation 1 (+ 1 for showing the division).
- *10-mark structured question:* parts (a), (b), (c), usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Substituting $a$ instead of $-a$ for the divisor $(x + a)$, or $1$ instead of $\dfrac{1}{2}$ for $(2x - 1)$.
2. Sign slips with negative values: $(-3)^2 = 9$ but $(-3)^3 = -27$.
3. Calling an expression a factor when the value is not $0$.
4. Stopping with a quadratic factor that still factorises.
5. Errors in the quotient: check by expanding.
6. Writing roots instead of factors, or $\left(x - \dfrac{5}{2}\right)$ instead of $(2x - 5)$.`,
  status: 'draft', provenance: d1.provenance,
};
// notes facts
S(xctx(f1), [r`f(-3) = -27 + 36 + 9 + 5 = 23`], 'notes remainder example');
S(kctx(['k'], t3, k3), [r`4k - 2 = 6`, r`k = 2`], 'notes k example');
S(kctx(['a', 'b'], tB, abB), [r`2a + b = 2`, r`3a - b = 13`, r`a = 3`, r`b = -4`], 'notes ab example');
S(xctx(fC, { zeros: rationalZeros(fC), refs: [fC] }), [r`f(2) = 0`, r`x^3 - 3x^2 - 10x + 24 = (x - 2)(x^2 - x - 12) = (x - 2)(x - 4)(x + 3)`], 'notes factorisation');
S(xctx(fD, { refs: [fD] }), [r`2x^3 - 3x^2 + 4x - 5 = (x - 2)(2x^2 + x + 6) + 7`], 'notes division');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch07', version: 1, language: 'en',
  cards: [
    fc('f01', 'State the **division algorithm** for dividing $f(x)$ by $(x - a)$.', '$f(x) = (x - a)q(x) + r$, where $q(x)$ is the quotient and $r$ the remainder.', 'formula', 1),
    fc('f02', 'Why is the remainder a constant when the divisor is linear?', 'The remainder always has a smaller degree than the divisor, and the divisor has degree $1$.', 'concept', 1),
    fc('f03', 'State the **remainder theorem**.', 'When $f(x)$ is divided by $(x - a)$, the remainder is $f(a)$.', 'definition', 1),
    fc('f04', 'Remainder when $f(x)$ is divided by $(x + 4)$?', '$f(-4)$.', 'fact', 1),
    fc('f05', 'Remainder when $f(x)$ is divided by $(3x - 2)$?', '$f\\left(\\dfrac{2}{3}\\right)$: put $3x - 2 = 0$.', 'fact', 1),
    fc('f06', 'Remainder when $f(x)$ is divided by $(ax + b)$?', '$f\\left(-\\dfrac{b}{a}\\right)$.', 'formula', 1),
    fc('f07', 'Remainder when $x^3 + 4x^2 - 3x + 5$ is divided by $(x + 3)$?', '$f(-3) = -27 + 36 + 9 + 5 = 23$.', 'example', 1),
    fc('f08', 'How do you find $k$ when the remainder is given?', 'Substitute the zero of the divisor keeping $k$, set the result equal to the given remainder, and solve.', 'concept', 1),
    fc('f09', 'Two unknown coefficients: how many conditions do you need?', 'Two; each gives a linear equation, and you solve them simultaneously.', 'concept', 1),
    fc('f10', 'Two polynomials leave the **same remainder** on division by $(x - a)$. What equation do you write?', 'Set their values at $x = a$ equal: $f(a) = g(a)$.', 'concept', 1),
    fc('f11', 'State the **factor theorem**.', '$(x - a)$ is a factor of $f(x)$ exactly when $f(a) = 0$.', 'definition', 2),
    fc('f12', 'If $f\\left(\\dfrac{3}{2}\\right) = 0$, which factor does $f(x)$ have?', '$(2x - 3)$.', 'fact', 2),
    fc('f13', 'If $f(-5) = 0$, which factor does $f(x)$ have?', '$(x + 5)$.', 'fact', 2),
    fc('f14', 'What does a zero of $f$ look like on the graph of $y = f(x)$?', 'A point where the graph meets the $x$-axis.', 'diagram', 2),
    fc('f15', 'Is $(x + 1)$ a factor of $x^3 - 2x^2 - 2x - 3$?', 'No: $f(-1) = -4$, which is the remainder.', 'example', 2),
    fc('f16', 'The coefficients of $f(x)$ add up to $0$. Which factor must it have?', '$(x - 1)$, because $f(1)$ is the sum of the coefficients.', 'exam-tip', 2),
    fc('f17', 'When is $(x + 1)$ a factor, by a quick test?', 'When the coefficients of even powers and of odd powers have equal sums.', 'exam-tip', 2),
    fc('f18', '$(x - 3)$ is a factor of $2x^3 - 5x^2 + kx - 6$. Find $k$.', '$f(3) = 3k + 3 = 0$, so $k = -1$.', 'example', 2),
    fc('f19', 'A cubic is divisible by $x^2 - x - 2$. Which two values make it zero?', '$x = 2$ and $x = -1$, since $x^2 - x - 2 = (x - 2)(x + 1)$.', 'concept', 2),
    fc('f20', 'Which values do you try first when factorising $x^3 + ax^2 + bx + c$?', 'The divisors of the constant term $c$.', 'concept', 3),
    fc('f21', 'Leading coefficient not $1$: which extra trial values?', 'Fractions $\\dfrac{p}{q}$ with $p$ dividing the constant term and $q$ dividing the leading coefficient.', 'concept', 3),
    fc('f22', 'Three steps to factorise a cubic completely?', 'Find a zero by trial; divide by the matching factor; factorise the quadratic quotient.', 'concept', 3),
    fc('f23', 'Factorise $x^3 - 3x^2 - 10x + 24$.', '$(x - 2)(x - 4)(x + 3)$.', 'example', 3),
    fc('f24', 'Factorise $2x^3 - 3x^2 - 17x + 30$.', '$(x - 2)(2x - 5)(x + 3)$.', 'example', 3),
    fc('f25', 'When do you stop factorising a quadratic quotient?', 'When its discriminant is negative: it has no linear factors, e.g. $x^2 - 2x + 2$.', 'exam-tip', 3),
    fc('f26', 'Factorise $x^3 + x^2 - 4x + 6$ as far as possible.', '$(x + 3)(x^2 - 2x + 2)$.', 'example', 3),
    fc('f27', 'How can you check a factorisation quickly?', 'Compare the polynomial and the product of factors at $x = 0$, $1$ and $-1$.', 'exam-tip', 3),
    fc('f28', 'A zero is $\\dfrac{5}{2}$. How do you write the factor?', '$(2x - 5)$, not $\\left(x - \\dfrac{5}{2}\\right)$ alone, so the product still equals the polynomial.', 'exam-tip', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};
// flashcard facts
must(rem(P(1, -2, -2, -3), lin(1, 1)).value.eq(-4) && solveUnknowns(['k'], (e) => P(2, -5, e.k, -6), [{ at: 3, value: 0 }]).k.eq(-1), 'flashcards f15 f18');
must(factorise(fC).tex === '(x + 3)(x - 2)(x - 4)' && factorise(fDd).tex === '(x + 3)(x - 2)(2x - 5)' && factorise(fE).rest.tex() === 'x^2 - 2x + 2', 'flashcards f23 f24 f26');
must(zeroOf(lin(3, -2)).eq(F(2, 3)) && zeroOf(lin(2, -3)).eq(F(3, 2)) && zeroOf(lin(1, 5)).eq(-5) && rem(f1, lin(1, 3)).value.eq(23), 'flashcards f05 f07 f12 f13');
S(kctx(['k'], (e) => P(2, -5, e.k, -6), solveUnknowns(['k'], (e) => P(2, -5, e.k, -6), [{ at: 3, value: 0 }])), [r`f(3) = 3k + 3`], 'flashcard f18 line');
S(xctx(f1), [r`f(-3) = -27 + 36 + 9 + 5 = 23`], 'flashcard f07 line');

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch07', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only (remainder theorem, including divisors ax + b, unknown coefficients from given remainders and equal remainders; factor theorem, testing factors and unknown coefficients from one or two given factors; factorising a cubic completely after finding one factor by trial). Polynomials of degree higher than 3 (removed for ICSE 2027) appear only in one "not in the syllabus" note.', polynomials: 'every remainder is computed by exact fraction arithmetic both by substituting the zero of the divisor and by long division, and the two must agree; every division is checked back (divisor × quotient + remainder = dividend); every factorisation is expanded back; rational zeros are found among the candidates p/q and confirmed by exact substitution; unknown coefficients are solved by exact elimination over fractions (affinity of each condition checked) and substituted back', working_lines: 'every equation typed in a worked example, note, flashcard or model answer is parsed from its TeX by an exact parser: neighbouring sides that both contain the unknown must be identical (checked at nine points, and a multiple of the verified polynomial where given), numeric sides must be equal exactly, and an equation between them must hold at the verified zeros or solved coefficients; "or" alternatives must cover every solution; typed polynomials with unknowns are compared with the templates used to solve them' } },
};
const tests = chapterTests('Factorisation of Polynomials: Remainder and Factor Theorems', {
  A: ['m03', 'm07', 'm09', 'ar2', 's302', 's304'],
  B: ['l01', 'l02'],
}, {
  A: ['m04', 'm05', 'm08', 'm12', 'm13', 'm17', 'ar1', 'ar4', 's401', 's402', 's405'],
  B: ['l03', 'l05', 'l06'],
});
build({ dir: DIR, release, testsSpec: tests });

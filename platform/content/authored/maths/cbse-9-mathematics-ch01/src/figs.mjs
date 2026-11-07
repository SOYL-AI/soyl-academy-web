// Figures and tables for CBSE 9 Mathematics ch01 Number System. Every length, coordinate, decimal digit and surd printed here is
// computed in nm.mjs and asserted with must(); geometry is drawn from computed coordinates with a single scale per figure.
import { geom, table, flow } from './lib.mjs';
import { r, must, F, simplifySurd, isRatSquare, terminates, longDiv, decTex, decDigits, recurFrac, recurValue, sd, sdv, smul, ratio, ratPow, powTex, primeStr, gcd, spiral, round3, dist, angleAtDeg } from './nm.mjs';

const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;
const lab = (t) => t;

// ---------------------------------------------------------------- deck 1 geometry
const s2 = 2.5, O2 = [4.5, 4.5];
const A2 = [O2[0] + s2, O2[1]], B2 = [A2[0], O2[1] + s2], P2 = [round3(O2[0] + Math.SQRT2 * s2), O2[1]];
must(near(dist(O2, B2), Math.SQRT2 * s2) && near(angleAtDeg(A2, O2, B2), 90), 'sqrt 2 construction');
export const fSqrt2 = geom({ width: 10, height: 9, points: { O: { at: O2, label: '0' }, A: { at: A2, label: '1' }, B: { at: B2, label: 'B' }, P: { at: P2, label: '$\\sqrt{2}$' } }, segments: [{ from: 'O', to: 'A', label: '1' }, { from: 'A', to: 'B', label: '1' }, { from: 'O', to: 'B' }], lines: [{ through: ['O', 'P'] }], circles: [{ center: 'O', radius: Math.SQRT2 * s2 }], angles: [{ at: 'A', from: 'O', to: 'B', right: true }] }, 'Number line with 0 at O and 1 at A. A segment AB of length 1 is drawn at right angles to the line at A, so OB is the square root of 2. A circle with centre O and radius OB cuts the number line at P, which stands for root 2.', 'Right triangle with legs $1$ and $1$: $OB = \\sqrt{2}$, and the arc carries it to $P$.');

const s3 = 2.5, Q3x = round3(O2[0] + Math.SQRT2 * s3);
const Q3 = [Q3x, O2[1] + s3], R3 = [round3(O2[0] + Math.sqrt(3) * s3), O2[1]], P3 = [Q3x, O2[1]];
must(near(dist(O2, Q3), Math.sqrt(3) * s3, 2e-3) && near(angleAtDeg(P3, O2, Q3), 90), 'sqrt 3 construction');
export const fSqrt3 = geom({ width: 9.5, height: 9, points: { O: { at: O2, label: '0' }, P: { at: P3, label: '$\\sqrt{2}$' }, Q: { at: Q3, label: 'Q' }, R: { at: R3, label: '$\\sqrt{3}$' } }, segments: [{ from: 'O', to: 'P' }, { from: 'P', to: 'Q', label: '1' }, { from: 'O', to: 'Q' }], lines: [{ through: ['O', 'R'] }], circles: [{ center: 'O', radius: Math.sqrt(3) * s3 }], angles: [{ at: 'P', from: 'O', to: 'Q', right: true }] }, 'Number line with O at 0 and P at root 2. At P a segment PQ of length 1 is drawn at right angles to the line, so OQ is root 3. A circle with centre O and radius OQ cuts the number line at R, which stands for root 3.', 'Build $\\sqrt{3}$ from $\\sqrt{2}$: $OQ^{2} = (\\sqrt{2})^{2} + 1^{2} = 3$.');

const s5 = 1.8, O5 = [4.3, 4.3], A5 = [O5[0] + 2 * s5, O5[1]], B5 = [A5[0], O5[1] + s5], P5 = [round3(O5[0] + Math.sqrt(5) * s5), O5[1]];
must(near(dist(O5, B5), Math.sqrt(5) * s5) && near(angleAtDeg(A5, O5, B5), 90), 'sqrt 5 construction');
export const fSqrt5 = geom({ width: 8.8, height: 8.7, points: { O: { at: O5, label: '0' }, A: { at: A5, label: '2' }, B: { at: B5, label: 'B' }, P: { at: P5, label: '$\\sqrt{5}$' } }, segments: [{ from: 'O', to: 'A', label: '2' }, { from: 'A', to: 'B', label: '1' }, { from: 'O', to: 'B' }], lines: [{ through: ['O', 'P'] }], circles: [{ center: 'O', radius: Math.sqrt(5) * s5 }], angles: [{ at: 'A', from: 'O', to: 'B', right: true }] }, 'Number line with 0 at O and 2 at A. A segment AB of length 1 is drawn at right angles at A, so OB is the square root of 5. A circle with centre O and radius OB cuts the line at P, which stands for root 5.', 'Legs $2$ and $1$ give $OB^{2} = 4 + 1 = 5$.');

const sp = spiral(8, 1.5, 4.6, 4.6), spO = [4.6, 4.6];
sp.forEach((p, k) => must(near(dist(spO, p), 1.5 * Math.sqrt(k + 1), 2e-3), `spiral radius ${k + 1}`));
for (let k = 0; k < 7; k++) must(near(angleAtDeg(sp[k], spO, sp[k + 1]), 90, 0.2) && near(dist(sp[k], sp[k + 1]), 1.5, 2e-3), `spiral right angle ${k + 1}`);
const spPts = { O: { at: spO, label: 'O' } };
sp.forEach((p, k) => { spPts[`P${k + 1}`] = { at: p, label: k === 0 ? '1' : `$\\sqrt{${k + 1}}$` }; });
export const fSpiral = geom({ width: 9.2, height: 9.2, points: spPts, segments: [...sp.map((_, k) => ({ from: 'O', to: `P${k + 1}` })), ...sp.slice(0, 7).map((_, k) => ({ from: `P${k + 1}`, to: `P${k + 2}` }))], angles: [0, 1, 2].map((k) => ({ at: `P${k + 1}`, from: 'O', to: `P${k + 2}`, right: true })) }, 'The square-root spiral: right triangles all sharing the point O, each with a new side of length 1 at right angles to the previous hypotenuse. The hypotenuses from O have lengths 1, root 2, root 3, root 4 and so on up to root 8.', 'Each new triangle adds $1$ to the square of the hypotenuse.');

const sq = 3, Osq = [1, 1];
export const fSquare = geom({ width: 5, height: 5, points: { O: { at: Osq, label: 'O' }, A: { at: [1 + sq, 1], label: 'A' }, C: { at: [1 + sq, 1 + sq], label: 'C' }, D: { at: [1, 1 + sq], label: 'D' } }, segments: [{ from: 'O', to: 'A', label: '1' }, { from: 'A', to: 'C', label: '1' }, { from: 'C', to: 'D', label: '1' }, { from: 'D', to: 'O', label: '1' }, { from: 'O', to: 'C', label: '$\\sqrt{2}$' }], angles: [{ at: 'A', from: 'O', to: 'C', right: true }] }, 'A square OACD with every side 1 unit long and a diagonal OC. By the Pythagoras theorem the diagonal OC is the square root of 2 units.', 'The diagonal of a unit square has length $\\sqrt{2}$.');

const thirds = [0, 1, 2, 3, 4, 5, 6], fx = (k) => 1.5 + 4.5 * (k / 3);
const fracLab = ['0', '$\\dfrac{1}{3}$', '$\\dfrac{2}{3}$', '1', '$\\dfrac{4}{3}$', '$\\dfrac{5}{3}$', '2'];
const fracPts = {};
thirds.forEach((k) => { fracPts[`Z${k}`] = { at: [round3(fx(k)), 1.5], label: fracLab[k] }; });
export const fFrac = geom({ width: 12, height: 3, points: fracPts, lines: [{ through: ['Z0', 'Z6'] }] }, 'A number line from 0 to 2 with the unit interval from 0 to 1 divided into three equal parts. The marks are 0, one third, two thirds, 1, four thirds, five thirds and 2, so five thirds lies two parts beyond 1.', 'To mark $\\dfrac{5}{3}$, cut each unit into $3$ equal parts and count $5$ parts from $0$.');

// ---------------------------------------------------------------- deck 1 tables
const rationalRows = [
  ['$7$', r`$\dfrac{7}{1}$`, 'rational'], ['$-\\dfrac{3}{5}$', r`$\dfrac{-3}{5}$`, 'rational'], ['$0.375$', r`$\dfrac{3}{8}$`, 'rational'], [r`$\sqrt{49}$`, r`$7 = \dfrac{7}{1}$`, 'rational'], [r`$\sqrt{2}$`, 'no such $\\dfrac{p}{q}$ exists', 'irrational'], [r`$\pi$`, r`$\dfrac{22}{7}$ is only a close value`, 'irrational'],
];
must(near(0.375, 3 / 8) && isRatSquare(49, 1) && !isRatSquare(2, 1), 'classification table');
export const tClass = table(['Number', 'As $\\dfrac{p}{q}$', 'Kind'], rationalRows, 'Table of numbers and their kind: 7, minus three fifths, 0.375 and the square root of 49 can be written as fractions p over q, so they are rational; the square root of 2 and pi cannot, so they are irrational.', 'A rational number can be written as $\\dfrac{p}{q}$ with integers $p, q$ and $q \\ne 0$.');

const ex1 = [['$\\sqrt{81}$', 'rational', '$9$'], ['$\\sqrt{0.04}$', 'rational', '$0.2$'], ['$\\sqrt{18}$', 'irrational', r`$3\sqrt{2}$`], ['$0.\\overline{45}$', 'rational', r`$\dfrac{5}{11}$`], ['$3 + \\sqrt{5}$', 'irrational', 'rational plus irrational'], ['$\\pi$', 'irrational', 'non-recurring decimal']];
must(isRatSquare(81, 1) && isRatSquare(4, 100) && !isRatSquare(18, 1) && recurFrac(0, '', '45').eq(F(5, 11)), 'worked example 1');
export const tEx1 = table(['Number', 'Kind', 'Reason'], ex1, 'Table for worked example 1: the square root of 81 is 9 and the square root of 0.04 is 0.2, both rational; the square root of 18 is 3 root 2, irrational; 0.454545 recurring is five elevenths, rational; 3 plus root 5 and pi are irrational.', 'Simplify first, then decide.');

const fr0 = [[3, 8], [9, 20], [4, 9], [5, 11], [7, 12], [1, 7]];
const typeOf = (n, d) => { const L = longDiv(n, d); return L.terminating ? 'terminating' : L.pre === '' ? 'recurring from the start' : 'recurring after some digits'; };
export const tDec = table(['Fraction', 'Denominator', 'Decimal expansion', 'Kind'], fr0.map(([n, d]) => [`$\\dfrac{${n}}{${d}}$`, `$${primeStr(d)}$`, `$${decTex(n, d)}$`, typeOf(n, d)]), 'Table of six fractions with their decimal expansions: three eighths is 0.375 and nine twentieths is 0.45, both terminating; four ninths is 0.4 recurring and five elevenths is 0.45 recurring; seven twelfths is 0.58 with 3 recurring; one seventh is 0.142857 recurring.', 'Every rational number terminates or recurs.');
must(decTex(3, 8) === '0.375' && decTex(1, 7) === '0.\\overline{142857}' && decTex(7, 12) === '0.58\\overline{3}', 'decimal expansions');

const L7 = longDiv(1, 7);
must(L7.period === 6 && L7.rems.slice(0, 7).join() === '1,3,2,6,4,5,1' && L7.rep === '142857', 'long division 1/7');
export const tDiv = table(['Step', 'Remainder', 'Remainder $\\times 10$', 'Digit', 'New remainder'], L7.digits.map((dg, k) => [String(k + 1), String(L7.rems[k]), String(L7.rems[k] * 10), String(dg), String(L7.rems[k + 1])]), 'Long division table for 1 divided by 7: the remainders are 1, 3, 2, 6, 4, 5 and then 1 again after six steps, giving the digits 1, 4, 2, 8, 5, 7, so the block 142857 repeats.', 'The remainder $1$ returns after $6$ steps: the period of $\\dfrac{1}{7}$ is $6$.');

const tm = [[13, 125], [17, 72], [21, 35], [9, 28]];
export const tTerm = table(['Fraction', 'Lowest terms', 'Denominator', 'Terminates?'], tm.map(([n, d]) => { const g = gcd(n, d); return [`$\\dfrac{${n}}{${d}}$`, `$\\dfrac{${n / g}}{${d / g}}$`, `$${primeStr(d / g)}$`, terminates(n, d) ? `yes, $${decTex(n, d)}$` : 'no']; }), 'Table for worked example 3: 13 over 125 has denominator 5 cubed and terminates as 0.104; 17 over 72 has the factor 3 and does not terminate; 21 over 35 reduces to 3 over 5 and terminates as 0.6; 9 over 28 has the factor 7 and does not terminate.', 'Reduce first; then look at the prime factors of the denominator.');
must(decTex(13, 125) === '0.104' && decTex(21, 35) === '0.6' && !terminates(17, 72) && !terminates(9, 28), 'terminating table');

const r1 = recurFrac(0, '', '405'), r2 = recurFrac(0, '2', '18');
must(r1.eq(F(15, 37)) && r2.eq(F(12, 55)) && near(recurValue(0, '', '405'), 15 / 37) && near(recurValue(0, '2', '18'), 12 / 55), 'recurring to fraction');
export const tRecur = table(['Step', r`$x = 0.\overline{405}$`, r`$y = 0.2\overline{18}$`], [['Make the repeating part line up', r`$1000x = 405.\overline{405}$`, r`$10y = 2.\overline{18}$ and $1000y = 218.\overline{18}$`], ['Subtract', '$999x = 405$', '$990y = 216$'], ['Divide and reduce', r`$x = \dfrac{405}{999} = \dfrac{15}{37}$`, r`$y = \dfrac{216}{990} = \dfrac{12}{55}$`]], 'Table: for x equal to 0.405 recurring, 1000x minus x gives 999x equal to 405, so x is 15 over 37; for y equal to 0.2 followed by 18 recurring, 1000y minus 10y gives 990y equal to 216, so y is 12 over 55.', 'Multiply by $10^{k}$ so the repeating tails match, then subtract.');

const irr = [['$\\sqrt{2}$', `$${Math.sqrt(2).toFixed(9)}\\ldots$`], ['$\\sqrt{3}$', `$${Math.sqrt(3).toFixed(9)}\\ldots$`], ['$\\pi$', `$${Math.PI.toFixed(9)}\\ldots$`], ['$0.1010010001\\ldots$', 'a $1$ after $1, 2, 3, \\ldots$ zeros']];
export const tIrr = table(['Number', 'Decimal expansion (digits shown)'], irr, 'Table of irrational numbers with their first digits: root 2 is 1.414213562, root 3 is 1.732050808, pi is 3.141592654, and the decimal 0.1010010001 with growing runs of zeros; none of them ends or repeats a block.', 'Non-terminating and non-recurring: irrational.');
const x7 = Math.sqrt(7);
export const tSucc = table(['Step', 'Interval', 'Width'], [0, 1, 2, 3, 4].map((k) => { const lo = Math.floor(x7 * 10 ** k) / 10 ** k, hi = lo + 10 ** -k; must(lo < x7 && x7 < hi, 'magnification'); return [String(k + 1), `$${lo.toFixed(k)} < \\sqrt{7} < ${hi.toFixed(k)}$`, `$${(10 ** -k).toString()}$`]; }), 'Table of successive magnification of root 7: it lies between 2 and 3, then between 2.6 and 2.7, then between 2.64 and 2.65, then between 2.645 and 2.646, then between 2.6457 and 2.6458, each interval ten times narrower.', 'Each step magnifies the previous interval $10$ times.');

export const sumFlow1 = flow('LR', [['a', 'Rational and irrational numbers'], ['b', r`Number line: $\sqrt{2}$, $\sqrt{3}$, $\sqrt{n}$`], ['c', 'Decimals: terminating, recurring, non-recurring'], ['d', r`Recurring decimal to $\dfrac{p}{q}$`]], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow: rational and irrational numbers; marking root 2, root 3 and other roots on the number line; the three kinds of decimal expansion; and turning a recurring decimal into a fraction.', 'Part 1 at a glance.');

// ---------------------------------------------------------------- deck 2 tables
const sq2 = Math.SQRT2;
must(near(sq2 * Math.sqrt(8), 4) && near(sq2 + -sq2, 0) && near(Math.sqrt(3) ** 2, 3), 'closure table');
export const tClosure = table(['Combination', 'Result', 'Kind'], [[r`$2 + \sqrt{3}$`, 'cannot be written as $\\dfrac{p}{q}$', 'irrational'], [r`$\sqrt{2} \times \sqrt{8}$`, r`$\sqrt{16} = 4$`, 'rational'], [r`$\sqrt{2} + (-\sqrt{2})$`, '$0$', 'rational'], [r`$(\sqrt{3})^{2}$`, '$3$', 'rational']], 'Table of combinations: 2 plus root 3 is irrational; root 2 times root 8 is root 16, which is 4, rational; root 2 plus minus root 2 is 0, rational; root 3 squared is 3, rational. So sums and products of irrational numbers can be rational.', 'Irrational numbers can combine to give rational ones.');

const laws = [[r`$\sqrt{a}\sqrt{b} = \sqrt{ab}$`, r`$\sqrt{12} \times \sqrt{3} = \sqrt{36} = 6$`, Math.sqrt(12) * Math.sqrt(3), 6], [r`$\dfrac{\sqrt{a}}{\sqrt{b}} = \sqrt{\dfrac{a}{b}}$`, r`$\dfrac{\sqrt{48}}{\sqrt{3}} = \sqrt{16} = 4$`, Math.sqrt(48) / Math.sqrt(3), 4], [r`$(\sqrt{a})^{2} = a$`, r`$(\sqrt{7})^{2} = 7$`, Math.sqrt(7) ** 2, 7], [r`$\sqrt{k^{2}m} = k\sqrt{m}$`, r`$\sqrt{50} = 5\sqrt{2}$`, Math.sqrt(50), 5 * sq2]];
laws.forEach(([, , a, b]) => must(near(a, b), 'surd laws'));
export const tLaws = table(['Law ($a, b > 0$)', 'Example'], laws.map(([l, e]) => [l, e]), 'Table of the laws of surds with an example each: root a times root b is root of a b, so root 12 times root 3 is 6; the quotient law gives root 48 over root 3 equal to 4; root 7 squared is 7; and root 50 is 5 root 2.', 'Laws for positive numbers $a$ and $b$.');

const sim = [72, 245, 396, 450];
export const tSimp = table(['Surd', 'Largest square factor', 'Simplified'], sim.map((n) => { const { k, m } = simplifySurd(n); must(near(Math.sqrt(n), k * Math.sqrt(m)) && m > 1, 'simplify'); return [`$\\sqrt{${n}}$`, `$${k * k}$`, `$${sd(0, 1, n)}$`]; }), 'Table of surds and their simplest forms: root 72 is 6 root 2, root 245 is 7 root 5, root 396 is 6 root 11 and root 450 is 15 root 2, found by taking out the largest square factor.', 'Take out the largest perfect-square factor.');
must(sd(0, 1, 72) === '6\\sqrt{2}' && sd(0, 1, 245) === '7\\sqrt{5}' && sd(0, 1, 396) === '6\\sqrt{11}' && sd(0, 1, 450) === '15\\sqrt{2}', 'surd simplifications');

const cmp = [['$\\sqrt{11}$', 11], ['$2\\sqrt{3}$', 12], ['$4$', 16], ['$3\\sqrt{2}$', 18]];
const cmpVals = [Math.sqrt(11), 2 * Math.sqrt(3), 4, 3 * sq2];
must(cmpVals.every((v, i) => near(v * v, cmp[i][1])) && cmpVals.every((v, i) => i === 0 || v > cmpVals[i - 1]), 'comparison');
export const tCmp = table(['Number', 'Square', 'Approximate value'], cmp.map(([t, sqv], i) => [t, `$${sqv}$`, `$${cmpVals[i].toFixed(3)}$`]), 'Table comparing four numbers by their squares: root 11 has square 11, 2 root 3 has square 12, 4 has square 16 and 3 root 2 has square 18, so in increasing order they are root 11, 2 root 3, 4 and 3 root 2.', 'Positive numbers have the same order as their squares.');

const idn = [[r`$(\sqrt{7} + \sqrt{3})(\sqrt{7} - \sqrt{3})$`, '$7 - 3 = 4$', (Math.sqrt(7) + Math.sqrt(3)) * (Math.sqrt(7) - Math.sqrt(3)), 4], [r`$(\sqrt{7} + \sqrt{3})^{2}$`, r`$10 + 2\sqrt{21}$`, (Math.sqrt(7) + Math.sqrt(3)) ** 2, 10 + 2 * Math.sqrt(21)], [r`$(2 + \sqrt{5})(2 - \sqrt{5})$`, '$4 - 5 = -1$', (2 + Math.sqrt(5)) * (2 - Math.sqrt(5)), -1]];
idn.forEach(([, , a, b]) => must(near(a, b), 'surd identities'));
export const tIdn = table(['Product', 'Result'], idn.map(([a, b]) => [a, b]), 'Table of surd products: root 7 plus root 3 times root 7 minus root 3 is 7 minus 3, which is 4; root 7 plus root 3 squared is 10 plus 2 root 21; and 2 plus root 5 times 2 minus root 5 is 4 minus 5, which is minus 1.', 'The product of a surd and its conjugate is rational.');

const w2 = [[r`$(2\sqrt{3} + \sqrt{5})(2\sqrt{3} - \sqrt{5})$`, '$12 - 5 = 7$', (2 * Math.sqrt(3) + Math.sqrt(5)) * (2 * Math.sqrt(3) - Math.sqrt(5)), 7], [r`$(\sqrt{7} + 2)^{2}$`, r`$7 + 4\sqrt{7} + 4 = 11 + 4\sqrt{7}$`, (Math.sqrt(7) + 2) ** 2, 11 + 4 * Math.sqrt(7)], [r`$(3\sqrt{2} - 1)^{2}$`, r`$18 - 6\sqrt{2} + 1 = 19 - 6\sqrt{2}$`, (3 * sq2 - 1) ** 2, 19 - 6 * sq2]];
w2.forEach(([, , a, b]) => must(near(a, b), 'worked example 2'));
must(smul([2, 1], [2, 1], 7).join() === '11,4' && smul([-1, 3], [-1, 3], 2).join() === '19,-6', 'expansions');
export const tEx2 = table(['Expression', 'Working and result'], w2.map(([a, b]) => [a, b]), 'Table for worked example 2: 2 root 3 plus root 5 times 2 root 3 minus root 5 is 12 minus 5, which is 7; root 7 plus 2 all squared is 11 plus 4 root 7; and 3 root 2 minus 1 all squared is 19 minus 6 root 2.', 'Use the identities, then collect like terms.');

const rr = [[r`$\dfrac{1}{\sqrt{7}}$`, r`$\dfrac{\sqrt{7}}{7}$`, 1 / Math.sqrt(7), Math.sqrt(7) / 7], [r`$\dfrac{1}{4 + \sqrt{3}}$`, r`$\dfrac{4 - \sqrt{3}}{13}$`, 1 / (4 + Math.sqrt(3)), (4 - Math.sqrt(3)) / 13], [r`$\dfrac{1}{\sqrt{6} - \sqrt{2}}$`, r`$\dfrac{\sqrt{6} + \sqrt{2}}{4}$`, 1 / (Math.sqrt(6) - sq2), (Math.sqrt(6) + sq2) / 4]];
rr.forEach(([, , a, b]) => must(near(a, b), 'rationalising table'));
export const tRat = table(['Fraction', 'Multiply by', 'Result'], [[rr[0][0], r`$\dfrac{\sqrt{7}}{\sqrt{7}}$`, rr[0][1]], [rr[1][0], r`$\dfrac{4 - \sqrt{3}}{4 - \sqrt{3}}$`, rr[1][1]], [rr[2][0], r`$\dfrac{\sqrt{6} + \sqrt{2}}{\sqrt{6} + \sqrt{2}}$`, rr[2][1]]], 'Table of rationalising: 1 over root 7 times root 7 over root 7 gives root 7 over 7; 1 over 4 plus root 3 times 4 minus root 3 over the same gives 4 minus root 3 over 13; 1 over root 6 minus root 2 times root 6 plus root 2 over the same gives root 6 plus root 2 over 4.', 'The conjugate removes the surd from the denominator.');

const x3a = 6 / (Math.sqrt(7) + sq2), x3b = (Math.sqrt(7) + 2) / (Math.sqrt(7) - 2);
// 6/(sqrt7 + sqrt2) = 6(sqrt7 - sqrt2)/5 ; (sqrt7+2)/(sqrt7-2) = (11 + 4 sqrt7)/3
const [pb, qb, db] = ratio(2, 1, -2, 1, 7);
must(near(x3a, (6 * Math.sqrt(7) - 6 * sq2) / 5) && sd(pb, qb, 7, db) === sd(11, 4, 7, 3) && near(x3b, (11 + 4 * Math.sqrt(7)) / 3), 'worked example 3');
export const tEx3 = table(['Step', r`$\dfrac{6}{\sqrt{7} + \sqrt{2}}$`, r`$\dfrac{\sqrt{7} + 2}{\sqrt{7} - 2}$`], [['Multiply by the conjugate', r`$\dfrac{6(\sqrt{7} - \sqrt{2})}{(\sqrt{7} + \sqrt{2})(\sqrt{7} - \sqrt{2})}$`, r`$\dfrac{(\sqrt{7} + 2)^{2}}{(\sqrt{7} - 2)(\sqrt{7} + 2)}$`], ['Denominator', '$7 - 2 = 5$', '$7 - 4 = 3$'], ['Result', r`$\dfrac{6\sqrt{7} - 6\sqrt{2}}{5}$`, r`$\dfrac{11 + 4\sqrt{7}}{3}$`]], 'Table for worked example 3: 6 over root 7 plus root 2 becomes 6 times root 7 minus root 2 over 5, since 7 minus 2 is 5; root 7 plus 2 over root 7 minus 2 becomes 11 plus 4 root 7 over 3, since 7 minus 4 is 3.', 'Check the answer numerically to 9 digits.');

const [p4, q4, d4] = ratio(3, 1, 3, -1, 7);
must(p4 === 16 && q4 === 6 && d4 === 2 && near((3 + Math.sqrt(7)) / (3 - Math.sqrt(7)), 8 + 3 * Math.sqrt(7)), 'worked example 4');
export const tEx4 = table(['Step', 'Working'], [['Multiply by the conjugate', r`$\dfrac{3 + \sqrt{7}}{3 - \sqrt{7}} \times \dfrac{3 + \sqrt{7}}{3 + \sqrt{7}}$`], ['Numerator', r`$(3 + \sqrt{7})^{2} = 9 + 6\sqrt{7} + 7 = 16 + 6\sqrt{7}$`], ['Denominator', '$9 - 7 = 2$'], ['Divide', r`$\dfrac{16 + 6\sqrt{7}}{2} = 8 + 3\sqrt{7}$, so $a = 8$, $b = 3$`]], 'Table for worked example 4: multiplying 3 plus root 7 over 3 minus root 7 by its conjugate gives 16 plus 6 root 7 over 2, which is 8 plus 3 root 7, so a is 8 and b is 3.', 'Compare with $a + b\\sqrt{7}$ to read $a$ and $b$.');

const ex = [[r`$2^{5} \times 2^{3} = 2^{8}$`, '$256$', 2 ** 5 * 2 ** 3, 256], [r`$(3^{2})^{3} = 3^{6}$`, '$729$', (3 ** 2) ** 3, 729], [r`$\dfrac{5^{7}}{5^{4}} = 5^{3}$`, '$125$', 5 ** 7 / 5 ** 4, 125], [r`$(2 \times 3)^{4} = 2^{4} \times 3^{4}$`, '$1296$', 6 ** 4, 1296], [r`$7^{0} = 1$ and $4^{-2} = \dfrac{1}{16}$`, '$1$ and $\\dfrac{1}{16}$', 4 ** -2, 1 / 16]];
ex.forEach(([, , a, b]) => must(near(a, b), 'exponent table'));
export const tExp = table(['Law and example', 'Value'], ex.map(([a, b]) => [a, b]), 'Table of laws of exponents with examples: 2 to the 5 times 2 cubed is 2 to the 8, 256; 3 squared cubed is 3 to the 6, 729; 5 to the 7 over 5 to the 4 is 5 cubed, 125; 2 times 3 to the 4 is 1296; 7 to the 0 is 1 and 4 to the minus 2 is one sixteenth.', 'Same base: add, subtract or multiply the exponents.');

const rp = [[64, 2, 3], [32, -2, 5], [27, 4, 3], [16, 3, 4], [49, -1, 2]];
export const tRP = table(['Power', 'Root first', 'Value'], rp.map(([a, p, q]) => { const v = ratPow(a, p, q); must(v && near(Math.pow(a, p / q), v.num()), `ratPow ${a}`); return [`$${powTex(a, p, q)}$`, `$${a}^{\\frac{1}{${q}}} = ${Math.round(a ** (1 / q))}$`, `$${v.tex()}$`]; }), 'Table of rational powers: 64 to the two thirds is 16, 32 to the minus two fifths is one quarter, 27 to the four thirds is 81, 16 to the three quarters is 8 and 49 to the minus one half is one seventh, found by taking the root first and then the power.', '$a^{\\frac{p}{q}} = \\left(a^{\\frac{1}{q}}\\right)^{p}$.');
must(ratPow(64, 2, 3).eq(F(16)) && ratPow(32, -2, 5).eq(F(1, 4)) && ratPow(27, 4, 3).eq(F(81)) && ratPow(16, 3, 4).eq(F(8)) && ratPow(49, -1, 2).eq(F(1, 7)), 'rational powers');

const e5 = (2 ** 5 * 3 ** -2) / (2 ** 2 * 3 ** -4);
must(near(e5, 72), 'worked example 5');
export const tEx5 = table(['Step', 'Working'], [['Subtract exponents of $2$', r`$2^{5 - 2} = 2^{3} = 8$`], ['Subtract exponents of $3$', r`$3^{-2 - (-4)} = 3^{2} = 9$`], ['Multiply', r`$8 \times 9 = 72$`]], 'Table for worked example 5: dividing powers of 2 gives 2 to the 5 minus 2, which is 2 cubed, 8; dividing powers of 3 gives 3 to the minus 2 minus minus 4, which is 3 squared, 9; the product is 72.', 'Group powers of the same base.');
const e6 = Math.pow(125, -2 / 3) / Math.pow(16, -3 / 4);
must(near(e6, 8 / 25) && ratPow(125, -2, 3).eq(F(1, 25)) && ratPow(16, -3, 4).eq(F(1, 8)), 'worked example 6');
export const tEx6 = table(['Step', 'Working'], [['First power', r`$125^{-\frac{2}{3}} = \dfrac{1}{(125^{\frac{1}{3}})^{2}} = \dfrac{1}{25}$`], ['Second power', r`$16^{-\frac{3}{4}} = \dfrac{1}{(16^{\frac{1}{4}})^{3}} = \dfrac{1}{8}$`], ['Divide', r`$\dfrac{1}{25} \div \dfrac{1}{8} = \dfrac{8}{25}$`]], 'Table for worked example 6: 125 to the minus two thirds is one over 25, 16 to the minus three quarters is one eighth, and one 25th divided by one eighth is 8 over 25.', 'A negative exponent means take the reciprocal.');

export const sumFlow2 = flow('LR', [['a', 'Laws of surds and simplifying'], ['b', 'Identities with surds'], ['c', 'Rationalising with the conjugate'], ['d', 'Laws of exponents and rational powers']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow: laws of surds and simplifying; identities with surds; rationalising the denominator with the conjugate; and laws of exponents with integral and rational powers.', 'Part 2 at a glance.');

export { near, lab, r };

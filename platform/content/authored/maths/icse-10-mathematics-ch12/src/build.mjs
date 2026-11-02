// Build ICSE 10 Mathematics ch12 Section and Mid-Point Formulae. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch12/src/build.mjs
// Every point, ratio, mid-point and centroid on the slides, in the notes, tables, flashcards and plots is
// computed by sect.mjs in exact fractions (section formula AND A + t(B - A); ratio from one coordinate checked by
// the other; axis and line cuts checked on the axis or line; centroid as the 2 : 1 point of all three medians);
// every typed working line is checked by work.mjs; every plotted point lies on a drawn segment and its label is
// generated from its coordinates.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { pt, same, is, section, ratioOf, cutAt, axisCut, lineCut, mid, otherEnd, centroid, thirdVertex, fourthVertex, fromMidpoints, between, ct, rt, lab, xy, must, secLine, midLine, centLine, endLine, thirdLine, fourthLine, F } from './sect.mjs';
import { steps, ARITH, eqctx, solvectx } from './work.mjs';

setUnit('icse-10-mathematics-ch12');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const S = (ctx, lines, msg) => steps(ctx, lines).must(msg);
const A = (lines, msg) => S(ARITH, lines, msg);
const K = (v, lines, msg) => S(eqctx('k', [F(v.n ?? v, v.d ?? 1)]), lines, msg);
const P = pt;
const d = (s) => `$${s}$`;

/**
 * A coordinate figure: labelled points and segments or polygons drawn as line series. Every marked point must
 * lie on a drawn segment (or be one of its ends); labels are generated from the coordinates.
 */
function fig({ x, y, pts = [], segs = [] }, alt, caption) {
  const edges = segs.flatMap(([, ps, closed]) => { const q = closed ? [...ps, ps[0]] : ps; return q.slice(1).map((b, i) => [q[i], b]); });
  for (const [name, q] of pts) must(edges.some(([a, b]) => between(a, b, q)), `figure point ${name} lies on a drawn segment`);
  return plot({ x, y, xl: 'x', yl: 'y', pts: pts.map(([name, q]) => [...xy(q), lab(name, q)]), series: segs.map(([label, ps, closed]) => ({ label, points: (closed ? [...ps, ps[0]] : ps).map(xy), kind: 'line' })) }, alt, caption);
}

// ================================================================ deck 1 figures and worked examples (asserted)
// Title: A(-6, -2), B(9, 8), P at 2 : 3
const tA = P(-6, -2), tB = P(9, 8), tP = section(tA, tB, 2, 3);
must(is(tP, [0, 2]), 'title P');
const fTitle = fig({ x: [-7, 10], y: [-3, 9], pts: [['A', tA], ['P', tP], ['B', tB]], segs: [['segment AB', [tA, tB]]] }, 'A segment from A at (−6, −2) up to B at (9, 8), with the point P at (0, 2) on it, two-fifths of the way from A to B, so that AP to PB is 2 to 3.', '$P$ splits $AB$ into $2$ parts and $3$ parts: $AP : PB = 2 : 3$.');

// Meaning: A(1, 1), B(10, 7); P at 1 : 2 and the other mark T at 2 : 1
const mA = P(1, 1), mB = P(10, 7), mP = section(mA, mB, 1, 2), mT = section(mA, mB, 2, 1), mK = P(4, 1), mL = P(10, 3);
must(is(mP, [4, 3]) && is(mT, [7, 5]), 'meaning points');
const fMean = fig({ x: [0, 11], y: [0, 8], pts: [['A', mA], ['P', mP], ['T', mT], ['B', mB]], segs: [['segment AB in three equal parts', [mA, mB]]] }, 'A segment from A at (1, 1) to B at (10, 7) cut into three equal parts by P at (4, 3) and T at (7, 5). AP is one part and PB is two parts, so P divides AB internally in the ratio 1 to 2.', '$AP$ is $1$ part, $PB$ is $2$ parts: $P$ divides $AB$ internally in the ratio $1 : 2$.');
const wWhy = A([r`\dfrac{4 - 1}{10 - 4} = \dfrac{3}{6} = \dfrac{1}{2}`, r`\dfrac{3 - 1}{7 - 3} = \dfrac{2}{4} = \dfrac{1}{2}`], 'derivation example');
const fWhy = fig({ x: [0, 11], y: [0, 8], pts: [['A', mA], ['P', mP], ['B', mB], ['K', mK], ['L', mL]], segs: [['segment AB', [mA, mB]], ['triangle AKP', [mA, mK, mP]], ['triangle PLB', [mP, mL, mB]]] }, 'The segment from A (1, 1) to B (10, 7) with P (4, 3) on it. A horizontal step from A to K (4, 1) and a vertical step up to P make the right triangle AKP; a horizontal step from P to L (10, 3) and a vertical step up to B make the right triangle PLB. The two triangles are similar.', 'Similar triangles: $\\dfrac{AK}{PL} = \\dfrac{KP}{LB} = \\dfrac{AP}{PB}$.');

const fFormula = flow('LR', [['a', 'Write $A(x_1, y_1)$, $B(x_2, y_2)$ and $m_1 : m_2$'], ['b', 'Multiply: $m_1$ with $B$, $m_2$ with $A$'], ['c', 'Add the two products'], ['e', 'Divide by $m_1 + m_2$']], [['a', 'b'], ['b', 'c'], ['c', 'e']], 'Flow chart for the section formula: write down the two end points and the ratio, multiply the first part of the ratio by the coordinates of the far end B and the second part by those of A, add the products, then divide by the sum of the ratio parts. Do this once for x and once for y.', 'The same four steps give the $x$-coordinate and the $y$-coordinate.');

// WE1: A(-5, 9), B(5, -6), 2 : 3
const e1A = P(-5, 9), e1B = P(5, -6), e1P = section(e1A, e1B, 2, 3), w1 = A([secLine(e1A, e1B, 2, 3, 0), secLine(e1A, e1B, 2, 3, 1)], 'WE1');
must(is(e1P, [-1, 3]), 'WE1 P');
const fWE1 = fig({ x: [-6, 6], y: [-7, 10], pts: [['A', e1A], ['P', e1P], ['B', e1B]], segs: [['segment AB', [e1A, e1B]]] }, 'Worked example 1: the segment from A (−5, 9) down to B (5, −6), with P (−1, 3) on it, two-fifths of the way from A.', '$AP : PB = 2 : 3$ gives $P(-1, 3)$.');

// Trisection table and WE2: A(-7, 2), B(8, -4)
const tTri = table(['Where $P$ is on $AB$', 'Ratio $AP : PB$'], [['halfway (the mid-point)', '$1 : 1$'], ['one-third of the way from $A$ (trisection point nearer $A$)', '$1 : 2$'], ['two-thirds of the way from $A$ (trisection point nearer $B$)', '$2 : 1$'], ['one-quarter of the way from $A$', '$1 : 3$'], ['two-fifths of the way from $A$', '$2 : 3$']], 'Table turning fractions of a segment into ratios: halfway is 1 to 1; one-third of the way from A is 1 to 2; two-thirds of the way is 2 to 1; one-quarter of the way is 1 to 3; two-fifths of the way is 2 to 3.', 'A fraction $\\dfrac{a}{b}$ of the way from $A$ means $AP : PB = a : (b - a)$.');
must(['1 : 2', '2 : 1', '1 : 3', '2 : 3'].join() === [[1, 3], [2, 3], [1, 4], [2, 5]].map(([a, b]) => rt(ratioOf(mA, mB, section(mA, mB, a, b - a)))).join(), 'trisection table');
const e2A = P(-7, 2), e2B = P(8, -4), e2P = section(e2A, e2B, 1, 2), e2Q = section(e2A, e2B, 2, 1);
const w2 = A([secLine(e2A, e2B, 1, 2, 0), secLine(e2A, e2B, 1, 2, 1), secLine(e2A, e2B, 2, 1, 0), secLine(e2A, e2B, 2, 1, 1)], 'WE2');
must(is(e2P, [-2, 0]) && is(e2Q, [3, -2]) && same(mid(e2P, e2B), e2Q), 'WE2 points');
const fWE2 = fig({ x: [-8, 9], y: [-5, 3], pts: [['A', e2A], ['P', e2P], ['Q', e2Q], ['B', e2B]], segs: [['segment AB', [e2A, e2B]]] }, 'Worked example 2: the segment from A (−7, 2) to B (8, −4) cut into three equal parts by P (−2, 0), which lies on the x-axis, and Q (3, −2).', '$P$: ratio $1 : 2$; $Q$: ratio $2 : 1$.');

// Finding the ratio
const fRatio = flow('TB', [['a', 'Call the ratio $k : 1$'], ['b', 'Write one coordinate of $P$ in terms of $k$'], ['c', 'Equate it to the known value and solve for $k$'], ['e', 'Check with the other coordinate'], ['f', 'Write $k : 1$ in whole numbers']], [['a', 'b'], ['b', 'c'], ['c', 'e'], ['e', 'f']], 'Flow chart for finding a ratio: call the ratio k to 1, write one coordinate of the dividing point in terms of k, set it equal to the known value and solve for k, check with the other coordinate, then write the ratio in whole numbers.', 'One unknown, $k$, needs only one equation.');

// WE3: P(1, -1) on A(-5, 3), B(4, -3)
const e3A = P(-5, 3), e3B = P(4, -3), e3P = P(1, -1);
const w3 = K(2, [r`\dfrac{4k + (-5)}{k + 1} = 1 \Rightarrow 4k - 5 = k + 1 \Rightarrow 3k = 6 \Rightarrow k = 2`], 'WE3'), w3b = A([secLine(e3A, e3B, 2, 1, 1)], 'WE3 check');
must(rt(ratioOf(e3A, e3B, e3P)) === '2 : 1', 'WE3 ratio');
const fWE3 = fig({ x: [-6, 5], y: [-4, 4], pts: [['A', e3A], ['P', e3P], ['B', e3B]], segs: [['segment AB', [e3A, e3B]]] }, 'Worked example 3: the segment from A (−5, 3) to B (4, −3) with the point P (1, −1) on it, two-thirds of the way from A, so AP is twice PB.', '$AP : PB = 2 : 1$.');

// Axes: A(-4, 6), B(8, -3)
const xA = P(-4, 6), xB = P(8, -3), xY = axisCut(xA, xB, 'y'), xX = axisCut(xA, xB, 'x');
must(is(xY.P, [0, 3]) && rt(xY.r) === '1 : 2' && is(xX.P, [4, 0]) && rt(xX.r) === '2 : 1', 'axis figure');
const fAxes = fig({ x: [-5, 9], y: [-4, 7], pts: [['A', xA], ['P', xY.P], ['Q', xX.P], ['B', xB]], segs: [['segment AB', [xA, xB]]] }, 'The segment from A (−4, 6) to B (8, −3) crosses the y-axis at P (0, 3) and the x-axis at Q (4, 0). At P the x-coordinate is zero; at Q the y-coordinate is zero.', 'On the $y$-axis $x = 0$; on the $x$-axis $y = 0$.');

// WE4: A(-2, -5), B(6, 7)
const e4A = P(-2, -5), e4B = P(6, 7), e4Y = axisCut(e4A, e4B, 'y'), e4X = axisCut(e4A, e4B, 'x');
const w4 = K(F(1, 3), [r`\dfrac{6k + (-2)}{k + 1} = 0 \Rightarrow 6k = 2 \Rightarrow k = \dfrac{1}{3}`], 'WE4 y-axis'), w4b = K(F(5, 7), [r`\dfrac{7k + (-5)}{k + 1} = 0 \Rightarrow 7k = 5 \Rightarrow k = \dfrac{5}{7}`], 'WE4 x-axis'), w4c = A([secLine(e4A, e4B, 1, 3, 1), secLine(e4A, e4B, 5, 7, 0)], 'WE4 points');
must(rt(e4Y.r) === '1 : 3' && is(e4Y.P, [0, -2]) && rt(e4X.r) === '5 : 7' && is(e4X.P, [[4, 3], 0]), 'WE4');
const fWE4 = fig({ x: [-3, 7], y: [-6, 8], pts: [['A', e4A], ['P', e4Y.P], ['Q', e4X.P], ['B', e4B]], segs: [['segment AB', [e4A, e4B]]] }, 'Worked example 4: the segment from A (−2, −5) to B (6, 7) crosses the y-axis at P (0, −2), a quarter of the way along, and the x-axis at Q (4/3, 0).', 'The $y$-axis cuts $AB$ in the ratio $1 : 3$, the $x$-axis in the ratio $5 : 7$.');

// WE5: the line x + y = 3 and A(-2, 1), B(7, 4)
const e5A = P(-2, 1), e5B = P(7, 4), e5 = lineCut(e5A, e5B, [1, 1, 3]);
const w5 = K(F(1, 2), [r`(7k - 2) + (4k + 1) = 3(k + 1) \Rightarrow 11k - 1 = 3k + 3 \Rightarrow 8k = 4 \Rightarrow k = \dfrac{1}{2}`], 'WE5'), w5b = A([secLine(e5A, e5B, 1, 2, 0), secLine(e5A, e5B, 1, 2, 1), r`1 + 2 = 3`], 'WE5 point');
must(rt(e5.r) === '1 : 2' && is(e5.P, [1, 2]), 'WE5');
const lnA = P(-3, 6), lnB = P(6, -3);
must(lnA[0].add(lnA[1]).eq(3) && lnB[0].add(lnB[1]).eq(3), 'drawn line is x + y = 3');
const fWE5 = fig({ x: [-3, 8], y: [-3, 6], pts: [['A', e5A], ['P', e5.P], ['B', e5B]], segs: [['segment AB', [e5A, e5B]], ['line x + y = 3', [lnA, lnB]]] }, 'Worked example 5: the segment from A (−2, 1) to B (7, 4) and the straight line x + y = 3 running down from (−3, 6) to (6, −3). They meet at P (1, 2), one-third of the way from A to B.', 'The line $x + y = 3$ cuts $AB$ in the ratio $1 : 2$ at $P(1, 2)$.');

// WE6: P(-3, b) on A(-6, 5), B(3, -7)
const e6A = P(-6, 5), e6B = P(3, -7), e6 = cutAt(e6A, e6B, 0, -3);
const w6 = K(F(1, 2), [r`\dfrac{3k + (-6)}{k + 1} = -3 \Rightarrow 3k - 6 = -3k - 3 \Rightarrow 6k = 3 \Rightarrow k = \dfrac{1}{2}`], 'WE6'), w6b = A([secLine(e6A, e6B, 1, 2, 1)], 'WE6 b');
must(rt(e6.r) === '1 : 2' && is(e6.P, [-3, 1]), 'WE6');
const fWE6 = fig({ x: [-7, 4], y: [-8, 6], pts: [['A', e6A], ['P', e6.P], ['B', e6B]], segs: [['segment AB', [e6A, e6B]]] }, 'Worked example 6: the segment from A (−6, 5) to B (3, −7) with the point P (−3, 1) on it, one-third of the way from A.', 'The known $x$-coordinate gives the ratio; the ratio gives $b$.');

const tMethod = table(['You are given', 'Do this'], [['the ends and the ratio', 'section formula for $x$ and for $y$'], ['the ends and a point on $AB$', 'ratio $k : 1$ from one coordinate, check with the other'], ['an axis that crosses $AB$', '$x = 0$ (the $y$-axis) or $y = 0$ (the $x$-axis), then solve for $k$'], ['a line $ax + by = c$ that crosses $AB$', 'put the $k : 1$ point into the equation of the line'], ['one coordinate of a point on $AB$', 'find $k$ from it, then the other coordinate']], 'Table of methods: with the ends and the ratio, use the section formula; with a point on the segment, find k from one coordinate and check with the other; for an axis, set x or y to zero; for a line, substitute the k to 1 point into its equation; with one coordinate of a point, find k and then the other coordinate.', 'Every ratio problem becomes one equation in $k$.');
const tSum1 = table(['Idea', 'Key fact'], [['Internal division', '$P$ on $AB$ with $AP : PB = m_1 : m_2$'], ['Section formula', '$\\left(\\dfrac{m_1x_2 + m_2x_1}{m_1 + m_2}, \\dfrac{m_1y_2 + m_2y_1}{m_1 + m_2}\\right)$'], ['Points of trisection', 'ratios $1 : 2$ and $2 : 1$'], ['Unknown ratio', 'take $k : 1$; one coordinate gives $k$'], ['Axis or line', '$y = 0$, $x = 0$, or the equation of the line']], 'Summary table for part 1: internal division means P lies on AB with AP to PB equal to m one to m two; the section formula; the points of trisection use the ratios 1 to 2 and 2 to 1; for an unknown ratio take k to 1; for an axis or a line use y equals 0, x equals 0 or the equation of the line.', 'Part 1 on one card.');

// ================================================================ deck 2 figures and worked examples (asserted)
// Title: triangle K(-5, -3), L(7, -1), M(1, 7) with its medians
const tK = P(-5, -3), tL = P(7, -1), tM = P(1, 7), tG = centroid(tK, tL, tM), mLM = mid(tL, tM), mMK = mid(tM, tK), mKL = mid(tK, tL);
must(is(tG, [1, 1]) && is(mLM, [4, 3]) && is(mMK, [-2, 2]) && is(mKL, [1, -2]), 'title medians');
const fTitle2 = fig({ x: [-6, 8], y: [-4, 8], pts: [['K', tK], ['L', tL], ['M', tM], ['G', tG]], segs: [['triangle KLM', [tK, tL, tM], true], ['median from K', [tK, mLM]], ['median from L', [tL, mMK]], ['median from M', [tM, mKL]]] }, 'Triangle KLM with corners K (−5, −3), L (7, −1) and M (1, 7). Each corner is joined to the mid-point of the opposite side, and the three medians meet at G (1, 1).', 'The three medians meet at one point, the centroid $G(1, 1)$.');

// Mid-point: A(-4, -1), B(6, 5), M(1, 2)
const qA = P(-4, -1), qB = P(6, 5), qM = mid(qA, qB);
must(is(qM, [1, 2]), 'mid-point figure');
const fMid = fig({ x: [-5, 7], y: [-2, 6], pts: [['A', qA], ['M', qM], ['B', qB]], segs: [['segment AB', [qA, qB]]] }, 'The segment from A (−4, −1) to B (6, 5) with its mid-point M (1, 2): M is 5 units across and 3 units up from A, and B is another 5 across and 3 up from M.', '$M$ is the average of the ends: $\\left(\\dfrac{-4 + 6}{2}, \\dfrac{-1 + 5}{2}\\right) = (1, 2)$.');
A([r`\dfrac{-4 + 6}{2} = 1`, r`\dfrac{-1 + 5}{2} = 2`], 'mid-point caption');

// WE1 (deck 2): mid-point of A(-7, 4), B(3, -10)
const f1A = P(-7, 4), f1B = P(3, -10), f1M = mid(f1A, f1B), v1 = A([midLine(f1A, f1B, 0), midLine(f1A, f1B, 1)], 'deck 2 WE1');
must(is(f1M, [-2, -3]), 'deck 2 WE1');
const fW21 = fig({ x: [-8, 4], y: [-11, 5], pts: [['A', f1A], ['M', f1M], ['B', f1B]], segs: [['segment AB', [f1A, f1B]]] }, 'Worked example 1 of part 2: the segment from A (−7, 4) to B (3, −10) with its mid-point M (−2, −3).', '$M(-2, -3)$ is halfway from $A$ to $B$.');

// End point: A(-5, -2), M(-1, 1), B(3, 4)
const nA = P(-5, -2), nM = P(-1, 1), nB = otherEnd(nA, nM);
must(is(nB, [3, 4]), 'end point figure');
const fEnd = fig({ x: [-6, 4], y: [-3, 5], pts: [['A', nA], ['M', nM], ['B', nB]], segs: [['A to M', [nA, nM]], ['M to B, the same step again', [nM, nB]]] }, 'A at (−5, −2), the mid-point M at (−1, 1), and the far end B at (3, 4). The step from A to M is 4 across and 3 up; the same step from M reaches B.', 'From $A$ to $M$, then the same step again: $B = (2x - x_1, 2y - y_1)$.');

// WE2 (deck 2): A(6, -1), M(2, 3); unknowns
const f2A = P(6, -1), f2M = P(2, 3), f2B = otherEnd(f2A, f2M), v2 = A([endLine(f2A, f2M, 0), endLine(f2A, f2M, 1)], 'deck 2 WE2');
const v2b = S(solvectx(['a', 'b'], { a: 4, b: -6 }), [r`\dfrac{a + (-2)}{2} = 1 \Rightarrow a - 2 = 2 \Rightarrow a = 4`, r`\dfrac{4 + b}{2} = -1 \Rightarrow 4 + b = -2 \Rightarrow b = -6`], 'deck 2 WE2 unknowns');
must(is(f2B, [-2, 7]) && is(mid(P(4, 4), P(-2, -6)), [1, -1]), 'deck 2 WE2');
const fW22 = fig({ x: [-3, 7], y: [-2, 8], pts: [['A', f2A], ['M', f2M], ['B', f2B]], segs: [['segment AB', [f2A, f2B]]] }, 'Worked example 2 of part 2: A (6, −1), the mid-point M (2, 3), and the far end B (−2, 7) found by taking the step from A to M once more.', '$B(-2, 7)$: check that $M$ is halfway.');

// Parallelogram concept: P(0, 0), Q(6, 1), R(8, 5), S(2, 4)
const gP = P(0, 0), gQ = P(6, 1), gR = P(8, 5), gS = fourthVertex(gP, gQ, gR), gM = mid(gP, gR);
must(is(gS, [2, 4]) && same(gM, mid(gQ, gS)), 'parallelogram figure');
const fPar = fig({ x: [-1, 9], y: [-1, 6], pts: [['P', gP], ['Q', gQ], ['R', gR], ['S', gS], ['M', gM]], segs: [['parallelogram PQRS', [gP, gQ, gR, gS], true], ['diagonal PR', [gP, gR]], ['diagonal QS', [gQ, gS]]] }, 'Parallelogram PQRS with P (0, 0), Q (6, 1), R (8, 5) and S (2, 4). The diagonals PR and QS cross at M (4, 5/2), the mid-point of each of them.', 'The diagonals of a parallelogram bisect each other.');

// WE3 (deck 2): A(-2, -1), B(4, 0), C(5, 4)
const f3 = [P(-2, -1), P(4, 0), P(5, 4)], f3M = mid(f3[0], f3[2]), f3D = otherEnd(f3[1], f3M), v3 = A([midLine(f3[0], f3[2], 0), midLine(f3[0], f3[2], 1), endLine(f3[1], f3M, 0), endLine(f3[1], f3M, 1)], 'deck 2 WE3');
must(same(f3D, fourthVertex(...f3)) && is(f3D, [-1, 3]), 'deck 2 WE3');
const fW23 = fig({ x: [-3, 6], y: [-2, 5], pts: [['A', f3[0]], ['B', f3[1]], ['C', f3[2]], ['D', f3D], ['M', f3M]], segs: [['parallelogram ABCD', [...f3, f3D], true], ['diagonal AC', [f3[0], f3[2]]], ['diagonal BD', [f3[1], f3D]]] }, 'Worked example 3 of part 2: parallelogram ABCD with A (−2, −1), B (4, 0), C (5, 4) and the fourth vertex D (−1, 3). The diagonals cross at M (3/2, 3/2).', '$M$ is the mid-point of $AC$ and of $BD$.');

// Median concept: A(0, 6), B(-4, -3), C(7, -3)
const hA = P(0, 6), hB = P(-4, -3), hC = P(7, -3), hD = mid(hB, hC), hG = centroid(hA, hB, hC);
must(is(hG, [1, 0]) && is(hD, [[3, 2], -3]) && rt(ratioOf(hA, hD, hG)) === '2 : 1', 'median figure');
const fMed = fig({ x: [-5, 8], y: [-4, 7], pts: [['A', hA], ['B', hB], ['C', hC], ['D', hD], ['G', hG]], segs: [['triangle ABC', [hA, hB, hC], true], ['median AD', [hA, hD]]] }, 'Triangle ABC with A (0, 6), B (−4, −3) and C (7, −3). The median from A goes to D (3/2, −3), the mid-point of BC. The centroid G (1, 0) lies on it, two-thirds of the way from A to D.', '$AG : GD = 2 : 1$.');

const fCent = flow('LR', [['a', 'Mid-point $D$ of $BC$: $\\left(\\dfrac{x_2 + x_3}{2}, \\dfrac{y_2 + y_3}{2}\\right)$'], ['b', '$G$ divides $AD$ in the ratio $2 : 1$'], ['c', 'Section formula on $A$ and $D$'], ['e', '$G = \\left(\\dfrac{x_1 + x_2 + x_3}{3}, \\dfrac{y_1 + y_2 + y_3}{3}\\right)$']], [['a', 'b'], ['b', 'c'], ['c', 'e']], 'Flow chart for the centroid formula: find the mid-point D of BC, use the fact that the centroid divides the median AD in the ratio 2 to 1, apply the section formula to A and D, and simplify to the average of the three vertices.', 'Twice the mid-point of $BC$ is the sum of $B$ and $C$, so the result is an average.');

// WE4 (deck 2): A(-3, 5), B(7, 1), C(2, -9)
const f4 = [P(-3, 5), P(7, 1), P(2, -9)], f4G = centroid(...f4), f4D = mid(f4[1], f4[2]), v4 = A([centLine(...f4, 0), centLine(...f4, 1), midLine(f4[1], f4[2], 0), midLine(f4[1], f4[2], 1), secLine(f4[0], f4D, 2, 1, 0), secLine(f4[0], f4D, 2, 1, 1)], 'deck 2 WE4');
must(is(f4G, [2, -1]) && is(f4D, [[9, 2], -4]), 'deck 2 WE4');
const fW24 = fig({ x: [-4, 8], y: [-10, 6], pts: [['A', f4[0]], ['B', f4[1]], ['C', f4[2]], ['D', f4D], ['G', f4G]], segs: [['triangle ABC', f4, true], ['median AD', [f4[0], f4D]]] }, 'Worked example 4 of part 2: triangle ABC with A (−3, 5), B (7, 1), C (2, −9), the median from A to D (9/2, −4), the mid-point of BC, and the centroid G (2, −1) on it.', '$G(2, -1)$ by the formula and by the median agree.');

// WE5 (deck 2): G(1, 2), A(-4, 3), B(5, -1)
const f5A = P(-4, 3), f5B = P(5, -1), f5G = P(1, 2), f5C = thirdVertex(f5A, f5B, f5G), v5 = A([thirdLine(f5A, f5B, f5G, 0), thirdLine(f5A, f5B, f5G, 1), centLine(f5A, f5B, f5C, 0), centLine(f5A, f5B, f5C, 1)], 'deck 2 WE5');
must(is(f5C, [2, 4]), 'deck 2 WE5');
const f5N = mid(f5A, f5B);
const fW25 = fig({ x: [-5, 6], y: [-2, 5], pts: [['A', f5A], ['B', f5B], ['C', f5C], ['G', f5G]], segs: [['triangle ABC', [f5A, f5B, f5C], true], ['median from C', [f5C, f5N]]] }, 'Worked example 5 of part 2: A (−4, 3) and B (5, −1) are given with the centroid G (1, 2); the third vertex is C (2, 4), and G lies on the median from C.', '$C = (3 \\times 1 - (-4) - 5, \\ 3 \\times 2 - 3 - (-1)) = (2, 4)$.');

// Medial triangle concept: A(-3, -2), B(5, -2), C(1, 7)
const iV = [P(-3, -2), P(5, -2), P(1, 7)], iM = [mid(iV[1], iV[2]), mid(iV[2], iV[0]), mid(iV[0], iV[1])], iG = centroid(...iV);
must(same(iG, centroid(...iM)) && is(iG, [1, 1]), 'medial triangle');
const fMedial = fig({ x: [-4, 6], y: [-3, 8], pts: [['A', iV[0]], ['B', iV[1]], ['C', iV[2]], ['D', iM[0]], ['E', iM[1]], ['F', iM[2]]], segs: [['triangle ABC', iV, true], ['triangle DEF of mid-points', iM, true]] }, 'Triangle ABC with A (−3, −2), B (5, −2), C (1, 7), and inside it the triangle DEF joining the mid-points D (3, 5/2), E (−1, 5/2) and F (1, −2) of its sides. Both triangles have centroid (1, 1).', 'Triangles $ABC$ and $DEF$ share the centroid $(1, 1)$.');

// WE6 (deck 2): mid-points D(1, 4), E(-2, 1), F(4, -2)
const f6D = P(1, 4), f6E = P(-2, 1), f6F = P(4, -2), [f6A, f6B, f6C] = fromMidpoints(f6D, f6E, f6F);
const v6 = A([fourthLine(f6E, f6D, f6F, 0), fourthLine(f6E, f6D, f6F, 1), fourthLine(f6F, f6E, f6D, 0), fourthLine(f6F, f6E, f6D, 1), fourthLine(f6D, f6F, f6E, 0), fourthLine(f6D, f6F, f6E, 1)], 'deck 2 WE6');
must(is(f6A, [1, -5]) && is(f6B, [7, 1]) && is(f6C, [-5, 7]) && same(fourthVertex(f6A, f6F, f6D), f6E), 'deck 2 WE6');
const fW26 = fig({ x: [-6, 8], y: [-6, 8], pts: [['A', f6A], ['B', f6B], ['C', f6C], ['D', f6D], ['E', f6E], ['F', f6F]], segs: [['triangle ABC', [f6A, f6B, f6C], true], ['parallelogram AFDE', [f6A, f6F, f6D, f6E], true]] }, 'Worked example 6 of part 2: the mid-points D (1, 4), E (−2, 1) and F (4, −2) of the sides of triangle ABC, and the vertices found from them, A (1, −5), B (7, 1) and C (−5, 7). The parallelogram AFDE is drawn inside.', '$AFDE$ is a parallelogram, so $A$ is its fourth vertex.');

const tWhich = table(['You know', 'You want', 'Use'], [['both ends', 'the mid-point', '$\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)$'], ['one end and the mid-point', 'the other end', '$(2x - x_1, 2y - y_1)$'], ['three vertices of a parallelogram', 'the fourth', 'diagonals share their mid-point'], ['three vertices', 'the centroid', '$\\left(\\dfrac{x_1 + x_2 + x_3}{3}, \\dfrac{y_1 + y_2 + y_3}{3}\\right)$'], ['two vertices and the centroid', 'the third vertex', '$(3x - x_1 - x_2, 3y - y_1 - y_2)$']], 'Table of which formula to use: both ends give the mid-point; one end and the mid-point give the other end; three vertices of a parallelogram give the fourth because the diagonals share their mid-point; three vertices give the centroid; two vertices and the centroid give the third vertex.', 'Five situations, five one-line formulas.');
const tSum2 = table(['Idea', 'Key fact'], [['Mid-point', 'average of the ends: the $1 : 1$ section point'], ['Other end', '$(2x - x_1, 2y - y_1)$'], ['Parallelogram', 'the diagonals bisect each other'], ['Centroid', 'average of the three vertices; $2 : 1$ on every median'], ['Mid-point triangle', 'the same centroid as the triangle']], 'Summary table for part 2: the mid-point is the average of the ends; the other end is two times the mid-point minus the known end; the diagonals of a parallelogram bisect each other; the centroid is the average of the vertices and divides every median 2 to 1; the triangle of mid-points has the same centroid.', 'Part 2 on one card.');

// ================================================================ decks
const d1 = deck({
  part: 1,
  title: 'Section and Mid-Point Formulae — Part 1: The section formula',
  goals: ['Explain what it means for a point to divide a segment internally in a given ratio', 'Find the point dividing a segment internally in a given ratio, including points of trisection', 'Find the ratio in which a given point divides a segment', 'Find the ratio in which an axis or a line divides a segment, and the point of division'],
  slides: [
    sl('title', 'Section and mid-point formulae, Part 1', { b: 'A point on a segment splits it into two parts. The **section formula** gives the coordinates of that point from the two ends and the **ratio** of the parts.', v: fTitle, n: 'Welcome to the section formula. A point on a line segment splits it into two pieces. If we know the two ends and how the pieces compare, we can find the exact coordinates of the point. Here P sits two fifths of the way from A to B, so the two pieces are in the ratio two to three.' }),
    sl('concept', 'What you will be able to do', { ul: ['Explain **internal division** in a ratio $m_1 : m_2$', 'Use the **section formula**, including **points of trisection**', 'Find the **ratio** in which a given point divides a segment', 'Find where an **axis** or a **line** cuts a segment, and in what ratio'], n: 'These are the goals for part one. First, what dividing a segment in a ratio means. Then the section formula and the points that cut a segment into three equal parts. Finally we turn the question round and find the ratio itself, including the ratio in which an axis or another line cuts the segment.' }),
    sl('concept', 'Dividing a segment internally', { b: '$P$ divides $AB$ **internally** in the ratio $m_1 : m_2$ when $P$ lies on the segment $AB$ and', m: [r`\dfrac{AP}{PB} = \dfrac{m_1}{m_2}`], ul: ['$m_1$ goes with the part next to $A$, $m_2$ with the part next to $B$', 'if $m_1 < m_2$, $P$ is **nearer to $A$**', 'the ratio $1 : 1$ gives the **mid-point**'], v: fMean, n: 'Here the segment from A to B is cut into three equal parts. The point P is one part from A and two parts from B, so P divides A B internally in the ratio one to two. Internally means the point lies between A and B. The smaller share of the ratio is always on the side nearer to the point.' }),
    sl('concept', 'Why the formula works', { b: 'Draw horizontal and vertical steps from $A$ to $P$ and from $P$ to $B$. The right triangles $AKP$ and $PLB$ are **similar**, so their sides are in the ratio $m_1 : m_2$:', m: [r`\dfrac{x - x_1}{x_2 - x} = \dfrac{m_1}{m_2} \Rightarrow m_2(x - x_1) = m_1(x_2 - x) \Rightarrow x = \dfrac{m_1x_2 + m_2x_1}{m_1 + m_2}`], ul: [`Here ${wWhy.md[0]} and ${wWhy.md[1]}: both steps are in the ratio $1 : 2$, like $AP : PB$.`], v: fWhy, n: 'Why does the formula work? The small right triangle from A to P and the bigger one from P to B have the same angles, so they are similar. Their horizontal sides are in the same ratio as A P to P B, and so are their vertical sides. Solving that proportion for x gives the section formula. The y coordinate works the same way.' }),
    sl('concept', 'The section formula', { b: 'The point $P$ dividing the join of $A(x_1, y_1)$ and $B(x_2, y_2)$ internally in the ratio $m_1 : m_2$ is', m: [r`P\left(\dfrac{m_1x_2 + m_2x_1}{m_1 + m_2}, \ \dfrac{m_1y_2 + m_2y_1}{m_1 + m_2}\right)`], ul: ['$m_1$ multiplies the coordinates of the **far end** $B$', 'divide by the **sum** of the ratio parts'], v: fFormula, n: 'Here is the section formula. Notice the cross pairing: the first part of the ratio multiplies the coordinates of B, the far end, and the second part multiplies the coordinates of A. Add the two products and divide by the sum of the ratio parts. Do this once for x and once for y.' }),
    sl('example', 'Worked example 1: using the formula', { b: 'Find the point $P$ that divides the join of $A(-5, 9)$ and $B(5, -6)$ internally in the ratio $2 : 3$.', ul: ['**Step 1 —** $m_1 = 2$ goes with $B(5, -6)$; $m_2 = 3$ goes with $A(-5, 9)$.', `**Step 2 —** $x = ${w1.lines[0]}$`, `**Step 3 —** $y = ${w1.lines[1]}$`, `**Answer —** $P${ct(e1P)}$.`], v: fWE1, n: 'Pair the two with B and the three with A. For x, two times five plus three times minus five is minus five, and minus five over five is minus one. For y, two times minus six plus three times nine is fifteen, and fifteen over five is three. So P is minus one, three.' }),
    sl('check', 'Quick check: the formula', { b: 'Which end does $m_1$ multiply?', chk: 'm01', n: 'Remember the cross pairing. Which end does the first part of the ratio go with?' }),
    sl('concept', 'Points of trisection and other fractions', { b: 'The two **points of trisection** cut $AB$ into three equal parts. Turn "a fraction of the way along" into a ratio:', v: tTri, n: 'Two points cut a segment into three equal parts. The one nearer A divides it in the ratio one to two, and the one nearer B in the ratio two to one. In the same way, a quarter of the way along means one to three, not one to four, because the other part is three quarters.' }),
    sl('example', 'Worked example 2: points of trisection', { b: 'Find the points of trisection of the segment joining $A(-7, 2)$ and $B(8, -4)$.', ul: [`**Step 1 —** nearer $A$, ratio $1 : 2$: $x = ${w2.lines[0]}$, $y = ${w2.lines[1]}$, so $P${ct(e2P)}$.`, `**Step 2 —** nearer $B$, ratio $2 : 1$: $x = ${w2.lines[2]}$, $y = ${w2.lines[3]}$, so $Q${ct(e2Q)}$.`, '**Check —** $Q$ is the mid-point of $PB$.'], v: fWE2, n: 'For the point nearer A use one to two: x is minus six over three, which is minus two, and y is zero, so P is minus two, zero. For the point nearer B use two to one: x is three and y is minus two. A quick check: Q should be halfway between P and B, and it is.' }),
    sl('check', 'Quick check: nearer which end?', { b: 'The smaller share is next to which end?', chk: 'm11', n: 'Which part of the ratio is smaller, and which end is it next to?' }),
    sl('concept', 'Finding the ratio', { b: 'When the point is known but the ratio is not, call the ratio $k : 1$. Then the point is', m: [r`\left(\dfrac{kx_2 + x_1}{k + 1}, \ \dfrac{ky_2 + y_1}{k + 1}\right)`], ul: ['use **one** coordinate to find $k$', 'use the **other** to check', 'if $k$ is a fraction, write $k : 1$ in whole numbers'], v: fRatio, n: 'Sometimes we know the point and want the ratio. Call the ratio k to one, so there is only one unknown. Write one coordinate of the point in terms of k, set it equal to the known value, and solve. Then use the other coordinate as a check. If k is a fraction such as one half, the ratio is one to two.' }),
    sl('example', 'Worked example 3: the ratio from a point', { b: 'In what ratio does $P(1, -1)$ divide the segment joining $A(-5, 3)$ and $B(4, -3)$?', ul: ['**Step 1 —** let $AP : PB = k : 1$.', `**Step 2 —** $x$-coordinates: ${w3.md[0]}.`, `**Step 3 —** check with $y$: ${w3b.md[0]}, as given.`, '**Answer —** $AP : PB = 2 : 1$.'], v: fWE3, n: 'Let the ratio be k to one. Using x, four k minus five over k plus one equals one, so four k minus five equals k plus one, and k is two. Check with y: two times minus three plus three is minus three, and over three that is minus one, the given y coordinate. So P divides A B in the ratio two to one.' }),
    sl('concept', 'Where an axis cuts a segment', { b: 'A point on the **$x$-axis** has $y = 0$; a point on the **$y$-axis** has $x = 0$. Set that coordinate of the $k : 1$ point to zero and solve for $k$.', ul: [`Here the $y$-axis cuts $AB$ at $P${ct(xY.P)}$ in the ratio $${rt(xY.r)}$, and the $x$-axis at $Q${ct(xX.P)}$ in the ratio $${rt(xX.r)}$.`], v: fAxes, n: 'An axis cuts a segment where one coordinate is zero. On the x axis, y is zero. On the y axis, x is zero. Set that coordinate of the k to one point equal to zero, and solve for k. In the picture the y axis cuts this segment one third of the way along, and the x axis two thirds of the way along.' }),
    sl('example', 'Worked example 4: both axes', { b: 'The segment joining $A(-2, -5)$ and $B(6, 7)$ crosses both axes. Find each ratio and each crossing point.', ul: [`**$y$-axis ($x = 0$) —** ${w4.md[0]}: ratio $1 : 3$; $y = ${w4c.lines[0]}$, so the point is $(0, -2)$.`, `**$x$-axis ($y = 0$) —** ${w4b.md[0]}: ratio $5 : 7$.`, `**Point —** $x = ${w4c.lines[1]}$, so the point is $${ct(e4X.P)}$.`], v: fWE4, n: 'For the y axis, set x to zero: six k minus two equals zero, so k is one third and the ratio is one to three. The y coordinate is then minus two. For the x axis, set y to zero: seven k minus five equals zero, so the ratio is five to seven, and the crossing point is four thirds, zero. Fractions are fine.' }),
    sl('check', 'Quick check: a coordinate', { b: 'Apply the section formula to the $x$-coordinates only.', chk: 'n01', n: 'Use the section formula, but only for the x coordinate.' }),
    sl('example', 'Worked example 5: a line that is not an axis', { b: 'In what ratio does the line $x + y = 3$ divide the segment joining $A(-2, 1)$ and $B(7, 4)$? Find the point of division.', ul: ['**Step 1 —** the $k : 1$ point is $\\left(\\dfrac{7k - 2}{k + 1}, \\dfrac{4k + 1}{k + 1}\\right)$.', `**Step 2 —** it lies on the line, so ${w5.md[0]}: ratio $1 : 2$.`, `**Step 3 —** $x = ${w5b.lines[0]}$, $y = ${w5b.lines[1]}$; check: ${w5b.md[2]}.`], v: fWE5, n: 'Write the k to one point in terms of k. It lies on the line, so its x and y coordinates add up to three. Multiplying through by k plus one gives eleven k minus one equals three k plus three, so k is one half and the ratio is one to two. The point is one, two, and one plus two is three, so it is on the line.' }),
    sl('example', 'Worked example 6: an unknown coordinate', { b: 'The point $P(-3, b)$ lies on the segment joining $A(-6, 5)$ and $B(3, -7)$. Find $AP : PB$ and $b$.', ul: [`**Step 1 —** the known $x$-coordinate gives $k$: ${w6.md[0]}, so $AP : PB = 1 : 2$.`, `**Step 2 —** then $b = ${w6b.lines[0]}$.`, '**Answer —** $AP : PB = 1 : 2$ and $b = 1$.'], v: fWE6, n: 'We know the x coordinate of P, so use it to find the ratio: three k minus six over k plus one equals minus three, which gives k equals one half. So the ratio is one to two. Now use this ratio in the section formula for y: minus seven plus ten, over three, is one. So b equals one.' }),
    sl('concept', 'Choosing the method', { b: 'Every question in this part is one of these:', v: tMethod, n: 'Every question in this part fits one of these rows. If you know the ratio, use the section formula. If you know the point, or just one of its coordinates, call the ratio k to one and solve. For an axis, one coordinate is zero. For any other line, substitute the k to one point into its equation.' }),
    sl('check', 'Quick check: true or false?', { b: 'Pair each part of the ratio with the correct end.', chk: 'tf2', n: 'Work out the point yourself, pairing each part of the ratio with the correct end.' }),
    sl('summary', 'Summary', { ul: ['$P$ divides $AB$ internally in the ratio $m_1 : m_2$ when $AP : PB = m_1 : m_2$', 'Section formula: $m_1$ with $B$, $m_2$ with $A$, divide by $m_1 + m_2$', 'Points of trisection: ratios $1 : 2$ and $2 : 1$', 'Unknown ratio: take $k : 1$, find $k$ from one coordinate, check with the other', 'Axis: $x = 0$ or $y = 0$; line: substitute into its equation'], v: tSum1, n: 'To sum up part one. A point divides a segment internally when it lies between the ends. The section formula pairs the first part of the ratio with the far end and divides by the sum. Trisection uses one to two and two to one. To find a ratio, call it k to one and solve one equation.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Section point (2 marks):** correct substitution 1 + both coordinates 1', '**Ratio (2–3 marks):** equation in $k$ 1 + ratio in whole numbers 1 + point 1', '**Mistake:** pairing $m_1$ with $A$ instead of $B$', '**Mistake:** dividing by $m_1 m_2$ or forgetting to divide', '**Mistake:** "a quarter of the way" taken as $1 : 4$ instead of $1 : 3$', '**Mistake:** setting $y = 0$ for the $y$-axis'], n: 'Examiners give a mark for the correct substitution and a mark for the answer, so show the substitution. When finding a ratio, write the equation in k, solve it and give the ratio in whole numbers. Watch the common slips: pairing the first part of the ratio with the wrong end, and mixing up which coordinate is zero on each axis.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Section and Mid-Point Formulae — Part 2: Mid-points and the centroid',
  goals: ['Find the mid-point of a segment', 'Find an end point when the other end and the mid-point are given', 'Use mid-points to find the fourth vertex of a parallelogram', 'Find the centroid of a triangle, a missing vertex from the centroid, and the vertices from the mid-points of the sides'],
  slides: [
    sl('title', 'Section and mid-point formulae, Part 2', { b: 'The **mid-point** is the $1 : 1$ section point. Join each vertex of a triangle to the mid-point of the opposite side and the three **medians** meet at the **centroid**.', v: fTitle2, n: 'Welcome to part two. The mid-point of a segment is the special case of the section formula with the ratio one to one. In a triangle, the lines from each corner to the middle of the opposite side are called medians. All three meet at one point, the centroid. Here the centroid is the point one, one.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **mid-point** of a segment', 'Find an **end point** from the other end and the mid-point', 'Find the **fourth vertex** of a parallelogram', 'Find the **centroid**, a **missing vertex**, and vertices from **mid-points of sides**'], n: 'These are the goals for part two. We find mid-points, and work backwards from a mid-point to a missing end. We use the fact that the diagonals of a parallelogram bisect each other. Then we meet the centroid of a triangle, find it from the vertices, and work backwards from it.' }),
    sl('concept', 'The mid-point formula', { b: 'Put $m_1 = m_2$ in the section formula: the mid-point of $A(x_1, y_1)$ and $B(x_2, y_2)$ is the **average** of the ends.', m: [r`M\left(\dfrac{x_1 + x_2}{2}, \ \dfrac{y_1 + y_2}{2}\right)`], v: fMid, n: 'If the ratio is one to one, the section formula becomes the mid-point formula. Add the two x coordinates and halve, then add the two y coordinates and halve. Here the mid-point of A and B is one, two: the step from A to M is the same as the step from M to B.' }),
    sl('example', 'Worked example 1: a mid-point', { b: 'Find the mid-point $M$ of the segment joining $A(-7, 4)$ and $B(3, -10)$.', ul: [`**Step 1 —** $x = ${v1.lines[0]}$`, `**Step 2 —** $y = ${v1.lines[1]}$`, `**Answer —** $M${ct(f1M)}$.`], v: fW21, n: 'Add the x coordinates: minus seven plus three is minus four, and half of that is minus two. Add the y coordinates: four plus minus ten is minus six, and half of that is minus three. So the mid-point is minus two, minus three. Watch the signs when adding negative numbers.' }),
    sl('concept', 'The other end from the mid-point', { b: 'If $M(x, y)$ is the mid-point of $AB$ and $A$ is $(x_1, y_1)$, then $x = \\dfrac{x_1 + x_2}{2}$ gives $x_2 = 2x - x_1$. So', m: [r`B(2x - x_1, \ 2y - y_1)`], v: fEnd, n: 'If we know one end and the mid-point, the other end is found by taking the same step again. In symbols, double the mid-point coordinate and subtract the known end. Here the step from A to M is four across and three up, so B is another four across and three up from M.' }),
    sl('example', 'Worked example 2: working back from a mid-point', { b: '(i) $M(2, 3)$ is the mid-point of $AB$ and $A$ is $(6, -1)$. Find $B$. (ii) The mid-point of $(a, 4)$ and $(-2, b)$ is $(1, -1)$. Find $a$ and $b$.', ul: [`**(i) —** ${v2.md[0]} and ${v2.md[1]}: $B${ct(f2B)}$.`, `**(ii) —** ${v2b.md[0]}.`, `**(ii) —** ${v2b.md[1]}.`], v: fW22, n: 'For the first part, double the mid-point and subtract A: two times two minus six is minus two, and two times three minus minus one is seven, so B is minus two, seven. For the second part, write each coordinate of the mid-point as an average and solve: a is four and b is minus six.' }),
    sl('check', 'Quick check: halfway', { b: 'Add and halve, coordinate by coordinate.', chk: 'm02', n: 'Add the coordinates and halve. Be careful with the signs.' }),
    sl('concept', 'Mid-points in a parallelogram', { b: 'The diagonals of a parallelogram **bisect each other**: $PR$ and $QS$ have the **same mid-point**. So three vertices fix the fourth.', ul: ['mid-point of $PR$ $=$ mid-point of $QS$', 'hence $S$ has coordinates $P + R - Q$ (vertices in order)'], v: fPar, n: 'In a parallelogram the two diagonals cut each other in half, so they have the same mid-point. If we know three corners in order, we find the mid-point of the diagonal we know, and then the missing corner as the other end of the second diagonal. The shortcut is: first plus third minus second.' }),
    sl('example', 'Worked example 3: the fourth vertex', { b: '$A(-2, -1)$, $B(4, 0)$ and $C(5, 4)$ are three consecutive vertices of parallelogram $ABCD$. Find $D$.', ul: [`**Step 1 —** the diagonals meet at the mid-point of $AC$: ${v3.md[0]}, ${v3.md[1]}.`, `**Step 2 —** this is also the mid-point of $BD$: ${v3.md[2]} and ${v3.md[3]}.`, `**Answer —** $D${ct(f3D)}$.`], v: fW23, n: 'First find where the diagonals cross: the mid-point of A C is three halves, three halves. This must also be the mid-point of B D, so D is found by doubling and subtracting B. Two times three halves minus four is minus one, and two times three halves minus zero is three. So D is minus one, three.' }),
    sl('check', 'Quick check: the other end', { b: 'Take the step from $P$ to $M$ once more.', chk: 'm08', n: 'Double the mid-point and subtract the known end, one coordinate at a time.' }),
    sl('concept', 'Medians and the centroid', { b: 'A **median** joins a vertex to the mid-point of the opposite side. The three medians meet at the **centroid** $G$, which divides each median in the ratio $2 : 1$ **from the vertex**.', v: fMed, n: 'A median joins a corner of a triangle to the middle of the opposite side. A triangle has three medians and they all pass through one point, the centroid. The centroid is always two thirds of the way along each median from the corner, so it divides every median in the ratio two to one.' }),
    sl('concept', 'The centroid formula', { b: 'Apply the section formula with ratio $2 : 1$ to $A(x_1, y_1)$ and the mid-point $D$ of $BC$. Since $2 \\times \\dfrac{x_2 + x_3}{2} = x_2 + x_3$,', m: [r`G\left(\dfrac{x_1 + x_2 + x_3}{3}, \ \dfrac{y_1 + y_2 + y_3}{3}\right)`], v: fCent, n: 'Why is the centroid the average of the three corners? Take the median from A to D, the mid-point of B C. The centroid divides it two to one. In the section formula, two times the mid-point of B C is just the sum of B and C, so we get A plus B plus C, all over three. The same holds for y.' }),
    sl('example', 'Worked example 4: a centroid, two ways', { b: 'Find the centroid of the triangle with vertices $A(-3, 5)$, $B(7, 1)$ and $C(2, -9)$, and check it using the median from $A$.', ul: [`**Formula —** ${v4.md[0]} and ${v4.md[1]}: $G${ct(f4G)}$.`, `**Median —** $D$: ${v4.md[2]} and ${v4.md[3]}.`, `**Check —** the $2 : 1$ point of $AD$: $x = ${v4.lines[4]}$, $y = ${v4.lines[5]}$.`], v: fW24, n: 'By the formula, add the x coordinates and divide by three: six over three is two. Add the y coordinates: minus three over three is minus one. So the centroid is two, minus one. As a check, find the mid-point D of B C and the two to one point of A D. It is the same point.' }),
    sl('check', 'Quick check: a centroid', { b: 'Add all three coordinates, then divide by $3$.', chk: 'm16', n: 'Add the three x coordinates and divide by three, then do the same for y.' }),
    sl('example', 'Worked example 5: a missing vertex', { b: 'The centroid of triangle $ABC$ is $G(1, 2)$, with $A(-4, 3)$ and $B(5, -1)$. Find $C$.', ul: ['**Step 1 —** $x_1 + x_2 + x_3 = 3x$ and $y_1 + y_2 + y_3 = 3y$.', `**Step 2 —** ${v5.md[0]} and ${v5.md[1]}: $C${ct(f5C)}$.`, `**Check —** ${v5.md[2]} and ${v5.md[3]}.`], v: fW25, n: 'Three times the centroid is the sum of the three corners. So the missing x coordinate is three times one, minus minus four, minus five, which is two. The missing y coordinate is three times two, minus three, minus minus one, which is four. So C is two, four. Check by finding the centroid again.' }),
    sl('concept', 'The triangle of mid-points', { b: 'Join the mid-points $D$, $E$, $F$ of the sides of triangle $ABC$. Each vertex coordinate appears, halved, in two mid-points, so', m: [r`x_D + x_E + x_F = x_A + x_B + x_C`], ul: ['triangles $ABC$ and $DEF$ have the **same centroid**', '$AFDE$, $BDEF$ and $CEFD$ are **parallelograms**'], v: fMedial, n: 'Join the three mid-points of the sides and you get a smaller triangle inside. Each corner of the big triangle is used in two of the mid-points, each time halved, so the coordinates add up to the same totals. That means the two triangles have the same centroid. The picture also shows three parallelograms.' }),
    sl('example', 'Worked example 6: vertices from mid-points', { b: 'The mid-points of $BC$, $CA$ and $AB$ are $D(1, 4)$, $E(-2, 1)$ and $F(4, -2)$. Find $A$, $B$ and $C$.', ul: [`**Step 1 —** $AFDE$ is a parallelogram, so $A$ is $E + F - D$: ${v6.md[0]}, ${v6.md[1]}, giving $A${ct(f6A)}$.`, `**Step 2 —** $B$ is $F + D - E$: ${v6.md[2]}, ${v6.md[3]}, giving $B${ct(f6B)}$.`, `**Step 3 —** $C$ is $D + E - F$: ${v6.md[4]}, ${v6.md[5]}, giving $C${ct(f6C)}$.`], v: fW26, n: 'A, F, D and E are the corners of a parallelogram, so A is the fourth vertex: E plus F minus D, which is one, minus five. In the same way B is F plus D minus E, which is seven, one, and C is D plus E minus F, which is minus five, seven. Check by finding the mid-points of the sides again.' }),
    sl('check', 'Quick check: true or false?', { b: 'Compare the sums of the coordinates.', chk: 'tf5', n: 'Think about what the coordinates of the three mid-points add up to.' }),
    sl('concept', 'Which formula when?', { b: 'Match what you know to what you want:', v: tWhich, n: 'Here is a guide to the formulas in this part. Both ends give the mid-point. One end and the mid-point give the other end. Three corners of a parallelogram give the fourth. Three vertices give the centroid, and two vertices with the centroid give the third. Each one is a single line of working.' }),
    sl('summary', 'Summary', { ul: ['Mid-point: $\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)$, the $1 : 1$ section point', 'Other end: $(2x - x_1, 2y - y_1)$', 'Parallelogram: the diagonals share their mid-point', 'Centroid: $\\left(\\dfrac{x_1 + x_2 + x_3}{3}, \\dfrac{y_1 + y_2 + y_3}{3}\\right)$, $2 : 1$ on each median', 'Missing vertex: $3G$ minus the other two vertices'], v: tSum2, n: 'To sum up part two. The mid-point is the average of the two ends. To find a missing end, double the mid-point and subtract the known end. The diagonals of a parallelogram share their mid-point. The centroid is the average of the three corners and divides every median two to one.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Mid-point or centroid (1–2 marks):** formula with substitution 1 + answer 1', '**Missing end or vertex (2 marks):** equation for each coordinate', '**10-mark question:** parts (a), (b), (c) mixing section point, mid-point and centroid; show all working', '**Mistake:** dividing by $2$ for a centroid (use $3$)', '**Mistake:** halving instead of doubling to find the other end', '**Mistake:** saying the centroid divides a median $1 : 2$ from the vertex'], n: 'In the exam, write the formula, substitute and then simplify, so the method marks are safe. For a missing end or vertex, set up one equation for each coordinate. Long questions often join all three ideas. Common slips are dividing by two for a centroid, halving instead of doubling for the far end, and reversing the two to one ratio.' }),
  ],
});

// ================================================================ notes
const nT = A([secLine(mA, mB, 1, 2, 0), secLine(mA, mB, 1, 2, 1)], 'notes 1');
const notes = {
  unit: 'icse-10-mathematics-ch12', version: 1, title: 'Section and Mid-Point Formulae — chapter notes', language: 'en',
  sections: [
    { heading: '1. Dividing a segment internally', body_md: r`- A point $P$ **divides $AB$ internally** in the ratio $m_1 : m_2$ when $P$ lies on the segment $AB$ and $AP : PB = m_1 : m_2$.
- $m_1$ belongs to the part next to $A$ and $m_2$ to the part next to $B$; if $m_1 < m_2$, $P$ is nearer to $A$.
- A fraction $\dfrac{a}{b}$ of the way from $A$ to $B$ means $AP : PB = a : (b - a)$: a quarter of the way is $1 : 3$.
- (Division of a segment externally, with $P$ outside $AB$, is not in the ICSE 2027 syllabus.)

*Example:* $A(1, 1)$, $B(10, 7)$: the point one-third of the way along divides $AB$ in the ratio $1 : 2$; it is $(4, 3)$, since $x = ${nT.lines[0]}$ and $y = ${nT.lines[1]}$.`, key_terms: [{ term: 'Internal division', definition_md: 'A point $P$ on the segment $AB$ divides it internally in the ratio $AP : PB$.' }, { term: 'Ratio $m_1 : m_2$', definition_md: 'The comparison of the two parts $AP$ and $PB$; only its proportion matters, so $2 : 2$ is the same as $1 : 1$.' }], formulas: [], visual: fMean, visuals: [fTitle], topic_ids: [topic(1)] },
    { heading: '2. The section formula', body_md: r`- The point dividing the join of $A(x_1, y_1)$ and $B(x_2, y_2)$ internally in the ratio $m_1 : m_2$ is

$$P\left(\dfrac{m_1x_2 + m_2x_1}{m_1 + m_2}, \ \dfrac{m_1y_2 + m_2y_1}{m_1 + m_2}\right)$$

- **Why:** the horizontal and vertical steps from $A$ to $P$ and from $P$ to $B$ form similar right triangles, so $\dfrac{x - x_1}{x_2 - x} = \dfrac{m_1}{m_2}$; solve for $x$ (and the same for $y$).
- **Cross pairing:** $m_1$ multiplies the far end $B$, $m_2$ multiplies $A$; then divide by $m_1 + m_2$.

*Example:* $A(-5, 9)$, $B(5, -6)$, ratio $2 : 3$: $x = ${w1.lines[0]}$ and $y = ${w1.lines[1]}$, so $P$ is $(-1, 3)$.`, key_terms: [{ term: 'Section formula', definition_md: 'The formula for the point dividing a segment internally in a given ratio.' }], formulas: [{ latex: 'x = \\dfrac{m_1x_2 + m_2x_1}{m_1 + m_2}', label: 'Section formula, x-coordinate' }, { latex: 'y = \\dfrac{m_1y_2 + m_2y_1}{m_1 + m_2}', label: 'Section formula, y-coordinate' }], visual: fWhy, visuals: [fFormula, fWE1], topic_ids: [topic(1)] },
    { heading: '3. Points of trisection', body_md: r`- The two **points of trisection** of $AB$ cut it into three equal parts: the one nearer $A$ divides $AB$ in the ratio $1 : 2$, the one nearer $B$ in the ratio $2 : 1$.
- The trisection point nearer $B$ is the mid-point of the other trisection point and $B$ — a quick check.

*Example:* for $A(-7, 2)$ and $B(8, -4)$: ratio $1 : 2$ gives $x = ${w2.lines[0]}$, $y = ${w2.lines[1]}$, so $(-2, 0)$; ratio $2 : 1$ gives $x = ${w2.lines[2]}$, $y = ${w2.lines[3]}$, so $(3, -2)$.`, key_terms: [{ term: 'Points of trisection', definition_md: 'The two points that divide a segment into three equal parts.' }], formulas: [], visual: fWE2, visuals: [tTri], topic_ids: [topic(1)] },
    { heading: '4. Finding the ratio: a point, an axis or a line', body_md: r`- **Unknown ratio:** call it $k : 1$, so the point is $\left(\dfrac{kx_2 + x_1}{k + 1}, \dfrac{ky_2 + y_1}{k + 1}\right)$. One coordinate gives $k$; the other is a check. Write $k : 1$ in whole numbers ($k = \dfrac{2}{3}$ means $2 : 3$).
- **An axis:** on the $x$-axis $y = 0$; on the $y$-axis $x = 0$.
- **A line $ax + by = c$:** substitute the $k : 1$ point into the equation and solve for $k$.
- A positive $k$ means the division is internal (the ends are on opposite sides of the axis or line).

*Example:* $P(1, -1)$ on the join of $A(-5, 3)$ and $B(4, -3)$: ${w3.md[0]}, so $AP : PB = 2 : 1$. The line $x + y = 3$ cuts the join of $(-2, 1)$ and $(7, 4)$ where ${w5.md[0]}, in the ratio $1 : 2$.`, key_terms: [{ term: 'Ratio $k : 1$', definition_md: 'Writing an unknown ratio with second part $1$ leaves a single unknown, $k$.' }], formulas: [{ latex: 'x = \\dfrac{kx_2 + x_1}{k + 1}', label: 'Point in the ratio k : 1' }], visual: fAxes, visuals: [fRatio, fWE3, fWE4, fWE5, tMethod], topic_ids: [topic(1)] },
    { heading: '5. The mid-point formula and a missing end', body_md: r`- The **mid-point** is the $1 : 1$ section point, the average of the ends:

$$M\left(\dfrac{x_1 + x_2}{2}, \ \dfrac{y_1 + y_2}{2}\right)$$

- **A missing end:** if $M(x, y)$ is the mid-point and $A(x_1, y_1)$ one end, the other end is $B(2x - x_1, 2y - y_1)$.

*Example:* the mid-point of $(-7, 4)$ and $(3, -10)$ is $(-2, -3)$, since ${v1.md[0]} and ${v1.md[1]}. If $A$ is $(6, -1)$ and $M$ is $(2, 3)$, then ${v2.md[0]} and ${v2.md[1]}, so $B$ is $(-2, 7)$.`, key_terms: [{ term: 'Mid-point', definition_md: 'The point of a segment equidistant from its ends; it divides the segment in the ratio $1 : 1$.' }], formulas: [{ latex: 'M\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)', label: 'Mid-point formula' }, { latex: 'B(2x - x_1, 2y - y_1)', label: 'Other end from the mid-point' }], visual: fMid, visuals: [fEnd, fW22], topic_ids: [topic(2)] },
    { heading: '6. Parallelograms', body_md: r`- The diagonals of a parallelogram **bisect each other**, so they have the same mid-point.
- For a parallelogram $ABCD$ (vertices in order), the mid-point of $AC$ is the mid-point of $BD$; so $D$ has coordinates $A + C - B$.
- Showing that the diagonals share their mid-point is also a way to **prove** that a quadrilateral is a parallelogram.

*Example:* $A(-2, -1)$, $B(4, 0)$, $C(5, 4)$: the mid-point of $AC$ is $\left(\dfrac{3}{2}, \dfrac{3}{2}\right)$, and then ${v3.md[2]} and ${v3.md[3]}, so $D$ is $(-1, 3)$.`, key_terms: [{ term: 'Bisect', definition_md: 'Cut into two equal parts; the diagonals of a parallelogram bisect each other.' }], formulas: [], visual: fPar, visuals: [fW23], topic_ids: [topic(2)] },
    { heading: '7. The centroid of a triangle', body_md: r`- A **median** joins a vertex to the mid-point of the opposite side. The three medians meet at the **centroid** $G$, which divides each median in the ratio $2 : 1$ from the vertex.
- **Formula:** the section formula with ratio $2 : 1$ on a median gives the average of the vertices:

$$G\left(\dfrac{x_1 + x_2 + x_3}{3}, \ \dfrac{y_1 + y_2 + y_3}{3}\right)$$

- **Missing vertex:** $x_3 = 3x - x_1 - x_2$ and $y_3 = 3y - y_1 - y_2$.
- **Vertices from the mid-points $D$, $E$, $F$ of $BC$, $CA$, $AB$:** $AFDE$ is a parallelogram, so $A$ is $E + F - D$ (and similarly for $B$ and $C$). A triangle and its triangle of mid-points have the same centroid.

*Example:* for $(-3, 5)$, $(7, 1)$, $(2, -9)$: ${v4.md[0]} and ${v4.md[1]}, so $G$ is $(2, -1)$. With $G(1, 2)$, $A(-4, 3)$, $B(5, -1)$: ${v5.md[0]} and ${v5.md[1]}, so $C$ is $(2, 4)$.`, key_terms: [{ term: 'Median', definition_md: 'The segment from a vertex of a triangle to the mid-point of the opposite side.' }, { term: 'Centroid', definition_md: 'The point where the three medians meet; it divides each median in the ratio $2 : 1$ from the vertex.' }], formulas: [{ latex: 'G\\left(\\dfrac{x_1 + x_2 + x_3}{3}, \\dfrac{y_1 + y_2 + y_3}{3}\\right)', label: 'Centroid' }], visual: fMed, visuals: [fCent, fW24, fW25, fMedial, fW26, tWhich], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Section point (2 marks):* correct substitution 1; both coordinates 1.
- *Ratio from a point, an axis or a line (2–3 marks):* equation in $k$ 1; ratio in whole numbers 1; point of division 1.
- *Mid-point, missing end, centroid, missing vertex (1–2 marks):* formula with substitution 1; answer 1.
- *10-mark question:* parts (a), (b), (c), usually 3 + 3 + 4, often mixing the section formula, mid-points and the centroid; show all working.

**Common mistakes**
1. Pairing $m_1$ with $A$ instead of $B$ (that gives the point in the ratio $m_2 : m_1$).
2. Reading "a quarter of the way from $A$" as $1 : 4$ instead of $1 : 3$.
3. Setting $y = 0$ for the $y$-axis (on the $y$-axis it is $x$ that is $0$).
4. Leaving a ratio as a fraction: $k = \dfrac{3}{5}$ means $3 : 5$.
5. Halving instead of doubling when finding the other end from the mid-point.
6. Dividing by $2$ instead of $3$ for the centroid, or giving the median ratio as $1 : 2$ from the vertex.`,
  status: 'draft', provenance: d1.provenance,
};

// ================================================================ flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const cA = P(2, -1), cB = P(8, 11), cP = section(cA, cB, 1, 2), cM = mid(P(-3, 6), P(9, -2)), cG = centroid(P(1, 4), P(-5, 2), P(7, -3)), cE = otherEnd(P(3, -2), P(0, 1)), cD = fourthVertex(P(1, 1), P(5, 2), P(6, 6)), cC = thirdVertex(P(2, 5), P(-4, 1), P(0, 0));
const wfc = A([secLine(cA, cB, 1, 2, 0), secLine(cA, cB, 1, 2, 1), midLine(P(-3, 6), P(9, -2), 0), midLine(P(-3, 6), P(9, -2), 1), centLine(P(1, 4), P(-5, 2), P(7, -3), 0), centLine(P(1, 4), P(-5, 2), P(7, -3), 1), endLine(P(3, -2), P(0, 1), 0), endLine(P(3, -2), P(0, 1), 1), fourthLine(P(1, 1), P(5, 2), P(6, 6), 0), fourthLine(P(1, 1), P(5, 2), P(6, 6), 1), thirdLine(P(2, 5), P(-4, 1), P(0, 0), 0), thirdLine(P(2, 5), P(-4, 1), P(0, 0), 1)], 'flashcard lines');
const cX = axisCut(P(-1, -4), P(3, 8), 'x'), cY = axisCut(P(-6, 1), P(2, 5), 'y');
must(rt(cX.r) === '1 : 2' && is(cX.P, [[1, 3], 0]) && rt(cY.r) === '3 : 1' && is(cY.P, [0, 4]), 'flashcard axis cuts');
const flashcards = {
  unit: 'icse-10-mathematics-ch12', version: 1, language: 'en',
  cards: [
    fc('f01', 'What does it mean for $P$ to divide $AB$ **internally** in the ratio $m_1 : m_2$?', '$P$ lies on the segment $AB$ and $AP : PB = m_1 : m_2$.', 'definition', 1),
    fc('f02', 'State the **section formula**.', '$P\\left(\\dfrac{m_1x_2 + m_2x_1}{m_1 + m_2}, \\dfrac{m_1y_2 + m_2y_1}{m_1 + m_2}\\right)$ for $A(x_1, y_1)$, $B(x_2, y_2)$.', 'formula', 1),
    fc('f03', 'In the section formula, which end does $m_1$ multiply?', 'The far end $B(x_2, y_2)$; $m_2$ multiplies $A$.', 'exam-tip', 1),
    fc('f04', 'Why does the section formula work?', 'The horizontal and vertical steps from $A$ to $P$ and from $P$ to $B$ form similar right triangles with sides in the ratio $m_1 : m_2$.', 'concept', 1),
    fc('f05', 'Point dividing the join of $(2, -1)$ and $(8, 11)$ in the ratio $1 : 2$?', `$${ct(cP)}$: $x = ${wfc.lines[0]}$, $y = ${wfc.lines[1]}$.`, 'example', 1),
    fc('f06', 'Ratios for the two **points of trisection**?', '$1 : 2$ (nearer $A$) and $2 : 1$ (nearer $B$).', 'concept', 1),
    fc('f07', '"One-quarter of the way from $A$ to $B$" is which ratio?', '$1 : 3$, not $1 : 4$.', 'exam-tip', 1),
    fc('f08', 'How do you find an unknown ratio?', 'Call it $k : 1$; one coordinate of the point gives $k$, the other coordinate checks it.', 'concept', 1),
    fc('f09', 'Point dividing $AB$ in the ratio $k : 1$?', '$\\left(\\dfrac{kx_2 + x_1}{k + 1}, \\dfrac{ky_2 + y_1}{k + 1}\\right)$.', 'formula', 1),
    fc('f10', 'Which coordinate is zero where a segment crosses the **$x$-axis**? The **$y$-axis**?', 'On the $x$-axis $y = 0$; on the $y$-axis $x = 0$.', 'concept', 1),
    fc('f11', 'Ratio in which the $x$-axis cuts the join of $(-1, -4)$ and $(3, 8)$?', `$${rt(cX.r)}$, at $${ct(cX.P)}$.`, 'example', 1),
    fc('f12', 'Ratio in which the $y$-axis cuts the join of $(-6, 1)$ and $(2, 5)$?', `$${rt(cY.r)}$, at $${ct(cY.P)}$.`, 'example', 1),
    fc('f13', 'How do you find the ratio in which a line $ax + by = c$ divides $AB$?', 'Substitute the $k : 1$ point into $ax + by = c$ and solve for $k$.', 'concept', 1),
    fc('f14', '$k = \\dfrac{3}{5}$: what is the ratio?', '$3 : 5$.', 'exam-tip', 1),
    fc('f15', 'State the **mid-point formula**.', '$M\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)$: the section formula with $m_1 = m_2$.', 'formula', 2),
    fc('f16', 'Mid-point of $(-3, 6)$ and $(9, -2)$?', `$${ct(cM)}$: ${wfc.md[2]}, ${wfc.md[3]}.`, 'example', 2),
    fc('f17', 'The other end $B$ from $A(x_1, y_1)$ and the mid-point $M(x, y)$?', '$B(2x - x_1, 2y - y_1)$.', 'formula', 2),
    fc('f18', '$A(3, -2)$, mid-point $(0, 1)$: where is $B$?', `$${ct(cE)}$: ${wfc.md[6]}, ${wfc.md[7]}.`, 'example', 2),
    fc('f19', 'Why can mid-points find the fourth vertex of a parallelogram?', 'Its diagonals bisect each other, so they have the same mid-point.', 'concept', 2),
    fc('f20', 'Parallelogram $ABCD$: $A(1, 1)$, $B(5, 2)$, $C(6, 6)$. Find $D$.', `$${ct(cD)}$: ${wfc.md[8]}, ${wfc.md[9]}.`, 'example', 2),
    fc('f21', 'What is a **median** of a triangle?', 'The segment from a vertex to the mid-point of the opposite side.', 'definition', 3),
    fc('f22', 'What is the **centroid**?', 'The point where the three medians meet.', 'definition', 3),
    fc('f23', 'In what ratio does the centroid divide a median?', '$2 : 1$, measured from the vertex.', 'concept', 3),
    fc('f24', 'State the **centroid formula**.', '$G\\left(\\dfrac{x_1 + x_2 + x_3}{3}, \\dfrac{y_1 + y_2 + y_3}{3}\\right)$.', 'formula', 3),
    fc('f25', 'Centroid of $(1, 4)$, $(-5, 2)$, $(7, -3)$?', `$${ct(cG)}$: ${wfc.md[4]}, ${wfc.md[5]}.`, 'example', 3),
    fc('f26', 'Third vertex from two vertices and the centroid $G(x, y)$?', '$(3x - x_1 - x_2, 3y - y_1 - y_2)$.', 'formula', 3),
    fc('f27', 'Centroid at the origin, vertices $(2, 5)$ and $(-4, 1)$: third vertex?', `$${ct(cC)}$: ${wfc.md[10]}, ${wfc.md[11]}.`, 'example', 3),
    fc('f28', 'A triangle and its triangle of mid-points: what do they share?', 'The same centroid.', 'concept', 3),
    fc('f29', 'Mid-points $D$, $E$, $F$ of $BC$, $CA$, $AB$ are known. How do you get $A$?', '$AFDE$ is a parallelogram, so $A$ has coordinates $E + F - D$.', 'diagram', 3),
    fc('f30', 'Most common slip with the centroid?', 'Dividing by $2$ instead of $3$.', 'exam-tip', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};
must(is(cP, [4, 3]) && is(cM, [3, 2]) && is(cG, [1, 1]) && is(cE, [-3, 4]) && is(cD, [2, 5]) && is(cC, [2, -6]), 'flashcard answers');

// ================================================================ release + tests
const release = {
  unit: 'icse-10-mathematics-ch12', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: {
    syllabus: 'topics t01–t03 only (section formula for internal division, including the ratio in which a point, an axis or a line divides a segment; the mid-point formula and an end point from the mid-point; the centroid of a triangle). Removed for ICSE 2027: the section formula for external division, mentioned once in the notes as not in the syllabus and used nowhere else.',
    geometry: 'every point, ratio, mid-point and centroid is computed in exact fractions: division points by the section formula and as A + t(B − A), collinear with and between A and B, with n²AP² = m²PB²; ratios from one coordinate, checked with the other and by recomputing the point; axis and line cuts checked on the axis or line with the ends on opposite sides; mid-points as the 1 : 1 section point; centroids as the average and as the 2 : 1 point of all three medians; missing ends, missing vertices, fourth parallelogram vertices and vertices from mid-points checked forwards',
    working_lines: 'every equation typed in a worked example, note, flashcard or model answer is parsed from its TeX by an exact parser (fractions, brackets, exact square roots): numeric sides must be equal exactly, and an equation in an unknown (k, p, q, a, b, h, x, y) must hold at the verified solution',
    figures: 'every plotted point lies on a drawn segment (an end or an interior point, checked exactly), and its label is generated from its coordinates',
  } },
};
const tests = chapterTests('Section and Mid-Point Formulae', {
  A: ['m04', 'm09', 'm12', 'ar2', 's301', 's303'],
  B: ['l01', 'l02'],
}, {
  A: ['m06', 'm07', 'm10', 'm13', 'm14', 'm18', 'ar3', 'ar6', 's401', 's403', 's405'],
  B: ['l03', 'l04', 'l06'],
});
build({ dir: DIR, release, testsSpec: tests });

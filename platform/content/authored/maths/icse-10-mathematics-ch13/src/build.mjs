// Build ICSE 10 Mathematics ch13 Equation of a Straight Line. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch13/src/build.mjs
// Every slope, equation, intercept and meeting point on the slides, in the notes, tables and plots is computed
// by line.mjs with exact fractions (point-slope AND two-point determinant form; parallel/perpendicular by
// coefficients AND slopes; meeting points substituted back); every typed equation of a line is parsed back and
// compared with the computed line, and every typed numeric or one-unknown working line is checked by work.mjs.
// Plots draw lines as functions with domains; every marked point lies on a drawn line (asserted exactly), its
// label is generated from its coordinates, and a marked x-intercept is the line's only zero.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { F, pt, must, slope, through, join, meet, isParallel, isPerp, parallelThrough, perpThrough, mid, section, centroid, perpBisector, median, altitude, slopeOf, yInt, xInt, on, sameLine, line, lineOfTex, eqTex, yTex, expr, lab, ct, tx, lsteps } from './line.mjs';
import { steps, ARITH, eqctx } from './work.mjs';

setUnit('icse-10-mathematics-ch13');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const A = (lines, msg) => steps(ARITH, lines).must(msg);
const W = (ctx, lines, msg) => steps(ctx, lines).must(msg);
const LS = (L, lines, msg) => lsteps(L, lines).must(msg);
const P = (x, y) => pt(x, y);
const d = (s) => `$${s}$`;
const is = (p, x, y) => p[0].eq(x) && p[1].eq(y);
const isL = (L, tex) => sameLine(L, lineOfTex(tex));
const deg = (m) => Math.round((((Math.atan(m) * 180) / Math.PI + 180) % 180) * 1e9) / 1e9;

/**
 * A coordinate figure. lines: [L, [x0, x1]?, label?] drawn as functions on their domains (non-vertical);
 * vl: [L, label] vertical lines; segs: [label, [p, q, ...]] helper segments (rise/run) drawn as series.
 * Every marked point must lie on a drawn function inside its domain (or on a vertical line); labels come
 * from the coordinates.
 */
function fig({ x, y, lines = [], vl = [], segs = [], pts = [] }, alt, caption) {
  const fns = lines.map(([L, dom, label]) => {
    must(slopeOf(L) !== null, 'function lines are not vertical');
    const dm = dom ?? x;
    must(dm[0] >= x[0] && dm[1] <= x[1] && dm[0] < dm[1], `domain inside the view for ${eqTex(L)}`);
    return { expr: expr(L), label: label ?? `$${yTex(L)}$`, domain: dm, L };
  });
  const out = pts.map(([name, p]) => {
    const onFn = fns.some((f) => on(f.L, p) && p[0].num() >= f.domain[0] - 1e-9 && p[0].num() <= f.domain[1] + 1e-9);
    const onV = vl.some(([L]) => on(L, p));
    must(onFn || onV, `figure point ${name}${ct(p)} lies on a drawn line`);
    if (p[1].isZero()) for (const f of fns) if (on(f.L, p)) must(f.domain[0] < p[0].num(), `marked zero ${name} is not at the left end of a domain`);
    return [p[0].num(), p[1].num(), lab(name, p), onFn ? undefined : 'free'];
  });
  const v = plot({ x, y, fns: fns.map(({ expr: e, label, domain }) => ({ expr: e, label, domain })), pts: out, series: segs.map(([label, ps]) => ({ label, points: ps.map((p) => [p[0].num(), p[1].num()]), kind: 'line' })) }, alt, caption);
  if (vl.length) v.spec.vlines = vl.map(([L, label]) => ({ x: xInt(L).num(), label: label ?? `$${yTex(L)}$`, dashed: true }));
  return v;
}

// ================================================================ deck 1 figures and worked examples (asserted)
// Title: y = x/2 + 1 through A(-2, 0) and B(4, 3)
const L0 = join(P(-2, 0), P(4, 3));
must(isL(L0, r`y = \dfrac{1}{2}x + 1`) && yInt(L0).eq(1) && xInt(L0).eq(-2), 'title line');
const fTitle = fig({ x: [-4, 6], y: [-2, 5], lines: [[L0]], pts: [['A', P(-2, 0)], ['B', P(4, 3)], ['C', P(0, 1)]] }, 'A straight line rising gently from left to right. It crosses the x-axis at A (−2, 0), the y-axis at C (0, 1), and passes through B (4, 3). Its equation is y = one half x + 1.', 'One line, one equation: $y = \\dfrac{1}{2}x + 1$.');

// Inclination table
const incl = [[0, '0', 'horizontal'], [30, r`\dfrac{1}{\sqrt{3}}`, 'rising gently'], [45, '1', 'rising, at equal steps'], [60, r`\sqrt{3}`, 'rising steeply'], [90, 'not defined', 'vertical'], [135, '-1', 'falling']];
const inclVal = { 0: 0, 30: 1 / Math.sqrt(3), 45: 1, 60: Math.sqrt(3), 135: -1 };
for (const [t] of incl) { const tn = Math.tan((t * Math.PI) / 180); must(t === 90 ? Math.abs(tn) > 1e15 : Math.abs(tn - inclVal[t]) < 1e-12, `tan ${t}`); }
const tIncl = table(['Inclination $\\theta$', 'Slope $m = \\tan \\theta$', 'The line is'], incl.map(([t, m, s]) => [`$${t}^\\circ$`, t === 90 ? m : `$${m}$`, s]), 'Table of inclinations and slopes: 0 degrees gives slope 0, a horizontal line; 30 degrees gives 1 over root 3; 45 degrees gives 1; 60 degrees gives root 3, rising steeply; 90 degrees, a vertical line, has no slope; 135 degrees gives −1, a falling line.', 'The slope is the tangent of the inclination.');

// Slope from two points: A(-1, 1), B(3, 4)
const sA = P(-1, 1), sB = P(3, 4), sR = P(3, 1), Ls = join(sA, sB);
must(slope(sA, sB).eq(F(3, 4)) && on(Ls, sA) && on(Ls, sB), 'slope 3/4');
const fSlope = fig({ x: [-3, 5], y: [-1, 6], lines: [[Ls]], segs: [['run = 4', [sA, sR]], ['rise = 3', [sR, sB]]], pts: [['A', sA], ['B', sB]] }, 'The line through A (−1, 1) and B (3, 4), with a right-angled step drawn under it: a horizontal run of 4 units from A, then a vertical rise of 3 units up to B. The slope is rise over run, 3 over 4.', 'Slope $=$ rise $\\div$ run $= \\dfrac{3}{4}$.');
const wSlope = A([r`\dfrac{4 - 1}{3 - (-1)} = \dfrac{3}{4}`], 'slope slide');

// WE1: P(-2, 5), Q(4, -1)
const e1P = P(-2, 5), e1Q = P(4, -1), Le1 = join(e1P, e1Q), w1 = A([r`\dfrac{-1 - 5}{4 - (-2)} = \dfrac{-6}{6} = -1`], 'WE1');
must(slope(e1P, e1Q).eq(-1) && deg(-1) === 135 && isL(Le1, 'y = -x + 3'), 'WE1 values');
const fWE1 = fig({ x: [-4, 6], y: [-3, 7], lines: [[Le1]], pts: [['P', e1P], ['Q', e1Q]] }, 'Worked example 1: the line through P (−2, 5) and Q (4, −1) falls from left to right. Its slope is −1 and it makes an angle of 135 degrees with the positive x-axis.', 'A negative slope: the line falls from left to right.');

// Sign of the slope: lines through K(1, 2)
const K = P(1, 2), Lr = through(K, 2), Lf = through(K, -1), Lh = through(K, 0), Lv = through(K, null);
must(isL(Lr, 'y = 2x') && isL(Lf, 'y = -x + 3') && isL(Lh, 'y = 2') && isL(Lv, 'x = 1') && isPerp(Lh, Lv), 'sign lines');
const fSign = fig({ x: [-2, 4], y: [-2, 6], lines: [[Lr, [-1, 3], '$y = 2x$: $m = 2$'], [Lf, [-2, 4], '$y = -x + 3$: $m = -1$'], [Lh, [-2, 4], '$y = 2$: $m = 0$']], vl: [[Lv, '$x = 1$: no slope']], pts: [['K', K]] }, 'Four lines through the point K (1, 2): y = 2x rises from left to right (slope 2); y = −x + 3 falls (slope −1); y = 2 is horizontal (slope 0); and the dashed vertical line x = 1 has no slope.', 'Rising: $m > 0$. Falling: $m < 0$. Horizontal: $m = 0$. Vertical: not defined.');

// WE2: (3, 1), (5, 3); inclination 60
const e2a = P(3, 1), e2b = P(5, 3), Le2 = join(e2a, e2b), w2 = A([r`\dfrac{3 - 1}{5 - 3} = \dfrac{2}{2} = 1`], 'WE2');
must(slope(e2a, e2b).eq(1) && deg(1) === 45 && xInt(Le2).eq(2) && Math.abs(Math.tan(Math.PI / 3) - Math.sqrt(3)) < 1e-12, 'WE2 values');
const fWE2 = fig({ x: [-1, 7], y: [-3, 5], lines: [[Le2]], pts: [['A', e2a], ['B', e2b], ['D', P(2, 0)]] }, 'Worked example 2: the line through A (3, 1) and B (5, 3) rises one unit for every unit across, so its slope is 1 and its inclination is 45 degrees. It crosses the x-axis at D (2, 0).', 'Slope $1$: inclination $45^\\circ$.');

// Collinear points: U(-3, -1), V(0, 1), W(3, 3)
const cU = P(-3, -1), cV = P(0, 1), cW = P(3, 3), Lc = join(cU, cV), wColl = A([r`\dfrac{1 - (-1)}{0 - (-3)} = \dfrac{2}{3}`, r`\dfrac{3 - 1}{3 - 0} = \dfrac{2}{3}`], 'collinear');
must(on(Lc, cW) && slope(cU, cV).eq(slope(cV, cW)), 'U, V, W collinear');
const fColl = fig({ x: [-5, 5], y: [-3, 5], lines: [[Lc]], pts: [['U', cU], ['V', cV], ['W', cW]] }, 'Three points U (−3, −1), V (0, 1) and W (3, 3) on one straight line. The slope from U to V and the slope from V to W are both 2 over 3.', 'Equal slopes $UV$ and $VW$, with $V$ shared: one straight line.');

// WE3: A(1, -1), B(3, 3), C(k, 7)
const e3A = P(1, -1), e3B = P(3, 3), Le3 = join(e3A, e3B), e3C = P(5, 7);
const w3 = A([r`\dfrac{3 - (-1)}{3 - 1} = \dfrac{4}{2} = 2`], 'WE3'), w3k = W(eqctx('k', [5]), [r`\dfrac{7 - 3}{k - 3} = 2 \Rightarrow k - 3 = 2 \Rightarrow k = 5`], 'WE3 k');
must(on(Le3, e3C) && !on(Le3, P(6, 7)) && isL(Le3, 'y = 2x - 3'), 'WE3 values');
const fWE3 = fig({ x: [-1, 7], y: [-3, 9], lines: [[Le3, [0, 6]]], pts: [['A', e3A], ['B', e3B], ['C', e3C]] }, 'Worked example 3: the points A (1, −1), B (3, 3) and C (5, 7) on the line y = 2x − 3. Each step of 2 units across is a rise of 4 units.', 'With $k = 5$, $C(5, 7)$ is on line $AB$.');

// y = mx + c: y = 2/3 x - 2
const Lm = through(P(0, -2), F(2, 3));
must(xInt(Lm).eq(3) && on(Lm, P(6, 2)), 'mx + c line');
const fMxc = fig({ x: [-2, 8], y: [-4, 4], lines: [[Lm]], pts: [['C', P(0, -2)], ['D', P(3, 0)], ['E', P(6, 2)]] }, 'The line y = two thirds x − 2. It crosses the y-axis at C (0, −2), so its y-intercept is −2; it crosses the x-axis at D (3, 0) and passes through E (6, 2). Every 3 units across it rises 2 units.', 'In $y = mx + c$: slope $m = \\dfrac{2}{3}$, $y$-intercept $c = -2$.');

// WE4: (i) m = -2/3, c = 4; (ii) 3x - 4y + 8 = 0
const L4a = through(P(0, 4), F(-2, 3)), L4b = lineOfTex('3x - 4y + 8 = 0');
const w4a = LS(L4a, [r`y = -\dfrac{2}{3}x + 4 \Rightarrow 3y = -2x + 12 \Rightarrow 2x + 3y - 12 = 0`], 'WE4 (i)'), w4b = LS(L4b, [r`4y = 3x + 8 \Rightarrow y = \dfrac{3}{4}x + 2`], 'WE4 (ii)');
must(isL(L4a, '2x + 3y - 12 = 0') && slopeOf(L4b).eq(F(3, 4)) && yInt(L4b).eq(2), 'WE4 values');
const fWE4 = fig({ x: [-4, 7], y: [-2, 7], lines: [[L4a, [-1, 7]], [L4b, [-4, 5]]], pts: [['P', P(0, 4)], ['Q', P(0, 2)]] }, 'Worked example 4: the falling line 2x + 3y − 12 = 0, which meets the y-axis at P (0, 4), and the rising line 3x − 4y + 8 = 0, which meets the y-axis at Q (0, 2).', 'The constant in $y = mx + c$ is where the line meets the $y$-axis.');

// Point-slope form: through (2, 1) with slope 3
const Lps = through(P(2, 1), 3);
must(isL(Lps, 'y = 3x - 5') && on(Lps, P(3, 4)), 'point-slope figure');
const wPs = A([r`\dfrac{4 - 1}{3 - 2} = 3`], 'point-slope slope check');
const fPS = fig({ x: [-1, 5], y: [-3, 8], lines: [[Lps, [0, 4]]], pts: [['A', P(2, 1)], ['B', P(3, 4)]] }, 'The line of slope 3 through A (2, 1). Any other point on it, such as B (3, 4), gives the same slope with A: a rise of 3 for a run of 1.', 'Every point $(x, y)$ of the line gives slope $3$ with $A$.');

// WE5: through (2, -3) with slope 3/2
const L5 = through(P(2, -3), F(3, 2)), w5 = LS(L5, [r`y + 3 = \dfrac{3}{2}(x - 2) \Rightarrow 2y + 6 = 3x - 6 \Rightarrow 3x - 2y - 12 = 0`], 'WE5'), w5c = A([r`3 \times 2 - 2 \times (-3) - 12 = 0`], 'WE5 check');
must(isL(L5, '3x - 2y - 12 = 0') && xInt(L5).eq(4) && yInt(L5).eq(-6), 'WE5 values');
const fWE5 = fig({ x: [-2, 7], y: [-8, 5], lines: [[L5, [-1, 6]]], pts: [['A', P(2, -3)], ['D', P(4, 0)], ['E', P(0, -6)]] }, 'Worked example 5: the line 3x − 2y − 12 = 0 of slope 3 over 2 through A (2, −3). It crosses the x-axis at D (4, 0) and the y-axis at E (0, −6).', 'Point-slope form, then clear the fraction.');

// Two-point form flow
const fTwo = flow('LR', [['a', 'Slope from the two points'], ['b', 'Point-slope form with either point'], ['c', 'Clear fractions; write $ax + by + c = 0$'], ['e', 'Check with the other point']], [['a', 'b'], ['b', 'c'], ['c', 'e']], 'Flow chart for the line through two points: find the slope from the two points, write the point-slope form with either point, clear the fractions to get the form a x + b y + c = 0, then check by substituting the other point.', 'Two points fix the slope; either point then fixes the line.');

// WE6: through (-1, 4) and (3, -2)
const e6a = P(-1, 4), e6b = P(3, -2), L6 = join(e6a, e6b);
const w6 = A([r`\dfrac{-2 - 4}{3 - (-1)} = \dfrac{-6}{4} = -\dfrac{3}{2}`, r`3 \times 3 + 2 \times (-2) - 5 = 0`], 'WE6'), w6l = LS(L6, [r`y - 4 = -\dfrac{3}{2}(x + 1) \Rightarrow 2y - 8 = -3x - 3 \Rightarrow 3x + 2y - 5 = 0`], 'WE6 line');
must(isL(L6, '3x + 2y - 5 = 0'), 'WE6 values');
const fWE6 = fig({ x: [-3, 5], y: [-4, 7], lines: [[L6, [-2, 4]]], pts: [['A', e6a], ['B', e6b]] }, 'Worked example 6: the falling line 3x + 2y − 5 = 0 through A (−1, 4) and B (3, −2).', 'Both given points satisfy $3x + 2y - 5 = 0$.');

// Intercepts: 4x + 3y = 12
const Li = lineOfTex('4x + 3y = 12'), wI = A([r`\dfrac{1}{2} \times 3 \times 4 = 6`, r`4 \times 6 + 3 \times (-4) = 12`], 'intercepts');
must(xInt(Li).eq(3) && yInt(Li).eq(4) && on(Li, P(6, -4)), 'intercept values');
const fInt = fig({ x: [-2, 7], y: [-5, 6], lines: [[Li, [-1, 7]]], pts: [['A', P(3, 0)], ['B', P(0, 4)], ['T', P(6, -4)]] }, 'The line 4x + 3y = 12 crossing the x-axis at A (3, 0) and the y-axis at B (0, 4). The point T (6, −4) also satisfies the equation, so it lies on the line.', 'Put $y = 0$ for the $x$-intercept and $x = 0$ for the $y$-intercept.');

const tForms = table(['Form', 'Equation', 'Use it when you know'], [['Slope from two points', r`$m = \dfrac{y_2 - y_1}{x_2 - x_1}$`, 'two points'], ['Slope from inclination', r`$m = \tan \theta$`, 'the angle with the positive $x$-axis'], ['Slope-intercept', '$y = mx + c$', 'the slope and the $y$-intercept'], ['Point-slope', '$y - y_1 = m(x - x_1)$', 'a point and the slope'], ['Two-point', r`$y - y_1 = \dfrac{y_2 - y_1}{x_2 - x_1}(x - x_1)$`, 'two points'], ['General', '$ax + by + c = 0$', r`slope $-\dfrac{a}{b}$, $y$-intercept $-\dfrac{c}{b}$`]], 'Summary table of the forms: slope from two points, slope as tan theta, slope-intercept form y = m x + c, point-slope form, two-point form, and the general form a x + b y + c = 0 with slope minus a over b and y-intercept minus c over b.', 'Part 1 on one card.');
must(slopeOf(line(2, 3, -12)).eq(F(-2, 3)) && yInt(line(2, 3, -12)).eq(4), 'general-form facts');

// ================================================================ deck 2 figures and worked examples (asserted)
// Title: y = 2x - 1, y = 2x + 4, y = -x/2 + 4
const T1 = lineOfTex('y = 2x - 1'), T2 = lineOfTex('y = 2x + 4'), T3 = perpThrough(T1, P(2, 3));
const tp1 = meet(T1, T3), tp2 = meet(T2, T3);
must(isParallel(T1, T2) && isPerp(T2, T3) && is(tp1, 2, 3) && is(tp2, 0, 4) && isL(T3, r`y = -\dfrac{1}{2}x + 4`), 'title 2');
const fTitle2 = fig({ x: [-4, 5], y: [-3, 8], lines: [[T1, [-1, 4.5]], [T2, [-3.5, 2]], [T3, [-4, 5]]], pts: [['P', tp1], ['Q', tp2]] }, 'Two parallel rising lines, y = 2x − 1 and y = 2x + 4, cut at right angles by the falling line y = −one half x + 4, which meets them at P (2, 3) and Q (0, 4).', 'Equal slopes: parallel. Slopes multiplying to $-1$: perpendicular.');

// Parallel lines
const Pa = lineOfTex(r`y = \dfrac{1}{3}x + 2`), Pb = lineOfTex(r`y = \dfrac{1}{3}x - 1`);
must(isParallel(Pa, Pb), 'parallel figure');
const fPar = fig({ x: [-5, 6], y: [-4, 5], lines: [[Pa], [Pb]], pts: [['A', P(0, 2)], ['B', P(0, -1)]] }, 'Two parallel lines with the same slope one third: y = one third x + 2 through A (0, 2) and y = one third x − 1 through B (0, −1). They never meet.', 'Same slope, different intercepts: parallel lines.');

// Perpendicular lines: 3x - 2y + 2 = 0 and 2x + 3y - 16 = 0
const Pl = lineOfTex('3x - 2y + 2 = 0'), Pm = perpThrough(Pl, P(2, 4)), wPerp = A([r`\dfrac{3}{2} \times \left(-\dfrac{2}{3}\right) = -1`], 'perp product');
must(isL(Pm, '2x + 3y - 16 = 0') && is(meet(Pl, Pm), 2, 4) && on(Pm, P(5, 2)) && on(Pl, P(0, 1)), 'perpendicular figure');
const fPerp = fig({ x: [-2, 7], y: [-2, 7], lines: [[Pl, [-2, 4]], [Pm, [-1, 7]]], pts: [['M', P(2, 4)], ['A', P(0, 1)], ['B', P(5, 2)]] }, 'The line 3x − 2y + 2 = 0 through A (0, 1), of slope 3 over 2, and the line 2x + 3y − 16 = 0 through B (5, 2), of slope −2 over 3. They cross at right angles at M (2, 4).', '$\\dfrac{3}{2} \\times \\left(-\\dfrac{2}{3}\\right) = -1$: the lines are perpendicular.');

// WE1 (deck 2): three pairs
const pairs = [['3x - 2y + 5 = 0', '6x - 4y - 7 = 0'], ['2x + 5y - 7 = 0', '5x - 2y + 3 = 0'], ['x + 2y - 4 = 0', '2x + y + 1 = 0']];
const verdict = ([a, b]) => { const L = lineOfTex(a), M = lineOfTex(b); return isParallel(L, M) ? 'parallel' : isPerp(L, M) ? 'perpendicular' : 'neither'; };
must(pairs.map(verdict).join() === 'parallel,perpendicular,neither', 'WE1 verdicts');
const ms = pairs.map((pp) => pp.map((t) => slopeOf(lineOfTex(t))));
must(ms.map((m) => m.map(String).join(' ')).join('|') === '3/2 3/2|-2/5 5/2|-1/2 -2', 'WE1 slopes');
const tPairs = table(['Lines', 'Slopes', 'Test', 'Result'], pairs.map((pp, i) => [pp.map((t) => `$${t}$`).join(' and '), ms[i].map((m) => `$${tx(m)}$`).join(' and '), i === 0 ? 'equal slopes' : `product $${tx(ms[i][0].mul(ms[i][1]))}$`, verdict(pp)]), 'Table for worked example 1 of part 2: 3x − 2y + 5 = 0 and 6x − 4y − 7 = 0 both have slope 3 over 2, so they are parallel; 2x + 5y − 7 = 0 and 5x − 2y + 3 = 0 have slopes −2 over 5 and 5 over 2, product −1, so they are perpendicular; x + 2y − 4 = 0 and 2x + y + 1 = 0 have slopes −1 over 2 and −2, product 1, so they are neither.', 'Compare slopes: equal, product $-1$, or neither.');

// WE2 (deck 2): through (3, -2) parallel to 4x - y + 7 = 0
const G2 = lineOfTex('4x - y + 7 = 0'), N2 = parallelThrough(G2, P(3, -2)), w22 = LS(N2, [r`y + 2 = 4(x - 3) \Rightarrow y + 2 = 4x - 12 \Rightarrow 4x - y - 14 = 0`], 'deck 2 WE2');
must(isL(N2, '4x - y - 14 = 0') && isParallel(G2, N2), 'deck 2 WE2');
const fWE22 = fig({ x: [-4, 6], y: [-8, 10], lines: [[G2, [-3.5, 0.5]], [N2, [1.5, 6]]], pts: [['G', P(0, 7)], ['A', P(3, -2)]] }, 'Worked example 2 of part 2: the given line 4x − y + 7 = 0 through G (0, 7) and the parallel line 4x − y − 14 = 0 through A (3, −2). Both have slope 4.', 'Parallel: copy the slope, change the point.');

// WE3 (deck 2): through (-2, 1) perpendicular to x + 3y - 6 = 0
const G3 = lineOfTex('x + 3y - 6 = 0'), N3 = perpThrough(G3, P(-2, 1)), F3 = meet(G3, N3);
const w23 = LS(N3, [r`y - 1 = 3(x + 2) \Rightarrow 3x - y + 7 = 0`], 'deck 2 WE3'), w23b = W(eqctx('x', [F(-3, 2)]), [r`x + 3(3x + 7) - 6 = 0 \Rightarrow 10x = -15 \Rightarrow x = -\dfrac{3}{2}`], 'deck 2 WE3 foot'), w23c = A([r`3 \times \left(-\dfrac{3}{2}\right) + 7 = \dfrac{5}{2}`], 'deck 2 WE3 y');
must(isL(N3, '3x - y + 7 = 0') && is(F3, F(-3, 2), F(5, 2)), 'deck 2 WE3');
const fWE23 = fig({ x: [-5, 5], y: [-3, 8], lines: [[G3, [-5, 5]], [N3, [-3, 0]]], pts: [['A', P(-2, 1)], ['F', F3]] }, 'Worked example 3 of part 2: the falling line x + 3y − 6 = 0 and the steep line 3x − y + 7 = 0 through A (−2, 1), perpendicular to it. They meet at F (−3/2, 5/2), the foot of the perpendicular from A.', 'Slopes $-\\dfrac{1}{3}$ and $3$ multiply to $-1$.');

// WE4 (deck 2): kx + 2y - 5 = 0 with 3x - y + 1 = 0
const G4 = lineOfTex('3x - y + 1 = 0'), K1 = line(-6, 2, -5), K2 = line(F(2, 3), 2, -5);
const w24 = W(eqctx('k', [-6]), [r`-\dfrac{k}{2} = 3 \Rightarrow k = -6`], 'deck 2 WE4 (i)'), w24b = W(eqctx('k', [F(2, 3)]), [r`-\dfrac{k}{2} \times 3 = -1 \Rightarrow k = \dfrac{2}{3}`], 'deck 2 WE4 (ii)');
must(isParallel(K1, G4) && isPerp(K2, G4) && yInt(K1).eq(F(5, 2)) && yInt(K2).eq(F(5, 2)), 'deck 2 WE4');
const fWE24 = fig({ x: [-3, 3], y: [-4, 8], lines: [[G4, [-5 / 3, 7 / 3]], [K1, [-2, 1.8]], [K2, [-3, 3]]], pts: [['A', P(0, 1)], ['B', P(0, F(5, 2))]] }, 'Worked example 4 of part 2: the fixed line 3x − y + 1 = 0 through A (0, 1); the line for k = −6, parallel to it; and the line for k = two thirds, perpendicular to it. Both lines with k pass through B (0, 5/2).', 'Parallel when $k = -6$; perpendicular when $k = \\dfrac{2}{3}$.');

// Meeting point concept: x + y = 5 and x - 2y = -1
const Ma = lineOfTex('x + y = 5'), Mb = lineOfTex('x - 2y = -1'), mP = meet(Ma, Mb), wMeet = W(eqctx('y', [2]), [r`(5 - y) - 2y = -1 \Rightarrow 3y = 6 \Rightarrow y = 2`], 'meet concept');
must(is(mP, 3, 2), 'meet concept');
const fMeet = fig({ x: [-2, 7], y: [-2, 6], lines: [[Ma, [-1, 7]], [Mb]], pts: [['P', mP]] }, 'The lines x + y = 5 and x − 2y = −1 drawn on one graph. They cross at P (3, 2), the only point whose coordinates satisfy both equations.', 'The meeting point satisfies both equations.');

// WE5 (deck 2): through the meeting point of 2x + y - 7 = 0, x - y + 1 = 0, perpendicular to 3x - 4y + 2 = 0
const E5a = lineOfTex('2x + y - 7 = 0'), E5b = lineOfTex('x - y + 1 = 0'), E5p = meet(E5a, E5b), E5g = lineOfTex('3x - 4y + 2 = 0'), E5n = perpThrough(E5g, E5p);
const w25 = W(eqctx('x', [2]), [r`3x - 6 = 0 \Rightarrow x = 2`], 'deck 2 WE5 x'), w25b = A([r`2 + 1 = 3`], 'deck 2 WE5 y'), w25c = LS(E5n, [r`y - 3 = -\dfrac{4}{3}(x - 2) \Rightarrow 3y - 9 = -4x + 8 \Rightarrow 4x + 3y - 17 = 0`], 'deck 2 WE5 line');
must(is(E5p, 2, 3) && isL(E5n, '4x + 3y - 17 = 0') && slopeOf(E5g).eq(F(3, 4)), 'deck 2 WE5');
const fWE25 = fig({ x: [-3, 7], y: [-2, 8], lines: [[E5a, [-0.5, 4.5]], [E5b, [-3, 7]], [E5n, [-1.75, 5.75]]], pts: [['P', E5p]] }, 'Worked example 5 of part 2: the lines 2x + y − 7 = 0 and x − y + 1 = 0 meet at P (2, 3). The answer line 4x + 3y − 17 = 0 also passes through P.', 'First the meeting point, then the slope.');

// Tools table
const tTools = table(['Tool', 'Formula or rule'], [['Mid-point of $AB$', r`$\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)$`], ['Point dividing $AB$ in $m : n$', r`$\left(\dfrac{mx_2 + nx_1}{m + n}, \dfrac{my_2 + ny_1}{m + n}\right)$`], ['Centroid of a triangle', r`$\left(\dfrac{x_1 + x_2 + x_3}{3}, \dfrac{y_1 + y_2 + y_3}{3}\right)$`], ['Perpendicular bisector of $AB$', 'through the mid-point, slope $-\\dfrac{1}{m_{AB}}$'], ['Median from $A$', 'through $A$ and the mid-point of $BC$'], ['Altitude from $A$', 'through $A$, slope $-\\dfrac{1}{m_{BC}}$']], 'Table of tools: the mid-point formula, the section formula for a point dividing A B in the ratio m to n, the centroid formula, and three special lines of a triangle: the perpendicular bisector through the mid-point at right angles, the median from a vertex to the mid-point of the opposite side, and the altitude from a vertex at right angles to the opposite side.', 'Find the point, find the slope, then use the point-slope form.');

// WE6 (deck 2): perpendicular bisector of A(-1, 3), B(5, -1)
const b6A = P(-1, 3), b6B = P(5, -1), b6M = mid(b6A, b6B), b6L = perpBisector(b6A, b6B), b6AB = join(b6A, b6B);
const w26 = A([r`\dfrac{-1 + 5}{2} = 2`, r`\dfrac{3 + (-1)}{2} = 1`, r`\dfrac{-1 - 3}{5 - (-1)} = \dfrac{-4}{6} = -\dfrac{2}{3}`], 'deck 2 WE6'), w26b = LS(b6L, [r`y - 1 = \dfrac{3}{2}(x - 2) \Rightarrow 2y - 2 = 3x - 6 \Rightarrow 3x - 2y - 4 = 0`], 'deck 2 WE6 line');
must(is(b6M, 2, 1) && isL(b6L, '3x - 2y - 4 = 0'), 'deck 2 WE6');
const fWE26 = fig({ x: [-2, 6], y: [-3, 5], lines: [[b6AB, [-1, 5], 'segment $AB$'], [b6L, [0, 4]]], pts: [['A', b6A], ['B', b6B], ['M', b6M]] }, 'Worked example 6 of part 2: the segment from A (−1, 3) to B (5, −1), and its perpendicular bisector 3x − 2y − 4 = 0 crossing it at right angles at the mid-point M (2, 1).', 'Every point of the bisector is equally far from $A$ and $B$.');

// WE7 (deck 2): triangle P(-2, -1), Q(4, 1), R(2, 5): median from R, altitude from P
const tP = P(-2, -1), tQ = P(4, 1), tR = P(2, 5), tM = mid(tP, tQ), medR = median(tR, tP, tQ), altP = altitude(tP, tQ, tR), tF = meet(altP, join(tQ, tR));
const w27 = A([r`\dfrac{-2 + 4}{2} = 1`, r`\dfrac{-1 + 1}{2} = 0`, r`\dfrac{5 - 0}{2 - 1} = 5`, r`\dfrac{5 - 1}{2 - 4} = -2`], 'deck 2 WE7'), w27b = LS(medR, [r`y - 0 = 5(x - 1) \Rightarrow 5x - y - 5 = 0`], 'median'), w27c = LS(altP, [r`y + 1 = \dfrac{1}{2}(x + 2) \Rightarrow 2y + 2 = x + 2 \Rightarrow x - 2y = 0`], 'altitude');
must(is(tM, 1, 0) && isL(medR, '5x - y - 5 = 0') && isL(altP, 'x - 2y = 0') && is(tF, F(18, 5), F(9, 5)), 'deck 2 WE7');
const fWE27 = fig({ x: [-3, 5], y: [-2, 6], lines: [[join(tP, tQ), [-2, 4], 'side $PQ$'], [join(tQ, tR), [2, 4], 'side $QR$'], [join(tR, tP), [-2, 2], 'side $RP$'], [medR, [0.6, 2.2], 'median from $R$'], [altP, [-2, 3.6], 'altitude from $P$']], pts: [['P', tP], ['Q', tQ], ['R', tR], ['M', tM], ['F', tF]] }, 'Worked example 7 of part 2: triangle P (−2, −1), Q (4, 1), R (2, 5). The median from R runs to M (1, 0), the mid-point of PQ. The altitude from P meets QR at right angles at F (18/5, 9/5).', 'Median: to the mid-point. Altitude: at right angles.');

// WE8 (deck 2): x + 2y = 6 meets the axes at A, B; P divides AB in 2 : 1; perpendicular through P
const e8L = lineOfTex('x + 2y = 6'), e8A = pt(xInt(e8L), 0), e8B = pt(0, yInt(e8L)), e8P = section(e8A, e8B, 2, 1), e8N = perpThrough(e8L, e8P);
const w28 = A([r`\dfrac{2 \times 0 + 1 \times 6}{2 + 1} = 2`, r`\dfrac{2 \times 3 + 1 \times 0}{2 + 1} = 2`], 'deck 2 WE8'), w28b = LS(e8N, [r`y - 2 = 2(x - 2) \Rightarrow 2x - y - 2 = 0`], 'deck 2 WE8 line');
must(is(e8A, 6, 0) && is(e8B, 0, 3) && is(e8P, 2, 2) && slopeOf(e8L).eq(F(-1, 2)) && isL(e8N, '2x - y - 2 = 0'), 'deck 2 WE8');
const fWE28 = fig({ x: [-1, 7], y: [-3, 5], lines: [[e8L, [-1, 7]], [e8N, [-0.5, 3.5]]], pts: [['A', e8A], ['B', e8B], ['P', e8P]] }, 'Worked example 8 of part 2: the line x + 2y = 6 meets the x-axis at A (6, 0) and the y-axis at B (0, 3). P (2, 2) divides AB in the ratio 2 to 1, and the line 2x − y − 2 = 0 passes through P at right angles to AB.', 'Section formula for the point, negative reciprocal for the slope.');

const sum2 = table(['Idea', 'Key fact'], [['Parallel lines', '$m_1 = m_2$ (both vertical also counts)'], ['Perpendicular lines', '$m_1 m_2 = -1$ (or one vertical, one horizontal)'], ['Unknown coefficient', 'set the slopes equal, or their product to $-1$'], ['Meeting point', 'solve the two equations together'], ['Perpendicular bisector', 'mid-point and $-\\dfrac{1}{m}$'], ['Median, altitude', 'mid-point of the opposite side; perpendicular to it']], 'Summary table for part 2: parallel lines have equal slopes; perpendicular lines have slopes whose product is −1; an unknown coefficient comes from one of these conditions; a meeting point solves both equations; a perpendicular bisector uses the mid-point and the negative reciprocal slope; a median goes to the mid-point of the opposite side and an altitude is perpendicular to it.', 'Part 2 on one card.');

// ================================================================ decks
const d1 = deck({
  part: 1,
  title: 'Equation of a Straight Line — Part 1: Slope, inclination and the forms of a line',
  goals: ['Find the inclination and slope of a line, using m = tan θ', 'Calculate the slope of the line through two points and test points for collinearity', 'Write and read the slope-intercept form y = mx + c', 'Find the equation of a line from a point and a slope, or from two points'],
  slides: [
    sl('title', 'Equation of a Straight Line, Part 1', { b: 'Every straight line on a graph has an **equation** in $x$ and $y$. Its **slope** tells how steep it is; its **intercepts** tell where it crosses the axes.', v: fTitle, n: 'Welcome to the equation of a straight line. Every point on this line obeys one rule linking its x and y coordinates. That rule is the equation of the line. In this part you will measure how steep a line is, and learn three ways to write its equation.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **inclination** and **slope** of a line', 'Calculate the slope from **two points**, and test points for **collinearity**', 'Write and read **$y = mx + c$**', 'Find the equation from a **point and a slope**, or from **two points**'], n: 'These are your goals for part one. First we measure steepness with the inclination and the slope. Then we find the slope from two points and use it to test whether points lie on one line. Finally we write equations in three useful forms.' }),
    sl('concept', 'Inclination and slope', { b: 'The **inclination** $\\theta$ of a line is the angle it makes with the **positive direction of the $x$-axis**, measured anticlockwise ($0^\\circ \\le \\theta < 180^\\circ$). Its **slope** (gradient) is', m: [r`m = \tan \theta`], v: tIncl, n: 'The inclination of a line is the angle it makes with the positive x axis, measured anticlockwise. The slope, also called the gradient, is the tangent of that angle. A horizontal line has slope zero. At forty five degrees the slope is one. A vertical line has no slope at all, because the tangent of ninety degrees is not defined.' }),
    sl('concept', 'Slope from two points', { b: 'For two points $(x_1, y_1)$ and $(x_2, y_2)$ with $x_1 \\ne x_2$, the slope is the **rise** divided by the **run**:', m: [r`m = \dfrac{y_2 - y_1}{x_2 - x_1}`], ul: [`For $A(-1, 1)$ and $B(3, 4)$: $m = ${wSlope.lines[0]}$.`], v: fSlope, n: 'To find the slope from two points, divide the change in y, the rise, by the change in x, the run. From A to B the run is four and the rise is three, so the slope is three quarters. Take the two points in the same order on the top and the bottom.' }),
    sl('example', 'Worked example 1: slope and inclination', { b: 'Find the slope of the line through $P(-2, 5)$ and $Q(4, -1)$, and its inclination.', ul: [`**Step 1 —** $m = ${w1.lines[0]}$.`, '**Step 2 —** $\\tan \\theta = -1$. A negative slope means an obtuse inclination: $\\theta = 135^\\circ$.', '**Check —** the line falls from left to right, as a negative slope should.'], v: fWE1, n: 'Subtract in the same order: minus one minus five on top, four minus minus two below, giving minus six over six, which is minus one. A slope of minus one means the tangent of the inclination is minus one, so the angle is one hundred and thirty five degrees. The line falls from left to right.' }),
    sl('concept', 'What the slope tells you', { ul: ['$m > 0$: the line **rises** from left to right', '$m < 0$: the line **falls** from left to right', '$m = 0$: the line is **horizontal** ($y = k$)', 'a **vertical** line ($x = k$) has **no slope**: the run is $0$'], v: fSign, n: 'The sign of the slope tells you the direction. A positive slope rises from left to right, and a negative slope falls. A horizontal line has slope zero. For a vertical line the run is zero, and we cannot divide by zero, so a vertical line has no slope.' }),
    sl('check', 'Quick check: a missing slope', { b: 'Look for two points with the same $x$-coordinate.', chk: 'm03', n: 'Which of these lines is vertical? Look for two points with the same x coordinate.' }),
    sl('example', 'Worked example 2: from points to angle, and back', { b: '(i) Find the inclination of the line through $A(3, 1)$ and $B(5, 3)$. (ii) Find the slope of a line inclined at $60^\\circ$.', ul: [`**(i) —** $m = ${w2.lines[0]}$, and $\\tan 45^\\circ = 1$, so $\\theta = 45^\\circ$.`, '**(ii) —** $m = \\tan 60^\\circ = \\sqrt{3}$.', '**Note —** the line in (i) meets the $x$-axis at $D(2, 0)$.'], v: fWE2, n: 'For the first part, the slope is two over two, which is one. The angle whose tangent is one is forty five degrees. For the second part we go the other way: the slope of a line inclined at sixty degrees is the tangent of sixty degrees, which is root three.' }),
    sl('concept', 'Collinear points', { b: 'Three points $A$, $B$, $C$ are **collinear** (on one straight line) when the slope of $AB$ equals the slope of $BC$: the two segments have the same steepness and share the point $B$.', ul: [`$U(-3, -1)$, $V(0, 1)$, $W(3, 3)$: slope $UV = ${wColl.lines[0]}$ and slope $VW = ${wColl.lines[1]}$.`], v: fColl, n: 'Slopes give a quick test for points on one line. If the slope from A to B equals the slope from B to C, the two segments point the same way and share B, so all three points are on one line. Here both slopes are two thirds, so U, V and W are collinear.' }),
    sl('example', 'Worked example 3: an unknown coordinate', { b: 'The points $A(1, -1)$, $B(3, 3)$ and $C(k, 7)$ are collinear. Find $k$.', ul: [`**Step 1 —** slope $AB = ${w3.lines[0]}$.`, `**Step 2 —** slope $BC$ must also be $2$: ${w3k.md[0]}.`, '**Check —** $C(5, 7)$: slope $AC = \\dfrac{7 - (-1)}{5 - 1} = 2$.'], v: fWE3, n: 'First find the slope of A B: four over two, which is two. For C to be on the same line, the slope from B to C must also be two. So seven minus three, divided by k minus three, equals two. That gives k minus three equals two, and k equals five.' }),
    sl('check', 'Quick check: one straight line', { b: 'Make the slope of $BC$ equal to the slope of $AB$.', chk: 'm18', n: 'Find the slope of A B first. Then make the slope of B C equal to it.' }),
    sl('concept', 'Slope-intercept form', { b: 'A line with slope $m$ that cuts the $y$-axis at $(0, c)$ has the equation', m: ['y = mx + c'], ul: ['$c$ is the **$y$-intercept**', 'a line through the origin has $c = 0$: $y = mx$', 'to **read** $m$ and $c$ from $ax + by + c = 0$, make $y$ the subject'], v: fMxc, n: 'If you know the slope and where the line cuts the y axis, the equation is y equals m x plus c. Here m is the slope and c is the y intercept. This line has slope two thirds and cuts the y axis at minus two. A line through the origin has c equal to zero.' }),
    sl('example', 'Worked example 4: writing and reading y = mx + c', { b: '(i) Find the equation of the line with slope $-\\dfrac{2}{3}$ and $y$-intercept $4$. (ii) Find the slope and $y$-intercept of $3x - 4y + 8 = 0$.', ul: [`**(i) —** ${w4a.md[0]}.`, `**(ii) —** make $y$ the subject: ${w4b.md[0]}.`, '**Answer —** (ii) has slope $\\dfrac{3}{4}$ and $y$-intercept $2$.'], v: fWE4, n: 'For the first part, put m and c straight into y equals m x plus c, then multiply by three to clear the fraction: two x plus three y minus twelve equals zero. For the second part, move the y term across and divide by four. The slope is three quarters and the y intercept is two.' }),
    sl('concept', 'Point-slope form', { b: 'If a line has slope $m$ and passes through $(x_1, y_1)$, then every other point $(x, y)$ on it gives $\\dfrac{y - y_1}{x - x_1} = m$, so', m: ['y - y_1 = m(x - x_1)'], ul: [`For $A(2, 1)$ and $m = 3$: $y - 1 = 3(x - 2)$, that is $y = 3x - 5$; the point $B(3, 4)$ checks: ${wPs.md[0]}.`], v: fPS, n: 'Suppose you know one point on a line and its slope. Any other point on the line makes the same slope with the known point. Writing that down gives y minus y one equals m times x minus x one. This is the point slope form, the most useful form of all.' }),
    sl('example', 'Worked example 5: a point and a slope', { b: 'Find the equation of the line through $(2, -3)$ with slope $\\dfrac{3}{2}$.', ul: [`**Step 1 —** ${w5.md[0]}.`, `**Check —** substitute $(2, -3)$: ${w5c.md[0]}.`, '**Note —** it meets the axes at $(4, 0)$ and $(0, -6)$.'], v: fWE5, n: 'Put the point and the slope into the point slope form: y plus three equals three halves of x minus two. Multiply both sides by two to clear the fraction, then collect everything on one side: three x minus two y minus twelve equals zero. Always check by substituting the given point.' }),
    sl('concept', 'Two-point form', { b: 'Two points fix a line. Find the slope from the points, then use the point-slope form with either point:', m: [r`y - y_1 = \dfrac{y_2 - y_1}{x_2 - x_1}(x - x_1)`], v: fTwo, n: 'When you are given two points, first work out the slope from them. Then use the point slope form with either point. Clear the fractions and write the equation neatly. Finally check it with the other point: if both points satisfy the equation, it is correct.' }),
    sl('example', 'Worked example 6: two points', { b: 'Find the equation of the line through $A(-1, 4)$ and $B(3, -2)$.', ul: [`**Step 1 —** $m = ${w6.lines[0]}$.`, `**Step 2 —** with $A$: ${w6l.md[0]}.`, `**Check —** with $B$: ${w6.md[1]}.`], v: fWE6, n: 'The slope is minus two minus four over three minus minus one, which is minus six over four, or minus three halves. Using A, y minus four equals minus three halves of x plus one. Multiply by two and tidy up: three x plus two y minus five equals zero. B checks: nine minus four minus five is zero.' }),
    sl('check', 'Quick check: through two points', { b: 'Find the slope, then the $y$-intercept.', chk: 'm08', n: 'Find the slope first. One of the points lies on the y axis, which gives you c at once.' }),
    sl('concept', 'Intercepts, and points on a line', { b: 'A point lies on a line exactly when its coordinates **satisfy** the equation.', ul: ['**$x$-intercept:** put $y = 0$', '**$y$-intercept:** put $x = 0$', `For $4x + 3y = 12$: $(3, 0)$ and $(0, 4)$; the triangle with the axes has area ${d(wI.lines[0])}; and $T(6, -4)$ is on the line, since ${wI.md[1]}.`], v: fInt, n: 'To find where a line crosses the x axis, put y equal to zero. To find where it crosses the y axis, put x equal to zero. And to test whether a point lies on a line, substitute its coordinates. If the equation is satisfied, the point is on the line.' }),
    sl('check', 'Quick check: true or false?', { b: 'Put $x = 0$ and solve for $y$.', chk: 'tf2', n: 'Where does this line cross the y axis? Put x equal to zero and solve.' }),
    sl('summary', 'Summary', { ul: ['Slope $m = \\tan \\theta$; $m = \\dfrac{y_2 - y_1}{x_2 - x_1}$', 'Collinear points: equal slopes', 'Slope-intercept form $y = mx + c$', 'Point-slope form $y - y_1 = m(x - x_1)$; two points: find $m$ first', 'Intercepts: put $y = 0$ or $x = 0$'], v: tForms, n: 'To sum up part one. The slope is the tangent of the inclination, or rise over run between two points. Equal slopes show that points are collinear. A line can be written as y equals m x plus c, or with the point slope form. To find intercepts, put y or x equal to zero.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Slope (1 mark):** formula with the coordinates substituted in the same order', '**Equation (2–3 marks):** slope 1, point-slope form 1, simplified form 1', '**Inclination:** use $\\tan \\theta = m$; a negative slope gives an obtuse angle', '**Mistake:** $\\dfrac{y_2 - y_1}{x_1 - x_2}$ (mixed order) changes the sign', '**Mistake:** reading the slope of $ax + by + c = 0$ as $a$; it is $-\\dfrac{a}{b}$', '**Habit:** check your equation with the given points'], n: 'In the exam, write the slope formula with the numbers substituted, keeping the same order on top and bottom. For an equation, show the slope, the point slope form, and then the simplified answer. A common slip is reading the slope of a x plus b y plus c equals zero as a. Make y the subject first. And always check with the given points.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Equation of a Straight Line — Part 2: Parallel and perpendicular lines, and applications',
  goals: ['Test whether two lines are parallel or perpendicular using their slopes', 'Find the equation of a line parallel or perpendicular to a given line', 'Find unknown coefficients and the meeting point of two lines', 'Find the perpendicular bisector, median and altitude using the mid-point and section formulae'],
  slides: [
    sl('title', 'Equation of a Straight Line, Part 2', { b: 'Slopes tell us when two lines are **parallel** and when they meet at **right angles**. With the mid-point and section formulae, they find the special lines of a triangle.', v: fTitle2, n: 'Welcome to part two. Here two rising lines with the same slope run side by side, and a third line cuts both at right angles. In this part we use slopes to spot parallel and perpendicular lines, and then combine them with the mid-point and section formulae.' }),
    sl('concept', 'What you will be able to do', { ul: ['Test lines for being **parallel** or **perpendicular**', 'Find a line **parallel** or **perpendicular** to a given line through a point', 'Find **unknown coefficients** and the **meeting point** of two lines', 'Find **perpendicular bisectors**, **medians** and **altitudes**'], n: 'These are your goals for part two. We test pairs of lines, write lines parallel or perpendicular to a given one, find unknown coefficients and meeting points, and finish with the special lines of a triangle.' }),
    sl('concept', 'Parallel lines', { b: 'Two non-vertical lines are **parallel** exactly when they have **equal slopes**:', m: ['m_1 = m_2'], ul: ['equal slopes mean equal inclinations', 'parallel lines have **different** intercepts (equal intercepts would make them the same line)', 'any two vertical lines are parallel'], v: fPar, n: 'Parallel lines have the same steepness, so they have the same slope. These two lines both have slope one third, but they cut the y axis at different points, so they never meet. If the intercepts were also equal, they would be the same line. Any two vertical lines are parallel too.' }),
    sl('concept', 'Perpendicular lines', { b: 'Two lines, neither vertical, are **perpendicular** exactly when the **product of their slopes is $-1$**:', m: ['m_1 \\times m_2 = -1'], ul: [`so a perpendicular slope is the **negative reciprocal**: $-\\dfrac{1}{m}$`, `here ${wPerp.md[0]}`, 'a horizontal line and a vertical line are also perpendicular'], v: fPerp, n: 'Lines that meet at right angles have slopes whose product is minus one. So to get a perpendicular slope, turn the slope upside down and change its sign. Three halves becomes minus two thirds. The only exception is a horizontal line with a vertical line, which are perpendicular although the vertical one has no slope.' }),
    sl('example', 'Worked example 1: parallel, perpendicular or neither?', { b: 'Test each pair: (i) $3x - 2y + 5 = 0$, $6x - 4y - 7 = 0$; (ii) $2x + 5y - 7 = 0$, $5x - 2y + 3 = 0$; (iii) $x + 2y - 4 = 0$, $2x + y + 1 = 0$.', ul: ['**Step 1 —** the slope of $ax + by + c = 0$ is $-\\dfrac{a}{b}$.', '**Step 2 —** compare: equal slopes, or a product of $-1$.', '**Answers —** (i) parallel; (ii) perpendicular; (iii) neither.'], v: tPairs, n: 'Find each slope as minus a over b. In the first pair both slopes are three halves, so the lines are parallel. In the second pair the slopes are minus two fifths and five halves, whose product is minus one, so they are perpendicular. In the third pair the product is plus one, so they are neither.' }),
    sl('check', 'Quick check: a parallel line', { b: 'Which line has the same slope?', chk: 'm09', n: 'Find the slope of the given line, then look for the option with the same slope.' }),
    sl('example', 'Worked example 2: a parallel line through a point', { b: 'Find the equation of the line through $(3, -2)$ parallel to $4x - y + 7 = 0$.', ul: ['**Step 1 —** the given line is $y = 4x + 7$, so its slope is $4$; the parallel line has slope $4$ too.', `**Step 2 —** ${w22.md[0]}.`, '**Check —** $4 \\times 3 - (-2) - 14 = 0$.'], v: fWE22, n: 'First find the slope of the given line by making y the subject: y equals four x plus seven, so the slope is four. The parallel line has the same slope. Put slope four and the point three, minus two into the point slope form, and tidy up: four x minus y minus fourteen equals zero.' }),
    sl('example', 'Worked example 3: a perpendicular line through a point', { b: 'Find the equation of the line through $A(-2, 1)$ perpendicular to $x + 3y - 6 = 0$, and the foot of the perpendicular.', ul: ['**Step 1 —** the given slope is $-\\dfrac{1}{3}$, so the perpendicular slope is $3$.', `**Step 2 —** ${w23.md[0]}.`, `**Step 3 —** foot: put $y = 3x + 7$ into $x + 3y - 6 = 0$: ${w23b.md[0]}; then $y = ${w23c.lines[0]}$, giving $F\\left(-\\dfrac{3}{2}, \\dfrac{5}{2}\\right)$.`], v: fWE23, n: 'The given line has slope minus one third. Turn it upside down and change the sign: the perpendicular slope is three. Through A, that gives three x minus y plus seven equals zero. The foot of the perpendicular is where the two lines meet, so solve them together. It is minus three halves, five halves.' }),
    sl('example', 'Worked example 4: an unknown coefficient', { b: 'For what values of $k$ is the line $kx + 2y - 5 = 0$ (i) parallel, (ii) perpendicular to $3x - y + 1 = 0$?', ul: ['**Step 1 —** slopes: $-\\dfrac{k}{2}$ and $3$.', `**(i) —** equal slopes: ${w24.md[0]}.`, `**(ii) —** product $-1$: ${w24b.md[0]}.`], v: fWE24, n: 'Write both slopes. The first line has slope minus k over two, and the second has slope three. For parallel lines set them equal: minus k over two equals three, so k is minus six. For perpendicular lines set their product equal to minus one: that gives k equals two thirds.' }),
    sl('check', 'Quick check: at right angles', { b: 'Set the product of the slopes equal to $-1$.', chk: 'm12', n: 'Write the two slopes, then set their product equal to minus one.' }),
    sl('concept', 'Where two lines meet', { b: 'The meeting point of two lines satisfies **both** equations, so solve them **simultaneously** (substitution or elimination).', ul: [`$x + y = 5$ and $x - 2y = -1$: substitute $x = 5 - y$: ${wMeet.md[0]}, then $x = 3$.`, 'parallel lines have no meeting point'], v: fMeet, n: 'The point where two lines cross lies on both of them, so its coordinates satisfy both equations. Solve the two equations together, by substitution or by elimination. Here we replace x by five minus y in the second equation and find y equals two, then x equals three.' }),
    sl('example', 'Worked example 5: a line through a meeting point', { b: 'Find the equation of the line through the meeting point of $2x + y - 7 = 0$ and $x - y + 1 = 0$, perpendicular to $3x - 4y + 2 = 0$.', ul: [`**Step 1 —** add the equations: ${w25.md[0]}; then $y = ${w25b.lines[0]}$, so $P(2, 3)$.`, '**Step 2 —** the given line has slope $\\dfrac{3}{4}$, so the required slope is $-\\dfrac{4}{3}$.', `**Step 3 —** ${w25c.md[0]}.`], v: fWE25, n: 'Adding the two equations removes y and gives three x minus six equals zero, so x is two and y is three. The line three x minus four y plus two equals zero has slope three quarters, so the perpendicular slope is minus four thirds. Through two, three, the answer is four x plus three y minus seventeen equals zero.' }),
    sl('concept', 'Tools from the section and mid-point formulae', { b: 'Many problems need a **point** first (a mid-point, a section point or the centroid) and a **slope** second. Then the point-slope form finishes the job.', v: tTools, n: 'Here are the tools we combine. The mid-point formula, the section formula and the centroid give us points. The three special lines of a triangle are the perpendicular bisector, the median and the altitude. Each needs a point and a slope, and then the point slope form gives the equation.' }),
    sl('example', 'Worked example 6: a perpendicular bisector', { b: 'Find the equation of the perpendicular bisector of $A(-1, 3)$ and $B(5, -1)$.', ul: [`**Step 1 —** mid-point: ${w26.md[0]} and ${w26.md[1]}, so $M(2, 1)$.`, `**Step 2 —** slope $AB = ${w26.lines[2]}$, so the bisector has slope $\\dfrac{3}{2}$.`, `**Step 3 —** ${w26b.md[0]}.`], v: fWE26, n: 'The perpendicular bisector passes through the mid-point of A B and is at right angles to it. The mid-point is two, one. The slope of A B is minus two thirds, so the bisector has slope three halves. Through two, one, the bisector is three x minus two y minus four equals zero.' }),
    sl('example', 'Worked example 7: a median and an altitude', { b: 'Triangle $PQR$ has $P(-2, -1)$, $Q(4, 1)$, $R(2, 5)$. Find (i) the median from $R$, (ii) the altitude from $P$.', ul: [`**(i) —** mid-point of $PQ$: ${w27.md[0]} and ${w27.md[1]}, so $M(1, 0)$; slope $RM = ${w27.lines[2]}$; median ${w27b.md[0]}.`, `**(ii) —** slope $QR = ${w27.lines[3]}$, so the altitude has slope $\\dfrac{1}{2}$: ${w27c.md[0]}.`, '**Note —** the altitude meets $QR$ at $F\\left(\\dfrac{18}{5}, \\dfrac{9}{5}\\right)$.'], v: fWE27, n: 'The median from R goes to the mid-point of the opposite side P Q, which is one, zero. Its slope is five, giving five x minus y minus five equals zero. The altitude from P is perpendicular to Q R. Q R has slope minus two, so the altitude has slope one half, giving x minus two y equals zero.' }),
    sl('check', 'Quick check: a median', { b: 'First find the mid-point of the opposite side.', chk: 'm14', n: 'A median joins a vertex to the mid-point of the opposite side. Find that mid-point first.' }),
    sl('example', 'Worked example 8: the section formula and a perpendicular', { b: 'The line $x + 2y = 6$ meets the axes at $A$ and $B$. $P$ divides $AB$ in the ratio $2 : 1$. Find the line through $P$ perpendicular to $AB$.', ul: [`**Step 1 —** $A(6, 0)$ and $B(0, 3)$. Section formula: $x = ${w28.lines[0]}$, $y = ${w28.lines[1]}$, so $P(2, 2)$.`, '**Step 2 —** $AB$ has slope $-\\dfrac{1}{2}$, so the perpendicular has slope $2$.', `**Step 3 —** ${w28b.md[0]}.`], v: fWE28, n: 'Putting y and then x equal to zero gives A at six, zero and B at zero, three. The section formula with ratio two to one gives P at two, two. The line A B has slope minus one half, so the perpendicular slope is two. Through P, the answer is two x minus y minus two equals zero.' }),
    sl('check', 'Quick check: true or false?', { b: 'Where does a median end?', chk: 'tf6', n: 'A median from A ends at the mid-point of B C. Work out that mid-point.' }),
    sl('summary', 'Summary', { ul: ['Parallel: $m_1 = m_2$', 'Perpendicular: $m_1 m_2 = -1$, slope $-\\dfrac{1}{m}$', 'Unknown coefficient: use one of these conditions', 'Meeting point: solve the equations together', 'Perpendicular bisector, median, altitude: a point, a slope, then point-slope form'], v: sum2, n: 'To sum up part two. Parallel lines have equal slopes. Perpendicular lines have slopes whose product is minus one. Use these conditions to find unknown coefficients. A meeting point solves both equations. And every special line of a triangle needs a point and a slope, then the point slope form.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Parallel or perpendicular line (3 marks):** given slope 1, new slope 1, equation 1', '**Perpendicular bisector (3–4 marks):** mid-point 1, slope 1, equation 1–2', '**10-mark question:** parts (a), (b), (c), often 3 + 3 + 4; show every slope and point', '**Mistake:** using $-m$ or $\\dfrac{1}{m}$ instead of $-\\dfrac{1}{m}$', '**Mistake:** joining a vertex to a mid-point for an altitude (that is a median)', '**Mistake:** forgetting to check that parallel lines are not the same line'], n: 'In the exam, write the given slope, then the new slope, then the equation: each earns a mark. For a perpendicular slope, invert and change the sign, both. Do not mix up medians and altitudes: a median goes to a mid-point, an altitude meets the opposite side at right angles. Show every point and slope you use.' }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'icse-10-mathematics-ch13', version: 1, title: 'Equation of a Straight Line — chapter notes', language: 'en',
  sections: [
    { heading: '1. Inclination and slope', body_md: r`- The **inclination** $\theta$ of a line is the angle from the positive $x$-axis to the line, measured anticlockwise, with $0^\circ \le \theta < 180^\circ$.
- The **slope** (gradient) is $m = \tan \theta$.
- $m > 0$: the line rises from left to right; $m < 0$: it falls (obtuse $\theta$); $m = 0$: horizontal; a vertical line ($\theta = 90^\circ$) has no slope.

*Example:* a line inclined at $60^\circ$ has slope $\sqrt{3}$; a line of slope $-1$ has inclination $135^\circ$.`, key_terms: [{ term: 'Inclination', definition_md: 'The angle $\\theta$ a line makes with the positive direction of the $x$-axis, measured anticlockwise.' }, { term: 'Slope (gradient)', definition_md: 'The tangent of the inclination, $m = \\tan \\theta$; it measures steepness.' }], formulas: [{ latex: 'm = \\tan \\theta', label: 'Slope from inclination' }], visual: tIncl, visuals: [fSign], topic_ids: [topic(1)] },
    { heading: '2. Slope from two points; collinear points', body_md: r`- For $(x_1, y_1)$ and $(x_2, y_2)$ with $x_1 \ne x_2$: $m = \dfrac{y_2 - y_1}{x_2 - x_1}$, the rise divided by the run. Keep the same order on top and bottom.
- If $x_1 = x_2$ the line is vertical and has no slope.
- $A$, $B$, $C$ are **collinear** when slope $AB$ = slope $BC$.

*Example:* $P(-2, 5)$ and $Q(4, -1)$: $m = \dfrac{-1 - 5}{4 - (-2)} = -1$. For $A(1, -1)$, $B(3, 3)$, $C(k, 7)$ to be collinear, $\dfrac{7 - 3}{k - 3} = 2$, so $k = 5$.`, key_terms: [{ term: 'Rise and run', definition_md: 'The change in $y$ and the change in $x$ between two points of a line.' }, { term: 'Collinear', definition_md: 'Lying on one straight line.' }], formulas: [{ latex: 'm = \\dfrac{y_2 - y_1}{x_2 - x_1}', label: 'Slope through two points' }], visual: fSlope, visuals: [fWE1, fColl, fWE3], topic_ids: [topic(1)] },
    { heading: '3. Slope-intercept form and intercepts', body_md: r`- **$y = mx + c$**: slope $m$, $y$-intercept $c$ (the line meets the $y$-axis at $(0, c)$). A line through the origin is $y = mx$.
- From $ax + by + c = 0$ ($b \ne 0$): $y = -\dfrac{a}{b}x - \dfrac{c}{b}$, so the slope is $-\dfrac{a}{b}$ and the $y$-intercept is $-\dfrac{c}{b}$.
- **Intercepts:** put $y = 0$ for the $x$-intercept and $x = 0$ for the $y$-intercept.
- A point lies on a line exactly when its coordinates satisfy the equation.

*Example:* $3x - 4y + 8 = 0$ gives $y = \dfrac{3}{4}x + 2$: slope $\dfrac{3}{4}$, $y$-intercept $2$. The line $4x + 3y = 12$ meets the axes at $(3, 0)$ and $(0, 4)$.`, key_terms: [{ term: '$y$-intercept', definition_md: 'The $y$-coordinate $c$ of the point where a line meets the $y$-axis.' }, { term: '$x$-intercept', definition_md: 'The $x$-coordinate of the point where a line meets the $x$-axis.' }], formulas: [{ latex: 'y = mx + c', label: 'Slope-intercept form' }, { latex: 'm = -\\dfrac{a}{b}', label: 'Slope of ax + by + c = 0' }], visual: fMxc, visuals: [fWE4, fInt], topic_ids: [topic(2)] },
    { heading: '4. Point-slope and two-point forms', body_md: r`- **Point-slope form:** the line through $(x_1, y_1)$ with slope $m$ is $y - y_1 = m(x - x_1)$.
- **Two-point form:** find $m = \dfrac{y_2 - y_1}{x_2 - x_1}$, then use the point-slope form with either point.
- Clear fractions and write the answer as $ax + by + c = 0$ (or $y = mx + c$); check it with the given points.
- Special cases: a line through $(x_1, y_1)$ parallel to the $x$-axis is $y = y_1$; parallel to the $y$-axis, $x = x_1$.

*Example:* through $(2, -3)$ with slope $\dfrac{3}{2}$: $2y + 6 = 3x - 6$, so $3x - 2y - 12 = 0$. Through $(-1, 4)$ and $(3, -2)$: $m = -\dfrac{3}{2}$ and $3x + 2y - 5 = 0$.`, key_terms: [{ term: 'Point-slope form', definition_md: '$y - y_1 = m(x - x_1)$, the line through $(x_1, y_1)$ with slope $m$.' }], formulas: [{ latex: 'y - y_1 = m(x - x_1)', label: 'Point-slope form' }, { latex: 'y - y_1 = \\dfrac{y_2 - y_1}{x_2 - x_1}(x - x_1)', label: 'Two-point form' }], visual: fPS, visuals: [fWE5, fTwo, fWE6], topic_ids: [topic(3)] },
    { heading: '5. Parallel and perpendicular lines', body_md: r`- **Parallel:** $m_1 = m_2$ (and different intercepts). Two vertical lines are parallel.
- **Perpendicular:** $m_1 m_2 = -1$, so the perpendicular slope is $-\dfrac{1}{m}$. A horizontal and a vertical line are perpendicular.
- A line parallel to $ax + by + c = 0$ can be written $ax + by + k = 0$; find $k$ from the point it passes through.
- **Unknown coefficients:** set the slopes equal (parallel) or their product equal to $-1$ (perpendicular).

*Example:* through $(3, -2)$ parallel to $4x - y + 7 = 0$: $4x - y - 14 = 0$. Through $(-2, 1)$ perpendicular to $x + 3y - 6 = 0$: slope $3$, so $3x - y + 7 = 0$.`, key_terms: [{ term: 'Parallel lines', definition_md: 'Lines with equal slopes (or both vertical); they never meet.' }, { term: 'Negative reciprocal', definition_md: 'For slope $m \\ne 0$, the slope $-\\dfrac{1}{m}$ of a perpendicular line.' }], formulas: [{ latex: 'm_1 = m_2', label: 'Parallel lines' }, { latex: 'm_1 \\times m_2 = -1', label: 'Perpendicular lines' }], visual: fPerp, visuals: [fPar, tPairs, fWE22, fWE23, fWE24], topic_ids: [topic(4)] },
    { heading: '6. The meeting point of two lines', body_md: r`- The point where two lines meet satisfies both equations: solve them simultaneously by substitution or elimination.
- To find a line through the meeting point with a given condition, find the point first, then the slope, then use the point-slope form.
- The **foot of the perpendicular** from a point to a line is where the perpendicular through the point meets the line.

*Example:* $2x + y - 7 = 0$ and $x - y + 1 = 0$ meet at $(2, 3)$; the line through $(2, 3)$ perpendicular to $3x - 4y + 2 = 0$ is $4x + 3y - 17 = 0$.`, key_terms: [{ term: 'Simultaneous solution', definition_md: 'The pair $(x, y)$ satisfying both equations: the meeting point of the two lines.' }, { term: 'Foot of the perpendicular', definition_md: 'The point where a perpendicular from a point meets the given line.' }], formulas: [], visual: fMeet, visuals: [fWE25], topic_ids: [topic(4), topic(5)] },
    { heading: '7. Applications: perpendicular bisector, median and altitude', body_md: r`- **Perpendicular bisector of $AB$:** through the mid-point of $AB$, slope $-\dfrac{1}{m_{AB}}$. Every point on it is equidistant from $A$ and $B$.
- **Median from $A$:** the line through $A$ and the mid-point of $BC$. The three medians meet at the centroid.
- **Altitude from $A$:** through $A$, perpendicular to $BC$ (slope $-\dfrac{1}{m_{BC}}$).
- With the **section formula**, a point dividing $AB$ in $m : n$ is $\left(\dfrac{mx_2 + nx_1}{m + n}, \dfrac{my_2 + ny_1}{m + n}\right)$.

*Example:* for $A(-1, 3)$ and $B(5, -1)$ the perpendicular bisector is $3x - 2y - 4 = 0$; for $P(-2, -1)$, $Q(4, 1)$, $R(2, 5)$ the median from $R$ is $5x - y - 5 = 0$ and the altitude from $P$ is $x - 2y = 0$.`, key_terms: [{ term: 'Perpendicular bisector', definition_md: 'The line through the mid-point of a segment, at right angles to it.' }, { term: 'Median', definition_md: 'The line from a vertex of a triangle to the mid-point of the opposite side.' }, { term: 'Altitude', definition_md: 'The line from a vertex of a triangle perpendicular to the opposite side.' }], formulas: [{ latex: '\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)', label: 'Mid-point' }, { latex: '\\left(\\dfrac{mx_2 + nx_1}{m + n}, \\dfrac{my_2 + ny_1}{m + n}\\right)', label: 'Section formula (internal)' }], visual: tTools, visuals: [fWE26, fWE27, fWE28], topic_ids: [topic(5)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Slope or inclination (1–2 marks):* formula with the values substituted 1; value (and angle) 1.
- *Equation of a line (2–3 marks):* slope 1; point-slope form 1; simplified equation 1.
- *Parallel or perpendicular line (3 marks):* given slope, new slope, equation.
- *Median, altitude or perpendicular bisector (3–4 marks):* the point (mid-point, section point) 1–2; the slope 1; the equation 1.
- *10-mark structured question:* parts (a), (b), (c), usually 3 + 3 + 4; show every slope, point and substitution.

**Common mistakes**
1. Mixing the order in the slope formula: $\dfrac{y_2 - y_1}{x_1 - x_2}$ has the wrong sign.
2. Reading the slope of $ax + by + c = 0$ as $a$ or $\dfrac{a}{b}$; it is $-\dfrac{a}{b}$.
3. Using $-m$ or $\dfrac{1}{m}$ for a perpendicular slope instead of $-\dfrac{1}{m}$.
4. Confusing a median (to the mid-point) with an altitude (at right angles).
5. Writing a vertical line as $y = k$ or giving it a slope.
6. Not checking the final equation with the given points.`,
  status: 'draft', provenance: d1.provenance,
};
// notes facts
must(Math.abs(Math.tan(Math.PI / 3) - Math.sqrt(3)) < 1e-12 && deg(-1) === 135, 'notes 1');
A([r`\dfrac{-1 - 5}{4 - (-2)} = -1`], 'notes 2');
W(eqctx('k', [5]), [r`\dfrac{7 - 3}{k - 3} = 2`, r`k = 5`], 'notes 2 k');
must(slopeOf(L4b).eq(F(3, 4)) && yInt(L4b).eq(2) && xInt(Li).eq(3) && yInt(Li).eq(4), 'notes 3');
LS(L5, [r`2y + 6 = 3x - 6`, '3x - 2y - 12 = 0'], 'notes 4 (i)'); LS(L6, ['3x + 2y - 5 = 0'], 'notes 4 (ii)'); must(slope(e6a, e6b).eq(F(-3, 2)), 'notes 4 slope');
must(isL(N2, '4x - y - 14 = 0') && isL(N3, '3x - y + 7 = 0'), 'notes 5');
must(is(E5p, 2, 3) && isL(E5n, '4x + 3y - 17 = 0'), 'notes 6');
must(isL(b6L, '3x - 2y - 4 = 0') && isL(medR, '5x - y - 5 = 0') && isL(altP, 'x - 2y = 0'), 'notes 7');
must(isL(lineOfTex('4x - y + k = 0'.split('k').join('-14')), '4x - y - 14 = 0') && on(N2, P(3, -2)), 'notes 5 parallel family');

// ================================================================ flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch13', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is the **inclination** of a line?', 'The angle $\\theta$ it makes with the positive direction of the $x$-axis, measured anticlockwise ($0^\\circ \\le \\theta < 180^\\circ$).', 'definition', 1),
    fc('f02', 'Slope in terms of the inclination?', '$m = \\tan \\theta$.', 'formula', 1),
    fc('f03', 'Slope of the line through $(x_1, y_1)$ and $(x_2, y_2)$?', '$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$, with $x_1 \\ne x_2$.', 'formula', 1),
    fc('f04', 'Slope of a horizontal line? Of a vertical line?', 'Horizontal: $0$. Vertical: not defined (the run is $0$).', 'concept', 1),
    fc('f05', 'What does a negative slope tell you?', 'The line falls from left to right; its inclination is obtuse.', 'concept', 1),
    fc('f06', 'Slope of a line inclined at $60^\\circ$?', '$\\tan 60^\\circ = \\sqrt{3}$.', 'example', 1),
    fc('f07', 'Inclination of a line of slope $-1$?', '$135^\\circ$.', 'example', 1),
    fc('f08', 'How do slopes show that $A$, $B$, $C$ are collinear?', 'Slope $AB$ = slope $BC$ (and $B$ is shared).', 'concept', 1),
    fc('f09', 'Slope through $P(-2, 5)$ and $Q(4, -1)$?', `$${w1.lines[0]}$.`, 'example', 1),
    fc('f10', 'What do $m$ and $c$ mean in $y = mx + c$?', '$m$ is the slope; $c$ is the $y$-intercept, where the line meets the $y$-axis at $(0, c)$.', 'definition', 2),
    fc('f11', 'Slope and $y$-intercept of $ax + by + c = 0$?', 'Slope $-\\dfrac{a}{b}$, $y$-intercept $-\\dfrac{c}{b}$ (for $b \\ne 0$).', 'formula', 2),
    fc('f12', 'Slope and $y$-intercept of $3x - 4y + 8 = 0$?', `${w4b.md[0]}: slope $\\dfrac{3}{4}$, $y$-intercept $2$.`, 'example', 2),
    fc('f13', 'How do you find the intercepts of a line?', 'Put $y = 0$ for the $x$-intercept and $x = 0$ for the $y$-intercept.', 'concept', 2),
    fc('f14', 'Where does $4x + 3y = 12$ meet the axes?', 'At $(3, 0)$ and $(0, 4)$.', 'example', 2),
    fc('f15', 'Equation of a line through the origin with slope $m$?', '$y = mx$.', 'formula', 2),
    fc('f16', 'Point-slope form?', '$y - y_1 = m(x - x_1)$.', 'formula', 3),
    fc('f17', 'How do you find the line through two points?', 'Find the slope from the points, use the point-slope form with either point, simplify, then check with the other point.', 'concept', 3),
    fc('f18', 'Line through $(-1, 4)$ and $(3, -2)$?', `$${eqTex(L6)}$.`, 'example', 3),
    fc('f19', 'Equation of the line through $(x_1, y_1)$ parallel to the $y$-axis?', '$x = x_1$ (and parallel to the $x$-axis: $y = y_1$).', 'formula', 3),
    fc('f20', 'How do you test whether a point lies on a line?', 'Substitute its coordinates: the point is on the line exactly when the equation is satisfied.', 'concept', 3),
    fc('f21', 'Condition for parallel lines?', '$m_1 = m_2$ (equal slopes, different intercepts).', 'formula', 4),
    fc('f22', 'Condition for perpendicular lines?', '$m_1 \\times m_2 = -1$; a perpendicular slope is $-\\dfrac{1}{m}$.', 'formula', 4),
    fc('f23', 'Slope perpendicular to a line of slope $\\dfrac{3}{2}$?', '$-\\dfrac{2}{3}$.', 'example', 4),
    fc('f24', 'Line through $(3, -2)$ parallel to $4x - y + 7 = 0$?', `$${eqTex(N2)}$.`, 'example', 4),
    fc('f25', 'How do you find where two lines meet?', 'Solve the two equations simultaneously; the solution is the meeting point.', 'concept', 4),
    fc('f26', 'Most common slip with perpendicular slopes?', 'Using $-m$ or $\\dfrac{1}{m}$: you must invert **and** change the sign.', 'exam-tip', 4),
    fc('f27', 'What is a perpendicular bisector, and how do you find it?', 'The line through the mid-point of a segment at right angles to it: mid-point, then slope $-\\dfrac{1}{m}$, then point-slope form.', 'concept', 5),
    fc('f28', 'Median or altitude: which goes to the mid-point?', 'The **median**. The altitude meets the opposite side at right angles.', 'exam-tip', 5),
    fc('f29', 'Median from $R(2, 5)$ in triangle $P(-2, -1)$, $Q(4, 1)$, $R$?', `Through $M(1, 0)$: $${eqTex(medR)}$.`, 'example', 5),
    fc('f30', 'Perpendicular bisector of $A(-1, 3)$ and $B(5, -1)$?', `$${eqTex(b6L)}$, through $M(2, 1)$.`, 'diagram', 5),
  ],
  status: 'draft', provenance: d1.provenance,
};
// flashcard facts
must(Math.abs(Math.tan(Math.PI / 3) - Math.sqrt(3)) < 1e-12 && deg(-1) === 135 && isL(L4b, r`y = \dfrac{3}{4}x + 2`) && xInt(Li).eq(3) && yInt(Li).eq(4) && perpThrough(through(P(0, 0), F(3, 2)), P(0, 0)) && slopeOf(perpThrough(through(P(0, 0), F(3, 2)), P(0, 0))).eq(F(-2, 3)), 'flashcard facts');

// ================================================================ release + tests
const release = {
  unit: 'icse-10-mathematics-ch13', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: {
    syllabus: 'topics t01–t05 exactly as in the ICSE 2027 syllabus (slope as tan θ and from two points; y = mx + c; point-slope and two-point forms; parallel and perpendicular lines; applications combining the section and mid-point formulae with slopes and equations: perpendicular bisector, median, altitude). The syllabus lists no removed topics for this chapter. Inclinations used are 0°, 30°, 45°, 60°, 90° and 135° only.',
    lines: 'every line is computed with exact fractions and normalised to ax + by + c = 0 with integer coefficients; a line from a point and a slope must contain the point and a second point along the slope; a line through two points is built from the slope AND from the two-point determinant form and must contain both points; parallel/perpendicular by coefficients AND slopes; meeting points by Cramer\'s rule and substituted into both lines; section points and centroids by collinearity and squared-length ratios; perpendicular bisectors by equal distances',
    working_lines: 'every equation of a line typed in a worked example, note, flashcard or model answer is parsed from its TeX, checked to be linear, and must have exactly the computed line as its graph (each step of a chain); numeric lines and equations in one unknown are checked by an exact parser (numbers equal exactly; an equation must hold at the verified solution)',
    figures: 'lines are drawn as functions on stated domains inside the view (vertical lines as dashed reference lines); every marked point lies exactly on a drawn line inside its domain, its label is generated from its coordinates, and a marked x-intercept is the only zero of its line',
  } },
};
const tests = chapterTests('Equation of a Straight Line', {
  A: ['m01', 'm05', 'm13', 'ar1', 's301', 's304'],
  B: ['l01', 'l03'],
}, {
  A: ['m02', 'm06', 'm10', 'm11', 'm15', 'm17', 'ar3', 'ar5', 's401', 's404', 's406'],
  B: ['l02', 'l05', 'l06'],
});
build({ dir: DIR, release, testsSpec: tests });

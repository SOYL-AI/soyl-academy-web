// Build ICSE 10 Mathematics ch06 Ratio and Proportion. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch06/src/build.mjs
// Every ratio, proportional and solution on the slides, in the notes, tables and figures is computed
// with prop.mjs (exact BigInt rationals) and asserted here; the build stops on any mismatch.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, geom, build, chapterTests, r } from './lib.mjs';
import { fr, ev, ratio, duplicate, triplicate, subDuplicate, subTriplicate, reciprocal, compound, isProp, isCont, meanProp, thirdProp, fourthProp, addToProp, subToCont, identity, propEnvs, contEnvs, cd, solveCD, kChange } from './prop.mjs';

setUnit('icse-10-mathematics-ch06');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const d = (s) => `$${s}$`;
const rt = (x) => `${x[0]} : ${x[1]}`;
const V = (x) => fr(x).v;
const E = propEnvs();

// ---------------------------------------------------------------- figures (computed from lengths in cm)
/** Axis-aligned rectangle with its bottom-left corner at (x0, y0) drawing units; w, h in cm; k drawing units per cm. */
function rect(prefix, x0, y0, w, h, k) {
  const R = (v) => Math.round(v * 1000) / 1000;
  const pts = [[x0, y0], [x0 + w * k, y0], [x0 + w * k, y0 + h * k], [x0, y0 + h * k]].map(([x, y]) => [R(x), R(y)]);
  return Object.fromEntries(pts.map((p, i) => [`${prefix}${i + 1}`, { at: p, label: false }]));
}
const sqK = 0.8;
const figSquares = geom({
  width: 6, height: 3.4, scale: { unit: 'cm', per_unit: sqK },
  points: { ...rect('P', 0.5, 0.5, 2, 2, sqK), ...rect('Q', 3.1, 0.5, 3, 3, sqK) },
  segments: [{ from: 'P1', to: 'P2', label: '2 cm' }, { from: 'P2', to: 'P3' }, { from: 'P3', to: 'P4' }, { from: 'P4', to: 'P1' }, { from: 'Q1', to: 'Q2', label: '3 cm' }, { from: 'Q2', to: 'Q3' }, { from: 'Q3', to: 'Q4' }, { from: 'Q4', to: 'Q1' }],
  polygons: [{ vertices: ['P1', 'P2', 'P3', 'P4'], fill: true }, { vertices: ['Q1', 'Q2', 'Q3', 'Q4'], fill: true, highlight: 'accent' }],
}, 'Two squares drawn to scale side by side: the first has side 2 centimetres and area 4 square centimetres; the second has side 3 centimetres and area 9 square centimetres. The sides are in the ratio 2 to 3 and the areas in the ratio 4 to 9.', 'Sides $2 : 3$, areas $4 : 9$: areas are in the **duplicate ratio** of the sides.');
must(rt(duplicate(2, 3)) === '4 : 9', 'squares');
const rsK = 0.3;
const figRectSq = geom({
  width: 6.8, height: 2.6, scale: { unit: 'cm', per_unit: rsK },
  points: { ...rect('R', 0.4, 0.4, 12, 3, rsK), ...rect('S', 4.6, 0.4, 6, 6, rsK) },
  segments: [{ from: 'R1', to: 'R2', label: '12 cm' }, { from: 'R2', to: 'R3', label: '3 cm' }, { from: 'R3', to: 'R4' }, { from: 'R4', to: 'R1' }, { from: 'S1', to: 'S2', label: '6 cm' }, { from: 'S2', to: 'S3' }, { from: 'S3', to: 'S4' }, { from: 'S4', to: 'S1' }],
  polygons: [{ vertices: ['R1', 'R2', 'R3', 'R4'], fill: true }, { vertices: ['S1', 'S2', 'S3', 'S4'], fill: true, highlight: 'accent' }],
}, 'A rectangle 12 centimetres by 3 centimetres and a square of side 6 centimetres, drawn to the same scale. Both have area 36 square centimetres, so the side of the square, 6, is the mean proportional between 12 and 3.', 'Equal areas: $12 \\times 3 = 6 \\times 6$, so $6$ is the mean proportional between $12$ and $3$.');
must(meanProp(12, 3).eq(6) && isProp(12, 6, 6, 3), 'rectangle and square');

// ---------------------------------------------------------------- deck 1 visuals and worked examples
must(rt(ratio(12, 18)) === '2 : 3' && isProp(2, 3, 8, 12) && isCont(4, 6, 9) && 2 * 12 === 24 && 3 * 8 === 24 && 4 * 9 === 36, 'glance');
const glance = table(['Idea', 'Example', 'Test'], [['Ratio', '$12 : 18 = 2 : 3$', 'divide both terms by $6$'], ['Proportion', '$2 : 3 = 8 : 12$', '$2 \\times 12 = 3 \\times 8 = 24$'], ['Continued proportion', '$4, 6, 9$', '$6^2 = 4 \\times 9 = 36$']], 'Table: the ratio 12 to 18 simplifies to 2 to 3; the proportion 2 to 3 equals 8 to 12 because 2 times 12 and 3 times 8 are both 24; the numbers 4, 6 and 9 are in continued proportion because 6 squared and 4 times 9 are both 36.', 'Ratio, proportion and continued proportion.');
const kinds = [
  ['Duplicate', '$a^2 : b^2$', `$2 : 5 \\to ${rt(duplicate(2, 5))}$`],
  ['Triplicate', '$a^3 : b^3$', `$2 : 5 \\to ${rt(triplicate(2, 5))}$`],
  ['Sub-duplicate', '$\\sqrt{a} : \\sqrt{b}$', `$16 : 49 \\to ${rt(subDuplicate(16, 49))}$`],
  ['Sub-triplicate', '$\\sqrt[3]{a} : \\sqrt[3]{b}$', `$8 : 125 \\to ${rt(subTriplicate(8, 125))}$`],
  ['Reciprocal', '$b : a$', `$2 : 5 \\to ${rt(reciprocal(2, 5))}$`],
  ['Compound (with $c : d$)', '$ac : bd$', `$2 : 5$ and $3 : 4 \\to 6 : 20 = ${rt(compound([[2, 5], [3, 4]]))}$`],
];
must(kinds.map((k) => k[2]).join('|') === '$2 : 5 \\to 4 : 25$|$2 : 5 \\to 8 : 125$|$16 : 49 \\to 4 : 7$|$8 : 125 \\to 2 : 5$|$2 : 5 \\to 5 : 2$|$2 : 5$ and $3 : 4 \\to 6 : 20 = 3 : 10$', 'kinds');
const kindsTable = table(['Kind of ratio', 'Of $a : b$', 'Example'], kinds, 'Table of kinds of ratio for a to b: duplicate a squared to b squared, so 2 to 5 gives 4 to 25; triplicate a cubed to b cubed, 8 to 125; sub-duplicate takes square roots, 16 to 49 gives 4 to 7; sub-triplicate takes cube roots, 8 to 125 gives 2 to 5; reciprocal b to a, 5 to 2; compound with c to d is ac to bd, so 2 to 5 with 3 to 4 gives 3 to 10.', 'Six kinds of ratio built from $a : b$.');
// WE1: compound of the duplicate ratio of 3 : 4 and the sub-duplicate ratio of 16 : 25
const we1a = duplicate(3, 4), we1b = subDuplicate(16, 25), we1 = compound([we1a, we1b]);
must(rt(we1a) === '9 : 16' && rt(we1b) === '4 : 5' && rt(we1) === '9 : 20' && 9 * 4 === 36 && 16 * 5 === 80, 'we1');
const we1Table = table(['Step', 'Result'], [['Duplicate ratio of $3 : 4$', '$9 : 16$'], ['Sub-duplicate ratio of $16 : 25$', '$4 : 5$'], ['Compound ratio', '$(9 \\times 4) : (16 \\times 5) = 36 : 80$'], ['Lowest terms (divide by $4$)', '$9 : 20$']], 'Working table: the duplicate ratio of 3 to 4 is 9 to 16; the sub-duplicate ratio of 16 to 25 is 4 to 5; multiplying term by term gives 36 to 80, which is 9 to 20 in lowest terms.', 'Find each ratio first, then multiply term by term.');
must(isProp(4, 7, 12, 21) && 4 * 21 === 84 && 7 * 12 === 84, 'proportion table');
const propTable = table(['Term', 'Name', 'Value'], [['First', 'extreme', '$4$'], ['Second', 'mean', '$7$'], ['Third', 'mean', '$12$'], ['Fourth', 'extreme', '$21$'], ['Product of extremes', '', '$4 \\times 21 = 84$'], ['Product of means', '', '$7 \\times 12 = 84$']], 'Table for the proportion 4 to 7 equals 12 to 21: 4 and 21 are the extremes, 7 and 12 are the means; the product of the extremes, 84, equals the product of the means, 84.', 'In $4 : 7 = 12 : 21$, extremes $\\times$ extremes $=$ means $\\times$ means.');
const propPlot = plot({ x: [0, 14], y: [0, 25], fns: ['1.75x'], pts: [[4, 7, '(4, 7)'], [8, 14, '(8, 14)'], [12, 21, '(12, 21)']] }, 'Graph of the straight line y equals 1.75 x through the origin. The points (4, 7), (8, 14) and (12, 21) all lie on it: each pair has the ratio 4 to 7, so any two of them form a proportion such as 4 to 7 equals 12 to 21.', 'Pairs in the same ratio lie on one line through the origin.');
must([[4, 7], [8, 14], [12, 21]].every(([a, b]) => rt(ratio(a, b)) === '4 : 7') && V(fr(7, 4)) === 1.75, 'proportion plot');
// WE2: 1.2, 2, 4.8, 8 in proportion?; fourth proportional to 5, 7, 15
must(isProp(1.2, 2, 4.8, 8) && fr(1.2).mul(8).eq(fr('9.6')) && fr(2).mul(fr(4.8)).eq(fr('9.6')) && fourthProp(5, 7, 15).eq(21), 'we2');
const we2Table = table(['Test', 'Working', 'Result'], [['Product of extremes', '$1.2 \\times 8 = 9.6$', ''], ['Product of means', '$2 \\times 4.8 = 9.6$', 'equal, so in proportion'], ['Fourth proportional to $5, 7, 15$', '$5 : 7 = 15 : x$, $x = \\dfrac{7 \\times 15}{5}$', '$21$']], 'Working table: for 1.2, 2, 4.8 and 8 the product of the extremes is 9.6 and the product of the means is 9.6, so they are in proportion; the fourth proportional to 5, 7 and 15 is 7 times 15 divided by 5, which is 21.', 'Equal cross-products mean the numbers are in proportion.');
const contFlow = flow('TB', [['a', '$a : b = b : c$'], ['b', '$b^2 = ac$'], ['m', 'Mean proportional: $b = \\sqrt{ac}$'], ['t', 'Third proportional: $c = \\dfrac{b^2}{a}$']], [['a', 'b'], ['b', 'm'], ['b', 't']], 'Flow chart: a to b equals b to c gives b squared equals a times c; from this the mean proportional b is the square root of a c, and the third proportional c is b squared divided by a.', 'Continued proportion: one equation, two formulas.');
must(identity('b^2', 'ac', contEnvs()) === 6 && identity('b', 'sqrt(ac)', contEnvs()) === 6 && identity('c', 'b^2/a', contEnvs()) === 6, 'continued flow');
// WE3: mean proportional between 0.32 and 0.5; third proportional to 5 and 7.5
must(meanProp(0.32, 0.5).eq(fr('0.4')) && fr(0.32).mul(fr(0.5)).eq(fr('0.16')) && thirdProp(5, 7.5).eq(fr('11.25')) && fr(7.5).pow(2).eq(fr('56.25')), 'we3');
const we3Table = table(['Find', 'Working', 'Answer'], [['Mean proportional between $0.32$ and $0.5$', '$\\sqrt{0.32 \\times 0.5} = \\sqrt{0.16}$', '$0.4$'], ['Third proportional to $5$ and $7.5$', '$\\dfrac{7.5^2}{5} = \\dfrac{56.25}{5}$', '$11.25$']], 'Working table: the mean proportional between 0.32 and 0.5 is the square root of 0.16, which is 0.4; the third proportional to 5 and 7.5 is 7.5 squared, 56.25, divided by 5, which is 11.25.', 'Both answers come from $b^2 = ac$.');
// WE4: x - 1, x + 2, x + 8 in continued proportion
const we4x = subToCont(-1, 2, 8).neg();
must(we4x.eq(4) && isCont(3, 6, 12) && ev('(x+2)^2-(x-1)(x+8)', { x: 0 }).eq(12) && ev('(x+2)^2-(x-1)(x+8)', { x: 4 }).eq(0), 'we4');
const we4Table = table(['Term', 'Value at $x = 4$'], [['$x - 1$', '$3$'], ['$x + 2$', '$6$'], ['$x + 8$', '$12$'], ['Ratios', '$3 : 6 = 6 : 12 = 1 : 2$']], 'Table: with x equal to 4 the three terms are 3, 6 and 12, and 3 to 6 equals 6 to 12, both being 1 to 2, so they are in continued proportion.', 'Check: each term is twice the one before.');
const fourPlot = plot({ x: [0, 5], y: [0, 32], fns: ['8*1.5^(x-1)'], pts: [[1, 8, '(1, 8)'], [2, 12, '(2, 12)'], [3, 18, '(3, 18)'], [4, 27, '(4, 27)']], xl: 'position', yl: 'term' }, 'Graph of the terms 8, 12, 18 and 27 against their positions 1 to 4, on the curve y equals 8 times 1.5 to the power x minus 1. Each term is 1.5 times the one before, so the four numbers are in continued proportion.', 'Four numbers in continued proportion: a common ratio of $1.5$.');
must(isCont(8, 12, 18) && isCont(12, 18, 27) && rt(ratio(8, 27)) === rt(triplicate(2, 3)), 'four in continued proportion');
const sum1 = table(['Idea', 'Key fact'], [['Kinds of ratio', 'duplicate $a^2 : b^2$, triplicate $a^3 : b^3$, sub-duplicate $\\sqrt{a} : \\sqrt{b}$, sub-triplicate, reciprocal $b : a$, compound $ac : bd$'], ['Proportion $a : b = c : d$', 'product of extremes $ad$ = product of means $bc$'], ['Fourth proportional to $a, b, c$', '$\\dfrac{bc}{a}$'], ['Continued proportion $a, b, c$', '$b^2 = ac$'], ['Mean proportional', '$\\sqrt{ac}$'], ['Third proportional to $a, b$', '$\\dfrac{b^2}{a}$']], 'Summary table for part 1: kinds of ratio; a proportion has equal products of extremes and means; the fourth proportional to a, b, c is b c over a; continued proportion means b squared equals a c; the mean proportional is the square root of a c; the third proportional to a and b is b squared over a.', 'Part 1 on one card.');

// ---------------------------------------------------------------- deck 2 visuals and worked examples
const PROPS = [['invertendo', 'b/a', 'd/c'], ['alternendo', 'a/c', 'b/d'], ['componendo', '(a+b)/b', '(c+d)/d'], ['dividendo', '(a-b)/b', '(c-d)/d'], ['componendo and dividendo', '(a+b)/(a-b)', '(c+d)/(c-d)']];
must(PROPS.every(([, l, rr]) => identity(l, rr, E) === 6), 'properties');
const propFlow = flow('LR', [['p', '$a : b = c : d$'], ['i', 'Invertendo: $b : a = d : c$'], ['al', 'Alternendo: $a : c = b : d$'], ['co', 'Componendo: $(a + b) : b = (c + d) : d$'], ['di', 'Dividendo: $(a - b) : b = (c - d) : d$'], ['cd', 'Componendo and dividendo: $(a + b) : (a - b) = (c + d) : (c - d)$']], [['p', 'i'], ['p', 'al'], ['p', 'co'], ['p', 'di'], ['p', 'cd']], 'Flow chart: from a to b equals c to d follow five properties: invertendo, b to a equals d to c; alternendo, a to c equals b to d; componendo, a plus b to b equals c plus d to d; dividendo, a minus b to b equals c minus d to d; and componendo and dividendo, a plus b to a minus b equals c plus d to c minus d.', 'Five properties of one proportion.');
const [pa, pb, pc, pd] = [7, 4, 21, 12];
must(isProp(pa, pb, pc, pd), 'base proportion');
const cross = (a, b, c, dd) => { must(isProp(a, b, c, dd), `${a} : ${b} = ${c} : ${dd}`); return `$${a} \\times ${dd} = ${a * dd} = ${b} \\times ${c}$`; };
const invAltTable = table(['Property', 'Proportion', 'Cross-products'], [['Given', `$${pa} : ${pb} = ${pc} : ${pd}$`, cross(pa, pb, pc, pd)], ['Invertendo', `$${pb} : ${pa} = ${pd} : ${pc}$`, cross(pb, pa, pd, pc)], ['Alternendo', `$${pa} : ${pc} = ${pb} : ${pd}$`, cross(pa, pc, pb, pd)]], 'Table for 7 to 4 equals 21 to 12: invertendo gives 4 to 7 equals 12 to 21, alternendo gives 7 to 21 equals 4 to 12; in every row the two cross-products are 84.', 'Each new proportion still has equal cross-products.');
const [ca, cb, cc, cdd] = [pa + pb, pb, pc + pd, pd], [da, db, dc, ddd] = [pa - pb, pb, pc - pd, pd], [ea, eb, ec, ed] = [pa + pb, pa - pb, pc + pd, pc - pd];
const compTable = table(['Property', 'Proportion', 'Cross-products'], [['Componendo', `$${ca} : ${cb} = ${cc} : ${cdd}$`, cross(ca, cb, cc, cdd)], ['Dividendo', `$${da} : ${db} = ${dc} : ${ddd}$`, cross(da, db, dc, ddd)], ['Componendo and dividendo', `$${ea} : ${eb} = ${ec} : ${ed}$`, cross(ea, eb, ec, ed)]], 'Table for 7 to 4 equals 21 to 12: componendo gives 11 to 4 equals 33 to 12; dividendo gives 3 to 4 equals 9 to 12; componendo and dividendo gives 11 to 3 equals 33 to 9; each pair of cross-products is equal.', 'The new proportions from $7 : 4 = 21 : 12$.');
must(`${ca},${cc},${da},${dc},${ea},${eb},${ec},${ed}` === '11,33,3,9,11,3,33,9', 'comp table values');
const whyFlow = flow('TB', [['s', '$\\dfrac{a}{b} = \\dfrac{c}{d}$'], ['c', 'Add $1$: $\\dfrac{a + b}{b} = \\dfrac{c + d}{d}$'], ['v', 'Subtract $1$: $\\dfrac{a - b}{b} = \\dfrac{c - d}{d}$'], ['f', 'Divide: $\\dfrac{a + b}{a - b} = \\dfrac{c + d}{c - d}$']], [['s', 'c', 'componendo'], ['s', 'v', 'dividendo'], ['c', 'f'], ['v', 'f']], 'Flow chart: starting from a over b equals c over d, adding 1 to both sides gives componendo and subtracting 1 gives dividendo; dividing the first result by the second gives componendo and dividendo.', 'Why componendo and dividendo works.');
// WE1 (deck 2): (2x + 9)/(2x - 9) = 5/3
const w1 = solveCD(2, 9, 5, 3);
must(w1.eq(18) && cd(5, 3).eq(4) && ev('(2x+9)/(2x-9)', { x: 18 }).eq(fr(5, 3)) && 45 / 27 === 5 / 3, 'deck 2 we1');
const w1Plot = plot({ x: [8, 30], y: [0, 4], fns: ['(2x+9)/(2x-9)', '5/3'], pts: [[18, 5 / 3, 'x = 18']] }, 'Graph of y equals 2x plus 9 over 2x minus 9 for x from 8 to 30, falling towards 1, and the horizontal line y equals five thirds. They meet at x equals 18, the solution of the equation.', 'The curve meets the line $y = \\dfrac{5}{3}$ at $x = 18$.');
// WE2 (deck 2): (5x + 3y)/(5x - 3y) = 7/3
const w2 = cd(7, 3).mul(6).div(10);
must(w2.eq(fr(3, 2)) && ev('(5x+3y)/(5x-3y)', { x: 3, y: 2 }).eq(fr(7, 3)) && fr(21, 9).eq(fr(7, 3)), 'deck 2 we2');
const w2Table = table(['Step', 'Working'], [['Componendo and dividendo', '$\\dfrac{10x}{6y} = \\dfrac{7 + 3}{7 - 3} = \\dfrac{10}{4}$'], ['Simplify', '$\\dfrac{x}{y} = \\dfrac{10}{4} \\times \\dfrac{6}{10} = \\dfrac{3}{2}$'], ['Answer', '$x : y = 3 : 2$'], ['Check with $x = 3$, $y = 2$', '$\\dfrac{15 + 6}{15 - 6} = \\dfrac{21}{9} = \\dfrac{7}{3}$']], 'Working table: componendo and dividendo gives 10x over 6y equals 10 over 4; so x over y equals 3 over 2, that is x to y is 3 to 2; check: 21 over 9 equals 7 over 3.', 'The coefficients $5$ and $3$ must be divided out at the end.');
// WE3 (deck 2): k-method, (a + b)^2/(c + d)^2 = ab/cd
const kRows = [[3, 5, 2], [6, 9, fr(1, 3)]].map(([b, dd, k]) => {
  const K = fr(k), a = fr(b).mul(K), c = fr(dd).mul(K);
  const L = a.add(b).pow(2), Lb = c.add(dd).pow(2), R1 = a.mul(b), R2 = c.mul(dd);
  must(L.div(Lb).eq(R1.div(R2)), 'k row');
  return [`$b = ${b}$, $d = ${dd}$, $k = ${K.tex()}$: $a = ${a.tex()}$, $c = ${c.tex()}$`, `$\\dfrac{${L}}{${Lb}} = ${L.div(Lb).tex()}$`, `$\\dfrac{${R1}}{${R2}} = ${R1.div(R2).tex()}$`];
});
must(identity('(a+b)^2/(c+d)^2', 'ab/(cd)', E) === 6 && identity('(bk+b)^2/(dk+d)^2', 'b^2/d^2', E) === 6, 'deck 2 we3');
const w3Table = table(['Values', 'LHS $\\dfrac{(a + b)^2}{(c + d)^2}$', 'RHS $\\dfrac{ab}{cd}$'], kRows, 'Table testing the identity with numbers: with b equal to 3, d equal to 5 and k equal to 2, both sides equal 9 over 25; with b equal to 6, d equal to 9 and k equal to one third, both sides equal 4 over 9.', 'A numerical check is not a proof, but it catches slips.');
// WE4 (deck 2): radical equation
const w4r = cd(2, 1).pow(2), w4 = solveCD(1, 4, w4r, 1);
must(w4r.eq(9) && w4.eq(5) && ev('(sqrt(x+4)+sqrt(x-4))/(sqrt(x+4)-sqrt(x-4))', { x: 5 }).eq(2), 'deck 2 we4');
const w4Table = table(['Step', 'Working'], [['Componendo and dividendo', '$\\dfrac{\\sqrt{x + 4}}{\\sqrt{x - 4}} = \\dfrac{2 + 1}{2 - 1} = 3$'], ['Square both sides', '$\\dfrac{x + 4}{x - 4} = 9$, so $x + 4 = 9x - 36$'], ['Solve', '$8x = 40$, so $x = 5$'], ['Check', '$\\dfrac{\\sqrt{9} + \\sqrt{1}}{\\sqrt{9} - \\sqrt{1}} = \\dfrac{4}{2} = 2$']], 'Working table: componendo and dividendo gives root of x plus 4 over root of x minus 4 equals 3; squaring gives x plus 4 equals 9 times x minus 4, so 8x equals 40 and x equals 5; check: 3 plus 1 over 3 minus 1 equals 2.', 'Square only after the roots stand alone.');
const appFlow = flow('LR', [['u', 'Name the unknown'], ['w', 'Write the proportion'], ['p', 'Product of extremes $=$ product of means'], ['s', 'Solve'], ['c', 'Check in the original ratios']], [['u', 'w'], ['w', 'p'], ['p', 's'], ['s', 'c']], 'Flow chart for a direct application: name the unknown, write the proportion, set the product of the extremes equal to the product of the means, solve, and check the answer in the original ratios.', 'Five steps for a direct application.');
// WE5 (deck 2): add x to 3, 6, 7, 12
const w5 = addToProp(3, 6, 7, 12);
must(w5.eq(3) && isProp(6, 9, 10, 15) && 3 * 12 === 36 && 3 + 12 === 15 && 6 * 7 === 42 && 6 + 7 === 13, 'deck 2 we5');
const w5Table = table(['Step', 'Working'], [['Equation', '$(3 + x)(12 + x) = (6 + x)(7 + x)$'], ['Expand', '$36 + 15x + x^2 = 42 + 13x + x^2$'], ['Solve', '$2x = 6$, so $x = 3$'], ['Check', '$6 \\times 15 = 90 = 9 \\times 10$']], 'Working table: the equation 3 plus x times 12 plus x equals 6 plus x times 7 plus x expands to 36 plus 15x equals 42 plus 13x, so x equals 3; the new numbers 6, 9, 10 and 15 have equal cross-products, 90.', 'The $x^2$ terms always cancel.');
// WE6 (deck 2): 2k, 5k minus 3 each -> 1 : 4
const w6 = kChange(2, 5, -3, 1, 4);
must(w6 === 3, 'deck 2 we6');
const w6Rows = [2, 3, 4, 5].map((k) => { const a = 2 * k - 3, b = 5 * k - 3; return [`$${k}$`, `$${2 * k}, ${5 * k}$`, `$${a} : ${b}$`, isProp(a, b, 1, 4) ? 'yes' : 'no']; });
must(w6Rows.map((x) => x[3]).join() === 'no,yes,no,no', 'we6 table');
const w6Table = table(['$k$', 'Numbers $2k, 5k$', 'After subtracting $3$', 'Equal to $1 : 4$?'], w6Rows, 'Table trying k from 2 to 5 for numbers 2k and 5k: after subtracting 3, k equal to 2 gives 1 to 7, k equal to 3 gives 3 to 12 which equals 1 to 4, k equal to 4 gives 5 to 17 and k equal to 5 gives 7 to 22. Only k equal to 3 works.', 'Only $k = 3$ gives $1 : 4$: the numbers are $6$ and $15$.');
const sum2 = table(['Property', 'From $a : b = c : d$'], [['Invertendo', '$b : a = d : c$'], ['Alternendo', '$a : c = b : d$'], ['Componendo', '$(a + b) : b = (c + d) : d$'], ['Dividendo', '$(a - b) : b = (c - d) : d$'], ['Componendo and dividendo', '$(a + b) : (a - b) = (c + d) : (c - d)$, and conversely'], ['k-method', 'put $a = bk$, $c = dk$ to prove identities']], 'Summary table for part 2: invertendo, alternendo, componendo, dividendo, and componendo and dividendo, which also works in reverse; and the k-method, putting a equal to b k and c equal to d k, for proving identities.', 'Part 2 on one card.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Ratio and Proportion — Part 1: Ratios, proportion and proportionals',
  goals: ['Form duplicate, triplicate, sub-duplicate, sub-triplicate, reciprocal and compound ratios', 'Test whether four numbers are in proportion and find the fourth proportional', 'Find the mean proportional and the third proportional', 'Work with numbers in continued proportion'],
  slides: [
    sl('title', 'Ratio and Proportion, Part 1', { b: 'A ratio compares two quantities; a proportion says two ratios are equal.', v: glance, n: 'Welcome to ratio and proportion. A ratio compares two quantities of the same kind, such as twelve to eighteen, which simplifies to two to three. A proportion says that two ratios are equal. In this part you will meet new kinds of ratio, test proportions, and find missing proportionals.' }),
    sl('concept', 'What you will be able to do', { ul: ['Form **duplicate**, **triplicate**, **sub-duplicate**, **sub-triplicate**, **reciprocal** and **compound** ratios', 'Test four numbers for proportion', 'Find the **fourth**, **third** and **mean** proportional', 'Work with **continued proportion**'], n: 'These are your goals for part one. First the kinds of ratio built from a single ratio. Then proportion and its test: the product of the extremes equals the product of the means. Finally continued proportion, with the mean and third proportionals.' }),
    sl('concept', 'Kinds of ratio', { b: 'From one ratio $a : b$ (with $a, b > 0$) we can build several others:', v: kindsTable, n: 'Squaring both terms gives the duplicate ratio; cubing gives the triplicate ratio. Square roots give the sub duplicate ratio, and cube roots the sub triplicate ratio. Swapping the terms gives the reciprocal ratio. Multiplying two ratios term by term gives their compound ratio. Always simplify the answer to lowest terms.' }),
    sl('diagram', 'Why duplicate ratios matter', { b: 'If two squares have sides in the ratio $2 : 3$, their areas are in the ratio $4 : 9$.', v: figSquares, n: 'Here is one place duplicate ratios appear. The sides of these squares are two and three centimetres. Their areas are four and nine square centimetres. So areas are in the duplicate ratio of the sides. In the same way, volumes of cubes are in the triplicate ratio of their edges.' }),
    sl('example', 'Worked example 1: a compound ratio', { b: 'Find the compound ratio of the duplicate ratio of $3 : 4$ and the sub-duplicate ratio of $16 : 25$.', ul: ['**Step 1 —** Duplicate ratio of $3 : 4$ is $9 : 16$.', '**Step 2 —** Sub-duplicate ratio of $16 : 25$ is $4 : 5$.', '**Step 3 —** Compound ratio $= (9 \\times 4) : (16 \\times 5) = 36 : 80$.', '**Answer —** $9 : 20$.'], v: we1Table, n: 'Work out each ratio first. The duplicate ratio of three to four is nine to sixteen. The sub duplicate ratio of sixteen to twenty five is four to five. Now multiply first terms together and second terms together: thirty six to eighty. Divide both by four to get nine to twenty.' }),
    sl('check', 'Quick check: duplicate ratio', { b: 'Square both terms.', chk: 'm01', n: 'Square each term of the ratio. Do not simply double them.' }),
    sl('concept', 'Proportion: extremes and means', { b: 'Four numbers $a, b, c, d$ are **in proportion**, written $a : b = c : d$ or $a : b :: c : d$, when $\\dfrac{a}{b} = \\dfrac{c}{d}$. Then $a$ and $d$ are the **extremes**, $b$ and $c$ the **means**, and $ad = bc$.', v: propTable, n: 'Four numbers are in proportion when the first two have the same ratio as the last two. The first and fourth are called the extremes, the second and third the means. Cross multiplying shows the test: the product of the extremes equals the product of the means. Here both products are eighty four.' }),
    sl('diagram', 'A proportion on a graph', { b: 'Pairs with the same ratio lie on one straight line through the origin.', v: propPlot, n: 'Plot each pair as a point. Four and seven, eight and fourteen, twelve and twenty one all lie on the same straight line through the origin, because each pair is in the ratio four to seven. Any two of these pairs make a proportion.' }),
    sl('example', 'Worked example 2: testing and the fourth proportional', { b: '(a) Are $1.2$, $2$, $4.8$ and $8$ in proportion? (b) Find the fourth proportional to $5$, $7$ and $15$.', ul: ['**(a)** Extremes: $1.2 \\times 8 = 9.6$. Means: $2 \\times 4.8 = 9.6$. Equal, so **yes**.', '**(b)** $5 : 7 = 15 : x$, so $5x = 7 \\times 15 = 105$.', '**Answer —** $x = 21$.'], v: we2Table, n: 'For part a, multiply the extremes, one point two and eight, to get nine point six. Multiply the means, two and four point eight, also nine point six. The products agree, so the numbers are in proportion. For part b, the fourth proportional x satisfies five to seven equals fifteen to x, so x is twenty one.' }),
    sl('check', 'Quick check: fourth proportional', { b: 'Write the proportion with $x$ last.', chk: 'm04', n: 'Write four to ten equals six to x, then use the product of extremes and means.' }),
    sl('concept', 'Continued proportion', { b: 'Three numbers $a, b, c$ are in **continued proportion** when $a : b = b : c$. Then $b$ is the **mean proportional** between $a$ and $c$, and $c$ is the **third proportional** to $a$ and $b$.', v: contFlow, n: 'In continued proportion the middle number is shared: a is to b as b is to c. Cross multiplying gives b squared equals a c. So the mean proportional is the square root of a c, and the third proportional is b squared divided by a.' }),
    sl('diagram', 'The mean proportional as a square', { b: 'A rectangle $12$ cm by $3$ cm and a square of side $6$ cm have the same area.', v: figRectSq, n: 'Here is a picture of the mean proportional. A rectangle twelve by three has area thirty six. A square with the same area has side six. Six is the mean proportional between twelve and three, because twelve is to six as six is to three.' }),
    sl('example', 'Worked example 3: mean and third proportionals', { b: 'Find (a) the mean proportional between $0.32$ and $0.5$ (b) the third proportional to $5$ and $7.5$.', ul: ['**(a)** $\\sqrt{0.32 \\times 0.5} = \\sqrt{0.16} = 0.4$.', '**(b)** $5 : 7.5 = 7.5 : x$, so $5x = 56.25$.', '**Answer —** (a) $0.4$ (b) $x = 11.25$.'], v: we3Table, n: 'For the mean proportional, multiply the two numbers and take the square root: the product is zero point one six, and its square root is zero point four. For the third proportional, write five to seven point five equals seven point five to x. Then five x is fifty six point two five, so x is eleven point two five.' }),
    sl('example', 'Worked example 4: finding an unknown term', { b: 'Find $x$ if $x - 1$, $x + 2$ and $x + 8$ are in continued proportion.', ul: ['**Step 1 —** $(x + 2)^2 = (x - 1)(x + 8)$.', '**Step 2 —** $x^2 + 4x + 4 = x^2 + 7x - 8$, so $3x = 12$.', '**Answer —** $x = 4$; the numbers are $3, 6, 12$.'], v: we4Table, n: 'Use the rule that the square of the middle term equals the product of the other two. Expand both sides. The x squared terms cancel, leaving three x equals twelve, so x is four. The numbers are three, six and twelve, and each is twice the one before.' }),
    sl('check', 'Quick check: mean proportional', { b: 'Multiply, then take the square root.', chk: 'fb1', n: 'Multiply five by forty five, then find the square root of the product.' }),
    sl('concept', 'Four numbers in continued proportion', { b: '$a, b, c, d$ are in continued proportion when $a : b = b : c = c : d$. For example $8, 12, 18, 27$ (common ratio $2 : 3$), and $a : d = 8 : 27$, the **triplicate** ratio of $a : b$.', v: fourPlot, n: 'Four numbers can be in continued proportion too. Eight, twelve, eighteen and twenty seven each grow by the same factor, one point five. The ratio of the first to the last, eight to twenty seven, is the cube of two to three: the triplicate ratio of the first two terms.' }),
    sl('check', 'Quick check: continued proportion', { b: 'Test $b^2 = ac$ for each set.', chk: 'm12', n: 'For each set, square the middle number and compare it with the product of the other two.' }),
    sl('summary', 'Summary', { ul: ['Duplicate $a^2 : b^2$; triplicate $a^3 : b^3$; sub-duplicate and sub-triplicate use roots', 'Compound ratio: multiply term by term', 'Proportion: product of extremes $=$ product of means', 'Fourth proportional to $a, b, c$: $\\dfrac{bc}{a}$', 'Continued proportion: $b^2 = ac$; mean $\\sqrt{ac}$; third $\\dfrac{b^2}{a}$'], v: sum1, n: 'To sum up part one. Duplicate and triplicate ratios square and cube the terms; sub duplicate and sub triplicate take roots. A compound ratio multiplies term by term. Four numbers are in proportion when the product of the extremes equals the product of the means. In continued proportion, the middle term squared equals the product of the outer terms.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Proportional (2 marks):** proportion written 1 + answer 1', '**Show the test:** write both products, then conclude', '**Mistake:** doubling instead of squaring for a duplicate ratio', '**Mistake:** taking the third proportional in the wrong order', '**Mistake:** leaving a ratio such as $36 : 80$ unsimplified', '**Mistake:** giving the average instead of the mean proportional'], n: 'In the exam, always write the proportion before solving it, because that line earns a mark. For a test of proportion, show both products and state your conclusion. Simplify every ratio to lowest terms. And remember: the mean proportional is a square root, not an average.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Ratio and Proportion — Part 2: Properties of proportion and applications',
  goals: ['State and use invertendo, alternendo, componendo and dividendo', 'Use componendo and dividendo to solve equations and find ratios', 'Prove relations with the k-method', 'Solve simple direct applications of proportion'],
  slides: [
    sl('title', 'Ratio and Proportion, Part 2', { b: 'One proportion gives five more, and one of them solves equations quickly.', v: propFlow, n: 'Welcome to part two. Starting from a single proportion, a is to b as c is to d, we can write five new proportions. They have Latin names: invertendo, alternendo, componendo, dividendo, and componendo and dividendo. The last one is a powerful tool for solving equations.' }),
    sl('concept', 'What you will be able to do', { ul: ['State the five **properties of proportion**', 'Solve equations with **componendo and dividendo**', 'Find a ratio such as $x : y$ from an equation', 'Prove relations with the **k-method**', 'Solve direct **applications** of proportion'], n: 'These are your goals for part two. Learn the five properties and when to use each. Use componendo and dividendo to solve equations and find ratios. Prove relations by putting every term in terms of a common ratio k. Finally, apply proportion to simple problems.' }),
    sl('concept', 'Invertendo and alternendo', { b: 'If $a : b = c : d$, then **invertendo** gives $b : a = d : c$ and **alternendo** gives $a : c = b : d$ (swap the means).', v: invAltTable, n: 'Invertendo turns both ratios upside down. Alternendo swaps the two middle terms, so the first is to the third as the second is to the fourth. With seven to four equals twenty one to twelve, both new proportions still have equal cross products, eighty four.' }),
    sl('concept', 'Componendo and dividendo', { b: '**Componendo:** $(a + b) : b = (c + d) : d$. **Dividendo:** $(a - b) : b = (c - d) : d$. **Componendo and dividendo:** $(a + b) : (a - b) = (c + d) : (c - d)$.', v: compTable, n: 'Componendo adds the second term to the first in each ratio. Dividendo subtracts it. Componendo and dividendo combines them: the sum over the difference on one side equals the sum over the difference on the other. Check the table: every new proportion has equal cross products.' }),
    sl('diagram', 'Why componendo and dividendo works', { b: 'Add $1$ to both sides, subtract $1$ from both sides, then divide the two results.', v: whyFlow, n: 'Why does it work? Adding one to both sides of a over b equals c over d gives componendo. Subtracting one gives dividendo. Dividing the first result by the second cancels b and d, leaving componendo and dividendo. The steps can be reversed, so the property also works backwards.' }),
    sl('check', 'Quick check: name the property', { b: 'Which terms were swapped?', chk: 'm08', n: 'Look at which two terms changed places, and recall the name of that property.' }),
    sl('example', 'Worked example 1: solving an equation', { b: 'Solve $\\dfrac{2x + 9}{2x - 9} = \\dfrac{5}{3}$.', ul: ['**Step 1 —** Componendo and dividendo: $\\dfrac{4x}{18} = \\dfrac{5 + 3}{5 - 3} = 4$.', '**Step 2 —** $4x = 72$, so $x = 18$.', '**Check —** $\\dfrac{45}{27} = \\dfrac{5}{3}$.'], v: w1Plot, n: 'Apply componendo and dividendo. On the left, the sum of numerator and denominator is four x and the difference is eighteen. On the right, five plus three over five minus three is four. So four x over eighteen is four, and x is eighteen. The graph confirms it: the curve meets the line at eighteen.' }),
    sl('example', 'Worked example 2: finding a ratio', { b: 'If $\\dfrac{5x + 3y}{5x - 3y} = \\dfrac{7}{3}$, find $x : y$.', ul: ['**Step 1 —** Componendo and dividendo: $\\dfrac{10x}{6y} = \\dfrac{10}{4}$.', '**Step 2 —** $\\dfrac{x}{y} = \\dfrac{10}{4} \\times \\dfrac{6}{10} = \\dfrac{3}{2}$.', '**Answer —** $x : y = 3 : 2$.'], v: w2Table, n: 'Componendo and dividendo removes the y from the top and the x from the bottom: ten x over six y equals ten over four. Now divide out the coefficients. Multiply by six over ten to get x over y equals three over two. Check by putting x equal to three and y equal to two.' }),
    sl('check', 'Quick check: dividendo', { b: 'Subtract, keep the second term.', chk: 'm09', n: 'Which property subtracts the second term from the first? Apply it to nine and four.' }),
    sl('example', 'Worked example 3: the k-method', { b: 'If $a : b = c : d$, prove that $\\dfrac{(a + b)^2}{(c + d)^2} = \\dfrac{ab}{cd}$.', ul: ['**Step 1 —** Let $\\dfrac{a}{b} = \\dfrac{c}{d} = k$, so $a = bk$, $c = dk$.', '**Step 2 —** LHS $= \\dfrac{b^2(k + 1)^2}{d^2(k + 1)^2} = \\dfrac{b^2}{d^2}$.', '**Step 3 —** RHS $= \\dfrac{bk \\cdot b}{dk \\cdot d} = \\dfrac{b^2}{d^2}$, so LHS $=$ RHS.'], v: w3Table, n: 'Call the common value of the two ratios k. Then a is b k and c is d k. Substitute into both sides. The left side simplifies to b squared over d squared, and so does the right side. The table tests the result with numbers, which is a useful check but not a proof.' }),
    sl('example', 'Worked example 4: an equation with square roots', { b: 'Solve $\\dfrac{\\sqrt{x + 4} + \\sqrt{x - 4}}{\\sqrt{x + 4} - \\sqrt{x - 4}} = 2$.', ul: ['**Step 1 —** Componendo and dividendo: $\\dfrac{\\sqrt{x + 4}}{\\sqrt{x - 4}} = 3$.', '**Step 2 —** Square: $x + 4 = 9(x - 4)$, so $8x = 40$.', '**Answer —** $x = 5$.'], v: w4Table, n: 'The sum and difference of two square roots is the signal for componendo and dividendo. It leaves one root over the other, equal to three. Now square both sides: x plus four equals nine times x minus four. So eight x is forty and x is five. Check by substituting.' }),
    sl('check', 'Quick check: solve with the property', { b: 'Write $3$ as $\\dfrac{3}{1}$ first.', chk: 'n01', n: 'Write the right side as three over one, apply componendo and dividendo, and solve for x.' }),
    sl('concept', 'Direct applications of proportion', { b: 'Many problems become a proportion: scales, recipes, changing ratios, numbers added to make a proportion.', v: appFlow, n: 'Many everyday problems hide a proportion. A map scale, a recipe for more people, or two numbers whose ratio changes. Name the unknown, write the proportion, use the product of extremes and means, solve, and always check the answer in the original ratios.' }),
    sl('example', 'Worked example 5: making numbers proportional', { b: 'What number must be added to each of $3$, $6$, $7$ and $12$ so that they are in proportion?', ul: ['**Step 1 —** $(3 + x)(12 + x) = (6 + x)(7 + x)$.', '**Step 2 —** $36 + 15x = 42 + 13x$, so $2x = 6$.', '**Answer —** $x = 3$: the numbers $6, 9, 10, 15$ are in proportion.'], v: w5Table, n: 'Let x be the number added. The new extremes are three plus x and twelve plus x; the new means are six plus x and seven plus x. Set the products equal. The x squared terms cancel, leaving two x equals six, so x is three. Check: six times fifteen and nine times ten are both ninety.' }),
    sl('example', 'Worked example 6: a changing ratio', { b: 'Two numbers are in the ratio $2 : 5$. When $3$ is subtracted from each, the ratio becomes $1 : 4$. Find the numbers.', ul: ['**Step 1 —** Let the numbers be $2k$ and $5k$: $\\dfrac{2k - 3}{5k - 3} = \\dfrac{1}{4}$.', '**Step 2 —** $8k - 12 = 5k - 3$, so $3k = 9$ and $k = 3$.', '**Answer —** $6$ and $15$.'], v: w6Table, n: 'Write the numbers as two k and five k. After subtracting three, their ratio is one to four. Cross multiply: eight k minus twelve equals five k minus three, so k is three. The numbers are six and fifteen. The table shows that no other value of k works.' }),
    sl('check', 'Quick check: a map scale', { b: 'Keep centimetres with centimetres.', chk: 'm14', n: 'Write the proportion with the map lengths on one side and the real distances on the other.' }),
    sl('summary', 'Summary', { ul: ['Invertendo, alternendo, componendo, dividendo, componendo and dividendo', 'C&D: sum over difference on both sides; it also works in reverse', 'Look for C&D when an equation is (sum) over (difference)', 'k-method: put $a = bk$, $c = dk$', 'Applications: write the proportion, then product of extremes $=$ product of means'], v: sum2, n: 'To sum up part two. One proportion gives invertendo, alternendo, componendo, dividendo, and componendo and dividendo. Use componendo and dividendo when you see a sum over a difference. Prove identities with the k method. In applications, write the proportion first and check your answer.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**C&D equation (3–4 marks):** property applied 1 + simplified 1 + answer 1 (+ check 1)', '**Proof (3 marks):** substitution 1 + each side simplified 1 + conclusion 1', '**Mistake:** applying C&D to one side only', '**Mistake:** forgetting the negative square root when squares appear', '**Mistake:** not dividing out coefficients when finding $x : y$', '**Mistake:** calling alternendo invertendo'], n: 'Name the property you use, because examiners give method marks for it. Apply componendo and dividendo to both sides at once. When you take a square root, think about the negative root too. In proofs, simplify each side separately and then conclude that they are equal.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch06', version: 1, title: 'Ratio and Proportion — chapter notes', language: 'en',
  sections: [
    { heading: '1. Ratio and its kinds', body_md: r`A **ratio** $a : b$ ($b \ne 0$) compares two quantities of the same kind; it is unchanged when both terms are multiplied or divided by the same non-zero number, so always give it in lowest terms.

From $a : b$ (with $a, b > 0$):
- **duplicate** ratio $a^2 : b^2$; **triplicate** ratio $a^3 : b^3$;
- **sub-duplicate** ratio $\sqrt{a} : \sqrt{b}$; **sub-triplicate** ratio $\sqrt[3]{a} : \sqrt[3]{b}$;
- **reciprocal** (inverse) ratio $b : a$;
- **compound** ratio of $a : b$ and $c : d$: $ac : bd$.

*Example:* the compound ratio of the duplicate ratio of $3 : 4$ and the sub-duplicate ratio of $16 : 25$ is $(9 \times 4) : (16 \times 5) = 9 : 20$.`, key_terms: [{ term: 'Duplicate ratio', definition_md: 'The ratio of the squares of the terms: $a^2 : b^2$.' }, { term: 'Sub-duplicate ratio', definition_md: 'The ratio of the square roots of the terms: $\\sqrt{a} : \\sqrt{b}$.' }, { term: 'Compound ratio', definition_md: 'The product of two or more ratios, term by term: $ac : bd$.' }], formulas: [{ latex: '(a : b) \\text{ compounded with } (c : d) = ac : bd', label: 'Compound ratio' }], visual: kindsTable, visuals: [we1Table, figSquares], topic_ids: [topic(1)] },
    { heading: '2. Proportion and the fourth proportional', body_md: r`Four numbers $a, b, c, d$ are **in proportion**, written $a : b = c : d$ or $a : b :: c : d$, when $\dfrac{a}{b} = \dfrac{c}{d}$.

- $a$ and $d$ are the **extremes**; $b$ and $c$ are the **means**.
- **Test:** product of extremes $=$ product of means, $ad = bc$.
- $d$ is the **fourth proportional** to $a, b, c$: $d = \dfrac{bc}{a}$.

*Example:* $1.2, 2, 4.8, 8$ are in proportion since $1.2 \times 8 = 9.6 = 2 \times 4.8$; the fourth proportional to $5, 7, 15$ is $\dfrac{7 \times 15}{5} = 21$.`, key_terms: [{ term: 'Extremes', definition_md: 'The first and fourth terms of a proportion.' }, { term: 'Means', definition_md: 'The second and third terms of a proportion.' }, { term: 'Fourth proportional', definition_md: 'The number $x$ with $a : b = c : x$, that is $x = \\dfrac{bc}{a}$.' }], formulas: [{ latex: 'a : b = c : d \\iff ad = bc', label: 'Test for proportion' }], visual: propTable, visuals: [propPlot, we2Table], topic_ids: [topic(1)] },
    { heading: '3. Continued proportion, mean and third proportionals', body_md: r`$a, b, c$ are in **continued proportion** when $a : b = b : c$, so $b^2 = ac$.

- $b = \sqrt{ac}$ is the **mean proportional** between $a$ and $c$.
- $c = \dfrac{b^2}{a}$ is the **third proportional** to $a$ and $b$.
- $a, b, c, d$ are in continued proportion when $a : b = b : c = c : d$; then $a : d = a^3 : b^3$ (the triplicate ratio of $a : b$).

*Example:* the mean proportional between $0.32$ and $0.5$ is $\sqrt{0.16} = 0.4$; the third proportional to $5$ and $7.5$ is $\dfrac{56.25}{5} = 11.25$.`, key_terms: [{ term: 'Continued proportion', definition_md: 'Three numbers with $a : b = b : c$, i.e. $b^2 = ac$.' }, { term: 'Mean proportional', definition_md: 'The middle term $\\sqrt{ac}$ of $a : b = b : c$.' }, { term: 'Third proportional', definition_md: 'The number $c = \\dfrac{b^2}{a}$ with $a : b = b : c$.' }], formulas: [{ latex: 'b = \\sqrt{ac}', label: 'Mean proportional' }, { latex: 'c = \\dfrac{b^2}{a}', label: 'Third proportional' }], visual: contFlow, visuals: [figRectSq, we3Table, fourPlot], topic_ids: [topic(1)] },
    { heading: '4. Invertendo and alternendo', body_md: r`If $a : b = c : d$, then

- **invertendo:** $b : a = d : c$ (invert both ratios);
- **alternendo:** $a : c = b : d$ (interchange the means).

Each new proportion still has equal cross-products, so it is a true proportion.`, key_terms: [{ term: 'Invertendo', definition_md: '$a : b = c : d \\Rightarrow b : a = d : c$.' }, { term: 'Alternendo', definition_md: '$a : b = c : d \\Rightarrow a : c = b : d$.' }], formulas: [], visual: invAltTable, visuals: [], topic_ids: [topic(2)] },
    { heading: '5. Componendo, dividendo, and componendo and dividendo', body_md: r`If $a : b = c : d$, then

- **componendo:** $\dfrac{a + b}{b} = \dfrac{c + d}{d}$ (add $1$ to both sides);
- **dividendo:** $\dfrac{a - b}{b} = \dfrac{c - d}{d}$ (subtract $1$ from both sides);
- **componendo and dividendo:** $\dfrac{a + b}{a - b} = \dfrac{c + d}{c - d}$ (divide the two results).

The steps are reversible: if $\dfrac{a + b}{a - b} = \dfrac{c + d}{c - d}$, then $a : b = c : d$.`, key_terms: [{ term: 'Componendo', definition_md: '$\\dfrac{a}{b} = \\dfrac{c}{d} \\Rightarrow \\dfrac{a + b}{b} = \\dfrac{c + d}{d}$.' }, { term: 'Dividendo', definition_md: '$\\dfrac{a}{b} = \\dfrac{c}{d} \\Rightarrow \\dfrac{a - b}{b} = \\dfrac{c - d}{d}$.' }, { term: 'Componendo and dividendo', definition_md: '$\\dfrac{a}{b} = \\dfrac{c}{d} \\Rightarrow \\dfrac{a + b}{a - b} = \\dfrac{c + d}{c - d}$, and conversely.' }], formulas: [{ latex: '\\dfrac{a}{b} = \\dfrac{c}{d} \\iff \\dfrac{a + b}{a - b} = \\dfrac{c + d}{c - d}', label: 'Componendo and dividendo' }], visual: compTable, visuals: [whyFlow], topic_ids: [topic(2)] },
    { heading: '6. Using the properties: equations, ratios and proofs', body_md: r`- **Equations:** when one side is (sum) $\div$ (difference), apply componendo and dividendo to both sides. *Example:* $\dfrac{2x + 9}{2x - 9} = \dfrac{5}{3}$ gives $\dfrac{4x}{18} = 4$, so $x = 18$.
- **Square roots:** $\dfrac{\sqrt{x + 4} + \sqrt{x - 4}}{\sqrt{x + 4} - \sqrt{x - 4}} = 2$ gives $\dfrac{\sqrt{x + 4}}{\sqrt{x - 4}} = 3$; square and solve: $x = 5$.
- **Finding a ratio:** $\dfrac{5x + 3y}{5x - 3y} = \dfrac{7}{3}$ gives $\dfrac{10x}{6y} = \dfrac{10}{4}$, so $x : y = 3 : 2$.
- **Proofs (k-method):** put $\dfrac{a}{b} = \dfrac{c}{d} = k$, so $a = bk$, $c = dk$ (or $b = ak$, $c = ak^2$ for continued proportion), and simplify each side separately.`, key_terms: [{ term: 'k-method', definition_md: 'Writing every term through a common ratio $k$ (e.g. $a = bk$, $c = dk$) to prove a relation.' }], formulas: [], visual: w1Plot, visuals: [w2Table, w4Table, w3Table], topic_ids: [topic(2)] },
    { heading: '7. Direct applications of proportion', body_md: r`Write the proportion, use product of extremes $=$ product of means, solve, and check in the original ratios.

- **Scales and recipes:** $3$ cm for $20$ km means $7.5$ cm stands for $\dfrac{20 \times 7.5}{3} = 50$ km.
- **Changing ratios:** numbers $2k$ and $5k$ with $3$ subtracted from each in the ratio $1 : 4$ give $k = 3$.
- **Making numbers proportional:** adding $3$ to each of $3, 6, 7, 12$ gives $6, 9, 10, 15$.
- **Areas and volumes:** areas of similar figures are in the duplicate ratio, and volumes of cubes in the triplicate ratio, of their lengths.

*Not in the ICSE 2027 syllabus:* applications of proportion beyond direct simple applications; this chapter keeps to direct ones.`, key_terms: [{ term: 'Direct application', definition_md: 'A problem solved by writing one proportion and using product of extremes = product of means.' }], formulas: [], visual: appFlow, visuals: [w5Table, w6Table], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Proportionals and kinds of ratio (1–2 marks):* proportion or rule written 1; answer in lowest terms 1.
- *Componendo and dividendo equation (3–4 marks):* property applied to both sides 1; simplified 1; answer 1; check 1.
- *Proof (3–4 marks):* substitution $a = bk$, $c = dk$ 1; each side simplified 1–2; conclusion 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Doubling the terms instead of squaring them for a duplicate ratio.
2. Using the average instead of the mean proportional $\sqrt{ac}$.
3. Writing the third proportional in the wrong order ($b^2 \div a$, not $a^2 \div b$).
4. Calling alternendo invertendo, or applying componendo and dividendo to one side only.
5. Forgetting the negative square root when a ratio of squares appears.
6. Leaving coefficients in when finding $x : y$, or leaving a ratio unsimplified.`,
  status: 'draft', provenance: d1.provenance,
};
must(fr(20).mul(fr(7.5)).div(3).eq(50) && kChange(2, 5, -3, 1, 4) === 3 && isProp(6, 9, 10, 15) && meanProp(0.32, 0.5).eq(fr('0.4')), 'notes values');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch06', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is the **duplicate ratio** of $a : b$?', '$a^2 : b^2$', 'definition', 1),
    fc('f02', 'What is the **triplicate ratio** of $a : b$?', '$a^3 : b^3$', 'definition', 1),
    fc('f03', 'What is the **sub-duplicate ratio** of $a : b$?', '$\\sqrt{a} : \\sqrt{b}$', 'definition', 1),
    fc('f04', 'What is the **sub-triplicate ratio** of $a : b$?', '$\\sqrt[3]{a} : \\sqrt[3]{b}$', 'definition', 1),
    fc('f05', 'What is the **reciprocal ratio** of $a : b$?', '$b : a$', 'definition', 1),
    fc('f06', 'Compound ratio of $a : b$ and $c : d$?', '$ac : bd$', 'formula', 1),
    fc('f07', 'Sub-duplicate ratio of $36 : 121$?', '$6 : 11$', 'example', 1),
    fc('f08', 'When are $a, b, c, d$ **in proportion**?', 'When $a : b = c : d$, i.e. $ad = bc$.', 'definition', 1),
    fc('f09', 'In $a : b = c : d$, name the extremes and the means.', 'Extremes $a$ and $d$; means $b$ and $c$.', 'fact', 1),
    fc('f10', 'Fourth proportional to $a, b, c$?', '$\\dfrac{bc}{a}$', 'formula', 1),
    fc('f11', 'When are $a, b, c$ in **continued proportion**?', 'When $a : b = b : c$, i.e. $b^2 = ac$.', 'definition', 1),
    fc('f12', 'Mean proportional between $a$ and $c$?', '$\\sqrt{ac}$', 'formula', 1),
    fc('f13', 'Third proportional to $a$ and $b$?', '$\\dfrac{b^2}{a}$', 'formula', 1),
    fc('f14', 'Mean proportional between $8$ and $18$?', '$\\sqrt{144} = 12$', 'example', 1),
    fc('f15', 'Areas of squares with sides $2 : 3$ are in the ratio?', '$4 : 9$, the duplicate ratio.', 'diagram', 1),
    fc('f16', 'If $a, b, c, d$ are in continued proportion, $a : d$ equals?', '$a^3 : b^3$, the triplicate ratio of $a : b$.', 'concept', 1),
    fc('f17', '**Invertendo** turns $a : b = c : d$ into?', '$b : a = d : c$', 'formula', 2),
    fc('f18', '**Alternendo** turns $a : b = c : d$ into?', '$a : c = b : d$ (swap the means).', 'formula', 2),
    fc('f19', '**Componendo** turns $a : b = c : d$ into?', '$(a + b) : b = (c + d) : d$', 'formula', 2),
    fc('f20', '**Dividendo** turns $a : b = c : d$ into?', '$(a - b) : b = (c - d) : d$', 'formula', 2),
    fc('f21', '**Componendo and dividendo** turns $a : b = c : d$ into?', '$(a + b) : (a - b) = (c + d) : (c - d)$', 'formula', 2),
    fc('f22', 'Why does componendo and dividendo work?', 'Add $1$ to both sides, subtract $1$ from both sides, and divide the two results.', 'concept', 2),
    fc('f23', 'When should you think of componendo and dividendo?', 'When an expression is a sum over a difference of the same two terms.', 'exam-tip', 2),
    fc('f24', 'Solve $\\dfrac{x + 4}{x - 4} = \\dfrac{7}{3}$.', '$\\dfrac{2x}{8} = \\dfrac{10}{4}$, so $x = 10$.', 'example', 2),
    fc('f25', 'What is the **k-method**?', 'Put $\\dfrac{a}{b} = \\dfrac{c}{d} = k$, so $a = bk$, $c = dk$, and simplify each side.', 'concept', 2),
    fc('f26', 'If $a : b = 7 : 3$, then $(a + b) : (a - b)$?', '$10 : 4 = 5 : 2$', 'example', 2),
    fc('f27', 'Ratios of squares appear after C&D. What must you remember?', 'Take both square roots, positive and negative, unless the question rules one out.', 'exam-tip', 2),
    fc('f28', 'First step for a direct application?', 'Name the unknown and write the proportion.', 'exam-tip', 3),
    fc('f29', 'What number added to each of $1, 4, 3, 8$ makes them proportional?', '$2$: $3 : 6 = 5 : 10$.', 'example', 3),
    fc('f30', 'Map: $3$ cm for $20$ km. $7.5$ cm stands for?', '$50$ km', 'example', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};
must(rt(subDuplicate(36, 121)) === '6 : 11' && meanProp(8, 18).eq(12) && solveCD(1, 4, 7, 3).eq(10) && rt(ratio(10, 4)) === '5 : 2' && addToProp(1, 4, 3, 8).eq(2) && isProp(3, 6, 5, 10) && fourthProp(3, 20, 7.5).eq(50) && rt(duplicate(2, 3)) === '4 : 9' && identity('a/d', 'a^3/b^3', contEnvs()) === 6, 'flashcard values');

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch06', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only (kinds of ratio as groundwork; proportion, fourth, third and mean proportionals, continued proportion; invertendo, alternendo, componendo, dividendo, componendo and dividendo, the k-method; direct simple applications). The removed topic (applications beyond direct simple ones) appears only in one note (notes §7).', exact_arithmetic: 'every ratio, proportional and solution is computed in src/prop.mjs with BigInt rationals (no floating point in any key); sub-duplicate/sub-triplicate ratios and mean proportionals must be exact roots; equations are re-checked by substituting the answer back exactly; identities are checked at six fixed points satisfying the hypothesis (a = bk, c = dk, or b = ak, c = ak^2, d = ak^3) and, where the result depends on the hypothesis, shown to fail at points that do not satisfy it', figures: 'the two geometry figures are drawn from lengths in cm at a stated scale (squares 2 cm and 3 cm; rectangle 12 cm by 3 cm and square 6 cm); plots mark only points on their curves' } },
};
const tests = chapterTests('Ratio and Proportion', {
  A: ['m03', 'm06', 'm17', 'ar4', 's301', 's305'],
  B: ['l01', 'l03'],
}, {
  A: ['m05', 'm10', 'm13', 'm15', 'm19', 'm20', 'ar3', 'ar5', 's401', 's403', 's405'],
  B: ['l02', 'l04', 'l06'],
});
build({ dir: DIR, release, testsSpec: tests });

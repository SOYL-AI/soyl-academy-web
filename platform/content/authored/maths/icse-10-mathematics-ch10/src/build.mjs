// Build ICSE 10 Mathematics ch10 Geometric Progression. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch10/src/build.mjs
// Every term, sum, ratio and unknown on the slides, in the notes, tables and flashcards is computed by gp.mjs with
// exact BigInt rationals (terms by formula and by listing, sums by both closed forms and by adding the listed
// terms), every typed working line is parsed and checked exactly (steps().must), and every plotted point is a
// computed term lying on its curve (checked numerically by lib.mjs) or a computed bar.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { Q as Rat, q, gp, ratioOf, fromTwoTerms, termLine, sumLine, seqTex, addTex, steps, gctx, uctx, nctx, ARITH } from './gp.mjs';

setUnit('icse-10-mathematics-ch10');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const S = (ctx, lines, msg) => steps(ctx, lines).must(msg);
const d = (s) => `$${s}$`;
const N = (x) => Rat.of(x).num();
const pts = (g, ns) => ns.map((n) => [n, N(g.term(n))]);

// ---------------------------------------------------------------- deck 1 figures and worked examples (asserted)
const gT = gp(3, 2);
const apT = (n) => 3 * n;
const pTitle = plot({ x: [0, 6], y: [0, 52], xl: 'term number', yl: 'term', fns: [{ expr: '3*2^(x-1)', label: 'multiply by 2', domain: [1, 5.5] }, { expr: '3x', label: 'add 3', domain: [1, 5.5] }], pts: [...pts(gT, [1, 2, 3, 4]), [5, N(gT.term(5)), '(5, 48)'], [3, apT(3)], [4, apT(4)], [5, apT(5), '(5, 15)']] }, 'Two sequences that start 3, 6. Adding 3 each time gives 3, 6, 9, 12, 15 on a straight line; multiplying by 2 each time gives 3, 6, 12, 24, 48, which climbs faster and faster.', 'Multiplying by the same number each time (a geometric progression) soon leaves adding behind.');
must(gT.list(5).map(String).join() === '3,6,12,24,48', 'title GP');

const lists1 = [[5, 10, 20, 40], [1, -3, 9, -27], [16, 8, 4, 2], [2, 4, 8, 14]];
const tWhat = table(['List', 'Each term ÷ the one before', 'Geometric progression?'], lists1.map((l) => { const rs = l.slice(1).map((x, i) => q(x).div(l[i])); const rr = ratioOf(l); return [d(seqTex(l, { dots: false })), d(rs.map((x) => x.dtex()).join(',\\ ')), rr ? `yes, $r = ${rr.tex()}$` : 'no: the ratios differ']; }), 'Table testing four lists: 5, 10, 20, 40 has ratios 2, 2, 2; 1, minus 3, 9, minus 27 has ratios minus 3 each time; 16, 8, 4, 2 has ratios one half; 2, 4, 8, 14 has ratios 2, 2 and 1.75, so it is not a geometric progression.', 'A geometric progression has the same ratio between every pair of neighbouring terms.');
must(lists1.map((l) => (ratioOf(l) ? ratioOf(l).toString() : 'no')).join() === '2,-3,1/2,no', 'what table');

const gS = gp(64, q(-1, 2));
const bSigns = plot({ x: [0, 7], y: [-40, 70], xl: 'term number', yl: 'term', series: [{ label: 'terms of 64, −32, 16, …', points: pts(gS, [1, 2, 3, 4, 5, 6]), kind: 'bar' }] }, 'Bar chart of the first six terms of the geometric progression 64, minus 32, 16, minus 8, 4, minus 2: the bars alternate above and below the axis and shrink by half each time.', 'Common ratio $-\\dfrac{1}{2}$: the sign flips and the size halves at every step.');
must(gS.list(6).map(String).join() === '64,-32,16,-8,4,-2', 'signs bars');

const g1 = gp(2, -3);
const w1 = S(ARITH, [r`\dfrac{-6}{2} = \dfrac{18}{-6} = \dfrac{-54}{18} = -3`], 'example 1 ratios');
const w1b = S(gctx(g1), [r`T_{5} = -54 \times (-3) = 162`, r`T_{6} = 162 \times (-3) = -486`], 'example 1 next terms');
const tEx1 = table(['Pair', 'Ratio'], [['$-6$ and $2$', r`$\dfrac{-6}{2} = -3$`], ['$18$ and $-6$', r`$\dfrac{18}{-6} = -3$`], ['$-54$ and $18$', r`$\dfrac{-54}{18} = -3$`]], 'Table of the ratios of neighbouring terms of 2, minus 6, 18, minus 54: each ratio is minus 3.', 'Every ratio is $-3$: a geometric progression.');
S(ARITH, [r`\dfrac{-6}{2} = -3`, r`\dfrac{18}{-6} = -3`, r`\dfrac{-54}{18} = -3`], 'example 1 table');

const gG = gp(5, 2);
const tGen = table(['$n$', '$T_n$', 'Written as $ar^{n-1}$'], [1, 2, 3, 4, 5].map((n) => [d(String(n)), d(gG.term(n).tex()), d(n === 1 ? r`5 \times 2^{0}` : `5 \\times 2^{${n - 1}}`)]), 'Table for the geometric progression 5, 10, 20, 40, 80: the first term is 5 times 2 to the power 0, the second 5 times 2 to the power 1, and the fifth 5 times 2 to the power 4.', 'The power of $r$ is always one less than the term number.');
S(gctx(gG), [1, 2, 3, 4, 5].map((n) => `T_{${n}} = 5 \\times 2^{${n - 1}} = ${gG.term(n).tex()}`), 'general term table');

const g2 = gp(81, q(-1, 3));
const w2 = S(gctx(g2), [r`r = \dfrac{-27}{81} = -\dfrac{1}{3}`, termLine(g2, 8)], 'example 2');
must(g2.term(8).eq(q(-1, 27)), 'example 2 value');
const tEx2 = table(['$n$', ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => d(String(n)))], [['$T_n$', ...g2.list(8).map((x) => d(x.tex()))]], 'Table listing the first eight terms of 81, minus 27, 9 and so on: 81, minus 27, 9, minus 3, 1, minus one third, one ninth, minus one twenty-seventh.', 'Listing the terms confirms $T_8 = -\\dfrac{1}{27}$.');

const g3 = gp(6, 3);
const w3 = S(uctx('n', [7]), [r`6 \times 3^{n - 1} = 4374`, r`3^{n - 1} = 729 = 3^{6}`, r`n - 1 = 6`, r`n = 7`], 'example 3');
must(g3.whichTerm(4374) === 7, 'example 3 check');
const pEx3 = plot({ x: [0, 8], y: [0, 4800], xl: 'term number', yl: 'term', fns: [{ expr: '6*3^(x-1)', domain: [1, 7.3] }], pts: [...pts(g3, [1, 2, 3, 4, 5, 6]), [7, N(g3.term(7)), '(7, 4374)']] }, 'Points of the geometric progression 6, 18, 54, 162, 486, 1458, 4374 on the curve y equals 6 times 3 to the power n minus 1; the seventh point is at height 4374.', '$4374$ is the $7$th term.');

const s4 = fromTwoTerms(3, 36, 6, 972), g4 = s4[0];
const w4 = S(gctx(g4), [r`\dfrac{T_{6}}{T_{3}} = \dfrac{ar^{5}}{ar^{2}} = r^{3}`, r`r^{3} = \dfrac{972}{36} = 27`, r`r = 3`, r`a = \dfrac{T_{3}}{r^{2}} = \dfrac{36}{9} = 4`, termLine(g4, 8)], 'example 4');
must(s4.length === 1 && g4.a.eq(4) && g4.term(8).eq(8748), 'example 4 values');
const pEx4 = plot({ x: [0, 7], y: [0, 1100], xl: 'term number', yl: 'term', fns: [{ expr: '4*3^(x-1)', domain: [1, 6.4] }], pts: [[1, 4], [2, 12], [3, 36, '(3, 36)'], [4, 108], [5, 324], [6, 972, '(6, 972)']] }, 'Points of the geometric progression 4, 12, 36, 108, 324, 972 on a rising curve; the given terms, 36 in place 3 and 972 in place 6, are labelled.', 'From place $3$ to place $6$ the term is multiplied by $r^{3} = 27$.');
must(g4.list(6).map(String).join() === '4,12,36,108,324,972', 'example 4 plot');

const s5 = fromTwoTerms(2, 6, 4, 54);
must(s5.length === 2 && s5.map((g) => `${g.a},${g.r}`).join(';') === '-2,-3;2,3', 'example 5 two GPs');
const ctx5 = { sols: s5.map((g) => ({ a: g.a, r: g.r })), fns: {} };
const w5 = S(ctx5, [r`r^{2} = \dfrac{54}{6} = 9`, r`r = 3 \text{ or } r = -3`, r`a = \dfrac{6}{3} = 2`, r`a = \dfrac{6}{-3} = -2`], 'example 5');
const sEx5 = plot({ x: [0, 5], y: [-25, 60], xl: 'term number', yl: 'term', series: [{ label: 'r = 3: 2, 6, 18, 54', points: pts(s5[1], [1, 2, 3, 4]), kind: 'scatter' }, { label: 'r = −3: −2, 6, −18, 54', points: pts(s5[0], [1, 2, 3, 4]), kind: 'scatter' }] }, 'Two sets of points: 2, 6, 18, 54 for ratio 3 and minus 2, 6, minus 18, 54 for ratio minus 3; both pass through 6 in place 2 and 54 in place 4.', 'Both progressions have $T_2 = 6$ and $T_4 = 54$.');

const w6 = S(uctx('x', [5]), [r`(x + 1)^{2} = (x - 2)(x + 7)`, r`x^{2} + 2x + 1 = x^{2} + 5x - 14`, r`3x = 15`, r`x = 5`], 'example 6');
must(ratioOf([5 - 2, 5 + 1, 5 + 7]).eq(2), 'example 6 GP');
const tEx6 = table(['Expression', 'Value at $x = 5$'], [['$x - 2$', '$3$'], ['$x + 1$', '$6$'], ['$x + 7$', '$12$']], 'Table of the three expressions at x equals 5: x minus 2 is 3, x plus 1 is 6 and x plus 7 is 12, a geometric progression with ratio 2.', 'At $x = 5$: $3, 6, 12$, ratio $2$.');
const tMid = table(['Fact', 'Use it to'], [['$a$, $b$, $c$ consecutive terms: $b^{2} = ac$', 'find a missing middle term'], [r`three terms written as $\dfrac{a}{r}$, $a$, $ar$`, 'use a given product: $a^{3}$ = product'], ['$b = \\sqrt{ac}$ when all terms are positive', 'choose the positive value']], 'Table of facts about three consecutive terms: the middle term squared equals the product of the outer terms; writing the terms as a over r, a and a r makes their product a cubed; for positive terms the middle term is the square root of the product.', 'Three consecutive terms of a geometric progression.');
S(gctx(gp(2, 3)), [r`T_{2}^{2} = T_{1} \times T_{3}`].map((l) => l.replace('T_{2}^{2}', '(T_{2})^{2}')), 'middle term rule');

const gE = gp(5, 3), NE = gE.whichTerm(10935);
must(NE === 8 && gE.fromEnd(8, 3).eq(1215), 'from the end');
const wE = S(gctx(gE), [r`10935 \times \left(\dfrac{1}{3}\right)^{2} = 1215`, r`T_{6} = 5 \times 3^{5} = 1215`], 'from the end');
const tEnd = table(['Place from the start', ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => d(String(n)))], [['Term', ...gE.list(8).map((x) => d(x.tex()))], ['Place from the end', ...[8, 7, 6, 5, 4, 3, 2, 1].map((n) => d(String(n)))]], 'Table of the eight terms of 5, 15, 45 up to 10935, numbered from the start and from the end: the third term from the end is 1215, which is the sixth term from the start.', 'The $k$th term from the end of $n$ terms is the $(n - k + 1)$th from the start.');
const fTwo = flow('LR', [['a', 'Write both terms as $ar^{p-1}$ and $ar^{q-1}$'], ['b', 'Divide: the $a$ cancels, leaving a power of $r$'], ['c', 'Take the root: an even power gives $\\pm$'], ['d', 'Find $a$ from either term'], ['e', 'Check by listing the terms']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for two given terms: write both as a times a power of r; divide so that a cancels; take the root, remembering plus or minus for an even power; find a; check by listing the terms.', 'Two terms give $a$ and $r$.');
const sum1 = table(['Idea', 'Key fact'], [['Common ratio', r`$r = \dfrac{T_{n+1}}{T_n}$, the same for every pair`], ['General term', '$T_n = ar^{n-1}$'], ['Which term?', 'solve $ar^{n-1}$ = given value by comparing powers'], ['Two terms given', 'divide them to find a power of $r$'], ['Middle term', '$b^{2} = ac$'], ['From the end', 'divide by $r$ at each step back from the last term']], 'Summary table for part 1: the common ratio is the same for every pair; the general term is a r to the power n minus 1; find which term by comparing powers; divide two given terms to get a power of r; the middle term squared is the product of its neighbours; count back from the last term by dividing by r.', 'Part 1 on one card.');

// ---------------------------------------------------------------- deck 2 figures and worked examples (asserted)
const gD = gp(1, 2);
const partial = (g, n) => [...Array(n).keys()].map((i) => [i + 1, N(g.sum(i + 1))]);
const bTitle2 = plot({ x: [0, 7], y: [0, 70], xl: 'number of terms', yl: 'value', series: [{ label: 'term', points: pts(gD, [1, 2, 3, 4, 5, 6]), kind: 'bar' }, { label: 'running total', points: partial(gD, 6), kind: 'line' }] }, 'Bars for the terms 1, 2, 4, 8, 16, 32 and a line for the running totals 1, 3, 7, 15, 31, 63: each total is one less than the next term.', 'For $1, 2, 4, \\ldots$ the sum of $n$ terms is $2^{n} - 1$.');
must(partial(gD, 6).map((p) => p[1]).join() === '1,3,7,15,31,63', 'title 2 totals');
const tDeriv = table(['Step', 'Working'], [['Write the sum', r`$S_n = a + ar + ar^{2} + \cdots + ar^{n-1}$`], ['Multiply by $r$', r`$rS_n = ar + ar^{2} + \cdots + ar^{n-1} + ar^{n}$`], ['Subtract', r`$rS_n - S_n = ar^{n} - a$`], ['Divide by $r - 1$', r`$S_n = \dfrac{a\left(r^{n} - 1\right)}{r - 1}$`]], 'Table deriving the sum: write S n as a plus a r up to a r to the n minus 1; multiply by r to shift every term one place; subtract, and all the middle terms cancel, leaving a r to the n minus a; divide by r minus 1.', 'Multiply by $r$ and subtract: everything in the middle cancels.');
for (const g of [gp(3, 2), gp(5, q(-1, 2)), gp(q(2, 3), 4)]) S(nctx(g), [r`rS_{n} - S_{n} = ar^{n} - a`, r`S_{n} = \dfrac{a\left(r^{n} - 1\right)}{r - 1}`, r`S_{n} = \dfrac{a\left(1 - r^{n}\right)}{1 - r}`], 'derivation');
const tForms = table(['Common ratio', 'Formula for $S_n$', 'Why'], [['$r > 1$', r`$\dfrac{a\left(r^{n} - 1\right)}{r - 1}$`, 'top and bottom stay positive'], ['$r < 1$ (including negative $r$)', r`$\dfrac{a\left(1 - r^{n}\right)}{1 - r}$`, 'top and bottom stay positive'], ['$r = 1$', '$S_n = na$', 'the formulas would divide by $0$']], 'Table of which sum formula to use: for r greater than 1 use a times r to the n minus 1, over r minus 1; for r less than 1, including negative r, use a times 1 minus r to the n, over 1 minus r; for r equal to 1 the sum is n times a.', 'Both formulas give the same value; choose the one that avoids negative signs.');

const g21 = gp(4, 3);
const w21 = S(gctx(g21), [sumLine(g21, 6), `${addTex(g21.list(6))} = 1456`], 'deck 2 example 1');
const run = (g, n) => g.list(n).map((x, i) => [d(String(i + 1)), d(x.tex()), d(g.sum(i + 1).tex())]);
const tEx21 = table(['$n$', '$T_n$', 'Running total $S_n$'], run(g21, 6), 'Table of the first six terms of 4, 12, 36 and so on with running totals 4, 16, 52, 160, 484 and 1456.', 'The formula and the running total agree: $S_6 = 1456$.');
must(g21.sum(6).eq(1456), 'deck 2 example 1 value');

const g22 = gp(96, q(1, 2));
const w22 = S(gctx(g22), [sumLine(g22, 6), `${addTex(g22.list(6))} = 189`], 'deck 2 example 2');
const bEx22 = plot({ x: [0, 7], y: [0, 200], xl: 'number of terms', yl: 'value', series: [{ label: 'term', points: pts(g22, [1, 2, 3, 4, 5, 6]), kind: 'bar' }, { label: 'running total', points: partial(g22, 6), kind: 'line' }] }, 'Bars for the terms 96, 48, 24, 12, 6, 3, each half the one before, and a line for the running totals 96, 144, 168, 180, 186, 189, which level off.', 'With $r = \\dfrac{1}{2}$ each term adds less: $S_6 = 189$.');

const g23 = gp(2, -2);
const w23 = S(gctx(g23), [sumLine(g23, 7), `${addTex(g23.list(7))} = 86`], 'deck 2 example 3');
const tEx23 = table(['$n$', '$T_n$', 'Running total $S_n$'], run(g23, 7), 'Table of the first seven terms of 2, minus 4, 8 and so on with running totals 2, minus 2, 6, minus 10, 22, minus 42 and 86.', 'With a negative ratio the running total swings up and down: $S_7 = 86$.');

const g24 = gp(7, 3);
const w24 = S({ sols: [{ n: q(6) }], fns: { S: (k) => g24.sum(k) } }, [r`S_{n} = \dfrac{7\left(3^{n} - 1\right)}{3 - 1} = 2548`, r`3^{n} - 1 = 728`, r`3^{n} = 729 = 3^{6}`, r`n = 6`], 'deck 2 example 4');
must(g24.termsForSum(2548) === 6, 'deck 2 example 4 check');
const tEx24 = table(['$n$', '$T_n$', 'Running total $S_n$'], run(g24, 6), 'Table of the terms 7, 21, 63, 189, 567, 1701 with running totals 7, 28, 91, 280, 847 and 2548: the total reaches 2548 after six terms.', 'The running total hits $2548$ exactly at $n = 6$.');

const fWord = flow('LR', [['a', 'Spot the multiplier: “doubles”, “grows by 5%”, “falls by 10%”'], ['b', 'Write $a$ (the starting value) and $r$ (e.g. $1.05$ or $0.9$)'], ['c', 'A value after $k$ steps: $ar^{k}$, the $(k + 1)$th term'], ['d', 'A total over $n$ steps: $S_n$'], ['e', 'Answer in the units asked']], [['a', 'b'], ['b', 'c'], ['b', 'd'], ['c', 'e'], ['d', 'e']], 'Flow chart for word problems: spot the multiplier; write the starting value a and the ratio r, such as 1.05 or 0.9; a value after k steps is a r to the k, the term in place k plus 1; a total over n steps is S n; answer in the units asked.', 'Turning a word problem into a geometric progression.');
const gUp = gp(100, '1.1'), gDown = gp(100, '0.9');
const pGrowth = plot({ x: [0, 6], y: [0, 180], xl: 'years', yl: 'value (start = 100)', fns: [{ expr: '100*1.1^x', label: 'grows 10% a year', domain: [0, 5.5] }, { expr: '100*0.9^x', label: 'falls 10% a year', domain: [0, 5.5] }], pts: [...[0, 1, 2, 3, 4, 5].map((k) => [k, N(gUp.term(k + 1))]), ...[1, 2, 3, 4, 5].map((k) => [k, N(gDown.term(k + 1))])] }, 'Two curves starting at 100: growing by 10 percent a year gives 110, 121, 133.1 and so on, rising faster each year; falling by 10 percent a year gives 90, 81, 72.9 and so on, falling more slowly each year.', 'Growth: $r = 1.1$; depreciation: $r = 0.9$.');
must(gUp.term(4).eq(Rat.of('133.1')) && gDown.term(4).eq(Rat.of('72.9')), 'growth plot');

const g25 = gp(25000, '1.04');
const w25 = S(uctx('r', ['1.04']), [r`r = 1 + \dfrac{4}{100} = 1.04`], 'deck 2 example 5 ratio');
const w25b = S(ARITH, [r`25000 \times 1.04 = 26000`, r`25000 \times 1.04^{2} = 27040`, r`27040 - 26000 = 1040`], 'deck 2 example 5');
must(g25.term(2).eq(26000) && g25.term(3).eq(27040), 'deck 2 example 5 values');
const bPop = plot({ x: [-1, 3], y: [0, 30000], xl: 'years from now', yl: 'population', series: [{ label: 'population', points: [0, 1, 2].map((k) => [k, N(g25.term(k + 1))]), kind: 'bar' }] }, 'Bar chart of the population of the imagined village: 25000 now, 26000 after one year and 27040 after two years.', 'Each bar is $1.04$ times the one before.');

const g26 = gp(160000, '0.9');
const w26 = S(uctx('r', ['0.9']), [r`r = 1 - \dfrac{10}{100} = 0.9`], 'deck 2 example 6 ratio');
const w26b = S(ARITH, [r`160000 \times 0.9^{3} = 160000 \times 0.729 = 116640`, r`160000 - 116640 = 43360`], 'deck 2 example 6');
must(g26.term(4).eq(116640), 'deck 2 example 6 value');
const bDep = plot({ x: [-1, 4], y: [0, 180000], xl: 'years', yl: 'value (₹)', series: [{ label: 'value', points: [0, 1, 2, 3].map((k) => [k, N(g26.term(k + 1))]), kind: 'bar' }] }, 'Bar chart of the value of the imagined machine: 160000 rupees new, then 144000, 129600 and 116640 rupees after one, two and three years.', 'Each year the value is multiplied by $0.9$.');
must(g26.list(4).map(String).join() === '160000,144000,129600,116640', 'depreciation bars');

const g27 = gp(3, 3);
const w27 = S(gctx(g27), [sumLine(g27, 5), `${addTex(g27.list(5))} = 363`], 'deck 2 example 7');
const tRelay = table(['Round', 'Parents phoned in this round', 'Total phoned so far'], run(g27, 5).map((row) => row), 'Table of the imagined phone relay: 3, 9, 27, 81 and 243 parents are phoned in rounds 1 to 5, with running totals 3, 12, 39, 120 and 363.', 'After five rounds $363$ parents have been phoned.');
const sum2 = table(['Task', 'Method'], [['Sum, $r > 1$', r`$S_n = \dfrac{a\left(r^{n} - 1\right)}{r - 1}$`], ['Sum, $r < 1$', r`$S_n = \dfrac{a\left(1 - r^{n}\right)}{1 - r}$`], ['Sum, $r = 1$', '$S_n = na$'], ['How many terms?', 'set $S_n$ equal to the total and compare powers'], ['A single term from sums', '$T_n = S_n - S_{n-1}$'], ['Growth / depreciation', '$r = 1 + \\dfrac{p}{100}$ or $1 - \\dfrac{p}{100}$; value after $k$ years $= ar^{k}$']], 'Summary table for part 2: the two sum formulas and the case r equals 1; find the number of terms by comparing powers; a term is the difference of two consecutive sums; growth and depreciation use r equal to 1 plus or minus p over 100.', 'Part 2 on one card.');
S(gctx(gp(3, 2)), [r`T_{5} = S_{5} - S_{4}`], 'summary 2 identity');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Geometric Progression — Part 1: Common ratio and the nth term',
  goals: ['Recognise a geometric progression and find its common ratio', 'Use the general term T_n = ar^{n−1} to find any term', 'Find which term has a given value, and find a and r from two given terms', 'Find a missing middle term and a term counted from the end'],
  slides: [
    sl('title', 'Geometric Progression, Part 1', { b: 'Multiply by the same number again and again, and the terms form a **geometric progression**.', v: pTitle, n: 'Welcome to geometric progressions. Both sequences on the graph start with three and six. The straight line adds three every time. The curve multiplies by two every time, and soon it races ahead: three, six, twelve, twenty four, forty eight. Lists made by multiplying are the subject of this chapter.' }),
    sl('concept', 'What you will be able to do', { ul: ['Recognise a **geometric progression** and find its **common ratio**', 'Use the **general term** $T_n = ar^{n-1}$', 'Find **which term** has a given value; find $a$ and $r$ from **two terms**', 'Find a **middle term** and a term **from the end**'], n: 'These are your goals for part one. First we learn to recognise a geometric progression and find its common ratio. Then we use the general term to reach any term, work backwards to find which term has a given value, and find the first term and ratio from two given terms.' }),
    sl('concept', 'What is a geometric progression?', { b: 'A list in which each term is the term before it **multiplied by the same non-zero number** $r$, the **common ratio**: $r = \\dfrac{T_{n+1}}{T_n}$. The first term is called $a$.', v: tWhat, n: 'In a geometric progression, every term is the one before it multiplied by the same number, called the common ratio. To test a list, divide each term by the term before it. If every answer is the same, the list is a geometric progression. In the last row the ratios change, so it is not.' }),
    sl('concept', 'The ratio can be a fraction or negative', { b: 'If $0 < r < 1$ the terms shrink; if $r$ is negative the signs alternate. No term can be $0$.', v: bSigns, n: 'The common ratio need not be a whole number. Here it is minus one half. Each term is half the size of the one before, and the sign flips every time, so the bars go up, down, up, down while they shrink. A ratio between zero and one makes terms shrink without changing sign.' }),
    sl('check', 'Quick check: spot the geometric progression', { b: 'Divide each term by the one before.', chk: 'm02', n: 'Check the ratio between every pair of neighbouring terms, not just the first pair.' }),
    sl('example', 'Worked example 1: testing a list', { b: 'Show that $2, -6, 18, -54$ is a geometric progression and write its next two terms.', ul: [`**Step 1 —** ratios: ${w1.md[0]}.`, '**Step 2 —** the ratio is constant, so it is a geometric progression with $r = -3$.', `**Step 3 —** ${w1b.md[0]} and ${w1b.md[1]}.`], v: tEx1, n: 'Divide each term by the one before. Minus six over two is minus three, eighteen over minus six is minus three, and minus fifty four over eighteen is minus three. The ratio is constant, so this is a geometric progression. Multiply by minus three twice more to get one hundred and sixty two and then minus four hundred and eighty six.' }),
    sl('concept', 'The general term', { b: 'The first term is $a$, the second $ar$, the third $ar^{2}$, … so the $n$th term is $T_n = ar^{n-1}$.', v: tGen, m: [r`T_n = ar^{n-1}`], n: 'Each step multiplies by r once more. The second term has one factor of r, the third has two, and so on. So the term in place n has n minus one factors of r: the general term is a times r to the power n minus one. Notice in the table that the power is always one less than the term number.' }),
    sl('example', 'Worked example 2: a term with a negative ratio', { b: `Find the $8$th term of the geometric progression $${seqTex(g2.list(3))}$.`, ul: [`**Step 1 —** $a = 81$ and ${w2.md[0]}.`, `**Step 2 —** ${w2.md[1]}.`, r`**Answer —** $T_8 = -\dfrac{1}{27}$; listing the terms (table) agrees.`], v: tEx2, n: 'The first term is eighty one, and the ratio is minus twenty seven divided by eighty one, which is minus one third. The eighth term is eighty one times minus one third to the power seven. An odd power of a negative number is negative, so the answer is minus one twenty seventh. The table lists all eight terms as a check.' }),
    sl('check', 'Quick check: the common ratio', { b: 'Divide the second term by the first.', chk: 'fb1', n: 'Watch the sign: what do you multiply seven by to get minus fourteen?' }),
    sl('example', 'Worked example 3: which term?', { b: `Which term of the geometric progression $${seqTex(g3.list(3))}$ is $4374$?`, ul: [`**Step 1 —** $a = 6$, $r = 3$, so ${w3.md[0]}.`, `**Step 2 —** ${w3.md[1]}.`, `**Step 3 —** ${w3.md[2]}, so ${w3.md[3]}.`, '**Answer —** $4374$ is the $7$th term.'], v: pEx3, n: 'Write the general term with a equal to six and r equal to three, and set it equal to four thousand three hundred and seventy four. Dividing by six leaves three to the power n minus one equal to seven hundred and twenty nine, which is three to the power six. So n minus one is six, and n is seven.' }),
    sl('concept', 'Finding a and r from two terms', { b: 'Write each given term as $ar^{\\text{power}}$ and divide: $a$ cancels, leaving a power of $r$.', v: fTwo, n: 'When two terms are given, write each one as a times a power of r. Dividing one by the other cancels a and leaves a single power of r. Take the root to find r. If the power is even, there are two possible ratios, one positive and one negative. Then find a from either term.' }),
    sl('example', 'Worked example 4: two terms given', { b: 'The $3$rd term of a geometric progression is $36$ and its $6$th term is $972$. Find $a$, $r$ and the $8$th term.', ul: [`**Step 1 —** ${w4.md[0]}.`, `**Step 2 —** ${w4.md[1]}, so ${w4.md[2]}.`, `**Step 3 —** ${w4.md[3]}.`, `**Step 4 —** ${w4.md[4]}.`], v: pEx4, n: 'The sixth term over the third term is r cubed. That is nine hundred and seventy two over thirty six, which is twenty seven, so r is three. The third term is a times r squared, so a is thirty six over nine, which is four. Then the eighth term is four times three to the power seven: eight thousand seven hundred and forty eight.' }),
    sl('example', 'Worked example 5: an even power gives two answers', { b: 'In a geometric progression, $T_2 = 6$ and $T_4 = 54$. Find the possible values of $a$ and $r$.', ul: [`**Step 1 —** ${w5.md[0]}.`, `**Step 2 —** ${w5.md[1]}.`, `**Step 3 —** if $r = 3$, ${w5.md[2]}; if $r = -3$, ${w5.md[3]}.`, '**Answer —** $2, 6, 18, 54, \\ldots$ or $-2, 6, -18, 54, \\ldots$'], v: sEx5, n: 'Dividing the fourth term by the second gives r squared equals nine. A square root has two values, so r is three or minus three. With r equal to three, a is two; with r equal to minus three, a is minus two. Both progressions have six in place two and fifty four in place four, as the graph shows.' }),
    sl('check', 'Quick check: which term?', { b: 'Divide by the first term, then compare powers of $4$.', chk: 'n02', n: 'Divide three thousand and seventy two by three. Which power of four do you get?' }),
    sl('concept', 'Three consecutive terms', { b: 'If $a$, $b$, $c$ are consecutive terms, $\\dfrac{b}{a} = \\dfrac{c}{b}$, so $b^{2} = ac$. Three unknown terms are best written $\\dfrac{a}{r}$, $a$, $ar$.', v: tMid, m: [r`b^{2} = ac`], n: 'For three consecutive terms, the ratios are equal: b over a equals c over b. Cross multiplying gives b squared equals a times c. Use it to find a missing middle term. When three unknown terms have a given product, write them as a over r, a, and a times r: the ratios cancel and the product is simply a cubed.' }),
    sl('example', 'Worked example 6: an unknown in the terms', { b: 'Find $x$ if $x - 2$, $x + 1$ and $x + 7$ are consecutive terms of a geometric progression.', ul: [`**Step 1 —** middle term squared: ${w6.md[0]}.`, `**Step 2 —** expand: ${w6.md[1]}.`, `**Step 3 —** ${w6.md[2]}, so ${w6.md[3]}.`, '**Check —** the terms are $3, 6, 12$, ratio $2$.'], v: tEx6, n: 'Square the middle term and set it equal to the product of the other two. When you expand, the x squared terms cancel, leaving three x equals fifteen. So x is five. Always check: the terms become three, six and twelve, and the ratio is two each time.' }),
    sl('concept', 'Terms counted from the end', { b: `For $${seqTex(gE.list(3))}, 10935$: ${wE.md[0]} is the $3$rd term from the end. Going backwards, the ratio is $\\dfrac{1}{r}$.`, v: tEnd, n: 'To count from the end, start at the last term and divide by the ratio at each step back. Here the last term is ten thousand nine hundred and thirty five. Dividing by three twice gives one thousand two hundred and fifteen, the third term from the end. The table shows it is also the sixth term from the start.' }),
    sl('check', 'Quick check: true or false?', { b: 'Use $T_n = ar^{n-1}$ with $r = \\dfrac{1}{2}$.', chk: 'tf3', n: 'Halve sixty four six times. Where do you end up?' }),
    sl('summary', 'Summary', { ul: ['Common ratio $r = \\dfrac{T_{n+1}}{T_n}$, the same for every pair', 'General term $T_n = ar^{n-1}$', 'Two given terms: divide to get a power of $r$ (even power: $\\pm$)', 'Consecutive terms $a, b, c$: $b^{2} = ac$', 'From the end: divide by $r$ at each step back'], v: sum1, n: 'To sum up part one. A geometric progression has a constant ratio between neighbouring terms. Its general term is a times r to the power n minus one. Divide two given terms to find a power of r, remembering two signs for an even power. The middle of three terms squared is the product of the others.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Term (2 marks):** $a$ and $r$ 1 + value 1', '**Which term (2–3 marks):** equation $ar^{n-1}$ = value 1 + powers compared 1 + $n$ 1', '**Mistake:** using $ar^{n}$ instead of $ar^{n-1}$', '**Mistake:** dividing the wrong way round: $r = \\dfrac{T_2}{T_1}$, not $\\dfrac{T_1}{T_2}$', '**Mistake:** losing the sign of an odd power of a negative ratio', '**Mistake:** forgetting the negative root when $r^{2}$ is given'], n: 'Write a and r clearly before you substitute, because the first mark is often for them. The power in the general term is n minus one, not n. Divide a term by the one before it, not the other way round. And when you take an even root, check whether a negative ratio also works.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Geometric Progression — Part 2: Sum of n terms and applications',
  goals: ['Derive and use the sum of the first n terms of a geometric progression', 'Choose the sum formula that suits r > 1, r < 1 and r = 1', 'Find how many terms give a total, and a term from two sums', 'Solve growth, depreciation and doubling problems with geometric progressions'],
  slides: [
    sl('title', 'Geometric Progression, Part 2', { b: 'Adding the terms of $1, 2, 4, 8, \\ldots$ gives $1, 3, 7, 15, \\ldots$: always one less than the next term.', v: bTitle2, n: 'Welcome to part two. The bars are the terms one, two, four, eight and so on. The line shows the running totals: one, three, seven, fifteen, thirty one, sixty three. Each total is one less than the next term. In this part you will find a formula for such sums and use it in real problems.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **sum of the first $n$ terms** of a geometric progression', 'Choose the formula for $r > 1$, $r < 1$ and $r = 1$', 'Find **how many terms** give a total', 'Solve **growth** and **depreciation** problems'], n: 'These are your goals for part two. We derive the sum formula and learn which form to use. Then we work backwards to find how many terms give a total, and apply geometric progressions to population growth, depreciation and doubling.' }),
    sl('concept', 'Deriving the sum', { b: 'Multiply the sum by $r$ and subtract: every term except the first and the last cancels.', v: tDeriv, m: [r`S_n = \dfrac{a\left(r^{n} - 1\right)}{r - 1}`], n: 'Write the sum of n terms. Multiply every term by r: the list shifts along by one place. Now subtract the first line from the second. All the middle terms cancel, leaving a times r to the power n, minus a. Dividing by r minus one gives the formula for the sum of the first n terms.' }),
    sl('concept', 'Which form to use', { b: 'The two forms are equal; pick the one with positive top and bottom. If $r = 1$ every term is $a$, so $S_n = na$.', v: tForms, n: 'Both forms of the formula give the same answer. When r is greater than one, use r to the n minus one, over r minus one. When r is less than one, including negative ratios, use one minus r to the n, over one minus r. When r equals one, the formulas would divide by zero, so simply multiply n by a.' }),
    sl('example', 'Worked example 1: a sum with r > 1', { b: `Find the sum of the first $6$ terms of $${seqTex(g21.list(3))}$.`, ul: ['**Step 1 —** $a = 4$, $r = 3 > 1$.', `**Step 2 —** ${w21.md[0]}.`, `**Check —** ${w21.md[1]}.`], v: tEx21, n: 'The first term is four and the ratio is three, which is more than one, so use the first form. Three to the power six is seven hundred and twenty nine; subtract one to get seven hundred and twenty eight. Multiply by four and divide by two: one thousand four hundred and fifty six. The running totals in the table agree.' }),
    sl('check', 'Quick check: a short sum', { b: 'Use $a = 1$, $r = 3$, $n = 5$.', chk: 'm10', n: 'Use the formula, or simply add the first five terms. Both should agree.' }),
    sl('example', 'Worked example 2: a sum with r < 1', { b: `Find the sum of the first $6$ terms of $${seqTex(g22.list(3))}$.`, ul: [r`**Step 1 —** $a = 96$, $r = \dfrac{1}{2} < 1$.`, `**Step 2 —** ${w22.md[0]}.`, `**Check —** ${w22.md[1]}.`], v: bEx22, n: 'Here the ratio is one half, less than one, so use the form with one minus r. One half to the power six is one sixty fourth, so the top is ninety six times sixty three sixty fourths. Dividing by one half doubles it, giving one hundred and eighty nine. The running total levels off, because each term adds less.' }),
    sl('example', 'Worked example 3: a negative ratio', { b: `Find the sum of the first $7$ terms of $${seqTex(g23.list(3))}$.`, ul: ['**Step 1 —** $a = 2$, $r = -2 < 1$.', `**Step 2 —** ${w23.md[0]}.`, `**Check —** ${w23.md[1]}.`], v: tEx23, n: 'The ratio is minus two, which is less than one. Minus two to the power seven is minus one hundred and twenty eight, so one minus it is one hundred and twenty nine. Multiply by two and divide by three: eighty six. With a negative ratio the running total swings up and down, as the table shows.' }),
    sl('check', 'Quick check: four terms', { b: 'Here $r = 5$.', chk: 'fb4', n: 'Find the ratio first, then use the form for a ratio greater than one.' }),
    sl('example', 'Worked example 4: how many terms?', { b: 'How many terms of $7 + 21 + 63 + \\cdots$ make $2548$?', ul: [`**Step 1 —** ${w24.md[0]}.`, `**Step 2 —** ${w24.md[1]}, so ${w24.md[2]}.`, `**Answer —** ${w24.md[3]}.`], v: tEx24, n: 'Write the sum of n terms with a equal to seven and r equal to three, and set it equal to two thousand five hundred and forty eight. Multiply by two and divide by seven: three to the power n minus one is seven hundred and twenty eight. So three to the power n is seven hundred and twenty nine, three to the six. Six terms are needed.' }),
    sl('concept', 'Word problems as geometric progressions', { b: 'A fixed **multiplier** each step means a geometric progression. A single value uses $T_n$; a total uses $S_n$; and $T_n = S_n - S_{n-1}$.', v: fWord, n: 'In word problems, look for a fixed multiplier: doubles, triples, grows by five percent, falls by ten percent. Write the starting value and the ratio. A value after k steps is a times r to the power k, which is the term in place k plus one. A total over several steps is a sum. And any term is the difference of two consecutive sums.' }),
    sl('concept', 'Growth and depreciation', { b: 'Growth by $p\\%$ a year: $r = 1 + \\dfrac{p}{100}$. Depreciation by $p\\%$ a year: $r = 1 - \\dfrac{p}{100}$. Value after $k$ years $= ar^{k}$.', v: pGrowth, n: 'When a quantity grows by ten percent a year, it is multiplied by one point one each year. When it falls by ten percent a year, it is multiplied by zero point nine. The values year by year form a geometric progression. Growth speeds up, because each increase is ten percent of a bigger amount; depreciation slows down.' }),
    sl('example', 'Worked example 5: population growth', { b: 'The population of an imagined village, Sonapur, is $25000$ and grows by $4\\%$ every year. Find the population after $2$ years and the increase in the second year.', ul: [`**Step 1 —** ${w25.md[0]}.`, `**Step 2 —** after one year ${w25b.md[0]}; after two years ${w25b.md[1]}.`, `**Step 3 —** increase in the second year: ${w25b.md[2]}.`], v: bPop, n: 'Growing by four percent multiplies the population by one point zero four each year. After one year it is twenty six thousand. After two years it is twenty five thousand times one point zero four squared, which is twenty seven thousand and forty. The increase in the second year is one thousand and forty, more than the first year.' }),
    sl('example', 'Worked example 6: depreciation', { b: 'An imagined workshop buys a machine for ₹1,60,000. Its value falls by $10\\%$ of its value each year. Find its value after $3$ years and the total fall in value.', ul: [`**Step 1 —** ${w26.md[0]}.`, `**Step 2 —** ${w26b.md[0]}, that is ₹1,16,640.`, `**Step 3 —** total fall: ${w26b.md[1]}, that is ₹43,360.`], v: bDep, n: 'A fall of ten percent a year multiplies the value by zero point nine each year. After three years the value is one lakh sixty thousand times zero point seven two nine: one lakh sixteen thousand six hundred and forty rupees. The total fall is forty three thousand three hundred and sixty rupees.' }),
    sl('check', 'Quick check: a machine loses value', { b: 'Multiply by $0.8$ once for each year.', chk: 'm15', n: 'A fall of twenty percent means multiply by zero point eight. Do it twice.' }),
    sl('example', 'Worked example 7: a phone relay', { b: 'In an imagined school phone relay, a teacher phones $3$ parents in round 1, and in each later round every parent just phoned calls $3$ more. How many parents have been phoned after $5$ rounds?', ul: ['**Step 1 —** calls per round: $3, 9, 27, \\ldots$, so $a = 3$, $r = 3$.', `**Step 2 —** ${w27.md[0]}.`, `**Check —** ${w27.md[1]}.`], v: tRelay, n: 'Each round, every parent who was just phoned calls three more, so the calls per round are three, nine, twenty seven and so on. The total after five rounds is the sum of five terms: three times three to the five minus one, over two, which is three hundred and sixty three parents.' }),
    sl('check', 'Quick check: true or false?', { b: 'Try $n = 3$.', chk: 'tf4', n: 'Add one, two and four. Is the answer eight?' }),
    sl('summary', 'Summary', { ul: ['$r > 1$: $S_n = \\dfrac{a\\left(r^{n} - 1\\right)}{r - 1}$; $r < 1$: $S_n = \\dfrac{a\\left(1 - r^{n}\\right)}{1 - r}$; $r = 1$: $S_n = na$', 'How many terms: set $S_n$ equal to the total and compare powers', '$T_n = S_n - S_{n-1}$', 'Growth: $r = 1 + \\dfrac{p}{100}$; depreciation: $r = 1 - \\dfrac{p}{100}$'], v: sum2, n: 'To sum up part two. Use the sum formula that suits the ratio, and remember that a ratio of one simply gives n times a. To find how many terms give a total, compare powers. A term is the difference of two sums. Growth and depreciation by a fixed percentage are geometric progressions.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Sum (2–3 marks):** $a$, $r$ 1 + formula substituted 1 + value 1', '**Application (4 marks):** ratio 1 + correct term or sum 2 + answer with units 1', '**Mistake:** finding $T_n$ when the question asks for the total, or the reverse', '**Mistake:** after $k$ years the value is $ar^{k}$, not $ar^{k-1}$', '**Mistake:** taking $p\\%$ of the original value every year (that is simple, not compound, change)', '**Mistake:** sign slips with $(-2)^{n}$ in the sum formula'], n: 'Show a and r, then the formula with the numbers in it, then the value: each step earns a mark. Read carefully whether a single value or a total is asked. After k years of growth, the value is a times r to the power k. And depreciation takes a percentage of the current value, not the original price.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch10', version: 1, title: 'Geometric Progression — chapter notes', language: 'en',
  sections: [
    { heading: '1. Geometric progressions and the common ratio', body_md: r`- A **geometric progression** (GP) is a list in which each term is the term before it multiplied by the same non-zero number $r$, the **common ratio**.
- $r = \dfrac{T_{n+1}}{T_n}$: divide any term by the term before it. A list is a GP only if **every** such ratio is the same.
- $r$ can be a fraction (terms shrink) or negative (signs alternate). No term of a GP is $0$; if $r = 1$ every term is equal.

*Example:* $2, -6, 18, -54$: ratios $-3, -3, -3$, so it is a GP with $r = -3$; the next term is $162$.`, key_terms: [{ term: 'Geometric progression', definition_md: 'A list of non-zero numbers in which each term is the previous term multiplied by a fixed number.' }, { term: 'Common ratio', definition_md: 'The fixed multiplier $r = \\dfrac{T_{n+1}}{T_n}$.' }], formulas: [{ latex: 'r = \\dfrac{T_{n+1}}{T_n}', label: 'Common ratio' }], visual: tWhat, visuals: [bSigns], topic_ids: [topic(1)] },
    { heading: '2. The general term', body_md: r`The terms are $a, ar, ar^{2}, ar^{3}, \ldots$, so the **$n$th term** is $T_n = ar^{n-1}$: the power of $r$ is one less than the term number.

- To find a term: substitute $a$, $r$ and $n$.
- To find **which term** equals a value: solve $ar^{n-1} =$ value by writing both sides as powers of $r$.

*Examples:* the $8$th term of $81, -27, 9, \ldots$ is $81 \times \left(-\dfrac{1}{3}\right)^{7} = -\dfrac{1}{27}$; in $6, 18, 54, \ldots$, $6 \times 3^{n-1} = 4374$ gives $3^{n-1} = 729 = 3^{6}$, so $n = 7$.`, key_terms: [{ term: 'General term', definition_md: '$T_n = ar^{n-1}$, the term in place $n$.' }], formulas: [{ latex: 'T_n = ar^{n-1}', label: 'nth term' }], visual: tGen, visuals: [pEx3, tEx2], topic_ids: [topic(1)] },
    { heading: '3. Finding a and r from two terms', body_md: r`1. Write the given terms as $ar^{p-1}$ and $ar^{q-1}$.
2. Divide: $a$ cancels and a single power of $r$ remains.
3. Take the root. An **even** power has two real roots, $\pm$; check both. An odd power has one real root, with the sign of the number.
4. Find $a$ from either term, and check by listing a few terms.

*Examples:* $T_3 = 36$, $T_6 = 972$: $r^{3} = 27$, $r = 3$, $a = 4$. $T_2 = 6$, $T_4 = 54$: $r^{2} = 9$, so $r = 3$ ($a = 2$) or $r = -3$ ($a = -2$).`, key_terms: [{ term: 'Two-term method', definition_md: 'Dividing two given terms to eliminate $a$ and find $r$.' }], formulas: [{ latex: '\\dfrac{T_q}{T_p} = r^{q-p}', label: 'Dividing two terms' }], visual: fTwo, visuals: [pEx4, sEx5], topic_ids: [topic(1)] },
    { heading: '4. Middle terms, three terms and terms from the end', body_md: r`- If $a$, $b$, $c$ are consecutive terms of a GP, $\dfrac{b}{a} = \dfrac{c}{b}$, so $b^{2} = ac$. For positive terms, $b = \sqrt{ac}$.
- Three unknown terms in GP with a known product: write them as $\dfrac{a}{r}$, $a$, $ar$; their product is $a^{3}$.
- **From the end:** start at the last term $l$ and divide by $r$ at each step: the $k$th term from the end is $l\left(\dfrac{1}{r}\right)^{k-1}$.

*Examples:* $x - 2$, $x + 1$, $x + 7$ in GP: $(x + 1)^{2} = (x - 2)(x + 7)$ gives $x = 5$ (terms $3, 6, 12$). In $5, 15, 45, \ldots, 10935$ the $3$rd term from the end is $10935 \times \left(\dfrac{1}{3}\right)^{2} = 1215$.`, key_terms: [{ term: 'Consecutive terms', definition_md: 'Terms next to each other in the progression.' }, { term: 'Term from the end', definition_md: 'A term counted backwards from the last term, using the ratio $\\dfrac{1}{r}$.' }], formulas: [{ latex: 'b^{2} = ac', label: 'Three consecutive terms' }, { latex: 'l\\left(\\dfrac{1}{r}\\right)^{k-1}', label: 'kth term from the end' }], visual: tMid, visuals: [tEx6, tEnd], topic_ids: [topic(1)] },
    { heading: '5. Sum of the first n terms', body_md: r`Write $S_n = a + ar + \cdots + ar^{n-1}$, multiply by $r$ and subtract: $rS_n - S_n = ar^{n} - a$.

- $r > 1$: $S_n = \dfrac{a\left(r^{n} - 1\right)}{r - 1}$.
- $r < 1$ (including negative $r$): $S_n = \dfrac{a\left(1 - r^{n}\right)}{1 - r}$ (the same value, written to keep top and bottom positive).
- $r = 1$: every term is $a$, so $S_n = na$.

*Examples:* $4 + 12 + 36 + \cdots$ ($6$ terms) $= 1456$; $96 + 48 + 24 + \cdots$ ($6$ terms) $= 189$; $2 - 4 + 8 - \cdots$ ($7$ terms) $= 86$.`, key_terms: [{ term: 'Sum of n terms', definition_md: '$S_n$, the total of the first $n$ terms.' }], formulas: [{ latex: 'S_n = \\dfrac{a\\left(r^{n} - 1\\right)}{r - 1}', label: 'r > 1' }, { latex: 'S_n = \\dfrac{a\\left(1 - r^{n}\\right)}{1 - r}', label: 'r < 1' }, { latex: 'S_n = na', label: 'r = 1' }], visual: tDeriv, visuals: [tForms, bTitle2, bEx22], topic_ids: [topic(2)] },
    { heading: '6. Using the sum: how many terms, and terms from sums', body_md: r`- **How many terms** give a total: set $S_n$ equal to the total, simplify to $r^{n} =$ a number, and compare powers.
- **A term from sums:** $T_n = S_n - S_{n-1}$.
- **Least number of terms** to pass a value: work out consecutive sums and compare.

*Examples:* $7 + 21 + 63 + \cdots = 2548$ gives $3^{n} = 729$, so $n = 6$. If $S_n = 3\left(2^{n} - 1\right)$, then $T_5 = S_5 - S_4 = 93 - 45 = 48$.`, key_terms: [{ term: 'Running total', definition_md: 'The sums $S_1, S_2, S_3, \\ldots$ of the first one, two, three, … terms.' }], formulas: [{ latex: 'T_n = S_n - S_{n-1}', label: 'Term from two sums' }], visual: tEx24, visuals: [tEx23], topic_ids: [topic(2)] },
    { heading: '7. Applications: growth, depreciation and doubling', body_md: r`- **Growth** by $p\%$ of the current value each year: $r = 1 + \dfrac{p}{100}$ (population, savings, a growing plant).
- **Depreciation** by $p\%$ of the current value each year: $r = 1 - \dfrac{p}{100}$ (a machine, a vehicle).
- Starting value $a$: the value **after $k$ years** is $ar^{k}$, the $(k + 1)$th term of the GP.
- Doubling, tripling or halving each step: $r = 2$, $3$ or $\dfrac{1}{2}$; a **total** over several steps is a sum $S_n$.

*Examples:* $25000$ growing at $4\%$: after $2$ years $25000 \times 1.04^{2} = 27040$. ₹1,60,000 falling $10\%$ a year: after $3$ years $160000 \times 0.9^{3} = 116640$ rupees.`, key_terms: [{ term: 'Depreciation', definition_md: 'A fall in value by a fixed percentage of the current value each year.' }, { term: 'Growth factor', definition_md: 'The ratio $1 + \\dfrac{p}{100}$ that multiplies a quantity each year.' }], formulas: [{ latex: 'ar^{k}', label: 'Value after k years' }, { latex: 'r = 1 \\pm \\dfrac{p}{100}', label: 'Growth (+) or depreciation (−)' }], visual: pGrowth, visuals: [bPop, bDep, tRelay], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *A term (2 marks):* $a$ and $r$ 1; value 1.
- *Which term / how many terms (3 marks):* equation 1; powers compared 1; value of $n$ 1.
- *Two given terms (3–4 marks):* dividing to get a power of $r$ 1; $r$ 1; $a$ 1; the required term or sum 1.
- *Sum (2–3 marks):* $a$ and $r$ 1; formula substituted 1; value 1.
- *Application (3–4 marks):* ratio such as $1.05$ or $0.9$ 1; correct term or sum 1–2; answer with units 1.
- *10-mark structured question:* parts (a), (b), (c), usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Using $ar^{n}$ for the $n$th term instead of $ar^{n-1}$.
2. Dividing the wrong way round for $r$, or losing the sign of an odd power of a negative ratio.
3. Forgetting the second root $-r$ when $r^{2}$ is found.
4. Giving a single term when the question asks for a total (or the reverse).
5. Taking the percentage of the original value every year in depreciation or growth.
6. Using the sum formula when $r = 1$ (it divides by $0$): the sum is simply $na$.`,
  status: 'draft', provenance: d1.provenance,
};
// notes facts
S(gctx(g2), [r`81 \times \left(-\dfrac{1}{3}\right)^{7} = -\dfrac{1}{27}`], 'notes 2');
S(uctx('n', [7]), [r`6 \times 3^{n-1} = 4374`, r`3^{n-1} = 729 = 3^{6}`], 'notes 2b');
S(gctx(gp(2, -3)), [r`T_{5} = 162`], 'notes 1');
S(ARITH, [r`25000 \times 1.04^{2} = 27040`, r`160000 \times 0.9^{3} = 116640`, r`10935 \times \left(\dfrac{1}{3}\right)^{2} = 1215`], 'notes arithmetic');
S({ sols: [{}], fns: { S: (n) => q(3).mul(q(2).pow(n).sub(1)) } }, [r`S_{5} - S_{4} = 93 - 45 = 48`], 'notes 6');
must(g21.sum(6).eq(1456) && g22.sum(6).eq(189) && g23.sum(7).eq(86) && g24.termsForSum(2548) === 6 && gp(1, 3).list(0 + 1).length === 1, 'notes sums');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch10', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **geometric progression**?', 'A list of non-zero numbers in which each term is the one before it multiplied by the same number $r$.', 'definition', 1),
    fc('f02', 'How do you find the **common ratio**?', 'Divide any term by the term just before it: $r = \\dfrac{T_{n+1}}{T_n}$.', 'formula', 1),
    fc('f03', 'Common ratio of $7, -14, 28, \\ldots$?', '$r = \\dfrac{-14}{7} = -2$.', 'example', 1),
    fc('f04', 'What happens to the terms when $r$ is negative?', 'Their signs alternate: $+, -, +, -, \\ldots$', 'concept', 1),
    fc('f05', 'What happens to the terms when $0 < r < 1$?', 'They shrink in size but keep the same sign.', 'concept', 1),
    fc('f06', 'Is $1, 4, 9, 16$ a geometric progression?', 'No: $\\dfrac{4}{1} = 4$ but $\\dfrac{9}{4} = 2.25$.', 'example', 1),
    fc('f07', 'State the **general term** of a GP.', '$T_n = ar^{n-1}$.', 'formula', 1),
    fc('f08', 'Why is the power $n - 1$ and not $n$?', 'The first term $a$ has no factor of $r$; each later term adds one factor, so the $n$th term has $n - 1$.', 'concept', 1),
    fc('f09', '$10$th term of $3, -6, 12, \\ldots$?', '$3 \\times (-2)^{9} = -1536$.', 'example', 1),
    fc('f10', 'How do you find **which term** equals a value?', 'Solve $ar^{n-1}$ = value: divide by $a$ and write both sides as powers of $r$.', 'concept', 1),
    fc('f11', 'Two terms $T_p$ and $T_q$ are given. First step?', 'Divide them: $\\dfrac{T_q}{T_p} = r^{q-p}$, so $a$ cancels.', 'concept', 1),
    fc('f12', '$r^{2} = 9$. What are the possible ratios?', '$r = 3$ or $r = -3$: check both.', 'exam-tip', 1),
    fc('f13', '$a$, $b$, $c$ are consecutive terms of a GP. Relation?', '$b^{2} = ac$.', 'formula', 1),
    fc('f14', 'How do you write three unknown terms of a GP with a given product?', '$\\dfrac{a}{r}$, $a$, $ar$: the product is $a^{3}$.', 'exam-tip', 1),
    fc('f15', 'How do you count terms **from the end**?', 'Start at the last term and divide by $r$ at each step back.', 'concept', 1),
    fc('f16', 'Sum of $n$ terms when $r > 1$?', '$S_n = \\dfrac{a\\left(r^{n} - 1\\right)}{r - 1}$.', 'formula', 2),
    fc('f17', 'Sum of $n$ terms when $r < 1$?', '$S_n = \\dfrac{a\\left(1 - r^{n}\\right)}{1 - r}$.', 'formula', 2),
    fc('f18', 'Sum of $n$ terms when $r = 1$?', '$S_n = na$ (the formulas would divide by $0$).', 'fact', 2),
    fc('f19', 'How is the sum formula derived?', 'Multiply $S_n$ by $r$ and subtract: the middle terms cancel, leaving $rS_n - S_n = ar^{n} - a$.', 'concept', 2),
    fc('f20', 'Sum of the first $6$ terms of $96, 48, 24, \\ldots$?', '$189$.', 'example', 2),
    fc('f21', 'Sum of the first $n$ terms of $1, 2, 4, \\ldots$?', '$2^{n} - 1$.', 'fact', 2),
    fc('f22', 'How do you get a term from the sums?', '$T_n = S_n - S_{n-1}$.', 'formula', 2),
    fc('f23', 'How many terms of $7 + 21 + 63 + \\cdots$ make $2548$?', '$3^{n} = 729$, so $6$ terms.', 'example', 2),
    fc('f24', 'Ratio for growth of $p\\%$ a year?', '$r = 1 + \\dfrac{p}{100}$, e.g. $1.05$ for $5\\%$.', 'formula', 3),
    fc('f25', 'Ratio for depreciation of $p\\%$ a year?', '$r = 1 - \\dfrac{p}{100}$, e.g. $0.9$ for $10\\%$.', 'formula', 3),
    fc('f26', 'Value after $k$ years from a starting value $a$?', '$ar^{k}$, the $(k + 1)$th term.', 'exam-tip', 3),
    fc('f27', 'Does a machine losing $10\\%$ a year lose $30\\%$ in $3$ years?', 'No: it keeps $0.9^{3} = 0.729$, so it loses $27.1\\%$.', 'exam-tip', 3),
    fc('f28', 'Graph of a growing GP compared with an AP?', 'The GP points curve upwards ever more steeply; the AP points lie on a straight line.', 'diagram', 1),
  ],
  status: 'draft', provenance: d1.provenance,
};
// flashcard facts
must(gp(3, -2).term(10).eq(-1536) && g22.sum(6).eq(189) && g24.termsForSum(2548) === 6 && ratioOf([1, 4, 9, 16]) === null, 'flashcards f06 f09 f20 f23');
S(ARITH, [r`\dfrac{-14}{7} = -2`, r`\dfrac{4}{1} = 4`, r`\dfrac{9}{4} = 2.25`, r`3 \times (-2)^{9} = -1536`, r`0.9^{3} = 0.729`], 'flashcard lines');
must([1, 2, 3, 4, 5, 6].every((n) => gp(1, 2).sum(n).eq(q(2).pow(n).sub(1))), 'flashcard f21');

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch10', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only: common ratio and the general term (including fractional and negative ratios, which term, a and r from two terms with both roots of an even power, middle terms b² = ac, three terms a/r, a, ar, terms from the end); sum of the first n terms for r > 1, r < 1 (including negative r) and r = 1, number of terms for a total, T_n = S_n − S_{n−1}; simple applications (growth, depreciation, doubling, bouncing, relays). The sum to infinity is not part of the ICSE 2027 topics and is not used.', progressions: 'all arithmetic is exact over BigInt rationals (powers such as 3^10 or 1.04^3 stay exact); every term is computed by a r^(n−1) and by listing the sequence, every sum by both closed forms and by adding the listed terms; which-term and how-many-terms answers by walking the list or the partial sums (unique hit); a and r from two terms by exact rational roots (every real root found and checked back); applications recomputed term by term', working_lines: 'every equation typed in a worked example, note, flashcard, solution or model answer is parsed from its TeX and evaluated exactly: adjacent sides must be equal (or satisfy <, >, ≠ as written; ≈ checked against the decimals shown) for a verified solution; identities in n are compared for n = 1…7; "or" alternatives must cover every verified root; T_k and S_k are evaluated on the progression that produced them' } },
};
const tests = chapterTests('Geometric Progression', {
  A: ['m04', 'm07', 'm13', 'ar2', 's301', 's302'],
  B: ['l01', 'l06'],
}, {
  A: ['m05', 'm08', 'm09', 'm12', 'm16', 'm17', 'ar3', 'ar5', 's401', 's402', 's403'],
  B: ['l02', 'l04', 'l07'],
});
build({ dir: DIR, release, testsSpec: tests });

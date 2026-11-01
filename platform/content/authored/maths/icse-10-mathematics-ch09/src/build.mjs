// Build ICSE 10 Mathematics ch09 Arithmetic Progression. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch09/src/build.mjs
// Every term, sum, number of terms and unknown on the slides, in the notes, tables and plots is computed by
// ap.mjs with exact fractions (terms by formula AND by listing the sequence; sums by both formulas AND by
// adding the listed terms; n from a sum by the exact quadratic AND by searching the partial sums), every
// typed working line is checked by work.mjs, and every plotted point lies on its line or curve (lib.mjs).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { AP, F, Fr, fromTerms, isAP, diffs, total, inr } from './ap.mjs';
import { steps, apctx, solvectx, ARITH, eqctx, checkLine } from './work.mjs';

setUnit('icse-10-mathematics-ch09');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const d = (s) => `$${s}$`;
const S = (ctx, lines, msg) => steps(ctx, lines).must(msg);
const nctx = (ap, ns) => apctx(ap, { free: ['n'], sols: ns.map((n) => ({ n: Fr.of(n) })) });
const neg = (t) => (t.startsWith('-') ? `−${t.slice(1)}` : t);
const lbl = (x, y) => `(${neg(Fr.of(x).tex(true))}, ${neg(Fr.of(y).tex(true))})`;
const tx = (v) => Fr.of(v).tex(true);
const listTex = (xs) => xs.map(tx).join(', ');
/** Points (n, T_n) of an AP for the given term numbers, labelled. */
const termPts = (ap, ns, label = true) => ns.map((n) => { const y = ap.T(n).num(); return label ? [n, y, lbl(n, y)] : [n, y]; });
/** The plot expression of T_n = dn + (a - d) in x. */
const lineExpr = (ap) => { const { coef, cons } = ap.nth(); const c = tx(coef), k = tx(cons.abs()); return `${c === '1' ? '' : c === '-1' ? '-' : c}x${cons.isZero() ? '' : cons.sign() < 0 ? ` - ${k}` : ` + ${k}`}`; };
/** Bars of the first n terms. */
const bars = (label, ap, n) => ({ label, points: ap.list(n).map((t, k) => [k + 1, t.num()]), kind: 'bar' });

// ---------------------------------------------------------------- deck 1 figures and worked examples (asserted)
// Title: 3, 8, 13, 18, 23 on the line T = 5n - 2
const apT = new AP(3, 5);
must(lineExpr(apT) === '5x - 2' && listTex(apT.list(5)) === '3, 8, 13, 18, 23', 'title AP');
const pTitle = plot({ x: [0, 6], y: [0, 26], xl: 'term number n', yl: 'term', fns: [{ expr: lineExpr(apT), label: '$T_n = 5n - 2$', domain: [1, 5] }], pts: termPts(apT, [1, 2, 3, 4, 5]) }, 'The terms 3, 8, 13, 18 and 23 plotted against their term numbers 1 to 5: the points lie on a straight line that rises by 5 for every step to the right.', 'Each step adds the same $5$: the terms of an AP lie on a straight line.');

// What is an AP? differences table
const seqs = [[4, 11, 18, 25], [30, 24, 18, 12], [5, 5, 5, 5], [2, 3, 5, 8]];
const tWhat = table(['Sequence', 'Differences $T_2 - T_1$, $T_3 - T_2$, $T_4 - T_3$', 'AP?'], seqs.map((s) => [d(listTex(s)), d(listTex(diffs(s))), isAP(s) ? `yes, $d = ${tx(diffs(s)[0])}$` : 'no: the differences change']), 'Table of four sequences and their differences: 4, 11, 18, 25 has differences 7, 7, 7 and is an AP; 30, 24, 18, 12 has differences minus 6 each time and is an AP; 5, 5, 5, 5 has differences 0 and is an AP; 2, 3, 5, 8 has differences 1, 2, 3 and is not an AP.', 'Same difference every time: an AP. Changing differences: not an AP.');
must(seqs.map(isAP).join() === 'true,true,true,false', 'what-is-an-AP table');

// Common difference: a rising and a falling AP
const apUp = new AP(2, 3.5), apDown = new AP(20, -2.5);
must(lineExpr(apUp) === '3.5x - 1.5' && lineExpr(apDown) === '-2.5x + 22.5' && apUp.T(4).eq(apDown.T(4)), 'rising/falling lines');
const pD = plot({ x: [0, 6], y: [0, 22], xl: 'term number n', yl: 'term', fns: [{ expr: lineExpr(apUp), label: '$d = 3.5$', domain: [1, 5] }, { expr: lineExpr(apDown), label: '$d = -2.5$', domain: [1, 5] }], pts: [...termPts(apUp, [1, 2, 3, 5], false), ...termPts(apDown, [1, 2, 3, 5], false), [4, 12.5, '(4, 12.5)']] }, 'Two arithmetic progressions plotted against term number: 2, 5.5, 9, 12.5, 16 rising by 3.5 each step, and 20, 17.5, 15, 12.5, 10 falling by 2.5 each step; both have 12.5 as their fourth term.', 'Positive $d$: the terms rise. Negative $d$: they fall.');

// WE1: is it an AP?
const we1 = [[11, 17, 23, 29], [2, 6, 18, 54], [-1.5, -4, -6.5, -9], [1, 4, 9, 16]];
must(we1.map(isAP).join() === 'true,false,true,false', 'WE1 verdicts');
const tWE1 = table(['List', 'Differences', 'Verdict'], we1.map((s, i) => [`(${['i', 'ii', 'iii', 'iv'][i]}) ${d(listTex(s))}`, d(listTex(diffs(s))), isAP(s) ? `AP, $d = ${tx(diffs(s)[0])}$` : 'not an AP']), 'Table for worked example 1: 11, 17, 23, 29 has differences 6, 6, 6, an AP; 2, 6, 18, 54 has differences 4, 12, 36, not an AP; minus 1.5, minus 4, minus 6.5, minus 9 has differences minus 2.5 each time, an AP; 1, 4, 9, 16 has differences 3, 5, 7, not an AP.', 'Work out every difference before deciding.');
const wWE1 = S(ARITH, [r`-4 - (-1.5) = -6.5 - (-4) = -9 - (-6.5) = -2.5`], 'WE1 line');

// General term table
const apG = new AP(6, 4);
const tGen = table(['Term number', 'Term', 'Steps of $d$ added', 'For $6, 10, 14, \\ldots$'], [[1, 'a', 0], [2, 'a + d', 1], [3, 'a + 2d', 2], [4, 'a + 3d', 3]].map(([k, t, s]) => [d(String(k)), d(t), d(String(s)), d(`${tx(apG.a)} + ${s} \\times ${tx(apG.d)} = ${tx(apG.T(k))}`)]).concat([['$n$', '$a + (n - 1)d$', '$n - 1$', '$6 + (n - 1) \\times 4 = 4n + 2$']]), 'Table building the general term: term 1 is a, term 2 is a plus d, term 3 is a plus 2 d, term 4 is a plus 3 d, so term n is a plus n minus 1 times d; for 6, 10, 14 this gives 6, 10, 14, 18 and in general 4 n plus 2.', 'To reach the $n$th term you add $d$ exactly $n - 1$ times.');
S(apctx(apG), [0, 1, 2, 3].map((s) => `${tx(apG.a)} + ${s} \\times ${tx(apG.d)} = ${tx(apG.T(s + 1))}`), 'general term table');
S(apctx(apG, { free: ['n'] }), [r`6 + (n - 1) \times 4 = 4n + 2`], 'general term table row n');

// WE2: 13, 8, 3, …
const ap2 = new AP(13, -5);
const w2 = S(apctx(ap2, { free: ['n'] }), [r`d = 8 - 13 = -5`, r`T_n = 13 + (n - 1) \times (-5) = 18 - 5n`, r`T_{18} = 18 - 5 \times 18 = 18 - 90 = -72`, r`T_3 = 18 - 15 = 3`], 'WE2');
must(ap2.T(18).eq(-72) && lineExpr(ap2) === '-5x + 18', 'WE2 values');
const p2 = plot({ x: [0, 19], y: [-80, 20], xl: 'term number n', yl: 'term', fns: [{ expr: lineExpr(ap2), label: '$T_n = 18 - 5n$', domain: [1, 18] }], pts: termPts(ap2, [1, 2, 3, 18]) }, 'Terms of 13, 8, 3 and so on plotted against n: the points lie on the falling line T n equals 18 minus 5 n, which reaches minus 72 at n equals 18.', 'The $18$th term lies on the same line: $T_{18} = -72$.');

// WE3: 4.5, 7, 9.5, …: which term is 57? is 60 a term?
const ap3 = new AP(4.5, 2.5);
const w3 = S(nctx(ap3, [22]), [r`4.5 + (n - 1) \times 2.5 = 57 \Rightarrow (n - 1) \times 2.5 = 52.5 \Rightarrow n - 1 = 21 \Rightarrow n = 22`], 'WE3a');
const w3b = S(nctx(ap3, [F(116, 5)]), [r`4.5 + (n - 1) \times 2.5 = 60 \Rightarrow (n - 1) \times 2.5 = 55.5 \Rightarrow n - 1 = 22.2`], 'WE3b');
must(ap3.indexOf(57) === 22 && ap3.indexOf(60) === null, 'WE3 values');
const fWhich = flow('LR', [['a', 'Write $a + (n - 1)d = $ the given number'], ['b', 'Solve for $n$'], ['c', 'Is $n$ a positive whole number?'], ['y', 'Yes: it is the $n$th term'], ['n', 'No: it is not a term']], [['a', 'b'], ['b', 'c'], ['c', 'y', 'yes'], ['c', 'n', 'no']], 'Flow chart for deciding whether a number is a term: write a plus n minus 1 times d equal to the number, solve for n, and ask whether n is a positive whole number; if yes it is the nth term, if not it is not a term of the progression.', 'A term number must be a positive whole number.');

// Counting terms and terms from the end: 9, 16, 23, …, 352
const ap4 = new AP(9, 7), n4 = ap4.count(352), back4 = new AP(352, -7);
must(n4 === 50 && back4.T(10).eq(289) && ap4.T(n4 - 10 + 1).eq(289), 'WE4 values');
const tEnd = table(['Position', 'From the start', 'From the end'], [1, 2, 3].map((m) => [`${m === 1 ? '1st' : m === 2 ? '2nd' : '3rd'}`, d(tx(ap4.T(m))), d(tx(back4.T(m)))]).concat([['$m$th', '$9 + (m - 1) \\times 7$', '$352 - (m - 1) \\times 7$']]), 'Table for the progression 9, 16, 23 up to 352: counted from the start the first three terms are 9, 16 and 23; counted from the end they are 352, 345 and 338; the mth term from the end is 352 minus m minus 1 times 7.', 'Read backwards, an AP is still an AP, with common difference $-d$.');
const w4 = S(nctx(ap4, [50]), [r`9 + (n - 1) \times 7 = 352 \Rightarrow (n - 1) \times 7 = 343 \Rightarrow n - 1 = 49 \Rightarrow n = 50`], 'WE4 count');
const w4b = S(apctx(back4), [r`352 - 9 \times 7 = 352 - 63 = 289`], 'WE4 from end');
const w4c = S(apctx(ap4), [r`T_{41} = 9 + 40 \times 7 = 289`], 'WE4 check');
const p4 = plot({ x: [0, 52], y: [0, 380], xl: 'term number n', yl: 'term', fns: [{ expr: lineExpr(ap4), label: '$T_n = 7n + 2$', domain: [1, 50] }], pts: termPts(ap4, [1, 41, 50]) }, 'The progression 9, 16, 23 up to 352 plotted against term number: a rising line from the point (1, 9) to the point (50, 352), with the 10th term from the end, 289, marked at n equals 41.', 'The $10$th term from the end is the $50 - 10 + 1 = 41$st term.');
S(ARITH, [r`50 - 10 + 1 = 41`], 'caption arithmetic');

// WE5: T5 = 31, T14 = -5
const ap5 = fromTerms(5, 31, 14, -5);
const w5 = S(solvectx(['a', 'd'], { a: ap5.a, d: ap5.d }), [r`T_{14} - T_5 = 9d = -5 - 31 = -36`, r`d = -4`, r`a = T_5 - 4d = 31 + 16 = 47`, r`T_{30} = 47 + 29 \times (-4) = -69`], 'WE5');
must(ap5.a.eq(47) && ap5.d.eq(-4) && ap5.T(30).eq(-69), 'WE5 values');
const p5 = plot({ x: [0, 31], y: [-75, 55], xl: 'term number n', yl: 'term', fns: [{ expr: lineExpr(ap5), label: '$T_n = 51 - 4n$', domain: [1, 30] }], pts: termPts(ap5, [1, 5, 14, 30]) }, 'A falling line through the points (5, 31) and (14, minus 5), continued back to the first term 47 at n equals 1 and on to minus 69 at n equals 30.', 'Two terms fix the line, and so the whole AP.');

// Three terms in AP: 5m + 2, 4m + 7, 2m + 15
const w6c = S(eqctx('m', [3]), [r`2(4m + 7) = (5m + 2) + (2m + 15) \Rightarrow 8m + 14 = 7m + 17 \Rightarrow m = 3`], 'three terms condition');
must(isAP([17, 19, 21]) && [5 * 3 + 2, 4 * 3 + 7, 2 * 3 + 15].join() === '17,19,21', 'condition example');
const tThree = table(['Idea', 'Rule', 'Example'], [['Three unknown terms', '$a - d$, $a$, $a + d$: their sum is $3a$', 'sum $36$ gives $a = 12$'], ['Middle of three terms', '$a$, $b$, $c$ in AP exactly when $2b = a + c$', '$5m + 2$, $4m + 7$, $2m + 15$: $m = 3$ gives $17, 19, 21$']], 'Table of two ideas for three terms in an arithmetic progression: write them as a minus d, a, a plus d so that their sum is 3 a; and a, b, c are in AP exactly when 2 b equals a plus c, which for 5 m plus 2, 4 m plus 7 and 2 m plus 15 gives m equals 3.', 'Symmetric terms make the sum simple.');

// WE6: sum 36, product 1428
const w6 = S(eqctx('d', [5, -5], { a: 12 }), [r`(12 - d) \times 12 \times (12 + d) = 12(144 - d^2) = 1428`, r`144 - d^2 = 119 \Rightarrow d^2 = 25 \Rightarrow d = 5 \text{ or } d = -5`], 'WE6');
const w6a = S(eqctx('a', [12]), [r`3a = 36 \Rightarrow a = 12`], 'WE6 sum');
must(total([7, 12, 17]).eq(36) && 7 * 12 * 17 === 1428, 'WE6 values');
const b6 = plot({ x: [0, 4], y: [0, 20], xl: 'position', yl: 'number', series: [{ label: 'the three numbers', points: [[1, 7], [2, 12], [3, 17]], kind: 'bar' }] }, 'Bar chart of the three numbers 7, 12 and 17: each bar is 5 taller than the one before, and the middle bar, 12, is the average of the other two.', 'Equal steps of $5$ either side of the middle number $12$.');

// WE7: stacked chairs 82, 86, 90, …
const ap7 = new AP(82, 4);
const w7 = S(apctx(ap7), [r`T_{15} = 82 + 14 \times 4 = 138`], 'WE7a');
const w7b = S(nctx(ap7, [18]), [r`82 + (n - 1) \times 4 = 150 \Rightarrow (n - 1) \times 4 = 68 \Rightarrow n - 1 = 17 \Rightarrow n = 18`], 'WE7b');
must(ap7.T(15).eq(138) && ap7.indexOf(150) === 18, 'WE7 values');
const p7 = plot({ x: [0, 20], y: [70, 160], xl: 'number of chairs', yl: 'height (cm)', fns: [{ expr: lineExpr(ap7), label: 'height $= 4n + 78$', domain: [1, 18] }], pts: termPts(ap7, [1, 15, 18]) }, 'Height of a stack of imagined plastic chairs against the number of chairs: 82 centimetres for one chair, rising 4 centimetres per chair, 138 centimetres for 15 chairs and 150 centimetres for 18 chairs.', 'Each extra chair adds the same $4$ cm.');

const sum1 = table(['Idea', 'Key fact'], [['AP', 'each term $=$ previous term $+ d$'], ['Common difference', '$d = T_2 - T_1$ (a term minus the one before it)'], ['General term', '$T_n = a + (n - 1)d$'], ['Number of terms', 'solve $a + (n - 1)d = l$'], ['From the end', '$m$th term from the end $= l - (m - 1)d$'], ['Three terms', '$a - d$, $a$, $a + d$; or $2b = a + c$']], 'Summary table for part 1: in an arithmetic progression each term is the previous term plus d; d is a term minus the one before; the general term is a plus n minus 1 times d; count terms by solving for n; the mth term from the end is l minus m minus 1 times d; three terms can be taken as a minus d, a, a plus d.', 'Part 1 on one card.');

// ---------------------------------------------------------------- deck 2 figures and worked examples (asserted)
const apS = new AP(4, 3);
must(apS.list(6).map(String).join() === '4,7,10,13,16,19' && [1, 2, 3, 4, 5, 6].map((n) => apS.S(n).toString()).join() === '4,11,21,34,50,69', 'title sums');
must(!checkLine(r`S_n = 1.5n^2 + 2.5n`, apctx(apS, { free: ['n'] })).length, 'title curve');
const pT2 = plot({ x: [0, 7], y: [0, 80], xl: 'number of terms n', yl: 'running total', fns: [{ expr: '1.5x^2 + 2.5x', label: '$S_n = 1.5n^2 + 2.5n$', domain: [0, 6.5] }], pts: [1, 2, 3, 4, 5, 6].map((n) => [n, apS.S(n).num(), lbl(n, apS.S(n))]) }, 'Running totals of 4, 7, 10, 13 and so on plotted against the number of terms: 4, 11, 21, 34, 50 and 69. The points lie on a curve that bends upwards, not on a straight line.', 'The terms rise steadily, so the totals grow faster and faster.');

const fwd = apS.list(6), rev = [...fwd].reverse();
must(fwd.every((t, i) => t.add(rev[i]).eq(23)) && total(fwd).eq(69), 'pairing');
const tPair = table(['', ...fwd.map((_, i) => `Term ${i + 1}`), 'Total'], [['$S$', ...fwd.map((t) => d(tx(t))), '$S$'], ['$S$ backwards', ...rev.map((t) => d(tx(t))), '$S$'], ['Add', ...fwd.map(() => '$23$'), '$2S = 6 \\times 23 = 138$']], 'Table writing the sum 4 plus 7 plus 10 plus 13 plus 16 plus 19 forwards and backwards: each column adds up to 23, so twice the sum is 6 times 23, which is 138, and the sum is 69.', 'Each column adds up to first term $+$ last term, so $S = \\dfrac{6}{2}(4 + 19) = 69$.');
S(ARITH, [r`2S = 6 \times 23 = 138`.replace('2S = ', '')], 'pairing arithmetic');
S(ARITH, [r`\dfrac{6}{2}(4 + 19) = 69`], 'pairing caption');

const fForm = flow('LR', [['g1', 'Know $a$, $d$, $n$'], ['g2', 'Know $a$, $l$, $n$'], ['g3', 'Know $a$, $d$, $l$'], ['f1', '$S_n = \\dfrac{n}{2}[2a + (n - 1)d]$'], ['f2', '$S_n = \\dfrac{n}{2}(a + l)$'], ['f3', 'find $n$ from $a + (n - 1)d = l$ first']], [['g1', 'f1'], ['g2', 'f2'], ['g3', 'f3'], ['f3', 'f2']], 'Flow chart for choosing a sum formula: if a, d and n are known use n over 2 times 2 a plus n minus 1 times d; if a, the last term l and n are known use n over 2 times a plus l; if a, d and l are known, first find n, then use n over 2 times a plus l.', 'Two forms of the same formula.');

// WE1 (deck 2): 40, 36, 32, … 16 terms
const ap21 = new AP(40, -4);
const w21 = S(apctx(ap21), [r`S_{16} = \dfrac{16}{2}[2 \times 40 + 15 \times (-4)] = 8 \times (80 - 60) = 8 \times 20 = 160`, r`T_{16} = 40 + 15 \times (-4) = -20`, r`\dfrac{16}{2}(40 - 20) = 160`], 'deck 2 WE1');
must(ap21.S(16).eq(160), 'deck 2 WE1 value');
const b21 = plot({ x: [0, 17], y: [-25, 45], xl: 'term number', yl: 'term', series: [bars('terms of 40, 36, 32, …', ap21, 16)] }, 'Bar chart of the first 16 terms of 40, 36, 32 and so on: the bars fall by 4 each time, from 40 down to 0 at the 11th term and then below the axis to minus 20 at the 16th term.', 'The negative terms at the end cancel part of the total: $S_{16} = 160$.');
must(ap21.T(11).isZero(), 'zero term 11');

// WE2 (deck 2): -8 - 3 + 2 + 7 + … + 112
const ap22 = new AP(-8, 5), n22 = ap22.count(112);
const w22 = S(nctx(ap22, [25]), [r`-8 + (n - 1) \times 5 = 112 \Rightarrow (n - 1) \times 5 = 120 \Rightarrow n - 1 = 24 \Rightarrow n = 25`, r`S_{25} = \dfrac{25}{2}(-8 + 112) = 12.5 \times 104 = 1300`], 'deck 2 WE2');
must(n22 === 25 && ap22.S(25).eq(1300), 'deck 2 WE2 values');
const p22 = plot({ x: [0, 26], y: [-20, 120], xl: 'term number n', yl: 'term', fns: [{ expr: lineExpr(ap22), label: '$T_n = 5n - 13$', domain: [1, 25] }], pts: termPts(ap22, [1, 25]) }, 'The terms of minus 8, minus 3, 2, 7 and so on plotted against n: a rising line from (1, minus 8) to (25, 112). The sum is 25 times the average of these two end values, 52.', 'Sum $=$ number of terms $\\times$ average of first and last: $25 \\times 52 = 1300$.');
S(ARITH, [r`25 \times 52 = 1300`], 'WE2 caption');

// WE3 (deck 2): 25, 22, 19, … sum 116
const ap23 = new AP(25, -3), q23 = ap23.sumQuadratic(116);
must(q23.roots.map(String).join() === '8,29/3' && ap23.nForSum(116).join() === '8', 'deck 2 WE3 roots');
const w23 = S(nctx(ap23, q23.roots), [r`S_n = \dfrac{n}{2}[50 + (n - 1) \times (-3)] = \dfrac{n(53 - 3n)}{2}`, r`\dfrac{n(53 - 3n)}{2} = 116 \Rightarrow 3n^2 - 53n + 232 = 0`, r`(n - 8)(3n - 29) = 0 \Rightarrow n = 8 \text{ or } n = \dfrac{29}{3}`], 'deck 2 WE3');
const w23c = S(apctx(ap23), [r`S_8 = 4(50 - 21) = 116`], 'deck 2 WE3 check');
must(!checkLine(r`S_n = 26.5n - 1.5n^2`, apctx(ap23, { free: ['n'] })).length, 'WE3 curve');
const p23 = plot({ x: [0, 18], y: [-20, 130], xl: 'number of terms n', yl: 'sum', fns: [{ expr: '26.5x - 1.5x^2', label: '$S_n$ for $25, 22, 19, \\ldots$', domain: [0, 18] }, { expr: '116', label: 'sum $= 116$' }], pts: [[8, 116, '(8, 116)']] }, 'Graph of the sum of the first n terms of 25, 22, 19 and so on: it rises to just above 117 and falls again. The horizontal line at 116 meets it at n equals 8 and again at a fraction between 9 and 10, which is not a whole number of terms.', 'Only $n = 8$ is a whole number of terms; $n = \\dfrac{29}{3}$ is rejected.');
const fN = flow('LR', [['a', 'Write $S_n$ with the given $a$ and $d$'], ['b', 'Set it equal to the given sum'], ['c', 'Rearrange to a quadratic in $n$ and solve'], ['d', 'Keep only positive whole numbers'], ['e', 'Check with the sum formula']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for finding the number of terms from a given sum: write S n using a and d, set it equal to the sum, rearrange to a quadratic in n and solve, keep only positive whole-number roots, and check by working out the sum.', 'A number of terms must be a positive whole number.');

// WE4 (deck 2): 11th to 30th terms of 6, 11, 16, …
const ap24 = new AP(6, 5);
const w24 = S(apctx(ap24), [r`S_{30} = \dfrac{30}{2}[12 + 29 \times 5] = 15 \times 157 = 2355`, r`S_{10} = \dfrac{10}{2}[12 + 9 \times 5] = 5 \times 57 = 285`, r`S_{30} - S_{10} = 2355 - 285 = 2070`, r`T_{11} = 6 + 10 \times 5 = 56`, r`T_{30} = 6 + 29 \times 5 = 151`, r`\dfrac{20}{2}(56 + 151) = 10 \times 207 = 2070`], 'deck 2 WE4');
must(total(ap24.list(30).slice(10)).eq(2070), 'deck 2 WE4 by adding');
const b24 = plot({ x: [0, 31], y: [0, 160], xl: 'term number', yl: 'term', series: [{ label: 'terms 1 to 10', points: ap24.list(10).map((t, k) => [k + 1, t.num()]), kind: 'bar' }, { label: 'terms 11 to 30', points: ap24.list(30).slice(10).map((t, k) => [k + 11, t.num()]), kind: 'bar' }] }, 'Bar chart of the first 30 terms of 6, 11, 16 and so on, in two colours: the first ten bars, from 6 to 51, and the next twenty bars, from 56 to 151, whose total is wanted.', 'The wanted part is the whole $S_{30}$ minus the first part $S_{10}$.');

// T_n from S_n: S_n = 7n - n^2
const apSn = new AP(6, -2);
must(!checkLine(r`S_n = 7n - n^2`, apctx(apSn, { free: ['n'] })).length, 'S_n = 7n - n^2 is 6, 4, 2, …');
const tSn = table(['$n$', ...[1, 2, 3, 4, 5].map((n) => d(String(n)))], [['$S_n = 7n - n^2$', ...[1, 2, 3, 4, 5].map((n) => d(tx(apSn.S(n))))], ['$T_n = S_n - S_{n-1}$', ...[1, 2, 3, 4, 5].map((n) => d(tx(apSn.T(n))))]], 'Table for the sum rule S n equals 7 n minus n squared: the sums for n equals 1 to 5 are 6, 10, 12, 12 and 10, and the terms found by subtracting consecutive sums are 6, 4, 2, 0 and minus 2, an arithmetic progression with common difference minus 2.', 'Subtracting consecutive sums gives the terms $6, 4, 2, 0, -2, \\ldots$: $d = -2$.');
must([1, 2, 3, 4, 5].map((n) => apSn.S(n).toString()).join() === '6,10,12,12,10', 'S_n table');
const wSn = S(apctx(apSn, { free: ['n'] }), [r`T_n = S_n - S_{n - 1} = (7n - n^2) - [7(n - 1) - (n - 1)^2] = 8 - 2n`, r`T_1 = S_1 = 7 - 1 = 6`], 'T_n from S_n');

// WE5 (deck 2): loan 30000, instalments 750, 900, 1050, …
const ap25 = new AP(750, 150), q25 = ap25.sumQuadratic(30000);
must(q25.roots.map(String).join() === '-25,16' && ap25.nForSum(30000).join() === '16' && ap25.T(16).eq(3000), 'deck 2 WE5');
const w25 = S(nctx(ap25, q25.roots), [r`S_n = \dfrac{n}{2}[1500 + (n - 1) \times 150] = 75n^2 + 675n`, r`75n^2 + 675n = 30000 \Rightarrow n^2 + 9n - 400 = 0 \Rightarrow (n + 25)(n - 16) = 0 \Rightarrow n = 16 \text{ or } n = -25`], 'deck 2 WE5');
const w25b = S(apctx(ap25), [r`T_{16} = 750 + 15 \times 150 = 3000`, r`S_{16} = 8(750 + 3000) = 30000`], 'deck 2 WE5 check');
const b25 = plot({ x: [0, 17], y: [0, 3200], xl: 'month', yl: 'instalment (₹)', series: [bars('monthly instalment', ap25, 16)] }, 'Bar chart of 16 monthly instalments rising by 150 rupees each month, from 750 rupees in month 1 to 3000 rupees in month 16; together they add up to 30000 rupees.', 'Sixteen instalments, each ₹$150$ more than the last, add up to ₹$30{,}000$.');

// WE6 (deck 2): trolley 4, 12, 20, … cm in successive seconds
const ap26 = new AP(4, 8);
const w26 = S(apctx(ap26), [r`T_{10} = 4 + 9 \times 8 = 76`, r`S_{10} = \dfrac{10}{2}(4 + 76) = 400`], 'deck 2 WE6');
must(!checkLine(r`S_n = 4n^2`, apctx(ap26, { free: ['n'] })).length && ap26.S(10).eq(400), 'trolley S_n = 4n^2');
const p26 = plot({ x: [0, 11], y: [0, 450], xl: 'time (seconds)', yl: 'distance travelled (cm)', fns: [{ expr: '4x^2', label: 'total $= 4n^2$', domain: [1, 10] }], pts: [[1, 4, '(1, 4)'], [2, 16, '(2, 16)'], [3, 36, '(3, 36)'], [10, 400, '(10, 400)']] }, 'Total distance travelled by the imagined trolley against time: 4 centimetres after 1 second, 16 after 2 seconds, 36 after 3 seconds and 400 after 10 seconds, on the curve 4 n squared.', 'Distances in each second form an AP; the running totals are $4n^2$.');

const tChoose = table(['Given', 'Asked', 'Use'], [['$a$, $d$, $n$', 'a term', '$T_n = a + (n - 1)d$'], ['$a$, $d$, a value', 'which term', 'solve $a + (n - 1)d =$ value'], ['$a$, $d$, $n$', 'a sum', '$S_n = \\dfrac{n}{2}[2a + (n - 1)d]$'], ['$a$, $l$, $n$', 'a sum', '$S_n = \\dfrac{n}{2}(a + l)$'], ['$a$, $d$, a sum', 'number of terms', 'quadratic in $n$'], ['$S_n$ as a rule', 'a term', '$T_n = S_n - S_{n-1}$']], 'Table for choosing a method: a term from a, d and n uses a plus n minus 1 times d; which term solves that equal to the value; a sum uses either sum formula; the number of terms from a sum needs a quadratic in n; a term from a sum rule uses S n minus S n minus 1.', 'Read the question for what is given and what is asked.');
const sum2 = table(['Idea', 'Key fact'], [['Sum, first form', '$S_n = \\dfrac{n}{2}[2a + (n - 1)d]$'], ['Sum, second form', '$S_n = \\dfrac{n}{2}(a + l)$'], ['$n$ from a sum', 'quadratic in $n$; keep positive whole numbers'], ['Part of an AP', '$T_{m+1} + \\cdots + T_n = S_n - S_m$'], ['Terms from sums', '$T_1 = S_1$, $T_n = S_n - S_{n-1}$'], ['Applications', 'identify $a$, $d$, $n$; watch the units and the first term']], 'Summary table for part 2: the two sum formulas; n from a given sum by a quadratic, keeping positive whole numbers; the sum of a block of terms as S n minus S m; terms from sums; and in applications identify a, d and n and watch units and the first term.', 'Part 2 on one card.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Arithmetic Progression — Part 1: Common difference and the general term',
  goals: ['Decide whether a sequence is an arithmetic progression and find its common difference', 'Write the general (nth) term of an AP and find any term', 'Find which term a given number is, and the number of terms of a finite AP', 'Find an AP from two conditions, and work with three terms in AP'],
  slides: [
    sl('title', 'Arithmetic Progression, Part 1', { b: 'An **arithmetic progression** (AP) grows or shrinks by the same amount at every step. Plotted against the term number, its terms lie on a straight line.', v: pTitle, n: 'Welcome to arithmetic progressions. Look at the numbers three, eight, thirteen, eighteen and twenty three. Each one is five more than the one before. Plot them against their positions and they sit on a straight line. In this part you will learn to recognise such sequences and to find any term without listing them all.' }),
    sl('concept', 'What you will be able to do', { ul: ['Decide whether a sequence is an **AP** and find its **common difference** $d$', 'Write the **general term** $T_n$ and find any term', 'Find **which term** a number is, and **how many terms** an AP has', 'Find an AP from **two conditions**; handle **three terms in AP**'], n: 'These are your goals for part one. First we see what makes a sequence an arithmetic progression. Then we build a formula for any term. We use it to find term numbers and to count terms, and finally we find a whole progression from two facts about it.' }),
    sl('concept', 'What is an arithmetic progression?', { b: 'A **sequence** is a list of numbers in order: $T_1, T_2, T_3, \\ldots$ It is an **AP** if every term after the first is the term before it plus a fixed number $d$, the **common difference**.', v: tWhat, m: [r`T_{n+1} - T_n = d \text{ for every } n`], n: 'A sequence is simply a list of numbers in a definite order. It is an arithmetic progression when you always add the same number to get from one term to the next. That fixed number is the common difference. The table checks four sequences. Three of them have the same difference every time. The last does not, so it is not an arithmetic progression.' }),
    sl('concept', 'The common difference', { b: 'Find $d$ as **a term minus the term before it**: $d = T_2 - T_1$. It can be positive (rising terms), negative (falling terms), zero (constant terms), or a fraction or decimal.', v: pD, n: 'To find the common difference, always take a term minus the one before it, never the other way round. If the difference is positive, the terms rise; if it is negative, they fall; if it is zero, every term is the same. The graph shows one progression rising by three and a half, and another falling by two and a half.' }),
    sl('example', 'Worked example 1: is it an AP?', { b: 'Which of these are APs? (i) $11, 17, 23, 29$ (ii) $2, 6, 18, 54$ (iii) $-1.5, -4, -6.5, -9$ (iv) $1, 4, 9, 16$', ul: ['**Step 1 —** work out every difference, later term minus earlier term (table).', `**Step 2 —** in (iii): ${wWE1.md[0]}, the same each time.`, '**Answer —** (i) is an AP with $d = 6$ and (iii) with $d = -2.5$; (ii) and (iv) are not APs.'], v: tWE1, n: 'Work out every difference, not just the first one. In list one each step adds six. In list two the steps are four, twelve and thirty six, so it is not an arithmetic progression. In list three each step subtracts two and a half. In list four the steps are three, five and seven, so the differences change.' }),
    sl('check', 'Quick check: the common difference', { b: 'Subtract each term from the one after it.', chk: 'm02', n: 'Take the second term minus the first term. Be careful with the minus signs.' }),
    sl('concept', 'The general term', { b: 'Start at $a$ and add $d$ once for each step. To reach the $n$th term you take $n - 1$ steps, so the **general term** (the $n$th term) is', v: tGen, m: [r`T_n = a + (n - 1)d`], n: 'Here is the key formula. The first term is a. The second is a plus d, the third is a plus two d, and so on. To reach the nth term you take one step fewer than n, so the nth term is a plus n minus one, times d. Some books write it as t n or a n; in this course we write capital T n.' }),
    sl('example', 'Worked example 2: the nth term', { b: 'For the AP $13, 8, 3, \\ldots$ write the general term and find the $18$th term.', ul: [`**Step 1 —** $a = 13$ and ${w2.md[0]}.`, `**Step 2 —** ${w2.md[1]}.`, `**Step 3 —** ${w2.md[2]}.`, `**Check —** ${w2.md[3]}, the third term.`], v: p2, n: 'The first term is thirteen and each step subtracts five, so the common difference is minus five. Substituting, the nth term simplifies to eighteen minus five n. Put n equal to eighteen to get minus seventy two. A quick check: n equal to three gives three, which is the third term.' }),
    sl('example', 'Worked example 3: which term is it?', { b: 'In the AP $4.5, 7, 9.5, \\ldots$ which term is $57$? Is $60$ a term?', ul: [`**Step 1 —** $a = 4.5$, $d = 2.5$. ${w3.md[0]}: $57$ is the $22$nd term.`, `**Step 2 —** ${w3b.md[0]}.`, '**Answer —** $n = 23.2$ is not a whole number, so $60$ is **not** a term.'], v: fWhich, n: 'Put the formula for the nth term equal to the given number and solve for n. For fifty seven we get n equals twenty two, a whole number, so fifty seven is the twenty second term. For sixty, n minus one is twenty two point two, so n is not a whole number, and sixty is not a term at all.' }),
    sl('check', 'Quick check: a far-away term', { b: 'Use $T_n = a + (n - 1)d$.', chk: 'n01', n: 'Find the first term and the common difference, then take fifteen steps from the first term.' }),
    sl('concept', 'Counting terms; terms from the end', { b: 'For a finite AP with last term $l$: solve $a + (n - 1)d = l$ to count the terms. Read backwards, the AP starts at $l$ with common difference $-d$, so the $m$th term from the end is $l - (m - 1)d$.', v: tEnd, m: [r`m\text{th term from the end} = l - (m - 1)d`], n: 'A finite progression stops at a last term, usually called l. To count its terms, find which term l is. To find a term counted from the end, turn the progression round: it now starts at l and goes down by d each step. So the mth term from the end is l minus m minus one, times d.' }),
    sl('example', 'Worked example 4: counting terms', { b: 'How many terms does the AP $9, 16, 23, \\ldots, 352$ have? Find its $10$th term from the end.', ul: [`**Step 1 —** $a = 9$, $d = 7$: ${w4.md[0]}.`, `**Step 2 —** from the end: ${w4b.md[0]}.`, `**Check —** it is the $41$st term from the start: ${w4c.md[0]}.`, '**Answer —** $50$ terms; the $10$th term from the end is $289$.'], v: p4, n: 'Solve nine plus n minus one times seven equals three hundred and fifty two. That gives n equals fifty. For the tenth term from the end, start at three hundred and fifty two and take nine steps down of seven, giving two hundred and eighty nine. As a check, it is the forty first term from the start.' }),
    sl('example', 'Worked example 5: an AP from two terms', { b: 'The $5$th term of an AP is $31$ and the $14$th term is $-5$. Find the AP and its $30$th term.', ul: [`**Step 1 —** ${w5.md[0]}, so ${w5.md[1]}.`, `**Step 2 —** ${w5.md[2]}: the AP is $47, 43, 39, \\ldots$`, `**Step 3 —** ${w5.md[3]}.`], v: p5, n: 'Write both terms in terms of a and d and subtract. Between the fifth and fourteenth terms there are nine steps, and the value falls by thirty six, so d is minus four. Going back four steps from thirty one gives the first term, forty seven. The thirtieth term is then minus sixty nine.' }),
    sl('check', 'Quick check: which term?', { b: 'Solve $a + (n - 1)d = 171$.', chk: 'm05', n: 'Subtract the first term, divide by the common difference, and remember to add one.' }),
    sl('concept', 'Three terms in AP', { b: 'Three unknown terms in AP are best written $a - d$, $a$, $a + d$: their sum is simply $3a$. Three numbers $a$, $b$, $c$ are in AP exactly when the middle one is the average of the others: $2b = a + c$.', v: tThree, m: [r`2b = a + c`], n: 'When a question is about three numbers in arithmetic progression, call them a minus d, a and a plus d. The d cancels in the sum, so the sum gives a at once. And three numbers are in arithmetic progression exactly when twice the middle one equals the sum of the outer two.' }),
    sl('example', 'Worked example 6: three numbers', { b: 'Three numbers in AP have sum $36$ and product $1428$. Find them.', ul: [`**Step 1 —** take $a - d$, $a$, $a + d$: ${w6a.md[0]}.`, `**Step 2 —** ${w6.md[0]}.`, `**Step 3 —** ${w6.md[1]}.`, '**Answer —** the numbers are $7, 12, 17$ (with $d = -5$, the same numbers in reverse order).'], v: b6, n: 'Write the numbers as a minus d, a and a plus d. Their sum is three a, which is thirty six, so a is twelve. The product becomes twelve times one hundred and forty four minus d squared. That equals one thousand four hundred and twenty eight, so d squared is twenty five, and the numbers are seven, twelve and seventeen.' }),
    sl('example', 'Worked example 7: a stack of chairs', { b: 'One imagined plastic chair is $82$ cm tall, and each extra chair stacked on it adds $4$ cm. (a) How tall is a stack of $15$ chairs? (b) How many chairs make a stack $150$ cm tall?', ul: ['**Step 1 —** heights $82, 86, 90, \\ldots$ form an AP with $a = 82$, $d = 4$.', `**(a) —** ${w7.md[0]} cm.`, `**(b) —** ${w7b.md[0]}: $18$ chairs.`], v: p7, n: 'The heights of the stacks go up by four centimetres for each extra chair, so they form an arithmetic progression starting at eighty two. Fifteen chairs give the fifteenth term, one hundred and thirty eight centimetres. For one hundred and fifty centimetres, solve for n: eighteen chairs.' }),
    sl('check', 'Quick check: true or false?', { b: 'Think about what happens to each difference.', chk: 'tf1', n: 'If you subtract the same number from two neighbouring terms, what happens to their difference?' }),
    sl('summary', 'Summary', { ul: ['AP: each term $=$ previous term $+ d$; $d = T_2 - T_1$', '$T_n = a + (n - 1)d$', 'Which term or how many terms: solve $a + (n - 1)d = $ value; $n$ must be a positive whole number', '$m$th term from the end $= l - (m - 1)d$', 'Three terms: $a - d$, $a$, $a + d$; or $2b = a + c$'], v: sum1, n: 'To sum up part one. In an arithmetic progression you add the same common difference each time. The nth term is a plus n minus one, times d. To find which term a number is, solve for n and check that it is a positive whole number. Count from the end by turning the progression round. And take three terms as a minus d, a and a plus d.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Find a term (2 marks):** $a$ and $d$ identified 1 + correct term 1', '**Which term / is it a term (2–3 marks):** equation 1 + solving 1 + conclusion 1', '**AP from two conditions (3–4 marks):** each equation 1 + solving + the AP', '**Mistake:** $d = T_1 - T_2$ (wrong order) gives the wrong sign', '**Mistake:** using $a + nd$ for the $n$th term', '**Mistake:** forgetting that $n$ must be a positive whole number'], n: 'Always write a and d first: that usually earns the first mark. Show the equation when you find a term number, and state your conclusion in words. Watch the order when you subtract: a term minus the one before. Use n minus one, not n, in the formula. And a term number must be a positive whole number.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Arithmetic Progression — Part 2: Sum of the first n terms and applications',
  goals: ['Find the sum of the first n terms of an AP with either form of the sum formula', 'Find the number of terms when the sum is given', 'Find terms from a rule for the sum, and the sum of a block of terms', 'Solve real-life problems such as savings and instalments that change by a fixed amount'],
  slides: [
    sl('title', 'Arithmetic Progression, Part 2', { b: 'Add the terms of an AP one after another and the running totals grow faster and faster. One formula gives any total at once.', v: pT2, n: 'Welcome to part two. Here we add the terms of an arithmetic progression. The running totals of four, seven, ten, thirteen and so on are four, eleven, twenty one, thirty four, and they grow faster and faster. You will learn a formula that gives any total at once, and use it in real problems.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find $S_n$, the **sum of the first $n$ terms**, in two ways', 'Find **how many terms** give a given sum', 'Get **terms from sums**, and add a **block of terms**', 'Solve **savings and instalment** problems'], n: 'These are your goals for part two. We derive the sum formula and use both of its forms. Then we work backwards from a sum to the number of terms, find terms from a rule for the sum, and finally solve everyday problems about savings and instalments.' }),
    sl('concept', 'Adding by pairing', { b: 'Write the sum forwards and backwards and add: every column gives first term $+$ last term. With $n$ columns, $2S_n = n(a + l)$.', v: tPair, m: [r`S_n = \dfrac{n}{2}(a + l)`], n: 'Here is a neat trick. Write the sum forwards, then backwards underneath, and add the columns. Each column adds up to the same total, the first term plus the last. With six columns, twice the sum is six times twenty three. So the sum is half of that, sixty nine. In general, the sum is n over two, times the first term plus the last term.' }),
    sl('concept', 'The sum formula in two forms', { b: 'Since $l = a + (n - 1)d$, the pairing formula can be written without $l$:', v: fForm, m: [r`S_n = \dfrac{n}{2}[2a + (n - 1)d] = \dfrac{n}{2}(a + l)`], n: 'The last term is a plus n minus one times d. Put that into the pairing formula and you get the first form: n over two, times two a plus n minus one times d. Use it when you know a, d and n. Use the second form, n over two times a plus l, when you know the first and last terms.' }),
    sl('example', 'Worked example 1: a direct sum', { b: 'Find the sum of the first $16$ terms of the AP $40, 36, 32, \\ldots$', ul: [`**Step 1 —** $a = 40$, $d = -4$, $n = 16$.`, `**Step 2 —** ${w21.md[0]}.`, `**Check —** ${w21.md[1]}, and ${w21.md[2]}.`], v: b21, n: 'Here a is forty, d is minus four and n is sixteen. Two a is eighty, and fifteen times minus four is minus sixty, so the bracket is twenty. Eight times twenty is one hundred and sixty. The bar chart shows why the sum is small: the last few terms are negative and cancel part of the total.' }),
    sl('example', 'Worked example 2: first and last terms', { b: 'Find $-8 - 3 + 2 + 7 + \\cdots + 112$.', ul: [`**Step 1 —** $a = -8$, $d = 5$, $l = 112$. Number of terms: ${w22.md[0]}.`, `**Step 2 —** ${w22.md[1]}.`, '**Answer —** the sum is $1300$.'], v: p22, n: 'The common difference is five and the last term is one hundred and twelve. First count the terms: n is twenty five. Now the second form is quickest: twenty five over two, times minus eight plus one hundred and twelve, which is twelve and a half times one hundred and four, or one thousand three hundred.' }),
    sl('check', 'Quick check: which formula?', { b: 'Think of pairing first and last terms.', chk: 'm15', n: 'Each pair adds up to the first term plus the last term. How many pairs are there?' }),
    sl('concept', 'Finding n when the sum is given', { b: 'Put the sum formula equal to the given sum. This gives a **quadratic in $n$**; keep only roots that are positive whole numbers.', v: fN, n: 'Sometimes the sum is given and you must find how many terms were added. Put the sum formula equal to the given sum. Because the formula has n times a bracket containing n, you get a quadratic. Solve it, and keep only roots that are positive whole numbers. Then check by working out the sum.' }),
    sl('example', 'Worked example 3: how many terms?', { b: 'How many terms of the AP $25, 22, 19, \\ldots$ must be taken so that their sum is $116$?', ul: [`**Step 1 —** ${w23.md[0]}.`, `**Step 2 —** ${w23.md[1]}.`, `**Step 3 —** ${w23.md[2]}.`, `**Answer —** $n$ must be a whole number, so $n = 8$. Check: ${w23c.md[0]}.`], v: p23, n: 'Write the sum with a equal to twenty five and d equal to minus three, and set it equal to one hundred and sixteen. That gives a quadratic, which factorises. The roots are eight and twenty nine thirds. A number of terms must be a whole number, so the answer is eight. The graph shows the sum reaching one hundred and sixteen at n equals eight.' }),
    sl('check', 'Quick check: a sum', { b: 'Use $S_n = \\dfrac{n}{2}[2a + (n - 1)d]$.', chk: 'n04', n: 'Find the common difference first, then substitute into the first form of the sum formula.' }),
    sl('example', 'Worked example 4: a block of terms', { b: 'Find the sum of the terms from the $11$th to the $30$th of the AP $6, 11, 16, \\ldots$', ul: [`**Way 1 —** ${w24.md[0]} and ${w24.md[1]}, so ${w24.md[2]}.`, `**Way 2 —** there are $20$ terms; ${w24.md[3]} and ${w24.md[4]}, so the sum is ${w24.md[5]}.`, '**Answer —** $2070$, by both methods.'], v: b24, n: 'There are two good ways. Subtract the sum of the first ten terms from the sum of the first thirty. Or treat the block as its own progression of twenty terms, from the eleventh term, fifty six, to the thirtieth, one hundred and fifty one, and use the pairing formula. Both give two thousand and seventy.' }),
    sl('concept', 'From the sum back to the terms', { b: 'If a rule for $S_n$ is given: $T_1 = S_1$, and for $n \\ge 2$ the $n$th term is what the $n$th addition contributes.', v: tSn, m: [r`T_n = S_n - S_{n-1}`], n: 'Sometimes you are given a rule for the sum instead of the terms. The first term is just the first sum. After that, each term is the difference between consecutive sums, because the nth sum is the previous sum plus the nth term. For the rule seven n minus n squared, the terms are six, four, two, zero and so on.' }),
    sl('check', 'Quick check: true or false?', { b: 'Try a simple AP such as $1, 2, 3, 4$.', chk: 'tf4', n: 'Add the first two terms, then the first four terms. Did the sum double?' }),
    sl('example', 'Worked example 5: repaying a loan', { b: 'Harpreet, who runs an imagined tailoring shop in Amritsar, repays an interest-free loan of ₹$30{,}000$ in monthly instalments: ₹$750$ in the first month and ₹$150$ more each month. How many instalments does she pay, and what is the last one?', ul: [`**Step 1 —** $a = 750$, $d = 150$: ${w25.md[0]}.`, `**Step 2 —** ${w25.md[1]}.`, `**Step 3 —** $n = 16$ instalments; ${w25b.md[0]}.`, `**Check —** ${w25b.md[1]}.`], v: b25, n: 'The instalments form an arithmetic progression with first term seven hundred and fifty and common difference one hundred and fifty. Their sum must be thirty thousand. That gives a quadratic, which factorises with roots sixteen and minus twenty five. So she pays sixteen instalments, and the last is three thousand rupees.' }),
    sl('example', 'Worked example 6: a rolling trolley', { b: 'An imagined trolley rolling down a ramp travels $4$ cm in the first second, $12$ cm in the second, $20$ cm in the third, and so on. (a) How far does it travel in the $10$th second? (b) How far does it travel in the first $10$ seconds?', ul: ['**Step 1 —** distances in each second form an AP with $a = 4$, $d = 8$.', `**(a) —** ${w26.md[0]} cm.`, `**(b) —** ${w26.md[1]} cm.`], v: p26, n: 'The distances covered in each second go up by eight centimetres, so they form an arithmetic progression. In the tenth second the trolley covers seventy six centimetres. In the first ten seconds altogether it covers four hundred centimetres. The graph shows the total distance growing like four times the square of the time.' }),
    sl('concept', 'Choosing the right formula', { b: 'Read what is **given** and what is **asked**, then choose:', v: tChoose, n: 'In the exam, first write down what you are given and what you are asked. A single term needs the nth term formula. A sum needs one of the two sum formulas. If the sum is given and n is wanted, expect a quadratic. And if you are given a rule for the sum, subtract consecutive sums to get the terms.' }),
    sl('check', 'Quick check: an application', { b: 'Identify $a$, $d$ and $n$ first.', chk: 'm16', n: 'Which day is it, and how many steps of the common difference is that from the first day?' }),
    sl('summary', 'Summary', { ul: ['$S_n = \\dfrac{n}{2}[2a + (n - 1)d] = \\dfrac{n}{2}(a + l)$', '$n$ from a sum: quadratic; keep positive whole numbers', 'Block of terms: $S_n - S_m$', '$T_1 = S_1$, $T_n = S_n - S_{n-1}$', 'Applications: identify $a$, $d$, $n$ and the units'], v: sum2, n: 'To sum up part two. The sum of the first n terms has two forms, one with d and one with the last term. If the sum is given, solve a quadratic for n. A block of terms is a difference of two sums. Terms come from sums by subtraction. And in applications, identify a, d and n carefully.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Sum of n terms (2 marks):** correct form with $a$, $d$, $n$ 1 + value 1', '**Number of terms from a sum (3–4 marks):** equation 1 + quadratic 1 + roots 1 + rejecting a root with a reason 1', '**Application (10-mark part):** $a$, $d$ identified + formula + answer with units', '**Mistake:** $(n - 1)$ replaced by $n$ in the sum formula', '**Mistake:** forgetting to halve: $\\dfrac{n}{2}$, not $n$', '**Mistake:** keeping a negative or fractional value of $n$'], n: 'Write the formula before substituting: the method mark is for the correct form. When n is unknown, show the quadratic and both roots, then say why you reject one. In word problems state a and d in words, and give units in the answer. Common slips are using n instead of n minus one, and forgetting to halve.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch09', version: 1, title: 'Arithmetic Progression — chapter notes', language: 'en',
  sections: [
    { heading: '1. Sequences and arithmetic progressions', body_md: r`- A **sequence** is a list of numbers in a definite order: $T_1, T_2, T_3, \ldots$ ($T_n$ is the $n$th term).
- An **arithmetic progression (AP)** is a sequence in which each term after the first is obtained by adding a fixed number $d$, the **common difference**, to the term before it.
- $d = T_2 - T_1 = T_3 - T_2 = \cdots$: always a term **minus the one before it**.
- $d > 0$: rising terms; $d < 0$: falling terms; $d = 0$: all terms equal.
- To test a list, work out **every** difference; one equal pair is not enough.

*Example:* $-1.5, -4, -6.5, -9$ is an AP with $d = -2.5$; $2, 6, 18, 54$ is not an AP (differences $4, 12, 36$).`, key_terms: [{ term: 'Arithmetic progression', definition_md: 'A sequence in which every term after the first is the previous term plus a fixed number $d$.' }, { term: 'Common difference', definition_md: '$d = T_{n+1} - T_n$, the same for every $n$.' }], formulas: [{ latex: 'd = T_{n+1} - T_n', label: 'Common difference' }], visual: tWhat, visuals: [pD], topic_ids: [topic(1)] },
    { heading: '2. The general (nth) term', body_md: r`Starting from the first term $a$, you add $d$ once for each step; the $n$th term is $n - 1$ steps after the first:

$$T_n = a + (n - 1)d$$

- $T_n$ is a linear expression in $n$: $T_n = dn + (a - d)$. Conversely, if $T_n = pn + q$, the sequence is an AP with $d = p$.
- Some books write $t_n$ or $a_n$ for the $n$th term.

*Example:* for $13, 8, 3, \ldots$: $T_n = 13 + (n - 1) \times (-5) = 18 - 5n$, so $T_{18} = -72$.`, key_terms: [{ term: 'General term', definition_md: 'The $n$th term $T_n = a + (n - 1)d$, a formula for any term.' }, { term: 'First term', definition_md: '$a = T_1$.' }], formulas: [{ latex: 'T_n = a + (n - 1)d', label: 'nth term' }], visual: tGen, visuals: [p2], topic_ids: [topic(1)] },
    { heading: '3. Which term? How many terms? Terms from the end', body_md: r`- **Is $v$ a term?** Solve $a + (n - 1)d = v$. It is a term only if $n$ is a **positive whole number**.
- **Number of terms** of a finite AP $a, \ldots, l$: solve $a + (n - 1)d = l$, i.e. $n = \dfrac{l - a}{d} + 1$.
- **From the end:** read backwards, the AP starts at $l$ with common difference $-d$, so the $m$th term from the end is $l - (m - 1)d$; it is also the $(n - m + 1)$th term from the start.

*Example:* $9, 16, \ldots, 352$ has $n = 50$ terms; the $10$th term from the end is $352 - 9 \times 7 = 289$, the $41$st term.`, key_terms: [{ term: 'Finite AP', definition_md: 'An AP with a last term $l$ and a definite number of terms $n$.' }, { term: 'Term from the end', definition_md: 'The $m$th term from the end is $l - (m - 1)d$.' }], formulas: [{ latex: 'n = \\dfrac{l - a}{d} + 1', label: 'Number of terms' }, { latex: 'l - (m - 1)d', label: 'mth term from the end' }], visual: fWhich, visuals: [tEnd, p4], topic_ids: [topic(1)] },
    { heading: '4. Finding an AP from conditions; three terms in AP', body_md: r`- **Two terms given** ($T_p$ and $T_q$): $T_q - T_p = (q - p)d$ gives $d$; then $a = T_p - (p - 1)d$.
- **Two other conditions** (sums of terms, a term and a sum): write each in $a$ and $d$ and solve the two linear equations.
- **Three unknown terms in AP:** take $a - d$, $a$, $a + d$ (sum $3a$).
- **Condition for three terms:** $a$, $b$, $c$ are in AP exactly when $2b = a + c$ ($b$ is the average of $a$ and $c$).

*Example:* $T_5 = 31$, $T_{14} = -5$: $9d = -36$, $d = -4$, $a = 47$.`, key_terms: [{ term: 'Symmetric terms', definition_md: 'Writing three terms as $a - d$, $a$, $a + d$ so that $d$ cancels in their sum.' }], formulas: [{ latex: 'T_q - T_p = (q - p)d', label: 'Two terms' }, { latex: '2b = a + c', label: 'a, b, c in AP' }], visual: tThree, visuals: [p5, b6], topic_ids: [topic(1)] },
    { heading: '5. Sum of the first n terms', body_md: r`Writing $S_n$ forwards and backwards and adding gives $n$ columns, each equal to $a + l$:

$$S_n = \dfrac{n}{2}(a + l) = \dfrac{n}{2}[2a + (n - 1)d]$$

- Use $\dfrac{n}{2}[2a + (n - 1)d]$ when $a$, $d$, $n$ are known; use $\dfrac{n}{2}(a + l)$ when the first and last terms are known.
- If only $a$, $d$ and $l$ are known, find $n$ first.
- Sum of a block of terms: $T_{m+1} + \cdots + T_n = S_n - S_m$.

*Example:* $-8 - 3 + 2 + \cdots + 112$: $n = 25$, so the sum is $\dfrac{25}{2}(-8 + 112) = 1300$.`, key_terms: [{ term: 'Sum of n terms', definition_md: '$S_n = T_1 + T_2 + \\cdots + T_n$.' }, { term: 'Last term', definition_md: '$l = T_n = a + (n - 1)d$.' }], formulas: [{ latex: 'S_n = \\dfrac{n}{2}[2a + (n - 1)d]', label: 'Sum, first form' }, { latex: 'S_n = \\dfrac{n}{2}(a + l)', label: 'Sum, second form' }], visual: tPair, visuals: [fForm, pT2, b24], topic_ids: [topic(2)] },
    { heading: '6. Finding n from a sum; terms from a sum rule', body_md: r`- **n from a given sum:** $\dfrac{n}{2}[2a + (n - 1)d] = S$ is a quadratic in $n$. Solve it and keep only **positive whole-number** roots; if both roots are valid, check the terms (a root may need a zero or negative "term", which a real problem may not allow).
- **Terms from a rule for $S_n$:** $T_1 = S_1$, and $T_n = S_n - S_{n-1}$ for $n \ge 2$.

*Example:* $25, 22, 19, \ldots$ with sum $116$: $3n^2 - 53n + 232 = 0$, so $n = 8$ (the root $\dfrac{29}{3}$ is rejected).`, key_terms: [{ term: 'Rejecting a root', definition_md: 'Discarding a solution of the quadratic that is negative, a fraction, or meaningless in the problem.' }], formulas: [{ latex: 'T_n = S_n - S_{n-1}', label: 'Term from sums' }], visual: p23, visuals: [fN, tSn], topic_ids: [topic(2)] },
    { heading: '7. Applications', body_md: r`Quantities that change by a **fixed amount** each day, month, row or step form an AP: savings that grow by the same amount, instalments that rise or fall by the same amount, heights of stacks, temperatures on a climb, distances in successive seconds.

1. Identify $a$ (the first value), $d$ (the fixed change, with its sign) and what $n$ counts.
2. Decide whether a **term** (one value) or a **sum** (a total) is asked.
3. Watch the first term: if the first reading is at time $0$, the reading after $k$ steps is the $(k + 1)$th term.
4. Give the answer in words with units, and reject impossible values.

*Example:* a loan of ₹$30{,}000$ repaid by instalments $750, 900, 1050, \ldots$ needs $16$ instalments, the last being ₹$3{,}000$.`, key_terms: [{ term: 'Instalment', definition_md: 'One of a series of payments; here each differs from the previous one by a fixed amount.' }], formulas: [], visual: b25, visuals: [p7, p26, tChoose], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Find a term (2 marks):* $a$ and $d$ 1; term 1.
- *Is it a term / which term (2–3 marks):* equation 1; solving for $n$ 1; conclusion in words 1.
- *AP from two conditions (3–4 marks):* each equation 1; solving 1; the AP or the required term 1.
- *Sum (2–3 marks):* correct form of the formula 1; substitution and value 1–2.
- *Number of terms from a sum (4 marks):* equation 1; quadratic 1; roots 1; rejecting a root with a reason 1.
- *10-mark structured question:* parts (a), (b), (c), usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Finding $d$ as $T_1 - T_2$ instead of $T_2 - T_1$.
2. Using $a + nd$ for the $n$th term, or $(n - 1)$ replaced by $n$ in the sum formula.
3. Forgetting the $\dfrac{n}{2}$ (or halving twice).
4. Accepting a negative or fractional number of terms.
5. Miscounting terms: $\dfrac{l - a}{d}$ counts the steps; add $1$ for the terms.
6. In applications, mixing units (m and cm) or taking the reading at time $0$ as the first step.`,
  status: 'draft', provenance: d1.provenance,
};
// notes facts
S(apctx(ap2, { free: ['n'] }), [r`T_n = 13 + (n - 1) \times (-5) = 18 - 5n`], 'notes WE2');
S(apctx(back4), [r`352 - 9 \times 7 = 289`], 'notes from end');
S(solvectx(['a', 'd'], { a: ap5.a, d: ap5.d }), [r`9d = -36`, r`d = -4`, r`a = 47`], 'notes two terms');
S(ARITH, [r`\dfrac{25}{2}(-8 + 112) = 1300`], 'notes sum example');
S(nctx(ap23, q23.roots), [r`3n^2 - 53n + 232 = 0`], 'notes n from sum');
must(new AP(-1.5, -2.5).list(4).map((t) => t.tex(true)).join() === '-1.5,-4,-6.5,-9' && diffs([2, 6, 18, 54]).map(String).join() === '4,12,36', 'notes section 1 example');
must(ap25.T(16).eq(3000) && ap25.nForSum(30000).join() === '16', 'notes section 7 example');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch09', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is an **arithmetic progression**?', 'A sequence in which each term after the first is the previous term plus a fixed number $d$.', 'definition', 1),
    fc('f02', 'How do you find the **common difference** $d$?', 'A term minus the one before it: $d = T_2 - T_1$.', 'definition', 1),
    fc('f03', 'Common difference of $30, 24, 18, \\ldots$?', '$d = 24 - 30 = -6$.', 'example', 1),
    fc('f04', 'Is $2, 6, 18, 54$ an AP?', 'No: the differences $4, 12, 36$ are not equal.', 'example', 1),
    fc('f05', 'Formula for the **$n$th term** of an AP?', '$T_n = a + (n - 1)d$.', 'formula', 1),
    fc('f06', 'Why $n - 1$ and not $n$ in $T_n = a + (n - 1)d$?', 'From the first term to the $n$th there are only $n - 1$ steps of $d$.', 'concept', 1),
    fc('f07', 'General term of $13, 8, 3, \\ldots$?', '$T_n = 18 - 5n$.', 'example', 1),
    fc('f08', 'If $T_n = pn + q$, what kind of sequence is it?', 'An AP with common difference $p$.', 'concept', 1),
    fc('f09', 'How do you test whether $v$ is a term of an AP?', 'Solve $a + (n - 1)d = v$; $v$ is a term only if $n$ is a positive whole number.', 'concept', 1),
    fc('f10', 'Is $60$ a term of $4.5, 7, 9.5, \\ldots$?', 'No: $n - 1 = 22.2$, not a whole number.', 'example', 1),
    fc('f11', 'Number of terms of an AP from $a$ to $l$?', '$n = \\dfrac{l - a}{d} + 1$.', 'formula', 1),
    fc('f12', 'The $m$th term from the end of an AP with last term $l$?', '$l - (m - 1)d$.', 'formula', 1),
    fc('f13', 'Two terms $T_p$ and $T_q$ are given. How do you get $d$?', '$T_q - T_p = (q - p)d$, so $d = \\dfrac{T_q - T_p}{q - p}$.', 'concept', 1),
    fc('f14', 'How do you write **three unknown terms** in AP?', '$a - d$, $a$, $a + d$: their sum is $3a$.', 'exam-tip', 1),
    fc('f15', 'Condition for $a$, $b$, $c$ to be in AP?', '$2b = a + c$: the middle term is the average of the other two.', 'formula', 1),
    fc('f16', 'Three numbers in AP: sum $36$, product $1428$?', '$7, 12, 17$.', 'example', 1),
    fc('f17', 'On a graph of $T_n$ against $n$, what do the terms of an AP look like?', 'Points on a straight line whose slope is $d$.', 'diagram', 1),
    fc('f18', 'Sum of the first $n$ terms, using $a$ and $d$?', '$S_n = \\dfrac{n}{2}[2a + (n - 1)d]$.', 'formula', 2),
    fc('f19', 'Sum of the first $n$ terms, using the first and last terms?', '$S_n = \\dfrac{n}{2}(a + l)$.', 'formula', 2),
    fc('f20', 'Where does $S_n = \\dfrac{n}{2}(a + l)$ come from?', 'Write the sum forwards and backwards: each of the $n$ columns adds to $a + l$, so $2S_n = n(a + l)$.', 'concept', 2),
    fc('f21', 'Sum of the first $16$ terms of $40, 36, 32, \\ldots$?', '$S_{16} = 8 \\times 20 = 160$.', 'example', 2),
    fc('f22', 'The sum is given and $n$ is unknown. What do you get?', 'A quadratic in $n$; keep only positive whole-number roots.', 'concept', 2),
    fc('f23', 'How many terms of $25, 22, 19, \\ldots$ give $116$?', '$8$ (the root $\\dfrac{29}{3}$ is rejected).', 'example', 2),
    fc('f24', 'How do you get $T_n$ from a rule for $S_n$?', '$T_1 = S_1$ and $T_n = S_n - S_{n-1}$ for $n \\ge 2$.', 'formula', 2),
    fc('f25', 'Sum of the terms from the $11$th to the $30$th?', '$S_{30} - S_{10}$, or $\\dfrac{20}{2}(T_{11} + T_{30})$.', 'exam-tip', 2),
    fc('f26', 'In a word problem, what three things do you identify first?', 'The first value $a$, the fixed change $d$ (with its sign) and what $n$ counts.', 'exam-tip', 3),
    fc('f27', 'Loan ₹$30{,}000$ repaid by instalments $750, 900, 1050, \\ldots$: how many?', '$16$ instalments; the last is ₹$3{,}000$.', 'example', 3),
    fc('f28', 'A reading taken at time $0$ is the first term. Which term is the reading after $k$ steps?', 'The $(k + 1)$th term.', 'exam-tip', 3),
    fc('f29', 'Both roots of the quadratic for $n$ are positive. What should you check?', 'Whether the terms up to the larger $n$ make sense (for example, a negative instalment is impossible).', 'exam-tip', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};
// flashcard facts
S(apctx(new AP(30, -6)), [r`d = 24 - 30 = -6`], 'f03');
must(!isAP([2, 6, 18, 54]) && ap3.indexOf(60) === null && total([7, 12, 17]).eq(36) && 7 * 12 * 17 === 1428, 'f04 f10 f16');
must(ap21.S(16).eq(160) && ap23.nForSum(116).join() === '8' && ap25.T(16).eq(3000), 'f21 f23 f27');
S(apctx(ap21), [r`S_{16} = 8 \times 20 = 160`], 'f21 line');
S(apctx(ap24), [r`S_{30} - S_{10} = \dfrac{20}{2}(T_{11} + T_{30})`], 'f25 identity');

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch09', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: {
    syllabus: 'topics t01–t03 only (AP: common difference and the general term, which term / number of terms / terms from the end, an AP from two conditions, three terms in AP; sum of the first n terms in both forms, n from a given sum, terms from a sum rule, sums of blocks of terms; simple applications: savings, instalments, stacking, temperatures, distances). The syllabus lists no removed topics for this chapter. Geometric progressions are left to chapter 10.',
    progressions: 'every term is computed by exact fraction arithmetic both by the formula a + (n − 1)d and by listing the sequence; every sum by n/2[2a + (n − 1)d], by n/2(a + l) and by adding the listed terms; "which term" by exact solving, confirmed by listing; n from a sum by the exact quadratic (both rational roots) and by searching the partial sums; a and d from two conditions by exact elimination and substituted back; counting problems (multiples in a range) also by brute force',
    working_lines: 'every equation typed in a worked example, note, flashcard or model answer is parsed from its TeX by an exact parser (fractions, brackets, decimals, subscripted T and S with their values from the AP): numeric sides must be equal exactly, identities in n must agree at nine points, and an equation in an unknown must hold at the verified solution(s); "or" alternatives must cover every root; inequalities and "not equal" claims are checked',
  } },
};
const tests = chapterTests('Arithmetic Progression', {
  A: ['m01', 'm06', 'm10', 'ar1', 's301', 's303'],
  B: ['l01', 'l04'],
}, {
  A: ['m03', 'm07', 'm08', 'm12', 'm13', 'm17', 'ar3', 'ar4', 's401', 's402', 's404'],
  B: ['l03', 'l05', 'l07'],
});
build({ dir: DIR, release, testsSpec: tests });

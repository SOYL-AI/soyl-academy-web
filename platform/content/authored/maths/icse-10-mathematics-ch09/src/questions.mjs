// ICSE 10 Mathematics ch09 Arithmetic Progression — practice bank with independent re-solve checks.
// Keys and option values are typed as literals; each check recomputes them with ap.mjs (exact fractions):
// every term by the formula AND by listing the sequence, every sum by both sum formulas AND by adding the
// listed terms, every "which term" by exact solving confirmed by listing, every n from a sum by the exact
// quadratic AND by searching the partial sums, every a and d from two conditions by exact elimination.
// Every typed working line in a solution or model answer is parsed and checked by work.mjs, and MCQ
// distractors are recomputed from the slip they represent.
import { Q, mk, r } from './lib.mjs';
import { AP, F, Fr, fromTerms, isAP, diffs, total, quadRoots } from './ap.mjs';
import { steps, apctx, solvectx, ARITH, eqctx, texVal, checkLine } from './work.mjs';

const J = (lines) => lines.join('\n\n');
const W = (ctx, lines) => steps(ctx, lines);
const N = (x) => Fr.of(x).num();
/** Context for an AP with the unknown n and its verified values. */
const nctx = (ap, ns) => apctx(ap, { free: ['n'], sols: ns.map((n) => ({ n: Fr.of(n) })) });
/** a and d unknown, with the solved AP. */
const adctx = (ap) => solvectx(['a', 'd'], { a: ap.a, d: ap.d });
/** Every listed integer from lo to hi with the property, by brute force (independent of the AP formulas). */
const range = (lo, hi, ok) => { const out = []; for (let x = lo; x <= hi; x++) if (ok(x)) out.push(x); return out; };

// =============================================================== MCQ
const l01 = [[2.4, 3.1, 3.8, 4.5], [3, 6, 12, 24], [1, 4, 9, 16], [10, 8, 5, 1]];
const w01 = W(ARITH, [r`3.1 - 2.4 = 3.8 - 3.1 = 4.5 - 3.8 = 0.7`]);
Q('m01', mk.mcq({ stem: r`Only one of these sequences has the same difference between every pair of consecutive terms. Which one is an arithmetic progression?`, opts: l01.map((l) => `$${l.join(', ')}$`), key: 'a', sol: `In (a) each term is $0.7$ more than the one before: ${w01.md[0]}. In (b) the differences are $3, 6, 12$; in (c) they are $3, 5, 7$; in (d) they are $-2, -3, -4$. None of these is constant.`, d: 1, c: 'understanding', t: [1], time: 60 }), (C) => { w01.verify(C); C.assert(diffs(l01[1]).map(String).join() === '3,6,12' && diffs(l01[2]).map(String).join() === '3,5,7' && diffs(l01[3]).map(String).join() === '-2,-3,-4', 'differences of (b), (c), (d)'); C.which(l01.map((l) => (isAP(l) ? 'ap' : 'no')), 'ap'); });

const a02 = new AP(-7, 3.5);
const w02 = W(apctx(a02), [r`d = T_2 - T_1 = -3.5 - (-7) = 3.5`]);
Q('m02', mk.mcq({ stem: r`What is the common difference of the AP $-7, -3.5, 0, 3.5, \ldots$?`, opts: ['$3.5$', '$-3.5$', '$-10.5$', '$7$'], key: 'a', sol: `${w02.md[0]}. Option (b) subtracts the wrong way round, (c) adds the first two terms, and (d) is the difference between alternate terms.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => { w02.verify(C); C.assert(a02.list(4).map(String).join() === '-7,-7/2,0,7/2', 'listed terms'); C.assert(F(-7).sub(-3.5).eq(-3.5) && F(-7).add(-3.5).eq(-10.5) && a02.T(3).sub(a02.T(1)).eq(7), 'distractors'); C.which([3.5, -3.5, -10.5, 7], N(a02.d)); });

const a03 = new AP(9, -3.5);
const w03 = W(apctx(a03), [r`d = 5.5 - 9 = -3.5`, r`T_{21} = 9 + 20 \times (-3.5) = 9 - 70 = -61`]);
Q('m03', mk.mcq({ stem: r`The $21$st term of the AP $9, 5.5, 2, \ldots$ is`, opts: ['$-61$', '$-64.5$', '$79$', '$-57.5$'], key: 'a', sol: `$a = 9$ and ${w03.md[0]}, so ${w03.md[1]}. Option (b) uses $21d$ instead of $20d$, (c) uses $d = +3.5$, and (d) is the $20$th term.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { w03.verify(C); C.assert(a03.a.add(a03.d.mul(21)).eq(-64.5) && new AP(9, 3.5).T(21).eq(79) && a03.T(20).eq(-57.5), 'distractors'); C.which([-61, -64.5, 79, -57.5], N(a03.T(21))); });

const a04 = new AP(5, 7), o04 = ['7n - 2', '5n + 7', '7n + 5', '5n + 2'];
const w04 = W(apctx(a04, { free: ['n'] }), [r`T_n = a + (n - 1)d = 5 + (n - 1) \times 7 = 7n - 2`, r`T_1 = 7 - 2 = 5`]);
Q('m04', mk.mcq({ stem: r`Which expression gives the $n$th term of the AP $5, 12, 19, 26, \ldots$?`, opts: o04.map((t) => `$${t}$`), key: 'a', sol: `${w04.md[0]}. Check: ${w04.md[1]}. Option (c) is $a + nd$, which would make the first term $12$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { w04.verify(C); C.assert(texVal('7n + 5', { n: 1 }).eq(12), '(c) gives 12 first'); C.which(o04.map((t) => ([1, 2, 3, 4].every((k) => texVal(t, { n: k }).eq(a04.T(k))) ? 'yes' : 'no')), 'yes'); });

const a05 = new AP(15, 6);
const w05 = W(nctx(a05, [27]), [r`15 + (n - 1) \times 6 = 171 \Rightarrow (n - 1) \times 6 = 156 \Rightarrow n - 1 = 26 \Rightarrow n = 27`]);
Q('m05', mk.mcq({ stem: r`Starting from $15$ and adding $6$ each time gives the AP $15, 21, 27, \ldots$ In which position does $171$ appear?`, opts: ['the $27$th', 'the $26$th', 'the $28$th', 'the $25$th'], key: 'a', sol: `${w05.md[0]}. Option (b) forgets to add $1$: $n - 1$ counts the steps from the first term, not the terms.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { w05.verify(C); C.which([27, 26, 28, 25], a05.indexOf(171)); });

const a06 = new AP(101, -4);
const w06 = W(nctx(a06, [33]), [r`101 + (n - 1) \times (-4) = -27 \Rightarrow (n - 1) \times (-4) = -128 \Rightarrow n - 1 = 32 \Rightarrow n = 33`]);
Q('m06', mk.mcq({ stem: r`How many terms are there in the AP $101, 97, 93, \ldots, -27$?`, opts: ['$33$', '$32$', '$34$', '$31$'], key: 'a', sol: `$d = -4$. If $-27$ is the $n$th term, ${w06.md[0]}. Option (b) counts the steps between the first and last terms, not the terms.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { w06.verify(C); C.which([33, 32, 34, 31], a06.count(-27)); });

const a07 = fromTerms(4, -2, 9, 18);
const w07 = W(adctx(a07), [r`T_9 - T_4 = (a + 8d) - (a + 3d) = 5d`, r`5d = 18 - (-2) = 20 \Rightarrow d = 4`]);
Q('m07', mk.mcq({ stem: r`In an AP, $T_4 = -2$ and $T_9 = 18$. What is the common difference?`, opts: ['$4$', '$3.2$', '$5$', '$-4$'], key: 'a', sol: `${w07.md[0]}, so ${w07.md[1]}. Option (b) uses $18 - 2$ instead of $18 - (-2)$, and (c) divides by $4$ instead of $5$.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { w07.verify(C); C.assert(F(16, 5).eq(3.2) && F(20, 4).eq(5), 'distractors'); C.which([4, 3.2, 5, -4], N(a07.d)); });

const a08 = new AP(3, 7), n08 = a08.count(136), back08 = new AP(136, -7);
const w08 = W(apctx(back08), [r`136 + 5 \times (-7) = 136 - 35 = 101`]);
Q('m08', mk.mcq({ stem: r`What is the $6$th term from the end of the AP $3, 10, 17, \ldots, 136$?`, opts: ['$101$', '$94$', '$38$', '$108$'], key: 'a', sol: `Read the AP backwards: it starts at $l = 136$ and has common difference $-7$. So the $6$th term from the end is ${w08.md[0]}. Option (b) takes $6$ steps instead of $5$, and (c) is the $6$th term from the start.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { w08.verify(C); C.assert(n08 === 20 && a08.T(n08 - 6 + 1).eq(back08.T(6)), '6th from end = T15 = backwards T6'); C.assert(F(136 - 42).eq(94) && a08.T(6).eq(38), 'distractors'); C.which([101, 94, 38, 108], N(back08.T(6))); });

const a09 = new AP(2, 6);
const w09 = W(solvectx(['a', 'd'], { a: 8, d: 6 }), [r`(a - d) + a + (a + d) = 3a = 24`, r`a = 8`, r`8 + d = 14 \Rightarrow d = 6`, r`8 - 6 = 2`]);
Q('m09', mk.mcq({ stem: r`Three numbers in AP add up to $24$, and the largest of them is $14$. What is the smallest?`, opts: ['$2$', '$4$', '$6$', '$10$'], key: 'a', sol: `Take the numbers as $a - d$, $a$, $a + d$. Then ${w09.md[0]}, so ${w09.md[1]}. The largest gives ${w09.md[2]}, and the smallest is ${w09.md[3]}.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { w09.verify(C); const l = a09.list(3); C.assert(total(l).eq(24) && l[2].eq(14), 'list 2, 8, 14'); C.which([2, 4, 6, 10], N(l[0])); });

const a10 = new AP(-5, 4);
const w10 = W(apctx(a10), [r`S_{18} = \dfrac{18}{2}[2 \times (-5) + 17 \times 4] = 9 \times (-10 + 68) = 9 \times 58 = 522`]);
Q('m10', mk.mcq({ stem: r`What do the first $18$ terms of the AP $-5, -1, 3, \ldots$ add up to?`, opts: ['$522$', '$558$', '$1044$', '$261$'], key: 'a', sol: `$a = -5$, $d = 4$: ${w10.md[0]}. Option (b) uses $18d$ instead of $17d$, and (c) forgets to halve.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => { w10.verify(C); C.assert(F(9 * (-10 + 72)).eq(558) && a10.S(18).mul(2).eq(1044), 'distractors'); C.which([522, 558, 1044, 261], N(a10.S(18))); });

const a11 = new AP(12, 7), n11 = a11.count(145);
const w11 = W(nctx(a11, [20]), [r`12 + (n - 1) \times 7 = 145 \Rightarrow n - 1 = 19 \Rightarrow n = 20`, r`S_{20} = \dfrac{20}{2}(12 + 145) = 10 \times 157 = 1570`]);
Q('m11', mk.mcq({ stem: r`What is the value of $12 + 19 + 26 + \cdots + 145$?`, opts: ['$1570$', '$1491.5$', '$3140$', '$1413$'], key: 'a', sol: `$d = 7$. Number of terms: ${w11.md[0]}. So ${w11.md[1]}. Option (b) takes $n = 19$, the number of steps, and (c) forgets to halve.`, d: 2, c: 'application', t: [2], time: 90 }), (C) => { w11.verify(C); C.assert(n11 === 20 && F(19, 2).mul(157).eq(1491.5) && F(9 * 157).eq(1413), 'n and distractors'); C.which([1570, 1491.5, 3140, 1413], N(a11.S(n11))); });

const a12 = new AP(3, 8);
const w12 = W(apctx(a12), [r`T_1 = S_1 = 4 - 1 = 3`, r`S_2 = 16 - 2 = 14`, r`T_2 = S_2 - S_1 = 14 - 3 = 11`, r`d = T_2 - T_1 = 11 - 3 = 8`]);
Q('m12', mk.mcq({ stem: r`The sum of the first $n$ terms of an AP is given by $S_n = 4n^2 - n$. Find its common difference.`, opts: ['$8$', '$4$', '$3$', '$11$'], key: 'a', sol: `${w12.md[0]} and ${w12.md[1]}, so ${w12.md[2]}. Hence ${w12.md[3]}. Option (c) is $T_1$ and (d) is $T_2$.`, d: 3, c: 'analysis', t: [2], time: 90 }), (C) => { w12.verify(C); C.assert(!checkLine(r`S_n = 4n^2 - n`, apctx(a12, { free: ['n'] })).length, 'S_n = 4n^2 - n is the AP 3, 11, 19, …'); C.which([8, 4, 3, 11], N(a12.d)); });

const a13 = new AP(5, 3), q13 = a13.sumQuadratic(258);
const w13 = W(nctx(a13, q13.roots), [r`S_n = \dfrac{n}{2}[10 + (n - 1) \times 3] = \dfrac{n(3n + 7)}{2}`, r`\dfrac{n(3n + 7)}{2} = 258`, r`3n^2 + 7n - 516 = 0 \Rightarrow (n - 12)(3n + 43) = 0 \Rightarrow n = 12 \text{ or } n = -\dfrac{43}{3}`]);
Q('m13', mk.mcq({ stem: r`The terms of the AP $5, 8, 11, \ldots$ are added one after another. After how many terms does the running total reach exactly $258$?`, opts: ['$12$', '$11$', '$13$', '$14$'], key: 'a', sol: `${w13.md[0]}. Setting ${w13.md[1]}: ${w13.md[2]}. A number of terms cannot be negative, so $n = 12$.`, d: 3, c: 'application', t: [2], time: 120 }), (C) => { w13.verify(C); C.assert(q13.roots.map(String).join() === '-43/3,12', 'roots'); C.which([12, 11, 13, 14].map((n) => (a13.S(n).eq(258) ? 'yes' : 'no')), 'yes'); C.assert(a13.nForSum(258).join() === '12', 'search over partial sums'); });

const a14 = new AP(5, 5), n14 = a14.count(100);
const w14 = W(apctx(a14), [r`S_{20} = \dfrac{20}{2}(5 + 100) = 10 \times 105 = 1050`]);
Q('m14', mk.mcq({ stem: r`Adding every multiple of $5$ from $5$ up to $100$ gives`, opts: ['$1050$', '$2100$', '$1000$', '$950$'], key: 'a', sol: `The multiples $5, 10, 15, \\ldots, 100$ form an AP with $a = 5$, $d = 5$ and $n = 20$ terms. ${w14.md[0]}. Option (b) forgets to halve.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { w14.verify(C); C.assert(n14 === 20 && total(range(1, 100, (x) => x % 5 === 0)).eq(1050), 'brute-force sum of multiples of 5'); C.which([1050, 2100, 1000, 950], N(a14.S(n14))); });

const o15 = [r`\dfrac{n}{2}(a + l)`, r`n(a + l)`, r`\dfrac{n}{2}(l - a)`, r`\dfrac{a + l}{2}`];
const w15 = W(ARITH, [r`4 + 7 + 10 + 13 = 34`, r`\dfrac{4}{2}(4 + 13) = 34`]);
Q('m15', mk.mcq({ stem: r`An AP has $n$ terms; its first term is $a$ and its last term is $l$. Which expression gives the sum of all its terms?`, opts: o15.map((t) => `$${t}$`), key: 'a', sol: `Pair the first term with the last, the second with the second-last, and so on: each pair adds up to $a + l$, and there are $\\dfrac{n}{2}$ pairs. For example, ${w15.md[0]} and ${w15.md[1]}.`, d: 1, c: 'recall', t: [2], time: 45 }), (C) => { w15.verify(C); const test = (ap, n) => o15.map((t) => (texVal(t, { n, a: ap.a, l: ap.T(n) }).eq(ap.S(n)) ? 'sum' : 'no')); C.assert(JSON.stringify(test(new AP(2, 3), 5)) === JSON.stringify(test(new AP(4, 3), 4)), 'same verdicts for odd and even n'); C.which(test(new AP(4, 3), 4), 'sum'); });

const a16 = new AP(18, 3);
const w16 = W(apctx(a16), [r`T_{15} = 18 + 14 \times 3 = 60`]);
Q('m16', mk.mcq({ stem: r`An imagined pottery workshop in Khurja makes $18$ pots on its first day and, on every later day, $3$ more pots than on the day before. How many pots does it make on day $15$?`, opts: ['$60$', '$63$', '$57$', '$45$'], key: 'a', sol: `The daily numbers form an AP with $a = 18$ and $d = 3$, so on day $15$: ${w16.md[0]}. Option (b) adds $15 \\times 3$ instead of $14 \\times 3$, and (c) is the number for day $14$.`, d: 2, c: 'application', t: [1, 3], time: 60 }), (C) => { w16.verify(C); C.assert(F(18 + 45).eq(63) && a16.T(14).eq(57), 'distractors'); C.which([60, 63, 57, 45], N(a16.T(15))); });

const a17 = new AP(24, -1.5), n17 = a17.indexOf(6);
const w17 = W(nctx(a17, [13]), [r`24 + (n - 1) \times (-1.5) = 6 \Rightarrow n - 1 = 12 \Rightarrow n = 13`]);
Q('m17', mk.mcq({ stem: r`An imagined candle is $24$ cm tall when it is lit and burns down by $1.5$ cm every hour, so its heights at the start and after each hour form an AP. After how many hours is it $6$ cm tall?`, opts: ['$12$', '$13$', '$4$', '$16$'], key: 'a', sol: `The heights are $24, 22.5, 21, \\ldots$ with $a = 24$ and $d = -1.5$. If $6$ is the $n$th height, ${w17.md[0]}. The first height is measured at $0$ hours, so the $13$th is measured after $12$ hours. Option (b) gives the term number instead of the number of hours.`, d: 3, c: 'analysis', t: [1, 3], time: 90 }), (C) => { w17.verify(C); C.assert(n17 === 13 && F(6).div(1.5).eq(4) && F(24).div(1.5).eq(16), 'term 13; distractors'); C.which([12, 13, 4, 16], n17 - 1); });

const a18 = new AP(3, 2);
const w18 = W(apctx(a18), [r`S_{12} = \dfrac{12}{2}[2 \times 3 + 11 \times 2] = 6 \times 28 = 168`]);
Q('m18', mk.mcq({ stem: r`An imagined school library charges a late fine that grows each day: ₹$3$ for the first day, ₹$5$ for the second, ₹$7$ for the third, and so on. Kabir returns a book $12$ days late. What is his total fine?`, opts: ['₹$168$', '₹$25$', '₹$300$', '₹$144$'], key: 'a', sol: `The daily fines form an AP with $a = 3$, $d = 2$ and $n = 12$: ${w18.md[0]}, so the fine is ₹$168$. Option (b) is only the fine for day $12$, and (c) is $12 \\times 25$, which forgets to halve.`, d: 2, c: 'application', t: [2, 3], time: 90 }), (C) => { w18.verify(C); C.assert(a18.T(12).eq(25) && F(12 * 25).eq(300), 'distractors'); C.which([168, 25, 300, 144], N(a18.S(12))); });

const w19 = W(apctx(new AP(4, 6)), [r`T_{11} = 64 = l - 9d = 118 - 54`]);
Q('m19', mk.mcq({ stem: r`An AP has last term $l$ and common difference $d$. Which expression gives its $10$th term counted from the end?`, opts: ['$l - 9d$', '$l - 10d$', '$l + 9d$', '$a + 9d$'], key: 'a', sol: r`Counting backwards from $l$, each step subtracts $d$, and the $10$th term from the end is $9$ steps back: $l - 9d$. Option (d) is the $10$th term from the start.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => {
  // test on the AP 4, 10, …, 118 (20 terms): the 10th from the end is T_11
  const ap = new AP(4, 6), n = ap.count(118);
  w19.verify(C);
  C.which(['l - 9d', 'l - 10d', 'l + 9d', 'a + 9d'].map((t) => (texVal(t, { l: 118, d: 6, a: 4 }).eq(ap.T(n - 10 + 1)) ? 'yes' : 'no')), 'yes');
});

// =============================================================== assertion-reason (keys a c b d b a)
const ar1 = new AP(5, -4);
const war1 = W(apctx(ar1, { free: ['n'] }), [r`T_{n+1} - T_n = [9 - 4(n + 1)] - (9 - 4n) = -4`]);
Q('ar1', mk.ar({ a: r`The sequence with $n$th term $T_n = 9 - 4n$ is an AP with common difference $-4$.`, r: r`If the $n$th term of a sequence is $pn + q$, where $p$ and $q$ are constants, the sequence is an AP with common difference $p$.`, key: 'c', sol: `${war1.md[0]} for every $n$; the terms are $5, 1, -3, \\ldots$, so A is true. R is true in general, because the difference between consecutive terms is $p(n + 1) + q - (pn + q) = p$; A is the case $p = -4$, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => { war1.verify(C); C.assert(!checkLine(r`T_n = 9 - 4n`, apctx(ar1, { free: ['n'] })).length, 'T_n = 9 - 4n is the AP 5, 1, -3'); C.key('c'); });

const ar2 = new AP(1.5, 2.5);
const war2 = W(apctx(ar2), [r`T_{15} = 1.5 + 14 \times 2.5 = 1.5 + 35 = 36.5`, r`1.5 + 15 \times 2.5 = 39`]);
Q('ar2', mk.ar({ a: r`For the progression $1.5, 4, 6.5, \ldots$, the value of $T_{15}$ is $36.5$.`, r: r`To get the $n$th term of an AP, add $n$ copies of the common difference $d$ to the first term $a$.`, key: 'a', sol: `${war2.md[0]}, so A is true. R is false: the $n$th term is $a + (n - 1)d$, because there are only $n - 1$ steps from the first term to the $n$th. (Using R would give ${war2.md[1]}.)`, d: 2, c: 'understanding', t: [1] }), (C) => { war2.verify(C); C.assert(ar2.T(15).eq(36.5) && !ar2.a.add(ar2.d.mul(15)).eq(36.5), 'A true, R gives a different value'); C.key('a'); });

const ar3 = new AP(20, -3);
const war3 = W(apctx(ar3), [r`S_{10} = \dfrac{10}{2}[2 \times 20 + 9 \times (-3)] = 5 \times 13 = 65`, r`T_8 = 20 + 7 \times (-3) = -1`]);
Q('ar3', mk.ar({ a: r`The sum of the first $10$ terms of the AP $20, 17, 14, \ldots$ is $65$.`, r: r`An AP whose common difference is negative eventually has negative terms.`, key: 'd', sol: `${war3.md[0]}, so A is true. R is also true (here ${war3.md[1]}), but it is not the reason for A, which follows from the sum formula.`, d: 2, c: 'understanding', t: [2] }), (C) => { war3.verify(C); C.assert(ar3.S(10).eq(65) && ar3.T(8).sign() < 0 && ar3.T(7).sign() > 0, 'A true; first negative term T8'); C.key('d'); });

const ar4 = new AP(5, 8);
const war4 = W(ARITH, [r`300 = 8 \times 37 + 4`, r`36.875 \times 8 = 295`]);
Q('ar4', mk.ar({ a: r`$300$ is a term of the AP $5, 13, 21, \ldots$`, r: r`Every term of the AP $5, 13, 21, \ldots$ leaves a remainder of $5$ when divided by $8$.`, key: 'b', sol: `R is true: each term is $5 + 8(n - 1)$, a multiple of $8$ plus $5$. But ${war4.md[0]} leaves remainder $4$, so $300$ is not a term; equivalently, $5 + (n - 1) \\times 8 = 300$ gives $n - 1 = 36.875$, since ${war4.md[1]}. A is false.`, d: 2, c: 'understanding', t: [1] }), (C) => { war4.verify(C); C.assert(ar4.indexOf(300) === null && ar4.list(60).every((t) => t.n % 8 === 5), 'A false, R true'); C.key('b'); });

const ar5 = fromTerms(1, 6, 2, 7);
const war5 = W(apctx(ar5), [r`T_6 = S_6 - S_5 = 51 - 40 = 11`]);
Q('ar5', mk.ar({ a: r`For an AP with $S_5 = 40$ and $S_6 = 51$, the $6$th term is $11$.`, r: r`In any AP, the difference $T_6 - T_5$ equals the common difference.`, key: 'd', sol: `The $6$th term is what the sixth addition contributes: ${war5.md[0]}, so A is true. R is also true, but A uses $T_n = S_n - S_{n-1}$, not the common difference, so R does not explain A.`, d: 3, c: 'analysis', t: [2] }), (C) => { war5.verify(C); C.assert(ar5.S(5).eq(40) && ar5.S(6).eq(51) && ar5.T(6).eq(11), 'an AP (6, 7, 8, …) with these sums exists'); C.key('d'); });

const ar6 = new AP(12, -3);
const war6 = W(apctx(ar6), [r`T_9 = 12 + 8 \times (-3) = -12`, r`S_9 = \dfrac{9}{2}(12 - 12) = 0`]);
Q('ar6', mk.ar({ a: r`In the AP with first term $12$ and common difference $-3$, the sum of the first $9$ terms is $0$.`, r: r`The sum of the first $n$ terms of an AP is $\dfrac{n}{2}(a + l)$, which is $0$ when the last term $l$ equals $-a$.`, key: 'c', sol: `${war6.md[0]}, which is $-a$, so ${war6.md[1]}: A is true, and R is exactly the reason.`, d: 3, c: 'understanding', t: [2] }), (C) => { war6.verify(C); C.assert(ar6.S(9).isZero() && ar6.T(9).eq(ar6.a.neg()), 'S9 = 0, T9 = -a'); C.key('c'); });

// =============================================================== true-false
const wtf1 = W(ARITH, [r`10 - 7 = 13 - 10 = 3`, r`6 - 3 = 9 - 6 = 3`]);
Q('tf1', mk.tf({ stem: r`If the same number is subtracted from every term of an AP, the result is again an AP with the same common difference.`, key: 't', sol: `Each difference $(T_{n+1} - k) - (T_n - k) = T_{n+1} - T_n$ is unchanged. For example, $7, 10, 13$ has ${wtf1.md[0]}; subtracting $4$ gives $3, 6, 9$, with ${wtf1.md[1]}.`, d: 1, c: 'understanding', t: [1] }), (C) => { wtf1.verify(C); const l = new AP(7, 3).list(6); C.assert(isAP(l.map((t) => t.sub(4))) && diffs(l.map((t) => t.sub(4)))[0].eq(3), 'shifted list is an AP with d = 3'); C.key('t'); });
const ltf2 = [1, 1.1, 1.21, 1.331];
const wtf2 = W(ARITH, [r`1.1 - 1 = 0.1`, r`1.21 - 1.1 = 0.11`, r`1.331 - 1.21 = 0.121`]);
Q('tf2', mk.tf({ stem: r`The sequence $1, 1.1, 1.21, 1.331$, in which each term is $1.1$ times the one before, is an arithmetic progression.`, key: 'f', sol: `The differences are ${wtf2.md[0]}, ${wtf2.md[1]} and ${wtf2.md[2]}. They are not equal, so the sequence is not an AP.`, d: 2, c: 'understanding', t: [1] }), (C) => { wtf2.verify(C); C.assert(!isAP(ltf2) && ltf2.slice(1).every((x, i) => Fr.of(x).eq(Fr.of(ltf2[i]).mul(1.1))), 'ratio 1.1, not an AP'); C.key('f'); });
const atf3 = new AP(7.5, -0.5);
const wtf3 = W(apctx(atf3), [r`T_{40} = 7.5 + 39 \times (-0.5) = 7.5 - 19.5 = -12`]);
Q('tf3', mk.tf({ stem: r`Counting down from $7.5$ in steps of $0.5$ ($7.5, 7, 6.5, \ldots$), the number in the $40$th place is $-12$.`, key: 't', sol: `$a = 7.5$, $d = -0.5$: ${wtf3.md[0]}.`, d: 2, c: 'understanding', t: [1] }), (C) => { wtf3.verify(C); C.assert(atf3.T(40).eq(-12), 'T40 = -12'); C.key('t'); });
const atf4 = new AP(1, 1);
const wtf4 = W(apctx(atf4), [r`S_2 = 1 + 2 = 3`, r`S_4 = 1 + 2 + 3 + 4 = 10`, r`2 \times 3 = 6`]);
Q('tf4', mk.tf({ stem: r`Doubling the number of terms that are added always doubles the sum of an AP.`, key: 'f', sol: `For $1, 2, 3, 4, \\ldots$: ${wtf4.md[0]} but ${wtf4.md[1]}, which is not ${wtf4.md[2]}. The later terms are larger, so the sum need not double.`, d: 2, c: 'analysis', t: [2] }), (C) => { wtf4.verify(C); C.assert(!atf4.S(4).eq(atf4.S(2).mul(2)), 'counterexample'); C.key('f'); });
const atf5 = new AP(-19, 2);
const wtf5 = W(apctx(atf5), [r`T_{20} = -19 + 19 \times 2 = 19`, r`S_{20} = \dfrac{20}{2}(-19 + 19) = 0`]);
Q('tf5', mk.tf({ stem: r`The first $20$ terms of the AP $-19, -17, -15, \ldots$ add up to $0$.`, key: 't', sol: `${wtf5.md[0]}, so ${wtf5.md[1]}: the negative terms cancel the positive ones.`, d: 2, c: 'understanding', t: [2] }), (C) => { wtf5.verify(C); C.assert(atf5.S(20).isZero(), 'S20 = 0'); C.key('t'); });
const atf6 = new AP(20, 5);
const wtf6 = W(apctx(atf6), [r`T_{16} = 20 + 15 \times 5 = 95`, r`T_{17} = 20 + 16 \times 5 = 100`]);
Q('tf6', mk.tf({ stem: r`Meher, an imagined student, saves ₹$20$ on day $1$, ₹$25$ on day $2$, ₹$30$ on day $3$, and so on. She saves ₹$100$ on day $16$.`, key: 'f', sol: `${wtf6.md[0]}, so on day $16$ she saves ₹$95$. She saves ₹$100$ on day $17$: ${wtf6.md[1]}.`, d: 2, c: 'application', t: [1, 3] }), (C) => { wtf6.verify(C); C.assert(atf6.indexOf(100) === 17, '100 on day 17'); C.key('f'); });

// =============================================================== fill in the blank
const afb1 = new AP(0.25, 0.75);
Q('fb1', mk.fill({ stem: r`In the AP $0.25, 1, 1.75, 2.5, \ldots$, the fixed step $d$ from one term to the next equals ___.`, acc: [['0.75', '3/4']], sol: r`$d = 1 - 0.25 = 0.75$, and indeed $1.75 - 1 = 0.75$.`, d: 1, c: 'recall', t: [1] }), (C) => { W(ARITH, [r`1 - 0.25 = 0.75`, r`1.75 - 1 = 0.75`]).verify(C); C.assert(afb1.list(4).map((t) => t.tex(true)).join() === '0.25,1,1.75,2.5', 'listed terms'); C.blank(N(afb1.d)); });
const afb2 = new AP(-8, 6);
Q('fb2', mk.fill({ stem: r`An AP has first term $-8$ and common difference $6$. Its $12$th term is ___.`, acc: [['58']], sol: r`$T_{12} = -8 + 11 \times 6 = -8 + 66 = 58$.`, d: 2, c: 'understanding', t: [1] }), (C) => { W(apctx(afb2), [r`T_{12} = -8 + 11 \times 6 = -8 + 66 = 58`]).verify(C); C.blank(N(afb2.T(12))); });
Q('fb3', mk.fill({ stem: r`The number $q$ sits midway in the AP $9, q, 31$, so its value is ___.`, acc: [['20']], sol: r`The middle term is the average of its neighbours: $2q = 9 + 31 = 40$, so $q = 20$.`, d: 2, c: 'understanding', t: [1] }), (C) => { W(eqctx('q', [20]), [r`2q = 9 + 31 = 40`, r`q = 20`]).verify(C); C.assert(isAP([9, 20, 31]), '9, 20, 31 is an AP'); C.blank(20); });
Q('fb4', mk.fill({ stem: r`The sum of the first $9$ terms of an AP is $162$. Its $5$th term, the middle one of those nine, is ___.`, acc: [['18']], sol: r`$S_9 = \dfrac{9}{2}(T_1 + T_9) = 9 \times T_5$, because $T_1 + T_9 = 2T_5$. So $T_5 = \dfrac{162}{9} = 18$.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  W(ARITH, [r`\dfrac{162}{9} = 18`]).verify(C);
  for (const ap of [new AP(2, 4), new AP(26, -2), new AP(-6, 6)]) W(apctx(ap), [r`S_9 = \dfrac{9}{2}(T_1 + T_9) = 9 \times T_5`, r`T_1 + T_9 = 2T_5`]).verify(C, 'identity: ');
  C.assert(new AP(2, 4).S(9).eq(162) && new AP(2, 4).T(5).eq(18), 'an AP with S9 = 162 has T5 = 18');
  C.blank(18);
});
const afb5 = new AP(9, 9), nfb5 = afb5.count(99);
Q('fb5', mk.fill({ stem: r`The multiples of $9$ that are less than $100$ add up to ___.`, acc: [['594']], sol: r`They are $9, 18, \ldots, 99$: $a = 9$, $d = 9$, $n = 11$. Their sum is $S_{11} = \dfrac{11}{2}(9 + 99) = 11 \times 54 = 594$.`, d: 2, c: 'application', t: [2] }), (C) => { W(apctx(afb5), [r`S_{11} = \dfrac{11}{2}(9 + 99) = 11 \times 54 = 594`]).verify(C); C.assert(nfb5 === 11 && total(range(1, 99, (x) => x % 9 === 0)).eq(594), 'brute force'); C.blank(N(afb5.S(nfb5))); });
const afb6 = new AP(11, 4);
Q('fb6', mk.fill({ stem: r`An imagined bookshop in Kozhikode sells $11$ books on its opening day and, on each later day, $4$ more books than on the day before. It sells $67$ books on day number ___.`, acc: [['15']], sol: r`$11 + (n - 1) \times 4 = 67 \Rightarrow n - 1 = 14 \Rightarrow n = 15$, so the answer is 15.`, d: 2, c: 'application', t: [1, 3] }), (C) => { W(nctx(afb6, [15]), [r`11 + (n - 1) \times 4 = 67 \Rightarrow n - 1 = 14 \Rightarrow n = 15`]).verify(C); C.blank(afb6.indexOf(67)); });
Q('fb7', mk.fill({ stem: r`In the formula $T_n = a + (n - 1)d$ for the $n$th term of an AP, the letter $d$ stands for the ___.`, acc: [['common difference']], sol: r`$d$ is the common difference: the fixed amount added to each term to get the next, $d = T_2 - T_1$. So the blank is the common difference.`, d: 1, c: 'recall', t: [1] }), (C) => { const ap = new AP(4, 3); C.assert(ap.T(2).sub(ap.T(1)).eq(ap.d), 'd = T2 - T1'); C.blank('common difference'); });

// =============================================================== numerical
const an01 = new AP(2.5, 3);
Q('n01', mk.num({ stem: r`Work out the sixteenth term of the AP $2.5, 5.5, 8.5, \ldots$`, value: 47.5, sol: r`$a = 2.5$, $d = 3$: $T_{16} = 2.5 + 15 \times 3 = 47.5$.`, scheme: [['47.5', 1]], d: 1, c: 'understanding', t: [1], time: 60 }), (C) => { W(apctx(an01), [r`T_{16} = 2.5 + 15 \times 3 = 47.5`]).verify(C); C.val(N(an01.T(16))); });
const an02 = fromTerms(2, 17, 7, -3);
const wn02 = W(adctx(an02), [r`T_7 - T_2 = 5d = -3 - 17 = -20`, r`d = -4`, r`a = 17 - (-4) = 21`, r`T_{20} = 21 + 19 \times (-4) = -55`]);
Q('n02', mk.num({ marks: 2, stem: r`The $2$nd and $7$th terms of an AP are $17$ and $-3$. Find its $20$th term.`, value: -55, sol: `${wn02.md[0]}, so ${wn02.md[1]} and ${wn02.md[2]}. Then ${wn02.md[3]}.`, scheme: [['d = −4 and a = 21', 1], ['T₂₀ = −55', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { wn02.verify(C); C.val(N(an02.T(20))); });
const an03 = new AP(156, 7), list03 = range(150, 450, (x) => x % 7 === 2);
const wn03 = W(nctx(an03, [43]), [r`156 = 7 \times 22 + 2`, r`450 = 7 \times 64 + 2`, r`156 + (n - 1) \times 7 = 450 \Rightarrow n - 1 = 42 \Rightarrow n = 43`]);
Q('n03', mk.num({ marks: 2, stem: r`How many whole numbers from $150$ to $450$ (both included) are $2$ more than a multiple of $7$?`, value: 43, sol: `The smallest is ${wn03.md[0]} and the largest is ${wn03.md[1]}. They form an AP with $d = 7$: ${wn03.md[2]}.`, scheme: [['First and last terms 156 and 450', 1], ['n = 43', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { wn03.verify(C); C.assert(list03[0] === 156 && list03[list03.length - 1] === 450 && isAP(list03), 'brute-force list is the AP'); C.val(list03.length); C.assert(an03.count(450) === 43, 'count by formula'); });
const an04 = new AP(7, 3.5);
Q('n04', mk.num({ stem: r`Find the sum of the first $20$ terms of $7 + 10.5 + 14 + \cdots$`, value: 805, sol: r`$a = 7$, $d = 3.5$: $S_{20} = \dfrac{20}{2}[2 \times 7 + 19 \times 3.5] = 10 \times 80.5 = 805$.`, scheme: [['805', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (C) => { W(apctx(an04), [r`S_{20} = \dfrac{20}{2}[2 \times 7 + 19 \times 3.5] = 10 \times 80.5 = 805`]).verify(C); C.val(N(an04.S(20))); });
const an05 = new AP(54, -3), q05 = an05.sumQuadratic(513);
const wn05 = W(nctx(an05, q05.roots), [r`S_n = \dfrac{n}{2}[108 + (n - 1) \times (-3)] = 513`, r`n(111 - 3n) = 1026`, r`n^2 - 37n + 342 = 0 \Rightarrow (n - 18)(n - 19) = 0 \Rightarrow n = 18 \text{ or } n = 19`, r`n = 18`]);
Q('n05', mk.num({ marks: 2, stem: r`Find the least number of terms of the AP $54, 51, 48, \ldots$ that must be taken for their sum to be $513$.`, value: 18, sol: `${wn05.md[0]} gives ${wn05.md[1]}, that is ${wn05.md[2]}. Both work, because $T_{19} = 54 - 54 = 0$ adds nothing; the least is ${wn05.md[3]}.`, scheme: [['Quadratic n² − 37n + 342 = 0', 1], ['n = 18', 1]], d: 3, c: 'analysis', t: [2], time: 180 }), (C) => { wn05.verify(C); W(apctx(an05), [r`T_{19} = 54 - 54 = 0`]).verify(C); C.assert(an05.nForSum(513).join() === '18,19', 'search finds 18 and 19'); C.val(Math.min(...an05.nForSum(513))); });
const an06 = new AP(30, 5);
Q('n06', mk.num({ marks: 2, stem: r`Riya, an imagined Class 10 student, does $30$ skips with a rope on day $1$, and on each later day $5$ more skips than the day before. How many skips does she do altogether in the first $20$ days?`, value: 1550, sol: r`$a = 30$, $d = 5$, $n = 20$: $S_{20} = \dfrac{20}{2}[2 \times 30 + 19 \times 5] = 10 \times 155 = 1550$.`, scheme: [['Sum formula with a = 30, d = 5, n = 20', 1], ['1550', 1]], d: 2, c: 'application', t: [2, 3], time: 120 }), (C) => { W(apctx(an06), [r`S_{20} = \dfrac{20}{2}[2 \times 30 + 19 \times 5] = 10 \times 155 = 1550`]).verify(C); C.val(N(an06.S(20))); });
const an07 = new AP(8, 3);
Q('n07', mk.num({ marks: 2, stem: r`The first term of an AP is $8$ and the sum of its first $10$ terms is $215$. Find the common difference.`, value: 3, sol: r`$S_{10} = \dfrac{10}{2}[2 \times 8 + 9d] = 215 \Rightarrow 16 + 9d = 43 \Rightarrow 9d = 27 \Rightarrow d = 3$.`, scheme: [['16 + 9d = 43', 1], ['d = 3', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => { W(eqctx('d', [3], { a: 8 }), [r`S_{10} = \dfrac{10}{2}[2 \times 8 + 9d] = 215 \Rightarrow 16 + 9d = 43 \Rightarrow 9d = 27 \Rightarrow d = 3`]).verify(C); C.assert(an07.S(10).eq(215), 'S10 = 215'); C.val(N(an07.d)); });

// =============================================================== short, 2 marks
const as201 = new AP(-5, 4);
const ws201 = W(apctx(as201, { free: ['n'] }), [r`T_{n+1} - T_n = [4(n + 1) - 9] - (4n - 9) = 4`, r`T_1 = 4 \times 1 - 9 = -5`]);
Q('s201', mk.short({ marks: 2, stem: r`Show that the sequence whose $n$th term is $T_n = 4n - 9$ is an AP, and write down its first term and common difference.`, model: J([`${ws201.md[0]}, the same for every $n$, so the sequence is an AP.`, `First term: ${ws201.md[1]}; common difference $d = 4$. The terms are $-5, -1, 3, 7, \\ldots$`]), sol: 'Find the difference between consecutive terms in general; it does not depend on n. Then put n = 1 to get the first term.', scheme: [['Difference 4, the same for every n', 1], ['First term −5 and d = 4', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { ws201.verify(C); C.assert(!checkLine(r`T_n = 4n - 9`, apctx(as201, { free: ['n'] })).length, 'T_n = 4n - 9'); C.model([-5, 4]); });
const as202 = fromTerms(3, 7, 7, 25);
const ws202 = W(adctx(as202), [r`T_7 - T_3 = 4d = 25 - 7 = 18`, r`d = 4.5`, r`a = T_3 - 2d = 7 - 9 = -2`, r`T_{30} = a + 29d = -2 + 29 \times 4.5 = -2 + 130.5 = 128.5`]);
Q('s202', mk.short({ marks: 2, stem: r`The third term of an AP is $7$ and its seventh term is $25$. Find its $30$th term.`, model: J([`${ws202.md[0]}, so ${ws202.md[1]}.`, `${ws202.md[2]}.`, `${ws202.md[3]}.`]), sol: 'Subtract the two given terms to find d, go back to the first term, then use the nth-term formula.', scheme: [['d = 4.5 and a = −2', 1], ['T₃₀ = 128.5', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { ws202.verify(C); C.assert(as202.T(30).eq(128.5), 'T30'); C.model([4.5, -2, 128.5]); });
const as203 = new AP(7, 6);
const ws203 = W(nctx(as203, [F(61, 2)]), [r`7 + (n - 1) \times 6 = 184 \Rightarrow (n - 1) \times 6 = 177 \Rightarrow n - 1 = 29.5`]);
Q('s203', mk.short({ marks: 2, stem: r`Is $184$ a term of the AP $7, 13, 19, \ldots$? Give a reason.`, model: J([`$a = 7$, $d = 6$. Suppose $184$ is the $n$th term: ${ws203.md[0]}.`, r`Then $n = 30.5$, which is not a whole number, so $184$ is **not** a term. (The terms on either side of it are $T_{30} = 181$ and $T_{31} = 187$.)`]), sol: 'Solve a + (n − 1)d = 184 for n; a term needs a positive whole-number n.', scheme: [['Equation for n', 1], ['n = 30.5, not a whole number, so not a term', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { ws203.verify(C); W(apctx(as203), [r`T_{30} = 181`, r`T_{31} = 187`]).verify(C); C.assert(as203.indexOf(184) === null, 'not a term'); C.model([30.5, 181, 187]); });
const as204 = fromTerms(1, 1.5, 12, 34.5);
const ws204 = W(apctx(as204, { free: ['d'], sols: [{ d: 3 }] }), [r`S_{12} = \dfrac{12}{2}(1.5 + 34.5) = 6 \times 36 = 216`, r`T_{12} = 1.5 + 11d = 34.5 \Rightarrow 11d = 33 \Rightarrow d = 3`]);
Q('s204', mk.short({ marks: 2, stem: r`An AP has $12$ terms. Its first term is $1.5$ and its last term is $34.5$. Find the sum of all its terms and its common difference.`, model: J([`${ws204.md[0]}.`, `${ws204.md[1]}.`]), sol: 'With the first and last terms known, use S = n/2 (a + l); the last term gives an equation for d.', scheme: [['Sum 216', 1], ['d = 3', 1]], d: 2, c: 'understanding', t: [1, 2], time: 120 }), (C) => { ws204.verify(C); C.assert(as204.S(12).eq(216) && as204.d.eq(3), 'values'); C.model([216, 3]); });
const as205 = new AP(86, 14);
const ws205 = W(apctx(as205), [r`T_{12} = 86 + 11 \times 14 = 86 + 154 = 240`]);
Q('s205', mk.short({ marks: 2, stem: r`An imagined chess club in Indore enrolled $86$ new members in its first month, and in each later month it enrolled $14$ more new members than in the month before. How many new members did it enrol in its $12$th month?`, model: J([r`The monthly numbers of new members form an AP with $a = 86$ and $d = 14$.`, `${ws205.md[0]} new members.`]), sol: 'Recognise the AP from the fixed monthly increase, then use the nth-term formula with n = 12.', scheme: [['AP with a = 86, d = 14', 1], ['240', 1]], d: 2, c: 'application', t: [1, 3], time: 90 }), (C) => { ws205.verify(C); C.model([240]); });

// =============================================================== short, 3 marks
const as301 = new AP(3, 2);
const ws301 = W(adctx(as301), [r`T_4 = a + 3d = 9`, r`T_6 + T_{13} = (a + 5d) + (a + 12d) = 2a + 17d = 40`, r`a = 9 - 3d`, r`2(9 - 3d) + 17d = 40 \Rightarrow 18 + 11d = 40 \Rightarrow d = 2`, r`a = 9 - 3 \times 2 = 3`]);
Q('s301', mk.short({ marks: 3, stem: r`The $4$th term of an AP is $9$, and the sum of its $6$th and $13$th terms is $40$. Find the AP.`, model: J([`${ws301.md[0]} and ${ws301.md[1]}.`, `From the first equation, ${ws301.md[2]}. Substituting in the second: ${ws301.md[3]}.`, `Then ${ws301.md[4]}, and the AP is $3, 5, 7, 9, \\ldots$`]), sol: 'Write each condition in terms of a and d, then solve the two linear equations by substitution.', scheme: [['Two equations in a and d', 1], ['d = 2', 1], ['a = 3 and the AP 3, 5, 7, …', 1]], d: 3, c: 'application', t: [1], time: 180 }), (C) => { ws301.verify(C); C.assert(as301.T(4).eq(9) && as301.T(6).add(as301.T(13)).eq(40), 'conditions'); C.model([2, 3, 5, 7]); });
const ws302a = W(eqctx('a', [10]), [r`3a = 30`, r`a = 10`]);
const ws302 = W(eqctx('d', [4, -4]), [r`(10 - d)^2 + 10^2 + (10 + d)^2 = 300 + 2d^2 = 332 \Rightarrow 2d^2 = 32 \Rightarrow d^2 = 16 \Rightarrow d = 4 \text{ or } d = -4`]);
Q('s302', mk.short({ marks: 3, stem: r`The sum of three numbers in AP is $30$ and the sum of their squares is $332$. Find the numbers.`, model: J([`Let the numbers be $a - d$, $a$, $a + d$. Their sum is ${ws302a.md[0]}, so ${ws302a.md[1]}.`, `Sum of squares: ${ws302.md[0]}.`, r`So the numbers are $6, 10, 14$ (with $d = -4$ they are the same numbers in the order $14, 10, 6$).`]), sol: 'Take the numbers as a − d, a, a + d so that d cancels in the sum; then the squares give an equation in d only.', scheme: [['a = 10', 1], ['d² = 16', 1], ['6, 10, 14', 1]], d: 3, c: 'analysis', t: [1], time: 180 }), (C) => { ws302a.verify(C); ws302.verify(C); const l = new AP(6, 4).list(3); C.assert(total(l).eq(30) && total(l.map((x) => x.mul(x))).eq(332), 'sum 30, squares 332'); C.model([10, 16, 6, 14]); });
const as303 = new AP(105, 6), list303 = range(101, 199, (x) => x % 3 === 0 && x % 2 === 1);
const ws303 = W(nctx(as303, [16]), [r`105 + (n - 1) \times 6 = 195 \Rightarrow n - 1 = 15 \Rightarrow n = 16`, r`S_{16} = \dfrac{16}{2}(105 + 195) = 8 \times 300 = 2400`]);
Q('s303', mk.short({ marks: 3, stem: r`Consider the odd multiples of $3$ that lie between $100$ and $200$.
(a) Show that they form an AP and find how many there are.
(b) Find their sum.`, model: J([r`**(a)** The odd multiples of $3$ go up in steps of $6$: $105, 111, 117, \ldots, 195$, an AP with $a = 105$ and $d = 6$.`, `${ws303.md[0]}: there are $16$ of them.`, `**(b)** ${ws303.md[1]}.`]), sol: 'Consecutive odd multiples of 3 differ by 6; find the first and last in the range, count with the nth-term formula, then add with S = n/2 (a + l).', scheme: [['AP 105, 111, …, 195 with d = 6', 1], ['n = 16', 1], ['Sum 2400', 1]], d: 3, c: 'application', t: [1, 2], time: 180 }), (C) => { ws303.verify(C); C.assert(list303[0] === 105 && list303[list303.length - 1] === 195 && isAP(list303) && list303.length === 16 && total(list303).eq(2400), 'brute force'); C.model([105, 195, 16, 2400]); });
const as304 = new AP(4, 5);
const ws304 = W(apctx(as304), [r`T_1 = S_1 = \dfrac{1 \times 8}{2} = 4`, r`S_2 = \dfrac{2 \times 13}{2} = 13`, r`T_2 = S_2 - S_1 = 13 - 4 = 9`, r`d = T_2 - T_1 = 9 - 4 = 5`, r`T_{15} = 4 + 14 \times 5 = 74`]);
Q('s304', mk.short({ marks: 3, stem: r`The sum of the first $n$ terms of an AP is $S_n = \dfrac{n(5n + 3)}{2}$. Find its first term, its common difference and its $15$th term.`, model: J([`${ws304.md[0]} and ${ws304.md[1]}, so ${ws304.md[2]}.`, `${ws304.md[3]}.`, `${ws304.md[4]}.`]), sol: 'The first term is S₁; the second term is S₂ − S₁; their difference is d; then use the nth-term formula.', scheme: [['T₁ = 4', 1], ['d = 5', 1], ['T₁₅ = 74', 1]], d: 3, c: 'analysis', t: [2], time: 180 }), (C) => { ws304.verify(C); C.assert(!checkLine(r`S_n = \dfrac{n(5n + 3)}{2}`, apctx(as304, { free: ['n'] })).length, 'S_n formula matches the AP 4, 9, 14, …'); C.model([4, 5, 74]); });
const as305 = new AP(120, 8);
const ws305 = W(apctx(as305), [r`T_{25} = 120 + 24 \times 8 = 312`, r`S_{25} = \dfrac{25}{2}(120 + 312) = 12.5 \times 432 = 5400`]);
Q('s305', mk.short({ marks: 3, stem: r`An imagined bakery in Mumbai bakes $120$ buns on its first day of business, and on each later day it bakes $8$ more buns than on the day before.
(a) How many buns does it bake on day $25$?
(b) How many buns does it bake in its first $25$ days altogether?`, model: J([r`The daily numbers form an AP with $a = 120$ and $d = 8$.`, `**(a)** ${ws305.md[0]} buns.`, `**(b)** ${ws305.md[1]} buns.`]), sol: 'Find the 25th term first; then the sum of 25 terms is quickest as n/2 times (first + last).', scheme: [['T₂₅ = 312', 1], ['Sum formula with n = 25', 1], ['5400 buns', 1]], d: 2, c: 'application', t: [1, 2, 3], time: 180 }), (C) => { ws305.verify(C); C.model([312, 5400]); });

// =============================================================== short, 4 marks
const as401 = new AP(-13, 5);
const ws401 = W(adctx(as401), [r`T_4 + T_8 = (a + 3d) + (a + 7d) = 2a + 10d = 24`, r`T_6 + T_{10} = (a + 5d) + (a + 9d) = 2a + 14d = 44`, r`4d = 20 \Rightarrow d = 5`, r`2a + 50 = 24 \Rightarrow a = -13`]);
Q('s401', mk.short({ marks: 4, stem: r`The sum of the $4$th and $8$th terms of an AP is $24$, and the sum of its $6$th and $10$th terms is $44$. Find the first three terms of the AP.`, model: J([`${ws401.md[0]}.`, `${ws401.md[1]}.`, `Subtracting the first equation from the second: ${ws401.md[2]}. Then ${ws401.md[3]}.`, r`The first three terms are $-13, -8, -3$.`]), sol: 'Express each sum of terms in a and d to get two linear equations; subtract to eliminate a.', scheme: [['2a + 10d = 24', 1], ['2a + 14d = 44', 1], ['d = 5, a = −13', 1], ['−13, −8, −3', 1]], d: 3, c: 'application', t: [1], time: 240 }), (C) => { ws401.verify(C); C.assert(as401.T(4).add(as401.T(8)).eq(24) && as401.T(6).add(as401.T(10)).eq(44), 'conditions'); C.model([5, -13, -8, -3]); });
const as402 = new AP(8, 6.5);
const ws402 = W(nctx(as402, [30]), [r`T_{12} = 8 + 11 \times 6.5 = 79.5`, r`79.5 + 117 = 196.5`, r`8 + (n - 1) \times 6.5 = 196.5 \Rightarrow (n - 1) \times 6.5 = 188.5 \Rightarrow n - 1 = 29 \Rightarrow n = 30`, r`117 \div 6.5 = 18`]);
Q('s402', mk.short({ marks: 4, stem: r`Which term of the AP $8, 14.5, 21, \ldots$ exceeds its $12$th term by $117$?`, model: J([`$a = 8$, $d = 6.5$, and ${ws402.md[0]}.`, `The required term is ${ws402.md[1]}.`, `${ws402.md[2]}.`, `So the $30$th term exceeds the $12$th by $117$. (Quicker: ${ws402.md[3]} steps after the $12$th term, and $12 + 18 = 30$.)`]), sol: 'Find the 12th term, add 117, then find which term has that value.', scheme: [['T₁₂ = 79.5', 1], ['Required term 196.5', 1], ['Equation for n', 1], ['n = 30', 1]], d: 3, c: 'analysis', t: [1], time: 240 }), (C) => { ws402.verify(C); W(ARITH, [r`12 + 18 = 30`]).verify(C); C.assert(as402.T(30).sub(as402.T(12)).eq(117), 'T30 - T12 = 117'); C.model([79.5, 196.5, 30]); });
const as403 = new AP(-3, 4);
const ws403 = W(adctx(as403), [r`S_8 = \dfrac{8}{2}(2a + 7d) = 88 \Rightarrow 2a + 7d = 22`, r`S_{16} = 88 + 344 = 432`, r`S_{16} = \dfrac{16}{2}(2a + 15d) = 432 \Rightarrow 2a + 15d = 54`, r`8d = 32 \Rightarrow d = 4`, r`2a + 28 = 22 \Rightarrow a = -3`, r`S_8 = 4(-6 + 28) = 88`]);
Q('s403', mk.short({ marks: 4, stem: r`The sum of the first $8$ terms of an AP is $88$, and the sum of its next $8$ terms (the $9$th to the $16$th) is $344$. Find the first term and the common difference.`, model: J([`${ws403.md[0]}.`, `The first $16$ terms add up to ${ws403.md[1]}, and ${ws403.md[2]}.`, `Subtracting: ${ws403.md[3]}; then ${ws403.md[4]}.`, `Check: the AP is $-3, 1, 5, \\ldots$ and ${ws403.md[5]}.`]), sol: 'The next eight terms add to S₁₆ − S₈, so S₁₆ is known; the two sum formulas give two linear equations in a and d.', scheme: [['2a + 7d = 22', 1], ['S₁₆ = 432, so 2a + 15d = 54', 1], ['d = 4', 1], ['a = −3', 1]], d: 4, c: 'analysis', t: [2], time: 300 }), (C) => { ws403.verify(C); C.assert(as403.S(8).eq(88) && as403.S(16).sub(as403.S(8)).eq(344), 'conditions'); C.model([22, 432, 54, 4, -3]); });
const as404 = new AP(-14, 4), q404 = as404.sumQuadratic(40);
const ws404 = W(nctx(as404, [10, -2]), [r`S_n = \dfrac{n}{2}[-28 + (n - 1) \times 4] = 2n^2 - 16n`, r`2n^2 - 16n = 40 \Rightarrow n^2 - 8n - 20 = 0 \Rightarrow (n - 10)(n + 2) = 0 \Rightarrow n = 10 \text{ or } n = -2`]);
const ws404b = W(apctx(as404), [r`T_{10} = -14 + 9 \times 4 = 22`, r`S_{10} = 5(-14 + 22) = 40`, r`S_4 = -32`, r`S_9 = 18`]);
Q('s404', mk.short({ marks: 4, stem: r`How many terms of the AP $-14, -10, -6, \ldots$ must be added to give a sum of $40$? Explain why the sum is negative when only the first few terms are added.`, model: J([`$a = -14$, $d = 4$: ${ws404.md[0]}.`, `${ws404.md[1]}.`, `A number of terms cannot be negative, so $n = 10$. Check: ${ws404b.md[0]} and ${ws404b.md[1]}.`, `The first four terms $-14, -10, -6, -2$ are negative, so the running total falls at first (${ws404b.md[2]}); it becomes positive only when the positive terms outweigh them, from $n = 9$ on (${ws404b.md[3]}).`]), sol: 'Write S_n as a quadratic in n, set it equal to 40, solve and reject the negative root; look at the signs of the early terms for the explanation.', scheme: [['S_n = 2n² − 16n', 1], ['Quadratic and its roots', 1], ['n = 10 (−2 rejected)', 1], ['Reason: early terms negative', 1]], d: 3, c: 'analysis', t: [2], time: 300 }), (C) => { ws404.verify(C); ws404b.verify(C); C.assert(q404.roots.map(String).join() === '-2,10' && as404.nForSum(40).join() === '10', 'roots and search'); C.assert(as404.S(8).isZero() && as404.T(4).eq(-2) && as404.T(5).eq(2), 'S8 = 0, first positive term T5'); C.model([10, -2, 22, 40, -32, 18]); });
const as405 = new AP(35, 2.5);
const ws405 = W(apctx(as405), [r`T_{21} = 35 + 20 \times 2.5 = 85`]);
const ws405c = W(nctx(as405, [27]), [r`35 + (n - 1) \times 2.5 = 100 \Rightarrow (n - 1) \times 2.5 = 65 \Rightarrow n - 1 = 26 \Rightarrow n = 27`]);
Q('s405', mk.short({ marks: 4, stem: r`An imagined nursery in Shimla plants a cedar sapling that is $35$ cm tall, and the sapling grows $2.5$ cm every week.
(a) Show that its heights at planting and at the end of each week form an AP.
(b) Find its height at the end of the $20$th week.
(c) At the end of which week will it first be $1$ m tall?`, model: J([r`**(a)** The heights $35, 37.5, 40, \ldots$ (in cm) go up by the same $2.5$ cm each week, so they form an AP with $a = 35$ and $d = 2.5$.`, `**(b)** The height at the end of week $w$ is the $(w + 1)$th term. After $20$ weeks: ${ws405.md[0]} cm.`, `**(c)** $1$ m is $100$ cm: ${ws405c.md[0]}.`, r`The $27$th height is the one at the end of week $26$, so the sapling is first $1$ m tall at the end of the $26$th week.`]), sol: 'The first height is at week 0, so the height after w weeks is term number w + 1; keep the units the same (100 cm).', scheme: [['(a) constant difference 2.5 cm', 1], ['(b) 85 cm', 1], ['(c) n = 27', 1], ['(c) end of week 26', 1]], d: 3, c: 'application', t: [1, 3], time: 300 }), (C) => { ws405.verify(C); ws405c.verify(C); C.assert(as405.indexOf(100) === 27 && as405.T(26).lt(100), 'first reaches 100 at term 27'); C.model([85, 27, 26]); });
const as406 = new AP(150, -12);
const ws406 = W(apctx(as406), [r`T_9 = 150 + 8 \times (-12) = 54`, r`S_{12} = \dfrac{12}{2}[300 + 11 \times (-12)] = 6 \times 168 = 1008`, r`T_{11} = 150 - 120 = 30`, r`T_{12} = 150 - 132 = 18 < 30`]);
Q('s406', mk.short({ marks: 4, stem: r`An imagined theatre group in Kolkata sells $150$ tickets for its first show, and for each later show it sells $12$ fewer tickets than for the one before.
(a) How many tickets does it sell for the $9$th show?
(b) How many tickets does it sell for its first $12$ shows altogether?
(c) Which is the first show to sell fewer than $30$ tickets?`, model: J([r`The numbers of tickets form an AP with $a = 150$ and $d = -12$.`, `**(a)** ${ws406.md[0]} tickets.`, `**(b)** ${ws406.md[1]} tickets.`, `**(c)** ${ws406.md[2]} and ${ws406.md[3]}, so the $12$th show is the first to sell fewer than $30$ tickets.`]), sol: 'A falling AP with d = −12: use the nth-term formula for (a) and (c) and the sum formula for (b).', scheme: [['(a) 54', 1], ['(b) sum formula', 1], ['(b) 1008', 1], ['(c) 12th show', 1]], d: 3, c: 'application', t: [1, 2, 3], time: 300 }), (C) => { ws406.verify(C); C.assert(as406.list(12).findIndex((t) => t.lt(30)) === 11, 'first below 30 is show 12'); C.model([54, 1008, 18]); });

// =============================================================== long, 10 marks (3 + 3 + 4)
const al01 = fromTerms(4, 11, 9, 31);
const wl01a = W(adctx(al01), [r`T_9 - T_4 = 5d = 31 - 11 = 20`, r`d = 4`, r`a = T_4 - 3d = 11 - 12 = -1`]);
const wl01b = W(apctx(al01, { free: ['n'] }), [r`T_n = -1 + (n - 1) \times 4 = 4n - 5`, r`T_{25} = 4 \times 25 - 5 = 95`]);
const wl01c = W(nctx(al01, [F(155, 4)]), [r`4n - 5 = 150 \Rightarrow 4n = 155 \Rightarrow n = 38.75`]);
const wl01d = W(nctx(al01, [48]), [r`4n - 5 = 187 \Rightarrow 4n = 192 \Rightarrow n = 48`]);
Q('l01', mk.long({ marks: 10, stem: `Answer each part. Show all working.
(a) The $4$th term of an AP is $11$ and its $9$th term is $31$. Find the first term and the common difference.
(b) Write the $n$th term of this AP, and find its $25$th term.
(c) Is $150$ a term of this AP? Which term of the AP is $187$?`, model: J([`**(a)** ${wl01a.md[0]}, so ${wl01a.md[1]}. Then ${wl01a.md[2]}.`, `**(b)** ${wl01b.md[0]}, and ${wl01b.md[1]}.`, `**(c)** ${wl01c.md[0]}, which is not a whole number, so $150$ is not a term.`, `${wl01d.md[0]}: $187$ is the $48$th term.`]), sol: 'Part (a) subtracts the two given terms; part (b) substitutes a and d in a + (n − 1)d; part (c) solves T_n = value and asks whether n is a positive whole number.', scheme: [['(a) 5d = 20', 1], ['(a) d = 4, a = −1', 2], ['(b) T_n = 4n − 5', 2], ['(b) T₂₅ = 95', 1], ['(c) n = 38.75, so 150 is not a term', 2], ['(c) 187 is the 48th term', 2]], d: 2, c: 'application', t: [1], time: 600 }), (C) => { wl01a.verify(C); wl01b.verify(C); wl01c.verify(C); wl01d.verify(C); C.assert(al01.a.eq(-1) && al01.d.eq(4) && al01.indexOf(150) === null && al01.indexOf(187) === 48, 'values'); C.model([4, -1, 95, 38.75, 48]); });

const al02 = new AP(120, -5.5), back02 = new AP(-12, 5.5);
const wl02a = W(nctx(al02, [25]), [r`120 + (n - 1) \times (-5.5) = -12 \Rightarrow (n - 1) \times (-5.5) = -132 \Rightarrow n - 1 = 24 \Rightarrow n = 25`]);
const wl02b = W(apctx(back02), [r`-12 + 7 \times 5.5 = 26.5`]);
const wl02b2 = W(apctx(al02), [r`T_{18} = 120 + 17 \times (-5.5) = 26.5`]);
const wl02c = W(eqctx('d', [4, -4]), [r`(7 - d) \times 7 \times (7 + d) = 7(49 - d^2) = 231`, r`49 - d^2 = 33 \Rightarrow d^2 = 16 \Rightarrow d = 4 \text{ or } d = -4`]);
const wl02c0 = W(eqctx('a', [7]), [r`3a = 21 \Rightarrow a = 7`]);
Q('l02', mk.long({ marks: 10, stem: `Answer each part. Show all working.
(a) How many terms are there in the AP $120, 114.5, 109, \\ldots, -12$?
(b) Find the $8$th term from the end of this AP.
(c) Three numbers in AP have a sum of $21$ and a product of $231$. Find the numbers.`, model: J([`**(a)** $d = -5.5$. If $-12$ is the $n$th term, ${wl02a.md[0]}.`, `**(b)** Read backwards, the AP starts at $-12$ with common difference $5.5$, so the $8$th term from the end is ${wl02b.md[0]}. (Check: it is the $25 - 8 + 1 = 18$th term, and ${wl02b2.md[0]}.)`, `**(c)** Let the numbers be $a - d$, $a$, $a + d$. Their sum is $3a = 21$, so ${wl02c0.md[0]}.`, `Product: ${wl02c.md[0]}, so ${wl02c.md[1]}.`, r`The numbers are $3, 7, 11$ (or $11, 7, 3$). Check: $3 + 7 + 11 = 21$ and $3 \times 7 \times 11 = 231$.`]), sol: 'Part (a) solves a + (n − 1)d = −12; part (b) reverses the AP (or uses term n − 8 + 1); part (c) takes the numbers as a − d, a, a + d.', scheme: [['(a) equation with d = −5.5', 1], ['(a) n = 25', 2], ['(b) reversed AP or the 18th term', 2], ['(b) 26.5', 1], ['(c) a = 7', 1], ['(c) 49 − d² = 33', 1], ['(c) d = ±4', 1], ['(c) 3, 7, 11', 1]], d: 3, c: 'application', t: [1], time: 660 }), (C) => { wl02a.verify(C); wl02b.verify(C); wl02b2.verify(C); wl02c.verify(C); wl02c0.verify(C); W(ARITH, [r`25 - 8 + 1 = 18`, r`3 + 7 + 11 = 21`, r`3 \times 7 \times 11 = 231`]).verify(C); C.assert(al02.count(-12) === 25 && al02.T(18).eq(back02.T(8)), 'n = 25, 8th from end'); C.model([25, 26.5, 7, 3, 11]); });

const al03a = new AP(15, -4), al03b = new AP(6, 4), q03b = al03b.sumQuadratic(198), al03c = new AP(8, 3);
const wl03a = W(apctx(al03a), [r`S_{18} = \dfrac{18}{2}[2 \times 15 + 17 \times (-4)] = 9 \times (30 - 68) = 9 \times (-38) = -342`]);
const wl03b = W(nctx(al03b, q03b.roots), [r`S_n = \dfrac{n}{2}[12 + (n - 1) \times 4] = n(2n + 4) = 2n^2 + 4n`, r`2n^2 + 4n = 198 \Rightarrow n^2 + 2n - 99 = 0 \Rightarrow (n + 11)(n - 9) = 0 \Rightarrow n = 9 \text{ or } n = -11`]);
const wl03c = W(apctx(al03c), [r`T_1 = S_1 = \dfrac{3 + 13}{2} = 8`, r`S_2 = \dfrac{12 + 26}{2} = 19`, r`T_2 = S_2 - S_1 = 19 - 8 = 11`, r`d = 11 - 8 = 3`, r`T_{20} = 8 + 19 \times 3 = 65`]);
Q('l03', mk.long({ marks: 10, stem: `Answer each part. Show all working.
(a) Find the sum of the first $18$ terms of the AP $15, 11, 7, \\ldots$
(b) How many terms of the AP $6, 10, 14, \\ldots$ must be added to get $198$?
(c) The sum of the first $n$ terms of an AP is $S_n = \\dfrac{3n^2 + 13n}{2}$. Find the AP and its $20$th term.`, model: J([`**(a)** $a = 15$, $d = -4$: ${wl03a.md[0]}.`, `**(b)** $a = 6$, $d = 4$: ${wl03b.md[0]}.`, `${wl03b.md[1]}. A number of terms cannot be negative, so $9$ terms are needed.`, `**(c)** ${wl03c.md[0]} and ${wl03c.md[1]}, so ${wl03c.md[2]} and ${wl03c.md[3]}.`, `The AP is $8, 11, 14, \\ldots$ and ${wl03c.md[4]}.`]), sol: 'Part (a) is the sum formula with a negative d; part (b) sets S_n = 198 and solves a quadratic; part (c) uses T₁ = S₁ and T₂ = S₂ − S₁.', scheme: [['(a) sum formula with d = −4', 2], ['(a) −342', 1], ['(b) quadratic n² + 2n − 99 = 0', 2], ['(b) n = 9', 1], ['(c) T₁ = 8', 1], ['(c) T₂ = 11, d = 3', 1], ['(c) AP 8, 11, 14, …', 1], ['(c) T₂₀ = 65', 1]], d: 3, c: 'application', t: [2], time: 660 }), (C) => { wl03a.verify(C); wl03b.verify(C); wl03c.verify(C); C.assert(!checkLine(r`S_n = \dfrac{3n^2 + 13n}{2}`, apctx(al03c, { free: ['n'] })).length, 'S_n matches 8, 11, 14'); C.assert(al03b.nForSum(198).join() === '9' && al03a.S(18).eq(-342), 'values'); C.model([-342, 9, 8, 11, 65]); });

const al04 = new AP(120, 15), q04 = al04.sumQuadratic(3720);
const wl04a = W(apctx(al04), [r`T_{12} = 120 + 11 \times 15 = 285`, r`S_{12} = \dfrac{12}{2}(120 + 285) = 6 \times 405 = 2430`]);
const wl04c = W(nctx(al04, q04.roots), [r`S_n = \dfrac{n}{2}[240 + (n - 1) \times 15] = \dfrac{n(15n + 225)}{2}`, r`\dfrac{n(15n + 225)}{2} = 3720 \Rightarrow 15n^2 + 225n - 7440 = 0 \Rightarrow n^2 + 15n - 496 = 0`, r`(n - 16)(n + 31) = 0 \Rightarrow n = 16 \text{ or } n = -31`]);
Q('l04', mk.long({ marks: 10, stem: `Ananya, an imagined Class 10 student in Guwahati, saves ₹$120$ in January, ₹$135$ in February, ₹$150$ in March, and so on: each month she saves ₹$15$ more than in the month before. Show all working.
(a) How much does she save in December of the same year?
(b) How much does she save in the whole year, January to December?
(c) She keeps saving in the same way. After how many months will her total savings be exactly ₹$3{,}720$?`, model: J([`Her monthly savings form an AP with $a = 120$ and $d = 15$.`, `**(a)** December is the $12$th month: ${wl04a.md[0]}, so she saves ₹$285$.`, `**(b)** ${wl04a.md[1]}, so she saves ₹$2{,}430$ in the year.`, `**(c)** ${wl04c.md[0]}.`, `${wl04c.md[1]}.`, `${wl04c.md[2]}.`, 'A number of months cannot be negative, so her total reaches ₹$3{,}720$ after $16$ months, that is, at the end of April of the following year.']), sol: 'Parts (a) and (b) use the nth-term and sum formulas with n = 12; part (c) sets S_n equal to the target, solves the quadratic and interprets the positive root as a month.', scheme: [['(a) AP with a = 120, d = 15', 1], ['(a) ₹285', 2], ['(b) sum formula', 2], ['(b) ₹2,430', 1], ['(c) equation S_n = 3720', 1], ['(c) n² + 15n − 496 = 0', 1], ['(c) n = 16', 1], ['(c) −31 rejected; April of next year', 1]], d: 3, c: 'application', t: [1, 2, 3], time: 660 }), (C) => { wl04a.verify(C); wl04c.verify(C); C.assert(q04.roots.map(String).join() === '-31,16' && al04.nForSum(3720).join() === '16', 'roots and search'); C.model([285, 2430, 16, 496]); });

const al05 = new AP(5000, -200), q05l = al05.sumQuadratic(63000);
const wl05a = W(apctx(al05), [r`T_{10} = 5000 + 9 \times (-200) = 3200`, r`S_{10} = \dfrac{10}{2}(5000 + 3200) = 5 \times 8200 = 41000`]);
const wl05c = W(nctx(al05, q05l.roots), [r`S_n = \dfrac{n}{2}[10000 + (n - 1) \times (-200)] = n(5100 - 100n)`, r`n(5100 - 100n) = 63000 \Rightarrow n^2 - 51n + 630 = 0 \Rightarrow (n - 21)(n - 30) = 0 \Rightarrow n = 21 \text{ or } n = 30`]);
const wl05d = W(apctx(al05), [r`T_{21} = 5000 + 20 \times (-200) = 1000`, r`T_{30} = 5000 + 29 \times (-200) = -800`]);
Q('l05', mk.long({ marks: 10, stem: `An imagined self-help group lends ₹$63{,}000$ to a family, free of interest. The family repays it in monthly instalments: ₹$5{,}000$ in the first month, and each later instalment is ₹$200$ less than the one before. Show all working.
(a) Find the $10$th instalment.
(b) Find the total repaid in the first $10$ months.
(c) How many instalments repay the loan exactly, and what is the last instalment? Explain why one root of your equation must be rejected.`, model: J([`The instalments form an AP with $a = 5000$ and $d = -200$.`, `**(a)** ${wl05a.md[0]}: the $10$th instalment is ₹$3{,}200$.`, `**(b)** ${wl05a.md[1]}: ₹$41{,}000$ is repaid in the first $10$ months.`, `**(c)** ${wl05c.md[0]}.`, `${wl05c.md[1]}.`, `Now ${wl05d.md[0]} but ${wl05d.md[1]}. An instalment cannot be negative (the instalments after the $25$th would be zero or less), so $n = 30$ is rejected.`, 'The loan is repaid in $21$ instalments, and the last instalment is ₹$1{,}000$.']), sol: 'Parts (a) and (b) use the term and sum formulas for a falling AP; in part (c) both roots of the quadratic are positive, so check the last instalment for each.', scheme: [['(a) T₁₀ = 3200', 3], ['(b) sum formula', 2], ['(b) ₹41,000', 1], ['(c) quadratic n² − 51n + 630 = 0', 1], ['(c) roots 21 and 30', 1], ['(c) 30 rejected: T₃₀ < 0', 1], ['(c) 21 instalments, last ₹1,000', 1]], d: 4, c: 'analysis', t: [2, 3], time: 720 }), (C) => { wl05a.verify(C); wl05c.verify(C); wl05d.verify(C); C.assert(q05l.roots.map(String).join() === '21,30' && al05.nForSum(63000).join() === '21,30', 'both roots reach 63000'); C.assert(al05.T(25).eq(200) && al05.T(26).isZero(), 'instalment 26 would be zero'); C.model([3200, 41000, 21, 30, 1000, -800]); });

const al06 = new AP(18, -1.5);
const wl06a = W(apctx(al06), [r`2000 \div 250 = 8`, r`T_9 = 18 + 8 \times (-1.5) = 6`]);
const wl06b = W(nctx(al06, [15]), [r`18 + (n - 1) \times (-1.5) = -3 \Rightarrow (n - 1) \times (-1.5) = -21 \Rightarrow n - 1 = 14`, r`14 \times 250 = 3500`]);
const wl06c = W(apctx(al06), [r`T_{13} = 18 + 12 \times (-1.5) = 0`, r`S_{13} = \dfrac{13}{2}(18 + 0) = 117`, r`117 \div 13 = 9`]);
Q('l06', mk.long({ marks: 10, stem: `On an imagined trek in Sikkim, the temperature at the base camp is $18$ °C, and it falls by $1.5$ °C for every $250$ m climbed. A hiker records the temperature at the base camp and then after every $250$ m of climbing. Show all working.
(a) Show that the readings form an AP, and find the temperature after climbing $2$ km.
(b) How high above the base camp is the temperature $-3$ °C?
(c) The hiker records $13$ readings in all, the last one after $3$ km. Find the sum of the readings, and hence their average.`, model: J([r`**(a)** Each reading is $1.5$ °C lower than the one before, so the readings $18, 16.5, 15, \ldots$ form an AP with $a = 18$ and $d = -1.5$.`, `$2$ km $= 2000$ m and ${wl06a.md[0]} climbs of $250$ m, so the temperature is the $9$th reading: ${wl06a.md[1]} °C.`, `**(b)** ${wl06b.md[0]}: that is $14$ climbs of $250$ m, and ${wl06b.md[1]}, so it is $-3$ °C at $3500$ m (3.5 km) above the base camp.`, `**(c)** ${wl06c.md[0]} °C, so ${wl06c.md[1]}.`, `Average: ${wl06c.md[2]} °C.`]), sol: 'The first reading is at 0 m, so the reading after k climbs is term k + 1; the sum of the readings divided by their number gives the average.', scheme: [['(a) constant difference −1.5 °C', 1], ['(a) 9th reading, 6 °C', 2], ['(b) n − 1 = 14', 2], ['(b) 3500 m', 1], ['(c) 13th reading 0 °C', 1], ['(c) sum 117', 2], ['(c) average 9 °C', 1]], d: 3, c: 'application', t: [1, 2, 3], time: 660 }), (C) => { wl06a.verify(C); wl06b.verify(C); wl06c.verify(C); C.assert(al06.indexOf(-3) === 15 && al06.S(13).eq(117), 'values'); C.model([6, 3500, 117, 9]); });

const al07 = new AP(10, 4);
const wl07a = W(adctx(al07), [r`S_5 = \dfrac{5}{2}(a + T_5)`, r`\dfrac{5}{2}(a + 26) = 90 \Rightarrow a + 26 = 36 \Rightarrow a = 10`, r`T_5 = a + 4d = 26 \Rightarrow 10 + 4d = 26 \Rightarrow d = 4`]);
const wl07b = W(apctx(al07), [r`S_{20} = \dfrac{20}{2}[20 + 19 \times 4] = 10 \times 96 = 960`]);
const wl07c = W(apctx(al07), [r`S_{40} = \dfrac{40}{2}[20 + 39 \times 4] = 20 \times 176 = 3520`, r`S_{40} - S_{20} = 3520 - 960 = 2560`, r`T_{21} = 10 + 20 \times 4 = 90`, r`T_{40} = 10 + 39 \times 4 = 166`, r`\dfrac{20}{2}(90 + 166) = 10 \times 256 = 2560`]);
Q('l07', mk.long({ marks: 10, stem: `Answer each part. Show all working.
(a) The $5$th term of an AP is $26$, and the sum of its first $5$ terms is $90$. Find the first term and the common difference.
(b) Find the sum of the first $20$ terms of this AP.
(c) Find the sum of its terms from the $21$st to the $40$th in two ways: as $S_{40} - S_{20}$, and by using the first and last of those terms.`, model: J([`**(a)** Using $S_n = \\dfrac{n}{2}(a + l)$ with $l = T_5$: ${wl07a.md[0]}, so ${wl07a.md[1]}. Then ${wl07a.md[2]}.`, `**(b)** ${wl07b.md[0]}.`, `**(c)** First way: ${wl07c.md[0]}, so ${wl07c.md[1]}.`, `Second way: there are $20$ terms from the $21$st to the $40$th; ${wl07c.md[2]} and ${wl07c.md[3]}, so their sum is ${wl07c.md[4]}. Both ways give $2560$.`]), sol: 'Part (a) uses the sum in the form n/2 (a + l) with l = T₅; part (c) either subtracts two sums or adds the 20 terms directly with n/2 (first + last).', scheme: [['(a) a = 10', 2], ['(a) d = 4', 1], ['(b) 960', 3], ['(c) S₄₀ = 3520 and 2560', 2], ['(c) second way: 90, 166 and 2560', 2]], d: 3, c: 'analysis', t: [2], time: 660 }), (C) => { wl07a.verify(C); wl07b.verify(C); wl07c.verify(C); C.assert(total(al07.list(40).slice(20)).eq(2560), 'adding terms 21 to 40'); C.model([10, 4, 960, 3520, 2560]); });

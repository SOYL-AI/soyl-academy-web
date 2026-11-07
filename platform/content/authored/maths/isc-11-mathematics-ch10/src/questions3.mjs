// ISC 11 Mathematics ch10 Sequences and Series - 3-mark short answers and 5-mark long answers (in parts).
import { Q, mk } from './lib.mjs';
import { r, range, Fr, fr, sumF, apList, apTerm, apSum, apFrom, apMeans, gpList, gpTerm, gpSum, gpInf, recurring, decimals, gpMeans, s1, s2, s3, L1, L2, L3, LS, diffs, fitQuad, S } from './seq.mjs';

// ============================================================ short, 3 marks
{
  const hits = [];
  for (let a = -20; a <= 20; a++) for (let d = -10; d <= 10; d++) if (apSum(a, d, 8).eq(80) && apSum(a, d, 16).eq(288)) hits.push([a, d]);
  Q('s301', mk.short({ marks: 3, stem: r`The sum of the first $8$ terms of an arithmetic progression is $80$ and the sum of its first $16$ terms is $288$. Find the first term, the common difference and the tenth term.`, model: r`$S_8 = 4(2a + 7d) = 80$ gives $2a + 7d = 20$. $S_{16} = 8(2a + 15d) = 288$ gives $2a + 15d = 36$. Subtracting, $8d = 16$, so $d = 2$ and $2a = 20 - 14 = 6$, so $a = 3$. Then $a_{10} = 3 + 9 \times 2 = 21$.`, sol: 'Two sum conditions give two linear equations in $a$ and $d$.', scheme: [['$2a + 7d = 20$ and $2a + 15d = 36$', 1], ['$d = 2$, $a = 3$', 1], ['$a_{10} = 3 + 9 \\times 2 = 21$', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
    C.assert(hits.length === 1 && hits[0].join() === '3,2' && apTerm(3, 2, 10).eq(21) && apList(3, 2, 10)[9].eq(21), 'a = 3, d = 2 by search over small integers; a_10 = 21'); C.model([20, 36, 16, 21]);
  });
}
{
  const hits = [];
  for (let d = 1; d <= 6; d++) { const a = 8; const t = [a - 3 * d, a - d, a + d, a + 3 * d]; if (t.reduce((s, x) => s + x * x, 0) === 276) hits.push(t); }
  Q('s302', mk.short({ marks: 3, stem: r`Four numbers are in arithmetic progression. Their sum is $32$ and the sum of their squares is $276$. Find the numbers.`, model: r`Take the numbers as $a - 3d$, $a - d$, $a + d$, $a + 3d$. Their sum is $4a = 32$, so $a = 8$. The sum of squares is $4a^2 + 20d^2 = 256 + 20d^2 = 276$, so $d^2 = 1$ and $d = \pm 1$. The numbers are $5, 7, 9, 11$ (or in reverse order).`, sol: 'The symmetric choice makes the odd powers of $d$ cancel in the sum of squares.', scheme: [['Symmetric choice; $4a = 32$, so $a = 8$', 1], ['$4a^2 + 20d^2 = 276$, so $d^2 = 1$', 1], ['The numbers $5, 7, 9, 11$', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
    const t = hits[0];
    C.assert(hits.length === 1 && t.join() === '5,7,9,11' && t.reduce((s, x) => s + x, 0) === 32 && 4 * 64 + 20 === 276, '5, 7, 9, 11: sum 32, squares 276'); C.model([32, 8, 276, 5, 11]);
  });
}
{
  const ok = [[1, 4, 3], [-5, 11, 6], [0, 9, 8], [7, 2, 5]].every(([a, b, n]) => sumF(apMeans(a, b, n)).eq(fr(n).mul(fr(a + b, 2))));
  Q('s303', mk.short({ marks: 3, stem: r`Prove that the sum of $n$ arithmetic means inserted between two numbers $a$ and $b$ equals $n$ times the single arithmetic mean of $a$ and $b$.`, model: r`The $n$ means with $a$ and $b$ form an AP of $n + 2$ terms with common difference $d = \dfrac{b - a}{n + 1}$. The means are $a + d, a + 2d, \ldots, a + nd$, and their sum is $na + d(1 + 2 + \cdots + n) = na + \dfrac{b - a}{n + 1} \cdot \dfrac{n(n + 1)}{2} = na + \dfrac{n(b - a)}{2} = \dfrac{n(a + b)}{2} = n \cdot \dfrac{a + b}{2}$.`, sol: 'Add the means using $1 + 2 + \\cdots + n$, so that $n + 1$ cancels.', scheme: [['$d = \\dfrac{b - a}{n + 1}$ and the means $a + kd$, $k = 1, \\ldots, n$', 1], ['Sum $= na + d \\cdot \\dfrac{n(n+1)}{2}$', 1], ['Substitute $d$ and simplify to $\\dfrac{n(a + b)}{2}$', 1]], d: 3, c: 'analysis', t: [1], time: 160 }), (C) => {
    C.assert(ok, 'sum of n means = n(a + b)/2 for four exact examples'); C.model(['n(a + b)', 'n + 1']);
  });
}
{
  const hits = [];
  for (let q of [fr(3), fr(1, 3), fr(2), fr(1, 2), fr(4), fr(1, 4), fr(-3), fr(-1, 3)]) { const a = 9; const t = [fr(a).div(q), fr(a), fr(a).mul(q)]; if (sumF(t).eq(39) && t[0].mul(t[1]).mul(t[2]).eq(729)) hits.push(t.map((x) => x.str()).join()); }
  Q('s304', mk.short({ marks: 3, stem: r`The product of three positive numbers in geometric progression is $729$, while the numbers add up to $39$. Determine them.`, model: r`Take the numbers as $\dfrac{a}{r}$, $a$, $ar$. The product is $a^3 = 729$, so $a = 9$. The sum is $\dfrac{9}{r} + 9 + 9r = 39$, so $9r^2 - 30r + 9 = 0$, that is $3r^2 - 10r + 3 = (3r - 1)(r - 3) = 0$. So $r = 3$ or $r = \dfrac{1}{3}$, and the numbers are $3, 9, 27$ (or $27, 9, 3$).`, sol: 'Choose $\\dfrac{a}{r}, a, ar$ so that the product is $a^3$.', scheme: [['Choice $\\dfrac{a}{r}, a, ar$; $a^3 = 729$, so $a = 9$', 1], ['$3r^2 - 10r + 3 = 0$ from the sum', 1], ['$r = 3$ or $\\dfrac{1}{3}$; numbers $3, 9, 27$', 1]], d: 3, c: 'application', t: [2], time: 160 }), (C) => {
    C.assert(hits.length === 2 && 9 * 9 * 9 === 729 && 3 + 9 + 27 === 39 && 3 * 9 * 27 === 729 && (3 * 3 - 1) * (3 - 3) === 0, 'the two ratios 3 and 1/3 both give 3, 9, 27 (search over 8 ratios)'); C.model([729, 9, 39, 27]);
  });
}
{
  const n = range(1, 20).filter((k) => gpTerm(4, 3, k).eq(2916)), v = gpSum(4, 3, 7);
  Q('s305', mk.short({ marks: 3, stem: r`How many terms does the geometric progression $4, 12, 36, \ldots, 2916$ have, and what is the sum of all of them?`, model: r`Here $a = 4$, $r = 3$. From $4 \times 3^{n-1} = 2916$ we get $3^{n-1} = 729 = 3^6$, so $n = 7$. The sum is $S_7 = \dfrac{4(3^7 - 1)}{3 - 1} = \dfrac{4 \times 2186}{2} = 4372$.`, sol: 'Find $n$ from the last term, then use the sum formula.', scheme: [['$3^{n-1} = 729$', 1], ['$n = 7$', 1], ['$S_7 = \\dfrac{4 \\times 2186}{2} = 4372$', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => {
    C.assert(n.join() === '7' && v.eq(4372) && sumF(gpList(4, 3, 7)).eq(4372) && 3 ** 6 === 729, '7 terms, sum 4372 by formula and listing'); C.model([729, 7, 2186, 4372]);
  });
}
{
  const rr = fr(1).sub(fr(18, 27)), first3 = sumF(gpList(18, rr, 3)), tail = gpInf(18, rr).sub(first3);
  Q('s306', mk.short({ marks: 3, stem: r`An infinite geometric series has first term $18$ and sum $27$. Find its common ratio, the sum of its first three terms, and the sum of all the terms after the third.`, model: r`$\dfrac{18}{1 - r} = 27$ gives $1 - r = \dfrac{2}{3}$, so $r = \dfrac{1}{3}$. The first three terms are $18, 6, 2$ with sum $26$. The terms after the third add to $27 - 26 = 1$ (check: $\dfrac{a_4}{1 - r} = \dfrac{2/3}{2/3} = 1$).`, sol: 'The sum of the later terms is the total minus the sum already counted.', scheme: [['$r = \\dfrac{1}{3}$', 1], ['First three terms $18, 6, 2$ add to $26$', 1], ['Remaining sum $27 - 26 = 1$', 1]], d: 3, c: 'application', t: [2], time: 140 }), (C) => {
    C.assert(rr.eq(fr(1, 3)) && first3.eq(26) && tail.eq(1) && gpList(18, rr, 4)[3].div(fr(1).sub(rr)).eq(1), 'r = 1/3; first three terms 26; tail 1 (two routes)'); C.model([27, 26, 1]);
  });
}
{
  const v = recurring('3', '27');
  Q('s307', mk.short({ marks: 3, stem: r`Show that the recurring decimal $0.3\overline{27} = 0.3272727\ldots$ equals $\dfrac{18}{55}$.`, model: r`Write $0.3\overline{27} = 0.3 + 0.027 + 0.00027 + \cdots$. After the $0.3$, the terms form an infinite GP with first term $0.027$ and ratio $0.01$, with sum $\dfrac{0.027}{0.99} = \dfrac{27}{990} = \dfrac{3}{110}$. So the value is $\dfrac{3}{10} + \dfrac{3}{110} = \dfrac{33 + 3}{110} = \dfrac{36}{110} = \dfrac{18}{55}$.`, sol: 'Split off the non-repeating digit, then sum the GP of repeating blocks.', scheme: [['Split: $0.3$ plus a GP with $a = 0.027$, $r = 0.01$', 1], ['GP sum $\\dfrac{27}{990} = \\dfrac{3}{110}$', 1], ['Add: $\\dfrac{36}{110} = \\dfrac{18}{55}$', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => {
    C.assert(v.eq(fr(18, 55)) && decimals(v, 10) === '3272727272' && 33 + 3 === 36, '18/55 = 0.32727...'); C.model([27, 990, 3, 110, 36, 18, 55]);
  });
}
{
  let ok = true; for (let a = 1; a <= 30; a++) for (let b = 1; b <= 30; b++) if (!((a + b) * (a + b) >= 4 * a * b)) ok = false;
  let ok2 = true; for (let k = 1; k <= 400; k++) { const x = k / 20; if (x + 1 / x < 2 - 1e-12) ok2 = false; }
  Q('s308', mk.short({ marks: 3, stem: r`For two positive numbers $a$ and $b$, prove that $\dfrac{a + b}{2} \ge \sqrt{ab}$. Hence show that $x + \dfrac{1}{x} \ge 2$ for every $x > 0$.`, model: r`Since $a, b > 0$ the square roots are real and $\left(\sqrt{a} - \sqrt{b}\right)^2 \ge 0$. Expanding, $a - 2\sqrt{ab} + b \ge 0$, so $a + b \ge 2\sqrt{ab}$ and $\dfrac{a + b}{2} \ge \sqrt{ab}$, with equality only when $a = b$. Put $a = x$ and $b = \dfrac{1}{x}$: then $\dfrac{x + 1/x}{2} \ge \sqrt{x \cdot \dfrac{1}{x}} = 1$, so $x + \dfrac{1}{x} \ge 2$, with equality at $x = 1$.`, sol: 'Start from the square of a difference; then choose $b = 1/x$ so that the product is $1$.', scheme: [['$\\left(\\sqrt{a} - \\sqrt{b}\\right)^2 \\ge 0$ expanded', 1], ['Conclusion $\\dfrac{a + b}{2} \\ge \\sqrt{ab}$, equality iff $a = b$', 1], ['Put $a = x$, $b = \\dfrac{1}{x}$: $x + \\dfrac{1}{x} \\ge 2$', 1]], d: 3, c: 'analysis', t: [3], time: 170 }), (C) => {
    C.assert(ok && ok2 && fr(1).add(fr(1)).eq(2), '(a + b)^2 >= 4ab on 30 x 30 pairs; x + 1/x >= 2 on 400 values'); C.model([2, 1]);
  });
}
{
  const v = LS(10, (k) => k * (2 * k + 1));
  Q('s309', mk.short({ marks: 3, stem: r`Find the sum of the series $1 \cdot 3 + 2 \cdot 5 + 3 \cdot 7 + \cdots$ to $10$ terms.`, model: r`The factors $1, 2, 3, \ldots$ and $3, 5, 7, \ldots$ give the $k$th term $k(2k + 1) = 2k^2 + k$. So $S = 2\sum k^2 + \sum k = 2 \times 385 + 55 = 770 + 55 = 825$.`, sol: 'Find the $k$th term, then use the two standard sums for $n = 10$.', scheme: [['$k$th term $2k^2 + k$', 1], ['$\\sum k^2 = 385$ and $\\sum k = 55$', 1], ['$770 + 55 = 825$', 1]], d: 3, c: 'application', t: [4], time: 130 }), (C) => {
    C.assert(v === 825n && 2n * s2(10) + s1(10) === 825n && range(1, 10).map((k) => k * (2 * k + 1)).slice(0, 3).join() === '3,10,21', '825 by listing 10 products and by formula'); C.model([385, 55, 825]);
  });
}
{
  const t = [2, 9, 20, 35, 54], q = fitQuad(t), a12 = q.at(12);
  Q('s310', mk.short({ marks: 3, stem: r`The sequence $2, 9, 20, 35, 54, \ldots$ has constant second differences. Find its $n$th term and its twelfth term.`, model: r`First differences: $7, 11, 15, 19$. Second differences: $4, 4, 4$, so $2A = 4$ and $A = 2$. Let $a_n = 2n^2 + Bn + C$. From $a_1 = 2$: $B + C = 0$. From $a_2 = 9$: $2B + C = 1$. So $B = 1$, $C = -1$ and $a_n = 2n^2 + n - 1$. Check: $a_3 = 18 + 3 - 1 = 20$. Then $a_{12} = 288 + 12 - 1 = 299$.`, sol: 'The constant second difference is $2A$; two terms fix $B$ and $C$, the third checks them.', scheme: [['Second difference $4$, so $A = 2$', 1], ['$B = 1$, $C = -1$, so $a_n = 2n^2 + n - 1$', 1], ['$a_{12} = 299$', 1]], d: 3, c: 'application', t: [4], time: 160 }), (C) => {
    C.assert(diffs(t).join() === '7,11,15,19' && diffs(diffs(t)).join() === '4,4,4' && q.A.eq(2) && q.B.eq(1) && q.C.eq(-1) && a12.eq(299) && range(1, 5).every((n) => q.at(n).eq(t[n - 1])), 'a_n = 2n^2 + n - 1; a_12 = 299'); C.model([4, 2, 299]);
  });
}
{
  const i = L2(11, 20), ii = L3(5, 12);
  Q('s311', mk.short({ marks: 3, stem: r`Find the value of (i) $11^2 + 12^2 + \cdots + 20^2$ and (ii) $5^3 + 6^3 + \cdots + 12^3$.`, model: r`(i) $\sum_{1}^{20} k^2 - \sum_{1}^{10} k^2 = 2870 - 385 = 2485$.\n\n(ii) $\sum_{1}^{12} k^3 - \sum_{1}^{4} k^3 = \left(\dfrac{12 \times 13}{2}\right)^2 - \left(\dfrac{4 \times 5}{2}\right)^2 = 78^2 - 10^2 = 6084 - 100 = 5984$.`, sol: 'Subtract the sum to the term before the block, in both parts.', scheme: [['(i) $2870 - 385 = 2485$', 1], ['(ii) $78^2 = 6084$ and $10^2 = 100$', 1], ['(ii) $6084 - 100 = 5984$', 1]], d: 3, c: 'application', t: [4], time: 160 }), (C) => {
    C.assert(i === 2485n && ii === 5984n && s2(20) - s2(10) === 2485n && s3(12) - s3(4) === 5984n, '2485 and 5984 by listing and by formula'); C.model([2870, 385, 2485, 6084, 100, 5984]);
  });
}

// ============================================================ long, 5 marks
{
  const { a, d } = apFrom(3, 16, 9, 52), n112 = range(1, 60).filter((k) => apTerm(a, d, k).eq(112)), n1344 = range(1, 60).filter((k) => apSum(a, d, k).eq(1344));
  Q('l01', mk.long({ stem: r`In an arithmetic progression the third term is $16$ and the ninth term is $52$. Find

(a) the first term and the common difference, [1]

(b) the $n$th term, [1]

(c) the sum of the first $25$ terms, [1]

(d) the position of the term $112$, [1]

(e) the number of terms whose sum is $1344$. [1]`, model: r`(a) $a_9 - a_3 = 6d = 36$, so $d = 6$ and $a = 16 - 2 \times 6 = 4$.

(b) $a_n = 4 + (n - 1) \times 6 = 6n - 2$.

(c) $S_{25} = \dfrac{25}{2}\,[2 \times 4 + 24 \times 6] = \dfrac{25}{2} \times 152 = 1900$.

(d) $6n - 2 = 112$ gives $6n = 114$, so $n = 19$.

(e) $S_n = \dfrac{n}{2}\,[8 + 6(n - 1)] = n(3n + 1) = 1344$, so $3n^2 + n - 1344 = 0$. The discriminant is $1 + 16128 = 16129 = 127^2$, so $n = \dfrac{-1 + 127}{6} = 21$ (the negative root is rejected).`, sol: 'Use two given terms for $a$ and $d$, then the nth-term and sum formulas.', scheme: [['(a) $d = 6$, $a = 4$', 1], ['(b) $a_n = 6n - 2$', 1], ['(c) $S_{25} = 1900$', 1], ['(d) $n = 19$', 1], ['(e) quadratic $3n^2 + n - 1344 = 0$, $n = 21$', 1]], d: 3, c: 'application', t: [1], time: 330 }), (C) => {
    C.assert(a.eq(4) && d.eq(6) && apTerm(a, d, 25).num() === 148 && apSum(a, d, 25).eq(1900) && sumF(apList(a, d, 25)).eq(1900) && n112.join() === '19' && n1344.join() === '21' && 127 * 127 === 16129 && 1 + 4 * 3 * 1344 === 16129, 'a = 4, d = 6, a_n = 6n - 2, S_25 = 1900, n = 19, n = 21'); C.model([6, 4, 1900, 19, 16129, 21]);
  });
}
{
  const cost = (n) => fr(n).mul(fr(600).add(fr(50).mul(n - 1))).div(2), best = range(1, 40).filter((n) => cost(n).num() <= 9000).pop();
  Q('l02', mk.long({ stem: r`An imagined contractor digs a well and charges ₹300 for the first metre of depth and ₹50 more for each further metre than for the metre before it. Find

(a) the charge for the twelfth metre, [1]

(b) the total charge for a well $18$ metres deep, [1]

(c) the greatest depth that can be dug for a budget of ₹9000, [2]

(d) the money left unspent in part (c). [1]`, model: r`The charges form an AP with $a = 300$ and $d = 50$.

(a) $a_{12} = 300 + 11 \times 50 = 850$, so the charge is ₹850.

(b) $S_{18} = \dfrac{18}{2}\,[600 + 17 \times 50] = 9 \times 1450 = 13050$, so the total is ₹13050.

(c) $S_n = \dfrac{n}{2}\,[600 + 50(n - 1)] = 25n^2 + 275n \le 9000$, so $n^2 + 11n \le 360$. For $n = 14$: $196 + 154 = 350 \le 360$. For $n = 15$: $225 + 165 = 390 > 360$. The greatest depth is $14$ metres.

(d) $S_{14} = 25 \times 196 + 275 \times 14 = 4900 + 3850 = 8750$, so ₹9000 - ₹8750 = ₹250 is left.`, sol: 'Model the charges as an AP; test whole values of $n$ in the sum inequality.', scheme: [['(a) $a_{12} = 850$', 1], ['(b) $S_{18} = 13050$', 1], ['(c) inequality $n^2 + 11n \\le 360$', 1], ['(c) $n = 14$ works, $n = 15$ fails', 1], ['(d) $9000 - 8750 = 250$', 1]], d: 4, c: 'application', t: [1], time: 360 }), (C) => {
    C.assert(apTerm(300, 50, 12).eq(850) && cost(18).eq(13050) && sumF(apList(300, 50, 18)).eq(13050) && best === 14 && cost(14).eq(8750) && cost(15).num() > 9000 && 9000 - 8750 === 250, 'a_12 = 850, S_18 = 13050, deepest 14 m costing 8750, 250 left (all depths 1..40 tested)'); C.model([850, 13050, 360, 14, 15, 8750, 250]);
  });
}
{
  const S = (n) => gpSum(4, 3, n), first = range(1, 20).find((n) => S(n).num() > 5000);
  Q('l03', mk.long({ stem: r`In an imagined school, $4$ learners hear a piece of news in the first hour. In each later hour the number of learners hearing it for the first time is $3$ times the number in the hour before. Find

(a) the number who hear it for the first time in the sixth hour, [1]

(b) the total number who have heard it by the end of the sixth hour, [1]

(c) the first hour by the end of which more than $5000$ learners have heard it, [2]

(d) whether the learners hearing it in the seventh hour alone outnumber those who heard it in the first six hours together. [1]`, model: r`The numbers in successive hours form a GP with $a = 4$ and $r = 3$.

(a) $a_6 = 4 \times 3^5 = 4 \times 243 = 972$.

(b) $S_6 = \dfrac{4(3^6 - 1)}{3 - 1} = \dfrac{4 \times 728}{2} = 1456$.

(c) $S_n = 2(3^n - 1) > 5000$ means $3^n > 2501$. Now $S_7 = 2 \times 2186 = 4372$, which is not above $5000$, and $S_8 = 2 \times 6560 = 13120$, which is. So it is the eighth hour.

(d) $a_7 = 4 \times 3^6 = 2916$, and $2916 > 1456 = S_6$, so yes, they do.`, sol: 'Model the news as a GP; compare partial sums with the bound by testing whole hours.', scheme: [['(a) $a_6 = 972$', 1], ['(b) $S_6 = 1456$', 1], ['(c) $S_n = 2(3^n - 1)$, $S_7 = 4372$', 1], ['(c) $S_8 = 13120$, so the eighth hour', 1], ['(d) $2916 > 1456$', 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => {
    C.assert(gpTerm(4, 3, 6).eq(972) && S(6).eq(1456) && sumF(gpList(4, 3, 6)).eq(1456) && S(7).eq(4372) && S(8).eq(13120) && first === 8 && gpTerm(4, 3, 7).eq(2916) && gpTerm(4, 3, 7).num() > S(6).num(), 'a_6 = 972, S_6 = 1456, first n with S_n > 5000 is 8, a_7 = 2916 > S_6'); C.model([972, 1456, 4372, 13120, 2916]);
  });
}
{
  const frac = recurring('', '45', 2), dist = fr(20).add(fr(2).mul(gpInf(12, fr(3, 5)))), reb4 = fr(20).mul(fr(3, 5).pow(4)), nb = range(1, 30).find((k) => fr(20).mul(fr(3, 5).pow(k)).lt(1));
  Q('l04', mk.long({ stem: r`(a) Express $2.\overline{45} = 2.454545\ldots$ as a fraction in lowest terms. [1]

An imagined ball is dropped from a height of $20$ m. Each time it hits the ground it rebounds to $\dfrac{3}{5}$ of the height from which it fell. Find

(b) the total distance the ball travels before it comes to rest, [2]

(c) the height of the fourth rebound, [1]

(d) the number of the first rebound that is lower than $1$ m. [1]`, model: r`(a) $2.\overline{45} = 2 + \dfrac{0.45}{1 - 0.01} = 2 + \dfrac{45}{99} = 2 + \dfrac{5}{11} = \dfrac{27}{11}$.

(b) The first fall is $20$ m. The rebound heights are $12, 7.2, \ldots$, a GP with $a = 12$ and $r = \dfrac{3}{5}$, and each rebound is travelled up and down. The total is $20 + 2 \times \dfrac{12}{1 - 3/5} = 20 + 2 \times 30 = 80$ m.

(c) The fourth rebound height is $20 \times \left(\dfrac{3}{5}\right)^4 = 20 \times \dfrac{81}{625} = 2.592$ m.

(d) We need $20\left(\dfrac{3}{5}\right)^n < 1$. For $n = 5$ the height is $1.5552$ m, which is not below $1$ m; for $n = 6$ it is $0.93312$ m, which is. So it is the sixth rebound.`, sol: 'Treat the repeating digits and the rebound distances as infinite geometric series.', scheme: [['(a) $2 + \\dfrac{5}{11} = \\dfrac{27}{11}$', 1], ['(b) rebound heights form a GP with $a = 12$, $r = \\dfrac{3}{5}$', 1], ['(b) total $20 + 2 \\times 30 = 80$ m', 1], ['(c) $20 \\times \\dfrac{81}{625} = 2.592$ m', 1], ['(d) $n = 5$ gives $1.5552$ m, $n = 6$ gives $0.93312$ m: the sixth', 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => {
    C.assert(frac.eq(fr(27, 11)) && decimals(frac.sub(2), 8) === '45454545' && gpInf(12, fr(3, 5)).eq(30) && dist.eq(80) && reb4.eq(fr(324, 125)) && Math.abs(reb4.num() - 2.592) < 1e-12 && nb === 6 && fr(20).mul(fr(3, 5).pow(5)).num() > 1, '27/11; total 80; 2.592; sixth rebound'); C.model([27, 11, 80, 2.592, 1.5552, 0.93312]);
  });
}
{
  const pairs = [];
  for (let a = 1; a <= 60; a++) for (let b = a; b <= 60; b++) if (a + b === 40 && a * b === 256) pairs.push([a, b]);
  const m = apMeans(8, 32, 2);
  Q('l05', mk.long({ stem: r`(a) Prove that for two positive numbers $a$ and $b$ the arithmetic mean is at least the geometric mean, and state when they are equal. [2]

(b) The arithmetic mean of two positive numbers is $20$ and their geometric mean is $16$. Find the numbers. [2]

(c) Insert two arithmetic means between these two numbers. [1]`, model: r`(a) Since $a, b > 0$, $\left(\sqrt{a} - \sqrt{b}\right)^2 \ge 0$, so $a - 2\sqrt{ab} + b \ge 0$ and $\dfrac{a + b}{2} \ge \sqrt{ab}$. Equality holds only when $\sqrt{a} = \sqrt{b}$, that is $a = b$.

(b) $a + b = 40$ and $ab = 256$, so the numbers are the roots of $x^2 - 40x + 256 = 0$. The discriminant is $1600 - 1024 = 576 = 24^2$, so $x = \dfrac{40 \pm 24}{2} = 32$ or $8$. The numbers are $8$ and $32$.

(c) There are $4$ terms, so $d = \dfrac{32 - 8}{3} = 8$ and the means are $16$ and $24$.`, sol: 'Use the square of a difference for (a); sum and product give a quadratic in (b).', scheme: [['(a) $\\left(\\sqrt{a} - \\sqrt{b}\\right)^2 \\ge 0$ expanded to $a + b \\ge 2\\sqrt{ab}$', 1], ['(a) equality iff $a = b$', 1], ['(b) $a + b = 40$, $ab = 256$ and $x^2 - 40x + 256 = 0$', 1], ['(b) the numbers $8$ and $32$', 1], ['(c) $d = 8$; means $16, 24$', 1]], d: 3, c: 'analysis', t: [3], time: 330 }), (C) => {
    C.assert(pairs.length === 1 && pairs[0].join() === '8,32' && 1600 - 1024 === 576 && Math.sqrt(8 * 32) === 16 && m.map((x) => x.str()).join() === '16,24', 'numbers 8 and 32; means 16 and 24'); C.model([40, 256, 576, 8, 32, 16, 24]);
  });
}
{
  let ok = true; for (let n = 1; n <= 30; n++) if (LS(n, (k) => k * (k + 1)) !== BigInt(n) * BigInt(n + 1) * BigInt(n + 2) / 3n) ok = false;
  const b = LS(15, (k) => k * (k + 1)), c = LS(12, (k) => k * (k + 2));
  Q('l06', mk.long({ stem: r`(a) Using the standard sums, show that $1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \cdots + n(n + 1) = \dfrac{n(n + 1)(n + 2)}{3}$. [2]

(b) Hence find the value of the sum when $n = 15$. [1]

(c) Find $1 \cdot 3 + 2 \cdot 4 + 3 \cdot 5 + \cdots$ to $12$ terms. [2]`, model: r`(a) The $k$th term is $k(k + 1) = k^2 + k$. So the sum is $\dfrac{n(n + 1)(2n + 1)}{6} + \dfrac{n(n + 1)}{2} = \dfrac{n(n + 1)\,[(2n + 1) + 3]}{6} = \dfrac{n(n + 1)(2n + 4)}{6} = \dfrac{n(n + 1)(n + 2)}{3}$.

(b) For $n = 15$: $\dfrac{15 \times 16 \times 17}{3} = 5 \times 16 \times 17 = 1360$.

(c) The $k$th term is $k(k + 2) = k^2 + 2k$. For $12$ terms: $\sum k^2 + 2\sum k = \dfrac{12 \times 13 \times 25}{6} + 2 \times \dfrac{12 \times 13}{2} = 650 + 156 = 806$.`, sol: 'Write each term as a polynomial in $k$ and split it into standard sums.', scheme: [['(a) $k^2 + k$ split into $\\sum k^2 + \\sum k$', 1], ['(a) common factor and simplification to $\\dfrac{n(n+1)(n+2)}{3}$', 1], ['(b) $\\dfrac{15 \\times 16 \\times 17}{3} = 1360$', 1], ['(c) $k$th term $k^2 + 2k$ and $\\sum k^2 = 650$', 1], ['(c) $650 + 156 = 806$', 1]], d: 4, c: 'application', t: [4], time: 330 }), (C) => {
    C.assert(ok && b === 1360n && c === 806n && s2(12) === 650n && 2n * s1(12) === 156n, 'identity for n = 1..30; 1360; 806'); C.model([1360, 650, 156, 806, 6]);
  });
}
{
  const t = [3, 8, 17, 30, 47], q = fitQuad(t), tot = LS(10, (k) => 2 * k * k - k + 2);
  Q('l07', mk.long({ stem: r`The sequence $3, 8, 17, 30, 47, \ldots$ has constant second differences. Find

(a) its $n$th term, [2]

(b) its fifteenth term, [1]

(c) the sum of its first $10$ terms. [2]`, model: r`(a) First differences: $5, 9, 13, 17$. Second differences: $4, 4, 4$, so $2A = 4$ and $A = 2$. Let $a_n = 2n^2 + Bn + C$. From $a_1 = 3$: $B + C = 1$. From $a_2 = 8$: $2B + C = 0$. So $B = -1$ and $C = 2$, giving $a_n = 2n^2 - n + 2$. Check: $a_3 = 18 - 3 + 2 = 17$.

(b) $a_{15} = 2 \times 225 - 15 + 2 = 437$.

(c) $S_{10} = 2\sum k^2 - \sum k + 2 \times 10 = 2 \times 385 - 55 + 20 = 770 - 55 + 20 = 735$.`, sol: 'Fit the quadratic from the second difference, then split the sum into standard sums.', scheme: [['(a) second difference $4$, so $A = 2$', 1], ['(a) $B = -1$, $C = 2$: $a_n = 2n^2 - n + 2$', 1], ['(b) $a_{15} = 437$', 1], ['(c) $2 \\times 385 - 55 + 20$', 1], ['(c) $S_{10} = 735$', 1]], d: 4, c: 'application', t: [4], time: 330 }), (C) => {
    C.assert(diffs(t).join() === '5,9,13,17' && diffs(diffs(t)).join() === '4,4,4' && q.A.eq(2) && q.B.eq(-1) && q.C.eq(2) && q.at(15).eq(437) && range(1, 5).every((n) => q.at(n).eq(t[n - 1])) && tot === 735n && 2n * s2(10) - s1(10) + 20n === 735n, 'a_n = 2n^2 - n + 2, a_15 = 437, S_10 = 735'); C.model([4, 437, 385, 55, 735]);
  });
}

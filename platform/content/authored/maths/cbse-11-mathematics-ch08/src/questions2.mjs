// CBSE 11 Mathematics ch08 Sequences and Series — written items (short 2 and 3 marks, long 5 marks, case-based) with re-solve
// checks. Every term, sum and mean in a model answer is computed with exact rationals and checked against the listed sequence.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, range, Rat, q, ap, gp, apFromTwo, apFromSumRule, am, amGm, gmExact, insertAMs, insertGMs, infSum, recurring, sumList, ratioOf, N, tx } from './seq.mjs';

// =============================================================== short answer, 2 marks
{
  const a = (n) => (-1) ** n * n * n, L = range(1, 5).map(a), d = L.slice(1).map((x, i) => x - L[i]);
  Q('s201', mk.short({ marks: 2, stem: r`Write the first five terms of the sequence whose $n$th term is $a_n = (-1)^n n^2$, and state whether the sequence is an arithmetic progression.`, model: r`$a_1 = -1$, $a_2 = 4$, $a_3 = -9$, $a_4 = 16$, $a_5 = -25$.\n\nThe differences are $${d.join(', ')}$, which are not equal, so it is not an arithmetic progression.`, sol: 'Put n = 1 to 5, then compare consecutive differences.', scheme: [['The five terms -1, 4, -9, 16, -25', 1], ['Unequal differences, so not an AP', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(L.join() === '-1,4,-9,16,-25' && new Set(d).size > 1 && d.join() === '5,-13,25,-41', 'terms and unequal differences'); Cx.model([4, 9, 16, 25, 13, 41]); });
}
{
  const g = apFromSumRule(2, 5);
  Q('s202', mk.short({ marks: 2, stem: r`The sum of the first $n$ terms of a sequence is $S_n = 2n^2 + 5n$. Find its first term and its $n$th term.`, model: r`$a_1 = S_1 = 2 + 5 = ${g.sum(1)}$.\n\nFor $n \ge 2$: $a_n = S_n - S_{n-1} = 2n^2 + 5n - \left[2(n-1)^2 + 5(n-1)\right] = 4n + 3$. The formula also gives $a_1 = 7$, so $a_n = 4n + 3$ for every $n$.`, sol: 'Subtract consecutive sums, and treat n = 1 separately.', scheme: [['a_1 = S_1 = 7', 1], ['a_n = S_n - S_(n-1) = 4n + 3', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(g.a.eq(7) && g.d.eq(4) && range(1, 30).every((n) => g.term(n).eq(4 * n + 3)), 'a_n = 4n + 3'); Cx.model([7, 3]); });
}
{
  const g = ap(5, 6), n = g.whichTerm(59), S = g.sum(10);
  Q('s203', mk.short({ marks: 2, stem: r`Find the number of terms in the series $5 + 11 + 17 + \cdots + 59$ and its sum.`, model: r`This is an arithmetic progression with $a = 5$, $d = 6$ and last term $59$. From $5 + (n - 1)6 = 59$ we get $n = ${n}$.\n\n$S = \dfrac{n}{2}(a + l) = \dfrac{${n}}{2}(5 + 59) = ${S}$.`, sol: 'First find n from the last term, then use the sum formula.', scheme: [['n = 10 from 5 + (n - 1)6 = 59', 1], ['S = 5 x 64 = 320', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(n === 10 && S.eq(320) && sumList(g.list(10)).eq(320) && g.term(10).eq(59), '10 terms, sum 320'); Cx.model([10, 320]); });
}
{
  const g = gp(3, 2);
  Q('s204', mk.short({ marks: 2, stem: r`The third term of a geometric progression of positive terms is $12$ and its fifth term is $48$. Find the first term and the common ratio.`, model: r`Dividing, $\dfrac{ar^4}{ar^2} = r^2 = \dfrac{48}{12} = 4$, and the terms are positive, so $r = 2$.\n\nThen $ar^2 = 4a = 12$ gives $a = 3$. (The progression is $3, 6, 12, 24, 48, \ldots$)`, sol: 'Divide the fifth term by the third to isolate r squared.', scheme: [['r^2 = 4, so r = 2', 1], ['a = 3', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(g.term(3).eq(12) && g.term(5).eq(48) && g.list(5).join() === '3,6,12,24,48', 'a = 3, r = 2'); Cx.model([2, 3]); });
}
{
  const g = gp(729, '-1/3'), S = g.sum(6);
  Q('s205', mk.short({ marks: 2, stem: r`Find the sum of the first six terms of the geometric progression $729, -243, 81, \ldots$`, model: r`Here $a = 729$ and $r = -\dfrac{1}{3}$. Then $S_6 = \dfrac{a(1 - r^6)}{1 - r} = \dfrac{729\left(1 - \frac{1}{729}\right)}{\frac{4}{3}} = \dfrac{728}{4/3} = ${S}$.\n\nCheck by adding: $729 - 243 + 81 - 27 + 9 - 3 = ${S}$.`, sol: 'Use the form with 1 - r^n, because the ratio is below 1 in size.', scheme: [['a = 729, r = -1/3 and the formula', 1], ['S_6 = 546, with the check', 1]], d: 3, c: 'understanding', t: [2], time: 105 }), (Cx) => { Cx.assert(g.list(6).join() === '729,-243,81,-27,9,-3' && S.eq(546), '546'); Cx.model([546, 728]); });
}
{
  const S = infSum(1, '-1/4');
  Q('s206', mk.short({ marks: 2, stem: r`Find the sum of the infinite geometric series $1 - \dfrac{1}{4} + \dfrac{1}{16} - \dfrac{1}{64} + \cdots$ and say why the sum exists.`, model: r`The common ratio is $r = -\dfrac{1}{4}$, and $|r| < 1$, so the sum exists.\n\n$S = \dfrac{a}{1 - r} = \dfrac{1}{1 + \frac{1}{4}} = \dfrac{4}{5}$.`, sol: 'Check that the size of r is below 1, then use a over 1 minus r.', scheme: [['|r| = 1/4 < 1, so a sum exists', 1], ['S = 1 / (5/4) = 4/5', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(S.eq('4/5') && gp(1, '-1/4').list(4).join() === '1,-1/4,1/16,-1/64', '4/5'); Cx.model([5, 4]); });
}
{
  const { value } = recurring('', '81');
  Q('s207', mk.short({ marks: 2, stem: r`Express the recurring decimal $0.\overline{81} = 0.818181\ldots$ as a fraction in lowest terms.`, model: r`$0.818181\ldots = 0.81 + 0.0081 + 0.000081 + \cdots$ is a geometric series with $a = 0.81$ and $r = 0.01$.\n\n$S = \dfrac{0.81}{1 - 0.01} = \dfrac{0.81}{0.99} = \dfrac{81}{99} = \dfrac{9}{11}$.`, sol: 'Read the repeating block as the first term of a geometric series.', scheme: [['Series with a = 0.81 and r = 0.01', 1], ['0.81 / 0.99 = 9/11', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(value.eq('9/11'), '9/11'); Cx.model([81, 99, 11]); });
}
{
  const x = amGm(4, 25);
  Q('s208', mk.short({ marks: 2, stem: r`Find the arithmetic mean and the geometric mean of $4$ and $25$, and verify that the arithmetic mean is the larger.`, model: r`$A = \dfrac{4 + 25}{2} = ${x.A.dtex()}$ and $G = \sqrt{4 \times 25} = \sqrt{100} = ${x.G}$.\n\nSince $14.5 > 10$, the arithmetic mean is the larger, as $A \ge G$ requires.`, sol: 'Compute both means, then compare.', scheme: [['A = 14.5', 1], ['G = 10 and the comparison', 1]], d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(x.A.eq('29/2') && x.G.eq(10) && x.A.gt(x.G), 'A = 14.5, G = 10'); Cx.model([14.5, 10]); });
}
{
  const [s] = insertGMs(6, 162, 2);
  Q('s209', mk.short({ marks: 2, stem: r`Insert two geometric means between $6$ and $162$.`, model: r`Four terms $6, G_1, G_2, 162$ are in geometric progression with $a = 6$ and $r^3 = \dfrac{162}{6} = 27$, so $r = 3$.\n\nThe means are $G_1 = 6 \times 3 = ${s.means[0]}$ and $G_2 = 18 \times 3 = ${s.means[1]}$.`, sol: 'With two means there are four terms, so r cubed is the ratio of the end terms.', scheme: [['r^3 = 27, r = 3', 1], ['Means 18 and 54', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(insertGMs(6, 162, 2).length === 1 && s.r.eq(3) && s.all.join() === '6,18,54,162', '6, 18, 54, 162'); Cx.model([3, 18, 54]); });
}
{
  const ins = insertAMs(7, 42, 4);
  Q('s210', mk.short({ marks: 2, stem: r`Insert four arithmetic means between $7$ and $42$.`, model: r`There are $6$ terms in all, so $d = \dfrac{42 - 7}{5} = ${ins.d}$.\n\nThe means are $7 + 7 = ${ins.means[0]}$, $${ins.means[1]}$, $${ins.means[2]}$ and $${ins.means[3]}$.`, sol: 'Four means make six terms, so there are five equal steps.', scheme: [['d = 35 / 5 = 7', 1], ['The means 14, 21, 28, 35', 1]], d: 2, c: 'application', t: [3], time: 75 }), (Cx) => { Cx.assert(ins.d.eq(7) && ins.all.join() === '7,14,21,28,35,42', '14, 21, 28, 35'); Cx.model([7, 14, 21, 28, 35]); });
}

// =============================================================== short answer, 3 marks
{
  const hits = []; for (let a = -20; a <= 20; a++) for (let dd = -20; dd <= 20; dd++) if (3 * a === 24 && (a - dd) * a * (a + dd) === 440 && dd >= 0) hits.push([a - dd, a, a + dd]);
  Q('s301', mk.short({ marks: 3, stem: r`Three numbers are in arithmetic progression. Their sum is $24$ and their product is $440$. Find the numbers.`, model: r`Take the numbers as $a - d$, $a$ and $a + d$. The sum is $3a = 24$, so $a = 8$.\n\nThe product is $8(64 - d^2) = 440$, so $64 - d^2 = 55$ and $d^2 = 9$, giving $d = \pm 3$.\n\nThe numbers are $5, 8, 11$ (or $11, 8, 5$). Check: $5 \times 8 \times 11 = 440$.`, sol: 'Using a - d, a, a + d makes the sum depend on a alone.', scheme: [['Terms a - d, a, a + d and a = 8', 1], ['(a - d)(a + d) = 55 so d = 3', 1], ['Numbers 5, 8, 11 with the check', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(hits.join('|') === '5,8,11' && 5 * 8 * 11 === 440, '5, 8, 11'); Cx.model([8, 3, 5, 11, 440]); });
}
{
  const a = [1, 1]; for (let n = 2; n < 10; n++) a.push(a[n - 1] + a[n - 2]);
  const S = a.reduce((s, x) => s + x, 0);
  Q('s302', mk.short({ marks: 3, stem: r`A sequence has $a_1 = a_2 = 1$ and $a_{n+2} = a_{n+1} + a_n$. List its first ten terms and show that their sum is $11$ times the seventh term.`, model: r`The terms are $${a.join(', ')}$.\n\nTheir sum is $1 + 1 + 2 + 3 + 5 + 8 + 13 + 21 + 34 + 55 = ${S}$.\n\nThe seventh term is $a_7 = ${a[6]}$ and $11 \times ${a[6]} = ${11 * a[6]}$, which equals the sum.`, sol: 'Build the terms by adding the previous two, then add and compare.', scheme: [['The ten terms listed', 1], ['Sum 143', 1], ['a_7 = 13 and 11 x 13 = 143', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(a.join() === '1,1,2,3,5,8,13,21,34,55' && S === 143 && 11 * a[6] === 143, '143 = 11 x 13'); Cx.model([55, 143, 13]); });
}
{
  const sols = []; for (let a = 1; a <= 216; a++) for (let b = 1; b <= 216; b++) for (let c = 1; c <= 216; c++) { if (a * b * c === 216 && b * b === a * c && a + b + c === 21) sols.push([a, b, c]); }
  Q('s303', mk.short({ marks: 3, stem: r`Three positive numbers are in geometric progression. Their product is $216$ and their sum is $21$. Find the numbers.`, model: r`Take the numbers as $\dfrac{a}{r}$, $a$ and $ar$. The product is $a^3 = 216$, so $a = 6$.\n\nThe sum gives $\dfrac{6}{r} + 6 + 6r = 21$, so $6r^2 - 15r + 6 = 0$, i.e. $2r^2 - 5r + 2 = 0$ and $(2r - 1)(r - 2) = 0$.\n\nSo $r = 2$ or $r = \dfrac{1}{2}$, and the numbers are $3, 6, 12$ (or $12, 6, 3$).`, sol: 'The choice a/r, a, ar makes the product a cube.', scheme: [['a cubed = 216, a = 6', 1], ['Quadratic 2r^2 - 5r + 2 = 0', 1], ['r = 2 or 1/2, numbers 3, 6, 12', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(sols.map(String).join('|') === '3,6,12|12,6,3' && gp(3, 2).list(3).join() === '3,6,12', '3, 6, 12'); Cx.model([6, 3, 12]); });
}
{
  const g = gp(2, 3);
  Q('s304', mk.short({ marks: 3, stem: r`The sum of the first three terms of a geometric progression is $26$ and the sum of its first six terms is $728$. Find the first term and the common ratio.`, model: r`$S_6 = S_3 + r^3 S_3$, so $\dfrac{S_6}{S_3} = 1 + r^3 = \dfrac{728}{26} = 28$, giving $r^3 = 27$ and $r = 3$.\n\nThen $S_3 = \dfrac{a(3^3 - 1)}{3 - 1} = 13a = 26$, so $a = 2$. Check: $2 + 6 + 18 = 26$.`, sol: 'The last three of six terms are r cubed times the first three.', scheme: [['S_6 = S_3 (1 + r^3)', 1], ['r^3 = 27, r = 3', 1], ['a = 2 with the check', 1]], d: 4, c: 'analysis', t: [2], time: 165 }), (Cx) => { Cx.assert(g.sum(3).eq(26) && g.sum(6).eq(728) && g.sum(6).div(g.sum(3)).eq(28) && g.sum(3).eq(g.a.mul(13)), 'a = 2, r = 3'); Cx.model([28, 27, 3, 2, 26]); });
}
{
  const rr = Rat.of(1).sub(Rat.of(10).div(40)), g = gp(10, rr), S = infSum(10, rr), tail = S.sub(g.sum(2));
  Q('s305', mk.short({ marks: 3, stem: r`An infinite geometric series has first term $10$ and sum $40$. Find its common ratio, its second term, and the sum of all terms from the third term onwards.`, model: r`$\dfrac{10}{1 - r} = 40$ gives $1 - r = \dfrac{1}{4}$, so $r = \dfrac{3}{4}$.\n\nThe second term is $10 \times \dfrac{3}{4} = ${g.term(2).dtex()}$.\n\nThe terms from the third onwards add up to $40 - 10 - 7.5 = ${tail.dtex()}$.`, sol: 'Subtract the first two terms from the whole sum.', scheme: [['r = 3/4', 1], ['Second term 7.5', 1], ['Remaining sum 22.5', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(rr.eq('3/4') && g.term(2).eq('15/2') && tail.eq('45/2') && infSum(g.term(3), rr).eq(tail), '3/4, 7.5, 22.5'); Cx.model([3, 4, 7.5, 22.5]); });
}
{
  const { value } = recurring('4', '18');
  Q('s306', mk.short({ marks: 3, stem: r`Show that $0.4\overline{18} = 0.4181818\ldots$ equals $\dfrac{23}{55}$.`, model: r`Split the decimal as $0.4 + 0.018 + 0.00018 + \cdots$. The terms after $0.4$ form a geometric series with $a = 0.018$ and $r = 0.01$.\n\nIts sum is $\dfrac{0.018}{0.99} = \dfrac{18}{990} = \dfrac{1}{55}$.\n\nSo the decimal equals $\dfrac{2}{5} + \dfrac{1}{55} = \dfrac{22}{55} + \dfrac{1}{55} = \dfrac{23}{55}$.`, sol: 'Keep the non-repeating 0.4 apart, then sum the repeating part as a series.', scheme: [['Split as 0.4 plus a geometric series', 1], ['Sum of the series is 1/55', 1], ['2/5 + 1/55 = 23/55', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(value.eq('23/55') && infSum('18/1000', '1/100').eq('1/55'), '23/55'); Cx.model([55, 23, 22]); });
}
{
  const pairs = []; for (let a = 1; a <= 30; a++) for (let b = 1; b <= 30; b++) pairs.push([a, b]);
  const ok = pairs.every(([a, b]) => { const x = amGm(a, b); return x.gap2.sign() >= 0; });
  Q('s307', mk.short({ marks: 3, stem: r`For two positive numbers $a$ and $b$, prove that their arithmetic mean is at least their geometric mean, and state when the two means are equal.`, model: r`Since $\left(\sqrt{a} - \sqrt{b}\right)^2 \ge 0$, we have $a - 2\sqrt{ab} + b \ge 0$.\n\nHence $a + b \ge 2\sqrt{ab}$, that is $\dfrac{a + b}{2} \ge \sqrt{ab}$.\n\nEquality needs $\left(\sqrt{a} - \sqrt{b}\right)^2 = 0$, that is $a = b$. (Example: $a = 4$, $b = 9$ gives $6.5 > 6$.)`, sol: 'Expand the square of a difference of square roots.', scheme: [['Start from the square being non-negative', 1], ['Rearrange to a + b >= 2 sqrt(ab)', 1], ['Equality exactly when a = b', 1]], d: 3, c: 'understanding', t: [3], time: 135 }), (Cx) => { Cx.assert(ok && amGm(4, 9).A.eq('13/2') && amGm(4, 9).G.eq(6) && amGm(7, 7).gap2.isZero(), 'A >= G on 900 pairs; equality at a = b'); Cx.model([6.5]); });
}
{
  const res = insertGMs(3, 2187, 5);
  const pos = res.find((x) => x.r.sign() > 0), neg = res.find((x) => x.r.sign() < 0);
  Q('s308', mk.short({ marks: 3, stem: r`Insert five geometric means between $3$ and $2187$. How many sets of means are possible?`, model: r`There are $7$ terms, so $r^6 = \dfrac{2187}{3} = 729 = 3^6$, giving $r = 3$ or $r = -3$.\n\nFor $r = 3$ the means are $${pos.means.join(', ')}$.\n\nFor $r = -3$ they are $${neg.means.join(', ')}$.\n\nSo there are two sets of means.`, sol: 'An even power of r allows both signs.', scheme: [['r^6 = 729', 1], ['r = 3: 9, 27, 81, 243, 729', 1], ['r = -3 gives the second set', 1]], d: 4, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(res.length === 2 && pos.r.eq(3) && neg.r.eq(-3) && pos.means.join() === '9,27,81,243,729' && neg.means.join() === '-9,27,-81,243,-729', 'two sets of means'); Cx.model([729, 9, 27, 81, 243]); });
}
{
  const pairs = []; for (let p = 1; p <= 30; p++) for (let s = 1; s <= 30; s++) { const x = amGm(p, s); if (x.A.mul(x.A).mul(16).eq(Rat.of(p).mul(s).mul(25))) pairs.push([p, s]); }
  const x = amGm(4, 1);
  Q('s309', mk.short({ marks: 3, stem: r`The arithmetic mean and the geometric mean of two positive numbers $a$ and $b$ are in the ratio $5 : 4$. Find the ratio $a : b$ (with $a > b$).`, model: r`Given $\dfrac{A}{G} = \dfrac{5}{4}$, so $\dfrac{(a + b)^2}{4ab} = \dfrac{25}{16}$.\n\nPut $\dfrac{a}{b} = t$: $\dfrac{(t + 1)^2}{4t} = \dfrac{25}{16}$ gives $16t^2 + 32t + 16 = 100t$, i.e. $4t^2 - 17t + 4 = 0$ and $(4t - 1)(t - 4) = 0$.\n\nSince $a > b$, $t = 4$, so $a : b = 4 : 1$. Check: $A = 2.5$ and $G = 2$ for $4$ and $1$.`, sol: 'Square the ratio so the square root disappears, then divide by b squared.', scheme: [['(a + b)^2 / (4ab) = 25/16', 1], ['4t^2 - 17t + 4 = 0', 1], ['t = 4, ratio 4 : 1 with a check', 1]], d: 4, c: 'analysis', t: [3], time: 165 }), (Cx) => { Cx.assert(x.A.eq('5/2') && x.G.eq(2) && pairs.some(([a, b]) => a === 4 * b) && pairs.every(([a, b]) => a === 4 * b || b === 4 * a), 'a : b = 4 : 1'); Cx.model([4, 17, 25, 16]); });
}

// =============================================================== long answer, 5 marks
{
  const g = apFromTwo(5, 27, 12, 76), n223 = g.whichTerm(223);
  let firstOver = null; for (let n = 1; n <= 60; n++) if (g.sum(n).gt(1000)) { firstOver = n; break; }
  Q('l01', mk.long({ stem: r`In an arithmetic progression the fifth term is $27$ and the twelfth term is $76$. Find (a) the common difference and the first term; (b) the $n$th term; (c) the sum of the first $20$ terms; (d) the position of the term $223$; (e) the least number of terms whose sum exceeds $1000$.`, model: r`**(a)** The seven steps from the 5th to the 12th term add $76 - 27 = 49$, so $d = 7$. Then $a = 27 - 4 \times 7 = ${g.a}$.\n\n**(b)** $a_n = -1 + (n - 1)7 = 7n - 8$.\n\n**(c)** $S_{20} = \dfrac{20}{2}\left[2(-1) + 19 \times 7\right] = 10 \times 131 = ${g.sum(20)}$.\n\n**(d)** $7n - 8 = 223$ gives $n = ${n223}$.\n\n**(e)** $S_n = \dfrac{n}{2}(7n - 9)$. $S_{17} = ${g.sum(17)}$ is not above $1000$, but $S_{18} = ${g.sum(18)}$ is, so the least number is $${firstOver}$.`, sol: 'Find d from the two given terms first; the later parts then follow from a and d.', scheme: [['(a) d = 7 and a = -1', 1], ['(b) a_n = 7n - 8', 1], ['(c) S_20 = 1310', 1], ['(d) 223 is the 33rd term', 1], ['(e) S_17 = 935 and S_18 = 1053, so n = 18', 1]], d: 3, c: 'application', t: [1], time: 360 }), (Cx) => { Cx.assert(g.d.eq(7) && g.a.eq(-1) && range(1, 40).every((n) => g.term(n).eq(7 * n - 8)) && g.sum(20).eq(1310) && n223 === 33 && g.sum(17).eq(935) && g.sum(18).eq(1053) && firstOver === 18, 'd = 7, S20 = 1310, n = 33, n = 18'); Cx.model([7, 1, 1310, 33, 935, 1053, 18]); });
}
{
  const g = ap(60, '-12/5'), ins = insertAMs(60, 36, 9), n = g.whichTerm('192/5');
  Q('l02', mk.long({ stem: r`The imagined Bamboo Lane workshop makes a ladder with $11$ rungs whose lengths decrease by the same amount from the bottom rung to the top rung. The bottom rung is $60$ cm long and the top rung is $36$ cm long. Find (a) the decrease in length from one rung to the next; (b) the length of the seventh rung; (c) the total length of bamboo used for all the rungs; (d) the number of the rung whose length is $38.4$ cm.`, model: r`The rung lengths form an arithmetic progression with $a = 60$ and $a_{11} = 36$.\n\n**(a)** $60 + 10d = 36$ gives $d = -2.4$, so each rung is $2.4$ cm shorter.\n\n**(b)** $a_7 = 60 + 6(-2.4) = ${g.term(7).dtex()}$ cm.\n\n**(c)** $S_{11} = \dfrac{11}{2}(60 + 36) = ${g.sum(11)}$ cm.\n\n**(d)** $60 + (n - 1)(-2.4) = 38.4$ gives $n - 1 = 9$, so it is rung number $${n}$.`, sol: 'Treat the rung lengths as an AP with 11 terms and use first and last terms.', scheme: [['(a) 60 + 10d = 36, d = -2.4', 1], ['(b) 7th rung 45.6 cm', 1], ['(c) S_11 = 11/2 x 96 = 528', 1.5], ['(d) rung number 10', 1.5]], d: 3, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(ins.d.eq('-12/5') && g.term(11).eq(36) && g.term(7).eq('228/5') && g.sum(11).eq(528) && n === 10 && g.sum(11).eq(am(60, 36).mul(11)), 'd = -2.4, a_7 = 45.6, S = 528, rung 10'); Cx.model([2.4, 45.6, 528, 10]); });
}
{
  const g = gp(80, '-1/2'), L = g.list(6), S = infSum(80, '-1/2');
  Q('l03', mk.long({ stem: r`In a geometric progression the third term is $20$ and the sixth term is $-\dfrac{5}{2}$. Find (a) the common ratio and the first term; (b) the first six terms; (c) the ninth term; (d) the sum to infinity.`, model: r`**(a)** $r^3 = \dfrac{-5/2}{20} = -\dfrac{1}{8}$, so $r = -\dfrac{1}{2}$. Then $a r^2 = \dfrac{a}{4} = 20$ gives $a = 80$.\n\n**(b)** The terms are $${L.map(tx).join(', ')}$.\n\n**(c)** $a_9 = 80 \times \left(-\dfrac{1}{2}\right)^8 = \dfrac{80}{256} = \dfrac{5}{16}$.\n\n**(d)** $|r| < 1$, so $S_\infty = \dfrac{80}{1 + \frac{1}{2}} = \dfrac{160}{3}$.`, sol: 'The cube root of a negative number is negative, so r is negative.', scheme: [['(a) r^3 = -1/8, r = -1/2, a = 80', 1.5], ['(b) six terms listed', 1], ['(c) a_9 = 5/16', 1], ['(d) |r| < 1 and S = 160/3', 1.5]], d: 4, c: 'application', t: [2], time: 360 }), (Cx) => { Cx.assert(g.term(3).eq(20) && g.term(6).eq('-5/2') && L.map(String).join() === '80,-40,20,-10,5,-5/2' && g.term(9).eq('5/16') && S.eq('160/3'), 'a = 80, r = -1/2, 5/16, 160/3'); Cx.model([80, 5, 16, 160, 3]); });
}
{
  const sols = []; for (let a = 1; a <= 60; a++) for (let b = 1; b <= 60; b++) for (let c = 1; c <= 60; c++) if (a * c === b * b && a * b * c === 1728 && a + b + c === 52) sols.push([a, b, c]);
  const g = gp(4, 3), n = g.whichTerm(2916), S = g.sum(6);
  Q('l04', mk.long({ stem: r`Three positive numbers in geometric progression have product $1728$ and sum $52$. (a) Find the numbers. (b) Taking the smallest of them as the first term, extend them to a geometric progression and find the sum of its first six terms. (c) Find the position of the term $2916$ in this progression.`, model: r`**(a)** Take the numbers as $\dfrac{a}{r}$, $a$, $ar$. The product is $a^3 = 1728$, so $a = 12$. The sum gives $\dfrac{12}{r} + 12 + 12r = 52$, so $3r^2 - 10r + 3 = 0$ and $(3r - 1)(r - 3) = 0$. Hence $r = 3$ or $\dfrac{1}{3}$, and the numbers are $4, 12, 36$ (or $36, 12, 4$).\n\n**(b)** The progression is $4, 12, 36, \ldots$ with $a = 4$, $r = 3$: $S_6 = \dfrac{4(3^6 - 1)}{3 - 1} = 2 \times 728 = ${S}$.\n\n**(c)** $4 \times 3^{n-1} = 2916$ gives $3^{n-1} = 729 = 3^6$, so $n = ${n}$.`, sol: 'Use a/r, a, ar so that the product is a cube.', scheme: [['(a) a = 12', 1], ['(a) quadratic 3r^2 - 10r + 3 = 0', 1], ['(a) numbers 4, 12, 36', 1], ['(b) S_6 = 1456', 1], ['(c) 2916 is the 7th term', 1]], d: 4, c: 'application', t: [2], time: 360 }), (Cx) => { Cx.assert(sols.map(String).join('|') === '4,12,36|36,12,4' && S.eq(1456) && n === 7 && g.list(6).join() === '4,12,36,108,324,972' && sumList(g.list(6)).eq(1456), '4, 12, 36; 1456; 7'); Cx.model([12, 4, 36, 1456, 7]); });
}
{
  const a = recurring('', '72'), b = recurring('1', '35');
  const a1 = Rat.of(3).add(a.value);
  // a / (1 - r) = 36 and a r = 8: 36 r (1 - r) = 8, so 9r^2 - 9r + 2 = 0
  const cand = [Rat.of('2/3'), Rat.of('1/3')].map((rr) => ({ r: rr, a: Rat.of(36).mul(Rat.of(1).sub(rr)) }));
  const ok = cand.every((c) => c.a.mul(c.r).eq(8) && infSum(c.a, c.r).eq(36));
  Q('l05', mk.long({ stem: r`(a) Express $3.\overline{72} = 3.727272\ldots$ as a fraction. (b) Express $0.1\overline{35} = 0.1353535\ldots$ as a fraction. (c) An infinite geometric series has sum $36$ and second term $8$. Find its first term and common ratio, giving both possible answers.`, model: r`**(a)** $0.\overline{72}$ is a series with $a = 0.72$, $r = 0.01$, sum $\dfrac{0.72}{0.99} = \dfrac{8}{11}$. So $3.\overline{72} = 3 + \dfrac{8}{11} = \dfrac{41}{11}$.\n\n**(b)** $0.1\overline{35} = 0.1 + 0.035 + 0.00035 + \cdots$. The series has $a = 0.035$, $r = 0.01$ and sum $\dfrac{0.035}{0.99} = \dfrac{7}{198}$. So $0.1\overline{35} = \dfrac{1}{10} + \dfrac{7}{198} = \dfrac{99}{990} + \dfrac{35}{990} = \dfrac{134}{990} = \dfrac{67}{495}$.\n\n**(c)** $\dfrac{a}{1 - r} = 36$ and $ar = 8$. From the first, $a = 36(1 - r)$, so $36r(1 - r) = 8$, i.e. $9r^2 - 9r + 2 = 0$ and $(3r - 1)(3r - 2) = 0$.\n\nIf $r = \dfrac{1}{3}$ then $a = 24$; if $r = \dfrac{2}{3}$ then $a = 12$. Both satisfy $|r| < 1$, and $24 \times \dfrac{1}{3} = 12 \times \dfrac{2}{3} = 8$.`, sol: 'Keep any non-repeating digits outside the geometric series.', scheme: [['(a) 8/11 and 41/11', 1], ['(b) series sum 7/198', 1], ['(b) 67/495', 1], ['(c) 9r^2 - 9r + 2 = 0', 1], ['(c) (a, r) = (24, 1/3) or (12, 2/3)', 1]], d: 4, c: 'application', t: [2], time: 390 }), (Cx) => { Cx.assert(a1.eq('41/11') && a.value.eq('8/11') && b.value.eq('67/495') && infSum('35/1000', '1/100').eq('7/198') && ok, '41/11, 67/495, (24, 1/3), (12, 2/3)'); Cx.model([41, 11, 67, 495, 24, 12]); });
}
{
  const x = amGm(5, 20);
  const best = range(1, 29).map((a) => ({ a, p: a * (30 - a) })).sort((u, v) => v.p - u.p)[0];
  const f = (v) => Rat.of(v).add(Rat.of(81).div(v));
  const grid = []; for (let k = 1; k <= 400; k++) grid.push(new Rat(BigInt(k), 8n));
  const okMin = grid.every((v) => f(v).sub(18).eq(v.sub(9).mul(v.sub(9)).div(v)) && f(v).sub(18).sign() >= 0);
  Q('l06', mk.long({ stem: r`(a) Prove that for positive numbers $a$ and $b$, $\dfrac{a + b}{2} \ge \sqrt{ab}$, with equality only when $a = b$. (b) Find the arithmetic mean and the geometric mean of $5$ and $20$. (c) Two positive numbers have sum $30$. Show that their product is greatest when they are equal and find that greatest product. (d) Find the least value of $x + \dfrac{81}{x}$ for $x > 0$.`, model: r`**(a)** $\left(\sqrt{a} - \sqrt{b}\right)^2 \ge 0$ gives $a + b \ge 2\sqrt{ab}$, so $\dfrac{a + b}{2} \ge \sqrt{ab}$. Equality needs $\sqrt{a} = \sqrt{b}$, i.e. $a = b$.\n\n**(b)** $A = \dfrac{5 + 20}{2} = ${x.A.dtex()}$ and $G = \sqrt{100} = ${x.G}$, so $A > G$ as $a \ne b$.\n\n**(c)** With $a + b = 30$, the inequality gives $\sqrt{ab} \le 15$, so $ab \le 225$, with equality when $a = b = 15$. The greatest product is $${best.p}$.\n\n**(d)** By the inequality, $\dfrac{x + 81/x}{2} \ge \sqrt{x \times \dfrac{81}{x}} = 9$, so $x + \dfrac{81}{x} \ge 18$, with equality when $x = \dfrac{81}{x}$, i.e. $x = 9$. The least value is $18$.`, sol: 'In (c) and (d) the product of the two quantities is constant or the sum is constant, which is what makes the inequality useful.', scheme: [['(a) proof with equality case', 1.5], ['(b) A = 12.5 and G = 10', 1], ['(c) ab <= 225 at a = b = 15', 1.5], ['(d) least value 18 at x = 9', 1]], d: 4, c: 'analysis', t: [3], time: 390 }), (Cx) => { Cx.assert(x.A.eq('25/2') && x.G.eq(10) && best.a === 15 && best.p === 225 && okMin && f(9).eq(18), '12.5, 10, 225, 18'); Cx.model([12.5, 10, 225, 15, 18, 9]); });
}
{
  const x = amGm(3, 48), res = insertGMs(3, 48, 3), pos = res.find((t) => t.r.sign() > 0), neg = res.find((t) => t.r.sign() < 0), ins = insertAMs(3, 48, 3);
  const roots = []; for (let t = 1; t <= 51; t++) if (t * t - 51 * t + 144 === 0) roots.push(t);
  Q('l07', mk.long({ stem: r`The arithmetic mean of two positive numbers is $\dfrac{51}{2}$ and their geometric mean is $12$. (a) Find the numbers. (b) Insert three geometric means between them. (c) Insert three arithmetic means between them. (d) Which of the inserted means is equal to the arithmetic mean of the two numbers?`, model: r`**(a)** The sum is $51$ and the product is $144$, so the numbers are the roots of $t^2 - 51t + 144 = 0$, i.e. $(t - 3)(t - 48) = 0$. They are $3$ and $48$.\n\n**(b)** Five terms with $r^4 = \dfrac{48}{3} = 16$, so $r = 2$ or $r = -2$. The means are $${pos.means.join(', ')}$ (for $r = 2$) or $${neg.means.join(', ')}$ (for $r = -2$).\n\n**(c)** Five terms with $d = \dfrac{48 - 3}{4} = ${ins.d.dtex()}$. The means are $${ins.means.map((m) => m.dtex()).join(', ')}$.\n\n**(d)** The middle arithmetic mean $${ins.means[1].dtex()}$ equals $\dfrac{3 + 48}{2} = 25.5$. The middle geometric mean $12$ equals $\sqrt{3 \times 48}$.`, sol: 'Use the sum and product of the two numbers to form a quadratic.', scheme: [['(a) quadratic and the numbers 3, 48', 1], ['(b) r^4 = 16, r = 2 or -2, means 6, 12, 24', 1.5], ['(c) d = 11.25, means 14.25, 25.5, 36.75', 1.5], ['(d) the middle means equal A and G', 1]], d: 4, c: 'analysis', t: [3], time: 390 }), (Cx) => { Cx.assert(roots.join() === '3,48' && x.A.eq('51/2') && x.G.eq(12) && res.length === 2 && pos.means.join() === '6,12,24' && neg.means.join() === '-6,12,-24' && ins.d.eq('45/4') && ins.means.map(String).join() === '57/4,51/2,147/4' && ins.means[1].eq(x.A) && pos.means[1].eq(x.G), 'numbers 3, 48; GMs 6, 12, 24; AMs 14.25, 25.5, 36.75'); Cx.model([3, 48, 6, 12, 24, 14.25, 25.5, 36.75]); });
}

// =============================================================== case-based
{
  const g = ap(4, 3), S14 = g.sum(14), n100 = g.whichTerm(100);
  let first = null; for (let n = 1; n <= 80; n++) if (g.sum(n).gt(1000)) { first = n; break; }
  caseQ('c01', {
    passage: r`The imagined Kamal Tiles studio lays a practice floor in rows. The first row has $4$ tiles and every later row has $3$ tiles more than the row before it. The completed floor has $14$ rows.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${S14}$. (c) (i) Row $${n100}$. Or (ii) $${first}$ rows.`,
    sol: r`(a) $4 + 13 \times 3 = ${g.term(14)}$. (b) $\dfrac{14}{2}(4 + 43) = ${S14}$. (c) (i) $4 + (n - 1)3 = 100$ gives $n = ${n100}$. (ii) $S_n = \dfrac{n(3n + 5)}{2}$; $S_{25} = 1000$ and $S_{26} = ${g.sum(26)}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of tiles in the 14th row is', opts: ['$43$', '$46$', '$40$', '$56$'], key: 'a', sol: r`$a_{14} = 4 + 13 \times 3 = 43$. Using $14$ steps gives $46$, using $12$ steps gives $40$, and $14 \times 4$ gives $56$.`, d: 2, c: 'application', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the total number of tiles needed for the whole floor of 14 rows.', value: 329, sol: r`$S_{14} = \dfrac{14}{2}(4 + 43) = 7 \times 47 = 329$.`, scheme: [['Last row 43 and the sum formula', 1]], d: 2, c: 'application', t: [1], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Suppose the pattern were continued. Which row would have exactly 100 tiles?', model: r`$4 + (n - 1) \times 3 = 100$, so $n - 1 = 32$ and $n = ${n100}$: the $${n100}$th row.`, sol: 'Solve a_n = 100 for n.', scheme: [['4 + (n - 1)3 = 100', 1], ['n = 33', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Suppose the pattern were continued. What is the least number of rows that would need more than 1000 tiles in all?', model: r`$S_n = \dfrac{n}{2}\left[8 + 3(n - 1)\right] = \dfrac{n(3n + 5)}{2}$. Here $S_{25} = ${g.sum(25)}$, which is not more than $1000$, and $S_{26} = ${g.sum(26)}$. So $${first}$ rows are needed.`, sol: 'Compare partial sums around 1000.', scheme: [['S_n = n(3n + 5)/2', 1], ['S_25 = 1000 and S_26 = 1079, so 26', 1]], d: 3, c: 'application', t: [1], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([N(g.term(14)), 4 + 14 * 3, 4 + 12 * 3, 14 * 4], 43);
    Cx.child('b').val(N(S14));
    Cx.child('c').assert(n100 === 33, 'row 33');
    Cx.child('c').model([33]);
    Cx.child('cii').assert(g.sum(25).eq(1000) && g.sum(26).eq(1079) && first === 26 && range(1, 26).every((n) => g.sum(n).eq(new Rat(BigInt(n * (3 * n + 5)), 2n))), '26 rows');
    Cx.child('cii').model([1000, 1079, 26]);
  });
}
{
  const L = gp(2, 3).list(7), g = gp(2, 3);
  let first = null; for (let n = 1; n <= 12; n++) if (g.term(n).gt(1000)) { first = n; break; }
  caseQ('c02', {
    passage: r`An imagined messaging group, Gully Gang, spreads a notice by forwards. In round $1$ the notice reaches $2$ new people. In every later round each new person from the round before passes it on to $3$ people who have not seen it, so the number of new people triples each round.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${g.sum(6)}$. (c) (i) Round $${first}$. Or (ii) $${g.sum(8)}$.`,
    sol: r`(a) $2 \times 3^4 = ${g.term(5)}$. (b) $\dfrac{2(3^6 - 1)}{3 - 1} = ${g.sum(6)}$. (c) (i) $${L.slice(5, 7).join('$ and $')}$ are the sixth and seventh counts. (ii) $3^8 - 1 = ${g.sum(8)}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of new people reached in round 5 is', opts: ['$162$', '$486$', '$54$', '$10$'], key: 'a', sol: r`The counts are $2, 6, 18, 54, 162$, so round $5$ has $2 \times 3^4 = 162$. The value $486$ is round $6$, $54$ is round $4$, and $10$ is $2 \times 5$.`, d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'Find the total number of people who have received the notice by the end of round 6.', value: 728, sol: r`$S_6 = \dfrac{2(3^6 - 1)}{3 - 1} = 3^6 - 1 = 728$.`, scheme: [['Sum formula with a = 2, r = 3', 1]], d: 3, c: 'application', t: [2], time: 105 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** In which round does the number of new people first exceed 1000?', model: r`$2 \times 3^{n-1} > 1000$ means $3^{n-1} > 500$. Since $3^5 = 243$ and $3^6 = 729$, we need $n - 1 = 6$. The counts are $${g.term(6)}$ in round $6$ and $${g.term(7)}$ in round $7$, so it is round $${first}$.`, sol: 'List the counts until one passes 1000.', scheme: [['3^(n-1) > 500', 1], ['Round 7 with 1458 new people', 1]], d: 3, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** How many people in all have received the notice by the end of round 8?', model: r`$S_8 = \dfrac{2(3^8 - 1)}{3 - 1} = 3^8 - 1 = 6561 - 1 = ${g.sum(8)}$.`, sol: 'Sum of eight terms of a GP with a = 2, r = 3.', scheme: [['S_8 formula', 1], ['6560', 1]], d: 3, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(L.join() === '2,6,18,54,162,486,1458' && g.sum(6).eq(728) && g.sum(8).eq(6560), 'counts and totals');
    Cx.child('a').which([N(g.term(5)), N(g.term(6)), N(g.term(4)), 10], 162);
    Cx.child('b').val(N(g.sum(6)));
    Cx.child('c').assert(first === 7 && g.term(6).eq(486) && g.term(7).eq(1458), 'round 7');
    Cx.child('c').model([486, 1458, 7]);
    Cx.child('cii').assert(g.sum(8).eq(6560) && sumList(g.list(8)).eq(6560), '6560');
    Cx.child('cii').model([6561, 6560]);
  });
}
{
  const g = gp(50, '4/5'), S = infSum(50, '4/5');
  let first = null; for (let n = 1; n <= 80; n++) if (g.term(n).lt(1)) { first = n; break; }
  const tail = S.sub(g.sum(5));
  caseQ('c03', {
    passage: r`A pendulum in an imagined science fair is released and its first swing covers an arc of $50$ cm. Because of friction each swing covers $\dfrac{4}{5}$ of the arc of the swing before it. The pendulum is assumed to keep swinging until it comes to rest.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${S}$. (c) (i) Swing $${first}$. Or (ii) $${tail.dtex()}$.`,
    sol: r`(a) $\dfrac{40}{50} = \dfrac{4}{5}$. (b) $\dfrac{50}{1 - 4/5} = ${S}$. (c) (i) $50\left(\dfrac{4}{5}\right)^{17} \approx 1.13$ and $50\left(\dfrac{4}{5}\right)^{18} \approx 0.90$. (ii) $${S} - S_5 = ${S} - ${g.sum(5).dtex()} = ${tail.dtex()}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The common ratio of the arcs of successive swings is', opts: [r`$\dfrac{4}{5}$`, r`$\dfrac{5}{4}$`, r`$\dfrac{1}{5}$`, '$40$'], key: 'a', sol: r`Each arc is $\dfrac{4}{5}$ of the one before, so $r = \dfrac{4}{5}$. The reciprocal $\dfrac{5}{4}$ would make the arcs grow, $\dfrac{1}{5}$ is the fraction lost, and $40$ is the second arc in cm.`, d: 1, c: 'understanding', t: [2], time: 45 })),
      child('b', mk.num({ stem: 'Find the total length, in cm, of the arcs covered by the pendulum before it comes to rest.', value: 250, sol: r`The arcs form an infinite geometric series with $a = 50$ and $r = \dfrac{4}{5}$, so $S = \dfrac{50}{1 - 4/5} = 250$.`, scheme: [['a / (1 - r) with |r| < 1', 1]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** At which swing does the arc first become shorter than 1 cm?', model: r`The $n$th arc is $50\left(\dfrac{4}{5}\right)^{n-1}$. Listing: the $18$th arc is about $${N(g.term(18)).toFixed(2)}$ cm and the $19$th is about $${N(g.term(19)).toFixed(2)}$ cm. So it first drops below $1$ cm at swing $${first}$.`, sol: 'List the arcs near the answer to find the first one below 1 cm.', scheme: [['The general arc 50 (4/5)^(n-1)', 1], ['Swing 19 is the first below 1 cm', 1]], d: 4, c: 'application', t: [2], time: 150 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the total length, in cm, of the arcs covered from the 6th swing onwards.', model: r`The first five arcs add up to $S_5 = \dfrac{50\left[1 - (4/5)^5\right]}{1/5} = ${g.sum(5).dtex()}$ cm. So the arcs from the 6th swing onwards add up to $250 - ${g.sum(5).dtex()} = ${tail.dtex()}$ cm.`, sol: 'Total minus the first five arcs.', scheme: [['S_5 = 168.08', 1], ['250 - 168.08 = 81.92', 1]], d: 4, c: 'application', t: [2], time: 150 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([0.8, 1.25, 0.2, 40], 0.8);
    Cx.child('b').val(N(S));
    Cx.child('c').assert(first === 19 && g.term(18).gt(1) && g.term(19).lt(1) && N(g.term(18)) > 1.1 && N(g.term(19)) < 1, 'swing 19');
    Cx.child('c').model([19, 1]);
    Cx.child('cii').assert(g.sum(5).eq('4202/25') && tail.eq('2048/25') && N(tail) === 81.92 && tail.eq(gp(g.term(6), '4/5').a.div(Rat.of(1).sub('4/5'))), '81.92');
    Cx.child('cii').model([168.08, 81.92]);
  });
}
{
  const x = amGm(10, 10), best = range(1, 19).map((a) => ({ a, area: a * (20 - a) })).sort((u, v) => v.area - u.area)[0];
  const minWire = range(1, 64).filter((l) => 64 % l === 0).map((l) => 2 * (l + 64 / l)).sort((u, v) => u - v)[0];
  const wall = range(1, 59).map((y) => ({ x: (60 - y) / 2, y, area: ((60 - y) / 2) * y })).sort((u, v) => v.area - u.area)[0];
  caseQ('c04', {
    passage: r`A residents' group in an imagined housing society has $40$ m of wire fencing to enclose a rectangular vegetable plot, using all of it. Let the length be $l$ m and the breadth be $b$ m. The group wants the largest possible area and uses the inequality between the arithmetic and geometric means.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${best.area}$. (c) (i) $${minWire}$ m. Or (ii) $${wall.area}$ m$^2$.`,
    sol: r`(a) $l + b = 20$, so the mean is $10$. (b) $lb \le 10^2 = 100$. (c) (i) $\dfrac{l + b}{2} \ge 8$ gives perimeter $\ge 32$. (ii) $2x + y = 60$ and the area $xy = \dfrac{1}{2}(2x)(y) \le \dfrac{1}{2}(30)^2 = 450$.`,
    children: [
      child('a', mk.mcq({ stem: 'The arithmetic mean of the length and the breadth is', opts: ['$10$ m', '$20$ m', '$40$ m', '$5$ m'], key: 'a', sol: r`The perimeter $2(l + b) = 40$ gives $l + b = 20$, so the mean of $l$ and $b$ is $10$. The value $20$ is the sum and $40$ the perimeter.`, d: 2, c: 'application', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'Find the largest possible area of the plot, in square metres.', value: 100, sol: r`Since $\sqrt{lb} \le \dfrac{l + b}{2} = 10$, we get $lb \le 10^2 = 100$, with equality for $l = b = 10$. The largest area is $100$ m$^2$.`, scheme: [['sqrt(lb) <= 10', 0.5], ['lb <= 100, attained when l = b = 10', 0.5]], d: 3, c: 'application', t: [3], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Suppose instead the plot must have an area of exactly 64 square metres. Find the least length of wire that can enclose it.', model: r`With $lb = 64$: $\dfrac{l + b}{2} \ge \sqrt{64} = 8$, so $l + b \ge 16$ and the perimeter $2(l + b) \ge ${minWire}$ m, with equality for the square $8 \times 8$.`, sol: 'Fixed product, so the sum is least when the sides are equal.', scheme: [['(l + b)/2 >= 8', 1], ['Least wire 32 m, for l = b = 8', 1]], d: 4, c: 'application', t: [3], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Suppose the plot has a wall along one side so that only three sides are fenced, using 60 m of wire in all. Find the largest area.', model: r`Let the two sides perpendicular to the wall be $x$ m each and the side parallel to it be $y$ m, so $2x + y = 60$. The area is $xy = \dfrac{1}{2}(2x)(y)$. By the inequality, $\sqrt{(2x)(y)} \le \dfrac{2x + y}{2} = 30$, so $(2x)(y) \le 900$ and $xy \le ${wall.area}$ m$^2$, attained when $2x = y = 30$, i.e. $x = ${wall.x}$ and $y = ${wall.y}$.`, sol: 'Write the area as half of the product of 2x and y, whose sum is fixed.', scheme: [['2x + y = 60 and area = (1/2)(2x)(y)', 1], ['Greatest area 450 m^2 at x = 15, y = 30', 1]], d: 4, c: 'analysis', t: [3], time: 150 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([N(am(best.a, 20 - best.a)), 20, 40, 5], 10);
    Cx.child('b').val(best.area);
    Cx.child('c').assert(best.a === 10 && x.A.eq(10) && minWire === 32, 'min wire 32 m');
    Cx.child('c').model([8, 16, 32]);
    Cx.child('cii').assert(wall.area === 450 && wall.x === 15 && wall.y === 30, '450 m^2 at 15 and 30');
    Cx.child('cii').model([900, 450, 15, 30]);
  });
}
{
  const g = gp(160, 2), ins = insertGMs(160, 2560, 3), pos = ins.find((t) => t.r.sign() > 0), x = amGm(160, 2560);
  caseQ('c05', {
    passage: r`A music teacher in an imagined school sets five tuning forks so that their frequencies, in hertz, are in geometric progression. The lowest fork is $160$ Hz and the highest is $2560$ Hz, and the forks are numbered $1$ to $5$ from the lowest.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${pos.all[3]}$. (c) (i) $A = ${x.A}$ and $G = ${x.G}$. Or (ii) $${pos.means.reduce((s, t) => s.add(t), q(0))}$.`,
    sol: r`(a) $r^4 = 16$ so $r = 2$. (b) $160 \times 2^3 = ${pos.all[3]}$. (c) (i) $A = \dfrac{160 + 2560}{2} = ${x.A}$, $G = \sqrt{160 \times 2560} = ${x.G}$. (ii) $${pos.means.join(' + ')} = ${pos.means.reduce((s, t) => s.add(t), q(0))}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The common ratio of the frequencies, taking all frequencies as positive, is', opts: ['$2$', '$4$', '$8$', '$16$'], key: 'a', sol: r`Four equal ratios take $160$ to $2560$: $r^4 = \dfrac{2560}{160} = 16$, so $r = 2$. The number $16$ is $r^4$, and $4$ and $8$ are other powers of $2$.`, d: 2, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the frequency, in hertz, of fork number 4.', value: 1280, sol: r`The frequencies are $160, 320, 640, 1280, 2560$, so fork $4$ has $160 \times 2^3 = 1280$ Hz.`, scheme: [['r = 2 and a_4 = 160 x 8', 1]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the arithmetic mean and the geometric mean of the lowest and highest frequencies. Which fork has the geometric mean as its frequency?', model: r`$A = \dfrac{160 + 2560}{2} = ${x.A}$ Hz and $G = \sqrt{160 \times 2560} = \sqrt{409600} = ${x.G}$ Hz. The geometric mean is the frequency of the middle fork, fork $3$, while $A > G$.`, sol: 'The middle term of a GP is the GM of the end terms.', scheme: [['A = 1360 and G = 640', 1], ['G is fork 3', 1]], d: 3, c: 'application', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the sum of the frequencies of the three middle forks.', model: r`The middle forks are $${pos.means.join(', ')}$ Hz, so their sum is $320 + 640 + 1280 = ${pos.means.reduce((s, t) => s.add(t), q(0))}$ Hz.`, sol: 'List the three middle terms and add.', scheme: [['The terms 320, 640, 1280', 1], ['Sum 2240', 1]], d: 2, c: 'application', t: [3], time: 75 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(ins.length === 2 && pos.all.join() === '160,320,640,1280,2560' && g.term(4).eq(1280), 'GP of forks');
    Cx.child('a').which([N(pos.r), 4, 8, 16], 2);
    Cx.child('b').val(N(g.term(4)));
    Cx.child('c').assert(x.A.eq(1360) && x.G.eq(640) && pos.all[2].eq(x.G), 'A = 1360, G = 640 = fork 3');
    Cx.child('c').model([1360, 640]);
    Cx.child('cii').assert(pos.means.reduce((s, t) => s.add(t), q(0)).eq(2240), '2240');
    Cx.child('cii').model([320, 640, 1280, 2240]);
  });
}

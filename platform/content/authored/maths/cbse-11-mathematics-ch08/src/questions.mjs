// CBSE 11 Mathematics ch08 Sequences and Series — objective items (mcq, assertion-reason, true-false, fill-blank, numerical)
// with independent re-solve checks. Every term, sum and mean is computed with exact rationals (seq.mjs): by the closed formula
// and by listing the sequence or adding its terms. Distractors are computed from the plausible wrong method.
import { Q, mk } from './lib.mjs';
import { r, range, Rat, q, ap, gp, apFromTwo, apFromSumRule, am, amGm, gmExact, insertAMs, insertGMs, infSum, recurring, sumList, powerSums, ratioOf, N, tx } from './seq.mjs';

export { r };

// =============================================================== MCQ
{
  const a = (n) => n * n - 3 * n + 4;
  const L = range(1, 6).map(a);
  Q('m01', mk.mcq({ stem: r`A sequence has $n$th term $a_n = n^2 - 3n + 4$. Its fifth term is`, opts: ['$14$', '$6$', '$8$', '$29$'], key: 'a', sol: r`Putting $n = 5$: $a_5 = 25 - 15 + 4 = 14$. Reading the constant as $-4$ gives $6$, using $n = 4$ gives $8$, and dropping the $-3n$ part gives $29$.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(L.join() === '2,2,4,8,14,22' && a(5) === 14, 'first terms 2, 2, 4, 8, 14'); Cx.which([a(5), 25 - 15 - 4, a(4), 25 + 4], 14); });
}
{
  const seq = [2]; for (let k = 1; k < 8; k++) seq.push(3 * seq[k - 1] - 2);
  const alt = [2]; for (let k = 1; k < 4; k++) alt.push(3 * alt[k - 1] + 2);
  Q('m02', mk.mcq({ stem: r`A sequence has first term $a_1 = 2$, and each later term is given by $a_{n+1} = 3a_n - 2$. Its fourth term is`, opts: ['$28$', '$80$', '$54$', '$10$'], key: 'a', sol: r`Build the terms one by one: $a_2 = 3(2) - 2 = 4$, $a_3 = 3(4) - 2 = 10$, $a_4 = 3(10) - 2 = 28$. Adding $2$ instead of subtracting gives $80$, ignoring the $-2$ gives $54$, and $10$ is the third term.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(seq.slice(0, 4).join() === '2,4,10,28', '2, 4, 10, 28'); Cx.which([seq[3], alt[3], 2 * 27, seq[2]], 28); });
}
{
  const a = (n) => 2 ** n - n, S = (n) => range(1, n).map(a).reduce((s, x) => s + x, 0);
  Q('m03', mk.mcq({ stem: r`A sequence has $n$th term $a_n = 2^n - n$. The series $a_1 + a_2 + a_3 + a_4$ has the value`, opts: ['$20$', '$12$', '$30$', '$10$'], key: 'a', sol: r`The terms are $1, 2, 5, 12$ and their sum is $20$. The last term alone is $12$, the powers of $2$ alone add to $30$, and the numbers $1 + 2 + 3 + 4$ add to $10$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(range(1, 4).map(a).join() === '1,2,5,12' && S(4) === 20 && 2 + 4 + 8 + 16 === 30, '1 + 2 + 5 + 12 = 20'); Cx.which([S(4), a(4), 30, 10], 20); });
}
{
  const g = apFromTwo(7, 31, 12, 56);
  Q('m04', mk.mcq({ stem: r`The seventh term of an arithmetic progression is $31$ and its twelfth term is $56$. The first term is`, opts: ['$1$', '$-4$', '$6$', '$26$'], key: 'a', sol: r`The five steps from the 7th to the 12th term add $25$, so $d = 5$. Then $a = 31 - 6 \times 5 = 1$. Subtracting $7d$ gives $-4$, and $26$ is the sixth term.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(g.d.eq(5) && g.a.eq(1) && g.term(6).eq(26), 'd = 5, a = 1'); Cx.which([N(g.a), 31 - 35, N(g.d) + 1, N(g.term(6))], 1); });
}
{
  const g = ap(6, 4); // a_18 = 6 + 17 d = 74 -> d = 4
  const g2 = apFromTwo(1, 6, 18, 74);
  Q('m05', mk.mcq({ stem: r`A finite arithmetic progression has $18$ terms; its first term is $6$ and its last term is $74$. The sum of all its terms is`, opts: ['$720$', '$1440$', '$666$', '$40$'], key: 'a', sol: r`$S = \dfrac{n}{2}(a + l) = \dfrac{18}{2}(6 + 74) = 9 \times 80 = 720$. Leaving out the factor $\dfrac{1}{2}$ gives $1440$, using $\dfrac{n}{2}l$ gives $666$, and $40$ is only the mean of the end terms.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(g2.d.eq(4) && g.sum(18).eq(720) && g.term(18).eq(74), '720'); Cx.which([N(g.sum(18)), 18 * 80, 9 * 74, 40], 720); });
}
{
  const g = apFromSumRule(3, 2);
  Q('m06', mk.mcq({ stem: r`The sum of the first $n$ terms of a sequence is $S_n = 3n^2 + 2n$. Its tenth term is`, opts: ['$59$', '$320$', '$261$', '$60$'], key: 'a', sol: r`$a_{10} = S_{10} - S_9 = 320 - 261 = 59$. The values $320$ and $261$ are the two sums themselves, and $60$ comes from the rule $6n$ without the $-1$.`, d: 3, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(g.term(10).eq(59) && g.sum(10).eq(320) && g.sum(9).eq(261), 'a_10 = 59'); Cx.which([N(g.term(10)), N(g.sum(10)), N(g.sum(9)), 60], 59); });
}
{
  const m = am(12, 40);
  Q('m07', mk.mcq({ stem: r`The number that must be written between $12$ and $40$ so that the three numbers are in arithmetic progression is`, opts: ['$26$', '$52$', '$14$', '$28$'], key: 'a', sol: r`The middle number of three terms in arithmetic progression is the mean of the other two: $\dfrac{12 + 40}{2} = 26$. The value $52$ forgets to halve, $14$ is half the difference, and $28$ is the difference.`, d: 1, c: 'understanding', t: [3], time: 45 }), (Cx) => { Cx.assert(m.eq(26) && ap(12, 14).list(3).join() === '12,26,40', '12, 26, 40'); Cx.which([N(m), 52, 14, 28], 26); });
}
{
  const ins = insertAMs(4, 40, 5);
  Q('m08', mk.mcq({ stem: r`Five arithmetic means are inserted between $4$ and $40$. The fourth of these means is`, opts: ['$28$', '$34$', '$22$', '$32.8$'], key: 'a', sol: r`With the end terms there are $7$ terms, so $d = \dfrac{40 - 4}{6} = 6$ and the means are $10, 16, 22, 28, 34$. The fourth mean is $28$. The value $34$ is the fifth, $22$ the third, and $32.8$ comes from dividing by $5$ instead of $6$.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(ins.d.eq(6) && ins.means.map(String).join() === '10,16,22,28,34', '10, 16, 22, 28, 34'); Cx.which([N(ins.means[3]), N(ins.means[4]), N(ins.means[2]), 4 + 4 * 7.2], 28); });
}
{
  const g = gp(128, '-1/2');
  Q('m09', mk.mcq({ stem: r`In the geometric progression $128, -64, 32, \ldots$ the common ratio is`, opts: [r`$-\dfrac{1}{2}$`, r`$\dfrac{1}{2}$`, '$-2$', '$2$'], key: 'a', sol: r`The ratio is any term divided by the one before it: $\dfrac{-64}{128} = -\dfrac{1}{2}$, and $\dfrac{32}{-64} = -\dfrac{1}{2}$ as well. The sign matters, because the terms alternate.`, d: 1, c: 'recall', t: [2], time: 45 }), (Cx) => { Cx.assert(ratioOf([128, -64, 32]).eq('-1/2') && g.list(3).join() === '128,-64,32', 'r = -1/2'); Cx.which([-0.5, 0.5, -2, 2], N(ratioOf([128, -64, 32]))); });
}
{
  const g = gp(162, '1/3');
  Q('m10', mk.mcq({ stem: r`The sixth term of the geometric progression $162, 54, 18, \ldots$ is`, opts: [r`$\dfrac{2}{3}$`, '$2$', r`$\dfrac{2}{9}$`, '$6$'], key: 'a', sol: r`Here $a = 162$ and $r = \dfrac{1}{3}$, so $a_6 = 162 \times \left(\dfrac{1}{3}\right)^5 = \dfrac{162}{243} = \dfrac{2}{3}$. The value $2$ is the fifth term, $\dfrac{2}{9}$ the seventh, and $6$ comes from the power $3$ instead of $5$.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(g.term(6).eq('2/3') && g.list(7).map(String).join() === '162,54,18,6,2,2/3,2/9', '162, 54, 18, 6, 2, 2/3'); Cx.which([N(g.term(6)), N(g.term(5)), N(g.term(7)), N(g.a.mul(g.r.pow(3)))], 2 / 3); });
}
{
  const g = gp(5, 4), n = g.whichTerm(5120);
  Q('m11', mk.mcq({ stem: r`The number $5120$ is a term of the geometric progression $5, 20, 80, \ldots$ It is the term numbered`, opts: ['$6$', '$5$', '$7$', '$1024$'], key: 'a', sol: r`$5 \times 4^{n-1} = 5120$ gives $4^{n-1} = 1024 = 4^5$, so $n - 1 = 5$ and $n = 6$. The answer $5$ forgets the $+1$, and $1024$ is the value of $4^{n-1}$, not the position.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(n === 6 && g.term(6).eq(5120), '5120 is the 6th term'); Cx.which([n, 5, 7, 1024], 6); });
}
{
  const g = gp(4, -3), L = g.list(5), parts = []; L.reduce((s, t) => { const x = s.add(t); parts.push(x); return x; }, q(0));
  Q('m12', mk.mcq({ stem: r`The sum of the first five terms of the geometric progression $4, -12, 36, \ldots$ is`, opts: ['$244$', '$-80$', '$324$', '$484$'], key: 'a', sol: r`With $a = 4$ and $r = -3$: $S_5 = \dfrac{4\left[(-3)^5 - 1\right]}{-3 - 1} = \dfrac{4(-244)}{-4} = 244$. The value $-80$ is $S_4$, $324$ is the fifth term, and $484$ comes from using $r = 3$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(L.join() === '4,-12,36,-108,324' && g.sum(5).eq(244) && parts.join() === '4,-8,28,-80,244' && gp(4, 3).sum(5).eq(484), '244'); Cx.which([N(g.sum(5)), N(g.sum(4)), N(g.term(5)), N(gp(4, 3).sum(5))], 244); });
}
{
  const S = infSum(24, '1/3');
  Q('m13', mk.mcq({ stem: r`The infinite geometric series $24 + 8 + \dfrac{8}{3} + \cdots$ has the sum`, opts: ['$36$', '$72$', '$32$', '$48$'], key: 'a', sol: r`Here $a = 24$ and $r = \dfrac{1}{3}$, with $|r| < 1$, so $S = \dfrac{a}{1 - r} = \dfrac{24}{2/3} = 36$. Dividing by $r$ instead gives $72$, adding two terms gives $32$, and using $r = \dfrac{1}{2}$ gives $48$.`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(S.eq(36) && infSum(24, '1/2').eq(48), '36'); Cx.which([N(S), 72, 24 + 8, 48], 36); });
}
{
  const sets = [[100, -90, 81], [3, 6, 12], [1, -1, 1], [8, 12, 18]];
  const finite = sets.map((s) => { const rr = ratioOf(s); return rr.abs().lt(1); });
  Q('m14', mk.mcq({ stem: r`Exactly one of these infinite geometric series has a finite sum. It is`, opts: [r`$100 - 90 + 81 - \cdots$`, r`$3 + 6 + 12 + \cdots$`, r`$1 - 1 + 1 - \cdots$`, r`$8 + 12 + 18 + \cdots$`], key: 'a', sol: r`A sum exists only when $|r| < 1$. The ratios are $-\dfrac{9}{10}$, $2$, $-1$ and $\dfrac{3}{2}$, and only the first has absolute value below $1$ (its sum is $\dfrac{100}{1.9} = \dfrac{1000}{19}$).`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(finite.join() === 'true,false,false,false' && infSum(100, '-9/10').eq('1000/19'), 'only r = -9/10'); Cx.which(finite, true); });
}
{
  const { value } = recurring('', '054');
  Q('m15', mk.mcq({ stem: r`The recurring decimal $0.\overline{054} = 0.054054054\ldots$ is equal to the fraction`, opts: [r`$\dfrac{2}{37}$`, r`$\dfrac{27}{500}$`, r`$\dfrac{6}{11}$`, r`$\dfrac{3}{55}$`], key: 'a', sol: r`It is a geometric series with $a = 0.054$ and $r = 0.001$, so $S = \dfrac{0.054}{0.999} = \dfrac{54}{999} = \dfrac{2}{37}$. The fraction $\dfrac{27}{500}$ is just $0.054$, while $\dfrac{6}{11}$ and $\dfrac{3}{55}$ use $99$ and $990$ in the denominator.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(value.eq('2/37') && new Rat(54n, 1000n).eq('27/500') && new Rat(54n, 99n).eq('6/11') && new Rat(54n, 990n).eq('3/55'), '2/37'); Cx.which([N(value), 27 / 500, 6 / 11, 3 / 55], 2 / 37); });
}
{
  const G = gmExact(9, 64);
  Q('m16', mk.mcq({ stem: r`The geometric mean of the two numbers $9$ and $64$ is`, opts: ['$24$', '$36.5$', '$576$', '$55$'], key: 'a', sol: r`$G = \sqrt{9 \times 64} = \sqrt{576} = 24$. The value $36.5$ is the arithmetic mean, $576$ is the product, and $55$ is the difference.`, d: 1, c: 'recall', t: [3], time: 45 }), (Cx) => { const x = amGm(9, 64); Cx.assert(G.eq(24) && x.A.eq('73/2') && x.G.eq(24) && x.A.gt(x.G), 'G = 24 < A = 36.5'); Cx.which([N(G), 36.5, 576, 55], 24); });
}
{
  const pairs = range(1, 25).filter((a) => a + (26 - a) === 26 && a * (26 - a) === 144);
  const x = amGm(8, 18);
  Q('m17', mk.mcq({ stem: r`The arithmetic mean of two positive numbers is $13$ and their geometric mean is $12$. The larger number is`, opts: ['$18$', '$8$', '$25$', '$12$'], key: 'a', sol: r`The numbers have sum $26$ and product $144$, so they are the roots of $t^2 - 26t + 144 = 0$, that is $(t - 8)(t - 18) = 0$. The larger is $18$. The value $8$ is the smaller number, and $25$ and $12$ are sums or means of the given values.`, d: 3, c: 'analysis', t: [3], time: 120 }), (Cx) => { Cx.assert(pairs.join() === '8,18' && x.A.eq(13) && x.G.eq(12), 'the pair is 8 and 18'); Cx.which([Math.max(...pairs), Math.min(...pairs), 13 + 12, 12], 18); });
}
{
  const f = (x) => Rat.of(4).mul(x).add(Rat.of(25).div(x));
  const grid = []; for (let k = 1; k <= 400; k++) grid.push(new Rat(BigInt(k), 8n));
  const ok = grid.every((x) => f(x).sub(20).eq(x.mul(2).sub(5).mul(x.mul(2).sub(5)).div(x)) && f(x).sub(20).sign() >= 0);
  Q('m18', mk.mcq({ stem: r`For positive $x$, the least value of the expression $4x + \dfrac{25}{x}$ is`, opts: ['$20$', '$10$', '$29$', '$25$'], key: 'a', sol: r`By the inequality between the means, $\dfrac{4x + 25/x}{2} \ge \sqrt{4x \times \dfrac{25}{x}} = \sqrt{100} = 10$, so $4x + \dfrac{25}{x} \ge 20$, with equality when $4x = \dfrac{25}{x}$, that is $x = \dfrac{5}{2}$. The value $10$ is the mean, not the sum, and $29$ is the value at $x = 1$.`, d: 4, c: 'analysis', t: [3], time: 150 }), (Cx) => { Cx.assert(ok && f(new Rat(5n, 2n)).eq(20) && f(1).eq(29), 'minimum 20 at x = 5/2; (2x-5)^2/x >= 0 on a grid'); Cx.which([N(f(new Rat(5n, 2n))), 10, N(f(1)), 25], 20); });
}
{
  const p = powerSums(12);
  Q('m19', mk.mcq({ stem: r`Using the formula for the sum of squares of the first $n$ natural numbers, the value of $1^2 + 2^2 + 3^2 + \cdots + 12^2$ is`, opts: ['$650$', '$78$', '$6084$', '$1300$'], key: 'a', sol: r`$\sum k^2 = \dfrac{n(n+1)(2n+1)}{6} = \dfrac{12 \times 13 \times 25}{6} = 650$. The value $78$ is $1 + 2 + \cdots + 12$ and $6084 = 78^2$ is the sum of cubes.`, d: 2, c: 'understanding', t: [4], time: 60 }), (Cx) => { Cx.assert(p.s2 === 650n && p.s1 === 78n && p.s3 === 6084n, '650, 78, 6084'); Cx.which([Number(p.s2), Number(p.s1), Number(p.s3), 1300], 650); });
}

// =============================================================== assertion-reason
{
  const a = [1]; for (let n = 1; n < 6; n++) a.push(a[n - 1] + 2 * n);
  Q('ar1', mk.ar({ a: r`The sequence with $a_1 = 1$ and $a_{n+1} = a_n + 2n$ begins $1, 3, 7, 13, \ldots$`, r: r`A recursive rule gives each new term from the terms before it, once the first term is stated.`, key: 'a', sol: r`With the first term $1$: $a_2 = 1 + 2 = 3$, $a_3 = 3 + 4 = 7$, $a_4 = 7 + 6 = 13$. Each term is built from the one before it exactly as R describes, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(a.slice(0, 4).join() === '1,3,7,13', '1, 3, 7, 13'); Cx.key('a'); });
}
{
  const S = infSum(5, '1/2');
  Q('ar2', mk.ar({ a: r`The infinite series $5 + \dfrac{5}{2} + \dfrac{5}{4} + \cdots$ has the sum $10$.`, r: r`An infinite geometric series has a finite sum whatever its common ratio.`, key: 'c', sol: r`A is true: $\dfrac{a}{1 - r} = \dfrac{5}{1/2} = 10$. R is false: the sum exists only for $|r| < 1$; the series $2 + 6 + 18 + \cdots$ keeps growing.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(S.eq(10) && gp(2, 3).sum(30).gt(10 ** 12), '10, and r = 3 diverges'); Cx.key('c'); });
}
{
  const x = amGm(4, 16);
  Q('ar3', mk.ar({ a: r`For the positive numbers $4$ and $16$, the arithmetic mean is smaller than the geometric mean.`, r: r`For any two positive numbers, the arithmetic mean is at least the geometric mean.`, key: 'd', sol: r`R is true. For $4$ and $16$ the arithmetic mean is $10$ and the geometric mean is $\sqrt{64} = 8$, so $10 > 8$ and A is false.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(x.A.eq(10) && x.G.eq(8) && x.A.gt(x.G), 'AM 10 > GM 8'); Cx.key('d'); });
}
{
  const g = gp(1, 2);
  Q('ar4', mk.ar({ a: r`The sum of the first $10$ terms of the geometric progression $1, 2, 4, \ldots$ is $1023$.`, r: r`In a geometric progression, every term after the first is the previous term multiplied by a fixed number.`, key: 'b', sol: r`Both statements are true. A follows from $S_{10} = \dfrac{2^{10} - 1}{2 - 1} = 1023$. R only describes what a geometric progression is; it does not give the sum, so it is not the explanation of A.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(g.sum(10).eq(1023) && g.list(10).reduce((s, t) => s.add(t), q(0)).eq(1023), '1023'); Cx.key('b'); });
}
{
  const ins = insertAMs(5, 47, 6);
  Q('ar5', mk.ar({ a: r`The sum of the $6$ arithmetic means inserted between $5$ and $47$ is $156$.`, r: r`The sum of $n$ arithmetic means inserted between $a$ and $b$ is $n \times \dfrac{a + b}{2}$.`, key: 'a', sol: r`With $d = \dfrac{47 - 5}{7} = 6$ the means are $11, 17, 23, 29, 35, 41$ and they add to $156$. This equals $6 \times \dfrac{5 + 47}{2} = 6 \times 26$, which is the rule in R.`, d: 3, c: 'analysis', t: [3] }), (Cx) => { Cx.assert(ins.d.eq(6) && ins.means.map(String).join() === '11,17,23,29,35,41' && ins.sumOfMeans.eq(156) && am(5, 47).mul(6).eq(156), '156 = 6 x 26'); Cx.key('a'); });
}
{
  const p = powerSums(8);
  Q('ar6', mk.ar({ a: r`The sum $1^3 + 2^3 + \cdots + 8^3$ equals $1296$.`, r: r`$1^3 + 2^3 + \cdots + n^3 = \dfrac{n(n+1)(2n+1)}{6}$.`, key: 'c', sol: r`A is true: $\sum k^3 = \left[\dfrac{n(n+1)}{2}\right]^2 = 36^2 = 1296$. R is false, because $\dfrac{n(n+1)(2n+1)}{6}$ is the sum of the squares; for $n = 8$ it gives $204$, not $1296$.`, d: 3, c: 'understanding', t: [4] }), (Cx) => { Cx.assert(p.s3 === 1296n && p.s2 === 204n && p.s1 === 36n, '1296 and 204'); Cx.key('c'); });
}

// =============================================================== true-false
{
  const a = (n) => n * (n + 1), L = range(1, 6).map(a);
  const diffs = L.slice(1).map((x, i) => x - L[i]);
  Q('tf1', mk.tf({ stem: r`The sequence $2, 6, 12, 20, 30, \ldots$ with $n$th term $a_n = n(n+1)$ is neither an arithmetic progression nor a geometric progression.`, key: 't', sol: r`The differences $4, 6, 8, 10$ are not equal, so it is not an arithmetic progression. The ratios $3, 2, \dfrac{5}{3}$ are not equal, so it is not a geometric progression.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(L.join() === '2,6,12,20,30,42' && new Set(diffs).size > 1 && ratioOf(L) === null, 'neither'); Cx.key('t'); });
}
{
  const g = gp(8, '-1/2');
  Q('tf2', mk.tf({ stem: r`In every geometric progression whose common ratio satisfies $|r| < 1$, each term is smaller than the term before it.`, key: 'f', sol: r`This fails when $r$ is negative. For $8, -4, 2, \ldots$ the common ratio is $-\dfrac{1}{2}$, yet the third term $2$ is larger than the second term $-4$.`, d: 3, c: 'understanding', t: [2] }), (Cx) => { const L = g.list(4); Cx.assert(L.join() === '8,-4,2,-1' && L[2].gt(L[1]), 'counter-example 8, -4, 2'); Cx.key('f'); });
}
{
  Q('tf3', mk.tf({ stem: r`The infinite series $2 + 6 + 18 + \cdots$ has the sum $\dfrac{2}{1 - 3} = -1$.`, key: 'f', sol: r`The formula $\dfrac{a}{1 - r}$ needs $|r| < 1$, and here $r = 3$. The partial sums $2, 8, 26, 80, \ldots$ grow without bound, so the series has no sum.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { const g = gp(2, 3); Cx.assert(g.sum(1).eq(2) && g.sum(2).eq(8) && g.sum(3).eq(26) && g.sum(4).eq(80) && g.sum(40).gt('1000000000000000000'), 'partial sums grow'); Cx.key('f'); });
}
{
  const pairs = []; for (let a = 1; a <= 20; a++) for (let b = a + 1; b <= 20; b++) pairs.push([a, b]);
  const all = pairs.every(([a, b]) => amGm(a, b).gap2.gt(0));
  Q('tf4', mk.tf({ stem: r`For two different positive numbers, the arithmetic mean is always strictly greater than the geometric mean.`, key: 't', sol: r`Since $\left(\sqrt{a} - \sqrt{b}\right)^2 > 0$ when $a \ne b$, we get $a + b > 2\sqrt{ab}$, which is the statement. Equality holds only when the two numbers are equal.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(all && pairs.length === 190, 'A^2 > ab for all 190 pairs'); Cx.key('t'); });
}
{
  const x = amGm(2, 18);
  Q('tf5', mk.tf({ stem: r`The number $6$ is both the arithmetic mean and the geometric mean of $2$ and $18$.`, key: 'f', sol: r`The geometric mean is $\sqrt{2 \times 18} = 6$, but the arithmetic mean is $\dfrac{2 + 18}{2} = 10$. The two means agree only when the numbers are equal.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(x.G.eq(6) && x.A.eq(10), 'G = 6, A = 10'); Cx.key('f'); });
}

// =============================================================== fill in the blank
{
  const a = [1]; for (let n = 1; n < 6; n++) a.push(2 * a[n - 1] + 1);
  Q('fb1', mk.fill({ stem: r`A sequence starts with $a_1 = 1$ and follows the rule $a_{n+1} = 2a_n + 1$. Its sixth term is ____.`, acc: [['63']], sol: r`The terms are $1, 3, 7, 15, 31, 63$, so the sixth term is $63$.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(a.join() === '1,3,7,15,31,63', '63'); Cx.blank(a[5]); });
}
{
  const g = ap(4, 4);
  Q('fb2', mk.fill({ stem: r`The first $15$ positive multiples of $4$, namely $4, 8, 12, \ldots, 60$, add up to ____.`, acc: [['480']], sol: r`This is an arithmetic progression with $n = 15$, $a = 4$, $l = 60$: $S = \dfrac{15}{2}(4 + 60) = 480$.`, d: 2, c: 'application', t: [1] }), (Cx) => { Cx.assert(g.term(15).eq(60) && g.sum(15).eq(480), '480'); Cx.blank(N(g.sum(15))); });
}
{
  const S = infSum(12, '-1/2');
  Q('fb3', mk.fill({ stem: r`Each term of $12, -6, 3, -\dfrac{3}{2}, \ldots$ is $-\dfrac{1}{2}$ times the one before it. If the terms are added without end, the total approached is ____.`, acc: [['8']], sol: r`$a = 12$ and $r = -\dfrac{1}{2}$, so $S = \dfrac{12}{1 + \frac{1}{2}} = \dfrac{12}{3/2} = 8$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(S.eq(8) && gp(12, '-1/2').list(4).join() === '12,-6,3,-3/2', '8'); Cx.blank(N(S)); });
}
{
  const G = gmExact(5, 45);
  Q('fb4', mk.fill({ stem: r`The geometric mean of $5$ and $45$ is ____.`, acc: [['15']], sol: r`$G = \sqrt{5 \times 45} = \sqrt{225} = 15$.`, d: 1, c: 'recall', t: [3] }), (Cx) => { Cx.assert(G.eq(15) && amGm(5, 45).A.eq(25), '15'); Cx.blank(N(G)); });
}
{
  const cand = range(-9, 9).filter((x) => x !== 0 && 3 * x ** 3 === 192);
  const g = gp(3, 4);
  Q('fb5', mk.fill({ stem: r`A geometric progression has first term $3$ and fourth term $192$. Its common ratio is ____.`, acc: [['4']], sol: r`$a r^3 = 192$ gives $3r^3 = 192$, so $r^3 = 64$ and $r = 4$.`, d: 2, c: 'application', t: [2] }), (Cx) => { Cx.assert(g.term(4).eq(192) && g.r.eq(4) && cand.join() === '4' && 4 ** 3 === 64, 'r = 4'); Cx.blank(4); });
}

// =============================================================== numerical
{
  const a = [2, 3]; for (let n = 2; n < 8; n++) a.push(a[n - 1] + a[n - 2]);
  Q('n01', mk.num({ stem: r`A sequence has $a_1 = 2$, $a_2 = 3$ and, for $n \ge 1$, $a_{n+2} = a_{n+1} + a_n$. Find its eighth term.`, value: 55, sol: r`Each term is the sum of the two before it: $2, 3, 5, 8, 13, 21, 34, 55$. So $a_8 = 34 + 21 = 55$.`, scheme: [['Listing 5, 8, 13, 21, 34', 0.5], ['a_8 = 55', 0.5]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(a.join() === '2,3,5,8,13,21,34,55', '55'); Cx.val(a[7]); });
}
{
  const n = range(100, 500).filter((v) => v % 6 === 0).length;
  const g = ap(102, 6), last = range(100, 500).filter((v) => v % 6 === 0).pop();
  Q('n02', mk.num({ stem: r`How many multiples of $6$ lie between $100$ and $500$?`, value: 67, sol: r`The multiples run $102, 108, \ldots, 498$, an arithmetic progression with $a = 102$ and $d = 6$. From $102 + (n-1)6 = 498$ we get $n - 1 = 66$, so $n = 67$.`, scheme: [['First multiple 102 and last multiple 498', 0.5], ['102 + (n - 1) 6 = 498 gives n = 67', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(n === 67 && last === 498 && g.term(67).eq(498), '67'); Cx.val(n); });
}
{
  const g = gp(5, 2);
  Q('n03', mk.num({ stem: r`In a geometric progression of positive terms the third term is $20$ and the sixth term is $160$. Find the eighth term.`, value: 640, sol: r`$\dfrac{ar^5}{ar^2} = r^3 = \dfrac{160}{20} = 8$, so $r = 2$ and $a = \dfrac{20}{4} = 5$. Then $a_8 = 5 \times 2^7 = 640$.`, scheme: [['r^3 = 8, so r = 2 and a = 5', 0.5], ['a_8 = 5 x 2^7 = 640', 0.5]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(g.term(3).eq(20) && g.term(6).eq(160) && g.term(8).eq(640), '640'); Cx.val(640); });
}
{
  const g = gp(1, 3), n = g.termsForSum(29524);
  Q('n04', mk.num({ stem: r`The terms of $1, 3, 9, 27, \ldots$ are added one after another. After how many terms does the running total first equal $29524$?`, value: 10, sol: r`$S_n = \dfrac{3^n - 1}{3 - 1} = 29524$ gives $3^n = 59049 = 3^{10}$, so $n = 10$.`, scheme: [['S_n = (3^n - 1)/2 = 29524', 0.5], ['3^n = 59049, n = 10', 0.5]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(n === 10 && g.sum(10).eq(29524), 'n = 10'); Cx.val(n); });
}
{
  const a = 9, S = 12, rr = Rat.of(1).sub(Rat.of(a).div(S));
  Q('n05', mk.num({ stem: r`An infinite geometric series has first term $9$ and sum $12$. Find its common ratio.`, value: 0.25, sol: r`$\dfrac{9}{1 - r} = 12$ gives $1 - r = \dfrac{9}{12} = \dfrac{3}{4}$, so $r = \dfrac{1}{4} = 0.25$.`, scheme: [['9/(1 - r) = 12', 0.5], ['r = 1/4 = 0.25', 0.5]], d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(rr.eq('1/4') && infSum(9, rr).eq(12), 'r = 1/4'); Cx.val(N(rr)); });
}
{
  const hits = range(1, 50).filter((a) => a < 50 - a && a * (50 - a) === 576);
  const x = amGm(18, 32);
  Q('n06', mk.num({ stem: r`Two positive numbers have arithmetic mean $25$ and geometric mean $24$. Find the difference between the larger and the smaller number.`, value: 14, sol: r`The sum is $50$ and the product is $576$, so the numbers are the roots of $t^2 - 50t + 576 = 0$, i.e. $(t - 18)(t - 32) = 0$. Their difference is $32 - 18 = 14$.`, scheme: [['Sum 50 and product 576', 0.5], ['Roots 18 and 32, difference 14', 0.5]], d: 3, c: 'analysis', t: [3], time: 120 }), (Cx) => { Cx.assert(hits.join() === '18' && x.A.eq(25) && x.G.eq(24), '18 and 32'); Cx.val(32 - hits[0]); });
}
{
  const p = powerSums(9);
  Q('n07', mk.num({ stem: r`Using the formula for the sum of cubes of the first $n$ natural numbers, find $1^3 + 2^3 + 3^3 + \cdots + 9^3$.`, value: 2025, sol: r`$\sum k^3 = \left[\dfrac{n(n+1)}{2}\right]^2 = \left[\dfrac{9 \times 10}{2}\right]^2 = 45^2 = 2025$.`, scheme: [['n(n+1)/2 = 45', 0.5], ['45^2 = 2025', 0.5]], d: 2, c: 'understanding', t: [4], time: 60 }), (Cx) => { Cx.assert(p.s3 === 2025n && p.s1 === 45n, '2025'); Cx.val(Number(p.s3)); });
}

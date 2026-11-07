// CBSE 9 Mathematics ch03 Sequences and Progressions: objective items (mcq, assertion-reason, true-false, fill-blank,
// match, numerical). Every key is re-solved by iteration or search from the givens (h.mjs), not by the formula in the solution.
import { Q, mk } from './lib.mjs';
import { r, must, T$, close, ap, gp, seq, iterate, fibLike, isAP, isGP, tri, sq, hanoi, playHanoi, range } from './h.mjs';

/** Four-option MCQ: o.ans first (key a), o.wr the three plausible wrong values; target is re-solved independently. */
function MC(key, o, target, pre) {
  const vals = [o.ans, ...o.wr];
  must(new Set(vals.map((v) => JSON.stringify(v))).size === 4, `${key}: options distinct`);
  Q(key, mk.mcq({ stem: o.stem, opts: o.opts ?? vals.map(T$), key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75 }), (Cx) => { if (pre) pre(Cx); Cx.which(vals, target); });
}

// =============================================================== MCQ
{
  const t = iterate(9, (a) => a + 5, 5);
  MC('m01', { stem: r`A sequence starts with $a_1 = 9$ and follows the rule $a_{n+1} = a_n + 5$. Its fifth term is`, ans: 29, wr: [24, 34, 25], sol: r`Apply the rule four times: $9, 14, 19, 24, 29$, so $a_5 = 29$. The value $24$ is $a_4$, $34$ is $a_6$, and $25$ forgets the starting term and works out $5 \times 5$.`, d: 1, c: 'recall', t: [1], time: 60 }, t[4], (Cx) => Cx.assert(t.join() === '9,14,19,24,29', 'terms 9, 14, 19, 24, 29'));
}
{
  const sticks = iterate(4, (a) => a + 3, 12);
  MC('m02', { stem: r`Squares are made in a row from matchsticks, each new square sharing one side with the square before it. One square needs $4$ sticks, two squares need $7$ sticks and three squares need $10$ sticks. How many sticks make $12$ squares?`, ans: 37, wr: [36, 39, 48], sol: r`Each new square adds $3$ sticks, so $a_n = 4 + 3(n - 1) = 3n + 1$. For $n = 12$ this gives $3 \times 12 + 1 = 37$. The value $36$ forgets the extra stick at the start, $39$ uses $3(n + 1)$, and $48$ treats every square as a separate $4$-stick square.`, d: 2, c: 'application', t: [1], time: 90 }, sticks[11], (Cx) => Cx.assert(sticks.slice(0, 3).join() === '4,7,10' && sticks[11] === 3 * 12 + 1, 'sticks 4, 7, 10 and 37 for twelve squares'));
}
{
  const want = [6, 10, 14, 18, 22];
  const fs = [(n) => 4 * n + 2, (n) => 4 * n + 6, (n) => 6 * n + 4, (n) => n + 5];
  const vals = fs.map((g) => seq(5, g));
  MC('m03', { stem: r`The sequence $6, 10, 14, 18, \ldots$ has the explicit formula`, ans: vals[0], wr: vals.slice(1), opts: [r`$a_n = 4n + 2$`, r`$a_n = 4n + 6$`, r`$a_n = 6n + 4$`, r`$a_n = n + 5$`], sol: r`The terms go up by $4$ each time, so $a_n = 4n + c$. Putting $n = 1$ gives $4 + c = 6$, so $c = 2$ and $a_n = 4n + 2$. Check: $n = 2$ gives $10$ and $n = 3$ gives $14$. The formula $4n + 6$ starts at $10$, $6n + 4$ starts at $10$ and goes up by $6$, and $n + 5$ goes up by only $1$.`, d: 2, c: 'understanding', t: [1], time: 75 }, want);
}
{
  const t = fibLike(3, 5, 6);
  MC('m04', { stem: r`A sequence has $a_1 = 3$, $a_2 = 5$ and each later term is the sum of the two terms just before it, $a_{n+2} = a_{n+1} + a_n$. Its sixth term is`, ans: 34, wr: [21, 55, 29], sol: r`List the terms: $3, 5, 8, 13, 21, 34$. So $a_6 = 34$. The value $21$ is $a_5$, $55$ is $a_7$, and $29$ is the total $3 + 5 + 8 + 13$ of the first four terms.`, d: 2, c: 'application', t: [1], time: 75 }, t[5], (Cx) => Cx.assert(t.join() === '3,5,8,13,21,34' && t.slice(0, 4).reduce((s, x) => s + x, 0) === 29, 'terms 3, 5, 8, 13, 21, 34'));
}
{
  const diff = sq(15) - sq(14);
  MC('m05', { stem: r`The square numbers are $1, 4, 9, 16, \ldots$ and the $n$th one is $n^2$. By how much does the $15$th square number exceed the $14$th?`, ans: 29, wr: [28, 30, 15], sol: r`$15^2 - 14^2 = 225 - 196 = 29$. In general $(n + 1)^2 - n^2 = 2n + 1$, and for $n = 14$ this is $29$. The values $28$ and $30$ are $2 \times 14$ and $2 \times 15$, and $15$ is just the position.`, d: 2, c: 'application', t: [1], time: 75 }, diff, (Cx) => Cx.assert(sq(14) === 196 && sq(15) === 225 && range(1, 40).every((n) => sq(n + 1) - sq(n) === 2 * n + 1), 'difference 2n + 1'));
}
{
  const g = [40, 33, 26, 19].map((v, i, a) => (i ? v - a[i - 1] : null)).slice(1);
  MC('m06', { stem: r`The common difference of the arithmetic progression $40, 33, 26, 19, \ldots$ is`, ans: -7, wr: [7, -14, 14], sol: r`Subtract each term from the next: $33 - 40 = -7$, $26 - 33 = -7$ and $19 - 26 = -7$. The common difference is $-7$, which is negative because the terms fall. The value $7$ has the wrong sign, and $\pm 14$ is the gap between alternate terms.`, d: 1, c: 'recall', t: [2], time: 45 }, g[0], (Cx) => Cx.assert(g.every((x) => x === -7), 'all gaps -7'));
}
{
  const a18 = ap(12, 7, 18);
  MC('m07', { stem: r`The $18$th term of the arithmetic progression $12, 19, 26, \ldots$ is`, ans: 131, wr: [138, 126, 124], sol: r`Here $a = 12$ and $d = 7$, so $a_{18} = 12 + 17 \times 7 = 131$. The value $138$ uses $18 \times 7$ instead of $17 \times 7$, $126$ forgets the first term, and $124$ uses $16$ steps.`, d: 2, c: 'understanding', t: [2], time: 75 }, iterate(12, (a) => a + 7, 18)[17], (Cx) => Cx.assert(a18 === 131, 'a18 = 131'));
}
{
  const n = range(1, 100).find((k) => ap(15, 7, k) === 218);
  MC('m08', { stem: r`Which term of the arithmetic progression $15, 22, 29, \ldots$ is $218$?`, ans: 30, wr: [29, 31, 32], sol: r`Solve $15 + (n - 1) \times 7 = 218$. Then $(n - 1) \times 7 = 203$, so $n - 1 = 29$ and $n = 30$. The values $29$ and $31$ come from an off-by-one slip, and $32$ from using the common difference $6$.`, d: 2, c: 'application', t: [2], time: 90 }, n, (Cx) => Cx.assert(n === 30 && ap(15, 7, 29) !== 218 && ap(15, 7, 31) !== 218, 'the 30th term is 218'));
}
{
  const sol = [];
  for (let a = -50; a <= 50; a++) for (let d = -20; d <= 20; d++) if (ap(a, d, 3) === 17 && ap(a, d, 8) === 42) sol.push([a, d]);
  must(sol.length === 1, 'unique AP');
  MC('m09', { stem: r`The $3$rd term of an arithmetic progression is $17$ and its $8$th term is $42$. Its first term is`, ans: 7, wr: [12, 2, 5], sol: r`From the $3$rd to the $8$th term there are $5$ steps, so $5d = 42 - 17 = 25$ and $d = 5$. Then $a + 2d = 17$ gives $a = 17 - 10 = 7$. The value $12$ is the $2$nd term, $2$ comes from using $3d$ instead of $2d$, and $5$ is the common difference.`, d: 2, c: 'application', t: [2], time: 90 }, sol[0][0], (Cx) => Cx.assert(sol[0][1] === 5 && ap(7, 5, 2) === 12, 'a = 7, d = 5'));
}
{
  const lists = [[27, 21, 15, 9], [2, 6, 18, 54], [1, 3, 6, 10], [5, 10, 20, 40]];
  MC('m10', { stem: r`A student writes four lists of numbers. Exactly one of them has the same gap between every two consecutive terms. Which one is it?`, ans: 1, wr: [0, 0.5, 0.25], opts: lists.map((l) => `$${l.join(', ')}, \\ldots$`), sol: r`Check the gaps. In $27, 21, 15, 9$ each gap is $-6$, so it is an arithmetic progression. In $2, 6, 18, 54$ and $5, 10, 20, 40$ the terms are multiplied by $3$ and $2$ (gaps $4, 12, 36$ and $5, 10, 20$), and in $1, 3, 6, 10$ the gaps are $2, 3, 4$.`, d: 2, c: 'understanding', t: [2], time: 75 }, 1, (Cx) => { Cx.assert(isAP(lists[0]) && !isAP(lists[1]) && !isAP(lists[2]) && !isAP(lists[3]), 'only the first list is an AP'); });
}
{
  const pts = [[1, 22], [2, 17], [3, 12]];
  const d = pts[1][1] - pts[0][1];
  MC('m11', { stem: r`Three points $(n, a_n)$ of an arithmetic progression are plotted on a graph: $(1, 22)$, $(2, 17)$ and $(3, 12)$. The $10$th term of the progression is`, ans: -23, wr: [-28, -18, 67], sol: r`Each step to the right lowers the height by $5$, so $d = -5$ and $a = 22$. Then $a_{10} = 22 + 9 \times (-5) = -23$. The value $-28$ is $a_{11}$, $-18$ is $a_9$, and $67$ comes from using $d = +5$.`, d: 3, c: 'analysis', t: [2], time: 90 }, ap(22, d, 10), (Cx) => Cx.assert(d === -5 && pts[2][1] - pts[1][1] === d && ap(22, d, 11) === -28 && ap(22, d, 9) === -18, 'd = -5'));
}
{
  const n = range(1, 200).find((k) => 6 * k - 11 === 85);
  MC('m12', { stem: r`The $n$th term of a sequence is $a_n = 6n - 11$. Which term of the sequence equals $85$?`, ans: 16, wr: [15, 14, 17], sol: r`Solve $6n - 11 = 85$: $6n = 96$ and $n = 16$. Check: $6 \times 16 - 11 = 85$. The values $15$ and $17$ are neighbouring terms ($79$ and $91$), and $14$ gives $73$.`, d: 2, c: 'application', t: [2], time: 75 }, n, (Cx) => Cx.assert(n === 16 && 6 * 15 - 11 === 79 && 6 * 17 - 11 === 91, 'n = 16'));
}
{
  const q = 160 / 640;
  MC('m13', { stem: r`A photocopier shrinks a 640 mm drawing again and again, giving widths $640, 160, 40, 10, \ldots$ mm. The constant multiplier between successive widths is`, ans: 0.25, wr: [4, 0.75, 0.5], opts: [r`$\dfrac{1}{4}$`, '$4$', r`$\dfrac{3}{4}$`, r`$\dfrac{1}{2}$`], sol: r`Divide each term by the one before it: $\dfrac{160}{640} = \dfrac{1}{4}$ and $\dfrac{40}{160} = \dfrac{1}{4}$. The ratio is $\dfrac{1}{4}$, so the terms shrink. The value $4$ is the ratio upside down.`, d: 1, c: 'recall', t: [3], time: 60 }, q, (Cx) => Cx.assert(isGP([640, 160, 40, 10]) && close(40 / 160, q), 'ratio 1/4'));
}
{
  const g = iterate(7, (a) => a * 2, 6);
  MC('m14', { stem: r`A message forwarded in a school group reaches $7, 14, 28, \ldots$ phones in successive rounds. In round $6$ it reaches`, ans: 224, wr: [448, 84, 42], sol: r`Here $a = 7$ and $r = 2$, so $a_6 = 7 \times 2^5 = 7 \times 32 = 224$. The value $448$ uses the power $6$ instead of $5$, $84$ multiplies $7$ by $2 \times 6$, and $42$ treats the list as an arithmetic progression ($7 + 5 \times 7$).`, d: 2, c: 'understanding', t: [3], time: 75 }, g[5], (Cx) => Cx.assert(gp(7, 2, 6) === g[5] && g[5] === 224, 'a6 = 224'));
}
{
  const sol = [];
  for (let a = 1; a <= 60; a++) for (let q = 1; q <= 20; q++) if (gp(a, q, 2) === 12 && gp(a, q, 5) === 96) sol.push([a, q]);
  must(sol.length === 1, 'unique GP');
  MC('m15', { stem: r`In a geometric progression of positive terms the $2$nd term is $12$ and the $5$th term is $96$. Its first term is`, ans: 6, wr: [2, 8, 3], sol: r`Going from the $2$nd to the $5$th term multiplies by $r^3$, so $r^3 = \dfrac{96}{12} = 8$ and $r = 2$. Then $a \times 2 = 12$ gives $a = 6$. The value $2$ is the ratio, $8$ is $r^3$, and $3$ comes from the slip $r = 4$.`, d: 3, c: 'application', t: [3], time: 90 }, sol[0][0], (Cx) => Cx.assert(sol[0][1] === 2 && gp(6, 2, 2) === 12 && gp(6, 2, 5) === 96, 'a = 6, r = 2'));
}
{
  const c = iterate(1, (a) => a * 3, 6);
  MC('m16', { stem: r`In the Sierpinski triangle construction, stage $0$ is one triangle and at every stage each triangle is replaced by $3$ smaller ones. How many small triangles are there at stage $5$?`, ans: 243, wr: [125, 81, 729], sol: r`The count is multiplied by $3$ at each stage, so it is $3^5 = 243$. The value $125$ is $5^3$ (powers swapped), $81$ is the count at stage $4$, and $729$ is the count at stage $6$.`, d: 1, c: 'understanding', t: [3], time: 60 }, c[5], (Cx) => Cx.assert(c.join() === '1,3,9,27,81,243' && 5 ** 3 === 125, 'counts 1, 3, 9, 27, 81, 243'));
}
{
  const s = iterate(3, (a) => a * 4, 4);
  MC('m17', { stem: r`A Koch snowflake starts, at stage $0$, as an equilateral triangle with $3$ sides, and every stage replaces each side by $4$ shorter sides. How many sides does it have at stage $3$?`, ans: 192, wr: [48, 768, 81], sol: r`The number of sides is multiplied by $4$ at each stage: $3, 12, 48, 192$. So stage $3$ has $3 \times 4^3 = 192$ sides. The value $48$ is stage $2$, $768$ is stage $4$, and $81$ comes from multiplying by $3$ instead of $4$.`, d: 2, c: 'application', t: [3], time: 75 }, s[3], (Cx) => Cx.assert(s.join() === '3,12,48,192' && 3 * 3 ** 3 === 81, 'sides 3, 12, 48, 192'));
}
{
  const mv = hanoi(8), end = playHanoi(8, mv);
  MC('m18', { stem: r`What is the least number of moves needed to shift $8$ discs from one peg to another in the Tower of Hanoi?`, ans: 255, wr: [256, 127, 511], sol: r`For $n$ discs the least number of moves is $2^n - 1$. For $n = 8$ this is $2^8 - 1 = 256 - 1 = 255$. The value $256$ forgets the $-1$, $127$ is the answer for $7$ discs, and $511$ is the answer for $9$ discs.`, d: 1, c: 'recall', t: [3], time: 60 }, mv.length, (Cx) => Cx.assert(end.C.length === 8 && end.A.length === 0 && hanoi(7).length === 127 && hanoi(9).length === 511, 'the recursive plan finishes in 255 legal moves'));
}
{
  const mv = hanoi(9), secs = mv.length * 2;
  MC('m19', { stem: r`A volunteer at a school fair makes one Tower of Hanoi move every $2$ seconds and never wastes a move. How many seconds does the $9$-disc tower take at the very least?`, ans: 1022, wr: [1024, 511, 1020], sol: r`The least number of moves is $2^9 - 1 = 511$, and each takes $2$ seconds, so the time is $511 \times 2 = 1022$ seconds. The value $1024$ would be $2^{10}$, $511$ forgets the $2$ seconds, and $1020$ comes from $510 \times 2$.`, d: 3, c: 'analysis', t: [3], time: 90 }, secs, (Cx) => Cx.assert(mv.length === 511 && secs === 1022, '511 moves, 1022 seconds'));
}
{
  const day = range(1, 60).find((n) => 3 * 2 ** (n - 1) > 100);
  MC('m20', { stem: r`A water-lily patch on a pond in Kerala covers $3$ square metres on day $1$, and its area doubles every day. On which day does the patch first cover more than $100$ square metres?`, ans: 7, wr: [6, 8, 33], sol: r`The area on day $n$ is $3 \times 2^{n-1}$. Day $6$ gives $3 \times 32 = 96$, which is not above $100$, and day $7$ gives $3 \times 64 = 192$. So the first day is the $7$th. The value $8$ is a later day, and $33$ comes from the slip $100 \div 3$.`, d: 3, c: 'application', t: [3], time: 90 }, day, (Cx) => Cx.assert(day === 7 && gp(3, 2, 6) === 96 && gp(3, 2, 7) === 192, 'day 7'));
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The $12$th triangular number is $78$.`, r: r`The $n$th triangular number is $1 + 2 + 3 + \cdots + n = \dfrac{n(n+1)}{2}$.`, key: 'a', sol: r`$\dfrac{12 \times 13}{2} = 78$, so A is true. R gives the explicit formula that was used, and it is true, so R explains A.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(tri(12) === 78 && range(1, 30).every((n) => tri(n) === (n * (n + 1)) / 2), 'tri(12) = 78 and the formula'); Cx.key('a'); });
{
  const L = [2, 4, 8, 14, 22];
  Q('ar2', mk.ar({ a: r`The list $2, 4, 8, 14, 22, \ldots$ is an arithmetic progression.`, r: r`In an arithmetic progression the difference between every two consecutive terms is the same.`, key: 'd', sol: r`R is true: it is the definition. But the gaps in the list are $2, 4, 6, 8$, which are not equal, so the list is not an arithmetic progression and A is false.`, d: 2, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(!isAP(L) && L.slice(1).map((x, i) => x - L[i]).join() === '2,4,6,8', 'gaps 2, 4, 6, 8'); Cx.key('d'); });
}
{
  const apPts = seq(6, (n) => [n, ap(5, 3, n)]), gpPts = seq(6, (n) => [n, gp(1, 2, n)]);
  const collinear = (P) => P.every((p, i) => i < 2 || close((P[1][1] - P[0][1]) * (p[0] - P[0][0]), (p[1] - P[0][1]) * (P[1][0] - P[0][0])));
  Q('ar3', mk.ar({ a: r`The points $(n, a_n)$ of an arithmetic progression lie on a straight line.`, r: r`The points $(n, a_n)$ of a geometric progression with common ratio $2$ also lie on a straight line.`, key: 'c', sol: r`A is true: $a_n = a + (n - 1)d$ rises by the same amount $d$ for every step to the right. R is false: for $1, 2, 4, 8, \ldots$ the rises are $1, 2, 4, \ldots$, which keep growing, so the points curve upwards.`, d: 2, c: 'understanding', t: [2, 3] }), (Cx) => { Cx.assert(collinear(apPts) && !collinear(gpPts), 'AP points collinear, GP points not'); Cx.key('c'); });
}
Q('ar4', mk.ar({ a: r`The $10$th term of the arithmetic progression $4, 9, 14, \ldots$ is $49$.`, r: r`The common difference of an arithmetic progression can be negative.`, key: 'b', sol: r`$a_{10} = 4 + 9 \times 5 = 49$, so A is true. R is also true (for example $20, 17, 14, \ldots$), but it says nothing about how $49$ is found, so it does not explain A.`, d: 2, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(ap(4, 5, 10) === 49 && isAP([20, 17, 14]), 'a10 = 49'); Cx.key('b'); });
{
  const c = iterate(1, (a) => a * 3, 5);
  Q('ar5', mk.ar({ a: r`At stage $4$ of the Sierpinski triangle construction there are $81$ small triangles.`, r: r`At each stage every triangle is replaced by $3$ smaller triangles, so the number of triangles is multiplied by $3$.`, key: 'a', sol: r`The counts are $1, 3, 9, 27, 81$, so stage $4$ has $3^4 = 81$ triangles and A is true. R states the multiplying rule that produces these counts, so it explains A.`, d: 1, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(c[4] === 81, 'stage 4 has 81'); Cx.key('a'); });
}
{
  const mv = hanoi(5);
  Q('ar6', mk.ar({ a: r`With $5$ discs the Tower of Hanoi needs at least $31$ moves.`, r: r`With $n$ discs the least number of moves is $2n - 1$.`, key: 'c', sol: r`A is true: $2^5 - 1 = 31$. R is false: the least number is $2^n - 1$, not $2n - 1$. For $5$ discs, $2n - 1$ would give only $9$.`, d: 3, c: 'analysis', t: [3] }), (Cx) => { Cx.assert(mv.length === 31 && 2 * 5 - 1 === 9 && hanoi(4).length !== 2 * 4 - 1, '31 moves, not 9'); Cx.key('c'); });
}

// =============================================================== true-false
{
  const sqs = seq(6, (n) => n * n);
  Q('tf1', mk.tf({ stem: r`The list of square numbers $1, 4, 9, 16, 25, \ldots$ is neither an arithmetic progression nor a geometric progression.`, key: 't', sol: r`The gaps are $3, 5, 7, 9$, which are not equal, and the ratios are $4, 2.25, \ldots$, which are not equal either. So the list is neither kind of progression.`, d: 2, c: 'understanding', t: [1, 2, 3] }), (Cx) => { Cx.assert(!isAP(sqs) && !isGP(sqs), 'neither AP nor GP'); Cx.key('t'); });
}
{
  const first = range(1, 30).find((n) => ap(50, -6, n) < 0);
  Q('tf2', mk.tf({ stem: r`The arithmetic progression $50, 44, 38, \ldots$ has no negative terms.`, key: 'f', sol: r`The common difference is $-6$, so the terms keep falling and must become negative. The $9$th term is $50 + 8 \times (-6) = 2$ and the $10$th term is $50 + 9 \times (-6) = -4$, so the statement is false.`, d: 2, c: 'application', t: [2] }), (Cx) => { Cx.assert(first === 10 && ap(50, -6, 9) === 2 && ap(50, -6, 10) === -4, 'the 10th term is -4'); Cx.key('f'); });
}
{
  const g = [1296, 216, 36];
  Q('tf3', mk.tf({ stem: r`The list $1296, 216, 36, \ldots$ is a geometric progression with common ratio $\dfrac{1}{6}$, and its $5$th term is $1$.`, key: 't', sol: r`The ratios are $\dfrac{216}{1296} = \dfrac{1}{6}$ and $\dfrac{36}{216} = \dfrac{1}{6}$. The terms are $1296, 216, 36, 6, 1$, so the $5$th term is $1$. The statement is true.`, d: 2, c: 'application', t: [3] }), (Cx) => { Cx.assert(isGP(g) && iterate(1296, (a) => a / 6, 5)[4] === 1, 'ratio 1/6, fifth term 1'); Cx.key('t'); });
}

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The $5$th triangular number is ____.`, acc: [['15']], sol: r`Add the first five counting numbers: $1 + 2 + 3 + 4 + 5 = 15$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(tri(5) === 15, 'T5 = 15'); Cx.blank(15); });
Q('fb2', mk.fill({ stem: r`In the arithmetic progression with first term $20$ and common difference $-3$, the $9$th term is ____.`, acc: [['-4']], sol: r`$a_9 = 20 + 8 \times (-3) = 20 - 24 = -4$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(iterate(20, (a) => a - 3, 9)[8] === -4, 'a9 = -4'); Cx.blank(-4); });
Q('fb3', mk.fill({ stem: r`A geometric progression has first term $5$ and common ratio $-2$. Its $4$th term is ____.`, acc: [['-40']], sol: r`The terms are $5, -10, 20, -40$, so the $4$th term is $5 \times (-2)^3 = -40$.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(iterate(5, (a) => a * -2, 4).join() === '5,-10,20,-40', 'terms 5, -10, 20, -40'); Cx.blank(-40); });

// =============================================================== match (2 marks)
function MT(key, o, check) {
  const q = mk.short({ marks: 2, stem: o.stem, model: 'x', sol: o.sol, scheme: o.pairs.map((_, i) => [`${i + 1} paired with ${'pqrs'[o.order[i]]}`, 2 / o.pairs.length]), d: o.d, c: o.c, t: o.t, time: 120 });
  q.type = 'match';
  q.options = o.pairs.map(([l], i) => ({ id: String(i + 1), text_md: l }));
  q.match_right = o.pairs.map(([, rt], i) => ({ id: 'pqrs'[o.order[i]], text_md: rt })).sort((x, y) => x.id.localeCompare(y.id));
  q.answer = { pairs: o.pairs.map((_, i) => ({ left_id: String(i + 1), right_id: 'pqrs'[o.order[i]] })) };
  Q(key, q, check);
}
{
  const lists = [[4, 7, 10, 13], [2, 4, 8, 16], [1, 4, 9, 16], [3, 7, 11, 15]];
  const fs = { p: (n) => 4 * n - 1, q: (n) => n * n, r: (n) => 3 * n + 1, s: (n) => 2 ** n };
  const order = [2, 3, 1, 0];
  MT('mt1', { stem: 'Match each sequence in Column I with its explicit formula in Column II.', pairs: [[r`$4, 7, 10, 13, \ldots$`, r`$a_n = 3n + 1$`], [r`$2, 4, 8, 16, \ldots$`, r`$a_n = 2^n$`], [r`$1, 4, 9, 16, \ldots$`, r`$a_n = n^2$`], [r`$3, 7, 11, 15, \ldots$`, r`$a_n = 4n - 1$`]], order, sol: r`Test each formula on $n = 1, 2, 3, 4$. The formula $3n + 1$ gives $4, 7, 10, 13$; $2^n$ gives $2, 4, 8, 16$; $n^2$ gives $1, 4, 9, 16$; and $4n - 1$ gives $3, 7, 11, 15$.`, d: 2, c: 'understanding', t: [1] }, (Cx) => {
    const hit = lists.map((L) => Object.keys(fs).filter((k) => seq(4, fs[k]).join() === L.join()));
    Cx.assert(hit.every((h, i) => h.length === 1 && h[0] === 'pqrs'[order[i]]), 'each list matches exactly one formula, as keyed');
  });
}
{
  const counts = { sier: iterate(1, (a) => a * 3, 4)[3], koch: iterate(3, (a) => a * 4, 3)[2], hanoi: hanoi(5).length, cells: iterate(1, (a) => a * 2, 7)[6] };
  const order = [1, 0, 3, 2];
  MT('mt2', { stem: 'Match each situation in Column I with its count in Column II.', pairs: [['Sierpinski triangle: number of small triangles at stage $3$', '$27$'], ['Koch snowflake: number of sides at stage $2$', '$48$'], ['Tower of Hanoi: least number of moves for $5$ discs', '$31$'], ['A culture that starts with $1$ cell and doubles $6$ times: number of cells', '$64$']], order, sol: r`The Sierpinski count at stage $3$ is $3^3 = 27$. The Koch snowflake has $3 \times 4^2 = 48$ sides at stage $2$. The Tower of Hanoi with $5$ discs needs $2^5 - 1 = 31$ moves. Doubling $6$ times gives $2^6 = 64$ cells.`, d: 2, c: 'application', t: [3] }, (Cx) => {
    Cx.assert(counts.sier === 27 && counts.koch === 48 && counts.hanoi === 31 && counts.cells === 64 && order.length === 4, 'counts 27, 48, 31, 64');
  });
}

// =============================================================== numerical
{
  let rows = 0, tins = 0;
  for (let k = 1; k <= 20; k++) { rows += k; tins = rows; }
  Q('n01', mk.num({ stem: r`A shopkeeper in Nagpur stacks tins in a triangle: $1$ tin in the top row, $2$ in the next row, $3$ in the next, and so on, with one more tin in each row below. How many tins are there in $20$ rows?`, value: 210, sol: r`The totals are the triangular numbers, and the $20$th is $\dfrac{20 \times 21}{2} = 210$ tins.`, scheme: [['Uses n(n + 1) / 2 or adds 1 + 2 + ... + 20', 0.5], ['210 tins', 0.5]], d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(tins === 210 && tri(20) === 210, '210'); Cx.val(tins); });
}
{
  const fare = iterate(40, (a) => a + 12, 15);
  Q('n02', mk.num({ stem: r`A taxi in Nashik charges ₹40 for the first kilometre and ₹12 for every further kilometre, so the fares for $1, 2, 3, \ldots$ kilometres form an arithmetic progression. Find the fare, in rupees, for a $15$ km ride.`, value: 208, sol: r`Here $a = 40$ and $d = 12$, so $a_{15} = 40 + 14 \times 12 = 208$ rupees.`, scheme: [['a = 40, d = 12 and 14 steps', 0.5], ['208 rupees', 0.5]], d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(fare[14] === 208 && fare.slice(0, 3).join() === '40,52,64', 'fares 40, 52, 64 and 208'); Cx.val(fare[14]); });
}
{
  const h = iterate(160, (a) => a / 2, 6);
  Q('n03', mk.num({ stem: r`A ball dropped from a height of $160$ cm rebounds, after every bounce, to half of its previous height. Find the height, in cm, it reaches after the $5$th bounce.`, value: 5, sol: r`The heights are $160, 80, 40, 20, 10, 5$ (the first is the starting height). After the $5$th bounce the height is $160 \times \dfrac{1}{32} = 5$ cm.`, scheme: [['Common ratio 1/2 and five halvings', 0.5], ['5 cm', 0.5]], d: 2, c: 'application', t: [3], time: 75 }), (Cx) => { Cx.assert(h[5] === 5 && gp(160, 0.5, 6) === 5, '5 cm'); Cx.val(h[5]); });
}
{
  const mv = hanoi(10);
  Q('n04', mk.num({ stem: r`Find the least number of moves needed to shift $10$ discs in the Tower of Hanoi from one peg to another.`, value: 1023, sol: r`For $n$ discs the least number of moves is $2^n - 1$, so for $10$ discs it is $2^{10} - 1 = 1024 - 1 = 1023$.`, scheme: [['2^10 - 1', 0.5], ['1023 moves', 0.5]], d: 1, c: 'recall', t: [3], time: 60 }), (Cx) => { Cx.assert(mv.length === 1023 && playHanoi(10, mv).C.length === 10, '1023 legal moves'); Cx.val(mv.length); });
}
{
  const n = range(1, 500).find((k) => ap(14, 7, k) === 357);
  Q('n05', mk.num({ stem: r`How many terms are there in the arithmetic progression $14, 21, 28, \ldots, 357$?`, value: 50, sol: r`Here $a = 14$ and $d = 7$. Solve $14 + (n - 1) \times 7 = 357$: $(n - 1) \times 7 = 343$, so $n - 1 = 49$ and $n = 50$.`, scheme: [['14 + (n - 1) x 7 = 357', 0.5], ['n = 50', 0.5]], d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(n === 50, '50 terms'); Cx.val(n); });
}

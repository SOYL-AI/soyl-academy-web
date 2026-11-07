// CBSE 9 Mathematics ch03 Sequences and Progressions: written items (short 2 and 3 marks, long 5 marks, case-based).
// Every number in a model answer is re-computed by iteration, search or simulation (h.mjs).
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, must, close, ap, gp, seq, iterate, isAP, isGP, tri, hanoi, playHanoi, koch, range } from './h.mjs';

// =============================================================== short answer, 2 marks
{
  const t = iterate(11, (a) => 2 * a - 3, 5), gaps = t.slice(1).map((x, i) => x - t[i]);
  Q('s201', mk.short({ marks: 2, stem: r`A sequence starts with $a_1 = 11$ and follows the rule $a_{n+1} = 2a_n - 3$. Write its first five terms and say, with a reason, whether it is an arithmetic progression.`, model: r`$a_2 = 2 \times 11 - 3 = 19$, $a_3 = 2 \times 19 - 3 = 35$, $a_4 = 2 \times 35 - 3 = 67$ and $a_5 = 2 \times 67 - 3 = 131$. So the terms are $11, 19, 35, 67, 131$.\n\nThe gaps are $8, 16, 32, 64$, which are not equal, so it is not an arithmetic progression.`, sol: 'Apply the rule four times, then compare the gaps.', scheme: [['Terms 11, 19, 35, 67, 131', 1], ['Gaps 8, 16, 32, 64 are unequal: not an AP', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(t.join() === '11,19,35,67,131' && gaps.join() === '8,16,32,64' && !isAP(t), 'terms and unequal gaps'); Cx.model([19, 35, 67, 131, 8, 16, 32, 64]); });
}
{
  const a = (n) => n * n + 2 * n, first = seq(4, a);
  Q('s202', mk.short({ marks: 2, stem: r`A sequence has the explicit formula $a_n = n^2 + 2n$. Find its first four terms and write a recursive rule of the form $a_{n+1} = a_n + \ldots$.`, model: r`$a_1 = 3$, $a_2 = 8$, $a_3 = 15$ and $a_4 = 24$.\n\n$a_{n+1} - a_n = \left[(n+1)^2 + 2(n+1)\right] - \left[n^2 + 2n\right] = 2n + 3$. So the recursive rule is $a_1 = 3$ and $a_{n+1} = a_n + 2n + 3$. Check: $a_2 = 3 + 5 = 8$.`, sol: 'Evaluate the formula; then subtract consecutive terms.', scheme: [['First four terms 3, 8, 15, 24', 1], ['a(n+1) = a(n) + 2n + 3', 1]], d: 3, c: 'analysis', t: [1], time: 105 }), (Cx) => { Cx.assert(first.join() === '3,8,15,24' && range(1, 40).every((n) => a(n + 1) === a(n) + 2 * n + 3), 'terms and the rule 2n + 3'); Cx.model([3, 8, 15, 24, 5]); });
}
{
  const dots = iterate(5, (x) => x + 4, 20);
  Q('s203', mk.short({ marks: 2, stem: r`A kolam border in Madurai has $5$ dots at stage $1$, and every new stage adds $4$ more dots. Write a recursive rule and an explicit formula for the number of dots $a_n$ at stage $n$, and find the number of dots at stage $20$.`, model: r`Recursive rule: $a_1 = 5$ and $a_{n+1} = a_n + 4$.\n\nExplicit formula: $a_n = 5 + 4(n - 1) = 4n + 1$.\n\nAt stage $20$: $a_{20} = 4 \times 20 + 1 = 81$ dots.`, sol: 'Add 4 each time; the formula is the first term plus (n - 1) fours.', scheme: [['Recursive rule a1 = 5, a(n+1) = a(n) + 4', 0.5], ['Explicit formula a(n) = 4n + 1', 0.5], ['81 dots at stage 20', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(dots[19] === 81 && dots.every((x, i) => x === 4 * (i + 1) + 1), '4n + 1 and 81'); Cx.model([5, 4, 81]); });
}
{
  const L = [7, 3, -1, -5];
  Q('s204', mk.short({ marks: 2, stem: r`Show that $7, 3, -1, -5, \ldots$ is an arithmetic progression. State its common difference and write the next two terms.`, model: r`The gaps are $3 - 7 = -4$, $-1 - 3 = -4$ and $-5 - (-1) = -4$. They are all equal, so the list is an arithmetic progression with $d = -4$.\n\nThe next two terms are $-5 - 4 = -9$ and $-9 - 4 = -13$.`, sol: 'Show that the gaps are equal, then keep adding the common difference.', scheme: [['Equal gaps -4, so an AP with d = -4', 1], ['Next terms -9 and -13', 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(isAP(L) && L[1] - L[0] === -4 && iterate(-5, (x) => x - 4, 3).join() === '-5,-9,-13', 'd = -4; -9, -13'); Cx.model([4, 9, 13]); });
}
{
  const t = iterate(3.5, (x) => x + 1.5, 21);
  Q('s205', mk.short({ marks: 2, stem: r`An arithmetic progression has first term $3.5$ and common difference $1.5$. Find its $21$st term.`, model: r`$a_{21} = a + 20d = 3.5 + 20 \times 1.5 = 3.5 + 30 = 33.5$.`, sol: 'Use a_n = a + (n - 1)d with n = 21.', scheme: [['a + 20d with a = 3.5, d = 1.5', 1], ['33.5', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(close(t[20], 33.5), '33.5'); Cx.model([3.5, 1.5, 30, 33.5]); });
}
{
  const t = iterate(5, (x) => x * -2, 7);
  Q('s206', mk.short({ marks: 2, stem: r`Find the common ratio and the $7$th term of the geometric progression $5, -10, 20, \ldots$.`, model: r`The common ratio is $r = \dfrac{-10}{5} = -2$ (and $\dfrac{20}{-10} = -2$).\n\n$a_7 = 5 \times (-2)^6 = 5 \times 64 = 320$.`, sol: 'Divide a term by the one before it; then use a r^(n-1).', scheme: [['Common ratio -2', 1], ['a7 = 5 x (-2)^6 = 320', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(isGP(t) && t[1] / t[0] === -2 && t[6] === 320, 'r = -2 and 320'); Cx.model([2, 64, 320, 5]); });
}
{
  const q = range(1, 20).find((k) => 2 * k ** 3 === 54), mid = [2 * q, 2 * q * q];
  Q('s207', mk.short({ marks: 2, stem: r`The numbers $2, \square, \square, 54$ are the first four terms of a geometric progression. Find the two missing terms.`, model: r`Let the common ratio be $r$. The $4$th term is $2r^3 = 54$, so $r^3 = 27$ and $r = 3$.\n\nThe missing terms are $2 \times 3 = 6$ and $6 \times 3 = 18$.`, sol: 'The fourth term is a r^3; solve for r.', scheme: [['2 r^3 = 54, so r = 3', 1], ['Missing terms 6 and 18', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(q === 3 && mid.join() === '6,18' && isGP([2, 6, 18, 54]), 'r = 3; 6, 18'); Cx.model([27, 3, 6, 18]); });
}

// =============================================================== short answer, 3 marks
{
  const ok = range(1, 60).every((n) => tri(n) + tri(n + 1) === (n + 1) ** 2);
  Q('s301', mk.short({ marks: 3, stem: r`The $n$th triangular number is $T_n = \dfrac{n(n+1)}{2}$. Verify that $T_8 + T_9 = 9^2$, and then show that $T_n + T_{n+1} = (n+1)^2$ for every $n$.`, model: r`$T_8 = \dfrac{8 \times 9}{2} = 36$ and $T_9 = \dfrac{9 \times 10}{2} = 45$, so $T_8 + T_9 = 81 = 9^2$.\n\nIn general, $T_n + T_{n+1} = \dfrac{n(n+1)}{2} + \dfrac{(n+1)(n+2)}{2} = \dfrac{(n+1)(n + n + 2)}{2}$.\n\nThis is $\dfrac{(n+1)(2n+2)}{2} = (n+1)(n+1) = (n+1)^2$.`, sol: 'Take out the common factor n + 1, then simplify.', scheme: [['T8 = 36, T9 = 45 and the sum 81', 1], ['Takes out the common factor (n + 1)', 1], ['Simplifies to (n + 1)^2', 1]], d: 3, c: 'analysis', t: [1], time: 150 }), (Cx) => { Cx.assert(tri(8) === 36 && tri(9) === 45 && ok, 'T8 + T9 = 81 and the identity for n up to 60'); Cx.model([36, 45, 81]); });
}
{
  const sol = [];
  for (let a = -30; a <= 30; a++) for (let d = -20; d <= 20; d++) if (ap(a, d, 5) === 26 && ap(a, d, 11) === 62) sol.push([a, d]);
  must(sol.length === 1, 'unique AP');
  Q('s302', mk.short({ marks: 3, stem: r`The $5$th term of an arithmetic progression is $26$ and its $11$th term is $62$. Find the first term, the common difference and the $20$th term.`, model: r`From the $5$th to the $11$th term there are $6$ steps, so $6d = 62 - 26 = 36$ and $d = 6$.\n\nThen $a + 4d = 26$ gives $a = 26 - 24 = 2$.\n\nThe $20$th term is $a_{20} = 2 + 19 \times 6 = 116$.`, sol: 'Subtract the two terms to find d, then go back to the first term.', scheme: [['d = 6', 1], ['a = 2', 1], ['a20 = 116', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(sol[0].join() === '2,6' && ap(2, 6, 20) === 116, 'a = 2, d = 6, a20 = 116'); Cx.model([36, 6, 24, 2, 116]); });
}
{
  const n = range(1, 200).find((k) => close(ap(8.5, 2.5, k), 61));
  Q('s303', mk.short({ marks: 3, stem: r`Which term of the arithmetic progression $8.5, 11, 13.5, \ldots$ is $61$? Show your working.`, model: r`Here $a = 8.5$ and $d = 11 - 8.5 = 2.5$.\n\nSet $8.5 + (n - 1) \times 2.5 = 61$. Then $(n - 1) \times 2.5 = 52.5$, so $n - 1 = 21$.\n\nHence $n = 22$: the $22$nd term is $61$.`, sol: 'Write a_n = a + (n - 1)d and solve for n.', scheme: [['a = 8.5, d = 2.5', 1], ['(n - 1) x 2.5 = 52.5', 1], ['n = 22', 1]], d: 2, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(n === 22 && isAP([8.5, 11, 13.5]), 'n = 22'); Cx.model([2.5, 52.5, 21, 22]); });
}
{
  const sol = [];
  for (let a = 1; a <= 40; a++) for (let q = 1; q <= 20; q++) if (gp(a, q, 3) === 18 && gp(a, q, 6) === 486) sol.push([a, q]);
  must(sol.length === 1, 'unique GP');
  Q('s304', mk.short({ marks: 3, stem: r`In a geometric progression of positive terms, the $3$rd term is $18$ and the $6$th term is $486$. Find the common ratio, the first term and the $8$th term.`, model: r`From the $3$rd to the $6$th term the ratio is used $3$ times, so $r^3 = \dfrac{486}{18} = 27$ and $r = 3$.\n\nThen $a r^2 = 18$ gives $9a = 18$ and $a = 2$.\n\nThe $8$th term is $a_8 = 2 \times 3^7 = 2 \times 2187 = 4374$.`, sol: 'Divide the sixth term by the third to get r cubed.', scheme: [['r^3 = 27, so r = 3', 1], ['a = 2', 1], ['a8 = 4374', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(sol[0].join() === '2,3' && gp(2, 3, 8) === 4374 && 3 ** 7 === 2187, 'a = 2, r = 3, a8 = 4374'); Cx.model([27, 3, 2, 2187, 4374]); });
}
{
  const A = seq(6, (n) => ap(4, 4, n)), G = seq(6, (n) => gp(4, 2, n)), first = range(2, 6).find((n) => G[n - 1] > A[n - 1]);
  Q('s305', mk.short({ marks: 3, stem: r`Two savings plans start with ₹4 in week $1$. Plan P adds ₹4 every week (an arithmetic progression). Plan Q doubles the amount every week (a geometric progression). From which week is Plan Q ahead, and how do the two plans compare in week $8$?`, model: r`Plan P: $4, 8, 12, 16, 20, 24, \ldots$ Plan Q: $4, 8, 16, 32, 64, 128, \ldots$ In week $2$ both are $8$. From week $3$ onwards Plan Q is larger ($16$ against $12$), and the gap keeps growing.\n\nIn week $8$: P gives $4 + 7 \times 4 = 32$ and Q gives $4 \times 2^7 = 512$. So Q is $16$ times P in week $8$.`, sol: 'List both plans for a few weeks, then use the nth-term formulas for week 8.', scheme: [['Lists both plans: equal in week 2', 1], ['Q is ahead from week 3', 1], ['Week 8: 32 against 512', 1]], d: 3, c: 'evaluation', t: [2, 3], time: 150 }), (Cx) => { Cx.assert(first === 3 && A[1] === G[1] && ap(4, 4, 8) === 32 && gp(4, 2, 8) === 512 && 512 / 32 === 16, 'Q ahead from week 3; 32 against 512'); Cx.model([8, 12, 16, 32, 512]); });
}

// =============================================================== long answer, 5 marks
{
  const s = seq(18, (n) => 5 * n + 1), rec = iterate(6, (a) => a + 5, 31), n156 = range(1, 100).find((k) => 5 * k + 1 === 156);
  Q('l01', mk.long({ stem: r`A row of $n$ regular hexagons is made of matchsticks, each new hexagon sharing one side with the one before it. One hexagon needs $6$ sticks, two hexagons need $11$ sticks and three hexagons need $16$ sticks. (a) Write the number of sticks for $1, 2, 3, 4$ hexagons. (b) Write a recursive rule. (c) Find an explicit formula and the sticks for $18$ hexagons. (d) How many hexagons can be made with $156$ sticks? (e) The points $(n, a_n)$ are plotted for $n = 1, 2, 3, \ldots$. Explain why they lie on a straight line.`, model: r`**(a)** $6, 11, 16, 21$ sticks.\n\n**(b)** Each new hexagon adds $5$ sticks: $a_1 = 6$ and $a_{n+1} = a_n + 5$.\n\n**(c)** $a_n = 6 + 5(n - 1) = 5n + 1$. For $18$ hexagons, $a_{18} = 5 \times 18 + 1 = 91$ sticks.\n\n**(d)** Solve $5n + 1 = 156$: $5n = 155$ and $n = 31$ hexagons.\n\n**(e)** The terms rise by the same amount, $5$, for every step of $1$ in $n$, so the points move up $5$ units each time they move right $1$ unit. Points with a constant rise per step lie on one straight line.`, sol: 'Each hexagon after the first adds 5 sticks.', scheme: [['(a) 6, 11, 16, 21', 1], ['(b) a1 = 6 and a(n+1) = a(n) + 5', 1], ['(c) 5n + 1 and 91 sticks', 1], ['(d) n = 31', 1], ['(e) constant rise of 5 per step gives a straight line', 1]], d: 3, c: 'application', t: [1, 2], time: 420 }), (Cx) => { Cx.assert(s[17] === 91 && rec.slice(0, 4).join() === '6,11,16,21' && n156 === 31 && rec[30] === 156, '91 sticks; 31 hexagons'); Cx.model([6, 11, 16, 21, 5, 91, 155, 31]); });
}
{
  const alt = iterate(1480, (a) => a + 35, 20), n2000 = range(1, 100).find((k) => alt[k - 1] > 2000), inRange = range(1, 20).filter((k) => alt[k - 1] >= 1600 && alt[k - 1] <= 1800);
  Q('l02', mk.long({ stem: r`On a trekking trail near Munnar, the altitude at rest stop $1$ is $1480$ m, and every next rest stop is $35$ m higher. (a) Find the altitude at rest stop $12$. (b) Which is the first rest stop higher than $2000$ m, and what is its altitude? (c) For how many rest stops is the altitude between $1600$ m and $1800$ m, both included? (d) The points $(n, a_n)$ are plotted for the rest stops. Why do they lie on a straight line, and how much does the line rise for each step to the right?`, model: r`**(a)** $a_{12} = 1480 + 11 \times 35 = 1865$ m.\n\n**(b)** Solve $1480 + (n - 1) \times 35 > 2000$: $(n - 1) \times 35 > 520$, so $n - 1 > 14.86$ and $n - 1 \ge 15$. Hence $n = 16$ and $a_{16} = 1480 + 15 \times 35 = 2005$ m. (Stop $15$ is at $1970$ m, which is not above $2000$ m.)\n\n**(c)** From $1480 + (n - 1) \times 35 \ge 1600$ we get $n - 1 \ge 3.43$, so $n \ge 5$ (stop $5$ is $1620$ m). From $\le 1800$ we get $n - 1 \le 9.14$, so $n \le 10$ (stop $10$ is $1795$ m). Stops $5$ to $10$ give $6$ rest stops.\n\n**(d)** The altitude rises by the same $35$ m at every stop, so the points rise by $35$ units for each step of $1$ to the right and lie on one straight line.`, sol: 'An arithmetic progression with a = 1480 and d = 35; inequalities give the stops.', scheme: [['(a) 1865 m', 1], ['(b) stop 16 at 2005 m', 1.5], ['(c) stops 5 to 10, so 6 stops', 1.5], ['(d) constant rise of 35 per step: a straight line', 1]], d: 3, c: 'application', t: [2], time: 450 }), (Cx) => { Cx.assert(alt[11] === 1865 && n2000 === 16 && alt[15] === 2005 && alt[14] === 1970 && inRange.join() === '5,6,7,8,9,10' && alt[4] === 1620 && alt[9] === 1795, 'stop 12 at 1865, stop 16 at 2005, stops 5 to 10'); Cx.model([1865, 520, 2005, 1970, 1620, 1795, 6, 35]); });
}
{
  const v = iterate(81000, (a) => (a * 2) / 3, 7), yr = range(1, 7).find((k) => v[k - 1] < 10000);
  Q('l03', mk.long({ stem: r`A machine bought for a small factory in Coimbatore is valued at ₹81,000 at the end of year $1$. At the end of every later year its value is $\dfrac{2}{3}$ of the value a year earlier. (a) Show that the yearly values form a geometric progression and state the common ratio. (b) Find the values at the end of years $4$ and $5$. (c) At the end of which year does the value first fall below ₹10,000? (d) Is the list of values an arithmetic progression? Give a reason. (e) Describe the shape of the points $(n, a_n)$ on a graph.`, model: r`**(a)** Year $2$: $81000 \times \dfrac{2}{3} = 54000$ and year $3$: $54000 \times \dfrac{2}{3} = 36000$. Each value is $\dfrac{2}{3}$ of the one before, so it is a geometric progression with $r = \dfrac{2}{3}$.\n\n**(b)** $a_4 = 81000 \times \left(\dfrac{2}{3}\right)^3 = 24000$ and $a_5 = 24000 \times \dfrac{2}{3} = 16000$.\n\n**(c)** $a_6 \approx 10666.67$, which is not below $10000$, and $a_7 \approx 7111.11$, which is. So the value first falls below ₹10,000 at the end of year $7$.\n\n**(d)** No. The gaps are $-27000, -18000, -12000, \ldots$, which are not equal.\n\n**(e)** The points fall quickly at first and then more and more slowly, forming a curve that bends and flattens towards the horizontal axis, not a straight line.`, sol: 'Multiply by 2/3 for each new year.', scheme: [['(a) ratio 2/3 shown from the first terms', 1], ['(b) 24000 and 16000', 1], ['(c) year 7', 1.5], ['(d) gaps 27000, 18000 unequal, so not an AP', 1], ['(e) a falling curve flattening out, not a line', 0.5]], d: 3, c: 'application', t: [3], time: 450 }), (Cx) => { Cx.assert(isGP(v) && v[3] === 24000 && v[4] === 16000 && Math.round(v[5] * 100) / 100 === 10666.67 && Math.round(v[6] * 100) / 100 === 7111.11 && yr === 7 && !isAP(v.slice(0, 4)) && v[0] - v[1] === 27000 && v[1] - v[2] === 18000 && v[2] - v[3] === 12000, 'values 54000, 36000, 24000, 16000; year 7'); Cx.model([54000, 36000, 24000, 16000, 10666.67, 7111.11, 27000, 18000, 12000]); });
}
{
  const cnt = iterate(1, (a) => a * 3, 8), side = (n) => 32 / 2 ** n, area = (n) => (3 / 4) ** n, first = range(0, 12).find((n) => 3 ** n > 1000);
  Q('l04', mk.long({ stem: r`A student in Pune draws a Sierpinski triangle on a sheet. Stage $0$ is a solid equilateral triangle of side $32$ cm. At each stage the middle triangle of every remaining triangle is removed, leaving $3$ triangles whose sides are half as long. (a) Write the number of triangles at stage $n$ and find it for stage $5$. (b) Find the side of each small triangle at stage $5$. (c) At each stage the remaining area is $\dfrac{3}{4}$ of the area before. Find the fraction of the original area left at stage $4$. (d) At which stage does the number of triangles first exceed $1000$?`, model: r`**(a)** The count is multiplied by $3$ each stage: $1, 3, 9, 27, \ldots$, so it is $3^n$. At stage $5$ it is $3^5 = 243$ triangles.\n\n**(b)** The side halves at each stage, so at stage $5$ it is $\dfrac{32}{2^5} = \dfrac{32}{32} = 1$ cm.\n\n**(c)** The area left at stage $4$ is $\left(\dfrac{3}{4}\right)^4 = \dfrac{81}{256}$ of the original area.\n\n**(d)** $3^6 = 729$ is not above $1000$ but $3^7 = 2187$ is, so the number first exceeds $1000$ at stage $7$.`, sol: 'Three triangles replace each triangle: the count has ratio 3 and the area has ratio 3/4.', scheme: [['(a) 3^n and 243', 1], ['(b) side 1 cm', 1], ['(c) (3/4)^4 = 81/256', 1.5], ['(d) 3^6 = 729 and 3^7 = 2187: stage 7', 1.5]], d: 3, c: 'application', t: [3], time: 420 }), (Cx) => { Cx.assert(cnt[5] === 243 && side(5) === 1 && close(area(4), 81 / 256) && 4 ** 4 === 256 && first === 7 && cnt[6] === 729 && cnt[7] === 2187, '243; 1 cm; 81/256; stage 7'); Cx.model([243, 32, 1, 81, 256, 729, 2187, 7]); });
}
{
  const H = [0, ...[1, 2, 3, 4, 5, 6, 7].map((n) => hanoi(n).length)], viaRec = iterate(1, (h) => 2 * h + 1, 7), secs = hanoi(12).length;
  Q('l05', mk.long({ stem: r`In the Tower of Hanoi puzzle, $n$ discs of different sizes are stacked on one peg and are to be shifted to another peg, one disc at a time, never placing a larger disc on a smaller one. Let $H_n$ be the least number of moves. (a) Find $H_1$, $H_2$ and $H_3$. (b) Explain why $H_n = 2H_{n-1} + 1$. (c) Use this rule to find $H_4$, $H_5$, $H_6$ and $H_7$. (d) Show that $H_n = 2^n - 1$ for $n = 1$ to $7$. (e) A player makes one move every second. How long does the $12$-disc tower take at the very least, in hours, minutes and seconds?`, model: r`**(a)** $H_1 = 1$, $H_2 = 3$ and $H_3 = 7$.\n\n**(b)** To free the largest disc, first move the top $n - 1$ discs to the spare peg ($H_{n-1}$ moves), then move the largest disc ($1$ move), then move the $n - 1$ discs on top of it ($H_{n-1}$ moves). The total is $2H_{n-1} + 1$.\n\n**(c)** $H_4 = 2 \times 7 + 1 = 15$, $H_5 = 2 \times 15 + 1 = 31$, $H_6 = 2 \times 31 + 1 = 63$ and $H_7 = 2 \times 63 + 1 = 127$.\n\n**(d)** $2^1 - 1 = 1$, $2^2 - 1 = 3$, $2^3 - 1 = 7$, $2^4 - 1 = 15$, $2^5 - 1 = 31$, $2^6 - 1 = 63$, $2^7 - 1 = 127$. These match the values found in (a) and (c).\n\n**(e)** $H_{12} = 2^{12} - 1 = 4095$ moves, which take $4095$ seconds. Since $4095 = 3600 + 495 = 3600 + 480 + 15$, the time is $1$ hour $8$ minutes $15$ seconds.`, sol: 'Move n - 1 discs away, move the largest, move n - 1 back on top.', scheme: [['(a) 1, 3, 7', 0.5], ['(b) the 2H + 1 argument', 1.5], ['(c) 15, 31, 63, 127', 1], ['(d) 2^n - 1 matches for n = 1 to 7', 1], ['(e) 4095 s = 1 h 8 min 15 s', 1]], d: 4, c: 'analysis', t: [3], time: 480 }), (Cx) => { Cx.assert(H.slice(1).join() === viaRec.join() && viaRec.every((h, i) => h === 2 ** (i + 1) - 1) && secs === 4095 && playHanoi(7, hanoi(7)).C.length === 7 && 3600 + 8 * 60 + 15 === 4095 && viaRec.slice(3).join() === '15,31,63,127', 'H = 1, 3, 7, 15, 31, 63, 127; 4095 seconds'); Cx.model([1, 3, 7, 15, 31, 63, 127, 4095, 3600, 495]); });
}

// =============================================================== case-based
{
  const layer = (n) => 2 * n - 1, S = iterate(1, (s, k) => s + layer(k + 1), 25);
  caseQ('c01', {
    passage: r`A mosaic artist in Udaipur covers a square floor panel with tiles laid in L-shaped layers. Layer $1$ is one tile, and layer $n$ has $2n - 1$ tiles. After $n$ layers the tiles form a solid square with $n$ tiles along each side. Let $S_n$ be the total number of tiles used after $n$ layers.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $81$. (c) (i) $S_1 = 1$, $S_{n+1} = S_n + (2n + 1)$ and $S_n = n^2$. Or (ii) $25$ layers; layer $25$ has $49$ tiles.`,
    sol: r`(a) $2 \times 7 - 1 = 13$. (b) $S_9 = 9^2 = 81$. (c) (i) layer $n + 1$ has $2(n+1) - 1 = 2n + 1$ tiles, and $S_n = n^2$. (ii) $n^2 = 625$ gives $n = 25$, and layer $25$ has $2 \times 25 - 1 = 49$ tiles.`,
    children: [
      child('a', mk.mcq({ stem: 'How many tiles are there in layer $7$ alone?', opts: ['$13$', '$14$', '$7$', '$49$'], key: 'a', sol: r`$2 \times 7 - 1 = 13$. The value $14$ is $2n$, $7$ is the layer number and $49$ is the total after $7$ layers.`, d: 2, c: 'application', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'How many tiles are used in all for the first $9$ layers?', value: 81, sol: r`The tiles form a square of side $9$, so there are $9 \times 9 = 81$ tiles. (Check: $1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 = 81$.)`, scheme: [['9 x 9 or the sum of the layers', 0.5], ['81 tiles', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Write a recursive rule for $S_n$, and an explicit formula for $S_n$.`, model: r`Layer $n + 1$ has $2(n + 1) - 1 = 2n + 1$ tiles, so $S_1 = 1$ and $S_{n+1} = S_n + (2n + 1)$. After $n$ layers the tiles form a square of side $n$, so $S_n = n^2$.`, sol: 'Add the next layer; the shape is a square.', scheme: [['Recursive rule S(n+1) = S(n) + (2n + 1)', 1], ['Explicit formula n squared', 1]], d: 3, c: 'application', t: [1], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A second panel needs exactly $625$ tiles. How many layers does it have, and how many tiles are in its last layer?`, model: r`$S_n = n^2 = 625$, so $n = 25$. The last layer has $2 \times 25 - 1 = 49$ tiles.`, sol: 'Solve n squared equals 625.', scheme: [['n = 25 layers', 1], ['Last layer 49 tiles', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([layer(7), 14, 7, 49], 13);
    Cx.child('b').val(S[8]);
    Cx.child('c').assert(S.every((s, i) => s === (i + 1) ** 2), 'S_n = n squared');
    Cx.child('c').model([2, 1]);
    Cx.child('cii').assert(range(1, 60).filter((n) => S[n - 1] === 625).join() === '25' && layer(25) === 49, '25 layers, 49 tiles');
    Cx.child('cii').model([625, 25, 49]);
  });
}
{
  const lvl = iterate(420, (a) => a - 6, 40), day300 = range(1, 40).find((k) => lvl[k - 1] < 300), day240 = range(1, 40).find((k) => lvl[k - 1] === 240);
  caseQ('c02', {
    passage: r`The water level in a village well near Barmer is measured at the same time every morning. On day $1$ the level is $420$ cm, and it drops by $6$ cm every day because the well is not being refilled. Let $a_n$ be the level, in cm, on day $n$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $22$. (c) (i) $420, 414, 408, 402, 396$ with a constant drop of $6$. Or (ii) day $31$.`,
    sol: r`(a) $a_{11} = 420 + 10 \times (-6) = 360$. (b) $420 - 6(n - 1) < 300$ gives $n - 1 > 20$, so $n = 22$. (c) (i) the first five levels, equal drops. (ii) $420 - 6(n - 1) = 240$ gives $n - 1 = 30$ and $n = 31$.`,
    children: [
      child('a', mk.mcq({ stem: 'The level on day $11$ is', opts: ['$360$ cm', '$354$ cm', '$366$ cm', '$480$ cm'], key: 'a', sol: r`$a_{11} = 420 + 10 \times (-6) = 360$. The values $354$ and $366$ are days $12$ and $10$, and $480$ uses $+6$.`, d: 2, c: 'application', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'On which day is the level first below $300$ cm?', value: 22, sol: r`Solve $420 - 6(n - 1) < 300$: $6(n - 1) > 120$, so $n - 1 > 20$ and $n = 22$. (On day $22$ the level is $294$ cm; on day $21$ it is $300$ cm, which is not below $300$.)`, scheme: [['6(n - 1) > 120', 0.5], ['Day 22', 0.5]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Write the levels for days $1$ to $5$, and explain why the points $(n, a_n)$ lie on a straight line that slopes downwards.`, model: r`The levels are $420, 414, 408, 402, 396$. The level falls by the same $6$ cm every day, so the points drop by $6$ units for each step to the right and lie on one straight line going down.`, sol: 'Subtract 6 each day.', scheme: [['Levels 420, 414, 408, 402, 396', 1], ['Constant drop of 6, so a straight line going down', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** On which day does the level become exactly $240$ cm?`, model: r`Solve $420 + (n - 1) \times (-6) = 240$: $(n - 1) \times 6 = 180$, so $n - 1 = 30$ and $n = 31$.`, sol: 'Set a_n equal to 240.', scheme: [['420 - 6(n - 1) = 240', 1], ['Day 31', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([lvl[10], lvl[11], lvl[9], 480], 360);
    Cx.child('b').val(day300);
    Cx.child('b').assert(lvl[21] === 294 && lvl[20] === 300, 'day 22 is 294');
    Cx.child('c').assert(lvl.slice(0, 5).join() === '420,414,408,402,396', 'first five levels');
    Cx.child('c').model([420, 414, 408, 402, 396, 6]);
    Cx.child('cii').assert(day240 === 31, 'day 31');
    Cx.child('cii').model([240, 180, 30, 31]);
  });
}
{
  const conc = iterate(640, (c) => c / 2, 10), k5 = range(0, 9).find((k) => conc[k] < 5);
  caseQ('c03', {
    passage: r`A medicine in the blood of a patient at a hospital in Ranchi loses half of its amount every $4$ hours. Just after the dose, at $0$ hours, there are $640$ mg of the medicine. After $k$ half-lives (that is, after $4k$ hours) the amount is $C_k$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $10$. (c) (i) $32$ hours. Or (ii) common ratio $\dfrac{1}{2}$; $20$ mg.`,
    sol: r`(a) $640 \times \left(\dfrac{1}{2}\right)^3 = 80$. (b) $24$ hours is $6$ half-lives: $640 \div 64 = 10$. (c) (i) $640 \div 2^k < 5$ needs $2^k > 128$, so $k = 8$ and the time is $32$ hours. (ii) amounts $640, 320, 160, 80, 40, 20$ with ratio $\dfrac{1}{2}$.`,
    children: [
      child('a', mk.mcq({ stem: 'After $12$ hours the amount of medicine left is', opts: ['$80$ mg', '$160$ mg', '$40$ mg', '$320$ mg'], key: 'a', sol: r`$12$ hours is $3$ half-lives: $640, 320, 160, 80$. So $80$ mg remain. The value $160$ is after $2$ half-lives, $40$ after $4$, and $320$ after $1$.`, d: 2, c: 'application', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'How many mg are left after $24$ hours?', value: 10, sol: r`$24$ hours is $6$ half-lives, so the amount is $640 \times \dfrac{1}{64} = 10$ mg.`, scheme: [['6 half-lives, 640 divided by 64', 0.5], ['10 mg', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** After how many hours does the amount first fall below $5$ mg?`, model: r`We need $640 \div 2^k < 5$, that is $2^k > 128$. Since $2^7 = 128$ is not enough and $2^8 = 256$ is, $k = 8$. The time is $8 \times 4 = 32$ hours.`, sol: 'Find the first power of 2 above 128.', scheme: [['2^k > 128', 1], ['k = 8, so 32 hours', 1]], d: 3, c: 'application', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Write the amounts at $0, 4, 8, 12, 16$ hours, state the common ratio, and find the amount at $20$ hours.`, model: r`The amounts are $640, 320, 160, 80, 40$, each half of the one before, so the common ratio is $\dfrac{1}{2}$. At $20$ hours the amount is $40 \times \dfrac{1}{2} = 20$ mg.`, sol: 'Halve each amount.', scheme: [['Amounts and common ratio 1/2', 1], ['20 mg at 20 hours', 1]], d: 3, c: 'application', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([conc[3], conc[2], conc[4], conc[1]], 80);
    Cx.child('b').val(conc[6]);
    Cx.child('c').assert(k5 === 8 && conc[7] === 5 && conc[8] < 5 || k5 === 8, '8 half-lives, 32 hours');
    Cx.child('c').assert(2 ** 7 === 128 && 2 ** 8 === 256 && k5 * 4 === 32, '32 hours');
    Cx.child('c').model([128, 8, 256, 32]);
    Cx.child('cii').assert(isGP(conc.slice(0, 5)) && conc[5] === 20, 'ratio 1/2 and 20 mg');
    Cx.child('cii').model([640, 320, 160, 80, 40, 20]);
  });
}
{
  const k2 = koch(2, 18), k3 = koch(3, 18);
  caseQ('c04', {
    passage: r`A student in Bhopal draws a Koch snowflake. Stage $0$ is an equilateral triangle of side $18$ cm. At each stage, every side is divided into three equal parts and the middle part is replaced by two sides of the same length, so each side becomes $4$ sides, each one third as long.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $2$. (c) (i) $96$ cm. Or (ii) $128$ cm.`,
    sol: r`(a) $3 \times 4^2 = 48$. (b) $\dfrac{18}{3^2} = 2$ cm. (c) (i) $48 \times 2 = 96$ cm. (ii) stage $3$ has $192$ sides of $\dfrac{18}{27} = \dfrac{2}{3}$ cm: $192 \times \dfrac{2}{3} = 128$ cm.`,
    children: [
      child('a', mk.mcq({ stem: 'How many sides does the snowflake have at stage $2$?', opts: ['$48$', '$36$', '$12$', '$64$'], key: 'a', sol: r`The numbers of sides are $3, 12, 48$, so stage $2$ has $3 \times 4^2 = 48$ sides. The value $12$ is stage $1$, $36$ comes from multiplying by $3$, and $64$ is $4^3$.`, d: 2, c: 'application', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'What is the length of each side, in cm, at stage $2$?', value: 2, sol: r`The side becomes one third each stage, so after $2$ stages it is $\dfrac{18}{3^2} = \dfrac{18}{9} = 2$ cm.`, scheme: [['18 divided by 3 twice', 0.5], ['2 cm', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the perimeter of the snowflake at stage $2$.`, model: r`At stage $2$ there are $48$ sides of $2$ cm each, so the perimeter is $48 \times 2 = 96$ cm.`, sol: 'Number of sides times the length of one side.', scheme: [['48 sides of 2 cm', 1], ['96 cm', 1]], d: 3, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the perimeter of the snowflake at stage $3$.`, model: r`At stage $3$ there are $192$ sides, each $\dfrac{18}{27} = \dfrac{2}{3}$ cm long, so the perimeter is $192 \times \dfrac{2}{3} = 128$ cm.`, sol: 'Number of sides times the length of one side.', scheme: [['192 sides of 2/3 cm', 1], ['128 cm', 1]], d: 3, c: 'application', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([k2.sides, 36, 12, 64], 48);
    Cx.child('b').val(k2.sideLen);
    Cx.child('c').assert(close(k2.perimeter, 96), 'perimeter 96');
    Cx.child('c').model([48, 2, 96]);
    Cx.child('cii').assert(k3.sides === 192 && close(k3.perimeter, 128) && close(k3.sideLen, 2 / 3), 'perimeter 128');
    Cx.child('cii').model([192, 27, 128]);
  });
}

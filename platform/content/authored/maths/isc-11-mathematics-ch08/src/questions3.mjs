// ISC 11 Mathematics ch08 Permutations and Combinations - long answers (5 marks, in parts).
import { Q, mk } from './lib.mjs';
import { r, range, F, P, Cm, multi, S, N, kPerms, kCombs, distinctArr, count, circularClasses } from './cnt.mjs';

{
  const arr = [...distinctArr('MISSION')];
  const all = arr.length, tog = arr.filter((w) => w.includes('SS')).length, apart = all - tog;
  const ends = arr.filter((w) => w[0] === 'I' && w[6] === 'N').length;
  Q('l01', mk.long({ stem: r`The letters of the word MISSION are arranged in a row. Find the number of distinct arrangements

(a) in all, [1]

(b) in which the two S's are together, [1]

(c) in which the two S's are not together, [1]

(d) that begin with I and end with N. [2]`, model: r`(a) The word has $7$ letters with I twice and S twice: $\dfrac{7!}{2!\,2!} = 1260$.

(b) Treat SS as one block. The units are SS, M, I, I, O, N: $6$ units with I twice, so $\dfrac{6!}{2!} = 360$.

(c) $1260 - 360 = 900$.

(d) Fix I at the start and N at the end. The remaining letters M, I, S, S, O fill the middle $5$ places: $5$ letters with S twice, so $\dfrac{5!}{2!} = 60$.`, sol: 'Block method for (b), complement for (c), end places fixed for (d).', scheme: [['(a) $\\dfrac{7!}{2!\\,2!} = 1260$', 1], ['(b) $\\dfrac{6!}{2!} = 360$', 1], ['(c) $1260 - 360 = 900$', 1], ['(d) remaining letters M, I, S, S, O', 1], ['(d) $\\dfrac{5!}{2!} = 60$', 1]], d: 3, c: 'application', t: [3], time: 330 }), (C) => {
    C.assert(all === 1260 && tog === 360 && apart === 900 && ends === 60 && multi(7, 2, 2) === 1260n && multi(6, 2) === 360n && multi(5, 2) === 60n, '1260, 360, 900, 60 by enumeration of the distinct arrangements'); C.model([1260, 360, 900, 60]);
  });
}
{
  const nums = [...kPerms(range(0, 6), 5)].filter((a) => a[0] !== 0);
  const all = nums.length, even = nums.filter((a) => a[4] % 2 === 0).length, five = nums.filter((a) => a[4] % 5 === 0).length, big = nums.filter((a) => a[0] >= 4).length;
  Q('l02', mk.long({ stem: r`Five-digit numbers are formed from the digits $0, 1, 2, 3, 4, 5, 6$, no digit being used more than once in a number. Find how many numbers

(a) can be formed in all, [1]

(b) are even, [2]

(c) are multiples of $5$, [1]

(d) are greater than $40000$. [1]`, model: r`(a) The first digit is not $0$: $6$ choices. The other four places take the remaining $6$ digits in order: $^{6}P_{4} = 360$. The number is $6 \times 360 = 2160$.

(b) Units digit $0$: the other four places take the remaining $6$ digits in order, $^{6}P_{4} = 360$. Units digit $2$, $4$ or $6$ ($3$ choices): the first digit is not $0$ and not the units digit, so $5$ choices; the middle three places take the remaining $5$ digits in order, $^{5}P_{3} = 60$. That gives $3 \times 5 \times 60 = 900$. In all $360 + 900 = 1260$.

(c) Units digit $0$ gives $360$. Units digit $5$: the first digit is not $0$ and not $5$, so $5$ choices, and the middle three places take the remaining $5$ digits, $60$ ways: $5 \times 60 = 300$. In all $360 + 300 = 660$.

(d) The first digit is $4$, $5$ or $6$: $3$ choices. The other four places take the remaining $6$ digits: $360$. The number is $3 \times 360 = 1080$.`, sol: 'Fix the restricted places first; split on the units digit when $0$ is special.', scheme: [['(a) $6 \\times {}^{6}P_{4} = 2160$', 1], ['(b) units $0$ gives $360$; units $2, 4, 6$ gives $3 \\times 5 \\times 60 = 900$', 1], ['(b) total $1260$', 1], ['(c) units $0$ gives $360$, units $5$ gives $300$: total $660$', 1], ['(d) $3 \\times {}^{6}P_{4} = 1080$', 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => {
    C.assert(all === 2160 && even === 1260 && five === 660 && big === 1080 && 6n * P(6, 4) === 2160n && 360n + 3n * 5n * P(5, 3) === 1260n && 360n + 5n * P(5, 3) === 660n && 3n * P(6, 4) === 1080n, '2160, 1260, 660, 1080 by enumeration of all 7P5 strings'); C.model([2160, 360, 900, 1260, 300, 660, 1080]);
  });
}
{
  const men = range(1, 7).map((i) => 'm' + i), women = range(1, 5).map((i) => 'w' + i);
  const g = (f) => count(kCombs([...men, ...women], 6), f);
  const nw = (c) => c.filter((x) => x[0] === 'w').length;
  const both = g((c) => c.includes('m1') && c.includes('w1'));
  Q('l03', mk.long({ stem: r`An imagined school council has to choose a committee of $6$ from $7$ boys and $5$ girls. Find the number of committees

(a) with no restriction, [1]

(b) with exactly $3$ girls, [1]

(c) with at least $4$ boys, [2]

(d) that include one particular boy and one particular girl. [1]`, model: r`(a) $^{12}C_{6} = 924$.

(b) $3$ girls and $3$ boys: $^{5}C_{3} \times {}^{7}C_{3} = 10 \times 35 = 350$.

(c) At least $4$ boys means $4$ boys and $2$ girls, or $5$ boys and $1$ girl, or $6$ boys. $^{7}C_{4} \times {}^{5}C_{2} = 35 \times 10 = 350$; $^{7}C_{5} \times {}^{5}C_{1} = 21 \times 5 = 105$; $^{7}C_{6} = 7$. The total is $350 + 105 + 7 = 462$.

(d) The two named people are in, so choose the other $4$ from the remaining $10$: $^{10}C_{4} = 210$.`, sol: 'Split by the number of boys; for (d) fix the two members and choose the rest.', scheme: [['(a) $^{12}C_{6} = 924$', 1], ['(b) $^{5}C_{3} \\times {}^{7}C_{3} = 350$', 1], ['(c) cases $350$, $105$, $7$', 1], ['(c) total $462$', 1], ['(d) $^{10}C_{4} = 210$', 1]], d: 3, c: 'application', t: [5], time: 330 }), (C) => {
    C.assert(g(() => true) === 924 && g((c) => nw(c) === 3) === 350 && g((c) => nw(c) <= 2) === 462 && both === 210 && Cm(12, 6) === 924n && Cm(7, 4) * Cm(5, 2) + Cm(7, 5) * Cm(5, 1) + Cm(7, 6) === 462n && Cm(10, 4) === 210n, '924, 350, 462, 210 by enumeration'); C.model([924, 350, 105, 7, 462, 210]);
  });
}
{
  const adj = (a, x, y) => { const n = a.length, i = a.indexOf(x), j = a.indexOf(y); return (i - j + n) % n === 1 || (j - i + n) % n === 1; };
  const all = circularClasses(8), tog = circularClasses(8, (a) => adj(a, 0, 1)), apart = circularClasses(8, (a) => !adj(a, 0, 1));
  const cons3 = (a) => { const p = new Set([0, 1, 2].map((x) => a.indexOf(x))); return range(0, 7).some((st) => [0, 1, 2].every((k) => p.has((st + k) % 8))); };
  const three = circularClasses(8, cons3);
  Q('l04', mk.long({ stem: r`Eight different people are to sit round a circular table, and seatings that differ only by a rotation count as the same. Find the number of seatings

(a) in all, [1]

(b) in which two named people sit side by side, [1]

(c) in which those two named people do not sit side by side, [1]

(d) in which three named people sit together in a block. [2]`, model: r`(a) $(8 - 1)! = 5040$.

(b) Treat the two people as one unit: $7$ units round the table in $(7 - 1)! = 720$ ways, and the pair can swap in $2$ ways: $2 \times 720 = 1440$.

(c) $5040 - 1440 = 3600$.

(d) Treat the three people as one block: the block and the other $5$ people make $6$ units, which can be seated in $(6 - 1)! = 120$ ways. The three in the block can be ordered in $3! = 6$ ways. The number is $120 \times 6 = 720$.`, sol: 'Circular count: fix the block or the pair as units, then multiply by the order inside the block.', scheme: [['(a) $7! = 5040$', 1], ['(b) $2 \\times 6! = 1440$', 1], ['(c) $5040 - 1440 = 3600$', 1], ['(d) $5! = 120$ for $6$ units round the table', 1], ['(d) $120 \\times 3! = 720$', 1]], d: 4, c: 'application', t: [3], time: 330 }), (C) => {
    C.assert(all === 5040 && tog === 1440 && apart === 3600 && three === 720 && 2n * F(6) === 1440n && F(5) * F(3) === 720n, '5040, 1440, 3600, 720 by canonical rotation classes'); C.model([5040, 720, 1440, 3600, 120, 6]);
  });
}
{
  const letters = [...'DAUGHTER'];
  const arr = [...kPerms(letters, 8)];
  const isV = (x) => 'AUE'.includes(x);
  const all = arr.length, tog = arr.filter((a) => { const p = a.map((x, i) => (isV(x) ? i : -1)).filter((i) => i >= 0); return p[2] - p[0] === 2; }).length;
  const none = arr.filter((a) => a.every((x, i) => i === 0 || !(isV(x) && isV(a[i - 1])))).length;
  const words = count(kPerms(letters, 4), (w) => w.filter(isV).length === 2);
  Q('l05', mk.long({ stem: r`The eight different letters of the word DAUGHTER are used to make arrangements. Find the number of

(a) arrangements of all the letters in a row, [1]

(b) arrangements in which the three vowels are together, [1]

(c) arrangements in which no two vowels are next to each other, [2]

(d) four-letter words, meaningful or not, with exactly two vowels, no letter being repeated. [1]`, model: r`(a) $8! = 40320$.

(b) Block the vowels A, U, E: the block and the $5$ consonants make $6$ units, $6! = 720$ ways, and the vowels order themselves in $3! = 6$ ways: $720 \times 6 = 4320$.

(c) Arrange the $5$ consonants first: $5! = 120$ ways. They leave $6$ gaps (one before, one after and four between). Place the $3$ vowels in $3$ different gaps in order: $^{6}P_{3} = 120$. The number is $120 \times 120 = 14400$.

(d) Select $2$ of the $3$ vowels and $2$ of the $5$ consonants: $^{3}C_{2} \times {}^{5}C_{2} = 3 \times 10 = 30$. Arrange each set of $4$ letters: $4! = 24$. The number of words is $30 \times 24 = 720$.`, sol: 'Block for (b); consonants first and vowels in the gaps for (c); select then arrange for (d).', scheme: [['(a) $8! = 40320$', 1], ['(b) $6! \\times 3! = 4320$', 1], ['(c) consonants $5!$ and $6$ gaps for the vowels', 1], ['(c) $5! \\times {}^{6}P_{3} = 14400$', 1], ['(d) $30 \\times 24 = 720$', 1]], d: 4, c: 'application', t: [2, 5], time: 360 }), (C) => {
    C.assert(all === 40320 && tog === 4320 && none === 14400 && words === 720 && F(5) * P(6, 3) === 14400n && Cm(3, 2) * Cm(5, 2) * F(4) === 720n, '40320, 4320, 14400, 720 by enumeration of all 8! arrangements'); C.model([40320, 4320, 14400, 720, 120]);
  });
}
{
  const items = range(1, 10);
  const all = count(kCombs(items, 4)), inc = count(kCombs(items, 4), (c) => c.includes(1)), exc = count(kCombs(items, 4), (c) => !c.includes(1));
  Q('l06', mk.long({ stem: r`A school has $10$ different story books and will give $4$ of them as prizes. Among the books is one particular atlas-story called Book Z. Find the number of ways of choosing the $4$ books

(a) with no restriction, [1]

(b) so that Book Z is included, [1]

(c) so that Book Z is not included, [1]

(d) Show that the answers to (b) and (c) add up to the answer to (a), and name the result of combinations that this illustrates. [2]`, model: r`(a) $^{10}C_{4} = 210$.

(b) Book Z is in, so choose the other $3$ from the remaining $9$ books: $^{9}C_{3} = 84$.

(c) Book Z is out, so choose all $4$ from the remaining $9$: $^{9}C_{4} = 126$.

(d) Every choice of $4$ books either includes Book Z or does not, and not both. So $84 + 126 = 210$, which is the answer to (a). In symbols $^{9}C_{3} + {}^{9}C_{4} = {}^{10}C_{4}$, which is Pascal's rule $^{n}C_{r-1} + {}^{n}C_{r} = {}^{n+1}C_{r}$ with $n = 9$ and $r = 4$.`, sol: 'Split all selections by whether one named object is in; the two parts add to the total.', scheme: [['(a) $^{10}C_{4} = 210$', 1], ['(b) $^{9}C_{3} = 84$', 1], ['(c) $^{9}C_{4} = 126$', 1], ['(d) either-or argument and $84 + 126 = 210$', 1], ['(d) name Pascal\'s rule $^{n}C_{r-1} + {}^{n}C_{r} = {}^{n+1}C_{r}$', 1]], d: 3, c: 'analysis', t: [4], time: 300 }), (C) => {
    C.assert(all === 210 && inc === 84 && exc === 126 && inc + exc === all && Cm(9, 3) + Cm(9, 4) === Cm(10, 4), '210 = 84 + 126 by enumeration'); C.model([210, 84, 126]);
  });
}
{
  const ok = range(1, 14).every((n) => range(1, n).every((k) => Cm(n, k) * BigInt(k) === BigInt(n - k + 1) * Cm(n, k - 1)));
  Q('l07', mk.long({ stem: r`(a) Derive the formula $^{n}P_{r} = \dfrac{n!}{(n - r)!}$ for the number of arrangements of $r$ objects chosen from $n$ different objects. [2]

(b) Hence deduce the formula for $^{n}C_{r}$. [1]

(c) Show that $^{n}C_{r} = \dfrac{n - r + 1}{r} \times {}^{n}C_{r-1}$, and use it with $^{12}C_{4} = 495$ to find $^{12}C_{5}$. [2]`, model: r`(a) Fill $r$ places one after another. The first place can be filled in $n$ ways, the second in $n - 1$ ways, and so on, until the $r$-th place, which can be filled in $n - r + 1$ ways. By the multiplication principle $^{n}P_{r} = n(n - 1)(n - 2)\cdots(n - r + 1)$. Multiplying and dividing by $(n - r)!$ gives $^{n}P_{r} = \dfrac{n!}{(n - r)!}$.

(b) Each selection of $r$ objects can be arranged in $r!$ ways, so $^{n}P_{r} = r! \times {}^{n}C_{r}$. Hence $^{n}C_{r} = \dfrac{^{n}P_{r}}{r!} = \dfrac{n!}{r!\,(n - r)!}$.

(c) $\dfrac{^{n}C_{r}}{^{n}C_{r-1}} = \dfrac{n!}{r!\,(n - r)!} \times \dfrac{(r - 1)!\,(n - r + 1)!}{n!} = \dfrac{n - r + 1}{r}$, since $r! = r\,(r - 1)!$ and $(n - r + 1)! = (n - r + 1)(n - r)!$. For $n = 12$ and $r = 5$: $^{12}C_{5} = \dfrac{12 - 5 + 1}{5} \times 495 = \dfrac{8}{5} \times 495 = 792$.`, sol: 'Slots for (a), divide by $r!$ for (b), a ratio of factorials for (c).', scheme: [['(a) $n(n - 1)\\cdots(n - r + 1)$ by the multiplication principle', 1], ['(a) multiply and divide by $(n - r)!$', 1], ['(b) $^{n}P_{r} = r!\\,{}^{n}C_{r}$ and the formula for $^{n}C_{r}$', 1], ['(c) the ratio $\\dfrac{n - r + 1}{r}$', 1], ['(c) $\\dfrac{8}{5} \\times 495 = 792$', 1]], d: 3, c: 'analysis', t: [2, 4], time: 330 }), (C) => {
    C.assert(ok && Cm(12, 4) === 495n && Cm(12, 5) === 792n && 495n * 8n / 5n === 792n && range(0, 9).every((r0) => P(9, r0) === F(9) / F(9 - r0)) && range(0, 9).every((r0) => P(9, r0) === F(r0) * Cm(9, r0)), 'ratio identity for n <= 14; 12C5 = 792'); C.model([495, 792]);
  });
}

// CBSE 11 Mathematics ch06 Permutations and Combinations — objective items (mcq, assertion-reason, true-false, fill-blank,
// numerical) with independent re-solve checks. Every count is computed twice: by an exact BigInt formula (factorials, nPr,
// nCr, Pascal rows) and by brute-force enumeration of the arrangements or selections under the stated constraint.
import { Q, mk } from './lib.mjs';
import { r, range, near, F, P, Cm, pascalRow, multi, kPerms, kCombs, kSeqs, prod, distinctArr, count, list, arrBySet, collinear, distinctLines, triangles, nPt, nCt, genericExtras } from './pc.mjs';

export { r };
const N = (b) => Number(b);

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The factorial $6!$ is the product of the whole numbers from $6$ down to $1$, so its value is`, opts: ['$720$', '$120$', '$36$', '$5040$'], key: 'a', sol: r`$6! = 6 \times 5 \times 4 \times 3 \times 2 \times 1 = 720$. The value $120$ is $5!$, and $5040$ is $7!$.`, d: 1, c: 'recall', t: [1], time: 30 }), (Cx) => { Cx.assert(F(6) === 720n && [1, 2, 3, 4, 5, 6].reduce((a, b) => a * b) === 720, '6! = 720'); Cx.which([N(F(6)), N(F(5)), 36, N(F(7))], 720); });
Q('m02', mk.mcq({ stem: r`Cancelling common factors, $\dfrac{11!}{9!}$ equals`, opts: ['$110$', '$2$', '$99$', '$121$'], key: 'a', sol: r`$\dfrac{11!}{9!} = \dfrac{11 \times 10 \times 9!}{9!} = 11 \times 10 = 110$. The value $99$ comes from $11 \times 9$, which uses the wrong factor.`, d: 2, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(F(11) / F(9) === 110n, '11!/9! = 110'); Cx.which([110, 2, 99, 121], N(F(11) / F(9))); });
{
  const preds = [(n) => n * (n - 1), (n) => n * n, (n) => n - 2, (n) => n / 2];
  Q('m03', mk.mcq({ stem: r`For every integer $n \ge 2$, the quotient $\dfrac{n!}{(n-2)!}$ simplifies to`, opts: ['$n(n-1)$', '$n^2$', '$n - 2$', r`$\dfrac{n}{2}$`], key: 'a', sol: r`$n! = n(n-1)(n-2)!$, so the quotient is $n(n-1)$. For $n = 6$ both sides give $30$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.which(preds.map((f) => range(2, 14).every((n) => BigInt(f(n)) === F(n) / F(n - 2) && Number.isInteger(f(n)))), true); });
}
{
  const meals = list(prod(range(1, 5), range(1, 4), range(1, 3)));
  Q('m04', mk.mcq({ stem: r`The imagined Saffron Leaf cafe serves a set meal made of one of $5$ soups, one of $4$ mains and one of $3$ desserts. The number of different set meals is`, opts: ['$60$', '$12$', '$20$', '$15$'], key: 'a', sol: r`Three choices are made one after another, so the multiplication principle gives $5 \times 4 \times 3 = 60$. Adding the numbers of dishes gives $12$, which counts the dishes and not the meals.`, d: 1, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(meals.length === 60, 'enumerated 60 meals'); Cx.which([60, 5 + 4 + 3, 5 * 4, 4 * 3 + 3], meals.length); });
}
{
  const ways = new Set([...range(1, 4).map((k) => `bus${k}`), ...range(1, 3).map((k) => `tram${k}`), ...range(1, 2).map((k) => `ferry${k}`)]);
  Q('m05', mk.mcq({ stem: r`To reach the lake from the bus stand of the imagined town of Sunpur, a visitor takes one of $4$ bus routes, or one of $3$ tram routes, or one of $2$ ferry routes, never a mixture. The number of ways to reach the lake is`, opts: ['$9$', '$24$', '$12$', '$7$'], key: 'a', sol: r`The three kinds of transport are alternatives, so the addition principle applies: $4 + 3 + 2 = 9$. The product $24$ would be right only if one route of every kind were used in turn.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(ways.size === 9, 'union of the route lists has 9 members'); Cx.which([9, 4 * 3 * 2, 4 * 3, 7], ways.size); });
}
{
  const awards = count(kPerms(range(1, 9), 3));
  Q('m06', mk.mcq({ stem: r`Nine players reach the final of an imagined chess club tournament, and gold, silver and bronze trophies go to three different players. The number of ways the trophies can be awarded is`, opts: ['$504$', '$84$', '$729$', '$27$'], key: 'a', sol: r`The trophies are different, so order matters: ${'$'}${nPt(9, 3)} = 9 \times 8 \times 7 = 504$. The value $84$ is ${'$'}${nCt(9, 3)}$, which ignores who gets which trophy.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(awards === 504 && P(9, 3) === 504n && Cm(9, 3) === 84n, '9P3 = 504 by formula and enumeration'); Cx.which([awards, N(Cm(9, 3)), 9 ** 3, 27], 504); });
}
{
  const pins = count(kSeqs(range(1, 6), 5));
  Q('m07', mk.mcq({ stem: r`A door keypad of an imagined hostel accepts a five-digit PIN built only from the digits $1, 2, 3, 4, 5, 6$, any digit being allowed more than once. The number of possible PINs is`, opts: ['$7776$', '$720$', '$30$', '$15625$'], key: 'a', sol: r`Each of the $5$ places can be filled in $6$ ways, so there are $6^5 = 7776$ PINs. The number $15625$ is $5^6$, with base and exponent swapped.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(pins === 7776 && 6 ** 5 === 7776, '6^5 by enumeration'); Cx.which([pins, N(P(6, 5)), 6 * 5, 5 ** 6], 7776); });
}
{
  const a = list(distinctArr('PEPPER'));
  Q('m08', mk.mcq({ stem: r`The number of distinct arrangements of all the letters of the word PEPPER is`, opts: ['$60$', '$120$', '$360$', '$720$'], key: 'a', sol: r`The word has $6$ letters with P repeated $3$ times and E repeated $2$ times: $\dfrac{6!}{3!\,2!} = 60$. Dividing by $3!$ only gives $120$, and by $2!$ only gives $360$.`, d: 2, c: 'application', t: [2], time: 60 }), (Cx) => { Cx.assert(a.length === 60 && multi(6, 3, 2) === 60n && arrBySet('PEPPER').size === 60, '60 distinct arrangements'); Cx.which([60, N(F(6) / F(3)), N(F(6) / F(2)), 720], 60); });
}
{
  const w = 'CRAYONS', isV = (c) => 'AEIOU'.includes(c);
  const together = (s) => { const ix = [...s].map((c, i) => (isV(c) ? i : -1)).filter((i) => i >= 0); return ix[ix.length - 1] - ix[0] === ix.length - 1; };
  const n = count(distinctArr(w), together);
  Q('m09', mk.mcq({ stem: r`The two vowels of the word CRAYONS (taking Y as a consonant) are to stay side by side. The number of arrangements of its seven letters with this condition is`, opts: ['$1440$', '$720$', '$5040$', '$2880$'], key: 'a', sol: r`Glue the vowels A and O into one block: the block and the other $5$ letters give $6!$ arrangements, and the vowels can swap inside the block in $2!$ ways, so $6! \times 2! = 1440$. Forgetting the swap gives $720$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(n === 1440 && F(6) * F(2) === 1440n, '1440 enumerated'); Cx.which([n, N(F(6)), N(F(7)), N(F(6) * F(2) * 2n)], 1440); });
}
{
  Q('m10', mk.mcq({ stem: r`The number of ways of choosing $4$ items from $12$ different items, the order of choosing being ignored, is`, opts: ['$495$', '$11880$', '$220$', '$792$'], key: 'a', sol: r`${'$'}${nCt(12, 4)} = \dfrac{12 \times 11 \times 10 \times 9}{4!} = \dfrac{11880}{24} = 495$. The number $11880$ is ${'$'}${nPt(12, 4)}$, which counts ordered choices.`, d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => { const c = count(kCombs(range(1, 12), 4)); Cx.assert(c === 495 && pascalRow(12)[4] === 495n && P(12, 4) === 11880n && Cm(12, 3) === 220n && Cm(12, 5) === 792n, '12C4 = 495'); Cx.which([c, N(P(12, 4)), N(Cm(12, 3)), N(Cm(12, 5))], 495); });
}
{
  const hits = range(20, 80).filter((n) => Cm(n, 8) === Cm(n, 12));
  Q('m11', mk.mcq({ stem: r`If ${'$'}${nCt('n', 8)} = ${nCt('n', 12)}$ for a positive integer $n$, then $n$ equals`, opts: ['$20$', '$4$', '$96$', '$10$'], key: 'a', sol: r`When ${'$'}${nCt('n', 'a')} = ${nCt('n', 'b')}$ with $a \ne b$, the two selections are complements, so $a + b = n$. Here $n = 8 + 12 = 20$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => { Cx.assert(hits.join() === '20', 'only n = 20 in 20..80'); Cx.which([20, 4, 96, 10], hits[0]); });
}
{
  const c = count(kCombs(range(1, 9), 4));
  Q('m12', mk.mcq({ stem: r`A student council of $4$ members, with no special posts, is to be chosen from $9$ volunteers of an imagined school. The number of possible councils is`, opts: ['$126$', '$3024$', '$36$', '$6561$'], key: 'a', sol: r`Posts are not assigned, so order does not matter: ${'$'}${nCt(9, 4)} = \dfrac{9 \times 8 \times 7 \times 6}{24} = 126$. The value $3024$ is ${'$'}${nPt(9, 4)}$.`, d: 2, c: 'application', t: [3], time: 60 }), (Cx) => { Cx.assert(c === 126 && Cm(9, 4) === 126n && P(9, 4) === 3024n, '126'); Cx.which([c, N(P(9, 4)), 36, 9 ** 4], 126); });
}
{
  const s = Cm(10, 3) + Cm(10, 4);
  const opts = [Cm(11, 4), Cm(10, 7), Cm(11, 3), Cm(20, 7)];
  Q('m13', mk.mcq({ stem: r`The sum ${'$'}${nCt(10, 3)} + ${nCt(10, 4)}$ is equal to`, opts: [`$${nCt(11, 4)}$`, `$${nCt(10, 7)}$`, `$${nCt(11, 3)}$`, `$${nCt(20, 7)}$`], key: 'a', sol: r`By the rule ${'$'}${nCt('n', 'r')} + ${nCt('n', 'r-1')} = ${nCt('n+1', 'r')}$, with $n = 10$ and $r = 4$, the sum is ${'$'}${nCt(11, 4)} = 330$. Check: $120 + 210 = 330$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => { Cx.assert(s === 330n && Cm(10, 3) === 120n && Cm(10, 4) === 210n, '120 + 210 = 330'); Cx.which(opts.map(N), N(s)); });
}
{
  const hits = range(2, 40).filter((n) => P(n, 2) === 90n);
  Q('m14', mk.mcq({ stem: r`If ${'$'}${nPt('n', 2)} = 90$, the value of the positive integer $n$ is`, opts: ['$10$', '$9$', '$45$', '$8$'], key: 'a', sol: r`${'$'}${nPt('n', 2)} = n(n-1) = 90$, so $n^2 - n - 90 = 0$, which factorises as $(n - 10)(n + 9) = 0$. The positive root is $n = 10$.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(hits.join() === '10', 'n = 10 only'); Cx.which([10, 9, 45, 8], hits[0]); });
}
{
  const people = [...'WWWWW'].map((c, i) => `W${i}`).concat(['M0', 'M1', 'M2', 'M3']);
  const n = count(kCombs(people, 3), (s) => s.some((p) => p.startsWith('M')));
  Q('m15', mk.mcq({ stem: r`A panel of $3$ is to be chosen from $5$ women and $4$ men of an imagined residents' association so that it has at least one man. The number of such panels is`, opts: ['$74$', '$84$', '$112$', '$10$'], key: 'a', sol: r`All panels: ${'$'}${nCt(9, 3)} = 84$. Panels with no man: ${'$'}${nCt(5, 3)} = 10$. So $84 - 10 = 74$. Choosing one man first and then any $2$ of the other $8$ counts some panels twice and gives $112$.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(n === 74 && Cm(9, 3) - Cm(5, 3) === 74n && 4 * N(Cm(8, 2)) === 112, '74'); Cx.which([n, N(Cm(9, 3)), 112, N(Cm(5, 3))], 74); });
}
{
  const nn = 12;
  const chords = list(kCombs(range(0, nn - 1), 2));
  const diag = chords.filter(([i, j]) => !(j - i === 1 || (i === 0 && j === nn - 1))).length;
  Q('m16', mk.mcq({ stem: r`A convex polygon of an imagined garden plan has $12$ sides. Joining pairs of its vertices that are not neighbours gives its diagonals. The number of diagonals is`, opts: ['$54$', '$66$', '$132$', '$108$'], key: 'a', sol: r`Every pair of vertices gives a segment: ${'$'}${nCt(12, 2)} = 66$. Of these, $12$ are sides, so there are $66 - 12 = 54$ diagonals.`, d: 3, c: 'application', t: [3], time: 75 }), (Cx) => { Cx.assert(chords.length === 66 && diag === 54 && N(Cm(12, 2)) - 12 === 54, '54 diagonals'); Cx.which([diag, N(Cm(12, 2)), N(P(12, 2)), 2 * 54], 54); });
}
{
  const base = [[0, 0], [1, 0], [2, 0], [3, 0]];
  const extras = genericExtras(base, 5, [[0, 1], [1, 3], [2, 5], [4, 7], [5, 1], [6, 11], [7, 2], [3, 8], [8, 9], [9, 4]]);
  const pts = [...base, ...extras];
  const lines = distinctLines(pts);
  Q('m17', mk.mcq({ stem: r`Nine points are marked on a sheet of grid paper. Exactly four of them lie on one straight line and no other three are collinear. The number of different straight lines that pass through at least two of the nine points is`, opts: ['$31$', '$36$', '$30$', '$28$'], key: 'a', sol: r`Pairs of points give ${'$'}${nCt(9, 2)} = 36$ lines if no three were collinear. The four collinear points give ${'$'}${nCt(4, 2)} = 6$ pairs but only $1$ line, so the count is $36 - 6 + 1 = 31$.`, d: 4, c: 'analysis', t: [3], time: 120 }), (Cx) => { Cx.assert(pts.length === 9 && lines === 31 && N(Cm(9, 2)) - N(Cm(4, 2)) + 1 === 31, '31 lines by coordinates'); Cx.which([lines, N(Cm(9, 2)), 36 - 6, 28], 31); });
}
{
  const fl = range(1, 8);
  const scen = [
    count(kPerms(fl, 3)), // a stack of 3 different flavours in order
    count(kCombs(fl, 3)), // a bowl of 3 different flavours
    count(kSeqs(fl, 3)), // 3 scoops in order, repeats allowed
    count(kPerms(fl, 3)) * 2, // ordered stack and one of 2 sauces
  ];
  Q('m18', mk.mcq({ stem: r`An imagined ice-cream shop has $8$ flavours. Exactly which one of these tasks has ${'$'}${nCt(8, 3)}$ different outcomes?`, opts: ['filling a tasting bowl with $3$ different flavours, in no particular order', 'stacking $3$ different flavours on a cone, bottom to top', 'stacking $3$ scoops from bottom to top, a flavour being allowed to repeat', r`stacking $3$ different flavours bottom to top and adding one of $2$ sauces`], key: 'a', sol: r`${'$'}${nCt(8, 3)} = 56$ counts unordered selections of $3$ different flavours. The cone stack is ${'$'}${nPt(8, 3)} = 336$, the repeating stack is $8^3 = 512$ and the sauce version is $672$.`, d: 3, c: 'analysis', t: [3], time: 90 }), (Cx) => { Cx.assert(Cm(8, 3) === 56n, '8C3 = 56'); Cx.which([scen[1], scen[0], scen[2], scen[3]], N(Cm(8, 3))); });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The five different books of an imagined study group can be arranged on a shelf in $120$ ways.`, r: r`$n$ different objects can be arranged in a row in $n!$ ways.`, key: 'a', sol: r`The rule in R with $n = 5$ gives $5! = 120$, which is exactly the count in A, so R explains A.`, d: 1, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(count(kPerms(range(1, 5), 5)) === 120 && F(5) === 120n, '5! = 120 by enumeration'); Cx.key('a'); });
Q('ar2', mk.ar({ a: r`By convention the value of $0!$ is $1$.`, r: r`$0! = 0$, because a product with no factors is zero.`, key: 'c', sol: r`A is true: $0! = 1$ keeps $n! = n \times (n-1)!$ valid at $n = 1$ and gives one way to arrange no objects. R is false: an empty product is $1$, not $0$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(F(0) === 1n && F(1) === 1n * F(0) && count(kPerms([], 0)) === 1, '0! = 1 and the empty arrangement is counted once'); Cx.key('c'); });
Q('ar3', mk.ar({ a: r`For $n = 6$ and $r = 3$, the numbers of permutations and combinations are equal: ${'$'}${nPt(6, 3)} = ${nCt(6, 3)}$.`, r: r`${'$'}${nPt('n', 'r')} = r! \times ${nCt('n', 'r')}$ for $0 \le r \le n$.`, key: 'd', sol: r`R is true, because each selection of $r$ objects can be arranged in $r!$ ways. With $n = 6$, $r = 3$ it gives ${'$'}${nPt(6, 3)} = 120$ and ${'$'}${nCt(6, 3)} = 20$, so A is false.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(P(6, 3) === 120n && Cm(6, 3) === 20n && range(0, 15).every((n) => range(0, n).every((k) => P(n, k) === F(k) * Cm(n, k))), '6P3 = 120, 6C3 = 20, nPr = r! nCr'); Cx.key('d'); });
Q('ar4', mk.ar({ a: r`${'$'}${nCt(15, 4)} = ${nCt(15, 11)}$.`, r: r`${'$'}${nCt('n', 'r')} + ${nCt('n', 'r-1')} = ${nCt('n+1', 'r')}$ for $1 \le r \le n$.`, key: 'b', sol: r`Both statements are true. A follows from choosing the objects left behind, ${'$'}${nCt('n', 'r')} = ${nCt('n', 'n-r')}$ (with value $1365$ here), not from the addition rule in R.`, d: 3, c: 'analysis', t: [3] }), (Cx) => { Cx.assert(Cm(15, 4) === Cm(15, 11) && Cm(15, 4) === 1365n && range(1, 25).every((n) => range(1, n).every((k) => Cm(n, k) + Cm(n, k - 1) === Cm(n + 1, k))), '15C4 = 15C11 = 1365; Pascal rule on n <= 25'); Cx.key('b'); });
{
  const k = count(distinctArr('KAYAK')), f = N(F(5));
  Q('ar5', mk.ar({ a: r`The letters of the word KAYAK can be arranged in fewer ways than the five different letters of the word CLOUD.`, r: r`When letters repeat, interchanging the equal letters does not give a new arrangement, so $n!$ is divided by the factorial of each repeat count.`, key: 'a', sol: r`KAYAK has $\dfrac{5!}{2!\,2!} = 30$ arrangements against $5! = 120$ for CLOUD. The division in R is the reason for the smaller number.`, d: 3, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(k === 30 && f === 120 && multi(5, 2, 2) === 30n && count(distinctArr('CLOUD')) === 120, '30 < 120'); Cx.key('a'); });
}
{
  const pins = count(kSeqs(range(0, 9), 4));
  const distinct = count(kPerms(range(0, 9), 4));
  Q('ar6', mk.ar({ a: r`A four-digit lock code using the digits $0$ to $9$, repetition allowed, can be set in $10^4$ ways.`, r: r`If repetition is allowed, the number of four-digit codes is $10 \times 9 \times 8 \times 7$.`, key: 'c', sol: r`A is true: each of the $4$ places has $10$ choices, giving $10000$ codes. R is false: $10 \times 9 \times 8 \times 7 = 5040$ counts the codes with no repeated digit.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(pins === 10000 && distinct === 5040 && 10 * 9 * 8 * 7 === 5040, '10^4 and 5040'); Cx.key('c'); });
}

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The room of an imagined hobby club can be entered through any one of $3$ corridors or any one of $2$ staircases (no one uses both). The number of ways to enter is therefore $3 \times 2 = 6$.`, key: 'f', sol: r`The corridors and the staircases are alternatives, so the addition principle applies: $3 + 2 = 5$ ways. Multiplication would suit a task done in two stages.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(new Set(['c1', 'c2', 'c3', 's1', 's2']).size === 5 && 3 + 2 === 5, '5 ways'); Cx.key('f'); });
Q('tf2', mk.tf({ stem: r`For all positive integers $a$ and $b$, the factorial of a sum equals the sum of the factorials: $(a + b)! = a! + b!$.`, key: 'f', sol: r`A single counter-example is enough: $(2 + 3)! = 120$ but $2! + 3! = 8$. (The two sides agree only in rare cases such as $a = b = 1$.)`, d: 2, c: 'understanding', t: [1] }), (Cx) => { const bad = []; for (const a of range(1, 8)) for (const b of range(1, 8)) if (F(a + b) !== F(a) + F(b)) bad.push([a, b]); Cx.assert(bad.length > 0 && F(5) === 120n && F(2) + F(3) === 8n && F(2) === F(1) + F(1), 'counter-example 2, 3'); Cx.key('f'); });
Q('tf3', mk.tf({ stem: r`For every non-negative integer $n$, ${'$'}${nCt('n', 0)} = ${nCt('n', 'n')} = 1$.`, key: 't', sol: r`There is exactly one way to choose nothing and exactly one way to choose everything: ${'$'}${nCt('n', 0)} = \dfrac{n!}{0!\,n!} = 1$ and ${'$'}${nCt('n', 'n')} = \dfrac{n!}{n!\,0!} = 1$.`, d: 1, c: 'recall', t: [3] }), (Cx) => { Cx.assert(range(0, 30).every((n) => Cm(n, 0) === 1n && Cm(n, n) === 1n) && range(0, 8).every((n) => count(kCombs(range(1, n), 0)) === 1 && count(kCombs(range(1, n), n)) === 1), 'nC0 = nCn = 1 for n = 0..30'); Cx.key('t'); });
Q('tf4', mk.tf({ stem: r`The letters of the word TOOT can be arranged in $4! = 24$ different ways.`, key: 'f', sol: r`The two O's and the two T's are identical, so many of the $24$ orderings coincide. The true count is $\dfrac{4!}{2!\,2!} = 6$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(count(distinctArr('TOOT')) === 6 && arrBySet('TOOT').size === 6 && F(4) === 24n, '6 distinct arrangements'); Cx.key('f'); });
{
  Q('tf5', mk.tf({ stem: r`In a group of $7$ volunteers of an imagined fete, the number of ways to choose the $3$ who work the stall equals the number of ways to choose the $4$ who stay away from it.`, key: 't', sol: r`Choosing the $3$ who work fixes the $4$ who do not, and conversely, so the counts are equal: ${'$'}${nCt(7, 3)} = ${nCt(7, 4)} = 35$.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(count(kCombs(range(1, 7), 3)) === 35 && count(kCombs(range(1, 7), 4)) === 35, '35 = 35'); Cx.key('t'); });
}

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`In factorial notation, the value of $\dfrac{10!}{8!}$ is ____.`, acc: [['90']], sol: r`$\dfrac{10!}{8!} = 10 \times 9 \times \dfrac{8!}{8!} = 90$.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(F(10) / F(8) === 90n, '90'); Cx.blank(90); });
{
  const n = count(kSeqs(['P', 'Q', 'R', 'S', 'T'], 3));
  Q('fb2', mk.fill({ stem: r`Three-letter strings are made from the letters P, Q, R, S and T, a letter being allowed to repeat. The number of such strings is ____.`, acc: [['125']], sol: r`Each of the $3$ places has $5$ choices, so $5^3 = 125$ strings.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(n === 125, '125'); Cx.blank(n); });
}
{
  const nn = 6, d = list(kCombs(range(0, nn - 1), 2)).filter(([i, j]) => !(j - i === 1 || (i === 0 && j === nn - 1))).length;
  Q('fb3', mk.fill({ stem: r`A regular hexagon has ____ diagonals.`, acc: [['9']], sol: r`The $6$ vertices give ${'$'}${nCt(6, 2)} = 15$ segments, of which $6$ are sides, so $15 - 6 = 9$ are diagonals.`, d: 2, c: 'application', t: [3] }), (Cx) => { Cx.assert(d === 9 && N(Cm(6, 2)) - 6 === 9, '9'); Cx.blank(d); });
}
{
  const n = count(kPerms(range(1, 6), 6));
  Q('fb4', mk.fill({ stem: r`Six students of an imagined school choir can take the six chairs of one row in ____ different orders.`, acc: [['720']], sol: r`${'$'}${nPt(6, 6)} = 6! = 720$.`, d: 1, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(n === 720, '720'); Cx.blank(n); });
}
{
  const hits = range(2, 60).filter((n) => Cm(n, 2) === 45n);
  Q('fb5', mk.fill({ stem: r`If ${'$'}${nCt('n', 2)} = 45$, then the positive integer $n$ equals ____.`, acc: [['10']], sol: r`${'$'}${nCt('n', 2)} = \dfrac{n(n-1)}{2} = 45$ gives $n(n-1) = 90$, so $n = 10$.`, d: 2, c: 'application', t: [3] }), (Cx) => { Cx.assert(hits.join() === '10', 'n = 10'); Cx.blank(hits[0]); });
}

// =============================================================== numerical
{
  const n = count(kPerms([1, 2, 3, 4, 5, 6], 4), (a) => a[3] % 2 === 0);
  Q('n01', mk.num({ stem: r`A four-digit number is made from the digits $1, 2, 3, 4, 5, 6$, no digit being used twice, and it must be even. How many such numbers are there?`, value: 180, sol: r`The last digit is $2$, $4$ or $6$: $3$ ways. The first three places then take any $3$ of the remaining $5$ digits in order: $5 \times 4 \times 3 = 60$ ways. Total: $3 \times 60 = 180$.`, scheme: [['3 choices for the last digit', 0.5], ['5 x 4 x 3 for the rest, total 180', 0.5]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(n === 180 && 3 * N(P(5, 3)) === 180, '180'); Cx.val(n); });
}
{
  const noAdj = (s) => { for (let i = 1; i < s.length; i++) if (s[i] === s[i - 1]) return false; return true; };
  const n = count(distinctArr('KAYAK'), noAdj);
  const tot = N(multi(5, 2, 2)), kk = N(multi(4, 2)), aa = N(multi(4, 2)), both = N(F(3));
  Q('n02', mk.num({ stem: r`The letters of the word KAYAK are arranged in a row. How many arrangements have no two identical letters side by side?`, value: 12, sol: r`Total: $\dfrac{5!}{2!\,2!} = 30$. With the two K's together (as one block): $\dfrac{4!}{2!} = 12$; with the two A's together: $12$; with both pairs together: $3! = 6$. At least one pair together: $12 + 12 - 6 = 18$. Hence $30 - 18 = 12$.`, scheme: [['Total 30 and each pair together 12', 0.5], ['Both together 6, union 18, and 30 - 18 = 12', 0.5]], d: 4, c: 'analysis', t: [2], time: 150 }), (Cx) => { Cx.assert(n === 12 && tot === 30 && kk === 12 && aa === 12 && both === 6 && tot - (kk + aa - both) === 12, '12 by enumeration and inclusion-exclusion'); Cx.val(n); });
}
{
  const people = [...range(1, 6).map((k) => `S${k}`), ...range(1, 5).map((k) => `J${k}`)];
  const n = count(kCombs(people, 4), (s) => s.filter((p) => p[0] === 'S').length === 3);
  Q('n03', mk.num({ stem: r`The robotics club of an imagined school has $6$ senior and $5$ junior members. A team of $4$ is chosen with exactly $3$ seniors. In how many ways can the team be chosen?`, value: 100, sol: r`Choose $3$ of the $6$ seniors and $1$ of the $5$ juniors: ${'$'}${nCt(6, 3)} \times ${nCt(5, 1)} = 20 \times 5 = 100$.`, scheme: [['6C3 = 20 and 5C1 = 5', 0.5], ['Product 100', 0.5]], d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(n === 100 && Cm(6, 3) * Cm(5, 1) === 100n, '100'); Cx.val(n); });
}
{
  const hits = range(3, 40).filter((n) => Cm(n, 3) === 84n);
  Q('n04', mk.num({ stem: r`Choosing $3$ objects from $n$ different objects can be done in $84$ ways, that is ${'$'}${nCt('n', 3)} = 84$. Determine $n$.`, value: 9, sol: r`${'$'}${nCt('n', 3)} = \dfrac{n(n-1)(n-2)}{6} = 84$, so $n(n-1)(n-2) = 504 = 9 \times 8 \times 7$. Therefore $n = 9$.`, scheme: [['n(n-1)(n-2) = 504', 0.5], ['n = 9', 0.5]], d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(hits.join() === '9' && 9 * 8 * 7 === 504, 'n = 9'); Cx.val(hits[0]); });
}
{
  const n = count(kCombs(range(1, 11), 2));
  Q('n05', mk.num({ stem: r`Eleven imagined clubs play a league in which every two clubs meet exactly once. How many matches are played in all?`, value: 55, sol: r`A match is an unordered pair of clubs: ${'$'}${nCt(11, 2)} = \dfrac{11 \times 10}{2} = 55$.`, scheme: [['Unordered pair idea, 11C2', 0.5], ['55', 0.5]], d: 2, c: 'application', t: [3], time: 60 }), (Cx) => { Cx.assert(n === 55 && Cm(11, 2) === 55n, '55'); Cx.val(n); });
}
{
  let n = 0;
  for (let v = 100; v <= 999; v++) if (v % 5 === 0) n++;
  const m = count(prod(range(1, 9), range(0, 9), [0, 5]));
  Q('n06', mk.num({ stem: r`A three-digit number has a non-zero first digit, any digits may repeat, and the number is divisible by $5$. How many such numbers exist?`, value: 180, sol: r`The last digit is $0$ or $5$: $2$ ways. The first digit has $9$ choices and the middle digit $10$. Total: $9 \times 10 \times 2 = 180$.`, scheme: [['Last digit 2 ways', 0.5], ['9 x 10 x 2 = 180', 0.5]], d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(n === 180 && m === 180, '180 by enumeration'); Cx.val(n); });
}

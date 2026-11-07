// ISC 11 Mathematics ch08 Permutations and Combinations - multiple-choice and assertion-reason items.
// Every key is recomputed twice (exact BigInt formula, brute-force enumeration); every distractor is computed from its own wrong method.
import { Q, mk } from './lib.mjs';
import { r, range, F, P, Cm, multi, S, N, kPerms, kCombs, kSeqs, distinctArr, arrBySet, count, circularClasses, circularFlip, triangles, polyDiagonals, nPt, nCt } from './cnt.mjs';

// Option 'a' is the key as authored; the build rotates keys afterwards. Option values are numbers or strings checked by C.which.
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const D = (...xs) => xs.map((x) => `$${x}$`);

// ============================================================ MCQ
M('m01', { stem: r`By the definition used in factorial notation, the value of $0!$ is`, opts: D('1', '0', '-1', r`\text{undefined}`).map((x, i) => (i === 3 ? 'not defined' : x)), sol: r`The rule $n! = n \times (n - 1)!$ at $n = 1$ gives $1! = 1 \times 0!$, and since $1! = 1$ we need $0! = 1$. The values $0$ and $-1$ would break this rule, and the factorial is defined at $0$, so it is not undefined.`, d: 1, c: 'recall', t: [1], time: 30 }, (C) => {
  C.assert(F(0) === 1n && F(1) === 1n * F(0) && range(1, 12).every((n) => F(n) === BigInt(n) * F(n - 1)), '0! = 1 keeps n! = n (n-1)! valid at n = 1');
  C.which(['1', '0', '-1', 'nd'], '1');
});
{
  const fa = [(n) => (n + 1) * (n + 2), (n) => n * (n + 1), (n) => n + 2, (n) => n * n + 2];
  const ok = fa.map((g) => range(1, 14).every((n) => F(n + 2) / F(n) === BigInt(g(n))));
  M('m02', { stem: r`For a positive integer $n$, the quotient $\dfrac{(n + 2)!}{n!}$ simplifies to`, opts: D(r`(n + 1)(n + 2)`, r`n(n + 1)`, r`n + 2`, r`n^2 + 2`), sol: r`Write $(n + 2)! = (n + 2)(n + 1)\,n!$ and cancel $n!$ to get $(n + 1)(n + 2)$. The expression $n(n + 1)$ is what $\dfrac{(n + 1)!}{(n - 1)!}$ gives, and $n + 2$ cancels only one factor.`, d: 2, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(ok.join() === 'true,false,false,false', 'only (n+1)(n+2) equals (n+2)!/n! for n = 1..14');
    C.which(['A', 'B', 'C', 'D'], ['A', 'B', 'C', 'D'][ok.indexOf(true)]);
  });
}
{
  let c = 0; for (const a of range(1, 6)) for (const b of range(1, 5)) for (const d of range(1, 3)) c++;
  M('m03', { stem: r`An imagined study app lets a learner choose one of $6$ avatars, one of $5$ colour themes and one of $3$ sound packs. The number of different set-ups is`, opts: D('90', '14', '30', '45'), sol: r`The three choices are made one after another and independently, so by the multiplication principle there are $6 \times 5 \times 3 = 90$ set-ups. The value $14$ adds the numbers of options, which is the rule for alternatives, not for successive choices; $30$ ignores the sound pack; $45$ halves the product for no reason.`, d: 1, c: 'understanding', t: [1], time: 45 }, (C) => {
    C.assert(c === 90 && 6 + 5 + 3 === 14 && 6 * 5 === 30 && c / 2 === 45, '6 x 5 x 3 = 90 by enumeration'); C.which([90, 14, 30, 45], c);
  });
}
{
  const tops = range(1, 4), bottoms = ['p1', 'p2', 'p3', 's1', 's2'];
  const outfits = new Set(); for (const a of tops) for (const b of bottoms) outfits.add(`${a}${b}`);
  M('m04', { stem: r`For a school event Rohan, an imagined student, wears one of $4$ shirts together with either one of $3$ pairs of trousers or one of $2$ pairs of shorts, never both. The number of different outfits is`, opts: D('20', '24', '9', '14'), sol: r`The bottoms are alternatives, so there are $3 + 2 = 5$ choices (addition principle). The shirt is chosen as well, so the outfits number $4 \times 5 = 20$. The value $24$ multiplies all three counts, as if he wore trousers and shorts together; $9$ adds everything; $14$ pairs the shirts with the trousers only and then adds the $2$ shorts.`, d: 2, c: 'application', t: [1], time: 75 }, (C) => {
    C.assert(outfits.size === 20 && 4 * 3 * 2 === 24 && 4 + 3 + 2 === 9 && 4 * 3 + 2 === 14, 'shirt x (trousers or shorts) = 20'); C.which([20, 24, 9, 14], outfits.size);
  });
}
{
  const v = count(kPerms(range(1, 8), 3));
  M('m05', { stem: r`The number of ways of arranging $3$ of $8$ different trophies in a row on a display shelf is the value of $^{8}P_{3}$, which is`, opts: D(S(P(8, 3)), S(Cm(8, 3)), '24', S(F(8) / F(3))), sol: r`$^{8}P_{3} = 8 \times 7 \times 6 = ${S(P(8, 3))}$. The value $${S(Cm(8, 3))}$ is $^{8}C_{3}$, which ignores the order of the three trophies; $24$ is $8 \times 3$; and $${S(F(8) / F(3))}$ is $\dfrac{8!}{3!}$, which has too many factors.`, d: 1, c: 'understanding', t: [2], time: 45 }, (C) => {
    C.assert(v === 336 && P(8, 3) === 336n, '8P3 = 336 by enumeration'); C.which([336, 56, 24, 6720], v);
  });
}
{
  const sol = range(3, 40).filter((n) => P(n, 3) === 10n * P(n, 2));
  M('m06', { stem: r`The positive integer $n \ge 3$ that satisfies $^{n}P_{3} = 10 \times {}^{n}P_{2}$ is`, opts: D('12', '10', '13', '8'), sol: r`$^{n}P_{3} = n(n - 1)(n - 2)$ and $^{n}P_{2} = n(n - 1)$. Dividing by $n(n - 1)$ (non-zero) leaves $n - 2 = 10$, so $n = 12$. The value $10$ forgets the $-2$, and $13$ and $8$ do not satisfy the equation.`, d: 3, c: 'application', t: [2], time: 90 }, (C) => {
    C.assert(sol.join() === '12', 'search over n gives only n = 12'); C.which([12, 10, 13, 8], sol[0]);
  });
}
{
  const digits = range(2, 8);
  const v = count(kPerms(digits, 4), (a) => a[0] * 1000 + a[1] * 100 + a[2] * 10 + a[3] > 5000);
  M('m07', { stem: r`Four-digit numbers greater than $5000$ are formed from the digits $2, 3, 4, 5, 6, 7, 8$, no digit being used twice. The number of such numbers is`, opts: D(S(4n * P(6, 3)), S(P(7, 4)), S(4 * 6 ** 3), '360'), sol: r`The thousands digit must be $5, 6, 7$ or $8$, which gives $4$ choices. The other three places take any of the remaining $6$ digits in order: $^{6}P_{3} = 120$. So there are $4 \times 120 = ${S(4n * P(6, 3))}$ numbers. The value $${S(P(7, 4))}$ ignores the condition, and $${S(4 * 6 ** 3)}$ allows repeated digits.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(v === 480 && 4n * P(6, 3) === 480n, '4 x 6P3 = 480 by enumeration'); C.which([480, 840, 864, 360], v);
  });
}
{
  const digits = range(0, 7);
  const v = count(kPerms(digits, 5), (a) => a[0] !== 0);
  M('m08', { stem: r`Five-digit numbers with five different digits are made from the digits $0, 1, 2, 3, 4, 5, 6, 7$. The number of such numbers is`, opts: D(S(7n * P(7, 4)), S(P(8, 5)), S(7n * P(8, 4)), '5040'), sol: r`The first digit cannot be $0$, so it has $7$ choices. The remaining four places are filled from the other $7$ digits (which include $0$): $^{7}P_{4} = 840$. The total is $7 \times 840 = ${S(7n * P(7, 4))}$. The value $${S(P(8, 5))}$ is $^{8}P_{5}$, which allows a leading zero; $${S(7n * P(8, 4))}$ lets the remaining places choose from $8$ digits.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(v === 5880 && 7n * P(7, 4) === 5880n, '7 x 7P4 = 5880 by enumeration'); C.which([5880, 6720, 11760, 5040], v);
  });
}
{
  const v = count(distinctArr('ARRANGE'));
  M('m09', { stem: r`The number of distinct arrangements of all the letters of the word ARRANGE is`, opts: D(S(multi(7, 2, 2)), S(F(7)), S(F(7) / 2n), S(multi(7, 2, 2) / 2n)), sol: r`There are $7$ letters with the letter A twice and the letter R twice. The number of distinct arrangements is $\dfrac{7!}{2!\,2!} = ${S(multi(7, 2, 2))}$. The value $${S(F(7))}$ treats all letters as different, and $${S(F(7) / 2n)}$ divides for only one repeated letter.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    C.assert(v === 1260 && arrBySet('ARRANGE') === 1260 && multi(7, 2, 2) === 1260n, '7!/(2!2!) = 1260, enumerated two ways'); C.which([1260, 5040, 2520, 630], v);
  });
}
{
  const seat = range(0, 6); // students 0..6, the particular three are 0, 1, 2
  const v = count(kPerms(seat, 7), (a) => { const p = [0, 1, 2].map((x) => a.indexOf(x)); return Math.max(...p) - Math.min(...p) === 2; });
  M('m10', { stem: r`Seven imagined students sit in a row on a long bench. Three particular students insist on sitting next to one another. The number of seatings is`, opts: D(S(F(5) * F(3)), S(F(6) * F(3)), S(F(5)), '840'), sol: r`Glue the three students into one block: the block and the other $4$ students make $5$ units, arranged in $5! = 120$ ways. Inside the block the three can swap in $3! = 6$ ways. The total is $120 \times 6 = ${S(F(5) * F(3))}$. The value $${S(F(6) * F(3))}$ counts $6$ units instead of $5$, and $120$ forgets the order inside the block.`, d: 3, c: 'application', t: [2], time: 90 }, (C) => {
    C.assert(v === 720 && F(5) * F(3) === 720n, '5! x 3! = 720 by enumeration'); C.which([720, 4320, 120, 840], v);
  });
}
{
  const v = count(kPerms(range(0, 7), 8), (a) => Math.abs(a.indexOf(0) - a.indexOf(1)) !== 1);
  M('m11', { stem: r`Eight different flags are hung in a line from left to right. Two particular flags must never hang side by side. The number of ways to hang the flags is`, opts: D(S(F(8) - 2n * F(7)), S(F(8) - F(7)), S(2n * F(7)), S(F(8))), sol: r`Count all hangings and remove those with the two flags together. All: $8! = 40320$. Together: glue them to make $7$ units, $7! = 5040$ ways, times $2$ orders, which is $10080$. So $40320 - 10080 = ${S(F(8) - 2n * F(7))}$. The value $${S(F(8) - F(7))}$ forgets the factor $2$, and $10080$ is the number with the flags together.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(v === 30240 && F(8) - 2n * F(7) === 30240n, '8! - 2 x 7! = 30240 by enumeration'); C.which([30240, 35280, 10080, 40320], v);
  });
}
{
  const v = circularClasses(8);
  M('m12', { stem: r`Eight different people take seats round a circular table, and two seatings that differ only by a rotation are the same. The number of different seatings is`, opts: D(S(F(7)), S(F(8)), S(F(7) / 2n), S(F(6))), sol: r`Fix one person to remove the rotations; the other $7$ can then be seated in $7! = ${S(F(7))}$ ways. The value $${S(F(8))}$ counts rotations as different, and $${S(F(7) / 2n)}$ would also treat a seating and its mirror image as the same, which is not asked here.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    C.assert(v === 5040 && F(7) === 5040n, '(8 - 1)! = 5040 by canonical rotation classes'); C.which([5040, 40320, 2520, 720], v);
  });
}
{
  const v = circularFlip(9);
  M('m13', { stem: r`Nine beads, all different, are threaded on a thin wire to form a necklace that can be turned over, so a pattern and its mirror image count as one. The number of different necklaces is`, opts: D(S(F(8) / 2n), S(F(8)), S(F(9)), S(F(9) / 2n)), sol: r`Round a ring there are $(9 - 1)! = 40320$ arrangements. A necklace can be flipped, which pairs each arrangement with its mirror image, so the count is halved: $\dfrac{8!}{2} = ${S(F(8) / 2n)}$. The value $${S(F(8))}$ does not halve; $${S(F(9))}$ and $${S(F(9) / 2n)}$ treat the beads as in a row.`, d: 2, c: 'understanding', t: [3], time: 75 }, (C) => {
    C.assert(v === 20160 && F(8) / 2n === 20160n, '(9 - 1)!/2 = 20160 by rotation and reflection classes'); C.which([20160, 40320, 362880, 181440], v);
  });
}
{
  const v = count(kCombs(range(1, 15), 12));
  M('m14', { stem: r`The number of ways of choosing $12$ cards from $15$ different cards, the order of choosing being ignored, is $^{15}C_{12}$, which equals`, opts: D(S(Cm(15, 12)), S(P(15, 3)), S(Cm(15, 4)), '180'), sol: r`$^{15}C_{12} = {}^{15}C_{3} = \dfrac{15 \times 14 \times 13}{3 \times 2 \times 1} = ${S(Cm(15, 12))}$. The value $${S(P(15, 3))}$ is $^{15}P_{3}$ and does not divide by $3!$; $${S(Cm(15, 4))}$ is $^{15}C_{4}$; and $180$ is $15 \times 12$.`, d: 1, c: 'understanding', t: [4], time: 60 }, (C) => {
    C.assert(v === 455 && Cm(15, 12) === Cm(15, 3), '15C12 = 15C3 = 455 by enumeration'); C.which([455, 2730, 1365, 180], v);
  });
}
{
  const sol = range(9, 60).filter((n) => Cm(n, 9) === Cm(n, 5));
  M('m15', { stem: r`If $^{n}C_{9} = {}^{n}C_{5}$, the value of $n$ is`, opts: D('14', '4', '45', '13'), sol: r`Two combinations with the same $n$ are equal when the lower numbers are equal or add up to $n$. Since $9 \ne 5$, $n = 9 + 5 = 14$. The value $4$ subtracts instead of adding; $45$ multiplies; $13$ is an off-by-one slip.`, d: 2, c: 'understanding', t: [4], time: 60 }, (C) => {
    C.assert(sol.join() === '14', 'search gives only n = 14'); C.which([14, 4, 45, 13], sol[0]);
  });
}
{
  const a = pascal14();
  function pascal14() { return Cm(14, 5) + Cm(14, 6); }
  M('m16', { stem: r`The value of $^{14}C_{5} + {}^{14}C_{6}$ is`, opts: D(S(Cm(15, 6)), S(Cm(15, 5)), S(2n * Cm(14, 6)), S(Cm(14, 4))), sol: r`Pascal's rule $^{n}C_{r-1} + {}^{n}C_{r} = {}^{n+1}C_{r}$ with $n = 14$, $r = 6$ gives $^{15}C_{6} = ${S(Cm(15, 6))}$. Direct check: $2002 + 3003 = 5005$. The value $${S(Cm(15, 5))}$ is $^{15}C_{5}$, from a wrong lower number; $${S(2n * Cm(14, 6))}$ doubles the larger term; $${S(Cm(14, 4))}$ is unrelated.`, d: 2, c: 'understanding', t: [4], time: 75 }, (C) => {
    C.assert(Cm(14, 5) === 2002n && Cm(14, 6) === 3003n && a === 5005n && Cm(15, 6) === 5005n, '2002 + 3003 = 5005 = 15C6'); C.which([5005, 3003, 6006, 1001], N(a));
  });
}
{
  const women = range(1, 4).map((i) => 'w' + i), men = range(1, 5).map((i) => 'm' + i);
  const v = count(kCombs([...men, ...women], 4), (g) => g.some((x) => x[0] === 'w'));
  M('m17', { stem: r`A quiz team of $4$ is chosen from $5$ boys and $4$ girls of an imagined class so that it contains at least one girl. The number of possible teams is`, opts: D(S(Cm(9, 4) - Cm(5, 4)), S(Cm(9, 4)), S(4n * Cm(8, 3)), '116'), sol: r`Remove from all teams the teams with no girl. All teams: $^{9}C_{4} = 126$. All-boys teams: $^{5}C_{4} = 5$. So the answer is $126 - 5 = ${S(Cm(9, 4) - Cm(5, 4))}$. The value $126$ includes the all-boys teams; $${S(4n * Cm(8, 3))}$ picks a girl first and then three others, which counts a team with two girls twice or more; $116$ is not a count of this kind.`, d: 3, c: 'application', t: [5], time: 90 }, (C) => {
    C.assert(v === 121 && Cm(9, 4) - Cm(5, 4) === 121n && 4 * N(Cm(8, 3)) === 224, '126 - 5 = 121 by enumeration'); C.which([121, 126, 224, 116], v);
  });
}
{
  // identical pens (4) and identical pencils (3): distinct selections of at least one item, from labelled items
  const items = [...range(1, 4).map((i) => 'pen' + i), ...range(1, 3).map((i) => 'pc' + i)];
  const seen = new Set();
  for (let mask = 1; mask < 1 << items.length; mask++) { const pick = items.filter((_, i) => mask & (1 << i)); seen.add(`${pick.filter((x) => x.startsWith('pen')).length},${pick.filter((x) => x.startsWith('pc')).length}`); }
  M('m18', { stem: r`A drawer holds $4$ identical pens and $3$ identical pencils. The number of ways of taking at least one of these writing tools from the drawer is`, opts: D('19', '20', '12', '7'), sol: r`The number of pens taken can be $0, 1, 2, 3, 4$, which is $5$ choices, and pencils $0, 1, 2, 3$, which is $4$ choices, so $5 \times 4 = 20$ selections including taking nothing. Remove that one: $20 - 1 = 19$. The value $20$ keeps the empty selection; $12 = 4 \times 3$ forgets that none may be taken; $7$ adds the numbers of tools.`, d: 3, c: 'application', t: [4], time: 90 }, (C) => {
    C.assert(seen.size === 19 && (4 + 1) * (3 + 1) - 1 === 19, '(4+1)(3+1) - 1 = 19 distinct selections'); C.which([19, 20, 12, 7], seen.size);
  });
}
{
  const line = [[0, 0], [1, 0], [2, 0], [3, 0]], off = [[-2, 3], [0, 4], [1, 6], [3, 5], [4, 2], [5, 7]];
  const v = triangles([...line, ...off]);
  M('m19', { stem: r`Ten points are marked on a map of an imagined park. Exactly four of them lie on one straight path and no other three are in a line. The number of triangles with three of these points as vertices is`, opts: D(S(Cm(10, 3) - Cm(4, 3)), S(Cm(10, 3)), S(Cm(10, 3) - Cm(4, 2)), '112'), sol: r`Any $3$ points give $^{10}C_{3} = 120$ selections, but three points on the path do not form a triangle. Those number $^{4}C_{3} = 4$. So there are $120 - 4 = ${S(Cm(10, 3) - Cm(4, 3))}$ triangles. The value $120$ keeps the flat triples; $114$ subtracts $^{4}C_{2} = 6$, the number of pairs; $112$ is not obtained from any correct step.`, d: 3, c: 'application', t: [5], time: 90 }, (C) => {
    C.assert(v === 116 && Cm(10, 3) - Cm(4, 3) === 116n, '120 - 4 = 116 triangles from explicit coordinates'); C.which([116, 120, 114, 112], v);
  });
}
{
  const vow = ['a', 'e', 'i', 'o'], con = ['b', 'c', 'd', 'f', 'g', 'h'];
  const letters = [...vow, ...con];
  const v = count(kPerms(letters, 5), (w) => w.filter((x) => vow.includes(x)).length === 2);
  M('m20', { stem: r`Five-letter words, meaningful or not, are made from $4$ vowels and $6$ consonants, all different, using no letter twice. Exactly $2$ vowels must appear. The number of such words is`, opts: D(S(Cm(4, 2) * Cm(6, 3) * F(5)), '120', '1200', S(P(4, 2) * P(6, 3) * F(5))), sol: r`First select: $^{4}C_{2} \times {}^{6}C_{3} = 6 \times 20 = 120$ sets of $5$ letters. Then arrange each set: $5! = 120$ ways. Total $120 \times 120 = ${S(Cm(4, 2) * Cm(6, 3) * F(5))}$. The value $120$ stops after the selection; $1200$ divides by $2!\,3!$ as if the letters repeated; $${S(P(4, 2) * P(6, 3) * F(5))}$ orders the letters twice.`, d: 4, c: 'application', t: [5], time: 120 }, (C) => {
    C.assert(v === 14400 && Cm(4, 2) * Cm(6, 3) * F(5) === 14400n, '4C2 x 6C3 x 5! = 14400 by enumeration'); C.which([14400, 120, 1200, 172800], v);
  });
}

// ============================================================ Assertion-reason
Q('ar1', mk.ar({ a: r`The letters of the word LEVEL can be arranged in $30$ different ways.`, r: r`When $n$ things are arranged in a row and $p$ of them are alike of one kind and $q$ alike of another kind, the number of distinct arrangements is $\dfrac{n!}{p!\,q!}$.`, key: 'a', sol: r`LEVEL has $5$ letters, with L twice and E twice, so $\dfrac{5!}{2!\,2!} = 30$ and A is true. R is the general rule used for it, so R explains A.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  C.assert(count(distinctArr('LEVEL')) === 30 && multi(5, 2, 2) === 30n && arrBySet('LEVEL') === 30, '5!/(2!2!) = 30 two ways'); C.key('a');
});
Q('ar2', mk.ar({ a: r`The number of ways of choosing $3$ different books from $8$ different books is $56$.`, r: r`For $0 \le r \le n$, $^{n}C_{r} = r! \times {}^{n}P_{r}$.`, key: 'c', sol: r`$^{8}C_{3} = \dfrac{8 \times 7 \times 6}{6} = 56$, so A is true. R is false: the correct relation is $^{n}P_{r} = r! \times {}^{n}C_{r}$, because each selection can be ordered in $r!$ ways. For $n = 8$, $r = 3$, R would give $6 \times 336$, not $56$.`, d: 2, c: 'understanding', t: [4] }), (C) => {
  C.assert(count(kCombs(range(1, 8), 3)) === 56 && Cm(8, 3) === 56n && P(8, 3) === 6n * Cm(8, 3) && Cm(8, 3) !== 6n * P(8, 3), '8C3 = 56; nPr = r! nCr, not the reverse'); C.key('c');
});
Q('ar3', mk.ar({ a: r`A convex polygon with $10$ sides has $45$ diagonals.`, r: r`A convex polygon with $n$ sides has $^{n}C_{2} - n$ diagonals.`, key: 'd', sol: r`R is true: of the $^{n}C_{2}$ segments joining two vertices, $n$ are sides. For $n = 10$ this gives $45 - 10 = 35$ diagonals, so A is false; the number $45$ is the number of segments joining pairs of vertices, sides included.`, d: 3, c: 'application', t: [5] }), (C) => {
  C.assert(polyDiagonals(10) === 35 && Cm(10, 2) - 10n === 35n && Cm(10, 2) === 45n, 'decagon: 45 segments, 35 diagonals'); C.key('d');
});
Q('ar4', mk.ar({ a: r`$^{9}C_{4} = {}^{9}C_{5}$.`, r: r`$^{n}C_{r} = \dfrac{^{n}P_{r}}{r!}$ for $0 \le r \le n$.`, key: 'b', sol: r`Both values equal $126$, so A is true, and R is a correct formula. But R does not explain the equality: that comes from $^{n}C_{r} = {}^{n}C_{n-r}$, since choosing $4$ of $9$ is the same as leaving out $5$ of $9$.`, d: 2, c: 'understanding', t: [4] }), (C) => {
  C.assert(Cm(9, 4) === 126n && Cm(9, 5) === 126n && P(9, 4) / F(4) === Cm(9, 4) && count(kCombs(range(1, 9), 4)) === 126, '9C4 = 9C5 = 126; R true'); C.key('b');
});
Q('ar5', mk.ar({ a: r`From $5$ different fruits a child can take some or all in $31$ ways (at least one fruit).`, r: r`Each fruit is either taken or left, so there are $2^{5}$ selections, and removing the empty one leaves $2^{5} - 1$.`, key: 'a', sol: r`$2^{5} - 1 = 31$, so A is true, and R gives exactly that count by the multiplication principle: two options for each of the $5$ fruits, less the empty selection. R explains A.`, d: 2, c: 'understanding', t: [4] }), (C) => {
  const n = count(kCombs(range(1, 5), 1)) + count(kCombs(range(1, 5), 2)) + count(kCombs(range(1, 5), 3)) + count(kCombs(range(1, 5), 4)) + count(kCombs(range(1, 5), 5));
  C.assert(n === 31 && 2 ** 5 - 1 === 31, '31 non-empty selections'); C.key('a');
});
{
  const v = circularClasses(7, (a) => { const i = a.indexOf(0), j = a.indexOf(1); const n = a.length; return (i - j + n) % n === 1 || (j - i + n) % n === 1; });
  Q('ar6', mk.ar({ a: r`Seven people sit round a table and two particular people must sit side by side. The number of seatings is $2 \times 6! = 1440$.`, r: r`When two persons must be together, treat them as one unit and multiply by the $2!$ orders inside the pair.`, key: 'd', sol: r`R is the correct method, but A uses it wrongly. The pair and the other $5$ people make $6$ units, which are placed round the table in $(6 - 1)! = 120$ ways, not $6!$. With the $2!$ orders inside the pair the number is $2 \times 120 = 240$, so A is false.`, d: 3, c: 'analysis', t: [3] }), (C) => {
    C.assert(v === 240 && 2n * F(5) === 240n && 2n * F(6) === 1440n, 'together round a table: 2 x 5! = 240, not 1440'); C.key('d');
  });
}

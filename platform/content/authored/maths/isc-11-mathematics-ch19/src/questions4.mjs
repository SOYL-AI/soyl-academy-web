// ISC 11 Mathematics ch19 Probability - long-answer items (5 marks, set in labelled parts with [marks], five scheme steps).
import { Q, mk } from './lib.mjs';
import { fr, F, T, dec, setTex, choose, cart, subsets, arrangements, range, Space, addOK, addOK3, assignVerdict, tiles, sumF } from './prob.mjs';

const r = String.raw;
const ft = (x) => x.tex();
const L5 = (o) => mk.long({ marks: 5, time: 420, ...o });

{
  const S = tiles(1, 15), A = (x) => x % 3 === 0, B = (x) => [2, 3, 5, 7, 11, 13].includes(x), o = addOK(S, A, B);
  Q('l01', L5({ stem: r`A bag holds fifteen tickets numbered $1$ to $15$ and one ticket is drawn at random. Let $A$ be "the number is a multiple of $3$" and $B$ "the number is prime". Find

(a) $A$ and $B$ as sets, and $A \cap B$, [2]

(b) the number of outcomes in $A \cup B$, [1]

(c) $P(A \cup B)$, first by counting the union and then by the addition theorem. [2]`, model: r`(a) $A = ${setTex(S.ev(A))}$ and $B = ${setTex(S.ev(B))}$. The only number in both is $3$, so $A \cap B = \{3\}$.

(b) $n(A \cup B) = n(A) + n(B) - n(A \cap B) = 5 + 6 - 1 = 10$.

(c) Counting: the union is $${setTex(S.ev((x) => A(x) || B(x)))}$ with $10$ of the $15$ equally likely tickets, so $P(A \cup B) = \dfrac{10}{15} = ${ft(o.pu)}$.
Addition theorem: $P(A \cup B) = \dfrac{5}{15} + \dfrac{6}{15} - \dfrac{1}{15} = \dfrac{10}{15} = ${ft(o.pu)}$. The two routes agree.`, sol: 'List both events, find the overlap, and use the counting form of the union before the probability form.', scheme: [['$A$ and $B$ listed', 1], ['$A \\cap B = \\{3\\}$', 1], ['$n(A \\cup B) = 5 + 6 - 1 = 10$', 1], ['$P(A \\cup B) = \\dfrac{10}{15} = \\dfrac{2}{3}$ by counting', 1], ['The same value by the addition theorem', 1]], d: 3, c: 'application', t: [2, 4] }), (C) => {
    C.assert(S.cnt(A) === 5 && S.cnt(B) === 6 && S.ev((x) => A(x) && B(x)).join() === '3' && S.cnt((x) => A(x) || B(x)) === 10 && o.ok && o.pu.eq(F(2, 3)) && o.pa.add(o.pb).sub(o.pab).eq(F(2, 3)), 'A has 5, B has 6, A and B = {3}; the union has 10 tickets: 2/3 by counting and by the theorem'); C.model(['n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = 5 + 6 - 1 = 10', '\\dfrac{2}{3}', 'A \\cap B = \\{3\\}']);
  });
}
{
  const S = new Space(arrangements(range(1, 5), 2)), A = ([a, b]) => a + b >= 7, B = ([a, b]) => a > b, o = addOK(S, A, B), ab = S.ev((p) => A(p) && B(p));
  const lab = (p) => `(${p.join(', ')})`;
  Q('l02', L5({ stem: r`Two tiles are drawn one after the other, without replacement, from five tiles numbered $1$ to $5$, and the numbers are written as an ordered pair. Let $A$ be "the sum of the two numbers is at least $7$" and $B$ "the first number is greater than the second". Find

(a) the number of outcomes in the sample space, [1]

(b) the outcomes in $A \cap B$, [1]

(c) $n(A)$ and $n(B)$, [1]

(d) $P(A \cup B)$ by the addition theorem. [2]`, model: r`(a) The first tile can be chosen in $5$ ways and the second in $4$ ways, so $n(S) = 5 \times 4 = 20$.

(b) $A = \{${S.ev(A).map(lab).join(', ')}\}$ and $B$ is every pair with a larger first number. The pairs in both are $A \cap B = \{${ab.map(lab).join(', ')}\}$, so $n(A \cap B) = 4$.

(c) $n(A) = 8$. Exactly half of the $20$ pairs have the first number larger, so $n(B) = 10$.

(d) $P(A \cup B) = \dfrac{8}{20} + \dfrac{10}{20} - \dfrac{4}{20} = \dfrac{14}{20} = ${ft(o.pu)}$.`, sol: 'Count the pairs of the sample space by the product rule, then find the overlap of A and B from the lists before using the addition theorem.', scheme: [['$n(S) = 5 \\times 4 = 20$', 1], ['$A \\cap B$ listed (four pairs)', 1], ['$n(A) = 8$ and $n(B) = 10$', 1], ['$P(A) + P(B) - P(A \\cap B)$ with the three probabilities', 1], ['$P(A \\cup B) = \\dfrac{7}{10}$', 1]], d: 4, c: 'analysis', t: [1, 2, 4] }), (C) => {
    C.assert(S.n === 20 && S.cnt(A) === 8 && S.cnt(B) === 10 && ab.length === 4 && S.cnt((p) => A(p) || B(p)) === 14 && o.ok && o.pu.eq(F(7, 10)), 'n(S) = 20, n(A) = 8, n(B) = 10, n(A and B) = 4, union 14: 7/10 (theorem cross-checked by counting)'); C.model(['n(S) = 5 \\times 4 = 20', '\\dfrac{7}{10}', '(5, 4)']);
  });
}
{
  const S = new Space([1, 2, 3, 4], [F(1, 30), F(4, 30), F(9, 30), F(16, 30)]), A = (j) => j % 2 === 0, B = (j) => j >= 3, o = addOK(S, A, B);
  Q('l03', L5({ stem: r`A four-sided die is loaded so that the probability of the score $j$ is $\dfrac{j^2}{30}$ for $j = 1, 2, 3, 4$. Find

(a) a check that this is a valid assignment of probabilities, [1]

(b) the probability of an even score, [1]

(c) the probability of a score of at least $3$, [1]

(d) the probability that the score is even or at least $3$, using the addition theorem. [2]`, model: r`(a) Every value $\dfrac{j^2}{30}$ is positive and $\dfrac{1 + 4 + 9 + 16}{30} = \dfrac{30}{30} = 1$, so the assignment is valid.

(b) $P(\text{even}) = P(2) + P(4) = \dfrac{4}{30} + \dfrac{16}{30} = ${ft(o.pa)}$.

(c) $P(\text{at least } 3) = P(3) + P(4) = \dfrac{9}{30} + \dfrac{16}{30} = ${ft(o.pb)}$.

(d) The score $4$ is both even and at least $3$, so $P(A \cap B) = \dfrac{16}{30} = ${ft(o.pab)}$. Then $P(A \cup B) = \dfrac{2}{3} + \dfrac{5}{6} - \dfrac{8}{15} = \dfrac{20 + 25 - 16}{30} = ${ft(o.pu)}$.`, sol: 'Check the total first; the later parts add the probabilities of the scores in each event, then use the overlap.', scheme: [['Positive values with total $1$', 1], ['$P(\\text{even}) = \\dfrac{2}{3}$', 1], ['$P(\\text{at least } 3) = \\dfrac{5}{6}$', 1], ['$P(A \\cap B) = \\dfrac{8}{15}$ from the score $4$', 1], ['$P(A \\cup B) = \\dfrac{29}{30}$', 1]], d: 4, c: 'application', t: [3, 4] }), (C) => {
    C.assert(assignVerdict(S.w).ok && o.pa.eq(F(2, 3)) && o.pb.eq(F(5, 6)) && o.pab.eq(F(8, 15)) && o.pu.eq(F(29, 30)) && o.ok && S.P((j) => j === 1).eq(F(1, 30)) && o.pu.eq(fr(1).sub(S.P((j) => j === 1))), 'total 1; P(even) = 2/3, P(at least 3) = 5/6, P(both) = 8/15, P(either) = 29/30 = 1 - P(1)'); C.model(['\\dfrac{2}{3}', '\\dfrac{5}{6}', '\\dfrac{8}{15}', '\\dfrac{29}{30}']);
  });
}
{
  const ppl = [...range(1, 5).map((i) => `T${i}`), ...range(1, 4).map((i) => `S${i}`)], S = new Space(subsets(ppl, 4)), two = S.P((t) => t.filter((x) => x[0] === 'T').length === 2), atLeast = S.P((t) => t.some((x) => x[0] === 'S')), none = S.P((t) => t.every((x) => x[0] === 'T'));
  Q('l04', L5({ stem: r`A committee of four is chosen at random from $5$ teachers and $4$ students, every committee being equally likely. Find

(a) the number of possible committees, [1]

(b) the probability that it has exactly two teachers, [2]

(c) the probability that it has at least one student, using the complement. [2]`, model: r`(a) $n(S) = \dbinom{9}{4} = \dfrac{9 \times 8 \times 7 \times 6}{4 \times 3 \times 2 \times 1} = 126$.

(b) Two teachers and two students: $\dbinom{5}{2} \times \dbinom{4}{2} = 10 \times 6 = 60$ committees, so $P = \dfrac{60}{126} = ${ft(two)}$.

(c) The complement is "no student", that is four teachers: $\dbinom{5}{4} = 5$ committees, with probability $\dfrac{5}{126}$. So $P(\text{at least one student}) = 1 - \dfrac{5}{126} = ${ft(atLeast)}$.`, sol: 'Use combinations for the committee; for at least one, count the committees with none and subtract.', scheme: [['$n(S) = \\dbinom{9}{4} = 126$', 1], ['Favourable $= \\dbinom{5}{2}\\dbinom{4}{2} = 60$', 1], ['$P(\\text{two teachers}) = \\dfrac{10}{21}$', 1], ['No student: $\\dbinom{5}{4} = 5$, probability $\\dfrac{5}{126}$', 1], ['$P(\\text{at least one student}) = \\dfrac{121}{126}$', 1]], d: 4, c: 'application', t: [3] }), (C) => {
    C.assert(S.n === 126 && choose(9, 4) === 126 && S.cnt((t) => t.filter((x) => x[0] === 'T').length === 2) === 60 && two.eq(F(10, 21)) && none.eq(F(5, 126)) && atLeast.eq(F(121, 126)) && atLeast.eq(fr(1).sub(none)), '126 committees; 60 with two teachers (10/21); 5 with no student, so 121/126'); C.model(['n(S) = ', 126, '\\dfrac{10}{21}', '\\dfrac{121}{126}']);
  });
}
{
  const nS = 120, art = 70, mus = 55, nei = 20, u = nS - nei, both = art + mus - u, one = u - both, musOnly = mus - both, S = new Space(range(1, 120));
  // model: 1..70 art; the music pupils are 46..100 (55 pupils), so 46..70 take both and 101..120 take neither
  const A = (x) => x <= 70, B = (x) => x >= 46 && x <= 100, o = addOK(S, A, B);
  Q('l05', L5({ stem: r`In an imagined school of $120$ pupils, $70$ take art, $55$ take music and $20$ take neither subject. A pupil is chosen at random. Find the probability that the pupil takes

(a) art or music, [1]

(b) both art and music, [2]

(c) exactly one of the two subjects, [1]

(d) music but not art. [1]`, model: r`(a) $n(\text{art or music}) = 120 - 20 = 100$, so $P = \dfrac{100}{120} = ${ft(F(u, nS))}$.

(b) $n(\text{both}) = 70 + 55 - 100 = 25$, so $P(\text{both}) = \dfrac{25}{120} = ${ft(F(both, nS))}$.

(c) Exactly one: $100 - 25 = 75$ pupils, so $P = \dfrac{75}{120} = ${ft(F(one, nS))}$.

(d) Music but not art: $55 - 25 = 30$ pupils, so $P = \dfrac{30}{120} = ${ft(F(musOnly, nS))}$.`, sol: 'The pupils taking neither give the union; the addition theorem in counting form then gives the overlap.', scheme: [['$P(\\text{art or music}) = \\dfrac{5}{6}$', 1], ['$n(\\text{both}) = 70 + 55 - 100 = 25$', 1], ['$P(\\text{both}) = \\dfrac{5}{24}$', 1], ['$P(\\text{exactly one}) = \\dfrac{5}{8}$', 1], ['$P(\\text{music but not art}) = \\dfrac{1}{4}$', 1]], d: 3, c: 'application', t: [4] }), (C) => {
    C.assert(u === 100 && both === 25 && one === 75 && musOnly === 30 && S.cnt(A) === 70 && S.cnt(B) === 55 && S.cnt((x) => A(x) && B(x)) === 25 && S.cnt((x) => !A(x) && !B(x)) === 20 && o.ok && o.pu.eq(F(5, 6)) && o.pab.eq(F(5, 24)) && o.exactlyOne.eq(F(5, 8)) && S.P((x) => !A(x) && B(x)).eq(F(1, 4)), 'a model with 70 art, 55 music, 25 both and 20 neither: 5/6, 5/24, 5/8, 1/4'); C.model(['\\dfrac{5}{6}', '\\dfrac{5}{24}', '\\dfrac{5}{8}', '\\dfrac{1}{4}']);
  });
}
{
  const S = tiles(1, 50), A = (x) => x % 2 === 0, B = (x) => x % 5 === 0, Cc = (x) => x % 7 === 0, o = addOK(S, A, B), o3 = addOK3(S, A, B, Cc);
  const c = [S.cnt(A), S.cnt(B), S.cnt(Cc), S.cnt((x) => A(x) && B(x)), S.cnt((x) => A(x) && Cc(x)), S.cnt((x) => B(x) && Cc(x)), S.cnt((x) => A(x) && B(x) && Cc(x))];
  Q('l06', L5({ stem: r`A number is chosen at random from $1, 2, \dots, 50$. Let $A$, $B$ and $C$ be the events "a multiple of $2$", "a multiple of $5$" and "a multiple of $7$". Find

(a) $P(A \cup B)$, [2]

(b) $P(A \cup B \cup C)$, using $P(A \cup B \cup C) = \sum P(A) - \sum P(A \cap B) + P(A \cap B \cap C)$. [3]`, model: r`(a) $A \cap B$ is the multiples of $10$: $10, 20, 30, 40, 50$, so $n(A \cap B) = 5$. Then $P(A \cup B) = \dfrac{25}{50} + \dfrac{10}{50} - \dfrac{5}{50} = \dfrac{30}{50} = ${ft(o.pu)}$.

(b) $n(A) = 25$, $n(B) = 10$, $n(C) = 7$. The pair overlaps are the multiples of $10$, $14$ and $35$: $n(A \cap B) = 5$, $n(A \cap C) = 3$ ($14, 28, 42$) and $n(B \cap C) = 1$ ($35$). The multiples of $70$ do not occur up to $50$, so $n(A \cap B \cap C) = 0$.
$P(A \cup B \cup C) = \dfrac{25 + 10 + 7}{50} - \dfrac{5 + 3 + 1}{50} + \dfrac{0}{50} = \dfrac{42 - 9 + 0}{50} = \dfrac{33}{50} = ${ft(o3.lhs)}$.`, sol: 'Find every overlap count first; the multiples of 70 do not occur up to 50, so the triple overlap is empty.', scheme: [['$n(A \\cap B) = 5$', 1], ['$P(A \\cup B) = \\dfrac{3}{5}$', 1], ['The three pair overlaps $5, 3, 1$', 1], ['The triple overlap is $0$', 1], ['$P(A \\cup B \\cup C) = \\dfrac{33}{50}$', 1]], d: 5, c: 'analysis', t: [4] }), (C) => {
    C.assert(c.join() === '25,10,7,5,3,1,0' && o.ok && o.pu.eq(F(3, 5)) && o3.ok && o3.lhs.eq(F(33, 50)) && S.cnt((x) => A(x) || B(x) || Cc(x)) === 33, 'counts 25, 10, 7; pairs 5, 3, 1; triple 0: the union has 33 numbers, 33/50 (also by direct count)'); C.model(['\\dfrac{3}{5}', '\\dfrac{33}{50}', 'n(A \\cap B \\cap C) = 0']);
  });
}
{
  const S = new Space(['H1', 'H2', 'H3', 'H4', 'TH', 'TT'], [F(1, 8), F(1, 8), F(1, 8), F(1, 8), F(1, 4), F(1, 4)]);
  const A = (o) => o[0] === 'H' || o === 'TH', B = (o) => o[0] === 'T', ov = addOK(S, A, B);
  Q('l07', L5({ stem: r`A coin is tossed. If it shows heads, a four-sided die with faces $1$ to $4$ is rolled; if it shows tails, the coin is tossed once more. The outcomes $\mathrm{H1}, \mathrm{H2}, \mathrm{H3}, \mathrm{H4}, \mathrm{TH}, \mathrm{TT}$ are given the probabilities $\dfrac{1}{8}, \dfrac{1}{8}, \dfrac{1}{8}, \dfrac{1}{8}, \dfrac{1}{4}, \dfrac{1}{4}$. Let $A$ be "at least one head appears" and $B$ "at least one tail appears". Find

(a) a check that the assignment is valid, [1]

(b) $P(A)$, [1]

(c) $P(B)$, [1]

(d) $P(A \cap B)$ and $P(A \cup B)$ by the addition theorem. [2]`, model: r`(a) All six values are positive and $4 \times \dfrac{1}{8} + 2 \times \dfrac{1}{4} = \dfrac{1}{2} + \dfrac{1}{2} = 1$, so the assignment is valid.

(b) $A = ${setTex(S.ev(A))}$, so $P(A) = 4 \times \dfrac{1}{8} + \dfrac{1}{4} = ${ft(ov.pa)}$.

(c) $B = ${setTex(S.ev(B))}$, so $P(B) = \dfrac{1}{4} + \dfrac{1}{4} = ${ft(ov.pb)}$.

(d) The only outcome in both is $\mathrm{TH}$, so $P(A \cap B) = ${ft(ov.pab)}$. Then $P(A \cup B) = \dfrac{3}{4} + \dfrac{1}{2} - \dfrac{1}{4} = ${ft(ov.pu)}$, which is correct because every outcome has a head or a tail.`, sol: 'The outcomes are not equally likely, so add the given probabilities of the outcomes in each event.', scheme: [['Positive values with total $1$', 1], ['$P(A) = \\dfrac{3}{4}$', 1], ['$P(B) = \\dfrac{1}{2}$', 1], ['$P(A \\cap B) = \\dfrac{1}{4}$ from $\\mathrm{TH}$', 1], ['$P(A \\cup B) = 1$ by the theorem', 1]], d: 4, c: 'application', t: [1, 3, 4] }), (C) => {
    C.assert(assignVerdict(S.w).ok && ov.pa.eq(F(3, 4)) && ov.pb.eq(F(1, 2)) && ov.pab.eq(F(1, 4)) && ov.pu.eq(1) && ov.ok && S.ev((o) => A(o) && B(o)).join() === 'TH', 'total 1; P(A) = 3/4, P(B) = 1/2, P(A and B) = 1/4 (outcome TH), P(A or B) = 1'); C.model(['\\dfrac{3}{4}', '\\dfrac{1}{2}', '\\dfrac{1}{4}', 'TH']);
  });
}

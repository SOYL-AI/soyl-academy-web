// CBSE 11 Mathematics ch14 Probability: written items (short-2, short-3, long-5) and case-based items.
// Counts come from enumerating the sample space in code; the addition theorem is checked on each instance.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, Fr, fr, range, cart, arr, comb, subsets, dice2, isPrime, ev, uni, inter, diff, comp, exclusive, exhaustive, P, WP, wTotal, laws, setTex, pick, tosses } from './space.mjs';

const S10 = range(1, 10);
const S12 = range(1, 12);
const sx = (E) => setTex(E);

// =============================================================== short answer, 2 marks
{ // s201: coin then second toss or spinner
  const S = [...['H', 'T'].map((x) => `H${x}`), ...[1, 2, 3].map((n) => `T${n}`)];
  Q('s201', mk.short({ marks: 2, stem: r`A coin is tossed once. If it shows heads, it is tossed one more time; if it shows tails, a spinner with sectors numbered $1, 2, 3$ is spun. Write the sample space of this experiment.`, model: r`After heads the second toss gives $\text{HH}$ or $\text{HT}$; after tails the spinner gives $\text{T1}$, $\text{T2}$ or $\text{T3}$.\n\n$S = \{\text{HH}, \text{HT}, \text{T1}, \text{T2}, \text{T3}\}$, so $n(S) = 5$.`, sol: 'Follow each branch of the experiment separately and list its results.', scheme: [['Heads branch gives HH and HT; tails branch gives T1, T2, T3', 1], ['Sample space written as a set, n(S) = 5', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(S.join() === 'HH,HT,T1,T2,T3' && S.length === 5, 'five outcomes'); Cx.model([5]); });
}
{ // s202: twelve cards
  const A = ev(S12, (n) => n % 4 === 0), B = ev(S12, (n) => 12 % n === 0);
  const U = uni(S12, A, B), I = inter(S12, A, B);
  Q('s202', mk.short({ marks: 2, stem: r`Twelve cards numbered $1$ to $12$ are placed in a hat and one is drawn. Let $A$ be "the number is a multiple of $4$" and $B$ "the number is a factor of $12$". Write $A \cup B$ and $A \cap B$ as sets, and say whether $A$ and $B$ are mutually exclusive.`, model: r`$A = \{4, 8, 12\}$ and $B = \{1, 2, 3, 4, 6, 12\}$.\n\n$A \cup B = \{1, 2, 3, 4, 6, 8, 12\}$ and $A \cap B = \{4, 12\}$. The intersection is not empty, so $A$ and $B$ are not mutually exclusive.`, sol: 'List each event first; the union and the intersection then follow by reading the lists.', scheme: [['A and B listed; union {1, 2, 3, 4, 6, 8, 12}', 1], ['Intersection {4, 12}, not empty, so not mutually exclusive', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(sx(A) === String.raw`\{4, 8, 12\}` && sx(B) === String.raw`\{1, 2, 3, 4, 6, 12\}` && sx(U) === String.raw`\{1, 2, 3, 4, 6, 8, 12\}` && sx(I) === String.raw`\{4, 12\}` && !exclusive(S12, A, B), 'sets'); Cx.model([4, 12, 8]); });
}
{ // s203: die, at most 4 and at least 3
  const S6 = range(1, 6);
  const A = ev(S6, (n) => n <= 4), B = ev(S6, (n) => n >= 3);
  Q('s203', mk.short({ marks: 2, stem: r`A die is thrown once. Let $A$ be "the number is at most $4$" and $B$ "the number is at least $3$". Find $A \cap B$ and $A \cup B$, and state whether $A$ and $B$ are mutually exclusive, exhaustive, both or neither.`, model: r`$A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5, 6\}$.\n\n$A \cap B = \{3, 4\} \ne \varnothing$, so they are not mutually exclusive. $A \cup B = \{1, 2, 3, 4, 5, 6\} = S$, so they are exhaustive.`, sol: 'Exclusive needs an empty intersection; exhaustive needs the union to be the whole sample space.', scheme: [['Intersection {3, 4}, so not mutually exclusive', 1], ['Union is S, so exhaustive', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(sx(inter(S6, A, B)) === String.raw`\{3, 4\}` && exhaustive(S6, A, B) && !exclusive(S6, A, B), 'exhaustive, not exclusive'); Cx.model([3, 4]); });
}
{ // s204: P(A or B) given, find overlap and neither
  const pa = fr('0.55'), pb = fr('0.5'), pu = fr('0.9');
  const pi = pa.add(pb).sub(pu), nei = pu.comp();
  Q('s204', mk.short({ marks: 2, stem: r`In a model of an imagined sports-day experiment, $P(A) = 0.55$, $P(B) = 0.5$ and $P(A \cup B) = 0.9$. Find $P(A \cap B)$ and the probability that neither $A$ nor $B$ occurs.`, model: r`$P(A \cap B) = P(A) + P(B) - P(A \cup B) = 0.55 + 0.5 - 0.9 = 0.15$.\n\n$P(\text{neither}) = 1 - P(A \cup B) = 1 - 0.9 = 0.1$.`, sol: 'Rearrange the addition theorem for the overlap; neither is the complement of the union.', scheme: [['P(A and B) = 0.55 + 0.5 - 0.9 = 0.15', 1], ['P(neither) = 1 - 0.9 = 0.1', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(pi.eq('0.15') && nei.eq('0.1') && pi.le(pa) && pi.le(pb), '0.15 and 0.1'); Cx.model([0.15, 0.1]); });
}
{ // s205: unknown x
  const x = fr('0.15');
  const w = { a: fr('0.2'), b: fr('0.35'), c: x, d: x.mul(2) };
  Q('s205', mk.short({ marks: 2, stem: r`A four-outcome experiment has $P(a) = 0.2$, $P(b) = 0.35$, $P(c) = x$ and $P(d) = 2x$. Find $x$ and $P(\{b, d\})$.`, model: r`The probabilities add to $1$: $0.2 + 0.35 + x + 2x = 1$, so $3x = 0.45$ and $x = 0.15$.\n\n$P(d) = 0.3$, so $P(\{b, d\}) = 0.35 + 0.3 = 0.65$.`, sol: 'Use axiom 2 (total one) to find x, then axiom 3 to add the two outcomes.', scheme: [['0.55 + 3x = 1 gives x = 0.15', 1], ['P({b, d}) = 0.35 + 0.3 = 0.65', 1]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(wTotal(w).eq(1) && WP(w, ['b', 'd']).eq('0.65') && w.d.eq('0.3'), 'x = 0.15; 0.65'); Cx.model([0.15, 0.3, 0.65]); });
}
{ // s206: prove the complement rule
  const pa = fr(7, 12);
  Q('s206', mk.short({ marks: 2, stem: r`Using the axioms of probability, show that $P(A') = 1 - P(A)$. Hence find $P(A')$ when $P(A) = \dfrac{7}{12}$.`, model: r`$A$ and $A'$ are mutually exclusive and $A \cup A' = S$. By axiom 3, $P(A) + P(A') = P(S) = 1$, so $P(A') = 1 - P(A)$.\n\nFor $P(A) = \dfrac{7}{12}$: $P(A') = 1 - \dfrac{7}{12} = \dfrac{5}{12}$.`, sol: 'Split S into A and its complement and add their probabilities.', scheme: [['A and A\' exclusive with union S, so P(A) + P(A\') = P(S) = 1', 1], ['P(A\') = 1 - 7/12 = 5/12', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { const A = ev(S10, (n) => n > 7); Cx.assert(exclusive(S10, A, comp(S10, A)) && exhaustive(S10, A, comp(S10, A)) && P(S10, A).add(P(S10, comp(S10, A))).eq(1) && pa.comp().eq(fr(5, 12)), 'complement rule and 5/12'); Cx.model([7, 12, 5]); });
}
{ // s207: exclusive, add
  const pa = fr('0.26'), pb = fr('0.47');
  Q('s207', mk.short({ marks: 2, stem: r`Events $A$ and $B$ of an imagined board-game experiment are mutually exclusive with $P(A) = 0.26$ and $P(B) = 0.47$. Find $P(A \cup B)$ and $P(A' \cap B')$.`, model: r`Mutually exclusive, so $P(A \cup B) = 0.26 + 0.47 = 0.73$.\n\n$A' \cap B' = (A \cup B)'$, so $P(A' \cap B') = 1 - 0.73 = 0.27$.`, sol: 'For exclusive events the overlap term is zero.', scheme: [['P(A or B) = 0.26 + 0.47 = 0.73', 1], ["P(A' and B') = 1 - 0.73 = 0.27", 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(pa.add(pb).eq('0.73') && pa.add(pb).comp().eq('0.27'), '0.73; 0.27'); Cx.model([0.73, 0.27]); });
}
{ // s208: two children
  const S = cart(['B', 'G'], ['B', 'G']).map((x) => x.join(''));
  const one = ev(S, (s) => s.includes('G')), same = ev(S, (s) => s[0] === s[1]);
  Q('s208', mk.short({ marks: 2, stem: r`In an imagined family with two children, the sexes in order of birth are noted (B for boy, G for girl), all four possibilities being equally likely. Write the event "at least one girl" as a set and find its probability.`, model: r`$S = \{\text{BB}, \text{BG}, \text{GB}, \text{GG}\}$, so $n(S) = 4$.\n\nThe event is $\{\text{BG}, \text{GB}, \text{GG}\}$, with $3$ outcomes, so its probability is $\dfrac{3}{4}$.`, sol: 'The complement, two boys, has one outcome, which agrees with the answer.', scheme: [['Sample space of 4 outcomes and the event {BG, GB, GG}', 1], ['Probability 3/4', 1]], d: 2, c: 'application', t: [3, 2], time: 75 }), (Cx) => { Cx.assert(S.length === 4 && one.join() === 'BG,GB,GG' && P(S, one).eq(fr(3, 4)) && same.length === 2, '3/4'); Cx.model([4, 3]); });
}
{ // s209: three events in symbols
  const A = ev(S12, (n) => n % 2 === 0), B = ev(S12, (n) => n % 3 === 0), C = ev(S12, (n) => n > 9);
  const only = inter(S12, inter(S12, A, comp(S12, B)), comp(S12, C));
  const alt = diff(S12, A, uni(S12, B, C));
  const atLeast = uni(S12, uni(S12, A, B), C);
  const noneEv = comp(S12, atLeast);
  const dm = inter(S12, inter(S12, comp(S12, A), comp(S12, B)), comp(S12, C));
  Q('s209', mk.short({ marks: 2, stem: r`$A$, $B$ and $C$ are three events of one experiment. Using set symbols, write (a) "$A$ occurs but neither $B$ nor $C$ occurs" and (b) "none of the three events occurs".`, model: r`(a) $A$ occurs, $B$ does not and $C$ does not: $A \cap B' \cap C'$, which is the same as $A - (B \cup C)$.\n\n(b) None occurs: $A' \cap B' \cap C'$, which equals $(A \cup B \cup C)'$.`, sol: 'Say each condition as a set and join the conditions with intersection.', scheme: [["(a) A ∩ B' ∩ C' (or A − (B ∪ C))", 1], ["(b) A' ∩ B' ∩ C' = (A ∪ B ∪ C)'", 1]], d: 3, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(only.join() === alt.join() && noneEv.join() === dm.join() && only.length > 0 && noneEv.length > 0, "A and B' and C' = A minus (B or C); De Morgan for three events (checked on 1 to 12)"); Cx.model(["B'", "C'", "A'"]); });
}

// =============================================================== short answer, 3 marks
{ // s301: dice, prime pair and sum at least 8
  const A = ev(dice2, (o) => isPrime(o.a) && isPrime(o.b)), B = ev(dice2, (o) => o.a + o.b >= 8);
  const L = laws(dice2, A, B);
  Q('s301', mk.short({ marks: 3, stem: r`Two fair dice are thrown together. Let $A$ be "both numbers are prime" and $B$ "the sum of the numbers is at least $8$". Find $P(A \cup B)$.`, model: r`$n(S) = 36$. The prime numbers on a die are $2, 3, 5$, so $n(A) = 3 \times 3 = 9$. A sum of $8, 9, 10, 11, 12$ occurs in $5 + 4 + 3 + 2 + 1 = 15$ ways, so $n(B) = 15$.\n\nBoth prime and sum at least $8$: $(3, 5), (5, 3), (5, 5)$, so $n(A \cap B) = 3$.\n\n$P(A \cup B) = \dfrac{9 + 15 - 3}{36} = \dfrac{21}{36} = \dfrac{7}{12}$.`, sol: 'Count each event and the overlap, then use the addition theorem.', scheme: [['n(A) = 9 and n(B) = 15', 1], ['n(A and B) = 3 from (3, 5), (5, 3), (5, 5)', 1], ['P(A or B) = (9 + 15 - 3)/36 = 7/12', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(A.length === 9 && B.length === 15 && inter(dice2, A, B).length === 3 && uni(dice2, A, B).length === 21 && L.pu.eq(fr(7, 12)), '9, 15, 3, 21/36 = 7/12'); Cx.model([36, 9, 15, 3, 21, 7, 12]); });
}
{ // s302: at least one six on two dice
  const none = ev(dice2, (o) => o.a !== 6 && o.b !== 6), one = ev(dice2, (o) => o.a === 6 || o.b === 6);
  Q('s302', mk.short({ marks: 3, stem: r`Two fair dice are thrown together. By counting the complement, find the probability that at least one of them shows a $6$, and list the outcomes in which exactly one die shows $6$ as a check.`, model: r`$P(\text{no six}) = \dfrac{5 \times 5}{36} = \dfrac{25}{36}$, because each die has $5$ faces other than $6$.\n\n$P(\text{at least one six}) = 1 - \dfrac{25}{36} = \dfrac{11}{36}$.\n\nCheck: exactly one six gives $(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (1, 6), (2, 6), (3, 6), (4, 6), (5, 6)$, that is $10$ outcomes; adding the outcome $(6, 6)$ gives $11$.`, sol: 'Counting the complement avoids listing every outcome that contains a six.', scheme: [['P(no six) = 25/36', 1], ['P(at least one six) = 1 - 25/36 = 11/36', 1], ['Check: 10 outcomes with exactly one six plus (6, 6) is 11', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { const exactly = ev(dice2, (o) => (o.a === 6) !== (o.b === 6)); Cx.assert(none.length === 25 && one.length === 11 && exactly.length === 10 && P(dice2, one).eq(P(dice2, none).comp()), '25, 11, 10'); Cx.model([25, 36, 11, 10]); });
}
{ // s303: weighted five outcomes, exhaustive pair
  const w = { a: fr('0.12'), b: fr('0.28'), c: fr('0.2'), d: fr('0.25'), e: fr('0.15') };
  const A = ['a', 'c', 'e'], B = ['b', 'c', 'd'];
  const pa = WP(w, A), pb = WP(w, B), pi = WP(w, ['c']), pu = WP(w, ['a', 'b', 'c', 'd', 'e']);
  Q('s303', mk.short({ marks: 3, stem: r`A lopsided spinner has five outcomes with probabilities $P(a) = 0.12$, $P(b) = 0.28$, $P(c) = 0.2$, $P(d) = 0.25$ and $P(e) = 0.15$. For the events $A = \{a, c, e\}$ and $B = \{b, c, d\}$, find $P(A \cup B)$ and say what the answer tells you about $A$ and $B$.`, model: r`$P(A) = 0.12 + 0.2 + 0.15 = 0.47$ and $P(B) = 0.28 + 0.2 + 0.25 = 0.73$. The only common outcome is $c$, so $P(A \cap B) = 0.2$.\n\n$P(A \cup B) = 0.47 + 0.73 - 0.2 = 1$.\n\nThe union has probability $1$ and contains every outcome, so $A$ and $B$ are exhaustive (they are not mutually exclusive).`, sol: 'Add the elementary probabilities inside each event, then apply the addition theorem.', scheme: [['P(A) = 0.47 and P(B) = 0.73', 1], ['P(A and B) = P(c) = 0.2', 1], ['P(A or B) = 1, so A and B are exhaustive', 1]], d: 3, c: 'application', t: [2, 1], time: 150 }), (Cx) => { Cx.assert(wTotal(w).eq(1) && pa.eq('0.47') && pb.eq('0.73') && pi.eq('0.2') && pu.eq(pa.add(pb).sub(pi)) && pu.eq(1), '0.47, 0.73, 0.2, 1'); Cx.model([0.47, 0.73, 0.2, 1]); });
}
{ // s304: validity of three assignments
  const lists = { i: ['0.2', '0.3', '0.4', '0.2'], ii: ['0.5', '0.3', '0.3', '-0.1'], iii: ['0.1', '0.4', '0.2', '0.3'] };
  const tot = (xs) => xs.reduce((s, x) => s.add(x), new Fr(0));
  const neg = (xs) => xs.some((x) => fr(x).n < 0);
  Q('s304', mk.short({ marks: 3, stem: r`Three students propose probabilities for the four outcomes $x, y, z, w$ of a spinner. (i) $0.2, 0.3, 0.4, 0.2$ (ii) $0.5, 0.3, 0.3, -0.1$ (iii) $0.1, 0.4, 0.2, 0.3$. Which proposals are valid probability assignments? Give a reason for each.`, model: r`A valid assignment has no negative entry and total exactly $1$.\n\n(i) $0.2 + 0.3 + 0.4 + 0.2 = 1.1 \ne 1$: not valid.\n\n(ii) $0.5 + 0.3 + 0.3 - 0.1 = 1$, but $-0.1 < 0$ breaks axiom 1: not valid.\n\n(iii) $0.1 + 0.4 + 0.2 + 0.3 = 1$ and every entry is at least $0$: valid.`, sol: 'Test both conditions, non-negative entries and total one, for every list.', scheme: [['Conditions: all entries non-negative, total 1', 1], ['(i) total 1.1 and (ii) negative entry: not valid', 1], ['(iii) total 1, no negative entry: valid', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (Cx) => { Cx.assert(tot(lists.i).eq('1.1') && !neg(lists.i) && tot(lists.ii).eq(1) && neg(lists.ii) && tot(lists.iii).eq(1) && !neg(lists.iii), 'i fails the total; ii has a negative entry; iii is valid'); Cx.model([1.1, 0.1, 1]); });
}
{ // s305: lower bound of P(A and B), checked over every pair of events of the right sizes
  let lo = Infinity, hi = -Infinity;
  const pool = subsets(S10);
  const sevens = pool.filter((e) => e.length === 7), sixes = pool.filter((e) => e.length === 6);
  for (const A of sevens) for (const B of sixes) { const k = inter(S10, A, B).length; lo = Math.min(lo, k); hi = Math.max(hi, k); }
  const bound = fr('0.7').add('0.6').sub(1);
  Q('s305', mk.short({ marks: 3, stem: r`For two events $A$ and $B$ of one experiment, show that $P(A \cap B) \ge P(A) + P(B) - 1$. Hence find the least possible value of $P(A \cap B)$ when $P(A) = 0.7$ and $P(B) = 0.6$.`, model: r`By the addition theorem, $P(A \cap B) = P(A) + P(B) - P(A \cup B)$. Since $P(A \cup B) \le 1$, subtracting it removes at most $1$, so $P(A \cap B) \ge P(A) + P(B) - 1$.\n\nFor $P(A) = 0.7$ and $P(B) = 0.6$: $P(A \cap B) \ge 0.7 + 0.6 - 1 = 0.3$. The least possible value is $0.3$.`, sol: 'Use the largest value P(A or B) can take, which is 1.', scheme: [['P(A and B) = P(A) + P(B) - P(A or B)', 1], ['P(A or B) is at most 1, so the inequality follows', 1], ['0.7 + 0.6 - 1 = 0.3', 1]], d: 4, c: 'analysis', t: [2], time: 150 }), (Cx) => { Cx.assert(bound.eq('0.3') && lo === 3 && hi === 6 && sevens.length === 120 && sixes.length === 210, 'over all 25200 pairs of a 7-event and a 6-event of ten outcomes, the overlap ranges from 3 to 6 (0.3 to 0.6)'); Cx.model([0.3, 0.7, 0.6, 1]); });
}
{ // s306: four tosses, exactly two heads
  const T4 = tosses(4);
  const E = ev(T4, (s) => s.split('').filter((c) => c === 'H').length === 2);
  Q('s306', mk.short({ marks: 3, stem: r`A coin is tossed four times and the faces are written in order. List the outcomes of the event "exactly two heads", and find its probability and the probability of its complement.`, model: r`The sample space has $2^4 = 16$ equally likely outcomes.\n\nExactly two heads: $\text{HHTT}, \text{HTHT}, \text{HTTH}, \text{THHT}, \text{THTH}, \text{TTHH}$, which is $6$ outcomes.\n\n$P(\text{exactly two heads}) = \dfrac{6}{16} = \dfrac{3}{8}$ and the complement has probability $1 - \dfrac{3}{8} = \dfrac{5}{8}$.`, sol: 'Position the two heads among the four places, then divide by the size of S.', scheme: [['n(S) = 16', 1], ['The six outcomes listed', 1], ['P = 6/16 = 3/8 and complement 5/8', 1]], d: 3, c: 'application', t: [3, 2], time: 150 }), (Cx) => { Cx.assert(T4.length === 16 && E.join() === 'HHTT,HTHT,HTTH,THHT,THTH,TTHH' && P(T4, E).eq(fr(3, 8)) && P(T4, E).comp().eq(fr(5, 8)), '6/16 = 3/8 and 5/8'); Cx.model([16, 6, 3, 8, 5]); });
}
{ // s307: ordered digit pairs from 1..5 without repetition
  const S = arr([1, 2, 3, 4, 5], 2);
  const A = ev(S, ([x, y]) => (x + y) % 2 === 0), B = ev(S, ([x, y]) => x < y);
  const L = laws(S, A, B);
  Q('s307', mk.short({ marks: 3, stem: r`Two different digits are chosen from $\{1, 2, 3, 4, 5\}$ one after the other and written as an ordered pair. Let $A$ be "the sum of the digits is even" and $B$ "the first digit is smaller than the second". Find $P(A \cup B)$.`, model: r`$n(S) = 5 \times 4 = 20$.\n\nSum even means both odd or both even: $3 \times 2 + 2 \times 1 = 8$, so $n(A) = 8$. The first smaller than the second happens for half of the ordered pairs, so $n(B) = 10$.\n\nBoth: $(1, 3), (1, 5), (3, 5), (2, 4)$, so $n(A \cap B) = 4$. Then $P(A \cup B) = \dfrac{8 + 10 - 4}{20} = \dfrac{14}{20} = \dfrac{7}{10}$.`, sol: 'Use pairs of equal parity to count A, and the symmetry of ordered pairs to count B.', scheme: [['n(S) = 20, n(A) = 8, n(B) = 10', 1], ['n(A and B) = 4 with the four pairs listed', 1], ['P(A or B) = (8 + 10 - 4)/20 = 7/10', 1]], d: 4, c: 'analysis', t: [2, 3], time: 180 }), (Cx) => { Cx.assert(S.length === 20 && A.length === 8 && B.length === 10 && inter(S, A, B).length === 4 && L.pu.eq(fr(7, 10)), '8, 10, 4, 14/20 = 7/10'); Cx.model([20, 8, 10, 4, 14, 7]); });
}
{ // s308: letters of STATISTICS
  const W = [...'STATISTICS'];
  const A = ev(W.map((c, i) => i), (i) => 'AEIOU'.includes(W[i])), B = ev(W.map((c, i) => i), (i) => W[i] === 'T');
  const idx = W.map((c, i) => i);
  const L = laws(idx, A, B);
  Q('s308', mk.short({ marks: 3, stem: r`Each letter of the word STATISTICS is written on its own card and one of the $10$ cards is drawn at random. Let $A$ be "the card shows a vowel" and $B$ "the card shows T". Show that $A$ and $B$ are mutually exclusive, and find $P(A \cup B)$ and $P(A' \cap B')$.`, model: r`The vowels are $A, I, I$, so $n(A) = 3$; the letter T appears $3$ times, so $n(B) = 3$. No card shows both a vowel and the letter T, so $A \cap B = \varnothing$: the events are mutually exclusive.\n\n$P(A \cup B) = \dfrac{3}{10} + \dfrac{3}{10} = \dfrac{3}{5}$.\n\n$P(A' \cap B') = 1 - \dfrac{3}{5} = \dfrac{2}{5}$.`, sol: 'With no common card, the two probabilities simply add.', scheme: [['n(A) = 3, n(B) = 3 and A and B share no card', 1], ['P(A or B) = 3/10 + 3/10 = 3/5', 1], ["P(A' and B') = 1 - 3/5 = 2/5", 1]], d: 2, c: 'application', t: [1, 2], time: 120 }), (Cx) => { Cx.assert(A.length === 3 && B.length === 3 && exclusive(idx, A, B) && L.pu.eq(fr(3, 5)) && L.nei.eq(fr(2, 5)), '3/5 and 2/5'); Cx.model([10, 3, 5, 2]); });
}

// =============================================================== long answer, 5 marks
{ // l01: dice, multiple of 3 or product odd
  const A = ev(dice2, (o) => (o.a + o.b) % 3 === 0), B = ev(dice2, (o) => o.a % 2 === 1 && o.b % 2 === 1);
  const I = inter(dice2, A, B), L = laws(dice2, A, B);
  Q('l01', mk.long({ stem: r`Two fair dice are thrown together. Let $A$ be "the sum of the numbers is a multiple of $3$" and $B$ "the product of the numbers is odd".\n\n(a) Write down $n(S)$, $n(A)$ and $n(B)$.\n\n(b) List the outcomes of $A \cap B$.\n\n(c) Use the addition theorem to find $P(A \cup B)$ and confirm it by counting $A \cup B$ directly.`, model: r`(a) $n(S) = 36$. A sum of $3, 6, 9, 12$ occurs in $2 + 5 + 4 + 1 = 12$ ways, so $n(A) = 12$. A product is odd only when both numbers are odd, so $n(B) = 3 \times 3 = 9$.\n\n(b) Both odd with a sum that is a multiple of $3$: $(1, 5), (3, 3), (5, 1)$, so $n(A \cap B) = 3$.\n\n(c) $P(A \cup B) = \dfrac{12}{36} + \dfrac{9}{36} - \dfrac{3}{36} = \dfrac{18}{36} = \dfrac{1}{2}$.\n\nDirect count: $12 + 9 - 3 = 18$ outcomes lie in $A$ or $B$, and $\dfrac{18}{36} = \dfrac{1}{2}$ again.`, sol: 'The overlap is the part counted twice, so it is subtracted once.', scheme: [['n(S) = 36, n(A) = 12, n(B) = 9', 1], ['A and B contains (1, 5), (3, 3), (5, 1)', 1], ['Addition theorem with 12/36, 9/36 and 3/36', 1], ['P(A or B) = 18/36 = 1/2', 1], ['Direct count of 18 outcomes agrees', 1]], d: 4, c: 'application', t: [2], time: 300 }), (Cx) => { Cx.assert(A.length === 12 && B.length === 9 && I.length === 3 && I.map((o) => o.k).join() === '(1, 5),(3, 3),(5, 1)' && uni(dice2, A, B).length === 18 && L.pu.eq(fr(1, 2)), '12, 9, 3, 18/36 = 1/2'); Cx.model([36, 12, 9, 3, 18, 2]); });
}
{ // l02: six weighted outcomes
  const k = fr('0.125');
  const w = { w1: fr('0.1'), w2: fr('0.15'), w3: k, w4: k.mul(2), w5: fr('0.2'), w6: k.add('0.05') };
  const A = ['w1', 'w3', 'w4'], B = ['w3', 'w4', 'w5', 'w6'];
  const pa = WP(w, A), pb = WP(w, B), pi = WP(w, ['w3', 'w4']), pu = WP(w, ['w1', 'w3', 'w4', 'w5', 'w6']);
  Q('l02', mk.long({ stem: r`A lopsided spinner has six outcomes $w_1, \ldots, w_6$ with $P(w_1) = 0.1$, $P(w_2) = 0.15$, $P(w_3) = k$, $P(w_4) = 2k$, $P(w_5) = 0.2$ and $P(w_6) = k + 0.05$. Let $A = \{w_1, w_3, w_4\}$ and $B = \{w_3, w_4, w_5, w_6\}$.\n\n(a) Find $k$ and write down all six probabilities.\n\n(b) Find $P(A)$, $P(B)$ and $P(A \cap B)$.\n\n(c) Find $P(A \cup B)$ by the addition theorem, check it by adding outcomes, and find the probability that neither $A$ nor $B$ occurs.`, model: r`(a) The six probabilities add to $1$: $0.1 + 0.15 + k + 2k + 0.2 + k + 0.05 = 1$, so $0.5 + 4k = 1$ and $k = 0.125$. The probabilities are $0.1, 0.15, 0.125, 0.25, 0.2, 0.175$.\n\n(b) $P(A) = 0.1 + 0.125 + 0.25 = 0.475$ and $P(B) = 0.125 + 0.25 + 0.2 + 0.175 = 0.75$. The common outcomes are $w_3, w_4$, so $P(A \cap B) = 0.375$.\n\n(c) $P(A \cup B) = 0.475 + 0.75 - 0.375 = 0.85$. Check: $A \cup B = \{w_1, w_3, w_4, w_5, w_6\}$ and $0.1 + 0.125 + 0.25 + 0.2 + 0.175 = 0.85$.\n\nThe only outcome in neither event is $w_2$, so $P(\text{neither}) = 0.15 = 1 - 0.85$.`, sol: 'Axiom 2 fixes k; every event probability is then a sum of elementary probabilities.', scheme: [['0.5 + 4k = 1 gives k = 0.125 and the six probabilities', 1], ['P(A) = 0.475 and P(B) = 0.75', 1], ['P(A and B) = P(w3) + P(w4) = 0.375', 1], ['P(A or B) = 0.475 + 0.75 - 0.375 = 0.85, checked by adding outcomes', 1], ['P(neither) = P(w2) = 0.15', 1]], d: 4, c: 'application', t: [2], time: 330 }), (Cx) => { Cx.assert(wTotal(w).eq(1) && w.w6.eq('0.175') && pa.eq('0.475') && pb.eq('0.75') && pi.eq('0.375') && pu.eq(pa.add(pb).sub(pi)) && pu.eq('0.85') && WP(w, ['w2']).eq(pu.comp()), 'k = 0.125; 0.475, 0.75, 0.375, 0.85, 0.15'); Cx.model([0.125, 0.175, 0.475, 0.75, 0.375, 0.85, 0.15]); });
}

// ISC 11 Mathematics ch19 Probability - true-false, fill-in-the-blank and numerical items.
import { Q, mk } from './lib.mjs';
import { fr, F, T, dec, choose, cart, subsets, range, Space, assignVerdict, mutuallyExclusive, exhaustive, COIN3, COIN4, TETRA2, tiles } from './prob.mjs';

const r = String.raw;
const heads = (o) => [...o].filter((c) => c === 'H').length;

// ============================================================ true-false
{
  const S = new Space([1, 2, 3, 4]), A = (o) => o === 1, B = (o) => o === 2;
  Q('tf1', mk.tf({ stem: r`If two events of a sample space have no outcome in common, then together they make up the whole sample space.`, key: 'f', sol: r`Having no common outcome means the events are mutually exclusive, which is a different property from being exhaustive. On a four-sided die the events "the score is $1$" and "the score is $2$" share nothing, yet they leave out $3$ and $4$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => {
    C.assert(mutuallyExclusive(S, A, B) && !exhaustive(S, A, B) && S.ev((o) => !A(o) && !B(o)).join() === '3,4', 'the events {1} and {2} are mutually exclusive but leave out 3 and 4'); C.key('f');
  });
}
{
  const v = assignVerdict([F(3, 2), F(-1, 2)]);
  Q('tf2', mk.tf({ stem: r`Any numbers assigned to the outcomes of a finite sample space that add up to $1$ form a valid probability model.`, key: 'f', sol: r`Each assigned number must also be at least $0$ (and so at most $1$). For two outcomes, $\dfrac{3}{2}$ and $-\dfrac{1}{2}$ add up to $1$, yet neither is a probability.`, d: 3, c: 'analysis', t: [3], time: 55 }), (C) => {
    C.assert(v.total.eq(1) && !v.ok && v.why === 'negative', 'the values 3/2 and -1/2 add to 1 but the assignment is invalid'); C.key('f');
  });
}
{
  const S = new Space([1, 2, 3, 4], [F(1, 10), F(2, 10), F(3, 10), F(4, 10)]), masks = range(0, 15), has = (m, o) => ((m >> (o - 1)) & 1) === 1;
  const ok = masks.every((a) => masks.every((b) => S.P((o) => has(a, o) || has(b, o)).le(S.P((o) => has(a, o)).add(S.P((o) => has(b, o))))));
  Q('tf3', mk.tf({ stem: r`For any two events $A$ and $B$ of one experiment, $P(A \cup B) \le P(A) + P(B)$.`, key: 't', sol: r`By the addition theorem, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$, and $P(A \cap B) \ge 0$. So the union never exceeds the sum, with equality exactly when $P(A \cap B) = 0$.`, d: 3, c: 'analysis', t: [4], time: 55 }), (C) => {
    C.assert(ok, 'for all 16 x 16 pairs of events of a four-outcome space (probabilities 0.1 to 0.4), P(A or B) <= P(A) + P(B)'); C.key('t');
  });
}
Q('tf4', mk.tf({ stem: r`For two rolls of a four-sided die, the sums $2, 3, \dots, 8$ form a sample space of seven equally likely outcomes, so the probability of the sum $5$ is $\dfrac{1}{7}$.`, key: 'f', sol: r`The seven sums are not equally likely. The sum $5$ comes from $4$ of the $16$ equally likely pairs, so its probability is $\dfrac{1}{4}$, while the sum $2$ comes from the single pair $(1, 1)$.`, d: 2, c: 'understanding', t: [1], time: 55 }), (C) => {
  C.assert(TETRA2.cnt(([a, b]) => a + b === 5) === 4 && TETRA2.cnt(([a, b]) => a + b === 2) === 1 && TETRA2.P(([a, b]) => a + b === 5).eq(F(1, 4)), 'sum 5 has 4 of 16 pairs (probability 1/4); sum 2 has 1 pair'); C.key('f');
});
{
  const S = new Space([1, 2, 3, 4], [F(1, 10), F(2, 10), F(3, 10), F(4, 10)]), masks = range(0, 15), has = (m, o) => ((m >> (o - 1)) & 1) === 1;
  const ok = masks.every((a) => masks.every((b) => (S.cnt((o) => has(a, o) && has(b, o)) > 0 ? true : S.P((o) => has(a, o)).add(S.P((o) => has(b, o))).le(1))));
  Q('tf5', mk.tf({ stem: r`If $A$ and $B$ are mutually exclusive events of one experiment, then $P(A) + P(B) \le 1$.`, key: 't', sol: r`For mutually exclusive events $P(A) + P(B) = P(A \cup B)$, and no event has probability above $1$. So the sum is at most $1$; for instance, probabilities $0.7$ and $0.6$ cannot belong to two mutually exclusive events.`, d: 3, c: 'understanding', t: [4], time: 55 }), (C) => {
    C.assert(ok && dec('0.7').add(dec('0.6')).eq(dec('1.3')), 'for all disjoint pairs of events in a four-outcome model P(A) + P(B) <= 1; 0.7 + 0.6 = 1.3 exceeds 1'); C.key('t');
  });
}

// ============================================================ fill-in-the-blank
Q('fb1', mk.fill({ stem: r`A coin is tossed and then a number is drawn from tiles numbered $1$ to $5$. The sample space of this experiment has ____ outcomes.`, acc: [['10']], sol: r`Every face of the coin can go with every tile, so there are $2 \times 5 = 10$ outcomes.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => {
  const S = cart(['H', 'T'], range(1, 5));
  C.assert(S.length === 10 && 2 * 5 === 10, 'the 10 pairs (face, tile) are listed'); C.blank(10);
});
Q('fb2', mk.fill({ stem: r`The complement of the sure event of an experiment is the ____ event.`, acc: [['impossible']], sol: r`The complement of $S$ is $S' = \varnothing$, which contains no outcome: it is the impossible event.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => {
  const S = new Space([1, 2, 3, 4]);
  C.assert(S.cnt((o) => !true) === 0 && S.P((o) => false).eq(0), 'the complement of S has no outcome'); C.blank('impossible');
});
Q('fb3', mk.fill({ stem: r`Two fair four-sided dice are rolled together. The probability that the two scores add up to $5$ is ____ (as a fraction).`, acc: [['1/4', '0.25']], sol: r`Four of the $16$ equally likely pairs, $(1, 4), (2, 3), (3, 2)$ and $(4, 1)$, have sum $5$, so $P = \dfrac{4}{16} = \dfrac{1}{4}$, written $1/4$.`, d: 1, c: 'understanding', t: [3], time: 50 }), (C) => {
  C.assert(TETRA2.ev(([a, b]) => a + b === 5).length === 4, 'four pairs have sum 5'); C.blank(0.25);
});
Q('fb4', mk.fill({ stem: r`For two events of one experiment, $P(A) = 0.37$, $P(B) = 0.52$ and $P(A \cap B) = 0.14$. Then $P(A \cup B) =$ ____.`, acc: [['0.75']], sol: r`$P(A \cup B) = 0.37 + 0.52 - 0.14 = 0.75$.`, d: 2, c: 'understanding', t: [4], time: 45 }), (C) => {
  C.assert(dec('0.37').add(dec('0.52')).sub(dec('0.14')).eq(dec('0.75')), '0.37 + 0.52 - 0.14 = 0.75'); C.blank(0.75);
});
Q('fb5', mk.fill({ stem: r`Events $A$ and $B$ have $P(A) = 0.5$, $P(B) = 0.45$ and $P(A \cup B) = 0.82$. Then $P(A \cap B) =$ ____.`, acc: [['0.13']], sol: r`$P(A \cap B) = P(A) + P(B) - P(A \cup B) = 0.5 + 0.45 - 0.82 = 0.13$.`, d: 2, c: 'understanding', t: [4], time: 50 }), (C) => {
  C.assert(dec('0.5').add(dec('0.45')).sub(dec('0.82')).eq(dec('0.13')), '0.5 + 0.45 - 0.82 = 0.13'); C.blank(0.13);
});

// ============================================================ numerical
Q('n1', mk.num({ stem: r`A coin is tossed four times and the faces are written in order. How many outcomes have exactly two heads?`, value: 6, unit: null, sol: r`The two heads can be placed in $\dbinom{4}{2} = 6$ ways: $\mathrm{HHTT}$, $\mathrm{HTHT}$, $\mathrm{HTTH}$, $\mathrm{THHT}$, $\mathrm{THTH}$ and $\mathrm{TTHH}$.`, scheme: [['Positions of the heads: $\dbinom{4}{2} = 6$', 1]], marks: 1, d: 2, c: 'understanding', t: [1], time: 55 }), (C) => {
  C.assert(COIN4.n === 16 && COIN4.cnt((o) => heads(o) === 2) === 6 && choose(4, 2) === 6, 'listing the 16 outcomes gives 6 with exactly two heads'); C.val(6);
});
{
  const word = [...'ARITHMETIC'], S = new Space(range(0, 9)), p = S.P((i) => word[i] === 'T' || word[i] === 'I');
  Q('n2', mk.num({ stem: r`A letter is chosen at random from the ten letters of the word ARITHMETIC. Find the probability that it is T or I.`, value: 0.4, unit: null, sol: r`The letter T appears twice and the letter I appears twice, and no letter is both, so $P = \dfrac{2 + 2}{10} = 0.4$.`, scheme: [['$n(\\text{T or I}) = 2 + 2 = 4$ out of $10$', 1]], marks: 1, d: 2, c: 'understanding', t: [2, 3], time: 60 }), (C) => {
    C.assert(word.length === 10 && p.eq(dec('0.4')) && word.filter((c) => c === 'T').length === 2 && word.filter((c) => c === 'I').length === 2, 'T twice and I twice among the 10 letters: 4/10'); C.val(0.4);
  });
}
{
  const S = new Space(subsets(range(1, 6), 3)), p = S.P((t) => t.includes(1) && t.includes(2));
  Q('n3', mk.num({ stem: r`Three of six lamps, numbered $1$ to $6$, are switched on at random, every set of three being equally likely. Find the probability that lamps $1$ and $2$ are both on.`, value: 0.2, unit: null, sol: r`There are $\dbinom{6}{3} = 20$ sets of three. For lamps $1$ and $2$ to be on, the third lamp is one of the other $4$: $\dbinom{4}{1} = 4$ sets. So $P = \dfrac{4}{20} = 0.2$.`, scheme: [['$n(S) = 20$ and $4$ favourable sets', 1]], marks: 1, d: 3, c: 'application', t: [3], time: 80 }), (C) => {
    C.assert(S.n === 20 && S.cnt((t) => t.includes(1) && t.includes(2)) === 4 && p.eq(dec('0.2')) && choose(4, 1) === 4, '4 of the 20 selections contain lamps 1 and 2'); C.val(0.2);
  });
}
{
  const a = dec('0.46'), b = dec('0.39'), u = dec('0.7'), both = a.add(b).sub(u), one = u.sub(both);
  Q('n4', mk.num({ stem: r`For two events of one experiment, $P(A) = 0.46$, $P(B) = 0.39$ and $P(A \cup B) = 0.7$. Find the probability that exactly one of $A$ and $B$ occurs.`, value: 0.55, unit: null, sol: r`$P(A \cap B) = 0.46 + 0.39 - 0.7 = 0.15$. Exactly one occurs when the union occurs but not both: $0.7 - 0.15 = 0.55$.`, scheme: [['$P(A \\cap B) = 0.15$ and exactly one $= P(A \\cup B) - P(A \\cap B) = 0.55$', 1]], marks: 1, d: 3, c: 'application', t: [4], time: 80 }), (C) => {
    C.assert(both.eq(dec('0.15')) && one.eq(dec('0.55')) && a.add(b).sub(both.mul(2)).eq(one), 'both 0.15; exactly one 0.55 (also 0.46 + 0.39 - 2 x 0.15)'); C.val(0.55);
  });
}
{
  const nS = 80, v = 36, fu = 29, both = 12, nei = fr(nS - (v + fu - both), nS);
  Q('n5', mk.num({ stem: r`In a survey of $80$ shoppers at an imagined market, $36$ bought vegetables, $29$ bought fruit and $12$ bought both. One shopper is chosen at random. Find the probability that the shopper bought neither.`, value: 0.3375, unit: null, sol: r`$n(\text{vegetables or fruit}) = 36 + 29 - 12 = 53$, so $P(\text{neither}) = 1 - \dfrac{53}{80} = \dfrac{27}{80} = 0.3375$.`, scheme: [['$53$ bought at least one, so $27$ bought neither', 1]], marks: 1, d: 3, c: 'application', t: [4], time: 90 }), (C) => {
    C.assert(v + fu - both === 53 && nS - 53 === 27 && nei.eq(F(27, 80)) && nei.eq(dec('0.3375')), '53 bought at least one; 27 of 80 bought neither: 0.3375'); C.val(0.3375);
  });
}
{
  const S = COIN3, p = S.P((o) => heads(o) === 2 || o === 'TTT');
  Q('n6', mk.num({ stem: r`A fair coin is tossed three times. Find the probability of the event "exactly two heads, or all three tails".`, value: 0.5, unit: null, sol: r`The two events cannot occur together, so $P = \dfrac{3}{8} + \dfrac{1}{8} = \dfrac{4}{8} = 0.5$.`, scheme: [['$\\dfrac{3}{8} + \\dfrac{1}{8} = 0.5$', 1]], marks: 1, d: 2, c: 'understanding', t: [3, 4], time: 60 }), (C) => {
    C.assert(p.eq(dec('0.5')) && S.cnt((o) => heads(o) === 2) === 3 && S.cnt((o) => o === 'TTT') === 1 && mutuallyExclusive(S, (o) => heads(o) === 2, (o) => o === 'TTT'), 'exactly two heads (3 outcomes) and TTT (1 outcome) are exclusive: 4/8'); C.val(0.5);
  });
}

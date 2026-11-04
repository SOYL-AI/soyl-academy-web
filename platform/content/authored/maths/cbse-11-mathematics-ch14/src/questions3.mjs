// CBSE 11 Mathematics ch14 Probability: long answers l03 to l07 and the four case-based items.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, Fr, fr, range, cart, arr, comb, dice2, ev, uni, inter, diff, comp, exclusive, exhaustive, P, WP, wTotal, laws, setTex, pick } from './space.mjs';

const sx = (E) => setTex(E);

// =============================================================== long answer (continued)
{ // l03: pairs from five labelled members
  const S = comb(['A', 'B', 'C', 'D', 'E'], 2);
  const X = ev(S, (p) => p.includes('B')), Y = ev(S, (p) => !p.includes('A') && !p.includes('E'));
  const I = inter(S, X, Y), Lw = laws(S, X, Y);
  const nm = (E) => E.map((p) => p.join('')).join(',');
  Q('l03', mk.long({ stem: r`Five members of an imagined chess club, labelled $A, B, C, D, E$, are available for a demonstration game. Two of them are chosen together, every pair being equally likely. Let $X$ be "member $B$ is chosen" and $Y$ be "neither $A$ nor $E$ is chosen".\n\n(a) List the sample space and state $n(S)$.\n\n(b) List the events $X$, $Y$ and $X \cap Y$.\n\n(c) Find $P(X \cup Y)$ and $P(X' \cap Y')$, and say whether $X$ and $Y$ are mutually exclusive.`, model: r`(a) $S = \{AB, AC, AD, AE, BC, BD, BE, CD, CE, DE\}$ and $n(S) = 10$.\n\n(b) $X = \{AB, BC, BD, BE\}$ with $n(X) = 4$. For $Y$ the pair must come from $\{B, C, D\}$: $Y = \{BC, BD, CD\}$ with $n(Y) = 3$. Common pairs: $X \cap Y = \{BC, BD\}$, so $n(X \cap Y) = 2$.\n\n(c) $P(X \cup Y) = \dfrac{4 + 3 - 2}{10} = \dfrac{5}{10} = \dfrac{1}{2}$, and $P(X' \cap Y') = 1 - \dfrac{1}{2} = \dfrac{1}{2}$.\n\n$X \cap Y \ne \varnothing$, so $X$ and $Y$ are not mutually exclusive.`, sol: 'Because order does not matter, pairs such as AB and BA are one outcome.', scheme: [['Sample space of 10 pairs', 1], ['X = {AB, BC, BD, BE} and Y = {BC, BD, CD}', 1], ['X and Y = {BC, BD}', 1], ['P(X or Y) = (4 + 3 - 2)/10 = 1/2 and P(neither) = 1/2', 1], ['Not mutually exclusive because the intersection is not empty', 1]], d: 4, c: 'application', t: [3, 1, 2], time: 330 }), (Cx) => { Cx.assert(S.length === 10 && nm(X) === 'AB,BC,BD,BE' && nm(Y) === 'BC,BD,CD' && nm(I) === 'BC,BD' && Lw.pu.eq(fr(1, 2)) && Lw.nei.eq(fr(1, 2)) && !exclusive(S, X, Y), 'sets and 1/2'); Cx.model([10, 4, 3, 2, 5, 2]); });
}
{ // l04: remainder classes mod 3
  const S = range(1, 12);
  const E1 = ev(S, (n) => n % 3 === 0), E2 = ev(S, (n) => n % 3 === 1), E3 = ev(S, (n) => n % 3 === 2), A = ev(S, (n) => n % 2 === 0);
  const pieces = [inter(S, A, E1), inter(S, A, E2), inter(S, A, E3)];
  Q('l04', mk.long({ stem: r`A bag has twelve tickets numbered $1$ to $12$, and one ticket is drawn at random. Let $E_1$, $E_2$, $E_3$ be the events "the number leaves remainder $0$, $1$, $2$ on division by $3$", and let $A$ be "the number is even".\n\n(a) List $E_1$, $E_2$, $E_3$ and show that they are pairwise mutually exclusive and together exhaustive.\n\n(b) Find $P(E_1)$, $P(E_2)$, $P(E_3)$ and their sum.\n\n(c) List $A \cap E_1$, $A \cap E_2$, $A \cap E_3$ and use axiom 3 to find $P(A)$; confirm by counting $A$.`, model: r`(a) $E_1 = \{3, 6, 9, 12\}$, $E_2 = \{1, 4, 7, 10\}$, $E_3 = \{2, 5, 8, 11\}$. No number lies in two of them, so they are pairwise mutually exclusive, and together they contain all $12$ numbers, so $E_1 \cup E_2 \cup E_3 = S$.\n\n(b) Each has $4$ outcomes, so each has probability $\dfrac{4}{12} = \dfrac{1}{3}$, and the sum is $\dfrac{1}{3} + \dfrac{1}{3} + \dfrac{1}{3} = 1$.\n\n(c) $A \cap E_1 = \{6, 12\}$, $A \cap E_2 = \{4, 10\}$, $A \cap E_3 = \{2, 8\}$. These are mutually exclusive and their union is $A$, so $P(A) = \dfrac{2}{12} + \dfrac{2}{12} + \dfrac{2}{12} = \dfrac{6}{12} = \dfrac{1}{2}$. Counting $A = \{2, 4, 6, 8, 10, 12\}$ gives $\dfrac{6}{12}$ as well.`, sol: 'An event can be split along a partition, and the probabilities of the pieces add.', scheme: [['E1, E2, E3 listed with no common number', 1], ['Union contains all 12 numbers, so exhaustive', 1], ['Each probability is 1/3 and the sum is 1', 1], ['A split into {6, 12}, {4, 10}, {2, 8}', 1], ['P(A) = 2/12 + 2/12 + 2/12 = 1/2, confirmed by counting', 1]], d: 4, c: 'analysis', t: [1, 2], time: 330 }), (Cx) => { Cx.assert(sx(E1) === String.raw`\{3, 6, 9, 12\}` && sx(E2) === String.raw`\{1, 4, 7, 10\}` && sx(E3) === String.raw`\{2, 5, 8, 11\}` && exclusive(S, E1, E2) && exclusive(S, E1, E3) && exclusive(S, E2, E3) && uni(S, uni(S, E1, E2), E3).length === 12, 'partition'); Cx.assert(pieces.map((p) => p.join('+')).join() === '6+12,4+10,2+8' && pieces.reduce((s, p) => s + p.length, 0) === A.length && P(S, A).eq(fr(1, 2)), 'A splits into three pieces; P(A) = 1/2'); Cx.model([3, 4, 12, 6, 2, 1]); });
}
{ // l05: 1..20, multiples of 2 and 3
  const S = range(1, 20);
  const A = ev(S, (n) => n % 2 === 0), B = ev(S, (n) => n % 3 === 0);
  const I = inter(S, A, B), U = uni(S, A, B), Lw = laws(S, A, B);
  Q('l05', mk.long({ stem: r`A box holds twenty tokens numbered $1$ to $20$, and one token is drawn at random. Let $A$ be "the number is a multiple of $2$" and $B$ "the number is a multiple of $3$".\n\n(a) Find $n(A)$, $n(B)$ and list $A \cap B$.\n\n(b) Find $P(A \cup B)$ and the probability that the number is a multiple of neither $2$ nor $3$.\n\n(c) Find the probability that the number is a multiple of exactly one of $2$ and $3$.`, model: r`(a) $A$ has $10$ numbers and $B = \{3, 6, 9, 12, 15, 18\}$ has $6$. The common multiples are the multiples of $6$: $A \cap B = \{6, 12, 18\}$, so $n(A \cap B) = 3$.\n\n(b) $P(A \cup B) = \dfrac{10 + 6 - 3}{20} = \dfrac{13}{20}$. The probability of neither is $1 - \dfrac{13}{20} = \dfrac{7}{20}$.\n\n(c) Exactly one means $A \cup B$ without $A \cap B$: $P = \dfrac{13}{20} - \dfrac{3}{20} = \dfrac{10}{20} = \dfrac{1}{2}$. Check: $A$ only has $7$ numbers and $B$ only has $3$, and $\dfrac{7 + 3}{20} = \dfrac{1}{2}$.`, sol: 'Exactly one is the union minus the overlap, or the two one-sided parts added.', scheme: [['n(A) = 10, n(B) = 6', 1], ['A and B = {6, 12, 18}', 1], ['P(A or B) = 13/20', 1], ['P(neither) = 1 - 13/20 = 7/20', 1], ['P(exactly one) = 13/20 - 3/20 = 1/2', 1]], d: 4, c: 'application', t: [2, 1], time: 300 }), (Cx) => { Cx.assert(A.length === 10 && B.length === 6 && sx(I) === String.raw`\{6, 12, 18\}` && Lw.pu.eq(fr(13, 20)) && Lw.nei.eq(fr(7, 20)) && Lw.one.eq(fr(1, 2)) && diff(S, A, B).length === 7 && diff(S, B, A).length === 3, '13/20, 7/20, 1/2'); Cx.model([10, 6, 3, 13, 20, 7, 2]); });
}
{ // l06: loaded die with P(k) = k/21
  const S = range(1, 6);
  const w = Object.fromEntries(S.map((k) => [k, fr(k, 21)]));
  const E = ev(S, (n) => n % 2 === 0), Pr = ev(S, (n) => [2, 3, 5].includes(n));
  const pe = WP(w, E), pp = WP(w, Pr), pi = WP(w, inter(S, E, Pr)), pu = WP(w, uni(S, E, Pr));
  Q('l06', mk.long({ stem: r`A die is loaded so that the probability of showing $k$ is $\dfrac{k}{21}$ for $k = 1, 2, \ldots, 6$.\n\n(a) Show that this is a valid probability assignment.\n\n(b) Let $E$ be "an even number" and $F$ "a prime number". Find $P(E)$, $P(F)$ and $P(E \cap F)$.\n\n(c) Find $P(E \cup F)$ by the addition theorem, verify it by adding outcomes, and find the probability of a number that is neither even nor prime.`, model: r`(a) Every $\dfrac{k}{21}$ is positive, and $\dfrac{1 + 2 + 3 + 4 + 5 + 6}{21} = \dfrac{21}{21} = 1$, so axioms 1 and 2 hold.\n\n(b) $E = \{2, 4, 6\}$: $P(E) = \dfrac{2 + 4 + 6}{21} = \dfrac{12}{21} = \dfrac{4}{7}$. $F = \{2, 3, 5\}$: $P(F) = \dfrac{2 + 3 + 5}{21} = \dfrac{10}{21}$. Only $2$ is both, so $P(E \cap F) = \dfrac{2}{21}$.\n\n(c) $P(E \cup F) = \dfrac{12}{21} + \dfrac{10}{21} - \dfrac{2}{21} = \dfrac{20}{21}$. Check: $E \cup F = \{2, 3, 4, 5, 6\}$ and $\dfrac{2 + 3 + 4 + 5 + 6}{21} = \dfrac{20}{21}$.\n\nThe only number that is neither is $1$, with probability $\dfrac{1}{21} = 1 - \dfrac{20}{21}$.`, sol: 'Weighted outcomes: an event probability is the sum of its outcome probabilities.', scheme: [['Valid: entries positive, total 21/21 = 1', 1], ['P(E) = 12/21 = 4/7 and P(F) = 10/21', 1], ['P(E and F) = P(2) = 2/21', 1], ['P(E or F) = 12/21 + 10/21 - 2/21 = 20/21, verified by adding outcomes', 1], ['P(neither) = P(1) = 1/21', 1]], d: 4, c: 'application', t: [2], time: 330 }), (Cx) => { Cx.assert(wTotal(w).eq(1) && pe.eq(fr(4, 7)) && pp.eq(fr(10, 21)) && pi.eq(fr(2, 21)) && pu.eq(pe.add(pp).sub(pi)) && pu.eq(fr(20, 21)) && WP(w, [1]).eq(pu.comp()), '4/7, 10/21, 2/21, 20/21, 1/21'); Cx.model([21, 12, 10, 2, 20, 1]); });
}
{ // l07: survey of two possessions
  const nB = 120, nS = 90, nBS = 40, N = 200;
  const pB = fr(nB, N), pS = fr(nS, N), pBS = fr(nBS, N);
  const pu = pB.add(pS).sub(pBS), nei = pu.comp(), one = pu.sub(pBS), bOnly = pB.sub(pBS);
  const direct = (nB - nBS) + (nS - nBS) + nBS;
  Q('l07', mk.long({ stem: r`In an imagined survey of $200$ households, $120$ own a bicycle, $90$ own a scooter and $40$ own both. A household is chosen at random. Find the probability that it owns\n\n(a) a bicycle or a scooter,\n\n(b) neither a bicycle nor a scooter,\n\n(c) exactly one of the two, and\n\n(d) a bicycle but not a scooter.`, model: r`Let $B$ be "owns a bicycle" and $S$ be "owns a scooter". $P(B) = \dfrac{120}{200}$, $P(S) = \dfrac{90}{200}$ and $P(B \cap S) = \dfrac{40}{200}$.\n\n(a) $P(B \cup S) = \dfrac{120 + 90 - 40}{200} = \dfrac{170}{200} = \dfrac{17}{20}$.\n\n(b) $P(\text{neither}) = 1 - \dfrac{17}{20} = \dfrac{3}{20}$, which is $30$ households.\n\n(c) $P(\text{exactly one}) = \dfrac{170}{200} - \dfrac{40}{200} = \dfrac{130}{200} = \dfrac{13}{20}$.\n\n(d) $P(B \cap S') = \dfrac{120 - 40}{200} = \dfrac{80}{200} = \dfrac{2}{5}$.`, sol: 'Counts and probabilities are linked by dividing by the 200 households.', scheme: [['P(B) = 120/200, P(S) = 90/200, P(both) = 40/200', 1], ['P(B or S) = 170/200 = 17/20', 1], ['P(neither) = 1 - 17/20 = 3/20', 1], ['P(exactly one) = 170/200 - 40/200 = 13/20', 1], ['P(bicycle but not scooter) = 80/200 = 2/5', 1]], d: 3, c: 'application', t: [2], time: 300 }), (Cx) => { Cx.assert(pu.eq(fr(17, 20)) && nei.eq(fr(3, 20)) && one.eq(fr(13, 20)) && bOnly.eq(fr(2, 5)) && direct === 170 && N - direct === 30, '17/20, 3/20, 13/20, 2/5'); Cx.model([200, 170, 17, 20, 3, 30, 130, 13, 80, 2, 5]); });
}

// =============================================================== case-based
{ // c01: wheel then coin
  const S = cart([1, 2, 3, 4], ['H', 'T']);
  const key = (o) => `${o[0]}${o[1]}`;
  const head = ev(S, (o) => o[1] === 'H');
  const cands = { a: ev(S, (o) => o[1] === 'T'), b: ev(S, (o) => o[0] === 3), c: S, d: ev(S, (o) => o[0] % 2 === 0) };
  const ok = Object.keys(cands).filter((k) => exclusive(S, head, cands[k]));
  const ev1 = ev(S, (o) => o[0] % 2 === 0 && o[1] === 'H');
  const A = ev(S, (o) => o[0] <= 2), B = ev(S, (o) => o[1] === 'T'), u = uni(S, A, B);
  caseQ('c01', {
    passage: r`At an imagined school fair, a stall spins a wheel with four equal sectors numbered $1, 2, 3, 4$ and then tosses a coin. The result is written as a pair such as $(3, \text{H})$. All the pairs are equally likely.`,
    children: [
      child('a', mk.num({ stem: r`Find the number of outcomes in the sample space.`, value: 8, sol: r`Each of the $4$ wheel results combines with $2$ coin results: $n(S) = 4 \times 2 = 8$.`, scheme: [['4 x 2 = 8', 1]], d: 1, c: 'understanding', t: [3], time: 60 })),
      child('b', mk.mcq({ stem: r`Which event is mutually exclusive with the event "the coin shows heads"?`, key: 'a', opts: ['The coin shows tails.', 'The wheel shows $3$.', 'The wheel shows a number from $1$ to $4$.', 'The wheel shows an even number.'], sol: r`Heads and tails cannot happen together, so their intersection is empty. Each other event contains pairs ending in heads, such as $(3, \text{H})$ or $(4, \text{H})$.`, d: 2, c: 'understanding', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) find the probability that the wheel shows an even number and the coin shows heads.`, model: r`The outcomes are $(2, \text{H})$ and $(4, \text{H})$, so the probability is $\dfrac{2}{8} = \dfrac{1}{4}$.`, sol: 'Count the favourable pairs and divide by 8.', scheme: [['Outcomes (2, H) and (4, H)', 1], ['Probability 2/8 = 1/4', 1]], d: 2, c: 'application', t: [2], time: 90 }), [mk.short({ marks: 2, stem: r`**Or** (ii) find the probability that the wheel shows a number at most $2$ or the coin shows tails.`, model: r`Let $A$ be "wheel at most $2$" ($4$ pairs) and $B$ be "tails" ($4$ pairs). They share $(1, \text{T})$ and $(2, \text{T})$, so $P(A \cup B) = \dfrac{4 + 4 - 2}{8} = \dfrac{6}{8} = \dfrac{3}{4}$.`, sol: 'The addition theorem removes the two pairs that were counted twice.', scheme: [['n(A) = 4, n(B) = 4, n(A and B) = 2', 1], ['P(A or B) = 6/8 = 3/4', 1]], d: 3, c: 'application', t: [2], time: 105 })]),
    ],
    model: r`(a) $8$.\n\n(b) Option (a): the coin shows tails.\n\n(c) Either (i) $\dfrac{1}{4}$, or (ii) $\dfrac{3}{4}$.`,
    sol: 'Count the pairs of the wheel and coin, then use set operations on the listed pairs.', d: 2, c: 'application', time: 480,
  }, (Cx) => {
    Cx.assert(S.length === 8 && ok.join() === 'a', 'eight pairs; only tails is exclusive with heads'); Cx.child('a').val(8); Cx.child('b').key('a');
    Cx.assert(ev1.map(key).join() === '2H,4H' && P(S, ev1).eq(fr(1, 4)), '1/4'); Cx.child('c').model([2, 8, 4]);
    const L = laws(S, A, B);
    Cx.assert(A.length === 4 && B.length === 4 && inter(S, A, B).length === 2 && u.length === 6 && L.pu.eq(fr(3, 4)), '3/4'); Cx.child('cii').model([4, 2, 6, 8, 3]);
  });
}
{ // c02: two possessions, given probabilities
  const pa = fr('0.52'), pb = fr('0.38'), pi = fr('0.14');
  const pu = pa.add(pb).sub(pi), nei = pu.comp(), aOnly = pa.sub(pi), one = pu.sub(pi);
  caseQ('c02', {
    passage: r`A hostel warden (imagined) records, for a student chosen at random, the events $A$: "owns a bicycle" and $B$: "owns a laptop". From the records, $P(A) = 0.52$, $P(B) = 0.38$ and $P(A \cap B) = 0.14$.`,
    children: [
      child('a', mk.num({ stem: r`Find $P(A \cup B)$.`, value: 0.76, sol: r`$P(A \cup B) = P(A) + P(B) - P(A \cap B) = 0.52 + 0.38 - 0.14 = 0.76$.`, scheme: [['0.52 + 0.38 - 0.14 = 0.76', 1]], d: 2, c: 'application', t: [2], time: 60 })),
      ((o) => child('b', mk.mcq(o)))({ stem: r`The probability that the student owns neither a bicycle nor a laptop is`, key: 'a', opts: ['$0.24$', '$0.48$', '$0.62$', '$0.10$'], sol: r`The complement of $A \cup B$ is "neither", so the probability is $1 - 0.76 = 0.24$. The value $0.48$ is only $1 - P(A)$, and $0.62$ is only $1 - P(B)$.`, d: 3, c: 'application', t: [2], time: 75 }),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) find the probability that the student owns a bicycle but not a laptop.`, model: r`$P(A \cap B') = P(A) - P(A \cap B) = 0.52 - 0.14 = 0.38$.`, sol: 'Remove the overlap from P(A).', scheme: [['P(A) - P(A and B)', 1], ['0.52 - 0.14 = 0.38', 1]], d: 3, c: 'application', t: [2], time: 90 }), [mk.short({ marks: 2, stem: r`**Or** (ii) find the probability that the student owns exactly one of the two items.`, model: r`$P(\text{exactly one}) = P(A \cup B) - P(A \cap B) = 0.76 - 0.14 = 0.62$.`, sol: 'Take the overlap out of the union.', scheme: [['P(A or B) - P(A and B)', 1], ['0.76 - 0.14 = 0.62', 1]], d: 3, c: 'application', t: [2], time: 90 })]),
    ],
    model: r`(a) $0.76$.\n\n(b) Option (a): $0.24$.\n\n(c) Either (i) $0.38$, or (ii) $0.62$.`,
    sol: 'Every part follows from the addition theorem and the complement rule.', d: 3, c: 'understanding', time: 480,
  }, (Cx) => {
    Cx.assert(pu.eq('0.76') && nei.eq('0.24') && pa.comp().eq('0.48') && pb.comp().eq('0.62') && aOnly.eq('0.38') && one.eq('0.62'), '0.76, 0.24, 0.38, 0.62'); Cx.child('a').val(0.76); Cx.child('b').key('a'); Cx.child('c').model([0.52, 0.14, 0.38]); Cx.child('cii').model([0.76, 0.14, 0.62]);
  });
}
{ // c03: a pair from three girls and two boys
  const team = ['g1', 'g2', 'g3', 'b1', 'b2'];
  const S = comb(team, 2);
  const withG1 = ev(S, (p) => p.includes('g1'));
  const mixed = ev(S, (p) => p.some((x) => x[0] === 'g') && p.some((x) => x[0] === 'b'));
  const atLeastG = ev(S, (p) => p.some((x) => x[0] === 'g'));
  caseQ('c03', {
    passage: r`A quiz team (imagined) has three girls and two boys. Two of the five members are chosen together to answer the final question, every pair being equally likely.`,
    children: [
      child('a', mk.num({ stem: r`Find the number of outcomes in the sample space.`, value: 10, sol: r`Order does not matter, so the outcomes are pairs: $\dfrac{5 \times 4}{2} = 10$.`, scheme: [['5 x 4 / 2 = 10', 1]], d: 2, c: 'understanding', t: [3], time: 60 })),
      ((o) => child('b', mk.mcq(o)))({ stem: r`The probability that one particular girl is among the two chosen is`, key: 'a', opts: [r`$\dfrac{2}{5}$`, r`$\dfrac{1}{5}$`, r`$\dfrac{3}{10}$`, r`$\dfrac{1}{2}$`], sol: r`The pairs containing her are formed by choosing the partner from the other $4$ members, giving $4$ pairs out of $10$, which is $\dfrac{2}{5}$.`, d: 3, c: 'application', t: [3, 2], time: 75 }),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) find the probability that the pair has one girl and one boy.`, model: r`One girl and one boy: $3 \times 2 = 6$ pairs out of $10$, so the probability is $\dfrac{6}{10} = \dfrac{3}{5}$.`, sol: 'Multiply the choices of girl and boy.', scheme: [['6 pairs of one girl and one boy', 1], ['Probability 6/10 = 3/5', 1]], d: 3, c: 'application', t: [2], time: 90 }), [mk.short({ marks: 2, stem: r`**Or** (ii) find the probability that the pair has at least one girl.`, model: r`No girl means both are boys: only $1$ pair out of $10$. So $P(\text{at least one girl}) = 1 - \dfrac{1}{10} = \dfrac{9}{10}$.`, sol: 'Use the complement: the only pair without a girl is the two boys.', scheme: [['P(no girl) = 1/10', 1], ['1 - 1/10 = 9/10', 1]], d: 3, c: 'application', t: [2], time: 90 })]),
    ],
    model: r`(a) $10$.\n\n(b) Option (a): $\dfrac{2}{5}$.\n\n(c) Either (i) $\dfrac{3}{5}$, or (ii) $\dfrac{9}{10}$.`,
    sol: 'List or count the equally likely pairs, then count the favourable ones or use the complement.', d: 3, c: 'application', time: 480,
  }, (Cx) => {
    Cx.assert(S.length === 10 && withG1.length === 4 && P(S, withG1).eq(fr(2, 5)), '10 pairs; 4 contain the girl'); Cx.child('a').val(10); Cx.child('b').key('a');
    Cx.assert(mixed.length === 6 && P(S, mixed).eq(fr(3, 5)), '3/5'); Cx.child('c').model([3, 2, 6, 10, 5]);
    Cx.assert(atLeastG.length === 9 && P(S, atLeastG).eq(fr(9, 10)) && comp(S, atLeastG).length === 1, '9/10'); Cx.child('cii').model([1, 10, 9]);
  });
}
{ // c04: loaded four-sided spinner, P(k) = k/10
  const S = [1, 2, 3, 4];
  const w = Object.fromEntries(S.map((k) => [k, fr(k, 10)]));
  const A = [1, 2], B = [3, 4], C = [2, 3];
  const cls = (X, Y) => `${exclusive(S, X, Y) ? 'E' : 'e'}${exhaustive(S, X, Y) ? 'X' : 'x'}`;
  caseQ('c04', {
    passage: r`An imagined game uses a four-sided spinner whose outcomes $1, 2, 3, 4$ have probabilities $\dfrac{1}{10}, \dfrac{2}{10}, \dfrac{3}{10}, \dfrac{4}{10}$. Let $A = \{1, 2\}$, $B = \{3, 4\}$ and $C = \{2, 3\}$.`,
    children: [
      child('a', mk.num({ stem: r`Find $P(A)$.`, value: 0.3, sol: r`$P(A) = P(1) + P(2) = 0.1 + 0.2 = 0.3$.`, scheme: [['0.1 + 0.2 = 0.3', 1]], d: 1, c: 'understanding', t: [2], time: 60 })),
      ((o) => child('b', mk.mcq(o)))({ stem: r`The events $A$ and $B$ are`, key: 'a', opts: ['mutually exclusive and exhaustive', 'mutually exclusive but not exhaustive', 'exhaustive but not mutually exclusive', 'neither mutually exclusive nor exhaustive'], sol: r`$A \cap B = \varnothing$ and $A \cup B = \{1, 2, 3, 4\} = S$, so every outcome is in exactly one of the two events.`, d: 2, c: 'understanding', t: [1], time: 60 }),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) find $P(A \cup C)$.`, model: r`$A \cup C = \{1, 2, 3\}$, so $P(A \cup C) = 0.1 + 0.2 + 0.3 = 0.6$. (Check: $P(A) + P(C) - P(A \cap C) = 0.3 + 0.5 - 0.2 = 0.6$.)`, sol: 'Add the outcomes in the union, or use the addition theorem.', scheme: [['A or C = {1, 2, 3}', 1], ['Probability 0.6', 1]], d: 3, c: 'application', t: [2], time: 90 }), [mk.short({ marks: 2, stem: r`**Or** (ii) find $P(A \cap C)$ and $P(B \cap C)$, and say which of $A, C$ and $B, C$ is the pair of mutually exclusive events.`, model: r`$A \cap C = \{2\}$ with probability $0.2$, and $B \cap C = \{3\}$ with probability $0.3$. Neither intersection is empty, so neither pair is mutually exclusive.`, sol: 'An exclusive pair would have an empty intersection and probability 0.', scheme: [['P(A and C) = 0.2 and P(B and C) = 0.3', 1], ['Both intersections non-empty, so no pair is mutually exclusive', 1]], d: 4, c: 'analysis', t: [1, 2], time: 105 })]),
    ],
    model: r`(a) $0.3$.\n\n(b) Option (a): mutually exclusive and exhaustive.\n\n(c) Either (i) $0.6$, or (ii) $0.2$ and $0.3$; neither pair is mutually exclusive.`,
    sol: 'Probabilities of events are sums of the outcome probabilities.', d: 3, c: 'application', time: 480,
  }, (Cx) => {
    Cx.assert(wTotal(w).eq(1) && WP(w, A).eq('0.3') && cls(A, B) === 'EX', '0.3; A and B are exclusive and exhaustive'); Cx.child('a').val(0.3); Cx.child('b').key('a');
    const L = laws(S.map(String), A.map(String), C.map(String));
    Cx.assert(WP(w, [1, 2, 3]).eq('0.6') && WP(w, A).add(WP(w, C)).sub(WP(w, [2])).eq('0.6'), '0.6'); Cx.child('c').model([0.6, 0.3, 0.5, 0.2]);
    Cx.assert(WP(w, [2]).eq('0.2') && WP(w, [3]).eq('0.3') && !exclusive(S, A, C) && !exclusive(S, B, C), '0.2 and 0.3'); Cx.child('cii').model([0.2, 0.3]);
    void L;
  });
}

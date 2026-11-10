// ISC 11 Mathematics ch19 Probability - short-answer items (2 and 3 marks).
// Written working is in model_answer_md; the sets and probabilities quoted there are generated from the enumeration below.
import { Q, mk } from './lib.mjs';
import { fr, F, T, dec, mt, setTex, choose, cart, subsets, arrangements, range, Space, addOK, assignVerdict, mutuallyExclusive, exhaustive, COIN3, TETRA2, DIG, tiles, sumF } from './prob.mjs';

const r = String.raw;
const heads = (o) => [...o].filter((c) => c === 'H').length;
const st = (os) => `$${setTex(os)}$`;
const ft = (x) => x.tex();
const S2 = (o) => mk.short({ marks: 2, time: 150, ...o });
const S3 = (o) => mk.short({ marks: 3, time: 240, ...o });

// ============================================================ short answer, 2 marks
{
  const L = [1, 2, 3], pairs = cart(L, L);
  Q('s201', S2({ stem: r`A bag holds three tiles numbered $1$, $2$ and $3$. One tile is drawn, its number is noted and the tile is put back; then a second tile is drawn and its number is noted. Write the sample space as a set of ordered pairs and state its number of elements.`, model: r`Each draw can give $1$, $2$ or $3$, and the order of the draws matters, so
$S = ${setTex(pairs)}$ and $n(S) = 3 \times 3 = 9$.`, sol: 'List the pairs row by row (first number fixed), then count them.', scheme: [['The nine ordered pairs listed', 1], ['$n(S) = 9$', 1]], d: 1, c: 'understanding', t: [1] }), (C) => {
    C.assert(pairs.length === 9 && new Set(pairs.map(String)).size === 9, 'nine different ordered pairs'); C.model(['n(S) = 3 \\times 3 = 9', '(3, 3)']);
  });
}
{
  const S = [...[1, 2, 3, 4].map((k) => `H${k}`), 'TH', 'TT'];
  Q('s202', S2({ stem: r`A coin is tossed. If it shows heads, a four-sided die with faces $1$ to $4$ is rolled; if it shows tails, the coin is tossed once more. Write the sample space of this experiment.`, model: r`Heads is followed by a die score: $\mathrm{H1}, \mathrm{H2}, \mathrm{H3}, \mathrm{H4}$. Tails is followed by a second face: $\mathrm{TH}, \mathrm{TT}$. So
$S = ${setTex(S)}$, with $n(S) = 6$.`, sol: 'Follow each branch of the first toss to its end; the two branches have different second stages.', scheme: [['Heads branch: $\\mathrm{H1}$ to $\\mathrm{H4}$', 1], ['Tails branch: $\\mathrm{TH}$, $\\mathrm{TT}$', 1]], d: 3, c: 'application', t: [1] }), (C) => {
    const built = ['H', 'T'].flatMap((c) => (c === 'H' ? [1, 2, 3, 4].map((k) => `H${k}`) : ['H', 'T'].map((x) => `T${x}`)));
    C.assert(built.join() === S.join() && S.length === 6 && 4 + 2 === 6, 'branch H gives four outcomes and branch T gives two: six in all'); C.model(['n(S) = 6', 'TT']);
  });
}
{
  const S = DIG, A = (x) => x % 2 === 1, B = (x) => (x % 10) > Math.floor(x / 10);
  const i = S.ev((x) => A(x) && B(x)), ii = S.ev((x) => !A(x) && B(x));
  Q('s203', S2({ stem: r`Two-digit numbers are written using two different digits from $1, 2, 3, 4$. Let $A$ be "the number is odd" and $B$ "the units digit is greater than the tens digit". List (i) $A \cap B$ and (ii) $A' \cap B$.`, model: r`$A = ${setTex(S.ev(A))}$ and $B = ${setTex(S.ev(B))}$.
(i) $A \cap B = ${setTex(i)}$.
(ii) $A'$ is the set of even numbers, so $A' \cap B = ${setTex(ii)}$.`, sol: 'List A and B first, then pick the common numbers; A\' is the even numbers.', scheme: [['$A \\cap B$ listed', 1], ['$A\' \\cap B$ listed', 1]], d: 2, c: 'understanding', t: [2] }), (C) => {
    C.assert(i.join() === '13,23' && ii.join() === '12,14,24,34' && S.n === 12, 'A and B: 13 and 23; A-complement and B: 12, 14, 24, 34'); C.model(['\\{13, 23\\}', '\\{12, 14, 24, 34\\}']);
  });
}
{
  const S = COIN3, E = (o) => heads(o) >= 1, Fe = (o) => 3 - heads(o) === 2;
  Q('s204', S2({ stem: r`A coin is tossed three times. Let $E$ be "at least one head" and $F$ "exactly two tails". State, with reasons, whether $E$ and $F$ are (i) mutually exclusive, (ii) exhaustive.`, model: r`$F = ${setTex(S.ev(Fe))}$. Each outcome of $F$ has one head, so it also lies in $E$.
(i) $E \cap F = F \ne \varnothing$, so $E$ and $F$ are not mutually exclusive.
(ii) $E \cup F = E$, which does not contain $\mathrm{TTT}$, so they are not exhaustive.`, sol: 'Test the common outcomes for the first property and the union for the second.', scheme: [['$E \\cap F = F$, not empty: not mutually exclusive', 1], ['$E \\cup F$ misses $\\mathrm{TTT}$: not exhaustive', 1]], d: 3, c: 'analysis', t: [2] }), (C) => {
    C.assert(S.ev(Fe).join() === 'HTT,THT,TTH' && !mutuallyExclusive(S, E, Fe) && !exhaustive(S, E, Fe) && S.ev((o) => !E(o) && !Fe(o)).join() === 'TTT' && S.cnt((o) => E(o) && Fe(o)) === 3, 'F has 3 outcomes all in E; neither event contains TTT'); C.model(['TTT']);
  });
}
{
  const xs = range(1, 100).filter((k) => dec('0.4').add(fr(k, 100).mul(5)).eq(1)), x = fr(xs[0], 100);
  Q('s205', S2({ stem: r`An experiment has three outcomes $a$, $b$ and $c$ with $P(a) = 0.4$, $P(b) = 3x$ and $P(c) = 2x$. Find $x$ and $P(\{b, c\})$.`, model: r`The probabilities add up to $1$: $0.4 + 3x + 2x = 1$, so $5x = 0.6$ and $x = 0.12$. Then $P(b) = 0.36$ and $P(c) = 0.24$, so $P(\{b, c\}) = 0.36 + 0.24 = 0.6$.`, sol: 'Use the total of 1, then add the probabilities of the outcomes of the event.', scheme: [['$0.4 + 5x = 1$, so $x = 0.12$', 1], ['$P(\\{b, c\\}) = 0.6$', 1]], d: 2, c: 'application', t: [3] }), (C) => {
    C.assert(xs.join() === '12' && x.mul(3).add(x.mul(2)).eq(dec('0.6')) && assignVerdict([dec('0.4'), x.mul(3), x.mul(2)]).ok, 'x = 0.12 is the only hundredth with total 1; P({b, c}) = 0.6'); C.model([0.12, 0.36, 0.24, 0.6]);
  });
}
{
  const S = new Space(subsets(range(1, 7), 2)), odd = (t) => t.every((x) => x % 2 === 1), p = S.P(odd);
  Q('s206', S2({ stem: r`Seven tiles are numbered $1$ to $7$ and two of them are drawn together at random. Find the probability that both numbers are odd.`, model: r`Order does not matter, so $n(S) = \dbinom{7}{2} = 21$. The odd tiles are $1, 3, 5, 7$, and two of them can be chosen in $\dbinom{4}{2} = 6$ ways. So $P = \dfrac{6}{21} = ${ft(p)}$.`, sol: 'Count both the selections and the favourable selections with combinations.', scheme: [['$n(S) = \\dbinom{7}{2} = 21$', 1], ['$\\dbinom{4}{2} = 6$ and $P = \\dfrac{2}{7}$', 1]], d: 3, c: 'application', t: [3] }), (C) => {
    C.assert(S.n === 21 && S.cnt(odd) === 6 && p.eq(F(2, 7)) && choose(7, 2) === 21 && choose(4, 2) === 6, '6 of the 21 pairs are both odd: 2/7'); C.model(['\\dfrac{2}{7}', 21, 6]);
  });
}
{
  const a = F(3, 8), b = F(1, 2), u = F(5, 8), ab = a.add(b).sub(u), nei = fr(1).sub(u);
  Q('s207', S2({ stem: r`For two events $A$ and $B$ of one experiment, $P(A) = \dfrac{3}{8}$, $P(B) = \dfrac{1}{2}$ and $P(A \cup B) = \dfrac{5}{8}$. Find $P(A \cap B)$ and $P(A' \cap B')$.`, model: r`$P(A \cap B) = P(A) + P(B) - P(A \cup B) = \dfrac{3}{8} + \dfrac{4}{8} - \dfrac{5}{8} = ${ft(ab)}$. Neither occurs when the union does not: $P(A' \cap B') = 1 - \dfrac{5}{8} = ${ft(nei)}$.`, sol: 'Rearrange the addition theorem for the overlap; neither is the complement of the union.', scheme: [['$P(A \\cap B) = \\dfrac{1}{4}$', 1], ['$P(A\' \\cap B\') = \\dfrac{3}{8}$', 1]], d: 3, c: 'application', t: [4] }), (C) => {
    C.assert(ab.eq(F(1, 4)) && nei.eq(F(3, 8)) && F(3, 8).add(F(4, 8)).sub(F(5, 8)).eq(F(1, 4)), 'overlap 1/4; neither 3/8'); C.model(['\\dfrac{1}{4}', '\\dfrac{3}{8}']);
  });
}
{
  const sa = dec('0.4'), su = dec('0.3'), u = dec('0.55'), both = sa.add(su).sub(u), nei = fr(1).sub(u);
  Q('s208', S2({ stem: r`The probability of rain on Saturday is $0.4$, on Sunday it is $0.3$, and the probability of rain on at least one of the two days is $0.55$. Find the probability that it rains (i) on both days, (ii) on neither day.`, model: r`(i) $P(\text{both}) = 0.4 + 0.3 - 0.55 = 0.15$.
(ii) $P(\text{neither}) = 1 - 0.55 = 0.45$.`, sol: 'Rain on at least one day is the union; use the addition theorem for both and the complement for neither.', scheme: [['$P(\\text{both}) = 0.15$', 1], ['$P(\\text{neither}) = 0.45$', 1]], d: 3, c: 'application', t: [4] }), (C) => {
    C.assert(both.eq(dec('0.15')) && nei.eq(dec('0.45')) && both.add(nei).add(sa.sub(both)).add(su.sub(both)).eq(1), 'both 0.15, neither 0.45, and the four regions 0.15, 0.25, 0.15, 0.45 add to 1'); C.model([0.15, 0.45]);
  });
}
Q('s209', S2({ stem: r`For two events $A$ and $B$ of one experiment, describe in words the events (i) $A \cap B'$ and (ii) $A' \cup B'$.`, model: r`(i) $A \cap B'$ is the event that $A$ occurs and $B$ does not occur.
(ii) $A' \cup B'$ is the event that $A$ does not occur or $B$ does not occur (or neither occurs), that is, $A$ and $B$ do not both occur. It is the complement of $A \cap B$.`, sol: 'Translate each symbol: intersection is and, union is or, a dash is not.', scheme: [['$A$ occurs and $B$ does not', 1], ['At least one of $A$, $B$ fails; the complement of $A \\cap B$', 1]], d: 2, c: 'understanding', t: [2] }), (C) => {
  const S = tiles(1, 12), A = (x) => x % 2 === 0, B = (x) => x > 8;
  C.assert(S.ev((x) => !A(x) || !B(x)).join() === S.ev((x) => !(A(x) && B(x))).join() && S.ev((x) => A(x) && !B(x)).length === 4, 'on the tiles 1 to 12 (A even, B more than 8) the set A-complement or B-complement equals the complement of A and B'); C.model(['do not both occur']);
});
{
  const p = TETRA2.P(([a, b]) => Math.abs(a - b) === 3);
  Q('s210', S2({ stem: r`Two fair four-sided dice are rolled together. Find the probability that the two scores differ by exactly $3$.`, model: r`There are $16$ equally likely pairs. The scores differ by $3$ only for $(1, 4)$ and $(4, 1)$, so $P = \dfrac{2}{16} = ${ft(p)}$.`, sol: 'Count the favourable pairs in the 4 by 4 grid.', scheme: [['$n(S) = 16$ and two favourable pairs', 1], ['$P = \\dfrac{1}{8}$', 1]], d: 2, c: 'understanding', t: [3] }), (C) => {
    C.assert(TETRA2.ev(([a, b]) => Math.abs(a - b) === 3).join(';') === '1,4;4,1' && p.eq(F(1, 8)), 'pairs (1, 4) and (4, 1): 2/16 = 1/8'); C.model(['\\dfrac{1}{8}']);
  });
}

// ============================================================ short answer, 3 marks
{
  const S = COIN3, A = (o) => heads(o) >= 2, B = (o) => o[0] === 'T';
  Q('s301', S3({ stem: r`A coin is tossed three times. Let $A$ be "at least two heads" and $B$ "the first toss is a tail". Write $A$ and $B$ as sets, and find $A \cap B$ and the number of outcomes in $A \cup B$.`, model: r`$A = ${setTex(S.ev(A))}$ and $B = ${setTex(S.ev(B))}$.
The only outcome in both is $\mathrm{THH}$, so $A \cap B = \{\mathrm{THH}\}$.
$n(A \cup B) = n(A) + n(B) - n(A \cap B) = 4 + 4 - 1 = 7$.`, sol: 'List the outcomes with the heads count and the first toss, then use the counting form of the union.', scheme: [['$A$ and $B$ listed', 1], ['$A \\cap B = \\{\\mathrm{THH}\\}$', 1], ['$n(A \\cup B) = 4 + 4 - 1 = 7$', 1]], d: 3, c: 'application', t: [2] }), (C) => {
    C.assert(S.cnt(A) === 4 && S.cnt(B) === 4 && S.ev((o) => A(o) && B(o)).join() === 'THH' && S.cnt((o) => A(o) || B(o)) === 7, 'A and B have 4 outcomes each, share THH; the union has 7'); C.model(['n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = 4 + 4 - 1 = 7', 'THH']);
  });
}
{
  const S = tiles(1, 12), A = (x) => x < 5, B = (x) => x >= 4 && x <= 9, Cc = (x) => x >= 9;
  Q('s302', S3({ stem: r`A tile is drawn from tiles numbered $1$ to $12$. Let $A$ be "the number is less than $5$", $B$ "the number is from $4$ to $9$ inclusive" and $C$ "the number is at least $9$". State, with reasons, whether (i) $A$ and $C$ are mutually exclusive, (ii) $A$ and $B$ are mutually exclusive, (iii) $A$, $B$ and $C$ are exhaustive.`, model: r`$A = ${setTex(S.ev(A))}$, $B = ${setTex(S.ev(B))}$, $C = ${setTex(S.ev(Cc))}$.
(i) $A \cap C = \varnothing$, so $A$ and $C$ are mutually exclusive.
(ii) $A \cap B = \{4\}$, which is not empty, so $A$ and $B$ are not mutually exclusive.
(iii) $A \cup B \cup C = \{1, 2, \dots, 12\} = S$, so the three events are exhaustive.`, sol: 'Write each event as a set first; common elements decide the first property and the union decides the second.', scheme: [['$A \\cap C = \\varnothing$: mutually exclusive', 1], ['$A \\cap B = \\{4\\}$: not mutually exclusive', 1], ['$A \\cup B \\cup C = S$: exhaustive', 1]], d: 3, c: 'analysis', t: [2] }), (C) => {
    C.assert(mutuallyExclusive(S, A, Cc) && S.ev((x) => A(x) && B(x)).join() === '4' && exhaustive(S, A, B, Cc) && S.ev((x) => B(x) && Cc(x)).join() === '9', 'A and C share nothing; A and B share 4; the union is all 12 tiles'); C.model(['A \\cap B = \\{4\\}']);
  });
}
{
  const L = [[F(1, 2), F(1, 3), F(1, 12), F(1, 12)], [dec('0.3'), dec('0.4'), dec('0.5'), dec('-0.2')], [dec('0.25'), dec('0.25'), dec('0.25'), dec('0.35')]], v = L.map(assignVerdict);
  Q('s303', S3({ stem: r`Three students propose probabilities for the four outcomes of a spinner, in order: (i) $\dfrac{1}{2}, \dfrac{1}{3}, \dfrac{1}{12}, \dfrac{1}{12}$; (ii) $0.3, 0.4, 0.5, -0.2$; (iii) $0.25, 0.25, 0.25, 0.35$. Which proposals are valid? Give a reason for each.`, model: r`A valid assignment has no negative value and a total of $1$.
(i) $\dfrac{6}{12} + \dfrac{4}{12} + \dfrac{1}{12} + \dfrac{1}{12} = 1$ and all values are positive: valid.
(ii) The total is $0.3 + 0.4 + 0.5 - 0.2 = 1$, but $-0.2$ is negative: not valid.
(iii) The total is $0.25 \times 3 + 0.35 = 1.1$, not $1$: not valid.`, sol: 'Check both rules for each list: no negative value, and a total of 1.', scheme: [['(i) valid: total $1$', 1], ['(ii) not valid: a negative value', 1], ['(iii) not valid: total $1.1$', 1]], d: 3, c: 'understanding', t: [3] }), (C) => {
    C.assert(v.map((x) => x.ok).join() === 'true,false,false' && v[1].total.eq(1) && v[1].why === 'negative' && v[2].total.eq(dec('1.1')), 'only (i) is valid; (ii) sums to 1 but has -0.2; (iii) sums to 1.1'); C.model(['1.1', '-0.2']);
  });
}
{
  const S = new Space(subsets(['W1', 'W2', 'W3', 'M1', 'M2', 'M3', 'M4', 'M5'], 3)), p = S.P((t) => t.every((x) => x[0] === 'M'));
  Q('s304', S3({ stem: r`A panel of three is chosen at random from $3$ women and $5$ men, every panel being equally likely. Find the probability that the panel has only men.`, model: r`The number of panels is $n(S) = \dbinom{8}{3} = 56$. The panels with only men number $\dbinom{5}{3} = 10$. So $P = \dfrac{10}{56} = ${ft(p)}$.`, sol: 'Choose the whole panel from the eight people, and the favourable panels from the five men.', scheme: [['$n(S) = \\dbinom{8}{3} = 56$', 1], ['Favourable $= \\dbinom{5}{3} = 10$', 1], ['$P = \\dfrac{5}{28}$', 1]], d: 3, c: 'application', t: [3] }), (C) => {
    C.assert(S.n === 56 && S.cnt((t) => t.every((x) => x[0] === 'M')) === 10 && p.eq(F(5, 28)) && choose(8, 3) === 56 && choose(5, 3) === 10, '10 of the 56 panels are all men: 5/28'); C.model(['\\dfrac{5}{28}', 56, 10]);
  });
}
{
  const nS = 60, c = 35, k = 28, both = 15, u = c + k - both, o = addOK(new Space(range(1, 60)), (x) => x <= 35, (x) => x > 20 && x <= 48);
  Q('s305', S3({ stem: r`In an imagined hostel of $60$ residents, $35$ follow cricket, $28$ follow kabaddi and $15$ follow both. One resident is chosen at random. Find the probability that the resident follows (i) cricket or kabaddi, (ii) neither of the two, (iii) exactly one of the two.`, model: r`(i) $n(\text{cricket or kabaddi}) = 35 + 28 - 15 = 48$, so $P = \dfrac{48}{60} = ${ft(F(u, 60))}$.
(ii) $P(\text{neither}) = 1 - \dfrac{4}{5} = ${ft(F(nS - u, 60))}$.
(iii) Exactly one: $48 - 15 = 33$, so $P = \dfrac{33}{60} = ${ft(F(u - both, 60))}$.`, sol: 'Count the union with the overlap removed once, then use the complement and the overlap.', scheme: [['(i) $P = \\dfrac{4}{5}$', 1], ['(ii) $P = \\dfrac{1}{5}$', 1], ['(iii) $P = \\dfrac{11}{20}$', 1]], d: 3, c: 'application', t: [4] }), (C) => {
    C.assert(u === 48 && F(u, 60).eq(F(4, 5)) && F(12, 60).eq(F(1, 5)) && F(33, 60).eq(F(11, 20)) && o.ok, 'union 48/60 = 4/5, neither 12/60 = 1/5, exactly one 33/60 = 11/20 (addition theorem cross-checked on a model)'); C.model(['\\dfrac{4}{5}', '\\dfrac{1}{5}', '\\dfrac{11}{20}']);
  });
}
{
  const S = TETRA2, A = ([a, b]) => a + b === 5, B = ([a, b]) => a === b, o = addOK(S, A, B);
  Q('s306', S3({ stem: r`Two fair four-sided dice are rolled together. Let $A$ be "the sum of the scores is $5$" and $B$ "both scores are equal". Show that $A$ and $B$ are mutually exclusive, and find $P(A \cup B)$ and the probability that neither occurs.`, model: r`$A = ${setTex(S.ev(A))}$ and $B = ${setTex(S.ev(B))}$. They have no pair in common, so $A \cap B = \varnothing$ and the events are mutually exclusive. (Equal scores give an even sum, never $5$.)
$P(A \cup B) = P(A) + P(B) = \dfrac{4}{16} + \dfrac{4}{16} = ${ft(o.pu)}$.
$P(\text{neither}) = 1 - ${ft(o.pu)} = ${ft(o.neither)}$.`, sol: 'Show that the two lists share no pair; then the probabilities add.', scheme: [['$A \\cap B = \\varnothing$ with reason', 1], ['$P(A \\cup B) = \\dfrac{1}{2}$', 1], ['$P(\\text{neither}) = \\dfrac{1}{2}$', 1]], d: 3, c: 'application', t: [2, 4] }), (C) => {
    C.assert(mutuallyExclusive(S, A, B) && S.cnt(A) === 4 && S.cnt(B) === 4 && o.ok && o.pu.eq(F(1, 2)) && o.neither.eq(F(1, 2)), 'A and B have 4 pairs each, none shared; union 8/16 = 1/2; neither 1/2'); C.model(['\\dfrac{1}{2}', 'mutually exclusive']);
  });
}
{
  const a = dec('0.5'), b = dec('0.32'), ab = dec('0.2'), u = a.add(b).sub(ab), nei = fr(1).sub(u), aonly = a.sub(ab);
  Q('s307', S3({ stem: r`In a model of one experiment, $P(A) = 0.5$, $P(B) = 0.32$ and $P(A \cap B) = 0.2$. Find (i) $P(A \cup B)$, (ii) $P(A' \cap B')$, (iii) $P(A \cap B')$.`, model: r`(i) $P(A \cup B) = 0.5 + 0.32 - 0.2 = 0.62$.
(ii) $P(A' \cap B') = 1 - P(A \cup B) = 1 - 0.62 = 0.38$.
(iii) $P(A \cap B') = P(A) - P(A \cap B) = 0.5 - 0.2 = 0.3$.`, sol: 'Use the addition theorem, then the complement, then remove the overlap from A.', scheme: [['(i) $0.62$', 1], ['(ii) $0.38$', 1], ['(iii) $0.3$', 1]], d: 3, c: 'application', t: [4] }), (C) => {
    C.assert(u.eq(dec('0.62')) && nei.eq(dec('0.38')) && aonly.eq(dec('0.3')) && u.add(nei).eq(1), 'union 0.62, neither 0.38, A-only 0.3'); C.model([0.62, 0.38, 0.3]);
  });
}
{
  // regions in hundredths: both, A only, B only, neither
  const A = dec('0.65'), B = dec('0.7'), u = dec('0.9'), both = A.add(B).sub(u), notBoth = fr(1).sub(both), bOnly = B.sub(both);
  const sols = range(0, 100).filter((p11) => { const p10 = 65 - p11, p01 = 70 - p11, p00 = 100 - p11 - p10 - p01; return p10 >= 0 && p01 >= 0 && p00 === 10; });
  Q('s308', S3({ stem: r`Events $A$ and $B$ of one experiment have $P(A) = 0.65$, $P(B) = 0.7$ and $P(A \cup B) = 0.9$. Find (i) $P(A \cap B)$, (ii) $P(A' \cup B')$, (iii) $P(A' \cap B)$.`, model: r`(i) $P(A \cap B) = 0.65 + 0.7 - 0.9 = 0.45$.
(ii) $A' \cup B'$ is the complement of $A \cap B$ (not both occur), so $P(A' \cup B') = 1 - 0.45 = 0.55$.
(iii) $A' \cap B$ is $B$ without $A$: $P(A' \cap B) = P(B) - P(A \cap B) = 0.7 - 0.45 = 0.25$.`, sol: 'Find the overlap first; the other two events are a complement and a difference.', scheme: [['(i) $P(A \\cap B) = 0.45$', 1], ['(ii) $P(A\' \\cup B\') = 0.55$', 1], ['(iii) $P(A\' \\cap B) = 0.25$', 1]], d: 4, c: 'analysis', t: [4] }), (C) => {
    C.assert(both.eq(dec('0.45')) && notBoth.eq(dec('0.55')) && bOnly.eq(dec('0.25')) && sols.join() === '45', 'overlap 0.45 (the only hundredth consistent with the union 0.9); not both 0.55; B only 0.25'); C.model([0.45, 0.55, 0.25]);
  });
}
{
  const S = new Space(range(1, 8), [F(1, 8), F(1, 8), F(1, 8), F(1, 8), F(1, 8), F(1, 8), F(1, 8), F(1, 8)]);
  const A = (o) => o <= 4, B = (o) => o % 2 === 0, o = addOK(S, A, B);
  const wts = [F(2, 10), F(1, 10), F(3, 10), F(1, 10), F(1, 10), F(2, 10)], W = new Space(range(1, 6), wts), A2 = (x) => x <= 3, B2 = (x) => x % 2 === 0, o2 = addOK(W, A2, B2);
  Q('s309', S3({ stem: r`Using the axioms of probability, show that for any two events $A$ and $B$ of a sample space, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`, model: r`Split $A \cup B$ into the disjoint events $A$ and $A' \cap B$. By the third axiom, $P(A \cup B) = P(A) + P(A' \cap B)$.
Split $B$ into the disjoint events $A \cap B$ and $A' \cap B$. By the third axiom, $P(B) = P(A \cap B) + P(A' \cap B)$, so $P(A' \cap B) = P(B) - P(A \cap B)$.
Substituting, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`, sol: 'Write the union as a union of two disjoint events and apply additivity twice.', scheme: [['$A \\cup B = A \\cup (A\' \\cap B)$, disjoint, so $P(A \\cup B) = P(A) + P(A\' \\cap B)$', 1], ['$B = (A \\cap B) \\cup (A\' \\cap B)$, disjoint, so $P(A\' \\cap B) = P(B) - P(A \\cap B)$', 1], ['Substitution gives the theorem', 1]], d: 4, c: 'evaluation', t: [4] }), (C) => {
    C.assert(o.ok && o2.ok && o2.pu.eq(o2.pa.add(o2.pb).sub(o2.pab)) && W.P((x) => !A2(x) && B2(x)).eq(o2.pb.sub(o2.pab)), 'the identity and the splitting P(A\' and B) = P(B) - P(A and B) hold on an equally likely and a non-uniform model'); C.model(['third axiom']);
  });
}
{
  const ws = range(1, 5).map((i) => fr(6 - i, 15)), S = new Space(range(1, 5), ws), pO = S.P((o) => o % 2 === 1), p3 = S.P((o) => o >= 3), ks = range(1, 60).filter((d) => range(1, 5).reduce((s, i) => s + (6 - i), 0) === d);
  Q('s310', S3({ stem: r`A spinner stops on the numbers $1$ to $5$ with probabilities proportional to $5, 4, 3, 2, 1$ respectively, that is $P(i) = k(6 - i)$. Find $k$, the probability of an odd number and the probability of a number that is at least $3$.`, model: r`The probabilities add up to $1$: $k(5 + 4 + 3 + 2 + 1) = 15k = 1$, so $k = \dfrac{1}{15}$.
Odd numbers: $P = \dfrac{5 + 3 + 1}{15} = \dfrac{9}{15} = ${ft(pO)}$.
At least $3$: $P = \dfrac{3 + 2 + 1}{15} = \dfrac{6}{15} = ${ft(p3)}$.`, sol: 'The total of 1 fixes the constant; then add the probabilities of the outcomes in each event.', scheme: [['$15k = 1$, so $k = \\dfrac{1}{15}$', 1], ['$P(\\text{odd}) = \\dfrac{3}{5}$', 1], ['$P(\\text{at least } 3) = \\dfrac{2}{5}$', 1]], d: 3, c: 'application', t: [3] }), (C) => {
    C.assert(ks.join() === '15' && S.P(() => true).eq(1) && pO.eq(F(3, 5)) && p3.eq(F(2, 5)), 'k = 1/15; P(odd) = 9/15 = 3/5; P(at least 3) = 6/15 = 2/5'); C.model(['\\dfrac{1}{15}', '\\dfrac{3}{5}', '\\dfrac{2}{5}']);
  });
}
{
  const tl = ['R1', 'R2', 'B1', 'B2'], S = new Space(arrangements(tl, 2)), diff = (p) => p[0][0] !== p[1][0], p = S.P(diff);
  const lab = (q) => `(${q.map((x) => `\\mathrm{${x}}`).join(', ')})`;
  Q('s311', S3({ stem: r`A bag holds two red tiles $R_1, R_2$ and two blue tiles $B_1, B_2$. Two tiles are drawn one after the other without replacement. Write the sample space as ordered pairs, list the pairs of different colours, and find their probability.`, model: r`$S = \{${S.outs.map(lab).join(', ')}\}$, so $n(S) = 4 \times 3 = 12$.
Different colours: $\{${S.ev(diff).map(lab).join(', ')}\}$, which is $8$ pairs.
All $12$ pairs are equally likely, so $P = \dfrac{8}{12} = ${ft(p)}$.`, sol: 'Fix the first tile, then list every second tile that is still in the bag.', scheme: [['The twelve ordered pairs', 1], ['The eight pairs of different colours', 1], ['$P = \\dfrac{2}{3}$', 1]], d: 3, c: 'application', t: [1, 3] }), (C) => {
    C.assert(S.n === 12 && S.cnt(diff) === 8 && p.eq(F(2, 3)) && S.cnt((q) => !diff(q)) === 4, '12 ordered pairs; 8 have different colours: 2/3'); C.model(['n(S) = 4 \\times 3 = 12', '\\dfrac{2}{3}']);
  });
}

// ISC 11 Mathematics ch19 Probability - multiple-choice and assertion-reason items.
// Every key is recomputed by enumerating a sample space with exact rationals; every distractor comes from its own wrong method and is asserted to be wrong.
import { Q, mk } from './lib.mjs';
import { fr, F, T, dec, mt, setTex, choose, cart, subsets, arrangements, range, Space, addOK, assignVerdict, mutuallyExclusive, exhaustive, COIN3, TETRA2, DIG, CARDS, CARDSP, cardOf, tiles } from './prob.mjs';

const r = String.raw;
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const fx = (x) => T(x.tex());
const dx = (x) => T(x.dtex());
const heads = (o) => [...o].filter((c) => c === 'H').length;

// ============================================================ MCQ
M('m01', { stem: r`A four-sided die with faces $1$ to $4$ is rolled twice and the two scores are written in order. The number of outcomes in the sample space is`, opts: ['16', '8', '10', '12'].map(T), sol: r`Each roll has $4$ results, so there are $4 \times 4 = 16$ ordered pairs. The value $8$ adds $4 + 4$ instead of multiplying; $10$ ignores the order of the scores; $12$ forbids equal scores.`, d: 1, c: 'understanding', t: [1], time: 40 }, (C) => {
  const L = [1, 2, 3, 4], pairs = cart(L, L);
  C.assert(TETRA2.n === 16 && pairs.filter(([a, b]) => a <= b).length === 10 && pairs.filter(([a, b]) => a !== b).length === 12 && 4 + 4 === 8, '16 ordered pairs; 10 unordered with repeats, 12 with distinct scores, 8 = 4 + 4'); C.which([16, 8, 10, 12], TETRA2.n);
});
M('m02', { stem: r`A coin is tossed three times and the faces are written in order. The number of outcomes with exactly one tail is`, opts: ['3', '1', '4', '6'].map(T), sol: r`The single tail can be in any of three positions: $\mathrm{THH}$, $\mathrm{HTH}$ and $\mathrm{HHT}$, so there are $3$ outcomes. The value $1$ fixes the position; $4$ counts the possible numbers of tails ($0$ to $3$); $6$ doubles the count for the two faces.`, d: 2, c: 'understanding', t: [1, 2], time: 50 }, (C) => {
  const e = COIN3.ev((o) => 3 - heads(o) === 1);
  C.assert(e.join() === 'HHT,HTH,THH' && new Set([...range(0, 3)]).size === 4 && choose(3, 1) === 3, 'three outcomes with one tail: HHT, HTH, THH'); C.which([3, 1, 4, 6], e.length);
});
M('m03', { stem: r`A reader takes three of six labelled books from a shelf together, every choice of three being equally likely. The number of outcomes in the sample space is`, opts: ['20', '120', '216', '18'].map(T), sol: r`Order does not matter, so the count is $\dbinom{6}{3} = \dfrac{6 \times 5 \times 4}{3 \times 2 \times 1} = 20$. The value $120$ counts ordered selections; $216 = 6^3$ allows a book to be taken again; $18 = 6 \times 3$ is not a count of selections.`, d: 3, c: 'application', t: [1], time: 60 }, (C) => {
  const bs = range(1, 6);
  C.assert(subsets(bs, 3).length === 20 && choose(6, 3) === 20 && arrangements(bs, 3).length === 120 && 6 ** 3 === 216 && 6 * 3 === 18, '20 selections of 3 from 6 (listed); 120 ordered, 216 with return, 18 = 6 x 3'); C.which([20, 120, 216, 18], 20);
});
M('m04', { stem: r`A four-sided die with faces $1$ to $4$ is rolled once. The event "the score is greater than $4$" is`, opts: ['an impossible event', 'a sure event', 'a simple event', 'a compound event'], sol: r`No face shows more than $4$, so the event is the empty set and it is impossible. It is not sure, because the sure event is all of $S$; a simple event has exactly one outcome and a compound event has at least two.`, d: 1, c: 'recall', t: [2], time: 35 }, (C) => {
  const S = new Space([1, 2, 3, 4]);
  C.assert(S.cnt((o) => o > 4) === 0 && S.cnt((o) => o <= 4) === S.n, 'no outcome exceeds 4, so the event is empty'); C.which(['impossible', 'sure', 'simple', 'compound'], S.cnt((o) => o > 4) === 0 ? 'impossible' : 'x');
});
{
  const S = COIN3, pr = [[(o) => heads(o) === 0, (o) => heads(o) === 2], [(o) => heads(o) === 2, (o) => o.includes('T')], [(o) => heads(o) >= 2, (o) => 3 - heads(o) <= 1], [(o) => o[0] === 'H', (o) => o[2] === 'T']];
  M('m05', { stem: r`A coin is tossed three times. Which pair of events is mutually exclusive?`, opts: ['"no head" and "exactly two heads"', '"exactly two heads" and "at least one tail"', '"at least two heads" and "at most one tail"', '"the first toss is a head" and "the last toss is a tail"'], sol: r`"No head" is $\{\mathrm{TTT}\}$ and "exactly two heads" is $\{\mathrm{HHT}, \mathrm{HTH}, \mathrm{THH}\}$, which share nothing. The other pairs overlap: $\mathrm{HHT}$ has exactly two heads and a tail; "at least two heads" and "at most one tail" are the same event; $\mathrm{HHT}$ has a first head and a last tail.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    C.assert(pr.map(([a, b]) => S.ev((o) => a(o) && b(o)).length).join() === '0,3,4,2', 'common outcomes 0, 3, 4 and 2: only the first pair has none'); C.which(pr.map(([a, b]) => (mutuallyExclusive(S, a, b) ? 1 : 0)), 1);
  });
}
{
  const S = DIG, ten = (x) => Math.floor(x / 10);
  const pr = [[(x) => ten(x) <= 2, (x) => ten(x) >= 3], [(x) => x % 2 === 0, (x) => x > 30], [(x) => x < 30, (x) => x > 20], [(x) => x % 3 === 0, (x) => x % 4 === 0]];
  const both = pr.map(([a, b]) => (mutuallyExclusive(S, a, b) && exhaustive(S, a, b) ? 1 : 0));
  M('m06', { stem: r`A two-digit number is formed from two different digits of $1, 2, 3, 4$ and one such number is chosen at random. Which pair of events is both mutually exclusive and exhaustive?`, opts: ['"the tens digit is at most $2$" and "the tens digit is at least $3$"', '"the number is even" and "the number is more than $30$"', '"the number is less than $30$" and "the number is more than $20$"', '"the number is a multiple of $3$" and "the number is a multiple of $4$"'], sol: r`The tens digit is $1, 2, 3$ or $4$, so "at most $2$" and "at least $3$" have no number in common and together cover all $12$ numbers. The pair even and more than $30$ share $32$, $34$ and $42$; less than $30$ and more than $20$ share $21$, $23$ and $24$; and the multiples of $3$ and of $4$ share $12$ and $24$ while missing others.`, d: 3, c: 'application', t: [2], time: 80 }, (C) => {
    C.assert(S.n === 12 && pr.map(([a, b]) => S.cnt((o) => a(o) && b(o))).join() === '0,3,3,2' && S.cnt((o) => !(pr[3][0](o) || pr[3][1](o))) > 0, 'only the tens-digit pair has no common number and misses none; the others share 3, 3 and 2 numbers'); C.which(both, 1);
  });
}
{
  const S = CARDSP, A = (id) => cardOf(id)[1] === 'Red', B = (id) => cardOf(id)[2] === 'star';
  const forms = [(id) => A(id) && !B(id), (id) => !A(id) && B(id), (id) => A(id) || !B(id), (id) => !(A(id) && B(id))];
  const sets = forms.map((f) => S.ev(f).join(' '));
  M('m07', { stem: r`For two events $A$ and $B$ of a sample space $S$, the event "$A$ occurs but $B$ does not occur" is the set`, opts: [r`$A \cap B'$`, r`$A' \cap B$`, r`$A \cup B'$`, r`$(A \cap B)'$`], sol: r`"$A$ but not $B$" means in $A$ and in the complement of $B$: $A \cap B'$. The set $A' \cap B$ is "$B$ but not $A$"; $A \cup B'$ is "$A$, or not $B$"; $(A \cap B)'$ is "not both".`, d: 2, c: 'understanding', t: [2], time: 45 }, (C) => {
    C.assert(new Set(sets).size === 4 && sets[0] === 'c3' && S.n === 12, 'on the 12 cards with A red and B star, A-but-not-B is the single card c3 and the four sets are distinct'); C.which(sets, 'c3');
  });
}
{
  const S = CARDSP, A = (id) => cardOf(id)[1] === 'Red', B = (id) => cardOf(id)[2] === 'star';
  const forms = [(id) => (A(id) && !B(id)) || (!A(id) && B(id)), (id) => A(id) || B(id), (id) => !(A(id) && B(id)), (id) => A(id) && B(id)];
  const sets = forms.map((f) => S.ev(f).join(' ')), target = S.ev((id) => A(id) !== B(id)).join(' ');
  M('m08', { stem: r`In a random experiment, the event "exactly one of the events $A$ and $B$ occurs" is represented by`, opts: [r`$(A \cap B') \cup (A' \cap B)$`, r`$A \cup B$`, r`$(A \cap B)'$`, r`$A \cap B$`], sol: r`Exactly one means $A$ without $B$, or $B$ without $A$: $(A \cap B') \cup (A' \cap B)$. The union $A \cup B$ also includes the outcomes in both; $(A \cap B)'$ is "not both" and includes outcomes in neither; $A \cap B$ is "both".`, d: 3, c: 'understanding', t: [2], time: 60 }, (C) => {
    C.assert(new Set(sets).size === 4 && target === 'c3 c4 c8', 'on the 12 cards (A red, B star) exactly one is {c3, c4, c8}; the other three sets differ from it'); C.which(sets, target);
  });
}
M('m09', { stem: r`A finite sample space has $n$ equally likely outcomes, and an event $E$ contains $r$ of them. Then $P(E)$ is`, opts: [r`$\dfrac{r}{n}$`, r`$\dfrac{n}{r}$`, r`$\dfrac{r}{n - r}$`, r`$\dfrac{n - r}{n}$`], sol: r`Each outcome has probability $\dfrac{1}{n}$ and $E$ has $r$ outcomes, so $P(E) = \dfrac{r}{n}$. The ratio $\dfrac{n}{r}$ can exceed $1$; $\dfrac{r}{n - r}$ compares favourable with unfavourable outcomes; $\dfrac{n - r}{n}$ is $P(E')$.`, d: 1, c: 'recall', t: [3], time: 35 }, (C) => {
  const S = tiles(1, 12), E = (x) => x <= 5, n = 12, rr = 5;
  C.assert(S.P(E).eq(F(5, 12)) && S.P((x) => !E(x)).eq(F(7, 12)), 'for n = 12 and r = 5, P(E) = 5/12 and P(E\') = 7/12'); C.which([rr / n, n / rr, rr / (n - rr), (n - rr) / n], S.P(E).num());
});
{
  const A = [[F(1, 3), F(1, 4), F(1, 6), F(1, 4)], [F(1, 2), F(1, 3), F(1, 4), F(-1, 12)], [F(1, 3), F(1, 3), F(1, 3), F(1, 3)], [F(1, 4), F(1, 4), F(1, 4), F(1, 8)]];
  const v = A.map(assignVerdict), tx = (l) => T(l.map((x) => x.tex()).join(', '));
  M('m10', { stem: r`A spinner has four outcomes. Which of these assignments of probabilities to the outcomes, in order, is valid?`, opts: A.map(tx), sol: r`The list $\dfrac{1}{3}, \dfrac{1}{4}, \dfrac{1}{6}, \dfrac{1}{4}$ has no negative value and $\dfrac{1}{3} + \dfrac{1}{4} + \dfrac{1}{6} + \dfrac{1}{4} = \dfrac{12}{12} = 1$. The list ending in $-\dfrac{1}{12}$ adds to $1$ but contains a negative value; the list of four values $\dfrac{1}{3}$ adds to $\dfrac{4}{3}$; the list $\dfrac{1}{4}, \dfrac{1}{4}, \dfrac{1}{4}, \dfrac{1}{8}$ adds to $\dfrac{7}{8}$.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
    C.assert(v.map((x) => x.why).join() === 'valid,negative,total,total' && v[0].total.eq(1) && v[1].total.eq(1) && v[2].total.eq(F(4, 3)) && v[3].total.eq(F(7, 8)), 'only the first list is valid: the second has a negative value, the third sums to 4/3, the fourth to 7/8'); C.which(v.map((x) => (x.ok ? 1 : 0)), 1);
  });
}
{
  const S = new Space([1, 2, 3, 4], [F(4, 10), F(3, 10), F(2, 10), F(1, 10)]);
  const pe = S.P((o) => o % 2 === 0), po = S.P((o) => o % 2 === 1), p2 = S.P((o) => o === 2);
  M('m11', { stem: r`A four-sided die is loaded so that the score $j$ has probability $\dfrac{5 - j}{10}$ for $j = 1, 2, 3, 4$. The probability of an even score is`, opts: [fx(F(2, 5)), fx(F(1, 2)), fx(F(3, 5)), fx(F(3, 10))], sol: r`$P(2) = \dfrac{3}{10}$ and $P(4) = \dfrac{1}{10}$, so $P(\text{even}) = \dfrac{3}{10} + \dfrac{1}{10} = \dfrac{2}{5}$. The value $\dfrac{1}{2}$ treats the die as fair; $\dfrac{3}{5}$ is the probability of an odd score; $\dfrac{3}{10}$ counts only the score $2$.`, d: 3, c: 'application', t: [3], time: 70 }, (C) => {
    C.assert(S.P(() => true).eq(1) && pe.eq(F(2, 5)) && po.eq(F(3, 5)) && p2.eq(F(3, 10)), 'the weights 4, 3, 2, 1 over 10 add to 1; P(even) = 2/5, P(odd) = 3/5, P(2) = 3/10'); C.which(['2/5', '1/2', '3/5', '3/10'], pe.str());
  });
}
{
  const marb = [...range(1, 4).map((i) => `R${i}`), ...range(1, 5).map((i) => `B${i}`)], S = new Space(subsets(marb, 3));
  const red = (t) => t.filter((x) => x[0] === 'R').length, p = S.P((t) => red(t) === 2), p1 = S.P((t) => red(t) === 2 || red(t) === 3);
  M('m12', { stem: r`A box holds $4$ red and $5$ blue marbles of the same size. Three marbles are taken out together at random. The probability that exactly two of them are red is`, opts: [fx(F(5, 14)), fx(F(1, 14)), fx(F(5, 42)), fx(F(17, 42))], sol: r`There are $\dbinom{9}{3} = 84$ equally likely selections and $\dbinom{4}{2}\dbinom{5}{1} = 30$ have exactly two red, so $P = \dfrac{30}{84} = \dfrac{5}{14}$. The value $\dfrac{1}{14}$ forgets the blue marble; $\dfrac{5}{42}$ is the probability of the order red, red, blue only; $\dfrac{17}{42}$ is the probability of at least two red.`, d: 4, c: 'application', t: [3], time: 100 }, (C) => {
    C.assert(S.n === 84 && S.cnt((t) => red(t) === 2) === 30 && choose(4, 2) * choose(5, 1) === 30 && p.eq(F(5, 14)) && F(6, 84).eq(F(1, 14)) && F(4, 9).mul(F(3, 8)).mul(F(5, 7)).eq(F(5, 42)) && p1.eq(F(17, 42)), 'enumerating the 84 selections: 30 have exactly two red, so 5/14; 1/14 = 6/84, 5/42 = (4/9)(3/8)(5/7), 17/42 = at least two red'); C.which(['5/14', '1/14', '5/42', '17/42'], p.str());
  });
}
M('m13', { stem: r`For an event $E$ of a random experiment, $P(E) = 0.35$. The probability of the event "not $E$" is`, opts: [T('0.65'), T('0.35'), T('1.35'), T('0.15')], sol: r`$P(E') = 1 - P(E) = 1 - 0.35 = 0.65$. The value $0.35$ is $P(E)$ itself; $1.35$ adds instead of subtracting; $0.15$ subtracts from $0.5$ instead of from $1$.`, d: 1, c: 'understanding', t: [4], time: 35 }, (C) => {
  const pe = dec('0.35');
  C.assert(fr(1).sub(pe).eq(dec('0.65')) && fr(1).add(pe).eq(dec('1.35')) && dec('0.5').sub(pe).eq(dec('0.15')), 'P(E\') = 1 - 0.35 = 0.65; 1.35 and 0.15 come from wrong rules'); C.which([0.65, 0.35, 1.35, 0.15], 0.65);
});
{
  const a = F(2, 5), b = F(1, 3), ab = F(1, 10), u = a.add(b).sub(ab);
  M('m14', { stem: r`For two events $A$ and $B$ of one experiment, $P(A) = \dfrac{2}{5}$, $P(B) = \dfrac{1}{3}$ and $P(A \cap B) = \dfrac{1}{10}$. Then $P(A \cup B)$ is`, opts: [fx(F(19, 30)), fx(F(11, 15)), fx(F(5, 6)), fx(F(8, 15))], sol: r`$P(A \cup B) = \dfrac{2}{5} + \dfrac{1}{3} - \dfrac{1}{10} = \dfrac{12}{30} + \dfrac{10}{30} - \dfrac{3}{30} = \dfrac{19}{30}$. The value $\dfrac{11}{15}$ omits the overlap; $\dfrac{5}{6}$ adds the overlap; $\dfrac{8}{15}$ subtracts it twice.`, d: 2, c: 'understanding', t: [4], time: 70 }, (C) => {
    C.assert(u.eq(F(19, 30)) && a.add(b).eq(F(11, 15)) && a.add(b).add(ab).eq(F(5, 6)) && a.add(b).sub(ab.mul(2)).eq(F(8, 15)), 'P(A or B) = 19/30; 11/15 omits the overlap, 5/6 adds it, 8/15 subtracts it twice'); C.which(['19/30', '11/15', '5/6', '8/15'], u.str());
  });
}
{
  const a = dec('0.55'), b = dec('0.4'), ab = dec('0.15'), one = a.add(b).sub(ab.mul(2)), u = a.add(b).sub(ab);
  M('m15', { stem: r`In a model of an experiment, $P(A) = 0.55$, $P(B) = 0.4$ and $P(A \cap B) = 0.15$. The probability that exactly one of $A$ and $B$ occurs is`, opts: [T('0.65'), T('0.8'), T('0.15'), T('0.2')], sol: r`Exactly one occurs when we take the two probabilities and remove the overlap from each: $0.55 + 0.4 - 2(0.15) = 0.65$. The value $0.8$ is $P(A \cup B)$, which also contains both; $0.15$ is the probability of both; $0.2$ is the probability of neither.`, d: 3, c: 'application', t: [4], time: 80 }, (C) => {
    C.assert(one.eq(dec('0.65')) && u.eq(dec('0.8')) && fr(1).sub(u).eq(dec('0.2')) && a.sub(ab).add(b.sub(ab)).eq(one), 'exactly one = 0.65 (also (0.55 - 0.15) + (0.4 - 0.15)); union 0.8, both 0.15, neither 0.2'); C.which([0.65, 0.8, 0.15, 0.2], 0.65);
  });
}
{
  const a = dec('0.5'), b = dec('0.4'), nei = dec('0.2'), u = fr(1).sub(nei), both = a.add(b).sub(u);
  M('m16', { stem: r`For events $A$ and $B$ of an experiment, $P(A) = 0.5$, $P(B) = 0.4$ and the probability that neither occurs is $0.2$. The probability that both occur is`, opts: [T('0.1'), T('0.7'), T('0.9'), T('0.3')], sol: r`$P(A \cup B) = 1 - 0.2 = 0.8$, so $P(A \cap B) = 0.5 + 0.4 - 0.8 = 0.1$. The value $0.7$ treats $0.2$ as the union; $0.9$ is $P(A) + P(B)$; $0.3$ is $P(A \cup B) - P(A)$, the probability of $B$ only.`, d: 3, c: 'application', t: [4], time: 75 }, (C) => {
    C.assert(u.eq(dec('0.8')) && both.eq(dec('0.1')) && a.add(b).sub(nei).eq(dec('0.7')) && a.add(b).eq(dec('0.9')) && u.sub(a).eq(dec('0.3')), 'union 0.8, both 0.1; 0.7, 0.9 and 0.3 come from wrong steps'); C.which([0.1, 0.7, 0.9, 0.3], 0.1);
  });
}
{
  const S = CARDSP, A = (id) => cardOf(id)[1] === 'Red', B = (id) => cardOf(id)[2] === 'star';
  const pa = S.P(A), pb = S.P(B), pab = S.P((id) => A(id) && B(id));
  const forms = [pa.sub(pab), pa.sub(pb), pa.add(pb).sub(pab), fr(1).sub(S.P((id) => A(id) || B(id)))];
  M('m17', { stem: r`For any two events $A$ and $B$ of one experiment, $P(A \cap B')$ equals`, opts: [r`$P(A) - P(A \cap B)$`, r`$P(A) - P(B)$`, r`$P(A) + P(B) - P(A \cap B)$`, r`$1 - P(A \cup B)$`], sol: r`The event $A$ splits into the outcomes in $B$ and those not in $B$, so $P(A) = P(A \cap B) + P(A \cap B')$ and $P(A \cap B') = P(A) - P(A \cap B)$. The difference $P(A) - P(B)$ can be negative; $P(A) + P(B) - P(A \cap B)$ is $P(A \cup B)$; $1 - P(A \cup B)$ is $P(A' \cap B')$.`, d: 3, c: 'analysis', t: [4], time: 75 }, (C) => {
    C.assert(new Set(forms.map(String)).size === 4 && forms[0].eq(S.P((id) => A(id) && !B(id))) && forms[0].eq(F(1, 12)), 'on the 12 cards (A red, B star) P(A and not B) = 1/12 = P(A) - P(A and B); the other three expressions give different values'); C.which(forms.map(String), S.P((id) => A(id) && !B(id)).str());
  });
}
{
  const pa1 = dec('0.3'), pb1 = dec('0.45'), pa = fr(1).sub(pa1), pb = fr(1).sub(pb1), u = dec('0.85'), both = pa.add(pb).sub(u);
  M('m18', { stem: r`Events $A$ and $B$ satisfy $P(A') = 0.3$, $P(B') = 0.45$ and $P(A \cup B) = 0.85$. Then $P(A \cap B)$ is`, opts: [T('0.4'), T('0.75'), T('0.15'), T('0.3')], sol: r`$P(A) = 0.7$ and $P(B) = 0.55$, so $P(A \cap B) = P(A) + P(B) - P(A \cup B) = 0.7 + 0.55 - 0.85 = 0.4$. The value $0.75$ adds the two complements; $0.15$ is $1 - P(A \cup B)$, the probability of neither; $0.3$ is $P(A')$ read as the answer.`, d: 4, c: 'application', t: [4], time: 90 }, (C) => {
    C.assert(pa.eq(dec('0.7')) && pb.eq(dec('0.55')) && both.eq(dec('0.4')) && pa1.add(pb1).eq(dec('0.75')) && fr(1).sub(u).eq(dec('0.15')) && fr(1).sub(u).add(both).eq(dec('0.55')), 'P(A) = 0.7, P(B) = 0.55, so P(A and B) = 1.25 - 0.85 = 0.4; 0.75, 0.15 and 0.3 come from wrong readings'); C.which([0.4, 0.75, 0.15, 0.3], 0.4);
  });
}
{
  const a = F(1, 4), b = F(2, 5), u = a.add(b), nei = fr(1).sub(u);
  M('m19', { stem: r`Two mutually exclusive events $A$ and $B$ of one experiment have $P(A) = \dfrac{1}{4}$ and $P(B) = \dfrac{2}{5}$. The probability that neither of them takes place is`, opts: [fx(F(7, 20)), fx(F(13, 20)), fx(F(3, 5)), fx(F(3, 4))], sol: r`Because they cannot occur together, $P(A \cup B) = \dfrac{1}{4} + \dfrac{2}{5} = \dfrac{13}{20}$, so $P(\text{neither}) = 1 - \dfrac{13}{20} = \dfrac{7}{20}$. The value $\dfrac{13}{20}$ is the union; $\dfrac{3}{5}$ is $P(B')$; $\dfrac{3}{4}$ is $P(A')$.`, d: 3, c: 'application', t: [4], time: 70 }, (C) => {
    C.assert(u.eq(F(13, 20)) && nei.eq(F(7, 20)) && fr(1).sub(b).eq(F(3, 5)) && fr(1).sub(a).eq(F(3, 4)) && a.add(b).lt(1), 'union 13/20, neither 7/20; 13/20, 3/5 and 3/4 are the union, P(B\') and P(A\')'); C.which(['7/20', '13/20', '3/5', '3/4'], nei.str());
  });
}
{
  // least possible P(A and B) when P(A) = 0.7 and P(B) = 0.6: search over joint models in steps of 1/100
  const feasible = range(0, 100).filter((p11) => { const p10 = 70 - p11, p01 = 60 - p11, p00 = 100 - (p11 + p10 + p01); return p10 >= 0 && p01 >= 0 && p00 >= 0; });
  M('m20', { stem: r`Two events $A$ and $B$ of one experiment have $P(A) = 0.7$ and $P(B) = 0.6$. The least possible value of $P(A \cap B)$ is`, opts: [T('0.3'), T('0'), T('0.1'), T('0.6')], sol: r`Since $P(A \cup B) \le 1$, $P(A \cap B) = 0.7 + 0.6 - P(A \cup B) \ge 1.3 - 1 = 0.3$, and the value $0.3$ is reached when $A \cup B = S$. The value $0$ would need $A$ and $B$ to be mutually exclusive, impossible as $0.7 + 0.6 > 1$; $0.1$ is $P(A) - P(B)$; $0.6$ is the greatest possible value.`, d: 4, c: 'analysis', t: [4], time: 90 }, (C) => {
    C.assert(Math.min(...feasible) === 30 && Math.max(...feasible) === 60 && 70 - 60 === 10, 'over all joint models in steps of 0.01 the overlap ranges from 0.30 to 0.60; 0.1 = 0.7 - 0.6'); C.which([0.3, 0, 0.1, 0.6], Math.min(...feasible) / 100);
  });
}

// ============================================================ assertion-reason
{
  const S = COIN3, A = (o) => heads(o) >= 2, B = (o) => heads(o) <= 1;
  Q('ar1', mk.ar({ a: r`When a coin is tossed three times, the events "at least two heads" and "at most one head" are mutually exclusive and exhaustive.`, r: r`The two events are complements of each other: every outcome of the three tosses lies in exactly one of them.`, key: 'a', sol: r`"At least two heads" is $\{\mathrm{HHH}, \mathrm{HHT}, \mathrm{HTH}, \mathrm{THH}\}$ and "at most one head" is the other four outcomes. They share nothing and together make all $8$ outcomes, so A is true. R states exactly this, so R explains A.`, d: 3, c: 'analysis', t: [2] }), (C) => {
    C.assert(mutuallyExclusive(S, A, B) && exhaustive(S, A, B) && S.cnt(A) === 4 && S.cnt(B) === 4 && S.P((o) => !A(o)).eq(S.P(B)), 'the two events have 4 + 4 = 8 outcomes, none shared: complements'); C.key('a');
  });
}
{
  const ws = [F(1, 6), F(1, 6), F(1, 3), F(1, 6), F(1, 12), F(1, 12)], v = assignVerdict(ws), ws2 = [F(1, 6), F(1, 6), F(1, 3), F(1, 6), F(1, 12), F(1, 6)];
  Q('ar2', mk.ar({ a: r`The numbers $\dfrac{1}{6}, \dfrac{1}{6}, \dfrac{1}{3}, \dfrac{1}{6}, \dfrac{1}{12}, \dfrac{1}{12}$ can be assigned as probabilities to the six outcomes of an experiment.`, r: r`The probability of every outcome lies between $0$ and $1$.`, key: 'b', sol: r`Every number is at least $0$ and $\dfrac{2}{12} + \dfrac{2}{12} + \dfrac{4}{12} + \dfrac{2}{12} + \dfrac{1}{12} + \dfrac{1}{12} = 1$, so A is true. R is also true, but it is not enough: changing the last number to $\dfrac{1}{6}$ keeps every value between $0$ and $1$ and breaks the total. The total of $1$ is what explains A.`, d: 3, c: 'analysis', t: [3] }), (C) => {
    C.assert(v.ok && v.total.eq(1) && !assignVerdict(ws2).ok && ws2.every((x) => x.sign() >= 0 && x.le(1)), 'total is 1 so A holds; with the last value 1/6 all values lie in [0, 1] but the total is 13/12, so R alone does not explain A'); C.key('b');
  });
}
{
  const a = dec('0.5'), b = dec('0.4'), ab = dec('0.2');
  Q('ar3', mk.ar({ a: r`If $P(A) = 0.5$, $P(B) = 0.4$ and $P(A \cap B) = 0.2$, then $P(A \cup B) = 0.7$.`, r: r`$P(A \cup B) = P(A) + P(B)$ for every pair of events $A$ and $B$.`, key: 'c', sol: r`By the addition theorem $P(A \cup B) = 0.5 + 0.4 - 0.2 = 0.7$, so A is true. R is false: the sum $P(A) + P(B)$ counts the outcomes of $A \cap B$ twice, and equals $P(A \cup B)$ only when $A \cap B$ is empty. Here the sum $0.9$ is not $0.7$.`, d: 2, c: 'understanding', t: [4] }), (C) => {
    C.assert(a.add(b).sub(ab).eq(dec('0.7')) && a.add(b).eq(dec('0.9')) && !a.add(b).eq(a.add(b).sub(ab)), 'P(A or B) = 0.7 while P(A) + P(B) = 0.9'); C.key('c');
  });
}
{
  const S = COIN3.constructor === Space ? new Space(['HH', 'HT', 'TH', 'TT']) : null, A = (o) => o[0] === 'H', B = (o) => o[1] === 'H';
  Q('ar4', mk.ar({ a: r`When a coin is tossed twice, the events "the first toss is a head" and "the second toss is a head" are mutually exclusive.`, r: r`Two events are mutually exclusive when the occurrence of one rules out the occurrence of the other.`, key: 'd', sol: r`The outcome $\mathrm{HH}$ belongs to both events, so they can occur together and A is false. R is the definition of mutually exclusive events, so R is true.`, d: 2, c: 'understanding', t: [2] }), (C) => {
    C.assert(S.ev((o) => A(o) && B(o)).join() === 'HH' && !mutuallyExclusive(S, A, B), 'the outcome HH lies in both events'); C.key('d');
  });
}
{
  const S = COIN3, E = (o) => heads(o) >= 1, p = S.P(E), pc = S.P((o) => !E(o));
  Q('ar5', mk.ar({ a: r`The probability of getting at least one head in three tosses of a fair coin is $\dfrac{7}{8}$.`, r: r`The event "no head" has only the outcome $\mathrm{TTT}$ among $8$ equally likely outcomes, and $P(E) = 1 - P(E')$.`, key: 'a', sol: r`The only outcome with no head is $\mathrm{TTT}$, so $P(\text{no head}) = \dfrac{1}{8}$ and $P(\text{at least one head}) = 1 - \dfrac{1}{8} = \dfrac{7}{8}$: A is true. R is the step that gives it, so R is true and explains A.`, d: 3, c: 'application', t: [3, 4] }), (C) => {
    C.assert(p.eq(F(7, 8)) && pc.eq(F(1, 8)) && S.ev((o) => !E(o)).join() === 'TTT' && fr(1).sub(pc).eq(p), 'P(at least one head) = 7/8 and P(TTT) = 1/8'); C.key('a');
  });
}
{
  const L = [1, 2, 3, 4], pairs = cart(L, L), un = pairs.filter(([a, b]) => a <= b).length;
  Q('ar6', mk.ar({ a: r`Rolling a four-sided die twice and writing the scores in order gives a sample space of $16$ outcomes.`, r: r`The outcomes $(1, 2)$ and $(2, 1)$ are the same outcome, so the sample space has only $10$ different outcomes.`, key: 'c', sol: r`Each of the two rolls has $4$ results and the order is recorded, so there are $4 \times 4 = 16$ ordered pairs and A is true. R is false: the pairs $(1, 2)$ and $(2, 1)$ record different results (the first roll gave $1$ in one and $2$ in the other), so they are two outcomes. The count $10$ would be right only if the order were ignored.`, d: 2, c: 'understanding', t: [1] }), (C) => {
    C.assert(TETRA2.n === 16 && un === 10 && TETRA2.outs.some(([a, b]) => a === 1 && b === 2) && TETRA2.outs.some(([a, b]) => a === 2 && b === 1), '16 ordered pairs, with (1, 2) and (2, 1) both present; 10 counts the pairs with the order ignored'); C.key('c');
  });
}

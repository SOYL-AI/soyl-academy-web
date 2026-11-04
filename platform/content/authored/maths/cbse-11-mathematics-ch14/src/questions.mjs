// CBSE 11 Mathematics ch14 Probability: objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Every key, distractor and number in a solution is recomputed here by enumerating a sample space (equally likely
// outcomes) or by adding exact fractions; the addition theorem and the complement rule are checked on each instance.
import { Q, mk } from './lib.mjs';
import { r, Fr, fr, T, range, cart, arr, comb, subsets, dice2, isPrime, isSquare, ev, uni, inter, diff, comp, exclusive, exhaustive, P, WP, wTotal, laws, pick, tosses } from './space.mjs';

const S10 = range(1, 10);
const dec = (s) => T(s);

// =============================================================== multiple choice
{ // m01 (deck 1 check): number of events of a four-outcome sample space
  const S = ['w', 'x', 'y', 'z'];
  const n = subsets(S).length;
  const o = pick([16, 15, 8, 4], n);
  Q('m01', mk.mcq({ stem: r`A random experiment has a sample space with exactly four outcomes. Counting the sure event and the impossible event, the number of different events that can be described is`, ...o, sol: r`An event is any subset of $S$. A set with $4$ elements has $2^4 = 16$ subsets, including $S$ itself and the empty set. Option (b) leaves out the empty set.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(n === 16 && 2 ** 4 === 16 && subsets(S).some((e) => e.length === 0) && subsets(S).some((e) => e.length === 4), 'all 16 subsets listed'); Cx.which(o.vals, 16); });
}
{ // m02 (deck 1 check): which pair is mutually exclusive
  const Pp = ev(S10, isPrime), Qq = ev(S10, (n) => n % 3 === 0), Rr = ev(S10, isSquare);
  const exc = [['PQ', Pp, Qq], ['PR', Pp, Rr], ['QR', Qq, Rr]].filter(([, X, Y]) => exclusive(S10, X, Y)).map((x) => x[0]);
  const o = pick(['PQ', 'PR', 'QR', 'none'], exc.length === 1 ? exc[0] : 'x', (v) => ({ PQ: r`$P$ and $Q$`, PR: r`$P$ and $R$`, QR: r`$Q$ and $R$`, none: 'None of the three pairs' }[v]));
  Q('m02', mk.mcq({ stem: r`On a spinner numbered $1$ to $10$, let $P$ be "the number is prime", $Q$ "the number is a multiple of $3$" and $R$ "the number is a perfect square". Which pair of these events is mutually exclusive?`, ...o, sol: r`$P = \{2, 3, 5, 7\}$, $Q = \{3, 6, 9\}$, $R = \{1, 4, 9\}$. Then $P \cap Q = \{3\}$ and $Q \cap R = \{9\}$ are not empty, but $P \cap R = \varnothing$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(exc.join() === 'PR', 'only P and R are disjoint'); Cx.which(o.vals, 'PR'); });
}
{ // m03 (deck 2 check): the addition theorem and plausible wrong forms
  const A = ev(S10, (n) => n % 2 === 0), B = ev(S10, (n) => n % 3 === 0);
  const { pa, pb, pi, pu } = laws(S10, A, B);
  const forms = [pa.add(pb).sub(pi), pa.add(pb).add(pi), pa.add(pb).sub(pa.mul(pb)), pa.add(pb)];
  const o = pick(forms.map((f, i) => ['a', 'b', 'c', 'd'][i]), 'a', (v) => ({ a: r`$P(A) + P(B) - P(A \cap B)$`, b: r`$P(A) + P(B) + P(A \cap B)$`, c: r`$P(A) + P(B) - P(A)\,P(B)$`, d: r`$P(A) + P(B)$` }[v]));
  Q('m03', mk.mcq({ stem: r`For any two events $A$ and $B$ of the same sample space, the probability that at least one of them occurs is`, ...o, sol: r`The outcomes of $A \cap B$ are counted in both $P(A)$ and $P(B)$, so the overlap is subtracted once: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`, d: 1, c: 'recall', t: [2], time: 45 }), (Cx) => { Cx.assert(forms[0].eq(pu) && forms.slice(1).every((f) => !f.eq(pu)), 'only the first form equals P(A or B) on the spinner (A even, B multiple of 3)'); Cx.key('a'); });
}
{ // m04 (deck 2 check): complement
  const p = fr(5, 18);
  const o = pick([p.comp(), fr(5, 13), p.add(1), fr(1, 3)], fr(13, 18), (f) => f.m());
  Q('m04', mk.mcq({ stem: r`An imagined tea stall runs out of milk before noon with probability $\dfrac{5}{18}$ on a given day. The probability that it does not run out of milk before noon is`, ...o, sol: r`$P(\text{not } E) = 1 - P(E) = 1 - \dfrac{5}{18} = \dfrac{13}{18}$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (Cx) => { Cx.assert(p.comp().eq(fr(13, 18)), '1 - 5/18 = 13/18'); Cx.which(o.vals, 13 / 18); Cx.sol([5, 18, 13]); });
}
{ // m05: exclusive and exhaustive with a ratio
  const pb = fr(1, 3), pa = pb.mul(2);
  const o = pick([fr(1, 3), fr(2, 3), fr(1, 2), fr(1, 6)], pb, (f) => f.m());
  Q('m05', mk.mcq({ stem: r`Two events $A$ and $B$ are mutually exclusive and exhaustive, and $P(A)$ is twice $P(B)$. Then $P(B)$ equals`, ...o, sol: r`Exclusive and exhaustive gives $P(A) + P(B) = 1$. With $P(A) = 2P(B)$ this reads $3P(B) = 1$, so $P(B) = \dfrac{1}{3}$.`, d: 2, c: 'application', t: [1, 2], time: 75 }), (Cx) => { Cx.assert(pa.add(pb).eq(1) && pa.eq(pb.mul(2)), 'p + 2p = 1 gives 1/3'); Cx.which(o.vals, 1 / 3); });
}
{ // m06: addition theorem, decimals
  const pa = fr('0.45'), pb = fr('0.3'), pi = fr('0.12');
  const u = pa.add(pb).sub(pi);
  const o = pick([u, pa.add(pb), pa.add(pb).add(pi), pa.add(pb).sub(pi.mul(2))], fr('0.63'), (f) => dec(f.dec()));
  Q('m06', mk.mcq({ stem: r`For two events of one experiment, $P(A) = 0.45$, $P(B) = 0.3$ and $P(A \cap B) = 0.12$. The probability that $A$ or $B$ occurs is`, ...o, sol: r`$P(A \cup B) = 0.45 + 0.3 - 0.12 = 0.63$. Adding the three numbers gives $0.87$, and ignoring the overlap gives $0.75$; both are wrong.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(u.eq('0.63') && pa.add(pb).add(pi).eq('0.87') && pa.add(pb).eq('0.75'), '0.63'); Cx.which(o.vals, 0.63); });
}
{ // m07: find the overlap
  const pa = fr(1, 2), pb = fr(2, 3), pu = fr(5, 6);
  const pi = pa.add(pb).sub(pu);
  const o = pick([fr(1, 3), fr(1, 6), fr(1, 2), fr(4, 3)], pi, (f) => f.m());
  Q('m07', mk.mcq({ stem: r`If $P(A) = \dfrac{1}{2}$, $P(B) = \dfrac{2}{3}$ and $P(A \cup B) = \dfrac{5}{6}$, the probability $P(A \cap B)$ is`, ...o, sol: r`Rearranging the addition theorem, $P(A \cap B) = P(A) + P(B) - P(A \cup B) = \dfrac{3}{6} + \dfrac{4}{6} - \dfrac{5}{6} = \dfrac{1}{3}$.`, d: 3, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(pi.eq(fr(1, 3)) && pi.le(pa) && pi.le(pb), 'overlap 1/3 is at most each event'); Cx.which(o.vals, 1 / 3); });
}
{ // m08: neither
  const pa = fr('0.4'), pb = fr('0.32'), pi = fr('0.1');
  const none = pa.add(pb).sub(pi).comp();
  const o = pick([none, pa.add(pb).comp(), pa.add(pb).sub(pi), pa.add(pb).add(pi).comp()], fr('0.38'), (f) => dec(f.dec()));
  Q('m08', mk.mcq({ stem: r`In a model of one experiment, $P(A) = 0.4$, $P(B) = 0.32$ and $P(A \cap B) = 0.1$. The probability that neither $A$ nor $B$ occurs is`, ...o, sol: r`$P(A \cup B) = 0.4 + 0.32 - 0.1 = 0.62$, so $P(\text{neither}) = 1 - 0.62 = 0.38$.`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(none.eq('0.38') && pa.add(pb).comp().eq('0.28') && pa.add(pb).sub(pi).eq('0.62') && pa.add(pb).add(pi).comp().eq('0.18'), '0.38'); Cx.which(o.vals, 0.38); });
}
{ // m09: larger of two numbers is 4
  const E = ev(dice2, (o) => Math.max(o.a, o.b) === 4);
  const o = pick([7, 4, 8, 16], E.length);
  Q('m09', mk.mcq({ stem: r`Two dice are thrown together and the larger of the two numbers is noted. The number of outcomes (out of $36$) in the event "the larger number is $4$" is`, ...o, sol: r`Pairs with larger number $4$: $(4, 1), (4, 2), (4, 3), (4, 4), (1, 4), (2, 4), (3, 4)$. That is $7$ outcomes, since $(4, 4)$ is listed once.`, d: 3, c: 'application', t: [3, 1], time: 75 }), (Cx) => { Cx.assert(E.length === 7 && 2 * 3 + 1 === 7, '7 outcomes'); Cx.which(o.vals, 7); });
}
{ // m10: choose a pair from five
  const S = comb(['p', 'q', 'r', 's', 't'], 2);
  const o = pick([10, 20, 25, 5], S.length);
  Q('m10', mk.mcq({ stem: r`A hostel quiz team (imagined) must send a pair of speakers chosen together from $5$ students. The number of outcomes in the sample space of this selection is`, ...o, sol: r`Order does not matter, so the outcomes are the $2$-element subsets of a $5$-element set: $\dfrac{5 \times 4}{2} = 10$. Counting ordered pairs would give $20$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => { Cx.assert(S.length === 10 && arr([1, 2, 3, 4, 5], 2).length === 20 && (5 * 4) / 2 === 10, '10 pairs'); Cx.which(o.vals, 10); });
}
{ // m11: at least one head in four tosses
  const T4 = tosses(4);
  const E = ev(T4, (s) => s.includes('H'));
  const o = pick([15, 16, 14, 8], E.length);
  Q('m11', mk.mcq({ stem: r`A coin is tossed four times and the faces are written in order. The number of outcomes in the event "at least one head" is`, ...o, sol: r`There are $2^4 = 16$ outcomes in all and only one of them, four tails, has no head. So the event has $16 - 1 = 15$ outcomes.`, d: 2, c: 'application', t: [3, 1], time: 60 }), (Cx) => { Cx.assert(T4.length === 16 && E.length === 15 && comp(T4, E).length === 1, '15 outcomes'); Cx.which(o.vals, 15); });
}
{ // m12: sum divisible by 5
  const E = ev(dice2, (o) => (o.a + o.b) % 5 === 0);
  const o = pick([fr(7, 36), fr(1, 9), fr(1, 12), fr(5, 36)], P(dice2, E), (f) => f.m());
  Q('m12', mk.mcq({ stem: r`Two fair dice are thrown together. The probability that the sum of the two numbers is divisible by $5$ is`, ...o, sol: r`The sum is $5$ in $4$ ways and $10$ in $3$ ways, which are mutually exclusive, so $n(E) = 7$ and $P(E) = \dfrac{7}{36}$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(E.length === 7 && ev(dice2, (o) => o.a + o.b === 5).length === 4 && ev(dice2, (o) => o.a + o.b === 10).length === 3, '4 + 3 = 7'); Cx.which(o.vals, 7 / 36); });
}
{ // m13: exclusive events, neither
  const pa = fr('0.3'), pb = fr('0.5');
  const o = pick([fr('0.2'), fr('0.8'), fr('0.15'), fr('0.5')], pa.add(pb).comp(), (f) => dec(f.dec()));
  Q('m13', mk.mcq({ stem: r`Events $A$ and $B$ are mutually exclusive with $P(A) = 0.3$ and $P(B) = 0.5$. The probability that neither $A$ nor $B$ occurs is`, ...o, sol: r`Mutually exclusive, so $P(A \cup B) = 0.3 + 0.5 = 0.8$ and $P(A' \cap B') = 1 - 0.8 = 0.2$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(pa.add(pb).comp().eq('0.2'), '0.2'); Cx.which(o.vals, 0.2); });
}
{ // m14: three events partition S
  const p1 = fr(1, 2), p2 = fr(1, 5), p3 = p1.add(p2).comp();
  const o = pick([fr(3, 10), fr(7, 10), fr(1, 3), fr(2, 5)], p3, (f) => f.m());
  Q('m14', mk.mcq({ stem: r`The events $E_1$, $E_2$, $E_3$ are mutually exclusive and exhaustive, with $P(E_1) = \dfrac{1}{2}$ and $P(E_2) = \dfrac{1}{5}$. Then $P(E_3)$ is`, ...o, sol: r`The three probabilities add to $1$: $P(E_3) = 1 - \dfrac{1}{2} - \dfrac{1}{5} = \dfrac{3}{10}$. The value $\dfrac{7}{10}$ is $P(E_1) + P(E_2)$.`, d: 2, c: 'application', t: [1, 2], time: 60 }), (Cx) => { Cx.assert(p3.eq(fr(3, 10)) && p1.add(p2).eq(fr(7, 10)), '3/10'); Cx.which(o.vals, 0.3); });
}
{ // m15: a valid assignment
  const sets = { a: ['0.4', '0.4', '0.3'], b: ['0.35', '0.4', '0.25'], c: ['0.7', '0.5', '-0.2'], d: ['0.3', '0.3', '0.3'] };
  const ok = (xs) => xs.every((x) => fr(x).n >= 0) && xs.reduce((s, x) => s.add(x), new Fr(0)).eq(1);
  const valid = Object.keys(sets).filter((k) => ok(sets[k]));
  const o = pick(['a', 'b', 'c', 'd'], valid.length === 1 ? valid[0] : 'x', (k) => T(sets[k].join(', ').split('-').join('-')));
  Q('m15', mk.mcq({ stem: r`Which of these lists can be the probabilities of the three elementary events of a random experiment?`, ...o, sol: r`A valid list has no negative entry and total exactly $1$. Here $0.4 + 0.4 + 0.3 = 1.1$ and $0.3 + 0.3 + 0.3 = 0.9$ are wrong, and $0.7 + 0.5 - 0.2 = 1$ has a negative entry. Only $0.35 + 0.4 + 0.25 = 1$ with all entries non-negative works.`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(valid.join() === 'b', 'only list b is valid'); Cx.which(o.vals, 'b'); });
}
{ // m16: weighted outcomes in a ratio
  const w = { w1: fr(1, 10), w2: fr(2, 10), w3: fr(3, 10), w4: fr(3, 10), w5: fr(1, 10) };
  const E = ['w2', 'w3', 'w4'];
  const t = WP(w, E);
  const o = pick([fr(4, 5), fr(3, 5), fr(3, 10), fr(8, 5)], t, (f) => f.m());
  Q('m16', mk.mcq({ stem: r`A lopsided spinner has five outcomes $w_1, \ldots, w_5$ whose probabilities are in the ratio $1 : 2 : 3 : 3 : 1$. The probability of the event $\{w_2, w_3, w_4\}$ is`, ...o, sol: r`The ratio parts add to $10$, so the probabilities are $\dfrac{1}{10}, \dfrac{2}{10}, \dfrac{3}{10}, \dfrac{3}{10}, \dfrac{1}{10}$. The event has $\dfrac{2 + 3 + 3}{10} = \dfrac{4}{5}$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(wTotal(w).eq(1) && t.eq(fr(4, 5)), 'weights sum to 1; event 4/5'); Cx.which(o.vals, 0.8); });
}
{ // m17: neither in set notation
  const A = ev(S10, (n) => n % 2 === 0), B = ev(S10, (n) => n % 3 === 0);
  const nei = comp(S10, uni(S10, A, B));
  const cand = { a: inter(S10, comp(S10, A), comp(S10, B)), b: uni(S10, comp(S10, A), comp(S10, B)), c: inter(S10, A, B), d: diff(S10, A, B) };
  const key = (E) => E.join(' ');
  const o = pick(['a', 'b', 'c', 'd'], Object.keys(cand).filter((k) => key(cand[k]) === key(nei)).join(''), (k) => ({ a: r`$A' \cap B'$`, b: r`$A' \cup B'$`, c: r`$A \cap B$`, d: r`$A - B$` }[k]));
  Q('m17', mk.mcq({ stem: r`For events $A$ and $B$ of one experiment, "neither $A$ nor $B$ occurs" is the event`, ...o, sol: r`"Neither" means both $A$ fails and $B$ fails, that is $A' \cap B'$, which equals $(A \cup B)'$. The set $A' \cup B'$ means "at least one fails", a larger event.`, d: 3, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(key(cand.a) === key(nei) && key(cand.b) !== key(nei) && key(cand.c) !== key(nei) && key(cand.d) !== key(nei), "only A' and B' (= (A or B)') is neither; A' or B' differs on the spinner example"); Cx.which(o.vals, 'a'); });
}
{ // m18: A but not B
  const pa = fr('0.55'), pb = fr('0.48'), pi = fr('0.2');
  const t = pa.sub(pi);
  const o = pick([t, pb.sub(pi), pa.add(pb).sub(pi), fr('0.75')], fr('0.35'), (f) => dec(f.dec()));
  Q('m18', mk.mcq({ stem: r`In a survey model, $P(A) = 0.55$, $P(B) = 0.48$ and $P(A \cap B) = 0.2$. The probability that $A$ occurs but $B$ does not is`, ...o, sol: r`$P(A \cap B') = P(A) - P(A \cap B) = 0.55 - 0.2 = 0.35$. The value $0.28$ is $P(B) - P(A \cap B)$, the opposite event.`, d: 3, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(t.eq('0.35') && pb.sub(pi).eq('0.28') && pa.add(pb).sub(pi).eq('0.83'), '0.35'); Cx.which(o.vals, 0.35); });
}

// =============================================================== assertion-reason
{ // ar1: key a
  const S8 = range(1, 8);
  const X = ev(S8, (n) => n > 5), Y = ev(S8, (n) => n < 3);
  Q('ar1', mk.ar({ a: r`On a spinner numbered $1$ to $8$, the events "the number is greater than $5$" and "the number is less than $3$" are mutually exclusive.`, r: r`Mutually exclusive events have no outcome in common.`, key: 'a', sol: 'The events are {6, 7, 8} and {1, 2}, which share no outcome, and sharing no outcome is exactly what mutually exclusive means; R explains A.', d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(exclusive(S8, X, Y) && X.join() === '6,7,8' && Y.join() === '1,2', 'disjoint'); Cx.key('a'); });
}
{ // ar2: key b
  const pe = fr('0.3');
  Q('ar2', mk.ar({ a: r`If an event $E$ has $P(E) = 0.3$, then the event "not $E$" has probability $0.7$.`, r: r`The impossible event has probability $0$.`, key: 'b', sol: 'A is the complement rule, 1 - 0.3 = 0.7. R is also true but it plays no part in the complement rule, so it does not explain A.', d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(pe.comp().eq('0.7'), '1 - 0.3 = 0.7'); Cx.key('b'); });
}
{ // ar3: key c
  const X = ev(S10, (n) => n % 3 === 0), Y = ev(S10, (n) => n % 5 === 0);
  const U = uni(S10, X, Y);
  Q('ar3', mk.ar({ a: r`On a spinner numbered $1$ to $10$, the events "a multiple of $3$" and "a multiple of $5$" are mutually exclusive.`, r: r`Any two mutually exclusive events are also exhaustive.`, key: 'c', sol: 'The sets {3, 6, 9} and {5, 10} do not overlap, so A is true. R is false: their union has only 5 of the 10 outcomes, so they are not exhaustive.', d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(exclusive(S10, X, Y) && !exhaustive(S10, X, Y) && U.length === 5, 'A true; R false because the union has 5 of 10 outcomes'); Cx.key('c'); });
}
{ // ar4: key d
  const X = ev(S10, isPrime), Y = ev(S10, (n) => n % 2 === 1);
  const p = P(S10, X).add(P(S10, Y)), u = P(S10, uni(S10, X, Y));
  Q('ar4', mk.ar({ a: r`For the events "prime" and "odd" on a spinner numbered $1$ to $10$, $P(\text{prime or odd}) = P(\text{prime}) + P(\text{odd})$.`, r: r`For any two events, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`, key: 'd', sol: 'Prime and odd share 3, 5 and 7, so adding the two probabilities (9/10) overshoots the true value 3/5; A is false. R is the addition theorem and is true.', d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(!p.eq(u) && p.eq(fr(9, 10)) && u.eq(fr(3, 5)) && inter(S10, X, Y).join() === '3,5,7', 'A false: 9/10 versus 3/5'); laws(S10, X, Y); Cx.key('d'); });
}
{ // ar5: key a
  const xs = ['0.4', '0.35', '0.3'];
  const tot = xs.reduce((s, x) => s.add(x), new Fr(0));
  Q('ar5', mk.ar({ a: r`Giving the three elementary events of an experiment the probabilities $0.4$, $0.35$ and $0.3$ does not define a probability model.`, r: r`The probabilities of all the elementary events must add up to $1$.`, key: 'a', sol: 'The three numbers add to 1.05, not 1, so A is true; the requirement in R (axiom 2) is exactly what they fail.', d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(tot.eq('1.05'), 'total 1.05'); Cx.key('a'); });
}
{ // ar6: key c
  const pa = fr('0.7'), pb = fr('0.5');
  Q('ar6', mk.ar({ a: r`Two events with probabilities $0.7$ and $0.5$ cannot be mutually exclusive.`, r: r`For mutually exclusive events $A$ and $B$, $P(A \cup B) = P(A) - P(B)$.`, key: 'c', sol: 'If they were exclusive, P(A or B) would be 0.7 + 0.5 = 1.2, which exceeds 1; so A is true. R is false: for exclusive events the probabilities are added, not subtracted.', d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(pa.add(pb).eq('1.2') && !pa.add(pb).le(1), 'sum 1.2 exceeds 1, so A is true'); Cx.key('c'); });
}

// =============================================================== true-false
{ // tf1 (deck 1 check)
  const T2 = tosses(2);
  const X = ev(T2, (s) => s === 'HH'), Y = ev(T2, (s) => s.includes('H'));
  Q('tf1', mk.tf({ stem: r`True or false: when a coin is tossed twice, the events "two heads" and "at least one head" are mutually exclusive.`, key: 'f', sol: r`"Two heads" is $\{\text{HH}\}$ and "at least one head" is $\{\text{HH}, \text{HT}, \text{TH}\}$. They share $\text{HH}$, so they are not mutually exclusive; the first event is inside the second.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(!exclusive(T2, X, Y) && inter(T2, X, Y).join() === 'HH', 'HH is in both'); Cx.key('f'); });
}
{ // tf2 (deck 2 check)
  const a = fr('0.55'), b = fr('0.6');
  Q('tf2', mk.tf({ stem: r`True or false: two events whose probabilities are $0.55$ and $0.6$ can be mutually exclusive.`, key: 'f', sol: r`If they were mutually exclusive, $P(A \cup B)$ would be $0.55 + 0.6 = 1.15$, which is more than $1$. No probability can exceed $1$, so they cannot be exclusive.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(a.add(b).eq('1.15') && !a.add(b).le(1), 'sum 1.15 exceeds 1'); Cx.key('f'); });
}
{ // tf3: union at least as large as each event (checked on every pair of events of a 4-outcome space)
  const S = ['w', 'x', 'y', 'z'];
  const evs = subsets(S);
  let all = true;
  for (const A of evs) for (const B of evs) { const pu = P(S, uni(S, A, B)); if (pu.v < P(S, A).v || pu.v < P(S, B).v) all = false; }
  Q('tf3', mk.tf({ stem: r`True or false: for any two events $A$ and $B$ of one experiment, $P(A \cup B)$ is never less than $P(A)$.`, key: 't', sol: r`$A \cup B$ contains every outcome of $A$, so $P(A \cup B) = P(A) + P(B \cap A') \ge P(A)$.`, d: 3, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(all && evs.length === 16, 'holds for all 256 pairs of events of a four-outcome space'); Cx.key('t'); });
}
{ // tf4: three exclusive and exhaustive events
  const S12 = range(1, 12);
  const E1 = ev(S12, (n) => n % 3 === 0), E2 = ev(S12, (n) => n % 3 === 1), E3 = ev(S12, (n) => n % 3 === 2);
  Q('tf4', mk.tf({ stem: r`True or false: if $A$, $B$, $C$ are mutually exclusive and exhaustive events of a sample space, then $P(A) + P(B) + P(C) = 1$.`, key: 't', sol: r`Because they are mutually exclusive, the probability of their union is the sum of their probabilities; because they are exhaustive, that union is $S$, whose probability is $1$.`, d: 2, c: 'recall', t: [1, 2], time: 45 }), (Cx) => { Cx.assert(P(S12, E1).add(P(S12, E2)).add(P(S12, E3)).eq(1) && exclusive(S12, E1, E2) && exclusive(S12, E1, E3) && exclusive(S12, E2, E3), 'remainder classes sum to 1'); Cx.key('t'); });
}
{ // tf5: sum 7 and doublet
  const X = ev(dice2, (o) => o.a + o.b === 7), Y = ev(dice2, (o) => o.a === o.b);
  Q('tf5', mk.tf({ stem: r`True or false: when two dice are thrown together, the events "the sum is $7$" and "both dice show the same number" are mutually exclusive.`, key: 't', sol: r`A doublet $(k, k)$ has sum $2k$, which is even, so it can never be $7$. The two events have no outcome in common.`, d: 3, c: 'application', t: [1], time: 60 }), (Cx) => { Cx.assert(exclusive(dice2, X, Y) && X.length === 6 && Y.length === 6, 'disjoint'); Cx.key('t'); });
}

// =============================================================== fill in the blank
{ // fb1 (deck 1 check)
  const n = arr(['f1', 'f2', 'f3', 'f4'], 2).length;
  Q('fb1', mk.fill({ stem: r`At an imagined quiz final with four finalists, a first speaker and then a different second speaker are named, one after the other. The sample space of (first, second) pairs has ___ outcomes.`, acc: [['12']], sol: r`The first speaker can be any of $4$ finalists and the second any of the other $3$, so $n(S) = 4 \times 3 = 12$.`, d: 1, c: 'understanding', t: [3], time: 45 }), (Cx) => { Cx.assert(n === 12 && 4 * 3 === 12, '12'); Cx.blank(12); });
}
{ // fb2 (deck 2 check)
  const u = fr('0.28').add('0.43').sub('0.1');
  Q('fb2', mk.fill({ stem: r`Events $E$ and $F$ satisfy $P(E) = 0.28$, $P(F) = 0.43$ and $P(E \cap F) = 0.1$. Then $P(E \cup F) = $ ___.`, acc: [['0.61']], sol: r`$P(E \cup F) = 0.28 + 0.43 - 0.1 = 0.61$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (Cx) => { Cx.assert(u.eq('0.61'), '0.61'); Cx.blank(0.61); });
}
{ // fb3
  const pb = fr(3, 8).comp();
  Q('fb3', mk.fill({ stem: r`Events $A$ and $B$ are mutually exclusive and exhaustive, and $P(A) = \dfrac{3}{8}$. Then $P(B) = $ ___ (give a fraction).`, acc: [['5/8', '0.625']], sol: r`They are mutually exclusive and exhaustive, so $P(A) + P(B) = 1$ and $P(B) = 1 - \dfrac{3}{8} = \dfrac{5}{8}$, which is $5/8$.`, d: 1, c: 'understanding', t: [1, 2], time: 45 }), (Cx) => { Cx.assert(pb.eq(fr(5, 8)), '5/8'); Cx.blank(0.625); });
}
{ // fb4
  const A = ev(S10, (n) => n % 2 === 0), B = ev(S10, (n) => n % 3 === 0);
  const { pu } = laws(S10, A, B);
  Q('fb4', mk.fill({ stem: r`A spinner is numbered $1$ to $10$ with all numbers equally likely. The probability that it stops on an even number or a multiple of $3$ is ___ (give a fraction).`, acc: [['7/10', '0.7']], sol: r`$P(\text{even}) = \dfrac{5}{10}$, $P(\text{multiple of } 3) = \dfrac{3}{10}$ and $P(\text{both}) = \dfrac{1}{10}$ (only $6$), so $P(\text{even or multiple of } 3) = \dfrac{5 + 3 - 1}{10} = 7/10$.`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(pu.eq(fr(7, 10)), '7/10'); Cx.blank(0.7); });
}
{ // fb5
  const n = tosses(4).length;
  Q('fb5', mk.fill({ stem: r`When a coin is tossed four times and the faces are listed in order, the sample space has ___ outcomes.`, acc: [['16']], sol: r`Each toss has $2$ results, so the number of outcomes is $2 \times 2 \times 2 \times 2 = 16$.`, d: 1, c: 'recall', t: [3], time: 30 }), (Cx) => { Cx.assert(n === 16, '16'); Cx.blank(16); });
}

// =============================================================== numerical
{ // n1 (deck 2 check)
  const v = fr('0.64').add('0.41').sub('0.83');
  Q('n1', mk.num({ stem: r`For two events of one experiment, $P(A) = 0.64$, $P(B) = 0.41$ and $P(A \cup B) = 0.83$. Find $P(A \cap B)$.`, value: 0.22, sol: r`$P(A \cap B) = P(A) + P(B) - P(A \cup B) = 0.64 + 0.41 - 0.83 = 0.22$.`, scheme: [['Rearranging the addition theorem: 0.64 + 0.41 - 0.83 = 0.22', 1]], d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(v.eq('0.22'), '0.22'); Cx.val(0.22); });
}
{ // n2: product a perfect square
  const E = ev(dice2, (o) => isSquare(o.a * o.b));
  const v = P(dice2, E);
  Q('n2', mk.num({ stem: r`Two fair dice are thrown together. Find the probability, as a decimal correct to $3$ places, that the product of the two numbers is a perfect square.`, value: 0.222, tol: 0.0005, sol: r`The products $1, 4, 9, 16, 25, 36$ come from $(1,1), (1,4), (4,1), (2,2), (3,3), (4,4), (5,5), (6,6)$, so $n(E) = 8$ and $P(E) = \dfrac{8}{36} = 0.222$.`, scheme: [['Listing the 8 favourable outcomes', 1], ['P = 8/36 = 0.222', 1]], marks: 2, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(E.length === 8 && v.eq(fr(2, 9)) && Math.abs(v.v - 0.222) < 0.0005, '8/36 = 0.222'); Cx.val(v.v, 0.0005); });
}
{ // n3: weighted five outcomes, k, 2k, 2k, 3k, 2k
  const k = fr(1, 10);
  const w = { a: k, b: k.mul(2), c: k.mul(2), d: k.mul(3), e: k.mul(2) };
  const t = WP(w, ['c', 'd']);
  Q('n3', mk.num({ stem: r`An experiment has five outcomes $a, b, c, d, e$ with probabilities $k$, $2k$, $2k$, $3k$ and $2k$. Find $P(\{c, d\})$.`, value: 0.5, sol: r`The probabilities add to $1$: $k + 2k + 2k + 3k + 2k = 10k = 1$, so $k = 0.1$. Then $P(\{c, d\}) = 2k + 3k = 5(0.1) = 0.5$.`, scheme: [['10k = 1 and k = 0.1', 1], ['P = 2k + 3k = 0.5', 1]], marks: 2, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(wTotal(w).eq(1) && t.eq('0.5'), '0.5'); Cx.val(0.5); });
}
{ // n4: choose 3 from 7, two named people both chosen
  const S = comb(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
  const E = ev(S, (c) => c.includes('a') && c.includes('b'));
  const v = P(S, E);
  Q('n4', mk.num({ stem: r`A school club (imagined) picks a committee of $3$ members together from $7$ members, every committee being equally likely. Find, as a decimal correct to $3$ places, the probability that two particular members, Mira and Naveen, are both on the committee.`, value: 0.143, tol: 0.0005, sol: r`There are $35$ committees. Those containing both Mira and Naveen need one more member from the other $5$, so $n(E) = 5$ and $P(E) = \dfrac{5}{35} = \dfrac{1}{7} = 0.143$.`, scheme: [['n(S) = 35 and n(E) = 5', 1], ['P = 5/35 = 0.143', 1]], marks: 2, d: 4, c: 'application', t: [3, 2], time: 105 }), (Cx) => { Cx.assert(S.length === 35 && E.length === 5 && v.eq(fr(1, 7)), '5/35 = 1/7'); Cx.val(1 / 7, 0.0005); });
}
{ // n5: at least one head in four tosses
  const T4 = tosses(4);
  const v = P(T4, ev(T4, (s) => s.includes('H')));
  Q('n5', mk.num({ stem: r`A coin is tossed four times. Find, as a decimal, the probability of getting at least one head. (Use the complement.)`, value: 0.9375, sol: r`Only $\text{TTTT}$ has no head, so $P(\text{no head}) = \dfrac{1}{16}$ and $P(\text{at least one head}) = 1 - \dfrac{1}{16} = \dfrac{15}{16} = 0.9375$.`, scheme: [['P(no head) = 1/16', 1], ['1 - 1/16 = 15/16 = 0.9375', 1]], marks: 2, d: 2, c: 'application', t: [2, 3], time: 75 }), (Cx) => { Cx.assert(v.eq(fr(15, 16)) && P(T4, ev(T4, (s) => !s.includes('H'))).eq(fr(1, 16)), '15/16'); Cx.val(0.9375); });
}
{ // n6: P(A or B) then the overlap
  const pa = fr('0.58'), pb = fr('0.46'), nei = fr('0.17');
  const pu = nei.comp(), pi = pa.add(pb).sub(pu);
  Q('n6', mk.num({ stem: r`Of the pupils in an imagined school, $A$ is the event "a chosen pupil joins the music club" with $P(A) = 0.58$ and $B$ is "joins the drama club" with $P(B) = 0.46$. The chance of joining neither club is $0.17$. Find the probability that a chosen pupil joins both clubs.`, value: 0.21, sol: r`$P(A \cup B) = 1 - 0.17 = 0.83$. Then $P(A \cap B) = P(A) + P(B) - P(A \cup B) = 0.58 + 0.46 - 0.83 = 0.21$.`, scheme: [['P(A or B) = 1 - 0.17 = 0.83', 1], ['0.58 + 0.46 - 0.83 = 0.21', 1]], marks: 2, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(pu.eq('0.83') && pi.eq('0.21') && pi.le(pa) && pi.le(pb), '0.21'); Cx.val(0.21); });
}

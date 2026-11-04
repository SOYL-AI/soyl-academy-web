// Figures for CBSE 11 Mathematics ch14 Probability. Every set, count and probability in a table or Venn diagram is
// computed here by enumeration (equally likely outcomes) or exact fractions (weighted outcomes); the build throws on a failed check.
import { table, flow } from './lib.mjs';
import { Fr, fr, T, range, cart, arr, comb, dice2, isPrime, ev, uni, inter, diff, comp, exclusive, exhaustive, P, WP, wTotal, laws, setTex, txt, venn, partition } from './space.mjs';

function must(cond, msg) { if (!cond) throw new Error(`visual check failed: ${msg}`); }
const L = (E) => setTex(E);
const Tx = (E) => T(L(E));

// ---------------------------------------------------------------- deck 1: sample spaces and events
// four random experiments and their sample spaces
const e1 = ['H', 'T'];
const e2 = [...range(1, 6).map((n) => `H${n}`), 'TH', 'TT'];
const e3 = arr([1, 2, 3, 4], 2);
const e4 = comb(['A', 'B', 'C', 'D'], 2);
must(e1.length === 2 && e2.length === 8 && e3.length === 12 && e4.length === 6, 'experiment counts');
must(new Set(e3.map(String)).size === 12 && e3.every(([x, y]) => x !== y), 'ordered pairs of distinct tickets');
export const tblExperiments = table(['Random experiment', 'Sample space $S$', '$n(S)$'], [
  ['Toss a coin once', T(String.raw`\{\text{H}, \text{T}\}`), String(e1.length)],
  ['Toss a coin; on a head throw a die, on a tail toss the coin again', T(String.raw`\{\text{H1}, \text{H2}, \ldots, \text{H6}, \text{TH}, \text{TT}\}`), String(e2.length)],
  ['Draw two of the tickets 1, 2, 3, 4 one after the other, without putting the first back', T(String.raw`\{(1, 2), (1, 3), (1, 4), (2, 1), \ldots, (4, 3)\}`), String(e3.length)],
  ['Pick a pair of people from A, B, C, D (order does not matter)', T(String.raw`\{\text{AB}, \text{AC}, \text{AD}, \text{BC}, \text{BD}, \text{CD}\}`), String(e4.length)],
], 'Table of four random experiments with their sample spaces and the number of outcomes: a single coin toss has 2 outcomes; a coin followed by a die on heads or a second toss on tails has 8; two tickets drawn in order without replacement from four tickets have 12; a pair chosen from four people has 6.', 'The sample space lists every outcome once; its size is $n(S)$.');

// the running spinner 1..10
export const S10 = range(1, 10);
const A = ev(S10, (n) => n % 2 === 0), B = ev(S10, (n) => n % 3 === 0), C = ev(S10, isPrime);
must(L(A) === String.raw`\{2, 4, 6, 8, 10\}` && L(B) === String.raw`\{3, 6, 9\}` && L(C) === String.raw`\{2, 3, 5, 7\}`, 'spinner events');
const imp = ev(S10, (n) => n > 10);
must(imp.length === 0, 'impossible event');
export const tblEventSets = table(['Event in words', 'As a subset of $S = \\{1, 2, \\ldots, 10\\}$', 'Kind'], [
  ['The spinner shows an even number', Tx(A), 'Compound event'],
  ['The spinner shows a multiple of 3', Tx(B), 'Compound event'],
  ['The spinner shows a prime number', Tx(C), 'Compound event'],
  ['The spinner shows the number 7', T(String.raw`\{7\}`), 'Simple (elementary) event'],
  ['The spinner shows a number greater than 10', T(String.raw`\varnothing`), 'Impossible event'],
  ['The spinner shows a number from 1 to 10', Tx(S10), 'Sure event $S$'],
], 'Table of events for a spinner numbered 1 to 10: even is 2, 4, 6, 8, 10; multiple of 3 is 3, 6, 9; prime is 2, 3, 5, 7; the number 7 alone is a simple event; a number greater than 10 is the impossible event, the empty set; any number from 1 to 10 is the sure event, the whole sample space.', 'An event is a subset of the sample space; $\\varnothing$ is impossible and $S$ is sure.');

const lw = laws(S10, A, B);
must(lw.pa.eq(fr(1, 2)) && lw.pb.eq(fr(3, 10)) && lw.pi.eq(fr(1, 10)) && lw.pu.eq(fr(7, 10)), 'spinner laws');
export const vennSpin = venn({ a: 'A: even', b: 'B: multiple of 3', regions: [diff(S10, A, B).join(' '), inter(S10, A, B).join(' '), diff(S10, B, A).join(' '), comp(S10, uni(S10, A, B)).join(' ')], alt: 'Venn diagram of a spinner numbered 1 to 10 with A the even numbers and B the multiples of 3. The part of A outside B holds 2, 4, 8, 10; the overlap holds 6; the part of B outside A holds 3 and 9; the region outside both circles holds 1, 5, 7.', caption: 'The overlap holds $A \\cap B = \\{6\\}$; the corner holds the numbers in neither event.' });

const AuB = uni(S10, A, B), AnB = inter(S10, A, B), Ac = comp(S10, A), AmB = diff(S10, A, B), neither = comp(S10, AuB);
must(L(AuB) === String.raw`\{2, 3, 4, 6, 8, 9, 10\}` && L(AnB) === String.raw`\{6\}` && L(Ac) === String.raw`\{1, 3, 5, 7, 9\}` && L(AmB) === String.raw`\{2, 4, 8, 10\}` && L(neither) === String.raw`\{1, 5, 7\}`, 'algebra sets');
must(L(neither) === L(inter(S10, comp(S10, A), comp(S10, B))), 'neither = A\' and B\'');
export const tblAlgebra = table(['Words', 'Symbol', 'For $A$ = even, $B$ = multiple of 3'], [
  ['$A$ or $B$ (at least one happens)', T(String.raw`A \cup B`), Tx(AuB)],
  ['$A$ and $B$ (both happen)', T(String.raw`A \cap B`), Tx(AnB)],
  ['Not $A$', T(String.raw`A'`), Tx(Ac)],
  ['$A$ but not $B$', T(String.raw`A - B = A \cap B'`), Tx(AmB)],
  ['Neither $A$ nor $B$', T(String.raw`A' \cap B' = (A \cup B)'`), Tx(neither)],
], 'Table translating words into set symbols for even and multiple of 3 on a spinner numbered 1 to 10: A or B is 2, 3, 4, 6, 8, 9, 10; A and B is 6; not A is 1, 3, 5, 7, 9; A but not B is 2, 4, 8, 10; neither is 1, 5, 7.', 'Every English phrase about events is a set operation.');

// exclusive / exhaustive classification of pairs of events on the spinner
const pairs = [
  ['Even and odd', A, ev(S10, (n) => n % 2 === 1)],
  ['Even and multiple of 3', A, B],
  ['Less than 4 and greater than 7', ev(S10, (n) => n < 4), ev(S10, (n) => n > 7)],
  ['At most 6 and at least 5', ev(S10, (n) => n <= 6), ev(S10, (n) => n >= 5)],
];
const yn = (b) => (b ? 'Yes' : 'No');
const classRows = pairs.map(([nm, X, Y]) => [nm, yn(exclusive(S10, X, Y)), yn(exhaustive(S10, X, Y))]);
must(classRows.map((x) => x[1] + x[2]).join() === 'YesYes,NoNo,YesNo,NoYes', 'class table');
export const tblClass = table(['Pair of events (spinner 1 to 10)', 'Mutually exclusive?', 'Exhaustive?'], classRows, 'Table of four pairs of events on a spinner numbered 1 to 10. Even and odd are both mutually exclusive and exhaustive. Even and multiple of 3 are neither. Less than 4 and greater than 7 are mutually exclusive but not exhaustive. At most 6 and at least 5 are exhaustive but not mutually exclusive.', 'Mutually exclusive: $A \\cap B = \\varnothing$. Exhaustive: $A \\cup B = S$.');

export const flowClass = flow('TB', [['a', 'Find A ∩ B'], ['b', 'Empty? Then mutually exclusive'], ['c', 'Find A ∪ B'], ['d', 'Equal to S? Then exhaustive'], ['e', 'Both? Then A and B are complements']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for classifying two events: find the intersection and call the events mutually exclusive if it is empty; find the union and call them exhaustive if it is the whole sample space; if both hold, each event is the complement of the other.', 'Two set checks settle both questions.');

// a partition of S = {1, ..., 12} by remainder on division by 3
const S12 = range(1, 12);
const R0 = ev(S12, (n) => n % 3 === 0), R1 = ev(S12, (n) => n % 3 === 1), R2 = ev(S12, (n) => n % 3 === 2);
must(exclusive(S12, R0, R1) && exclusive(S12, R0, R2) && exclusive(S12, R1, R2) && uni(S12, uni(S12, R0, R1), R2).length === 12, 'partition 12');
export const partMod = partition({ labels: ['E1', 'E2', 'E3'], event: 'A', alt: 'The sample space drawn as a rectangle split into three vertical strips E1, E2 and E3 that do not overlap and together fill the rectangle. A circle labelled A is drawn across all three strips.', caption: 'Mutually exclusive and exhaustive events cut $S$ into pieces: every outcome lies in exactly one.' });
export const tblPartition = table(['Event', 'Remainder on dividing by 3', 'Outcomes in $S = \\{1, \\ldots, 12\\}$'], [
  ['$E_1$', '0', Tx(R0)], ['$E_2$', '1', Tx(R1)], ['$E_3$', '2', Tx(R2)],
], 'Table splitting the numbers 1 to 12 into three events by their remainder on division by 3: E1 is 3, 6, 9, 12; E2 is 1, 4, 7, 10; E3 is 2, 5, 8, 11. No number appears twice and all twelve numbers appear.', 'Pairwise mutually exclusive and together exhaustive: a partition of $S$.');

// counting outcomes: four ways of choosing two from four items
const pick4 = ['a', 'b', 'c', 'd'];
const withRep = cart(pick4, pick4), ordered = arr(pick4, 2), unordered = comb(pick4, 2);
must(withRep.length === 16 && ordered.length === 12 && unordered.length === 6, 'counting 4 choose 2');
export const tblCount = table(['Way of choosing 2 from 4 items', 'Example outcome', 'Number of outcomes'], [
  ['One after the other, item put back (order matters)', T('(a, a)'), String(withRep.length)],
  ['One after the other, item not put back (order matters)', T('(a, b)'), String(ordered.length)],
  ['Both together (order does not matter)', T(String.raw`\{a, b\}`), String(unordered.length)],
], 'Table of three ways of choosing two items from four: with replacement and order mattering gives 16 outcomes; without replacement and order mattering gives 12; both together with order not mattering gives 6.', 'Decide whether order matters and whether items are put back before you count $n(S)$.');

// WE1 (deck 1): the experiment 'coin then die or coin' as ordered listing
export const we1Tbl = table(['Step', 'Working'], [
  ['Head first', T(String.raw`\text{H1}, \text{H2}, \text{H3}, \text{H4}, \text{H5}, \text{H6}`) + ' (a die is then thrown)'],
  ['Tail first', T(String.raw`\text{TH}, \text{TT}`) + ' (the coin is tossed again)'],
  ['Sample space', T(String.raw`S = \{\text{H1}, \ldots, \text{H6}, \text{TH}, \text{TT}\}`)],
  ['Size', T('n(S) = 6 + 2 = 8')],
], 'Working table for the experiment of tossing a coin and then throwing a die after a head or tossing again after a tail: a head leads to six outcomes H1 to H6, a tail leads to two outcomes TH and TT, so the sample space has 8 outcomes. They are not equally likely.', 'The outcomes are not equally likely, but the sample space is still the list of all of them.');

// WE2 (deck 1): events on the ticket experiment, tickets 1..4 drawn in order without replacement
const TK = e3;
const tkA = ev(TK, ([x, y]) => x + y === 5), tkB = ev(TK, ([x, y]) => x < y);
const tkAB = inter(TK, tkA, tkB), tkAuB = uni(TK, tkA, tkB);
must(tkA.length === 4 && tkB.length === 6 && tkAB.length === 2 && tkAuB.length === 8, 'ticket events');
const prs = (E) => T(String.raw`\{` + E.map(([x, y]) => `(${x}, ${y})`).join(', ') + String.raw`\}`);
export const we2Tbl = table(['Event', 'Outcomes', 'Number'], [
  ['$A$: the two numbers add up to 5', prs(tkA), String(tkA.length)],
  ['$B$: the first number is smaller than the second', prs(tkB), String(tkB.length)],
  [T(String.raw`A \cap B`), prs(tkAB), String(tkAB.length)],
  [T(String.raw`A \cup B`), prs(tkAuB), String(tkAuB.length)],
], 'Working table for the tickets experiment with 12 ordered pairs: event A, sum equal to 5, has 4 outcomes (1,4), (2,3), (3,2), (4,1); event B, first smaller than second, has 6 outcomes; A and B together have 2 outcomes (1,4) and (2,3); A or B has 8 outcomes.', 'List each event as a set, then take the intersection and union.');

// WE3 (deck 1): classify three events on the 12-outcome space
export const we3Tbl = table(['Pair', 'Intersection', 'Union', 'Verdict'], [
  [T(String.raw`E_1, E_2`), T(L(inter(S12, R0, R1))), T(String.raw`n = ${uni(S12, R0, R1).length}`), 'Mutually exclusive, not exhaustive'],
  [T(String.raw`E_1, \text{ multiples of 2}`), T(L(inter(S12, R0, ev(S12, (n) => n % 2 === 0)))), T(String.raw`n = ${uni(S12, R0, ev(S12, (n) => n % 2 === 0)).length}`), 'Neither'],
  [T(String.raw`E_1 \cup E_2,\ E_3`), T(L(inter(S12, uni(S12, R0, R1), R2))), T(String.raw`n = ${uni(S12, uni(S12, R0, R1), R2).length}`), 'Mutually exclusive and exhaustive'],
], 'Working table classifying three pairs of events on the numbers 1 to 12: E1 and E2 have an empty intersection and a union of 8 numbers, so they are mutually exclusive but not exhaustive; E1 and the multiples of 2 share 6 and 12 and their union has 8 numbers, so they are neither; the union of E1 and E2 together with E3 has an empty intersection and a union of 12 numbers, so they are mutually exclusive and exhaustive.', 'Check the intersection for exclusive and the union for exhaustive.');
must(exclusive(S12, R0, R1) && !exhaustive(S12, R0, R1) && !exclusive(S12, R0, ev(S12, (n) => n % 2 === 0)) && !exhaustive(S12, R0, ev(S12, (n) => n % 2 === 0)) && exclusive(S12, uni(S12, R0, R1), R2) && exhaustive(S12, uni(S12, R0, R1), R2), 'we3 verdicts');

// WE4 (deck 1): digit code from {1, 2, 3} with repetition
const CODE = cart([1, 2, 3], [1, 2, 3]);
const cdA = ev(CODE, ([x, y]) => x < y), cdB = ev(CODE, ([x, y]) => (x + y) % 2 === 0);
must(CODE.length === 9 && cdA.length === 3 && cdB.length === 5 && inter(CODE, cdA, cdB).length === 1, 'code events');
export const we4Tbl = table(['Item', 'Working'], [
  ['Sample space (9 codes)', prs(CODE)],
  ['$A$: first digit smaller than second', prs(cdA)],
  ['$B$: digit sum is even', prs(cdB)],
  [T(String.raw`A \cap B`), prs(inter(CODE, cdA, cdB))],
  ['Is $A$ mutually exclusive with $B$?', 'No: the code (1, 3) is in both'],
], 'Working table for a two-digit code made from the digits 1, 2, 3 with repeats allowed: nine codes in all; event A, first digit smaller than the second, is (1,2), (1,3), (2,3); event B, digit sum even, is (1,1), (1,3), (2,2), (3,1), (3,3); the intersection is the single code (1,3), so A and B are not mutually exclusive.', 'Two events that share even one outcome are not mutually exclusive.');

export const summary1 = table(['Idea', 'Meaning', 'Example (spinner 1 to 10)'], [
  ['Sample space $S$', 'Set of all outcomes', Tx(S10)],
  ['Event', 'A subset of $S$', T(String.raw`A = \{2, 4, 6, 8, 10\}`)],
  ['Sure / impossible event', T('S') + ' and ' + T(String.raw`\varnothing`), 'A number from 1 to 10; a number above 10'],
  ['$A \\cup B$, $A \\cap B$, $A\'$', 'or, and, not', T(String.raw`\{2,3,4,6,8,9,10\},\ \{6\},\ \{1,3,5,7,9\}`)],
  ['Mutually exclusive', T(String.raw`A \cap B = \varnothing`), 'Even and odd'],
  ['Exhaustive', T(String.raw`A \cup B = S`), 'At most 6 and at least 5'],
], 'Summary table of the language of events: the sample space is the set of all outcomes; an event is a subset; the sure event is S and the impossible event is the empty set; union, intersection and complement mean or, and, not; mutually exclusive means an empty intersection; exhaustive means the union is the whole sample space. Each has an example from the spinner numbered 1 to 10.', 'A one-page dictionary from words to sets.');

// ---------------------------------------------------------------- deck 2: the axiomatic approach
export const tblAxioms = table(['Axiom', 'In symbols', 'In words'], [
  ['1. Non-negative', T(String.raw`P(E) \ge 0`), 'No event has a negative probability'],
  ['2. Total one', T('P(S) = 1'), 'Something in the sample space is certain to happen'],
  ['3. Additive', T(String.raw`P(A \cup B) = P(A) + P(B)\ \text{if } A \cap B = \varnothing`), 'Probabilities of mutually exclusive events add'],
], 'Table of the three axioms of probability: every event has a probability of at least zero; the probability of the whole sample space is one; and for mutually exclusive events the probability of the union is the sum of the probabilities.', 'Everything else in the chapter follows from these three statements.');

// weighted model: four outcomes a, b, c, d with P = 0.15, 0.25, x, 2x; x = 0.2
const wm = { a: '0.15', b: '0.25', c: '0.2', d: '0.4' };
must(wTotal(wm).eq(1) && fr('0.15').add('0.25').add(fr('0.2')).add(fr('0.4')).eq(1), 'weighted model total');
must(fr('0.2').mul(3).eq(fr('0.6')) && fr('1').sub('0.15').sub('0.25').eq('0.6') && fr('0.2').mul(2).eq(fr('0.4')), 'x = 0.2');
export const tblDistrib = table(['Outcome', '$a$', '$b$', '$c$', '$d$', 'Total'], [
  ['Probability', '0.15', '0.25', T('x'), T('2x'), T('0.4 + 3x = 1')],
  ['With $x = 0.2$', '0.15', '0.25', '0.2', '0.4', '1'],
], 'Table of a probability model with four outcomes a, b, c, d with probabilities 0.15, 0.25, x and 2x. The total must equal one, so 0.4 plus 3x equals 1 and x equals 0.2, giving the probabilities 0.15, 0.25, 0.2 and 0.4.', 'The elementary probabilities must add up to $1$.');
const wmA = ['a', 'c'], wmB = ['b', 'c', 'd'];
must(WP(wm, wmA).eq('0.35') && WP(wm, wmB).eq('0.85') && WP(wm, ['c']).eq('0.2') && WP(wm, ['a', 'b', 'c', 'd']).eq(1), 'we1 weighted events');
export const we1dTbl = table(['Step', 'Working'], [
  ['Total must be 1', T('0.15 + 0.25 + x + 2x = 1')],
  ['Solve', T('0.4 + 3x = 1,\\ \\ x = 0.2')],
  ['Probabilities', T('P(a) = 0.15,\\ P(b) = 0.25,\\ P(c) = 0.2,\\ P(d) = 0.4')],
  [T(String.raw`P(\{a, c\})`), T('0.15 + 0.2 = 0.35')],
], 'Working table: the four probabilities 0.15, 0.25, x and 2x add to one, so 0.4 plus 3x is 1 and x is 0.2; the probabilities are then 0.15, 0.25, 0.2 and 0.4, and the event made of outcomes a and c has probability 0.35.', 'Use axiom 2 to find the unknown, then axiom 3 to add.');

export const tblEqual = table(['Spinner 1 to 10', 'Event', 'Favourable outcomes', 'Probability'], [
  ['$A$', 'even', '5', T(P(S10, A).tex())],
  ['$B$', 'multiple of 3', '3', T(P(S10, B).tex())],
  ['$C$', 'prime', '4', T(P(S10, C).tex())],
  [T(String.raw`A \cap B`), 'even and a multiple of 3', '1', T(P(S10, AnB).tex())],
], 'Table of probabilities on a spinner numbered 1 to 10 with equally likely outcomes: even has 5 favourable outcomes, probability one half; multiple of 3 has 3, probability three tenths; prime has 4, probability two fifths; even and a multiple of 3 has 1, probability one tenth.', 'With equally likely outcomes, $P(E) = \\dfrac{n(E)}{n(S)}$: a special case of the axioms.');
must(P(S10, C).eq(fr(2, 5)) && P(S10, AnB).eq(fr(1, 10)), 'equal table');

// complement rule on a coin-flip space: 4 tosses, A = at least one head
const T4 = ['H', 'T'].flatMap((a) => ['H', 'T'].flatMap((b) => ['H', 'T'].flatMap((c) => ['H', 'T'].map((d) => a + b + c + d))));
const atLeast = ev(T4, (s) => s.includes('H')), none = comp(T4, atLeast);
must(T4.length === 16 && atLeast.length === 15 && none.length === 1 && none[0] === 'TTTT', 'four tosses');
export const tblComplement = table(['Rule', 'Why', 'Check: toss a coin four times, $A$ = at least one head'], [
  [T(String.raw`P(\varnothing) = 0`), T(String.raw`P(\varnothing \cup \varnothing) = P(\varnothing) + P(\varnothing)`), T(String.raw`n(\text{no outcome}) = 0`)],
  [T(String.raw`P(A') = 1 - P(A)`), T(String.raw`A \cap A' = \varnothing,\ A \cup A' = S`), T(String.raw`P(A') = P(\{\text{TTTT}\}) = \dfrac{1}{16},\ P(A) = \dfrac{15}{16}`)],
  [T(String.raw`0 \le P(E) \le 1`), T(String.raw`P(E) + P(E') = 1\ \text{and both} \ge 0`), T(String.raw`\dfrac{15}{16}\ \text{lies in}\ [0, 1]`)],
], 'Table of consequences of the axioms: the impossible event has probability zero; the probability of not A is one minus the probability of A because A and not A are mutually exclusive and make up the whole sample space; every probability lies between zero and one. Checked by tossing a coin four times, where at least one head has probability fifteen sixteenths and no head has one sixteenth.', 'Count the complement when "at least one" is awkward to count directly.');

// probability Venn for WE3 of deck 2: P(A) = 0.48, P(B) = 0.35, P(A n B) = 0.16
const pA = fr('0.48'), pB = fr('0.35'), pAB = fr('0.16');
const pU = pA.add(pB).sub(pAB), pNei = pU.comp(), pAonly = pA.sub(pAB), pBonly = pB.sub(pAB);
must(pU.eq('0.67') && pNei.eq('0.33') && pAonly.eq('0.32') && pBonly.eq('0.19') && pAonly.add(pAB).add(pBonly).add(pNei).eq(1), 'we3 probabilities');
export const vennProb = venn({ a: 'A', b: 'B', regions: [pAonly.dec(), pAB.dec(), pBonly.dec(), pNei.dec()], alt: 'Venn diagram of two overlapping events with probabilities written in each region: A alone 0.32, both A and B 0.16, B alone 0.19, and neither event 0.33. The four regions add up to 1.', caption: '$P(A) = 0.32 + 0.16$, $P(B) = 0.19 + 0.16$, and the four regions add to $1$.' });
export const tblAddition = table(['Quantity', 'Formula', 'Value'], [
  [T(String.raw`P(A \cup B)`), T(String.raw`P(A) + P(B) - P(A \cap B)`), T('0.48 + 0.35 - 0.16 = 0.67')],
  [T(String.raw`P(\text{neither})`), T(String.raw`1 - P(A \cup B)`), T('1 - 0.67 = 0.33')],
  [T(String.raw`P(A\ \text{but not}\ B)`), T(String.raw`P(A) - P(A \cap B)`), T('0.48 - 0.16 = 0.32')],
  [T(String.raw`P(\text{exactly one})`), T(String.raw`P(A \cup B) - P(A \cap B)`), T('0.67 - 0.16 = 0.51')],
], 'Working table for P(A) 0.48, P(B) 0.35 and P(A and B) 0.16: the probability of A or B is 0.67; neither is 0.33; A but not B is 0.32; exactly one of the two is 0.51.', 'Subtract the overlap once: it was counted in both $P(A)$ and $P(B)$.');
must(pU.sub(pAB).eq('0.51') && pNei.eq(pU.comp()), 'exactly one');

// WE4 of deck 2: two dice, A: differ by at most 1; B: sum is a multiple of 4
const dA = ev(dice2, (o) => Math.abs(o.a - o.b) <= 1), dB = ev(dice2, (o) => o.a + o.b === 4 || o.a + o.b === 8 || o.a + o.b === 12);
const dL = laws(dice2, dA, dB);
must(dA.length === 16 && dB.length === 9 && inter(dice2, dA, dB).length === 3 && uni(dice2, dA, dB).length === 22 && dL.pu.eq(fr(11, 18)), 'dice WE4');
export const we4dTbl = table(['Step', 'Working'], [
  ['Sample space', T('n(S) = 36')],
  ['$A$: the numbers differ by at most 1', T('n(A) = 6 + 10 = 16')],
  ['$B$: the sum is 4, 8 or 12', T('n(B) = 3 + 5 + 1 = 9')],
  [T(String.raw`A \cap B`), T(String.raw`\{(2, 2), (4, 4), (6, 6)\}`) + ', 3 outcomes'],
  ['Addition theorem', T(String.raw`P(A \cup B) = \dfrac{16}{36} + \dfrac{9}{36} - \dfrac{3}{36} = \dfrac{22}{36} = \dfrac{11}{18}`)],
  ['Direct count', T('n(A \\cup B) = 22,\\ \\text{the same}')],
], 'Working table for two dice thrown together: event A, the numbers differ by at most 1, has 16 outcomes; event B, the sum is 4, 8 or 12, has 9; both together have the 3 doubles (2,2), (4,4), (6,6); the addition theorem gives 16 plus 9 minus 3 over 36, which is 22 over 36, or 11 over 18, and counting the union directly gives 22 outcomes as well.', 'The theorem and the direct count agree.');

// validity of assignments
const assigns = [
  ['0.3, 0.3, 0.3, 0.3', ['0.3', '0.3', '0.3', '0.3']],
  ['0.2, 0.5, 0.1, 0.2', ['0.2', '0.5', '0.1', '0.2']],
  ['0.6, 0.5, -0.2, 0.1', ['0.6', '0.5', '-0.2', '0.1']],
  ['0.25, 0.25, 0.25', ['0.25', '0.25', '0.25']],
];
const valid = (xs) => xs.every((x) => fr(x).n >= 0) && xs.reduce((a, x) => a.add(x), new Fr(0)).eq(1);
const totalOf = (xs) => xs.reduce((a, x) => a.add(x), new Fr(0));
must(assigns.map(([, xs]) => valid(xs)).join() === 'false,true,false,false', 'validity');
export const tblValid = table(['Probabilities assigned to the outcomes', 'Total', 'Any negative?', 'Valid?'], assigns.map(([t, xs]) => [t, totalOf(xs).dec(), yn(xs.some((x) => fr(x).n < 0)), yn(valid(xs))]),
  'Table testing four assignments of probabilities. 0.3, 0.3, 0.3, 0.3 totals 1.2, so it is not valid. 0.2, 0.5, 0.1, 0.2 totals 1 with none negative, so it is valid. 0.6, 0.5, minus 0.2, 0.1 totals 1 but has a negative value, so it is not valid. 0.25, 0.25, 0.25 totals 0.75, so it is not valid.', 'A valid assignment has no negative entry and total exactly $1$.');

export const flowWhich = flow('TB', [['a', 'Is the sample space equally likely?'], ['b', 'Count: n(E) over n(S)'], ['c', 'Use given or weighted probabilities'], ['d', 'Want not A? Use 1 minus P(A)'], ['e', 'Want A or B? Use the addition theorem'], ['f', 'A and B exclusive? Drop the overlap']], [['a', 'b', 'yes'], ['a', 'c', 'no'], ['b', 'd'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart for choosing a method: if outcomes are equally likely, count favourable over total, otherwise use the given or weighted probabilities; for not A use one minus P of A; for A or B use the addition theorem; if A and B are mutually exclusive the overlap term is zero.', 'Pick counting or weights first, then the rule for the event you need.');

export const summary2 = table(['Result', 'Formula', 'Condition'], [
  ['Axioms', T(String.raw`P(E) \ge 0,\ P(S) = 1`), 'Always'],
  ['Equally likely', T(String.raw`P(E) = \dfrac{n(E)}{n(S)}`), 'All outcomes equally likely'],
  ['Complement', T(String.raw`P(A') = 1 - P(A)`), 'Always'],
  ['Addition theorem', T(String.raw`P(A \cup B) = P(A) + P(B) - P(A \cap B)`), 'Always'],
  ['Exclusive events', T(String.raw`P(A \cup B) = P(A) + P(B)`), T(String.raw`A \cap B = \varnothing`)],
  ['A but not B', T(String.raw`P(A \cap B') = P(A) - P(A \cap B)`), 'Always'],
], 'Summary table of probability rules: the axioms; the equally likely formula; the complement rule; the addition theorem; the simpler sum rule for mutually exclusive events; and the probability of A but not B.', 'These six lines solve every question in the chapter.');


// WE2 of deck 2: at least one head in four tosses, by the complement
export const we2dTbl = table(['Step', 'Working'], [
  ['Sample space', T(String.raw`n(S) = 2 \times 2 \times 2 \times 2 = 16`)],
  [T('A'), '"at least one head"; counting it directly is long'],
  [T("A'"), T(String.raw`\{\text{TTTT}\}`) + ', one outcome'],
  [T("P(A')"), T(String.raw`\dfrac{1}{16}`)],
  [T('P(A)'), T(String.raw`1 - \dfrac{1}{16} = \dfrac{15}{16}`)],
], 'Working table for tossing a coin four times: 16 outcomes in all; the event at least one head is awkward to count, but its complement, no head, is the single outcome tails tails tails tails with probability one sixteenth; so the probability of at least one head is one minus one sixteenth, which is fifteen sixteenths.', 'When "at least one" is hard to count, count "none" and subtract from $1$.');

// the special case of mutually exclusive events and the related events
const xa = fr('0.26'), xb = fr('0.47');
must(xa.add(xb).eq('0.73') && xa.add(xb).comp().eq('0.27'), 'exclusive special case');
export const tblExclSpecial = table(['Situation', 'Rule', 'Example'], [
  ['$A$, $B$ mutually exclusive', T(String.raw`P(A \cup B) = P(A) + P(B)`), T('0.26 + 0.47 = 0.73')],
  ['Neither occurs', T(String.raw`P(A' \cap B') = 1 - P(A \cup B)`), T('1 - 0.73 = 0.27')],
  ['$A$, $B$ also exhaustive', T('P(A) + P(B) = 1'), T('0.4 + 0.6 = 1')],
], 'Table of the simpler rules for mutually exclusive events: the probability of A or B is the sum, for example 0.26 plus 0.47 is 0.73; the probability of neither is one minus that, 0.27; if the two events are also exhaustive their probabilities add to one, for example 0.4 plus 0.6.', 'No overlap means nothing to subtract.');

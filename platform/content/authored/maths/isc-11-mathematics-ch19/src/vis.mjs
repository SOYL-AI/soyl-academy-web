// Visuals for ISC 11 Mathematics ch19 Probability. Every number in a table or figure is computed here by enumerating a sample space with
// exact rationals (prob.mjs) and asserted. Venn diagrams are not in the plot spec, so the chapter uses tables, tree flows and bar charts.
import { table, flow, plot } from './lib.mjs';
import { fr, F, T, mt, setTex, must, choose, cart, subsets, range, dec, Space, addOK, addOK3, assignVerdict, mutuallyExclusive, exhaustive, COIN3, TETRA2, DIG, CARDS, CARDSP, cardOf, tiles, isPrime, sumF } from './prob.mjs';

const r = String.raw;
export { must };
export const V = {};
const set = (os) => T(setTex(os));
const yn = (b) => (b ? 'yes' : 'no');

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Random experiments and sample spaces'], ['b', 'Counting the outcomes'], ['c', 'Events as sets'], ['d', 'Not, and, or'], ['e', 'Mutually exclusive and exhaustive']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: random experiments and sample spaces, counting the outcomes, events as sets, the events not, and, or, and mutually exclusive and exhaustive events.', 'Part 1 at a glance.');
V.goals1 = table(['You will be able to', 'Using', 'Key result'], [
  ['List the sample space of an experiment', 'set notation', T(r`S = \{\omega_1, \omega_2, \dots, \omega_n\}`)],
  ['Count outcomes without listing them', 'products and combinations', T(r`n(S) = n_1 \times n_2, \quad \dbinom{n}{r}`)],
  ['Describe an event as a subset of $S$', 'sure, impossible, simple, compound', T(r`E \subseteq S`)],
  ['Build not, and, or events', 'complement, intersection, union', T(r`A', \; A \cap B, \; A \cup B`)],
  ['Test two events', 'common outcomes and the union', T(r`A \cap B = \varnothing, \quad A \cup B = S`)],
], 'Table of goals for Part 1: listing a sample space, counting outcomes, treating events as subsets, building not, and, or events, and testing for mutually exclusive and exhaustive events.', 'What Part 1 covers.');

// random experiments
{
  const L4 = [1, 2, 3, 4];
  const rows = [
    ['A coin is tossed three times and the faces are noted in order', T(mt('HTH')), COIN3.n],
    ['A four-sided die is rolled twice and the two scores are noted in order', T(mt([2, 4])), cart(L4, L4).length],
    ['One tile is drawn from tiles numbered $1$ to $12$', T('7'), 12],
    ['Two of four lamps $L_1$ to $L_4$ are switched on together', T(r`\{L_1, L_3\}`), subsets(['L1', 'L2', 'L3', 'L4'], 2).length],
  ];
  must(rows.map((x) => x[2]).join() === '8,16,12,6' && choose(4, 2) === 6, 'experiment counts');
  V.expts = table(['Random experiment', 'One outcome', 'Number of outcomes'], rows.map(([a, b, c]) => [a, b, T(String(c))]), 'Table of four random experiments with one sample outcome of each and the number of outcomes: three tosses of a coin give 8, two rolls of a four-sided die give 16, a tile from twelve gives 12, and two of four lamps give 6.', 'The outcomes are all the results that can happen.');
}
// sample spaces in set notation
{
  const coin2 = cart(['H', 'T'], ['H', 'T']).map((a) => a.join('')), die = [1, 2, 3, 4], ct = cart(['H', 'T'], die).map((a) => a.join(''));
  must(coin2.length === 4 && ct.length === 8 && ct.join() === 'H1,H2,H3,H4,T1,T2,T3,T4', 'sample spaces');
  V.spaces = table(['Experiment', 'Sample space $S$', '$n(S)$'], [
    ['A coin is tossed once', set(['H', 'T']), T('2')],
    ['A coin is tossed twice, faces in order', set(coin2), T(String(coin2.length))],
    ['A four-sided die is rolled once', set(die), T('4')],
    ['A coin is tossed and then a four-sided die is rolled', set(ct), T(String(ct.length))],
  ], 'Table of sample spaces in set notation: a coin once is H, T; a coin twice is HH, HT, TH, TT with 4 outcomes; a four-sided die is 1 to 4; a coin and then a die gives the 8 outcomes H1 to H4 and T1 to T4.', 'Write $S$ as a set and count its elements.');
}
// we1: tile then coin, tree
{
  const tl = ['R1', 'R2', 'G1'], S = cart(tl, ['H', 'T']).map((a) => a.join(', '));
  must(S.length === 6 && new Space(S).n === 6, 'tree 1');
  const nodes = [['s', 'Draw a tile, then toss a coin'], ...tl.map((t, i) => [`t${i}`, t]), ...tl.flatMap((t, i) => ['H', 'T'].map((c) => [`t${i}${c}`, `${t}, ${c}`]))];
  const edges = [...tl.map((t, i) => ['s', `t${i}`]), ...tl.flatMap((t, i) => ['H', 'T'].map((c) => [`t${i}`, `t${i}${c}`, c]))];
  V.tree1 = flow('LR', nodes, edges, 'Tree diagram of drawing one tile from R1, R2 and G1 and then tossing a coin: each of the three tiles splits into heads and tails, giving the six outcomes R1 H, R1 T, R2 H, R2 T, G1 H and G1 T.', 'Three tiles times two faces give $6$ outcomes.');
}
// grid of two four-sided dice
{
  const L4 = [1, 2, 3, 4];
  const rows = L4.map((a) => [T(String(a)), ...L4.map((b) => T(mt([a, b])))]);
  must(TETRA2.n === 16 && rows.length === 4 && TETRA2.cnt(([a, b]) => a + b === 5) === 4, 'grid');
  V.grid = table(['First \\ second', '$1$', '$2$', '$3$', '$4$'], rows, 'Outcome grid of two rolls of a four-sided die: four rows for the first score and four columns for the second score give the 16 ordered pairs; the pairs with sum 5 are 1 and 4, 2 and 3, 3 and 2, and 4 and 1.', '$4 \\times 4 = 16$ equally likely pairs.');
}
// ordered or unordered
{
  const books = ['B1', 'B2', 'B3', 'B4', 'B5'];
  const together = subsets(books, 2).length, ordered = cart(books, books).filter(([a, b]) => a !== b).length, back = cart(books, books).length;
  must(together === 10 && ordered === 20 && back === 25 && choose(5, 2) === 10, 'books');
  V.books = table(['Two books from five', 'Rule', 'Outcomes'], [
    ['Taken together (order does not matter)', T(r`\dbinom{5}{2} = \dfrac{5 \times 4}{2}`), T('10')],
    ['One after the other, none returned', T(r`5 \times 4`), T('20')],
    ['One after the other, each returned', T(r`5 \times 5`), T('25')],
  ], 'Table comparing three ways of taking two books from five: together gives 10 outcomes, one after the other without return gives 20 ordered pairs, and one after the other with return gives 25 ordered pairs.', 'The wording of the experiment decides the sample space.');
}
// we2: bag with 3 R, 2 G, 1 Y, two together
{
  const bag = ['R1', 'R2', 'R3', 'G1', 'G2', 'Y1'], prs = subsets(bag, 2);
  const cls = (p) => p.map((x) => x[0]).sort().join('');
  const n = (k) => prs.filter((p) => cls(p) === k).length;
  must(prs.length === 15 && n('RR') === 3 && n('GG') === 1 && n('GR') === 6 && n('RY') === 3 && n('GY') === 2 && n('YY') === 0 && 3 + 1 + 6 + 3 + 2 === 15, 'bag pairs');
  V.we2 = table(['Colours of the two tiles', 'Ways', 'Count'], [['Both red', T(r`\dbinom{3}{2}`), T('3')], ['Both green', T(r`\dbinom{2}{2}`), T('1')], ['One red, one green', T(r`3 \times 2`), T('6')], ['One red, one yellow', T(r`3 \times 1`), T('3')], ['One green, one yellow', T(r`2 \times 1`), T('2')], ['Total', T(r`\dbinom{6}{2}`), T('15')]], 'Table of the ways to take two tiles together from a bag of 3 red, 2 green and 1 yellow tile: red red 3, green green 1, red green 6, red yellow 3, green yellow 2, total 15.', 'The five kinds of pair add up to $15$.');
}
// events table on three tosses
{
  const S = COIN3, ev = (p) => S.ev(p);
  const E = [['The sure event: some outcome occurs', ev(() => true), 'sure'], ['Four heads in three tosses', ev(() => false), 'impossible'], ['All three tosses show heads', ev((o) => o === 'HHH'), 'simple'], ['Exactly two heads', ev((o) => [...o].filter((c) => c === 'H').length === 2), 'compound'], ['At least one tail', ev((o) => o.includes('T')), 'compound']];
  must(E.map((e) => e[1].length).join() === '8,0,1,3,7', 'events table');
  V.events = table(['Event (three tosses of a coin)', 'As a set', 'Outcomes', 'Kind'], E.map(([w, l, k]) => [w, set(l), T(String(l.length)), k]), 'Table of events of three tosses of a coin: the sure event has all 8 outcomes, four heads is impossible with none, all heads is a simple event with 1, exactly two heads has 3 outcomes and at least one tail has 7.', 'An event is a subset of $S$.');
}
// we3: two-way table of the twelve cards
{
  const cols = ['Red', 'Blue', 'Green', 'Yellow'], shapes = ['star', 'moon', 'sun'];
  const cnt = (c, s) => CARDS.filter((x) => x[1] === c && x[2] === s).length;
  const rows = cols.map((c) => [c, ...shapes.map((s) => T(String(cnt(c, s)))), T(String(CARDS.filter((x) => x[1] === c).length))]);
  const tot = shapes.map((s) => CARDS.filter((x) => x[2] === s).length);
  must(rows.map((x) => x[4]).join() === '$3$,$4$,$3$,$2$' && tot.join() === '4,4,4' && CARDS.length === 12 && cnt('Red', 'star') === 2, 'cards table');
  V.we3 = table(['Colour', 'star', 'moon', 'sun', 'Total'], [...rows, ['Total', ...tot.map((t) => T(String(t))), T('12')]], 'Two-way table of the 12 game cards by colour and shape: red has 2 stars, 1 moon and 0 suns; blue has 1, 2 and 1; green has 1, 0 and 2; yellow has 0, 1 and 1; the shape totals are 4, 4 and 4.', 'Read each event as a set of cards.');
}
// not, and, or
{
  const S = tiles(1, 10), A = (x) => x % 2 === 0, B = (x) => x > 6, ev = (p) => S.ev(p);
  const R = [['not $A$', T("A'"), ev((x) => !A(x))], ['$A$ and $B$', T(r`A \cap B`), ev((x) => A(x) && B(x))], ['$A$ or $B$ (or both)', T(r`A \cup B`), ev((x) => A(x) || B(x))], ['$A$ but not $B$', T(r`A \cap B'`), ev((x) => A(x) && !B(x))], ['neither $A$ nor $B$', T(r`(A \cup B)'`), ev((x) => !A(x) && !B(x))]];
  must(R.map((x) => x[2].join(',')).join('|') === '1,3,5,7,9|8,10|2,4,6,7,8,9,10|2,4,6|1,3,5' && ev((x) => !A(x) && !B(x)).join() === '1,3,5' && ev((x) => A(x) || B(x)).join() === '2,4,6,7,8,9,10', 'not and or');
  V.notevents = table(['In words', 'Set', 'Tiles $1$ to $10$, $A$ even, $B$ more than $6$'], R.map(([w, s, l]) => [w, s, set(l)]), 'Table of the not, and, or events with set symbols for tiles numbered 1 to 10 with A the even numbers and B the numbers more than 6: not A is 1, 3, 5, 7, 9; A and B is 8, 10; A or B is 2, 4, 6, 7, 8, 9, 10; A but not B is 2, 4, 6; neither is 1, 3, 5.', 'Not is a complement, and is an intersection, or is a union.');
}
// we4: digits
{
  const S = DIG, A = (x) => x % 2 === 0, B = (x) => x > 30;
  must(S.n === 12 && S.cnt(A) === 6 && S.cnt(B) === 6 && S.ev((x) => A(x) && B(x)).join() === '32,34,42' && S.cnt((x) => A(x) || B(x)) === 9 && S.ev((x) => !A(x)).join() === '13,21,23,31,41,43' && S.ev((x) => A(x) && !B(x)).join() === '12,14,24', 'digits events');
  V.we4 = table(['Number', '$A$: even', '$B$: more than $30$'], S.outs.map((x) => [T(String(x)), yn(A(x)), yn(B(x))]), 'Table of the 12 two-digit numbers made from two different digits of 1, 2, 3, 4, marking each as even and as more than 30: six are even, six exceed 30, three are both (32, 34, 42), and nine are in at least one.', 'Tick each number for $A$ and for $B$.');
}
// mutually exclusive on tiles 1..12
{
  const S = tiles(1, 12), pr = isPrime;
  const pairs = [['less than $4$', (x) => x < 4, 'more than $9$', (x) => x > 9], ['even', (x) => x % 2 === 0, 'a multiple of $3$', (x) => x % 3 === 0], ['prime', pr, 'a multiple of $4$', (x) => x % 4 === 0], ['at most $6$', (x) => x <= 6, 'at least $6$', (x) => x >= 6]];
  const rows = pairs.map(([a, fa, b, fb]) => { const c = S.ev((x) => fa(x) && fb(x)); return [`${a} and ${b}`, set(c), yn(c.length === 0)]; });
  must(rows.map((x) => x[2]).join() === 'yes,no,yes,no' && rows[1][1] === T(r`\{6, 12\}`) && rows[3][1] === T(r`\{6\}`), 'mutually exclusive rows');
  V.mex = table(['Two events (tile from $1$ to $12$)', 'Common outcomes', 'Mutually exclusive?'], rows, 'Table testing four pairs of events for tiles numbered 1 to 12: less than 4 and more than 9 have no common tile, even and multiple of 3 share 6 and 12, prime and multiple of 4 share none, and at most 6 and at least 6 share the tile 6.', 'No common outcome means mutually exclusive.');
}
// exhaustive on tiles 1..12
{
  const S = tiles(1, 12);
  const comp = (x) => x > 1 && !isPrime(x); // composite numbers up to 12: 4, 6, 8, 9, 10, 12
  must(S.ev(comp).join() === '4,6,8,9,10,12', 'composites');
  const sets = [['at most $6$', (x) => x <= 6, 'at least $6$', (x) => x >= 6], ['odd', (x) => x % 2 === 1, 'a multiple of $4$', (x) => x % 4 === 0], ['prime', isPrime, 'composite', comp]];
  const rows = sets.map(([a, fa, b, fb]) => { const miss = S.ev((x) => !fa(x) && !fb(x)); return [`${a} and ${b}`, set(miss), yn(miss.length === 0)]; });
  must(rows.map((x) => x[2]).join() === 'yes,no,no' && rows[1][1] === T(r`\{2, 6, 10\}`) && rows[2][1] === T(r`\{1\}`), 'exhaustive rows');
  V.exh = table(['Two events (tile from $1$ to $12$)', 'Outcomes in neither', 'Exhaustive?'], rows, 'Table testing three pairs of events for tiles numbered 1 to 12: at most 6 and at least 6 miss no tile, odd and multiple of 4 miss 2, 6 and 10, and prime with composite misses the tile 1.', 'No outcome left out means exhaustive.');
}
// we5: digits less than 25 / more than 30
{
  const S = DIG, E1 = (x) => x < 25, E2 = (x) => x > 30;
  must(S.ev(E1).join() === '12,13,14,21,23,24' && S.ev(E2).join() === '31,32,34,41,42,43' && mutuallyExclusive(S, E1, E2) && exhaustive(S, E1, E2), 'we5 digits');
  V.we5 = table(['Check', 'Work'], [['$E_1$: less than $25$', set(S.ev(E1))], ['$E_2$: more than $30$', set(S.ev(E2))], [r`$E_1 \cap E_2$`, T(r`\varnothing`) + ' (mutually exclusive)'], [r`$E_1 \cup E_2$`, T(r`6 + 6 = 12 = n(S)`) + ' (exhaustive)']], 'Table for two-digit numbers from the digits 1 to 4 with no repeat: less than 25 gives six numbers, more than 30 gives six numbers, they have nothing in common, and together they make all 12, so they are mutually exclusive and exhaustive.', 'No common number, and all $12$ covered.');
}
// sums of two dice, bar chart
{
  const cnt = range(2, 8).map((s) => TETRA2.cnt(([a, b]) => a + b === s));
  must(cnt.join() === '1,2,3,4,3,2,1' && cnt.reduce((a, b) => a + b) === 16, 'sum counts');
  V.sums = plot({ x: [1, 9], y: [0, 5], xl: 'sum of the two scores', yl: 'outcomes of the 16', series: [{ label: 'outcomes', points: range(2, 8).map((s, i) => [s, cnt[i]]), kind: 'bar' }] }, 'Bar chart of the number of the 16 pairs giving each sum of two rolls of a four-sided die: sums 2 to 8 have 1, 2, 3, 4, 3, 2 and 1 pairs, so the seven sums are not equally likely.', 'The sum $5$ has $4$ pairs; the sum $2$ has $1$.');
}
// we6: three tosses
{
  const S = COIN3, h = (o) => [...o].filter((c) => c === 'H').length;
  const P = [['exactly two heads', (o) => h(o) === 2, 'at least two tails', (o) => 3 - h(o) >= 2], ['first toss head', (o) => o[0] === 'H', 'first toss tail', (o) => o[0] === 'T'], ['at most one head', (o) => h(o) <= 1, 'at least one head', (o) => h(o) >= 1]];
  const rows = P.map(([a, fa, b, fb]) => [`${a}; ${b}`, T(String(S.cnt((o) => fa(o) && fb(o)))), T(String(S.cnt((o) => fa(o) || fb(o)))), yn(mutuallyExclusive(S, fa, fb)), yn(exhaustive(S, fa, fb))]);
  must(rows.map((x) => x.slice(1).join('|')).join() === '$0$|$7$|yes|no,$0$|$8$|yes|yes,$3$|$8$|no|yes', 'we6 rows');
  V.we6 = table(['Pair of events (three tosses)', 'Common', 'In the union', 'Mutually exclusive', 'Exhaustive'], rows, 'Table classifying three pairs of events of three coin tosses: exactly two heads with at least two tails are exclusive but not exhaustive, first toss head with first toss tail are both, and at most one head with at least one head are exhaustive but not exclusive.', 'Test the overlap and the union separately.');
}
V.sum1 = table(['Idea', 'Remember'], [['Sample space', T(r`S`) + ' is the set of all outcomes; check the order and the returning of items'], ['Counting', T(r`n_1 \times n_2`) + ' for stages, ' + T(r`\dbinom{n}{r}`) + ' for a selection together'], ['Event', 'A subset of $S$: sure ($S$), impossible ($\\varnothing$), simple, compound'], ['Not, and, or', T(r`A', \; A \cap B, \; A \cup B`)], ['Exclusive and exhaustive', T(r`A \cap B = \varnothing`) + ' and ' + T(r`A \cup B = S`) + ' are separate tests']], 'Summary table of Part 1: the sample space, counting, events, the not, and, or events, and mutually exclusive and exhaustive events.', 'Part 1 in five lines.');
V.tips1 = table(['Do', 'Avoid'], [['Say whether order matters and whether items are returned', 'Listing outcomes before reading the experiment'], ['Write events as sets before counting', 'Mixing up ' + T(r`\cap`) + ' and ' + T(r`\cup`)], ['Test exclusive and exhaustive separately', 'Treating "no common outcome" as "covers everything"'], ['Count with a product or a combination for large spaces', 'Writing a long list with a missing outcome']], 'Table of exam tips for Part 1: state the order and return rules, write events as sets, test exclusive and exhaustive separately, and count with products or combinations for large spaces.', 'Habits that save marks.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'The axioms of probability'], ['b', 'Valid assignments'], ['c', 'Classical probability and counting'], ['d', 'Not: the complement'], ['e', 'Or: the addition theorem']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the axioms of probability, valid assignments to outcomes, classical probability and counting, the complement rule and the addition theorem.', 'Part 2 at a glance.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Check a probability assignment', 'the three axioms', T(r`P(\omega_i) \ge 0, \; \sum P(\omega_i) = 1`)],
  ['Find unknown probabilities', 'total equal to one', 'solve for $k$'],
  ['Use equally likely outcomes', 'counting and combinations', T(r`P(E) = \dfrac{n(E)}{n(S)}`)],
  ['Find the chance of "not"', 'the complement', T(r`P(A') = 1 - P(A)`)],
  ['Find the chance of "or"', 'the addition theorem', T(r`P(A \cup B) = P(A) + P(B) - P(A \cap B)`)],
], 'Table of goals for Part 2: checking a probability assignment, finding unknown probabilities, equally likely outcomes, the complement rule and the addition theorem.', 'What Part 2 covers.');
// axioms
{
  const S = new Space([1, 2, 3, 4]);
  must(S.P((o) => o === 1).eq(F(1, 4)) && S.P((o) => o <= 2).eq(F(1, 2)) && S.P((o) => o === 1 || o === 2).eq(S.P((o) => o === 1).add(S.P((o) => o === 2))) && S.P(() => true).eq(1), 'axioms table');
  V.axioms = table(['Axiom', 'In words', 'Fair four-sided die'], [
    [T(r`P(E) \ge 0`), 'No event has a negative probability', T(r`P(\{3\}) = \dfrac{1}{4} \ge 0`)],
    [T(r`P(S) = 1`), 'Some outcome is certain to occur', T(r`P(\{1, 2, 3, 4\}) = 1`)],
    [T(r`E \cap F = \varnothing \Rightarrow P(E \cup F) = P(E) + P(F)`), 'For events that cannot occur together, the probabilities add', T(r`P(\{1, 2\}) = \dfrac{1}{4} + \dfrac{1}{4} = \dfrac{1}{2}`)],
  ], 'Table of the three axioms of probability with their meaning and an example on a fair four-sided die: probabilities are not negative, the whole sample space has probability 1, and for events with no common outcome the probabilities add.', 'Everything else follows from these three.');
}
// assignments
{
  const A = [['$0.3, 0.25, 0.2, 0.25$', [dec('0.3'), dec('0.25'), dec('0.2'), dec('0.25')]], [r`$\dfrac{1}{2}, \dfrac{1}{4}, \dfrac{1}{8}, \dfrac{1}{16}$`, [F(1, 2), F(1, 4), F(1, 8), F(1, 16)]], ['$0.5, 0.6, -0.2, 0.1$', [dec('0.5'), dec('0.6'), dec('-0.2'), dec('0.1')]], ['$0.45, 0.35, 0.3, 0.1$', [dec('0.45'), dec('0.35'), dec('0.3'), dec('0.1')]], [r`$\dfrac{1}{2}, \dfrac{1}{4}, \dfrac{1}{8}, \dfrac{1}{8}$`, [F(1, 2), F(1, 4), F(1, 8), F(1, 8)]]];
  const v = A.map((a) => assignVerdict(a[1]));
  must(v.map((x) => x.ok).join() === 'true,false,false,false,true' && v[1].total.eq(F(15, 16)) && v[2].why === 'negative' && v[2].total.eq(1) && v[3].total.eq(dec('1.2')), 'assign');
  V.assign = table(['Probabilities of $a, b, c, d$', 'Sum', 'Valid?', 'Reason'], A.map(([t, w], i) => [t, T(sumF(w).dtex()), yn(v[i].ok), v[i].ok ? 'all at least $0$, sum $1$' : v[i].why === 'negative' ? 'one value is negative' : 'the sum is not $1$']), 'Table testing five assignments of probabilities to four outcomes: 0.3, 0.25, 0.2, 0.25 is valid; one half, quarter, eighth, sixteenth sums to fifteen sixteenths; 0.5, 0.6, minus 0.2, 0.1 has a negative value; 0.45, 0.35, 0.3, 0.1 sums to 1.2; one half, quarter, eighth, eighth is valid.', 'Two tests: no negative value, and a total of $1$.');
}
// we1: find k
{
  const k = fr(9, 10).div(6);
  must(k.eq(dec('0.15')) && sumF([k, k.mul(2), k.mul(3), dec('0.1')]).eq(1) && k.mul(1).add(k.mul(3)).eq(dec('0.6')) && range(1, 100).filter((i) => fr(i, 100).mul(6).add(dec('0.1')).eq(1)).join() === '15', 'k = 0.15');
  V.we1d2 = plot({ x: [0, 5], y: [0, 0.5], xl: 'outcome (a = 1, b = 2, c = 3, d = 4)', yl: 'probability', series: [{ label: 'probability', points: [[1, 0.15], [2, 0.3], [3, 0.45], [4, 0.1]], kind: 'bar' }] }, 'Bar chart of the probabilities 0.15, 0.30, 0.45 and 0.10 of the four outcomes a, b, c and d, which add up to 1.', 'Total probability $0.15 + 0.3 + 0.45 + 0.1 = 1$.');
}
// classical
{
  const S = TETRA2;
  const R = [['the two scores are equal', ([a, b]) => a === b], ['the sum of the scores is $7$', ([a, b]) => a + b === 7], ['the first score is larger', ([a, b]) => a > b]];
  const rows = R.map(([w, p]) => [w, T(String(S.cnt(p))), T('16'), T(S.P(p).tex())]);
  must(rows.map((x) => x[1]).join() === '$4$,$2$,$6$' && S.P(R[0][1]).eq(F(1, 4)) && S.P(R[1][1]).eq(F(1, 8)) && S.P(R[2][1]).eq(F(3, 8)), 'classical rows');
  V.classical = table(['Event (two rolls of a four-sided die)', '$n(E)$', '$n(S)$', '$P(E)$'], rows, 'Table of probabilities for two rolls of a four-sided die with 16 equally likely pairs: equal scores 4 of 16 is one quarter, sum 7 is 2 of 16 which is one eighth, and the first score larger is 6 of 16 which is three eighths.', '$P(E) = n(E) / n(S)$.');
}
// we2d2: sum at least 6
{
  const S = TETRA2, p = ([a, b]) => a + b >= 6;
  const rows = [6, 7, 8].map((s) => [T(String(s)), set(S.ev(([a, b]) => a + b === s))]);
  must(S.cnt(p) === 6 && S.P(p).eq(F(3, 8)) && rows[0][1] === T(r`\{(2, 4), (3, 3), (4, 2)\}`) && rows[1][1] === T(r`\{(3, 4), (4, 3)\}`) && rows[2][1] === T(r`\{(4, 4)\}`), 'sum at least 6');
  V.we2d2 = table(['Sum', 'Pairs'], [...rows, ['Total', T(r`3 + 2 + 1 = 6`)]], 'Table of the pairs on two rolls of a four-sided die with sum at least 6: sum 6 has 3 pairs, sum 7 has 2 pairs and sum 8 has 1 pair, 6 pairs of 16 in all, so the probability is 3 over 8.', 'Six favourable pairs out of $16$.');
}
// combinations
{
  const R = [['A panel of $3$ from $8$ people', 8, 3], ['Two books from $5$', 5, 2], ['A committee of $4$ from $9$', 9, 4], ['Two lamps on from $6$ lamps', 6, 2]];
  const rows = R.map(([w, n, k]) => [w, T(String.raw`\dbinom{${n}}{${k}}`), T(String(choose(n, k)))]);
  must(rows.map((x) => x[2]).join() === '$56$,$10$,$126$,$15$' && subsets(range(1, 8), 3).length === 56 && subsets(range(1, 9), 4).length === 126 && choose(9, 4) === choose(9, 5), 'combos');
  V.combos = table(['Selection together', 'Rule', 'Equally likely outcomes'], rows, 'Table of selections made together and the number of equally likely outcomes: a panel of 3 from 8 gives 56, two books from 5 gives 10, a committee of 4 from 9 gives 126 and two lamps from 6 gives 15.', '$\\dbinom{n}{r}$ counts selections where order does not matter.');
}
// we3d2: 5 red 3 white, 3 together
{
  const bag = ['R1', 'R2', 'R3', 'R4', 'R5', 'W1', 'W2', 'W3'], tr = subsets(bag, 3);
  const k = (j) => tr.filter((t) => t.filter((x) => x[0] === 'R').length === j).length;
  must(tr.length === 56 && [0, 1, 2, 3].map(k).join() === '1,15,30,10' && choose(5, 2) * choose(3, 1) === 30 && F(30, 56).str() === '15/28', 'we3d2');
  V.we3d2 = table(['Red tiles drawn', 'Ways', 'Count'], [[T('0'), T(r`\dbinom{5}{0}\dbinom{3}{3}`), T('1')], [T('1'), T(r`\dbinom{5}{1}\dbinom{3}{2}`), T('15')], [T('2'), T(r`\dbinom{5}{2}\dbinom{3}{1}`), T('30')], [T('3'), T(r`\dbinom{5}{3}\dbinom{3}{0}`), T('10')], ['Total', T(r`\dbinom{8}{3}`), T('56')]], 'Table of the ways to draw three tiles together from 5 red and 3 white by the number of red tiles: 0 red 1 way, 1 red 15, 2 red 30, 3 red 10, total 56.', 'Exactly two red: $30$ of $56$.');
}
// complement
{
  const rows = [
    ['at least one head in $3$ tosses', 'no head', COIN3.P((o) => !o.includes('H')), COIN3.P((o) => o.includes('H'))],
    ['at least one score $4$ in two rolls of a four-sided die', 'no score $4$', TETRA2.P(([a, b]) => a !== 4 && b !== 4), TETRA2.P(([a, b]) => a === 4 || b === 4)],
    ['sum of two scores is not $5$', 'sum is $5$', TETRA2.P(([a, b]) => a + b === 5), TETRA2.P(([a, b]) => a + b !== 5)],
  ];
  must(rows.map((x) => x[2].str()).join() === '1/8,9/16,1/4' && rows.map((x) => x[3].str()).join() === '7/8,7/16,3/4' && rows.every((x) => x[2].add(x[3]).eq(1)), 'complement rows');
  V.compl = table(['Event $E$', 'Complement $E\'$', '$P(E\')$', '$P(E) = 1 - P(E\')$'], rows.map(([a, b, c, d]) => [a, b, T(c.tex()), T(d.tex())]), 'Table of three events and their complements: at least one head in three tosses has complement no head with probability one eighth, giving seven eighths; at least one score 4 in two rolls has complement with probability nine sixteenths, giving seven sixteenths; and the sum is not 5 gives three quarters.', 'Count the complement when it is smaller.');
}
// we4d2: three rolls of a four-sided die, at least one 1
{
  const S = new Space(cart([1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]).map((a) => a.join('')));
  const none = S.cnt((o) => !o.includes('1'));
  must(S.n === 64 && none === 27 && 3 ** 3 === 27 && S.cnt((o) => o.includes('1')) === 37 && S.P((o) => o.includes('1')).eq(F(37, 64)), 'we4d2');
  V.we4d2 = table(['Step', 'Count'], [['All outcomes', T(r`4 \times 4 \times 4 = 64`)], ['No score $1$ (each roll has $3$ choices)', T(r`3 \times 3 \times 3 = 27`)], ['At least one score $1$', T(r`64 - 27 = 37`)], ['Probability', T(r`\dfrac{37}{64}`)]], 'Table for three rolls of a four-sided die: 64 outcomes in all, 27 with no score 1, so 37 with at least one score 1 and probability 37 over 64.', 'Subtract the complement from the total.');
}
// addition theorem: class of 40
{
  const nS = 40, f = 24, c = 18, b = 7, only = [f - b, b, c - b, nS - (f + c - b)];
  must(only.join() === '17,7,11,5' && only.reduce((x, y) => x + y) === 40 && f + c - b === 35, 'class 40');
  V.addth = table(['Region', 'Meaning', 'Pupils', 'Probability'], [['Football only', r`$F \cap C'$`, only[0], fr(only[0], 40)], ['Both', r`$F \cap C$`, only[1], fr(only[1], 40)], ['Chess only', r`$F' \cap C$`, only[2], fr(only[2], 40)], ['Neither', r`$(F \cup C)'$`, only[3], fr(only[3], 40)]].map(([a, m, n, p]) => [a, m, T(String(n)), T(p.tex())]), 'Table of a class of 40 pupils, 24 in football F and 18 in chess C with 7 in both: football only 17, both 7, chess only 11, neither 5, with probabilities 17, 7, 11 and 5 over 40.', 'Add the football and chess counts, then subtract the overlap once.');
}
// we5d2 bar
{
  const p = [fr(17, 40), fr(7, 40), fr(11, 40), fr(5, 40)];
  must(sumF(p).eq(1) && p.map((x) => x.dtex()).join() === '0.425,0.175,0.275,0.125', 'bar regions');
  V.we5d2 = plot({ x: [0, 5], y: [0, 0.5], xl: 'region (1 football only, 2 both, 3 chess only, 4 neither)', yl: 'probability', series: [{ label: 'probability', points: p.map((x, i) => [i + 1, x.num()]), kind: 'bar' }] }, 'Bar chart of the four region probabilities for the class of 40: football only 0.425, both 0.175, chess only 0.275 and neither 0.125, which add up to 1.', 'The four regions add to $1$.');
}
// special: formulas with an example
{
  const pa = dec('0.6'), pb = dec('0.5'), pab = dec('0.3');
  const u = pa.add(pb).sub(pab), one = pa.add(pb).sub(pab.mul(2)), nei = fr(1).sub(u), nota = fr(1).sub(pa);
  must(u.eq(dec('0.8')) && one.eq(dec('0.5')) && nei.eq(dec('0.2')) && nota.eq(dec('0.4')) && one.eq(pa.sub(pab).add(pb.sub(pab))), 'special');
  V.special = table(['Event', 'Formula', '$P(A) = 0.6$, $P(B) = 0.5$, $P(A \\cap B) = 0.3$'], [
    [r`$A$ or $B$ (at least one)`, T(r`P(A) + P(B) - P(A \cap B)`), T(u.dtex())],
    ['not $A$', T(r`1 - P(A)`), T(nota.dtex())],
    ['neither $A$ nor $B$', T(r`1 - P(A \cup B)`), T(nei.dtex())],
    ['exactly one of $A$, $B$', T(r`P(A) + P(B) - 2P(A \cap B)`), T(one.dtex())],
    ['$A$ and $B$ exclusive: $A$ or $B$', T(r`P(A) + P(B)`), 'the overlap is $0$'],
  ], 'Table of formulas for or, not, neither, exactly one and mutually exclusive events with the values 0.8, 0.4, 0.2 and 0.5 for P(A) of 0.6, P(B) of 0.5 and P(A and B) of 0.3.', 'Every case is a rearrangement of one theorem.');
}
// we6d2
{
  const m = dec('0.7'), p = dec('0.6'), u = dec('0.9'), both = m.add(p).sub(u);
  must(both.eq(dec('0.4')) && m.sub(both).eq(dec('0.3')) && p.sub(both).eq(dec('0.2')) && fr(1).sub(u).eq(dec('0.1')) && m.sub(both).add(both).add(p.sub(both)).add(fr(1).sub(u)).eq(1), 'we6d2');
  V.we6d2 = table(['Event', 'How', 'Probability'], [['Passes both', T(r`0.7 + 0.6 - 0.9`), T('0.4')], ['Mathematics only', T(r`0.7 - 0.4`), T('0.3')], ['Physics only', T(r`0.6 - 0.4`), T('0.2')], ['Neither', T(r`1 - 0.9`), T('0.1')], ['Total', T(r`0.4 + 0.3 + 0.2 + 0.1`), T('1')]], 'Table for a student with P(pass mathematics) 0.7, P(pass physics) 0.6 and P(pass at least one) 0.9: both 0.4, mathematics only 0.3, physics only 0.2, neither 0.1, total 1.', 'Find the overlap first.');
}
// we7d2: digits two methods
{
  const S = DIG, A = (x) => x % 2 === 0, B = (x) => x > 30, o = addOK(S, A, B);
  must(o.ok && o.pa.eq(F(1, 2)) && o.pb.eq(F(1, 2)) && o.pab.eq(F(1, 4)) && o.pu.eq(F(3, 4)) && S.cnt((x) => A(x) || B(x)) === 9, 'we7d2');
  V.we7d2 = table(['Route', 'Work', 'Result'], [['Direct count', T(r`\{12, 14, 24, 31, 32, 34, 41, 42, 43\}`), T(r`\dfrac{9}{12}`)], [r`$P(A)$, $P(B)$`, T(r`\dfrac{6}{12}, \; \dfrac{6}{12}`), T(r`\dfrac{1}{2}, \dfrac{1}{2}`)], [r`$P(A \cap B)$`, T(r`\{32, 34, 42\}`), T(r`\dfrac{3}{12} = \dfrac{1}{4}`)], ['Addition theorem', T(r`\dfrac{1}{2} + \dfrac{1}{2} - \dfrac{1}{4}`), T(r`\dfrac{3}{4}`)]], 'Table showing that for the 12 two-digit numbers from the digits 1 to 4, with A even and B more than 30, counting the union gives 9 over 12 and the addition theorem gives one half plus one half minus one quarter, both three quarters.', 'Two routes, one answer.');
}
// three events formula
V.three = table(['Term', 'Sign', 'Meaning'], [[T(r`P(A) + P(B) + P(C)`), '$+$', 'each event counted once'], [T(r`P(A \cap B) + P(A \cap C) + P(B \cap C)`), '$-$', 'each overlap of two was counted twice'], [T(r`P(A \cap B \cap C)`), '$+$', 'the triple overlap was added three times and taken out three times']], 'Table of the three event addition formula: add the three single probabilities, subtract the three pair overlaps, and add back the triple overlap.', 'Add, subtract, add back.');
// we8d2: tiles 1..30
{
  const S = tiles(1, 30), A = (x) => x % 2 === 0, B = (x) => x % 3 === 0, C = (x) => x % 5 === 0, o = addOK3(S, A, B, C);
  const c = [S.cnt(A), S.cnt(B), S.cnt(C), S.cnt((x) => A(x) && B(x)), S.cnt((x) => A(x) && C(x)), S.cnt((x) => B(x) && C(x)), S.cnt((x) => A(x) && B(x) && C(x))];
  must(o.ok && c.join() === '15,10,6,5,3,2,1' && o.lhs.eq(F(11, 15)) && S.cnt((x) => A(x) || B(x) || C(x)) === 22 && 15 + 10 + 6 - 5 - 3 - 2 + 1 === 22, 'we8d2');
  V.we8d2 = table(['Count', 'Value'], [[r`$n(A), n(B), n(C)$ (multiples of $2$, $3$, $5$)`, T('15, 10, 6')], [r`$n(A \cap B), n(A \cap C), n(B \cap C)$ (multiples of $6$, $10$, $15$)`, T('5, 3, 2')], [r`$n(A \cap B \cap C)$ (multiples of $30$)`, T('1')], [r`$n(A \cup B \cup C)$`, T(r`15 + 10 + 6 - 5 - 3 - 2 + 1 = 22`)], ['Probability', T(r`\dfrac{22}{30} = \dfrac{11}{15}`)]], 'Table for tiles numbered 1 to 30 with A the multiples of 2, B of 3 and C of 5: the single counts are 15, 10, 6, the pair counts 5, 3, 2, the triple count 1, the union 22, so the probability is 22 over 30, which is 11 over 15.', 'Check by counting the $22$ tiles directly.');
}
V.sum2 = table(['Idea', 'Remember'], [['Axioms', T(r`P(E) \ge 0`) + ', ' + T(r`P(S) = 1`) + ', and additivity for exclusive events'], ['Valid assignment', 'No negative value and a total of $1$'], ['Equally likely outcomes', T(r`P(E) = \dfrac{n(E)}{n(S)}`) + '; use combinations for selections'], ['Not', T(r`P(A') = 1 - P(A)`)], ['Or', T(r`P(A \cup B) = P(A) + P(B) - P(A \cap B)`)], ['Exactly one, neither', T(r`P(A) + P(B) - 2P(A \cap B)`) + ', ' + T(r`1 - P(A \cup B)`)]], 'Summary table of Part 2: the axioms, valid assignments, equally likely outcomes, the complement rule, the addition theorem, and the exactly one and neither formulas.', 'Part 2 in six lines.');
V.tips2 = table(['Do', 'Avoid'], [['Write the formula, then substitute', 'Adding $P(A)$ and $P(B)$ when the events overlap'], ['Check that every probability is between $0$ and $1$', 'Answers above $1$ or below $0$'], ['Use the complement for "at least one"', 'Listing every favourable outcome'], ['Give fractions in lowest terms, or decimals when the data are decimals', 'Mixing fractions and decimals in one line']], 'Table of exam tips for Part 2: write the formula first, check that each probability lies between 0 and 1, use the complement for at least one, and keep fractions in lowest terms.', 'Habits that save marks.');

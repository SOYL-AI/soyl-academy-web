// Visuals for ISC 11 Mathematics ch08. Every number in a table or figure is computed here (formula and enumeration) and asserted.
import { table, flow, geom } from './lib.mjs';
import { r, range, F, P, Cm, multi, pascalRow, S, N, kPerms, kCombs, kSeqs, distinctArr, count, circularClasses, circularFlip, triangles, distinctLines, polyDiagonals } from './cnt.mjs';

export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
const rd = (v) => Math.round(v * 1000) / 1000;
export const V = {};

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Counting principles and factorials'], ['b', 'Permutations nPr and numbers from digits'], ['c', 'Items together or never together'], ['d', 'Repeated letters'], ['e', 'Circular permutations']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: the multiplication and addition principles with factorials, permutations and numbers from digits, items always together or never together, arrangements with repeated letters, and circular permutations.', 'Part 1 at a glance.');

// tree: 3 starters x 2 drinks = 6 outcomes
{
  const starters = ['soup', 'salad', 'wrap'], drinks = ['tea', 'milk'];
  const H = 6.6, W = 8.6;
  const points = { R: { at: [0.9, 3.3], label: 'order', label_position: 'w' } };
  const segments = [];
  let leaves = 0;
  starters.forEach((s, i) => {
    const by = rd(5.5 - i * 2.2);
    points[`B${i}`] = { at: [3.6, by], label: s, label_position: 'n' };
    segments.push({ from: 'R', to: `B${i}` });
    drinks.forEach((d, k) => { points[`L${i}${k}`] = { at: [6.6, rd(by + 0.55 - k * 1.1)], label: `${s}, ${d}`, label_position: 'e' }; segments.push({ from: `B${i}`, to: `L${i}${k}` }); leaves++; });
  });
  must(leaves === starters.length * drinks.length && leaves === 6, 'tree leaves');
  V.tree = geom({ width: W + 1.6, height: H, points, segments, not_to_scale: true }, 'Tree diagram: an order starts at the left, branches into three starters (soup, salad, wrap), and each starter branches into two drinks (tea, milk), giving six different orders at the leaves.', 'Three starters times two drinks gives six orders.');
}
V.addMul = table(['Situation', 'Rule', 'Example'], [['Tasks happen one after another; every task is done', 'multiply the counts', '$3$ starters then $2$ drinks: $3 \\times 2 = 6$'], ['Only one of several tasks is done; no overlap', 'add the counts', '$3$ trains or $2$ buses: $3 + 2 = 5$'], ['Some choices are made in steps, others are alternatives', 'add the alternatives, then multiply by the steps', r`$4$ shirts and ($3$ trousers or $2$ shorts): $4 \times (3 + 2) = 20$`]], 'Table comparing the multiplication principle, used when tasks follow one another, with the addition principle, used when only one of several alternative tasks is done, with a combined example of four shirts and three trousers or two shorts.', 'And means multiply; or means add.');
// worked example 1: codes
{
  const letters = ['P', 'Q', 'R', 'S', 'T'], digits = range(1, 9);
  let c = 0; for (const a of letters) for (const b of letters) for (const x of digits) for (const y of digits) if (x !== y) c++;
  must(c === 1800 && 5 * 5 * 9 * 8 === 1800, 'we1 d1');
  V.we1 = table(['Place', 'Choices', 'Why'], [['Letter 1', '$5$', 'any of P, Q, R, S, T'], ['Letter 2', '$5$', 'letters may repeat'], ['Digit 1', '$9$', 'any of $1$ to $9$'], ['Digit 2', '$8$', 'must differ from digit 1'], ['Total', '$5 \\times 5 \\times 9 \\times 8 = 1800$', 'multiplication principle']], 'Worked example 1 table: a code with two letters from five, repeats allowed, then two different digits from one to nine; the choices are 5, 5, 9 and 8, so the number of codes is 1800.', 'Count place by place.');
}
// factorial table
{
  const rows = range(0, 8).map((n) => [`$${n}$`, `$${S(F(n))}$`, n === 0 ? 'defined as $1$' : `$${n} \\times ${S(F(n - 1))} = ${S(F(n))}$`]);
  must(range(1, 8).every((n) => F(n) === BigInt(n) * F(n - 1)) && F(8) === 40320n, 'factorial table');
  V.fact = table(['$n$', '$n!$', 'Check with $n \\times (n - 1)!$'], rows, 'Table of factorials from 0 factorial to 8 factorial: 1, 1, 2, 6, 24, 120, 720, 5040 and 40320, each checked as n times the previous factorial, with 0 factorial defined as 1.', '$n! = n \\times (n - 1)!$, and $0! = 1$.');
}
// nPr slots, n = 9, r = 4
{
  const v = count(kPerms(range(1, 9), 4));
  must(v === 3024 && 9 * 8 * 7 * 6 === 3024 && P(9, 4) === 3024n && F(9) / F(5) === 3024n, 'nPr slots');
  V.slots = table(['Place', '1st', '2nd', '3rd', '4th'], [['Choices left', '$9$', '$8$', '$7$', '$6$'], ['General $n$ and $r$', '$n$', '$n - 1$', '$n - 2$', '$n - r + 1$ (the $r$-th)']], 'Table of slots for arranging 4 of 9 different objects: the choices for the first to fourth place are 9, 8, 7 and 6, and for general n and r they are n, n minus 1, n minus 2, down to n minus r plus 1, giving 3024 for n equal to 9 and r equal to 4.', 'Each place has one choice fewer than the one before.');
}
// we2: three office-bearers from 11
{
  const v = count(kPerms(range(1, 11), 3));
  must(v === 990 && P(11, 3) === 990n && 11 * 10 * 9 === 990, 'we2 d1');
  V.we2 = table(['Step', 'Work'], [['Roles', 'president, secretary, treasurer: the order of the $3$ roles matters'], ['Count', '$^{11}P_{3} = 11 \\times 10 \\times 9$'], ['Value', '$990$']], 'Worked example 2 table: choosing a president, a secretary and a treasurer from 11 members is an ordered choice of three from eleven, so the number of ways is 11 times 10 times 9, which is 990.', 'Different roles mean order matters.');
}
// numbers from digits: rules table computed on digits 1..5 (no repetition)
{
  const d5 = range(1, 5);
  const three = [...kPerms(d5, 3)].map((a) => a.join(''));
  const even = three.filter((s) => Number(s[2]) % 2 === 0).length, big = three.filter((s) => Number(s) > 300).length;
  must(three.length === 60 && even === 24 && big === 36 && 2 * 4 * 3 === 24 && 3 * 4 * 3 === 36, 'digit rules');
  V.digits = table(['Condition on the number', 'Fill first', 'Digits $1$ to $5$, three places, no repeat'], [['none', 'any place', '$5 \\times 4 \\times 3 = 60$'], ['even', 'the units place', '$2$ choices for units, then $4 \\times 3$: $24$'], ['greater than $300$', 'the hundreds place', '$3$ choices ($3, 4, 5$), then $4 \\times 3$: $36$'], ['digit $0$ allowed', 'the first place: not $0$', 'one fewer choice for the first place only']], 'Table of rules for forming numbers from digits: fill the restricted place first. For three-digit numbers from the digits 1 to 5 without repetition there are 60 in all, 24 even and 36 greater than 300.', 'Restricted places first, then the rest.');
}
// we3: > 6000 from 2,4,5,6,7,9
{
  const ds = [2, 4, 5, 6, 7, 9];
  const v = count(kPerms(ds, 4), (a) => a[0] * 1000 + a[1] * 100 + a[2] * 10 + a[3] > 6000);
  must(v === 180 && 3n * P(5, 3) === 180n, 'we3 d1');
  V.we3 = table(['Step', 'Work'], [['Thousands digit', 'must be $6$, $7$ or $9$ (the digits $2$, $4$ and $5$ give numbers below $6000$)'], ['Remaining places', '$^{5}P_{3} = 60$ from the other $5$ digits'], ['Total', '$3 \\times 60 = 180$']], 'Worked example 3 table: four-digit numbers above 6000 from the digits 2, 4, 5, 6, 7, 9 without repetition; the first digit is 6, 7 or 9, the other three places use the remaining five digits in order, 60 ways, so there are 180 numbers.', 'Fill the first place, then arrange the rest.');
}
// together / never together flow
V.together = flow('LR', [['a', 'Always together: glue the items into one block'], ['b', r`Arrange the units: $(n - k + 1)!$`], ['c', r`Arrange inside the block: $k!$`], ['d', 'Never together: total minus together']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for restricted arrangements: glue the items that must be together into one block, arrange the resulting units, multiply by the arrangements inside the block, and for never together subtract the together count from the total.', 'Block for together; complement for never together.');
// we4: 9 players, 2 captains never adjacent
{
  const v = count(kPerms(range(0, 8), 9), (a) => Math.abs(a.indexOf(0) - a.indexOf(1)) !== 1);
  must(v === 282240 && F(9) - 2n * F(8) === 282240n && 2n * F(8) === 80640n, 'we4 d1');
  V.we4 = table(['Step', 'Work'], [['All lines', '$9! = 362880$'], ['Captains together', 'block and $7$ others: $8! = 40320$ units orders, times $2$: $80640$'], ['Captains never together', '$362880 - 80640 = 282240$']], 'Worked example 4 table: nine players stand in a line; all lines number 362880; the two captains together number 2 times 8 factorial, which is 80640; so the lines with the captains never together number 282240.', 'Subtract the together case from the total.');
}
// SEES list
{
  const l = [...distinctArr('SEES')];
  must(l.length === 6 && multi(4, 2, 2) === 6n && l.join() === 'EESS,ESES,ESSE,SEES,SESE,SSEE', 'SEES');
  V.sees = table(['Arrangement', 'Arrangement', 'Arrangement'], [[l[0], l[1], l[2]], [l[3], l[4], l[5]]], 'Table listing all six distinct arrangements of the letters of SEES: EESS, ESES, ESSE, SEES, SESE and SSEE, which equals 4 factorial over 2 factorial times 2 factorial.', 'Six, not $4! = 24$: swapping equal letters changes nothing.');
}
V.repeat = table(['Letters', 'Counts', 'Distinct arrangements'], [['all different', '$n$ letters', '$n!$'], ['one letter repeated $p$ times', '$p$ alike', r`$\dfrac{n!}{p!}$`], ['two letters repeated', '$p$ alike, $q$ alike', r`$\dfrac{n!}{p!\,q!}$`], ['SEES', '$S$ twice, $E$ twice', r`$\dfrac{4!}{2!\,2!} = 6$`]], 'Table of the rule for arrangements with alike letters: all different letters give n factorial, and each group of p alike letters divides the count by p factorial; SEES has four letters with two alike pairs, giving 6 arrangements.', 'Divide by the factorial of each group of alike letters.');
// we5: SUCCESS
{
  const arr = [...distinctArr('SUCCESS')];
  const tog = arr.filter((w) => w.includes('SSS')).length;
  must(arr.length === 420 && multi(7, 3, 2) === 420n && tog === 60 && multi(5, 2) === 60n, 'SUCCESS');
  V.we5 = table(['Step', 'Work'], [['Letters', 'SUCCESS has $7$ letters: S three times, C twice, U once, E once'], ['All arrangements', r`$\dfrac{7!}{3!\,2!} = 420$`], ['The three S together', r`units SSS, U, C, C, E: $\dfrac{5!}{2!} = 60$`]], 'Worked example 5 table: the word SUCCESS has 7 letters with S three times and C twice, so 7 factorial over 3 factorial times 2 factorial, 420, arrangements; with the three S together the count is 5 factorial over 2 factorial, 60.', 'Group alike letters into blocks before dividing.');
}
// circular figure: six seats
{
  const lab = ['A', 'B', 'C', 'D', 'E', 'F'], pos = ['n', 'ne', 'se', 's', 'sw', 'nw'];
  const points = {}, segments = [];
  lab.forEach((l, k) => { points[l] = { at: [rd(3.5 + 2.6 * Math.sin((2 * Math.PI * k) / 6)), rd(3.5 + 2.6 * Math.cos((2 * Math.PI * k) / 6))], label: l, label_position: pos[k] }; });
  lab.forEach((l, k) => segments.push({ from: l, to: lab[(k + 1) % 6] }));
  V.ring = geom({ width: 7, height: 7, points, segments, not_to_scale: true }, 'Six people A, B, C, D, E and F seated round a circular table in the clockwise order A, B, C, D, E, F; turning the whole seating by one place gives the same circular arrangement.', 'Rotating all six seats leaves the circular arrangement unchanged.');
}
// four people: circular classes
{
  const cl = circularClasses(4), fl = circularFlip(4);
  must(cl === 6 && fl === 3 && F(3) === 6n && F(3) / 2n === 3n, 'circle of four');
  const names = ['A', 'B', 'C', 'D'];
  const seatings = [...kPerms([1, 2, 3], 3)].map((p) => [0, ...p]);
  const read = (a) => a.map((x) => names[x]).join('');
  const rows = seatings.map((a) => [read(a), read([a[0], ...a.slice(1).reverse()])]);
  V.four = table(['Clockwise from A', 'Anticlockwise from A (mirror image)'], rows, 'Table of the six circular arrangements of four people A, B, C and D with A fixed: ABCD, ABDC, ACBD, ACDB, ADBC and ADCB read clockwise, each shown with its mirror image read the other way; mirror images pair up into three.', 'Fix A: $3! = 6$ circular arrangements; $3$ if mirror images are the same.');
}
V.circular = table(['Case', 'Number of arrangements of $n$ different objects', 'For $n = 7$'], [['clockwise and anticlockwise are different (people at a table)', '$(n - 1)!$', '$720$'], ['clockwise and anticlockwise are the same (beads, garland, key ring)', r`$\dfrac{(n - 1)!}{2}$`, '$360$'], ['arranged in a row', '$n!$', '$5040$']], 'Table of circular permutations of n different objects: n minus 1 factorial when clockwise and anticlockwise orders differ, half of that when they are the same as for a necklace, compared with n factorial in a row; for seven objects 720, 360 and 5040.', 'Fix one object to remove the rotations.');
must(F(6) === 720n && F(6) / 2n === 360n && F(7) === 5040n && circularClasses(7) === 720 && circularFlip(7) === 360, 'circular table n = 7');
// we6: bracelet of 8
{
  const all = circularFlip(8);
  const adj = (a) => { const i = a.indexOf(0), j = a.indexOf(1); return (i - j + 8) % 8 === 1 || (j - i + 8) % 8 === 1; };
  const tg = circularFlip(8, adj);
  must(all === 2520 && F(7) / 2n === 2520n && tg === 720 && 2n * F(6) / 2n === 720n, 'bracelet');
  V.we6 = table(['Step', 'Work'], [['Bracelet of $8$ different charms, can be turned over', r`$\dfrac{(8 - 1)!}{2} = \dfrac{5040}{2} = 2520$`], ['Two named charms next to each other', r`block and $6$ others: $(7 - 1)! = 720$, times $2$ orders, halved for turning over: $\dfrac{2 \times 720}{2} = 720$`]], 'Worked example 6 table: a bracelet of eight different charms that can be turned over can be made in 5040 over 2, which is 2520, ways; with two named charms side by side the count is 2 times 720 halved, which is 720.', 'Circular count first, then halve for turning over.');
}
V.summary1 = flow('LR', [['a', r`Multiply for steps, add for alternatives; $n! = n(n-1)!$`], ['b', r`$^{n}P_{r} = \dfrac{n!}{(n-r)!}$`], ['c', 'Together: block. Never together: subtract'], ['d', r`Repeats: $\dfrac{n!}{p!\,q!}$; circles: $(n-1)!$`]], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 1: multiply for steps and add for alternatives with factorials, the permutation formula, block and complement methods for together and never together, and the rules for repeated letters and circular arrangements.', 'Part 1 in one line.');
V.tips1 = table(['Question type', 'How ISC marks are usually given'], [['Evaluate or solve with $^{n}P_{r}$ (2-3)', 'formula 1, simplification 1, answer 1'], ['Numbers from digits (3)', 'restricted place filled first 1, other places 1, total 1'], ['Together or never together (3-5)', 'block or total 1, inside arrangements 1, subtraction 1'], ['Letters of a word (3-5)', 'count of letters and repeats 1, division 1, each condition 1'], ['Circular arrangements (2-3)', '$(n - 1)!$ 1, special condition 1, answer 1']], 'Exam tips table for Part 1: permutation evaluations, numbers from digits, together and never together, letters of a word and circular arrangements each earn marks for the formula or restricted place, the other places and the final total.', 'Name the method, show each factor.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Combinations nCr and their properties'], ['b', 'Selections with conditions'], ['c', 'Selections of alike things'], ['d', 'Geometry counts'], ['e', 'Mixed problems']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: combinations and their properties, selections with conditions such as at least or included, selections of alike things, counting diagonals and triangles, and mixed problems of selecting and arranging.', 'Part 2 at a glance.');
V.derive = flow('LR', [['a', r`Choose $r$ of $n$: $^{n}C_{r}$ ways`], ['b', r`Arrange each choice: $r!$ ways`], ['c', r`Together: $^{n}P_{r} = r! \times {}^{n}C_{r}$`], ['d', r`$^{n}C_{r} = \dfrac{n!}{r!\,(n - r)!}$`]], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow deriving the combination formula: choose r of n objects in nCr ways, arrange each choice in r factorial ways, so nPr equals r factorial times nCr, and nCr equals n factorial over r factorial times n minus r factorial.', 'Selections times arrangements gives permutations.');
// selections vs arrangements of {A,B,C,D} choose 2
{
  const items = ['A', 'B', 'C', 'D'];
  const sel = [...kCombs(items, 2)];
  const rows = sel.map((s) => [s.join(''), `${s.join('')}, ${s.slice().reverse().join('')}`]);
  must(sel.length === 6 && count(kPerms(items, 2)) === 12 && Cm(4, 2) === 6n && P(4, 2) === 12n && P(4, 2) === F(2) * Cm(4, 2), 'sel vs arr');
  V.selArr = table(['Selection of $2$ from A, B, C, D', 'Its $2!$ arrangements'], rows, 'Table listing the six selections of two letters from A, B, C and D, AB, AC, AD, BC, BD and CD, each with its two arrangements, giving 12 arrangements in all, which is 2 factorial times 4C2.', '$6$ selections, $12$ arrangements: $^{4}P_{2} = 2! \\times {}^{4}C_{2}$.');
}
// we1 d2
{
  must(Cm(13, 10) === Cm(13, 3) && Cm(13, 3) === 286n && count(kCombs(range(1, 13), 10)) === 286, 'we1 d2');
  V.d2we1 = table(['Step', 'Work'], [['Use symmetry', '$^{13}C_{10} = {}^{13}C_{3}$, since $10 + 3 = 13$'], ['Expand the small one', r`$\dfrac{13 \times 12 \times 11}{3 \times 2 \times 1} = \dfrac{1716}{6}$`], ['Value', '$286$']], 'Worked example 1 table of Part 2: 13C10 equals 13C3 by symmetry, which is 13 times 12 times 11 over 6, giving 286.', 'Swap to the smaller lower number.');
}
// Pascal triangle rows 0..8 (built by addition)
{
  const rows = range(0, 8).map((n) => [`$${n}$`, pascalRow(n).map((x) => S(x)).join(', ')]);
  must(range(0, 8).every((n) => pascalRow(n).every((x, k) => x === Cm(n, k))) && pascalRow(8)[3] + pascalRow(8)[4] === pascalRow(9)[4] && Cm(8, 3) === 56n && Cm(8, 4) === 70n && Cm(9, 4) === 126n, 'pascal');
  V.pascal = table(['$n$', 'Row of $^{n}C_{0}, ^{n}C_{1}, \\ldots, ^{n}C_{n}$'], rows, 'Pascal triangle table for n from 0 to 8, each row built by adding the two numbers above it; for example row 8 is 1, 8, 28, 56, 70, 56, 28, 8, 1, and 56 plus 70 equals 126, the entry of row 9.', 'Each entry is the sum of the two above: $^{8}C_{3} + {}^{8}C_{4} = {}^{9}C_{4}$.');
}
// we2 d2: solve equations
{
  must(P(13, 2) === 156n && range(2, 40).filter((n) => P(n, 2) === 156n).join() === '13' && range(7, 40).filter((n) => Cm(n, 7) === Cm(n, 4)).join() === '11', 'we2 d2');
  V.d2we2 = table(['Equation', 'Method', 'Result'], [['$^{n}P_{2} = 156$', '$n(n - 1) = 156$, so $n^2 - n - 156 = (n - 13)(n + 12) = 0$', '$n = 13$'], ['$^{n}C_{7} = {}^{n}C_{4}$', 'lower numbers differ, so they add up to $n$: $n = 7 + 4$', '$n = 11$']], 'Worked example 2 table of Part 2: nP2 equal to 156 gives n times n minus 1 equal to 156, so n is 13; nC7 equal to nC4 means the lower numbers add up to n, so n is 11.', 'Reject negative roots; $n$ is a positive integer.');
}
// conditions on selections: 9 people (5 men, 4 women), team of 4
{
  const ppl = [...range(1, 5).map((i) => 'm' + i), ...range(1, 4).map((i) => 'w' + i)];
  const g = (f) => count(kCombs(ppl, 4), f);
  const inc = g((c) => c.includes('m1')), exc = g((c) => !c.includes('m1')), atLeast = g((c) => c.some((x) => x[0] === 'w')), atMost = g((c) => c.filter((x) => x[0] === 'w').length <= 1);
  must(g(() => true) === 126 && inc === 56 && exc === 70 && atLeast === 121, 'conditions');
  must(inc === Number(Cm(8, 3)) && exc === Number(Cm(8, 4)) && atLeast === Number(Cm(9, 4) - Cm(5, 4)), 'conditions formulas');
  must(atMost === Number(Cm(5, 4) + Cm(5, 3) * Cm(4, 1)), 'at most one woman');
  V.cond = table(['Condition (team of $4$ from $5$ men and $4$ women)', 'Method', 'Count'], [['no condition', '$^{9}C_{4}$', '$126$'], ['a named man is in', 'choose the other $3$ from the remaining $8$: $^{8}C_{3}$', '$56$'], ['the same man is out', 'choose all $4$ from the remaining $8$: $^{8}C_{4}$', '$70$'], ['at least one woman', 'all teams minus all-men teams: $^{9}C_{4} - {}^{5}C_{4}$', '$121$'], ['at most one woman', '$0$ women plus $1$ woman: ${}^{5}C_{4} + {}^{5}C_{3} \\times {}^{4}C_{1}$', '$45$']], 'Table of selection conditions for a team of four from five men and four women: no condition gives 126, a named man included 56, excluded 70, at least one woman 121, and at most one woman 45.', 'Included: reduce $n$ and $r$. Excluded: reduce $n$. At least: use the complement or cases.');
  must(atMost === 45, 'at most 45');
}
// we3 d2: at least 2 women, 4 of 7 men + 5 women
{
  const ppl = [...range(1, 7).map((i) => 'm' + i), ...range(1, 5).map((i) => 'w' + i)];
  const v = count(kCombs(ppl, 4), (c) => c.filter((x) => x[0] === 'w').length >= 2);
  must(v === 285 && Cm(5, 2) * Cm(7, 2) + Cm(5, 3) * Cm(7, 1) + Cm(5, 4) === 285n && Cm(12, 4) - Cm(7, 4) - Cm(5, 1) * Cm(7, 3) === 285n, 'we3 d2');
  V.d2we3 = table(['Women in the team', 'Men', 'Count'], [['$2$', '$2$', '$^{5}C_{2} \\times {}^{7}C_{2} = 10 \\times 21 = 210$'], ['$3$', '$1$', '$^{5}C_{3} \\times {}^{7}C_{1} = 10 \\times 7 = 70$'], ['$4$', '$0$', '$^{5}C_{4} = 5$'], ['Total', '', '$210 + 70 + 5 = 285$']], 'Worked example 3 table of Part 2: a team of four from seven men and five women with at least two women has cases of 2, 3 or 4 women giving 210, 70 and 5 teams, a total of 285.', 'Split by the number of women, then add.');
}
// alike things
{
  const lab = (n, p) => range(1, n).map((i) => p + i);
  const sel = (counts, diff) => { const items = [...counts.flatMap(([n, p]) => lab(n, p)), ...range(1, diff).map((i) => 'd' + i)]; const seen = new Set(); for (let m = 1; m < 1 << items.length; m++) { const pick = items.filter((_, i) => m & (1 << i)); seen.add(counts.map(([, p]) => pick.filter((x) => x.startsWith(p)).length).join('.') + '|' + pick.filter((x) => x[0] === 'd').join('')); } return seen.size; };
  must(sel([[5, 'a']], 0) === 5 && sel([[5, 'a'], [4, 'b']], 0) === 29 && sel([[3, 'a']], 2) === 15 && 6 * 5 - 1 === 29 && 4 * 4 - 1 === 15, 'alike table');
  V.alike = table(['Items', 'Selections of at least one', 'Reason'], [['$n$ alike things', '$n$', 'take $1, 2, \\ldots, n$ of them'], ['$p$ alike of one kind, $q$ alike of another', '$(p + 1)(q + 1) - 1$', '$0$ to $p$ and $0$ to $q$, minus the empty selection'], ['$r$ different things', '$2^{r} - 1$', 'each is taken or left'], ['$p$ alike, $q$ alike and $r$ different', '$(p + 1)(q + 1)2^{r} - 1$', 'multiply the independent choices'], ['$5$ alike and $4$ alike', '$6 \\times 5 - 1 = 29$', 'example']], 'Table of the number of selections of at least one item from alike things: n alike things give n selections; p alike and q alike give p plus 1 times q plus 1 minus 1; r different things give 2 to the r minus 1; combined groups multiply, for example 5 alike and 4 alike give 29.', 'Alike things: count how many to take. Different things: take or leave.');
  must(sel([[5, 'a'], [4, 'b']], 3) === 6 * 5 * 8 - 1 && 6 * 5 * 8 - 1 === 239, 'we4 d2');
  V.d2we4 = table(['Step', 'Work'], [['$5$ identical apples', '$0$ to $5$ taken: $6$ choices'], ['$4$ identical oranges', '$0$ to $4$ taken: $5$ choices'], ['$3$ different sweets', '$2^{3} = 8$ choices'], ['At least one item', '$6 \\times 5 \\times 8 - 1 = 239$']], 'Worked example 4 table of Part 2: five identical apples, four identical oranges and three different sweets; the choices are 6, 5 and 8, which multiply to 240, and removing the empty selection leaves 239.', 'Subtract the empty selection last.');
}
// heptagon with all chords
{
  const n = 7, lab = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const pos = ['n', 'ne', 'e', 'se', 'sw', 'w', 'nw'];
  const points = {}; lab.forEach((l, k) => { points[l] = { at: [rd(3.5 + 2.6 * Math.sin((2 * Math.PI * k) / n)), rd(3.5 + 2.6 * Math.cos((2 * Math.PI * k) / n))], label: l, label_position: pos[k] }; });
  const segments = []; let sides = 0, diags = 0;
  for (const [i, j] of kCombs(range(0, n - 1), 2)) { const side = j - i === 1 || (i === 0 && j === n - 1); segments.push({ from: lab[i], to: lab[j], ...(side ? {} : { dashed: true }) }); if (side) sides++; else diags++; }
  must(sides === 7 && diags === 14 && polyDiagonals(7) === 14 && Cm(7, 2) - 7n === 14n && (7 * 4) / 2 === 14, 'heptagon');
  V.hept = geom({ width: 7, height: 7, points, segments, not_to_scale: true }, 'A convex heptagon ABCDEFG with its 7 sides drawn solid and its 14 diagonals dashed: of the 21 segments joining pairs of vertices, 7 are sides.', 'A heptagon: $21$ segments, $7$ sides, $14$ diagonals.');
  V.polyTbl = table(['Convex polygon with $n$ sides', 'Count', 'Heptagon ($n = 7$)'], [['segments joining two vertices', '$^{n}C_{2}$', '$21$'], ['diagonals', r`$^{n}C_{2} - n = \dfrac{n(n - 3)}{2}$`, '$14$'], ['triangles from the vertices', '$^{n}C_{3}$', '$35$'], ['triangles from $m$ collinear points among $n$', '$^{n}C_{3} - {}^{m}C_{3}$', 'for $n = 8$, $m = 3$: $55$']], 'Table of geometry counts: a convex polygon with n sides has nC2 segments, n(n minus 3) over 2 diagonals and nC3 triangles from its vertices; if m of n points are collinear the triangles number nC3 minus mC3, for example 55 for n 8 and m 3.', 'Subtract the collinear triples.');
  must(count(kCombs(range(0, 6), 3)) === 35 && Cm(7, 3) === 35n, 'hept triangles');
}
// we5 d2: 8 points, 3 collinear
{
  const pts = [[1, 1], [3, 3], [5, 5], [0, 4], [2, 0], [4, 1], [6, 3], [1, 5]];
  must(triangles(pts) === 55 && distinctLines(pts) === 26 && Cm(8, 3) - Cm(3, 3) === 55n && Cm(8, 2) - Cm(3, 2) + 1n === 26n, 'we5 d2');
  V.d2we5 = table(['Step', 'Work'], [['Setting', '$8$ points; exactly $3$ of them, $(1,1)$, $(3,3)$, $(5,5)$, are on one line'], ['Triangles', '$^{8}C_{3} - {}^{3}C_{3} = 56 - 1 = 55$'], ['Straight lines', '$^{8}C_{2} - {}^{3}C_{2} + 1 = 28 - 3 + 1 = 26$']], 'Worked example 5 table of Part 2: eight points with exactly three on one line give 56 minus 1, which is 55, triangles, and 28 minus 3 plus 1, which is 26, distinct straight lines.', 'Three collinear points give one line, not three.');
}
// select then arrange flow
V.mixed = flow('LR', [['a', 'Read the task: which objects, how many?'], ['b', r`Select: use $^{n}C_{r}$ for each group`], ['c', r`Arrange: use $r!$ or a circular count`], ['d', 'Multiply the stages and check a small case']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for mixed problems: read the task, select the objects with combinations for each group, arrange them with a factorial or circular count, then multiply the stages and check a small case.', 'Select first, arrange second.');
// we6 d2: words with 3 consonants of 5 and 2 vowels of 4
{
  const con = ['b', 'c', 'd', 'f', 'g'], vow = ['a', 'e', 'i', 'o'];
  const sets = count(kCombs(con, 3)) * count(kCombs(vow, 2));
  const words = count(kPerms([...con, ...vow], 5), (w) => w.filter((x) => vow.includes(x)).length === 2);
  must(sets === 60 && words === 7200 && Cm(5, 3) * Cm(4, 2) * F(5) === 7200n, 'we6 d2');
  V.d2we6 = table(['Step', 'Work'], [['Select consonants', '$^{5}C_{3} = 10$'], ['Select vowels', '$^{4}C_{2} = 6$'], ['Arrange each set of $5$ letters', '$5! = 120$'], ['Total words', '$10 \\times 6 \\times 120 = 7200$']], 'Worked example 6 table of Part 2: five-letter words from five consonants and four vowels with three consonants and two vowels; 10 consonant selections times 6 vowel selections times 120 arrangements give 7200 words.', 'Select each group, then arrange the whole set.');
}
// we7 d2: choose 4 of 7 then seat round a table
{
  const v = count(kCombs(range(1, 7), 4)) * circularClasses(4);
  must(v === 210 && Cm(7, 4) * F(3) === 210n, 'we7 d2');
  V.d2we7 = table(['Step', 'Work'], [['Choose $4$ of $7$ people', '$^{7}C_{4} = 35$'], ['Seat the $4$ round a table', '$(4 - 1)! = 6$'], ['Total', '$35 \\times 6 = 210$']], 'Worked example 7 table of Part 2: choosing four of seven people and seating them round a circular table gives 35 selections times 6 circular arrangements, so 210 ways.', 'A selection followed by a circular arrangement.');
}
V.summary2 = flow('LR', [['a', r`$^{n}C_{r} = \dfrac{n!}{r!(n - r)!}$ and $^{n}P_{r} = r!\,{}^{n}C_{r}$`], ['b', r`$^{n}C_{r} = {}^{n}C_{n-r}$ and $^{n}C_{r-1} + {}^{n}C_{r} = {}^{n+1}C_{r}$`], ['c', 'Conditions: reduce, subtract or split by cases'], ['d', 'Alike things: count how many; mixed: select then arrange']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 2: the combination formula and its link to permutations, the symmetry and Pascal properties, ways to handle conditions, and the rules for alike things and mixed selecting and arranging problems.', 'Part 2 in one line.');
V.tips2 = table(['Question type', 'How ISC marks are usually given'], [['Evaluate or prove a property of $^{n}C_{r}$ (2-3)', 'expansion 1, simplification 1, conclusion 1'], ['Solve for $n$ or $r$ (2-3)', 'equation 1, solving 1, rejecting invalid values 1'], ['Committees with conditions (3-5)', 'each case 1, total 1, method statement 1'], ['Diagonals, triangles, lines (3)', 'all selections 1, subtract collinear or sides 1, answer 1'], ['Mixed select and arrange (3-5)', 'selection 1, arrangement 1, product 1']], 'Exam tips table for Part 2: evaluating or proving properties of combinations, solving for n or r, committees with conditions, diagonals and triangles, and mixed select and arrange questions each earn marks for the formula, each case and the final total.', 'Show every case; state select or arrange.');

// Build ICSE 10 Mathematics ch04 Linear Inequations. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch04/src/build.mjs
// Every solution set on the slides, in the notes and in the tables is computed with ineq.mjs (exact
// rational algebra, cross-checked by brute force / sampling), every typed working line is checked for an
// unchanged solution set (work.mjs), and every number line is drawn from the verified set (nl.mjs) and
// passes the pipeline's SVG allow-list check with no warnings.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from './lib.mjs';
import { L, X, fr, ineq, combined, solution, solveAll, roster, builder, holds, inSet } from './ineq.mjs';
import { steps } from './work.mjs';
import { numberLine, NL_LOG } from './nl.mjs';
import { checkSvg } from '../../../../../content-pipeline/src/lint/svg.ts';

setUnit('icse-10-mathematics-ch04');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const d = (s) => `$${s}$`;

// ---------------------------------------------------------------- worked examples (asserted)
// Part 1
const e1c = [ineq(L(3, 2), '<', 14)];
const e1W = solution(e1c, 'W'), e1N = solution(e1c, 'N');
const e1 = steps(e1W.intervals, ['3x + 2 < 14', '3x < 12 \\Rightarrow x < 4']).must('e1');
must(roster(e1W) === r`\{0, 1, 2, 3\}` && roster(e1N) === r`\{1, 2, 3\}`, 'e1 sets');
const e2c = [ineq(L(-3, 7), '>=', -8)];
const e2N = solution(e2c, 'N');
const e2 = steps(e2N.intervals, ['7 - 3x \\ge -8', '-3x \\ge -15', 'x \\le 5']).must('e2');
must(roster(e2N) === r`\{1, 2, 3, 4, 5\}`, 'e2 set');
const e3c = [ineq(L(fr(1, 3), -1), '<=', L(fr(1, 4), fr(-1, 2)))];
const e3Z = solution(e3c, 'Z');
const e3 = steps(e3Z.intervals, ['\\dfrac{x}{3} - 1 \\le \\dfrac{x - 2}{4}', '4x - 12 \\le 3(x - 2)', '4x - 12 \\le 3x - 6 \\Rightarrow x \\le 6']).must('e3');
must(roster(e3Z) === r`\{\ldots, 4, 5, 6\}` && e3Z.left, 'e3 set');
const e4c = [ineq(L(4, -4), '>', L(2, 5))];
const e4R = solution(e4c, 'R');
const e4 = steps(e4R.intervals, ['4(x - 1) > 2x + 5', '4x - 4 > 2x + 5', '2x > 9 \\Rightarrow x > \\dfrac{9}{2}']).must('e4');
must(builder(e4R, { decimal: true }) === r`\{x : x \in \mathbb{R},\ x > 4.5\}`, 'e4 set');
const fourC = [ineq(L(3, -2), '<=', 7)];
const four = Object.fromEntries(['N', 'W', 'Z', 'R'].map((U) => [U, solution(fourC, U)]));
steps(four.R.intervals, ['3x - 2 \\le 7 \\Rightarrow 3x \\le 9 \\Rightarrow x \\le 3']).must('four');
must(roster(four.N) === r`\{1, 2, 3\}` && roster(four.W) === r`\{0, 1, 2, 3\}` && roster(four.Z) === r`\{\ldots, 1, 2, 3\}`, 'four sets');
// Part 2
const f1R = solution(combined(-3, '<=', L(2, 1), '<', 9), 'R');
const f1 = steps(f1R.intervals, ['-3 \\le 2x + 1 < 9', '-4 \\le 2x < 8', '-2 \\le x < 4']).must('f1');
const f2Z = solution(combined(5, '<', L(-2, 11), '<=', 17), 'Z');
const f2 = steps(f2Z.intervals, ['5 < 11 - 2x \\le 17', '-6 < -2x \\le 6', '3 > x \\ge -3', '-3 \\le x < 3']).must('f2');
must(roster(f2Z) === r`\{-3, -2, -1, 0, 1, 2\}`, 'f2 set');
const f3A = solution([ineq(L(3, -2), '>', -8)], 'R'), f3B = solution([ineq(L(2, 1), '<=', 9)], 'R');
const f3AB = solution([ineq(L(3, -2), '>', -8), ineq(L(2, 1), '<=', 9)], 'R');
const f3a = steps(f3A.intervals, ['3x - 2 > -8 \\Rightarrow 3x > -6 \\Rightarrow x > -2']).must('f3a');
const f3b = steps(f3B.intervals, ['2x + 1 \\le 9 \\Rightarrow 2x \\le 8 \\Rightarrow x \\le 4']).must('f3b');
const f3 = steps(f3AB.intervals, ['-2 < x \\le 4']).must('f3');
const f4c = [ineq(L(38, 72), '<=', 680)];
const f4W = solution(f4c, 'W');
const f4 = steps(f4W.intervals, ['72 + 38x \\le 680', '38x \\le 608 \\Rightarrow x \\le 16']).must('f4');
must(Math.max(...f4W.members) === 16 && 72 + 38 * 16 === 680 && 72 + 38 * 17 === 718, 'f4 lift');
const f5A = solution([ineq(L(2, -1), '>', 7)], 'R'), f5B = solution([ineq(L(3, 2), '<', 8)], 'R');
const f5AB = solution([ineq(L(2, -1), '>', 7), ineq(L(3, 2), '<', 8)], 'R');
const f5a = steps(f5A.intervals, ['2x - 1 > 7 \\Rightarrow 2x > 8 \\Rightarrow x > 4']).must('f5a');
const f5b = steps(f5B.intervals, ['3x + 2 < 8 \\Rightarrow 3x < 6 \\Rightarrow x < 2']).must('f5b');
must(f5AB.intervals.length === 0, 'f5 empty');
const readR = solution(combined(-3, '<', X, '<=', 1), 'R');
must(builder(readR) === r`\{x : x \in \mathbb{R},\ -3 < x \le 1\}`, 'reading');
const zrC = combined(-2, '<', X, '<=', 2);
const zrZ = solution(zrC, 'Z'), zrR = solution(zrC, 'R');
must(roster(zrZ) === r`\{-1, 0, 1, 2\}`, 'Z vs R');
const le1 = solution([ineq(X, '<=', 1)], 'R'), gt1 = solution([ineq(X, '>', 1)], 'R');
must(inSet(le1.intervals, fr(1)) && !inSet(gt1.intervals, fr(1)), 'circles');

// ---------------------------------------------------------------- visuals
const nlE1 = numberLine({ from: -1, to: 5, rows: [{ sol: e1W }] }, 'Dots at $0, 1, 2$ and $3$: the whole numbers less than $4$.', { lead: 'Solution set of 3x plus 2 less than 14 for whole numbers.' });
const signRows = [['<', 'is less than', 'x < 3', ineq(X, '<', 3)], ['\\le', 'is less than or equal to', 'x \\le 3', ineq(X, '<=', 3)], ['>', 'is greater than', 'x > 3', ineq(X, '>', 3)], ['\\ge', 'is greater than or equal to', 'x \\ge 3', ineq(X, '>=', 3)]];
const signTable = table(['Sign', 'Read as', 'Example', 'Is $x = 3$ a solution?'], signRows.map(([s, w, e, q]) => [d(s), w, d(e), holds(q, fr(3)) ? 'yes' : 'no']), 'Table of the four inequality signs: less than, less than or equal to, greater than, greater than or equal to. With the examples x less than 3 and x greater than 3, the number 3 is not a solution; with less than or equal to and greater than or equal to, it is.', 'The sign decides whether the boundary number belongs.');
must(signRows.map(([, , , q]) => holds(q, fr(3))).join() === 'false,true,false,true', 'sign table');
const setsTable = table(['Replacement set', 'Symbol', 'Members'], [['Natural numbers', '$\\mathbb{N}$', '$\\{1, 2, 3, \\ldots\\}$'], ['Whole numbers', '$\\mathbb{W}$', '$\\{0, 1, 2, 3, \\ldots\\}$'], ['Integers', '$\\mathbb{Z}$', '$\\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$'], ['Real numbers', '$\\mathbb{R}$', 'all numbers on the number line, including fractions and decimals']], 'Table of replacement sets: natural numbers N start at 1; whole numbers W start at 0; integers Z include the negative whole numbers; real numbers R include every point of the number line.', 'The four replacement sets used in this chapter.');
const fourTable = table(['Replacement set', 'Solution set of $3x - 2 \\le 7$'], [['$\\mathbb{N}$', d(roster(four.N))], ['$\\mathbb{W}$', d(roster(four.W))], ['$\\mathbb{Z}$', d(roster(four.Z))], ['$\\mathbb{R}$', d(builder(four.R))]], 'Table for 3x minus 2 at most 7, which simplifies to x at most 3: over N the solution set is 1, 2, 3; over W it is 0, 1, 2, 3; over Z it is 3, 2, 1 and every smaller integer; over R it is every real number up to and including 3.', 'One inequation, four different solution sets.');
const testRows = [0, 1, 2, 3, 4, 5].map((x) => [d(String(x)), d(String(3 * x + 2)), holds(e1c[0], fr(x)) ? 'yes' : 'no']);
must(testRows.map((x) => x[2]).join() === 'yes,yes,yes,yes,no,no', 'e1 test table');
const testTable = table(['$x$', '$3x + 2$', 'Less than $14$?'], testRows, 'Table testing whole numbers in 3x plus 2 less than 14: for x equal to 0, 1, 2 and 3 the value is 2, 5, 8 and 11, all less than 14; for 4 and 5 it is 14 and 17, which are not.', 'Testing members agrees with solving: $x < 4$.');
const rules = [['Add $5$', 2, 7, (v) => v + 5, 'unchanged'], ['Subtract $3$', 2, 7, (v) => v - 3, 'unchanged'], ['Multiply by $4$', 2, 7, (v) => v * 4, 'unchanged'], ['Divide by $2$', 2, 7, (v) => v / 2, 'unchanged'], ['Multiply by $-3$', 2, 7, (v) => v * -3, 'reversed'], ['Divide by $-1$', 2, 7, (v) => v / -1, 'reversed']];
const rulesTable = table(['Do this to both sides of $2 < 7$', 'Result', 'Sign'], rules.map(([op, a, b, g, s]) => { const [p, q] = [g(a), g(b)]; must((p < q) === (s === 'unchanged'), `rule ${op}`); return [op, d(`${p} ${p < q ? '<' : '>'} ${q}`), s]; }), 'Table of operations on 2 less than 7: adding 5 gives 7 less than 12, subtracting 3 gives minus 1 less than 4, multiplying by 4 gives 8 less than 28, dividing by 2 gives 1 less than 3.5; multiplying by minus 3 gives minus 6 greater than minus 21, and dividing by minus 1 gives minus 2 greater than minus 7.', 'Only a negative multiplier or divisor reverses the sign.');
const mirror = { U: 'Z', members: [-5, -2, 2, 5], left: false, right: false, intervals: [] };
const nlMirror = numberLine({ from: -5, to: 5, rows: [{ sol: mirror }], marks: [{ at: 2, label: 'a' }, { at: 5, label: 'b' }, { at: -2, label: '−a' }, { at: -5, label: '−b' }] }, 'Dots at $2$ and $5$ and at their negatives: $2 < 5$, but $-2 > -5$.', { lead: 'Multiplying by minus 1 reflects the number line in 0.' });
must(2 < 5 && -2 > -5, 'mirror');
const nlE2 = numberLine({ from: 0, to: 6, rows: [{ sol: e2N }] }, 'Dots at $1, 2, 3, 4$ and $5$.', { lead: 'Solution set of 7 minus 3x at least minus 8 for natural numbers.' });
const nlE3 = numberLine({ from: 1, to: 7, rows: [{ sol: e3Z }] }, 'Dots at $6, 5, 4, \\ldots$ continuing to the left; none at $7$.', { lead: 'Solution set of x over 3 minus 1 at most x minus 2 over 4 for integers.' });
const nlE4 = numberLine({ from: 2, to: 8, rows: [{ sol: e4R }] }, 'An open circle at $4.5$ and an arrow to the right: $4.5$ is not included.', { lead: 'Solution set of 4 times x minus 1 greater than 2x plus 5 for real numbers.' });
const formsTable = table(['Form', 'Example', 'Best for'], [['Roster (finite)', '$\\{1, 2, 3, 4, 5\\}$', 'a short list from $\\mathbb{N}$, $\\mathbb{W}$ or $\\mathbb{Z}$'], ['Roster (infinite)', '$\\{\\ldots, 4, 5, 6\\}$', 'a list that goes on for ever'], ['Set-builder', '$\\{x : x \\in \\mathbb{R},\\ x > 4.5\\}$', 'real numbers, which cannot be listed'], ['Empty set', '$\\phi$ or $\\{\\ \\}$', 'no member satisfies the inequation']], 'Table of ways to write a solution set: roster form lists the members, possibly with dots for a list that goes on; set-builder form describes real-number solutions; the empty set is written phi.', 'Choose the form that fits the replacement set.');
const sum1 = table(['Idea', 'Key fact'], [['Solution set', 'members of the replacement set that make the inequation true'], ['Add or subtract', 'the sign stays the same'], ['Multiply or divide by a positive number', 'the sign stays the same'], ['Multiply or divide by a negative number', 'the sign is **reversed**'], ['Writing the answer', 'roster for $\\mathbb{N}$, $\\mathbb{W}$, $\\mathbb{Z}$; set-builder for $\\mathbb{R}$']], 'Summary table for part 1: the solution set comes from the replacement set; adding, subtracting, and multiplying or dividing by a positive number keep the sign; multiplying or dividing by a negative number reverses it; use roster form for N, W and Z and set-builder form for R.', 'Part 1 on one card.');

const nlT2 = numberLine({ from: -3, to: 5, rows: [{ sol: f1R }] }, 'A filled circle at $-2$ (included) and an open circle at $4$ (excluded).', { lead: 'Solution set of minus 3 at most 2x plus 1 less than 9 for real numbers.' });
const combFlow = flow('LR', [['a', 'Combined inequation $a < px + q \\le b$'], ['b', 'Do the same step to **all three** parts'], ['c', 'Dividing by a negative number: reverse **both** signs'], ['d', 'Rewrite with the smaller number on the left'], ['e', 'Pick members of the replacement set']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for a combined inequation: do the same step to all three parts; when dividing by a negative number reverse both signs; rewrite with the smaller number on the left; then pick the members of the replacement set.', 'Solving a combined (double) inequation.');
const nlCircles = numberLine({ from: -3, to: 4, rows: [{ sol: le1, tag: 'x ≤ 1' }, { sol: gt1, tag: 'x > 1' }] }, 'Top: a filled circle at $1$, so $1$ is included. Bottom: an open circle at $1$, so $1$ is excluded.', { lead: 'Two solution sets over the real numbers.' });
const we1Table = table(['Step', 'All three parts', 'Result'], [['Start', '', d(f1.lines[0])], ['Subtract $1$', '$-3 - 1$, $2x + 1 - 1$, $9 - 1$', d(f1.lines[1])], ['Divide by $2$', 'positive, so signs stay', d(f1.lines[2])]], 'Working table for minus 3 at most 2x plus 1 less than 9: subtracting 1 from all three parts gives minus 4 at most 2x less than 8; dividing by 2 gives minus 2 at most x less than 4.', 'Every step acts on all three parts.');
const nlF2 = numberLine({ from: -4, to: 3, rows: [{ sol: f2Z }] }, 'Dots at $-3, -2, -1, 0, 1$ and $2$; none at $3$.', { lead: 'Solution set of 5 less than 11 minus 2x at most 17 for integers.' });
const splitFlow = flow('TB', [['g', 'Two inequations, $A$ and $B$'], ['a', 'Solve $A$'], ['b', 'Solve $B$'], ['i', '$A \\cap B$: numbers in both'], ['u', '$A \\cup B$: numbers in either']], [['g', 'a'], ['g', 'b'], ['a', 'i'], ['b', 'i'], ['a', 'u'], ['b', 'u']], 'Flow chart: solve each of the two inequations separately; the intersection contains the numbers that satisfy both, and the union the numbers that satisfy at least one.', 'Intersection: overlap of the two graphs.');
const nlF3 = numberLine({ from: -4, to: 6, rows: [{ sol: f3A, tag: 'A' }, { sol: f3B, tag: 'B' }, { sol: f3AB, tag: 'A ∩ B' }] }, 'Row A: an open circle at $-2$. Row B: a filled circle at $4$. The overlap runs from the open circle at $-2$ to the filled circle at $4$.', { lead: 'Sets A, B and their intersection over the real numbers.' });
const nlRead = numberLine({ from: -5, to: 3, rows: [{ sol: readR }] }, 'An open circle at $-3$ and a filled circle at $1$, joined by a thick line.', { lead: 'A solution set to be read from the graph.' });
const nlZR = numberLine({ from: -3, to: 3, rows: [{ sol: zrZ, tag: 'x ∈ Z' }, { sol: zrR, tag: 'x ∈ R' }] }, 'Integers: dots at $-1, 0, 1, 2$. Real numbers: an open circle at $-2$, a filled circle at $2$ and a thick line.', { lead: 'The same combined inequation, minus 2 less than x at most 2, in two replacement sets.' });
const liftRows = [14, 15, 16, 17].map((x) => [d(String(x)), d(String(72 + 38 * x)), holds(f4c[0], fr(x)) ? 'yes' : 'no']);
must(liftRows.map((x) => x[2]).join() === 'yes,yes,yes,no', 'lift table');
const liftTable = table(['Boxes $x$', 'Load $72 + 38x$ (kg)', 'At most $680$?'], liftRows, 'Table of lift loads: 14 boxes give 604 kilograms, 15 give 642, 16 give exactly 680, which is allowed, and 17 give 718, which is too much.', 'The boundary value $16$ is allowed because the sign is $\\le$.');
const nlEmpty = numberLine({ from: -1, to: 7, rows: [{ sol: f5A, tag: 'x > 4' }, { sol: f5B, tag: 'x < 2' }] }, 'Top: an open circle at $4$, arrow to the right. Bottom: an open circle at $2$, arrow to the left. The graphs never overlap.', { lead: 'Two solution sets with no common part.' });
const sum2 = table(['Idea', 'Key fact'], [['Combined inequation', 'same step on all three parts; a negative divisor reverses both signs'], ['$\\le$ or $\\ge$', 'filled circle (end point included)'], ['$<$ or $>$', 'open circle (end point excluded)'], ['$\\mathbb{N}$, $\\mathbb{W}$, $\\mathbb{Z}$', 'separate dots'], ['$\\mathbb{R}$', 'thick line, with an arrow if it goes on for ever'], ['$A \\cap B$', 'the overlap; it may be empty ($\\phi$)']], 'Summary table for part 2: combined inequations, filled circles for included end points, open circles for excluded ones, dots for N, W and Z, a thick line for R, and the intersection as the overlap of two graphs, which may be empty.', 'Part 2 on one card.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Linear Inequations — Part 1: Replacement sets and solving',
  goals: ['Find the solution set of a linear inequation for a given replacement set', 'Solve linear inequations using the rules for inequalities', 'Explain why the sign reverses when multiplying or dividing by a negative number', 'Write solution sets in roster and set-builder form'],
  slides: [
    sl('title', 'Linear Inequations, Part 1', { b: 'An equation has one answer; an inequation usually has many. Which ones count depends on the replacement set.', v: nlE1, n: 'Welcome to linear inequations. An equation such as three x plus two equals fourteen has one answer. An inequation such as three x plus two is less than fourteen has many answers. In this part you will find all of them, for different sets of numbers, and learn the one rule that makes inequations different from equations.' }),
    sl('concept', 'What you will be able to do', { ul: ['Read the four inequality signs', 'Use the **replacement sets** $\\mathbb{N}$, $\\mathbb{W}$, $\\mathbb{Z}$ and $\\mathbb{R}$', 'Solve a linear inequation step by step', 'Reverse the sign when multiplying or dividing by a **negative** number', 'Write the answer in roster or set-builder form'], n: 'These are your goals for part one. First the signs and the replacement sets. Then the rules for solving, which are almost the same as for equations, with one important exception. Finally, how to write the solution set neatly, the way the board expects.' }),
    sl('concept', 'Inequality signs', { b: 'A **linear inequation** in one variable compares two expressions such as $3x + 2$ and $14$ with one of four signs.', v: signTable, n: 'There are four signs. Less than, and greater than, are strict: the boundary number does not count. Less than or equal to, and greater than or equal to, include the boundary. Look at the last column: three is a solution of x is less than or equal to three, but not of x is less than three.' }),
    sl('concept', 'Replacement set and solution set', { b: 'The **replacement set** is the set of numbers $x$ may take. The **solution set** is the set of those numbers that make the inequation true.', v: setsTable, n: 'Every inequation comes with a replacement set: the numbers you are allowed to try. Natural numbers start at one. Whole numbers start at zero. Integers include the negatives. Real numbers fill the whole number line. The solution set is the part of the replacement set that makes the statement true.' }),
    sl('diagram', 'One inequation, four replacement sets', { b: '$3x - 2 \\le 7$ simplifies to $x \\le 3$. The solution set depends on where $x$ comes from:', v: fourTable, n: 'Here is the same inequation in four replacement sets. It simplifies to x is at most three. For natural numbers, the answer is one, two and three. Whole numbers add zero. Integers go on for ever to the left. For real numbers we cannot list the answer, so we describe it in set builder form.' }),
    sl('example', 'Worked example 1: testing members', { b: 'Find the solution set of $3x + 2 < 14$ for (a) $x \\in \\mathbb{W}$ (b) $x \\in \\mathbb{N}$.', ul: [`**Step 1 —** ${d(e1.lines[0])}; subtract $2$: ${d(e1.lines[1])}.`, '**Step 2 —** Whole numbers less than $4$: $0, 1, 2, 3$.', `**Answer —** (a) $${roster(e1W)}$ (b) $${roster(e1N)}$.`, '**Check —** $x = 4$ gives $14 < 14$, which is false.'], v: testTable, n: 'Subtract two from both sides: three x is less than twelve. Divide by three: x is less than four. The table confirms it: zero, one, two and three give values below fourteen, but four gives exactly fourteen, which is not less than fourteen. For natural numbers, drop the zero.' }),
    sl('check', 'Quick check: natural numbers', { b: 'Solve, then keep only natural numbers.', chk: 'm02', n: 'Subtract four from both sides first. Then list the natural numbers that are smaller, and remember that zero is not a natural number.' }),
    sl('concept', 'Rules for solving an inequation', { b: 'Like an equation, an inequation stays true when you add, subtract, multiply or divide both sides by the same number, **except** that multiplying or dividing by a **negative** number reverses the sign.', v: rulesTable, n: 'The rules are nearly the same as for equations. Adding or subtracting the same number keeps the sign. Multiplying or dividing by a positive number keeps the sign. But multiply or divide by a negative number, and the sign must be turned round. Two is less than seven, but minus six is greater than minus twenty one.' }),
    sl('diagram', 'Why the sign reverses', { b: 'Multiplying by $-1$ reflects every number in $0$. A number that was to the left moves to the right.', v: nlMirror, n: 'Why does a negative number reverse the sign? Multiplying by minus one reflects the number line in zero. Two is to the left of five, so two is less than five. Their mirror images are minus two and minus five, and now minus two is to the right. So minus two is greater than minus five.' }),
    sl('check', 'Quick check: multiplying by minus one', { b: 'Think of the mirror at $0$.', chk: 'tf1', n: 'Picture two numbers and their reflections in zero. Does their order stay the same?' }),
    sl('example', 'Worked example 2: a negative coefficient', { b: 'Solve $7 - 3x \\ge -8$, $x \\in \\mathbb{N}$.', ul: [`**Step 1 —** ${d(e2.lines[0])}; subtract $7$: ${d(e2.lines[1])}.`, `**Step 2 —** Divide by $-3$ and **reverse** the sign: ${d(e2.lines[2])}.`, `**Answer —** $${roster(e2N)}$.`], v: nlE2, n: 'Subtract seven from both sides: minus three x is at least minus fifteen. Now divide by minus three. Because we divide by a negative number, the sign turns round: x is at most five. The natural numbers up to five are one to five, shown as five separate dots.' }),
    sl('check', 'Quick check: dividing by a negative', { b: 'Divide, and decide what happens to the sign.', chk: 'm04', n: 'You are dividing by a negative number. What must happen to the inequality sign?' }),
    sl('example', 'Worked example 3: fractions', { b: 'Solve $\\dfrac{x}{3} - 1 \\le \\dfrac{x - 2}{4}$, $x \\in \\mathbb{Z}$.', ul: [`**Step 1 —** Multiply by $12$, the LCM of $3$ and $4$: ${d(e3.lines[1])}.`, `**Step 2 —** ${d(e3.lines[2])}.`, `**Answer —** $${roster(e3Z)}$: every integer up to $6$.`], v: nlE3, n: 'Clear the fractions by multiplying every term by twelve, the lowest common multiple of three and four. Do not forget the minus one: it becomes minus twelve. Collect the x terms: x is at most six. For integers the list goes on for ever to the left, so we write dots before four, five and six.' }),
    sl('example', 'Worked example 4: real numbers', { b: 'Solve $4(x - 1) > 2x + 5$, $x \\in \\mathbb{R}$.', ul: [`**Step 1 —** ${d(e4.lines[1])}.`, `**Step 2 —** ${d(e4.lines[2])}.`, `**Answer —** $${builder(e4R, { decimal: true })}$.`], v: nlE4, n: 'Remove the bracket: four x minus four is greater than two x plus five. Collect terms: two x is greater than nine, so x is greater than four point five. Real numbers cannot be listed, so we use set builder form. On the number line, four point five gets an open circle because it is not included.' }),
    sl('concept', 'Writing the solution set', { b: 'Use **roster form** when the members can be listed, and **set-builder form** for real numbers.', v: formsTable, n: 'Use roster form when you can list the members, with three dots if the list goes on. Use set builder form for real numbers, because between any two real numbers there are infinitely many more. If nothing satisfies the inequation, the solution set is the empty set, written phi.' }),
    sl('check', 'Quick check: integers or real numbers?', { b: 'Which numbers lie between $1$ and $3$?', chk: 'tf6', n: 'Think about all the numbers between one and three, not only the whole ones.' }),
    sl('summary', 'Summary', { ul: ['The solution set is part of the replacement set', 'Add, subtract, or multiply and divide by a positive number: sign unchanged', 'Multiply or divide by a **negative** number: sign **reversed**', 'Roster form for $\\mathbb{N}$, $\\mathbb{W}$, $\\mathbb{Z}$; set-builder form for $\\mathbb{R}$'], v: sum1, n: 'To sum up part one. The solution set is the part of the replacement set that makes the inequation true. Solve as you would an equation, but reverse the sign whenever you multiply or divide by a negative number. Write the answer in roster form for natural numbers, whole numbers and integers, and in set builder form for real numbers.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Solve (2 marks):** correct steps 1 + solution set 1', '**Show the reversal:** write "dividing by $-3$, the sign is reversed"', '**Mistake:** including $0$ in $\\mathbb{N}$', '**Mistake:** keeping the sign when dividing by a negative number', '**Mistake:** forgetting to multiply a whole number term when clearing fractions', '**Mistake:** listing the answer when $x \\in \\mathbb{R}$'], n: 'In the exam, show every step and say in words when the sign is reversed. Read the replacement set carefully: zero is a whole number but not a natural number. When clearing fractions, multiply every term, including whole numbers. And never list a real number solution set: use set builder form.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Linear Inequations — Part 2: Combined inequations and the number line',
  goals: ['Solve combined (double) inequations', 'Find the intersection of the solution sets of two inequations', 'Represent solution sets on the number line with filled and open circles', 'Read a solution set from a number line'],
  slides: [
    sl('title', 'Linear Inequations, Part 2', { b: 'One picture can show a whole solution set: dots, lines and two kinds of circle.', v: nlT2, n: 'Welcome to part two. Here we solve combined inequations, where x is trapped between two numbers, and we find the numbers that satisfy two inequations at once. Then we draw every answer on the number line, where a filled circle and an open circle mean two very different things.' }),
    sl('concept', 'What you will be able to do', { ul: ['Solve a **combined** inequation such as $-3 \\le 2x + 1 < 9$', 'Find $A \\cap B$ for two inequations', 'Draw solution sets with **filled** and **open** circles', 'Read a solution set from a graph', 'Recognise an empty solution set'], n: 'These are your goals for part two. Combined inequations first, then pairs of inequations and their common solutions. Throughout, we represent answers on the number line, and we learn to read a graph back into set notation.' }),
    sl('concept', 'Combined (double) inequations', { b: '$-3 \\le 2x + 1 < 9$ means $-3 \\le 2x + 1$ **and** $2x + 1 < 9$. Work on all three parts at once:', v: combFlow, n: 'A combined inequation is two inequations written as one. Minus three is at most two x plus one, and two x plus one is less than nine. We can solve both together by doing the same step to all three parts. If we divide by a negative number, both signs reverse, and we then rewrite the answer with the smaller number first.' }),
    sl('diagram', 'Filled and open circles', { b: 'On the number line for $\\mathbb{R}$: **filled circle** = end point included ($\\le$, $\\ge$); **open circle** = end point excluded ($<$, $>$).', v: nlCircles, n: 'For real numbers we shade a thick line. At the end point, the circle tells us whether that number belongs. A filled circle means it is included, which goes with less than or equal to, and greater than or equal to. An open circle means it is left out, which goes with the strict signs.' }),
    sl('check', 'Quick check: choose the picture', { b: 'Decide the circle first, then the direction.', chk: 'm08', n: 'Is the end point included or not? And are the solutions to its left or its right?' }),
    sl('example', 'Worked example 1: a combined inequation in R', { b: 'Solve $-3 \\le 2x + 1 < 9$, $x \\in \\mathbb{R}$, and represent it on the number line.', ul: [`**Step 1 —** Subtract $1$ from all parts: ${d(f1.lines[1])}.`, `**Step 2 —** Divide by $2$: ${d(f1.lines[2])}.`, `**Answer —** $${builder(f1R)}$.`, '**Graph —** filled circle at $-2$, open circle at $4$, thick line between them (title slide).'], v: we1Table, n: 'Subtract one from all three parts: minus four is at most two x, which is less than eight. Divide all three parts by two, a positive number, so the signs stay: minus two is at most x, which is less than four. On the number line, minus two gets a filled circle and four an open circle.' }),
    sl('example', 'Worked example 2: dividing by a negative number', { b: 'Solve $5 < 11 - 2x \\le 17$, $x \\in \\mathbb{Z}$.', ul: [`**Step 1 —** Subtract $11$: ${d(f2.lines[1])}.`, `**Step 2 —** Divide by $-2$, reversing **both** signs: ${d(f2.lines[2])}.`, `**Step 3 —** Rewrite: ${d(f2.lines[3])}.`, `**Answer —** $${roster(f2Z)}$.`], v: nlF2, n: 'Subtract eleven from all three parts: minus six is less than minus two x, which is at most six. Divide by minus two, and reverse both signs: three is greater than x, which is at least minus three. Turn it round so the smaller number is first. The integers are minus three up to two, drawn as dots.' }),
    sl('check', 'Quick check: a combined inequation in Z', { b: 'Same step on all three parts.', chk: 'm09', n: 'Subtract one from every part, then divide every part by three. Watch which end point is included.' }),
    sl('concept', 'Two inequations: intersection and union', { b: 'When $x$ must satisfy **both** $A$ and $B$, solve each separately and take the **intersection** $A \\cap B$, the overlap of the two graphs.', v: splitFlow, n: 'Sometimes two separate inequations must both be true. Solve each one on its own. The numbers that satisfy both form the intersection, which is where the two graphs overlap. The union contains numbers that satisfy at least one of them.' }),
    sl('example', 'Worked example 3: the overlap of two graphs', { b: '$A = \\{x : x \\in \\mathbb{R},\\ 3x - 2 > -8\\}$, $B = \\{x : x \\in \\mathbb{R},\\ 2x + 1 \\le 9\\}$. Find $A \\cap B$.', ul: [`**Set A —** ${d(f3a.lines[0])}.`, `**Set B —** ${d(f3b.lines[0])}.`, `**Overlap —** ${d(f3.lines[0])}, so $A \\cap B = ${builder(f3AB)}$.`], v: nlF3, n: 'Set A gives x greater than minus two, with an open circle. Set B gives x at most four, with a filled circle. Draw both, one above the other. They overlap between minus two and four. Keep the open circle at minus two and the filled circle at four.' }),
    sl('diagram', 'Reading a number line', { b: 'Read the circles to choose the signs; read the line to see which numbers are included.', v: nlRead, n: 'Now go backwards. This graph shows a thick line from minus three to one. The circle at minus three is open, so minus three is excluded: x is greater than minus three. The circle at one is filled, so one is included: x is at most one. Together, minus three is less than x, which is at most one.' }),
    sl('check', 'Quick check: read the graph', { b: 'Open circle: strict sign. Filled circle: sign with "or equal to".', chk: 'm11', n: 'Look at each circle in turn and choose the matching sign.' }),
    sl('diagram', 'Integers or real numbers?', { b: 'For $-2 < x \\le 2$: integers give **dots**; real numbers give a **thick line**.', v: nlZR, n: 'The same combined inequation looks different in different replacement sets. For integers we draw separate dots at minus one, zero, one and two. For real numbers we draw a thick line, because every number between minus two and two, such as one point five, is a solution.' }),
    sl('example', 'Worked example 4: a word problem', { b: 'An imagined goods lift carries at most $680$ kg. Its operator weighs $72$ kg and each box weighs $38$ kg. How many boxes can go up with the operator?', ul: [`**Step 1 —** Let $x$ be the number of boxes: ${d(f4.lines[0])}.`, `**Step 2 —** ${d(f4.lines[1])}.`, '**Answer —** at most $16$ boxes ($x$ is a whole number).'], v: liftTable, n: 'Let x be the number of boxes. The load is seventy two plus thirty eight x, and it must be at most six hundred and eighty. Subtract seventy two and divide by thirty eight: x is at most sixteen. Sixteen boxes give exactly six hundred and eighty kilograms, which is allowed. Seventeen would be too heavy.' }),
    sl('example', 'Worked example 5: no common solution', { b: 'Find the real numbers that satisfy both $2x - 1 > 7$ and $3x + 2 < 8$.', ul: [`**First —** ${d(f5a.lines[0])}.`, `**Second —** ${d(f5b.lines[0])}.`, '**Answer —** no number is greater than $4$ and less than $2$, so the solution set is $\\phi$.'], v: nlEmpty, n: 'The first inequation gives x greater than four. The second gives x less than two. Draw both. One graph goes right from four, the other goes left from two, and they never meet. No number can be both, so the solution set is empty.' }),
    sl('check', 'Quick check: an empty solution set?', { b: 'Solve, then look in $\\mathbb{N}$.', chk: 'tf2', n: 'Solve the inequation, then ask whether any natural number satisfies it.' }),
    sl('summary', 'Summary', { ul: ['Combined inequation: same step on all three parts', 'Negative divisor: reverse **both** signs', 'Filled circle: included; open circle: excluded', 'Dots for $\\mathbb{N}$, $\\mathbb{W}$, $\\mathbb{Z}$; thick line for $\\mathbb{R}$', '$A \\cap B$ is the overlap, possibly $\\phi$'], v: sum2, n: 'To sum up part two. Solve a combined inequation by working on all three parts at once, reversing both signs for a negative divisor. On the number line, a filled circle includes the end point and an open circle excludes it. Use dots for natural numbers, whole numbers and integers, and a thick line for real numbers.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Combined inequation (3 marks):** steps 1 + reversal 1 + solution set 1', '**Number line (1 mark):** correct circles, line or dots, and arrows', '**Mistake:** reversing only one sign of a combined inequation', '**Mistake:** joining dots with a line when $x \\in \\mathbb{Z}$', '**Mistake:** a filled circle for a strict sign', '**Mistake:** forgetting the arrow when the set goes on for ever'], n: 'Number line marks are easy to lose. Check each end point: filled or open. Use dots for integers and a thick line only for real numbers. Draw an arrow when the set continues for ever. In a combined inequation, when you divide by a negative number, reverse both signs, then rewrite it with the smaller number on the left.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch04', version: 1, title: 'Linear Inequations — chapter notes', language: 'en',
  sections: [
    { heading: '1. Linear inequations and the four signs', body_md: r`A **linear inequation** in one variable compares two linear expressions with one of the signs $<$, $\le$, $>$, $\ge$, for example $3x + 2 < 14$.

- $<$ and $>$ are **strict**: the boundary number is not a solution.
- $\le$ and $\ge$ include the boundary: $x = 3$ satisfies $x \le 3$ but not $x < 3$.`, key_terms: [{ term: 'Linear inequation', definition_md: 'A statement such as $ax + b < c$ (or with $\\le$, $>$, $\\ge$) in which the variable has power $1$.' }, { term: 'Strict inequality', definition_md: 'One with $<$ or $>$; the boundary value is excluded.' }], formulas: [], visual: signTable, visuals: [], topic_ids: [topic(1)] },
    { heading: '2. Replacement set and solution set', body_md: r`The **replacement set** (domain) is the set from which $x$ is taken: $\mathbb{N} = \{1, 2, 3, \ldots\}$, $\mathbb{W} = \{0, 1, 2, \ldots\}$, $\mathbb{Z} = \{\ldots, -1, 0, 1, \ldots\}$ or $\mathbb{R}$, or a set given in the question. The **solution set** is the subset whose members make the inequation true.

*Example:* $3x - 2 \le 7$ gives $x \le 3$: over $\mathbb{N}$, $\{1, 2, 3\}$; over $\mathbb{W}$, $\{0, 1, 2, 3\}$; over $\mathbb{Z}$, $\{\ldots, 1, 2, 3\}$.`, key_terms: [{ term: 'Replacement set', definition_md: 'The set of values the variable may take.' }, { term: 'Solution set', definition_md: 'The members of the replacement set that satisfy the inequation.' }, { term: 'Empty set', definition_md: 'A solution set with no members, written $\\phi$ or $\\{\\ \\}$.' }], formulas: [], visual: setsTable, visuals: [fourTable], topic_ids: [topic(1)] },
    { heading: '3. Rules for solving', body_md: r`An inequation keeps its solution set when you

- add or subtract the same number (or expression) on both sides;
- multiply or divide both sides by the same **positive** number.

Then solve as for an equation: remove brackets, clear fractions with the LCM (multiply **every** term), collect $x$ terms on one side and numbers on the other.

*Example:* $\dfrac{x}{3} - 1 \le \dfrac{x - 2}{4}$; multiply by $12$: $4x - 12 \le 3x - 6$, so $x \le 6$.`, key_terms: [{ term: 'Equivalent inequations', definition_md: 'Inequations with the same solution set.' }], formulas: [{ latex: 'a < b \\Rightarrow a + c < b + c', label: 'Adding the same number' }, { latex: 'a < b,\\ k > 0 \\Rightarrow ka < kb', label: 'Multiplying by a positive number' }], visual: rulesTable, visuals: [testTable], topic_ids: [topic(2)] },
    { heading: '4. Multiplying or dividing by a negative number', body_md: r`Multiplying or dividing both sides by a **negative** number **reverses** the sign: $<$ becomes $>$ and $\le$ becomes $\ge$.

**Why:** multiplying by $-1$ reflects the number line in $0$, so the order of any two numbers is turned round: $2 < 5$ but $-2 > -5$.

*Example:* $7 - 3x \ge -8 \Rightarrow -3x \ge -15 \Rightarrow x \le 5$ (dividing by $-3$).`, key_terms: [{ term: 'Reversing the sign', definition_md: 'Changing $<$ to $>$ (or $\\le$ to $\\ge$) when both sides are multiplied or divided by a negative number.' }], formulas: [{ latex: 'a < b,\\ k < 0 \\Rightarrow ka > kb', label: 'Multiplying by a negative number' }], visual: nlMirror, visuals: [nlE2], topic_ids: [topic(2)] },
    { heading: '5. Combined (double) inequations', body_md: r`$a < px + q \le b$ means $a < px + q$ **and** $px + q \le b$.

- When $x$ appears only in the middle, do the same step to all three parts; dividing by a negative number reverses **both** signs. Rewrite with the smaller number on the left.
- When $x$ appears in all three parts (e.g. $3x - 7 < 2x + 1 \le 4x + 6$), split it into two inequations and take the common part.

*Example:* $5 < 11 - 2x \le 17 \Rightarrow -6 < -2x \le 6 \Rightarrow 3 > x \ge -3$, i.e. $-3 \le x < 3$.`, key_terms: [{ term: 'Combined inequation', definition_md: 'Two inequations written together, such as $-3 \\le 2x + 1 < 9$.' }], formulas: [], visual: combFlow, visuals: [we1Table], topic_ids: [topic(2)] },
    { heading: '6. Representing solution sets on the number line', body_md: r`- $x \in \mathbb{N}$, $\mathbb{W}$ or $\mathbb{Z}$: separate **filled dots** at the members; three dots ($\ldots$) or an arrow shows that the set goes on.
- $x \in \mathbb{R}$: a **thick line**, with a **filled circle** at an included end point ($\le$, $\ge$), an **open circle** at an excluded end point ($<$, $>$), and an arrow if the set goes on for ever.
- Reading a graph: open circle $\to$ strict sign, filled circle $\to$ sign with "or equal to".`, key_terms: [{ term: 'Filled circle', definition_md: 'Marks an end point that belongs to the solution set.' }, { term: 'Open circle', definition_md: 'Marks an end point that does not belong to the solution set.' }], formulas: [], visual: nlCircles, visuals: [nlZR, nlRead], topic_ids: [topic(3)] },
    { heading: '7. Two inequations: intersection, union and the empty set', body_md: r`For $A = \{x : \ldots\}$ and $B = \{x : \ldots\}$, solve each separately.

- $A \cap B$: numbers in both, the overlap of the two graphs. *Example:* $x > -2$ and $x \le 4$ give $-2 < x \le 4$.
- $A \cup B$: numbers in at least one of them.
- If the graphs do not overlap ($x > 4$ and $x < 2$), $A \cap B = \phi$.`, key_terms: [{ term: 'Intersection', definition_md: 'The set of numbers satisfying both inequations, $A \\cap B$.' }, { term: 'Union', definition_md: 'The set of numbers satisfying at least one inequation, $A \\cup B$.' }], formulas: [], visual: nlF3, visuals: [nlEmpty], topic_ids: [topic(2), topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Solve and write the solution set (2–3 marks):* correct steps 1–2; solution set in the right form 1.
- *Combined inequation (3–4 marks):* same step on all parts 1; reversal of both signs 1; solution set 1; number line 1.
- *Number line (1 mark):* dots for $\mathbb{N}$, $\mathbb{W}$, $\mathbb{Z}$; thick line for $\mathbb{R}$; filled or open circles; arrows.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Not reversing the sign when multiplying or dividing by a negative number (or reversing only one sign of a combined inequation).
2. Including $0$ in $\mathbb{N}$, or negative numbers in $\mathbb{W}$.
3. Forgetting to multiply a whole-number term when clearing fractions.
4. Filled circle for $<$ or $>$; open circle for $\le$ or $\ge$.
5. Joining dots with a line for integers, or listing a real-number solution set.
6. Leaving out the arrow when the solution set goes on for ever.`,
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch04', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **linear inequation** in one variable?', 'A statement comparing two linear expressions in $x$ with $<$, $\\le$, $>$ or $\\ge$, e.g. $3x + 2 < 14$.', 'definition', 1),
    fc('f02', 'What is a **replacement set**?', 'The set of values the variable is allowed to take.', 'definition', 1),
    fc('f03', 'What is a **solution set**?', 'The members of the replacement set that make the inequation true.', 'definition', 1),
    fc('f04', 'List the start of $\\mathbb{N}$ and of $\\mathbb{W}$.', '$\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$; $\\mathbb{W} = \\{0, 1, 2, \\ldots\\}$', 'fact', 1),
    fc('f05', 'What does $\\mathbb{Z}$ contain that $\\mathbb{W}$ does not?', 'The negative integers $-1, -2, -3, \\ldots$', 'fact', 1),
    fc('f06', 'Is $3$ a solution of $x < 3$? Of $x \\le 3$?', 'No; yes.', 'concept', 1),
    fc('f07', '$3x - 2 \\le 7$ over $\\mathbb{N}$, $\\mathbb{W}$?', '$\\{1, 2, 3\\}$; $\\{0, 1, 2, 3\\}$', 'example', 1),
    fc('f08', 'How is the empty set written?', '$\\phi$ or $\\{\\ \\}$', 'fact', 1),
    fc('f09', 'Which operations keep the inequality sign?', 'Adding or subtracting any number; multiplying or dividing by a positive number.', 'concept', 2),
    fc('f10', 'When is the inequality sign reversed?', 'When both sides are multiplied or divided by a negative number.', 'concept', 2),
    fc('f11', 'Why does multiplying by $-1$ reverse the sign?', 'It reflects the number line in $0$, turning the order round: $2 < 5$ but $-2 > -5$.', 'concept', 2),
    fc('f12', 'Solve $-3x \\ge -15$.', '$x \\le 5$ (divide by $-3$, reverse the sign).', 'example', 2),
    fc('f13', 'Clearing fractions in $\\dfrac{x}{3} - 1 \\le \\dfrac{x - 2}{4}$: multiply by?', '$12$, every term, including the $1$.', 'exam-tip', 2),
    fc('f14', 'What does $-3 \\le 2x + 1 < 9$ mean?', '$-3 \\le 2x + 1$ **and** $2x + 1 < 9$.', 'definition', 2),
    fc('f15', 'Combined inequation: how do you solve it?', 'Do the same step to all three parts.', 'concept', 2),
    fc('f16', 'Dividing all parts of $-6 < -2x \\le 6$ by $-2$ gives?', '$3 > x \\ge -3$, i.e. $-3 \\le x < 3$.', 'example', 2),
    fc('f17', '$x$ appears in all three parts, e.g. $3x - 7 < 2x + 1 \\le 4x + 6$. Method?', 'Split into two inequations, solve each, take the common part.', 'concept', 2),
    fc('f18', 'Roster or set-builder form for $x \\in \\mathbb{R}$?', 'Set-builder form, e.g. $\\{x : x \\in \\mathbb{R},\\ x > 4.5\\}$.', 'exam-tip', 1),
    fc('f19', 'What does $A \\cap B$ mean for two inequations?', 'The numbers that satisfy both: the overlap of their graphs.', 'definition', 2),
    fc('f20', '$x > 4$ and $x < 2$: common solution?', 'None: $\\phi$.', 'example', 2),
    fc('f21', 'Filled circle on a number line means…', 'the end point is included ($\\le$ or $\\ge$).', 'definition', 3),
    fc('f22', 'Open circle on a number line means…', 'the end point is excluded ($<$ or $>$).', 'definition', 3),
    fc('f23', 'Graph of a solution set in $\\mathbb{Z}$?', 'Separate filled dots, not a line.', 'diagram', 3),
    fc('f24', 'Graph of $x > 4.5$, $x \\in \\mathbb{R}$?', 'Open circle at $4.5$, thick line with an arrow to the right.', 'diagram', 3),
    fc('f25', 'Graph: filled circle at $-1$, open circle at $4$, thick line. Set?', '$\\{x : x \\in \\mathbb{R},\\ -1 \\le x < 4\\}$', 'diagram', 3),
    fc('f26', 'When does a number-line graph need an arrow?', 'When the solution set goes on for ever in that direction.', 'exam-tip', 3),
    fc('f27', 'Most common sign mistake?', 'Forgetting to reverse the sign when dividing by a negative number.', 'exam-tip', 2),
    fc('f28', 'Greatest integer with $x < 7.5$?', '$7$', 'example', 1),
    fc('f29', 'Word problem: "at most" and "at least" become?', '"At most" is $\\le$; "at least" is $\\ge$.', 'exam-tip', 2),
    fc('f30', 'How do you check a solution set?', 'Substitute a member (it must work) and a number just outside (it must fail).', 'exam-tip', 1),
  ],
  status: 'draft', provenance: d1.provenance,
};
must(roster(solution([ineq(L(3, -2), '<=', 7)], 'N')) === r`\{1, 2, 3\}` && Math.max(...solution([ineq(X, '<', 7.5)], 'Z').members) === 7, 'flashcard values');
must(solveAll(combined(-6, '<', L(-2), '<=', 6)).length === 1 && builder(solution(combined(-6, '<', L(-2), '<=', 6), 'R')) === r`\{x : x \in \mathbb{R},\ -3 \le x < 3\}`, 'f16');
must(builder(solution(combined(-1, '<=', X, '<', 4), 'R')) === r`\{x : x \in \mathbb{R},\ -1 \le x < 4\}`, 'f25');

// ---------------------------------------------------------------- SVG allow-list check (0 errors, 0 warnings)
const svgs = [];
for (const dk of [d1, d2]) for (const s of dk.slides) if (s.visual?.kind === 'svg') svgs.push([`deck${dk.part}/${s.id}`, s.visual]);
notes.sections.forEach((s, i) => [s.visual, ...s.visuals].forEach((v, k) => v?.kind === 'svg' && svgs.push([`notes[${i}].${k}`, v])));
const { fig11, fig06 } = await import('./questions.mjs');
svgs.push(['m11', fig11], ['l06', fig06]);
for (const [where, v] of svgs) {
  const res = checkSvg(v.spec);
  if (res.errors.length || res.warnings.length) throw new Error(`${where}: SVG check ${JSON.stringify(res)}`);
}

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch04', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only (linear inequations in one variable; replacement and solution sets over N, W, Z, R and given finite sets; solving with the rules, including the sign reversal for a negative multiplier or divisor; combined inequations and intersections; representation on the number line with filled and open circles); the chapter lists no removed topics.', solution_sets: `every solution set is computed by exact rational algebra in src/ineq.mjs and cross-checked by brute force over N, W and Z (every integer from -300 to 300 tested in the original inequations) or over the given replacement set, and by sampling R at every end point, end point ± 1/1000 and ± 1/7, a 1/8 grid and odd sevenths; every typed working line is evaluated at 321 grid points plus each end point and end point ± 0.0001 (src/work.mjs) and must have the same solution set`, number_lines: `${NL_LOG.length} number lines drawn as allow-listed SVG from the verified sets (filled dots for N, W, Z; thick line with filled/open circles and arrows for R): ${NL_LOG.reduce((s, x) => s + x.ends.closed, 0)} filled circles, ${NL_LOG.reduce((s, x) => s + x.ends.open, 0)} open circles, ${NL_LOG.reduce((s, x) => s + x.ends.dots, 0)} dots, ${NL_LOG.reduce((s, x) => s + x.ends.arrows, 0)} arrows; alt text generated from the set; every caption names the end-point kinds drawn; ${svgs.length} SVGs pass the pipeline SVG check with 0 errors and 0 warnings` } },
};
const tests = chapterTests('Linear Inequations', {
  A: ['m03', 'm06', 'm10', 'ar3', 's301', 's302'],
  B: ['l01', 'l02'],
}, {
  A: ['m05', 'm12', 'm13', 'm15', 'm17', 'm19', 'ar4', 'ar5', 's401', 's403', 's404'],
  B: ['l03', 'l04', 'l05'],
});
build({ dir: DIR, release, testsSpec: tests });
console.log(`number lines: ${NL_LOG.length}; SVGs checked: ${svgs.length}`);

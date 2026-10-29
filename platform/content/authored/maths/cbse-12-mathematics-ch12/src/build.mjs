// Build CBSE 12 Mathematics ch12 Linear Programming. Run from platform/:
//   npx tsx content/authored/maths/cbse-12-mathematics-ch12/src/build.mjs
// Deleted for 2026-27 and absent everywhere: the classification of LPPs into types (manufacturing, diet,
// transportation problems). Short formulation contexts are kept, as the syllabus asks for formulation.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, plot, table, flow, build, chapterTests, r } from '../../cbse-12-mathematics-ch01/src/lib.mjs';
import { solveLP, corners, feasible, sameSet } from './lp.mjs';

setUnit('cbse-12-mathematics-ch12');
const { REG } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- self-checks for every worked example
const fail = [];
const ok = (cond, msg) => { if (!cond) fail.push(msg); };
const S = (reg, p, q, kind) => solveLP(Array.isArray(reg) ? reg : REG[reg], p, q, kind);
// deck 1
ok(feasible(REG.BAKE, 12, 16) && !feasible(REG.BAKE, 15, 15) && feasible(REG.BAKE, 10, 10), 'D1 WE1 test points (bakery)');
ok(sameSet(corners(REG.R1), [[0, 0], [8, 0], [6, 2], [0, 5]]), 'D1 WE2 corners R1');
ok(!S('R2', 1, 1, 'min').bounded && sameSet(corners(REG.R2), [[0, 6], [4.5, 1.5], [9, 0]]), 'D1 unbounded R2');
ok(S('G', 1, 1, 'max').empty, 'D1 infeasible G');
const SPICE = [[1, 1, '<=', 50], [2, 1, '>=', 40]];
ok(feasible(SPICE, 20, 10) && !feasible(SPICE, 10, 10) && !feasible(SPICE, 30, 30), 'D1 WE3 spice constraints');
// deck 2
const w1 = S('R1', 3, 5, 'max');
ok(w1.value === 28 && sameSet(w1.at, [[6, 2]]) && w1.values.join() === '0,25,28,24', 'D2 WE1 max 28 at (6, 2)');
const w1m = S('R1', 3, 5, 'min');
ok(w1m.value === 0 && sameSet(w1m.at, [[0, 0]]), 'D2 min 0');
const w2 = S('R2', 2, 3, 'min');
ok(w2.exists && w2.value === 13.5 && sameSet(w2.at, [[4.5, 1.5]]), 'D2 WE2 min 13.5');
const w3 = S('R2', 1, 1, 'max');
ok(!w3.exists && feasible(REG.R2, 20, 20), 'D2 WE3 no max');
const w4 = S('R1', 2, 4, 'max');
ok(w4.value === 20 && sameSet(w4.at, [[6, 2], [0, 5]]) && 2 * 3 + 4 * 3.5 === 20 && feasible(REG.R1, 3, 3.5), 'D2 WE4 multiple optima');
const w5 = S('BAKE', 60, 80, 'max');
ok(w5.value === 2000 && sameSet(w5.at, [[12, 16]]) && w5.values.join() === '0,1920,2000,1200', 'D2 WE5 bakery 2000');
if (fail.length) { console.error('WORKED-EXAMPLE CHECKS FAILED:', fail); process.exit(1); }

// ---------------------------------------------------------------- plots of regions
const num = (v) => String(+v.toFixed(6));
/** Label of a boundary line a·x + b·y = c. */
function lineTex(a, b, c) {
  const t = (k, v) => (k === 1 ? v : k === -1 ? `-${v}` : `${k}${v}`);
  let s = a ? t(a, 'x') : '';
  if (b) s += s ? (b > 0 ? ` + ${t(b, 'y')}` : ` - ${t(-b, 'y')}`) : t(b, 'y');
  return `$${s} = ${c}$`;
}
/** A region plot: non-vertical boundaries as functions, vertical ones as vlines; corners marked. */
function regionPlot(cons, { x, y, extra = [], pts }, alt, caption) {
  const fns = cons.filter(([, b]) => b !== 0).map(([a, b, , c]) => ({ expr: a === 0 ? num(c / b) : `(${num(c)} - ${a === 1 ? '' : num(a)}x)/${num(b)}`.replace('(0 - ', '(-').replace('/1', ''), label: lineTex(a, b, c) }));
  const vl = cons.filter(([, b]) => b === 0).map(([a, , , c]) => ({ x: c / a, label: lineTex(a, 0, c), dashed: false }));
  const onFn = ([px, py]) => cons.some(([a, b, , c]) => b !== 0 && Math.abs(a * px + b * py - c) < 1e-9);
  const onV = ([px, py]) => cons.some(([a, b, , c]) => b === 0 && Math.abs(a * px - c) < 1e-9) && py >= 0;
  const marked = (pts ?? corners(cons)).map(([px, py]) => [px, py, `(${num(px)}, ${num(py)})`, onFn([px, py]) ? undefined : 'free']);
  const v = plot({ x, y, fns: [...fns, ...extra], pts: marked }, alt, caption);
  if (vl.length) v.spec.vlines = vl;
  v.spec.points.forEach((p) => { if (!onFn(p.at) && !onV(p.at) && !extra.length) p.on_curve = false; });
  return v;
}
const pTitle = regionPlot(REG.BAKE, { x: [0, 26], y: [0, 30] }, 'Two straight lines in the first quadrant: 2 x plus y equals 40, steep, from (20, 0) up to the y-axis at 40; and 2 x plus 3 y equals 72, gentler, from the y-axis at 24 to the x-axis at 36. They cross at (12, 16). The feasible region is the quadrilateral below both lines with corners (0, 0), (20, 0), (12, 16) and (0, 24).', 'The bakery\'s feasible region: a quadrilateral with four corners.');
const pHalf = plot({ x: [-1, 8], y: [-1, 6], fns: [{ expr: '(12 - 2x)/3', label: '$2x + 3y = 12$' }], pts: [[0, 0, 'O', 'free'], [6, 0, '(6, 0)'], [0, 4, '(0, 4)'], [4, 3, 'P', 'free']] }, 'The line 2 x plus 3 y equals 12 through (6, 0) and (0, 4). The origin O lies below the line and P at (4, 3) lies above it. Since 0 is at most 12, the half-plane containing the origin is the solution set of 2 x plus 3 y at most 12.', 'Test the origin: $0 \\le 12$ is true, so shade the origin side.');
pHalf.spec.points[0].on_curve = false;
pHalf.spec.points[3].on_curve = false;
const pR1 = regionPlot(REG.R1, { x: [0, 11], y: [0, 9] }, 'The lines x plus y equals 8, through (8, 0) and (0, 8), and x plus 2 y equals 10, through (10, 0) and (0, 5), crossing at (6, 2). The feasible region is the quadrilateral below both lines with corners (0, 0), (8, 0), (6, 2) and (0, 5).', 'Corners of the region: $(0, 0)$, $(8, 0)$, $(6, 2)$, $(0, 5)$.');
const pR2 = regionPlot(REG.R2, { x: [0, 12], y: [0, 9] }, 'The lines x plus y equals 6 and x plus 3 y equals 9, crossing at (4.5, 1.5). The feasible region lies above and to the right of both lines and stretches without end: it is unbounded, with corners (0, 6), (4.5, 1.5) and (9, 0).', 'An unbounded region: the corners exist, but the region has no far edge.');
const pG = plot({ x: [0, 7], y: [0, 5], fns: [{ expr: '3 - x', label: '$x + y = 3$' }, { expr: '(12 - 2x)/3', label: '$2x + 3y = 12$' }], pts: [[3, 0, '(3, 0)'], [6, 0, '(6, 0)'], [0, 3, '(0, 3)'], [0, 4, '(0, 4)']] }, 'Two lines in the first quadrant: x plus y equals 3 from (3, 0) to (0, 3), and 2 x plus 3 y equals 12 from (6, 0) to (0, 4). The first constraint keeps points below the lower line, the second keeps points above the upper line, so no point satisfies both.', 'No overlap: the feasible region is empty.');
const pSpice = regionPlot(SPICE, { x: [0, 55], y: [0, 55] }, 'The lines x plus y equals 50 and 2 x plus y equals 40. The first keeps points on the origin side, the second keeps points away from the origin. The feasible region is the four-sided strip between them with corners (0, 40), (20, 0), (50, 0) and (0, 50).', 'A region between two lines: one "at most" and one "at least" constraint.');
const pIso = plot({ x: [0, 11], y: [0, 9], fns: [{ expr: '8 - x', label: '$x + y = 8$' }, { expr: '(10 - x)/2', label: '$x + 2y = 10$' }, { expr: '(15 - 3x)/5', label: '$Z = 15$' }, { expr: '(28 - 3x)/5', label: '$Z = 28$' }], pts: [[6, 2, '(6, 2)'], [0, 5, '(0, 5)'], [8, 0, '(8, 0)']] }, 'The quadrilateral region with corners (0, 0), (8, 0), (6, 2) and (0, 5), and two parallel objective lines 3 x plus 5 y equals 15 and 3 x plus 5 y equals 28. Sliding the line outwards, the last point of the region it touches is the corner (6, 2).', 'Parallel lines $3x + 5y = k$: the last region point touched is a corner.');
pIso.spec.points.forEach((p) => { p.on_curve = undefined; });
const pR2half = plot({ x: [0, 12], y: [0, 9], fns: [{ expr: '6 - x', label: '$x + y = 6$' }, { expr: '(9 - x)/3', label: '$x + 3y = 9$' }, { expr: '(13.5 - 2x)/3', label: '$2x + 3y = 13.5$' }], pts: [[0, 6, '(0, 6)'], [4.5, 1.5, '(4.5, 1.5)'], [9, 0, '(9, 0)']] }, 'The unbounded region above x plus y equals 6 and x plus 3 y equals 9, with the dashed objective line 2 x plus 3 y equals 13.5 touching it only at the corner (4.5, 1.5). Every other point of the region lies on the far side of this line.', 'The half-plane $2x + 3y < 13.5$ misses the region, so the minimum is $13.5$.');
const pEdge = plot({ x: [0, 11], y: [0, 9], fns: [{ expr: '8 - x', label: '$x + y = 8$' }, { expr: '(10 - x)/2', label: '$x + 2y = 10$' }, { expr: '(20 - 2x)/4', label: '$2x + 4y = 20$' }], pts: [[6, 2, '(6, 2)'], [0, 5, '(0, 5)'], [8, 0, '(8, 0)']] }, 'The quadrilateral region with corners (0, 0), (8, 0), (6, 2) and (0, 5). The objective line 2 x plus 4 y equals 20 lies exactly along the edge from (0, 5) to (6, 2), so it touches the region along a whole edge.', 'Objective parallel to an edge: every point of that edge is optimal.');

const cornerTable = (rows, alt, caption, zLabel = '$Z$') => table(['Corner', zLabel], rows, alt, caption);
const termsTable = table(['Term', 'Meaning', 'Bakery example'], [['Decision variables', 'Quantities we choose', '$x$ sponge, $y$ fruit cakes'], ['Objective function', 'Linear quantity to optimise', '$Z = 60x + 80y$ (profit, ₹)'], ['Constraints', 'Linear limits on resources', r`$2x + y \le 40$, $2x + 3y \le 72$`], ['Non-negativity', 'Variables cannot be negative', r`$x \ge 0$, $y \ge 0$`]], 'Table of the four basic terms. Decision variables: quantities we choose, here x sponge and y fruit cakes. Objective function: the linear quantity to optimise, here profit 60 x plus 80 y. Constraints: linear limits, here 2 x plus y at most 40 and 2 x plus 3 y at most 72. Non-negativity: x and y at least 0.', 'The vocabulary of a linear programming problem.');
const bakeTable = table(['Resource', 'Sponge cake', 'Fruit cake', 'Available'], [['Flour (g)', '$300$', '$150$', '$6000$'], ['Oven time (min)', '$20$', '$30$', '$720$'], ['Profit (₹)', '$60$', '$80$', '—']], 'Table for the Kanpur bakery: a sponge cake uses 300 grams of flour and 20 minutes of oven time and earns 60 rupees; a fruit cake uses 150 grams and 30 minutes and earns 80 rupees. Available: 6000 grams of flour and 720 minutes.', 'Turn each row of the table into one line of the problem.');
const testTable = table(['Point', r`$2x + y \le 40$`, r`$2x + 3y \le 72$`, 'Feasible?'], [['$(10, 10)$', '$30$ ✓', '$50$ ✓', 'yes'], ['$(12, 16)$', '$40$ ✓', '$72$ ✓', 'yes (a corner)'], ['$(15, 15)$', '$45$ ✗', '$75$ ✗', 'no']], 'Table testing three bakery plans: (10, 10) gives 30 and 50, feasible; (12, 16) gives exactly 40 and 72, feasible and a corner; (15, 15) gives 45 and 75, breaking both constraints, so infeasible.', 'A plan is feasible only if it passes every constraint.');
const methodFlow = flow('TB', [['f', 'Formulate: variables, objective, constraints'], ['d', 'Draw each boundary line; shade with a test point'], ['r', 'Identify the feasible region; is it empty?'], ['c', 'Find every corner (solve pairs of lines)'], ['z', 'Evaluate $Z$ at each corner'], ['b', 'Bounded: largest/smallest corner value is the answer'], ['u', 'Unbounded: half-plane test before accepting']], [['f', 'd'], ['d', 'r'], ['r', 'c', 'non-empty'], ['c', 'z'], ['z', 'b', 'bounded'], ['z', 'u', 'unbounded']], 'Flow chart of the corner-point method: formulate, draw the boundary lines and shade, identify the feasible region, find every corner, evaluate Z at each corner; if the region is bounded, the largest or smallest value is the answer; if unbounded, apply the half-plane test first.', 'The corner-point method in six steps.');
const halfFlow = flow('TB', [['m', 'Smallest corner value $m$ (or largest $M$)'], ['h', 'Draw $ax + by = m$; look at the open half-plane $ax + by < m$ (or $> M$)'], ['q', 'Does it share any point with the region?'], ['y', 'No: $m$ is the minimum (or $M$ the maximum)'], ['n', 'Yes: no minimum (or no maximum)']], [['m', 'h'], ['h', 'q'], ['q', 'y', 'no common point'], ['q', 'n', 'common point']], 'Flow chart of the half-plane test for an unbounded region: take the smallest corner value m, draw the line a x plus b y equals m, and look at the open half-plane a x plus b y less than m. If it shares no point with the region, m is the minimum; otherwise there is no minimum. The same works for a maximum with greater than M.', 'The extra step for unbounded regions.');
const casesTable = table(['Region', 'What can happen', 'How to tell'], [['Bounded, non-empty', 'Max and min both exist, at corners', 'Compare corner values'], ['Unbounded', 'An optimum may or may not exist', 'Half-plane test'], ['Two corners tie', 'Infinitely many optimal points', 'Equal best values at adjacent corners'], ['Empty', 'No feasible point, no solution', 'Constraints contradict']], 'Summary table of the cases: a bounded non-empty region always has a maximum and a minimum at corners; an unbounded region may or may not have an optimum, decided by the half-plane test; two tied adjacent corners give infinitely many optimal points; an empty region means no solution.', 'Four situations every student should recognise.');

// ---------------------------------------------------------------- deck 1
const d1 = deck({
  part: 1,
  title: 'Linear Programming — Part 1: Formulation and feasible regions',
  goals: ['Use the terms decision variable, objective function, constraint and non-negativity', 'Formulate a linear programming problem from a short situation', 'Draw the half-plane of a linear inequality using a test point', 'Identify bounded, unbounded and empty feasible regions and list their corner points'],
  slides: [
    sl('title', 'Linear Programming, Part 1: Setting up the problem', { b: 'Limited flour, limited oven time — how many of each cake earns the most?', v: pTitle, n: 'Welcome. A bakery has only so much flour and so many oven hours, and two kinds of cake that earn different profits. Which mix of cakes is best? Questions like this, with straight-line limits and a straight-line goal, are linear programming problems. In this part you will learn to write such a problem in symbols and to draw the region of all the plans that are actually possible.' }),
    sl('concept', 'What you will be able to do', { ul: ['Name the parts of a **linear programming problem** (LPP)', '**Formulate** an LPP from a short situation', 'Draw the region of a linear inequality with a **test point**', 'Find the **feasible region** and its **corner points**', 'Recognise **bounded**, **unbounded** and **empty** regions'], n: 'Here are the goals of part one. First the vocabulary, then the skill of turning words into inequalities. After that we draw half-planes, combine them into a feasible region, and find its corners. Part two will use those corners to find the best plan.' }),
    sl('concept', 'Optimising under limits', { b: 'We want the **largest** profit or the **smallest** cost, but every plan must respect **limits** on resources. When the goal and all the limits are **linear**, the problem is a linear programming problem.', v: bakeTable, n: 'Look at the bakery table. A sponge cake needs three hundred grams of flour and twenty minutes in the oven; a fruit cake needs one hundred and fifty grams and thirty minutes. The baker has six kilograms of flour and twelve hours of oven time, and earns sixty or eighty rupees per cake. Every row of this table will become one line of our problem.' }),
    sl('concept', 'The vocabulary', { b: 'Every linear programming problem has the same four parts.', v: termsTable, n: 'The decision variables are the quantities we are free to choose, here the numbers of each cake. The objective function is the quantity we want to make as large or as small as possible, here the profit. The constraints are the limits, written as linear inequalities. And the non-negativity constraints say we cannot bake a negative number of cakes.' }),
    sl('example', 'Worked example 1: formulate the bakery problem', { b: 'Let $x$ sponge cakes and $y$ fruit cakes be baked.', ul: ['**Objective:** maximise $Z = 60x + 80y$', r`**Flour:** $300x + 150y \le 6000 \Rightarrow 2x + y \le 40$`, r`**Oven:** $20x + 30y \le 720 \Rightarrow 2x + 3y \le 72$`, r`**Non-negativity:** $x \ge 0$, $y \ge 0$`], v: testTable, n: 'Name the variables first, with what they count. The profit is sixty x plus eighty y. Flour used is three hundred x plus one hundred and fifty y, at most six thousand grams; dividing by one hundred and fifty gives two x plus y at most forty. Oven minutes give two x plus three y at most seventy two. The table tests three plans against these constraints.' }),
    sl('diagram', 'Graphing one inequality', { b: r`The line $2x + 3y = 12$ splits the plane into two **half-planes**. Test a point not on the line, usually the origin: $0 \le 12$ is true, so $2x + 3y \le 12$ is the origin side.`, v: pHalf, n: 'To draw an inequality, first draw its boundary line using the two intercepts. The line divides the plane into two halves. Pick a test point that is not on the line, usually the origin, and substitute. If the inequality is true there, the origin side is the solution; if false, the other side is. Points on the line itself are included when the sign allows equality.' }),
    sl('check', 'Quick check: which point fits?', { b: 'Substitute each point into the inequality.', chk: 'm03', n: 'Substitute each point carefully and remember that equality is allowed for an at most sign.' }),
    sl('diagram', 'The feasible region', { b: r`The **feasible region** is the set of points satisfying **all** constraints at once: the overlap of the half-planes, inside the first quadrant. For $x + y \le 8$, $x + 2y \le 10$ it is a quadrilateral.`, v: pR1, n: 'Each constraint gives one half-plane. The non-negativity constraints keep us in the first quadrant. The feasible region is the part of the plane that lies in every one of these half-planes at the same time. Here the two lines cut out a four-sided region below both of them. Any point inside or on its boundary is a feasible plan.' }),
    sl('concept', 'Feasible, infeasible and optimal', { b: 'A point of the feasible region is a **feasible solution**; a point outside is **infeasible**. A feasible solution that gives the best value of $Z$ is an **optimal solution**.', v: testTable, n: 'Three words to keep apart. Feasible means the plan obeys every constraint. Infeasible means it breaks at least one. Optimal means it is feasible and also gives the best possible value of the objective. In the table, ten sponge and ten fruit cakes is feasible but probably not the best, while fifteen of each is not even allowed.' }),
    sl('example', 'Worked example 2: corners of a region', { b: r`Find the corner points of $x + y \le 8$, $x + 2y \le 10$, $x, y \ge 0$.`, ul: ['On the axes: $(0, 0)$, $(8, 0)$ from the first line, $(0, 5)$ from the second', 'Intersection: subtract the equations, $y = 2$, then $x = 6$', r`Check $(6, 2)$: $8 \le 8$ and $10 \le 10$`, r`Reject $(10, 0)$ and $(0, 8)$: each breaks the other constraint`], v: pR1, n: 'Corners come from pairs of boundary lines. The axis points are easy; just be sure each one obeys the other constraint. For example zero comma eight lies on the first line but gives sixteen in the second, more than ten, so it is not a corner. The two slanting lines meet where we subtract the equations: y is two and x is six. So the corners are four points.' }),
    sl('check', 'Quick check: test the origin', { b: 'Decide which side of the line to shade.', chk: 'm18', n: 'Put zero for both variables and ask whether the inequality is then true or false.' }),
    sl('diagram', 'Bounded and unbounded regions', { b: r`A region that fits inside some circle is **bounded**. The region $x + y \ge 6$, $x + 3y \ge 9$, $x, y \ge 0$ stretches without end: it is **unbounded**, but it still has corners.`, v: pR2, n: 'Some regions are closed off on every side, like the quadrilateral we just found; they are bounded. Others run away to infinity. Here both constraints say at least, so every point far enough out is feasible. The region still has three corners, but it has no far edge, and that will matter when we look for a maximum.' }),
    sl('concept', 'Finding a corner algebraically', { b: 'Every corner is the meeting point of **two** boundary lines (the axes count). Solve the pair, then **check** the point in every other constraint.', v: cornerTable([['$(0, 6)$', '$x = 0$ with $x + y = 6$'], ['$(4.5, 1.5)$', '$x + y = 6$ with $x + 3y = 9$'], ['$(9, 0)$', '$y = 0$ with $x + 3y = 9$']], 'Table of the corners of the unbounded region with the pair of lines that make each: (0, 6) from x equals 0 and x plus y equals 6; (4.5, 1.5) from x plus y equals 6 and x plus 3 y equals 9; (9, 0) from y equals 0 and x plus 3 y equals 9.', 'Each corner and the two lines that make it.', 'Lines that meet'), n: 'Do not read corners off a rough sketch. Pick the two boundary lines that meet there, solve them as simultaneous equations, and then check the point in every other constraint. A crossing point that breaks some other constraint is outside the region and is not a corner.' }),
    sl('example', 'Worked example 3: an "at least" constraint', { b: r`A spice exporter in Kochi packs $x$ boxes of pepper and $y$ of cardamom per day. The sealing machine can handle at most $50$ boxes, and an order needs at least $40$ "points", where a pepper box counts $2$ and a cardamom box $1$.`, ul: [r`Machine: $x + y \le 50$`, r`Order: $2x + y \ge 40$`, r`$x, y \ge 0$`, r`Corners: $(20, 0)$, $(50, 0)$, $(0, 50)$, $(0, 40)$`], v: pSpice, n: 'Words like at most give a less than or equal sign; words like at least give a greater than or equal sign. Here the machine limit keeps us below one line, and the order keeps us above another. The feasible region is the strip between them. Test points help: ten and ten gives only thirty points, so it fails the order.' }),
    sl('check', 'Quick check: name the region', { b: 'Recall the vocabulary.', chk: 'fb1', n: 'Think about the set of all points that obey every one of the constraints together.' }),
    sl('diagram', 'When there is no feasible region', { b: r`$x + y \le 3$ and $2x + 3y \ge 12$ (with $x, y \ge 0$) have **no common point**: the region is **empty** and the problem has **no solution**.`, v: pG, n: 'Sometimes the constraints contradict each other. The first keeps us below the lower line, the second above the upper line, and these two zones never overlap in the first quadrant. Then there is no feasible plan at all, so there is nothing to optimise. In an exam, say clearly that the feasible region is empty.' }),
    sl('check', 'Quick check: is the point feasible?', { b: 'Test the point in every constraint.', chk: 'tf2', n: 'Substitute the point into both inequalities, and remember the non negativity conditions too.' }),
    sl('summary', 'Summary of Part 1', { ul: ['An LPP has decision variables, a linear **objective**, linear **constraints** and **non-negativity**', 'Each inequality is a **half-plane**; use a test point to choose the side', 'The **feasible region** is the common part of all the half-planes', '**Corners** come from pairs of boundary lines, checked in every constraint', 'Regions can be **bounded**, **unbounded** or **empty**'], v: casesTable, n: 'To sum up. Write the variables, the objective and every constraint, including non negativity. Draw each boundary line and shade with a test point. The overlap is the feasible region. Find its corners by solving pairs of lines. And notice whether the region is bounded, unbounded or empty, because that decides what can happen next.' }),
    sl('exam-tips', 'Exam tips for formulation and regions', { ul: ['Define each variable with its **unit** ("$x$ = number of sponge cakes per day")', 'Write constraints in **simplest form**; keep the same units on both sides', 'Label every line with its **equation** and mark its intercepts', 'Show the **test point** used for shading', 'List all corners, including those on the axes, with **coordinates**', 'The deleted "types of LPP" classification is **not** in the 2026–27 syllabus'], v: methodFlow, n: 'Marks are lost in small ways. Define your variables with units. Simplify each constraint and keep grams with grams. Label every line and its intercepts on the graph, mention your test point, and write every corner with its coordinates. Classifying problems into named types is not in this year\'s syllabus, so spend your time on formulation and graphs.' }),
  ],
});

// ---------------------------------------------------------------- deck 2
const d2 = deck({
  part: 2,
  title: 'Linear Programming — Part 2: The corner-point method',
  goals: ['State the Corner Point Theorem for bounded regions', 'Solve two-variable linear programming problems by the corner-point method', 'Use the half-plane test on unbounded regions', 'Recognise multiple optimal solutions and problems with no solution'],
  slides: [
    sl('title', 'Linear Programming, Part 2: The corner-point method', { b: 'The best plan always sits at a corner — if a best plan exists.', v: pIso, n: 'Welcome to part two. We have feasible regions and their corners. Now we find the best plan. Picture lines of equal profit, all parallel, sliding across the region. The last point of the region they touch is always a corner. That simple picture is the heart of the corner point method.' }),
    sl('concept', 'What you will be able to do', { ul: ['State the **Corner Point Theorem**', 'Solve LPPs with the **corner-point method**', 'Apply the **half-plane test** on unbounded regions', 'Recognise **multiple optimal solutions**', 'Recognise problems with **no** solution'], n: 'Here are the goals for part two. By the end you will solve any two variable problem in your syllabus: bounded or unbounded regions, a unique best plan, a whole edge of best plans, or no best plan at all.' }),
    sl('concept', 'Corner Point Theorem', { b: r`If the feasible region is **bounded** (and non-empty), $Z = ax + by$ has **both** a maximum and a minimum, and each occurs at a **corner point**. If the region is **unbounded**, an optimum, **if it exists**, also occurs at a corner.`, v: pIso, n: 'Here is the key result. The objective lines are parallel. As you slide one across a bounded region, the value of the objective grows steadily, and the last region point the line touches is a corner. So on a bounded region the maximum and the minimum both exist and both sit at corners. On an unbounded region an optimum may fail to exist, but if it exists it is still at a corner.' }),
    sl('diagram', 'The corner-point method', { b: 'Six steps, every time.', v: methodFlow, n: 'Formulate the problem. Draw each boundary line and shade with a test point. Identify the feasible region. Find every corner by solving pairs of lines. Evaluate the objective at each corner. If the region is bounded, read off the largest or smallest value. If it is unbounded, carry out one more check, the half plane test, before you accept the answer.' }),
    sl('example', 'Worked example 1: maximise on a bounded region', { b: r`Maximise $Z = 3x + 5y$ subject to $x + y \le 8$, $x + 2y \le 10$, $x, y \ge 0$.`, ul: ['Corners (from Part 1): $(0, 0)$, $(8, 0)$, $(6, 2)$, $(0, 5)$', '$Z$: $0$, $24$, $28$, $25$', 'Bounded region: maximum $28$ at $x = 6$, $y = 2$'], v: cornerTable([['$(0, 0)$', '$0$'], ['$(8, 0)$', '$24$'], ['$(6, 2)$', '$28$ (max)'], ['$(0, 5)$', '$25$']], 'Corner table for Z equals 3 x plus 5 y: (0, 0) gives 0, (8, 0) gives 24, (6, 2) gives 28, the maximum, and (0, 5) gives 25.', 'Largest corner value: $28$ at $(6, 2)$.'), n: 'We already know the corners of this region. Put each into three x plus five y. Zero, twenty four, twenty eight and twenty five. The region is bounded, so the largest of these, twenty eight, is the maximum, at x equals six and y equals two. Notice that the best corner is not on an axis: it is where both resources run out together.' }),
    sl('concept', 'The minimum comes for free', { b: r`On the same bounded region the **minimum** of $Z = 3x + 5y$ is the smallest corner value: $0$ at $(0, 0)$. One table answers both questions.`, v: pR1, n: 'Once you have the table of corner values on a bounded region, both answers are in front of you. The smallest value, zero, is the minimum, at the origin. In real problems the minimum of a profit is rarely interesting, but for cost problems it is exactly what we want, and the regions then usually do not contain the origin.' }),
    sl('check', 'Quick check: where do two lines meet?', { b: 'Solve the two boundary equations together.', chk: 'm11', n: 'Subtract one equation from the other to remove a variable, then substitute back.' }),
    sl('diagram', 'Unbounded regions need one more step', { b: 'On an unbounded region the best corner value is only a **candidate**. Test the open half-plane beyond it.', v: halfFlow, n: 'Why the extra step? On an unbounded region, the objective might keep improving forever as we move out. So the smallest corner value, call it m, is only a candidate. Draw the line where the objective equals m and look at the open half plane where it is smaller. If that half plane shares no point with the region, m really is the minimum. If it does, there is no minimum.' }),
    sl('example', 'Worked example 2: a minimum on an unbounded region', { b: r`Minimise $Z = 2x + 3y$ subject to $x + y \ge 6$, $x + 3y \ge 9$, $x, y \ge 0$.`, ul: ['Corners: $(0, 6)$, $(4.5, 1.5)$, $(9, 0)$', '$Z$: $18$, $13.5$, $18$; candidate $13.5$', r`Draw $2x + 3y = 13.5$: the half-plane $2x + 3y < 13.5$ has **no** point of the region`, 'Minimum $13.5$ at $x = 4.5$, $y = 1.5$'], v: pR2half, n: 'The corners of this unbounded region give eighteen, thirteen point five and eighteen. The candidate minimum is thirteen point five. Now draw the line two x plus three y equals thirteen point five. It touches the region only at the corner, and the whole region lies on the far side. So the open half plane of smaller values misses the region, and thirteen point five is the minimum.' }),
    sl('example', 'Worked example 3: no maximum', { b: r`On the same region, maximise $Z = x + y$.`, ul: ['Corner values: $6$, $6$, $9$; largest $9$', r`Half-plane $x + y > 9$: the point $(20, 20)$ is feasible and gives $40$`, 'The half-plane meets the region, so $Z$ has **no maximum**'], v: pR2, n: 'Now try to maximise x plus y on the same region. The corners give six, six and nine. But the region runs away to infinity, and a feasible point like twenty comma twenty gives forty, far more than nine. The half plane where x plus y exceeds nine meets the region, so there is no maximum value at all.' }),
    sl('check', 'Quick check: how many best points?', { b: 'Two corners tie for the best value.', chk: 'm14', n: 'Work out the objective at every corner and look for a tie between neighbouring corners.' }),
    sl('diagram', 'Multiple optimal solutions', { b: r`If $Z$ takes the same best value at **two adjacent corners**, it takes that value along the **whole edge** joining them: infinitely many optimal solutions.`, v: pEdge, n: 'Sometimes the objective lines are parallel to one edge of the region. Then, as the line slides out, it leaves the region along a whole edge rather than a single corner. Both end corners give the same best value, and so does every point in between. We say the problem has infinitely many optimal solutions.' }),
    sl('example', 'Worked example 4: an edge of optimal points', { b: r`Maximise $Z = 2x + 4y$ on $x + y \le 8$, $x + 2y \le 10$, $x, y \ge 0$.`, ul: ['$Z$ at the corners: $0$, $16$, $20$, $20$', 'Maximum $20$ at both $(6, 2)$ and $(0, 5)$', r`So every point of the segment joining them is optimal, e.g. $(3, 3.5)$ gives $6 + 14 = 20$`], v: cornerTable([['$(0, 0)$', '$0$'], ['$(8, 0)$', '$16$'], ['$(6, 2)$', '$20$ (max)'], ['$(0, 5)$', '$20$ (max)']], 'Corner table for Z equals 2 x plus 4 y: (0, 0) gives 0, (8, 0) gives 16, and both (6, 2) and (0, 5) give the maximum 20.', 'Tie at two adjacent corners: the whole edge is optimal.'), n: 'Here two x plus four y is just twice the boundary expression x plus two y. At the corners we get zero, sixteen, twenty and twenty. The maximum, twenty, appears at two neighbouring corners, so it holds all along the edge between them. The midpoint three comma three point five also gives twenty. Write this conclusion in words in your answer.' }),
    sl('example', 'Worked example 5: the bakery, solved', { b: r`Maximise $Z = 60x + 80y$ subject to $2x + y \le 40$, $2x + 3y \le 72$, $x, y \ge 0$.`, ul: ['Intersection: subtract, $2y = 32$, $y = 16$, $x = 12$', 'Corners: $(0, 0)$, $(20, 0)$, $(12, 16)$, $(0, 24)$', '$Z$: $0$, $1200$, $2000$, $1920$', 'Bake $12$ sponge and $16$ fruit cakes: profit ₹$2000$'], v: pTitle, n: 'Back to the bakery. Subtract the constraint equations to get y equals sixteen, then x equals twelve. The four corners give profits of zero, twelve hundred, two thousand and nineteen hundred and twenty rupees. The region is bounded, so the best plan is twelve sponge cakes and sixteen fruit cakes, for a profit of two thousand rupees. Always end with the answer in words.' }),
    sl('check', 'Quick check: a candidate on an unbounded region', { b: 'Decide whether a minimum can exist.', chk: 'tf3', n: 'Remember that an unbounded region can still have a smallest value, if the half plane test is passed.' }),
    sl('concept', 'Mistakes that cost marks', { b: 'Most errors are not in the arithmetic but in the method.', v: table(['Mistake', 'Fix'], [['Missing a corner on an axis', 'Check every line against both axes'], ['Keeping a crossing point outside the region', 'Test each corner in every constraint'], ['Accepting the best corner on an unbounded region', 'Do the half-plane test'], ['Stating one point when two corners tie', 'State the whole edge'], ['Wrong side shaded', 'Use a test point not on the line']], 'Table of common mistakes and fixes: missing an axis corner, check every line against both axes; keeping a crossing point outside the region, test each corner; accepting the best corner on an unbounded region, do the half-plane test; stating one point when corners tie, state the whole edge; shading the wrong side, use a test point.', 'Five habits that protect your marks.'), n: 'Here are the five commonest mistakes. Missing a corner on an axis. Keeping a crossing point that breaks another constraint. Forgetting the half plane test on an unbounded region. Naming only one point when two corners tie. And shading the wrong side of a line. Each has a simple fix, shown in the table.' }),
    sl('check', 'Quick check: read the corner values', { b: 'Evaluate the objective at each corner.', chk: 'fb3', n: 'Substitute each corner into the objective and take the largest value.' }),
    sl('summary', 'Summary of Part 2', { ul: ['Bounded region: max and min both at **corners**', 'Unbounded region: best corner value is a candidate — **half-plane test**', 'Tie at two adjacent corners: **infinitely many** optimal points', 'Empty region: **no** solution', 'Always end with the plan and the optimal value **in words**'], v: casesTable, n: 'To sum up. Find the corners and evaluate the objective at each. On a bounded region, read off the answers. On an unbounded region, confirm with the half plane test. A tie at neighbouring corners means a whole edge of best plans. An empty region means no solution. And always state the final plan in words.' }),
    sl('exam-tips', 'Exam tips for the corner-point method', { ul: ['Draw lines **accurately** on graph paper with a scale; label intercepts', 'Show the **corner table** with every corner and its $Z$ value', 'For unbounded regions, **draw** the line $Z = m$ and state the half-plane result', 'Five-mark questions usually split: formulation, graph, corners, values, conclusion', 'Write the final answer as a plan with units, e.g. "$12$ sponge and $16$ fruit cakes, ₹$2000$"'], v: halfFlow, n: 'A five mark question usually gives one mark each for formulation, the graph, the corners, the corner values and the conclusion. Draw to scale and label the lines. Put the corner values in a neat table. For an unbounded region, draw the objective line through the candidate and say what the half plane shows. Finish with a sentence that answers the question asked.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'cbse-12-mathematics-ch12', version: 1, title: 'Linear Programming — chapter notes', language: 'en',
  sections: [
    { heading: '1. What is a linear programming problem?', body_md: r`A **linear programming problem** (LPP) asks for the maximum or minimum of a **linear objective function** $Z = ax + by$ when the variables must satisfy **linear constraints** (inequalities) and the **non-negativity constraints** $x \ge 0$, $y \ge 0$.

The variables $x$ and $y$ are the **decision variables**: the quantities we choose (numbers of items, hours, kilograms).`, key_terms: [{ term: 'Decision variables', definition_md: 'The unknown quantities to be chosen.' }, { term: 'Objective function', definition_md: 'The linear function $Z = ax + by$ to be maximised or minimised.' }, { term: 'Constraints', definition_md: 'Linear inequalities that every plan must satisfy.' }, { term: 'Non-negativity constraints', definition_md: r`$x \ge 0$, $y \ge 0$.` }], formulas: [{ latex: r`\text{Optimise } Z = ax + by \text{ subject to } a_ix + b_iy \le c_i \text{ (or } \ge c_i\text{)},\ x \ge 0,\ y \ge 0`, label: 'General form (two variables)' }], visual: termsTable, topic_ids: [topic(1)] },
    { heading: '2. Formulating a problem', body_md: r`**Steps:** (1) define the decision variables with units; (2) write the objective function; (3) write one constraint for each limited resource or requirement; (4) add non-negativity.

**Translations:** "at most", "cannot exceed", "available" give $\le$; "at least", "must meet" give $\ge$. Simplify each constraint by dividing by a common factor, and keep units the same on both sides.

Example (Kanpur bakery): $x$ sponge, $y$ fruit cakes; maximise $Z = 60x + 80y$ subject to $2x + y \le 40$ (flour), $2x + 3y \le 72$ (oven), $x, y \ge 0$.`, key_terms: [{ term: 'Formulation', definition_md: 'Writing a situation as an objective and constraints.' }], formulas: [{ latex: r`300x + 150y \le 6000 \iff 2x + y \le 40`, label: 'Simplifying a constraint' }], visual: bakeTable, topic_ids: [topic(1)] },
    { heading: '3. Graphing linear inequalities', body_md: r`The line $ax + by = c$ divides the plane into two **half-planes**. To decide which side satisfies $ax + by \le c$, substitute a **test point** not on the line (the origin if possible): if the inequality is true there, that side is the solution set.

Draw the line using its intercepts. Points on the line belong to the region for $\le$ and $\ge$.`, key_terms: [{ term: 'Half-plane', definition_md: 'One of the two parts into which a line divides the plane.' }, { term: 'Test point', definition_md: 'A point not on the line, substituted to choose the side.' }], formulas: [{ latex: r`\text{intercepts of } ax + by = c:\ \left(\dfrac ca, 0\right),\ \left(0, \dfrac cb\right)`, label: 'Drawing the line' }], visual: pHalf, topic_ids: [topic(2)] },
    { heading: '4. Feasible region and corner points', body_md: r`The **feasible region** is the common part of all the half-planes (including $x, y \ge 0$). Its points are **feasible solutions**; points outside are **infeasible**. An **optimal solution** is a feasible point giving the best value of $Z$.

A **corner point** is a vertex of the region: the meeting point of two boundary lines (or a line and an axis) that satisfies every constraint. Example: $x + y \le 8$, $x + 2y \le 10$ has corners $(0, 0)$, $(8, 0)$, $(6, 2)$, $(0, 5)$.

A region is **bounded** if it can be enclosed in a circle, otherwise **unbounded**. It may also be **empty**.`, key_terms: [{ term: 'Feasible region', definition_md: 'Set of points satisfying all constraints.' }, { term: 'Corner point', definition_md: 'Vertex of the feasible region.' }, { term: 'Bounded region', definition_md: 'A region that can be enclosed in a circle.' }], formulas: [], visual: pR1, topic_ids: [topic(2)] },
    { heading: '5. The corner-point method (bounded regions)', body_md: r`**Corner Point Theorem.** If the feasible region is bounded and non-empty, $Z = ax + by$ has a maximum and a minimum, both at corner points.

**Method:** draw the region, find all corners, evaluate $Z$ at each, and pick the largest (maximum) or smallest (minimum).

Example: maximise $Z = 3x + 5y$ on the region of section 4: values $0$, $24$, $28$, $25$, so the maximum is $28$ at $(6, 2)$. Bakery: maximum ₹$2000$ at $(12, 16)$.`, key_terms: [{ term: 'Corner Point Theorem', definition_md: 'On a bounded region, the optimum of a linear objective is at a corner.' }], formulas: [{ latex: r`Z_{\max} = \max_{\text{corners}} (ax + by)`, label: 'Bounded region' }], visual: methodFlow, topic_ids: [topic(2)] },
    { heading: '6. Unbounded regions: the half-plane test', body_md: r`On an **unbounded** region an optimum may not exist. If an optimum exists, it is at a corner.

**Test for a minimum:** let $m$ be the smallest corner value. If the open half-plane $ax + by < m$ has **no** point in common with the region, $m$ is the minimum; otherwise there is no minimum.

**Test for a maximum:** with $M$ the largest corner value, check $ax + by > M$ in the same way.

Example: on $x + y \ge 6$, $x + 3y \ge 9$, $x, y \ge 0$, $Z = 2x + 3y$ has minimum $13.5$ at $(4.5, 1.5)$, but $Z = x + y$ has no maximum.`, key_terms: [{ term: 'Unbounded region', definition_md: 'A region that cannot be enclosed in a circle.' }, { term: 'Half-plane test', definition_md: r`Check whether $ax + by < m$ (or $> M$) meets the region.` }], formulas: [{ latex: r`\{ax + by < m\} \cap R = \varnothing \Rightarrow Z_{\min} = m`, label: 'Minimum on an unbounded region' }], visual: pR2half, topic_ids: [topic(2)] },
    { heading: '7. Special cases', body_md: r`- **Multiple optimal solutions:** if $Z$ has the same best value at two adjacent corners, every point of the edge joining them is optimal (the objective lines are parallel to that edge). Example: $Z = 2x + 4y$ on the region of section 4 is $20$ at $(6, 2)$ and $(0, 5)$.
- **Empty region (infeasible problem):** constraints such as $x + y \le 3$ and $2x + 3y \ge 12$ (with $x, y \ge 0$) have no common point; there is no solution.
- **No optimum:** on an unbounded region the objective may grow (or fall) without limit.

*Not in the 2026–27 syllabus:* classifying LPPs into named types (manufacturing, diet, transportation problems).`, key_terms: [{ term: 'Multiple optima', definition_md: 'Infinitely many optimal points along an edge.' }, { term: 'Infeasible problem', definition_md: 'A problem whose feasible region is empty.' }], formulas: [], visual: pEdge, visuals: [casesTable], topic_ids: [topic(2)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Formulation (2–3 marks):* variables defined with units, objective, each constraint, non-negativity.
- *Graphical solution (3–5 marks):* lines with intercepts, correct region, all corners with coordinates, corner table, conclusion in words.
- *Unbounded region:* one mark is usually for the half-plane check (draw $Z = m$ and state the result).
- *Objective (1 mark):* corner values, best corner, feasibility of a point, number of corners.

**Common mistakes**
1. Forgetting the non-negativity constraints, or a corner on an axis.
2. Shading the wrong side of a line (no test point).
3. Mixing units in a constraint (grams with kilograms, minutes with hours).
4. Listing a crossing point that breaks another constraint as a corner.
5. Accepting the best corner on an unbounded region without the half-plane test.
6. Naming one optimal point when two adjacent corners tie.
7. Writing the optimal value but not the plan (or the plan without the value).
8. Reading corners from a rough sketch instead of solving the equations.`,
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-12-mathematics-ch12', version: 1, language: 'en',
  cards: [
    fc('f01', 'Linear programming problem?', 'Optimise a linear objective subject to linear constraints and non-negativity.', 'definition', 1),
    fc('f02', 'Decision variables?', 'The quantities we choose, e.g. numbers of each product.', 'definition', 1),
    fc('f03', 'Objective function?', 'The linear function $Z = ax + by$ to be maximised or minimised.', 'definition', 1),
    fc('f04', 'Non-negativity constraints?', r`$x \ge 0$, $y \ge 0$.`, 'definition', 1),
    fc('f05', '"At most" / "at least" in symbols?', r`At most: $\le$. At least: $\ge$.`, 'fact', 1),
    fc('f06', 'Flour: $300$ g per sponge, $150$ g per fruit cake, $6$ kg available. Constraint?', r`$2x + y \le 40$`, 'example', 1),
    fc('f07', 'First line of every formulation?', '"Let $x$ = … and $y$ = …", with units.', 'exam-tip', 1),
    fc('f08', 'How do you decide which side of $ax + by = c$ to shade?', 'Substitute a test point not on the line (often the origin).', 'concept', 2),
    fc('f09', 'Feasible region?', 'The common region of all constraints, including non-negativity.', 'definition', 2),
    fc('f10', 'Feasible vs optimal solution?', 'Feasible: obeys every constraint. Optimal: feasible and gives the best $Z$.', 'concept', 2),
    fc('f11', 'Corner point?', 'A vertex of the feasible region: two boundary lines meet there.', 'definition', 2),
    fc('f12', 'How do you find a corner exactly?', 'Solve the two boundary equations, then check the point in every constraint.', 'concept', 2),
    fc('f13', r`Corners of $x + y \le 8$, $x + 2y \le 10$, $x, y \ge 0$?`, '$(0, 0)$, $(8, 0)$, $(6, 2)$, $(0, 5)$.', 'example', 2),
    fc('f14', 'Bounded region?', 'One that can be enclosed in a circle.', 'definition', 2),
    fc('f15', 'Corner Point Theorem (bounded region)?', 'Max and min of $Z$ both exist and occur at corner points.', 'fact', 2),
    fc('f16', 'Corner-point method in one line?', 'Find all corners, evaluate $Z$ at each, pick the best.', 'concept', 2),
    fc('f17', 'Unbounded region: is the best corner value always the answer?', 'No — it is only a candidate; apply the half-plane test.', 'concept', 2),
    fc('f18', 'Half-plane test for a minimum $m$?', r`If $ax + by < m$ shares no point with the region, $m$ is the minimum.`, 'formula', 2),
    fc('f19', 'Half-plane test for a maximum $M$?', r`If $ax + by > M$ shares no point with the region, $M$ is the maximum.`, 'formula', 2),
    fc('f20', 'Same best value at two adjacent corners?', 'Every point of the edge joining them is optimal: infinitely many solutions.', 'fact', 2),
    fc('f21', 'Feasible region empty?', 'No feasible point, so the problem has no solution.', 'fact', 2),
    fc('f22', r`Minimum of $Z = 2x + 3y$ on $x + y \ge 6$, $x + 3y \ge 9$, $x, y \ge 0$?`, '$13.5$ at $(4.5, 1.5)$.', 'example', 2),
    fc('f23', 'Bakery: max of $60x + 80y$ on $2x + y \\le 40$, $2x + 3y \\le 72$?', '₹$2000$ at $(12, 16)$.', 'example', 2),
    fc('f24', 'Picture: an objective line lying along an edge of the region. Meaning?', 'Multiple optimal solutions along that edge.', 'diagram', 2),
    fc('f25', 'Picture: region opening out to infinity. What extra step?', 'The half-plane test before accepting an optimum.', 'diagram', 2),
    fc('f26', 'Five-mark LPP: what earns the marks?', 'Formulation, graph, corners, corner values, conclusion in words.', 'exam-tip', 2),
    fc('f27', 'Unbounded region in an exam: what to draw?', r`The line $Z = m$ through the candidate corner, and state the half-plane result.`, 'exam-tip', 2),
    fc('f28', 'Which part of linear programming is deleted for 2026–27?', 'Classifying LPPs into types (manufacturing, diet, transportation).', 'exam-tip', 1),
  ],
  status: 'draft', provenance: d1.provenance,
};
ok(sameSet(S('BAKE', 60, 80, 'max').at, [[12, 16]]) && S('R2', 2, 3, 'min').value === 13.5 && sameSet(corners(REG.R1), [[0, 0], [8, 0], [6, 2], [0, 5]]), 'flashcard examples');
if (fail.length) { console.error('FLASHCARD CHECKS FAILED:', fail); process.exit(1); }

const release = {
  unit: 'cbse-12-mathematics-ch12', version: 1, academic_year: '2026-27', created_at: '2026-10-29T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t02 only (terminology and formulation; graphical method with bounded, unbounded, empty regions and multiple optima, at most three non-trivial constraints); the deleted classification of LPP types is not taught or asked', worked_examples: 'every deck and notes worked example and flashcard example re-derived in src/build.mjs (corners by line intersection + feasibility, optima by corner values and a brute-force grid, unbounded cases by the half-plane test) before building' } },
};
const tests = chapterTests('Linear Programming', {
  A: ['m05', 'm15', 'm10', 'ar1'],
  B: ['s202', 's206', 's301'],
  C: ['l01', 'l04'],
  D: ['c03'],
}, {
  A: ['m01', 'm02', 'm04', 'm07', 'm08', 'm09', 'm12', 'm16', 'ar3', 'ar5'],
  B: ['s203', 's204', ['s205', 's208'], 's302', ['s305', 's307']],
  C: ['l02', ['l03', 'l06']],
  D: ['c01', 'c02'],
});
build({ dir: DIR, release, testsSpec: tests });

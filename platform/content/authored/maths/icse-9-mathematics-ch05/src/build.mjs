// Build ICSE 9 Mathematics ch05 Simultaneous Linear Equations. Run from platform/:
//   npx tsx content/authored/maths/icse-9-mathematics-ch05/src/build.mjs
// Every pair of equations on a slide, in a table or in the notes is an exact system (lin.mjs): the solution is found with
// exact fractions, cross-checked against solve2 and substituted into both equations. The working lines of every worked
// example (multipliers, sums, back-substitution, denominators of the scheme) are generated from the computed values, typed
// lines are parsed and asserted at the solution, and the build throws if any table or example disagrees with the arithmetic.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from './lib.mjs';
import { F, Sys, sysFrom, elimSteps, substSteps, crossSteps, recipSys, W, cleared, sameEq, eqTex, words } from './lin.mjs';

setUnit('icse-9-mathematics-ch05', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (c, msg) => { if (!c) throw new Error(`self-check failed: ${msg}`); };
const d = (s) => `$${s}$`;
const strip = (s) => s.replace(/\$/g, '');

/** A "Step | Working" table from generated rows; a step with no working is joined to the next step's label. */
function stepTable(rows, desc, caption) {
  const merged = [];
  let carry = '';
  for (const [label, tex] of rows) {
    if (!tex) { carry = `${carry}${label}. `; continue; }
    merged.push([`${carry}${label}`, d(tex)]);
    carry = '';
  }
  const alt = `Table of ${merged.length} steps with the columns Step and Working for ${desc}: ${merged.map(([l]) => strip(l)).join('; ')}.`;
  return table(['Step', 'Working'], merged, alt, caption);
}
const pairTxt = (S) => `${S.vx} = ${S.x.tex()}, ${S.vy} = ${S.y.tex()}`;

// ---------------------------------------------------------------- Part 1 visuals, computed
// the idea of a solution of one equation
const eq3 = [2, 3, 12];
const sol3 = [-3, 0, 3, 6].map((x) => { const y = F(eq3[2] - eq3[0] * x, eq3[1]); must(y.isInt, `y integer at x = ${x}`); return [x, y.n]; });
must(sol3.every(([x, y]) => 2 * x + 3 * y === 12) && sol3.map((p) => p[1]).join() === '6,4,2,0', 'solutions of 2x + 3y = 12');
const oneEqTable = table(['$x$', '$y$', 'Check $2x + 3y$'], sol3.map(([x, y]) => [d(String(x)), d(String(y)), d(`2(${x}) + 3(${y}) = ${2 * x + 3 * y}`)]), 'Table of four solutions of two x plus three y equals twelve: x minus three gives y six; x zero gives y four; x three gives y two; x six gives y zero. Each makes the left side twelve.', 'One equation in two variables has many solutions $(x, y)$.');

// a pair and the candidates
const P4 = sysFrom(3, 1, 1, 2, 3, 2);
must(P4.x.eq(F(3)) && P4.y.eq(F(2)) && P4.c1 === 11 && P4.c2 === 7, 'pair 3x + y = 11, x + 2y = 7');
const cand = [[2, 5], [3, 2], [1, 8], [5, -4]];
const val = (a, b, x, y) => a * x + b * y;
const candRows = cand.map(([x, y]) => {
  const cell = (a, b, c) => `${val(a, b, x, y) === c ? 'yes' : 'no'}: ${d(`${a}(${x}) + ${b}(${y}) = ${val(a, b, x, y)}`)}`;
  const ok = P4.both(x, y);
  return [d(`(${x}, ${y})`), cell(P4.a1, P4.b1, P4.c1), cell(P4.a2, P4.b2, P4.c2), ok ? 'yes' : 'no'];
});
must(candRows.map((c) => c[3]).join() === 'no,yes,no,no' && candRows[0][1].startsWith('yes') && candRows[0][2].startsWith('no') && candRows[3][1].startsWith('yes') && candRows[3][2].startsWith('no'), 'candidate table');
const candTable = table(['Pair $(x, y)$', `$${P4.tex(1)}$`, `$${P4.tex(2)}$`, 'Solution of both?'], candRows, 'Table testing four pairs against three x plus y equals eleven and x plus two y equals seven. Two five and one eight and five minus four satisfy only the first equation. Three two satisfies both, so it is the solution.', 'Only a pair that satisfies **both** equations is a solution of the pair.');

const flowMethod = flow('TB', [['a', 'Write both equations as $ax + by = c$'], ['b', 'Make the coefficients of one variable equal in size'], ['c', 'Add or subtract: that variable disappears'], ['d', 'Solve the equation in one variable'], ['e', 'Put the value into an original equation'], ['f', 'Check in both equations']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the elimination method: write both equations as a x plus b y equals c; make the coefficients of one variable equal in size; add or subtract so that variable disappears; solve the equation in one variable; put the value into an original equation; check in both equations.', 'Elimination in six steps.');
const flowTitle1 = flow('LR', [['a', 'A pair of linear equations'], ['b', 'Choose a method'], ['c', 'Solve for $x$ and $y$'], ['d', 'Check in both equations']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart: a pair of linear equations; choose a method (elimination, substitution or cross-multiplication); solve for x and y; check in both equations.', 'The route through this chapter.');

// worked examples, Part 1
const Sd1 = sysFrom(4, 3, 5, -3, 6, 2), E1 = elimSteps(Sd1, 'y', 1);
must(E1.op === 'add' && E1.k === 9 && E1.rhs === 54 && Sd1.x.eq(F(6)) && Sd1.y.eq(F(2)), 'ex1');
const t1 = stepTable(E1.rows, `solving ${d(Sd1.tex(1))} and ${d(Sd1.tex(2))} by adding`, 'The $y$-terms are $+3y$ and $-3y$, so adding removes $y$.');
const Sd2 = sysFrom(7, 4, 7, -3, 2, 5), E2 = elimSteps(Sd2, 'x', 1);
must(E2.op === 'subtract' && E2.k === 7 && E2.rhs === 35 && Sd2.x.eq(F(2)) && Sd2.y.eq(F(5)), 'ex2');
const t2 = stepTable(E2.rows, `solving ${d(Sd2.tex(1))} and ${d(Sd2.tex(2))} by subtracting`, 'Equal $x$-coefficients with the same sign: subtract.');
const Sd3 = sysFrom(5, 3, 2, 6, 4, 3), E3 = elimSteps(Sd3, 'y', 1);
must(E3.m1 === 2 && E3.m2 === 1 && E3.op === 'subtract' && E3.k === 8 && E3.rhs === 32 && Sd3.x.eq(F(4)) && Sd3.y.eq(F(3)), 'ex3');
const t3 = stepTable(E3.rows, `solving ${d(Sd3.tex(1))} and ${d(Sd3.tex(2))} by multiplying one equation`, 'Only equation (1) needs a multiplier.');
const Sd4 = sysFrom(5, 4, 3, -5, 6, 2), E4 = elimSteps(Sd4, 'y', 1), E4x = elimSteps(Sd4, 'x', 1);
must(E4.m1 === 5 && E4.m2 === 4 && E4.op === 'add' && E4.k === 37 && E4.rhs === 222 && Sd4.x.eq(F(6)) && Sd4.y.eq(F(2)), 'ex4');
must(E4x.m1 === 3 && E4x.m2 === 5 && E4x.op === 'subtract' && E4x.k === 37 && E4x.rhs === 74, 'ex4 eliminating x');
const t4 = stepTable(E4.rows, `solving ${d(Sd4.tex(1))} and ${d(Sd4.tex(2))} by multiplying both equations`, 'Both equations are scaled to the LCM of the $y$-coefficients, $20$.');
const chooseTable = table(['Eliminate', 'LCM of coefficients', 'Multipliers for (1), (2)', 'Then', 'Result'], [
  [d('x'), d('15'), d(`${E4x.m1},\\ ${E4x.m2}`), E4x.op, d(`${E4x.k}y = ${E4x.rhs}`)],
  [d('y'), d('20'), d(`${E4.m1},\\ ${E4.m2}`), E4.op, d(`${E4.k}x = ${E4.rhs}`)],
], 'Table comparing two ways to solve five x plus four y equals thirty eight and three x minus five y equals eight. Eliminating x: LCM fifteen, multipliers three and five, subtract, thirty seven y equals seventy four. Eliminating y: LCM twenty, multipliers five and four, add, thirty seven x equals two hundred twenty two. Both routes work.', 'Either variable can be eliminated; choose the one with smaller multipliers or an easy add.');
must(15 === 5 * 3 && 20 === 4 * 5 && E4x.k === E4.k, 'LCMs 15 and 20, same resulting coefficient 37');

const q5 = [r`\dfrac{x}{5} - \dfrac{y}{2} = -1`, r`3(x - 4) = 2y + 6`];
const Sd5 = new Sys(2, -5, -10, 3, -2, 18);
must(cleared(q5[0]).join() === '2,-5,-10' && cleared(q5[1]).join() === '3,-2,18' && W(Sd5.env, q5) && Sd5.x.eq(F(10)) && Sd5.y.eq(F(6)), 'ex5 cleared forms and solution');
const E5 = elimSteps(Sd5, 'x', 1);
must(E5.m1 === 3 && E5.m2 === 2 && E5.op === 'subtract' && E5.k === -11 && E5.rhs === -66, 'ex5 elimination');
const t5 = stepTable([['Clear fractions in (1): multiply by $10$', eqTex(...cleared(q5[0]))], ['Expand (2): $3x - 12 = 2y + 6$, then collect', eqTex(...cleared(q5[1]))], ...E5.rows], `tidying and solving ${d(q5[0])} and ${d(q5[1])}`, 'First write both equations as $ax + by = c$ with whole-number coefficients.');
must(W(Sd5.env, [r`3x - 12 = 2y + 6`]), 'ex5 expansion');

const Sd6 = sysFrom(3, 1, 2, -3, 5, 2), U6 = substSteps(Sd6, 1, 'y');
must(U6.K.eq(F(11)) && U6.C.eq(F(55)) && Sd6.x.eq(F(5)) && Sd6.y.eq(F(2)), 'ex6');
const t6 = stepTable(U6.rows, `solving ${d(Sd6.tex(1))} and ${d(Sd6.tex(2))} by substitution`, '$y$ has coefficient $1$ in equation (1): isolate it.');
const Sd7 = sysFrom(3, 2, 5, -4, 1, 2), U7 = substSteps(Sd7, 1, 'x');
must(U7.K.eq(F(-22, 3)) && U7.C.eq(F(-44, 3)) && Sd7.x.eq(F(1)) && Sd7.y.eq(F(2)), 'ex7');
const t7 = stepTable(U7.rows, `solving ${d(Sd7.tex(1))} and ${d(Sd7.tex(2))} by substitution when no coefficient is 1`, 'Isolating $x$ produces fractions: elimination would have been cleaner here.');
const flowSub = flow('TB', [['a', 'Pick the equation and variable with the simplest coefficient'], ['b', 'Make that variable the subject'], ['c', 'Replace it in the other equation (use brackets)'], ['d', 'Solve the equation in one variable'], ['e', 'Substitute back to find the other variable']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the substitution method: pick the simplest variable to isolate; make it the subject; replace it in the other equation using brackets; solve the one-variable equation; substitute back to find the other variable.', 'Substitution in five steps.');
const sum1 = table(['Method', 'Best when', 'Key move'], [['Elimination', 'coefficients match or are easy to match', 'scale, then add or subtract'], ['Substitution', 'one coefficient is $1$ or $-1$', 'make it the subject, replace in brackets'], ['Both', 'always', 'check in **both** equations']], 'Summary table: elimination is best when coefficients match or are easy to match, by scaling then adding or subtracting; substitution is best when a coefficient is one or minus one, by making it the subject and replacing in brackets; with both, check in both equations.', 'Part 1 on one card.');

// ---------------------------------------------------------------- Part 2 visuals, computed
const schemeTable = table(['Quantity', 'Denominator'], [[d('x'), d(r`b_1c_2 - b_2c_1`)], [d('y'), d(r`c_1a_2 - c_2a_1`)], [d('1'), d(r`a_1b_2 - a_2b_1`)]], 'Table of the three denominators of the cross-multiplication scheme for a1 x plus b1 y plus c1 equals zero and a2 x plus b2 y plus c2 equals zero: under x, b1 c2 minus b2 c1; under y, c1 a2 minus c2 a1; under one, a1 b2 minus a2 b1.', r`$\dfrac{x}{b_1c_2 - b_2c_1} = \dfrac{y}{c_1a_2 - c_2a_1} = \dfrac{1}{a_1b_2 - a_2b_1}$ for $a_ix + b_iy + c_i = 0$.`);
const arrowTable = table(['For', 'Take the columns', 'Down-product minus up-product'], [[d('x'), d(r`b, c`), d(r`b_1c_2 - b_2c_1`)], [d('y'), d(r`c, a`), d(r`c_1a_2 - c_2a_1`)], [d('1'), d(r`a, b`), d(r`a_1b_2 - a_2b_1`)]], 'Table of the arrow rule. Write the coefficients in rows b c a b for equation one and b c a b for equation two. For x use the columns b and c, for y use the columns c and a, for one use the columns a and b. Each denominator is the product going down from equation one to equation two, minus the product going up.', 'Each denominator: (coefficient of (1) $\\times$ coefficient of (2) one column to the right) minus the reverse.');
// worked examples, Part 2
const Sx1 = sysFrom(2, 5, 3, -4, 4, -1), X1 = crossSteps(Sx1);
must(Sx1.c1 === 3 && Sx1.c2 === 16 && X1.c1 === -3 && X1.c2 === -16 && X1.Dx === -92 && X1.Dy === 23 && X1.D === -23 && Sx1.x.eq(F(4)) && Sx1.y.eq(F(-1)), 'cross example 1');
const tx1 = stepTable(X1.rows, `solving ${d(Sx1.tex(1))} and ${d(Sx1.tex(2))} by cross-multiplication`, 'Move the right-hand side across first: $c = -(\\text{number after the equals sign})$.');
const Sx2 = sysFrom(4, -3, 5, 6, -2, -3), X2 = crossSteps(Sx2);
must(Sx2.c1 === 1 && Sx2.c2 === -28 && X2.c1 === -1 && X2.c2 === 28 && Sx2.x.eq(F(-2)) && Sx2.y.eq(F(-3)), 'cross example 2');
const tx2 = stepTable(X2.rows, `solving ${d(Sx2.tex(1))} and ${d(Sx2.tex(2))} by cross-multiplication with a sign change`, 'A positive right-hand side becomes a negative $c$, and a negative one becomes positive.');
const Dz = [[2, 3, 4, 6], [2, 3, 4, -6]].map(([a1, b1, a2, b2]) => a1 * b2 - a2 * b1);
must(Dz.join() === '0,-24', 'denominators 0 and -24');
const warnTable = table(['Pair', '$a_1b_2 - a_2b_1$', 'What happens'], [[`${d('2x + 3y = 7')}, ${d('4x + 6y = 9')}`, d(`2(6) - 4(3) = ${Dz[0]}`), 'third denominator is $0$: no unique solution, the scheme cannot be used'], [`${d('2x + 3y = 7')}, ${d('4x - 6y = 9')}`, d(`2(-6) - 4(3) = ${Dz[1]}`), 'non-zero: one solution, the scheme works']], 'Table of two pairs. For two x plus three y equals seven and four x plus six y equals nine, a1 b2 minus a2 b1 is two times six minus four times three, which is zero, so the scheme cannot be used. For two x plus three y equals seven and four x minus six y equals nine, it is minus twenty four, so the scheme works.', 'The scheme needs $a_1b_2 - a_2b_1 \\ne 0$.');
must(2 * 6 - 4 * 3 === 0 && 2 * -6 - 4 * 3 === -24, 'warn values');

const q3 = [r`4(x - 1) = 3y - 7`, r`\dfrac{x}{3} + \dfrac{y}{5} = 2`];
const Sx3 = new Sys(4, -3, -3, 5, 3, 30), X3 = crossSteps(Sx3);
must(cleared(q3[0]).join() === '4,-3,-3' && cleared(q3[1]).join() === '5,3,30' && W(Sx3.env, q3) && Sx3.x.eq(F(3)) && Sx3.y.eq(F(5)), 'ex3 cleared forms');
must(X3.c1 === 3 && X3.c2 === -30 && X3.Dx === 81 && X3.Dy === 135 && X3.D === 27, 'ex3 denominators');
const tx3 = stepTable([['Expand (1): $4x - 4 = 3y - 7$, then collect', eqTex(...cleared(q3[0]))], ['Clear fractions in (2): multiply by $15$', eqTex(...cleared(q3[1]))], ...X3.rows], `tidying and solving ${d(q3[0])} and ${d(q3[1])} by cross-multiplication`, 'Tidy first, then apply the scheme to whole-number equations.');
must(W(Sx3.env, [r`4x - 4 = 3y - 7`]), 'ex3 expansion');

const flowRecip = flow('TB', [['a', '$x$ and $y$ are in denominators: $\\dfrac{a}{x} + \\dfrac{b}{y} = c$'], ['b', 'Put $u = \\dfrac{1}{x}$ and $v = \\dfrac{1}{y}$'], ['c', 'A linear pair: $au + bv = c$'], ['d', 'Solve for $u$ and $v$'], ['e', 'Take reciprocals: $x = \\dfrac{1}{u}$, $y = \\dfrac{1}{v}$']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart: when x and y appear in denominators, put u equal to one over x and v equal to one over y, get a linear pair in u and v, solve for u and v, then take reciprocals to find x and y.', 'Reduce to a linear pair, solve, then take reciprocals.');
const Rx = recipSys(6, 8, 5, 4, -12, -1), ER = elimSteps(Rx.S, 'v', 1);
must(Rx.S.x.eq(F(1, 2)) && Rx.S.y.eq(F(1, 4)) && Rx.x.eq(F(2)) && Rx.y.eq(F(4)) && ER.m1 === 3 && ER.m2 === 2 && ER.op === 'add' && ER.k === 26 && ER.rhs === 13, 'recip example');
must(W(Rx.env, [r`\dfrac{6}{x} + \dfrac{8}{y} = 3 + 2 = 5`, r`\dfrac{4}{x} - \dfrac{12}{y} = 2 - 3 = -1`, r`x = \dfrac{1}{u} = 2`, r`y = \dfrac{1}{v} = 4`]), 'recip check lines');
const tr = stepTable([['Put $u = \\dfrac{1}{x}$, $v = \\dfrac{1}{y}$ in (1)', Rx.S.tex(1)], ['and in (2)', Rx.S.tex(2)], ...ER.rows.slice(0), ['Reciprocals', r`x = \dfrac{1}{u} = 2, \quad y = \dfrac{1}{v} = 4`], ['Check in (1)', r`\dfrac{6}{2} + \dfrac{8}{4} = 3 + 2 = 5`]], `solving ${d(Rx.tex1)} and ${d(Rx.tex2)}`, 'The unknowns are $u$ and $v$ until the last step.');

const flowFrame = flow('TB', [['a', 'Read the story; name **two** unknowns'], ['b', 'Write one equation for each fact'], ['c', 'Solve the pair'], ['d', 'Check each answer **in the story**'], ['e', 'State the answer with units']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for word problems: read the story and name two unknowns; write one equation for each fact; solve the pair; check each answer in the story; state the answer with units.', 'Five steps for any word problem.');
const num47 = { x: 4, y: 7 };
const revNum = 10 * num47.y + num47.x;
must(10 * num47.x + num47.y === 47 && revNum === 74, 'two-digit 47 and 74');
const phraseTable = table(['In words', 'As an equation'], [
  ['The sum of two numbers is $40$', d('x + y = 40')],
  ['One number is $5$ more than twice the other', d('x = 2y + 5')],
  [`A two-digit number with tens digit $x$ and units digit $y$ (for example $x = 4$, $y = 7$ gives $${10 * num47.x + num47.y}$)`, d('10x + y')],
  [`The digits reversed (for example $${revNum}$)`, d('10y + x')],
  ['Ages $n$ years ago, or $n$ years from now', d('x - n, \\quad x + n')],
  ['Boat in a stream: speed $u$, stream $v$: downstream, upstream', d('u + v, \\quad u - v')],
  ['A fraction whose numerator and denominator are $x$ and $y$', d('\\dfrac{x}{y}')],
], 'Table translating words into algebra: the sum of two numbers is forty gives x plus y equals forty; five more than twice the other gives x equals two y plus five; a two-digit number is ten x plus y, for example forty seven; reversed it is ten y plus x, for example seventy four; ages n years ago or hence are x minus n and x plus n; downstream and upstream speeds are u plus v and u minus v; a fraction is x over y.', 'Translate each fact into one equation.');

const Wd1 = new Sys(1, 1, 12, 10, -14, 0), Ew1 = elimSteps(Wd1, 'y', 1);
must(Wd1.x.eq(F(7)) && Wd1.y.eq(F(5)) && 10 * 7 + 5 === 15 * 5 && 7 + 5 === 12 && 10 * 5 + 7 === 57, 'digits 7 and 5');
const tw1 = stepTable([['Name the digits', r`x = \text{tens digit}, \ y = \text{units digit}`], ['Digit sum', Wd1.tex(1)], ['Number $= 15 \\times$ units digit: $10x + y = 15y$', Wd1.tex(2)], ...Ew1.rows, ['The number', r`10(7) + 5 = 75`]], 'the two-digit number problem', 'Place value: the number is $10x + y$.');
must(W(Wd1.env, [r`10x + y = 15y`, r`10x - 14y = 0`, r`10(7) + 5 = 75`]), 'digit lines');

const Wd2 = new Sys(1, -7, -24, 1, 1, 40), Ew2 = elimSteps(Wd2, 'x', 1);
must(Wd2.x.eq(F(32)) && Wd2.y.eq(F(8)) && 32 - 4 === 7 * (8 - 4) && 32 + 8 === 40, 'ages 32 and 8');
const tw2 = stepTable([['Four years ago: $x - 4 = 7(y - 4)$', Wd2.tex(1)], ['Sum of present ages', Wd2.tex(2)], ...Ew2.rows, ['Check in the story', r`32 - 4 = 28 = 7 \times 4`]], 'the ages problem', 'Ages "$n$ years ago" are $x - n$ and $y - n$.');
must(W(Wd2.env, [r`x - 4 = 7(y - 4)`, r`x - 7y = -24`, r`x + y = 40`]), 'age lines');

const Wd3 = new Sys(1, 1, 10, 1, -1, 6), Ew3 = elimSteps(Wd3, 'y', 1);
must(F(30).div(F(3)).eq(F(10)) && F(24).div(F(4)).eq(F(6)) && Wd3.x.eq(F(8)) && Wd3.y.eq(F(2)), 'boat 8 and 2');
const tw3 = stepTable([['Downstream speed', r`\dfrac{30}{3} = 10 \text{ km/h}`], ['Upstream speed', r`\dfrac{24}{4} = 6 \text{ km/h}`], ['Equations ($u$ boat, $v$ stream)', 'u + v = 10, \\quad u - v = 6'], ...Ew3.rows.slice(0), ['Check', r`8 + 2 = 10, \quad 8 - 2 = 6`]], 'the boat problem', 'Downstream: $u + v$. Upstream: $u - v$.');
must(W({ u: 8, v: 2 }, [r`u + v = 10`, r`u - v = 6`, r`8 + 2 = 10`, r`8 - 2 = 6`]), 'boat lines');

const Wd4 = new Sys(1, -2, 6, 1, 1, 60), Ew4 = elimSteps(Wd4, 'x', 1);
must(Wd4.x.eq(F(42)) && Wd4.y.eq(F(18)) && 2 * (42 + 18) === 120 && 42 === 2 * 18 + 6, 'park 42 and 18');
const tw4 = stepTable([['Let the length be $x$ m and the breadth $y$ m', ''], ['Length is $6$ more than twice the breadth', 'x - 2y = 6'], ['Perimeter $120$, so $x + y = 60$', 'x + y = 60'], ...Ew4.rows, ['Check', r`2(42 + 18) = 120, \quad 2(18) + 6 = 42`]], 'the park problem', 'Perimeter gives $l + b$, half of $120$.');
must(W(Wd4.env, [r`x - 2y = 6`, r`x + y = 60`, r`2(42 + 18) = 120`, r`2(18) + 6 = 42`]), 'park lines');

const sum2 = table(['Idea', 'Key fact'], [['Scheme', r`$\dfrac{x}{b_1c_2 - b_2c_1} = \dfrac{y}{c_1a_2 - c_2a_1} = \dfrac{1}{a_1b_2 - a_2b_1}$`], ['Sign convention', '$c$ is the **negative** of the right-hand side'], ['Reciprocal forms', r`put $u = \dfrac{1}{x}$, $v = \dfrac{1}{y}$; invert at the end`], ['Word problems', 'two unknowns, two equations, check in the story']], 'Summary table for part two: the scheme is x over b1 c2 minus b2 c1 equals y over c1 a2 minus c2 a1 equals one over a1 b2 minus a2 b1; c is the negative of the right-hand side; for reciprocal forms put u and v and invert at the end; word problems need two unknowns, two equations and a check in the story.', 'Part 2 on one card.');

// ---- narration helpers (numbers in words)
const w = words;
const ex = (heading, b, ul, v, n) => sl('example', heading, { b, ul, v, n });

// ---------------------------------------------------------------- Deck 1
const d1 = deck({
  part: 1,
  title: 'Simultaneous Linear Equations — Part 1: Elimination and substitution',
  goals: ['Say what a solution of a pair of linear equations in two variables is, and test a pair of numbers in both equations', 'Solve a pair by elimination: add, subtract, or scale one or both equations first', 'Rearrange equations with brackets or fractions into the form ax + by = c', 'Solve a pair by substitution, and choose the better method'],
  slides: [
    sl('title', 'Simultaneous Linear Equations, Part 1', { b: 'Two unknowns need two facts. Each fact is an equation; the solution makes **both** true.', v: flowTitle1, n: 'Welcome to simultaneous linear equations. A story gives two facts about two unknown numbers, and each fact becomes an equation. Our job is to find the one pair of values that makes both equations true. In this part we learn two methods, elimination and substitution, and we always finish by checking in both equations.' }),
    sl('concept', 'What you will be able to do', { ul: ['Test whether a pair of numbers **solves both** equations', '**Eliminate** a variable by adding, subtracting or scaling first', '**Tidy** equations with brackets or fractions', 'Solve by **substitution** and choose the better method'], n: 'These are your goals for part one. First we see what a solution of a pair of equations means. Then we eliminate a variable by adding, subtracting, or scaling first. We also tidy equations that contain brackets or fractions. Finally we solve by substitution and learn how to choose between the two methods.' }),
    sl('concept', 'One equation, many solutions', { b: 'An equation such as $2x + 3y = 12$ has **infinitely many** solutions: choose $x$, and $y$ follows.', v: oneEqTable, n: `A single equation like two x plus three y equals twelve has many solutions. Choose x, and y follows. Minus three gives ${w(6)}, zero gives ${w(4)}, three gives ${w(2)}, and ${w(6)} gives zero. Every pair in the table makes the left side equal twelve. Two equations together usually leave just one pair that works.` }),
    sl('concept', 'A pair of equations and its solution', { b: `A solution of the pair ${d(P4.tex(1))}, ${d(P4.tex(2))} must satisfy **both** equations. Here it is $(${P4.x.num}, ${P4.y.num})$.`, v: candTable, n: `A pair of equations is satisfied only by values that work in both. Look at the table. Two and five fits the first equation but not the second. Three and two fits both, so it is the solution. Always test a candidate in both equations, because fitting one is not enough.` }),
    sl('check', 'Quick check: scaling an equation', { b: 'Does multiplying both sides by a number change the solutions?', chk: 'tf1', n: 'Multiplying both sides of an equation by a number that is not zero keeps its solutions. Think about whether this helps us match coefficients.' }),
    sl('concept', 'Elimination: make one variable disappear', { b: 'Scale the equations so that one variable has coefficients of **equal size**. **Opposite signs: add. Same sign: subtract.**', v: flowMethod, n: 'Elimination makes one variable disappear. Write both equations in the same form. Scale them so that one variable has coefficients of equal size. If the signs are opposite, add the equations. If the signs are the same, subtract. Then solve the single equation, substitute back for the other variable, and check.' }),
    ex('Worked example 1: adding', `Solve ${d(Sd1.tex(1))} and ${d(Sd1.tex(2))}.`, [`**Step 1 —** The $y$-coefficients are $+3$ and $-3$: **add**. $${E1.k}x = ${E1.rhs}$, so $x = ${Sd1.x.num}$.`, `**Step 2 —** Put $x = ${Sd1.x.num}$ into (1): $${Sd1.a1 * Sd1.x.num} + 3y = ${Sd1.c1}$, so $y = ${Sd1.y.num}$.`, '**Check —** in both equations.'], t1, `Look at y: the coefficients are plus three and minus three, so adding removes y. Four x plus five x gives ${w(E1.k)} x, and ${w(30)} plus ${w(24)} gives ${w(E1.rhs)}, so x equals ${w(Sd1.x.num)}. Back in the first equation, ${w(24)} plus three y equals ${w(30)}, so y equals ${w(Sd1.y.num)}.`),
    ex('Worked example 2: subtracting', `Solve ${d(Sd2.tex(1))} and ${d(Sd2.tex(2))}.`, [`**Step 1 —** The $x$-coefficients are both $7$: **subtract**. $${E2.k}y = ${E2.rhs}$, so $y = ${Sd2.y.num}$.`, `**Step 2 —** Put $y = ${Sd2.y.num}$ into (1): $7x + 20 = 34$, so $x = ${Sd2.x.num}$.`, '**Watch the signs —** $4y - (-3y) = 7y$ and $34 - (-1) = 35$.'], t2, `Now x has coefficient seven in both equations with the same sign, so we subtract. Four y minus minus three y is seven y, and thirty four minus minus one is thirty five. So y equals ${w(Sd2.y.num)}. Then seven x plus twenty equals thirty four, so x equals ${w(Sd2.x.num)}. Be careful with the double minus.`),
    sl('check', 'Quick check: adding', { b: 'Adding two equations that have $+5y$ and $-5y$.', chk: 'fb1', n: 'Add the two left sides and the two right sides. The y terms cancel, leaving an equation in x only. Watch the signs of the right sides.' }),
    ex('Worked example 3: scale one equation', `Solve ${d(Sd3.tex(1))} and ${d(Sd3.tex(2))}.`, [`**Step 1 —** $y$-coefficients $3$ and $6$: multiply (1) by $2$ to get $6y$ in both.`, `**Step 2 —** Same sign: **subtract**. $${E3.k}x = ${E3.rhs}$, so $x = ${Sd3.x.num}$.`, `**Step 3 —** Back-substitute: $y = ${Sd3.y.num}$.`], t3, `Only the first equation needs scaling. The y coefficients are three and six, so multiply the first equation by two to get six y in both. Now subtract: ten x minus two x is eight x, and fifty eight minus twenty six is thirty two, so x is ${w(Sd3.x.num)}. Then five times four plus three y equals twenty nine, so y is ${w(Sd3.y.num)}.`),
    ex('Worked example 4: scale both equations', `Solve ${d(Sd4.tex(1))} and ${d(Sd4.tex(2))}.`, ['**Step 1 —** $y$-coefficients $4$ and $-5$: LCM $20$. Multiply (1) by $5$ and (2) by $4$.', `**Step 2 —** Opposite signs: **add**. $${E4.k}x = ${E4.rhs}$, so $x = ${Sd4.x.num}$.`, `**Step 3 —** Back-substitute: $y = ${Sd4.y.num}$.`], t4, `Neither coefficient divides the other, so we scale both equations. The lowest common multiple of four and five is twenty. Multiply the first equation by five and the second by four. The y terms are plus twenty y and minus twenty y, so we add. We get thirty seven x equals ${w(E4.rhs)}, so x is ${w(Sd4.x.num)}, and then y is ${w(Sd4.y.num)}.`),
    sl('concept', 'Which variable should you eliminate?', { b: 'Either works. Compare the multipliers, and prefer opposite signs (an easy **add**).', v: chooseTable, n: `You may eliminate either variable. Eliminating x needs multipliers ${w(E4x.m1)} and ${w(E4x.m2)}, then a subtraction. Eliminating y needs multipliers ${w(E4.m1)} and ${w(E4.m2)}, then an addition. Both routes lead to a coefficient of thirty seven, and to the same answer. Pick the route with smaller numbers or an easy addition.` }),
    sl('check', 'Quick check: multipliers', { b: 'Find the lowest common multiple of the two $x$-coefficients.', chk: 'm02', n: 'Find the lowest common multiple of the two coefficients, then divide it by each coefficient to get the multipliers.' }),
    ex('Worked example 5: tidy first', `Solve ${d(q5[0])} and ${d(q5[1])}.`, ['**Step 1 —** Clear fractions: multiply (1) by $10$. Expand (2) and collect terms.', `**Step 2 —** Scale by $3$ and $2$ and **subtract**: $${E5.k}y = ${E5.rhs}$, so $y = ${Sd5.y.num}$.`, `**Step 3 —** Back-substitute: $x = ${Sd5.x.num}$.`], t5, `First tidy both equations. Multiply the first by ten to clear the fractions, giving two x minus five y equals minus ten. Expand the second and collect terms, giving three x minus two y equals eighteen. Now eliminate x by scaling with three and two, and subtracting. We get y equals ${w(Sd5.y.num)}, then x equals ${w(Sd5.x.num)}.`),
    sl('concept', 'Substitution: replace one variable', { b: 'Make one variable the subject, then **replace** it in the other equation, **using brackets**.', v: flowSub, n: 'Substitution replaces one variable by an expression. Choose the equation and variable with the simplest coefficient, ideally one. Make that variable the subject. Replace it in the other equation, using brackets, and solve. Then put the value back to find the other variable.' }),
    ex('Worked example 6: a coefficient of 1', `Solve ${d(Sd6.tex(1))} and ${d(Sd6.tex(2))}.`, ['**Step 1 —** In (1), $y$ has coefficient $1$: $y = 17 - 3x$.', `**Step 2 —** Replace $y$ in (2), in brackets: $2x - 3(17 - 3x) = 4$, so $${U6.K.tex()}x = ${U6.C.tex()}$ and $x = ${Sd6.x.num}$.`, `**Step 3 —** $y = 17 - 3(${Sd6.x.num}) = ${Sd6.y.num}$.`], t6, `In the first equation y has coefficient one, so make y the subject: y equals seventeen minus three x. Replace y in the second equation, using brackets: two x minus three times seventeen minus three x equals four. Expanding gives eleven x equals fifty five, so x is ${w(Sd6.x.num)}. Then y is seventeen minus fifteen, which is ${w(Sd6.y.num)}.`),
    ex('Worked example 7: no coefficient is 1', `Solve ${d(Sd7.tex(1))} and ${d(Sd7.tex(2))} by substitution.`, ['**Step 1 —** No coefficient is $\\pm 1$, so $x = \\dfrac{7}{3} - \\dfrac{2}{3}y$ has fractions.', `**Step 2 —** Replace and collect: $${U7.K.tex()}y = ${U7.C.tex()}$, so $y = ${Sd7.y.num}$.`, `**Step 3 —** $x = ${Sd7.x.num}$. Elimination would have been cleaner.`], t7, `Here no coefficient is one, so isolating a variable creates fractions. We get x equals seven thirds minus two thirds y. It still works, but the arithmetic is heavier, so elimination would have been cleaner. The answer is x equals ${w(Sd7.x.num)} and y equals ${w(Sd7.y.num)}.`),
    sl('check', 'Quick check: find the slip', { b: 'Substitution with a mistake hidden in one step.', chk: 'm09', n: 'Check each step by expanding the bracket carefully. The first wrong step is the one where a term was not multiplied.' }),
    sl('summary', 'Summary', { ul: ['**Solution of a pair:** satisfies both equations', '**Elimination:** equal-size coefficients, then add (opposite signs) or subtract (same sign)', '**Substitution:** make a variable the subject, replace it in brackets', '**Tidy first:** brackets and fractions, then $ax + by = c$', '**Always check** in both equations'], v: sum1, n: 'To sum up part one. A solution of a pair satisfies both equations. Elimination matches coefficients and then adds or subtracts. Substitution makes one variable the subject and replaces it, using brackets. Tidy equations with brackets or fractions first. And always check your answer in both equations.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Solve a pair (3 marks):** equations scaled or substituted 1 + first variable 1 + second variable 1', '**Mistake:** multiplying the left side but not the right side', '**Mistake:** subtracting a negative as if it were positive', '**Mistake:** forgetting brackets when substituting an expression', '**Mistake:** checking in only one equation'], n: 'In the examination, show the scaled equations, the single equation that results, and both values. Multiply every term when you scale, including the right side. Take care when you subtract a negative number. Use brackets when you substitute an expression. And check in both equations.' }),
  ],
});

// ---------------------------------------------------------------- Deck 2
const flowTitle2 = flow('LR', [['a', 'A story with two facts'], ['b', 'Two equations'], ['c', 'Solve (any method)'], ['d', 'Check in the story']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart: a story with two facts becomes two equations; solve them by any method; check the answers in the story.', 'From a story to an answer.');
const d2 = deck({
  part: 2,
  title: 'Simultaneous Linear Equations — Part 2: Cross-multiplication, reciprocal forms and word problems',
  goals: ['State the cross-multiplication scheme with its sign convention and use it', 'Reduce equations in 1/x and 1/y to a linear pair and solve them', 'Frame two equations from word problems on numbers, digits, ages, boats and perimeters', 'Check every answer in the story'],
  slides: [
    sl('title', 'Simultaneous Linear Equations, Part 2', { b: 'A third method, equations in $\\dfrac{1}{x}$ and $\\dfrac{1}{y}$, and the art of turning stories into equations.', v: flowTitle2, n: 'Welcome to part two. We meet a third method, cross-multiplication, which gives the answer from the coefficients by a fixed pattern. We also handle equations with x and y in denominators. Then we practise the most important skill, turning a story into two equations, solving them, and checking the answers against the story.' }),
    sl('concept', 'What you will be able to do', { ul: ['**Cross-multiply:** use the scheme and its sign convention', '**Reduce** $\\dfrac{a}{x} + \\dfrac{b}{y} = c$ to a linear pair', '**Frame** equations for numbers, digits, ages, boats and perimeters', '**Check** the answer in the story'], n: 'These are your goals for part two. We state the cross-multiplication scheme carefully, with its sign convention. We reduce equations in one over x and one over y to a linear pair. Then we frame equations for problems about numbers, digits, ages, boats and perimeters, and always check the answer in the story.' }),
    sl('concept', 'The cross-multiplication scheme', { b: r`For $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$: $\dfrac{x}{b_1c_2 - b_2c_1} = \dfrac{y}{c_1a_2 - c_2a_1} = \dfrac{1}{a_1b_2 - a_2b_1}$. **Sign convention:** $c$ is the constant term on the **left**, so $c = -(\text{number after the equals sign})$.`, v: schemeTable, n: 'To use cross-multiplication, first write each equation as a x plus b y plus c equals zero. The scheme says x over the first quantity equals y over the second equals one over the third. Under x is b one times c two minus b two times c one. Under y is c one times a two minus c two times a one. Under one is a one times b two minus a two times b one.' }),
    sl('concept', 'The arrow rule: how to remember it', { b: 'Each denominator is a **down-product minus an up-product** of two neighbouring columns. Do not forget that $c$ is minus the right-hand side.', v: arrowTable, n: 'Write the coefficients of each equation in the order b, c, a, b. For x use the first two columns, for y the middle two, and for one the last two. Each denominator is the product going down from the first equation to the second, minus the product going up. And remember the sign convention: c is minus the right side.' }),
    ex('Worked example 1: the scheme', `Solve ${d(Sx1.tex(1))} and ${d(Sx1.tex(2))} by cross-multiplication.`, [`**Step 1 —** Standard form: $c_1 = ${X1.c1}$, $c_2 = ${X1.c2}$.`, `**Step 2 —** Denominators: $${X1.Dx}$, $${X1.Dy}$, $${X1.D}$.`, `**Step 3 —** $x = \\dfrac{${X1.Dx}}{${X1.D}} = ${Sx1.x.num}$ and $y = \\dfrac{${X1.Dy}}{${X1.D}} = ${Sx1.y.num}$.`], tx1, `Move the right sides across: c one is minus three and c two is minus sixteen. The denominator under x is ${w(X1.Dx)}, under y is ${w(X1.Dy)}, and the last is ${w(X1.D)}. So x is ${w(X1.Dx)} over ${w(X1.D)}, which is ${w(Sx1.x.num)}, and y is ${w(X1.Dy)} over ${w(X1.D)}, which is ${w(Sx1.y.num)}.`),
    sl('check', 'Quick check: the sign of c', { b: 'Writing $4x + 3y = 17$ as $ax + by + c = 0$.', chk: 'm13', n: 'Move every term to the left side. The constant on the left is the negative of the number on the right.' }),
    ex('Worked example 2: watch the signs', `Solve ${d(Sx2.tex(1))} and ${d(Sx2.tex(2))} by cross-multiplication.`, [`**Step 1 —** $c_1 = ${X2.c1}$ (right side $+1$) and $c_2 = ${X2.c2}$ (right side $-28$).`, `**Step 2 —** Denominators: $${X2.Dx}$, $${X2.Dy}$, $${X2.D}$.`, `**Step 3 —** $x = ${Sx2.x.num}$, $y = ${Sx2.y.num}$.`], tx2, `Here one right side is positive and the other negative, so the signs of c need care. C one is minus one, because the right side is plus one, and c two is plus twenty eight. The denominators are ${w(X2.Dx)}, ${w(X2.Dy)} and ${w(X2.D)}. Dividing gives x equals ${w(Sx2.x.num)} and y equals ${w(Sx2.y.num)}.`),
    sl('concept', 'When the scheme cannot be used', { b: r`If $a_1b_2 - a_2b_1 = 0$, the pair has **no single solution** and the scheme fails. Check this value first when in doubt.`, v: warnTable, n: `The scheme needs the last denominator to be different from zero. If a one b two minus a two b one is zero, the pair does not have a single solution, and cross-multiplication cannot be used. In the first pair this value is zero. In the second it is minus twenty four, so the scheme works and gives one answer.` }),
    sl('check', 'Quick check: the third denominator', { b: 'Assertion and reason about $a_1b_2 - a_2b_1$.', chk: 'ar4', n: 'Work out a one b two minus a two b one for the given pair. Then decide whether the reason really explains the assertion.' }),
    ex('Worked example 3: tidy, then cross-multiply', `Solve ${d(q3[0])} and ${d(q3[1])}.`, ['**Step 1 —** (1): $4x - 4 = 3y - 7$, so $4x - 3y = -3$. (2): multiply by $15$: $5x + 3y = 30$.', `**Step 2 —** $c_1 = ${X3.c1}$, $c_2 = ${X3.c2}$; denominators $${X3.Dx}$, $${X3.Dy}$, $${X3.D}$.`, `**Step 3 —** $x = ${Sx3.x.num}$, $y = ${Sx3.y.num}$.`], tx3, `First tidy. Expanding the first equation and collecting gives four x minus three y equals minus three. Multiplying the second by fifteen gives five x plus three y equals thirty. Now c one is three and c two is minus thirty. The denominators are ${w(X3.Dx)}, ${w(X3.Dy)} and ${w(X3.D)}, so x is ${w(Sx3.x.num)} and y is ${w(Sx3.y.num)}.`),
    sl('concept', 'Equations in 1/x and 1/y', { b: 'These are **not** linear in $x$ and $y$, but they are linear in $u = \\dfrac{1}{x}$ and $v = \\dfrac{1}{y}$.', v: flowRecip, n: 'Sometimes x and y sit in denominators. The equations are not linear in x and y, but they are linear in their reciprocals. Put u equal to one over x and v equal to one over y. Solve the linear pair for u and v. Then take reciprocals to get x and y. Do not forget that last step.' }),
    ex('Worked example 4: reciprocals', `Solve ${d(Rx.tex1)} and ${d(Rx.tex2)}.`, ['**Step 1 —** $u = \\dfrac{1}{x}$, $v = \\dfrac{1}{y}$: $6u + 8v = 5$ and $4u - 12v = -1$.', `**Step 2 —** Eliminate $v$ (multipliers $3$ and $2$, **add**): $${ER.k}u = ${ER.rhs}$, so $u = \\dfrac{1}{2}$, and $v = \\dfrac{1}{4}$.`, `**Step 3 —** $x = \\dfrac{1}{u} = ${Rx.x.num}$ and $y = \\dfrac{1}{v} = ${Rx.y.num}$.`], tr, `Put u equal to one over x and v equal to one over y. The equations become six u plus eight v equals five, and four u minus twelve v equals minus one. Eliminate v with multipliers three and two and add: twenty six u equals thirteen, so u is one half, and v is one quarter. Taking reciprocals, x is ${w(Rx.x.num)} and y is ${w(Rx.y.num)}.`),
    sl('check', 'Quick check: reciprocals', { b: 'Solve and then invert.', chk: 'n04', n: 'Replace one over x by u and one over y by v, solve the linear pair, and then take reciprocals. Add the final values of x and y.' }),
    sl('concept', 'Framing equations: the five steps', { b: 'Two unknowns need **two** facts. Name the unknowns first, say what each stands for, and check the answers **in the story**.', v: flowFrame, n: 'Every word problem follows the same route. Read the story and name two unknowns, saying what each stands for. Write one equation for each fact. Solve the pair by any method. Then check each answer in the story itself, not just in your equations. Finally state the answer with its units.' }),
    sl('concept', 'Translating words into equations', { b: 'Learn the standard translations: digits use **place value**, ages use $x \\pm n$, boats use $u + v$ and $u - v$.', v: phraseTable, n: `Here are the standard translations. A sum is x plus y. A number five more than twice another is x equals two y plus five. A two digit number with tens digit x and units digit y is ten x plus y, for example ${w(47)}. Reversed it is ten y plus x, for example ${w(74)}. Ages a few years ago or hence are x minus n or x plus n. Downstream and upstream speeds are u plus v and u minus v.` }),
    ex('Worked example 5: a two-digit number', 'The digits of a two-digit number add up to $12$, and the number is $15$ times its units digit. Find the number.', ['**Step 1 —** Tens digit $x$, units digit $y$: $x + y = 12$ and $10x + y = 15y$, i.e. $10x - 14y = 0$.', `**Step 2 —** Eliminate $y$: $${Ew1.k}x = ${Ew1.rhs}$, so $x = ${Wd1.x.num}$, $y = ${Wd1.y.num}$.`, '**Answer —** the number is $75$. Check: $7 + 5 = 12$ and $15 \\times 5 = 75$.'], tw1, `Let the tens digit be x and the units digit be y. The digits add up to twelve, so x plus y equals twelve. The number is ten x plus y, and it equals fifteen times y, so ten x minus fourteen y is zero. Eliminating y gives ${w(Ew1.k)} x equals ${w(Ew1.rhs)}, so x is ${w(Wd1.x.num)} and y is ${w(Wd1.y.num)}. The number is seventy five.`),
    ex('Worked example 6: ages', 'Four years ago a teacher was $7$ times as old as her pupil. The sum of their present ages is $40$ years. Find their ages.', [`**Step 1 —** $x - 4 = 7(y - 4)$ gives $x - 7y = -24$; and $x + y = 40$.`, `**Step 2 —** Subtract: $-8y = -64$, so $y = ${Wd2.y.num}$ and $x = ${Wd2.x.num}$.`, '**Check —** four years ago: $28 = 7 \\times 4$.'], tw2, `Let the teacher be x years old and the pupil y years old. Four years ago, x minus four equals seven times y minus four, which simplifies to x minus seven y equals minus twenty four. The sum of the ages is forty. Subtracting the equations gives minus eight y equals minus sixty four, so the pupil is ${w(Wd2.y.num)} and the teacher is ${w(Wd2.x.num)}. Four years ago they were twenty eight and four.`),
    ex('Worked example 7: a boat in a stream', 'A boat goes $30$ km downstream in $3$ hours and $24$ km upstream in $4$ hours. Find the speed of the boat in still water and of the stream.', ['**Step 1 —** Downstream $\\dfrac{30}{3} = 10$ km/h, upstream $\\dfrac{24}{4} = 6$ km/h.', '**Step 2 —** $u + v = 10$ and $u - v = 6$.', `**Step 3 —** Add: $2u = 16$, so $u = ${Wd3.x.num}$ and $v = ${Wd3.y.num}$.`], tw3, `Downstream speed is thirty divided by three, which is ten kilometres an hour. Upstream speed is twenty four divided by four, which is six. If the boat has speed u and the stream speed v, then u plus v is ten and u minus v is six. Adding gives two u equals sixteen, so the boat goes ${w(Wd3.x.num)} kilometres an hour, and the stream flows at ${w(Wd3.y.num)}.`),
    sl('check', 'Quick check: a boat problem', { b: 'Downstream and upstream speeds.', chk: 'm20', n: 'Find the downstream and upstream speeds from distance over time. Then the boat speed is the average of the two.' }),
    ex('Worked example 8: a park', 'The perimeter of a rectangular park is $120$ m. Its length is $6$ m more than twice its breadth. Find its length and breadth.', ['**Step 1 —** Length $x$, breadth $y$: $x - 2y = 6$ and $2(x + y) = 120$, so $x + y = 60$.', `**Step 2 —** Subtract: $-3y = -54$, so $y = ${Wd4.y.num}$ and $x = ${Wd4.x.num}$.`, '**Check —** $2(42 + 18) = 120$ and $2(18) + 6 = 42$.'], tw4, `Let the length be x metres and the breadth y metres. The length is six more than twice the breadth, so x minus two y equals six. The perimeter is one hundred twenty, so x plus y equals sixty. Subtracting gives minus three y equals minus fifty four, so the breadth is ${w(Wd4.y.num)} metres and the length is ${w(Wd4.x.num)} metres. Both conditions check.`),
    sl('summary', 'Summary', { ul: [r`**Scheme:** $\dfrac{x}{b_1c_2 - b_2c_1} = \dfrac{y}{c_1a_2 - c_2a_1} = \dfrac{1}{a_1b_2 - a_2b_1}$`, '**Sign convention:** $c = -(\\text{number after the equals sign})$', '**Reciprocal forms:** $u = \\dfrac{1}{x}$, $v = \\dfrac{1}{y}$, then invert', '**Word problems:** two unknowns, two equations, check in the story'], v: sum2, n: 'To sum up part two. The cross-multiplication scheme gives x and y from three denominators, and c is the negative of the right side. For reciprocal forms, solve for u and v and then invert. For word problems, name two unknowns, write two equations, solve, and check in the story.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Frame and solve (3 marks):** two equations 1 + solution method 1 + both values and check 1', '**Long answer (10 marks):** parts (a), (b), (c) usually 3 + 3 + 4', '**Mistake:** using the right-hand side as $c$ without changing its sign', '**Mistake:** stopping at $u$ and $v$ without taking reciprocals', '**Mistake:** checking in the equations but not in the story'], n: 'In a framing question, always state what your letters stand for. Marks go to the two equations, then to the solution, then to both values with a check. In cross-multiplication, change the sign of the right side to get c. In reciprocal problems, finish by inverting u and v. And check against the story, not only against your own equations.' }),
  ],
});
// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-9-mathematics-ch05', version: 1, title: 'Simultaneous Linear Equations — chapter notes', language: 'en',
  sections: [
    { heading: '1. Equations in two variables and their solutions', body_md: r`A **linear equation in two variables** can be written $ax + by = c$, where $a$ and $b$ are not both zero. A **solution** is a pair of values $(x, y)$ that makes it true. One equation has infinitely many solutions: choose $x$, and $y$ follows.

- A **pair** (system) of equations is solved **simultaneously**: the solution $(x, y)$ must satisfy **both** equations.
- To test a pair of numbers, substitute it into **both** equations; fitting one equation is not enough.
- Drawing the equations as graphs is the subject of a later chapter; here we solve by algebra only.`, key_terms: [{ term: 'Linear equation in two variables', definition_md: 'An equation that can be written $ax + by = c$ with $a$, $b$ not both zero.' }, { term: 'Solution of a pair', definition_md: 'A pair of values $(x, y)$ that satisfies both equations at the same time.' }], formulas: [{ latex: r`ax + by = c`, label: 'Standard form' }], visual: oneEqTable, visuals: [candTable], topic_ids: [topic(1)] },
    { heading: '2. Elimination', body_md: r`**Elimination** removes one variable by adding or subtracting the equations.

1. Write both equations as $ax + by = c$.
2. Choose the variable to eliminate; find the LCM $L$ of its two coefficients (in size). Multiply (1) by $\dfrac{L}{|p_1|}$ and (2) by $\dfrac{L}{|p_2|}$, **every term, including the right side**. If a coefficient already divides the other, one equation needs no scaling.
3. **Opposite signs: add. Same sign: subtract.**
4. Solve the equation in one variable, substitute back into an original equation for the other variable, and check in both.

Either variable can be eliminated; prefer small multipliers or an easy addition.`, key_terms: [{ term: 'Elimination', definition_md: 'Making one variable vanish by adding or subtracting suitably scaled equations.' }, { term: 'LCM of the coefficients', definition_md: 'The smallest number both coefficients divide; it fixes the multipliers.' }], formulas: [{ latex: r`m_1 = \dfrac{L}{|p_1|}, \quad m_2 = \dfrac{L}{|p_2|}`, label: 'Multipliers (L = LCM of |p1|, |p2|)' }], visual: t4, visuals: [chooseTable], topic_ids: [topic(1)] },
    { heading: '3. Substitution', body_md: r`**Substitution** replaces one variable by an expression in the other.

1. Pick the equation and variable with the simplest coefficient (ideally $1$ or $-1$) and make that variable the subject.
2. Replace it in the **other** equation, **using brackets**, expand and collect like terms.
3. Solve for the remaining variable, then substitute back.

If no coefficient is $\pm 1$ the expression has fractions; elimination is usually cleaner.`, key_terms: [{ term: 'Substitution', definition_md: 'Writing one variable in terms of the other from one equation and putting it into the second equation.' }, { term: 'Subject of an equation', definition_md: 'The variable written alone on one side, such as $y = 17 - 3x$.' }], formulas: [], visual: t6, visuals: [flowSub, t7], topic_ids: [topic(2)] },
    { heading: '4. Cross-multiplication', body_md: r`Write the equations as $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$. Then
$$\dfrac{x}{b_1c_2 - b_2c_1} = \dfrac{y}{c_1a_2 - c_2a_1} = \dfrac{1}{a_1b_2 - a_2b_1}.$$

- **Sign convention:** $c$ is the constant term on the **left**, so $c = -(\text{number after the equals sign})$: $4x + 3y = 17$ becomes $4x + 3y - 17 = 0$, $c = -17$.
- **Arrow rule:** each denominator is a down-product minus an up-product of two neighbouring columns in the array $b\ c\ a\ b$.
- Then $x = \dfrac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1}$ and $y = \dfrac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}$.
- The scheme needs $a_1b_2 - a_2b_1 \ne 0$; if it is $0$, the pair has no single solution.`, key_terms: [{ term: 'Cross-multiplication', definition_md: 'Solving $a_1x + b_1y + c_1 = 0$, $a_2x + b_2y + c_2 = 0$ from the coefficients by the arrow scheme.' }], formulas: [{ latex: r`\dfrac{x}{b_1c_2 - b_2c_1} = \dfrac{y}{c_1a_2 - c_2a_1} = \dfrac{1}{a_1b_2 - a_2b_1}`, label: 'Cross-multiplication scheme' }, { latex: r`c = -(\text{number after the equals sign})`, label: 'Sign convention' }], visual: schemeTable, visuals: [arrowTable, tx1, warnTable], topic_ids: [topic(3)] },
    { heading: '5. Tidying equations and reciprocal forms', body_md: r`Before using any method, write each equation as $ax + by = c$ with whole-number coefficients.

- **Brackets:** expand, then collect: $3(x - 4) = 2y + 6$ becomes $3x - 2y = 18$.
- **Fractions:** multiply **every** term by the LCM of the denominators: $\dfrac{x}{5} - \dfrac{y}{2} = -1$ becomes $2x - 5y = -10$.
- **Reciprocal forms** $\dfrac{a}{x} + \dfrac{b}{y} = c$: put $u = \dfrac{1}{x}$ and $v = \dfrac{1}{y}$ to get the linear pair $au + bv = c$; solve for $u$ and $v$; then $x = \dfrac{1}{u}$ and $y = \dfrac{1}{v}$.`, key_terms: [{ term: 'Clearing fractions', definition_md: 'Multiplying every term by the LCM of the denominators.' }, { term: 'Reciprocal form', definition_md: 'An equation with $x$ and $y$ in denominators, linear in $\\dfrac{1}{x}$ and $\\dfrac{1}{y}$.' }], formulas: [{ latex: r`u = \dfrac{1}{x}, \quad v = \dfrac{1}{y}`, label: 'Reciprocal substitution' }], visual: t5, visuals: [flowRecip, tr, tx3], topic_ids: [topic(1), topic(3)] },
    { heading: '6. Framing equations for word problems', body_md: r`1. Read the story; name **two** unknowns and say what each stands for.
2. Write one equation for each fact.
3. Solve the pair; 4. check the answers **in the story**; 5. answer with units.

**Standard translations:** a two-digit number with tens digit $x$ and units digit $y$ is $10x + y$ (reversed: $10y + x$); ages $n$ years ago or hence are $x - n$ and $x + n$; a boat with speed $u$ in a stream of speed $v$ goes $u + v$ downstream and $u - v$ upstream; a fraction is $\dfrac{x}{y}$; perimeter of a rectangle is $2(l + b)$.`, key_terms: [{ term: 'Two-digit number', definition_md: 'With tens digit $x$ and units digit $y$ its value is $10x + y$.' }, { term: 'Downstream and upstream', definition_md: 'With the stream the speed is $u + v$; against it, $u - v$.' }], formulas: [{ latex: r`10x + y`, label: 'Two-digit number' }, { latex: r`u + v, \quad u - v`, label: 'Downstream, upstream speeds' }], visual: phraseTable, visuals: [flowFrame, tw1, tw3], topic_ids: [topic(4)] },
    { heading: '7. Choosing a method and checking', body_md: r`- **Elimination** is the all-purpose method when coefficients match or are easy to match.
- **Substitution** is best when one coefficient is $\pm 1$.
- **Cross-multiplication** is quick once the equations are in the form $ax + by + c = 0$; take care with the sign of $c$.
- Whatever the method, **check in both original equations** (and in the story for a word problem).
- The three methods give the same solution of the same pair.`, key_terms: [], formulas: [], visual: sum1, visuals: [sum2, tw2, tw4], topic_ids: [topic(1), topic(2), topic(3), topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Solve a pair (3 marks):* scaled equations or substitution 1; first variable 1; second variable 1 (with the check).
- *Cross-multiplication (3 marks):* standard form with the sign change of $c$ 1; the three denominators 1; $x$ and $y$ 1.
- *Reciprocal form (3 marks):* linear pair in $u$, $v$ 1; $u$ and $v$ 1; $x$ and $y$ 1.
- *Word problem (2–3 marks):* two equations 1; solution 1; check and answer with units 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; state what your letters stand for.

**Common mistakes**
1. Multiplying only the left side when scaling an equation.
2. Subtracting a negative term as if it were positive: $4y - (-3y) = 7y$.
3. Forgetting brackets when substituting, so $-3(17 - 3x)$ becomes $-51 - 9x$.
4. Using the right-hand side as $c$ in the scheme without changing its sign.
5. Stopping at $u$ and $v$ and not taking reciprocals.
6. Checking in only one equation, or not checking in the story.`,
  status: 'draft', provenance: d1.provenance,
};
must(W(Sd5.env, [r`3(x - 4) = 3x - 12`]) && cleared(r`3(x - 4) = 2y + 6`).join() === '3,-2,18' && cleared(r`\dfrac{x}{5} - \dfrac{y}{2} = -1`).join() === '2,-5,-10', 'notes: tidy examples');
must(sameEq('4x + 3y = 17', '4x + 3y - 17 = 0') && !sameEq('4x + 3y = 17', '4x + 3y + 17 = 0'), 'notes sign convention example: c = -17');
must(W({ x: 5 }, [r`-3(17 - 3x) = -51 + 9x`]) && !W({ x: 5 }, [r`-3(17 - 3x) = -51 + 9x`]) === false, 'notes mistake 3: -3(17 - 3x) = -51 + 9x');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const Sf1 = sysFrom(3, 2, 1, -2, 4, 2), Ef1 = elimSteps(Sf1, 'y', 1);
must(Ef1.op === 'add' && Ef1.k === 4 && Ef1.rhs === 16 && Sf1.c2 === 0 && Sf1.x.eq(F(4)) && Sf1.y.eq(F(2)), 'f21');
const Sf2 = sysFrom(3, 2, 1, -1, 2, 3), Xf2 = crossSteps(Sf2);
must(Sf2.c1 === 12 && Sf2.c2 === -3 + 2 && Xf2.Dx === -10 + 0 && Xf2.D === -5 && Xf2.Dy === -15 && Sf2.x.eq(F(2)) && Sf2.y.eq(F(3)), 'f22');
const Rf3 = recipSys(2, 3, 8, 4, -3, -2);
must(Rf3.x.eq(F(1)) && Rf3.y.eq(F(1, 2)), 'f23');
const Sf4 = new Sys(1, 1, 8, -1, 1, 2);
must(Sf4.x.eq(F(3)) && Sf4.y.eq(F(5)) && 10 * 5 + 3 - (10 * 3 + 5) === 18, 'f24: 35 and 53');
const Sf5 = new Sys(1, -2, 0, 1, 1, 36);
must(Sf5.x.eq(F(24)) && Sf5.y.eq(F(12)), 'f25');
must(substSteps(Sd6, 1, 'y').ov.eq(Sd6.x) && elimSteps(Sd6, 'y', 1).wv.eq(Sd6.x) && crossSteps(Sd6).xv.eq(Sd6.x) && crossSteps(Sd6).yv.eq(Sd6.y), 'f20: the three methods agree on the pair 3x + y = 17, 2x - 3y = 4');
const flashcards = {
  unit: 'icse-9-mathematics-ch05', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **linear equation in two variables**?', r`An equation that can be written $ax + by = c$, with $a$ and $b$ not both zero; each variable appears to the power $1$.`, 'definition', 1),
    fc('f02', 'What is a **solution of a pair** of simultaneous equations?', 'A pair of values $(x, y)$ that satisfies **both** equations at the same time.', 'definition', 1),
    fc('f03', 'What does **simultaneous** mean for equations?', 'Both equations must hold together for the same values of $x$ and $y$.', 'definition', 1),
    fc('f04', 'What is the **elimination method**?', 'Scale the equations so one variable has coefficients of equal size, then add or subtract to remove it.', 'definition', 1),
    fc('f05', 'What is the **substitution method**?', 'Make one variable the subject of one equation and replace it in the other equation.', 'definition', 2),
    fc('f06', 'State the **cross-multiplication scheme**.', r`For $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$: $\dfrac{x}{b_1c_2 - b_2c_1} = \dfrac{y}{c_1a_2 - c_2a_1} = \dfrac{1}{a_1b_2 - a_2b_1}$.`, 'formula', 3),
    fc('f07', 'What is the **sign convention** for $c$ in the scheme?', r`$c$ is the constant on the left: $c = -(\text{number after the equals sign})$. So $4x + 3y = 17$ has $c = -17$.`, 'formula', 3),
    fc('f08', 'What is the denominator under $1$ in the scheme?', r`$a_1b_2 - a_2b_1$, which must not be $0$.`, 'formula', 3),
    fc('f09', 'Which substitution reduces $\\dfrac{a}{x} + \\dfrac{b}{y} = c$ to a linear equation?', r`$u = \dfrac{1}{x}$ and $v = \dfrac{1}{y}$, giving $au + bv = c$. Invert at the end: $x = \dfrac{1}{u}$.`, 'formula', 1),
    fc('f10', 'Value of a two-digit number with tens digit $x$, units digit $y$; and when reversed?', r`$10x + y$; reversed, $10y + x$.`, 'formula', 4),
    fc('f11', 'When do you **add** and when **subtract** in elimination?', 'After the coefficients of the chosen variable are equal in size: add if the signs are opposite, subtract if they are the same.', 'concept', 1),
    fc('f12', 'How do you find the **multipliers** in elimination?', r`Take the LCM $L$ of the two coefficients (in size); multiply (1) by $\dfrac{L}{|p_1|}$ and (2) by $\dfrac{L}{|p_2|}$, every term.`, 'concept', 1),
    fc('f13', 'Which variable do you isolate in substitution?', 'The one with coefficient $1$ or $-1$ if there is one: no fractions appear.', 'concept', 2),
    fc('f14', 'Why check in **both** equations?', 'A pair that satisfies only one equation is not a solution of the pair; checking in both catches arithmetic slips.', 'concept', 1),
    fc('f15', 'When can the scheme **not** be used?', r`When $a_1b_2 - a_2b_1 = 0$: the pair has no single solution.`, 'concept', 3),
    fc('f16', r`Why take reciprocals at the end of a $\dfrac{1}{x}$, $\dfrac{1}{y}$ problem?`, r`The linear pair is solved for $u = \dfrac{1}{x}$ and $v = \dfrac{1}{y}$; $x$ and $y$ are their reciprocals.`, 'concept', 1),
    fc('f17', 'Boat with speed $u$ in a stream of speed $v$: downstream and upstream speeds?', r`Downstream $u + v$; upstream $u - v$.`, 'fact', 4),
    fc('f18', 'How do you write a person\'s age $n$ years ago, and $n$ years hence?', r`$x - n$ and $x + n$.`, 'fact', 4),
    fc('f19', 'How many equations do you need for two unknowns?', 'Two (independent) equations, so a word problem needs two facts.', 'fact', 4),
    fc('f20', 'Do elimination, substitution and cross-multiplication give different answers?', 'No: they all give the same solution of the same pair.', 'fact', 3),
    fc('f21', r`Solve $3x + 2y = 16$ and $x - 2y = 0$.`, r`Add (the $y$-terms are $+2y$ and $-2y$): $4x = 16$, so $x = 4$; then $y = 2$.`, 'example', 1),
    fc('f22', r`Solve $3x + 2y = 12$ and $x - y = -1$ by the scheme.`, r`$3x + 2y - 12 = 0$, $x - y + 1 = 0$: denominators $-10$, $-15$, $-5$, so $x = 2$, $y = 3$.`, 'example', 3),
    fc('f23', r`Solve $\dfrac{2}{x} + \dfrac{3}{y} = 8$ and $\dfrac{4}{x} - \dfrac{3}{y} = -2$.`, r`$2u + 3v = 8$, $4u - 3v = -2$: add, $6u = 6$, $u = 1$, $v = 2$. So $x = 1$ and $y = \dfrac{1}{2}$.`, 'example', 1),
    fc('f24', 'The digits of a number add up to $8$, and reversing them adds $18$. Find the number.', r`$x + y = 8$ and $y - x = 2$: $x = 3$, $y = 5$. The number is $35$ (reversed, $53$).`, 'example', 4),
    fc('f25', 'One age is twice another and the sum is $36$ years. Find both.', r`$x = 2y$ and $x + y = 36$: $3y = 36$, $y = 12$, $x = 24$.`, 'example', 4),
    fc('f26', 'Common slip when scaling an equation?', 'Multiplying the left side only. Multiply **every** term, including the right-hand side.', 'exam-tip', 1),
    fc('f27', 'What should the first line of a word problem say?', 'State what each letter stands for, with units, for example "Let the length be $x$ m and the breadth $y$ m".', 'exam-tip', 4),
    fc('f28', 'What is the last line of every solution?', 'A check in both equations (and in the story for a word problem), then the answer with units.', 'exam-tip', 4),
    fc('f29', 'Picture: flow chart of elimination. What follows "add or subtract"?', 'Solve the equation in one variable, put the value into an original equation, then check in both.', 'diagram', 1),
    fc('f30', 'Picture: table of the three denominators. What is under $x$?', r`$b_1c_2 - b_2c_1$ (under $y$: $c_1a_2 - c_2a_1$; under $1$: $a_1b_2 - a_2b_1$).`, 'diagram', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-9-mathematics-ch05', version: 1, academic_year: '2026-27', created_at: '2026-11-09T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t04 as in catalog/cisce/icse-9/mathematics/syllabus.yaml (elimination, substitution, cross-multiplication, framing equations for word problems); equations that need clearing of fractions or rearranging, and equations in 1/x and 1/y, are covered inside t01 and t03; graphical solution belongs to ch20 and is mentioned once', exact_arithmetic: 'every pair of equations is an exact system (src/lin.mjs): solution by Cramer\'s rule in exact fractions, cross-checked against solve2 and substituted into both equations; every working line of elimination, substitution and cross-multiplication on slides, tables and model answers is generated from the computed values; typed working lines are parsed exactly and asserted at the solution; word problems are substituted back into the story' } },
};
const tests = chapterTests('Simultaneous Linear Equations', {
  A: ['m05', 'm10', 'm08', 'm19', 'ar2', 's205', 's301'],
  B: ['l01', 'l04'],
}, {
  A: ['m01', 'm04', 'm06', 'm07', 'm11', 'm12', 'm17', 'ar1', 's201', 's204', 's208', 's303', 's304'],
  B: ['l03', 'l05', 'l07'],
});
build({ dir: DIR, release, testsSpec: tests });

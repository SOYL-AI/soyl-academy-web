// Build ICSE 10 Mathematics ch05 Quadratic Equations in One Variable. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch05/src/build.mjs
// Every root on the slides, in the notes and in the tables is computed by quad.mjs (exact roots verified by
// integer substitution), every typed working line is checked by work.mjs, every rounding refuses boundary
// cases, and every plot marks all the zeros of its curves (checked numerically by lib.mjs).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, geom, build, chapterTests, r } from './lib.mjs';
import { Qd, dp, sf, equalRootParams, coeffsOf } from './quad.mjs';
import { steps, texToExpr, ARITH } from './work.mjs';
import { f } from './lib.mjs';

setUnit('icse-10-mathematics-ch05');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const d = (s) => `$${s}$`;
const near = (u, w) => Math.abs(u - w) < 1e-9;
const S = (ctx, lines, msg) => steps(ctx, lines).must(msg);

// ---------------------------------------------------------------- worked examples (asserted)
// Deck 1
const eT = Qd(1, 1, -12);
must(eT.exact.map((x) => x.tex).join() === '-4,3', 'title roots');
const e1 = Qd(3, -10, -8);
const w1 = S(e1, [r`3x^2 - 12x + 2x - 8 = 0`, r`3x(x - 4) + 2(x - 4) = 0`, r`(3x + 2)(x - 4) = 0`, r`x = 4 \text{ or } x = -\dfrac{2}{3}`], 'e1');
const pairs = [[1, -24], [-1, 24], [2, -12], [-2, 12], [3, -8], [-3, 8], [4, -6], [-4, 6]];
must(pairs.every(([p, q]) => p * q === e1.a * e1.c) && pairs.filter(([p, q]) => p + q === e1.b).length === 1, 'e1 pairs');
const e2 = Qd(2, 5, -12);
const w2 = S(e2, [r`x(2x + 5) = 12`, r`2x^2 + 5x - 12 = 0`, r`2x^2 + 8x - 3x - 12 = 0`, r`2x(x + 4) - 3(x + 4) = 0`, r`(x + 4)(2x - 3) = 0`, r`x = -4 \text{ or } x = \dfrac{3}{2}`], 'e2');
must(8 * -3 === e2.a * e2.c && 8 - 3 === e2.b, 'e2 split');
const e3 = Qd(2, -6, 1);
const w3 = S(e3, [r`x = \dfrac{6 \pm \sqrt{28}}{4} = \dfrac{6 \pm 2\sqrt{7}}{4} = \dfrac{3 \pm \sqrt{7}}{2}`], 'e3');
const w3d = S(ARITH, [r`D = (-6)^2 - 4 \times 2 \times 1 = 36 - 8 = 28`, r`\sqrt{28} = 2\sqrt{7}`], 'e3 D');
must(e3.pmTex === r`\dfrac{3 \pm \sqrt{7}}{2}`, 'e3 pm');
const e4 = Qd(1, -5, -2);
const w4d = S(ARITH, [r`D = (-5)^2 - 4 \times 1 \times (-2) = 25 + 8 = 33`, r`\sqrt{33} \approx 5.7446`, r`\dfrac{5 + 5.7446}{2} = 5.3723 \approx 5.37`, r`\dfrac{5 - 5.7446}{2} = -0.3723 \approx -0.37`], 'e4 arithmetic');
const w4 = S(e4, [r`x = \dfrac{5 \pm \sqrt{33}}{2}`, r`x \approx 5.37 \text{ or } x \approx -0.37`], 'e4');
must(dp(e4.roots[1], 2) === '5.37' && dp(e4.roots[0], 2) === '-0.37', 'e4 rounding');
const e5 = Qd(3, 4, -5);
const w5d = S(ARITH, [r`D = 4^2 - 4 \times 3 \times (-5) = 16 + 60 = 76`, r`\sqrt{76} \approx 8.7178`, r`\dfrac{-4 + 8.7178}{6} \approx 0.7863`, r`\dfrac{-4 - 8.7178}{6} \approx -2.1196`], 'e5 arithmetic');
const w5 = S(e5, [r`x = \dfrac{-4 \pm \sqrt{76}}{6}`, r`x \approx 0.786 \text{ or } x \approx -2.12`], 'e5');
must(sf(e5.roots[1], 3) === '0.786' && sf(e5.roots[0], 3) === '-2.12', 'e5 s.f.');
// Deck 2
const n1 = Qd(3, -7, 2), n2 = Qd(4, 20, 25), n3 = Qd(2, -3, 4);
const wn = S(ARITH, [r`D = (-7)^2 - 4 \times 3 \times 2 = 49 - 24 = 25`, r`D = 20^2 - 4 \times 4 \times 25 = 400 - 400 = 0`, r`D = (-3)^2 - 4 \times 2 \times 4 = 9 - 32 = -23`], 'nature');
must(n1.nature === 'distinct' && n1.rational && n2.nature === 'equal' && n3.nature === 'none' && n2.exact[0].tex === r`-\dfrac{5}{2}` && n1.exact.map((x) => x.tex).join() === r`\dfrac{1}{3},2`, 'nature table');
const kA = equalRootParams((k) => k * k - 144), kB = equalRootParams((k) => 64 - 8 * k);
const wkA = S({ q: [1, 0, -144], roots: kA.map((k) => k.val), v: 'k' }, [r`k^2 - 4 \times 3 \times 12 = 0`, r`k^2 = 144`, r`k = 12 \text{ or } k = -12`], 'kA');
const wkB = S({ q: null, roots: kB.map((k) => k.val), v: 'k' }, [r`(-8)^2 - 4 \times k \times 2 = 0`, r`64 - 8k = 0`, r`k = 8`], 'kB');
const ekA1 = Qd(3, 12, 12), ekA2 = Qd(3, -12, 12), ekB = Qd(8, -8, 2);
const wkA1 = S(ekA1, [r`3x^2 + 12x + 12 = 3(x + 2)^2 = 0`, r`x = -2`], 'kA1');
const wkA2 = S(ekA2, [r`3x^2 - 12x + 12 = 3(x - 2)^2 = 0`, r`x = 2`], 'kA2');
const wkB2 = S(ekB, [r`8x^2 - 8x + 2 = 2(2x - 1)^2 = 0`, r`x = \dfrac{1}{2}`], 'kB2');
must(kA.map((k) => k.val).join() === '-12,12' && kB.length === 1 && kB[0].val === 8 && [ekA1, ekA2, ekB].every((e) => e.nature === 'equal'), 'k values');
const eN = Qd(1, 5, -66);
const wN = S(eN, [r`x^2 + (x + 5)^2 = 157`, r`2x^2 + 10x - 132 = 0`, r`x^2 + 5x - 66 = 0`, r`(x + 11)(x - 6) = 0`, r`x = 6 \text{ or } x = -11`], 'numbers');
must(36 + 121 === 157 && eN.roots.join() === '-11,6', 'numbers story');
const eP = Qd(1, -25, 66, 'w');
const wP = S(eP, [r`(30 - 2w)(20 - 2w) = 336`, r`600 - 100w + 4w^2 = 336`, r`4w^2 - 100w + 264 = 0`, r`w^2 - 25w + 66 = 0`, r`(w - 3)(w - 22) = 0`, r`w = 3 \text{ or } w = 22`], 'path');
must(24 * 14 === 336 && 20 - 2 * 22 < 0, 'path story');
const eB = Qd(5, 0, -45, 's');
const wB = S(eB, [r`\dfrac{36}{15 + s} + \dfrac{36}{15 - s} = 5`, r`36(15 - s) + 36(15 + s) = 5(225 - s^2)`, r`1080 = 1125 - 5s^2`, r`s^2 = 9`, r`s = 3 \text{ or } s = -3`], 'boat');
must(36 / 18 + 36 / 12 === 5, 'boat story');

// ---------------------------------------------------------------- visuals
const pTitle = plot({ x: [-6, 5], y: [-14, 10], fns: [{ expr: 'x^2 + x - 12', label: '$y = x^2 + x - 12$' }], pts: [[-4, 0, '(−4, 0)'], [3, 0, '(3, 0)']] }, 'Graph of y equals x squared plus x minus 12, an upward parabola crossing the x-axis at minus 4 and at 3, the two roots of x squared plus x minus 12 equals 0.', 'The roots of $x^2 + x - 12 = 0$ are where the graph meets the $x$-axis: $-4$ and $3$.');
const sfRows = [[r`3x^2 - 5x = 2`, r`3x^2 - 5x - 2 = 0`, [3, -5, -2]], [r`x(x - 4) = 7`, r`x^2 - 4x - 7 = 0`, [1, -4, -7]], [r`5 - 2x^2 = 0`, r`2x^2 - 5 = 0`, [2, 0, -5]], [r`(x + 2)^2 = x^2 + 9`, r`4x - 5 = 0`, null]];
for (const [eq, std, abc] of sfRows) {
  const [L, R] = eq.split('=').map((s) => f(texToExpr(s)));
  const [SL, SR] = std.split('=').map((s) => f(texToExpr(s)));
  const g = (x) => L(x) - R(x), h = (x) => SL(x) - SR(x);
  const cg = coeffsOf(g), ch = coeffsOf(h);
  const k = ch.find((v) => v !== 0) / cg.find((v) => v !== 0);
  must(cg.every((v, i) => near(v * k, ch[i])), `standard form of ${eq}`);
  must(abc ? abc.every((v, i) => v === ch[i]) && ch[0] !== 0 : ch[0] === 0, `abc of ${eq}`);
}
const sfTable = table(['Equation', 'Standard form', '$a$, $b$, $c$', 'Quadratic?'], sfRows.map(([eq, std, abc]) => [d(eq), d(std), abc ? d(abc.join(',\\ ')) : '—', abc ? 'yes' : 'no: the $x^2$ terms cancel']), 'Table rewriting four equations in standard form: 3x squared minus 5x equals 2 gives a equals 3, b equals minus 5, c equals minus 2; x times x minus 4 equals 7 gives 1, minus 4, minus 7; 5 minus 2x squared equals 0 gives 2, 0, minus 5; x plus 2 all squared equals x squared plus 9 becomes 4x minus 5 equals 0, which is not quadratic.', 'Always simplify first, then read $a$, $b$ and $c$ with their signs.');
const tryRows = [-4, 2, 3, 4].map((x) => [d(String(x)), d(String(x * x + x - 12)), eT.roots.some((t) => near(t, x)) ? 'yes' : 'no']);
must(tryRows.map((x) => x[2]).join() === 'yes,no,yes,no', 'try table');
const tryTable = table(['$x$', '$x^2 + x - 12$', 'Root?'], tryRows, 'Table substituting values into x squared plus x minus 12: minus 4 gives 0, so it is a root; 2 gives minus 6; 3 gives 0, a root; 4 gives 8.', 'A root makes the left side exactly $0$.');
const zpFlow = flow('LR', [['a', 'Write in standard form $ax^2 + bx + c = 0$'], ['b', 'Factorise the left side'], ['c', 'Put each factor equal to $0$'], ['d', 'Solve the two linear equations'], ['e', 'Check by substituting']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for solving by factorisation: write the equation in standard form, factorise the left side, put each factor equal to zero, solve the two linear equations, and check by substituting.', 'The zero-product rule: if $pq = 0$, then $p = 0$ or $q = 0$.');
const pairTable = table(['Pair with product $-24$', 'Sum', 'Sum is $-10$?'], pairs.map(([p, q]) => [d(`${p},\\ ${q}`), d(String(p + q)), p + q === e1.b ? 'yes' : 'no']), 'Table of the eight integer pairs whose product is minus 24, with their sums: only 2 and minus 12 add up to minus 10.', 'For $3x^2 - 10x - 8$: product $ac = -24$, sum $b = -10$.');
const pE2 = plot({ x: [-5, 3], y: [-16, 12], fns: [{ expr: '2x^2 + 5x - 12', label: '$y = 2x^2 + 5x - 12$' }], pts: [[-4, 0, '(−4, 0)'], [1.5, 0, '(1.5, 0)']] }, 'Graph of y equals 2 x squared plus 5 x minus 12, an upward parabola crossing the x-axis at minus 4 and at 1.5.', 'Roots $-4$ and $\\dfrac{3}{2}$.');
const formulaFlow = flow('LR', [['a', 'Standard form; read $a$, $b$, $c$ with signs'], ['b', 'Find $D = b^2 - 4ac$'], ['c', 'Substitute in $x = \\dfrac{-b \\pm \\sqrt{D}}{2a}$'], ['d', 'Simplify the surd, or use a square-root value'], ['e', 'Round only at the end']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for the quadratic formula: write the equation in standard form and read a, b and c with their signs; find the discriminant b squared minus 4 a c; substitute in the formula; simplify the surd or use a decimal value; round only at the end.', 'The quadratic formula, step by step.');
const pE3 = plot({ x: [-0.5, 3.5], y: [-4, 6], fns: [{ expr: '2x^2 - 6x + 1', label: '$y = 2x^2 - 6x + 1$' }], pts: [[e3.roots[0], 0, '$\\tfrac{3 - \\sqrt{7}}{2}$'], [e3.roots[1], 0, '$\\tfrac{3 + \\sqrt{7}}{2}$']] }, 'Graph of y equals 2 x squared minus 6 x plus 1, crossing the x-axis at about 0.18 and 2.82, the irrational roots 3 minus root 7 over 2 and 3 plus root 7 over 2.', 'Irrational roots: no integer factorisation finds them.');
const roundTable = table(['Quantity', 'Calculator value', 'Rounded'], [['$\\sqrt{33}$', `$${Math.sqrt(33).toFixed(6)}\\ldots$`, '$5.7446$ (4 d.p.)'], ['Larger root $\\dfrac{5 + \\sqrt{33}}{2}$', `$${e4.roots[1].toFixed(6)}\\ldots$`, `$${dp(e4.roots[1], 2)}$ (2 d.p.)`], ['Smaller root $\\dfrac{5 - \\sqrt{33}}{2}$', `$${e4.roots[0].toFixed(6)}\\ldots$`, `$${dp(e4.roots[0], 2)}$ (2 d.p.)`]], 'Table of rounding for x squared minus 5x minus 2: root 33 is 5.744563 and so on, kept as 5.7446; the larger root 5.372281 rounds to 5.37 and the smaller root minus 0.372281 rounds to minus 0.37.', 'Keep extra decimal places in working; round the answer once.');
must(dp(Math.sqrt(33), 4) === '5.7446' && Math.sqrt(33).toFixed(6) === '5.744563', 'round table');
const pE5 = plot({ x: [-3, 2], y: [-7, 16], fns: [{ expr: '3x^2 + 4x - 5', label: '$y = 3x^2 + 4x - 5$' }], pts: [[e5.roots[0], 0, '$x \\approx -2.12$'], [e5.roots[1], 0, '$x \\approx 0.786$']] }, 'Graph of y equals 3 x squared plus 4 x minus 5, crossing the x-axis at about minus 2.12 and 0.786.', 'Roots to three significant figures: $-2.12$ and $0.786$.');
const methodRows = [[1, 1, -12, 'factorise ($-4$ and $3$)'], [2, -6, 1, 'formula; leave in surd form'], [1, -5, -2, 'formula, then round as asked'], [9, -6, 1, 'factorise: $(3x - 1)^2$']];
const methodTable = table(['Equation', '$D$', 'Perfect square?', 'Best method'], methodRows.map(([a, b, c, m]) => { const e = Qd(a, b, c); return [d(`${e.tex} = 0`), d(String(e.D)), e.rational ? 'yes' : 'no', m]; }), 'Table choosing a method: x squared plus x minus 12 has discriminant 49, a perfect square, so factorise; 2 x squared minus 6x plus 1 has 28 and x squared minus 5x minus 2 has 33, not perfect squares, so use the formula; 9 x squared minus 6x plus 1 has 0, a perfect square.', 'A perfect-square discriminant means the quadratic factorises over the integers.');
must(methodRows.map(([a, b, c]) => Qd(a, b, c).rational).join() === 'true,false,false,true', 'method table');
const sum1 = table(['Idea', 'Key fact'], [['Standard form', '$ax^2 + bx + c = 0$, $a \\ne 0$'], ['Factorisation', 'split $bx$ using two numbers with product $ac$ and sum $b$'], ['Zero-product rule', '$pq = 0 \\Rightarrow p = 0$ or $q = 0$'], ['Formula', '$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$'], ['Rounding', 'keep extra places; round the final answer only']], 'Summary table for part 1: standard form with a not zero; factorise by splitting the middle term; use the zero-product rule; the quadratic formula; round only the final answer.', 'Part 1 on one card.');

// Deck 2 visuals
const pT2 = plot({ x: [-1, 7], y: [-5, 12], fns: [{ expr: 'x^2 - 6x + 5', label: '$y = x^2 - 6x + 5$' }], pts: [[1, 0, '(1, 0)'], [5, 0, '(5, 0)']] }, 'Graph of y equals x squared minus 6 x plus 5, an upward parabola crossing the x-axis at 1 and 5.', 'Two crossings: two real, distinct roots.');
const dRows = [[1, -6, 5], [1, -6, 9], [1, -6, 10]].map(([a, b, c]) => Qd(a, b, c));
must(dRows.map((e) => `${e.D}:${e.nature}`).join() === '16:distinct,0:equal,-4:none', 'D table');
const NAT = { distinct: 'two real, distinct (unequal) roots', equal: 'two real, equal roots, each $-\\dfrac{b}{2a}$', none: 'no real roots' };
const dTable = table(['Discriminant $D = b^2 - 4ac$', 'Nature of roots', 'Example', '$D$'], dRows.map((e) => [e.D > 0 ? '$D > 0$' : e.D === 0 ? '$D = 0$' : '$D < 0$', NAT[e.nature], d(`${e.tex} = 0`), d(String(e.D))]), 'Table of the three cases: discriminant positive gives two real distinct roots, for example x squared minus 6x plus 5 with D equal to 16; discriminant zero gives equal roots, x squared minus 6x plus 9 with D equal to 0; discriminant negative gives no real roots, x squared minus 6x plus 10 with D equal to minus 4.', 'The sign of $D$ decides the nature of the roots.');
const pThree = plot({ x: [-4, 2], y: [-5, 13], fns: [{ expr: 'x^2 + 2x - 3', label: '$D > 0$' }, { expr: 'x^2 + 2x + 1', label: '$D = 0$' }, { expr: 'x^2 + 2x + 4', label: '$D < 0$' }], pts: [[-3, 0, '(−3, 0)'], [1, 0, '(1, 0)'], [-1, 0, '(−1, 0)']] }, 'Three upward parabolas of the same shape: x squared plus 2x minus 3 crosses the x-axis at minus 3 and 1; x squared plus 2x plus 1 just touches it at minus 1; x squared plus 2x plus 4 stays above it.', 'Two crossings, one touch, or none.');
must([[1, 2, -3, 'distinct'], [1, 2, 1, 'equal'], [1, 2, 4, 'none']].every(([a, b, c, n]) => Qd(a, b, c).nature === n), 'three curves');
const natTable = table(['Equation', '$D$', 'Nature'], [[n1, 'real, distinct and rational (perfect square)'], [n2, 'real and equal'], [n3, 'not real']].map(([e, t]) => [d(`${e.tex} = 0`), d(String(e.D)), t]), 'Table: 3 x squared minus 7x plus 2 has discriminant 25, a positive perfect square, so real, distinct, rational roots; 4 x squared plus 20x plus 25 has 0, so equal roots; 2 x squared minus 3x plus 4 has minus 23, so no real roots.', 'Find $D$ first; the sign decides.');
const pK = plot({ x: [-4, 4], y: [-2, 14], fns: [{ expr: '3x^2 + 12x + 12', label: '$k = 12$' }, { expr: '3x^2 - 12x + 12', label: '$k = -12$' }], pts: [[-2, 0, '(−2, 0)'], [2, 0, '(2, 0)']] }, 'Two parabolas, 3 x squared plus 12x plus 12 and 3 x squared minus 12x plus 12, each touching the x-axis at one point, minus 2 and 2.', 'Equal roots: each graph just touches the $x$-axis.');
const wpFlow = flow('TB', [['a', 'Let $x$ be the unknown (state units)'], ['b', 'Form the equation from the story'], ['c', 'Write it as $ax^2 + bx + c = 0$'], ['d', 'Solve: factorise or use the formula'], ['e', 'Reject roots that do not fit'], ['f', 'Answer the question and check']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart for word problems: let x be the unknown with units; form the equation; write it in standard form; solve by factorising or by the formula; reject roots that do not fit; answer the question and check in the story.', 'Six steps for every word problem.');
const numRows = eN.roots.map((x) => [d(String(x)), d(String(x + 5)), d(`${x * x} + ${(x + 5) * (x + 5)} = ${x * x + (x + 5) ** 2}`), x > 0 ? 'yes' : 'no (negative)']);
must(numRows.map((x) => x[3]).join() === 'no (negative),yes', 'numbers table');
const numTable = table(['$x$', '$x + 5$', 'Sum of squares', 'Both positive?'], numRows, 'Table checking both roots: x equal to minus 11 gives minus 11 and minus 6, whose squares add to 157, but they are negative; x equal to 6 gives 6 and 11, whose squares 36 and 121 add to 157.', 'Both roots satisfy the equation; only one fits "positive".');
const sc = 0.25, wP0 = eP.roots[0] * sc, ox = 0.4, oy = 0.4;
const figPath = geom({ width: 7.5 + 2 * ox, height: 5 + 2 * oy, points: { A: { at: [ox, oy], label: false }, B: { at: [ox + 7.5, oy], label: false }, C: { at: [ox + 7.5, oy + 5], label: false }, D: { at: [ox, oy + 5], label: false }, P: { at: [ox + wP0, oy + wP0], label: false }, Q: { at: [ox + 7.5 - wP0, oy + wP0], label: false }, R: { at: [ox + 7.5 - wP0, oy + 5 - wP0], label: false }, T: { at: [ox + wP0, oy + 5 - wP0], label: false }, U: { at: [ox + 3.75, oy], label: false }, V: { at: [ox + 3.75, oy + wP0], label: false } }, segments: [{ from: 'A', to: 'B', label: '30 m' }, { from: 'B', to: 'C', label: '20 m' }, { from: 'U', to: 'V', label: '3 m' }], polygons: [{ vertices: ['A', 'B', 'C', 'D'], highlight: 'shade' }, { vertices: ['P', 'Q', 'R', 'T'], highlight: 'accent' }], scale: { unit: 'm', per_unit: sc } }, 'A rectangular lawn 30 metres by 20 metres with a shaded path 3 metres wide running along all four edges inside it; the inner rectangle, the remaining lawn, measures 24 metres by 14 metres.', 'The remaining lawn is $(30 - 2w)$ m by $(20 - 2w)$ m; here $w = 3$.');
must(near(7.5 - 2 * wP0, 24 * sc) && near(5 - 2 * wP0, 14 * sc), 'path figure');
const boatRows = [['Downstream', '$15 + 3 = 18$', '$36$', '$\\dfrac{36}{18} = 2$'], ['Upstream', '$15 - 3 = 12$', '$36$', '$\\dfrac{36}{12} = 3$'], ['Total', '', '$72$', '$2 + 3 = 5$']];
S(ARITH, ['15 + 3 = 18', '15 - 3 = 12', r`\dfrac{36}{18} = 2`, r`\dfrac{36}{12} = 3`, '2 + 3 = 5'], 'boat table');
const boatTable = table(['Direction', 'Speed (km/h)', 'Distance (km)', 'Time (h)'], boatRows, 'Table checking the boat answer: downstream the speed is 18 kilometres per hour and 36 kilometres take 2 hours; upstream the speed is 12 and the trip takes 3 hours; total 5 hours.', 'With a stream of $3$ km/h the round trip takes exactly $5$ hours.');
const rejectTable = table(['The unknown is…', 'Reject a root that is…', 'Example'], [['a length, width or speed', 'negative or zero', '$w = 22$ makes a side $20 - 44 < 0$'], ['a number of people or objects', 'negative or not a whole number', '$x = 7.5$ students'], ['an age', 'negative, or makes the story impossible', 'a daughter older than her mother'], ['a natural or positive number', 'negative', '$-11$ when the numbers must be positive'], ['a stream speed', 'negative, or not less than the boat speed', '$s = -3$ km/h']], 'Table of when to reject a root: lengths, widths and speeds must be positive; numbers of people must be whole numbers; ages must make the story possible; positive numbers cannot be negative; a stream speed must be positive and less than the boat speed.', 'Both roots solve the equation; the story decides which one answers the question.');
const sum2 = table(['Idea', 'Key fact'], [['Discriminant', '$D = b^2 - 4ac$'], ['$D > 0$', 'two real, distinct roots (rational if $D$ is a perfect square)'], ['$D = 0$', 'two equal real roots, $-\\dfrac{b}{2a}$'], ['$D < 0$', 'no real roots'], ['Word problems', 'form, solve, reject, answer with units, check']], 'Summary table for part 2: the discriminant b squared minus 4 a c; positive gives two distinct real roots, zero gives equal roots, negative gives no real roots; word problems: form, solve, reject, answer, check.', 'Part 2 on one card.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Quadratic Equations — Part 1: Solving by factorisation and by formula',
  goals: ['Write a quadratic equation in standard form and read off a, b and c', 'Solve a quadratic equation by splitting the middle term', 'Solve a quadratic equation by the quadratic formula', 'Give roots in surd form, to a stated number of decimal places or to significant figures'],
  slides: [
    sl('title', 'Quadratic Equations, Part 1', { b: 'A quadratic equation has at most two roots. On a graph, they are where the parabola meets the $x$-axis.', v: pTitle, n: 'Welcome to quadratic equations. A quadratic equation has a squared term, and it can have up to two roots. Look at the graph: the curve crosses the x axis at minus four and at three, and these are exactly the two roots. In this part you will learn two ways to find them: factorisation and the formula.' }),
    sl('concept', 'What you will be able to do', { ul: ['Write any quadratic in **standard form** $ax^2 + bx + c = 0$', 'Solve by **splitting the middle term**', 'Solve by the **quadratic formula**', 'Give roots in **surd form**, to **decimal places** or to **significant figures**'], n: 'These are your goals for part one. First we put every equation into standard form. Then we factorise by splitting the middle term. Then we learn the quadratic formula, which works every time, and finally how to round roots the way the board asks.' }),
    sl('concept', 'Standard form', { b: 'A **quadratic equation** in $x$ can be written as $ax^2 + bx + c = 0$, where $a$, $b$, $c$ are real numbers and $a \\ne 0$.', v: sfTable, n: 'Before anything else, simplify the equation and move every term to one side. Then read a, b and c, keeping their signs. Be careful: an equation can look quadratic and still not be one. In the last row the x squared terms cancel, and a linear equation is left.' }),
    sl('concept', 'What is a root?', { b: 'A **root** (solution) is a value of $x$ that makes the left side exactly $0$. A quadratic equation has **at most two** roots.', v: tryTable, n: 'A root is a value that makes the equation true. Substitute it, and the left side becomes zero. For x squared plus x minus twelve, minus four and three both give zero, so they are the roots. Two and four do not. A quadratic equation never has more than two roots.' }),
    sl('check', 'Quick check: is it a root?', { b: 'Substitute and see whether you get $0$.', chk: 'm02', n: 'Substitute each value carefully, squaring first, and see which one makes the left side zero.' }),
    sl('concept', 'The zero-product rule', { b: 'If $p \\times q = 0$, then $p = 0$ or $q = 0$. So once the left side is factorised, each factor gives a root.', v: zpFlow, n: 'Factorisation rests on one simple fact. If two numbers multiply to give zero, at least one of them must be zero. So we write the equation in standard form, factorise, and put each factor equal to zero. This works only when the right side is zero.' }),
    sl('example', 'Worked example 1: splitting the middle term', { b: 'Solve $3x^2 - 10x - 8 = 0$.', ul: ['**Step 1 —** $ac = 3 \\times (-8) = -24$; find two numbers with product $-24$ and sum $-10$: $-12$ and $2$.', `**Step 2 —** ${d(w1.lines[0])}, so ${d(w1.lines[1])}.`, `**Step 3 —** ${d(w1.lines[2])}.`, `**Answer —** ${d(w1.lines[3])}.`], v: pairTable, n: 'Multiply a by c to get minus twenty four. We need two numbers with this product that add up to minus ten. The table shows that only two and minus twelve work. Split minus ten x into minus twelve x plus two x, group in pairs, and take out the common bracket. The roots are four and minus two thirds.' }),
    sl('example', 'Worked example 2: rearrange first', { b: 'Solve $x(2x + 5) = 12$.', ul: [`**Step 1 —** Expand and bring $12$ across: ${d(w2.lines[1])}.`, `**Step 2 —** $ac = -24$, sum $5$: use $8$ and $-3$. ${d(w2.lines[2])}.`, `**Step 3 —** ${d(w2.lines[3])}, so ${d(w2.lines[4])}.`, `**Answer —** ${d(w2.lines[5])}.`], v: pE2, n: 'The right side is twelve, not zero, so the zero product rule cannot be used yet. Expand the bracket and subtract twelve: two x squared plus five x minus twelve equals zero. Now split five x using eight and minus three, and factorise. The roots, minus four and three halves, are where the graph meets the x axis.' }),
    sl('check', 'Quick check: dividing by x', { b: 'What happens to the root $0$?', chk: 'tf1', n: 'Think about what dividing by x assumes about x, and which root that might hide.' }),
    sl('concept', 'The quadratic formula', { b: 'For $ax^2 + bx + c = 0$ with $b^2 - 4ac \\ge 0$: $$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$', v: formulaFlow, m: [r`x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}`], n: 'When the numbers do not split nicely, use the quadratic formula. It works for every quadratic with real roots. Read a, b and c with their signs, work out b squared minus four a c first, then substitute. The plus or minus sign gives the two roots. Remember that the whole numerator is divided by two a.' }),
    sl('example', 'Worked example 3: roots in surd form', { b: 'Solve $2x^2 - 6x + 1 = 0$, giving the roots in surd form.', ul: [`**Step 1 —** $a = 2$, $b = -6$, $c = 1$; ${d(w3d.lines[0])}.`, `**Step 2 —** ${d(w3.lines[0])}.`, `**Answer —** $x = ${e3.exact[1].tex}$ or $x = ${e3.exact[0].tex}$.`], v: pE3, n: 'Here a is two, b is minus six and c is one. The discriminant is thirty six minus eight, which is twenty eight. Twenty eight is four times seven, so its square root is two root seven. Divide every term by two to simplify. The roots are irrational, so no integer factorisation could have found them.' }),
    sl('example', 'Worked example 4: correct to two decimal places', { b: 'Solve $x^2 - 5x - 2 = 0$, giving the roots correct to two decimal places.', ul: [`**Step 1 —** ${d(w4d.lines[0])}; ${d(w4.lines[0])}.`, `**Step 2 —** ${d(w4d.lines[1])}.`, `**Step 3 —** ${d(w4d.lines[2])}; ${d(w4d.lines[3])}.`, `**Answer —** ${d(w4.lines[1])}.`], v: roundTable, n: 'The discriminant is twenty five plus eight, thirty three, which is not a perfect square, so we need decimals. Keep four decimal places for root thirty three. Add and subtract, then divide by two. Only at the very end do we round to two decimal places: five point three seven and minus zero point three seven.' }),
    sl('check', 'Quick check: a, b and c', { b: 'Standard form first.', chk: 'm06', n: 'Move every term to the left side first. Then read a, b and c, with their signs.' }),
    sl('example', 'Worked example 5: significant figures', { b: 'Solve $3x^2 + 4x - 5 = 0$, giving the roots correct to three significant figures.', ul: [`**Step 1 —** ${d(w5d.lines[0])}; ${d(w5.lines[0])}.`, `**Step 2 —** ${d(w5d.lines[1])}; ${d(w5d.lines[2])}; ${d(w5d.lines[3])}.`, `**Answer —** ${d(w5.lines[1])}.`], v: pE5, n: 'The discriminant is sixteen plus sixty, seventy six. Root seventy six is about eight point seven one seven eight. Significant figures start at the first digit that is not zero. So zero point seven eight six three becomes zero point seven eight six, and minus two point one one nine six becomes minus two point one two.' }),
    sl('concept', 'Factorise or use the formula?', { b: 'If $D = b^2 - 4ac$ is a perfect square, the quadratic factorises over the integers. Otherwise use the formula.', v: methodTable, n: 'How do you choose a method? Work out the discriminant. If it is a perfect square, the roots are rational and factorising is usually quickest. If it is not, the roots are irrational, so use the formula. If the question asks for decimal places or significant figures, that is a strong hint to use the formula.' }),
    sl('check', 'Quick check: rounding', { b: 'Keep extra places; round once.', chk: 'n01', n: 'Simplify the root first, use a square root value with four decimal places, and round only at the end.' }),
    sl('summary', 'Summary', { ul: ['Standard form $ax^2 + bx + c = 0$, $a \\ne 0$', 'Factorise: two numbers with product $ac$ and sum $b$', 'Zero-product rule needs $0$ on one side', 'Formula $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$', 'Round only the final answer'], v: sum1, n: 'To sum up part one. Write the equation in standard form. If it factorises, split the middle term and use the zero product rule. Otherwise use the quadratic formula. When decimals are asked for, keep extra places in your working and round only the final answers.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Factorisation (2 marks):** correct factors 1 + both roots 1', '**Formula (3 marks):** $D$ 1 + substitution 1 + roots to the required accuracy 1', '**Mistake:** dividing by $x$ or by a bracket and losing a root', '**Mistake:** wrong sign of $b$ in $-b$, or forgetting that $2a$ divides the whole numerator', '**Mistake:** rounding the square root too early', '**Mistake:** giving four decimal places when two are asked'], n: 'Show every step: the factors, or the values of a, b and c and the discriminant. Never divide both sides by x or by a bracket; you will lose a root. In the formula, minus b changes the sign of b, and two a divides the whole numerator. Round only at the end, and to exactly the accuracy asked.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Quadratic Equations — Part 2: The discriminant and problems that lead to quadratics',
  goals: ['Use the discriminant to decide the nature of the roots', 'Find a parameter for which a quadratic has equal roots', 'Form quadratic equations from problems on numbers, area, speed, time, age and work', 'Reject roots that do not fit the problem'],
  slides: [
    sl('title', 'Quadratic Equations, Part 2', { b: 'Before solving, one number tells you how many real roots to expect.', v: pT2, n: 'Welcome to part two. Here you will meet the discriminant, a single number that tells you how many real roots an equation has before you solve it. Then we use quadratic equations to solve real problems, and learn why one of the two roots sometimes has to be thrown away.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **discriminant** $D = b^2 - 4ac$', 'State the **nature** of the roots without solving', 'Find $k$ for **equal roots**', 'Form and solve equations from **word problems**', '**Reject** roots that do not fit'], n: 'These are your goals for part two. We find the discriminant, use it to describe the roots, and use it backwards to find a missing coefficient. Then we turn stories about numbers, areas, speeds, ages and work into quadratic equations.' }),
    sl('concept', 'The discriminant', { b: 'In the formula, $b^2 - 4ac$ sits under the square root. It is called the **discriminant**, $D$.', v: dTable, n: 'Look at the quadratic formula again. Everything depends on the number under the square root, b squared minus four a c. If it is positive, we get two different real roots. If it is zero, the plus or minus makes no difference, so the two roots are equal. If it is negative, there is no real square root, so there are no real roots.' }),
    sl('diagram', 'The discriminant on a graph', { b: 'Same shape, moved up: two crossings ($D > 0$), one touch ($D = 0$), no meeting ($D < 0$).', v: pThree, n: 'Here are three parabolas of the same shape, one above another. The lowest crosses the x axis twice: positive discriminant, two roots. The middle one just touches the axis: zero discriminant, equal roots. The top one never meets the axis: negative discriminant, no real roots.' }),
    sl('example', 'Worked example 1: nature of the roots', { b: 'Without solving, state the nature of the roots of (i) $3x^2 - 7x + 2 = 0$ (ii) $4x^2 + 20x + 25 = 0$ (iii) $2x^2 - 3x + 4 = 0$.', ul: [`**(i) —** ${d(wn.lines[0])}: positive and a perfect square, so real, distinct and rational.`, `**(ii) —** ${d(wn.lines[1])}: real and equal, each $${n2.exact[0].tex}$.`, `**(iii) —** ${d(wn.lines[2])}: no real roots.`], v: natTable, n: 'For the first equation, the discriminant is forty nine minus twenty four, twenty five. That is positive, and a perfect square, so the roots are real, distinct and rational. For the second, four hundred minus four hundred is zero, so the roots are equal. For the third, nine minus thirty two is negative, so there are no real roots.' }),
    sl('check', 'Quick check: equal, distinct or none?', { b: 'Find $D$ first.', chk: 'm11', n: 'Work out b squared minus four a c carefully, then decide from its sign.' }),
    sl('example', 'Worked example 2: equal roots', { b: '(a) Find $k$ if $3x^2 + kx + 12 = 0$ has equal roots. (b) Find $k$ if $kx^2 - 8x + 2 = 0$ has equal roots.', ul: [`**(a) —** ${d(wkA.lines[0])}, so ${d(wkA.lines[1])} and ${d(wkA.lines[2])}. Roots: $-2$ (for $k = 12$) and $2$ (for $k = -12$).`, `**(b) —** ${d(wkB.lines[1])}, so ${d(wkB.lines[2])}. Then ${d(wkB2.lines[0])}, so ${d(wkB2.lines[1])}.`, '**Note —** $k = 0$ would make (b) linear, so check $a \\ne 0$.'], v: pK, n: 'Equal roots mean the discriminant is zero. In part a, k squared minus one hundred and forty four equals zero, so k is twelve or minus twelve: always give both. In part b, sixty four minus eight k equals zero, so k is eight. Check that k does not make the x squared coefficient zero.' }),
    sl('check', 'Quick check: find p', { b: 'Set $D = 0$.', chk: 'fb2', n: 'Set the discriminant equal to zero and use the condition that p is positive.' }),
    sl('concept', 'Solving word problems', { b: 'Turn the story into an equation, solve it, then let the story decide which roots make sense.', v: wpFlow, n: 'Every word problem follows the same six steps. Say what x stands for, with units. Turn the sentences into an equation. Write it in standard form and solve it. Then go back to the story: a length cannot be negative, and a number of people must be whole. Answer the question that was asked, and check.' }),
    sl('example', 'Worked example 3: numbers', { b: 'Two positive numbers differ by $5$, and the sum of their squares is $157$. Find them.', ul: [`**Step 1 —** Let the smaller be $x$: ${d(wN.lines[0])}.`, `**Step 2 —** ${d(wN.lines[1])}, so ${d(wN.lines[2])}.`, `**Step 3 —** ${d(wN.lines[3])}, so ${d(wN.lines[4])}.`, '**Answer —** the numbers must be positive, so $x = 6$: the numbers are $6$ and $11$.'], v: numTable, n: 'Let the smaller number be x, so the larger is x plus five. The sum of their squares gives two x squared plus ten x minus one hundred and thirty two equals zero. Divide by two and factorise. Both roots satisfy the equation, but minus eleven gives negative numbers, so the answer is six and eleven.' }),
    sl('example', 'Worked example 4: a path inside a lawn', { b: 'An imagined rectangular lawn is $30$ m by $20$ m. A path of uniform width $w$ m runs along all four edges inside it, and the lawn left is $336$ m². Find $w$.', ul: [`**Step 1 —** ${d(wP.lines[0])}.`, `**Step 2 —** ${d(wP.lines[1])}, so ${d(wP.lines[3])}.`, `**Step 3 —** ${d(wP.lines[4])}, so ${d(wP.lines[5])}.`, '**Answer —** $w = 22$ would make the lawn $20 - 44 < 0$ m wide, so the path is $3$ m wide.'], v: figPath, n: 'The path takes w metres from each side, so the lawn left is thirty minus two w by twenty minus two w. Its area is three hundred and thirty six. Expand, simplify and divide by four. The roots are three and twenty two. A width of twenty two is impossible, since it would leave a negative width, so the path is three metres wide.' }),
    sl('check', 'Quick check: which root fits?', { b: 'A breadth must be positive.', chk: 'm16', n: 'Factorise, then ask which root can be the breadth of a real plot.' }),
    sl('example', 'Worked example 5: a boat on a river', { b: 'An imagined motorboat moves at $15$ km/h in still water. It goes $36$ km downstream and returns in $5$ hours in all. Find the speed $s$ km/h of the stream.', ul: [`**Step 1 —** ${d(wB.lines[0])}.`, `**Step 2 —** ${d(wB.lines[1])}, so ${d(wB.lines[2])}.`, `**Step 3 —** ${d(wB.lines[3])}, so ${d(wB.lines[4])}.`, '**Answer —** a speed cannot be negative, so the stream flows at $3$ km/h.'], v: boatTable, n: 'Downstream, the stream adds to the speed of the boat: fifteen plus s. Upstream it slows the boat down: fifteen minus s. Time is distance divided by speed, and the two times add up to five hours. Clearing the fractions gives s squared equals nine. Reject minus three. The table checks the answer: two hours plus three hours.' }),
    sl('concept', 'When to reject a root', { b: 'Both roots satisfy the **equation**. Only the story decides which one answers the **question**.', v: rejectTable, n: 'Always ask whether each root makes sense. Lengths, widths and speeds must be positive. A number of people must be a whole number. An age must make the story possible. Write a short reason when you reject a root: examiners give a mark for it.' }),
    sl('check', 'Quick check: a number problem', { b: 'Form the equation, then remember: natural numbers are positive.', chk: 'n04', n: 'Write the sentence as an equation in the number, solve it, and keep only the natural number.' }),
    sl('summary', 'Summary', { ul: ['$D = b^2 - 4ac$', '$D > 0$: two real, distinct roots; $D = 0$: equal roots; $D < 0$: no real roots', 'Equal roots: put $D = 0$ and solve for $k$ (give every value)', 'Word problems: form, solve, reject, answer with units, check'], v: sum2, n: 'To sum up part two. The discriminant tells you the nature of the roots: positive for two distinct real roots, zero for equal roots, negative for none. Set it equal to zero to find a missing coefficient. In word problems, form the equation, solve it, reject roots that do not fit, and answer with units.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Nature of roots (2 marks):** value of $D$ 1 + conclusion 1', '**Word problem (4 marks):** equation 1 + standard form 1 + roots 1 + rejection and answer 1', '**Mistake:** giving only $k = 12$ when $k = \\pm 12$', '**Mistake:** forgetting units, or leaving a negative length', '**Mistake:** using the wrong time: time equals distance divided by speed', '**Mistake:** not checking that $a \\ne 0$ for the value of $k$ found'], n: 'For nature of roots, always show the value of the discriminant before you state the conclusion. In word problems the first mark is for the equation, so write it clearly. When you reject a root, give a reason. When you find k, give every value, and check that the x squared term does not vanish.' }),
  ],
});

// ---------------------------------------------------------------- notes
const fNotesF = flow('LR', [['a', 'Standard form'], ['b', '$D = b^2 - 4ac$'], ['c', 'Perfect square: factorise'], ['d', 'Not a square: formula'], ['e', 'Round at the end']], [['a', 'b'], ['b', 'c'], ['b', 'd'], ['d', 'e']], 'Flow chart: write the equation in standard form and find the discriminant; if it is a perfect square, factorise; if not, use the formula and round at the end.', 'Choosing a method.');
const notes = {
  unit: 'icse-10-mathematics-ch05', version: 1, title: 'Quadratic Equations in One Variable — chapter notes', language: 'en',
  sections: [
    { heading: '1. Quadratic equations and standard form', body_md: r`A **quadratic equation** in $x$ is an equation that can be written as $ax^2 + bx + c = 0$, where $a$, $b$, $c$ are real numbers and $a \ne 0$.

- Simplify first: expand brackets and bring every term to one side. If the $x^2$ terms cancel, the equation is **not** quadratic.
- Read $a$, $b$, $c$ **with their signs**: $4x^2 = 3 - 7x$ becomes $4x^2 + 7x - 3 = 0$, so $a = 4$, $b = 7$, $c = -3$.
- A **root** makes the left side $0$; a quadratic equation has at most two roots.`, key_terms: [{ term: 'Quadratic equation', definition_md: 'An equation of the form $ax^2 + bx + c = 0$ with $a \\ne 0$.' }, { term: 'Root', definition_md: 'A value of $x$ that satisfies the equation.' }], formulas: [{ latex: 'ax^2 + bx + c = 0,\\ a \\ne 0', label: 'Standard form' }], visual: sfTable, visuals: [tryTable], topic_ids: [topic(1)] },
    { heading: '2. Solving by factorisation', body_md: r`1. Write the equation in standard form.
2. Find two numbers whose **product is $ac$** and whose **sum is $b$**; split $bx$ with them.
3. Group in pairs and take out the common bracket.
4. Put each factor equal to $0$ (the **zero-product rule**) and solve.

*Example:* $3x^2 - 10x - 8 = 0$: $ac = -24$, sum $-10$: $-12$ and $2$. $3x(x - 4) + 2(x - 4) = 0$, so $(3x + 2)(x - 4) = 0$ and $x = 4$ or $x = -\dfrac{2}{3}$.

Never divide both sides by $x$ or by a bracket containing $x$: a root is lost.`, key_terms: [{ term: 'Splitting the middle term', definition_md: 'Writing $bx$ as $px + qx$ with $p + q = b$ and $pq = ac$, so that the expression factorises by grouping.' }, { term: 'Zero-product rule', definition_md: 'If $pq = 0$, then $p = 0$ or $q = 0$.' }], formulas: [{ latex: 'pq = 0 \\Rightarrow p = 0 \\text{ or } q = 0', label: 'Zero-product rule' }], visual: pairTable, visuals: [zpFlow], topic_ids: [topic(2)] },
    { heading: '3. The quadratic formula', body_md: r`For $ax^2 + bx + c = 0$ with $b^2 - 4ac \ge 0$,
$$x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}.$$

- Work out $D = b^2 - 4ac$ first.
- $-b$ changes the sign of $b$; $2a$ divides the **whole** numerator.
- Simplify surds: $\dfrac{6 \pm \sqrt{28}}{4} = \dfrac{6 \pm 2\sqrt{7}}{4} = \dfrac{3 \pm \sqrt{7}}{2}$.`, key_terms: [{ term: 'Quadratic formula', definition_md: 'The roots of $ax^2 + bx + c = 0$ are $\\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ when $b^2 - 4ac \\ge 0$.' }, { term: 'Surd form', definition_md: 'An exact answer that keeps the square root, such as $3 \\pm \\sqrt{5}$.' }], formulas: [{ latex: 'x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', label: 'Quadratic formula' }], visual: formulaFlow, visuals: [pE3], topic_ids: [topic(3)] },
    { heading: '4. Decimal places and significant figures', body_md: r`ICSE questions often ask for roots "correct to two decimal places" or "to three significant figures".

- Keep at least four decimal places for the square root (e.g. $\sqrt{33} \approx 5.7446$) and **round only the final answer**.
- **Decimal places** count digits after the point: $5.3723 \to 5.37$.
- **Significant figures** count from the first non-zero digit: $0.7863 \to 0.786$ and $-2.1196 \to -2.12$ (3 s.f.).
- Rounding $\sqrt{29}$ too early ($5.39$) can change the answer: $\dfrac{3 + 5.39}{2} = 4.195$, but the true root $4.1926\ldots$ is $4.19$.`, key_terms: [{ term: 'Decimal places', definition_md: 'The number of digits after the decimal point.' }, { term: 'Significant figures', definition_md: 'Digits counted from the first non-zero digit.' }], formulas: [], visual: roundTable, visuals: [pE5], topic_ids: [topic(3)] },
    { heading: '5. The discriminant and the nature of roots', body_md: r`The **discriminant** of $ax^2 + bx + c = 0$ is $D = b^2 - 4ac$.

- $D > 0$: two real, distinct roots (rational if $D$ is a perfect square, irrational otherwise).
- $D = 0$: two real, equal roots, each $-\dfrac{b}{2a}$; the graph touches the $x$-axis.
- $D < 0$: no real roots; the graph does not meet the $x$-axis.

*Example:* $2x^2 - 3x + 4 = 0$: $D = 9 - 32 = -23 < 0$, so no real roots.`, key_terms: [{ term: 'Discriminant', definition_md: 'The number $b^2 - 4ac$, which decides the nature of the roots.' }, { term: 'Real and equal roots', definition_md: 'The case $D = 0$: both roots equal $-\\dfrac{b}{2a}$.' }], formulas: [{ latex: 'D = b^2 - 4ac', label: 'Discriminant' }], visual: pThree, visuals: [dTable, natTable], topic_ids: [topic(1)] },
    { heading: '6. Finding a coefficient for equal (or real) roots', body_md: r`- **Equal roots:** put $D = 0$ and solve for the unknown coefficient. Give **every** value: $3x^2 + kx + 12 = 0$ gives $k^2 = 144$, so $k = \pm 12$.
- Check that the value does not make $a = 0$ (the equation would be linear).
- **Real roots:** $D \ge 0$; **no real roots:** $D < 0$. For $x^2 + px + 9 = 0$, no real roots when $-6 < p < 6$.`, key_terms: [{ term: 'Condition for equal roots', definition_md: '$b^2 - 4ac = 0$.' }, { term: 'Condition for real roots', definition_md: '$b^2 - 4ac \\ge 0$.' }], formulas: [{ latex: 'b^2 - 4ac = 0', label: 'Equal roots' }, { latex: 'b^2 - 4ac \\ge 0', label: 'Real roots' }], visual: pK, visuals: [methodTable], topic_ids: [topic(1)] },
    { heading: '7. Word problems', body_md: r`1. Let $x$ be the unknown and state its units.
2. Form the equation: area = length × breadth; time = distance ÷ speed; work done in one hour = $\dfrac{1}{\text{time alone}}$.
3. Write it in standard form and solve.
4. **Reject** roots that do not fit (negative lengths, speeds or times; fractional numbers of people; impossible ages) and say why.
5. Answer the question with units, and check in the story.

*Example:* a $30$ m by $20$ m lawn with an inside path of width $w$ leaves $336$ m²: $(30 - 2w)(20 - 2w) = 336$ gives $w = 3$ or $22$; $22$ is rejected.`, key_terms: [{ term: 'Rejecting a root', definition_md: 'Discarding a root of the equation that does not make sense in the problem, with a reason.' }], formulas: [{ latex: '\\text{time} = \\dfrac{\\text{distance}}{\\text{speed}}', label: 'Speed problems' }], visual: wpFlow, visuals: [figPath, rejectTable, fNotesF], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Solve by factorisation (2 marks):* correct factors 1; both roots 1.
- *Solve by formula, to 2 d.p. or 3 s.f. (3 marks):* $D$ 1; correct substitution 1; both roots to the required accuracy 1.
- *Nature of roots or value of $k$ (2–3 marks):* $D$ in terms of $k$ 1; solving for $k$ 1; roots or conclusion 1.
- *Word problem (4 marks):* equation 1; standard form 1; roots 1; rejection with a reason and the answer with units 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Dividing both sides by $x$ (or by a bracket) and losing a root.
2. Using the zero-product rule when the right side is not $0$.
3. Taking $b$ with the wrong sign, or dividing only $\sqrt{D}$ by $2a$.
4. Rounding the square root too early, or giving the wrong number of decimal places.
5. Giving only one value of $k$ when $k^2 = \ldots$ gives two.
6. Keeping a negative length, speed, time or age; forgetting units.`,
  status: 'draft', provenance: d1.provenance,
};
S(ARITH, [r`\dfrac{3 + 5.39}{2} = 4.195`], 'notes early rounding');
must(dp(Qd(1, -3, -5).roots[1], 4) === '4.1926', 'notes 4.1926');
must(sf(0.7863, 3) === '0.786' && sf(-2.1196, 3) === '-2.12' && dp(5.3723, 2) === '5.37', 'notes rounding examples');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch05', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is the **standard form** of a quadratic equation?', '$ax^2 + bx + c = 0$, where $a \\ne 0$.', 'definition', 1),
    fc('f02', 'What is a **root** of an equation?', 'A value of the unknown that makes the equation true.', 'definition', 1),
    fc('f03', 'At most how many roots does a quadratic equation have?', 'Two.', 'fact', 1),
    fc('f04', 'Is $(x + 2)^2 = x^2 + 9$ quadratic?', 'No: it simplifies to $4x - 5 = 0$, which is linear.', 'example', 1),
    fc('f05', 'Read $a$, $b$, $c$ from $4x^2 = 3 - 7x$.', 'Standard form $4x^2 + 7x - 3 = 0$: $a = 4$, $b = 7$, $c = -3$.', 'example', 3),
    fc('f06', 'State the **zero-product rule**.', 'If $pq = 0$, then $p = 0$ or $q = 0$.', 'concept', 2),
    fc('f07', 'Splitting the middle term of $ax^2 + bx + c$: what two numbers do you need?', 'Two numbers with product $ac$ and sum $b$.', 'concept', 2),
    fc('f08', 'Factorise $3x^2 - 10x - 8$.', '$(3x + 2)(x - 4)$, using $-12$ and $2$.', 'example', 2),
    fc('f09', 'Why must you not divide $x^2 = 7x$ by $x$?', 'You lose the root $x = 0$. Write $x(x - 7) = 0$ instead.', 'exam-tip', 2),
    fc('f10', 'Can you use the zero-product rule on $(x - 5)(x + 1) = 7$ directly?', 'No: the right side must be $0$ first.', 'exam-tip', 2),
    fc('f11', 'State the **quadratic formula**.', '$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$', 'formula', 3),
    fc('f12', 'Solve $x^2 - 6x + 4 = 0$ in surd form.', '$x = 3 \\pm \\sqrt{5}$', 'example', 3),
    fc('f13', 'Simplify $\\dfrac{6 \\pm \\sqrt{28}}{4}$.', '$\\dfrac{3 \\pm \\sqrt{7}}{2}$, since $\\sqrt{28} = 2\\sqrt{7}$.', 'example', 3),
    fc('f14', 'When should you round in a formula question?', 'Only the final answer; keep at least four decimal places in the working.', 'exam-tip', 3),
    fc('f15', 'Round $-2.1196$ to three significant figures.', '$-2.12$', 'example', 3),
    fc('f16', 'Round $0.7863$ to three significant figures.', '$0.786$ (the leading $0$ is not significant).', 'example', 3),
    fc('f17', 'What is the **discriminant**?', '$D = b^2 - 4ac$, the number under the square root in the formula.', 'definition', 1),
    fc('f18', '$D > 0$ means…', 'two real, distinct roots.', 'fact', 1),
    fc('f19', '$D = 0$ means…', 'two real, equal roots, each $-\\dfrac{b}{2a}$.', 'fact', 1),
    fc('f20', '$D < 0$ means…', 'no real roots.', 'fact', 1),
    fc('f21', 'When are the roots rational?', 'When $D$ is a perfect square (with integer coefficients).', 'concept', 1),
    fc('f22', 'Graph of a quadratic with $D = 0$?', 'The parabola just touches the $x$-axis at one point.', 'diagram', 1),
    fc('f23', 'Graph of a quadratic with $D < 0$?', 'The parabola does not meet the $x$-axis.', 'diagram', 1),
    fc('f24', 'Find $k$: $3x^2 + kx + 12 = 0$ has equal roots.', '$k^2 = 144$, so $k = \\pm 12$.', 'example', 1),
    fc('f25', 'After finding $k$ for equal roots, what must you check?', 'That $k$ does not make the coefficient of $x^2$ zero.', 'exam-tip', 1),
    fc('f26', 'First step in a word problem?', 'Say what $x$ stands for, with units.', 'concept', 4),
    fc('f27', 'Time for a journey of $d$ km at $v$ km/h?', '$\\dfrac{d}{v}$ hours.', 'formula', 4),
    fc('f28', 'Speed of a boat downstream and upstream?', 'Boat speed plus stream speed; boat speed minus stream speed.', 'concept', 4),
    fc('f29', 'When do you reject a root in a word problem?', 'When it gives a negative length, speed, time or age, a fractional count, or an impossible story; give the reason.', 'exam-tip', 4),
    fc('f30', 'Path of width $w$ inside a $30$ m by $20$ m lawn: lawn left?', '$(30 - 2w)$ m by $(20 - 2w)$ m.', 'diagram', 4),
  ],
  status: 'draft', provenance: d1.provenance,
};
must(Qd(1, -6, 4).pmTex === r`3 \pm \sqrt{5}` && Qd(2, -6, 1).pmTex === r`\dfrac{3 \pm \sqrt{7}}{2}` && sf(-2.1196, 3) === '-2.12' && sf(0.7863, 3) === '0.786', 'flashcard values');
must(degreeOf2(r`(x + 2)^2 = x^2 + 9`) === 1, 'f04');
function degreeOf2(eq) { const [L, R] = eq.split('=').map((s) => f(texToExpr(s))); const g = (x) => L(x) - R(x); return coeffsOf(g)[0] !== 0 ? 2 : coeffsOf(g)[1] !== 0 ? 1 : 0; }

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch05', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t04 only (standard form and the discriminant b² − 4ac with the nature of roots and parameters for equal roots; solving by factorisation; solving by the quadratic formula with roots in surd form, to stated decimal places or significant figures; word problems on numbers, area, speed and time, age and work with rejection of roots that do not fit); the chapter lists no removed topics.', roots: 'every root is computed by quad.mjs: rational roots as reduced fractions and irrational roots as (p ± q√s)/r, each substituted back into ax² + bx + c with integer arithmetic (rational and √s parts both zero) and cross-checked in floating point; roundings to decimal places / significant figures refuse values within 1e-7 of a rounding boundary', working_lines: 'every equation typed in a worked example, note or model answer is parsed from its TeX and must be a non-zero multiple of the verified quadratic (sampled at six points), give a verified root (linear lines, ± lines and "or" alternatives, which must cover every root), vanish at every verified root (lines with x in a denominator), or be true arithmetic with correct roundings (lines without the unknown); word-problem answers are also substituted into the story' } },
};
const tests = chapterTests('Quadratic Equations in One Variable', {
  A: ['m03', 'm10', 'm15', 'ar1', 's301', 's304'],
  B: ['l01', 'l02'],
}, {
  A: ['m05', 'm07', 'm08', 'm12', 'm13', 'm17', 'ar4', 'ar5', 's402', 's403', 's404'],
  B: ['l03', 'l04', 'l05'],
});
build({ dir: DIR, release, testsSpec: tests });

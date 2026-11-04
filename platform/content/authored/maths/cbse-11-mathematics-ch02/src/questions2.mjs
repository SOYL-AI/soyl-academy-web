// CBSE 11 Mathematics ch02 Relations and Functions — written items (short 2 and 3 marks, long 5 marks, case-based)
// with re-solve checks. Sets and relations inside model answers are built from the computed data.
import { Q, caseQ, child, mk, plot } from './lib.mjs';
import { prod, relFrom, domOf, rngOf, isFunctionFrom, sameSet, allRelations, allFunctions, range, near, fl, sgn, arrowDiagram, plotF } from './rel.mjs';
import { r, xsq } from './questions.mjs';

const setTex = (xs) => `$\\{${xs.join(', ')}\\}$`;
const prTex = (P) => `$\\{${P.map(([a, b]) => `(${a}, ${b})`).join(', ')}\\}$`;
const countSurj = (A, B) => allFunctions(A, B).filter((f) => B.every((b) => f.some(([, y]) => String(y) === String(b)))).length;

// =============================================================== short answer, 2 marks
{
  let a = null, b = null;
  for (const u of range(-30, 30)) for (const v of range(-30, 30)) if (2 * u - 5 === u + 1 && v + 3 === 2 * v - 4) { a = u; b = v; }
  Q('s201', mk.short({ marks: 2, stem: r`Find the integers $a$ and $b$ for which the ordered pairs $(2a - 5,\ b + 3)$ and $(a + 1,\ 2b - 4)$ are equal.`, model: r`Equal ordered pairs have equal first entries and equal second entries.\n\nFirst entries: $2a - 5 = a + 1$, so $a = 6$.\n\nSecond entries: $b + 3 = 2b - 4$, so $b = 7$.\n\nCheck: both pairs become $(7, 10)$.`, sol: 'Compare entries position by position.', scheme: [['a = 6 from the first entries', 1], ['b = 7 from the second entries', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(a === 6 && b === 7 && 2 * a - 5 === 7 && b + 3 === 10 && a + 1 === 7 && 2 * b - 4 === 10, 'a = 6, b = 7, both pairs (7, 10)'); C.model([6, 7, 10]); });
}
{
  const A = [0, 1], B = [1, 2, 3];
  const AB = prod(A, B), BA = prod(B, A);
  const common = AB.filter(([x, y]) => BA.some(([u, v]) => u === x && v === y));
  Q('s202', mk.short({ marks: 2, stem: r`For $A = \{0, 1\}$ and $B = \{1, 2, 3\}$, list the elements of $A \times B$ and of $B \times A$, and show that the two sets are not equal.`, model: `$A \\times B = ${prTex(AB).slice(1, -1)}$ and $B \\times A = ${prTex(BA).slice(1, -1)}$.\n\nThey are not equal: $(0, 1) \\in A \\times B$, but $(0, 1) \\notin B \\times A$ because its first entry $0$ is not in $B$. Only $(1, 1)$ is common to both.`, sol: 'List each product, then compare one pair.', scheme: [['Both products listed correctly', 1], ['Inequality shown with one pair', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(AB.length === 6 && BA.length === 6 && !sameSet(AB, BA), 'six each, not equal'); C.assert(common.length === 1 && common[0].join() === '1,1', 'only (1, 1) in common'); C.model(['(0, 1)', '(1, 1)', '(3, 1)']); });
}
{
  const A = [2, 3, 4], B = [6, 8, 9];
  const R = relFrom(A, B, (x, y) => y % x === 0);
  const fig = arrowDiagram(A, B, R, { A: 'A', B: 'B', alt: 'Arrow diagram of a relation R from A equal to 2, 3, 4 to B equal to 6, 8, 9: 2 points to 6 and 8, 3 points to 6 and 9, 4 points to 8.', caption: r`A relation $R$ from $A$ to $B$.` });
  Q('s203', mk.short({ marks: 2, stem: r`The arrow diagram shows a relation $R$ from $A = \{2, 3, 4\}$ to $B = \{6, 8, 9\}$ (an arrow from $x$ to $y$ means $x\,R\,y$). Write $R$ as a set of ordered pairs, and write its domain and range.`, assets: [fig], model: `$R = ${prTex(R).slice(1, -1)}$.\n\nDomain (first entries) $= ${setTex(domOf(R)).slice(1, -1)}$; range (second entries) $= ${setTex(rngOf(R)).slice(1, -1)}$.`, sol: 'Read each arrow as a pair.', scheme: [['All five pairs', 1], ['Domain and range', 1]], d: 1, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert(R.length === 5 && sameSet(domOf(R), A) && sameSet(rngOf(R), B), 'five pairs; domain A; range B'); C.model(['(2, 6)', '(3, 9)', '(4, 8)']); });
}
Q('s204', mk.short({ marks: 2, stem: r`Show with a counterexample that the relation $R = \{(x, y) : x, y \in \mathbb{R},\ x^2 + y^2 = 25\}$ is not a function from $\mathbb{R}$ to $\mathbb{R}$.`, model: r`Take $x = 3$. Then $y^2 = 25 - 9 = 16$, so $y = 4$ or $y = -4$.\n\nBoth $(3, 4)$ and $(3, -4)$ belong to $R$, so the input $3$ has two different outputs. A function allows only one, so $R$ is not a function.`, sol: 'One input with two outputs is enough.', scheme: [['Two pairs with the same first entry found', 1], ['Conclusion linked to the definition', 1]], d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { C.assert(3 * 3 + 4 * 4 === 25 && 3 * 3 + (-4) * (-4) === 25, 'both pairs on the circle'); C.model([4, 16, 25]); });
{
  const g = (x) => Math.sqrt(x - 3) + 1;
  const attain = [1, 1.5, 2, 5, 12.25].every((y) => near(g((y - 1) ** 2 + 3), y));
  Q('s205', mk.short({ marks: 2, stem: r`State the set of inputs for which $f(x) = \sqrt{x - 3} + 1$ is defined, and the set of values it takes.`, model: r`Domain: the square root needs $x - 3 \ge 0$, so $x \ge 3$: the domain is $[3, \infty)$.\n\nRange: $\sqrt{x - 3} \ge 0$, so $f(x) \ge 1$, and every $y \ge 1$ is reached by $x = (y - 1)^2 + 3$. The range is $[1, \infty)$.`, sol: 'Non-negative square root first; then shift.', scheme: [['Domain [3, ∞)', 1], ['Range [1, ∞)', 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => { C.assert(xsq.filter((x) => Number.isFinite(g(x))).every((x) => x >= 3) && xsq.filter((x) => x >= 3).every((x) => Number.isFinite(g(x))), 'domain [3, inf)'); C.assert(attain && xsq.filter((x) => x >= 3).every((x) => g(x) >= 1), 'range [1, inf)'); C.model([3, 1]); });
}
{
  const f = (x) => fl(x) + sgn(x);
  Q('s206', mk.short({ marks: 2, stem: r`The real function $f$ is defined by $f(x) = [x] + \operatorname{sgn}(x)$, where $[x]$ is the greatest integer not exceeding $x$. Find $f(-1.5)$, $f(0)$ and $f(2.5)$.`, model: `$f(-1.5) = [-1.5] + \\operatorname{sgn}(-1.5) = -2 + (-1) = ${f(-1.5)}$.\n\n$f(0) = [0] + \\operatorname{sgn}(0) = 0 + 0 = ${f(0)}$.\n\n$f(2.5) = [2.5] + \\operatorname{sgn}(2.5) = 2 + 1 = ${f(2.5)}$.`, sol: 'Evaluate each part separately.', scheme: [['f(−1.5) = −3', 1], ['f(0) = 0 and f(2.5) = 3', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => { C.assert(f(-1.5) === -3 && f(0) === 0 && f(2.5) === 3, 'values -3, 0, 3'); C.model([3, 0, 2]); });
}
{
  const f = (x) => (x * x - 4) / (x - 2), g = (x) => x + 2;
  Q('s207', mk.short({ marks: 2, stem: r`Are the real functions $f(x) = \dfrac{x^2 - 4}{x - 2}$ and $g(x) = x + 2$ equal? Give a reason.`, model: r`No. For $x \ne 2$, $\dfrac{x^2 - 4}{x - 2} = \dfrac{(x - 2)(x + 2)}{x - 2} = x + 2$, so the rules agree there.\n\nBut $2$ is not in the domain of $f$ (the denominator is $0$) while it is in the domain of $g$, where $g(2) = 4$. Functions are equal only when their domains and rules both match, so $f \ne g$.`, sol: 'Compare domains first.', scheme: [['Rules agree when x ≠ 2', 1], ['Domains differ, so not equal', 1]], d: 3, c: 'analysis', t: [3], time: 90 }), (C) => { C.assert(!Number.isFinite(f(2)) && g(2) === 4 && xsq.filter((x) => x !== 2).every((x) => near(f(x), g(x))), 'agree off 2, undefined at 2'); C.model([4]); });
}
{
  const f = (x) => x * x + 1, g = (x) => 2 * x - 3;
  Q('s208', mk.short({ marks: 2, stem: r`$f(x) = x^2 + 1$ and $g(x) = 2x - 3$ are real functions. Find $(f + g)(x)$ and $(f - g)(x)$ as expressions in $x$, and evaluate $(f + g)(2)$.`, model: r`$(f + g)(x) = (x^2 + 1) + (2x - 3) = x^2 + 2x - 2$.\n\n$(f - g)(x) = (x^2 + 1) - (2x - 3) = x^2 - 2x + 4$.\n\n$(f + g)(2) = 4 + 4 - 2 = 6$.`, sol: 'Combine like terms; mind the signs when subtracting.', scheme: [['Sum and difference expressions', 1], ['(f + g)(2) = 6', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => { C.assert(xsq.every((x) => near(f(x) + g(x), x * x + 2 * x - 2) && near(f(x) - g(x), x * x - 2 * x + 4)), 'expressions'); C.assert(f(2) + g(2) === 6, '(f+g)(2) = 6'); C.model([6, 2, 4]); });
}
{
  const A = [-1, 0, 1];
  const P = relFrom(A, A, (x, y) => x * x + y * y === 1);
  Q('s209', mk.short({ marks: 2, stem: r`$A = \{-1, 0, 1\}$. List every ordered pair $(x, y)$ in $A \times A$ with $x^2 + y^2 = 1$.`, model: `$A \\times A$ has $9$ pairs. Testing each, $x^2 + y^2 = 1$ needs one square equal to $1$ and the other equal to $0$.\n\nThe pairs are ${prTex(P)}: ${P.length} pairs.`, sol: 'One coordinate must be zero, the other plus or minus one.', scheme: [['All nine pairs considered', 1], ['The four pairs listed', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.assert(P.length === 4 && JSON.stringify(P) === '[[-1,0],[0,-1],[0,1],[1,0]]', JSON.stringify(P)); C.model([9, 4]); });
}

// =============================================================== short answer, 3 marks
{
  const A = range(1, 5), B = range(3, 8);
  const R = relFrom(A, B, (x, y) => y === x + 3);
  Q('s301', mk.short({ marks: 3, stem: r`A relation $R$ from $A = \{1, 2, 3, 4, 5\}$ to $B = \{3, 4, 5, 6, 7, 8\}$ is defined by $y = x + 3$. Write $R$ in roster form, give its domain, codomain and range, and say whether $R$ is a function from $A$ to $B$.`, model: `**Roster form:** $R = ${prTex(R).slice(1, -1)}$.\n\n**Domain** $= ${setTex(domOf(R)).slice(1, -1)}$, **codomain** $= ${setTex(B).slice(1, -1)}$, **range** $= ${setTex(rngOf(R)).slice(1, -1)}$ (the value $3$ of the codomain is never used).\n\n**Function:** yes. Every element of $A$ appears as a first entry exactly once, so each has exactly one image.`, sol: 'Check that each element of A is used once.', scheme: [['Roster form', 1], ['Domain, codomain, range', 1], ['Function with reason', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (C) => { C.assert(R.length === 5 && isFunctionFrom(A, R) && sameSet(rngOf(R), [4, 5, 6, 7, 8]) && !sameSet(rngOf(R), B), 'function, range misses 3'); C.model(['(1, 4)', '(5, 8)', 5]); });
}
{
  const g = (x) => (2 * x - 1) / (x + 3);
  const ys = [-7, -1, 0, 1, 3, 2.5, 10];
  Q('s302', mk.short({ marks: 3, stem: r`For the rational expression $f(x) = \dfrac{2x - 1}{x + 3}$, determine which real inputs are allowed and which real outputs can occur.`, model: r`**Domain:** the denominator $x + 3$ must not be $0$, so the domain is $\mathbb{R} - \{-3\}$.\n\n**Range:** put $y = \dfrac{2x - 1}{x + 3}$ and solve for $x$: $y(x + 3) = 2x - 1$, so $x(y - 2) = -1 - 3y$ and $x = \dfrac{-1 - 3y}{y - 2}$. This is possible exactly when $y \ne 2$.\n\nThe value $y = 2$ is not reached, because $2(x + 3) = 2x - 1$ would give $6 \ne -1$. The range is $\mathbb{R} - \{2\}$.`, sol: 'Solve y = f(x) for x and see which y make it impossible.', scheme: [['Domain R − {−3}', 1], ['x written in terms of y', 1], ['Range R − {2} with y = 2 excluded', 1]], d: 4, c: 'analysis', t: [3], time: 180 }), (C) => { C.assert(!Number.isFinite(g(-3)) && xsq.filter((x) => x !== -3).every((x) => Number.isFinite(g(x)) && Math.abs(g(x) - 2) > 1e-9), 'domain and 2 never reached'); C.assert(ys.every((y) => near(g((-1 - 3 * y) / (y - 2)), y)), 'pre-image x = (-1 - 3y)/(y - 2)'); C.model(['-3', 2, 6]); });
}
{
  const g = (x) => Math.abs(x - 1) + Math.abs(x + 1);
  const pw = (x) => (x < -1 ? -2 * x : x <= 1 ? 2 : 2 * x);
  Q('s303', mk.short({ marks: 3, stem: r`Write $f(x) = |x - 1| + |x + 1|$ without modulus signs on the three intervals $x < -1$, $-1 \le x \le 1$ and $x > 1$, and hence find the range of $f$.`, model: r`**$x < -1$:** both $x - 1$ and $x + 1$ are negative, so $f(x) = -(x - 1) - (x + 1) = -2x$.\n\n**$-1 \le x \le 1$:** $x - 1 \le 0$ and $x + 1 \ge 0$, so $f(x) = (1 - x) + (x + 1) = 2$.\n\n**$x > 1$:** both are positive, so $f(x) = (x - 1) + (x + 1) = 2x$.\n\nOn the left $-2x > 2$, on the right $2x > 2$ and in the middle $f = 2$. The range is $[2, \infty)$.`, sol: 'Split at the points where each modulus expression changes sign.', scheme: [['x < −1 piece', 1], ['Middle and right pieces', 1], ['Range [2, ∞)', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.assert(xsq.every((x) => near(g(x), pw(x))), 'piecewise form'); C.assert(Math.min(...xsq.map(g)) === 2 && g(100) === 200 && g(-100) === 200, 'range [2, inf)'); C.model([2]); });
}
{
  const f = (x) => x * x - 4 * x + 7;
  Q('s304', mk.short({ marks: 3, stem: r`For the real function $f(x) = x^2 - 4x + 7$, complete the square to find its range, and find all $x$ with $f(x) = 7$.`, model: r`$f(x) = x^2 - 4x + 4 + 3 = (x - 2)^2 + 3$.\n\nSince $(x - 2)^2 \ge 0$, $f(x) \ge 3$, with $3$ reached at $x = 2$, and every $y \ge 3$ is reached by $x = 2 + \sqrt{y - 3}$. The range is $[3, \infty)$.\n\n$f(x) = 7$: $(x - 2)^2 = 4$, so $x - 2 = \pm 2$ and $x = 4$ or $x = 0$.`, sol: 'The vertex form shows the least value and the symmetry about x = 2.', scheme: [['Completed square', 1], ['Range [3, ∞)', 1], ['x = 0 and x = 4', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.assert(xsq.every((x) => near(f(x), (x - 2) ** 2 + 3) && f(x) >= 3) && f(2) === 3, 'vertex form'); C.assert([3, 4, 7, 20].every((y) => near(f(2 + Math.sqrt(y - 3)), y)), 'attains every y >= 3'); C.assert(xsq.filter((x) => f(x) === 7).join() === '0,4', 'f(x) = 7 at 0 and 4'); C.model([3, 4, 0, 7]); });
}
{
  const f = (x) => Math.sqrt(x + 2), g = (x) => Math.sqrt(4 - x);
  const fin = (h) => xsq.filter((x) => Number.isFinite(h(x)));
  const interval = (lo, hi, loIn, hiIn) => (x) => (loIn ? x >= lo : x > lo) && (hiIn ? x <= hi : x < hi);
  const same = (xs, p) => xsq.every((x) => xs.includes(x) === p(x));
  Q('s305', mk.short({ marks: 3, stem: r`For $f(x) = \sqrt{x + 2}$ and $g(x) = \sqrt{4 - x}$, find the domains of $f$, $g$, $f + g$ and $\dfrac{f}{g}$.`, model: r`$f$ needs $x + 2 \ge 0$: domain $[-2, \infty)$.\n\n$g$ needs $4 - x \ge 0$: domain $(-\infty, 4]$.\n\n$f + g$ is defined where both are, that is on the common part $[-2, 4]$.\n\n$\dfrac{f}{g}$ also needs $g(x) \ne 0$, and $g(4) = 0$. So its domain is $[-2, 4)$.`, sol: 'Intersect the domains, then remove the zeros of the divisor.', scheme: [['Domains of f and g', 1], ['Domain of f + g', 1], ['Domain of f/g without x = 4', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { C.assert(same(fin(f), interval(-2, Infinity, true, true)) && same(fin(g), interval(-Infinity, 4, true, true)), 'domains of f and g'); C.assert(same(fin((x) => f(x) + g(x)), interval(-2, 4, true, true)), 'domain of f + g'); C.assert(same(fin((x) => f(x) / g(x)), interval(-2, 4, true, false)), 'domain of f/g'); C.model([-2, 4]); });
}
{
  const f = (x) => 2 * x + 3, g = (x) => x * x;
  Q('s306', mk.short({ marks: 3, stem: r`For $f(x) = 2x + 3$ and $g(x) = x^2$, find the composite functions $g \circ f$ and $f \circ g$, and show that they are different by evaluating both at $x = 1$.`, model: r`$(g \circ f)(x) = g(f(x)) = (2x + 3)^2$.\n\n$(f \circ g)(x) = f(g(x)) = 2x^2 + 3$.\n\nAt $x = 1$: $(g \circ f)(1) = 5^2 = 25$ but $(f \circ g)(1) = 2 + 3 = 5$. The values differ, so the two composites are different functions.`, sol: 'Substitute the inner function into the outer one.', scheme: [['g ∘ f expression', 1], ['f ∘ g expression', 1], ['Values 25 and 5 compared', 1]], d: 3, c: 'understanding', t: [5], time: 150 }), (C) => { C.assert(xsq.every((x) => near(g(f(x)), (2 * x + 3) ** 2) && near(f(g(x)), 2 * x * x + 3)), 'composite rules'); C.assert(g(f(1)) === 25 && f(g(1)) === 5, '25 and 5'); C.model([25, 5]); });
}
{
  const fee = (t) => 10 * fl(t);
  const ts = xsq.filter((t) => t >= 0 && t < 5);
  Q('s307', mk.short({ marks: 3, stem: r`A car park (imaginary) charges ₹10 for every **completed** hour, so the fee for a stay of $t$ hours, $0 \le t < 5$, is $f(t) = 10[t]$ rupees. Find the fee for stays of $0.5$, $2.9$ and $3$ hours, and write the range of $f$.`, model: `$f(0.5) = 10[0.5] = 10 \\times 0 = ${fee(0.5)}$, $f(2.9) = 10[2.9] = 10 \\times 2 = ${fee(2.9)}$ and $f(3) = 10 \\times 3 = ${fee(3)}$ rupees.\n\nAs $[t]$ takes the values $0, 1, 2, 3, 4$ on $[0, 5)$, the fee takes only ${setTex([...new Set(ts.map(fee))])} rupees. That is the range.`, sol: 'The fee jumps at each whole hour.', scheme: [['f(0.5) = 0 and f(2.9) = 20', 1], ['f(3) = 30', 1], ['Range {0, 10, 20, 30, 40}', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.assert(fee(0.5) === 0 && fee(2.9) === 20 && fee(3) === 30, 'fees 0, 20, 30'); C.assert(sameSet([...new Set(ts.map(fee))], [0, 10, 20, 30, 40]), 'range {0, 10, 20, 30, 40}'); C.model([20, 30, 40]); });
}
Q('s308', mk.short({ marks: 3, stem: r`Show that $x \cdot \operatorname{sgn}(x) = |x|$ for every real number $x$, by considering the three cases $x > 0$, $x = 0$ and $x < 0$.`, model: r`**$x > 0$:** $\operatorname{sgn}(x) = 1$, so $x \cdot \operatorname{sgn}(x) = x = |x|$.\n\n**$x = 0$:** $\operatorname{sgn}(0) = 0$, so $x \cdot \operatorname{sgn}(x) = 0 = |0|$.\n\n**$x < 0$:** $\operatorname{sgn}(x) = -1$, so $x \cdot \operatorname{sgn}(x) = -x$, which equals $|x|$ because $x$ is negative.\n\nAll three cases agree, so the identity holds for every real $x$.`, sol: 'Use the definition of both functions on each interval.', scheme: [['x > 0', 1], ['x = 0', 1], ['x < 0 and conclusion', 1]], d: 3, c: 'analysis', t: [3], time: 150 }), (C) => { C.assert(xsq.every((x) => x * sgn(x) === Math.abs(x)), 'x sgn x = |x| on the grid'); C.model(['-x', 0]); });

// =============================================================== long answer, 5 marks
{
  const A = [1, 2, 3], B = [2, 4, 6, 8];
  const P = prod(A, B), R = relFrom(A, B, (x, y) => y === 2 * x), above = relFrom(A, B, (x, y) => y > x);
  Q('l01', mk.long({ stem: r`Let $A = \{1, 2, 3\}$ and $B = \{2, 4, 6, 8\}$.\n\n(a) Find $n(A \times B)$.\n\n(b) The relation $R$ from $A$ to $B$ is $\{(x, y) : y = 2x\}$. Write $R$ in roster form, and give its domain and range.\n\n(c) How many pairs $(x, y)$ of $A \times B$ have $y > x$?\n\n(d) Is $R$ a function from $A$ to $B$? Give a reason.`, model: `**(a)** $n(A \\times B) = 3 \\times 4 = ${P.length}$.\n\n**(b)** Taking each $x$ and checking whether $2x \\in B$: $R = ${prTex(R).slice(1, -1)}$. Domain $= ${setTex(domOf(R)).slice(1, -1)}$, range $= ${setTex(rngOf(R)).slice(1, -1)}$.\n\n**(c)** For $x = 1$ all $4$ values of $y$ exceed $1$; for $x = 2$ the values $4, 6, 8$ ($3$ of them) exceed $2$; for $x = 3$ the values $4, 6, 8$ ($3$ of them) exceed $3$. Total $4 + 3 + 3 = ${above.length}$.\n\n**(d)** Yes: each of $1, 2, 3$ appears as a first entry exactly once, so each has exactly one image. (The element $8$ of $B$ is simply unused.)`, sol: 'Count by rows of the product table.', scheme: [['(a) 12', 1], ['(b) roster, domain and range', 1.5], ['(c) 10 with working', 1.5], ['(d) function with reason', 1]], d: 3, c: 'application', t: [1, 2], time: 360 }), (C) => { C.assert(P.length === 12 && R.length === 3 && sameSet(domOf(R), A) && sameSet(rngOf(R), [2, 4, 6]) && above.length === 10 && isFunctionFrom(A, R), 'counts'); C.assert(A.map((x) => B.filter((y) => y > x).length).join() === '4,3,3', 'row counts 4, 3, 3'); C.model([12, 10, '(3, 6)']); });
}
{
  const f = (x) => Math.sqrt(16 - x * x), g = (x) => 1 / (x * x + 1), h = (x) => 5 - Math.abs(x - 2);
  const inD = (fn) => xsq.filter((x) => Number.isFinite(fn(x)));
  Q('l02', mk.long({ stem: r`Find the domain and the range of each real function.\n\n(a) $f(x) = \sqrt{16 - x^2}$\n\n(b) $g(x) = \dfrac{1}{x^2 + 1}$\n\n(c) $h(x) = 5 - |x - 2|$`, model: r`**(a)** Need $16 - x^2 \ge 0$, i.e. $x^2 \le 16$: domain $[-4, 4]$. On it $0 \le 16 - x^2 \le 16$, so $0 \le f(x) \le 4$, and every $y \in [0, 4]$ occurs at $x = \sqrt{16 - y^2}$. Range $[0, 4]$.\n\n**(b)** $x^2 + 1 \ge 1$ is never $0$, so the domain is $\mathbb{R}$. Put $y = \dfrac{1}{x^2 + 1}$: then $x^2 = \dfrac{1 - y}{y}$, which has a real solution exactly when $\dfrac{1 - y}{y} \ge 0$, i.e. $0 < y \le 1$. Range $(0, 1]$.\n\n**(c)** $|x - 2|$ is defined for every real $x$, so the domain is $\mathbb{R}$. Since $|x - 2| \ge 0$, $h(x) \le 5$, with $5$ reached at $x = 2$, and every $y \le 5$ occurs at $x = 2 + (5 - y)$. Range $(-\infty, 5]$.`, sol: 'Solve y = f(x) for x to see which y are possible.', scheme: [['(a) domain [−4, 4]', 1], ['(a) range [0, 4]', 0.5], ['(b) domain and the condition (1 − y)/y ≥ 0', 1.5], ['(b) range (0, 1]', 0.5], ['(c) domain and range (−∞, 5]', 1.5]], d: 4, c: 'application', t: [3], time: 360 }), (C) => { C.assert(inD(f).every((x) => Math.abs(x) <= 4) && xsq.filter((x) => Math.abs(x) <= 4).every((x) => Number.isFinite(f(x))), '(a) domain'); C.assert([0, 1, 2.5, 4].every((y) => near(f(Math.sqrt(16 - y * y)), y)), '(a) range attained'); C.assert(inD(g).length === xsq.length && [1, 0.5, 0.01].every((y) => near(g(Math.sqrt((1 - y) / y)), y)) && xsq.every((x) => g(x) > 0 && g(x) <= 1), '(b)'); C.assert(xsq.every((x) => h(x) <= 5) && h(2) === 5 && [5, 0, -10, 4.5].every((y) => near(h(2 + (5 - y)), y)), '(c)'); C.model([4, 5, 2]); });
}
{
  const f = (x) => Math.abs(x - 1) - 2;
  const fig = plot({ x: [-3, 5], y: [-3, 4], fns: [{ expr: 'abs(x - 1) - 2', label: '$y = |x - 1| - 2$' }], pts: [[-1, 0, '(−1, 0)'], [3, 0, '(3, 0)'], [1, -2, '(1, −2)'], [0, -1, '(0, −1)']] }, 'The V-shaped graph of y equals the modulus of x minus 1, minus 2. Its lowest point is (1, minus 2); it crosses the x-axis at (minus 1, 0) and (3, 0) and the y-axis at (0, minus 1).', r`Graph of $f(x) = |x - 1| - 2$.`);
  Q('l03', mk.long({ stem: r`The figure shows the graph of the real function $f(x) = |x - 1| - 2$.\n\n(a) Write $f(x)$ without a modulus sign for $x \ge 1$ and for $x < 1$.\n\n(b) State the lowest point of the graph.\n\n(c) Find the $x$-intercepts and the $y$-intercept.\n\n(d) Write the range of $f$.`, assets: [fig], model: r`**(a)** For $x \ge 1$, $|x - 1| = x - 1$, so $f(x) = x - 3$. For $x < 1$, $|x - 1| = 1 - x$, so $f(x) = -x - 1$.\n\n**(b)** $|x - 1|$ is least ($0$) at $x = 1$, so the lowest point is $(1, -2)$.\n\n**(c)** $x$-intercepts: $f(x) = 0$ gives $|x - 1| = 2$, so $x - 1 = \pm 2$ and $x = 3$ or $x = -1$. $y$-intercept: $f(0) = |-1| - 2 = -1$.\n\n**(d)** Since $|x - 1| \ge 0$, $f(x) \ge -2$, and every value $\ge -2$ occurs. The range is $[-2, \infty)$.`, sol: 'Split at x = 1, the point where the modulus expression changes sign.', scheme: [['(a) two linear pieces', 1], ['(b) lowest point (1, −2)', 1], ['(c) x-intercepts −1 and 3', 1.5], ['(c) y-intercept and (d) range', 1.5]], d: 3, c: 'application', t: [3], time: 330 }), (C) => { C.assert(xsq.every((x) => near(f(x), x >= 1 ? x - 3 : -x - 1)), '(a)'); C.assert(f(1) === -2 && Math.min(...xsq.map(f)) === -2, '(b)'); C.assert(xsq.filter((x) => f(x) === 0).join() === '-1,3' && f(0) === -1, '(c)'); C.assert(f(100) === 97 && [-2, 0, 5].every((y) => near(f(1 + (y + 2)), y)), '(d)'); C.model([3, -2, -1, 1]); });
}
{
  const gx = (x) => x - fl(x);
  const grid = range(-64, 64).map((k) => k / 16);
  Q('l04', mk.long({ stem: r`The fractional-part function is $g(x) = x - [x]$, where $[x]$ is the greatest integer not exceeding $x$.\n\n(a) Find $g(2.75)$, $g(-1.25)$ and $g(3)$.\n\n(b) Find the range of $g$.\n\n(c) Show that $g(x + 1) = g(x)$ for every real $x$.`, model: `**(a)** $g(2.75) = 2.75 - 2 = ${gx(2.75)}$. $g(-1.25) = -1.25 - [-1.25] = -1.25 - (-2) = ${gx(-1.25)}$. $g(3) = 3 - 3 = ${gx(3)}$.\n\n**(b)** Since $[x] \\le x < [x] + 1$, subtracting $[x]$ gives $0 \\le x - [x] < 1$. Every value in $[0, 1)$ occurs (at $x = y$ for $y \\in [0, 1)$), and $1$ is never reached. The range is $[0, 1)$.\n\n**(c)** Because $[x + 1] = [x] + 1$, $g(x + 1) = (x + 1) - [x + 1] = x + 1 - [x] - 1 = x - [x] = g(x)$. The graph repeats every $1$ unit.`, sol: 'Use [x] ≤ x < [x] + 1 and the shift rule for [x].', scheme: [['(a) 0.75, 0.75 and 0', 1.5], ['(b) bounds 0 ≤ g < 1', 1], ['(b) range [0, 1)', 0.5], ['(c) shift rule applied', 2]], d: 4, c: 'analysis', t: [3], time: 360 }), (C) => { C.assert(gx(2.75) === 0.75 && gx(-1.25) === 0.75 && gx(3) === 0, '(a)'); C.assert(grid.every((x) => gx(x) >= 0 && gx(x) < 1) && [0, 0.25, 0.5, 15 / 16].every((y) => gx(y) === y), '(b)'); C.assert(grid.every((x) => gx(x + 1) === gx(x)), '(c)'); C.model([0.75, 0, 1]); });
}
{
  const f = (x) => x * x - 4 * x, g = Math.sqrt;
  const fin = (h) => xsq.filter((x) => Number.isFinite(h(x)));
  const dom = (p) => (xs) => xsq.every((x) => xs.includes(x) === p(x));
  Q('l05', mk.long({ stem: r`Let $f(x) = x^2 - 4x$ and $g(x) = \sqrt{x}$.\n\n(a) State the domains of $f$ and $g$.\n\n(b) Find $(f + g)(x)$ and $(fg)(x)$ with their domains.\n\n(c) Find $\dfrac{f}{g}$ and its domain, and simplify the expression.\n\n(d) Find the domain of $\dfrac{g}{f}$.`, model: r`**(a)** $f$ is a polynomial: domain $\mathbb{R}$. $g$ needs $x \ge 0$: domain $[0, \infty)$.\n\n**(b)** On the common domain $[0, \infty)$: $(f + g)(x) = x^2 - 4x + \sqrt{x}$ and $(fg)(x) = (x^2 - 4x)\sqrt{x}$.\n\n**(c)** $\dfrac{f}{g}$ needs $g(x) \ne 0$, and $g(0) = 0$, so the domain is $(0, \infty)$. There, $\dfrac{f}{g}(x) = \dfrac{x(x - 4)}{\sqrt{x}} = \sqrt{x}\,(x - 4)$.\n\n**(d)** $\dfrac{g}{f}$ needs $f(x) \ne 0$ in addition. $f(x) = x(x - 4) = 0$ at $x = 0$ and $x = 4$. Removing both from $[0, \infty)$ leaves $(0, \infty) - \{4\}$.`, sol: 'Intersect the domains; remove zeros of the divisor.', scheme: [['(a) both domains', 1], ['(b) sum and product with domain [0, ∞)', 1], ['(c) domain (0, ∞)', 1], ['(c) simplified form', 1], ['(d) domain excludes 0 and 4', 1]], d: 4, c: 'application', t: [4], time: 360 }), (C) => { C.assert(dom((x) => x >= 0)(fin(g)), '(a)'); C.assert(dom((x) => x >= 0)(fin((x) => f(x) + g(x))) && dom((x) => x >= 0)(fin((x) => f(x) * g(x))), '(b) domains'); C.assert(dom((x) => x > 0)(fin((x) => f(x) / g(x))), '(c) domain'); C.assert(xsq.filter((x) => x > 0).every((x) => near(f(x) / g(x), Math.sqrt(x) * (x - 4))), '(c) simplification'); C.assert(dom((x) => x > 0 && x !== 4)(fin((x) => g(x) / f(x))), '(d)'); C.model([0, 4]); });
}
{
  const A = ['a', 'b', 'c'], B = [1, 2];
  const nRel = allRelations(A, B).length, nFun = allFunctions(A, B).length, nFunBA = allFunctions(B, A).length;
  Q('l06', mk.long({ stem: r`$A = \{a, b, c\}$ and $B = \{1, 2\}$.\n\n(a) Find $n(A \times B)$.\n\n(b) How many different relations are there from $A$ to $B$?\n\n(c) How many of these relations are functions from $A$ to $B$?\n\n(d) How many are **not** functions?\n\n(e) How many functions are there from $B$ to $A$?\n\nGive a reason for each answer.`, model: `**(a)** $n(A \\times B) = 3 \\times 2 = ${prod(A, B).length}$.\n\n**(b)** A relation is any subset of $A \\times B$, which has $6$ pairs: $2^6 = ${nRel}$ relations.\n\n**(c)** A function gives each of the $3$ elements of $A$ one of $2$ images: $2^3 = ${nFun}$ functions.\n\n**(d)** Not functions: $${nRel} - ${nFun} = ${nRel - nFun}$.\n\n**(e)** Each of the $2$ elements of $B$ chooses one of $3$ images: $3^2 = ${nFunBA}$ functions.`, sol: 'Product rule for functions; subsets for relations.', scheme: [['(a) 6', 1], ['(b) 64 with reason', 1], ['(c) 8 with reason', 1], ['(d) 56', 1], ['(e) 9 with reason', 1]], d: 3, c: 'application', t: [2, 3], time: 330 }), (C) => { C.assert(nRel === 64 && nFun === 8 && nFunBA === 9 && allRelations(A, B).filter((R) => !isFunctionFrom(A, R)).length === 56, 'counts 6, 64, 8, 56, 9'); C.model([6, 64, 8, 56, 9]); });
}
{
  const f = (x) => Math.abs(x + 1), g = (x) => 3 - x;
  const fig = plot({ x: [-4, 5], y: [-3, 8], fns: [{ expr: 'abs(x + 1)', label: '$y = |x + 1|$' }, { expr: '3 - x', label: '$y = 3 - x$' }], pts: [[1, 2, '(1, 2)']] }, 'The V-shaped graph of y equals the modulus of x plus 1, and the falling line y equals 3 minus x. The two graphs cross at the single point (1, 2); to the left of it the line lies above the V.', r`$y = |x + 1|$ and $y = 3 - x$ meet once, at $(1, 2)$.`);
  Q('l07', mk.long({ stem: r`The figure shows the graphs of $f(x) = |x + 1|$ and $g(x) = 3 - x$.\n\n(a) Write $f(x)$ without a modulus sign for $x \ge -1$ and for $x < -1$.\n\n(b) Solve $f(x) = g(x)$ in each of the two cases, and give the point where the graphs meet.\n\n(c) Hence find all $x$ for which $f(x) < g(x)$.`, assets: [fig], model: r`**(a)** For $x \ge -1$, $f(x) = x + 1$. For $x < -1$, $f(x) = -(x + 1) = -x - 1$.\n\n**(b)** Case $x \ge -1$: $x + 1 = 3 - x$ gives $2x = 2$ and $x = 1$, which satisfies $x \ge -1$. Case $x < -1$: $-x - 1 = 3 - x$ would need $-1$ to equal $3$, which is impossible, so there is no solution there. The graphs meet only at $x = 1$, where $y = 2$: the point $(1, 2)$.\n\n**(c)** For $x \ge -1$: $x + 1 < 3 - x$ gives $x < 1$, so $-1 \le x < 1$. For $x < -1$: $-x - 1 < 3 - x$ becomes $-1 < 3$, true for every such $x$. Together, $f(x) < g(x)$ exactly for $x < 1$.`, sol: 'Treat each side of the corner separately.', scheme: [['(a) two pieces', 1], ['(b) x = 1 from the first case', 1], ['(b) second case impossible; point (1, 2)', 1], ['(c) first case gives −1 ≤ x < 1', 1], ['(c) second case always true; x < 1', 1]], d: 4, c: 'analysis', t: [3], time: 360 }), (C) => { C.assert(xsq.every((x) => near(f(x), x >= -1 ? x + 1 : -x - 1)), '(a)'); C.assert(xsq.filter((x) => near(f(x), g(x))).join() === '1' && f(1) === 2 && g(1) === 2, '(b)'); C.assert(xsq.every((x) => (f(x) < g(x)) === (x < 1)), '(c)'); C.model([1, 2]); });
}

// =============================================================== case-based
{
  const S = ['Asha', 'Bilal', 'Chitra', 'Dev'], P = ['Web', 'App', 'Game'];
  const R = [['Asha', 'Web'], ['Asha', 'Game'], ['Bilal', 'Web'], ['Chitra', 'Game'], ['Dev', 'Web']];
  const nPats = allFunctions(S, P).length, nOnto = countSurj(S, P);
  caseQ('c01', {
    passage: r`A school coding club in Pune (an imagined club) has four students, Asha, Bilal, Chitra and Dev, and three project themes: Web, App and Game. Each student may sign up for any themes. The sign-ups are the relation $R$ from the set $S$ of students to the set $P$ of themes: Asha chose Web and Game, Bilal chose Web, Chitra chose Game, and Dev chose Web.`,
    d: 3, c: 'application',
    model: r`(a) Option (b). (b) $7$. (c) (i) Domain is all four students, range $\{\text{Web}, \text{Game}\}$, so $1$ theme (App) is unused. Or (ii) $81$ patterns; $36$ use all three themes.`,
    sol: r`(a) Asha has two pairs, so $R$ is not a function. (b) $12 - 5 = 7$. (c) (i) App never appears. (ii) $3^4 = 81$ and $81 - 3 \cdot 2^4 + 3 = 36$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which statement about R is correct?', opts: ['R is a function, because every student signed up for a theme', 'R is not a function, because Asha appears with two different themes', 'R is not a function, because the theme App was not chosen by anyone', 'R is a function, because Web was chosen by three students'], key: 'b', sol: 'A function gives each student exactly one theme. Asha has two, so R fails. An unused theme in the codomain is allowed, and several students may share a theme.', d: 2, c: 'understanding', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'How many ordered pairs of S × P are not in R?', value: 7, sol: r`$S \times P$ has $4 \times 3 = 12$ pairs and $R$ has $5$ of them, so $12 - 5 = 7$ pairs are not in $R$.`, scheme: [['7', 1]], d: 2, c: 'application', t: [1, 2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Write the domain and the range of R, and say how many themes of the codomain are not in the range.', model: r`Domain $= \{\text{Asha}, \text{Bilal}, \text{Chitra}, \text{Dev}\}$ (every student appears). Range $= \{\text{Web}, \text{Game}\}$. So $3 - 2 = 1$ theme, App, is not in the range.`, sol: 'First entries give the domain; second entries the range.', scheme: [['Domain and range', 1], ['1 unused theme', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** The club now insists that each student signs up for exactly one theme. How many different sign-up patterns are possible, and how many of them use all three themes?', model: r`Each of the $4$ students has $3$ choices: $3^4 = 81$ patterns. Patterns missing a chosen theme: $2^4 = 16$, for $3$ choices of theme, giving $48$; patterns missing two themes were subtracted twice, so add back $3$. Using all themes: $81 - 48 + 3 = 36$.`, sol: 'Product rule, then inclusion and exclusion.', scheme: [['81 patterns', 1], ['36 using all themes', 1]], d: 4, c: 'analysis', t: [2], time: 180 }),
      ]),
    ],
  }, (C) => {
    C.child('a').which([isFunctionFrom(S, R), !isFunctionFrom(S, R) && R.filter(([s]) => s === 'Asha').length === 2, false, false], true);
    C.child('b').val(prod(S, P).length - R.length);
    C.child('c').assert(sameSet(domOf(R), S) && sameSet(rngOf(R), ['Web', 'Game']), 'domain S, range {Web, Game}');
    C.child('c').model([1, 2]);
    C.child('cii').assert(nPats === 81 && nOnto === 36, '81 and 36');
    C.child('cii').model([81, 36, 48]);
  });
}
{
  const fare = (d) => 50 + 12 * d, fare2 = (d) => 50 + 12 * fl(d);
  caseQ('c02', {
    passage: r`A taxi service in Hyderabad (imaginary) charges a fixed ₹50 plus ₹12 for every kilometre travelled, measured exactly. So a journey of $d$ kilometres, $d \ge 0$, costs $f(d) = 50 + 12d$ rupees.`,
    d: 3, c: 'application',
    model: r`(a) Option (b). (b) $140$. (c) (i) $11$ km. Or (ii) $g(7.5) = 134$; no, since $7.5$ is not a whole number of kilometres.`,
    sol: r`(a) $d \ge 0$ gives $f(d) \ge 50$ and every larger value occurs. (b) $50 + 90 = 140$. (c) (i) $12d = 132$. (ii) $50 + 12[7.5] = 134$; $140$ needs $[d] = 7.5$.`,
    children: [
      child('a', mk.mcq({ stem: 'The range of f is', opts: [r`$[0, \infty)$`, r`$[50, \infty)$`, r`$\mathbb{R}$`, r`$(50, \infty)$`], key: 'b', sol: r`The least fare is $f(0) = 50$ and the fare grows without limit, taking every value from $50$ upwards.`, d: 2, c: 'understanding', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'Find the fare in rupees for a journey of 7.5 km.', value: 140, unit: 'rupees', sol: r`$f(7.5) = 50 + 12 \times 7.5 = 50 + 90 = 140$.`, scheme: [['140', 1]], d: 1, c: 'application', t: [3], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** A passenger paid ₹182. How many kilometres did the journey cover?', model: r`$50 + 12d = 182$, so $12d = 132$ and $d = 11$. The journey covered $11$ km.`, sol: 'Solve f(d) = 182.', scheme: [['Equation 50 + 12d = 182', 1], ['d = 11', 1]], d: 2, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** The service switches to charging per **completed** kilometre: g(d) = 50 + 12[d]. Find g(7.5) and say whether a fare of ₹140 is possible under g.', model: r`$g(7.5) = 50 + 12 \times [7.5] = 50 + 12 \times 7 = 134$.\n\nFor $g(d) = 140$ we would need $12[d] = 90$, i.e. $[d] = 7.5$. But $[d]$ is always a whole number, so a fare of ₹140 is not possible under $g$.`, sol: 'Whole-number values of [d] only.', scheme: [['g(7.5) = 134', 1], ['140 impossible because [d] is an integer', 1]], d: 4, c: 'analysis', t: [3], time: 120 }),
      ]),
    ],
  }, (C) => {
    const ds = xsq.filter((d) => d >= 0);
    C.child('a').which([ds.some((d) => fare(d) === 0), ds.every((d) => fare(d) >= 50) && fare(0) === 50 && [50, 51, 200].every((y) => near(fare((y - 50) / 12), y)), false, ds.every((d) => fare(d) > 50)], true);
    C.child('b').val(fare(7.5));
    C.child('c').assert(fare(11) === 182, 'f(11) = 182');
    C.child('c').model([11, 132]);
    C.child('cii').assert(fare2(7.5) === 134 && xsq.filter((d) => d >= 0).every((d) => fare2(d) !== 140) && 12 * 7.5 === 90, 'g(7.5) = 134, never 140');
    C.child('cii').model([134, 90]);
  });
}
{
  const rev = (x) => 50 * x, cost = (x) => 30 * x + 400;
  const profit = (x) => rev(x) - cost(x);
  caseQ('c03', {
    passage: r`A small bakery in Jaipur (imaginary) sells $x$ loaves a day. Its daily revenue in rupees is $f(x) = 50x$ and its daily cost is $g(x) = 30x + 400$, which includes the oven and rent.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $20$. (c) (i) ₹300. Or (ii) $1.25$.`,
    sol: r`(a) $(f - g)(x) = 50x - 30x - 400 = 20x - 400$. (b) $20x - 400 = 0$ gives $x = 20$. (c) (i) $20 \times 35 - 400 = 300$. (ii) $\dfrac{2000}{1600} = 1.25$.`,
    children: [
      child('a', mk.mcq({ stem: 'The profit function (f − g)(x) is', opts: ['20x − 400', '80x + 400', '20x + 400', '−20x + 400'], key: 'a', sol: r`Profit is revenue minus cost: $50x - (30x + 400) = 20x - 400$. Option (b) adds the two functions instead.`, d: 2, c: 'application', t: [4], time: 60 })),
      child('b', mk.num({ stem: 'How many loaves must be sold in a day to break even, i.e. for the profit to be zero?', value: 20, sol: r`$(f - g)(x) = 20x - 400 = 0$, so $x = 20$ loaves.`, scheme: [['20', 1]], d: 2, c: 'application', t: [4], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the profit on a day when 35 loaves are sold.', model: r`$(f - g)(35) = 20 \times 35 - 400 = 700 - 400 = 300$. The profit is ₹300.`, sol: 'Evaluate the profit function at 35.', scheme: [['Substitution', 1], ['₹300', 1]], d: 2, c: 'application', t: [4], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the value of the quotient function (f/g)(40) and say what it means for the bakery.', model: r`$f(40) = 2000$ and $g(40) = 1600$, so $\left(\dfrac{f}{g}\right)(40) = \dfrac{2000}{1600} = 1.25$. On a $40$-loaf day the revenue is $1.25$ times the cost.`, sol: 'Divide the two values at x = 40.', scheme: [['f(40) and g(40)', 1], ['1.25 with meaning', 1]], d: 3, c: 'application', t: [4], time: 120 }),
      ]),
    ],
  }, (C) => {
    C.child('a').which([(x) => 20 * x - 400, (x) => 80 * x + 400, (x) => 20 * x + 400, (x) => -20 * x + 400].map((h) => xsq.every((x) => near(profit(x), h(x)))), true);
    C.child('b').val(range(0, 100).find((x) => profit(x) === 0));
    C.child('c').assert(profit(35) === 300, 'profit 300');
    C.child('c').model([35, 300]);
    C.child('cii').assert(rev(40) === 2000 && cost(40) === 1600 && rev(40) / cost(40) === 1.25, '1.25');
    C.child('cii').model([2000, 1600, 1.25]);
  });
}
{
  const A = range(1, 5), B = range(1, 3);
  const cells = prod(A, B);
  const flags = relFrom(A, B, (x, y) => x + y === 6);
  const above = relFrom(A, B, (x, y) => y > x);
  caseQ('c04', {
    passage: r`Before a school sports day (an imagined school), the ground is marked in a grid. The columns are numbered by the set $A = \{1, 2, 3, 4, 5\}$ and the rows by the set $B = \{1, 2, 3\}$. A cell is named by the ordered pair $(x, y)$ of its column $x$ and row $y$, so the cells form $A \times B$. Flags are planted in the cells where $x + y = 6$; these cells form a relation $R$ from $A$ to $B$.`,
    d: 3, c: 'application',
    model: r`(a) Option (c). (b) $3$. (c) (i) $(1, 2), (1, 3), (2, 3)$. Or (ii) not a function from $A$: columns $1$ and $2$ have no flag; it is a function on its domain $\{3, 4, 5\}$.`,
    sol: r`(a) $5 \times 3 = 15$. (b) Flags at $(3, 3), (4, 2), (5, 1)$. (c) (i) Cells with $y > x$. (ii) Columns $1$ and $2$ have no pair.`,
    children: [
      child('a', mk.mcq({ stem: 'How many cells are there in the grid A × B?', opts: ['8', '12', '15', '25'], key: 'c', sol: r`$n(A \times B) = 5 \times 3 = 15$. Adding the sizes ($8$) is a common slip.`, d: 1, c: 'understanding', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'How many flags are planted, that is, how many cells (x, y) satisfy x + y = 6?', value: 3, sol: r`The cells are $(3, 3)$, $(4, 2)$ and $(5, 1)$ (since $y \le 3$), so the number of flags is $3$.`, scheme: [['3', 1]], d: 2, c: 'application', t: [1, 2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** List all the cells (x, y) of the grid with y > x.', model: `Column $1$: rows $2, 3$; column $2$: row $3$; columns $3, 4, 5$: none. The cells are ${prTex(above)}.`, sol: 'Go column by column.', scheme: [['Column-wise search', 1], ['The three cells listed', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Is the flag relation R a function from A to B? Give its domain and range.', model: r`No. Columns $1$ and $2$ have no flag, so those elements of $A$ have no image. The domain of $R$ is $\{3, 4, 5\}$ and its range is $\{1, 2, 3\}$. On its own domain, each column has exactly one flag, so $R$ is a function from $\{3, 4, 5\}$ to $B$.`, sol: 'A function from A needs an image for every element of A.', scheme: [['Not a function from A, with reason', 1], ['Domain and range', 1]], d: 3, c: 'analysis', t: [2, 3], time: 120 }),
      ]),
    ],
  }, (C) => {
    C.child('a').which([A.length + B.length, 12, cells.length, 25], cells.length);
    C.child('b').val(flags.length);
    C.child('c').assert(JSON.stringify(above) === '[[1,2],[1,3],[2,3]]', JSON.stringify(above));
    C.child('c').model(['(1, 2)', '(1, 3)', '(2, 3)']);
    C.child('cii').assert(!isFunctionFrom(A, flags) && sameSet(domOf(flags), [3, 4, 5]) && sameSet(rngOf(flags), [1, 2, 3]) && isFunctionFrom(domOf(flags), flags), 'not a function from A; function on its domain');
    C.child('cii').model([1, 2, 3, 4, 5]);
  });
}

// ISC 11 Mathematics ch02 Relations and Functions — short (2 and 3 marks) and long (5 marks, in parts) items.
// Every number in a model answer is recomputed: sets and relations by listing, real functions on exact binary grids,
// ranges by solving y = f(x) for x.
import { Q, mk } from './lib.mjs';
import { r, prod, prod3, relFrom, domOf, rngOf, has, isFunctionFrom, sameSet, allRelations, allFunctions, range, near, fl, sgn, xs16, domIs } from './rf.mjs';

const attain = (g, xOf, y) => { const x = xOf(y); return Number.isFinite(x) && near(g(x), y, 1e-9); };
const choose2 = (n) => (n * (n - 1)) / 2;

// =============================================================== short answer (2 marks)
{
  let x = null, y = null;
  for (const a of range(-30, 30)) for (const b of range(-30, 30)) if (2 * a + b === 7 && a - b === 2) { x = a; y = b; }
  Q('s201', mk.short({ marks: 2, stem: r`The ordered pairs $(2x + y,\ x - y)$ and $(7,\ 2)$ are equal. Find $x$ and $y$.`, model: r`Equal pairs have equal entries in the same positions, so $2x + y = 7$ and $x - y = 2$. Adding the two equations, $3x = 9$, so $x = 3$, and then $y = 3 - 2 = 1$.`, sol: 'Match entries, then solve the pair of equations.', scheme: [['Two equations from matching entries', 1], ['$x = 3$, $y = 1$', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.assert(x === 3 && y === 1, 'x = 3, y = 1'); C.model([3, 1]); });
}
{
  const A = [2, 4], B = [1, 5, 9];
  const common = prod(A, B).filter(([a, b]) => has(prod(B, A), a, b));
  Q('s202', mk.short({ marks: 2, stem: r`For $A = \{2, 4\}$ and $B = \{1, 5, 9\}$, list the elements of $A \times B$ and state $n(B \times A)$. Do $A \times B$ and $B \times A$ share any ordered pair?`, model: r`$A \times B = \{(2, 1), (2, 5), (2, 9), (4, 1), (4, 5), (4, 9)\}$ and $n(B \times A) = 3 \times 2 = 6$. A pair common to both would need both entries in $A \cap B$, but $A \cap B = \varnothing$, so they share **no** pair.`, sol: 'List row by row; a common pair needs entries from both sets.', scheme: [['$A \\times B$ listed and $n(B \\times A) = 6$', 1], ['No common pair, with reason', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(prod(A, B).length === 6 && prod(B, A).length === 6 && common.length === 0, 'six pairs, none common'); C.model([6, 'no']); });
}
{
  const AB = [[3, 'p'], [3, 'q'], [5, 'p'], [5, 'q']];
  const A = domOf(AB), B = rngOf(AB);
  Q('s203', mk.short({ marks: 2, stem: r`The Cartesian product $A \times B$ equals $\{(3, p), (3, q), (5, p), (5, q)\}$. Find the sets $A$ and $B$, and write down $B \times A$.`, model: r`First entries come from $A$, second entries from $B$: $A = \{3, 5\}$ and $B = \{p, q\}$. Swapping the order, $B \times A = \{(p, 3), (p, 5), (q, 3), (q, 5)\}$.`, sol: 'Read A from first entries and B from second entries.', scheme: [['$A = \\{3, 5\\}$, $B = \\{p, q\\}$', 1], ['$B \\times A$ written', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(sameSet(A, [3, 5]) && sameSet(B, ['p', 'q']) && sameSet(prod(A, B), AB), 'A and B rebuild the product'); C.model(['(p, 3)', '(q, 5)']); });
}
{
  const A = [1, 2, 3, 4], B = [3, 5, 6, 8];
  const isP = (n) => n > 1 && range(2, Math.max(2, n - 1)).every((d) => d >= n || n % d !== 0);
  const R = relFrom(A, B, (x, y) => isP(y - x));
  Q('s204', mk.short({ marks: 2, stem: r`A relation $R$ from $A = \{1, 2, 3, 4\}$ to $B = \{3, 5, 6, 8\}$ is defined by $x\,R\,y$ when $y - x$ is a prime number. Write $R$ in roster form.`, model: r`Test each pair; $y - x$ must be $2, 3, 5$ or $7$ here. $1$ gives $3 - 1 = 2$, $6 - 1 = 5$, $8 - 1 = 7$; $2$ gives $5 - 2 = 3$; $3$ gives $5 - 3 = 2$, $6 - 3 = 3$, $8 - 3 = 5$; $4$ gives $6 - 4 = 2$. So $R = \{(1, 3), (1, 6), (1, 8), (2, 5), (3, 5), (3, 6), (3, 8), (4, 6)\}$, which has $8$ pairs.`, sol: 'Check differences x by x against the primes.', scheme: [['Differences tested against primes', 1], ['All eight pairs listed', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => { C.assert(R.length === 8 && has(R, 4, 6) && !has(R, 2, 3) && !has(R, 2, 8), 'eight pairs'); C.model([8, '(1, 8)', '(4, 6)']); });
}
{
  const A = [1, 2, 3, 5, 7], B = [4, 9, 16];
  const R = [[1, 4], [2, 4], [3, 9], [5, 9]];
  Q('s205', mk.short({ marks: 2, stem: r`Let $R = \{(1, 4), (2, 4), (3, 9), (5, 9)\}$ be a relation from $A = \{1, 2, 3, 5, 7\}$ to $B = \{4, 9, 16\}$. Write its domain and range, and say whether $R$ is a function from $A$ to $B$.`, model: r`Domain $= \{1, 2, 3, 5\}$ (first entries) and range $= \{4, 9\}$ (second entries). The element $7 \in A$ has no pair, so $R$ is **not** a function from $A$ to $B$.`, sol: 'Compare the domain with A.', scheme: [['Domain and range', 1], ['Not a function: $7$ has no image', 1]], d: 2, c: 'understanding', t: [2, 3], time: 90 }), (C) => { C.assert(sameSet(domOf(R), [1, 2, 3, 5]) && sameSet(rngOf(R), [4, 9]) && !isFunctionFrom(A, R) && isFunctionFrom(domOf(R), R), 'domain, range, not a function from A'); C.model([7, 'not']); });
}
{
  const out = [[0, 1]].length; // placeholder-free: the check below solves |y| = x - 1 by search
  const ys4 = range(-10, 10).filter((y) => Math.abs(y) === 4 - 1);
  const ys0 = range(-10, 10).filter((y) => Math.abs(y) === 0 - 1);
  Q('s206', mk.short({ marks: 2, stem: r`Show that the relation $\{(x, y) : x, y \in \mathbb{R},\ |y| = x - 1\}$ is not a function from $\mathbb{R}$ to $\mathbb{R}$.`, model: r`For $x = 4$ the equation becomes $|y| = 3$, which gives both $y = 3$ and $y = -3$. So $(4, 3)$ and $(4, -3)$ both belong to the relation: one input has two outputs. (Also, $x = 0$ gives $|y| = -1$, which has no solution.) Hence it is not a function.`, sol: 'One counter-example input with two outputs is enough.', scheme: [['$x = 4$ gives $y = 3$ and $y = -3$', 1], ['Conclusion: not a function', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => { C.assert(out === 1 && sameSet(ys4, [3, -3]) && ys0.length === 0, 'x = 4 has two outputs, x = 0 has none'); C.model([4, 3, '-3']); });
}
{
  const g = (x) => 1 / Math.sqrt(x - 3);
  Q('s207', mk.short({ marks: 2, stem: r`Find the domain of the real function $f(x) = \dfrac{1}{\sqrt{x - 3}}$ and explain why $x = 3$ is excluded.`, model: r`The square root needs $x - 3 \ge 0$, and the fraction needs $\sqrt{x - 3} \ne 0$. Together $x - 3 > 0$, so the domain is $(3, \infty)$. At $x = 3$ the denominator is $\sqrt{0} = 0$.`, sol: 'Both the root and the denominator impose a condition.', scheme: [['Both conditions stated', 1], [r`Domain $(3, \infty)$ with reason for $x = 3$`, 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => { C.assert(domIs(g, (x) => x > 3), 'domain (3, inf)'); C.model([3, '(3, \\infty)']); });
}
{
  const g = (x) => 6 * x - x * x - 5;
  const xsol = xs16.filter((x) => g(x) === 4);
  Q('s208', mk.short({ marks: 2, stem: r`For $f(x) = 6x - x^2 - 5$, write $f(x)$ in the form $a - (x - h)^2$ to find its range, and find every $x$ with $f(x) = 4$.`, model: r`$6x - x^2 - 5 = 4 - (x - 3)^2$. Since $(x - 3)^2 \ge 0$, $f(x) \le 4$, and every value below $4$ occurs, so the range is $(-\infty, 4]$. The value $4$ needs $(x - 3)^2 = 0$, so $x = 3$ only.`, sol: 'Complete the square, then read off the maximum.', scheme: [['Completed square and range $(-\\infty, 4]$', 1], ['Only $x = 3$ gives $4$', 1]], d: 3, c: 'application', t: [3], time: 100 }), (C) => { C.assert(xs16.every((x) => near(g(x), 4 - (x - 3) ** 2)) && sameSet(xsol, [3]) && [4, 0, -50].every((y) => near(g(3 + Math.sqrt(4 - y)), y, 1e-9)), 'range (-inf, 4], f = 4 only at 3'); C.model([4, 3]); });
}
{
  const f = (x) => Math.abs(x) - fl(x);
  Q('s209', mk.short({ marks: 2, stem: r`Evaluate the expression $|x| - [x]$ at $x = -2.5$, at $x = 0$ and at $x = 3.7$, reading the bracket as the floor of $x$.`, model: r`$f(-2.5) = 2.5 - (-3) = 5.5$. $f(0) = 0 - 0 = 0$. $f(3.7) = 3.7 - 3 = 0.7$.`, sol: 'Evaluate the modulus and the bracket separately.', scheme: [['$[-2.5] = -3$ used, giving $5.5$', 1], ['$f(0) = 0$ and $f(3.7) = 0.7$', 1]], d: 2, c: 'application', t: [4], time: 90 }), (C) => { C.assert(near(f(-2.5), 5.5) && f(0) === 0 && near(f(3.7), 0.7), '5.5, 0, 0.7'); C.model([5.5, 0, 0.7]); });
}
{
  const f = (x) => x * x - 1, g = (x) => 2 * x + 5;
  Q('s210', mk.short({ marks: 2, stem: r`The real functions $f(x) = x^2 - 1$ and $g(x) = 2x + 5$ are combined. Write the expressions for $(f + g)(x)$ and $(f - g)(x)$, and find $(fg)(2)$.`, model: r`$(f + g)(x) = x^2 - 1 + 2x + 5 = x^2 + 2x + 4$ and $(f - g)(x) = x^2 - 1 - 2x - 5 = x^2 - 2x - 6$. At $x = 2$: $f(2) = 3$ and $g(2) = 9$, so $(fg)(2) = 3 \times 9 = 27$.`, sol: 'Combine the rules, then use the values at 2 for the product.', scheme: [['Sum and difference expressions', 1], ['$(fg)(2) = 27$', 1]], d: 2, c: 'understanding', t: [5], time: 90 }), (C) => { C.assert(xs16.every((x) => near(f(x) + g(x), x * x + 2 * x + 4) && near(f(x) - g(x), x * x - 2 * x - 6)) && f(2) * g(2) === 27, 'combinations'); C.model([27, 'x^2 + 2x + 4', 'x^2 - 2x - 6']); });
}

// =============================================================== short answer (3 marks)
{
  let sol = null;
  for (const x of range(-20, 20)) for (const y of range(-20, 20)) for (const z of range(-20, 20)) if (x + y === 7 && y + z === 9 && z + x === 8) sol = [x, y, z];
  Q('s301', mk.short({ marks: 3, stem: r`Ordered triples are equal when their entries agree in position. Find $x$, $y$ and $z$ if $(x + y,\ y + z,\ z + x) = (7,\ 9,\ 8)$.`, model: r`The three equations are $x + y = 7$, $y + z = 9$, $z + x = 8$. Adding them, $2(x + y + z) = 24$, so $x + y + z = 12$. Subtracting each equation in turn gives $z = 12 - 7 = 5$, $x = 12 - 9 = 3$ and $y = 12 - 8 = 4$.`, sol: 'Add the three equations, then subtract each one from the total.', scheme: [['Three equations', 1], ['$x + y + z = 12$', 1], ['$x = 3$, $y = 4$, $z = 5$', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { C.assert(sol && sol.join() === '3,4,5', 'x = 3, y = 4, z = 5'); C.model([12, 3, 4, 5]); });
}
{
  const A = [1, 2, 3], B = [2, 3, 4];
  const AB = prod(A, B), BA = prod(B, A);
  const I = AB.filter(([a, b]) => has(BA, a, b));
  const AiB = A.filter((v) => B.includes(v));
  Q('s302', mk.short({ marks: 3, stem: r`Let $A = \{1, 2, 3\}$ and $B = \{2, 3, 4\}$. Find $(A \times B) \cap (B \times A)$ by listing, and show that it equals $(A \cap B) \times (A \cap B)$.`, model: r`$A \times B$ has first entries in $A$, second in $B$; $B \times A$ the other way. A pair lies in both exactly when each entry belongs to $A$ and to $B$. Listing, $(A \times B) \cap (B \times A) = \{(2, 2), (2, 3), (3, 2), (3, 3)\}$. Since $A \cap B = \{2, 3\}$, $(A \cap B) \times (A \cap B) = \{(2, 2), (2, 3), (3, 2), (3, 3)\}$, the same four pairs.`, sol: 'A common pair needs both entries in A and in B.', scheme: [['Condition for a common pair', 1], ['Four pairs listed', 1], ['Matched with $(A \\cap B) \\times (A \\cap B)$', 1]], d: 4, c: 'analysis', t: [1], time: 180 }), (C) => { C.assert(I.length === 4 && sameSet(I, prod(AiB, AiB)) && has(I, 2, 3) && has(I, 3, 2), 'intersection of the products'); C.model(['(2, 2)', '(3, 3)']); });
}
{
  const A = [1, 2, 3, 4], B = [1, 4, 7, 8, 10];
  const R = relFrom(A, B, (x, y) => y === 3 * x - 2);
  Q('s303', mk.short({ marks: 3, stem: r`A relation $R$ from $A = \{1, 2, 3, 4\}$ to $B = \{1, 4, 7, 8, 10\}$ is defined by $y = 3x - 2$. Write $R$ in roster form, give its domain and range, and name the element of $B$ left out of the range.`, model: r`For $x = 1, 2, 3, 4$ the rule gives $y = 1, 4, 7, 10$, so $R = \{(1, 1), (2, 4), (3, 7), (4, 10)\}$. Domain $= \{1, 2, 3, 4\}$ and range $= \{1, 4, 7, 10\}$. The element $8$ of $B$ is not in the range.`, sol: 'Substitute each x, then compare the values with B.', scheme: [['Roster form', 1], ['Domain and range', 1], ['$8$ identified', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => { C.assert(R.length === 4 && sameSet(rngOf(R), [1, 4, 7, 10]) && B.filter((y) => !rngOf(R).includes(y)).join() === '8', 'range misses 8'); C.model([1, 4, 7, 10, 8]); });
}
{
  const P = [1, 2], Q2 = ['a', 'b', 'c'];
  const rels = allRelations(P, Q2);
  const two = rels.filter((R) => R.length === 2).length;
  Q('s304', mk.short({ marks: 3, stem: r`$P$ has $2$ elements and $Q$ has $3$ elements. Find (i) $n(P \times Q)$, (ii) the number of relations from $P$ to $Q$, and (iii) the number of those relations that contain exactly $2$ ordered pairs.`, model: r`(i) $n(P \times Q) = 2 \times 3 = 6$. (ii) Every subset of $P \times Q$ is a relation: $2^6 = 64$. (iii) Choose which $2$ of the $6$ pairs are present: $\dfrac{6 \times 5}{2} = 15$.`, sol: 'Relations are subsets; exactly two pairs means choosing two of the six.', scheme: [['$n(P \\times Q) = 6$', 1], ['$2^6 = 64$', 1], ['$15$ with the choice argument', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (C) => { C.assert(prod(P, Q2).length === 6 && rels.length === 64 && two === 15 && choose2(6) === 15, '6, 64, 15'); C.model([6, 64, 15]); });
}
{
  const A = [1, 2, 3], B = [4, 5, 6];
  const R1 = [[1, 4], [2, 4], [3, 4]], R2 = [[1, 4], [1, 5], [2, 6], [3, 6]];
  const R3 = relFrom(A, B, (x, y) => y === 7 - x);
  Q('s305', mk.short({ marks: 3, stem: r`Each relation below is from $A = \{1, 2, 3\}$ to $B = \{4, 5, 6\}$. Decide which are functions, with a reason in each case. $R_1 = \{(1, 4), (2, 4), (3, 4)\}$; $R_2 = \{(1, 4), (1, 5), (2, 6), (3, 6)\}$; $R_3 = \{(x, y) : y = 7 - x\}$.`, model: r`$R_1$ is a function: each of $1, 2, 3$ has exactly one image (the same image $4$ is allowed). $R_2$ is **not** a function: $1$ has two images, $4$ and $5$. $R_3 = \{(1, 6), (2, 5), (3, 4)\}$ is a function: each element of $A$ has exactly one image.`, sol: 'List the pairs, then count the images of each element.', scheme: [['$R_1$ with reason', 1], ['$R_2$ with reason', 1], ['$R_3$ listed and decided', 1]], d: 2, c: 'understanding', t: [3], time: 150 }), (C) => { C.assert(isFunctionFrom(A, R1) && !isFunctionFrom(A, R2) && isFunctionFrom(A, R3) && has(R3, 1, 6) && has(R3, 3, 4), 'R1 yes, R2 no, R3 yes'); C.model([4, 5, 6]); });
}
{
  const g = (x) => (x + 4) / (2 * x - 5);
  const xOf = (y) => (5 * y + 4) / (2 * y - 1);
  const probes = [-3, 0, 0.5, 1, 2.5, 6];
  Q('s306', mk.short({ marks: 3, stem: r`For the rational function $f(x) = \dfrac{x + 4}{2x - 5}$, determine where it is defined and which values it takes.`, model: r`The denominator is $0$ at $x = \dfrac{5}{2}$, so the domain is $\mathbb{R} - \left\{\dfrac52\right\}$. Put $y = \dfrac{x + 4}{2x - 5}$: then $y(2x - 5) = x + 4$, so $x(2y - 1) = 5y + 4$ and $x = \dfrac{5y + 4}{2y - 1}$. This is possible exactly when $y \ne \dfrac12$, so the range is $\mathbb{R} - \left\{\dfrac12\right\}$.`, sol: 'Domain from the denominator; range by solving for x.', scheme: [['Domain', 1], ['$x$ expressed in terms of $y$', 1], ['Range', 1]], d: 4, c: 'analysis', t: [3], time: 180 }), (C) => { C.assert(domIs(g, (x) => x !== 2.5) && probes.every((y) => attain(g, xOf, y) === (y !== 0.5)) && xs16.every((x) => !Number.isFinite(g(x)) || !near(g(x), 0.5)), 'domain without 5/2, range without 1/2'); C.model(['5', '2', '4']); });
}
{
  const g = (x) => 3 + 2 * 0 + Math.sqrt(16 - x * x);
  const xOf = (y) => Math.sqrt(16 - (y - 3) ** 2);
  const vals = xs16.filter((x) => Math.abs(x) <= 4).map(g);
  const probes = [2.9, 3, 5, 7, 7.1];
  Q('s307', mk.short({ marks: 3, stem: r`State the domain and the range of $g(x) = 3 + \sqrt{16 - x^2}$, justifying each.`, model: r`$g$ is defined when $16 - x^2 \ge 0$, that is $-4 \le x \le 4$: domain $= [-4, 4]$. On this domain $0 \le 16 - x^2 \le 16$, so $0 \le \sqrt{16 - x^2} \le 4$, with $0$ at $x = \pm 4$ and $4$ at $x = 0$. Adding $3$, the values fill $[3, 7]$, so the range is $[3, 7]$.`, sol: 'Bound the root over the domain, then shift by 3.', scheme: [['Domain $[-4, 4]$', 1], ['Bounds of the root', 1], ['Range $[3, 7]$', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.assert(domIs(g, (x) => Math.abs(x) <= 4) && Math.min(...vals) === 3 && Math.max(...vals) === 7 && probes.every((y) => attain(g, xOf, y) === (y >= 3 && y <= 7)), 'domain [-4, 4], range [3, 7]'); C.model([4, 3, 7]); });
}
{
  const f = (x) => 4 - Math.abs(x - 1);
  const zeros = xs16.filter((x) => f(x) === 0);
  Q('s308', mk.short({ marks: 3, stem: r`Describe the graph of $f(x) = 4 - |x - 1|$: give its highest point, the $x$-intercepts, the $y$-intercept and the range.`, model: r`Since $|x - 1| \ge 0$, $f(x) \le 4$ with $4$ reached at $x = 1$: the highest point is $(1, 4)$. $f(x) = 0$ means $|x - 1| = 4$, so $x = 5$ or $x = -3$. At $x = 0$, $f(0) = 4 - 1 = 3$. The range is $(-\infty, 4]$.`, sol: 'Treat it as an inverted V shifted right by 1 and up by 4.', scheme: [['Highest point $(1, 4)$', 1], ['Intercepts $x = 5, -3$ and $y = 3$', 1], ['Range $(-\\infty, 4]$', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { C.assert(sameSet(zeros, [5, -3]) && f(0) === 3 && f(1) === 4 && xs16.every((x) => f(x) <= 4), 'vertex (1, 4), zeros 5 and -3, y-intercept 3'); C.model([4, 5, -3, 3]); });
}
{
  const f = (x) => fl(2 * x);
  const pieces = [[0, 0.5, 0], [0.5, 1, 1], [1, 1.5, 2], [1.5, 2, 3]];
  Q('s309', mk.short({ marks: 3, stem: r`Write the function $f(x) = [2x]$ on the interval $0 \le x < 2$ as a table of pieces, and give its range.`, model: r`$[2x] = n$ when $n \le 2x < n + 1$, that is $\dfrac{n}{2} \le x < \dfrac{n + 1}{2}$. So $f(x) = 0$ for $0 \le x < \dfrac12$; $1$ for $\dfrac12 \le x < 1$; $2$ for $1 \le x < \dfrac32$; $3$ for $\dfrac32 \le x < 2$. The range is $\{0, 1, 2, 3\}$.`, sol: 'Solve n ≤ 2x < n + 1 for each integer n.', scheme: [['Inequality $n \\le 2x < n + 1$', 1], ['Four pieces', 1], ['Range $\\{0, 1, 2, 3\\}$', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { const xs = range(0, 63).map((k) => k / 32); C.assert(pieces.every(([a, b, v]) => xs.filter((x) => x >= a && x < b).every((x) => f(x) === v)) && sameSet([...new Set(xs.map(f))], [0, 1, 2, 3]), 'pieces and range'); C.model([0, 1, 2, 3]); });
}
{
  const f = (x) => x / (x - 3), g = (x) => Math.sqrt(x * x - 4);
  const sum = (x) => f(x) + g(x), quo = (x) => f(x) / g(x);
  Q('s310', mk.short({ marks: 3, stem: r`Let $f(x) = \dfrac{x}{x - 3}$ and $g(x) = \sqrt{x^2 - 4}$. Find the domains of $f$, $g$, $f + g$ and $\dfrac{f}{g}$.`, model: r`$f$ is defined for $x \ne 3$. $g$ needs $x^2 \ge 4$, so $x \le -2$ or $x \ge 2$. For $f + g$ take both: $(-\infty, -2] \cup [2, 3) \cup (3, \infty)$. For $\dfrac{f}{g}$ also drop $g(x) = 0$, that is $x = \pm 2$: $(-\infty, -2) \cup (2, 3) \cup (3, \infty)$.`, sol: 'Domains of f and g first, then intersect; for the quotient remove zeros of g.', scheme: [['Domains of $f$ and $g$', 1], ['Domain of $f + g$', 1], ['Domain of $\\dfrac{f}{g}$ without $\\pm 2$', 1]], d: 4, c: 'analysis', t: [3, 5], time: 180 }), (C) => { C.assert(domIs(f, (x) => x !== 3) && domIs(g, (x) => x <= -2 || x >= 2) && domIs(sum, (x) => (x <= -2 || x >= 2) && x !== 3) && domIs(quo, (x) => (x < -2 || x > 2) && x !== 3), 'domains'); C.model([3, 2, '-2']); });
}
{
  const f = Math.abs, g = (x) => x;
  const plus = (x) => f(x) + g(x), minus = (x) => f(x) - g(x), quo = (x) => f(x) / g(x);
  Q('s311', mk.short({ marks: 3, stem: r`With $f(x) = |x|$ and $g(x) = x$, write $f + g$ and $f - g$ without modulus signs for $x \ge 0$ and for $x < 0$, and find $\dfrac{f}{g}$ with its domain.`, model: r`For $x \ge 0$, $|x| = x$, so $(f + g)(x) = 2x$ and $(f - g)(x) = 0$. For $x < 0$, $|x| = -x$, so $(f + g)(x) = 0$ and $(f - g)(x) = -2x$. The quotient $\dfrac{|x|}{x}$ is defined for $x \ne 0$: it is $1$ when $x > 0$ and $-1$ when $x < 0$; domain $\mathbb{R} - \{0\}$.`, sol: 'Split at zero so the modulus can be removed.', scheme: [['$f + g$ on both sides of $0$', 1], ['$f - g$ on both sides of $0$', 1], ['Quotient and domain $\\mathbb{R} - \\{0\\}$', 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => { C.assert(xs16.every((x) => (x >= 0 ? plus(x) === 2 * x && minus(x) === 0 : plus(x) === 0 && minus(x) === -2 * x)) && domIs(quo, (x) => x !== 0) && xs16.filter((x) => x !== 0).every((x) => quo(x) === sgn(x)), 'pieces of f + g, f - g and f / g'); C.model(['2x', '-2x', 1, '-1']); });
}
{
  const f = (x) => 3 ** x - 2, g = (x) => Math.log2(x - 3);
  const xf = (y) => Math.log(y + 2) / Math.log(3), xg = (y) => 3 + 2 ** y;
  Q('s312', mk.short({ marks: 3, stem: r`State the domain and range of the exponential function $f(x) = 3^x - 2$ and of the logarithmic function $g(x) = \log_2 (x - 3)$.`, model: r`$3^x$ is defined for all real $x$ and is always positive, taking every positive value; subtracting $2$ gives domain $\mathbb{R}$ and range $(-2, \infty)$. For $g$ we need $x - 3 > 0$, so the domain is $(3, \infty)$; and $\log_2 (x - 3)$ takes every real value (use $x = 3 + 2^y$), so the range is $\mathbb{R}$.`, sol: 'Exponentials are positive; logarithms need a positive argument.', scheme: [['$f$: domain $\\mathbb{R}$, range $(-2, \\infty)$', 1], ['$g$: domain $(3, \\infty)$', 1], ['$g$: range $\\mathbb{R}$', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { C.assert(xs16.filter((x) => x <= 10).every((x) => f(x) > -2) && [-1.9, 0, 5, 100].every((y) => near(f(xf(y)), y, 1e-9)) && !(xf(-2) > -1e9 && Number.isFinite(xf(-2))) && domIs(g, (x) => x > 3) && [-6, 0, 3, 10].every((y) => near(g(xg(y)), y, 1e-9)), 'ranges and domains'); C.model([2, 3]); });
}

// =============================================================== long answer (5 marks, in parts)
{
  const A = [2, 3, 5], B = [1, 4];
  const R = relFrom(A, B, (x, y) => x > y);
  Q('l01', mk.long({ stem: r`Let $A = \{2, 3, 5\}$ and $B = \{1, 4\}$.

(a) List the elements of $A \times B$ and state $n(B \times A)$. [2]

(b) The relation $R$ from $A$ to $B$ is given by $x\,R\,y$ when $x > y$. Write $R$ in roster form, find its domain and range, and decide with a reason whether $R$ is a function. [3]`, model: r`(a) $A \times B = \{(2, 1), (2, 4), (3, 1), (3, 4), (5, 1), (5, 4)\}$ and $n(B \times A) = 2 \times 3 = 6$.

(b) Test each pair of $A \times B$ for $x > y$: $(2, 1)$, $(3, 1)$, $(5, 1)$ and $(5, 4)$ pass; $(2, 4)$, $(3, 4)$ fail. So $R = \{(2, 1), (3, 1), (5, 1), (5, 4)\}$. Domain $= \{2, 3, 5\}$ and range $= \{1, 4\}$. $R$ is **not** a function, because the element $5$ has two images, $1$ and $4$.`, sol: 'List the product, filter by the rule, then count the images of each element.', scheme: [['(a) $A \\times B$ listed', 1], ['(a) $n(B \\times A) = 6$', 1], ['(b) Roster form of $R$', 1], ['(b) Domain and range', 1], ['(b) Not a function: $5$ has two images', 1]], d: 3, c: 'application', t: [1, 2, 3], time: 360 }), (C) => { C.assert(prod(A, B).length === 6 && R.length === 4 && sameSet(domOf(R), [2, 3, 5]) && sameSet(rngOf(R), [1, 4]) && !isFunctionFrom(A, R) && has(R, 5, 1) && has(R, 5, 4), 'listing, relation and verdict'); C.model([6, 4, 5, 1]); });
}
{
  const A = [1, 2, 3], B = ['u', 'v'];
  const rels = allRelations(A, B);
  const full = rels.filter((R) => A.every((a) => R.some(([x]) => x === a)));
  const fns = allFunctions(A, B);
  Q('l02', mk.long({ stem: r`A set $A$ has $3$ elements and a set $B$ has $2$ elements.

(a) Find $n(A \times B)$ and the number of relations from $A$ to $B$. [2]

(b) How many of these relations give every element of $A$ at least one partner in $B$? Of these, how many are functions from $A$ to $B$? [3]`, model: r`(a) $n(A \times B) = 3 \times 2 = 6$, and each of the $6$ pairs is present or absent, so there are $2^6 = 64$ relations.

(b) For one element of $A$ the possible sets of partners in $B = \{u, v\}$ are $\{u\}$, $\{v\}$ and $\{u, v\}$: $3$ non-empty choices. The three elements choose independently, so there are $3^3 = 27$ such relations. A function allows only one partner each, $2$ choices per element, giving $2^3 = 8$ functions.`, sol: 'Count the choices per element of A, then multiply.', scheme: [['(a) $n(A \\times B) = 6$', 1], ['(a) $2^6 = 64$', 1], ['(b) Three non-empty choices per element', 1], ['(b) $3^3 = 27$ relations', 1], ['(b) $2^3 = 8$ functions', 1]], d: 4, c: 'analysis', t: [1, 2, 3], time: 420 }), (C) => { C.assert(prod(A, B).length === 6 && rels.length === 64 && full.length === 27 && fns.length === 8 && fns.every((F) => isFunctionFrom(A, F)), '6, 64, 27, 8'); C.model([6, 64, 27, 8]); });
}
{
  const f = (x) => 5 / (x - 2), g = (x) => 2 * Math.sqrt(16 - x * x);
  const xf = (y) => 2 + 5 / y, xg = (y) => Math.sqrt(16 - (y / 2) ** 2);
  const vals = xs16.filter((x) => Math.abs(x) <= 4).map(g);
  Q('l03', mk.long({ stem: r`Find the domain and the range of each real function.

(a) $f(x) = \dfrac{5}{x - 2}$ [2]

(b) $g(x) = 2\sqrt{16 - x^2}$ [3]`, model: r`(a) The denominator vanishes at $x = 2$, so the domain is $\mathbb{R} - \{2\}$. Put $y = \dfrac{5}{x - 2}$; then $x = 2 + \dfrac{5}{y}$ exists for every $y \ne 0$, and $y = 0$ is impossible because $5 \ne 0$. The range is $\mathbb{R} - \{0\}$.

(b) $16 - x^2 \ge 0$ gives $-4 \le x \le 4$: domain $[-4, 4]$. On it $0 \le 16 - x^2 \le 16$, so $0 \le \sqrt{16 - x^2} \le 4$ and $0 \le g(x) \le 8$, with $0$ at $x = \pm 4$ and $8$ at $x = 0$. Every value between occurs, so the range is $[0, 8]$.`, sol: 'Domain from the restriction; range by solving for x or bounding.', scheme: [['(a) Domain $\\mathbb{R} - \\{2\\}$', 1], ['(a) Range $\\mathbb{R} - \\{0\\}$ with reason', 1], ['(b) Domain $[-4, 4]$', 1], ['(b) Bounds of the root, times $2$', 1], ['(b) Range $[0, 8]$', 1]], d: 3, c: 'application', t: [3], time: 360 }), (C) => { C.assert(domIs(f, (x) => x !== 2) && [-7, -0.5, 0.25, 3].every((y) => attain(f, xf, y)) && !attain(f, xf, 0) && xs16.every((x) => !Number.isFinite(f(x)) || f(x) !== 0), '(a)'); C.assert(domIs(g, (x) => Math.abs(x) <= 4) && Math.min(...vals) === 0 && Math.max(...vals) === 8 && [0, 1, 4, 7.5, 8].every((y) => attain(g, xg, y)) && !attain(g, xg, 8.5), '(b)'); C.model([2, 5, 0, 8]); });
}
{
  const f = (x) => Math.abs(x - 2) - Math.abs(x + 1);
  const pw = (x) => (x < -1 ? 3 : x <= 2 ? 1 - 2 * x : -3);
  const vals = xs16.map(f);
  const zeros = xs16.filter((x) => f(x) === 0);
  Q('l04', mk.long({ stem: r`Consider $f(x) = |x - 2| - |x + 1|$.

(a) Write $f(x)$ without modulus signs on $x < -1$, on $-1 \le x \le 2$ and on $x > 2$. [2]

(b) Hence find the range of $f$, and solve $f(x) = 0$. [3]`, model: r`(a) For $x < -1$: $|x - 2| = 2 - x$ and $|x + 1| = -x - 1$, so $f(x) = (2 - x) - (-x - 1) = 3$. For $-1 \le x \le 2$: $|x - 2| = 2 - x$ and $|x + 1| = x + 1$, so $f(x) = 1 - 2x$. For $x > 2$: $f(x) = (x - 2) - (x + 1) = -3$.

(b) On the middle piece $1 - 2x$ falls steadily from $3$ (at $x = -1$) to $-3$ (at $x = 2$), so every value from $-3$ to $3$ occurs, and the outer pieces give only $3$ and $-3$. The range is $[-3, 3]$. Solving $1 - 2x = 0$ gives $x = \dfrac12$, which lies in $[-1, 2]$, and the outer pieces never give $0$; so $x = \dfrac12$ only.`, sol: 'Remove the moduli interval by interval, then read the values off each piece.', scheme: [['(a) Piece $3$ for $x < -1$', 1], ['(a) Pieces $1 - 2x$ and $-3$', 1], ['(b) Values of the middle piece from $3$ to $-3$', 1], ['(b) Range $[-3, 3]$', 1], ['(b) $x = \\dfrac12$ only', 1]], d: 4, c: 'analysis', t: [4], time: 420 }), (C) => { C.assert(xs16.every((x) => near(f(x), pw(x))) && Math.min(...vals) === -3 && Math.max(...vals) === 3 && zeros.join() === '0.5', 'pieces, range [-3, 3], single zero 1/2'); C.assert([-3, -1.5, 0, 2.9, 3].every((y) => xs16.some((x) => near(f(x), y, 1e-9)) || near(f((1 - y) / 2), y, 1e-9)), 'all values reached'); C.model([3, -3, '\\dfrac12', '1 - 2x']); });
}
{
  const fine = (d) => 2 * fl(d / 7);
  const pieces = [[0, 7, 0], [7, 14, 2], [14, 21, 4], [21, 28, 6]];
  const days = range(0, 27);
  Q('l05', mk.long({ stem: r`An imaginary school library charges a fine of $\text{₹}\,2$ for every **completed** week of delay. For a delay of $d$ days with $0 \le d < 28$ the fine is $F(d) = 2\left[\dfrac{d}{7}\right]$ rupees, where $[\cdot]$ is the greatest integer function.

(a) Find the fine for delays of $6$, $7$, $20$ and $21$ days. [2]

(b) Write $F$ as a table of pieces, say at which values of $d$ the fine jumps, and give the range of $F$. [3]`.replace(String.raw`$\text{₹}\,2$`, 'two rupees'), model: r`(a) $F(6) = 2[0.857\ldots] = 0$; $F(7) = 2[1] = 2$; $F(20) = 2[2.857\ldots] = 4$; $F(21) = 2[3] = 6$. So the fines are $0$, $2$, $4$ and $6$ rupees.

(b) $F(d) = 0$ for $0 \le d < 7$; $2$ for $7 \le d < 14$; $4$ for $14 \le d < 21$; $6$ for $21 \le d < 28$. The fine jumps at $d = 7, 14, 21$, where a week is completed. The range is $\{0, 2, 4, 6\}$.`, sol: 'Divide by 7 first, take the greatest integer, then double.', scheme: [['(a) $F(6) = 0$ and $F(7) = 2$', 1], ['(a) $F(20) = 4$ and $F(21) = 6$', 1], ['(b) Four pieces', 1], ['(b) Jumps at $7, 14, 21$', 1], ['(b) Range $\\{0, 2, 4, 6\\}$', 1]], d: 3, c: 'application', t: [4], time: 360 }), (C) => { C.assert(fine(6) === 0 && fine(7) === 2 && fine(20) === 4 && fine(21) === 6, '(a)'); C.assert(pieces.every(([a, b, v]) => days.filter((d) => d >= a && d < b).every((d) => fine(d) === v)) && sameSet([...new Set(days.map(fine))], [0, 2, 4, 6]), '(b)'); C.model([0, 2, 4, 6, 7, 14, 21]); });
}
{
  const f = (x) => Math.sqrt(x + 1), g = (x) => 1 / (x - 3);
  const fg = (x) => f(x) * g(x), sum = (x) => f(x) + g(x), q = (x) => (Number.isFinite(g(x)) ? f(x) / g(x) : NaN);
  Q('l06', mk.long({ stem: r`Let $f(x) = \sqrt{x + 1}$ and $g(x) = \dfrac{1}{x - 3}$.

(a) State the domain of $f$ and of $g$. [1]

(b) Find $f + g$ and $fg$, and their common domain. [2]

(c) Find $\dfrac{f}{g}$ with its domain, and evaluate it at $x = 8$. [2]`, model: r`(a) $f$ needs $x + 1 \ge 0$: domain $[-1, \infty)$. $g$ needs $x \ne 3$: domain $\mathbb{R} - \{3\}$.

(b) $(f + g)(x) = \sqrt{x + 1} + \dfrac{1}{x - 3}$ and $(fg)(x) = \dfrac{\sqrt{x + 1}}{x - 3}$, both on the common domain $[-1, \infty) - \{3\}$.

(c) $\dfrac{f}{g}(x) = \sqrt{x + 1}\,(x - 3)$. Since $g(x) = \dfrac{1}{x - 3}$ is never $0$, nothing more is removed: the domain is $[-1, \infty) - \{3\}$. At $x = 8$: $f(8) = 3$ and $g(8) = \dfrac15$, so $\dfrac{f}{g}(8) = \dfrac{3}{1/5} = 15$.`, sol: 'Intersect the domains; the quotient loses only zeros of g, and g has none.', scheme: [['(a) Both domains', 1], ['(b) $f + g$ and $fg$ expressions', 1], ['(b) Common domain $[-1, \\infty) - \\{3\\}$', 1], ['(c) $\\dfrac{f}{g}(x) = (x - 3)\\sqrt{x + 1}$ and its domain', 1], ['(c) Value $15$', 1]], d: 4, c: 'analysis', t: [3, 5], time: 420 }), (C) => { const dom = (x) => x >= -1 && x !== 3; C.assert(domIs(f, (x) => x >= -1) && domIs(g, (x) => x !== 3) && domIs(sum, dom) && domIs(fg, dom) && domIs(q, dom), 'domains'); C.assert(near(q(8), 15) && xs16.filter(dom).every((x) => near(q(x), (x - 3) * Math.sqrt(x + 1), 1e-9)), 'quotient simplifies, value 15'); C.model([3, 15, '[-1, \\infty)']); });
}
{
  const R = (x) => 40 * x, Cst = (x) => 600 + 15 * x;
  const P = (x) => R(x) - Cst(x);
  const be = range(0, 100).filter((x) => P(x) === 0);
  Q('l07', mk.long({ stem: r`A school stall (imaginary) sells $x$ whole badges. The revenue is $R(x) = 40x$ rupees and the cost is $C(x) = 600 + 15x$ rupees.

(a) Find the profit function $P = R - C$ as an expression in $x$, and say what values $x$ can take. [2]

(b) Find the number of badges at which the stall breaks even. [1]

(c) Find the function $\dfrac{R}{C}$, and evaluate it at $x = 60$. [2]`, model: r`(a) $P(x) = R(x) - C(x) = 40x - (600 + 15x) = 25x - 600$ rupees, for $x = 0, 1, 2, \dots$ (whole numbers of badges).

(b) Break-even means $P(x) = 0$: $25x = 600$, so $x = 24$ badges.

(c) $\dfrac{R}{C}(x) = \dfrac{40x}{600 + 15x}$, defined for every $x \ge 0$ since $C(x) \ge 600 > 0$. At $x = 60$: $\dfrac{2400}{600 + 900} = \dfrac{2400}{1500} = 1.6$, so revenue is $1.6$ times the cost.`, sol: 'Subtract the rules for profit; divide them for the ratio.', scheme: [['(a) $P(x) = 25x - 600$', 1], ['(a) Whole numbers $x \\ge 0$', 1], ['(b) $x = 24$', 1], ['(c) $\\dfrac{R}{C}(x) = \\dfrac{40x}{600 + 15x}$', 1], ['(c) Value $1.6$', 1]], d: 3, c: 'application', t: [5], time: 360 }), (C) => { C.assert(range(0, 100).every((x) => P(x) === 25 * x - 600) && be.join() === '24', 'P(x), break-even 24'); C.assert(near(R(60) / Cst(60), 1.6) && range(0, 100).every((x) => Cst(x) > 0), 'ratio 1.6, C never 0'); C.model([25, 600, 24, 1.6]); });
}

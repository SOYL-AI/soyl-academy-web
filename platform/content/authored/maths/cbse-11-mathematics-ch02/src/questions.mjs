// CBSE 11 Mathematics ch02 Relations and Functions — objective items (mcq, assertion-reason, true-false, fill-blank, numerical)
// with independent re-solve checks: sets, pairs and relations are listed and tested by brute force;
// real functions are evaluated on exact binary grids; ranges are tested by solving f(x) = y.
import { Q, mk } from './lib.mjs';
import { prod, relFrom, domOf, rngOf, isFunctionFrom, sameSet, allRelations, allFunctions, range, near, okX, fl, sgn } from './rel.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, notin) becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
// exact binary grid on [-20, 20] (steps of 1/16), so interval end points are hit exactly
export const xsq = range(-320, 320).map((k) => k / 16);

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`For two non-empty sets $A$ and $B$, the Cartesian product $A \times B$ is the set of`, opts: [r`all ordered pairs $(a, b)$ with $a \in A$ and $b \in B$`, r`all elements that belong to both $A$ and $B$`, r`all unordered pairs $\{a, b\}$ with $a \in A$ and $b \in B$`, r`all ordered pairs $(b, a)$ with $b \in B$ and $a \in A$`], key: 'a', sol: r`The first entry of each pair comes from $A$ and the second from $B$, and the order matters. Option (d) describes $B \times A$ and (b) is the intersection.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.key('a'));
Q('m02', mk.mcq({ stem: r`A set $A$ has $4$ elements and a set $B$ has $5$ elements. The Cartesian product $A \times B$ has how many elements?`, opts: ['$9$', '$16$', '$20$', '$25$'], key: 'c', sol: r`Each of the $4$ elements of $A$ pairs with each of the $5$ elements of $B$: $4 \times 5 = 20$ ordered pairs. Option (a) adds instead of multiplying.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => C.which([9, 16, 20, 25], prod(range(1, 4), range(1, 5)).length));
{
  let x = null, y = null;
  for (const a of range(-20, 20)) for (const b of range(-20, 20)) if (2 * a + 1 === 9 && 3 * b - 4 === 11) { x = a; y = b; }
  Q('m03', mk.mcq({ stem: r`Two ordered pairs are equal: $(2x + 1,\ 3y - 4) = (9,\ 11)$. Then $x + y$ is`, opts: ['$9$', '$11$', '$13$', '$15$'], key: 'a', sol: r`Equal ordered pairs have equal entries in the same positions: $2x + 1 = 9$ gives $x = 4$ and $3y - 4 = 11$ gives $y = 5$, so $x + y = 9$. Forgetting to divide by $2$ or by $3$ leads to $13$ and $11$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(x === 4 && y === 5, 'x = 4, y = 5'); const bad1 = 8 + y, bad2 = x + 7, bad3 = 8 + 7; C.which([x + y, bad2, bad1, bad3], x + y); });
}
Q('m04', mk.mcq({ stem: r`Let $A = \{1, 2, 3\}$ and $B = \{2, 4\}$. Which ordered pair is **not** an element of $A \times B$?`, opts: ['$(1, 2)$', '$(3, 4)$', '$(2, 3)$', '$(2, 2)$'], key: 'c', sol: r`A pair $(a, b)$ is in $A \times B$ only if $a \in A$ and $b \in B$. In $(2, 3)$ the second entry $3$ is not in $B$.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => { const P = prod([1, 2, 3], [2, 4]); const has2 = (a, b) => P.some(([u, v]) => u === a && v === b); C.which([has2(1, 2), has2(3, 4), has2(2, 3), has2(2, 2)], false); });
Q('m05', mk.mcq({ stem: r`A set $A$ satisfies $n(A \times A) = 49$ and a set $B$ has $5$ elements. Then $n(A \times B)$ equals`, opts: ['$12$', '$35$', '$49$', '$245$'], key: 'b', sol: r`$n(A)^2 = 49$ gives $n(A) = 7$, so $n(A \times B) = 7 \times 5 = 35$. Option (d) multiplies $49$ by $5$.`, d: 3, c: 'application', t: [1], time: 75 }), (C) => { const nA = range(1, 30).find((k) => k * k === 49); C.which([nA + 5, nA * 5, 49, 49 * 5], nA * 5); });
{
  const A = range(1, 9).filter((v) => v <= 3), B = range(-5, 5).filter((v) => Math.abs(v) <= 1);
  Q('m06', mk.mcq({ stem: r`$A = \{x \in \mathbb{N} : x \le 3\}$ and $B = \{y \in \mathbb{Z} : |y| \le 1\}$. The number of elements of $A \times B$ is`, opts: ['$5$', '$6$', '$9$', '$12$'], key: 'c', sol: r`$A = \{1, 2, 3\}$ and $B = \{-1, 0, 1\}$ both have $3$ elements, so $n(A \times B) = 3 \times 3 = 9$. Dropping the negative integer from $B$ gives the tempting $6$.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { C.assert(A.join() === '1,2,3' && B.join() === '-1,0,1', 'sets'); C.which([A.length + 2, A.length * 2, prod(A, B).length, A.length * 4], prod(A, B).length); });
}
{
  const A = [-2, -1, 0, 1, 2], B = [-1, 0, 1, 2, 3, 4];
  const R = relFrom(A, B, (x, y) => y === x * x - 1);
  Q('m07', mk.mcq({ stem: r`$R$ is the relation from $A = \{-2, -1, 0, 1, 2\}$ to $B = \{-1, 0, 1, 2, 3, 4\}$ given by $y = x^2 - 1$. The range of $R$ is`, opts: [r`$\{-1, 0, 3\}$`, r`$\{-1, 0, 1, 2, 3, 4\}$`, r`$\{0, 3\}$`, r`$\{-2, -1, 0, 1, 2\}$`], key: 'a', sol: r`The pairs are $(-2, 3), (-1, 0), (0, -1), (1, 0), (2, 3)$. The second entries are $3, 0, -1, 0, 3$, so the range is $\{-1, 0, 3\}$. Option (b) is the codomain and (d) is the domain.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => { C.assert(R.length === 5, '5 pairs'); const rg = rngOf(R); C.which([sameSet([-1, 0, 3], rg), sameSet(B, rg), sameSet([0, 3], rg), sameSet(A, rg)], true); });
}
Q('m08', mk.mcq({ stem: r`The number of different relations from a set $P$ with $2$ elements to a set $Q$ with $3$ elements is`, opts: ['$6$', '$8$', '$36$', '$64$'], key: 'd', sol: r`$P \times Q$ has $2 \times 3 = 6$ pairs and a relation is any subset of it: $2^6 = 64$. Option (a) is the number of pairs, not of subsets.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([6, 8, 36, 64], allRelations([1, 2], ['a', 'b', 'c']).length));
{
  const R = relFrom([1, 2, 3], [2, 3, 4], (x, y) => x < y);
  Q('m09', mk.mcq({ stem: r`A relation $R$ from $\{1, 2, 3\}$ to $\{2, 3, 4\}$ is given by $x\,R\,y$ if and only if $x < y$. How many ordered pairs does $R$ contain?`, opts: ['$4$', '$5$', '$6$', '$9$'], key: 'c', sol: r`$x = 1$ is below $2, 3, 4$ ($3$ pairs); $x = 2$ is below $3, 4$ ($2$ pairs); $x = 3$ is below $4$ ($1$ pair). Total $3 + 2 + 1 = 6$.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => C.which([4, 5, 6, 9], R.length));
}
Q('m10', mk.mcq({ stem: r`In a relation $R$ from a set $A$ to a set $B$, the codomain is`, opts: [r`the set $B$, whether or not every element of it occurs in $R$`, r`the set of all first entries of pairs in $R$`, r`the set of second entries that actually occur in $R$`, r`the set $A$`], key: 'a', sol: r`The domain is the set of first entries and the range is the set of second entries that occur. The codomain is the whole target set $B$.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => C.key('a'));
{
  const A = [1, 2, 3], B = ['a', 'b'];
  const cand = [[[1, 'a'], [2, 'b']], [[1, 'a'], [1, 'b'], [2, 'a'], [3, 'b']], [[1, 'a'], [2, 'a'], [3, 'b']], [[1, 'b'], [2, 'a'], [3, 'a'], [3, 'b']]];
  Q('m11', mk.mcq({ stem: r`Which of these relations from $\{1, 2, 3\}$ to $\{a, b\}$ is a function?`, opts: [r`$\{(1, a), (2, b)\}$`, r`$\{(1, a), (1, b), (2, a), (3, b)\}$`, r`$\{(1, a), (2, a), (3, b)\}$`, r`$\{(1, b), (2, a), (3, a), (3, b)\}$`], key: 'c', sol: r`A function gives **every** element of $\{1, 2, 3\}$ exactly one image. (a) leaves $3$ without an image; (b) gives $1$ two images; (d) gives $3$ two images. Only (c) works; two inputs may share an image.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which(cand.map((R) => isFunctionFrom(A, R)), true));
}
{
  const g = (x) => Math.sqrt(6 - 2 * x);
  const fin = (x) => Number.isFinite(g(x));
  const preds = [(x) => x <= 3, (x) => x >= 3, (x) => x <= 6, (x) => x >= 6];
  Q('m12', mk.mcq({ stem: r`The domain of the real function $f(x) = \sqrt{6 - 2x}$ is`, opts: [r`$(-\infty, 3]$`, r`$[3, \infty)$`, r`$(-\infty, 6]$`, r`$[6, \infty)$`], key: 'a', sol: r`The square root needs $6 - 2x \ge 0$, so $2x \le 6$ and $x \le 3$. Dividing by $-2$ would reverse an inequality, but here it is only moved across.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => C.which(preds.map((p) => xsq.every((x) => fin(x) === p(x))), true));
}
{
  const g = (x) => (x + 1) / (x * x - 4);
  const fin = (x) => Number.isFinite(g(x));
  const preds = [(x) => x !== 2, (x) => x !== 2 && x !== -2, (x) => x !== 4, (x) => x !== -1];
  Q('m13', mk.mcq({ stem: r`The real function $f(x) = \dfrac{x + 1}{x^2 - 4}$ has domain`, opts: [r`$\mathbb{R} - \{2\}$`, r`$\mathbb{R} - \{-2, 2\}$`, r`$\mathbb{R} - \{4\}$`, r`$\mathbb{R} - \{-1\}$`], key: 'b', sol: r`The function is undefined where the denominator is zero: $x^2 - 4 = (x - 2)(x + 2) = 0$ at $x = 2$ and $x = -2$. The numerator vanishing at $x = -1$ causes no problem.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => C.which(preds.map((p) => xsq.every((x) => fin(x) === p(x))), true));
}
{
  const g = (x) => 4 - 3 * x * x;
  const probes = [-100, 0, 3.9, 4, 4.5, 100];
  const attainable = (y) => { const t = (4 - y) / 3; return t >= 0 && near(g(Math.sqrt(t)), y, 1e-9); };
  const preds = [(y) => y <= 4, (y) => y >= 4, () => true, (y) => y < 4];
  Q('m14', mk.mcq({ stem: r`Which interval contains exactly the values taken by $f(x) = 4 - 3x^2$ as $x$ runs over all real numbers?`, opts: [r`$(-\infty, 4]$`, r`$[4, \infty)$`, r`$\mathbb{R}$`, r`$(-\infty, 4)$`], key: 'a', sol: r`Since $x^2 \ge 0$, $3x^2 \ge 0$ and $f(x) = 4 - 3x^2 \le 4$, with the value $4$ reached at $x = 0$. Large $|x|$ makes $f(x)$ as negative as we like. So the range is $(-\infty, 4]$.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => { C.assert(xsq.every((x) => g(x) <= 4) && g(0) === 4 && g(100) < -1000, 'max 4 at 0, unbounded below'); C.which(preds.map((p) => probes.every((y) => attainable(y) === p(y))), true); });
}
{
  const g = (x) => 1 / (x - 2);
  const probes = [-3, -0.5, 0, 0.5, 2, 7];
  const attainable = (y) => y !== 0 && near(g(2 + 1 / y), y, 1e-9);
  const preds = [() => true, (y) => y !== 0, (y) => y !== 2, (y) => y > 0];
  Q('m15', mk.mcq({ stem: r`The range of the real function $f(x) = \dfrac{1}{x - 2}$ is`, opts: [r`$\mathbb{R}$`, r`$\mathbb{R} - \{0\}$`, r`$\mathbb{R} - \{2\}$`, r`$(0, \infty)$`], key: 'b', sol: r`For a value $y \ne 0$, solving $\dfrac{1}{x - 2} = y$ gives $x = 2 + \dfrac1y$, which is a legitimate input. The value $0$ is never reached because a fraction with numerator $1$ is never $0$. The excluded value $2$ belongs to the domain, not the range.`, d: 3, c: 'analysis', t: [3], time: 90 }), (C) => { C.assert(xsq.every((x) => !Number.isFinite(g(x)) || Math.abs(g(x)) > 1e-3), '1/(x-2) never 0'); C.which(preds.map((p) => probes.every((y) => attainable(y) === p(y))), true); });
}
Q('m16', mk.mcq({ stem: r`Here $[x]$ is the greatest integer not exceeding $x$ and $\operatorname{sgn}$ is the signum function. The value of $[-2.3] - \operatorname{sgn}(-4) + [1.8]$ is`, opts: ['$-3$', '$-1$', '$0$', '$1$'], key: 'b', sol: r`$[-2.3] = -3$ (the greatest integer not above $-2.3$), $\operatorname{sgn}(-4) = -1$ and $[1.8] = 1$. So the value is $-3 - (-1) + 1 = -1$. Truncating $-2.3$ to $-2$ would give $0$.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => C.which([fl(-2.3) + sgn(-4) + fl(1.8), fl(-2.3) - sgn(-4) + fl(1.8), -2 - sgn(-4) + fl(1.8), -2 - sgn(-4) + 2], fl(-2.3) - sgn(-4) + fl(1.8)));
{
  const g = (x) => Math.abs(x + 3) - 1;
  const grid = range(-160, 160).map((k) => k / 16);
  const best = grid.reduce((m, x) => (g(x) < g(m) ? x : m), grid[0]);
  Q('m17', mk.mcq({ stem: r`The lowest point on the graph of $y = |x + 3| - 1$ is`, opts: ['$(3, -1)$', '$(-3, -1)$', '$(-3, 1)$', '$(3, 1)$'], key: 'b', sol: r`$|x + 3|$ is smallest ($0$) when $x + 3 = 0$, that is $x = -3$, and then $y = 0 - 1 = -1$. The graph of $|x|$ has been shifted $3$ units left and $1$ unit down.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([[3, -1], [-3, -1], [-3, 1], [3, 1]], [best, g(best)]));
}
{
  const f = (x) => Math.sqrt(x), g = (x) => x * x - 16;
  const fin = (x) => Number.isFinite(f(x) / g(x));
  const preds = [(x) => x >= 0, (x) => x >= 0 && x !== 4, (x) => x !== 4 && x !== -4, (x) => x > 0 && x !== 4];
  Q('m18', mk.mcq({ stem: r`For $f(x) = \sqrt{x}$ and $g(x) = x^2 - 16$, the domain of the quotient function $\dfrac{f}{g}$ is`, opts: [r`$[0, \infty)$`, r`$[0, \infty) - \{4\}$`, r`$\mathbb{R} - \{-4, 4\}$`, r`$(0, \infty) - \{4\}$`], key: 'b', sol: r`The domain of $f/g$ is the common domain $[0, \infty)$ with the zeros of $g$ removed. $g(x) = 0$ at $x = \pm 4$, and only $x = 4$ lies in $[0, \infty)$. The point $0$ stays, since $g(0) = -16 \ne 0$.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => C.which(preds.map((p) => xsq.every((x) => fin(x) === p(x))), true));
}
{
  const f = (x) => 2 * x - 1, g = (x) => x * x + 1;
  Q('m19', mk.mcq({ stem: r`If $f(x) = 2x - 1$ and $g(x) = x^2 + 1$, the value of the product function $(fg)(3)$ is`, opts: ['$-5$', r`$\dfrac{1}{2}$`, '$15$', '$50$'], key: 'd', sol: r`$(fg)(3) = f(3) \cdot g(3) = 5 \times 10 = 50$. Adding the two values would give $15$.`, d: 1, c: 'understanding', t: [4], time: 45 }), (C) => C.which([f(3) - g(3), f(3) / g(3), f(3) + g(3), f(3) * g(3)], f(3) * g(3)));
}
{
  const f = (x) => x + 3, g = (x) => x * x - 1;
  Q('m20', mk.mcq({ stem: r`With $f(x) = x + 3$ and $g(x) = x^2 - 1$, the composite $(g \circ f)(2)$ is`, opts: ['$6$', '$8$', '$24$', '$25$'], key: 'c', sol: r`$(g \circ f)(2) = g(f(2)) = g(5) = 25 - 1 = 24$. Applying $f$ after $g$ instead gives $f(g(2)) = f(3) = 6$.`, d: 2, c: 'application', t: [5], time: 60 }), (C) => { C.assert(f(g(2)) === 6 && f(2) + g(2) === 8, 'distractors from other orders'); C.which([f(g(2)), f(2) + g(2), g(f(2)), f(2) ** 2], g(f(2))); });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`If $n(A) = 3$ and $n(B) = 4$, then $n(A \times B) = n(B \times A)$.`, r: r`The sets $A \times B$ and $B \times A$ are equal for every pair of non-empty sets $A$ and $B$.`, key: 'c', sol: r`A is true: both products have $3 \times 4 = 12$ pairs. R is false: for $A = \{1\}$ and $B = \{2\}$, $A \times B = \{(1, 2)\}$ but $B \times A = \{(2, 1)\}$. They have the same size, not the same elements.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(prod(range(1, 3), range(1, 4)).length === prod(range(1, 4), range(1, 3)).length, 'same size'); C.assert(!sameSet(prod([1], [2]), prod([2], [1])), 'not equal as sets'); C.key('c'); });
Q('ar2', mk.ar({ a: r`There are exactly $2^6 = 64$ relations from a set $P$ with $2$ elements to a set $Q$ with $3$ elements.`, r: r`Every relation from $P$ to $Q$ is a subset of $P \times Q$, which has six pairs, and each pair is either present in the relation or absent from it.`, key: 'a', sol: r`Choosing present or absent for each of the six pairs independently gives $2^6$ subsets, and every subset is a relation. R is true and is precisely the counting argument behind A.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(allRelations([1, 2], ['a', 'b', 'c']).length === 64, '64'); C.key('a'); });
Q('ar3', mk.ar({ a: r`The domain of the real function $f(x) = \dfrac{1}{x - 2}$ is the whole set $\mathbb{R}$.`, r: r`The expression $\dfrac{1}{x - 2}$ is not defined at $x = 2$.`, key: 'd', sol: r`R is true: the denominator is $0$ at $x = 2$. That makes A false, because $2$ cannot be an input, so the domain is $\mathbb{R} - \{2\}$.`, d: 2, c: 'understanding', t: [3] }), (C) => { const g = (x) => 1 / (x - 2); C.assert(!Number.isFinite(g(2)) && Number.isFinite(g(2.5)), 'undefined at 2 only'); C.key('d'); });
Q('ar4', mk.ar({ a: r`The range of the modulus function $f(x) = |x|$ is $[0, \infty)$.`, r: r`The domain of the modulus function $f(x) = |x|$ is $\mathbb{R}$.`, key: 'b', sol: r`Both are true. R states the inputs allowed, but the range depends on the values $|x|$ takes: never negative, and every $y \ge 0$ occurs (at $x = y$). So R does not explain A.`, d: 3, c: 'analysis', t: [3] }), (C) => { C.assert(xsq.every((x) => Math.abs(x) >= 0) && [0, 0.25, 3, 17].every((y) => Math.abs(y) === y), 'range [0, inf)'); C.key('b'); });
Q('ar5', mk.ar({ a: r`The relation $\{(x, y) : x = y^2\}$ on $\mathbb{R}$ is not a function from $\mathbb{R}$ to $\mathbb{R}$.`, r: r`The vertical line $x = 4$ meets the graph of $x = y^2$ at the two points $(4, 2)$ and $(4, -2)$.`, key: 'a', sol: r`The input $4$ has two outputs, $2$ and $-2$, so one input is not sent to exactly one output. R gives exactly that failure, so it explains A.`, d: 2, c: 'application', t: [3] }), (C) => { C.assert(2 * 2 === 4 && (-2) * (-2) === 4, 'both pairs satisfy x = y^2'); C.key('a'); });
Q('ar6', mk.ar({ a: r`If $f(x) = x + 3$ and $g(x) = x^2$, then $(g \circ f)(x) = (x + 3)^2$.`, r: r`For every pair of real functions $f$ and $g$, the composites $g \circ f$ and $f \circ g$ are the same function.`, key: 'c', sol: r`A is true because $(g \circ f)(x) = g(f(x)) = (x + 3)^2$. R is false: $(f \circ g)(x) = x^2 + 3$, which differs from $(x + 3)^2$ (at $x = 1$ the values are $4$ and $16$).`, d: 3, c: 'analysis', t: [5] }), (C) => { const f = (x) => x + 3, g = (x) => x * x; C.assert(xsq.every((x) => near(g(f(x)), (x + 3) ** 2)) && f(g(1)) === 4 && g(f(1)) === 16, 'gf = (x+3)^2, fg(1) = 4, gf(1) = 16'); C.key('c'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`For two non-empty sets $A \ne B$, the sets $A \times B$ and $B \times A$ are equal.`, key: 'f', sol: r`If $a \in A$ with $a \notin B$ and $b \in B$, then $(a, b) \in A \times B$ but $(a, b) \notin B \times A$. For example $\{1\} \times \{2\} = \{(1, 2)\}$ and $\{2\} \times \{1\} = \{(2, 1)\}$.`, d: 2, c: 'understanding', t: [1] }), (C) => { for (const [A, B] of [[[1], [2]], [[1, 2], [3]], [[1, 2], [2, 3]]]) C.assert(!sameSet(prod(A, B), prod(B, A)), `${A} x ${B}`); C.key('f'); });
Q('tf2', mk.tf({ stem: r`Every function from a set $A$ to a set $B$ is a relation from $A$ to $B$, but a relation from $A$ to $B$ need not be a function.`, key: 't', sol: r`A function is a set of pairs, so it is a subset of $A \times B$. A relation can leave an element of $A$ without a pair or give it two pairs, which a function cannot. (From $\{1, 2\}$ to $\{a, b\}$ there are $16$ relations but only $4$ functions.)`, d: 2, c: 'understanding', t: [3] }), (C) => { const A = [1, 2], B = ['a', 'b']; const R = allRelations(A, B); const F = R.filter((x) => isFunctionFrom(A, x)); C.assert(R.length === 16 && F.length === 4 && allFunctions(A, B).length === 4, '16 relations, 4 functions'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`The signum function takes exactly three values: $-1$, $0$ and $1$.`, key: 't', sol: r`$\operatorname{sgn}(x) = 1$ for $x > 0$, $0$ for $x = 0$ and $-1$ for $x < 0$, so its range is $\{-1, 0, 1\}$.`, d: 1, c: 'recall', t: [3] }), (C) => C.assert(sameSet([...new Set(xsq.map(sgn))], [-1, 0, 1]), 'range {-1, 0, 1}') || C.key('t'));
Q('tf4', mk.tf({ stem: r`For every real number $x$, the greatest integer function satisfies $[-x] = -[x]$.`, key: 'f', sol: r`Take $x = 1.5$: $[-1.5] = -2$ but $-[1.5] = -1$. The statement holds only when $x$ is an integer.`, d: 3, c: 'analysis', t: [3] }), (C) => { C.assert(fl(-1.5) === -2 && -fl(1.5) === -1, 'counterexample 1.5'); C.assert(xsq.filter((x) => fl(-x) === -fl(x)).every((x) => Number.isInteger(x)), 'only integers satisfy it'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`The real function $f(x) = x^2 - 1$ takes every value in $[-1, \infty)$ and no other.`, key: 't', sol: r`$x^2 - 1 \ge -1$, with equality at $x = 0$. For any $y \ge -1$, the input $x = \sqrt{y + 1}$ gives $f(x) = y$. So the range is exactly $[-1, \infty)$.`, d: 2, c: 'application', t: [3] }), (C) => { const g = (x) => x * x - 1; C.assert(xsq.every((x) => g(x) >= -1) && [-1, -0.5, 0, 3, 99].every((y) => near(g(Math.sqrt(y + 1)), y)), 'range [-1, inf)'); C.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`If a set $A$ has $6$ elements, then $A \times A$ contains exactly ____ ordered pairs.`, acc: [['36']], sol: r`Each of the $6$ first entries can be paired with any of the $6$ second entries: $6 \times 6 = 36$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(prod(range(1, 6), range(1, 6)).length));
Q('fb2', mk.fill({ stem: r`The range of the signum function consists of exactly ____ real numbers.`, acc: [['3', 'three', 'Three']], sol: r`The range is $\{-1, 0, 1\}$, which has $3$ elements.`, d: 1, c: 'recall', t: [3] }), (C) => C.blank([...new Set(xsq.map(sgn))].length));
Q('fb3', mk.fill({ stem: r`On the greatest integer function, $[-0.4]$ takes the value ____.`, acc: [['-1']], sol: r`The greatest integer not exceeding $-0.4$ is $-1$, so $[-0.4] = -1$.`, d: 2, c: 'understanding', t: [3] }), (C) => C.blank(fl(-0.4)));
Q('fb4', mk.fill({ stem: r`Over all real $x$, the smallest value of the expression $|x - 4| + 3$ is ____.`, acc: [['3']], sol: r`$|x - 4| \ge 0$, with $0$ reached at $x = 4$. So the smallest value is $0 + 3 = 3$.`, d: 2, c: 'application', t: [3] }), (C) => C.blank(Math.min(...xsq.map((x) => Math.abs(x - 4) + 3))));
Q('fb5', mk.fill({ stem: r`For $f(x) = 3x$ and $g(x) = x - 2$, the composite value $(g \circ f)(4)$ equals ____.`, acc: [['10']], sol: r`$f(4) = 12$ and $g(12) = 12 - 2 = 10$.`, d: 2, c: 'application', t: [5] }), (C) => C.blank((4 * 3) - 2));

// =============================================================== numerical
{
  const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((p) => p < 2 || n % p !== 0);
  const A = range(1, 11).filter(isPrime), B = range(1, 19).filter((v) => v % 3 === 0);
  Q('n01', mk.num({ stem: r`$A$ is the set of primes below $12$ and $B$ is the set of multiples of $3$ strictly between $0$ and $20$. Find $n(A \times B)$.`, value: 30, sol: r`$A = \{2, 3, 5, 7, 11\}$ has $5$ elements and $B = \{3, 6, 9, 12, 15, 18\}$ has $6$. So $n(A \times B) = 5 \times 6 = 30$.`, scheme: [['n(A) = 5 and n(B) = 6', 0.5], ['30', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.assert(A.join() === '2,3,5,7,11' && B.join() === '3,6,9,12,15,18', 'sets'); C.val(prod(A, B).length); });
}
Q('n02', mk.num({ stem: r`How many **non-empty** relations are there from a set with $2$ elements to a set with $3$ elements?`, value: 63, sol: r`There are $2^6 = 64$ relations in all, one of which is the empty relation. So the number of non-empty relations is $64 - 1 = 63$.`, scheme: [['64 relations in all', 0.5], ['63', 0.5]], d: 3, c: 'application', t: [2], time: 75 }), (C) => C.val(allRelations([1, 2], ['a', 'b', 'c']).filter((R) => R.length > 0).length));
{
  const R = relFrom(range(1, 8), range(1, 8), (x, y) => x * y === 12);
  Q('n03', mk.num({ stem: r`$x$ and $y$ are taken from $\{1, 2, \dots, 8\}$ and $R$ collects every pair $(x, y)$ with $xy = 12$. How many ordered pairs does $R$ have?`, value: 4, sol: r`The factor pairs of $12$ with both factors at most $8$ are $(2, 6), (3, 4), (4, 3), (6, 2)$. The pairs $(1, 12)$ and $(12, 1)$ fail because $12$ is not in the set. So $|R| = 4$.`, scheme: [['4', 1]], d: 3, c: 'application', t: [2], time: 90 }), (C) => { C.assert(JSON.stringify(R) === '[[2,6],[3,4],[4,3],[6,2]]', JSON.stringify(R)); C.val(R.length); });
}
{
  const f = (x) => 2 * x * x - 3 * x + 1;
  Q('n04', mk.num({ stem: r`A real function is defined by $f(x) = 2x^2 - 3x + 1$. Find $f(-2)$.`, value: 15, sol: r`$f(-2) = 2(-2)^2 - 3(-2) + 1 = 8 + 6 + 1 = 15$.`, scheme: [['15', 1]], d: 1, c: 'understanding', t: [3], time: 45 }), (C) => C.val(f(-2)));
}
{
  const g = (x) => Math.sqrt(25 - x * x);
  const vals = xsq.filter((x) => Math.abs(x) <= 5).map(g);
  const ints = range(0, 5).filter((k) => near(g(Math.sqrt(25 - k * k)), k, 1e-9));
  Q('n05', mk.num({ stem: r`For the real function $f(x) = \sqrt{25 - x^2}$, how many **integers** lie in its range?`, value: 6, sol: r`The domain is $[-5, 5]$. Since $0 \le 25 - x^2 \le 25$, the values satisfy $0 \le f(x) \le 5$ and every number in $[0, 5]$ is reached. The integers $0, 1, 2, 3, 4, 5$ give a count $= 6$.`, scheme: [['6', 1]], d: 3, c: 'analysis', t: [3], time: 120 }), (C) => { C.assert(Math.min(...vals) === 0 && Math.max(...vals) === 5, 'range [0, 5]'); C.val(ints.length); });
}
{
  const f = (x) => x * x + 1, g = (x) => 3 * x - 4;
  Q('n06', mk.num({ stem: r`Let $f(x) = x^2 + 1$ and $g(x) = 3x - 4$. Evaluate the quotient function $\left(\dfrac{f}{g}\right)(2)$.`, value: 2.5, sol: r`$f(2) = 5$ and $g(2) = 2 \ne 0$, so $\left(\dfrac{f}{g}\right)(2) = \dfrac{5}{2} = 2.5$.`, scheme: [['2.5', 1]], d: 2, c: 'understanding', t: [4], time: 60 }), (C) => C.val(f(2) / g(2)));
}

// =============================================================== extra practice (recall and understanding level)
{
  const P = prod([1, 2], ['p']);
  const cand = [[[1, 'p'], [2, 'p']], [['p', 1], ['p', 2]], [[1, 'p'], [2, 'p'], [1, 2]], [[1, 2], ['p', 'p']]];
  Q('m21', mk.mcq({ stem: r`For $A = \{1, 2\}$ and $B = \{p\}$, the Cartesian product $A \times B$ is`, opts: [r`$\{(1, p), (2, p)\}$`, r`$\{(p, 1), (p, 2)\}$`, r`$\{1, 2, p\}$`, r`$\{(1, 2), (p, p)\}$`], key: 'a', sol: r`Each element of $A$ is the first entry, paired with the only element $p$ of $B$. Option (b) is $B \times A$, and (c) is just the union of the sets.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([cand[0], cand[1], [1, 2, 'p'], cand[3]].map((S, k) => (k === 2 ? false : sameSet(S, P))), true));
}
{
  const f = (x) => x * x, g = (x) => 3 * x;
  const opts = [(x) => x * x + 3 * x, (x) => 3 * x ** 3, (x) => 3 * x * x, (x) => x * x - 3 * x];
  Q('m22', mk.mcq({ stem: r`For the real functions $f(x) = x^2$ and $g(x) = 3x$, the sum function $(f + g)(x)$ is`, opts: ['$x^2 + 3x$', '$3x^3$', '$3x^2$', '$x^2 - 3x$'], key: 'a', sol: r`$(f + g)(x) = f(x) + g(x) = x^2 + 3x$. Option (b) is the product $(fg)(x)$ and (d) is the difference.`, d: 1, c: 'understanding', t: [4], time: 45 }), (C) => C.which(opts.map((h) => xsq.every((x) => near(f(x) + g(x), h(x)))), true));
}
Q('tf6', mk.tf({ stem: r`The range of a relation from a set $A$ to a set $B$ is always a subset of the codomain $B$.`, key: 't', sol: r`The range collects second entries of pairs in $R \subseteq A \times B$, and every second entry is an element of $B$.`, d: 1, c: 'recall', t: [2] }), (C) => { const rels = allRelations([1, 2], ['a', 'b']); C.assert(rels.every((R) => rngOf(R).every((y) => ['a', 'b'].includes(y))), 'range inside B for all 16 relations'); C.key('t'); });
Q('tf7', mk.tf({ stem: r`For any two real functions $f$ and $g$ with the same domain, the functions $f - g$ and $g - f$ are equal.`, key: 'f', sol: r`Take $f(x) = x$ and $g(x) = 2x$: $(f - g)(1) = -1$ but $(g - f)(1) = 1$. The two are negatives of each other.`, d: 2, c: 'understanding', t: [4] }), (C) => { const f = (x) => x, g = (x) => 2 * x; C.assert(f(1) - g(1) === -1 && g(1) - f(1) === 1, 'counterexample at 1'); C.key('f'); });
Q('fb6', mk.fill({ stem: r`In set language, a relation from a set $A$ to a set $B$ is a ____ of the Cartesian product $A \times B$.`, acc: [['subset', 'Subset']], sol: r`A relation is any subset of $A \times B$, so the answer is subset.`, d: 1, c: 'recall', t: [2] }), (C) => C.blank('subset'));
Q('fb7', mk.fill({ stem: r`The sum $f + g$ of two real functions is defined exactly on the ____ of the domains of $f$ and $g$.`, acc: [['intersection', 'Intersection', 'common part']], sol: r`A value $x$ can be used only when both $f(x)$ and $g(x)$ exist, so the domain is the intersection of the two domains.`, d: 1, c: 'recall', t: [4] }), (C) => C.blank('intersection'));

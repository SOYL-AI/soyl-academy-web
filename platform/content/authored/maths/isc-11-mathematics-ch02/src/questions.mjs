// ISC 11 Mathematics ch02 Relations and Functions — objective items (mcq, assertion-reason, true-false, fill-blank, numerical)
// with independent re-solve checks: sets, pairs and relations are listed and tested by brute force;
// real functions are evaluated on exact binary grids; ranges are tested by solving f(x) = y.
import { Q, mk } from './lib.mjs';
import { r, prod, prod3, relFrom, domOf, rngOf, has, isFunctionFrom, sameSet, allRelations, allFunctions, range, near, fl, sgn, xs16, domIs } from './rf.mjs';

const attain = (g, xOf, y) => { const x = xOf(y); return Number.isFinite(x) && near(g(x), y, 1e-9); };

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`Two ordered pairs $(a, b)$ and $(c, d)$ are called equal exactly when`, opts: [r`$a = c$ and $b = d$`, r`$a = d$ and $b = c$`, r`$a + b = c + d$`, r`$a = c$ or $b = d$`], key: 'a', sol: r`An ordered pair keeps its entries in position, so equality means the first entries agree **and** the second entries agree. Option (b) would make $(1, 2) = (2, 1)$.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.key('a'));
Q('m02', mk.mcq({ stem: r`Sets $A$ and $B$ have $7$ and $3$ elements respectively. The number of ordered pairs in $A \times B$ is`, opts: ['$10$', '$21$', '$49$', '$343$'], key: 'b', sol: r`Each of the $7$ first entries pairs with each of the $3$ second entries, so $n(A \times B) = 7 \times 3 = 21$. Option (a) adds the sizes instead.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => C.which([7 + 3, prod(range(1, 7), range(1, 3)).length, 7 * 7, 7 ** 3], 21));
{
  let x = null, y = null, x2 = null, y2 = null;
  for (const a of range(-20, 20)) for (const b of range(-20, 20)) { if (2 * a - b === 1 && a + b === 8) { x = a; y = b; } if (2 * a - b === 8 && a + b === 1) { x2 = a; y2 = b; } }
  Q('m03', mk.mcq({ stem: r`If $(2x - y,\ x + y) = (1,\ 8)$, the value of $xy$ is`, opts: ['$-6$', '$8$', '$15$', '$16$'], key: 'c', sol: r`Matching entries in position gives $2x - y = 1$ and $x + y = 8$. Adding, $3x = 9$, so $x = 3$ and $y = 5$, hence $xy = 15$. Swapping the two right-hand sides would give $x = 3$, $y = -2$ and the tempting $-6$.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { C.assert(x === 3 && y === 5 && x2 === 3 && y2 === -2, 'x = 3, y = 5; swapped x = 3, y = -2'); C.which([x2 * y2, x + y, x * y, 2 * (x + y)], x * y); });
}
{
  const A = [1, 3], B = [3, 6, 9];
  const cand = [[1, 6], [3, 9], [9, 3], [6, 6]];
  Q('m04', mk.mcq({ stem: r`Take $A = \{1, 3\}$ and $B = \{3, 6, 9\}$. Exactly one of the ordered pairs below lies in $B \times A$. Which one?`, opts: ['$(1, 6)$', '$(3, 9)$', '$(9, 3)$', '$(6, 6)$'], key: 'c', sol: r`In $B \times A$ the first entry comes from $B$ and the second from $A$. Only $(9, 3)$ qualifies: $9 \in B$ and $3 \in A$. The pair $(1, 6)$ belongs to $A \times B$ instead.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which(cand.map(([a, b]) => has(prod(B, A), a, b)), true));
}
{
  const nB = 15 / 3;
  Q('m05', mk.mcq({ stem: r`The product $A \times B$ has $15$ elements and $n(A) = 3$. Then $n(B \times B)$ is`, opts: ['$5$', '$15$', '$25$', '$45$'], key: 'c', sol: r`$n(B) = \dfrac{15}{3} = 5$, so $n(B \times B) = 5 \times 5 = 25$. Option (a) stops at $n(B)$ and (d) multiplies $15$ by $3$.`, d: 2, c: 'application', t: [1], time: 60 }), (C) => C.which([nB, 15, nB * nB, 15 * 3], nB * nB));
}
{
  const T = prod3([1, 2], ['p', 'q', 'r'], ['u', 'v']);
  Q('m06', mk.mcq({ stem: r`Let $A = \{1, 2\}$, $B = \{p, q, r\}$ and $C = \{u, v\}$. How many ordered triples $(a, b, c)$ lie in $A \times B \times C$?`, opts: ['$6$', '$7$', '$12$', '$36$'], key: 'c', sol: r`Each triple is chosen in three independent steps with $2$, $3$ and $2$ possibilities: $2 \times 3 \times 2 = 12$. Option (a) forgets the set $C$; (b) adds the sizes.`, d: 2, c: 'application', t: [1], time: 60 }), (C) => C.which([2 * 3, 2 + 3 + 2, T.length, (2 * 3) ** 2], T.length));
}
Q('m07', mk.mcq({ stem: r`A set $P$ has $2$ elements and a set $Q$ has $4$ elements. How many different relations from $P$ to $Q$ can be formed?`, opts: ['$16$', '$64$', '$128$', '$256$'], key: 'd', sol: r`$P \times Q$ has $2 \times 4 = 8$ pairs and every subset of it is a relation, so there are $2^8 = 256$. The value $64$ comes from $2^{2 + 4}$, which mixes up addition and multiplication.`, d: 2, c: 'application', t: [1, 2], time: 75 }), (C) => C.which([4 ** 2, 2 ** (2 + 4), 2 ** 7, allRelations([1, 2], [1, 2, 3, 4]).length], 256));
{
  const R = relFrom([1, 2, 3, 4], [3, 4, 5], (x, y) => (x + y) % 2 === 0);
  Q('m08', mk.mcq({ stem: r`A relation $R$ from $\{1, 2, 3, 4\}$ to $\{3, 4, 5\}$ is defined by $x\,R\,y$ when $x + y$ is even. The number of ordered pairs in $R$ is`, opts: ['$4$', '$5$', '$6$', '$7$'], key: 'c', sol: r`The even sums are $1 + 3,\ 1 + 5,\ 2 + 4,\ 3 + 3,\ 3 + 5,\ 4 + 4$, so $R = \{(1, 3), (1, 5), (2, 4), (3, 3), (3, 5), (4, 4)\}$ and $|R| = 6$.`, d: 2, c: 'application', t: [2], time: 90 }), (C) => { C.assert(R.length === 6 && has(R, 3, 3), 'six pairs'); C.which([4, 5, R.length, 7], R.length); });
}
{
  const R = [[2, 5], [3, 8], [2, 9], [7, 1]];
  const opts = [[2, 3, 7], [1, 5, 8, 9], [1, 2, 3, 5, 7, 8, 9], [2, 3, 7, 9]];
  Q('m09', mk.mcq({ stem: r`A relation is written $R = \{(2, 5), (3, 8), (2, 9), (7, 1)\}$. The domain of $R$ is`, opts: [r`$\{2, 3, 7\}$`, r`$\{1, 5, 8, 9\}$`, r`$\{1, 2, 3, 5, 7, 8, 9\}$`, r`$\{2, 3, 7, 9\}$`], key: 'a', sol: r`The domain collects the **first** entries, each listed once: $2, 3, 2, 7$ give $\{2, 3, 7\}$. Option (b) is the range and (c) mixes both.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => C.which(opts.map((S) => sameSet(S, domOf(R))), true));
}
{
  const X = [0, 1, 2, 3], Y = [-1, 2, 5, 8, 11];
  const R = relFrom(X, Y, (x, y) => y === 3 * x - 1);
  Q('m10', mk.mcq({ stem: r`$R$ is the relation from $X = \{0, 1, 2, 3\}$ to $Y = \{-1, 2, 5, 8, 11\}$ given by $y = 3x - 1$. Which element of $Y$ does **not** belong to the range of $R$?`, opts: ['$-1$', '$2$', '$8$', '$11$'], key: 'd', sol: r`The pairs are $(0, -1), (1, 2), (2, 5), (3, 8)$, so the range is $\{-1, 2, 5, 8\}$. The element $11$ would need $x = 4$, which is not in $X$.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => { C.assert(R.length === 4, 'four pairs'); C.which([-1, 2, 8, 11].map((y) => !rngOf(R).includes(y)), true); });
}
{
  const cnt = allRelations([1, 2], [1, 2, 3]).filter((R) => has(R, 1, 1)).length;
  Q('m11', mk.mcq({ stem: r`$P = \{p_1, p_2\}$ and $Q = \{q_1, q_2, q_3\}$. How many relations from $P$ to $Q$ contain the pair $(p_1, q_1)$?`, opts: ['$5$', '$32$', '$63$', '$64$'], key: 'b', sol: r`That pair is forced in; each of the other $6 - 1 = 5$ pairs of $P \times Q$ may be present or absent, giving $2^5 = 32$ relations. Option (d) is the count with no restriction.`, d: 3, c: 'analysis', t: [1, 2], time: 90 }), (C) => C.which([5, cnt, 63, 64], 32));
}
{
  const A = [2, 4, 6], B = [1, 3];
  const cand = [[[2, 1], [4, 3]], [[2, 1], [2, 3], [4, 1], [6, 3]], [[2, 3], [4, 3], [6, 3]], [[2, 1], [4, 1], [6, 1], [6, 3]]];
  Q('m12', mk.mcq({ stem: r`Exactly one of these sets of ordered pairs, each a relation from $\{2, 4, 6\}$ to $\{1, 3\}$, defines a function. Which one?`, opts: [r`$\{(2, 1), (4, 3)\}$`, r`$\{(2, 1), (2, 3), (4, 1), (6, 3)\}$`, r`$\{(2, 3), (4, 3), (6, 3)\}$`, r`$\{(2, 1), (4, 1), (6, 1), (6, 3)\}$`], key: 'c', sol: r`A function must give each of $2, 4, 6$ exactly one partner. (a) leaves $6$ unused; (b) gives $2$ two partners; (d) gives $6$ two partners. In (c) all three share the image $3$, which is allowed.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => C.which(cand.map((R) => isFunctionFrom(A, R)), true));
}
{
  const g = (x) => Math.sqrt(3 * x + 12);
  const preds = [(x) => x >= -4, (x) => x > -4, (x) => x <= -4, (x) => x >= 4];
  Q('m13', mk.mcq({ stem: r`The largest set of real numbers on which $f(x) = \sqrt{3x + 12}$ is defined is`, opts: [r`$[-4, \infty)$`, r`$(-4, \infty)$`, r`$(-\infty, -4]$`, r`$[4, \infty)$`], key: 'a', sol: r`A square root needs a non-negative inside: $3x + 12 \ge 0$ gives $x \ge -4$. At $x = -4$ the value is $\sqrt{0} = 0$, so the end point is included.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => C.which(preds.map((p) => domIs(g, p)), true));
}
{
  const g = (x) => x / (x * x - 5 * x + 6);
  const preds = [(x) => x !== 2 && x !== 3, (x) => x !== 0, (x) => x !== -2 && x !== -3, (x) => x !== 0 && x !== 2 && x !== 3];
  Q('m14', mk.mcq({ stem: r`The real function $f(x) = \dfrac{x}{x^2 - 5x + 6}$ is defined for every real $x$ except`, opts: [r`$x = 2$ and $x = 3$`, r`$x = 0$ only`, r`$x = -2$ and $x = -3$`, r`$x = 0$, $x = 2$ and $x = 3$`], key: 'a', sol: r`Only a zero denominator is forbidden: $x^2 - 5x + 6 = (x - 2)(x - 3) = 0$ at $x = 2$ and $x = 3$. A zero numerator at $x = 0$ simply gives the value $0$.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => C.which(preds.map((p) => domIs(g, p)), true));
}
{
  const g = (x) => 2 + Math.sqrt(x - 1);
  const xOf = (y) => (y - 2) ** 2 + 1;
  const probes = [-5, 0, 1.5, 1.99, 2, 2.5, 10];
  const preds = [(y) => y >= 2, (y) => y >= 1, (y) => y >= 0, (y) => y > 2];
  Q('m15', mk.mcq({ stem: r`As $x$ takes every value for which it is defined, the function $f(x) = 2 + \sqrt{x - 1}$ takes exactly the values in`, opts: [r`$[2, \infty)$`, r`$[1, \infty)$`, r`$[0, \infty)$`, r`$(2, \infty)$`], key: 'a', sol: r`The domain is $x \ge 1$, and $\sqrt{x - 1} \ge 0$ with value $0$ at $x = 1$. So $f(x) \ge 2$, with $f(1) = 2$ reached. Every $y \ge 2$ occurs, using $x = (y - 2)^2 + 1$.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => { C.assert(near(g(1), 2) && xs16.every((x) => !Number.isFinite(g(x)) || g(x) >= 2), 'f(1) = 2 is the least value'); C.which(preds.map((p) => probes.every((y) => attain(g, xOf, y) === !!p(y))), true); });
}
{
  const g = (x) => (x + 1) / (x - 2);
  const xOf = (y) => (2 * y + 1) / (y - 1);
  const probes = [-4, 0, 0.5, 1, 2, 3, 7];
  const attainable = (y) => y !== 1 && attain(g, xOf, y);
  const preds = [(y) => y !== 2, (y) => y !== 1, (y) => y !== -1, () => true];
  Q('m16', mk.mcq({ stem: r`Taking every real $x$ for which $f(x) = \dfrac{x + 1}{x - 2}$ is defined, the outputs $f(x)$ fill the set`, opts: [r`$\mathbb{R} - \{2\}$`, r`$\mathbb{R} - \{1\}$`, r`$\mathbb{R} - \{-1\}$`, r`$\mathbb{R}$`], key: 'b', sol: r`Write $y = \dfrac{x + 1}{x - 2}$ and solve for $x$: $y(x - 2) = x + 1$ gives $x(y - 1) = 2y + 1$, so $x = \dfrac{2y + 1}{y - 1}$, possible exactly when $y \ne 1$. The excluded $2$ belongs to the domain, not the range.`, d: 4, c: 'analysis', t: [3], time: 120 }), (C) => { C.assert(xs16.every((x) => !Number.isFinite(g(x)) || g(x) !== 1), 'never 1'); C.which(preds.map((p) => probes.every((y) => attainable(y) === !!p(y))), true); });
}
{
  const g = (x) => Math.sqrt(9 - x * x);
  const vals = xs16.filter((x) => Math.abs(x) <= 3).map(g);
  const xOf = (y) => Math.sqrt(9 - y * y);
  const probes = [-1, 0, 1, 2.9, 3, 3.1, 8, 9];
  const preds = [(y) => y >= 0 && y <= 3, (y) => y >= -3 && y <= 3, (y) => y >= 0 && y <= 9, (y) => y >= 0];
  Q('m17', mk.mcq({ stem: r`For $f(x) = \sqrt{9 - x^2}$, the set of all values that $f$ can take is`, opts: [r`$[0, 3]$`, r`$[-3, 3]$`, r`$[0, 9]$`, r`$[0, \infty)$`], key: 'a', sol: r`The domain is $[-3, 3]$ where $0 \le 9 - x^2 \le 9$, so $0 \le f(x) \le 3$, both ends reached (at $x = \pm 3$ and $x = 0$). A square root is never negative, which rules out (b).`, d: 3, c: 'application', t: [3], time: 75 }), (C) => { C.assert(Math.min(...vals) === 0 && Math.max(...vals) === 3, 'min 0, max 3'); const att = (y) => y >= 0 && y <= 3 && attain(g, xOf, y); C.which(preds.map((p) => probes.every((y) => att(y) === !!p(y))), true); });
}
Q('m18', mk.mcq({ stem: r`Here $[x]$ is the greatest integer not exceeding $x$. The value of $[-1.01] \cdot \operatorname{sgn}(-3) + |-5|$ is`, opts: ['$-3$', '$3$', '$6$', '$7$'], key: 'd', sol: r`$[-1.01] = -2$ and $\operatorname{sgn}(-3) = -1$, so the product is $2$; adding $|-5| = 5$ gives $7$. Truncating $[-1.01]$ to $-1$ gives the tempting $6$.`, d: 3, c: 'application', t: [4], time: 75 }), (C) => C.which([fl(-1.01) * sgn(-3) - Math.abs(-5), fl(-1.01) * sgn(3) + 5, -1 * sgn(-3) + 5, fl(-1.01) * sgn(-3) + Math.abs(-5)], 7));
{
  const g = (x) => 2 - Math.abs(x);
  const best = xs16.reduce((m, x) => (g(x) > g(m) ? x : m), xs16[0]);
  Q('m19', mk.mcq({ stem: r`The highest point on the graph of $y = 2 - |x|$ is`, opts: ['$(0, 2)$', '$(0, -2)$', '$(2, 0)$', '$(-2, 0)$'], key: 'a', sol: r`$|x| \ge 0$, so $2 - |x| \le 2$ with equality only at $x = 0$. The graph is an inverted V with top $(0, 2)$; the points $(\pm 2, 0)$ are where it meets the $x$-axis.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => C.which([[0, 2], [0, -2], [2, 0], [-2, 0]], [best, g(best)]));
}
{
  const g = (x) => fl(x) + fl(-x);
  const vals = [...new Set(xs16.map(g))].sort((a, b) => a - b);
  Q('m20', mk.mcq({ stem: r`The set of all values taken by the function $f(x) = [x] + [-x]$, with $[\cdot]$ the greatest integer function, is`, opts: [r`$\{0\}$`, r`$\{-1, 0\}$`, r`$\{-1, 0, 1\}$`, r`$\mathbb{Z}$`], key: 'b', sol: r`If $x$ is an integer, $[x] + [-x] = x - x = 0$. If $x = n + t$ with $n$ an integer and $0 < t < 1$, then $[x] = n$ and $[-x] = -n - 1$, so the sum is $-1$. Hence the values are $-1$ and $0$.`, d: 4, c: 'analysis', t: [4], time: 120 }), (C) => { C.assert(vals.join() === '-1,0', `values ${vals}`); C.which([sameSet0(vals, [0]), sameSet0(vals, [-1, 0]), sameSet0(vals, [-1, 0, 1]), vals.length > 5], true); });
}
{
  const f = (x) => x * x - 2 * x, g = (x) => x + 5;
  Q('m21', mk.mcq({ stem: r`Let $f(x) = x^2 - 2x$ and $g(x) = x + 5$. The value of the product function $(fg)(-2)$ is`, opts: ['$5$', '$11$', '$24$', '$-24$'], key: 'c', sol: r`$f(-2) = 4 + 4 = 8$ and $g(-2) = 3$, so $(fg)(-2) = 8 \times 3 = 24$. The sum gives $11$ and the difference gives $5$.`, d: 2, c: 'understanding', t: [5], time: 60 }), (C) => C.which([f(-2) - g(-2), f(-2) + g(-2), f(-2) * g(-2), -f(-2) * g(-2)], 24));
}
{
  const f = (x) => Math.sqrt(5 - x), g = (x) => x - 1;
  const h = (x) => f(x) / g(x);
  const preds = [(x) => x <= 5 && x !== 1, (x) => x < 5, (x) => x <= 5, (x) => x >= 1 && x <= 5];
  Q('m22', mk.mcq({ stem: r`For the real functions $f(x) = \sqrt{5 - x}$ and $g(x) = x - 1$, the quotient function $\dfrac{f}{g}$ is defined on`, opts: [r`$(-\infty, 5] - \{1\}$`, r`$(-\infty, 5)$`, r`$(-\infty, 5]$`, r`$[1, 5]$`], key: 'a', sol: r`The common domain is $(-\infty, 5]$ (where $f$ is defined; $g$ is defined everywhere). The quotient must also avoid $g(x) = 0$, that is $x = 1$. The end point $5$ stays, since $g(5) = 4 \ne 0$.`, d: 3, c: 'application', t: [5], time: 90 }), (C) => C.which(preds.map((p) => domIs(h, p)), true));
}
function sameSet0(X, Y) { return X.length === Y.length && X.every((x, i) => x === Y[i]); }

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`If $n(A) = 3$, then $n(A \times A) = 9$ and $n(A \times A \times A) = 27$.`, r: r`For finite sets, $n(A \times B \times C) = n(A) \cdot n(B) \cdot n(C)$.`, key: 'a', sol: r`With $n(A) = 3$ the rule in R gives $3 \times 3 \times 3 = 27$ for the triple product and $3 \times 3 = 9$ for two factors. R is true and is exactly the counting argument that makes A true.`, d: 2, c: 'understanding', t: [1] }), (C) => { const A = [1, 2, 3]; C.assert(prod(A, A).length === 9 && prod3(A, A, A).length === 27 && prod3([1, 2], [1, 2, 3], [1, 2, 3, 4]).length === 24, '9, 27, 24'); C.key('a'); });
Q('ar2', mk.ar({ a: r`The range of $R = \{(1, 2), (2, 3), (3, 2)\}$, a relation from $A = \{1, 2, 3\}$ to $B = \{2, 3, 4\}$, equals $B$.`, r: r`The range of a relation is the set of second entries of its pairs.`, key: 'd', sol: r`R is true: the second entries are $2, 3, 2$, so the range is $\{2, 3\}$. That makes A false, because $4 \in B$ is never a second entry. The range is a subset of $B$, not necessarily all of it.`, d: 2, c: 'understanding', t: [2] }), (C) => { const R = [[1, 2], [2, 3], [3, 2]]; C.assert(sameSet(rngOf(R), [2, 3]) && !sameSet(rngOf(R), [2, 3, 4]), 'range {2, 3}'); C.key('d'); });
Q('ar3', mk.ar({ a: r`The range of $f(x) = \dfrac{1}{x^2}$ is the interval $(0, \infty)$.`, r: r`The domain of $f(x) = \dfrac{1}{x^2}$ is $\mathbb{R} - \{0\}$.`, key: 'b', sol: r`Both statements are true. R only lists the allowed inputs. A is true because $x^2 > 0$ makes $f(x) > 0$ and $x = \dfrac{1}{\sqrt{y}}$ gives every $y > 0$. Knowing the domain does not by itself explain the values, so R is not the explanation.`, d: 3, c: 'analysis', t: [3] }), (C) => { const g = (x) => 1 / (x * x); C.assert(xs16.every((x) => !Number.isFinite(g(x)) || g(x) > 0) && [0.01, 1, 4, 250].every((y) => near(g(1 / Math.sqrt(y)), y, 1e-9)) && !Number.isFinite(g(0)), 'range (0, inf), domain without 0'); C.key('b'); });
Q('ar4', mk.ar({ a: r`For every real $x$, $|x| \cdot \operatorname{sgn}(x) = x$.`, r: r`For every real $x$, $\operatorname{sgn}(x) = \dfrac{|x|}{x}$.`, key: 'c', sol: r`A is true: for $x > 0$ the product is $x \cdot 1$, for $x < 0$ it is $(-x)(-1) = x$, and at $0$ both sides are $0$. R is false at $x = 0$, where $\dfrac{|x|}{x}$ is undefined but $\operatorname{sgn}(0) = 0$.`, d: 3, c: 'analysis', t: [4] }), (C) => { C.assert(xs16.every((x) => Math.abs(x) * sgn(x) === x) && !Number.isFinite(Math.abs(0) / 0) && sgn(0) === 0, 'A holds on the grid; R fails at 0'); C.key('c'); });
Q('ar5', mk.ar({ a: r`The function $f(x) = 3^x$ never takes a value that is zero or negative.`, r: r`A positive number raised to any real power is positive, so $3^x > 0$ for every real $x$.`, key: 'a', sol: r`R states the reason directly: the base $3$ is positive, so every power $3^x$ is positive, whether $x$ is negative, zero or positive. That is why zero and negative values are never reached, which is A.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(xs16.filter((x) => x <= 10).every((x) => 3 ** x > 0), '3^x > 0 on the grid'); C.key('a'); });
Q('ar6', mk.ar({ a: r`For real functions $f$ and $g$, the quotient $\dfrac{f}{g}$ always has the same domain as the sum $f + g$.`, r: r`The quotient $\dfrac{f}{g}$ is defined only where $g(x) \ne 0$, in addition to the common domain of $f$ and $g$.`, key: 'd', sol: r`R is true. Because of the extra condition $g(x) \ne 0$, the quotient can lose points that the sum keeps, so A is false. For $f(x) = x$ and $g(x) = x - 1$, the sum is defined at $x = 1$ but the quotient is not.`, d: 3, c: 'analysis', t: [5] }), (C) => { const f = (x) => x, g = (x) => x - 1; C.assert(Number.isFinite(f(1) + g(1)) && !Number.isFinite(f(1) / g(1)), 'x = 1 separates them'); C.key('d'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The ordered pairs $(a, b)$ and $(b, a)$ are equal only when $a = b$.`, key: 't', sol: r`Equality needs $a = b$ (first entries) and $b = a$ (second entries). These agree exactly when $a = b$; for example $(2, 5) \ne (5, 2)$ but $(4, 4) = (4, 4)$.`, d: 2, c: 'understanding', t: [1] }), (C) => { const pairs = prod(range(-3, 3), range(-3, 3)); C.assert(pairs.every(([a, b]) => (a === b) === (a === b && b === a)) && pairs.every(([a, b]) => (a === b) === has([[a, b]], b, a)), 'equal exactly when a = b'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`If $A \times B$ has $12$ elements, then there are exactly $2^{12} = 4096$ different relations from $A$ to $B$.`, key: 't', sol: r`Each relation is a subset of $A \times B$, and a set with $12$ elements has $2^{12} = 4096$ subsets (including the empty one).`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(allRelations([1, 2], [1, 2, 3]).length === 2 ** 6 && 2 ** 12 === 4096, 'counting rule 2^(pq) checked on 2 x 3'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`A relation from $A$ to $B$ in which some element of $A$ appears as the first entry of no pair can still be a function from $A$ to $B$.`, key: 'f', sol: r`A function from $A$ must give **every** element of $A$ exactly one image. If some element of $A$ has no pair, it has no image, so the relation is not a function from $A$.`, d: 2, c: 'understanding', t: [3] }), (C) => { const A = [1, 2, 3], B = ['a', 'b']; const missing = allRelations(A, B).filter((R) => !A.every((a) => R.some(([x]) => x === a))); C.assert(missing.length > 0 && missing.every((R) => !isFunctionFrom(A, R)), 'none of them is a function'); C.key('f'); });
Q('tf4', mk.tf({ stem: r`The values of $f(x) = x^2 + 2x + 5$ fill the interval $[4, \infty)$ exactly.`, key: 't', sol: r`Completing the square, $f(x) = (x + 1)^2 + 4 \ge 4$, with $4$ reached at $x = -1$. For any $y \ge 4$, $x = -1 + \sqrt{y - 4}$ gives $f(x) = y$.`, d: 3, c: 'application', t: [3] }), (C) => { const g = (x) => x * x + 2 * x + 5; C.assert(xs16.every((x) => g(x) >= 4) && g(-1) === 4 && [4, 4.5, 10, 100].every((y) => near(g(-1 + Math.sqrt(y - 4)), y, 1e-9)), 'range [4, inf)'); C.key('t'); });
Q('tf5', mk.tf({ stem: r`The greatest integer function gives the same value at $x = 2.3$ and at $x = 2.99$.`, key: 't', sol: r`$[x] = 2$ for every $x$ with $2 \le x < 3$, and both $2.3$ and $2.99$ lie in that interval: $[2.3] = [2.99] = 2$.`, d: 1, c: 'understanding', t: [4] }), (C) => { C.assert(fl(2.3) === 2 && fl(2.99) === 2, 'both equal 2'); C.key('t'); });
Q('tf6', mk.tf({ stem: r`For two real functions $f$ and $g$, the quotient $\dfrac{f}{g}$ is defined at every point of the common domain of $f$ and $g$.`, key: 'f', sol: r`It fails wherever $g(x) = 0$. For $f(x) = 1$ and $g(x) = x$, both are defined at $x = 0$, yet $\dfrac{f}{g}$ is not defined there.`, d: 2, c: 'understanding', t: [5] }), (C) => { const f = () => 1, g = (x) => x; C.assert(Number.isFinite(f(0)) && Number.isFinite(g(0)) && !Number.isFinite(f(0) / g(0)), 'x = 0 separates them'); C.key('f'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`If $n(A) = 4$, $n(B) = 5$ and $n(C) = 2$, the product $A \times B \times C$ contains exactly ____ ordered triples.`, acc: [['40']], sol: r`Choose the three entries independently: $4 \times 5 \times 2 = 40$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(prod3(range(1, 4), range(1, 5), range(1, 2)).length));
Q('fb2', mk.fill({ stem: r`The number of relations from a set with $3$ elements to a set with $1$ element is ____.`, acc: [['8']], sol: r`The product has $3 \times 1 = 3$ pairs and every subset is a relation: $2^3 = 8$.`, d: 2, c: 'application', t: [2] }), (C) => C.blank(allRelations([1, 2, 3], ['z']).length));
{
  const g = (x) => Math.sqrt(2 * x - 9);
  const first = range(-20, 20).find((n) => Number.isFinite(g(n)));
  Q('fb3', mk.fill({ stem: r`The smallest **integer** at which $f(x) = \sqrt{2x - 9}$ is defined is ____.`, acc: [['5']], sol: r`The domain is $2x - 9 \ge 0$, that is $x \ge 4.5$. The smallest integer in $[4.5, \infty)$ is $5$.`, d: 2, c: 'application', t: [3] }), (C) => C.blank(first));
}
Q('fb4', mk.fill({ stem: r`Rounding down to an integer, the bracket $[-6.5]$ evaluates to ____.`, acc: [['-7']], sol: r`The greatest integer not above $-6.5$ is $-7$, so $[-6.5] = -7$.`, d: 2, c: 'understanding', t: [4] }), (C) => C.blank(fl(-6.5)));
Q('fb5', mk.fill({ stem: r`Over all real $x$, the largest value of the expression $7 - |x + 2|$ is ____.`, acc: [['7']], sol: r`$|x + 2| \ge 0$, and it is $0$ at $x = -2$. So the largest value is $7 - 0 = 7$.`, d: 2, c: 'application', t: [4] }), (C) => C.blank(Math.max(...xs16.map((x) => 7 - Math.abs(x + 2)))));
{
  const f = (x) => 2 * x * x + 1, g = (x) => x + 10;
  Q('fb6', mk.fill({ stem: r`With $f(x) = 2x^2 + 1$ and $g(x) = x + 10$, the difference function $f - g$ equals ____ at $x = 3$.`, acc: [['6']], sol: r`$f(3) = 19$ and $g(3) = 13$, so $(f - g)(3) = 19 - 13 = 6$.`, d: 1, c: 'understanding', t: [5] }), (C) => C.blank(f(3) - g(3)));
}

// =============================================================== numerical
{
  const A = [...new Set('MATHEMATICS'.split(''))], B = [...new Set('2026'.split(''))];
  Q('n01', mk.num({ stem: r`Set $A$ holds the **distinct** letters of the word MATHEMATICS and set $B$ holds the **distinct** digits of the number $2026$. Find $n(A \times B)$.`, value: 24, sol: r`$A = \{M, A, T, H, E, I, C, S\}$ has $8$ elements and $B = \{2, 0, 6\}$ has $3$. So $n(A \times B) = 8 \times 3 = 24$.`, scheme: [['n(A) = 8 and n(B) = 3', 0.5], ['24', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.assert(A.length === 8 && B.length === 3, 'sizes 8 and 3'); C.val(prod(A, B).length); });
}
Q('n02', mk.num({ stem: r`How many relations from $\{a, b\}$ to $\{1, 2, 3\}$ contain **both** the pairs $(a, 1)$ and $(b, 2)$?`, value: 16, sol: r`Two of the $6$ pairs are forced in; each of the other $4$ may be present or absent: $2^4 = 16$.`, scheme: [['16', 1]], d: 3, c: 'analysis', t: [2], time: 90 }), (C) => C.val(allRelations(['a', 'b'], [1, 2, 3]).filter((R) => has(R, 'a', 1) && has(R, 'b', 2)).length));
{
  const R = relFrom(range(1, 6), range(1, 6), (x, y) => (x - y) % 3 === 0);
  Q('n03', mk.num({ stem: r`For $x, y \in \{1, 2, 3, 4, 5, 6\}$ let $R$ be the set of pairs $(x, y)$ for which $x - y$ is divisible by $3$. How many ordered pairs does $R$ contain?`, value: 12, sol: r`The residues mod $3$ split the set into $\{1, 4\}$, $\{2, 5\}$, $\{3, 6\}$; pairs inside a block work, each block giving $2 \times 2 = 4$ pairs. So $|R| = 3 \times 4 = 12$.`, scheme: [['12', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => { C.assert(has(R, 1, 4) && has(R, 4, 1) && !has(R, 1, 2), 'block structure'); C.val(R.length); });
}
{
  const f = (x) => (3 * x - 1) / (x + 2);
  Q('n04', mk.num({ stem: r`Evaluate $f(-3)$ for the real function $f(x) = \dfrac{3x - 1}{x + 2}$.`, value: 10, sol: r`$f(-3) = \dfrac{3(-3) - 1}{-3 + 2} = \dfrac{-10}{-1} = 10$.`, scheme: [['10', 1]], d: 1, c: 'understanding', t: [3], time: 45 }), (C) => C.val(f(-3)));
}
{
  const g = (x) => Math.sqrt(40 - x * x);
  const ints = range(-20, 20).filter((n) => Number.isFinite(g(n)));
  Q('n05', mk.num({ stem: r`How many **integers** lie in the domain of $f(x) = \sqrt{40 - x^2}$?`, value: 13, sol: r`The domain is $x^2 \le 40$, that is $|x| \le \sqrt{40} \approx 6.32$. The integers from $-6$ to $6$ number $13$.`, scheme: [['13', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => { C.assert(ints[0] === -6 && ints[ints.length - 1] === 6, '-6 to 6'); C.val(ints.length); });
}
{
  const f = (x) => 3 * x * x - 1, g = (x) => x - 3;
  Q('n06', mk.num({ stem: r`If $f(x) = 3x^2 - 1$ and $g(x) = x - 3$, find the value of the quotient function $\dfrac{f}{g}$ at $x = 5$.`, value: 37, sol: r`$f(5) = 74$ and $g(5) = 2 \ne 0$, so $\left(\dfrac{f}{g}\right)(5) = \dfrac{74}{2} = 37$.`, scheme: [['37', 1]], d: 2, c: 'understanding', t: [5], time: 60 }), (C) => C.val(f(5) / g(5)));
}
{
  const total = range(1, 10).reduce((s, k) => s + fl(k / 3), 0);
  Q('n07', mk.num({ stem: r`Find the value of the sum $\left[\dfrac{1}{3}\right] + \left[\dfrac{2}{3}\right] + \left[\dfrac{3}{3}\right] + \dots + \left[\dfrac{10}{3}\right]$, where $[x]$ is the greatest integer function.`, value: 15, sol: r`The values are $0, 0, 1, 1, 1, 2, 2, 2, 3, 3$ for $k = 1, \dots, 10$. Their sum is $0 + 0 + 3 + 6 + 6 = 15$.`, scheme: [['Each term evaluated', 0.5], ['15', 0.5]], d: 3, c: 'application', t: [4], time: 90 }), (C) => C.val(total));
}

// =============================================================== extra recall / understanding items
{
  const R = [[1, 5], [2, 5], [3, 6]];
  const second = [5, 6];
  Q('m23', mk.mcq({ stem: r`For a relation from a set $A$ to a set $B$, the set made of the second entries of its ordered pairs has the name`, opts: ['domain', 'range', 'universal set', 'power set'], key: 'b', sol: r`The first entries form the domain; the second entries that actually occur form the range. The co-domain is the whole target set, used or not.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => { C.assert(sameSet(second, rngOf(R)) && !sameSet(second, domOf(R)), 'second entries form the range'); C.which([sameSet(second, domOf(R)), sameSet(second, rngOf(R)), false, false], true); });
}
{
  const A = [1, 2, 3], B = ['u', 'v'];
  const rels = allRelations(A, B);
  Q('tf7', mk.tf({ stem: r`Each function from a set $A$ to a set $B$ is, in particular, a relation from $A$ to $B$.`, key: 't', sol: r`A function is a set of ordered pairs of $A \times B$, so it is a subset of $A \times B$. It is the special relation in which every element of $A$ occurs exactly once as a first entry.`, d: 1, c: 'understanding', t: [3] }), (C) => { const fs = allFunctions(A, B); C.assert(fs.length === 8 && fs.every((f) => rels.some((R) => sameSet(R, f))), 'all 8 functions are among the 64 relations'); C.key('t'); });
}
Q('fb7', mk.fill({ stem: r`The signum function takes the value ____ at $x = -9$.`, acc: [['-1']], sol: r`For a negative number the signum is $-1$, so $\operatorname{sgn}(-9) = -1$.`, d: 1, c: 'recall', t: [4] }), (C) => C.blank(sgn(-9)));

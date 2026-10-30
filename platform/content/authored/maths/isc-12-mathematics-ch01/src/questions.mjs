// ISC 12 Mathematics ch01 Relations and Functions — practice bank with independent re-solve checks.
// Relations are built as sets of pairs and tested by brute force; functions on finite sets are enumerated;
// real functions are sampled for collisions, pre-images, compositions and inverses. Every set-up is SOYL's own
// (D-036); none repeats the CBSE 12 ch01 bank. Composite and inverse functions are algebraic only (ISC removed list).
import { Q, mk } from './lib.mjs';
import { relFrom, props, equivalence, reflexive, symmetric, transitive, classes, allRelations, allFunctions, injective, surjective, countInj, countSurj, collision, has } from './rel.mjs';
/** String.raw, except that a backslash-n not followed by a lower-case letter becomes a newline. */
const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const mod = (a, n) => ((a % n) + n) % n;
const near = (u, v) => Math.abs(u - v) < 1e-9;
const XS = range(-40, 40).map((k) => k / 7 + 0.013);
/** Two real functions agree at every sample point where both are defined. */
const same = (f, g, xs = XS) => xs.filter((x) => Number.isFinite(f(x)) && Number.isFinite(g(x))).every((x) => near(f(x), g(x))) && xs.some((x) => Number.isFinite(f(x)));
const A3 = [1, 2, 3];

// =============================================================== MCQ — t01 relations
Q('m01', mk.mcq({ stem: r`Which condition must hold for a relation $R$ on a set $A$ to be called **transitive**?`, opts: [r`$(a, b) \in R$ and $(b, c) \in R$ imply $(a, c) \in R$`, r`$(a, b) \in R$ implies $(b, a) \in R$`, r`$(a, a) \in R$ for every $a \in A$`, r`$(a, b) \in R$ implies $(b, a) \notin R$`], key: 'a', sol: r`Transitivity is the "two steps force a shortcut" rule. (b) defines symmetric, (c) reflexive, and (d) describes an asymmetric relation.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.key('a'));
const m02R = [['p', 'p'], ['q', 'q'], ['r', 'r'], ['p', 'q'], ['q', 'p']];
Q('m02', mk.mcq({ stem: r`On the set of letters $L = \{p, q, r\}$, the relation $R = \{(p, p), (q, q), (r, r), (p, q), (q, p)\}$ is`, opts: ['an equivalence relation', 'reflexive and symmetric but not transitive', 'symmetric and transitive but not reflexive', 'reflexive and transitive but not symmetric'], key: 'a', sol: r`All three loops are present, every pair comes with its reverse, and the only chains, $(p, q), (q, p)$ and $(q, p), (p, q)$, give loops that are present. So $R$ is reflexive, symmetric and transitive.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => C.which(['RST', 'RS-', '-ST', 'R-T'], props(['p', 'q', 'r'], m02R)));
Q('m03', mk.mcq({ stem: r`A two-element set $\{1, 2\}$ is given. Counting by pairs on and off the diagonal, how many of the relations on it are **symmetric**?`, opts: ['$4$', '$6$', '$8$', '$16$'], key: 'c', sol: r`The two loops $(1, 1)$, $(2, 2)$ may each be in or out ($2^2$ ways); the pair $(1, 2)$, $(2, 1)$ must go in or out together ($2$ ways): $2^2 \times 2 = 8$.`, d: 3, c: 'application', t: [1], time: 75 }), (C) => C.which([4, 6, 8, 16], allRelations([1, 2]).filter(symmetric).length));
Q('m04', mk.mcq({ stem: r`In an imagined geometry notebook, $T$ is the set of all triangles drawn, and $\Delta_1\,R\,\Delta_2$ means "$\Delta_1$ is similar to $\Delta_2$". The relation $R$ is`, opts: ['reflexive only', 'symmetric only', 'reflexive and symmetric only', 'an equivalence relation'], key: 'd', sol: r`Every triangle is similar to itself; similarity works both ways; and two triangles similar to a third are similar to each other (equal angles pass along). So $R$ is reflexive, symmetric and transitive.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  // model a triangle by its sorted angle triple; similar <=> same angles
  const T = [[30, 60, 90], [30, 60, 90], [45, 45, 90], [60, 60, 60], [40, 60, 80]];
  const ids = T.map((_, i) => i);
  const Rr = relFrom(ids, (a, b) => T[a].join() === T[b].join());
  C.which(['R--', '-S-', 'RS-', 'RST'], props(ids, Rr));
});
Q('m05', mk.mcq({ stem: r`For the relation "the difference is a multiple of $5$" on the integers, which set is the class $[2]$?`, opts: [r`$\{5k + 2 : k \in \mathbb{Z}\}$`, r`$\{5k : k \in \mathbb{Z}\}$`, r`$\{2k : k \in \mathbb{Z}\}$`, r`$\{5k - 2 : k \in \mathbb{Z}\}$`], key: 'a', sol: r`$b \in [2]$ exactly when $b - 2 = 5k$, i.e. $b = 5k + 2$: $\{\dots, -8, -3, 2, 7, 12, \dots\}$. Option (d) is the class of $3$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const Z = range(-20, 20);
  const cls = Z.filter((b) => mod(b - 2, 5) === 0).join();
  const forms = [(k) => 5 * k + 2, (k) => 5 * k, (k) => 2 * k, (k) => 5 * k - 2];
  C.which(forms.map((g) => Z.filter((b) => range(-10, 10).some((k) => g(k) === b)).join()), cls);
});
const divR = relFrom(range(1, 12), (a, b) => b % a === 0);
Q('m06', mk.mcq({ stem: r`On the set $\{1, 2, 3, \dots, 12\}$, a stamp collector writes $a\,R\,b$ when $b$ is a multiple of $a$. The relation $R$ is`, opts: ['reflexive and transitive but not symmetric', 'symmetric only', 'an equivalence relation', 'reflexive and symmetric but not transitive'], key: 'a', sol: r`$a$ is a multiple of itself (reflexive). If $b = ma$ and $c = nb$ then $c = mna$ (transitive). But $2\,R\,4$ while $4$ does not divide $2$ (not symmetric).`, d: 2, c: 'application', t: [1], time: 75 }), (C) => C.which(['R-T', '-S-', 'RST', 'RS-'], props(range(1, 12), divR)));
const mod4R = relFrom(range(1, 10), (a, b) => mod(a - b, 4) === 0);
Q('m07', mk.mcq({ stem: r`On $\{1, 2, \dots, 10\}$, $a\,R\,b$ holds when $4$ divides $a - b$. Into how many equivalence classes does $R$ split the set?`, opts: ['$2$', '$3$', '$4$', '$10$'], key: 'c', sol: r`The classes follow the remainder on division by $4$: $\{1, 5, 9\}$, $\{2, 6, 10\}$, $\{3, 7\}$, $\{4, 8\}$, so $4$ classes.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.assert(equivalence(range(1, 10), mod4R), 'equivalence'); C.which([2, 3, 4, 10], classes(range(1, 10), mod4R).length); });
Q('m08', mk.mcq({ stem: r`What is the number of ordered pairs in the smallest **reflexive** relation on $\{1, 2, 3\}$ that already contains the pair $(1, 2)$?`, opts: ['$1$', '$3$', '$4$', '$5$'], key: 'c', sol: r`Reflexivity forces the three loops $(1, 1)$, $(2, 2)$, $(3, 3)$; adding the given $(1, 2)$ gives $4$ pairs. Nothing else is forced.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const smallest = allRelations(A3).filter((R) => reflexive(A3, R) && has(R, 1, 2)).reduce((m, R) => Math.min(m, R.length), 99);
  C.which([1, 3, 4, 5], smallest);
});
const m09base = [[1, 2], [2, 3]];
const m09opts = [[1, 3], [3, 1], [2, 1], [1, 1]];
Q('m09', mk.mcq({ stem: r`On $\{1, 2, 3\}$ the relation $\{(1, 2), (2, 3)\}$ is not transitive. Adding which **single** pair makes it transitive?`, opts: ['$(1, 3)$', '$(3, 1)$', '$(2, 1)$', '$(1, 1)$'], key: 'a', sol: r`The chain $(1, 2), (2, 3)$ demands $(1, 3)$. Adding $(3, 1)$ creates a new chain $(2, 3), (3, 1)$ needing $(2, 1)$; adding $(2, 1)$ creates $(1, 2), (2, 1)$ needing $(1, 1)$; adding $(1, 1)$ leaves $(1, 3)$ missing.`, d: 3, c: 'analysis', t: [1], time: 90 }), (C) => C.which(m09opts.map((p) => transitive([...m09base, p])), true));

// =============================================================== MCQ — t02 functions, domain and range
Q('m10', mk.mcq({ stem: r`What is the largest set of real numbers on which $f(x) = \sqrt{9 - x^2}$ takes real values?`, opts: ['$[-3, 3]$', '$(-3, 3)$', '$[0, 3]$', r`$(-\infty, -3] \cup [3, \infty)$`], key: 'a', sol: r`We need $9 - x^2 \ge 0$, i.e. $x^2 \le 9$, i.e. $-3 \le x \le 3$. The end points are allowed because $\sqrt 0 = 0$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  const ok = (x) => 9 - x * x >= 0;
  const sets = [(x) => x >= -3 && x <= 3, (x) => x > -3 && x < 3, (x) => x >= 0 && x <= 3, (x) => x <= -3 || x >= 3];
  const pts = range(-50, 50).map((k) => k / 10);
  C.which(sets.map((s) => pts.every((x) => s(x) === ok(x))), true);
});
Q('m11', mk.mcq({ stem: r`A real function is given by $f(x) = \dfrac{1}{x^2 + 4}$, $x \in \mathbb{R}$. Its range is`, opts: [r`$\left(0, \tfrac14\right]$`, r`$\left[0, \tfrac14\right]$`, r`$\left(0, \infty\right)$`, r`$\left[\tfrac14, \infty\right)$`], key: 'a', sol: r`$x^2 + 4 \ge 4$, so $0 < f(x) \le \dfrac14$, with $\dfrac14$ reached at $x = 0$. The value $0$ is never reached because the denominator is finite.`, d: 3, c: 'application', t: [2], time: 75 }), (C) => {
  const vals = range(-400, 400).map((k) => 1 / ((k / 10) ** 2 + 4));
  C.assert(Math.max(...vals) === 0.25 && Math.min(...vals) > 0, 'max 1/4 at 0, values positive');
  C.assert(near(1 / ((Math.sqrt(1 / 0.1 - 4)) ** 2 + 4), 0.1), 'y = 0.1 attained');
  C.key('a');
});
const m12f = [(x) => x ** 3 + 1, (x) => 2 * x - 7, (x) => x * x - 6 * x, (x) => x / 3];
Q('m12', mk.mcq({ stem: r`Which of these functions from $\mathbb{R}$ to $\mathbb{R}$ is **many-one**?`, opts: ['$f(x) = x^3 + 1$', '$f(x) = 2x - 7$', '$f(x) = x^2 - 6x$', r`$f(x) = \dfrac{x}{3}$`], key: 'c', sol: r`$x^2 - 6x$ takes the value $0$ at both $x = 0$ and $x = 6$, so two inputs share an image. The other three are one-one.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { C.which(m12f.map((g) => collision(g) !== null), true); C.assert(m12f[2](0) === 0 && m12f[2](6) === 0, 'f(0) = f(6)'); });
const m13f = (x) => x * x + 2 * x + 5;
Q('m13', mk.mcq({ stem: r`The function $f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^2 + 2x + 5$, is`, opts: ['one-one but not onto', 'onto but not one-one', 'neither one-one nor onto', 'one-one and onto'], key: 'c', sol: r`$f(x) = (x + 1)^2 + 4$, so $f(-3) = f(1) = 8$ (not one-one), and every value is at least $4$, so $0$ has no pre-image (not onto).`, d: 3, c: 'application', t: [2], time: 75 }), (C) => {
  const minV = Math.min(...range(-500, 500).map((k) => m13f(k / 100)));
  C.assert(near(minV, 4) && m13f(-3) === 8 && m13f(1) === 8, 'min 4, f(-3) = f(1)');
  C.which(['10', '01', '00', '11'], `${collision(m13f) === null ? 1 : 0}${minV <= -1e9 ? 1 : 0}`);
});
Q('m14', mk.mcq({ stem: r`How many functions from the four-element set $\{1, 2, 3, 4\}$ onto the two-element set $\{a, b\}$ are there?`, opts: ['$8$', '$12$', '$14$', '$16$'], key: 'c', sol: r`There are $2^4 = 16$ functions in all, and only the two constant ones miss an element: $16 - 2 = 14$.`, d: 3, c: 'application', t: [2], time: 75 }), (C) => C.which([8, 12, 14, 16], countSurj(4, ['a', 'b'])));
Q('m15', mk.mcq({ stem: r`From a three-element set to a four-element set, how many functions are **into** (that is, not onto)?`, opts: ['$24$', '$40$', '$60$', '$64$'], key: 'd', sol: r`Three inputs can reach at most three of the four elements, so no function is onto: all $4^3 = 64$ functions are into.`, d: 3, c: 'analysis', t: [2], time: 75 }), (C) => { const B = ['w', 'x', 'y', 'z']; C.which([24, 40, 60, 64], allFunctions(3, B).filter((g) => !surjective(g, B)).length); });
Q('m16', mk.mcq({ stem: r`The function $f : \mathbb{N} \to \mathbb{N}$, $f(n) = n^2$, is`, opts: ['one-one and into', 'many-one and onto', 'one-one and onto', 'many-one and into'], key: 'a', sol: r`Squares of different natural numbers differ (one-one), but $2$, $3$, $5$, … are not squares (into, not onto).`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { const img = range(1, 40).map((n) => n * n); C.which(['10', '01', '11', '00'], `${injective(img) ? 1 : 0}${surjective(img, range(1, 10)) ? 1 : 0}`); });

// =============================================================== MCQ — t03 composite functions
const f17 = (x) => x * x + 1, g17 = (x) => 2 * x - 3;
Q('m17', mk.mcq({ stem: r`With $f(x) = x^2 + 1$ and $g(x) = 2x - 3$, the value of $(f \circ g)(2)$ is`, opts: ['$2$', '$5$', '$7$', '$10$'], key: 'a', sol: r`$(f \circ g)(2) = f(g(2)) = f(1) = 1^2 + 1 = 2$. The value $7$ is $(g \circ f)(2) = g(5)$: the order matters.`, d: 1, c: 'understanding', t: [3], time: 45 }), (C) => { C.which([2, 5, 7, 10], f17(g17(2))); C.assert(g17(f17(2)) === 7, 'g o f (2) = 7'); });
const f18 = (x) => 3 * x + 2, g18 = (x) => x / 3;
const m18o = [(x) => x + 2 / 3, (x) => x + 2, (x) => x, (x) => 3 * x + 2 / 3];
Q('m18', mk.mcq({ stem: r`For $f(x) = 3x + 2$ and $g(x) = \dfrac{x}{3}$, the composite $(g \circ f)(x)$ equals`, opts: [r`$x + \dfrac23$`, '$x + 2$', '$x$', r`$3x + \dfrac23$`], key: 'a', sol: r`$(g \circ f)(x) = g(3x + 2) = \dfrac{3x + 2}{3} = x + \dfrac23$. Note $(f \circ g)(x) = 3 \cdot \dfrac x3 + 2 = x + 2$, which is option (b).`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which(m18o.map((h) => same(h, (x) => g18(f18(x)))), true));
const f19 = (x) => x / (x - 1);
const m19o = [(x) => x, (x) => 1 / x, (x) => x / (x - 1), (x) => (x - 1) / x];
Q('m19', mk.mcq({ stem: r`Let $f(x) = \dfrac{x}{x - 1}$ for $x \ne 1$. Composing $f$ with itself gives $(f \circ f)(x) =$`, opts: ['$x$', r`$\dfrac1x$`, r`$\dfrac{x}{x - 1}$`, r`$\dfrac{x - 1}{x}$`], key: 'a', sol: r`$f(f(x)) = \dfrac{\frac{x}{x - 1}}{\frac{x}{x - 1} - 1} = \dfrac{\frac{x}{x - 1}}{\frac{1}{x - 1}} = x$. So $f$ undoes itself.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => C.which(m19o.map((h) => same(h, (x) => f19(f19(x)), XS.filter((x) => Math.abs(x - 1) > 1e-6))), true));
const f20 = (x) => x + 4, g20 = (x) => x * x;
Q('m20', mk.mcq({ stem: r`Take $f(x) = x + 4$ and $g(x) = x^2$. By how much does $(g \circ f)(-1)$ exceed $(f \circ g)(-1)$?`, opts: ['$0$', '$4$', '$8$', '$12$'], key: 'b', sol: r`$(g \circ f)(-1) = g(3) = 9$ and $(f \circ g)(-1) = f(1) = 5$; the difference is $9 - 5 = 4$, so $g \circ f \ne f \circ g$.`, d: 2, c: 'application', t: [3], time: 60 }), (C) => C.which([0, 4, 8, 12], g20(f20(-1)) - f20(g20(-1))));

// =============================================================== MCQ — t04 invertible functions
const f21 = (x) => (2 * x - 5) / 3;
const m21o = [(x) => (3 * x + 5) / 2, (x) => (3 * x - 5) / 2, (x) => 3 / (2 * x - 5), (x) => (2 * x + 5) / 3];
Q('m21', mk.mcq({ stem: r`The bijection $f : \mathbb{R} \to \mathbb{R}$, $f(x) = \dfrac{2x - 5}{3}$, has inverse`, opts: [r`$\dfrac{3x + 5}{2}$`, r`$\dfrac{3x - 5}{2}$`, r`$\dfrac{3}{2x - 5}$`, r`$\dfrac{2x + 5}{3}$`], key: 'a', sol: r`Put $y = \dfrac{2x - 5}{3}$: $3y = 2x - 5$, so $x = \dfrac{3y + 5}{2}$. Hence $f^{-1}(x) = \dfrac{3x + 5}{2}$. Note that $\dfrac{3}{2x - 5}$ is a reciprocal, not an inverse.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => C.which(m21o.map((h) => same((x) => f21(h(x)), (x) => x) && same((x) => h(f21(x)), (x) => x)), true));
const m22o = [(x) => Math.sqrt(x - 3), (x) => Math.sqrt(x) - 3, (x) => (x - 3) ** 2, (x) => -Math.sqrt(x - 3)];
Q('m22', mk.mcq({ stem: r`The function $f : [0, \infty) \to [3, \infty)$, $f(x) = x^2 + 3$, is a bijection. Its inverse $f^{-1}(x)$, for $x \ge 3$, is`, opts: [r`$\sqrt{x - 3}$`, r`$\sqrt{x} - 3$`, '$(x - 3)^2$', r`$-\sqrt{x - 3}$`], key: 'a', sol: r`$y = x^2 + 3$ gives $x^2 = y - 3$, and $x \ge 0$ picks the non-negative root: $x = \sqrt{y - 3}$. The negative root is outside the domain $[0, \infty)$.`, d: 3, c: 'application', t: [4], time: 75 }), (C) => {
  const ys = range(0, 60).map((k) => 3 + k / 4);
  const f = (x) => x * x + 3;
  C.which(m22o.map((h) => ys.every((y) => h(y) >= 0 && near(f(h(y)), y))), true);
});
Q('m23', mk.mcq({ stem: r`A function $f : A \to B$ has an inverse function $f^{-1} : B \to A$ exactly when $f$ is`, opts: ['one-one and onto', 'one-one only', 'onto only', 'many-one and onto'], key: 'a', sol: r`$f^{-1}$ must send each $y \in B$ to exactly one $x$: onto gives at least one pre-image, one-one gives at most one. Both are needed.`, d: 1, c: 'recall', t: [4], time: 30 }), (C) => {
  // on small sets: invertible (has a two-sided inverse) <=> bijective
  const B = [1, 2, 3];
  const inv = (g) => allFunctions(3, B).some((h) => B.every((y, i) => g[h[i] - 1] === y) && B.every((x, i) => h[g[i] - 1] === x));
  C.assert(allFunctions(3, B).every((g) => inv(g) === (injective(g) && surjective(g, B))), 'invertible iff bijective on 3 elements');
  C.key('a');
});
const f24 = (x) => (4 * x + 1) / (x - 2);
const m24o = [(x) => (2 * x + 1) / (x - 4), (x) => (2 * x - 1) / (x + 4), (x) => (x - 2) / (4 * x + 1), (x) => (2 * x + 1) / (4 - x)];
Q('m24', mk.mcq({ stem: r`The map $f : \mathbb{R} - \{2\} \to \mathbb{R} - \{4\}$ given by $f(x) = \dfrac{4x + 1}{x - 2}$ is invertible. Its inverse is`, opts: [r`$\dfrac{2x + 1}{x - 4}$`, r`$\dfrac{2x - 1}{x + 4}$`, r`$\dfrac{x - 2}{4x + 1}$`, r`$\dfrac{2x + 1}{4 - x}$`], key: 'a', sol: r`$y(x - 2) = 4x + 1 \Rightarrow xy - 4x = 2y + 1 \Rightarrow x = \dfrac{2y + 1}{y - 4}$. So $f^{-1}(x) = \dfrac{2x + 1}{x - 4}$, defined for $x \ne 4$.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => {
  const xs = XS.filter((x) => Math.abs(x - 2) > 1e-3 && Math.abs(x - 4) > 1e-3);
  C.which(m24o.map((h) => xs.every((x) => near(f24(h(x)), x))), true);
});
Q('m25', mk.mcq({ stem: r`On one set of axes, the graph of an invertible function and the graph of its inverse are mirror images in the line`, opts: ['$y = x$', '$y = -x$', 'the $x$-axis', 'the $y$-axis'], key: 'a', sol: r`$(a, b)$ lies on the graph of $f$ exactly when $(b, a)$ lies on the graph of $f^{-1}$, and swapping coordinates is reflection in $y = x$.`, d: 1, c: 'recall', t: [4], time: 30 }), (C) => {
  const f = (x) => 2 * x - 4, g = (x) => (x + 4) / 2;
  C.assert(range(-6, 6).every((a) => near(g(f(a)), a)), '(a, f(a)) on f gives (f(a), a) on the inverse');
  C.key('a');
});
const f26 = (x) => x ** 3 - 2;
Q('m26', mk.mcq({ stem: r`For the bijection $f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^3 - 2$, the value of $f^{-1}(6)$ is`, opts: ['$2$', '$4$', '$214$', r`$\sqrt[3]{4}$`], key: 'a', sol: r`$f^{-1}(6)$ is the $x$ with $x^3 - 2 = 6$, so $x^3 = 8$ and $x = 2$. The value $214 = f(6)$ is the trap.`, d: 2, c: 'application', t: [4], time: 60 }), (C) => C.which([2, 4, 214, Math.cbrt(4)], Math.cbrt(6 + 2)));

// =============================================================== assertion-reason
const parityR = relFrom(range(-10, 10), (a, b) => mod(a + b, 2) === 0);
Q('ar1', mk.ar({ a: r`On $\mathbb{Z}$, the relation "$a + b$ is even" is an equivalence relation.`, r: r`$a + b$ is even exactly when $a$ and $b$ are both even or both odd.`, key: 'a', sol: r`R turns the relation into "same parity", which is visibly reflexive, symmetric and transitive. So both are true and R explains A.`, d: 2, c: 'analysis', t: [1] }), (C) => { C.assert(equivalence(range(-10, 10), parityR) && classes(range(-10, 10), parityR).length === 2, 'two parity classes'); C.key('a'); });
Q('ar2', mk.ar({ a: r`$f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$, is not onto.`, r: r`$x^2 \ge 0$ for every real $x$.`, key: 'a', sol: r`Because every output is non-negative, a negative number such as $-1$ in the codomain has no pre-image. R is exactly the reason for A.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(range(-100, 100).every((k) => (k / 10) ** 2 >= 0), 'squares non-negative'); C.key('a'); });
Q('ar3', mk.ar({ a: r`For $f(x) = 2x$ and $g(x) = x + 1$, we have $f \circ g = g \circ f$.`, r: r`Composition of functions is not commutative in general.`, key: 'd', sol: r`$(f \circ g)(x) = 2x + 2$ but $(g \circ f)(x) = 2x + 1$, so A is false. R is a true general statement.`, d: 2, c: 'application', t: [3] }), (C) => { C.assert(!same((x) => 2 * (x + 1), (x) => 2 * x + 1), 'f o g differs from g o f'); C.key('d'); });
Q('ar4', mk.ar({ a: r`$f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$, has no inverse function.`, r: r`$f(x) = x^2$ is not one-one on $\mathbb{R}$.`, key: 'a', sol: r`Since $f(-2) = f(2)$, an inverse would have to send $4$ to two numbers at once. Failing one-one is enough to rule out an inverse, so R explains A.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(collision((x) => x * x) !== null, 'not one-one'); C.key('a'); });
Q('ar5', mk.ar({ a: r`If $(2, 7)$ lies on the graph of an invertible function $f$, then $(7, 2)$ lies on the graph of $f^{-1}$.`, r: r`The graph of $f^{-1}$ is the reflection of the graph of $f$ in the line $y = x$.`, key: 'a', sol: r`$f(2) = 7$ means $f^{-1}(7) = 2$, and reflecting in $y = x$ swaps the coordinates. Both are true, and R explains A.`, d: 2, c: 'understanding', t: [4] }), (C) => { const f = (x) => 2.5 * x + 2, g = (x) => (x - 2) / 2.5; C.assert(f(2) === 7 && near(g(7), 2), 'swap'); C.key('a'); });
Q('ar6', mk.ar({ a: r`On $\{1, 2, 3\}$, the relation $\{(1, 1), (2, 2)\}$ is transitive.`, r: r`On $\{1, 2, 3\}$, the relation $\{(1, 1), (2, 2)\}$ is reflexive.`, key: 'c', sol: r`Every chain uses a loop and ends in a pair already present, so A is true. $(3, 3)$ is missing, so R is false.`, d: 2, c: 'application', t: [1] }), (C) => { const R = [[1, 1], [2, 2]]; C.assert(transitive(R) && !reflexive(A3, R), 'T, not R'); C.key('c'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: 'If two functions are both one-one, then their composite (where defined) is also one-one.', key: 't', sol: r`If $f(g(x_1)) = f(g(x_2))$, one-one $f$ gives $g(x_1) = g(x_2)$, and one-one $g$ gives $x_1 = x_2$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const B = [1, 2, 3, 4];
  const inj = allFunctions(3, B).filter(injective);
  const ok = inj.every((g) => allFunctions(4, B).filter(injective).every((f) => injective(g.map((y) => f[y - 1]))));
  C.assert(ok, 'every composite of injections is injective (sets of size 3 and 4)');
  C.key('t');
});
Q('tf2', mk.tf({ stem: 'Every many-one function is an into function.', key: 'f', sol: r`$f : \mathbb{R} \to [0, \infty)$, $f(x) = x^2$, is many-one ($f(-1) = f(1)$) and yet onto: every $y \ge 0$ is $(\sqrt y)^2$.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const counter = allFunctions(3, [1, 2]).filter((g) => !injective(g) && surjective(g, [1, 2]));
  C.assert(counter.length > 0, 'many-one onto functions exist');
  C.key('f');
});
Q('tf3', mk.tf({ stem: r`On $A = \{1, 2, 3\}$, the identity relation $\{(1, 1), (2, 2), (3, 3)\}$ is an equivalence relation and also a function from $A$ to $A$.`, key: 't', sol: r`It is reflexive, symmetric and transitive; and each element appears exactly once as a first entry, so it is a function (the identity function).`, d: 2, c: 'understanding', t: [1, 2] }), (C) => { const I = [[1, 1], [2, 2], [3, 3]]; C.assert(equivalence(A3, I) && A3.every((a) => I.filter(([x]) => x === a).length === 1), 'equivalence and function'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`For $f(x) = 5x - 2$ on $\mathbb{R}$, $f^{-1}(8) = 2$.`, key: 't', sol: r`$5x - 2 = 8$ gives $x = 2$, so $f^{-1}(8) = 2$.`, d: 1, c: 'understanding', t: [4] }), (C) => { C.assert((8 + 2) / 5 === 2, 'pre-image of 8'); C.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`Every relation on a three-element set that contains all three loops $(a, a)$ is reflexive. The number of such reflexive relations is ____.`, acc: [['64']], sol: r`The $3$ loops are forced; each of the other $6$ pairs is free: $2^6 = 64$.`, d: 2, c: 'understanding', t: [1] }), (C) => C.blank(allRelations(A3).filter((R) => reflexive(A3, R)).length));
Q('fb2', mk.fill({ stem: r`If $f(x) = 2x + 1$ and $g(x) = x^2$, then $(g \circ f)(1) =$ ____.`, acc: [['9']], sol: r`$(g \circ f)(1) = g(3) = 9$.`, d: 1, c: 'understanding', t: [3] }), (C) => C.blank(((x) => x * x)(2 * 1 + 1)));
Q('fb3', mk.fill({ stem: r`The least number in the range of $f(x) = |x - 2| + 3$, $x \in \mathbb{R}$, is ____.`, acc: [['3']], sol: r`$|x - 2| \ge 0$ with equality at $x = 2$, so the least value is $0 + 3 = 3$.`, d: 2, c: 'understanding', t: [2] }), (C) => C.blank(Math.min(...range(-100, 100).map((k) => Math.abs(k / 10 - 2) + 3))));
Q('fb4', mk.fill({ stem: r`If $f(x) = \dfrac{x + 3}{2}$ on $\mathbb{R}$, then $f^{-1}(x) =$ ____ (write it in the form $ax + b$).`, acc: [['2x - 3', '2x-3', '2x − 3']], sol: r`$y = \dfrac{x + 3}{2} \Rightarrow x = 2y - 3$, so $f^{-1}(x) = 2x - 3$.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(same((x) => (2 * x - 3 + 3) / 2, (x) => x), 'f(f^-1(x)) = x'); C.blank('2x - 3'); });

// =============================================================== numerical
const P4 = ['a', 'b', 'c', 'd'];
Q('n01', mk.num({ stem: r`On the four-letter set $\{a, b, c, d\}$, how many equivalence relations contain the pair $(a, b)$?`, value: 5, sol: r`Such a relation puts $a$ and $b$ in one class. Treat $\{a, b\}$ as one object; the ways to split the three objects $\{a, b\}$, $c$, $d$ into classes are $5$.`, scheme: [['5', 1]], d: 4, c: 'analysis', t: [1], time: 150 }), (C) => C.val(allRelations(P4).filter((R) => has(R, 'a', 'b') && equivalence(P4, R)).length));
Q('n02', mk.num({ stem: r`How many one-one functions are there from $\{x, y, z\}$ to a set of $5$ elements?`, value: 60, sol: r`$5 \times 4 \times 3 = 60$.`, scheme: [['60', 1]], d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.val(countInj(3, [1, 2, 3, 4, 5])));
const f3 = (x) => 3 * x - 4, g3 = (x) => x * x + 1;
Q('n03', mk.num({ stem: r`Let $f(x) = 3x - 4$ and $g(x) = x^2 + 1$. Find $(f \circ g)(2) - (g \circ f)(2)$.`, value: 6, sol: r`$(f \circ g)(2) = f(5) = 11$; $(g \circ f)(2) = g(2) = 5$; difference $11 - 5 = 6$.`, scheme: [['6', 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => { C.val(f3(g3(2)) - g3(f3(2))); C.sol([11, 5]); });
Q('n04', mk.num({ stem: r`For the bijection $f(x) = \dfrac{x + 7}{3}$ on $\mathbb{R}$, find $f^{-1}(5)$.`, value: 8, sol: r`$\dfrac{x + 7}{3} = 5 \Rightarrow x = 8$.`, scheme: [['8', 1]], d: 1, c: 'understanding', t: [4], time: 45 }), (C) => C.val(3 * 5 - 7));
const f5 = (x) => x * x - 4 * x + 9;
Q('n05', mk.num({ stem: r`Find the least element of the range of $f(x) = x^2 - 4x + 9$, $x \in \mathbb{R}$.`, value: 5, sol: r`$f(x) = (x - 2)^2 + 5 \ge 5$, with equality at $x = 2$: least value $5$.`, scheme: [['5', 1]], d: 2, c: 'application', t: [2], time: 60 }), (C) => C.val(Math.min(...range(-600, 600).map((k) => f5(k / 100)))));
const n06R = relFrom(range(1, 8), (a, b) => mod(a - b, 3) === 0);
Q('n06', mk.num({ stem: r`On $\{1, 2, \dots, 8\}$, $a\,R\,b$ whenever $a - b$ is a multiple of $3$. How many ordered pairs belong to $R$?`, value: 22, sol: r`Classes $\{1, 4, 7\}$, $\{2, 5, 8\}$, $\{3, 6\}$ give $3^2 + 3^2 + 2^2 = 9 + 9 + 4 = 22$ pairs.`, scheme: [['22', 1]], d: 3, c: 'understanding', t: [1], time: 90 }), (C) => C.val(n06R.length));

// =============================================================== short answer, 2 marks
const s201R = relFrom(range(1, 6), (a, b) => mod(a + b, 2) === 0);
Q('s201', mk.short({ marks: 2, stem: r`A quiz master pairs the numbered cards $1$ to $6$ by the rule $a\,R\,b$ if and only if $a + b$ is even. Show that $R$ is symmetric and write the equivalence class $[2]$.`, model: r`**Symmetric:** $a + b = b + a$, so if $a + b$ is even, so is $b + a$; hence $a\,R\,b \Rightarrow b\,R\,a$.\n\n**Class:** $b \in [2]$ when $2 + b$ is even, i.e. $b$ is even: $[2] = \{2, 4, 6\}$.`, sol: 'Use a + b = b + a; then list the cards with the same parity as 2.', scheme: [['Symmetry shown', 1], ['[2] = {2, 4, 6}', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(symmetric(s201R) && classes(range(1, 6), s201R)[1].join() === '2,4,6', 'class of 2'); C.model([r`\{2, 4, 6\}`]); });
Q('s202', mk.short({ marks: 2, stem: r`Write down a relation on $\{1, 2, 3\}$ that is symmetric and transitive but **not** reflexive, and say which pair is missing for reflexivity.`, model: r`Take $R = \{(1, 1), (2, 2)\}$ (or the empty relation). Every pair is its own reverse, so $R$ is symmetric; every chain ends in a loop already present, so it is transitive. It is not reflexive because $(3, 3) \notin R$.`, sol: 'Any symmetric, transitive relation that leaves out at least one loop.', scheme: [['Valid example', 1], ['Missing loop named', 1]], d: 3, c: 'application', t: [1], time: 90 }), (C) => { C.assert(props(A3, [[1, 1], [2, 2]]) === '-ST', 'example is -ST'); C.model(['(3, 3)']); });
const s203f = (x) => Math.sqrt(x - 3);
Q('s203', mk.short({ marks: 2, stem: r`Find the domain and the range of the real function $f(x) = \sqrt{x - 3}$.`, model: r`**Domain:** $x - 3 \ge 0$, so $x \ge 3$: domain $[3, \infty)$.\n\n**Range:** the square root takes every non-negative value ($f(3 + t^2) = t$ for $t \ge 0$) and no negative value: range $[0, \infty)$.`, sol: 'Radicand non-negative; then ask which outputs occur.', scheme: [['Domain [3, ∞)', 1], ['Range [0, ∞)', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert(Number.isNaN(s203f(2.99)) && s203f(3) === 0 && range(0, 30).every((t) => near(s203f(3 + t * t), t)), 'domain and range'); C.model([r`[3, \infty)`, r`[0, \infty)`]); });
const s204img = range(1, 50).map((n) => 3 * n + 2);
Q('s204', mk.short({ marks: 2, stem: r`A ticket machine prints the number $f(n) = 3n + 2$ for the $n$th customer, $n \in \mathbb{N}$, as a map $f : \mathbb{N} \to \mathbb{N}$. Show that $f$ is one-one but not onto.`, model: r`**One-one:** $3n_1 + 2 = 3n_2 + 2 \Rightarrow n_1 = n_2$.\n\n**Not onto:** every output is at least $5$, so $1$ (and also $6$, which is not of the form $3n + 2$) has no pre-image in $\mathbb{N}$.`, sol: 'Cancel for one-one; exhibit a natural number that is never printed.', scheme: [['One-one', 1], ['A value with no pre-image', 1]], d: 2, c: 'application', t: [2], time: 90 }), (C) => { C.assert(injective(s204img) && !s204img.includes(1) && !s204img.includes(6), 'one-one, 1 and 6 missed'); C.model([5, 6]); });
const fs5 = (x) => x * x, gs5 = (x) => x + 5;
Q('s205', mk.short({ marks: 2, stem: r`For $f(x) = x^2$ and $g(x) = x + 5$ on $\mathbb{R}$, write $(f \circ g)(x)$ and $(g \circ f)(x)$, and give one value of $x$ that shows they are different functions.`, model: r`$(f \circ g)(x) = f(x + 5) = (x + 5)^2$ and $(g \circ f)(x) = g(x^2) = x^2 + 5$.\n\nAt $x = 0$: $(f \circ g)(0) = 25$ but $(g \circ f)(0) = 5$, so $f \circ g \ne g \circ f$.`, sol: 'Substitute in the right order, then compare at a convenient point.', scheme: [['Both composites', 1], ['Value showing they differ', 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => { C.assert(same((x) => fs5(gs5(x)), (x) => (x + 5) ** 2) && same((x) => gs5(fs5(x)), (x) => x * x + 5) && fs5(gs5(0)) === 25 && gs5(fs5(0)) === 5, 'composites'); C.model([25, 5]); });
const f206 = (x) => (x - 1) / (x + 1);
Q('s206', mk.short({ marks: 2, stem: r`If $f(x) = \dfrac{x - 1}{x + 1}$ for $x \ne -1$, simplify $(f \circ f)(x)$ (for $x \ne 0$, $x \ne -1$).`, model: r`$f(f(x)) = \dfrac{\frac{x - 1}{x + 1} - 1}{\frac{x - 1}{x + 1} + 1} = \dfrac{\frac{-2}{x + 1}}{\frac{2x}{x + 1}} = -\dfrac{1}{x}$.`, sol: 'Combine the numerator and the denominator over x + 1 before dividing.', scheme: [['Numerator and denominator simplified', 1], ['Result −1/x', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => { C.assert(same((x) => f206(f206(x)), (x) => -1 / x, XS.filter((x) => Math.abs(x) > 1e-3 && Math.abs(x + 1) > 1e-3)), 'f o f = -1/x'); C.model([r`-\dfrac{1}{x}`]); });
const f207 = (x) => 7 - 4 * x;
Q('s207', mk.short({ marks: 2, stem: r`A delivery app charges a rider a penalty score $f(x) = 7 - 4x$ that is a bijection of $\mathbb{R}$. Find $f^{-1}(x)$ and verify that $f\left(f^{-1}(x)\right) = x$.`, model: r`$y = 7 - 4x \Rightarrow x = \dfrac{7 - y}{4}$, so $f^{-1}(x) = \dfrac{7 - x}{4}$.\n\nCheck: $f\left(\dfrac{7 - x}{4}\right) = 7 - (7 - x) = x$.`, sol: 'Solve y = 7 − 4x for x, then substitute back.', scheme: [['Inverse found', 1], ['Verification', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => { C.assert(same((x) => f207((7 - x) / 4), (x) => x), 'inverse'); C.model([r`\dfrac{7 - x}{4}`]); });
Q('s208', mk.short({ marks: 2, stem: r`Show that $f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^3 + 5$, is invertible and write $f^{-1}(x)$.`, model: r`**One-one:** $x_1^3 + 5 = x_2^3 + 5 \Rightarrow x_1^3 = x_2^3 \Rightarrow x_1 = x_2$. **Onto:** for any real $y$, $x = \sqrt[3]{y - 5}$ gives $f(x) = y$. So $f$ is a bijection, hence invertible, with $f^{-1}(x) = \sqrt[3]{x - 5}$.`, sol: 'Bijective implies invertible; solve y = x³ + 5 for x.', scheme: [['One-one and onto', 1], ['Inverse', 1]], d: 2, c: 'application', t: [4], time: 90 }), (C) => { C.assert(collision((x) => x ** 3 + 5) === null && [-30, -5, 0, 13, 69].every((y) => near(Math.cbrt(y - 5) ** 3 + 5, y)), 'bijection and inverse'); C.model([r`\sqrt[3]{x - 5}`]); });
const f209 = (x) => 1 / (x - 2);
Q('s209', mk.short({ marks: 2, stem: r`Find the domain and the range of $f(x) = \dfrac{1}{x - 2}$.`, model: r`**Domain:** the denominator must not vanish: $\mathbb{R} - \{2\}$.\n\n**Range:** $y = \dfrac{1}{x - 2} \Rightarrow x = 2 + \dfrac1y$, possible for every $y \ne 0$, and $y = 0$ never occurs: range $\mathbb{R} - \{0\}$.`, sol: 'Solve for x in terms of y to see which outputs occur.', scheme: [['Domain', 1], ['Range', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert([-9, -0.5, 0.25, 3, 40].every((y) => near(f209(2 + 1 / y), y)) && !Number.isFinite(f209(2)), 'range and domain'); C.model([r`\mathbb{R} - \{2\}`, r`\mathbb{R} - \{0\}`]); });

// =============================================================== short answer, 3 marks
const s301R = relFrom(range(-14, 14), (a, b) => mod(3 * a + 4 * b, 7) === 0);
Q('s301', mk.short({ marks: 3, stem: r`On $\mathbb{Z}$, define $a\,R\,b$ if and only if $3a + 4b$ is divisible by $7$. Prove that $R$ is an equivalence relation.`, model: r`**Reflexive:** $3a + 4a = 7a$, divisible by $7$.\n\n**Symmetric:** if $3a + 4b = 7k$, then $3b + 4a = 7(a + b) - (3a + 4b) = 7(a + b - k)$, divisible by $7$.\n\n**Transitive:** if $3a + 4b = 7k$ and $3b + 4c = 7m$, adding gives $3a + 7b + 4c = 7(k + m)$, so $3a + 4c = 7(k + m - b)$.\n\nHence $R$ is an equivalence relation.`, sol: 'Rewrite each condition as 7 times an integer.', scheme: [['Reflexive', 1], ['Symmetric', 1], ['Transitive', 1]], d: 3, c: 'application', t: [1], time: 180 }), (C) => { C.assert(equivalence(range(-14, 14), s301R), 'equivalence on a sample'); C.model(['7(a + b - k)', '7(k + m - b)']); });
const tickets = range(1, 20);
const s302R = relFrom(tickets, (a, b) => a % 10 === b % 10);
Q('s302', mk.short({ marks: 3, stem: r`A school fair sells raffle tickets numbered $1$ to $20$. Two tickets are related when their numbers end in the same digit. Explain why this is an equivalence relation, write the class of ticket $13$, and state how many classes there are.`, model: r`"Same last digit" is equality of one property of the number, so the relation is reflexive (same as itself), symmetric (equality works both ways) and transitive (equal to equal is equal).\n\nClass of $13$: tickets ending in $3$, i.e. $\{3, 13\}$.\n\nThe last digit can be any of $0, 1, \dots, 9$, so there are $10$ classes.`, sol: 'Equality of a property always gives an equivalence relation.', scheme: [['Equivalence justified', 1], ['[13] = {3, 13}', 1], ['10 classes', 1]], d: 2, c: 'application', t: [1], time: 150 }), (C) => { const cl = classes(tickets, s302R); C.assert(equivalence(tickets, s302R) && cl.length === 10 && cl.find((c) => c.includes(13)).join() === '3,13', 'classes'); C.model([r`\{3, 13\}`, 10]); });
const f303 = (x) => x * Math.abs(x);
Q('s303', mk.short({ marks: 3, stem: r`Decide, with reasons, whether $f : \mathbb{R} \to \mathbb{R}$, $f(x) = x\,|x|$, is one-one and whether it is onto.`, model: r`$f(x) = x^2$ for $x \ge 0$ and $f(x) = -x^2$ for $x < 0$.\n\n**One-one:** outputs of non-negative inputs are $\ge 0$ and of negative inputs are $< 0$, so equal outputs come from inputs of the same sign; on each part $x^2$ (or $-x^2$) is one-one there. Hence $f$ is one-one.\n\n**Onto:** for $y \ge 0$ take $x = \sqrt{y}$; for $y < 0$ take $x = -\sqrt{-y}$. Every real $y$ is reached, so $f$ is onto — a bijection.`, sol: 'Split by the sign of x.', scheme: [['Piecewise form', 1], ['One-one', 1], ['Onto', 1]], d: 4, c: 'analysis', t: [2], time: 180 }), (C) => { C.assert(collision(f303) === null && [-16, -2, 0, 3, 25].every((y) => near(f303(y >= 0 ? Math.sqrt(y) : -Math.sqrt(-y)), y)), 'bijection'); C.model([r`-\sqrt{-y}`]); });
const f304 = (x) => (x * x) / (1 + x * x);
Q('s304', mk.short({ marks: 3, stem: r`Is $f : \mathbb{R} \to \mathbb{R}$, $f(x) = \dfrac{x^2}{1 + x^2}$, one-one? Is it onto? Justify both answers.`, model: r`**Not one-one:** $f(-1) = f(1) = \dfrac12$.\n\n**Not onto:** $0 \le x^2 < 1 + x^2$, so $0 \le f(x) < 1$ for every real $x$. A number such as $2$ (or $-1$) in the codomain has no pre-image. The range is $[0, 1)$.`, sol: 'An even function repeats values; bound the fraction for onto.', scheme: [['Not one-one with example', 1], ['0 ≤ f(x) < 1 shown', 1], ['Not onto, value named', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), (C) => { C.assert(f304(1) === 0.5 && f304(-1) === 0.5 && range(-1000, 1000).every((k) => f304(k / 7) >= 0 && f304(k / 7) < 1), 'range [0, 1)'); C.model([r`[0, 1)`, 2]); });
const f305 = (x) => Math.sqrt(x), g305 = (x) => x * x - 1;
Q('s305', mk.short({ marks: 3, stem: r`Let $f(x) = \sqrt{x}$ for $x \ge 0$ and $g(x) = x^2 - 1$ for $x \in \mathbb{R}$. Find $(f \circ g)(x)$ and its domain, and find $(g \circ f)(x)$ for $x \ge 0$.`, model: r`$(f \circ g)(x) = f(x^2 - 1) = \sqrt{x^2 - 1}$, defined when $x^2 - 1 \ge 0$, i.e. $x \le -1$ or $x \ge 1$: domain $(-\infty, -1] \cup [1, \infty)$.\n\n$(g \circ f)(x) = g(\sqrt x) = (\sqrt x)^2 - 1 = x - 1$ for $x \ge 0$.`, sol: 'The inner output must lie in the domain of the outer function.', scheme: [['f o g formula', 1], ['Its domain', 1], ['g o f = x − 1', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => {
  C.assert(Number.isNaN(f305(g305(0.5))) && near(f305(g305(2)), Math.sqrt(3)) && near(f305(g305(-1)), 0), 'domain of f o g');
  C.assert(range(0, 40).every((k) => near(g305(f305(k / 4)), k / 4 - 1)), 'g o f = x - 1');
  C.model(['x - 1', r`\sqrt{x^2 - 1}`]);
});
const f306 = (x) => 2 * x + 3, g306 = (x) => (x - 3) / 2;
Q('s306', mk.short({ marks: 3, stem: r`For $f(x) = 2x + 3$ and $g(x) = \dfrac{x - 3}{2}$ on $\mathbb{R}$, show that $f \circ g$ and $g \circ f$ are both the identity function, and state what this says about $f$ and $g$.`, model: r`$(f \circ g)(x) = 2 \cdot \dfrac{x - 3}{2} + 3 = x$ and $(g \circ f)(x) = \dfrac{(2x + 3) - 3}{2} = x$.\n\nBoth composites are the identity on $\mathbb{R}$, so $f$ and $g$ are inverses of each other: $g = f^{-1}$ and $f = g^{-1}$.`, sol: 'Two-sided identity composites characterise inverse functions.', scheme: [['f o g = x', 1], ['g o f = x', 1], ['Conclusion: mutual inverses', 1]], d: 2, c: 'understanding', t: [3, 4], time: 120 }), (C) => { C.assert(same((x) => f306(g306(x)), (x) => x) && same((x) => g306(f306(x)), (x) => x), 'identity both ways'); C.model([r`f^{-1}`]); });
const f307 = (x) => (2 * x + 3) / (x + 1);
const inv307 = (y) => (3 - y) / (y - 2);
Q('s307', mk.short({ marks: 3, stem: r`Show that $f : \mathbb{R} - \{-1\} \to \mathbb{R} - \{2\}$, $f(x) = \dfrac{2x + 3}{x + 1}$, is invertible, and find $f^{-1}$.`, model: r`**Values avoid $2$:** $\dfrac{2x + 3}{x + 1} = 2$ would give $2x + 3 = 2x + 2$, impossible.\n\n**Solve $y = f(x)$:** $y(x + 1) = 2x + 3 \Rightarrow x(y - 2) = 3 - y \Rightarrow x = \dfrac{3 - y}{y - 2}$, a unique $x$ (and $x \ne -1$, because setting $3 - y = -(y - 2)$ leads to a false statement). So $f$ is one-one and onto, hence invertible.\n\n$f^{-1}(x) = \dfrac{3 - x}{x - 2}$, $x \ne 2$.`, sol: 'A unique solution x for every y in the codomain proves one-one and onto together.', scheme: [['Range excludes 2', 1], ['Unique pre-image found', 1], ['Inverse stated', 1]], d: 3, c: 'application', t: [4], time: 180 }), (C) => {
  const ys = [-8, -1, 0, 1.5, 2.5, 3, 11];
  C.assert(ys.every((y) => near(f307(inv307(y)), y) && Math.abs(inv307(y) + 1) > 1e-9) && collision(f307, XS.filter((x) => Math.abs(x + 1) > 1e-6)) === null, 'inverse');
  C.model([r`\dfrac{3 - x}{x - 2}`]);
});
const f308 = (x) => x * x - 2 * x - 1;
const inv308 = (y) => 1 + Math.sqrt(y + 2);
Q('s308', mk.short({ marks: 3, stem: r`The function $f : [1, \infty) \to [-2, \infty)$ is $f(x) = x^2 - 2x - 1$. Show that it is a bijection and find $f^{-1}(x)$.`, model: r`$f(x) = (x - 1)^2 - 2$.\n\n**One-one:** for $x \ge 1$, $x - 1 \ge 0$, and $(x_1 - 1)^2 = (x_2 - 1)^2$ with both bases non-negative gives $x_1 = x_2$.\n\n**Onto and inverse:** for $y \ge -2$, $(x - 1)^2 = y + 2 \Rightarrow x = 1 + \sqrt{y + 2} \ge 1$. So every $y$ is reached and $f^{-1}(x) = 1 + \sqrt{x + 2}$.`, sol: 'Complete the square; the restricted domain picks the positive root.', scheme: [['Completed square', 1], ['One-one on the domain', 1], ['Inverse 1 + √(x + 2)', 1]], d: 4, c: 'analysis', t: [4], time: 180 }), (C) => {
  const ys = range(0, 40).map((k) => -2 + k / 3);
  C.assert(ys.every((y) => inv308(y) >= 1 && near(f308(inv308(y)), y)) && collision(f308, range(0, 300).map((k) => 1 + k / 13)) === null, 'bijection on [1, inf)');
  C.model([r`1 + \sqrt{x + 2}`]);
});
Q('s309', mk.short({ marks: 3, stem: r`A canteen assigns each of $4$ snack trays to one of $3$ counters. Treating each assignment as a function from the trays to the counters, find (i) the number of all such functions, (ii) how many are onto, (iii) how many are one-one.`, model: r`(i) Each tray has $3$ choices: $3^4 = 81$.\n\n(ii) Onto: one counter gets two trays. Choose the two trays sharing a counter in $\binom42 = 6$ ways and assign the three groups to the counters in $3! = 6$ ways: $36$.\n\n(iii) One-one needs $4$ different counters out of $3$: impossible, so $0$.`, sol: 'Count all, then count by grouping for onto; pigeonhole for one-one.', scheme: [['81', 1], ['36', 1], ['0 with reason', 1]], d: 4, c: 'analysis', t: [2], time: 180 }), (C) => { const B = ['P', 'Q', 'R']; C.assert(allFunctions(4, B).length === 81 && countSurj(4, B) === 36 && countInj(4, B) === 0, 'counts'); C.model([81, 36, 0]); });
const f310 = (x) => 2 * x - 4, g310 = (x) => (x + 4) / 2;
Q('s310', mk.short({ marks: 3, stem: r`For $f : \mathbb{R} \to \mathbb{R}$, $f(x) = 2x - 4$, find $f^{-1}$, describe how the two graphs are placed on one set of axes, and find the point where they meet.`, model: r`$y = 2x - 4 \Rightarrow x = \dfrac{y + 4}{2}$, so $f^{-1}(x) = \dfrac{x + 4}{2}$.\n\nThe graph of $f^{-1}$ is the mirror image of the graph of $f$ in the line $y = x$ (the $y$-intercept $-4$ of $f$ becomes the $x$-intercept $-4$ of $f^{-1}$).\n\nThey meet where $2x - 4 = \dfrac{x + 4}{2}$, i.e. $4x - 8 = x + 4$, $x = 4$: the point $(4, 4)$, which lies on $y = x$.`, sol: 'Reflection in y = x; solve f(x) = f⁻¹(x).', scheme: [['Inverse', 1], ['Reflection described', 1], ['Meeting point (4, 4)', 1]], d: 3, c: 'application', t: [4], time: 180 }), (C) => { C.assert(same((x) => f310(g310(x)), (x) => x) && f310(4) === 4 && g310(4) === 4, 'meet at (4, 4)'); C.model(['(4, 4)', r`\dfrac{x + 4}{2}`]); });

// =============================================================== long answer, 5 marks (in parts)
const sqmodR = relFrom(range(-15, 15), (a, b) => mod(a * a - b * b, 5) === 0);
const l01R10 = relFrom(range(1, 10), (a, b) => mod(a * a - b * b, 5) === 0);
Q('l01', mk.long({ stem: r`On $\mathbb{Z}$, define $a\,R\,b$ if and only if $a^2 - b^2$ is divisible by $5$.\n\n(a) Prove that $R$ is an equivalence relation. [3]\n\n(b) Restrict $R$ to $A = \{1, 2, \dots, 10\}$ and write the class $[1]$ and the class $[5]$. [2]`, model: r`**(a) Reflexive:** $a^2 - a^2 = 0 = 5 \times 0$.\n\n**Symmetric:** if $a^2 - b^2 = 5k$, then $b^2 - a^2 = 5(-k)$.\n\n**Transitive:** if $a^2 - b^2 = 5k$ and $b^2 - c^2 = 5m$, adding gives $a^2 - c^2 = 5(k + m)$.\n\nSo $R$ is an equivalence relation.\n\n**(b)** Squares leave remainder $1$ on division by $5$ for $a = 1, 4, 6, 9$ and remainder $0$ for $a = 5, 10$. So $[1] = \{1, 4, 6, 9\}$ and $[5] = \{5, 10\}$.`, sol: 'Write each difference of squares as 5 times an integer; group by the remainder of a².', scheme: [['Reflexive', 1], ['Symmetric', 1], ['Transitive', 1], ['[1] = {1, 4, 6, 9}', 1], ['[5] = {5, 10}', 1]], d: 3, c: 'application', t: [1], time: 360 }), (C) => {
  C.assert(equivalence(range(-15, 15), sqmodR), 'equivalence');
  const cl = classes(range(1, 10), l01R10);
  C.assert(cl.find((c) => c.includes(1)).join() === '1,4,6,9' && cl.find((c) => c.includes(5)).join() === '5,10', 'classes');
  C.model([r`\{1, 4, 6, 9\}`, r`\{5, 10\}`, '5(k + m)']);
});
const f02 = (x) => (3 * x - 1) / (x - 2);
const inv02 = (y) => (2 * y - 1) / (y - 3);
Q('l02', mk.long({ stem: r`A function maps the reals other than $2$ to the reals other than $3$ by $f(x) = \dfrac{3x - 1}{x - 2}$.\n\n(a) Prove that equal outputs force equal inputs. [2]\n\n(b) Prove that every element of the codomain is attained, giving its pre-image, and conclude that $f$ is a bijection. [3]`, model: r`**(a)** Let $f(x_1) = f(x_2)$: $(3x_1 - 1)(x_2 - 2) = (3x_2 - 1)(x_1 - 2)$.\n\n$3x_1x_2 - 6x_1 - x_2 + 2 = 3x_1x_2 - 6x_2 - x_1 + 2 \Rightarrow -5x_1 = -5x_2 \Rightarrow x_1 = x_2$. So $f$ is one-one.\n\n**(b)** Outputs avoid $3$: $\dfrac{3x - 1}{x - 2} = 3$ gives $3x - 1 = 3x - 6$, impossible.\n\nFor $y \ne 3$: $y(x - 2) = 3x - 1 \Rightarrow x(y - 3) = 2y - 1 \Rightarrow x = \dfrac{2y - 1}{y - 3}$, defined since $y \ne 3$, and $x \ne 2$ (that would need $2y - 1 = 2y - 6$).\n\nSo every $y$ in the codomain has the pre-image $\dfrac{2y - 1}{y - 3}$: $f$ is onto, and with (a) a bijection.`, sol: 'Cross-multiply for one-one; solve for x and check both excluded values for onto.', scheme: [['Cross-multiplication', 1], ['x₁ = x₂', 1], ['f(x) ≠ 3', 1], ['Pre-image (2y − 1)/(y − 3)', 1], ['Pre-image ≠ 2; conclusion', 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => {
  C.assert(collision(f02, XS.filter((x) => Math.abs(x - 2) > 1e-6)) === null, 'one-one');
  C.assert([-7, -1, 0, 2.5, 3.5, 10].every((y) => near(f02(inv02(y)), y) && Math.abs(inv02(y) - 2) > 1e-9), 'pre-image');
  C.model([r`\dfrac{2y - 1}{y - 3}`, 5]);
});
const f03 = (x) => x + 3, g03 = (x) => 2 * x * x;
Q('l03', mk.long({ stem: r`Let $f(x) = x + 3$ and $g(x) = 2x^2$ on $\mathbb{R}$.\n\n(a) Find $(f \circ g)(x)$ and $(g \circ f)(x)$. [2]\n\n(b) Find every real $x$ for which $(f \circ g)(x) = (g \circ f)(x)$, and check your answer. [3]`, model: r`**(a)** $(f \circ g)(x) = f(2x^2) = 2x^2 + 3$; $(g \circ f)(x) = g(x + 3) = 2(x + 3)^2 = 2x^2 + 12x + 18$.\n\n**(b)** $2x^2 + 3 = 2x^2 + 12x + 18 \Rightarrow 12x = -15 \Rightarrow x = -\dfrac54$.\n\nCheck: $(f \circ g)\left(-\dfrac54\right) = 2 \cdot \dfrac{25}{16} + 3 = \dfrac{49}{8}$ and $(g \circ f)\left(-\dfrac54\right) = 2\left(\dfrac74\right)^2 = \dfrac{49}{8}$. Equal, so $x = -\dfrac54$ is the only solution.`, sol: 'Expand, cancel the x² terms, solve the linear equation.', scheme: [['f o g', 1], ['g o f', 1], ['Equation formed', 1], ['x = −5/4', 1], ['Check', 1]], d: 3, c: 'application', t: [3], time: 300 }), (C) => {
  const x = -5 / 4;
  C.assert(near(f03(g03(x)), g03(f03(x))) && near(f03(g03(x)), 49 / 8), 'meets at -5/4, value 49/8');
  C.assert(range(-60, 60).filter((k) => near(f03(g03(k / 4)), g03(f03(k / 4)))).join() === '-5', 'only solution on a grid');
  C.model([r`\dfrac54`, r`\dfrac{49}{8}`]);
});
const f04 = (x) => x * x + 4 * x - 1;
const inv04 = (y) => -2 + Math.sqrt(y + 5);
Q('l04', mk.long({ stem: r`Consider $f : [-2, \infty) \to [-5, \infty)$, $f(x) = x^2 + 4x - 1$.\n\n(a) Show that $f$ is one-one and onto. [2]\n\n(b) Find $f^{-1}(x)$. [2]\n\n(c) Find $f^{-1}(4)$. [1]`, model: r`$f(x) = (x + 2)^2 - 5$.\n\n**(a)** For $x \ge -2$, $x + 2 \ge 0$; equal squares of non-negative numbers have equal bases, so $f(x_1) = f(x_2) \Rightarrow x_1 = x_2$. For $y \ge -5$, $x = -2 + \sqrt{y + 5} \ge -2$ gives $f(x) = y$, so $f$ is onto.\n\n**(b)** From $(x + 2)^2 = y + 5$ and $x + 2 \ge 0$: $f^{-1}(x) = -2 + \sqrt{x + 5}$, $x \ge -5$.\n\n**(c)** $f^{-1}(4) = -2 + \sqrt{9} = 1$ (check: $f(1) = 1 + 4 - 1 = 4$).`, sol: 'Complete the square; the domain restriction selects the positive root.', scheme: [['One-one', 1], ['Onto', 1], ['Inverse formula', 1], ['Domain of inverse / root choice', 1], ['f⁻¹(4) = 1', 1]], d: 4, c: 'application', t: [4], time: 360 }), (C) => {
  const ys = range(0, 50).map((k) => -5 + k / 2);
  C.assert(ys.every((y) => inv04(y) >= -2 && near(f04(inv04(y)), y)) && collision(f04, range(0, 400).map((k) => -2 + k / 17)) === null, 'bijection');
  C.assert(inv04(4) === 1 && f04(1) === 4, 'f^-1(4) = 1');
  C.model([r`-2 + \sqrt{x + 5}`, 1]);
});
const f05 = (x) => 3 * x - 6, g05 = (x) => (x + 6) / 3;
Q('l05', mk.long({ stem: r`A real function is $f(x) = 3x - 6$, $x \in \mathbb{R}$.\n\n(a) Show that $f$ is invertible and find $f^{-1}$. [2]\n\n(b) Sketch $f$ and $f^{-1}$ on the same axes, marking their intercepts, and explain why they meet on the line $y = x$. [3]`, model: r`**(a)** $3x_1 - 6 = 3x_2 - 6 \Rightarrow x_1 = x_2$ (one-one); for any $y$, $x = \dfrac{y + 6}{3}$ works (onto). So $f$ is invertible with $f^{-1}(x) = \dfrac{x + 6}{3}$.\n\n**(b)** $f$: a line through $(2, 0)$ and $(0, -6)$. $f^{-1}$: a line through $(-6, 0)$ and $(0, 2)$ — each intercept of $f$ appears with coordinates swapped.\n\nThe graphs are reflections of each other in $y = x$, so any meeting point is its own reflection, i.e. lies on $y = x$. Solving $3x - 6 = x$ gives $x = 3$: they meet at $(3, 3)$.`, sol: 'Swap coordinates for the inverse graph; a fixed point of reflection lies on the mirror.', scheme: [['Bijective', 1], ['Inverse', 1], ['Intercepts of both lines', 1], ['Reflection in y = x', 1], ['Meeting point (3, 3)', 1]], d: 3, c: 'application', t: [4], time: 300 }), (C) => {
  C.assert(same((x) => f05(g05(x)), (x) => x) && f05(2) === 0 && f05(0) === -6 && g05(-6) === 0 && g05(0) === 2 && f05(3) === 3 && g05(3) === 3, 'intercepts and (3, 3)');
  C.model(['(3, 3)', '(-6, 0)', '(0, 2)']);
});
// functions on A = {1, 2, 3} as image arrays [f(1), f(2), f(3)]
const fA = [2, 3, 1], gA = [1, 3, 2];
const comp = (outer, inner) => inner.map((y) => outer[y - 1]);
const invA = (h) => [1, 2, 3].map((y) => h.indexOf(y) + 1);
Q('l06', mk.long({ stem: r`On $A = \{1, 2, 3\}$, a puzzle app uses the functions $f = \{(1, 2), (2, 3), (3, 1)\}$ and $g = \{(1, 1), (2, 3), (3, 2)\}$.\n\n(a) Write $f \circ g$ and $g \circ f$ as sets of ordered pairs and show they are different. [3]\n\n(b) Find $f^{-1}$ and verify that $f \circ f^{-1}$ is the identity function on $A$. [2]`, model: r`**(a)** $(f \circ g)(1) = f(1) = 2$, $(f \circ g)(2) = f(3) = 1$, $(f \circ g)(3) = f(2) = 3$: $f \circ g = \{(1, 2), (2, 1), (3, 3)\}$.\n\n$(g \circ f)(1) = g(2) = 3$, $(g \circ f)(2) = g(3) = 2$, $(g \circ f)(3) = g(1) = 1$: $g \circ f = \{(1, 3), (2, 2), (3, 1)\}$.\n\nThey differ (for example at $1$), so composition is not commutative here.\n\n**(b)** Reverse each pair of $f$: $f^{-1} = \{(2, 1), (3, 2), (1, 3)\}$, i.e. $f^{-1}(1) = 3$, $f^{-1}(2) = 1$, $f^{-1}(3) = 2$. Then $f(f^{-1}(1)) = f(3) = 1$, $f(f^{-1}(2)) = f(1) = 2$, $f(f^{-1}(3)) = f(2) = 3$: the identity.`, sol: 'Work element by element: inner function first.', scheme: [['f o g', 1], ['g o f', 1], ['Not equal', 1], ['f⁻¹', 1], ['Verification', 1]], d: 3, c: 'application', t: [3, 4], time: 300 }), (C) => {
  C.assert(comp(fA, gA).join() === '2,1,3' && comp(gA, fA).join() === '3,2,1', 'composites');
  C.assert(invA(fA).join() === '3,1,2' && comp(fA, invA(fA)).join() === '1,2,3', 'inverse');
  C.model(['(2, 1), (3, 3)', '(1, 3), (2, 2), (3, 1)', 'f^{-1}(1) = 3']);
});

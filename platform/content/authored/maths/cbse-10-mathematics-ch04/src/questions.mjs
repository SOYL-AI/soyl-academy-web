// CBSE 10 Mathematics ch04 Quadratic Equations — practice bank with independent re-solve checks
// (roots by the formula in floating point, discriminants from coefficients, word problems checked in the story).
import { Q, caseQ, child, mk, r, plot, quadRoots, numRoots, f } from '../../cbse-10-mathematics-ch01/src/lib.mjs';

const D = (a, b, c) => b * b - 4 * a * c;
const roots = (a, b, c) => quadRoots(a, b, c).map((v) => Math.round(v * 1e9) / 1e9);
const same = (u, v) => u.length === v.length && u.every((x, i) => Math.abs(x - v[i]) < 1e-9);
const nature = (a, b, c) => (D(a, b, c) > 1e-12 ? 'distinct' : Math.abs(D(a, b, c)) <= 1e-12 ? 'equal' : 'none');
/** The positive root (word problems), asserting exactly one is admissible when `pos` is required. */
const pos = (a, b, c) => roots(a, b, c).filter((v) => v > 0);

const qBall = plot({ x: [0, 45], y: [-5, 25], xl: 'horizontal distance x (m)', yl: 'height y (m)', fns: [{ expr: '-x^2/20 + 2x', label: '$y = -\\dfrac{x^2}{20} + 2x$', domain: [0, 40] }] }, 'Path of a cricket ball: a downward-opening parabola starting at the origin, rising to a highest point of 20 metres at a horizontal distance of 20 metres, and coming back to the ground 40 metres away.', 'Path of the ball: $y = -\\dfrac{x^2}{20} + 2x$.');
const qDiver = plot({ x: [0, 2.5], y: [-2, 12], xl: 'time t (s)', yl: 'height h (m)', fns: [{ expr: '-5x^2 + 5x + 10', label: '$h = -5t^2 + 5t + 10$', domain: [0, 2] }] }, 'Height of a diver against time: starts at 10 metres, rises slightly to about 11.25 metres at half a second, then falls to the water at 2 seconds.', 'Height of the diver above the water.');

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'Which of the following is a quadratic equation?', opts: [r`$(x + 2)^2 = x^2 + 4x$`, r`$x(x - 1) = x^2 + 3$`, r`$(x - 1)^3 = x^3 + 2x$`, r`$x^2 + \dfrac{1}{x^2} = 3$`], key: 'c', sol: r`Simplify each.

(a) $x^2 + 4x + 4 = x^2 + 4x$: every $x$ term cancels and only the false claim "$4$ equals $0$" is left, so there is no equation in $x$ at all.

(b) $x^2 - x = x^2 + 3 \Rightarrow -x - 3 = 0$: linear.

(c) $x^3 - 3x^2 + 3x - 1 = x^3 + 2x \Rightarrow -3x^2 + x - 1 = 0$, i.e. $3x^2 - x + 1 = 0$: **quadratic** (the cubes cancel).

(d) has $\dfrac{1}{x^2}$, so it is not a polynomial equation.`, d: 3, c: 'analysis', t: [1], time: 120 }), (C) => { const g = (x) => (x - 1) ** 3 - (x ** 3 + 2 * x); const q = (x) => -3 * x * x + x - 1; C.assert([-2, 0, 1, 3].every((x) => Math.abs(g(x) - q(x)) < 1e-9), '(c) simplifies to −3x² + x − 1'); C.key('c'); });
Q('m02', mk.mcq({ stem: r`Which number is a root of $2x^2 - 7x + 3 = 0$?`, opts: ['$3$', '$-3$', '$2$', r`$-\dfrac12$`], key: 'a', sol: r`$x = 3$: $18 - 21 + 3 = 0$ ✓. (The other root is $\dfrac12$, not $-\dfrac12$.) $x = -3$ gives $42$ and $x = 2$ gives $-1$.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => { const g = (x) => 2 * x * x - 7 * x + 3; C.which([3, -3, 2, -0.5].map((x) => g(x) === 0), true); });
Q('m03', mk.mcq({ stem: r`If $x = 2$ is a root of $x^2 + kx - 10 = 0$, then $k$ equals`, opts: ['$3$', '$-3$', '$7$', '$-7$'], key: 'a', sol: r`$4 + 2k - 10 = 0 \Rightarrow k = 3$. **Check:** $x^2 + 3x - 10 = (x + 5)(x - 2)$ has the root $2$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { const k = (10 - 4) / 2; C.which([3, -3, 7, -7], k); C.assert(roots(1, k, -10).includes(2), 'root 2'); });
Q('m04', mk.mcq({ stem: r`The roots of $x^2 - 5x - 14 = 0$ are`, opts: ['$7$ and $-2$', '$-7$ and $2$', '$7$ and $2$', '$14$ and $-1$'], key: 'a', sol: r`Two numbers with product $-14$ and sum $-5$: $-7$ and $2$. So $(x - 7)(x + 2) = 0$, giving $x = 7$ or $x = -2$. Option (b) uses the signs of the numbers in the split, not of the roots.`, d: 1, c: 'understanding', t: [2], time: 60 }), (C) => C.which([[-2, 7], [-7, 2], [2, 7], [-1, 14]], roots(1, -5, -14)));
Q('m05', mk.mcq({ stem: r`The roots of $3x^2 - 2x - 8 = 0$ are`, opts: [r`$2$ and $-\dfrac43$`, r`$-2$ and $\dfrac43$`, r`$2$ and $\dfrac43$`, r`$4$ and $-\dfrac23$`], key: 'a', sol: r`$ac = -24 = (-6)(4)$ and $-6 + 4 = -2$: $3x^2 - 6x + 4x - 8 = 3x(x - 2) + 4(x - 2) = (3x + 4)(x - 2)$. Roots $2$ and $-\dfrac43$.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => C.which([[-4 / 3, 2], [-2, 4 / 3], [4 / 3, 2], [-2 / 3, 4]].map((p) => p.map((v) => Math.round(v * 1e9) / 1e9)), roots(3, -2, -8)));
Q('m06', mk.mcq({ stem: r`The roots of $x^2 = 9x$ are`, opts: ['$9$ only', '$0$ and $9$', '$3$ and $-3$', '$0$ only'], key: 'b', sol: r`$x^2 - 9x = 0 \Rightarrow x(x - 9) = 0 \Rightarrow x = 0$ or $x = 9$. Dividing both sides by $x$ (option a) loses the root $0$: never divide by an expression that can be zero.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([[9], [0, 9], [-3, 3], [0]], roots(1, -9, 0)));
Q('m07', mk.mcq({ stem: r`The roots of $x^2 - 4x + 1 = 0$ are`, opts: [r`$2 \pm \sqrt3$`, r`$-2 \pm \sqrt3$`, r`$4 \pm \sqrt3$`, r`$2 \pm \sqrt5$`], key: 'a', sol: r`$D = 16 - 4 = 12$, so $x = \dfrac{4 \pm \sqrt{12}}{2} = \dfrac{4 \pm 2\sqrt3}{2} = 2 \pm \sqrt3$. Option (b) forgets the minus in $-b$; option (c) forgets to divide $4$ by $2$.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { const s3 = Math.sqrt(3); C.which([[2 - s3, 2 + s3], [-2 - s3, -2 + s3], [4 - s3, 4 + s3], [2 - Math.sqrt(5), 2 + Math.sqrt(5)]].map((p) => p.map((v) => Math.round(v * 1e9) / 1e9)), roots(1, -4, 1)); });
Q('m08', mk.mcq({ stem: r`To use the quadratic formula on $5x^2 - 3 = 2x$, the values of $a$, $b$, $c$ are`, opts: [r`$a = 5,\ b = -2,\ c = -3$`, r`$a = 5,\ b = 2,\ c = -3$`, r`$a = 5,\ b = -3,\ c = 2$`, r`$a = 5,\ b = -3,\ c = -2$`], key: 'a', sol: r`First write it in standard form: $5x^2 - 2x - 3 = 0$. So $a = 5$, $b = -2$, $c = -3$. Option (b) forgets that moving $2x$ changes its sign; (c) and (d) read the coefficients in the given order without rearranging.`, d: 2, c: 'understanding', t: [1, 3], time: 60 }), (C) => { const g = (x) => 5 * x * x - 3 - 2 * x; C.which([[5, -2, -3], [5, 2, -3], [5, -3, 2], [5, -3, -2]].map(([a, b, c]) => [-2, 0, 1, 3].every((x) => Math.abs(a * x * x + b * x + c - g(x)) < 1e-9)), true); });
Q('m09', mk.mcq({ stem: r`The discriminant of $3x^2 - 4x + 2 = 0$ is`, opts: ['$-8$', '$8$', '$40$', '$-40$'], key: 'a', sol: r`$D = b^2 - 4ac = 16 - 24 = -8$. Option (c) uses $+4ac$; option (b) drops the sign.`, d: 1, c: 'recall', t: [4], time: 45 }), (C) => C.which([-8, 8, 40, -40], D(3, -4, 2)));
Q('m10', mk.mcq({ stem: r`The equation $x^2 - 6x + 9 = 0$ has`, opts: ['two distinct real roots', 'two equal real roots', 'no real roots', 'more than two real roots'], key: 'b', sol: r`$D = 36 - 36 = 0$, so the roots are real and equal: $x = \dfrac{6}{2} = 3$ (indeed $(x - 3)^2 = 0$).`, d: 1, c: 'understanding', t: [4], time: 45 }), (C) => C.which(['distinct', 'equal', 'none', 'more'], nature(1, -6, 9)));
Q('m11', mk.mcq({ stem: r`The equation $2x^2 + 3x + 5 = 0$ has`, opts: ['two distinct real roots', 'two equal real roots', 'no real roots', 'one positive and one negative root'], key: 'c', sol: r`$D = 9 - 40 = -31 < 0$: no real roots. (The square root of a negative number is not real.)`, d: 2, c: 'understanding', t: [4], time: 45 }), (C) => C.which(['distinct', 'equal', 'none', 'opposite'], nature(2, 3, 5)));
Q('m12', mk.mcq({ stem: r`The values of $k$ for which $x^2 - kx + 25 = 0$ has equal roots are`, opts: ['$10$ only', r`$\pm 10$`, '$25$', r`$\pm 5$`], key: 'b', sol: r`Equal roots: $D = k^2 - 100 = 0$, so $k^2 = 100$ and $k = 10$ or $k = -10$. Option (a) forgets the negative square root. Check: $k = -10$ gives $(x + 5)^2 = 0$.`, d: 3, c: 'application', t: [4], time: 75 }), (C) => { const ks = [-10, -5, 5, 10, 25].filter((k) => nature(1, -k, 25) === 'equal'); C.which([[10], [-10, 10], [25], [-5, 5]], ks); });
Q('m13', mk.mcq({ stem: r`The equation $x^2 + 4x + k = 0$ has real roots exactly when`, opts: [r`$k \le 4$`, r`$k \ge 4$`, r`$k < 4$`, r`$k = 4$ only`], key: 'a', sol: r`Real roots need $D \ge 0$: $16 - 4k \ge 0 \Rightarrow k \le 4$. Option (c) leaves out $k = 4$, which gives equal (real) roots.`, d: 3, c: 'application', t: [4], time: 75 }), (C) => { const ok = [-5, 0, 3.9, 4, 4.1, 8].map((k) => D(1, 4, k) >= 0); C.assert(ok.join() === 'true,true,true,true,false,false', ok.join()); C.key('a'); });
Q('m14', mk.mcq({ stem: r`In $ax^2 + bx + c = 0$, $a$ and $c$ have opposite signs. Then the equation has`, opts: ['two distinct real roots', 'two equal real roots', 'no real roots', 'real roots only if b > 0'], key: 'a', sol: r`If $a$ and $c$ have opposite signs, $ac < 0$, so $-4ac > 0$ and $D = b^2 - 4ac \ge -4ac > 0$. Hence two distinct real roots, whatever $b$ is.`, d: 4, c: 'analysis', t: [4], time: 90 }), (C) => { let ok = true; for (const [a, b, c] of [[1, 0, -1], [2, 5, -3], [-3, 1, 4], [5, -7, -0.1], [-1, 0, 2]]) ok &&= nature(a, b, c) === 'distinct'; C.assert(ok, 'opposite signs ⇒ distinct'); C.key('a'); });
Q('m15', mk.mcq({ stem: 'The product of two consecutive positive integers is 132. The integers are', opts: ['11 and 12', '12 and 13', '10 and 11', '−12 and −11'], key: 'a', sol: r`$n(n + 1) = 132 \Rightarrow n^2 + n - 132 = 0 \Rightarrow (n + 12)(n - 11) = 0$. $n = 11$ (the root $-12$ is rejected: the integers are positive). So $11$ and $12$.`, d: 2, c: 'application', t: [5], time: 75 }), (C) => { const n = pos(1, 1, -132)[0]; C.which([[11, 12], [12, 13], [10, 11], [-12, -11]], [n, n + 1]); });
Q('m16', mk.mcq({ stem: 'The length of a rectangle is 3 cm more than its breadth, and its area is 54 cm². Its breadth is', opts: ['6 cm', '9 cm', '3 cm', '18 cm'], key: 'a', sol: r`$b(b + 3) = 54 \Rightarrow b^2 + 3b - 54 = 0 \Rightarrow (b + 9)(b - 6) = 0$. $b = 6$ cm (reject $-9$). Option (b) is the length.`, d: 2, c: 'application', t: [5], time: 75 }), (C) => C.which([6, 9, 3, 18], pos(1, 3, -54)[0]));
Q('m17', mk.mcq({ stem: r`The sum of a positive number and its reciprocal is $\dfrac{10}{3}$. The number is`, opts: [r`$3$ or $\dfrac13$`, '$3$ only', r`$\dfrac{10}{3}$`, r`$\dfrac{3}{10}$`], key: 'a', sol: r`$x + \dfrac1x = \dfrac{10}{3} \Rightarrow 3x^2 - 10x + 3 = 0 \Rightarrow (3x - 1)(x - 3) = 0$. Both $3$ and $\dfrac13$ are positive and both work: $3 + \dfrac13 = \dfrac{10}{3}$.`, d: 3, c: 'application', t: [5], time: 90 }), (C) => C.which([[1 / 3, 3].map((v) => Math.round(v * 1e9) / 1e9), [3], [10 / 3], [0.3]], roots(3, -10, 3)));
Q('m18', mk.mcq({ stem: r`The roots of $2x^2 - 6x + 3 = 0$ are`, opts: [r`$\dfrac{3 \pm \sqrt3}{2}$`, r`$\dfrac{-3 \pm \sqrt3}{2}$`, r`$\dfrac{3 \pm \sqrt{15}}{2}$`, r`$3 \pm \sqrt3$`], key: 'a', sol: r`$D = 36 - 24 = 12$. $x = \dfrac{6 \pm \sqrt{12}}{4} = \dfrac{6 \pm 2\sqrt3}{4} = \dfrac{3 \pm \sqrt3}{2}$. Option (c) uses $36 + 24$; option (d) divides by $2$ instead of $2a = 4$.`, d: 2, c: 'understanding', t: [3], time: 90 }), (C) => { const s = Math.sqrt(3); C.which([[(3 - s) / 2, (3 + s) / 2], [(-3 - s) / 2, (-3 + s) / 2], [(3 - Math.sqrt(15)) / 2, (3 + Math.sqrt(15)) / 2], [3 - s, 3 + s]].map((p) => p.map((v) => Math.round(v * 1e9) / 1e9)), roots(2, -6, 3)); });

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: r`The equation $x^2 + x + 1 = 0$ has no real roots.`, r: r`If $b^2 - 4ac < 0$, a quadratic equation has no real roots.`, key: 'a', sol: r`$D = 1 - 4 = -3 < 0$, so by R there are no real roots. R explains A.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(nature(1, 1, 1) === 'none', 'none'); C.key('a'); });
Q('ar2', mk.ar({ a: r`$x = -3$ is a root of $x^2 + x - 6 = 0$.`, r: 'A quadratic equation has at most two roots.', key: 'b', sol: r`A: $9 - 3 - 6 = 0$ ✓. R is true. But R does not show that $-3$ is a root; substitution does. So R is not the explanation.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(roots(1, 1, -6).includes(-3), 'root'); C.key('b'); });
Q('ar3', mk.ar({ a: r`$(x + 1)^2 = 2(x - 3)$ is a quadratic equation.`, r: 'Every quadratic equation has two real roots.', key: 'c', sol: r`A: $x^2 + 2x + 1 = 2x - 6 \Rightarrow x^2 + 7 = 0$, which is quadratic: A is true. R is false: this very equation has $D = -28 < 0$ and no real roots.`, d: 3, c: 'analysis', t: [1, 4] }), (C) => { C.assert(nature(1, 0, 7) === 'none', 'x² + 7 = 0 none'); C.key('c'); });
Q('ar4', mk.ar({ a: r`$x^2 - 4x + 4 = 0$ has two distinct real roots.`, r: r`If $b^2 - 4ac = 0$, the equation has two equal real roots.`, key: 'd', sol: r`$D = 16 - 16 = 0$, so by R the roots are equal ($x = 2, 2$). A is false; R is true.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(nature(1, -4, 4) === 'equal', 'equal'); C.key('d'); });
Q('ar5', mk.ar({ a: r`The roots of $2x^2 - 3x - 2 = 0$ are $2$ and $-\dfrac12$.`, r: r`$2x^2 - 3x - 2 = (2x + 1)(x - 2)$, and a product is zero only when one of its factors is zero.`, key: 'a', sol: r`$(2x + 1)(x - 2) = 2x^2 - 4x + x - 2 = 2x^2 - 3x - 2$ ✓. Setting each factor to zero gives $-\dfrac12$ and $2$. R is exactly the reason.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(same(roots(2, -3, -2), [-0.5, 2]), 'roots'); C.key('a'); });
Q('ar6', mk.ar({ a: r`The sides of a rectangle are $x$ cm and $(x + 2)$ cm and its area is $48$ cm². Solving gives $x = 6$ or $x = -8$, so the sides can be $-8$ cm and $-6$ cm.`, r: 'Lengths must be positive, so a root that gives a negative length is rejected.', key: 'd', sol: r`$x(x + 2) = 48 \Rightarrow (x + 8)(x - 6) = 0$. A length cannot be negative, so $x = -8$ is rejected by R and the sides are $6$ cm and $8$ cm. A is false; R is true.`, d: 2, c: 'evaluation', t: [5] }), (C) => { C.assert(same(roots(1, 2, -48), [-8, 6]), 'roots'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: r`$x(x + 1) + 8 = (x + 2)(x - 2)$ is a quadratic equation.`, key: 'f', sol: r`$x^2 + x + 8 = x^2 - 4 \Rightarrow x + 12 = 0$, which is linear: the $x^2$ terms cancel. Always simplify before deciding.`, d: 2, c: 'understanding', t: [1] }), (C) => { const g = (x) => x * (x + 1) + 8 - (x + 2) * (x - 2); C.assert([-1, 0, 2, 5].every((x) => Math.abs(g(x) - (x + 12)) < 1e-9), 'linear'); C.key('f'); });
Q('tf2', mk.tf({ stem: 'A quadratic equation can have more than two roots.', key: 'f', sol: r`A quadratic equation has **at most two** roots: its graph, a parabola, meets the $x$-axis at most twice.`, d: 1, c: 'recall', t: [1] }), (C) => C.key('f'));
Q('tf3', mk.tf({ stem: r`If the discriminant of $ax^2 + bx + c = 0$ is zero, both roots equal $-\dfrac{b}{2a}$.`, key: 't', sol: r`With $D = 0$ the formula gives $x = \dfrac{-b \pm 0}{2a} = -\dfrac{b}{2a}$ twice.`, d: 1, c: 'recall', t: [4] }), (C) => { C.assert(roots(4, -12, 9)[0] === 1.5 && 12 / 8 === 1.5, 'example'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`The equation $x^2 + 9 = 0$ has the real roots $3$ and $-3$.`, key: 'f', sol: r`$3^2 + 9 = 18 \ne 0$. In fact $D = -36 < 0$: no real roots. ($3$ and $-3$ are the roots of $x^2 - 9 = 0$.)`, d: 1, c: 'understanding', t: [4] }), (C) => { C.assert(nature(1, 0, 9) === 'none', 'none'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`If $1$ is a root of $ax^2 + bx + c = 0$, then $a + b + c = 0$.`, key: 't', sol: r`Substituting $x = 1$ gives $a(1)^2 + b(1) + c = a + b + c = 0$. For example, $2x^2 - 5x + 3 = 0$ has the root $1$ and $2 - 5 + 3 = 0$.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(roots(2, -5, 3).includes(1), 'example'); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: r`The discriminant of $ax^2 + bx + c = 0$ is ___.`, acc: [['b^2 - 4ac', 'b² − 4ac', 'b²-4ac', 'b^2-4ac', 'b² - 4ac', 'b*b - 4ac']], sol: r`$D = b^2 - 4ac$, the expression under the square root in the quadratic formula.`, d: 1, c: 'recall', t: [4] }), (C) => C.blank('b^2 - 4ac'));
Q('fb2', mk.fill({ stem: r`The roots of $x^2 - 16 = 0$ are $4$ and ___.`, acc: [['-4', '−4']], sol: r`$x^2 = 16 \Rightarrow x = \pm 4$.`, d: 1, c: 'recall', t: [2] }), (C) => C.blank(roots(1, 0, -16)[0]));
Q('fb3', mk.fill({ stem: r`If $b^2 - 4ac < 0$, the equation $ax^2 + bx + c = 0$ has ___ real roots.`, acc: [['no', 'zero', '0']], sol: r`A negative discriminant has no real square root, so there are no real roots.`, d: 1, c: 'recall', t: [4] }), (C) => C.blank('no'));
Q('fb4', mk.fill({ stem: r`The discriminant of $2x^2 - 5x + 3 = 0$ is ___.`, acc: [['1']], sol: r`$D = 25 - 24 = 1$ (positive and a perfect square, so the roots $1$ and $\dfrac32$ are rational).`, d: 1, c: 'understanding', t: [4] }), (C) => { C.blank(D(2, -5, 3)); C.assert(same(roots(2, -5, 3), [1, 1.5]), 'roots'); });
Q('fb5', mk.fill({ stem: r`If $x^2 + 6x + k = 0$ has equal roots, then $k =$ ___.`, acc: [['9']], sol: r`$D = 36 - 4k = 0 \Rightarrow k = 9$. Then $(x + 3)^2 = 0$.`, d: 2, c: 'application', t: [4] }), (C) => C.blank(36 / 4));

// =============================================================== Numerical
Q('n01', mk.num({ stem: r`Find the positive root of $2x^2 + x - 15 = 0$.`, value: 2.5, marks: 2, sol: r`**Step 1.** $ac = -30 = 6 \times (-5)$, and $6 - 5 = 1$: $2x^2 + 6x - 5x - 15 = 2x(x + 3) - 5(x + 3) = (2x - 5)(x + 3)$. **Step 2.** Roots $2.5$ and $-3$; the positive root is $2.5$.`, scheme: [['Factorisation (2x − 5)(x + 3)', 1], ['2.5', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => C.val(pos(2, 1, -15)[0]));
Q('n02', mk.num({ stem: r`Find the larger root of $x^2 - 6x + 7 = 0$, correct to two decimal places.`, value: 4.41, tol: 0.005, marks: 2, sol: r`**Step 1.** $D = 36 - 28 = 8$. **Step 2.** $x = \dfrac{6 \pm \sqrt8}{2} = 3 \pm \sqrt2$. **Step 3.** Larger root $3 + \sqrt2 \approx 3 + 1.414 = 4.414 \approx 4.41$.`, scheme: [['D = 8 and formula', 1], ['3 + √2 ≈ 4.41', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => C.val(roots(1, -6, 7)[1], 0.005));
Q('n03', mk.num({ stem: r`Find the positive value of $k$ for which $2x^2 + kx + 8 = 0$ has equal roots.`, value: 8, marks: 2, sol: r`**Step 1.** Equal roots: $D = k^2 - 64 = 0$. **Step 2.** $k = \pm 8$; the positive value is $8$. (Then $2x^2 + 8x + 8 = 2(x + 2)^2$.)`, scheme: [['k² − 64 = 0', 1], ['k = 8', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => { const k = Math.sqrt(4 * 2 * 8); C.val(k); C.assert(nature(2, k, 8) === 'equal', 'equal'); });
Q('n04', mk.num({ stem: r`Find the discriminant of $4x^2 - 12x + 9 = 0$.`, value: 0, sol: r`$D = (-12)^2 - 4(4)(9) = 144 - 144 = 0$: equal roots, $x = \dfrac32$.`, scheme: [['0', 1]], d: 1, c: 'recall', t: [4], time: 45 }), (C) => C.val(D(4, -12, 9)));
Q('n05', mk.num({ stem: 'The sum of the squares of two consecutive odd positive integers is 290. Find the smaller integer.', value: 11, marks: 2, sol: r`**Step 1.** $n^2 + (n + 2)^2 = 290 \Rightarrow 2n^2 + 4n - 286 = 0 \Rightarrow n^2 + 2n - 143 = 0$. **Step 2.** $(n + 13)(n - 11) = 0$; $n = 11$ (reject $-13$). **Check:** $121 + 169 = 290$ ✓.`, scheme: [['Equation n² + 2n − 143 = 0', 1], ['11', 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => { const n = pos(1, 2, -143)[0]; C.val(n); C.assert(n * n + (n + 2) ** 2 === 290 && n % 2 === 1, 'odd and sum'); });
Q('n06', mk.num({ stem: r`A delivery van drives $240$ km from Indore to Bhopal at a uniform speed. On the way back its speed is $20$ km/h less, and the return trip takes $1$ hour longer. Find the speed (in km/h) on the way to Bhopal.`, value: 80, unit: 'km/h', marks: 2, sol: r`**Step 1.** Speed $x$ km/h: $\dfrac{240}{x - 20} - \dfrac{240}{x} = 1 \Rightarrow 240 \times 20 = x(x - 20) \Rightarrow x^2 - 20x - 4800 = 0$. **Step 2.** $(x - 80)(x + 60) = 0$, so $x = 80$ (reject $-60$). **Check:** $3$ h out at $80$ km/h, $4$ h back at $60$ km/h ✓.`, scheme: [['Time equation leading to x² − 20x − 4800 = 0', 1], ['80 km/h', 1]], d: 4, c: 'application', t: [5], time: 180 }), (C) => { const x = pos(1, -20, -4800)[0]; C.val(x); C.assert(240 / (x - 20) - 240 / x === 1, 'story'); });
Q('n07', mk.num({ stem: 'In a right triangle, one of the shorter sides is 1 cm less than twice the other, and the hypotenuse is 17 cm. Find the length of the shortest side in cm.', value: 8, unit: 'cm', marks: 2, sol: r`**Step 1.** Sides $x$ and $2x - 1$: $x^2 + (2x - 1)^2 = 289 \Rightarrow 5x^2 - 4x - 288 = 0$. **Step 2.** $D = 16 + 5760 = 5776 = 76^2$, so $x = \dfrac{4 + 76}{10} = 8$ (the other root is negative). Sides $8$ cm and $15$ cm; $64 + 225 = 289$ ✓.`, scheme: [['Equation 5x² − 4x − 288 = 0', 1], ['8 cm', 1]], d: 3, c: 'application', t: [5], time: 180 }), (C) => { const x = pos(5, -4, -288)[0]; C.val(x); C.assert(x * x + (2 * x - 1) ** 2 === 289 && D(5, -4, -288) === 5776, 'story'); });
Q('n08', mk.num({ stem: "The product of Arjun's age 3 years ago and his age 4 years from now is 78. Find his present age in years.", value: 9, unit: 'years', marks: 2, sol: r`**Step 1.** $(a - 3)(a + 4) = 78 \Rightarrow a^2 + a - 90 = 0$. **Step 2.** $(a + 10)(a - 9) = 0$, so $a = 9$ (reject $-10$). **Check:** $6 \times 13 = 78$ ✓.`, scheme: [['a² + a − 90 = 0', 1], ['9 years', 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => { const a = pos(1, 1, -90)[0]; C.val(a); C.assert((a - 3) * (a + 4) === 78, 'story'); });
Q('n09', mk.num({ stem: r`A bookseller in Kolkata spends ₹$720$ on copies of a book. If each copy had cost ₹$4$ less, he could have bought $6$ more copies for the same money. Find the cost of one copy in rupees.`, value: 24, unit: '₹', marks: 2, sol: r`**Step 1.** Cost ₹$p$: $\dfrac{720}{p - 4} - \dfrac{720}{p} = 6 \Rightarrow 720 \times 4 = 6p(p - 4) \Rightarrow p^2 - 4p - 480 = 0$. **Step 2.** $D = 16 + 1920 = 1936 = 44^2$, so $p = \dfrac{4 + 44}{2} = 24$. **Check:** $30$ copies at ₹$24$, $36$ copies at ₹$20$ ✓.`, scheme: [['p² − 4p − 480 = 0', 1], ['₹24', 1]], d: 4, c: 'application', t: [5], time: 180 }), (C) => { const p = pos(1, -4, -480)[0]; C.val(p); C.assert(720 / (p - 4) - 720 / p === 6, 'story'); });

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Check whether $(x - 2)^2 + 1 = 2x - 3$ is a quadratic equation. If it is, write it in standard form.`, model: r`$x^2 - 4x + 4 + 1 = 2x - 3 \Rightarrow x^2 - 6x + 8 = 0$.

It is of the form $ax^2 + bx + c = 0$ with $a = 1 \ne 0$, so it **is** a quadratic equation: $x^2 - 6x + 8 = 0$.`, sol: r`Expand, collect all terms on one side, and check that the $x^2$ coefficient is non-zero. (Its roots are $2$ and $4$.)`, scheme: [['Correct expansion and simplification', 1], ['Standard form x² − 6x + 8 = 0 with a ≠ 0', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { const g = (x) => (x - 2) ** 2 + 1 - (2 * x - 3); C.assert([-1, 0, 3, 7].every((x) => g(x) === x * x - 6 * x + 8), 'standard form'); C.model(['x^2 - 6x + 8 = 0']); });
Q('s202', mk.short({ marks: 2, stem: r`Solve $9x^2 - 30x + 25 = 0$.`, model: r`$9x^2 - 30x + 25 = (3x)^2 - 2(3x)(5) + 5^2 = (3x - 5)^2$.

$(3x - 5)^2 = 0 \Rightarrow x = \dfrac53$. The equation has two equal roots, $\dfrac53$ and $\dfrac53$.`, sol: r`Recognise a perfect square, or split: $ac = 225 = (-15)(-15)$. Check: $D = 900 - 900 = 0$.`, scheme: [['(3x − 5)² = 0', 1], ['x = 5/3 (repeated)', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.assert(nature(9, -30, 25) === 'equal' && Math.abs(roots(9, -30, 25)[0] - 5 / 3) < 1e-9, 'equal 5/3'); C.model(['\\dfrac53']); });
Q('s203', mk.short({ marks: 2, stem: r`Solve $x + \dfrac{1}{x} = \dfrac{17}{4}$, $x \ne 0$.`, model: r`Multiply by $4x$: $4x^2 + 4 = 17x \Rightarrow 4x^2 - 17x + 4 = 0$.

$4x^2 - 16x - x + 4 = 4x(x - 4) - 1(x - 4) = (4x - 1)(x - 4) = 0$, so $x = 4$ or $x = \dfrac14$.`, sol: r`Both roots are allowed ($x \ne 0$). Check: $4 + \dfrac14 = \dfrac{17}{4}$ ✓.`, scheme: [['4x² − 17x + 4 = 0', 1], ['x = 4 or 1/4', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (C) => { C.assert(same(roots(4, -17, 4), [0.25, 4]), 'roots'); C.model([4, '\\dfrac14']); });
Q('s204', mk.short({ marks: 2, stem: r`Solve $x^2 + 2x - 2 = 0$ using the quadratic formula.`, model: r`$a = 1$, $b = 2$, $c = -2$; $D = 4 + 8 = 12$.

$x = \dfrac{-2 \pm \sqrt{12}}{2} = \dfrac{-2 \pm 2\sqrt3}{2} = -1 \pm \sqrt3$.`, sol: r`Simplify $\sqrt{12} = 2\sqrt3$ and cancel the common factor $2$.`, scheme: [['D = 12 and substitution in the formula', 1], ['x = −1 ± √3', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => { const s = Math.sqrt(3); C.assert(same(roots(1, 2, -2), [-1 - s, -1 + s].map((v) => Math.round(v * 1e9) / 1e9)), 'roots'); C.model([12, '-1 \\pm \\sqrt3']); });
Q('s205', mk.short({ marks: 2, stem: r`Find the nature of the roots of $3x^2 - 2\sqrt6\,x + 2 = 0$. If they are real, find them.`, model: r`$D = (2\sqrt6)^2 - 4(3)(2) = 24 - 24 = 0$: two equal real roots.

$x = \dfrac{2\sqrt6}{2 \times 3} = \dfrac{\sqrt6}{3}$ (twice).`, sol: r`Equal roots are $-\dfrac{b}{2a}$. ($\dfrac{\sqrt6}{3} \approx 0.816$; check: $3 \times \dfrac69 - 2\sqrt6 \cdot \dfrac{\sqrt6}{3} + 2 = 2 - 4 + 2 = 0$ ✓.)`, scheme: [['D = 0, equal roots', 1], ['√6/3', 1]], d: 3, c: 'understanding', t: [4], time: 150 }), (C) => { const b = -2 * Math.sqrt(6); C.assert(Math.abs(D(3, b, 2)) < 1e-9 && Math.abs(-b / 6 - Math.sqrt(6) / 3) < 1e-12, 'equal √6/3'); C.model([24, '\\dfrac{\\sqrt6}{3}']); });
Q('s206', mk.short({ marks: 2, stem: r`Find the values of $k$ for which $3x^2 + kx + 3 = 0$ has equal roots.`, model: r`Equal roots: $D = k^2 - 4(3)(3) = k^2 - 36 = 0$, so $k = 6$ or $k = -6$.`, sol: r`Check: $k = 6$ gives $3(x + 1)^2 = 0$; $k = -6$ gives $3(x - 1)^2 = 0$.`, scheme: [['k² − 36 = 0', 1], ['k = ±6', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => { C.assert(nature(3, 6, 3) === 'equal' && nature(3, -6, 3) === 'equal', '±6'); C.model([36, 6]); });
Q('s207', mk.short({ marks: 2, stem: r`Sonia solves $x^2 + 2x + 5 = 0$ and writes: "$D = 4 - 20 = 16$, so $x = \dfrac{-2 \pm 4}{2}$, i.e. $x = 1$ or $x = -3$." Find her mistake and state the correct conclusion.`, model: r`$4 - 20 = -16$, not $16$. So $D = -16 < 0$, and the equation has **no real roots**. Her values fail the check: $1 + 2 + 5 = 8 \ne 0$.`, sol: r`A negative discriminant means no real square root, so the formula gives no real roots.`, scheme: [['Identifies D = −16', 1], ['No real roots (with check of her answer)', 1]], d: 3, c: 'evaluation', t: [4], time: 120 }), (C) => { C.assert(D(1, 2, 5) === -16 && nature(1, 2, 5) === 'none', 'none'); C.model([-16, 8]); });
Q('s208', mk.short({ marks: 2, stem: r`The sum of two numbers is $20$ and the sum of their reciprocals is $\dfrac{5}{24}$. Find the numbers.`, model: r`Let the numbers be $x$ and $20 - x$. $\dfrac1x + \dfrac{1}{20 - x} = \dfrac{20}{x(20 - x)} = \dfrac{5}{24}$, so $x(20 - x) = 96$, i.e. $x^2 - 20x + 96 = 0$.

$(x - 8)(x - 12) = 0$: the numbers are $8$ and $12$.`, sol: r`Check: $\dfrac18 + \dfrac{1}{12} = \dfrac{3 + 2}{24} = \dfrac{5}{24}$ ✓.`, scheme: [['x² − 20x + 96 = 0', 1], ['8 and 12', 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => { const [a, b] = roots(1, -20, 96); C.assert(a === 8 && b === 12 && Math.abs(1 / a + 1 / b - 5 / 24) < 1e-12, 'story'); C.model([96, 8, 12]); });
Q('s209', mk.short({ marks: 2, stem: r`$x = 3$ is a root of $kx^2 - 5x - 3 = 0$. Find $k$ and the other root.`, model: r`$9k - 15 - 3 = 0 \Rightarrow k = 2$. Then $2x^2 - 5x - 3 = (2x + 1)(x - 3) = 0$, so the other root is $-\dfrac12$.`, sol: r`Substitute the known root to find $k$, then factorise.`, scheme: [['k = 2', 1], ['Other root −1/2', 1]], d: 2, c: 'understanding', t: [1, 2], time: 120 }), (C) => { const k = 18 / 9; C.assert(k === 2 && same(roots(k, -5, -3), [-0.5, 3]), 'k and roots'); C.model([2, '-\\dfrac12']); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Solve $2x^2 + x - 4 = 0$ using the quadratic formula.`, model: r`$a = 2$, $b = 1$, $c = -4$. $D = 1 - 4(2)(-4) = 1 + 32 = 33 > 0$, so there are two distinct real roots.

$x = \dfrac{-1 \pm \sqrt{33}}{4}$, i.e. $x = \dfrac{-1 + \sqrt{33}}{4}$ or $x = \dfrac{-1 - \sqrt{33}}{4}$.`, sol: r`Approximately $1.19$ and $-1.69$. Check the sum: $-\dfrac12 = -\dfrac ba$ ✓.`, scheme: [['a, b, c and D = 33', 1], ['Substitution in the formula', 1], ['Both roots', 1]], d: 2, c: 'understanding', t: [3], time: 240 }), (C) => { const [u, v] = roots(2, 1, -4); C.assert(Math.abs(v - (-1 + Math.sqrt(33)) / 4) < 1e-9 && Math.abs(u + v + 0.5) < 1e-9, 'roots'); C.model([33, '\\sqrt{33}']); C.sol([1.19, 1.69]); });
Q('s302', mk.short({ marks: 3, stem: r`Find the value(s) of $k$ for which $(k - 2)x^2 + 2(k - 2)x + 2 = 0$ has equal roots, and find the roots.`, model: r`$D = 4(k - 2)^2 - 8(k - 2) = 4(k - 2)(k - 4)$. Equal roots need $D = 0$: $k = 2$ or $k = 4$.

But $k = 2$ makes the coefficient of $x^2$ zero (every $x$ term vanishes and only the constant $2$ is left), so it is not a quadratic: reject $k = 2$. Hence $k = 4$.

With $k = 4$: $2x^2 + 4x + 2 = 2(x + 1)^2 = 0$, so the roots are $-1, -1$.`, sol: r`Always check that $a \ne 0$ for the value of $k$ you find.`, scheme: [['D = 4(k − 2)(k − 4)', 1], ['Rejects k = 2 (a = 0), k = 4', 1], ['Roots −1, −1', 1]], d: 4, c: 'analysis', t: [4], time: 300 }), (C) => { C.assert(nature(2, 4, 2) === 'equal' && same(roots(2, 4, 2), [-1]), 'k = 4'); C.model([4, -1]); });
Q('s303', mk.short({ marks: 3, stem: r`A gardener in Coimbatore has $70$ m of wire to fence a rectangular vegetable patch. (a) Find the dimensions if the area is to be $300$ m². (b) Can the area be $320$ m²? Justify using the discriminant.`, model: r`(a) $l + b = 35$, $lb = 300$. With breadth $x$: $x(35 - x) = 300 \Rightarrow x^2 - 35x + 300 = 0 \Rightarrow (x - 15)(x - 20) = 0$. Dimensions $20$ m by $15$ m.

(b) $x(35 - x) = 320 \Rightarrow x^2 - 35x + 320 = 0$; $D = 1225 - 1280 = -55 < 0$. No real solution, so an area of $320$ m² is not possible with $70$ m of wire.`, sol: r`For a fixed perimeter, the largest possible area is a square, $17.5^2 = 306.25$ m², which is less than $320$.`, scheme: [['Equation x² − 35x + 300 = 0', 1], ['20 m by 15 m', 1], ['D = −55 < 0: not possible', 1]], d: 3, c: 'application', t: [4, 5], time: 300 }), (C) => { C.assert(same(roots(1, -35, 300), [15, 20]) && D(1, -35, 320) === -55 && 17.5 ** 2 === 306.25, 'parts'); C.model([20, 15, -55]); C.sol([306.25]); });
Q('s304', mk.short({ marks: 3, stem: 'A mother is 26 years older than her son. Three years from now, the product of their ages will be 360. Find their present ages.', model: r`Son $s$, mother $s + 26$. In three years: $(s + 3)(s + 29) = 360 \Rightarrow s^2 + 32s + 87 = 360 \Rightarrow s^2 + 32s - 273 = 0$.

$D = 1024 + 1092 = 2116 = 46^2$, so $s = \dfrac{-32 + 46}{2} = 7$ (the other root, $-39$, is rejected).

Son $7$ years, mother $33$ years. Check: $10 \times 36 = 360$ ✓.`, sol: 'Shift both ages by three years before multiplying.', scheme: [['Equation s² + 32s − 273 = 0', 1], ['s = 7, rejecting −39', 1], ['Ages 7 and 33 with check', 1]], d: 3, c: 'application', t: [5], time: 300 }), (C) => { const s = pos(1, 32, -273)[0]; C.assert(roots(1, 32, -273)[0] === -39 && (s + 3) * (s + 29) === 360, 'story'); C.model([s, s + 26, 2116, -39]); });
Q('s305', mk.short({ marks: 3, stem: 'Two printers in a Lucknow school office together print the exam papers in 6 hours. Working alone, the slower printer takes 5 hours more than the faster one. How long does each take alone?', model: r`Faster printer alone: $x$ hours; slower: $x + 5$ hours. In one hour they do $\dfrac1x + \dfrac{1}{x + 5} = \dfrac16$ of the job.

$6(2x + 5) = x(x + 5) \Rightarrow x^2 - 7x - 30 = 0 \Rightarrow (x - 10)(x + 3) = 0$. $x = 10$ (reject $-3$).

Faster: $10$ hours; slower: $15$ hours. Check: $\dfrac{1}{10} + \dfrac{1}{15} = \dfrac16$ ✓.`, sol: 'Add the rates (fractions of the job per hour), not the times.', scheme: [['Rate equation', 1], ['x² − 7x − 30 = 0 and x = 10', 1], ['10 h and 15 h with check', 1]], d: 4, c: 'application', t: [5], time: 300 }), (C) => { const x = pos(1, -7, -30)[0]; C.assert(Math.abs(1 / x + 1 / (x + 5) - 1 / 6) < 1e-12, 'story'); C.model([10, 15]); });
Q('s306', mk.short({ marks: 3, stem: r`Rohit solves $(x - 2)(x + 3) = 6$ like this: "$x - 2 = 6$ or $x + 3 = 6$, so $x = 8$ or $x = 3$." Find his mistake and solve the equation correctly.`, model: r`The zero-product rule works only when the product equals **zero**; "$pq = 6$" does not mean $p = 6$ or $q = 6$. His answers fail: $(8 - 2)(8 + 3) = 66 \ne 6$.

Correctly: $x^2 + x - 6 = 6 \Rightarrow x^2 + x - 12 = 0 \Rightarrow (x + 4)(x - 3) = 0$, so $x = 3$ or $x = -4$.`, sol: r`Check: $(3 - 2)(3 + 3) = 6$ ✓ and $(-4 - 2)(-4 + 3) = 6$ ✓. One of his answers ($3$) is correct only by coincidence.`, scheme: [['Identifies misuse of the zero-product rule', 1], ['x² + x − 12 = 0', 1], ['x = 3 or −4', 1]], d: 4, c: 'evaluation', t: [2], time: 240 }), (C) => { C.assert(same(roots(1, 1, -12), [-4, 3]) && 6 * 11 === 66, 'roots'); C.model([66, 3, -4]); });
Q('s307', mk.short({ marks: 3, stem: r`For what values of $p$ does $px^2 - 4x + 1 = 0$ have (a) two distinct real roots (b) two equal real roots? In case (b), find the roots.`, model: r`$D = 16 - 4p$, and $p \ne 0$ for a quadratic.

(a) $D > 0 \Rightarrow p < 4$, with $p \ne 0$.

(b) $D = 0 \Rightarrow p = 4$. Then $4x^2 - 4x + 1 = (2x - 1)^2 = 0$: roots $\dfrac12, \dfrac12$.`, sol: r`Remember to exclude $p = 0$, which makes the equation linear ($-4x + 1 = 0$).`, scheme: [['D = 16 − 4p', 1], ['(a) p < 4, p ≠ 0', 1], ['(b) p = 4, roots 1/2', 1]], d: 4, c: 'analysis', t: [4], time: 240 }), (C) => { C.assert(nature(4, -4, 1) === 'equal' && nature(3, -4, 1) === 'distinct' && nature(5, -4, 1) === 'none' && roots(4, -4, 1)[0] === 0.5, 'cases'); C.model([4, '\\dfrac12']); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: r`Priya cycles $36$ km from her village to a market town near Shimla and back. Going there (mostly downhill) her speed is $3$ km/h more than on the way back. The whole trip takes $7$ hours.

(a) Taking her return speed as $x$ km/h, form a quadratic equation.
(b) Solve it and find both speeds.
(c) Find the time taken each way.`, model: r`(a) $\dfrac{36}{x + 3} + \dfrac{36}{x} = 7 \Rightarrow 36x + 36(x + 3) = 7x(x + 3) \Rightarrow 72x + 108 = 7x^2 + 21x \Rightarrow 7x^2 - 51x - 108 = 0$.

(b) $D = 51^2 + 4 \times 7 \times 108 = 2601 + 3024 = 5625 = 75^2$. $x = \dfrac{51 \pm 75}{14}$: $x = 9$ or $x = -\dfrac{12}{7}$ (rejected: speed cannot be negative). Return speed $9$ km/h; going speed $12$ km/h.

(c) Going: $\dfrac{36}{12} = 3$ h; returning: $\dfrac{36}{9} = 4$ h; total $7$ h ✓.`, sol: r`Time = distance ÷ speed for each leg; add the two times.`, scheme: [['Time equation', 1], ['Standard form 7x² − 51x − 108 = 0', 1], ['D = 5625 and x = 9, rejecting the negative root', 1], ['Speeds 12 and 9 km/h', 1], ['Times 3 h and 4 h with check', 1]], d: 4, c: 'application', t: [5], time: 660 }), (C) => { const x = pos(7, -51, -108)[0]; C.assert(x === 9 && 36 / (x + 3) + 36 / x === 7 && D(7, -51, -108) === 5625, 'story'); C.model([5625, 9, 12, 3, 4, '-\\dfrac{12}{7}']); });
Q('l02', mk.long({ stem: r`For the equation $3x^2 - 5x - 1 = 0$:

(a) find the discriminant and state the nature of the roots;
(b) solve it using the quadratic formula;
(c) verify that the sum and the product of your roots equal $-\dfrac ba$ and $\dfrac ca$.`, model: r`(a) $D = 25 + 12 = 37 > 0$ and not a perfect square: two distinct real (irrational) roots.

(b) $x = \dfrac{5 \pm \sqrt{37}}{6}$.

(c) Sum $= \dfrac{5 + \sqrt{37}}{6} + \dfrac{5 - \sqrt{37}}{6} = \dfrac{10}{6} = \dfrac53 = -\dfrac{-5}{3}$ ✓.

Product $= \dfrac{(5 + \sqrt{37})(5 - \sqrt{37})}{36} = \dfrac{25 - 37}{36} = -\dfrac{12}{36} = -\dfrac13 = \dfrac{-1}{3}$ ✓.`, sol: 'The roots are about 1.85 and −0.18.', scheme: [['D = 37 and nature', 1], ['Formula substitution', 1], ['Roots (5 ± √37)/6', 1], ['Sum verified', 1], ['Product verified', 1]], d: 3, c: 'understanding', t: [3, 4], time: 600 }), (C) => { const [u, v] = roots(3, -5, -1); C.assert(D(3, -5, -1) === 37 && Math.abs(u + v - 5 / 3) < 1e-9 && Math.abs(u * v + 1 / 3) < 1e-9, 'relations'); C.model([37, '\\sqrt{37}', '\\dfrac53', '-\\dfrac13']); C.sol([1.85, 0.18]); });
Q('l03', mk.long({ stem: r`The floor of a rectangular community hall in Kochi has an area of $160$ m². Its length is $4$ m less than three times its breadth.

(a) Form a quadratic equation and find the length and breadth.
(b) Find the cost of tiling the floor at ₹$75$ per m².
(c) A carpet is laid leaving a $1$ m wide strip uncovered along every wall. Find the area of the carpet.`, model: r`(a) Breadth $b$, length $3b - 4$: $b(3b - 4) = 160 \Rightarrow 3b^2 - 4b - 160 = 0$. $D = 16 + 1920 = 1936 = 44^2$, so $b = \dfrac{4 + 44}{6} = 8$ (the other root $-\dfrac{20}{3}$ is rejected). Breadth $8$ m, length $20$ m.

(b) $160 \times 75 = $ ₹$12000$.

(c) The carpet measures $(20 - 2)$ m by $(8 - 2)$ m $= 18 \times 6 = 108$ m².`, sol: r`Check (a): $8 \times 20 = 160$ ✓ and $3 \times 8 - 4 = 20$ ✓.`, scheme: [['Equation 3b² − 4b − 160 = 0', 1], ['D = 1936, b = 8 with rejection', 1], ['Length 20 m', 1], ['Cost ₹12000', 1], ['Carpet 108 m²', 1]], d: 3, c: 'application', t: [5], time: 600 }), (C) => { const b = pos(3, -4, -160)[0]; C.assert(b === 8 && b * (3 * b - 4) === 160, 'story'); C.model([1936, 8, 20, 12000, 108, '-\\dfrac{20}{3}']); });
Q('l04', mk.long({ stem: r`(a) Show that the equation $(x - a)(x - b) = k^2$ has real roots for all real numbers $a$, $b$ and $k$.
(b) When are the roots equal?
(c) Solve the equation for $a = 1$, $b = 7$, $k = 3$.`, model: r`(a) $x^2 - (a + b)x + ab - k^2 = 0$. $D = (a + b)^2 - 4(ab - k^2) = a^2 + 2ab + b^2 - 4ab + 4k^2 = (a - b)^2 + 4k^2$.

A square is never negative, so $D \ge 0$: the roots are always real.

(b) $D = 0$ only if $(a - b)^2 = 0$ and $k^2 = 0$, i.e. $a = b$ and $k = 0$.

(c) $x^2 - 8x + 7 - 9 = x^2 - 8x - 2 = 0$. $D = 64 + 8 = 72$ (check: $(1 - 7)^2 + 4 \times 9 = 36 + 36 = 72$ ✓). $x = \dfrac{8 \pm \sqrt{72}}{2} = 4 \pm 3\sqrt2$.`, sol: r`The key step is rewriting $D$ as a sum of two squares.`, scheme: [['Standard form', 1], ['D = (a − b)² + 4k²', 1], ['D ≥ 0 argument', 1], ['Equal roots iff a = b and k = 0', 1], ['(c) roots 4 ± 3√2', 1]], d: 5, c: 'analysis', t: [4], time: 720 }), (C) => { for (const [a, b, k] of [[1, 7, 3], [-2, 5, 0.5], [3, 3, 0], [0, -4, 2]]) C.assert(Math.abs(D(1, -(a + b), a * b - k * k) - ((a - b) ** 2 + 4 * k * k)) < 1e-9, `identity ${a},${b},${k}`); const [u, v] = roots(1, -8, -2); C.assert(Math.abs(v - (4 + 3 * Math.SQRT2)) < 1e-9 && Math.abs(u - (4 - 3 * Math.SQRT2)) < 1e-9, 'roots'); C.model([72, '4 \\pm 3\\sqrt2']); });
Q('l05', mk.long({ stem: r`A school in Ranchi wants a rectangular herb garden of area $300$ m² against the long wall of its library. The wall forms one side, and the other three sides use exactly $50$ m of fencing. The library wall is $25$ m long.

(a) Taking each side perpendicular to the wall as $x$ m, form a quadratic equation.
(b) Solve it.
(c) Describe both possible gardens.
(d) Which design can actually be built? Explain.`, model: r`(a) The side along the wall is $50 - 2x$, so $x(50 - 2x) = 300 \Rightarrow 2x^2 - 50x + 300 = 0 \Rightarrow x^2 - 25x + 150 = 0$.

(b) $(x - 10)(x - 15) = 0$, so $x = 10$ or $x = 15$.

(c) $x = 10$: $10$ m by $30$ m (the $30$ m side along the wall). $x = 15$: $15$ m by $20$ m (the $20$ m side along the wall). Both have area $300$ m² and use $50$ m of fencing.

(d) The side along the wall cannot be longer than the wall, $25$ m. So only the $15$ m by $20$ m design can be built; the other root is mathematically correct but **inadmissible** here.`, sol: r`Both roots are positive, so the context (the wall length) decides which is admissible.`, scheme: [['Equation x² − 25x + 150 = 0', 1], ['Roots 10 and 15', 1], ['Both designs 10 × 30 and 15 × 20', 1], ['Wall-length constraint applied', 1], ['Conclusion: 15 m × 20 m', 1]], d: 4, c: 'evaluation', t: [5], time: 660 }), (C) => { const [p, q] = roots(1, -25, 150); C.assert(p === 10 && q === 15 && p * (50 - 2 * p) === 300 && q * (50 - 2 * q) === 300 && 50 - 2 * q <= 25 && 50 - 2 * p > 25, 'designs'); C.model([10, 15, 30, 20, 25]); });
Q('l06', mk.long({ stem: r`A potter in Khurja sells a vase for ₹$56$ and gains as many per cent as the vase cost him (in rupees).

(a) Taking the cost price as ₹$x$, form a quadratic equation.
(b) Find the cost price, rejecting any inadmissible root.
(c) Had he instead sold it at a loss of as many per cent as the cost price, what would the selling price have been?`, model: r`(a) Gain $= x\%$ of $x = \dfrac{x^2}{100}$. So $x + \dfrac{x^2}{100} = 56 \Rightarrow x^2 + 100x - 5600 = 0$.

(b) $D = 10000 + 22400 = 32400 = 180^2$. $x = \dfrac{-100 \pm 180}{2}$: $x = 40$ or $x = -140$ (rejected: a price cannot be negative). Cost price ₹$40$. Check: $40\%$ of $40$ is $16$, and $40 + 16 = 56$ ✓.

(c) Loss $= 40\%$ of $40 = $ ₹$16$, so the selling price would be $40 - 16 = $ ₹$24$.`, sol: r`The percentage itself depends on $x$, which is what makes the equation quadratic.`, scheme: [['Gain x²/100', 1], ['x² + 100x − 5600 = 0', 1], ['D and roots', 1], ['Cost ₹40 with rejection and check', 1], ['Selling price ₹24', 1]], d: 4, c: 'application', t: [5], time: 600 }), (C) => { const x = pos(1, 100, -5600)[0]; C.assert(x === 40 && x + (x * x) / 100 === 56, 'story'); C.model([32400, 40, -140, 16, 24]); });

// =============================================================== Case-based
caseQ('c01', {
  passage: r`At a cricket ground in Ahmedabad, a batter lofts the ball. Taking the point where it is hit as the origin, its path is $y = -\dfrac{x^2}{20} + 2x$, where $x$ is the horizontal distance and $y$ the height, both in metres. The graph shows the path.`,
  assets: [qBall], d: 3, c: 'application',
  model: r`(a) Option (c): $-\dfrac{x^2}{20} + 2x = 0$. (b) $40$ m. (c) (i) At $x = 10$ m and $x = 30$ m. Or (ii) No: $x^2 - 40x + 420 = 0$ has $D = -80 < 0$, so the ball never reaches $21$ m (its greatest height is $20$ m).`,
  sol: r`(b) $-\dfrac{x}{20}(x - 40) = 0$: $x = 0$ or $40$. (c) (i) $-\dfrac{x^2}{20} + 2x = 15 \Rightarrow x^2 - 40x + 300 = 0 \Rightarrow (x - 10)(x - 30) = 0$. (ii) $-\dfrac{x^2}{20} + 2x = 21 \Rightarrow x^2 - 40x + 420 = 0$, $D = 1600 - 1680 = -80$.`,
  children: [
    child('a', mk.mcq({ stem: 'Which equation gives the points where the ball is at ground level?', opts: [r`$-\dfrac{x^2}{20} + 2x = 20$`, r`$-\dfrac{x^2}{20} + 2x = 40$`, r`$-\dfrac{x^2}{20} + 2x = 0$`, r`$x^2 = 40$`], key: 'c', sol: r`Ground level means height $y = 0$.`, d: 1, c: 'understanding', t: [5], time: 45 })),
    child('b', mk.num({ stem: 'How far from the batter (in metres) does the ball land?', value: 40, unit: 'm', sol: r`$-\dfrac{x}{20}(x - 40) = 0$ gives $x = 0$ (where it was hit) or $x = 40$. It lands $40$ m away.`, scheme: [['40 m', 1]], d: 2, c: 'understanding', t: [2, 5], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** At what horizontal distances is the ball 15 m high?', model: r`$-\dfrac{x^2}{20} + 2x = 15 \Rightarrow x^2 - 40x + 300 = 0 \Rightarrow (x - 10)(x - 30) = 0$. At $10$ m (going up) and $30$ m (coming down).`, sol: 'Two roots: once rising, once falling.', scheme: [['x² − 40x + 300 = 0', 1], ['10 m and 30 m', 1]], d: 3, c: 'application', t: [2, 5], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** A fielder on the boundary can catch the ball only if it reaches a height of 21 m somewhere on its path. Use the discriminant to decide whether it does.', model: r`$-\dfrac{x^2}{20} + 2x = 21 \Rightarrow x^2 - 40x + 420 = 0$. $D = 1600 - 1680 = -80 < 0$: no real $x$, so the ball never reaches $21$ m. (Its highest point is $20$ m, at $x = 20$.)`, sol: 'No real root means the height is never reached.', scheme: [['x² − 40x + 420 = 0 and D = −80', 1], ['Conclusion: never reaches 21 m', 1]], d: 4, c: 'analysis', t: [4, 5], time: 150 }),
    ]),
  ],
}, (C) => { const z = numRoots('-x^2/20 + 2x', -1, 45); C.assert(same(z, [0, 40]), `${z}`); C.child('a').key('c'); C.child('b').val(z[1]); C.child('c').model(roots(1, -40, 300)); C.child('cii').assert(D(1, -40, 420) === -80 && f('-x^2/20 + 2x')(20) === 20, 'max 20'); C.child('cii').model([-80, 20]); });

caseQ('c02', {
  passage: r`For Diwali, Lakshmi draws a rectangular rangoli whose length is $2$ m more than its width. Around it she leaves a border $0.5$ m wide on every side for diyas. The rangoli and the border together cover $24$ m².`,
  d: 3, c: 'application',
  model: r`(a) Option (b): $(x + 1)(x + 3) = 24$. (b) $3$ m. (c) (i) The border's area is $24 - 3 \times 5 = 9$ m². Or (ii) $x^2 + 4x - 21 = 0$ gives $x = 3$ or $x = -7$; $-7$ is rejected because a width cannot be negative. Check: $(3 + 1)(3 + 3) = 24$ ✓.`,
  sol: r`With width $x$: rangoli $x$ by $x + 2$; with the border, $x + 1$ by $x + 3$. $(x + 1)(x + 3) = 24 \Rightarrow x^2 + 4x - 21 = 0 \Rightarrow (x + 7)(x - 3) = 0$.`,
  children: [
    child('a', mk.mcq({ stem: 'If the width of the rangoli is x m, the total area gives the equation', opts: [r`$x(x + 2) = 24$`, r`$(x + 1)(x + 3) = 24$`, r`$(x + 0.5)(x + 2.5) = 24$`, r`$(x + 2)(x + 4) = 24$`], key: 'b', sol: r`A $0.5$ m border on **both** sides adds $1$ m to each dimension: $(x + 1)$ by $(x + 3)$. Option (c) adds the border on one side only.`, d: 2, c: 'application', t: [1, 5], time: 75 })),
    child('b', mk.num({ stem: 'Find the width of the rangoli in metres.', value: 3, unit: 'm', sol: r`$x^2 + 4x + 3 = 24 \Rightarrow x^2 + 4x - 21 = 0 \Rightarrow (x + 7)(x - 3) = 0$, so $x = 3$ m.`, scheme: [['3 m', 1]], d: 2, c: 'understanding', t: [2], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the area of the border.', model: r`Rangoli: $3 \times 5 = 15$ m². Border $= 24 - 15 = 9$ m².`, sol: 'Total minus rangoli.', scheme: [['Rangoli 15 m²', 1], ['Border 9 m²', 1]], d: 2, c: 'application', t: [5], time: 90 }), [
      mk.short({ marks: 2, stem: '**(ii)** Show that the equation has two roots, and explain why only one of them gives the answer.', model: r`$x^2 + 4x - 21 = (x + 7)(x - 3) = 0$ gives $x = 3$ or $x = -7$. A width cannot be negative, so $x = -7$ is rejected; $x = 3$ checks: $(4)(6) = 24$ ✓.`, sol: 'Reject inadmissible roots.', scheme: [['Both roots', 1], ['Rejection with reason', 1]], d: 2, c: 'evaluation', t: [5], time: 90 }),
    ]),
  ],
}, (C) => { const x = pos(1, 4, -21)[0]; C.assert(same(roots(1, 4, -21), [-7, 3]) && (x + 1) * (x + 3) === 24, 'story'); C.child('a').key('b'); C.child('b').val(x); C.child('c').model([15, 9]); C.child('cii').model([3, -7]); });

caseQ('c03', {
  passage: r`In a Class 10 quiz in Bhopal, each team must decide the nature of the roots of three equations **without** solving them:

| Equation | |
|---|---|
| P | $x^2 - 4x + 4 = 0$ |
| Q | $2x^2 + 3x - 2 = 0$ |
| R | $x^2 + x + 1 = 0$ |`,
  d: 3, c: 'understanding',
  model: r`(a) Option (a): P has equal roots. (b) $D = 25$. (c) (i) $x = \dfrac12$ or $x = -2$. Or (ii) $k = \dfrac14$.`,
  sol: r`P: $D = 16 - 16 = 0$ (equal). Q: $D = 9 + 16 = 25$ (distinct, rational). R: $D = 1 - 4 = -3$ (no real roots). (c) (i) $2x^2 + 4x - x - 2 = (2x - 1)(x + 2)$. (ii) $x^2 + x + k$: $D = 1 - 4k = 0 \Rightarrow k = \dfrac14$.`,
  children: [
    child('a', mk.mcq({ stem: 'Which equation has two equal real roots?', opts: ['P', 'Q', 'R', 'none of them'], key: 'a', sol: r`$D_P = 0$, $D_Q = 25$, $D_R = -3$. Only P has $D = 0$.`, d: 2, c: 'understanding', t: [4], time: 75 })),
    child('b', mk.num({ stem: 'Find the discriminant of equation Q.', value: 25, sol: r`$D = 3^2 - 4(2)(-2) = 9 + 16 = 25$.`, scheme: [['25', 1]], d: 1, c: 'understanding', t: [4], time: 45 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Solve equation Q.', model: r`$2x^2 + 3x - 2 = 2x^2 + 4x - x - 2 = 2x(x + 2) - 1(x + 2) = (2x - 1)(x + 2) = 0$. So $x = \dfrac12$ or $x = -2$.`, sol: 'D = 25 is a perfect square, so it factorises.', scheme: [['Factorisation', 1], ['Roots 1/2 and −2', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Equation R has no real roots. If its constant term 1 is replaced by k, find the value of k for which the roots become equal.', model: r`$x^2 + x + k = 0$: $D = 1 - 4k = 0 \Rightarrow k = \dfrac14$. (Then $\left(x + \dfrac12\right)^2 = 0$, roots $-\dfrac12, -\dfrac12$.)`, sol: 'Set D = 0.', scheme: [['1 − 4k = 0', 1], ['k = 1/4', 1]], d: 3, c: 'understanding', t: [4], time: 120 }),
    ]),
  ],
}, (C) => { const ns = [nature(1, -4, 4), nature(2, 3, -2), nature(1, 1, 1)]; C.assert(ns.join() === 'equal,distinct,none', ns.join()); C.child('a').which(['P', 'Q', 'R', 'none'], ['P', 'Q', 'R'][ns.indexOf('equal')]); C.child('b').val(D(2, 3, -2)); C.child('c').assert(same(roots(2, 3, -2), [-2, 0.5]), 'Q roots'); C.child('cii').assert(nature(1, 1, 0.25) === 'equal', 'k = 1/4'); C.child('cii').model(['\\dfrac14']); });

caseQ('c04', {
  passage: r`A farmer near Ludhiana has $60$ m of fencing to make a rectangular enclosure for his calves along a straight canal bank. The canal side needs no fence, so the fencing covers only the other three sides. He wants the enclosure to have an area of $450$ m². Let each side perpendicular to the canal be $x$ m.`,
  d: 4, c: 'analysis',
  model: r`(a) Option (d): $x(60 - 2x) = 450$. (b) The roots are **equal**. (c) (i) $15$ m by $30$ m (the $30$ m side along the canal). Or (ii) $x^2 - 30x + 250 = 0$ has $D = 900 - 1000 = -100 < 0$, so an area of $500$ m² is impossible.`,
  sol: r`$x(60 - 2x) = 450 \Rightarrow 2x^2 - 60x + 450 = 0 \Rightarrow x^2 - 30x + 225 = 0$, $D = 900 - 900 = 0$, $x = 15$. For $500$ m²: $x^2 - 30x + 250 = 0$.`,
  children: [
    child('a', mk.mcq({ stem: 'The area condition gives the equation', opts: [r`$x(60 - x) = 450$`, r`$x(30 - x) = 450$`, r`$2x(60 - x) = 450$`, r`$x(60 - 2x) = 450$`], key: 'd', sol: r`Two sides of $x$ m use $2x$ m of fence, leaving $60 - 2x$ m for the side parallel to the canal. Area $= x(60 - 2x)$.`, d: 2, c: 'application', t: [1, 5], time: 75 })),
    child('b', mk.fill({ stem: r`The equation $x^2 - 30x + 225 = 0$ has ___ roots.`, acc: [['equal', 'two equal', 'real and equal', 'equal real']], sol: r`$D = 900 - 900 = 0$: two equal real roots, $x = 15$.`, d: 2, c: 'understanding', t: [4], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the dimensions of the enclosure.', model: r`$x^2 - 30x + 225 = (x - 15)^2 = 0$, so $x = 15$. The enclosure is $15$ m by $60 - 30 = 30$ m, with the $30$ m side along the canal.`, sol: 'Equal roots: exactly one design works.', scheme: [['x = 15', 1], ['15 m by 30 m', 1]], d: 3, c: 'understanding', t: [2, 5], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** His neighbour says that with the same fencing he could enclose 500 m². Use the discriminant to check the claim.', model: r`$x(60 - 2x) = 500 \Rightarrow x^2 - 30x + 250 = 0$. $D = 900 - 1000 = -100 < 0$: no real solution, so the claim is false. ($450$ m² is the largest possible area with $60$ m of fence.)`, sol: 'No real root means the area cannot be achieved.', scheme: [['Equation and D = −100', 1], ['Claim rejected', 1]], d: 4, c: 'evaluation', t: [4, 5], time: 150 }),
    ]),
  ],
}, (C) => { C.assert(nature(1, -30, 225) === 'equal' && roots(1, -30, 225)[0] === 15 && 15 * (60 - 30) === 450, 'equal 15'); C.child('a').key('d'); C.child('b').blank('equal'); C.child('c').model([15, 30]); C.child('cii').assert(D(1, -30, 250) === -100, 'D'); C.child('cii').model([-100, 450]); });

caseQ('c05', {
  passage: r`At a swimming pool in Thiruvananthapuram, a diver jumps from a $10$ m board. Her height above the water $t$ seconds after she leaves the board is $h = -5t^2 + 5t + 10$ metres. The graph shows her height.`,
  assets: [qDiver], d: 3, c: 'application',
  model: r`(a) Option (a): $-5t^2 + 5t + 10 = 0$. (b) $2$ s. (c) (i) At $t = 1$ s. Or (ii) No: $-5t^2 + 5t + 10 = 12$ gives $5t^2 - 5t + 2 = 0$ with $D = 25 - 40 = -15 < 0$, so she never reaches $12$ m.`,
  sol: r`(b) $-5(t^2 - t - 2) = -5(t - 2)(t + 1) = 0$; $t = 2$ (reject $-1$). (c) (i) $-5t^2 + 5t + 10 = 10 \Rightarrow -5t(t - 1) = 0$: $t = 0$ (leaving) or $t = 1$. (ii) as in the model answer.`,
  children: [
    child('a', mk.mcq({ stem: 'Which equation gives the time at which she enters the water?', opts: [r`$-5t^2 + 5t + 10 = 0$`, r`$-5t^2 + 5t + 10 = 10$`, r`$-5t^2 + 5t = 0$`, r`$5t^2 + 5t + 10 = 0$`], key: 'a', sol: 'She enters the water when her height is 0.', d: 1, c: 'understanding', t: [5], time: 45 })),
    child('b', mk.num({ stem: 'After how many seconds does she enter the water?', value: 2, unit: 's', sol: r`$-5(t - 2)(t + 1) = 0$; $t = 2$ s (the root $-1$ is before the jump, so it is rejected).`, scheme: [['2 s', 1]], d: 2, c: 'understanding', t: [2, 5], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** When is she again at the height of the board (10 m)?', model: r`$-5t^2 + 5t + 10 = 10 \Rightarrow -5t^2 + 5t = 0 \Rightarrow -5t(t - 1) = 0$. $t = 0$ is the moment she leaves, so she is back at $10$ m at $t = 1$ s.`, sol: 'Interpret both roots.', scheme: [['−5t(t − 1) = 0', 1], ['t = 1 s', 1]], d: 2, c: 'application', t: [2, 5], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Does she ever reach a height of 12 m? Use the discriminant.', model: r`$-5t^2 + 5t + 10 = 12 \Rightarrow 5t^2 - 5t + 2 = 0$. $D = 25 - 40 = -15 < 0$: no real time, so she never reaches $12$ m. (Her greatest height is $11.25$ m at $t = 0.5$ s.)`, sol: 'Negative discriminant: the height is never reached.', scheme: [['5t² − 5t + 2 = 0 with D = −15', 1], ['Never reaches 12 m', 1]], d: 3, c: 'analysis', t: [4, 5], time: 150 }),
    ]),
  ],
}, (C) => { const g = f('-5x^2 + 5x + 10'); C.assert(same(numRoots('-5x^2 + 5x + 10', -3, 4), [-1, 2]) && g(1) === 10 && g(0.5) === 11.25, 'diver'); C.child('a').key('a'); C.child('b').val(2); C.child('c').model([1]); C.child('cii').assert(D(5, -5, 2) === -15, 'D'); C.child('cii').model([-15, 11.25]); });
// =============================================================== added 2026-10-27 (assessment-designer)
// Recall/understanding written items for the board-paper competency balance (blueprint 54/24/22 Standard,
// 75/15/10 Basic). Appended after every existing item so earlier ids do not move.
Q('u301', mk.short({
  marks: 3,
  stem: r`For the equation $2x^2 - 7x + 3 = 0$, find the discriminant and state the nature of the roots. Then find the roots using the quadratic formula.`,
  model: r`Here $a = 2$, $b = -7$, $c = 3$.

$D = b^2 - 4ac = 49 - 24 = 25$. Since $D > 0$, the roots are real and distinct (and, as $25$ is a perfect square, rational).

$x = \dfrac{-b \pm \sqrt D}{2a} = \dfrac{7 \pm 5}{4}$, so $x = \dfrac{12}{4} = 3$ or $x = \dfrac{2}{4} = \dfrac12$.`,
  sol: r`Read off $a$, $b$, $c$ with their signs; $D > 0$ means two distinct real roots.`,
  scheme: [['D = 25', 1], ['Real and distinct roots', 1], ['x = 3 or x = 1/2', 1]],
  d: 2, c: 'understanding', t: [3, 4], time: 240,
}), (C) => { const D = 49 - 4 * 2 * 3; const z = quadRoots(2, -7, 3).sort((u, v) => u - v); C.assert(D === 25 && Math.abs(z[0] - 0.5) < 1e-12 && Math.abs(z[1] - 3) < 1e-12, `D ${D}, roots ${z}`); C.model([25, 3, r`\dfrac12`]); });

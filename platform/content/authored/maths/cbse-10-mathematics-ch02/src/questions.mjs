// CBSE 10 Mathematics ch02 Polynomials — practice bank with independent re-solve checks.
import { Q, caseQ, child, mk, r, plot, quadRoots, polyFromRoots, numRoots, f } from '../../cbse-10-mathematics-ch01/src/lib.mjs';

const S = (a, b) => -b / a; // sum of zeros
const P = (a, c) => c / a; // product of zeros
const same = (u, v) => u.length === v.length && u.every((x, i) => Math.abs(x - v[i]) < 1e-9);
const zeros = (a, b, c) => quadRoots(a, b, c);

// ---------------------------------------------------------------- figures used by questions
export const qPlotCubic = plot({ x: [-3, 4], y: [-6, 6], fns: [{ expr: 'x^3 - x^2 - 2x' }] }, 'Graph of y equals p of x, a cubic curve that rises from the bottom left, crosses the x-axis three times — at x equals minus 1, at the origin and at x equals 2 — and rises to the top right.', 'Graph of $y = p(x)$.');
export const qPlotTouch = plot({ x: [-2, 4], y: [-6, 2], fns: [{ expr: '-(x - 1)^2' }] }, 'Graph of y equals p of x: a downward-opening parabola whose highest point touches the x-axis at x equals 1 and lies below the axis everywhere else.', 'Graph of $y = p(x)$.');
export const qPlotAbove = plot({ x: [-4, 2], y: [-1, 8], fns: [{ expr: 'x^2 + 2x + 3' }] }, 'Graph of y equals p of x: an upward-opening parabola whose lowest point is at x equals minus 1, y equals 2, so the whole curve stays above the x-axis.', 'Graph of $y = p(x)$.');
export const qPlotS3 = plot({ x: [-4, 5], y: [-8, 8], fns: [{ expr: '-x^2 + x + 6' }] }, 'Graph of y equals p of x: a downward-opening parabola crossing the x-axis at x equals minus 2 and x equals 3, and the y-axis at 6.', 'Graph of $y = p(x)$.');
export const qPlotT5 = plot({ x: [-4, 6], y: [-10, 8], fns: [{ expr: 'x^2 - 2x - 8' }] }, 'Graph of y equals p of x: an upward-opening parabola crossing the x-axis at x equals minus 2 and x equals 4, with lowest point at x equals 1, y equals minus 9.', 'Graph of $y = p(x)$, $p$ quadratic.');
export const qPlotL4 = plot({ x: [-2, 4], y: [-6, 6], fns: [{ expr: 'x^3 - 3x^2 - x + 3' }] }, 'Graph of y equals p of x, a cubic curve crossing the x-axis at x equals minus 1, 1 and 3, and the y-axis at 3.', 'Graph of $y = p(x)$, $p$ cubic.');
const fountain = plot({ x: [0, 7], y: [0, 10], xl: 'horizontal distance x (m)', yl: 'height h (m)', fns: [{ expr: '-x^2 + 4x', label: 'Jet A', domain: [0, 4] }, { expr: '-x^2 + 6x', label: 'Jet B', domain: [0, 6] }] }, 'Two downward-opening parabolic water jets starting from the origin. Jet A, h equals minus x squared plus 4 x, lands 4 metres away. Jet B, h equals minus x squared plus 6 x, lands 6 metres away and rises higher.', 'Jet A: $h = -x^2 + 4x$. Jet B: $h = -x^2 + 6x$.');
const profit = plot({ x: [0, 14], y: [-45, 15], xl: 'x (hundreds of diyas)', yl: 'P (thousand ₹)', fns: [{ expr: '-x^2 + 14x - 40', label: 'P(x)' }] }, 'Graph of the profit P of x equals minus x squared plus 14 x minus 40, a downward-opening parabola that is below the x-axis for small x, crosses it at two points, is positive between them, and falls below again for large x.', 'Profit $P(x) = -x^2 + 14x - 40$ (thousand rupees).');

// =============================================================== MCQ
Q('m01', mk.mcq({
  stem: 'Which of these is a quadratic polynomial?',
  opts: [r`$x^2 + \dfrac{1}{x}$`, r`$3 - 2x^2$`, r`$\sqrt{x} + 4$`, r`$x^3 - 1$`],
  key: 'b',
  sol: r`A polynomial has only whole-number powers of $x$. $\dfrac1x = x^{-1}$ and $\sqrt x = x^{1/2}$ are not allowed, so (a) and (c) are not polynomials. $x^3 - 1$ has degree $3$ (cubic). $3 - 2x^2$ has degree $2$: quadratic.`,
  d: 1, c: 'recall', t: [1], time: 40,
}), (C) => C.key('b'));
Q('m02', mk.mcq({
  stem: r`The zero of the linear polynomial $p(x) = 4x + 6$ is`,
  opts: [r`$-\dfrac{3}{2}$`, r`$\dfrac{3}{2}$`, r`$-\dfrac{2}{3}$`, '$6$'],
  key: 'a',
  sol: r`Solve $4x + 6 = 0$: $x = -\dfrac64 = -\dfrac32$. In general the zero of $ax + b$ is $-\dfrac ba$. Option (b) drops the sign; option (c) inverts the fraction.`,
  d: 1, c: 'understanding', t: [1], time: 40,
}), (C) => C.which([-1.5, 1.5, -2 / 3, 6], -6 / 4));
Q('m03', mk.mcq({
  stem: r`The graph of $y = p(x)$ is shown. The number of zeroes of $p(x)$ is`,
  opts: ['$1$', '$2$', '$3$', '$0$'],
  key: 'c',
  assets: [qPlotCubic],
  sol: r`The zeroes are the $x$-coordinates where the graph meets the $x$-axis. The curve crosses the axis at $x = -1$, $0$ and $2$: three zeroes. (Indeed $p(x) = x^3 - x^2 - 2x = x(x + 1)(x - 2)$.)`,
  d: 2, c: 'understanding', t: [1], time: 45,
}), (C) => { const z = numRoots('x^3 - x^2 - 2x', -3, 4); C.assert(same(z, [-1, 0, 2]), `zeros ${z}`); C.which([1, 2, 3, 0], z.length); });
Q('m04', mk.mcq({
  stem: r`The graph of a quadratic polynomial $y = p(x)$ is shown. How many zeroes does $p(x)$ have?`,
  opts: ['$0$', '$1$', '$2$', '$3$'],
  key: 'b',
  assets: [qPlotTouch],
  sol: r`The parabola touches the $x$-axis at exactly one point, $x = 1$, without crossing it. So $p(x)$ has one zero (here $p(x) = -(x - 1)^2$). Option (c) is the most a quadratic can have, not what this graph shows.`,
  d: 2, c: 'understanding', t: [1], time: 45,
}), (C) => { const z = numRoots('-(x - 1)^2', -2, 4); C.assert(same(z, [1]), `zeros ${z}`); C.which([0, 1, 2, 3], z.length); });
Q('m05', mk.mcq({
  stem: r`The graph of $y = p(x)$ is shown. Which statement is true?`,
  opts: [r`$p(x)$ has two zeroes, both negative`, r`$p(x)$ has one zero, $x = -1$`, r`$p(x)$ has no zeroes`, r`$p(x)$ has a zero at $y = 2$`],
  key: 'c',
  assets: [qPlotAbove],
  sol: r`The whole curve lies above the $x$-axis (its lowest point is $(-1, 2)$), so it never meets the axis and $p(x)$ has no zeroes. $x = -1$ is where the lowest point is, not a zero, and a zero is an $x$-value, never a $y$-value.`,
  d: 2, c: 'understanding', t: [1], time: 45,
}), (C) => { C.assert(numRoots('x^2 + 2x + 3', -4, 2).length === 0 && f('x^2 + 2x + 3')(-1) === 2, 'no zeros, min (−1, 2)'); C.key('c'); });
Q('m06', mk.mcq({
  stem: r`The graph of a quadratic polynomial $y = p(x)$ cuts the $x$-axis only at $(-2, 0)$ and $(5, 0)$. The zeroes of $p(x)$ are`,
  opts: [r`$2$ and $-5$`, r`$-2$ and $5$`, r`$0$ and $5$`, r`$-2$ and $0$`],
  key: 'b',
  sol: r`A zero is the $x$-coordinate of a point where the graph meets the $x$-axis: $-2$ and $5$. Option (a) flips the signs, which happens when students think of the factors $(x + 2)(x - 5)$ instead of the zeroes.`,
  d: 2, c: 'understanding', t: [1], time: 40,
}), (C) => C.key('b'));
Q('m07', mk.mcq({
  stem: 'The maximum number of zeroes a cubic polynomial can have is',
  opts: ['$1$', '$2$', '$3$', '$4$'],
  key: 'c',
  sol: r`A polynomial of degree $n$ has at most $n$ zeroes; its graph meets the $x$-axis at most $n$ times. A cubic has degree $3$, so at most $3$ zeroes.`,
  d: 1, c: 'recall', t: [1], time: 30,
}), (C) => C.key('c'));
Q('m08', mk.mcq({
  stem: r`The graph of $y = ax^2 + bx + c$ is a parabola that opens **downward**. Then`,
  opts: [r`$a > 0$`, r`$a < 0$`, r`$c < 0$`, r`$b < 0$`],
  key: 'b',
  sol: r`The sign of the leading coefficient decides the shape: $a > 0$ opens upward, $a < 0$ opens downward. The constant $c$ only gives the $y$-intercept, and $b$ shifts the parabola sideways.`,
  d: 1, c: 'recall', t: [1], time: 30,
}), (C) => C.key('b'));
Q('m09', mk.mcq({
  stem: r`The sum of the zeroes of $3x^2 - 5x + 2$ is`,
  opts: [r`$\dfrac{5}{3}$`, r`$-\dfrac{5}{3}$`, r`$\dfrac{2}{3}$`, r`$\dfrac{3}{5}$`],
  key: 'a',
  sol: r`Sum $= -\dfrac ba = -\dfrac{-5}{3} = \dfrac53$. **Check:** $3x^2 - 5x + 2 = (3x - 2)(x - 1)$, zeroes $\dfrac23$ and $1$, sum $\dfrac53$. Option (b) forgets the minus sign in $-\dfrac ba$; option (c) is the product.`,
  d: 1, c: 'understanding', t: [2], time: 40,
}), (C) => { const z = zeros(3, -5, 2); C.assert(Math.abs(z[0] - 2 / 3) < 1e-12 && z[1] === 1, 'zeros 2/3, 1'); C.which([5 / 3, -5 / 3, 2 / 3, 3 / 5], z[0] + z[1]); });
Q('m10', mk.mcq({
  stem: r`The product of the zeroes of $4x^2 - 9$ is`,
  opts: [r`$\dfrac{9}{4}$`, r`$-\dfrac{9}{4}$`, '$0$', r`$-\dfrac{3}{2}$`],
  key: 'b',
  sol: r`Here $a = 4$, $b = 0$, $c = -9$, so the product $= \dfrac ca = -\dfrac94$. **Check:** the zeroes are $\pm\dfrac32$ and $\dfrac32 \times \left(-\dfrac32\right) = -\dfrac94$. Option (d) is one of the zeroes.`,
  d: 2, c: 'understanding', t: [2], time: 45,
}), (C) => { const z = zeros(4, 0, -9); C.which([9 / 4, -9 / 4, 0, -1.5], z[0] * z[1]); });
Q('m11', mk.mcq({
  stem: r`A quadratic polynomial whose zeroes are $-3$ and $4$ is`,
  opts: [r`$x^2 + x - 12$`, r`$x^2 - x - 12$`, r`$x^2 - 7x + 12$`, r`$x^2 + 7x + 12$`],
  key: 'b',
  sol: r`Sum $= -3 + 4 = 1$, product $= -12$. Polynomial: $x^2 - (\text{sum})x + \text{product} = x^2 - x - 12$. **Check:** $(x + 3)(x - 4) = x^2 - x - 12$. Option (a) uses $+(\text{sum})x$.`,
  d: 2, c: 'understanding', t: [2], time: 60,
}), (C) => C.which([[1, 1, -12], [1, -1, -12], [1, -7, 12], [1, 7, 12]], polyFromRoots([-3, 4])));
Q('m12', mk.mcq({
  stem: r`If $\alpha$ and $\beta$ are the zeroes of $x^2 - 6x + 4$, then $\alpha^2 + \beta^2$ equals`,
  opts: ['$28$', '$36$', '$44$', '$20$'],
  key: 'a',
  sol: r`$\alpha + \beta = 6$ and $\alpha\beta = 4$. $\alpha^2 + \beta^2 = (\alpha + \beta)^2 - 2\alpha\beta = 36 - 8 = 28$. Option (b) forgets to subtract $2\alpha\beta$; option (c) adds it.`,
  d: 2, c: 'application', t: [2], time: 75,
}), (C) => { const [u, v] = zeros(1, -6, 4); C.which([28, 36, 44, 20], u * u + v * v); });
Q('m13', mk.mcq({
  stem: r`If $2$ is a zero of $2x^2 + kx - 6$, then $k$ equals`,
  opts: ['$-1$', '$1$', '$-7$', '$7$'],
  key: 'a',
  sol: r`$p(2) = 0$: $2(4) + 2k - 6 = 0$, so $8 + 2k - 6 = 0$ and $k = -1$. **Check:** $2x^2 - x - 6 = (2x + 3)(x - 2)$ has the zero $2$.`,
  d: 2, c: 'understanding', t: [1, 2], time: 60,
}), (C) => { const k = -(2 * 4 - 6) / 2; C.which([-1, 1, -7, 7], k); C.assert(zeros(2, k, -6).includes(2), '2 is a zero'); });
Q('m14', mk.mcq({
  stem: r`The zeroes of $5x^2 + 13x + k$ are reciprocals of each other. Then $k$ equals`,
  opts: ['$5$', r`$\dfrac{1}{5}$`, '$13$', '$-5$'],
  key: 'a',
  sol: r`If the zeroes are $\alpha$ and $\dfrac1\alpha$, their product is $1$. So $\dfrac k5 = 1$, giving $k = 5$. **Check:** $5x^2 + 13x + 5$ has real zeroes (since $169 > 100$) whose product is $\dfrac55 = 1$.`,
  d: 3, c: 'application', t: [2], time: 75,
}), (C) => { const z = zeros(5, 13, 5); C.assert(z.length === 2 && Math.abs(z[0] * z[1] - 1) < 1e-12, 'reciprocal zeros'); C.which([5, 0.2, 13, -5], 5 * 1); });
Q('m15', mk.mcq({
  stem: r`The zeroes of $x^2 + (k - 3)x - 16$ are equal in size but opposite in sign. Then $k$ equals`,
  opts: ['$3$', '$-3$', '$4$', '$16$'],
  key: 'a',
  sol: r`If the zeroes are $\alpha$ and $-\alpha$, their sum is $0$. Sum $= -(k - 3) = 0$, so $k = 3$. Then $x^2 - 16$ has zeroes $4$ and $-4$. Option (c) confuses $k$ with a zero.`,
  d: 3, c: 'application', t: [2], time: 75,
}), (C) => { const k = 3; const z = zeros(1, k - 3, -16); C.assert(z[0] === -z[1], 'opposite zeros'); C.which([3, -3, 4, 16], k); });
Q('m16', mk.mcq({
  stem: r`Without solving $x^2 - 7x + 12 = 0$, Tanvi adds the reciprocals of the two zeroes of $x^2 - 7x + 12$. Her total is`,
  opts: [r`$\dfrac{7}{12}$`, r`$\dfrac{12}{7}$`, r`$-\dfrac{7}{12}$`, r`$\dfrac{1}{12}$`],
  key: 'a',
  sol: r`$\dfrac1\alpha + \dfrac1\beta = \dfrac{\alpha + \beta}{\alpha\beta} = \dfrac{7}{12}$. **Check:** the zeroes are $3$ and $4$: $\dfrac13 + \dfrac14 = \dfrac{7}{12}$. Option (b) inverts the fraction; (c) takes the sum of the zeroes as $-7$.`,
  d: 2, c: 'application', t: [2], time: 60,
}), (C) => { const [u, v] = zeros(1, -7, 12); C.which([7 / 12, 12 / 7, -7 / 12, 1 / 12], 1 / u + 1 / v); });
Q('m17', mk.mcq({
  stem: r`Which of these has $6$ as the sum and $7$ as the product of its zeroes?`,
  opts: [r`$x^2 - 6x + 7$`, r`$x^2 + 6x + 7$`, r`$x^2 - 6x - 7$`, r`$x^2 - 7x + 6$`],
  key: 'a',
  sol: r`A quadratic with sum of zeroes $S$ and product $P$ is $k(x^2 - Sx + P)$. With $S = 6$, $P = 7$: $x^2 - 6x + 7$. **Check:** its zeroes are $3 \pm \sqrt2$; sum $6$, product $9 - 2 = 7$. Option (b) has sum $-6$; (c) has product $-7$; (d) swaps the two numbers.`,
  d: 2, c: 'application', t: [2], time: 75,
}), (C) => { const s2 = Math.sqrt(2); C.which([[1, -6, 7], [1, 6, 7], [1, -6, -7], [1, -7, 6]], polyFromRoots([3 + s2, 3 - s2]).map((v) => Math.round(v * 1e9) / 1e9)); });
Q('m18', mk.mcq({
  stem: r`If $\alpha$ and $\beta$ are the zeroes of $x^2 + px + q$, then a polynomial whose zeroes are $2\alpha$ and $2\beta$ is`,
  opts: [r`$x^2 + 2px + 4q$`, r`$x^2 + 2px + 2q$`, r`$x^2 - 2px + 4q$`, r`$2x^2 + 2px + 2q$`],
  key: 'a',
  sol: r`$\alpha + \beta = -p$ and $\alpha\beta = q$. New sum $= 2(\alpha + \beta) = -2p$; new product $= 4\alpha\beta = 4q$. Polynomial: $x^2 - (-2p)x + 4q = x^2 + 2px + 4q$. Option (b) doubles the product instead of multiplying it by $4$; option (d) is $2(x^2 + px + q)$, which has the **same** zeroes as before.`,
  d: 4, c: 'analysis', t: [2], time: 90,
}), (C) => { const p = -5, q = 6; const [u, v] = zeros(1, p, q); const want = polyFromRoots([2 * u, 2 * v]); C.which([[1, 2 * p, 4 * q], [1, 2 * p, 2 * q], [1, -2 * p, 4 * q], [2, 2 * p, 2 * q]], want); });

// =============================================================== Assertion-reason (keys a c d b a c)
Q('ar1', mk.ar({
  a: r`The polynomial $x^2 + 4x + 5$ has no zeroes.`,
  r: r`The graph of $y = x^2 + 4x + 5$ lies entirely above the $x$-axis.`,
  key: 'a',
  sol: r`$x^2 + 4x + 5 = (x + 2)^2 + 1 \ge 1$, so the parabola's lowest point is $(-2, 1)$ and the graph never meets the $x$-axis. That is exactly why there are no zeroes: R explains A.`,
  d: 3, c: 'analysis', t: [1],
}), (C) => { C.assert(numRoots('x^2 + 4x + 5', -10, 10).length === 0 && f('x^2 + 4x + 5')(-2) === 1, 'min 1 at −2'); C.key('a'); });
Q('ar2', mk.ar({
  a: 'A quadratic polynomial can have at most two zeroes.',
  r: 'The graph of every quadratic polynomial is a parabola that opens upward.',
  key: 'c',
  sol: r`A is true: a parabola meets the $x$-axis at most twice. R is false: when the leading coefficient is negative, e.g. $-x^2 + 4$, the parabola opens downward.`,
  d: 2, c: 'understanding', t: [1],
}), (C) => C.key('c'));
Q('ar3', mk.ar({
  a: r`The sum of the zeroes of $2x^2 - 3x - 5$ is $-\dfrac{3}{2}$.`,
  r: r`The sum of the zeroes of $ax^2 + bx + c$ is $-\dfrac{b}{a}$.`,
  key: 'd',
  sol: r`By R, the sum is $-\dfrac{-3}{2} = \dfrac32$, not $-\dfrac32$. Check: $2x^2 - 3x - 5 = (2x - 5)(x + 1)$, zeroes $\dfrac52$ and $-1$, sum $\dfrac32$. A is false, R is true.`,
  d: 2, c: 'understanding', t: [2],
}), (C) => { const z = zeros(2, -3, -5); C.assert(Math.abs(z[0] + z[1] - 1.5) < 1e-12, 'sum 3/2'); C.key('d'); });
Q('ar4', mk.ar({
  a: r`The zeroes of $x^2 - 9$ are $3$ and $-3$.`,
  r: 'If the product of the zeroes of a quadratic polynomial is negative, the two zeroes have opposite signs.',
  key: 'b',
  sol: r`A is true: $x^2 - 9 = (x - 3)(x + 3)$. R is true: a negative product needs one positive and one negative factor. But R only tells us the signs, not the values $3$ and $-3$; A follows from the factorisation, so R is not its explanation.`,
  d: 3, c: 'analysis', t: [2],
}), (C) => { C.assert(same(zeros(1, 0, -9), [-3, 3]), 'zeros ±3'); C.key('b'); });
Q('ar5', mk.ar({
  a: r`$x^2 - 7x + 12$ and $3x^2 - 21x + 36$ have the same zeroes.`,
  r: 'Multiplying a polynomial by a non-zero constant does not change its zeroes.',
  key: 'a',
  sol: r`$3x^2 - 21x + 36 = 3(x^2 - 7x + 12) = 3(x - 3)(x - 4)$, which is zero exactly when $x = 3$ or $x = 4$, like $x^2 - 7x + 12$. R is the reason.`,
  d: 2, c: 'understanding', t: [2],
}), (C) => { C.assert(same(zeros(1, -7, 12), zeros(3, -21, 36)), 'same zeros'); C.key('a'); });
Q('ar6', mk.ar({
  a: r`The graph of $y = x^3 - x$ meets the $x$-axis at three points.`,
  r: 'Every cubic polynomial has exactly three zeroes.',
  key: 'c',
  sol: r`$x^3 - x = x(x - 1)(x + 1)$ has zeroes $-1, 0, 1$, so A is true. R is false: $x^3$ meets the $x$-axis only at $0$. A cubic has **at most** three zeroes.`,
  d: 2, c: 'understanding', t: [1],
}), (C) => { C.assert(same(numRoots('x^3 - x', -3, 3), [-1, 0, 1]) && numRoots('x^3', -3, 3).length === 1, 'zeros'); C.key('c'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: r`$x = 2$ is a zero of $p(x) = x^2 - 3x + 2$.`, key: 't', sol: r`$p(2) = 4 - 6 + 2 = 0$. True.`, d: 1, c: 'recall', t: [1] }), (C) => { C.assert(f('x^2 - 3x + 2')(2) === 0, 'p(2)=0'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`A polynomial of degree $n$ can have more than $n$ zeroes.`, key: 'f', sol: r`A polynomial of degree $n$ has **at most** $n$ zeroes; its graph meets the $x$-axis at most $n$ times.`, d: 1, c: 'recall', t: [1] }), (C) => C.key('f'));
Q('tf3', mk.tf({ stem: r`If the graph of $y = p(x)$ does not meet the $x$-axis at all, then $p(x)$ has no zeroes.`, key: 't', sol: r`Zeroes are exactly the $x$-coordinates of the points where the graph meets the $x$-axis. No meeting point means no zero.`, d: 1, c: 'understanding', t: [1] }), (C) => C.key('t'));
Q('tf4', mk.tf({ stem: r`The polynomials $x^2 + 5x + 6$ and $x^2 - 5x + 6$ have the same product of zeroes.`, key: 't', sol: r`Both have $\dfrac ca = 6$. (Zeroes $-2, -3$ and $2, 3$: products $6$ and $6$; the sums $-5$ and $5$ differ.)`, d: 2, c: 'understanding', t: [2] }), (C) => { const a = zeros(1, 5, 6), b = zeros(1, -5, 6); C.assert(a[0] * a[1] === b[0] * b[1], 'equal products'); C.key('t'); });
Q('tf5', mk.tf({ stem: r`There is exactly one quadratic polynomial whose zeroes are $1$ and $4$.`, key: 'f', sol: r`$k(x^2 - 5x + 4)$ has zeroes $1$ and $4$ for **every** non-zero $k$, e.g. $x^2 - 5x + 4$ and $2x^2 - 10x + 8$. There are infinitely many.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(same(zeros(2, -10, 8), [1, 4]), 'k = 2 also works'); C.key('f'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: r`The zero of $p(x) = 5x - 3$ is ___.`, acc: [['3/5', '0.6']], sol: r`$5x - 3 = 0 \Rightarrow x = \dfrac35 = 0.6$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(3 / 5));
Q('fb2', mk.fill({ stem: 'The graph of a quadratic polynomial is a curve called a ___.', acc: [['parabola']], sol: r`The graph of $y = ax^2 + bx + c$ ($a \ne 0$) is a **parabola**, opening upward if $a > 0$ and downward if $a < 0$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank('parabola'));
Q('fb3', mk.fill({ stem: r`If $\alpha$ and $\beta$ are the zeroes of $2x^2 - 10x + 7$, then $\alpha + \beta =$ ___.`, acc: [['5']], sol: r`$\alpha + \beta = -\dfrac ba = \dfrac{10}{2} = 5$.`, d: 1, c: 'understanding', t: [2] }), (C) => { const z = zeros(2, -10, 7); C.blank(z[0] + z[1]); });
Q('fb4', mk.fill({ stem: r`A quadratic polynomial whose zeroes have sum $0$ and product $-5$ is $x^2 -$ ___.`, acc: [['5']], sol: r`$x^2 - (\text{sum})x + \text{product} = x^2 - 0 \cdot x + (-5) = x^2 - 5$.`, d: 2, c: 'understanding', t: [2] }), (C) => { const z = zeros(1, 0, -5); C.assert(Math.abs(z[0] + z[1]) < 1e-12 && Math.abs(z[0] * z[1] + 5) < 1e-9, 'x^2 - 5'); C.blank(5); });
Q('fb5', mk.fill({ stem: r`If $3$ is a zero of $x^2 + kx + 15$, then $k =$ ___.`, acc: [['-8']], sol: r`$9 + 3k + 15 = 0 \Rightarrow 3k = -24 \Rightarrow k = -8$. **Check:** $x^2 - 8x + 15 = (x - 3)(x - 5)$.`, d: 2, c: 'understanding', t: [1, 2] }), (C) => { const k = -(9 + 15) / 3; C.blank(k); C.assert(zeros(1, k, 15).includes(3), 'zero 3'); });

// =============================================================== Numerical
Q('n01', mk.num({ stem: r`Find the product of the zeroes of $6x^2 - 5x - 6$.`, value: -1, sol: r`Product $= \dfrac ca = \dfrac{-6}{6} = -1$. **Check:** $6x^2 - 5x - 6 = (3x + 2)(2x - 3)$, zeroes $-\dfrac23$ and $\dfrac32$, product $-1$.`, scheme: [['−1', 1]], d: 1, c: 'understanding', t: [2], time: 45 }), (C) => { const z = zeros(6, -5, -6); C.val(z[0] * z[1], 1e-9); });
Q('n02', mk.num({ stem: r`If $\alpha$ and $\beta$ are the zeroes of $x^2 - 8x + 13$, find $\alpha^2 + \beta^2$.`, value: 38, marks: 2, sol: r`**Step 1.** $\alpha + \beta = 8$, $\alpha\beta = 13$. **Step 2.** $\alpha^2 + \beta^2 = (\alpha + \beta)^2 - 2\alpha\beta = 64 - 26 = 38$.`, scheme: [['Sum 8 and product 13', 1], ['38', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { const [u, v] = zeros(1, -8, 13); C.val(u * u + v * v, 1e-9); });
Q('n03', mk.num({ stem: r`The two zeroes of $x^2 - 8x + k$ differ by $2\sqrt{3}$. Find the value of $k$.`, value: 13, marks: 2, sol: r`With $\alpha + \beta = 8$ and $\alpha\beta = k$: $(\alpha - \beta)^2 = (\alpha + \beta)^2 - 4\alpha\beta$, so $(2\sqrt3)^2 = 64 - 4k$, i.e. $12 = 64 - 4k$ and $4k = 52$. Hence $k = 13$. **Check:** the zeroes of $x^2 - 8x + 13$ are $4 \pm \sqrt3$, which differ by $2\sqrt3$.`, scheme: [['Uses (α − β)² = (α + β)² − 4αβ with 12 = 64 − 4k', 1], ['k = 13', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => { const [u, v] = zeros(1, -8, 13); C.assert(Math.abs(Math.abs(u - v) - 2 * Math.sqrt(3)) < 1e-9, 'zeroes differ by 2 root 3'); C.val((64 - 12) / 4, 1e-9); });
Q('n04', mk.num({ stem: r`$3$ is a zero of $3x^2 - 11x + k$. Find $k$.`, value: 6, marks: 2, sol: r`**Step 1.** $p(3) = 0$: $27 - 33 + k = 0$. **Step 2.** $k = 6$. **Check:** $3x^2 - 11x + 6 = (x - 3)(3x - 2)$; the other zero is $\dfrac23$.`, scheme: [['Substitutes x = 3', 1], ['k = 6', 1]], d: 2, c: 'understanding', t: [1, 2], time: 90 }), (C) => { const k = -(27 - 33); C.val(k); C.assert(zeros(3, -11, k).some((z) => Math.abs(z - 2 / 3) < 1e-12), 'other zero 2/3'); });
Q('n05', mk.num({ stem: r`The length and breadth (in metres) of a rectangular plot in Ahmedabad are the zeroes of $x^2 - 23x + 120$. Find the length of its diagonal, in metres, **without** finding the length and breadth separately.`, value: 17, unit: 'm', marks: 2, sol: r`**Step 1.** $l + b = 23$, $lb = 120$. **Step 2.** Diagonal$^2 = l^2 + b^2 = (l + b)^2 - 2lb = 529 - 240 = 289$. **Step 3.** Diagonal $= 17$ m. (Check: the sides are $15$ m and $8$ m.)`, scheme: [['l² + b² = 23² − 2 × 120 = 289', 1], ['17 m', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const [u, v] = zeros(1, -23, 120); C.val(Math.hypot(u, v), 1e-9); C.sol([529, 240, 289, 15, 8]); });
Q('n06', mk.num({ stem: r`One zero of the polynomial $2x^2 + 7x + k$ is $-3$. What is $k$?`, value: 3, marks: 2, sol: r`A zero makes the polynomial equal to $0$: $2(-3)^2 + 7(-3) + k = 0$, so $18 - 21 + k = 0$ and $k = 3$. **Check:** $2x^2 + 7x + 3 = (2x + 1)(x + 3)$ has zeroes $-3$ and $-\dfrac12$.`, scheme: [['Substitutes x = −3 and equates to 0', 1], ['k = 3', 1]], d: 2, c: 'understanding', t: [1, 2], time: 90 }), (C) => { const k = -(2 * 9 - 21); C.val(k, 1e-9); const z = zeros(2, 7, k); C.assert(z.some((x) => Math.abs(x + 3) < 1e-9), 'minus 3 is a zero'); });
Q('n07', mk.num({ stem: r`The parabola $y = x^2 - 6x + 5$ cuts the $x$-axis at points $A$ and $B$. Find the distance $AB$.`, value: 4, marks: 2, sol: r`**Step 1.** Zeroes: $x^2 - 6x + 5 = (x - 1)(x - 5)$, so $A = (1, 0)$, $B = (5, 0)$. **Step 2.** $AB = 5 - 1 = 4$ units.`, scheme: [['Zeroes 1 and 5', 1], ['AB = 4', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { const z = numRoots('x^2 - 6x + 5', -5, 10); C.val(z[1] - z[0], 1e-9); });
Q('n08', mk.num({ stem: r`For the polynomial $x^2 - (k + 2)x + 2k$, the sum of the zeroes equals their product. Find $k$.`, value: 2, marks: 2, sol: r`**Step 1.** Sum $= k + 2$, product $= 2k$. **Step 2.** $k + 2 = 2k \Rightarrow k = 2$. **Check:** $x^2 - 4x + 4 = (x - 2)^2$ has zeroes $2, 2$: sum $4$, product $4$.`, scheme: [['Sum k + 2 and product 2k', 1], ['k = 2', 1]], d: 3, c: 'understanding', t: [2], time: 120 }), (C) => { const k = 2; const z = zeros(1, -(k + 2), 2 * k); C.assert(Math.abs(2 * z[0] - 4) < 1e-9, 'double zero 2'); C.val(k); });
Q('n09', mk.num({ stem: r`A ball is thrown upward from the roof of a building in Mumbai. Its height above the ground after $t$ seconds is $h(t) = -5t^2 + 20t + 25$ metres. After how many seconds does it hit the ground?`, value: 5, unit: 's', marks: 2, sol: r`**Step 1.** The ball hits the ground when $h(t) = 0$: $-5(t^2 - 4t - 5) = -5(t - 5)(t + 1) = 0$. **Step 2.** $t = 5$ or $t = -1$; time cannot be negative, so $t = 5$ s. The zero $-1$ is rejected.`, scheme: [['Sets h(t) = 0 and factorises', 1], ['t = 5 s, rejecting −1', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { const z = numRoots('-5x^2 + 20x + 25', -3, 8); C.assert(same(z, [-1, 5]), `zeros ${z}`); C.val(z[1]); });

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Find the zeroes of $x^2 + 2x - 15$ and verify the relationship between the zeroes and the coefficients.`, model: r`$x^2 + 2x - 15 = x^2 + 5x - 3x - 15 = (x + 5)(x - 3)$. Zeroes: $-5$ and $3$.

Sum $= -5 + 3 = -2 = -\dfrac{2}{1} = -\dfrac ba$. Product $= -15 = \dfrac{-15}{1} = \dfrac ca$. Verified.`, sol: r`Split $2x$ as $5x - 3x$ (since $5 \times (-3) = -15$ and $5 - 3 = 2$).`, scheme: [['Zeroes −5 and 3', 1], ['Both relations verified', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (C) => { const z = zeros(1, 2, -15); C.assert(same(z, [-5, 3]), 'zeros'); C.model([-5, 3, -2, -15]); });
Q('s202', mk.short({ marks: 2, stem: r`Find a quadratic polynomial whose zeroes have sum $\dfrac{5}{2}$ and product $-\dfrac{3}{2}$. Also find its zeroes.`, model: r`$x^2 - \dfrac52x - \dfrac32$, or multiplying by $2$: $2x^2 - 5x - 3$.

$2x^2 - 5x - 3 = 2x^2 - 6x + x - 3 = (2x + 1)(x - 3)$, so the zeroes are $3$ and $-\dfrac12$. (Sum $\dfrac52$, product $-\dfrac32$ ✓.)`, sol: r`Use $k[x^2 - (\text{sum})x + \text{product}]$ with $k = 2$ to clear fractions, then factorise.`, scheme: [['2x² − 5x − 3 (any non-zero multiple)', 1], ['Zeroes 3 and −1/2', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (C) => { const z = zeros(2, -5, -3); C.assert(same(z, [-0.5, 3]) && Math.abs(z[0] + z[1] - 2.5) < 1e-12 && Math.abs(z[0] * z[1] + 1.5) < 1e-12, 'zeros'); C.model(['2x^2 - 5x - 3', 3, '-\\dfrac12']); });
Q('s203', mk.short({ marks: 2, stem: r`The graph of $y = p(x)$, a quadratic polynomial, is shown. (a) Write the zeroes of $p(x)$. (b) Write the value of $p(0)$.`, assets: [qPlotS3], model: r`(a) The graph meets the $x$-axis at $x = -2$ and $x = 3$, so the zeroes are $-2$ and $3$.

(b) The graph meets the $y$-axis at $6$, so $p(0) = 6$.`, sol: r`Zeroes are read on the $x$-axis; $p(0)$ is the $y$-intercept. (Here $p(x) = -x^2 + x + 6 = -(x + 2)(x - 3)$.)`, scheme: [['Zeroes −2 and 3', 1], ['p(0) = 6', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(same(numRoots('-x^2 + x + 6', -4, 5), [-2, 3]) && f('-x^2 + x + 6')(0) === 6, 'graph'); C.model([-2, 3, 6]); });
Q('s204', mk.short({ marks: 2, stem: r`The graph of $y = 25t^2 - 36$ cuts the $t$-axis at two points. Write down their coordinates, and explain from the coefficients why the two points are the same distance from the origin.`, model: r`$25t^2 - 36 = (5t - 6)(5t + 6)$, so $y = 0$ at $t = \dfrac65$ and $t = -\dfrac65$: the points are $\left(\dfrac65, 0\right)$ and $\left(-\dfrac65, 0\right)$.

The coefficient of $t$ is $0$, so the sum of the zeroes is $-\dfrac{0}{25} = 0$: the zeroes are negatives of each other, and so they lie at the same distance, $\dfrac65 = 1.2$, on either side of the origin.`, sol: r`Difference of squares for the crossing points; then use sum of zeroes $= -\dfrac ba$ with $b = 0$.`, scheme: [['Points (6/5, 0) and (−6/5, 0)', 1], ['Sum of zeroes = −b/a = 0, so symmetric about the origin', 1]], d: 2, c: 'understanding', t: [1, 2], time: 120 }), (C) => { const z = zeros(25, 0, -36); C.assert(Math.abs(z[1] - 6 / 5) < 1e-12 && Math.abs(z[0] + z[1]) < 1e-12, 'zeros'); C.model(['\\dfrac65', 1.2]); });
Q('s205', mk.short({ marks: 2, stem: r`$\alpha$ and $\beta$ are the zeroes of $x^2 - 3x - 10$. Find a quadratic polynomial whose zeroes are $\alpha + 1$ and $\beta + 1$.`, model: r`$\alpha + \beta = 3$, $\alpha\beta = -10$.

New sum $= (\alpha + \beta) + 2 = 5$. New product $= \alpha\beta + (\alpha + \beta) + 1 = -10 + 3 + 1 = -6$.

Polynomial: $x^2 - 5x - 6$. (Check: $\alpha, \beta = 5, -2$, so the new zeroes are $6, -1$.)`, sol: r`Expand $(\alpha + 1)(\beta + 1)$ before substituting.`, scheme: [['New sum 5 and new product −6', 1], ['x² − 5x − 6', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const [u, v] = zeros(1, -3, -10); C.assert(same(polyFromRoots([u + 1, v + 1]), [1, -5, -6]), 'x^2 - 5x - 6'); C.model([5, -6, 'x^2 - 5x - 6']); });
Q('s206', mk.short({ marks: 2, stem: r`$3$ is a zero of $x^2 + px - 12$. Find $p$ and the other zero.`, model: r`$9 + 3p - 12 = 0 \Rightarrow p = 1$. The product of the zeroes is $-12$, so the other zero is $\dfrac{-12}{3} = -4$.

Check: sum $= 3 + (-4) = -1 = -p$ ✓.`, sol: r`Substitute, then use the product (or sum) of zeroes.`, scheme: [['p = 1', 1], ['Other zero −4', 1]], d: 2, c: 'understanding', t: [1, 2], time: 120 }), (C) => { const p = -(9 - 12) / 3; C.assert(p === 1 && same(zeros(1, p, -12), [-4, 3]), 'p and zeros'); C.model([1, -4]); });
Q('s207', mk.short({ marks: 2, stem: r`Aman says the quadratic polynomial with zeroes $2$ and $-5$ is $x^2 + 3x - 10$. Neha says it is $2x^2 + 6x - 20$. Who is right? Justify.`, model: r`Both are right. Sum $= -3$, product $= -10$, so $k(x^2 + 3x - 10)$ works for any non-zero $k$. Aman used $k = 1$ and Neha used $k = 2$. Both are zero at $x = 2$ and $x = -5$.`, sol: r`$x^2 - (\text{sum})x + \text{product} = x^2 + 3x - 10$; multiplying by $2$ does not change the zeroes.`, scheme: [['x² + 3x − 10 from sum −3, product −10', 1], ['Both correct: any non-zero multiple', 1]], d: 3, c: 'evaluation', t: [2], time: 120 }), (C) => { C.assert(same(zeros(1, 3, -10), [-5, 2]) && same(zeros(2, 6, -20), [-5, 2]), 'both'); C.model(['Both']); });
Q('s208', mk.short({ marks: 2, stem: r`How many zeroes does $p(x) = x^2 - 4x + 4$ have? Describe how its graph meets the $x$-axis.`, model: r`$x^2 - 4x + 4 = (x - 2)^2$, which is zero only at $x = 2$. So $p(x)$ has one zero, $2$ (repeated).

The parabola opens upward and **touches** the $x$-axis at $(2, 0)$ without crossing it; everywhere else $p(x) > 0$.`, sol: r`A perfect square is never negative, so the graph only touches the axis.`, scheme: [['One zero, x = 2', 1], ['Graph touches the axis at (2, 0)', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(same(numRoots('x^2 - 4x + 4', -2, 6), [2]), 'touch at 2'); C.model(['(2, 0)']); });
Q('s209', mk.short({ marks: 2, stem: r`Find $k$ if the sum of the zeroes of $(k - 1)x^2 + kx + 1$ is $-4$.`, model: r`Sum $= -\dfrac{k}{k - 1} = -4$, so $k = 4(k - 1)$, $3k = 4$, $k = \dfrac43$.

Check: $\dfrac13x^2 + \dfrac43x + 1 = \dfrac13(x^2 + 4x + 3)$ has zeroes $-1$ and $-3$, sum $-4$ ✓.`, sol: r`Set $-\dfrac ba$ equal to $-4$ and solve the linear equation.`, scheme: [['−k/(k − 1) = −4', 1], ['k = 4/3', 1]], d: 3, c: 'understanding', t: [2], time: 120 }), (C) => { const k = 4 / 3; const z = zeros(k - 1, k, 1); C.assert(Math.abs(z[0] + z[1] + 4) < 1e-9, 'sum −4'); C.model(['\\dfrac43', -1, -3]); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`A rectangular mat has area $(6x^2 + 7x - 20)$ cm² and length $(2x + 5)$ cm. Find an expression for its breadth. For which value of $x$ would the breadth become zero, and why is that value also a zero of the area polynomial?`, model: r`Split the middle term: $ac = -120 = 15 \times (-8)$ with $15 - 8 = 7$.

$6x^2 + 7x - 20 = 6x^2 + 15x - 8x - 20 = 3x(2x + 5) - 4(2x + 5) = (2x + 5)(3x - 4)$.

So the breadth is $(3x - 4)$ cm.

The breadth is zero when $3x - 4 = 0$, i.e. $x = \dfrac43$.

At $x = \dfrac43$ the area $= (2x + 5) \times 0 = 0$, so $\dfrac43$ is a zero of $6x^2 + 7x - 20$ (its other zero, $-\dfrac52$, would make the length zero).`, sol: r`Factorise the area by splitting the middle term; the factor other than the length is the breadth, and a factor equal to zero makes the product zero.`, scheme: [['Correct splitting and factorisation (2x + 5)(3x − 4)', 1], ['Breadth (3x − 4) cm and x = 4/3', 1], ['Reason: area = length × 0 = 0, so 4/3 is a zero', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { const z = zeros(6, 7, -20); C.assert(same(z, [-2.5, 4 / 3]), 'zeros'); C.model(['3x - 4', '\\dfrac43', '-\\dfrac52']); });
Q('s302', mk.short({ marks: 3, stem: r`Find a quadratic polynomial whose zeroes are $3 + \sqrt{5}$ and $3 - \sqrt{5}$, and verify that $3 + \sqrt5$ is a zero of it.`, model: r`Sum $= 6$, product $= 9 - 5 = 4$. Polynomial: $x^2 - 6x + 4$.

Verification: $(3 + \sqrt5)^2 - 6(3 + \sqrt5) + 4 = 14 + 6\sqrt5 - 18 - 6\sqrt5 + 4 = 0$ ✓.`, sol: r`$(3 + \sqrt5)^2 = 9 + 6\sqrt5 + 5 = 14 + 6\sqrt5$.`, scheme: [['Sum 6 and product 4', 1], ['x² − 6x + 4', 1], ['Substitution gives 0', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { const z = 3 + Math.sqrt(5); C.assert(Math.abs(z * z - 6 * z + 4) < 1e-12, 'zero'); C.model([6, 4, 14]); });
Q('s303', mk.short({ marks: 3, stem: r`The zeroes of $x^2 - 5x + 3$ are irrational, so call them $p$ and $q$ without working them out. Squaring each zero gives the two zeroes of another quadratic, $x^2 + bx + c$. Find $b$ and $c$.`, model: r`From the coefficients: $p + q = 5$ and $pq = 3$.

Sum of the new zeroes $= p^2 + q^2 = (p + q)^2 - 2pq = 25 - 6 = 19$.

Product of the new zeroes $= p^2q^2 = (pq)^2 = 9$.

The new quadratic is $x^2 - 19x + 9$, so $b = -19$ and $c = 9$.`, sol: r`Work only with $p + q$ and $pq$: $p^2 + q^2 = (p + q)^2 - 2pq$ and $p^2q^2 = (pq)^2$; then $x^2 - (\text{sum})x + \text{product}$.`, scheme: [['p² + q² = 19', 1], ['p²q² = 9', 1], ['b = −19, c = 9', 1]], d: 4, c: 'analysis', t: [2], time: 300 }), (C) => { const [u, v] = zeros(1, -5, 3); const pr = polyFromRoots([u * u, v * v]).map((x) => Math.round(x * 1e9) / 1e9); C.assert(same(pr, [1, -19, 9]), `poly ${pr}`); C.model([19, 9, 'x^2 - 19x + 9']); });
Q('s304', mk.short({ marks: 3, stem: r`$\alpha$ and $\beta$ are the zeroes of $2x^2 - 5x + 1$. Without finding the zeroes, find (a) $\dfrac{1}{\alpha} + \dfrac{1}{\beta}$ (b) $\alpha^2 + \beta^2$.`, model: r`$\alpha + \beta = \dfrac52$, $\alpha\beta = \dfrac12$.

(a) $\dfrac1\alpha + \dfrac1\beta = \dfrac{\alpha + \beta}{\alpha\beta} = \dfrac{5/2}{1/2} = 5$.

(b) $\alpha^2 + \beta^2 = \left(\dfrac52\right)^2 - 2 \times \dfrac12 = \dfrac{25}{4} - 1 = \dfrac{21}{4}$.`, sol: r`Both expressions are symmetric in $\alpha$ and $\beta$, so they can be written using the sum and product only.`, scheme: [['Sum 5/2 and product 1/2', 1], ['(a) 5', 1], ['(b) 21/4', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { const [u, v] = zeros(2, -5, 1); C.assert(Math.abs(1 / u + 1 / v - 5) < 1e-9 && Math.abs(u * u + v * v - 21 / 4) < 1e-9, 'values'); C.model([5, '\\dfrac{21}{4}']); });
Q('s305', mk.short({ marks: 3, stem: r`The graph of a quadratic polynomial $y = p(x)$ is shown, and $p(x) = x^2 + bx + c$. (a) Read the zeroes from the graph. (b) Find $b$ and $c$ using the relationship between zeroes and coefficients.`, assets: [qPlotT5], model: r`(a) The graph cuts the $x$-axis at $x = -2$ and $x = 4$, so the zeroes are $-2$ and $4$.

(b) Sum $= 2 = -\dfrac b1$, so $b = -2$. Product $= -8 = \dfrac c1$, so $c = -8$. Hence $p(x) = x^2 - 2x - 8$.`, sol: r`Check: $(x + 2)(x - 4) = x^2 - 2x - 8$, and $p(0) = -8$ matches the $y$-intercept.`, scheme: [['Zeroes −2 and 4 from the graph', 1], ['b = −2', 1], ['c = −8', 1]], d: 3, c: 'understanding', t: [1, 2], time: 240 }), (C) => { const z = numRoots('x^2 - 2x - 8', -4, 6); C.assert(same(z, [-2, 4]), 'zeros'); C.model([-2, 4, '-8']); });
Q('s306', mk.short({ marks: 3, stem: r`For the polynomial $x^2 - (k + 6)x + 2(2k - 1)$, the sum of the zeroes is one-third of their product. Find $k$ and write the polynomial.`, model: r`Sum $= k + 6$, product $= 2(2k - 1) = 4k - 2$.

$k + 6 = \dfrac{4k - 2}{3} \Rightarrow 3k + 18 = 4k - 2 \Rightarrow k = 20$.

Polynomial: $x^2 - 26x + 78$. Check: sum $26$, product $78$, and $26 = \dfrac{78}{3}$ ✓.`, sol: r`Write both sum and product in terms of $k$, form the equation, solve, substitute back.`, scheme: [['Sum k + 6 and product 4k − 2', 1], ['k = 20', 1], ['x² − 26x + 78 with check', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { const k = 20; C.assert(k + 6 === (4 * k - 2) / 3, 'condition'); C.model([20, 'x^2 - 26x + 78']); });
Q('s307', mk.short({ marks: 3, stem: r`A rectangular herb garden in Indore has an area of $84$ m² and a perimeter of $38$ m. Form a quadratic polynomial whose zeroes are the length and breadth of the garden, and use it to find them.`, model: r`Length $+$ breadth $= \dfrac{38}{2} = 19$ m and length $\times$ breadth $= 84$ m².

Polynomial: $x^2 - 19x + 84$.

$x^2 - 19x + 84 = (x - 7)(x - 12)$, so the length is $12$ m and the breadth is $7$ m.`, sol: r`Half the perimeter is the sum of the zeroes; the area is the product. Check: $2(12 + 7) = 38$ and $12 \times 7 = 84$.`, scheme: [['Sum 19 and product 84', 1], ['x² − 19x + 84', 1], ['12 m and 7 m', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { const z = zeros(1, -19, 84); C.assert(same(z, [7, 12]), 'sides'); C.model([19, 84, 12, 7]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: r`Draw the graph of $p(x) = x^2 - x - 6$ for $-3 \le x \le 4$. From the graph, find the zeroes of $p(x)$, and verify the relationship between the zeroes and the coefficients.`, model: r`Table of values:

| $x$ | $-3$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|---|---|---|---|
| $p(x)$ | $6$ | $0$ | $-4$ | $-6$ | $-6$ | $-4$ | $0$ | $6$ |

Plotting these points and joining them with a smooth curve gives an upward parabola that cuts the $x$-axis at $(-2, 0)$ and $(3, 0)$. So the zeroes are $-2$ and $3$.

Sum $= -2 + 3 = 1 = -\dfrac{-1}{1}$ ✓. Product $= -6 = \dfrac{-6}{1}$ ✓.`, sol: r`The curve is symmetric about $x = \dfrac12$, halfway between the zeroes, with lowest value $p\left(\tfrac12\right) = -6.25$.`, scheme: [['Correct table of values', 1], ['Points plotted and smooth parabola drawn', 1], ['Zeroes −2 and 3 read from the graph', 1], ['Sum verified', 1], ['Product verified', 1]], d: 2, c: 'understanding', t: [1, 2], time: 600 }), (C) => { const g = f('x^2 - x - 6'); const vals = [-3, -2, -1, 0, 1, 2, 3, 4].map(g); C.assert(same(vals, [6, 0, -4, -6, -6, -4, 0, 6]), `table ${vals}`); C.assert(g(0.5) === -6.25, 'min'); C.model([-2, 3, 1, -6]); });
Q('l02', mk.long({ stem: r`$\alpha$ and $\beta$ are the zeroes of $x^2 - 4x + 2$. Without finding $\alpha$ and $\beta$, find:

(a) $\alpha^2 + \beta^2$ (b) $\dfrac{1}{\alpha} + \dfrac{1}{\beta}$ (c) $(\alpha - \beta)^2$ (d) $\alpha^3 + \beta^3$ (e) a quadratic polynomial whose zeroes are $\dfrac{1}{\alpha}$ and $\dfrac{1}{\beta}$.`, model: r`$\alpha + \beta = 4$, $\alpha\beta = 2$.

(a) $\alpha^2 + \beta^2 = 16 - 4 = 12$.

(b) $\dfrac1\alpha + \dfrac1\beta = \dfrac{4}{2} = 2$.

(c) $(\alpha - \beta)^2 = 16 - 8 = 8$.

(d) $\alpha^3 + \beta^3 = (\alpha + \beta)^3 - 3\alpha\beta(\alpha + \beta) = 64 - 24 = 40$.

(e) Sum of new zeroes $= 2$, product $= \dfrac{1}{\alpha\beta} = \dfrac12$. Polynomial: $x^2 - 2x + \dfrac12$, or $2x^2 - 4x + 1$.`, sol: r`Every part is a symmetric expression, rewritten using $\alpha + \beta$ and $\alpha\beta$.`, scheme: [['(a) 12', 1], ['(b) 2', 1], ['(c) 8', 1], ['(d) 40', 1], ['(e) 2x² − 4x + 1', 1]], d: 4, c: 'application', t: [2], time: 660 }), (C) => { const [u, v] = zeros(1, -4, 2); const t = [u * u + v * v, 1 / u + 1 / v, (u - v) ** 2, u ** 3 + v ** 3].map((x) => Math.round(x * 1e9) / 1e9); C.assert(same(t, [12, 2, 8, 40]), `${t}`); C.assert(same(polyFromRoots([1 / u, 1 / v], 2).map((x) => Math.round(x * 1e9) / 1e9), [2, -4, 1]), '(e)'); C.model([12, 2, 8, 40, '2x^2 - 4x + 1']); });
Q('l03', mk.long({ stem: r`$\alpha$ and $\beta$ are the zeroes of $x^2 + 5x + k$, and $\alpha - \beta = 3$. Find $k$ and the zeroes.`, model: r`$\alpha + \beta = -5$ and $\alpha\beta = k$.

$(\alpha - \beta)^2 = (\alpha + \beta)^2 - 4\alpha\beta$, so $9 = 25 - 4k$, giving $k = 4$.

Now $\alpha + \beta = -5$ and $\alpha - \beta = 3$. Adding: $2\alpha = -2$, so $\alpha = -1$ and $\beta = -4$.

Check: $x^2 + 5x + 4 = (x + 1)(x + 4)$, zeroes $-1$ and $-4$, and $-1 - (-4) = 3$ ✓.`, sol: r`Square the given difference to bring in the product, solve for $k$, then solve the two linear equations for $\alpha$ and $\beta$.`, scheme: [['Sum −5 and product k', 1], ['Uses (α − β)² = (α + β)² − 4αβ', 1], ['k = 4', 1], ['α = −1 and β = −4', 1], ['Verification', 1]], d: 5, c: 'analysis', t: [2], time: 660 }), (C) => { const k = (25 - 9) / 4; const z = zeros(1, 5, k); C.assert(k === 4 && z[1] - z[0] === 3 && same(z, [-4, -1]), 'k and zeros'); C.model([4, -1, -4]); });
Q('l04', mk.long({ stem: r`The graph of a cubic polynomial $y = p(x)$ is shown.

(a) Write the number of zeroes and the zeroes of $p(x)$.
(b) Given $p(x) = x^3 - 3x^2 - x + 3$, verify that each value in (a) is a zero.
(c) Write $p(0)$ and explain how it appears on the graph.
(d) Explain why the graph of a quadratic polynomial could never look like this one.`, assets: [qPlotL4], model: r`(a) The curve crosses the $x$-axis three times, at $x = -1$, $1$ and $3$: three zeroes.

(b) $p(-1) = -1 - 3 + 1 + 3 = 0$; $p(1) = 1 - 3 - 1 + 3 = 0$; $p(3) = 27 - 27 - 3 + 3 = 0$ ✓.

(c) $p(0) = 3$: the point $(0, 3)$ where the curve meets the $y$-axis.

(d) A quadratic has degree $2$, so it has at most $2$ zeroes and its graph is a parabola meeting the $x$-axis at most twice. This graph meets it three times and changes direction twice, so it cannot be a quadratic.`, sol: r`$p(x) = (x + 1)(x - 1)(x - 3)$; expanding gives $x^3 - 3x^2 - x + 3$.`, scheme: [['Three zeroes: −1, 1, 3', 1], ['p(−1) = 0 and p(1) = 0', 1], ['p(3) = 0', 1], ['p(0) = 3 as the y-intercept', 1], ['Degree argument: at most 2 zeroes for a quadratic', 1]], d: 3, c: 'analysis', t: [1], time: 600 }), (C) => { const g = f('x^3 - 3x^2 - x + 3'); C.assert(same(numRoots('x^3 - 3x^2 - x + 3', -2, 4), [-1, 1, 3]) && g(0) === 3, 'graph'); C.assert(same(polyFromRoots([-1, 1, 3]), [1, -3, -1, 3]), 'expansion'); C.model([-1, 1, 3]); });
Q('l05', mk.long({ stem: r`Ravi wants a quadratic polynomial with zeroes $-\dfrac{2}{3}$ and $\dfrac{3}{2}$. He writes:

*Step 1: Sum $= \dfrac56$, product $= -1$. Step 2: Polynomial $x^2 - \dfrac56x - 1$. Step 3: Multiply by $6$: $6x^2 + 5x - 6$.*

(a) Check each step and identify any mistake.
(b) Write the correct polynomial with integer coefficients.
(c) Factorise your answer to (b) to confirm its zeroes.
(d) Find the zeroes of Ravi's final polynomial, to show what his mistake changed.`, model: r`(a) Step 1 is correct: $-\dfrac23 + \dfrac32 = \dfrac{-4 + 9}{6} = \dfrac56$ and $-\dfrac23 \times \dfrac32 = -1$. Step 2 is correct. Step 3 is wrong: $6\left(x^2 - \dfrac56x - 1\right) = 6x^2 - 5x - 6$; Ravi changed the sign of the middle term.

(b) $6x^2 - 5x - 6$.

(c) $6x^2 - 5x - 6 = 6x^2 - 9x + 4x - 6 = 3x(2x - 3) + 2(2x - 3) = (3x + 2)(2x - 3)$; zeroes $-\dfrac23$ and $\dfrac32$ ✓.

(d) $6x^2 + 5x - 6 = (3x - 2)(2x + 3)$ has zeroes $\dfrac23$ and $-\dfrac32$: the sign slip negated both zeroes.`, sol: r`Multiplying by $6$ must multiply every term; the sign of $-\dfrac56x$ stays negative.`, scheme: [['Steps 1 and 2 checked as correct', 1], ['Step 3 error identified (sign of middle term)', 1], ['Correct 6x² − 5x − 6', 1], ['Factorisation (3x + 2)(2x − 3)', 1], ['Ravi\'s zeroes 2/3 and −3/2', 1]], d: 4, c: 'evaluation', t: [2], time: 600 }), (C) => { C.assert(same(polyFromRoots([-2 / 3, 1.5], 6).map((x) => Math.round(x * 1e9) / 1e9), [6, -5, -6]), 'correct'); const z = zeros(6, 5, -6); C.assert(Math.abs(z[0] + 1.5) < 1e-12 && Math.abs(z[1] - 2 / 3) < 1e-12, 'ravi zeros'); C.model(['6x^2 - 5x - 6', '(3x + 2)(2x - 3)', '(3x - 2)(2x + 3)']); });
Q('l06', mk.long({ stem: r`$\alpha$ and $\beta$ are the zeroes of $p(x) = 2x^2 - 3x + k$, and $\alpha^2 + \beta^2 = \dfrac{13}{4}$.

(a) Find $k$.
(b) Find a quadratic polynomial whose zeroes are $2\alpha + \beta$ and $\alpha + 2\beta$.`, model: r`(a) $\alpha + \beta = \dfrac32$ and $\alpha\beta = \dfrac k2$. Then $\alpha^2 + \beta^2 = \dfrac94 - k = \dfrac{13}{4}$, so $k = -1$.

(b) Let $s = \alpha + \beta = \dfrac32$, $\alpha\beta = -\dfrac12$.

New sum $= (2\alpha + \beta) + (\alpha + 2\beta) = 3s = \dfrac92$.

New product $= (2\alpha + \beta)(\alpha + 2\beta) = 2\alpha^2 + 5\alpha\beta + 2\beta^2 = 2(\alpha^2 + \beta^2) + 5\alpha\beta = \dfrac{13}{2} - \dfrac52 = 4$.

Polynomial: $x^2 - \dfrac92x + 4$, or $2x^2 - 9x + 8$.`, sol: r`Expand the new product and regroup it as $2(\alpha^2 + \beta^2) + 5\alpha\beta$ so that it uses known values.`, scheme: [['Sum 3/2 and product k/2', 1], ['k = −1', 1], ['New sum 9/2', 1], ['New product 4 with expansion', 1], ['2x² − 9x + 8', 1]], d: 5, c: 'analysis', t: [2], time: 720 }), (C) => { const k = 9 / 4 - 13 / 4; const [u, v] = zeros(2, -3, k); C.assert(k === -1 && Math.abs(u * u + v * v - 13 / 4) < 1e-9, 'k'); const pp = polyFromRoots([2 * u + v, u + 2 * v], 2).map((x) => Math.round(x * 1e9) / 1e9); C.assert(same(pp, [2, -9, 8]), `${pp}`); C.model([-1, '\\dfrac92', 4, '2x^2 - 9x + 8']); });

// =============================================================== Case-based
caseQ('c01', {
  passage: r`At the Brindavan Gardens in Mysuru, two water jets start at ground level. Taking the start of the jets as the origin, the height of jet A after a horizontal distance $x$ metres is $h = -x^2 + 4x$, and the height of jet B is $h = -x^2 + 6x$ (both in metres). The graph shows both jets.`,
  assets: [fountain], d: 3, c: 'application',
  model: r`(a) Option (c): a parabola opening downward. (b) $4$ m. (c) (i) $4$ m, at $x = 2$. Or (ii) Jet B lands $6$ m away, $2$ m farther than jet A.`,
  sol: r`(a) Quadratic with negative leading coefficient. (b) $-x^2 + 4x = -x(x - 4) = 0$ at $x = 0$ and $x = 4$; the water lands where $h = 0$ again, $x = 4$ m. (c) (i) The highest point is midway between the zeroes $0$ and $4$: $x = 2$, $h = -4 + 8 = 4$ m. (ii) $-x^2 + 6x = -x(x - 6)$: zeroes $0, 6$; $6 - 4 = 2$ m.`,
  children: [
    child('a', mk.mcq({ stem: 'The path of each jet has the shape of', opts: ['a straight line', 'a parabola opening upward', 'a parabola opening downward', 'a circle'], key: 'c', sol: r`$h$ is a quadratic in $x$ with leading coefficient $-1 < 0$, so its graph is a downward-opening parabola.`, d: 1, c: 'understanding', t: [1], time: 40 })),
    child('b', mk.num({ stem: 'How far from the start (in metres) does the water of jet A land?', value: 4, unit: 'm', sol: r`$-x^2 + 4x = -x(x - 4) = 0$ gives $x = 0$ (the start) and $x = 4$. The water lands $4$ m away.`, scheme: [['4 m', 1]], d: 2, c: 'understanding', t: [1], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the greatest height reached by jet A, using the fact that the highest point lies midway between the zeroes.', model: r`Zeroes $0$ and $4$, so the highest point is at $x = 2$. Height $= -(2)^2 + 4(2) = 4$ m.`, sol: 'Midpoint of the zeroes, then substitute.', scheme: [['x = 2', 1], ['Height 4 m', 1]], d: 3, c: 'application', t: [1], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** How much farther from the start does jet B land than jet A? Show your working.', model: r`Jet B: $-x^2 + 6x = -x(x - 6) = 0$, so it lands at $x = 6$ m. Jet A lands at $4$ m. Jet B lands $6 - 4 = 2$ m farther.`, sol: 'Find the non-zero zero of each.', scheme: [['Jet B lands at 6 m', 1], ['2 m farther', 1]], d: 2, c: 'application', t: [1], time: 120 }),
    ]),
  ],
}, (C) => { const a = numRoots('-x^2 + 4x', -1, 7), b = numRoots('-x^2 + 6x', -1, 7); C.child('a').key('c'); C.child('b').val(a[1]); C.child('c').model([2, f('-x^2 + 4x')(2)]); C.child('cii').model([b[1], b[1] - a[1]]); });

caseQ('c02', {
  passage: r`A school in Thiruvananthapuram is fencing a rectangular kitchen garden. The length and breadth of the garden (in metres) are the zeroes of the polynomial $p(x) = x^2 - 41x + 420$. The fencing contractor charges by the metre and needs to know the perimeter; the gardener wants the area; and the students want to lay a straight path along one diagonal.`,
  d: 3, c: 'understanding',
  model: r`(a) Option (b): $82$ m. (b) $420$ m². (c) (i) Length $21$ m, breadth $20$ m. Or (ii) Diagonal $= 29$ m.`,
  sol: r`(a) Length $+$ breadth $= -\dfrac{-41}{1} = 41$, perimeter $= 2 \times 41 = 82$ m. (b) Area $= $ product $= 420$ m². (c) (i) $x^2 - 41x + 420 = (x - 20)(x - 21)$. (ii) Diagonal$^2 = l^2 + b^2 = 41^2 - 2 \times 420 = 1681 - 840 = 841$, diagonal $= 29$ m.`,
  children: [
    child('a', mk.mcq({ stem: 'The perimeter of the garden is', opts: ['41 m', '82 m', '420 m', '840 m'], key: 'b', sol: r`Sum of zeroes $= 41 = l + b$, so perimeter $= 2(l + b) = 82$ m. Option (a) forgets to double.`, d: 2, c: 'understanding', t: [2], time: 60 })),
    child('b', mk.num({ stem: 'Find the area of the garden in square metres.', value: 420, unit: 'm²', sol: r`Area $= lb = $ product of zeroes $= \dfrac{420}{1} = 420$ m².`, scheme: [['420 m²', 1]], d: 1, c: 'understanding', t: [2], time: 45 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the length and the breadth of the garden.', model: r`$x^2 - 41x + 420 = x^2 - 20x - 21x + 420 = (x - 20)(x - 21)$. Length $= 21$ m, breadth $= 20$ m.`, sol: r`Two numbers with sum $41$ and product $420$: $20$ and $21$.`, scheme: [['Factorisation', 1], ['21 m and 20 m', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the length of the diagonal path without finding the length and breadth.', model: r`Diagonal$^2 = l^2 + b^2 = (l + b)^2 - 2lb = 41^2 - 2 \times 420 = 1681 - 840 = 841$. Diagonal $= 29$ m.`, sol: 'Use the sum and product of zeroes.', scheme: [['l² + b² = 841', 1], ['29 m', 1]], d: 4, c: 'analysis', t: [2], time: 150 }),
    ]),
  ],
}, (C) => { const [b, l] = zeros(1, -41, 420); C.child('a').which([41, 82, 420, 840], 2 * (l + b)); C.child('b').val(l * b); C.child('c').model([l, b]); C.child('cii').model([1681, 840, 841, Math.hypot(l, b)]); });

caseQ('c03', {
  passage: r`In a Class 10 lesson in Guwahati, the teacher writes $p(x) = x^2 - 5x + 6$ on the board. Anu says, "The sum of its zeroes is $5$ and the product is $6$." Bala says, "So a polynomial with zeroes $2$ and $3$ is $x^2 + 5x + 6$." Chitra wants a polynomial whose zeroes are double those of $p(x)$.`,
  d: 3, c: 'evaluation',
  model: r`(a) Option (a): Anu is correct. (b) The zeroes are $2$ and $3$. (c) (i) Bala is wrong: $x^2 + 5x + 6 = (x + 2)(x + 3)$ has zeroes $-2$ and $-3$; the correct polynomial is $x^2 - 5x + 6$. Or (ii) Chitra's polynomial: zeroes $4$ and $6$, sum $10$, product $24$: $x^2 - 10x + 24$.`,
  sol: r`(a) $-\dfrac ba = 5$, $\dfrac ca = 6$. (b) $(x - 2)(x - 3)$. (c) (i) The form is $x^2 - (\text{sum})x + \text{product}$. (ii) New sum $= 2 \times 5$, new product $= 4 \times 6$.`,
  children: [
    child('a', mk.mcq({ stem: 'Whose statement is correct?', opts: ['Only Anu\'s', 'Only Bala\'s', 'Both', 'Neither'], key: 'a', sol: r`Anu: sum $= 5$, product $= 6$ — correct. Bala's polynomial has the wrong sign on the middle term (see part c).`, d: 2, c: 'evaluation', t: [2], time: 60 })),
    child('b', mk.fill({ stem: r`The zeroes of $x^2 - 5x + 6$ are $2$ and ___.`, acc: [['3']], sol: r`$x^2 - 5x + 6 = (x - 2)(x - 3)$.`, d: 1, c: 'understanding', t: [2], time: 40 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Explain Bala\'s mistake and give the correct polynomial.', model: r`A polynomial with zeroes $\alpha, \beta$ is $x^2 - (\alpha + \beta)x + \alpha\beta$. Bala used $+5x$. His polynomial $(x + 2)(x + 3)$ has zeroes $-2, -3$. Correct: $x^2 - 5x + 6$.`, sol: 'Sign of the middle term.', scheme: [['Identifies sign error (zeroes −2, −3)', 1], ['x² − 5x + 6', 1]], d: 2, c: 'evaluation', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the polynomial Chitra wants.', model: r`Zeroes $2 \times 2 = 4$ and $2 \times 3 = 6$. Sum $= 10$, product $= 24$. Polynomial: $x^2 - 10x + 24$.`, sol: 'Double the zeroes: the sum doubles and the product multiplies by 4.', scheme: [['Sum 10 and product 24', 1], ['x² − 10x + 24', 1]], d: 3, c: 'application', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').key('a'); C.child('b').blank(zeros(1, -5, 6)[1]); C.child('c').assert(same(zeros(1, 5, 6), [-3, -2]), 'Bala zeros'); C.child('cii').assert(same(polyFromRoots([4, 6]), [1, -10, 24]), 'Chitra'); C.child('cii').model([10, 24]); });

caseQ('c04', {
  passage: r`Meena runs a small diya-making unit in Khurja. If she makes and sells $x$ hundred diyas in a week, her profit is $P(x) = -x^2 + 14x - 40$ thousand rupees. A negative profit is a loss. The values of $x$ at which $P(x) = 0$ are her **break-even points**. The graph of $P(x)$ is shown.`,
  assets: [profit], d: 3, c: 'application',
  model: r`(a) Option (b): the zeroes of $P(x)$. (b) $4$ (400 diyas). (c) (i) $P(7) = 9$, a profit of ₹$9000$. Or (ii) Two break-even points, $x = 4$ and $x = 10$; she makes a profit when $4 < x < 10$, i.e. between 400 and 1000 diyas a week.`,
  sol: r`(a) Break-even means $P(x) = 0$. (b) $-x^2 + 14x - 40 = -(x - 4)(x - 10)$: zeroes $4$ and $10$; the smaller is $4$. (c) (i) $P(7) = -49 + 98 - 40 = 9$ thousand rupees. (ii) The parabola opens downward, so it is above the axis between its zeroes.`,
  children: [
    child('a', mk.mcq({ stem: 'On the graph, the break-even points are', opts: ['the points where the graph meets the y-axis', 'the zeroes of P(x)', 'the highest point of the graph', 'the points where P(x) = 14'], key: 'b', sol: r`Break-even means no profit and no loss: $P(x) = 0$, the zeroes, where the graph meets the $x$-axis.`, d: 1, c: 'understanding', t: [1], time: 40 })),
    child('b', mk.num({ stem: 'Find the smaller value of x (in hundreds of diyas) at which Meena breaks even.', value: 4, sol: r`$-x^2 + 14x - 40 = -(x^2 - 14x + 40) = -(x - 4)(x - 10)$. Zeroes $4$ and $10$; the smaller is $4$, i.e. $400$ diyas.`, scheme: [['4', 1]], d: 2, c: 'understanding', t: [1], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find her profit, in rupees, when she sells 700 diyas in a week.', model: r`$x = 7$: $P(7) = -49 + 98 - 40 = 9$ thousand rupees, i.e. ₹$9000$.`, sol: 'Substitute x = 7.', scheme: [['P(7) = 9', 1], ['₹9000', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
      mk.short({ marks: 2, stem: '**(ii)** For which weekly sales does Meena make a profit? Use the graph and the zeroes.', model: r`The zeroes are $4$ and $10$. The parabola opens downward, so $P(x) > 0$ between them: $4 < x < 10$, that is, between 400 and 1000 diyas a week.`, sol: 'Positive between the zeroes for a downward parabola.', scheme: [['Zeroes 4 and 10', 1], ['Profit for 4 < x < 10', 1]], d: 3, c: 'analysis', t: [1], time: 120 }),
    ]),
  ],
}, (C) => { const z = numRoots('-x^2 + 14x - 40', 0, 14); C.assert(same(z, [4, 10]), 'zeros'); C.child('a').key('b'); C.child('b').val(z[0]); C.child('c').model([f('-x^2 + 14x - 40')(7), 9000]); C.child('cii').model([4, 10]); });

caseQ('c05', {
  passage: r`For homework, Tenzin from Gangtok found the zeroes of three polynomials and recorded them in a table:

| Polynomial | Zeroes found |
|---|---|
| $x^2 - 3x - 4$ | $-1$, $4$ |
| $2x^2 + x - 6$ | $-2$, $\dfrac32$ |
| $x^2 + 2x - 8$ | $2$, $4$ |

His teacher asks him to check every row using the sum and product of zeroes.`,
  d: 3, c: 'analysis',
  model: r`(a) Option (c): Row 3. (b) $-4$. (c) (i) Row 2: sum $-\dfrac12 = -\dfrac12$ ✓, product $-3 = -3$ ✓. Or (ii) zeroes $-2$ and $8$: $x^2 - 6x - 16$.`,
  sol: r`(a) Row 3: sum $2 + 4 = 6$ but $-\dfrac ba = -2$. (b) $x^2 + 2x - 8 = (x - 2)(x + 4)$, so $4$ should be $-4$. (c) (i) $-2 + \dfrac32 = -\dfrac12$ and $-\dfrac12 = -\dfrac{1}{2}$ from coefficients; $-2 \times \dfrac32 = -3 = \dfrac{-6}{2}$. (ii) Row 1 doubled: $-2$, $8$; sum $6$, product $-16$.`,
  children: [
    child('a', mk.mcq({ stem: 'Which row has an error?', opts: ['Row 1', 'Row 2', 'Row 3', 'No row'], key: 'c', sol: r`Row 3: the sum $2 + 4 = 6$ should equal $-\dfrac21 = -2$, and the product $8$ should equal $-8$. Rows 1 and 2 pass both tests.`, d: 2, c: 'analysis', t: [2], time: 90 })),
    child('b', mk.fill({ stem: r`In row 3, the correct zeroes are $2$ and ___.`, acc: [['-4']], sol: r`$x^2 + 2x - 8 = (x - 2)(x + 4)$, so the zeroes are $2$ and $-4$.`, d: 2, c: 'understanding', t: [2], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Verify row 2 using the relationship between zeroes and coefficients.', model: r`Sum $= -2 + \dfrac32 = -\dfrac12$ and $-\dfrac ba = -\dfrac12$ ✓. Product $= -2 \times \dfrac32 = -3$ and $\dfrac ca = \dfrac{-6}{2} = -3$ ✓.`, sol: 'Compare both sum and product.', scheme: [['Sum check', 1], ['Product check', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find a quadratic polynomial whose zeroes are twice the zeroes in row 1.', model: r`Zeroes $-2$ and $8$. Sum $= 6$, product $= -16$. Polynomial: $x^2 - 6x - 16$.`, sol: 'Double each zero, then use sum and product.', scheme: [['Sum 6 and product −16', 1], ['x² − 6x − 16', 1]], d: 3, c: 'application', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.assert(same(zeros(1, -3, -4), [-1, 4]) && same(zeros(2, 1, -6), [-2, 1.5]), 'rows 1, 2 correct'); C.child('a').assert(!same(zeros(1, 2, -8), [2, 4]), 'row 3 wrong'); C.child('a').key('c'); C.child('b').blank(zeros(1, 2, -8)[0]); C.child('cii').assert(same(polyFromRoots([-2, 8]), [1, -6, -16]), 'doubled'); C.child('cii').model([6, -16]); });
// =============================================================== added 2026-10-27 (assessment-designer)
// Recall/understanding written items for the board-paper competency balance (blueprint 54/24/22 Standard,
// 75/15/10 Basic). Appended after every existing item so earlier ids do not move.
Q('u301', mk.short({
  marks: 3,
  stem: r`Factorise $6x^2 - 7x - 3$ to find its two zeroes. Then check that their sum equals $-\dfrac{b}{a}$ and their product equals $\dfrac{c}{a}$.`,
  model: r`Split the middle term: $6x^2 - 9x + 2x - 3 = 3x(2x - 3) + 1(2x - 3) = (3x + 1)(2x - 3)$.

Zeroes: $3x + 1 = 0 \Rightarrow x = -\dfrac13$, and $2x - 3 = 0 \Rightarrow x = \dfrac32$.

Sum $= -\dfrac13 + \dfrac32 = \dfrac{-2 + 9}{6} = \dfrac{7}{6}$, and $-\dfrac ba = -\dfrac{-7}{6} = \dfrac{7}{6}$ ✓.

Product $= -\dfrac13 \times \dfrac32 = -\dfrac12$, and $\dfrac ca = \dfrac{-3}{6} = -\dfrac12$ ✓.`,
  sol: r`Split $-7x$ as $-9x + 2x$ (product $6 \times (-3) = -18$), then compare with $a = 6$, $b = -7$, $c = -3$.`,
  scheme: [['(3x + 1)(2x − 3)', 1], ['Zeroes −1/3 and 3/2', 1], ['Sum 7/6 and product −1/2 checked', 1]],
  d: 2, c: 'understanding', t: [2], time: 240,
}), (C) => { const z = quadRoots(6, -7, -3).sort((u, v) => u - v); C.assert(Math.abs(z[0] + 1 / 3) < 1e-12 && Math.abs(z[1] - 1.5) < 1e-12, `zeroes ${z}`); C.assert(Math.abs(z[0] + z[1] - 7 / 6) < 1e-12 && Math.abs(z[0] * z[1] + 0.5) < 1e-12, 'sum, product'); C.model([r`\dfrac{7}{6}`, r`-\dfrac12`, r`\dfrac32`, r`-\dfrac13`]); });

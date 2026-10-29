// CBSE 12 Mathematics ch08 Application of Integrals — practice bank with independent re-solve checks:
// every area is recomputed by composite Simpson's rule on the stated curve (|f| where the curve dips
// below the axis) and compared with the exact value in the key, solution or model answer.
// Area between two curves (deleted for 2026-27) is never asked: every region is bounded by ONE curve
// and lines parallel to the axes (or the axes themselves).
import { Q, caseQ, child, mk, r } from '../../cbse-12-mathematics-ch01/src/lib.mjs';
import { simpson, areaAbs, close, round2, sq, P, S3 } from './area.mjs';

/** MCQ check: the option values (typed independently of the text) — exactly one is within tolerance of the re-solved area. */
const pick = (C, values, target) => C.which(values.map((v) => close(v, target)), true);
const circ = (rr) => (x) => sq(rr * rr - x * x);
const ell = (a, b) => (x) => (b / a) * sq(a * a - x * x);
const T = [1];

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`Let $f$ be continuous and $f(x) \ge 0$ on $[a, b]$. The area of the region bounded by $y = f(x)$, the $x$-axis and the lines $x = a$ and $x = b$ is`, opts: [r`$\displaystyle\int_a^b f(x)\,dx$`, r`$f(b) - f(a)$`, r`$\displaystyle\int_a^b f'(x)\,dx$`, r`$(b - a)\,f(b)$`], key: 'a', sol: r`Add up thin vertical strips of height $f(x)$ and width $dx$. Option (c) equals option (b), the change in $f$, not an area.`, d: 1, c: 'recall', t: T, time: 30 }),
  (C) => { const g = (x) => x + 1; pick(C, [simpson(g, 0, 2), g(2) - g(0), g(2) - g(0), 2 * g(2)], 4); });
Q('m02', mk.mcq({ stem: r`The area of the region bounded by the line $y = 4x$, the $x$-axis and the ordinate $x = 3$ is`, opts: ['$18$ sq units', '$36$ sq units', '$12$ sq units', '$9$ sq units'], key: 'a', sol: r`$\displaystyle\int_0^3 4x\,dx = \left[2x^2\right]_0^3 = 18$. It is also a triangle with base $3$ and height $12$: $\tfrac12 \times 3 \times 12 = 18$. Option (b) forgets the half.`, d: 1, c: 'understanding', t: T, time: 45 }),
  (C) => pick(C, [18, 36, 12, 9], simpson((x) => 4 * x, 0, 3)));
Q('m03', mk.mcq({ stem: r`What is the area under the parabola $y = 3x^2$ from $x = 1$ to $x = 2$, above the $x$-axis?`, opts: ['$7$ sq units', '$21$ sq units', '$9$ sq units', '$8$ sq units'], key: 'a', sol: r`$\displaystyle\int_1^2 3x^2\,dx = \left[x^3\right]_1^2 = 8 - 1 = 7$. Option (d) forgets the lower limit.`, d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => pick(C, [7, 21, 9, 8], simpson((x) => 3 * x * x, 1, 2)));
Q('m04', mk.mcq({ stem: r`The region bounded by the curve $y = \sqrt{x}$, the $x$-axis and the line $x = 9$ has area`, opts: ['$18$ sq units', '$27$ sq units', '$9$ sq units', '$6$ sq units'], key: 'a', sol: r`$\displaystyle\int_0^9 x^{1/2}\,dx = \tfrac23\left[x^{3/2}\right]_0^9 = \tfrac23 \times 27 = 18$. Option (b) forgets the factor $\tfrac23$.`, d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => pick(C, [18, 27, 9, 6], simpson((x) => sq(x), 0, 9)));
Q('m05', mk.mcq({ stem: r`The line $y = x - 3$ crosses the $x$-axis at $x = 3$. The area enclosed by this line, the $x$-axis and the lines $x = 0$ and $x = 6$ is`, opts: ['$9$ sq units', '$0$ sq units', '$18$ sq units', '$4.5$ sq units'], key: 'a', sol: r`The line is below the axis on $(0, 3)$ and above it on $(3, 6)$. Area $= \left|\displaystyle\int_0^3 (x - 3)\,dx\right| + \displaystyle\int_3^6 (x - 3)\,dx = 4.5 + 4.5 = 9$. Option (b) is the signed integral, in which the two parts cancel.`, d: 2, c: 'application', t: T, time: 75 }),
  (C) => pick(C, [9, 0, 18, 4.5], areaAbs((x) => x - 3, 0, 6)));
Q('m06', mk.mcq({ stem: r`Using integration, the area enclosed by the circle $x^2 + y^2 = 25$ is`, opts: [r`$25\pi$ sq units`, r`$5\pi$ sq units`, r`$10\pi$ sq units`, r`$625\pi$ sq units`], key: 'a', sol: r`Area $= 4\displaystyle\int_0^5 \sqrt{25 - x^2}\,dx = 4 \times \dfrac{25\pi}{4} = 25\pi$, which agrees with $\pi r^2$ for $r = 5$. Option (c) is the circumference.`, d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => pick(C, [25 * P, 5 * P, 10 * P, 625 * P], 4 * simpson(circ(5), 0, 5)));
Q('m07', mk.mcq({ stem: r`The ellipse $\dfrac{x^2}{36} + \dfrac{y^2}{25} = 1$ encloses a region of area`, opts: [r`$30\pi$ sq units`, r`$11\pi$ sq units`, r`$61\pi$ sq units`, r`$900\pi$ sq units`], key: 'a', sol: r`Here $a = 6$ and $b = 5$, so the area is $\pi ab = 30\pi$. Options (b) and (c) add the semi-axes or the squares instead of multiplying.`, d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => pick(C, [30 * P, 11 * P, 61 * P, 900 * P], 4 * simpson(ell(6, 5), 0, 6)));
Q('m08', mk.mcq({ stem: r`The part of the circle $x^2 + y^2 = 64$ that lies in the first quadrant has area`, opts: [r`$16\pi$ sq units`, r`$64\pi$ sq units`, r`$8\pi$ sq units`, r`$32\pi$ sq units`], key: 'a', sol: r`$\displaystyle\int_0^8 \sqrt{64 - x^2}\,dx = \dfrac{\pi \cdot 64}{4} = 16\pi$, one quarter of the full circle $64\pi$.`, d: 2, c: 'understanding', t: T, time: 45 }),
  (C) => pick(C, [16 * P, 64 * P, 8 * P, 32 * P], simpson(circ(8), 0, 8)));
Q('m09', mk.mcq({ stem: r`Using horizontal strips, find the area of the region bounded by the parabola $x = y^2$, the $y$-axis and the lines $y = 0$ and $y = 3$.`, opts: ['$9$ sq units', '$27$ sq units', '$3$ sq units', '$6$ sq units'], key: 'a', sol: r`Each horizontal strip has length $x = y^2$ and width $dy$: area $= \displaystyle\int_0^3 y^2\,dy = \left[\dfrac{y^3}{3}\right]_0^3 = 9$.`, d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => pick(C, [9, 27, 3, 6], simpson((y) => y * y, 0, 3)));
Q('m10', mk.mcq({ stem: r`The region enclosed between the parabola $y^2 = 16x$ and the vertical line $x = 1$ (both above and below the $x$-axis) has area`, opts: [r`$\dfrac{16}{3}$ sq units`, r`$\dfrac83$ sq units`, r`$\dfrac{32}{3}$ sq units`, '$4$ sq units'], key: 'a', sol: r`The upper half is $y = 4\sqrt{x}$. By symmetry, area $= 2\displaystyle\int_0^1 4\sqrt{x}\,dx = 8 \times \dfrac23 = \dfrac{16}{3}$. Option (b) is only the upper half.`, d: 3, c: 'application', t: T, time: 90 }),
  (C) => pick(C, [16 / 3, 8 / 3, 32 / 3, 4], 2 * simpson((x) => 4 * sq(x), 0, 1)));
Q('m11', mk.mcq({ stem: r`Which integral gives the area enclosed by the ellipse $\dfrac{x^2}{16} + \dfrac{y^2}{4} = 1$?`, opts: [r`$4\displaystyle\int_0^4 \tfrac12\sqrt{16 - x^2}\,dx$`, r`$2\displaystyle\int_0^4 \tfrac12\sqrt{16 - x^2}\,dx$`, r`$4\displaystyle\int_0^2 \tfrac12\sqrt{16 - x^2}\,dx$`, r`$4\displaystyle\int_0^4 2\sqrt{16 - x^2}\,dx$`], key: 'a', sol: r`Upper half: $y = \tfrac24\sqrt{16 - x^2} = \tfrac12\sqrt{16 - x^2}$, for $0 \le x \le 4$ in the first quadrant. Four equal quarters give option (a), which equals $\pi \times 4 \times 2 = 8\pi$. Option (b) counts only half the ellipse; (c) stops at $x = 2$; (d) uses $\tfrac{a}{b}$ instead of $\tfrac{b}{a}$.`, d: 3, c: 'analysis', t: T, time: 90 }),
  (C) => { const h = (x) => 0.5 * sq(16 - x * x); pick(C, [4 * simpson(h, 0, 4), 2 * simpson(h, 0, 4), 4 * simpson(h, 0, 2), 4 * simpson((x) => 2 * sq(16 - x * x), 0, 4)], 8 * P); });
Q('m12', mk.mcq({ stem: r`The area bounded by the graph of $y = |x|$, the $x$-axis and the lines $x = -2$ and $x = 4$ is`, opts: ['$10$ sq units', '$6$ sq units', '$8$ sq units', '$12$ sq units'], key: 'a', sol: r`Split at $0$: $\displaystyle\int_{-2}^0 (-x)\,dx + \int_0^4 x\,dx = 2 + 8 = 10$. Option (b) is $\displaystyle\int_{-2}^4 x\,dx$, which ignores the modulus.`, d: 2, c: 'application', t: T, time: 75 }),
  (C) => pick(C, [10, 6, 8, 12], simpson((x) => Math.abs(x), -2, 4)));
Q('m13', mk.mcq({ stem: r`Consider the region bounded by the line $y = 2x$, the $y$-axis and the horizontal line $y = 6$. Its area is`, opts: ['$9$ sq units', '$18$ sq units', '$3$ sq units', '$36$ sq units'], key: 'a', sol: r`Use horizontal strips of length $x = \dfrac y2$: area $= \displaystyle\int_0^6 \dfrac y2\,dy = \left[\dfrac{y^2}{4}\right]_0^6 = 9$. (A triangle with vertices $(0, 0)$, $(0, 6)$, $(3, 6)$ confirms it.) Option (b) is the whole rectangle $3 \times 6$, not the triangle.`, d: 3, c: 'application', t: T, time: 75 }),
  (C) => pick(C, [9, 18, 3, 36], simpson((y) => y / 2, 0, 6)));
Q('m14', mk.mcq({ stem: r`The upper half of the circle $x^2 + y^2 = 49$ is the graph of`, opts: [r`$y = \sqrt{49 - x^2}$`, r`$y = -\sqrt{49 - x^2}$`, r`$y = 49 - x^2$`, r`$y = \sqrt{x^2 - 49}$`], key: 'a', sol: r`Solve for $y$: $y^2 = 49 - x^2$, so $y = \pm\sqrt{49 - x^2}$; the upper half takes the positive root. Option (c) is a parabola, and (d) is not even defined for $|x| < 7$.`, d: 1, c: 'recall', t: T, time: 30 }),
  (C) => { const x = 3.5, yTop = Math.sqrt(49 - x * x); const onUpper = (y) => Number.isFinite(y) && y >= 0 && close(x * x + y * y, 49); C.which([onUpper(Math.sqrt(49 - x * x)), onUpper(-Math.sqrt(49 - x * x)), onUpper(49 - x * x), onUpper(Math.sqrt(x * x - 49))], true); C.assert(yTop > 0, 'upper point'); });
Q('m15', mk.mcq({ stem: r`The area enclosed by the ellipse $\dfrac{x^2}{25} + \dfrac{y^2}{b^2} = 1$, where $b > 0$, is $20\pi$ square units. Then $b$ equals`, opts: ['$4$', '$16$', '$2$', '$20$'], key: 'a', sol: r`$\pi ab = 20\pi$ with $a = 5$ gives $b = 4$.`, d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => { const ok = (b) => close(4 * simpson(ell(5, b), 0, 5), 20 * P); C.which([ok(4), ok(16), ok(2), ok(20)], true); });
Q('m16', mk.mcq({ stem: r`When an area is found by horizontal strips between a curve and the $y$-axis, the length of a typical strip is`, opts: [r`the $x$-coordinate of the curve, written in terms of $y$`, r`the $y$-coordinate of the curve, written in terms of $x$`, r`the slope $\dfrac{dy}{dx}$ of the curve`, 'always the constant width of the region'], key: 'a', sol: r`A horizontal strip at height $y$ runs from the $y$-axis to the curve, so its length is $x = g(y)$ and its width is $dy$. For example, beside $y = x^2$ from $y = 0$ to $y = 4$ the strips have length $\sqrt{y}$ and the area is $\displaystyle\int_0^4 \sqrt{y}\,dy = \dfrac{16}{3}$.`, d: 2, c: 'understanding', t: T, time: 45 }),
  (C) => { C.assert(close(simpson((y) => sq(y), 0, 4), 16 / 3) && close(2 * 4 - simpson((x) => x * x, 0, 2), 16 / 3), 'strips of length √y give 16/3, as rectangle minus area under y = x²'); C.key('a'); });
Q('m17', mk.mcq({ stem: r`Find the area bounded by $y = 2x^2$, the $x$-axis and the ordinates $x = -1$ and $x = 2$.`, opts: ['$6$ sq units', '$2$ sq units', '$18$ sq units', r`$\dfrac{14}{3}$ sq units`], key: 'a', sol: r`$\displaystyle\int_{-1}^2 2x^2\,dx = \dfrac23\left[x^3\right]_{-1}^2 = \dfrac23(8 + 1) = 6$. The curve never goes below the axis, so no splitting is needed. Option (d) uses $8 - 1$.`, d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => pick(C, [6, 2, 18, 14 / 3], simpson((x) => 2 * x * x, -1, 2)));
Q('m18', mk.mcq({ stem: r`The region in the first quadrant under the circle $x^2 + y^2 = 16$ between the $y$-axis and the line $x = 2$ has area`, opts: [r`$2\sqrt{3} + \dfrac{4\pi}{3}$ sq units`, r`$4\pi$ sq units`, r`$2\sqrt{3} + \dfrac{8\pi}{3}$ sq units`, r`$\dfrac{4\pi}{3}$ sq units`], key: 'a', sol: r`$\displaystyle\int_0^2 \sqrt{16 - x^2}\,dx = \left[\dfrac x2\sqrt{16 - x^2} + 8\sin^{-1}\dfrac x4\right]_0^2 = \sqrt{12} + 8 \cdot \dfrac{\pi}{6} = 2\sqrt{3} + \dfrac{4\pi}{3}$. Option (b) is the whole quarter circle.`, d: 3, c: 'application', t: T, time: 90 }),
  (C) => pick(C, [2 * S3 + (4 * P) / 3, 4 * P, 2 * S3 + (8 * P) / 3, (4 * P) / 3], simpson(circ(4), 0, 2)));

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The area bounded by $y = x - 1$, the $x$-axis and the lines $x = 0$ and $x = 2$ equals $\displaystyle\int_0^2 (x - 1)\,dx$.`, r: 'In a definite integral, the part of the curve lying below the x-axis contributes a negative amount.', key: 'd', sol: r`$\displaystyle\int_0^2 (x - 1)\,dx = 0$, but the region is two triangles of area $\tfrac12$ each, total $1$. A is false. R is true, and it is exactly why the integral undercounts.`, d: 3, c: 'analysis', t: T }),
  (C) => { C.assert(close(simpson((x) => x - 1, 0, 2), 0) && close(areaAbs((x) => x - 1, 0, 2), 1), 'integral 0, area 1'); C.key('d'); });
Q('ar2', mk.ar({ a: r`The area enclosed by the ellipse $\dfrac{x^2}{64} + \dfrac{y^2}{9} = 1$ is $24\pi$ square units.`, r: r`The area enclosed by the ellipse $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ is $\pi ab$.`, key: 'a', sol: r`With $a = 8$, $b = 3$, R gives $\pi \times 8 \times 3 = 24\pi$. Both true, and R gives A directly.`, d: 2, c: 'understanding', t: T }),
  (C) => { C.assert(close(4 * simpson(ell(8, 3), 0, 8), 24 * P), '24π'); C.key('a'); });
Q('ar3', mk.ar({ a: r`The area enclosed by the circle $x^2 + y^2 = 36$ is $36\pi$ square units.`, r: r`The length of the boundary of this circle is $12\pi$ units.`, key: 'b', sol: r`A: $4\displaystyle\int_0^6 \sqrt{36 - x^2}\,dx = 36\pi$, true. R: circumference $2\pi \times 6 = 12\pi$, true. But a perimeter does not explain an area: R is not the explanation of A.`, d: 2, c: 'analysis', t: T }),
  (C) => { C.assert(close(4 * simpson(circ(6), 0, 6), 36 * P), '36π'); C.key('b'); });
Q('ar4', mk.ar({ a: r`The area under $y = 3\sqrt{x}$ from $x = 0$ to $x = 4$ is $16$ square units.`, r: r`$\displaystyle\int \sqrt{x}\,dx = \dfrac32 x^{3/2} + C$.`, key: 'c', sol: r`A: $\displaystyle\int_0^4 3x^{1/2}\,dx = 3 \cdot \dfrac23\left[x^{3/2}\right]_0^4 = 2 \times 8 = 16$, true. R is false: the antiderivative is $\dfrac23 x^{3/2} + C$.`, d: 3, c: 'analysis', t: T }),
  (C) => { C.assert(close(simpson((x) => 3 * sq(x), 0, 4), 16), '16'); const F = (x) => 1.5 * x ** 1.5; C.assert(Math.abs((F(1.0001) - F(1)) / 0.0001 - 1) > 0.1, 'R antiderivative is wrong'); C.key('c'); });
Q('ar5', mk.ar({ a: r`The region in the first quadrant bounded by $y = x^2$, the $y$-axis and the lines $y = 1$ and $y = 4$ has area $\dfrac{14}{3}$ square units.`, r: r`Area against the $y$-axis is $\displaystyle\int_c^d x\,dy$, with $x$ written as a function of $y$.`, key: 'a', sol: r`By R, area $= \displaystyle\int_1^4 \sqrt{y}\,dy = \dfrac23(8 - 1) = \dfrac{14}{3}$. Both true, and R is the method that gives A.`, d: 2, c: 'understanding', t: T }),
  (C) => { C.assert(close(simpson((y) => sq(y), 1, 4), 14 / 3), '14/3'); C.key('a'); });
Q('ar6', mk.ar({ a: r`The area bounded by $y = -x^2$, the $x$-axis and the lines $x = 0$ and $x = 3$ is $-9$ square units.`, r: 'An area is never negative.', key: 'd', sol: r`$\displaystyle\int_0^3 (-x^2)\,dx = -9$, but the area is its absolute value, $9$. A is false; R is true.`, d: 2, c: 'understanding', t: T }),
  (C) => { C.assert(close(simpson((x) => -x * x, 0, 3), -9) && close(areaAbs((x) => -x * x, 0, 3), 9), 'integral −9, area 9'); C.key('d'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`If a curve lies entirely below the $x$-axis on $[a, b]$, the area between it and the axis is $\displaystyle\int_a^b f(x)\,dx$, with no change of sign.`, key: 'f', sol: r`That integral is negative. The area is $\left|\displaystyle\int_a^b f(x)\,dx\right|$; for instance $\displaystyle\int_0^2 (-x^2)\,dx = -\dfrac83$, while the area is $\dfrac83$.`, d: 1, c: 'understanding', t: T }),
  (C) => { C.assert(simpson((x) => -x * x, 0, 2) < 0 && close(areaAbs((x) => -x * x, 0, 2), 8 / 3), 'negative integral'); C.key('f'); });
Q('tf2', mk.tf({ stem: r`Integration confirms the school formula: the circle $x^2 + y^2 = 9$ encloses $9\pi$ square units.`, key: 't', sol: r`$4\displaystyle\int_0^3 \sqrt{9 - x^2}\,dx = 4 \times \dfrac{9\pi}{4} = 9\pi = \pi r^2$ with $r = 3$.`, d: 2, c: 'understanding', t: T }),
  (C) => { C.assert(close(4 * simpson(circ(3), 0, 3), 9 * P), '9π'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`The region bounded by $y = 2x$, the $x$-axis and $x = 5$ has the same area as a triangle with base $5$ and height $10$.`, key: 't', sol: r`$\displaystyle\int_0^5 2x\,dx = 25$, and $\tfrac12 \times 5 \times 10 = 25$: the region is that triangle.`, d: 2, c: 'application', t: T }),
  (C) => { C.assert(close(simpson((x) => 2 * x, 0, 5), 25) && 0.5 * 5 * 10 === 25, '25'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`The ellipse $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$ encloses more area than the circle $x^2 + y^2 = 16$.`, key: 'f', sol: r`Ellipse: $\pi \times 5 \times 3 = 15\pi$. Circle: $16\pi$. The circle is larger, even though the ellipse is wider.`, d: 3, c: 'analysis', t: T }),
  (C) => { const e = 4 * simpson(ell(5, 3), 0, 5), c = 4 * simpson(circ(4), 0, 4); C.assert(close(e, 15 * P) && close(c, 16 * P) && e < c, '15π < 16π'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`$\displaystyle\int_{-3}^{3} x\,dx$ equals the area bounded by $y = x$, the $x$-axis and the lines $x = -3$ and $x = 3$.`, key: 'f', sol: r`The integral is $0$ because the two triangles cancel; the area is $4.5 + 4.5 = 9$.`, d: 2, c: 'understanding', t: T }),
  (C) => { C.assert(close(simpson((x) => x, -3, 3), 0) && close(areaAbs((x) => x, -3, 3), 9), '0 vs 9'); C.key('f'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The area of the rectangle-shaped region bounded by $y = 5$, the $x$-axis and the lines $x = 1$, $x = 4$ is ____ square units.`, acc: [['15']], sol: r`$\displaystyle\int_1^4 5\,dx = 5 \times 3 = 15$.`, d: 1, c: 'understanding', t: T }),
  (C) => C.blank(simpson(() => 5, 1, 4)));
Q('fb2', mk.fill({ stem: r`Under the curve $y = x^2$, between $x = 0$ and $x = 3$ and above the $x$-axis, the area is ____ square units.`, acc: [['9']], sol: r`$\left[\dfrac{x^3}{3}\right]_0^3 = 9$.`, d: 1, c: 'understanding', t: T }),
  (C) => C.blank(Math.round(simpson((x) => x * x, 0, 3) * 1e9) / 1e9));
Q('fb3', mk.fill({ stem: r`The ellipse $\dfrac{x^2}{4} + y^2 = 1$ encloses $k\pi$ square units, where $k =$ ____.`, acc: [['2']], sol: r`$a = 2$, $b = 1$: area $\pi ab = 2\pi$.`, d: 2, c: 'understanding', t: T }),
  (C) => C.blank(Math.round((4 * simpson(ell(2, 1), 0, 2)) / P * 1e4) / 1e4));
Q('fb4', mk.fill({ stem: r`The region enclosed by the parabola $y^2 = x$ and the line $x = 4$ has area ____ square units.`, acc: [['32/3', r`$\dfrac{32}{3}$`]], sol: r`$2\displaystyle\int_0^4 \sqrt{x}\,dx = 2 \cdot \dfrac23 \cdot 8 = \dfrac{32}{3}$, i.e. 32/3.`, d: 3, c: 'application', t: T }),
  (C) => { const v = 2 * simpson((x) => sq(x), 0, 4); C.assert(close(v, 32 / 3), '32/3'); C.blank(32 / 3); });
Q('fb5', mk.fill({ stem: r`One quarter of the disc $x^2 + y^2 \le 100$ has area $k\pi$ square units, where $k =$ ____.`, acc: [['25']], sol: r`$\dfrac14 \pi (10)^2 = 25\pi$.`, d: 2, c: 'understanding', t: T }),
  (C) => C.blank(Math.round((simpson(circ(10), 0, 10) / P) * 1e4) / 1e4));

// =============================================================== numerical
Q('n01', mk.num({ stem: r`Find the area (in square units) of the region bounded by $y = 3x + 2$, the $x$-axis and the lines $x = 0$ and $x = 4$.`, value: 32, sol: r`$\displaystyle\int_0^4 (3x + 2)\,dx = \left[\dfrac{3x^2}{2} + 2x\right]_0^4 = 24 + 8 = 32$.`, scheme: [['32', 1]], d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => C.val(simpson((x) => 3 * x + 2, 0, 4), 1e-6));
Q('n02', mk.num({ stem: r`The upper branch of the parabola $y^2 = 36x$ is $y = 6\sqrt{x}$. Find the area (in square units) under this branch from $x = 0$ to $x = 1$.`, value: 4, sol: r`$\displaystyle\int_0^1 6x^{1/2}\,dx = 6 \cdot \dfrac23 = 4$.`, scheme: [['4', 1]], d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => C.val(simpson((x) => 6 * sq(x), 0, 1), 1e-5));
Q('n03', mk.num({ stem: r`Find the area (in square units) between the curve $x = 3y^2$ and the $y$-axis, from $y = 0$ to $y = 2$.`, value: 8, sol: r`Horizontal strips: $\displaystyle\int_0^2 3y^2\,dy = \left[y^3\right]_0^2 = 8$.`, scheme: [['8', 1]], d: 2, c: 'understanding', t: T, time: 60 }),
  (C) => C.val(simpson((y) => 3 * y * y, 0, 2), 1e-6));
Q('n04', mk.num({ stem: r`The curve $4x^2 + y^2 = 64$ encloses an area of $k\pi$ square units. Find $k$.`, value: 32, sol: r`Divide by $64$: $\dfrac{x^2}{16} + \dfrac{y^2}{64} = 1$, an ellipse with $a = 4$, $b = 8$. Area $\pi ab = 32\pi$, so $k = ab = 4 \times 8 = 32$.`, scheme: [['32', 1]], d: 3, c: 'understanding', t: T, time: 75 }),
  (C) => C.val((4 * simpson(ell(4, 8), 0, 4)) / P, 1e-4));
Q('n05', mk.num({ stem: r`Find the area (in square units) bounded by the graph of $y = |x - 2|$, the $x$-axis and the lines $x = 0$ and $x = 5$.`, value: 6.5, sol: r`Two triangles meeting at $x = 2$: $\tfrac12 \times 2 \times 2 + \tfrac12 \times 3 \times 3 = 2 + 4.5 = 6.5$.`, scheme: [['6.5', 1]], d: 3, c: 'application', t: T, time: 90 }),
  (C) => C.val(simpson((x) => Math.abs(x - 2), 0, 5, 200000), 1e-5));
Q('n06', mk.num({ stem: r`A semicircular rangoli of radius $1.5$ m is bounded by $x^2 + y^2 = 2.25$ and the $x$-axis, with $y \ge 0$. Find its area in m$^2$, correct to two decimal places. (Use $\pi = 3.1416$.)`, value: 3.53, tol: 0.01, unit: 'm²', sol: r`Area $= 2\displaystyle\int_0^{1.5} \sqrt{2.25 - x^2}\,dx = \dfrac{\pi(2.25)}{2} \approx 3.53$.`, scheme: [['3.53', 1]], d: 3, c: 'application', t: T, time: 90 }),
  (C) => C.val(2 * simpson(circ(1.5), 0, 1.5), 0.01));

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`A curve is given by $y = 4x^2$. Calculate the area enclosed between this curve and the $x$-axis over the interval $0 \le x \le 3$.`, model: r`The curve is above the axis, so area $= \displaystyle\int_0^3 4x^2\,dx = \left[\dfrac{4x^3}{3}\right]_0^3 = \dfrac{4 \times 27}{3} = 36$ sq units.`, sol: 'Integrate the curve between the ordinates.', scheme: [['Correct integral with limits', 1], ['36 sq units', 1]], d: 2, c: 'understanding', t: T, time: 120 }),
  (C) => { C.assert(close(simpson((x) => 4 * x * x, 0, 3), 36), '36'); C.model([36]); });
Q('s202', mk.short({ marks: 2, stem: r`By integration, find the area enclosed by the line $y = 3x$, the $x$-axis and the ordinates $x = 2$ and $x = 4$. Check your answer with the area of a trapezium.`, model: r`Area $= \displaystyle\int_2^4 3x\,dx = \left[\dfrac{3x^2}{2}\right]_2^4 = 24 - 6 = 18$ sq units. Check: parallel sides $6$ and $12$, width $2$: $\tfrac12(6 + 12)(2) = 18$ ✓.`, sol: 'Integral, then the trapezium formula as a check.', scheme: [['Integral evaluated', 1], ['18 with the check', 1]], d: 2, c: 'understanding', t: T, time: 120 }),
  (C) => { C.assert(close(simpson((x) => 3 * x, 2, 4), 18) && 0.5 * (6 + 12) * 2 === 18, '18'); C.model([18, 6, 12]); });
Q('s203', mk.short({ marks: 2, stem: r`Find the area of the region in the first quadrant enclosed by $y = x^2$, the $y$-axis and the line $y = 9$.`, model: r`Use horizontal strips: in the first quadrant $x = \sqrt{y}$. Area $= \displaystyle\int_0^9 \sqrt{y}\,dy = \dfrac23\left[y^{3/2}\right]_0^9 = \dfrac23 \times 27 = 18$ sq units.`, sol: 'Write x in terms of y and integrate along the y-axis.', scheme: [['x = √y and the integral from 0 to 9', 1], ['18 sq units', 1]], d: 2, c: 'application', t: T, time: 120 }),
  (C) => { C.assert(close(simpson((y) => sq(y), 0, 9), 18) && close(3 * 9 - simpson((x) => x * x, 0, 3), 18), '18 both ways'); C.model([18, 27]); });
Q('s204', mk.short({ marks: 2, stem: r`Using integration, find the area of the part of the circle $x^2 + y^2 = 81$ that lies in the first quadrant.`, model: r`Area $= \displaystyle\int_0^9 \sqrt{81 - x^2}\,dx = \left[\dfrac x2\sqrt{81 - x^2} + \dfrac{81}{2}\sin^{-1}\dfrac x9\right]_0^9 = \dfrac{81}{2} \cdot \dfrac{\pi}{2} = \dfrac{81\pi}{4}$ sq units.`, sol: 'Standard integral of the square root of a squared minus x squared.', scheme: [['Integral with the standard form', 1], ['81π/4', 1]], d: 2, c: 'understanding', t: T, time: 120 }),
  (C) => { C.assert(close(simpson(circ(9), 0, 9), (81 * P) / 4), '81π/4'); C.model([81, r`\dfrac{81\pi}{4}`]); });
Q('s205', mk.short({ marks: 2, stem: r`The line $y = x - 4$ meets the $x$-axis at $(4, 0)$. Find the area bounded by this line, the $x$-axis and the lines $x = 0$ and $x = 6$.`, model: r`On $[0, 4]$ the line is below the axis: $\left|\displaystyle\int_0^4 (x - 4)\,dx\right| = |-8| = 8$. On $[4, 6]$: $\displaystyle\int_4^6 (x - 4)\,dx = 2$. Area $= 8 + 2 = 10$ sq units (the single integral $\displaystyle\int_0^6$ would wrongly give $-6$).`, sol: 'Split at the crossing point and add absolute values.', scheme: [['Split at x = 4 with both parts', 1], ['10 sq units', 1]], d: 3, c: 'application', t: T, time: 120 }),
  (C) => { C.assert(close(areaAbs((x) => x - 4, 0, 6), 10) && close(simpson((x) => x - 4, 0, 6), -6), '10, not −6'); C.model([8, 2, 10, 6]); });
Q('s206', mk.short({ marks: 2, stem: r`Evaluate the area under the curve $y = 5\sqrt{x}$ between the lines $x = 1$ and $x = 4$, above the $x$-axis.`, model: r`Area $= \displaystyle\int_1^4 5x^{1/2}\,dx = \dfrac{10}{3}\left[x^{3/2}\right]_1^4 = \dfrac{10}{3}(8 - 1) = \dfrac{70}{3}$ sq units.`, sol: 'Power rule with the two ordinates.', scheme: [['Antiderivative (10/3)x^{3/2}', 1], ['70/3 sq units', 1]], d: 2, c: 'understanding', t: T, time: 120 }),
  (C) => { C.assert(close(simpson((x) => 5 * sq(x), 1, 4), 70 / 3), '70/3'); C.model([r`\dfrac{70}{3}`]); });
Q('s207', mk.short({ marks: 2, stem: r`Show by integration that the ellipse $\dfrac{x^2}{100} + \dfrac{y^2}{49} = 1$ encloses an area of $70\pi$ square units.`, model: r`Upper half: $y = \dfrac{7}{10}\sqrt{100 - x^2}$. By symmetry, area $= 4 \cdot \dfrac{7}{10}\displaystyle\int_0^{10} \sqrt{100 - x^2}\,dx = \dfrac{14}{5} \cdot \dfrac{100\pi}{4} = 70\pi$ sq units.`, sol: 'Four times the first-quadrant area.', scheme: [['y in terms of x and the factor 4', 1], ['70π', 1]], d: 3, c: 'application', t: T, time: 150 }),
  (C) => { C.assert(close(4 * simpson(ell(10, 7), 0, 10), 70 * P), '70π'); C.model([r`70\pi`]); });
Q('s208', mk.short({ marks: 2, stem: r`Ritu wrote: "Area bounded by $y = 3x - 6$, the $x$-axis, $x = 0$ and $x = 4$ is $\displaystyle\int_0^4 (3x - 6)\,dx = 0$." Explain her error and find the correct area.`, model: r`The line crosses the axis at $x = 2$; on $(0, 2)$ it is below the axis, so that part enters her integral with a minus sign and cancels the other part. Correct area $= \left|\displaystyle\int_0^2 (3x - 6)\,dx\right| + \displaystyle\int_2^4 (3x - 6)\,dx = 6 + 6 = 12$ sq units.`, sol: 'Signed integral versus area.', scheme: [['Error identified (part below the axis cancels)', 1], ['12 sq units', 1]], d: 3, c: 'evaluation', t: T, time: 150 }),
  (C) => { C.assert(close(simpson((x) => 3 * x - 6, 0, 4), 0) && close(areaAbs((x) => 3 * x - 6, 0, 4), 12), '0 vs 12'); C.model([2, 6, 12]); });

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Find the area of the region enclosed by the parabola $y^2 = 12x$ and the line $x = 3$.`, model: r`The region is symmetric about the $x$-axis; the upper branch is $y = \sqrt{12x} = 2\sqrt{3}\sqrt{x}$.

Area $= 2\displaystyle\int_0^3 2\sqrt{3}\,x^{1/2}\,dx = 4\sqrt{3} \cdot \dfrac23\left[x^{3/2}\right]_0^3 = 4\sqrt{3} \cdot \dfrac23 \cdot 3\sqrt{3} = 24$ sq units.`, sol: 'Double the area of the upper half.', scheme: [['Sketch and symmetry (factor 2)', 1], ['Integral set up with limits 0 to 3', 1], ['24 sq units', 1]], d: 3, c: 'understanding', t: T, time: 180 }),
  (C) => { C.assert(close(2 * simpson((x) => sq(12 * x), 0, 3), 24), '24'); C.model([24]); });
Q('s302', mk.short({ marks: 3, stem: r`Find the area of the region above the $x$-axis bounded by the circle $x^2 + y^2 = 4$ and the lines $x = 0$ and $x = 1$.`, model: r`Area $= \displaystyle\int_0^1 \sqrt{4 - x^2}\,dx = \left[\dfrac x2\sqrt{4 - x^2} + 2\sin^{-1}\dfrac x2\right]_0^1$

$= \dfrac12\sqrt{3} + 2 \cdot \dfrac{\pi}{6} - 0 = \dfrac{\sqrt{3}}{2} + \dfrac{\pi}{3} \approx 1.91$ sq units.`, sol: 'Use the standard integral of the square root of 4 minus x squared.', scheme: [['Integral set up', 1], ['Standard antiderivative', 1], ['√3/2 + π/3', 1]], d: 3, c: 'application', t: T, time: 180 }),
  (C) => { const v = simpson(circ(2), 0, 1); C.assert(close(v, S3 / 2 + P / 3), 'exact'); C.model([round2(v)]); });
Q('s303', mk.short({ marks: 3, stem: r`Find the area of the region in the first quadrant bounded by the ellipse $\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$, the $x$-axis, the $y$-axis and the line $x = 3$.`, model: r`Upper half: $y = \dfrac45\sqrt{25 - x^2}$. Area $= \dfrac45\displaystyle\int_0^3 \sqrt{25 - x^2}\,dx = \dfrac45\left[\dfrac x2\sqrt{25 - x^2} + \dfrac{25}{2}\sin^{-1}\dfrac x5\right]_0^3$

$= \dfrac45\left(\dfrac32 \times 4 + \dfrac{25}{2}\sin^{-1}\dfrac35\right) = \dfrac{24}{5} + 10\sin^{-1}\dfrac35 \approx 11.24$ sq units.`, sol: 'Write y from the ellipse, then the standard integral.', scheme: [['y = (4/5)√(25 − x²)', 1], ['Antiderivative with limits', 1], ['24/5 + 10 sin⁻¹(3/5)', 1]], d: 4, c: 'application', t: T, time: 240 }),
  (C) => { const v = simpson(ell(5, 4), 0, 3); C.assert(close(v, 24 / 5 + 10 * Math.asin(0.6)), 'exact'); C.model([round2(v), r`\dfrac{24}{5}`]); });
Q('s304', mk.short({ marks: 3, stem: r`Find the area of the region in the first quadrant bounded by the parabola $x^2 = 16y$, the $y$-axis and the lines $y = 1$ and $y = 4$.`, model: r`In the first quadrant, $x = 4\sqrt{y}$. Take horizontal strips between $y = 1$ and $y = 4$:

Area $= \displaystyle\int_1^4 4\sqrt{y}\,dy = \dfrac83\left[y^{3/2}\right]_1^4 = \dfrac83(8 - 1) = \dfrac{56}{3}$ sq units.`, sol: 'Area against the y-axis.', scheme: [['x = 4√y', 1], ['Integral from 1 to 4', 1], ['56/3 sq units', 1]], d: 3, c: 'understanding', t: T, time: 180 }),
  (C) => { C.assert(close(simpson((y) => 4 * sq(y), 1, 4), 56 / 3), '56/3'); C.model([r`\dfrac{56}{3}`]); });
Q('s305', mk.short({ marks: 3, stem: r`Sketch $y = |x + 1|$ for $-3 \le x \le 3$ and use integration to find the area between the graph and the $x$-axis over this interval.`, model: r`The graph is a V with its corner at $(-1, 0)$.

Area $= \displaystyle\int_{-3}^{-1} -(x + 1)\,dx + \int_{-1}^{3} (x + 1)\,dx = 2 + 8 = 10$ sq units.`, sol: 'Split at the corner of the V.', scheme: [['Sketch with the corner at (−1, 0)', 1], ['Both integrals', 1], ['10 sq units', 1]], d: 3, c: 'application', t: T, time: 180 }),
  (C) => { C.assert(close(simpson((x) => Math.abs(x + 1), -3, 3, 200000), 10), '10'); C.model([2, 8, 10]); });
Q('s306', mk.short({ marks: 3, stem: r`Prove, by integration, that the region enclosed by $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ ($a, b > 0$) has area $\pi ab$.`, model: r`Upper half: $y = \dfrac ba\sqrt{a^2 - x^2}$. The region is symmetric about both axes, so

Area $= 4\displaystyle\int_0^a \dfrac ba\sqrt{a^2 - x^2}\,dx = \dfrac{4b}{a}\left[\dfrac x2\sqrt{a^2 - x^2} + \dfrac{a^2}{2}\sin^{-1}\dfrac xa\right]_0^a$

$= \dfrac{4b}{a} \cdot \dfrac{a^2}{2} \cdot \dfrac{\pi}{2} = \pi ab$.`, sol: 'Symmetry, then the standard integral.', scheme: [['y and the symmetry factor 4', 1], ['Antiderivative', 1], ['Limits give πab', 1]], d: 4, c: 'analysis', t: T, time: 240 }),
  (C) => { for (const [a, b] of [[3, 2], [7, 5], [1.5, 4]]) C.assert(close(4 * simpson(ell(a, b), 0, a), P * a * b), `πab for a = ${a}, b = ${b}`); C.model([r`\pi ab`]); });
Q('s307', mk.short({ marks: 3, stem: r`For $a > 0$, the area bounded by $y = x^2$, the $x$-axis and the lines $x = 0$ and $x = a$ is $9$ square units. Find $a$, and then the area for twice this value of $a$.`, model: r`Area $= \displaystyle\int_0^a x^2\,dx = \dfrac{a^3}{3} = 9$, so $a^3 = 27$ and $a = 3$.

For $x = 0$ to $x = 6$: area $= \dfrac{6^3}{3} = 72$ sq units, which is $8$ times as much, not twice.`, sol: 'Set the integral equal to 9.', scheme: [['a³/3 = 9', 1], ['a = 3', 1], ['72 sq units', 1]], d: 3, c: 'application', t: T, time: 180 }),
  (C) => { C.assert(close(simpson((x) => x * x, 0, 3), 9) && close(simpson((x) => x * x, 0, 6), 72), 'a = 3, 72'); C.model([3, 72]); });

// =============================================================== long answer, 5 marks
Q('l01', mk.long({ stem: r`Using integration, find the area of the smaller region cut off from the circle $x^2 + y^2 = 36$ by the line $x = 3$.`, model: r`The smaller region lies to the right of $x = 3$ and is symmetric about the $x$-axis. Upper boundary: $y = \sqrt{36 - x^2}$.

Area $= 2\displaystyle\int_3^6 \sqrt{36 - x^2}\,dx = 2\left[\dfrac x2\sqrt{36 - x^2} + 18\sin^{-1}\dfrac x6\right]_3^6$

At $x = 6$: $0 + 18 \cdot \dfrac{\pi}{2} = 9\pi$. At $x = 3$: $\dfrac32\sqrt{27} + 18 \cdot \dfrac{\pi}{6} = \dfrac{9\sqrt{3}}{2} + 3\pi$.

Area $= 2\left(6\pi - \dfrac{9\sqrt{3}}{2}\right) = 12\pi - 9\sqrt{3} \approx 22.11$ sq units.`, sol: 'Twice the area above the axis between x = 3 and x = 6.', scheme: [['Sketch, region identified, symmetry', 1], ['Integral with limits 3 to 6', 1], ['Standard antiderivative', 1], ['Values at both limits', 1], ['12π − 9√3', 1]], d: 4, c: 'application', t: T, time: 420 }),
  (C) => { const v = 2 * simpson(circ(6), 3, 6); C.assert(close(v, 12 * P - 9 * S3), 'exact'); C.model([round2(v), r`12\pi - 9\sqrt{3}`]); });
Q('l02', mk.long({ stem: r`Find the area of the region in the first quadrant bounded by the ellipse $\dfrac{x^2}{36} + \dfrac{y^2}{16} = 1$, the coordinate axes and the line $x = 3$. Also find what fraction of the ellipse's first-quadrant area this is, to two decimal places.`, model: r`Upper half: $y = \dfrac23\sqrt{36 - x^2}$.

Area $= \dfrac23\displaystyle\int_0^3 \sqrt{36 - x^2}\,dx = \dfrac23\left[\dfrac x2\sqrt{36 - x^2} + 18\sin^{-1}\dfrac x6\right]_0^3 = \dfrac23\left(\dfrac{9\sqrt{3}}{2} + 3\pi\right) = 3\sqrt{3} + 2\pi \approx 11.48$ sq units.

First-quadrant area of the ellipse $= \dfrac{\pi \times 6 \times 4}{4} = 6\pi \approx 18.85$. Fraction $\approx \dfrac{11.48}{18.85} \approx 0.61$.`, sol: 'Standard integral from 0 to 3, then compare with πab/4.', scheme: [['y in terms of x', 1], ['Integral with limits', 1], ['Antiderivative evaluated', 1], ['3√3 + 2π', 1], ['Fraction 0.61', 1]], d: 4, c: 'application', t: T, time: 420 }),
  (C) => { const v = simpson(ell(6, 4), 0, 3), q = simpson(ell(6, 4), 0, 6); C.assert(close(v, 3 * S3 + 2 * P) && close(q, 6 * P), 'exact'); C.model([round2(v), round2(q), round2(v / q)]); });
Q('l03', mk.long({ stem: r`(a) Find the area of the region enclosed by the parabola $y^2 = 6x$ and the line $x = 6$.
(b) A vertical line $x = c$ divides this region into two parts of equal area. Find $c$.`, model: r`(a) Upper branch $y = \sqrt{6}\sqrt{x}$. Area $= 2\displaystyle\int_0^6 \sqrt{6}\,x^{1/2}\,dx = 2\sqrt{6} \cdot \dfrac23 \cdot 6^{3/2} = \dfrac43 \cdot 36 = 48$ sq units.

(b) The part with $0 \le x \le c$ has area $2\displaystyle\int_0^c \sqrt{6}\,x^{1/2}\,dx = \dfrac{4\sqrt{6}}{3}c^{3/2}$. Setting this equal to $24$: $c^{3/2} = \dfrac{18}{\sqrt{6}} = 3\sqrt{6}$, so $c^3 = 54$ and $c = \sqrt[3]{54} = 3\sqrt[3]{2} \approx 3.78$.`, sol: 'Area as a function of the cut position, then solve.', scheme: [['Symmetry and integral for (a)', 1], ['48 sq units', 1], ['Area up to x = c as a function of c', 1], ['Equation c^{3/2} = 3√6', 1], ['c = ∛54 ≈ 3.78', 1]], d: 5, c: 'analysis', t: T, time: 480 }),
  (C) => { const A = (c) => 2 * simpson((x) => sq(6 * x), 0, c); const c = Math.cbrt(54); C.assert(close(A(6), 48) && close(A(c), 24) && close(c, 3 * Math.cbrt(2)), '48 and c = ∛54'); C.model([48, 24, round2(c)]); });
Q('l04', mk.long({ stem: r`Find the area of the region in the first quadrant bounded by the parabola $x^2 = 2y$, the $y$-axis and the line $y = 8$
(a) using horizontal strips, and
(b) using vertical strips, as a rectangle minus the area under the curve. Show that the answers agree.`, model: r`The parabola meets $y = 8$ where $x^2 = 16$, i.e. at $(4, 8)$.

(a) $x = \sqrt{2y}$: area $= \displaystyle\int_0^8 \sqrt{2}\,y^{1/2}\,dy = \sqrt{2} \cdot \dfrac23 \cdot 8^{3/2} = \sqrt{2} \cdot \dfrac23 \cdot 16\sqrt{2} = \dfrac{64}{3}$ sq units.

(b) Rectangle $0 \le x \le 4$, $0 \le y \le 8$ has area $32$. Area under the curve: $\displaystyle\int_0^4 \dfrac{x^2}{2}\,dx = \dfrac{64}{6} = \dfrac{32}{3}$. Required area $= 32 - \dfrac{32}{3} = \dfrac{64}{3}$ sq units. The two methods agree.`, sol: 'Two slicings of the same region.', scheme: [['Corner point (4, 8)', 1], ['Horizontal-strip integral', 1], ['64/3 by (a)', 1], ['Rectangle 32 and area under curve 32/3', 1], ['64/3 by (b), agreement stated', 1]], d: 4, c: 'analysis', t: T, time: 420 }),
  (C) => { const a = simpson((y) => sq(2 * y), 0, 8), b = 32 - simpson((x) => (x * x) / 2, 0, 4); C.assert(close(a, 64 / 3) && close(b, 64 / 3), '64/3 both ways'); C.model([4, 8, 32, r`\dfrac{64}{3}`, r`\dfrac{32}{3}`]); });
Q('l05', mk.long({ stem: r`Using integration, find the area enclosed by the curve $9x^2 + 25y^2 = 225$. Hence write the area of its part in the second quadrant.`, model: r`Divide by $225$: $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$, an ellipse with $a = 5$, $b = 3$, symmetric about both axes.

Upper half: $y = \dfrac35\sqrt{25 - x^2}$. Area $= 4 \cdot \dfrac35\displaystyle\int_0^5 \sqrt{25 - x^2}\,dx = \dfrac{12}{5}\left[\dfrac x2\sqrt{25 - x^2} + \dfrac{25}{2}\sin^{-1}\dfrac x5\right]_0^5$

$= \dfrac{12}{5} \cdot \dfrac{25}{2} \cdot \dfrac{\pi}{2} = 15\pi$ sq units.

By symmetry, the second-quadrant part is $\dfrac{15\pi}{4}$ sq units.`, sol: 'Standard form first, then four times the first-quadrant integral.', scheme: [['Standard form, a = 5, b = 3', 1], ['y in terms of x, factor 4', 1], ['Antiderivative', 1], ['15π', 1], ['15π/4 for one quadrant', 1]], d: 3, c: 'application', t: T, time: 360 }),
  (C) => { const v = 4 * simpson(ell(5, 3), 0, 5); C.assert(close(v, 15 * P) && close(simpson(ell(5, 3), -5, 0), (15 * P) / 4), '15π'); C.model([r`15\pi`, r`\dfrac{15\pi}{4}`]); });
Q('l06', mk.long({ stem: r`Find the area of the part of the region enclosed by $\dfrac{x^2}{16} + \dfrac{y^2}{4} = 1$ that lies to the right of the line $x = 2$.`, model: r`Upper half: $y = \dfrac12\sqrt{16 - x^2}$; the region is symmetric about the $x$-axis.

Area $= 2 \cdot \dfrac12\displaystyle\int_2^4 \sqrt{16 - x^2}\,dx = \left[\dfrac x2\sqrt{16 - x^2} + 8\sin^{-1}\dfrac x4\right]_2^4$

$= \left(0 + 8 \cdot \dfrac{\pi}{2}\right) - \left(\sqrt{12} + 8 \cdot \dfrac{\pi}{6}\right) = 4\pi - 2\sqrt{3} - \dfrac{4\pi}{3} = \dfrac{8\pi}{3} - 2\sqrt{3} \approx 4.91$ sq units.`, sol: 'Symmetry about the x-axis, then the standard integral from 2 to 4.', scheme: [['Sketch, region and symmetry', 1], ['Integral with limits 2 to 4', 1], ['Antiderivative', 1], ['Values at the limits', 1], ['8π/3 − 2√3', 1]], d: 4, c: 'application', t: T, time: 420 }),
  (C) => { const v = 2 * simpson(ell(4, 2), 2, 4); C.assert(close(v, (8 * P) / 3 - 2 * S3), 'exact'); C.model([round2(v), r`\dfrac{8\pi}{3} - 2\sqrt{3}`]); });

// =============================================================== case-based
caseQ('c01', {
  passage: r`The horticulture department in Mysuru is laying out an elliptical lawn in front of a heritage building. With the centre of the lawn as origin and distances in metres, its boundary is $\dfrac{x^2}{400} + \dfrac{y^2}{225} = 1$. A circular fountain bed of radius $5$ m is placed at the centre and will not be turfed.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $y = \dfrac34\sqrt{400 - x^2}$. (b) $300$, i.e. $300\pi$ m$^2$. (c) (i) $75\pi$ m$^2$ in each quadrant. Or (ii) $275\pi \approx 863.94$ m$^2$ to be turfed.`,
  sol: r`(a) Solve for $y \ge 0$. (b) $\pi ab$ with $a = 20$, $b = 15$. (c) (i) $\dfrac34\displaystyle\int_0^{20}\sqrt{400 - x^2}\,dx = \dfrac34 \cdot 100\pi$. (ii) $300\pi - 25\pi$.`,
  children: [
    child('a', mk.mcq({ stem: 'The upper half of the lawn boundary is the graph of', opts: [r`$y = \dfrac34\sqrt{400 - x^2}$`, r`$y = \dfrac43\sqrt{400 - x^2}$`, r`$y = \dfrac34\sqrt{225 - x^2}$`, r`$y = \sqrt{400 - x^2}$`], key: 'a', sol: r`$y^2 = 225\left(1 - \dfrac{x^2}{400}\right) = \dfrac{225}{400}(400 - x^2)$, so $y = \dfrac{15}{20}\sqrt{400 - x^2}$.`, d: 1, c: 'understanding', t: T, time: 60 })),
    child('b', mk.num({ stem: 'The area of the whole lawn (including the fountain bed) is kπ square metres. Find k.', value: 300, sol: r`$a = 20$, $b = 15$: area $\pi ab = 300\pi$, so $k = 20 \times 15 = 300$.`, scheme: [['300', 1]], d: 2, c: 'understanding', t: T, time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Using integration, find the area of the part of the lawn in the first quadrant.', model: r`Area $= \dfrac34\displaystyle\int_0^{20}\sqrt{400 - x^2}\,dx = \dfrac34\left[\dfrac x2\sqrt{400 - x^2} + 200\sin^{-1}\dfrac{x}{20}\right]_0^{20} = \dfrac34 \cdot 100\pi = 75\pi$ m$^2$.`, sol: 'Quarter of the ellipse by the standard integral.', scheme: [['Integral set up', 1], ['75π m²', 1]], d: 3, c: 'application', t: T, time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the area to be turfed, in terms of π and correct to two decimal places (use π = 3.14159).', model: r`Turfed area $=$ lawn $-$ fountain $= 300\pi - \pi(5)^2 = 275\pi \approx 863.94$ m$^2$.`, sol: 'Subtract the circle from the ellipse.', scheme: [['300π − 25π', 1], ['275π ≈ 863.94 m²', 1]], d: 3, c: 'application', t: T, time: 150 }),
    ]),
  ],
}, (C) => { const E = ell(20, 15); C.child('a').assert(close(E(12), 0.75 * Math.sqrt(400 - 144)), 'upper half'); C.child('a').key('a'); C.child('b').val((4 * simpson(E, 0, 20)) / P, 1e-4); C.child('c').model([r`75\pi`]); C.child('c').assert(close(simpson(E, 0, 20), 75 * P), '75π'); const turf = 4 * simpson(E, 0, 20) - 4 * simpson(circ(5), 0, 5); C.child('cii').assert(close(turf, 275 * P), '275π'); C.child('cii').model([round2(275 * 3.14159)]); });

caseQ('c02', {
  passage: r`A gateway arch at a Jaipur exhibition ground is parabolic. Taking the top of the arch as the origin, the $y$-axis vertically up and distances in metres, the arch is $x^2 = -9y$ and the ground is the line $y = -4$. The opening under the arch is to be fitted with a decorative wooden door.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $12$ m. (b) $32$ m$^2$. (c) (i) Above the bar: $4$ m$^2$; below it: $28$ m$^2$. Or (ii) ₹$48000$.`,
  sol: r`(a) $x^2 = 36$ at $y = -4$. (b) $2\displaystyle\int_{-4}^0 3\sqrt{-y}\,dy = 32$. (c) (i) $2\displaystyle\int_{-1}^0 3\sqrt{-y}\,dy = 4$. (ii) $32 \times 1500$.`,
  children: [
    child('a', mk.mcq({ stem: 'How wide is the arch at ground level?', opts: ['$12$ m', '$6$ m', '$36$ m', '$4$ m'], key: 'a', sol: r`At $y = -4$: $x^2 = 36$, so $x = \pm 6$ and the width is $12$ m. Option (b) is half the width.`, d: 1, c: 'understanding', t: T, time: 60 })),
    child('b', mk.num({ stem: 'Using horizontal strips, find the area of the opening (in m²).', value: 32, unit: 'm²', sol: r`A strip at height $y$ has length $2\sqrt{-9y} = 6\sqrt{-y}$: area $= \displaystyle\int_{-4}^{0} 6\sqrt{-y}\,dy = 6 \cdot \dfrac23 \cdot 8 = 32$.`, scheme: [['32', 1]], d: 3, c: 'application', t: T, time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** A horizontal bar is fixed 3 m above the ground (on the line y = −1). Find the area of the opening above the bar and below it.', model: r`Above the bar: $\displaystyle\int_{-1}^{0} 6\sqrt{-y}\,dy = 6 \cdot \dfrac23 = 4$ m$^2$. Below the bar: $32 - 4 = 28$ m$^2$.`, sol: 'Same strips with new limits.', scheme: [['4 m² above', 1], ['28 m² below', 1]], d: 3, c: 'application', t: T, time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Wood for the door costs ₹1500 per m². Find the cost of a door that fills the whole opening.', model: r`Area of the opening $= \displaystyle\int_{-4}^{0} 6\sqrt{-y}\,dy = 32$ m$^2$. Cost $= 32 \times 1500 = $ ₹$48000$.`, sol: 'Area times rate.', scheme: [['Area 32 m²', 1], ['₹48000', 1]], d: 2, c: 'application', t: T, time: 120 }),
    ]),
  ],
}, (C) => { const w = (y) => 2 * sq(-9 * y); C.child('a').which([12, 6, 36, 4], w(-4)); const A = simpson((t) => w(-t), 0, 4); C.child('b').val(A, 1e-5); C.child('b').assert(close(A, (2 / 3) * 12 * 4), 'two thirds of base times height'); const top = simpson((t) => w(-t), 0, 1); C.child('c').model([round2(top), round2(A - top)]); C.child('cii').model([Math.round(A * 1500)]); });

caseQ('c03', {
  passage: r`For Durga Puja, a Kolkata pandal builds a semicircular stage. With the centre of the straight front edge as origin and distances in metres, the curved back edge is $x^2 + y^2 = 64$ with $y \ge 0$, and the front edge lies along the $x$-axis.`,
  d: 3, c: 'application',
  model: r`(a) Option (a). (b) $32$, i.e. $32\pi$ m$^2$. (c) (i) $16\sqrt{3} + \dfrac{32\pi}{3} \approx 61.22$ m$^2$. Or (ii) $\dfrac{32\pi}{3} - 8\sqrt{3} \approx 19.65$ m$^2$.`,
  sol: r`(a) Symmetric about the $y$-axis. (b) Half of $\pi(8)^2$. (c) (i) $2\displaystyle\int_0^4 \sqrt{64 - x^2}\,dx$. (ii) $\displaystyle\int_4^8 \sqrt{64 - x^2}\,dx$.`,
  children: [
    child('a', mk.mcq({ stem: 'The area of the stage is given by', opts: [r`$2\displaystyle\int_0^8 \sqrt{64 - x^2}\,dx$`, r`$\displaystyle\int_0^8 \sqrt{64 - x^2}\,dx$`, r`$4\displaystyle\int_0^8 \sqrt{64 - x^2}\,dx$`, r`$2\displaystyle\int_0^8 (64 - x^2)\,dx$`], key: 'a', sol: 'The semicircle is two first-quadrant quarters. Option (c) is the full circle.', d: 2, c: 'understanding', t: T, time: 60 })),
    child('b', mk.num({ stem: 'The area of the stage is kπ m². Find k.', value: 32, sol: r`Half of $\pi(8)^2$ is $32\pi$, so $k = \dfrac{64}{2} = 32$.`, scheme: [['32', 1]], d: 2, c: 'understanding', t: T, time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** The central performance strip is the part of the stage with −4 ≤ x ≤ 4. Find its area.', model: r`Area $= 2\displaystyle\int_0^4 \sqrt{64 - x^2}\,dx = 2\left[\dfrac x2\sqrt{64 - x^2} + 32\sin^{-1}\dfrac x8\right]_0^4 = 2\left(8\sqrt{3} + \dfrac{16\pi}{3}\right) = 16\sqrt{3} + \dfrac{32\pi}{3} \approx 61.22$ m$^2$.`, sol: 'Symmetric strip: twice the integral from 0 to 4.', scheme: [['Integral with limits', 1], ['16√3 + 32π/3 ≈ 61.22 m²', 1]], d: 3, c: 'application', t: T, time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** The musicians sit on the part of the stage to the right of the line x = 4. Find the area of their part.', model: r`Area $= \displaystyle\int_4^8 \sqrt{64 - x^2}\,dx = \left[\dfrac x2\sqrt{64 - x^2} + 32\sin^{-1}\dfrac x8\right]_4^8 = 16\pi - 8\sqrt{3} - \dfrac{16\pi}{3} = \dfrac{32\pi}{3} - 8\sqrt{3} \approx 19.65$ m$^2$.`, sol: 'Standard integral from 4 to 8.', scheme: [['Integral with limits', 1], ['32π/3 − 8√3 ≈ 19.65 m²', 1]], d: 3, c: 'application', t: T, time: 150 }),
    ]),
  ],
}, (C) => { const g = circ(8); const half = 2 * simpson(g, 0, 8); C.child('a').which([half, simpson(g, 0, 8), 2 * half, 2 * simpson((x) => 64 - x * x, 0, 8)].map((v) => close(v, 32 * P)), true); C.child('b').val(half / P, 1e-4); const mid = 2 * simpson(g, 0, 4), side = simpson(g, 4, 8); C.child('c').assert(close(mid, 16 * S3 + (32 * P) / 3), 'mid exact'); C.child('c').model([round2(mid)]); C.child('cii').assert(close(side, (32 * P) / 3 - 8 * S3), 'side exact'); C.child('cii').model([round2(side)]); });

caseQ('c04', {
  passage: r`A farmer near Ludhiana owns a field between a straight road and an irrigation canal. With one corner of the field as origin and distances in units of $10$ m, the road runs along the $x$-axis, the canal bank follows the curve $y^2 = 9x$ ($y \ge 0$), and a fence runs along the line $x = 16$. The field is the region under the canal bank, above the road, up to the fence.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $3\sqrt{x}$. (b) $128$ square units. (c) (i) $c = 32^{2/3} \approx 10.08$. Or (ii) $38$ square units.`,
  sol: r`(a) $y = \sqrt{9x}$. (b) $\displaystyle\int_0^{16} 3\sqrt{x}\,dx = 2x^{3/2}\Big|_0^{16} = 128$. (c) (i) $2c^{3/2} = 64$. (ii) $2\left(9^{3/2} - 4^{3/2}\right) = 38$.`,
  children: [
    child('a', mk.mcq({ stem: 'The height of the field above the road at a distance x from the corner is', opts: [r`$3\sqrt{x}$`, r`$9\sqrt{x}$`, r`$\sqrt{3x}$`, r`$\dfrac{x^2}{9}$`], key: 'a', sol: r`$y^2 = 9x$ with $y \ge 0$ gives $y = 3\sqrt{x}$.`, d: 1, c: 'understanding', t: T, time: 45 })),
    child('b', mk.num({ stem: 'Find the area of the field in square units.', value: 128, sol: r`$\displaystyle\int_0^{16} 3x^{1/2}\,dx = 2\left[x^{3/2}\right]_0^{16} = 2 \times 64 = 128$.`, scheme: [['128', 1]], d: 2, c: 'understanding', t: T, time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** The farmer wants a second fence x = c that splits the field into two parts of equal area. Find c, correct to two decimal places.', model: r`Area from $0$ to $c$: $\displaystyle\int_0^c 3x^{1/2}\,dx = 2c^{3/2} = 64$, so $c^{3/2} = 32$ and $c = 32^{2/3} \approx 10.08$.`, sol: 'Area up to c equals half of 128.', scheme: [['2c^{3/2} = 64', 1], ['c ≈ 10.08', 1]], d: 4, c: 'analysis', t: T, time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the area of the part of the field between x = 4 and x = 9.', model: r`$\displaystyle\int_4^9 3x^{1/2}\,dx = 2\left[x^{3/2}\right]_4^9 = 2(27 - 8) = 38$ square units.`, sol: 'Same integral with new limits.', scheme: [['Integral with limits 4 to 9', 1], ['38', 1]], d: 2, c: 'application', t: T, time: 120 }),
    ]),
  ],
}, (C) => { const g = (x) => sq(9 * x); C.child('a').assert(close(g(5), 3 * Math.sqrt(5)), '3√x'); C.child('a').key('a'); const A = simpson(g, 0, 16); C.child('b').val(A, 1e-5); const c = 32 ** (2 / 3); C.child('c').assert(close(simpson(g, 0, c), A / 2), 'halves'); C.child('c').model([round2(c)]); C.child('cii').model([simpson(g, 4, 9) > 37.9999 && simpson(g, 4, 9) < 38.0001 ? 38 : -1]); });

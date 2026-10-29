// CBSE 12 Mathematics ch06 Application of Derivatives — practice bank with independent re-solve
// checks: every rate is a numeric derivative of the stated relation along a parametrised motion,
// every interval comes from sampling the sign of f′, every extremum from a dense numeric search.
// Tangents and normals and approximations (deleted for 2026-27) appear nowhere.
import { Q, caseQ, child, mk, r } from '../../cbse-12-mathematics-ch01/src/lib.mjs';
import { D, D2, close, mono, turning, extremum } from './calc.mjs';

const P = Math.PI;
const S3 = Math.sqrt(3);
const near = (a, b, tol = 1e-4) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
/** Rate of q along a motion: q(t) given as a function of time, differentiated at t = 0. */
const rate = (q) => D(q, 0, 1e-6);
const R6 = (v) => (typeof v === 'number' ? Math.round(v * 1e6) / 1e6 : v);
/** which() on values rounded to 6 decimals, so numeric derivatives compare cleanly. */
const W = (C, vals, target) => C.which(vals.map(R6), R6(target));

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The rate of change of the area $A$ of a circle with respect to its radius $r$ is`, opts: [r`$2\pi r$`, r`$\pi r^2$`, r`$2r$`, r`$\pi r$`], key: 'a', sol: r`$A = \pi r^2$, so $\dfrac{dA}{dr} = 2\pi r$, which is the circumference. Option (b) is the area itself.`, d: 1, c: 'recall', t: [1], time: 30 }),
  (C) => { const r0 = 3; W(C, [2 * P * r0, P * r0 * r0, 2 * r0, P * r0], D((x) => P * x * x, r0)); });
Q('m02', mk.mcq({ stem: r`The radius of a circular ink blot grows at $0.5$ cm/s. When the radius is $4$ cm, its area grows at`, opts: [r`$4\pi$ cm$^2$/s`, r`$2\pi$ cm$^2$/s`, r`$8\pi$ cm$^2$/s`, r`$16\pi$ cm$^2$/s`], key: 'a', sol: r`$\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt} = 2\pi(4)(0.5) = 4\pi$ cm$^2$/s. Option (c) forgets the factor $0.5$.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C) => W(C, [4 * P, 2 * P, 8 * P, 16 * P], rate((t) => P * (4 + 0.5 * t) ** 2)));
Q('m03', mk.mcq({ stem: r`The volume of a cube increases at $9$ cm$^3$/s. How fast is its edge increasing when the edge is $3$ cm long?`, opts: [r`$\dfrac13$ cm/s`, '$1$ cm/s', '$3$ cm/s', r`$\dfrac19$ cm/s`], key: 'a', sol: r`$V = x^3$, so $\dfrac{dV}{dt} = 3x^2\dfrac{dx}{dt}$: $9 = 27\dfrac{dx}{dt}$, giving $\dfrac{dx}{dt} = \dfrac13$ cm/s.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C) => { const v = 1 / 3; C.assert(near(rate((t) => (3 + v * t) ** 3), 9), 'dV/dt = 9 with dx/dt = 1/3'); C.which([1 / 3, 1, 3, 1 / 9], v); });
Q('m04', mk.mcq({ stem: r`The total cost (in ₹) of making $x$ pressure cookers in a day is $C(x) = 0.5x^2 + 20x + 300$. The marginal cost when $x = 40$ is`, opts: ['₹$60$', '₹$1900$', '₹$40$', '₹$20$'], key: 'a', sol: r`Marginal cost $= C'(x) = x + 20$, so $C'(40) = 60$. Option (b), ₹$1900$, is the total cost $C(40)$, not the marginal cost.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C) => { const c = (x) => 0.5 * x * x + 20 * x + 300; C.which([60, 1900, 40, 20], Math.round(D(c, 40))); C.assert(c(40) === 1900, 'C(40) = 1900'); });
Q('m05', mk.mcq({ stem: r`The radius of a spherical balloon increases at $0.2$ cm/s. When the radius is $5$ cm, its volume increases at`, opts: [r`$20\pi$ cm$^3$/s`, r`$100\pi$ cm$^3$/s`, r`$4\pi$ cm$^3$/s`, r`$\dfrac{100\pi}{3}$ cm$^3$/s`], key: 'a', sol: r`$V = \dfrac43\pi r^3 \Rightarrow \dfrac{dV}{dt} = 4\pi r^2\dfrac{dr}{dt} = 4\pi(25)(0.2) = 20\pi$ cm$^3$/s.`, d: 2, c: 'application', t: [1], time: 75 }),
  (C) => W(C, [20 * P, 100 * P, 4 * P, (100 * P) / 3], rate((t) => (4 / 3) * P * (5 + 0.2 * t) ** 3)));
Q('m06', mk.mcq({ stem: r`A function $f$ is differentiable on $(a, b)$. Which condition guarantees that $f$ is strictly increasing on $(a, b)$?`, opts: [r`$f'(x) > 0$ for every $x$ in $(a, b)$`, r`$f'(x) < 0$ for every $x$ in $(a, b)$`, r`$f(x) > 0$ for every $x$ in $(a, b)$`, r`$f''(x) > 0$ for every $x$ in $(a, b)$`], key: 'a', sol: r`A positive derivative throughout the interval guarantees strict increase. A positive value of $f$ (option (c)) says nothing about direction; $f'' > 0$ only says the slope is growing.`, d: 1, c: 'recall', t: [2], time: 30 }),
  (C) => { C.assert(mono((x) => -1 / x, 0.5, 4) === 1 && mono((x) => x * x, -3, -1) === -1, 'counter-examples for (c) and (d)'); C.key('a'); });
Q('m07', mk.mcq({ stem: r`The function $f(x) = x^3 - 3x^2 - 24x + 5$ is strictly decreasing on`, opts: [r`$(-2, 4)$`, r`$(-\infty, -2)$`, r`$(4, \infty)$`, r`$(-4, 2)$`], key: 'a', sol: r`$f'(x) = 3x^2 - 6x - 24 = 3(x + 2)(x - 4)$, which is negative between the roots, so $f$ is strictly decreasing on $(-2, 4)$. Options (b) and (c) are where $f' > 0$.`, d: 2, c: 'understanding', t: [2], time: 75 }),
  (C) => { const g = (x) => x ** 3 - 3 * x * x - 24 * x + 5; C.which([mono(g, -2, 4), mono(g, -20, -2), mono(g, 4, 20), mono(g, -4, 2)], -1); });
Q('m08', mk.mcq({ stem: r`On $\mathbb{R}$, the function $f(x) = e^{2x}$ is`, opts: ['strictly increasing', 'strictly decreasing', 'increasing on one part and decreasing on another', 'constant'], key: 'a', sol: r`$f'(x) = 2e^{2x} > 0$ for every real $x$, so $f$ is strictly increasing on $\mathbb{R}$.`, d: 1, c: 'understanding', t: [2], time: 45 }),
  (C) => C.which(['inc', 'dec', 'mixed', 'const'], ({ 1: 'inc', '-1': 'dec', 0: 'mixed' })[mono((x) => Math.exp(2 * x), -5, 5)]));
Q('m09', mk.mcq({ stem: r`The function $f(x) = \ln x - x$ is strictly increasing on`, opts: [r`$(0, 1)$`, r`$(1, \infty)$`, r`$(0, \infty)$`, r`$(-\infty, 1)$`], key: 'a', sol: r`$f'(x) = \dfrac1x - 1 = \dfrac{1 - x}{x}$. For $x$ in the domain $(0, \infty)$ this is positive exactly when $x < 1$. Option (d) includes values where $\ln x$ is not defined.`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C) => { const g = (x) => Math.log(x) - x; C.which([mono(g, 1e-3, 1), mono(g, 1, 30), mono(g, 1e-3, 30), 'undefined'], 1); });
Q('m10', mk.mcq({ stem: r`On which set is $f(x) = x + \dfrac1x$ strictly decreasing?`, opts: [r`$(-1, 0)$ and on $(0, 1)$`, r`$(-\infty, -1)$ and on $(1, \infty)$`, r`$(-1, 1)$`, r`$(0, \infty)$`], key: 'a', sol: r`$f'(x) = 1 - \dfrac{1}{x^2} = \dfrac{x^2 - 1}{x^2} < 0$ when $0 < |x| < 1$. Option (c) is wrong because $f$ is not defined at $0$; option (b) is where $f$ increases.`, d: 3, c: 'application', t: [2], time: 90 }),
  (C) => { const g = (x) => x + 1 / x; C.which([mono(g, -1, 0) === -1 && mono(g, 0, 1) === -1, mono(g, -20, -1) === -1 && mono(g, 1, 20) === -1, false, mono(g, 0, 20) === -1], true); });
Q('m11', mk.mcq({ stem: r`At $x = c$, $f'(c) = 0$ and $f''(c) < 0$. Then $f$ has`, opts: [r`a local maximum at $c$`, r`a local minimum at $c$`, r`neither a maximum nor a minimum at $c$`, 'no conclusion possible'], key: 'a', sol: r`By the second derivative test, $f'(c) = 0$ with $f''(c) < 0$ gives a local maximum (the graph bends downwards at a flat point).`, d: 1, c: 'recall', t: [3], time: 30 }),
  (C) => { const g = (x) => 4 - (x - 1) ** 2; C.assert(near(D(g, 1), 0, 1e-6) && D2(g, 1) < 0 && turning(g, -3, 5)[0].type === 'max', 'example 4 - (x-1)^2'); C.key('a'); });
Q('m12', mk.mcq({ stem: r`The local minimum value of $f(x) = x^2 - 6x + 11$ is`, opts: ['$2$', '$3$', '$11$', '$-2$'], key: 'a', sol: r`$f'(x) = 2x - 6 = 0$ at $x = 3$ and $f''(3) = 2 > 0$, so the minimum value is $f(3) = 9 - 18 + 11 = 2$. Option (b) is the point, not the value.`, d: 2, c: 'understanding', t: [3], time: 60 }),
  (C) => C.which([2, 3, 11, -2], Math.round(extremum((x) => x * x - 6 * x + 11, -10, 10, 'min').y * 1e6) / 1e6));
Q('m13', mk.mcq({ stem: r`For $f(x) = 2x^3 - 9x^2 + 12x + 1$, the local maximum occurs at`, opts: ['$x = 1$', '$x = 2$', '$x = 6$', '$x = 5$'], key: 'a', sol: r`$f'(x) = 6(x - 1)(x - 2)$ changes from $+$ to $-$ at $x = 1$ (local maximum, value $6$) and from $-$ to $+$ at $x = 2$ (local minimum, value $5$). Options (c) and (d) are values, not points.`, d: 2, c: 'understanding', t: [3], time: 75 }),
  (C) => { const tp = turning((x) => 2 * x ** 3 - 9 * x * x + 12 * x + 1, -5, 5); C.which([1, 2, 6, 5], tp.find((p) => p.type === 'max').x); C.sol([6, 5]); });
Q('m14', mk.mcq({ stem: r`The absolute maximum value of $f(x) = x^3 - 12x$ on $[-3, 5]$ is`, opts: ['$65$', '$16$', '$9$', '$-16$'], key: 'a', sol: r`Critical points $x = \pm2$. Compare $f(-3) = 9$, $f(-2) = 16$, $f(2) = -16$, $f(5) = 65$. The largest is $65$, at the end point $x = 5$; option (b) is only the local maximum.`, d: 3, c: 'application', t: [3], time: 90 }),
  (C) => C.which([65, 16, 9, -16], Math.round(extremum((x) => x ** 3 - 12 * x, -3, 5, 'max').y)));
Q('m15', mk.mcq({ stem: 'Two positive numbers add up to $20$. The largest possible value of their product is', opts: ['$100$', '$96$', '$400$', '$200$'], key: 'a', sol: r`$P = x(20 - x)$, $P' = 20 - 2x = 0$ at $x = 10$, $P'' = -2 < 0$. Maximum $P = 10 \times 10 = 100$.`, d: 2, c: 'application', t: [3], time: 60 }),
  (C) => C.which([100, 96, 400, 200], Math.round(extremum((x) => x * (20 - x), 0, 20, 'max').y)));
Q('m16', mk.mcq({ stem: 'Among all rectangles with perimeter $36$ cm, the largest area is', opts: [r`$81$ cm$^2$`, r`$72$ cm$^2$`, r`$324$ cm$^2$`, r`$80$ cm$^2$`], key: 'a', sol: r`Sides $x$ and $18 - x$: $A = x(18 - x)$, $A' = 18 - 2x = 0$ at $x = 9$. The best rectangle is a $9$ cm square, area $81$ cm$^2$.`, d: 2, c: 'application', t: [3], time: 75 }),
  (C) => C.which([81, 72, 324, 80], Math.round(extremum((x) => x * (18 - x), 0, 18, 'max').y)));
Q('m17', mk.mcq({ stem: r`For $f(x) = x^4$ at $x = 0$, which statement is correct?`, opts: [r`$f''(0) = 0$, so the second derivative test fails; the first derivative test shows a local minimum`, r`$f''(0) > 0$, so there is a local minimum`, r`$f''(0) = 0$, so $x = 0$ cannot be a local extremum`, r`$f''(0) < 0$, so there is a local maximum`], key: 'a', sol: r`$f'(x) = 4x^3$ and $f''(x) = 12x^2$, so $f''(0) = 0$ and the test gives no conclusion. But $f'$ changes from $-$ to $+$ at $0$, so $x = 0$ is a local (indeed absolute) minimum.`, d: 3, c: 'analysis', t: [3], time: 75 }),
  (C) => { const g = (x) => x ** 4; C.assert(Math.abs(D2(g, 0)) < 1e-6 && turning(g, -2, 2).map((p) => p.type).join() === 'min', 'f″(0) = 0 and a min at 0'); C.key('a'); });
Q('m18', mk.mcq({ stem: r`For $x > 0$, the minimum value of $f(x) = x + \dfrac4x$ is`, opts: ['$4$', '$2$', '$5$', '$8$'], key: 'a', sol: r`$f'(x) = 1 - \dfrac{4}{x^2} = 0$ at $x = 2$ (the root in $x > 0$); $f''(2) = \dfrac{8}{8} = 1 > 0$. Minimum value $f(2) = 2 + 2 = 4$. Option (b) is the point.`, d: 3, c: 'application', t: [3], time: 75 }),
  (C) => C.which([4, 2, 5, 8], Math.round(extremum((x) => x + 4 / x, 0.05, 30, 'min').y * 1e6) / 1e6));
Q('m19', mk.mcq({ stem: r`A $13$ m ladder leans against a vertical wall. Its foot slides away from the wall at $0.24$ m/s. How fast is the top sliding down when the foot is $5$ m from the wall?`, opts: ['$0.1$ m/s', '$0.24$ m/s', '$0.576$ m/s', '$0.12$ m/s'], key: 'a', sol: r`$x^2 + y^2 = 169$; when $x = 5$, $y = 12$. Differentiating, $x\dfrac{dx}{dt} + y\dfrac{dy}{dt} = 0$, so $\dfrac{dy}{dt} = -\dfrac{5 \times 0.24}{12} = -0.1$ m/s. The top slides down at $0.1$ m/s.`, d: 3, c: 'application', t: [1], time: 90 }),
  (C) => C.which([0.1, 0.24, 0.576, 0.12], Math.round(-rate((t) => Math.sqrt(169 - (5 + 0.24 * t) ** 2)) * 1e6) / 1e6));

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`$f(x) = x^3$ is strictly increasing on $\mathbb{R}$.`, r: r`$f'(x) > 0$ for every real $x$.`, key: 'c', sol: r`A is true: $a < b \Rightarrow a^3 < b^3$. R is false: $f'(0) = 0$. A strictly increasing function may have $f' = 0$ at isolated points.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { const g = (x) => x ** 3; C.assert(mono(g, -5, 5) === 1 && Math.abs(D(g, 0)) < 1e-8, 'increasing with f′(0) = 0'); C.key('c'); });
Q('ar2', mk.ar({ a: r`$f(x) = x^2 - 4x$ has a local minimum at $x = 2$.`, r: r`$f'(2) = 0$ and $f''(2) > 0$.`, key: 'a', sol: r`$f'(x) = 2x - 4$ is $0$ at $x = 2$ and $f''(x) = 2 > 0$, so by the second derivative test (R) there is a local minimum at $2$. R explains A.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { const g = (x) => x * x - 4 * x; C.assert(near(D(g, 2), 0, 1e-6) && D2(g, 2) > 0 && near(turning(g, -5, 5)[0].x, 2), 'min at 2'); C.key('a'); });
Q('ar3', mk.ar({ a: 'If the radius of a circle increases at a constant rate, its area also increases at a constant rate.', r: r`$\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt}$.`, key: 'd', sol: r`R is true (chain rule). By R, $\dfrac{dA}{dt}$ depends on $r$, so with a constant $\dfrac{dr}{dt}$ the area grows faster as $r$ grows. A is false.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { const A = (t) => P * (1 + t) ** 2; C.assert(!near(D(A, 0), D(A, 1)), 'dA/dt differs at r = 1 and r = 2'); C.key('d'); });
Q('ar4', mk.ar({ a: r`The absolute maximum value of $f(x) = x^2$ on $[-1, 3]$ is $9$.`, r: r`$f'(x) = 0$ at $x = 0$.`, key: 'b', sol: r`A: compare $f(-1) = 1$, $f(0) = 0$, $f(3) = 9$; the maximum is $9$ at the end point $3$. R is true, but the critical point $x = 0$ gives the minimum, so R does not explain A.`, d: 3, c: 'analysis', t: [3] }),
  (C) => { const g = (x) => x * x; C.assert(near(extremum(g, -1, 3, 'max').y, 9) && near(D(g, 0), 0, 1e-8), 'max 9, f′(0) = 0'); C.key('b'); });
Q('ar5', mk.ar({ a: r`$f(x) = \cos x$ is strictly decreasing on $(0, \pi)$.`, r: r`$\sin x > 0$ for every $x$ in $(0, \pi)$.`, key: 'a', sol: r`$f'(x) = -\sin x$, and by R this is negative throughout $(0, \pi)$, so $f$ is strictly decreasing there. R explains A.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert(mono(Math.cos, 0, P) === -1 && mono(Math.sin, 0.0001, P / 2) === 1, 'cos decreasing on (0, π)'); C.key('a'); });
Q('ar6', mk.ar({ a: r`$f(x) = |x|$ has no local minimum at $x = 0$.`, r: r`$f(x) = |x|$ is not differentiable at $x = 0$.`, key: 'd', sol: r`R is true (corner at $0$). A is false: $f(0) = 0 \le |x|$ for every $x$, so $0$ is a local (and absolute) minimum. A point where $f'$ does not exist can still be an extremum.`, d: 3, c: 'analysis', t: [3] }),
  (C) => { const m = extremum(Math.abs, -1, 1, 'min'); C.assert(Math.abs(m.x) < 1e-6 && m.y < 1e-6, 'min at 0'); C.key('d'); });

// =============================================================== true / false
Q('tf1', mk.tf({ stem: r`True or false: if a differentiable function is strictly increasing on $\mathbb{R}$, then $f'(x) > 0$ at every point.`, key: 'f', sol: r`False. $f(x) = x^3$ is strictly increasing on $\mathbb{R}$, yet $f'(0) = 0$.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert(mono((x) => x ** 3, -3, 3) === 1 && Math.abs(D((x) => x ** 3, 0)) < 1e-8, 'counter-example'); C.key('f'); });
Q('tf2', mk.tf({ stem: 'True or false: a local maximum value of a function can be smaller than a local minimum value of the same function.', key: 't', sol: r`True. For $f(x) = x + \dfrac1x$, the local maximum value is $f(-1) = -2$ and the local minimum value is $f(1) = 2$.`, d: 3, c: 'analysis', t: [3] }),
  (C) => { const tp = [...turning((x) => x + 1 / x, -5, -0.01), ...turning((x) => x + 1 / x, 0.01, 5)]; const mx = tp.find((p) => p.type === 'max'), mn = tp.find((p) => p.type === 'min'); C.assert(near(mx.y, -2) && near(mn.y, 2) && mx.y < mn.y, 'max -2 < min 2'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`True or false: if $y = x^2$ and $x$ increases at $3$ units per second, then $y$ increases at $6$ units per second at every instant.`, key: 'f', sol: r`False. $\dfrac{dy}{dt} = 2x\dfrac{dx}{dt} = 6x$, which equals $6$ only when $x = 1$.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { C.assert(near(rate((t) => (1 + 3 * t) ** 2), 6) && near(rate((t) => (2 + 3 * t) ** 2), 12), '6x'); C.key('f'); });
Q('tf4', mk.tf({ stem: r`True or false: if $f'(c) = 0$, then $f$ has either a local maximum or a local minimum at $c$.`, key: 'f', sol: r`False. For $f(x) = x^3$, $f'(0) = 0$ but $f'$ does not change sign at $0$: no extremum there.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { C.assert(turning((x) => x ** 3, -2, 2).length === 0, 'no turning point'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`True or false: $f(x) = 7 - 3x$ is strictly decreasing on $\mathbb{R}$.`, key: 't', sol: r`True: $f'(x) = -3 < 0$ for every $x$.`, d: 1, c: 'recall', t: [2] }),
  (C) => { C.assert(mono((x) => 7 - 3 * x, -50, 50) === -1, 'decreasing'); C.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`If $V = \dfrac43\pi r^3$, then $\dfrac{dV}{dr}$ at $r = 3$ equals ____ $\pi$.`, acc: [['36']], sol: r`$\dfrac{dV}{dr} = 4\pi r^2 = 4\pi(9) = 36\pi$.`, d: 1, c: 'understanding', t: [1] }),
  (C) => C.blank(Math.round(D((r0) => (4 / 3) * P * r0 ** 3, 3) / P)));
Q('fb2', mk.fill({ stem: r`$f(x) = x^2 - 8x + 1$ is strictly increasing on the interval $(k, \infty)$, where the least such $k$ is ____.`, acc: [['4']], sol: r`$f'(x) = 2x - 8 > 0$ exactly when $x > 4$.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { const g = (x) => x * x - 8 * x + 1; C.assert(mono(g, 4, 30) === 1 && mono(g, 3.9, 30) === 0, 'k = 4'); C.blank(4); });
Q('fb3', mk.fill({ stem: r`The critical point of $f(x) = 3x^2 - 12x + 5$ is $x = $ ____.`, acc: [['2']], sol: r`$f'(x) = 6x - 12 = 0$ gives $x = 2$.`, d: 1, c: 'recall', t: [3] }),
  (C) => C.blank(Math.round(turning((x) => 3 * x * x - 12 * x + 5, -10, 10)[0].x * 1e6) / 1e6));
Q('fb4', mk.fill({ stem: r`The maximum value of $f(x) = 5 - (x - 2)^2$ is ____.`, acc: [['5']], sol: r`$(x - 2)^2 \ge 0$, so $f(x) \le 5$, with equality at $x = 2$. (Calculus: $f'(2) = 0$, $f''(2) = -2 < 0$.)`, d: 1, c: 'understanding', t: [3] }),
  (C) => C.blank(Math.round(extremum((x) => 5 - (x - 2) ** 2, -10, 10, 'max').y * 1e6) / 1e6));
Q('fb5', mk.fill({ stem: r`A stall's revenue (in ₹) from selling $x$ plates of chaat is $R(x) = 30x - 0.5x^2$. The marginal revenue when $x = 10$ is ₹ ____.`, acc: [['20']], sol: r`$R'(x) = 30 - x$, so $R'(10) = 20$.`, d: 2, c: 'understanding', t: [1] }),
  (C) => C.blank(Math.round(D((x) => 30 * x - 0.5 * x * x, 10))));

// =============================================================== numerical
Q('n01', mk.num({ stem: r`An oil spill on the sea near Kochi spreads as a circle whose radius grows at $1.5$ m/min. At what rate (in m$^2$/min) is the area of the spill growing when the radius is $20$ m? Use $\pi = 3.14$.`, value: 188.4, tol: 0.1, unit: 'm²/min', sol: r`$\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt} = 2(3.14)(20)(1.5) = 188.4$ m$^2$/min.`, scheme: [['188.4', 1]], d: 2, c: 'application', t: [1], time: 75 }),
  (C) => C.val(rate((t) => 3.14 * (20 + 1.5 * t) ** 2), 1e-4));
Q('n02', mk.num({ stem: r`Water is poured at $2\pi$ m$^3$/min into an inverted conical tank of height $6$ m and top radius $3$ m. How fast (in m/min) is the water level rising when the water is $4$ m deep?`, value: 0.5, unit: 'm/min', sol: r`By similar triangles $r = \dfrac h2$, so $V = \dfrac13\pi\dfrac{h^2}{4}h = \dfrac{\pi h^3}{12}$ and $\dfrac{dV}{dt} = \dfrac{\pi h^2}{4}\dfrac{dh}{dt}$. Then $2\pi = 4\pi\dfrac{dh}{dt}$, so $\dfrac{dh}{dt} = 0.5$ m/min.`, scheme: [['0.5', 1]], d: 3, c: 'application', t: [1], time: 120 }),
  (C) => { const V = (h) => (P * h ** 3) / 12; const dh = 0.5; C.assert(near(rate((t) => V(4 + dh * t)), 2 * P), 'dV/dt = 2π'); C.val(dh); });
Q('n03', mk.num({ stem: r`An open box is made from a square sheet of side $48$ cm by cutting equal squares from the corners and folding up the flaps. What side (in cm) should the cut squares have for the box to hold the most?`, value: 8, unit: 'cm', sol: r`$V = x(48 - 2x)^2$, $V' = (48 - 2x)(48 - 6x) = 0$ gives $x = 8$ (as $x = 24$ gives no box).`, scheme: [['8', 1]], d: 3, c: 'application', t: [3], time: 120 }),
  (C) => C.val(Math.round(extremum((x) => x * (48 - 2 * x) ** 2, 0, 24, 'max').x * 1e4) / 1e4));
Q('n04', mk.num({ stem: r`For the open box made from a $48$ cm square sheet (equal squares cut from the corners), find the largest possible volume in cm$^3$.`, value: 8192, unit: 'cm³', sol: r`Best cut $x = 8$ cm: base $32$ cm by $32$ cm, height $8$ cm, $V = 32 \times 32 \times 8 = 8192$ cm$^3$.`, scheme: [['8192', 1]], d: 3, c: 'application', t: [3], time: 120 }),
  (C) => C.val(Math.round(extremum((x) => x * (48 - 2 * x) ** 2, 0, 24, 'max').y * 1e4) / 1e4));
Q('n05', mk.num({ stem: r`For $f(x) = x^3 - 6x^2 - 15x + 2$, find the length of the interval on which $f$ is strictly decreasing.`, value: 6, sol: r`$f'(x) = 3x^2 - 12x - 15 = 3(x + 1)(x - 5) < 0$ on $(-1, 5)$, whose length is $5 - (-1) = 6$.`, scheme: [['6', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
  (C) => { const g = (x) => x ** 3 - 6 * x * x - 15 * x + 2; const tp = turning(g, -10, 10); C.assert(mono(g, tp[0].x, tp[1].x) === -1, 'decreasing between turning points'); C.val(tp[1].x - tp[0].x, 1e-5); });
Q('n06', mk.num({ stem: r`A farmer near Nashik has $240$ m of fencing. She encloses a rectangular field and divides it into two equal parts with one more fence parallel to one pair of sides. Find the largest total area (in m$^2$) she can enclose.`, value: 2400, unit: 'm²', sol: r`Three fences of length $x$ and two of length $y$: $3x + 2y = 240$, $A = xy = \dfrac{x(240 - 3x)}{2}$. $A' = \dfrac{240 - 6x}{2} = 0$ at $x = 40$, $y = 60$, $A = 2400$ m$^2$.`, scheme: [['2400', 1]], d: 4, c: 'analysis', t: [3], time: 150 }),
  (C) => C.val(Math.round(extremum((x) => (x * (240 - 3 * x)) / 2, 0, 80, 'max').y * 1e4) / 1e4));

// =============================================================== short answer (2 marks)
Q('s201', mk.short({ marks: 2, stem: r`Each side of an equilateral triangle increases at $2$ cm/s. Find the rate at which its area increases when each side is $10$ cm.`, model: r`$A = \dfrac{\sqrt3}{4}a^2$, so $\dfrac{dA}{dt} = \dfrac{\sqrt3}{2}a\dfrac{da}{dt} = \dfrac{\sqrt3}{2}(10)(2) = 10\sqrt3$ cm$^2$/s.`, sol: 'Differentiate the area formula with respect to time (chain rule).', scheme: [['dA/dt = (√3/2) a da/dt', 1], ['10√3 cm²/s', 1]], d: 2, c: 'understanding', t: [1], time: 120 }),
  (C) => { C.assert(near(rate((t) => (S3 / 4) * (10 + 2 * t) ** 2), 10 * S3), '10√3'); C.model([r`10\sqrt3`]); });
Q('s202', mk.short({ marks: 2, stem: r`Show that $f(x) = 3x + 2\cos x$ is strictly increasing on $\mathbb{R}$.`, model: r`$f'(x) = 3 - 2\sin x$. Since $\sin x \le 1$, $f'(x) \ge 3 - 2 = 1 > 0$ for every real $x$. Hence $f$ is strictly increasing on $\mathbb{R}$.`, sol: r`Bound $\sin x$ to show the derivative stays positive.`, scheme: [["f′(x) = 3 − 2 sin x", 1], ['f′(x) ≥ 1 > 0, conclusion', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
  (C) => { const g = (x) => 3 * x + 2 * Math.cos(x); C.assert(mono(g, -30, 30) === 1 && extremum((x) => D(g, x), -30, 30, 'min').y > 0.99, 'f′ ≥ 1'); C.model(['strictly increasing']); });
Q('s203', mk.short({ marks: 2, stem: r`Find the intervals on which $f(x) = 2x^2 - 8x + 3$ is strictly increasing and strictly decreasing.`, model: r`$f'(x) = 4x - 8 = 4(x - 2)$. $f'(x) < 0$ for $x < 2$ and $f'(x) > 0$ for $x > 2$. So $f$ is strictly decreasing on $(-\infty, 2)$ and strictly increasing on $(2, \infty)$.`, sol: 'Sign of the derivative on either side of its zero.', scheme: [["f′(x) = 4(x − 2), zero at 2", 1], ['Both intervals', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
  (C) => { const g = (x) => 2 * x * x - 8 * x + 3; C.assert(mono(g, -20, 2) === -1 && mono(g, 2, 20) === 1, 'dec then inc at 2'); C.model([2]); });
Q('s204', mk.short({ marks: 2, stem: r`Using the second derivative test, find the local maximum and local minimum values of $f(x) = x^3 - 3x$.`, model: r`$f'(x) = 3x^2 - 3 = 0$ at $x = \pm1$; $f''(x) = 6x$. At $x = -1$: $f'' = -6 < 0$, local maximum $f(-1) = -1 + 3 = 2$. At $x = 1$: $f'' = 6 > 0$, local minimum $f(1) = 1 - 3 = -2$.`, sol: 'Find the critical points, then test the sign of the second derivative at each.', scheme: [['Critical points ±1 with f″ signs', 1], ['Max 2, min −2', 1]], d: 2, c: 'understanding', t: [3], time: 120 }),
  (C) => { const tp = turning((x) => x ** 3 - 3 * x, -5, 5); C.assert(tp.length === 2 && tp[0].type === 'max' && near(tp[0].y, 2) && tp[1].type === 'min' && near(tp[1].y, -2), 'max 2 at -1, min -2 at 1'); C.model([2, 1, 6]); });
Q('s205', mk.short({ marks: 2, stem: r`Two positive numbers have sum $16$. Find them if the sum of their squares is to be as small as possible.`, model: r`Let the numbers be $x$ and $16 - x$. $S = x^2 + (16 - x)^2$, $S' = 2x - 2(16 - x) = 4x - 32 = 0$ at $x = 8$, and $S'' = 4 > 0$: a minimum. The numbers are $8$ and $8$ (least sum of squares $128$).`, sol: 'Express the sum of squares in one variable and minimise.', scheme: [['S in one variable, S′ = 0 at 8', 1], ['8 and 8, with the minimum check', 1]], d: 2, c: 'application', t: [3], time: 120 }),
  (C) => { const m = extremum((x) => x * x + (16 - x) ** 2, 0, 16, 'min'); C.assert(near(m.x, 8) && near(m.y, 128), 'x = 8, S = 128'); C.model([8, 128]); });
Q('s206', mk.short({ marks: 2, stem: r`A handloom unit in Varanasi earns revenue $R(x) = 5x^2 + 22x + 35$ rupees from selling $x$ saris. Find the marginal revenue when $x = 7$ and interpret it.`, model: r`Marginal revenue $R'(x) = 10x + 22$, so $R'(7) = 92$. When $7$ saris are sold, revenue is increasing at about ₹$92$ per extra sari, so the eighth sari adds roughly ₹$92$.`, sol: 'Differentiate the revenue function; marginal revenue is the derivative.', scheme: [["R′(x) = 10x + 22", 1], ['₹92 with interpretation', 1]], d: 2, c: 'understanding', t: [1], time: 90 }),
  (C) => { C.assert(near(D((x) => 5 * x * x + 22 * x + 35, 7), 92), 'R′(7) = 92'); C.model([92]); });
Q('s207', mk.short({ marks: 2, stem: r`Prove that $f(x) = \ln(1 + x) - x$ is strictly decreasing on $(0, \infty)$.`, model: r`$f'(x) = \dfrac{1}{1 + x} - 1 = \dfrac{-x}{1 + x}$. For $x > 0$ the numerator $-x < 0$ and the denominator $1 + x > 0$, so $f'(x) < 0$. Hence $f$ is strictly decreasing on $(0, \infty)$.`, sol: 'Combine the derivative into one fraction and read its sign.', scheme: [["f′(x) = −x/(1 + x)", 1], ['Sign argument and conclusion', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
  (C) => { C.assert(mono((x) => Math.log(1 + x) - x, 0, 40) === -1, 'decreasing'); C.model(['strictly decreasing']); });
Q('s208', mk.short({ marks: 2, stem: r`Air is pumped into a spherical balloon so that its volume increases at $100\pi$ cm$^3$/s. Find the rate at which the radius increases when the radius is $5$ cm.`, model: r`$V = \dfrac43\pi r^3 \Rightarrow \dfrac{dV}{dt} = 4\pi r^2\dfrac{dr}{dt}$. So $100\pi = 4\pi(25)\dfrac{dr}{dt} = 100\pi\dfrac{dr}{dt}$, giving $\dfrac{dr}{dt} = 1$ cm/s.`, sol: 'Chain rule on the volume formula, then substitute.', scheme: [["dV/dt = 4πr² dr/dt", 1], ['1 cm/s', 1]], d: 2, c: 'understanding', t: [1], time: 90 }),
  (C) => { C.assert(near(rate((t) => (4 / 3) * P * (5 + 1 * t) ** 3), 100 * P), 'dr/dt = 1 gives 100π'); C.model([1]); });
Q('s209', mk.short({ marks: 2, stem: r`Using derivatives, find the maximum value of $f(x) = 3\sin x + 4\cos x$.`, model: r`$f'(x) = 3\cos x - 4\sin x = 0$ gives $\tan x = \dfrac34$. Take $x$ in the first quadrant, so $\sin x = \dfrac35$, $\cos x = \dfrac45$; there $f''(x) = -3\sin x - 4\cos x = -f(x) < 0$. Maximum value $= 3 \cdot \dfrac35 + 4 \cdot \dfrac45 = \dfrac{25}{5} = 5$.`, sol: r`Set the derivative to zero and use the right triangle with sides $3$, $4$, $5$.`, scheme: [['tan x = 3/4 from f′ = 0', 1], ['Maximum 5', 1]], d: 3, c: 'application', t: [3], time: 150 }),
  (C) => { C.assert(near(extremum((x) => 3 * Math.sin(x) + 4 * Math.cos(x), 0, 2 * P, 'max').y, 5), 'max 5'); C.model([5]); });

// =============================================================== short answer (3 marks)
Q('s301', mk.short({ marks: 3, stem: r`Find the absolute maximum and absolute minimum values of $f(x) = 2x^3 - 3x^2 - 12x + 1$ on $[-2, 3]$.`, model: r`$f'(x) = 6x^2 - 6x - 12 = 6(x - 2)(x + 1)$, so the critical points are $x = -1$ and $x = 2$, both in $[-2, 3]$.

Values: $f(-2) = -16 - 12 + 24 + 1 = -3$; $f(-1) = -2 - 3 + 12 + 1 = 8$; $f(2) = 16 - 12 - 24 + 1 = -19$; $f(3) = 54 - 27 - 36 + 1 = -8$.

Absolute maximum $8$ at $x = -1$; absolute minimum $-19$ at $x = 2$.`, sol: 'Closed interval method: critical points and end points.', scheme: [['Critical points −1, 2', 1], ['Four values of f', 1], ['Max 8, min −19 with points', 1]], d: 3, c: 'application', t: [3], time: 180 }),
  (C) => { const g = (x) => 2 * x ** 3 - 3 * x * x - 12 * x + 1; const mx = extremum(g, -2, 3, 'max'), mn = extremum(g, -2, 3, 'min'); C.assert(near(mx.y, 8) && near(mx.x, -1, 1e-3) && near(mn.y, -19) && near(mn.x, 2, 1e-3), 'max 8 at -1, min -19 at 2'); C.model([8, 19, 3]); });
Q('s302', mk.short({ marks: 3, stem: r`Find all critical points of $f(x) = x^4 - 2x^2$ and classify each as a local maximum or local minimum, giving the values.`, model: r`$f'(x) = 4x^3 - 4x = 4x(x - 1)(x + 1) = 0$ at $x = -1, 0, 1$. $f''(x) = 12x^2 - 4$.

$f''(0) = -4 < 0$: local maximum, $f(0) = 0$.

$f''(\pm1) = 8 > 0$: local minima, $f(\pm1) = 1 - 2 = -1$.`, sol: 'Factorise the derivative; second derivative test at each root.', scheme: [['Critical points −1, 0, 1', 1], ['f″ at each', 1], ['Max 0 at 0; min −1 at ±1', 1]], d: 3, c: 'understanding', t: [3], time: 180 }),
  (C) => { const tp = turning((x) => x ** 4 - 2 * x * x, -3, 3); C.assert(tp.map((p) => `${p.type}${Math.round(p.x)}:${Math.round(p.y)}`).join() === 'min-1:-1,max0:0,min1:-1', JSON.stringify(tp)); C.model([1, 0, 8, 4]); });
Q('s303', mk.short({ marks: 3, stem: r`Find the intervals in $[0, 2\pi]$ on which $f(x) = \sqrt3\sin x + \cos x$ is strictly increasing and strictly decreasing.`, model: r`$f'(x) = \sqrt3\cos x - \sin x = 2\cos\left(x + \dfrac{\pi}{6}\right)$. It is zero when $x + \dfrac{\pi}{6} = \dfrac{\pi}{2}$ or $\dfrac{3\pi}{2}$, i.e. $x = \dfrac{\pi}{3}$ or $x = \dfrac{4\pi}{3}$.

$f' > 0$ on $\left[0, \dfrac{\pi}{3}\right)$ and $\left(\dfrac{4\pi}{3}, 2\pi\right]$: strictly increasing there.

$f' < 0$ on $\left(\dfrac{\pi}{3}, \dfrac{4\pi}{3}\right)$: strictly decreasing there.`, sol: r`Write the derivative as a single cosine and find where it changes sign.`, scheme: [['f′ and its zeros π/3, 4π/3', 1], ['Increasing intervals', 1], ['Decreasing interval', 1]], d: 3, c: 'application', t: [2], time: 180 }),
  (C) => { const g = (x) => S3 * Math.sin(x) + Math.cos(x); C.assert(mono(g, 0, P / 3) === 1 && mono(g, P / 3, (4 * P) / 3) === -1 && mono(g, (4 * P) / 3, 2 * P) === 1, 'intervals'); C.model([r`\dfrac{\pi}{3}`, r`\dfrac{4\pi}{3}`]); });
Q('s304', mk.short({ marks: 3, stem: r`A $10$ m ladder rests against a vertical wall. Its foot is pulled away from the wall along the ground at $0.7$ m/s. How fast is the top of the ladder sliding down the wall when the foot is $6$ m from the wall?`, model: r`Let the foot be $x$ m from the wall and the top $y$ m high: $x^2 + y^2 = 100$. When $x = 6$, $y = 8$.

Differentiate: $2x\dfrac{dx}{dt} + 2y\dfrac{dy}{dt} = 0$, so $\dfrac{dy}{dt} = -\dfrac{x}{y}\dfrac{dx}{dt} = -\dfrac68(0.7) = -0.525$ m/s.

The top slides down at $0.525$ m/s.`, sol: 'Pythagoras relation, differentiate with respect to time, substitute.', scheme: [['x² + y² = 100 and y = 8', 1], ['Differentiated relation', 1], ['0.525 m/s downwards', 1]], d: 3, c: 'application', t: [1], time: 180 }),
  (C) => { const v = -rate((t) => Math.sqrt(100 - (6 + 0.7 * t) ** 2)); C.assert(near(v, 0.525), `${v}`); C.model([0.525, 8]); });
Q('s305', mk.short({ marks: 3, stem: r`A cylindrical water tank of radius $2$ m is being filled at $6$ m$^3$/min. Find (a) how fast the water level is rising, and (b) how fast the wetted area of the curved wall is increasing.`, model: r`(a) $V = \pi r^2h = 4\pi h$, so $\dfrac{dV}{dt} = 4\pi\dfrac{dh}{dt}$: $\dfrac{dh}{dt} = \dfrac{6}{4\pi} = \dfrac{3}{2\pi}$ m/min (about $0.48$ m/min).

(b) Wetted curved area $S = 2\pi rh = 4\pi h$, so $\dfrac{dS}{dt} = 4\pi\dfrac{dh}{dt} = 4\pi \cdot \dfrac{3}{2\pi} = 6$ m$^2$/min.`, sol: 'Radius is fixed; differentiate volume and curved area with respect to time.', scheme: [['V = 4πh, dV/dt = 4π dh/dt', 1], ['dh/dt = 3/(2π) m/min', 1], ['dS/dt = 6 m²/min', 1]], d: 3, c: 'application', t: [1], time: 180 }),
  (C) => { const dh = 3 / (2 * P); C.assert(near(rate((t) => P * 4 * dh * t), 6) && near(rate((t) => 2 * P * 2 * (1 + dh * t)), 6), 'dh/dt and dS/dt'); C.model([6, 0.48]); });
Q('s306', mk.short({ marks: 3, stem: r`Find the values of $a$ for which $f(x) = x^3 + ax^2 + 3x + 1$ is strictly increasing on $\mathbb{R}$.`, model: r`$f'(x) = 3x^2 + 2ax + 3$, a quadratic with positive leading coefficient. It is never negative when its discriminant is at most $0$: $4a^2 - 36 \le 0$, i.e. $-3 \le a \le 3$.

For $-3 < a < 3$, $f'(x) > 0$ everywhere. For $a = \pm3$, $f'(x) = 3(x \pm 1)^2$ is zero at one point only, so $f$ is still strictly increasing.

Answer: $-3 \le a \le 3$.`, sol: 'Use the discriminant of the quadratic derivative; check the boundary values separately.', scheme: [['f′(x) = 3x² + 2ax + 3', 1], ['Discriminant ≤ 0 gives −3 ≤ a ≤ 3', 1], ['Boundary values justified', 1]], d: 4, c: 'analysis', t: [2], time: 210 }),
  (C) => { const fa = (a) => (x) => x ** 3 + a * x * x + 3 * x + 1; C.assert([-3, -2, 0, 1.5, 3].every((a) => mono(fa(a), -20, 20) === 1) && [-3.2, 3.2, 5].every((a) => mono(fa(a), -20, 20) === 0), 'a in [-3, 3]'); C.model([3]); });
Q('s307', mk.short({ marks: 3, stem: r`A rectangle has two vertices on the $x$-axis and the other two on the curve $y = 12 - x^2$, above the axis, placed symmetrically about the $y$-axis. Find the largest possible area of the rectangle.`, model: r`Let the upper vertices be $(\pm x, 12 - x^2)$ with $0 < x < 2\sqrt3$. Area $A = 2x(12 - x^2) = 24x - 2x^3$.

$A' = 24 - 6x^2 = 0$ at $x = 2$; $A'' = -12x = -24 < 0$, a maximum.

Largest area $= 2(2)(12 - 4) = 32$ square units.`, sol: 'Area in terms of the half-width; maximise.', scheme: [['A = 24x − 2x³', 1], ['x = 2 with max check', 1], ['Area 32', 1]], d: 3, c: 'application', t: [3], time: 180 }),
  (C) => { const m = extremum((x) => 2 * x * (12 - x * x), 0, 2 * S3, 'max'); C.assert(near(m.x, 2, 1e-3) && near(m.y, 32), 'x = 2, A = 32'); C.model([32, 2]); });
Q('s308', mk.short({ marks: 3, stem: r`A tiffin service in Indore finds that its daily profit (in ₹) from $x$ tiffins is $P(x) = -0.5x^2 + 60x - 800$. How many tiffins should it make for maximum profit, and what is that profit?`, model: r`$P'(x) = -x + 60 = 0$ at $x = 60$; $P''(x) = -1 < 0$, so this is a maximum.

$P(60) = -0.5(3600) + 3600 - 800 = -1800 + 3600 - 800 = 1000$.

Make $60$ tiffins a day for the maximum profit of ₹$1000$.`, sol: 'Set the marginal profit to zero; confirm with the second derivative.', scheme: [["P′(x) = 60 − x, x = 60", 1], ["P″ < 0, maximum", 1], ['₹1000', 1]], d: 2, c: 'understanding', t: [3], time: 150 }),
  (C) => { const m = extremum((x) => -0.5 * x * x + 60 * x - 800, 0, 200, 'max'); C.assert(near(m.x, 60, 1e-3) && near(m.y, 1000), '60, 1000'); C.model([60, 1000]); });
Q('s309', mk.short({ marks: 3, stem: r`Determine where $f(x) = \dfrac{x}{1 + x^2}$ rises and where it falls: give every interval of strict increase and of strict decrease.`, model: r`$f'(x) = \dfrac{(1 + x^2) - x(2x)}{(1 + x^2)^2} = \dfrac{1 - x^2}{(1 + x^2)^2}$. The denominator is always positive, so the sign is that of $1 - x^2$.

$f' > 0$ for $-1 < x < 1$: strictly increasing on $(-1, 1)$.

$f' < 0$ for $|x| > 1$: strictly decreasing on $(-\infty, -1)$ and on $(1, \infty)$.`, sol: 'Quotient rule; the sign comes from the numerator only.', scheme: [["f′(x) = (1 − x²)/(1 + x²)²", 1], ['Increasing on (−1, 1)', 1], ['Decreasing intervals', 1]], d: 3, c: 'application', t: [2], time: 180 }),
  (C) => { const g = (x) => x / (1 + x * x); C.assert(mono(g, -1, 1) === 1 && mono(g, -30, -1) === -1 && mono(g, 1, 30) === -1, 'intervals'); C.model([1]); });

// =============================================================== long answer (5 marks)
Q('l01', mk.long({ stem: r`An open box is to be made from a rectangular sheet of cardboard $40$ cm by $25$ cm by cutting equal squares from the four corners and folding up the sides. Find the side of the square to be cut off so that the box has the largest volume, and find this volume.`, model: r`Let the side of each square be $x$ cm, $0 < x < 12.5$. The box has base $(40 - 2x)$ by $(25 - 2x)$ and height $x$:

$V = x(40 - 2x)(25 - 2x) = 4x^3 - 130x^2 + 1000x$.

$V' = 12x^2 - 260x + 1000 = 4(3x^2 - 65x + 250) = 4(3x - 50)(x - 5)$.

$V' = 0$ at $x = 5$ or $x = \dfrac{50}{3}$; the second is more than $12.5$, so it is rejected.

$V'' = 24x - 260$; $V''(5) = -140 < 0$, so $x = 5$ gives a maximum.

Largest volume $= 5 \times 30 \times 15 = 2250$ cm$^3$.`, sol: 'Write V in one variable with its domain, solve V′ = 0, reject the infeasible root, confirm with V″.', scheme: [['V(x) with domain', 1], ['V′ factorised', 1], ['x = 5, reject 50/3', 1], ['V″(5) < 0', 1], ['2250 cm³', 1]], d: 3, c: 'application', t: [3], time: 360 }),
  (C) => { const g = (x) => x * (40 - 2 * x) * (25 - 2 * x); const m = extremum(g, 0, 12.5, 'max'); C.assert(near(m.x, 5, 1e-3) && near(m.y, 2250) && near(D2(g, 5), -140, 1e-3), 'x = 5, V = 2250, V″ = -140'); C.model([5, 2250, 140, 50, 3]); });
Q('l02', mk.long({ stem: r`A village in Rajasthan needs an open (no lid) cylindrical water tank of volume $125\pi$ m$^3$. The tank is made of sheet metal for the base and the curved wall. Show that the metal used is least when the height of the tank equals its radius, and find the dimensions and the least area of metal.`, model: r`Let the radius be $r$ and height $h$. Volume: $\pi r^2h = 125\pi$, so $h = \dfrac{125}{r^2}$.

Metal area $S = \pi r^2 + 2\pi rh = \pi r^2 + \dfrac{250\pi}{r}$.

$S' = 2\pi r - \dfrac{250\pi}{r^2} = 0 \Rightarrow r^3 = 125 \Rightarrow r = 5$.

$S'' = 2\pi + \dfrac{500\pi}{r^3} > 0$, so $r = 5$ gives the minimum.

Then $h = \dfrac{125}{25} = 5 = r$. Dimensions: radius $5$ m, height $5$ m; least area $S = 25\pi + 50\pi = 75\pi$ m$^2$.`, sol: 'Eliminate h using the volume, minimise the area in r, then compare h with r.', scheme: [['h = 125/r², S in r', 1], ['S′ = 0 gives r = 5', 1], ['S″ > 0 minimum', 1], ['h = 5 = r shown', 1], ['75π m²', 1]], d: 4, c: 'application', t: [3], time: 360 }),
  (C) => { const S = (r0) => P * r0 * r0 + (250 * P) / r0; const m = extremum(S, 0.5, 20, 'min'); C.assert(near(m.x, 5, 1e-3) && near(m.y, 75 * P) && near(125 / 25, 5), 'r = 5, S = 75π'); C.model([5, 75, 125]); });
Q('l03', mk.long({ stem: r`A storage box with a square base and no lid must hold $64$ m$^3$. Material for the base costs ₹$40$ per m$^2$ and for the four sides ₹$20$ per m$^2$. Find the dimensions of the cheapest box and its cost.`, model: r`Let the base be $x$ m by $x$ m and the height $h$ m. Then $x^2h = 64$, so $h = \dfrac{64}{x^2}$.

Cost $C = 40x^2 + 20(4xh) = 40x^2 + \dfrac{5120}{x}$.

$C' = 80x - \dfrac{5120}{x^2} = 0 \Rightarrow x^3 = 64 \Rightarrow x = 4$.

$C'' = 80 + \dfrac{10240}{x^3} > 0$, so this is a minimum.

Dimensions: base $4$ m by $4$ m, height $h = \dfrac{64}{16} = 4$ m. Least cost $= 40(16) + \dfrac{5120}{4} = 640 + 1280 = $ ₹$1920$.`, sol: 'Cost as a function of the base side only; minimise.', scheme: [['h = 64/x² and cost function', 1], ['C′ = 0 gives x = 4', 1], ['C″ > 0', 1], ['Dimensions 4 m × 4 m × 4 m', 1], ['₹1920', 1]], d: 4, c: 'application', t: [3], time: 360 }),
  (C) => { const Cf = (x) => 40 * x * x + 5120 / x; const m = extremum(Cf, 0.5, 20, 'min'); C.assert(near(m.x, 4, 1e-3) && near(m.y, 1920), 'x = 4, ₹1920'); C.model([4, 1920, 640, 1280]); });
Q('l04', mk.long({ stem: r`A right circular cylinder stands inside a right circular cone of height $12$ cm and base radius $6$ cm, on the same axis, with its base on the base of the cone and its top rim touching the cone. Find the radius and height of the cylinder of largest volume, and that volume.`, model: r`Let the cylinder have radius $r$ and height $h$. In the vertical cross-section, similar triangles give $\dfrac{12 - h}{12} = \dfrac{r}{6}$, so $h = 12 - 2r$, with $0 < r < 6$.

$V = \pi r^2h = \pi(12r^2 - 2r^3)$.

$V' = \pi(24r - 6r^2) = 6\pi r(4 - r) = 0 \Rightarrow r = 4$ (as $r > 0$).

$V'' = \pi(24 - 12r)$; at $r = 4$, $V'' = -24\pi < 0$: maximum.

So $r = 4$ cm, $h = 12 - 8 = 4$ cm, and $V = \pi(16)(4) = 64\pi$ cm$^3$.`, sol: 'Similar triangles link h and r; then maximise the volume in r.', scheme: [['h = 12 − 2r from similar triangles', 1], ['V(r)', 1], ['V′ = 0 at r = 4', 1], ['V″ < 0', 1], ['r = 4, h = 4, 64π cm³', 1]], d: 4, c: 'analysis', t: [3], time: 360 }),
  (C) => { const V = (r0) => P * r0 * r0 * (12 - 2 * r0); const m = extremum(V, 0, 6, 'max'); C.assert(near(m.x, 4, 1e-3) && near(m.y, 64 * P), 'r = 4, V = 64π'); C.model([4, 64, 24]); });
Q('l05', mk.long({ stem: r`For $f(x) = x^4 - 8x^3 + 22x^2 - 24x + 7$:
(a) find the intervals on which $f$ is strictly increasing and strictly decreasing;
(b) find the local maximum and local minimum values.`, model: r`(a) $f'(x) = 4x^3 - 24x^2 + 44x - 24 = 4(x^3 - 6x^2 + 11x - 6) = 4(x - 1)(x - 2)(x - 3)$.

Sign of $f'$: negative on $(-\infty, 1)$, positive on $(1, 2)$, negative on $(2, 3)$, positive on $(3, \infty)$.

So $f$ is strictly increasing on $(1, 2)$ and $(3, \infty)$, and strictly decreasing on $(-\infty, 1)$ and $(2, 3)$.

(b) At $x = 1$, $f'$ changes $-$ to $+$: local minimum $f(1) = 1 - 8 + 22 - 24 + 7 = -2$.
At $x = 2$, $+$ to $-$: local maximum $f(2) = 16 - 64 + 88 - 48 + 7 = -1$.
At $x = 3$, $-$ to $+$: local minimum $f(3) = 81 - 216 + 198 - 72 + 7 = -2$.`, sol: 'Factorise the cubic derivative (try x = 1), build a sign chart, then apply the first derivative test.', scheme: [['f′ factorised', 1], ['Sign chart', 1], ['Intervals', 1], ['Local max −1 at x = 2', 1], ['Local min −2 at x = 1 and x = 3', 1]], d: 4, c: 'application', t: [2, 3], time: 420 }),
  (C) => { const g = (x) => x ** 4 - 8 * x ** 3 + 22 * x * x - 24 * x + 7; const tp = turning(g, -5, 8); C.assert(tp.map((p) => `${p.type}${Math.round(p.x)}:${Math.round(p.y * 1e6) / 1e6}`).join() === 'min1:-2,max2:-1,min3:-2', JSON.stringify(tp)); C.assert(mono(g, 1, 2) === 1 && mono(g, 3, 20) === 1 && mono(g, -20, 1) === -1 && mono(g, 2, 3) === -1, 'intervals'); C.model([1, 2, 3]); });
Q('l06', mk.long({ stem: r`A kite flies at a constant height of $60$ m above a flat beach at Puri. The wind carries it horizontally away from the girl holding the string at $4$ m/s. Assume the string is straight.
(a) How fast is the string being let out when $100$ m of string is out?
(b) How fast is the angle of elevation of the string changing at that moment?`, model: r`Let $x$ be the horizontal distance and $L$ the string length: $L^2 = x^2 + 3600$. When $L = 100$, $x = 80$.

(a) $2L\dfrac{dL}{dt} = 2x\dfrac{dx}{dt}$, so $\dfrac{dL}{dt} = \dfrac{80}{100}(4) = 3.2$ m/s.

(b) $\tan\theta = \dfrac{60}{x}$. Differentiating, $\sec^2\theta\dfrac{d\theta}{dt} = -\dfrac{60}{x^2}\dfrac{dx}{dt}$. At this moment $\tan\theta = \dfrac{60}{80} = \dfrac34$, so $\sec^2\theta = \dfrac{25}{16}$.

$\dfrac{d\theta}{dt} = -\dfrac{16}{25} \cdot \dfrac{60 \times 4}{6400} = -0.024$ rad/s.

The angle of elevation decreases at $0.024$ radian per second.`, sol: 'Pythagoras for the string; tangent of the angle for part (b); differentiate both with respect to time.', scheme: [['L² = x² + 3600, x = 80', 1], ['dL/dt = 3.2 m/s', 1], ['tan θ = 60/x differentiated', 1], ['sec²θ = 25/16', 1], ['−0.024 rad/s (decreasing)', 1]], d: 4, c: 'application', t: [1], time: 420 }),
  (C) => { const x = (t) => 80 + 4 * t; const dL = rate((t) => Math.hypot(x(t), 60)); const dth = rate((t) => Math.atan(60 / x(t))); C.assert(near(dL, 3.2) && near(dth, -0.024), `${dL} ${dth}`); C.model([3.2, 0.024, 80]); });
Q('l07', mk.long({ stem: r`For $f(x) = 2x^3 - 15x^2 + 36x + 1$ on the closed interval $[1, 5]$:
(a) find the local maximum and local minimum values of $f$;
(b) find the absolute maximum and absolute minimum values of $f$ on $[1, 5]$.`, model: r`$f'(x) = 6x^2 - 30x + 36 = 6(x - 2)(x - 3)$, so the critical points are $x = 2$ and $x = 3$. $f''(x) = 12x - 30$.

(a) $f''(2) = -6 < 0$: local maximum $f(2) = 16 - 60 + 72 + 1 = 29$.
$f''(3) = 6 > 0$: local minimum $f(3) = 54 - 135 + 108 + 1 = 28$.

(b) End points: $f(1) = 2 - 15 + 36 + 1 = 24$ and $f(5) = 250 - 375 + 180 + 1 = 56$.

Comparing $24$, $29$, $28$, $56$: absolute maximum $56$ at $x = 5$; absolute minimum $24$ at $x = 1$. Both absolute extrema occur at end points, not at the turning points.`, sol: 'Second derivative test for (a); compare critical and end-point values for (b).', scheme: [['Critical points 2, 3', 1], ['Local max 29', 1], ['Local min 28', 1], ['End-point values 24, 56', 1], ['Absolute max 56, min 24', 1]], d: 3, c: 'application', t: [3], time: 360 }),
  (C) => { const g = (x) => 2 * x ** 3 - 15 * x * x + 36 * x + 1; const tp = turning(g, 1, 5); C.assert(tp.length === 2 && near(tp[0].y, 29) && near(tp[1].y, 28) && near(extremum(g, 1, 5, 'max').y, 56) && near(extremum(g, 1, 5, 'min').y, 24), 'values'); C.model([29, 28, 24, 56]); });
Q('l08', mk.long({ stem: r`Find the point on the curve $y = x^2$ that is nearest to the point $A(3, 0)$, and find the least distance.`, model: r`Let $P(x, x^2)$ be on the curve. Minimise the square of the distance (it has its least value where the distance does):

$s = (x - 3)^2 + x^4$.

$s' = 2(x - 3) + 4x^3 = 4x^3 + 2x - 6 = 2(2x^3 + x - 3)$.

$x = 1$ is a root: $2 + 1 - 3 = 0$. So $2x^3 + x - 3 = (x - 1)(2x^2 + 2x + 3)$, and $2x^2 + 2x + 3$ has discriminant $4 - 24 < 0$, so $x = 1$ is the only critical point.

$s'' = 12x^2 + 2 > 0$: a minimum.

Nearest point $P(1, 1)$; least distance $\sqrt{(1 - 3)^2 + 1^2} = \sqrt5$ units.`, sol: 'Minimise the squared distance; factor the cubic using x = 1.', scheme: [['s(x) = (x − 3)² + x⁴', 1], ["s′ and the root x = 1", 1], ['No other real root', 1], ["s″ > 0, minimum", 1], ['P(1, 1), distance √5', 1]], d: 5, c: 'analysis', t: [3], time: 420 }),
  (C) => { const s = (x) => (x - 3) ** 2 + x ** 4; const m = extremum(s, -5, 5, 'min'); C.assert(near(m.x, 1, 1e-3) && near(Math.sqrt(m.y), Math.sqrt(5)) && turning(s, -5, 5).length === 1, 'P(1,1), √5'); C.model([1, r`\sqrt5`]); });
Q('l09', mk.long({ stem: r`Let $f(x) = x^2e^{-x}$.
(a) Use a sign chart of $f'(x)$ to decide where $f$ rises and where it falls on $\mathbb{R}$.
(b) Hence locate every turning point of $f$, say whether each is a local maximum or a local minimum, and give its value.`, model: r`(a) $f'(x) = 2xe^{-x} - x^2e^{-x} = x(2 - x)e^{-x}$. Since $e^{-x} > 0$, the sign is that of $x(2 - x)$.

$f' < 0$ on $(-\infty, 0)$, $f' > 0$ on $(0, 2)$, $f' < 0$ on $(2, \infty)$.

So $f$ is strictly increasing on $(0, 2)$ and strictly decreasing on $(-\infty, 0)$ and $(2, \infty)$.

(b) At $x = 0$, $f'$ changes $-$ to $+$: local minimum $f(0) = 0$.
At $x = 2$, $f'$ changes $+$ to $-$: local maximum $f(2) = \dfrac{4}{e^2}$ (about $0.54$).`, sol: 'Product rule, factor out the exponential, sign chart, first derivative test.', scheme: [["f′(x) = x(2 − x)e^(−x)", 1], ['Sign chart', 1], ['Intervals', 1], ['Local min 0 at x = 0', 1], ['Local max 4/e² at x = 2', 1]], d: 3, c: 'application', t: [2, 3], time: 360 }),
  (C) => { const g = (x) => x * x * Math.exp(-x); const tp = turning(g, -5, 10); C.assert(tp.length === 2 && tp[0].type === 'min' && near(tp[0].x, 0, 1e-4) && tp[1].type === 'max' && near(tp[1].x, 2, 1e-4) && near(tp[1].y, 4 / Math.E ** 2) && near(4 / Math.E ** 2, 0.54, 0.01), 'min 0, max 4/e²'); C.model([2, 0.54]); });

// =============================================================== case-based
caseQ('c01', {
  passage: r`Meena runs a tea stall near the Surat railway station. From her records she models her daily profit (in ₹) as $P(x) = -10x^2 + 400x - 2500$, where $x$ is the price (in ₹) of one cup of tea, $10 \le x \le 30$.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $P'(x) = -20x + 400$. (b) $x = 20$. (c) (i) Maximum daily profit ₹$1500$, since $P''(x) = -20 < 0$. Or (ii) $P$ is strictly increasing on $(10, 20)$; $P(15) = 1250$.`,
  sol: r`(a) Differentiate term by term. (b) $P'(x) = 0$ gives $x = 20$. (c) (i) $P(20) = -4000 + 8000 - 2500 = 1500$. (ii) $P'(x) > 0$ for $x < 20$; $P(15) = -2250 + 6000 - 2500 = 1250$.`,
  children: [
    child('a', mk.mcq({ stem: r`The marginal profit $P'(x)$ is`, opts: [r`$-20x + 400$`, r`$-10x + 400$`, r`$-20x + 400 - 2500$`, r`$-20x^2 + 400$`], key: 'a', sol: r`$\dfrac{d}{dx}(-10x^2) = -20x$, $\dfrac{d}{dx}(400x) = 400$, and the constant gives $0$.`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'At what price (in ₹) per cup is her profit greatest?', value: 20, unit: '₹', sol: r`$P'(x) = -20x + 400 = 0$ at $x = 20$.`, scheme: [['20', 1]], d: 2, c: 'application', t: [3], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find her maximum daily profit and justify that it is a maximum.', model: r`$P''(x) = -20 < 0$, so $x = 20$ gives a maximum. $P(20) = -10(400) + 8000 - 2500 = 1500$. Maximum daily profit ₹$1500$.`, sol: 'Second derivative test, then substitute.', scheme: [["P″ < 0 justification", 1], ['₹1500', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** On which interval of prices is her profit strictly increasing? What is her profit when she charges ₹15 per cup?', model: r`$P'(x) = 400 - 20x > 0$ for $x < 20$, so the profit is strictly increasing on $(10, 20)$. $P(15) = -2250 + 6000 - 2500 = 1250$, i.e. ₹$1250$.`, sol: 'Sign of the marginal profit; substitute 15.', scheme: [['Increasing on (10, 20)', 1], ['₹1250', 1]], d: 2, c: 'application', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { const Pf = (x) => -10 * x * x + 400 * x - 2500; C.child('a').assert(near(D(Pf, 7), -20 * 7 + 400), 'P′'); C.child('a').key('a'); const m = extremum(Pf, 10, 30, 'max'); C.child('b').val(Math.round(m.x * 1e4) / 1e4); C.child('c').model([m.y]); C.child('cii').assert(mono(Pf, 10, 20) === 1 && mono(Pf, 20, 30) === -1, 'inc on (10, 20)'); C.child('cii').model([Pf(15), 20]); });

caseQ('c02', {
  passage: r`After a tanker leak off the coast of Mumbai, an oil slick spreads as a circle. Coast-guard drones report that the radius grows steadily at $3$ m per minute. Take $\pi = 3.14$ where a decimal answer is asked.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt}$. (b) $942$ m$^2$/min. (c) (i) $6\pi$ m/min, about $18.84$ m/min, the same at every radius. Or (ii) $r = 100$ m, area $10000\pi$ m$^2$.`,
  sol: r`(a) Chain rule on $A = \pi r^2$. (b) $2(3.14)(50)(3) = 942$. (c) (i) $C = 2\pi r$, $\dfrac{dC}{dt} = 2\pi(3) = 6\pi$. (ii) $6\pi r = 600\pi$ gives $r = 100$.`,
  children: [
    child('a', mk.mcq({ stem: r`If $A$ is the area of the slick and $r$ its radius, then`, opts: [r`$\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt}$`, r`$\dfrac{dA}{dt} = \pi r^2\dfrac{dr}{dt}$`, r`$\dfrac{dA}{dt} = 2\pi\dfrac{dr}{dt}$`, r`$\dfrac{dA}{dt} = 2r\dfrac{dr}{dt}$`], key: 'a', sol: r`$A = \pi r^2$ and $r$ depends on $t$, so by the chain rule $\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt}$.`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the rate (in m²/min) at which the area is growing when the radius is 50 m. Use π = 3.14.', value: 942, unit: 'm²/min', sol: r`$\dfrac{dA}{dt} = 2(3.14)(50)(3) = 942$ m$^2$/min.`, scheme: [['942', 1]], d: 2, c: 'application', t: [1], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** How fast is the boundary (circumference) of the slick growing when the radius is 30 m? Does this rate depend on the radius?', model: r`$C = 2\pi r$, so $\dfrac{dC}{dt} = 2\pi\dfrac{dr}{dt} = 6\pi$ m/min $\approx 18.84$ m/min. It does not depend on the radius: it is the same at $30$ m as at any other radius.`, sol: 'Differentiate the circumference with respect to time.', scheme: [['dC/dt = 2π dr/dt = 6π', 1], ['Independent of r', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the radius at the moment when the area is growing at 600π m² per minute, and the area of the slick then.', model: r`$\dfrac{dA}{dt} = 2\pi r(3) = 6\pi r = 600\pi$, so $r = 100$ m. Area $= \pi(100)^2 = 10000\pi$ m$^2$.`, sol: 'Set the area rate equal to the given value and solve for r.', scheme: [['r = 100 m', 1], ['10000π m²', 1]], d: 3, c: 'application', t: [1], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').key('a'); C.child('b').val(rate((t) => 3.14 * (50 + 3 * t) ** 2), 1e-4); C.child('c').assert(near(rate((t) => 2 * P * (30 + 3 * t)), 6 * P) && near(rate((t) => 2 * P * (80 + 3 * t)), 6 * P), '6π at any r'); C.child('c').model([18.84, 6]); const rr = (600 * P) / (6 * P); C.child('cii').assert(near(rate((t) => P * (rr + 3 * t) ** 2), 600 * P), 'r = 100'); C.child('cii').model([100, 10000]); });

caseQ('c03', {
  passage: r`A panchayat in Barmer, Rajasthan, plans an open water tank (no lid) with a square base and vertical sides, holding $500$ m$^3$. To save money, it wants to use the least possible area of concrete sheet. Let the base be $x$ m by $x$ m and the depth $h$ m.`,
  d: 4, c: 'application',
  model: r`(a) Option (a): $S = x^2 + \dfrac{2000}{x}$. (b) $x = 10$ m. (c) (i) Least area $300$ m$^2$, and $S''(10) = 6 > 0$. Or (ii) Depth $h = 5$ m $= \dfrac{x}{2}$.`,
  sol: r`(a) $h = \dfrac{500}{x^2}$ and $S = x^2 + 4xh$. (b) $S' = 2x - \dfrac{2000}{x^2} = 0$ gives $x^3 = 1000$. (c) (i) $S(10) = 100 + 200 = 300$. (ii) $h = \dfrac{500}{100} = 5$.`,
  children: [
    child('a', mk.mcq({ stem: r`The area $S$ of concrete sheet, in terms of $x$ only, is`, opts: [r`$x^2 + \dfrac{2000}{x}$`, r`$2x^2 + \dfrac{2000}{x}$`, r`$x^2 + \dfrac{500}{x}$`, r`$x^2 + \dfrac{4000}{x}$`], key: 'a', sol: r`One base ($x^2$) and four walls ($4xh$). With $h = \dfrac{500}{x^2}$, $4xh = \dfrac{2000}{x}$. Option (b) wrongly includes a lid.`, d: 2, c: 'application', t: [3], time: 75 })),
    child('b', mk.num({ stem: 'Find the side x (in m) of the base for the least area of sheet.', value: 10, unit: 'm', sol: r`$S' = 2x - \dfrac{2000}{x^2} = 0 \Rightarrow x^3 = 1000 \Rightarrow x = 10$.`, scheme: [['10', 1]], d: 3, c: 'application', t: [3], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the least area of sheet needed and show that it is a minimum.', model: r`$S'' = 2 + \dfrac{4000}{x^3}$, so $S''(10) = 2 + 4 = 6 > 0$: a minimum. Least area $S(10) = 100 + \dfrac{2000}{10} = 300$ m$^2$.`, sol: 'Second derivative at the critical point, then substitute.', scheme: [["S″(10) > 0", 1], ['300 m²', 1]], d: 3, c: 'application', t: [3], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the depth of the tank of least area and show that it is half the side of the base.', model: r`$h = \dfrac{500}{x^2} = \dfrac{500}{100} = 5$ m, and $\dfrac{x}{2} = \dfrac{10}{2} = 5$. So the depth is half the side of the base.`, sol: 'Substitute the best x into the volume condition.', scheme: [['h = 5 m', 1], ['h = x/2 shown', 1]], d: 2, c: 'understanding', t: [3], time: 90 }),
    ]),
  ],
}, (C) => { const S = (x) => x * x + 2000 / x; C.child('a').assert(near(S(7), 49 + 4 * 7 * (500 / 49)), 'S formula'); C.child('a').key('a'); const m = extremum(S, 1, 40, 'min'); C.child('b').val(Math.round(m.x * 1e4) / 1e4); C.child('c').assert(near(D2(S, 10), 6, 1e-3), 'S″(10) = 6'); C.child('c').model([m.y, 6]); C.child('cii').assert(near(500 / (m.x * m.x), 5), 'h = 5'); C.child('cii').model([5, 10]); });

caseQ('c04', {
  passage: r`At a crossroads outside Nagpur, a car leaves the junction going north at $15$ m/s. At the same instant a lorry leaves the junction going east at $20$ m/s. Both move in straight lines at constant speed. Let $t$ be the time in seconds after they leave.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $100$ m. (b) $25$ m/s. (c) (i) $1200$ m$^2$/s at $t = 4$. Or (ii) $t = 6$ s.`,
  sol: r`(a) At $t = 4$: legs $60$ and $80$, distance $100$. (b) $s = 25t$, so $\dfrac{ds}{dt} = 25$. (c) (i) $A = 150t^2$, $\dfrac{dA}{dt} = 300t = 1200$. (ii) $300t = 1800$ gives $t = 6$.`,
  children: [
    child('a', mk.mcq({ stem: 'The distance between the car and the lorry after 4 seconds is', opts: ['$100$ m', '$140$ m', '$80$ m', '$60$ m'], key: 'a', sol: r`Car $15 \times 4 = 60$ m north, lorry $20 \times 4 = 80$ m east: distance $\sqrt{60^2 + 80^2} = 100$ m. Option (b) adds the two legs.`, d: 1, c: 'understanding', t: [1], time: 60 })),
    child('b', mk.num({ stem: 'At what rate (in m/s) is the distance between them increasing?', value: 25, unit: 'm/s', sol: r`$s = \sqrt{(15t)^2 + (20t)^2} = 25t$, so $\dfrac{ds}{dt} = 25$ m/s at every instant.`, scheme: [['25', 1]], d: 2, c: 'application', t: [1], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** The junction, the car and the lorry form a right triangle. Find the rate at which its area is increasing 4 seconds after they leave.', model: r`$A = \dfrac12(15t)(20t) = 150t^2$, so $\dfrac{dA}{dt} = 300t$. At $t = 4$: $\dfrac{dA}{dt} = 1200$ m$^2$/s.`, sol: 'Area of the right triangle as a function of time, then differentiate.', scheme: [['A = 150t²', 1], ['1200 m²/s', 1]], d: 2, c: 'application', t: [1], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** After how many seconds is the area of that triangle increasing at 1800 m² per second?', model: r`$A = \dfrac12(15t)(20t) = 150t^2$ and $\dfrac{dA}{dt} = 300t$. Setting $300t = 1800$ gives $t = 6$ seconds.`, sol: 'Differentiate the area and solve for t.', scheme: [['dA/dt = 300t', 1], ['t = 6 s', 1]], d: 2, c: 'application', t: [1], time: 120 }),
    ]),
  ],
}, (C) => { const s = (t) => Math.hypot(15 * t, 20 * t); C.child('a').which([100, 140, 80, 60], s(4)); C.child('b').val(D(s, 4), 1e-6); const A = (t) => 0.5 * 15 * t * 20 * t; C.child('c').model([D(A, 4)]); C.child('cii').assert(near(D(A, 6), 1800), 't = 6'); C.child('cii').model([6]); });

caseQ('c05', {
  passage: r`A start-up in Bengaluru tracks the number of active users of its new study app. For the first $8$ months it is modelled by $N(t) = t^3 - 12t^2 + 45t$ (in thousands), where $t$ is the time in months, $0 \le t \le 8$.`,
  d: 4, c: 'analysis',
  model: r`(a) Option (a): $N'(t) = 3(t - 3)(t - 5)$. (b) $t = 3$. (c) (i) Decreasing on $(3, 5)$; users fall by $4$ thousand. Or (ii) Absolute maximum $104$ thousand at $t = 8$.`,
  sol: r`(a) $N'(t) = 3t^2 - 24t + 45 = 3(t - 3)(t - 5)$. (b) $N'$ changes $+$ to $-$ at $3$. (c) (i) $N(3) - N(5) = 54 - 50 = 4$. (ii) Compare $N(0) = 0$, $N(3) = 54$, $N(5) = 50$, $N(8) = 104$.`,
  children: [
    child('a', mk.mcq({ stem: r`$N'(t)$ equals`, opts: [r`$3(t - 3)(t - 5)$`, r`$3(t + 3)(t + 5)$`, r`$(t - 3)(t - 5)$`, r`$3(t - 1)(t - 15)$`], key: 'a', sol: r`$N'(t) = 3t^2 - 24t + 45 = 3(t^2 - 8t + 15) = 3(t - 3)(t - 5)$.`, d: 2, c: 'understanding', t: [2], time: 60 })),
    child('b', mk.num({ stem: 'In which month t does the number of active users reach a local maximum?', value: 3, sol: r`$N'(t)$ is positive before $t = 3$ and negative just after, so $t = 3$ gives a local maximum.`, scheme: [['3', 1]], d: 2, c: 'application', t: [3], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** During which period are active users decreasing, and by how many thousand do they fall over that period?', model: r`$N'(t) < 0$ for $3 < t < 5$, so users decrease on $(3, 5)$. $N(3) = 27 - 108 + 135 = 54$ and $N(5) = 125 - 300 + 225 = 50$, a fall of $4$ thousand.`, sol: 'Sign of the derivative between its zeros, then compare values.', scheme: [['Decreasing on (3, 5)', 1], ['Fall of 4 thousand', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the greatest number of active users during the first 8 months, and when it occurs.', model: r`Compare the end points and critical points: $N(0) = 0$, $N(3) = 54$, $N(5) = 50$, $N(8) = 512 - 768 + 360 = 104$. The greatest is $104$ thousand, at $t = 8$ months (the local maximum at $t = 3$ is not the absolute maximum).`, sol: 'Closed interval method on [0, 8].', scheme: [['All four values', 1], ['104 thousand at t = 8', 1]], d: 3, c: 'analysis', t: [3], time: 150 }),
    ]),
  ],
}, (C) => { const N = (t) => t ** 3 - 12 * t * t + 45 * t; const tp = turning(N, 0, 8); C.child('a').assert(near(D(N, 6), 3 * 3 * 1), 'N′(6) = 9'); C.child('a').key('a'); C.child('b').val(Math.round(tp.find((p) => p.type === 'max').x * 1e4) / 1e4); C.child('c').assert(mono(N, 3, 5) === -1, 'dec (3, 5)'); C.child('c').model([N(3), N(5), N(3) - N(5)]); const m = extremum(N, 0, 8, 'max'); C.child('cii').model([Math.round(m.y), 8]); });

export { P, S3 };

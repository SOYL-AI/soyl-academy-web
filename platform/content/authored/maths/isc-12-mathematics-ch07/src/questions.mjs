// ISC 12 Mathematics ch07 Applications of Derivatives — practice bank with independent re-solve checks.
// Every rate, slope, tangent or normal, angle between curves and extremum is re-derived numerically here
// (central differences for derivatives, dense sampling plus refinement for extrema), never copied from the text.
// All set-ups are SOYL's own (D-036) and differ from the CBSE 12 ch06 bank. ISC keeps tangents, normals and the
// angle between two curves (t03).
import { Q, mk } from '../../isc-12-mathematics-ch01/src/lib.mjs';
/** String.raw, except that a backslash-n not followed by a lower-case letter becomes a newline. */
const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

export const P = Math.PI;
/** Central-difference first and second derivatives. */
export const D = (g, x, h = 1e-5) => (g(x + h) - g(x - h)) / (2 * h);
export const D2 = (g, x, h = 1e-4) => (g(x + h) - 2 * g(x) + g(x - h)) / (h * h);
export const close = (a, b, t = 1e-5) => Math.abs(a - b) <= t * Math.max(1, Math.abs(b));
export const grid = (a, b, n = 400) => Array.from({ length: n + 1 }, (_, k) => a + ((b - a) * k) / n);
/** f' > 0 at interior sample points of (a, b) (strictly increasing, isolated zeros of f' allowed only where noted). */
export const incOn = (g, a, b) => grid(a, b, 300).slice(1, -1).every((x) => D(g, x) > 0);
export const decOn = (g, a, b) => grid(a, b, 300).slice(1, -1).every((x) => D(g, x) < 0);
/** Absolute max / min of g on [a, b] by dense sampling and golden-section refinement. */
export function extremeOn(g, a, b, kind = 'max') {
  const s = kind === 'max' ? 1 : -1;
  const xs = grid(a, b, 20000);
  let best = xs[0];
  for (const x of xs) if (s * g(x) > s * g(best)) best = x;
  let lo = Math.max(a, best - (b - a) / 20000), hi = Math.min(b, best + (b - a) / 20000);
  for (let i = 0; i < 100; i++) {
    const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
    if (s * g(m1) < s * g(m2)) lo = m1; else hi = m2;
  }
  const x = (lo + hi) / 2;
  return { x, v: g(x) };
}
/** Local extremum test: f' changes sign at c (returns 'max', 'min' or 'none'). */
export function kindAt(g, c, h = 1e-3) {
  const l = D(g, c - h), rr = D(g, c + h);
  if (l > 0 && rr < 0) return 'max';
  if (l < 0 && rr > 0) return 'min';
  return 'none';
}
/** Acute angle between two curves with slopes m1, m2 at a common point: tan(theta). */
export const tanAngle = (m1, m2) => (1 + m1 * m2 === 0 ? Infinity : Math.abs((m1 - m2) / (1 + m1 * m2)));

// =============================================================== MCQ — t01 rate of change
Q('m01', mk.mcq({ stem: r`After a pebble falls into a still tank at an imagined Hampi stepwell, the radius of the ripple grows at $3$ cm/s. How fast is the area inside the ripple growing when the radius is $10$ cm?`, opts: [r`$60\pi$ cm$^2$/s`, r`$30\pi$ cm$^2$/s`, r`$20\pi$ cm$^2$/s`, r`$600\pi$ cm$^2$/s`], key: 'a', sol: r`$A = \pi r^2$, so $\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt} = 2\pi(10)(3) = 60\pi$ cm$^2$/s. Option (d) is $\pi r^2 \times 6$, which is not a rate.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([60 * P, 30 * P, 20 * P, 600 * P], 2 * P * 10 * 3));
Q('m02', mk.mcq({ stem: r`A cube of jaggery in an imagined Kolhapur store is being moulded so that its volume rises at $12$ cm$^3$/s. At the moment the edge is $2$ cm, the edge grows at`, opts: ['$1$ cm/s', '$2$ cm/s', r`$\dfrac13$ cm/s`, '$3$ cm/s'], key: 'a', sol: r`$V = x^3 \Rightarrow \dfrac{dV}{dt} = 3x^2\dfrac{dx}{dt}$, so $12 = 3(2)^2\dfrac{dx}{dt}$ and $\dfrac{dx}{dt} = 1$ cm/s.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([1, 2, 1 / 3, 3], 12 / (3 * 2 * 2)));
const cJar = (x) => 0.5 * x * x + 30 * x + 200;
Q('m03', mk.mcq({ stem: r`An imagined Kutch pickle unit has daily cost $C(x) = 0.5x^2 + 30x + 200$ rupees for $x$ jars. Its marginal cost when $40$ jars are made is`, opts: ['₹$70$', '₹$2200$', '₹$40$', '₹$110$'], key: 'a', sol: r`Marginal cost is $C'(x) = x + 30$, so $C'(40) = 70$ rupees per jar. ₹$2200$ is the total cost $C(40)$, not the marginal cost.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => { C.which([70, 2200, 40, 110], Math.round(D(cJar, 40) * 1e6) / 1e6); C.assert(close(cJar(40), 2200), 'C(40) = 2200'); });
Q('m04', mk.mcq({ stem: r`A festival balloon in an imagined Ahmedabad kite market is inflated so that its radius grows at $0.5$ cm/s. When the radius is $6$ cm, its surface area grows at`, opts: [r`$24\pi$ cm$^2$/s`, r`$48\pi$ cm$^2$/s`, r`$12\pi$ cm$^2$/s`, r`$144\pi$ cm$^2$/s`], key: 'a', sol: r`$S = 4\pi r^2 \Rightarrow \dfrac{dS}{dt} = 8\pi r\dfrac{dr}{dt} = 8\pi(6)(0.5) = 24\pi$ cm$^2$/s. Option (d) is the area itself, $4\pi(6)^2$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([24 * P, 48 * P, 12 * P, 144 * P], 8 * P * 6 * 0.5));

// =============================================================== MCQ — t02 increasing and decreasing
const f05 = (x) => x ** 3 - 12 * x;
Q('m05', mk.mcq({ stem: r`On which interval is $f(x) = x^3 - 12x$ strictly decreasing?`, opts: ['$(-2, 2)$', r`$(-\infty, -2)$`, r`$(2, \infty)$`, r`$(-\infty, \infty)$`], key: 'a', sol: r`$f'(x) = 3x^2 - 12 = 3(x - 2)(x + 2)$, which is negative exactly when $-2 < x < 2$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([decOn(f05, -2, 2), decOn(f05, -10, -2), decOn(f05, 2, 10), decOn(f05, -10, 10)], true));
const f06 = (x) => Math.exp(x) + Math.exp(-x);
Q('m06', mk.mcq({ stem: r`The hanging-chain function $f(x) = e^x + e^{-x}$ is strictly decreasing on`, opts: [r`$(-\infty, 0)$`, r`$(0, \infty)$`, r`$(-\infty, \infty)$`, 'no interval'], key: 'a', sol: r`$f'(x) = e^x - e^{-x}$ is negative when $e^x < e^{-x}$, i.e. when $x < 0$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([decOn(f06, -6, 0), decOn(f06, 0, 6), decOn(f06, -6, 6), !decOn(f06, -6, 0) && !decOn(f06, 0, 6)], true));
const f07 = (x) => Math.log(x) - x;
Q('m07', mk.mcq({ stem: r`For $x > 0$, the function $f(x) = \ln x - x$ rises on the interval`, opts: ['$(0, 1)$', r`$(1, \infty)$`, '$(0, e)$', r`$(e, \infty)$`], key: 'a', sol: r`$f'(x) = \dfrac1x - 1 = \dfrac{1 - x}{x} > 0$ exactly when $0 < x < 1$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([incOn(f07, 1e-3, 1), incOn(f07, 1, 20), incOn(f07, 1e-3, Math.E), incOn(f07, Math.E, 20)], true));
const f08 = (x) => 2 * x + Math.cos(x);
Q('m08', mk.mcq({ stem: r`An imagined pendulum clock's error grows like $f(x) = 2x + \cos x$. Which statement about $f$ on $\mathbb{R}$ is true?`, opts: [r`It is strictly increasing on $\mathbb{R}$`, r`It is strictly decreasing on $\mathbb{R}$`, r`It increases only on $(0, \pi)$`, 'It is neither increasing nor decreasing'], key: 'a', sol: r`$f'(x) = 2 - \sin x \ge 1 > 0$ for every $x$, so $f$ is strictly increasing everywhere.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([incOn(f08, -20, 20), decOn(f08, -20, 20), incOn(f08, 0, P) && !incOn(f08, -20, 20), !incOn(f08, -20, 20) && !decOn(f08, -20, 20)], true));
Q('m09', mk.mcq({ stem: r`For some constant $k$, the quadratic $f(x) = x^2 + kx + 7$ falls on $(-\infty, 2)$ and rises on $(2, \infty)$. The value of $k$ is`, opts: ['$-4$', '$4$', '$-2$', '$2$'], key: 'a', sol: r`The turn is where $f'(x) = 2x + k = 0$, i.e. $x = -\dfrac k2$. Setting $-\dfrac k2 = 2$ gives $k = -4$.`, d: 2, c: 'application', t: [2], time: 60 }), (C) => C.which([-4, 4, -2, 2].map((k) => decOn((x) => x * x + k * x + 7, -10, 2) && incOn((x) => x * x + k * x + 7, 2, 10)), true));
const f26 = (x) => Math.atan(x) - x;
Q('m26', mk.mcq({ stem: r`The function $f(x) = \tan^{-1} x - x$ is, on the whole real line,`, opts: ['decreasing', 'increasing', 'constant', 'increasing for $x < 0$ and decreasing for $x > 0$'], key: 'a', sol: r`$f'(x) = \dfrac{1}{1 + x^2} - 1 = -\dfrac{x^2}{1 + x^2} \le 0$, with equality only at $x = 0$, so $f$ decreases on $\mathbb{R}$.`, d: 3, c: 'application', t: [2], time: 75 }), (C) => {
  const left = decOn(f26, -10, -1e-3), right = decOn(f26, 1e-3, 10);
  C.which([left && right, incOn(f26, -10, 10), Math.abs(D(f26, 1)) < 1e-9, incOn(f26, -10, -1e-3) && right], true);
});

// =============================================================== MCQ — t03 tangents, normals, angle between curves
const c10 = (x) => x ** 3 - 2 * x;
Q('m10', mk.mcq({ stem: r`What is the slope of the tangent to the cubic $y = x^3 - 2x$ at the point where $x = 2$?`, opts: ['$10$', '$4$', '$12$', r`$-\dfrac1{10}$`], key: 'a', sol: r`$\dfrac{dy}{dx} = 3x^2 - 2 = 3(4) - 2 = 10$. The value $4$ is $y(2)$, and $-\dfrac1{10}$ is the slope of the normal.`, d: 1, c: 'understanding', t: [3], time: 45 }), (C) => C.which([10, 4, 12, -1 / 10], D(c10, 2)));
Q('m11', mk.mcq({ stem: r`At $(1, 5)$ on the parabola $y = 2x^2 + 3$, the normal has slope`, opts: [r`$-\dfrac14$`, '$4$', r`$\dfrac14$`, '$-4$'], key: 'a', sol: r`The tangent slope is $4x = 4$ at $x = 1$; the normal is perpendicular, so its slope is $-\dfrac14$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => C.which([-1 / 4, 4, 1 / 4, -4], -1 / D((x) => 2 * x * x + 3, 1)));
const c12 = (x) => x * x - 4 * x + 5;
Q('m12', mk.mcq({ stem: r`A cycle track at an imagined Pune park follows $y = x^2 - 4x + 5$. At which point of this curve is the tangent parallel to the $x$-axis?`, opts: ['$(2, 1)$', '$(0, 5)$', '$(1, 2)$', '$(4, 5)$'], key: 'a', sol: r`Parallel to the $x$-axis means slope $0$: $2x - 4 = 0$, $x = 2$, $y = 4 - 8 + 5 = 1$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([[2, 1], [0, 5], [1, 2], [4, 5]].map(([x, y]) => close(c12(x), y) && Math.abs(D(c12, x)) < 1e-6), true));
Q('m13', mk.mcq({ stem: r`Which line touches the parabola $y = x^2$ at the point $(3, 9)$?`, opts: ['$y = 6x - 9$', '$y = 6x + 9$', '$y = 9x - 18$', '$y = 3x$'], key: 'a', sol: r`Slope $2x = 6$ at $x = 3$; the tangent is $y - 9 = 6(x - 3)$, i.e. $y = 6x - 9$. Check: at $x = 3$ it gives $9$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([[6, -9], [6, 9], [9, -18], [3, 0]].map(([m, c]) => close(m, D((x) => x * x, 3)) && close(3 * m + c, 9)), true));
Q('m14', mk.mcq({ stem: r`The rectangular hyperbola $xy = 4$ and the circle $x^2 + y^2 = 8$ meet at $(2, 2)$. The angle between them there is`, opts: ['$0$ (they touch)', r`$\dfrac\pi2$`, r`$\dfrac\pi4$`, r`$\dfrac\pi3$`], key: 'a', sol: r`For $xy = 4$, $\dfrac{dy}{dx} = -\dfrac yx = -1$; for the circle, $\dfrac{dy}{dx} = -\dfrac xy = -1$. Equal slopes give a zero angle: the curves touch at $(2, 2)$.`, d: 3, c: 'analysis', t: [3], time: 90 }), (C) => {
  const m1 = D((x) => 4 / x, 2), m2 = D((x) => Math.sqrt(8 - x * x), 2);
  C.which([0, P / 2, P / 4, P / 3], Math.atan(tanAngle(m1, m2)));
});
Q('m15', mk.mcq({ stem: r`The curves $y = x^2$ and $y = x^3$ meet at $(1, 1)$. The acute angle between them at this point is`, opts: [r`$\tan^{-1}\dfrac17$`, r`$\tan^{-1}\dfrac15$`, r`$\dfrac\pi4$`, r`$\tan^{-1} 7$`], key: 'a', sol: r`Slopes at $x = 1$: $m_1 = 2$, $m_2 = 3$. $\tan\theta = \left|\dfrac{3 - 2}{1 + 6}\right| = \dfrac17$, so $\theta = \tan^{-1}\dfrac17$.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => C.which([Math.atan(1 / 7), Math.atan(1 / 5), P / 4, Math.atan(7)], Math.atan(tanAngle(D((x) => x * x, 1), D((x) => x ** 3, 1)))));
Q('m16', mk.mcq({ stem: r`On the curve $y = x^3$, find every point at which the slope of the tangent equals the $y$-coordinate of the point.`, opts: ['$(0, 0)$ and $(3, 27)$', '$(3, 27)$ only', '$(0, 0)$ only', '$(1, 1)$ and $(3, 27)$'], key: 'a', sol: r`We need $3x^2 = x^3$, i.e. $x^2(x - 3) = 0$, so $x = 0$ or $x = 3$: the points $(0, 0)$ and $(3, 27)$.`, d: 3, c: 'analysis', t: [3], time: 90 }), (C) => {
  const ok = (x) => Math.abs(D((t) => t ** 3, x) - x ** 3) < 1e-6;
  C.which([[0, 3], [3], [0], [1, 3]].map((s) => s.every(ok) && [0, 3].every((x) => s.includes(x))), true);
});

// =============================================================== MCQ — t04 local extrema
const f17 = (x) => x ** 3 - 6 * x * x + 9 * x + 2;
Q('m17', mk.mcq({ stem: r`The local maximum value of the cubic $f(x) = x^3 - 6x^2 + 9x + 2$ is`, opts: ['$6$', '$2$', '$1$', '$3$'], key: 'a', sol: r`$f'(x) = 3(x - 1)(x - 3)$; $f'$ changes from $+$ to $-$ at $x = 1$, so the local maximum value is $f(1) = 1 - 6 + 9 + 2 = 6$. The value $2$ is the local minimum $f(3)$.`, d: 2, c: 'understanding', t: [4], time: 75 }), (C) => { C.assert(kindAt(f17, 1) === 'max' && kindAt(f17, 3) === 'min', 'max at 1, min at 3'); C.which([6, 2, 1, 3], f17(1)); });
const f18 = (x) => x ** 4;
Q('m18', mk.mcq({ stem: r`For $f(x) = x^4$ at the stationary point $x = 0$, which statement is correct?`, opts: [r`$f''(0) = 0$, so the second derivative test fails, yet $f$ has a local minimum at $0$`, r`$f$ has a local maximum at $0$`, r`$f$ has no extremum at $0$ because $f''(0) = 0$`, r`$f''(0) > 0$, so the test shows a minimum`], key: 'a', sol: r`$f''(x) = 12x^2$ gives $f''(0) = 0$: the test is silent. But $f'(x) = 4x^3$ changes from negative to positive at $0$, so $f(0) = 0$ is a local minimum.`, d: 3, c: 'analysis', t: [4], time: 75 }), (C) => { C.assert(Math.abs(D2(f18, 0)) < 1e-6 && kindAt(f18, 0, 0.01) === 'min', 'f\'\'(0) = 0 and a minimum'); C.key('a'); });
const f19 = (x) => Math.abs(x - 2) + 1;
Q('m19', mk.mcq({ stem: r`For $f(x) = |x - 2| + 1$, which statement about the point $x = 2$ is true?`, opts: [r`It is a critical point where $f'$ does not exist, and $f$ has its least value $1$ there`, r`$f'(2) = 0$ and $f$ has a local maximum there`, r`$f$ is differentiable at $2$ with a local minimum`, 'It is not a critical point'], key: 'a', sol: r`The left derivative is $-1$ and the right derivative is $+1$, so $f'(2)$ does not exist; $f$ falls before $2$ and rises after, giving the least value $f(2) = 1$.`, d: 3, c: 'analysis', t: [4], time: 75 }), (C) => {
  const lhd = (f19(2) - f19(2 - 1e-6)) / 1e-6, rhd = (f19(2 + 1e-6) - f19(2)) / 1e-6;
  C.assert(close(lhd, -1) && close(rhd, 1) && kindAt(f19, 2, 0.01) === 'min' && f19(2) === 1, 'corner minimum 1');
  C.key('a');
});
const f20 = (x) => x + 9 / x;
Q('m20', mk.mcq({ stem: r`For $x > 0$, the local minimum value of $f(x) = x + \dfrac9x$ is`, opts: ['$6$', '$3$', '$-6$', '$10$'], key: 'a', sol: r`$f'(x) = 1 - \dfrac{9}{x^2} = 0$ gives $x = 3$; $f''(3) = \dfrac{18}{27} > 0$, so the minimum value is $3 + 3 = 6$.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => { const m = extremeOn(f20, 0.5, 20, 'min'); C.assert(close(m.x, 3, 1e-4), 'x = 3'); C.which([6, 3, -6, 10], m.v); });
const f21 = (x) => x * Math.exp(x);
Q('m21', mk.mcq({ stem: r`The function $f(x) = xe^x$ has a local minimum. Its local minimum value is`, opts: [r`$-\dfrac1e$`, '$-1$', '$e$', '$0$'], key: 'a', sol: r`$f'(x) = e^x(1 + x) = 0$ at $x = -1$, where $f'$ changes from $-$ to $+$. The value is $f(-1) = -\dfrac1e$.`, d: 3, c: 'understanding', t: [4], time: 75 }), (C) => { C.assert(kindAt(f21, -1) === 'min', 'min at -1'); C.which([-1 / Math.E, -1, Math.E, 0], f21(-1)); });
const f25 = (x) => x ** 3 - 3 * x * x + 3 * x;
Q('m25', mk.mcq({ stem: r`How many points of local extremum does $f(x) = x^3 - 3x^2 + 3x$ have?`, opts: ['$0$', '$1$', '$2$', '$3$'], key: 'a', sol: r`$f'(x) = 3(x - 1)^2 \ge 0$: the only stationary point $x = 1$ is not an extremum, because $f'$ does not change sign there.`, d: 3, c: 'analysis', t: [4], time: 75 }), (C) => {
  const crit = grid(-5, 5, 2000).filter((x) => Math.abs(D(f25, x)) < 1e-3);
  C.assert(crit.length && crit.every((x) => Math.abs(x - 1) < 0.05), 'only stationary point near 1');
  C.which([0, 1, 2, 3], [1].filter((c) => kindAt(f25, c, 0.01) !== 'none').length);
});

// =============================================================== MCQ — t05, t06 absolute extrema and optimisation
const f22 = (x) => x ** 3 - 3 * x;
Q('m22', mk.mcq({ stem: r`On the closed interval $[0, 2]$, what is the greatest value of $f(x) = x^3 - 3x$?`, opts: ['$2$', '$0$', '$-2$', '$8$'], key: 'a', sol: r`$f'(x) = 3(x^2 - 1) = 0$ at $x = 1$ in the interval. Compare $f(0) = 0$, $f(1) = -2$, $f(2) = 2$: the greatest is $2$, at the end point $x = 2$.`, d: 2, c: 'understanding', t: [5], time: 75 }), (C) => C.which([2, 0, -2, 8], extremeOn(f22, 0, 2, 'max').v));
const f23 = (x) => 2 * Math.cos(x) + x;
Q('m23', mk.mcq({ stem: r`The least value of $f(x) = 2\cos x + x$ on $[0, \pi]$ is`, opts: [r`$\dfrac{5\pi}{6} - \sqrt3$`, r`$\pi - 2$`, '$2$', r`$\dfrac\pi6 + \sqrt3$`], key: 'a', sol: r`$f'(x) = 1 - 2\sin x = 0$ at $x = \dfrac\pi6, \dfrac{5\pi}6$. Values: $f(0) = 2$, $f\left(\tfrac\pi6\right) = \sqrt3 + \tfrac\pi6 \approx 2.26$, $f\left(\tfrac{5\pi}6\right) = \tfrac{5\pi}6 - \sqrt3 \approx 0.89$, $f(\pi) = \pi - 2 \approx 1.14$. The least is $\dfrac{5\pi}{6} - \sqrt3$.`, d: 4, c: 'analysis', t: [5], time: 120 }), (C) => C.which([5 * P / 6 - Math.sqrt(3), P - 2, 2, P / 6 + Math.sqrt(3)], extremeOn(f23, 0, P, 'min').v));
Q('m24', mk.mcq({ stem: r`Among all rectangular photo frames with perimeter $36$ cm, the one with the greatest area encloses`, opts: [r`$81$ cm$^2$`, r`$72$ cm$^2$`, r`$80$ cm$^2$`, r`$324$ cm$^2$`], key: 'a', sol: r`With sides $x$ and $18 - x$, $A = x(18 - x)$ and $A'(x) = 18 - 2x = 0$ at $x = 9$: a square of side $9$, area $81$ cm$^2$.`, d: 2, c: 'application', t: [6], time: 60 }), (C) => C.which([81, 72, 80, 324], extremeOn((x) => x * (18 - x), 0, 18, 'max').v));

// =============================================================== assertion-reason
const f_ar1 = (x) => x + 1 / x;
Q('ar1', mk.ar({ a: r`$f(x) = x + \dfrac1x$ is strictly decreasing on $(0, 1)$.`, r: r`$f'(x) = 1 - \dfrac1{x^2} < 0$ for $0 < x < 1$.`, key: 'a', sol: r`For $0 < x < 1$, $x^2 < 1$, so $\dfrac1{x^2} > 1$ and $f'(x) < 0$: R is true and it is exactly why A holds.`, d: 2, c: 'analysis', t: [2] }), (C) => { C.assert(decOn(f_ar1, 0.01, 1), 'decreasing on (0, 1)'); C.key('a'); });
Q('ar2', mk.ar({ a: r`The tangent to $y = x^3$ at the origin is the $x$-axis.`, r: r`For $y = x^3$, $\dfrac{dy}{dx} = 0$ at $x = 0$.`, key: 'a', sol: r`The tangent at $(0, 0)$ has slope $3(0)^2 = 0$, so it is $y = 0$, the $x$-axis. R gives that zero slope, so it explains A.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(Math.abs(D((x) => x ** 3, 0)) < 1e-9, 'slope 0'); C.key('a'); });
Q('ar3', mk.ar({ a: r`The parabolas $y = x^2$ and $x = y^2$ meet at $(1, 1)$ at the angle $\tan^{-1}\dfrac34$.`, r: r`At $(1, 1)$ the product of the slopes of the two parabolas is $1$.`, key: 'b', sol: r`Slopes at $(1, 1)$: $2$ for $y = x^2$ and $\dfrac12$ for $x = y^2$ (from $2y\,y' = 1$). Then $\tan\theta = \left|\dfrac{2 - \frac12}{1 + 1}\right| = \dfrac34$, so A is true; their product is $1$, so R is true, but a product of $1$ does not by itself give the angle, so R does not explain A.`, d: 3, c: 'analysis', t: [3] }), (C) => {
  const m1 = D((x) => x * x, 1), m2 = D((x) => Math.sqrt(x), 1);
  C.assert(close(tanAngle(m1, m2), 0.75) && close(m1 * m2, 1), 'tan = 3/4, product 1');
  C.key('b');
});
const f_ar4 = (x) => x ** 3;
Q('ar4', mk.ar({ a: r`$f(x) = x^3$ has no local extremum at $x = 0$, although $f'(0) = 0$.`, r: r`$f'(x) = 3x^2$ does not change sign as $x$ passes through $0$.`, key: 'a', sol: r`$f'$ is positive on both sides of $0$, so $f$ keeps rising through $0$: no maximum or minimum there. The unchanged sign in R is the reason.`, d: 2, c: 'analysis', t: [4] }), (C) => { C.assert(kindAt(f_ar4, 0, 0.01) === 'none' && Math.abs(D(f_ar4, 0)) < 1e-9, 'no extremum'); C.key('a'); });
Q('ar5', mk.ar({ a: r`A function continuous on a closed interval $[a, b]$ attains an absolute maximum on it.`, r: r`Every critical point of a function gives its absolute maximum.`, key: 'c', sol: r`A is the extreme value property of continuous functions on closed intervals. R is false: a critical point can be a minimum or neither, and the absolute maximum may sit at an end point.`, d: 2, c: 'understanding', t: [5] }), (C) => { C.assert(kindAt((x) => x * x, 0) === 'min', 'a critical point that is a minimum'); C.key('c'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`True or false: if $f'(x) > 0$ at every point of an open interval, then $f$ is strictly increasing on that interval.`, key: 't', sol: r`This is the derivative test for monotonicity: a positive derivative throughout an interval makes $f$ strictly increasing there.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(incOn((x) => x ** 3 + x, -5, 5), 'example x^3 + x'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`True or false: if $f$ is strictly increasing on an interval, then $f'(x) > 0$ at every point of that interval.`, key: 'f', sol: r`$f(x) = x^3$ is strictly increasing on $\mathbb{R}$, yet $f'(0) = 0$. A strictly increasing function may have isolated points where the derivative is zero.`, d: 3, c: 'analysis', t: [2] }), (C) => { C.assert(Math.abs(D((x) => x ** 3, 0)) < 1e-9 && grid(-5, 5, 200).every((x, i, a) => i === 0 || a[i - 1] ** 3 < x ** 3), 'x^3 counterexample'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`True or false: the normal to the parabola $y = x^2$ at $(1, 1)$ passes through the point $(-1, 2)$.`, key: 't', sol: r`The tangent slope at $(1, 1)$ is $2$, so the normal is $y - 1 = -\dfrac12(x - 1)$. At $x = -1$: $y = 1 + 1 = 2$. So $(-1, 2)$ is on it.`, d: 2, c: 'understanding', t: [3] }), (C) => { const m = -1 / D((x) => x * x, 1); C.assert(close(1 + m * (-1 - 1), 2), 'normal passes (-1, 2)'); C.key('t'); });

// =============================================================== fill in the blank
const f_fb1 = (x) => x * Math.exp(-x);
Q('fb1', mk.fill({ stem: r`The function $f(x) = xe^{-x}$ is strictly increasing on the interval $(-\infty, k)$, where the greatest such $k$ is ____.`, acc: [['1']], sol: r`$f'(x) = e^{-x}(1 - x) > 0$ exactly when $x < 1$, so $k = 1$.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(incOn(f_fb1, -5, 1) && D(f_fb1, 1.01) < 0, 'turns at 1'); C.blank(1); });
Q('fb2', mk.fill({ stem: r`The rate of change of the area of a circle with respect to its radius, at radius $5$ cm, is ____ $\pi$ cm$^2$ per cm.`, acc: [['10']], sol: r`$\dfrac{dA}{dr} = 2\pi r = 10\pi$ at $r = 5$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(D((rr) => P * rr * rr, 5) / P));
Q('fb3', mk.fill({ stem: r`The least value taken by the quadratic $x^2 - 8x + 20$ over all real $x$ is ____.`, acc: [['4']], sol: r`$x^2 - 8x + 20 = (x - 4)^2 + 4$, so the least value is $4$, at $x = 4$.`, d: 1, c: 'understanding', t: [4] }), (C) => C.blank(extremeOn((x) => x * x - 8 * x + 20, -20, 20, 'min').v));

// =============================================================== numerical
Q('n01', mk.num({ stem: r`A painter's $5$ m ladder leans against a warehouse wall in an imagined part of Kochi. Its foot slides away from the wall at $0.6$ m/s. How fast (in m/s) is the top sliding down when the foot is $3$ m from the wall?`, value: 0.45, sol: r`$x^2 + y^2 = 25$; when $x = 3$, $y = 4$. Differentiating, $x\dfrac{dx}{dt} + y\dfrac{dy}{dt} = 0$, so $\dfrac{dy}{dt} = -\dfrac{3(0.6)}{4} = -0.45$. The top slides down at $0.45$ m/s.`, scheme: [['0.45 m/s', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => {
  const y = (t) => Math.sqrt(25 - (3 + 0.6 * t) ** 2);
  C.val(-D(y, 0));
});
Q('n02', mk.num({ stem: r`The side of a square floor tile being stretched in a kiln test grows at $0.2$ cm/s. At what rate (in cm$^2$/s) is its area growing when the side is $15$ cm?`, value: 6, sol: r`$A = s^2 \Rightarrow \dfrac{dA}{dt} = 2s\dfrac{ds}{dt} = 2(15)(0.2) = 6$ cm$^2$/s.`, scheme: [['6 cm²/s', 1]], d: 1, c: 'understanding', t: [1], time: 60 }), (C) => C.val(D((t) => (15 + 0.2 * t) ** 2, 0)));
const c_n03 = (x) => x * x - 3 * x + 2;
Q('n03', mk.num({ stem: r`The normal to the curve $y = x^2 - 3x + 2$ at the point where $x = 3$ meets the $x$-axis at $(a, 0)$. Find $a$.`, value: 9, sol: r`At $x = 3$, $y = 2$ and the slope is $2x - 3 = 3$. The normal is $y - 2 = -\dfrac13(x - 3)$; with $y = 0$, $x - 3 = 6$, so $a = 9$.`, scheme: [['a = 9', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => { const m = -1 / D(c_n03, 3); C.val(3 + (0 - c_n03(3)) / m); });
const f_n04 = (x) => x ** 3 - 9 * x * x + 24 * x + 5;
Q('n04', mk.num({ stem: r`Find the local minimum value of the cubic $f(x) = x^3 - 9x^2 + 24x + 5$.`, value: 21, sol: r`$f'(x) = 3(x - 2)(x - 4)$. At $x = 4$, $f'$ changes from $-$ to $+$, so the local minimum value is $f(4) = 64 - 144 + 96 + 5 = 21$. (The local maximum is $f(2) = 25$.)`, scheme: [['21', 1]], d: 2, c: 'understanding', t: [4], time: 120 }), (C) => { C.assert(kindAt(f_n04, 4) === 'min' && kindAt(f_n04, 2) === 'max', 'kinds'); C.val(f_n04(4)); });
const f_n05 = (x) => 5 * Math.sin(x) + 12 * Math.cos(x);
Q('n05', mk.num({ stem: r`An imagined signal from a Bengaluru lab has strength $f(x) = 5\sin x + 12\cos x$ for $0 \le x \le \dfrac\pi2$. Find its greatest strength.`, value: 13, sol: r`$f'(x) = 5\cos x - 12\sin x = 0$ gives $\tan x = \dfrac5{12}$, inside the interval, where $\sin x = \dfrac5{13}$, $\cos x = \dfrac{12}{13}$: $f = \dfrac{25}{13} + \dfrac{144}{13} = 13$. The end values are $f(0) = 12$ and $f\left(\tfrac\pi2\right) = 5$, so the greatest is $13$.`, scheme: [['13', 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => C.val(extremeOn(f_n05, 0, P / 2, 'max').v, 1e-7));
Q('n06', mk.num({ stem: r`Positive numbers $x$ and $y$ satisfy $x + 2y = 10$. What is the greatest possible value of the product $xy$?`, value: 12.5, sol: r`$xy = (10 - 2y)y = 10y - 2y^2$; its derivative $10 - 4y = 0$ at $y = 2.5$, $x = 5$, and the second derivative $-4 < 0$. The greatest product is $5 \times 2.5 = 12.5$.`, scheme: [['12.5', 1]], d: 3, c: 'application', t: [6], time: 120 }), (C) => C.val(extremeOn((y) => (10 - 2 * y) * y, 0, 5, 'max').v, 1e-7));

// =============================================================== short answer (2 marks)
Q('s2a', mk.short({ marks: 2, stem: r`Oil leaking from an imagined tanker near Ennore spreads in a circular patch whose area grows at $40\pi$ m$^2$ per hour. How fast is the radius growing when it is $5$ m?`, model: r`$A = \pi r^2$, so $\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt}$.\n\n$40\pi = 2\pi(5)\dfrac{dr}{dt}$, hence $\dfrac{dr}{dt} = 4$ m per hour.`, sol: 'Differentiate the area with respect to time and substitute r = 5.', scheme: [['dA/dt = 2πr dr/dt', 1], ['4 m/h', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { C.assert(close(40 * P / (2 * P * 5), 4), 'dr/dt = 4'); C.model([4]); });
Q('s2b', mk.short({ marks: 2, stem: r`A street lamp in an imagined Mysuru lane is $6$ m high. A girl $1.5$ m tall walks straight away from the foot of the lamp at $1.2$ m/s. At what rate does her shadow lengthen?`, model: r`Let $x$ be her distance from the lamp and $s$ the shadow length. Similar triangles give $\dfrac{s}{1.5} = \dfrac{x + s}{6}$, so $4.5s = 1.5x$ and $s = \dfrac x3$.\n\nHence $\dfrac{ds}{dt} = \dfrac13\dfrac{dx}{dt} = \dfrac{1.2}{3} = 0.4$ m/s.`, sol: 'Relate s and x by similar triangles, then differentiate.', scheme: [['s = x/3 from similar triangles', 1], ['0.4 m/s', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
  const s = (t) => { const x = 2 + 1.2 * t; return (1.5 * x) / (6 - 1.5); };
  C.assert(close(D(s, 0), 0.4), 'ds/dt = 0.4');
  C.model([0.4]);
});
const f_s2c = (x) => x ** 3 - 3 * x * x + 3 * x - 100;
Q('s2c', mk.short({ marks: 2, stem: r`Show that the cubic $f(x) = x^3 - 3x^2 + 3x - 100$ is increasing on $\mathbb{R}$.`, model: r`$f'(x) = 3x^2 - 6x + 3 = 3(x - 1)^2 \ge 0$ for all real $x$.\n\nIt is zero only at the single point $x = 1$, so $f$ is (strictly) increasing on $\mathbb{R}$.`, sol: 'Write the derivative as a perfect square.', scheme: [["f'(x) = 3(x − 1)²", 1], ['≥ 0, zero only at x = 1, so increasing', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.assert(incOn(f_s2c, -10, 0.999) && incOn(f_s2c, 1.001, 10), 'increasing'); C.model(['3(x - 1)^2']); });
const c_s2d = (x) => 3 * x * x - x + 1;
Q('s2d', mk.short({ marks: 2, stem: r`Find the equation of the normal to the parabola $y = 3x^2 - x + 1$ at the point $(1, 3)$.`, model: r`$\dfrac{dy}{dx} = 6x - 1 = 5$ at $x = 1$, so the normal has slope $-\dfrac15$.\n\nNormal: $y - 3 = -\dfrac15(x - 1)$, i.e. $x + 5y - 16 = 0$.`, sol: 'Tangent slope first, then its negative reciprocal.', scheme: [['Tangent slope 5, normal slope −1/5', 1], ['x + 5y − 16 = 0', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => {
  const m = -1 / D(c_s2d, 1);
  C.assert(close(c_s2d(1), 3) && close(m, -0.2) && [0, 2, 6].every((x) => close(x + 5 * (3 + m * (x - 1)) - 16, 0)), 'normal x + 5y = 16');
  C.model(['x + 5y - 16 = 0']);
});
const f_s2e = (x) => Math.sin(x) + Math.cos(x);
Q('s2e', mk.short({ marks: 2, stem: r`Using the second derivative test, find the local maximum value of $f(x) = \sin x + \cos x$ in the interval $\left(0, \dfrac\pi2\right)$.`, model: r`$f'(x) = \cos x - \sin x = 0$ at $x = \dfrac\pi4$.\n\n$f''(x) = -\sin x - \cos x = -\sqrt2 < 0$ at $\dfrac\pi4$, so the local maximum value is $f\left(\dfrac\pi4\right) = \sqrt2$.`, sol: 'Stationary point π/4; negative second derivative.', scheme: [['x = π/4 from f′ = 0', 1], ["f″ < 0, maximum √2", 1]], d: 2, c: 'understanding', t: [4], time: 120 }), (C) => { C.assert(D2(f_s2e, P / 4) < 0 && close(f_s2e(P / 4), Math.SQRT2), 'max sqrt 2'); C.model([r`\sqrt2`]); });
const f_s2f = (x) => x * x - 4 * x + 1;
Q('s2f', mk.short({ marks: 2, stem: r`Find the absolute maximum and absolute minimum values of $f(x) = x^2 - 4x + 1$ on the closed interval $[0, 5]$.`, model: r`$f'(x) = 2x - 4 = 0$ at $x = 2$. Compare $f(0) = 1$, $f(2) = -3$, $f(5) = 6$.\n\nAbsolute maximum $6$ (at $x = 5$); absolute minimum $-3$ (at $x = 2$).`, sol: 'Evaluate at the critical point and both end points.', scheme: [['Critical point x = 2 and the three values', 1], ['Max 6, min −3', 1]], d: 2, c: 'understanding', t: [5], time: 120 }), (C) => { C.assert(close(extremeOn(f_s2f, 0, 5, 'max').v, 6) && close(extremeOn(f_s2f, 0, 5, 'min').v, -3), 'max 6, min -3'); C.model([6, -3]); });
Q('s2g', mk.short({ marks: 2, stem: r`A craftsperson in an imagined Bastar workshop bends a $20$ cm brass wire into a rectangle. Using derivatives, find the greatest area the rectangle can enclose.`, model: r`Sides $x$ and $10 - x$: $A = x(10 - x) = 10x - x^2$.\n\n$A'(x) = 10 - 2x = 0$ at $x = 5$, and $A''(x) = -2 < 0$. The greatest area is $5 \times 5 = 25$ cm$^2$ (a square).`, sol: 'Express the area in one variable using the perimeter.', scheme: [['A = x(10 − x)', 1], ['x = 5, area 25 cm²', 1]], d: 2, c: 'application', t: [6], time: 120 }), (C) => { C.assert(close(extremeOn((x) => x * (10 - x), 0, 10, 'max').v, 25), 'max 25'); C.model([25]); });
const f_s2h = (x) => x + 1 / x;
Q('s2h', mk.short({ marks: 2, stem: r`Show that $f(x) = x + \dfrac1x$ has a local maximum at $x = -1$ and a local minimum at $x = 1$, and that the local maximum value is smaller than the local minimum value.`, model: r`$f'(x) = 1 - \dfrac1{x^2} = 0$ at $x = \pm1$; $f''(x) = \dfrac2{x^3}$ is $-2$ at $x = -1$ (maximum) and $2$ at $x = 1$ (minimum).\n\nLocal maximum $f(-1) = -2$ is smaller than local minimum $f(1) = 2$: "local" values compare only nearby points.`, sol: 'Second derivative at ±1, then compare the two values.', scheme: [['Max at −1, min at 1 by f″', 1], ['Values −2 < 2', 1]], d: 3, c: 'analysis', t: [4], time: 150 }), (C) => { C.assert(kindAt(f_s2h, -1) === 'max' && kindAt(f_s2h, 1) === 'min' && f_s2h(-1) < f_s2h(1), 'max -2 < min 2'); C.model([-2, 2]); });
Q('s2i', mk.short({ marks: 2, stem: r`A drone's path over an imagined Goa beach is $x = 2t + 1$, $y = t^2 - 3$. Find the equation of the tangent to the path at the point where $t = 2$.`, model: r`At $t = 2$ the point is $(5, 1)$, and $\dfrac{dy}{dx} = \dfrac{2t}{2} = t = 2$.\n\nTangent: $y - 1 = 2(x - 5)$, i.e. $y = 2x - 9$.`, sol: 'Slope dy/dx = (dy/dt)/(dx/dt) at t = 2.', scheme: [['Point (5, 1) and slope 2', 1], ['y = 2x − 9', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => {
  const slope = D((t) => t * t - 3, 2) / D((t) => 2 * t + 1, 2);
  C.assert(close(slope, 2) && close(2 * 5 - 9, 1), 'tangent y = 2x - 9');
  C.model(['y = 2x - 9']);
});

// =============================================================== short answer (3 marks)
Q('s3a', mk.short({ marks: 3, stem: r`Water is poured at $9\pi$ cm$^3$/s into an inverted conical filter at an imagined Nashik water plant. The radius of the water surface is always half the depth. How fast is the depth rising when it is $6$ cm?`, model: r`With depth $h$, radius $\dfrac h2$: $V = \dfrac13\pi\left(\dfrac h2\right)^2 h = \dfrac{\pi h^3}{12}$.\n\n$\dfrac{dV}{dt} = \dfrac{\pi h^2}{4}\dfrac{dh}{dt}$, so $9\pi = \dfrac{\pi(36)}{4}\dfrac{dh}{dt} = 9\pi\dfrac{dh}{dt}$.\n\nHence $\dfrac{dh}{dt} = 1$ cm/s.`, sol: 'Write V in terms of h only, then differentiate.', scheme: [['V = πh³/12', 1], ['dV/dt = (πh²/4) dh/dt', 1], ['1 cm/s', 1]], d: 3, c: 'application', t: [1], time: 180 }), (C) => {
  const h = (t) => Math.cbrt((12 * (P * 216 / 12 + 9 * P * t)) / P);
  C.assert(close(h(0), 6) && close(D(h, 0), 1), 'dh/dt = 1');
  C.model([1]);
});
const f_s3b = (x) => 2 * x ** 3 - 21 * x * x + 60 * x + 4;
Q('s3b', mk.short({ marks: 3, stem: r`Find the intervals on which the cubic $f(x) = 2x^3 - 21x^2 + 60x + 4$ is strictly increasing and those on which it is strictly decreasing.`, model: r`$f'(x) = 6x^2 - 42x + 60 = 6(x - 2)(x - 5)$.\n\nSign of $f'$: positive for $x < 2$, negative for $2 < x < 5$, positive for $x > 5$.\n\nStrictly increasing on $(-\infty, 2)$ and $(5, \infty)$; strictly decreasing on $(2, 5)$.`, sol: 'Factorise the derivative and use a sign chart.', scheme: [["f′ = 6(x − 2)(x − 5)", 1], ['Increasing on (−∞, 2) and (5, ∞)', 1], ['Decreasing on (2, 5)', 1]], d: 2, c: 'understanding', t: [2], time: 180 }), (C) => {
  C.assert(incOn(f_s3b, -10, 2) && decOn(f_s3b, 2, 5) && incOn(f_s3b, 5, 15), 'sign chart');
  C.model([r`(-\infty, 2)`, r`(5, \infty)`, '(2, 5)']);
});
const f_s3c = (x) => Math.sin(x) + Math.cos(x);
Q('s3c', mk.short({ marks: 3, stem: r`On $[0, 2\pi]$, find where the wave $f(x) = \sin x + \cos x$ is strictly increasing and where it is strictly decreasing.`, model: r`$f'(x) = \cos x - \sin x = 0$ when $\tan x = 1$: $x = \dfrac\pi4$ or $\dfrac{5\pi}4$.\n\n$f' > 0$ on $\left[0, \dfrac\pi4\right)$ and $\left(\dfrac{5\pi}4, 2\pi\right]$; $f' < 0$ on $\left(\dfrac\pi4, \dfrac{5\pi}4\right)$.\n\nSo $f$ increases on $\left[0, \dfrac\pi4\right)$ and $\left(\dfrac{5\pi}4, 2\pi\right]$ and decreases on $\left(\dfrac\pi4, \dfrac{5\pi}4\right)$.`, sol: 'Zeros of f′ split [0, 2π]; test the sign on each piece.', scheme: [['Zeros π/4 and 5π/4', 1], ['Increasing intervals', 1], ['Decreasing interval', 1]], d: 3, c: 'application', t: [2], time: 180 }), (C) => {
  C.assert(incOn(f_s3c, 0, P / 4) && decOn(f_s3c, P / 4, 5 * P / 4) && incOn(f_s3c, 5 * P / 4, 2 * P), 'intervals');
  C.model([r`\dfrac{5\pi}4`]);
});
const c_s3d = (x) => x ** 3 - 3 * x * x + 2;
Q('s3d', mk.short({ marks: 3, stem: r`Find the points on the curve $y = x^3 - 3x^2 + 2$ at which the tangent is parallel to the line $y = 9x + 4$, and write the equations of these tangents.`, model: r`Parallel means slope $9$: $3x^2 - 6x = 9$, so $x^2 - 2x - 3 = 0$ and $x = 3$ or $x = -1$.\n\nPoints: $(3, 2)$ and $(-1, -2)$.\n\nTangents: $y - 2 = 9(x - 3)$, i.e. $y = 9x - 25$; and $y + 2 = 9(x + 1)$, i.e. $y = 9x + 7$.`, sol: 'Solve dy/dx = 9, then use point-slope form.', scheme: [['x = 3, −1', 1], ['Points (3, 2), (−1, −2)', 1], ['y = 9x − 25 and y = 9x + 7', 1]], d: 3, c: 'application', t: [3], time: 180 }), (C) => {
  C.assert([3, -1].every((x) => close(D(c_s3d, x), 9)) && close(c_s3d(3), 2) && close(c_s3d(-1), -2), 'points');
  C.assert(close(9 * 3 - 25, 2) && close(9 * -1 + 7, -2), 'tangent lines');
  C.model(['y = 9x - 25', 'y = 9x + 7']);
});
Q('s3e', mk.short({ marks: 3, stem: r`Find the acute angle between the parabolas $y = 4 - x^2$ and $y = x^2$ at each of their points of intersection.`, model: r`$4 - x^2 = x^2$ gives $x = \pm\sqrt2$, $y = 2$.\n\nAt $(\sqrt2, 2)$: slopes $-2\sqrt2$ and $2\sqrt2$, so $\tan\theta = \left|\dfrac{2\sqrt2 + 2\sqrt2}{1 - 8}\right| = \dfrac{4\sqrt2}{7}$.\n\nBy symmetry the angle at $(-\sqrt2, 2)$ is the same: $\theta = \tan^{-1}\dfrac{4\sqrt2}{7}$ at both points.`, sol: 'Find the meeting points, then use tan θ = |(m₁ − m₂)/(1 + m₁m₂)|.', scheme: [['Points (±√2, 2)', 1], ['Slopes ∓2√2 and ±2√2', 1], ['tan θ = 4√2/7', 1]], d: 4, c: 'analysis', t: [3], time: 240 }), (C) => {
  const x0 = Math.SQRT2;
  const t1 = tanAngle(D((x) => 4 - x * x, x0), D((x) => x * x, x0)), t2 = tanAngle(D((x) => 4 - x * x, -x0), D((x) => x * x, -x0));
  C.assert(close(t1, (4 * Math.SQRT2) / 7) && close(t2, t1), 'tan theta = 4 root 2 / 7');
  C.model([r`\dfrac{4\sqrt2}{7}`]);
});
const f_s3f = (x) => x ** 4 - 8 * x * x + 3;
Q('s3f', mk.short({ marks: 3, stem: r`The quartic $f(x) = x^4 - 8x^2 + 3$ has three stationary points. Classify each one with the second derivative test, and give the local maximum and local minimum values.`, model: r`$f'(x) = 4x^3 - 16x = 4x(x - 2)(x + 2)$: stationary at $x = 0, \pm2$.\n\n$f''(x) = 12x^2 - 16$: $f''(0) = -16 < 0$ (local maximum), $f''(\pm2) = 32 > 0$ (local minima).\n\nLocal maximum value $f(0) = 3$; local minimum value $f(\pm2) = 16 - 32 + 3 = -13$.`, sol: 'Three stationary points; sign of f″ at each.', scheme: [['x = 0, ±2', 1], ['f″ signs', 1], ['Max 3, min −13', 1]], d: 3, c: 'understanding', t: [4], time: 180 }), (C) => {
  C.assert(D2(f_s3f, 0) < 0 && D2(f_s3f, 2) > 0 && D2(f_s3f, -2) > 0, 'second derivative signs');
  C.assert(close(f_s3f(0), 3) && close(f_s3f(2), -13), 'values');
  C.model([3, -13]);
});
const f_s3g = (x) => 3 * x ** 4 - 4 * x ** 3 + 2;
Q('s3g', mk.short({ marks: 3, stem: r`For $f(x) = 3x^4 - 4x^3 + 2$, find the stationary points. Show that the second derivative test fails at one of them, and use the first derivative test to decide what happens there.`, model: r`$f'(x) = 12x^3 - 12x^2 = 12x^2(x - 1)$: stationary at $x = 0$ and $x = 1$.\n\n$f''(x) = 36x^2 - 24x$: $f''(1) = 12 > 0$, a local minimum $f(1) = 1$; $f''(0) = 0$, so the test fails at $0$.\n\nNear $0$, $12x^2(x - 1) < 0$ on both sides, so $f'$ does not change sign: no extremum at $x = 0$.`, sol: 'Factor f′; f″(0) = 0 forces the sign test at 0.', scheme: [['Stationary points 0 and 1', 1], ['Minimum 1 at x = 1; f″(0) = 0', 1], ['No extremum at 0 (no sign change)', 1]], d: 4, c: 'analysis', t: [4], time: 240 }), (C) => {
  C.assert(Math.abs(D2(f_s3g, 0)) < 1e-5 && kindAt(f_s3g, 0, 0.01) === 'none' && kindAt(f_s3g, 1) === 'min' && close(f_s3g(1), 1), 'none at 0, min 1 at 1');
  C.model([1]);
});
const f_s3h = (x) => x ** 3 - 6 * x * x + 9 * x + 1;
Q('s3h', mk.short({ marks: 3, stem: r`Find the absolute maximum and absolute minimum values of $f(x) = x^3 - 6x^2 + 9x + 1$ on $[0, 4]$, and state every point where each is attained.`, model: r`$f'(x) = 3(x - 1)(x - 3) = 0$ at $x = 1, 3$.\n\nValues: $f(0) = 1$, $f(1) = 5$, $f(3) = 1$, $f(4) = 5$.\n\nAbsolute maximum $5$, attained at $x = 1$ and $x = 4$; absolute minimum $1$, attained at $x = 0$ and $x = 3$.`, sol: 'Compare the function at the critical points and the end points.', scheme: [['Critical points 1 and 3', 1], ['Four values', 1], ['Max 5 at 1 and 4; min 1 at 0 and 3', 1]], d: 3, c: 'application', t: [5], time: 180 }), (C) => {
  C.assert(close(extremeOn(f_s3h, 0, 4, 'max').v, 5) && close(extremeOn(f_s3h, 0, 4, 'min').v, 1), 'max 5 min 1');
  C.assert([f_s3h(0), f_s3h(1), f_s3h(3), f_s3h(4)].join() === '1,5,1,5', 'four values');
  C.model([5, 1]);
});
const g_s3i = (y) => (15 - y) * y * y;
Q('s3i', mk.short({ marks: 3, stem: r`Two positive numbers add up to $15$. Find them if the product of one number and the square of the other is to be as large as possible.`, model: r`Let the numbers be $x$ and $y$ with $x = 15 - y$, and $P = xy^2 = 15y^2 - y^3$.\n\n$\dfrac{dP}{dy} = 30y - 3y^2 = 3y(10 - y) = 0$ gives $y = 10$; $\dfrac{d^2P}{dy^2} = 30 - 6y = -30 < 0$, a maximum.\n\nThe numbers are $y = 10$ and $x = 5$, with greatest product $500$.`, sol: 'Write P in one variable; maximise with the second derivative test.', scheme: [['P = 15y² − y³', 1], ['y = 10, maximum by P″ < 0', 1], ['Numbers 5 and 10', 1]], d: 3, c: 'application', t: [6], time: 180 }), (C) => { const m = extremeOn(g_s3i, 0, 15, 'max'); C.assert(close(m.x, 10, 1e-4) && close(m.v, 500), 'y = 10, P = 500'); C.model([10, 5]); });
const fence = (w) => 200 / w + 2 * w;
Q('s3j', mk.short({ marks: 3, stem: r`A rectangular kitchen garden of area $200$ m$^2$ is laid out against the wall of an imagined Shimla farmhouse, so the side along the wall needs no fence. Find the dimensions that use the least fencing.`, model: r`Let the two sides perpendicular to the wall be $w$ m each and the side parallel to the wall $\dfrac{200}{w}$ m. Fencing $F(w) = \dfrac{200}{w} + 2w$.\n\n$F'(w) = -\dfrac{200}{w^2} + 2 = 0$ gives $w = 10$; $F''(w) = \dfrac{400}{w^3} > 0$, a minimum.\n\nDimensions: $10$ m by $20$ m (the $20$ m side along the wall), using $40$ m of fencing.`, sol: 'Fencing in one variable; minimise.', scheme: [['F(w) = 200/w + 2w', 1], ['w = 10, minimum', 1], ['10 m × 20 m, 40 m fencing', 1]], d: 3, c: 'application', t: [6], time: 180 }), (C) => { const m = extremeOn(fence, 1, 50, 'min'); C.assert(close(m.x, 10, 1e-4) && close(m.v, 40), 'w = 10, F = 40'); C.model([10, 20, 40]); });

// =============================================================== long answer (5 marks, in parts)
const c_l01 = (x) => x ** 3 - 2 * x * x + 4;
Q('l01', mk.long({ stem: r`Consider the curve $y = x^3 - 2x^2 + 4$.\n\n(a) Find the equations of the tangent and the normal to the curve at the point where $x = 2$. [3]\n\n(b) Find the area of the triangle formed by this tangent, this normal and the $x$-axis. [2]`, model: r`**(a)** At $x = 2$: $y = 8 - 8 + 4 = 4$, and $\dfrac{dy}{dx} = 3x^2 - 4x = 12 - 8 = 4$.\n\nTangent: $y - 4 = 4(x - 2)$, i.e. $y = 4x - 4$.\n\nNormal: $y - 4 = -\dfrac14(x - 2)$, i.e. $x + 4y - 18 = 0$.\n\n**(b)** The tangent meets the $x$-axis at $(1, 0)$ and the normal at $(18, 0)$. The third vertex is $(2, 4)$. Area $= \dfrac12 \times 17 \times 4 = 34$ square units.`, sol: 'Point and slope at x = 2; intercepts give the base, the point gives the height.', scheme: [['Point (2, 4) and slope 4', 1], ['Tangent y = 4x − 4', 1], ['Normal x + 4y − 18 = 0', 1], ['x-intercepts 1 and 18', 1], ['Area 34', 1]], d: 3, c: 'application', t: [3], time: 480 }), (C) => {
  const m = D(c_l01, 2);
  C.assert(close(c_l01(2), 4) && close(m, 4), 'point and slope');
  const xt = 2 - 4 / m, xn = 2 + 4 * m;
  C.assert(close(xt, 1) && close(xn, 18) && close(0.5 * (xn - xt) * 4, 34), 'area 34');
  C.model(['y = 4x - 4', 'x + 4y - 18 = 0', 34]);
});
Q('l02', mk.long({ stem: r`Two arches in an imagined Hyderabad garden follow $y = x^2 - 1$ and $y = 1 - x^2$.\n\n(a) Find the points where the curves meet and the acute angle between them at each point. [3]\n\n(b) Find the point on $y = x^2 - 1$ at which the tangent makes an angle of $45^\circ$ with the positive $x$-axis. [2]`, model: r`**(a)** $x^2 - 1 = 1 - x^2$ gives $x = \pm1$, $y = 0$: the points $(1, 0)$ and $(-1, 0)$.\n\nAt $(1, 0)$ the slopes are $2$ and $-2$: $\tan\theta = \left|\dfrac{2 - (-2)}{1 + (2)(-2)}\right| = \dfrac43$. By symmetry the same holds at $(-1, 0)$, so $\theta = \tan^{-1}\dfrac43$ at both points.\n\n**(b)** Slope $2x = \tan 45^\circ = 1$ gives $x = \dfrac12$, $y = \dfrac14 - 1 = -\dfrac34$: the point $\left(\dfrac12, -\dfrac34\right)$.`, sol: 'Equate the curves; angle formula; then set the slope equal to 1.', scheme: [['Points (±1, 0)', 1], ['Slopes ±2', 1], ['tan θ = 4/3', 1], ['2x = 1', 1], ['Point (1/2, −3/4)', 1]], d: 3, c: 'application', t: [3], time: 480 }), (C) => {
  C.assert(close(tanAngle(D((x) => x * x - 1, 1), D((x) => 1 - x * x, 1)), 4 / 3) && close(tanAngle(D((x) => x * x - 1, -1), D((x) => 1 - x * x, -1)), 4 / 3), 'tan 4/3');
  C.assert(close(D((x) => x * x - 1, 0.5), 1) && close(0.25 - 1, -0.75), 'point (1/2, -3/4)');
  C.model([r`\dfrac43`, r`-\dfrac34`]);
});
const box = (x) => x * (24 - 2 * x) ** 2;
Q('l03', mk.long({ stem: r`A tin-box maker in an imagined part of Moradabad cuts equal squares of side $x$ cm from the corners of a square tin sheet of side $24$ cm and folds up the flaps to make an open box.\n\n(a) Write the volume $V(x)$ and show that $V$ is greatest when $x = 4$. [3]\n\n(b) Find the greatest volume. [2]`, model: r`**(a)** The base is $(24 - 2x)$ cm square and the height $x$ cm, so $V(x) = x(24 - 2x)^2$, $0 < x < 12$.\n\n$V'(x) = (24 - 2x)^2 - 4x(24 - 2x) = (24 - 2x)(24 - 6x)$, which is $0$ at $x = 4$ (as $x = 12$ is excluded).\n\n$V''(x) = 24x - 192$, so $V''(4) = -96 < 0$: a maximum at $x = 4$.\n\n**(b)** $V(4) = 4 \times 16^2 = 1024$ cm$^3$.`, sol: 'Volume in x; factorise V′; check V″ at x = 4.', scheme: [['V = x(24 − 2x)²', 1], ["V′ = (24 − 2x)(24 − 6x)", 1], ["x = 4 with V″ < 0", 1], ['Base 16 cm', 1], ['1024 cm³', 1]], d: 3, c: 'application', t: [6], time: 480 }), (C) => {
  const m = extremeOn(box, 0, 12, 'max');
  C.assert(close(m.x, 4, 1e-4) && close(m.v, 1024) && close(D2(box, 4), -96, 1e-3), 'x = 4, V = 1024');
  C.model([1024, -96]);
});
const tinS = (rr) => 2 * P * rr * rr + 500 * P / rr;
Q('l04', mk.long({ stem: r`An imagined Jaipur firm makes closed cylindrical tins, each holding $250\pi$ cm$^3$.\n\n(a) Show that the total surface area is least when the height of the tin equals its diameter. [3]\n\n(b) Find the radius, the height and this least surface area. [2]`, model: r`**(a)** With radius $r$ and height $h$, $\pi r^2h = 250\pi$, so $h = \dfrac{250}{r^2}$ and $S = 2\pi r^2 + 2\pi rh = 2\pi r^2 + \dfrac{500\pi}{r}$.\n\n$S'(r) = 4\pi r - \dfrac{500\pi}{r^2} = 0$ gives $r^3 = 125$; $S''(r) = 4\pi + \dfrac{1000\pi}{r^3} > 0$, a minimum.\n\nThen $h = \dfrac{250}{r^2} = \dfrac{2r^3}{r^2} = 2r$: the height equals the diameter.\n\n**(b)** $r = 5$ cm, $h = 10$ cm, and $S = 2\pi(25) + 2\pi(5)(10) = 150\pi$ cm$^2$.`, sol: 'Eliminate h with the volume; minimise S(r); compare h with 2r.', scheme: [['S = 2πr² + 500π/r', 1], ["r³ = 125 with S″ > 0", 1], ['h = 2r', 1], ['r = 5, h = 10', 1], ['150π cm²', 1]], d: 4, c: 'analysis', t: [6], time: 480 }), (C) => {
  const m = extremeOn(tinS, 1, 20, 'min');
  C.assert(close(m.x, 5, 1e-4) && close(250 / 25, 2 * 5) && close(m.v, 150 * P), 'r 5, h 10, S 150 pi');
  C.model([5, 10, r`150\pi`]);
});
const dist2 = (x) => (x - 6) ** 2 + 4 * x;
Q('l05', mk.long({ stem: r`A pipeline in an imagined Rajasthan solar park follows the parabola $y^2 = 4x$. A pump stands at $A(6, 0)$.\n\n(a) Find the points of the pipeline nearest to the pump. [3]\n\n(b) Find the least distance from the pump to the pipeline. [2]`, model: r`**(a)** For a point $(x, y)$ on $y^2 = 4x$, the squared distance is $s = (x - 6)^2 + y^2 = (x - 6)^2 + 4x$, $x \ge 0$.\n\n$\dfrac{ds}{dx} = 2(x - 6) + 4 = 0$ gives $x = 4$; $\dfrac{d^2s}{dx^2} = 2 > 0$, a minimum. Then $y^2 = 16$: the points $(4, 4)$ and $(4, -4)$.\n\n**(b)** $s = (4 - 6)^2 + 16 = 20$, so the least distance is $\sqrt{20} = 2\sqrt5$ units.`, sol: 'Minimise the squared distance in x alone.', scheme: [['s = (x − 6)² + 4x', 1], ['x = 4, minimum', 1], ['Points (4, ±4)', 1], ['s = 20', 1], ['2√5', 1]], d: 4, c: 'analysis', t: [6], time: 480 }), (C) => {
  const m = extremeOn(dist2, 0, 20, 'min');
  C.assert(close(m.x, 4, 1e-4) && close(m.v, 20), 'x = 4, s = 20');
  C.model([20, r`2\sqrt5`]);
});
const f_l06 = (x) => x ** 3 - 3 * x * x - 9 * x + 5;
Q('l06', mk.long({ stem: r`Let $f(x) = x^3 - 3x^2 - 9x + 5$.\n\n(a) Using the second derivative test, find the local maximum and local minimum values of $f$. [3]\n\n(b) Find the absolute maximum and absolute minimum values of $f$ on $[-2, 4]$. [2]`, model: r`**(a)** $f'(x) = 3x^2 - 6x - 9 = 3(x - 3)(x + 1)$: stationary at $x = -1$ and $x = 3$.\n\n$f''(x) = 6x - 6$: $f''(-1) = -12 < 0$ (local maximum), $f''(3) = 12 > 0$ (local minimum).\n\nLocal maximum value $f(-1) = 10$; local minimum value $f(3) = -22$.\n\n**(b)** End values: $f(-2) = 3$, $f(4) = -15$. Comparing $3, 10, -22, -15$: absolute maximum $10$ (at $x = -1$), absolute minimum $-22$ (at $x = 3$).`, sol: 'Stationary points and f″; then compare with the end values.', scheme: [['Stationary points −1, 3', 1], ['f″ signs', 1], ['Local max 10, local min −22', 1], ['f(−2) = 3, f(4) = −15', 1], ['Absolute max 10, min −22', 1]], d: 3, c: 'application', t: [4, 5], time: 480 }), (C) => {
  C.assert(D2(f_l06, -1) < 0 && D2(f_l06, 3) > 0 && close(f_l06(-1), 10) && close(f_l06(3), -22), 'local values');
  C.assert(close(f_l06(-2), 3) && close(f_l06(4), -15) && close(extremeOn(f_l06, -2, 4, 'max').v, 10) && close(extremeOn(f_l06, -2, 4, 'min').v, -22), 'absolute values');
  C.model([10, -22, 3, -15]);
});

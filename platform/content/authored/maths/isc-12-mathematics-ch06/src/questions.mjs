// ISC 12 Mathematics ch06 Methods of Differentiation — practice bank with independent re-solve checks.
// Every derivative key is compared with numbers computed from the original relation: implicit slopes with
// -F_x/F_y from numeric partial derivatives (second derivatives on a Newton-solved branch of the curve),
// parametric slopes as (dy/dt)/(dx/dt) by central differences, "with respect to another function" as a ratio
// of two numeric derivatives, logarithmic differentiation against a central difference of the function itself,
// and every "show that" relation at several sample points. Set-ups are SOYL's own (D-036); none repeats the
// CBSE 12 ch05 bank. Derivatives of order higher than two are out of the ISC 2027 syllabus and appear nowhere.
import { Q, mk } from '../../isc-12-mathematics-ch01/src/lib.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter becomes a newline. */
const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

// ---------------------------------------------------------------- numeric calculus helpers
export const D = (g, x, h = 1e-5) => (g(x + h) - g(x - h)) / (2 * h);
export const D2 = (g, x, h = 1e-4) => (g(x + h) - 2 * g(x) + g(x - h)) / (h * h);
export const close = (a, b, tol = 1e-5) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
export const sameD = (g, dg, xs) => xs.every((x) => close(D(g, x), dg(x)));
export const sameD2 = (g, d2g, xs) => xs.every((x) => close(D2(g, x), d2g(x), 1e-4));
/** Slope of F(x, y) = 0 at (x, y): -F_x / F_y from numeric partial derivatives. */
export const islope = (F, x, y, h = 1e-6) => -((F(x + h, y) - F(x - h, y)) / (F(x, y + h) - F(x, y - h)));
/** The branch y(x) of F(x, y) = 0 through a point, by Newton's method from the starting value y0. */
export const branch = (F, y0) => (x) => {
  let y = y0;
  for (let i = 0; i < 80; i++) {
    const Fy = (F(x, y + 1e-7) - F(x, y - 1e-7)) / 2e-7;
    const step = F(x, y) / Fy;
    y -= step;
    if (Math.abs(step) < 1e-15) break;
  }
  return y;
};
/** Parametric slope dy/dx = (dy/dt)/(dx/dt) and second derivative d/dt(dy/dx) ÷ dx/dt. */
export const pslope = (X, Y, t) => D(Y, t) / D(X, t);
export const pslope2 = (X, Y, t, h = 1e-4) => (pslope(X, Y, t + h) - pslope(X, Y, t - h)) / (2 * h) / D(X, t);
/** Derivative of u(x) with respect to v(x). */
export const wrt = (u, v, x) => D(u, x) / D(v, x);
/** y = x^(x^(x^…)) for e^(-e) < x < e^(1/e), by iteration. */
export const tower = (x) => { let y = 1; for (let i = 0; i < 2000; i++) y = x ** y; return y; };
const L = Math.log, E = Math.exp, S = Math.sin, Co = Math.cos, T = Math.tan, sq = Math.sqrt, P = Math.PI;
const funcsAgree = (g, opts, xs) => opts.map((dg) => sameD(g, dg, xs));

// =============================================================== MCQ — t01 implicit functions
Q('m01', mk.mcq({ stem: r`A curve is given in implicit form, so $y$ is not written alone on one side. When each term is differentiated with respect to $x$, a term such as $y^3$ becomes`, opts: [r`$3y^2\dfrac{dy}{dx}$`, r`$3y^2$`, r`$3x^2$`, r`$3y^2\dfrac{dx}{dy}$`], key: 'a', sol: r`$y$ is a function of $x$, so the chain rule adds the factor $\dfrac{dy}{dx}$: $\dfrac{d}{dx}(y^3) = 3y^2\dfrac{dy}{dx}$. Dropping that factor is the most common slip.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => {
  const y = (x) => sq(x + 1); // any differentiable y(x)
  C.assert([0.5, 2].every((x) => close(D((s) => y(s) ** 3, x), 3 * y(x) ** 2 * D(y, x))), 'chain rule factor');
  C.key('a');
});

Q('m02', mk.mcq({ stem: r`A jeweller's pendant outline follows $x^3 + y^3 = 9$, which passes through $(1, 2)$. The gradient of the outline at that point is`, opts: [r`$-\dfrac{1}{4}$`, r`$\dfrac{1}{4}$`, '$-4$', r`$-\dfrac{1}{2}$`], key: 'a', sol: r`$3x^2 + 3y^2\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{x^2}{y^2} = -\dfrac{1}{4}$ at $(1, 2)$. Writing $-\dfrac{y^2}{x^2}$ gives $-4$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const F = (x, y) => x ** 3 + y ** 3 - 9;
  C.assert(Math.abs(F(1, 2)) < 1e-12, 'point on curve');
  const s = islope(F, 1, 2);
  C.which([-1 / 4, 1 / 4, -4, -1 / 2].map((v) => close(v, s)), true);
});

Q('m03', mk.mcq({ stem: r`The relation $x^2y + y^3 = 10$ holds at $(1, 2)$. Implicit differentiation gives the slope there as`, opts: [r`$-\dfrac{4}{13}$`, r`$\dfrac{4}{13}$`, r`$-\dfrac{13}{4}$`, r`$-\dfrac{2}{13}$`], key: 'a', sol: r`$2xy + x^2\dfrac{dy}{dx} + 3y^2\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{2xy}{x^2 + 3y^2} = -\dfrac{4}{1 + 12} = -\dfrac{4}{13}$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => {
  const F = (x, y) => x * x * y + y ** 3 - 10;
  C.assert(Math.abs(F(1, 2)) < 1e-12, 'point on curve');
  const s = islope(F, 1, 2);
  C.which([-4 / 13, 4 / 13, -13 / 4, -2 / 13].map((v) => close(v, s)), true);
});

Q('m04', mk.mcq({ stem: r`A garden path traced on a plan obeys $\sqrt{x} + \sqrt{y} = 5$ ($x, y > 0$). At the point $(4, 9)$ on the path, $\dfrac{dy}{dx}$ equals`, opts: [r`$-\dfrac{3}{2}$`, r`$-\dfrac{2}{3}$`, r`$\dfrac{3}{2}$`, r`$-\dfrac{9}{4}$`], key: 'a', sol: r`$\dfrac{1}{2\sqrt{x}} + \dfrac{1}{2\sqrt{y}}\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{\sqrt{y}}{\sqrt{x}} = -\dfrac{3}{2}$ at $(4, 9)$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const F = (x, y) => sq(x) + sq(y) - 5;
  const s = islope(F, 4, 9);
  C.which([-3 / 2, -2 / 3, 3 / 2, -9 / 4].map((v) => close(v, s)), true);
});

Q('m05', mk.mcq({ stem: r`For the curve $xe^{y} + y = 3$, which passes through $(3, 0)$, the value of $\dfrac{dy}{dx}$ at that point is`, opts: [r`$-\dfrac{1}{4}$`, r`$-\dfrac{3}{4}$`, r`$\dfrac{1}{4}$`, '$-4$'], key: 'a', sol: r`$e^{y} + xe^{y}\dfrac{dy}{dx} + \dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{e^{y}}{xe^{y} + 1} = -\dfrac{1}{3 + 1} = -\dfrac{1}{4}$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => {
  const F = (x, y) => x * E(y) + y - 3;
  const s = islope(F, 3, 0);
  C.which([-1 / 4, -3 / 4, 1 / 4, -4].map((v) => close(v, s)), true);
});

Q('m06', mk.mcq({ stem: r`A circular running track on a map is $x^2 + y^2 - 6x + 4y = 12$. At which of these points on the track is the tangent **horizontal**?`, opts: ['$(3, 3)$', '$(8, -2)$', '$(0, 2)$', '$(-2, -2)$'], key: 'a', sol: r`$\dfrac{dy}{dx} = \dfrac{3 - x}{y + 2}$. It is $0$ when $x = 3$ (and $y \ne -2$): the point $(3, 3)$. At $(8, -2)$ and $(-2, -2)$ the denominator is $0$, so the tangent is vertical; at $(0, 2)$ the slope is $\dfrac{3}{4}$.`, d: 3, c: 'analysis', t: [1], time: 90 }), (C) => {
  const Fx = (x) => 2 * x - 6, Fy = (y) => 2 * y + 4, F = (x, y) => x * x + y * y - 6 * x + 4 * y - 12;
  const pts = [[3, 3], [8, -2], [0, 2], [-2, -2]];
  C.assert(pts.every(([x, y]) => Math.abs(F(x, y)) < 1e-12), 'all four points on the track');
  C.which(pts.map(([x, y]) => Math.abs(Fx(x)) < 1e-12 && Math.abs(Fy(y)) > 1e-9), true);
});

// =============================================================== MCQ — t02 parametric form
Q('m07', mk.mcq({ stem: r`A toy car's position is $x = 2t + 1$, $y = t^3$ at time $t$. The slope $\dfrac{dy}{dx}$ of its track when $t = 2$ is`, opts: ['$6$', '$12$', '$3$', r`$\dfrac{2}{3}$`], key: 'a', sol: r`$\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt} = \dfrac{3t^2}{2} = 6$ at $t = 2$. Forgetting to divide by $\dfrac{dx}{dt} = 2$ gives $12$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  const s = pslope((t) => 2 * t + 1, (t) => t ** 3, 2);
  C.which([6, 12, 3, 2 / 3].map((v) => close(v, s)), true);
});

const o08 = [(x) => -1 / (x * x), (x) => 1 / (x * x), (x) => -x * x, (x) => -1 / x];
Q('m08', mk.mcq({ stem: r`With the parameter $t$, a curve is $x = e^{t}$, $y = e^{-t}$. Written in terms of $x$, its slope $\dfrac{dy}{dx}$ is`, opts: [r`$-\dfrac{1}{x^2}$`, r`$\dfrac{1}{x^2}$`, '$-x^2$', r`$-\dfrac{1}{x}$`], key: 'a', sol: r`$\dfrac{dy}{dx} = \dfrac{-e^{-t}}{e^{t}} = -e^{-2t} = -\dfrac{1}{x^2}$ because $e^{t} = x$. (Eliminating $t$ gives $y = \dfrac{1}{x}$, which agrees.)`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  const ts = [-0.4, 0.3, 1.1];
  C.which(o08.map((g) => ts.every((t) => close(pslope(E, (u) => E(-u), t), g(E(t))))), true);
});

const o09 = [(t) => (t * t + 1) / (t * t - 1), (t) => (t * t - 1) / (t * t + 1), (t) => (t * t + 1) / (t * t), () => 1];
Q('m09', mk.mcq({ stem: r`For the pair $x = t + \dfrac{1}{t}$, $y = t - \dfrac{1}{t}$ ($t > 1$), the derivative $\dfrac{dy}{dx}$ simplifies to`, opts: [r`$\dfrac{t^2 + 1}{t^2 - 1}$`, r`$\dfrac{t^2 - 1}{t^2 + 1}$`, r`$\dfrac{t^2 + 1}{t^2}$`, '$1$'], key: 'a', sol: r`$\dfrac{dx}{dt} = 1 - \dfrac{1}{t^2} = \dfrac{t^2 - 1}{t^2}$ and $\dfrac{dy}{dt} = 1 + \dfrac{1}{t^2} = \dfrac{t^2 + 1}{t^2}$; dividing, the $t^2$ cancels. Inverting the fraction is the usual error.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => {
  const X = (t) => t + 1 / t, Y = (t) => t - 1 / t;
  C.which(o09.map((g) => [1.5, 2, 3.2].every((t) => close(pslope(X, Y, t), g(t)))), true);
});

Q('m10', mk.mcq({ stem: r`A point moves round a circle as $x = 3\cos\theta$, $y = 3\sin\theta$. When $\theta = \dfrac{\pi}{4}$ the slope of its path is`, opts: ['$-1$', '$1$', '$0$', '$-3$'], key: 'a', sol: r`$\dfrac{dy}{dx} = \dfrac{3\cos\theta}{-3\sin\theta} = -\cot\theta$, which is $-1$ at $\theta = \dfrac{\pi}{4}$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  const s = pslope((t) => 3 * Co(t), (t) => 3 * S(t), P / 4);
  C.which([-1, 1, 0, -3].map((v) => close(v, s)), true);
});

// =============================================================== MCQ — t03 one function with respect to another
Q('m11', mk.mcq({ stem: r`The rate of change of $x^4$ measured against $x^2$ (that is, the derivative of $x^4$ with respect to $x^2$) is`, opts: ['$2x^2$', '$4x^3$', '$2x$', r`$\dfrac{x^2}{2}$`], key: 'a', sol: r`$\dfrac{d(x^4)/dx}{d(x^2)/dx} = \dfrac{4x^3}{2x} = 2x^2$. Equivalently, with $u = x^2$, $x^4 = u^2$ and $\dfrac{d(u^2)}{du} = 2u$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => {
  const u = (x) => x ** 4, v = (x) => x * x;
  C.which([(x) => 2 * x * x, (x) => 4 * x ** 3, (x) => 2 * x, (x) => (x * x) / 2].map((g) => [0.7, 1.3, 2].every((x) => close(wrt(u, v, x), g(x)))), true);
});

Q('m12', mk.mcq({ stem: r`Differentiating $\sin x$ with respect to $\cos x$ (where $\sin x \ne 0$) gives`, opts: [r`$-\cot x$`, r`$\cot x$`, r`$-\tan x$`, r`$\tan x$`], key: 'a', sol: r`$\dfrac{d(\sin x)/dx}{d(\cos x)/dx} = \dfrac{\cos x}{-\sin x} = -\cot x$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => {
  C.which([(x) => -1 / T(x), (x) => 1 / T(x), (x) => -T(x), (x) => T(x)].map((g) => [0.4, 0.9, 1.3].every((x) => close(wrt(S, Co, x), g(x)))), true);
});

Q('m13', mk.mcq({ stem: r`A growth model compares $e^{3x}$ with $e^{x}$. The derivative of $e^{3x}$ with respect to $e^{x}$ is`, opts: ['$3e^{2x}$', '$3$', '$e^{2x}$', '$3e^{3x}$'], key: 'a', sol: r`$\dfrac{3e^{3x}}{e^{x}} = 3e^{2x}$. Check with $u = e^{x}$: $e^{3x} = u^3$ and $\dfrac{d(u^3)}{du} = 3u^2 = 3e^{2x}$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => {
  const u = (x) => E(3 * x);
  C.which([(x) => 3 * E(2 * x), () => 3, (x) => E(2 * x), (x) => 3 * E(3 * x)].map((g) => [0.2, 0.6].every((x) => close(wrt(u, E, x), g(x)))), true);
});

Q('m14', mk.mcq({ stem: r`Here $\log$ is the natural logarithm. The derivative of $\log x$ with respect to $x^3$ ($x > 0$) is`, opts: [r`$\dfrac{1}{3x^3}$`, '$3x^3$', r`$\dfrac{1}{3x^2}$`, r`$\dfrac{x^3}{3}$`], key: 'a', sol: r`$\dfrac{1/x}{3x^2} = \dfrac{1}{3x^3}$. Forgetting the $\dfrac{1}{x}$ from $\log x$ gives $\dfrac{1}{3x^2}$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => {
  C.which([(x) => 1 / (3 * x ** 3), (x) => 3 * x ** 3, (x) => 1 / (3 * x * x), (x) => x ** 3 / 3].map((g) => [0.8, 1.5, 2].every((x) => close(wrt(L, (s) => s ** 3, x), g(x)))), true);
});

// =============================================================== MCQ — t04 logarithmic differentiation
Q('m15', mk.mcq({ stem: r`For $y = x^{2x}$ ($x > 0$), logarithmic differentiation gives the value of $\dfrac{dy}{dx}$ at $x = 1$ as`, opts: ['$2$', '$1$', '$0$', '$4$'], key: 'a', sol: r`$\log y = 2x\log x$, so $\dfrac{1}{y}\dfrac{dy}{dx} = 2\log x + 2$ and $\dfrac{dy}{dx} = 2x^{2x}(\log x + 1)$. At $x = 1$: $2 \times 1 \times 1 = 2$.`, d: 2, c: 'understanding', t: [4], time: 75 }), (C) => {
  const s = D((x) => x ** (2 * x), 1);
  C.which([2, 1, 0, 4].map((v) => close(v, s)), true);
});

Q('m16', mk.mcq({ stem: r`Let $y = (\log x)^{x}$ for $x > 1$. At $x = e$, the derivative $\dfrac{dy}{dx}$ equals`, opts: ['$1$', '$e$', '$0$', r`$\dfrac{1}{e}$`], key: 'a', sol: r`$\log y = x\log(\log x)$, so $\dfrac{1}{y}\dfrac{dy}{dx} = \log(\log x) + \dfrac{1}{\log x}$. At $x = e$: $y = 1^{e} = 1$ and the bracket is $0 + 1 = 1$, so $\dfrac{dy}{dx} = 1$.`, d: 3, c: 'application', t: [4], time: 120 }), (C) => {
  const s = D((x) => L(x) ** x, Math.E);
  C.which([1, Math.E, 0, 1 / Math.E].map((v) => close(v, s)), true);
});

Q('m17', mk.mcq({ stem: r`The function $y = x^{1/x}$ ($x > 0$) has $\dfrac{dy}{dx} = 0$ at exactly one point. That point is`, opts: ['$x = e$', '$x = 1$', r`$x = \dfrac{1}{e}$`, '$x = e^2$'], key: 'a', sol: r`$\log y = \dfrac{\log x}{x}$ gives $\dfrac{dy}{dx} = x^{1/x} \cdot \dfrac{1 - \log x}{x^2}$, which vanishes only when $\log x = 1$, i.e. $x = e$.`, d: 3, c: 'analysis', t: [4], time: 120 }), (C) => {
  const g = (x) => x ** (1 / x);
  C.which([Math.E, 1, 1 / Math.E, Math.E ** 2].map((v) => Math.abs(D(g, v)) < 1e-7), true);
});

Q('m18', mk.mcq({ stem: r`A volume is modelled by $y = (x + 1)(x + 2)(x + 3)$. Taking logarithms before differentiating, the value of $\dfrac{dy}{dx}$ at $x = 0$ is`, opts: ['$11$', '$6$', r`$\dfrac{11}{6}$`, '$36$'], key: 'a', sol: r`$\dfrac{1}{y}\dfrac{dy}{dx} = \dfrac{1}{x + 1} + \dfrac{1}{x + 2} + \dfrac{1}{x + 3} = 1 + \dfrac12 + \dfrac13 = \dfrac{11}{6}$ at $x = 0$, and $y(0) = 6$, so $\dfrac{dy}{dx} = 11$. Stopping at $\dfrac{11}{6}$ forgets to multiply by $y$.`, d: 2, c: 'understanding', t: [4], time: 90 }), (C) => {
  const s = D((x) => (x + 1) * (x + 2) * (x + 3), 0);
  C.which([11, 6, 11 / 6, 36].map((v) => close(v, s)), true);
});

Q('m19', mk.mcq({ stem: r`A tower of powers $y = x^{x^{x}}$ ($x > 0$) is differentiated by taking logarithms twice. Its derivative at $x = 1$ is`, opts: ['$1$', '$0$', '$2$', '$e$'], key: 'a', sol: r`$\log y = x^{x}\log x$, so $\dfrac{1}{y}\dfrac{dy}{dx} = x^{x}(1 + \log x)\log x + \dfrac{x^{x}}{x}$. At $x = 1$: $y = 1$ and the bracket is $1 \cdot 1 \cdot 0 + 1 = 1$.`, d: 4, c: 'analysis', t: [4], time: 150 }), (C) => {
  const s = D((x) => x ** (x ** x), 1);
  C.which([1, 0, 2, Math.E].map((v) => close(v, s)), true);
});

const o20 = [(x, y) => (y * y) / (x * (1 - y * L(x))), (x, y) => y / (x * (1 - L(x))), (x, y) => (y * y) / (1 - y * L(x)), (x, y) => (x * y) / (1 - y * L(x))];
Q('m20', mk.mcq({ stem: r`An endless tower $y = x^{x^{x^{\cdots}}}$ satisfies $y = x^{y}$ on the interval where it converges. Implicit logarithmic differentiation gives $\dfrac{dy}{dx}$ as`, opts: [r`$\dfrac{y^2}{x(1 - y\log x)}$`, r`$\dfrac{y}{x(1 - \log x)}$`, r`$\dfrac{y^2}{1 - y\log x}$`, r`$\dfrac{xy}{1 - y\log x}$`], key: 'a', sol: r`$\log y = y\log x$. Differentiate: $\dfrac{1}{y}\dfrac{dy}{dx} = \dfrac{dy}{dx}\log x + \dfrac{y}{x}$. Collect: $\dfrac{dy}{dx}\left(\dfrac{1}{y} - \log x\right) = \dfrac{y}{x}$, which rearranges to $\dfrac{y^2}{x(1 - y\log x)}$.`, d: 4, c: 'analysis', t: [4, 1], time: 150 }), (C) => {
  const xs = [1.1, 1.2, 1.35];
  C.assert(xs.every((x) => close(tower(x), x ** tower(x), 1e-12)), 'tower converged');
  C.which(o20.map((g) => xs.every((x) => close(D(tower, x), g(x, tower(x)), 1e-4))), true);
});

// =============================================================== MCQ — t05 second-order derivatives
Q('m21', mk.mcq({ stem: r`The second derivative of $y = x^3\log x$ ($x > 0$) is`, opts: [r`$6x\log x + 5x$`, r`$6x\log x + x$`, r`$3x^2\log x + x^2$`, r`$6\log x + 5$`], key: 'a', sol: r`$y' = 3x^2\log x + x^2$; then $y'' = 6x\log x + 3x + 2x = 6x\log x + 5x$. The third option is only $y'$.`, d: 2, c: 'understanding', t: [5], time: 90 }), (C) => {
  const y = (x) => x ** 3 * L(x);
  C.which([(x) => 6 * x * L(x) + 5 * x, (x) => 6 * x * L(x) + x, (x) => 3 * x * x * L(x) + x * x, (x) => 6 * L(x) + 5].map((g) => sameD2(y, g, [0.7, 1.5, 2.5])), true);
});

Q('m22', mk.mcq({ stem: r`A damped vibration is modelled by $y = e^{-x}\sin x$. Its second derivative $\dfrac{d^2y}{dx^2}$ is`, opts: [r`$-2e^{-x}\cos x$`, r`$2e^{-x}\cos x$`, r`$-2e^{-x}\sin x$`, r`$e^{-x}(\sin x - \cos x)$`], key: 'a', sol: r`$y' = e^{-x}(\cos x - \sin x)$; $y'' = -e^{-x}(\cos x - \sin x) + e^{-x}(-\sin x - \cos x) = -2e^{-x}\cos x$.`, d: 3, c: 'understanding', t: [5], time: 120 }), (C) => {
  const y = (x) => E(-x) * S(x);
  C.which([(x) => -2 * E(-x) * Co(x), (x) => 2 * E(-x) * Co(x), (x) => -2 * E(-x) * S(x), (x) => E(-x) * (S(x) - Co(x))].map((g) => sameD2(y, g, [0.3, 1, 2])), true);
});

Q('m23', mk.mcq({ stem: r`A cusp-shaped curve is given by $x = t^2$, $y = t^3$ ($t > 0$). Its second derivative $\dfrac{d^2y}{dx^2}$ in terms of $t$ is`, opts: [r`$\dfrac{3}{4t}$`, r`$\dfrac{3}{2}$`, r`$\dfrac{3t}{2}$`, r`$\dfrac{3}{2t}$`], key: 'a', sol: r`$\dfrac{dy}{dx} = \dfrac{3t^2}{2t} = \dfrac{3t}{2}$. Then $\dfrac{d^2y}{dx^2} = \dfrac{d}{dt}\left(\dfrac{3t}{2}\right) \div \dfrac{dx}{dt} = \dfrac{3}{2} \cdot \dfrac{1}{2t} = \dfrac{3}{4t}$. Stopping at $\dfrac{3}{2}$ forgets to divide by $\dfrac{dx}{dt}$.`, d: 3, c: 'application', t: [5, 2], time: 120 }), (C) => {
  const X = (t) => t * t, Y = (t) => t ** 3;
  C.which([(t) => 3 / (4 * t), () => 1.5, (t) => (3 * t) / 2, (t) => 3 / (2 * t)].map((g) => [0.8, 1.5, 2.2].every((t) => close(pslope2(X, Y, t), g(t), 1e-4))), true);
});

Q('m24', mk.mcq({ stem: r`Every function $y = Ae^{2x} + Be^{-3x}$, with constants $A$ and $B$, satisfies which second-order relation?`, opts: [r`$\dfrac{d^2y}{dx^2} + \dfrac{dy}{dx} - 6y = 0$`, r`$\dfrac{d^2y}{dx^2} - \dfrac{dy}{dx} - 6y = 0$`, r`$\dfrac{d^2y}{dx^2} + 5\dfrac{dy}{dx} + 6y = 0$`, r`$\dfrac{d^2y}{dx^2} - 6y = 0$`], key: 'a', sol: r`$y' = 2Ae^{2x} - 3Be^{-3x}$ and $y'' = 4Ae^{2x} + 9Be^{-3x}$. Then $y'' + y' - 6y$ has $e^{2x}$-coefficient $4 + 2 - 6 = 0$ and $e^{-3x}$-coefficient $9 - 3 - 6 = 0$.`, d: 3, c: 'analysis', t: [5], time: 120 }), (C) => {
  const ok = (p, q) => [[1.3, 0.7], [-0.5, 2]].every(([A, B]) => { const y = (x) => A * E(2 * x) + B * E(-3 * x); return [0, 0.4, 0.9].every((x) => Math.abs(D2(y, x) + p * D(y, x) + q * y(x)) < 1e-3); });
  C.which([ok(1, -6), ok(-1, -6), ok(5, 6), ok(0, -6)], true);
});

Q('m25', mk.mcq({ stem: r`On the circle $x^2 + y^2 = 25$, the second derivative $\dfrac{d^2y}{dx^2}$ at the point $(3, 4)$ is`, opts: [r`$-\dfrac{25}{64}$`, r`$\dfrac{25}{64}$`, r`$-\dfrac{3}{4}$`, r`$-\dfrac{5}{16}$`], key: 'a', sol: r`$y' = -\dfrac{x}{y}$, so $y'' = -\dfrac{y - xy'}{y^2} = -\dfrac{y^2 + x^2}{y^3} = -\dfrac{25}{y^3} = -\dfrac{25}{64}$ at $(3, 4)$. The value $-\dfrac{3}{4}$ is only the first derivative.`, d: 3, c: 'application', t: [5, 1], time: 120 }), (C) => {
  const s = D2((x) => sq(25 - x * x), 3);
  C.which([-25 / 64, 25 / 64, -3 / 4, -5 / 16].map((v) => close(v, s, 1e-4)), true);
});

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`If $x = \cos t$ and $y = \sin t$, then $\dfrac{dy}{dx} = -\cot t$ wherever $\sin t \ne 0$.`, r: r`For a curve in parametric form, $\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt}$ whenever $\dfrac{dx}{dt} \ne 0$.`, key: 'a', sol: r`By R, $\dfrac{dy}{dx} = \dfrac{\cos t}{-\sin t} = -\cot t$, which is A. Both true; R explains A.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  C.assert([0.5, 1.2, 2.4].every((t) => close(pslope(Co, S, t), -1 / T(t))), 'slope -cot t');
  C.key('a');
});

Q('ar2', mk.ar({ a: r`The derivative of $2^{x}$ with respect to $x$ is $x \cdot 2^{x - 1}$.`, r: r`The power rule $\dfrac{d}{dx}(x^n) = nx^{n - 1}$ needs the base to be the variable and the exponent to be a fixed number.`, key: 'd', sol: r`In $2^{x}$ the exponent is the variable, so the power rule does not apply; logs give $\dfrac{d}{dx}(2^{x}) = 2^{x}\log 2$. A is false; R is true.`, d: 2, c: 'analysis', t: [4] }), (C) => {
  const g = (x) => 2 ** x;
  C.assert([0.5, 1.5].every((x) => close(D(g, x), g(x) * L(2)) && !close(D(g, x), x * 2 ** (x - 1))), 'A false');
  C.key('d');
});

Q('ar3', mk.ar({ a: r`For $y = x^3$ ($x > 0$), $\dfrac{d^2y}{dx^2}$ is **not** equal to $\dfrac{1}{d^2x/dy^2}$.`, r: r`In general $\dfrac{d^2y}{dx^2} = -\dfrac{d^2x/dy^2}{(dx/dy)^3}$, not the reciprocal of $\dfrac{d^2x}{dy^2}$.`, key: 'a', sol: r`At $x = 1$: $\dfrac{d^2y}{dx^2} = 6$, while $x = y^{1/3}$ gives $\dfrac{d^2x}{dy^2} = -\dfrac{2}{9}$ at $y = 1$, whose reciprocal is $-\dfrac{9}{2}$. R's formula gives $-\dfrac{-2/9}{(1/3)^3} = 6$. Both true; R explains A.`, d: 4, c: 'analysis', t: [5] }), (C) => {
  const x = (y) => Math.cbrt(y);
  const yxx = D2((s) => s ** 3, 1), xyy = D2(x, 1), xy = D(x, 1);
  C.assert(close(yxx, 6, 1e-4) && close(xyy, -2 / 9, 1e-4) && !close(yxx, 1 / xyy, 1e-2) && close(-xyy / xy ** 3, 6, 1e-3), 'A and R true');
  C.key('a');
});

Q('ar4', mk.ar({ a: r`The derivative of $\sin x$ with respect to $\cos x$ is $-\cot x$ wherever $\sin x \ne 0$.`, r: r`The function $\cos x$ is decreasing on the interval $(0, \pi)$.`, key: 'b', sol: r`A is true: $\dfrac{\cos x}{-\sin x} = -\cot x$. R is also true, but the shape of $\cos x$ on $(0, \pi)$ does not explain the formula. Both true; R does not explain A.`, d: 2, c: 'analysis', t: [3] }), (C) => {
  C.assert([0.5, 1, 2.5].every((x) => close(wrt(S, Co, x), -1 / T(x))) && [0.2, 1, 2, 3].every((x) => D(Co, x) < 0), 'A true, R true');
  C.key('b');
});

Q('ar5', mk.ar({ a: r`Taking logarithms first is an efficient way to differentiate $\dfrac{(x + 1)^5(x - 2)^3}{(x + 4)^2}$ for $x > 2$.`, r: r`The logarithm turns products, quotients and powers into sums, differences and multiples, which are easy to differentiate term by term.`, key: 'a', sol: r`$\log y = 5\log(x + 1) + 3\log(x - 2) - 2\log(x + 4)$, which differentiates in one line. R is exactly why this works. Both true; R explains A.`, d: 2, c: 'analysis', t: [4] }), (C) => {
  const y = (x) => ((x + 1) ** 5 * (x - 2) ** 3) / (x + 4) ** 2;
  C.assert(sameD(y, (x) => y(x) * (5 / (x + 1) + 3 / (x - 2) - 2 / (x + 4)), [2.5, 3, 4]), 'log derivative');
  C.key('a');
});

Q('ar6', mk.ar({ a: r`On the circle $x^2 + y^2 = 4$, $\dfrac{dy}{dx}$ is not defined at the point $(2, 0)$.`, r: r`The tangent to the circle at $(2, 0)$ is horizontal.`, key: 'c', sol: r`$\dfrac{dy}{dx} = -\dfrac{x}{y}$ has a zero denominator at $(2, 0)$, so A is true. There the tangent is the vertical line $x = 2$, not horizontal, so R is false.`, d: 2, c: 'analysis', t: [1] }), (C) => {
  const F = (x, y) => x * x + y * y - 4;
  C.assert(Math.abs((F(2, 1e-6) - F(2, -1e-6)) / 2e-6) < 1e-6 && Math.abs((F(2 + 1e-6, 0) - F(2 - 1e-6, 0)) / 2e-6) > 1, 'F_y = 0, F_x ≠ 0: vertical tangent');
  C.key('c');
});

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`True or false? For the parametric curve $x = t^2$, $y = t^4$ ($t \ne 0$), the second derivative $\dfrac{d^2y}{dx^2}$ equals $2$ at every point.`, key: 't', sol: r`$\dfrac{dy}{dx} = \dfrac{4t^3}{2t} = 2t^2 = 2x$, and $\dfrac{d}{dt}(2t^2) \div 2t = 2$. Indeed $y = x^2$. True.`, d: 2, c: 'understanding', t: [5, 2] }), (C) => {
  C.assert([0.6, 1.3, -1.1].every((t) => close(pslope2((u) => u * u, (u) => u ** 4, t), 2, 1e-4)), 'second derivative 2');
  C.key('t');
});
Q('tf2', mk.tf({ stem: r`True or false? On $(0, \pi)$, the function $y = \log(\sin x)$ has $\dfrac{d^2y}{dx^2} = -\operatorname{cosec}^2 x$.`, key: 't', sol: r`$y' = \dfrac{\cos x}{\sin x} = \cot x$ and $y'' = -\operatorname{cosec}^2 x$. True.`, d: 2, c: 'understanding', t: [5] }), (C) => {
  C.assert(sameD2((x) => L(S(x)), (x) => -1 / S(x) ** 2, [0.6, 1.4, 2.5]), 'second derivative');
  C.key('t');
});
Q('tf3', mk.tf({ stem: r`True or false? The derivative of $x^3$ with respect to $x^2$ is $\dfrac{3}{2}x^2$.`, key: 'f', sol: r`$\dfrac{3x^2}{2x} = \dfrac{3x}{2}$, not $\dfrac{3}{2}x^2$. False.`, d: 1, c: 'understanding', t: [3] }), (C) => {
  C.assert([0.8, 1.7].every((x) => close(wrt((s) => s ** 3, (s) => s * s, x), 1.5 * x) && !close(wrt((s) => s ** 3, (s) => s * s, x), 1.5 * x * x)), '3x/2');
  C.key('f');
});

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`A ball's flight is modelled by $x = 4t$, $y = 2t^2$. The slope $\dfrac{dy}{dx}$ of its path at $t = 3$ is ___.`, acc: [['3', '$3$']], sol: r`$\dfrac{dy}{dx} = \dfrac{4t}{4} = t$, which is $3$ at $t = 3$.`, d: 1, c: 'understanding', t: [2] }), (C) => C.blank(Math.round(pslope((t) => 4 * t, (t) => 2 * t * t, 3) * 1e6) / 1e6));
Q('fb2', mk.fill({ stem: r`The curve $xy + 2y = 10$ passes through $(3, 2)$. Its slope at that point is ___.`, acc: [['-2/5', '-0.4', r`$-\dfrac{2}{5}$`]], sol: r`$y + x\dfrac{dy}{dx} + 2\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{y}{x + 2} = -\dfrac{2}{5} = -0.4$.`, d: 2, c: 'understanding', t: [1] }), (C) => C.blank(Math.round(islope((x, y) => x * y + 2 * y - 10, 3, 2) * 1e6) / 1e6));
Q('fb3', mk.fill({ stem: r`If $y = e^{3x}$, then $\dfrac{d^2y}{dx^2} = k\,y$ for every $x$, where the constant $k$ is ___.`, acc: [['9', '$9$']], sol: r`$y' = 3e^{3x}$ and $y'' = 9e^{3x} = 9y$, so $k = 9$.`, d: 1, c: 'understanding', t: [5] }), (C) => C.blank(Math.round((D2((x) => E(3 * x), 0.4) / E(1.2)) * 1e3) / 1e3));

// =============================================================== numerical
Q('n01', mk.num({ stem: r`Using logarithmic differentiation, find the value of $\dfrac{dy}{dx}$ for $y = x^{x}$ at $x = 3$, correct to two decimal places.`, value: 56.66, tol: 0.01, sol: r`$\dfrac{dy}{dx} = x^{x}(1 + \log x) = 27(1 + \log 3) = 27 \times 2.0986 = 56.66$ to two decimal places.`, scheme: [['$x^{x}(1 + \\log x)$ and value $56.66$', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => C.val(D((x) => x ** x, 3), 0.01));
Q('n02', mk.num({ stem: r`The ellipse-like curve $x^2 + 3xy + y^2 = 11$ passes through $(1, 2)$. Find its slope there, correct to two decimal places.`, value: -1.14, tol: 0.01, sol: r`$2x + 3y + 3x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{2x + 3y}{3x + 2y} = -\dfrac{8}{7} = -1.14$ to two decimal places.`, scheme: [['Implicit derivative and value $-1.14$', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { const F = (x, y) => x * x + 3 * x * y + y * y - 11; C.assert(Math.abs(F(1, 2)) < 1e-12, 'on curve'); C.val(islope(F, 1, 2), 0.01); });
Q('n03', mk.num({ stem: r`A curve is traced by $x = 2t$, $y = t^3 + t$. Find the value of $\dfrac{d^2y}{dx^2}$ when $t = 2$.`, value: 3, sol: r`$\dfrac{dy}{dx} = \dfrac{3t^2 + 1}{2}$, so $\dfrac{d^2y}{dx^2} = \dfrac{6t/2}{2} = \dfrac{3t}{2} = 3$ at $t = 2$.`, scheme: [['$\\dfrac{3t}{2}$ and value $3$', 1]], d: 3, c: 'application', t: [5, 2], time: 120 }), (C) => C.val(pslope2((t) => 2 * t, (t) => t ** 3 + t, 2), 1e-4));
Q('n04', mk.num({ stem: r`Find the derivative of $\tan^{-1} x$ with respect to $x^2$ at $x = 1$.`, value: 0.25, sol: r`$\dfrac{1/(1 + x^2)}{2x} = \dfrac{1}{2x(1 + x^2)}$, which is $\dfrac{1}{4} = 0.25$ at $x = 1$.`, scheme: [['Ratio of derivatives and value $0.25$', 1]], d: 2, c: 'understanding', t: [3], time: 75 }), (C) => C.val(wrt(Math.atan, (s) => s * s, 1), 1e-6));

// =============================================================== short answer (2 marks)
Q('s201', mk.short({ marks: 2, stem: r`A kite's string, drawn on squared paper, follows $y^2 = 4x + 2xy$. Find $\dfrac{dy}{dx}$ in terms of $x$ and $y$.`, model: r`Differentiate: $2y\dfrac{dy}{dx} = 4 + 2y + 2x\dfrac{dy}{dx}$. Collect: $\dfrac{dy}{dx}(2y - 2x) = 4 + 2y$, so $\dfrac{dy}{dx} = \dfrac{2 + y}{y - x}$.`, sol: 'Product rule on 2xy, then collect the derivative terms.', scheme: [['Correct differentiation including product rule', 1], [r`$\dfrac{2 + y}{y - x}$`, 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => {
  const F = (x, y) => y * y - 4 * x - 2 * x * y;
  const pts = [[1, 1 + sq(5)], [2, 2 + sq(12)]];
  C.assert(pts.every(([x, y]) => Math.abs(F(x, y)) < 1e-9 && close(islope(F, x, y), (2 + y) / (y - x))), 'formula matches at two points');
  C.model([r`\dfrac{2 + y}{y - x}`]);
});
Q('s202', mk.short({ marks: 2, stem: r`For the relation $x^3 + xy^2 = 2y$, obtain $\dfrac{dy}{dx}$.`, model: r`$3x^2 + y^2 + 2xy\dfrac{dy}{dx} = 2\dfrac{dy}{dx}$, so $\dfrac{dy}{dx}(2 - 2xy) = 3x^2 + y^2$ and $\dfrac{dy}{dx} = \dfrac{3x^2 + y^2}{2 - 2xy}$ (where $xy \ne 1$).`, sol: 'Implicit differentiation; the product rule on xy².', scheme: [['Differentiation', 1], [r`$\dfrac{3x^2 + y^2}{2 - 2xy}$`, 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => {
  const F = (x, y) => x ** 3 + x * y * y - 2 * y;
  const x0 = 0.5, y0 = 2 - sq(3.75);
  C.assert(Math.abs(F(x0, y0)) < 1e-12 && close(islope(F, x0, y0), (3 * x0 * x0 + y0 * y0) / (2 - 2 * x0 * y0)), 'formula');
  C.model([r`\dfrac{3x^2 + y^2}{2 - 2xy}`]);
});
Q('s203', mk.short({ marks: 2, stem: r`A cam follower moves so that $x = t^2 + 1$ and $y = 2t^3 - t$. Find $\dfrac{dy}{dx}$ in terms of $t$.`, model: r`$\dfrac{dx}{dt} = 2t$ and $\dfrac{dy}{dt} = 6t^2 - 1$, so $\dfrac{dy}{dx} = \dfrac{6t^2 - 1}{2t}$ ($t \ne 0$).`, sol: 'Divide dy/dt by dx/dt.', scheme: [['Both derivatives with respect to $t$', 1], [r`$\dfrac{6t^2 - 1}{2t}$`, 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => {
  C.assert([0.5, 1.4, 2.2].every((t) => close(pslope((u) => u * u + 1, (u) => 2 * u ** 3 - u, t), (6 * t * t - 1) / (2 * t))), 'slope');
  C.model([r`\dfrac{6t^2 - 1}{2t}`]);
});
Q('s204', mk.short({ marks: 2, stem: r`A pendulum bob's trace is $x = 2\sin 2\theta$, $y = 3\cos 2\theta$. Express $\dfrac{dy}{dx}$ in terms of $\theta$.`, model: r`$\dfrac{dx}{d\theta} = 4\cos 2\theta$ and $\dfrac{dy}{d\theta} = -6\sin 2\theta$, so $\dfrac{dy}{dx} = -\dfrac{6\sin 2\theta}{4\cos 2\theta} = -\dfrac{3}{2}\tan 2\theta$.`, sol: 'Chain rule on each, then divide.', scheme: [['Both derivatives with respect to $\\theta$', 1], [r`$-\dfrac{3}{2}\tan 2\theta$`, 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => {
  C.assert([0.2, 0.5, 1].every((t) => close(pslope((u) => 2 * S(2 * u), (u) => 3 * Co(2 * u), t), -1.5 * T(2 * t))), 'slope');
  C.model([r`-\dfrac{3}{2}\tan 2\theta`]);
});
Q('s205', mk.short({ marks: 2, stem: r`Differentiate $e^{x^2}$ with respect to $x^3$ ($x \ne 0$).`, model: r`Let $u = e^{x^2}$ and $v = x^3$. Then $\dfrac{du}{dx} = 2xe^{x^2}$ and $\dfrac{dv}{dx} = 3x^2$, so $\dfrac{du}{dv} = \dfrac{2xe^{x^2}}{3x^2} = \dfrac{2e^{x^2}}{3x}$.`, sol: 'Divide the two derivatives with respect to x.', scheme: [['Both derivatives with respect to $x$', 1], [r`$\dfrac{2e^{x^2}}{3x}$`, 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => {
  C.assert([0.5, 1.2, -0.8].every((x) => close(wrt((s) => E(s * s), (s) => s ** 3, x), (2 * E(x * x)) / (3 * x))), 'ratio');
  C.model([r`\dfrac{2e^{x^2}}{3x}`]);
});
Q('s206', mk.short({ marks: 2, stem: r`Use logarithms to differentiate $y = x^{\cos x}$ for $x > 0$.`, model: r`$\log y = \cos x\log x$. Differentiate: $\dfrac{1}{y}\dfrac{dy}{dx} = -\sin x\log x + \dfrac{\cos x}{x}$. So $\dfrac{dy}{dx} = x^{\cos x}\left(\dfrac{\cos x}{x} - \sin x\log x\right)$.`, sol: 'Take logs, product rule, multiply back by y.', scheme: [['Logs and product rule', 1], ['Multiplied by $y$', 1]], d: 3, c: 'application', t: [4], time: 120 }), (C) => {
  const y = (x) => x ** Co(x);
  C.assert(sameD(y, (x) => y(x) * (Co(x) / x - S(x) * L(x)), [0.5, 1.5, 3]), 'derivative');
  C.model([r`\dfrac{\cos x}{x} - \sin x\log x`]);
});
Q('s207', mk.short({ marks: 2, stem: r`Differentiate $y = (2x + 1)^{x}$, $x > 0$, by taking logarithms.`, model: r`$\log y = x\log(2x + 1)$, so $\dfrac{1}{y}\dfrac{dy}{dx} = \log(2x + 1) + \dfrac{2x}{2x + 1}$. Hence $\dfrac{dy}{dx} = (2x + 1)^{x}\left[\log(2x + 1) + \dfrac{2x}{2x + 1}\right]$.`, sol: 'Product rule after taking logs; the chain rule gives the 2.', scheme: [['Logs and differentiation', 1], ['Final form multiplied by $y$', 1]], d: 3, c: 'application', t: [4], time: 120 }), (C) => {
  const y = (x) => (2 * x + 1) ** x;
  C.assert(sameD(y, (x) => y(x) * (L(2 * x + 1) + (2 * x) / (2 * x + 1)), [0.3, 1, 2]), 'derivative');
  C.model([r`\dfrac{2x}{2x + 1}`]);
});
Q('s208', mk.short({ marks: 2, stem: r`Find the second derivative of $y = x^2e^{x}$.`, model: r`$\dfrac{dy}{dx} = e^{x}(x^2 + 2x)$ and $\dfrac{d^2y}{dx^2} = e^{x}(x^2 + 2x) + e^{x}(2x + 2) = e^{x}(x^2 + 4x + 2)$.`, sol: 'Product rule twice.', scheme: [['First derivative', 1], [r`$e^{x}(x^2 + 4x + 2)$`, 1]], d: 2, c: 'understanding', t: [5], time: 90 }), (C) => {
  C.assert(sameD2((x) => x * x * E(x), (x) => E(x) * (x * x + 4 * x + 2), [-1, 0.5, 1.5]), 'second derivative');
  C.model([r`e^{x}(x^2 + 4x + 2)`]);
});
Q('s209', mk.short({ marks: 2, stem: r`Given $y = (x + 1)e^{-2x}$, show that $\dfrac{d^2y}{dx^2} + 4\dfrac{dy}{dx} + 4y = 0$.`, model: r`$y' = e^{-2x} - 2(x + 1)e^{-2x} = (-2x - 1)e^{-2x}$ and $y'' = -2e^{-2x} + 2(2x + 1)e^{-2x} = 4xe^{-2x}$. Then $y'' + 4y' + 4y = e^{-2x}[4x - 8x - 4 + 4x + 4] = 0$.`, sol: 'Differentiate twice and collect the bracket.', scheme: [["$y'$ and $y''$", 1], ['Substitution gives $0$', 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => {
  const y = (x) => (x + 1) * E(-2 * x);
  C.assert([0, 0.6, 1.4].every((x) => Math.abs(D2(y, x) + 4 * D(y, x) + 4 * y(x)) < 1e-4), 'relation holds');
  C.assert(sameD2(y, (x) => 4 * x * E(-2 * x), [0.5, 1.2]), "y''");
  C.model(['4xe^{-2x}', '= 0']);
});

// =============================================================== short answer (3 marks)
Q('s301', mk.short({ marks: 3, stem: r`An oval racing circuit is drawn as $x^2 - xy + y^2 = 7$. Find $\dfrac{dy}{dx}$ in general, and its value at the point $(3, 1)$ of the circuit.`, model: r`Check: $9 - 3 + 1 = 7$. Differentiate: $2x - y - x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = \dfrac{2x - y}{x - 2y}$. At $(3, 1)$: $\dfrac{6 - 1}{3 - 2} = 5$.`, sol: 'Remember the product rule on xy.', scheme: [['Differentiation with product rule', 1], [r`$\dfrac{2x - y}{x - 2y}$`, 1], ['Value $5$ at $(3, 1)$', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
  const F = (x, y) => x * x - x * y + y * y - 7;
  C.assert(Math.abs(F(3, 1)) < 1e-12 && close(islope(F, 3, 1), 5), 'slope 5');
  C.assert(close(islope(F, 2, branch(F, 3)(2)), (4 - branch(F, 3)(2)) / (2 - 2 * branch(F, 3)(2))), 'general formula');
  C.model([5, r`\dfrac{2x - y}{x - 2y}`]);
});
Q('s302', mk.short({ marks: 3, stem: r`A sound engineer's trace satisfies $\sin(x + y) = 2x$. Show that $\dfrac{dy}{dx} = 2\sec(x + y) - 1$.`, model: r`Differentiate: $\cos(x + y)\left(1 + \dfrac{dy}{dx}\right) = 2$. So $1 + \dfrac{dy}{dx} = \dfrac{2}{\cos(x + y)} = 2\sec(x + y)$, and $\dfrac{dy}{dx} = 2\sec(x + y) - 1$.`, sol: 'Chain rule on sin(x + y), then divide by the cosine.', scheme: [['Chain rule on $\\sin(x + y)$', 1], ['Isolate $1 + \\dfrac{dy}{dx}$', 1], ['Final form', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
  const F = (x, y) => S(x + y) - 2 * x;
  const x0 = 0.25, y0 = P / 6 - 0.25;
  C.assert(Math.abs(F(x0, y0)) < 1e-12 && close(islope(F, x0, y0), 2 / Co(x0 + y0) - 1), 'formula at a point');
  C.model([r`2\sec(x + y) - 1`]);
});
Q('s303', mk.short({ marks: 3, stem: r`A sensor reading is described by $x = \log t$, $y = t^2 + t$ ($t > 0$). Find $\dfrac{dy}{dx}$ and $\dfrac{d^2y}{dx^2}$ in terms of $t$, and evaluate the second derivative at $t = 1$.`, model: r`$\dfrac{dx}{dt} = \dfrac{1}{t}$, $\dfrac{dy}{dt} = 2t + 1$, so $\dfrac{dy}{dx} = t(2t + 1) = 2t^2 + t$. Then $\dfrac{d^2y}{dx^2} = (4t + 1) \div \dfrac{1}{t} = 4t^2 + t$, which is $5$ at $t = 1$.`, sol: 'Second derivative: differentiate dy/dx with respect to t, then divide by dx/dt.', scheme: [['$\\dfrac{dy}{dx} = 2t^2 + t$', 1], ['$\\dfrac{d^2y}{dx^2} = 4t^2 + t$', 1], ['Value $5$', 1]], d: 3, c: 'application', t: [2, 5], time: 180 }), (C) => {
  const X = L, Y = (t) => t * t + t;
  C.assert([0.6, 1.5].every((t) => close(pslope(X, Y, t), 2 * t * t + t) && close(pslope2(X, Y, t), 4 * t * t + t, 1e-4)), 'derivatives');
  C.model(['2t^2 + t', '4t^2 + t', 5]);
});
Q('s304', mk.short({ marks: 3, stem: r`For $0 < x < 1$, differentiate $\cos^{-1}(1 - 2x^2)$ with respect to $\sin^{-1} x$. (Hint: put $x = \sin\theta$.)`, model: r`Put $x = \sin\theta$ with $0 < \theta < \dfrac{\pi}{2}$. Then $1 - 2x^2 = 1 - 2\sin^2\theta = \cos 2\theta$, and since $0 < 2\theta < \pi$, $\cos^{-1}(\cos 2\theta) = 2\theta = 2\sin^{-1} x$. So the first function is twice the second, and the derivative is $2$.`, sol: 'Rewrite the first function in terms of the second; check the range of 2θ.', scheme: [['Substitution and $\\cos 2\\theta$', 1], ['Range check, $2\\sin^{-1} x$', 1], ['Derivative $2$', 1]], d: 3, c: 'analysis', t: [3], time: 180 }), (C) => {
  C.assert([0.2, 0.5, 0.85].every((x) => close(wrt((s) => Math.acos(1 - 2 * s * s), Math.asin, x), 2, 1e-4)), 'derivative 2');
  C.model([2, r`2\sin^{-1} x`]);
});
Q('s305', mk.short({ marks: 3, stem: r`A storage tank's design formula is $y = \dfrac{(x^2 + 1)^3\sqrt{x - 1}}{(x + 3)^4}$ for $x > 1$. Use logarithmic differentiation to find $\dfrac{dy}{dx}$ at $x = 2$.`, model: r`$\log y = 3\log(x^2 + 1) + \dfrac12\log(x - 1) - 4\log(x + 3)$, so $\dfrac{1}{y}\dfrac{dy}{dx} = \dfrac{6x}{x^2 + 1} + \dfrac{1}{2(x - 1)} - \dfrac{4}{x + 3}$. At $x = 2$: $y = \dfrac{125 \times 1}{625} = 0.2$ and the bracket is $\dfrac{12}{5} + \dfrac12 - \dfrac45 = 2.1$. So $\dfrac{dy}{dx} = 0.2 \times 2.1 = 0.42$.`, sol: 'Expand the logarithm first, then substitute x = 2.', scheme: [['Logarithms expanded', 1], ['Bracket $2.1$ and $y = 0.2$', 1], ['$\\dfrac{dy}{dx} = 0.42$', 1]], d: 3, c: 'application', t: [4], time: 180 }), (C) => {
  const y = (x) => ((x * x + 1) ** 3 * sq(x - 1)) / (x + 3) ** 4;
  C.assert(close(y(2), 0.2) && close(D(y, 2), 0.42), 'value 0.42');
  C.model([0.2, 2.1, 0.42]);
});
Q('s306', mk.short({ marks: 3, stem: r`For $y = x^{x} + x^{1/x}$ ($x > 0$), find $\dfrac{dy}{dx}$ and its value at $x = 1$.`, model: r`Differentiate each term separately by logarithms. $u = x^{x}$: $\dfrac{du}{dx} = x^{x}(1 + \log x)$. $v = x^{1/x}$: $\log v = \dfrac{\log x}{x}$, so $\dfrac{dv}{dx} = x^{1/x} \cdot \dfrac{1 - \log x}{x^2}$. Hence $\dfrac{dy}{dx} = x^{x}(1 + \log x) + x^{1/x}\,\dfrac{1 - \log x}{x^2}$, and at $x = 1$ this is $1 + 1 = 2$.`, sol: 'Never take the log of a sum: split into two terms.', scheme: [['Derivative of $x^{x}$', 1], ['Derivative of $x^{1/x}$', 1], ['Sum and value $2$', 1]], d: 3, c: 'application', t: [4], time: 180 }), (C) => {
  const y = (x) => x ** x + x ** (1 / x);
  C.assert(sameD(y, (x) => x ** x * (1 + L(x)) + x ** (1 / x) * ((1 - L(x)) / (x * x)), [0.5, 1.5, 2.5]) && close(D(y, 1), 2), 'derivative and value 2');
  C.model([2, r`\dfrac{1 - \log x}{x^2}`]);
});
Q('s307', mk.short({ marks: 3, stem: r`If $y = x\sin(\log x)$ for $x > 0$, prove that $x^2\dfrac{d^2y}{dx^2} - x\dfrac{dy}{dx} + 2y = 0$.`, model: r`$\dfrac{dy}{dx} = \sin(\log x) + x\cos(\log x) \cdot \dfrac{1}{x} = \sin(\log x) + \cos(\log x)$. Then $\dfrac{d^2y}{dx^2} = \dfrac{\cos(\log x) - \sin(\log x)}{x}$. So $x^2y'' - xy' + 2y = x[\cos(\log x) - \sin(\log x)] - x[\sin(\log x) + \cos(\log x)] + 2x\sin(\log x) = 0$.`, sol: 'Chain rule on sin(log x); collect the sine and cosine terms.', scheme: [["$y'$", 1], ["$y''$", 1], ['Substitution gives $0$', 1]], d: 4, c: 'application', t: [5], time: 210 }), (C) => {
  const y = (x) => x * S(L(x));
  C.assert([0.5, 1.7, 3].every((x) => Math.abs(x * x * D2(y, x) - x * D(y, x) + 2 * y(x)) < 1e-4), 'relation holds');
  C.model([r`\sin(\log x) + \cos(\log x)`, '= 0']);
});
Q('s308', mk.short({ marks: 3, stem: r`For the parabola $y^2 = 8x$ ($y \ne 0$), show that $\dfrac{d^2y}{dx^2} = -\dfrac{16}{y^3}$.`, model: r`$2y\dfrac{dy}{dx} = 8$, so $\dfrac{dy}{dx} = \dfrac{4}{y}$. Differentiate again: $\dfrac{d^2y}{dx^2} = -\dfrac{4}{y^2}\dfrac{dy}{dx} = -\dfrac{4}{y^2} \cdot \dfrac{4}{y} = -\dfrac{16}{y^3}$.`, sol: 'Differentiate dy/dx = 4/y again, remembering dy/dx from the chain rule.', scheme: [[r`$\dfrac{dy}{dx} = \dfrac{4}{y}$`, 1], ['Second differentiation with chain rule', 1], [r`$-\dfrac{16}{y^3}$`, 1]], d: 3, c: 'application', t: [5, 1], time: 150 }), (C) => {
  const y = (x) => sq(8 * x);
  C.assert(sameD2(y, (x) => -16 / y(x) ** 3, [0.5, 2, 4.5]), 'second derivative');
  C.model([r`-\dfrac{16}{y^3}`]);
});
Q('s309', mk.short({ marks: 3, stem: r`A gear-tooth outline is $x = 3\cos t - \cos 3t$, $y = 3\sin t - \sin 3t$. Show that $\dfrac{dy}{dx} = \tan 2t$.`, model: r`$\dfrac{dx}{dt} = -3\sin t + 3\sin 3t$ and $\dfrac{dy}{dt} = 3\cos t - 3\cos 3t$. So $\dfrac{dy}{dx} = \dfrac{\cos t - \cos 3t}{\sin 3t - \sin t} = \dfrac{2\sin 2t\sin t}{2\cos 2t\sin t} = \tan 2t$.`, sol: 'Use the sum-to-product formulae on the numerator and the denominator.', scheme: [['Both parametric derivatives', 1], ['Sum-to-product on both', 1], ['Simplify to $\\tan 2t$', 1]], d: 3, c: 'application', t: [2], time: 180 }), (C) => {
  const X = (t) => 3 * Co(t) - Co(3 * t), Y = (t) => 3 * S(t) - S(3 * t);
  C.assert([0.3, 0.6, 1].every((t) => close(pslope(X, Y, t), T(2 * t))), 'tan 2t');
  C.model([r`\tan 2t`]);
});
Q('s310', mk.short({ marks: 3, stem: r`Differentiate $x^{x}$ with respect to $x\log x$ ($x > 0$, $x \ne \dfrac{1}{e}$), and simplify.`, model: r`$\dfrac{d}{dx}(x^{x}) = x^{x}(1 + \log x)$ by logarithms, and $\dfrac{d}{dx}(x\log x) = \log x + 1$. The ratio is $\dfrac{x^{x}(1 + \log x)}{1 + \log x} = x^{x}$.`, sol: 'Both derivatives contain the factor 1 + log x.', scheme: [['Derivative of $x^{x}$', 1], ['Derivative of $x\\log x$', 1], ['Ratio $x^{x}$', 1]], d: 3, c: 'application', t: [3, 4], time: 150 }), (C) => {
  C.assert([0.6, 1.3, 2].every((x) => close(wrt((s) => s ** s, (s) => s * L(s), x), x ** x, 1e-4)), 'ratio x^x');
  C.model([r`= x^{x}`]);
});

// =============================================================== long answer (5 marks, in parts)
const F01 = (x, y) => x * x + x * y + 2 * y * y - 16;
Q('l01', mk.long({ stem: r`A lens profile on a drawing satisfies $x^2 + xy + 2y^2 = 16$, and the point $(2, 2)$ lies on it.\n\n(a) Find $\dfrac{dy}{dx}$ and its value at $(2, 2)$. [2]\n\n(b) Find the value of $\dfrac{d^2y}{dx^2}$ at $(2, 2)$. [3]`, model: r`**(a)** $2x + y + x\dfrac{dy}{dx} + 4y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{2x + y}{x + 4y}$; at $(2, 2)$ this is $-\dfrac{6}{10} = -\dfrac{3}{5}$.\n\n**(b)** Differentiate $2x + y + (x + 4y)y' = 0$ again: $2 + y' + (1 + 4y')y' + (x + 4y)y'' = 0$, i.e. $(x + 4y)y'' = -(2 + 2y' + 4y'^2)$. At $(2, 2)$ with $y' = -\dfrac35$: $2 - \dfrac65 + \dfrac{36}{25} = \dfrac{56}{25}$, so $10y'' = -\dfrac{56}{25}$ and $y'' = -\dfrac{28}{125} = -0.224$.`, sol: 'Differentiate the once-differentiated equation again; substitute the point and the first derivative.', scheme: [[r`$\dfrac{dy}{dx} = -\dfrac{2x + y}{x + 4y}$`, 1], [r`Value $-\dfrac{3}{5}$`, 1], ['Second differentiation', 1], ['Substitution', 1], [r`$-\dfrac{28}{125}$`, 1]], d: 4, c: 'application', t: [1, 5], time: 420 }), (C) => {
  const y = branch(F01, 2);
  C.assert(close(y(2), 2) && close(D(y, 2), -0.6) && close(D2(y, 2), -28 / 125, 1e-4), 'slope -3/5, second derivative -28/125');
  C.model([0.224, r`-\dfrac{3}{5}`, r`-\dfrac{28}{125}`]);
});
const X02 = (t) => t * t - 1, Y02 = (t) => t ** 3 - t;
Q('l02', mk.long({ stem: r`A loop-shaped trace is given by $x = t^2 - 1$, $y = t^3 - t$.\n\n(a) Find $\dfrac{dy}{dx}$ in terms of $t$. [2]\n\n(b) Show that $\dfrac{d^2y}{dx^2} = \dfrac{3t^2 + 1}{4t^3}$ and find its value at $t = 1$. [3]`, model: r`**(a)** $\dfrac{dx}{dt} = 2t$ and $\dfrac{dy}{dt} = 3t^2 - 1$, so $\dfrac{dy}{dx} = \dfrac{3t^2 - 1}{2t}$.\n\n**(b)** $\dfrac{d}{dt}\left(\dfrac{3t^2 - 1}{2t}\right) = \dfrac{6t \cdot 2t - (3t^2 - 1) \cdot 2}{4t^2} = \dfrac{6t^2 + 2}{4t^2} = \dfrac{3t^2 + 1}{2t^2}$. Divide by $\dfrac{dx}{dt} = 2t$: $\dfrac{d^2y}{dx^2} = \dfrac{3t^2 + 1}{4t^3}$. At $t = 1$: $\dfrac{4}{4} = 1$.`, sol: 'Quotient rule in t, then divide by dx/dt.', scheme: [['Both parametric derivatives', 1], [r`$\dfrac{3t^2 - 1}{2t}$`, 1], ['Derivative of $\\dfrac{dy}{dx}$ with respect to $t$', 1], ['Divide by $\\dfrac{dx}{dt}$', 1], ['Value $1$ at $t = 1$', 1]], d: 3, c: 'application', t: [2, 5], time: 420 }), (C) => {
  C.assert([0.7, 1, 1.6].every((t) => close(pslope(X02, Y02, t), (3 * t * t - 1) / (2 * t)) && close(pslope2(X02, Y02, t), (3 * t * t + 1) / (4 * t ** 3), 1e-4)), 'derivatives');
  C.assert(close(pslope2(X02, Y02, 1), 1, 1e-4), 'value 1');
  C.model([r`\dfrac{3t^2 - 1}{2t}`, r`\dfrac{3t^2 + 1}{4t^3}`]);
});
const y03 = (x) => (1 + x) ** x + x ** (1 + x);
Q('l03', mk.long({ stem: r`Let $y = (1 + x)^{x} + x^{1 + x}$ for $x > 0$.\n\n(a) Using logarithms on each term, find $\dfrac{dy}{dx}$. [3]\n\n(b) Find the value of $\dfrac{dy}{dx}$ at $x = 1$, correct to two decimal places. [2]`, model: r`**(a)** For $u = (1 + x)^{x}$: $\log u = x\log(1 + x)$, so $\dfrac{du}{dx} = (1 + x)^{x}\left[\log(1 + x) + \dfrac{x}{1 + x}\right]$.\n\nFor $v = x^{1 + x}$: $\log v = (1 + x)\log x$, so $\dfrac{dv}{dx} = x^{1 + x}\left[\log x + \dfrac{1 + x}{x}\right]$.\n\nSo $\dfrac{dy}{dx} = (1 + x)^{x}\left[\log(1 + x) + \dfrac{x}{1 + x}\right] + x^{1 + x}\left[\log x + \dfrac{1 + x}{x}\right]$.\n\n**(b)** At $x = 1$: $2\left(\log 2 + \dfrac12\right) + 1 \times (0 + 2) = 3 + 2\log 2 = 4.39$.`, sol: 'Treat the two terms separately; never take the log of a sum.', scheme: [['Derivative of $(1 + x)^{x}$', 1], ['Derivative of $x^{1 + x}$', 1], ['Sum written', 1], ['Substitution at $x = 1$', 1], ['$3 + 2\\log 2 = 4.39$', 1]], d: 4, c: 'application', t: [4], time: 420 }), (C) => {
  C.assert(sameD(y03, (x) => (1 + x) ** x * (L(1 + x) + x / (1 + x)) + x ** (1 + x) * (L(x) + (1 + x) / x), [0.5, 1, 2]), 'derivative');
  C.assert(Math.abs(D(y03, 1) - 4.39) < 0.005 && close(3 + 2 * L(2), D(y03, 1)), 'value 4.39');
  C.model([4.39, r`3 + 2\log 2`]);
});
const y04 = (x) => E(3 * Math.atan(x));
Q('l04', mk.long({ stem: r`A smoothly rising calibration curve is modelled by $y = e^{3\tan^{-1} x}$ for every real $x$.\n\n(a) Show that its slope satisfies $(1 + x^2)\dfrac{dy}{dx} = 3y$. [2]\n\n(b) Hence prove that $(1 + x^2)\dfrac{d^2y}{dx^2} + (2x - 3)\dfrac{dy}{dx} = 0$. [3]`, model: r`**(a)** $\dfrac{dy}{dx} = e^{3\tan^{-1} x} \cdot \dfrac{3}{1 + x^2} = \dfrac{3y}{1 + x^2}$, so $(1 + x^2)\dfrac{dy}{dx} = 3y$.\n\n**(b)** Differentiate $(1 + x^2)y' = 3y$ with respect to $x$: $2xy' + (1 + x^2)y'' = 3y'$. Rearranging, $(1 + x^2)y'' + (2x - 3)y' = 0$.`, sol: 'Clear the denominator first, then differentiate the product.', scheme: [['Chain rule on $e^{3\\tan^{-1} x}$', 1], ['$(1 + x^2)y\' = 3y$', 1], ['Differentiate the product', 1], ['Use $3y\'$ on the right', 1], ['Rearranged relation', 1]], d: 3, c: 'application', t: [5], time: 360 }), (C) => {
  C.assert([-0.5, 0.4, 1.3].every((x) => close((1 + x * x) * D(y04, x), 3 * y04(x))), '(a)');
  C.assert([-0.5, 0.4, 1.3].every((x) => Math.abs((1 + x * x) * D2(y04, x) + (2 * x - 3) * D(y04, x)) < 1e-3), '(b)');
  C.model(['(2x - 3)y', '= 3y']);
});
const F05 = (x, y) => E(x * y) - x - y;
Q('l05', mk.long({ stem: r`(a) Differentiate $\sin^{-1} x$ with respect to $\sqrt{1 - x^2}$, for $0 < x < 1$. [2]\n\n(b) The curve $e^{xy} = x + y$ passes through $(0, 1)$. Find $\dfrac{dy}{dx}$ in general and show that the tangent at $(0, 1)$ is horizontal. [3]`, model: r`**(a)** $\dfrac{d}{dx}\sin^{-1} x = \dfrac{1}{\sqrt{1 - x^2}}$ and $\dfrac{d}{dx}\sqrt{1 - x^2} = -\dfrac{x}{\sqrt{1 - x^2}}$. The ratio is $-\dfrac{1}{x}$.\n\n**(b)** $e^{xy}\left(y + x\dfrac{dy}{dx}\right) = 1 + \dfrac{dy}{dx}$, so $\dfrac{dy}{dx} = \dfrac{1 - ye^{xy}}{xe^{xy} - 1}$. At $(0, 1)$: $\dfrac{1 - 1}{0 - 1} = 0$, so the tangent is horizontal.`, sol: 'Part (b): chain rule on e^{xy}, product rule on xy.', scheme: [['Both derivatives in (a)', 1], [r`$-\dfrac{1}{x}$`, 1], ['Implicit differentiation in (b)', 1], ['General $\\dfrac{dy}{dx}$', 1], ['Value $0$: horizontal tangent', 1]], d: 3, c: 'application', t: [3, 1], time: 360 }), (C) => {
  C.assert([0.3, 0.6, 0.9].every((x) => close(wrt(Math.asin, (s) => sq(1 - s * s), x), -1 / x, 1e-4)), '(a) -1/x');
  C.assert(Math.abs(F05(0, 1)) < 1e-12 && Math.abs(islope(F05, 0, 1)) < 1e-9, '(b) slope 0');
  const yb = branch(F05, 1);
  C.assert(close(D(yb, 0.1), (1 - yb(0.1) * E(0.1 * yb(0.1))) / (0.1 * E(0.1 * yb(0.1)) - 1), 1e-4), '(b) general formula');
  C.model([r`-\dfrac{1}{x}`, r`\dfrac{1 - ye^{xy}}{xe^{xy} - 1}`, 'horizontal']);
});
const X06 = (t) => 4 * t, Y06 = (t) => 8 * t - t * t;
Q('l06', mk.long({ stem: r`A survey drone flies so that, $t$ seconds after take-off, $x = 4t$ and $y = 8t - t^2$ (in metres).\n\n(a) Find $\dfrac{dy}{dx}$ in terms of $t$. [2]\n\n(b) Find $\dfrac{d^2y}{dx^2}$ and say what its sign tells you about the shape of the path. [2]\n\n(c) Find the point where the drone is flying level. [1]`, model: r`**(a)** $\dfrac{dy}{dx} = \dfrac{8 - 2t}{4} = 2 - \dfrac{t}{2}$.\n\n**(b)** $\dfrac{d^2y}{dx^2} = \dfrac{-1/2}{4} = -\dfrac{1}{8}$, a negative constant: the path bends downwards everywhere (it is concave down, a parabola).\n\n**(c)** Level flight: $\dfrac{dy}{dx} = 0$, so $t = 4$, giving the point $(16, 16)$.`, sol: 'Divide by dx/dt = 4 at each stage.', scheme: [['Both parametric derivatives', 1], [r`$2 - \dfrac{t}{2}$`, 1], [r`$-\dfrac{1}{8}$`, 1], ['Interpretation: bends downwards', 1], ['Point $(16, 16)$', 1]], d: 3, c: 'application', t: [2, 5], time: 360 }), (C) => {
  C.assert([1, 3, 6].every((t) => close(pslope(X06, Y06, t), 2 - t / 2) && close(pslope2(X06, Y06, t), -1 / 8, 1e-4)), 'derivatives');
  C.assert(Math.abs(pslope(X06, Y06, 4)) < 1e-9 && X06(4) === 16 && Y06(4) === 16, 'level at (16, 16)');
  C.model([16, r`-\dfrac{1}{8}`, r`2 - \dfrac{t}{2}`]);
});

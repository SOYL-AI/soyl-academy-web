// ISC 12 Mathematics ch12 Differential Equations — practice bank with independent re-solve checks.
// Every stated solution is substituted back into its equation numerically (derivatives by central
// differences) at several points; particular solutions are also checked at the initial point and against an
// RK4 integration of the initial-value problem; formed equations are checked on several members of the family;
// homogeneity is tested numerically; integrating factors are checked through mu'/mu = P. Set-ups are SOYL's own
// (D-036) and none repeats the CBSE 12 ch09 bank. Second-order equations appear only in formation and
// verification, never as equations to be solved (removed from the ISC 2027 syllabus).
import { Q, mk } from '../../isc-12-mathematics-ch01/src/lib.mjs';
import { D, D2, near, solves, rk4, od, homDegree } from './ode.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter becomes a newline. */
const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const D3 = (g, x, h = 2e-3) => (g(x + 2 * h) - 2 * g(x + h) + 2 * g(x - h) - g(x - 2 * h)) / (2 * h ** 3);
const L = Math.log, E = Math.exp, S = Math.sin, Co = Math.cos, T = Math.tan, sq = Math.sqrt, P = Math.PI;
/** True when every member g of a family satisfies F(x, y, y', y'') = 0 at the sample points. */
const allSolve = (F, members, xs, tol = 1e-4) => members.every((g) => solves(F, g, xs, tol));
/** Integrating-factor check: mu'(x)/mu(x) equals P(x) at the sample points. */
const isIF = (mu, Pf, xs) => xs.every((x) => near(D(mu, x) / mu(x), Pf(x), 1e-5));
export { D, D2, near, solves, rk4, od, homDegree, allSolve, isIF };

// =============================================================== MCQ — t01 order, degree, solutions
Q('m01', mk.mcq({ stem: r`A model of a sagging telephone cable leads to $\left(\dfrac{d^2y}{dx^2}\right)^3 - 5x\dfrac{dy}{dx} + y^4 = 0$. Its order and degree are`, opts: ['order $2$, degree $3$', 'order $3$, degree $2$', 'order $2$, degree $4$', 'order $1$, degree $4$'], key: 'a', sol: r`The highest derivative present is $\dfrac{d^2y}{dx^2}$, so the order is $2$. The equation is a polynomial in the derivatives and that highest derivative is raised to the power $3$, so the degree is $3$. The power of $y$ itself ($4$) plays no part.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => {
  const o = od([[2, 3], [1, 1], [0, 4]]);
  C.which([[2, 3], [3, 2], [2, 4], [1, 4]], [o.order, o.degree]);
});

Q('m02', mk.mcq({ stem: r`Four equations turn up in a physics worksheet on oscillations. For which one is the **degree not defined**?`, opts: [r`$\dfrac{d^2y}{dx^2} + e^{dy/dx} = x$`, r`$\left(\dfrac{d^2y}{dx^2}\right)^2 + \dfrac{dy}{dx} = 0$`, r`$\dfrac{d^3y}{dx^3} + xy = \sin x$`, r`$\sqrt{1 + \dfrac{dy}{dx}} = \dfrac{d^2y}{dx^2}$`], key: 'a', sol: r`An exponential of a derivative cannot be written as a polynomial in the derivatives, so the first equation has no degree. The second has degree $2$; in the third, $\sin x$ involves only $x$, so its degree is $1$; the fourth becomes $\left(\dfrac{d^2y}{dx^2}\right)^2 = 1 + \dfrac{dy}{dx}$ after squaring, degree $2$.`, d: 3, c: 'analysis', t: [1], time: 75 }), (C) => {
  const degs = [od([[2, 1], [1, 1]], false).degree, od([[2, 2], [1, 1]]).degree, od([[3, 1], [0, 1]]).degree, od([[2, 2], [1, 1]]).degree];
  C.which(degs.map((g) => g === null), true);
});

Q('m03', mk.mcq({ stem: r`The family $y = Ae^{x} + Bxe^{x} + Ce^{-x}$ has three independent arbitrary constants. Eliminating them gives a differential equation of order`, opts: ['$3$', '$2$', '$1$', '$4$'], key: 'a', sol: r`Each independent arbitrary constant needs one differentiation to remove it, so three constants lead to an equation of order $3$ (here $y''' - y'' - y' + y = 0$).`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => {
  const fam = [[1, 2, -1], [0.5, -1, 3]].map(([A, B, K]) => (x) => A * E(x) + B * x * E(x) + K * E(-x));
  C.assert(fam.every((g) => [0, 0.5].every((x) => Math.abs(D3(g, x) - D2(g, x) - D(g, x) + g(x)) < 1e-3)), 'third-order equation holds');
  C.which([3, 2, 1, 4], 3);
});

const F04 = (x, y, y1, y2) => y2 + 9 * y;
Q('m04', mk.mcq({ stem: r`A spring-and-mass toy obeys $\dfrac{d^2y}{dx^2} + 9y = 0$. Which function below satisfies this equation?`, opts: [r`$y = 4\cos 3x$`, r`$y = e^{3x}$`, r`$y = \sin 9x$`, r`$y = 3x^2$`], key: 'a', sol: r`For $y = 4\cos 3x$: $y'' = -36\cos 3x = -9y$, so $y'' + 9y = 0$. For $e^{3x}$, $y'' = 9y$ (wrong sign); for $\sin 9x$, $y'' = -81y$; for $3x^2$, $y'' = 6 \ne -27x^2$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const xs = [0.2, 0.7, 1.3];
  C.which([(x) => 4 * Co(3 * x), (x) => E(3 * x), (x) => S(9 * x), (x) => 3 * x * x].map((g) => solves(F04, g, xs)), true);
});

Q('m05', mk.mcq({ stem: r`A cooling-coffee worksheet gives the equation $\dfrac{dy}{dx} = -2y$. The function $y = 7e^{-2x}$, which contains no arbitrary constant, is`, opts: ['a particular solution', 'the general solution', 'not a solution', 'a solution only at $x = 0$'], key: 'a', sol: r`$\dfrac{dy}{dx} = -14e^{-2x} = -2y$ for every $x$, so it is a solution. It has no arbitrary constant: it is the member $C = 7$ of the general solution $y = Ce^{-2x}$, i.e. a particular solution.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => {
  C.assert(solves((x, y, y1) => y1 + 2 * y, (x) => 7 * E(-2 * x), [-0.5, 0.3, 1.1]), 'solves for all x');
  C.key('a');
});

// =============================================================== MCQ — t02 formation
const lines06 = [2, -1.5].map((m) => (x) => m * x);
Q('m06', mk.mcq({ stem: r`On a drawing board, every straight line through the origin is $y = mx$, with $m$ arbitrary. The differential equation of this whole family is`, opts: [r`$x\dfrac{dy}{dx} = y$`, r`$\dfrac{dy}{dx} = y$`, r`$x\dfrac{dy}{dx} + y = 0$`, r`$\dfrac{d^2y}{dx^2} = \dfrac{dy}{dx}$`], key: 'a', sol: r`One constant, so differentiate once: $\dfrac{dy}{dx} = m$. Eliminate $m = \dfrac{y}{x}$: $x\dfrac{dy}{dx} = y$. The last option is also satisfied only when $m = 0$, so it does not describe the family.`, d: 2, c: 'application', t: [2], time: 60 }), (C) => {
  const xs = [0.5, 1.2, 2];
  const Fs = [(x, y, y1) => x * y1 - y, (x, y, y1) => y1 - y, (x, y, y1) => x * y1 + y, (x, y, y1, y2) => y2 - y1];
  C.which(Fs.map((F) => allSolve(F, lines06, xs)), true);
});

const fam07 = [1, -2.5].map((a) => (x) => a * E(3 * x));
Q('m07', mk.mcq({ stem: r`A microbe count follows one of the curves $y = ae^{3x}$, where $a$ depends on the starting sample. Eliminating $a$ gives`, opts: [r`$\dfrac{dy}{dx} = 3y$`, r`$\dfrac{dy}{dx} = 3xy$`, r`$\dfrac{dy}{dx} = y + 3$`, r`$\dfrac{d^2y}{dx^2} = 3y$`], key: 'a', sol: r`$\dfrac{dy}{dx} = 3ae^{3x} = 3y$. The second derivative would be $9y$, not $3y$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => {
  const xs = [-0.4, 0.2, 0.6];
  const Fs = [(x, y, y1) => y1 - 3 * y, (x, y, y1) => y1 - 3 * x * y, (x, y, y1) => y1 - y - 3, (x, y, y1, y2) => y2 - 3 * y];
  C.which(Fs.map((F) => allSolve(F, fam07, xs)), true);
});

const fam08 = [[1, 2], [-3, 0.5]].map(([A, B]) => (x) => A * S(2 * x) + B * Co(2 * x));
Q('m08', mk.mcq({ stem: r`A tuning-fork trace is modelled by the two-constant family $y = A\sin 2x + B\cos 2x$. The differential equation free of $A$ and $B$ is`, opts: [r`$\dfrac{d^2y}{dx^2} + 4y = 0$`, r`$\dfrac{d^2y}{dx^2} - 4y = 0$`, r`$\dfrac{d^2y}{dx^2} + 2y = 0$`, r`$\dfrac{dy}{dx} + 4y = 0$`], key: 'a', sol: r`Two constants, so differentiate twice: $y'' = -4A\sin 2x - 4B\cos 2x = -4y$. Hence $y'' + 4y = 0$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  const xs = [0.1, 0.8, 1.5];
  const Fs = [(x, y, y1, y2) => y2 + 4 * y, (x, y, y1, y2) => y2 - 4 * y, (x, y, y1, y2) => y2 + 2 * y, (x, y, y1) => y1 + 4 * y];
  C.which(Fs.map((F) => allSolve(F, fam08, xs)), true);
});

// =============================================================== MCQ — t03 variable separable
const F09 = (x, y, y1) => y1 - E(2 * x - y);
Q('m09', mk.mcq({ stem: r`The rate equation $\dfrac{dy}{dx} = e^{2x - y}$ is first rewritten as $e^{y}\,dy = e^{2x}\,dx$. Its general solution is`, opts: [r`$e^{y} = \dfrac{1}{2}e^{2x} + C$`, r`$e^{-y} = \dfrac{1}{2}e^{2x} + C$`, r`$e^{y} = 2e^{2x} + C$`, r`$y = 2x + C$`], key: 'a', sol: r`$\int e^{y}\,dy = \int e^{2x}\,dx$ gives $e^{y} = \dfrac{1}{2}e^{2x} + C$. Integrating $e^{2x}$ to $2e^{2x}$ is the usual slip.`, d: 2, c: 'application', t: [3], time: 75 }), (C) => {
  const xs = [-0.3, 0.2, 0.9];
  const opts = [(K) => (x) => L(E(2 * x) / 2 + K), (K) => (x) => -L(E(2 * x) / 2 + K), (K) => (x) => L(2 * E(2 * x) + K), (K) => (x) => 2 * x + K];
  C.which(opts.map((o) => [1, 3].every((K) => solves(F09, o(K), xs))), true);
});

const y10 = (x) => T(x + 0.3) - x;
Q('m10', mk.mcq({ stem: r`To solve $\dfrac{dy}{dx} = (x + y)^2$, a student puts $v = x + y$. The equation for $v$ becomes`, opts: [r`$\dfrac{dv}{dx} = 1 + v^2$`, r`$\dfrac{dv}{dx} = v^2$`, r`$\dfrac{dv}{dx} = 1 - v^2$`, r`$\dfrac{dv}{dx} = 1 + v$`], key: 'a', sol: r`$\dfrac{dv}{dx} = 1 + \dfrac{dy}{dx} = 1 + v^2$, which separates as $\dfrac{dv}{1 + v^2} = dx$. Forgetting the $1$ from differentiating $x$ gives $v^2$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => {
  const xs = [0, 0.4, 0.8];
  C.assert(solves((x, y, y1) => y1 - (x + y) ** 2, y10, xs), 'y = tan(x + 0.3) - x solves the original');
  const v = (x) => x + y10(x);
  C.which([(u) => 1 + u * u, (u) => u * u, (u) => 1 - u * u, (u) => 1 + u].map((g) => xs.every((x) => near(D(v, x), g(v(x)), 1e-5))), true);
});

Q('m11', mk.mcq({ stem: r`A savings model obeys $\dfrac{dy}{dx} = 3x^2y$ with $y = 2$ when $x = 0$. The value of $y$ at $x = 1$ is`, opts: ['$2e$', '$2e^3$', '$e^2$', '$2 + e$'], key: 'a', sol: r`Separate: $\dfrac{dy}{y} = 3x^2\,dx$, so $\log y = x^3 + C$ and $y = 2e^{x^3}$. At $x = 1$, $y = 2e$.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => {
  const y1 = rk4((x, y) => 3 * x * x * y, 0, 2, 1);
  C.which([2 * Math.E, 2 * Math.E ** 3, Math.E ** 2, 2 + Math.E].map((v) => near(v, y1, 1e-8)), true);
});

// =============================================================== MCQ — t04 homogeneous
Q('m12', mk.mcq({ stem: r`Only one of these equations can be solved directly by the substitution $y = vx$. Which one?`, opts: [r`$\dfrac{dy}{dx} = \dfrac{x^2 + 3y^2}{2xy}$`, r`$\dfrac{dy}{dx} = \dfrac{x + y + 2}{x}$`, r`$\dfrac{dy}{dx} = \dfrac{x^2 + y}{xy}$`, r`$\dfrac{dy}{dx} = \dfrac{y + \sin x}{x}$`], key: 'a', sol: r`The substitution works when the right side is homogeneous of degree $0$. In the first, numerator and denominator are both of degree $2$, so the ratio has degree $0$. The constant $2$, the mixed degrees in $x^2 + y$, and $\sin x$ spoil homogeneity in the others.`, d: 3, c: 'analysis', t: [4], time: 75 }), (C) => {
  const Fs = [(x, y) => (x * x + 3 * y * y) / (2 * x * y), (x, y) => (x + y + 2) / x, (x, y) => (x * x + y) / (x * y), (x, y) => (y + S(x)) / x];
  C.which(Fs.map((F) => homDegree(F) === 0), true);
});

const v13 = (x) => Math.asin(0.3 * x);
Q('m13', mk.mcq({ stem: r`In $\dfrac{dy}{dx} = \dfrac{y}{x} + \tan\dfrac{y}{x}$, the substitution $y = vx$ turns the equation into`, opts: [r`$x\dfrac{dv}{dx} = \tan v$`, r`$\dfrac{dv}{dx} = \tan v$`, r`$x\dfrac{dv}{dx} = v + \tan v$`, r`$v\dfrac{dv}{dx} = \tan v$`], key: 'a', sol: r`$\dfrac{dy}{dx} = v + x\dfrac{dv}{dx}$, so $v + x\dfrac{dv}{dx} = v + \tan v$ and the $v$ cancels: $x\dfrac{dv}{dx} = \tan v$.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => {
  const xs = [0.6, 1.2, 2];
  C.assert(solves((x, y, y1) => y1 - y / x - T(y / x), (x) => x * v13(x), xs), 'y = x asin(0.3x) solves the original');
  C.which([(x) => x * D(v13, x) - T(v13(x)), (x) => D(v13, x) - T(v13(x)), (x) => x * D(v13, x) - v13(x) - T(v13(x)), (x) => v13(x) * D(v13, x) - T(v13(x))].map((g) => xs.every((x) => Math.abs(g(x)) < 1e-6)), true);
});

Q('m14', mk.mcq({ stem: r`In a heat-flow model the expression $F(x, y) = \dfrac{x^4 + xy^3}{x + y}$ appears. Its degree of homogeneity is`, opts: ['$3$', '$4$', '$1$', '$2$'], key: 'a', sol: r`$F(\lambda x, \lambda y) = \dfrac{\lambda^4(x^4 + xy^3)}{\lambda(x + y)} = \lambda^3F(x, y)$, so the degree is $4 - 1 = 3$.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => {
  C.which([3, 4, 1, 2], homDegree((x, y) => (x ** 4 + x * y ** 3) / (x + y)));
});

// =============================================================== MCQ — t05 linear equations and models
Q('m15', mk.mcq({ stem: r`To solve $\dfrac{dy}{dx} + \dfrac{3}{x}y = \dfrac{1}{x}$ ($x > 0$), we multiply by an integrating factor. That factor is`, opts: ['$x^3$', r`$\dfrac{1}{x^3}$`, '$e^{3x}$', r`$3\log x$`], key: 'a', sol: r`$P = \dfrac{3}{x}$, so the factor is $e^{\int P\,dx} = e^{3\log x} = x^3$.`, d: 1, c: 'understanding', t: [5], time: 45 }), (C) => {
  const xs = [0.5, 1.5, 3];
  C.which([(x) => x ** 3, (x) => x ** -3, (x) => E(3 * x), (x) => 3 * L(x)].map((mu) => isIF(mu, (x) => 3 / x, xs)), true);
});

Q('m16', mk.mcq({ stem: r`A current in a coil obeys $\dfrac{dy}{dx} + y\cot x = 2\cos x$ on $0 < x < \pi$. Its integrating factor is`, opts: [r`$\sin x$`, r`$\cos x$`, r`$\operatorname{cosec} x$`, r`$e^{\cot x}$`], key: 'a', sol: r`$\int \cot x\,dx = \log \sin x$ on $(0, \pi)$, so the factor is $e^{\log\sin x} = \sin x$.`, d: 2, c: 'understanding', t: [5], time: 60 }), (C) => {
  const xs = [0.4, 1.3, 2.5];
  C.which([S, Co, (x) => 1 / S(x), (x) => E(1 / T(x))].map((mu) => isIF(mu, (x) => 1 / T(x), xs)), true);
});

Q('m17', mk.mcq({ stem: r`The equation $(1 + y^2)\dfrac{dx}{dy} + 2yx = 4y^2$ is linear in $x$ (with $y$ as the independent variable). Its integrating factor is`, opts: ['$1 + y^2$', r`$\dfrac{1}{1 + y^2}$`, '$e^{y^2}$', '$2y$'], key: 'a', sol: r`Divide by $1 + y^2$: $\dfrac{dx}{dy} + \dfrac{2y}{1 + y^2}x = \dfrac{4y^2}{1 + y^2}$. Then $\int \dfrac{2y}{1 + y^2}\,dy = \log(1 + y^2)$, so the factor is $1 + y^2$.`, d: 3, c: 'application', t: [5], time: 75 }), (C) => {
  const ys = [-1, 0.5, 2];
  C.which([(y) => 1 + y * y, (y) => 1 / (1 + y * y), (y) => E(y * y), (y) => 2 * y].map((mu) => ys.every((y) => mu(y) !== 0) && isIF(mu, (y) => (2 * y) / (1 + y * y), ys)), true);
});

const F18 = (x, y, y1) => y1 - 2 * y - 6;
Q('m18', mk.mcq({ stem: r`A tank-level model gives $\dfrac{dy}{dx} - 2y = 6$. The general solution is`, opts: [r`$y = Ce^{2x} - 3$`, r`$y = Ce^{-2x} - 3$`, r`$y = Ce^{2x} + 3$`, r`$y = 6x + C$`], key: 'a', sol: r`Integrating factor $e^{-2x}$: $\dfrac{d}{dx}(ye^{-2x}) = 6e^{-2x}$, so $ye^{-2x} = -3e^{-2x} + C$ and $y = Ce^{2x} - 3$.`, d: 2, c: 'understanding', t: [5], time: 75 }), (C) => {
  const xs = [-0.5, 0.3, 1];
  const opts = [(K) => (x) => K * E(2 * x) - 3, (K) => (x) => K * E(-2 * x) - 3, (K) => (x) => K * E(2 * x) + 3, (K) => (x) => 6 * x + K];
  C.which(opts.map((o) => [1.5, -0.7].every((K) => solves(F18, o(K), xs))), true);
});

Q('m19', mk.mcq({ stem: r`A deposit of ₹10,000 in an imagined Pune co-operative bank grows continuously so that $\dfrac{dA}{dt} = 0.06A$ ($t$ in years). The amount after $t$ years is`, opts: [r`$10000e^{0.06t}$`, r`$10000 + 0.06t$`, r`$10000e^{-0.06t}$`, r`$10000(1.06t)$`], key: 'a', sol: r`Separate: $\dfrac{dA}{A} = 0.06\,dt$, so $A = A_0e^{0.06t}$ with $A_0 = 10000$.`, d: 2, c: 'understanding', t: [5, 3], time: 60 }), (C) => {
  const A5 = rk4((t, A) => 0.06 * A, 0, 10000, 5);
  C.which([10000 * E(0.3), 10000 + 0.3, 10000 * E(-0.3), 10000 * 1.06 * 5].map((v) => near(v, A5, 1e-8)), true);
});

Q('m20', mk.mcq({ stem: r`A radioactive tracer used in an imagined Mumbai hospital decays as $\dfrac{dN}{dt} = -kN$ and loses half its mass in $10$ days. The constant $k$ (per day) is`, opts: [r`$\dfrac{\log 2}{10}$`, r`$10\log 2$`, r`$\dfrac{1}{20}$`, r`$\dfrac{\log 10}{2}$`], key: 'a', sol: r`$N = N_0e^{-kt}$ and $N(10) = \dfrac{N_0}{2}$ give $e^{-10k} = \dfrac{1}{2}$, so $k = \dfrac{\log 2}{10}$ (natural logarithm), about $0.0693$.`, d: 3, c: 'application', t: [5, 3], time: 75 }), (C) => {
  const k = L(2) / 10;
  C.assert(near(rk4((t, N) => -k * N, 0, 1, 10), 0.5, 1e-9), 'half after 10 days');
  C.which([L(2) / 10, 10 * L(2), 1 / 20, L(10) / 2], k);
});

// =============================================================== MCQ — mixed
Q('m21', mk.mcq({ stem: r`A wave-maker's motion is described by $y = A\cos(x + B)$, where $A$ and $B$ vary from machine to machine. The order of the differential equation of this family is`, opts: ['$2$', '$1$', '$3$', '$0$'], key: 'a', sol: r`$A$ and $B$ cannot be combined into one constant, so two differentiations are needed: $y'' = -A\cos(x + B) = -y$, giving $y'' + y = 0$ of order $2$.`, d: 3, c: 'analysis', t: [2, 1], time: 75 }), (C) => {
  const fam = [[2, 0.4], [-1, 1.3]].map(([A, B]) => (x) => A * Co(x + B));
  C.assert(allSolve((x, y, y1, y2) => y2 + y, fam, [0.2, 0.9, 1.7]), "y'' + y = 0 for the family");
  C.assert(!near(D(fam[0], 0.5) / fam[0](0.5), D(fam[1], 0.5) / fam[1](0.5), 1e-3), 'no single first-order relation y\' = f(x)y');
  C.which([2, 1, 3, 0], 2);
});

const F22 = (k) => (t, T, T1) => T1 + k * (T - 25);
Q('m22', mk.mcq({ stem: r`A glass of hot milk at $85$ °C cools in a room at $25$ °C so that $\dfrac{dT}{dt} = -k(T - 25)$. Its temperature at time $t$ is`, opts: [r`$T = 25 + 60e^{-kt}$`, r`$T = 85e^{-kt}$`, r`$T = 25 - 60e^{-kt}$`, r`$T = 85 - 25e^{-kt}$`], key: 'a', sol: r`Separate: $\dfrac{dT}{T - 25} = -k\,dt$, so $T - 25 = Ce^{-kt}$; at $t = 0$, $C = 85 - 25 = 60$.`, d: 2, c: 'understanding', t: [5, 3], time: 60 }), (C) => {
  const k = 0.1, ts = [1, 4, 9];
  const opts = [(t) => 25 + 60 * E(-k * t), (t) => 85 * E(-k * t), (t) => 25 - 60 * E(-k * t), (t) => 85 - 25 * E(-k * t)];
  C.which(opts.map((g) => solves(F22(k), g, ts) && near(g(0), 85)), true);
});

Q('m23', mk.mcq({ stem: r`For $x > 1$, the homogeneous equation $\dfrac{dy}{dx} = \dfrac{y}{x} + \dfrac{x}{y}$ (with $y > 0$) has general solution`, opts: [r`$y^2 = x^2(2\log x + C)$`, r`$y^2 = 2\log x + C$`, r`$y = x(\log x + C)$`, r`$y^2 = x^2 + C$`], key: 'a', sol: r`With $y = vx$: $x\dfrac{dv}{dx} = \dfrac{1}{v}$, so $v\,dv = \dfrac{dx}{x}$ and $\dfrac{v^2}{2} = \log x + \dfrac{C}{2}$, i.e. $y^2 = x^2(2\log x + C)$.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => {
  const F = (x, y, y1) => y1 - y / x - x / y, xs = [1.2, 2, 3];
  const opts = [(K) => (x) => x * sq(2 * L(x) + K), (K) => (x) => sq(2 * L(x) + K), (K) => (x) => x * (L(x) + K), (K) => (x) => sq(x * x + K)];
  C.which(opts.map((o) => [1, 2.5].every((K) => solves(F, o(K), xs))), true);
});

Q('m24', mk.mcq({ stem: r`A student's notebook shows the curve $y = xe^{x}$ but not the equation it came from. Which differential equation does this curve satisfy?`, opts: [r`$\dfrac{dy}{dx} - y = e^{x}$`, r`$\dfrac{dy}{dx} + y = e^{x}$`, r`$\dfrac{dy}{dx} - y = xe^{x}$`, r`$\dfrac{d^2y}{dx^2} = y$`], key: 'a', sol: r`$\dfrac{dy}{dx} = e^{x} + xe^{x} = e^{x} + y$, so $\dfrac{dy}{dx} - y = e^{x}$. The others fail: e.g. $y'' = (x + 2)e^{x} \ne y$.`, d: 3, c: 'analysis', t: [1], time: 75 }), (C) => {
  const g = (x) => x * E(x), xs = [-0.5, 0.4, 1.2];
  const Fs = [(x, y, y1) => y1 - y - E(x), (x, y, y1) => y1 + y - E(x), (x, y, y1) => y1 - y - x * E(x), (x, y, y1, y2) => y2 - y];
  C.which(Fs.map((F) => solves(F, g, xs)), true);
});

const F25 = (x, y, y1) => y1 + y - E(-x);
Q('m25', mk.mcq({ stem: r`For a decaying signal, $\dfrac{dy}{dx} + y = e^{-x}$. The general solution is`, opts: [r`$y = (x + C)e^{-x}$`, r`$y = (x + C)e^{x}$`, r`$y = Ce^{-x}$`, r`$y = e^{-x} + C$`], key: 'a', sol: r`Integrating factor $e^{x}$: $\dfrac{d}{dx}(ye^{x}) = 1$, so $ye^{x} = x + C$ and $y = (x + C)e^{-x}$.`, d: 2, c: 'understanding', t: [5], time: 60 }), (C) => {
  const xs = [-0.3, 0.5, 1.4];
  const opts = [(K) => (x) => (x + K) * E(-x), (K) => (x) => (x + K) * E(x), (K) => (x) => K * E(-x), (K) => (x) => E(-x) + K];
  C.which(opts.map((o) => [0.5, 2].every((K) => solves(F25, o(K), xs))), true);
});

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The equation $\dfrac{d^2y}{dx^2} + \sin\left(\dfrac{dy}{dx}\right) = 0$, met in a pendulum project, has no degree.`, r: r`The degree of a differential equation is defined only when it is a polynomial equation in its derivatives.`, key: 'a', sol: r`The sine of a derivative is not a polynomial in that derivative, so the degree is not defined. R states exactly the condition that fails. Both true; R explains A.`, d: 2, c: 'analysis', t: [1] }), (C) => {
  C.assert(od([[2, 1], [1, 1]], false).degree === null, 'degree undefined');
  C.key('a');
});

Q('ar2', mk.ar({ a: r`The differential equation of the family $y = Ae^{x} + Be^{-x}$ is of order $2$.`, r: r`The order of the equation obtained by eliminating arbitrary constants equals the number of independent constants.`, key: 'a', sol: r`Two independent constants need two differentiations: $y'' = y$, of order $2$. R gives the reason. Both true; R explains A.`, d: 2, c: 'analysis', t: [2] }), (C) => {
  const fam = [[1, 2], [-0.5, 3]].map(([A, B]) => (x) => A * E(x) + B * E(-x));
  C.assert(allSolve((x, y, y1, y2) => y2 - y, fam, [0, 0.6, 1.2]), "y'' = y");
  C.key('a');
});

Q('ar3', mk.ar({ a: r`The equation $\dfrac{dy}{dx} = \sin(x + y)$ can be reduced to variable-separable form by putting $v = x + y$.`, r: r`With $v = x + y$, $\dfrac{dv}{dx} = 1 + \sin v$, in which $v$ and $x$ can be separated.`, key: 'a', sol: r`$\dfrac{dv}{dx} = 1 + \dfrac{dy}{dx} = 1 + \sin v$, so $\dfrac{dv}{1 + \sin v} = dx$. R shows why A holds. Both true; R explains A.`, d: 2, c: 'analysis', t: [3] }), (C) => {
  const v = (x) => rk4((s, u) => 1 + S(u), 0, 0.2, x);
  const y = (x) => v(x) - x;
  C.assert([0.3, 0.6].every((x) => near(D(y, x), S(x + y(x)), 1e-5)), 'v-equation gives a solution of the original');
  C.key('a');
});

Q('ar4', mk.ar({ a: r`The equation $\dfrac{dy}{dx} = \dfrac{x + y + 2}{x - y}$ is homogeneous.`, r: r`The expressions $x + y$ and $x - y$ are both homogeneous of degree $1$.`, key: 'd', sol: r`The constant $2$ breaks homogeneity: replacing $x, y$ by $\lambda x, \lambda y$ does not give back the same ratio. So A is false. R is true.`, d: 2, c: 'analysis', t: [4] }), (C) => {
  C.assert(homDegree((x, y) => (x + y + 2) / (x - y), [[1.3, 0.7], [2.1, 1.9], [3.2, 1.1]]) === null && homDegree((x, y) => x + y) === 1, 'A false, R true');
  C.key('d');
});

Q('ar5', mk.ar({ a: r`The general solution of $\dfrac{dy}{dx} + \dfrac{y}{x} = 3x$ ($x > 0$) is $y = x^2 + \dfrac{C}{x}$.`, r: r`The equation $\dfrac{dy}{dx} = 2x$ has the general solution $y = x^2 + C$.`, key: 'b', sol: r`A is true: with the integrating factor $x$, $\dfrac{d}{dx}(xy) = 3x^2$, so $xy = x^3 + C$ and $y = x^2 + \dfrac{C}{x}$. R is also true, but it is about a different equation and does not explain A. Both true; R does not explain A.`, d: 2, c: 'understanding', t: [5] }), (C) => {
  C.assert([1, -2].every((K) => solves((x, y, y1) => y1 + y / x - 3 * x, (x) => x * x + K / x, [0.5, 1.5, 3])) && isIF((x) => x, (x) => 1 / x, [0.5, 2]), 'A true');
  C.assert([0, 3].every((K) => solves((x, y, y1) => y1 - 2 * x, (x) => x * x + K, [0.5, 1.5])), 'R true');
  C.key('b');
});

Q('ar6', mk.ar({ a: r`The equation $\dfrac{dx}{dy} + \dfrac{x}{y} = y$ ($y > 0$) is linear in $x$.`, r: r`In a linear equation $\dfrac{dx}{dy} + Px = Q$, the coefficients $P$ and $Q$ are functions of $x$ only.`, key: 'c', sol: r`A is true: $x$ and $\dfrac{dx}{dy}$ appear only to the first power. R is false: for this form $P$ and $Q$ are functions of $y$ only.`, d: 2, c: 'understanding', t: [5] }), (C) => {
  C.assert([1, 0.5].every((K) => [0.6, 1.4, 2.5].every((y) => { const x = (s) => (s * s) / 3 + K / s; return near(D(x, y) + x(y) / y, y, 1e-5); })), 'x = y^2/3 + C/y solves it (linear)');
  C.key('c');
});

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`True or false? The constant function $y = 3$ is a solution of $\dfrac{dy}{dx} = y - 3$, which models a thermostat.`, key: 't', sol: r`For $y = 3$, $\dfrac{dy}{dx} = 0$ and $y - 3 = 0$. True: it is the equilibrium solution.`, d: 1, c: 'understanding', t: [1] }), (C) => {
  C.assert(solves((x, y, y1) => y1 - y + 3, () => 3, [0, 1, 2]), 'y = 3 solves');
  C.key('t');
});
Q('tf2', mk.tf({ stem: r`True or false? Eliminating $A$ and $B$ from $y = Ax + \dfrac{B}{x}$ gives the second-order equation $x^2\dfrac{d^2y}{dx^2} + x\dfrac{dy}{dx} - y = 0$.`, key: 't', sol: r`$y' = A - \dfrac{B}{x^2}$ and $y'' = \dfrac{2B}{x^3}$. Then $x^2y'' + xy' - y = \dfrac{2B}{x} + Ax - \dfrac{B}{x} - Ax - \dfrac{B}{x} = 0$. True.`, d: 3, c: 'understanding', t: [2] }), (C) => {
  const fam = [[1, 2], [-3, 0.5]].map(([A, B]) => (x) => A * x + B / x);
  C.assert(allSolve((x, y, y1, y2) => x * x * y2 + x * y1 - y, fam, [0.6, 1.3, 2.4]), 'equation holds');
  C.key('t');
});
Q('tf3', mk.tf({ stem: r`True or false? The expression $x^2 + xy + y^2$, used in a cooling model for a square plate, is homogeneous of degree $2$.`, key: 't', sol: r`Every term has total degree $2$, so replacing $x, y$ by $\lambda x, \lambda y$ multiplies it by $\lambda^2$. True.`, d: 1, c: 'understanding', t: [4] }), (C) => {
  C.assert(homDegree((x, y) => x * x + x * y + y * y) === 2, 'degree 2');
  C.key('t');
});
Q('tf4', mk.tf({ stem: r`True or false? The integrating factor of $\dfrac{dy}{dx} - 4y = 1$ is $e^{4x}$.`, key: 'f', sol: r`Here $P = -4$, so the factor is $e^{\int -4\,dx} = e^{-4x}$, not $e^{4x}$. False.`, d: 2, c: 'application', t: [5] }), (C) => {
  C.assert(isIF((x) => E(-4 * x), () => -4, [0, 1]) && !isIF((x) => E(4 * x), () => -4, [0, 1]), 'IF is e^{-4x}');
  C.key('f');
});

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The order of $\dfrac{d^3y}{dx^3} + \left(\dfrac{dy}{dx}\right)^4 = x$, which comes from a beam-bending exercise, is ___.`, acc: [['3', 'three']], sol: r`The highest derivative present is the third, so the order is $3$ (the fourth power belongs to a lower derivative).`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(od([[3, 1], [1, 4]]).order));
Q('fb2', mk.fill({ stem: r`A culture obeys $\dfrac{dy}{dx} = \dfrac{y}{2}$ with $y(0) = 5$. At $x = 2\log 3$ the value of $y$ is ___.`, acc: [['15']], sol: r`$y = 5e^{x/2}$, so $y(2\log 3) = 5e^{\log 3} = 15$.`, d: 2, c: 'application', t: [3] }), (C) => C.blank(Math.round(rk4((x, y) => y / 2, 0, 5, 2 * L(3)) * 1e6) / 1e6));
Q('fb3', mk.fill({ stem: r`To solve $\dfrac{dy}{dx} + 2xy = x$, a student multiplies by the integrating factor ___.`, acc: [['$e^{x^2}$', 'e^{x^2}', 'e^(x^2)', 'exp(x^2)']], sol: r`$P = 2x$ and $\int 2x\,dx = x^2$, so the factor is $e^{x^2}$.`, d: 2, c: 'understanding', t: [5] }), (C) => {
  C.assert(isIF((x) => E(x * x), (x) => 2 * x, [-1, 0.5, 1.5]), 'e^{x^2} is the factor');
  C.blank('e^{x^2}');
});

// =============================================================== numerical
Q('n01', mk.num({ stem: r`A culture in an imagined Hyderabad lab grows at a rate proportional to its size. It has $500$ cells at $t = 0$ and $1500$ cells at $t = 3$ hours. How many cells will it have at $t = 6$ hours?`, value: 4500, sol: r`$N = 500e^{kt}$ with $e^{3k} = 3$. At $t = 6$: $N = 500(e^{3k})^2 = 500 \times 9 = 4500$.`, scheme: [['Model $N = 500e^{kt}$ and $e^{3k} = 3$; answer $4500$', 1]], d: 2, c: 'application', t: [5, 3], time: 120 }), (C) => {
  const k = L(3) / 3;
  C.assert(near(rk4((t, N) => k * N, 0, 500, 3), 1500, 1e-9), 'fits the data');
  C.val(rk4((t, N) => k * N, 0, 500, 6), 1e-6);
});
Q('n02', mk.num({ stem: r`Tea at $90$ °C is left in a room at $30$ °C and cools by Newton's law, $\dfrac{dT}{dt} = -k(T - 30)$. After $5$ minutes it is at $70$ °C. Find its temperature after $10$ minutes, correct to two decimal places.`, value: 56.67, tol: 0.01, sol: r`$T = 30 + 60e^{-kt}$ with $e^{-5k} = \dfrac{40}{60} = \dfrac{2}{3}$. At $t = 10$: $T = 30 + 60 \times \dfrac{4}{9} = 30 + 26.67 = 56.67$ °C.`, scheme: [['Model, $e^{-5k} = \\dfrac23$ and $56.67$', 1]], d: 3, c: 'application', t: [5, 3], time: 150 }), (C) => {
  const k = L(1.5) / 5;
  C.assert(near(rk4((t, T) => -k * (T - 30), 0, 90, 5), 70, 1e-9), 'fits 70 at 5 min');
  C.val(rk4((t, T) => -k * (T - 30), 0, 90, 10), 0.01);
});
Q('n03', mk.num({ stem: r`The homogeneous equation $x\dfrac{dy}{dx} = y + \sqrt{x^2 + y^2}$ ($x > 0$) has a solution through $(1, 0)$. Find $y$ when $x = 3$.`, value: 4, sol: r`With $y = vx$: $x\dfrac{dv}{dx} = \sqrt{1 + v^2}$, so $\log\left(v + \sqrt{1 + v^2}\right) = \log x + C$. Through $(1, 0)$, $C = 0$: $y + \sqrt{x^2 + y^2} = x^2$, which simplifies to $y = \dfrac{x^2 - 1}{2}$. At $x = 3$: $y = 4$.`, scheme: [['Substitution, solution through $(1, 0)$ and $y = 4$', 1]], d: 4, c: 'application', t: [4], time: 240 }), (C) => {
  const F = (x, y, y1) => x * y1 - y - sq(x * x + y * y);
  C.assert(solves(F, (x) => (x * x - 1) / 2, [1.5, 2, 3]), 'y = (x^2 - 1)/2 solves');
  C.val(rk4((x, y) => (y + sq(x * x + y * y)) / x, 1, 0, 3), 1e-6);
});
Q('n04', mk.num({ stem: r`Solve $\dfrac{dy}{dx} + \dfrac{y}{x} = 4$ ($x > 0$) with $y = 3$ when $x = 1$, and find $y$ when $x = 2$.`, value: 4.5, sol: r`Integrating factor $x$: $\dfrac{d}{dx}(xy) = 4x$, so $xy = 2x^2 + C$; $x = 1$, $y = 3$ gives $C = 1$. So $y = 2x + \dfrac{1}{x}$ and $y(2) = 4.5$.`, scheme: [['Factor $x$, $C = 1$ and $y(2) = 4.5$', 1]], d: 2, c: 'understanding', t: [5], time: 120 }), (C) => C.val(rk4((x, y) => 4 - y / x, 1, 3, 2), 1e-6));
Q('n05', mk.num({ stem: r`Put $v = x + y + 1$ to solve $\dfrac{dy}{dx} = (x + y + 1)^2$ with $y = -1$ when $x = 0$, and find $y$ at $x = \dfrac{\pi}{4}$, correct to two decimal places.`, value: -0.79, tol: 0.01, sol: r`$\dfrac{dv}{dx} = 1 + v^2$ with $v(0) = 0$ gives $v = \tan x$, so $y = \tan x - x - 1$ and $y\left(\dfrac{\pi}{4}\right) = -\dfrac{\pi}{4} = -0.79$ to two decimal places.`, scheme: [['$v = \\tan x$ and $y = -0.79$', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => {
  C.assert(solves((x, y, y1) => y1 - (x + y + 1) ** 2, (x) => T(x) - x - 1, [0.2, 0.5, 0.7]), 'solution');
  C.val(rk4((x, y) => (x + y + 1) ** 2, 0, -1, P / 4), 0.01);
});

// =============================================================== short answer (2 marks)
Q('s201', mk.short({ marks: 2, stem: r`Two equations come from an engineering assignment. State the order and degree of each: **(i)** $\dfrac{d^2y}{dx^2} + \left(\dfrac{dy}{dx}\right)^2 = x^3$; **(ii)** $\dfrac{d^3y}{dx^3} = \sqrt{1 + \dfrac{dy}{dx}}$.`, model: r`**(i)** Order $2$; it is a polynomial in the derivatives and $\dfrac{d^2y}{dx^2}$ appears to the first power, so degree $1$.\n\n**(ii)** Square to remove the radical: $\left(\dfrac{d^3y}{dx^3}\right)^2 = 1 + \dfrac{dy}{dx}$. Order $3$, degree $2$.`, sol: 'Clear radicals before reading the degree.', scheme: [['(i) order 2, degree 1', 1], ['(ii) order 3, degree 2 after squaring', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => {
  const a = od([[2, 1], [1, 2]]), b = od([[3, 2], [1, 1]]);
  C.assert(a.order === 2 && a.degree === 1 && b.order === 3 && b.degree === 2, 'orders and degrees');
  C.model(['Order $2$', 'degree $1$', 'Order $3$', 'degree $2$']);
});
Q('s202', mk.short({ marks: 2, stem: r`Verify that $y = e^{-x} + 2x - 2$ is a solution of $\dfrac{dy}{dx} + y = 2x$, the equation of a charging capacitor in a lab kit.`, model: r`$\dfrac{dy}{dx} = -e^{-x} + 2$. Then $\dfrac{dy}{dx} + y = -e^{-x} + 2 + e^{-x} + 2x - 2 = 2x$, which is the right side. So it is a solution.`, sol: 'Differentiate and substitute.', scheme: [['Derivative', 1], ['Substitution gives $2x$', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (C) => {
  C.assert(solves((x, y, y1) => y1 + y - 2 * x, (x) => E(-x) + 2 * x - 2, [-0.5, 0.7, 2]), 'solves');
  C.model(['-e^{-x} + 2', '= 2x']);
});
Q('s203', mk.short({ marks: 2, stem: r`Form the differential equation of the family $y = Ae^{2x} + 3$, which describes the price of an imagined commodity in a model.`, model: r`One constant, so differentiate once: $\dfrac{dy}{dx} = 2Ae^{2x}$. From the equation, $Ae^{2x} = y - 3$. Hence $\dfrac{dy}{dx} = 2(y - 3)$, i.e. $\dfrac{dy}{dx} = 2y - 6$.`, sol: 'Differentiate once and eliminate A.', scheme: [['Differentiation', 1], [r`$\dfrac{dy}{dx} = 2y - 6$`, 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => {
  const fam = [1, -2].map((A) => (x) => A * E(2 * x) + 3);
  C.assert(allSolve((x, y, y1) => y1 - 2 * y + 6, fam, [-0.4, 0.3, 0.8]), 'formed equation');
  C.model(['2y - 6']);
});
Q('s204', mk.short({ marks: 2, stem: r`A satellite dish designer uses the parabolas $y^2 = 4a(x - 1)$, with $a$ arbitrary. Form their differential equation.`, model: r`Differentiate: $2y\dfrac{dy}{dx} = 4a$. Substitute $4a = 2y\dfrac{dy}{dx}$: $y^2 = 2y\dfrac{dy}{dx}(x - 1)$, i.e. $y = 2(x - 1)\dfrac{dy}{dx}$ (for $y \ne 0$).`, sol: 'Eliminate a using the derivative.', scheme: [['Differentiation', 1], [r`$y = 2(x - 1)\dfrac{dy}{dx}$`, 1]], d: 2, c: 'application', t: [2], time: 90 }), (C) => {
  const fam = [0.5, 2].map((a) => (x) => sq(4 * a * (x - 1)));
  C.assert(allSolve((x, y, y1) => y - 2 * (x - 1) * y1, fam, [1.5, 2.5, 4]), 'formed equation');
  C.model([r`y = 2(x - 1)\dfrac{dy}{dx}`]);
});
Q('s205', mk.short({ marks: 2, stem: r`The spread of a rumour in an imagined school obeys $\dfrac{dy}{dx} = 2x(1 + y^2)$. Find its general solution.`, model: r`Separate: $\dfrac{dy}{1 + y^2} = 2x\,dx$. Integrate: $\tan^{-1} y = x^2 + C$, i.e. $y = \tan(x^2 + C)$.`, sol: 'Separate, then integrate both sides.', scheme: [['Separation', 1], [r`$\tan^{-1} y = x^2 + C$`, 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => {
  C.assert([0, 0.3].every((K) => solves((x, y, y1) => y1 - 2 * x * (1 + y * y), (x) => T(x * x + K), [0.2, 0.5, 0.8])), 'solves');
  C.model([r`\tan^{-1} y = x^2 + C`]);
});
Q('s206', mk.short({ marks: 2, stem: r`Find the particular solution of $\dfrac{dy}{dx} = y\cos x$ for which $y = 2$ when $x = 0$.`, model: r`Separate: $\dfrac{dy}{y} = \cos x\,dx$, so $\log|y| = \sin x + C$ and $y = Ae^{\sin x}$. At $x = 0$, $A = 2$: $y = 2e^{\sin x}$.`, sol: 'Separate, integrate, use the initial value.', scheme: [['General solution', 1], [r`$y = 2e^{\sin x}$`, 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => {
  const g = (x) => 2 * E(S(x));
  C.assert(solves((x, y, y1) => y1 - y * Co(x), g, [0.3, 1, 2]) && near(g(0), 2) && near(rk4((x, y) => y * Co(x), 0, 2, 1.5), g(1.5), 1e-8), 'particular solution');
  C.model(['2e^{\\sin x}']);
});
Q('s207', mk.short({ marks: 2, stem: r`A surveyor's road curve obeys $\dfrac{dy}{dx} = \dfrac{x^2 + 3y^2}{4xy}$. Verify that this equation is homogeneous.`, model: r`Let $F(x, y) = \dfrac{x^2 + 3y^2}{4xy}$. Then $F(\lambda x, \lambda y) = \dfrac{\lambda^2(x^2 + 3y^2)}{\lambda^2 \cdot 4xy} = \lambda^0F(x, y)$. So $F$ is homogeneous of degree $0$ and the equation is homogeneous.`, sol: 'Replace x, y by λx, λy.', scheme: [['$F(\\lambda x, \\lambda y)$ computed', 1], ['Degree $0$ stated', 1]], d: 2, c: 'analysis', t: [4], time: 75 }), (C) => {
  C.assert(homDegree((x, y) => (x * x + 3 * y * y) / (4 * x * y)) === 0, 'degree 0');
  C.model(['degree $0$']);
});
Q('s208', mk.short({ marks: 2, stem: r`Find the general solution of $\dfrac{dy}{dx} - y = e^{2x}$, an equation from an imagined population-with-migration model.`, model: r`Integrating factor $e^{-x}$: $\dfrac{d}{dx}(ye^{-x}) = e^{x}$, so $ye^{-x} = e^{x} + C$ and $y = e^{2x} + Ce^{x}$.`, sol: 'P = −1, so the factor is e^{−x}.', scheme: [['Integrating factor', 1], [r`$y = e^{2x} + Ce^{x}$`, 1]], d: 2, c: 'understanding', t: [5], time: 90 }), (C) => {
  C.assert([0.5, -2].every((K) => solves((x, y, y1) => y1 - y - E(2 * x), (x) => E(2 * x) + K * E(x), [-0.5, 0.4, 1])), 'solves');
  C.model(['e^{2x} + Ce^{x}']);
});
Q('s209', mk.short({ marks: 2, stem: r`Treat $x$ as the dependent variable and solve $\dfrac{dx}{dy} + x = y$.`, model: r`Linear in $x$ with integrating factor $e^{y}$: $\dfrac{d}{dy}(xe^{y}) = ye^{y}$, so $xe^{y} = (y - 1)e^{y} + C$ and $x = y - 1 + Ce^{-y}$.`, sol: 'Integrate ye^y by parts.', scheme: [['Factor $e^{y}$ and integral', 1], [r`$x = y - 1 + Ce^{-y}$`, 1]], d: 3, c: 'application', t: [5], time: 120 }), (C) => {
  C.assert([1, -0.5].every((K) => [-0.5, 0.6, 1.5].every((y) => { const x = (s) => s - 1 + K * E(-s); return near(D(x, y) + x(y), y, 1e-5); })), 'solves');
  C.model(['y - 1 + Ce^{-y}']);
});

// =============================================================== short answer (3 marks)
Q('s301', mk.short({ marks: 3, stem: r`A chemical reaction model uses the family $y = Ae^{x} + Be^{3x}$. Form the differential equation of this family.`, model: r`$y' = Ae^{x} + 3Be^{3x}$ and $y'' = Ae^{x} + 9Be^{3x}$. Then $y' - y = 2Be^{3x}$ and $y'' - y' = 6Be^{3x} = 3(y' - y)$. Hence $\dfrac{d^2y}{dx^2} - 4\dfrac{dy}{dx} + 3y = 0$.`, sol: 'Two constants: differentiate twice and eliminate.', scheme: [["$y'$ and $y''$", 1], ['Elimination', 1], [r`$y'' - 4y' + 3y = 0$`, 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (C) => {
  const fam = [[1, 2], [-2, 0.5]].map(([A, B]) => (x) => A * E(x) + B * E(3 * x));
  C.assert(allSolve((x, y, y1, y2) => y2 - 4 * y1 + 3 * y, fam, [-0.5, 0, 0.4], 1e-3), 'formed equation');
  C.model(['- 4\\dfrac{dy}{dx} + 3y = 0']);
});
Q('s302', mk.short({ marks: 3, stem: r`Eliminate the constants $A$ and $B$ from $y = (A + Bx)e^{x}$, which describes a critically damped door closer.`, model: r`$ye^{-x} = A + Bx$. Differentiate: $(y' - y)e^{-x} = B$. Differentiate again: $(y'' - 2y' + y)e^{-x} = 0$. Hence $\dfrac{d^2y}{dx^2} - 2\dfrac{dy}{dx} + y = 0$.`, sol: 'Multiplying by e^{−x} first simplifies the work.', scheme: [['First differentiation', 1], ['Second differentiation', 1], [r`$y'' - 2y' + y = 0$`, 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => {
  const fam = [[1, 2], [3, -1]].map(([A, B]) => (x) => (A + B * x) * E(x));
  C.assert(allSolve((x, y, y1, y2) => y2 - 2 * y1 + y, fam, [-0.5, 0.3, 0.9], 1e-3), 'formed equation');
  C.model(['- 2\\dfrac{dy}{dx} + y = 0']);
});
const g303 = (x) => sq(2 * L((1 + E(x)) / 2) + 1);
Q('s303', mk.short({ marks: 3, stem: r`A pollutant model gives $(1 + e^{x})y\dfrac{dy}{dx} = e^{x}$ with $y = 1$ when $x = 0$ ($y > 0$). Find the particular solution.`, model: r`Separate: $y\,dy = \dfrac{e^{x}}{1 + e^{x}}\,dx$. Integrate: $\dfrac{y^2}{2} = \log(1 + e^{x}) + C$. At $x = 0$: $\dfrac12 = \log 2 + C$, so $C = \dfrac12 - \log 2$. Hence $y^2 = 2\log\dfrac{1 + e^{x}}{2} + 1$.`, sol: 'The right side integrates by the f′/f rule.', scheme: [['Separation', 1], ['Integration', 1], ['Constant and particular solution', 1]], d: 3, c: 'application', t: [3], time: 180 }), (C) => {
  C.assert(solves((x, y, y1) => (1 + E(x)) * y * y1 - E(x), g303, [-0.5, 0.5, 1.5]) && near(g303(0), 1), 'particular solution');
  C.model(['2\\log\\dfrac{1 + e^{x}}{2} + 1']);
});
const g304 = (x) => E(2 * x) - x - 1;
Q('s304', mk.short({ marks: 3, stem: r`Reduce $\dfrac{dy}{dx} = 2(x + y) + 1$ to variable-separable form with a suitable substitution, and find the solution with $y = 0$ at $x = 0$.`, model: r`Put $v = x + y$: $\dfrac{dv}{dx} = 1 + 2v + 1 = 2(v + 1)$. Separate: $\dfrac{dv}{v + 1} = 2\,dx$, so $v + 1 = Ae^{2x}$. At $x = 0$, $v = 0$, so $A = 1$. Hence $x + y + 1 = e^{2x}$, i.e. $y = e^{2x} - x - 1$.`, sol: 'Remember the 1 from dx/dx when finding dv/dx.', scheme: [['Substitution and $\\dfrac{dv}{dx}$', 1], ['Separation and integration', 1], [r`$y = e^{2x} - x - 1$`, 1]], d: 3, c: 'application', t: [3], time: 180 }), (C) => {
  C.assert(solves((x, y, y1) => y1 - 2 * (x + y) - 1, g304, [0.2, 0.6, 1]) && near(g304(0), 0) && near(rk4((x, y) => 2 * (x + y) + 1, 0, 0, 1), g304(1), 1e-8), 'particular solution');
  C.model(['e^{2x} - x - 1']);
});
const g305 = (x) => x / sq(1 - 2 * L(x));
Q('s305', mk.short({ marks: 3, stem: r`Solve the homogeneous equation $\dfrac{dy}{dx} = \dfrac{y}{x} + \dfrac{y^3}{x^3}$ for the curve through $(1, 1)$.`, model: r`Put $y = vx$: $v + x\dfrac{dv}{dx} = v + v^3$, so $\dfrac{dv}{v^3} = \dfrac{dx}{x}$. Integrate: $-\dfrac{1}{2v^2} = \log x + C$. At $(1, 1)$: $v = 1$, so $C = -\dfrac12$. Hence $\dfrac{1}{v^2} = 1 - 2\log x$, i.e. $\dfrac{x^2}{y^2} = 1 - 2\log x$ (for $1 \le x < \sqrt{e}$).`, sol: 'After y = vx the v terms cancel, leaving a separable equation.', scheme: [['Substitution', 1], ['Separation and integration', 1], [r`$\dfrac{x^2}{y^2} = 1 - 2\log x$`, 1]], d: 3, c: 'application', t: [4], time: 180 }), (C) => {
  C.assert(solves((x, y, y1) => y1 - y / x - (y / x) ** 3, g305, [1.05, 1.2, 1.4]) && near(g305(1), 1), 'particular solution');
  C.model(['1 - 2\\log x']);
});
const g306 = (x) => x * (1 + L(x)) ** 2;
Q('s306', mk.short({ marks: 3, stem: r`A designer's curve satisfies $x\dfrac{dy}{dx} = y + 2\sqrt{xy}$ ($x, y > 0$) and passes through $(1, 1)$. Find its equation.`, model: r`Homogeneous; put $y = vx$: $v + x\dfrac{dv}{dx} = v + 2\sqrt{v}$, so $\dfrac{dv}{2\sqrt{v}} = \dfrac{dx}{x}$. Integrate: $\sqrt{v} = \log x + C$. At $(1, 1)$, $C = 1$. So $\sqrt{\dfrac{y}{x}} = 1 + \log x$, i.e. $y = x(1 + \log x)^2$.`, sol: 'The integral of dv/(2√v) is √v.', scheme: [['Substitution', 1], ['Integration', 1], [r`$y = x(1 + \log x)^2$`, 1]], d: 4, c: 'application', t: [4], time: 210 }), (C) => {
  C.assert(solves((x, y, y1) => x * y1 - y - 2 * sq(x * y), g306, [1.2, 2, 3]) && near(g306(1), 1), 'particular solution');
  C.model(['x(1 + \\log x)^2']);
});
Q('s307', mk.short({ marks: 3, stem: r`Find the general solution of $x\dfrac{dy}{dx} + 2y = x^2$ ($x > 0$), which arises in an imagined Chennai water-tank study.`, model: r`Standard form: $\dfrac{dy}{dx} + \dfrac{2}{x}y = x$. Integrating factor $e^{2\log x} = x^2$. Then $\dfrac{d}{dx}(x^2y) = x^3$, so $x^2y = \dfrac{x^4}{4} + C$ and $y = \dfrac{x^2}{4} + \dfrac{C}{x^2}$.`, sol: 'Divide by x first to read P.', scheme: [['Standard form and factor $x^2$', 1], ['Integration', 1], [r`$y = \dfrac{x^2}{4} + \dfrac{C}{x^2}$`, 1]], d: 2, c: 'application', t: [5], time: 150 }), (C) => {
  C.assert([0.5, -1].every((K) => solves((x, y, y1) => x * y1 + 2 * y - x * x, (x) => (x * x) / 4 + K / (x * x), [0.6, 1.4, 2.5])), 'solves');
  C.model([r`\dfrac{x^2}{4} + \dfrac{C}{x^2}`]);
});
Q('s308', mk.short({ marks: 3, stem: r`Solve $\dfrac{dy}{dx} + y\tan x = \cos^2 x$ on $-\dfrac{\pi}{2} < x < \dfrac{\pi}{2}$.`, model: r`$P = \tan x$, so the factor is $e^{\log\sec x} = \sec x$. Then $\dfrac{d}{dx}(y\sec x) = \cos^2 x\sec x = \cos x$, so $y\sec x = \sin x + C$ and $y = \sin x\cos x + C\cos x$.`, sol: 'On this interval sec x > 0.', scheme: [['Factor $\\sec x$', 1], ['Integration', 1], [r`$y = \sin x\cos x + C\cos x$`, 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => {
  C.assert(isIF((x) => 1 / Co(x), T, [-0.8, 0.3, 1.2]) && [1, -2].every((K) => solves((x, y, y1) => y1 + y * T(x) - Co(x) ** 2, (x) => S(x) * Co(x) + K * Co(x), [-0.8, 0.3, 1.2])), 'factor and solution');
  C.model(['\\sin x\\cos x + C\\cos x']);
});
Q('s309', mk.short({ marks: 3, stem: r`The population of an imagined village near Nashik grows at a rate proportional to the population. It was $20,000$ in $2010$ and $25,000$ in $2020$. Estimate the population in $2030$.`, model: r`$\dfrac{dP}{dt} = kP$ gives $P = 20000e^{kt}$ ($t$ in years from $2010$). From $2020$: $e^{10k} = \dfrac{25000}{20000} = \dfrac54$. In $2030$: $P = 20000\left(e^{10k}\right)^2 = 20000 \times \dfrac{25}{16} = 31,250$.`, sol: 'No need to find k itself: square e^{10k}.', scheme: [['Model $P = P_0e^{kt}$', 1], [r`$e^{10k} = \dfrac54$`, 1], ['$31,250$', 1]], d: 3, c: 'application', t: [5, 3], time: 180 }), (C) => {
  const k = L(1.25) / 10;
  C.assert(near(rk4((t, p) => k * p, 0, 20000, 10), 25000, 1e-9) && near(rk4((t, p) => k * p, 0, 20000, 20), 31250, 1e-9), '31,250');
  C.model([31250]);
});
Q('s310', mk.short({ marks: 3, stem: r`Show that $y = \dfrac{A}{x} + Bx$, with arbitrary constants $A$ and $B$, satisfies $x^2\dfrac{d^2y}{dx^2} + x\dfrac{dy}{dx} - y = 0$ for every $x \ne 0$, and say why it is the general solution.`, model: r`$y' = -\dfrac{A}{x^2} + B$ and $y'' = \dfrac{2A}{x^3}$. Then $x^2y'' + xy' - y = \dfrac{2A}{x} - \dfrac{A}{x} + Bx - \dfrac{A}{x} - Bx = 0$. The equation has order $2$ and the solution has $2$ independent arbitrary constants, so it is the general solution.`, sol: 'Number of independent constants equals the order.', scheme: [["$y'$ and $y''$", 1], ['Substitution gives $0$', 1], ['Order $2$, two constants: general solution', 1]], d: 2, c: 'understanding', t: [1], time: 150 }), (C) => {
  const fam = [[1, 2], [-3, 0.5]].map(([A, B]) => (x) => A / x + B * x);
  C.assert(allSolve((x, y, y1, y2) => x * x * y2 + x * y1 - y, fam, [-1.5, 0.7, 2]), 'equation holds');
  C.model(['= 0', 'order $2$']);
});

// =============================================================== long answer (5 marks, in parts)
const k01 = L(70 / 50) / 4;
const t01 = L(70 / 20) / k01;
Q('l01', mk.long({ stem: r`A cup of masala chai at $95$ °C is placed on a counter in an imagined Kolkata canteen where the air is at $25$ °C. It cools according to $\dfrac{dT}{dt} = -k(T - 25)$, and after $4$ minutes it is at $75$ °C.\n\n(a) Solve the equation and find $T$ in terms of $t$, giving $k$ exactly. [3]\n\n(b) How long, to the nearest tenth of a minute, does the chai take to cool to $45$ °C? [2]`, model: r`**(a)** Separate: $\dfrac{dT}{T - 25} = -k\,dt$, so $\log(T - 25) = -kt + C$ and $T = 25 + 70e^{-kt}$ (using $T(0) = 95$). At $t = 4$: $50 = 70e^{-4k}$, so $k = \dfrac14\log\dfrac{7}{5} = \dfrac14\log 1.4$.\n\n**(b)** $45 = 25 + 70e^{-kt}$ gives $e^{-kt} = \dfrac{2}{7}$, so $t = \dfrac{\log 3.5}{k} = \dfrac{4\log 3.5}{\log 1.4} \approx 14.9$ minutes.`, sol: 'Use the initial value before the 4-minute reading.', scheme: [['Separation and integration', 1], ['$T = 25 + 70e^{-kt}$', 1], [r`$k = \dfrac14\log 1.4$`, 1], [r`$e^{-kt} = \dfrac27$`, 1], ['About $14.9$ minutes', 1]], d: 3, c: 'application', t: [5, 3], time: 420 }), (C) => {
  C.assert(near(rk4((t, T) => -k01 * (T - 25), 0, 95, 4), 75, 1e-9) && near(rk4((t, T) => -k01 * (T - 25), 0, 95, t01), 45, 1e-8), 'model fits');
  C.assert(Math.abs(t01 - 14.9) < 0.05, `t = ${t01}`);
  C.model([14.9, '25 + 70e^{-kt}', '\\log 1.4']);
});
const g02 = (x) => (x * L(x)) / (2 + L(x));
Q('l02', mk.long({ stem: r`The equation $2x^2\dfrac{dy}{dx} = x^2 + y^2$ ($x > 0$) describes the path of an imagined drone.\n\n(a) Show that the equation is homogeneous. [1]\n\n(b) Solve it with the substitution $y = vx$. [3]\n\n(c) Find the particular solution through $(1, 0)$. [1]`, model: r`**(a)** $\dfrac{dy}{dx} = \dfrac{x^2 + y^2}{2x^2} = F(x, y)$ and $F(\lambda x, \lambda y) = F(x, y)$: homogeneous of degree $0$.\n\n**(b)** $v + x\dfrac{dv}{dx} = \dfrac{1 + v^2}{2}$, so $x\dfrac{dv}{dx} = \dfrac{(1 - v)^2}{2}$. Separate: $\dfrac{2\,dv}{(1 - v)^2} = \dfrac{dx}{x}$. Integrate: $\dfrac{2}{1 - v} = \log x + C$, i.e. $\dfrac{2x}{x - y} = \log x + C$.\n\n**(c)** At $(1, 0)$: $2 = 0 + C$, so $C = 2$ and $\dfrac{2x}{x - y} = 2 + \log x$, which gives $y = \dfrac{x\log x}{2 + \log x}$.`, sol: 'Watch the sign when integrating (1 − v)^{−2}.', scheme: [['(a) degree $0$', 1], ['(b) substitution', 1], ['(b) separation', 1], ['(b) general solution', 1], ['(c) particular solution', 1]], d: 4, c: 'analysis', t: [4], time: 480 }), (C) => {
  C.assert(homDegree((x, y) => (x * x + y * y) / (2 * x * x)) === 0, '(a)');
  C.assert(solves((x, y, y1) => 2 * x * x * y1 - x * x - y * y, g02, [0.8, 1.5, 3]) && near(g02(1), 0), '(c) particular solution');
  C.assert([1, 3].every((K) => [0.6, 1.2].every((x) => { const yk = (s) => s - (2 * s) / (L(s) + K); return near(2 * x * x * D(yk, x), x * x + yk(x) ** 2, 1e-5); })), '(b) general solution');
  C.model(['\\dfrac{2x}{x - y} = \\log x + C', '\\dfrac{x\\log x}{2 + \\log x}']);
});
const x03 = (y) => (y ** 5 / 5 + 0.8) / (y * y);
Q('l03', mk.long({ stem: r`Consider $y\dfrac{dx}{dy} + 2x = y^3$ ($y > 0$), an equation from an imagined rainfall-runoff model.\n\n(a) Show that it is linear in $x$ and find its integrating factor. [2]\n\n(b) Solve it, and find the particular solution with $x = 1$ when $y = 1$. [3]`, model: r`**(a)** Divide by $y$: $\dfrac{dx}{dy} + \dfrac{2}{y}x = y^2$. This is $\dfrac{dx}{dy} + Px = Q$ with $P = \dfrac{2}{y}$, $Q = y^2$ (functions of $y$ only), so it is linear in $x$. Integrating factor $e^{2\log y} = y^2$.\n\n**(b)** $\dfrac{d}{dy}(xy^2) = y^4$, so $xy^2 = \dfrac{y^5}{5} + C$. At $y = 1$, $x = 1$: $1 = \dfrac15 + C$, so $C = \dfrac45$. Hence $x = \dfrac{y^3}{5} + \dfrac{4}{5y^2}$.`, sol: 'Here y is the independent variable throughout.', scheme: [['(a) standard form', 1], ['(a) factor $y^2$', 1], ['(b) integration', 1], ['(b) constant', 1], ['(b) particular solution', 1]], d: 4, c: 'application', t: [5], time: 420 }), (C) => {
  C.assert(isIF((y) => y * y, (y) => 2 / y, [0.5, 1.5, 3]), '(a) factor');
  C.assert([0.6, 1.3, 2.2].every((y) => near(y * D(x03, y) + 2 * x03(y), y ** 3, 1e-5)) && near(x03(1), 1), '(b) particular solution');
  C.model(['\\dfrac{y^3}{5} + \\dfrac{4}{5y^2}', 'y^2']);
});
const fam04 = (x) => 2 * Co(3 * x) - S(3 * x);
Q('l04', mk.long({ stem: r`A guitar string's displacement is modelled by $y = A\cos 3x + B\sin 3x$.\n\n(a) Form the differential equation of this family. [2]\n\n(b) Verify that $y = 2\cos 3x - \sin 3x$ belongs to the family, satisfies the equation, and has $y = 2$ and $\dfrac{dy}{dx} = -3$ at $x = 0$. [3]`, model: r`**(a)** $y' = -3A\sin 3x + 3B\cos 3x$ and $y'' = -9A\cos 3x - 9B\sin 3x = -9y$. So $\dfrac{d^2y}{dx^2} + 9y = 0$.\n\n**(b)** It is the member $A = 2$, $B = -1$. $y'' = -18\cos 3x + 9\sin 3x = -9y$, so $y'' + 9y = 0$. At $x = 0$: $y = 2$, and $y' = -6\sin 3x - 3\cos 3x$ gives $-3$.`, sol: 'Second-order equations are formed and verified here, not solved.', scheme: [["(a) $y'$ and $y''$", 1], ['(a) equation', 1], ['(b) member of the family', 1], ['(b) satisfies the equation', 1], ['(b) initial values', 1]], d: 3, c: 'application', t: [2, 1], time: 360 }), (C) => {
  C.assert(allSolve((x, y, y1, y2) => y2 + 9 * y, [fam04, (x) => -Co(3 * x) + 2.5 * S(3 * x)], [0.1, 0.6, 1.2]), 'formed equation');
  C.assert(near(fam04(0), 2) && near(D(fam04, 0), -3, 1e-6), 'initial values');
  C.model(['+ 9y = 0', '-3']);
});
const k05 = L(1.25) / 2;
const t05 = L(2) / k05;
Q('l05', mk.long({ stem: r`In an imagined apiary in Coorg, the number of bees in a colony grows at a rate proportional to the number present. There are $2400$ bees at the start and $3000$ after $2$ months.\n\n(a) Set up and solve the differential equation, giving the growth constant exactly. [3]\n\n(b) When will the colony reach $4800$ bees? Give the answer to two decimal places. [2]`, model: r`**(a)** $\dfrac{dN}{dt} = kN$, so $\dfrac{dN}{N} = k\,dt$ and $N = 2400e^{kt}$. From $N(2) = 3000$: $e^{2k} = \dfrac54$, so $k = \dfrac12\log\dfrac54$.\n\n**(b)** $4800 = 2400e^{kt}$ gives $e^{kt} = 2$, so $t = \dfrac{\log 2}{k} = \dfrac{2\log 2}{\log 1.25} \approx 6.21$ months.`, sol: 'Doubling time does not depend on the starting number.', scheme: [['Model and separation', 1], ['$N = 2400e^{kt}$', 1], [r`$k = \dfrac12\log\dfrac54$`, 1], ['$e^{kt} = 2$', 1], ['About $6.21$ months', 1]], d: 3, c: 'application', t: [5, 3], time: 360 }), (C) => {
  C.assert(near(rk4((t, N) => k05 * N, 0, 2400, 2), 3000, 1e-9) && near(rk4((t, N) => k05 * N, 0, 2400, t05), 4800, 1e-8), 'model fits');
  C.assert(Math.abs(t05 - 6.21) < 0.005, `t = ${t05}`);
  C.model([6.21, '2400e^{kt}']);
});
const g06 = (x) => S(x) - Co(x) + E(-x);
Q('l06', mk.long({ stem: r`An imagined circuit in a Bengaluru lab obeys $\dfrac{dy}{dx} + y = 2\sin x$.\n\n(a) Find the general solution. [3]\n\n(b) Find the particular solution with $y = 0$ when $x = 0$, and the value it approaches for large $x$ apart from the oscillating part. [2]`, model: r`**(a)** Integrating factor $e^{x}$: $\dfrac{d}{dx}(ye^{x}) = 2e^{x}\sin x$. Since $\int e^{x}\sin x\,dx = \dfrac{e^{x}(\sin x - \cos x)}{2}$, we get $ye^{x} = e^{x}(\sin x - \cos x) + C$, i.e. $y = \sin x - \cos x + Ce^{-x}$.\n\n**(b)** At $x = 0$: $0 = -1 + C$, so $C = 1$ and $y = \sin x - \cos x + e^{-x}$. As $x$ grows, $e^{-x} \to 0$, so $y$ settles into the oscillation $\sin x - \cos x$ (the transient dies out to $0$).`, sol: 'The integral of e^x sin x needs parts twice (or the standard result).', scheme: [['Factor $e^{x}$', 1], ['Integral of $2e^{x}\\sin x$', 1], ['General solution', 1], ['$C = 1$', 1], ['Long-run behaviour', 1]], d: 4, c: 'analysis', t: [5], time: 420 }), (C) => {
  C.assert([1, -2].every((K) => solves((x, y, y1) => y1 + y - 2 * S(x), (x) => S(x) - Co(x) + K * E(-x), [0.3, 1.5, 3])), '(a) general solution');
  C.assert(near(g06(0), 0) && near(rk4((x, y) => 2 * S(x) - y, 0, 0, 2), g06(2), 1e-8), '(b) particular solution');
  C.model(['\\sin x - \\cos x + Ce^{-x}', 'C = 1']);
});

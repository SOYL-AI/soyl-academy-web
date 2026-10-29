// CBSE 12 Mathematics ch09 Differential Equations — practice bank with independent re-solve checks:
// every stated solution is substituted back into its equation at sample points with numeric
// derivatives, every particular value is recomputed by RK4 from the initial condition, integrating
// factors are checked through I′ = P·I, order/degree come from a structural description, and
// homogeneity is tested numerically. Formation of differential equations (deleted) appears nowhere.
import { Q, caseQ, child, mk, r } from '../../cbse-12-mathematics-ch01/src/lib.mjs';
import { D, near, R6, solves, rk4, od, homDegree, grid } from './ode.mjs';

const R4 = (v) => Math.round(v * 1e4) / 1e4;
const ln = Math.log;
const E = Math.E;
/** I(x) is an integrating factor for P: I′ = P·I at the sample points. */
const isIF = (I, P, xs) => xs.every((x) => near(D(I, x), P(x) * I(x), 1e-5));

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The order of the differential equation $\dfrac{d^3y}{dx^3} - 4x\left(\dfrac{dy}{dx}\right)^2 + y = 0$ is`, opts: ['$3$', '$2$', '$1$', '$4$'], key: 'a', sol: r`The highest derivative present is $\dfrac{d^3y}{dx^3}$, so the order is $3$. The power $2$ belongs to a lower derivative and does not decide the order.`, d: 1, c: 'recall', t: [1], time: 30 }),
  (C) => C.which([3, 2, 1, 4], od([[3, 1], [1, 2], [0, 1]]).order));
Q('m02', mk.mcq({ stem: r`The degree of the differential equation $\left(\dfrac{d^2y}{dx^2}\right)^3 + \left(\dfrac{dy}{dx}\right)^4 + y^5 = 0$ is`, opts: ['$3$', '$4$', '$5$', '$2$'], key: 'a', sol: r`The equation is a polynomial in the derivatives. The highest-order derivative is $\dfrac{d^2y}{dx^2}$ and its highest power is $3$, so the degree is $3$. The powers $4$ and $5$ sit on lower-order terms.`, d: 2, c: 'understanding', t: [1], time: 45 }),
  (C) => C.which([3, 4, 5, 2], od([[2, 3], [1, 4], [0, 5]]).degree));
Q('m03', mk.mcq({ stem: 'For which of these differential equations is the degree **not defined**?', opts: [r`$\dfrac{dy}{dx} + \sin\left(\dfrac{dy}{dx}\right) = x$`, r`$\left(\dfrac{dy}{dx}\right)^2 + \sin x = y$`, r`$\dfrac{d^2y}{dx^2} + e^{x}y = 0$`, r`$x\dfrac{dy}{dx} = \log x$`], key: 'a', sol: r`In option (a) the derivative sits inside a sine, so the equation is not a polynomial in $\dfrac{dy}{dx}$ and its degree is not defined. In the others, $\sin x$, $e^{x}$ and $\log x$ involve only $x$, which is allowed.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C) => C.which([od([[1, 1]], false).degreeText, od([[1, 2], [0, 1]]).degreeText, od([[2, 1], [0, 1]]).degreeText, od([[1, 1]]).degreeText], 'none'));
Q('m04', mk.mcq({ stem: 'The general solution of a differential equation of order $3$ contains', opts: ['exactly $3$ arbitrary constants', 'exactly $2$ arbitrary constants', 'exactly $1$ arbitrary constant', 'no arbitrary constant'], key: 'a', sol: 'A general solution has as many independent arbitrary constants as the order of the equation, so 3 here.', d: 1, c: 'recall', t: [1], time: 30 }),
  (C) => C.which([3, 2, 1, 0], od([[3, 1]]).order));
Q('m05', mk.mcq({ stem: r`Which function is a solution of $\dfrac{d^2y}{dx^2} = 4y$?`, opts: [r`$y = e^{2x}$`, r`$y = \sin 2x$`, r`$y = e^{4x}$`, r`$y = x^2$`], key: 'a', sol: r`For $y = e^{2x}$: $y'' = 4e^{2x} = 4y$ ✓. For $\sin 2x$, $y'' = -4y$; for $e^{4x}$, $y'' = 16y$; for $x^2$, $y'' = 2$.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C) => { const F = (x, y, y1, y2) => y2 - 4 * y; C.which([(x) => Math.exp(2 * x), (x) => Math.sin(2 * x), (x) => Math.exp(4 * x), (x) => x * x].map((g) => solves(F, g, grid(-1, 1))), true); });
Q('m06', mk.mcq({ stem: 'A particular solution of a differential equation is obtained from its general solution by', opts: ['giving particular values to the arbitrary constants', 'differentiating the general solution once more', 'replacing $x$ by $y$ in the general solution', 'adding one more arbitrary constant'], key: 'a', sol: 'A particular solution is a member of the family: the arbitrary constants get definite values, usually from an initial condition.', d: 1, c: 'recall', t: [1], time: 30 }),
  (C) => C.key('a'));
Q('m07', mk.mcq({ stem: r`The general solution of $\dfrac{dy}{dx} = 3x^2e^{-y}$ is`, opts: [r`$e^{y} = x^{3} + C$`, r`$e^{-y} = x^{3} + C$`, r`$y = 3\log|x| + C$`, r`$e^{y} = 3x^{2} + C$`], key: 'a', sol: r`Separate: $e^{y}\,dy = 3x^2\,dx$. Integrate both sides: $e^{y} = x^3 + C$. Option (b) forgets that $e^{-y}$ moves to the left as $e^{y}$.`, d: 2, c: 'understanding', t: [2], time: 75 }),
  (C) => { const F = (x, y, y1) => y1 - 3 * x * x * Math.exp(-y); C.which([(x) => ln(x ** 3 + 2), (x) => -ln(x ** 3 + 2), (x) => 3 * ln(x) + 2, (x) => ln(3 * x * x + 2)].map((g) => solves(F, g, grid(0.5, 1.5))), true); });
Q('m08', mk.mcq({ stem: r`The solution of $\dfrac{dy}{dx} = \dfrac{2x}{y}$ with $y(0) = 3$ is`, opts: [r`$y^2 = 2x^2 + 9$`, r`$y^2 = x^2 + 9$`, r`$y^2 = 2x^2 + 3$`, r`$y = x^2 + 3$`], key: 'a', sol: r`$y\,dy = 2x\,dx$ gives $\dfrac{y^2}{2} = x^2 + C$, i.e. $y^2 = 2x^2 + C_1$. At $x = 0$, $y = 3$: $C_1 = 9$. Option (c) solves the equation but misses the initial condition.`, d: 3, c: 'application', t: [2], time: 90 }),
  (C) => { const F = (x, y, y1) => y1 - (2 * x) / y; C.which([(x) => Math.sqrt(2 * x * x + 9), (x) => Math.sqrt(x * x + 9), (x) => Math.sqrt(2 * x * x + 3), (x) => x * x + 3].map((g) => solves(F, g, grid(-1, 2)) && near(g(0), 3)), true); });
Q('m09', mk.mcq({ stem: r`If $\dfrac{dP}{dt} = 0.04P$ and $P(0) = 2000$, then $P(t)$ equals`, opts: [r`$2000e^{0.04t}$`, r`$2000 + 0.04t$`, r`$2000e^{-0.04t}$`, r`$2000 \cdot (0.04)^{t}$`], key: 'a', sol: r`$\dfrac{dP}{P} = 0.04\,dt$ gives $\log P = 0.04t + C$, so $P = Ae^{0.04t}$; $P(0) = 2000$ gives $A = 2000$.`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C) => { const F = (t, P, P1) => P1 - 0.04 * P; C.which([(t) => 2000 * Math.exp(0.04 * t), (t) => 2000 + 0.04 * t, (t) => 2000 * Math.exp(-0.04 * t), (t) => 2000 * 0.04 ** t].map((g) => solves(F, g, grid(0, 3), 1e-3) && near(g(0), 2000)), true); });
Q('m10', mk.mcq({ stem: r`A curve in the first quadrant satisfies $\dfrac{dy}{dx} = \dfrac{y}{x}$ and passes through $(2, 6)$. The value of $y$ at $x = 5$ is`, opts: ['$15$', '$12$', '$30$', '$9$'], key: 'a', sol: r`$\dfrac{dy}{y} = \dfrac{dx}{x}$ gives $\log y = \log x + \log k$, so $y = kx$. Through $(2, 6)$: $k = 3$. Then $y(5) = 15$.`, d: 2, c: 'application', t: [2], time: 75 }),
  (C) => C.which([15, 12, 30, 9], R4(rk4((x, y) => y / x, 2, 6, 5))));
Q('m11', mk.mcq({ stem: r`The function $F(x, y) = \dfrac{x^3 + y^3}{x - y}$ is homogeneous of degree`, opts: ['$2$', '$3$', '$1$', '$0$'], key: 'a', sol: r`$F(\lambda x, \lambda y) = \dfrac{\lambda^3(x^3 + y^3)}{\lambda(x - y)} = \lambda^2F(x, y)$, so the degree is $2$.`, d: 2, c: 'understanding', t: [3], time: 60 }),
  (C) => C.which([2, 3, 1, 0], homDegree((x, y) => (x ** 3 + y ** 3) / (x - y))));
Q('m12', mk.mcq({ stem: 'Which of these differential equations is homogeneous?', opts: [r`$\dfrac{dy}{dx} = \dfrac{x^2 + xy}{y^2}$`, r`$\dfrac{dy}{dx} = \dfrac{x + y + 1}{x}$`, r`$\dfrac{dy}{dx} = x^2 + y$`, r`$\dfrac{dy}{dx} = \dfrac{y}{x} + x$`], key: 'a', sol: r`In (a), replacing $x, y$ by $\lambda x, \lambda y$ multiplies top and bottom by $\lambda^2$, so the right side is unchanged (degree $0$). In (b) the constant $1$, in (c) the mixed powers and in (d) the extra $x$ spoil this.`, d: 3, c: 'analysis', t: [3], time: 75 }),
  (C) => C.which([(x, y) => (x * x + x * y) / (y * y), (x, y) => (x + y + 1) / x, (x, y) => x * x + y, (x, y) => y / x + x].map((F) => homDegree(F) === 0), true));
Q('m13', mk.mcq({ stem: r`To solve a homogeneous equation $\dfrac{dy}{dx} = g\left(\dfrac{y}{x}\right)$, the standard substitution is`, opts: [r`$y = vx$`, r`$y = v + x$`, r`$x = y + v$`, r`$y = \dfrac{v}{x}$`], key: 'a', sol: r`Put $y = vx$, where $v$ is a function of $x$. Then $\dfrac{y}{x} = v$ and the equation separates in $v$ and $x$.`, d: 1, c: 'recall', t: [3], time: 30 }),
  (C) => C.key('a'));
Q('m14', mk.mcq({ stem: r`If $y = vx$, where $v$ is a function of $x$, then $\dfrac{dy}{dx}$ equals`, opts: [r`$v + x\dfrac{dv}{dx}$`, r`$\dfrac{dv}{dx}$`, r`$v\dfrac{dv}{dx}$`, r`$x + v\dfrac{dv}{dx}$`], key: 'a', sol: r`Product rule: $\dfrac{d}{dx}(vx) = v \cdot 1 + x\dfrac{dv}{dx}$.`, d: 1, c: 'understanding', t: [3], time: 30 }),
  (C) => { const v = Math.sin, dv = Math.cos, y = (x) => x * Math.sin(x); const xs = grid(0.3, 2); C.which([(x) => v(x) + x * dv(x), (x) => dv(x), (x) => v(x) * dv(x), (x) => x + v(x) * dv(x)].map((g) => xs.every((x) => near(D(y, x), g(x), 1e-6))), true); });
Q('m15', mk.mcq({ stem: r`The integrating factor of $\dfrac{dy}{dx} - \dfrac{3y}{x} = x$, $x > 0$, is`, opts: [r`$\dfrac{1}{x^3}$`, r`$x^3$`, r`$e^{-3x}$`, r`$-\dfrac{3}{x}$`], key: 'a', sol: r`Here $P = -\dfrac{3}{x}$, so $\int P\,dx = -3\log x$ and the integrating factor is $e^{-3\log x} = x^{-3}$. Option (b) drops the minus sign.`, d: 2, c: 'application', t: [4], time: 60 }),
  (C) => { const P = (x) => -3 / x; C.which([(x) => x ** -3, (x) => x ** 3, (x) => Math.exp(-3 * x), (x) => -3 / x].map((I) => isIF(I, P, grid(0.5, 2))), true); });
Q('m16', mk.mcq({ stem: r`The integrating factor of $\dfrac{dy}{dx} + y\tan x = \sec x$, $0 < x < \dfrac{\pi}{2}$, is`, opts: [r`$\sec x$`, r`$\cos x$`, r`$\tan x$`, r`$e^{\tan x}$`], key: 'a', sol: r`$P = \tan x$ and $\int \tan x\,dx = \log \sec x$, so the integrating factor is $e^{\log \sec x} = \sec x$.`, d: 2, c: 'understanding', t: [4], time: 60 }),
  (C) => { const P = Math.tan; C.which([(x) => 1 / Math.cos(x), Math.cos, Math.tan, (x) => Math.exp(Math.tan(x))].map((I) => isIF(I, P, grid(0.1, 1.2))), true); });
Q('m17', mk.mcq({ stem: r`For $\dfrac{dx}{dy} + \dfrac{x}{y} = y^2$, $y > 0$, the integrating factor is`, opts: [r`$y$`, r`$x$`, r`$\dfrac{1}{y}$`, r`$e^{y}$`], key: 'a', sol: r`This is linear in $x$ with $P = \dfrac{1}{y}$. The integrating factor is $e^{\int \frac{1}{y}\,dy} = e^{\log y} = y$. It must be a function of $y$ alone, which rules out option (b).`, d: 2, c: 'application', t: [4], time: 60 }),
  (C) => { const P = (y) => 1 / y; const ys = grid(0.5, 3); C.which([isIF((y) => y, P, ys), false, isIF((y) => 1 / y, P, ys), isIF(Math.exp, P, ys)], true); });
Q('m18', mk.mcq({ stem: r`The general solution of $\dfrac{dy}{dx} + y = 4$ is`, opts: [r`$y = 4 + Ce^{-x}$`, r`$y = 4 + Ce^{x}$`, r`$y = 4x + C$`, r`$y = Ce^{-x}$`], key: 'a', sol: r`Integrating factor $e^{x}$: $\dfrac{d}{dx}(ye^{x}) = 4e^{x}$, so $ye^{x} = 4e^{x} + C$ and $y = 4 + Ce^{-x}$.`, d: 2, c: 'understanding', t: [4], time: 60 }),
  (C) => { const F = (x, y, y1) => y1 + y - 4; C.which([(x) => 4 + 3 * Math.exp(-x), (x) => 4 + 3 * Math.exp(x), (x) => 4 * x + 3, (x) => 3 * Math.exp(-x)].map((g) => solves(F, g, grid(-1, 2))), true); });

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The degree of $\left(\dfrac{d^2y}{dx^2}\right)^2 + \cos\left(\dfrac{dy}{dx}\right) = 0$ is $2$.`, r: 'The degree of a differential equation is defined only when the equation is a polynomial in its derivatives.', key: 'd', sol: r`The term $\cos\left(\dfrac{dy}{dx}\right)$ is not a polynomial in $\dfrac{dy}{dx}$, so by R the degree is **not defined**. A is false; R is true.`, d: 3, c: 'analysis', t: [1] }),
  (C) => { C.assert(od([[2, 2], [1, 1]], false).degree === null, 'degree not defined'); C.key('d'); });
Q('ar2', mk.ar({ a: r`$y = Ae^{3x} + Be^{-3x}$ is a solution of $\dfrac{d^2y}{dx^2} = 9y$ for all constants $A$ and $B$.`, r: 'The general solution of a differential equation of order $n$ contains $n$ arbitrary constants.', key: 'b', sol: r`A: $y'' = 9Ae^{3x} + 9Be^{-3x} = 9y$, true by substitution. R is a true fact. But R only counts constants; it does not show that this function satisfies the equation. R is not the explanation.`, d: 3, c: 'analysis', t: [1] }),
  (C) => { const F = (x, y, y1, y2) => y2 - 9 * y; C.assert([[1, 2], [-3, 0.5], [0, 4]].every(([a, b]) => solves(F, (x) => a * Math.exp(3 * x) + b * Math.exp(-3 * x), grid(-0.5, 0.5), 1e-3)), 'solves for all A, B'); C.key('b'); });
Q('ar3', mk.ar({ a: r`The equation $\dfrac{dy}{dx} = e^{x + y}$ can be solved by separating the variables.`, r: r`$e^{x + y} = e^{x} \cdot e^{y}$, a product of a function of $x$ and a function of $y$.`, key: 'a', sol: r`By R, $\dfrac{dy}{dx} = e^{x}e^{y}$, so $e^{-y}\,dy = e^{x}\,dx$: the variables separate. R explains A.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert([[0.3, 1.2], [-1, 2], [2, -0.7]].every(([x, y]) => near(Math.exp(x + y), Math.exp(x) * Math.exp(y))), 'product'); C.key('a'); });
Q('ar4', mk.ar({ a: r`The equation $\dfrac{dy}{dx} = \dfrac{x^2 + y^2}{xy}$ is homogeneous.`, r: 'Every differential equation whose right side is a ratio of two polynomials is homogeneous.', key: 'c', sol: r`A: the right side is unchanged when $x, y$ become $\lambda x, \lambda y$, so A is true. R is false: $\dfrac{dy}{dx} = \dfrac{x + 1}{y}$ is a ratio of polynomials but is not homogeneous.`, d: 3, c: 'analysis', t: [3] }),
  (C) => { C.assert(homDegree((x, y) => (x * x + y * y) / (x * y)) === 0 && homDegree((x, y) => (x + 1) / y) === null, 'A true, R counterexample'); C.key('c'); });
Q('ar5', mk.ar({ a: r`The integrating factor of $\dfrac{dy}{dx} + 2y = \sin x$ is $e^{2x}$.`, r: r`For $\dfrac{dy}{dx} + Py = Q$, the integrating factor is $e^{\int P\,dx}$.`, key: 'a', sol: r`Here $P = 2$, so by R the integrating factor is $e^{\int 2\,dx} = e^{2x}$. Both true, and R explains A.`, d: 2, c: 'understanding', t: [4] }),
  (C) => { C.assert(isIF((x) => Math.exp(2 * x), () => 2, grid(-1, 1)), 'IF e^{2x}'); C.key('a'); });
Q('ar6', mk.ar({ a: r`The equation $\dfrac{dy}{dx} + y^2 = x$ is a linear differential equation.`, r: r`In a linear differential equation, $y$ and its derivatives occur only in the first degree and are not multiplied together.`, key: 'd', sol: r`The term $y^2$ is of second degree in $y$, so by the definition in R the equation is **not** linear. A is false; R is true.`, d: 2, c: 'analysis', t: [4] }),
  (C) => { const L = (g) => (x) => D(g, x) + g(x) ** 2; const s = (x) => Math.sin(x) + Math.cos(x); C.assert(!near(L(s)(0.7), L(Math.sin)(0.7) + L(Math.cos)(0.7)), 'operator not additive, so not linear'); C.key('d'); });

// =============================================================== true / false
Q('tf1', mk.tf({ stem: 'True or false: the order of a differential equation is the highest power of its highest-order derivative.', key: 'f', sol: 'False. That describes the degree. The order is the order of the highest derivative that appears.', d: 1, c: 'recall', t: [1] }),
  (C) => C.key('f'));
Q('tf2', mk.tf({ stem: 'True or false: every differential equation has a degree.', key: 'f', sol: r`False. For $\dfrac{dy}{dx} = \tan\left(\dfrac{dy}{dx}\right) + x$ the equation is not a polynomial in the derivative, so the degree is not defined (its order is still $1$).`, d: 2, c: 'understanding', t: [1] }),
  (C) => { C.assert(od([[1, 1]], false).degree === null, 'no degree'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`True or false: $y = 5e^{x}$ is a particular solution of $\dfrac{dy}{dx} = y$.`, key: 't', sol: r`True. $\dfrac{dy}{dx} = 5e^{x} = y$; it is the member $C = 5$ of the family $y = Ce^{x}$.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { C.assert(solves((x, y, y1) => y1 - y, (x) => 5 * Math.exp(x), grid(-1, 1), 1e-3), 'solves'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`True or false: $F(x, y) = x^2 + xy + 1$ is a homogeneous function.`, key: 'f', sol: r`False. $F(\lambda x, \lambda y) = \lambda^2(x^2 + xy) + 1$, which cannot be written as $\lambda^n F(x, y)$ because of the constant term.`, d: 2, c: 'analysis', t: [3] }),
  (C) => { C.assert(homDegree((x, y) => x * x + x * y + 1) === null, 'not homogeneous'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`True or false: $y = x^2$ satisfies $\dfrac{dy}{dx} - \dfrac{2y}{x} = 0$ for $x \ne 0$.`, key: 't', sol: r`True. $\dfrac{dy}{dx} = 2x$ and $\dfrac{2y}{x} = \dfrac{2x^2}{x} = 2x$, so the left side is $0$.`, d: 2, c: 'understanding', t: [4] }),
  (C) => { C.assert(solves((x, y, y1) => y1 - (2 * y) / x, (x) => x * x, grid(0.5, 2)), 'solves'); C.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The order of $\dfrac{d^4y}{dx^4} + \left(\dfrac{d^2y}{dx^2}\right)^5 = \sin x$ is ______.`, acc: [['4', 'four']], sol: r`The highest derivative is the fourth, $\dfrac{d^4y}{dx^4}$, so the order is $4$. The power $5$ is on a lower derivative.`, d: 1, c: 'understanding', t: [1] }),
  (C) => C.blank(od([[4, 1], [2, 5]]).order));
Q('fb2', mk.fill({ stem: r`The degree of $\left(\dfrac{d^2y}{dx^2}\right)^2 + \left(\dfrac{dy}{dx}\right)^3 = x$ is ______.`, acc: [['2', 'two']], sol: r`It is a polynomial in the derivatives; the highest-order derivative $\dfrac{d^2y}{dx^2}$ appears to the power $2$, so the degree is $2$ (not $3$).`, d: 2, c: 'understanding', t: [1] }),
  (C) => C.blank(od([[2, 2], [1, 3]]).degree));
Q('fb3', mk.fill({ stem: r`If $\dfrac{dy}{dx} = 2y$ and $y(0) = 3$, then $y(\log 2) = $ ______.`, acc: [['12']], sol: r`$y = 3e^{2x}$, so $y(\log 2) = 3e^{2\log 2} = 3 \times 4 = 12$.`, d: 3, c: 'application', t: [2] }),
  (C) => C.blank(R6(rk4((x, y) => 2 * y, 0, 3, ln(2)))));
Q('fb4', mk.fill({ stem: r`The integrating factor of $\dfrac{dy}{dx} + \dfrac{y}{x} = x^2$, $x > 0$, is ______.`, acc: [['$x$', 'x']], sol: r`$P = \dfrac{1}{x}$, so the integrating factor is $e^{\log x} = x$.`, d: 2, c: 'understanding', t: [4] }),
  (C) => { C.assert(isIF((x) => x, (x) => 1 / x, grid(0.5, 3)), 'IF x'); C.blank('x'); });
Q('fb5', mk.fill({ stem: r`In a linear equation of the form $\dfrac{dx}{dy} + Px = Q$, the coefficients $P$ and $Q$ are functions of ______ only.`, acc: [['$y$', 'y']], sol: r`Here $x$ is the dependent variable and $y$ the independent one, so $P$ and $Q$ depend on $y$ alone.`, d: 1, c: 'recall', t: [4] }),
  (C) => C.blank('y'));

// =============================================================== numerical
Q('n01', mk.num({ stem: r`A yeast culture grows at a rate proportional to its size: $\dfrac{dN}{dt} = kN$. It has $800$ cells at $t = 0$ and $1200$ cells at $t = 2$ hours. How many cells will it have at $t = 6$ hours?`, value: 2700, sol: r`$N = 800e^{kt}$ and $e^{2k} = \dfrac{1200}{800} = 1.5$. Then $N(6) = 800\left(e^{2k}\right)^3 = 800 \times 3.375 = 2700$.`, scheme: [[r`$N = 800e^{kt}$, $e^{2k} = 1.5$`, 0.5], ['2700', 0.5]], d: 3, c: 'application', t: [2], time: 120 }),
  (C) => { const k = ln(1.5) / 2; C.val(R4(rk4((t, N) => k * N, 0, 800, 6)), 1e-3); });
Q('n02', mk.num({ stem: r`Solve $\dfrac{dy}{dx} = 2xy$ with $y(0) = 5$ and give $y(1)$ correct to two decimal places.`, value: 13.59, tol: 0.01, sol: r`$\dfrac{dy}{y} = 2x\,dx$ gives $\log y = x^2 + C$, so $y = 5e^{x^2}$. Then $y(1) = 5e$ and $5 \times 2.71828 = 13.5914$, i.e. about $13.59$.`, scheme: [[r`$y = 5e^{x^2}$`, 0.5], ['13.59', 0.5]], d: 3, c: 'application', t: [2], time: 120 }),
  (C) => C.val(rk4((x, y) => 2 * x * y, 0, 5, 1), 0.01));
Q('n03', mk.num({ stem: r`Solve $\dfrac{dy}{dx} + y = 2$ with $y(0) = 0$, and find $y$ when $x = \log 2$.`, value: 1, sol: r`Integrating factor $e^{x}$: $ye^{x} = 2e^{x} + C$; $y(0) = 0$ gives $C = -2$, so $y = 2 - 2e^{-x}$. At $x = \log 2$, $e^{-x} = \dfrac12$ and $y = 2 - 2 \times \dfrac12 = 1$.`, scheme: [[r`$y = 2 - 2e^{-x}$`, 0.5], ['1', 0.5]], d: 2, c: 'application', t: [4], time: 120 }),
  (C) => C.val(R4(rk4((x, y) => 2 - y, 0, 0, ln(2)))));
Q('n04', mk.num({ stem: r`Water flows into a tank while some leaks out, so that the volume $V$ (in kL) after $t$ minutes satisfies $\dfrac{dV}{dt} = 5 - 0.1V$, with $V(0) = 0$. Find $V$ when $t = 10\log 2$.`, value: 25, unit: 'kL', sol: r`Linear: $\dfrac{dV}{dt} + 0.1V = 5$, integrating factor $e^{0.1t}$, so $Ve^{0.1t} = 50e^{0.1t} + C$. $V(0) = 0$ gives $C = -50$: $V = 50(1 - e^{-0.1t})$. At $t = 10\log 2$, $e^{-0.1t} = \dfrac12$, so $V = 50 \times \dfrac12 = 25$.`, scheme: [[r`$V = 50(1 - e^{-0.1t})$`, 0.5], ['25', 0.5]], d: 3, c: 'application', t: [4], time: 150 }),
  (C) => C.val(R4(rk4((t, V) => 5 - 0.1 * V, 0, 0, 10 * ln(2)))));
Q('n05', mk.num({ stem: r`Solve $\dfrac{dy}{dx} = \dfrac{y}{x} + \dfrac{y^2}{x^2}$ with $y(1) = 1$, and find $y$ at $x = \sqrt{e}$ correct to two decimal places.`, value: 3.3, tol: 0.01, sol: r`Put $y = vx$: $x\dfrac{dv}{dx} = v^2$, so $-\dfrac1v = \log x + C$; $v(1) = 1$ gives $C = -1$ and $y = \dfrac{x}{1 - \log x}$. At $x = \sqrt e$, $\log x = \dfrac12$, so $y = 2\sqrt e$ and $2 \times 1.64872 = 3.29744$, i.e. about $3.30$.`, scheme: [[r`$y = \dfrac{x}{1 - \log x}$`, 0.5], ['3.30', 0.5]], d: 4, c: 'application', t: [3], time: 180 }),
  (C) => C.val(rk4((x, y) => y / x + (y / x) ** 2, 1, 1, Math.sqrt(E)), 0.01));
Q('n06', mk.num({ stem: r`Solve $\dfrac{dy}{dx} = 1 + y^2$ with $y(0) = 0$, and find $y$ at $x = \dfrac{\pi}{4}$.`, value: 1, sol: r`$\dfrac{dy}{1 + y^2} = dx$ gives $\tan^{-1}y = x + C$; $y(0) = 0$ gives $C = 0$, so $y = \tan x$ and $y\left(\dfrac{\pi}{4}\right) = 1$.`, scheme: [[r`$y = \tan x$`, 0.5], ['1', 0.5]], d: 2, c: 'understanding', t: [2], time: 90 }),
  (C) => C.val(R4(rk4((x, y) => 1 + y * y, 0, 0, Math.PI / 4))));

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Write the order and the degree (if defined) of each: **(i)** $\dfrac{d^2y}{dx^2} + \left(\dfrac{dy}{dx}\right)^3 = e^{x}$; **(ii)** $\left(\dfrac{d^3y}{dx^3}\right)^2 - x\dfrac{dy}{dx} = \tan\left(\dfrac{d^2y}{dx^2}\right)$.`, model: r`(i) Highest derivative $\dfrac{d^2y}{dx^2}$: order $2$. It is a polynomial in the derivatives and $\dfrac{d^2y}{dx^2}$ has power $1$: degree $1$.

(ii) Highest derivative $\dfrac{d^3y}{dx^3}$: order $3$. The term $\tan\left(\dfrac{d^2y}{dx^2}\right)$ is not a polynomial in a derivative, so the degree is not defined.`, sol: 'Order from the highest derivative; degree only for a polynomial in derivatives.', scheme: [['(i) order 2, degree 1', 1], ['(ii) order 3, degree not defined', 1]], d: 2, c: 'understanding', t: [1], time: 90 }),
  (C) => { const a = od([[2, 1], [1, 3]]), b = od([[3, 2], [1, 1], [2, 1]], false); C.assert(a.order === 2 && a.degree === 1 && b.order === 3 && b.degree === null, 'orders/degrees'); C.model([2, 1, 3, 'not defined']); });
Q('s202', mk.short({ marks: 2, stem: r`Show that $y = Ce^{x} - x - 1$ is a solution of $\dfrac{dy}{dx} = x + y$ for every constant $C$.`, model: r`$\dfrac{dy}{dx} = Ce^{x} - 1$. Also $x + y = x + Ce^{x} - x - 1 = Ce^{x} - 1$. The two sides are equal for every $C$, so $y$ is a solution.`, sol: 'Differentiate and substitute both sides.', scheme: [['Derivative found', 1], ['Both sides shown equal', 1]], d: 2, c: 'understanding', t: [1], time: 90 }),
  (C) => C.assert([2, -1, 0.5].every((k) => solves((x, y, y1) => y1 - x - y, (x) => k * Math.exp(x) - x - 1, grid(-1, 1), 1e-3)), 'solves for several C'));
Q('s203', mk.short({ marks: 2, stem: r`Find the general solution of $\dfrac{dy}{dx} = \dfrac{x^2 + 1}{y^2}$, $y \ne 0$.`, model: r`Separate: $y^2\,dy = (x^2 + 1)\,dx$. Integrate: $\dfrac{y^3}{3} = \dfrac{x^3}{3} + x + C$, i.e. $y^3 = x^3 + 3x + C_1$.`, sol: 'Separate the variables, then integrate both sides.', scheme: [['Variables separated', 1], ['Integrated with constant', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
  (C) => C.assert(solves((x, y, y1) => y1 - (x * x + 1) / (y * y), (x) => Math.cbrt(x ** 3 + 3 * x + 5), grid(0, 2)), 'y³ = x³ + 3x + 5 solves'));
Q('s204', mk.short({ marks: 2, stem: r`Solve $\dfrac{dy}{dx} = \sec y$, $-\dfrac{\pi}{2} < y < \dfrac{\pi}{2}$.`, model: r`$\dfrac{dy}{\sec y} = dx$, i.e. $\cos y\,dy = dx$. Integrating, $\sin y = x + C$.`, sol: r`Move $\sec y$ to the left as $\cos y$.`, scheme: [['Separation', 1], [r`$\sin y = x + C$`, 1]], d: 2, c: 'understanding', t: [2], time: 75 }),
  (C) => C.assert(solves((x, y, y1) => y1 - 1 / Math.cos(y), (x) => Math.asin(x + 0.2), grid(-0.6, 0.6)), 'sin y = x + 0.2 solves'));
Q('s205', mk.short({ marks: 2, stem: r`A curve satisfies $\dfrac{dy}{dx} = \dfrac{y}{1 + x}$ (with $x > -1$, $y > 0$) and passes through the point $(0, 4)$. Find its equation.`, model: r`$\dfrac{dy}{y} = \dfrac{dx}{1 + x}$ gives $\log y = \log(1 + x) + \log k$, so $y = k(1 + x)$. With $y(0) = 4$: $k = 4$, so $y = 4(1 + x)$.`, sol: 'Separate, integrate, then use the condition.', scheme: [['General solution', 1], ['y = 4(1 + x)', 1]], d: 2, c: 'application', t: [2], time: 90 }),
  (C) => { C.assert(solves((x, y, y1) => y1 - y / (1 + x), (x) => 4 * (1 + x), grid(0, 3)), 'solves'); C.assert(near(rk4((x, y) => y / (1 + x), 0, 4, 2), 12), 'RK4 y(2) = 12'); C.model([4, 1]); });
Q('s206', mk.short({ marks: 2, stem: r`Show that $\dfrac{dy}{dx} = \dfrac{x^2 - y^2}{3xy}$ is a homogeneous differential equation.`, model: r`Let $F(x, y) = \dfrac{x^2 - y^2}{3xy}$. Then $F(\lambda x, \lambda y) = \dfrac{\lambda^2(x^2 - y^2)}{3\lambda^2 xy} = \lambda^0F(x, y)$. So $F$ is homogeneous of degree $0$ and the equation is homogeneous.`, sol: r`Test $F(\lambda x, \lambda y)$.`, scheme: [[r`$F(\lambda x, \lambda y)$ computed`, 1], ['Degree 0 concluded', 1]], d: 2, c: 'understanding', t: [3], time: 75 }),
  (C) => C.assert(homDegree((x, y) => (x * x - y * y) / (3 * x * y)) === 0, 'degree 0'));
Q('s207', mk.short({ marks: 2, stem: r`Find the general solution of $\dfrac{dy}{dx} + 4y = 8$.`, model: r`Integrating factor $e^{\int 4\,dx} = e^{4x}$. Then $\dfrac{d}{dx}\left(ye^{4x}\right) = 8e^{4x}$, so $ye^{4x} = 2e^{4x} + C$ and $y = 2 + Ce^{-4x}$.`, sol: 'Linear equation with constant P.', scheme: [[r`Integrating factor $e^{4x}$`, 1], [r`$y = 2 + Ce^{-4x}$`, 1]], d: 2, c: 'understanding', t: [4], time: 75 }),
  (C) => C.assert([3, -1].every((k) => solves((x, y, y1) => y1 + 4 * y - 8, (x) => 2 + k * Math.exp(-4 * x), grid(-0.5, 1), 1e-3)), 'solves'));
Q('s208', mk.short({ marks: 2, stem: r`Find the integrating factor of $\dfrac{dy}{dx} - y\cot x = \sin x$, $0 < x < \pi$, and hence its general solution.`, model: r`$P = -\cot x$, $\int P\,dx = -\log \sin x$, so the integrating factor is $\dfrac{1}{\sin x} = \operatorname{cosec} x$. Then $\dfrac{d}{dx}(y\operatorname{cosec} x) = \sin x \operatorname{cosec} x = 1$, so $y\operatorname{cosec} x = x + C$, i.e. $y = (x + C)\sin x$.`, sol: r`Watch the sign of $P$.`, scheme: [[r`Integrating factor $\operatorname{cosec} x$`, 1], [r`$y = (x + C)\sin x$`, 1]], d: 3, c: 'application', t: [4], time: 120 }),
  (C) => { const xs = grid(0.3, 2.5); C.assert(isIF((x) => 1 / Math.sin(x), (x) => -1 / Math.tan(x), xs), 'IF cosec'); C.assert(solves((x, y, y1) => y1 - y / Math.tan(x) - Math.sin(x), (x) => (x + 1.5) * Math.sin(x), xs), 'solves'); });
Q('s209', mk.short({ marks: 2, stem: r`Use $y = vx$ to reduce $\dfrac{dy}{dx} = \dfrac{y^2 + 2xy}{x^2}$ to variables-separable form. (Do not integrate.)`, model: r`With $y = vx$: $v + x\dfrac{dv}{dx} = \dfrac{v^2x^2 + 2vx^2}{x^2} = v^2 + 2v$. So $x\dfrac{dv}{dx} = v^2 + v$, i.e. $\dfrac{dv}{v(v + 1)} = \dfrac{dx}{x}$.`, sol: r`Substitute and cancel $x^2$.`, scheme: [['Substitution made', 1], ['Separated form', 1]], d: 3, c: 'application', t: [3], time: 90 }),
  (C) => { const F = (x, y) => (y * y + 2 * x * y) / (x * x); C.assert([[1.2, 0.5], [2, -1.3], [0.7, 3]].every(([x, v]) => near(F(x, v * x) - v, v * v + v)), 'x v′ = v² + v'); });

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Solve $(x + 1)\dfrac{dy}{dx} = 2(y - 3)$, $x > -1$, and pick out the solution with $y(0) = 5$.`, model: r`Separate: $\dfrac{dy}{y - 3} = \dfrac{2\,dx}{x + 1}$.

Integrate: $\log|y - 3| = 2\log|x + 1| + \log k$, so $y - 3 = k(x + 1)^2$.

At $x = 0$, $y = 5$: $2 = k$. Hence $y = 3 + 2(x + 1)^2$.`, sol: 'Separate, integrate to logs, then use the condition.', scheme: [['Separation', 1], ['General solution', 1], ['Particular solution', 1]], d: 3, c: 'application', t: [2], time: 150 }),
  (C) => { const g = (x) => 3 + 2 * (x + 1) ** 2; C.assert(solves((x, y, y1) => (x + 1) * y1 - 2 * (y - 3), g, grid(0, 2)) && g(0) === 5, 'solves with y(0) = 5'); C.model([3, 2]); });
Q('s302', mk.short({ marks: 3, stem: r`Find the general solution of $y\dfrac{dy}{dx} = (1 + y^2)x$.`, model: r`Separate: $\dfrac{y\,dy}{1 + y^2} = x\,dx$.

Integrate: $\dfrac12\log(1 + y^2) = \dfrac{x^2}{2} + C$.

So $\log(1 + y^2) = x^2 + 2C$, i.e. $1 + y^2 = Ae^{x^2}$, where $A = e^{2C} > 0$.`, sol: r`The left integral is a log: the numerator is half the derivative of $1 + y^2$.`, scheme: [['Separation', 1], ['Integration', 1], ['Simplified form', 1]], d: 3, c: 'understanding', t: [2], time: 150 }),
  (C) => C.assert(solves((x, y, y1) => y * y1 - (1 + y * y) * x, (x) => Math.sqrt(2 * Math.exp(x * x) - 1), grid(-1, 1), 1e-3), 'A = 2 solves'));
Q('s303', mk.short({ marks: 3, stem: r`Solve $\dfrac{dy}{dx} = \dfrac{y}{x} + e^{-y/x}$, $x \ge 1$, given $y = 0$ when $x = 1$.`, model: r`Homogeneous; put $y = vx$: $v + x\dfrac{dv}{dx} = v + e^{-v}$, so $e^{v}\,dv = \dfrac{dx}{x}$.

Integrate: $e^{v} = \log x + C$, i.e. $e^{y/x} = \log x + C$.

At $x = 1$, $y = 0$: $1 = 0 + C$, so $C = 1$ and $e^{y/x} = 1 + \log x$, i.e. $y = x\log(1 + \log x)$.`, sol: 'Substitute, separate, integrate, then use the condition.', scheme: [['Substitution and separation', 1], ['Integration', 1], ['Particular solution', 1]], d: 3, c: 'application', t: [3], time: 180 }),
  (C) => { const g = (x) => x * ln(1 + ln(x)); C.assert(solves((x, y, y1) => y1 - y / x - Math.exp(-y / x), g, grid(1, 3)) && g(1) === 0, 'solves with y(1) = 0'); C.model([1]); });
Q('s304', mk.short({ marks: 3, stem: r`Solve the homogeneous equation $2xy\dfrac{dy}{dx} = 3y^2 + x^2$, $x > 0$.`, model: r`$\dfrac{dy}{dx} = \dfrac{3y^2 + x^2}{2xy}$. Put $y = vx$: $v + x\dfrac{dv}{dx} = \dfrac{3v^2 + 1}{2v}$, so $x\dfrac{dv}{dx} = \dfrac{v^2 + 1}{2v}$.

Separate: $\dfrac{2v\,dv}{v^2 + 1} = \dfrac{dx}{x}$, so $\log(v^2 + 1) = \log x + \log A$.

Hence $v^2 + 1 = Ax$, i.e. $\dfrac{y^2}{x^2} + 1 = Ax$, or $x^2 + y^2 = Ax^3$.`, sol: 'Substitute y = vx and simplify before separating.', scheme: [['Substitution', 1], ['Separation and integration', 1], ['Answer in x and y', 1]], d: 3, c: 'application', t: [3], time: 180 }),
  (C) => C.assert(solves((x, y, y1) => 2 * x * y * y1 - 3 * y * y - x * x, (x) => Math.sqrt(2 * x ** 3 - x * x), grid(1, 3), 1e-3), 'A = 2 solves'));
Q('s305', mk.short({ marks: 3, stem: r`Solve $\dfrac{dy}{dx} + 2y = e^{-2x}\cos x$.`, model: r`$P = 2$, so the integrating factor is $e^{2x}$.

$\dfrac{d}{dx}\left(ye^{2x}\right) = e^{2x} \cdot e^{-2x}\cos x = \cos x$.

Integrate: $ye^{2x} = \sin x + C$, so $y = e^{-2x}(\sin x + C)$.`, sol: 'Linear; the integrating factor cancels the exponential.', scheme: [['Integrating factor', 1], ['Product form integrated', 1], ['General solution', 1]], d: 3, c: 'application', t: [4], time: 150 }),
  (C) => C.assert(solves((x, y, y1) => y1 + 2 * y - Math.exp(-2 * x) * Math.cos(x), (x) => Math.exp(-2 * x) * (Math.sin(x) + 1.5), grid(-1, 1.5)), 'solves'));
Q('s306', mk.short({ marks: 3, stem: r`Find the particular solution of $(x^2 + 4)\dfrac{dy}{dx} + 2xy = 6x^2$, given $y(0) = 1$.`, model: r`Divide by $x^2 + 4$: $\dfrac{dy}{dx} + \dfrac{2x}{x^2 + 4}y = \dfrac{6x^2}{x^2 + 4}$. Integrating factor $e^{\log(x^2 + 4)} = x^2 + 4$.

$\dfrac{d}{dx}\left[(x^2 + 4)y\right] = 6x^2$, so $(x^2 + 4)y = 2x^3 + C$.

$y(0) = 1$: $4 = C$. Hence $y = \dfrac{2x^3 + 4}{x^2 + 4}$.`, sol: 'Standard form first, then the integrating factor.', scheme: [['Integrating factor', 1], ['General solution', 1], ['Particular solution', 1]], d: 3, c: 'application', t: [4], time: 180 }),
  (C) => { const g = (x) => (2 * x ** 3 + 4) / (x * x + 4); C.assert(solves((x, y, y1) => (x * x + 4) * y1 + 2 * x * y - 6 * x * x, g, grid(-2, 2)) && g(0) === 1, 'solves, y(0) = 1'); C.model([4]); });
Q('s307', mk.short({ marks: 3, stem: r`Solve $\dfrac{dx}{dy} - \dfrac{2x}{y} = y^2$, $y > 0$.`, model: r`Linear in $x$ with $P = -\dfrac{2}{y}$, $Q = y^2$. Integrating factor $e^{-2\log y} = \dfrac{1}{y^2}$.

$\dfrac{d}{dy}\left(\dfrac{x}{y^2}\right) = y^2 \cdot \dfrac{1}{y^2} = 1$.

So $\dfrac{x}{y^2} = y + C$, i.e. $x = y^3 + Cy^2$.`, sol: 'Treat x as the dependent variable.', scheme: [['Integrating factor', 1], ['Integration', 1], ['General solution', 1]], d: 3, c: 'application', t: [4], time: 150 }),
  (C) => { C.assert(isIF((y) => y ** -2, (y) => -2 / y, grid(0.5, 3)), 'IF 1/y²'); C.assert(solves((y, x, x1) => x1 - (2 * x) / y - y * y, (y) => y ** 3 + 2 * y * y, grid(0.5, 3)), 'x = y³ + 2y² solves'); });
Q('s308', mk.short({ marks: 3, stem: r`Riya solved $\dfrac{dy}{dx} = \dfrac{y}{x}$ ($x, y > 0$) and wrote the general solution as $y = x + C$. Show that her answer is wrong in general, find the error, and give the correct solution.`, model: r`Check: for $y = x + C$, $\dfrac{dy}{dx} = 1$ but $\dfrac{y}{x} = 1 + \dfrac{C}{x}$, which is not $1$ unless $C = 0$. So her family is wrong.

Error: she integrated $\dfrac{dy}{y} = \dfrac{dx}{x}$ as $y = x + C$, forgetting the logarithms.

Correct: $\log y = \log x + \log k$, so $y = kx$.`, sol: 'Test her answer by substitution, then redo the integration.', scheme: [['Substitution shows failure', 1], ['Error identified', 1], ['y = kx', 1]], d: 3, c: 'analysis', t: [1, 2], time: 150 }),
  (C) => { const F = (x, y, y1) => y1 - y / x; C.assert(!solves(F, (x) => x + 2, grid(0.5, 3)) && solves(F, (x) => 3 * x, grid(0.5, 3)), 'x + 2 fails, 3x works'); });

// =============================================================== long answer, 5 marks
Q('l01', mk.long({ stem: r`Find the particular solution of $x(x + 2)\dfrac{dy}{dx} = 2(1 + y^2)$, $x > 0$, given that $y = 0$ when $x = 2$.`, model: r`**Separate:** $\dfrac{dy}{1 + y^2} = \dfrac{2\,dx}{x(x + 2)}$.

**Partial fractions:** $\dfrac{2}{x(x + 2)} = \dfrac{1}{x} - \dfrac{1}{x + 2}$.

**Integrate:** $\tan^{-1}y = \log x - \log(x + 2) + C = \log\dfrac{x}{x + 2} + C$.

**Condition:** at $x = 2$, $y = 0$: $0 = \log\dfrac{2}{4} + C$, so $C = \log 2$.

**Answer:** $\tan^{-1}y = \log\dfrac{2x}{x + 2}$, i.e. $y = \tan\left(\log\dfrac{2x}{x + 2}\right)$.`, sol: 'Separate, split by partial fractions, integrate, use the condition.', scheme: [['Separation', 1], ['Partial fractions', 1], ['Integration', 1], ['Constant from condition', 1], ['Final particular solution', 1]], d: 4, c: 'application', t: [2], time: 360 }),
  (C) => { const g = (x) => Math.tan(ln((2 * x) / (x + 2))); C.assert(solves((x, y, y1) => x * (x + 2) * y1 - 2 * (1 + y * y), g, grid(1, 5)) && Math.abs(g(2)) < 1e-12, 'solves, y(2) = 0'); C.model([2]); });
Q('l02', mk.long({ stem: r`Solve $(x^2 + xy)\dfrac{dy}{dx} = y^2$, $x, y > 0$, and find the particular solution for which $y = 1$ when $x = 1$.`, model: r`$\dfrac{dy}{dx} = \dfrac{y^2}{x^2 + xy}$ is homogeneous. Put $y = vx$: $v + x\dfrac{dv}{dx} = \dfrac{v^2}{1 + v}$.

So $x\dfrac{dv}{dx} = \dfrac{v^2 - v - v^2}{1 + v} = -\dfrac{v}{1 + v}$.

Separate: $\dfrac{1 + v}{v}\,dv = -\dfrac{dx}{x}$, i.e. $\left(\dfrac1v + 1\right)dv = -\dfrac{dx}{x}$.

Integrate: $\log v + v = -\log x + C$. With $v = \dfrac yx$: $\log y - \log x + \dfrac yx = -\log x + C$, so $\log y + \dfrac{y}{x} = C$.

At $(1, 1)$: $0 + 1 = C$. Particular solution: $\log y + \dfrac{y}{x} = 1$.`, sol: 'Homogeneous: substitute, simplify, separate, integrate, back-substitute.', scheme: [['Homogeneous form and substitution', 1], ['Simplified equation in v', 1], ['Separation and integration', 1], ['General solution in x, y', 1], ['Particular solution', 1]], d: 5, c: 'analysis', t: [3], time: 420 }),
  (C) => { const fn = (x, y) => (y * y) / (x * x + x * y); C.assert([2, 3, 0.6].every((X) => { const Y = rk4(fn, 1, 1, X); return Math.abs(ln(Y) + Y / X - 1) < 1e-8; }), 'RK4 points satisfy log y + y/x = 1'); C.model([1]); });
Q('l03', mk.long({ stem: r`Solve $x\dfrac{dy}{dx} - y = x^2e^{x}$, $x > 0$, and find the particular solution with $y = 0$ when $x = 1$.`, model: r`**Standard form:** $\dfrac{dy}{dx} - \dfrac{1}{x}y = xe^{x}$, so $P = -\dfrac1x$, $Q = xe^{x}$.

**Integrating factor:** $e^{-\log x} = \dfrac{1}{x}$.

**Multiply and integrate:** $\dfrac{d}{dx}\left(\dfrac{y}{x}\right) = e^{x}$, so $\dfrac{y}{x} = e^{x} + C$, i.e. $y = xe^{x} + Cx$.

**Condition:** $0 = e + C$, so $C = -e$.

**Particular solution:** $y = x(e^{x} - e)$.`, sol: 'Divide by x first, then use the integrating factor.', scheme: [['Standard form', 1], ['Integrating factor', 1], ['Integration', 1], ['General solution', 1], ['Particular solution', 1]], d: 3, c: 'application', t: [4], time: 360 }),
  (C) => { const g = (x) => x * (Math.exp(x) - E); C.assert(solves((x, y, y1) => x * y1 - y - x * x * Math.exp(x), g, grid(0.5, 2), 1e-3) && Math.abs(g(1)) < 1e-12, 'solves, y(1) = 0'); });
Q('l04', mk.long({ stem: r`Solve $\dfrac{dy}{dx} + \dfrac{2y}{x} = \log x$, $x > 0$, given that $y = 0$ when $x = 1$.`, model: r`**Integrating factor:** $e^{\int \frac{2}{x}dx} = e^{2\log x} = x^2$.

**Multiply:** $\dfrac{d}{dx}(x^2y) = x^2\log x$.

**Integrate by parts:** $\int x^2\log x\,dx = \dfrac{x^3}{3}\log x - \int \dfrac{x^3}{3} \cdot \dfrac1x\,dx = \dfrac{x^3}{3}\log x - \dfrac{x^3}{9} + C$.

So $x^2y = \dfrac{x^3}{3}\log x - \dfrac{x^3}{9} + C$.

**Condition:** $0 = 0 - \dfrac19 + C$, so $C = \dfrac19$.

**Answer:** $y = \dfrac{x}{3}\log x - \dfrac{x}{9} + \dfrac{1}{9x^2}$.`, sol: 'Integrating factor x², then integration by parts.', scheme: [['Integrating factor', 1], ['Product form', 1], ['Integration by parts', 1], ['Constant from condition', 1], ['Final answer', 1]], d: 4, c: 'application', t: [4], time: 420 }),
  (C) => { const g = (x) => (x * ln(x)) / 3 - x / 9 + 1 / (9 * x * x); C.assert(solves((x, y, y1) => y1 + (2 * y) / x - ln(x), g, grid(0.5, 3)) && Math.abs(g(1)) < 1e-12, 'solves, y(1) = 0'); C.model([9]); });
Q('l05', mk.long({ stem: r`A metal rod at $200$ °C is placed in a room at $30$ °C. Its temperature $T$ after $t$ minutes satisfies $\dfrac{dT}{dt} = -k(T - 30)$, $k > 0$. After $10$ minutes it is at $115$ °C. **(a)** Solve the equation with the initial condition. **(b)** Find $k$. **(c)** When will the rod be at $72.5$ °C?`, model: r`**(a)** $\dfrac{dT}{T - 30} = -k\,dt$, so $\log(T - 30) = -kt + C$ and $T - 30 = Ae^{-kt}$. At $t = 0$: $A = 170$. So $T = 30 + 170e^{-kt}$.

**(b)** $115 = 30 + 170e^{-10k}$ gives $e^{-10k} = \dfrac{85}{170} = \dfrac12$, so $k = \dfrac{\log 2}{10}$.

**(c)** $72.5 - 30 = 42.5$ and $\dfrac{42.5}{170} = \dfrac14 = \left(\dfrac12\right)^2$. So $e^{-kt} = \left(e^{-10k}\right)^2$, giving $t = 20$ minutes.`, sol: 'Separate, use both conditions, then compare powers of one half.', scheme: [['Separation and integration', 1], ['A = 170', 1], ['Value of k', 1], ['Set up for 72.5', 1], ['t = 20 minutes', 1]], d: 3, c: 'application', t: [2], time: 360 }),
  (C) => { const k = ln(2) / 10; C.assert(near(rk4((t, T) => -k * (T - 30), 0, 200, 10), 115) && near(rk4((t, T) => -k * (T - 30), 0, 200, 20), 72.5), 'T(10) = 115, T(20) = 72.5'); C.model([170, 20]); });
Q('l06', mk.long({ stem: r`Consider $\dfrac{dy}{dx} = \dfrac{x + y}{x}$, $x > 0$. **(a)** Show that it is homogeneous and solve it with $y = vx$. **(b)** Show that it is also linear and solve it with an integrating factor. **(c)** Check that the two answers agree.`, model: r`**(a)** $F(\lambda x, \lambda y) = \dfrac{\lambda(x + y)}{\lambda x} = F(x, y)$: homogeneous of degree $0$. With $y = vx$: $v + x\dfrac{dv}{dx} = 1 + v$, so $dv = \dfrac{dx}{x}$ and $v = \log x + C$. Hence $y = x\log x + Cx$.

**(b)** $\dfrac{dy}{dx} - \dfrac{1}{x}y = 1$ is linear with $P = -\dfrac1x$. Integrating factor $\dfrac1x$: $\dfrac{d}{dx}\left(\dfrac yx\right) = \dfrac1x$, so $\dfrac yx = \log x + C$.

**(c)** Both give $y = x\log x + Cx$, the same family.`, sol: 'Two routes to one family.', scheme: [['Homogeneity shown', 1], ['Solution by y = vx', 1], ['Linear form and integrating factor', 1], ['Solution by integrating factor', 1], ['Agreement stated', 1]], d: 4, c: 'analysis', t: [3, 4], time: 360 }),
  (C) => { C.assert(homDegree((x, y) => (x + y) / x) === 0, 'homogeneous'); C.assert([2, -1].every((k) => solves((x, y, y1) => y1 - (x + y) / x, (x) => x * ln(x) + k * x, grid(0.5, 3))), 'family solves'); });

// =============================================================== case-based
caseQ('c01', {
  passage: r`In a microbiology lab in Pune, a bacteria culture grows at a rate proportional to the number present: $\dfrac{dN}{dt} = kN$, where $N$ is the number of bacteria after $t$ hours. At the start there are $1000$ bacteria, and the number doubles every $3$ hours.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $N = 1000e^{kt}$. (b) $k = \dfrac{\log 2}{3} \approx 0.231$. (c) (i) $N(9) = 8000$. Or (ii) $t = 12$ hours.`,
  sol: r`(a) Separate and integrate. (b) $e^{3k} = 2$. (c) (i) $N(9) = 1000 \cdot 2^3$. (ii) $16 = 2^4$, four doubling periods.`,
  children: [
    child('a', mk.mcq({ stem: 'The number of bacteria after $t$ hours is', opts: [r`$N = 1000e^{kt}$`, r`$N = 1000 + kt$`, r`$N = 1000e^{-kt}$`, r`$N = 1000kt$`], key: 'a', sol: r`$\dfrac{dN}{N} = k\,dt$ gives $N = Ae^{kt}$ and $N(0) = 1000$ gives $A = 1000$.`, d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: 'Find $k$ correct to three decimal places.', value: 0.231, tol: 0.001, sol: r`$2000 = 1000e^{3k}$, so $k = \dfrac{\log 2}{3}$ and $0.693147 \div 3 = 0.231049$, i.e. about $0.231$.`, scheme: [['0.231', 1]], d: 2, c: 'application', t: [2], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** How many bacteria will there be after $9$ hours?', model: r`$N = 1000e^{kt}$ with $e^{3k} = 2$. Then $N(9) = 1000\left(e^{3k}\right)^3 = 1000 \times 8 = 8000$.`, sol: 'Use powers of the doubling factor.', scheme: [[r`$N(9) = 1000(e^{3k})^3$`, 1], ['8000', 1]], d: 2, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** After how many hours will there be $16000$ bacteria?', model: r`$16000 = 1000e^{kt}$ gives $e^{kt} = 16 = 2^4 = \left(e^{3k}\right)^4$. So $kt = 12k$ and $t = 12$ hours.`, sol: 'Write 16 as a power of the doubling factor.', scheme: [[r`$e^{kt} = 16$`, 1], ['12 hours', 1]], d: 2, c: 'application', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { const k = ln(2) / 3; const N = (t) => rk4((s, n) => k * n, 0, 1000, t); C.child('a').assert(solves((t, n, n1) => n1 - k * n, (t) => 1000 * Math.exp(k * t), grid(0, 5), 1e-2), 'N solves'); C.child('a').key('a'); C.child('b').val(k, 0.001); C.child('c').model([R4(N(9))]); C.child('cii').assert(near(N(12), 16000, 1e-6), 'N(12) = 16000'); C.child('cii').model([12]); });

caseQ('c02', {
  passage: r`At a tea stall in Delhi, a cup of chai is poured at $85$ °C into a room at $25$ °C. Its temperature $T$ (°C) after $t$ minutes follows $\dfrac{dT}{dt} = -k(T - 25)$ with $k > 0$. After $4$ minutes the chai is at $55$ °C.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): order $1$, degree $1$. (b) $40$ °C. (c) (i) $t = 12$ minutes. Or (ii) about $-5.2$ °C per minute.`,
  sol: r`$T = 25 + 60e^{-kt}$ with $e^{-4k} = \dfrac12$. (b) $T(8) = 25 + 60 \times \dfrac14$. (c) (i) $\dfrac{7.5}{60} = \dfrac18$, three halvings. (ii) $\dfrac{dT}{dt} = -k(30)$ with $k = \dfrac{\log 2}{4}$.`,
  children: [
    child('a', mk.mcq({ stem: 'The order and degree of the given differential equation are', opts: ['order $1$, degree $1$', 'order $1$, degree $2$', 'order $2$, degree $1$', 'order $1$, degree not defined'], key: 'a', sol: r`Only $\dfrac{dT}{dt}$ appears, to the first power: order $1$, degree $1$.`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the temperature (in °C) of the chai after $8$ minutes.', value: 40, unit: '°C', sol: r`$T - 25 = 60e^{-kt}$ and $e^{-4k} = \dfrac{30}{60} = \dfrac12$. So $T(8) = 25 + 60 \times \dfrac14 = 40$.`, scheme: [['40', 1]], d: 2, c: 'application', t: [2], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** After how many minutes will the chai be at $32.5$ °C?', model: r`$32.5 - 25 = 7.5$ and $\dfrac{7.5}{60} = \dfrac18 = \left(\dfrac12\right)^3$. Since the excess over $25$ °C halves every $4$ minutes, $t = 3 \times 4 = 12$ minutes.`, sol: 'Count halvings of the excess temperature.', scheme: [[r`$e^{-kt} = \dfrac18$`, 1], ['12 minutes', 1]], d: 3, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the rate at which the chai is cooling when its temperature is $55$ °C (to one decimal place).', model: r`From $e^{-4k} = \dfrac12$, $k = \dfrac{\log 2}{4}$. At $T = 55$: $\dfrac{dT}{dt} = -\dfrac{\log 2}{4} \times 30 \approx -0.1733 \times 30 \approx -5.2$ °C per minute, i.e. it cools at about $5.2$ °C per minute.`, sol: 'Find k, then substitute T = 55 into the equation.', scheme: [[r`$k = \dfrac{\log 2}{4}$`, 1], ['about 5.2 °C per minute', 1]], d: 3, c: 'application', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { const k = ln(2) / 4; const T = (t) => rk4((s, u) => -k * (u - 25), 0, 85, t); C.child('a').key('a'); C.assert(near(T(4), 55), 'T(4) = 55'); C.child('b').val(R4(T(8)), 1e-3); C.child('c').assert(near(T(12), 32.5), 'T(12) = 32.5'); C.child('c').model([12]); C.child('cii').model([Math.round(k * 30 * 10) / 10]); });

caseQ('c03', {
  passage: r`Kavya deposits ₹$50000$ in a savings scheme in Chennai that compounds continuously at $6\%$ a year, so the amount $A$ (₹) after $t$ years satisfies $\dfrac{dA}{dt} = 0.06A$.`,
  d: 3, c: 'application',
  model: r`(a) Option (a). (b) About ₹$91106$. (c) (i) About $11.55$ years. Or (ii) $A = Ce^{0.06t} - 100000$.`,
  sol: r`$A = 50000e^{0.06t}$. (b) $t = 10$. (c) (i) $e^{0.06t} = 2$. (ii) Linear with integrating factor $e^{-0.06t}$.`,
  children: [
    child('a', mk.mcq({ stem: 'The equation $\\dfrac{dA}{dt} = 0.06A$ is best solved', opts: ['by separating the variables', 'by the substitution $A = vt$, as a homogeneous equation', 'only after finding its degree, which is $2$', 'only after differentiating it again, as its order is $2$'], key: 'a', sol: r`$\dfrac{dA}{A} = 0.06\,dt$ separates at once. Its order and degree are both $1$.`, d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: 'Find the amount (in ₹, to the nearest rupee) after $10$ years.', value: 91106, tol: 1, unit: '₹', sol: r`$A = 50000e^{0.06t}$, so $A(10) = 50000e^{0.6}$ and $50000 \times 1.8221188 = 91105.94$, i.e. about ₹$91106$.`, scheme: [['₹91106', 1]], d: 2, c: 'application', t: [2], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** In how many years will her money double? Give the answer to two decimal places.', model: r`$2 \times 50000 = 50000e^{0.06t}$, so $e^{0.06t} = 2$ and $t = \dfrac{\log 2}{0.06} \approx \dfrac{0.693147}{0.06} \approx 11.55$ years.`, sol: 'Set A = 100000 and take logarithms.', scheme: [[r`$e^{0.06t} = 2$`, 1], ['about 11.55 years', 1]], d: 2, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** If she also adds money continuously at ₹$6000$ a year, $\\dfrac{dA}{dt} = 0.06A + 6000$. Find the integrating factor and the general solution.', model: r`Write it as $\dfrac{dA}{dt} - 0.06A = 6000$: integrating factor $e^{-0.06t}$. Then $\dfrac{d}{dt}\left(Ae^{-0.06t}\right) = 6000e^{-0.06t}$, so $Ae^{-0.06t} = -100000e^{-0.06t} + C$, i.e. $A = Ce^{0.06t} - 100000$.`, sol: 'Linear in A with constant P.', scheme: [[r`Integrating factor $e^{-0.06t}$`, 1], [r`$A = Ce^{0.06t} - 100000$`, 1]], d: 3, c: 'application', t: [4], time: 150 }),
    ]),
  ],
}, (C) => { const A = (t) => rk4((s, a) => 0.06 * a, 0, 50000, t); C.child('a').key('a'); C.child('b').val(A(10), 1); C.child('c').assert(near(A(11.55), 100000, 1e-3), 'doubles near 11.55'); C.child('c').model([Math.round((ln(2) / 0.06) * 100) / 100]); C.child('cii').assert(isIF((t) => Math.exp(-0.06 * t), () => -0.06, grid(0, 5)) && [1, 3e5].every((c) => solves((t, a, a1) => a1 - 0.06 * a - 6000, (t) => c * Math.exp(0.06 * t) - 100000, grid(0, 3), 1e-2)), 'IF and family'); C.child('cii').model([100000]); });

caseQ('c04', {
  passage: r`A patient in a Kochi hospital receives a drug through a drip. The concentration $C$ (mg/L) of the drug in the blood after $t$ hours satisfies $\dfrac{dC}{dt} + 0.5C = 2$, with $C = 0$ when $t = 0$.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $e^{0.5t}$. (b) $4$ mg/L. (c) (i) $C = 4(1 - e^{-0.5t})$. Or (ii) $t = 4\log 2 \approx 2.77$ hours.`,
  sol: r`Linear with $P = 0.5$. (b) $e^{-0.5t} \to 0$. (c) (i) Integrate. (ii) $e^{-0.5t} = \dfrac14$.`,
  children: [
    child('a', mk.mcq({ stem: 'The integrating factor of the equation is', opts: [r`$e^{0.5t}$`, r`$e^{-0.5t}$`, r`$e^{2t}$`, r`$0.5t$`], key: 'a', sol: r`$P = 0.5$, so the integrating factor is $e^{\int 0.5\,dt} = e^{0.5t}$.`, d: 1, c: 'understanding', t: [4], time: 45 })),
    child('b', mk.num({ stem: 'What concentration (in mg/L) does the drug level approach after a long time?', value: 4, unit: 'mg/L', sol: r`As $t$ grows, $C = 4(1 - e^{-0.5t})$ approaches $4$; equivalently, $\dfrac{dC}{dt} = 0$ when $0.5C = 2$, i.e. $C = 4$.`, scheme: [['4', 1]], d: 3, c: 'analysis', t: [4], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Solve the equation to find $C$ in terms of $t$.', model: r`$\dfrac{d}{dt}\left(Ce^{0.5t}\right) = 2e^{0.5t}$, so $Ce^{0.5t} = 4e^{0.5t} + K$. At $t = 0$, $C = 0$: $K = -4$. So $C = 4(1 - e^{-0.5t})$.`, sol: 'Integrating factor, integrate, use C(0) = 0.', scheme: [['Integration with integrating factor', 1], [r`$C = 4(1 - e^{-0.5t})$`, 1]], d: 2, c: 'application', t: [4], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** After how many hours does the concentration reach $3$ mg/L? (Give the answer to two decimal places.)', model: r`$3 = 4(1 - e^{-0.5t})$ gives $e^{-0.5t} = \dfrac14$, so $0.5t = \log 4$ and $t = 2\log 4 = 4\log 2 \approx 2.77$ hours.`, sol: 'Use the solution C = 4(1 − e^{−0.5t}).', scheme: [[r`$e^{-0.5t} = \dfrac14$`, 1], ['about 2.77 hours', 1]], d: 3, c: 'application', t: [4], time: 120 }),
    ]),
  ],
}, (C) => { const Cf = (t) => rk4((s, c) => 2 - 0.5 * c, 0, 0, t); C.child('a').assert(isIF((t) => Math.exp(0.5 * t), () => 0.5, grid(0, 4)), 'IF'); C.child('a').key('a'); C.child('b').val(R4(Cf(60)), 1e-3); C.child('c').assert(solves((t, c, c1) => c1 + 0.5 * c - 2, (t) => 4 * (1 - Math.exp(-0.5 * t)), grid(0, 6)), 'solves'); C.child('c').model([4]); C.child('cii').assert(near(Cf(4 * ln(2)), 3), 'C = 3 at 4 log 2'); C.child('cii').model([Math.round(4 * ln(2) * 100) / 100]); });

caseQ('c05', {
  passage: r`A designer at a studio in Ahmedabad wants a decorative curve on a wall panel. At every point $(x, y)$ of the curve, with $x, y > 0$, its slope must be $\dfrac{dy}{dx} = \dfrac{x^2 + y^2}{2xy}$, and the curve must pass through the point $(2, 1)$.`,
  d: 4, c: 'analysis',
  model: r`(a) Option (a): homogeneous. (b) $0$. (c) (i) $x^2 - y^2 = Ax$. Or (ii) $2x^2 - 2y^2 = 3x$.`,
  sol: r`(a) Degree-zero right side. (b) $F(\lambda x, \lambda y) = \lambda^0F$. (c) $y = vx$ separates to $\dfrac{2v\,dv}{1 - v^2} = \dfrac{dx}{x}$; then use $(2, 1)$.`,
  children: [
    child('a', mk.mcq({ stem: 'The given differential equation is', opts: ['homogeneous', 'linear in $y$', 'of order $2$', 'of degree not defined'], key: 'a', sol: r`The right side is unchanged by $x \to \lambda x$, $y \to \lambda y$, so it is homogeneous. It has $y^2$ on top, so it is not linear; its order and degree are $1$.`, d: 2, c: 'understanding', t: [3], time: 60 })),
    child('b', mk.num({ stem: r`The right side $F(x, y) = \dfrac{x^2 + y^2}{2xy}$ is a homogeneous function. Of what degree?`, value: 0, sol: r`$F(\lambda x, \lambda y) = \dfrac{\lambda^2(x^2 + y^2)}{2\lambda^2xy} = \lambda^0F(x, y)$, so the degree is $0$.`, scheme: [['0', 1]], d: 2, c: 'understanding', t: [3], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Using $y = vx$, show that the general solution is $x^2 - y^2 = Ax$.', model: r`$v + x\dfrac{dv}{dx} = \dfrac{1 + v^2}{2v}$, so $x\dfrac{dv}{dx} = \dfrac{1 - v^2}{2v}$ and $\dfrac{2v\,dv}{1 - v^2} = \dfrac{dx}{x}$. Integrating, $-\log|1 - v^2| = \log x - \log A$, so $x(1 - v^2) = A$, i.e. $x^2 - y^2 = Ax$.`, sol: 'Substitute, separate, integrate.', scheme: [['Separated equation in v', 1], [r`$x^2 - y^2 = Ax$`, 1]], d: 4, c: 'analysis', t: [3], time: 180 }), [
      mk.short({ marks: 2, stem: '**(ii)** Taking the general solution as $x^2 - y^2 = Ax$, find the equation of the designer\'s curve and check that its slope at $(2, 1)$ is as required.', model: r`At $(2, 1)$: $4 - 1 = 2A$, so $A = \dfrac32$ and the curve is $2x^2 - 2y^2 = 3x$. Differentiating, $4x - 4y\dfrac{dy}{dx} = 3$, so at $(2, 1)$, $\dfrac{dy}{dx} = \dfrac{8 - 3}{4} = \dfrac{5}{4}$. The rule gives $\dfrac{4 + 1}{4} = \dfrac{5}{4}$ ✓.`, sol: 'Substitute the point, then compare slopes.', scheme: [[r`$2x^2 - 2y^2 = 3x$`, 1], ['Slope check at (2, 1)', 1]], d: 3, c: 'application', t: [3], time: 150 }),
    ]),
  ],
}, (C) => { const F = (x, y) => (x * x + y * y) / (2 * x * y); C.child('a').assert(homDegree(F) === 0, 'homogeneous'); C.child('a').key('a'); C.child('b').val(homDegree(F)); const g = (x) => Math.sqrt(x * x - 1.5 * x); C.child('c').assert(solves((x, y, y1) => y1 - F(x, y), g, grid(2, 4)), 'x² − y² = 1.5x solves'); C.child('cii').assert(near(g(2), 1) && near(D(g, 2), 1.25) && near(F(2, 1), 1.25), 'through (2, 1), slope 5/4'); C.child('cii').model([5 / 4]); });

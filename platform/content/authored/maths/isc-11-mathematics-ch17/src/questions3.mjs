// ISC 11 Mathematics ch17 Derivatives - short (3 marks) items. Every result is checked by central difference
// (h = 1e-5), by exact polynomial arithmetic, and (first principles) by the difference quotient against its simplified form.
import { Q, mk } from './lib.mjs';
import { E, ef, F, poly, derivOK, near, cd, fdq, isTangent, XS, XP, XT, XQ } from './calc.mjs';

const r = String.raw;
const S3 = (id, o, check) => Q(id, mk.short({ marks: 3, time: 200, ...o }), check);

S3('s301', { stem: r`A rail wagon is at the distance $s = t^3 + 2t$ metres from the depot after $t$ seconds. Find its average velocity from $t = 1$ to $t = 2$, and find its velocity at $t = 1$ as a limit.`, model: r`$s(1) = 3$ and $s(2) = 12$, so the average velocity is $\dfrac{12 - 3}{2 - 1} = 9$ m/s.
$s(1 + h) - s(1) = (1 + 3h + 3h^2 + h^3) + 2 + 2h - 3 = 5h + 3h^2 + h^3$, so the quotient is $5 + 3h + h^2$.
As $h \to 0$ this tends to $5$, so the velocity at $t = 1$ is $5$ m/s.`, sol: r`Average velocity is a quotient over a whole interval; the instantaneous velocity is its limit from $t = 1$.`, scheme: [['Average velocity $9$ m/s', 1], ['Quotient $5 + 3h + h^2$ from the expansion', 1], ['Limit $5$ m/s', 1]], d: 3, c: 'application', t: [1] }, (C) => {
  const s = (t) => t ** 3 + 2 * t;
  C.assert(s(1) === 3 && s(2) === 12 && [0.5, 0.1, 0.01, -0.1].every((h) => near((s(1 + h) - 3) / h, 5 + 3 * h + h * h, 1e-9)) && near(cd(s, 1), 5, 1e-6), 'average 9; the quotient from t = 1 equals 5 + 3h + h^2; velocity 5');
  C.model([9, 5, 3, 12]);
});
S3('s302', { stem: r`At which point of the curve $y = x^2 - 4x + 9$ is the tangent parallel to the line $y = 2x + 3$?`, model: r`The line has slope $2$. The slope of the curve is $\dfrac{dy}{dx} = 2x - 4$.
Setting $2x - 4 = 2$ gives $x = 3$.
Then $y = 9 - 12 + 9 = 6$, so the point is $(3, 6)$.`, sol: r`Equal slopes: put the derivative equal to $2$.`, scheme: [['Derivative $2x - 4$', 1], ['$2x - 4 = 2$ gives $x = 3$', 1], ['Point $(3, 6)$', 1]], d: 3, c: 'application', t: [1, 4] }, (C) => {
  const f = ef('x^2-4x+9');
  C.assert(near(cd(f, 3), 2, 1e-6) && f(3) === 6 && [1, 2, 4, 5].every((x) => !near(cd(f, x), 2, 1e-6)), 'the slope is 2 at x = 3 only (tested at 1, 2, 4, 5); f(3) = 6');
  C.model([3, 6, 2]);
});
S3('s303', { stem: r`Differentiate $\dfrac{1}{x^2}$ with respect to $x$ from first principles, for $x \ne 0$.`, model: r`$\dfrac{1}{h}\left[\dfrac{1}{(x + h)^2} - \dfrac{1}{x^2}\right] = \dfrac{x^2 - (x + h)^2}{h\,x^2(x + h)^2} = \dfrac{-2xh - h^2}{h\,x^2(x + h)^2} = -\dfrac{2x + h}{x^2(x + h)^2}$.
As $h \to 0$ this tends to $-\dfrac{2x}{x^4}$.
So $\dfrac{d}{dx}\left(\dfrac{1}{x^2}\right) = -\dfrac{2}{x^3}$.`, sol: r`Common denominator, expand $(x + h)^2$, cancel $h$.`, scheme: [['Common denominator and numerator $x^2 - (x + h)^2$', 1], ['Quotient $-\\dfrac{2x + h}{x^2(x + h)^2}$ after cancelling $h$', 1], ['Limit $-\\dfrac{2}{x^3}$', 1]], d: 3, c: 'application', t: [2] }, (C) => {
  const f = ef('1/x^2');
  C.assert(XS.filter((x) => Math.abs(x) > 0.5).every((x) => [0.1, 0.01, -0.05].every((h) => near((f(x + h) - f(x)) / h, E('-(2x+h)/(x^2(x+h)^2)').g({ x, h }), 1e-9))) && derivOK(f, ef('-2/x^3'), XS.filter((x) => Math.abs(x) > 0.5)), 'the quotient equals -(2x + h)/(x^2 (x + h)^2) exactly; the limit -2/x^3 is the derivative');
  C.model([2, 3]);
});
S3('s304', { stem: r`Find the derivative of $\sqrt{x + 4}$ for $x > -4$ using the definition.`, model: r`$\dfrac{\sqrt{x + h + 4} - \sqrt{x + 4}}{h} \times \dfrac{\sqrt{x + h + 4} + \sqrt{x + 4}}{\sqrt{x + h + 4} + \sqrt{x + 4}} = \dfrac{(x + h + 4) - (x + 4)}{h\left(\sqrt{x + h + 4} + \sqrt{x + 4}\right)}$.
Cancelling $h$ gives $\dfrac{1}{\sqrt{x + h + 4} + \sqrt{x + 4}}$.
As $h \to 0$ the derivative is $\dfrac{1}{2\sqrt{x + 4}}$.`, sol: r`Multiply the numerator and denominator by the conjugate, then cancel $h$.`, scheme: [['Multiplies by the conjugate', 1], ['Quotient $\\dfrac{1}{\\sqrt{x + h + 4} + \\sqrt{x + 4}}$', 1], ['Limit $\\dfrac{1}{2\\sqrt{x + 4}}$', 1]], d: 3, c: 'application', t: [2] }, (C) => {
  const f = ef('sqrt(x+4)'), xs = [-3.5, -1.2, 0.4, 2.2, 5.1];
  C.assert(xs.every((x) => [0.1, 0.01, -0.05].every((h) => near((f(x + h) - f(x)) / h, E('1/(sqrt(x+h+4)+sqrt(x+4))').g({ x, h }), 1e-9))) && derivOK(f, ef('1/(2sqrt(x+4))'), xs), 'the quotient equals 1/(sqrt(x + h + 4) + sqrt(x + 4)) exactly; the limit is the derivative');
  C.model([4, 2]);
});
S3('s305', { stem: r`Prove from first principles that $\dfrac{d}{dx}(\cos 3x) = -3\sin 3x$, using $\lim_{h \to 0}\dfrac{\sin h}{h} = 1$.`, model: r`$\cos(3x + 3h) - \cos 3x = -2\sin\left(3x + \dfrac{3h}{2}\right)\sin\dfrac{3h}{2}$.
So the quotient is $-3\sin\left(3x + \dfrac{3h}{2}\right)\cdot\dfrac{\sin(3h/2)}{3h/2}$.
As $h \to 0$, $\sin\left(3x + \dfrac{3h}{2}\right) \to \sin 3x$ and $\dfrac{\sin(3h/2)}{3h/2} \to 1$, so the derivative is $-3\sin 3x$.`, sol: r`Turn the difference of cosines into a product, then use the standard limit.`, scheme: [['Difference of cosines as $-2\\sin(\\cdot)\\sin(\\cdot)$', 1], ['Quotient arranged with $\\dfrac{\\sin(3h/2)}{3h/2}$', 1], ['Limit $-3\\sin 3x$', 1]], d: 4, c: 'analysis', t: [2] }, (C) => {
  const f = ef('cos(3x)');
  C.assert(XS.every((x) => [0.3, 0.05, -0.2].every((h) => near((f(x + h) - f(x)) / h, E('-3sin(3x+1.5h)sin(1.5h)/(1.5h)').g({ x, h }), 1e-9))) && derivOK(f, ef('-3sin(3x)')), 'the quotient equals -3 sin(3x + 3h/2) sin(3h/2)/(3h/2) exactly; the derivative is -3 sin 3x');
  C.model([3, 2]);
});
S3('s306', { stem: r`Obtain the derivative of $x^2\sin x - 2x\cos x$, writing it as one expression in $\sin x$ and $\cos x$.`, model: r`$\dfrac{d}{dx}(x^2\sin x) = 2x\sin x + x^2\cos x$ and $\dfrac{d}{dx}(2x\cos x) = 2\cos x - 2x\sin x$.
Subtracting: $2x\sin x + x^2\cos x - 2\cos x + 2x\sin x$.
Collecting, the derivative is $4x\sin x + (x^2 - 2)\cos x$.`, sol: r`Product rule on each term, then combine like terms.`, scheme: [['Product rule on $x^2\\sin x$', 1], ['Product rule on $2x\\cos x$ with the sign of the subtraction', 1], ['Collected result $4x\\sin x + (x^2 - 2)\\cos x$', 1]], d: 3, c: 'application', t: [3] }, (C) => {
  C.assert(derivOK(ef('x^2sin(x) - 2x cos(x)'), ef('4x sin(x) + (x^2-2)cos(x)')), 'matches a central difference at 7 points');
  C.model([4, 2]);
});
S3('s307', { stem: r`Find $\dfrac{dy}{dx}$ when $y = \dfrac{x^2 + 1}{x^2 - 1}$, for $x \ne \pm 1$.`, model: r`With $u = x^2 + 1$ and $v = x^2 - 1$, $u' = v' = 2x$.
$\dfrac{dy}{dx} = \dfrac{2x(x^2 - 1) - (x^2 + 1)(2x)}{(x^2 - 1)^2} = \dfrac{-4x}{(x^2 - 1)^2}$.`, sol: r`Both derivatives are $2x$, so the numerator is $2x$ times the difference of $v$ and $u$.`, scheme: [['$u\' = 2x$ and $v\' = 2x$', 1], ['Quotient rule written out', 1], ['Simplified $\\dfrac{-4x}{(x^2 - 1)^2}$', 1]], d: 3, c: 'application', t: [3] }, (C) => {
  const u = poly([1, 2], [1, 0]), v = poly([1, 2], [-1, 0]), xs = [-2.5, -0.4, 0.3, 1.6, 2.9];
  C.assert(u.d().mul(v).sub(u.mul(v.d())).eq(poly([-4, 1])) && derivOK(ef('(x^2+1)/(x^2-1)'), ef('-4x/(x^2-1)^2'), xs), 'exact numerator -4x; central difference confirms');
  C.model([4, 2]);
});
S3('s308', { stem: r`Differentiate $\dfrac{x}{1 + \cos x}$ with respect to $x$ where $1 + \cos x \ne 0$.`, model: r`With $u = x$ and $v = 1 + \cos x$: $u' = 1$ and $v' = -\sin x$.
$\dfrac{dy}{dx} = \dfrac{1(1 + \cos x) - x(-\sin x)}{(1 + \cos x)^2} = \dfrac{1 + \cos x + x\sin x}{(1 + \cos x)^2}$.`, sol: r`Mind the sign: $-uv'$ is $+x\sin x$.`, scheme: [['$u\' = 1$ and $v\' = -\\sin x$', 1], ['Quotient rule written out', 1], ['Numerator $1 + \\cos x + x\\sin x$', 1]], d: 3, c: 'application', t: [3, 4] }, (C) => {
  C.assert(derivOK(ef('x/(1+cos(x))'), ef('(1+cos(x)+x sin(x))/(1+cos(x))^2'), XQ), 'matches a central difference at 6 points');
  C.model([1]);
});
S3('s309', { stem: r`Differentiate $(x^2 + 3)\cot x$ at values of $x$ where $\cot x$ is defined.`, model: r`With $u = x^2 + 3$ and $v = \cot x$: $u' = 2x$ and $v' = -\operatorname{cosec}^2 x$.
$\dfrac{d}{dx}\left[(x^2 + 3)\cot x\right] = 2x\cot x + (x^2 + 3)\left(-\operatorname{cosec}^2 x\right) = 2x\cot x - (x^2 + 3)\operatorname{cosec}^2 x$.`, sol: r`Product rule with the standard derivative of $\cot x$.`, scheme: [['$u\' = 2x$', 1], ['$v\' = -\\operatorname{cosec}^2 x$', 1], ['Product rule assembled', 1]], d: 3, c: 'application', t: [4, 3] }, (C) => {
  C.assert(derivOK(ef('(x^2+3)cot(x)'), ef('2x cot(x) - (x^2+3)cosec(x)^2'), XT), 'matches a central difference on (0, pi/2)');
  C.model([2, 3]);
});
S3('s310', { stem: r`The graph of $y = x - 2\sin x$ has a tangent at its point with abscissa $\pi$. Write the equation of that tangent.`, model: r`At $x = \pi$: $y = \pi - 2\sin\pi = \pi$.
$\dfrac{dy}{dx} = 1 - 2\cos x$, which is $1 - 2(-1) = 3$ at $x = \pi$.
The tangent is $y - \pi = 3(x - \pi)$, that is $y = 3x - 2\pi$.`, sol: r`Point, slope, then point-slope form; keep $\pi$ exact.`, scheme: [['Point $(\\pi, \\pi)$', 1], ['Slope $3$', 1], ['Equation $y = 3x - 2\\pi$', 1]], d: 3, c: 'application', t: [4, 1] }, (C) => {
  const f = ef('x-2sin(x)'), a = Math.PI;
  C.assert(near(f(a), a, 1e-12) && near(cd(f, a), 3, 1e-6) && isTangent(f, a, '3x-2pi'), 'f(pi) = pi, slope 3, and y = 3x - 2 pi is the tangent');
  C.model([3, 2]);
});
S3('s311', { stem: r`The volume of a reservoir is $V = 4t^3 - 9t^2 + 6t$ thousand litres at $t$ hours. Find the rate of change of $V$ at $t = 2$, and the times at which the volume is momentarily not changing.`, model: r`$\dfrac{dV}{dt} = 12t^2 - 18t + 6$.
At $t = 2$: $48 - 36 + 6 = 18$ thousand litres per hour.
Setting $12t^2 - 18t + 6 = 6(2t - 1)(t - 1) = 0$ gives $t = \dfrac{1}{2}$ and $t = 1$.`, sol: r`Differentiate once; the rate is zero where the factors vanish.`, scheme: [['$\\dfrac{dV}{dt} = 12t^2 - 18t + 6$', 1], ['Rate $18$ at $t = 2$', 1], ['Zero rate at $t = \\dfrac{1}{2}$ and $t = 1$', 1]], d: 3, c: 'application', t: [4] }, (C) => {
  const p = poly([4, 3], [-9, 2], [6, 1]), dp = p.d();
  C.assert(dp.eq(poly([12, 2], [-18, 1], [6, 0])) && dp.at(2).eq(18) && dp.at(F(1, 2)).isZero() && dp.at(1).isZero() && derivOK(p.fn(), dp.fn()) && poly([6, 0]).mul(poly([2, 1], [-1, 0])).mul(poly([1, 1], [-1, 0])).eq(dp), 'exact: V\' = 12t^2 - 18t + 6 = 6(2t - 1)(t - 1) is 18 at t = 2 and vanishes at 1/2 and 1');
  C.model([18, 12, 6]);
});

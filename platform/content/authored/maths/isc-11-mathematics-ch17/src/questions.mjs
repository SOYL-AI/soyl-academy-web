// ISC 11 Mathematics ch17 Derivatives - multiple-choice and assertion-reason items.
// Every key is recomputed: option expressions are parsed (calc.mjs E) so the printed text IS the function tested, and each
// option is compared with the derivative by central difference (h = 1e-5) at several points; exactly one option may match.
// Each distractor comes from its own named wrong method.
import { Q, mk } from './lib.mjs';
import { E, ef, F, poly, derivOK, near, cd, fdq, whichDeriv, whichDQ, allDistinct, isTangent, XS, XP, XT, XQ, range } from './calc.mjs';

const r = String.raw;
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const T = (s) => E(s).T;
const Tx = (s) => E(s).tex;
const only0 = (idx) => idx.length === 1 && idx[0] === 0;

// ============================================================ MCQ
{
  const s = (t) => t * t + 5 * t, avg = (s(3) - s(1)) / 2, o = ['$9$ m/s', '$18$ m/s', '$11$ m/s', '$7$ m/s'];
  M('m01', { stem: r`A hand-cart rolls along a straight track and its distance from the start after $t$ seconds is $s = t^2 + 5t$ metres. Its average velocity between $t = 1$ and $t = 3$ is`, opts: o, sol: r`The average velocity is the change in distance divided by the time taken: $\dfrac{s(3) - s(1)}{3 - 1} = \dfrac{24 - 6}{2} = 9$ m/s. The value $18$ m/s is the change in distance $24 - 6$ left undivided; $11$ m/s is the instantaneous velocity $2t + 5$ at $t = 3$; $7$ m/s is the instantaneous velocity at $t = 1$.`, d: 1, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(s(3) === 24 && s(1) === 6 && avg === 9 && Math.round(cd(s, 3)) === 11 && Math.round(cd(s, 1)) === 7, 'average velocity 9; 18 is the unscaled change; 11 and 7 are the velocities at t = 3 and t = 1 by central difference');
    C.which([9, 18, 11, 7], avg);
  });
}
{
  const f = (x) => 3 * x * x, o = ['12 + 3h', '4 + h', '3h', '12 + 3h^2'];
  M('m02', { stem: r`For $f(x) = 3x^2$, the difference quotient $\dfrac{f(2 + h) - f(2)}{h}$ simplifies, for $h \ne 0$, to`, opts: o.map(T), sol: r`$f(2 + h) - f(2) = 3(4 + 4h + h^2) - 12 = 12h + 3h^2$, and dividing by $h$ gives $12 + 3h$. The option ${T(o[1])} leaves out the factor $3$; ${T(o[2])} treats $(2 + h)^2$ as $4 + h^2$ and so loses the term $4h$; ${T(o[3])} divides only the first term by $h$.`, d: 2, c: 'understanding', t: [2], time: 70 }, (C) => {
    C.assert(only0(whichDQ(f, o, [2])) && new Set(o).size === 4, 'only 12 + 3h equals (f(2 + h) - f(2))/h at five values of h');
    C.assert([0.5, 0.2, 0.1, -0.3].every((h) => near((f(2 + h) - f(2)) / h, 12 + 3 * h, 1e-9)), 'at x = 2 the quotient is 12 + 3h');
  });
}
{
  const s = (t) => 2 * t ** 3 + t, v = (t) => 6 * t * t + 1, o = ['$25$ cm/s', '$18$ cm/s', '$13$ cm/s', '$24$ cm/s'];
  M('m03', { stem: r`A bead slides along a wire so that its distance from one end after $t$ seconds is $s = 2t^3 + t$ centimetres. Its velocity at $t = 2$ is`, opts: o, sol: r`The velocity is $\dfrac{ds}{dt} = 6t^2 + 1$, which is $6(4) + 1 = 25$ cm/s at $t = 2$. The value $18$ cm/s is the distance $s(2) = 16 + 2$, not the velocity; $13$ cm/s uses $6t + 1$; $24$ cm/s forgets that $t$ has derivative $1$.`, d: 2, c: 'understanding', t: [1, 4], time: 70 }, (C) => {
    C.assert(derivOK(s, v) && v(2) === 25 && s(2) === 18 && 6 * 2 + 1 === 13 && 6 * 4 === 24 && near(cd(s, 2), 25, 1e-6), 's\' = 6t^2 + 1 checked by central difference; 18, 13, 24 are s(2), 6t + 1 and 6t^2');
    C.which([25, 18, 13, 24], v(2));
  });
}
{
  const f = ef('x^2-3x+5'), o = ['x + 1', '4x - 5', 'x + 3', '-x + 5'], L = (e) => `$y = ${Tx(e)}$`;
  M('m04', { stem: r`The curve $y = x^2 - 3x + 5$ passes through $(2, 3)$. The tangent to the curve at this point is the line`, opts: o.map(L), sol: r`$\dfrac{dy}{dx} = 2x - 3$, which is $1$ at $x = 2$. The tangent is $y - 3 = 1(x - 2)$, that is $y = x + 1$. The line ${L(o[1])} uses the slope $2x = 4$ and forgets $-3$; ${L(o[2])} keeps the slope but takes the constant as $f(2) = 3$; ${L(o[3])} has the slope of the perpendicular.`, d: 3, c: 'application', t: [1], time: 90 }, (C) => {
    const ok = o.map((s) => isTangent(f, 2, s));
    C.assert(ok.join() === 'true,false,false,false' && f(2) === 3 && near(cd(f, 2), 1, 1e-6), 'only y = x + 1 passes through (2, 3) with slope f\'(2) = 1; 4x - 5 has slope 4, x + 3 misses the point, -x + 5 has slope -1');
  });
}
{
  const f = ef('x^4'), o = ['4x^3 + 6x^2h + 4xh^2 + h^3', '4x^3 + 6x^2h + 4xh^2 + h^4', '4x^3 + 4x^2h + 4xh^2 + h^3', 'x^3 + 3x^2h + 3xh^2 + h^3'];
  M('m05', { stem: r`In differentiating $x^4$ from the definition, the quotient $\dfrac{(x + h)^4 - x^4}{h}$ is simplified, for $h \ne 0$, to`, opts: o.map(T), sol: r`$(x + h)^4 = x^4 + 4x^3h + 6x^2h^2 + 4xh^3 + h^4$, so the numerator is $4x^3h + 6x^2h^2 + 4xh^3 + h^4$ and dividing by $h$ gives $4x^3 + 6x^2h + 4xh^2 + h^3$. The option ${T(o[1])} leaves the last term as $h^4$; ${T(o[2])} uses the coefficients $4, 4, 4$ instead of $4, 6, 4$; ${T(o[3])} is the quotient for $x^3$, not $x^4$.`, d: 2, c: 'understanding', t: [2], time: 80 }, (C) => {
    C.assert(only0(whichDQ(f, o)) && new Set(o).size === 4, 'only the first option equals (f(x + h) - f(x))/h at 15 pairs (x, h)');
    C.assert(near(((1 + 1e-6) ** 4 - 1) / 1e-6, 4, 1e-5), 'the limit at x = 1 is 4');
  });
}
{
  const f = ef('1/(x+5)'), o = ['-1/(x+5)^2', '1/(x+5)^2', '-1/(x+5)', '-1/x^2'];
  M('m06', { stem: r`Using the definition of the derivative, $\dfrac{d}{dx}\left(\dfrac{1}{x + 5}\right)$, for $x \ne -5$, is found to be`, opts: o.map(T), sol: r`$\dfrac{1}{h}\left[\dfrac{1}{x + h + 5} - \dfrac{1}{x + 5}\right] = \dfrac{1}{h} \cdot \dfrac{-h}{(x + h + 5)(x + 5)} = -\dfrac{1}{(x + h + 5)(x + 5)}$, which tends to $-\dfrac{1}{(x + 5)^2}$. The option ${T(o[1])} loses the sign from $(x + 5) - (x + h + 5) = -h$; ${T(o[2])} forgets to square; ${T(o[3])} is the derivative of $\dfrac{1}{x}$, ignoring the shift by $5$.`, d: 3, c: 'application', t: [2], time: 90 }, (C) => {
    C.assert(only0(whichDeriv(f, o, XS)) && allDistinct(o), 'only -1/(x + 5)^2 is the derivative of 1/(x + 5) (central difference at 7 points)');
    C.assert([-2.7, 0.6, 3.3].every((x) => near(fdq(f, x, 1e-7), ef(o[0])(x), 1e-4)), 'the forward quotient at h = 1e-7 agrees');
  });
}
{
  const f = ef('sin(3x)'), o = ['3cos(3x)', 'cos(3x)', '-3cos(3x)', '3sin(3x)'];
  M('m07', { stem: r`From first principles, $\dfrac{\sin(3x + 3h) - \sin 3x}{h}$ equals $3\cos\left(3x + \dfrac{3h}{2}\right)\dfrac{\sin(3h/2)}{3h/2}$, so the derivative of $\sin 3x$ is`, opts: o.map(T), sol: r`As $h \to 0$, $\cos\left(3x + \dfrac{3h}{2}\right) \to \cos 3x$ and $\dfrac{\sin(3h/2)}{3h/2} \to 1$, so the derivative is $3\cos 3x$. The option ${T(o[1])} forgets the factor $3$ that comes from the argument $3h$; ${T(o[2])} has the wrong sign; ${T(o[3])} confuses sine and cosine.`, d: 3, c: 'application', t: [2], time: 80 }, (C) => {
    C.assert(only0(whichDeriv(f, o)) && allDistinct(o), 'only 3cos 3x is the derivative of sin 3x');
    C.assert(XS.every((x) => [0.3, 0.01].every((h) => near((f(x + h) - f(x)) / h, E('3cos(3x+1.5h)sin(1.5h)/(1.5h)').g({ x, h }), 1e-9))), 'the stated factorised quotient equals the difference quotient exactly');
  });
}
{
  const o = ['$\\dfrac{1}{4}$', '$\\dfrac{1}{8}$', '$2$', '$\\dfrac{1}{2}$'], lim = (Math.sqrt(4 + 1e-7) - 2) / 1e-7;
  M('m08', { stem: r`The limit $\lim_{x \to 4}\dfrac{\sqrt{x} - 2}{x - 4}$ is the derivative of $\sqrt{x}$ at $x = 4$. Its value is`, opts: o, sol: r`Multiplying by the conjugate, $\dfrac{\sqrt{x} - 2}{x - 4} = \dfrac{1}{\sqrt{x} + 2}$, which tends to $\dfrac{1}{4}$. The value $\dfrac{1}{8}$ comes from $\dfrac{1}{2x}$; $2$ is $\sqrt{4}$ itself; $\dfrac{1}{2}$ is $\dfrac{1}{\sqrt{x}}$.`, d: 3, c: 'application', t: [2], time: 80 }, (C) => {
    C.assert(near(lim, 0.25, 1e-6) && [3.9, 3.99, 4.01, 4.1].every((x) => near((Math.sqrt(x) - 2) / (x - 4), 1 / (Math.sqrt(x) + 2), 1e-12)) && derivOK(ef('sqrt(x)'), ef('1/(2sqrt(x))'), XP), 'the quotient equals 1/(sqrt x + 2) and tends to 0.25');
    C.which([1 / 4, 1 / 8, 2, 1 / 2], 0.25);
  });
}
{
  const u = poly([1, 2], [1, 0]), v = poly([1, 3], [-2, 1]), prod = u.mul(v), key = u.d().mul(v).add(u.mul(v.d())), w1 = u.d().mul(v.d()), w2 = u.d().mul(v).sub(u.mul(v.d())), w3 = poly([5, 4], [-3, 2], [-2, 1]);
  const o = [key, w1, w2, w3].map((p) => p.expr());
  M('m09', { stem: r`The function $y = (x^2 + 1)(x^3 - 2x)$ is differentiated by the product rule. The result, written as a polynomial, is`, opts: o.map(T), sol: r`With $u = x^2 + 1$ and $v = x^3 - 2x$: $u'v + uv' = 2x(x^3 - 2x) + (x^2 + 1)(3x^2 - 2) = 5x^4 - 3x^2 - 2$. The option ${T(o[1])} multiplies the two derivatives; ${T(o[2])} subtracts, as the quotient rule does; ${T(o[3])} writes the derivative of $-2x$ as $-2x$.`, d: 3, c: 'application', t: [3], time: 100 }, (C) => {
    C.assert(prod.eq(poly([1, 5], [-1, 3], [-2, 1])) && key.eq(prod.d()) && key.eq(poly([5, 4], [-3, 2], [-2, 0])) && derivOK(prod.fn(), key.fn()) && only0(whichDeriv(prod.fn(), o)) && allDistinct(o), 'exact: u\'v + uv\' equals the derivative of the expansion x^5 - x^3 - 2x; only the first option is the derivative');
  });
}
{
  const f = '(2x+1)/(x-3)', o = ['-7/(x-3)^2', '7/(x-3)^2', '2', '-7/(x-3)'];
  M('m10', { stem: r`For $x \ne 3$, differentiating $\dfrac{2x + 1}{x - 3}$ by the quotient rule gives`, opts: o.map(T), sol: r`With $u = 2x + 1$, $v = x - 3$: $\dfrac{u'v - uv'}{v^2} = \dfrac{2(x - 3) - (2x + 1)}{(x - 3)^2} = \dfrac{-7}{(x - 3)^2}$. The option ${T(o[1])} subtracts in the wrong order; ${T(o[2])} divides $u'$ by $v'$; ${T(o[3])} does not square the denominator.`, d: 3, c: 'application', t: [3], time: 90 }, (C) => {
    const u = poly([2, 1], [1, 0]), v = poly([1, 1], [-3, 0]);
    C.assert(u.d().mul(v).sub(u.mul(v.d())).eq(poly([-7, 0])) && only0(whichDeriv(ef(f), o)) && allDistinct(o), 'exact numerator u\'v - uv\' = -7; only the first option is the derivative at 7 points');
  });
}
{
  const f = ef('5sin(x)-2cos(x)+3x^2'), o = ['5cos(x) + 2sin(x) + 6x', '5cos(x) - 2sin(x) + 6x', '-5cos(x) + 2sin(x) + 6x', '5cos(x) + 2sin(x) + 3x'];
  M('m11', { stem: r`Differentiating $5\sin x - 2\cos x + 3x^2$ with respect to $x$ gives`, opts: o.map(T), sol: r`Term by term: $5\cos x - 2(-\sin x) + 6x = 5\cos x + 2\sin x + 6x$. The option ${T(o[1])} forgets that $\cos x$ has derivative $-\sin x$; ${T(o[2])} gives $\sin x$ the derivative $-\cos x$; ${T(o[3])} differentiates $3x^2$ as $3x$.`, d: 2, c: 'understanding', t: [4], time: 70 }, (C) => {
    C.assert(only0(whichDeriv(f, o)) && allDistinct(o), 'only the first option is the derivative (central difference at 7 points)');
  });
}
{
  const f = ef('tan(x)-cot(x)'), o = ['sec(x)^2 + cosec(x)^2', 'sec(x)^2 - cosec(x)^2', 'sec(x)tan(x) + cosec(x)cot(x)', 'cos(x)^2 + sin(x)^2'];
  M('m12', { stem: r`For $y = \tan x - \cot x$, at values of $x$ where both terms are defined, $\dfrac{dy}{dx}$ equals`, opts: o.map(T), sol: r`$\dfrac{d}{dx}(\tan x) = \sec^2 x$ and $\dfrac{d}{dx}(\cot x) = -\operatorname{cosec}^2 x$, so $\dfrac{dy}{dx} = \sec^2 x + \operatorname{cosec}^2 x$. The option ${T(o[1])} loses the minus sign of the cotangent derivative; ${T(o[2])} uses the derivatives of secant and cosecant; ${T(o[3])} inverts the two standard results.`, d: 2, c: 'understanding', t: [4], time: 70 }, (C) => {
    C.assert(only0(whichDeriv(f, o, XT)) && allDistinct(o, XT), 'only sec^2 x + cosec^2 x is the derivative on (0, pi/2) (central difference at 5 points)');
  });
}
{
  const f = ef('x sec(x)'), o = ['sec(x) + x sec(x)tan(x)', 'sec(x)tan(x)', 'sec(x) + x sec(x)^2', 'x sec(x)tan(x)'];
  M('m13', { stem: r`For $0 < x < \dfrac{\pi}{2}$, the derivative of $x\sec x$ is`, opts: o.map(T), sol: r`By the product rule with $u = x$ and $v = \sec x$: $1 \cdot \sec x + x \sec x\tan x$. The option ${T(o[1])} differentiates only $\sec x$; ${T(o[2])} gives $\sec x$ the derivative $\sec^2 x$; ${T(o[3])} omits the term $u'v$.`, d: 3, c: 'application', t: [4, 3], time: 80 }, (C) => {
    C.assert(only0(whichDeriv(f, o, XT)) && allDistinct(o, XT), 'only the first option is the derivative on (0, pi/2)');
  });
}
{
  const f = ef('sin(x)/(1+cos(x))'), o = ['1/(1+cos(x))', 'cos(x)/(1+cos(x))^2', '(cos(x)+cos(2x))/(1+cos(x))^2', '-cot(x)'];
  M('m14', { stem: r`The function $y = \dfrac{\sin x}{1 + \cos x}$ is defined for $x \ne \pi, 3\pi, \dots$. Its derivative simplifies to`, opts: o.map(T), sol: r`With $u = \sin x$, $v = 1 + \cos x$: the numerator is $\cos x(1 + \cos x) - \sin x(-\sin x) = \cos x + \cos^2 x + \sin^2 x = 1 + \cos x$, so $\dfrac{dy}{dx} = \dfrac{1 + \cos x}{(1 + \cos x)^2} = \dfrac{1}{1 + \cos x}$. The option ${T(o[1])} keeps only the term $u'v$; ${T(o[2])} adds $uv'$ instead of subtracting it; ${T(o[3])} divides $u'$ by $v'$.`, d: 4, c: 'application', t: [3, 4], time: 120 }, (C) => {
    C.assert(only0(whichDeriv(f, o, XQ)) && allDistinct(o, XQ), 'only 1/(1 + cos x) is the derivative at 6 points');
    C.assert(XQ.every((x) => near(Math.cos(x) + Math.cos(x) ** 2 + Math.sin(x) ** 2, 1 + Math.cos(x), 1e-12)), 'the numerator cos x + cos^2 x + sin^2 x equals 1 + cos x');
  });
}
{
  const p = poly([2, 3], [-9, 2], [12, 1], [-4, 0]), dp = p.d();
  const zeros = range(-20, 20).filter((k) => dp.at(F(k)).isZero());
  const o = ['$x = 1$ and $x = 2$', '$x = -1$ and $x = -2$', '$x = 0$ and $x = 3$', '$x = 1$ and $x = 3$'];
  M('m15', { stem: r`The tangent to the curve $y = 2x^3 - 9x^2 + 12x - 4$ is parallel to the $x$-axis at the points whose $x$-coordinates are`, opts: o, sol: r`The slope is $\dfrac{dy}{dx} = 6x^2 - 18x + 12 = 6(x - 1)(x - 2)$, which is zero at $x = 1$ and $x = 2$. The pair $-1, -2$ changes the signs of the roots; $0, 3$ are the roots of $x^2 - 3x$ with the constant $12$ forgotten; $1, 3$ come from reading $-18x \div 6$ as $-4x$.`, d: 3, c: 'application', t: [4], time: 100 }, (C) => {
    C.assert(dp.eq(poly([6, 2], [-18, 1], [12, 0])) && zeros.join() === '1,2' && derivOK(p.fn(), dp.fn()) && [-1, -2, 0, 3].every((k) => !dp.at(F(k)).isZero()), 'exact: the derivative 6x^2 - 18x + 12 vanishes at the integers 1 and 2 only (search -20..20); at -1, -2, 0 and 3 it does not');
  });
}
{
  const f = ef('x cos(x)'), df = ef('cos(x) - x sin(x)'), a = Math.PI / 2, o = ['$-\\dfrac{\\pi}{2}$', '$\\dfrac{\\pi}{2}$', '$-1$', '$0$'];
  M('m16', { stem: r`If $f(x) = x\cos x$, then $f'\!\left(\dfrac{\pi}{2}\right)$ equals`, opts: o, sol: r`$f'(x) = \cos x - x\sin x$, so $f'\!\left(\dfrac{\pi}{2}\right) = 0 - \dfrac{\pi}{2}(1) = -\dfrac{\pi}{2}$. The value $\dfrac{\pi}{2}$ uses $\cos x + x\sin x$; $-1$ multiplies the two derivatives, $1 \cdot (-\sin x)$; $0$ keeps only the term $u'v = \cos x$.`, d: 3, c: 'application', t: [4, 3], time: 90 }, (C) => {
    C.assert(derivOK(f, df) && near(df(a), -Math.PI / 2, 1e-12) && near(cd(f, a), -Math.PI / 2, 1e-9) && near(Math.cos(a), 0, 1e-12) && near(-Math.sin(a), -1, 1e-12) && near(Math.cos(a) + a * Math.sin(a), Math.PI / 2, 1e-12), 'f\'(pi/2) = -pi/2 by the formula and a central difference; the three wrong methods give pi/2, -1 and 0');
    C.which([-Math.PI / 2, Math.PI / 2, -1, 0], -Math.PI / 2);
  });
}
{
  const V = (t) => 300 + 40 * t - t * t, o = ['$30$ litres per minute', '$35$ litres per minute', '$40$ litres per minute', '$95$ litres per minute'];
  M('m17', { stem: r`A water tank holds $V = 300 + 40t - t^2$ litres, $t$ minutes after a valve is opened. At $t = 5$ the volume is changing at the rate of`, opts: o, sol: r`The rate of change is $\dfrac{dV}{dt} = 40 - 2t$, which is $40 - 10 = 30$ litres per minute at $t = 5$. The value $35$ uses $40 - t$; $40$ ignores the term $-t^2$; $95$ divides the volume $V(5) = 475$ by the time, $\dfrac{475}{5}$.`, d: 3, c: 'application', t: [4], time: 80 }, (C) => {
    C.assert(V(5) === 475 && 475 / 5 === 95 && Math.round(cd(V, 5)) === 30 && derivOK(V, (t) => 40 - 2 * t), 'V\' = 40 - 2t is 30 at t = 5 (central difference); 95 is V(5)/5');
    C.which([30, 35, 40, 95], 30);
  });
}
{
  const o = [r`$\lim_{h \to 0}\dfrac{s(a + h) - s(a)}{h}$`, r`$\dfrac{s(a + 1) - s(a)}{1}$, the change over one second`, r`$\lim_{h \to 0}\dfrac{s(a + h) + s(a)}{h}$`, r`$\lim_{h \to 0}\left[s(a + h) - s(a)\right]$`];
  const s = (t) => t * t + 3 * t, a = 2;
  M('m18', { stem: r`A body moves along a line with distance $s(t)$ from a fixed point. Its instantaneous velocity at the time $t = a$ is defined as`, opts: o, sol: r`The instantaneous velocity is the limit of the average velocities over $[a, a + h]$ as $h \to 0$, that is $\lim_{h \to 0}\dfrac{s(a + h) - s(a)}{h}$. The quotient over one second is only the average velocity over a whole second; the expression with $s(a + h) + s(a)$ adds instead of subtracting, so it does not even settle; and $\lim_{h \to 0}\left[s(a + h) - s(a)\right]$ has no division by $h$ and always tends to $0$.`, d: 1, c: 'recall', t: [1], time: 50 }, (C) => {
    const h = 1e-6;
    C.assert(near((s(a + h) - s(a)) / h, 7, 1e-5) && s(a + 1) - s(a) === 8 && (s(a + h) + s(a)) / h > 1e6 && Math.abs(s(a + h) - s(a)) < 1e-5, 'for s = t^2 + 3t at a = 2: the first expression tends to 7 (the velocity), the second is 8, the third is huge, the fourth is about 0');
  });
}
{
  const o = [r`$(x + h)^2$ was written as $x^2 + h^2$, leaving out the term $2xh$`, r`the limit should have been taken as $h \to \infty$`, r`the quotient should have been divided by $x$ and not by $h$`, r`$f'(x)$ should be found by putting $h = 1$ before simplifying`];
  const f = (x) => x * x;
  M('m19', { stem: r`A student differentiates $f(x) = x^2$ from the definition by writing $\dfrac{(x + h)^2 - x^2}{h} = \dfrac{x^2 + h^2 - x^2}{h} = h$, and concludes that $f'(x) = 0$. The mistake in this working is that`, opts: o, sol: r`$(x + h)^2 = x^2 + 2xh + h^2$, not $x^2 + h^2$. The correct quotient is $\dfrac{2xh + h^2}{h} = 2x + h$, which tends to $2x$. Taking $h \to \infty$, dividing by $x$ or putting $h = 1$ is not what the definition says.`, d: 4, c: 'analysis', t: [2], time: 80 }, (C) => {
    C.assert(near((f(3 + 1e-6) - f(3)) / 1e-6, 6, 1e-5) && (3 + 0.1) ** 2 !== 9 + 0.01 && near(((3 + 0.1) ** 2 - 9) / 0.1, 6 + 0.1, 1e-9), 'at x = 3 the true quotient is 6 + h (6.1 at h = 0.1), not h; so the stated limit 0 is wrong and the true derivative is 2x = 6');
  });
}
{
  const u = poly([1, 2]), v = poly([1, 3]), uv = u.mul(v).d(), uvp = u.d().mul(v.d()), diff = uv.sub(uvp);
  const o = [r`$x = 0$ or $x = \dfrac{6}{5}$`, r`every real value of $x$`, r`$x = 0$ or $x = \dfrac{5}{6}$`, r`$x = 1$ only`];
  M('m20', { stem: r`Let $u = x^2$ and $v = x^3$. The derivative of the product $uv$ equals the product $u'v'$ of the two derivatives exactly when`, opts: o, sol: r`$(uv)' = (x^5)' = 5x^4$ and $u'v' = 2x \cdot 3x^2 = 6x^3$. Equating, $5x^4 - 6x^3 = x^3(5x - 6) = 0$, so $x = 0$ or $x = \dfrac{6}{5}$. The product of derivatives is therefore not the derivative of the product in general.`, d: 4, c: 'analysis', t: [3], time: 100 }, (C) => {
    C.assert(uv.eq(poly([5, 4])) && uvp.eq(poly([6, 3])) && diff.eq(poly([5, 4], [-6, 3])) && [F(0), F(6, 5)].every((x) => diff.at(x).isZero()) && [F(5, 6), F(1), F(2), F(-1)].every((x) => !diff.at(x).isZero()), 'exact: 5x^4 - 6x^3 vanishes at 0 and 6/5 only among 0, 6/5, 5/6, 1, 2, -1');
  });
}

// ============================================================ assertion-reason
const AR = (id, o, check) => Q(id, mk.ar(o), check);
AR('ar1', { a: r`The derivative of $x^2\sin x$ is $2x\sin x + x^2\cos x$.`, r: r`The derivative of a product $uv$ is $u'v + uv'$.`, key: 'a', sol: r`With $u = x^2$ and $v = \sin x$, $u'v + uv' = 2x\sin x + x^2\cos x$, so A is true. R is the product rule, which is exactly the reason A holds.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
  C.assert(derivOK(ef('x^2sin(x)'), ef('2x sin(x) + x^2cos(x)')) && derivOK(ef('x^3sin(x)'), ef('3x^2sin(x) + x^3cos(x)')), 'A is true by central difference at 7 points; R is the product rule, checked on another product too');
  C.key('a');
});
AR('ar2', { a: r`For $x \ne -1$, $\dfrac{d}{dx}\left(\dfrac{x}{x + 1}\right) = \dfrac{1}{(x + 1)^2}$.`, r: r`The derivative of $\dfrac{u}{v}$ is $\dfrac{u'v - uv'}{v^2}$ wherever $v \ne 0$.`, key: 'a', sol: r`With $u = x$ and $v = x + 1$: $\dfrac{1(x + 1) - x(1)}{(x + 1)^2} = \dfrac{1}{(x + 1)^2}$, so A is true. R is the quotient rule used to get it, so R explains A.`, d: 3, c: 'application', t: [3], time: 80 }, (C) => {
  C.assert(derivOK(ef('x/(x+1)'), ef('1/(x+1)^2'), XS.filter((x) => Math.abs(x + 1) > 0.1)) && derivOK(ef('x^2/(x+2)'), ef('(x^2+4x)/(x+2)^2'), XP), 'A is true by central difference; the quotient rule of R gives the same result and works on another quotient');
  C.key('a');
});
AR('ar3', { a: r`The tangent to $y = \tan x$ at the origin has slope $0$.`, r: r`$\dfrac{d}{dx}(\tan x) = \sec^2 x$.`, key: 'd', sol: r`R is a standard result, so R is true. At $x = 0$ the slope is $\sec^2 0 = 1$, not $0$, so A is false.`, d: 2, c: 'understanding', t: [4, 1], time: 70 }, (C) => {
  C.assert(near(cd(ef('tan(x)'), 0), 1, 1e-6) && derivOK(ef('tan(x)'), ef('sec(x)^2'), XT), 'the slope of tan x at 0 is 1 (central difference), so A is false; sec^2 is the derivative, so R is true');
  C.key('d');
});
AR('ar4', { a: r`A body with distance $s = t^2$ metres has velocity $2$ m/s at $t = 1$ s.`, r: r`The distance $t^2$ increases as $t$ increases for $t > 0$.`, key: 'b', sol: r`The velocity is $\dfrac{ds}{dt} = 2t = 2$ at $t = 1$, so A is true. R is also true, but it only says that the distance grows; it does not give the value $2$, so it is not the explanation of A.`, d: 2, c: 'understanding', t: [1], time: 70 }, (C) => {
  const s = (t) => t * t;
  C.assert(near(cd(s, 1), 2, 1e-6) && s(1.5) > s(1) && s(3) > s(1.5), 'velocity 2 at t = 1 by central difference, so A is true; t^2 increases on (0, 3), so R is true');
  C.key('b');
});
AR('ar5', { a: r`From first principles, $\dfrac{d}{dx}(\sin x) = \cos x$.`, r: r`$\dfrac{\cos h - 1}{h} \to 1$ as $h \to 0$.`, key: 'c', sol: r`The quotient is $\sin x \cdot \dfrac{\cos h - 1}{h} + \cos x \cdot \dfrac{\sin h}{h}$; the two limits are $0$ and $1$, so the derivative is $\cos x$ and A is true. R is false: $\dfrac{\cos h - 1}{h} \to 0$, for example $-0.005$ at $h = 0.01$.`, d: 4, c: 'analysis', t: [2], time: 90 }, (C) => {
  const h = 0.01;
  C.assert(derivOK(ef('sin(x)'), ef('cos(x)')) && near((Math.cos(h) - 1) / h, -0.005, 1e-3) && Math.abs((Math.cos(1e-5) - 1) / 1e-5) < 1e-4 && XS.every((x) => near(E('sin(x)cos(h)/h - sin(x)/h + cos(x)sin(h)/h').g({ x, h: 0.3 }), (Math.sin(x + 0.3) - Math.sin(x)) / 0.3, 1e-9)), 'A is true; (cos h - 1)/h is about -0.005 at h = 0.01 and tends to 0, so R is false; the split quotient equals the difference quotient');
  C.key('c');
});
AR('ar6', { a: r`The curve $y = x^3 + 2x$ has a horizontal tangent at some point.`, r: r`The slope of the tangent to $y = f(x)$ at $x = a$ is $f'(a)$.`, key: 'd', sol: r`R is true: it is the geometric meaning of the derivative. For A, $\dfrac{dy}{dx} = 3x^2 + 2 \ge 2 > 0$ for every $x$, so the slope is never $0$ and A is false.`, d: 3, c: 'understanding', t: [4, 1], time: 70 }, (C) => {
  const f = ef('x^3+2x'), df = ef('3x^2+2');
  C.assert(derivOK(f, df) && range(-400, 400).every((k) => df(k / 100) >= 2), 'the derivative 3x^2 + 2 is at least 2 at 801 sample points in [-4, 4] and exactly 3x^2 + 2 > 0 always, so there is no horizontal tangent');
  C.key('d');
});

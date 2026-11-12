// ISC 11 Mathematics ch17 Derivatives - long (5 marks) items, set in labelled parts with [marks].
import { Q, mk } from './lib.mjs';
import { E, ef, F, poly, derivOK, near, cd, isTangent, XS, XT } from './calc.mjs';

const r = String.raw;
const L5 = (id, o, check) => Q(id, mk.long({ marks: 5, time: 360, ...o }), check);

L5('l01', { stem: r`A robot arm moves its tip along a rail so that its distance from the home position is $s = 2t^2 + 3t$ centimetres after $t$ seconds.
(a) Find the average velocity of the tip from $t = 2$ to $t = 4$. [1]
(b) Find its velocity at $t = 2$ by taking the limit of the difference quotient. [2]
(c) Write the equation of the tangent to the $s$-$t$ graph at $t = 2$. [1]
(d) At what time is the velocity equal to the average velocity found in (a)? [1]`, model: r`(a) $s(2) = 14$ and $s(4) = 44$, so the average velocity is $\dfrac{44 - 14}{2} = 15$ cm/s.
(b) $s(2 + h) - s(2) = 2(4 + 4h + h^2) + 6 + 3h - 14 = 11h + 2h^2$, so the quotient is $11 + 2h$. As $h \to 0$ the velocity at $t = 2$ is $11$ cm/s.
(c) The slope is $11$ and the point is $(2, 14)$: $s - 14 = 11(t - 2)$, that is $s = 11t - 8$.
(d) The velocity is $\dfrac{ds}{dt} = 4t + 3$. Setting $4t + 3 = 15$ gives $t = 3$ seconds.`, sol: r`Average velocity over an interval, then the limit of the quotient from $t = 2$, the tangent, and the equation $4t + 3 = 15$.`, scheme: [['(a) Average velocity $15$', 1], ['(b) Quotient $11 + 2h$', 1], ['(b) Limit $11$', 1], ['(c) Tangent $s = 11t - 8$', 1], ['(d) $4t + 3 = 15$, $t = 3$', 1]], d: 3, c: 'application', t: [1] }, (C) => {
  const s = (t) => 2 * t * t + 3 * t;
  C.assert(s(2) === 14 && s(4) === 44 && (s(4) - s(2)) / 2 === 15 && [0.5, 0.1, 0.01, -0.2].every((h) => near((s(2 + h) - 14) / h, 11 + 2 * h, 1e-9)) && near(cd(s, 2), 11, 1e-6) && isTangent(s, 2, '11x-8') && near(cd(s, 3), 15, 1e-6), 'average 15; quotient 11 + 2h; velocity 11; tangent s = 11t - 8; velocity 15 at t = 3 (central difference)');
  C.model([15, 11, 14, 8, 3]);
});
L5('l02', { stem: r`Let $f(x) = 2x^2 - 3x + 1$.
(a) Using the definition, find $f'(x)$. [3]
(b) Find the value of $f'(-1)$. [1]
(c) Find the point of the curve $y = f(x)$ at which the slope of the tangent is $5$. [1]`, model: r`(a) $f(x + h) - f(x) = 2(2xh + h^2) - 3h = 4xh + 2h^2 - 3h$, so the quotient is $4x + 2h - 3$. As $h \to 0$, $f'(x) = 4x - 3$.
(b) $f'(-1) = 4(-1) - 3 = -7$.
(c) Setting $4x - 3 = 5$ gives $x = 2$, and $f(2) = 8 - 6 + 1 = 3$. The point is $(2, 3)$.`, sol: r`Expand $f(x + h)$ once; the quotient has a factor $h$ to cancel.`, scheme: [['(a) $f(x + h) - f(x) = 4xh + 2h^2 - 3h$', 1], ['(a) Quotient $4x + 2h - 3$', 1], ['(a) Limit $f\'(x) = 4x - 3$', 1], ['(b) $f\'(-1) = -7$', 1], ['(c) $x = 2$ and the point $(2, 3)$', 1]], d: 3, c: 'application', t: [2, 1] }, (C) => {
  const f = ef('2x^2-3x+1');
  C.assert(XS.every((x) => [0.5, 0.1, -0.2].every((h) => near((f(x + h) - f(x)) / h, E('4x+2h-3').g({ x, h }), 1e-9))) && derivOK(f, ef('4x-3')) && near(cd(f, -1), -7, 1e-6) && f(2) === 3 && near(cd(f, 2), 5, 1e-6), 'the quotient equals 4x + 2h - 3 exactly; f\'(-1) = -7; the slope is 5 at (2, 3)');
  C.model([4, 3, 7, 2, 5]);
});
L5('l03', { stem: r`(a) Prove from first principles that $\dfrac{d}{dx}(\sin x) = \cos x$, using $\lim_{h \to 0}\dfrac{\sin h}{h} = 1$ and $\lim_{h \to 0}\dfrac{\cos h - 1}{h} = 0$. [3]
(b) Hence find all values of $x$ in $[0, 2\pi]$ at which the tangent to $y = \sin x$ has slope $\dfrac{1}{2}$. [2]`, model: r`(a) $\sin(x + h) = \sin x\cos h + \cos x\sin h$, so $\dfrac{\sin(x + h) - \sin x}{h} = \sin x \cdot \dfrac{\cos h - 1}{h} + \cos x \cdot \dfrac{\sin h}{h}$.
As $h \to 0$ the two limits are $0$ and $1$, so $\dfrac{d}{dx}(\sin x) = \sin x(0) + \cos x(1) = \cos x$.
(b) The slope is $\cos x$. Setting $\cos x = \dfrac{1}{2}$ in $[0, 2\pi]$ gives $x = \dfrac{\pi}{3}$ and $x = \dfrac{5\pi}{3}$.`, sol: r`Split the quotient into a sine part and a cosine part; the slope is the derivative.`, scheme: [['(a) Expands $\\sin(x + h)$', 1], ['(a) Splits the quotient into the two standard limits', 1], ['(a) Concludes $\\cos x$', 1], ['(b) $\\cos x = \\dfrac{1}{2}$', 1], ['(b) $x = \\dfrac{\\pi}{3}$ and $\\dfrac{5\\pi}{3}$', 1]], d: 4, c: 'analysis', t: [2, 4] }, (C) => {
  const hits = [];
  for (let k = 0; k <= 62831; k++) { const x = (k / 62831) * 2 * Math.PI; if (Math.abs(Math.cos(x) - 0.5) < 5e-5 && !hits.some((h) => Math.abs(h - x) < 0.01)) hits.push(x); }
  C.assert(XS.every((x) => near(E('sin(x)(cos(h)-1)/h + cos(x)sin(h)/h').g({ x, h: 0.2 }), (Math.sin(x + 0.2) - Math.sin(x)) / 0.2, 1e-9)) && derivOK(ef('sin(x)'), ef('cos(x)')) && hits.length === 2 && near(hits[0], Math.PI / 3, 1e-3) && near(hits[1], (5 * Math.PI) / 3, 1e-3) && near(cd(Math.sin, Math.PI / 3), 0.5, 1e-6) && near(cd(Math.sin, (5 * Math.PI) / 3), 0.5, 1e-6), 'the split quotient is exact; slope 1/2 occurs at exactly two points of [0, 2pi], pi/3 and 5pi/3');
  C.model([3, 5]);
});
L5('l04', { stem: r`Let $y = (x^2 - 3)(x^2 + 2x)$ and $z = \dfrac{2x - 1}{x^2 + 2}$.
(a) Find $\dfrac{dy}{dx}$ by the product rule, giving a polynomial. [2]
(b) Find $\dfrac{dz}{dx}$ by the quotient rule. [2]
(c) Evaluate $\dfrac{dy}{dx}$ and $\dfrac{dz}{dx}$ at $x = 1$. [1]`, model: r`(a) With $u = x^2 - 3$ and $v = x^2 + 2x$: $\dfrac{dy}{dx} = 2x(x^2 + 2x) + (x^2 - 3)(2x + 2) = 4x^3 + 6x^2 - 6x - 6$.
(b) With $u = 2x - 1$ and $v = x^2 + 2$: $\dfrac{dz}{dx} = \dfrac{2(x^2 + 2) - (2x - 1)(2x)}{(x^2 + 2)^2} = \dfrac{-2x^2 + 2x + 4}{(x^2 + 2)^2}$.
(c) At $x = 1$: $\dfrac{dy}{dx} = 4 + 6 - 6 - 6 = -2$ and $\dfrac{dz}{dx} = \dfrac{4}{9}$.`, sol: r`Name $u$, $v$, $u'$, $v'$ in each part, and check (a) by expanding.`, scheme: [['(a) Product rule written out', 1], ['(a) Polynomial $4x^3 + 6x^2 - 6x - 6$', 1], ['(b) Quotient rule written out', 1], ['(b) Numerator $-2x^2 + 2x + 4$', 1], ['(c) Values $-2$ and $\\dfrac{4}{9}$', 1]], d: 3, c: 'application', t: [3] }, (C) => {
  const u = poly([1, 2], [-3, 0]), v = poly([1, 2], [2, 1]), key = u.d().mul(v).add(u.mul(v.d()));
  const a = poly([2, 1], [-1, 0]), b = poly([1, 2], [2, 0]), nm = a.d().mul(b).sub(a.mul(b.d()));
  C.assert(key.eq(poly([4, 3], [6, 2], [-6, 1], [-6, 0])) && u.mul(v).d().eq(key) && key.at(1).eq(-2) && nm.eq(poly([-2, 2], [2, 1], [4, 0])) && nm.at(1).eq(4) && near(cd(ef('(2x-1)/(x^2+2)'), 1), 4 / 9, 1e-6) && derivOK(ef('(2x-1)/(x^2+2)'), ef('(-2x^2+2x+4)/(x^2+2)^2')) && near(cd(u.mul(v).fn(), 1), -2, 1e-6), 'exact polynomial identities; dz/dx at 1 is 4/9 and dy/dx at 1 is -2 by central difference');
  C.model([4, 6, 2, 9]);
});
L5('l05', { stem: r`Let $y = x\cos x - \sin x$ and $z = \dfrac{\sin x}{x^2 + 1}$.
(a) Show that $\dfrac{dy}{dx} = -x\sin x$. [2]
(b) Find $\dfrac{dz}{dx}$. [2]
(c) Find the value of $\dfrac{dz}{dx}$ at $x = 0$. [1]`, model: r`(a) By the product rule $\dfrac{d}{dx}(x\cos x) = \cos x - x\sin x$, and $\dfrac{d}{dx}(\sin x) = \cos x$. So $\dfrac{dy}{dx} = \cos x - x\sin x - \cos x = -x\sin x$.
(b) With $u = \sin x$ and $v = x^2 + 1$: $\dfrac{dz}{dx} = \dfrac{\cos x(x^2 + 1) - \sin x(2x)}{(x^2 + 1)^2}$.
(c) At $x = 0$: $\dfrac{1(1) - 0}{1} = 1$.`, sol: r`The terms in $\cos x$ cancel in part (a); in (b) name $u'$ and $v'$ first.`, scheme: [['(a) Product rule on $x\\cos x$', 1], ['(a) Cancellation giving $-x\\sin x$', 1], ['(b) Quotient rule with $u\' = \\cos x$, $v\' = 2x$', 1], ['(b) Result $\\dfrac{(x^2 + 1)\\cos x - 2x\\sin x}{(x^2 + 1)^2}$', 1], ['(c) Value $1$', 1]], d: 4, c: 'application', t: [3] }, (C) => {
  C.assert(derivOK(ef('x cos(x) - sin(x)'), ef('-x sin(x)')) && derivOK(ef('sin(x)/(x^2+1)'), ef('((x^2+1)cos(x) - 2x sin(x))/(x^2+1)^2')) && near(cd(ef('sin(x)/(x^2+1)'), 0), 1, 1e-6), 'matches central differences; dz/dx at 0 is 1');
  C.model([1, 2]);
});
L5('l06', { stem: r`The curve $C$ is $y = x^3 - 6x^2 + 9x + 2$.
(a) Find $\dfrac{dy}{dx}$. [1]
(b) Find the points of $C$ at which the tangent is parallel to the $x$-axis. [2]
(c) Find the equation of the tangent to $C$ at the point where $x = 2$. [2]`, model: r`(a) $\dfrac{dy}{dx} = 3x^2 - 12x + 9$.
(b) Setting $3x^2 - 12x + 9 = 3(x - 1)(x - 3) = 0$ gives $x = 1$ and $x = 3$. Then $y = 1 - 6 + 9 + 2 = 6$ and $y = 27 - 54 + 27 + 2 = 2$, so the points are $(1, 6)$ and $(3, 2)$.
(c) At $x = 2$: $y = 8 - 24 + 18 + 2 = 4$ and the slope is $12 - 24 + 9 = -3$. The tangent is $y - 4 = -3(x - 2)$, that is $y = -3x + 10$.`, sol: r`A tangent parallel to the $x$-axis has slope $0$.`, scheme: [['(a) $3x^2 - 12x + 9$', 1], ['(b) $x = 1$ and $x = 3$', 1], ['(b) Points $(1, 6)$ and $(3, 2)$', 1], ['(c) Point $(2, 4)$ and slope $-3$', 1], ['(c) Equation $y = -3x + 10$', 1]], d: 3, c: 'application', t: [4, 1] }, (C) => {
  const p = poly([1, 3], [-6, 2], [9, 1], [2, 0]), dp = p.d(), zeros = [-10, -5, -3, -2, -1, 0, 1, 2, 3, 4, 5, 10].filter((k) => dp.at(F(k)).isZero());
  C.assert(dp.eq(poly([3, 2], [-12, 1], [9, 0])) && zeros.join() === '1,3' && p.at(1).eq(6) && p.at(3).eq(2) && p.at(2).eq(4) && dp.at(2).eq(-3) && isTangent(p.fn(), 2, '-3x+10') && derivOK(p.fn(), dp.fn()), 'exact: dy/dx = 3(x - 1)(x - 3); points (1, 6), (3, 2); tangent at x = 2 is y = -3x + 10');
  C.model([3, 12, 9, 6, 2, 4, 10]);
});
L5('l07', { stem: r`The horizontal displacement of a pendulum bob from its rest position is $x = 4\sin 3t$ centimetres, $t$ seconds after release.
(a) Find the velocity $\dfrac{dx}{dt}$ in terms of $t$. [2]
(b) Find the velocity at $t = \dfrac{\pi}{9}$. [1]
(c) Find the first time $t > 0$ at which the bob is momentarily at rest, and its displacement then. [2]`, model: r`(a) For a linear argument, $\dfrac{d}{dt}(\sin 3t) = 3\cos 3t$, so $\dfrac{dx}{dt} = 4 \cdot 3\cos 3t = 12\cos 3t$ cm/s.
(b) At $t = \dfrac{\pi}{9}$: $12\cos\dfrac{\pi}{3} = 12 \cdot \dfrac{1}{2} = 6$ cm/s.
(c) At rest means $12\cos 3t = 0$. The first positive solution has $3t = \dfrac{\pi}{2}$, so $t = \dfrac{\pi}{6}$ seconds. Then $x = 4\sin\dfrac{\pi}{2} = 4$ cm.`, sol: r`At rest means zero velocity, so solve $\cos 3t = 0$.`, scheme: [['(a) $\\dfrac{d}{dt}(\\sin 3t) = 3\\cos 3t$', 1], ['(a) $\\dfrac{dx}{dt} = 12\\cos 3t$', 1], ['(b) Velocity $6$ cm/s', 1], ['(c) $t = \\dfrac{\\pi}{6}$', 1], ['(c) Displacement $4$ cm', 1]], d: 4, c: 'application', t: [4] }, (C) => {
  const x = ef('4sin(3x)');
  C.assert(derivOK(x, ef('12cos(3x)')) && near(cd(x, Math.PI / 9), 6, 1e-5) && near(cd(x, Math.PI / 6), 0, 1e-5) && near(x(Math.PI / 6), 4, 1e-12) && [0.1, 0.2, 0.3, 0.4, 0.5].every((t) => Math.abs(cd(x, t)) > 0.1), 'velocity 12 cos 3t; 6 at pi/9; zero first at pi/6 (not on a 0.1-0.5 grid below it); displacement 4');
  C.model([12, 6, 4, 3]);
});

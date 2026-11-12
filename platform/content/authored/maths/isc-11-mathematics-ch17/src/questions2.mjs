// ISC 11 Mathematics ch17 Derivatives - true-false, fill-blank, numerical and short (2 marks) items.
// Keys and every number inside a solution or model answer are recomputed (exact fractions, polynomials, central differences).
import { Q, mk } from './lib.mjs';
import { E, ef, F, poly, derivOK, near, cd, fdq, dqOK, isTangent, XS, XP, XT } from './calc.mjs';

const r = String.raw;
const Tx = (s) => E(s).tex;

// ============================================================ true-false
const TF = (id, o, check) => Q(id, mk.tf(o), check);
TF('tf1', { stem: r`True or false: for a distance-time function $s(t)$, the derivative $s'(a)$ is the instantaneous velocity of the moving body at the time $t = a$.`, key: 't', sol: r`True. The derivative $s'(a) = \lim_{h \to 0}\dfrac{s(a + h) - s(a)}{h}$ is the limit of the average velocities, which is the velocity at that instant. For $s = t^2$ at $t = 3$ it is $6$.`, d: 1, c: 'recall', t: [1], time: 40 }, (C) => {
  const s = (t) => t * t;
  C.assert(near(cd(s, 3), 6, 1e-6) && near(fdq(s, 3, 1e-6), 6, 1e-5), 'for s = t^2 the limit of the average velocities at t = 3 is 6');
  C.key('t');
});
TF('tf2', { stem: r`True or false: $\dfrac{d}{dx}\left(x^3 \cdot x^4\right) = 3x^2 \cdot 4x^3$.`, key: 'f', sol: r`False. The derivative of a product is not the product of the derivatives. Here $x^3 \cdot x^4 = x^7$ has derivative $7x^6$, while $3x^2 \cdot 4x^3 = 12x^5$.`, d: 2, c: 'understanding', t: [3], time: 45 }, (C) => {
  C.assert(derivOK(ef('x^7'), ef('7x^6')) && poly([3, 2]).mul(poly([4, 3])).eq(poly([12, 5])) && !poly([7, 6]).eq(poly([12, 5])), 'exact: 7x^6 against 12x^5, which differ (x^3 x^4 = x^7)');
  C.key('f');
});
TF('tf3', { stem: r`True or false: $\dfrac{d}{dx}(\operatorname{cosec} x) = \operatorname{cosec} x\cot x$ wherever $\sin x \ne 0$.`, key: 'f', sol: r`False. The correct result is $\dfrac{d}{dx}(\operatorname{cosec} x) = -\operatorname{cosec} x\cot x$, with a minus sign, as for every function whose name begins with "co".`, d: 2, c: 'understanding', t: [4], time: 45 }, (C) => {
  C.assert(derivOK(ef('cosec(x)'), ef('-cosec(x)cot(x)'), XT) && !derivOK(ef('cosec(x)'), ef('cosec(x)cot(x)'), XT), 'the derivative is -cosec x cot x on (0, pi/2); the stated one is not');
  C.key('f');
});
TF('tf4', { stem: r`True or false: from first principles, the derivative of $f(x) = \dfrac{1}{x}$ at $x = 2$ is $-\dfrac{1}{4}$.`, key: 't', sol: r`True. $\dfrac{f(2 + h) - f(2)}{h} = -\dfrac{1}{2(2 + h)}$, which tends to $-\dfrac{1}{4}$ as $h \to 0$.`, d: 2, c: 'understanding', t: [2], time: 50 }, (C) => {
  const f = ef('1/x');
  C.assert([0.5, 0.1, 0.01, -0.2].every((h) => near((f(2 + h) - f(2)) / h, -1 / (2 * (2 + h)), 1e-9)) && dqOK(f, ef('-1/x^2'), 2), 'the quotient equals -1/(2(2 + h)) exactly and tends to -1/4');
  C.key('t');
});
TF('tf5', { stem: r`True or false: $\dfrac{d}{dx}\left[(3x + 2)^2\right] = 18x + 12$.`, key: 't', sol: r`True. Expanding first, $(3x + 2)^2 = 9x^2 + 12x + 4$, whose derivative is $18x + 12$.`, d: 3, c: 'application', t: [4], time: 55 }, (C) => {
  const p = poly([9, 2], [12, 1], [4, 0]);
  C.assert(p.eq(poly([3, 1], [2, 0]).mul(poly([3, 1], [2, 0]))) && p.d().eq(poly([18, 1], [12, 0])) && derivOK(ef('(3x+2)^2'), ef('18x+12')), 'exact expansion 9x^2 + 12x + 4 and derivative 18x + 12');
  C.key('t');
});

// ============================================================ fill-blank
const FB = (id, o, check) => Q(id, mk.fill(o), check);
FB('fb1', { stem: r`A trolley's distance from the start after $t$ seconds is $s = t^2$ metres. Its instantaneous velocity at $t = 4$ s is ___ m/s.`, acc: [['8']], sol: r`The velocity is $\dfrac{ds}{dt} = 2t$, which is $2(4) = 8$ m/s at $t = 4$.`, d: 1, c: 'understanding', t: [1], time: 40 }, (C) => {
  C.assert(near(cd((t) => t * t, 4), 8, 1e-6), 'central difference of t^2 at 4 is 8');
  C.blank(8);
});
FB('fb2', { stem: r`The derivative of $7x^2 - 3x + 5$ at $x = 2$ is ___.`, acc: [['25']], sol: r`The derivative is $14x - 3$, which is $28 - 3 = 25$ at $x = 2$.`, d: 1, c: 'understanding', t: [4], time: 40 }, (C) => {
  const p = poly([7, 2], [-3, 1], [5, 0]);
  C.assert(p.d().eq(poly([14, 1], [-3, 0])) && p.d().at(2).eq(25) && near(cd(p.fn(), 2), 25, 1e-6), 'exact derivative 14x - 3 is 25 at x = 2; central difference agrees');
  C.blank(25);
});
FB('fb3', { stem: r`For $u = x^2$ and $v = x + 1$, the derivative of the product $uv$ at $x = 1$ is ___.`, acc: [['5']], sol: r`By the product rule $(uv)' = u'v + uv' = 2x(x + 1) + x^2(1)$, which is $4 + 1 = 5$ at $x = 1$.`, d: 2, c: 'understanding', t: [3], time: 50 }, (C) => {
  const p = poly([1, 2]).mul(poly([1, 1], [1, 0]));
  C.assert(p.eq(poly([1, 3], [1, 2])) && p.d().at(1).eq(5) && near(cd(p.fn(), 1), 5, 1e-6), 'exact: (x^3 + x^2)\' = 3x^2 + 2x is 5 at x = 1');
  C.blank(5);
});
FB('fb4', { stem: r`In differentiating $x^3$ from the definition, the quotient simplifies to $3x^2 + 3xh + h^2$. As $h \to 0$ at $x = 2$ it tends to ___.`, acc: [['12']], sol: r`At $x = 2$ the quotient is $12 + 6h + h^2$, which tends to $12$ as $h \to 0$.`, d: 2, c: 'understanding', t: [2], time: 45 }, (C) => {
  const f = (x) => x ** 3;
  C.assert([0.1, 0.01, -0.01].every((h) => near((f(2 + h) - f(2)) / h, 3 * 4 + 3 * 2 * h + h * h, 1e-9)) && near(fdq(f, 2, 1e-7), 12, 1e-5), 'the quotient at x = 2 is 12 + 6h + h^2 and tends to 12');
  C.blank(12);
});
FB('fb5', { stem: r`The slope of the curve $y = \cos x$ at the point where $x = \dfrac{\pi}{6}$ is ___ (give an exact fraction).`, acc: [['-1/2', '-0.5']], sol: r`The slope is $\dfrac{dy}{dx} = -\sin x$, which is $-\sin\dfrac{\pi}{6} = -\dfrac{1}{2}$, that is -1/2.`, d: 2, c: 'understanding', t: [4], time: 45 }, (C) => {
  C.assert(near(cd(Math.cos, Math.PI / 6), -0.5, 1e-6) && near(-Math.sin(Math.PI / 6), -0.5, 1e-12), 'central difference of cos at pi/6 is -1/2');
  C.blank(-0.5);
});

// ============================================================ numerical
const N = (id, o, check) => Q(id, mk.num({ scheme: [['Correct value', 1]], time: 90, ...o }), check);
N('n1', { stem: r`A sled slides so that its distance from the top of a slope is $s = 2t^2 + t$ metres after $t$ seconds. Find its average velocity (in m/s) from $t = 1$ to $t = 4$.`, value: 11, unit: 'm/s', sol: r`$s(4) = 36$ and $s(1) = 3$, so the average velocity is $\dfrac{36 - 3}{4 - 1} = \dfrac{33}{3} = 11$ m/s.`, d: 2, c: 'understanding', t: [1], time: 70 }, (C) => {
  const s = (t) => 2 * t * t + t;
  C.assert(s(4) === 36 && s(1) === 3 && (s(4) - s(1)) / 3 === 11, 'average velocity (36 - 3)/3 = 11');
  C.val(11);
});
N('n2', { stem: r`The graph of $y = x^4 - 3x^2$ has a tangent at the point with $x = 2$. Find the gradient of this tangent.`, value: 20, sol: r`$\dfrac{dy}{dx} = 4x^3 - 6x$, so the gradient at $x = 2$ is $4(8) - 6(2) = 32 - 12 = 20$.`, d: 2, c: 'understanding', t: [4, 1], time: 60 }, (C) => {
  const p = poly([1, 4], [-3, 2]);
  C.assert(p.d().eq(poly([4, 3], [-6, 1])) && p.d().at(2).eq(20) && near(cd(p.fn(), 2), 20, 1e-6), 'exact derivative 4x^3 - 6x is 20 at x = 2; central difference agrees');
  C.val(20);
});
N('n3', { stem: r`Find the value of $\dfrac{d}{dx}\left(\dfrac{3x + 1}{x - 2}\right)$ at $x = 4$.`, value: -1.75, sol: r`With $u = 3x + 1$ and $v = x - 2$: $\dfrac{u'v - uv'}{v^2} = \dfrac{3(x - 2) - (3x + 1)}{(x - 2)^2} = \dfrac{-7}{(x - 2)^2}$. At $x = 4$ this is $\dfrac{-7}{4} = -1.75$.`, d: 3, c: 'application', t: [3], time: 100 }, (C) => {
  const u = poly([3, 1], [1, 0]), v = poly([1, 1], [-2, 0]);
  C.assert(u.d().mul(v).sub(u.mul(v.d())).eq(poly([-7, 0])) && near(cd(ef('(3x+1)/(x-2)'), 4), -1.75, 1e-6) && -7 / 4 === -1.75, 'exact numerator -7, so the value at 4 is -7/4; central difference agrees');
  C.val(-1.75);
});
N('n4', { stem: r`For $f(x) = 3\sin x - 4\cos x + x$, find $f'\!\left(\dfrac{\pi}{3}\right)$, correct to two decimal places.`, value: 5.96, tol: 0.005, sol: r`$f'(x) = 3\cos x + 4\sin x + 1$, so $f'\!\left(\dfrac{\pi}{3}\right) = 3 \cdot \dfrac{1}{2} + 4 \cdot \dfrac{\sqrt{3}}{2} + 1 = 2.5 + 2\sqrt{3} = 5.96$ to two decimal places.`, d: 3, c: 'application', t: [4], time: 100 }, (C) => {
  const f = ef('3sin(x) - 4cos(x) + x'), a = Math.PI / 3;
  C.assert(derivOK(f, ef('3cos(x)+4sin(x)+1')) && near(cd(f, a), 2.5 + 2 * Math.sqrt(3), 1e-8) && Math.abs(2.5 + 2 * Math.sqrt(3) - 5.96) < 0.005, 'central difference at pi/3 equals 2.5 + 2 sqrt 3 = 5.9641');
  C.val(5.96);
});
N('n5', { stem: r`The tangent to the curve $y = x^2 + 2x + 3$ at the point where $x = -2$ meets the $y$-axis at the point $(0, k)$. Find $k$.`, value: -1, sol: r`At $x = -2$: $y = 4 - 4 + 3 = 3$ and $\dfrac{dy}{dx} = 2x + 2 = -2$. The tangent is $y - 3 = -2(x + 2)$, so $y = -2x - 1$ and $k = -1$.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
  const f = ef('x^2+2x+3');
  C.assert(f(-2) === 3 && near(cd(f, -2), -2, 1e-6) && isTangent(f, -2, '-2x-1') && ef('-2x-1')(0) === -1, 'the line y = -2x - 1 passes through (-2, 3) with slope -2 and meets x = 0 at -1');
  C.val(-1);
});
N('n6', { stem: r`A culture contains $N = 500 + 60t - 4t^2$ thousand cells $t$ hours after it is set up. At what time $t$ (in hours) is the count changing at $12$ thousand cells per hour?`, value: 6, unit: 'hours', sol: r`$\dfrac{dN}{dt} = 60 - 8t$. Setting $60 - 8t = 12$ gives $8t = 48$, so $t = 6$ hours.`, d: 3, c: 'application', t: [4], time: 90 }, (C) => {
  const N0 = (t) => 500 + 60 * t - 4 * t * t;
  C.assert(near(cd(N0, 6), 12, 1e-6) && poly([-4, 2], [60, 1], [500, 0]).d().eq(poly([-8, 1], [60, 0])) && poly([-8, 1], [60, 0]).at(6).eq(12) && [1, 2, 3, 4, 5, 7, 8].every((t) => !poly([-8, 1], [60, 0]).at(t).eq(12)), 'the rate 60 - 8t equals 12 only at t = 6 (exact, tested at other integers)');
  C.val(6);
});

// ============================================================ short, 2 marks
const S2 = (id, o, check) => Q(id, mk.short({ marks: 2, time: 150, ...o }), check);
S2('s201', { stem: r`A toboggan runs so that its distance from the start is $s = 4t^2 + t$ metres after $t$ seconds. Find its average velocity on the interval from $t = 2$ to $t = 2 + h$, and deduce its velocity at $t = 2$.`, model: r`$s(2 + h) - s(2) = 4(2 + h)^2 + (2 + h) - 18 = 16 + 16h + 4h^2 + 2 + h - 18 = 17h + 4h^2$.
Average velocity $= \dfrac{17h + 4h^2}{h} = 17 + 4h$ m/s.
As $h \to 0$ this tends to $17$, so the velocity at $t = 2$ is $17$ m/s.`, sol: r`Form the quotient, simplify, then let $h$ tend to zero.`, scheme: [['Average velocity $17 + 4h$ with the expansion shown', 1], ['Limit $17$ m/s as $h \\to 0$', 1]], d: 2, c: 'application', t: [1], time: 150 }, (C) => {
  const s = (t) => 4 * t * t + t;
  C.assert([0.5, 0.1, 0.01, -0.2].every((h) => near((s(2 + h) - s(2)) / h, 17 + 4 * h, 1e-9)) && s(2) === 18 && near(cd(s, 2), 17, 1e-6), 'the quotient equals 17 + 4h exactly and the velocity at 2 is 17');
  C.model([17, 4, 18]);
});
S2('s202', { stem: r`Find the equation of the tangent to the curve $y = x^2 + x - 2$ at the point where $x = 2$.`, model: r`At $x = 2$: $y = 4 + 2 - 2 = 4$, and $\dfrac{dy}{dx} = 2x + 1 = 5$.
The tangent is $y - 4 = 5(x - 2)$, that is $y = 5x - 6$.`, sol: r`Point from the curve, slope from the derivative, then point-slope form.`, scheme: [['Point $(2, 4)$ and slope $5$', 1], ['Equation $y = 5x - 6$', 1]], d: 2, c: 'application', t: [1], time: 120 }, (C) => {
  const f = ef('x^2+x-2');
  C.assert(f(2) === 4 && near(cd(f, 2), 5, 1e-6) && isTangent(f, 2, '5x-6'), 'f(2) = 4, f\'(2) = 5, and y = 5x - 6 is the tangent');
  C.model([4, 5, 6]);
});
S2('s203', { stem: r`Starting from the limit definition, obtain the derivative of the function $f(x) = 4x^2 - 3x + 7$.`, model: r`$f(x + h) - f(x) = 4(x + h)^2 - 3(x + h) + 7 - (4x^2 - 3x + 7) = 8xh + 4h^2 - 3h$.
Dividing by $h$: $8x + 4h - 3$. As $h \to 0$, $f'(x) = 8x - 3$.`, sol: r`Expand, divide by $h$, then take the limit.`, scheme: [['Difference quotient $8x + 4h - 3$', 1], ['Limit $f\'(x) = 8x - 3$', 1]], d: 2, c: 'understanding', t: [2], time: 130 }, (C) => {
  const f = ef('4x^2-3x+7');
  C.assert(XS.every((x) => [0.5, 0.1, -0.2].every((h) => near((f(x + h) - f(x)) / h, E('8x+4h-3').g({ x, h }), 1e-9))) && derivOK(f, ef('8x-3')), 'the quotient equals 8x + 4h - 3 exactly; 8x - 3 is the derivative');
  C.model([8, 4, 3]);
});
S2('s204', { stem: r`Find, from first principles, the derivative of $\dfrac{1}{2x + 1}$ for $x \ne -\dfrac{1}{2}$.`, model: r`$\dfrac{1}{h}\left[\dfrac{1}{2x + 2h + 1} - \dfrac{1}{2x + 1}\right] = \dfrac{1}{h} \cdot \dfrac{(2x + 1) - (2x + 2h + 1)}{(2x + 2h + 1)(2x + 1)} = \dfrac{-2}{(2x + 2h + 1)(2x + 1)}$.
As $h \to 0$ the derivative is $-\dfrac{2}{(2x + 1)^2}$.`, sol: r`Combine the fractions over a common denominator, then cancel $h$.`, scheme: [['Common denominator with numerator $-2h$', 1], ['Limit $-\\dfrac{2}{(2x + 1)^2}$', 1]], d: 3, c: 'application', t: [2], time: 150 }, (C) => {
  const f = ef('1/(2x+1)');
  C.assert(XS.filter((x) => Math.abs(2 * x + 1) > 0.3).every((x) => [0.1, 0.01, -0.05].every((h) => near((f(x + h) - f(x)) / h, E('-2/((2x+2h+1)(2x+1))').g({ x, h }), 1e-9))) && derivOK(f, ef('-2/(2x+1)^2'), XS.filter((x) => Math.abs(2 * x + 1) > 0.3)), 'the quotient equals -2/((2x + 2h + 1)(2x + 1)) exactly; the limit is the derivative');
  C.model([2, 1]);
});
S2('s205', { stem: r`For $f(x) = x^4 + x$, evaluate $f'(1)$ using $f'(a) = \lim_{x \to a}\dfrac{f(x) - f(a)}{x - a}$.`, model: r`$f(1) = 2$, so $\dfrac{f(x) - f(1)}{x - 1} = \dfrac{(x^4 - 1) + (x - 1)}{x - 1} = x^3 + x^2 + x + 1 + 1$ for $x \ne 1$.
As $x \to 1$ this tends to $1 + 1 + 1 + 1 + 1 = 5$, so $f'(1) = 5$.`, sol: r`Factor $x - 1$ out of the numerator before taking the limit.`, scheme: [['Quotient simplified by factorising', 1], ['Limit $f\'(1) = 5$', 1]], d: 2, c: 'understanding', t: [2], time: 120 }, (C) => {
  const f = ef('x^4+x');
  C.assert([1.1, 1.01, 0.99, 0.9].every((x) => near((f(x) - 2) / (x - 1), x ** 3 + x * x + x + 2, 1e-9)) && near(cd(f, 1), 5, 1e-6) && poly([1, 4], [1, 1]).d().at(1).eq(5), 'the quotient equals x^3 + x^2 + x + 2 for x near 1 and f\'(1) = 5');
  C.model([5, 2]);
});
S2('s206', { stem: r`Differentiate $(x^2 - 2x)(3x + 4)$ by the product rule, and verify the result by multiplying out first.`, model: r`With $u = x^2 - 2x$ and $v = 3x + 4$: $u'v + uv' = (2x - 2)(3x + 4) + 3(x^2 - 2x) = 9x^2 - 4x - 8$.
Check: $(x^2 - 2x)(3x + 4) = 3x^3 - 2x^2 - 8x$, whose derivative is $9x^2 - 4x - 8$.`, sol: r`Name $u$ and $v$ first; the expanded form gives the same polynomial.`, scheme: [['Product rule applied with $u\'$ and $v\'$', 1], ['Result $9x^2 - 4x - 8$ and the check by expanding', 1]], d: 2, c: 'application', t: [3], time: 130 }, (C) => {
  const u = poly([1, 2], [-2, 1]), v = poly([3, 1], [4, 0]), key = u.d().mul(v).add(u.mul(v.d()));
  C.assert(key.eq(poly([9, 2], [-4, 1], [-8, 0])) && u.mul(v).eq(poly([3, 3], [-2, 2], [-8, 1])) && u.mul(v).d().eq(key) && derivOK(u.mul(v).fn(), key.fn()), 'exact: the rule and the expansion both give 9x^2 - 4x - 8');
  C.model([9, 4, 8, 3, 2]);
});
S2('s207', { stem: r`If $y = \dfrac{x}{x^2 + 1}$, find $\dfrac{dy}{dx}$.`, model: r`With $u = x$ and $v = x^2 + 1$: $\dfrac{dy}{dx} = \dfrac{1 \cdot (x^2 + 1) - x \cdot 2x}{(x^2 + 1)^2} = \dfrac{1 - x^2}{(x^2 + 1)^2}$.`, sol: r`Quotient rule with $u' = 1$ and $v' = 2x$.`, scheme: [['Quotient rule with $u\' = 1$, $v\' = 2x$', 1], ['Simplified numerator $1 - x^2$', 1]], d: 3, c: 'application', t: [3], time: 120 }, (C) => {
  const u = poly([1, 1]), v = poly([1, 2], [1, 0]);
  C.assert(u.d().mul(v).sub(u.mul(v.d())).eq(poly([-1, 2], [1, 0])) && derivOK(ef('x/(x^2+1)'), ef('(1-x^2)/(x^2+1)^2')), 'exact numerator 1 - x^2; central difference confirms the quotient');
  C.model([1, 2]);
});
S2('s208', { stem: r`Differentiate $6x^4 - 5x^2 + \dfrac{3}{x} + \sqrt{x}$ with respect to $x$, for $x > 0$.`, model: r`Write $\dfrac{3}{x} = 3x^{-1}$ and $\sqrt{x} = x^{1/2}$. Then $\dfrac{d}{dx}\left(6x^4 - 5x^2 + 3x^{-1} + x^{1/2}\right) = 24x^3 - 10x - 3x^{-2} + \dfrac{1}{2}x^{-1/2}$, that is $24x^3 - 10x - \dfrac{3}{x^2} + \dfrac{1}{2\sqrt{x}}$.`, sol: r`Rewrite each term as a power of $x$ and apply $nx^{n - 1}$ term by term.`, scheme: [['Terms rewritten as powers of $x$', 1], ['Derivative $24x^3 - 10x - \\dfrac{3}{x^2} + \\dfrac{1}{2\\sqrt{x}}$', 1]], d: 2, c: 'understanding', t: [4], time: 120 }, (C) => {
  C.assert(derivOK(ef('6x^4 - 5x^2 + 3/x + sqrt(x)'), ef('24x^3 - 10x - 3/x^2 + 1/(2sqrt(x))'), XP), 'the stated derivative matches a central difference at 5 points');
  C.model([24, 10, 3, 2]);
});
S2('s209', { stem: r`Differentiate $2\tan x - 3\sec x$ with respect to $x$ at values of $x$ where it is defined.`, model: r`$\dfrac{d}{dx}(2\tan x - 3\sec x) = 2\sec^2 x - 3\sec x\tan x$.`, sol: r`Use the standard results for $\tan x$ and $\sec x$ with the constant factors.`, scheme: [['$2\\sec^2 x$ from the tangent term', 1], ['$-3\\sec x\\tan x$ from the secant term', 1]], d: 2, c: 'understanding', t: [4], time: 90 }, (C) => {
  C.assert(derivOK(ef('2tan(x)-3sec(x)'), ef('2sec(x)^2 - 3sec(x)tan(x)'), XT), 'matches a central difference on (0, pi/2)');
  C.model([2, 3]);
});
S2('s210', { stem: r`Calculate the gradient of the tangent drawn at $x = \pi$ to the graph of $y = x + 3\sin x$.`, model: r`$\dfrac{dy}{dx} = 1 + 3\cos x$. At $x = \pi$, $\cos\pi = -1$, so the slope is $1 + 3(-1) = -2$.`, sol: r`Differentiate, then substitute $x = \pi$.`, scheme: [['$\\dfrac{dy}{dx} = 1 + 3\\cos x$', 1], ['Slope $-2$ at $x = \\pi$', 1]], d: 2, c: 'understanding', t: [4, 1], time: 90 }, (C) => {
  const f = ef('x+3sin(x)');
  C.assert(derivOK(f, ef('1+3cos(x)')) && near(cd(f, Math.PI), -2, 1e-6), 'central difference at pi is -2');
  C.model([1, 3, 2]);
});

// ============================================================ two more recall-level items
TF('tf6', { stem: r`True or false: $\dfrac{d}{dx}(\sec x) = \sec x\tan x$ at every $x$ where $\cos x \ne 0$.`, key: 't', sol: r`True. Writing $\sec x = \dfrac{1}{\cos x}$, the quotient rule gives $\dfrac{\sin x}{\cos^2 x} = \sec x\tan x$.`, d: 1, c: 'recall', t: [4], time: 40 }, (C) => {
  C.assert(derivOK(ef('sec(x)'), ef('sec(x)tan(x)'), XT) && derivOK(ef('sec(x)'), ef('sin(x)/cos(x)^2'), XT), 'the derivative of sec x is sec x tan x = sin x / cos^2 x (central difference on (0, pi/2))');
  C.key('t');
});
FB('fb6', { stem: r`The derivative of $x^7$ with respect to $x$, evaluated at $x = 1$, is ___.`, acc: [['7']], sol: r`By $\dfrac{d}{dx}(x^n) = nx^{n - 1}$ the derivative is $7x^6$, which is $7$ at $x = 1$.`, d: 1, c: 'recall', t: [4], time: 35 }, (C) => {
  C.assert(poly([1, 7]).d().eq(poly([7, 6])) && poly([7, 6]).at(1).eq(7) && near(cd(ef('x^7'), 1), 7, 1e-6), 'exact: 7x^6 is 7 at x = 1; central difference agrees');
  C.blank(7);
});

// ISC 11 Mathematics ch03 Angles and Trigonometric Functions - short (2 and 3 marks) and long (5 marks, in parts) items.
// Every number in a model answer is recomputed: exact values at multiples of 15 degrees in Q(sqrt2, sqrt3), Pythagorean
// triples in exact fractions, identities and ranges by sampling a 0.5-degree grid over [-360, 360] degrees.
import { Q, mk } from './lib.mjs';
import { fr, el, add, sub, mul, neg, eq, val, tx, sinD, cosD, tanD, rad, toPi, gridRad, fin, holds1, period } from './trig.mjs';
import { r, PI, range, sin, cos, tan, cot, sec, csc, near } from './qh.mjs';
import { plotF } from './figs.mjs';

const G = gridRad;
const away = (xs = G, tol = 1e-3) => xs.filter((x) => Math.abs(sin(x)) > tol && Math.abs(cos(x)) > tol);
const GA = away();
const f2 = (v) => (Math.round(v * 100) / 100).toFixed(2);
const f1 = (v) => (Math.round(v * 10) / 10).toString();

// =============================================================== short answer (2 marks)
{
  const a = toPi(56), b = (13 * 180) / 20;
  Q('s201', mk.short({ marks: 2, stem: r`Express $56^\circ$ in radians, and express $\dfrac{13\pi}{20}$ radians in degrees.`, model: r`$56^\circ = 56 \times \dfrac{\pi}{180} = \dfrac{14\pi}{45}$ radians. $\dfrac{13\pi}{20}$ radians $= \dfrac{13\pi}{20} \times \dfrac{180}{\pi} = 117^\circ$.`, sol: 'Multiply by $\\dfrac{\\pi}{180}$ going to radians and by $\\dfrac{180}{\\pi}$ coming back.', scheme: [['$56^\\circ = \\dfrac{14\\pi}{45}$ radians', 1], ['$\\dfrac{13\\pi}{20}$ radians $= 117^\\circ$', 1]], d: 1, c: 'understanding', t: [1], time: 80 }), (C) => { C.assert(a[0] === 14 && a[1] === 45 && b === 117, '14 pi / 45 and 117 degrees'); C.model([14, 45, 117]); });
}
{
  const th = 22 / 90, d = (th * 180 * 7) / 22;
  Q('s202', mk.short({ marks: 2, stem: r`A pendulum bob swings along an arc of length $22$ cm at the end of a string $90$ cm long. Find the angle of swing, in radians and in degrees (use $\pi = \dfrac{22}{7}$).`, model: r`$\theta = \dfrac{l}{r} = \dfrac{22}{90} = \dfrac{11}{45}$ radian. In degrees, $\dfrac{11}{45} \times \dfrac{180}{\pi} = \dfrac{11}{45} \times 180 \times \dfrac{7}{22} = 14^\circ$.`, sol: 'Divide the arc by the radius, then convert with the given value of $\\pi$.', scheme: [['$\\theta = \\dfrac{l}{r} = \\dfrac{11}{45}$ radian', 1], ['$14^\\circ$', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.assert(near(d, 14) && near(th, 11 / 45), '11/45 radian, 14 degrees'); C.model([11, 45, 14]); });
}
{
  const s = sin(4), c = cos(4), t = tan(4);
  Q('s203', mk.short({ marks: 2, stem: r`The number $4$ is an angle measured in radians. State, with a reason, the signs of $\sin 4$, $\cos 4$ and $\tan 4$.`, model: r`Since $\pi \approx 3.14$ and $\dfrac{3\pi}{2} \approx 4.71$, the angle $4$ lies between $\pi$ and $\dfrac{3\pi}{2}$, in the third quadrant. There $\sin 4 < 0$, $\cos 4 < 0$ and $\tan 4 > 0$ (a negative divided by a negative).`, sol: 'Locate the angle between two quadrantal values first.', scheme: [['Third quadrant, since $\\pi < 4 < \\dfrac{3\\pi}{2}$', 1], ['Signs: $\\sin < 0$, $\\cos < 0$, $\\tan > 0$', 1]], d: 2, c: 'understanding', t: [1, 2], time: 80 }), (C) => { C.assert(PI < 4 && 4 < 1.5 * PI && s < 0 && c < 0 && t > 0, 'quadrant III signs'); C.model(['third quadrant', 4]); });
}
{
  // tan t = -7/24, II quadrant: sin = 7/25, cos = -24/25
  const th = Math.atan2(7, -24);
  Q('s204', mk.short({ marks: 2, stem: r`The angle $\theta$ lies in the second quadrant and $\tan\theta = -\dfrac{7}{24}$. Find $\sin\theta$ and $\cos\theta$.`, model: r`Legs $7$ and $24$ give hypotenuse $\sqrt{49 + 576} = 25$. In the second quadrant sine is positive and cosine is negative, so $\sin\theta = \dfrac{7}{25}$ and $\cos\theta = -\dfrac{24}{25}$.`, sol: 'Build the right triangle from the tangent, then attach signs by quadrant.', scheme: [['Hypotenuse $25$', 1], ['$\\sin\\theta = \\dfrac{7}{25}$, $\\cos\\theta = -\\dfrac{24}{25}$', 1]], d: 2, c: 'application', t: [2], time: 80 }), (C) => { C.assert(near(tan(th), -7 / 24) && near(sin(th), 7 / 25) && near(cos(th), -24 / 25), '7/25 and -24/25'); C.model([25, 7, 24]); });
}
Q('s205', mk.short({ marks: 2, stem: r`Prove that $\sin^4\theta - \cos^4\theta = \sin^2\theta - \cos^2\theta$.`, model: r`The left side is a difference of squares: $\sin^4\theta - \cos^4\theta = (\sin^2\theta - \cos^2\theta)(\sin^2\theta + \cos^2\theta)$. Since $\sin^2\theta + \cos^2\theta = 1$, this equals $\sin^2\theta - \cos^2\theta$, the right side.`, sol: 'Factorise as a difference of squares and use the Pythagorean identity.', scheme: [['Factorisation', 1], ['Use of $\\sin^2\\theta + \\cos^2\\theta = 1$', 1]], d: 2, c: 'application', t: [2], time: 80 }), (C) => { C.assert(holds1((x) => sin(x) ** 4 - cos(x) ** 4, (x) => sin(x) ** 2 - cos(x) ** 2), 'identity on the grid'); C.model(['difference of squares', 1]); });
Q('s206', mk.short({ marks: 2, stem: r`Show that $\dfrac{\cos\theta}{1 - \sin\theta} = \dfrac{1 + \sin\theta}{\cos\theta}$ wherever both sides are defined.`, model: r`Cross-multiplying, we need $\cos^2\theta = (1 - \sin\theta)(1 + \sin\theta) = 1 - \sin^2\theta$. This is true because $\sin^2\theta + \cos^2\theta = 1$. Hence the two sides are equal.`, sol: 'Cross-multiply and recognise a difference of squares.', scheme: [['Cross-multiplication to $\\cos^2\\theta = 1 - \\sin^2\\theta$', 1], ['Pythagorean identity cited', 1]], d: 2, c: 'application', t: [2], time: 80 }), (C) => { C.assert(holds1((x) => cos(x) / (1 - sin(x)), (x) => (1 + sin(x)) / cos(x), G.filter((x) => Math.abs(cos(x)) > 1e-3 && Math.abs(1 - sin(x)) > 1e-3)), 'identity on the grid'); C.model(['Cross-multiplying', 1]); });
{
  const t = mul(sinD(240), tanD(315));
  Q('s207', mk.short({ marks: 2, stem: r`Find the exact value of $\sin 240^\circ \cdot \tan 315^\circ$.`, model: r`$240^\circ$ is in the third quadrant with reference angle $60^\circ$, so $\sin 240^\circ = -\dfrac{\sqrt{3}}{2}$. $315^\circ$ is in the fourth quadrant with reference angle $45^\circ$, so $\tan 315^\circ = -1$. The product is $\dfrac{\sqrt{3}}{2}$.`, sol: 'Reduce each angle to its reference angle and attach the sign.', scheme: [['$\\sin 240^\\circ = -\\dfrac{\\sqrt{3}}{2}$ and $\\tan 315^\\circ = -1$', 1], ['Product $\\dfrac{\\sqrt{3}}{2}$', 1]], d: 2, c: 'application', t: [3], time: 80 }), (C) => { C.assert(eq(t, el(0, 0, fr(1, 2))) && near(val(t), Math.sin(rad(240)) * Math.tan(rad(315))), 'sqrt3 / 2'); C.model([3, 2]); });
}
{
  const t = add(sinD(-150), cosD(240));
  Q('s208', mk.short({ marks: 2, stem: r`Evaluate $\sin\left(-\dfrac{5\pi}{6}\right) + \cos\dfrac{4\pi}{3}$ without a calculator.`, model: r`$\sin\left(-\dfrac{5\pi}{6}\right) = -\sin\dfrac{5\pi}{6} = -\dfrac{1}{2}$, since $\sin\dfrac{5\pi}{6} = \sin\left(\pi - \dfrac{\pi}{6}\right) = \dfrac{1}{2}$. Also $\cos\dfrac{4\pi}{3} = -\cos\dfrac{\pi}{3} = -\dfrac{1}{2}$. The sum is $-1$.`, sol: 'Use oddness of sine and the allied-angle results for $\\pi \\pm \\theta$.', scheme: [['$\\sin\\left(-\\dfrac{5\\pi}{6}\\right) = -\\dfrac{1}{2}$', 1], ['$\\cos\\dfrac{4\\pi}{3} = -\\dfrac{1}{2}$ and sum $-1$', 1]], d: 2, c: 'application', t: [3], time: 80 }), (C) => { C.assert(eq(t, el(-1)) && near(Math.sin((-5 * PI) / 6) + Math.cos((4 * PI) / 3), -1), 'minus 1'); C.model([2, 3, 1]); });
}
{
  const ok = G.every((x) => !fin(sec(x)) || Math.abs(sec(x)) >= 1 - 1e-12);
  const p = period(sec);
  Q('s209', mk.short({ marks: 2, stem: r`State the domain, the range and the smallest positive period of the function $y = \sec x$.`, model: r`Domain: all real $x$ except the odd multiples of $\dfrac{\pi}{2}$, where $\cos x = 0$. Range: $(-\infty, -1] \cup [1, \infty)$, because $|\cos x| \le 1$. Period: $2\pi$, since $\sec(x + \pi) = -\sec x$ shows that $\pi$ is too short.`, sol: 'Work from $\\sec x = \\dfrac{1}{\\cos x}$.', scheme: [['Domain and range', 1], ['Period $2\\pi$ with a reason', 1]], d: 2, c: 'understanding', t: [4], time: 80 }), (C) => { C.assert(ok && p !== null && near(p, 2 * PI, 1e-6) && near(sec(PI / 3), 2) && near(sec(PI + 1), -sec(1)), '|sec| >= 1, period 2 pi'); C.model(['(-\\infty, -1] \\cup [1, \\infty)', '2\\pi']); });
}
{
  const g = (x) => 5 - 4 * cos(x);
  const xs = range(0, 6283).map((k) => k / 1000);
  const lo = Math.min(...xs.map(g)), hi = Math.max(...xs.map(g));
  Q('s210', mk.short({ marks: 2, stem: r`For $0 \le x \le 2\pi$, find the least and the greatest value of $f(x) = 5 - 4\cos x$, and a value of $x$ at which each is reached.`, model: r`Since $-1 \le \cos x \le 1$, we have $1 \le 5 - 4\cos x \le 9$. The least value $1$ occurs when $\cos x = 1$, that is at $x = 0$ (and again at $x = 2\pi$). The greatest value $9$ occurs when $\cos x = -1$, at $x = \pi$.`, sol: 'Bound $\\cos x$ and read off the two extremes.', scheme: [['Least value $1$ at $x = 0$', 1], ['Greatest value $9$ at $x = \\pi$', 1]], d: 2, c: 'application', t: [4], time: 80 }), (C) => { C.assert(near(g(0), 1) && near(g(PI), 9) && lo > 1 - 1e-6 && hi < 9 + 1e-6, 'extremes 1 and 9'); C.model([1, 9]); });
}

// =============================================================== short answer (3 marks)
{
  const revs = (480 / 60) * 5, rd = revs * 2, deg = revs * 360;
  Q('s301', mk.short({ marks: 3, stem: r`A circular saw blade turns at $480$ revolutions per minute. Through what angle does it turn in $5$ seconds? Give the answer in radians (as a multiple of $\pi$) and in degrees.`, model: r`$480$ revolutions per minute is $\dfrac{480}{60} = 8$ revolutions per second, so in $5$ seconds the blade makes $8 \times 5 = 40$ revolutions. Each revolution is $2\pi$ radians, so the angle is $40 \times 2\pi = 80\pi$ radians. In degrees this is $40 \times 360^\circ = 14400^\circ$.`, sol: 'Count the revolutions first, then convert at $2\\pi$ radians or $360^\\circ$ per revolution.', scheme: [['$40$ revolutions in $5$ seconds', 1], ['$80\\pi$ radians', 1], ['$14400^\\circ$', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { C.assert(revs === 40 && rd === 80 && deg === 14400, '40 revolutions, 80 pi, 14400'); C.model([8, 40, 80, 14400]); });
}
{
  const s = 51 - 2 * 15, th = s / 15, A = 0.5 * 15 * s;
  Q('s302', mk.short({ marks: 3, stem: r`A sector of a circle of radius $15$ cm has a perimeter of $51$ cm. Find its arc length, its central angle in radians and its area.`, model: r`The perimeter is two radii plus the arc, so the arc length is $l = 51 - 2 \times 15 = 21$ cm. The angle is $\theta = \dfrac{l}{r} = \dfrac{21}{15} = 1.4$ radians. The area is $\dfrac{1}{2}rl = \dfrac{1}{2} \times 15 \times 21 = 157.5$ cm$^2$.`, sol: 'Subtract the radii from the perimeter, then use $\\theta = \\dfrac{l}{r}$ and $A = \\dfrac{1}{2}rl$.', scheme: [['Arc length $21$ cm', 1], ['$\\theta = 1.4$ radians', 1], ['Area $157.5$ cm$^2$', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { C.assert(s === 21 && near(th, 1.4) && near(A, 157.5) && near(0.5 * 225 * th, 157.5), '21, 1.4, 157.5'); C.model([21, 1.4, 157.5]); });
}
{
  const th = Math.PI + Math.atan(8 / 15);
  Q('s303', mk.short({ marks: 3, stem: r`The angle $\theta$ lies in the third quadrant and $\cot\theta = \dfrac{15}{8}$. Find $\sin\theta$, $\cos\theta$ and $\sec\theta$.`, model: r`The legs are $15$ and $8$, so the hypotenuse is $\sqrt{225 + 64} = 17$. In the third quadrant sine and cosine are both negative, so $\sin\theta = -\dfrac{8}{17}$ and $\cos\theta = -\dfrac{15}{17}$. Then $\sec\theta = \dfrac{1}{\cos\theta} = -\dfrac{17}{15}$.`, sol: 'Draw the reference triangle and use the sign pattern of the third quadrant.', scheme: [['Hypotenuse $17$', 1], ['$\\sin\\theta = -\\dfrac{8}{17}$, $\\cos\\theta = -\\dfrac{15}{17}$', 1], ['$\\sec\\theta = -\\dfrac{17}{15}$', 1]], d: 3, c: 'application', t: [2], time: 110 }), (C) => { C.assert(near(cot(th), 15 / 8) && near(sin(th), -8 / 17) && near(cos(th), -15 / 17) && near(sec(th), -17 / 15), 'values'); C.model([17, 8, 15]); });
}
Q('s304', mk.short({ marks: 3, stem: r`Prove that $(\operatorname{cosec}\theta - \cot\theta)^2 = \dfrac{1 - \cos\theta}{1 + \cos\theta}$.`, model: r`$(\operatorname{cosec}\theta - \cot\theta)^2 = \left(\dfrac{1 - \cos\theta}{\sin\theta}\right)^2 = \dfrac{(1 - \cos\theta)^2}{\sin^2\theta}$. Replace $\sin^2\theta$ by $1 - \cos^2\theta = (1 - \cos\theta)(1 + \cos\theta)$. Cancelling the common factor $1 - \cos\theta$ leaves $\dfrac{1 - \cos\theta}{1 + \cos\theta}$.`, sol: 'Write everything with sine and cosine, then factorise the denominator.', scheme: [['Combine into $\\dfrac{1 - \\cos\\theta}{\\sin\\theta}$ and square', 1], ['$\\sin^2\\theta = (1 - \\cos\\theta)(1 + \\cos\\theta)$', 1], ['Cancel to reach the result', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => { C.assert(holds1((x) => (csc(x) - cot(x)) ** 2, (x) => (1 - cos(x)) / (1 + cos(x)), GA), 'identity on the grid'); C.model(['(1 - \\cos\\theta)', 1]); });
Q('s305', mk.short({ marks: 3, stem: r`Prove that $\tan^2\theta - \sin^2\theta = \tan^2\theta\,\sin^2\theta$.`, model: r`Left side: $\tan^2\theta - \sin^2\theta = \dfrac{\sin^2\theta}{\cos^2\theta} - \sin^2\theta = \sin^2\theta\left(\dfrac{1}{\cos^2\theta} - 1\right)$. Now $\dfrac{1}{\cos^2\theta} - 1 = \dfrac{1 - \cos^2\theta}{\cos^2\theta} = \dfrac{\sin^2\theta}{\cos^2\theta} = \tan^2\theta$. Hence the left side is $\sin^2\theta\tan^2\theta$.`, sol: 'Take $\\sin^2\\theta$ out as a common factor.', scheme: [['Tangent written as $\\dfrac{\\sin\\theta}{\\cos\\theta}$ and factor taken out', 1], ['$\\dfrac{1}{\\cos^2\\theta} - 1 = \\dfrac{\\sin^2\\theta}{\\cos^2\\theta}$', 1], ['Conclusion', 1]], d: 3, c: 'application', t: [2], time: 110 }), (C) => { C.assert(holds1((x) => tan(x) ** 2 - sin(x) ** 2, (x) => tan(x) ** 2 * sin(x) ** 2, GA), 'identity on the grid'); C.model(['\\tan^2\\theta', 1]); });
{
  const t = add(sinD(750), mul(cosD(-300), tanD(225)));
  Q('s306', mk.short({ marks: 3, stem: r`Find the exact value of $\sin 750^\circ + \cos(-300^\circ)\tan 225^\circ$.`, model: r`$\sin 750^\circ = \sin(720^\circ + 30^\circ) = \sin 30^\circ = \dfrac{1}{2}$. Cosine is even, so $\cos(-300^\circ) = \cos 300^\circ = \cos 60^\circ = \dfrac{1}{2}$. Also $\tan 225^\circ = \tan 45^\circ = 1$. The value is $\dfrac{1}{2} + \dfrac{1}{2} \times 1 = 1$.`, sol: 'Reduce each angle by whole turns or half turns, then add the exact values.', scheme: [['$\\sin 750^\\circ = \\dfrac{1}{2}$', 1], ['$\\cos(-300^\\circ) = \\dfrac{1}{2}$ and $\\tan 225^\\circ = 1$', 1], ['Value $1$', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => { C.assert(eq(t, el(1)) && near(Math.sin(rad(750)) + Math.cos(rad(-300)) * Math.tan(rad(225)), 1), 'exactly 1'); C.model([750, 300, 225, 1]); });
}
{
  const f = (x) => (sin(PI + x) * cos(PI / 2 + x) * tan(1.5 * PI - x)) / (cos(2 * PI - x) * sin(1.5 * PI + x));
  Q('s307', mk.short({ marks: 3, stem: r`Simplify $\dfrac{\sin(\pi + x)\,\cos\left(\dfrac{\pi}{2} + x\right)\tan\left(\dfrac{3\pi}{2} - x\right)}{\cos(2\pi - x)\,\sin\left(\dfrac{3\pi}{2} + x\right)}$.`, model: r`Numerator: $\sin(\pi + x) = -\sin x$, $\cos\left(\dfrac{\pi}{2} + x\right) = -\sin x$ and $\tan\left(\dfrac{3\pi}{2} - x\right) = \cot x$, so it equals $\sin^2 x\cot x = \sin x\cos x$. Denominator: $\cos(2\pi - x) = \cos x$ and $\sin\left(\dfrac{3\pi}{2} + x\right) = -\cos x$, so it equals $-\cos^2 x$. The quotient is $\dfrac{\sin x\cos x}{-\cos^2 x} = -\tan x$.`, sol: 'Replace each factor by an allied-angle result, collect the signs, then simplify.', scheme: [['Numerator reduced to $\\sin x\\cos x$', 1], ['Denominator reduced to $-\\cos^2 x$', 1], ['Result $-\\tan x$', 1]], d: 4, c: 'analysis', t: [3], time: 150 }), (C) => { C.assert(holds1(f, (x) => -tan(x), GA) && holds1((x) => sin(PI + x) * cos(PI / 2 + x) * tan(1.5 * PI - x), (x) => sin(x) * cos(x), GA) && holds1((x) => cos(2 * PI - x) * sin(1.5 * PI + x), (x) => -(cos(x) ** 2), GA), 'numerator, denominator and quotient'); C.model(['-\\tan x', '\\sin x\\cos x']); });
}
{
  const v = sin(rad(28)) ** 2 + sin(rad(62)) ** 2 + tan(rad(45)) ** 2;
  Q('s308', mk.short({ marks: 3, stem: r`Without tables, show that $\sin^2 28^\circ + \sin^2 62^\circ + \tan^2 45^\circ = 2$.`, model: r`Since $62^\circ = 90^\circ - 28^\circ$, we have $\sin 62^\circ = \cos 28^\circ$. So $\sin^2 28^\circ + \sin^2 62^\circ = \sin^2 28^\circ + \cos^2 28^\circ = 1$. Also $\tan 45^\circ = 1$, so $\tan^2 45^\circ = 1$. The total is $1 + 1 = 2$.`, sol: 'Complementary angles turn sine into cosine.', scheme: [['$\\sin 62^\\circ = \\cos 28^\\circ$', 1], ['$\\sin^2 28^\\circ + \\cos^2 28^\\circ = 1$', 1], ['$\\tan^2 45^\\circ = 1$ and total $2$', 1]], d: 3, c: 'application', t: [2, 3], time: 110 }), (C) => { C.assert(near(v, 2) && near(sin(rad(62)), cos(rad(28))), 'sum is 2'); C.model([62, 28, 45, 2]); });
}
{
  const zerosIn = [PI / 2, (3 * PI) / 2].every((x) => Math.abs(cot(x)) < 1e-12);
  const poles = [0, PI, 2 * PI].every((x) => Math.abs(sin(x)) < 1e-12);
  Q('s309', mk.short({ marks: 3, stem: r`For the function $y = \cot x$, state the domain, the range, the smallest positive period, the equations of its vertical asymptotes for $0 \le x \le 2\pi$, and the values of $x$ in $(0, 2\pi)$ where it is zero.`, model: r`$\cot x = \dfrac{\cos x}{\sin x}$. Domain: all real $x$ except $x = n\pi$; range: all real numbers; period: $\pi$, because $\cot(x + \pi) = \cot x$. Asymptotes for $0 \le x \le 2\pi$: $x = 0$, $x = \pi$ and $x = 2\pi$, where $\sin x = 0$. Zeros in $(0, 2\pi)$: $x = \dfrac{\pi}{2}$ and $x = \dfrac{3\pi}{2}$, where $\cos x = 0$.`, sol: 'Zeros of the numerator give zeros of the function; zeros of the denominator give asymptotes.', scheme: [['Domain and range', 1], ['Period $\\pi$', 1], ['Asymptotes and zeros', 1]], d: 3, c: 'understanding', t: [4], time: 120 }), (C) => { C.assert(zerosIn && poles && near(period(cot), PI, 1e-6), 'zeros, poles and period'); C.model(['n\\pi', '\\dfrac{\\pi}{2}', '\\dfrac{3\\pi}{2}']); });
}
{
  const g = (x) => 1 / (3 - 2 * sin(x));
  const xs = range(0, 62830).map((k) => k / 10000);
  const lo = Math.min(...xs.map(g)), hi = Math.max(...xs.map(g));
  Q('s310', mk.short({ marks: 3, stem: r`Find the range of the function $f(x) = \dfrac{1}{3 - 2\sin x}$.`, model: r`Since $-1 \le \sin x \le 1$, we get $-2 \le -2\sin x \le 2$ and so $1 \le 3 - 2\sin x \le 5$. The denominator is always positive, and taking reciprocals reverses the order: $\dfrac{1}{5} \le f(x) \le 1$. The ends are reached when $\sin x = -1$ and $\sin x = 1$, so the range is $\left[\dfrac{1}{5}, 1\right]$.`, sol: 'Bound the denominator first, then take reciprocals.', scheme: [['$1 \\le 3 - 2\\sin x \\le 5$', 1], ['Reciprocals: $\\dfrac{1}{5} \\le f(x) \\le 1$', 1], ['Both ends attained: range $\\left[\\dfrac{1}{5}, 1\\right]$', 1]], d: 4, c: 'analysis', t: [4], time: 130 }), (C) => { C.assert(near(lo, 0.2, 1e-6) && near(hi, 1, 1e-6) && near(g(-PI / 2), 0.2) && near(g(PI / 2), 1), 'range [1/5, 1]'); C.model([5, 1]); });
}
{
  const tri = [[0.7, 1.1], [1.2, 0.4], [0.5, 2.0], [1.0, 1.0]].map(([a, b]) => [a, b, PI - a - b]);
  Q('s311', mk.short({ marks: 3, stem: r`In a triangle $ABC$ prove that $\sin\dfrac{A + B}{2} = \cos\dfrac{C}{2}$.`, model: r`The angles of a triangle add up to $\pi$, so $A + B = \pi - C$ and $\dfrac{A + B}{2} = \dfrac{\pi}{2} - \dfrac{C}{2}$. Therefore $\sin\dfrac{A + B}{2} = \sin\left(\dfrac{\pi}{2} - \dfrac{C}{2}\right)$. A complementary angle turns sine into cosine, so this equals $\cos\dfrac{C}{2}$.`, sol: 'Replace $A + B$ by $\\pi - C$ and use the complementary-angle result.', scheme: [['$A + B = \\pi - C$', 1], ['$\\dfrac{A + B}{2} = \\dfrac{\\pi}{2} - \\dfrac{C}{2}$', 1], ['$\\sin\\left(\\dfrac{\\pi}{2} - \\theta\\right) = \\cos\\theta$ applied', 1]], d: 3, c: 'application', t: [3], time: 100 }), (C) => { C.assert(tri.every(([A, B, Cc]) => near(sin((A + B) / 2), cos(Cc / 2))), 'four triangles'); C.model([2, 'complementary']); });
}
{
  const hour = Math.round((8 + 20 / 60) * 30), minute = 20 * 6, diff = Math.abs(hour - minute), [p, q] = toPi(diff);
  Q('s312', mk.short({ marks: 3, stem: r`At $8{:}20$ the hour hand and the minute hand of a clock make an angle at the centre of the dial. Find this angle in degrees and in radians.`, model: r`The minute hand is at $20 \times 6^\circ = 120^\circ$ from the $12$ mark. The hour hand has turned $8 \times 30^\circ + \dfrac{20}{60} \times 30^\circ = 240^\circ + 10^\circ = 250^\circ$. The angle between them is $250^\circ - 120^\circ = 130^\circ$, which is $130 \times \dfrac{\pi}{180} = \dfrac{13\pi}{18}$ radians.`, sol: 'Find each hand\'s position from the $12$ mark and subtract.', scheme: [['Minute hand at $120^\\circ$', 1], ['Hour hand at $250^\\circ$, angle $130^\\circ$', 1], ['$\\dfrac{13\\pi}{18}$ radians', 1]], d: 3, c: 'application', t: [1], time: 110 }), (C) => { C.assert(hour === 250 && minute === 120 && diff === 130 && p === 13 && q === 18, '250, 120, 130, 13 pi / 18'); C.model([120, 250, 130, 13, 18]); });
}

// =============================================================== long answer (5 marks, in parts)
{
  const a1 = toPi(-135), b1 = (7 * 180) / 12;
  const th = 33 / 21, dg = (th * 180 * 7) / 22;
  Q('l01', mk.long({ stem: r`(a) Express $-135^\circ$ in radians and $\dfrac{7\pi}{12}$ radians in degrees. [2]

(b) The rim of an imagined Ferris wheel has radius $21$ m. A passenger cabin travels $33$ m along the rim. Find the angle through which the wheel turns, in radians and in degrees (use $\pi = \dfrac{22}{7}$). [3]`, model: r`(a) $-135^\circ = -135 \times \dfrac{\pi}{180} = -\dfrac{3\pi}{4}$ radians. $\dfrac{7\pi}{12}$ radians $= \dfrac{7\pi}{12} \times \dfrac{180}{\pi} = 105^\circ$.

(b) The angle in radians is $\theta = \dfrac{l}{r} = \dfrac{33}{21} = \dfrac{11}{7}$. To convert, $\dfrac{11}{7} \times \dfrac{180}{\pi} = \dfrac{11}{7} \times 180 \times \dfrac{7}{22} = 90$. So the wheel turns through $\dfrac{11}{7}$ radians, which is $90^\circ$.`, sol: 'Use $\\dfrac{\\pi}{180}$ and $\\dfrac{180}{\\pi}$ for the conversions and $\\theta = \\dfrac{l}{r}$ for the arc.', scheme: [['(a) $-\\dfrac{3\\pi}{4}$ radians', 1], ['(a) $105^\\circ$', 1], ['(b) $\\theta = \\dfrac{l}{r} = \\dfrac{11}{7}$ radians', 1.5], ['(b) conversion using $\\pi = \\dfrac{22}{7}$', 1], ['(b) $90^\\circ$', 0.5]], d: 2, c: 'application', t: [1], time: 330 }), (C) => { C.assert(a1[0] === -3 && a1[1] === 4 && b1 === 105 && near(th, 11 / 7) && near(dg, 90), '-3 pi / 4, 105, 11/7, 90'); C.model([3, 4, 105, 11, 7, 90]); });
}
{
  let sols = [];
  for (let k = 1; k <= 400; k++) { const rr = k / 20, s = 20 - 2 * rr; if (s > 0 && near(0.5 * rr * s, 24, 1e-9)) sols.push([rr, s, s / rr]); }
  Q('l02', mk.long({ stem: r`A sector of a circle has area $24$ cm$^2$ and perimeter $20$ cm. Let its radius be $r$ cm and its arc length $l$ cm.

(a) Write down two equations connecting $r$ and $l$. [2]

(b) Eliminate $l$ and solve for $r$. [2]

(c) Find the central angle in radians for each value of $r$. [1]`, model: r`(a) The perimeter gives $2r + l = 20$, and the area gives $\dfrac{1}{2}rl = 24$, that is $rl = 48$.

(b) From the first equation $l = 20 - 2r$, so $r(20 - 2r) = 48$, which simplifies to $r^2 - 10r + 24 = 0$, that is $(r - 4)(r - 6) = 0$. Hence $r = 4$ or $r = 6$.

(c) For $r = 4$: $l = 12$ and $\theta = \dfrac{12}{4} = 3$ radians. For $r = 6$: $l = 8$ and $\theta = \dfrac{8}{6} = \dfrac{4}{3}$ radians. Both satisfy the area, since $\dfrac{1}{2} \times 4 \times 12 = 24$ and $\dfrac{1}{2} \times 6 \times 8 = 24$.`, sol: 'Two conditions on $r$ and $l$ give a quadratic in $r$ with two admissible roots.', scheme: [['(a) $2r + l = 20$', 1], ['(a) $rl = 48$', 1], ['(b) Quadratic $r^2 - 10r + 24 = 0$', 1], ['(b) $r = 4$ or $r = 6$', 1], ['(c) $\\theta = 3$ and $\\theta = \\dfrac{4}{3}$ radians', 1]], d: 4, c: 'analysis', t: [1], time: 420 }), (C) => { C.assert(sols.length === 2 && sols[0].join() === '4,12,3' && near(sols[1][0], 6) && near(sols[1][1], 8) && near(sols[1][2], 4 / 3), 'r = 4, theta = 3; r = 6, theta = 4/3'); C.model([20, 48, 4, 6, 12, 8, 3, 4]); });
}
{
  // sin = -9/41, cos = -40/41 (third quadrant)
  const th = PI + Math.atan(9 / 40);
  Q('l03', mk.long({ stem: r`The point $P(\theta)$ of the unit circle, reached by turning through the angle $\theta$ from the point $(1, 0)$, lies in the third quadrant and has $y$-coordinate $-\dfrac{9}{41}$.

(a) Find its $x$-coordinate, and then $\tan\theta$, $\cot\theta$, $\sec\theta$ and $\operatorname{cosec}\theta$. [3]

(b) Find $\sin(\pi + \theta)$, $\cos\left(\dfrac{\pi}{2} + \theta\right)$ and $\tan(2\pi - \theta)$. [2]`, model: r`(a) The coordinates of $P$ are $(\cos\theta, \sin\theta)$ and lie on $x^2 + y^2 = 1$. So $x^2 = 1 - \dfrac{81}{1681} = \dfrac{1600}{1681}$, and $x = -\dfrac{40}{41}$ in the third quadrant. Then $\tan\theta = \dfrac{-9/41}{-40/41} = \dfrac{9}{40}$, $\cot\theta = \dfrac{40}{9}$, $\sec\theta = -\dfrac{41}{40}$ and $\operatorname{cosec}\theta = -\dfrac{41}{9}$.

(b) $\sin(\pi + \theta) = -\sin\theta = \dfrac{9}{41}$. $\cos\left(\dfrac{\pi}{2} + \theta\right) = -\sin\theta = \dfrac{9}{41}$. $\tan(2\pi - \theta) = -\tan\theta = -\dfrac{9}{40}$.`, sol: 'Use $x^2 + y^2 = 1$ for the missing coordinate and the allied-angle rules for part (b).', scheme: [['(a) $x = -\\dfrac{40}{41}$', 1], ['(a) $\\tan\\theta = \\dfrac{9}{40}$ and $\\cot\\theta = \\dfrac{40}{9}$', 1], ['(a) $\\sec\\theta = -\\dfrac{41}{40}$ and $\\operatorname{cosec}\\theta = -\\dfrac{41}{9}$', 1], ['(b) $\\sin(\\pi + \\theta) = \\dfrac{9}{41}$ and $\\cos\\left(\\dfrac{\\pi}{2} + \\theta\\right) = \\dfrac{9}{41}$', 1], ['(b) $\\tan(2\\pi - \\theta) = -\\dfrac{9}{40}$', 1]], d: 3, c: 'application', t: [2, 3], time: 420 }), (C) => { C.assert(near(sin(th), -9 / 41) && near(cos(th), -40 / 41) && near(tan(th), 9 / 40) && near(cot(th), 40 / 9) && near(sec(th), -41 / 40) && near(csc(th), -41 / 9) && near(sin(PI + th), 9 / 41) && near(cos(PI / 2 + th), 9 / 41) && near(tan(2 * PI - th), -9 / 40), 'all nine values'); C.model([40, 41, 9, 1681, 1600]); });
}
{
  const th = Math.asin(4 / 5);
  Q('l04', mk.long({ stem: r`(a) Prove that $\dfrac{1 + \sin\theta}{1 - \sin\theta} = (\sec\theta + \tan\theta)^2$. [3]

(b) If $\sec\theta + \tan\theta = 3$, use the identity $\sec^2\theta - \tan^2\theta = 1$ to find $\sec\theta - \tan\theta$, and hence find $\sin\theta$. [2]`, model: r`(a) Start with the right side: $(\sec\theta + \tan\theta)^2 = \dfrac{(1 + \sin\theta)^2}{\cos^2\theta}$. Replace $\cos^2\theta$ by $1 - \sin^2\theta = (1 - \sin\theta)(1 + \sin\theta)$. Cancelling $1 + \sin\theta$ gives $\dfrac{1 + \sin\theta}{1 - \sin\theta}$, the left side.

(b) Since $(\sec\theta - \tan\theta)(\sec\theta + \tan\theta) = 1$, we get $\sec\theta - \tan\theta = \dfrac{1}{3}$. Adding and subtracting the two equations, $2\sec\theta = 3 + \dfrac{1}{3} = \dfrac{10}{3}$ and $2\tan\theta = 3 - \dfrac{1}{3} = \dfrac{8}{3}$. So $\sec\theta = \dfrac{5}{3}$ and $\tan\theta = \dfrac{4}{3}$, and $\sin\theta = \tan\theta\cos\theta = \dfrac{4}{3} \times \dfrac{3}{5} = \dfrac{4}{5}$.`, sol: 'Express the right side through sine and cosine for (a); the product of the two combinations is $1$ in (b).', scheme: [['(a) $(\\sec\\theta + \\tan\\theta)^2 = \\dfrac{(1 + \\sin\\theta)^2}{\\cos^2\\theta}$', 1], ['(a) $\\cos^2\\theta = (1 - \\sin\\theta)(1 + \\sin\\theta)$ and cancel', 2], ['(b) $\\sec\\theta - \\tan\\theta = \\dfrac{1}{3}$', 1], ['(b) $\\sin\\theta = \\dfrac{4}{5}$', 1]], d: 3, c: 'application', t: [2], time: 420 }), (C) => { C.assert(holds1((x) => (1 + sin(x)) / (1 - sin(x)), (x) => (sec(x) + tan(x)) ** 2, GA.filter((x) => Math.abs(1 - sin(x)) > 1e-3)) && near(sec(th) + tan(th), 3) && near(sec(th) - tan(th), 1 / 3) && near(sin(th), 4 / 5), 'identity and part (b)'); C.model([3, 5, 4]); });
}
{
  const a = sinD(1140), b = cosD(-1305), c = tanD(1125);
  const g = (x) => (sin(PI + x) * cos(PI - x)) / (sin(PI / 2 + x) * cos(1.5 * PI - x));
  Q('l05', mk.long({ stem: r`(a) Find the exact values of $\sin 1140^\circ$, $\cos(-1305^\circ)$ and $\tan 1125^\circ$. [3]

(b) Simplify $\dfrac{\sin(\pi + x)\,\cos(\pi - x)}{\sin\left(\dfrac{\pi}{2} + x\right)\cos\left(\dfrac{3\pi}{2} - x\right)}$. [2]`, model: r`(a) $1140^\circ = 3 \times 360^\circ + 60^\circ$, so $\sin 1140^\circ = \sin 60^\circ = \dfrac{\sqrt{3}}{2}$. Cosine is even and $1305^\circ = 3 \times 360^\circ + 225^\circ$, so $\cos(-1305^\circ) = \cos 225^\circ = -\cos 45^\circ = -\dfrac{\sqrt{2}}{2}$. Also $1125^\circ = 3 \times 360^\circ + 45^\circ$, so $\tan 1125^\circ = 1$.

(b) Numerator: $\sin(\pi + x) = -\sin x$ and $\cos(\pi - x) = -\cos x$, giving $\sin x\cos x$. Denominator: $\sin\left(\dfrac{\pi}{2} + x\right) = \cos x$ and $\cos\left(\dfrac{3\pi}{2} - x\right) = -\sin x$, giving $-\sin x\cos x$. The quotient is $-1$.`, sol: 'Remove whole turns first in (a); in (b) replace each factor with an allied-angle result.', scheme: [['(a) $\\sin 1140^\\circ = \\dfrac{\\sqrt{3}}{2}$', 1], ['(a) $\\cos(-1305^\\circ) = -\\dfrac{\\sqrt{2}}{2}$', 1], ['(a) $\\tan 1125^\\circ = 1$', 1], ['(b) Numerator $\\sin x\\cos x$ and denominator $-\\sin x\\cos x$', 1], ['(b) Value $-1$', 1]], d: 3, c: 'application', t: [3], time: 400 }), (C) => { C.assert(eq(a, el(0, 0, fr(1, 2))) && eq(b, el(0, fr(-1, 2))) && eq(c, el(1)) && near(val(a), Math.sin(rad(1140))) && near(val(b), Math.cos(rad(-1305))) && near(val(c), Math.tan(rad(1125))), 'exact values'); C.assert(holds1(g, () => -1, GA), 'expression is -1'); C.model([1140, 1305, 1125, 3, 360]); });
}
{
  const piece = (x0, x1) => ({ expr: '1/cos(x)', domain: [x0, x1] });
  const fig = plotF({ x: [-0.4, 6.7], y: [-4, 4], fns: [{ expr: 'cos(x)', label: '$y = \\cos x$' }, { ...piece(-0.2, 1.45), label: '$y = \\sec x$' }, piece(1.69, 4.59), piece(4.83, 6.5)], pts: [[0, 1, '(0, 1)'], [PI, -1, '$(\\pi, -1)$'], [2 * PI, 1, '$(2\\pi, 1)$']] }, 'The graphs of y equal to cosine x and y equal to secant x for x from about minus 0.4 to 6.7. Cosine is a smooth wave between minus 1 and 1. Secant has three branches separated by vertical gaps at pi over 2 and 3 pi over 2: a U shape above 1 near zero, an upside-down U below minus 1 around pi, and a U above 1 near 2 pi. The curves touch at the points (0, 1), (pi, minus 1) and (2 pi, 1).', 'Secant touches cosine where the cosine is $1$ or $-1$.');
  const xs = range(0, 62832).map((k) => k / 10000);
  const meet = xs.filter((x) => Math.abs(cos(x)) > 1e-9 && Math.abs(sec(x) - cos(x)) < 1e-6);
  const near0 = (x) => [0, PI, 2 * PI].some((p) => Math.abs(x - p) < 2e-3);
  Q('l06', mk.long({ stem: r`The figure shows the graphs of $y = \cos x$ and $y = \sec x$ for $0 \le x \le 2\pi$.

(a) Write down the equations of the vertical asymptotes of $y = \sec x$ in this interval. [1]

(b) State the range of $\sec x$. [1]

(c) Show that $\sec x = \cos x$ only where $\cos^2 x = 1$, and list the values of $x$ in $[0, 2\pi]$ at which the curves meet. [2]

(d) Find the value of $x$ in $\left(0, \dfrac{\pi}{2}\right)$ for which $\sec x = 2$. [1]`, assets: [fig], model: r`(a) $\sec x = \dfrac{1}{\cos x}$ is undefined where $\cos x = 0$, so the asymptotes in $[0, 2\pi]$ are $x = \dfrac{\pi}{2}$ and $x = \dfrac{3\pi}{2}$.

(b) Because $|\cos x| \le 1$, $|\sec x| \ge 1$, so the range is $(-\infty, -1] \cup [1, \infty)$.

(c) If $\dfrac{1}{\cos x} = \cos x$, then $\cos^2 x = 1$, so $\cos x = \pm 1$. In $[0, 2\pi]$ this happens at $x = 0$, $x = \pi$ and $x = 2\pi$, giving the points $(0, 1)$, $(\pi, -1)$ and $(2\pi, 1)$ seen in the figure.

(d) $\sec x = 2$ means $\cos x = \dfrac{1}{2}$, and in $\left(0, \dfrac{\pi}{2}\right)$ this gives $x = \dfrac{\pi}{3}$.`, sol: 'Everything follows from $\\sec x = \\dfrac{1}{\\cos x}$ and $|\\cos x| \\le 1$.', scheme: [['(a) Asymptotes $x = \\dfrac{\\pi}{2}$ and $x = \\dfrac{3\\pi}{2}$', 1], ['(b) Range $(-\\infty, -1] \\cup [1, \\infty)$', 1], ['(c) $\\cos^2 x = 1$ derived', 1], ['(c) $x = 0$, $\\pi$, $2\\pi$ listed', 1], ['(d) $x = \\dfrac{\\pi}{3}$', 1]], d: 3, c: 'understanding', t: [4], time: 360 }), (C) => { C.assert(meet.length > 0 && meet.every(near0) && [0, PI, 2 * PI].every((p) => near(sec(p), cos(p))) && near(sec(PI / 3), 2) && [1.45, 1.69].every((x) => Math.abs(cos(x)) < 0.2), 'curves meet only at 0, pi, 2 pi; sec(pi/3) = 2'); C.model(['\\dfrac{\\pi}{3}', '\\dfrac{3\\pi}{2}']); });
}
{
  const g = (x) => 2 - csc(x);
  const xs = range(1, 62831).map((k) => k / 10000).filter((x) => Math.abs(sin(x)) > 1e-9);
  const inSet = xs.every((x) => g(x) <= 1 + 1e-9 || g(x) >= 3 - 1e-9);
  const hits = near(g(PI / 2), 1) && near(g((3 * PI) / 2), 3);
  Q('l07', mk.long({ stem: r`(a) For each of the functions $\tan x$, $\cot x$, $\sec x$ and $\operatorname{cosec} x$, state the domain and the range. [4]

(b) Use the range of $\operatorname{cosec} x$ to find the range of $y = 2 - \operatorname{cosec} x$. [1]`, model: r`(a) $\tan x$: domain all real $x$ except odd multiples of $\dfrac{\pi}{2}$; range all real numbers. $\cot x$: domain all real $x$ except multiples of $\pi$; range all real numbers. $\sec x$: domain all real $x$ except odd multiples of $\dfrac{\pi}{2}$; range $(-\infty, -1] \cup [1, \infty)$. $\operatorname{cosec} x$: domain all real $x$ except multiples of $\pi$; range $(-\infty, -1] \cup [1, \infty)$.

(b) We have $\operatorname{cosec} x \le -1$ or $\operatorname{cosec} x \ge 1$. Then $-\operatorname{cosec} x \ge 1$ or $-\operatorname{cosec} x \le -1$, and adding $2$: $y \ge 3$ or $y \le 1$. The range is $(-\infty, 1] \cup [3, \infty)$; the values $1$ and $3$ occur at $x = \dfrac{\pi}{2}$ and $x = \dfrac{3\pi}{2}$.`, sol: 'Each domain comes from the zeros of the denominator, each range from $|\\sin x| \\le 1$ or $|\\cos x| \\le 1$.', scheme: [['(a) $\\tan x$ domain and range', 1], ['(a) $\\cot x$ domain and range', 1], ['(a) $\\sec x$ domain and range', 1], ['(a) $\\operatorname{cosec} x$ domain and range', 1], ['(b) Range $(-\\infty, 1] \\cup [3, \\infty)$', 1]], d: 3, c: 'understanding', t: [4], time: 400 }), (C) => { C.assert(inSet && hits && g(PI / 2) === 1, 'range of 2 - cosec x'); C.model([2, 1, 3, '(-\\infty, 1] \\cup [3, \\infty)']); });
}
{
  const th = rad(110), R = 48, rr = 30;
  const arcO = R * th, arcI = rr * th, area = 0.5 * th * (R * R - rr * rr);
  const [p, q] = toPi(110);
  Q('l08', mk.long({ stem: r`A wiper arm of an imagined bus pivots at a point $O$. Its blade runs from $30$ cm to $48$ cm away from $O$ and sweeps through an angle of $110^\circ$ across the windscreen. Use $\pi = 3.14159$ where a decimal is needed.

(a) Express the angle of the sweep in radians. [1]

(b) Find the lengths of the arcs traced by the outer end and by the inner end of the blade. [2]

(c) Find the area of the windscreen cleaned by the blade. [2]`, model: `(a) $110^\\circ = 110 \\times \\dfrac{\\pi}{180} = \\dfrac{${p}\\pi}{${q}}$ radians.

(b) With $l = r\\theta$, the outer end traces $48 \\times \\dfrac{11\\pi}{18} = \\dfrac{88\\pi}{3} \\approx ${f2(arcO)}$ cm, and the inner end traces $30 \\times \\dfrac{11\\pi}{18} = \\dfrac{55\\pi}{3} \\approx ${f2(arcI)}$ cm.

(c) The cleaned region is the difference of two sectors with the same angle: $\\dfrac{1}{2}\\theta(48^2 - 30^2) = \\dfrac{1}{2} \\times \\dfrac{11\\pi}{18} \\times 1404 = 429\\pi \\approx ${f2(area)}$ cm$^2$.`, sol: 'Treat the cleaned region as the large sector minus the small sector with the same angle.', scheme: [['(a) $\\dfrac{11\\pi}{18}$ radians', 1], ['(b) Outer arc $\\dfrac{88\\pi}{3}$ cm', 1], ['(b) Inner arc $\\dfrac{55\\pi}{3}$ cm', 1], ['(c) $\\dfrac{1}{2}\\theta(48^2 - 30^2)$ set up', 1], ['(c) $429\\pi$ cm$^2$', 1]], d: 4, c: 'application', t: [1], time: 420 }), (C) => { C.assert(p === 11 && q === 18 && near(arcO, (88 * PI) / 3) && near(arcI, (55 * PI) / 3) && near(area, 429 * PI) && near(0.5 * th * R * R - 0.5 * th * rr * rr, 429 * PI), '11 pi / 18, 88 pi / 3, 55 pi / 3, 429 pi'); C.model([11, 18, 88, 55, 429, 1404]); });
}

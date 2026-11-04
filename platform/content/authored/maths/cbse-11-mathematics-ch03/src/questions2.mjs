// CBSE 11 Mathematics ch03 Trigonometric Functions — written items (short 2 and 3 marks, long 5 marks, case-based)
// with re-solve checks. Exact values inside model answers come from trig.mjs (surd arithmetic), fractions from Fr.
import { Q, caseQ, child, mk } from './lib.mjs';
import * as T from './trig.mjs';
import { plotF } from './figs.mjs';
import { r, $, rootsOf } from './questions.mjs';
const { fr, near, tx, val, eq, add, sub, mul, div, el, sinD, cosD, tanD, rad, deg, gridRad, toPi, piT } = T;
const PI = Math.PI;
const sgn = (v) => (v > 1e-12 ? '+' : v < -1e-12 ? '-' : '0');

// figure for s206: y = sin x on [0, 2 pi] with the zeros and the turning points marked
const figSin = plotF({ x: [-0.5, 6.8], y: [-1.5, 1.5], fns: [{ expr: 'sin(x)', label: '$y = \\sin x$', domain: [-0.3, 6.6] }], pts: [[0, 0, '(0, 0)'], [PI / 2, 1, '$\\left(\\dfrac{\\pi}{2}, 1\\right)$'], [PI, 0, '$(\\pi, 0)$'], [(3 * PI) / 2, -1, '$\\left(\\dfrac{3\\pi}{2}, -1\\right)$'], [2 * PI, 0, '$(2\\pi, 0)$']] }, 'The graph of y equals sine x for x from about minus 0.3 to 6.6, a little more than one full turn: it passes through the origin, rises to a peak of 1 at pi over 2, crosses the axis at pi, falls to a trough of minus 1 at 3 pi over 2 and returns to the axis at 2 pi.', r`$y = \sin x$, drawn a little beyond one full turn.`);
// figure for l03: sine and cosine, meeting at pi/4 and 5 pi/4
const figSC = plotF({ x: [-0.4, 6.7], y: [-1.5, 1.5], fns: [{ expr: 'sin(x)', label: '$y = \\sin x$', domain: [0, 2 * PI] }, { expr: 'cos(x)', label: '$y = \\cos x$', domain: [0, 2 * PI] }], pts: [[PI / 4, Math.SQRT1_2, '$P$'], [(5 * PI) / 4, -Math.SQRT1_2, '$Q$']] }, 'The graphs of sine x and cosine x for x from 0 to 2 pi on the same axes. Cosine starts at 1 and sine at 0. They cross at the point P in the first half-turn, above the axis, and again at the point Q near x equal to 3.9, below the axis.', r`$y = \sin x$ and $y = \cos x$ meet at the points $P$ and $Q$.`);
export const figs = { figSin, figSC };

// =============================================================== short answer, 2 marks
{
  const a = toPi(252);
  Q('s201', mk.short({ marks: 2, stem: r`Express $252^\circ$ in radians, and $\dfrac{11\pi}{18}$ radians in degrees.`, model: r`$252^\circ = 252 \times \dfrac{\pi}{180} = \dfrac{${a[0]}\pi}{${a[1]}}$ radians.\n\n$\dfrac{11\pi}{18}$ radians $= \dfrac{11\pi}{18} \times \dfrac{180}{\pi} = 110^\circ$.`, sol: 'Multiply by the conversion factor that cancels the unit you start with.', scheme: [['252° = 7π/5 radians', 1], ['11π/18 radians = 110°', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(a[0] === 7 && a[1] === 5 && near(deg((11 * PI) / 18), 110), '7 pi / 5 and 110'); C.model([7, 5, 110]); });
}
{
  const th = 147 / 21, revs = th / (2 * PI);
  Q('s202', mk.short({ marks: 2, stem: r`A toy trolley's wheel of radius $21$ cm rolls without slipping along a track in an imagined school laboratory and covers $1.47$ m. Find the angle through which the wheel turns, in radians, and the number of revolutions to two decimal places.`, model: r`Distance $= 1.47$ m $= 147$ cm. For rolling, $l = r\theta$, so $\theta = \dfrac{147}{21} = 7$ radians.\n\nOne revolution is $2\pi$ radians, so the number of revolutions is $\dfrac{7}{2\pi} = 1.11$ (to two decimal places).`, sol: 'Arc length equals distance rolled; then divide by 2 pi for turns.', scheme: [['θ = 7 radians', 1], ['7/(2π) ≈ 1.11 revolutions', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.assert(th === 7 && near(revs, 1.1141, 1e-3) && Math.round(revs * 100) / 100 === 1.11, '7 radians, 1.11 revolutions'); C.model([7, 1.11, 147]); });
}
{
  const s = Math.sin(rad(200)), c = Math.cos(rad(200)), t = Math.tan(rad(200));
  Q('s203', mk.short({ marks: 2, stem: r`Without a calculator, state the signs of $\sin 200^\circ$, $\cos 200^\circ$ and $\tan 200^\circ$, and hence the sign of their product.`, model: r`$200^\circ = 180^\circ + 20^\circ$ lies in the third quadrant. There the point of the unit circle has both coordinates negative, so $\sin 200^\circ < 0$ and $\cos 200^\circ < 0$, and $\tan 200^\circ = \dfrac{\sin 200^\circ}{\cos 200^\circ} > 0$.\n\nProduct: (negative)(negative)(positive) is **positive**.`, sol: 'Locate the quadrant first.', scheme: [['third quadrant: sin < 0, cos < 0, tan > 0', 1], ['product is positive', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert(sgn(s) === '-' && sgn(c) === '-' && sgn(t) === '+' && sgn(s * c * t) === '+', 'signs - - + and product +'); C.model(['third quadrant', 'positive']); });
}
{
  const c = fr(-8, 17), s = fr(-15, 17), t = s.div(c);
  Q('s204', mk.short({ marks: 2, stem: r`If $\cos\theta = -\dfrac{8}{17}$ and $\theta$ lies in the third quadrant, find $\sin\theta$ and $\tan\theta$.`, model: r`$\sin^2\theta = 1 - \dfrac{64}{289} = \dfrac{225}{289}$. In the third quadrant sine is negative, so $\sin\theta = -\dfrac{15}{17}$.\n\n$\tan\theta = \dfrac{\sin\theta}{\cos\theta} = \dfrac{-15/17}{-8/17} = \dfrac{15}{8}$.`, sol: 'Use sin squared + cos squared = 1, then fix the sign by the quadrant.', scheme: [['sin θ = −15/17 with the sign justified', 1], ['tan θ = 15/8', 1]], d: 2, c: 'application', t: [2], time: 100 }), (C) => { const th = PI + Math.acos(8 / 17); C.assert(near(Math.cos(th), -8 / 17) && near(Math.sin(th), -15 / 17) && near(Math.tan(th), 15 / 8) && t.eq(fr(15, 8)) && s.eq(fr(-15, 17)) && c.mul(c).add(s.mul(s)).eq(fr(1)), 'sin = -15/17, tan = 15/8'); C.model([15, 17, 8]); });
}
{
  const v = mul(cosD(225), sinD(300));
  Q('s205', mk.short({ marks: 2, stem: r`Find the exact value of $\cos 225^\circ \cdot \sin 300^\circ$.`, model: r`$225^\circ$ is in quadrant III with reference angle $45^\circ$, so $\cos 225^\circ = -\cos 45^\circ = -\dfrac{\sqrt{2}}{2}$.\n\n$300^\circ$ is in quadrant IV with reference angle $60^\circ$, so $\sin 300^\circ = -\sin 60^\circ = -\dfrac{\sqrt{3}}{2}$.\n\nProduct: $\left(-\dfrac{\sqrt{2}}{2}\right)\left(-\dfrac{\sqrt{3}}{2}\right) = ${tx(v)}$.`, sol: 'Reference angle and sign for each factor.', scheme: [['both values with the correct signs', 1], ['product √6/4', 1]], d: 2, c: 'application', t: [2], time: 90 }), (C) => { C.assert(near(val(v), Math.cos(rad(225)) * Math.sin(rad(300))) && eq(v, el(0, 0, 0, fr(1, 4))), 'sqrt6/4'); C.model([6, 4, 2]); });
}
{
  Q('s206', mk.short({ marks: 2, stem: r`The figure shows the graph of $y = \sin x$. For $0 \le x \le 2\pi$, write the interval in which $\sin x$ is decreasing, and give the least value of $\sin x$ with the value of $x$ at which it occurs.`, assets: [figSin], model: r`Reading the graph, the curve falls from its peak at $x = \dfrac{\pi}{2}$ to its trough at $x = \dfrac{3\pi}{2}$, so $\sin x$ is decreasing for $\dfrac{\pi}{2} \le x \le \dfrac{3\pi}{2}$.\n\nThe least value is $-1$, at $x = \dfrac{3\pi}{2}$.`, sol: 'Peak to trough is the falling part.', scheme: [['decreasing on [π/2, 3π/2]', 1], ['least value −1 at x = 3π/2', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { const xs = Array.from({ length: 2000 }, (_, k) => (k * 2 * PI) / 2000); const dn = xs.filter((x) => Math.sin(x + 1e-6) < Math.sin(x)); C.assert(near(Math.min(...dn), PI / 2, 5e-3) && near(Math.max(...dn), (3 * PI) / 2, 5e-3) && near(Math.min(...xs.map(Math.sin)), -1, 1e-6) && near(Math.sin((3 * PI) / 2), -1), 'decreasing on [pi/2, 3pi/2], min -1'); C.model(['-1']); });
}
{
  const v = sub(mul(cosD(120), cosD(45)), mul(sinD(120), sinD(45)));
  Q('s207', mk.short({ marks: 2, stem: r`Using $165^\circ = 120^\circ + 45^\circ$, find the exact value of $\cos 165^\circ$.`, model: r`$\cos 165^\circ = \cos(120^\circ + 45^\circ) = \cos 120^\circ\cos 45^\circ - \sin 120^\circ\sin 45^\circ$\n\n$= \left(-\dfrac{1}{2}\right)\dfrac{\sqrt{2}}{2} - \dfrac{\sqrt{3}}{2}\cdot\dfrac{\sqrt{2}}{2} = ${tx(v)}$.`, sol: 'cos(x + y) has a minus between the products; the angle 120 degrees is in quadrant II.', scheme: [['formula with the four values and their signs', 1], ['simplified to −(√6 + √2)/4', 1]], d: 2, c: 'application', t: [3], time: 100 }), (C) => { C.assert(eq(v, cosD(165)) && near(val(v), Math.cos(rad(165))) && eq(v, T.neg(cosD(15))), 'cos 165 exact'); C.model([6, 2, 4]); });
}
{
  const t = fr(2, 7), v = fr(2).mul(t).div(fr(1).sub(t.mul(t)));
  Q('s208', mk.short({ marks: 2, stem: r`If $\tan x = \dfrac{2}{7}$, find $\tan 2x$.`, model: r`$\tan 2x = \dfrac{2\tan x}{1 - \tan^2 x} = \dfrac{2 \cdot \frac{2}{7}}{1 - \frac{4}{49}} = \dfrac{4/7}{45/49} = \dfrac{4}{7}\times\dfrac{49}{45} = ${v.tex()}$.`.replace(r`\dfrac{2 \cdot \frac{2}{7}}{1 - \frac{4}{49}}`, r`\dfrac{2 \cdot \dfrac{2}{7}}{1 - \dfrac{4}{49}}`), sol: 'Double-angle formula for the tangent.', scheme: [['formula with tan x = 2/7 substituted', 1], ['28/45', 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => { C.assert(v.eq(fr(28, 45)) && near(Math.tan(2 * Math.atan(2 / 7)), 28 / 45), '28/45'); C.model([28, 45]); });
}
{
  const xs = rootsOf((x) => Math.tan(x) + 1, 0, 2 * PI);
  const all = rootsOf((x) => Math.tan(x) + 1, -10, 10);
  const gen = []; for (let n = -6; n <= 6; n++) { const z = n * PI - PI / 4; if (z >= -10 && z <= 10) gen.push(z); }
  Q('s209', mk.short({ marks: 2, stem: r`Write the general solution of $\tan x = -1$, and list the solutions that lie in $0 \le x \le 2\pi$. (Formative topic.)`, model: r`$\tan x = -1 = \tan\left(-\dfrac{\pi}{4}\right)$, and $\tan$ has period $\pi$, so $x = n\pi - \dfrac{\pi}{4}$, $n \in \mathbb{Z}$.\n\nTaking $n = 1$ and $n = 2$ gives $x = \dfrac{3\pi}{4}$ and $x = \dfrac{7\pi}{4}$ in $[0, 2\pi]$.`, sol: 'tan x = tan a gives x = n pi + a.', scheme: [['general solution x = nπ − π/4', 1], ['3π/4 and 7π/4', 1]], d: 2, c: 'application', t: [4], time: 90 }), (C) => { C.assert(all.length === gen.length && all.every((z, i) => near(z, gen[i], 1e-6)), 'solutions are exactly n pi - pi/4'); C.assert(xs.length === 2 && near(xs[0], (3 * PI) / 4, 1e-6) && near(xs[1], (7 * PI) / 4, 1e-6), '3pi/4 and 7pi/4'); C.model([3, 7, 4]); });
}

// =============================================================== short answer, 3 marks
{
  const rest = fr(1).sub(fr(1, 5)).sub(fr(1, 3));
  Q('s301', mk.short({ marks: 3, stem: r`Two angles of a triangle are $\dfrac{\pi}{5}$ and $\dfrac{\pi}{3}$ radians. Find the third angle in radians and in degrees.`, model: r`The three angles add up to $\pi$ radians, so the third angle is $\pi - \dfrac{\pi}{5} - \dfrac{\pi}{3} = \pi\left(1 - \dfrac{3}{15} - \dfrac{5}{15}\right) = \dfrac{7\pi}{15}$ radians.\n\nIn degrees: $\dfrac{7\pi}{15} \times \dfrac{180}{\pi} = 84^\circ$.\n\nCheck: $36^\circ + 60^\circ + 84^\circ = 180^\circ$.`, sol: 'Angle sum is pi radians.', scheme: [['angle sum π radians used', 1], ['third angle 7π/15', 1], ['84°', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { C.assert(rest.eq(fr(7, 15)) && near(deg((7 * PI) / 15), 84) && near(deg(PI / 5) + deg(PI / 3) + 84, 180), '7pi/15 = 84 degrees'); C.model([7, 15, 84, 36, 60]); });
}
{
  const d = 6400 * rad(9);
  Q('s302', mk.short({ marks: 3, stem: r`Two imagined observatories lie on the same meridian of the Earth, with latitudes differing by $9^\circ$. Taking the radius of the Earth as $6400$ km and $\pi = 3.14159$, find the distance between them along the meridian to the nearest kilometre.`, model: r`The meridian is a great circle, so the distance is an arc of radius $6400$ km.\n\n$9^\circ = 9 \times \dfrac{\pi}{180} = \dfrac{\pi}{20}$ radian.\n\n$l = r\theta = 6400 \times \dfrac{3.14159}{20} = 320 \times 3.14159 = 1005$ km (nearest km).`, sol: 'Convert to radians, then use l = r theta.', scheme: [['angle in radians π/20', 1], ['l = rθ with r = 6400', 1], ['1005 km', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { C.assert(near(d, 320 * PI) && Math.round(320 * 3.14159) === 1005, '1005 km'); C.model([6400, 20, 1005]); });
}
{
  // tan t = -8/15, quadrant IV: r = 17
  const cs = fr(15, 17), sn = fr(-8, 17);
  const th = Math.atan(-8 / 15);
  Q('s303', mk.short({ marks: 3, stem: r`Given $\tan\theta = -\dfrac{8}{15}$ and $\theta$ in the fourth quadrant, find the values of $\sin\theta$, $\cos\theta$, $\operatorname{cosec}\theta$, $\sec\theta$ and $\cot\theta$.`, model: r`Since $\sec^2\theta = 1 + \tan^2\theta = 1 + \dfrac{64}{225} = \dfrac{289}{225}$, and cosine is positive in the fourth quadrant, $\sec\theta = \dfrac{17}{15}$ and $\cos\theta = \dfrac{15}{17}$.\n\n$\sin\theta = \tan\theta\cos\theta = -\dfrac{8}{15}\cdot\dfrac{15}{17} = -\dfrac{8}{17}$, so $\operatorname{cosec}\theta = -\dfrac{17}{8}$.\n\n$\cot\theta = \dfrac{1}{\tan\theta} = -\dfrac{15}{8}$.`, sol: 'Use 1 + tan squared = sec squared; cosine is positive in quadrant IV.', scheme: [['sec θ = 17/15 and cos θ = 15/17 with sign reason', 1], ['sin θ = −8/17 and cosec θ = −17/8', 1], ['cot θ = −15/8', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { C.assert(near(Math.cos(th), 15 / 17) && near(Math.sin(th), -8 / 17) && near(1 / Math.sin(th), -17 / 8) && near(1 / Math.cos(th), 17 / 15) && near(1 / Math.tan(th), -15 / 8) && cs.mul(cs).add(sn.mul(sn)).eq(fr(1)), 'six ratios'); C.model([17, 15, 8]); });
}
{
  const v = sub(mul(sinD(780), cosD(390)), mul(cosD(120), sinD(-30)));
  Q('s304', mk.short({ marks: 3, stem: r`Evaluate $\sin 780^\circ\cos 390^\circ - \cos 120^\circ\sin(-30^\circ)$ exactly.`, model: r`Reduce by whole turns: $\sin 780^\circ = \sin(2 \cdot 360^\circ + 60^\circ) = \sin 60^\circ = \dfrac{\sqrt{3}}{2}$ and $\cos 390^\circ = \cos 30^\circ = \dfrac{\sqrt{3}}{2}$.\n\n$\cos 120^\circ = -\dfrac{1}{2}$ and $\sin(-30^\circ) = -\sin 30^\circ = -\dfrac{1}{2}$.\n\nValue: $\dfrac{\sqrt{3}}{2}\cdot\dfrac{\sqrt{3}}{2} - \left(-\dfrac{1}{2}\right)\left(-\dfrac{1}{2}\right) = \dfrac{3}{4} - \dfrac{1}{4} = \dfrac{1}{2}$.`, sol: 'Periodicity first, then reference angles.', scheme: [['780° and 390° reduced', 1], ['cos 120° and sin(−30°) with signs', 1], ['value 1/2', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => { C.assert(eq(v, fr(1, 2)) && near(Math.sin(rad(780)) * Math.cos(rad(390)) - Math.cos(rad(120)) * Math.sin(rad(-30)), 0.5), 'value 1/2'); C.model([780, 390, 3, 4, 1, 2]); });
}
{
  const v = div(mul(sinD(120), cosD(150)), tanD(315));
  Q('s305', mk.short({ marks: 3, stem: r`Find the exact value of $\dfrac{\sin\frac{2\pi}{3}\cos\frac{5\pi}{6}}{\tan\frac{7\pi}{4}}$.`.replace(r`\dfrac{\sin\frac{2\pi}{3}\cos\frac{5\pi}{6}}{\tan\frac{7\pi}{4}}`, r`\dfrac{\sin\dfrac{2\pi}{3}\cos\dfrac{5\pi}{6}}{\tan\dfrac{7\pi}{4}}`), model: r`In degrees the angles are $\dfrac{2\pi}{3} = 120^\circ$, $\dfrac{5\pi}{6} = 150^\circ$ and $\dfrac{7\pi}{4} = 315^\circ$.\n\n$\sin 120^\circ = \dfrac{\sqrt{3}}{2}$ (quadrant II), $\cos 150^\circ = -\dfrac{\sqrt{3}}{2}$ (quadrant II), $\tan 315^\circ = -1$ (quadrant IV).\n\nValue $= \dfrac{\frac{\sqrt{3}}{2}\cdot\left(-\frac{\sqrt{3}}{2}\right)}{-1} = \dfrac{-3/4}{-1} = \dfrac{3}{4}$.`.replace(r`\dfrac{\frac{\sqrt{3}}{2}\cdot\left(-\frac{\sqrt{3}}{2}\right)}{-1}`, r`\dfrac{\dfrac{\sqrt{3}}{2}\cdot\left(-\dfrac{\sqrt{3}}{2}\right)}{-1}`), sol: 'Convert to degrees, reference angles, signs.', scheme: [['angles in degrees', 1], ['three exact values with signs', 1], ['value 3/4', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => { C.assert(eq(v, fr(3, 4)) && near(Math.sin((2 * PI) / 3) * Math.cos((5 * PI) / 6) / Math.tan((7 * PI) / 4), 0.75), '3/4'); C.model([120, 150, 315, 3, 4]); });
}
{
  Q('s306', mk.short({ marks: 3, stem: r`Prove that $\cos(x + y)\cos(x - y) = \cos^2 x - \sin^2 y$.`, model: r`Expand both factors: $(\cos x\cos y - \sin x\sin y)(\cos x\cos y + \sin x\sin y) = \cos^2 x\cos^2 y - \sin^2 x\sin^2 y$.\n\nReplace $\cos^2 y = 1 - \sin^2 y$ and $\sin^2 x = 1 - \cos^2 x$:\n\n$\cos^2 x(1 - \sin^2 y) - (1 - \cos^2 x)\sin^2 y = \cos^2 x - \cos^2 x\sin^2 y - \sin^2 y + \cos^2 x\sin^2 y = \cos^2 x - \sin^2 y$.`, sol: 'Difference of two squares after the expansions.', scheme: [['both brackets expanded', 1], ['product as difference of squares', 1], ['substitution and cancellation', 1]], d: 3, c: 'analysis', t: [3], time: 150 }), (C) => { C.assert(T.holds2((x, y) => Math.cos(x + y) * Math.cos(x - y), (x, y) => Math.cos(x) ** 2 - Math.sin(y) ** 2), 'identity at 1,000+ pairs'); C.model(['\\cos^2 x - \\sin^2 y']); });
}
{
  const v = tanD(75);
  const e = add(el(2), el(0, 0, 1));
  Q('s307', mk.short({ marks: 3, stem: r`Use $75^\circ = 45^\circ + 30^\circ$ to show that $\tan 75^\circ = 2 + \sqrt{3}$.`, model: r`$\tan 75^\circ = \dfrac{\tan 45^\circ + \tan 30^\circ}{1 - \tan 45^\circ\tan 30^\circ} = \dfrac{1 + \frac{1}{\sqrt{3}}}{1 - \frac{1}{\sqrt{3}}} = \dfrac{\sqrt{3} + 1}{\sqrt{3} - 1}$.\n\nMultiply top and bottom by $\sqrt{3} + 1$: $\dfrac{(\sqrt{3} + 1)^2}{3 - 1} = \dfrac{4 + 2\sqrt{3}}{2} = 2 + \sqrt{3}$.`.replace(r`\dfrac{1 + \frac{1}{\sqrt{3}}}{1 - \frac{1}{\sqrt{3}}}`, r`\dfrac{1 + \dfrac{1}{\sqrt{3}}}{1 - \dfrac{1}{\sqrt{3}}}`), sol: 'Rationalise the denominator.', scheme: [['tan(x + y) formula with the standard values', 1], ['reduced to (√3 + 1)/(√3 − 1)', 1], ['rationalised to 2 + √3', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => { C.assert(eq(v, e) && near(Math.tan(rad(75)), 2 + Math.sqrt(3)) && eq(div(add(tanD(45), tanD(30)), sub(el(1), mul(tanD(45), tanD(30)))), e), 'tan 75 = 2 + sqrt3'); C.model([2, 3, 4]); });
}
{
  const a = fr(1, 5), b = fr(2, 3);
  const t = a.add(b).div(fr(1).sub(a.mul(b)));
  Q('s308', mk.short({ marks: 3, stem: r`The acute angles $x$ and $y$ satisfy $\tan x = \dfrac{1}{5}$ and $\tan y = \dfrac{2}{3}$. Show that $x + y = \dfrac{\pi}{4}$.`, model: r`$\tan(x + y) = \dfrac{\tan x + \tan y}{1 - \tan x\tan y} = \dfrac{\frac{1}{5} + \frac{2}{3}}{1 - \frac{1}{5}\cdot\frac{2}{3}} = \dfrac{13/15}{13/15} = 1$.\n\nBoth angles are acute, so $0 < x + y < \pi$, and the only angle in this interval whose tangent is $1$ is $\dfrac{\pi}{4}$ (the next one, $\dfrac{5\pi}{4}$, is too large). Hence $x + y = \dfrac{\pi}{4}$.`.replace(r`\dfrac{\frac{1}{5} + \frac{2}{3}}{1 - \frac{1}{5}\cdot\frac{2}{3}}`, r`\dfrac{\dfrac{1}{5} + \dfrac{2}{3}}{1 - \dfrac{1}{5}\cdot\dfrac{2}{3}}`), sol: 'Find tan(x + y), then say why the angle is pi/4.', scheme: [['tan(x + y) formula', 1], ['value 1', 1], ['range of x + y used to conclude π/4', 1]], d: 4, c: 'analysis', t: [3], time: 140 }), (C) => { C.assert(t.eq(fr(1)) && near(Math.atan(0.2) + Math.atan(2 / 3), PI / 4) && fr(1, 5).mul(fr(2, 3)).v < 1, 'x + y = pi/4'); C.model([13, 15, 5]); });
}

// =============================================================== long answer, 5 marks
{
  const a = toPi(105), b = toPi(-225);
  const d1 = deg((11 * PI) / 9), d2 = deg((-7 * PI) / 6);
  const l = 900 * rad(40);
  Q('l01', mk.long({ stem: r`(a) Express $105^\circ$ and $-225^\circ$ in radians.\n\n(b) Express $\dfrac{11\pi}{9}$ and $-\dfrac{7\pi}{6}$ radians in degrees.\n\n(c) A railway curve in an imagined layout is an arc of a circle of radius $900$ m and subtends $40^\circ$ at the centre. Find its length to the nearest metre, taking $\pi = 3.14159$.`, model: r`**(a)** $105^\circ = 105 \times \dfrac{\pi}{180} = \dfrac{7\pi}{12}$ radians; $-225^\circ = -225 \times \dfrac{\pi}{180} = -\dfrac{5\pi}{4}$ radians.\n\n**(b)** $\dfrac{11\pi}{9} \times \dfrac{180}{\pi} = 220^\circ$; $-\dfrac{7\pi}{6} \times \dfrac{180}{\pi} = -210^\circ$.\n\n**(c)** $40^\circ = \dfrac{2\pi}{9}$ radians, so $l = r\theta = 900 \times \dfrac{2\pi}{9} = 200\pi = 200 \times 3.14159 = 628$ m (nearest metre).`, sol: 'Radian = degree x pi/180; degree = radian x 180/pi; l = r theta.', scheme: [['(a) 7π/12 and −5π/4', 1.5], ['(b) 220° and −210°', 1.5], ['(c) angle 2π/9 radians', 1], ['(c) length 628 m', 1]], d: 3, c: 'application', t: [1], time: 330 }), (C) => { C.assert(a.join() === '7,12' && b.join() === '-5,4' && near(d1, 220) && near(d2, -210) && near(l, 200 * PI) && Math.round(200 * 3.14159) === 628, 'conversions and 628 m'); C.model([7, 12, 5, 4, 220, 210, 628]); });
}
{
  const P1 = [cosD(120), sinD(120)], P2 = [cosD(315), sinD(315)];
  const d = (P) => add(mul(P[0], P[0]), mul(P[1], P[1]));
  Q('l02', mk.long({ stem: r`The point $P(\theta)$ of the unit circle is reached by turning through $\theta$ anticlockwise from the point $(1, 0)$.\n\n(a) Write the exact coordinates of $P(120^\circ)$ and $P(315^\circ)$.\n\n(b) Hence write $\sin\theta$, $\cos\theta$ and $\tan\theta$ for $\theta = 120^\circ$ and for $\theta = 315^\circ$.\n\n(c) Verify that each point is at distance $1$ from the origin.`, model: r`**(a)** $P(\theta) = (\cos\theta, \sin\theta)$. For $120^\circ$ (quadrant II, reference angle $60^\circ$): $P = \left(-\dfrac{1}{2}, \dfrac{\sqrt{3}}{2}\right)$. For $315^\circ$ (quadrant IV, reference angle $45^\circ$): $P = \left(\dfrac{\sqrt{2}}{2}, -\dfrac{\sqrt{2}}{2}\right)$.\n\n**(b)** $\theta = 120^\circ$: $\sin\theta = \dfrac{\sqrt{3}}{2}$, $\cos\theta = -\dfrac{1}{2}$, $\tan\theta = \dfrac{\sqrt{3}/2}{-1/2} = -\sqrt{3}$.\n$\theta = 315^\circ$: $\sin\theta = -\dfrac{\sqrt{2}}{2}$, $\cos\theta = \dfrac{\sqrt{2}}{2}$, $\tan\theta = -1$.\n\n**(c)** $\left(-\dfrac{1}{2}\right)^2 + \left(\dfrac{\sqrt{3}}{2}\right)^2 = \dfrac{1}{4} + \dfrac{3}{4} = 1$ and $\left(\dfrac{\sqrt{2}}{2}\right)^2 + \left(-\dfrac{\sqrt{2}}{2}\right)^2 = \dfrac{1}{2} + \dfrac{1}{2} = 1$, so both distances are $\sqrt{1} = 1$.`, sol: 'Coordinates of P are (cos, sin); then check x squared + y squared.', scheme: [['(a) coordinates of both points', 1.5], ['(b) three ratios at 120°', 1], ['(b) three ratios at 315°', 1], ['(c) both sums equal 1', 1.5]], d: 3, c: 'application', t: [2], time: 360 }), (C) => { C.assert(eq(P1[0], fr(-1, 2)) && eq(P1[1], el(0, 0, fr(1, 2))) && eq(P2[0], el(0, fr(1, 2))) && eq(P2[1], el(0, fr(-1, 2))), 'coordinates'); C.assert(eq(tanD(120), el(0, 0, -1)) && eq(tanD(315), el(-1)), 'tangents -sqrt3 and -1'); C.assert(eq(d(P1), el(1)) && eq(d(P2), el(1)), 'distance 1'); C.model([120, 315, 3, 2, 1]); });
}
{
  const rs = rootsOf((x) => Math.sin(x) - Math.cos(x), 0, 2 * PI);
  const yP = Math.sin(PI / 4), yQ = Math.sin((5 * PI) / 4);
  const xs = Array.from({ length: 4000 }, (_, k) => 0.0007 + (k * (2 * PI - 0.0014)) / 4000);
  const dec = xs.filter((x) => Math.sin(x) > Math.cos(x));
  Q('l03', mk.long({ stem: r`The figure shows the graphs of $y = \sin x$ and $y = \cos x$ for $0 \le x \le 2\pi$. They meet at the points $P$ and $Q$.\n\n(a) Show that at a meeting point $\tan x = 1$, and find the $x$-coordinates of $P$ and $Q$.\n\n(b) Find the exact $y$-coordinates of $P$ and $Q$.\n\n(c) For which values of $x$ in $[0, 2\pi]$ is $\sin x > \cos x$?`, assets: [figSC], model: r`**(a)** At a meeting point $\sin x = \cos x$. There $\cos x \ne 0$ (otherwise $\sin x$ would be $\pm 1$ as well), so dividing gives $\tan x = 1$. In $[0, 2\pi]$ the solutions are $x = \dfrac{\pi}{4}$ and $x = \pi + \dfrac{\pi}{4} = \dfrac{5\pi}{4}$.\n\n**(b)** At $P$: $y = \sin\dfrac{\pi}{4} = \dfrac{\sqrt{2}}{2}$. At $Q$ (third quadrant): $y = \sin\dfrac{5\pi}{4} = -\dfrac{\sqrt{2}}{2}$.\n\n**(c)** Between the meeting points the sine curve lies above the cosine curve, as the figure shows (at $x = \dfrac{\pi}{2}$, $\sin x = 1 > 0 = \cos x$). So $\sin x > \cos x$ for $\dfrac{\pi}{4} < x < \dfrac{5\pi}{4}$.`, sol: 'Dividing by cos x gives tan x = 1; read the order of the curves between the crossings.', scheme: [['(a) tan x = 1 with the reason for dividing', 1], ['(a) x = π/4 and 5π/4', 0.5], ['(b) y-coordinates ±√2/2', 1.5], ['(c) interval (π/4, 5π/4)', 2]], d: 3, c: 'analysis', t: [2], time: 360 }), (C) => { C.assert(rs.length === 2 && near(rs[0], PI / 4, 1e-6) && near(rs[1], (5 * PI) / 4, 1e-6), 'x = pi/4, 5pi/4'); C.assert(near(yP, Math.SQRT1_2) && near(yQ, -Math.SQRT1_2) && eq(sinD(225), el(0, fr(-1, 2))), 'y = +-sqrt2/2'); C.assert(dec.every((x) => x > PI / 4 - 1e-3 && x < (5 * PI) / 4 + 1e-3) && xs.filter((x) => x > PI / 4 + 1e-3 && x < (5 * PI) / 4 - 1e-3).every((x) => Math.sin(x) > Math.cos(x)), 'sin > cos exactly between'); C.model([4, 5, 1, 2]); });
}
{
  const a = sinD(-1020), b = cosD(495), c = tanD(1305);
  Q('l04', mk.long({ stem: r`(a) Use the unit circle to simplify $\sin\left(\dfrac{\pi}{2} + x\right)$, $\cos(\pi + x)$ and $\tan(2\pi - x)$ in terms of $\sin x$, $\cos x$ or $\tan x$.\n\n(b) Find the exact values of $\sin(-1020^\circ)$, $\cos 495^\circ$ and $\tan 1305^\circ$.`, model: r`**(a)** Turning a quarter-turn more than $x$ swaps the roles of the coordinates: $\sin\left(\dfrac{\pi}{2} + x\right) = \cos x$. Turning half a turn more reverses both coordinates: $\cos(\pi + x) = -\cos x$. The angle $2\pi - x$ is the reflection of $x$ in the horizontal axis, so sine changes sign and cosine does not: $\tan(2\pi - x) = -\tan x$.\n\n**(b)** $-1020^\circ + 3 \times 360^\circ = 60^\circ$, so $\sin(-1020^\circ) = \sin 60^\circ = ${tx(a)}$.\n\n$495^\circ - 360^\circ = 135^\circ$, in quadrant II where cosine is negative: $\cos 495^\circ = -\cos 45^\circ = ${tx(b)}$.\n\n$1305^\circ = 7 \times 180^\circ + 45^\circ$ and tangent has period $180^\circ$, so $\tan 1305^\circ = \tan 45^\circ = ${tx(c)}$.`, sol: 'Reduce by whole turns (or half turns for tangent), then use the reference angle.', scheme: [['(a) sin(π/2 + x) = cos x and cos(π + x) = −cos x', 1], ['(a) tan(2π − x) = −tan x', 1], ['(b) sin(−1020°) = √3/2', 1], ['(b) cos 495° = −√2/2', 1], ['(b) tan 1305° = 1', 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => { C.assert(T.holds1((x) => Math.sin(PI / 2 + x), Math.cos) && T.holds1((x) => Math.cos(PI + x), (x) => -Math.cos(x)) && T.holds1((x) => Math.tan(2 * PI - x), (x) => -Math.tan(x)), '(a) identities'); C.assert(eq(a, el(0, 0, fr(1, 2))) && eq(b, el(0, fr(-1, 2))) && eq(c, el(1)) && near(Math.sin(rad(-1020)), val(a)) && near(Math.cos(rad(495)), val(b)) && near(Math.tan(rad(1305)), 1, 1e-6), '(b) values'); C.model([1020, 495, 1305, 60, 135, 45]); });
}
{
  const s = sinD(105), c = cosD(105), t = tanD(105);
  const one = add(mul(s, s), mul(c, c));
  const viaTan = div(add(tanD(60), tanD(45)), sub(el(1), mul(tanD(60), tanD(45))));
  Q('l05', mk.long({ stem: r`Use $105^\circ = 60^\circ + 45^\circ$ for the following.\n\n(a) Find the exact values of $\sin 105^\circ$ and $\cos 105^\circ$.\n\n(b) Hence, or by the tangent formula, show that $\tan 105^\circ = -(2 + \sqrt{3})$.\n\n(c) Verify that $\sin^2 105^\circ + \cos^2 105^\circ = 1$ using your exact values.`, model: r`**(a)** $\sin 105^\circ = \sin 60^\circ\cos 45^\circ + \cos 60^\circ\sin 45^\circ = \dfrac{\sqrt{3}}{2}\cdot\dfrac{\sqrt{2}}{2} + \dfrac{1}{2}\cdot\dfrac{\sqrt{2}}{2} = ${tx(s)}$.\n\n$\cos 105^\circ = \cos 60^\circ\cos 45^\circ - \sin 60^\circ\sin 45^\circ = \dfrac{1}{2}\cdot\dfrac{\sqrt{2}}{2} - \dfrac{\sqrt{3}}{2}\cdot\dfrac{\sqrt{2}}{2} = ${tx(c)}$.\n\n**(b)** $\tan 105^\circ = \dfrac{\sin 105^\circ}{\cos 105^\circ} = \dfrac{\sqrt{2} + \sqrt{6}}{\sqrt{2} - \sqrt{6}} = \dfrac{1 + \sqrt{3}}{1 - \sqrt{3}}$. Multiply by $\dfrac{1 + \sqrt{3}}{1 + \sqrt{3}}$: $\dfrac{(1 + \sqrt{3})^2}{1 - 3} = \dfrac{4 + 2\sqrt{3}}{-2} = -(2 + \sqrt{3})$.\n\n**(c)** $\sin^2 105^\circ + \cos^2 105^\circ = \dfrac{(\sqrt{2} + \sqrt{6})^2 + (\sqrt{2} - \sqrt{6})^2}{16} = \dfrac{(8 + 2\sqrt{12}) + (8 - 2\sqrt{12})}{16} = \dfrac{16}{16} = 1$.`, sol: 'Expand with the sum formulae, rationalise for the tangent.', scheme: [['(a) sin 105° with the four standard values', 1], ['(a) cos 105°', 1], ['(b) ratio simplified and rationalised', 1.5], ['(c) squares added, surds cancel, result 1', 1.5]], d: 4, c: 'application', t: [3], time: 360 }), (C) => { C.assert(eq(s, sinD(105)) && eq(s, add(mul(sinD(60), cosD(45)), mul(cosD(60), sinD(45)))) && eq(c, sub(mul(cosD(60), cosD(45)), mul(sinD(60), sinD(45)))), '(a)'); C.assert(eq(t, el(-2, 0, -1)) && eq(viaTan, t) && eq(div(s, c), t), '(b) tan 105 = -(2 + sqrt3), two ways'); C.assert(eq(one, el(1)) && near(val(s) ** 2 + val(c) ** 2, 1), '(c)'); C.model([105, 60, 45, 16, 12, 2]); });
}
{
  const cx = fr(2, 3);
  const v = fr(4).mul(cx).mul(cx).mul(cx).sub(fr(3).mul(cx));
  const c20 = Math.cos(rad(20)), chk = 4 * c20 ** 3 - 3 * c20;
  Q('l06', mk.long({ stem: r`(a) Prove that $\cos 3x = 4\cos^3 x - 3\cos x$, starting from $\cos(2x + x)$.\n\n(b) Find $\cos 3x$ when $\cos x = \dfrac{2}{3}$.\n\n(c) Check the formula at $x = 20^\circ$, using $\cos 60^\circ = \dfrac{1}{2}$, with the left and right sides evaluated to three decimal places.`, model: r`**(a)** $\cos 3x = \cos(2x + x) = \cos 2x\cos x - \sin 2x\sin x$. Use $\cos 2x = 2\cos^2 x - 1$ and $\sin 2x = 2\sin x\cos x$:\n\n$\cos 3x = (2\cos^2 x - 1)\cos x - 2\sin^2 x\cos x$. Put $\sin^2 x = 1 - \cos^2 x$:\n\n$= 2\cos^3 x - \cos x - 2\cos x + 2\cos^3 x = 4\cos^3 x - 3\cos x$.\n\n**(b)** $\cos 3x = 4\left(\dfrac{2}{3}\right)^3 - 3\cdot\dfrac{2}{3} = \dfrac{32}{27} - 2 = ${v.tex()}$.\n\n**(c)** $\cos 20^\circ = 0.940$ (three decimals, more precisely $0.9397$). Then $4\cos^3 20^\circ - 3\cos 20^\circ = 4(0.8298) - 2.8191 = 0.500$, which equals $\cos 60^\circ = 0.500$.`, sol: 'Write 3x as 2x + x and reduce everything to cos x.', scheme: [['(a) cos(2x + x) expanded', 1], ['(a) double-angle values substituted', 1], ['(a) sin² x replaced, result 4cos³x − 3cos x', 1], ['(b) −22/27', 1], ['(c) numerical check giving 0.500 on both sides', 1]], d: 4, c: 'analysis', t: [3], time: 360 }), (C) => { C.assert(T.holds1((x) => Math.cos(3 * x), (x) => 4 * Math.cos(x) ** 3 - 3 * Math.cos(x)) && T.holds1((x) => Math.cos(2 * x + x), (x) => (2 * Math.cos(x) ** 2 - 1) * Math.cos(x) - 2 * Math.sin(x) ** 2 * Math.cos(x)), '(a) identity and the intermediate step'); C.assert(v.eq(fr(-22, 27)) && near(4 * (2 / 3) ** 3 - 2, -22 / 27), '(b) -22/27'); C.assert(near(c20, 0.9397, 1e-4) && near(chk, 0.5) && near(Math.cos(rad(60)), 0.5) && near(4 * 0.8298 - 2.8191, 0.5, 2e-3) && near(c20 ** 3, 0.8298, 1e-3), '(c) numeric check'); C.model([-22, 27, 0.5, 0.9397]); });
}
{
  const f = (x) => 4 * Math.sin(x) * Math.sin(PI / 3 - x) * Math.sin(PI / 3 + x);
  const prod = Math.sin(rad(20)) * Math.sin(rad(40)) * Math.sin(rad(80));
  Q('l07', mk.long({ stem: r`(a) Prove that $\sin 3x = 4\sin x\,\sin(60^\circ - x)\,\sin(60^\circ + x)$.\n\n(b) Hence find the exact value of $\sin 20^\circ\sin 40^\circ\sin 80^\circ$.`, model: r`**(a)** $\sin(60^\circ - x)\sin(60^\circ + x) = (\sin 60^\circ\cos x - \cos 60^\circ\sin x)(\sin 60^\circ\cos x + \cos 60^\circ\sin x) = \sin^2 60^\circ\cos^2 x - \cos^2 60^\circ\sin^2 x$.\n\nWith $\sin^2 60^\circ = \dfrac{3}{4}$ and $\cos^2 60^\circ = \dfrac{1}{4}$: $\dfrac{3}{4}(1 - \sin^2 x) - \dfrac{1}{4}\sin^2 x = \dfrac{3}{4} - \sin^2 x$.\n\nTherefore $4\sin x\sin(60^\circ - x)\sin(60^\circ + x) = 4\sin x\left(\dfrac{3}{4} - \sin^2 x\right) = 3\sin x - 4\sin^3 x = \sin 3x$.\n\n**(b)** Put $x = 20^\circ$: $\sin 60^\circ = 4\sin 20^\circ\sin 40^\circ\sin 80^\circ$, so $\sin 20^\circ\sin 40^\circ\sin 80^\circ = \dfrac{1}{4}\cdot\dfrac{\sqrt{3}}{2} = \dfrac{\sqrt{3}}{8}$.`, sol: 'Expand the product of the two outer factors first; the rest is the triple-angle formula.', scheme: [['(a) the two outer factors expanded', 1], ['(a) product reduced to 3/4 − sin² x', 1], ['(a) 4 sin x (3/4 − sin² x) = sin 3x', 1.5], ['(b) x = 20° substituted', 1], ['(b) value √3/8', 0.5]], d: 5, c: 'analysis', t: [3], time: 420 }), (C) => { C.assert(T.holds1((x) => Math.sin(3 * x), f) && T.holds1((x) => Math.sin(PI / 3 - x) * Math.sin(PI / 3 + x), (x) => 0.75 - Math.sin(x) ** 2), '(a) identity and the middle step'); C.assert(near(prod, Math.sqrt(3) / 8) && near(f(rad(20)), Math.sin(rad(60))), '(b) sqrt3/8'); C.model([60, 3, 4, 8, 20, 40, 80]); });
}

// =============================================================== case-based (1 + 1 + 2 marks, internal choice in part c)
{
  const r6 = 6, th = rad(105), arc = r6 * th;
  const o = [[7, 12], [7, 6], [105, 1], [5, 12]];
  caseQ('c01', {
    passage: r`A garden sprinkler (imagined) stands at a post and throws water $6$ m from the post. Its arm swings back and forth through an angle of $105^\circ$, wetting a sector-shaped patch of lawn. Use $\pi = 3.14159$ where a decimal is needed.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $11.00$ m. (c) (i) $2.5$ radians, about $143.24^\circ$. Or (ii) the arc stays $\dfrac{7\pi}{2}$ m.`,
    sol: r`(a) $105 \times \dfrac{\pi}{180} = \dfrac{7\pi}{12}$. (b) $l = 6 \times \dfrac{7\pi}{12} = \dfrac{7\pi}{2} = 11.00$. (c) (i) $\theta = \dfrac{15}{6} = 2.5$ rad. (ii) $9 \times \dfrac{7\pi}{18} = \dfrac{7\pi}{2}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The angle of the sweep, in radians, is', opts: o.map(([p, q]) => (q === 1 ? `$${p}\\pi$` : `$${piT(p, q)}$`)), key: 'a', sol: r`$105^\circ \times \dfrac{\pi}{180} = \dfrac{7\pi}{12}$ radians. Option (b) is the angle for $210^\circ$ and (c) is the number of degrees times $\pi$, which cannot be an angle this small.`, d: 2, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the length, in metres, of the curved edge of the wetted patch, to two decimal places.', value: 11, tol: 0.01, unit: 'm', sol: r`$l = r\theta = 6 \times \dfrac{7 \times 3.14159}{12} = 6 \times 1.83260 = 10.9956 = 11.00$ m.`, scheme: [['11.00', 1]], d: 2, c: 'application', t: [1], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** The gardener wants the curved edge to be $15$ m long with the same reach. Find the sweep angle in radians and, to two decimal places, in degrees.', model: r`$\theta = \dfrac{l}{r} = \dfrac{15}{6} = 2.5$ radians. In degrees: $2.5 \times \dfrac{180}{3.14159} = 143.24^\circ$.`, sol: 'Use theta = l/r, then convert.', scheme: [['θ = 2.5 radians', 1], ['143.24°', 1]], d: 3, c: 'application', t: [1], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** The sprinkler is moved so that its reach is $9$ m and the sweep is $70^\\circ$. Show that the curved edge keeps the same length $\\dfrac{7\\pi}{2}$ m.', model: r`$70^\circ = \dfrac{7\pi}{18}$ radians, so $l = 9 \times \dfrac{7\pi}{18} = \dfrac{7\pi}{2}$ m, the same as $6 \times \dfrac{7\pi}{12} = \dfrac{7\pi}{2}$ m.`, sol: 'Compare r times theta in both settings.', scheme: [['70° = 7π/18', 1], ['9 × 7π/18 = 7π/2', 1]], d: 3, c: 'analysis', t: [1], time: 120 }),
      ]),
    ],
  }, (C) => {
    C.child('a').which(o.map(([p, q]) => p / q), th / PI);
    C.child('b').val(arc, 0.01);
    C.child('c').assert(near(15 / 6, 2.5) && near(2.5 * 180 / 3.14159, 143.24, 1e-5), 'theta = 2.5, 143.24 degrees');
    C.child('c').model([2.5, 143.24]);
    C.child('cii').assert(near(9 * rad(70), arc) && near(arc, (7 * PI) / 2), 'same arc 7 pi / 2');
    C.child('cii').model([70, 18, 7, 2]);
  });
}
{
  const d = (t) => 6 - 2 * Math.cos((PI * t) / 6);
  const lowAt = rootsOf((t) => d(t) - 7, 0, 12);
  const mn = Math.min(...Array.from({ length: 2401 }, (_, k) => d(k / 100))), mx = Math.max(...Array.from({ length: 2401 }, (_, k) => d(k / 100)));
  const gt = Array.from({ length: 800 }, (_, k) => k / 20);
  const per12 = gt.every((t) => near(d(t + 12), d(t))) && [1, 2, 3, 4, 6].every((p) => !gt.every((t) => near(d(t + p), d(t))));
  caseQ('c02', {
    passage: r`The depth of water, in metres, at a small imagined harbour is modelled by $d(t) = 6 - 2\cos\dfrac{\pi t}{6}$, where $t$ is the number of hours after midnight and the angle is in radians.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $5$ m. (c) (i) $t = 4$ and $t = 8$. Or (ii) period $12$ hours; high tide (depth $8$ m) at $t = 6$ and $t = 18$.`,
    sol: r`(a) $\cos \le 1$ gives $d \ge 4$. (b) $d(2) = 6 - 2\cos\dfrac{\pi}{3} = 5$. (c) (i) $\cos\dfrac{\pi t}{6} = -\dfrac{1}{2}$ gives $\dfrac{\pi t}{6} = \dfrac{2\pi}{3}, \dfrac{4\pi}{3}$. (ii) $2\pi \div \dfrac{\pi}{6} = 12$.`,
    children: [
      child('a', mk.mcq({ stem: 'The least depth of water, in metres, is', opts: ['$4$', '$6$', '$8$', '$2$'], key: 'a', sol: r`Since $\cos\dfrac{\pi t}{6} \le 1$, the term $-2\cos\dfrac{\pi t}{6} \ge -2$ and $d \ge 4$, reached when the cosine is $1$ (at $t = 0$). The value $8$ in (c) is the greatest depth.`, d: 2, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the depth of water, in metres, at $2$ a.m.', value: 5, unit: 'm', sol: r`$d(2) = 6 - 2\cos\dfrac{2\pi}{6} = 6 - 2\cos\dfrac{\pi}{3} = 6 - 2 \times \dfrac{1}{2} = 5$ m.`, scheme: [['5', 1]], d: 1, c: 'application', t: [2], time: 70 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** At what times between midnight and noon is the depth exactly $7$ m?', model: r`$6 - 2\cos\dfrac{\pi t}{6} = 7$ gives $\cos\dfrac{\pi t}{6} = -\dfrac{1}{2}$. For $0 \le t \le 12$ the angle $\dfrac{\pi t}{6}$ lies in $[0, 2\pi]$, so it equals $\dfrac{2\pi}{3}$ or $\dfrac{4\pi}{3}$, giving $t = 4$ and $t = 8$ (4 a.m. and 8 a.m.).`, sol: 'Solve the cosine equation on one full turn.', scheme: [['cos(πt/6) = −1/2', 1], ['t = 4 and t = 8', 1]], d: 3, c: 'application', t: [2], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the time interval after which the pattern of depths repeats, and the times in a full day when the water is deepest.', model: r`The cosine repeats when its angle grows by $2\pi$: $\dfrac{\pi}{6}\Delta t = 2\pi$, so the period is $12$ hours. The greatest depth $8$ m needs $\cos\dfrac{\pi t}{6} = -1$, i.e. $\dfrac{\pi t}{6} = \pi$ and $3\pi$, so $t = 6$ and $t = 18$.`, sol: 'Period 2 pi divided by the coefficient; deepest when the cosine is minus one.', scheme: [['period 12 hours', 1], ['t = 6 and t = 18', 1]], d: 4, c: 'analysis', t: [2], time: 150 }),
      ]),
    ],
  }, (C) => {
    C.child('a').which([mn, 6, 8, 2].map((v) => near(v, 4)), true);
    C.child('b').val(d(2));
    C.child('c').assert(lowAt.length === 2 && near(lowAt[0], 4, 1e-6) && near(lowAt[1], 8, 1e-6), 't = 4 and 8');
    C.child('c').model([7, 4, 8]);
    C.child('cii').assert(per12 && near(mx, 8, 1e-6) && near(d(6), 8) && near(d(18), 8), 'period 12, maxima at 6 and 18');
    C.child('cii').model([12, 8, 6, 18]);
  });
}
{
  const P = (deg) => [2 * val(cosD(deg)), 2 * val(sinD(deg))];
  const sinHalf = rootsOf((x) => 2 * Math.sin(x) + 1, 0, 2 * PI - 1e-9);
  const dist = Math.hypot(P(60)[0] - P(180)[0], P(60)[1] - P(180)[1]);
  const opts = [[-1, Math.sqrt(3)], [1, Math.sqrt(3)], [-Math.sqrt(3), 1], [-1, -Math.sqrt(3)]];
  caseQ('c03', {
    passage: r`A toy robot (imagined) runs on a circular track of radius $2$ m whose centre is the origin $O$ of a floor grid marked in metres. After turning through an angle $\theta$ from the positive $x$-axis, the robot is at the point $(2\cos\theta,\ 2\sin\theta)$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $-1.732$. (c) (i) $\theta = 210^\circ$ and $330^\circ$. Or (ii) $2\sqrt{3} \approx 3.46$ m.`,
    sol: r`(a) $2\cos 120^\circ = -1$, $2\sin 120^\circ = \sqrt{3}$. (b) $2\cos 210^\circ = -2 \times \dfrac{\sqrt{3}}{2}$. (c) (i) $2\sin\theta = -1$. (ii) The points are $(1, \sqrt{3})$ and $(-2, 0)$.`,
    children: [
      child('a', mk.mcq({ stem: r`The robot's position when $\theta = 120^\circ$ is`, opts: [r`$(-1,\ \sqrt{3})$`, r`$(1,\ \sqrt{3})$`, r`$(-\sqrt{3},\ 1)$`, r`$(-1,\ -\sqrt{3})$`], key: 'a', sol: r`$\cos 120^\circ = -\dfrac{1}{2}$ and $\sin 120^\circ = \dfrac{\sqrt{3}}{2}$, so the position is $\left(2 \times \left(-\dfrac{1}{2}\right),\ 2 \times \dfrac{\sqrt{3}}{2}\right) = (-1, \sqrt{3})$. Option (c) swaps the coordinates and option (b) forgets that quadrant II has a negative $x$.`, d: 2, c: 'application', t: [2], time: 70 })),
      child('b', mk.num({ stem: 'Find the $x$-coordinate of the robot when $\\theta = 210^\\circ$, correct to three decimal places.', value: -1.732, tol: 0.001, unit: 'm', sol: r`$x = 2\cos 210^\circ = 2 \times \left(-\dfrac{\sqrt{3}}{2}\right) = -\sqrt{3} = -1.732$ m.`, scheme: [['-1.732', 1]], d: 2, c: 'application', t: [2], time: 80 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** For which values of $\\theta$ with $0^\\circ \\le \\theta < 360^\\circ$ is the $y$-coordinate of the robot equal to $-1$ m?', model: r`$2\sin\theta = -1$ gives $\sin\theta = -\dfrac{1}{2}$. Sine is negative in quadrants III and IV, with reference angle $30^\circ$, so $\theta = 180^\circ + 30^\circ = 210^\circ$ and $\theta = 360^\circ - 30^\circ = 330^\circ$.`, sol: 'Reference angle 30 degrees in the two quadrants where sine is negative.', scheme: [['sin θ = −1/2 with reference angle 30°', 1], ['210° and 330°', 1]], d: 3, c: 'application', t: [2], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the straight-line distance between the robot at $\\theta = 60^\\circ$ and at $\\theta = 180^\\circ$, in exact form and to two decimal places.', model: r`The positions are $(2\cos 60^\circ, 2\sin 60^\circ) = (1, \sqrt{3})$ and $(2\cos 180^\circ, 2\sin 180^\circ) = (-2, 0)$. Distance $= \sqrt{(1 + 2)^2 + (\sqrt{3} - 0)^2} = \sqrt{9 + 3} = \sqrt{12} = 2\sqrt{3} \approx 3.46$ m.`, sol: 'Distance formula with the two computed positions.', scheme: [['both positions', 1], ['distance 2√3 ≈ 3.46 m', 1]], d: 3, c: 'application', t: [2], time: 120 }),
      ]),
    ],
  }, (C) => {
    C.child('a').which(opts.map(([x, y]) => near(x, P(120)[0]) && near(y, P(120)[1])), true);
    C.child('b').val(P(210)[0], 0.001);
    C.child('c').assert(sinHalf.length === 2 && near(deg(sinHalf[0]), 210, 1e-4) && near(deg(sinHalf[1]), 330, 1e-4) && near(P(210)[1], -1) && near(P(330)[1], -1), '210 and 330 degrees');
    C.child('c').model([30, 210, 330]);
    C.child('cii').assert(near(dist, 2 * Math.sqrt(3)) && near(dist, 3.4641, 1e-4) && near(P(60)[0], 1) && near(P(180)[0], -2), 'distance 2 sqrt 3');
    C.child('cii').model([12, 3]);
  });
}
{
  const f = (x) => Math.sin(x) + Math.cos(x), g = (x) => Math.SQRT2 * Math.sin(x + PI / 4);
  const v15 = add(sinD(15), cosD(15));
  const zs = [0, 0.5].map((k) => k * PI);
  const rs = rootsOf((x) => f(x) - 1, 1e-3, 2 * PI - 1e-3);
  caseQ('c04', {
    passage: r`In an imagined physics lab, two signals $\sin x$ and $\cos x$ are added to give $y = \sin x + \cos x$. A student claims that $y = \sqrt{2}\sin\left(x + \dfrac{\pi}{4}\right)$.`,
    d: 4, c: 'analysis',
    model: r`(a) Option (a). (b) $1.414$. (c) (i) $x = 0$ and $x = \dfrac{\pi}{2}$. Or (ii) $\dfrac{\sqrt{6}}{2} \approx 1.225$.`,
    sol: r`(a) $\sin\left(x + \dfrac{\pi}{4}\right) = \dfrac{\sqrt{2}}{2}(\sin x + \cos x)$. (b) The sine is at most $1$. (c) (i) $\sin\left(x + \dfrac{\pi}{4}\right) = \dfrac{1}{\sqrt{2}}$. (ii) $\sin 15^\circ + \cos 15^\circ$.`,
    children: [
      child('a', mk.mcq({ stem: r`Expanding $\sin\left(x + \dfrac{\pi}{4}\right)$ with the addition formula gives`, opts: [r`$\dfrac{1}{\sqrt{2}}(\sin x + \cos x)$`, r`$\dfrac{1}{\sqrt{2}}(\sin x - \cos x)$`, r`$\sin x\cos x + \dfrac{1}{\sqrt{2}}$`, r`$\sqrt{2}(\sin x + \cos x)$`], key: 'a', sol: r`$\sin\left(x + \dfrac{\pi}{4}\right) = \sin x\cos\dfrac{\pi}{4} + \cos x\sin\dfrac{\pi}{4} = \dfrac{1}{\sqrt{2}}(\sin x + \cos x)$. Multiplying by $\sqrt{2}$ gives $\sin x + \cos x$, so the student's claim holds. A minus sign would belong to $\sin\left(x - \dfrac{\pi}{4}\right)$.`, d: 2, c: 'application', t: [3], time: 70 })),
      child('b', mk.num({ stem: 'Find the greatest value of $y = \\sin x + \\cos x$, correct to three decimal places.', value: 1.414, tol: 0.001, sol: r`Using the claim, $y = \sqrt{2}\sin\left(x + \dfrac{\pi}{4}\right) \le \sqrt{2} \times 1 = \sqrt{2} = 1.414$, reached at $x = \dfrac{\pi}{4}$.`, scheme: [['1.414', 1]], d: 3, c: 'analysis', t: [3], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find all $x$ with $0 \\le x < 2\\pi$ for which $y = 1$. (Formative topic.)', model: r`$\sqrt{2}\sin\left(x + \dfrac{\pi}{4}\right) = 1$ gives $\sin\left(x + \dfrac{\pi}{4}\right) = \dfrac{1}{\sqrt{2}}$. In $\left[\dfrac{\pi}{4}, \dfrac{9\pi}{4}\right)$ the angle $x + \dfrac{\pi}{4}$ equals $\dfrac{\pi}{4}$ or $\dfrac{3\pi}{4}$, so $x = 0$ or $x = \dfrac{\pi}{2}$.`, sol: 'Shift the interval by pi/4 and use the two angles with sine 1/sqrt2.', scheme: [['sin(x + π/4) = 1/√2', 1], ['x = 0 and x = π/2', 1]], d: 4, c: 'application', t: [3, 4], time: 150 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the exact value of $y$ at $x = 15^\\circ$.', model: r`$y = \sin 15^\circ + \cos 15^\circ = \dfrac{\sqrt{6} - \sqrt{2}}{4} + \dfrac{\sqrt{6} + \sqrt{2}}{4} = \dfrac{2\sqrt{6}}{4} = \dfrac{\sqrt{6}}{2}$, about $1.225$.`, sol: 'Use the exact values of sin 15 and cos 15.', scheme: [['exact values of sin 15° and cos 15°', 1], ['y = √6/2', 1]], d: 3, c: 'application', t: [3], time: 100 }),
      ]),
    ],
  }, (C) => {
    C.child('a').key('a');
    C.child('a').assert(T.holds1(f, g) && T.holds1((x) => Math.sin(x + PI / 4), (x) => Math.SQRT1_2 * (Math.sin(x) + Math.cos(x))), 'sin x + cos x = sqrt2 sin(x + pi/4)');
    C.child('b').val(Math.max(...Array.from({ length: 6300 }, (_, k) => f(k / 1000))), 0.001);
    C.child('c').assert(zs.every((x) => near(f(x), 1)) && rs.length === 1 && near(rs[0], PI / 2, 1e-6), 'solutions 0 and pi/2 (0 is an end point)');
    C.child('c').model([3, 4, 2]);
    C.child('cii').assert(eq(v15, el(0, 0, 0, fr(1, 2))) && near(val(v15), 1.2247, 1e-4), 'sqrt6/2');
    C.child('cii').model([6, 2, 4, 1.225]);
  });
}
{
  const u = 20, g = 10;
  const R = (thd) => (u * u * Math.sin(2 * rad(thd))) / g;
  const sol = rootsOf((x) => Math.sin(2 * x) - 0.5, 1e-3, PI / 2 - 1e-3);
  const opts = [20, 10, 40, 20 * Math.sqrt(3)];
  caseQ('c05', {
    passage: r`A ball is thrown (an imagined cricket practice) from ground level with speed $u = 20$ m/s at an angle $\theta$ above the horizontal. Its horizontal range is $R = \dfrac{u^2\sin 2\theta}{g}$ metres, where $g = 10$ m/s$^2$.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $34.64$ m. (c) (i) $\theta = 15^\circ$ or $75^\circ$. Or (ii) $\sin 2(90^\circ - \theta) = \sin 2\theta$, so both angles give the same range.`,
    sol: r`(a) $R = \dfrac{400 \times \frac{1}{2}}{10} = 20$. (b) $R = \dfrac{400 \times \frac{\sqrt{3}}{2}}{10} = 20\sqrt{3}$. (c) (i) $\sin 2\theta = \dfrac{1}{2}$. (ii) $\sin(180^\circ - 2\theta) = \sin 2\theta$.`.replace(r`\dfrac{400 \times \frac{1}{2}}{10}`, r`\dfrac{400 \times \dfrac{1}{2}}{10}`).replace(r`\dfrac{400 \times \frac{\sqrt{3}}{2}}{10}`, r`\dfrac{400 \times \dfrac{\sqrt{3}}{2}}{10}`),
    children: [
      child('a', mk.mcq({ stem: 'For $\\theta = 15^\\circ$ the range $R$, in metres, is', opts: ['$20$', '$10$', '$40$', '$20\\sqrt{3}$'], key: 'a', sol: r`$R = \dfrac{20^2 \sin 30^\circ}{10} = \dfrac{400 \times 0.5}{10} = 20$ m. Option (b) halves once too often and (c) forgets the $\sin 30^\circ$; option (d) is the range for $30^\circ$.`, d: 2, c: 'application', t: [3], time: 70 })),
      child('b', mk.num({ stem: 'Find the range, in metres, for $\\theta = 30^\\circ$, correct to two decimal places.', value: 34.64, tol: 0.01, unit: 'm', sol: r`$R = \dfrac{400\sin 60^\circ}{10} = 40 \times \dfrac{\sqrt{3}}{2} = 20\sqrt{3} = 34.64$ m.`, scheme: [['34.64', 1]], d: 3, c: 'application', t: [3], time: 80 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the angles $\\theta$ between $0^\\circ$ and $90^\\circ$ for which the range is exactly $20$ m.', model: r`$\dfrac{400\sin 2\theta}{10} = 20$ gives $\sin 2\theta = \dfrac{1}{2}$. With $0^\circ < 2\theta < 180^\circ$, $2\theta = 30^\circ$ or $150^\circ$, so $\theta = 15^\circ$ or $\theta = 75^\circ$.`, sol: 'Solve sin 2 theta = 1/2 for 2 theta between 0 and 180 degrees.', scheme: [['sin 2θ = 1/2', 1], ['θ = 15° and 75°', 1]], d: 3, c: 'application', t: [3], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Show that the angles $\\theta$ and $90^\\circ - \\theta$ give the same range, and use this to explain the two answers of an equation such as the one in part (i).', model: r`For the angle $90^\circ - \theta$, $\sin 2(90^\circ - \theta) = \sin(180^\circ - 2\theta) = \sin 2\theta$, so the range is the same. That is why the $20$ m range appears at $15^\circ$ and at $90^\circ - 15^\circ = 75^\circ$.`, sol: 'Use sin(180 degrees minus A) = sin A.', scheme: [['sin(180° − 2θ) = sin 2θ', 1], ['link to 15° and 75°', 1]], d: 4, c: 'analysis', t: [3], time: 130 }),
      ]),
    ],
  }, (C) => {
    C.child('a').which(opts.map((v) => near(v, R(15))), true);
    C.child('b').val(R(30), 0.01);
    C.child('c').assert(sol.length === 2 && near(deg(sol[0]), 15, 1e-4) && near(deg(sol[1]), 75, 1e-4) && near(R(15), 20) && near(R(75), 20), '15 and 75 degrees');
    C.child('c').model([2, 30, 150, 15, 75]);
    C.child('cii').assert(T.holds1((x) => Math.sin(2 * (PI / 2 - x)), (x) => Math.sin(2 * x)) && near(R(15), R(75)), 'same range');
    C.child('cii').model([90, 180, 15, 75]);
  });
}

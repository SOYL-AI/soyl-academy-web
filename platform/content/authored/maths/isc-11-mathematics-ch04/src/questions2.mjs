// ISC 11 Mathematics ch04 Compound, Multiple and Sub-multiple Angles: short (2 and 3 marks) and long (5 marks, in parts) items.
// Every number in a model answer is recomputed: rational values with exact fractions, identities at fixed sample angles
// in all quadrants, surds exactly in Q(sqrt 2, sqrt 3) at multiples of 15 degrees.
import { Q, mk } from './lib.mjs';
import { r, S, C, T, PI, fr, near, rad } from './h4.mjs';
import { el, sinD, cosD, tanD, eq, add, sub, mul, div } from './trig.mjs';

const R = rad;
const s2 = Math.SQRT2, s3 = Math.sqrt(3);
const PTS2 = [[0.7, 0.3], [1.9, 0.6], [2.6, 1.4], [-0.8, 0.5], [4.0, 2.2]];
const PTS1 = [0.3, 0.9, 1.7, 2.4, 3.3, 5.0, -0.6];
const all2 = (f, g) => PTS2.every(([x, y]) => near(f(x, y), g(x, y), 1e-9));
const all1 = (f, g) => PTS1.every((x) => near(f(x), g(x), 1e-9));
const one = el(1);

// =============================================================== short answer (2 marks)
Q('s201', mk.short({ marks: 2, stem: r`Prove that $\sin(A + B) - \sin(A - B) = 2\cos A\sin B$.`, model: r`Expand both terms: $\sin(A + B) = \sin A\cos B + \cos A\sin B$ and $\sin(A - B) = \sin A\cos B - \cos A\sin B$. Subtracting, the terms $\sin A\cos B$ cancel and $\cos A\sin B + \cos A\sin B = 2\cos A\sin B$.`, sol: 'Expand each sine and subtract.', scheme: [['Both expansions written', 1], ['Subtraction and result', 1]], d: 2, c: 'understanding', t: [1, 4], time: 75 }),
  (C_) => { C_.assert(all2((x, y) => S(x + y) - S(x - y), (x, y) => 2 * C(x) * S(y)), 'identity'); C_.model(['2\\cos A\\sin B']); });
Q('s202', mk.short({ marks: 2, stem: r`Find the exact value of $\cos 255^\circ$.`, model: r`Write $255^\circ = 300^\circ - 45^\circ$. Then $\cos 255^\circ = \cos 300^\circ\cos 45^\circ + \sin 300^\circ\sin 45^\circ = \dfrac{1}{2}\cdot\dfrac{\sqrt{2}}{2} + \left(-\dfrac{\sqrt{3}}{2}\right)\dfrac{\sqrt{2}}{2} = \dfrac{\sqrt{2} - \sqrt{6}}{4}$.`, sol: 'Choose a split whose parts have known values; mind the signs in the fourth quadrant.', scheme: [['Split $255^\\circ = 300^\\circ - 45^\\circ$ and formula', 1], ['Value $\\dfrac{\\sqrt{2} - \\sqrt{6}}{4}$', 1]], d: 2, c: 'application', t: [1], time: 90 }),
  (C_) => { C_.assert(eq(cosD(255), el(0, fr(1, 4), 0, fr(-1, 4))) && eq(add(mul(cosD(300), cosD(45)), mul(sinD(300), sinD(45))), cosD(255)), 'exact value'); C_.model(['\\dfrac{\\sqrt{2} - \\sqrt{6}}{4}']); });
{
  const a = fr(1, 4), b = fr(3, 5);
  const t = a.add(b).div(fr(1).sub(a.mul(b)));
  Q('s203', mk.short({ marks: 2, stem: r`The acute angles $A$ and $B$ have $\tan A = \dfrac{1}{4}$ and $\tan B = \dfrac{3}{5}$. Find $\tan(A + B)$, and hence the size of $A + B$ in degrees.`, model: r`$\tan(A + B) = \dfrac{\frac{1}{4} + \frac{3}{5}}{1 - \frac{1}{4}\cdot\frac{3}{5}} = \dfrac{17/20}{17/20} = 1$. Both angles are acute with tangent less than $1$, so $A + B$ lies between $0^\circ$ and $90^\circ$, and $\tan(A + B) = 1$ gives $A + B = 45^\circ$.`, sol: 'Use the tangent addition formula, then identify the angle.', scheme: [['$\\tan(A + B) = 1$', 1], ['$A + B = 45^\\circ$ with the range', 1]], d: 2, c: 'application', t: [1], time: 90 }),
    (C_) => { C_.assert(t.eq(fr(1)) && near(Math.atan(0.25) + Math.atan(0.6), PI / 4, 1e-12), 'tan = 1, sum 45 degrees'); C_.model([1, 45]); });
}
Q('s204', mk.short({ marks: 2, stem: r`Prove that $\dfrac{1 - \cos 2\theta}{\sin 2\theta} = \tan\theta$.`, model: r`Use $1 - \cos 2\theta = 2\sin^2\theta$ and $\sin 2\theta = 2\sin\theta\cos\theta$. Then the fraction is $\dfrac{2\sin^2\theta}{2\sin\theta\cos\theta} = \dfrac{\sin\theta}{\cos\theta} = \tan\theta$.`, sol: 'Rewrite numerator and denominator with double angle formulae.', scheme: [['Both double angle forms', 1], ['Cancellation to $\\tan\\theta$', 1]], d: 2, c: 'understanding', t: [2], time: 75 }),
  (C_) => { C_.assert(PTS1.every((x) => near((1 - C(2 * x)) / S(2 * x), T(x), 1e-9)), 'identity'); C_.model(['\\tan\\theta']); });
{
  const x = Math.asin(3 / (4 * s2)) - PI / 4;
  Q('s205', mk.short({ marks: 2, stem: r`The angle $x$ satisfies $\sin x + \cos x = \dfrac{3}{4}$. Find the value of $\sin 2x$.`, model: r`Square both sides: $\sin^2 x + 2\sin x\cos x + \cos^2 x = \dfrac{9}{16}$. Since $\sin^2 x + \cos^2 x = 1$, this gives $1 + \sin 2x = \dfrac{9}{16}$, so $\sin 2x = -\dfrac{7}{16}$.`, sol: 'Square the given equation and use the Pythagorean identity.', scheme: [['Squaring and $\\sin^2 x + \\cos^2 x = 1$', 1], ['$\\sin 2x = -\\dfrac{7}{16}$', 1]], d: 3, c: 'analysis', t: [2], time: 90 }),
    (C_) => { C_.assert(near(S(x) + C(x), 0.75, 1e-12) && near(S(2 * x), -7 / 16, 1e-12), 'sin 2x = -7/16 at an actual solution'); C_.model(['-\\dfrac{7}{16}']); });
}
{
  const s = fr(9, 41), c = fr(40, 41);
  const s2x = fr(2).mul(s).mul(c), c2x = c.mul(c).sub(s.mul(s)), s4x = fr(2).mul(s2x).mul(c2x);
  Q('s206', mk.short({ marks: 2, stem: r`The acute angle $x$ has $\sin x = \dfrac{9}{41}$. Find $\cos 2x$ and $\sin 4x$.`, model: r`$\cos x = \dfrac{40}{41}$, so $\cos 2x = \cos^2 x - \sin^2 x = \dfrac{1600 - 81}{1681} = \dfrac{1519}{1681}$. Also $\sin 2x = 2\cdot\dfrac{9}{41}\cdot\dfrac{40}{41} = \dfrac{720}{1681}$, and $\sin 4x = 2\sin 2x\cos 2x = \dfrac{2187360}{2825761}$.`, sol: 'Double the angle twice, finding $\\cos 2x$ and $\\sin 2x$ first.', scheme: [['$\\cos 2x = \\dfrac{1519}{1681}$', 1], ['$\\sin 4x = \\dfrac{2187360}{2825761}$', 1]], d: 3, c: 'application', t: [2], time: 105 }),
    (C_) => { const x = Math.asin(9 / 41); C_.assert(c2x.eq(fr(1519, 1681)) && s2x.eq(fr(720, 1681)) && s4x.eq(fr(2187360, 2825761)) && near(C(2 * x), c2x.v, 1e-12) && near(S(4 * x), s4x.v, 1e-12), 'values'); C_.model([1519, 1681, 720, 2187360, 2825761]); });
}
Q('s207', mk.short({ marks: 2, stem: r`Show that $\cos 4x = 8\cos^4 x - 8\cos^2 x + 1$.`, model: r`Apply $\cos 2\theta = 2\cos^2\theta - 1$ twice. With $\theta = 2x$: $\cos 4x = 2\cos^2 2x - 1 = 2(2\cos^2 x - 1)^2 - 1$. Expanding, $2(4\cos^4 x - 4\cos^2 x + 1) - 1 = 8\cos^4 x - 8\cos^2 x + 1$.`, sol: 'Double the double angle.', scheme: [['$\\cos 4x = 2\\cos^2 2x - 1$ with $\\cos 2x$ substituted', 1], ['Expansion to the required form', 1]], d: 3, c: 'understanding', t: [2], time: 90 }),
  (C_) => { C_.assert(all1((x) => C(4 * x), (x) => 8 * C(x) ** 4 - 8 * C(x) ** 2 + 1), 'identity'); C_.model(['8\\cos^4 x - 8\\cos^2 x + 1']); });
{
  const cT = fr(1, 8);
  Q('s208', mk.short({ marks: 2, stem: r`The acute angle $\theta$ has $\cos\theta = \dfrac{1}{8}$. Find $\cos\dfrac{\theta}{2}$ and $\sin\dfrac{\theta}{2}$ in exact form.`, model: r`Since $\dfrac{\theta}{2}$ is also acute, both roots are positive. $\cos^2\dfrac{\theta}{2} = \dfrac{1 + 1/8}{2} = \dfrac{9}{16}$, so $\cos\dfrac{\theta}{2} = \dfrac{3}{4}$. $\sin^2\dfrac{\theta}{2} = \dfrac{1 - 1/8}{2} = \dfrac{7}{16}$, so $\sin\dfrac{\theta}{2} = \dfrac{\sqrt{7}}{4}$.`, sol: 'Use the half-angle squares and take positive roots.', scheme: [['$\\cos\\dfrac{\\theta}{2} = \\dfrac{3}{4}$', 1], ['$\\sin\\dfrac{\\theta}{2} = \\dfrac{\\sqrt{7}}{4}$', 1]], d: 3, c: 'application', t: [2], time: 90 }),
    (C_) => { const th = Math.acos(1 / 8); C_.assert(fr(1).add(cT).mul(fr(1, 2)).eq(fr(9, 16)) && near(C(th / 2), 3 / 4, 1e-12) && near(S(th / 2), Math.sqrt(7) / 4, 1e-12), 'values'); C_.model([9, 16, 7]); });
}
{
  const v = S(R(90)) + S(R(50));
  Q('s209', mk.short({ marks: 2, stem: r`Express $2\sin 7x\cos 2x$ as a sum of two sines, and find its value, to three decimal places, when $x = 10^\circ$.`, model: r`$2\sin 7x\cos 2x = \sin 9x + \sin 5x$. At $x = 10^\circ$ this is $\sin 90^\circ + \sin 50^\circ = 1 + 0.766 = 1.766$.`, sol: 'Use the product-to-sum formula, then substitute.', scheme: [['$\\sin 9x + \\sin 5x$', 1], ['Value $1.766$', 1]], d: 2, c: 'application', t: [4], time: 75 }),
    (C_) => { C_.assert(all1((x) => 2 * S(7 * x) * C(2 * x), (x) => S(9 * x) + S(5 * x)) && near(2 * S(R(70)) * C(R(20)), v, 1e-12) && Math.abs(v - 1.766) < 5e-4, 'identity and value'); C_.model([1.766, '\\sin 9x + \\sin 5x']); });
}
Q('s210', mk.short({ marks: 2, stem: r`Write $\cos 8x + \cos 2x$ as a product, and use it to find the exact value of the expression at $x = 15^\circ$.`, model: r`$\cos 8x + \cos 2x = 2\cos 5x\cos 3x$. At $x = 15^\circ$: $2\cos 75^\circ\cos 45^\circ = \cos 120^\circ + \cos 30^\circ = -\dfrac{1}{2} + \dfrac{\sqrt{3}}{2} = \dfrac{\sqrt{3} - 1}{2}$.`, sol: 'Half-sum and half-difference first; then product to sum for the value.', scheme: [['$2\\cos 5x\\cos 3x$', 1], ['Value $\\dfrac{\\sqrt{3} - 1}{2}$', 1]], d: 3, c: 'application', t: [3, 4], time: 90 }),
  (C_) => { C_.assert(all1((x) => C(8 * x) + C(2 * x), (x) => 2 * C(5 * x) * C(3 * x)) && eq(add(cosD(120), cosD(30)), el(fr(-1, 2), 0, fr(1, 2))) && near(C(R(120)) + C(R(30)), (s3 - 1) / 2, 1e-12) && near(2 * C(R(75)) * C(R(45)), (s3 - 1) / 2, 1e-12), 'identity and exact value'); C_.model(['2\\cos 5x\\cos 3x', '\\dfrac{\\sqrt{3} - 1}{2}']); });

// =============================================================== short answer (3 marks)
Q('s301', mk.short({ marks: 3, stem: r`Starting from the sine and cosine formulae, derive $\tan(A - B) = \dfrac{\tan A - \tan B}{1 + \tan A\tan B}$, and use it to find the exact value of $\tan 195^\circ$ from $195^\circ = 225^\circ - 30^\circ$.`, model: r`$\tan(A - B) = \dfrac{\sin A\cos B - \cos A\sin B}{\cos A\cos B + \sin A\sin B}$. Dividing numerator and denominator by $\cos A\cos B$ gives $\dfrac{\tan A - \tan B}{1 + \tan A\tan B}$.

With $A = 225^\circ$, $B = 30^\circ$: $\tan 225^\circ = 1$ and $\tan 30^\circ = \dfrac{1}{\sqrt{3}}$, so $\tan 195^\circ = \dfrac{1 - 1/\sqrt{3}}{1 + 1/\sqrt{3}} = \dfrac{\sqrt{3} - 1}{\sqrt{3} + 1} = \dfrac{(\sqrt{3} - 1)^2}{2} = 2 - \sqrt{3}$.`, sol: 'Quotient of the two difference formulae, then substitute and rationalise.', scheme: [['Quotient of the sine and cosine difference formulae', 1], ['Division by $\\cos A\\cos B$', 1], ['Value $2 - \\sqrt{3}$', 1]], d: 3, c: 'application', t: [1], time: 150 }),
  (C_) => { C_.assert(all2((x, y) => T(x - y), (x, y) => (T(x) - T(y)) / (1 + T(x) * T(y))) && eq(tanD(195), el(2, 0, -1)) && eq(div(sub(tanD(225), tanD(30)), add(one, mul(tanD(225), tanD(30)))), el(2, 0, -1)), 'formula and tan 195 = 2 - sqrt3'); C_.model(['2 - \\sqrt{3}']); });
Q('s302', mk.short({ marks: 3, stem: r`Prove that $\dfrac{\cos(A + B)}{\sin A\sin B} = \cot A\cot B - 1$.`, model: r`Expand the numerator: $\cos(A + B) = \cos A\cos B - \sin A\sin B$. Divide each term by $\sin A\sin B$: $\dfrac{\cos A\cos B}{\sin A\sin B} - \dfrac{\sin A\sin B}{\sin A\sin B} = \cot A\cot B - 1$.`, sol: 'Expand, split the fraction, recognise the cotangents.', scheme: [['Expansion of $\\cos(A + B)$', 1], ['Division by $\\sin A\\sin B$', 1], ['$\\cot A\\cot B - 1$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }),
  (C_) => { C_.assert(all2((x, y) => C(x + y) / (S(x) * S(y)), (x, y) => (C(x) / S(x)) * (C(y) / S(y)) - 1), 'identity'); C_.model(['\\cot A\\cot B - 1']); });
Q('s303', mk.short({ marks: 3, stem: r`Using the formula for $\tan(A + B)$ twice, show that $\tan(A + B + C) = \dfrac{a + b + c - abc}{1 - ab - bc - ca}$, where $a = \tan A$, $b = \tan B$ and $c = \tan C$.`, model: r`$\tan(A + B) = \dfrac{a + b}{1 - ab}$. Applying the formula to $(A + B) + C$: $\tan(A + B + C) = \dfrac{\dfrac{a + b}{1 - ab} + c}{1 - \dfrac{a + b}{1 - ab}\cdot c}$.

Multiply the numerator and the denominator by $1 - ab$: the numerator becomes $a + b + c(1 - ab) = a + b + c - abc$ and the denominator becomes $1 - ab - c(a + b) = 1 - ab - bc - ca$. Hence the result.`, sol: 'Treat $A + B$ as one angle and clear the inner fraction.', scheme: [['$\\tan(A + B) = \\dfrac{a + b}{1 - ab}$ used for $(A + B) + C$', 1], ['Multiplying through by $1 - ab$', 1], ['Numerator and denominator simplified', 1]], d: 3, c: 'understanding', t: [1], time: 150 }),
  (C_) => { C_.assert(PTS2.every(([x, y]) => { const z = 0.45; const a = T(x), b = T(y), c = T(z); return near(T(x + y + z), (a + b + c - a * b * c) / (1 - a * b - b * c - c * a), 1e-8); }), 'identity at five sample triples'); C_.model(['a + b + c - abc', '1 - ab - bc - ca']); });
{
  const cA = fr(-7, 25), sA = fr(24, 25), cB = fr(40, 41), sB = fr(-9, 41);
  const cAB = cA.mul(cB).sub(sA.mul(sB)), sAmB = sA.mul(cB).sub(cA.mul(sB));
  Q('s304', mk.short({ marks: 3, stem: r`The angle $A$ is in quadrant II with $\cos A = -\dfrac{7}{25}$, and $B$ is in quadrant IV with $\cos B = \dfrac{40}{41}$. Find $\cos(A + B)$ and $\sin(A - B)$.`, model: r`Quadrant II gives $\sin A = \dfrac{24}{25}$; quadrant IV gives $\sin B = -\dfrac{9}{41}$.

$\cos(A + B) = \cos A\cos B - \sin A\sin B = -\dfrac{280}{1025} + \dfrac{216}{1025} = -\dfrac{64}{1025}$.

$\sin(A - B) = \sin A\cos B - \cos A\sin B = \dfrac{960}{1025} - \dfrac{63}{1025} = \dfrac{897}{1025}$.`, sol: 'Missing ratios with signs, then each formula once.', scheme: [['$\\sin A = \\dfrac{24}{25}$ and $\\sin B = -\\dfrac{9}{41}$', 1], ['$\\cos(A + B) = -\\dfrac{64}{1025}$', 1], ['$\\sin(A - B) = \\dfrac{897}{1025}$', 1]], d: 3, c: 'application', t: [1], time: 150 }),
    (C_) => { const A = Math.acos(-7 / 25), B = -Math.acos(40 / 41); C_.assert(A > PI / 2 && A < PI && B < 0 && cAB.eq(fr(-64, 1025)) && sAmB.eq(fr(897, 1025)) && near(C(A + B), cAB.v, 1e-12) && near(S(A - B), sAmB.v, 1e-12) && near(S(A), 24 / 25, 1e-12) && near(S(B), -9 / 41, 1e-12), 'values'); C_.model([64, 1025, 897, 24, 9]); });
}
Q('s305', mk.short({ marks: 3, stem: r`Prove that $\sin 2x = \dfrac{2\tan x}{1 + \tan^2 x}$ and $\cos 2x = \dfrac{1 - \tan^2 x}{1 + \tan^2 x}$.`, model: r`Write $\sin 2x = \dfrac{2\sin x\cos x}{\sin^2 x + \cos^2 x}$, since the denominator is $1$. Divide numerator and denominator by $\cos^2 x$: $\dfrac{2\tan x}{\tan^2 x + 1}$.

Similarly $\cos 2x = \dfrac{\cos^2 x - \sin^2 x}{\sin^2 x + \cos^2 x}$, and dividing by $\cos^2 x$ gives $\dfrac{1 - \tan^2 x}{\tan^2 x + 1}$.`, sol: 'Insert $\\sin^2 x + \\cos^2 x = 1$ as the denominator, then divide by $\\cos^2 x$.', scheme: [['Denominator $\\sin^2 x + \\cos^2 x$ inserted', 1], ['Sine result after division by $\\cos^2 x$', 1], ['Cosine result', 1]], d: 3, c: 'understanding', t: [2], time: 120 }),
  (C_) => { C_.assert(all1((x) => S(2 * x), (x) => (2 * T(x)) / (1 + T(x) ** 2)) && all1((x) => C(2 * x), (x) => (1 - T(x) ** 2) / (1 + T(x) ** 2)), 'both identities'); C_.model(['\\dfrac{2\\tan x}{\\tan^2 x + 1}', '\\dfrac{1 - \\tan^2 x}{\\tan^2 x + 1}']); });
Q('s306', mk.short({ marks: 3, stem: r`Prove that $\dfrac{1 + \sin 2x + \cos 2x}{1 + \sin 2x - \cos 2x} = \cot x$.`, model: r`Use $1 + \cos 2x = 2\cos^2 x$, $1 - \cos 2x = 2\sin^2 x$ and $\sin 2x = 2\sin x\cos x$. The numerator is $2\cos^2 x + 2\sin x\cos x = 2\cos x(\cos x + \sin x)$ and the denominator is $2\sin x\cos x + 2\sin^2 x = 2\sin x(\cos x + \sin x)$. Cancelling $2(\cos x + \sin x)$ leaves $\dfrac{\cos x}{\sin x} = \cot x$.`, sol: 'Group $1 + \\cos 2x$ and $1 - \\cos 2x$ separately, then factorise.', scheme: [['Double angle forms substituted', 1], ['Both factorised', 1], ['Cancellation to $\\cot x$', 1]], d: 3, c: 'application', t: [2], time: 150 }),
  (C_) => { C_.assert(all1((x) => (1 + S(2 * x) + C(2 * x)) / (1 + S(2 * x) - C(2 * x)), (x) => C(x) / S(x)), 'identity'); C_.model(['\\cot x']); });
{
  const c = fr(-119, 169);
  const sh = fr(1).sub(c).mul(fr(1, 2)), ch = fr(1).add(c).mul(fr(1, 2));
  Q('s307', mk.short({ marks: 3, stem: r`The angle $x$ lies between $180^\circ$ and $270^\circ$, and $\cos x = -\dfrac{119}{169}$. Find $\sin\dfrac{x}{2}$, $\cos\dfrac{x}{2}$ and $\tan\dfrac{x}{2}$.`, model: r`$90^\circ < \dfrac{x}{2} < 135^\circ$: quadrant II, so sine is positive and cosine and tangent are negative.

$\sin^2\dfrac{x}{2} = \dfrac{1 + 119/169}{2} = \dfrac{144}{169}$, so $\sin\dfrac{x}{2} = \dfrac{12}{13}$. $\cos^2\dfrac{x}{2} = \dfrac{1 - 119/169}{2} = \dfrac{25}{169}$, so $\cos\dfrac{x}{2} = -\dfrac{5}{13}$. Hence $\tan\dfrac{x}{2} = -\dfrac{12}{5}$.`, sol: 'Decide the quadrant of the half angle before taking roots.', scheme: [['Quadrant of $\\dfrac{x}{2}$ and the signs', 1], ['$\\sin\\dfrac{x}{2} = \\dfrac{12}{13}$, $\\cos\\dfrac{x}{2} = -\\dfrac{5}{13}$', 1], ['$\\tan\\dfrac{x}{2} = -\\dfrac{12}{5}$', 1]], d: 3, c: 'application', t: [2], time: 150 }),
    (C_) => { const x = 2 * PI - Math.acos(-119 / 169); C_.assert(x > PI && x < 1.5 * PI && sh.eq(fr(144, 169)) && ch.eq(fr(25, 169)) && near(S(x / 2), 12 / 13, 1e-12) && near(C(x / 2), -5 / 13, 1e-12) && near(T(x / 2), -12 / 5, 1e-12), 'values'); C_.model([144, 25, 12, 5]); });
}
Q('s308', mk.short({ marks: 3, stem: r`Prove that $\dfrac{\sin 3A}{\sin A} = 3 - 4\sin^2 A = 1 + 2\cos 2A$.`, model: r`$\sin 3A = 3\sin A - 4\sin^3 A$, so $\dfrac{\sin 3A}{\sin A} = 3 - 4\sin^2 A$. For the second form, $\sin^2 A = \dfrac{1 - \cos 2A}{2}$, so $3 - 4\sin^2 A = 3 - 2(1 - \cos 2A) = 1 + 2\cos 2A$.`, sol: 'Divide the triple angle formula by $\\sin A$, then replace $\\sin^2 A$.', scheme: [['Triple angle formula divided by $\\sin A$', 1], ['$\\sin^2 A = \\dfrac{1 - \\cos 2A}{2}$ substituted', 1], ['$1 + 2\\cos 2A$', 1]], d: 3, c: 'understanding', t: [2], time: 120 }),
  (C_) => { C_.assert(all1((x) => S(3 * x) / S(x), (x) => 3 - 4 * S(x) ** 2) && all1((x) => S(3 * x) / S(x), (x) => 1 + 2 * C(2 * x)), 'both forms'); C_.model(['1 + 2\\cos 2A']); });
Q('s309', mk.short({ marks: 3, stem: r`Prove that $\dfrac{\sin 5x - \sin 3x}{\cos 5x + \cos 3x} = \tan x$.`, model: r`Half-sum $= 4x$ and half-difference $= x$. $\sin 5x - \sin 3x = 2\cos 4x\sin x$ and $\cos 5x + \cos 3x = 2\cos 4x\cos x$. Dividing, the common factor $2\cos 4x$ cancels and $\dfrac{\sin x}{\cos x} = \tan x$.`, sol: 'The same half-sum appears in both products.', scheme: [['Numerator as a product', 1], ['Denominator as a product', 1], ['Cancellation to $\\tan x$', 1]], d: 3, c: 'application', t: [3], time: 120 }),
  (C_) => { C_.assert(all1((x) => (S(5 * x) - S(3 * x)) / (C(5 * x) + C(3 * x)), (x) => T(x)), 'identity'); C_.model(['2\\cos 4x\\sin x', '2\\cos 4x\\cos x']); });
Q('s310', mk.short({ marks: 3, stem: r`Show that $\dfrac{\cos 35^\circ + \cos 85^\circ}{\sin 85^\circ - \sin 35^\circ} = \cot 25^\circ$.`, model: r`$\cos 35^\circ + \cos 85^\circ = 2\cos 60^\circ\cos 25^\circ$ and $\sin 85^\circ - \sin 35^\circ = 2\cos 60^\circ\sin 25^\circ$. The common factor $2\cos 60^\circ$ cancels, leaving $\dfrac{\cos 25^\circ}{\sin 25^\circ} = \cot 25^\circ$.`, sol: 'Half-sum of the angles is $60^\\circ$ in both, half-difference is $25^\\circ$.', scheme: [['Numerator as a product', 1], ['Denominator as a product', 1], ['Cancellation to $\\cot 25^\\circ$', 1]], d: 3, c: 'application', t: [3], time: 120 }),
  (C_) => { C_.assert(near((C(R(35)) + C(R(85))) / (S(R(85)) - S(R(35))), C(R(25)) / S(R(25)), 1e-12), 'value'); C_.model(['\\cot 25^\\circ', '2\\cos 60^\\circ']); });
Q('s311', mk.short({ marks: 3, stem: r`Prove that $\cos 4x\cos x - \cos 6x\cos 3x = \sin 7x\sin 2x$.`, model: r`$\cos 4x\cos x = \dfrac{1}{2}(\cos 5x + \cos 3x)$ and $\cos 6x\cos 3x = \dfrac{1}{2}(\cos 9x + \cos 3x)$. Subtracting, the $\cos 3x$ terms cancel: $\dfrac{1}{2}(\cos 5x - \cos 9x) = \dfrac{1}{2}\cdot 2\sin 7x\sin 2x = \sin 7x\sin 2x$.`, sol: 'Product to sum twice, then sum to product once.', scheme: [['Two products written as sums', 1], ['Cancellation of $\\cos 3x$', 1], ['$\\cos 5x - \\cos 9x$ as a product', 1]], d: 4, c: 'analysis', t: [3, 4], time: 150 }),
  (C_) => { C_.assert(all1((x) => C(4 * x) * C(x) - C(6 * x) * C(3 * x), (x) => S(7 * x) * S(2 * x)), 'identity'); C_.model(['\\sin 7x\\sin 2x']); });

// =============================================================== long answer (5 marks, in parts)
Q('l01', mk.long({ stem: r`(a) Using $\cos(A - B) = \cos A\cos B + \sin A\sin B$, derive $\cos(A + B)$, and then derive $\sin(A + B)$. [3]

(b) Hence find the exact value of $\sin 255^\circ$. [2]`, model: r`(a) Replace $B$ by $-B$: $\cos(A + B) = \cos A\cos(-B) + \sin A\sin(-B) = \cos A\cos B - \sin A\sin B$.

For the sine, $\sin(A + B) = \cos(90^\circ - (A + B)) = \cos((90^\circ - A) - B) = \cos(90^\circ - A)\cos B + \sin(90^\circ - A)\sin B = \sin A\cos B + \cos A\sin B$.

(b) $255^\circ = 210^\circ + 45^\circ$, so $\sin 255^\circ = \sin 210^\circ\cos 45^\circ + \cos 210^\circ\sin 45^\circ = -\dfrac{1}{2}\cdot\dfrac{\sqrt{2}}{2} - \dfrac{\sqrt{3}}{2}\cdot\dfrac{\sqrt{2}}{2} = -\dfrac{\sqrt{2} + \sqrt{6}}{4}$.`, sol: 'Substitute $-B$; shift by $90^\\circ$ for the sine; split $255^\\circ$ in the third quadrant.', scheme: [['(a) $\\cos(A + B)$ by $B \\to -B$', 1], ['(a) $\\sin(A + B) = \\cos(90^\\circ - (A + B))$ rewritten', 1], ['(a) Expansion giving $\\sin A\\cos B + \\cos A\\sin B$', 1], ['(b) $255^\\circ = 210^\\circ + 45^\\circ$ with the values', 1], ['(b) $-\\dfrac{\\sqrt{2} + \\sqrt{6}}{4}$', 1]], d: 3, c: 'application', t: [1], time: 360 }),
  (C_) => { C_.assert(all2((x, y) => C(x + y), (x, y) => C(x) * C(y) + S(x) * S(-y)) && all2((x, y) => S(x + y), (x, y) => C(PI / 2 - x) * C(y) + S(PI / 2 - x) * S(y)), '(a)'); C_.assert(eq(sinD(255), el(0, fr(-1, 4), 0, fr(-1, 4))) && eq(add(mul(sinD(210), cosD(45)), mul(cosD(210), sinD(45))), sinD(255)), '(b)'); C_.model(['-\\dfrac{\\sqrt{2} + \\sqrt{6}}{4}', '\\sin A\\cos B + \\cos A\\sin B']); });
{
  const a = fr(1, 3), b = fr(1, 5), c = fr(3, 11);
  const ab = a.add(b).div(fr(1).sub(a.mul(b)));
  const abc = ab.add(c).div(fr(1).sub(ab.mul(c)));
  Q('l02', mk.long({ stem: r`The acute angles $A$, $B$ and $C$ satisfy $\tan A = \dfrac{1}{3}$, $\tan B = \dfrac{1}{5}$ and $\tan C = \dfrac{3}{11}$.

(a) Find $\tan(A + B)$. [2]

(b) Using your answer, find $\tan(A + B + C)$. [2]

(c) State, with a reason, the value of $A + B + C$ in degrees. [1]`, model: r`(a) $\tan(A + B) = \dfrac{\frac{1}{3} + \frac{1}{5}}{1 - \frac{1}{3}\cdot\frac{1}{5}} = \dfrac{8/15}{14/15} = \dfrac{4}{7}$.

(b) $\tan(A + B + C) = \dfrac{\frac{4}{7} + \frac{3}{11}}{1 - \frac{4}{7}\cdot\frac{3}{11}} = \dfrac{65/77}{65/77} = 1$.

(c) Each tangent is less than $1$, so each angle is below $45^\circ$ if it is acute, and the sum lies between $0^\circ$ and $135^\circ$. The only angle in that range with tangent $1$ is $45^\circ$, so $A + B + C = 45^\circ$.`, sol: 'Add two angles first and then the third; bound the sum to name the angle.', scheme: [['(a) Formula substituted', 1], ['(a) $\\tan(A + B) = \\dfrac{4}{7}$', 1], ['(b) Formula with $\\tan(A + B)$ and $\\tan C$', 1], ['(b) $\\tan(A + B + C) = 1$', 1], ['(c) $45^\\circ$ with the range argument', 1]], d: 4, c: 'application', t: [1], time: 400 }),
    (C_) => { C_.assert(ab.eq(fr(4, 7)) && abc.eq(fr(1)) && near(Math.atan(1 / 3) + Math.atan(1 / 5) + Math.atan(3 / 11), PI / 4, 1e-12) && Math.atan(1 / 3) < PI / 4 && Math.atan(1 / 5) < PI / 4 && Math.atan(3 / 11) < PI / 4, 'values'); C_.model(['\\dfrac{4}{7}', 45, 65]); });
}
{
  const s = fr(7, 25);
  const s3v = fr(3).mul(s).sub(fr(4).mul(s).mul(s).mul(s));
  Q('l03', mk.long({ stem: r`(a) Starting from $\sin(2x + x)$, prove that $\sin 3x = 3\sin x - 4\sin^3 x$. [3]

(b) Find $\sin 3x$ when $\sin x = \dfrac{7}{25}$. [2]`, model: r`(a) $\sin 3x = \sin 2x\cos x + \cos 2x\sin x = (2\sin x\cos x)\cos x + (1 - 2\sin^2 x)\sin x = 2\sin x\cos^2 x + \sin x - 2\sin^3 x$. Replacing $\cos^2 x$ by $1 - \sin^2 x$: $2\sin x - 2\sin^3 x + \sin x - 2\sin^3 x = 3\sin x - 4\sin^3 x$.

(b) $\sin 3x = 3\cdot\dfrac{7}{25} - 4\cdot\dfrac{343}{15625} = \dfrac{13125}{15625} - \dfrac{1372}{15625} = \dfrac{11753}{15625}$.`, sol: 'Expand with the sum formula; reduce to $\\sin x$ only; then substitute.', scheme: [['(a) $\\sin 2x\\cos x + \\cos 2x\\sin x$', 1], ['(a) Double angle forms substituted', 1], ['(a) $\\cos^2 x = 1 - \\sin^2 x$ and result', 1], ['(b) Formula with $\\sin x = \\dfrac{7}{25}$', 1], ['(b) $\\dfrac{11753}{15625}$', 1]], d: 3, c: 'application', t: [2], time: 360 }),
    (C_) => { C_.assert(all1((x) => S(3 * x), (x) => 2 * S(x) * C(x) * C(x) + (1 - 2 * S(x) ** 2) * S(x)) && all1((x) => S(3 * x), (x) => 3 * S(x) - 4 * S(x) ** 3) && s3v.eq(fr(11753, 15625)) && near(S(3 * Math.asin(7 / 25)), s3v.v, 1e-12), 'values'); C_.model([11753, 15625, 13125, 1372, '3\\sin x - 4\\sin^3 x']); });
}
Q('l04', mk.long({ stem: r`(a) Prove that $\tan\dfrac{x}{2} = \dfrac{1 - \cos x}{\sin x} = \dfrac{\sin x}{1 + \cos x}$. [3]

(b) Use the second form with $x = 30^\circ$ and the first form with $x = 45^\circ$ in suitable places to find the exact values of $\tan 15^\circ$ and $\tan 22.5^\circ$. [2]`, model: r`(a) $\tan\dfrac{x}{2} = \dfrac{\sin(x/2)}{\cos(x/2)}$. Multiply top and bottom by $2\sin\dfrac{x}{2}$: $\dfrac{2\sin^2(x/2)}{2\sin(x/2)\cos(x/2)} = \dfrac{1 - \cos x}{\sin x}$.

Multiply top and bottom instead by $2\cos\dfrac{x}{2}$: $\dfrac{2\sin(x/2)\cos(x/2)}{2\cos^2(x/2)} = \dfrac{\sin x}{1 + \cos x}$.

(b) With $x = 30^\circ$: $\tan 15^\circ = \dfrac{1 - \sqrt{3}/2}{1/2} = 2 - \sqrt{3}$. With $x = 45^\circ$: $\tan 22.5^\circ = \dfrac{\sin 45^\circ}{1 + \cos 45^\circ} = \dfrac{\sqrt{2}/2}{1 + \sqrt{2}/2} = \dfrac{\sqrt{2}}{2 + \sqrt{2}} = \sqrt{2} - 1$.`, sol: 'Multiply by the sine for one form and by the cosine for the other; then substitute.', scheme: [['(a) First form from $2\\sin\\dfrac{x}{2}$', 1], ['(a) Double angle substitutions justified', 1], ['(a) Second form from $2\\cos\\dfrac{x}{2}$', 1], ['(b) $\\tan 15^\\circ = 2 - \\sqrt{3}$', 1], ['(b) $\\tan 22.5^\\circ = \\sqrt{2} - 1$', 1]], d: 4, c: 'application', t: [2], time: 400 }),
  (C_) => { C_.assert(all1((x) => T(x / 2), (x) => (1 - C(x)) / S(x)) && all1((x) => T(x / 2), (x) => S(x) / (1 + C(x))), '(a)'); C_.assert(eq(div(sub(one, cosD(30)), sinD(30)), el(2, 0, -1)) && eq(tanD(15), el(2, 0, -1)) && near(S(R(45)) / (1 + C(R(45))), s2 - 1, 1e-12) && near(T(R(22.5)), s2 - 1, 1e-12) && near(s2 / (2 + s2), s2 - 1, 1e-12), '(b)'); C_.model(['2 - \\sqrt{3}', '\\sqrt{2} - 1']); });
Q('l05', mk.long({ stem: r`(a) By putting $A = \dfrac{C + D}{2}$ and $B = \dfrac{C - D}{2}$ in $\cos(A + B) + \cos(A - B)$, deduce a product form of $\cos C + \cos D$. [3]

(b) Hence find the exact value of $\cos 105^\circ + \cos 15^\circ$. [2]`, model: r`(a) $\cos(A + B) + \cos(A - B) = (\cos A\cos B - \sin A\sin B) + (\cos A\cos B + \sin A\sin B) = 2\cos A\cos B$.

With $A + B = C$ and $A - B = D$, we have $A = \dfrac{C + D}{2}$ and $B = \dfrac{C - D}{2}$. So $\cos C + \cos D = 2\cos\dfrac{C + D}{2}\cos\dfrac{C - D}{2}$.

(b) Take $C = 105^\circ$, $D = 15^\circ$: $\cos 105^\circ + \cos 15^\circ = 2\cos 60^\circ\cos 45^\circ = 2\cdot\dfrac{1}{2}\cdot\dfrac{\sqrt{2}}{2} = \dfrac{\sqrt{2}}{2}$.`, sol: 'Add the two cosine formulae; then name $C$ and $D$.', scheme: [['(a) Expansion of both cosines', 1], ['(a) $2\\cos A\\cos B$', 1], ['(a) Substitution of $A$ and $B$', 1], ['(b) Half-sum $60^\\circ$ and half-difference $45^\\circ$', 1], ['(b) $\\dfrac{\\sqrt{2}}{2}$', 1]], d: 3, c: 'application', t: [3], time: 360 }),
  (C_) => { C_.assert(all2((x, y) => C(x) + C(y), (x, y) => 2 * C((x + y) / 2) * C((x - y) / 2)) && all2((x, y) => C(x + y) + C(x - y), (x, y) => 2 * C(x) * C(y)), '(a)'); C_.assert(eq(add(cosD(105), cosD(15)), el(0, fr(1, 2))) && near(C(R(105)) + C(R(15)), s2 / 2, 1e-12), '(b)'); C_.model(['\\dfrac{\\sqrt{2}}{2}', '2\\cos A\\cos B']); });
Q('l06', mk.long({ stem: r`Prove that $\dfrac{\sin 5A - 2\sin 3A + \sin A}{\cos 5A - \cos A} = \tan A$.

(a) Combine $\sin 5A + \sin A$. [1]

(b) Simplify the numerator. [2]

(c) Write $\cos 5A - \cos A$ as a product. [1]

(d) Divide and complete the proof. [1]`, model: r`(a) $\sin 5A + \sin A = 2\sin 3A\cos 2A$.

(b) The numerator is $2\sin 3A\cos 2A - 2\sin 3A = 2\sin 3A(\cos 2A - 1) = -4\sin 3A\sin^2 A$, using $\cos 2A - 1 = -2\sin^2 A$.

(c) $\cos 5A - \cos A = -2\sin 3A\sin 2A$.

(d) $\dfrac{-4\sin 3A\sin^2 A}{-2\sin 3A\sin 2A} = \dfrac{2\sin^2 A}{2\sin A\cos A} = \dfrac{\sin A}{\cos A} = \tan A$.`, sol: 'Pair the outer terms of the numerator; keep $\\sin 3A$ as the common factor.', scheme: [['(a) $2\\sin 3A\\cos 2A$', 1], ['(b) Common factor $2\\sin 3A$ taken out', 1], ['(b) $-4\\sin 3A\\sin^2 A$', 1], ['(c) $-2\\sin 3A\\sin 2A$', 1], ['(d) Division and $\\tan A$', 1]], d: 4, c: 'analysis', t: [3], time: 420 }),
  (C_) => { C_.assert(all1((x) => (S(5 * x) - 2 * S(3 * x) + S(x)) / (C(5 * x) - C(x)), (x) => T(x)) && all1((x) => S(5 * x) + S(x), (x) => 2 * S(3 * x) * C(2 * x)) && all1((x) => S(5 * x) - 2 * S(3 * x) + S(x), (x) => -4 * S(3 * x) * S(x) ** 2) && all1((x) => C(5 * x) - C(x), (x) => -2 * S(3 * x) * S(2 * x)), 'all stages'); C_.model(['-4\\sin 3A\\sin^2 A', '-2\\sin 3A\\sin 2A']); });
Q('l07', mk.long({ stem: r`Let $P = \cos 20^\circ\cos 40^\circ\cos 80^\circ$.

(a) Use a product-to-sum formula to write $\cos 20^\circ\cos 40^\circ$ as a sum. [2]

(b) Multiply by $\cos 80^\circ$, use a product-to-sum formula again, and hence show that $P = \dfrac{1}{8}$. [3]`, model: r`(a) $\cos 20^\circ\cos 40^\circ = \dfrac{1}{2}\left[\cos 60^\circ + \cos 20^\circ\right] = \dfrac{1}{4} + \dfrac{1}{2}\cos 20^\circ$.

(b) $P = \dfrac{1}{4}\cos 80^\circ + \dfrac{1}{2}\cos 20^\circ\cos 80^\circ$. Now $\cos 20^\circ\cos 80^\circ = \dfrac{1}{2}\left[\cos 100^\circ + \cos 60^\circ\right] = \dfrac{1}{2}\cos 100^\circ + \dfrac{1}{4}$. So $P = \dfrac{1}{4}\cos 80^\circ + \dfrac{1}{4}\cos 100^\circ + \dfrac{1}{8}$. Because $\cos 100^\circ = -\cos 80^\circ$, the first two terms cancel and $P = \dfrac{1}{8}$.`, sol: 'Two rounds of product to sum; the terms in $\\cos 80^\\circ$ cancel.', scheme: [['(a) Product to sum with $\\cos 60^\\circ$', 1], ['(a) $\\dfrac{1}{4} + \\dfrac{1}{2}\\cos 20^\\circ$', 1], ['(b) Second product to sum', 1], ['(b) $\\cos 100^\\circ = -\\cos 80^\\circ$ used', 1], ['(b) $P = \\dfrac{1}{8}$', 1]], d: 4, c: 'analysis', t: [4], time: 420 }),
  (C_) => { const P = C(R(20)) * C(R(40)) * C(R(80)); C_.assert(near(P, 1 / 8, 1e-12) && near(C(R(20)) * C(R(40)), 1 / 4 + C(R(20)) / 2, 1e-12) && near(C(R(20)) * C(R(80)), C(R(100)) / 2 + 1 / 4, 1e-12) && near(C(R(100)), -C(R(80)), 1e-12), 'all stages'); C_.model(['\\dfrac{1}{8}', '\\dfrac{1}{4} + \\dfrac{1}{2}\\cos 20^\\circ']); });

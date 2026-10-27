// CBSE 10 Mathematics ch08 Introduction to Trigonometry — practice bank with independent re-solve checks.
// Ratios are recomputed from side lengths (Pythagoras) or from Math.sin/cos/tan in degrees, never from the
// value table the solutions use; identities are checked numerically at many angles; angles are found by
// search over whole degrees. Trigonometric ratios of complementary angles (removed for 2026-27) appear nowhere.
import { Q, caseQ, child, mk, r, geom } from '../../cbse-10-mathematics-ch05/src/lib.mjs';

const rad = (d) => (d * Math.PI) / 180;
const sin = (d) => Math.sin(rad(d));
const cos = (d) => Math.cos(rad(d));
const tan = (d) => Math.tan(rad(d));
const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
const S3 = Math.sqrt(3), S2 = Math.SQRT2;
/** Acute angles (whole degrees 1..89) satisfying pred, plus 0 and 90 when asked. */
const angles = (pred, lo = 1, hi = 89) => Array.from({ length: hi - lo + 1 }, (_, k) => k + lo).filter((d) => pred(d));
/** An identity f(A) = g(A) checked at many acute angles. */
const identity = (fL, fR) => [7, 19, 33, 41, 52, 64, 77, 86].every((d) => near(fL(d), fR(d), 1e-9));
/** Right triangle from legs: hypotenuse by Pythagoras. */
const hyp = (a, b) => Math.hypot(a, b);

const roof = geom({
  width: 9, height: 3.6, scale: { unit: 'm', per_unit: 1 },
  points: { L: [0.5, 0.5], R: [8.5, 0.5], M: { at: [4.5, 0.5], label_position: 's' }, T: [4.5, Math.round((0.5 + 4 * tan(30)) * 1000) / 1000] },
  segments: [{ from: 'L', to: 'R', label: '8 m' }, { from: 'L', to: 'T', label: 'rafter' }, { from: 'R', to: 'T', label: 'rafter' }, { from: 'T', to: 'M', label: '$h$', dashed: true }],
  angles: [{ at: 'L', from: 'R', to: 'T', label: '30°' }, { at: 'R', from: 'L', to: 'T', label: '30°' }, { at: 'M', from: 'R', to: 'T', right: true }],
}, 'Roof truss drawn to scale: an isosceles triangle with base LR of 8 metres and both base angles 30 degrees; the dashed height TM from the apex meets the base at its midpoint M at a right angle.', 'Roof truss: base $8$ m, base angles $30^\\circ$ (drawn to scale).');

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'In triangle $ABC$, right-angled at $B$, $AB = 20$ cm and $BC = 21$ cm. Then $\\sin A$ equals', opts: [r`$\dfrac{21}{29}$`, r`$\dfrac{20}{29}$`, r`$\dfrac{21}{20}$`, r`$\dfrac{29}{21}$`], key: 'a', sol: r`**Step 1.** $AC = \sqrt{20^2 + 21^2} = \sqrt{841} = 29$ cm. **Step 2.** $\sin A = \dfrac{\text{side opposite } A}{\text{hypotenuse}} = \dfrac{BC}{AC} = \dfrac{21}{29}$. Option (b) is $\cos A$ (adjacent side); option (c) is $\tan A$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { const h = hyp(20, 21); C.assert(h === 29, 'AC = 29'); C.which([21 / 29, 20 / 29, 21 / 20, 29 / 21], 21 / h); });
Q('m02', mk.mcq({ stem: 'If $\\cos A = \\dfrac{12}{13}$ for an acute angle $A$, then $\\tan A$ equals', opts: [r`$\dfrac{5}{12}$`, r`$\dfrac{12}{5}$`, r`$\dfrac{5}{13}$`, r`$\dfrac{13}{12}$`], key: 'a', sol: r`Take adjacent side $12k$ and hypotenuse $13k$. The opposite side is $\sqrt{169k^2 - 144k^2} = 5k$. So $\tan A = \dfrac{5k}{12k} = \dfrac{5}{12}$. Option (c) is $\sin A$; option (d) is $\sec A$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { const A = Math.acos(12 / 13) * 180 / Math.PI; C.which([5 / 12, 12 / 5, 5 / 13, 13 / 12], tan(A)); });
Q('m03', mk.mcq({ stem: 'Which of these could be the value of $\\sin A$ for an acute angle $A$?', opts: [r`$\dfrac43$`, r`$\sqrt2$`, '$0.8$', r`$\dfrac54$`], key: 'c', sol: r`$\sin A = \dfrac{\text{opposite}}{\text{hypotenuse}}$, and the hypotenuse is the longest side, so $0 < \sin A < 1$ for an acute angle. Only $0.8$ lies between $0$ and $1$ (e.g. a $3$-$4$-$5$ triangle).`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { const ok = [4 / 3, S2, 0.8, 5 / 4].map((v) => angles((d) => near(sin(d), v, 1e-3) || (sin(d) < v && sin(d + 1) > v)).length > 0); C.which(ok, true); });
Q('m04', mk.mcq({ stem: 'For an acute angle $A$, $\\operatorname{cosec} A \\cdot \\sin A$ equals', opts: ['$1$', '$0$', r`$\tan A$`, r`$\sec A$`], key: 'a', sol: r`$\operatorname{cosec} A = \dfrac{1}{\sin A}$, so the product is $1$.`, d: 1, c: 'recall', t: [1], time: 45 }), (C) => { C.assert(identity((d) => sin(d) / sin(d), () => 1), 'reciprocal'); C.key('a'); });
Q('m05', mk.mcq({ stem: 'The value of $2\\sin 30^\\circ + \\tan 45^\\circ$ is', opts: ['$2$', '$1$', r`$\dfrac32$`, r`$\sqrt3$`], key: 'a', sol: r`$2 \times \dfrac12 + 1 = 1 + 1 = 2$. Option (c) forgets to double $\sin 30^\circ$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => C.which([2, 1, 1.5, S3], 2 * sin(30) + tan(45)));
Q('m06', mk.mcq({ stem: 'The value of $\\tan^2 60^\\circ - 2\\sin^2 45^\\circ$ is', opts: ['$2$', '$1$', '$3$', r`$\dfrac23$`], key: 'a', sol: r`$\tan 60^\circ = \sqrt3$, so $\tan^2 60^\circ = 3$; $\sin 45^\circ = \dfrac{1}{\sqrt2}$, so $2\sin^2 45^\circ = 2 \times \dfrac12 = 1$. Value $= 3 - 1 = 2$. Option (c) forgets the second term.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([2, 1, 3, 2 / 3], tan(60) ** 2 - 2 * sin(45) ** 2));
Q('m07', mk.mcq({ stem: 'The value of $\\dfrac{1 + \\tan^2 30^\\circ}{1 - \\tan^2 30^\\circ}$ is', opts: ['$2$', r`$\dfrac12$`, '$1$', r`$\dfrac43$`], key: 'a', sol: r`$\tan^2 30^\circ = \dfrac13$. Numerator $1 + \dfrac13 = \dfrac43$, denominator $1 - \dfrac13 = \dfrac23$. Value $= \dfrac43 \div \dfrac23 = 2$. Option (d) is the numerator only.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => C.which([2, 0.5, 1, 4 / 3], (1 + tan(30) ** 2) / (1 - tan(30) ** 2)));
Q('m08', mk.mcq({ stem: 'If $\\sqrt3 \\tan\\theta = 1$ and $\\theta$ is acute, then $\\theta$ equals', opts: ['$30^\\circ$', '$60^\\circ$', '$45^\\circ$', '$90^\\circ$'], key: 'a', sol: r`$\tan\theta = \dfrac{1}{\sqrt3} = \tan 30^\circ$, so $\theta = 30^\circ$. Option (b) comes from $\tan\theta = \sqrt3$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { const th = angles((d) => near(S3 * tan(d), 1)); C.which([30, 60, 45, 90], th[0]); });
Q('m09', mk.mcq({ stem: 'Which of the following is not defined?', opts: [r`$\tan 90^\circ$`, r`$\cos 90^\circ$`, r`$\sin 90^\circ$`, r`$\cot 90^\circ$`], key: 'a', sol: r`$\tan 90^\circ = \dfrac{\sin 90^\circ}{\cos 90^\circ} = \dfrac10$, which is not defined. The others are $\cos 90^\circ = 0$, $\sin 90^\circ = 1$ and $\cot 90^\circ = \dfrac01 = 0$.`, d: 1, c: 'recall', t: [2], time: 45 }), (C) => { C.assert(Math.abs(cos(90)) < 1e-12 && Math.abs(tan(89.9999)) > 1e5, 'tan 90 undefined'); C.key('a'); });
Q('m10', mk.mcq({ stem: 'As $A$ increases from $0^\\circ$ to $90^\\circ$, the value of $\\cos A$', opts: ['decreases from $1$ to $0$', 'increases from $0$ to $1$', 'increases from $1$ to $2$', 'stays the same'], key: 'a', sol: r`$\cos 0^\circ = 1$, $\cos 30^\circ = \dfrac{\sqrt3}{2} \approx 0.87$, $\cos 45^\circ \approx 0.71$, $\cos 60^\circ = \dfrac12$, $\cos 90^\circ = 0$: it decreases from $1$ to $0$. Option (b) describes $\sin A$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { const xs = [0, 30, 45, 60, 90].map(cos); C.assert(xs.every((v, i) => i === 0 || v < xs[i - 1]) && near(xs[0], 1) && Math.abs(xs[4]) < 1e-12, 'decreasing 1 to 0'); C.key('a'); });
Q('m11', mk.mcq({ stem: 'If $A = 30^\\circ$, then $2\\sin A\\cos A$ equals', opts: [r`$\dfrac{\sqrt3}{2}$`, r`$\dfrac12$`, r`$\sqrt3$`, '$1$'], key: 'a', sol: r`$2 \times \dfrac12 \times \dfrac{\sqrt3}{2} = \dfrac{\sqrt3}{2}$. (This equals $\sin 60^\circ$.) Option (c) forgets that $\cos 30^\circ$ has $2$ in the denominator.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([S3 / 2, 0.5, S3, 1], 2 * sin(30) * cos(30)));
Q('m12', mk.mcq({ stem: 'The value of $6\\cos^2\\theta + 6\\sin^2\\theta - 4$ is', opts: ['$2$', '$6$', '$10$', '$0$'], key: 'a', sol: r`$6(\cos^2\theta + \sin^2\theta) - 4 = 6 \times 1 - 4 = 2$, for every $\theta$.`, d: 1, c: 'understanding', t: [3], time: 45 }), (C) => { C.assert(identity((d) => 6 * cos(d) ** 2 + 6 * sin(d) ** 2 - 4, () => 2), 'constant 2'); C.key('a'); });
Q('m13', mk.mcq({ stem: 'For an acute angle $A$, $\\sec^2 A\\,(1 - \\sin^2 A)$ equals', opts: ['$1$', r`$\sin^2 A$`, r`$\cos^2 A$`, r`$\tan^2 A$`], key: 'a', sol: r`$1 - \sin^2 A = \cos^2 A$, and $\sec^2 A \cdot \cos^2 A = 1$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { const fs = [() => 1, (d) => sin(d) ** 2, (d) => cos(d) ** 2, (d) => tan(d) ** 2]; C.which(fs.map((g) => identity((d) => (1 - sin(d) ** 2) / cos(d) ** 2, g)), true); });
Q('m14', mk.mcq({ stem: 'For an acute angle $\\theta$ with $\\sin\\theta = 0.6$, the value of $\\sec\\theta$ is', opts: [r`$\dfrac54$`, r`$\dfrac45$`, r`$\dfrac53$`, r`$\dfrac34$`], key: 'a', sol: r`$\cos\theta = \sqrt{1 - 0.36} = 0.8$, so $\sec\theta = \dfrac{1}{0.8} = \dfrac54$. Option (b) is $\cos\theta$; option (c) is $\operatorname{cosec}\theta$; option (d) is $\tan\theta$.`, d: 2, c: 'application', t: [3], time: 75 }), (C) => { const th = Math.asin(0.6) * 180 / Math.PI; C.which([5 / 4, 4 / 5, 5 / 3, 3 / 4], 1 / cos(th)); });
Q('m15', mk.mcq({ stem: 'For an acute angle $A$, $(\\sec A - \\tan A)(\\sec A + \\tan A)$ equals', opts: ['$1$', '$0$', r`$2\sec A$`, r`$\sec^2 A + \tan^2 A$`], key: 'a', sol: r`It is a difference of squares: $\sec^2 A - \tan^2 A = 1$, since $1 + \tan^2 A = \sec^2 A$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(identity((d) => (1 / cos(d) - tan(d)) * (1 / cos(d) + tan(d)), () => 1), 'identity'); C.key('a'); });
Q('m16', mk.mcq({ stem: 'If $\\tan\\theta + \\cot\\theta = 2$, then $\\tan^2\\theta + \\cot^2\\theta$ equals', opts: ['$2$', '$4$', '$0$', '$1$'], key: 'a', sol: r`Square: $\tan^2\theta + 2\tan\theta\cot\theta + \cot^2\theta = 4$. Since $\tan\theta\cot\theta = 1$, $\tan^2\theta + \cot^2\theta = 4 - 2 = 2$. (Here $\theta = 45^\circ$.) Option (b) forgets the middle term.`, d: 3, c: 'analysis', t: [3], time: 90 }), (C) => { const th = angles((d) => near(tan(d) + 1 / tan(d), 2, 1e-9)); C.assert(th.join() === '45', `${th}`); C.which([2, 4, 0, 1], tan(45) ** 2 + 1 / tan(45) ** 2); });
Q('m17', mk.mcq({ stem: 'A wheelchair ramp at a school in Pune rises $1.5$ m over a horizontal distance of $2$ m. The sine of the angle the ramp makes with the ground is', opts: ['$0.6$', '$0.75$', '$0.8$', '$1.33$'], key: 'a', sol: r`Ramp length $= \sqrt{1.5^2 + 2^2} = \sqrt{6.25} = 2.5$ m. $\sin = \dfrac{1.5}{2.5} = 0.6$. Option (b) is the tangent ($1.5 \div 2$); option (c) is the cosine.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { const h = hyp(1.5, 2); C.which([0.6, 0.75, 0.8, 1.33], 1.5 / h); });
Q('m18', mk.mcq({ stem: 'In triangle $ABC$, right-angled at $C$, $\\tan A = 1$. Then $2\\sin A\\cos A$ equals', opts: ['$1$', '$0$', r`$\sqrt2$`, r`$\dfrac12$`], key: 'a', sol: r`$\tan A = 1$ means the two legs are equal, so $A = 45^\circ$ and $\sin A = \cos A = \dfrac{1}{\sqrt2}$. Then $2 \times \dfrac{1}{\sqrt2} \times \dfrac{1}{\sqrt2} = 1$.`, d: 2, c: 'application', t: [1, 2], time: 75 }), (C) => { const A = angles((d) => near(tan(d), 1))[0]; C.which([1, 0, S2, 0.5], 2 * sin(A) * cos(A)); });

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: r`$\sin 45^\circ = \dfrac{1}{\sqrt2}$.`, r: r`In an isosceles right triangle, the hypotenuse is $\sqrt2$ times each of the equal sides.`, key: 'a', sol: r`With equal legs $a$, the hypotenuse is $\sqrt{a^2 + a^2} = \sqrt2 a$ (R), so $\sin 45^\circ = \dfrac{a}{\sqrt2 a} = \dfrac{1}{\sqrt2}$ (A). R explains A.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(near(sin(45), 1 / S2) && near(hyp(3, 3), S2 * 3), 'both'); C.key('a'); });
Q('ar2', mk.ar({ a: r`$\tan 45^\circ = 1$.`, r: r`$\sin 90^\circ = 1$.`, key: 'b', sol: r`Both are true values from the table, but $\sin 90^\circ$ has nothing to do with why $\tan 45^\circ = 1$ (that comes from the equal legs of an isosceles right triangle).`, d: 1, c: 'understanding', t: [2] }), (C) => { C.assert(near(tan(45), 1) && near(sin(90), 1), 'both true'); C.key('b'); });
Q('ar3', mk.ar({ a: r`For every acute angle $A$, $\sec A > 1$.`, r: r`$\sec A = \dfrac{1}{\sin A}$.`, key: 'c', sol: r`A is true: $\sec A = \dfrac{\text{hypotenuse}}{\text{adjacent side}}$ and the hypotenuse is longer than the adjacent side. R is false: $\sec A = \dfrac{1}{\cos A}$; it is $\operatorname{cosec} A$ that equals $\dfrac{1}{\sin A}$.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(angles(() => true).every((d) => 1 / cos(d) > 1) && !near(1 / cos(30), 1 / sin(30)), 'A true, R false'); C.key('c'); });
Q('ar4', mk.ar({ a: r`There is an acute angle $\theta$ with $\sin\theta = \dfrac54$.`, r: r`$\sin\theta = \dfrac{\text{side opposite } \theta}{\text{hypotenuse}}$, and the hypotenuse is the longest side of a right triangle.`, key: 'd', sol: r`R is true, and it shows that $\sin\theta < 1$ for an acute angle. Since $\dfrac54 > 1$, A is false.`, d: 2, c: 'analysis', t: [1] }), (C) => { C.assert(angles(() => true).every((d) => sin(d) < 1), 'sin < 1'); C.key('d'); });
Q('ar5', mk.ar({ a: r`$1 + \tan^2\theta = \sec^2\theta$ for every acute angle $\theta$.`, r: r`Dividing $AB^2 + BC^2 = AC^2$ (triangle $ABC$ right-angled at $B$, $\theta = \angle A$) by $AB^2$ gives it.`, key: 'a', sol: r`$\dfrac{AB^2}{AB^2} + \dfrac{BC^2}{AB^2} = \dfrac{AC^2}{AB^2}$ is $1 + \tan^2 A = \sec^2 A$. R is the proof of A.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(identity((d) => 1 + tan(d) ** 2, (d) => 1 / cos(d) ** 2), 'identity'); C.key('a'); });
Q('ar6', mk.ar({ a: r`If $\sin A = \cos A$ for an acute angle $A$, then $A = 60^\circ$.`, r: r`$\tan A = \dfrac{\sin A}{\cos A}$.`, key: 'd', sol: r`R is true. Using it, $\sin A = \cos A$ gives $\tan A = 1$, so $A = 45^\circ$, not $60^\circ$. A is false.`, d: 2, c: 'application', t: [2] }), (C) => { C.assert(angles((d) => near(sin(d), cos(d))).join() === '45', '45'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: 'For an acute angle $A$, $\\tan A$ can be greater than $1$.', key: 't', sol: r`$\tan A = \dfrac{\text{opposite}}{\text{adjacent}}$, and the opposite side can be the longer leg: $\tan 60^\circ = \sqrt3 \approx 1.73$.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(tan(60) > 1, 'tan 60'); C.key('t'); });
Q('tf2', mk.tf({ stem: 'If $\\sin A = \\dfrac35$ in a right triangle, then the side opposite $A$ must be $3$ cm long.', key: 'f', sol: r`$\sin A$ is a **ratio**. It fixes only the shape: the opposite side could be $3$ cm, $6$ cm or $1.5$ cm, with the hypotenuse $5$, $10$ or $2.5$ cm.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(near(6 / 10, 3 / 5), 'scaled'); C.key('f'); });
Q('tf3', mk.tf({ stem: '$\\cos 0^\\circ = 0$.', key: 'f', sol: r`$\cos 0^\circ = 1$. (It is $\sin 0^\circ$ that equals $0$.)`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(cos(0) === 1, 'cos 0'); C.key('f'); });
Q('tf4', mk.tf({ stem: '$\\sin 30^\\circ + \\sin 60^\\circ = \\sin 90^\\circ$.', key: 'f', sol: r`$\dfrac12 + \dfrac{\sqrt3}{2} = \dfrac{1 + \sqrt3}{2} \approx 1.37$, but $\sin 90^\circ = 1$. Sine does not add like that: $\sin(A + B) \ne \sin A + \sin B$ in general.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(!near(sin(30) + sin(60), sin(90)), 'not equal'); C.key('f'); });
Q('tf5', mk.tf({ stem: '$\\sec^2\\theta - \\tan^2\\theta = 1$ for every acute angle $\\theta$.', key: 't', sol: r`This is $1 + \tan^2\theta = \sec^2\theta$ rearranged.`, d: 1, c: 'recall', t: [3] }), (C) => { C.assert(identity((d) => 1 / cos(d) ** 2 - tan(d) ** 2, () => 1), 'identity'); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: '$\\tan 60^\\circ =$ ___', acc: [['√3', 'sqrt3', 'sqrt 3', 'root 3', 'sqrt(3)', '1.732']], sol: r`$\tan 60^\circ = \dfrac{\sin 60^\circ}{\cos 60^\circ} = \dfrac{\sqrt3/2}{1/2} = \sqrt3$.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(near(tan(60), S3), 'value'); C.blank('√3'); });
Q('fb2', mk.fill({ stem: 'If $\\cot A = \\dfrac{8}{15}$, then $\\tan A =$ ___', acc: [['15/8', '1.875']], sol: r`$\tan A = \dfrac{1}{\cot A} = \dfrac{15}{8}$. Answer: 15/8.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(15 / 8));
Q('fb3', mk.fill({ stem: '$\\cos^2 45^\\circ =$ ___', acc: [['1/2', '0.5']], sol: r`$\left(\dfrac{1}{\sqrt2}\right)^2 = \dfrac12$. Answer: 1/2.`, d: 1, c: 'recall', t: [2] }), (C) => C.blank(Math.round(cos(45) ** 2 * 1e12) / 1e12));
Q('fb4', mk.fill({ stem: 'For an acute angle $A$, $1 + \\cot^2 A =$ ___', acc: [['cosec^2 A', 'cosec²A', 'cosec² A', 'cosec^2A', 'cosec2A', 'csc^2 A', 'csc²A']], sol: r`Dividing $AB^2 + BC^2 = AC^2$ by $BC^2$ (the side opposite $A$) gives $\cot^2 A + 1 = \operatorname{cosec}^2 A$. Answer: cosec²A.`, d: 1, c: 'recall', t: [3] }), (C) => { C.assert(identity((d) => 1 + 1 / tan(d) ** 2, (d) => 1 / sin(d) ** 2), 'identity'); C.blank('cosec^2 A'); });
Q('fb5', mk.fill({ stem: 'If $\\sin A = \\dfrac{8}{17}$ and $A$ is acute, then $\\cos A =$ ___', acc: [['15/17']], sol: r`$\cos A = \sqrt{1 - \dfrac{64}{289}} = \sqrt{\dfrac{225}{289}} = \dfrac{15}{17}$. Answer: 15/17.`, d: 2, c: 'understanding', t: [1, 3] }), (C) => C.blank(Math.round(cos(Math.asin(8 / 17) * 180 / Math.PI) * 1e12) / 1e12));

// =============================================================== Numerical
Q('n01', mk.num({ stem: 'Evaluate $6\\tan^2 30^\\circ + 4\\cos^2 60^\\circ - 3\\sec^2 45^\\circ$.', value: -3, marks: 2, sol: r`**Step 1.** $\tan^2 30^\circ = \dfrac13$, $\cos^2 60^\circ = \dfrac14$, $\sec^2 45^\circ = 2$. **Step 2.** $6 \times \dfrac13 + 4 \times \dfrac14 - 3 \times 2 = 2 + 1 - 6 = -3$.`, scheme: [['Correct values', 1], ['−3', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => C.val(6 * tan(30) ** 2 + 4 * cos(60) ** 2 - 3 / cos(45) ** 2, 1e-9));
Q('n02', mk.num({ stem: 'In triangle $PQR$, right-angled at $Q$, $PR = 26$ cm and $PQ = 10$ cm. Find $\\tan P$.', value: 2.4, marks: 2, sol: r`**Step 1.** $QR = \sqrt{26^2 - 10^2} = \sqrt{576} = 24$ cm. **Step 2.** $\tan P = \dfrac{QR}{PQ} = \dfrac{24}{10} = 2.4$.`, scheme: [['QR = 24', 1], ['tan P = 2.4', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { const qr = Math.sqrt(26 ** 2 - 10 ** 2); C.assert(qr === 24, 'QR'); C.val(qr / 10); });
Q('n03', mk.num({ stem: 'Find the value of $\\sin 30^\\circ \\times \\tan 60^\\circ \\times \\cos 30^\\circ$.', value: 0.75, sol: r`$\dfrac12 \times \sqrt3 \times \dfrac{\sqrt3}{2} = \dfrac{3}{4} = 0.75$.`, scheme: [['0.75', 1]], d: 1, c: 'understanding', t: [2], time: 60 }), (C) => C.val(sin(30) * tan(60) * cos(30), 1e-9));
Q('n04', mk.num({ stem: 'If $\\theta$ is acute and $2\\sin\\theta - 1 = 0$, find the value of $3\\tan^2\\theta + 4\\cos^2\\theta$.', value: 4, marks: 2, sol: r`**Step 1.** $\sin\theta = \dfrac12$, so $\theta = 30^\circ$. **Step 2.** $3 \times \dfrac13 + 4 \times \dfrac34 = 1 + 3 = 4$.`, scheme: [['θ = 30°', 1], ['4', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { const th = angles((d) => near(2 * sin(d) - 1, 0))[0]; C.val(3 * tan(th) ** 2 + 4 * cos(th) ** 2, 1e-9); });
Q('n05', mk.num({ stem: 'If $\\sec\\theta = 1.25$ and $\\theta$ is acute, find $\\tan\\theta$ using an identity.', value: 0.75, marks: 2, sol: r`**Step 1.** $\tan^2\theta = \sec^2\theta - 1 = 1.5625 - 1 = 0.5625$. **Step 2.** $\tan\theta = 0.75$ (positive, as $\theta$ is acute).`, scheme: [['tan²θ = sec²θ − 1 = 0.5625', 1], ['0.75', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => { const th = Math.acos(1 / 1.25) * 180 / Math.PI; C.val(tan(th), 1e-9); });
Q('n06', mk.num({ stem: 'If $\\operatorname{cosec} A = 2.6$ and $A$ is acute, find $\\cot A$.', value: 2.4, marks: 2, sol: r`**Step 1.** $\cot^2 A = \operatorname{cosec}^2 A - 1 = 6.76 - 1 = 5.76$. **Step 2.** $\cot A = 2.4$.`, scheme: [['cot²A = 5.76', 1], ['2.4', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => { const A = Math.asin(1 / 2.6) * 180 / Math.PI; C.val(1 / tan(A), 1e-9); });
Q('n07', mk.num({ stem: 'In triangle $ABC$, right-angled at $B$, the hypotenuse $AC = 20$ cm and $\\sin A = 0.6$. Find the perimeter of the triangle in cm.', value: 48, unit: 'cm', marks: 2, sol: r`**Step 1.** $BC = AC \sin A = 20 \times 0.6 = 12$ cm, and $AB = \sqrt{400 - 144} = 16$ cm. **Step 2.** Perimeter $= 20 + 12 + 16 = 48$ cm.`, scheme: [['BC = 12 and AB = 16', 1], ['48 cm', 1]], d: 3, c: 'understanding', t: [1], time: 150 }), (C) => { const A = Math.asin(0.6) * 180 / Math.PI; C.val(20 + 20 * sin(A) + 20 * cos(A), 1e-9); });
Q('n08', mk.num({ stem: 'If $\\sin\\theta + \\cos\\theta = 1.4$ for an acute angle $\\theta$, find $\\sin\\theta\\cos\\theta$.', value: 0.48, marks: 2, sol: r`**Step 1.** Square: $\sin^2\theta + 2\sin\theta\cos\theta + \cos^2\theta = 1.96$, so $1 + 2\sin\theta\cos\theta = 1.96$. **Step 2.** $\sin\theta\cos\theta = \dfrac{0.96}{2} = 0.48$. (Indeed $\sin\theta = 0.6$, $\cos\theta = 0.8$ or the other way round.)`, scheme: [['1 + 2 sinθ cosθ = 1.96', 1], ['0.48', 1]], d: 3, c: 'analysis', t: [3], time: 150 }), (C) => { const th = Math.asin(0.6) * 180 / Math.PI; C.assert(near(sin(th) + cos(th), 1.4), 'example angle'); C.val(sin(th) * cos(th), 1e-9); });
Q('n09', mk.num({ stem: 'If $A = 45^\\circ$, find the value of $\\sec^2 A + \\operatorname{cosec}^2 A$.', value: 4, sol: r`$\sec 45^\circ = \operatorname{cosec} 45^\circ = \sqrt2$, so the value is $2 + 2 = 4$.`, scheme: [['4', 1]], d: 1, c: 'understanding', t: [2], time: 60 }), (C) => C.val(1 / cos(45) ** 2 + 1 / sin(45) ** 2, 1e-9));

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Given $7\\tan A = 24$, find $\\sin A$ and $\\sec A$.', model: r`$\tan A = \dfrac{24}{7}$: take the opposite side $24k$ and the adjacent side $7k$. Hypotenuse $= \sqrt{576k^2 + 49k^2} = 25k$.

$\sin A = \dfrac{24}{25}$ and $\sec A = \dfrac{25}{7}$.`, sol: r`**Check:** $\sec^2 A - \tan^2 A = \dfrac{625 - 576}{49} = 1$.`, scheme: [['Hypotenuse 25k', 1], ['sin A = 24/25, sec A = 25/7', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { const A = Math.atan(24 / 7) * 180 / Math.PI; C.assert(near(sin(A), 24 / 25) && near(1 / cos(A), 25 / 7), 'values'); C.model(['\\dfrac{24}{25}', '\\dfrac{25}{7}']); });
Q('s202', mk.short({ marks: 2, stem: 'In triangle $XYZ$, right-angled at $Y$, $XY = 9$ cm and $YZ = 12$ cm. Find $\\sin X$, $\\cos X$ and $\\tan X$.', model: r`$XZ = \sqrt{81 + 144} = 15$ cm.

$\sin X = \dfrac{YZ}{XZ} = \dfrac{12}{15} = \dfrac45$, $\cos X = \dfrac{XY}{XZ} = \dfrac{9}{15} = \dfrac35$, $\tan X = \dfrac{YZ}{XY} = \dfrac{12}{9} = \dfrac43$.`, sol: 'Identify the side opposite X (YZ) and the side adjacent to X (XY) first.', scheme: [['XZ = 15', 1], ['All three ratios', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { const X = Math.atan(12 / 9) * 180 / Math.PI; C.assert(near(sin(X), 0.8) && near(cos(X), 0.6) && hyp(9, 12) === 15, 'ratios'); C.model([15, '\\dfrac45', '\\dfrac35', '\\dfrac43']); });
Q('s203', mk.short({ marks: 2, stem: 'Evaluate $\\dfrac{2\\cos^2 60^\\circ + 3\\sec^2 30^\\circ - 2\\tan^2 45^\\circ}{\\sin^2 30^\\circ + \\cos^2 45^\\circ}$.', model: r`Numerator: $2 \times \dfrac14 + 3 \times \dfrac43 - 2 \times 1 = \dfrac12 + 4 - 2 = \dfrac52$.

Denominator: $\dfrac14 + \dfrac12 = \dfrac34$.

Value $= \dfrac52 \div \dfrac34 = \dfrac52 \times \dfrac43 = \dfrac{10}{3}$.`, sol: r`$\sec 30^\circ = \dfrac{2}{\sqrt3}$, so $\sec^2 30^\circ = \dfrac43$.`, scheme: [['Numerator 5/2 and denominator 3/4', 1], ['10/3', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (C) => { const v = (2 * cos(60) ** 2 + 3 / cos(30) ** 2 - 2 * tan(45) ** 2) / (sin(30) ** 2 + cos(45) ** 2); C.assert(near(v, 10 / 3), `${v}`); C.model(['\\dfrac52', '\\dfrac34', '\\dfrac{10}{3}']); });
Q('s204', mk.short({ marks: 2, stem: 'Find the acute angles $A$ and $B$, with $A > B$, if $\\tan(A + B) = 1$ and $\\sin(A - B) = \\dfrac12$.', model: r`$\tan(A + B) = 1 \Rightarrow A + B = 45^\circ$; $\sin(A - B) = \dfrac12 \Rightarrow A - B = 30^\circ$.

Adding: $2A = 75^\circ$, so $A = 37.5^\circ$ and $B = 7.5^\circ$.`, sol: r`Both $A + B$ and $A - B$ are acute here, so each equation has exactly one solution.`, scheme: [['A + B = 45°, A − B = 30°', 1], ['A = 37.5°, B = 7.5°', 1]], d: 3, c: 'understanding', t: [2], time: 150 }), (C) => { const A = 37.5, B = 7.5; C.assert(near(tan(A + B), 1) && near(sin(A - B), 0.5), 'check'); C.model([37.5, 7.5]); });
Q('s205', mk.short({ marks: 2, stem: 'Prove that $\\cot\\theta - \\tan\\theta = \\dfrac{2\\cos^2\\theta - 1}{\\sin\\theta\\cos\\theta}$ for every acute angle $\\theta$.', model: r`LHS $= \dfrac{\cos\theta}{\sin\theta} - \dfrac{\sin\theta}{\cos\theta} = \dfrac{\cos^2\theta - \sin^2\theta}{\sin\theta\cos\theta}$.

Since $\sin^2\theta = 1 - \cos^2\theta$, the numerator is $\cos^2\theta - (1 - \cos^2\theta) = 2\cos^2\theta - 1$. So LHS $=$ RHS.`, sol: 'Write everything in sine and cosine, then use sin²θ + cos²θ = 1.', scheme: [['Common denominator', 1], ['Numerator 2cos²θ − 1 via identity', 1]], d: 2, c: 'application', t: [3], time: 150 }), (C) => { C.assert(identity((d) => 1 / tan(d) - tan(d), (d) => (2 * cos(d) ** 2 - 1) / (sin(d) * cos(d))), 'identity'); C.model(['2\\cos^2\\theta - 1']); });
Q('s206', mk.short({ marks: 2, stem: 'If $x = 3\\sec\\theta$ and $y = 3\\tan\\theta$, show that $x^2 - y^2 = 9$.', model: r`$x^2 - y^2 = 9\sec^2\theta - 9\tan^2\theta = 9(\sec^2\theta - \tan^2\theta) = 9 \times 1 = 9$.`, sol: r`Uses $1 + \tan^2\theta = \sec^2\theta$.`, scheme: [['9(sec²θ − tan²θ)', 1], ['= 9', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => { C.assert(identity((d) => (3 / cos(d)) ** 2 - (3 * tan(d)) ** 2, () => 9), 'identity'); C.model([9]); });
Q('s207', mk.short({ marks: 2, stem: 'In triangle $ABC$, right-angled at $B$, $AB = 5$ cm and $BC = 12$ cm. Riya writes $\\sin A = \\dfrac{5}{13}$. Find her mistake and give the correct value.', model: r`$AC = \sqrt{25 + 144} = 13$ cm. She used the side **adjacent** to $A$ ($AB$), which gives $\cos A$.

The side opposite $A$ is $BC = 12$ cm, so $\sin A = \dfrac{12}{13}$.`, sol: r`Mark the angle first, then name the opposite side, the side across from it.`, scheme: [['Identifies adjacent used instead of opposite', 1], ['sin A = 12/13', 1]], d: 2, c: 'evaluation', t: [1], time: 120 }), (C) => { const A = Math.atan(12 / 5) * 180 / Math.PI; C.assert(near(sin(A), 12 / 13) && near(cos(A), 5 / 13), 'values'); C.model([13, '\\dfrac{12}{13}']); });
Q('s208', mk.short({ marks: 2, stem: 'If $\\tan\\theta = \\dfrac12$ for an acute angle $\\theta$, find $\\sin\\theta\\cos\\theta$ using identities.', model: r`$\sec^2\theta = 1 + \tan^2\theta = 1 + \dfrac14 = \dfrac54$, so $\cos^2\theta = \dfrac45$.

$\sin\theta\cos\theta = \tan\theta\cos^2\theta = \dfrac12 \times \dfrac45 = \dfrac25$.`, sol: r`**Check** with a triangle: legs $1$ and $2$, hypotenuse $\sqrt5$: $\dfrac{1}{\sqrt5} \times \dfrac{2}{\sqrt5} = \dfrac25$.`, scheme: [['cos²θ = 4/5', 1], ['2/5', 1]], d: 3, c: 'understanding', t: [3], time: 150 }), (C) => { const th = Math.atan(0.5) * 180 / Math.PI; C.assert(near(sin(th) * cos(th), 0.4) && near(cos(th) ** 2, 0.8), 'value'); C.model(['\\dfrac45', '\\dfrac25']); });
Q('s209', mk.short({ marks: 2, stem: 'If $\\sin A = \\dfrac{\\sqrt3}{2}$ and $A$ is acute, find the value of $2\\cot^2 A - 1$.', model: r`$\sin A = \dfrac{\sqrt3}{2}$ gives $A = 60^\circ$, so $\cot A = \dfrac{1}{\sqrt3}$ and $\cot^2 A = \dfrac13$.

$2 \times \dfrac13 - 1 = -\dfrac13$.`, sol: 'Find the angle first, then use the table.', scheme: [['A = 60°, cot²A = 1/3', 1], ['−1/3', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { const A = angles((d) => near(sin(d), S3 / 2))[0]; C.assert(A === 60 && near(2 / tan(A) ** 2 - 1, -1 / 3), 'value'); C.model(['-\\dfrac13']); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: 'If $\\tan\\theta = \\dfrac43$, find the value of $\\dfrac{2\\sin\\theta - \\cos\\theta}{2\\sin\\theta + \\cos\\theta}$.', model: r`Take the opposite side $4k$ and the adjacent side $3k$; the hypotenuse is $5k$. So $\sin\theta = \dfrac45$ and $\cos\theta = \dfrac35$.

$\dfrac{2 \times \frac45 - \frac35}{2 \times \frac45 + \frac35} = \dfrac{\frac85 - \frac35}{\frac85 + \frac35} = \dfrac{1}{\frac{11}{5}} = \dfrac{5}{11}$.`, sol: r`Shortcut: divide the numerator and denominator by $\cos\theta$: $\dfrac{2\tan\theta - 1}{2\tan\theta + 1} = \dfrac{\frac83 - 1}{\frac83 + 1} = \dfrac{5}{11}$.`, scheme: [['Hypotenuse 5k', 1], ['sin θ = 4/5, cos θ = 3/5', 1], ['5/11', 1]], d: 3, c: 'understanding', t: [1], time: 240 }), (C) => { const th = Math.atan(4 / 3) * 180 / Math.PI; C.assert(near((2 * sin(th) - cos(th)) / (2 * sin(th) + cos(th)), 5 / 11), 'value'); C.model(['\\dfrac45', '\\dfrac35', '\\dfrac{5}{11}']); });
Q('s302', mk.short({ marks: 3, stem: 'The hypotenuse $AC$ of a right triangle $ABC$ (right angle at $B$) is $2$ cm longer than the side $BC$, and $AB = 8$ cm. Work out $\\sin A$, $\\cos A$ and $\\tan A$.', model: r`$AC^2 - BC^2 = AB^2 = 64$, i.e. $(AC - BC)(AC + BC) = 64$, so $AC + BC = \dfrac{64}{2} = 32$.

With $AC - BC = 2$: $AC = 17$ cm and $BC = 15$ cm.

$\sin A = \dfrac{BC}{AC} = \dfrac{15}{17}$, $\cos A = \dfrac{AB}{AC} = \dfrac{8}{17}$, $\tan A = \dfrac{BC}{AB} = \dfrac{15}{8}$.`, sol: r`**Check:** $8^2 + 15^2 = 64 + 225 = 289 = 17^2$.`, scheme: [['AC + BC = 32', 1], ['AC = 17, BC = 15', 1], ['Three ratios', 1]], d: 4, c: 'analysis', t: [1], time: 300 }), (C) => { let found = null; for (let bc = 1; bc < 100; bc++) if (near(hyp(8, bc), bc + 2)) found = bc; C.assert(found === 15, `BC = ${found}`); C.model([32, 17, 15, '\\dfrac{15}{17}', '\\dfrac{8}{17}', '\\dfrac{15}{8}']); });
Q('s303', mk.short({ marks: 3, stem: 'If $A = 60^\\circ$ and $B = 30^\\circ$, find the value of $\\dfrac{\\tan A - \\tan B}{1 + \\tan A\\tan B}$ and show that it equals $\\tan(A - B)$.', model: r`$\tan 60^\circ = \sqrt3$, $\tan 30^\circ = \dfrac{1}{\sqrt3}$, and $\tan A\tan B = 1$.

$\dfrac{\sqrt3 - \frac{1}{\sqrt3}}{1 + 1} = \dfrac{\frac{3 - 1}{\sqrt3}}{2} = \dfrac{1}{\sqrt3}$.

$\tan(A - B) = \tan 30^\circ = \dfrac{1}{\sqrt3}$, so the two are equal.`, sol: r`Simplify $\sqrt3 - \dfrac{1}{\sqrt3} = \dfrac{2}{\sqrt3}$ before dividing.`, scheme: [['Values and tan A tan B = 1', 1], ['Expression = 1/√3', 1], ['tan 30° = 1/√3, equal', 1]], d: 2, c: 'understanding', t: [2], time: 240 }), (C) => { C.assert(near((tan(60) - tan(30)) / (1 + tan(60) * tan(30)), tan(30)), 'equal'); C.model(['\\dfrac{1}{\\sqrt3}']); });
Q('s304', mk.short({ marks: 3, stem: 'Show that, whatever the acute angle $\\theta$, $\\cos^2\\theta\\,(\\sec\\theta - 1)(\\sec\\theta + 1)$ simplifies to $\\sin^2\\theta$.', model: r`$(\sec\theta - 1)(\sec\theta + 1) = \sec^2\theta - 1$.

Since $1 + \tan^2\theta = \sec^2\theta$, this equals $\tan^2\theta$.

LHS $= \cos^2\theta \cdot \tan^2\theta = \cos^2\theta \cdot \dfrac{\sin^2\theta}{\cos^2\theta} = \sin^2\theta =$ RHS.`, sol: 'Difference of squares first, then an identity, then sine and cosine.', scheme: [['sec²θ − 1', 1], ['= tan²θ by identity', 1], ['cos²θ tan²θ = sin²θ', 1]], d: 3, c: 'understanding', t: [3], time: 240 }), (C) => { C.assert(identity((d) => cos(d) ** 2 * (1 / cos(d) - 1) * (1 / cos(d) + 1), (d) => sin(d) ** 2), 'identity'); C.model(['\\sec^2\\theta - 1', '\\tan^2\\theta']); });
Q('s305', mk.short({ marks: 3, stem: 'Given $\\tan\\theta = 0.75$ for an acute angle $\\theta$, use identities (not a triangle) to find $\\sec\\theta$, $\\cos\\theta$ and $\\sin\\theta$. Verify that $\\sin^2\\theta + \\cos^2\\theta = 1$.', model: r`$\sec^2\theta = 1 + 0.5625 = 1.5625$, so $\sec\theta = 1.25$ (positive for an acute angle).

$\cos\theta = \dfrac{1}{1.25} = 0.8$ and $\sin\theta = \tan\theta\cos\theta = 0.75 \times 0.8 = 0.6$.

Check: $0.36 + 0.64 = 1$ ✓.`, sol: 'Identity, then reciprocal, then tan × cos.', scheme: [['sec θ = 1.25', 1], ['cos θ = 0.8, sin θ = 0.6', 1], ['Verification', 1]], d: 2, c: 'understanding', t: [3], time: 240 }), (C) => { const th = Math.atan(0.75) * 180 / Math.PI; C.assert(near(1 / cos(th), 1.25) && near(sin(th), 0.6), 'values'); C.model([1.5625, 1.25, 0.8, 0.6, 0.36, 0.64]); });
Q('s306', mk.short({ marks: 3, stem: 'If $\\operatorname{cosec}\\theta - \\cot\\theta = \\dfrac13$ for an acute angle $\\theta$, find $\\operatorname{cosec}\\theta + \\cot\\theta$, and hence find $\\operatorname{cosec}\\theta$ and $\\cot\\theta$.', model: r`$(\operatorname{cosec}\theta - \cot\theta)(\operatorname{cosec}\theta + \cot\theta) = \operatorname{cosec}^2\theta - \cot^2\theta = 1$, so $\operatorname{cosec}\theta + \cot\theta = 3$.

Adding the two equations: $2\operatorname{cosec}\theta = \dfrac{10}{3}$, so $\operatorname{cosec}\theta = \dfrac53$; subtracting: $2\cot\theta = \dfrac83$, so $\cot\theta = \dfrac43$.`, sol: r`**Check:** $\dfrac{25}{9} - \dfrac{16}{9} = 1$ ✓.`, scheme: [['Sum = 3 using the identity', 1], ['cosec θ = 5/3', 1], ['cot θ = 4/3', 1]], d: 4, c: 'analysis', t: [3], time: 300 }), (C) => { const th = Math.asin(3 / 5) * 180 / Math.PI; C.assert(near(1 / sin(th) - 1 / tan(th), 1 / 3) && near(1 / sin(th) + 1 / tan(th), 3), 'values'); C.model([3, '\\dfrac53', '\\dfrac43']); });
Q('s307', mk.short({ marks: 3, stem: 'Aman claims that for some acute angle $\\theta$, $\\sin\\theta + \\cos\\theta = 1.5$. Is he right? Justify.', model: r`$(\sin\theta + \cos\theta)^2 = \sin^2\theta + \cos^2\theta + 2\sin\theta\cos\theta = 1 + 2\sin\theta\cos\theta$.

Since $(\sin\theta - \cos\theta)^2 \ge 0$, we have $2\sin\theta\cos\theta \le \sin^2\theta + \cos^2\theta = 1$. So $(\sin\theta + \cos\theta)^2 \le 2$, i.e. $\sin\theta + \cos\theta \le \sqrt2 \approx 1.414$.

As $1.5 > 1.414$, Aman is **not** right. (The largest value, $\sqrt2$, occurs at $\theta = 45^\circ$.)`, sol: 'Square the sum and use the identity; a square is never negative.', scheme: [['(sin θ + cos θ)² = 1 + 2 sin θ cos θ', 1], ['2 sin θ cos θ ≤ 1, so the sum ≤ √2', 1], ['Conclusion', 1]], d: 4, c: 'evaluation', t: [3], time: 300 }), (C) => { const mx = Math.max(...angles(() => true).map((d) => sin(d) + cos(d))); C.assert(near(mx, S2, 1e-9) && near(sin(45) + cos(45), S2), 'max √2 at 45'); C.model([1.414, 1.5]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: `(a) For an acute angle $A$ of triangle $ABC$, right-angled at $B$, prove that $\\sin^2 A + \\cos^2 A = 1$.
(b) Hence derive $1 + \\tan^2 A = \\sec^2 A$, stating the angles for which it holds.
(c) Derive $\\cot^2 A + 1 = \\operatorname{cosec}^2 A$, stating the angles for which it holds.`, model: r`(a) By Pythagoras' theorem, $AB^2 + BC^2 = AC^2$. Dividing each term by $AC^2$: $\left(\dfrac{AB}{AC}\right)^2 + \left(\dfrac{BC}{AC}\right)^2 = 1$, i.e. $\cos^2 A + \sin^2 A = 1$. (It also holds for $A = 0^\circ$ and $A = 90^\circ$.)

(b) Divide $AB^2 + BC^2 = AC^2$ by $AB^2$: $1 + \left(\dfrac{BC}{AB}\right)^2 = \left(\dfrac{AC}{AB}\right)^2$, i.e. $1 + \tan^2 A = \sec^2 A$. It holds for $0^\circ \le A < 90^\circ$ ($\tan$ and $\sec$ are not defined at $90^\circ$).

(c) Divide by $BC^2$: $\left(\dfrac{AB}{BC}\right)^2 + 1 = \left(\dfrac{AC}{BC}\right)^2$, i.e. $\cot^2 A + 1 = \operatorname{cosec}^2 A$. It holds for $0^\circ < A \le 90^\circ$ ($\cot$ and $\operatorname{cosec}$ are not defined at $0^\circ$).`, sol: 'Each identity is Pythagoras’ theorem divided by the square of one side.', scheme: [['Pythagoras stated for the triangle', 1], ['Division by AC² and conclusion', 1], ['Division by AB² gives 1 + tan²A = sec²A', 1], ['Division by BC² gives cot²A + 1 = cosec²A', 1], ['Valid angle ranges stated', 1]], d: 3, c: 'understanding', bloom: 'understand', t: [3], time: 600 }), (C) => { C.assert(identity((d) => sin(d) ** 2 + cos(d) ** 2, () => 1) && identity((d) => 1 + tan(d) ** 2, (d) => 1 / cos(d) ** 2) && identity((d) => 1 / tan(d) ** 2 + 1, (d) => 1 / sin(d) ** 2), 'identities'); C.model(['AB^2 + BC^2 = AC^2', '90^\\circ']); });
Q('l02', mk.long({ stem: `Given $3\\tan\\theta = 4$, where $\\theta$ is acute:

(a) find $\\sin\\theta$ and $\\cos\\theta$;
(b) evaluate $\\dfrac{4\\cos\\theta - \\sin\\theta}{2\\cos\\theta + \\sin\\theta}$;
(c) verify that $\\sec^2\\theta - \\tan^2\\theta = 1$ with your values.`, model: r`(a) $\tan\theta = \dfrac43$: opposite $4k$, adjacent $3k$, hypotenuse $\sqrt{16k^2 + 9k^2} = 5k$. So $\sin\theta = \dfrac45$ and $\cos\theta = \dfrac35$.

(b) $\dfrac{4 \times \frac35 - \frac45}{2 \times \frac35 + \frac45} = \dfrac{\frac{12 - 4}{5}}{\frac{6 + 4}{5}} = \dfrac{8}{10} = \dfrac45$.

(c) $\sec\theta = \dfrac53$, so $\sec^2\theta - \tan^2\theta = \dfrac{25}{9} - \dfrac{16}{9} = \dfrac99 = 1$ ✓.`, sol: r`In (b), dividing through by $\cos\theta$ gives $\dfrac{4 - \tan\theta}{2 + \tan\theta} = \dfrac{\frac83}{\frac{10}{3}} = \dfrac45$ — the same answer.`, scheme: [['Hypotenuse 5k', 1], ['sin θ = 4/5, cos θ = 3/5', 1], ['Substitution in (b)', 1], ['4/5', 1], ['Verification in (c)', 1]], d: 3, c: 'understanding', t: [1, 3], time: 600 }), (C) => { const th = Math.atan(4 / 3) * 180 / Math.PI; C.assert(near((4 * cos(th) - sin(th)) / (2 * cos(th) + sin(th)), 0.8), 'value'); C.model(['\\dfrac45', '\\dfrac35', '\\dfrac{8}{10}', '\\dfrac{25}{9}', '\\dfrac{16}{9}']); });
Q('l03', mk.long({ stem: `(a) Find the acute angle $\\theta$ for which $2\\sin^2\\theta = \\dfrac12$.
(b) For this $\\theta$, evaluate $4\\cos^2\\theta - 3\\sec^2 2\\theta$.
(c) For this $\\theta$, verify that $\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$.`, model: r`(a) $\sin^2\theta = \dfrac14$, so $\sin\theta = \dfrac12$ (positive for an acute angle) and $\theta = 30^\circ$.

(b) $2\theta = 60^\circ$, $\sec 60^\circ = 2$. $4\cos^2 30^\circ - 3\sec^2 60^\circ = 4 \times \dfrac34 - 3 \times 4 = 3 - 12 = -9$.

(c) LHS $= \sin 90^\circ = 1$. RHS $= 3 \times \dfrac12 - 4 \times \dfrac18 = \dfrac32 - \dfrac12 = 1$. Both sides equal $1$ ✓.`, sol: r`$3\theta = 90^\circ$ is still a standard angle, which is why this value of $\theta$ was chosen.`, scheme: [['θ = 30°', 1], ['Values cos²30° = 3/4 and sec²60° = 4', 1], ['−9', 1], ['LHS = sin 90° = 1', 1], ['RHS = 1, verified', 1]], d: 3, c: 'understanding', t: [2], time: 600 }), (C) => { const th = angles((d) => near(2 * sin(d) ** 2, 0.5))[0]; C.assert(th === 30 && near(sin(3 * th), 3 * sin(th) - 4 * sin(th) ** 3), 'θ and identity'); C.model([30, -9, 1]); C.assert(near(4 * cos(th) ** 2 - 3 / cos(2 * th) ** 2, -9), '−9'); });
Q('l04', mk.long({ stem: `For an acute angle $\\theta$ with $\\theta > 45^\\circ$, it is given that $\\sin\\theta + \\cos\\theta = \\dfrac75$.

(a) Show that $\\sin\\theta\\cos\\theta = \\dfrac{12}{25}$.
(b) Find $\\sin\\theta - \\cos\\theta$.
(c) Find $\\sin\\theta$, $\\cos\\theta$ and $\\tan\\theta$.
(d) Verify that $1 + \\tan^2\\theta = \\sec^2\\theta$ with these values.`, model: r`(a) Squaring: $1 + 2\sin\theta\cos\theta = \dfrac{49}{25}$, so $2\sin\theta\cos\theta = \dfrac{24}{25}$ and $\sin\theta\cos\theta = \dfrac{12}{25}$.

(b) $(\sin\theta - \cos\theta)^2 = 1 - 2\sin\theta\cos\theta = 1 - \dfrac{24}{25} = \dfrac{1}{25}$. For $\theta > 45^\circ$, $\sin\theta > \cos\theta$, so $\sin\theta - \cos\theta = \dfrac15$.

(c) Adding and subtracting with (given): $\sin\theta = \dfrac12\left(\dfrac75 + \dfrac15\right) = \dfrac45$ and $\cos\theta = \dfrac12\left(\dfrac75 - \dfrac15\right) = \dfrac35$; $\tan\theta = \dfrac43$.

(d) $1 + \dfrac{16}{9} = \dfrac{25}{9}$ and $\sec^2\theta = \left(\dfrac53\right)^2 = \dfrac{25}{9}$ ✓.`, sol: r`Without the condition $\theta > 45^\circ$, the values of $\sin\theta$ and $\cos\theta$ could be swapped: both $\dfrac45, \dfrac35$ and $\dfrac35, \dfrac45$ give the sum $\dfrac75$.`, scheme: [['Squaring with the identity: sinθ cosθ = 12/25', 1], ['(sin θ − cos θ)² = 1/25', 1], ['Sign chosen from θ > 45°: 1/5', 1], ['sin θ = 4/5, cos θ = 3/5, tan θ = 4/3', 1], ['Verification', 1]], d: 5, c: 'analysis', t: [3], time: 720 }), (C) => { const sols = angles((d) => near(sin(d) + cos(d), 1.4, 1e-3)); const th = Math.asin(0.8) * 180 / Math.PI; C.assert(near(sin(th) + cos(th), 1.4) && th > 45 && near(sin(th) * cos(th), 12 / 25) && near(sin(th) - cos(th), 0.2), 'values'); C.assert(sols.length === 0 || sols.every((d) => d > 30 && d < 60), 'two symmetric solutions'); C.model(['\\dfrac{12}{25}', '\\dfrac{1}{25}', '\\dfrac15', '\\dfrac45', '\\dfrac35', '\\dfrac43', '\\dfrac{25}{9}']); });
Q('l05', mk.long({ stem: `A road in Shimla climbs steadily: for a horizontal distance of $120$ m it rises $50$ m.

(a) Find the length of the road along the slope.
(b) Find $\\sin\\theta$, $\\cos\\theta$ and $\\tan\\theta$, where $\\theta$ is the angle the road makes with the horizontal.
(c) Is $\\theta$ more or less than $30^\\circ$? Justify using the values of sine.
(d) If the road were built at exactly $30^\\circ$ over the same horizontal $120$ m, how much would it rise? (Use $\\sqrt3 \\approx 1.732$.)`, model: r`(a) $\sqrt{120^2 + 50^2} = \sqrt{14400 + 2500} = \sqrt{16900} = 130$ m.

(b) $\sin\theta = \dfrac{50}{130} = \dfrac{5}{13}$, $\cos\theta = \dfrac{120}{130} = \dfrac{12}{13}$, $\tan\theta = \dfrac{50}{120} = \dfrac{5}{12}$.

(c) $\sin\theta = \dfrac{5}{13} \approx 0.385$, which is less than $\sin 30^\circ = 0.5$. Since $\sin\theta$ increases as $\theta$ increases from $0^\circ$ to $90^\circ$, $\theta < 30^\circ$.

(d) Rise $= 120\tan 30^\circ = \dfrac{120}{\sqrt3} = 40\sqrt3 \approx 40 \times 1.732 = 69.28$ m.`, sol: r`The real road rises only $50$ m, consistent with $\theta < 30^\circ$.`, scheme: [['Road length 130 m', 1], ['Three ratios', 1], ['Comparison 5/13 < 1/2', 1], ['Increasing sine argument', 1], ['Rise 40√3 ≈ 69.28 m', 1]], d: 4, c: 'application', t: [1, 2], time: 660 }), (C) => { const th = Math.atan(50 / 120) * 180 / Math.PI; C.assert(hyp(120, 50) === 130 && th < 30, 'length and angle'); C.assert(near(120 * tan(30), 40 * S3) && near(40 * 1.732, 69.28), 'rise'); C.model([130, '\\dfrac{5}{13}', '\\dfrac{12}{13}', '\\dfrac{5}{12}', 0.385, 69.28]); });
Q('l06', mk.long({ stem: `(a) Prove that $\\sin^4 A + \\cos^4 A = 1 - 2\\sin^2 A\\cos^2 A$.
(b) Hence prove that $\\sin^6 A + \\cos^6 A = 1 - 3\\sin^2 A\\cos^2 A$.
(c) Verify the result of (b) for $A = 30^\\circ$.`, model: r`(a) $\sin^4 A + \cos^4 A = (\sin^2 A + \cos^2 A)^2 - 2\sin^2 A\cos^2 A = 1 - 2\sin^2 A\cos^2 A$.

(b) Write $p = \sin^2 A$, $q = \cos^2 A$, so $p + q = 1$. Then $p^3 + q^3 = (p + q)(p^2 - pq + q^2) = 1 \times (p^2 + q^2 - pq)$.

By (a), $p^2 + q^2 = 1 - 2pq$, so $p^3 + q^3 = 1 - 2pq - pq = 1 - 3\sin^2 A\cos^2 A$.

(c) $\sin 30^\circ = \dfrac12$, $\cos 30^\circ = \dfrac{\sqrt3}{2}$: LHS $= \dfrac{1}{64} + \dfrac{27}{64} = \dfrac{28}{64} = \dfrac{7}{16}$. RHS $= 1 - 3 \times \dfrac14 \times \dfrac34 = 1 - \dfrac{9}{16} = \dfrac{7}{16}$ ✓.`, sol: r`The step "$p + q = 1$" is the identity $\sin^2 A + \cos^2 A = 1$; everything else is algebra.`, scheme: [['(a) square of sin²A + cos²A', 1], ['(b) sum of cubes factorised', 1], ['(b) uses (a) to reach 1 − 3sin²A cos²A', 1], ['(c) LHS = 7/16', 1], ['(c) RHS = 7/16', 1]], d: 4, c: 'analysis', t: [3], time: 660 }), (C) => { C.assert(identity((d) => sin(d) ** 4 + cos(d) ** 4, (d) => 1 - 2 * sin(d) ** 2 * cos(d) ** 2) && identity((d) => sin(d) ** 6 + cos(d) ** 6, (d) => 1 - 3 * sin(d) ** 2 * cos(d) ** 2), 'identities'); C.assert(near(sin(30) ** 6 + cos(30) ** 6, 7 / 16), '7/16'); C.model(['\\dfrac{28}{64}', '\\dfrac{7}{16}', '\\dfrac{9}{16}']); });

// =============================================================== Case-based
caseQ('c01', {
  passage: 'A hospital in Pune builds a wheelchair ramp. The ramp rises 0.7 m over a horizontal distance of 2.4 m. Let $A$ be the angle the ramp makes with the ground.',
  d: 3, c: 'understanding',
  model: r`(a) Option (c): $2.5$ m. (b) $0.28$. (c) (i) $\cos A = 0.96$, $\tan A = \dfrac{7}{24} \approx 0.29$. Or (ii) No: $\tan A \approx 0.29 > \dfrac{1}{12} \approx 0.083$.`,
  sol: r`Ramp length $= \sqrt{0.49 + 5.76} = \sqrt{6.25} = 2.5$ m. $\sin A = \dfrac{0.7}{2.5} = 0.28$, $\cos A = \dfrac{2.4}{2.5} = 0.96$, $\tan A = \dfrac{0.7}{2.4} = \dfrac{7}{24}$.`,
  children: [
    child('a', mk.mcq({ stem: 'The length of the ramp is', opts: ['$3.1$ m', '$1.7$ m', '$2.5$ m', '$6.25$ m'], key: 'c', sol: r`$\sqrt{0.7^2 + 2.4^2} = \sqrt{6.25} = 2.5$ m. Option (a) adds the two lengths; option (d) forgets the square root.`, d: 1, c: 'understanding', t: [1], time: 60 })),
    child('b', mk.num({ stem: 'Find $\\sin A$.', value: 0.28, sol: r`$\sin A = \dfrac{\text{rise}}{\text{ramp}} = \dfrac{0.7}{2.5} = 0.28$.`, scheme: [['0.28', 1]], d: 2, c: 'understanding', t: [1], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find $\\cos A$ and $\\tan A$.', model: r`$\cos A = \dfrac{2.4}{2.5} = 0.96$ and $\tan A = \dfrac{0.7}{2.4} = \dfrac{7}{24} \approx 0.29$.`, sol: r`**Check:** $0.28^2 + 0.96^2 = 0.0784 + 0.9216 = 1$.`, scheme: [['cos A = 0.96', 1], ['tan A = 7/24', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** A guideline says a ramp should have $\\tan A \\le \\dfrac{1}{12}$. Does this ramp meet the guideline? What horizontal length would be needed for the same rise?', model: r`$\tan A = \dfrac{7}{24} \approx 0.29$, which is more than $\dfrac{1}{12} \approx 0.083$: the ramp is too steep.

For $\tan A = \dfrac{1}{12}$ with a rise of $0.7$ m, the horizontal length must be $0.7 \times 12 = 8.4$ m.`, sol: 'Compare tangents; then solve rise ÷ run = 1/12.', scheme: [['Comparison and conclusion', 1], ['8.4 m', 1]], d: 3, c: 'evaluation', t: [1], time: 150 }),
    ]),
  ],
}, (C) => { const h = hyp(0.7, 2.4); C.child('a').which([3.1, 1.7, 2.5, 6.25], Math.round(h * 1e9) / 1e9); C.child('b').val(Math.round((0.7 / h) * 1e12) / 1e12); C.child('c').assert(near(2.4 / h, 0.96), 'cos'); C.child('c').model([0.96, 0.29]); C.child('cii').assert(0.7 / 2.4 > 1 / 12 && near(0.7 * 12, 8.4), 'guideline'); C.child('cii').model([0.29, 0.083, 8.4]); C.model([2.5, 0.28, 0.96, 0.29, 0.083]); });

caseQ('c02', {
  passage: 'For a rangoli competition in Chennai, Kavya draws an equilateral triangle $ABC$ of side $4$ cm and the line $AD$ from $A$ perpendicular to $BC$. She uses the figure to find the trigonometric ratios of $30^\\circ$ and $60^\\circ$.',
  d: 3, c: 'understanding',
  model: r`(a) Option (b): $2\sqrt3$ cm. (b) $\dfrac{\sqrt3}{2}$. (c) (i) $\tan 30^\circ = \dfrac{1}{\sqrt3}$. Or (ii) $\tan 60^\circ = \sqrt3 = \dfrac{\sin 60^\circ}{\cos 60^\circ}$.`,
  sol: r`$BD = 2$ cm (the perpendicular bisects $BC$). $AD = \sqrt{16 - 4} = \sqrt{12} = 2\sqrt3$ cm. $\angle B = 60^\circ$, $\angle BAD = 30^\circ$.`,
  children: [
    child('a', mk.mcq({ stem: 'The length of AD is', opts: ['$2$ cm', r`$2\sqrt3$ cm`, r`$4\sqrt3$ cm`, r`$\sqrt{20}$ cm`], key: 'b', sol: r`$BD = 2$ cm, so $AD = \sqrt{4^2 - 2^2} = \sqrt{12} = 2\sqrt3$ cm. Option (d) adds the squares instead of subtracting.`, d: 2, c: 'understanding', t: [2], time: 75 })),
    child('b', mk.fill({ stem: 'From triangle $ABD$, $\\sin 60^\\circ =$ ___', acc: [['√3/2', 'sqrt3/2', '(√3)/2', '0.866']], sol: r`$\sin B = \dfrac{AD}{AB} = \dfrac{2\sqrt3}{4} = \dfrac{\sqrt3}{2}$. Answer: √3/2.`, d: 1, c: 'recall', t: [2], time: 45 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Use triangle $ABD$ to find $\\tan 30^\\circ$.', model: r`In triangle $ABD$, $\angle BAD = 30^\circ$; the side opposite it is $BD = 2$ cm and the adjacent side is $AD = 2\sqrt3$ cm.

$\tan 30^\circ = \dfrac{BD}{AD} = \dfrac{2}{2\sqrt3} = \dfrac{1}{\sqrt3}$.`, sol: 'The angle at A in triangle ABD is half of 60°.', scheme: [['Opposite BD, adjacent AD', 1], ['1/√3', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Use triangle $ABD$ to find $\\tan 60^\\circ$, and verify that $\\tan 60^\\circ = \\dfrac{\\sin 60^\\circ}{\\cos 60^\\circ}$.', model: r`At $B$ ($60^\circ$): opposite $AD = 2\sqrt3$ cm, adjacent $BD = 2$ cm, so $\tan 60^\circ = \dfrac{2\sqrt3}{2} = \sqrt3$.

$\sin 60^\circ = \dfrac{AD}{AB} = \dfrac{\sqrt3}{2}$ and $\cos 60^\circ = \dfrac{BD}{AB} = \dfrac12$, so $\dfrac{\sin 60^\circ}{\cos 60^\circ} = \dfrac{\sqrt3/2}{1/2} = \sqrt3$ ✓.`, sol: 'Read each ratio from triangle ABD, standing at B.', scheme: [['tan 60° = √3 from the figure', 1], ['sin 60° ÷ cos 60° = √3, verified', 1]], d: 2, c: 'understanding', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { const ad = Math.sqrt(16 - 4); C.child('a').which([2, 2 * S3, 4 * S3, Math.sqrt(20)], ad); C.child('b').assert(near(ad / 4, sin(60)), 'sin 60'); C.child('b').blank('√3/2'); C.child('c').assert(near(2 / ad, tan(30)), 'tan 30'); C.child('c').model(['\\dfrac{1}{\\sqrt3}']); C.child('cii').assert(near(ad / 2, tan(60)) && near(sin(60) / cos(60), S3), 'tan 60'); C.child('cii').model(['\\sqrt3', '\\dfrac12']); C.model(['2\\sqrt3', '\\dfrac{\\sqrt3}{2}', '\\dfrac{1}{\\sqrt3}']); });

caseQ('c03', {
  passage: 'In a trigonometry relay in a Lucknow school, the first runner is told only that $\\sec\\theta = \\dfrac54$ for an acute angle $\\theta$. Each runner must find one more value using identities.',
  d: 3, c: 'understanding',
  model: r`(a) Option (a): $\dfrac34$. (b) $0.6$. (c) (i) $1$. Or (ii) $\dfrac{16}{9}$.`,
  sol: r`$\tan^2\theta = \dfrac{25}{16} - 1 = \dfrac{9}{16}$, $\tan\theta = \dfrac34$; $\cos\theta = \dfrac45$; $\sin\theta = \tan\theta\cos\theta = \dfrac35$.`,
  children: [
    child('a', mk.mcq({ stem: 'Using $1 + \\tan^2\\theta = \\sec^2\\theta$, the value of $\\tan\\theta$ is', opts: [r`$\dfrac34$`, r`$\dfrac{9}{16}$`, r`$\dfrac43$`, r`$\dfrac35$`], key: 'a', sol: r`$\tan^2\theta = \dfrac{25}{16} - 1 = \dfrac{9}{16}$, so $\tan\theta = \dfrac34$. Option (b) forgets the square root.`, d: 2, c: 'understanding', t: [3], time: 60 })),
    child('b', mk.num({ stem: 'Find $\\sin\\theta$.', value: 0.6, sol: r`$\cos\theta = \dfrac{1}{\sec\theta} = 0.8$ and $\sin\theta = \tan\theta\cos\theta = 0.75 \times 0.8 = 0.6$.`, scheme: [['0.6', 1]], d: 2, c: 'understanding', t: [3], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Without finding $\\theta$, evaluate $(\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta)$ in two ways.', model: r`By the identity: $\sec^2\theta - \tan^2\theta = 1$.

By the values: $\left(\dfrac54 + \dfrac34\right)\left(\dfrac54 - \dfrac34\right) = 2 \times \dfrac12 = 1$. Both give $1$.`, sol: 'Difference of squares.', scheme: [['Identity method', 1], ['Value method', 1]], d: 2, c: 'application', t: [3], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Evaluate $\\dfrac{1 + \\cot^2\\theta}{1 + \\tan^2\\theta}$.', model: r`$\dfrac{1 + \cot^2\theta}{1 + \tan^2\theta} = \dfrac{\operatorname{cosec}^2\theta}{\sec^2\theta} = \dfrac{\cos^2\theta}{\sin^2\theta} = \cot^2\theta = \left(\dfrac43\right)^2 = \dfrac{16}{9}$.`, sol: r`**Check** with values: $\dfrac{1 + \frac{16}{9}}{1 + \frac{9}{16}} = \dfrac{25/9}{25/16} = \dfrac{16}{9}$.`, scheme: [['Simplifies to cot²θ', 1], ['16/9', 1]], d: 3, c: 'understanding', t: [3], time: 150 }),
    ]),
  ],
}, (C) => { const th = Math.acos(4 / 5) * 180 / Math.PI; C.child('a').which([0.75, 9 / 16, 4 / 3, 0.6], tan(th)); C.child('b').val(Math.round(sin(th) * 1e12) / 1e12); C.child('c').assert(near((1 / cos(th) + tan(th)) * (1 / cos(th) - tan(th)), 1), '1'); C.child('c').model([1]); C.child('cii').assert(near((1 + 1 / tan(th) ** 2) / (1 + tan(th) ** 2), 16 / 9), '16/9'); C.child('cii').model(['\\dfrac{16}{9}']); C.model(['\\dfrac34', 0.6, '\\dfrac{16}{9}']); });

caseQ('c04', {
  passage: 'The roof truss of a house in Kozhikode is an isosceles triangle $LTR$ with base $LR = 8$ m. Each rafter $LT$ and $RT$ makes an angle of $30^\\circ$ with the base, and $TM$ is the height from the apex $T$ to the base.',
  assets: [roof], d: 3, c: 'understanding',
  model: r`(a) Option (d): $LM = 4$ m. (b) $2.31$ m. (c) (i) $\dfrac{8}{\sqrt3} \approx 4.62$ m. Or (ii) $\angle LTR = 120^\circ$; $LT + RT \approx 9.24$ m.`,
  sol: r`$M$ is the midpoint of $LR$, so $LM = 4$ m. $\tan 30^\circ = \dfrac{TM}{LM} \Rightarrow TM = \dfrac{4}{\sqrt3} \approx 2.31$ m. $\cos 30^\circ = \dfrac{LM}{LT} \Rightarrow LT = \dfrac{4}{\sqrt3/2} = \dfrac{8}{\sqrt3} \approx 4.62$ m.`,
  children: [
    child('a', mk.mcq({ stem: 'The height $TM$ meets the base at $M$. The length $LM$ is', opts: ['$8$ m', '$2$ m', r`$4\sqrt3$ m`, '$4$ m'], key: 'd', sol: r`In an isosceles triangle the height from the apex bisects the base: $LM = \dfrac82 = 4$ m.`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'Find the height $TM$ in metres, correct to two decimal places. (Use $\\sqrt3 \\approx 1.732$.)', value: 2.31, tol: 0.005, unit: 'm', sol: r`$TM = LM\tan 30^\circ = \dfrac{4}{\sqrt3} = \dfrac{4\sqrt3}{3} \approx \dfrac{6.928}{3} \approx 2.31$ m.`, scheme: [['2.31 m', 1]], d: 2, c: 'understanding', t: [1, 2], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the length of each rafter.', model: r`$\cos 30^\circ = \dfrac{LM}{LT}$, so $LT = \dfrac{4}{\cos 30^\circ} = \dfrac{4}{\sqrt3/2} = \dfrac{8}{\sqrt3} = \dfrac{8\sqrt3}{3} \approx 4.62$ m.`, sol: r`**Check:** $LM^2 + TM^2 = 16 + \dfrac{16}{3} = \dfrac{64}{3} = LT^2$ ✓.`, scheme: [['cos 30° = LM/LT', 1], ['8/√3 ≈ 4.62 m', 1]], d: 3, c: 'understanding', t: [1, 2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the angle at the apex $T$ and the total length of timber in the two rafters.', model: r`Angle sum: $\angle LTR = 180^\circ - 30^\circ - 30^\circ = 120^\circ$.

Two rafters: $2 \times \dfrac{8}{\sqrt3} = \dfrac{16}{\sqrt3} \approx 9.24$ m.`, sol: r`$\dfrac{16}{\sqrt3} = \dfrac{16\sqrt3}{3} \approx \dfrac{27.71}{3}$.`, scheme: [['120°', 1], ['9.24 m', 1]], d: 2, c: 'application', t: [1, 2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').which([8, 2, 4 * S3, 4], 4); C.child('b').val(4 * tan(30), 0.005); const lt = 4 / cos(30); C.child('c').assert(near(lt, 8 / S3) && near(16 + (4 * tan(30)) ** 2, lt ** 2), 'rafter'); C.child('c').model([4.62]); C.child('cii').model([120, 9.24]); C.model([4, 2.31, 4.62, 120, 9.24]); });

caseQ('c05', {
  passage: 'Meera tests some statements about an acute angle $\\theta$ by substituting $\\theta = 30^\\circ$, $45^\\circ$ and $60^\\circ$. A statement that holds for every acute angle is an **identity**; a statement that fails for even one angle is not.',
  d: 3, c: 'understanding',
  model: r`(a) Option (b). (b) $1$. (c) (i) and (ii): proofs as shown — each side reduces to $1$.`,
  sol: r`A neat-looking statement need not be an identity: at $\theta = 45^\circ$, $\sin\theta + \cos\theta = \sqrt2 \ne 1$. Each proof in (c) turns the left side into $\sin^2\theta + \cos^2\theta$ or uses $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$.`,
  children: [
    child('a', mk.mcq({ stem: 'Which of these is an identity?', opts: [r`$\sin\theta + \cos\theta = 1$`, r`$\sec^2\theta - \tan^2\theta = 1$`, r`$\tan\theta = \sin\theta\cos\theta$`, r`$\sin^2\theta = 1 + \cos^2\theta$`], key: 'b', sol: r`(b) is $1 + \tan^2\theta = \sec^2\theta$ rearranged. The others fail at $\theta = 45^\circ$: (a) gives $\sqrt2 \ne 1$, (c) gives $1 \ne \dfrac12$, (d) gives $\dfrac12 \ne \dfrac32$.`, d: 2, c: 'analysis', t: [3], time: 75 })),
    child('b', mk.fill({ stem: 'For $\\theta = 60^\\circ$, the value of $\\operatorname{cosec}^2\\theta - \\cot^2\\theta$ is ___', acc: [['1']], sol: r`$\dfrac43 - \dfrac13 = 1$, as the identity $1 + \cot^2\theta = \operatorname{cosec}^2\theta$ predicts.`, d: 1, c: 'understanding', t: [2, 3], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Prove that $(1 - \\cos\\theta)(1 + \\cos\\theta)(1 + \\cot^2\\theta) = 1$.', model: r`$(1 - \cos\theta)(1 + \cos\theta) = 1 - \cos^2\theta = \sin^2\theta$, and $1 + \cot^2\theta = \operatorname{cosec}^2\theta = \dfrac{1}{\sin^2\theta}$.

So the left side is $\sin^2\theta \times \dfrac{1}{\sin^2\theta} = 1$.`, sol: 'Two identities, then cancel.', scheme: [['sin²θ and cosec²θ', 1], ['Product = 1', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Prove that $\\cos^2\\theta\\,(1 + \\tan^2\\theta) = 1$, and check it at $\\theta = 60^\\circ$.', model: r`$1 + \tan^2\theta = \sec^2\theta = \dfrac{1}{\cos^2\theta}$, so $\cos^2\theta(1 + \tan^2\theta) = 1$.

At $60^\circ$: $\dfrac14 \times (1 + 3) = 1$ ✓.`, sol: 'Identity, then reciprocal.', scheme: [['Proof', 1], ['Check at 60°', 1]], d: 2, c: 'understanding', t: [2, 3], time: 120 }),
    ]),
  ],
}, (C) => { const tests = [(d) => near(sin(d) + cos(d), 1), (d) => near(1 / cos(d) ** 2 - tan(d) ** 2, 1), (d) => near(tan(d), sin(d) * cos(d)), (d) => near(sin(d) ** 2, 1 + cos(d) ** 2)]; C.child('a').which(tests.map((t) => [30, 45, 60, 17, 73].every(t)), true); C.child('b').blank(Math.round((1 / sin(60) ** 2 - 1 / tan(60) ** 2) * 1e9) / 1e9); C.child('c').assert(identity((d) => (1 - cos(d)) * (1 + cos(d)) * (1 + 1 / tan(d) ** 2), () => 1), 'identity i'); C.child('c').model(['\\sin^2\\theta']); C.child('cii').assert(identity((d) => cos(d) ** 2 * (1 + tan(d) ** 2), () => 1), 'identity ii'); C.child('cii').model(['\\dfrac14']); C.model(['Option (b)', 1]); });
// =============================================================== added 2026-10-27 (assessment-designer)
// Recall/understanding written items for the board-paper competency balance (blueprint 54/24/22 Standard,
// 75/15/10 Basic). Appended after every existing item so earlier ids do not move.
Q('u301', mk.short({
  marks: 3,
  stem: r`A right triangle $ABC$ has its right angle at $C$. The two shorter sides are $BC = 8$ cm and $AC = 15$ cm. Find the hypotenuse, then write $\sin A$, $\cos A$ and $\tan B$.`,
  model: r`By Pythagoras, $AB = \sqrt{8^2 + 15^2} = \sqrt{64 + 225} = \sqrt{289} = 17$ cm.

For angle $A$: the opposite side is $BC = 8$ and the adjacent side is $AC = 15$.

$\sin A = \dfrac{BC}{AB} = \dfrac{8}{17}$, $\quad \cos A = \dfrac{AC}{AB} = \dfrac{15}{17}$.

For angle $B$: the opposite side is $AC = 15$ and the adjacent side is $BC = 8$, so $\tan B = \dfrac{AC}{BC} = \dfrac{15}{8}$.`,
  sol: r`Name the opposite and adjacent sides separately for each angle; the hypotenuse is $AB$, opposite the right angle.`,
  scheme: [['AB = 17 cm', 1], ['sin A = 8/17 and cos A = 15/17', 1], ['tan B = 15/8', 1]],
  d: 2, c: 'understanding', t: [1], time: 210,
}), (C) => { const AB = hyp(8, 15); const A = (Math.atan2(8, 15) * 180) / Math.PI, B = 90 - A; C.assert(near(AB, 17) && near(sin(A), 8 / 17) && near(cos(A), 15 / 17) && near(tan(B), 15 / 8), 'ratios'); C.model([17, r`\dfrac{8}{17}`, r`\dfrac{15}{17}`, r`\dfrac{15}{8}`]); });
Q('u302', mk.short({
  marks: 3,
  stem: r`Using the values of the trigonometric ratios of standard angles, evaluate:

(a) $2\sin^2 45^\circ + 3\tan^2 30^\circ - \cos^2 0^\circ + 4\sin 30^\circ\cos 60^\circ$

(b) $\dfrac{\tan^2 60^\circ + \sec^2 45^\circ}{\operatorname{cosec}^2 30^\circ}$`,
  model: r`(a) $\sin 45^\circ = \dfrac{1}{\sqrt2}$, $\tan 30^\circ = \dfrac{1}{\sqrt3}$, $\cos 0^\circ = 1$, $\sin 30^\circ = \cos 60^\circ = \dfrac12$.

$2 \times \dfrac12 + 3 \times \dfrac13 - 1 + 4 \times \dfrac12 \times \dfrac12 = 1 + 1 - 1 + 1 = 2$.

(b) $\tan 60^\circ = \sqrt3$, $\sec 45^\circ = \sqrt2$, $\operatorname{cosec} 30^\circ = 2$.

$\dfrac{3 + 2}{4} = \dfrac{5}{4}$.`,
  sol: r`Square each ratio before multiplying by its coefficient.`,
  scheme: [['Standard values substituted', 1], ['(a) = 2', 1], ['(b) = 5/4', 1]],
  d: 1, c: 'understanding', t: [2], time: 210,
}), (C) => { const a = 2 * sin(45) ** 2 + 3 * tan(30) ** 2 - cos(0) ** 2 + 4 * sin(30) * cos(60); const b = (tan(60) ** 2 + 1 / cos(45) ** 2) / (1 / sin(30) ** 2); C.assert(near(a, 2) && near(b, 1.25), `a ${a}, b ${b}`); C.model([2, r`\dfrac{5}{4}`]); });
Q('u501', mk.long({
  stem: r`$A$ is an acute angle with $\sin A = \dfrac35$.

(a) Find $\cos A$ and $\tan A$.
(b) Write the values of $\operatorname{cosec} A$, $\sec A$ and $\cot A$.
(c) Verify that $\sin^2 A + \cos^2 A = 1$ with your values.
(d) Evaluate $5\sin A + 4\cos A$.`,
  model: r`(a) Draw a right triangle with the side opposite $A$ equal to $3k$ and hypotenuse $5k$. The adjacent side is $\sqrt{25k^2 - 9k^2} = 4k$. So $\cos A = \dfrac45$ and $\tan A = \dfrac34$.

(b) $\operatorname{cosec} A = \dfrac53$, $\sec A = \dfrac54$, $\cot A = \dfrac43$.

(c) $\sin^2 A + \cos^2 A = \dfrac{9}{25} + \dfrac{16}{25} = \dfrac{25}{25} = 1$ ✓.

(d) $5 \times \dfrac35 + 4 \times \dfrac45 = 3 + \dfrac{16}{5} = 6.2$.`,
  sol: r`Sides $3k$, $4k$, $5k$; the other three ratios are reciprocals.`,
  scheme: [['cos A = 4/5', 1], ['tan A = 3/4', 1], ['Reciprocal ratios', 1], ['Identity verified', 1], ['6.2', 1]],
  d: 2, c: 'understanding', t: [1, 3], time: 420,
}), (C) => { const A = (Math.asin(0.6) * 180) / Math.PI; C.assert(near(cos(A), 0.8) && near(tan(A), 0.75) && near(1 / sin(A), 5 / 3) && near(1 / cos(A), 1.25) && near(1 / tan(A), 4 / 3), 'ratios'); C.assert(near(5 * sin(A) + 4 * cos(A), 6.2), '6.2'); C.model([r`\dfrac45`, r`\dfrac34`, r`\dfrac53`, r`\dfrac54`, r`\dfrac43`, 6.2]); });

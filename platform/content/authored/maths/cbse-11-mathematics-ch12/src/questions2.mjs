// CBSE 11 Mathematics ch12 Limits and Derivatives: written items (short 2 and 3 marks, long 5 marks, case-based) with re-solve checks.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, F, Fr, P, limRat, approachExact, near, numLim, sideLim, dnum, checkDeriv, fpPoly } from './calc.mjs';

const T = (s) => `$${s}$`;
const PI = Math.PI;
const pts3 = [0.4, 1.1, 2.3];

// =============================================================== short answer, 2 marks
{
  const N = P(2, 0, -5, 1), D = P(1, 0, 4), L = limRat(N, D, 3);
  Q('s201', mk.short({ marks: 2, stem: r`Evaluate $\displaystyle\lim_{x \to 3}\dfrac{2x^3 - 5x + 1}{x^2 + 4}$.`, model: r`The denominator at $x = 3$ is $9 + 4 = 13 \ne 0$, so substitute.\n\nNumerator: $2(27) - 15 + 1 = 54 - 15 + 1 = 40$. The limit is $\dfrac{40}{13}$.`, sol: 'The quotient law applies because the limit of the denominator is not zero.', scheme: [['Denominator 13 is not zero, so substitute', 1], ['Numerator 40, limit 40/13', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(N.eval(3).eq(40) && D.eval(3).eq(13) && L.value.eq(F(40, 13)), '40/13'); Cx.model([13, 54, 15, 40]); });
}
{
  const N = P(1, 1, -12), D = P(1, 0, -16), L = limRat(N, D, -4);
  Q('s202', mk.short({ marks: 2, stem: r`Find $\displaystyle\lim_{x \to -4}\dfrac{x^2 + x - 12}{x^2 - 16}$.`, model: r`Substituting gives $\dfrac{0}{0}$. Factorise: $\dfrac{(x + 4)(x - 3)}{(x - 4)(x + 4)} = \dfrac{x - 3}{x - 4}$ for $x \ne -4$.\n\nAt $x = -4$ this is $\dfrac{-7}{-8} = \dfrac{7}{8}$.`, sol: 'Cancel the common factor before substituting.', scheme: [['Factorising and cancelling (x + 4)', 1], ['Substituting: 7/8', 1]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(N.eq(P(1, 4).mul(P(1, -3))) && D.eq(P(1, -4).mul(P(1, 4))) && L.value.eq(F(7, 8)) && approachExact(N, D, -4, F(7, 8)), 'exact 7/8'); Cx.model([4, 3, 7, 8]); });
}
{
  const g = (x) => x / Math.tan(5 * x);
  Q('s203', mk.short({ marks: 2, stem: r`Find $\displaystyle\lim_{x \to 0} x\cot 5x$.`, model: r`$x\cot 5x = \dfrac{x}{\tan 5x} = \dfrac{1}{5} \cdot \dfrac{5x}{\tan 5x}$.\n\nSince $\dfrac{\tan u}{u} \to 1$, the limit is $\dfrac{1}{5} \times 1 = \dfrac{1}{5}$.`, sol: 'Write cotangent as one over tangent and match the angle.', scheme: [['x cot 5x = (1/5)(5x / tan 5x)', 1], ['Limit 1/5', 1]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(numLim(g, 0, 0.2), 'numeric 1/5'); Cx.model([5, 1]); });
}
{
  const N = P(1, 0, 0, 0, 0, 0, 0, 0, -1), D = P(1, 0, -1);
  const top = limRat(N, P(1, -1), 1).value, bot = limRat(D, P(1, -1), 1).value;
  Q('s204', mk.short({ marks: 2, stem: r`Evaluate $\displaystyle\lim_{x \to 1}\dfrac{x^8 - 1}{x^2 - 1}$ by using the standard limit for $\dfrac{x^n - a^n}{x - a}$.`, model: r`Divide the numerator and the denominator by $x - 1$.\n\nThe numerator tends to $8 \times 1^7 = 8$ and the denominator to $2 \times 1^1 = 2$, so the limit is $\dfrac{8}{2} = 4$.`, sol: 'Use the standard limit twice, then divide the two results.', scheme: [['Numerator limit 8, denominator limit 2', 1], ['Quotient 4', 1]], d: 3, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(top.eq(8) && bot.eq(2) && limRat(N, D, 1).value.eq(4) && approachExact(N, D, 1, F(4)), 'limit 4'); Cx.model([8, 2, 4]); });
}
{
  const f = P(1, -5, 0);
  for (const x0 of [-2, 0, 3, 8]) if (!fpPoly(f, x0).value.eq(2 * x0 - 5)) throw new Error('s205');
  Q('s205', mk.short({ marks: 2, stem: r`Using the definition of the derivative, find $f'(x)$ for $f(x) = x^2 - 5x$.`, model: r`$f(x + h) - f(x) = (x + h)^2 - 5(x + h) - x^2 + 5x = 2xh + h^2 - 5h$.\n\nDivide by $h$: $2x + h - 5$. Letting $h \to 0$, $f'(x) = 2x - 5$.`, sol: 'Expand, cancel f(x), divide by h and let h tend to zero.', scheme: [['f(x + h) - f(x) = 2xh + h^2 - 5h', 1], ['Dividing by h and letting h tend to 0: 2x - 5', 1]], d: 2, c: 'understanding', t: [2], time: 105 }), (Cx) => { Cx.assert(checkDeriv((x) => x * x - 5 * x, (x) => 2 * x - 5, pts3), 'derivative 2x - 5'); Cx.model(['2x - 5', 'h^2']); });
}
{
  const g = (x) => 4 * x ** 5 - 3 * x ** -2 + 6 * Math.sqrt(x);
  const dg = (x) => 20 * x ** 4 + 6 * x ** -3 + 3 * x ** -0.5;
  Q('s206', mk.short({ marks: 2, stem: r`Differentiate $4x^5 - 3x^{-2} + 6\sqrt{x}$ with respect to $x$, for $x > 0$.`, model: r`Use $\dfrac{d}{dx}x^n = nx^{n-1}$ on each term, writing $\sqrt{x} = x^{1/2}$:\n\n$20x^4 + 6x^{-3} + 3x^{-1/2}$, which is $20x^4 + \dfrac{6}{x^3} + \dfrac{3}{\sqrt{x}}$.`, sol: 'The power rule holds for negative and fractional indices as well.', scheme: [['20x^4 and 6x^(-3)', 1], ['3x^(-1/2), the full derivative', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(checkDeriv(g, dg, [0.5, 1.3, 2.4]), 'numeric derivative'); Cx.model([20, 6, 3]); });
}
{
  const u = P(2, 0, -3), v = P(1, 0, 4, 0);
  const d = u.deriv().mul(v).add(u.mul(v.deriv()));
  Q('s207', mk.short({ marks: 2, stem: r`Differentiate $(2x^2 - 3)(x^3 + 4x)$ using the product rule, and simplify.`, model: r`With $u = 2x^2 - 3$ and $v = x^3 + 4x$: $u' = 4x$, $v' = 3x^2 + 4$.\n\n$(uv)' = 4x(x^3 + 4x) + (2x^2 - 3)(3x^2 + 4) = 4x^4 + 16x^2 + 6x^4 - x^2 - 12 = ${d.tex()}$.`, sol: 'Check by multiplying out first: the result must agree.', scheme: [['u\' = 4x, v\' = 3x^2 + 4 and the product rule', 1], ['Simplified: 10x^4 + 15x^2 - 12', 1]], d: 3, c: 'understanding', t: [3], time: 105 }), (Cx) => { Cx.assert(d.eq(P(10, 0, 15, 0, -12)) && d.eq(u.mul(v).deriv()) && P(6, 0, -1, 0, -12).eq(P(2, 0, -3).mul(P(3, 0, 4))) && P(4, 0, 16, 0, 0).eq(P(4, 0).mul(P(1, 0, 4, 0))), 'product rule = expanded derivative'); Cx.model(['10x^4 + 15x^2 - 12']); });
}
{
  const g = (x) => (3 * x - 2) / (x * x + 1);
  const num = P(3).mul(P(1, 0, 1)).sub(P(3, -2).mul(P(2, 0)));
  Q('s208', mk.short({ marks: 2, stem: r`Find $\dfrac{dy}{dx}$ if $y = \dfrac{3x - 2}{x^2 + 1}$.`, model: r`Quotient rule with $u = 3x - 2$, $v = x^2 + 1$: $\dfrac{3(x^2 + 1) - (3x - 2)(2x)}{(x^2 + 1)^2}$.\n\nThe numerator is $3x^2 + 3 - 6x^2 + 4x = ${num.tex()}$, so $\dfrac{dy}{dx} = \dfrac{${num.tex()}}{(x^2 + 1)^2}$.`, sol: 'Top: u prime v minus u v prime; bottom: v squared.', scheme: [['Quotient rule set-up', 1], ['Simplified numerator -3x^2 + 4x + 3', 1]], d: 3, c: 'understanding', t: [3], time: 105 }), (Cx) => { Cx.assert(num.eq(P(-3, 4, 3)) && checkDeriv(g, (x) => num.num(x) / (x * x + 1) ** 2, [-1.5, 0.3, 2]), 'numeric derivative'); Cx.model(['-3x^2 + 4x + 3']); });
}
{
  const g = (x) => x * Math.tan(x);
  Q('s209', mk.short({ marks: 2, stem: r`Differentiate $x\tan x$ with respect to $x$, where $\tan x$ is defined.`, model: r`Product rule: $\dfrac{d}{dx}(x\tan x) = 1 \cdot \tan x + x \cdot \sec^2 x = \tan x + x\sec^2 x$.`, sol: 'The derivative of tan x is sec squared x.', scheme: [['Product rule: (x)\' tan x + x (tan x)\'', 1], ['tan x + x sec^2 x', 1]], d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(checkDeriv(g, (x) => Math.tan(x) + x / Math.cos(x) ** 2, [0.3, 0.8, 1.2]), 'numeric derivative'); Cx.model(['\\sec^2 x']); });
}
{
  const g = (x) => Math.sin(x) ** 4;
  Q('s210', mk.short({ marks: 2, stem: r`Apply the chain rule (a formative topic) to find the derivative of $\sin^4 x$.`, model: r`Write $\sin^4 x = (\sin x)^4$. The outer function is $u^4$, the inner function is $\sin x$.\n\n$\dfrac{d}{dx}\sin^4 x = 4\sin^3 x \cdot \cos x$.`, sol: 'Outer derivative at the inner function, times the derivative of the inner function.', scheme: [['Outer power rule 4 sin^3 x', 1], ['Multiplying by cos x', 1]], d: 3, c: 'understanding', t: [4], time: 75 }), (Cx) => { Cx.assert(checkDeriv(g, (x) => 4 * Math.sin(x) ** 3 * Math.cos(x), pts3), 'numeric derivative'); Cx.model([4]); });
}

// =============================================================== short answer, 3 marks
{
  const g = (x) => (Math.sqrt(x) - 2) / (x - 4);
  Q('s301', mk.short({ marks: 3, stem: r`Find $\displaystyle\lim_{x \to 4}\dfrac{\sqrt{x} - 2}{x - 4}$.`, model: r`Substituting gives $\dfrac{0}{0}$. Write $x - 4 = (\sqrt{x} - 2)(\sqrt{x} + 2)$.\n\nThen $\dfrac{\sqrt{x} - 2}{x - 4} = \dfrac{1}{\sqrt{x} + 2}$ for $x \ne 4$, which tends to $\dfrac{1}{2 + 2} = \dfrac{1}{4}$.`, sol: 'Alternatively use the standard limit with n = 1/2 and a = 4.', scheme: [['Factorising x - 4 as a difference of squares', 1], ['Cancelling the common factor', 1], ['Limit 1/4', 1]], d: 3, c: 'application', t: [1], time: 120 }), (Cx) => { Cx.assert(numLim(g, 4, 0.25) && near(0.5 * 4 ** -0.5, 0.25), 'numeric 1/4 and n a^(n-1) = 1/4'); Cx.model([4, 2]); });
}
{
  const hits = []; for (let k = -30; k <= 30; k++) if (1 - k === 4 - 3 * -1) hits.push(k);
  Q('s302', mk.short({ marks: 3, stem: r`Let $f(x) = x^2 + kx$ for $x < -1$ and $f(x) = 4 - 3x$ for $x \ge -1$. Find $k$ so that $\displaystyle\lim_{x \to -1} f(x)$ exists.`, model: r`Left-hand limit: $\displaystyle\lim_{x \to -1^-}(x^2 + kx) = 1 - k$.\n\nRight-hand limit: $\displaystyle\lim_{x \to -1^+}(4 - 3x) = 4 + 3 = 7$.\n\nThe limit exists only when they are equal: $1 - k = 7$, so $k = -6$.`, sol: 'Equate the one-sided limits.', scheme: [['Left-hand limit 1 - k', 1], ['Right-hand limit 7', 1], ['Equating: k = -6', 1]], d: 3, c: 'application', t: [1], time: 120 }), (Cx) => { const g = (x) => (x < -1 ? x * x - 6 * x : 4 - 3 * x); Cx.assert(hits.join() === '-6' && Math.abs(sideLim(g, -1, -1) - 7) < 1e-4 && Math.abs(sideLim(g, -1, 1) - 7) < 1e-4, 'k = -6, both sides 7'); Cx.model([7, 6]); });
}
{
  Q('s303', mk.short({ marks: 3, stem: r`Prove from first principles that $\dfrac{d}{dx}(\cos x) = -\sin x$.`, model: r`$\cos(x + h) - \cos x = -2\sin\left(x + \dfrac{h}{2}\right)\sin\dfrac{h}{2}$.\n\nDividing by $h$: $\dfrac{\cos(x + h) - \cos x}{h} = -\sin\left(x + \dfrac{h}{2}\right) \cdot \dfrac{\sin(h/2)}{h/2}$.\n\nAs $h \to 0$, $\sin\left(x + \dfrac{h}{2}\right) \to \sin x$ and $\dfrac{\sin(h/2)}{h/2} \to 1$, so the derivative is $-\sin x$.`, sol: 'Use the cosine difference identity, then the standard limit of sine over its angle.', scheme: [['Difference as -2 sin(x + h/2) sin(h/2)', 1], ['Dividing by h to expose sin(h/2)/(h/2)', 1], ['Limit -sin x', 1]], d: 4, c: 'analysis', t: [2], time: 150 }), (Cx) => { let ok = true; for (const x of pts3) for (const h of [0.5, 0.05]) ok = ok && near(Math.cos(x + h) - Math.cos(x), -2 * Math.sin(x + h / 2) * Math.sin(h / 2), 1e-9); Cx.assert(ok && checkDeriv(Math.cos, (x) => -Math.sin(x), pts3), 'identity and derivative'); Cx.model(['-\\sin x', '2']); });
}
{
  const g = (x) => Math.sqrt(2 * x + 1);
  Q('s304', mk.short({ marks: 3, stem: r`Find the derivative of $\sqrt{2x + 1}$ from first principles, for $x > -\dfrac{1}{2}$.`, model: r`$\dfrac{f(x + h) - f(x)}{h} = \dfrac{\sqrt{2x + 2h + 1} - \sqrt{2x + 1}}{h}$.\n\nMultiply by the conjugate: the top becomes $(2x + 2h + 1) - (2x + 1) = 2h$, so the quotient is $\dfrac{2}{\sqrt{2x + 2h + 1} + \sqrt{2x + 1}}$.\n\nAs $h \to 0$ this tends to $\dfrac{2}{2\sqrt{2x + 1}} = \dfrac{1}{\sqrt{2x + 1}}$.`, sol: 'Rationalise the numerator so that h cancels.', scheme: [['Difference quotient written out', 1], ['Multiplying by the conjugate and cancelling h', 1], ['Limit 1/sqrt(2x + 1)', 1]], d: 4, c: 'analysis', t: [2], time: 150 }), (Cx) => { let ok = true; for (const x of [0.5, 2, 4]) for (const h of [0.1, 0.001]) ok = ok && near((g(x + h) - g(x)) / h, 2 / (g(x + h) + g(x)), 1e-8); Cx.assert(ok && checkDeriv(g, (x) => 1 / Math.sqrt(2 * x + 1), [0.5, 2, 4]), 'conjugate form and derivative'); Cx.model([2, 1]); });
}
{
  const g = (x) => (1 + Math.sin(x)) / Math.cos(x);
  Q('s305', mk.short({ marks: 3, stem: r`Differentiate $\dfrac{1 + \sin x}{\cos x}$ with respect to $x$ and simplify, where $\cos x \ne 0$.`, model: r`Quotient rule: $\dfrac{\cos x\cdot\cos x - (1 + \sin x)(-\sin x)}{\cos^2 x}$.\n\nThe numerator is $\cos^2 x + \sin x + \sin^2 x = 1 + \sin x$, so $\dfrac{dy}{dx} = \dfrac{1 + \sin x}{\cos^2 x}$.`, sol: 'Use sin squared plus cos squared equals one in the numerator.', scheme: [['Quotient rule set-up', 1], ['Numerator cos^2 x + sin x + sin^2 x', 1], ['Simplified result (1 + sin x)/cos^2 x', 1]], d: 4, c: 'application', t: [3], time: 135 }), (Cx) => { Cx.assert(checkDeriv(g, (x) => (1 + Math.sin(x)) / Math.cos(x) ** 2, pts3), 'numeric derivative'); Cx.model(['\\cos^2 x']); });
}
{
  const f = P(1, 0, -12, 5), d = f.deriv();
  const xs = []; for (let x = -40; x <= 40; x++) if (d.eval(x).isZero()) xs.push(x);
  Q('s306', mk.short({ marks: 3, stem: r`Find the points of the curve $y = x^3 - 12x + 5$ at which the tangent is parallel to the $x$-axis.`, model: r`A tangent parallel to the $x$-axis has slope $0$. Here $\dfrac{dy}{dx} = 3x^2 - 12 = 3(x - 2)(x + 2)$, which is $0$ at $x = 2$ and $x = -2$.\n\nThen $y = 8 - 24 + 5 = -11$ at $x = 2$ and $y = -8 + 24 + 5 = 21$ at $x = -2$. The points are $(2, -11)$ and $(-2, 21)$.`, sol: 'Set the derivative equal to zero, then find y from the curve.', scheme: [['dy/dx = 3x^2 - 12', 1], ['x = 2 and x = -2', 1], ['y-values: (2, -11) and (-2, 21)', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(xs.join() === '-2,2' && f.eval(2).eq(-11) && f.eval(-2).eq(21), 'x = +-2, y = -11 and 21'); Cx.model([2, 11, 21, 12]); });
}
{
  const s = P(2, -15, 36, 0), v = s.deriv();
  const rest = []; for (let t = 0; t <= 10; t++) if (v.eval(t).isZero()) rest.push(t);
  Q('s307', mk.short({ marks: 3, stem: r`A bead slides along a straight wire so that its distance from one end is $s = 2t^3 - 15t^2 + 36t$ centimetres after $t$ seconds (an imagined demonstration). Find its velocity at $t = 1$ and the times at which it is momentarily at rest.`, model: r`Velocity $v = \dfrac{ds}{dt} = 6t^2 - 30t + 36$. At $t = 1$: $6 - 30 + 36 = 12$ cm/s.\n\nAt rest: $6t^2 - 30t + 36 = 6(t - 2)(t - 3) = 0$, so $t = 2$ s and $t = 3$ s.`, sol: 'Velocity is the derivative of distance with respect to time.', scheme: [['v = 6t^2 - 30t + 36', 1], ['v(1) = 12 cm/s', 1], ['Rest at t = 2 and t = 3', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(v.eq(P(6, -30, 36)) && v.eval(1).eq(12) && rest.join() === '2,3' && P(6, -30, 36).eq(P(6).mul(P(1, -2)).mul(P(1, -3))), 'v(1) = 12; rest at 2 and 3'); Cx.model([12, 2, 3, 36]); });
}
{
  const g = (x) => (x ** 3 + 2) * Math.sin(x) - 4 * x * Math.cos(x);
  const dg = (x) => (3 * x * x + 4 * x) * Math.sin(x) + (x ** 3 - 2) * Math.cos(x);
  Q('s308', mk.short({ marks: 3, stem: r`Differentiate $(x^3 + 2)\sin x - 4x\cos x$ with respect to $x$ and collect the terms in $\sin x$ and $\cos x$.`, model: r`First term (product rule): $3x^2\sin x + (x^3 + 2)\cos x$.\n\nSecond term: $\dfrac{d}{dx}(4x\cos x) = 4\cos x - 4x\sin x$, which is subtracted.\n\nTotal: $3x^2\sin x + (x^3 + 2)\cos x - 4\cos x + 4x\sin x = (3x^2 + 4x)\sin x + (x^3 - 2)\cos x$.`, sol: 'Two product rules, one for each term.', scheme: [['First product rule', 1], ['Second product rule with the minus sign', 1], ['Collected result', 1]], d: 4, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(checkDeriv(g, dg, pts3), 'numeric derivative'); Cx.model(['3x^2 + 4x', 'x^3 - 2']); });
}
{
  const g = (x) => Math.tan(3 * x) + (4 * x - 1) ** 6;
  Q('s309', mk.short({ marks: 3, stem: r`Using the chain rule (formative topic), find $\dfrac{dy}{dx}$ for $y = \tan 3x + (4x - 1)^6$.`, model: r`$\dfrac{d}{dx}\tan 3x = \sec^2 3x \times 3 = 3\sec^2 3x$.\n\n$\dfrac{d}{dx}(4x - 1)^6 = 6(4x - 1)^5 \times 4 = 24(4x - 1)^5$.\n\nSo the derivative is $3\sec^2 3x + 24(4x - 1)^5$.`, sol: 'Treat each term as a function of a function.', scheme: [['3 sec^2 3x', 1], ['24(4x - 1)^5', 1], ['Sum of the two', 1]], d: 3, c: 'understanding', t: [4], time: 120 }), (Cx) => { Cx.assert(checkDeriv(g, (x) => 3 / Math.cos(3 * x) ** 2 + 24 * (4 * x - 1) ** 5, [0.1, 0.25, 0.4], 1e-6), 'numeric derivative'); Cx.model([3, 24, 6]); });
}

// =============================================================== long answer, 5 marks
{
  const N = P(1, -2, -1, 2), D = P(1, -3, 2);
  const L1 = limRat(N, D, 1), L2 = limRat(N, D, 2);
  Q('l01', mk.long({ stem: r`Let $f(x) = \dfrac{x^3 - 2x^2 - x + 2}{x^2 - 3x + 2}$.\n\n(a) Show that $f(1)$ and $f(2)$ are not defined.\n\n(b) Find $\displaystyle\lim_{x \to 1} f(x)$ and $\displaystyle\lim_{x \to 2} f(x)$.`, model: r`(a) At $x = 1$ and $x = 2$ the denominator is $0$ (it is $(x - 1)(x - 2)$), so $f$ is undefined at both points.\n\n(b) Factorise: $x^3 - 2x^2 - x + 2 = (x - 1)(x - 2)(x + 1)$, so $f(x) = \dfrac{(x - 1)(x - 2)(x + 1)}{(x - 1)(x - 2)} = x + 1$ for $x \ne 1, 2$.\n\nHence $\displaystyle\lim_{x \to 1} f(x) = 1 + 1 = 2$ and $\displaystyle\lim_{x \to 2} f(x) = 2 + 1 = 3$.`, sol: 'Both limits come from the same simplified form; the limit never uses the value at the point.', scheme: [['Denominator (x - 1)(x - 2) is zero at both points', 1], ['Numerator factorised as (x - 1)(x - 2)(x + 1)', 1], ['Cancelling to x + 1', 1], ['Limit 2 at x = 1', 1], ['Limit 3 at x = 2', 1]], d: 4, c: 'application', t: [1], time: 300 }), (Cx) => { Cx.assert(N.eq(P(1, -1).mul(P(1, -2)).mul(P(1, 1))) && D.eq(P(1, -1).mul(P(1, -2))) && D.eval(1).isZero() && D.eval(2).isZero() && L1.value.eq(2) && L2.value.eq(3) && approachExact(N, D, 1, F(2)) && approachExact(N, D, 2, F(3)), 'limits 2 and 3 exactly'); Cx.model([2, 3]); });
}
{
  const g = (x) => (Math.cos(2 * x) - Math.cos(8 * x)) / (x * x);
  Q('l02', mk.long({ stem: r`Find $\displaystyle\lim_{x \to 0}\dfrac{\cos 2x - \cos 8x}{x^2}$ by splitting it into two standard limits. Show each step.`, model: r`Write $\cos 2x - \cos 8x = (1 - \cos 8x) - (1 - \cos 2x)$.\n\nSo the expression is $\dfrac{1 - \cos 8x}{x^2} - \dfrac{1 - \cos 2x}{x^2}$.\n\nUse $1 - \cos kx = 2\sin^2\dfrac{kx}{2}$: $\dfrac{1 - \cos kx}{x^2} = \dfrac{k^2}{2}\left(\dfrac{\sin(kx/2)}{kx/2}\right)^2 \to \dfrac{k^2}{2}$.\n\nFor $k = 8$ the limit is $32$ and for $k = 2$ it is $2$. The required limit is $32 - 2 = 30$.`, sol: 'Insert and subtract 1, so that both parts are of the form (1 - cos kx)/x squared.', scheme: [['Rewriting cos 2x - cos 8x as (1 - cos 8x) - (1 - cos 2x)', 1], ['Using 1 - cos kx = 2 sin^2(kx/2)', 1], ['General limit k^2/2', 1], ['Values 32 and 2', 1], ['Answer 30', 1]], d: 4, c: 'analysis', t: [1], time: 300 }), (Cx) => { Cx.assert(numLim(g, 0, 30, [1e-1, 1e-2, 1e-3], 5e-3) && 64 / 2 === 32 && 4 / 2 === 2 && near(1 - Math.cos(1.3), 2 * Math.sin(0.65) ** 2, 1e-12), 'numeric 30'); Cx.model([32, 2, 30, 8]); });
}
{
  const f = (x) => F(2).mul(x).mul(x).sub(F(3).div(x));
  for (const x of [F(1), F(2), F(-3), F(1, 2)]) {
    for (const h of [F(1, 10), F(1, 1000), F(-1, 7)]) {
      const dq = f(x.add(h)).sub(f(x)).div(h);
      const form = x.mul(4).add(h.mul(2)).add(F(3).div(x.mul(x.add(h))));
      if (!dq.eq(form)) throw new Error('l03 identity');
    }
    for (const k of [4, 6]) { const h = new Fr(1n, 10n ** BigInt(k)); const dq = f(x.add(h)).sub(f(x)).div(h); const exact = x.mul(4).add(F(3).div(x.mul(x))); if (Math.abs(dq.sub(exact).num()) > 100 * h.num()) throw new Error('l03 approach'); }
  }
  Q('l03', mk.long({ stem: r`Using the definition of the derivative, find $f'(x)$ for $f(x) = 2x^2 - \dfrac{3}{x}$ where $x \ne 0$.`, model: r`$f(x + h) - f(x) = 2\left[(x + h)^2 - x^2\right] - 3\left[\dfrac{1}{x + h} - \dfrac{1}{x}\right]$.\n\nFirst bracket: $(x + h)^2 - x^2 = 2xh + h^2$, so $2(2xh + h^2) = 4xh + 2h^2$.\n\nSecond bracket: $\dfrac{1}{x + h} - \dfrac{1}{x} = \dfrac{x - (x + h)}{x(x + h)} = \dfrac{-h}{x(x + h)}$, so $-3 \times \dfrac{-h}{x(x + h)} = \dfrac{3h}{x(x + h)}$.\n\nDivide by $h$: $\dfrac{f(x + h) - f(x)}{h} = 4x + 2h + \dfrac{3}{x(x + h)}$.\n\nLetting $h \to 0$: $f'(x) = 4x + \dfrac{3}{x^2}$.`, sol: 'Treat the two terms separately, then divide the sum by h.', scheme: [['The difference f(x + h) - f(x) written for both terms', 1], ['Square term: 4xh + 2h^2', 1], ['Reciprocal term over a common denominator: 3h/(x(x + h))', 1], ['Dividing by h: 4x + 2h + 3/(x(x + h))', 1], ['Limit 4x + 3/x^2', 1]], d: 4, c: 'application', t: [2], time: 330 }), (Cx) => { Cx.assert(checkDeriv((x) => 2 * x * x - 3 / x, (x) => 4 * x + 3 / (x * x), [0.5, 1.5, 3, -2]), 'numeric derivative 4x + 3/x^2'); Cx.model(['4x + 2h', 'x^2', 3]); });
}
{
  const u = P(1, -3, 1), v = P(1, 0, 2, -4);
  const da = u.deriv().mul(v).add(u.mul(v.deriv()));
  const num = P(2, 0).mul(P(2, -1)).sub(P(1, 0, 5).mul(P(2)));
  const gb = (x) => (x * x + 5) / (2 * x - 1);
  Q('l04', mk.long({ stem: r`Differentiate with respect to $x$:\n\n(a) $y = (x^2 - 3x + 1)(x^3 + 2x - 4)$, giving the answer as a polynomial;\n\n(b) $y = \dfrac{x^2 + 5}{2x - 1}$, for $x \ne \dfrac{1}{2}$.`, model: r`(a) Product rule with $u = x^2 - 3x + 1$ and $v = x^3 + 2x - 4$: $u' = 2x - 3$, $v' = 3x^2 + 2$.\n\n$\dfrac{dy}{dx} = (2x - 3)(x^3 + 2x - 4) + (x^2 - 3x + 1)(3x^2 + 2)$, which expands to $${da.tex()}$.\n\n(b) Quotient rule with $u = x^2 + 5$ and $v = 2x - 1$: $\dfrac{dy}{dx} = \dfrac{2x(2x - 1) - 2(x^2 + 5)}{(2x - 1)^2}$.\n\nThe numerator is $4x^2 - 2x - 2x^2 - 10 = ${num.tex()}$, so $\dfrac{dy}{dx} = \dfrac{${num.tex()}}{(2x - 1)^2}$.`, sol: 'Check part (a) by multiplying the factors first and differentiating each power.', scheme: [['(a) u\' and v\'', 1], ['(a) product rule and expanded polynomial', 1], ['(b) u\' and v\'', 1], ['(b) quotient rule set-up', 1], ['(b) simplified numerator', 1]], d: 4, c: 'application', t: [3], time: 330 }), (Cx) => { Cx.assert(da.eq(u.mul(v).deriv()) && num.eq(P(2, -2, -10)) && checkDeriv(gb, (x) => num.num(x) / (2 * x - 1) ** 2, [-1, 0.2, 2.5]), 'polynomial and quotient results'); Cx.model([da.tex(), num.tex()]); });
}
{
  const ga = (x) => x * x * Math.sin(x) + Math.cos(x) / x;
  const dga = (x) => 2 * x * Math.sin(x) + x * x * Math.cos(x) - (x * Math.sin(x) + Math.cos(x)) / (x * x);
  const gb = (x) => (1 / Math.cos(x) - 1) / (1 / Math.cos(x) + 1);
  const dgb = (x) => 2 * (1 / Math.cos(x)) * Math.tan(x) / (1 / Math.cos(x) + 1) ** 2;
  Q('l05', mk.long({ stem: r`Differentiate with respect to $x$ (in each part the function is defined on the interval chosen):\n\n(a) $y = x^2\sin x + \dfrac{\cos x}{x}$, for $x > 0$;\n\n(b) $y = \dfrac{\sec x - 1}{\sec x + 1}$, for $0 < x < \dfrac{\pi}{2}$.`, model: r`(a) The first term uses the product rule: $2x\sin x + x^2\cos x$.\n\nThe second term uses the quotient rule: $\dfrac{(-\sin x)(x) - (\cos x)(1)}{x^2} = -\dfrac{x\sin x + \cos x}{x^2}$.\n\nSo $\dfrac{dy}{dx} = 2x\sin x + x^2\cos x - \dfrac{x\sin x + \cos x}{x^2}$.\n\n(b) Quotient rule with $u = \sec x - 1$, $v = \sec x + 1$, so $u' = v' = \sec x\tan x$:\n\n$\dfrac{dy}{dx} = \dfrac{\sec x\tan x(\sec x + 1) - (\sec x - 1)\sec x\tan x}{(\sec x + 1)^2} = \dfrac{2\sec x\tan x}{(\sec x + 1)^2}$.`, sol: 'Part (a) needs the product rule and the quotient rule; part (b) has u prime equal to v prime.', scheme: [['(a) product rule for the first term', 1], ['(a) quotient rule for the second term', 1], ['(a) the sum of the two derivatives', 1], ['(b) u\' = v\' = sec x tan x and the set-up', 1], ['(b) simplified result 2 sec x tan x/(sec x + 1)^2', 1]], d: 5, c: 'analysis', t: [3], time: 360 }), (Cx) => { Cx.assert(checkDeriv(ga, dga, [0.5, 1.3, 2.6]) && checkDeriv(gb, dgb, [0.3, 0.8, 1.3]), 'numeric derivatives of both parts'); Cx.model(['2x\\sin x', '2\\sec x\\tan x']); });
}
{
  const s = P(1, -6, 9, 0), v = s.deriv();
  const rest = []; for (let t = 0; t <= 10; t++) if (v.eval(t).isZero()) rest.push(t);
  const avg = s.eval(3).sub(s.eval(1)).div(2);
  Q('l06', mk.long({ stem: r`A marble rolls along a straight groove in an imagined science model. Its distance from the start is $s = t^3 - 6t^2 + 9t$ centimetres after $t$ seconds, for $t \ge 0$.\n\n(a) Find the velocity $v$ at time $t$.\n\n(b) Find the times at which the marble is momentarily at rest.\n\n(c) Find the average velocity over $[1, 3]$ and the velocity at $t = 4$.`, model: r`(a) $v = \dfrac{ds}{dt} = 3t^2 - 12t + 9$.\n\n(b) $3t^2 - 12t + 9 = 3(t - 1)(t - 3) = 0$ gives $t = 1$ s and $t = 3$ s.\n\n(c) $s(1) = 1 - 6 + 9 = 4$ and $s(3) = 27 - 54 + 27 = 0$, so the average velocity is $\dfrac{0 - 4}{3 - 1} = -2$ cm/s.\n\nAt $t = 4$: $v = 48 - 48 + 9 = 9$ cm/s.`, sol: 'Average velocity is change in distance over change in time; instantaneous velocity is the derivative.', scheme: [['v = 3t^2 - 12t + 9', 1], ['Factorised, at rest at t = 1 and t = 3', 1], ['s(1) = 4 and s(3) = 0', 1], ['Average velocity -2 cm/s', 1], ['v(4) = 9 cm/s', 1]], d: 4, c: 'application', t: [2], time: 330 }), (Cx) => { Cx.assert(v.eq(P(3, -12, 9)) && rest.join() === '1,3' && s.eval(1).eq(4) && s.eval(3).eq(0) && avg.eq(-2) && v.eval(4).eq(9), 'v, rest, average and v(4)'); Cx.model([9, 12, 4, 2, 9]); });
}
{
  const lf = (x) => (1 - Math.cos(4 * x)) / (x * Math.tan(2 * x));
  const ks = []; for (let k = -12; k <= 12; k++) if (k * k - 5 === 4) ks.push(k);
  Q('l07', mk.long({ stem: r`Let $f(x) = \dfrac{1 - \cos 4x}{x\tan 2x}$ for $x < 0$ and $f(x) = k^2 - 5 + 2x$ for $x > 0$.\n\n(a) Find $\displaystyle\lim_{x \to 0^-} f(x)$.\n\n(b) Find $\displaystyle\lim_{x \to 0^+} f(x)$ in terms of $k$.\n\n(c) Find all values of $k$ for which $\displaystyle\lim_{x \to 0} f(x)$ exists.`, model: r`(a) $\dfrac{1 - \cos 4x}{x\tan 2x} = \dfrac{(1 - \cos 4x)/x^2}{(\tan 2x)/x}$. Here $\dfrac{1 - \cos 4x}{x^2} \to \dfrac{4^2}{2} = 8$ and $\dfrac{\tan 2x}{x} \to 2$, so the left-hand limit is $\dfrac{8}{2} = 4$.\n\n(b) $\displaystyle\lim_{x \to 0^+}(k^2 - 5 + 2x) = k^2 - 5$.\n\n(c) The limit exists when $k^2 - 5 = 4$, so $k^2 = 9$ and $k = 3$ or $k = -3$.`, sol: 'The limit exists only when both one-sided limits agree.', scheme: [['(a) Splitting into (1 - cos 4x)/x^2 and tan 2x / x', 1], ['(a) Left-hand limit 4', 1], ['(b) Right-hand limit k^2 - 5', 1], ['(c) Equating: k^2 - 5 = 4', 1], ['(c) k = 3 or k = -3', 1]], d: 5, c: 'analysis', t: [1], time: 330 }), (Cx) => { Cx.assert(numLim(lf, 0, 4, [1e-1, 1e-2, 1e-3], 5e-3) && ks.join() === '-3,3', 'LHL 4; k = +-3'); Cx.model([8, 2, 4, 9, 3]); });
}

// =============================================================== case-based (1 + 1 + 2 marks, part (c) with an either/or)
{
  const N = P(1, 1, -12), D = P(1, -3);
  const L = limRat(N, D, 3);
  const L2 = limRat(N, D, -4);
  const g = (t) => ((t * t + t - 12) / (t - 3) - 7) / (t - 3);
  caseQ('c01', {
    passage: r`An imagined weather station in a hill town models its humidity index $t$ hours after 6 a.m. by $h(t) = \dfrac{t^2 + t - 12}{t - 3}$ for $t \ne 3$. The formula cannot be used at $t = 3$ because the denominator vanishes, but the station wants to know what value the index is approaching there.`,
    children: [
      child('a', mk.num({ stem: r`Find $\displaystyle\lim_{t \to 3} h(t)$.`, value: 7, sol: r`$h(t) = \dfrac{(t + 4)(t - 3)}{t - 3} = t + 4$ for $t \ne 3$, so the limit is $3 + 4 = 7$.`, scheme: [['Factorising, cancelling and substituting: 3 + 4 = 7', 1]], d: 2, c: 'application', t: [1], time: 90 })),
      child('b', mk.mcq({ stem: r`Which statement about the graph of $y = h(t)$ is correct?`, key: 'a', opts: [r`It is the straight line $y = t + 4$ with a single point missing at $t = 3$.`, r`It has a vertical asymptote at $t = 3$.`, r`The limit at $t = 3$ does not exist.`, r`It passes through the point $(3, 0)$.`], sol: r`Since $h(t) = t + 4$ for $t \ne 3$, the graph is that line with a hole at $(3, 7)$; the limit exists and $h(3)$ is not defined.`, d: 2, c: 'understanding', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) find $\displaystyle\lim_{t \to -4} h(t)$.`, model: r`For $t \ne 3$, $h(t) = t + 4$, so $\displaystyle\lim_{t \to -4} h(t) = -4 + 4 = 0$.`, sol: 'The simplified form is valid near minus four.', scheme: [['Using h(t) = t + 4 near -4', 1], ['Limit 0', 1]], d: 2, c: 'application', t: [1], time: 90 }), [mk.short({ marks: 2, stem: r`**Or** (ii) find $\displaystyle\lim_{t \to 3}\dfrac{h(t) - 7}{t - 3}$.`, model: r`For $t \ne 3$, $h(t) - 7 = t + 4 - 7 = t - 3$, so the quotient is $1$ and the limit is $1$.`, sol: 'Simplify the top before dividing.', scheme: [['h(t) - 7 = t - 3', 1], ['Limit 1', 1]], d: 3, c: 'analysis', t: [1], time: 90 })]),
    ],
    model: r`(a) $7$.\n\n(b) Option (a): the graph is the line $y = t + 4$ with a hole at $(3, 7)$.\n\n(c) Either (i) $0$, or (ii) $1$.`,
    sol: 'The common factor t - 3 cancels, which turns every part into a substitution in t + 4.', d: 3, c: 'application', time: 480,
  }, (Cx) => {
    Cx.assert(L.value.eq(7) && approachExact(N, D, 3, F(7)) && N.eq(P(1, 4).mul(P(1, -3))), 'limit 7 exactly');
    Cx.child('a').val(7); Cx.child('b').key('a');
    Cx.assert(L2.value.eq(0), 'limit at -4 is 0'); Cx.child('c').model([4, 0]);
    const L3 = limRat(N.sub(D.scale(7)), D.mul(P(1, -3)), 3);
    Cx.assert(L3.value.eq(1) && N.sub(D.scale(7)).eq(P(1, -3).pow(2)) && g(3.001) > 0.99 && g(3.001) < 1.01, '(h - 7)/(t - 3) = 1 exactly: top is (t - 3)^2 over D(t - 3)'); Cx.child('cii').model([7, 3, 1]);
    Cx.model([7, 0, 1]);
  });
}
{
  const h = P(2, -9, 12, 0), dh = h.deriv();
  const steady = []; for (let t = 0; t <= 6; t++) if (dh.eval(t).isZero()) steady.push(t);
  const avg = h.eval(3).div(3);
  caseQ('c02', {
    passage: r`A hobby group fills an imagined glass tank with water in a pattern that changes through the day. The water level is $h(t) = 2t^3 - 9t^2 + 12t$ centimetres, $t$ hours after the tap is opened, for $0 \le t \le 4$. The rate at which the level changes is $\dfrac{dh}{dt}$.`,
    children: [
      child('a', mk.num({ stem: r`Find the rate of change of the level at $t = 3$, in cm per hour.`, value: 12, unit: 'cm/h', sol: r`$\dfrac{dh}{dt} = 6t^2 - 18t + 12$, so at $t = 3$ it is $54 - 54 + 12 = 12$.`, scheme: [['dh/dt = 6t^2 - 18t + 12 and its value at t = 3: 54 - 54 + 12 = 12', 1]], d: 2, c: 'application', t: [2], time: 90 })),
      child('b', mk.mcq({ stem: r`At which times is the level momentarily steady, that is $\dfrac{dh}{dt} = 0$?`, key: 'b', opts: [r`$t = 0$ and $t = 3$`, r`$t = 1$ and $t = 2$`, r`$t = 2$ and $t = 3$`, r`$t = 1$ only`], sol: r`$6t^2 - 18t + 12 = 6(t - 1)(t - 2)$, which is zero at $t = 1$ and $t = 2$.`, d: 3, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) find the average rate of change of $h$ over $[0, 3]$ and compare it with the rate at $t = 3$.`, model: r`$h(3) = 54 - 81 + 36 = 9$ and $h(0) = 0$, so the average rate is $\dfrac{9 - 0}{3} = 3$ cm/h.\n\nThe rate at $t = 3$ is $12$ cm/h, four times the average: the level is rising faster at the end.`, sol: 'Average rate: change in h divided by change in t.', scheme: [['Average rate 9/3 = 3 cm/h', 1], ['Comparison with 12 cm/h', 1]], d: 3, c: 'application', t: [2], time: 105 }), [mk.short({ marks: 2, stem: r`**Or** (ii) find the rate of change of the level at $t = \dfrac{1}{2}$ and say whether the level is rising or falling.`, model: r`$\dfrac{dh}{dt} = 6\left(\dfrac{1}{4}\right) - 9 + 12 = 1.5 - 9 + 12 = 4.5$ cm/h.\n\nIt is positive, so the level is rising.`, sol: 'A positive derivative means the level is rising.', scheme: [['dh/dt at one half = 4.5', 1], ['Positive, so rising', 1]], d: 3, c: 'application', t: [2], time: 105 })]),
    ],
    model: r`(a) $12$ cm/h.\n\n(b) Option (b): $t = 1$ and $t = 2$.\n\n(c) Either (i) average $3$ cm/h against $12$ cm/h at $t = 3$, or (ii) $4.5$ cm/h, rising.`,
    sol: 'The rate is the derivative 6t^2 - 18t + 12 = 6(t - 1)(t - 2); every part reads this expression.', d: 3, c: 'application', time: 480,
  }, (Cx) => {
    Cx.assert(dh.eq(P(6, -18, 12)) && dh.eval(3).eq(12) && steady.join() === '1,2' && h.eval(3).eq(9) && avg.eq(3) && dh.eval(F(1, 2)).eq(F(9, 2)), 'derivative values');
    Cx.child('a').val(12); Cx.child('b').key('b'); Cx.child('c').model([9, 3, 12]); Cx.child('cii').model([4.5]);
    Cx.model([12, 1, 2, 3, 4.5]);
  });
}
{
  const g = (x) => Math.sin(x) / x;
  const gh = (x) => (1 - Math.cos(x)) / (x * x);
  const g2 = (x) => Math.sin(3 * x) / (2 * x);
  caseQ('c03', {
    passage: r`In an imagined classroom experiment, a pendulum bob of string length $1$ m is swung through a small angle $\theta$ radians. The sideways shift of the bob is $\sin\theta$ metres, while the arc it travels along is $\theta$ metres. The class wants to know how well $\sin\theta$ can be replaced by $\theta$ when $\theta$ is small.`,
    children: [
      child('a', mk.num({ stem: r`Find $\dfrac{\sin\theta}{\theta}$ for $\theta = 0.2$, correct to three decimal places.`, value: 0.993, tol: 0.0005, sol: r`$\sin 0.2 = 0.1987$, so $\dfrac{0.1987}{0.2} = 0.993$.`, scheme: [['sin 0.2 over 0.2 = 0.1987 / 0.2 = 0.993', 1]], d: 2, c: 'application', t: [1], time: 90 })),
      child('b', mk.mcq({ stem: r`As $\theta \to 0$, the value of $\dfrac{\sin\theta}{\theta}$ approaches`, key: 'a', opts: ['$1$', '$0$', '$\\dfrac{1}{2}$', 'no value, since it is not defined at $0$'], sol: r`This is the standard limit $\dfrac{\sin\theta}{\theta} \to 1$ (with $\theta$ in radians); not being defined at $0$ does not stop the limit from existing.`, d: 2, c: 'understanding', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) the bob also rises by $1 - \cos\theta$ metres. Find $\displaystyle\lim_{\theta \to 0}\dfrac{1 - \cos\theta}{\theta^2}$.`, model: r`$1 - \cos\theta = 2\sin^2\dfrac{\theta}{2}$, so $\dfrac{1 - \cos\theta}{\theta^2} = \dfrac{1}{2}\left(\dfrac{\sin(\theta/2)}{\theta/2}\right)^2 \to \dfrac{1}{2}$.`, sol: 'Use the half-angle identity, then the standard sine limit.', scheme: [['1 - cos x = 2 sin^2(x/2)', 1], ['Limit 1/2', 1]], d: 3, c: 'application', t: [1], time: 105 }), [mk.short({ marks: 2, stem: r`**Or** (ii) a second bob has shift $\sin 3\theta$ metres and arc $2\theta$ metres. Find $\displaystyle\lim_{\theta \to 0}\dfrac{\sin 3\theta}{2\theta}$.`, model: r`$\dfrac{\sin 3\theta}{2\theta} = \dfrac{3}{2} \cdot \dfrac{\sin 3\theta}{3\theta} \to \dfrac{3}{2} \times 1 = \dfrac{3}{2}$.`, sol: 'Match the angle inside the sine in the denominator.', scheme: [['Writing as (3/2)(sin 3t / 3t)', 1], ['Limit 3/2', 1]], d: 3, c: 'application', t: [1], time: 105 })]),
    ],
    model: r`(a) $0.993$.\n\n(b) Option (a): $1$.\n\n(c) Either (i) $\dfrac{1}{2}$, or (ii) $\dfrac{3}{2}$.`,
    sol: 'Every part rests on the standard limit of sin u over u, or on the half-angle identity.', d: 3, c: 'application', time: 480,
  }, (Cx) => {
    Cx.assert(numLim(g, 0, 1) && Math.abs(g(0.2) - 0.993) < 0.0005, 'ratio at 0.2 is 0.9933 and limit 1');
    Cx.child('a').val(0.993); Cx.child('b').key('a');
    Cx.assert(numLim(gh, 0, 0.5, [1e-1, 1e-2, 1e-3], 5e-3), '1/2'); Cx.child('c').model([2]);
    Cx.assert(numLim(g2, 0, 1.5), '3/2'); Cx.child('cii').model([3, 2]);
    Cx.model([0.993, 1]);
  });
}
{
  const A = (x) => 0.5 * x + 8 + 200 / x, dA = (x) => 0.5 - 200 / (x * x);
  const c1 = (x) => 0.5 * x * x + 8 * x + 200;
  const zeros = []; for (let x = 1; x <= 100; x++) if (0.5 - 200 / (x * x) === 0) zeros.push(x);
  caseQ('c04', {
    passage: r`A potter in an imagined studio finds that making $x$ pots in a week costs $C(x) = 0.5x^2 + 8x + 200$ rupees. The average cost of one pot is $A(x) = \dfrac{C(x)}{x}$ rupees, for $x > 0$. The potter uses derivatives to see how the cost changes as the output grows.`,
    children: [
      child('a', mk.num({ stem: r`Find $C'(10)$, the rate at which the total cost changes with $x$ when $x = 10$, in rupees per pot.`, value: 18, unit: 'rupees per pot', sol: r`$C'(x) = x + 8$, so $C'(10) = 10 + 8 = 18$.`, scheme: [['C\'(x) = x + 8 and C\'(10) = 18', 1]], d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: r`Using the quotient rule, $A'(x) = \dfrac{xC'(x) - C(x)}{x^2}$. Find $A'(8)$.`, value: -2.625, sol: r`$C'(8) = 16$ and $C(8) = 32 + 64 + 200 = 296$, so $A'(8) = \dfrac{8 \times 16 - 296}{64} = \dfrac{-168}{64} = -2.625$.`, scheme: [['C(8) = 296, C\'(8) = 16, and (128 - 296)/64 = -2.625', 1]], d: 3, c: 'application', t: [3], time: 105 })),
      child('c', mk.short({ marks: 2, stem: r`**Either** (i) find the positive value of $x$ at which $A'(x) = 0$.`, model: r`$A'(x) = \dfrac{x(x + 8) - (0.5x^2 + 8x + 200)}{x^2} = \dfrac{0.5x^2 - 200}{x^2}$.\n\nThis is $0$ when $0.5x^2 = 200$, so $x^2 = 400$ and $x = 20$.`, sol: 'The quotient has zero derivative when its numerator is zero.', scheme: [['Simplifying A\'(x) = (0.5x^2 - 200)/x^2', 1], ['x = 20', 1]], d: 3, c: 'application', t: [3], time: 105 }), [mk.short({ marks: 2, stem: r`**Or** (ii) write $A(x) = 0.5x + 8 + \dfrac{200}{x}$, differentiate term by term and find $A'(40)$.`, model: r`$A'(x) = 0.5 - \dfrac{200}{x^2}$, using $\dfrac{d}{dx}x^{-1} = -x^{-2}$.\n\nAt $x = 40$: $0.5 - \dfrac{200}{1600} = 0.5 - 0.125 = 0.375$.`, sol: 'Write 200 over x as 200 times x to the minus one.', scheme: [['A\'(x) = 0.5 - 200/x^2', 1], ['A\'(40) = 0.375', 1]], d: 3, c: 'application', t: [3], time: 105 })]),
    ],
    model: r`(a) $18$ rupees per pot.\n\n(b) $-2.625$.\n\n(c) Either (i) $x = 20$, or (ii) $A'(40) = 0.375$.`,
    sol: 'The quotient rule and the term-by-term route agree: A\'(x) = 0.5 - 200/x^2.', d: 4, c: 'analysis', time: 510,
  }, (Cx) => {
    Cx.assert(near(dnum(c1, 10), 18, 1e-8) && c1(8) === 296 && near(dnum(A, 8), -2.625, 1e-8) && near(((8 * 16 - 296) / 64), -2.625), 'C and A derivatives');
    Cx.assert(checkDeriv(A, (x) => (0.5 * x * x - 200) / (x * x), [3, 8, 20, 40]) && zeros.join() === '20' && near(dA(40), 0.375), 'A\'(x) = (0.5x^2 - 200)/x^2; zero at 20; A\'(40) = 0.375');
    Cx.child('a').val(18); Cx.child('b').val(-2.625); Cx.child('c').model([20, 400, 200]); Cx.child('cii').model([0.5, 0.375]);
    Cx.model([18, 2.625, 20, 0.375]);
  });
}

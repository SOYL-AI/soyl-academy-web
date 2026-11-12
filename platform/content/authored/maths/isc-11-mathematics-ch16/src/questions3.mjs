// ISC 11 Mathematics ch16 Limits - short-answer items (2 and 3 marks).
// Each key is recomputed by exact cancellation (rational functions) and by evaluating the function at a - h and a + h (one side only for one-sided limits).
import { Q, mk } from './lib.mjs';
import { F, P, ratLim, ratInf, near, noLimit, nearInf } from './lim.mjs';

const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

// ============================================================ 2 marks
{
  const g = (x) => Math.abs(x - 5) / (x * x - 25);
  Q('s201', mk.short({ marks: 2, stem: r`Evaluate the left-hand limit $\displaystyle\lim_{x \to 5^{-}}\dfrac{\lvert x - 5 \rvert}{x^2 - 25}$.`, model: r`For $x < 5$, $\lvert x - 5 \rvert = 5 - x$.\n\n$\dfrac{5 - x}{(x - 5)(x + 5)} = -\dfrac{1}{x + 5}$.\n\nAs $x \to 5^{-}$ this tends to $-\dfrac{1}{10}$.`, sol: r`Replace the modulus by $5 - x$ on the left of $5$, then cancel.`, scheme: [['Use $\\lvert x - 5 \\rvert = 5 - x$ for $x < 5$ and cancel $x - 5$: $-\\dfrac{1}{x + 5}$', 1], ['Left-hand limit $= -\\dfrac{1}{10}$', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => {
    C.assert(near(g, 5, -0.1, { side: 'left' }) && near(g, 5, 0.1, { side: 'right' }), 'left-hand limit -1/10 (right-hand limit would be +1/10)'); C.model([5, 10]);
  });
}
{
  const g = (x) => x + Math.floor(x);
  Q('s202', mk.short({ marks: 2, stem: r`Find the left-hand and right-hand limits of $g(x) = x + [x]$ at $x = 2$, and state whether $\displaystyle\lim_{x \to 2} g(x)$ exists.`, model: r`As $x \to 2^{-}$, $[x] = 1$, so $g(x) \to 2 + 1 = 3$.\n\nAs $x \to 2^{+}$, $[x] = 2$, so $g(x) \to 2 + 2 = 4$.\n\nThe two limits differ, so $\displaystyle\lim_{x \to 2} g(x)$ does not exist.`, sol: r`Take $[x]$ as the integer on each side of $2$.`, scheme: [['Left-hand limit $3$ and right-hand limit $4$', 1], ['The limits differ, so the limit does not exist', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => {
    C.assert(near(g, 2, 3, { side: 'left' }) && near(g, 2, 4, { side: 'right' }) && noLimit(g, 2), 'left-hand limit 3, right-hand limit 4, no limit'); C.model([3, 4]);
  });
}
{
  const f1 = (x) => x - 4, g1 = (x) => x + 3, h = (x) => (f1(x) ** 2 + 2 * f1(x) * g1(x)) / (g1(x) - f1(x));
  Q('s203', mk.short({ marks: 2, stem: r`Given that $\displaystyle\lim_{x \to a} f(x) = -3$ and $\displaystyle\lim_{x \to a} g(x) = 4$, evaluate $\displaystyle\lim_{x \to a}\dfrac{\bigl(f(x)\bigr)^2 + 2f(x)\,g(x)}{g(x) - f(x)}$.`, model: r`Numerator: $(-3)^2 + 2(-3)(4) = 9 - 24 = -15$.\n\nDenominator: $4 - (-3) = 7 \ne 0$.\n\nBy the quotient rule the limit is $-\dfrac{15}{7}$.`, sol: r`Find the limit of numerator and denominator by the sum, product and power rules, then divide.`, scheme: [['Numerator tends to $-15$ and denominator to $7$', 1], ['Quotient rule (denominator not zero): $-\\dfrac{15}{7}$', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => {
    C.assert(f1(1) === -3 && g1(1) === 4 && near(h, 1, -15 / 7), 'with f(x) = x - 4 and g(x) = x + 3 at a = 1 the limits are -3 and 4 and the quotient tends to -15/7'); C.model([15, 7, 9, 24]);
  });
}
{
  const g = (x) => (x ** 3 - 3 * x + 1) / (x * x + 1);
  Q('s204', mk.short({ marks: 2, stem: r`Evaluate $\displaystyle\lim_{x \to 2}\dfrac{x^3 - 3x + 1}{x^2 + 1}$, stating the rule you use.`, model: r`The denominator $x^2 + 1 \to 5 \ne 0$, so by the quotient rule and the limits of polynomials we may substitute $x = 2$.\n\n$\dfrac{8 - 6 + 1}{4 + 1} = \dfrac{3}{5}$.`, sol: r`Quotient rule with a non-zero limit in the denominator.`, scheme: [['State the quotient rule and that the denominator tends to $5 \\ne 0$', 1], ['Substitute: $\\dfrac{3}{5}$', 1]], d: 1, c: 'understanding', t: [2, 3], time: 70 }), (C) => {
    C.assert(F(8 - 6 + 1, 4 + 1).eq(F(3, 5)) && near(g, 2, 0.6), 'substitution gives 3/5; both sides agree'); C.model([3, 5]);
  });
}
{
  const g = (x) => (x * x + 3 * x + 2) / (x * x - 1);
  Q('s205', mk.short({ marks: 2, stem: r`Evaluate $\displaystyle\lim_{x \to -1}\dfrac{x^2 + 3x + 2}{x^2 - 1}$.`, model: r`Both parts vanish at $x = -1$, so factorise: $\dfrac{(x + 1)(x + 2)}{(x - 1)(x + 1)} = \dfrac{x + 2}{x - 1}$.\n\nAs $x \to -1$ the limit is $\dfrac{1}{-2} = -\dfrac{1}{2}$.`, sol: r`Cancel the factor $x + 1$ before substituting.`, scheme: [['Factorise and cancel $x + 1$: $\\dfrac{x + 2}{x - 1}$', 1], ['Substitute $x = -1$: $-\\dfrac{1}{2}$', 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => {
    C.assert(ratLim(P(1, 3, 2), P(1, 0, -1), -1).eq(F(-1, 2)) && near(g, -1, -0.5), 'exact cancellation gives -1/2; both sides agree'); C.model([1, 2]);
  });
}
{
  const g = (x) => (2 * x * x - 3 * x) / (5 * x * x + 1);
  Q('s206', mk.short({ marks: 2, stem: r`Find $\displaystyle\lim_{x \to \infty}\dfrac{2x^2 - 3x}{5x^2 + 1}$.`, model: r`Divide the numerator and the denominator by $x^2$.\n\n$\dfrac{2 - \frac{3}{x}}{5 + \frac{1}{x^2}} \to \dfrac{2}{5}$ as $x \to \infty$, since $\dfrac{3}{x} \to 0$ and $\dfrac{1}{x^2} \to 0$.`, sol: r`Equal degrees, so the answer is the ratio of the leading coefficients.`, scheme: [['Divide by $x^2$', 1], ['Limit $= \\dfrac{2}{5}$', 1]], d: 1, c: 'understanding', t: [3], time: 70 }), (C) => {
    C.assert(ratInf(P(2, -3, 0), P(5, 0, 1)).eq(F(2, 5)) && nearInf(g, 0.4), 'equal degrees: 2/5'); C.model([2, 5]);
  });
}
{
  const g = (x) => (x ** 4 - 625) / (x - 5);
  Q('s207', mk.short({ marks: 2, stem: r`Use the standard limit for $\dfrac{x^n - a^n}{x - a}$ to evaluate $\displaystyle\lim_{x \to 5}\dfrac{x^4 - 625}{x - 5}$.`, model: r`Since $625 = 5^4$, take $n = 4$ and $a = 5$ in $\displaystyle\lim_{x \to a}\dfrac{x^n - a^n}{x - a} = n a^{n-1}$.\n\nThe limit is $4 \times 5^3 = 4 \times 125 = 500$.`, sol: r`Recognise $625$ as $5^4$.`, scheme: [['Write $625 = 5^4$ and identify $n = 4$, $a = 5$', 1], ['$n a^{n-1} = 4 \\times 125 = 500$', 1]], d: 1, c: 'understanding', t: [3], time: 60 }), (C) => {
    C.assert(ratLim(P(1, 0, 0, 0, -625), P(1, -5), 5).eq(500) && near(g, 5, 500, { tol: 1e-3, hs: [1e-5, 1e-6, 1e-7] }), 'exact cancellation gives 500; numeric approach agrees'); C.model([4, 5, 125, 500]);
  });
}
{
  const g = (x) => (3 * x + Math.sin(2 * x)) / (x - Math.tan(5 * x));
  Q('s208', mk.short({ marks: 2, stem: r`Evaluate $\displaystyle\lim_{x \to 0}\dfrac{3x + \sin 2x}{x - \tan 5x}$.`, model: r`Divide the numerator and the denominator by $x$.\n\n$\dfrac{3 + \frac{\sin 2x}{x}}{1 - \frac{\tan 5x}{x}} \to \dfrac{3 + 2}{1 - 5} = -\dfrac{5}{4}$.`, sol: r`Use $\dfrac{\sin kx}{x} \to k$ and $\dfrac{\tan kx}{x} \to k$.`, scheme: [['Divide by $x$ and use $\\dfrac{\\sin 2x}{x} \\to 2$, $\\dfrac{\\tan 5x}{x} \\to 5$', 1], ['Limit $= \\dfrac{5}{-4} = -\\dfrac{5}{4}$', 1]], d: 3, c: 'application', t: [4], time: 90 }), (C) => {
    C.assert(near(g, 0, -1.25), 'both sides approach -5/4'); C.model([3, 2, 5, 4]);
  });
}
{
  const g = (x) => Math.log(1 + 6 * x) / (Math.exp(2 * x) - 1);
  Q('s209', mk.short({ marks: 2, stem: r`Find $\displaystyle\lim_{x \to 0}\dfrac{\ln(1 + 6x)}{e^{2x} - 1}$.`, model: r`Divide the numerator and the denominator by $x$.\n\n$\dfrac{\ln(1 + 6x)/x}{(e^{2x} - 1)/x} \to \dfrac{6}{2} = 3$, using $\dfrac{\ln(1 + kx)}{x} \to k$ and $\dfrac{e^{kx} - 1}{x} \to k$.`, sol: r`Two standard limits, each scaled by its constant.`, scheme: [['Divide by $x$: the numerator tends to $6$ and the denominator to $2$', 1], ['Limit $= \\dfrac{6}{2} = 3$', 1]], d: 3, c: 'application', t: [4], time: 80 }), (C) => {
    C.assert(near(g, 0, 3), 'both sides approach 3'); C.model([6, 2, 3]);
  });
}
{
  const g = (x) => (x < 3 ? x * x - 4 * x : 3 * x - 12);
  Q('s210', mk.short({ marks: 2, stem: r`Let $f(x) = x^2 - 4x$ for $x < 3$ and $f(x) = 3x - 12$ for $x \ge 3$. Decide whether $\displaystyle\lim_{x \to 3} f(x)$ exists, and find it if it does.`, model: r`Left-hand limit: $3^2 - 4(3) = 9 - 12 = -3$.\n\nRight-hand limit: $3(3) - 12 = -3$.\n\nThe two one-sided limits are equal, so the limit exists and equals $-3$.`, sol: r`Compare the two formulas at $x = 3$.`, scheme: [['Left-hand limit $-3$ and right-hand limit $-3$', 1], ['They are equal, so the limit exists and is $-3$', 1]], d: 2, c: 'application', t: [1], time: 80 }), (C) => {
    C.assert(near(g, 3, -3, { side: 'left' }) && near(g, 3, -3, { side: 'right' }) && g(3) === -3, 'both one-sided limits are -3'); C.model([9, 12, 3]);
  });
}

// ============================================================ 3 marks
{
  const g = (k) => (x) => (x <= 1 ? k * x * x + 3 : 5 * x - k);
  Q('s301', mk.short({ marks: 3, stem: r`The function $f(x) = kx^2 + 3$ for $x \le 1$ and $f(x) = 5x - k$ for $x > 1$ has a limit at $x = 1$. Find $k$ and the value of the limit.`, model: r`Left-hand limit: $\displaystyle\lim_{x \to 1^{-}}(kx^2 + 3) = k + 3$.\n\nRight-hand limit: $\displaystyle\lim_{x \to 1^{+}}(5x - k) = 5 - k$.\n\nFor the limit to exist, $k + 3 = 5 - k$, so $2k = 2$ and $k = 1$.\n\nThe limit is $1 + 3 = 4$.`, sol: r`Equate the one-sided limits and solve for $k$.`, scheme: [['Left-hand limit $k + 3$ and right-hand limit $5 - k$', 1], ['Equate: $k + 3 = 5 - k$, so $k = 1$', 1], ['The limit is $4$', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => {
    C.assert(near(g(1), 1, 4) && noLimit(g(2), 1) && 1 + 3 === 5 - 1, 'k = 1 makes both one-sided limits 4; k = 2 does not'); C.model([3, 5, 1, 4]);
  });
}
{
  const g = (x) => Math.floor(x) - x;
  Q('s302', mk.short({ marks: 3, stem: r`Find $\displaystyle\lim_{x \to 3^{-}}\bigl([x] - x\bigr)$ and $\displaystyle\lim_{x \to 3^{+}}\bigl([x] - x\bigr)$. Does $\displaystyle\lim_{x \to 3}\bigl([x] - x\bigr)$ exist?`, model: r`As $x \to 3^{-}$, $[x] = 2$, so $[x] - x \to 2 - 3 = -1$.\n\nAs $x \to 3^{+}$, $[x] = 3$, so $[x] - x \to 3 - 3 = 0$.\n\nThe one-sided limits $-1$ and $0$ are different, so the limit does not exist.`, sol: r`Use the integer value of $[x]$ on each side of $3$.`, scheme: [['Left-hand limit $2 - 3 = -1$', 1], ['Right-hand limit $3 - 3 = 0$', 1], ['The limits differ, so the limit does not exist', 1]], d: 3, c: 'application', t: [1], time: 100 }), (C) => {
    C.assert(near(g, 3, -1, { side: 'left' }) && near(g, 3, 0, { side: 'right' }) && noLimit(g, 3), 'left-hand limit -1, right-hand limit 0, no limit'); C.model([2, 3, 1]);
  });
}
{
  const g = (x) => (x * x - 16) / Math.abs(x - 4);
  Q('s303', mk.short({ marks: 3, stem: r`Show that $\displaystyle\lim_{x \to 4}\dfrac{x^2 - 16}{\lvert x - 4 \rvert}$ does not exist.`, model: r`For $x > 4$, $\lvert x - 4 \rvert = x - 4$, so the quotient is $x + 4$ and the right-hand limit is $8$.\n\nFor $x < 4$, $\lvert x - 4 \rvert = 4 - x$, so the quotient is $-(x + 4)$ and the left-hand limit is $-8$.\n\nSince $8 \ne -8$, the limit does not exist.`, sol: r`Split the modulus at $x = 4$ and compare the two sides.`, scheme: [['Right-hand limit $= 8$', 1], ['Left-hand limit $= -8$', 1], ['The limits are unequal, so the limit does not exist', 1]], d: 3, c: 'analysis', t: [1], time: 110 }), (C) => {
    C.assert(near(g, 4, 8, { side: 'right' }) && near(g, 4, -8, { side: 'left' }) && noLimit(g, 4), 'right-hand limit 8, left-hand limit -8'); C.model([8, 4]);
  });
}
{
  const g = (x) => (x ** 3 - 27) / (x * x - 9);
  Q('s304', mk.short({ marks: 3, stem: r`Show that direct substitution in $\dfrac{x^3 - 27}{x^2 - 9}$ at $x = 3$ gives an indeterminate form, and then evaluate $\displaystyle\lim_{x \to 3}\dfrac{x^3 - 27}{x^2 - 9}$.`, model: r`At $x = 3$ the numerator is $27 - 27 = 0$ and the denominator is $9 - 9 = 0$, giving the indeterminate form $\dfrac{0}{0}$.\n\nFactorise: $\dfrac{(x - 3)(x^2 + 3x + 9)}{(x - 3)(x + 3)} = \dfrac{x^2 + 3x + 9}{x + 3}$.\n\nSubstitute $x = 3$: $\dfrac{9 + 9 + 9}{6} = \dfrac{27}{6} = \dfrac{9}{2}$.`, sol: r`Cancel $x - 3$, then substitute.`, scheme: [['Numerator and denominator both $0$: the form $\\dfrac{0}{0}$', 1], ['Factorise and cancel $x - 3$', 1], ['Substitute: $\\dfrac{27}{6} = \\dfrac{9}{2}$', 1]], d: 3, c: 'application', t: [2, 3], time: 120 }), (C) => {
    C.assert(27 - 27 === 0 && 9 - 9 === 0 && ratLim(P(1, 0, 0, -27), P(1, 0, -9), 3).eq(F(9, 2)) && near(g, 3, 4.5), 'form 0/0; exact cancellation gives 9/2; both sides agree'); C.model([27, 9, 6]);
  });
}
{
  const g = (x) => (1 / x) * (1 / (2 + x) - 0.5);
  Q('s305', mk.short({ marks: 3, stem: r`Evaluate $\displaystyle\lim_{x \to 0}\dfrac{1}{x}\left(\dfrac{1}{2 + x} - \dfrac{1}{2}\right)$.`, model: r`Combine the fractions: $\dfrac{1}{2 + x} - \dfrac{1}{2} = \dfrac{2 - (2 + x)}{2(2 + x)} = \dfrac{-x}{2(2 + x)}$.\n\nMultiply by $\dfrac{1}{x}$ and cancel $x$: $\dfrac{-1}{2(2 + x)}$.\n\nAs $x \to 0$ the limit is $\dfrac{-1}{2 \times 2} = -\dfrac{1}{4}$.`, sol: r`Take a common denominator so that a factor $x$ appears in the numerator.`, scheme: [['Common denominator: $\\dfrac{-x}{2(2 + x)}$', 1], ['Cancel $x$: $\\dfrac{-1}{2(2 + x)}$', 1], ['Substitute $x = 0$: $-\\dfrac{1}{4}$', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => {
    C.assert(F(-1).div(F(2).mul(F(2))).eq(F(-1, 4)) && near(g, 0, -0.25), 'the simplified form -1/(2(2 + x)) tends to -1/4; both sides agree'); C.model([2, 4]);
  });
}
{
  const g = (x) => (Math.sqrt(4 + 3 * x) - Math.sqrt(4 - 3 * x)) / x;
  Q('s306', mk.short({ marks: 3, stem: r`Evaluate $\displaystyle\lim_{x \to 0}\dfrac{\sqrt{4 + 3x} - \sqrt{4 - 3x}}{x}$.`, model: r`Multiply the numerator and the denominator by $\sqrt{4 + 3x} + \sqrt{4 - 3x}$.\n\nThe numerator becomes $(4 + 3x) - (4 - 3x) = 6x$, so the expression is $\dfrac{6x}{x\left(\sqrt{4 + 3x} + \sqrt{4 - 3x}\right)} = \dfrac{6}{\sqrt{4 + 3x} + \sqrt{4 - 3x}}$.\n\nAs $x \to 0$ the limit is $\dfrac{6}{2 + 2} = \dfrac{3}{2}$.`, sol: r`Rationalise with the sum of the two roots.`, scheme: [['Multiply by the conjugate', 1], ['Numerator $6x$; cancel $x$: $\\dfrac{6}{\\sqrt{4 + 3x} + \\sqrt{4 - 3x}}$', 1], ['Substitute $x = 0$: $\\dfrac{6}{4} = \\dfrac{3}{2}$', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => {
    C.assert(near(g, 0, 1.5) && F(6, 4).eq(F(3, 2)), 'both sides approach 3/2'); C.model([6, 4, 2]);
  });
}
{
  const g = (x) => (Math.pow(x, 0.2) - 2) / (x - 32);
  Q('s307', mk.short({ marks: 3, stem: r`Evaluate $\displaystyle\lim_{x \to 32}\dfrac{x^{1/5} - 2}{x - 32}$ using the standard limit for $\dfrac{x^n - a^n}{x - a}$.`, model: r`Since $2 = 32^{1/5}$, write the numerator as $x^{1/5} - 32^{1/5}$.\n\nTake $n = \dfrac{1}{5}$ and $a = 32$: the limit is $n a^{n-1} = \dfrac{1}{5} \times 32^{-4/5}$.\n\n$32^{4/5} = 2^4 = 16$, so the limit is $\dfrac{1}{5 \times 16} = \dfrac{1}{80}$.`, sol: r`Identify $n = \dfrac{1}{5}$ and $a = 32$.`, scheme: [['Write $2 = 32^{1/5}$ and identify $n = \\dfrac{1}{5}$, $a = 32$', 1], ['Limit $= \\dfrac{1}{5} \\times 32^{-4/5}$', 1], ['$32^{4/5} = 16$, so the limit is $\\dfrac{1}{80}$', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => {
    C.assert(ratLim(P(1, -2), P(1, 0, 0, 0, 0, -32), 2).eq(F(1, 80)) && near(g, 32, 1 / 80, { tol: 1e-3, hs: [1e-4, 1e-5] }) && Math.abs(32 ** 0.8 - 16) < 1e-12, 'with y = x^(1/5): (y - 2)/(y^5 - 32) tends to 1/80; numeric approach agrees'); C.model([5, 32, 16, 80]);
  });
}
{
  const g = (x) => (4 * x ** 3 + x) / (1 - 2 * x ** 3);
  Q('s308', mk.short({ marks: 3, stem: r`Evaluate $\displaystyle\lim_{x \to -\infty}\dfrac{4x^3 + x}{1 - 2x^3}$.`, model: r`Divide the numerator and the denominator by $x^3$.\n\n$\dfrac{4 + \frac{1}{x^2}}{\frac{1}{x^3} - 2}$.\n\nAs $x \to -\infty$, $\dfrac{1}{x^2} \to 0$ and $\dfrac{1}{x^3} \to 0$, so the limit is $\dfrac{4}{-2} = -2$.`, sol: r`Equal degrees: the ratio of the leading coefficients, $\dfrac{4}{-2}$.`, scheme: [['Divide by $x^3$', 1], ['The terms $\\dfrac{1}{x^2}$ and $\\dfrac{1}{x^3}$ tend to $0$', 1], ['Limit $= \\dfrac{4}{-2} = -2$', 1]], d: 3, c: 'application', t: [3], time: 100 }), (C) => {
    C.assert(ratInf(P(4, 0, 1, 0), P(-2, 0, 0, 1), -1).eq(-2) && nearInf(g, -2, -1), 'equal degrees: 4/(-2) = -2; values at x = -1e4, -1e6, -1e8 agree'); C.model([3, 4, 2]);
  });
}
{
  const g = (x) => (Math.sin(x) * (1 - Math.cos(x))) / x ** 3;
  Q('s309', mk.short({ marks: 3, stem: r`Evaluate $\displaystyle\lim_{x \to 0}\dfrac{\sin x\,(1 - \cos x)}{x^3}$.`, model: r`Split into $\dfrac{\sin x}{x} \cdot \dfrac{1 - \cos x}{x^2}$.\n\nAs $x \to 0$, $\dfrac{\sin x}{x} \to 1$ and $\dfrac{1 - \cos x}{x^2} \to \dfrac{1}{2}$.\n\nBy the product rule the limit is $1 \times \dfrac{1}{2} = \dfrac{1}{2}$.`, sol: r`Split $x^3$ as $x \cdot x^2$.`, scheme: [['Split as $\\dfrac{\\sin x}{x} \\cdot \\dfrac{1 - \\cos x}{x^2}$', 1], ['The two factors tend to $1$ and $\\dfrac{1}{2}$', 1], ['Product rule: $\\dfrac{1}{2}$', 1]], d: 3, c: 'application', t: [4], time: 100 }), (C) => {
    C.assert(near(g, 0, 0.5), 'both sides approach 1/2'); C.model([1, 2]);
  });
}
{
  const g = (x) => (6 ** x - 2 ** x) / x;
  Q('s310', mk.short({ marks: 3, stem: r`Find $\displaystyle\lim_{x \to 0}\dfrac{6^x - 2^x}{x}$ in terms of natural logarithms and simplify.`, model: r`Write $6^x - 2^x = (6^x - 1) - (2^x - 1)$.\n\nUsing $\displaystyle\lim_{x \to 0}\dfrac{a^x - 1}{x} = \ln a$, the limit is $\ln 6 - \ln 2$.\n\n$\ln 6 - \ln 2 = \ln\dfrac{6}{2} = \ln 3$.`, sol: r`Subtract and add $1$ in the numerator.`, scheme: [['Split $6^x - 2^x = (6^x - 1) - (2^x - 1)$', 1], ['Limit $= \\ln 6 - \\ln 2$', 1], ['Simplify: $\\ln 3$', 1]], d: 3, c: 'application', t: [4], time: 100 }), (C) => {
    C.assert(near(g, 0, Math.log(3)) && Math.abs(Math.log(6) - Math.log(2) - Math.log(3)) < 1e-12, 'both sides approach ln 3 = 1.0986'); C.model([6, 2, 3]);
  });
}
{
  const g = (x) => Math.sin(x) / (Math.PI - x);
  Q('s311', mk.short({ marks: 3, stem: r`Evaluate $\displaystyle\lim_{x \to \pi}\dfrac{\sin x}{\pi - x}$.`, model: r`Put $h = \pi - x$. Then $h \to 0$ as $x \to \pi$, and $\sin x = \sin(\pi - h) = \sin h$.\n\nThe expression becomes $\dfrac{\sin h}{h}$.\n\nSo the limit is $\displaystyle\lim_{h \to 0}\dfrac{\sin h}{h} = 1$.`, sol: r`Substitute $h = \pi - x$ to move the point to $0$.`, scheme: [['Put $h = \\pi - x$, so $h \\to 0$', 1], ['$\\sin x = \\sin(\\pi - h) = \\sin h$', 1], ['Limit $\\dfrac{\\sin h}{h} \\to 1$', 1]], d: 3, c: 'application', t: [4], time: 100 }), (C) => {
    C.assert(near(g, Math.PI, 1), 'both sides of pi approach 1'); C.model([1]);
  });
}

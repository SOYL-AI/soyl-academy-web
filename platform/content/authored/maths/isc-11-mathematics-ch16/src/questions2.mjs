// ISC 11 Mathematics ch16 Limits - true-false, fill-blank and numerical items.
// Each key is recomputed by exact cancellation of the common factor (rational functions) and by evaluating the function at a - h and a + h.
import { Q, mk } from './lib.mjs';
import { F, P, ratLim, ratInf, near, noLimit, nearInf } from './lim.mjs';

const r = String.raw;

// ============================================================ true / false
{
  const g = (x) => (x * x - 36) / (x - 6);
  Q('tf1', mk.tf({ stem: r`The function $g(x) = \dfrac{x^2 - 36}{x - 6}$ is not defined at $x = 6$, so $\displaystyle\lim_{x \to 6} g(x)$ does not exist.`, key: 'f', sol: r`A limit depends only on the values near $6$. For $x \ne 6$, $g(x) = x + 6$, which tends to $12$, so the limit exists even though $g(6)$ is undefined.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => {
    C.assert(Number.isNaN(g(6)) && near(g, 6, 12) && ratLim(P(1, 0, -36), P(1, -6), 6).eq(12), 'g(6) is undefined (0/0) but both sides approach 12'); C.key('f');
  });
}
Q('tf2', mk.tf({ stem: r`For the greatest integer function, $\displaystyle\lim_{x \to 2.5}[x] = 2$.`, key: 't', sol: r`For every $x$ close to $2.5$ (between $2$ and $3$), $[x] = 2$, so both one-sided limits are $2$ and the limit is $2$.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => {
  C.assert(near(Math.floor, 2.5, 2) && noLimit(Math.floor, 3), 'the limit at 2.5 is 2 (the function is constant there); at the integer 3 it fails'); C.key('t');
});
Q('tf3', mk.tf({ stem: r`If direct substitution in $\dfrac{f(x)}{g(x)}$ gives $\dfrac{0}{0}$ at $x = a$, then $\displaystyle\lim_{x \to a}\dfrac{f(x)}{g(x)}$ must be $0$.`, key: 'f', sol: r`The form $\dfrac{0}{0}$ is indeterminate. For example, $\dfrac{5x}{x}$ gives $\dfrac{0}{0}$ at $x = 0$ yet its limit is $5$, while $\dfrac{x^2}{x}$ gives the limit $0$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => {
  C.assert(near((x) => (5 * x) / x, 0, 5) && near((x) => (x * x) / x, 0, 0), 'two limits of the form 0/0 have the different values 5 and 0'); C.key('f');
});
Q('tf4', mk.tf({ stem: r`$\displaystyle\lim_{x \to \infty}\dfrac{4x^2 + 1}{2x^2 - 3x} = 2$.`, key: 't', sol: r`Dividing by $x^2$ gives $\dfrac{4 + \frac{1}{x^2}}{2 - \frac{3}{x}} \to \dfrac{4}{2} = 2$.`, d: 1, c: 'understanding', t: [3], time: 40 }), (C) => {
  C.assert(ratInf(P(4, 0, 1), P(2, -3, 0)).eq(2) && nearInf((x) => (4 * x * x + 1) / (2 * x * x - 3 * x), 2), 'equal degrees: ratio of leading coefficients 4/2 = 2'); C.key('t');
});
Q('tf5', mk.tf({ stem: r`$\displaystyle\lim_{x \to 0}\dfrac{1 - \cos x}{x} = \dfrac{1}{2}$.`, key: 'f', sol: r`$\dfrac{1 - \cos x}{x} = \dfrac{1 - \cos x}{x^2} \cdot x \to \dfrac{1}{2} \times 0 = 0$. The value $\dfrac{1}{2}$ belongs to the quotient with $x^2$ in the denominator.`, d: 2, c: 'understanding', t: [4], time: 45 }), (C) => {
  const g = (x) => (1 - Math.cos(x)) / x;
  C.assert(near(g, 0, 0) && Math.abs(g(1e-4) - 0.5) > 0.4, 'both sides approach 0, not 1/2'); C.key('f');
});

// ============================================================ fill in the blank
{
  const g = (x) => x + Math.floor(x);
  Q('fb1', mk.fill({ stem: r`$\displaystyle\lim_{x \to 1^{-}}\left(x + [x]\right) = $ ____.`, acc: [['1']], sol: r`Just left of $1$, $[x] = 0$ and $x \to 1$, so the limit is $1 + 0 = 1$. (On the right, $[x] = 1$ and the value would be $2$.)`, d: 2, c: 'understanding', t: [1], time: 40 }), (C) => {
    C.assert(near(g, 1, 1, { side: 'left' }) && near(g, 1, 2, { side: 'right' }), 'left-hand limit 1, right-hand limit 2'); C.blank(1);
  });
}
{
  const f1 = (x) => x + 6, g1 = (x) => x + 2, h = (x) => f1(x) * g1(x) - g1(x) ** 2;
  Q('fb2', mk.fill({ stem: r`If $\displaystyle\lim_{x \to a} f(x) = 7$ and $\displaystyle\lim_{x \to a} g(x) = 3$, then $\displaystyle\lim_{x \to a}\left[f(x)\,g(x) - \bigl(g(x)\bigr)^2\right] = $ ____.`, acc: [['12']], sol: r`By the product and difference rules the limit is $7 \times 3 - 3^2 = 21 - 9 = 12$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => {
    C.assert(f1(1) === 7 && g1(1) === 3 && near(h, 1, 12), 'with f(x) = x + 6 and g(x) = x + 2 at a = 1 the limits are 7 and 3 and the combination tends to 12'); C.blank(12);
  });
}
{
  const g = (x) => (x ** 3 + 8) / (x + 2);
  Q('fb3', mk.fill({ stem: r`$\displaystyle\lim_{x \to -2}\dfrac{x^3 + 8}{x + 2} = $ ____.`, acc: [['12']], sol: r`Write $x^3 + 8 = x^3 - (-2)^3$ and $x + 2 = x - (-2)$. With $n = 3$ and $a = -2$ the limit is $3(-2)^2 = 12$.`, d: 2, c: 'understanding', t: [3], time: 50 }), (C) => {
    C.assert(ratLim(P(1, 0, 0, 8), P(1, 2), -2).eq(12) && near(g, -2, 12), 'exact cancellation of x + 2 gives 12; both sides agree'); C.blank(12);
  });
}
{
  const g = (x) => (5 * x + 2) / (2 * x - 7);
  Q('fb4', mk.fill({ stem: r`$\displaystyle\lim_{x \to \infty}\dfrac{5x + 2}{2x - 7} = $ ____ (give the fraction).`, acc: [['5/2', '2.5']], sol: r`Divide by $x$: $\dfrac{5 + \frac{2}{x}}{2 - \frac{7}{x}} \to \dfrac{5}{2}$, so the limit is 5/2.`, d: 1, c: 'understanding', t: [3], time: 40 }), (C) => {
    C.assert(ratInf(P(5, 2), P(2, -7)).eq(F(5, 2)) && nearInf(g, 2.5), 'equal degrees: 5/2'); C.blank(2.5);
  });
}
{
  const g = (x) => (Math.exp(5 * x) - 1) / Math.sin(4 * x);
  Q('fb5', mk.fill({ stem: r`$\displaystyle\lim_{x \to 0}\dfrac{e^{5x} - 1}{\sin 4x} = $ ____ (give the fraction).`, acc: [['5/4', '1.25']], sol: r`Divide top and bottom by $x$: $\dfrac{(e^{5x} - 1)/x}{(\sin 4x)/x} \to \dfrac{5}{4}$, so the limit is 5/4.`, d: 2, c: 'application', t: [4], time: 55 }), (C) => {
    C.assert(near(g, 0, 1.25), 'both sides approach 5/4'); C.blank(1.25);
  });
}

// ============================================================ numerical
{
  const g = (x) => (x * x - x - 2) / (x * x - 4);
  Q('n1', mk.num({ stem: r`Find $\displaystyle\lim_{x \to 2}\dfrac{x^2 - x - 2}{x^2 - 4}$ as a decimal.`, value: 0.75, unit: null, sol: r`Factorise: $\dfrac{(x - 2)(x + 1)}{(x - 2)(x + 2)} = \dfrac{x + 1}{x + 2} \to \dfrac{3}{4} = 0.75$.`, scheme: [['Factorise both parts and cancel $x - 2$: $\\dfrac{x + 1}{x + 2}$', 1]], marks: 1, d: 2, c: 'application', t: [3], time: 70 }), (C) => {
    C.assert(ratLim(P(1, -1, -2), P(1, 0, -4), 2).eq(F(3, 4)) && near(g, 2, 0.75), 'exact cancellation gives 3/4; both sides agree'); C.val(0.75);
  });
}
{
  const g = (x) => (6 * x * x - 5) / (2 * x * x + x);
  Q('n2', mk.num({ stem: r`Find $\displaystyle\lim_{x \to \infty}\dfrac{6x^2 - 5}{2x^2 + x}$.`, value: 3, unit: null, sol: r`Divide by $x^2$: $\dfrac{6 - \frac{5}{x^2}}{2 + \frac{1}{x}} \to \dfrac{6}{2} = 3$.`, scheme: [['Divide the numerator and denominator by $x^2$: $\\dfrac{6}{2} = 3$', 1]], marks: 1, d: 2, c: 'understanding', t: [3], time: 50 }), (C) => {
    C.assert(ratInf(P(6, 0, -5), P(2, 1, 0)).eq(3) && nearInf(g, 3), 'equal degrees: 6/2 = 3'); C.val(3);
  });
}
{
  const a = 4, g = (x) => (x ** 3 - a ** 3) / (x - a);
  Q('n3', mk.num({ stem: r`For a positive number $a$, $\displaystyle\lim_{x \to a}\dfrac{x^3 - a^3}{x - a} = 48$. Find $a$.`, value: 4, unit: null, sol: r`The limit equals $3a^2$, so $3a^2 = 48$, $a^2 = 16$, and since $a > 0$, $a = 4$.`, scheme: [['The limit equals $3a^2$; solve $3a^2 = 48$ with $a > 0$', 1]], marks: 1, d: 3, c: 'application', t: [3], time: 70 }), (C) => {
    C.assert(3 * a * a === 48 && near(g, a, 48) && !near((x) => (x ** 3 - 27) / (x - 3), 3, 48), 'for a = 4 the limit is 48 (checked numerically); a = 3 gives 27, not 48'); C.val(4);
  });
}
{
  const g = (x) => (1 - Math.cos(6 * x)) / (2 * x * Math.sin(3 * x));
  Q('n4', mk.num({ stem: r`Find $\displaystyle\lim_{x \to 0}\dfrac{1 - \cos 6x}{2x\sin 3x}$.`, value: 3, unit: null, sol: r`Use $1 - \cos 6x = 2\sin^2 3x$: the quotient is $\dfrac{2\sin^2 3x}{2x\sin 3x} = \dfrac{\sin 3x}{x} = 3 \cdot \dfrac{\sin 3x}{3x} \to 3$.`, scheme: [['Rewrite $1 - \\cos 6x = 2\\sin^2 3x$ and cancel $\\sin 3x$: $\\dfrac{\\sin 3x}{x} \\to 3$', 1]], marks: 1, d: 3, c: 'application', t: [4], time: 80 }), (C) => {
    C.assert(near(g, 0, 3), 'both sides approach 3'); C.val(3);
  });
}
{
  const g = (x) => (3 ** x - 1) / x;
  Q('n5', mk.num({ stem: r`Find $\displaystyle\lim_{x \to 0}\dfrac{3^x - 1}{x}$, correct to $4$ decimal places.`, value: 1.0986, tol: 0.0005, unit: null, sol: r`By the standard limit $\lim_{x \to 0}\dfrac{a^x - 1}{x} = \ln a$ with $a = 3$, the limit is $\ln 3 = 1.0986$ to $4$ decimal places.`, scheme: [['Use $\\lim \\dfrac{a^x - 1}{x} = \\ln a$ with $a = 3$: $\\ln 3 = 1.0986$', 1]], marks: 1, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => {
    C.assert(near(g, 0, Math.log(3)) && Math.abs(Math.log(3) - 1.0986) < 5e-5, 'both sides approach ln 3 = 1.098612'); C.val(Math.log(3), 5e-4);
  });
}
{
  const g = (x) => (Math.exp(4 * x) - Math.exp(x)) / x;
  Q('n6', mk.num({ stem: r`Find $\displaystyle\lim_{x \to 0}\dfrac{e^{4x} - e^{x}}{x}$.`, value: 3, unit: null, sol: r`Write $e^{4x} - e^x = (e^{4x} - 1) - (e^x - 1)$. Then $\dfrac{e^{4x} - 1}{x} \to 4$ and $\dfrac{e^x - 1}{x} \to 1$, so the limit is $4 - 1 = 3$.`, scheme: [['Split $e^{4x} - e^x = (e^{4x} - 1) - (e^x - 1)$; the limits are $4$ and $1$: $4 - 1 = 3$', 1]], marks: 1, d: 3, c: 'application', t: [4], time: 75 }), (C) => {
    C.assert(near(g, 0, 3), 'both sides approach 3'); C.val(3);
  });
}

// ============================================================ extra routine items
{
  const g = (x) => (x < 4 ? x - 1 : 7 - x);
  Q('tf6', mk.tf({ stem: r`A function has left-hand limit $3$ and right-hand limit $3$ at $x = 4$. Then its limit at $x = 4$ exists and equals $3$.`, key: 't', sol: r`The limit exists exactly when the two one-sided limits are equal, and it is their common value, here $3$.`, d: 1, c: 'understanding', t: [1], time: 35 }), (C) => {
    C.assert(near(g, 4, 3, { side: 'left' }) && near(g, 4, 3, { side: 'right' }), 'an example with both one-sided limits 3 at x = 4 has limit 3'); C.key('t');
  });
}
Q('tf7', mk.tf({ stem: r`$\displaystyle\lim_{x \to -1}\left(x^3 + 2x\right) = -3$.`, key: 't', sol: r`A polynomial has a limit equal to its value: $(-1)^3 + 2(-1) = -1 - 2 = -3$.`, d: 1, c: 'understanding', t: [3], time: 35 }), (C) => {
  C.assert(near((x) => x ** 3 + 2 * x, -1, -3), 'both sides approach -3'); C.key('t');
});
Q('fb6', mk.fill({ stem: r`If $\displaystyle\lim_{x \to a} f(x) = 5$, then $\displaystyle\lim_{x \to a}\left[3f(x) - 2\right] = $ ____.`, acc: [['13']], sol: r`By the constant multiple and difference rules the limit is $3(5) - 2 = 13$.`, d: 1, c: 'recall', t: [2], time: 35 }), (C) => {
  C.assert(near((x) => 3 * (x + 4) - 2, 1, 13), 'with f(x) = x + 4 at a = 1 the limit of f is 5 and the combination tends to 13'); C.blank(13);
});
Q('fb7', mk.fill({ stem: r`$\displaystyle\lim_{x \to 2^{+}}\left(x^2 - 3\right) = $ ____.`, acc: [['1']], sol: r`Substitute $x = 2$ in the polynomial: $4 - 3 = 1$.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => {
  C.assert(near((x) => x * x - 3, 2, 1, { side: 'right' }), 'right-hand approach gives 1'); C.blank(1);
});
Q('fb8', mk.fill({ stem: r`$\displaystyle\lim_{x \to 0}\dfrac{\sin 6x}{x} = $ ____.`, acc: [['6']], sol: r`Write $\dfrac{\sin 6x}{x} = 6 \cdot \dfrac{\sin 6x}{6x}$, which tends to $6 \times 1 = 6$.`, d: 1, c: 'understanding', t: [4], time: 35 }), (C) => {
  C.assert(near((x) => Math.sin(6 * x) / x, 0, 6), 'both sides approach 6'); C.blank(6);
});
Q('n7', mk.num({ stem: r`Find $\displaystyle\lim_{x \to 3}\left(x^2 + 2x - 4\right)$.`, value: 11, unit: null, sol: r`Substitute $x = 3$: $9 + 6 - 4 = 11$.`, scheme: [['Substitute $x = 3$: $9 + 6 - 4 = 11$', 1]], marks: 1, d: 1, c: 'understanding', t: [3], time: 35 }), (C) => {
  C.assert(near((x) => x * x + 2 * x - 4, 3, 11), 'both sides approach 11'); C.val(11);
});

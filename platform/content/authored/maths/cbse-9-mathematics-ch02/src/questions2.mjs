// CBSE 9 Mathematics ch02 Introduction to Polynomials: written items (short 2 and 3 marks, long 5 marks, case-based) with re-solve
// checks. Values, remainders, quotients and zeroes come from exact-fraction arithmetic (pm.mjs); each factorisation is verified by
// multiplying the factors back, and each remainder by long division as well as by the remainder theorem.
import { Q, caseQ, child, mk, plot } from './lib.mjs';
import { r, F, P, deg, padd, psub, pmul, peq, peval, pdivmod, ptex, ratRoots, fromRoots } from './pm.mjs';

const v = (p, a) => peval(p, F(...(Array.isArray(a) ? a : [a])));

// =============================================================== short answer, 2 marks
{
  Q('s201', mk.short({ marks: 2, stem: r`State the degree of $6x^{5} - x^{2}$. Classify it by the number of its terms, and name it by its degree if it has a name.`, model: r`The highest power of $x$ is $5$, so the degree is $5$.\n\nIt has two terms, $6x^{5}$ and $-x^{2}$, so it is a binomial. A polynomial of degree $5$ has no special name like linear, quadratic or cubic; we call it a polynomial of degree $5$.`, sol: 'Highest power gives the degree; count the terms.', scheme: [['Degree 5', 1], ['Binomial (two terms)', 1]], d: 1, c: 'recall', t: [1], time: 75 }), (Cx) => { const q = P(6, 0, 0, -1, 0, 0); Cx.assert(deg(q) === 5 && q.filter((c) => c.n !== 0).length === 2, 'degree 5, two terms'); Cx.model([5, 2, 6]); });
}
Q('s202', mk.short({ marks: 2, stem: r`Explain why $4x^{2} + \dfrac{3}{x} - 5$ is not a polynomial in $x$. Change one term so that it becomes a polynomial of degree $2$.`, model: r`The term $\dfrac{3}{x} = 3x^{-1}$ has a negative power of $x$, but in a polynomial every power of $x$ must be a whole number ($0, 1, 2, \ldots$).\n\nReplacing $\dfrac{3}{x}$ by $3x$ gives $4x^{2} + 3x - 5$, which has whole-number powers $2$, $1$, $0$ and degree $2$.`, sol: 'Rewrite the fraction as a power with a negative exponent.', scheme: [['3/x = 3x^(-1) has a negative power', 1], ['A corrected polynomial such as 4x^2 + 3x - 5', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), null, 'explanation: marked for naming the negative power and for a valid polynomial of degree 2 in the corrected expression');
{
  const p = P(5, -3, 2), a = peval(p, F(-1)), b = peval(p, F(2));
  Q('s203', mk.short({ marks: 2, stem: r`If $p(x) = 5x^{2} - 3x + 2$, find $p(-1) + p(2)$.`, model: r`$p(-1) = 5(-1)^{2} - 3(-1) + 2 = 5 + 3 + 2 = 10$.\n\n$p(2) = 5(2)^{2} - 3(2) + 2 = 20 - 6 + 2 = 16$.\n\nSo $p(-1) + p(2) = 10 + 16 = 26$.`, sol: 'Evaluate each value separately, then add.', scheme: [['p(-1) = 10', 0.5], ['p(2) = 16', 0.5], ['Sum 26', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(a.eq(F(10)) && b.eq(F(16)) && a.add(b).eq(F(26)), '10 + 16 = 26'); Cx.model([10, 16, 26]); });
}
{
  const p = P(1, -3, -10);
  Q('s204', mk.short({ marks: 2, stem: r`Verify that $5$ and $-2$ are zeroes of the polynomial $x^{2} - 3x - 10$.`, model: r`$p(5) = 5^{2} - 3(5) - 10 = 25 - 15 - 10 = 0$.\n\n$p(-2) = (-2)^{2} - 3(-2) - 10 = 4 + 6 - 10 = 0$.\n\nBoth values are $0$, so $5$ and $-2$ are zeroes of $p(x)$.`, sol: 'A zero makes the polynomial 0.', scheme: [['p(5) = 0', 1], ['p(-2) = 0', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(v(p, 5).n === 0 && v(p, -2).n === 0, 'both zero'); Cx.model([25, 15, 10, 4, 6]); });
}
{
  const p = P(8, -14), z = F(7, 4);
  Q('s205', mk.short({ marks: 2, stem: r`At a tea stall in Guwahati the profit, in hundreds of rupees, from selling $x$ hundred cups is $p(x) = 8x - 14$. Find the number of hundreds of cups at which the stall just breaks even, that is, the zero of $p(x)$.`, model: r`Breaking even means $p(x) = 0$, so $8x - 14 = 0$.\n\nThen $8x = 14$ and $x = \dfrac{14}{8} = \dfrac{7}{4}$, that is $1.75$ hundred cups, which is $175$ cups.`, sol: 'Set the polynomial equal to zero.', scheme: [['8x - 14 = 0', 1], ['x = 7/4 hundred cups (175 cups)', 1]], d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(peval(p, z).n === 0 && z.num() * 100 === 175, 'x = 7/4'); Cx.model([8, 14, 7, 4, 1.75, 175]); });
}
{
  const p = P(1, -4, 1, 11), rem = pdivmod(p, P(1, 3)).r[0];
  Q('s206', mk.short({ marks: 2, stem: r`Without actual division, find the remainder when $x^{3} - 4x^{2} + x + 11$ is divided by $x + 3$.`, model: r`By the remainder theorem the remainder is $p(-3)$, since $x + 3 = x - (-3)$.\n\n$p(-3) = (-3)^{3} - 4(-3)^{2} + (-3) + 11 = -27 - 36 - 3 + 11 = -55$.`, sol: 'Put x = -3 in the polynomial.', scheme: [['Remainder is p(-3)', 1], ['p(-3) = -55', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(rem.eq(F(-55)) && v(p, -3).eq(F(-55)), '-55'); Cx.model([3, 27, 36, 11, 55]); });
}
{
  const ks = [...Array(41).keys()].map((k) => k - 20).filter((k) => v(P(2, k, -1, 3), 1).eq(F(6)));
  Q('s207', mk.short({ marks: 2, stem: r`Neha’s teacher hides one coefficient in $2x^{3} + kx^{2} - x + 3$ and says that division by $x - 1$ leaves $6$. Work out the hidden coefficient $k$.`, model: r`The remainder is $p(1) = 2 + k - 1 + 3 = k + 4$.\n\nSetting $k + 4 = 6$ gives $k = 2$.`, sol: 'The remainder on dividing by x - 1 is p(1).', scheme: [['p(1) = k + 4', 1], ['k = 2', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(ks.join() === '2', 'k = 2'); Cx.model([2, 1, 3, 4, 6]); });
}
{
  const p = P(1, -3, -6, 8);
  Q('s208', mk.short({ marks: 2, stem: r`Use the factor theorem to show that $x - 4$ is a factor of $x^{3} - 3x^{2} - 6x + 8$.`, model: r`Here $p(4) = 4^{3} - 3(4)^{2} - 6(4) + 8 = 64 - 48 - 24 + 8 = 0$.\n\nSince $p(4) = 0$, the factor theorem says that $x - 4$ is a factor of $p(x)$.`, sol: 'Show that p(4) = 0.', scheme: [['p(4) = 64 - 48 - 24 + 8', 1], ['p(4) = 0, so x - 4 is a factor', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(v(p, 4).n === 0 && pdivmod(p, P(1, -4)).r[0].n === 0, 'p(4) = 0'); Cx.model([64, 48, 24, 8, 4]); });
}

// =============================================================== short answer, 3 marks
{
  const p = P(1, -4, 3, 7);
  Q('s301', mk.short({ marks: 3, stem: r`For $p(x) = x^{3} - 4x^{2} + 3x + 7$, find $p(0)$, $p(1)$ and $p(-1)$. Is any of $0$, $1$, $-1$ a zero of $p(x)$?`, model: r`$p(0) = 7$.\n\n$p(1) = 1 - 4 + 3 + 7 = 7$.\n\n$p(-1) = -1 - 4 - 3 + 7 = -1$.\n\nNone of these values is $0$, so none of $0$, $1$, $-1$ is a zero of $p(x)$.`, sol: 'Evaluate each value and compare with 0.', scheme: [['p(0) = 7', 1], ['p(1) = 7 and p(-1) = -1', 1], ['None is zero', 1]], d: 2, c: 'application', t: [1], time: 120 }), (Cx) => { Cx.assert(v(p, 0).eq(F(7)) && v(p, 1).eq(F(7)) && v(p, -1).eq(F(-1)), '7, 7, -1'); Cx.model([7, 1, 4, 3]); });
}
{
  const ks = [...Array(41).keys()].map((k) => k - 20).filter((k) => v(P(3, k, -7), 1).n === 0), q = P(3, 4, -7), f = pmul(P(1, -1), P(3, 7));
  Q('s302', mk.short({ marks: 3, stem: r`The number $1$ is a zero of $3x^{2} + kx - 7$. Find $k$, and then find the other zero.`, model: r`$p(1) = 3 + k - 7 = 0$, so $k = 4$ and $p(x) = 3x^{2} + 4x - 7$.\n\nBy the factor theorem $x - 1$ is a factor: $3x^{2} + 4x - 7 = (x - 1)(3x + 7)$.\n\nThe other zero comes from $3x + 7 = 0$, so it is $-\dfrac{7}{3}$.`, sol: 'Use p(1) = 0 for k, then factorise.', scheme: [['k = 4', 1], ['p(x) = (x - 1)(3x + 7)', 1], ['Other zero -7/3', 1]], d: 3, c: 'application', t: [1, 2], time: 135 }), (Cx) => { Cx.assert(ks.join() === '4' && peq(f, q) && v(q, [-7, 3]).n === 0, 'k = 4, other zero -7/3'); Cx.model([4, 3, 7, 1]); });
}
{
  const p = P(2, -7, 5, -9), a = pdivmod(p, P(1, -3)).r[0], b = pdivmod(p, P(2, -1)).r[0];
  Q('s303', mk.short({ marks: 3, stem: r`Find the remainder when $2x^{3} - 7x^{2} + 5x - 9$ is divided by (i) $x - 3$ and (ii) $2x - 1$.`, model: r`(i) The remainder is $p(3) = 2(27) - 7(9) + 5(3) - 9 = 54 - 63 + 15 - 9 = -3$.\n\n(ii) $2x - 1 = 0$ at $x = \dfrac{1}{2}$, so the remainder is $p\left(\dfrac{1}{2}\right) = \dfrac{2}{8} - \dfrac{7}{4} + \dfrac{5}{2} - 9 = -8$.`, sol: 'Put x equal to the zero of the divisor.', scheme: [['(i) p(3) = -3', 1.5], ['(ii) zero of 2x - 1 is 1/2', 0.5], ['(ii) p(1/2) = -8', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(a.eq(F(-3)) && b.eq(F(-8)) && v(p, [1, 2]).eq(F(-8)), '-3 and -8'); Cx.model([54, 63, 15, 9, 3, 8]); });
}
{
  const sol = [...Array(21).keys()].flatMap((a) => [...Array(21).keys()].map((b) => [a - 10, b - 10])).filter(([a, b]) => v(P(1, a, b, 6), -2).n === 0 && v(P(1, a, b, 6), 3).n === 0);
  Q('s304', mk.short({ marks: 3, stem: r`The polynomial $x^{3} + ax^{2} + bx + 6$ has $x + 2$ and $x - 3$ as factors. Find $a$ and $b$.`, model: r`By the factor theorem $p(-2) = 0$: $-8 + 4a - 2b + 6 = 0$, so $2a - b = 1$.\n\nAlso $p(3) = 0$: $27 + 9a + 3b + 6 = 0$, so $3a + b = -11$.\n\nAdding, $5a = -10$, so $a = -2$, and then $b = 2a - 1 = -5$.`, sol: 'Two factors give two equations in a and b.', scheme: [['p(-2) = 0 gives 2a - b = 1', 1], ['p(3) = 0 gives 3a + b = -11', 1], ['a = -2 and b = -5', 1]], d: 4, c: 'analysis', t: [2], time: 150 }), (Cx) => { Cx.assert(sol.length === 1 && sol[0].join() === '-2,-5', 'a = -2, b = -5'); Cx.model([8, 4, 2, 27, 9, 3, 11, 5, 1]); });
}
{
  const p = P(1, -2, -9, 18), d = pdivmod(p, P(1, -2)), rt = ratRoots(p).map(String).join(), f = fromRoots([2, 3, -3]);
  Q('s305', mk.short({ marks: 3, stem: r`Factorise $x^{3} - 2x^{2} - 9x + 18$ completely.`, model: r`$p(2) = 8 - 8 - 18 + 18 = 0$, so $x - 2$ is a factor.\n\nDividing, $x^{3} - 2x^{2} - 9x + 18 = (x - 2)(x^{2} - 9)$.\n\nSince $x^{2} - 9 = (x - 3)(x + 3)$, the complete factorisation is $(x - 2)(x - 3)(x + 3)$.`, sol: 'Find one zero, divide, then factorise the quadratic.', scheme: [['p(2) = 0, so x - 2 is a factor', 1], ['Quotient x^2 - 9', 1], ['(x - 2)(x - 3)(x + 3)', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(v(p, 2).n === 0 && peq(d.q, P(1, 0, -9)) && d.r[0].n === 0 && peq(f, p) && rt === '-3,2,3', '(x - 2)(x - 3)(x + 3)'); Cx.model([8, 18, 9, 2, 3]); });
}

// =============================================================== long answer, 5 marks
{
  const p = P(2, -3, -11, 6), z = [F(3), F(1, 2)];
  Q('l01', mk.long({ stem: r`Let $p(x) = 2x^{3} - 3x^{2} - 11x + 6$. (a) State the degree of $p(x)$, the number of its terms, and its name by degree. (b) Find $p(0)$, $p(1)$ and $p(-2)$. (c) Show that $3$ and $\dfrac{1}{2}$ are also zeroes of $p(x)$. (d) Can $p(x)$ have any zero other than $-2$, $3$ and $\dfrac{1}{2}$? Give a reason.`, model: r`**(a)** The highest power of $x$ is $3$, so the degree is $3$ and $p(x)$ is a cubic polynomial. It has four terms.\n\n**(b)** $p(0) = 6$. $p(1) = 2 - 3 - 11 + 6 = -6$. $p(-2) = 2(-8) - 3(4) - 11(-2) + 6 = -16 - 12 + 22 + 6 = 0$, so $-2$ is a zero.\n\n**(c)** $p(3) = 2(27) - 3(9) - 11(3) + 6 = 54 - 27 - 33 + 6 = 0$. $p\left(\dfrac{1}{2}\right) = \dfrac{2}{8} - \dfrac{3}{4} - \dfrac{11}{2} + 6 = 0$. So $3$ and $\dfrac{1}{2}$ are zeroes.\n\n**(d)** No. A polynomial of degree $3$ has at most $3$ zeroes, and we have already found three.`, sol: 'Evaluate at each number; compare the number of zeroes with the degree.', scheme: [['(a) degree 3, cubic, four terms', 1], ['(b) p(0) = 6, p(1) = -6, p(-2) = 0', 1.5], ['(c) p(3) = 0 and p(1/2) = 0', 1.5], ['(d) at most three zeroes, so no more', 1]], d: 3, c: 'application', t: [1], time: 420 }), (Cx) => { Cx.assert(deg(p) === 3 && v(p, 0).eq(F(6)) && v(p, 1).eq(F(-6)) && v(p, -2).n === 0 && z.every((a) => peval(p, a).n === 0) && ratRoots(p).length === 3, 'zeroes -2, 3, 1/2'); Cx.model([3, 4, 6, 1, 2, 54, 27, 33, 11]); });
}
{
  const p = P(1, -2, -8);
  const fig = plot({ x: [-4, 6], y: [-10, 12], fns: [{ expr: 'x^2 - 2x - 8', label: '$y = x^2 - 2x - 8$' }], pts: [[-2, 0, '(−2, 0)'], [4, 0, '(4, 0)'], [0, -8, '(0, −8)']] }, 'The curve y equals x squared minus 2x minus 8 is a U-shaped curve opening upwards. It crosses the x-axis at minus 2 and 4, which are the zeroes, and crosses the y-axis at minus 8.', 'The zeroes of $p(x)$ are the $x$-values where the curve meets the $x$-axis.');
  Q('l02', mk.long({ assets: [fig], stem: r`The figure shows the curve $y = p(x)$ for $p(x) = x^{2} - 2x - 8$. (a) Show that $-2$ and $4$ are zeroes of $p(x)$. (b) Explain how the figure shows these zeroes. (c) Find $p(0)$ and say where the curve meets the $y$-axis. (d) Find $p(1)$ and say whether the curve lies above or below the $x$-axis at $x = 1$.`, model: r`**(a)** $p(-2) = 4 + 4 - 8 = 0$ and $p(4) = 16 - 8 - 8 = 0$, so both are zeroes.\n\n**(b)** A zero is a value of $x$ for which $y = p(x) = 0$, and $y = 0$ on the $x$-axis. So the zeroes are the $x$-values of the points where the curve meets the $x$-axis: $(-2, 0)$ and $(4, 0)$.\n\n**(c)** $p(0) = -8$, so the curve meets the $y$-axis at $(0, -8)$.\n\n**(d)** $p(1) = 1 - 2 - 8 = -9$. Since $-9 < 0$, the curve lies below the $x$-axis at $x = 1$.`, sol: 'A zero is an x-intercept of the graph.', scheme: [['(a) p(-2) = 0 and p(4) = 0', 1.5], ['(b) zeroes are the x-intercepts', 1], ['(c) p(0) = -8', 1], ['(d) p(1) = -9, below the x-axis', 1.5]], d: 3, c: 'analysis', t: [1], time: 420 }), (Cx) => { Cx.assert(v(p, -2).n === 0 && v(p, 4).n === 0 && v(p, 0).eq(F(-8)) && v(p, 1).eq(F(-9)) && ratRoots(p).map(String).join() === '-2,4', 'zeroes -2 and 4'); Cx.model([4, 8, 16, 2, 9]); });
}
{
  const p = P(1, -3, 2, -1, 7), d = pdivmod(p, P(1, -2)), prod = padd(pmul(P(1, -2), d.q), d.r);
  Q('l03', mk.long({ stem: r`Let $p(x) = x^{4} - 3x^{3} + 2x^{2} - x + 7$. (a) Use the remainder theorem to find the remainder when $p(x)$ is divided by $x - 2$. (b) Divide $p(x)$ by $x - 2$ to find the quotient. (c) Verify that $p(x) = (x - 2) \times (\text{quotient}) + (\text{remainder})$. (d) Is $x - 2$ a factor of $p(x)$? What number should be subtracted from $p(x)$ so that $x - 2$ becomes a factor?`, model: r`**(a)** The remainder is $p(2) = 16 - 24 + 8 - 2 + 7 = 5$.\n\n**(b)** Long division gives the quotient $x^{3} - x^{2} - 1$ and the remainder $5$.\n\n**(c)** $(x - 2)(x^{3} - x^{2} - 1) = x^{4} - x^{3} - x - 2x^{3} + 2x^{2} + 2 = x^{4} - 3x^{3} + 2x^{2} - x + 2$. Adding the remainder $5$ gives $x^{4} - 3x^{3} + 2x^{2} - x + 7 = p(x)$.\n\n**(d)** The remainder is $5$, not $0$, so $x - 2$ is not a factor. Subtracting $5$ gives $p(x) - 5$, whose value at $2$ is $0$, so $x - 2$ is then a factor.`, sol: 'Remainder theorem, then long division, then multiply back.', scheme: [['(a) p(2) = 5', 1], ['(b) quotient x^3 - x^2 - 1', 1.5], ['(c) multiplying back gives p(x)', 1.5], ['(d) not a factor; subtract 5', 1]], d: 3, c: 'application', t: [2], time: 450 }), (Cx) => { Cx.assert(d.r[0].eq(F(5)) && peq(d.q, P(1, -1, 0, -1)) && peq(prod, p) && v(p, 2).eq(F(5)) && v(psub(p, P(5)), 2).n === 0, 'remainder 5, quotient x^3 - x^2 - 1'); Cx.model([16, 24, 8, 2, 7, 5, 3, 1]); });
}
{
  const p = P(2, 1, -13, 6), rts = ratRoots(p), q = pdivmod(p, P(1, -2)).q, f = pmul(pmul(P(1, -2), P(2, -1)), P(1, 3));
  Q('l04', mk.long({ stem: r`Factorise $2x^{3} + x^{2} - 13x + 6$ completely. (a) Find a zero by trying $1$, $-1$ and $2$. (b) Divide by the corresponding factor. (c) Factorise the quotient. (d) State all the zeroes of the polynomial.`, model: r`**(a)** $p(1) = 2 + 1 - 13 + 6 = -4$ and $p(-1) = -2 + 1 + 13 + 6 = 18$, neither is $0$. $p(2) = 16 + 4 - 26 + 6 = 0$, so $x - 2$ is a factor.\n\n**(b)** Dividing, $2x^{3} + x^{2} - 13x + 6 = (x - 2)(2x^{2} + 5x - 3)$.\n\n**(c)** $2x^{2} + 5x - 3 = 2x^{2} + 6x - x - 3 = 2x(x + 3) - 1(x + 3) = (x + 3)(2x - 1)$.\n\n**(d)** The factorisation is $(x - 2)(2x - 1)(x + 3)$, so the zeroes are $2$, $\dfrac{1}{2}$ and $-3$.`, sol: 'Trial for one zero, division, then split the middle term.', scheme: [['(a) p(2) = 0', 1], ['(b) quotient 2x^2 + 5x - 3', 1.5], ['(c) (x + 3)(2x - 1)', 1.5], ['(d) zeroes 2, 1/2, -3', 1]], d: 4, c: 'application', t: [2], time: 450 }), (Cx) => { Cx.assert(v(p, 1).eq(F(-4)) && v(p, -1).eq(F(18)) && v(p, 2).n === 0 && peq(q, P(2, 5, -3)) && peq(f, p) && rts.map(String).join() === '-3,1/2,2', '(x - 2)(2x - 1)(x + 3)'); Cx.model([2, 1, 13, 6, 4, 18, 16, 26, 5, 3]); });
}
{
  const sols = [...Array(31).keys()].flatMap((a) => [...Array(31).keys()].map((b) => [a - 15, b - 15])).filter(([a, b]) => v(P(2, a, b, -6), 1).n === 0 && v(P(2, a, b, -6), -2).n === 0);
  const p = P(2, 5, -1, -6), f = pmul(pmul(P(1, -1), P(1, 2)), P(2, 3));
  Q('l05', mk.long({ stem: r`The polynomial $p(x) = 2x^{3} + ax^{2} + bx - 6$ has $x - 1$ and $x + 2$ as factors. (a) Form two equations in $a$ and $b$. (b) Solve them to find $a$ and $b$. (c) Find the third factor and write $p(x)$ as a product of three linear factors. (d) State the zeroes of $p(x)$.`, model: r`**(a)** $p(1) = 0$: $2 + a + b - 6 = 0$, so $a + b = 4$. $p(-2) = 0$: $-16 + 4a - 2b - 6 = 0$, so $2a - b = 11$.\n\n**(b)** Adding the two equations, $3a = 15$, so $a = 5$ and $b = 4 - 5 = -1$.\n\n**(c)** Now $p(x) = 2x^{3} + 5x^{2} - x - 6$. Since $(x - 1)(x + 2) = x^{2} + x - 2$, dividing gives the quotient $2x + 3$. So $p(x) = (x - 1)(x + 2)(2x + 3)$.\n\n**(d)** The zeroes are $1$, $-2$ and $-\dfrac{3}{2}$.`, sol: 'Two factors give two equations; divide by the product of the known factors.', scheme: [['(a) a + b = 4 and 2a - b = 11', 1.5], ['(b) a = 5 and b = -1', 1], ['(c) third factor 2x + 3', 1.5], ['(d) zeroes 1, -2, -3/2', 1]], d: 4, c: 'analysis', t: [2], time: 480 }), (Cx) => { Cx.assert(sols.length === 1 && sols[0].join() === '5,-1' && peq(f, p) && ratRoots(p).length === 3, 'a = 5, b = -1, (x - 1)(x + 2)(2x + 3)'); Cx.model([2, 6, 16, 3, 15, 5, 4, 11, 1]); });
}

// =============================================================== case-based
{
  const p = P(3, -4, 5);
  caseQ('c01', {
    passage: r`A drone club in Indore hires out practice drones. The hire charge, in hundreds of rupees, for $x$ hours of flying is given by $p(x) = 3x^{2} - 4x + 5$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${v(p, 3)}$ hundred rupees. (c) (i) $p(2) = ${v(p, 2)}$ and $p(0) = ${v(p, 0)}$. Or (ii) $p(1) = ${v(p, 1)} \neq 0$, so $1$ is not a zero.`,
    sol: r`(a) three terms and highest power $2$. (b) $p(3) = 27 - 12 + 5 = 20$. (c) (i) $p(2) = 12 - 8 + 5 = 9$ and $p(0) = 5$. (ii) $p(1) = 3 - 4 + 5 = 4$.`,
    children: [
      child('a', mk.mcq({ stem: 'The polynomial $p(x)$ is a', opts: ['quadratic trinomial', 'linear trinomial', 'quadratic binomial', 'cubic trinomial'], key: 'a', sol: r`It has three terms, $3x^{2}$, $-4x$ and $5$, so it is a trinomial. Its degree is $2$, so it is quadratic.`, d: 1, c: 'recall', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'Find the hire charge, in hundreds of rupees, for $3$ hours of flying.', value: 20, sol: r`$p(3) = 3(3)^{2} - 4(3) + 5 = 27 - 12 + 5 = 20$ hundred rupees.`, scheme: [['p(3) = 27 - 12 + 5 = 20', 1]], d: 1, c: 'application', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the charge for $2$ hours and the value $p(0)$. What does $p(0)$ mean for the club?', model: r`$p(2) = 3(4) - 8 + 5 = 9$ hundred rupees.\n\n$p(0) = 5$ hundred rupees: this is a fixed booking charge paid even before any flying.`, sol: 'Substitute 2 and 0.', scheme: [['p(2) = 9', 1], ['p(0) = 5, the fixed charge', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Is $x = 1$ a zero of $p(x)$? What would a zero of $p(x)$ mean for the charge?', model: r`$p(1) = 3 - 4 + 5 = 4$, which is not $0$, so $1$ is not a zero.\n\nA zero would be a number of hours for which the charge is $0$, that is free hire.`, sol: 'Evaluate p(1) and interpret zero.', scheme: [['p(1) = 4, not zero', 1], ['A zero would mean a charge of 0', 1]], d: 2, c: 'analysis', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').key('a');
    Cx.child('b').val(v(p, 3).num());
    Cx.child('c').assert(v(p, 2).eq(F(9)) && v(p, 0).eq(F(5)), '9 and 5');
    Cx.child('c').model([9, 5, 8]);
    Cx.child('cii').assert(v(p, 1).eq(F(4)), 'p(1) = 4');
    Cx.child('cii').model([3, 4, 1]);
  });
}
{
  const p = P(1, 1, -12), len = P(1, 4), br = P(1, -3);
  caseQ('c02', {
    passage: r`A rectangular pond in a Pune park has length $(x + 4)$ m and breadth $(x - 3)$ m, where $x > 3$. Its area, in square metres, is the polynomial $p(x) = x^{2} + x - 12$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${v(p, 5)}$ square metres. (c) (i) $p(3) = 0$ and $p(-4) = 0$. Or (ii) The breadth $x - 3$ must be positive, so $x > 3$; the zero $-4$ would give a negative length.`,
    sol: r`(a) $p(3) = 9 + 3 - 12 = 0$. (b) $p(5) = 25 + 5 - 12 = 18$. (c) (i) $p(3) = 0$ and $p(-4) = 16 - 4 - 12 = 0$. (ii) at $x = -4$ the length $x + 4 = 0$ and the breadth $x - 3 = -7$, which is impossible.`,
    children: [
      child('a', mk.mcq({ stem: 'Which value of $x$ makes the area $p(x)$ equal to $0$?', opts: ['$3$', '$4$', '$-3$', '$12$'], key: 'a', sol: r`$p(3) = 9 + 3 - 12 = 0$, so $3$ is a zero (the breadth $x - 3$ becomes $0$). $p(4) = 8$, $p(-3) = -6$ and $p(12) = 144$.`, d: 2, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the area of the pond, in square metres, when $x = 5$.', value: 18, unit: 'm2', sol: r`$p(5) = 25 + 5 - 12 = 18$. Check: length $9$ m times breadth $2$ m $= 18$ square metres.`, scheme: [['p(5) = 18', 1]], d: 1, c: 'application', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Verify that $3$ and $-4$ are zeroes of $p(x)$.', model: r`$p(3) = 9 + 3 - 12 = 0$.\n\n$p(-4) = 16 - 4 - 12 = 0$.\n\nBoth values are $0$, so $3$ and $-4$ are zeroes.`, sol: 'Substitute each value.', scheme: [['p(3) = 0', 1], ['p(-4) = 0', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), [
        mk.short({ marks: 2, stem: '**(ii)** Only one of the two zeroes makes sense as a value of $x$ for the pond. Which one, and why?', model: r`The breadth $x - 3$ must be positive, so $x > 3$. The zero $3$ gives breadth $0$, not a real pond, and the zero $-4$ gives breadth $-7$, which is impossible.\n\nSo neither zero gives a pond; the area is positive only for $x > 3$.`, sol: 'Think about the length and breadth.', scheme: [['x must be greater than 3 for a positive breadth', 1], ['Both zeroes give no real pond', 1]], d: 4, c: 'evaluation', t: [1], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([3, 4, -3, 12].map((a) => (v(p, a).n === 0 ? 1 : 0)), 1);
    Cx.child('b').val(v(p, 5).num());
    Cx.assert(peq(pmul(len, br), p), 'area = (x + 4)(x - 3)');
    Cx.child('c').assert(v(p, 3).n === 0 && v(p, -4).n === 0, 'zeroes 3 and -4');
    Cx.child('c').model([9, 3, 12, 16, 4]);
    Cx.child('cii').assert(v(br, -4).eq(F(-7)) && v(br, 3).n === 0, 'breadth -7 and 0');
    Cx.child('cii').model([3, 4, 7]);
  });
}
{
  const p = P(1, -3, 4, -2), a = pdivmod(p, P(1, -2)).r[0], b = pdivmod(p, P(1, -1)), c = pdivmod(p, P(1, 1)).r[0];
  caseQ('c03', {
    passage: r`A workshop in Rajkot cuts a steel strip whose length, in centimetres, is the polynomial $p(x) = x^{3} - 3x^{2} + 4x - 2$ into equal pieces. When a divisor such as $x - 2$ is used, the remainder is the length left over.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${b.r[0]}$. (c) (i) The quotient is $x^{2} - 2x + 2$. Or (ii) The remainder is $-10$.`,
    sol: r`(a) $p(2) = 8 - 12 + 8 - 2 = 2$. (b) $p(1) = 1 - 3 + 4 - 2 = 0$. (c) (i) dividing by $x - 1$ gives $x^{2} - 2x + 2$. (ii) $p(-1) = -1 - 3 - 4 - 2 = -10$.`,
    children: [
      child('a', mk.mcq({ stem: 'The length left over when $p(x)$ is divided by $x - 2$ is', opts: ['$2$', '$-30$', '$10$', '$-10$'], key: 'a', sol: r`By the remainder theorem the remainder is $p(2) = 8 - 12 + 8 - 2 = 2$. The values $-30$, $10$ and $-10$ are $p(-2)$, $p(3)$ and $p(-1)$.`, d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'Find the remainder when $p(x)$ is divided by $x - 1$.', value: 0, sol: r`$p(1) = 1 - 3 + 4 - 2 = 0$, so the remainder is $0$: nothing is left over.`, scheme: [['p(1) = 0', 1]], d: 2, c: 'application', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Divide $p(x)$ by $x - 1$ and write the quotient.', model: r`Since $p(1) = 0$, the division is exact. Dividing, $x^{3} - 3x^{2} + 4x - 2 = (x - 1)(x^{2} - 2x + 2)$.\n\nThe quotient is $x^{2} - 2x + 2$.`, sol: 'Divide term by term, or use synthetic division with 1.', scheme: [['The remainder p(1) = 0', 1], ['Quotient x^2 - 2x + 2', 1]], d: 3, c: 'application', t: [2], time: 120 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the remainder when $p(x)$ is divided by $x + 1$ without long division.', model: r`The remainder is $p(-1)$, since $x + 1 = x - (-1)$.\n\n$p(-1) = (-1)^{3} - 3(-1)^{2} + 4(-1) - 2 = -1 - 3 - 4 - 2 = -10$.`, sol: 'Put x = -1.', scheme: [['Remainder is p(-1)', 1], ['p(-1) = -10', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([a.num(), v(p, -2).num(), v(p, 3).num(), c.num()], 2);
    Cx.child('b').val(b.r[0].num());
    Cx.child('c').assert(peq(b.q, P(1, -2, 2)) && peq(pmul(P(1, -1), b.q), p), '(x - 1)(x^2 - 2x + 2)');
    Cx.child('c').model([1, 2, 3, 4]);
    Cx.child('cii').assert(c.eq(F(-10)), '-10');
    Cx.child('cii').model([1, 3, 4, 2, 10]);
  });
}
{
  const p = P(1, 3, -4, -12), ks = [...Array(21).keys()].map((k) => k - 10).filter((k) => v(P(1, k, -4, -12), -2).n === 0), f = fromRoots([-3, 2, -2]);
  caseQ('c04', {
    passage: r`A tile designer in Jaipur models the perimeter of a border pattern, in decimetres, by the polynomial $p(x) = x^{3} + kx^{2} - 4x - 12$. The pattern is made of pieces that fit exactly when $x + 2$ is a factor of $p(x)$.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${ks[0]}$. (c) (i) $p(x) = (x + 3)(x - 2)(x + 2)$. Or (ii) The zeroes are $-3$, $2$ and $-2$.`,
    sol: r`(a) a factor $x + 2$ means $p(-2) = 0$. (b) $p(-2) = -8 + 4k + 8 - 12 = 4k - 12 = 0$, so $k = 3$. (c) (i) with $k = 3$, $x^{3} + 3x^{2} - 4x - 12 = x^{2}(x + 3) - 4(x + 3) = (x + 3)(x^{2} - 4) = (x + 3)(x - 2)(x + 2)$. (ii) set each factor to $0$.`,
    children: [
      child('a', mk.mcq({ stem: 'For $x + 2$ to be a factor of $p(x)$, which condition must hold?', opts: ['$p(-2) = 0$', '$p(0) = -2$', '$p(2) = -2$', '$p(-2) = 2$'], key: 'a', sol: r`$x + 2 = x - (-2)$, so by the factor theorem it is a factor exactly when $p(-2) = 0$. The other conditions compare a value of $p(x)$ with a number that is not $0$, so they do not say that the remainder is $0$.`, d: 2, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the value of $k$.', value: 3, sol: r`$p(-2) = (-2)^{3} + k(-2)^{2} - 4(-2) - 12 = -8 + 4k + 8 - 12 = 4k - 12$. Setting this equal to $0$ gives $k = 3$.`, scheme: [['4k - 12 = 0, so k = 3', 1]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** With this value of $k$, factorise $p(x)$ completely.', model: r`With $k = 3$, $p(x) = x^{3} + 3x^{2} - 4x - 12 = x^{2}(x + 3) - 4(x + 3) = (x + 3)(x^{2} - 4)$.\n\nSince $x^{2} - 4 = (x - 2)(x + 2)$, we get $p(x) = (x + 3)(x - 2)(x + 2)$.`, sol: 'Group the terms in pairs.', scheme: [['Grouping to (x + 3)(x^2 - 4)', 1], ['(x + 3)(x - 2)(x + 2)', 1]], d: 4, c: 'application', t: [2], time: 135 }), [
        mk.short({ marks: 2, stem: '**(ii)** Write down all the zeroes of $p(x)$ and check one of them.', model: r`Setting each factor equal to $0$, the zeroes are $-3$, $2$ and $-2$.\n\nCheck: $p(2) = 8 + 12 - 8 - 12 = 0$.`, sol: 'A product is zero when a factor is zero.', scheme: [['Zeroes -3, 2, -2', 1], ['A correct check such as p(2) = 0', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([v(p, -2).n === 0, v(p, 0).eq(F(-2)), v(p, 2).eq(F(-2)), v(p, -2).eq(F(2))].map((x) => (x ? 1 : 0)), 1);
    Cx.child('b').val(ks[0]);
    Cx.child('c').assert(ks.join() === '3' && peq(f, p), '(x + 3)(x - 2)(x + 2)');
    Cx.child('c').model([3, 4, 2]);
    Cx.child('cii').assert(ratRoots(p).map(String).join() === '-3,-2,2' && v(p, 2).n === 0, 'zeroes -3, -2, 2');
    Cx.child('cii').model([3, 2, 8, 12]);
  });
}

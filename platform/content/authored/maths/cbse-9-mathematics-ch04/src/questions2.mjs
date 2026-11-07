// CBSE 9 Mathematics ch04 Exploring Algebraic Identities: written items (short 2 and 3 marks, long 5 marks, case-based).
// Identities are checked numerically at fixed points; factorisations are expanded and compared as coefficient arrays.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, must, close, range, pmul, pprod, peq, numEq, PTS1, PTS2, PTS3 } from './h.mjs';

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Use an identity to expand $(4p - 3q)^2$.`, model: r`$(a - b)^2 = a^2 - 2ab + b^2$ with $a = 4p$ and $b = 3q$.\n\n$(4p - 3q)^2 = (4p)^2 - 2(4p)(3q) + (3q)^2 = 16p^2 - 24pq + 9q^2$.`, sol: 'Use the identity for the square of a difference.', scheme: [['Chooses (a - b)^2 with a = 4p, b = 3q', 1], ['16p^2 - 24pq + 9q^2', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(numEq((p, q) => (4 * p - 3 * q) ** 2, (p, q) => 16 * p * p - 24 * p * q + 9 * q * q, PTS2), 'expansion'); Cx.model([16, 24, 9]); });
Q('s202', mk.short({ marks: 2, stem: r`Find the value of $503^2 - 497^2$ using an identity.`, model: r`$503^2 - 497^2 = (503 - 497)(503 + 497) = 6 \times 1000 = 6000$.`, sol: 'Difference of two squares.', scheme: [['(503 - 497)(503 + 497)', 1], ['6000', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(503 * 503 - 497 * 497 === 6000, '6000'); Cx.model([6, 1000, 6000]); });
{
  const x = 7, parts = [x * x, 3 * x, 3 * x, 9];
  Q('s203', mk.short({ marks: 2, stem: r`A square courtyard in Jaipur has side $(x + 3)$ metres. It is divided into a square of side $x$, two rectangles measuring $x$ by $3$, and a square of side $3$. Write the area in two ways to get an identity, and verify it for $x = 7$.`, model: r`Whole square: $(x + 3)^2$. Sum of the parts: $x^2 + 3x + 3x + 9 = x^2 + 6x + 9$. So $(x + 3)^2 = x^2 + 6x + 9$.\n\nFor $x = 7$: the parts are $49, 21, 21, 9$ with total $100$, and $(7 + 3)^2 = 100$.`, sol: 'Add the four areas and compare with the area of the whole square.', scheme: [['(x + 3)^2 = x^2 + 6x + 9 from the parts', 1], ['x = 7: parts 49, 21, 21, 9 total 100 = 10^2', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(parts.join() === '49,21,21,9' && parts.reduce((s, v) => s + v, 0) === 100 && (x + 3) ** 2 === 100, 'areas'); Cx.model([49, 21, 9, 100, 6]); });
}
Q('s204', mk.short({ marks: 2, stem: r`Factorise $16x^2 - 81y^2$.`, model: r`$16x^2 - 81y^2 = (4x)^2 - (9y)^2 = (4x - 9y)(4x + 9y)$.`, sol: 'Write both terms as squares.', scheme: [['(4x)^2 - (9y)^2', 1], ['(4x - 9y)(4x + 9y)', 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(numEq((x, y) => 16 * x * x - 81 * y * y, (x, y) => (4 * x - 9 * y) * (4 * x + 9 * y), PTS2), 'factorisation'); Cx.model([4, 9]); });
Q('s205', mk.short({ marks: 2, stem: r`Factorise $12x^2 - 27$ completely.`, model: r`Take out the common factor $3$: $12x^2 - 27 = 3(4x^2 - 9)$.\n\nThen $4x^2 - 9 = (2x)^2 - 3^2 = (2x - 3)(2x + 3)$, so $12x^2 - 27 = 3(2x - 3)(2x + 3)$.`, sol: 'Common factor first, then the difference of squares.', scheme: [['Common factor 3', 1], ['3(2x - 3)(2x + 3)', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(peq(pprod([3], [2, -3], [2, 3]), [12, 0, -27]), 'expansion gives 12x^2 - 27'); Cx.model([3, 4, 9, 2]); });
{
  const bad = range(-20, 20).filter((x) => (x - 4) * (x + 1) === 0);
  Q('s206', mk.short({ marks: 2, stem: r`For which values of $x$ is the expression $\dfrac{3x + 2}{(x - 4)(x + 1)}$ not defined? Give a reason.`, model: r`A fraction is not defined when its denominator is $0$. The denominator $(x - 4)(x + 1)$ is $0$ when $x - 4 = 0$ or $x + 1 = 0$, that is, for $x = 4$ and $x = -1$.`, sol: 'Set the denominator equal to zero.', scheme: [['Denominator zero makes it undefined', 1], ['x = 4 and x = -1', 1]], d: 1, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(bad.join() === '-1,4', 'x = -1 and 4'); Cx.model([4, 1]); });
}
Q('s207', mk.short({ marks: 2, stem: r`Simplify $\dfrac{x^2 - 4}{x^2 + 4x + 4}$ and state the value of $x$ for which the original expression is not defined.`, model: r`$x^2 - 4 = (x - 2)(x + 2)$ and $x^2 + 4x + 4 = (x + 2)^2$.\n\nSo the expression is $\dfrac{(x - 2)(x + 2)}{(x + 2)(x + 2)} = \dfrac{x - 2}{x + 2}$, for $x \ne -2$. The original is not defined at $x = -2$.`, sol: 'Factorise both, then cancel the common factor.', scheme: [['Both factorised', 1], ['(x - 2)/(x + 2) with x not -2', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(numEq((x) => (x * x - 4) / (x * x + 4 * x + 4), (x) => (x - 2) / (x + 2), [[-9], [-5], [-1], [0], [1], [3], [8]]), 'simplification'); Cx.model([2, 4]); });

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Prove that $(a + b)^2 - (a - b)^2 = 4ab$. Use it to find $(47 + 13)^2 - (47 - 13)^2$.`, model: r`$(a + b)^2 - (a - b)^2 = (a^2 + 2ab + b^2) - (a^2 - 2ab + b^2) = 4ab$.\n\nWith $a = 47$ and $b = 13$: $60^2 - 34^2 = 4 \times 47 \times 13 = 2444$. Check: $3600 - 1156 = 2444$.`, sol: 'Expand both squares and subtract.', scheme: [['Expands both squares', 1], ['Simplifies to 4ab', 1], ['4 x 47 x 13 = 2444', 1]], d: 3, c: 'analysis', t: [1], time: 150 }), (Cx) => { Cx.assert(numEq((a, b) => (a + b) ** 2 - (a - b) ** 2, (a, b) => 4 * a * b, PTS2) && 60 * 60 - 34 * 34 === 2444 && 4 * 47 * 13 === 2444, '4ab and 2444'); Cx.model([4, 47, 13, 2444, 3600, 1156]); });
Q('s302', mk.short({ marks: 3, stem: r`Factorise $x^2 - 2x - 63$ by splitting the middle term.`, model: r`We need two numbers with product $-63$ and sum $-2$: they are $-9$ and $7$.\n\n$x^2 - 2x - 63 = x^2 - 9x + 7x - 63 = x(x - 9) + 7(x - 9) = (x - 9)(x + 7)$.`, sol: 'Find two numbers with product -63 and sum -2.', scheme: [['The numbers -9 and 7', 1], ['Splits the middle term and groups', 1], ['(x - 9)(x + 7)', 1]], d: 2, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(peq(pmul([1, -9], [1, 7]), [1, -2, -63]) && -9 * 7 === -63 && -9 + 7 === -2, '(x - 9)(x + 7)'); Cx.model([63, 9, 7]); });
Q('s303', mk.short({ marks: 3, stem: r`Factorise $10x^2 + 17x + 3$.`, model: r`$10 \times 3 = 30$. We need two numbers with product $30$ and sum $17$: they are $15$ and $2$.\n\n$10x^2 + 17x + 3 = 10x^2 + 15x + 2x + 3 = 5x(2x + 3) + 1(2x + 3) = (5x + 1)(2x + 3)$.`, sol: 'Multiply the first and last coefficients, then split the middle term.', scheme: [['Product 30, numbers 15 and 2', 1], ['Splits and groups', 1], ['(5x + 1)(2x + 3)', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(peq(pmul([5, 1], [2, 3]), [10, 17, 3]) && 15 * 2 === 30 && 15 + 2 === 17, '(5x + 1)(2x + 3)'); Cx.model([30, 15, 2, 17]); });
Q('s304', mk.short({ marks: 3, stem: r`Simplify $\dfrac{x^2 - 5x + 6}{x^2 - x - 6}$, stating the values of $x$ for which it is not defined.`, model: r`$x^2 - 5x + 6 = (x - 2)(x - 3)$ and $x^2 - x - 6 = (x - 3)(x + 2)$.\n\nThe fraction is $\dfrac{(x - 2)(x - 3)}{(x - 3)(x + 2)} = \dfrac{x - 2}{x + 2}$ for $x \ne 3$.\n\nThe original expression is not defined for $x = 3$ and $x = -2$, where the denominator is $0$.`, sol: 'Factorise numerator and denominator, then cancel.', scheme: [['Both factorised', 1], ['(x - 2)/(x + 2)', 1], ['Not defined at x = 3 and x = -2', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(peq(pmul([1, -2], [1, -3]), [1, -5, 6]) && peq(pmul([1, -3], [1, 2]), [1, -1, -6]) && numEq((x) => (x * x - 5 * x + 6) / (x * x - x - 6), (x) => (x - 2) / (x + 2), [[-9], [-5], [-1], [0], [1], [4], [8]]), 'simplification'); Cx.model([2, 3, 6]); });
Q('s305', mk.short({ marks: 3, stem: r`Simplify $\dfrac{3}{x - 2} - \dfrac{2}{x + 3}$ for $x \ne 2$ and $x \ne -3$.`, model: r`The LCM of the denominators is $(x - 2)(x + 3)$.\n\n$\dfrac{3}{x - 2} - \dfrac{2}{x + 3} = \dfrac{3(x + 3) - 2(x - 2)}{(x - 2)(x + 3)} = \dfrac{3x + 9 - 2x + 4}{(x - 2)(x + 3)} = \dfrac{x + 13}{(x - 2)(x + 3)}$.`, sol: 'Write both fractions over the LCM and subtract the numerators.', scheme: [['LCM (x - 2)(x + 3)', 1], ['3(x + 3) - 2(x - 2) over the LCM', 1], ['(x + 13)/((x - 2)(x + 3))', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(numEq((x) => 3 / (x - 2) - 2 / (x + 3), (x) => (x + 13) / ((x - 2) * (x + 3)), [[-9], [-5], [-1], [0], [1], [4], [8]]), 'difference'); Cx.model([3, 2, 9, 4, 13]); });

// =============================================================== long answer, 5 marks
{
  const x = 8, y = 5, parts = [x * x, x * y, x * y, y * y], total = parts.reduce((s, v) => s + v, 0);
  Q('l01', mk.long({ stem: r`A square garden in Bhopal has side $(x + y)$ metres. It is divided into a square of side $x$, a square of side $y$ and two rectangles $x$ by $y$. (a) Write the area of each part. (b) Write the area of the whole garden in two ways and state the identity. (c) For $x = 8$ and $y = 5$, find the area of each part and the total, and check against $(x + y)^2$. (d) Use $(x + y)^2$ and the value of $4xy$ to find $(x - y)^2$ for these values. (e) Verify your answer to (d) directly.`, model: r`**(a)** $x^2$, $y^2$, $xy$ and $xy$.\n\n**(b)** Whole garden: $(x + y)^2$. Sum of parts: $x^2 + xy + xy + y^2 = x^2 + 2xy + y^2$. So $(x + y)^2 = x^2 + 2xy + y^2$.\n\n**(c)** The parts are $64$, $40$, $40$ and $25$, and their total is $169$. Also $(8 + 5)^2 = 13^2 = 169$.\n\n**(d)** $(x - y)^2 = (x + y)^2 - 4xy = 169 - 4 \times 40 = 169 - 160 = 9$.\n\n**(e)** Directly, $(8 - 5)^2 = 3^2 = 9$.`, sol: 'Add the four areas; use (x - y)^2 = (x + y)^2 - 4xy.', scheme: [['(a) four areas', 1], ['(b) the identity from the two ways', 1], ['(c) 64, 40, 40, 25 and total 169', 1], ['(d) 169 - 160 = 9', 1], ['(e) direct check 9', 1]], d: 3, c: 'application', t: [1], time: 420 }), (Cx) => { Cx.assert(parts.join() === '64,40,40,25' && total === 169 && (x + y) ** 2 === 169 && (x - y) ** 2 === (x + y) ** 2 - 4 * x * y && (x - y) ** 2 === 9, 'areas, 169 and 9'); Cx.model([64, 40, 25, 169, 160, 9]); });
}
{
  const a = 6, b = 2, V = [a ** 3, a * a * b, a * b * b, b ** 3], total = V[0] + 3 * V[1] + 3 * V[2] + V[3], cube = pmul(pmul([2, 3], [2, 3]), [2, 3]);
  Q('l02', mk.long({ stem: r`A cube of side $(a + b)$ cm, with $a = 6$ and $b = 2$, is cut into $8$ blocks: one $a \times a \times a$, three $a \times a \times b$, three $a \times b \times b$ and one $b \times b \times b$. (a) Find the volume of each kind of block. (b) Add the volumes and compare with $(a + b)^3$. (c) Write the identity for $(a + b)^3$. (d) Expand $(2x + 3)^3$. (e) Check your expansion for $x = 2$.`, model: r`**(a)** $a^3 = 216$, $a^2b = 36 \times 2 = 72$, $ab^2 = 6 \times 4 = 24$ and $b^3 = 8$ (cubic centimetres).\n\n**(b)** Total $= 216 + 3 \times 72 + 3 \times 24 + 8 = 216 + 216 + 72 + 8 = 512$, and $(6 + 2)^3 = 8^3 = 512$.\n\n**(c)** $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.\n\n**(d)** With $a = 2x$ and $b = 3$: $(2x)^3 + 3(2x)^2(3) + 3(2x)(3)^2 + 3^3 = 8x^3 + 36x^2 + 54x + 27$.\n\n**(e)** For $x = 2$: $(4 + 3)^3 = 343$ and $8 \times 8 + 36 \times 4 + 54 \times 2 + 27 = 64 + 144 + 108 + 27 = 343$.`, sol: 'Count the blocks of each kind and use the identity with a = 2x, b = 3.', scheme: [['(a) 216, 72, 24 and 8', 1], ['(b) total 512 = 8^3', 1], ['(c) the identity', 1], ['(d) 8x^3 + 36x^2 + 54x + 27', 1.5], ['(e) 343 on both sides', 0.5]], d: 3, c: 'application', t: [1], time: 450 }), (Cx) => { Cx.assert(V.join() === '216,72,24,8' && total === 512 && (a + b) ** 3 === 512 && cube.join() === '8,36,54,27' && (2 * 2 + 3) ** 3 === 343 && 64 + 144 + 108 + 27 === 343, 'blocks, 512, expansion'); Cx.model([216, 72, 24, 8, 512, 36, 54, 27, 343]); });
}
{
  const c = pmul([2, -3], [1, 4]);
  Q('l03', mk.long({ stem: r`Factorise each expression. (a) $25p^2 - 36q^2$ (b) $9x^2 - 42x + 49$ (c) $2x^2 + 5x - 12$ (d) $125a^3 - 8$ (e) Check your answer to (c) by putting $x = 2$ in both forms.`, model: r`**(a)** $25p^2 - 36q^2 = (5p)^2 - (6q)^2 = (5p - 6q)(5p + 6q)$.\n\n**(b)** $9x^2 - 42x + 49 = (3x)^2 - 2(3x)(7) + 7^2 = (3x - 7)^2$.\n\n**(c)** $2 \times (-12) = -24$; the numbers $8$ and $-3$ have product $-24$ and sum $5$. So $2x^2 + 8x - 3x - 12 = 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4)$.\n\n**(d)** $125a^3 - 8 = (5a)^3 - 2^3 = (5a - 2)(25a^2 + 10a + 4)$.\n\n**(e)** At $x = 2$: $2 \times 4 + 5 \times 2 - 12 = 6$ and $(2 \times 2 - 3)(2 + 4) = 1 \times 6 = 6$.`, sol: 'Difference of squares, perfect square, splitting the middle term, difference of cubes.', scheme: [['(a) (5p - 6q)(5p + 6q)', 1], ['(b) (3x - 7)^2', 1], ['(c) (2x - 3)(x + 4)', 1.5], ['(d) (5a - 2)(25a^2 + 10a + 4)', 1], ['(e) both forms give 6', 0.5]], d: 3, c: 'application', t: [2], time: 450 }), (Cx) => { Cx.assert(numEq((p, q) => 25 * p * p - 36 * q * q, (p, q) => (5 * p - 6 * q) * (5 * p + 6 * q), PTS2) && peq(pprod([3, -7], [3, -7]), [9, -42, 49]) && c.join() === '2,5,-12' && 8 * -3 === -24 && 8 + -3 === 5 && numEq((a) => 125 * a ** 3 - 8, (a) => (5 * a - 2) * (25 * a * a + 10 * a + 4), PTS1) && 2 * 4 + 10 - 12 === 6 && (2 * 2 - 3) * (2 + 4) === 6, 'all four factorisations'); Cx.model([5, 6, 3, 7, 24, 8, 12, 2, 25, 10, 4, 6]); });
}
{
  const f = (x) => 2 / (x - 3) + 5 / (x + 3), g = (x) => (7 * x - 9) / (x * x - 9), h = (x) => (x * x - 36) / (x * x + x - 42), k = (x) => (x + 6) / (x + 7);
  Q('l04', mk.long({ stem: r`(a) Simplify $\dfrac{x^2 - 36}{x^2 + x - 42}$ and state the values of $x$ for which it is not defined. (b) Write $\dfrac{2}{x - 3} + \dfrac{5}{x + 3}$ as a single fraction. (c) Check your answer to (b) at $x = 5$. (d) For which values of $x$ is the fraction in (b) not defined?`, model: r`**(a)** $x^2 - 36 = (x - 6)(x + 6)$ and $x^2 + x - 42 = (x + 7)(x - 6)$, so the fraction is $\dfrac{(x - 6)(x + 6)}{(x + 7)(x - 6)} = \dfrac{x + 6}{x + 7}$ for $x \ne 6$. The original is not defined for $x = 6$ and $x = -7$.\n\n**(b)** The LCM is $(x - 3)(x + 3) = x^2 - 9$. Then $\dfrac{2(x + 3) + 5(x - 3)}{x^2 - 9} = \dfrac{2x + 6 + 5x - 15}{x^2 - 9} = \dfrac{7x - 9}{x^2 - 9}$.\n\n**(c)** At $x = 5$: $\dfrac{2}{2} + \dfrac{5}{8} = 1.625$, and $\dfrac{7 \times 5 - 9}{25 - 9} = \dfrac{26}{16} = 1.625$.\n\n**(d)** The denominators are $0$ when $x = 3$ or $x = -3$, so the fraction is not defined for $x = 3$ and $x = -3$.`, sol: 'Factorise to cancel in (a); use the LCM in (b).', scheme: [['(a) (x + 6)/(x + 7), not defined at 6 and -7', 1.5], ['(b) (7x - 9)/(x^2 - 9)', 1.5], ['(c) 1.625 on both sides', 1], ['(d) x = 3 and x = -3', 1]], d: 3, c: 'application', t: [3], time: 450 }), (Cx) => { Cx.assert(numEq(h, k, [[-9], [-5], [-1], [0], [1], [4], [8]]) && numEq(f, g, [[-9], [-5], [-1], [0], [1], [4], [8]]) && close(f(5), 1.625) && close(g(5), 1.625) && 26 / 16 === 1.625 && range(-10, 10).filter((x) => x * x - 9 === 0).join() === '-3,3', 'simplified forms and 1.625'); Cx.model([6, 7, 36, 42, 9, 15, 1.625, 26, 16, 3]); });
}
{
  const t1 = 15 ** 3 + (-9) ** 3 + (-6) ** 3, s = 47, t3 = 12 * (50 - s);
  Q('l05', mk.long({ stem: r`The identity $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ is true for all numbers. (a) The numbers $15$, $-9$ and $-6$ add up to $0$. Find $15^3 + (-9)^3 + (-6)^3$ without cubing each number. (b) If $a + b + c = 12$ and $a^2 + b^2 + c^2 = 50$, find $ab + bc + ca$. (c) For the same numbers, find $a^3 + b^3 + c^3 - 3abc$. (d) Explain why $a^3 + b^3 + c^3 = 3abc$ whenever $a + b + c = 0$.`, model: r`**(a)** Since $15 - 9 - 6 = 0$, $a^3 + b^3 + c^3 = 3abc = 3 \times 15 \times (-9) \times (-6) = 2430$. Check: $3375 - 729 - 216 = 2430$.\n\n**(b)** $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$, so $144 = 50 + 2(ab + bc + ca)$ and $ab + bc + ca = 47$.\n\n**(c)** $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - (ab + bc + ca)) = 12 \times (50 - 47) = 36$.\n\n**(d)** If $a + b + c = 0$, the first factor of $(a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ is $0$, so the product is $0$. Hence $a^3 + b^3 + c^3 - 3abc = 0$, that is, $a^3 + b^3 + c^3 = 3abc$.`, sol: 'Use the identity; the first factor is the sum of the three numbers.', scheme: [['(a) 3abc = 2430', 1.5], ['(b) squares the sum: 47', 1.5], ['(c) 12 x 3 = 36', 1.5], ['(d) the factor a + b + c is 0', 0.5]], d: 4, c: 'analysis', t: [1], time: 480 }), (Cx) => { Cx.assert(15 - 9 - 6 === 0 && t1 === 2430 && 3 * 15 * -9 * -6 === 2430 && 144 === 50 + 2 * s && t3 === 36 && numEq((a, b, c) => a ** 3 + b ** 3 + c ** 3 - 3 * a * b * c, (a, b, c) => (a + b + c) * (a * a + b * b + c * c - a * b - b * c - c * a), PTS3), '2430, 47, 36'); Cx.model([2430, 3375, 729, 216, 144, 50, 47, 12, 36]); });
}

// =============================================================== case-based
{
  const x = 6, parts = [x * x, 4 * x, 4 * x, 16];
  caseQ('c01', {
    passage: r`A school is paving a square courtyard of side $(x + 4)$ metres. The courtyard is divided into a square of side $x$ metres, two rectangular strips of $x$ metres by $4$ metres, and a small square of side $4$ metres. The builder measured $x = 6$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $100$. (c) (i) $(x + 4)^2 = x^2 + 8x + 16$. Or (ii) $x = 9$.`,
    sol: r`(a) $4 \times 6 = 24$. (b) $(6 + 4)^2 = 100$ square metres. (c) (i) $x^2 + 4x + 4x + 16 = x^2 + 8x + 16$. (ii) $(x + 4)^2 = 169$ gives $x + 4 = 13$ and $x = 9$.`,
    children: [
      child('a', mk.mcq({ stem: 'The area of one rectangular strip, in square metres, is', opts: ['$24$', '$16$', '$36$', '$10$'], key: 'a', sol: r`The strip is $x$ by $4$, so its area is $6 \times 4 = 24$ square metres. The value $16$ is the small square, $36$ is the square of side $x$, and $10$ is the side of the whole courtyard.`, d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the total area of the courtyard, in square metres, for $x = 6$.', value: 100, sol: r`The side is $6 + 4 = 10$ m, so the area is $10^2 = 100$ square metres. (Check: $36 + 24 + 24 + 16 = 100$.)`, scheme: [['Side 10 m', 0.5], ['100 square metres', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Write the area of the courtyard as $x^2 + \ldots$ by adding the four parts, and name the identity.`, model: r`The parts have areas $x^2$, $4x$, $4x$ and $16$, so the total is $x^2 + 8x + 16$. Since the area is also $(x + 4)^2$, this is the identity $(a + b)^2 = a^2 + 2ab + b^2$ with $a = x$ and $b = 4$.`, sol: 'Add the four parts.', scheme: [['x^2 + 8x + 16', 1], ['Names (a + b)^2 with a = x, b = 4', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Another courtyard built the same way has area $169$ square metres. Find $x$.`, model: r`$(x + 4)^2 = 169 = 13^2$, so $x + 4 = 13$ and $x = 9$ (the side cannot be negative).`, sol: 'Take the square root of the area.', scheme: [['(x + 4)^2 = 13^2', 1], ['x = 9', 1]], d: 3, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([parts[1], parts[3], parts[0], 10], 24);
    Cx.child('b').val(parts.reduce((s, v) => s + v, 0));
    Cx.child('c').assert(numEq((u) => (u + 4) ** 2, (u) => u * u + 8 * u + 16, PTS1), '(x + 4)^2 = x^2 + 8x + 16');
    Cx.child('c').model([4, 16, 2]);
    Cx.child('cii').assert(range(0, 40).filter((u) => (u + 4) ** 2 === 169).join() === '9', 'x = 9');
    Cx.child('cii').model([169, 13, 9]);
  });
}
{
  const a = 5, b = 3, V = [a ** 3, a * a * b, a * b * b, b ** 3], total = V[0] + 3 * V[1] + 3 * V[2] + V[3];
  const a2 = 6, V2 = [a2 ** 3, a2 * a2 * b, a2 * b * b, b ** 3], total2 = V2[0] + 3 * V2[1] + 3 * V2[2] + V2[3];
  caseQ('c02', {
    passage: r`A packaging unit in Surat makes cube-shaped boxes of side $(a + b)$ cm. To plan the foam padding, a designer imagines the box as $8$ blocks: one block $a \times a \times a$, three blocks $a \times a \times b$, three blocks $a \times b \times b$ and one block $b \times b \times b$. For one design, $a = 5$ and $b = 3$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $512$. (c) (i) $125 + 225 + 135 + 27 = 512$. Or (ii) $729$.`,
    sol: r`(a) $ab^2 = 5 \times 9 = 45$. (b) $(5 + 3)^3 = 512$. (c) (i) $125 + 3 \times 75 + 3 \times 45 + 27 = 512$. (ii) $a = 6$, $b = 3$: $216 + 3 \times 108 + 3 \times 54 + 27 = 729$.`,
    children: [
      child('a', mk.mcq({ stem: 'The volume of one block of size $a \\times b \\times b$, in cubic centimetres, is', opts: ['$45$', '$75$', '$27$', '$125$'], key: 'a', sol: r`$a \times b \times b = 5 \times 3 \times 3 = 45$. The value $75$ is a block $a \times a \times b$, $27$ is $b^3$ and $125$ is $a^3$.`, d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the volume of the whole box, in cubic centimetres.', value: 512, sol: r`The side is $5 + 3 = 8$ cm, so the volume is $8^3 = 512$ cubic centimetres.`, scheme: [['Side 8 cm', 0.5], ['512 cubic centimetres', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the volume of each kind of block, multiply by the number of blocks of that kind, and show that the total is $512$.`, model: r`$a^3 = 125$; three blocks $a^2b$: $3 \times 75 = 225$; three blocks $ab^2$: $3 \times 45 = 135$; and $b^3 = 27$. The total is $125 + 225 + 135 + 27 = 512$.`, sol: 'Multiply the three edges of each block and add.', scheme: [['Block volumes 125, 75, 45, 27 with the counts', 1], ['Total 512', 1]], d: 3, c: 'application', t: [1], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A larger box has $a = 6$ and $b = 3$. Use $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ to find its volume.`, model: r`$a^3 = 216$, $3a^2b = 3 \times 108 = 324$, $3ab^2 = 3 \times 54 = 162$ and $b^3 = 27$. The volume is $216 + 324 + 162 + 27 = 729$ cubic centimetres, which is $9^3$.`, sol: 'Substitute a = 6 and b = 3 in each term.', scheme: [['The four terms 216, 324, 162, 27', 1], ['729', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([V[2], V[1], V[3], V[0]], 45);
    Cx.child('b').val(total);
    Cx.child('c').assert(V.join() === '125,75,45,27' && total === 512 && 125 + 225 + 135 + 27 === 512, 'total 512');
    Cx.child('c').model([125, 75, 45, 27, 225, 135, 512]);
    Cx.child('cii').assert(V2.join() === '216,108,54,27' && total2 === 729 && 9 ** 3 === 729, 'total 729');
    Cx.child('cii').model([216, 324, 162, 27, 729]);
  });
}
{
  const area = (x) => x * x + 11 * x + 28;
  const opts = [[[1, 4], [1, 7]], [[1, 2], [1, 14]], [[1, 3], [1, 8]], [[1, 1], [1, 28]]];
  const vals = opts.map((fs) => pprod(...fs));
  caseQ('c03', {
    passage: r`A rectangular garden in a society in Indore has area $(x^2 + 11x + 28)$ square metres, where its sides are linear expressions in $x$ (in metres).`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $42$. (c) (i) $x = 13$ and area $340$ square metres. Or (ii) $x = 5$ and area $108$ square metres.`,
    sol: r`(a) $x^2 + 11x + 28 = (x + 4)(x + 7)$. (b) For $x = 5$ the sides are $9$ and $12$, so the perimeter is $2 \times 21 = 42$. (c) (i) $x + 7 = 20$ gives $x = 13$ and the area is $17 \times 20 = 340$. (ii) $x + 4 = 9$ gives $x = 5$ and the area is $9 \times 12 = 108$.`,
    children: [
      child('a', mk.mcq({ stem: 'The sides of the garden are', opts: opts.map((fs) => `$(x + ${fs[0][1]})$ and $(x + ${fs[1][1]})$`), key: 'a', sol: r`We need two numbers with sum $11$ and product $28$: they are $4$ and $7$. So the sides are $(x + 4)$ and $(x + 7)$. The pair $3, 8$ has product $24$, the pair $2, 14$ has sum $16$ and the pair $1, 28$ has sum $29$.`, d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'Find the perimeter of the garden, in metres, when $x = 5$.', value: 42, sol: r`The sides are $5 + 4 = 9$ m and $5 + 7 = 12$ m, so the perimeter is $2 \times (9 + 12) = 42$ m.`, scheme: [['Sides 9 m and 12 m', 0.5], ['42 m', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** The longer side of the garden is $20$ m. Find $x$ and the area of the garden.`, model: r`The longer side is $x + 7 = 20$, so $x = 13$. The other side is $x + 4 = 17$ m, and the area is $17 \times 20 = 340$ square metres. (Check: $169 + 143 + 28 = 340$.)`, sol: 'Use the longer factor x + 7.', scheme: [['x = 13', 1], ['Area 340 square metres', 1]], d: 3, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The shorter side of the garden is $9$ m. Find $x$ and the area of the garden.`, model: r`The shorter side is $x + 4 = 9$, so $x = 5$. The other side is $x + 7 = 12$ m, and the area is $9 \times 12 = 108$ square metres. (Check: $25 + 55 + 28 = 108$.)`, sol: 'Use the shorter factor x + 4.', scheme: [['x = 5', 1], ['Area 108 square metres', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(vals, [1, 11, 28]);
    Cx.child('b').val(2 * (9 + 12));
    Cx.child('c').assert(area(13) === 340 && (13 + 4) * (13 + 7) === 340 && 169 + 143 + 28 === 340, 'x = 13, 340');
    Cx.child('c').model([13, 17, 20, 340, 169, 143, 28]);
    Cx.child('cii').assert(area(5) === 108 && 9 * 12 === 108 && 25 + 55 + 28 === 108, 'x = 5, 108');
    Cx.child('cii').model([5, 12, 9, 108, 25, 55, 28]);
  });
}
{
  const t = (x) => 36 / x + 36 / (x + 3), g = (x) => (36 * (2 * x + 3)) / (x * (x + 3)), dff = (x) => 36 / x - 36 / (x + 3), g2 = (x) => 108 / (x * (x + 3));
  const bad = range(-10, 10).filter((x) => x * (x + 3) === 0);
  caseQ('c04', {
    passage: r`Priya cycles $36$ km to a village in Nashik district at $x$ km per hour and comes back by the same road at $(x + 3)$ km per hour, because the wind helps her on the return. Her time for the outward trip is $\dfrac{36}{x}$ hours and for the return trip is $\dfrac{36}{x + 3}$ hours.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $7$. (c) (i) $\dfrac{36(2x + 3)}{x(x + 3)}$. Or (ii) $\dfrac{108}{x(x + 3)}$.`,
    sol: r`(a) The denominators must not be zero: $x \ne 0$ and $x \ne -3$. (b) $\dfrac{36}{9} + \dfrac{36}{12} = 4 + 3 = 7$. (c) (i) LCM $x(x + 3)$: $\dfrac{36(x + 3) + 36x}{x(x + 3)} = \dfrac{36(2x + 3)}{x(x + 3)}$. (ii) $\dfrac{36(x + 3) - 36x}{x(x + 3)} = \dfrac{108}{x(x + 3)}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The expression for the total time is not defined for', opts: [r`$x = 0$ and $x = -3$`, r`$x = 3$ only`, r`$x = 0$ only`, r`$x = -3$ only`], key: 'a', sol: r`The denominators $x$ and $x + 3$ must not be $0$, so $x \ne 0$ and $x \ne -3$. Each of the other options leaves out a value or has the wrong sign.`, d: 2, c: 'understanding', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the total time, in hours, when $x = 9$.', value: 7, sol: r`Outward: $\dfrac{36}{9} = 4$ hours. Return: $\dfrac{36}{12} = 3$ hours. Total: $4 + 3 = 7$ hours.`, scheme: [['4 hours and 3 hours', 0.5], ['7 hours', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Write the total time $\dfrac{36}{x} + \dfrac{36}{x + 3}$ as a single fraction.`, model: r`The LCM is $x(x + 3)$, so the total is $\dfrac{36(x + 3) + 36x}{x(x + 3)} = \dfrac{72x + 108}{x(x + 3)} = \dfrac{36(2x + 3)}{x(x + 3)}$. For $x = 9$ this is $\dfrac{36 \times 21}{108} = 7$, which matches.`, sol: 'Use the LCM x(x + 3) and add the numerators.', scheme: [['LCM and numerators 36(x + 3) + 36x', 1], ['36(2x + 3)/(x(x + 3)) with the check', 1]], d: 3, c: 'application', t: [3], time: 120 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Write the difference between the outward and return times, $\dfrac{36}{x} - \dfrac{36}{x + 3}$, as a single fraction, and find its value for $x = 9$.`, model: r`$\dfrac{36(x + 3) - 36x}{x(x + 3)} = \dfrac{108}{x(x + 3)}$. For $x = 9$ this is $\dfrac{108}{9 \times 12} = 1$ hour, matching $4 - 3 = 1$.`, sol: 'Use the LCM x(x + 3) and subtract the numerators.', scheme: [['108/(x(x + 3))', 1], ['1 hour at x = 9', 1]], d: 3, c: 'application', t: [3], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([[-3, 0], [3], [0], [-3]], bad);
    Cx.child('b').val(t(9));
    Cx.child('c').assert(numEq(t, g, [[1], [2], [5], [9], [12], [-1], [-7]]) && t(9) === 7, 'single fraction');
    Cx.child('c').model([36, 3, 72, 108, 21, 7]);
    Cx.child('cii').assert(numEq(dff, g2, [[1], [2], [5], [9], [12], [-1], [-7]]) && dff(9) === 1, '108 over x(x + 3)');
    Cx.child('cii').model([108, 9, 12, 1]);
  });
}

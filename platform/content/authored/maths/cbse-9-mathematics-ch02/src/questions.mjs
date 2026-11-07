// CBSE 9 Mathematics ch02 Introduction to Polynomials: objective items (mcq, assertion-reason, true-false, fill-blank, match, numerical)
// with independent re-solve checks. Values, remainders, quotients and zeroes come from exact-fraction polynomial arithmetic (pm.mjs);
// every remainder is cross-checked against the long-division remainder, and every factor claim by multiplying back.
import { Q, mk, topic } from './lib.mjs';
import { r, F, P, deg, padd, pmul, peq, peval, pdivmod, ptex, ratRoots, fromRoots } from './pm.mjs';

export { r };
const BLOOM = { recall: 'remember', understanding: 'understand', application: 'apply', analysis: 'analyze', evaluation: 'evaluate' };
const $ = (s) => `$${s}$`;
const val = (p, a) => peval(p, F(a)).num();

/** A 2-mark match item (four pairs); order[i] = index of the right item paired with left i. */
function matchQ(o) {
  const L = 'pqrs';
  const pairs = o.left.map((_, i) => ({ left_id: String(i + 1), right_id: L[o.order[i]] }));
  return {
    type: 'match', stem_md: o.stem,
    options: o.left.map((text_md, i) => ({ id: String(i + 1), text_md })),
    match_right: o.right.map((text_md, i) => ({ id: L[i], text_md })),
    answer: { pairs }, solution_md: o.sol,
    marking_scheme: pairs.map((p) => ({ step: `${p.left_id} paired with ${p.right_id}`, marks: 0.5 })),
    marks: 2, difficulty: o.d, competency: o.c, bloom: BLOOM[o.c], topic_ids: o.t.map(topic), expected_time_sec: 150, assets: [],
  };
}
const validTerms = (exps) => exps.every((e) => Number.isInteger(e) && e >= 0);

// =============================================================== MCQ (practice and tests: m01-m14)
{
  const sets = [[3, 1, 0], [2, -1], [0.5, 1], [-2, 1]];
  Q('m01', mk.mcq({ stem: r`A school quiz shows four expressions in $x$. Which one is a polynomial in $x$?`, opts: [$(r`5x^{3} - 2x + 7`), $(r`x^{2} + \dfrac{3}{x}`), $(r`\sqrt{x} + 4x`), $(r`x^{-2} + 4x`)], key: 'a', sol: r`In a polynomial every power of $x$ is a whole number ($0, 1, 2, \ldots$). In $5x^{3} - 2x + 7$ the powers are $3$, $1$ and $0$. The term $\dfrac{3}{x} = 3x^{-1}$ and the term $x^{-2}$ have negative powers, and $\sqrt{x} = x^{\frac{1}{2}}$ has a fractional power.`, d: 1, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.which(sets.map((s) => (validTerms(s) ? 1 : 0)), 1); });
}
{
  const p = P(1, 0, -4, -3, 0, 7);
  Q('m02', mk.mcq({ stem: r`On Meera’s algebra worksheet, the degree of the polynomial $7 - 3x^{2} + x^{5} - 4x^{3}$ is`, opts: ['$5$', '$7$', '$4$', '$3$'], key: 'a', sol: r`The degree is the highest power of $x$ present. The powers are $0$, $2$, $5$ and $3$, so the degree is $5$. The number $7$ is the constant term, not the degree, and $3$ is the highest power only of the $x^{3}$ term.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(deg(p) === 5, 'degree 5'); Cx.which([5, 7, 4, 3], deg(p)); });
}
{
  const p = P(4, 0, 9);
  Q('m03', mk.mcq({ stem: r`The polynomial $4x^{2} + 9$ is called a`, opts: ['quadratic binomial', 'linear binomial', 'quadratic trinomial', 'cubic binomial'], key: 'a', sol: r`It has two terms, $4x^{2}$ and $9$, so it is a binomial. Its highest power is $2$, so its degree is $2$ and it is quadratic.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(deg(p) === 2 && p.filter((c) => c.n !== 0).length === 2, 'quadratic binomial'); Cx.key('a'); });
}
{
  const p = P(5, -7, 2, -11), c2 = p[p.length - 3];
  Q('m04', mk.mcq({ stem: r`In the polynomial $5x^{3} - 7x^{2} + 2x - 11$, the coefficient of $x^{2}$ is`, opts: ['$-7$', '$7$', '$2$', '$5$'], key: 'a', sol: r`The coefficient is the number multiplying $x^{2}$, including its sign: the term is $-7x^{2}$, so the coefficient is $-7$. The value $7$ drops the sign, $2$ goes with $x$ and $5$ with $x^{3}$.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.which([-7, 7, 2, 5], c2.num()); });
}
{
  const p = P(2, -1, 4, -7);
  Q('m05', mk.mcq({ stem: r`If $p(x) = 2x^{3} - x^{2} + 4x - 7$, then $p(-2)$ equals`, opts: ['$-35$', '$13$', '$-13$', '$-14$'], key: 'a', sol: r`$p(-2) = 2(-2)^{3} - (-2)^{2} + 4(-2) - 7 = -16 - 4 - 8 - 7 = -35$. The value $13$ is $p(2)$, $-13$ is its negative, and $-14$ is $p(-1)$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.which([val(p, -2), val(p, 2), -val(p, 2), val(p, -1)], -35); });
}
{
  const p = P(7, 4), z = F(-4, 7);
  Q('m06', mk.mcq({ stem: r`A robot on a number-line track stops where $7x + 4$ becomes zero. That zero of the linear polynomial $7x + 4$ is`, opts: [r`$-\dfrac{4}{7}$`, r`$\dfrac{4}{7}$`, r`$-\dfrac{7}{4}$`, r`$\dfrac{7}{4}$`], key: 'a', sol: r`A zero is a value of $x$ that makes the polynomial $0$: $7x + 4 = 0$ gives $x = -\dfrac{4}{7}$. The other options change the sign or turn the fraction upside down.`, d: 1, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(peval(p, z).n === 0, 'p(-4/7) = 0'); Cx.which([-4 / 7, 4 / 7, -7 / 4, 7 / 4], z.num()); });
}
{
  const ok = (k) => peval(P(3, -k, 1, -14), F(2)).n === 0;
  Q('m07', mk.mcq({ stem: r`The number $2$ is a zero of $3x^{3} - kx^{2} + x - 14$. The value of $k$ is`, opts: ['$3$', '$12$', '$4$', '$-3$'], key: 'a', sol: r`Put $x = 2$: $3(8) - k(4) + 2 - 14 = 0$, that is $12 - 4k = 0$, so $k = 3$. The value $12$ is the constant $24 + 2 - 14$ left before dividing by $4$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.which([3, 12, 4, -3].map((k) => (ok(k) ? 1 : 0)), 1); });
}
{
  const p = P(1, 1, -12), opts = [3, 4, -3, 2];
  Q('m08', mk.mcq({ stem: r`Which of these numbers is a zero of $x^{2} + x - 12$?`, opts: ['$3$', '$4$', '$-3$', '$2$'], key: 'a', sol: r`$p(3) = 9 + 3 - 12 = 0$, so $3$ is a zero. $p(4) = 8$, $p(-3) = -6$ and $p(2) = -6$, none of which is $0$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.which(opts.map((x) => (peval(p, F(x)).n === 0 ? 1 : 0)), 1); });
}
{
  Q('m09', mk.mcq({ stem: r`A cubic polynomial can have at most how many zeroes?`, opts: ['$3$', '$2$', '$1$', '$4$'], key: 'a', sol: r`A polynomial of degree $n$ has at most $n$ zeroes. A cubic has degree $3$, so it has at most $3$ zeroes, though it can have fewer, as $x^{3}$ has only the zero $0$.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(ratRoots(P(1, -6, 11, -6)).length === 3 && deg(P(1, 2, 3, 4)) === 3, 'a cubic with three zeroes; none with four'); Cx.which([3, 2, 1, 4], 3); });
}
{
  const p = P(1, 3, -5, 4), rem = pdivmod(p, P(1, -2)).r[0];
  Q('m10', mk.mcq({ stem: r`Arjun checks his long division with the remainder theorem. The remainder he should get when $p(x) = x^{3} + 3x^{2} - 5x + 4$ is divided by $x - 2$ is`, opts: ['$14$', '$18$', '$3$', '$4$'], key: 'a', sol: r`By the remainder theorem the remainder is $p(2) = 8 + 12 - 10 + 4 = 14$. The value $18$ is $p(-2)$, $3$ is $p(1)$ and $4$ is $p(0)$.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(rem.eq(F(14)), 'remainder 14 by long division'); Cx.which([val(p, 2), val(p, -2), val(p, 1), val(p, 0)], rem.num()); });
}
{
  const p = P(2, -5, 3, 6), rem = pdivmod(p, P(2, 1)).r[0];
  Q('m11', mk.mcq({ stem: r`In a class quiz at Dehradun, a team divides $2x^{3} - 5x^{2} + 3x + 6$ by $2x + 1$. The remainder they should report is`, opts: ['$3$', r`$\dfrac{13}{2}$`, '$-4$', '$8$'], key: 'a', sol: r`The divisor $2x + 1$ is zero at $x = -\dfrac{1}{2}$, so the remainder is $p\left(-\dfrac{1}{2}\right) = -\dfrac{1}{4} - \dfrac{5}{4} - \dfrac{3}{2} + 6 = 3$. Using $x = \dfrac{1}{2}$ gives $\dfrac{13}{2}$, $x = -1$ gives $-4$ and $x = 2$ gives $8$.`, d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(rem.eq(F(3)) && peval(p, F(-1, 2)).eq(F(3)), 'remainder 3'); Cx.which([peval(p, F(-1, 2)).num(), peval(p, F(1, 2)).num(), val(p, -1), val(p, 2)], 3); });
}
{
  const ok = (k) => peval(P(1, 4, k, 6), F(-1)).n === 0;
  Q('m12', mk.mcq({ stem: r`For $x + 1$ to be a factor of $x^{3} + 4x^{2} + kx + 6$, the value of $k$ must be`, opts: ['$9$', '$-9$', '$3$', '$7$'], key: 'a', sol: r`By the factor theorem $p(-1) = 0$: $-1 + 4 - k + 6 = 0$, so $9 - k = 0$ and $k = 9$. The value $-9$ comes from solving $9 + k = 0$ by mistake.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.which([9, -9, 3, 7].map((k) => (ok(k) ? 1 : 0)), 1); });
}
{
  const p = P(1, -3, -10, 24), cand = [2, -2, 3, -4];
  Q('m13', mk.mcq({ stem: r`Sana tries the factor theorem on $x^{3} - 3x^{2} - 10x + 24$. Which binomial below turns out to be a factor of it?`, opts: ['$x - 2$', '$x + 2$', '$x - 3$', '$x + 4$'], key: 'a', sol: r`Test $p(a)$ for each option. $p(2) = 8 - 12 - 20 + 24 = 0$, so $x - 2$ is a factor. $p(-2) = 24$, $p(3) = -6$ and $p(-4) = -48$ are not zero.`, d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.which(cand.map((a) => (peval(p, F(a)).n === 0 ? 1 : 0)), 1); });
}
{
  const p = P(1, -4, -7, 10), good = P(1, 1, -2), cands = [good, P(1, -1, -2), P(1, 1, 2), P(1, -9, 38)];
  Q('m14', mk.mcq({ stem: r`Dividing $x^{3} - 4x^{2} - 7x + 10$ by $x - 5$ leaves no remainder. The quotient is`, opts: [$(r`x^{2} + x - 2`), $(r`x^{2} - x - 2`), $(r`x^{2} + x + 2`), $(r`x^{2} - 9x + 38`)], key: 'a', sol: r`$p(5) = 125 - 100 - 35 + 10 = 0$, so $x - 5$ is a factor. Dividing, $x^{3} - 4x^{2} - 7x + 10 = (x - 5)(x^{2} + x - 2)$, because $(x - 5)(x^{2} + x - 2) = x^{3} + x^{2} - 2x - 5x^{2} - 5x + 10$. The other options do not multiply back to $p(x)$.`, d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(pdivmod(p, P(1, -5)).r[0].n === 0 && peq(pdivmod(p, P(1, -5)).q, good), 'exact quotient'); Cx.which(cands.map((c) => (peq(pmul(c, P(1, -5)), p) ? 1 : 0)), 1); });
}

// =============================================================== MCQ for the check slides (m15-m20, in no test)
{
  const sets = [3, 1, 2, 1];
  Q('m15', mk.mcq({ stem: r`Which one of these polynomials is a trinomial?`, opts: [$(r`3x^{2} - 2x + 1`), $(r`7x^{3}`), $(r`x^{4} - x`), '$5$'], key: 'a', sol: r`A trinomial has exactly three terms. $3x^{2} - 2x + 1$ has three, $7x^{3}$ has one (a monomial), $x^{4} - x$ has two (a binomial) and $5$ has one (a constant).`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.which(sets.map((n) => (n === 3 ? 1 : 0)), 1); });
}
{
  const p = P(1, -3, 1);
  Q('m16', mk.mcq({ stem: r`If $p(x) = x^{2} - 3x + 1$, then $p(3)$ equals`, opts: ['$1$', '$19$', '$5$', '$-1$'], key: 'a', sol: r`$p(3) = 3^{2} - 3(3) + 1 = 9 - 9 + 1 = 1$. The value $19$ is $p(-3)$, $5$ is $p(-1)$ and $-1$ is $p(1)$.`, d: 1, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.which([val(p, 3), val(p, -3), val(p, -1), val(p, 1)], 1); });
}
{
  const p = P(2, -9), z = F(9, 2);
  Q('m17', mk.mcq({ stem: r`The zero of the polynomial $2x - 9$ is`, opts: [r`$\dfrac{9}{2}$`, r`$-\dfrac{9}{2}$`, r`$\dfrac{2}{9}$`, '$9$'], key: 'a', sol: r`$2x - 9 = 0$ gives $2x = 9$, so $x = \dfrac{9}{2}$. The negative value has the wrong sign, and $\dfrac{2}{9}$ is the fraction upside down.`, d: 1, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(peval(p, z).n === 0, 'zero 9/2'); Cx.which([4.5, -4.5, 2 / 9, 9], 4.5); });
}
{
  const p = P(1, -2, 3, 5), rem = pdivmod(p, P(1, 1)).r[0];
  Q('m18', mk.mcq({ stem: r`Without dividing, Kabir uses $p(-1)$ to find what is left over when $x^{3} - 2x^{2} + 3x + 5$ is divided by $x + 1$. That leftover value is`, opts: ['$-1$', '$1$', '$7$', '$5$'], key: 'a', sol: r`The remainder is $p(-1) = -1 - 2 - 3 + 5 = -1$. The value $1$ has the sign wrong, $7$ is $p(1)$ and $5$ is $p(0)$.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(rem.eq(F(-1)), '-1'); Cx.which([val(p, -1), 1, val(p, 1), val(p, 0)], rem.num()); });
}
{
  const ok = (k) => peval(P(1, k, -21), F(3)).n === 0;
  Q('m19', mk.mcq({ stem: r`A puzzle card says that $x - 3$ divides $x^{2} + kx - 21$ exactly. The missing coefficient $k$ on the card equals`, opts: ['$4$', '$-4$', '$12$', '$7$'], key: 'a', sol: r`By the factor theorem $p(3) = 0$: $9 + 3k - 21 = 0$, so $3k = 12$ and $k = 4$. The value $12$ is $3k$ before dividing by $3$.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.which([4, -4, 12, 7].map((k) => (ok(k) ? 1 : 0)), 1); });
}
{
  const p = P(2, 5, -3), roots = [-3, 3, -0.5, -1].map((a) => F(Math.round(a * 2), 2));
  Q('m20', mk.mcq({ stem: r`A quadratic $2x^{2} + 5x - 3$ is written on the Nagpur maths-club board. Members test four binomials; which one divides it exactly?`, opts: ['$x + 3$', '$x - 3$', '$2x + 1$', '$x + 1$'], key: 'a', sol: r`The factor $x + 3$ goes with the zero $-3$: $p(-3) = 18 - 15 - 3 = 0$. The factor $x - 3$ needs $p(3) = 30$, $2x + 1$ needs $p\left(-\dfrac{1}{2}\right) = -5$, and $x + 1$ needs $p(-1) = -6$, none of which is $0$.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.which([F(-3), F(3), F(-1, 2), F(-1)].map((a) => (peval(p, a).n === 0 ? 1 : 0)), 1); void roots; });
}

// =============================================================== assertion-reason
{
  Q('ar1', mk.ar({ a: r`The expression $\sqrt{x} + 2$ is not a polynomial in $x$.`, r: r`In a polynomial in $x$, every power of $x$ must be a whole number.`, key: 'a', sol: r`$\sqrt{x} = x^{\frac{1}{2}}$ has the power $\dfrac{1}{2}$, which is not a whole number, so A is true. R is the rule that decides it.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(!validTerms([0.5, 0]), 'power 1/2 is not a whole number'); Cx.key('a'); });
}
{
  Q('ar2', mk.ar({ a: r`The polynomial $7$ has degree $0$.`, r: r`$7 = 7x^{0}$, so the highest power of $x$ in it is $0$.`, key: 'a', sol: r`A non-zero constant can be written $7x^{0}$, whose highest power of $x$ is $0$. So A is true and R gives the reason.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(deg(P(7)) === 0, 'degree 0'); Cx.key('a'); });
}
{
  const cnt = (p) => [...Array(21).keys()].map((k) => k - 10).filter((x) => peval(p, F(x)).n === 0).length;
  Q('ar3', mk.ar({ a: r`A cubic polynomial has exactly three zeroes.`, r: r`A polynomial of degree $n$ has at most $n$ zeroes.`, key: 'd', sol: r`R is true. But A is false: the cubic $x^{3}$ has only the zero $0$, and $x^{3} + x$ also has only the zero $0$ among real numbers. A cubic has at most three zeroes, not always exactly three.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(cnt(P(1, 0, 0, 0)) === 1 && cnt(P(1, -1, -4, 4)) === 3, 'x^3 has one zero, while x^3 - x^2 - 4x + 4 has three'); Cx.key('d'); });
}
{
  const p = P(1, -4, 0, 1);
  Q('ar4', mk.ar({ a: r`When $x^{3} - 4x^{2} + 1$ is divided by $x - 2$, the remainder is $-7$.`, r: r`When $p(x)$ is divided by $x - a$, the remainder is $p(-a)$.`, key: 'c', sol: r`$p(2) = 8 - 16 + 1 = -7$, so A is true. R is false: the remainder is $p(a)$, not $p(-a)$. Here $p(-2) = -8 - 16 + 1 = -23$ is a different number.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(pdivmod(p, P(1, -2)).r[0].eq(F(-7)) && peval(p, F(-2)).eq(F(-23)), 'remainder is p(2) = -7, not p(-2)'); Cx.key('c'); });
}
{
  Q('ar5', mk.ar({ a: r`$x - 1$ is a factor of $x^{4} - 1$.`, r: r`Every polynomial divided by a linear polynomial leaves a constant remainder.`, key: 'b', sol: r`$p(1) = 1 - 1 = 0$, so by the factor theorem $x - 1$ is a factor and A is true. R is also true, since the remainder has degree less than $1$, but it does not explain A: a factor needs the remainder to be $0$, not just constant.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(peval(P(1, 0, 0, 0, -1), F(1)).n === 0, 'p(1) = 0'); Cx.key('b'); });
}
{
  Q('ar6', mk.ar({ a: r`$x + 1$ is a factor of $x^{2} + x + 1$.`, r: r`If $p(-1) = 0$, then $x + 1$ is a factor of $p(x)$.`, key: 'd', sol: r`R is the factor theorem for $a = -1$, so R is true. For $p(x) = x^{2} + x + 1$, $p(-1) = 1 - 1 + 1 = 1 \neq 0$, so $x + 1$ is not a factor and A is false.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(peval(P(1, 1, 1), F(-1)).eq(F(1)), 'p(-1) = 1'); Cx.key('d'); });
}

// =============================================================== true-false
{
  Q('tf1', mk.tf({ stem: r`The expression $x^{2} + 2x + \dfrac{1}{x}$ is a polynomial in $x$.`, key: 'f', sol: r`The last term is $\dfrac{1}{x} = x^{-1}$, which has a negative power of $x$. A polynomial allows only whole-number powers, so the expression is not a polynomial.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(!validTerms([2, 1, -1]), 'negative power'); Cx.key('f'); });
}
{
  const p = P(2, 1, -13, 6);
  Q('tf2', mk.tf({ stem: r`The number $-2$ is a zero of $2x^{3} + x^{2} - 13x + 6$.`, key: 'f', sol: r`$p(-2) = 2(-8) + 4 + 26 + 6 = 20$, which is not $0$, so $-2$ is not a zero. (The zeroes are $-3$, $\dfrac{1}{2}$ and $2$.)`, d: 2, c: 'application', t: [1] }), (Cx) => { Cx.assert(peval(p, F(-2)).eq(F(20)) && ratRoots(p).map(String).join() === '-3,1/2,2', 'p(-2) = 20; zeroes -3, 1/2, 2'); Cx.key('f'); });
}
{
  const p = P(1, -2, -3, 6), d = pdivmod(p, P(1, -4));
  Q('tf3', mk.tf({ stem: r`If a polynomial $p(x)$ leaves remainder $0$ when divided by $x - 4$, then $p(4) = 0$.`, key: 't', sol: r`By the remainder theorem the remainder on dividing by $x - 4$ is $p(4)$. A remainder of $0$ therefore means $p(4) = 0$, and $x - 4$ is a factor.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { const q = pmul(P(1, -4), d.q); Cx.assert(peq(padd(q, d.r), p) && peval(p, F(4)).eq(d.r[0]), 'p(4) equals the remainder'); Cx.key('t'); });
}

// =============================================================== fill in the blank
{
  Q('fb1', mk.fill({ stem: r`Rearranged from the highest power down, $3x^{2} - 8x^{6} + 2x - 1$ starts with a term whose power gives its degree, which is ____.`, acc: [['6']], sol: r`The powers of $x$ are $2$, $6$ and $1$, and the highest is $6$, so the degree is 6.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(deg(P(-8, 0, 0, 0, 3, 2, -1)) === 6, '6'); Cx.blank(6); });
}
{
  const p = P(1, 0, -5, 9), rem = pdivmod(p, P(1, -2)).r[0];
  Q('fb2', mk.fill({ stem: r`Putting $x = 2$ into $x^{3} - 5x + 9$ gives the leftover on dividing it by $x - 2$, namely ____.`, acc: [['7']], sol: r`The remainder is $p(2) = 8 - 10 + 9 = 7$, that is 7.`, d: 2, c: 'application', t: [2] }), (Cx) => { Cx.assert(rem.eq(F(7)), '7'); Cx.blank(7); });
}
{
  const ks = [...Array(41).keys()].map((k) => k - 20).filter((k) => peval(P(1, k, -10), F(-2)).n === 0);
  Q('fb3', mk.fill({ stem: r`For $x^{2} + kx - 10$ to vanish at $x = -2$ (so that $x + 2$ is a factor), the coefficient must be $k = $ ____.`, acc: [['-3', '−3']], sol: r`$p(-2) = 4 - 2k - 10 = 0$ gives $-2k = 6$, so $k = -3$.`, d: 2, c: 'application', t: [2] }), (Cx) => { Cx.assert(ks.join() === '-3', 'k = -3'); Cx.blank(-3); });
}

// =============================================================== match
{
  Q('ma1', matchQ({ stem: 'Match each polynomial in Column I with its name by degree in Column II.', left: [$('4x - 7'), $('x^{2} - 9'), $('2x^{3} + x'), '$6$'], right: ['cubic polynomial', 'constant polynomial', 'linear polynomial', 'quadratic polynomial'], order: [2, 3, 0, 1], sol: r`The degree is the highest power of $x$. $4x - 7$ has degree $1$, so it is linear. $x^{2} - 9$ has degree $2$, so it is quadratic. $2x^{3} + x$ has degree $3$, so it is cubic. The number $6$ is a constant polynomial.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert([P(4, -7), P(1, 0, -9), P(2, 0, 1, 0), P(6)].map(deg).join() === '1,2,3,0', 'degrees 1, 2, 3, 0'); });
}
{
  const p = P(1, 0, -2, 3), rs = [1, -1, 2, -2].map((a) => peval(p, F(a)).num());
  Q('ma2', matchQ({ stem: r`For $p(x) = x^{3} - 2x + 3$, match each division in Column I with its remainder in Column II.`, left: [r`$p(x) \div (x - 1)$`, r`$p(x) \div (x + 1)$`, r`$p(x) \div (x - 2)$`, r`$p(x) \div (x + 2)$`], right: ['$7$', '$-1$', '$2$', '$4$'], order: [2, 3, 0, 1], sol: r`By the remainder theorem the remainders are $p(1) = 1 - 2 + 3 = 2$, $p(-1) = -1 + 2 + 3 = 4$, $p(2) = 8 - 4 + 3 = 7$ and $p(-2) = -8 + 4 + 3 = -1$.`, d: 2, c: 'application', t: [2] }), (Cx) => { Cx.assert(rs.join() === '2,4,7,-1', 'remainders 2, 4, 7, -1'); });
}

// =============================================================== numerical
{
  const p = P(1, 0, -3, 2, -5), v = peval(p, F(-2));
  Q('n01', mk.num({ stem: r`If $p(x) = x^{4} - 3x^{2} + 2x - 5$, find $p(-2)$.`, value: -5, sol: r`$p(-2) = (-2)^{4} - 3(-2)^{2} + 2(-2) - 5 = 16 - 12 - 4 - 5 = -5$.`, scheme: [['Substitute x = -2', 0.5], ['16 - 12 - 4 - 5 = -5', 0.5]], d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(v.eq(F(-5)), '-5'); Cx.val(v.num()); });
}
{
  const ks = [...Array(61).keys()].map((k) => k - 30).filter((k) => peval(P(2, -9, k, -3), F(3)).n === 0);
  Q('n02', mk.num({ stem: r`The polynomial $2x^{3} - 9x^{2} + kx - 3$ has $x - 3$ as a factor. Find $k$.`, value: 10, sol: r`By the factor theorem $p(3) = 0$: $2(27) - 9(9) + 3k - 3 = 0$, that is $54 - 81 + 3k - 3 = 0$, so $3k = 30$ and $k = 10$.`, scheme: [['p(3) = 0 gives 54 - 81 + 3k - 3 = 0', 0.5], ['k = 10', 0.5]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(ks.join() === '10', 'k = 10'); Cx.val(ks[0]); });
}
{
  const p = P(9, -3, 1, -4), rem = pdivmod(p, P(3, -2)).r[0];
  Q('n03', mk.num({ stem: r`A tile pattern in Kochi follows $9x^{3} - 3x^{2} + x - 4$. Using the zero of $3x - 2$, work out what remains when this polynomial is divided by $3x - 2$.`, value: -2, sol: r`$3x - 2 = 0$ at $x = \dfrac{2}{3}$, so the remainder is $p\left(\dfrac{2}{3}\right) = 9 \times \dfrac{8}{27} - 3 \times \dfrac{4}{9} + \dfrac{2}{3} - 4 = \dfrac{8}{3} - \dfrac{4}{3} + \dfrac{2}{3} - 4 = -2$.`, scheme: [['Zero of 3x - 2 is 2/3', 0.5], ['p(2/3) = -2', 0.5]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(rem.eq(F(-2)) && peval(p, F(2, 3)).eq(F(-2)), '-2'); Cx.val(rem.num()); });
}

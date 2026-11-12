// ICSE 9 Mathematics ch03 Expansions — practice bank with independent re-solve checks.
// Option values, keys and answers are typed as literals here; each check recomputes them with poly.mjs (exact
// multiplication of Laurent polynomials with rational coefficients, and evaluation at witness numbers that satisfy the
// stated conditions, for example a = 2, b = 4, c = 5 for "a + b + c = 11 and ab + bc + ca = 38").
import { Q, mk, r } from './lib.mjs';
import { P, chain, same, ev, close, realPair, reciprocalRoot } from './poly.mjs';

const J = (lines) => lines.join('\n\n');
const O = (a) => a.map((s) => `$${s}$`);
/** numeric option texts like $-40mn$ from values typed independently of the text */
const NO = (vals, pre = '', post = '') => vals.map((v) => `$${pre}${v}${post}$`);
const isTrue = (b, msg, C) => C.assert(b, msg);
/** the typed option polynomials: exactly one equals the target polynomial */
const WP = (C, opts, target) => C.which(opts.map((s) => P(s).eq(P(target))), true);
const WV = (C, vals, target) => C.which(vals, target);
const S = (...pairs) => pairs; // scheme helper

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`In the expansion of $(5m - 4n)^2$, the middle term is`, opts: NO([-40, 40, -20, -9], '', 'mn'), key: 'a', sol: r`$(5m - 4n)^2 = (5m)^2 - 2(5m)(4n) + (4n)^2 = 25m^2 - 40mn + 16n^2$, so the middle term is $-40mn$. It is negative because the two terms of the bracket have opposite signs.`, d: 1, c: 'recall', t: [1], time: 45 }), (C) => {
  chain([r`(5m - 4n)^2 = 25m^2 - 40mn + 16n^2`]);
  WV(C, [-40, 40, -20, -9], P('(5m-4n)^2').co({ m: 1, n: 1 }));
});

const m02o = [r`y^2 + 5y - 84`, r`y^2 - 5y - 84`, r`y^2 + 19y - 84`, r`y^2 + 5y + 84`];
Q('m02', mk.mcq({ stem: r`A rectangular mat is $(y + 12)$ m long and $(y - 7)$ m wide. Its area, in square metres, is`, opts: O(m02o), key: 'a', sol: r`Use $(x + a)(x + b) = x^2 + (a + b)x + ab$ with $a = 12$ and $b = -7$: the sum is $5$ and the product is $-84$, so the area is $y^2 + 5y - 84$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  chain([r`(y + 12)(y - 7) = y^2 + 12y - 7y - 84 = y^2 + 5y - 84`]);
  WP(C, m02o, '(y+12)(y-7)');
});

const m03o = [r`48x`, r`24x`, r`32x^2 + 18`, r`18`];
Q('m03', mk.mcq({ stem: r`A square hall has side $(4x + 3)$ m. A square rug of side $(4x - 3)$ m is laid in its middle, and the rest of the floor is tiled. The area of the tiled part, in square metres, is`, opts: O(m03o), key: 'a', sol: r`Tiled area $= (4x + 3)^2 - (4x - 3)^2 = (16x^2 + 24x + 9) - (16x^2 - 24x + 9) = 48x$. The squares and the constants cancel; only the middle terms survive.`, d: 3, c: 'application', t: [1], time: 90 }), (C) => {
  chain([r`(4x + 3)^2 - (4x - 3)^2 = 16x^2 + 24x + 9 - 16x^2 + 24x - 9 = 48x`]);
  WP(C, m03o, '(4x+3)^2-(4x-3)^2');
  isTrue(P('32x^2+18').eq(P('(4x+3)^2+(4x-3)^2')), 'the third option is the sum, not the difference', C);
});

Q('m04', mk.mcq({ stem: r`Sana expands $(6p - 5)^2$ and writes $36p^2 - 30p + 25$. Which statement about her answer is correct?`, opts: ['Her answer is correct.', r`The middle term should be $-60p$; the other two terms are right.`, r`The last term should be $-25$; the other two terms are right.`, r`The first term should be $12p^2$; the other two terms are right.`], key: 'b', sol: r`$(6p - 5)^2 = (6p)^2 - 2(6p)(5) + 5^2 = 36p^2 - 60p + 25$. Sana found $6p \times 5 = 30p$ and forgot the factor $2$ in $2ab$. Her first and last terms are right.`, d: 3, c: 'analysis', t: [1], time: 75 }), (C) => {
  const e = P('(6p-5)^2');
  C.assert(e.co({ p: 2 }) === 36 && e.co({ p: 1 }) === -60 && e.co() === 25, 'correct expansion 36p^2 - 60p + 25');
  C.assert(!e.eq(P('36p^2-30p+25')), 'Sana is wrong');
  C.key('b');
});

Q('m05', mk.mcq({ stem: r`If $x^2 + kx - 104 = (x + 13)(x - 8)$ for all values of $x$, then $k$ equals`, opts: NO([5, -5, 21, 104]), key: 'a', sol: r`$(x + 13)(x - 8) = x^2 + (13 - 8)x + 13 \times (-8) = x^2 + 5x - 104$. Comparing the coefficients of $x$ gives $k = 5$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const e = P('(x+13)(x-8)');
  C.assert(e.co() === -104, 'constant term -104 as given');
  WV(C, [5, -5, 21, 104], e.co({ x: 1 }));
});

const m06v = [109, 79, 139, 49];
Q('m06', mk.mcq({ stem: r`A rectangular plot has length $p$ m and breadth $q$ m, where $p - q = 7$ and $pq = 30$. The square of the length of its diagonal, in square metres, is`, opts: NO(m06v), key: 'a', sol: r`The diagonal $d$ satisfies $d^2 = p^2 + q^2$. Since $(p - q)^2 = p^2 - 2pq + q^2$, we get $p^2 + q^2 = (p - q)^2 + 2pq = 49 + 60 = 109$.`, d: 3, c: 'application', t: [1], time: 90 }), (C) => {
  const env = { p: 10, q: 3 };
  C.assert(ev('p-q', env) === 7 && ev('pq', env) === 30, 'witness p = 10, q = 3 meets the conditions');
  WV(C, m06v, ev('p^2+q^2', env));
  C.assert(P('(p-q)^2+2pq').eq(P('p^2+q^2')), 'identity used');
});

Q('m07', mk.mcq({ stem: r`Farah writes out every term of $(x + y + z)^2$ for a square garden split into strips. The number in front of $yz$ in her answer is`, opts: NO([2, 1, 3, 4]), key: 'a', sol: r`$(x + y + z)^2 = x^2 + y^2 + z^2 + 2xy + 2yz + 2zx$. Every product of two different letters appears twice, so the coefficient of $yz$ is $2$.`, d: 1, c: 'recall', t: [2], time: 45 }), (C) => {
  chain([r`(x + y + z)^2 = x^2 + y^2 + z^2 + 2xy + 2yz + 2zx`]);
  WV(C, [2, 1, 3, 4], P('(x+y+z)^2').co({ y: 1, z: 1 }));
});

Q('m08', mk.mcq({ stem: r`When $(2x - y + 3z)^2$ is multiplied out and like terms are collected, the coefficient of the cross term $xz$ is`, opts: NO([12, 6, -12, 36]), key: 'a', sol: r`The cross term of $x$ and $z$ is $2 \times (2x) \times (3z) = 12xz$. The sign is positive because $2x$ and $3z$ are both positive; the $-y$ affects only the terms with $y$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  WV(C, [12, 6, -12, 36], P('(2x-y+3z)^2').co({ x: 1, z: 1 }));
});

const m09v = [83, 45, 121, 197];
Q('m09', mk.mcq({ stem: r`A cuboid box has edges $a$ cm, $b$ cm and $c$ cm, with $a + b + c = 11$ and total surface area $76$ cm$^2$. The square of the length of its space diagonal, in cm$^2$, is`, opts: NO(m09v), key: 'b', sol: r`The total surface area is $2(ab + bc + ca) = 76$, so $ab + bc + ca = 38$. The squared diagonal is $a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca) = 121 - 76 = 45$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => {
  const env = { a: 2, b: 4, c: 5 };
  C.assert(ev('a+b+c', env) === 11 && 2 * ev('ab+bc+ca', env) === 76, 'witness 2, 4, 5 meets the conditions');
  WV(C, m09v, ev('a^2+b^2+c^2', env));
});

const m10o = [r`-2(ab + bc + ca)`, r`2(ab + bc + ca)`, r`0`, r`(ab + bc + ca)^2`];
Q('m10', mk.mcq({ stem: r`The real numbers $a$, $b$, $c$ are not all zero and $a + b + c = 0$. Which expression is always equal to $a^2 + b^2 + c^2$?`, opts: O(m10o), key: 'a', sol: r`From $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$ and $a + b + c = 0$ we get $a^2 + b^2 + c^2 = -2(ab + bc + ca)$. The sum of squares of real numbers that are not all zero is positive, so it cannot be $0$.`, d: 3, c: 'analysis', t: [2], time: 90 }), (C) => {
  const sub = (s) => s.replace(/c/g, '(-a-b)'); // impose c = -(a + b) in every option
  C.which(m10o.map((s) => P(sub(s)).eq(P(sub('a^2+b^2+c^2')))), true);
  C.assert(ev('a^2+b^2+c^2', { a: 1, b: 2, c: -3 }) === 14 && ev('-2(ab+bc+ca)', { a: 1, b: 2, c: -3 }) === 14, 'witness 1, 2, -3');
});

Q('m11', mk.mcq({ stem: r`In the expansion of $(2p - q + 3r)^2$ the terms containing two different letters are called cross terms. The sum of the coefficients of the three cross terms is`, opts: NO([2, 14, 16, -2]), key: 'a', sol: r`$(2p - q + 3r)^2 = 4p^2 + q^2 + 9r^2 - 4pq + 12pr - 6qr$. The cross-term coefficients are $-4$, $12$ and $-6$, and $-4 + 12 - 6 = 2$.`, d: 4, c: 'analysis', t: [2], time: 90 }), (C) => {
  const e = P('(2p-q+3r)^2');
  const cross = e.co({ p: 1, q: 1 }) + e.co({ p: 1, r: 1 }) + e.co({ q: 1, r: 1 });
  C.assert(e.co({ p: 2 }) === 4 && e.co({ q: 2 }) === 1 && e.co({ r: 2 }) === 9, 'squares 4, 1, 9 (sum 14)');
  WV(C, [2, 14, 16, -2], cross);
  C.assert(ev('(2p-q+3r)^2', { p: 1, q: 1, r: 1 }) === 16, 'total of all coefficients is 16');
});

const m12o = [r`a^3 - 3a^2b + 3ab^2 - b^3`, r`a^3 - 3a^2b - 3ab^2 - b^3`, r`a^3 - b^3 - 3ab`, r`a^3 - 3ab + b^3`];
Q('m12', mk.mcq({ stem: r`Which of the following is the expansion of $(a - b)^3$?`, opts: O(m12o), key: 'a', sol: r`Signs alternate when $b$ is subtracted: $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$. Check with $a = 2$, $b = 1$: $1^3 = 1$ and $8 - 12 + 6 - 1 = 1$.`, d: 1, c: 'recall', t: [3], time: 60 }), (C) => {
  WP(C, m12o, '(a-b)^3');
  C.assert(ev('(a-b)^3', { a: 2, b: 1 }) === 1 && ev('a^3-3a^2b+3ab^2-b^3', { a: 2, b: 1 }) === 1, 'check a = 2, b = 1');
});

Q('m13', mk.mcq({ stem: r`A cube-shaped tank has edge $(3x - 2)$ m. When its volume $(3x - 2)^3$ is written out in full, the number multiplying $x^2$ is`, opts: NO([-54, 54, -18, 36]), key: 'a', sol: r`$(3x - 2)^3 = (3x)^3 - 3(3x)^2(2) + 3(3x)(2)^2 - 2^3 = 27x^3 - 54x^2 + 36x - 8$. The coefficient of $x^2$ is $-54$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => {
  chain([r`(3x - 2)^3 = 27x^3 - 54x^2 + 36x - 8`]);
  WV(C, [-54, 54, -18, 36], P('(3x-2)^3').co({ x: 2 }));
});

const m14o = [r`9p^2 + 27p + 27`, r`9p^2 + 27p`, r`p^3 + 27`, r`27p^2 + 9p + 27`];
Q('m14', mk.mcq({ stem: r`Each edge of a cube of side $p$ cm is lengthened by $3$ cm. The increase in the volume of the cube, in cm$^3$, is`, opts: O(m14o), key: 'a', sol: r`New volume $-$ old volume $= (p + 3)^3 - p^3 = (p^3 + 9p^2 + 27p + 27) - p^3 = 9p^2 + 27p + 27$.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => {
  chain([r`(p + 3)^3 - p^3 = p^3 + 9p^2 + 27p + 27 - p^3 = 9p^2 + 27p + 27`]);
  WP(C, m14o, '(p+3)^3-p^3');
});

Q('m15', mk.mcq({ stem: r`If $a - \dfrac{1}{a} = 4$, then $a^2 + \dfrac{1}{a^2}$ equals`, opts: NO([18, 14, 16, 20]), key: 'a', sol: r`Square both sides: $\left(a - \dfrac{1}{a}\right)^2 = a^2 - 2 + \dfrac{1}{a^2} = 16$, so $a^2 + \dfrac{1}{a^2} = 16 + 2 = 18$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => {
  const a = 2 + Math.sqrt(5);
  C.assert(close(ev('a-\\dfrac{1}{a}', { a }), 4), 'witness a = 2 + sqrt 5');
  WV(C, [18, 14, 16, 20], Math.round(ev('a^2+\\dfrac{1}{a^2}', { a })));
  chain([r`(a - \dfrac{1}{a})^2 = a^2 - 2 + \dfrac{1}{a^2}`]);
});

const m16v = [90, 195, 342, 174];
Q('m16', mk.mcq({ stem: r`Two cubical blocks have edges $a$ cm and $b$ cm, where $a + b = 6$ and $ab = 7$. Their total volume, in cm$^3$, is`, opts: NO(m16v), key: 'a', sol: r`$a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 6^3 - 3 \times 7 \times 6 = 216 - 126 = 90$.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => {
  const [a, b] = realPair(6, 7);
  C.assert(close(a + b, 6) && close(a * b, 7), 'witness a = 3 + sqrt 2, b = 3 - sqrt 2');
  WV(C, m16v, Math.round(ev('a^3+b^3', { a, b })));
  chain([r`(a + b)^3 = a^3 + b^3 + 3ab(a + b)`]);
});

const m17v = [52, 60, 64, 76];
Q('m17', mk.mcq({ stem: r`If $a + \dfrac{1}{a} = 4$, then $a^3 + \dfrac{1}{a^3}$ is`, opts: NO(m17v), key: 'a', sol: r`$\left(a + \dfrac{1}{a}\right)^3 = a^3 + \dfrac{1}{a^3} + 3\left(a + \dfrac{1}{a}\right)$, so $a^3 + \dfrac{1}{a^3} = 64 - 3 \times 4 = 52$.`, d: 3, c: 'understanding', t: [3], time: 75 }), (C) => {
  const a = reciprocalRoot(4);
  C.assert(close(ev('a+\\dfrac{1}{a}', { a }), 4), 'witness a = 2 + sqrt 3');
  WV(C, m17v, Math.round(ev('a^3+\\dfrac{1}{a^3}', { a })));
  chain([r`(a + \dfrac{1}{a})^3 = a^3 + 3a + \dfrac{3}{a} + \dfrac{1}{a^3}`]);
});

const m18v = [9349, 8649, 9951, 8551];
Q('m18', mk.mcq({ stem: r`A square courtyard has side $93$ m. Using $93 = 100 - 7$, its area in square metres is`, opts: NO(m18v), key: 'b', sol: r`$93^2 = (100 - 7)^2 = 100^2 - 2 \times 100 \times 7 + 7^2 = 10000 - 1400 + 49 = 8649$.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => {
  chain([r`93^2 = (100 - 7)^2 = 10000 - 1400 + 49 = 8649`]);
  WV(C, m18v, 93 * 93);
});

const m19v = [999984, 1000016, 999996, 999992];
Q('m19', mk.mcq({ stem: r`A rectangular paddy field measures $1004$ m by $996$ m. Using an identity, its area in square metres is`, opts: NO(m19v), key: 'a', sol: r`$1004 \times 996 = (1000 + 4)(1000 - 4) = 1000^2 - 4^2 = 1000000 - 16 = 999984$.`, d: 3, c: 'application', t: [4], time: 75 }), (C) => {
  chain([r`1004 \times 996 = (1000 + 4)(1000 - 4) = 1000^2 - 4^2 = 999984`]);
  WV(C, m19v, 1004 * 996);
});

Q('m20', mk.mcq({ stem: r`The value of $8.3^2 - 2 \times 8.3 \times 2.3 + 2.3^2$ is`, opts: NO([36, 6, 74.18, 112.36]), key: 'a', sol: r`The expression has the shape $a^2 - 2ab + b^2 = (a - b)^2$ with $a = 8.3$ and $b = 2.3$, so it equals $(8.3 - 2.3)^2 = 6^2 = 36$.`, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => {
  WV(C, [36, 6, 74.18, 112.36], P('8.3^2 - 2 \\times 8.3 \\times 2.3 + 2.3^2').value());
  C.assert(close(8.3 ** 2 + 2.3 ** 2, 74.18) && close((8.3 + 2.3) ** 2, 112.36), 'distractors are the slips');
});

Q('m21', mk.mcq({ stem: r`Four students work out $1003^2$ from $(1000 + 3)^2$. Which result is correct?`, opts: NO([1000009, 1003009, 1006009, 1006000]), key: 'c', sol: r`$(1000 + 3)^2 = 1000^2 + 2 \times 1000 \times 3 + 3^2 = 1000000 + 6000 + 9 = 1006009$. The result $1000009$ drops the middle term, $1003009$ uses $1000 \times 3$ instead of $2 \times 1000 \times 3$, and $1006000$ drops the last term.`, d: 3, c: 'understanding', t: [4], time: 75 }), (C) => {
  chain([r`1003^2 = (1000 + 3)^2 = 1000000 + 6000 + 9 = 1006009`]);
  WV(C, [1000009, 1003009, 1006009, 1006000], 1003 * 1003);
});

const m22v = [127551, 132651, 132649, 125001];
Q('m22', mk.mcq({ stem: r`A cubical sugar block has an edge of $51$ mm. Using $51 = 50 + 1$, its volume in cubic millimetres is`, opts: NO(m22v), key: 'b', sol: r`$51^3 = (50 + 1)^3 = 50^3 + 3 \times 50^2 \times 1 + 3 \times 50 \times 1^2 + 1^3 = 125000 + 7500 + 150 + 1 = 132651$. Leaving out the factors $3$ gives $127551$, and keeping only $a^3 + b^3$ gives $125001$.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => {
  chain([r`51^3 = (50 + 1)^3 = 125000 + 7500 + 150 + 1 = 132651`]);
  WV(C, m22v, 51 ** 3);
});

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`$(x + 4)(x - 9) = x^2 - 5x - 36$.`, r: r`In $(x + a)(x + b)$ the coefficient of $x$ is $ab$.`, key: 'a', sol: r`$(x + 4)(x - 9) = x^2 + (4 - 9)x + 4 \times (-9) = x^2 - 5x - 36$, so (A) is true. In $(x + a)(x + b) = x^2 + (a + b)x + ab$ the coefficient of $x$ is the sum $a + b$, and $ab$ is the constant term, so (R) is false. Option (a).`, d: 2, c: 'analysis', t: [1] }), (C) => {
  chain([r`(x + 4)(x - 9) = x^2 - 5x - 36`]);
  C.assert(P('(x+4)(x-9)').co({ x: 1 }) === 4 + -9 && 4 + -9 !== 4 * -9, 'coefficient is a + b = -5, not ab = -36: R false');
  C.key('a');
});
Q('ar2', mk.ar({ a: r`$(7 - 3)^2 = 7^2 - 3^2$.`, r: r`The square of a difference always carries a middle term: $(a - b)^2 = a^2 - 2ab + b^2$.`, key: 'b', sol: r`$(7 - 3)^2 = 16$ but $7^2 - 3^2 = 40$, so (A) is false. (R) is the standard identity and is true. The missing middle term $-2ab = -42$ explains the difference. Option (b).`, d: 2, c: 'understanding', t: [1] }), (C) => {
  C.assert(P('(7-3)^2').value() === 16 && P('7^2-3^2').value() === 40, 'A is false: 16 vs 40');
  chain([r`(a - b)^2 = a^2 - 2ab + b^2`]);
  C.key('b');
});
Q('ar3', mk.ar({ a: r`If $a + b + c = 9$ and $a^2 + b^2 + c^2 = 29$, then $ab + bc + ca = 26$.`, r: r`$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$.`, key: 'c', sol: r`By (R), $81 = 29 + 2(ab + bc + ca)$, so $ab + bc + ca = \dfrac{52}{2} = 26$: (A) is true, and it follows directly from (R), which is the identity used. Option (c).`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const env = { a: 2, b: 3, c: 4 };
  C.assert(ev('a+b+c', env) === 9 && ev('a^2+b^2+c^2', env) === 29 && ev('ab+bc+ca', env) === 26, 'witness 2, 3, 4');
  C.assert((81 - 29) / 2 === 26, 'arithmetic');
  chain([r`(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)`]);
  C.key('c');
});
Q('ar4', mk.ar({ a: r`$1006 \times 994 = 999964$.`, r: r`$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.`, key: 'd', sol: r`$1006 \times 994 = (1000 + 6)(1000 - 6) = 1000^2 - 6^2 = 999964$, so (A) is true. (R) is also a true identity, but it is about cubes and plays no part in the product of two numbers, so it does not explain (A). Option (d).`, d: 3, c: 'analysis', t: [4, 3] }), (C) => {
  chain([r`1006 \times 994 = (1000 + 6)(1000 - 6) = 1000^2 - 6^2 = 999964`]);
  C.assert(1006 * 994 === 999964, 'A true');
  chain([r`(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3`]);
  C.key('d');
});
Q('ar5', mk.ar({ a: r`$(x + 2y)^3 + (x - 2y)^3 = 2x^3 + 24xy^2$.`, r: r`When $(a + b)^3$ and $(a - b)^3$ are added, the terms containing odd powers of $b$ cancel.`, key: 'c', sol: r`$(x + 2y)^3 = x^3 + 6x^2y + 12xy^2 + 8y^3$ and $(x - 2y)^3 = x^3 - 6x^2y + 12xy^2 - 8y^3$. Adding, the terms in $y$ and $y^3$ cancel and $2x^3 + 24xy^2$ remains, so (A) is true, and (R) states exactly why. Option (c).`, d: 3, c: 'analysis', t: [3] }), (C) => {
  chain([r`(x + 2y)^3 + (x - 2y)^3 = 2x^3 + 24xy^2`]);
  const s = P('(a+b)^3+(a-b)^3');
  C.assert(s.co({ a: 2, b: 1 }) === 0 && s.co({ b: 3 }) === 0 && s.co({ a: 3 }) === 2, 'odd powers of b cancel');
  C.key('c');
});

// =============================================================== true / false
Q('tf1', mk.tf({ stem: r`$(m - n)^2 = (n - m)^2$ for all numbers $m$ and $n$.`, key: 't', sol: r`$n - m = -(m - n)$, and the square of a negative number equals the square of the positive one. Both sides equal $m^2 - 2mn + n^2$.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(P('(m-n)^2').eq(P('(n-m)^2')), 'equal polynomials'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`$a^3 + b^3 = (a + b)^3$ for all numbers $a$ and $b$.`, key: 'f', sol: r`False. Take $a = b = 1$: the left side is $2$ and the right side is $8$. In general $(a + b)^3 = a^3 + b^3 + 3ab(a + b)$, so the two sides agree only when $3ab(a + b) = 0$.`, d: 2, c: 'analysis', t: [3] }), (C) => { C.assert(ev('a^3+b^3', { a: 1, b: 1 }) === 2 && ev('(a+b)^3', { a: 1, b: 1 }) === 8, 'counter-example'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`If $ab + bc + ca = 0$, then $(a + b + c)^2 = a^2 + b^2 + c^2$.`, key: 't', sol: r`$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$. When the bracket $ab + bc + ca$ is $0$, the extra term vanishes, so the statement is true. For example $a = 3$, $b = 6$, $c = -2$ give $ab + bc + ca = 18 - 12 - 6 = 0$, and both sides equal $49$.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const env = { a: 3, b: 6, c: -2 };
  C.assert(ev('ab+bc+ca', env) === 0 && ev('(a+b+c)^2', env) === 49 && ev('a^2+b^2+c^2', env) === 49, 'witness 3, 6, -2');
  C.key('t');
});
Q('tf4', mk.tf({ stem: r`If $a + \dfrac{1}{a} = 2$, then $a^3 + \dfrac{1}{a^3} = 2$.`, key: 't', sol: r`$a^3 + \dfrac{1}{a^3} = \left(a + \dfrac{1}{a}\right)^3 - 3\left(a + \dfrac{1}{a}\right) = 8 - 6 = 2$. (Indeed $a + \dfrac{1}{a} = 2$ forces $a = 1$, and $1 + 1 = 2$.)`, d: 3, c: 'application', t: [3] }), (C) => { C.assert(ev('a+\\dfrac{1}{a}', { a: 1 }) === 2 && ev('a^3+\\dfrac{1}{a^3}', { a: 1 }) === 2 && 8 - 6 === 2, 'a = 1 and the identity'); C.key('t'); });
Q('tf5', mk.tf({ stem: r`$(x + 3)(x + 8) = x^2 + 24x + 11$.`, key: 'f', sol: r`False. The sum $3 + 8 = 11$ is the coefficient of $x$ and the product $3 \times 8 = 24$ is the constant term: $(x + 3)(x + 8) = x^2 + 11x + 24$. The statement swaps them.`, d: 2, c: 'understanding', t: [1] }), (C) => { chain([r`(x + 3)(x + 8) = x^2 + 11x + 24`]); C.assert(!P('(x+3)(x+8)').eq(P('x^2+24x+11')), 'the statement is wrong'); C.key('f'); });

// =============================================================== fill in the blanks
Q('fb1', mk.fill({ stem: r`In the product $(x - 6)(x + 11)$, the coefficient of $x$ is ____.`, acc: [['5']], sol: r`$(x - 6)(x + 11) = x^2 + (-6 + 11)x - 66 = x^2 + 5x - 66$, so the coefficient of $x$ is $5$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(P('(x-6)(x+11)').co({ x: 1 })));
Q('fb2', mk.fill({ stem: r`$(7a - 2b)^2 = 49a^2 - $ ____ $ab + 4b^2$.`, acc: [['28']], sol: r`The middle term is $-2 \times 7a \times 2b = -28ab$, so the missing number is $28$.`, d: 2, c: 'understanding', t: [1] }), (C) => { chain([r`(7a - 2b)^2 = 49a^2 - 28ab + 4b^2`]); C.blank(-P('(7a-2b)^2').co({ a: 1, b: 1 })); });
Q('fb3', mk.fill({ stem: r`If $a + b + c = 12$ and $a^2 + b^2 + c^2 = 50$, then $ab + bc + ca = $ ____.`, acc: [['47']], sol: r`$144 = (a + b + c)^2 = 50 + 2(ab + bc + ca)$, so $ab + bc + ca = \dfrac{94}{2} = 47$.`, d: 3, c: 'application', t: [2] }), (C) => {
  const env = { a: 3, b: 4, c: 5 };
  C.assert(ev('a+b+c', env) === 12 && ev('a^2+b^2+c^2', env) === 50, 'witness 3, 4, 5');
  C.blank(ev('ab+bc+ca', env));
});
Q('fb4', mk.fill({ stem: r`A cubical packing case has an edge of $103$ cm. Using $103 = 100 + 3$, its volume in cubic centimetres is ____.`, acc: [['1092727']], sol: r`$103^3 = (100 + 3)^3 = 1000000 + 3 \times 10000 \times 3 + 3 \times 100 \times 9 + 27 = 1000000 + 90000 + 2700 + 27 = 1092727$.`, d: 3, c: 'application', t: [4] }), (C) => { chain([r`103^3 = (100 + 3)^3 = 1000000 + 90000 + 2700 + 27 = 1092727`]); C.blank(103 ** 3); });
Q('fb5', mk.fill({ stem: r`If $a - \dfrac{1}{a} = 3$, then $a^3 - \dfrac{1}{a^3} = $ ____.`, acc: [['36']], sol: r`Cube both sides: $a^3 - \dfrac{1}{a^3} - 3\left(a - \dfrac{1}{a}\right) = 27$, so $a^3 - \dfrac{1}{a^3} = 27 + 9 = 36$.`, d: 3, c: 'application', t: [3] }), (C) => {
  const a = (3 + Math.sqrt(13)) / 2;
  C.assert(close(ev('a-\\dfrac{1}{a}', { a }), 3), 'witness a = (3 + sqrt 13)/2');
  C.blank(Math.round(ev('a^3-\\dfrac{1}{a^3}', { a })));
  chain([r`(a - \dfrac{1}{a})^3 = a^3 - 3a + \dfrac{3}{a} - \dfrac{1}{a^3}`]);
});

// =============================================================== numerical
Q('n01', mk.num({ stem: r`A square tile has a side of $305$ mm. Using $305 = 300 + 5$, find its area in square millimetres.`, value: 93025, unit: 'mm²', sol: r`$305^2 = (300 + 5)^2 = 90000 + 2 \times 300 \times 5 + 25 = 90000 + 3000 + 25 = 93025$.`, scheme: S(['Area $= 93025$ mm$^2$', 1]), marks: 1, d: 2, c: 'understanding', t: [4], time: 90 }), (C) => { chain([r`305^2 = (300 + 5)^2 = 90000 + 3000 + 25 = 93025`]); C.val(305 * 305); });
Q('n02', mk.num({ stem: r`If $a + \dfrac{1}{a} = 9$, find the value of $a^2 + \dfrac{1}{a^2}$.`, value: 79, sol: r`$\left(a + \dfrac{1}{a}\right)^2 = a^2 + 2 + \dfrac{1}{a^2} = 81$, so $a^2 + \dfrac{1}{a^2} = 81 - 2 = 79$.`, scheme: S(['Value $79$', 1]), marks: 1, d: 2, c: 'understanding', t: [3], time: 90 }), (C) => {
  const a = reciprocalRoot(9);
  C.assert(close(ev('a+\\dfrac{1}{a}', { a }), 9), 'witness a = (9 + sqrt 77)/2');
  C.val(Math.round(ev('a^2+\\dfrac{1}{a^2}', { a })));
});
Q('n03', mk.num({ stem: r`Two cubical tanks have edges $x$ m and $y$ m, with $x + y = 10$ and $xy = 21$. Find $x^3 + y^3$, the total volume in cubic metres.`, value: 370, sol: r`$x^3 + y^3 = (x + y)^3 - 3xy(x + y) = 1000 - 3 \times 21 \times 10 = 1000 - 630 = 370$.`, scheme: S(['Value $370$ m$^3$', 1]), marks: 1, d: 3, c: 'application', t: [3], time: 100 }), (C) => {
  const env = { x: 3, y: 7 };
  C.assert(ev('x+y', env) === 10 && ev('xy', env) === 21, 'witness x = 3, y = 7');
  C.val(ev('x^3+y^3', env));
});
Q('n04', mk.num({ stem: r`If $a + b + c = 15$ and $ab + bc + ca = 71$, find $a^2 + b^2 + c^2$.`, value: 83, sol: r`$a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca) = 15^2 - 2 \times 71 = 225 - 142 = 83$.`, scheme: S(['Uses $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$', 1], ['Value $83$', 1]), marks: 2, d: 3, c: 'application', t: [2], time: 120 }), (C) => {
  const env = { a: 3, b: 5, c: 7 };
  C.assert(ev('a+b+c', env) === 15 && ev('ab+bc+ca', env) === 71, 'witness 3, 5, 7');
  C.val(ev('a^2+b^2+c^2', env));
});
Q('n05', mk.num({ stem: r`In the product $(x + k)(x - 3k)$, where $k$ is a positive number, the coefficient of $x$ is $-8$. Find $k$.`, value: 4, sol: r`$(x + k)(x - 3k) = x^2 + (k - 3k)x - 3k^2 = x^2 - 2kx - 3k^2$. So $-2k = -8$ and $k = 4$. Check: $(x + 4)(x - 12) = x^2 - 8x - 48$.`, scheme: S(['Expansion $x^2 - 2kx - 3k^2$', 1], ['$k = 4$', 1]), marks: 2, d: 3, c: 'application', t: [1], time: 120 }), (C) => {
  chain([r`(x + k)(x - 3k) = x^2 - 2kx - 3k^2`]);
  chain([r`(x + 4)(x - 12) = x^2 - 8x - 48`]);
  C.val(P('(x+4)(x-12)').co({ x: 1 }) === -8 ? 4 : NaN);
});
Q('n06', mk.num({ stem: r`A cubical water tank has an edge of $104$ cm. Using $104 = 100 + 4$, find its volume in cubic centimetres.`, value: 1124864, unit: 'cm³', sol: r`$104^3 = (100 + 4)^3 = 100^3 + 3 \times 100^2 \times 4 + 3 \times 100 \times 4^2 + 4^3 = 1000000 + 120000 + 4800 + 64 = 1124864$.`, scheme: S(['Uses $(a + b)^3$ with $a = 100$, $b = 4$', 1], ['Volume $1124864$ cm$^3$', 1]), marks: 2, d: 3, c: 'application', t: [4], time: 120 }), (C) => { chain([r`104^3 = (100 + 4)^3 = 1000000 + 120000 + 4800 + 64 = 1124864`]); C.val(104 ** 3); });
Q('n07', mk.num({ stem: r`If $a - b = 3$ and $ab = 10$, find $a^3 - b^3$.`, value: 117, sol: r`$(a - b)^3 = a^3 - b^3 - 3ab(a - b)$, so $a^3 - b^3 = (a - b)^3 + 3ab(a - b) = 27 + 3 \times 10 \times 3 = 27 + 90 = 117$.`, scheme: S(['Rearranges $(a - b)^3 = a^3 - b^3 - 3ab(a - b)$', 1], ['Value $117$', 1]), marks: 2, d: 3, c: 'application', t: [3], time: 120 }), (C) => {
  const env = { a: 5, b: 2 };
  C.assert(ev('a-b', env) === 3 && ev('ab', env) === 10, 'witness a = 5, b = 2');
  chain([r`(a - b)^3 = a^3 - b^3 - 3ab(a - b)`]);
  C.val(ev('a^3-b^3', env));
});

// =============================================================== short, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`A square signboard has a side of $(4m + 3n)$ cm. Expand to find its area.`, model: r`Area $= (4m + 3n)^2 = (4m)^2 + 2(4m)(3n) + (3n)^2 = 16m^2 + 24mn + 9n^2$ cm$^2$.`, sol: r`Using $(a + b)^2 = a^2 + 2ab + b^2$ with $a = 4m$ and $b = 3n$: $a^2 = 16m^2$, $2ab = 24mn$, $b^2 = 9n^2$. The area is $16m^2 + 24mn + 9n^2$ cm$^2$.`, scheme: S(['Uses $(a + b)^2$ with $a = 4m$, $b = 3n$', 1], ['Expansion $16m^2 + 24mn + 9n^2$', 1]), d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { chain([r`(4m + 3n)^2 = 16m^2 + 24mn + 9n^2`]); C.model([16, 24, 9]); });
Q('s202', mk.short({ marks: 2, stem: r`A banner is $(2p + 7)$ m long and $(2p - 3)$ m wide. Find its area as an expression in $p$.`, model: r`Area $= (2p + 7)(2p - 3) = (2p)^2 + (7 - 3)(2p) + 7 \times (-3) = 4p^2 + 8p - 21$ m$^2$.`, sol: r`Treat $2p$ as $x$ in $(x + a)(x + b) = x^2 + (a + b)x + ab$ with $a = 7$, $b = -3$: $x^2 + 4x - 21$, which is $4p^2 + 8p - 21$.`, scheme: S(['Uses $(x + a)(x + b)$ with $x = 2p$, $a = 7$, $b = -3$', 1], ['$4p^2 + 8p - 21$ m$^2$', 1]), d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { chain([r`(2p + 7)(2p - 3) = 4p^2 + 8p - 21`]); C.model([4, 8, 21]); });
Q('s203', mk.short({ marks: 2, stem: r`Expand $(x + 2y - z)^2$.`, model: r`$(x + 2y - z)^2 = x^2 + 4y^2 + z^2 + 4xy - 2xz - 4yz$.`, sol: r`Squares: $x^2$, $(2y)^2 = 4y^2$, $(-z)^2 = z^2$. Cross terms: $2(x)(2y) = 4xy$, $2(x)(-z) = -2xz$, $2(2y)(-z) = -4yz$.`, scheme: S(['Three squares $x^2 + 4y^2 + z^2$', 1], ['Three cross terms with the right signs $4xy - 2xz - 4yz$', 1]), d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { chain([r`(x + 2y - z)^2 = x^2 + 4y^2 + z^2 + 4xy - 2xz - 4yz`]); C.model([4, 2, 4]); });
Q('s204', mk.short({ marks: 2, stem: r`A square plot has a side of $204$ m. Use an identity, not a calculator, to find its area.`, model: r`$204^2 = (200 + 4)^2 = 200^2 + 2 \times 200 \times 4 + 4^2 = 40000 + 1600 + 16 = 41616$ m$^2$.`, sol: r`Write $204 = 200 + 4$ and use $(a + b)^2 = a^2 + 2ab + b^2$: $40000 + 1600 + 16 = 41616$.`, scheme: S(['$(200 + 4)^2 = 200^2 + 2 \\times 200 \\times 4 + 4^2$', 1], ['Area $41616$ m$^2$', 1]), d: 3, c: 'application', t: [4], time: 120 }), (C) => { chain([r`204^2 = (200 + 4)^2 = 40000 + 1600 + 16 = 41616`]); C.model([41616]); C.assert(204 * 204 === 41616, 'direct'); });
Q('s205', mk.short({ marks: 2, stem: r`Expand $(3a - 2)^3$.`, model: r`$(3a - 2)^3 = (3a)^3 - 3(3a)^2(2) + 3(3a)(2)^2 - 2^3 = 27a^3 - 54a^2 + 36a - 8$.`, sol: r`Use $(x - y)^3 = x^3 - 3x^2y + 3xy^2 - y^3$ with $x = 3a$ and $y = 2$: $27a^3 - 54a^2 + 36a - 8$.`, scheme: S(['Uses $(x - y)^3$ with $x = 3a$, $y = 2$', 1], ['$27a^3 - 54a^2 + 36a - 8$', 1]), d: 2, c: 'understanding', t: [3], time: 120 }), (C) => { chain([r`(3a - 2)^3 = 27a^3 - 54a^2 + 36a - 8`]); C.model([27, 54, 36, 8]); });
Q('s206', mk.short({ marks: 2, stem: r`The length and breadth of a rectangle, in metres, add up to $8$, and the square of its diagonal is $40$ m$^2$. Find the area of the rectangle.`, model: r`Let the sides be $a$ and $b$. $(a + b)^2 = a^2 + 2ab + b^2$, so $64 = 40 + 2ab$ and $ab = 12$. The area is $12$ m$^2$.`, sol: r`The diagonal gives $a^2 + b^2 = 40$. From $(a + b)^2 = a^2 + b^2 + 2ab$: $64 = 40 + 2ab$, so $ab = 12$. Check with $a = 6$, $b = 2$: sum $8$, squares $36 + 4 = 40$, product $12$.`, scheme: S(['Uses $(a + b)^2 = a^2 + b^2 + 2ab$ with $64$ and $40$', 1], ['Area $= ab = 12$ m$^2$', 1]), d: 3, c: 'application', t: [1], time: 120 }), (C) => {
  const env = { a: 6, b: 2 };
  C.assert(ev('a+b', env) === 8 && ev('a^2+b^2', env) === 40, 'witness 6, 2');
  C.model([64, 40, 12]);
  C.assert(ev('ab', env) === 12 && (64 - 40) / 2 === 12, 'area 12');
});
Q('s207', mk.short({ marks: 2, stem: r`Dev writes $(x + 4)^3 = x^3 + 64$. Say what he has left out, and write the correct expansion.`, model: r`Dev has left out the two middle terms $3 \times x^2 \times 4 = 12x^2$ and $3 \times x \times 4^2 = 48x$. The correct expansion is $(x + 4)^3 = x^3 + 12x^2 + 48x + 64$.`, sol: r`$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. With $a = x$ and $b = 4$ the middle terms are $12x^2$ and $48x$. At $x = 1$ the left side is $125$, but Dev's formula gives $65$.`, scheme: S(['Names the missing terms $12x^2$ and $48x$', 1], ['Correct expansion $x^3 + 12x^2 + 48x + 64$', 1]), d: 3, c: 'analysis', t: [3], time: 120 }), (C) => {
  chain([r`(x + 4)^3 = x^3 + 12x^2 + 48x + 64`]);
  C.assert(ev('(x+4)^3', { x: 1 }) === 125 && ev('x^3+64', { x: 1 }) === 65, 'test at x = 1');
  C.model([12, 48, 64]);
});

// =============================================================== short, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`The sides of a triangular plot are $a$ m, $b$ m and $c$ m. Its perimeter is $18$ m and $a^2 + b^2 + c^2 = 116$. Find $ab + bc + ca$, and hence find $(a - b)^2 + (b - c)^2 + (c - a)^2$.`, model: r`$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$, so $324 = 116 + 2(ab + bc + ca)$ and $ab + bc + ca = 104$. Then $(a - b)^2 + (b - c)^2 + (c - a)^2 = 2(a^2 + b^2 + c^2) - 2(ab + bc + ca) = 232 - 208 = 24$.`, sol: r`$18^2 = 324$. From the identity, $2(ab + bc + ca) = 324 - 116 = 208$, so $ab + bc + ca = 104$. Expanding the three squared differences gives twice the sum of squares minus twice the sum of products: $232 - 208 = 24$. Check with $a = 4$, $b = 6$, $c = 8$: $4 + 4 + 16 = 24$.`, scheme: S(['Uses $(a + b + c)^2$ with perimeter $18$', 1], ['$ab + bc + ca = 104$', 1], ['Second expression $= 24$', 1]), d: 3, c: 'application', t: [2], time: 240 }), (C) => {
  const env = { a: 4, b: 6, c: 8 };
  C.assert(ev('a+b+c', env) === 18 && ev('a^2+b^2+c^2', env) === 116, 'witness 4, 6, 8 (a real triangle)');
  C.assert(env.a + env.b > env.c, 'triangle inequality');
  chain([r`(a - b)^2 + (b - c)^2 + (c - a)^2 = 2a^2 + 2b^2 + 2c^2 - 2ab - 2bc - 2ca`]);
  C.model([104, 24, 324]);
  C.assert(ev('ab+bc+ca', env) === 104 && ev('(a-b)^2+(b-c)^2+(c-a)^2', env) === 24, 'values at the witness');
});
Q('s302', mk.short({ marks: 3, stem: r`If $a - \dfrac{1}{a} = 6$, find the values of $a^2 + \dfrac{1}{a^2}$ and $a^3 - \dfrac{1}{a^3}$.`, model: r`$\left(a - \dfrac{1}{a}\right)^2 = a^2 - 2 + \dfrac{1}{a^2} = 36$, so $a^2 + \dfrac{1}{a^2} = 38$. Cubing, $\left(a - \dfrac{1}{a}\right)^3 = a^3 - \dfrac{1}{a^3} - 3\left(a - \dfrac{1}{a}\right)$, so $a^3 - \dfrac{1}{a^3} = 216 + 18 = 234$.`, sol: r`Squaring gives $a^2 + \dfrac{1}{a^2} = 36 + 2 = 38$. Cubing gives $216 = a^3 - \dfrac{1}{a^3} - 18$, so $a^3 - \dfrac{1}{a^3} = 234$.`, scheme: S(['Squares $a - \\dfrac{1}{a}$ correctly', 1], ['$a^2 + \\dfrac{1}{a^2} = 38$', 1], ['$a^3 - \\dfrac{1}{a^3} = 234$', 1]), d: 3, c: 'application', t: [3], time: 240 }), (C) => {
  const a = 3 + Math.sqrt(10);
  C.assert(close(ev('a-\\dfrac{1}{a}', { a }), 6), 'witness a = 3 + sqrt 10');
  C.assert(close(ev('a^2+\\dfrac{1}{a^2}', { a }), 38) && close(ev('a^3-\\dfrac{1}{a^3}', { a }), 234), 'values at the witness');
  C.model([38, 234]);
});
Q('s303', mk.short({ marks: 3, stem: r`A cubical carton has an edge of $(2x + 3y)$ cm. Expand to write its volume as an expression in $x$ and $y$.`, model: r`Volume $= (2x + 3y)^3 = (2x)^3 + 3(2x)^2(3y) + 3(2x)(3y)^2 + (3y)^3 = 8x^3 + 36x^2y + 54xy^2 + 27y^3$ cm$^3$.`, sol: r`Use $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ with $a = 2x$ and $b = 3y$: $a^3 = 8x^3$; $3a^2b = 3 \times 4x^2 \times 3y = 36x^2y$; $3ab^2 = 3 \times 2x \times 9y^2 = 54xy^2$; $b^3 = 27y^3$.`, scheme: S(['Identity with $a = 2x$, $b = 3y$', 1], ['Four terms substituted correctly', 1], ['Simplified to $8x^3 + 36x^2y + 54xy^2 + 27y^3$', 1]), d: 2, c: 'understanding', t: [3], time: 200 }), (C) => { chain([r`(2x + 3y)^3 = 8x^3 + 36x^2y + 54xy^2 + 27y^3`]); C.model([8, 36, 54, 27]); });
Q('s304', mk.short({ marks: 3, stem: r`Use $(100 - 2)^3$ to find the volume, in cubic centimetres, of a cubical die-casting mould with an edge of $98$ cm.`, model: r`$98^3 = (100 - 2)^3 = 100^3 - 3 \times 100^2 \times 2 + 3 \times 100 \times 2^2 - 2^3 = 1000000 - 60000 + 1200 - 8 = 941192$ cm$^3$.`, sol: r`Use $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$ with $a = 100$ and $b = 2$: $1000000 - 60000 + 1200 - 8 = 941192$.`, scheme: S(['Chooses $a = 100$, $b = 2$ in $(a - b)^3$', 1], ['All four terms $1000000$, $60000$, $1200$, $8$ with signs', 1], ['$941192$ cm$^3$', 1]), d: 3, c: 'application', t: [4], time: 200 }), (C) => { chain([r`98^3 = (100 - 2)^3 = 1000000 - 60000 + 1200 - 8 = 941192`]); C.model([941192, 60000, 1200]); C.assert(98 ** 3 === 941192, 'direct'); });
Q('s305', mk.short({ marks: 3, stem: r`Two cubical sweet boxes have edges $a$ cm and $b$ cm, where $a + b = 9$ and $ab = 20$. Find $a^2 + b^2$ and the total volume $a^3 + b^3$ of the two boxes.`, model: r`$a^2 + b^2 = (a + b)^2 - 2ab = 81 - 40 = 41$. $a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 729 - 3 \times 20 \times 9 = 729 - 540 = 189$ cm$^3$.`, sol: r`From $(a + b)^2 = a^2 + 2ab + b^2$: $a^2 + b^2 = 81 - 40 = 41$. From $(a + b)^3 = a^3 + b^3 + 3ab(a + b)$: $a^3 + b^3 = 729 - 540 = 189$. Check with $a = 5$, $b = 4$: $125 + 64 = 189$.`, scheme: S(['$a^2 + b^2 = 41$', 1], ['Uses $(a + b)^3 = a^3 + b^3 + 3ab(a + b)$', 1], ['$a^3 + b^3 = 189$ cm$^3$', 1]), d: 3, c: 'application', t: [1, 3], time: 240 }), (C) => {
  const env = { a: 5, b: 4 };
  C.assert(ev('a+b', env) === 9 && ev('ab', env) === 20, 'witness a = 5, b = 4');
  C.assert(ev('a^2+b^2', env) === 41 && ev('a^3+b^3', env) === 189, 'values at the witness');
  C.model([41, 189]);
});
Q('s306', mk.short({ marks: 3, stem: r`Show that $(a + b)^3 - (a - b)^3 = 6a^2b + 2b^3$, and use it to find $11^3 - 9^3$.`, model: r`$(a + b)^3 - (a - b)^3 = (a^3 + 3a^2b + 3ab^2 + b^3) - (a^3 - 3a^2b + 3ab^2 - b^3) = 6a^2b + 2b^3$. With $a = 10$ and $b = 1$: $11^3 - 9^3 = 6 \times 100 \times 1 + 2 \times 1 = 602$.`, sol: r`Subtracting the two expansions, the $a^3$ terms and the $3ab^2$ terms cancel and the other terms double: $6a^2b + 2b^3$. Put $a = 10$, $b = 1$, so $a + b = 11$ and $a - b = 9$: $600 + 2 = 602$. Direct check: $1331 - 729 = 602$.`, scheme: S(['Writes both expansions', 1], ['Subtracts to get $6a^2b + 2b^3$', 1], ['$a = 10$, $b = 1$ gives $602$', 1]), d: 3, c: 'analysis', t: [3, 4], time: 240 }), (C) => {
  chain([r`(a + b)^3 - (a - b)^3 = 6a^2b + 2b^3`]);
  C.assert(11 ** 3 - 9 ** 3 === 602 && ev('6a^2b+2b^3', { a: 10, b: 1 }) === 602, 'value 602');
  C.model([602]);
});

// =============================================================== long, 10 marks
Q('l01', mk.long({ marks: 10, stem: r`A square courtyard has a side of $(3x + 4)$ m. A square pond of side $(x + 2)$ m is built in its middle, and the rest of the courtyard is paved.
(a) Expand $(3x + 4)^2$. [3]
(b) Expand $(x + 2)^2$ and write the paved area as an expression in $x$. [3]
(c) For $x = 6$, find the paved area, and the cost of paving it at ₹45 per square metre. [4]`, model: r`(a) $(3x + 4)^2 = 9x^2 + 24x + 16$.
(b) $(x + 2)^2 = x^2 + 4x + 4$. Paved area $= 9x^2 + 24x + 16 - (x^2 + 4x + 4) = 8x^2 + 20x + 12$ m$^2$.
(c) $x = 6$: $8 \times 36 + 20 \times 6 + 12 = 288 + 120 + 12 = 420$ m$^2$. Cost $= 420 \times 45 =$ ₹18900.`, sol: r`(a) With $a = 3x$ and $b = 4$: $a^2 = 9x^2$, $2ab = 24x$, $b^2 = 16$.
(b) With $a = x$ and $b = 2$: $x^2 + 4x + 4$. Subtract the pond from the courtyard.
(c) Substitute $x = 6$ into $8x^2 + 20x + 12$. Check without the expression: courtyard side $22$ m, pond side $8$ m, so $484 - 64 = 420$.`, scheme: S(['(a) Uses $(a + b)^2$ with $a = 3x$, $b = 4$', 1], ['(a) $9x^2 + 24x + 16$', 2], ['(b) $(x + 2)^2 = x^2 + 4x + 4$', 1], ['(b) Paved area $8x^2 + 20x + 12$', 2], ['(c) Area $420$ m$^2$', 2], ['(c) Cost ₹18900', 2]), d: 3, c: 'application', t: [1], time: 600 }), (C) => {
  chain([r`(3x + 4)^2 = 9x^2 + 24x + 16`]);
  chain([r`(x + 2)^2 = x^2 + 4x + 4`]);
  chain([r`(3x + 4)^2 - (x + 2)^2 = 8x^2 + 20x + 12`]);
  C.assert(ev('8x^2+20x+12', { x: 6 }) === 420 && 22 ** 2 - 8 ** 2 === 420 && 420 * 45 === 18900, 'area 420, cost 18900 and the direct check');
  C.model([420, 18900]);
  C.sol([420, 484, 64]);
});
Q('l02', mk.long({ marks: 10, stem: r`A rectangular banner is $(n + 9)$ m long and $(n - 6)$ m wide.
(a) Expand $(n + 9)(n - 6)$. [3]
(b) Put $n = 100$ in your answer to find $109 \times 94$ without long multiplication. [3]
(c) For $n = 12$, write down the length and width, find the perimeter, and verify the area of the banner using your expansion. [4]`, model: r`(a) $(n + 9)(n - 6) = n^2 + (9 - 6)n + 9 \times (-6) = n^2 + 3n - 54$.
(b) $109 \times 94 = 100^2 + 3 \times 100 - 54 = 10000 + 300 - 54 = 10246$.
(c) Length $= 21$ m, width $= 6$ m, perimeter $= 2(21 + 6) = 54$ m. Area from the expansion: $144 + 36 - 54 = 126$ m$^2$, and $21 \times 6 = 126$ m$^2$.`, sol: r`(a) Use $(x + a)(x + b) = x^2 + (a + b)x + ab$ with $a = 9$ and $b = -6$.
(b) $n + 9 = 109$ and $n - 6 = 94$ when $n = 100$, so $109 \times 94 = 10000 + 300 - 54 = 10246$.
(c) $n + 9 = 21$ and $n - 6 = 6$. The expansion gives $144 + 36 - 54 = 126$ and $21 \times 6 = 126$, so the two ways of finding the area agree.`, scheme: S(['(a) Sum $3$ and product $-54$ found', 1], ['(a) $n^2 + 3n - 54$', 2], ['(b) Recognises $n = 100$ gives $109$ and $94$', 1], ['(b) $10246$', 2], ['(c) Length $21$, width $6$, perimeter $54$ m', 2], ['(c) Area $126$ from the expansion and from $21 \\times 6$', 2]), d: 3, c: 'application', t: [1, 4], time: 600 }), (C) => {
  chain([r`(n + 9)(n - 6) = n^2 + 3n - 54`]);
  chain([r`109 \times 94 = 100^2 + 300 - 54 = 10246`]);
  C.assert(109 * 94 === 10246 && ev('n^2+3n-54', { n: 12 }) === 126 && 21 * 6 === 126 && 2 * (21 + 6) === 54, 'values');
  C.model([10246, 54, 126]);
  C.sol([10246, 126]);
});
Q('l03', mk.long({ marks: 10, stem: r`A cuboid box has length $l$ cm, breadth $b$ cm and height $h$ cm, with $l + b + h = 29$ and total surface area $552$ cm$^2$.
(a) Write down the expansion of $(l + b + h)^2$. [3]
(b) Find $l^2 + b^2 + h^2$ and hence the length of the space diagonal of the box. [3]
(c) Show that $(l - b)^2 + (b - h)^2 + (h - l)^2 = 2(l^2 + b^2 + h^2) - 2(lb + bh + hl)$ and find its value for this box. [4]`, model: r`(a) $(l + b + h)^2 = l^2 + b^2 + h^2 + 2lb + 2bh + 2hl$.
(b) $lb + bh + hl = 552 \div 2 = 276$. $l^2 + b^2 + h^2 = 29^2 - 2 \times 276 = 841 - 552 = 289$. Space diagonal $= \sqrt{289} = 17$ cm.
(c) Expanding, each squared difference gives two squares and a cross term, so the sum is $2(l^2 + b^2 + h^2) - 2(lb + bh + hl)$. Value $= 2 \times 289 - 2 \times 276 = 578 - 552 = 26$.`, sol: r`(a) Three squares and three cross terms, each cross term doubled.
(b) The total surface area is $2(lb + bh + hl)$, so the sum of the products is $276$. The diagonal is $\sqrt{l^2 + b^2 + h^2}$, and $l^2 + b^2 + h^2 = 841 - 552 = 289$.
(c) Check with the edges $12$, $9$, $8$ (sum $29$, area $2(108 + 72 + 96) = 552$): the differences are $3$, $1$, $4$ and $9 + 1 + 16 = 26$.`, scheme: S(['(a) Three squared terms', 1], ['(a) Three cross terms, each doubled', 2], ['(b) $lb + bh + hl = 276$ and $l^2 + b^2 + h^2 = 289$', 2], ['(b) Space diagonal $17$ cm', 1], ['(c) Shows the identity by expanding', 2], ['(c) Value $26$', 2]), d: 4, c: 'application', t: [2], time: 600 }), (C) => {
  chain([r`(l + b + h)^2 = l^2 + b^2 + h^2 + 2lb + 2bh + 2hl`]);
  chain([r`(l - b)^2 + (b - h)^2 + (h - l)^2 = 2l^2 + 2b^2 + 2h^2 - 2lb - 2bh - 2hl`]);
  const env = { l: 12, b: 9, h: 8 };
  C.assert(ev('l+b+h', env) === 29 && 2 * ev('lb+bh+hl', env) === 552, 'witness 12, 9, 8');
  C.assert(ev('l^2+b^2+h^2', env) === 289 && Math.sqrt(289) === 17 && ev('(l-b)^2+(b-h)^2+(h-l)^2', env) === 26 && 2 * 289 - 2 * 276 === 26, 'values 289, 17, 26');
  C.model([276, 289, 17, 26]);
  C.sol([276, 289, 26]);
});
Q('l04', mk.long({ marks: 10, stem: r`The real numbers $a$, $b$, $c$ satisfy $a + b + c = 0$.
(a) Show that $a^2 + b^2 + c^2 = -2(ab + bc + ca)$. [3]
(b) If $a^2 + b^2 + c^2 = 74$, find $ab + bc + ca$. [3]
(c) Using (a), (b) and the expansion of the three squared differences, find $(a - b)^2 + (b - c)^2 + (c - a)^2$. [4]`, model: r`(a) $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$. Since $a + b + c = 0$, the left side is $0$, so $a^2 + b^2 + c^2 = -2(ab + bc + ca)$.
(b) $74 = -2(ab + bc + ca)$, so $ab + bc + ca = -37$.
(c) $(a - b)^2 + (b - c)^2 + (c - a)^2 = 2(a^2 + b^2 + c^2) - 2(ab + bc + ca) = 148 - 2 \times (-37) = 148 + 74 = 222$.`, sol: r`(a) Put $a + b + c = 0$ in the identity for $(a + b + c)^2$.
(b) Divide $74$ by $-2$.
(c) Each squared difference contributes two squares and a cross term, so the sum is $2 \times 74 - 2 \times (-37) = 222$. Check with $a = 4$, $b = 3$, $c = -7$: sum $0$, squares $16 + 9 + 49 = 74$, differences $1$, $10$, $-11$ and $1 + 100 + 121 = 222$.`, scheme: S(['(a) Expands $(a + b + c)^2$', 1], ['(a) Uses $a + b + c = 0$ to reach $-2(ab + bc + ca)$', 2], ['(b) $ab + bc + ca = -37$', 3], ['(c) Expansion $2(a^2 + b^2 + c^2) - 2(ab + bc + ca)$', 2], ['(c) Substitutes and gets $222$', 2]), d: 4, c: 'analysis', t: [2], time: 600 }), (C) => {
  chain([r`(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca`]);
  const env = { a: 4, b: 3, c: -7 };
  C.assert(ev('a+b+c', env) === 0 && ev('a^2+b^2+c^2', env) === 74 && ev('ab+bc+ca', env) === -37, 'witness 4, 3, -7');
  C.assert(ev('(a-b)^2+(b-c)^2+(c-a)^2', env) === 222 && 2 * 74 + 74 === 222, 'value 222');
  C.model([74, 37, 222]);
  C.sol([37, 222]);
});
Q('l05', mk.long({ marks: 10, stem: r`(a) Multiply $(a + b)$ by $(a^2 + 2ab + b^2)$ to show that $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. [3]
(b) A cubical gift box has an edge of $(2x + 1)$ cm. Expand to write its volume in terms of $x$. [3]
(c) A cube has an edge of $2x$ cm and a layer of foam is added so that its edge becomes $(2x + 1)$ cm. For $x = 4$, find the volume of the foam. [4]`, model: r`(a) $(a + b)(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3$.
(b) $(2x + 1)^3 = 8x^3 + 3(4x^2)(1) + 3(2x)(1) + 1 = 8x^3 + 12x^2 + 6x + 1$.
(c) Foam volume $= (2x + 1)^3 - (2x)^3 = 12x^2 + 6x + 1$. For $x = 4$: $192 + 24 + 1 = 217$ cm$^3$.`, sol: r`(a) Multiply each term of the first bracket by each term of the second, then collect like terms.
(b) Use the identity with $a = 2x$ and $b = 1$.
(c) The $8x^3$ terms cancel. Check: edge $9$ cm gives $729$, edge $8$ cm gives $512$, and $729 - 512 = 217$.`, scheme: S(['(a) Six products written out', 1], ['(a) Like terms collected to the identity', 2], ['(b) Identity with $a = 2x$, $b = 1$', 1], ['(b) $8x^3 + 12x^2 + 6x + 1$', 2], ['(c) Foam volume $12x^2 + 6x + 1$', 2], ['(c) $217$ cm$^3$', 2]), d: 3, c: 'application', t: [3], time: 600 }), (C) => {
  chain([r`(a + b)(a^2 + 2ab + b^2) = a^3 + 3a^2b + 3ab^2 + b^3`]);
  chain([r`(2x + 1)^3 = 8x^3 + 12x^2 + 6x + 1`]);
  chain([r`(2x + 1)^3 - (2x)^3 = 12x^2 + 6x + 1`]);
  C.assert(ev('12x^2+6x+1', { x: 4 }) === 217 && 9 ** 3 - 8 ** 3 === 217, 'foam 217');
  C.model([217, 12, 6]);
  C.sol([217, 729, 512]);
});
Q('l06', mk.long({ marks: 10, stem: r`A number $a$ satisfies $a + \dfrac{1}{a} = 7$.
(a) Find the value of $a^2 + \dfrac{1}{a^2}$. [3]
(b) Find the value of $a^3 + \dfrac{1}{a^3}$. [3]
(c) Using the result of (b), find the value of $a^6 + \dfrac{1}{a^6}$. [4]`, model: r`(a) $\left(a + \dfrac{1}{a}\right)^2 = a^2 + 2 + \dfrac{1}{a^2} = 49$, so $a^2 + \dfrac{1}{a^2} = 47$.
(b) $\left(a + \dfrac{1}{a}\right)^3 = a^3 + \dfrac{1}{a^3} + 3\left(a + \dfrac{1}{a}\right)$, so $a^3 + \dfrac{1}{a^3} = 343 - 21 = 322$.
(c) $\left(a^3 + \dfrac{1}{a^3}\right)^2 = a^6 + 2 + \dfrac{1}{a^6}$, so $a^6 + \dfrac{1}{a^6} = 322^2 - 2 = 103684 - 2 = 103682$.`, sol: r`(a) Square the given equation: $49 = a^2 + 2 + \dfrac{1}{a^2}$, so the sum of squares is $47$; the cross term $2 \times a \times \dfrac{1}{a}$ is $2$.
(b) Cube the given equation; the middle terms $3a + \dfrac{3}{a}$ make $3 \times 7 = 21$.
(c) Square $a^3 + \dfrac{1}{a^3} = 322$: the cross term is again $2$. Also $322^2 = 103684$.`, scheme: S(['(a) Squares the given equation', 1], ['(a) $47$', 2], ['(b) Cubes the given equation, with the $3 \\times 7$ term', 1], ['(b) $322$', 2], ['(c) Squares $a^3 + \\dfrac{1}{a^3}$, with the cross term $2$', 2], ['(c) $103682$', 2]), d: 4, c: 'application', t: [3], time: 600 }), (C) => {
  const a = reciprocalRoot(7);
  C.assert(close(ev('a+\\dfrac{1}{a}', { a }), 7), 'witness a = (7 + sqrt 45)/2');
  C.assert(close(ev('a^2+\\dfrac{1}{a^2}', { a }), 47) && close(ev('a^3+\\dfrac{1}{a^3}', { a }), 322) && close(ev('a^6+\\dfrac{1}{a^6}', { a }), 103682, 1e-9), 'values at the witness');
  chain([r`(a + \dfrac{1}{a})^2 = a^2 + 2 + \dfrac{1}{a^2}`]);
  chain([r`(a^3 + \dfrac{1}{a^3})^2 = a^6 + 2 + \dfrac{1}{a^6}`]);
  C.assert(322 ** 2 === 103684 && 343 - 21 === 322 && 49 - 2 === 47, 'arithmetic');
  C.model([47, 322, 103682]);
  C.sol([47, 322, 103684]);
});
Q('l07', mk.long({ marks: 10, stem: r`Use suitable identities, and show the working, to find
(a) $203^2$ [3]
(b) $1008 \times 992$ [3]
(c) $97^3$ [4]`, model: r`(a) $203^2 = (200 + 3)^2 = 40000 + 2 \times 200 \times 3 + 9 = 40000 + 1200 + 9 = 41209$.
(b) $1008 \times 992 = (1000 + 8)(1000 - 8) = 1000^2 - 8^2 = 1000000 - 64 = 999936$.
(c) $97^3 = (100 - 3)^3 = 100^3 - 3 \times 100^2 \times 3 + 3 \times 100 \times 3^2 - 3^3 = 1000000 - 90000 + 2700 - 27 = 912673$.`, sol: r`(a) Use $(a + b)^2 = a^2 + 2ab + b^2$ with $a = 200$, $b = 3$: $41209$.
(b) The numbers are $1000$ plus and minus $8$, so use $(a + b)(a - b) = a^2 - b^2$: $999936$.
(c) Use $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$ with $a = 100$, $b = 3$: $912673$.`, scheme: S(['(a) $(200 + 3)^2$ expanded with the middle term', 2], ['(a) $41209$', 1], ['(b) Writes $(1000 + 8)(1000 - 8)$ and $1000^2 - 8^2$', 2], ['(b) $999936$', 1], ['(c) $(100 - 3)^3$ with all four terms and signs', 2], ['(c) $912673$', 2]), d: 3, c: 'application', t: [4], time: 600 }), (C) => {
  chain([r`203^2 = (200 + 3)^2 = 40000 + 1200 + 9 = 41209`]);
  chain([r`1008 \times 992 = (1000 + 8)(1000 - 8) = 1000^2 - 8^2 = 999936`]);
  chain([r`97^3 = (100 - 3)^3 = 1000000 - 90000 + 2700 - 27 = 912673`]);
  C.assert(203 ** 2 === 41209 && 1008 * 992 === 999936 && 97 ** 3 === 912673, 'direct values');
  C.model([41209, 999936, 912673]);
  C.sol([41209, 999936, 912673]);
});
Q('l08', mk.long({ marks: 10, stem: r`Three students make mistakes. Find each mistake, and give the correct result.
(a) Arjun writes $(2x - 3y)^2 = 4x^2 - 9y^2$. [3]
(b) Bela writes $(a + b + c)^2 = a^2 + b^2 + c^2 + ab + bc + ca$. Test her claim with $a = b = c = 1$, and correct it. [3]
(c) Chitra writes $(a + b)^3 = a^3 + b^3 + 3ab$. Test her claim with $a = 2$, $b = 1$, and write the correct expansion. [4]`, model: r`(a) Arjun has left out the middle term. $(2x - 3y)^2 = 4x^2 - 12xy + 9y^2$.
(b) With $a = b = c = 1$ the left side is $3^2 = 9$ but Bela's right side is $3 + 3 = 6$. Each cross term must be doubled: $(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$, which gives $3 + 6 = 9$.
(c) With $a = 2$, $b = 1$ the left side is $27$ but Chitra's right side is $8 + 1 + 6 = 15$. The missing part is $3ab(a + b) = 18$, so $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 = 8 + 12 + 6 + 1 = 27$.`, sol: r`(a) Arjun squared each term but never formed $2 \times 2x \times 3y$; the middle term is $-12xy$.
(b) A test with $a = b = c = 1$ disproves the claim: $9 \ne 6$. The correct identity has $2ab + 2bc + 2ca$.
(c) A test with $a = 2$, $b = 1$ disproves the claim: $27 \ne 15$. The four-term expansion restores the value $27$.`, scheme: S(['(a) Names the missing middle term', 1], ['(a) $4x^2 - 12xy + 9y^2$', 2], ['(b) Test values $9$ and $6$', 1], ['(b) Doubles the cross terms', 2], ['(c) Test values $27$ and $15$', 2], ['(c) Correct four-term expansion and its value $27$', 2]), d: 4, c: 'analysis', t: [1, 2, 3], time: 600 }), (C) => {
  chain([r`(2x - 3y)^2 = 4x^2 - 12xy + 9y^2`]);
  C.assert(ev('(a+b+c)^2', { a: 1, b: 1, c: 1 }) === 9 && ev('a^2+b^2+c^2+ab+bc+ca', { a: 1, b: 1, c: 1 }) === 6, 'Bela test 9 vs 6');
  chain([r`(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca`]);
  C.assert(ev('(a+b)^3', { a: 2, b: 1 }) === 27 && ev('a^3+b^3+3ab', { a: 2, b: 1 }) === 15 && ev('3ab(a+b)', { a: 2, b: 1 }) === 18, 'Chitra test 27 vs 15');
  chain([r`(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3`]);
  C.model([12, 9, 6, 27, 15]);
  C.sol([9, 6, 27, 15]);
});

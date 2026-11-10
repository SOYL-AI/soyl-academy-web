// ICSE 9 Mathematics ch04 Factorisation — practice bank with independent re-solve checks.
// Option expressions, keys and answers are typed as literals; each check recomputes them with fact.mjs (exact integer
// polynomial arithmetic in several variables): every factorisation is multiplied back and compared with the original
// expression, "complete" factorisations are tested for a remaining common factor or a quadratic bracket that still
// splits, and every split of a middle term is asserted (p + q = b, pq = ac).
import { Q, mk, r } from './lib.mjs';
import { P, chain, canon, fcanon, full, isDOS, splitPair, assertSplit, hcfMono, trinomial, splits, val, same } from './fact.mjs';

const O = (a) => a.map((s) => `$${s}$`);
/** Typed options expand to exactly one polynomial equal to the target. */
const WP = (C, opts, target) => C.which(opts.map(canon), canon(target));
/** Typed options: exactly one equals the original expression AND is a complete factorisation. */
const WF = (C, opts, orig) => C.which(opts.map(fcanon), `${canon(orig)}|full`);
const sgn = (n) => (n < 0 ? '-' : '+');

// =============================================================== MCQ
const m01 = ['6pq', '6p^2q^3', '2pq', '360p^3q^3'];
Q('m01', mk.mcq({ stem: r`The highest common factor of the terms $18p^2q^3$, $24pq^2$ and $30p^3q$ is`, opts: O(m01), key: 'a', sol: r`The numerical HCF of $18$, $24$ and $30$ is $6$. The lowest power of $p$ is $p$ (in $24pq^2$) and the lowest power of $q$ is $q$ (in $30p^3q$). So the HCF is $6pq$. The option $360p^3q^3$ is the lowest common multiple, which takes the highest powers.`, d: 1, c: 'recall', t: [1], time: 60 }), (C) => { C.which(m01.map(canon), hcfMono(['18p^2q^3', '24pq^2', '30p^3q'])); });

const m02 = ['5a^2b^2(3a - 7b)', '5ab(3a^2b - 7ab^2)', '5a^2b^2(3a + 7b)', '5a^2b(3ab - 7b^2)'];
Q('m02', mk.mcq({ stem: r`Dev takes out the greatest common factor from $15a^3b^2 - 35a^2b^3$. His result is`, opts: O(m02), key: 'a', sol: r`The HCF of the two terms is $5a^2b^2$, and $15a^3b^2 = 5a^2b^2 \times 3a$, $35a^2b^3 = 5a^2b^2 \times 7b$. So the expression is $5a^2b^2(3a - 7b)$. The second and fourth options multiply back to the same expression but leave a common factor inside the bracket, and the third has the wrong sign.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { chain(r`15a^3b^2 - 35a^2b^3 = 5a^2b^2(3a - 7b)`); WF(C, m02, '15a^3b^2 - 35a^2b^3'); });

const m03 = ['(2a + b)(2x + 3y)', '(2a + b)(2x - 3y)', '(4a + 3b)(x + y)', '(2a + 3b)(2x + y)'];
Q('m03', mk.mcq({ stem: r`Four rectangular beds in a school garden have areas $4ax$, $6ay$, $2bx$ and $3by$ square metres. The total area, written as a product of two factors, is`, opts: O(m03), key: 'a', sol: r`Group the beds in pairs: $4ax + 6ay = 2a(2x + 3y)$ and $2bx + 3by = b(2x + 3y)$. The bracket $(2x + 3y)$ is common, so the total area is $(2a + b)(2x + 3y)$ square metres. The other options expand to $4ax + 4ay + 3bx + 3by$ and similar expressions that differ from the given total.`, d: 3, c: 'application', t: [1], time: 90 }), (C) => { chain(r`4ax + 6ay + 2bx + 3by = 2a(2x + 3y) + b(2x + 3y) = (2a + b)(2x + 3y)`); WF(C, m03, '4ax + 6ay + 2bx + 3by'); });

const m04 = ['(a - b)(5p - 3q)', '(a - b)(5p + 3q)', '(a - b)(3q - 5p)', '(a + b)(5p - 3q)'];
Q('m04', mk.mcq({ stem: r`Written as a product, $5p(a - b) + 3q(b - a)$ is equal to`, opts: O(m04), key: 'a', sol: r`Since $b - a = -(a - b)$, the second term is $-3q(a - b)$. Now $(a - b)$ is a common factor: $5p(a - b) - 3q(a - b) = (a - b)(5p - 3q)$. Forgetting the change of sign gives the wrong option $(a - b)(5p + 3q)$.`, d: 3, c: 'application', t: [1], time: 90 }), (C) => { chain(r`5p(a - b) + 3q(b - a) = 5p(a - b) - 3q(a - b) = (a - b)(5p - 3q)`); WP(C, m04, '5p(a - b) + 3q(b - a)'); });

const m05 = ['36p^4 - 49q^2', '36p^4 + 49q^2', '36p^3 - 49q^2', '36p^4 - 48q^2'];
Q('m05', mk.mcq({ stem: r`Which of these expressions is a difference of two squares?`, opts: O(m05), key: 'a', sol: r`$36p^4 - 49q^2 = (6p^2)^2 - (7q)^2$ has two perfect squares with a minus sign between them. The second has a plus sign, $36p^3$ is not a perfect square because $3$ is odd, and $48$ is not a perfect square.`, d: 1, c: 'recall', t: [2], time: 60 }), (C) => { C.which(m05.map((s) => isDOS(s)), true); chain(r`36p^4 - 49q^2 = (6p^2 - 7q)(6p^2 + 7q)`); });

Q('m06', mk.mcq({ stem: r`Using $a^2 - b^2 = (a - b)(a + b)$, Farida finds the value of $83^2 - 17^2$ without squaring either number. Her answer is`, opts: O(['4356', '6600', '6872', '6500']), key: 'b', sol: r`$83^2 - 17^2 = (83 - 17)(83 + 17) = 66 \times 100 = 6600$. The number $4356$ is $66^2$, which comes from forgetting to multiply by $83 + 17$.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => { C.which([4356, 6600, 6872, 6500], 83 ** 2 - 17 ** 2); C.assert((83 - 17) * (83 + 17) === 6600 && 66 * 66 === 4356, '66 x 100 and 66^2'); });

const m07 = ['2(7x - 2y)(7x + 2y)', '(14x - 4y)(7x + 2y)', '2(49x^2 - 4y^2)', '2(7x - 2y)^2'];
Q('m07', mk.mcq({ stem: r`Gurpreet must factorise $98x^2 - 8y^2$ completely. Which answer is correct?`, opts: O(m07), key: 'a', sol: r`Take out the common factor $2$ first: $98x^2 - 8y^2 = 2(49x^2 - 4y^2)$. Then $49x^2 - 4y^2 = (7x)^2 - (2y)^2 = (7x - 2y)(7x + 2y)$. So the complete factorisation is $2(7x - 2y)(7x + 2y)$. The second option has the same product but $14x - 4y$ still has the factor $2$; the third stops one step early.`, d: 3, c: 'application', t: [1, 2], time: 90 }), (C) => { chain(r`98x^2 - 8y^2 = 2(49x^2 - 4y^2) = 2(7x - 2y)(7x + 2y)`); WF(C, m07, '98x^2 - 8y^2'); });

const m08 = ['(x - y + 3)(x + y - 3)', '(x - y - 3)(x + y + 3)', '(x - y + 3)(x + y + 3)', '(x + y - 3)(x + y + 3)'];
Q('m08', mk.mcq({ stem: r`Rewriting $x^2 - y^2 + 6y - 9$ as $x^2 - (y - 3)^2$ is the first step. The complete factorisation is`, opts: O(m08), key: 'a', sol: r`$x^2 - (y - 3)^2$ is a difference of two squares with $a = x$ and $b = y - 3$, so it equals $(x - (y - 3))(x + (y - 3)) = (x - y + 3)(x + y - 3)$. Take care with the sign: removing the bracket in $x - (y - 3)$ gives $x - y + 3$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { chain(r`x^2 - y^2 + 6y - 9 = x^2 - (y - 3)^2 = (x - y + 3)(x + y - 3)`); WF(C, m08, 'x^2 - y^2 + 6y - 9'); });

const m09 = ['(2p + 5q)(4p^2 - 10pq + 25q^2)', '(2p + 5q)(4p^2 + 10pq + 25q^2)', '(2p - 5q)(4p^2 + 10pq + 25q^2)', '(8p + 125q)(p^2 - pq + q^2)'];
Q('m09', mk.mcq({ stem: r`The factorisation of $8p^3 + 125q^3$ is`, opts: O(m09), key: 'a', sol: r`$8p^3 + 125q^3 = (2p)^3 + (5q)^3$. With $a = 2p$ and $b = 5q$, $a^3 + b^3 = (a + b)(a^2 - ab + b^2) = (2p + 5q)(4p^2 - 10pq + 25q^2)$. For a sum of cubes the middle term of the quadratic factor is negative.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { chain(r`8p^3 + 125q^3 = (2p + 5q)(4p^2 - 10pq + 25q^2)`); WP(C, m09, '8p^3 + 125q^3'); });

const m10 = ['16m^2 + 12m + 9', '16m^2 - 12m + 9', '16m^2 + 24m + 9', '4m^2 + 12m + 9'];
Q('m10', mk.mcq({ stem: r`Rohit's worksheet reads $64m^3 - 27 = (4m - 3)(\ldots)$. The missing factor is`, opts: O(m10), key: 'a', sol: r`$64m^3 - 27 = (4m)^3 - 3^3 = (4m - 3)(16m^2 + 12m + 9)$, because $(a - b)(a^2 + ab + b^2) = a^3 - b^3$ with $a = 4m$, $b = 3$ and $ab = 12m$. For a difference of cubes the middle term is positive.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { C.which(m10.map((o) => canon(`(4m - 3)(${o})`)), canon('64m^3 - 27')); });

const m11 = ['2x(x - 3)(x^2 + 3x + 9)', '2x(x^3 - 27)', '2(x^2 - 3x)(x^2 + 3x + 9)', '2x(x + 3)(x^2 - 3x + 9)'];
Q('m11', mk.mcq({ stem: r`Completely factorised, $2x^4 - 54x$ is`, opts: O(m11), key: 'a', sol: r`First take out the common factor $2x$: $2x^4 - 54x = 2x(x^3 - 27)$. Then $x^3 - 27 = x^3 - 3^3 = (x - 3)(x^2 + 3x + 9)$. So the complete factorisation is $2x(x - 3)(x^2 + 3x + 9)$. The second option stops after one step, and the third has the common factor $x$ still inside a bracket.`, d: 3, c: 'application', t: [1, 3], time: 90 }), (C) => { chain(r`2x^4 - 54x = 2x(x^3 - 27) = 2x(x - 3)(x^2 + 3x + 9)`); WF(C, m11, '2x^4 - 54x'); });

const m12p = [[4, 7], [2, 9], [1, 10], [-3, 14]];
Q('m12', mk.mcq({ stem: r`Rohit wants to factorise $x^2 + 11x + 28$ by splitting the middle term. He should write $11x$ as`, opts: O(m12p.map(([p, q]) => `${p}x ${sgn(q)} ${Math.abs(q)}x`)), key: 'a', sol: r`We need two numbers whose sum is $11$ and whose product is $1 \times 28 = 28$. The pair $4$ and $7$ works: $4 + 7 = 11$ and $4 \times 7 = 28$. So $x^2 + 11x + 28 = x^2 + 4x + 7x + 28 = x(x + 4) + 7(x + 4) = (x + 4)(x + 7)$. The pair $2, 9$ has the right sum but the product $18$.`, d: 2, c: 'understanding', t: [4], time: 75 }), (C) => { const pr = splitPair(1, 11, 28); C.which(m12p, pr); assertSplit(1, 11, 28, ...pr); chain(r`x^2 + 11x + 28 = x^2 + 4x + 7x + 28 = x(x + 4) + 7(x + 4) = (x + 4)(x + 7)`); });

const m13 = ['(2y - 5)(3y + 4)', '(2y + 5)(3y - 4)', '(6y + 5)(y - 4)', '(3y - 5)(2y + 4)'];
Q('m13', mk.mcq({ stem: r`A student splits the middle term of $6y^2 - 7y - 20$ and gets two linear factors. They are`, opts: O(m13), key: 'a', sol: r`Here $ac = 6 \times (-20) = -120$ and $b = -7$. The pair $8$ and $-15$ has sum $-7$ and product $-120$. So $6y^2 - 7y - 20 = 6y^2 + 8y - 15y - 20 = 2y(3y + 4) - 5(3y + 4) = (2y - 5)(3y + 4)$. The option $(2y + 5)(3y - 4)$ gives $+7y$ instead.`, d: 3, c: 'understanding', t: [4], time: 90 }), (C) => { assertSplit(6, -7, -20, ...splitPair(6, -7, -20)); chain(r`6y^2 - 7y - 20 = 6y^2 + 8y - 15y - 20 = 2y(3y + 4) - 5(3y + 4) = (2y - 5)(3y + 4)`); WP(C, m13, '6y^2 - 7y - 20'); });

const m14 = ['(7m - 6)^2', '(7m + 6)^2', '(7m - 6)(7m + 6)', '(49m - 6)(m - 6)'];
Q('m14', mk.mcq({ stem: r`The expression $49m^2 - 84m + 36$ is a perfect square. It is equal to`, opts: O(m14), key: 'a', sol: r`$49m^2 = (7m)^2$, $36 = 6^2$ and the middle term is $-2 \times 7m \times 6 = -84m$, so the expression is $(7m - 6)^2$. Splitting $-84m$ as $-42m - 42m$ gives the same result.`, d: 2, c: 'understanding', t: [4], time: 75 }), (C) => { chain(r`49m^2 - 84m + 36 = (7m - 6)^2`); assertSplit(49, -84, 36, -42, -42); WP(C, m14, '49m^2 - 84m + 36'); });

const m15 = ['(2x + 5y)(2x - 3y)', '(2x - 5y)(2x + 3y)', '(4x + 5y)(x - 3y)', '(2x + 3y)(2x - 5y)'];
Q('m15', mk.mcq({ stem: r`A rectangular banner has area $(4x^2 + 4xy - 15y^2)$ square units. Its sides, as linear expressions in $x$ and $y$, are`, opts: O(m15), key: 'a', sol: r`Here $ac = 4 \times (-15) = -60$ and $b = 4$. The pair $10$ and $-6$ has sum $4$ and product $-60$. So $4x^2 + 4xy - 15y^2 = 4x^2 + 10xy - 6xy - 15y^2 = 2x(2x + 5y) - 3y(2x + 5y) = (2x + 5y)(2x - 3y)$. The options $(2x - 5y)(2x + 3y)$ and $(2x + 3y)(2x - 5y)$ both give $-4xy$.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => { assertSplit(4, 4, -15, ...splitPair(4, 4, -15)); chain(r`4x^2 + 4xy - 15y^2 = 4x^2 + 10xy - 6xy - 15y^2 = 2x(2x + 5y) - 3y(2x + 5y) = (2x + 5y)(2x - 3y)`); WP(C, m15, '4x^2 + 4xy - 15y^2'); });

const m16 = ['3x(x - 4)(x + 3)', '3x(x + 4)(x - 3)', '3(x^2 - 4x)(x + 3)', '3x(x^2 - x - 12)'];
Q('m16', mk.mcq({ stem: r`Completely factorised, $3x^3 - 3x^2 - 36x$ is`, opts: O(m16), key: 'a', sol: r`Take out $3x$: $3x^3 - 3x^2 - 36x = 3x(x^2 - x - 12)$. In the trinomial, split $-x$ as $-4x + 3x$ (sum $-1$, product $-12$): $x^2 - 4x + 3x - 12 = (x - 4)(x + 3)$. The complete factorisation is $3x(x - 4)(x + 3)$. The last option stops before splitting the trinomial.`, d: 3, c: 'application', t: [1, 4], time: 105 }), (C) => { assertSplit(1, -1, -12, ...splitPair(1, -1, -12)); chain(r`3x^3 - 3x^2 - 36x = 3x(x^2 - x - 12) = 3x(x^2 - 4x + 3x - 12) = 3x(x - 4)(x + 3)`); WF(C, m16, '3x^3 - 3x^2 - 36x'); });

const m17 = [
  'The product is correct and the factorisation is complete.',
  'The product is wrong: it does not expand to $2x^2 + 14x + 24$.',
  'The product is correct, but the factorisation is incomplete: $2x + 6$ still has the common factor $2$.',
  'The product is correct, but the factorisation is incomplete: $x + 4$ can be split further.',
];
Q('m17', mk.mcq({ stem: r`Neha factorises $2x^2 + 14x + 24$ as $(2x + 6)(x + 4)$ and writes "done". Which statement is correct?`, opts: m17, key: 'c', sol: r`Expanding, $(2x + 6)(x + 4) = 2x^2 + 8x + 6x + 24 = 2x^2 + 14x + 24$, so the product is right. But $2x + 6 = 2(x + 3)$ still has a common factor, so the work is incomplete. The complete factorisation is $2(x + 3)(x + 4)$. Taking out the common factor $2$ at the start would have avoided this.`, d: 3, c: 'analysis', t: [1, 4], time: 90 }), (C) => { C.assert(same('(2x+6)(x+4)', '2x^2+14x+24') && !full('(2x+6)(x+4)') && full('2(x+3)(x+4)') && same('2(x+3)(x+4)', '2x^2+14x+24'), 'product right, incomplete, complete form 2(x+3)(x+4)'); C.key('c'); });

const m18 = ['a^2 - b^2 + 2bc - c^2', 'a^2 - b^2 - 2bc - c^2', 'a^2 - b^2 - c^2', 'a^2 + b^2 - 2bc + c^2'];
Q('m18', mk.mcq({ stem: r`Which of these expanded expressions has $(a - b + c)$ and $(a + b - c)$ as its two factors?`, opts: O(m18), key: 'a', sol: r`Write the factors as $a - (b - c)$ and $a + (b - c)$. Their product is a difference of two squares: $a^2 - (b - c)^2 = a^2 - b^2 + 2bc - c^2$. The other options have a wrong sign on $2bc$, lack it altogether, or are not a product of these factors.`, d: 4, c: 'analysis', t: [2], time: 105 }), (C) => { chain(r`(a - b + c)(a + b - c) = (a - (b - c))(a + (b - c)) = a^2 - (b - c)^2 = a^2 - b^2 + 2bc - c^2`); C.which(m18.map(canon), canon('(a - b + c)(a + b - c)')); });

const m19 = [38, 98, 68, -82];
Q('m19', mk.mcq({ stem: r`The numbers $x$ and $y$ satisfy $x - y = 2$ and $xy = 15$. The value of $x^3 - y^3$ is`, opts: O(m19.map(String)), key: 'b', sol: r`$x^3 - y^3 = (x - y)(x^2 + xy + y^2)$ and $x^2 + y^2 = (x - y)^2 + 2xy = 4 + 30 = 34$, so $x^2 + xy + y^2 = 34 + 15 = 49$. Hence $x^3 - y^3 = 2 \times 49 = 98$. (Check: $x = 5$, $y = 3$ gives $125 - 27 = 98$.) The option $38$ comes from using $x^2 + xy + y^2 = 4 + 15$.`, d: 4, c: 'analysis', t: [3], time: 120 }), (C) => { const sols = []; for (let x = -30; x <= 30; x++) for (let y = -30; y <= 30; y++) if (x - y === 2 && x * y === 15) sols.push(x ** 3 - y ** 3); C.assert(sols.length === 2 && sols.every((s) => s === 98), 'integer solutions (5, 3) and (-3, -5) both give 98'); C.assert(2 * ((2 * 2) + 3 * 15) === 98, 'identity (x - y)((x - y)^2 + 3xy)'); C.which(m19, sols[0]); });

const m20 = ['2x - 1', '2x + 1', 'x - 1', '2x - 5'];
Q('m20', mk.mcq({ stem: r`Savita's rectangular vegetable plot has area $(2x^2 + 9x - 5)$ square metres and breadth $(x + 5)$ metres. Its length, in metres, is`, opts: O(m20), key: 'a', sol: r`Split $9x$ as $10x - x$ (sum $9$, product $-10 = 2 \times (-5)$): $2x^2 + 10x - x - 5 = 2x(x + 5) - 1(x + 5) = (2x - 1)(x + 5)$. The breadth is $(x + 5)$, so the length is $(2x - 1)$ metres.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => { assertSplit(2, 9, -5, ...splitPair(2, 9, -5)); chain(r`2x^2 + 9x - 5 = 2x^2 + 10x - x - 5 = 2x(x + 5) - 1(x + 5) = (2x - 1)(x + 5)`); C.which(m20.map((o) => canon(`(x + 5)(${o})`)), canon('2x^2 + 9x - 5')); });

// =============================================================== assertion-reason (ICSE 2027 specimen order a b c d)
Q('ar1', mk.ar({ a: r`$x^2 - 49y^2 = (x - 7y)(x + 7y)$.`, r: r`For any two expressions $a$ and $b$, $a^2 - b^2 = (a - b)(a + b)$.`, key: 'c', sol: r`Taking $a = x$ and $b = 7y$ in the identity of R gives $x^2 - 49y^2 = (x - 7y)(x + 7y)$, so A is true. R is a true identity and it is exactly the rule used. Option (c).`, d: 2, c: 'understanding', t: [2] }), (C) => { chain(r`x^2 - 49y^2 = (x - 7y)(x + 7y)`); chain(r`a^2 - b^2 = (a - b)(a + b)`); C.key('c'); });
Q('ar2', mk.ar({ a: r`$p^2 + 49 = (p + 7)(p - 7)$.`, r: r`$(p + 7)(p - 7) = p^2 - 49$.`, key: 'b', sol: r`The product $(p + 7)(p - 7)$ is $p^2 - 49$, so R is true. That is not $p^2 + 49$, so A is false: a sum of two squares has no such factorisation. Option (b).`, d: 2, c: 'analysis', t: [2] }), (C) => { chain(r`(p + 7)(p - 7) = p^2 - 49`); C.assert(!same('p^2+49', '(p+7)(p-7)'), 'A false'); C.key('b'); });
Q('ar3', mk.ar({ a: r`$x^3 - 125 = (x - 5)(x^2 + 5x + 25)$.`, r: r`The factor $x^2 + 5x + 25$ can be split further into two linear factors with integer coefficients.`, key: 'a', sol: r`With $a = x$ and $b = 5$, $a^3 - b^3 = (a - b)(a^2 + ab + b^2) = (x - 5)(x^2 + 5x + 25)$, so A is true. For R we would need two integers with sum $5$ and product $25$; none exist (the discriminant is $25 - 100 < 0$), so R is false. Option (a).`, d: 3, c: 'analysis', t: [3, 4] }), (C) => { chain(r`x^3 - 125 = (x - 5)(x^2 + 5x + 25)`); C.assert(splitPair(1, 5, 25) === null && !splits('x^2 + 5x + 25'), 'x^2 + 5x + 25 does not split'); C.key('a'); });
Q('ar4', mk.ar({ a: r`$2x^2 - 8 = 2(x - 2)(x + 2)$.`, r: r`If every term of an expression has a common factor, the expression equals that factor multiplied by a bracket.`, key: 'd', sol: r`$2x^2 - 8 = 2(x^2 - 4) = 2(x - 2)(x + 2)$, so A is true. R is also a true statement about common factors, but it only explains the first step. The splitting of $x^2 - 4$ into $(x - 2)(x + 2)$ comes from the difference of two squares, which R does not mention. Option (d).`, d: 2, c: 'analysis', t: [1, 2] }), (C) => { chain(r`2x^2 - 8 = 2(x^2 - 4) = 2(x - 2)(x + 2)`); C.key('d'); });
Q('ar5', mk.ar({ a: r`$x^2 + 7x + 12 = (x + 3)(x + 4)$.`, r: r`The middle term $7x$ is split as $3x + 4x$, where $3 + 4 = 7$ and $3 \times 4 = 12$, the constant term.`, key: 'c', sol: r`$x^2 + 7x + 12 = x^2 + 3x + 4x + 12 = x(x + 3) + 4(x + 3) = (x + 3)(x + 4)$, so A is true. R states the condition on the split pair (sum $= 7$, product $= 12$), which is why this split works. Option (c).`, d: 2, c: 'understanding', t: [4] }), (C) => { chain(r`x^2 + 7x + 12 = x^2 + 3x + 4x + 12 = x(x + 3) + 4(x + 3) = (x + 3)(x + 4)`); assertSplit(1, 7, 12, 3, 4); C.key('c'); });

// =============================================================== true / false
Q('tf1', mk.tf({ stem: r`Taking out the common factor of $12m^2n - 18mn^2$ gives $6mn(2m - 3n)$.`, key: 't', sol: r`The HCF of the terms is $6mn$, and $12m^2n = 6mn \times 2m$, $18mn^2 = 6mn \times 3n$. So $12m^2n - 18mn^2 = 6mn(2m - 3n)$; multiplying back gives the original expression.`, d: 1, c: 'understanding', t: [1] }), (C) => { chain(r`12m^2n - 18mn^2 = 6mn(2m - 3n)`); C.key('t'); });
Q('tf2', mk.tf({ stem: r`The expression $a^2 - 2ab + b^2 - c^2$ can be written as the difference of two squares $(a - b)^2 - c^2$.`, key: 't', sol: r`The first three terms form a perfect square: $a^2 - 2ab + b^2 = (a - b)^2$. So the expression is $(a - b)^2 - c^2$, which factorises as $(a - b - c)(a - b + c)$.`, d: 3, c: 'analysis', t: [2] }), (C) => { chain(r`a^2 - 2ab + b^2 - c^2 = (a - b)^2 - c^2 = (a - b - c)(a - b + c)`); C.key('t'); });
Q('tf3', mk.tf({ stem: r`The sum $x^3 + 8$ and the difference $x^3 - 8$ have the same quadratic factor, $x^2 - 2x + 4$.`, key: 'f', sol: r`$x^3 + 8 = (x + 2)(x^2 - 2x + 4)$ but $x^3 - 8 = (x - 2)(x^2 + 2x + 4)$. The signs of the middle term differ, so the quadratic factors are different.`, d: 2, c: 'understanding', t: [3] }), (C) => { chain(r`x^3 + 8 = (x + 2)(x^2 - 2x + 4)`); chain(r`x^3 - 8 = (x - 2)(x^2 + 2x + 4)`); C.assert(!same('x^2-2x+4', 'x^2+2x+4'), 'different quadratic factors'); C.key('f'); });
Q('tf4', mk.tf({ stem: r`The trinomial $x^2 + 6x + 10$ can be written as a product of two linear factors with integer coefficients.`, key: 'f', sol: r`We would need two integers with sum $6$ and product $10$. The factor pairs of $10$ are $1, 10$ and $2, 5$, with sums $11$ and $7$, so none works. The trinomial does not split over the integers.`, d: 3, c: 'analysis', t: [4] }), (C) => { C.assert(splitPair(1, 6, 10) === null && !splits('x^2 + 6x + 10'), 'no integer pair'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`$x^4 - 256 = (x - 4)(x + 4)(x^2 + 16)$ is a complete factorisation of $x^4 - 256$.`, key: 't', sol: r`$x^4 - 256 = (x^2)^2 - 16^2 = (x^2 - 16)(x^2 + 16)$, and $x^2 - 16 = (x - 4)(x + 4)$. The remaining factor $x^2 + 16$ is a sum of two squares and cannot be split further, so the factorisation is complete.`, d: 3, c: 'analysis', t: [2] }), (C) => { chain(r`x^4 - 256 = (x^2 - 16)(x^2 + 16) = (x - 4)(x + 4)(x^2 + 16)`); C.assert(full('(x-4)(x+4)(x^2+16)'), 'complete'); C.key('t'); });
Q('tf6', mk.tf({ stem: r`The expressions $5x(b - a)$ and $2y(a - b)$ have the bracket $(a - b)$ as a common factor.`, key: 't', sol: r`$5x(b - a) = -5x(a - b)$, so both expressions contain the factor $(a - b)$. For example, $5x(b - a) + 2y(a - b) = (a - b)(2y - 5x)$.`, d: 2, c: 'understanding', t: [1] }), (C) => { chain(r`5x(b - a) = -5x(a - b)`); chain(r`5x(b - a) + 2y(a - b) = (a - b)(2y - 5x)`); C.key('t'); });

// =============================================================== fill in the blanks
Q('fb1', mk.fill({ stem: r`$14a^2b - 21ab^2 = 7ab(2a - kb)$, where $k = $ ____.`, acc: [['3']], sol: r`$14a^2b = 7ab \times 2a$ and $21ab^2 = 7ab \times 3b$, so $14a^2b - 21ab^2 = 7ab(2a - 3b)$ and $k = 3$.`, d: 1, c: 'understanding', t: [1] }), (C) => { chain(r`14a^2b - 21ab^2 = 7ab(2a - 3b)`); C.blank(3); });
Q('fb2', mk.fill({ stem: r`Using a difference of two squares, $1001^2 - 999^2 = $ ____.`, acc: [['4000']], sol: r`$1001^2 - 999^2 = (1001 - 999)(1001 + 999) = 2 \times 2000 = 4000$.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.blank(1001 ** 2 - 999 ** 2); });
Q('fb3', mk.fill({ stem: r`$m^3 + 64 = (m + 4)(m^2 - 4m + k)$, where $k = $ ____.`, acc: [['16']], sol: r`$m^3 + 64 = m^3 + 4^3 = (m + 4)(m^2 - 4m + 16)$, so $k = 4^2 = 16$.`, d: 2, c: 'understanding', t: [3] }), (C) => { chain(r`m^3 + 64 = (m + 4)(m^2 - 4m + 16)`); C.blank(16); });
Q('fb4', mk.fill({ stem: r`To factorise $2x^2 + 13x + 15$ by splitting the middle term, the two numbers must add up to $13$ and multiply to ____.`, acc: [['30']], sol: r`The product of the two numbers equals $ac = 2 \times 15 = 30$. The pair $3$ and $10$ has sum $13$ and product $30$.`, d: 2, c: 'understanding', t: [4] }), (C) => { const [a, b, c] = trinomial('2x^2 + 13x + 15'); const [p, q] = splitPair(a, b, c); assertSplit(a, b, c, p, q); C.blank(p * q); });
Q('fb5', mk.fill({ stem: r`$x^2 - y^2 + 10y - 25 = (x - y + k)(x + y - k)$, where $k = $ ____.`, acc: [['5']], sol: r`$x^2 - y^2 + 10y - 25 = x^2 - (y^2 - 10y + 25) = x^2 - (y - 5)^2 = (x - y + 5)(x + y - 5)$, so $k = 5$.`, d: 3, c: 'application', t: [2] }), (C) => { chain(r`x^2 - y^2 + 10y - 25 = x^2 - (y^2 - 10y + 25) = x^2 - (y - 5)^2 = (x - y + 5)(x + y - 5)`); C.blank(5); });
Q('fb6', mk.fill({ stem: r`If $x^2 - kx + 54 = (x - 6)(x - 9)$ for every value of $x$, then $k = $ ____.`, acc: [['15']], sol: r`$(x - 6)(x - 9) = x^2 - 9x - 6x + 54 = x^2 - 15x + 54$, so $k = 15$.`, d: 1, c: 'understanding', t: [4] }), (C) => { chain(r`x^2 - 15x + 54 = (x - 6)(x - 9)`); C.blank(15); });

// =============================================================== numerical
Q('n01', mk.num({ stem: r`The area of Sheela's rectangular plot is $(x^2 + 12x + 35)$ square metres, and its sides are linear expressions in $x$. When $x = 9$, the perimeter of the plot, in metres, is`, value: 60, sol: r`Split $12x$ as $5x + 7x$ (sum $12$, product $35$): $x^2 + 12x + 35 = (x + 5)(x + 7)$. When $x = 9$ the sides are $14$ m and $16$ m, so the perimeter is $2 \times (14 + 16) = 60$ m.`, scheme: [['Factorise: (x + 5)(x + 7)', 0.5], ['Sides 14 and 16, perimeter 60', 0.5]], d: 3, c: 'application', t: [4], unit: 'm', time: 90 }), (C) => { assertSplit(1, 12, 35, 5, 7); chain(r`x^2 + 12x + 35 = x^2 + 5x + 7x + 35 = (x + 5)(x + 7)`); C.assert(val('x^2+12x+35', { x: 9 }) === 14 * 16, 'area at x = 9 is 14 x 16'); C.val(2 * (val('x+5', { x: 9 }) + val('x+7', { x: 9 }))); });
Q('n02', mk.num({ stem: r`Using a difference of two squares, evaluate $\dfrac{57^2 - 43^2}{14}$.`, value: 100, sol: r`$\dfrac{57^2 - 43^2}{14} = \dfrac{(57 - 43)(57 + 43)}{14} = \dfrac{14 \times 100}{14} = 100$, because $57 - 43 = 14$ cancels the divisor.`, scheme: [['(57 - 43)(57 + 43) = 14 x 100', 0.5], ['Cancelling 14 gives 100', 0.5]], d: 3, c: 'application', t: [2], time: 90 }), (C) => { C.val((57 ** 2 - 43 ** 2) / 14); });
Q('n03', mk.num({ stem: r`The numbers $x$ and $y$ satisfy $x + y = 7$ and $xy = 10$. Find the value of $x^3 + y^3$.`, value: 133, marks: 2, sol: r`$x^3 + y^3 = (x + y)(x^2 - xy + y^2)$ and $x^2 + y^2 = (x + y)^2 - 2xy = 49 - 20 = 29$. So $x^2 - xy + y^2 = 29 - 10 = 19$ and $x^3 + y^3 = 7 \times 19 = 133$. (Check: $x = 2$, $y = 5$ gives $8 + 125 = 133$.)`, scheme: [['Factor: (x + y)(x^2 - xy + y^2) with x^2 + y^2 = 29', 1], ['7 x 19 = 133', 1]], d: 4, c: 'analysis', t: [3], time: 120 }), (C) => { const sols = []; for (let x = -30; x <= 30; x++) for (let y = -30; y <= 30; y++) if (x + y === 7 && x * y === 10) sols.push(x ** 3 + y ** 3); C.assert(sols.length === 2 && sols.every((s) => s === 133) && 7 * (49 - 20 - 10) === 133, 'both integer solutions give 133'); C.val(sols[0]); });
Q('n04', mk.num({ stem: r`A trader sold $15.4$ kg of millet at ₹ $8.5$ per kg and later bought back $5.4$ kg of it at the same rate. The trader's net sale, in rupees, is $8.5 \times 15.4 - 8.5 \times 5.4$. Use a common factor to find it.`, value: 85, sol: r`Take out the common factor $8.5$: $8.5 \times 15.4 - 8.5 \times 5.4 = 8.5 \times (15.4 - 5.4) = 8.5 \times 10 = 85$ rupees.`, scheme: [['Common factor 8.5 taken out', 0.5], ['8.5 x 10 = 85', 0.5]], d: 2, c: 'understanding', t: [1], unit: 'rupees', time: 75 }), (C) => { C.val(Math.round((8.5 * 15.4 - 8.5 * 5.4) * 1e6) / 1e6); });
Q('n05', mk.num({ stem: r`The trinomial $12x^2 - 7x - 10$ factorises as $(3x + 2)(4x - k)$. Find $k$.`, value: 5, sol: r`Here $ac = 12 \times (-10) = -120$ and $b = -7$; the pair $-15$ and $8$ works. $12x^2 - 15x + 8x - 10 = 3x(4x - 5) + 2(4x - 5) = (3x + 2)(4x - 5)$, so $k = 5$.`, scheme: [['Split pair -15 and 8', 0.5], ['Factors (3x + 2)(4x - 5), so k = 5', 0.5]], d: 3, c: 'understanding', t: [4], time: 90 }), (C) => { assertSplit(12, -7, -10, ...splitPair(12, -7, -10)); chain(r`12x^2 - 7x - 10 = 12x^2 - 15x + 8x - 10 = 3x(4x - 5) + 2(4x - 5) = (3x + 2)(4x - 5)`); C.val(5); });
Q('n06', mk.num({ stem: r`Two numbers $a$ and $b$ differ by $3$ ($a - b = 3$), and the difference of their squares is $a^2 - b^2 = 21$. Work out $a^3 - b^3$.`, value: 117, marks: 2, sol: r`$a^2 - b^2 = (a - b)(a + b)$, so $a + b = 21 \div 3 = 7$. With $a - b = 3$ this gives $a = 5$ and $b = 2$, so $a^3 - b^3 = 125 - 8 = 117$.`, scheme: [['a + b = 7 from the difference of squares', 1], ['a = 5, b = 2, so 125 - 8 = 117', 1]], d: 4, c: 'analysis', t: [2, 3], time: 120 }), (C) => { const sols = []; for (let a = -30; a <= 30; a++) for (let b = -30; b <= 30; b++) if (a - b === 3 && a * a - b * b === 21) sols.push(a ** 3 - b ** 3); C.assert(sols.length === 1 && 3 * (9 + 3 * 10) === 117, 'unique solution (5, 2); identity (a - b)((a - b)^2 + 3ab)'); C.val(sols[0]); });
Q('n07', mk.num({ stem: r`The floor of a rectangular stage has area $(6x^2 + 13x - 15)$ square metres, and its sides are linear expressions in $x$ with whole-number coefficients. When $x = 4$, find the length, in metres, of the longer side.`, value: 19, marks: 2, sol: r`Here $ac = 6 \times (-15) = -90$ and $b = 13$; the pair $18$ and $-5$ works. $6x^2 + 18x - 5x - 15 = 6x(x + 3) - 5(x + 3) = (6x - 5)(x + 3)$. At $x = 4$ the sides are $6x - 5 = 6 \times 4 - 5 = 19$ m and $x + 3 = 4 + 3 = 7$ m, so the longer side is $19$ m.`, scheme: [['Split 13x as 18x - 5x', 1], ['Sides (6x - 5) and (x + 3); at x = 4 the longer side is 19', 1]], d: 4, c: 'application', t: [4], unit: 'm', time: 135 }), (C) => { assertSplit(6, 13, -15, ...splitPair(6, 13, -15)); chain(r`6x^2 + 13x - 15 = 6x^2 + 18x - 5x - 15 = 6x(x + 3) - 5(x + 3) = (6x - 5)(x + 3)`); const L = Math.max(val('6x-5', { x: 4 }), val('x+3', { x: 4 })); C.assert(val('6x^2+13x-15', { x: 4 }) === 19 * 7, 'area 133 = 19 x 7'); C.val(L); });

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Factorise $24a^2b - 36ab^2 + 12ab$ completely.`, model: r`The HCF of the three terms is $12ab$.

$24a^2b - 36ab^2 + 12ab = 12ab(2a - 3b + 1)$.`, sol: r`$24a^2b = 12ab \times 2a$, $36ab^2 = 12ab \times 3b$ and $12ab = 12ab \times 1$. The last term leaves $1$ in the bracket; it must not be dropped.`, scheme: [['HCF 12ab identified', 1], ['Bracket 2a - 3b + 1 (with the 1)', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { chain(r`24a^2b - 36ab^2 + 12ab = 12ab(2a - 3b + 1)`); C.assert(full('12ab(2a - 3b + 1)') && hcfMono(['24a^2b', '36ab^2', '12ab']) === canon('12ab'), 'HCF 12ab; complete'); C.model(['12ab(2a - 3b + 1)']); });
Q('s202', mk.short({ marks: 2, stem: r`Factorise $6pq + 9pr - 8qs - 12rs$.`, model: r`Group in pairs: $6pq + 9pr - 8qs - 12rs = 3p(2q + 3r) - 4s(2q + 3r)$.

Take out the common bracket: $(3p - 4s)(2q + 3r)$.`, sol: r`The pair $-8qs - 12rs$ has the common factor $-4s$, which leaves the same bracket $(2q + 3r)$ as in the first pair.`, scheme: [['Pairs grouped: 3p(2q + 3r) - 4s(2q + 3r)', 1], ['Common bracket taken out: (3p - 4s)(2q + 3r)', 1]], d: 3, c: 'application', t: [1], time: 105 }), (C) => { chain(r`6pq + 9pr - 8qs - 12rs = 3p(2q + 3r) - 4s(2q + 3r) = (3p - 4s)(2q + 3r)`); C.model(['(3p - 4s)(2q + 3r)']); });
Q('s203', mk.short({ marks: 2, stem: r`Factorise $75m^2 - 12n^2$ completely.`, model: r`Take out $3$: $75m^2 - 12n^2 = 3(25m^2 - 4n^2)$.

Then $25m^2 - 4n^2 = (5m)^2 - (2n)^2$, so the result is $3(5m - 2n)(5m + 2n)$.`, sol: r`Common factor first, then the difference of two squares.`, scheme: [['Common factor 3 taken out', 1], ['Difference of squares: 3(5m - 2n)(5m + 2n)', 1]], d: 3, c: 'application', t: [1, 2], time: 90 }), (C) => { chain(r`75m^2 - 12n^2 = 3(25m^2 - 4n^2) = 3(5m - 2n)(5m + 2n)`); C.assert(full('3(5m - 2n)(5m + 2n)'), 'complete'); C.model(['3(5m - 2n)(5m + 2n)']); });
Q('s204', mk.short({ marks: 2, stem: r`Factorise $343p^3 - 8$.`, model: r`$343p^3 - 8 = (7p)^3 - 2^3$.

Using $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ with $a = 7p$, $b = 2$: $(7p - 2)(49p^2 + 14p + 4)$.`, sol: r`$343 = 7^3$ and $8 = 2^3$.`, scheme: [['Written as (7p)^3 - 2^3', 1], ['(7p - 2)(49p^2 + 14p + 4)', 1]], d: 3, c: 'understanding', t: [3], time: 90 }), (C) => { chain(r`343p^3 - 8 = (7p - 2)(49p^2 + 14p + 4)`); C.assert(7 ** 3 === 343, '7 cubed'); C.model(['(7p - 2)(49p^2 + 14p + 4)']); });
Q('s205', mk.short({ marks: 2, stem: r`A rectangular mosaic panel has area $(x^2 - 14x + 33)$ square units. By splitting the middle term, find its two sides.`, model: r`Two numbers with sum $-14$ and product $33$ are $-3$ and $-11$.

$x^2 - 14x + 33 = x^2 - 3x - 11x + 33 = x(x - 3) - 11(x - 3) = (x - 3)(x - 11)$. The sides are $(x - 3)$ and $(x - 11)$.`, sol: r`The product $33$ is positive and the sum $-14$ is negative, so both numbers are negative.`, scheme: [['Split pair -3 and -11', 1], ['Sides (x - 3) and (x - 11)', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => { assertSplit(1, -14, 33, ...splitPair(1, -14, 33)); chain(r`x^2 - 14x + 33 = x^2 - 3x - 11x + 33 = x(x - 3) - 11(x - 3) = (x - 3)(x - 11)`); C.model(['(x - 3)(x - 11)']); });
Q('s206', mk.short({ marks: 2, stem: r`Divya factorises $16x^2 - 36$ as $(4x - 6)(4x + 6)$. Explain why this is not yet a complete factorisation and write the complete one.`, model: r`The product is correct, but each bracket still has a common factor: $4x - 6 = 2(2x - 3)$ and $4x + 6 = 2(2x + 3)$.

So $16x^2 - 36 = 4(2x - 3)(2x + 3)$.`, sol: r`Taking out the common factor $4$ first would have avoided the problem: $16x^2 - 36 = 4(4x^2 - 9) = 4(2x - 3)(2x + 3)$.`, scheme: [['Common factor 2 left in each bracket', 1], ['Complete factorisation 4(2x - 3)(2x + 3)', 1]], d: 3, c: 'analysis', t: [2], time: 105 }), (C) => { C.assert(same('(4x-6)(4x+6)', '16x^2-36') && !full('(4x-6)(4x+6)') && same('4(2x-3)(2x+3)', '16x^2-36') && full('4(2x-3)(2x+3)'), 'product right, incomplete, complete'); C.model(['4(2x - 3)(2x + 3)']); });
Q('s207', mk.short({ marks: 2, stem: r`Factorise $9a^2 + 42a + 49$.`, model: r`$9a^2 = (3a)^2$, $49 = 7^2$ and $2 \times 3a \times 7 = 42a$, so the expression is a perfect square.

$9a^2 + 42a + 49 = (3a + 7)^2$.`, sol: r`Splitting $42a$ as $21a + 21a$ gives the same: $3a(3a + 7) + 7(3a + 7) = (3a + 7)^2$.`, scheme: [['Perfect-square pattern recognised (or split 21a + 21a)', 1], ['(3a + 7)^2', 1]], d: 2, c: 'understanding', t: [4], time: 75 }), (C) => { assertSplit(9, 42, 49, 21, 21); chain(r`9a^2 + 42a + 49 = 9a^2 + 21a + 21a + 49 = 3a(3a + 7) + 7(3a + 7) = (3a + 7)^2`); C.model(['(3a + 7)^2']); });
Q('s208', mk.short({ marks: 2, stem: r`Factorise $x^2 - 6xy + 9y^2 - 4$.`, model: r`The first three terms form a perfect square: $x^2 - 6xy + 9y^2 = (x - 3y)^2$.

So the expression is $(x - 3y)^2 - 2^2 = (x - 3y - 2)(x - 3y + 2)$.`, sol: r`Grouping the first three terms turns the expression into a difference of two squares.`, scheme: [['Perfect square (x - 3y)^2 recognised', 1], ['Difference of squares: (x - 3y - 2)(x - 3y + 2)', 1]], d: 4, c: 'analysis', t: [2, 4], time: 105 }), (C) => { chain(r`x^2 - 6xy + 9y^2 - 4 = (x - 3y)^2 - 2^2 = (x - 3y - 2)(x - 3y + 2)`); C.model(['(x - 3y - 2)(x - 3y + 2)']); });

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Factorise $15ax - 6ay - 10bx + 4by$.`, model: r`Group in pairs: $15ax - 6ay - 10bx + 4by = 3a(5x - 2y) - 2b(5x - 2y)$.

The bracket $(5x - 2y)$ is common, so the result is $(3a - 2b)(5x - 2y)$.`, sol: r`Taking out $-2b$ (not $+2b$) from the second pair makes its bracket $(5x - 2y)$, the same as the first.`, scheme: [['Pairs grouped', 1], ['3a(5x - 2y) - 2b(5x - 2y)', 1], ['(3a - 2b)(5x - 2y)', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { chain(r`15ax - 6ay - 10bx + 4by = 3a(5x - 2y) - 2b(5x - 2y) = (3a - 2b)(5x - 2y)`); C.model(['(3a - 2b)(5x - 2y)']); });
Q('s302', mk.short({ marks: 3, stem: r`Factorise $49 - a^2 - 2ab - b^2$.`, model: r`Take out a minus sign from the last three terms: $49 - (a^2 + 2ab + b^2) = 49 - (a + b)^2$.

This is a difference of two squares: $7^2 - (a + b)^2 = (7 - a - b)(7 + a + b)$.`, sol: r`Note the sign: $-a^2 - 2ab - b^2 = -(a^2 + 2ab + b^2)$.`, scheme: [['Minus sign taken out: 49 - (a^2 + 2ab + b^2)', 1], ['49 - (a + b)^2', 1], ['(7 - a - b)(7 + a + b)', 1]], d: 4, c: 'application', t: [2], time: 135 }), (C) => { chain(r`49 - a^2 - 2ab - b^2 = 49 - (a^2 + 2ab + b^2) = 49 - (a + b)^2 = (7 - a - b)(7 + a + b)`); C.model(['(7 - a - b)(7 + a + b)']); });
Q('s303', mk.short({ marks: 3, stem: r`Factorise $54a^4 + 16a$ completely.`, model: r`Take out $2a$: $54a^4 + 16a = 2a(27a^3 + 8)$.

$27a^3 + 8 = (3a)^3 + 2^3 = (3a + 2)(9a^2 - 6a + 4)$.

So $54a^4 + 16a = 2a(3a + 2)(9a^2 - 6a + 4)$.`, sol: r`Common factor first, then the sum of two cubes with $a = 3a$ and $b = 2$.`, scheme: [['Common factor 2a taken out', 1], ['Sum of cubes (3a)^3 + 2^3', 1], ['2a(3a + 2)(9a^2 - 6a + 4)', 1]], d: 4, c: 'application', t: [1, 3], time: 135 }), (C) => { chain(r`54a^4 + 16a = 2a(27a^3 + 8) = 2a(3a + 2)(9a^2 - 6a + 4)`); C.assert(full('2a(3a + 2)(9a^2 - 6a + 4)'), 'complete'); C.model(['2a(3a + 2)(9a^2 - 6a + 4)']); });
Q('s304', mk.short({ marks: 3, stem: r`Use the split of the middle term to write $10x^2 - 29x + 21$ as a product of two binomials, showing the pair of numbers you split $-29x$ into.`, model: r`$ac = 10 \times 21 = 210$ and $b = -29$. The numbers $-14$ and $-15$ have sum $-29$ and product $210$.

$10x^2 - 14x - 15x + 21 = 2x(5x - 7) - 3(5x - 7) = (2x - 3)(5x - 7)$.`, sol: r`Both numbers are negative because the product is positive and the sum is negative.`, scheme: [['Pair -14 and -15 (sum -29, product 210)', 1], ['Grouped: 2x(5x - 7) - 3(5x - 7)', 1], ['(2x - 3)(5x - 7)', 1]], d: 3, c: 'understanding', t: [4], time: 120 }), (C) => { assertSplit(10, -29, 21, ...splitPair(10, -29, 21)); chain(r`10x^2 - 29x + 21 = 10x^2 - 14x - 15x + 21 = 2x(5x - 7) - 3(5x - 7) = (2x - 3)(5x - 7)`); C.model(['(2x - 3)(5x - 7)']); });
Q('s305', mk.short({ marks: 3, stem: r`Factorise $4x^2y + 2xy^2 - 30y^3$ completely.`, model: r`Take out $2y$: $4x^2y + 2xy^2 - 30y^3 = 2y(2x^2 + xy - 15y^2)$.

Split $xy$ as $6xy - 5xy$ (sum $1$, product $-30$): $2x^2 + 6xy - 5xy - 15y^2 = 2x(x + 3y) - 5y(x + 3y) = (2x - 5y)(x + 3y)$.

So the result is $2y(2x - 5y)(x + 3y)$.`, sol: r`Common factor first, then split the trinomial in $x$ and $y$.`, scheme: [['Common factor 2y taken out', 1], ['Split pair 6 and -5, grouped', 1], ['2y(2x - 5y)(x + 3y)', 1]], d: 4, c: 'application', t: [1, 4], time: 150 }), (C) => { assertSplit(2, 1, -15, ...splitPair(2, 1, -15)); chain(r`4x^2y + 2xy^2 - 30y^3 = 2y(2x^2 + xy - 15y^2) = 2y(2x^2 + 6xy - 5xy - 15y^2) = 2y(2x - 5y)(x + 3y)`); C.assert(full('2y(2x - 5y)(x + 3y)'), 'complete'); C.model(['2y(2x - 5y)(x + 3y)']); });
Q('s306', mk.short({ marks: 3, stem: r`Factorise $(a + b)^2 - 7(a + b) + 12$ by treating $a + b$ as a single quantity.`, model: r`Put $y = a + b$. The expression becomes $y^2 - 7y + 12$.

Two numbers with sum $-7$ and product $12$ are $-3$ and $-4$, so $y^2 - 7y + 12 = (y - 3)(y - 4)$.

Putting back $y = a + b$: $(a + b - 3)(a + b - 4)$.`, sol: r`Treating the bracket as one letter turns a four-letter problem into a simple trinomial.`, scheme: [['Substitution y = a + b: y^2 - 7y + 12', 1], ['(y - 3)(y - 4)', 1], ['(a + b - 3)(a + b - 4)', 1]], d: 4, c: 'analysis', t: [4], time: 135 }), (C) => { assertSplit(1, -7, 12, ...splitPair(1, -7, 12)); chain(r`(a + b)^2 - 7(a + b) + 12 = (a + b - 3)(a + b - 4)`); chain(r`y^2 - 7y + 12 = (y - 3)(y - 4)`); C.model(['(a + b - 3)(a + b - 4)']); });

// =============================================================== long answer, 10 marks (3 + 3 + 4)
const L1a = r`2(3p + 2q)(2u - 3v)`, L1b = r`(a - b)(x - 2y)(x + 2y)`;
Q('l01', mk.long({ marks: 10, stem: r`(a) Factorise completely $12pu - 18pv + 8qu - 12qv$. [3]

(b) Factorise completely $x^2(a - b) + 4y^2(b - a)$. [3]

(c) Without a calculator, find the value of $6.4 \times 7.5 + 6.4 \times 2.5 + 3.6 \times 7.5 + 3.6 \times 2.5$ by grouping. [4]`, model: r`(a) $12pu - 18pv + 8qu - 12qv = 6p(2u - 3v) + 4q(2u - 3v) = (6p + 4q)(2u - 3v) = ${L1a}$.

(b) Since $b - a = -(a - b)$: $x^2(a - b) + 4y^2(b - a) = x^2(a - b) - 4y^2(a - b) = (a - b)(x^2 - 4y^2) = ${L1b}$.

(c) $6.4(7.5 + 2.5) + 3.6(7.5 + 2.5) = (6.4 + 3.6)(7.5 + 2.5) = 10 \times 10 = 100$.`, sol: r`Each part is grouping, as in the worked examples: pair the terms so that the same bracket appears twice, then take it out.`, scheme: [['(a) Grouped: 6p(2u - 3v) + 4q(2u - 3v)', 1], ['(a) (6p + 4q)(2u - 3v)', 1], ['(a) Common factor 2 taken out: 2(3p + 2q)(2u - 3v)', 1], ['(b) Sign change b - a = -(a - b) and common bracket (a - b)', 1], ['(b) (a - b)(x^2 - 4y^2)', 1], ['(b) Completed: (a - b)(x - 2y)(x + 2y)', 1], ['(c) Grouped: 6.4(7.5 + 2.5) + 3.6(7.5 + 2.5)', 2], ['(c) (6.4 + 3.6)(7.5 + 2.5) = 10 x 10', 1], ['(c) 100', 1]], d: 3, c: 'application', t: [1, 2], time: 600 }), (C) => {
  chain(r`12pu - 18pv + 8qu - 12qv = 6p(2u - 3v) + 4q(2u - 3v) = (6p + 4q)(2u - 3v) = 2(3p + 2q)(2u - 3v)`);
  chain(r`x^2(a - b) + 4y^2(b - a) = x^2(a - b) - 4y^2(a - b) = (a - b)(x^2 - 4y^2) = (a - b)(x - 2y)(x + 2y)`);
  C.assert(full(L1a) && full(L1b), 'both parts complete');
  const t = 6.4 * 7.5 + 6.4 * 2.5 + 3.6 * 7.5 + 3.6 * 2.5;
  C.assert(Math.abs(t - 100) < 1e-9 && Math.abs((6.4 + 3.6) * (7.5 + 2.5) - 100) < 1e-9, '(c) equals 100 directly and by grouping');
  C.model([L1a, L1b, 100]);
});

const L2a = r`2x(9x - 7y)(9x + 7y)`, L2b = r`(a - 3b - 7)(a - 3b + 7)`;
Q('l02', mk.long({ marks: 10, stem: r`(a) Factorise completely $162x^3 - 98xy^2$. [3]

(b) Factorise $a^2 - 6ab + 9b^2 - 49$. [3]

(c) A circular lawn of radius $37$ m has a circular pond of radius $23$ m at its centre. Taking $\pi = \dfrac{22}{7}$ and using a difference of two squares, find the area of the lawn that is not covered by the pond. [4]`, model: r`(a) $162x^3 - 98xy^2 = 2x(81x^2 - 49y^2) = ${L2a}$.

(b) $a^2 - 6ab + 9b^2 - 49 = (a - 3b)^2 - 7^2 = ${L2b}$.

(c) Area $= \pi(37^2 - 23^2) = \pi(37 - 23)(37 + 23) = \pi \times 14 \times 60 = 840\pi$. With $\pi = \dfrac{22}{7}$, the area is $840 \times \dfrac{22}{7} = 120 \times 22 = 2640$ square metres.`, sol: r`Part (a) is a common factor and then a difference of squares; part (b) needs the first three terms grouped as a perfect square; part (c) avoids squaring $37$ and $23$.`, scheme: [['(a) Common factor 2x: 2x(81x^2 - 49y^2)', 1], ['(a) Squares (9x)^2 and (7y)^2', 1], ['(a) 2x(9x - 7y)(9x + 7y)', 1], ['(b) Perfect square (a - 3b)^2', 1], ['(b) Difference of squares with 7^2', 1], ['(b) (a - 3b - 7)(a - 3b + 7)', 1], ['(c) Area = pi(37^2 - 23^2)', 1], ['(c) (37 - 23)(37 + 23) = 14 x 60 = 840', 1], ['(c) 840 x 22/7', 1], ['(c) 2640 square metres', 1]], d: 4, c: 'application', t: [1, 2], time: 630 }), (C) => {
  chain(r`162x^3 - 98xy^2 = 2x(81x^2 - 49y^2) = 2x(9x - 7y)(9x + 7y)`);
  chain(r`a^2 - 6ab + 9b^2 - 49 = (a - 3b)^2 - 7^2 = (a - 3b - 7)(a - 3b + 7)`);
  C.assert(full(L2a) && full(L2b), 'both parts complete');
  C.assert(37 ** 2 - 23 ** 2 === 14 * 60 && 840 * 22 / 7 === 2640, '840 x 22/7 = 2640');
  C.model([L2a, L2b, 840, 2640]);
});

const L3a = r`(5x - 6y)(25x^2 + 30xy + 36y^2)`, L3b = r`3m(m + 3)(m^2 - 3m + 9)`;
Q('l03', mk.long({ marks: 10, stem: r`(a) Factorise $125x^3 - 216y^3$. [3]

(b) Factorise completely $3m^4 + 81m$. [3]

(c) If $a - b = 4$ and $ab = 12$, find the value of $a^3 - b^3$. [4]`, model: r`(a) $125x^3 - 216y^3 = (5x)^3 - (6y)^3 = ${L3a}$.

(b) $3m^4 + 81m = 3m(m^3 + 27) = 3m(m^3 + 3^3) = ${L3b}$.

(c) $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$. Now $a^2 + b^2 = (a - b)^2 + 2ab = 16 + 24 = 40$, so $a^2 + ab + b^2 = 40 + 12 = 52$. Hence $a^3 - b^3 = 4 \times 52 = 208$.`, sol: r`Part (a) is a difference of cubes with $a = 5x$, $b = 6y$; part (b) needs the common factor $3m$ first; part (c) uses the factorisation with the square of $a - b$.`, scheme: [['(a) Written as (5x)^3 - (6y)^3', 1], ['(a) Middle terms 5x times 6y = 30xy', 1], ['(a) (5x - 6y)(25x^2 + 30xy + 36y^2)', 1], ['(b) Common factor 3m', 1], ['(b) Sum of cubes m^3 + 3^3', 1], ['(b) 3m(m + 3)(m^2 - 3m + 9)', 1], ['(c) a^3 - b^3 = (a - b)(a^2 + ab + b^2)', 1], ['(c) a^2 + b^2 = (a - b)^2 + 2ab = 40', 1], ['(c) a^2 + ab + b^2 = 52', 1], ['(c) 4 x 52 = 208', 1]], d: 4, c: 'analysis', t: [1, 3], time: 660 }), (C) => {
  chain(r`125x^3 - 216y^3 = (5x - 6y)(25x^2 + 30xy + 36y^2)`);
  chain(r`3m^4 + 81m = 3m(m^3 + 27) = 3m(m + 3)(m^2 - 3m + 9)`);
  C.assert(full(L3a) && full(L3b), 'both parts complete');
  const vals = []; for (let a = -30; a <= 30; a++) for (let b = -30; b <= 30; b++) if (a - b === 4 && a * b === 12) vals.push(a ** 3 - b ** 3);
  C.assert(vals.length === 2 && vals.every((v) => v === 208) && 16 + 24 === 40 && 4 * 52 === 208, '(a, b) = (6, 2) and (-2, -6) both give 208');
  C.model([L3a, L3b, 208]);
});

const L4a = r`(3x - 2)(5x + 4)`, L4b = r`(a - 3b)(6a + 5b)`;
Q('l04', mk.long({ marks: 10, stem: r`(a) Factorise $15x^2 + 2x - 8$ by splitting the middle term. [3]

(b) Factorise $6a^2 - 13ab - 15b^2$. [3]

(c) A rectangular hall has area $(15x^2 + 2x - 8)$ square metres, and its sides are the two linear factors found in part (a). For $x = 2$, find the perimeter of the hall and check that the product of its sides equals the area. [4]`, model: r`(a) $ac = 15 \times (-8) = -120$ and $b = 2$. The numbers $12$ and $-10$ have sum $2$ and product $-120$. $15x^2 + 12x - 10x - 8 = 3x(5x + 4) - 2(5x + 4) = ${L4a}$.

(b) $ac = 6 \times (-15) = -90$ and $b = -13$. The numbers $5$ and $-18$ work. $6a^2 + 5ab - 18ab - 15b^2 = a(6a + 5b) - 3b(6a + 5b) = ${L4b}$.

(c) At $x = 2$ the sides are $3x - 2 = 4$ m and $5x + 4 = 14$ m, so the perimeter is $2 \times (4 + 14) = 36$ m. Check: $4 \times 14 = 56$ and $15 \times 4 + 2 \times 2 - 8 = 56$ square metres.`, sol: r`Both trinomials are factorised by finding two numbers with the right sum and product, then grouping; part (c) substitutes into the factors of part (a).`, scheme: [['(a) Split pair 12 and -10 (sum 2, product -120)', 1], ['(a) Grouped: 3x(5x + 4) - 2(5x + 4)', 1], ['(a) (3x - 2)(5x + 4)', 1], ['(b) Split pair 5 and -18 (sum -13, product -90)', 1], ['(b) Grouped: a(6a + 5b) - 3b(6a + 5b)', 1], ['(b) (a - 3b)(6a + 5b)', 1], ['(c) Sides 4 m and 14 m at x = 2', 1], ['(c) Perimeter 36 m', 1], ['(c) Area 4 x 14 = 56', 1], ['(c) Same as the area expression at x = 2', 1]], d: 3, c: 'application', t: [4], time: 660 }), (C) => {
  assertSplit(15, 2, -8, ...splitPair(15, 2, -8)); assertSplit(6, -13, -15, ...splitPair(6, -13, -15));
  chain(r`15x^2 + 2x - 8 = 15x^2 + 12x - 10x - 8 = 3x(5x + 4) - 2(5x + 4) = (3x - 2)(5x + 4)`);
  chain(r`6a^2 - 13ab - 15b^2 = 6a^2 + 5ab - 18ab - 15b^2 = a(6a + 5b) - 3b(6a + 5b) = (a - 3b)(6a + 5b)`);
  const s1 = val('3x-2', { x: 2 }), s2 = val('5x+4', { x: 2 });
  C.assert(s1 === 4 && s2 === 14 && s1 * s2 === val('15x^2+2x-8', { x: 2 }) && 2 * (s1 + s2) === 36, 'sides 4 and 14, area 56, perimeter 36');
  C.model([L4a, L4b, 36, 56]);
});

Q('l05', mk.long({ marks: 10, stem: r`Three students made errors. Find each error and give the correct factorisation.

(a) Aarav wrote $x^3 + 27 = (x + 3)(x^2 + 3x + 9)$. [3]

(b) Bhavna wrote $4x^2 - 16y^2 = (2x - 4y)(2x + 4y)$ and stopped there. [3]

(c) Chirag wrote $x^2 - y^2 - 2y - 1 = x^2 - (y^2 - 2y - 1)$ and tried to carry on. [4]`, model: r`(a) The middle term of the quadratic factor must be negative for a sum of cubes: $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$. Aarav's product expands to $x^3 + 6x^2 + 18x + 27$, not $x^3 + 27$. Correct: $x^3 + 27 = (x + 3)(x^2 - 3x + 9)$.

(b) The product is correct, but $2x - 4y = 2(x - 2y)$ and $2x + 4y = 2(x + 2y)$ still have a common factor. Correct: $4x^2 - 16y^2 = 4(x - 2y)(x + 2y)$.

(c) Taking a minus sign out of $-y^2 - 2y - 1$ changes every sign inside: $-y^2 - 2y - 1 = -(y^2 + 2y + 1)$, not $-(y^2 - 2y - 1)$. Correct: $x^2 - (y^2 + 2y + 1) = x^2 - (y + 1)^2 = (x - y - 1)(x + y + 1)$.`, sol: r`Each wrong line can be found by multiplying back or by comparing signs.`, scheme: [['(a) Error found: sign of the middle term (the product does not multiply back)', 1], ['(a) Pattern a^3 + b^3 = (a + b)(a^2 - ab + b^2) used', 1], ['(a) Correct: (x + 3)(x^2 - 3x + 9)', 1], ['(b) Common factor 2 still in each bracket', 1], ['(b) Common factor 4 taken out', 1], ['(b) Correct: 4(x - 2y)(x + 2y)', 1], ['(c) Error found: signs inside the bracket should all change', 1], ['(c) x^2 - (y^2 + 2y + 1) = x^2 - (y + 1)^2', 1], ['(c) Difference of squares applied', 1], ['(c) (x - y - 1)(x + y + 1)', 1]], d: 4, c: 'analysis', t: [2, 3], time: 660 }), (C) => {
  C.assert(!same('(x+3)(x^2+3x+9)', 'x^3+27') && P('(x+3)(x^2+3x+9)').eq(P('x^3+6x^2+18x+27')), "(a) Aarav's product is x^3 + 6x^2 + 18x + 27");
  chain(r`x^3 + 27 = (x + 3)(x^2 - 3x + 9)`);
  C.assert(same('(2x-4y)(2x+4y)', '4x^2-16y^2') && !full('(2x-4y)(2x+4y)'), '(b) product right but incomplete');
  chain(r`4x^2 - 16y^2 = 4(x - 2y)(x + 2y)`);
  C.assert(!same('x^2-y^2-2y-1', 'x^2-(y^2-2y-1)'), "(c) Chirag's step changes the expression");
  chain(r`x^2 - y^2 - 2y - 1 = x^2 - (y^2 + 2y + 1) = x^2 - (y + 1)^2 = (x - y - 1)(x + y + 1)`);
  C.assert(full('4(x-2y)(x+2y)') && full('(x+3)(x^2-3x+9)') && full('(x-y-1)(x+y+1)'), 'corrections complete');
  C.model(['(x + 3)(x^2 - 3x + 9)', '4(x - 2y)(x + 2y)', '(x - y - 1)(x + y + 1)']);
});

const L6a = r`2x(3x - 2y)(3x + 2y)`, L6b = r`(x - 2)(x + 2)(x - 3)(x + 3)`;
Q('l06', mk.long({ marks: 10, stem: r`(a) Factorise completely $18x^3 - 8xy^2$. [3]

(b) Factorise completely $x^4 - 13x^2 + 36$, treating $x^2$ as a single quantity. [3]

(c) The floor of a hall has area $(2x^2 + 5x - 12)$ square metres and breadth $(x + 4)$ metres. Find its length in terms of $x$. For $x = 5$, find the cost of tiling the floor at ₹ $85$ per square metre. [4]`, model: r`(a) $18x^3 - 8xy^2 = 2x(9x^2 - 4y^2) = ${L6a}$.

(b) Put $t = x^2$: $t^2 - 13t + 36 = (t - 4)(t - 9)$, using the numbers $-4$ and $-9$ (sum $-13$, product $36$). So $x^4 - 13x^2 + 36 = (x^2 - 4)(x^2 - 9) = ${L6b}$.

(c) $2x^2 + 5x - 12 = 2x^2 + 8x - 3x - 12 = 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4)$, so the length is $(2x - 3)$ m. At $x = 5$ the length is $7$ m and the breadth is $9$ m, so the area is $63$ square metres and the cost is $63 \times 85 = 5355$ rupees.`, sol: r`Parts (a) and (b) combine a common factor or a substitution with the difference of two squares; part (c) splits the middle term and then substitutes.`, scheme: [['(a) Common factor 2x: 2x(9x^2 - 4y^2)', 1], ['(a) Squares (3x)^2 and (2y)^2', 1], ['(a) 2x(3x - 2y)(3x + 2y)', 1], ['(b) Substitution t = x^2 and pair -4, -9', 1], ['(b) (x^2 - 4)(x^2 - 9)', 1], ['(b) (x - 2)(x + 2)(x - 3)(x + 3)', 1], ['(c) Split 5x as 8x - 3x and group', 1], ['(c) Length (2x - 3) m', 1], ['(c) At x = 5: 7 m by 9 m, area 63', 1], ['(c) Cost 63 x 85 = 5355 rupees', 1]], d: 4, c: 'application', t: [1, 2, 4], time: 690 }), (C) => {
  assertSplit(1, -13, 36, ...splitPair(1, -13, 36)); assertSplit(2, 5, -12, ...splitPair(2, 5, -12));
  chain(r`18x^3 - 8xy^2 = 2x(9x^2 - 4y^2) = 2x(3x - 2y)(3x + 2y)`);
  chain(r`x^4 - 13x^2 + 36 = (x^2 - 4)(x^2 - 9) = (x - 2)(x + 2)(x - 3)(x + 3)`);
  chain(r`2x^2 + 5x - 12 = 2x^2 + 8x - 3x - 12 = 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4)`);
  C.assert(full(L6a) && full(L6b), 'parts (a) and (b) complete');
  const len = val('2x-3', { x: 5 }), br = val('x+4', { x: 5 });
  C.assert(len === 7 && br === 9 && len * br === val('2x^2+5x-12', { x: 5 }) && len * br * 85 === 5355, '7 x 9 = 63; 63 x 85 = 5355');
  C.model([L6a, L6b, 63, 5355]);
});

const L7a = r`(x - 2)(x^2 + 2x + 4)(x + 2)(x^2 - 2x + 4)`, L7b = r`2(5p - q)(25p^2 + 5pq + q^2)`;
Q('l07', mk.long({ marks: 10, stem: r`(a) Factorise completely $x^6 - 64$. [4]

(b) Factorise completely $250p^3 - 2q^3$. [3]

(c) Factorise $n^3 - n$ and use your answer to find the value of $41^3 - 41$. [3]`, model: r`(a) $x^6 - 64 = (x^3)^2 - 8^2 = (x^3 - 8)(x^3 + 8)$. Then $x^3 - 8 = (x - 2)(x^2 + 2x + 4)$ and $x^3 + 8 = (x + 2)(x^2 - 2x + 4)$. So $x^6 - 64 = ${L7a}$.

(b) $250p^3 - 2q^3 = 2(125p^3 - q^3) = 2((5p)^3 - q^3) = ${L7b}$.

(c) $n^3 - n = n(n^2 - 1) = n(n - 1)(n + 1)$. For $n = 41$: $41^3 - 41 = 40 \times 41 \times 42 = 68880$.`, sol: r`Part (a) uses a difference of squares and then a sum and a difference of cubes; part (b) needs the common factor $2$ first; part (c) turns a large calculation into a product of three consecutive numbers.`, scheme: [['(a) Difference of squares: (x^3 - 8)(x^3 + 8)', 1], ['(a) Difference of cubes: (x - 2)(x^2 + 2x + 4)', 1], ['(a) Sum of cubes: (x + 2)(x^2 - 2x + 4)', 1], ['(a) All four factors together', 1], ['(b) Common factor 2 taken out', 1], ['(b) Difference of cubes (5p)^3 - q^3', 1], ['(b) 2(5p - q)(25p^2 + 5pq + q^2)', 1], ['(c) n(n - 1)(n + 1)', 2], ['(c) 40 x 41 x 42 = 68880', 1]], d: 4, c: 'application', t: [1, 2, 3], time: 660 }), (C) => {
  chain(r`x^6 - 64 = (x^3 - 8)(x^3 + 8) = (x - 2)(x^2 + 2x + 4)(x + 2)(x^2 - 2x + 4)`);
  chain(r`250p^3 - 2q^3 = 2(125p^3 - q^3) = 2(5p - q)(25p^2 + 5pq + q^2)`);
  chain(r`n^3 - n = n(n^2 - 1) = n(n - 1)(n + 1)`);
  C.assert(full(L7a) && full(L7b), 'parts (a) and (b) complete');
  C.assert(41 ** 3 - 41 === 68880 && 40 * 41 * 42 === 68880, '41^3 - 41 = 40 x 41 x 42 = 68880');
  C.model([L7a, L7b, 68880]);
});

// CBSE 9 Mathematics ch01 Number System: objective items (mcq, assertion-reason, true-false, fill-blank, match, numerical) with
// independent re-solve checks. Decimal expansions come from long division, recurring decimals from the 10^k trick, surds from integer
// arithmetic, and every key is compared numerically (to 1e-9) with a direct floating-point evaluation of the same expression.
import { Q, mk, topic } from './lib.mjs';
import { r, must, F, gcd, isRatSquare, terminates, longDiv, recurFrac, recurValue, ratPow, sd, sdv, ratio } from './nm.mjs';

export { r };

/** Digits of 0.1010010001...: a 1 after 1, 2, 3, ... zeros. Never periodic. */
export const growingGaps = (len) => { let s = ''; for (let g = 1; s.length < len; g++) s += '0'.repeat(g) + '1'; return s.slice(0, len); };
/** True when the string is periodic from some offset <= 300 with some period <= 120. */
export function periodic(s) {
  for (let p = 1; p <= 120; p++) for (let o = 0; o <= 300; o++) { let ok = true; for (let i = o; i + p < s.length; i++) if (s[i] !== s[i + p]) { ok = false; break; } if (ok) return true; }
  return false;
}
const gaps = growingGaps(900);
must(!periodic(gaps), 'growing-gap digits are not periodic');
const BLOOM = { recall: 'remember', understanding: 'understand', application: 'apply', analysis: 'analyze', evaluation: 'evaluate' };

/** A 2-mark match item (four pairs): left items 1-4, right items p-s; order[i] = index of the right item paired with left i. */
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

// =============================================================== MCQ (practice and tests: m01-m14)
{
  const set = [[50, 1], [49, 16], [144, 100], [225, 9]];
  Q('m01', mk.mcq({ stem: r`In a quiz on the number line, exactly one of the following numbers is irrational. Which one?`, opts: [r`$\sqrt{50}$`, r`$\sqrt{\dfrac{49}{16}}$`, r`$\sqrt{1.44}$`, r`$\sqrt{\dfrac{225}{9}}$`], key: 'a', sol: r`$50 = 25 \times 2$, so $\sqrt{50} = 5\sqrt{2}$, a non-terminating, non-recurring decimal. The others are perfect squares in disguise: $\sqrt{\dfrac{49}{16}} = \dfrac{7}{4}$, $\sqrt{1.44} = 1.2$ and $\sqrt{\dfrac{225}{9}} = 5$, all rational.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.which(set.map(([n, d]) => (isRatSquare(n, d) ? 0 : 1)), 1); });
}
{
  const ok = (x) => (x > Math.SQRT2 && x < Math.sqrt(3) ? 1 : 0);
  Q('m02', mk.mcq({ stem: r`A carpenter in Nashik needs a rod whose length in metres is a rational number between $\sqrt{2}$ and $\sqrt{3}$. Which length works?`, opts: ['$1.6$', '$1.4$', '$1.8$', '$1.9$'], key: 'a', sol: r`$\sqrt{2} \approx 1.414$ and $\sqrt{3} \approx 1.732$, so the length must be between these. Only $1.6$ is; $1.4$ is just below $\sqrt{2}$, and $1.8$ and $1.9$ are above $\sqrt{3}$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.which([1.6, 1.4, 1.8, 1.9].map(ok), 1); });
}
{
  let h2 = 2; // first triangle: legs 1 and 1, hypotenuse squared 2; each later triangle adds 1
  for (let k = 2; k <= 8; k++) h2 += 1;
  Q('m03', mk.mcq({ stem: r`A square-root spiral starts with a right triangle whose two shorter sides are both $1$ unit. Each next triangle uses the previous hypotenuse and a new side of $1$ unit at right angles to it. The hypotenuse of the $8$th triangle is`, opts: ['$3$', r`$2\sqrt{2}$`, r`$\sqrt{7}$`, r`$\sqrt{10}$`], key: 'a', sol: r`The first triangle has hypotenuse $\sqrt{2}$, and each new triangle adds $1$ to the square of the hypotenuse. So the $n$th hypotenuse is $\sqrt{n + 1}$, and the $8$th is $\sqrt{9} = 3$, a whole number. The values $\sqrt{7}$ and $2\sqrt{2} = \sqrt{8}$ belong to the $6$th and $7$th triangles.`, d: 3, c: 'analysis', t: [1], time: 90 }), (Cx) => { Cx.assert(h2 === 9, 'square of the 8th hypotenuse is 9'); Cx.which([3, 2 * Math.SQRT2, Math.sqrt(7), Math.sqrt(10)], Math.sqrt(h2)); });
}
{
  const set = [[7, 40], [5, 12], [12, 35], [9, 14]];
  Q('m04', mk.mcq({ stem: r`A shopkeeper in Madurai writes four fractions on a price board. Which of them has a terminating decimal expansion?`, opts: [r`$\dfrac{7}{40}$`, r`$\dfrac{5}{12}$`, r`$\dfrac{12}{35}$`, r`$\dfrac{9}{14}$`], key: 'a', sol: r`In lowest terms, $40 = 2^{3} \times 5$ has only the prime factors $2$ and $5$, so $\dfrac{7}{40} = 0.175$ terminates. The denominators $12 = 2^{2} \times 3$, $35 = 5 \times 7$ and $14 = 2 \times 7$ each contain a prime other than $2$ or $5$, so those expansions go on for ever.`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.which(set.map(([n, d]) => (terminates(n, d) ? 1 : 0)), 1); Cx.assert(longDiv(7, 40).pre === '175', '7/40 = 0.175'); });
}
{
  const L = longDiv(5, 13);
  Q('m05', mk.mcq({ stem: r`When $\dfrac{5}{13}$ is written as a decimal, a block of digits repeats for ever. How many digits are in that block?`, opts: ['$6$', '$12$', '$13$', '$5$'], key: 'a', sol: r`Dividing $5$ by $13$ gives $0.384615\,384615\ldots$ The remainders are $5, 11, 4, 1, 10, 9$ and then $5$ again, so the block $384615$ has $6$ digits. It is not $12$, since the remainders repeat after $6$ steps.`, d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(L.rep === '384615' && L.pre === '', 'block 384615'); Cx.which([6, 12, 13, 5], L.period); });
}
{
  const fr = recurFrac(0, '', '36');
  Q('m06', mk.mcq({ stem: r`A marking sheet in a Pune school shows a ratio as $0.363636\ldots$, that is $0.\overline{36}$. In lowest terms it is the fraction`, opts: [r`$\dfrac{4}{11}$`, r`$\dfrac{9}{25}$`, r`$\dfrac{6}{11}$`, r`$\dfrac{3}{11}$`], key: 'a', sol: r`Let $x = 0.\overline{36}$. Then $100x = 36.\overline{36}$, and subtracting gives $99x = 36$, so $x = \dfrac{36}{99} = \dfrac{4}{11}$. The fraction $\dfrac{9}{25} = 0.36$ stops after two digits, so it is not the recurring decimal.`, d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(fr.eq(F(4, 11)) && Math.abs(recurValue(0, '', '36') - 4 / 11) < 1e-9, '0.36 recurring = 4/11'); Cx.which([4 / 11, 9 / 25, 6 / 11, 3 / 11], fr.num()); });
}
{
  const fr = recurFrac(1, '2', '7');
  Q('m07', mk.mcq({ stem: r`The number $1.2\overline{7} = 1.27777\ldots$ equals`, opts: [r`$\dfrac{23}{18}$`, r`$\dfrac{127}{99}$`, r`$\dfrac{127}{100}$`, r`$\dfrac{58}{45}$`], key: 'a', sol: r`Let $x = 1.2\overline{7}$. Then $10x = 12.\overline{7}$ and $100x = 127.\overline{7}$, so $90x = 115$ and $x = \dfrac{115}{90} = \dfrac{23}{18}$. The fraction $\dfrac{127}{99}$ would be $1.\overline{28}$, and $\dfrac{127}{100}$ is the terminating $1.27$.`, d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(fr.eq(F(23, 18)) && Math.abs(recurValue(1, '2', '7') - 23 / 18) < 1e-9, '1.2777 = 23/18'); Cx.which([23 / 18, 127 / 99, 127 / 100, 58 / 45], fr.num()); });
}
{
  Q('m08', mk.mcq({ stem: r`Aman writes the decimal $0.101001000100001\ldots$, where each new $1$ comes after one more $0$ than the last. This number is`, opts: ['irrational, since its digits neither end nor repeat a block', 'rational, since it follows a clear pattern', 'rational, since it uses only the digits $0$ and $1$', 'neither rational nor irrational'], key: 'a', sol: r`A decimal is rational only if it terminates or repeats the same block of digits. Here the runs of $0$s keep growing, so no block repeats, and the decimal never ends. A visible pattern is not the same as a repeating block, so the number is irrational.`, d: 3, c: 'analysis', t: [2], time: 90 }), (Cx) => { Cx.assert(!periodic(gaps), 'the digits never settle into a repeating block (first 900 digits tested)'); Cx.key('a'); });
}
{
  const cand = [{ n: 46, d: 10, v: Math.sqrt(4.6) }, { n: 484, d: 100, v: 2.2 }, { n: 215, d: 100, v: 2.15, rat: true }, { n: 441, d: 100, v: 2.1 }];
  const good = (o) => (!(o.rat || isRatSquare(o.n, o.d)) && o.v > 2.1 && o.v < 2.2 ? 1 : 0);
  Q('m09', mk.mcq({ stem: r`Which of these is an irrational number lying strictly between $2.1$ and $2.2$?`, opts: [r`$\sqrt{4.6}$`, r`$\sqrt{4.84}$`, '$2.15$', r`$\sqrt{4.41}$`], key: 'a', sol: r`$\sqrt{4.6} \approx 2.1448$ lies between $2.1$ and $2.2$, and $4.6$ is not a perfect square of a rational number, so it is irrational. $\sqrt{4.84} = 2.2$ and $\sqrt{4.41} = 2.1$ are rational and are the end points themselves, while $2.15$ is between them but rational.`, d: 3, c: 'analysis', t: [1, 2], time: 105 }), (Cx) => { Cx.assert(Math.abs(Math.sqrt(4.84) - 2.2) < 1e-12 && Math.abs(Math.sqrt(4.41) - 2.1) < 1e-12, 'end points'); Cx.which(cand.map(good), 1); });
}
{
  Q('m10', mk.mcq({ stem: r`In simplest form, $\sqrt{288}$ equals`, opts: [r`$12\sqrt{2}$`, r`$6\sqrt{2}$`, r`$24\sqrt{2}$`, r`$16\sqrt{3}$`], key: 'a', sol: r`$288 = 144 \times 2$, so $\sqrt{288} = \sqrt{144} \times \sqrt{2} = 12\sqrt{2}$. Taking out only $36$ gives $6\sqrt{8}$, which still needs simplifying, and $6\sqrt{2}$, $24\sqrt{2}$ and $16\sqrt{3}$ are different numbers.`, d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.which([12 * Math.SQRT2, 6 * Math.SQRT2, 24 * Math.SQRT2, 16 * Math.sqrt(3)], Math.sqrt(288)); Cx.assert(sd(0, 1, 288) === '12\\sqrt{2}', 'simplified'); });
}
{
  const [p, q, den] = ratio(1, 0, -3, 1, 11); // 1/(sqrt11 - 3)
  Q('m11', mk.mcq({ stem: r`Rationalising the denominator of $\dfrac{1}{\sqrt{11} - 3}$ gives`, opts: [r`$\dfrac{3 + \sqrt{11}}{2}$`, r`$\dfrac{\sqrt{11} - 3}{2}$`, r`$\dfrac{3 + \sqrt{11}}{20}$`, r`$3 + \sqrt{11}$`], key: 'a', sol: r`Multiply the top and bottom by the conjugate $\sqrt{11} + 3$: $\dfrac{1}{\sqrt{11} - 3} \times \dfrac{\sqrt{11} + 3}{\sqrt{11} + 3} = \dfrac{\sqrt{11} + 3}{11 - 9} = \dfrac{3 + \sqrt{11}}{2}$. Using $11 + 9$ in the denominator gives $20$, and forgetting the division leaves $3 + \sqrt{11}$.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(sd(p, q, 11, den) === sd(3, 1, 11, 2), '(3 + sqrt 11)/2'); Cx.which([sdv(3, 1, 11, 2), sdv(-3, 1, 11, 2), sdv(3, 1, 11, 20), 3 + Math.sqrt(11)], 1 / (Math.sqrt(11) - 3)); });
}
{
  const x = 3 + 2 * Math.SQRT2, v = x + 1 / x;
  Q('m12', mk.mcq({ stem: r`If $x = 3 + 2\sqrt{2}$, then $x + \dfrac{1}{x}$ equals`, opts: ['$6$', '$12$', r`$4\sqrt{2}$`, r`$6 + 4\sqrt{2}$`], key: 'a', sol: r`$\dfrac{1}{x} = \dfrac{1}{3 + 2\sqrt{2}} \times \dfrac{3 - 2\sqrt{2}}{3 - 2\sqrt{2}} = \dfrac{3 - 2\sqrt{2}}{9 - 8} = 3 - 2\sqrt{2}$. Adding, $x + \dfrac{1}{x} = (3 + 2\sqrt{2}) + (3 - 2\sqrt{2}) = 6$. The surd parts cancel, so the answer is a whole number.`, d: 4, c: 'analysis', t: [3], time: 120 }), (Cx) => { Cx.assert(Math.abs(v - 6) < 1e-12 && 9 - 8 === 1, 'x + 1/x = 6'); Cx.which([6, 12, 4 * Math.SQRT2, 6 + 4 * Math.SQRT2], v); });
}
{
  const v = Math.pow(16, -3 / 4);
  Q('m13', mk.mcq({ stem: r`The value of $16^{-\frac{3}{4}}$ is`, opts: [r`$\dfrac{1}{8}$`, '$8$', r`$\dfrac{1}{64}$`, r`$\dfrac{1}{12}$`], key: 'a', sol: r`$16^{\frac{1}{4}} = 2$, so $16^{\frac{3}{4}} = 2^{3} = 8$. The negative sign takes the reciprocal: $16^{-\frac{3}{4}} = \dfrac{1}{8}$. The value $8$ ignores the sign, and $\dfrac{1}{64}$ cubes $4$ instead of taking the fourth root first.`, d: 2, c: 'understanding', t: [4], time: 75 }), (Cx) => { Cx.assert(ratPow(16, -3, 4).eq(F(1, 8)), '1/8'); Cx.which([1 / 8, 8, 1 / 64, 1 / 12], v); });
}
{
  const xs = [...Array(12).keys()].filter((x) => 5 ** (x + 1) * 25 === 5 ** 7);
  Q('m14', mk.mcq({ stem: r`If $5^{x+1} \times 25 = 5^{7}$, then $x$ equals`, opts: ['$4$', '$5$', '$3$', '$7$'], key: 'a', sol: r`Write $25 = 5^{2}$. Then $5^{x+1} \times 5^{2} = 5^{x+3}$, and $5^{x+3} = 5^{7}$ gives $x + 3 = 7$, so $x = 4$. The value $5$ comes from forgetting the $+1$ in the exponent.`, d: 3, c: 'application', t: [4], time: 90 }), (Cx) => { Cx.assert(xs.join() === '4', 'only x = 4'); Cx.which([4, 5, 3, 7], xs[0]); });
}

// =============================================================== MCQ for the check slides (m15-m20, in no test)
{
  const set = [[64, 100], [12, 1], [5, 10], [2, 9]];
  Q('m15', mk.mcq({ stem: r`Which one of these numbers is rational?`, opts: [r`$\sqrt{0.64}$`, r`$\sqrt{12}$`, r`$\sqrt{0.5}$`, r`$\sqrt{\dfrac{2}{9}}$`], key: 'a', sol: r`$\sqrt{0.64} = \sqrt{\dfrac{64}{100}} = \dfrac{8}{10} = 0.8$, a terminating decimal, so it is rational. $12$, $0.5 = \dfrac{1}{2}$ and $\dfrac{2}{9}$ are not squares of rational numbers, so their square roots are irrational.`, d: 1, c: 'recall', t: [1], time: 60 }), (Cx) => { Cx.which(set.map(([n, d]) => (isRatSquare(n, d) ? 1 : 0)), 1); });
}
{
  Q('m16', mk.mcq({ stem: r`On a number line, $OA = 3$ units. At $A$ a segment $AB = 2$ units is drawn at right angles to the line. An arc with centre $O$ and radius $OB$ cuts the number line at $P$. The point $P$ represents`, opts: [r`$\sqrt{13}$`, '$5$', r`$\sqrt{5}$`, '$13$'], key: 'a', sol: r`By the Pythagoras theorem, $OB^{2} = 3^{2} + 2^{2} = 13$, so $OB = \sqrt{13}$, and the arc carries this length to $P$. The value $5$ adds the legs instead of squaring, and $\sqrt{5}$ subtracts the squares.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.which([Math.sqrt(13), 5, Math.sqrt(5), 13], Math.hypot(3, 2)); });
}
{
  Q('m17', mk.mcq({ stem: r`Written as a decimal, $\dfrac{9}{16}$ is`, opts: ['$0.5625$', '$0.625$', '$1.78$', '$0.9$'], key: 'a', sol: r`$16 = 2^{4}$, so the decimal terminates. Long division of $9$ by $16$ gives $0.5625$. The value $0.625$ is $\dfrac{5}{8}$, and $1.78$ is close to $\dfrac{16}{9}$, which is the fraction upside down.`, d: 1, c: 'recall', t: [2], time: 60 }), (Cx) => { const L = longDiv(9, 16); Cx.assert(L.terminating && L.pre === '5625' && terminates(9, 16), '0.5625'); Cx.which([0.5625, 0.625, 1.78, 0.9], 9 / 16); });
}
{
  Q('m18', mk.mcq({ stem: r`In simplest form, $\sqrt{75}$ equals`, opts: [r`$5\sqrt{3}$`, r`$3\sqrt{5}$`, r`$25\sqrt{3}$`, r`$15\sqrt{5}$`], key: 'a', sol: r`$75 = 25 \times 3$, so $\sqrt{75} = \sqrt{25} \times \sqrt{3} = 5\sqrt{3}$. The option $3\sqrt{5}$ swaps the two numbers, and $25\sqrt{3}$ forgets to take the square root of $25$.`, d: 1, c: 'recall', t: [3], time: 60 }), (Cx) => { Cx.which([5 * Math.sqrt(3), 3 * Math.sqrt(5), 25 * Math.sqrt(3), 15 * Math.sqrt(5)], Math.sqrt(75)); });
}
{
  Q('m19', mk.mcq({ stem: r`Rationalising $\dfrac{1}{2 + \sqrt{3}}$ gives`, opts: [r`$2 - \sqrt{3}$`, r`$2 + \sqrt{3}$`, r`$\dfrac{2 - \sqrt{3}}{7}$`, r`$\sqrt{3} - 2$`], key: 'a', sol: r`Multiply the top and bottom by $2 - \sqrt{3}$. The denominator becomes $2^{2} - (\sqrt{3})^{2} = 4 - 3 = 1$, so the result is $2 - \sqrt{3}$. Using $4 + 3$ in the denominator gives the wrong $\dfrac{2 - \sqrt{3}}{7}$.`, d: 2, c: 'application', t: [3], time: 75 }), (Cx) => { Cx.which([2 - Math.sqrt(3), 2 + Math.sqrt(3), (2 - Math.sqrt(3)) / 7, Math.sqrt(3) - 2], 1 / (2 + Math.sqrt(3))); });
}
{
  Q('m20', mk.mcq({ stem: r`The value of $243^{\frac{2}{5}}$ is`, opts: ['$9$', '$3$', '$27$', '$81$'], key: 'a', sol: r`$243 = 3^{5}$, so $243^{\frac{1}{5}} = 3$ and $243^{\frac{2}{5}} = 3^{2} = 9$. The value $3$ stops after the fifth root and forgets the power $2$.`, d: 2, c: 'understanding', t: [4], time: 75 }), (Cx) => { Cx.assert(ratPow(243, 2, 5).eq(F(9)), '9'); Cx.which([9, 3, 27, 81], Math.pow(243, 2 / 5)); });
}

// =============================================================== assertion-reason
{
  Q('ar1', mk.ar({ a: r`The number $\sqrt{2} + (-\sqrt{2})$ is rational.`, r: r`The sum of two irrational numbers is always irrational.`, key: 'c', sol: r`$\sqrt{2} + (-\sqrt{2}) = 0$, which is rational, so A is true. R is false, and A itself is a counter-example: the two irrational numbers $\sqrt{2}$ and $-\sqrt{2}$ add up to the rational number $0$.`, d: 2, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(Math.SQRT2 + -Math.SQRT2 === 0, 'sum is 0, so R has a counter-example'); Cx.key('c'); });
}
{
  Q('ar2', mk.ar({ a: r`The decimal $0.2020020002\ldots$ (one more $0$ before each new $2$) is an irrational number.`, r: r`Its decimal expansion neither terminates nor repeats a block of digits.`, key: 'a', sol: r`The runs of $0$s between the $2$s keep growing, so the expansion never ends and no block repeats. A decimal like this cannot be written as $\dfrac{p}{q}$, so A is true, and R states exactly the reason.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(!periodic(growingGaps(900).replace(/1/g, '2')), 'not periodic'); Cx.key('a'); });
}
{
  Q('ar3', mk.ar({ a: r`The decimal expansion of $\dfrac{7}{75}$ terminates.`, r: r`A fraction in lowest terms has a terminating decimal expansion exactly when its denominator has no prime factor other than $2$ and $5$.`, key: 'd', sol: r`R is true. But $75 = 3 \times 5^{2}$ has the prime factor $3$, and $\dfrac{7}{75}$ is already in lowest terms, so its expansion $0.09\overline{3}$ never ends. A is false.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(!terminates(7, 75) && gcd(7, 75) === 1 && longDiv(7, 75).rep === '3' && longDiv(7, 75).pre === '09', 'not terminating'); Cx.key('d'); });
}
{
  Q('ar4', mk.ar({ a: r`The product $(3 + \sqrt{2})(3 - \sqrt{2})$ is a rational number.`, r: r`$(a + \sqrt{b})(a - \sqrt{b}) = a^{2} - b$.`, key: 'a', sol: r`By R, $(3 + \sqrt{2})(3 - \sqrt{2}) = 3^{2} - 2 = 7$, a rational number, so A is true. The identity in R is exactly the reason.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(Math.abs((3 + Math.SQRT2) * (3 - Math.SQRT2) - 7) < 1e-12, 'product is 7'); Cx.key('a'); });
}
{
  Q('ar5', mk.ar({ a: r`$\sqrt{12} + \sqrt{27} = 5\sqrt{3}$.`, r: r`For positive numbers $a$ and $b$, $\sqrt{a} \times \sqrt{b} = \sqrt{ab}$.`, key: 'b', sol: r`$\sqrt{12} = 2\sqrt{3}$ and $\sqrt{27} = 3\sqrt{3}$, so the sum is $5\sqrt{3}$ and A is true. R is also true, but it is a rule for multiplying surds. It does not explain this addition, which works because both terms are multiples of $\sqrt{3}$.`, d: 3, c: 'analysis', t: [3] }), (Cx) => { Cx.assert(Math.abs(Math.sqrt(12) + Math.sqrt(27) - 5 * Math.sqrt(3)) < 1e-12 && Math.abs(Math.sqrt(5) * Math.sqrt(7) - Math.sqrt(35)) < 1e-12, 'A and R both true'); Cx.key('b'); });
}
{
  Q('ar6', mk.ar({ a: r`$2^{-3} = -8$.`, r: r`For $a \neq 0$, $a^{-n} = \dfrac{1}{a^{n}}$.`, key: 'd', sol: r`R is true, and by R, $2^{-3} = \dfrac{1}{2^{3}} = \dfrac{1}{8}$. A is false, since a negative exponent gives a reciprocal, not a negative number.`, d: 2, c: 'understanding', t: [4] }), (Cx) => { Cx.assert(Math.abs(2 ** -3 - 1 / 8) < 1e-15 && 2 ** -3 !== -8, 'A false'); Cx.key('d'); });
}

// =============================================================== true-false
{
  const L = longDiv(13, 40);
  Q('tf1', mk.tf({ stem: r`The decimal expansion of $\dfrac{13}{40}$ ends after exactly three digits.`, key: 't', sol: r`$40 = 2^{3} \times 5$, so the expansion terminates. Long division gives $\dfrac{13}{40} = 0.325$, which has three digits after the point.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(L.terminating && L.pre === '325', '0.325'); Cx.key('t'); });
}
{
  Q('tf2', mk.tf({ stem: r`The product $\sqrt{8} \times \sqrt{18}$ is a rational number.`, key: 't', sol: r`$\sqrt{8} \times \sqrt{18} = \sqrt{144} = 12$, which is rational, even though each factor is irrational.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(Math.abs(Math.sqrt(8) * Math.sqrt(18) - 12) < 1e-12, '12'); Cx.key('t'); });
}
{
  Q('tf3', mk.tf({ stem: r`$2^{-2} + 2^{-3} = 2^{-5}$.`, key: 'f', sol: r`$2^{-2} + 2^{-3} = \dfrac{1}{4} + \dfrac{1}{8} = \dfrac{3}{8}$, while $2^{-5} = \dfrac{1}{32}$. Exponents are added only when powers are multiplied, not when they are added.`, d: 3, c: 'analysis', t: [4] }), (Cx) => { Cx.assert(Math.abs(2 ** -2 + 2 ** -3 - 3 / 8) < 1e-15 && 2 ** -2 + 2 ** -3 !== 2 ** -5, 'sum is 3/8, not 1/32'); Cx.key('f'); });
}

// =============================================================== fill in the blank
{
  const fr = recurFrac(0, '', '81');
  Q('fb1', mk.fill({ stem: r`In lowest terms, $0.\overline{81} = $ ____.`, acc: [['9/11']], sol: r`Let $x = 0.\overline{81}$. Then $100x = 81.\overline{81}$, so $99x = 81$ and $x = \dfrac{81}{99} = \dfrac{9}{11}$, that is 9/11.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(fr.eq(F(9, 11)), '9/11'); Cx.blank(9 / 11); });
}
{
  Q('fb2', mk.fill({ stem: r`The value of $(\sqrt{7} + 2)(\sqrt{7} - 2)$ is ____.`, acc: [['3']], sol: r`$(\sqrt{7} + 2)(\sqrt{7} - 2) = (\sqrt{7})^{2} - 2^{2} = 7 - 4 = 3$.`, d: 1, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(Math.abs((Math.sqrt(7) + 2) * (Math.sqrt(7) - 2) - 3) < 1e-12, '3'); Cx.blank(3); });
}
{
  const xs = [...Array(21).keys()].map((k) => k - 10).filter((x) => Math.abs(3 ** x - 1 / 81) < 1e-12);
  Q('fb3', mk.fill({ stem: r`If $3^{x} = \dfrac{1}{81}$, then $x = $ ____.`, acc: [['-4', '−4']], sol: r`$81 = 3^{4}$, so $\dfrac{1}{81} = 3^{-4}$ and $3^{x} = 3^{-4}$ gives $x = -4$.`, d: 2, c: 'application', t: [4] }), (Cx) => { Cx.assert(xs.join() === '-4', 'x = -4'); Cx.blank(-4); });
}

// =============================================================== match
{
  const kinds = [[7, 20], [4, 9], [11, 30]].map(([n, d]) => { const L = longDiv(n, d); return L.terminating ? 'T' : L.pre === '' ? 'P' : 'M'; });
  Q('ma1', matchQ({ stem: 'Match each number in Column I with the kind of decimal expansion it has in Column II.', left: [r`$\dfrac{7}{20}$`, r`$\dfrac{4}{9}$`, r`$\dfrac{11}{30}$`, r`$\sqrt{10}$`], right: ['terminates', 'recurs from the first digit after the point', 'recurs after some non-repeating digits', 'never ends and never repeats'], order: [0, 1, 2, 3], sol: r`$\dfrac{7}{20} = 0.35$ terminates. $\dfrac{4}{9} = 0.\overline{4}$ repeats from the first digit. $\dfrac{11}{30} = 0.3\overline{6}$ has one non-repeating digit, $3$, before the repeating $6$. $\sqrt{10}$ is irrational, so its expansion never ends and never repeats.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(kinds.join('') === 'TPM' && isRatSquare(10, 1) === false, 'terminating, pure recurring, mixed recurring, irrational'); });
}
{
  const vals = [ratPow(8, 2, 3), ratPow(25, -1, 2), ratPow(27, 4, 3), ratPow(1000, 1, 3)];
  Q('ma2', matchQ({ stem: 'Match each power in Column I with its value in Column II.', left: [r`$8^{\frac{2}{3}}$`, r`$25^{-\frac{1}{2}}$`, r`$27^{\frac{4}{3}}$`, r`$1000^{\frac{1}{3}}$`], right: ['$4$', r`$\dfrac{1}{5}$`, '$81$', '$10$'], order: [0, 1, 2, 3], sol: r`$8^{\frac{2}{3}} = (2)^{2} = 4$. $25^{-\frac{1}{2}} = \dfrac{1}{5}$. $27^{\frac{4}{3}} = 3^{4} = 81$. $1000^{\frac{1}{3}} = 10$.`, d: 2, c: 'application', t: [4] }), (Cx) => { Cx.assert(vals.map(String).join() === '4,1/5,81,10', 'values 4, 1/5, 81, 10'); });
}

// =============================================================== numerical
{
  const L = longDiv(1, 17);
  Q('n01', mk.num({ stem: r`How many digits are in the repeating block of the decimal expansion of $\dfrac{1}{17}$?`, value: 16, sol: r`Long division of $1$ by $17$ gives remainders that run through $16$ different non-zero values before returning to $1$: the block is $0588235294117647$. The number of digits is $16$.`, scheme: [['Long division with remainders tracked', 0.5], ['Block has 16 digits', 0.5]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(L.pre === '' && L.rep === '0588235294117647' && L.period === 16, '16 digits'); Cx.val(L.period); });
}
{
  const v = (Math.sqrt(5) + Math.sqrt(3)) ** 2 - 2 * Math.sqrt(15);
  Q('n02', mk.num({ stem: r`Find the value of $(\sqrt{5} + \sqrt{3})^{2} - 2\sqrt{15}$.`, value: 8, sol: r`$(\sqrt{5} + \sqrt{3})^{2} - 2\sqrt{15} = 5 + 3 + 2\sqrt{15} - 2\sqrt{15} = 8$.`, scheme: [['Expand the square: 5 + 3 + 2 root 15', 0.5], ['The surds cancel, giving 8', 0.5]], d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(Math.abs(v - 8) < 1e-9, '8'); Cx.val(8); });
}
{
  const xs = [...Array(10).keys()].filter((x) => 2 ** (x - 1) * 4 ** (x + 1) === 128);
  Q('n03', mk.num({ stem: r`If $2^{x-1} \times 4^{x+1} = 128$, find $x$.`, value: 2, sol: r`Write $4 = 2^{2}$ and $128 = 2^{7}$. Then $2^{x-1} \times 2^{2x+2} = 2^{3x+1}$, so $3x + 1 = 7$ and $x = 2$.`, scheme: [['Same base 2 on both sides', 0.5], ['3x + 1 = 7, so x = 2', 0.5]], d: 3, c: 'application', t: [4], time: 90 }), (Cx) => { Cx.assert(xs.join() === '2', 'x = 2'); Cx.val(xs[0]); });
}

// CBSE 9 Mathematics ch01 Number System: written items (short 2 and 3 marks, long 5 marks, case-based) with re-solve checks.
// Decimal expansions come from long division, recurring decimals from the 10^k trick, surds from integer arithmetic; each model answer
// is compared with a direct floating-point evaluation (1e-9) and the numbers quoted in it are checked by Cx.model.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, F, longDiv, recurFrac, recurValue, decDigits, ratio, sd, sdv, smul, ratPow, isRatSquare, terminates, simplifySurd } from './nm.mjs';

const dec = (v, n = 2) => (Math.round(v * 10 ** n) / 10 ** n).toString();
const near = (a, b) => Math.abs(a - b) < 1e-9;

// =============================================================== short answer, 2 marks
{
  const x1 = Number('0.2' + '0' + '2' + '00' + '2' + '000' + '2'), x2 = Math.sqrt(0.07);
  Q('s201', mk.short({ marks: 2, stem: r`Write one rational number and two irrational numbers that lie between $0.2$ and $0.3$, and give a reason for each being irrational.`, model: r`Rational: $0.25 = \dfrac{1}{4}$.\n\nIrrational: $0.2020020002\ldots$ (each new $2$ comes after one more $0$), because its decimal neither ends nor repeats a block; and $\sqrt{0.07} \approx 0.2646$, because $0.07 = \dfrac{7}{100}$ is not the square of a rational number.`, sol: 'Check that each number is between 0.2 and 0.3, then justify irrationality by the decimal pattern or the square-root test.', scheme: [['A rational number between, such as 0.25', 0.5], ['Two irrational numbers between 0.2 and 0.3', 1], ['A reason for each', 0.5]], d: 2, c: 'application', t: [1, 2], time: 90 }), (Cx) => { Cx.assert(x1 > 0.2 && x1 < 0.3 && x2 > 0.2 && x2 < 0.3 && !isRatSquare(7, 100) && Math.abs(x2 - 0.2646) < 5e-5, 'all three numbers lie between 0.2 and 0.3'); Cx.model([0.25, 0.07, 0.2646, 100]); });
}
Q('s202', mk.short({ marks: 2, stem: r`It is known that $\sqrt{2}$ is irrational. Use this to show that $5 + 3\sqrt{2}$ is irrational.`, model: r`Suppose $5 + 3\sqrt{2}$ were rational, say equal to $\dfrac{p}{q}$ with $q \neq 0$.\n\nThen $\sqrt{2} = \dfrac{1}{3}\left(\dfrac{p}{q} - 5\right) = \dfrac{p - 5q}{3q}$, which is a quotient of integers, so $\sqrt{2}$ would be rational. This contradicts the fact that $\sqrt{2}$ is irrational, so $5 + 3\sqrt{2}$ is irrational.`, sol: 'Assume it is rational and solve for the square root of 2.', scheme: [['Assume 5 + 3 root 2 = p/q and solve for root 2', 1], ['Root 2 would be rational: contradiction', 1]], d: 3, c: 'analysis', t: [1], time: 120 }), null, 'proof by contradiction: the key steps are the isolation of root 2 as (p - 5q)/(3q) and the contradiction; marked by the scheme');
{
  const L = Math.hypot(2, 1);
  Q('s203', mk.short({ marks: 2, stem: r`Rhea draws a number line in her notebook and wants to mark $\sqrt{5}$ using a right triangle with whole-number sides. Describe the construction and explain why it works.`, model: r`Mark $O = 0$ and $A = 2$ on the line. At $A$ draw $AB = 1$ unit at right angles to the line.\n\nBy the Pythagoras theorem $OB^{2} = 2^{2} + 1^{2} = 5$, so $OB = \sqrt{5}$. With centre $O$ and radius $OB$, draw an arc that cuts the number line at $P$. Then $P$ stands for $\sqrt{5} \approx 2.236$.`, sol: 'Choose legs 2 and 1 because 4 + 1 = 5.', scheme: [['Right triangle with legs 2 and 1 and OB squared is 5', 1], ['Arc with centre O and radius OB cuts the line at P', 1]], d: 2, c: 'application', t: [1], time: 105 }), (Cx) => { Cx.assert(near(L * L, 5) && near(L, Math.sqrt(5)) && Math.abs(L - 2.236) < 5e-4, 'OB = root 5'); Cx.model([2, 1, 5, 2.236]); });
}
{
  const fr = recurFrac(0, '', '24');
  Q('s204', mk.short({ marks: 2, stem: r`A water meter in a Hubballi housing society shows a ratio of $0.242424\ldots$. Write $0.\overline{24}$ in the form $\dfrac{p}{q}$ in lowest terms.`, model: r`Let $x = 0.\overline{24}$. Then $100x = 24.\overline{24}$.\n\nSubtracting, $99x = 24$, so $x = \dfrac{24}{99} = \dfrac{8}{33}$.`, sol: 'Multiply by 100 because the block has two digits.', scheme: [['100x = 24.2424... and 99x = 24', 1], ['x = 24/99 = 8/33', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(fr.eq(F(8, 33)) && near(recurValue(0, '', '24'), 8 / 33), '8/33'); Cx.model([100, 24, 99, 8, 33]); });
}
{
  Q('s205', mk.short({ marks: 2, stem: r`Without doing long division, decide which of $\dfrac{9}{80}$ and $\dfrac{11}{45}$ has a terminating decimal expansion. Give a reason.`, model: r`$80 = 2^{4} \times 5$ has no prime factor other than $2$ and $5$, so $\dfrac{9}{80}$ terminates ($0.1125$).\n\n$45 = 3^{2} \times 5$ has the prime factor $3$, and $\dfrac{11}{45}$ is in lowest terms, so its expansion does not terminate ($0.2\overline{4}$).`, sol: 'Factorise the denominators in lowest terms.', scheme: [['9/80: 80 = 2^4 x 5, terminates', 1], ['11/45: 45 has the factor 3, does not terminate', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(terminates(9, 80) && !terminates(11, 45) && longDiv(9, 80).pre === '1125' && longDiv(11, 45).pre === '2' && longDiv(11, 45).rep === '4', '9/80 = 0.1125; 11/45 = 0.2 recurring 4'); Cx.model([80, 45, 9, 11]); });
}
{
  const v = 2 * Math.sqrt(50) + 3 * Math.sqrt(18) - Math.sqrt(8);
  Q('s206', mk.short({ marks: 2, stem: r`A cloth shop in Jaipur has a border piece of length $2\sqrt{50}$ m joined to a piece of length $3\sqrt{18}$ m, and then cuts off $\sqrt{8}$ m. Find the remaining length in simplest surd form.`, model: r`$2\sqrt{50} = 2 \times 5\sqrt{2} = 10\sqrt{2}$, $3\sqrt{18} = 3 \times 3\sqrt{2} = 9\sqrt{2}$ and $\sqrt{8} = 2\sqrt{2}$.\n\nRemaining length $= 10\sqrt{2} + 9\sqrt{2} - 2\sqrt{2} = 17\sqrt{2}$ m.`, sol: 'Make every term a multiple of root 2.', scheme: [['Each surd simplified: 10 root 2, 9 root 2, 2 root 2', 1], ['Combined: 17 root 2 m', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(near(v, 17 * Math.SQRT2) && sd(0, 1, 50) === '5\\sqrt{2}', '17 root 2'); Cx.model([10, 9, 2, 17]); });
}
{
  const v = 18 / Math.sqrt(12);
  Q('s207', mk.short({ marks: 2, stem: r`Rationalise the denominator of $\dfrac{18}{\sqrt{12}}$ and write the answer in simplest form.`, model: r`$\sqrt{12} = 2\sqrt{3}$, so $\dfrac{18}{\sqrt{12}} = \dfrac{18}{2\sqrt{3}} = \dfrac{9}{\sqrt{3}}$.\n\nMultiplying the top and bottom by $\sqrt{3}$ gives $\dfrac{9\sqrt{3}}{3} = 3\sqrt{3}$.`, sol: 'Simplify the root first, then rationalise.', scheme: [['Simplify: 18/(2 root 3) = 9/root 3', 1], ['Rationalise: 3 root 3', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(near(v, 3 * Math.sqrt(3)), '3 root 3'); Cx.model([12, 18, 9, 3]); });
}
{
  const v = Math.pow(81, 3 / 4) / Math.pow(27, 2 / 3);
  Q('s208', mk.short({ marks: 2, stem: r`Evaluate $81^{\frac{3}{4}} \div 27^{\frac{2}{3}}$.`, model: r`$81^{\frac{3}{4}} = (81^{\frac{1}{4}})^{3} = 3^{3} = 27$ and $27^{\frac{2}{3}} = (27^{\frac{1}{3}})^{2} = 3^{2} = 9$.\n\nSo the value is $27 \div 9 = 3$.`, sol: 'Take the root first, then the power.', scheme: [['81^(3/4) = 27 and 27^(2/3) = 9', 1], ['27 divided by 9 is 3', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (Cx) => { Cx.assert(near(v, 3) && ratPow(81, 3, 4).eq(F(27)) && ratPow(27, 2, 3).eq(F(9)), '3'); Cx.model([3, 27, 9, 81]); });
}

// =============================================================== short answer, 3 marks
{
  const fr = recurFrac(0, '7', '2');
  Q('s301', mk.short({ marks: 3, stem: r`Express $0.7\overline{2} = 0.72222\ldots$ in the form $\dfrac{p}{q}$ with $p$ and $q$ integers and $q \neq 0$.`, model: r`Let $x = 0.7\overline{2}$. Then $10x = 7.\overline{2}$ and $100x = 72.\overline{2}$.\n\nSubtracting, $90x = 65$, so $x = \dfrac{65}{90} = \dfrac{13}{18}$.`, sol: 'Make two multiples of x with the same repeating tail and subtract.', scheme: [['10x = 7.222... and 100x = 72.222...', 1], ['90x = 65', 1], ['x = 13/18', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(fr.eq(F(13, 18)) && near(recurValue(0, '7', '2'), 13 / 18), '13/18'); Cx.model([10, 100, 7, 72, 90, 65, 13, 18]); });
}
{
  const L = longDiv(4, 7);
  Q('s302', mk.short({ marks: 3, stem: r`Divide $4$ by $7$ by long division and write the decimal expansion. State the block of digits that repeats and how many digits it has.`, model: r`The remainders are $4, 5, 1, 3, 2, 6$ and then $4$ again, so the digits repeat.\n\n$\dfrac{4}{7} = 0.571428\,571428\ldots = 0.\overline{571428}$.\n\nThe repeating block is $571428$, which has $6$ digits.`, sol: 'Track the remainders; the first repeat marks the end of the block.', scheme: [['Long division with remainders 4, 5, 1, 3, 2, 6', 1], ['Expansion 0.571428571428...', 1], ['Block 571428 with 6 digits', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (Cx) => { Cx.assert(L.rems.slice(0, 7).join() === '4,5,1,3,2,6,4' && L.rep === '571428' && L.pre === '' && L.period === 6, 'block 571428'); Cx.model([4, 5, 1, 3, 2, 6, 571428]); });
}
{
  const v = 1 / (3 + Math.SQRT2) + 1 / (3 - Math.SQRT2);
  Q('s303', mk.short({ marks: 3, stem: r`Simplify $\dfrac{1}{3 + \sqrt{2}} + \dfrac{1}{3 - \sqrt{2}}$.`, model: r`Add the fractions over the common denominator: $\dfrac{(3 - \sqrt{2}) + (3 + \sqrt{2})}{(3 + \sqrt{2})(3 - \sqrt{2})}$.\n\nThe numerator is $6$. The denominator is $3^{2} - (\sqrt{2})^{2} = 9 - 2 = 7$.\n\nSo the sum is $\dfrac{6}{7}$.`, sol: 'Use the common denominator, which is a difference of squares.', scheme: [['Common denominator (3 + root 2)(3 - root 2)', 1], ['Numerator 6 and denominator 9 - 2 = 7', 1], ['Sum 6/7', 1]], d: 3, c: 'application', t: [3], time: 120 }), (Cx) => { Cx.assert(near(v, 6 / 7), '6/7'); Cx.model([3, 2, 6, 9, 7]); });
}
{
  const [p, q, den] = ratio(5, 1, 5, -1, 3); // (5 + sqrt3)/(5 - sqrt3)
  const a = p / den, b = q / den;
  Q('s304', mk.short({ marks: 3, stem: r`Find rational numbers $a$ and $b$ such that $\dfrac{5 + \sqrt{3}}{5 - \sqrt{3}} = a + b\sqrt{3}$.`, model: r`Multiply the top and bottom by the conjugate $5 + \sqrt{3}$.\n\nNumerator: $(5 + \sqrt{3})^{2} = 25 + 10\sqrt{3} + 3 = 28 + 10\sqrt{3}$. Denominator: $5^{2} - (\sqrt{3})^{2} = 25 - 3 = 22$.\n\nSo the value is $\dfrac{28 + 10\sqrt{3}}{22} = \dfrac{14}{11} + \dfrac{5}{11}\sqrt{3}$, and $a = \dfrac{14}{11}$, $b = \dfrac{5}{11}$.`, sol: 'Multiply by the conjugate of the denominator, then split the fraction.', scheme: [['Multiply by 5 + root 3', 1], ['28 + 10 root 3 over 22', 1], ['a = 14/11 and b = 5/11', 1]], d: 3, c: 'application', t: [3], time: 135 }), (Cx) => { Cx.assert(p === 28 && q === 10 && den === 22 && near(a + b * Math.sqrt(3), (5 + Math.sqrt(3)) / (5 - Math.sqrt(3))) && F(p, den).eq(F(14, 11)) && F(q, den).eq(F(5, 11)), 'a = 14/11, b = 5/11'); Cx.model([5, 28, 10, 22, 14, 11]); });
}
{
  const v = (Math.pow(125, 2 / 3) * Math.pow(8, -1 / 3)) / 5;
  Q('s305', mk.short({ marks: 3, stem: r`Evaluate $\left(125^{\frac{2}{3}} \times 8^{-\frac{1}{3}}\right) \div 5$.`, model: r`$125^{\frac{2}{3}} = (5)^{2} = 25$ because $125^{\frac{1}{3}} = 5$.\n\n$8^{-\frac{1}{3}} = \dfrac{1}{8^{\frac{1}{3}}} = \dfrac{1}{2}$.\n\nSo the value is $\left(25 \times \dfrac{1}{2}\right) \div 5 = \dfrac{25}{2} \times \dfrac{1}{5} = \dfrac{5}{2}$.`, sol: 'Evaluate each power exactly, then multiply and divide.', scheme: [['125^(2/3) = 25', 1], ['8^(-1/3) = 1/2', 1], ['(25 x 1/2) / 5 = 5/2', 1]], d: 3, c: 'application', t: [4], time: 120 }), (Cx) => { Cx.assert(near(v, 2.5) && ratPow(125, 2, 3).eq(F(25)) && ratPow(8, -1, 3).eq(F(1, 2)), '5/2'); Cx.model([125, 25, 8, 2, 5]); });
}

// =============================================================== long answer, 5 marks
{
  const a10 = Math.hypot(3, 1), a13 = Math.hypot(3, 2);
  Q('l01', mk.long({ stem: r`Rhea in a Jaipur school makes a number-line chart and wants to mark $\sqrt{10}$ and $\sqrt{13}$. (a) Choose whole-number legs of a right triangle for each, and show by the Pythagoras theorem that the hypotenuse is the required square root. (b) Describe the construction on the line. (c) Give each position correct to $2$ decimal places. (d) Which of the two points is nearer to $3.5$, and by how much?`, model: r`**(a)** For $\sqrt{10}$ take legs $3$ and $1$: $3^{2} + 1^{2} = 10$. For $\sqrt{13}$ take legs $3$ and $2$: $3^{2} + 2^{2} = 13$.\n\n**(b)** Mark $O = 0$ and $A = 3$ on the line. At $A$ draw a perpendicular $AB$ of length $1$ (for $\sqrt{10}$) or $2$ (for $\sqrt{13}$). With centre $O$ and radius $OB$, draw an arc that cuts the line at $P$; $OP = OB$.\n\n**(c)** $\sqrt{10} \approx ${dec(a10)}$ and $\sqrt{13} \approx ${dec(a13)}$.\n\n**(d)** $3.5 - ${dec(a10, 4)} \approx ${dec(3.5 - a10)}$ and $${dec(a13, 4)} - 3.5 \approx ${dec(a13 - 3.5)}$. Since $${dec(a13 - 3.5)} < ${dec(3.5 - a10)}$, the point $\sqrt{13}$ is nearer to $3.5$, by about $${dec(3.5 - a10 - (a13 - 3.5))}$.`, sol: 'Write the number as a sum of two squares; the arc carries the hypotenuse onto the line.', scheme: [['(a) legs 3, 1 and 3, 2 with the Pythagoras sums 10 and 13', 1], ['(b) perpendicular at A and arc with centre O', 1.5], ['(c) 3.16 and 3.61', 1], ['(d) distances 0.34 and 0.11, so root 13 is nearer', 1.5]], d: 3, c: 'application', t: [1], time: 420 }), (Cx) => { Cx.assert(9 + 1 === 10 && 9 + 4 === 13 && dec(a10) === '3.16' && dec(a13) === '3.61' && dec(3.5 - a10) === '0.34' && dec(a13 - 3.5) === '0.11', 'positions and distances'); Cx.model([3, 1, 10, 2, 13, 3.16, 3.61, 0.34, 0.11]); });
}
{
  const L = longDiv(2, 13), d100 = decDigits(2, 13, 100).slice(-1);
  Q('l02', mk.long({ stem: r`(a) Divide $2$ by $13$ by long division, writing down the remainders, until a remainder repeats. (b) Write the decimal expansion and the block that repeats, and state how many digits it has. (c) Find the $100$th digit after the decimal point. (d) Is $\dfrac{2}{13}$ a terminating, recurring or non-recurring decimal, and what does this tell you about the kind of number it is?`, model: r`**(a)** The remainders are $2, 7, 5, 11, 6, 8$ and then $2$ again.\n\n**(b)** $\dfrac{2}{13} = 0.153846\,153846\ldots = 0.\overline{153846}$. The block $153846$ has $6$ digits.\n\n**(c)** $100 = 16 \times 6 + 4$, so after $16$ full blocks the $100$th digit is the $4$th digit of the block $153846$, which is $${d100}$.\n\n**(d)** The decimal is recurring, since the block repeats for ever. A number with a recurring decimal expansion is rational, as $\dfrac{2}{13}$ itself shows.`, sol: 'The 100th digit depends on the remainder when 100 is divided by the block length.', scheme: [['(a) remainders 2, 7, 5, 11, 6, 8, then 2', 1.5], ['(b) 0.153846 recurring, block of 6 digits', 1], ['(c) 100 = 16 x 6 + 4, the 4th digit is 8', 1.5], ['(d) recurring, so rational', 1]], d: 4, c: 'analysis', t: [2], time: 420 }), (Cx) => { Cx.assert(L.rems.slice(0, 7).join() === '2,7,5,11,6,8,2' && L.rep === '153846' && 100 === 16 * 6 + 4 && d100 === '8' && '153846'[3] === '8', 'block 153846, 100th digit 8'); Cx.model([2, 7, 5, 11, 6, 8, 153846, 6, 100, 16, 4, 8]); });
}
{
  const a = recurFrac(0, '', '63'), b = recurFrac(0, '1', '36'), s = a.add(b), L = longDiv(s.n, s.d);
  Q('l03', mk.long({ stem: r`(a) Express $0.\overline{63}$ as a fraction in lowest terms. (b) Express $0.1\overline{36} = 0.1363636\ldots$ as a fraction in lowest terms. (c) Add the two fractions and write the sum in lowest terms. (d) Write the sum as a decimal by long division, and say whether it recurs from the first digit or after some non-repeating digits.`, model: r`**(a)** Let $x = 0.\overline{63}$. Then $100x = 63.\overline{63}$, so $99x = 63$ and $x = \dfrac{63}{99} = \dfrac{7}{11}$.\n\n**(b)** Let $y = 0.1\overline{36}$. Then $10y = 1.\overline{36}$ and $1000y = 136.\overline{36}$, so $990y = 135$ and $y = \dfrac{135}{990} = \dfrac{3}{22}$.\n\n**(c)** $\dfrac{7}{11} + \dfrac{3}{22} = \dfrac{14}{22} + \dfrac{3}{22} = \dfrac{17}{22}$.\n\n**(d)** Long division gives $\dfrac{17}{22} = 0.7727272\ldots = 0.7\overline{72}$. The digit $7$ does not repeat, and the block $72$ repeats, so it recurs after one non-repeating digit.`, sol: 'Use two multiples of the unknown that have the same repeating tail.', scheme: [['(a) 99x = 63, x = 7/11', 1.5], ['(b) 990y = 135, y = 3/22', 1.5], ['(c) the sum 17/22', 1], ['(d) 0.7 recurring 72, after one non-repeating digit', 1]], d: 4, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert(a.eq(F(7, 11)) && b.eq(F(3, 22)) && s.eq(F(17, 22)) && L.pre === '7' && L.rep === '72' && near(recurValue(0, '', '63'), 7 / 11) && near(recurValue(0, '1', '36'), 3 / 22), '7/11, 3/22, 17/22 = 0.7 recurring 72'); Cx.model([63, 99, 7, 11, 136, 990, 135, 3, 22, 17, 72]); });
}
{
  const aV = 2 * Math.sqrt(75) - Math.sqrt(12) + Math.sqrt(27);
  const [p, q, den] = ratio(3, 2, 3, -2, 5); // (3 + 2 sqrt5)/(3 - 2 sqrt5)
  const val = (3 + 2 * Math.sqrt(5)) / (3 - 2 * Math.sqrt(5));
  Q('l04', mk.long({ stem: r`(a) Simplify $2\sqrt{75} - \sqrt{12} + \sqrt{27}$ and give the result as a multiple of a single surd. (b) Rationalise the denominator of $\dfrac{3 + 2\sqrt{5}}{3 - 2\sqrt{5}}$ and write it in the form $a + b\sqrt{5}$ with rational $a$ and $b$. (c) Check your answer to (b) by evaluating both sides numerically to $2$ decimal places.`, model: r`**(a)** $2\sqrt{75} = 2 \times 5\sqrt{3} = 10\sqrt{3}$, $\sqrt{12} = 2\sqrt{3}$ and $\sqrt{27} = 3\sqrt{3}$. So the value is $10\sqrt{3} - 2\sqrt{3} + 3\sqrt{3} = 11\sqrt{3}$.\n\n**(b)** Multiply the top and bottom by $3 + 2\sqrt{5}$. The numerator is $(3 + 2\sqrt{5})^{2} = 9 + 12\sqrt{5} + 20 = 29 + 12\sqrt{5}$. The denominator is $3^{2} - (2\sqrt{5})^{2} = 9 - 20 = -11$.\n\nSo the value is $-\dfrac{29 + 12\sqrt{5}}{11} = -\dfrac{29}{11} - \dfrac{12}{11}\sqrt{5}$.\n\n**(c)** Directly, $\dfrac{3 + 2\sqrt{5}}{3 - 2\sqrt{5}} \approx ${dec(val)}$, and $-\dfrac{29 + 12\sqrt{5}}{11} \approx ${dec(-(29 + 12 * Math.sqrt(5)) / 11)}$. The two agree.`, sol: 'Simplify each root first; for the fraction use the conjugate, whose product with the denominator is 9 minus 20.', scheme: [['(a) 10 root 3 - 2 root 3 + 3 root 3 = 11 root 3', 1.5], ['(b) numerator 29 + 12 root 5', 1], ['(b) denominator -11 and the result', 1], ['(c) both sides are about -5.08', 1.5]], d: 4, c: 'application', t: [3], time: 450 }), (Cx) => { Cx.assert(near(aV, 11 * Math.sqrt(3)) && p === 29 && q === 12 && den === -11 && near(val, -(29 + 12 * Math.sqrt(5)) / 11) && dec(val) === '-5.08', '11 root 3; -(29 + 12 root 5)/11 = -5.08'); Cx.model([75, 12, 27, 10, 11, 29, 12, 20, 5.08]); });
}
{
  const a = ratPow(64, 2, 3).mul(ratPow(32, -2, 5)), b = F(27, 8).num() ** (-2 / 3);
  const xs = [...Array(12).keys()].filter((x) => 4 ** (x + 1) === 8 ** x);
  Q('l05', mk.long({ stem: r`(a) Evaluate $64^{\frac{2}{3}} \times 32^{-\frac{2}{5}}$. (b) Evaluate $\left(\dfrac{27}{8}\right)^{-\frac{2}{3}}$. (c) Find $x$ if $4^{x+1} = 8^{x}$, showing the common base.`, model: r`**(a)** $64^{\frac{1}{3}} = 4$, so $64^{\frac{2}{3}} = 4^{2} = 16$. $32^{\frac{1}{5}} = 2$, so $32^{-\frac{2}{5}} = 2^{-2} = \dfrac{1}{4}$. The product is $16 \times \dfrac{1}{4} = 4$.\n\n**(b)** $\left(\dfrac{27}{8}\right)^{\frac{1}{3}} = \dfrac{3}{2}$, so $\left(\dfrac{27}{8}\right)^{\frac{2}{3}} = \dfrac{9}{4}$, and the negative sign gives the reciprocal: $\left(\dfrac{27}{8}\right)^{-\frac{2}{3}} = \dfrac{4}{9}$.\n\n**(c)** Write $4 = 2^{2}$ and $8 = 2^{3}$. Then $2^{2(x+1)} = 2^{3x}$, so $2x + 2 = 3x$ and $x = 2$. Check: $4^{3} = 64 = 8^{2}$.`, sol: 'Reduce every number to a power of a small prime, then use the laws of exponents.', scheme: [['(a) 16 and 1/4, product 4', 1.5], ['(b) 4/9 using the cube root 3/2', 1.5], ['(c) common base 2: 2x + 2 = 3x', 1], ['(c) x = 2 with the check', 1]], d: 4, c: 'application', t: [4], time: 420 }), (Cx) => { Cx.assert(a.eq(F(4)) && near(b, 4 / 9) && xs.join() === '2' && 4 ** 3 === 64 && 8 ** 2 === 64, '4; 4/9; x = 2'); Cx.model([64, 16, 32, 4, 27, 8, 9, 2, 64]); });
}

// =============================================================== case-based
{
  Q.length; // (no-op: keeps the section layout readable)
  const ob = Math.hypot(2, 1), cm = Math.round(5 * ob);
  caseQ('c01', {
    passage: r`Ananya's school in Nagpur is making a number-line wall chart in which $1$ unit is $5$ cm. She marks $O = 0$ and $A = 2$ on the line, draws $AB = 1$ unit at right angles to the line at $A$, joins $OB$, and with centre $O$ and radius $OB$ draws an arc that cuts the line at $P$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${cm}$ cm. (c) (i) $4 < 5 < 9$, so $2 < \sqrt{5} < 3$. Or (ii) $2.2^{2} = 4.84$ and $2.3^{2} = 5.29$, so $2.2 < \sqrt{5} < 2.3$.`,
    sol: r`(a) $OB^{2} = 2^{2} + 1^{2} = 5$. (b) $OP = \sqrt{5}$ units $\approx 2.236$ units, so $5\sqrt{5} \approx 11.18$ cm, which is $11$ cm to the nearest cm. (c) (i) the squares $4 < 5 < 9$ give $2 < \sqrt{5} < 3$. (ii) $4.84 < 5 < 5.29$ gives $2.2 < \sqrt{5} < 2.3$.`,
    children: [
      child('a', mk.mcq({ stem: 'The length $OB$, in units, is', opts: [r`$\sqrt{5}$`, '$3$', r`$\sqrt{3}$`, '$5$'], key: 'a', sol: r`$OB^{2} = OA^{2} + AB^{2} = 2^{2} + 1^{2} = 5$, so $OB = \sqrt{5}$. The value $3$ adds the legs, and $\sqrt{3}$ subtracts the squares.`, d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'How far from $O$, in cm and to the nearest cm, is the point $P$ on the wall chart?', value: 11, unit: 'cm', tol: 0.5, sol: r`$OP = OB = \sqrt{5}$ units, and $1$ unit is $5$ cm. So $OP = 5\sqrt{5} \approx 11.18$ cm, which is $11$ cm to the nearest cm.`, scheme: [['5 root 5 is about 11.18, so 11 cm', 1]], d: 2, c: 'application', t: [1], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Show that $P$ lies between $2$ and $3$ on the chart, by comparing squares.', model: r`$2^{2} = 4$, $3^{2} = 9$ and $4 < 5 < 9$. Taking positive square roots, $2 < \sqrt{5} < 3$, so $P$ lies between $2$ and $3$.`, sol: 'Compare 5 with the squares 4 and 9.', scheme: [['4 < 5 < 9', 1], ['2 < root 5 < 3', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Show that $\\sqrt{5}$ lies between $2.2$ and $2.3$.', model: r`$2.2^{2} = 4.84$ and $2.3^{2} = 5.29$. Since $4.84 < 5 < 5.29$, taking square roots gives $2.2 < \sqrt{5} < 2.3$.`, sol: 'Square the end points and compare with 5.', scheme: [['2.2 squared is 4.84 and 2.3 squared is 5.29', 1], ['4.84 < 5 < 5.29, so 2.2 < root 5 < 2.3', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([ob, 3, Math.sqrt(3), 5], Math.sqrt(5));
    Cx.child('b').val(cm);
    Cx.child('c').assert(2 ** 2 < 5 && 5 < 3 ** 2, '4 < 5 < 9');
    Cx.child('c').model([4, 5, 9, 2, 3]);
    Cx.child('cii').assert(2.2 ** 2 < 5 && 5 < 2.3 ** 2 && dec(2.2 ** 2) === '4.84' && dec(2.3 ** 2) === '5.29', '4.84 < 5 < 5.29');
    Cx.child('cii').model([2.2, 4.84, 2.3, 5.29, 5]);
  });
}
{
  const L = longDiv(3, 11), five8 = longDiv(5, 8);
  caseQ('c02', {
    passage: r`At a school camp in Shillong, $3$ litres of juice are shared equally among $11$ children. The volunteer divides $3$ by $11$ on a calculator and sees the display $0.27272727\ldots$ in litres per child.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${L.period}$. (c) (i) $x = 0.\overline{27}$, $100x = 27.\overline{27}$, $99x = 27$, so $x = \dfrac{27}{99} = \dfrac{3}{11}$. Or (ii) $\dfrac{5}{8} = 0.625$, which terminates because $8 = 2^{3}$.`,
    sol: r`(a) Long division of $3$ by $11$ gives $0.272727\ldots$ with the block $27$. (b) The block $27$ has $${L.period}$ digits. (c) (i) subtracting $x$ from $100x$ gives $99x = 27$, so $x = \dfrac{3}{11}$. (ii) $8 = 2^{3}$ has only the prime factor $2$, so $\dfrac{5}{8} = 0.625$ terminates.`,
    children: [
      child('a', mk.mcq({ stem: 'The amount each child gets, written with the repeating block marked, is', opts: [r`$0.\overline{27}$`, '$0.27$', r`$0.2\overline{7}$`, r`$0.\overline{72}$`], key: 'a', sol: r`Long division of $3$ by $11$ gives the digits $2, 7, 2, 7, \ldots$, so the block $27$ repeats from the first digit after the point: $0.\overline{27}$. The value $0.27$ stops too soon, and $0.2\overline{7}$ would repeat only the $7$.`, d: 2, c: 'understanding', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'How many digits are in the repeating block of this decimal?', value: 2, sol: r`The remainders in the division are $3$ and $8$, and then $3$ again, so the digits repeat after two steps. The block $27$ has $2$ digits.`, scheme: [['Block 27 has 2 digits', 1]], d: 1, c: 'understanding', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Show that $0.\\overline{27} = \\dfrac{3}{11}$ by the method of multiplying by a power of $10$.', model: r`Let $x = 0.\overline{27}$. Then $100x = 27.\overline{27}$.\n\nSubtracting, $99x = 27$, so $x = \dfrac{27}{99} = \dfrac{3}{11}$.`, sol: 'The block has two digits, so multiply by 100.', scheme: [['100x = 27.2727... and 99x = 27', 1], ['x = 27/99 = 3/11', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** If $5$ litres were shared equally among $8$ children, would each share be a terminating or a recurring decimal? Give a reason and the value.', model: r`$\dfrac{5}{8}$ is in lowest terms and $8 = 2^{3}$ has no prime factor other than $2$ and $5$, so the decimal terminates.\n\nLong division gives $\dfrac{5}{8} = 0.625$ litre.`, sol: 'Check the prime factors of the denominator.', scheme: [['8 = 2^3, so it terminates', 1], ['0.625 litre', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(L.pre === '' && L.rep === '27' && L.period === 2 && L.rems.slice(0, 3).join() === '3,8,3', '3/11 = 0.27 recurring');
    Cx.child('a').key('a');
    Cx.child('b').val(L.period);
    Cx.child('c').assert(recurFrac(0, '', '27').eq(F(3, 11)), '27/99 = 3/11');
    Cx.child('c').model([100, 27, 99, 3, 11]);
    Cx.child('cii').assert(five8.terminating && five8.pre === '625' && terminates(5, 8), '5/8 = 0.625');
    Cx.child('cii').model([8, 2, 5, 0.625]);
  });
}
{
  const area = (3 + Math.sqrt(5)) * (3 - Math.sqrt(5)), perim = 2 * ((3 + Math.sqrt(5)) + (3 - Math.sqrt(5)));
  const diag = Math.sqrt((3 + Math.sqrt(5)) ** 2 + (3 - Math.sqrt(5)) ** 2);
  const [p, q, den] = ratio(3, 1, 3, -1, 5); // (3 + sqrt5)/(3 - sqrt5)
  const ratioV = (3 + Math.sqrt(5)) / (3 - Math.sqrt(5));
  caseQ('c03', {
    passage: r`A narrow rectangular flower bed in a Kochi park has length $(3 + \sqrt{5})$ m and breadth $(3 - \sqrt{5})$ m.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${perim}$ m. (c) (i) The diagonal squared is $(3 + \sqrt{5})^{2} + (3 - \sqrt{5})^{2} = 28$, so the diagonal is $2\sqrt{7}$ m. Or (ii) $\dfrac{3 + \sqrt{5}}{3 - \sqrt{5}} = \dfrac{14 + 6\sqrt{5}}{4} = \dfrac{7 + 3\sqrt{5}}{2}$.`,
    sol: r`(a) Area $= (3 + \sqrt{5})(3 - \sqrt{5}) = 9 - 5 = 4$ m$^{2}$. (b) Perimeter $= 2[(3 + \sqrt{5}) + (3 - \sqrt{5})] = 2 \times 6 = ${perim}$ m. (c) (i) $(3 + \sqrt{5})^{2} = 14 + 6\sqrt{5}$ and $(3 - \sqrt{5})^{2} = 14 - 6\sqrt{5}$, so their sum is $28$ and the diagonal is $\sqrt{28} = 2\sqrt{7}$ m. (ii) multiply the top and bottom by $3 + \sqrt{5}$: the denominator is $9 - 5 = 4$.`,
    children: [
      child('a', mk.mcq({ stem: 'The area of the flower bed, in square metres, is', opts: ['$4$', '$14$', '$6$', r`$2\sqrt{5}$`], key: 'a', sol: r`Area $= (3 + \sqrt{5})(3 - \sqrt{5}) = 3^{2} - (\sqrt{5})^{2} = 9 - 5 = 4$. The value $14$ adds the squares instead of subtracting them.`, d: 2, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the perimeter of the flower bed in metres.', value: 12, unit: 'm', sol: r`Perimeter $= 2 \times [(3 + \sqrt{5}) + (3 - \sqrt{5})] = 2 \times 6 = 12$ m. The surd parts cancel.`, scheme: [['2 x 6 = 12 m', 1]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the length of a diagonal of the bed in simplest surd form.', model: r`$(3 + \sqrt{5})^{2} = 14 + 6\sqrt{5}$ and $(3 - \sqrt{5})^{2} = 14 - 6\sqrt{5}$.\n\nBy the Pythagoras theorem, the diagonal squared is $(14 + 6\sqrt{5}) + (14 - 6\sqrt{5}) = 28$, so the diagonal is $\sqrt{28} = 2\sqrt{7}$ m.`, sol: 'Add the squares of the sides; the surd parts cancel.', scheme: [['Squares 14 + 6 root 5 and 14 - 6 root 5', 1], ['Diagonal root 28 = 2 root 7 m', 1]], d: 4, c: 'application', t: [3], time: 135 }), [
        mk.short({ marks: 2, stem: '**(ii)** Write the ratio length : breadth, that is $\\dfrac{3 + \\sqrt{5}}{3 - \\sqrt{5}}$, with a rational denominator.', model: r`Multiply the top and bottom by $3 + \sqrt{5}$. The numerator is $(3 + \sqrt{5})^{2} = 14 + 6\sqrt{5}$ and the denominator is $3^{2} - 5 = 4$.\n\nSo the ratio is $\dfrac{14 + 6\sqrt{5}}{4} = \dfrac{7 + 3\sqrt{5}}{2}$.`, sol: 'Multiply by the conjugate of the denominator.', scheme: [['Numerator 14 + 6 root 5 and denominator 4', 1], ['(7 + 3 root 5)/2', 1]], d: 4, c: 'application', t: [3], time: 135 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(near(area, 4) && near(perim, 12), 'area 4, perimeter 12');
    Cx.child('a').which([area, 14, 6, 2 * Math.sqrt(5)], 4);
    Cx.child('b').val(Math.round(perim));
    Cx.child('c').assert(near(diag, 2 * Math.sqrt(7)) && near(diag * diag, 28) && sd(0, 1, 28) === '2\\sqrt{7}', 'diagonal 2 root 7');
    Cx.child('c').model([14, 6, 5, 28, 2, 7]);
    Cx.child('cii').assert(p === 14 && q === 6 && den === 4 && near(ratioV, (7 + 3 * Math.sqrt(5)) / 2), '(7 + 3 root 5)/2');
    Cx.child('cii').model([3, 14, 6, 4, 7]);
  });
}
{
  const side = Math.round(Math.pow(4096, 1 / 3)), n = Math.log2(4096), face = ratPow(4096, 2, 3), s2 = ratPow(512, 1, 3);
  caseQ('c04', {
    passage: r`A cubical water tank on a housing-society roof in Mysuru holds exactly $4096$ litres. Since $1$ litre is $1$ cubic decimetre, the tank's volume is $4096$ dm$^{3}$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${n}$. (c) (i) $4096^{\frac{2}{3}} = 16^{2} = 256$ dm$^{2}$. Or (ii) $512^{\frac{1}{3}} = 8$ dm.`,
    sol: r`(a) side $= 4096^{\frac{1}{3}} = 16$ dm. (b) $4096 = 2^{12}$. (c) (i) one face has area $16^{2} = 256$ dm$^{2}$. (ii) $512 = 2^{9}$, so $512^{\frac{1}{3}} = 2^{3} = 8$ dm.`,
    children: [
      child('a', mk.mcq({ stem: 'The side of the tank, in decimetres, is', opts: ['$16$', '$64$', '$12$', '$1365$'], key: 'a', sol: r`The side is the cube root of the volume: $4096^{\frac{1}{3}} = 16$, since $16^{3} = 4096$. The value $12$ is the exponent of $2$ in $4096 = 2^{12}$, and $1365$ divides $4096$ by $3$ instead of taking a cube root.`, d: 2, c: 'application', t: [4], time: 75 })),
      child('b', mk.num({ stem: 'Write $4096$ as a power of $2$, that is $4096 = 2^{n}$. Find $n$.', value: 12, sol: r`$2^{10} = 1024$ and $2^{12} = 4096$, so $n = 12$. Check: $2^{12} = 2^{10} \times 2^{2} = 1024 \times 4 = 4096$.`, scheme: [['n = 12', 1]], d: 2, c: 'application', t: [4], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Use the rational power $4096^{\\frac{2}{3}}$ to find the area of one face of the tank.', model: r`The side is $4096^{\frac{1}{3}} = 16$ dm, so the area of a face is $16^{2} = 256$ dm$^{2}$.\n\nThis equals $4096^{\frac{2}{3}} = (4096^{\frac{1}{3}})^{2} = 256$.`, sol: 'The area of a face is the side squared, which is the volume to the power 2/3.', scheme: [['Side 4096^(1/3) = 16 dm', 1], ['Area 16^2 = 256 square dm', 1]], d: 3, c: 'application', t: [4], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** A second cubical tank holds $512$ litres. Use a rational power to find its side.', model: r`The side is $512^{\frac{1}{3}}$. Since $512 = 2^{9}$, $512^{\frac{1}{3}} = 2^{3} = 8$ dm.`, sol: 'Write 512 as a power of 2 and divide the exponent by 3.', scheme: [['512 = 2^9', 1], ['Side 2^3 = 8 dm', 1]], d: 3, c: 'application', t: [4], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(side ** 3 === 4096 && n === 12 && face.eq(F(256)) && s2.eq(F(8)), 'side 16, 4096 = 2^12, face 256, side 8');
    Cx.child('a').which([side, 64, 12, 1365], 16);
    Cx.child('b').val(n);
    Cx.child('c').assert(face.eq(F(256)) && near(Math.pow(4096, 2 / 3), 256), '256');
    Cx.child('c').model([4096, 16, 256]);
    Cx.child('cii').assert(2 ** 9 === 512 && s2.eq(F(8)), '8');
    Cx.child('cii').model([512, 9, 8]);
  });
}

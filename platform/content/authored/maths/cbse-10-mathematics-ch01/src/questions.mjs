// CBSE 10 Mathematics ch01 Real Numbers — practice bank. Every item carries an independent re-solve
// check (arithmetic from the givens, never from the written answer).
import { Q, caseQ, child, mk, r, gcd, lcm, hcfN, lcmN, factorise, factorTex, isPrime } from './lib.mjs';

const lastDigits = (base) => Array.from({ length: 8 }, (_, i) => Number((BigInt(base) ** BigInt(i + 1)) % 10n));
const isSquare = (n) => Number.isInteger(Math.sqrt(n));

// =============================================================== MCQ
Q('m01', mk.mcq({
  stem: r`The prime factorisation of $1176$ is`,
  opts: [r`$2^3 \times 3 \times 7^2$`, r`$2^2 \times 3 \times 7^2$`, r`$2^3 \times 3^2 \times 7$`, r`$2^4 \times 3 \times 7^2$`],
  key: 'a',
  sol: r`**Step 1.** Divide by the smallest primes: $1176 \div 2 = 588$, $588 \div 2 = 294$, $294 \div 2 = 147$, $147 \div 3 = 49$, $49 \div 7 = 7$.

**Step 2.** So $1176 = 2^3 \times 3 \times 7^2$. **Check:** $8 \times 3 \times 49 = 1176$.

Option (b) is $588$ (one factor 2 missing), (c) is $504$ and (d) is $2352$.`,
  d: 2, c: 'understanding', t: [1], time: 60,
}), (C) => { C.key(factorTex(1176) === r`2^3 \times 3 \times 7^2` ? 'a' : '?'); C.sol([588, 294, 147, 49, 504, 2352]); C.assert(4 * 3 * 49 === 588 && 8 * 9 * 7 === 504 && 16 * 3 * 49 === 2352, 'distractor values'); });

Q('m02', mk.mcq({
  stem: r`For a natural number $n$, which of these numbers ends with the digit $0$ for **every** value of $n$?`,
  opts: [r`$6^n$`, r`$15^n$`, r`$20^n$`, r`$21^n$`],
  key: 'c',
  sol: r`**Step 1.** A number ends with $0$ exactly when it is divisible by $10 = 2 \times 5$, so its prime factorisation must contain both $2$ and $5$.

**Step 2.** $20^n = 2^{2n} \times 5^n$ contains both, so it always ends with $0$.

**Step 3.** $6^n = 2^n \times 3^n$ has no $5$; $15^n = 3^n \times 5^n$ has no $2$; $21^n = 3^n \times 7^n$ has neither. By the uniqueness of prime factorisation, no other factor can appear, so none of these can ever end with $0$.`,
  d: 2, c: 'application', t: [1], time: 60,
}), (C) => { const ends0 = [6, 15, 20, 21].map((b) => lastDigits(b).every((dgt) => dgt === 0)); C.key('abcd'[ends0.indexOf(true)]); C.assert(ends0.filter(Boolean).length === 1, 'exactly one base always ends in 0'); });

Q('m03', mk.mcq({
  stem: r`How many **distinct** prime factors does $2310$ have?`,
  opts: ['$3$', '$4$', '$5$', '$6$'],
  key: 'c',
  sol: r`$2310 = 2 \times 1155 = 2 \times 3 \times 385 = 2 \times 3 \times 5 \times 77 = 2 \times 3 \times 5 \times 7 \times 11$. There are $5$ distinct primes: $2, 3, 5, 7, 11$.`,
  d: 1, c: 'recall', t: [1], time: 45,
}), (C) => C.opt(Object.keys(factorise(2310)).length));

Q('m04', mk.mcq({
  stem: r`The HCF of $2^3 \times 3^2 \times 5$ and $2^2 \times 3^3 \times 7$ is`,
  opts: ['$36$', '$72$', '$6$', '$7560$'],
  key: 'a',
  sol: r`**Step 1.** The common primes are $2$ and $3$ ($5$ and $7$ are not common).

**Step 2.** Take the **smaller** power of each: $2^2$ and $3^2$. HCF $= 2^2 \times 3^2 = 36$.

Option (d) $7560 = 2^3 \times 3^3 \times 5 \times 7$ is the LCM (greater powers of every prime). Option (b) takes $2^3$, the greater power of $2$.`,
  d: 2, c: 'understanding', t: [2], time: 60,
}), (C) => { const a = 8 * 9 * 5, b = 4 * 27 * 7; C.opt(gcd(a, b)); C.sol([lcm(a, b)]); });

Q('m05', mk.mcq({
  stem: r`Two natural numbers have HCF $12$, and their product is $2160$. Their LCM is`,
  opts: ['$180$', '$2148$', '$25920$', '$120$'],
  key: 'a',
  sol: r`For two numbers, $\text{HCF} \times \text{LCM} = $ product of the numbers. So $\text{LCM} = \dfrac{2160}{12} = 180$.

Option (b) subtracts instead of dividing; option (c) multiplies $2160 \times 12$.`,
  d: 2, c: 'understanding', t: [2], time: 45,
}), (C) => { C.opt(2160 / 12); C.assert(2160 * 12 === 25920 && 2160 - 12 === 2148, 'distractors'); });

Q('m06', mk.mcq({
  stem: r`The HCF of any two consecutive natural numbers $n$ and $n + 1$ is`,
  opts: ['$0$', '$1$', '$2$', '$n$'],
  key: 'b',
  sol: r`Any common factor of $n$ and $n + 1$ also divides their difference $(n + 1) - n = 1$. The only natural number dividing $1$ is $1$, so the HCF is $1$: consecutive numbers are always **co-prime**. For example, HCF$(14, 15) = 1$.`,
  d: 2, c: 'understanding', t: [2], time: 45,
}), (C) => { let ok = true; for (let n = 1; n < 500; n++) ok &&= gcd(n, n + 1) === 1; C.assert(ok, 'gcd(n, n+1) = 1 for n < 500'); C.key('b'); });

Q('m07', mk.mcq({
  stem: r`The LCM of $12$, $18$ and $30$ is`,
  opts: ['$180$', '$6$', '$360$', '$6480$'],
  key: 'a',
  sol: r`**Step 1.** $12 = 2^2 \times 3$, $18 = 2 \times 3^2$, $30 = 2 \times 3 \times 5$.

**Step 2.** LCM takes the greatest power of every prime that appears: $2^2 \times 3^2 \times 5 = 180$.

Option (b) is the HCF, option (d) is the product $12 \times 18 \times 30$, and (c) is a common multiple but not the least.`,
  d: 2, c: 'understanding', t: [2], time: 60,
}), (C) => { C.opt(lcmN(12, 18, 30)); C.assert(hcfN(12, 18, 30) === 6 && 12 * 18 * 30 === 6480, 'distractors'); });

Q('m08', mk.mcq({
  stem: r`Which pair **cannot** be the HCF and LCM (in that order) of two natural numbers?`,
  opts: ['$6$ and $72$', '$12$ and $90$', '$5$ and $125$', '$9$ and $63$'],
  key: 'b',
  sol: r`The HCF divides each number, and each number divides the LCM, so the **HCF must divide the LCM**.

$72 \div 6 = 12$, $125 \div 5 = 25$ and $63 \div 9 = 7$ are whole numbers, but $90 \div 12 = 7.5$ is not. So $12$ and $90$ cannot be an HCF–LCM pair.`,
  d: 3, c: 'analysis', t: [2], time: 75,
}), (C) => { const pairs = [[6, 72], [12, 90], [5, 125], [9, 63]]; C.key('abcd'[pairs.findIndex(([h, l]) => l % h !== 0)]); C.sol([7.5, 12, 25, 7]); });

Q('m09', mk.mcq({
  stem: r`Three traffic signals on a road in Chandigarh turn green every $48$ seconds, $72$ seconds and $108$ seconds. They all turn green together at 7:00 a.m. After how many seconds will they next turn green together?`,
  opts: ['$432$ s', '$12$ s', '$216$ s', '$864$ s'],
  key: 'a',
  sol: r`**Step 1.** "Next together" asks for the **least common multiple**.

**Step 2.** $48 = 2^4 \times 3$, $72 = 2^3 \times 3^2$, $108 = 2^2 \times 3^3$.

**Step 3.** LCM $= 2^4 \times 3^3 = 432$ s, that is $7$ minutes $12$ seconds after 7:00 a.m.

Option (b) is the HCF. Option (c) $216$ is not a multiple of $48$, and (d) is a common multiple but not the least.`,
  d: 2, c: 'application', t: [2], time: 90,
}), (C) => { C.opt(lcmN(48, 72, 108)); C.assert(hcfN(48, 72, 108) === 12 && 216 % 48 !== 0, 'distractors'); });

Q('m10', mk.mcq({
  stem: r`The largest number that divides $245$ and $1029$, leaving remainders $5$ and $9$ respectively, is`,
  opts: ['$60$', '$120$', '$30$', '$20$'],
  key: 'a',
  sol: r`**Step 1.** Remove the remainders: the number divides $245 - 5 = 240$ and $1029 - 9 = 1020$ exactly.

**Step 2.** $240 = 2^4 \times 3 \times 5$ and $1020 = 2^2 \times 3 \times 5 \times 17$, so HCF $= 2^2 \times 3 \times 5 = 60$.

**Check:** $245 = 4 \times 60 + 5$ and $1029 = 17 \times 60 + 9$. Options (c) and (d) also leave these remainders but are not the largest; $120$ does not divide $1020$.`,
  d: 3, c: 'application', t: [2], time: 90,
}), (C) => { C.opt(gcd(245 - 5, 1029 - 9)); C.assert(245 % 60 === 5 && 1029 % 60 === 9 && 1020 % 120 !== 0, 'remainders'); });

Q('m11', mk.mcq({
  stem: r`Which of these numbers is **irrational**?`,
  opts: [r`$\sqrt{196}$`, r`$\dfrac{\sqrt{12}}{\sqrt{3}}$`, r`$\sqrt{18}$`, r`$(\sqrt{5})^2$`],
  key: 'c',
  sol: r`$\sqrt{196} = 14$; $\dfrac{\sqrt{12}}{\sqrt{3}} = \sqrt{4} = 2$; $(\sqrt5)^2 = 5$ — all rational.

$\sqrt{18} = \sqrt{9 \times 2} = 3\sqrt{2}$, a non-zero rational times the irrational $\sqrt2$, so it is irrational.`,
  d: 2, c: 'understanding', t: [3], time: 60,
}), (C) => { C.assert(isSquare(196) && isSquare(12 / 3) && !isSquare(18), 'which root is not a perfect square'); C.key('c'); });

Q('m12', mk.mcq({
  stem: r`The product $\sqrt{5} \times \sqrt{20}$ is`,
  opts: ['an irrational number', r`a rational number equal to $10$`, r`a rational number equal to $100$`, r`an irrational number equal to $2\sqrt{5}$`],
  key: 'b',
  sol: r`$\sqrt5 \times \sqrt{20} = \sqrt{100} = 10$, which is rational. This shows that the product of two irrational numbers **can** be rational. Option (c) forgets the square root.`,
  d: 2, c: 'understanding', t: [3], time: 45,
}), (C) => { C.assert(Math.abs(Math.sqrt(5) * Math.sqrt(20) - 10) < 1e-12, 'root5 x root20 = 10'); C.key('b'); });

Q('m13', mk.mcq({
  stem: r`To prove by contradiction that $\sqrt{5}$ is irrational, we begin by assuming $\sqrt{5} = \dfrac{a}{b}$, where $a$ and $b$ are`,
  opts: ['any two integers', r`co-prime integers with $b \ne 0$`, 'two prime numbers', 'two even integers'],
  key: 'b',
  sol: r`We assume the opposite of what we want to prove: $\sqrt5$ is rational. Any rational number can be written in lowest terms, so $a$ and $b$ are integers with **no common factor other than 1** (co-prime) and $b \ne 0$. The contradiction later is that $5$ divides both $a$ and $b$.`,
  d: 1, c: 'recall', t: [3], time: 40,
}), (C) => C.key('b'));

Q('m14', mk.mcq({
  stem: r`Let $p$ be a prime and $a$ a positive integer. If $p$ divides $a^2$, then`,
  opts: [r`$a$ is prime`, r`$p$ divides $a$`, r`$a$ divides $p$`, r`$p^2$ divides $a$`],
  key: 'b',
  sol: r`By the Fundamental Theorem of Arithmetic, the primes in $a^2$ are exactly the primes in $a$ (each appearing twice as often). So if $p$ divides $a^2$, $p$ is one of the primes of $a$, and $p$ divides $a$.

Option (d) fails: $p = 2$ divides $6^2 = 36$, but $4$ does not divide $6$.`,
  d: 2, c: 'understanding', t: [3], time: 45,
}), (C) => { C.assert(36 % 2 === 0 && 6 % 4 !== 0, 'counter-example for (d)'); C.key('b'); });

Q('m15', mk.mcq({
  stem: r`The number $(2 + \sqrt{3})(2 - \sqrt{3})$ is`,
  opts: ['irrational', r`rational, equal to $1$`, r`rational, equal to $7$`, r`irrational, equal to $4 - \sqrt{3}$`],
  key: 'b',
  sol: r`Use $(x + y)(x - y) = x^2 - y^2$: $(2 + \sqrt3)(2 - \sqrt3) = 4 - 3 = 1$, which is rational. Option (c) adds $4 + 3$ instead of subtracting.`,
  d: 2, c: 'understanding', t: [3], time: 45,
}), (C) => { C.assert(Math.abs((2 + Math.sqrt(3)) * (2 - Math.sqrt(3)) - 1) < 1e-12, 'product = 1'); C.key('b'); });

Q('m16', mk.mcq({
  stem: r`If $x$ is a rational number and $y$ is an irrational number, then $x + y$ is`,
  opts: ['always rational', 'always irrational', 'sometimes rational, sometimes irrational', 'always an integer'],
  key: 'b',
  sol: r`Suppose $x + y = q$ were rational. Then $y = q - x$ would be a difference of two rationals, which is rational — a contradiction. So $x + y$ is always irrational. (Contrast: the sum of **two irrationals** can be rational, e.g. $\sqrt2 + (-\sqrt2) = 0$.)`,
  d: 2, c: 'understanding', t: [3], time: 45,
}), (C) => C.key('b'));

Q('m17', mk.mcq({
  stem: r`The smallest natural number $k$ for which $2^4 \times 3^2 \times k$ is a perfect cube is`,
  opts: ['$12$', '$6$', '$18$', '$36$'],
  key: 'a',
  sol: r`**Step 1.** In a perfect cube every prime exponent is a multiple of $3$.

**Step 2.** $2^4$ needs two more $2$s to become $2^6$; $3^2$ needs one more $3$ to become $3^3$.

**Step 3.** $k = 2^2 \times 3 = 12$. **Check:** $2^4 \times 3^2 \times 12 = 2^6 \times 3^3 = 1728 = 12^3$.

Option (b) $6$ gives $2^5 \times 3^3$, not a cube.`,
  d: 3, c: 'application', t: [1], time: 90,
}), (C) => { const base = 16 * 9; const k = [1, 2, 3, 4, 6, 12, 18, 36].find((m) => Math.round(Math.cbrt(base * m)) ** 3 === base * m); C.opt(k); C.sol([1728]); });

Q('m18', mk.mcq({
  stem: r`For the numbers $6$, $10$ and $15$, which statement is true?`,
  opts: [r`$\text{HCF} \times \text{LCM}$ equals the product $6 \times 10 \times 15$`, r`$\text{HCF} \times \text{LCM} = 30$, but the product is $900$`, r`$\text{HCF} = 2$ and $\text{LCM} = 30$`, r`$\text{HCF} = 1$ and $\text{LCM} = 900$`],
  key: 'b',
  sol: r`**Step 1.** $6 = 2 \times 3$, $10 = 2 \times 5$, $15 = 3 \times 5$. No prime is common to all three, so HCF $= 1$.

**Step 2.** LCM $= 2 \times 3 \times 5 = 30$, so $\text{HCF} \times \text{LCM} = 30$, while $6 \times 10 \times 15 = 900$.

The rule "HCF × LCM = product" holds for **two** numbers only. Option (c) wrongly takes a factor common to just two of the numbers.`,
  d: 3, c: 'analysis', t: [2], time: 90,
}), (C) => { C.assert(hcfN(6, 10, 15) === 1 && lcmN(6, 10, 15) === 30 && 6 * 10 * 15 === 900, 'HCF 1, LCM 30, product 900'); C.key('b'); });

// =============================================================== Assertion-reason (keys a b c d a c)
Q('ar1', mk.ar({
  a: r`$12^n$ can never end with the digit $0$, for any natural number $n$.`,
  r: r`A natural number ends with the digit $0$ only if its prime factorisation contains both $2$ and $5$.`,
  key: 'a',
  sol: r`$12^n = 2^{2n} \times 3^n$. By uniqueness of prime factorisation it has no factor $5$, so it is not divisible by $10$ and cannot end with $0$. A is true, R is true, and R is exactly the reason A holds.`,
  d: 2, c: 'understanding', t: [1],
}), (C) => { C.assert(lastDigits(12).every((x) => x !== 0), '12^n never ends in 0'); C.key('a'); });

Q('ar2', mk.ar({
  a: r`$\text{HCF}(26, 91) = 13$.`,
  r: r`The HCF of two natural numbers always divides their LCM.`,
  key: 'b',
  sol: r`$26 = 2 \times 13$ and $91 = 7 \times 13$, so the HCF is $13$: A is true. R is also true (the HCF divides each number, and each number divides the LCM). But R does not tell us how to find the HCF of $26$ and $91$, so it is not the explanation of A.`,
  d: 2, c: 'understanding', t: [2],
}), (C) => { C.assert(gcd(26, 91) === 13 && lcm(26, 91) % 13 === 0, 'HCF 13'); C.key('b'); });

Q('ar3', mk.ar({
  a: r`$\sqrt{2} \times \sqrt{18}$ is a rational number.`,
  r: 'The product of two irrational numbers is always irrational.',
  key: 'c',
  sol: r`$\sqrt2 \times \sqrt{18} = \sqrt{36} = 6$, which is rational, so A is true. This very example shows that R is false: a product of two irrationals can be rational.`,
  d: 2, c: 'understanding', t: [3],
}), (C) => { C.assert(Math.abs(Math.sqrt(2) * Math.sqrt(18) - 6) < 1e-12, '= 6'); C.key('c'); });

Q('ar4', mk.ar({
  a: r`For any three natural numbers, the product of their HCF and LCM equals the product of the three numbers.`,
  r: r`For any two natural numbers, the product of their HCF and LCM equals the product of the two numbers.`,
  key: 'd',
  sol: r`R is true: for each prime, $\min(m, n) + \max(m, n) = m + n$. A is false. For $4$, $6$, $10$: HCF $= 2$, LCM $= 60$, so $\text{HCF} \times \text{LCM} = 120$, but $4 \times 6 \times 10 = 240$.`,
  d: 3, c: 'analysis', t: [2],
}), (C) => { C.assert(hcfN(4, 6, 10) * lcmN(4, 6, 10) === 120 && 4 * 6 * 10 === 240, 'counter-example'); C.key('d'); });

Q('ar5', mk.ar({
  a: r`$7 + \sqrt{2}$ is irrational.`,
  r: 'The sum of a rational number and an irrational number is irrational.',
  key: 'a',
  sol: r`$7$ is rational and $\sqrt2$ is irrational, so by R their sum is irrational. Both are true and R explains A. (If $7 + \sqrt2 = q$ were rational, $\sqrt2 = q - 7$ would be rational.)`,
  d: 2, c: 'understanding', t: [3],
}), (C) => C.key('a'));

Q('ar6', mk.ar({
  a: r`If $p$ and $q$ are two different prime numbers, then $\text{LCM}(p, q) = pq$.`,
  r: r`If $p$ and $q$ are two different prime numbers, then $\text{HCF}(p, q) = p$.`,
  key: 'c',
  sol: r`Two different primes have no common factor except $1$, so $\text{HCF}(p, q) = 1$ (R is false) and $\text{LCM}(p, q) = \dfrac{pq}{1} = pq$ (A is true). For example, $\text{LCM}(5, 7) = 35$.`,
  d: 2, c: 'understanding', t: [2],
}), (C) => { C.assert(lcm(5, 7) === 35 && gcd(5, 7) === 1, 'example'); C.key('c'); });

// =============================================================== True / false
Q('tf1', mk.tf({
  stem: 'Every natural number greater than 1 is either a prime or can be written as a product of primes.',
  key: 't', sol: 'This is the existence half of the Fundamental Theorem of Arithmetic. Keep dividing a composite number by primes until only primes are left, as in a factor tree.',
  d: 1, c: 'recall', t: [1],
}), (C) => C.key('t'));
Q('tf2', mk.tf({
  stem: 'Two different natural numbers can have exactly the same prime factorisation.',
  key: 'f', sol: r`If two numbers had the same primes with the same powers, multiplying them out would give the same number. The factorisation is unique to each number, so different numbers have different factorisations.`,
  d: 1, c: 'recall', t: [1],
}), (C) => C.key('f'));
Q('tf3', mk.tf({
  stem: r`If $\text{HCF}(a, b) = a$, then $\text{LCM}(a, b) = b$.`,
  key: 't', sol: r`$\text{HCF}(a, b) = a$ means $a$ divides $b$. Then $b$ is a common multiple and no smaller multiple of $b$ exists, so $\text{LCM}(a, b) = b$. Also $\dfrac{ab}{a} = b$. Example: $\text{HCF}(8, 24) = 8$, $\text{LCM}(8, 24) = 24$.`,
  d: 3, c: 'analysis', t: [2],
}), (C) => { C.assert(gcd(8, 24) === 8 && lcm(8, 24) === 24, 'example'); C.key('t'); });
Q('tf4', mk.tf({
  stem: r`$\pi$ is a rational number because $\pi = \dfrac{22}{7}$.`,
  key: 'f', sol: r`$\pi$ is irrational. $\dfrac{22}{7}$ is only a convenient approximation: $\dfrac{22}{7} \approx 3.1429$, while $\pi \approx 3.1416$.`,
  d: 1, c: 'recall', t: [3],
}), (C) => { C.assert(Math.abs(22 / 7 - Math.PI) > 1e-3, '22/7 differs from pi'); C.sol([3.1429, 3.1416]); C.key('f'); });
Q('tf5', mk.tf({
  stem: 'The sum of two irrational numbers is always irrational.',
  key: 'f', sol: r`Counter-example: $\sqrt3$ and $-\sqrt3$ are both irrational, but $\sqrt3 + (-\sqrt3) = 0$, which is rational. Another: $(5 + \sqrt2) + (5 - \sqrt2) = 10$.`,
  d: 2, c: 'understanding', t: [3],
}), (C) => { C.sol([10]); C.key('f'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({
  stem: r`$945 = 3^3 \times 5 \times$ ___`,
  acc: [['7']],
  sol: r`$3^3 \times 5 = 135$ and $945 \div 135 = 7$, which is prime. So $945 = 3^3 \times 5 \times 7$.`,
  d: 1, c: 'recall', t: [1],
}), (C) => { C.blank(945 / 135); C.assert(isPrime(7), '7 prime'); });
Q('fb2', mk.fill({
  stem: r`Given $\text{HCF}(144, 234) = 18$, the value of $\text{LCM}(144, 234)$ is ___.`,
  acc: [['1872']],
  sol: r`$\text{LCM} = \dfrac{144 \times 234}{18} = 8 \times 234 = 1872$.`,
  d: 2, c: 'understanding', t: [2],
}), (C) => { C.assert(gcd(144, 234) === 18, 'given HCF'); C.blank(lcm(144, 234)); });
Q('fb3', mk.fill({
  stem: r`The smallest natural number divisible by each of $8$, $9$ and $10$ is ___.`,
  acc: [['360']],
  sol: r`It is the LCM: $8 = 2^3$, $9 = 3^2$, $10 = 2 \times 5$, so LCM $= 2^3 \times 3^2 \times 5 = 360$.`,
  d: 2, c: 'understanding', t: [2],
}), (C) => C.blank(lcmN(8, 9, 10)));
Q('fb4', mk.fill({
  stem: r`In the proof that $\sqrt{3}$ is irrational, squaring $\sqrt{3} = \dfrac{a}{b}$ gives $a^2 =$ ___ $\times\, b^2$.`,
  acc: [['3']],
  sol: r`$\sqrt3 = \dfrac ab \Rightarrow 3 = \dfrac{a^2}{b^2} \Rightarrow a^2 = 3b^2$. So $3$ divides $a^2$, hence $3$ divides $a$.`,
  d: 1, c: 'recall', t: [3],
}), (C) => C.blank(3));
Q('fb5', mk.fill({
  stem: 'The only even prime number is ___.',
  acc: [['2', 'two']],
  sol: r`Every even number is divisible by $2$; any even number greater than $2$ therefore has the factor $2$ besides $1$ and itself, so it is composite. Only $2$ is an even prime.`,
  d: 1, c: 'recall', t: [1],
}), (C) => C.blank(2));

// =============================================================== Numerical
Q('n01', mk.num({
  stem: r`Using prime factorisation, find the HCF of $405$ and $2520$.`,
  value: 45, marks: 2,
  sol: r`**Step 1.** $405 = 3^4 \times 5$ and $2520 = 2^3 \times 3^2 \times 5 \times 7$.

**Step 2.** Common primes with smaller powers: $3^2$ and $5$.

**Step 3.** HCF $= 3^2 \times 5 = 45$.`,
  scheme: [['Both prime factorisations correct', 1], ['HCF = 45', 1]],
  d: 2, c: 'understanding', t: [2], time: 150,
}), (C) => { C.val(gcd(405, 2520)); C.assert(factorTex(405) === r`3^4 \times 5` && factorTex(2520) === r`2^3 \times 3^2 \times 5 \times 7`, 'factorisations'); });
Q('n02', mk.num({
  stem: r`Using prime factorisation, find the LCM of $405$ and $2520$.`,
  value: 22680, marks: 2,
  sol: r`**Step 1.** $405 = 3^4 \times 5$ and $2520 = 2^3 \times 3^2 \times 5 \times 7$.

**Step 2.** Every prime with its greater power: $2^3$, $3^4$, $5$, $7$.

**Step 3.** LCM $= 8 \times 81 \times 5 \times 7 = 22680$.

**Check:** HCF $= 45$ and $45 \times 22680 = 1020600 = 405 \times 2520$.`,
  scheme: [['Greatest powers of all primes chosen', 1], ['LCM = 22680', 1]],
  d: 2, c: 'understanding', t: [2], time: 150,
}), (C) => { C.val(lcm(405, 2520)); C.sol([45 * 22680, 405 * 2520]); });
Q('n03', mk.num({
  stem: r`The product of two natural numbers is $6480$ and their HCF is $12$. Find their LCM.`,
  value: 540,
  sol: r`$\text{LCM} = \dfrac{\text{product}}{\text{HCF}} = \dfrac{6480}{12} = 540$.`,
  scheme: [['LCM = 6480 ÷ 12 = 540', 1]],
  d: 2, c: 'understanding', t: [2], time: 60,
}), (C) => { C.val(6480 / 12); C.assert(540 % 12 === 0, 'HCF divides LCM'); });
Q('n04', mk.num({
  stem: r`For Diwali, Raghav has $84$ laddoos and $126$ barfis. He packs them in boxes so that every box holds the same number of sweets and only one kind of sweet, using as few boxes as possible. How many boxes does he need?`,
  value: 5, marks: 2,
  sol: r`**Step 1.** Fewest boxes means the **largest** number per box that divides both $84$ and $126$: the HCF.

**Step 2.** $84 = 2^2 \times 3 \times 7$, $126 = 2 \times 3^2 \times 7$, so HCF $= 2 \times 3 \times 7 = 42$ sweets per box.

**Step 3.** Boxes $= \dfrac{84}{42} + \dfrac{126}{42} = 2 + 3 = 5$.`,
  scheme: [['Identifies HCF and finds 42', 1], ['Number of boxes = 5', 1]],
  d: 3, c: 'application', t: [2], time: 150,
}), (C) => { const h = gcd(84, 126); C.val(84 / h + 126 / h); C.sol([h]); });
Q('n05', mk.num({
  stem: r`Three strings of Diwali lights blink every $15$ s, $20$ s and $25$ s. They blink together at the moment they are switched on. How many more times do they blink together in the next one hour?`,
  value: 12, marks: 2,
  sol: r`**Step 1.** They blink together every $\text{LCM}(15, 20, 25)$ seconds. $15 = 3 \times 5$, $20 = 2^2 \times 5$, $25 = 5^2$, so LCM $= 2^2 \times 3 \times 5^2 = 300$ s.

**Step 2.** One hour $= 3600$ s, and $\dfrac{3600}{300} = 12$. They blink together $12$ more times (the last one exactly at the end of the hour).`,
  scheme: [['LCM = 300 s', 1], ['3600 ÷ 300 = 12 times', 1]],
  d: 3, c: 'application', t: [2], time: 150,
}), (C) => { const L = lcmN(15, 20, 25); C.val(3600 / L); C.sol([L]); });
Q('n06', mk.num({
  stem: r`A rectangular verandah measures $5.04$ m by $3.36$ m. It is to be paved with identical square tiles, with no tile cut. What is the side of the **largest** such tile, in centimetres?`,
  value: 168, unit: 'cm', marks: 2,
  sol: r`**Step 1.** Work in centimetres: $504$ cm and $336$ cm. The tile side must divide both, and be as large as possible: the HCF.

**Step 2.** $504 = 2^3 \times 3^2 \times 7$ and $336 = 2^4 \times 3 \times 7$, so HCF $= 2^3 \times 3 \times 7 = 168$ cm.

**Check:** $504 \div 168 = 3$ and $336 \div 168 = 2$, so $3 \times 2 = 6$ tiles fit exactly.`,
  scheme: [['Converts to cm and identifies HCF', 1], ['168 cm', 1]],
  d: 3, c: 'application', t: [2], time: 150,
}), (C) => { C.val(gcd(504, 336)); C.sol([3, 2, 6]); });
Q('n07', mk.num({
  stem: r`Two numbers have HCF $2^2 \times 3$ and LCM $2^4 \times 3^3 \times 5$. One of the numbers is $240$. Find the other number.`,
  value: 108, marks: 2,
  sol: r`**Step 1.** HCF $= 12$, LCM $= 16 \times 27 \times 5 = 2160$.

**Step 2.** Other number $= \dfrac{\text{HCF} \times \text{LCM}}{240} = \dfrac{12 \times 2160}{240} = 108$.

**Check:** $108 = 2^2 \times 3^3$ and $240 = 2^4 \times 3 \times 5$ give HCF $2^2 \times 3$ and LCM $2^4 \times 3^3 \times 5$. ✓`,
  scheme: [['Uses HCF × LCM = product with HCF = 12, LCM = 2160', 1], ['Other number = 108', 1]],
  d: 3, c: 'application', t: [2], time: 150,
}), (C) => { const b = (12 * 2160) / 240; C.val(b); C.assert(gcd(240, b) === 12 && lcm(240, b) === 2160, 'pair consistent'); });
Q('n08', mk.num({
  stem: r`Find the smallest natural number by which $1188$ must be multiplied so that the product is a perfect square.`,
  value: 33, marks: 2,
  sol: r`**Step 1.** $1188 = 2^2 \times 3^3 \times 11$.

**Step 2.** In a perfect square every exponent is even. $2^2$ is fine; $3^3$ needs one more $3$; $11$ needs one more $11$.

**Step 3.** Multiply by $3 \times 11 = 33$: $1188 \times 33 = 39204 = 198^2$.`,
  scheme: [['Prime factorisation 2² × 3³ × 11', 1], ['Multiplier 33', 1]],
  d: 3, c: 'application', t: [1], time: 150,
}), (C) => { let k = 1; while (!isSquare(1188 * k)) k++; C.val(k); C.sol([39204, 198]); C.assert(198 * 198 === 39204, '198^2'); });
Q('n09', mk.num({
  stem: r`The LCM of two co-prime numbers is $391$. One of them is $17$. Find the other.`,
  value: 23,
  sol: r`Co-prime numbers have HCF $1$, so $\text{LCM} = $ product. The other number is $\dfrac{391}{17} = 23$.`,
  scheme: [['23', 1]],
  d: 2, c: 'understanding', t: [2], time: 60,
}), (C) => { C.val(391 / 17); C.assert(gcd(17, 23) === 1, 'co-prime'); });

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({
  marks: 2,
  stem: r`Express $4914$ as a product of its prime factors.`,
  model: r`$4914 = 2 \times 2457 = 2 \times 3 \times 819 = 2 \times 3 \times 3 \times 273 = 2 \times 3 \times 3 \times 3 \times 91 = 2 \times 3^3 \times 7 \times 13$.`,
  sol: r`**Step 1.** Divide by $2$: $2457$. **Step 2.** Divide by $3$ three times: $819$, $273$, $91$. **Step 3.** $91 = 7 \times 13$. So $4914 = 2 \times 3^3 \times 7 \times 13$. **Check:** $2 \times 27 \times 91 = 4914$.`,
  scheme: [['Correct successive division (or factor tree)', 1], ['4914 = 2 × 3³ × 7 × 13', 1]],
  d: 1, c: 'recall', t: [1], time: 120,
}), (C) => { C.assert(factorTex(4914) === r`2 \times 3^3 \times 7 \times 13`, 'factorisation'); C.model([2457, 819, 273, 91]); });
Q('s202', mk.short({
  marks: 2,
  stem: r`Show that $5 \times 7 \times 9 \times 11 + 9$ is a composite number.`,
  model: r`$5 \times 7 \times 9 \times 11 + 9 = 9 \times (5 \times 7 \times 11 + 1) = 9 \times (385 + 1) = 9 \times 386 = 3474$.

It has the factor $9$ besides $1$ and itself (indeed $3474 = 2 \times 3^2 \times 193$), so it is composite.`,
  sol: r`**Step 1.** Take $9$ common. **Step 2.** The bracket is $386$, a natural number greater than $1$. **Step 3.** The number is $9 \times 386 = 3474$, a product of two factors each greater than $1$, so it is composite.`,
  scheme: [['Takes 9 common: 9 × 386', 1], ['Concludes composite with reason', 1]],
  d: 2, c: 'application', t: [1], time: 120,
}), (C) => { const N = 5 * 7 * 9 * 11 + 9; C.assert(N === 9 * 386 && !isPrime(N) && factorTex(N) === r`2 \times 3^2 \times 193`, 'composite'); C.model([385, 386, N]); });
Q('s203', mk.short({
  marks: 2,
  stem: r`Can the number $35^n$, where $n$ is a natural number, end with the digit $0$? Give a reason.`,
  model: r`No. $35^n = (5 \times 7)^n = 5^n \times 7^n$. To end with $0$, a number must be divisible by $10 = 2 \times 5$, so $2$ must appear in its prime factorisation. By the Fundamental Theorem of Arithmetic the factorisation $5^n \times 7^n$ is unique and contains no $2$. So $35^n$ never ends with $0$ (it always ends with $5$).`,
  sol: r`**Step 1.** Factorise: $35^n = 5^n \times 7^n$. **Step 2.** Ending in $0$ needs the factor $2$. **Step 3.** Uniqueness of prime factorisation rules out any hidden factor $2$, so the answer is no.`,
  scheme: [['35ⁿ = 5ⁿ × 7ⁿ', 1], ['No factor 2, by uniqueness of factorisation, so cannot end in 0', 1]],
  d: 2, c: 'understanding', t: [1], time: 120,
}), (C) => { C.assert(lastDigits(35).every((x) => x === 5), '35^n ends in 5'); C.model(['No']); });
Q('s204', mk.short({
  marks: 2,
  stem: r`Find the HCF and LCM of $132$ and $198$ by prime factorisation.`,
  model: r`$132 = 2^2 \times 3 \times 11$ and $198 = 2 \times 3^2 \times 11$.

HCF $= 2 \times 3 \times 11 = 66$. LCM $= 2^2 \times 3^2 \times 11 = 396$.`,
  sol: r`**Step 1.** Factorise both. **Step 2.** HCF: smaller power of each common prime, $66$. **Step 3.** LCM: greater power of every prime, $396$. **Check:** $66 \times 396 = 26136 = 132 \times 198$.`,
  scheme: [['Both factorisations', 0.5], ['HCF = 66', 0.5], ['LCM = 396', 1]],
  d: 2, c: 'understanding', t: [2], time: 150,
}), (C) => { C.model([gcd(132, 198), lcm(132, 198)]); C.assert(66 * 396 === 132 * 198 && 132 * 198 === 26136, 'check'); });
Q('s205', mk.short({
  marks: 2,
  stem: r`The HCF of two numbers is $23$ and their LCM is $1449$. If one of the numbers is $161$, find the other.`,
  model: r`For two numbers, $\text{HCF} \times \text{LCM} = $ product. So the other number $= \dfrac{23 \times 1449}{161} = \dfrac{33327}{161} = 207$.

Check: $161 = 7 \times 23$, $207 = 3^2 \times 23$; HCF $= 23$, LCM $= 3^2 \times 7 \times 23 = 1449$. ✓`,
  sol: r`**Step 1.** State and apply HCF × LCM = product. **Step 2.** Divide: $33327 \div 161 = 207$. **Step 3.** Verify with factorisations.`,
  scheme: [['Correct relation with substitution', 1], ['Other number = 207', 1]],
  d: 2, c: 'understanding', t: [2], time: 120,
}), (C) => { const b = (23 * 1449) / 161; C.model([b, 33327]); C.assert(gcd(161, b) === 23 && lcm(161, b) === 1449, 'consistent'); });
Q('s206', mk.short({
  marks: 2,
  stem: r`Given that $\sqrt{3}$ is irrational, prove that $\dfrac{2\sqrt{3}}{7}$ is irrational.`,
  model: r`Suppose, to the contrary, that $\dfrac{2\sqrt3}{7} = r$ for some rational number $r$.

Then $\sqrt3 = \dfrac{7r}{2}$. Since $r$ is rational, $\dfrac{7r}{2}$ is rational, so $\sqrt3$ would be rational.

This contradicts the fact that $\sqrt3$ is irrational. Hence $\dfrac{2\sqrt3}{7}$ is irrational.`,
  sol: r`Assume it is rational, isolate $\sqrt3$, and note that a rational number multiplied by $\dfrac72$ stays rational. The contradiction completes the proof.`,
  scheme: [['Assumes rational and isolates √3 = 7r/2', 1], ['States contradiction and conclusion', 1]],
  d: 2, c: 'application', t: [3], time: 150,
}), null, 'proof: structure checked by hand (assume rational, isolate root 3, contradiction)');
Q('s207', mk.short({
  marks: 2,
  stem: r`Meera says, "$\sqrt{8} + \sqrt{2}$ is rational, because $8 + 2 = 10$." Is she right? Justify your answer.`,
  model: r`No. Square roots do not add like that: $\sqrt8 + \sqrt2 \ne \sqrt{10}$, and in any case she has not taken any root.

$\sqrt8 = \sqrt{4 \times 2} = 2\sqrt2$, so $\sqrt8 + \sqrt2 = 2\sqrt2 + \sqrt2 = 3\sqrt2$.

$3\sqrt2$ is a non-zero rational number times the irrational $\sqrt2$, so it is **irrational**.`,
  sol: r`**Step 1.** Simplify $\sqrt8 = 2\sqrt2$. **Step 2.** Add like surds: $3\sqrt2$. **Step 3.** A non-zero rational times an irrational is irrational. Meera's reasoning adds the numbers under the roots, which is not allowed.`,
  scheme: [['Simplifies to 3√2', 1], ['Concludes irrational with reason; Meera wrong', 1]],
  d: 3, c: 'evaluation', t: [3], time: 150,
}), (C) => { C.assert(Math.abs(Math.sqrt(8) + Math.sqrt(2) - 3 * Math.sqrt(2)) < 1e-12, '3 root 2'); C.model(['3\\sqrt2']); });
Q('s208', mk.short({
  marks: 2,
  stem: r`Kabir claims that $\text{HCF}(18, 24, 36) \times \text{LCM}(18, 24, 36) = 18 \times 24 \times 36$. Check his claim.`,
  model: r`$18 = 2 \times 3^2$, $24 = 2^3 \times 3$, $36 = 2^2 \times 3^2$.

HCF $= 2 \times 3 = 6$; LCM $= 2^3 \times 3^2 = 72$; $\text{HCF} \times \text{LCM} = 432$.

But $18 \times 24 \times 36 = 15552$. The claim is **false**: the product rule holds only for two numbers.`,
  sol: r`Compute both sides from the factorisations and compare: $432 \ne 15552$.`,
  scheme: [['HCF = 6 and LCM = 72', 1], ['Compares 432 with 15552 and rejects the claim', 1]],
  d: 3, c: 'evaluation', t: [2], time: 150,
}), (C) => { C.model([hcfN(18, 24, 36), lcmN(18, 24, 36), hcfN(18, 24, 36) * lcmN(18, 24, 36), 18 * 24 * 36]); });
Q('s209', mk.short({
  marks: 2,
  stem: r`Riya writes: "$\text{HCF}(2^3 \times 5,\; 2 \times 3^2 \times 5) = 2^3 \times 3^2 \times 5$." Identify her mistake and find the correct HCF.`,
  model: r`Riya has taken the **greatest** power of **every** prime: that gives the LCM, $2^3 \times 3^2 \times 5 = 360$.

For the HCF take only the **common** primes, $2$ and $5$, with the **smaller** powers: HCF $= 2 \times 5 = 10$.`,
  sol: r`The numbers are $40$ and $90$. Common primes: $2$ (powers $3$ and $1$, take $1$) and $5$. $3$ is not common. HCF $= 10$, LCM $= 360$.`,
  scheme: [['Identifies that she found the LCM (greatest powers)', 1], ['Correct HCF = 10', 1]],
  d: 2, c: 'evaluation', t: [2], time: 120,
}), (C) => { C.model([gcd(40, 90), lcm(40, 90)]); C.sol([40, 90]); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({
  marks: 3,
  stem: r`Find the HCF and LCM of $252$ and $375$ using prime factorisation, and verify that $\text{HCF} \times \text{LCM}$ equals the product of the two numbers.`,
  model: r`$252 = 2^2 \times 3^2 \times 7$ and $375 = 3 \times 5^3$.

HCF $= 3$ (the only common prime, smaller power $3^1$).

LCM $= 2^2 \times 3^2 \times 5^3 \times 7 = 4 \times 9 \times 125 \times 7 = 31500$.

Verification: $\text{HCF} \times \text{LCM} = 3 \times 31500 = 94500$ and $252 \times 375 = 94500$. ✓`,
  sol: r`**Step 1.** Factorise. **Step 2.** HCF from common primes, LCM from all primes with greatest powers. **Step 3.** Multiply and compare: both sides are $94500$.`,
  scheme: [['Both prime factorisations', 1], ['HCF = 3 and LCM = 31500', 1], ['Verification 94500 = 94500', 1]],
  d: 2, c: 'understanding', t: [2], time: 240,
}), (C) => { C.model([gcd(252, 375), lcm(252, 375), 252 * 375]); C.assert(gcd(252, 375) * lcm(252, 375) === 94500, 'product'); });
Q('s302', mk.short({
  marks: 3,
  stem: r`Find the HCF and LCM of $40$, $84$ and $210$ by prime factorisation.`,
  model: r`$40 = 2^3 \times 5$, $84 = 2^2 \times 3 \times 7$, $210 = 2 \times 3 \times 5 \times 7$.

HCF: the only prime common to all three is $2$, smallest power $2^1$. HCF $= 2$.

LCM $= 2^3 \times 3 \times 5 \times 7 = 840$.`,
  sol: r`For three numbers, the HCF uses primes common to **all three**: $3$, $5$ and $7$ are each missing from one number. The LCM takes every prime with its greatest power. Note $2 \times 840 = 1680 \ne 40 \times 84 \times 210$.`,
  scheme: [['All three factorisations', 1], ['HCF = 2', 1], ['LCM = 840', 1]],
  d: 2, c: 'understanding', t: [2], time: 240,
}), (C) => { C.model([hcfN(40, 84, 210), lcmN(40, 84, 210)]); C.assert(2 * 840 !== 40 * 84 * 210, 'not product'); });
Q('s303', mk.short({
  marks: 3,
  stem: r`Prove that $\sqrt{5}$ is irrational.`,
  model: r`Assume, to the contrary, that $\sqrt5$ is rational. Then $\sqrt5 = \dfrac ab$, where $a, b$ are co-prime integers and $b \ne 0$.

Squaring, $5b^2 = a^2$. So $5$ divides $a^2$, and since $5$ is prime, $5$ divides $a$. Write $a = 5c$ for some integer $c$.

Then $5b^2 = 25c^2$, so $b^2 = 5c^2$. Hence $5$ divides $b^2$, and so $5$ divides $b$.

Now $5$ divides both $a$ and $b$, which contradicts that $a$ and $b$ are co-prime. So our assumption is wrong, and $\sqrt5$ is irrational.`,
  sol: r`Proof by contradiction in four moves: assume $\dfrac ab$ in lowest terms; show $5 \mid a$; substitute $a = 5c$ to show $5 \mid b$; contradiction with co-prime.`,
  scheme: [['Assumption √5 = a/b with a, b co-prime', 0.5], ['5 | a² ⇒ 5 | a (prime), a = 5c', 1], ['b² = 5c² ⇒ 5 | b', 1], ['Contradiction and conclusion', 0.5]],
  d: 2, c: 'understanding', t: [3], time: 300,
}), null, 'standard proof (syllabus LO): steps checked by hand');
Q('s304', mk.short({
  marks: 3,
  stem: r`Given that $\sqrt{3}$ is irrational, prove that $7 + 2\sqrt{3}$ is irrational.`,
  model: r`Suppose $7 + 2\sqrt3 = r$, where $r$ is rational.

Then $2\sqrt3 = r - 7$, so $\sqrt3 = \dfrac{r - 7}{2}$.

Since $r$ is rational, $r - 7$ is rational and so is $\dfrac{r - 7}{2}$. This makes $\sqrt3$ rational, which contradicts the given fact.

Hence $7 + 2\sqrt3$ is irrational.`,
  sol: r`Isolate $\sqrt3$ using only operations that keep rational numbers rational (subtract $7$, divide by $2$).`,
  scheme: [['Assumes 7 + 2√3 = r rational', 1], ['√3 = (r − 7)/2 is rational', 1], ['Contradiction and conclusion', 1]],
  d: 2, c: 'application', t: [3], time: 240,
}), null, 'proof: structure checked by hand');
Q('s305', mk.short({
  marks: 3,
  stem: r`Find the largest number that divides $398$, $436$ and $542$, leaving remainders $7$, $11$ and $15$ respectively.`,
  model: r`The number divides $398 - 7 = 391$, $436 - 11 = 425$ and $542 - 15 = 527$ exactly.

$391 = 17 \times 23$, $425 = 5^2 \times 17$, $527 = 17 \times 31$.

The largest such number is $\text{HCF} = 17$.

Check: $398 = 23 \times 17 + 7$, $436 = 25 \times 17 + 11$, $542 = 31 \times 17 + 15$. ✓`,
  sol: r`**Step 1.** Subtract the remainders. **Step 2.** Factorise. **Step 3.** HCF $= 17$, which is larger than every remainder, as a divisor must be.`,
  scheme: [['Subtracts remainders: 391, 425, 527', 1], ['Factorisations', 1], ['Answer 17', 1]],
  d: 3, c: 'application', t: [2], time: 240,
}), (C) => { const h = hcfN(391, 425, 527); C.model([391, 425, 527, h, 23, 25, 31]); C.assert(398 % h === 7 && 436 % h === 11 && 542 % h === 15, 'remainders'); });
Q('s306', mk.short({
  marks: 3,
  stem: r`Find the smallest four-digit number which leaves a remainder of $5$ when divided by each of $12$, $16$, $24$ and $36$.`,
  model: r`$12 = 2^2 \times 3$, $16 = 2^4$, $24 = 2^3 \times 3$, $36 = 2^2 \times 3^2$, so $\text{LCM} = 2^4 \times 3^2 = 144$.

Numbers leaving remainder $5$ are $144k + 5$. The smallest four-digit multiple of $144$ is $144 \times 7 = 1008$ (since $144 \times 6 = 864$).

So the number is $1008 + 5 = 1013$.`,
  sol: r`**Step 1.** LCM $= 144$. **Step 2.** $144 \times 6 + 5 = 869$ has three digits; $144 \times 7 + 5 = 1013$. **Check:** $1013 - 5 = 1008$ is divisible by $12$, $16$, $24$, $36$.`,
  scheme: [['LCM = 144', 1], ['Smallest four-digit multiple 1008', 1], ['Adds remainder: 1013', 1]],
  d: 4, c: 'analysis', t: [2], time: 300,
}), (C) => { const L = lcmN(12, 16, 24, 36); let n = 1000; while (![12, 16, 24, 36].every((d) => n % d === 5)) n++; C.model([L, 1008, n]); C.sol([869]); });
Q('s307', mk.short({
  marks: 3,
  stem: r`Find the smallest perfect square that is divisible by each of $12$, $15$ and $20$.`,
  model: r`The number must be a multiple of $\text{LCM}(12, 15, 20)$. $12 = 2^2 \times 3$, $15 = 3 \times 5$, $20 = 2^2 \times 5$, so LCM $= 2^2 \times 3 \times 5 = 60$.

In a perfect square every exponent is even, so $3$ and $5$ each need one more factor: multiply $60$ by $3 \times 5 = 15$.

Smallest perfect square $= 60 \times 15 = 900 = 30^2$.`,
  sol: r`Every common multiple is a multiple of $60 = 2^2 \times 3 \times 5$. Make the exponents of $3$ and $5$ even with the least extra factor $15$. **Check:** $900 \div 12 = 75$, $900 \div 15 = 60$, $900 \div 20 = 45$.`,
  scheme: [['LCM = 60 with factorisation', 1], ['Makes exponents even: multiply by 15', 1], ['900', 1]],
  d: 4, c: 'analysis', t: [1, 2], time: 300,
}), (C) => { const L = lcmN(12, 15, 20); let k = 1; while (!isSquare(L * k)) k++; C.model([L, k, L * k]); C.sol([75, 60, 45]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({
  stem: r`Prove that $\sqrt{3}$ is irrational. Hence prove that $2 + 5\sqrt{3}$ is irrational.`,
  model: r`**Part 1.** Assume $\sqrt3$ is rational: $\sqrt3 = \dfrac ab$ with $a, b$ co-prime integers, $b \ne 0$.

Squaring: $3b^2 = a^2$, so $3$ divides $a^2$. As $3$ is prime, $3$ divides $a$. Let $a = 3c$.

Then $3b^2 = 9c^2$, so $b^2 = 3c^2$; hence $3$ divides $b^2$ and therefore $3$ divides $b$.

So $3$ is a common factor of $a$ and $b$, contradicting that they are co-prime. Hence $\sqrt3$ is irrational.

**Part 2.** Suppose $2 + 5\sqrt3 = r$, rational. Then $\sqrt3 = \dfrac{r - 2}{5}$, which is rational because $r$ is rational. This contradicts Part 1. Hence $2 + 5\sqrt3$ is irrational.`,
  sol: r`Part 1 is the standard contradiction proof. Part 2 reuses Part 1: isolate $\sqrt3$ with operations (subtract $2$, divide by $5$) that keep rationals rational.`,
  scheme: [['Assumption √3 = a/b, a and b co-prime', 1], ['3 | a, a = 3c', 1], ['b² = 3c² ⇒ 3 | b, contradiction, conclusion', 1], ['Assume 2 + 5√3 = r and isolate √3 = (r − 2)/5', 1], ['Contradiction and conclusion for Part 2', 1]],
  d: 3, c: 'application', t: [3], time: 600,
}), null, 'proof: steps checked by hand');
Q('l02', mk.long({
  stem: r`A school hall in Bhopal measures $15.12$ m by $10.8$ m. It is to be paved with identical square marble tiles, as large as possible, with no tile cut.

(a) Find the side of each tile.
(b) Find the number of tiles needed.
(c) If one tile costs ₹$180$, find the total cost of the tiles.`,
  model: r`Work in centimetres: $1512$ cm and $1080$ cm.

(a) $1512 = 2^3 \times 3^3 \times 7$ and $1080 = 2^3 \times 3^3 \times 5$. The largest tile side is the HCF $= 2^3 \times 3^3 = 216$ cm $= 2.16$ m.

(b) Tiles along the length $= \dfrac{1512}{216} = 7$; along the breadth $= \dfrac{1080}{216} = 5$. Number of tiles $= 7 \times 5 = 35$.

(c) Cost $= 35 \times 180 = $ ₹$6300$.`,
  sol: r`**Step 1.** Convert to cm so both lengths are whole numbers. **Step 2.** Largest square tile dividing both sides: HCF. **Step 3.** Count tiles row by column. **Step 4.** Multiply by the price.`,
  scheme: [['Converts to cm and recognises HCF', 1], ['Prime factorisations of 1512 and 1080', 1], ['Tile side 216 cm', 1], ['Number of tiles 35', 1], ['Cost ₹6300', 1]],
  d: 3, c: 'application', t: [2], time: 600,
}), (C) => { const h = gcd(1512, 1080); C.model([h, 2.16, 1512 / h, 1080 / h, (1512 / h) * (1080 / h), (1512 / h) * (1080 / h) * 180]); C.assert(factorTex(1512) === r`2^3 \times 3^3 \times 7` && factorTex(1080) === r`2^3 \times 3^3 \times 5`, 'factorisations'); });
Q('l03', mk.long({
  stem: r`Three friends jog on a circular track at a stadium in Kochi. Anil completes a lap in $252$ s, Bina in $308$ s and Charu in $198$ s. They start together from the same point and in the same direction.

(a) After how many minutes and seconds will they all be together at the starting point again?
(b) How many laps will each of them have completed by then?`,
  model: r`(a) $252 = 2^2 \times 3^2 \times 7$, $308 = 2^2 \times 7 \times 11$, $198 = 2 \times 3^2 \times 11$.

LCM $= 2^2 \times 3^2 \times 7 \times 11 = 2772$ s $= 46$ min $12$ s.

(b) Anil: $\dfrac{2772}{252} = 11$ laps; Bina: $\dfrac{2772}{308} = 9$ laps; Charu: $\dfrac{2772}{198} = 14$ laps.`,
  sol: r`**Step 1.** "Together again at the start" is a common multiple of the lap times, and "first time" makes it the least one. **Step 2.** Factorise and take greatest powers. **Step 3.** $2772 = 46 \times 60 + 12$. **Step 4.** Divide by each lap time.`,
  scheme: [['Identifies LCM', 1], ['Three prime factorisations', 1], ['LCM = 2772 s', 1], ['46 min 12 s', 1], ['Laps 11, 9, 14', 1]],
  d: 3, c: 'application', t: [2], time: 600,
}), (C) => { const L = lcmN(252, 308, 198); C.model([L, Math.floor(L / 60), L % 60, L / 252, L / 308, L / 198]); });
Q('l04', mk.long({
  stem: r`(a) Find the HCF and LCM of $72$, $108$ and $180$ by prime factorisation.

(b) Show that the product of the HCF and LCM is **not** equal to the product of the three numbers, and find how many times larger the product of the numbers is.

(c) Explain, using exponents of primes, why the rule "HCF × LCM = product" works for two numbers but fails here.`,
  model: r`(a) $72 = 2^3 \times 3^2$, $108 = 2^2 \times 3^3$, $180 = 2^2 \times 3^2 \times 5$.

HCF $= 2^2 \times 3^2 = 36$; LCM $= 2^3 \times 3^3 \times 5 = 1080$.

(b) $\text{HCF} \times \text{LCM} = 36 \times 1080 = 38880$. Product $= 72 \times 108 \times 180 = 1399680$. These are not equal; $\dfrac{1399680}{38880} = 36$, so the product is $36$ times larger.

(c) For two numbers, each prime's exponents $m$ and $n$ appear once as the smaller (in the HCF) and once as the larger (in the LCM), and $\min(m, n) + \max(m, n) = m + n$, the exponent in the product. With three numbers the **middle** exponent is used by neither. For $2$: exponents $3, 2, 2$; HCF uses $2$, LCM uses $3$, total $5$, but the product has $7$. For $3$: $2 + 3 = 5$ against $7$. For $5$: $0 + 1 = 1$ against $1$. The missing $2^2 \times 3^2 = 36$ is exactly the factor found in (b).`,
  sol: r`Compare exponents prime by prime. The "lost" middle exponents ($2^2$ and $3^2$) multiply to $36$, matching the ratio in (b).`,
  scheme: [['Three factorisations', 1], ['HCF = 36 and LCM = 1080', 1], ['38880 vs 1399680, ratio 36', 1], ['Two-number reason: min + max = sum of exponents', 1], ['Three-number failure explained (middle exponents 2² × 3² = 36)', 1]],
  d: 4, c: 'analysis', t: [2], time: 660,
}), (C) => { const H = hcfN(72, 108, 180), L = lcmN(72, 108, 180), P = 72 * 108 * 180; C.model([H, L, H * L, P, P / (H * L)]); });
Q('l05', mk.long({
  stem: r`(a) A student "proves" that $\sqrt{4}$ is irrational as follows.

*Let $\sqrt4 = \dfrac ab$, with $a, b$ co-prime. Then $4b^2 = a^2$, so $4$ divides $a^2$, so $4$ divides $a$. Let $a = 4c$. Then $4b^2 = 16c^2$, so $b^2 = 4c^2$, so $4$ divides $b$. This contradicts co-primality, so $\sqrt4$ is irrational.*

Identify the incorrect step, give a counter-example to it, and state the truth about $\sqrt4$.

(b) Prove that $\sqrt{6}$ is irrational.`,
  model: r`(a) The wrong step is "$4$ divides $a^2$, so $4$ divides $a$". This rule holds only when the divisor is **prime**, and $4$ is not prime. Counter-example: $4$ divides $6^2 = 36$, but $4$ does not divide $6$. In fact $\sqrt4 = 2 = \dfrac21$, which is rational.

(b) Assume $\sqrt6 = \dfrac ab$ with $a, b$ co-prime, $b \ne 0$. Then $6b^2 = a^2$. So $2$ divides $a^2$; as $2$ is prime, $2$ divides $a$. Let $a = 2c$. Then $6b^2 = 4c^2$, so $3b^2 = 2c^2$. Hence $2$ divides $3b^2$; since $2$ does not divide $3$, $2$ divides $b^2$, and so $2$ divides $b$. Now $2$ divides both $a$ and $b$, a contradiction. So $\sqrt6$ is irrational.`,
  sol: r`(a) The lemma "$p \mid a^2 \Rightarrow p \mid a$" needs $p$ prime; with $4$ it fails, e.g. $a = 6$. (b) Work with the prime $2$ (or $3$) dividing $6$, not with $6$ itself.`,
  scheme: [['Identifies the step "4 | a² ⇒ 4 | a"', 1], ['Counter-example (e.g. a = 6) and √4 = 2 rational', 1], ['(b) Assumption and 6b² = a², 2 | a', 1], ['a = 2c ⇒ 3b² = 2c² ⇒ 2 | b', 1], ['Contradiction and conclusion', 1]],
  d: 5, c: 'evaluation', t: [3], time: 720,
}), (C) => { C.assert(36 % 4 === 0 && 6 % 4 !== 0 && Math.sqrt(4) === 2, 'counter-example 6'); C.model([36, 6]); });
Q('l06', mk.long({
  stem: r`Two natural numbers have HCF $16$ and LCM $960$. Find **all** possible pairs of such numbers. Explain your method.`,
  model: r`Since the HCF is $16$, write the numbers as $16m$ and $16n$, where $m$ and $n$ are co-prime (otherwise the HCF would be larger).

Then $\text{LCM} = 16mn = 960$, so $mn = 60$.

Co-prime pairs $(m, n)$ with $m \le n$ and $mn = 60 = 2^2 \times 3 \times 5$: the factor $2^2$ must stay together, so the pairs are $(1, 60)$, $(3, 20)$, $(4, 15)$, $(5, 12)$. ($(2, 30)$ and $(6, 10)$ are not co-prime.)

The pairs of numbers are $(16, 960)$, $(48, 320)$, $(64, 240)$ and $(80, 192)$.`,
  sol: r`Check one pair: $64 = 2^6$, $240 = 2^4 \times 3 \times 5$; HCF $= 2^4 = 16$ and LCM $= 2^6 \times 3 \times 5 = 960$. ✓ Each pair also satisfies $16 \times 960 = 15360 = $ product.`,
  scheme: [['Writes numbers as 16m, 16n with m, n co-prime', 1], ['mn = 60', 1], ['Lists co-prime factor pairs, rejecting (2, 30), (6, 10)', 1], ['All four number pairs', 1], ['Verification of at least one pair', 1]],
  d: 5, c: 'analysis', t: [2], time: 720,
}), (C) => { const pairs = []; for (let a = 16; a <= 960; a += 16) for (let b = a; b <= 960; b += 16) if (gcd(a, b) === 16 && lcm(a, b) === 960) pairs.push([a, b]); C.assert(pairs.length === 4, `${pairs.length} pairs`); C.model(pairs.flat()); });

// =============================================================== Case-based
caseQ('c01', {
  passage: r`At the Esplanade bus depot in Kolkata, three city routes start at 6:00 a.m. Buses on route A leave every $15$ minutes, on route B every $20$ minutes and on route C every $36$ minutes. The depot manager wants to know when buses on all three routes leave at the same time, so she can post an extra inspector at those moments. The depot runs until 9:00 p.m.`,
  d: 3, c: 'application',
  model: r`(a) (b) LCM. (b) $180$ minutes, that is at 9:00 a.m. (c) (i) Every $180$ minutes after 6:00 a.m. up to 9:00 p.m. ($900$ minutes): $\dfrac{900}{180} = 5$ times (9 a.m., 12 noon, 3 p.m., 6 p.m., 9 p.m.). Or (ii) $\text{LCM}(15, 20, 24) = 120$ minutes, so the first common departure after 6:00 a.m. is 8:00 a.m.`,
  sol: r`(a) Common departures repeat at common multiples of $15$, $20$, $36$; the first is the LCM. (b) $15 = 3 \times 5$, $20 = 2^2 \times 5$, $36 = 2^2 \times 3^2$, so LCM $= 2^2 \times 3^2 \times 5 = 180$ min. (c) (i) 6:00 a.m. to 9:00 p.m. is $15$ h $= 900$ min; $900 \div 180 = 5$. (ii) $24 = 2^3 \times 3$, LCM $= 2^3 \times 3 \times 5 = 120$ min.`,
  children: [
    child('a', mk.mcq({ stem: 'Which idea gives the first time after 6:00 a.m. when buses on all three routes leave together?', opts: ['HCF of 15, 20 and 36', 'LCM of 15, 20 and 36', 'Product 15 × 20 × 36', 'Sum 15 + 20 + 36'], key: 'b', sol: 'Departures of each route are multiples of its interval; a common departure is a common multiple, and the first one is the least common multiple.', d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: 'After how many minutes from 6:00 a.m. do all three routes next leave together?', value: 180, unit: 'min', sol: r`$15 = 3 \times 5$, $20 = 2^2 \times 5$, $36 = 2^2 \times 3^2$. LCM $= 2^2 \times 3^2 \times 5 = 180$ minutes (9:00 a.m.).`, scheme: [['180 minutes', 1]], d: 2, c: 'application', t: [2], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** After 6:00 a.m., how many more times do all three routes leave together, up to and including 9:00 p.m.?', model: r`6:00 a.m. to 9:00 p.m. is $900$ minutes. Common departures every $180$ minutes: $\dfrac{900}{180} = 5$ more times — 9 a.m., 12 noon, 3 p.m., 6 p.m. and 9 p.m.`, sol: r`Duration $900$ min; divide by the LCM $180$.`, scheme: [['900 minutes', 1], ['5 times', 1]], d: 3, c: 'application', t: [2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** If route C changes to a bus every 24 minutes, at what time after 6:00 a.m. will all three routes first leave together?', model: r`$24 = 2^3 \times 3$. New LCM $= \text{LCM}(15, 20, 24) = 2^3 \times 3 \times 5 = 120$ minutes, so at 8:00 a.m.`, sol: r`Recompute the LCM with $24$: $120$ min after 6:00 a.m.`, scheme: [['LCM = 120 minutes', 1], ['8:00 a.m.', 1]], d: 3, c: 'application', t: [2], time: 150 }),
    ]),
  ],
}, (C) => { const L = lcmN(15, 20, 36); C.child('a').key('b'); C.child('b').val(L); C.child('c').model([900, L, 900 / L]); C.child('cii').model([lcmN(15, 20, 24)]); C.assert(lcmN(15, 20, 24) === 120, '8 am'); C.model([L, 5, 120]); });

caseQ('c02', {
  passage: r`Farida runs a bangle shop in Jaipur's Johari Bazaar. Before Teej she has $432$ red bangles, $576$ green bangles and $720$ golden bangles. She wants to pack them in identical packets so that every packet has the **same number** of bangles, each packet has bangles of **only one colour**, and she uses the **fewest** packets possible.`,
  d: 3, c: 'application',
  model: r`(a) (c) HCF. (b) $144$ bangles per packet. (c) (i) $3 + 4 + 5 = 12$ packets. Or (ii) $9 + 12 + 15 = 36$ packets of $48$; $48$ divides all three counts, but it is not the largest such number.`,
  sol: r`(a) Fewest packets means the largest packet size dividing all three counts: the HCF. (b) $432 = 2^4 \times 3^3$, $576 = 2^6 \times 3^2$, $720 = 2^4 \times 3^2 \times 5$, HCF $= 2^4 \times 3^2 = 144$. (c) (i) $432 \div 144 = 3$, $576 \div 144 = 4$, $720 \div 144 = 5$. (ii) $432 \div 48 = 9$, $576 \div 48 = 12$, $720 \div 48 = 15$.`,
  children: [
    child('a', mk.mcq({ stem: 'The number of bangles in each packet should be', opts: ['the LCM of 432, 576 and 720', 'the product of the three numbers', 'the HCF of 432, 576 and 720', 'any common factor of the three numbers'], key: 'c', sol: 'The packet size must divide all three counts (common factor), and the fewest packets needs the largest such size: the HCF. Any common factor works, but only the HCF gives the fewest packets.', d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: 'How many bangles go in each packet?', value: 144, sol: r`$432 = 2^4 \times 3^3$, $576 = 2^6 \times 3^2$, $720 = 2^4 \times 3^2 \times 5$. HCF $= 2^4 \times 3^2 = 144$.`, scheme: [['144', 1]], d: 2, c: 'application', t: [2], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** How many packets does Farida make in all?', model: r`Red: $\dfrac{432}{144} = 3$, green: $\dfrac{576}{144} = 4$, golden: $\dfrac{720}{144} = 5$. Total $= 12$ packets.`, sol: 'Divide each count by 144 and add.', scheme: [['3, 4 and 5 packets', 1], ['Total 12', 1]], d: 2, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Her assistant suggests packets of 48 bangles instead. Find how many packets this needs, and say why 48 is allowed but not the best choice.', model: r`$\dfrac{432}{48} + \dfrac{576}{48} + \dfrac{720}{48} = 9 + 12 + 15 = 36$ packets. $48$ divides all three counts, so it is a common factor, but it is smaller than the HCF $144$, so it needs three times as many packets.`, sol: '48 is a common factor (48 divides 144), not the highest.', scheme: [['36 packets', 1], ['48 is a common factor but not the highest', 1]], d: 3, c: 'evaluation', t: [2], time: 150 }),
    ]),
  ],
}, (C) => { const H = hcfN(432, 576, 720); C.child('a').key('c'); C.child('b').val(H); C.child('c').model([432 / H, 576 / H, 720 / H, 12]); C.child('cii').model([9, 12, 15, 36]); C.assert(432 / 48 + 576 / 48 + 720 / 48 === 36 && H % 48 === 0, '48 common factor'); });

caseQ('c03', {
  passage: r`In a maths club meeting in Lucknow, the teacher writes on the board: $2520 = 2^3 \times 3^2 \times 5 \times 7$. Arjun says, "I have found a different prime factorisation: $2520 = 4 \times 630$." Sana adds that $2520$ is special: it is the smallest number divisible by every whole number from $1$ to $10$.`,
  d: 3, c: 'analysis',
  model: r`(a) (b) $4$ distinct primes. (b) $70$. (c) (i) Arjun is wrong: $4$ and $630$ are not primes; breaking them down gives $2^2 \times 2 \times 3^2 \times 5 \times 7 = 2^3 \times 3^2 \times 5 \times 7$ again — the factorisation is unique. Or (ii) $\text{LCM}(1, 2, \dots, 10) = 2^3 \times 3^2 \times 5 \times 7 = 2520$: the highest powers needed are $2^3$ (from $8$), $3^2$ (from $9$), $5$ and $7$.`,
  sol: r`(a) Primes $2, 3, 5, 7$. (b) $2520k$ is a perfect square when every exponent is even: $2^3 \to$ needs $2$, $3^2$ fine, $5 \to$ needs $5$, $7 \to$ needs $7$; $k = 2 \times 5 \times 7 = 70$, and $2520 \times 70 = 176400 = 420^2$. (c) See model answer.`,
  children: [
    child('a', mk.mcq({ stem: 'How many distinct prime factors does 2520 have?', opts: ['3', '4', '7', '8'], key: 'b', sol: r`The distinct primes are $2, 3, 5, 7$: four. (Counting with repetition gives $3 + 2 + 1 + 1 = 7$, option (c).)`, d: 1, c: 'recall', t: [1], time: 40 })),
    child('b', mk.fill({ stem: r`The smallest natural number $k$ for which $2520k$ is a perfect square is ___.`, acc: [['70']], sol: r`$2520 = 2^3 \times 3^2 \times 5 \times 7$. Make every exponent even: multiply by $2 \times 5 \times 7 = 70$. Check: $2520 \times 70 = 176400 = 420^2$.`, d: 3, c: 'application', t: [1], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Is Arjun right? Explain using the Fundamental Theorem of Arithmetic.', model: r`No. A prime factorisation must use only primes, and $4$ and $630$ are composite. Breaking them down, $4 = 2^2$ and $630 = 2 \times 3^2 \times 5 \times 7$, gives $2^3 \times 3^2 \times 5 \times 7$ again. The Fundamental Theorem says the prime factorisation is unique apart from order, so there is no "different" one.`, sol: 'Reduce 4 × 630 to primes; it matches the board.', scheme: [['4 and 630 are not prime', 1], ['Reduces to the same factorisation; uniqueness stated', 1]], d: 3, c: 'evaluation', t: [1], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Use prime factorisation to justify Sana\'s statement that 2520 is the smallest number divisible by every whole number from 1 to 10.', model: r`The smallest such number is $\text{LCM}(1, 2, \dots, 10)$. The greatest prime powers among $1$ to $10$ are $2^3$ (from $8$), $3^2$ (from $9$), $5$ and $7$. So the LCM is $2^3 \times 3^2 \times 5 \times 7 = 2520$.`, sol: 'LCM takes the greatest power of each prime up to 10.', scheme: [['Identifies LCM of 1 to 10', 1], ['Greatest powers 2³, 3², 5, 7 give 2520', 1]], d: 3, c: 'analysis', t: [2], time: 150 }),
    ]),
  ],
}, (C) => { C.child('a').opt(Object.keys(factorise(2520)).length); let k = 1; while (!isSquare(2520 * k)) k++; C.child('b').blank(k); C.child('b').sol([176400, 420]); C.child('cii').assert(lcmN(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) === 2520 && 4 * 630 === 2520, 'LCM 1..10 = 2520'); C.child('cii').model([2520]); });

caseQ('c04', {
  passage: r`At a Ramanujan Day quiz in Chennai, the quizmaster writes two numbers: $P = 3 + \sqrt{2}$ and $Q = 3 - \sqrt{2}$. Team Kaveri says both numbers are irrational. Team Vaigai claims, "The sum and the product of two irrational numbers are always irrational." The teams may use the fact that $\sqrt{2}$ is irrational.`,
  d: 3, c: 'analysis',
  model: r`(a) (a) $P + Q = 6$, rational. (b) $PQ = 7$. (c) (i) If $3 + \sqrt2 = r$ (rational) then $\sqrt2 = r - 3$ is rational, a contradiction; so $P$ is irrational. Or (ii) Vaigai is wrong: $P$ and $Q$ are irrational but $P + Q = 6$ and $PQ = 7$ are rational.`,
  sol: r`(a) $(3 + \sqrt2) + (3 - \sqrt2) = 6$. (b) $(3 + \sqrt2)(3 - \sqrt2) = 9 - 2 = 7$. (c) as in the model answer.`,
  children: [
    child('a', mk.mcq({ stem: r`$P + Q$ is`, opts: [r`$6$, a rational number`, r`$6 + 2\sqrt2$, an irrational number`, r`$2\sqrt2$, an irrational number`, r`$0$`], key: 'a', sol: r`The $\sqrt2$ terms cancel: $3 + \sqrt2 + 3 - \sqrt2 = 6$.`, d: 1, c: 'understanding', t: [3], time: 45 })),
    child('b', mk.num({ stem: r`Find the value of $P \times Q$.`, value: 7, sol: r`$(3 + \sqrt2)(3 - \sqrt2) = 3^2 - (\sqrt2)^2 = 9 - 2 = 7$.`, scheme: [['7', 1]], d: 2, c: 'application', t: [3], time: 75 })),
    child('c', mk.short({ marks: 2, stem: r`**(i)** Prove that $P = 3 + \sqrt2$ is irrational.`, model: r`Suppose $3 + \sqrt2 = r$ for a rational $r$. Then $\sqrt2 = r - 3$. A difference of two rationals is rational, so $\sqrt2$ would be rational — a contradiction. Hence $P$ is irrational.`, sol: 'Assume rational, isolate √2, contradiction.', scheme: [['Assumption and √2 = r − 3', 1], ['Contradiction and conclusion', 1]], d: 2, c: 'application', t: [3], time: 150 }), [
      mk.short({ marks: 2, stem: r`**(ii)** Use $P$ and $Q$ to decide whether Team Vaigai's claim is correct.`, model: r`The claim is false. $P$ and $Q$ are both irrational, yet $P + Q = 6$ and $P \times Q = 7$ are rational. One counter-example is enough to disprove an "always" statement.`, sol: 'Counter-example from parts (a) and (b).', scheme: [['Uses P + Q = 6 or PQ = 7 as counter-example', 1], ['Concludes the claim is false', 1]], d: 3, c: 'evaluation', t: [3], time: 120 }),
    ]),
  ],
}, (C) => { const s2 = Math.sqrt(2); C.child('a').assert(Math.abs(3 + s2 + 3 - s2 - 6) < 1e-12, 'P+Q=6'); C.child('a').key('a'); C.child('b').val((3 + s2) * (3 - s2), 1e-9); C.child('cii').model([6, 7]); });

caseQ('c05', {
  passage: r`A farmer near Nashik is fencing three sides of his vineyard along a road. The sides measure $396$ m, $504$ m and $612$ m, and they meet end to end at two corners. He wants concrete poles at **equal** distances along all three sides, with a pole at every corner and at both ends, and the distance between poles as **large** as possible (a whole number of metres).`,
  d: 4, c: 'analysis',
  assets: [],
  model: r`(a) (d) HCF. (b) $36$ m. (c) (i) Total length $= 1512$ m, so $\dfrac{1512}{36} + 1 = 43$ poles. Or (ii) the spacing must divide $36$; the largest divisor of $36$ below $20$ is $18$ m.`,
  sol: r`(a) The spacing must divide each side exactly, and be as large as possible. (b) $396 = 2^2 \times 3^2 \times 11$, $504 = 2^3 \times 3^2 \times 7$, $612 = 2^2 \times 3^2 \times 17$, HCF $= 2^2 \times 3^2 = 36$ m. (c) (i) Gaps: $11 + 14 + 17 = 42$; an open path with $42$ gaps has $43$ poles. (ii) Common divisors of the three sides are the divisors of the HCF $36$: $1, 2, 3, 4, 6, 9, 12, 18, 36$; the largest below $20$ is $18$.`,
  children: [
    child('a', mk.mcq({ stem: 'The largest possible distance between poles is', opts: ['the LCM of the three sides', 'the sum of the three sides divided by 3', 'the smallest side', 'the HCF of the three sides'], key: 'd', sol: 'Each side must be an exact number of gaps, so the gap divides every side; the largest such gap is the HCF.', d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: 'Find the distance between consecutive poles, in metres.', value: 36, unit: 'm', sol: r`$396 = 2^2 \times 3^2 \times 11$, $504 = 2^3 \times 3^2 \times 7$, $612 = 2^2 \times 3^2 \times 17$. HCF $= 2^2 \times 3^2 = 36$ m.`, scheme: [['36 m', 1]], d: 2, c: 'application', t: [2], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** How many poles are needed in all?', model: r`Gaps: $\dfrac{396}{36} + \dfrac{504}{36} + \dfrac{612}{36} = 11 + 14 + 17 = 42$. The fence is an open path, so poles $= 42 + 1 = 43$ (corner poles are shared, not double-counted).`, sol: 'Count gaps, then add one pole for an open path.', scheme: [['42 gaps', 1], ['43 poles', 1]], d: 4, c: 'analysis', t: [2], time: 180 }), [
      mk.short({ marks: 2, stem: '**(ii)** The supplier can only deliver wire in pieces shorter than 20 m, so each gap must be less than 20 m. What is now the largest possible gap? Explain.', model: r`The gap must still divide all three sides, so it must be a divisor of their HCF $36$: $1, 2, 3, 4, 6, 9, 12, 18, 36$. The largest one below $20$ m is $18$ m.`, sol: 'Common divisors are exactly the divisors of the HCF.', scheme: [['Common divisors are divisors of 36', 1], ['18 m', 1]], d: 4, c: 'analysis', t: [2], time: 180 }),
    ]),
  ],
}, (C) => { const H = hcfN(396, 504, 612); C.child('a').key('d'); C.child('b').val(H); C.child('c').model([396 / H, 504 / H, 612 / H, (396 + 504 + 612) / H + 1]); let best = 0; for (let g = 1; g < 20; g++) if ([396, 504, 612].every((s) => s % g === 0)) best = g; C.child('cii').model([best]); });

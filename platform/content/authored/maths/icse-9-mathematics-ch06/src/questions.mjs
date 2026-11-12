// ICSE 9 Mathematics ch06 Indices (Exponents) — practice bank with independent re-solve checks.
// Keys, option values and answers are typed as literals here; each check recomputes them with idx.mjs: exact rational
// arithmetic where a fractional index is accepted only if the root is exact, exact exponent arithmetic for letters,
// substitution of every root of an exponential equation (and a uniqueness check), and parsing of every typed working line.
import { Q, mk, r } from './lib.mjs';
import { V, E, chain, tx, identity, solveExp, linRoot, R } from './idx.mjs';

const O = (a) => a.map((s) => `$${s}$`);
const vs = (opts) => opts.map((s) => String(V(s)));
/** Option expressions typed as TeX: exactly one equals the target (exact values compared as strings). */
const WV = (C, opts, target) => C.which(vs(opts), String(target));
const holds = (l, rr, samples) => { try { return identity(l, rr, samples); } catch { return false; } };
const poly = (s) => String(E(s));
const eqv = (l, rr, env = {}) => { try { return V(l, env).eq(V(rr, env)); } catch { return false; } };
const ns = (...a) => a.map((n) => ({ n }));

// =============================================================== MCQ
const m01 = [r`a^{m+n}`, r`a^{mn}`, r`(2a)^{m+n}`, r`a^{m-n}`];
Q('m01', mk.mcq({ stem: r`Which expression is equal to $a^{m} \times a^{n}$, for a positive number $a$ and whole numbers $m$ and $n$?`, opts: O(m01), key: 'a', sol: r`The product law says that powers of the same base are multiplied by adding the indices: $a^{m} \times a^{n} = a^{m+n}$. For example $2^{3} \times 2^{4} = 2^{7} = 128$, but $2^{12}$ (the product of the indices) is $4096$.`, d: 1, c: 'recall', t: [1], time: 45 }), (C) => {
  const S = [{ a: 2, m: 3, n: 4 }, { a: 3, m: 2, n: 5 }, { a: 5, m: 4, n: 1 }];
  C.which(m01.map((o) => holds(r`a^{m} \times a^{n}`, o, S)), true);
  C.assert(V(r`2^{3} \times 2^{4}`).eq(R(128)) && V(r`2^{12}`).eq(R(4096)), '2^3 x 2^4 = 128, and 2^12 = 4096');
});

const m02 = [8, 15, 2, 20];
Q('m02', mk.mcq({ stem: r`A petri dish starts with $4^{3}$ cells. After a nutrient dose the count is multiplied by $4^{5}$. The new count is $4^{k}$ cells, where $k$ equals`, opts: O(m02.map(String)), key: 'a', sol: r`The cells are multiplied, and the base $4$ is the same, so the indices add: $4^{3} \times 4^{5} = 4^{3+5} = 4^{8}$ and $k = 8$. The value $15$ comes from multiplying the indices.`, d: 1, c: 'understanding', t: [1], time: 60 }), (C) => {
  const k = [...Array(41).keys()].find((j) => V(`4^{${j}}`).eq(V(r`4^{3} \times 4^{5}`)));
  C.assert(k === 8, 'k = 8');
  C.which(m02, k);
});

const m03 = [r`2^{8}`, r`2^{62}`, r`2^{7}`, r`8`];
Q('m03', mk.mcq({ stem: r`Tanvi's memory card holds $2^{35}$ bytes. One video clip needs $2^{27}$ bytes. The number of such clips that fill the card exactly is`, opts: O(m03), key: 'a', sol: r`The number of clips is $2^{35} \div 2^{27}$. Dividing powers of the same base subtracts the indices: $2^{35-27} = 2^{8} = 256$ clips. Adding the indices would give $2^{62}$, which is the product of the two sizes, not their quotient.`, d: 3, c: 'application', t: [1], time: 75 }), (C) => {
  C.assert(V(r`2^{35} \div 2^{27}`).eq(R(256)) && V(r`2^{35} \div 2^{27}`).eq(V(r`2^{8}`)), '2^35 / 2^27 = 2^8 = 256');
  WV(C, m03, V(r`2^{35} \div 2^{27}`));
});

const m04 = [r`5^{12}`, r`5^{8}`, r`5^{26}`, r`25^{8}`];
Q('m04', mk.mcq({ stem: r`Which of the following is equal to $(5^{2})^{6}$?`, opts: O(m04), key: 'a', sol: r`The power of a power law multiplies the indices: $(5^{2})^{6} = 5^{2 \times 6} = 5^{12}$. Adding gives $5^{8}$, the usual slip. Also $25^{8} = 5^{16}$, which is a different number.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  WV(C, m04, V(r`(5^{2})^{6}`));
  C.assert(V(r`25^{8}`).eq(V(r`5^{16}`)) && !V(r`25^{8}`).eq(V(r`5^{12}`)), '25^8 = 5^16');
});

const m05 = [r`2^{6} \times 5^{4}`, r`2^{5} \times 5^{4}`, r`2^{6} \times 5^{2}`, r`10^{6}`];
Q('m05', mk.mcq({ stem: r`A square courtyard has side $2^{3} \times 5^{2}$ metres. Its area, in square metres, written with prime bases, is`, opts: O(m05), key: 'a', sol: r`Area $= (2^{3} \times 5^{2})^{2}$. A power of a product is the product of the powers, and a power of a power multiplies the indices: $2^{3 \times 2} \times 5^{2 \times 2} = 2^{6} \times 5^{4}$, which is $64 \times 625 = 40000$ m$^2$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => {
  C.assert(V(r`(2^{3} \times 5^{2})^{2}`).eq(R(40000)) && V(r`2^{6} \times 5^{4}`).eq(R(40000)), 'area 40000');
  WV(C, m05, V(r`(2^{3} \times 5^{2})^{2}`));
});

Q('m06', mk.mcq({ stem: r`Jaya says that $7^{0} = 0$, because "no sevens are being multiplied". The correct value of $7^{0}$ is`, opts: ['$1$', '$0$', '$7$', 'not defined'], key: 'a', sol: r`By the quotient law, $7^{3} \div 7^{3} = 7^{3-3} = 7^{0}$. But any non-zero number divided by itself is $1$, so $7^{0} = 1$. The same pattern holds for every non-zero base.`, d: 1, c: 'understanding', t: [2], time: 60 }), (C) => {
  C.assert(V(r`7^{0}`).eq(R(1)) && V(r`7^{3} \div 7^{3}`).eq(R(1)) && [2, 11, 100].every((a) => V(r`a^{0}`, { a }).eq(R(1))), '7^0 = 1 and a^0 = 1');
  C.key('a');
});

const m07 = [r`\dfrac{49}{9}`, r`\dfrac{9}{49}`, r`-\dfrac{9}{49}`, r`-\dfrac{49}{9}`];
Q('m07', mk.mcq({ stem: r`A photocopier setting enlarges by the factor $\left(\dfrac{3}{7}\right)^{-2}$. This factor is equal to`, opts: O(m07), key: 'a', sol: r`A negative index takes the reciprocal of the base: $\left(\dfrac{3}{7}\right)^{-2} = \left(\dfrac{7}{3}\right)^{2} = \dfrac{49}{9}$. The factor is positive and larger than $1$, so it is an enlargement; the index $-2$ does not make the number negative.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  chain(r`\left(\dfrac{3}{7}\right)^{-2} = \left(\dfrac{7}{3}\right)^{2} = \dfrac{49}{9}`);
  WV(C, m07, V(r`\left(\dfrac{3}{7}\right)^{-2}`));
});

const m08 = [r`\dfrac{6}{25}`, r`\dfrac{1}{125}`, r`\dfrac{1}{30}`, r`\dfrac{6}{5}`];
Q('m08', mk.mcq({ stem: r`Vihaan adds two lengths, $5^{-1}$ m and $5^{-2}$ m. The total length, in metres, is`, opts: O(m08), key: 'a', sol: r`$5^{-1} = \dfrac{1}{5} = \dfrac{5}{25}$ and $5^{-2} = \dfrac{1}{25}$, so the sum is $\dfrac{6}{25}$ m. The index law $a^{m} \times a^{n} = a^{m+n}$ is for products; adding the indices to get $5^{-3} = \dfrac{1}{125}$ is a slip.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => {
  chain(r`5^{-1} + 5^{-2} = \dfrac{5}{25} + \dfrac{1}{25} = \dfrac{6}{25}`);
  WV(C, m08, V(r`5^{-1} + 5^{-2}`));
});

const m09 = [r`49`, r`7`, r`98`, r`\dfrac{686}{3}`];
Q('m09', mk.mcq({ stem: r`A cubical tank holds $343$ m$^3$ of water. The area of one square face, in square metres, is $343^{\frac{2}{3}}$, which equals`, opts: O(m09), key: 'a', sol: r`The denominator $3$ means a cube root: $343^{\frac{1}{3}} = 7$, because $7^{3} = 343$. The numerator $2$ is the power: $343^{\frac{2}{3}} = 7^{2} = 49$. So each face has area $49$ m$^2$.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => {
  chain(r`343^{\frac{2}{3}} = (7^{3})^{\frac{2}{3}} = 7^{2} = 49`);
  WV(C, m09, V(r`343^{\frac{2}{3}}`));
});

const m10 = [r`\dfrac{27}{8}`, r`\dfrac{8}{27}`, r`\dfrac{9}{4}`, r`\dfrac{81}{16}`];
Q('m10', mk.mcq({ stem: r`A scale model of a bearing is built with the ratio $\left(\dfrac{16}{81}\right)^{-\frac{3}{4}}$. The value of this ratio is`, opts: O(m10), key: 'a', sol: r`Flip the fraction to remove the minus sign: $\left(\dfrac{81}{16}\right)^{\frac{3}{4}}$. The fourth root of $\dfrac{81}{16}$ is $\dfrac{3}{2}$, and cubing it gives $\dfrac{27}{8}$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => {
  chain(r`\left(\dfrac{16}{81}\right)^{-\frac{3}{4}} = \left(\dfrac{81}{16}\right)^{\frac{3}{4}} = \left(\dfrac{3}{2}\right)^{3} = \dfrac{27}{8}`);
  WV(C, m10, V(r`\left(\dfrac{16}{81}\right)^{-\frac{3}{4}}`));
});

const m11 = [r`9`, r`\dfrac{486}{5}`, r`27`, r`\dfrac{1}{9}`];
Q('m11', mk.mcq({ stem: r`A square mat has side $\sqrt[5]{243^{2}}$ units. The side of the mat is`, opts: O(m11), key: 'a', sol: r`$\sqrt[5]{243^{2}} = 243^{\frac{2}{5}}$. Since $243 = 3^{5}$, the fifth root is $3$, and $3^{2} = 9$. The side is $9$ units.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => {
  chain(r`\sqrt[5]{243^{2}} = 243^{\frac{2}{5}} = (3^{5})^{\frac{2}{5}} = 3^{2} = 9`);
  WV(C, m11, V(r`\sqrt[5]{243^{2}}`));
});

Q('m12', mk.mcq({ stem: r`Amit evaluates $64^{\frac{2}{3}}$ as $\dfrac{64^{2}}{3}$ and gets $\dfrac{4096}{3}$. Which statement about his work is correct?`, opts: ['He is right: a fractional index means "raise to the power, then divide by the denominator".', 'He is wrong: the denominator $3$ means a cube root, so $64^{\\frac{2}{3}} = \\left(\\sqrt[3]{64}\\right)^{2} = 16$.', 'He is wrong: the correct value is $64^{2} \\times 3 = 12288$.', 'He is wrong: the numerator $2$ is the root, so the value is $\\sqrt{64^{3}} = 512$.'], key: 'b', sol: r`In $a^{\frac{p}{q}}$ the denominator $q$ is the root and the numerator $p$ is the power. So $64^{\frac{2}{3}} = (\sqrt[3]{64})^{2} = 4^{2} = 16$. Amit's $\dfrac{4096}{3}$ is not even close, and $512 = \sqrt{64^{3}}$ is the value of $64^{\frac{3}{2}}$, with the roles of $2$ and $3$ swapped.`, d: 3, c: 'analysis', t: [2], time: 90 }), (C) => {
  C.assert(V(r`64^{\frac{2}{3}}`).eq(R(16)) && !V(r`64^{\frac{2}{3}}`).eq(V(r`\dfrac{64^{2}}{3}`)) && V(r`\sqrt{64^{3}}`).eq(R(512)) && V(r`64^{\frac{3}{2}}`).eq(R(512)) && V(r`64^{2} \times 3`).eq(R(12288)), '64^(2/3) = 16; the other claims are false');
  C.key('b');
});

const m13 = [r`8 \times 2^{n}`, r`2^{n} + 8`, r`2^{3n}`, r`8n`];
Q('m13', mk.mcq({ stem: r`A game board has $2^{n+3}$ squares at level $n$. This number is equal to`, opts: O(m13), key: 'a', sol: r`By the product law, $2^{n+3} = 2^{n} \times 2^{3} = 8 \times 2^{n}$. For $n = 2$ the board has $2^{5} = 32$ squares, and $8 \times 2^{2} = 32$ too; but $2^{n} + 8 = 12$, $2^{3n} = 64$ and $8n = 16$ are different.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => {
  const S = ns(1, 2, 3, 4, 5);
  C.which(m13.map((o) => holds(r`2^{n+3}`, o, S)), true);
  C.assert(V(r`2^{n+3}`, { n: 2 }).eq(R(32)) && V(r`2^{n} + 8`, { n: 2 }).eq(R(12)) && V(r`2^{3n}`, { n: 2 }).eq(R(64)) && V(r`8n`, { n: 2 }).eq(R(16)), 'n = 2 values');
});

const m14 = [r`6`, r`3`, r`9`, r`\dfrac{1}{3}`];
Q('m14', mk.mcq({ stem: r`Two investment plans are worth $3^{n+2}$ units and $3^{n+1}$ units after $n$ years. The difference of their values, divided by $3^{n}$, is`, opts: O(m14), key: 'a', sol: r`Take $3^{n}$ out as a common factor: $3^{n+2} - 3^{n+1} = 3^{n}(3^{2} - 3^{1}) = 3^{n} \times 6$. Dividing by $3^{n}$ leaves $6$, for every $n$.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => {
  const S = ns(0, 1, 2, 3, 4, 5, 6);
  C.assert(S.every((e) => V(r`\dfrac{3^{n+2} - 3^{n+1}}{3^{n}}`, e).eq(R(6))), 'value 6 for n = 0..6');
  WV(C, m14, V(r`\dfrac{3^{n+2} - 3^{n+1}}{3^{n}}`, { n: 3 }));
});

const m15 = [5, 3, 1, 15];
Q('m15', mk.mcq({ stem: r`The number of tiles at stage $x$ of a pattern is $5^{x-2}$. The pattern has $125$ tiles at stage`, opts: O(m15.map(String)), key: 'a', sol: r`Write $125 = 5^{3}$. Then $5^{x-2} = 5^{3}$, and equal powers of the same base ($5 > 1$) have equal indices, so $x - 2 = 3$ and $x = 5$. Check: $5^{5-2} = 5^{3} = 125$. The value $3$ forgets to add the $2$.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => {
  const x = solveExp(r`5^{x-2}`, r`125`, 5);
  C.which(m15, x.num());
});

const m16 = [r`-\dfrac{5}{2}`, r`\dfrac{5}{2}`, r`-5`, r`-\dfrac{5}{3}`];
Q('m16', mk.mcq({ stem: r`The brightness of a lamp after $x$ dimming steps is $9^{x}$ units, and it is required to equal $\dfrac{1}{243}$ units. Then $x$ equals`, opts: O(m16), key: 'a', sol: r`Write both sides with base $3$: $9^{x} = 3^{2x}$ and $\dfrac{1}{243} = 3^{-5}$. So $2x = -5$ and $x = -\dfrac{5}{2}$. A positive base raised to any power stays positive, so a fraction such as $\dfrac{1}{243}$ needs a negative index.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => {
  const x = solveExp(r`9^{x}`, r`\dfrac{1}{243}`, [-5, 2], { skipSamples: true });
  C.assert(V(r`9^{x}`, { x: -2 }).eq(R(1, 81)) && V(r`9^{x}`, { x: -3 }).eq(R(1, 729)), 'between 9^-2 and 9^-3, increasing in x');
  C.assert(V(r`9^{x}`, { x: R(-5, 2).add(R(0)) }).eq(V(r`3^{-5}`)) , '9^(-5/2) = 3^-5');
  WV(C, m16, x);
});

const m17 = [4, 3, 5, 8];
Q('m17', mk.mcq({ stem: r`Two colonies hold $2^{x}$ thousand and $2^{x+3}$ thousand bacteria. Together they hold $144$ thousand. Then $x$ equals`, opts: O(m17.map(String)), key: 'a', sol: r`$2^{x} + 2^{x+3} = 2^{x}(1 + 8) = 9 \times 2^{x}$. So $9 \times 2^{x} = 144$ gives $2^{x} = 16 = 2^{4}$, and $x = 4$. Check: $16 + 128 = 144$.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => {
  const x = solveExp(r`2^{x} + 2^{x+3}`, r`144`, 4);
  C.which(m17, x.num());
});

Q('m18', mk.mcq({ stem: r`Four equations are written on a board. Exactly one of them has no real solution. Which one is it?`, opts: O([r`2^{x} = -8`, r`2^{x} = \dfrac{1}{8}`, r`2^{x} = 1`, r`2^{x} = 8`]), key: 'a', sol: r`A positive base raised to a real power is always positive, so $2^{x}$ can never equal $-8$. The other three have the solutions $x = -3$, $x = 0$ and $x = 3$.`, d: 2, c: 'analysis', t: [3], time: 75 }), (C) => {
  C.assert([-10, -5, -1, 0, 1, 5, 10].every((k) => V(r`2^{x}`, { x: k }).sign > 0), '2^x > 0 at every sample, and 2^x is increasing: it never reaches -8');
  const roots = [[r`\dfrac{1}{8}`, -3], [r`1`, 0], [r`8`, 3]].map(([rhs, x]) => solveExp(r`2^{x}`, rhs, x).num());
  C.assert(roots.join() === '-3,0,3', 'roots -3, 0, 3');
  C.key('a');
}, 'Positivity of 2^x is asserted at sample points and the three roots by substitution; the key rests on the fact that a positive base never gives a negative power.');

const m19 = [36, 6, 324, 144];
Q('m19', mk.mcq({ stem: r`The side of a square park, $x$ metres, satisfies $x^{\frac{3}{2}} = 216$. Then $x$ equals`, opts: O(m19.map(String)), key: 'a', sol: r`Raise both sides to the power $\dfrac{2}{3}$: $x = 216^{\frac{2}{3}}$. The cube root of $216$ is $6$, and $6^{2} = 36$. Check: $36^{\frac{3}{2}} = 6^{3} = 216$. The value $6$ stops after the cube root, and $324$ and $144$ multiply $216$ by $\dfrac{3}{2}$ or $\dfrac{2}{3}$.`, d: 4, c: 'analysis', t: [3], time: 105 }), (C) => {
  chain(r`36^{\frac{3}{2}} = 6^{3} = 216`);
  chain(r`216^{\frac{2}{3}} = 6^{2} = 36`);
  C.which(m19.map((o) => eqv(r`x^{\frac{3}{2}}`, r`216`, { x: o })), true);
  C.assert(V(r`216 \times \dfrac{3}{2}`).eq(R(324)) && V(r`216 \times \dfrac{2}{3}`).eq(R(144)), '324 and 144 are the slips');
});

const m20 = [r`a^{7}b^{-7}`, r`a^{5}b^{-1}`, r`a^{5}b^{-7}`, r`a^{7}b^{-1}`];
Q('m20', mk.mcq({ stem: r`A formula for the output of a machine reduces to $\dfrac{(a^{3}b^{-2})^{2}}{a^{-1}b^{3}}$. In simplest form it is`, opts: O(m20), key: 'a', sol: r`Numerator: $(a^{3}b^{-2})^{2} = a^{6}b^{-4}$. Dividing by $a^{-1}b^{3}$ subtracts the indices: $a^{6-(-1)}b^{-4-3} = a^{7}b^{-7}$. The slip $a^{5}$ comes from $6 - 1$ instead of $6 + 1$.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => {
  chain(r`(a^{3}b^{-2})^{2} = a^{6}b^{-4}`);
  chain(r`\dfrac{a^{6}b^{-4}}{a^{-1}b^{3}} = a^{7}b^{-7}`);
  C.which(m20.map(poly), poly(r`\dfrac{(a^{3}b^{-2})^{2}}{a^{-1}b^{3}}`));
});

const m21 = [[r`2^{5} \times 2^{4}`, r`2^{9}`], [r`(3^{2})^{4}`, r`3^{8}`], [r`5^{6} \div 5^{2}`, r`5^{3}`], [r`(2 \times 3)^{3}`, r`2^{3} \times 3^{3}`]];
Q('m21', mk.mcq({ stem: r`Exactly one of the following four statements is false. Which one is it?`, opts: m21.map(([l, rr]) => `$${l} = ${rr}$`), key: 'c', sol: r`$2^{5} \times 2^{4} = 2^{9}$ (indices add), $(3^{2})^{4} = 3^{8}$ (indices multiply) and $(2 \times 3)^{3} = 2^{3} \times 3^{3}$ (the power goes to each factor) are all true. But $5^{6} \div 5^{2} = 5^{6-2} = 5^{4}$, not $5^{3}$, so this statement is false.`, d: 3, c: 'analysis', t: [1], time: 90 }), (C) => {
  C.which(m21.map(([l, rr]) => eqv(l, rr)), false);
  C.assert(V(r`5^{6} \div 5^{2}`).eq(V(r`5^{4}`)), '5^6 / 5^2 = 5^4');
});

const m22 = [128, 56, 1016, 4];
Q('m22', mk.mcq({ stem: r`If $2^{m} = 32$ and $2^{n} = 8$, then $2^{2m-n}$ is equal to`, opts: O(m22.map(String)), key: 'a', sol: r`$32 = 2^{5}$ and $8 = 2^{3}$, so $m = 5$ and $n = 3$. Then $2m - n = 7$ and $2^{7} = 128$. (Without finding $m$ and $n$: $2^{2m-n} = \dfrac{(2^{m})^{2}}{2^{n}} = \dfrac{32^{2}}{8} = 128$.) The value $56$ is $2 \times 32 - 8$, which treats the indices as numbers instead of powers.`, d: 3, c: 'analysis', t: [1, 3], time: 105 }), (C) => {
  const m = [...Array(12).keys()].find((k) => V(`2^{${k}}`).eq(R(32)));
  const n = [...Array(12).keys()].find((k) => V(`2^{${k}}`).eq(R(8)));
  C.assert(m === 5 && n === 3 && V(r`2^{2m-n}`, { m, n }).eq(R(128)) && V(r`\dfrac{32^{2}}{8}`).eq(R(128)), 'm = 5, n = 3, value 128');
  C.assert(2 * 32 - 8 === 56 && 32 * 32 - 8 === 1016, 'distractors are the slips');
  C.which(m22, 128);
});

// =============================================================== assertion-reason (ICSE 2027 specimen order a b c d)
Q('ar1', mk.ar({ a: r`$9^{\frac{3}{2}} = 27$.`, r: r`In $a^{\frac{p}{q}}$, the number $p$ tells the root and $q$ tells the power.`, key: 'a', sol: r`$9^{\frac{1}{2}} = 3$ and $3^{3} = 27$, so A is true. R has the roles reversed: in $a^{\frac{p}{q}}$ the denominator $q$ is the root and the numerator $p$ is the power. So R is false. Option (a).`, d: 2, c: 'understanding', t: [2] }), (C) => {
  C.assert(V(r`9^{\frac{3}{2}}`).eq(R(27)), 'A: 9^(3/2) = 27');
  let rReading = true;
  try { V(r`\sqrt[3]{9^{2}}`); } catch { rReading = false; }
  C.assert(!rReading, 'R reading (p-th root of a^q = cube root of 81) is not even an exact number: R is false');
  C.key('a');
});
Q('ar2', mk.ar({ a: r`$2^{3} \times 2^{4} = 2^{12}$.`, r: r`For $a > 0$, $a^{m} \times a^{n} = a^{m+n}$.`, key: 'b', sol: r`By R, $2^{3} \times 2^{4} = 2^{7} = 128$, not $2^{12} = 4096$, so A is false. R is the product law, which is true. Option (b).`, d: 2, c: 'understanding', t: [1] }), (C) => {
  C.assert(!eqv(r`2^{3} \times 2^{4}`, r`2^{12}`) && eqv(r`2^{3} \times 2^{4}`, r`2^{7}`) && holds(r`a^{m} \times a^{n}`, r`a^{m+n}`, [{ a: 3, m: 2, n: 4 }, { a: 7, m: 1, n: 3 }]), 'A false, R true');
  C.key('b');
});
Q('ar3', mk.ar({ a: r`$\left(\dfrac{2}{5}\right)^{-3} = \dfrac{125}{8}$.`, r: r`For $a \ne 0$, $a^{-n} = \dfrac{1}{a^{n}}$.`, key: 'c', sol: r`By R, $\left(\dfrac{2}{5}\right)^{-3} = \dfrac{1}{\left(\frac{2}{5}\right)^{3}} = \dfrac{1}{\frac{8}{125}} = \dfrac{125}{8}$, so A is true. R is the definition of a negative index, and it is exactly the rule used to get A. Option (c).`, d: 3, c: 'application', t: [2] }), (C) => {
  chain(r`\left(\dfrac{2}{5}\right)^{-3} = \dfrac{1}{\left(\dfrac{2}{5}\right)^{3}} = \dfrac{1}{\dfrac{8}{125}} = \dfrac{125}{8}`);
  C.assert(holds(r`a^{-n}`, r`\dfrac{1}{a^{n}}`, [{ a: 3, n: 2 }, { a: [2, 5], n: 3 }, { a: 10, n: 4 }]), 'R is a true rule');
  C.key('c');
});
Q('ar4', mk.ar({ a: r`The equation $3^{x} = \dfrac{1}{81}$ has the solution $x = -4$.`, r: r`The number $3^{x}$ is positive for every real number $x$.`, key: 'd', sol: r`$\dfrac{1}{81} = 3^{-4}$, so $x = -4$ and A is true. R is also true. But R does not explain the solution: $x = -4$ comes from writing $\dfrac{1}{81}$ as $3^{-4}$ and equating the indices, and positivity only tells us that a solution can exist. Option (d).`, d: 3, c: 'analysis', t: [3] }), (C) => {
  solveExp(r`3^{x}`, r`\dfrac{1}{81}`, -4);
  C.assert([-8, -4, 0, 4, 8].every((k) => V(r`3^{x}`, { x: k }).sign > 0), 'R true at the samples');
  C.key('d');
});
Q('ar5', mk.ar({ a: r`$x^{0} = 1$ for every real number $x$.`, r: r`For $x \ne 0$, $x^{0} = x^{n} \div x^{n} = 1$.`, key: 'b', sol: r`R is true: by the quotient law $x^{n} \div x^{n} = x^{n-n} = x^{0}$, and the quotient is $1$. But $x^{0} = 1$ is only shown for $x \ne 0$; for $x = 0$ the division $0^{n} \div 0^{n}$ is not allowed, so A, which says "every real number", is false. Option (b).`, d: 3, c: 'understanding', t: [2] }), (C) => {
  let zeroOk = true;
  try { V(r`0^{n} \div 0^{n}`, { n: 3 }); } catch { zeroOk = false; }
  C.assert(!zeroOk && [2, 9, 40].every((x) => V(r`x^{3} \div x^{3}`, { x }).eq(R(1)) && V(r`x^{0}`, { x }).eq(R(1))), 'x^0 = 1 is shown for non-zero x only');
  C.key('b');
});

// =============================================================== true / false
Q('tf1', mk.tf({ stem: r`Rahul writes $(4^{3})^{2} = 4^{5}$.`, key: 'f', sol: r`A power of a power multiplies the indices: $(4^{3})^{2} = 4^{6} = 4096$. The statement $4^{5} = 1024$ adds the indices instead. So the statement is false.`, d: 1, c: 'understanding', t: [1] }), (C) => {
  C.assert(V(r`(4^{3})^{2}`).eq(R(4096)) && !eqv(r`(4^{3})^{2}`, r`4^{5}`) && eqv(r`(4^{3})^{2}`, r`4^{6}`), '(4^3)^2 = 4^6 = 4096, not 4^5');
  C.key('f');
});
Q('tf2', mk.tf({ stem: r`The value of $(-3)^{-2}$ is a positive number.`, key: 't', sol: r`$(-3)^{-2} = \dfrac{1}{(-3)^{2}} = \dfrac{1}{9}$. An even power of a negative number is positive, and the negative index only takes the reciprocal. So the statement is true.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  const v = V(r`(-3)^{-2}`);
  C.assert(v.eq(R(1, 9)) && v.sign > 0, '(-3)^-2 = 1/9 > 0');
  C.key('t');
});
Q('tf3', mk.tf({ stem: r`If $a^{x} = a^{y}$ for a positive number $a$, then $x = y$.`, key: 'f', sol: r`The rule needs $a \ne 1$ as well. For $a = 1$, $1^{3} = 1^{5}$ (both are $1$) but $3 \ne 5$. For every positive $a$ other than $1$ the rule is true, for example $2^{x} = 2^{y}$ forces $x = y$. As stated, the claim is false.`, d: 3, c: 'analysis', t: [3] }), (C) => {
  C.assert(V(r`1^{3}`).eq(V(r`1^{5}`)) && 3 !== 5, 'a = 1 is a counter-example');
  C.assert([2, 3, 5].every((a) => { const vals = [-3, -2, -1, 0, 1, 2, 3].map((k) => String(V(r`a^{k}`, { a, k }))); return new Set(vals).size === vals.length; }), 'for a = 2, 3, 5 the powers are all different');
  C.key('f');
});
Q('tf4', mk.tf({ stem: r`Leela states that $49^{\frac{3}{2}} = 343$.`, key: 't', sol: r`The square root of $49$ is $7$, and $7^{3} = 343$. So $49^{\frac{3}{2}} = 343$ and Leela is right.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  chain(r`49^{\frac{3}{2}} = 7^{3} = 343`);
  C.key('t');
});
Q('tf5', mk.tf({ stem: r`For every positive number $a$, the product $a^{-\frac{1}{3}} \times a^{\frac{1}{3}}$ is equal to $0$.`, key: 'f', sol: r`The indices add: $-\dfrac{1}{3} + \dfrac{1}{3} = 0$, so the product is $a^{0} = 1$, not $0$. For example $8^{-\frac{1}{3}} \times 8^{\frac{1}{3}} = \dfrac{1}{2} \times 2 = 1$.`, d: 2, c: 'understanding', t: [1, 2] }), (C) => {
  C.assert([8, 27, 125].every((a) => V(r`a^{-\frac{1}{3}} \times a^{\frac{1}{3}}`, { a }).eq(R(1))), 'the product is 1');
  C.key('f');
});

// =============================================================== fill in the blanks
Q('fb1', mk.fill({ stem: r`Written without brackets or negative indices, $(0.5)^{-4}$ equals ____.`, acc: [['16']], sol: r`$0.5 = \dfrac{1}{2}$, so $(0.5)^{-4} = \left(\dfrac{1}{2}\right)^{-4} = 2^{4} = 16$.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  chain(r`(0.5)^{-4} = \left(\dfrac{1}{2}\right)^{-4} = 2^{4} = 16`);
  C.blank(16);
});
Q('fb2', mk.fill({ stem: r`If $2^{x} = \dfrac{1}{128}$, then $x = $ ____.`, acc: [['-7', '−7']], sol: r`$128 = 2^{7}$, so $\dfrac{1}{128} = 2^{-7}$. Equal powers of the same base have equal indices, so $x = -7$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const x = solveExp(r`2^{x}`, r`\dfrac{1}{128}`, -7);
  C.blank(x.num());
});
Q('fb3', mk.fill({ stem: r`$\dfrac{7^{9} \times 7^{-4}}{7^{3}} = 7^{k}$. Then $k = $ ____.`, acc: [['2']], sol: r`In the numerator the indices add: $9 + (-4) = 5$. Dividing by $7^{3}$ subtracts $3$: $5 - 3 = 2$. So $k = 2$.`, d: 2, c: 'understanding', t: [1, 2] }), (C) => {
  chain(r`\dfrac{7^{9} \times 7^{-4}}{7^{3}} = 7^{5-3} = 7^{2}`);
  const k = [...Array(10).keys()].find((j) => V(`7^{${j}}`).eq(V(r`\dfrac{7^{9} \times 7^{-4}}{7^{3}}`)));
  C.blank(k);
});
Q('fb4', mk.fill({ stem: r`The value of $1296^{\frac{3}{4}}$ is ____.`, acc: [['216']], sol: r`$1296 = 6^{4}$, so the fourth root of $1296$ is $6$. Then $6^{3} = 216$.`, d: 3, c: 'understanding', t: [2] }), (C) => {
  chain(r`1296^{\frac{3}{4}} = (6^{4})^{\frac{3}{4}} = 6^{3} = 216`);
  C.blank(216);
});
Q('fb5', mk.fill({ stem: r`Given that $x > 0$ and $x^{-\frac{3}{2}} = \dfrac{1}{125}$, the value of $x$ is ____.`, acc: [['25']], sol: r`Take reciprocals: $x^{\frac{3}{2}} = 125 = 5^{3}$. Raise both sides to the power $\dfrac{2}{3}$: $x = 5^{2} = 25$. Check: $25^{-\frac{3}{2}} = \dfrac{1}{5^{3}} = \dfrac{1}{125}$.`, d: 4, c: 'application', t: [2, 3] }), (C) => {
  C.assert(V(r`x^{-\frac{3}{2}}`, { x: 25 }).eq(R(1, 125)), '25^(-3/2) = 1/125');
  C.assert(V(r`x^{\frac{3}{2}}`, { x: 25 }).eq(R(125)), 'x^(3/2) is increasing for x > 0 and equals 125 at 25 only');
  C.blank(25);
});

// =============================================================== numerical
Q('n01', mk.num({ stem: r`If $3^{x+1} \times 9^{x-2} = 19683$, find $x$.`, value: 4, sol: r`Write $9 = 3^{2}$ and $19683 = 3^{9}$. Then $3^{x+1} \times 3^{2x-4} = 3^{3x-3} = 3^{9}$, so $3x - 3 = 9$ and $x = 4$. Check: $3^{5} \times 9^{2} = 243 \times 81 = 19683$.`, scheme: [['Both sides over base 3: 3 to the (3x - 3) equals 3 to the 9', 0.5], ['3x - 3 = 9, so x = 4', 0.5]], d: 3, c: 'application', t: [3], time: 105 }), (C) => {
  chain(r`3^{x+1} \times 9^{x-2} = 3^{x+1} \times 3^{2x-4} = 3^{3x-3}`, { x: 4 });
  const x = solveExp(r`3^{x+1} \times 9^{x-2}`, r`19683`, 4);
  C.assert(V(r`3^{9}`).eq(R(19683)) && V(r`3^{5} \times 9^{2}`).eq(R(19683)), '19683 = 3^9 = 243 x 81');
  C.val(x.num());
});
Q('n02', mk.num({ stem: r`Find the value of $(0.04)^{-\frac{3}{2}}$.`, value: 125, sol: r`$0.04 = \dfrac{1}{25}$, so $(0.04)^{-\frac{3}{2}} = 25^{\frac{3}{2}}$. The square root of $25$ is $5$, and $5^{3} = 125$.`, scheme: [['0.04 = 1/25 and the negative index gives 25 to the 3/2', 0.5], ['5 cubed = 125', 0.5]], d: 3, c: 'understanding', t: [2], time: 90 }), (C) => {
  chain(r`(0.04)^{-\frac{3}{2}} = 25^{\frac{3}{2}} = 5^{3} = 125`);
  C.val(V(r`(0.04)^{-\frac{3}{2}}`).num());
});
Q('n03', mk.num({ stem: r`Ishan's yeast culture begins with $5$ cells, and the number of cells becomes three times as large every hour. How many more cells does it have after $6$ hours than after $4$ hours?`, value: 3240, sol: r`After $n$ hours there are $5 \times 3^{n}$ cells. After $6$ hours: $5 \times 729 = 3645$. After $4$ hours: $5 \times 81 = 405$. The difference is $3645 - 405 = 3240$ cells.`, scheme: [['5 x 3^6 = 3645 and 5 x 3^4 = 405', 0.5], ['Difference 3240', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (C) => {
  let cells = 5; const at = [cells];
  for (let h = 1; h <= 6; h++) { cells *= 3; at.push(cells); }
  C.assert(at[6] === 3645 && at[4] === 405 && V(r`5 \times 3^{6}`).eq(R(3645)) && V(r`5 \times 3^{4}`).eq(R(405)), '3645 and 405');
  C.val(at[6] - at[4]);
});
Q('n04', mk.num({ stem: r`Find the value of $\dfrac{6^{4} \times 10^{3}}{15^{2} \times 4}$.`, value: 1440, sol: r`In prime powers: $6^{4} = 2^{4} \times 3^{4}$, $10^{3} = 2^{3} \times 5^{3}$, $15^{2} = 3^{2} \times 5^{2}$ and $4 = 2^{2}$. The quotient is $2^{4+3-2} \times 3^{4-2} \times 5^{3-2} = 2^{5} \times 3^{2} \times 5 = 32 \times 9 \times 5 = 1440$.`, scheme: [['All numbers in prime powers', 0.5], ['2^5 x 3^2 x 5 = 1440', 0.5]], d: 4, c: 'application', t: [1, 3], time: 120 }), (C) => {
  const x = chain(r`\dfrac{6^{4} \times 10^{3}}{15^{2} \times 4} = 2^{5} \times 3^{2} \times 5 = 1440`).value;
  C.val(x.num());
});
Q('n05', mk.num({ stem: r`A sheet of paper is $0.1$ mm thick, and each fold doubles the thickness. What is the smallest number of folds after which the folded sheet is thicker than $1$ metre?`, value: 14, marks: 2, sol: r`After $k$ folds the thickness is $0.1 \times 2^{k}$ mm, and $1$ metre is $1000$ mm, so we need $2^{k} > 10000$. Now $2^{13} = 8192$ gives only $819.2$ mm, while $2^{14} = 16384$ gives $1638.4$ mm. So $k = 14$ folds.`, scheme: [['Thickness 0.1 x 2^k mm against 1000 mm, so 2^k > 10000', 1], ['2^13 = 8192 is too small and 2^14 = 16384 works, so 14', 1]], d: 3, c: 'application', t: [1, 3], time: 120 }), (C) => {
  let k = 0, t = 1n; // thickness in tenths of a millimetre
  while (t <= 10000n) { t *= 2n; k++; }
  C.assert(k === 14 && V(r`2^{13}`).eq(R(8192)) && V(r`2^{14}`).eq(R(16384)) && V(r`0.1 \times 2^{13}`).eq(R(8192, 10)) && V(r`0.1 \times 2^{14}`).eq(R(16384, 10)), '14 folds');
  C.val(k);
});
Q('n06', mk.num({ stem: r`Solve $8^{x+2} = 32^{x-1}$.`, value: 5.5, marks: 2, sol: r`Write both sides as powers of $2$: $8^{x+2} = 2^{3(x+2)} = 2^{3x+6}$ and $32^{x-1} = 2^{5(x-1)} = 2^{5x-5}$. Equate the indices: $3x + 6 = 5x - 5$, so $2x = 11$ and $x = \dfrac{11}{2} = 5.5$.`, scheme: [['Common base 2: indices 3x + 6 and 5x - 5', 1], ['3x + 6 = 5x - 5, so x = 11/2 = 5.5', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => {
  C.assert([0, 1, 2, 3, 4].every((k) => eqv(r`8^{x+2}`, r`2^{3x+6}`, { x: k }) && eqv(r`32^{x-1}`, r`2^{5x-5}`, { x: k })), 'the common-base rewriting is exact');
  const x = linRoot(3, 6, 5, -5);
  C.val(x.num());
});
Q('n07', mk.num({ stem: r`If $3^{12} = 9^{y} = 27^{z}$, find $y + z$.`, value: 10, marks: 2, sol: r`$9^{y} = 3^{2y}$, so $2y = 12$ and $y = 6$. $27^{z} = 3^{3z}$, so $3z = 12$ and $z = 4$. Hence $y + z = 6 + 4 = 10$.`, scheme: [['y = 6 from 3 to the 2y = 3 to the 12', 1], ['z = 4, so y + z = 10', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => {
  const y = [...Array(30).keys()].find((k) => V(`9^{${k}}`).eq(V(r`3^{12}`)));
  const z = [...Array(30).keys()].find((k) => V(`27^{${k}}`).eq(V(r`3^{12}`)));
  C.assert(y === 6 && z === 4, 'y = 6, z = 4');
  C.val(y + z);
});

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`A memory sector holds $2^{9}$ bytes and a block has $2^{4}$ sectors. How many whole blocks are there in a file of $2^{22}$ bytes? Give the answer as a power of $2$ and as a number.`, model: r`A block holds $2^{9} \times 2^{4} = 2^{13}$ bytes.

Blocks $= 2^{22} \div 2^{13} = 2^{9} = 512$.`, sol: r`Multiplying powers of $2$ adds the indices, and dividing subtracts them.`, scheme: [['Block size 2^9 x 2^4 = 2^13 bytes', 1], ['2^22 / 2^13 = 2^9 = 512 blocks', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => {
  chain(r`2^{9} \times 2^{4} = 2^{13}`);
  chain(r`2^{22} \div 2^{13} = 2^{9} = 512`);
  C.model([13, 9, 512]);
});
Q('s202', mk.short({ marks: 2, stem: r`A coding exercise reduces a size formula to $\dfrac{(7^{2})^{5} \times 7^{3}}{7^{9}}$. Simplify it to a single power of $7$ and find its value.`, model: r`$\dfrac{(7^{2})^{5} \times 7^{3}}{7^{9}} = \dfrac{7^{10} \times 7^{3}}{7^{9}} = 7^{10+3-9} = 7^{4} = 2401$.`, sol: r`Multiply the indices in the bracket, add them in the product and subtract them in the quotient.`, scheme: [['(7^2)^5 = 7^10, then index 10 + 3 - 9 = 4', 1], ['7^4 = 2401', 1]], d: 2, c: 'understanding', t: [1], time: 105 }), (C) => {
  chain(r`\dfrac{(7^{2})^{5} \times 7^{3}}{7^{9}} = \dfrac{7^{10} \times 7^{3}}{7^{9}} = 7^{10+3-9} = 7^{4} = 2401`);
  C.model([10, 4, 2401]);
});
Q('s203', mk.short({ marks: 2, stem: r`A designer's scaling factor is $\left(\dfrac{8}{125}\right)^{-\frac{2}{3}}$. Evaluate it.`, model: r`$\left(\dfrac{8}{125}\right)^{-\frac{2}{3}} = \left(\dfrac{125}{8}\right)^{\frac{2}{3}} = \left(\dfrac{5}{2}\right)^{2} = \dfrac{25}{4}$.`, sol: r`The negative index flips the fraction; the denominator $3$ is a cube root and the numerator $2$ is the power.`, scheme: [['Flip the fraction: (125/8) to the 2/3', 1], ['Cube root 5/2, squared: 25/4', 1]], d: 2, c: 'understanding', t: [2], time: 105 }), (C) => {
  chain(r`\left(\dfrac{8}{125}\right)^{-\frac{2}{3}} = \left(\dfrac{125}{8}\right)^{\frac{2}{3}} = \left(\dfrac{5}{2}\right)^{2} = \dfrac{25}{4}`);
  C.model([25, 4]);
});
Q('s204', mk.short({ marks: 2, stem: r`Three pieces of ribbon measure $2^{-3}$ m, $4^{-1}$ m and $8^{0}$ m. Find their total length in metres.`, model: r`$2^{-3} = \dfrac{1}{8}$, $4^{-1} = \dfrac{1}{4}$ and $8^{0} = 1$.

Total $= \dfrac{1}{8} + \dfrac{1}{4} + 1 = \dfrac{1 + 2 + 8}{8} = \dfrac{11}{8}$ m.`, sol: r`A negative index gives a reciprocal and a zero index gives $1$.`, scheme: [['Values 1/8, 1/4 and 1', 1], ['Sum 11/8 m', 1]], d: 2, c: 'understanding', t: [2], time: 105 }), (C) => {
  chain(r`2^{-3} + 4^{-1} + 8^{0} = \dfrac{1}{8} + \dfrac{1}{4} + 1 = \dfrac{11}{8}`);
  C.model([8, 4, 11]);
});
Q('s205', mk.short({ marks: 2, stem: r`Solve the equation $3^{2x-1} = \dfrac{1}{243}$.`, model: r`$243 = 3^{5}$, so $\dfrac{1}{243} = 3^{-5}$.

Then $3^{2x-1} = 3^{-5}$, so $2x - 1 = -5$ and $x = -2$.`, sol: r`Write both sides as powers of $3$ and equate the indices. Check: $3^{2(-2)-1} = 3^{-5} = \dfrac{1}{243}$.`, scheme: [['1/243 = 3^-5 and 3^(2x-1) = 3^-5', 1], ['2x - 1 = -5, so x = -2', 1]], d: 3, c: 'application', t: [3], time: 105 }), (C) => {
  const x = solveExp(r`3^{2x-1}`, r`\dfrac{1}{243}`, -2);
  C.assert(x.eq(linRoot(2, -1, 0, -5)), 'linear equation 2x - 1 = -5 gives -2');
  C.model([5, -2]);
});
Q('s206', mk.short({ marks: 2, stem: r`A shop's sales on two days are $7^{x}$ and $7^{x+1}$ hundred rupees, and the two days together bring $2744$ hundred rupees. Find $x$.`, model: r`$7^{x} + 7^{x+1} = 7^{x}(1 + 7) = 8 \times 7^{x} = 2744$, so $7^{x} = 343 = 7^{3}$ and $x = 3$.`, sol: r`Take the common factor $7^{x}$ and use $7^{x+1} = 7 \times 7^{x}$. Check: $343 + 2401 = 2744$.`, scheme: [['Factor: 8 x 7^x = 2744, so 7^x = 343', 1], ['343 = 7^3, so x = 3', 1]], d: 3, c: 'application', t: [3], time: 105 }), (C) => {
  const x = solveExp(r`7^{x} + 7^{x+1}`, r`2744`, 3);
  C.assert(2744 / 8 === 343 && V(r`7^{3}`).eq(R(343)), '2744 / 8 = 343 = 7^3');
  C.model([343, x.num()]);
});
Q('s207', mk.short({ marks: 2, stem: r`Kabir solves $4^{x} = 8^{x-2}$ by writing "$x = x - 2$, so there is no solution". Explain his mistake and solve the equation correctly.`, model: r`Mistake: indices can be equated only when the bases are the same, and here the bases $4$ and $8$ differ.

Correct: $4^{x} = 2^{2x}$ and $8^{x-2} = 2^{3x-6}$, so $2x = 3x - 6$ and $x = 6$.`, sol: r`Both $4$ and $8$ are powers of $2$. Check: $4^{6} = 4096$ and $8^{4} = 4096$.`, scheme: [['Bases 4 and 8 are different, so the indices cannot be equated', 1], ['2x = 3x - 6, so x = 6', 1]], d: 3, c: 'analysis', t: [3], time: 120 }), (C) => {
  const x = linRoot(2, 0, 3, -6);
  C.assert(x.eq(R(6)) && V(r`4^{6}`).eq(V(r`8^{4}`)) && V(r`4^{6}`).eq(R(4096)), 'x = 6: 4^6 = 8^4 = 4096');
  C.assert(!V(r`4^{x}`, { x: 3 }).eq(V(r`8^{x-2}`, { x: 3 })) && [1, 2, 3, 4].every((k) => !V(r`4^{x}`, { x: k }).eq(V(r`8^{x-2}`, { x: k }))), 'Kabir\'s equation x = x - 2 has no solution, but the original equation does');
  C.model([6]);
});

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Simplify $\dfrac{(6^{2})^{3} \times 10^{4}}{15^{3} \times 8}$ and find its value.`, model: r`In prime powers: $(6^{2})^{3} = 2^{6} \times 3^{6}$, $10^{4} = 2^{4} \times 5^{4}$, $15^{3} = 3^{3} \times 5^{3}$ and $8 = 2^{3}$.

$\dfrac{2^{6} \times 3^{6} \times 2^{4} \times 5^{4}}{3^{3} \times 5^{3} \times 2^{3}} = 2^{7} \times 3^{3} \times 5 = 128 \times 27 \times 5 = 17280$.`, sol: r`Collect the powers of each prime: $2^{6+4-3}$, $3^{6-3}$ and $5^{4-3}$.`, scheme: [['Every number written in prime powers', 1], ['Indices combined: 2^7 x 3^3 x 5', 1], ['Value 17280', 1]], d: 3, c: 'application', t: [1, 3], time: 150 }), (C) => {
  chain(r`\dfrac{(6^{2})^{3} \times 10^{4}}{15^{3} \times 8} = \dfrac{2^{6} \times 3^{6} \times 2^{4} \times 5^{4}}{3^{3} \times 5^{3} \times 2^{3}} = 2^{7} \times 3^{3} \times 5 = 128 \times 27 \times 5 = 17280`);
  C.model([7, 3, 17280]);
});
Q('s302', mk.short({ marks: 3, stem: r`Evaluate $\left(\dfrac{1}{32}\right)^{-\frac{2}{5}} \times 125^{-\frac{1}{3}} \times 16^{\frac{1}{4}}$.`, model: r`$\left(\dfrac{1}{32}\right)^{-\frac{2}{5}} = 32^{\frac{2}{5}} = 2^{2} = 4$, $125^{-\frac{1}{3}} = \dfrac{1}{5}$ and $16^{\frac{1}{4}} = 2$.

The product is $4 \times \dfrac{1}{5} \times 2 = \dfrac{8}{5}$.`, sol: r`Take each root first, then apply the power or the reciprocal.`, scheme: [['(1/32) to the -2/5 equals 4', 1], ['125 to the -1/3 equals 1/5 and 16 to the 1/4 equals 2', 1], ['Product 8/5', 1]], d: 3, c: 'understanding', t: [2], time: 150 }), (C) => {
  chain(r`\left(\dfrac{1}{32}\right)^{-\frac{2}{5}} = 32^{\frac{2}{5}} = 2^{2} = 4`);
  chain(r`125^{-\frac{1}{3}} = \dfrac{1}{5}`); chain(r`16^{\frac{1}{4}} = 2`);
  chain(r`\left(\dfrac{1}{32}\right)^{-\frac{2}{5}} \times 125^{-\frac{1}{3}} \times 16^{\frac{1}{4}} = 4 \times \dfrac{1}{5} \times 2 = \dfrac{8}{5}`);
  C.model([4, 5, 2, 8]);
});
Q('s303', mk.short({ marks: 3, stem: r`A physics formula reduces to $\dfrac{x^{5}y^{-2} \times (x^{-3}y^{4})^{2}}{x^{-1}y^{3}}$. Simplify it and write the answer with positive indices.`, model: r`$(x^{-3}y^{4})^{2} = x^{-6}y^{8}$, so the numerator is $x^{5-6}y^{-2+8} = x^{-1}y^{6}$.

Dividing by $x^{-1}y^{3}$: $x^{-1-(-1)}y^{6-3} = x^{0}y^{3} = y^{3}$.`, sol: r`Remember that $x^{0} = 1$.`, scheme: [['Bracket squared: x^-6 y^8', 1], ['Numerator x^-1 y^6', 1], ['Quotient x^0 y^3 = y^3', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => {
  chain(r`(x^{-3}y^{4})^{2} = x^{-6}y^{8}`);
  chain(r`x^{5}y^{-2} \times (x^{-3}y^{4})^{2} = x^{-1}y^{6}`);
  chain(r`\dfrac{x^{-1}y^{6}}{x^{-1}y^{3}} = x^{0}y^{3} = y^{3}`);
  chain(r`\dfrac{x^{5}y^{-2} \times (x^{-3}y^{4})^{2}}{x^{-1}y^{3}} = y^{3}`);
  C.model([6, 3]);
});
Q('s304', mk.short({ marks: 3, stem: r`Solve $3^{x} + 3^{x+2} = 270$.`, model: r`$3^{x+2} = 3^{x} \times 3^{2} = 9 \times 3^{x}$, so $3^{x} + 3^{x+2} = 10 \times 3^{x} = 270$.

$3^{x} = 27 = 3^{3}$, so $x = 3$.`, sol: r`Check: $27 + 243 = 270$.`, scheme: [['3^(x+2) = 9 x 3^x, so 10 x 3^x = 270', 1], ['3^x = 27', 1], ['27 = 3^3, so x = 3', 1]], d: 3, c: 'application', t: [3], time: 135 }), (C) => {
  const x = solveExp(r`3^{x} + 3^{x+2}`, r`270`, 3);
  C.assert(V(r`3^{3} + 3^{5}`).eq(R(270)), '27 + 243 = 270');
  C.model([9, 27, x.num()]);
});
Q('s305', mk.short({ marks: 3, stem: r`Show that $\dfrac{5^{n+2} - 5^{n+1}}{5^{n+1} - 5^{n}}$ has the same value for every $n$, and find that value.`, model: r`Numerator: $5^{n+2} - 5^{n+1} = 5^{n}(25 - 5) = 20 \times 5^{n}$.

Denominator: $5^{n+1} - 5^{n} = 5^{n}(5 - 1) = 4 \times 5^{n}$.

The ratio is $\dfrac{20 \times 5^{n}}{4 \times 5^{n}} = 5$, for every $n$.`, sol: r`The factor $5^{n}$ cancels, so the value does not depend on $n$.`, scheme: [['Numerator 5^n x 20', 1], ['Denominator 5^n x 4', 1], ['Cancel 5^n: value 5', 1]], d: 4, c: 'analysis', t: [3], time: 150 }), (C) => {
  C.assert([0, 1, 2, 3, 4, 5, 6].every((n) => V(r`\dfrac{5^{n+2} - 5^{n+1}}{5^{n+1} - 5^{n}}`, { n }).eq(R(5))), 'value 5 for n = 0..6');
  C.assert(V(r`5^{2} - 5`).eq(R(20)) && V(r`5 - 1`).eq(R(4)), '20 and 4');
  C.model([20, 4, 5]);
});
Q('s306', mk.short({ marks: 3, stem: r`A culture begins with $3000$ bacteria, and the number doubles every hour. After $x$ hours there are $192000$ bacteria. Find $x$.`, model: r`After $x$ hours the number is $3000 \times 2^{x}$, so $3000 \times 2^{x} = 192000$.

$2^{x} = 64 = 2^{6}$, so $x = 6$.`, sol: r`Check: $3000 \times 64 = 192000$.`, scheme: [['Number is 3000 x 2^x', 1], ['2^x = 192000 / 3000 = 64', 1], ['64 = 2^6, so x = 6', 1]], d: 3, c: 'application', t: [3], time: 135 }), (C) => {
  const x = solveExp(r`3000 \times 2^{x}`, r`192000`, 6);
  C.assert(192000 / 3000 === 64 && V(r`2^{6}`).eq(R(64)), '192000 / 3000 = 64 = 2^6');
  C.model([3000, 64, x.num()]);
});

// =============================================================== long answer, 10 marks
Q('l01', mk.long({ marks: 10, stem: r`(a) Use the law $a^{m} \div a^{n} = a^{m-n}$ with $m = n$ to show that $a^{0} = 1$ for $a \ne 0$. Then continue the pattern $3^{3}, 3^{2}, 3^{1}, 3^{0}, 3^{-1}, 3^{-2}$ by dividing by $3$ at each step, and write the six values. [3]

(b) Simplify $\dfrac{(2^{5})^{3} \times 4^{-3}}{16^{2} \times 2^{0}}$. [3]

(c) A pond weed covers $4 \times 3^{n}$ square metres after $n$ weeks. Show that the area in week $n + 2$ is $9$ times the area in week $n$, and find the week in which the weed first covers $972$ square metres. [4]`, model: r`(a) $a^{m} \div a^{m} = a^{m-m} = a^{0}$, but any non-zero number divided by itself is $1$, so $a^{0} = 1$. The values are $27, 9, 3, 1, \dfrac{1}{3}, \dfrac{1}{9}$.

(b) $2$.

(c) $4 \times 3^{n+2} = 9 \times (4 \times 3^{n})$. The weed covers $972$ m$^2$ in week $5$.`, sol: r`(a) The quotient law gives $a^{m} \div a^{m} = a^{0}$, and the quotient itself is $1$. Dividing $3^{3} = 27$ by $3$ repeatedly gives $9$, $3$, $1$, $\dfrac{1}{3}$ and $\dfrac{1}{9}$, which are $3^{2}, 3^{1}, 3^{0}, 3^{-1}, 3^{-2}$.

(b) $(2^{5})^{3} = 2^{15}$, $4^{-3} = (2^{2})^{-3} = 2^{-6}$, $16^{2} = (2^{4})^{2} = 2^{8}$ and $2^{0} = 1$. The value is $2^{15 - 6 - 8} = 2^{1} = 2$.

(c) The area in week $n + 2$ is $4 \times 3^{n+2} = 4 \times 3^{n} \times 3^{2} = 9 \times (4 \times 3^{n})$. For $972$: $4 \times 3^{n} = 972$ gives $3^{n} = 243 = 3^{5}$, so $n = 5$. Check: $4 \times 243 = 972$.`, scheme: [['(a) a^m / a^m = a^(m - m) = a^0, and the quotient is 1', 1], ['(a) Values 27, 9, 3, 1, 1/3, 1/9', 2], ['(b) 2^15, 2^-6 and 2^8 from the bracketed powers', 1], ['(b) Index 15 - 6 - 8 = 1', 1], ['(b) Value 2', 1], ['(c) 4 x 3^(n+2) = 9 x (4 x 3^n)', 1], ['(c) 3^n = 972 / 4 = 243 = 3^5', 1], ['(c) n = 5, with check', 2]], d: 3, c: 'application', t: [1, 2, 3], time: 600 }), (C) => {
  C.assert(V(r`3^{k}`, { k: 3 }).eq(R(27)) && [R(27), R(9), R(3), R(1), R(1, 3), R(1, 9)].every((v, i) => V(r`3^{k}`, { k: 3 - i }).eq(v)), 'pattern values');
  chain(r`\dfrac{(2^{5})^{3} \times 4^{-3}}{16^{2} \times 2^{0}} = \dfrac{2^{15} \times 2^{-6}}{2^{8} \times 1} = 2^{15-6-8} = 2^{1} = 2`);
  C.assert([0, 1, 2, 3, 4].every((n) => V(r`4 \times 3^{n+2}`, { n }).eq(V(r`9 \times 4 \times 3^{n}`, { n }))), 'week n + 2 is 9 times week n');
  chain(r`4 \times 3^{5} = 972`);
  solveExp(r`4 \times 3^{x}`, r`972`, 5);
  C.model([27, 9, 3, 2, 972, 5]);
  C.sol([27, 9, 243, 5, 2]);
});

Q('l02', mk.long({ marks: 10, stem: r`(a) Evaluate $\left(\dfrac{343}{1000}\right)^{-\frac{4}{3}}$. [3]

(b) Evaluate $\dfrac{81^{\frac{1}{4}} \times 8^{-\frac{2}{3}}}{\left(\frac{1}{36}\right)^{-\frac{1}{2}}}$. [3]

(c) A cubical box has volume $V = 1728$ cm$^3$. Find its edge and the area $A = V^{\frac{2}{3}}$ of one face. Then show, using the laws of indices, that $A^{3} = V^{2}$, and verify this for the box. [4]`, model: r`(a) $\dfrac{10000}{2401}$.

(b) $\dfrac{1}{8}$.

(c) Edge $12$ cm, face area $144$ cm$^2$; $A^{3} = (V^{\frac{2}{3}})^{3} = V^{2}$ and $144^{3} = 1728^{2} = 2985984$.`, sol: r`(a) The negative index flips the fraction: $\left(\dfrac{1000}{343}\right)^{\frac{4}{3}}$. The cube roots are $10$ and $7$, so the value is $\left(\dfrac{10}{7}\right)^{4} = \dfrac{10000}{2401}$.

(b) $81^{\frac{1}{4}} = 3$ and $8^{-\frac{2}{3}} = \dfrac{1}{4}$. The denominator is $\left(\dfrac{1}{36}\right)^{-\frac{1}{2}} = 36^{\frac{1}{2}} = 6$. The value is $\dfrac{3 \times \frac{1}{4}}{6} = \dfrac{3}{24} = \dfrac{1}{8}$.

(c) The edge is $1728^{\frac{1}{3}} = 12$ cm and $A = 12^{2} = 144$ cm$^2$. By the power of a power law, $A^{3} = \left(V^{\frac{2}{3}}\right)^{3} = V^{2}$. For the box, $144^{3} = 2985984$ and $1728^{2} = 2985984$, so they agree.`, scheme: [['(a) Reciprocal: (1000/343) to the 4/3', 1], ['(a) Cube roots 10 and 7', 1], ['(a) Fourth power: 10000/2401', 1], ['(b) 81^(1/4) = 3 and 8^(-2/3) = 1/4', 1], ['(b) Denominator (1/36)^(-1/2) = 6', 1], ['(b) Value 1/8', 1], ['(c) Edge 12 cm and face area 144 cm2', 2], ['(c) A^3 = (V^(2/3))^3 = V^2', 1], ['(c) 144^3 = 1728^2 = 2985984', 1]], d: 4, c: 'application', t: [2], time: 600 }), (C) => {
  chain(r`\left(\dfrac{343}{1000}\right)^{-\frac{4}{3}} = \left(\dfrac{1000}{343}\right)^{\frac{4}{3}} = \left(\dfrac{10}{7}\right)^{4} = \dfrac{10000}{2401}`);
  chain(r`\dfrac{81^{\frac{1}{4}} \times 8^{-\frac{2}{3}}}{\left(\frac{1}{36}\right)^{-\frac{1}{2}}} = \dfrac{3 \times \frac{1}{4}}{6} = \dfrac{3}{24} = \dfrac{1}{8}`);
  chain(r`1728^{\frac{1}{3}} = 12`); chain(r`1728^{\frac{2}{3}} = 12^{2} = 144`);
  C.assert(V(r`144^{3}`).eq(V(r`1728^{2}`)) && V(r`144^{3}`).eq(R(2985984)), '144^3 = 1728^2 = 2985984');
  C.assert([8, 27, 64, 1000].every((v) => V(r`(V^{\frac{2}{3}})^{3}`, { V: v }).eq(V(r`V^{2}`, { V: v }))), 'A^3 = V^2 at perfect cubes');
  C.model([10000, 2401, 12, 144, 2985984]);
  C.sol([10, 7, 6, 12, 144, 2985984]);
});

Q('l03', mk.long({ marks: 10, stem: r`Solve each equation.

(a) $8^{x-1} = \dfrac{1}{32}$. [3]

(b) $5^{x} + 5^{x+1} + 5^{x+2} = 3875$. [3]

(c) $\left(\dfrac{2}{3}\right)^{x} \times \left(\dfrac{9}{4}\right)^{x-1} = \dfrac{2}{3}$. [4]`, model: r`(a) $x = -\dfrac{2}{3}$.

(b) $x = 3$.

(c) $x = 1$.`, sol: r`(a) $8 = 2^{3}$ and $\dfrac{1}{32} = 2^{-5}$, so $2^{3(x-1)} = 2^{-5}$. Then $3x - 3 = -5$ and $x = -\dfrac{2}{3}$. Check: $8^{-\frac{5}{3}} = \dfrac{1}{(\sqrt[3]{8})^{5}} = \dfrac{1}{32}$.

(b) $5^{x}(1 + 5 + 25) = 31 \times 5^{x} = 3875$, so $5^{x} = 125 = 5^{3}$ and $x = 3$. Check: $125 + 625 + 3125 = 3875$.

(c) $\dfrac{9}{4} = \left(\dfrac{3}{2}\right)^{2} = \left(\dfrac{2}{3}\right)^{-2}$, so $\left(\dfrac{9}{4}\right)^{x-1} = \left(\dfrac{2}{3}\right)^{-2x+2}$. The product is $\left(\dfrac{2}{3}\right)^{x - 2x + 2} = \left(\dfrac{2}{3}\right)^{2-x}$. This equals $\left(\dfrac{2}{3}\right)^{1}$, so $2 - x = 1$ and $x = 1$. Check: $\dfrac{2}{3} \times \left(\dfrac{9}{4}\right)^{0} = \dfrac{2}{3}$.`, scheme: [['(a) 8 = 2^3 and 1/32 = 2^-5, so 3(x - 1) = -5', 1], ['(a) 3x - 3 = -5', 1], ['(a) x = -2/3', 1], ['(b) Factor: 5^x (1 + 5 + 25) = 31 x 5^x', 1], ['(b) 5^x = 3875 / 31 = 125 = 5^3', 1], ['(b) x = 3', 1], ['(c) 9/4 = (2/3)^-2, so (9/4)^(x-1) = (2/3)^(2 - 2x)', 1], ['(c) Product (2/3)^(2 - x)', 1], ['(c) 2 - x = 1', 1], ['(c) x = 1 with a check', 1]], d: 3, c: 'application', t: [3], time: 600 }), (C) => {
  const xa = solveExp(r`8^{x-1}`, r`\dfrac{1}{32}`, [-2, 3]);
  C.assert(xa.eq(linRoot(3, -3, 0, -5)) && xa.eq(R(-2, 3)), 'x = -2/3 from 3x - 3 = -5');
  const xb = solveExp(r`5^{x} + 5^{x+1} + 5^{x+2}`, r`3875`, 3);
  C.assert(3875 / 31 === 125 && V(r`5^{3} + 5^{4} + 5^{5}`).eq(R(3875)), '31 x 125 = 3875');
  const xc = solveExp(r`\left(\dfrac{2}{3}\right)^{x} \times \left(\dfrac{9}{4}\right)^{x-1}`, r`\dfrac{2}{3}`, 1);
  C.assert([-3, 0, 2, 5].every((k) => V(r`\left(\dfrac{2}{3}\right)^{x} \times \left(\dfrac{9}{4}\right)^{x-1}`, { x: k }).eq(V(r`\left(\dfrac{2}{3}\right)^{2-x}`, { x: k }))), 'product is (2/3)^(2 - x)');
  C.model([xb.num(), xc.num()]);
  C.sol([125, 31, 3875, 2, 1]);
});

Q('l04', mk.long({ marks: 10, stem: r`Three positive numbers $a$, $b$, $c$ (none equal to $1$) satisfy $a^{x} = b^{y} = c^{z}$ and $b^{2} = ac$.

(a) For $a = 3$, $b = 9$, $c = 27$ and $x = 12$, find $y$ and $z$, and check that $b^{2} = ac$. [3]

(b) For $a = 2$, $b = 8$, $c = 32$ and $x = 15$, find $y$ and $z$ and check that $\dfrac{1}{x} + \dfrac{1}{z} = \dfrac{2}{y}$. [3]

(c) Prove that in general $y = \dfrac{2xz}{x + z}$. [4]`, model: r`(a) $y = 6$, $z = 4$, and $b^{2} = 81 = 3 \times 27 = ac$.

(b) $y = 5$, $z = 3$, and $\dfrac{1}{15} + \dfrac{1}{3} = \dfrac{2}{5}$.

(c) Put $a^{x} = b^{y} = c^{z} = k$; then $a = k^{\frac{1}{x}}$, $b = k^{\frac{1}{y}}$, $c = k^{\frac{1}{z}}$. From $b^{2} = ac$, $\dfrac{2}{y} = \dfrac{1}{x} + \dfrac{1}{z}$, so $y = \dfrac{2xz}{x + z}$.`, sol: r`(a) $9^{y} = 3^{2y} = 3^{12}$ gives $y = 6$; $27^{z} = 3^{3z} = 3^{12}$ gives $z = 4$. Also $b^{2} = 81$ and $ac = 3 \times 27 = 81$.

(b) $8^{y} = 2^{3y} = 2^{15}$ gives $y = 5$; $32^{z} = 2^{5z} = 2^{15}$ gives $z = 3$. Then $\dfrac{1}{15} + \dfrac{1}{3} = \dfrac{1 + 5}{15} = \dfrac{2}{5} = \dfrac{2}{y}$.

(c) Let $a^{x} = b^{y} = c^{z} = k$, a positive number other than $1$. Taking the power $\dfrac{1}{x}$, $\dfrac{1}{y}$, $\dfrac{1}{z}$ gives $a = k^{\frac{1}{x}}$, $b = k^{\frac{1}{y}}$, $c = k^{\frac{1}{z}}$. Then $b^{2} = ac$ becomes $k^{\frac{2}{y}} = k^{\frac{1}{x}} \times k^{\frac{1}{z}} = k^{\frac{1}{x} + \frac{1}{z}}$. As $k \ne 1$, the indices are equal: $\dfrac{2}{y} = \dfrac{1}{x} + \dfrac{1}{z} = \dfrac{x + z}{xz}$, so $y = \dfrac{2xz}{x + z}$. For part (a), $\dfrac{2 \times 12 \times 4}{16} = 6$.`, scheme: [['(a) 3^(2y) = 3^12 gives y = 6; 3^(3z) = 3^12 gives z = 4', 2], ['(a) b^2 = 81 = 3 x 27 = ac', 1], ['(b) 2^(3y) = 2^15 gives y = 5; 2^(5z) = 2^15 gives z = 3', 2], ['(b) 1/15 + 1/3 = 2/5 = 2/y', 1], ['(c) a^x = b^y = c^z = k, so a = k^(1/x), b = k^(1/y), c = k^(1/z)', 1], ['(c) b^2 = ac gives k^(2/y) = k^(1/x + 1/z)', 1], ['(c) Equal indices: 2/y = (x + z)/(xz)', 1], ['(c) y = 2xz/(x + z)', 1]], d: 4, c: 'analysis', t: [3], time: 660 }), (C) => {
  const find = (b, target) => [...Array(60).keys()].find((k) => V(`${b}^{${k}}`).eq(target));
  const inst = (a, b, c, x) => { const k = V(`${a}^{${x}}`); const y = find(b, k), z = find(c, k); return { a, b, c, x, y, z, k }; };
  const i1 = inst(3, 9, 27, 12), i2 = inst(2, 8, 32, 15);
  C.assert(i1.y === 6 && i1.z === 4 && V(r`9^{2}`).eq(V(r`3 \times 27`)), '(a) y = 6, z = 4, b^2 = ac');
  C.assert(i2.y === 5 && i2.z === 3 && V(r`2 \times 8`).eq(R(16)) && V(r`8^{2}`).eq(V(r`2 \times 32`)), '(b) y = 5, z = 3, b^2 = ac');
  C.assert(V(r`\dfrac{1}{15} + \dfrac{1}{3}`).eq(V(r`\dfrac{2}{5}`)), '(b) 1/15 + 1/3 = 2/5');
  // the general result at three exact instances (a, b, c as powers of 2 with b^2 = ac)
  const gen = [[6, 3, 12], [15, 3, 30], [12, 4, 24]].map(([x, z, e]) => { const k = e; const a = k / x, c = k / z, y = (2 * x * z) / (x + z); const b = k / y; return [a, b, c, x, y, z, k, 2 * b === a + c]; });
  C.assert(gen.every(([a, b, c, x, y, z, k, ok]) => ok && Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c) && V(r`2^{a}`, { a: a * x }).eq(V(r`2^{b}`, { b: b * y })) && V(r`2^{a}`, { a: a * x }).eq(V(r`2^{c}`, { c: c * z })) && V(r`(2^{b})^{2}`, { b }).eq(V(r`2^{a} \times 2^{c}`, { a, c })) && y === (2 * x * z) / (x + z)), 'general result y = 2xz/(x + z) at three exact instances');
  C.model([6, 4, 81, 5, 3, 15]);
  C.sol([12, 4, 81, 15, 5, 3, 6]);
}, null);

Q('l05', mk.long({ marks: 10, stem: r`Aarav starts a chain message by sending it to $4$ friends in round $1$. In every later round each new recipient forwards it to $4$ people who have not yet received it, so $4^{n}$ people receive it for the first time in round $n$.

(a) How many new recipients are there in round $3$ and in round $4$? How many people in all have received it by the end of round $5$? [3]

(b) Find the first round in which more than $10000$ people receive it for the first time. [3]

(c) In round $r$ exactly $65536$ people receive it for the first time. Writing both sides as powers of $2$, find $r$, and then find the number of new recipients in round $r + 1$. [4]`, model: r`(a) Round $3$: $64$; round $4$: $256$; total after round $5$: $1364$.

(b) Round $7$.

(c) $r = 8$; round $9$ has $262144$ new recipients.`, sol: r`(a) $4^{3} = 64$ and $4^{4} = 256$. The total after five rounds is $4 + 16 + 64 + 256 + 1024 = 1364$.

(b) $4^{6} = 4096$ is not more than $10000$, but $4^{7} = 16384$ is. So the first such round is round $7$.

(c) $4^{r} = 65536$. Since $4 = 2^{2}$ and $65536 = 2^{16}$, $2^{2r} = 2^{16}$, so $2r = 16$ and $r = 8$. In round $9$ the number is $4^{9} = 4 \times 4^{8} = 4 \times 65536 = 262144$.`, scheme: [['(a) 4^3 = 64 and 4^4 = 256', 1], ['(a) Sum 4 + 16 + 64 + 256 + 1024', 1], ['(a) Total 1364', 1], ['(b) 4^6 = 4096 is not enough', 1], ['(b) 4^7 = 16384 is more than 10000', 1], ['(b) Round 7', 1], ['(c) 4^r = 2^(2r) and 65536 = 2^16', 1], ['(c) 2r = 16, so r = 8', 1], ['(c) Round 9 is 4 x 65536', 1], ['(c) 262144', 1]], d: 3, c: 'application', t: [1, 3], time: 600 }), (C) => {
  const rounds = [1, 2, 3, 4, 5].map((n) => V(r`4^{n}`, { n }));
  C.assert(String(rounds[2]) === '64' && String(rounds[3]) === '256', 'rounds 3 and 4');
  const total = rounds.reduce((s, v) => s.add(v), R(0));
  C.assert(total.eq(R(1364)) && 4 + 16 + 64 + 256 + 1024 === 1364, 'total 1364');
  const first = [...Array(20).keys()].find((n) => V(r`4^{n}`, { n }).sub(R(10000)).sign > 0);
  C.assert(first === 7 && V(r`4^{6}`).eq(R(4096)) && V(r`4^{7}`).eq(R(16384)), 'first round above 10000 is 7');
  const rr = [...Array(20).keys()].find((n) => V(r`4^{n}`, { n }).eq(R(65536)));
  C.assert(rr === 8 && V(r`2^{16}`).eq(R(65536)) && V(r`4^{9}`).eq(R(262144)) && V(r`4 \times 65536`).eq(R(262144)), 'r = 8 and round 9 = 262144');
  C.model([64, 256, 1364, 7, 8, 262144]);
  C.sol([1364, 16384, 65536, 262144]);
});

Q('l06', mk.long({ marks: 10, stem: r`Three students make mistakes. For each, find the mistake, give the correct working and the correct result.

(a) Priya writes $2^{5} \times 2^{3} = 4^{8}$. [3]

(b) Rohit writes $(5^{2})^{3} = 5^{5} = 3125$. [3]

(c) Tara solves $9^{x} = 27^{x-1}$ like this: "$3^{2x} = 3^{3x-1}$, so $2x = 3x - 1$ and $x = 1$." Show that her answer is wrong, find her mistake and solve the equation correctly. [4]`, model: r`(a) The bases were multiplied; they should stay the same and the indices add: $2^{8} = 256$.

(b) The indices should be multiplied: $5^{6} = 15625$.

(c) $27^{x-1} = 3^{3(x-1)} = 3^{3x-3}$, not $3^{3x-1}$. Then $2x = 3x - 3$ and $x = 3$.`, sol: r`(a) For a product of powers of the same base, the base stays and the indices add: $2^{5} \times 2^{3} = 2^{8} = 256$. Multiplying the bases ($2 \times 2 = 4$) and adding the indices is wrong: $4^{8} = 65536$.

(b) A power of a power multiplies the indices: $(5^{2})^{3} = 5^{2 \times 3} = 5^{6} = 15625$. Adding the indices gives $5^{5} = 3125$, which is smaller.

(c) For $x = 1$ the left side is $9^{1} = 9$ and the right side is $27^{0} = 1$, so $x = 1$ is wrong. Her mistake: $27^{x-1} = (3^{3})^{x-1} = 3^{3(x-1)} = 3^{3x-3}$; she did not multiply $3$ by both terms of $x - 1$. Correct equation: $2x = 3x - 3$, so $x = 3$. Check: $9^{3} = 729$ and $27^{2} = 729$.`, scheme: [['(a) Base should stay 2 and the indices add', 1], ['(a) Correct form 2^8', 1], ['(a) Value 256', 1], ['(b) Indices multiply: 2 x 3 = 6', 1], ['(b) 5^6', 1], ['(b) Value 15625', 1], ['(c) x = 1 gives 9 on the left but 1 on the right', 1], ['(c) 27^(x-1) = 3^(3x - 3), not 3^(3x - 1)', 1], ['(c) 2x = 3x - 3, so x = 3', 1], ['(c) Check 9^3 = 729 = 27^2', 1]], d: 4, c: 'analysis', t: [1, 3], time: 660 }), (C) => {
  C.assert(V(r`2^{5} \times 2^{3}`).eq(R(256)) && V(r`2^{8}`).eq(R(256)) && !V(r`2^{5} \times 2^{3}`).eq(V(r`4^{8}`)) && V(r`4^{8}`).eq(R(65536)), '(a)');
  C.assert(V(r`(5^{2})^{3}`).eq(R(15625)) && V(r`5^{6}`).eq(R(15625)) && V(r`5^{5}`).eq(R(3125)), '(b)');
  C.assert(V(r`9^{x}`, { x: 1 }).eq(R(9)) && V(r`27^{x-1}`, { x: 1 }).eq(R(1)), '(c) x = 1 fails');
  C.assert([0, 1, 2, 3, 4].every((k) => eqv(r`27^{x-1}`, r`3^{3x-3}`, { x: k })) && !eqv(r`27^{x-1}`, r`3^{3x-1}`, { x: 3 }), '(c) 27^(x-1) = 3^(3x - 3)');
  const x = linRoot(2, 0, 3, -3);
  C.assert(x.eq(R(3)) && V(r`9^{3}`).eq(R(729)) && V(r`27^{2}`).eq(R(729)), '(c) x = 3, 9^3 = 27^2 = 729');
  C.model([256, 15625, 3, 3]);
  C.sol([256, 65536, 15625, 729]);
});

Q('l07', mk.long({ marks: 10, stem: r`(a) Simplify $\left(\dfrac{x^{-3}y^{2}}{x^{2}y^{-4}}\right)^{-2}$ and write the answer with positive indices. [3]

(b) Show that $\dfrac{10^{n+1} + 10^{n}}{11 \times 2^{n} \times 5^{n}} = 1$ for every $n$. [3]

(c) Solve $9^{x} \times 3^{x+2} = \dfrac{1}{81}$. [4]`, model: r`(a) $\dfrac{x^{10}}{y^{12}}$.

(b) The numerator is $11 \times 10^{n}$ and the denominator is $11 \times 10^{n}$, so the ratio is $1$.

(c) $x = -2$.`, sol: r`(a) Inside the bracket, $x^{-3-2}y^{2-(-4)} = x^{-5}y^{6}$. Raising to the power $-2$ multiplies each index by $-2$: $x^{10}y^{-12} = \dfrac{x^{10}}{y^{12}}$.

(b) $10^{n+1} + 10^{n} = 10^{n}(10 + 1) = 11 \times 10^{n}$. For the denominator, $2^{n} \times 5^{n} = (2 \times 5)^{n} = 10^{n}$, so it is $11 \times 10^{n}$. The ratio is $1$.

(c) $9^{x} = 3^{2x}$, so the left side is $3^{2x} \times 3^{x+2} = 3^{3x+2}$. Also $\dfrac{1}{81} = 3^{-4}$. Equating the indices, $3x + 2 = -4$, so $x = -2$. Check: $9^{-2} \times 3^{0} = \dfrac{1}{81}$.`, scheme: [['(a) Inside the bracket x^-5 y^6', 1], ['(a) Power -2: x^10 y^-12', 1], ['(a) Positive indices: x^10 / y^12', 1], ['(b) Numerator 10^n (10 + 1) = 11 x 10^n', 1], ['(b) 2^n x 5^n = 10^n by the power of a product law', 1], ['(b) The ratio is 1', 1], ['(c) 9^x = 3^(2x) and the product is 3^(3x + 2)', 1], ['(c) 1/81 = 3^-4', 1], ['(c) 3x + 2 = -4, so x = -2', 1], ['(c) Check by substitution', 1]], d: 3, c: 'application', t: [1, 3], time: 600 }), (C) => {
  chain(r`\left(\dfrac{x^{-3}y^{2}}{x^{2}y^{-4}}\right)^{-2} = (x^{-5}y^{6})^{-2} = x^{10}y^{-12}`);
  C.assert(poly(r`x^{10}y^{-12}`) === poly(r`\dfrac{x^{10}}{y^{12}}`), 'positive-index form');
  C.assert([0, 1, 2, 3, 4, 5].every((n) => V(r`\dfrac{10^{n+1} + 10^{n}}{11 \times 2^{n} \times 5^{n}}`, { n }).eq(R(1)) && V(r`10^{n+1} + 10^{n}`, { n }).eq(V(r`11 \times 10^{n}`, { n })) && V(r`2^{n} \times 5^{n}`, { n }).eq(V(r`10^{n}`, { n }))), '(b) = 1');
  const x = solveExp(r`9^{x} \times 3^{x+2}`, r`\dfrac{1}{81}`, -2);
  C.assert(V(r`9^{x} \times 3^{x+2}`, { x: -2 }).eq(R(1, 81)) && x.eq(linRoot(3, 2, 0, -4)), '(c) x = -2');
  C.model([10, 12, 11, -2]);
  C.sol([11, 10, 81, -2]);
});

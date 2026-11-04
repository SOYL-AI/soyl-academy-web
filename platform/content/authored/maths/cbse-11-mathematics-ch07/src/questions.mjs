// CBSE 11 Mathematics ch07 Binomial Theorem — objective items (mcq, assertion-reason, true-false, fill-blank, numerical)
// with independent re-solve checks. Every expansion is computed twice: by the formula C(n, r) a^(n-r) b^r with BigInt
// rational coefficients and by multiplying the n brackets out exactly; the two must agree (see bt.mjs).
import { Q, mk } from './lib.mjs';
import { r, range, F, Cm, bn, fr, mon, expand, pTex, binTerm, termsOf, pcoef, padd, pterms, fStr, fTex, pascalRow, modpow, dec, decFr, fmul, fadd, fpow, feq, sd, spow, sadd } from './bt.mjs';

export { r };
const N = (b) => Number(b);
/** Integer value of a rational that must be a whole number. */
const iv = (x) => { if (x.d !== 1n) throw new Error(`not an integer: ${fStr(x)}`); return N(x.n); };
const x1 = (c, e = 1) => mon(c, e); // monomial in one variable
const xy = (c, i, j) => mon(c, i, j); // monomial in two variables
const sumCoef = (p) => pterms(p).reduce((s, m) => s + m.c.n, 0n);

// =============================================================== MCQ
{
  const p = expand(xy(2, 1, 0), xy(5, 0, 1), 9);
  Q('m01', mk.mcq({ stem: r`The number of terms in the expansion of $(2x + 5y)^{9}$ is`, opts: ['$10$', '$9$', '$11$', '$18$'], key: 'a', sol: r`The power of $y$ runs through $0, 1, 2, \ldots, 9$, so a power $n$ gives $n + 1$ terms: here $9 + 1 = 10$. The exponent $9$ itself counts one term too few, and $18$ is twice it.`, d: 1, c: 'recall', t: [1], time: 30 }), (Cx) => { Cx.assert(p.size === 10, 'the product of nine brackets has 10 terms'); Cx.which([p.size, 9, 11, 18], 10); });
}
{
  const row = pascalRow(7);
  const p = expand(x1(1, 1), x1(1, 0), 7);
  Q('m02', mk.mcq({ stem: r`The numbers $1, 7, 21, 35, 35, 21, 7, 1$ form one row of Pascal's triangle. They are the coefficients in the expansion of $(a + b)^{n}$ for $n$ equal to`, opts: ['$7$', '$8$', '$6$', '$35$'], key: 'a', sol: r`The row has $8$ entries and a power $n$ has $n + 1$ coefficients, so $n = 8 - 1 = 7$. Reading $n = 8$ counts the entries and not the power.`, d: 2, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(row.join() === '1,7,21,35,35,21,7,1' && pterms(p).map((m) => m.c.n).join() === row.join(), 'row 7 = coefficients of the 7th power'); Cx.which([row.length - 1, row.length, 6, 35], 7); });
}
{
  const c = pcoef(expand(xy(3, 1, 0), xy(1, 0, 1), 5), [3, 2]);
  Q('m03', mk.mcq({ stem: r`In the expansion of $(3x + y)^{5}$, the coefficient of $x^{3}y^{2}$ is`, opts: ['$270$', '$90$', '$10$', '$30$'], key: 'a', sol: r`The term with $y^{2}$ has $r = 2$: $\binom{5}{2}(3x)^{3}y^{2} = 10 \times 27\,x^{3}y^{2}$, so the coefficient is $270$. Leaving out the $27$ gives $10$, using $3$ instead of $3^{3}$ gives $30$, and using $3^{2}$ gives $90$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(iv(c) === 270 && Cm(5, 2) * 27n === 270n, '270'); Cx.which([iv(c), N(Cm(5, 2)) * 9, N(Cm(5, 2)), N(Cm(5, 2)) * 3], 270); });
}
{
  const p = expand(x1(1, 0), x1(2, 1), 7);
  Q('m04', mk.mcq({ stem: r`Putting $x = 1$ in the expansion of $(1 + 2x)^{7}$ shows that the coefficients of its terms add up to`, opts: ['$2187$', '$128$', '$21$', '$2186$'], key: 'a', sol: r`Putting $x = 1$ makes every power of $x$ equal to $1$, so the sum of the coefficients is $(1 + 2)^{7} = 3^{7} = 2187$. The value $128$ is $2^{7}$, $21$ is $3 \times 7$, and $2186$ leaves out the constant term $1$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(sumCoef(p) === 2187n && 3n ** 7n === 2187n, '3^7'); Cx.which([N(sumCoef(p)), 2 ** 7, 3 * 7, N(sumCoef(p)) - 1], 2187); });
}
{
  const p = expand(xy(1, 1, 0), xy(-1, 0, 1), 7);
  const neg = pterms(p).filter((m) => m.c.n < 0n).length;
  Q('m05', mk.mcq({ stem: r`In the expansion of $(p - q)^{7}$ the number of terms that carry a negative sign is`, opts: ['$4$', '$3$', '$7$', '$8$'], key: 'a', sol: r`The term with $q^{r}$ has the sign $(-1)^{r}$, which is negative for the odd values $r = 1, 3, 5, 7$. That is $4$ terms out of $8$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(neg === 4 && pterms(p).length === 8, '4 negative terms of 8'); Cx.which([neg, 3, 7, 8], 4); });
}
{
  const v = 99n ** 3n;
  const e = 10n ** 6n - 3n * 10n ** 4n + 3n * 100n - 1n;
  Q('m06', mk.mcq({ stem: r`Writing $99$ as $100 - 1$ and expanding $(100 - 1)^{3}$, the value of $99^{3}$ is`, opts: ['$970299$', '$970300$', '$1030301$', '$969699$'], key: 'a', sol: r`$(100-1)^{3} = 10^{6} - 3 \times 10^{4} + 3 \times 100 - 1 = 1000000 - 30000 + 300 - 1 = 970299$. The value $970300$ drops the last term, $1030301$ is $101^{3}$ (all signs positive), and $969699$ gives the third term a minus sign.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(v === 970299n && e === v, '99^3 = 970299 by multiplication and expansion'); Cx.which([N(v), N(v + 1n), N(101n ** 3n), 1000000 - 30000 - 300 - 1], 970299); });
}
{
  const s = padd(expand(xy(1, 1, 0), xy(1, 0, 1), 8), expand(xy(1, 1, 0), xy(-1, 0, 1), 8));
  Q('m07', mk.mcq({ stem: r`The expansions of $(x + y)^{8}$ and $(x - y)^{8}$ are written out and added. The sum has how many terms?`, opts: ['$5$', '$9$', '$4$', '$10$'], key: 'a', sol: r`The terms with an odd power of $y$ have opposite signs in the two expansions and cancel. The terms with $y^{0}, y^{2}, y^{4}, y^{6}, y^{8}$ double, so $5$ terms remain.`, d: 3, c: 'analysis', t: [1], time: 75 }), (Cx) => { Cx.assert(s.size === 5 && pterms(s).every((m) => m.e[1] % 2 === 0), '5 terms, even powers of y'); Cx.which([s.size, 9, 4, 10], 5); });
}
{
  const a = decFr('1.01');
  const three = fadd(fadd(fr(1), fmul(fr(8), decFr('0.01'))), fmul(fr(Cm(8, 2)), fpow(decFr('0.01'), 2)));
  const exact = fpow(a, 8);
  Q('m08', mk.mcq({ stem: r`Keeping only the first three terms of the expansion of $(1 + 0.01)^{8}$, the approximate value of $1.01^{8}$ is`, opts: ['$1.0828$', '$1.08$', '$1.36$', '$1.0856$'], key: 'a', sol: r`$(1 + 0.01)^{8} \approx 1 + 8(0.01) + 28(0.01)^{2} = 1 + 0.08 + 0.0028 = 1.0828$. The exact value is $${dec(exact, 7)}\ldots$. Two terms give $1.08$; forgetting to square the $0.01$ in the third term gives $1.36$; doubling the third term gives $1.0856$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(dec(three, 4) === '1.0828' && dec(exact, 4) === '1.0829', 'three terms 1.0828, exact 1.0829'); Cx.which([+dec(three, 4), 1.08, +dec(fadd(fadd(fr(1), decFr('0.08')), fmul(fr(Cm(8, 2)), decFr('0.01'))), 2), +dec(fadd(fadd(fr(1), decFr('0.08')), fmul(fr(2), fmul(fr(Cm(8, 2)), decFr('0.0001')))), 4)], 1.0828); });
}
{
  const s = pascalRow(9).reduce((u, v) => u + v, 0n);
  Q('m09', mk.mcq({ stem: r`The value of the sum $${bn(9, 0)} + ${bn(9, 1)} + ${bn(9, 2)} + \cdots + ${bn(9, 9)}$ is`, opts: ['$512$', '$1024$', '$511$', '$81$'], key: 'a', sol: r`These are the coefficients of $(a + b)^{9}$. Putting $a = b = 1$ gives their sum as $(1 + 1)^{9} = 2^{9} = 512$. The value $1024$ is $2^{10}$, $511$ omits one term, and $81$ is $9^{2}$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(s === 512n && range(0, 9).reduce((u, k) => u + Cm(9, k), 0n) === 512n && sumCoef(expand(x1(1, 1), x1(1, 0), 9)) === 512n, 'row 9 sums to 512'); Cx.which([N(s), 2 ** 10, N(s) - 1, 81], 512); });
}
{
  const n = 7;
  const p = expand(xy(1, 1, 0), xy(1, 0, 1), n);
  const ts = pterms(p); // descending powers of a
  const sym = ts.every((m, i) => feq(m.c, ts[n - i].c));
  const total = ts.every((m) => m.e[0] + m.e[1] === n);
  const q = pterms(expand(xy(1, 1, 0), xy(-1, 0, 1), n));
  const alt = q.every((m, i) => (m.c.n < 0n) === (i % 2 === 1));
  const upA = ts.every((m, i) => i === 0 || m.e[0] - ts[i - 1].e[0] === 1);
  Q('m10', mk.mcq({ stem: r`Which one of these statements about the expansion of $(a + b)^{n}$, written in the usual order from the term in $a^{n}$ onward, is NOT true?`, opts: ['The power of $a$ increases by $1$ from each term to the next.', 'The sum of the powers of $a$ and $b$ in every term is $n$.', 'Terms equally far from the two ends have equal coefficients.', r`In the expansion of $(a - b)^{n}$ the signs of the terms alternate.`], key: 'a', sol: r`In the usual order the power of $a$ falls from $n$ to $0$ and the power of $b$ rises from $0$ to $n$, so the first statement is false. The other three hold: the powers add to $n$, the coefficients are symmetric, and $(-b)^{r}$ gives alternating signs.`, d: 3, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(sym && total && alt && !upA, 'checked on n = 7: symmetry, total degree and signs hold; the power of a falls'); Cx.which([upA, total, sym, alt].map(Number), 0); });
}
{
  Q('m11', mk.mcq({ stem: r`In the expansion of $(1 + x)^{8}$ the greatest binomial coefficient is`, opts: ['$70$', '$56$', '$28$', '$8$'], key: 'a', sol: r`The coefficients $1, 8, 28, 56, 70, 56, 28, 8, 1$ rise to the middle and fall again; for even $n = 8$ the greatest is $${bn(8, 4)} = 70$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (Cx) => { const row = pascalRow(8); Cx.assert(Math.max(...row.map(N)) === 70 && row.indexOf(70n) === 4, 'greatest entry of row 8'); Cx.which([N(row[4]), N(row[3]), N(row[2]), 8], 70); });
}
{
  const m = modpow(10, 15, 11);
  Q('m12', mk.mcq({ stem: r`The binomial theorem is applied to $10^{15} = (11 - 1)^{15}$. The remainder left when this number is divided by $11$ is`, opts: ['$10$', '$1$', '$0$', '$9$'], key: 'a', sol: r`Write $10^{15} = (11 - 1)^{15}$. Every term of the expansion except the last contains the factor $11$, and the last term is $(-1)^{15} = -1$. So the number is $11k - 1 = 11(k - 1) + 10$, and the remainder is $10$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(m === 10n && (10n ** 15n) % 11n === 10n, 'remainder 10'); Cx.which([N(m), 1, 0, 9], 10); });
}
{
  const t = binTerm(x1(2, 1), x1(1, 0), 6, 3);
  Q('m13', mk.mcq({ stem: r`The fourth term in the expansion of $(2a + b)^{6}$ is`, opts: ['$160a^{3}b^{3}$', '$60a^{2}b^{4}$', '$80a^{3}b^{3}$', '$20a^{3}b^{3}$'], key: 'a', sol: r`The fourth term is $T_{4}$, so $r = 3$: $\binom{6}{3}(2a)^{3}b^{3} = 20 \times 8\,a^{3}b^{3} = 160a^{3}b^{3}$. The fifth term ($r = 4$) is $60a^{2}b^{4}$; the value $80$ squares the $2$, and $20$ forgets it.`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { const t5 = binTerm(x1(2, 1), x1(1, 0), 6, 4); Cx.assert(iv(t.c) === 160 && t.e[0] === 3 && iv(t5.c) === 60 && t5.e[0] === 2, 'T4 = 160 a^3 b^3, T5 = 60 a^2 b^4'); Cx.which([iv(t.c), iv(t5.c), N(Cm(6, 3)) * 4, N(Cm(6, 3))], 160); });
}
{
  const t = termsOf(x1(1, 1), x1(1, 0), 10)[5]; // second variable absent: (x + 1)^10, T6 has x^5
  const strs = [`${t.c.n}x${t.e[0]}`, '210x4', '210x6', '120x5'];
  Q('m14', mk.mcq({ stem: r`The middle term of the expansion of $(1 + x)^{10}$ is`, opts: ['$252x^{5}$', '$210x^{4}$', '$210x^{6}$', '$120x^{5}$'], key: 'a', sol: r`The power $10$ is even, so there is one middle term, the $\left(\dfrac{10}{2} + 1\right)$th term $T_{6}$: $${bn(10, 5)}x^{5} = 252x^{5}$. The terms next to it, $210x^{4}$ and $210x^{6}$, are not in the middle.`, d: 3, c: 'understanding', t: [2], time: 60 }), (Cx) => { const e = expand(x1(1, 1), x1(1, 0), 10); const ts = pterms(e); Cx.assert(ts.length === 11 && iv(ts[5].c) === 252 && ts[5].e[0] === 5 && iv(ts[4].c) === 210, 'T6 = 252 x^5'); Cx.which(['252x5', '210x4', '210x6', '120x5'], strs[0]); });
}
{
  const p = expand(x1(2, 1), x1(1, -2), 9);
  const c = pcoef(p, [0]);
  Q('m15', mk.mcq({ stem: r`The term of $\left(2x + \dfrac{1}{x^{2}}\right)^{9}$ that does not contain $x$ is`, opts: ['$5376$', '$672$', '$84$', '$4032$'], key: 'a', sol: r`$T_{r+1} = \binom{9}{r}(2x)^{9-r}\left(x^{-2}\right)^{r} = \binom{9}{r}2^{9-r}x^{9-3r}$. The power of $x$ is $0$ when $r = 3$: $${bn(9, 3)} \times 2^{6} = 84 \times 64 = 5376$. Forgetting the factor $2^{6}$ gives $84$, and using $2^{3}$ gives $672$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(iv(c) === 5376 && Cm(9, 3) * 64n === 5376n && Cm(9, 3) * 8n === 672n, 'constant term 5376'); Cx.which([iv(c), N(Cm(9, 3) * 8n), N(Cm(9, 3)), 4032], 5376); });
}
{
  let s = new Map();
  for (const n of range(3, 8)) s = padd(s, expand(x1(1, 0), x1(1, 1), n));
  const c = pcoef(s, [3]);
  Q('m16', mk.mcq({ stem: r`When the six expansions $(1+x)^{3}, (1+x)^{4}, \ldots, (1+x)^{8}$ are added, the coefficient of $x^{3}$ in the sum is`, opts: ['$126$', '$84$', '$56$', '$70$'], key: 'a', sol: r`Each expansion contributes $\binom{n}{3}$: $1 + 4 + 10 + 20 + 35 + 56 = 126$. Repeated use of Pascal's rule collapses the sum to $${bn(9, 4)} = 126$. The values $84$ and $70$ are $${bn(9, 3)}$ and $${bn(8, 4)}$, and $56$ is only the last contribution.`, d: 4, c: 'analysis', t: [1], time: 120 }), (Cx) => { Cx.assert(iv(c) === 126 && Cm(9, 4) === 126n && range(3, 8).reduce((u, n) => u + Cm(n, 3), 0n) === 126n, '126'); Cx.which([iv(c), N(Cm(9, 3)), N(Cm(8, 3)), N(Cm(8, 4))], 126); });
}
{
  const s = sadd(spow(sd(1, 1, 2), 4), spow(sd(-1, 1, 2), 4));
  Q('m17', mk.mcq({ stem: r`The value of $(\sqrt{2} + 1)^{4} + (\sqrt{2} - 1)^{4}$ is`, opts: ['$34$', '$17$', '$24$', '$12$'], key: 'a', sol: r`The terms with an odd power of $1$ cancel in pairs, and the others double: $2\left[(\sqrt{2})^{4} + \binom{4}{2}(\sqrt{2})^{2} + 1\right] = 2[4 + 12 + 1] = 34$. Half of this is $17$; doubling only the middle term gives $24$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(s.a === 34n && s.b === 0n && 2 * (4 + 6 * 2 + 1) === 34, '34 by surd multiplication and by the formula'); Cx.which([N(s.a), 17, 2 * 12, 12], 34); });
}
{
  const hits = range(3, 40).filter((n) => Cm(n, 3) === 120n);
  Q('m18', mk.mcq({ stem: r`The coefficient of $x^{3}$ in the expansion of $(1 + x)^{n}$ is $120$. The value of the positive integer $n$ is`, opts: ['$10$', '$8$', '$5$', '$40$'], key: 'a', sol: r`The coefficient is $${bn('n', 3)} = \dfrac{n(n-1)(n-2)}{6} = 120$, so $n(n-1)(n-2) = 720 = 10 \times 9 \times 8$ and $n = 10$. The number $5$ comes from $5! = 120$, and $40 = 120 \div 3$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(hits.join() === '10' && 10 * 9 * 8 === 720, 'n = 10 only'); Cx.which([hits[0], 8, 5, 40], 10); });
}

// =============================================================== assertion-reason
{
  const sizes = range(1, 12).map((n) => expand(xy(1, 1, 0), xy(1, 0, 1), n).size);
  Q('ar1', mk.ar({ a: r`The expansion of $(x + y)^{10}$ has $11$ terms.`, r: r`The expansion of $(x + y)^{n}$ has $n + 1$ terms, because the power of $y$ takes each value from $0$ to $n$.`, key: 'a', sol: r`The rule in R with $n = 10$ gives $10 + 1 = 11$ terms, which is the count in A, so R explains A.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(sizes.every((s, i) => s === i + 2) && sizes[9] === 11, 'n + 1 terms for n = 1..12'); Cx.key('a'); });
}
{
  const sums = range(1, 8).map((n) => sumCoef(expand(xy(1, 1, 0), xy(1, 0, 1), n)));
  const bad = range(1, 8).filter((n) => sums[n - 1] !== BigInt(n * n));
  Q('ar2', mk.ar({ a: r`The coefficients of the expansion of $(a + b)^{5}$ add up to $32$.`, r: r`The coefficients of the expansion of $(a + b)^{n}$ add up to $n^{2}$ for every positive integer $n$.`, key: 'c', sol: r`A is true: putting $a = b = 1$ gives $2^{5} = 32$. R is false: the sum is $2^{n}$, and for $n = 3$ the coefficients $1, 3, 3, 1$ add up to $8$, not $3^{2} = 9$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(sums[4] === 32n && sums[2] === 8n && bad.includes(3), 'sum 32 for n = 5; n = 3 breaks n^2'); Cx.key('c'); });
}
{
  const ts = pterms(expand(xy(1, 1, 0), xy(1, 0, 1), 8));
  Q('ar3', mk.ar({ a: r`The middle term of the expansion of $(x + y)^{8}$ is its fourth term.`, r: r`If $n$ is even, the middle term of the expansion of $(a + b)^{n}$ is the $\left(\dfrac{n}{2} + 1\right)$th term.`, key: 'd', sol: r`R is true. For $n = 8$ it names the $\dfrac{8}{2} + 1 = 5$th term, which has $4$ terms on each side of it, so A is false.`, d: 3, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(ts.length === 9 && ts[4].e[0] === 4 && ts[4].e[1] === 4, 'T5 = x^4 y^4 has four terms either side'); Cx.key('d'); });
}
Q('ar4', mk.ar({ a: r`$${bn(12, 5)} = ${bn(12, 7)}$.`, r: r`Each inner entry of Pascal's triangle is the sum of the two entries above it.`, key: 'b', sol: r`Both statements are true. A holds because choosing $5$ objects to take is the same as choosing $7$ to leave, $${bn('n', 'r')} = ${bn('n', 'n-r')}$ (the value is $792$); R is the rule for building the triangle and does not explain the symmetry.`, d: 3, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(Cm(12, 5) === Cm(12, 7) && Cm(12, 5) === 792n && range(1, 20).every((n) => range(1, n).every((k) => Cm(n, k) + Cm(n, k - 1) === Cm(n + 1, k))), '12C5 = 12C7 = 792; Pascal rule to n = 20'); Cx.key('b'); });
{
  const q = pterms(expand(x1(1, 0), x1(-1, 1), 6)).sort((u, v) => u.e[0] - v.e[0]);
  Q('ar5', mk.ar({ a: r`In the expansion of $(1 - x)^{6}$ the signs of the terms alternate, starting with $+$.`, r: r`The term containing $x^{r}$ in $(1 - x)^{6}$ is $\binom{6}{r}(-x)^{r}$, which has the sign $(-1)^{r}$.`, key: 'a', sol: r`R gives the sign of the term in $x^{r}$ as $(-1)^{r}$, which is $+, -, +, -, \ldots$ as $r = 0, 1, 2, \ldots$, exactly the pattern in A.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(q.length === 7 && q.every((m, i) => (m.c.n < 0n) === (i % 2 === 1)), 'signs + - + - + - +'); Cx.key('a'); });
}
{
  const t5 = termsOf(x1(2, 1), x1(-3, 0), 7)[4];
  Q('ar6', mk.ar({ a: r`The fifth term of the expansion of $(2x - 3)^{7}$ contains $x^{3}$.`, r: r`The fifth term of an expansion is the term with $r = 5$ in $T_{r+1} = \binom{n}{r}a^{n-r}b^{r}$.`, key: 'c', sol: r`A is true: the fifth term has $r = 4$, so it is $\binom{7}{4}(2x)^{3}(-3)^{4}$, which contains $x^{3}$. R is false: the $(r+1)$th term has index $r$, so the fifth term has $r = 4$ and not $5$.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(t5.e[0] === 3 && iv(t5.c) === 35 * 8 * 81, 'T5 contains x^3, coefficient 22680'); Cx.key('c'); });
}

// =============================================================== true-false
{
  const row = pascalRow(12).map(String);
  Q('tf1', mk.tf({ stem: r`All thirteen coefficients in the expansion of $(a + b)^{12}$ are different from one another.`, key: 'f', sol: r`The coefficients are symmetric, so terms equally far from the two ends are equal. For example $${bn(12, 2)} = ${bn(12, 10)} = 66$. Only the middle coefficient $${bn(12, 6)} = 924$ stands alone.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(new Set(row).size < 13 && row[2] === '66' && row[10] === '66' && row[6] === '924', 'repeated coefficients'); Cx.key('f'); });
}
{
  const row = pascalRow(9);
  const p = pterms(expand(xy(1, 1, 0), xy(1, 0, 1), 9)).map((m) => m.c.n);
  Q('tf2', mk.tf({ stem: r`The coefficients of the terms of $(x + y)^{9}$, read in order, are exactly the entries of the row of Pascal's triangle that begins $1, 9, \ldots$.`, key: 't', sol: r`The row that begins $1, 9$ is $1, 9, 36, 84, 126, 126, 84, 36, 9, 1$, and these are $${bn(9, 0)}, ${bn(9, 1)}, \ldots, ${bn(9, 9)}$, the coefficients of $(x + y)^{9}$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(p.join() === row.join() && row[1] === 9n, 'row 9 = coefficients'); Cx.key('t'); });
}
{
  const bad = range(2, 6).filter((n) => ((2 + 3) ** n) !== 2 ** n + 3 ** n);
  Q('tf3', mk.tf({ stem: r`A student writes $(a + b)^{n} = a^{n} + b^{n}$ for every positive integer $n$ and every pair of numbers $a, b$.`, key: 'f', sol: r`The middle terms are missing. For example $(2 + 3)^{3} = 125$ but $2^{3} + 3^{3} = 35$. (The two sides agree only for $n = 1$ or in special cases.)`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(bad.length === 5 && 5 ** 3 === 125 && 8 + 27 === 35, 'counter-example n = 3'); Cx.key('f'); });
}
{
  const e = 10n ** 6n + 3n * 10n ** 4n + 3n * 100n + 1n;
  Q('tf4', mk.tf({ stem: r`Expanding $(100 + 1)^{3}$ shows that the number $101^{3}$ is $1030301$.`, key: 't', sol: r`$(100 + 1)^{3} = 10^{6} + 3 \times 10^{4} + 3 \times 100 + 1 = 1000000 + 30000 + 300 + 1 = 1030301$.`, d: 1, c: 'application', t: [1] }), (Cx) => { Cx.assert(101n ** 3n === 1030301n && e === 101n ** 3n, '101^3'); Cx.key('t'); });
}
{
  const n = 7;
  const ts = pterms(expand(xy(1, 1, 0), xy(1, 0, 1), n));
  Q('tf5', mk.tf({ stem: r`The expansion of $(x + y)^{7}$ has exactly one middle term.`, key: 'f', sol: r`The power $7$ is odd, so the $8$ terms have two in the middle: the fourth and the fifth, $35x^{4}y^{3}$ and $35x^{3}y^{4}$. A single middle term occurs only for an even power.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(ts.length === 8 && iv(ts[3].c) === 35 && iv(ts[4].c) === 35, 'two middle terms, both 35'); Cx.key('f'); });
}

// =============================================================== fill in the blank
{
  const k = expand(xy(3, 1, 0), xy(-4, 0, 1), 15).size;
  Q('fb1', mk.fill({ stem: r`Written out in full, the expansion of $(3a - 4b)^{15}$ has ____ separate terms.`, acc: [['16']], sol: r`A power $n$ gives $n + 1$ terms, so $15 + 1 = 16$ terms.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(k === 16, '16 terms'); Cx.blank(k); });
}
{
  const s = pascalRow(6).reduce((u, v) => u + v, 0n);
  Q('fb2', mk.fill({ stem: r`Adding the entries of the row $1, 6, 15, 20, 15, 6, 1$ of Pascal's triangle gives ____.`, acc: [['64']], sol: r`The row belongs to $(a + b)^{6}$, and putting $a = b = 1$ gives $2^{6} = 64$. Direct addition: $1 + 6 + 15 + 20 + 15 + 6 + 1 = 64$.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(s === 64n && pascalRow(6).join() === '1,6,15,20,15,6,1', '64'); Cx.blank(N(s)); });
}
{
  const c = pcoef(expand(x1(2, 0), x1(1, 1), 5), [2]);
  Q('fb3', mk.fill({ stem: r`The coefficient of $x^{2}$ in the expansion of $(2 + x)^{5}$ is ____.`, acc: [['80']], sol: r`The term in $x^{2}$ has $r = 2$: $\binom{5}{2}2^{3}x^{2} = 10 \times 8\,x^{2} = 80x^{2}$, so the coefficient is $80$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(iv(c) === 80, '80'); Cx.blank(iv(c)); });
}
{
  const mid = pterms(expand(x1(1, 1), x1(1, 0), 6))[3];
  Q('fb4', mk.fill({ stem: r`The coefficient of the middle term of $(1 + x)^{6}$ is ____.`, acc: [['20']], sol: r`The power $6$ is even, so the middle term is $T_{4}$: $${bn(6, 3)}x^{3} = 20x^{3}$, with coefficient $20$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(iv(mid.c) === 20 && mid.e[0] === 3, '20'); Cx.blank(iv(mid.c)); });
}
{
  const hits = range(0, 15).filter((k) => k !== 4 && Cm(15, 4) === Cm(15, k));
  Q('fb5', mk.fill({ stem: r`If $${bn(15, 4)} = ${bn(15, 'r')}$ and $r \ne 4$, then $r$ equals ____.`, acc: [['11']], sol: r`Equal binomial coefficients with different lower numbers satisfy $4 + r = 15$, so $r = 11$. (Choosing $4$ of $15$ objects to take is the same as choosing $11$ to leave.)`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(hits.join() === '11', 'r = 11 only'); Cx.blank(hits[0]); });
}

// =============================================================== numerical
{
  const c = pcoef(expand(x1(2, 1), x1(3, 0), 6), [4]);
  Q('n01', mk.num({ stem: r`Find the coefficient of $x^{4}$ in the expansion of $(2x + 3)^{6}$.`, value: 2160, sol: r`The term in $x^{4}$ has $r = 2$: $\binom{6}{2}(2x)^{4}(3)^{2}$ has the coefficient $15 \times 16 \times 9 = 2160$.`, scheme: [['r = 2 identified, 6C2 = 15', 0.5], ['15 x 16 x 9 = 2160', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(iv(c) === 2160 && 15 * 16 * 9 === 2160, '2160'); Cx.val(iv(c)); });
}
{
  const v = 1004n ** 3n;
  const e = 10n ** 9n + 3n * 10n ** 6n * 4n + 3n * 1000n * 16n + 64n;
  Q('n02', mk.num({ stem: r`Write $1004$ as $1000 + 4$ and use the binomial theorem to find the value of $1004^{3}$.`, value: 1012048064, sol: r`$(1000 + 4)^{3} = 1000^{3} + 3(1000)^{2}(4) + 3(1000)(4)^{2} + 4^{3} = 1000000000 + 12000000 + 48000 + 64 = 1012048064$.`, scheme: [['The four terms written', 0.5], ['Sum 1012048064', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(v === 1012048064n && e === v, '1004^3'); Cx.val(N(v)); });
}
{
  const s = sadd(spow(sd(2, 1, 5), 4), spow(sd(2, -1, 5), 4));
  Q('n03', mk.num({ stem: r`Find the value of $(2 + \sqrt{5})^{4} + (2 - \sqrt{5})^{4}$.`, value: 322, sol: r`The terms with an odd power of $\sqrt{5}$ cancel, and the rest double: $2\left[2^{4} + \binom{4}{2}2^{2}(\sqrt{5})^{2} + (\sqrt{5})^{4}\right] = 2[16 + 120 + 25] = 322$.`, scheme: [['Odd powers of the root cancel, rest double', 0.5], ['2 x (16 + 120 + 25) = 322', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(s.a === 322n && s.b === 0n && 2 * (16 + 6 * 4 * 5 + 25) === 322, '322'); Cx.val(N(s.a)); });
}
{
  const s = sumCoef(expand(xy(5, 1, 0), xy(-3, 0, 1), 5));
  Q('n04', mk.num({ stem: r`All the coefficients of the expansion of $(5x - 3y)^{5}$ are added together. What is the total?`, value: 32, sol: r`Putting $x = 1$ and $y = 1$ leaves only the coefficients, so their sum is $(5 - 3)^{5} = 2^{5} = 32$.`, scheme: [['Substituting x = y = 1', 0.5], ['2^5 = 32', 0.5]], d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(s === 32n, '32'); Cx.val(N(s)); });
}
{
  const t = termsOf(x1(2, 1), x1(fr(1, 2), -1), 8).find((m) => m.e[0] === 0);
  Q('n05', mk.num({ stem: r`In the expansion of $\left(2x + \dfrac{1}{2x}\right)^{8}$ the middle term does not contain $x$. Find its value.`, value: 70, sol: r`The power $8$ is even, so the middle term is $T_{5}$ with $r = 4$: $\binom{8}{4}(2x)^{4}\left(\dfrac{1}{2x}\right)^{4} = 70 \times 16x^{4} \times \dfrac{1}{16x^{4}} = 70$.`, scheme: [['T5 identified, 8C4 = 70', 0.5], ['x cancels, value 70', 0.5]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(t && iv(t.c) === 70 && termsOf(x1(2, 1), x1(fr(1, 2), -1), 8)[4].e[0] === 0, 'T5 = 70'); Cx.val(iv(t.c)); });
}
{
  const c = pcoef(expand(x1(1, 2), x1(-2, -1), 6), [0]);
  Q('n06', mk.num({ stem: r`Find the term independent of $x$ in the expansion of $\left(x^{2} - \dfrac{2}{x}\right)^{6}$.`, value: 240, sol: r`$T_{r+1} = \binom{6}{r}(x^{2})^{6-r}\left(-\dfrac{2}{x}\right)^{r} = \binom{6}{r}(-2)^{r}x^{12-3r}$. The power of $x$ is $0$ at $r = 4$: $\binom{6}{4}(-2)^{4} = 15 \times 16 = 240$.`, scheme: [['Exponent 12 - 3r = 0, r = 4', 0.5], ['15 x 16 = 240', 0.5]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(iv(c) === 240 && 15 * 16 === 240, '240'); Cx.val(iv(c)); });
}

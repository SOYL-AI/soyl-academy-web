// CBSE 11 Mathematics ch07 Binomial Theorem — written items (short 2 and 3 marks, long 5 marks, case-based) with re-solve
// checks. Every number in a model answer is computed twice: by the formula C(n, r) a^(n-r) b^r and by exact multiplication.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, range, F, Cm, bn, fr, mon, expand, pTex, binTerm, termsOf, pcoef, padd, pmul, ppow, asPoly, pterms, pscale, peq, fStr, fTex, pascalRow, modpow, dec, decExact, decFr, fmul, fadd, fsub, fpow, feq, sd, spow, sadd, ssub, sTex, monoPart } from './bt.mjs';

const N = (b) => Number(b);
const iv = (x) => { if (x.d !== 1n) throw new Error(`not an integer: ${fStr(x)}`); return N(x.n); };
const x1 = (c, e = 1) => mon(c, e);
const xy = (c, i, j) => mon(c, i, j);
const one = (m, names) => pTex(asPoly(m), names);

// =============================================================== short answer, 2 marks
{
  const p = expand(x1(1, 1), x1(2, 0), 4);
  Q('s201', mk.short({ marks: 2, stem: r`Use the row of Pascal's triangle for $n = 4$ to expand $(x + 2)^{4}$.`, model: r`The row for $n = 4$ is $1, 4, 6, 4, 1$. Attach the powers of $2$:\n\n$(x + 2)^{4} = x^{4} + 4(2)x^{3} + 6(2^{2})x^{2} + 4(2^{3})x + 2^{4} = ${pTex(p, ['x'])}$.`, sol: 'Read the coefficients from the row, then multiply by the powers of 2.', scheme: [['Row 1, 4, 6, 4, 1 for n = 4', 1], ['Powers of 2 attached: 8, 24, 32 and 16', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(pascalRow(4).join() === '1,4,6,4,1' && pTex(p, ['x']) === 'x^{4} + 8x^{3} + 24x^{2} + 32x + 16', 'x^4 + 8x^3 + 24x^2 + 32x + 16'); Cx.model([4, 8, 24, 32, 16]); });
}
{
  const p = expand(xy(3, 1, 0), xy(-1, 0, 1), 3);
  Q('s202', mk.short({ marks: 2, stem: r`Expand $(3a - b)^{3}$ and state the number of terms that are negative.`, model: r`$(3a - b)^{3} = (3a)^{3} + 3(3a)^{2}(-b) + 3(3a)(-b)^{2} + (-b)^{3} = ${pTex(p, ['a', 'b'])}$.\n\nThe terms with $b$ and $b^{3}$ carry a minus sign, so $2$ terms are negative.`, sol: 'Treat -b as the second term, so odd powers of b are negative.', scheme: [['Binomial theorem with second term -b', 1], ['Expansion 27, -27, 9, -1 and 2 negative terms', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(pTex(p, ['a', 'b']) === '27a^{3} - 27a^{2}b + 9ab^{2} - b^{3}' && pterms(p).filter((m) => m.c.n < 0n).length === 2, '27a^3 - 27a^2 b + 9ab^2 - b^3'); Cx.model([27, 9, 2]); });
}
{
  const x = decFr('0.04');
  const t = [fr(1), fmul(fr(4), x), fmul(fr(6), fpow(x, 2)), fmul(fr(4), fpow(x, 3))];
  const s = t.reduce(fadd);
  Q('s203', mk.short({ marks: 2, stem: r`Using the first four terms of the expansion of $(1 + 0.04)^{4}$, find $1.04^{4}$ correct to three decimal places.`, model: r`$(1 + 0.04)^{4} \approx 1 + 4(0.04) + 6(0.04)^{2} + 4(0.04)^{3} = 1 + ${decExact(t[1])} + ${decExact(t[2])} + ${decExact(t[3])} = ${decExact(s)}$.\n\nTo three decimal places, $1.04^{4} \approx ${dec(s, 3)}$.`, sol: 'Four terms, then round the sum.', scheme: [['Terms 0.16, 0.0096 and 0.000256', 1], ['Sum 1.169856, rounded to 1.170', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(decExact(s) === '1.169856' && dec(s, 3) === '1.170' && dec(fpow(decFr('1.04'), 4), 3) === '1.170', 'sum 1.169856 and exact 1.16985856 both round to 1.170'); Cx.model([0.16, 0.0096, 0.000256, 1.169856, 1.17]); });
}
{
  const row = pascalRow(7);
  const s = row.reduce((u, v) => u + v, 0n);
  Q('s204', mk.short({ marks: 2, stem: r`Write the coefficients of the expansion of $(a + b)^{7}$ and show that they add up to $128$.`, model: r`The coefficients are those of the row for $n = 7$: $${row.join(', ')}$.\n\nPutting $a = 1$ and $b = 1$ gives the sum of the coefficients as $(1 + 1)^{7} = 2^{7} = ${s}$. Check: $1 + 7 + 21 + 35 + 35 + 21 + 7 + 1 = ${s}$.`, sol: 'Give both letters the value 1 so that only the coefficients remain.', scheme: [['Coefficients 1, 7, 21, 35, 35, 21, 7, 1', 1], ['Substitution a = b = 1 and sum 128', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(s === 128n && row.join() === pterms(expand(xy(1, 1, 0), xy(1, 0, 1), 7)).map((m) => m.c.n).join(), '128'); Cx.model([21, 35, 128]); });
}
{
  const names = ['x'];
  const val = (xv) => { const A = sd(xv, 1, 2), B = sd(xv, -1, 2); const s = sadd(spow(A, 6), spow(B, 6)); return s.b === 0n ? s.a : null; };
  const poly = (xv) => 2n * BigInt(xv) ** 6n + 60n * BigInt(xv) ** 4n + 120n * BigInt(xv) ** 2n + 16n;
  Q('s205', mk.short({ marks: 2, stem: r`Simplify $(x + \sqrt{2})^{6} + (x - \sqrt{2})^{6}$.`, model: r`The terms with an odd power of $\sqrt{2}$ cancel and the others double:\n\n$2\left[x^{6} + \binom{6}{2}x^{4}(\sqrt{2})^{2} + \binom{6}{4}x^{2}(\sqrt{2})^{4} + (\sqrt{2})^{6}\right] = 2\left[x^{6} + 30x^{4} + 60x^{2} + 8\right] = 2x^{6} + 60x^{4} + 120x^{2} + 16$.`, sol: 'Keep only the even powers of the root and double them.', scheme: [['Odd powers cancel, even powers double', 1], ['2x^6 + 60x^4 + 120x^2 + 16', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(range(1, 6).every((xv) => val(xv) === poly(xv)) && Cm(6, 2) * 2n === 30n && Cm(6, 4) * 4n === 60n, 'checked at x = 1..6 with exact surd arithmetic'); Cx.model([30, 60, 120, 16]); });
}
{
  const ts = termsOf(x1(1, 2), x1(3, -1), 9);
  Q('s206', mk.short({ marks: 2, stem: r`Write the general term of $\left(x^{2} + \dfrac{3}{x}\right)^{9}$ in its simplest form and use it to find the fourth term.`, model: r`$T_{r+1} = \binom{9}{r}(x^{2})^{9-r}\left(\dfrac{3}{x}\right)^{r} = \binom{9}{r}3^{r}x^{18-3r}$.\n\nThe fourth term has $r = 3$: $T_{4} = \binom{9}{3}3^{3}x^{9} = 84 \times 27\,x^{9} = ${ts[3].c.n}x^{9}$.`, sol: 'The fourth term means r = 3.', scheme: [['General term with the power 18 - 3r', 1], ['r = 3 gives 84 x 27 = 2268 x^9', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(ts.every((m, k) => m.e[0] === 18 - 3 * k && feq(m.c, fr(Cm(9, k) * 3n ** BigInt(k)))) && iv(ts[3].c) === 2268 && ts[3].e[0] === 9, 'T(r+1) = C(9,r) 3^r x^(18-3r); T4 = 2268 x^9'); Cx.model([84, 27, 2268]); });
}
{
  const t = termsOf(x1(1, 1), x1(fr(1, 2), -1), 10)[6];
  Q('s207', mk.short({ marks: 2, stem: r`Find the seventh term of the expansion of $\left(x + \dfrac{1}{2x}\right)^{10}$.`, model: r`The seventh term has $r = 6$: $T_{7} = \binom{10}{6}x^{4}\left(\dfrac{1}{2x}\right)^{6} = 210 \times \dfrac{x^{4}}{64x^{6}} = ${fTex(t.c)}x^{${t.e[0]}}$.`, sol: 'r = 6 for the seventh term; the powers of x combine to x^(-2).', scheme: [['r = 6 and 10C6 = 210', 1], ['210/64 = 105/32 and power of x is -2', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(feq(t.c, fr(105, 32)) && t.e[0] === -2 && Cm(10, 6) === 210n, '105/32 x^-2'); Cx.model([210, 64, 105, 32]); });
}
{
  const t = binTerm(xy(3, 1, 0), xy(fr(1, 3), 0, 1), 6, 3);
  Q('s208', mk.short({ marks: 2, stem: r`Find the middle term of the expansion of $\left(3a + \dfrac{b}{3}\right)^{6}$.`, model: r`The power $6$ is even, so there is one middle term, $T_{4}$ with $r = 3$: $\binom{6}{3}(3a)^{3}\left(\dfrac{b}{3}\right)^{3} = 20 \times 27a^{3} \times \dfrac{b^{3}}{27} = ${t.c.n}a^{3}b^{3}$.`, sol: 'T(n/2 + 1) for an even power; the 27s cancel.', scheme: [['Middle term T4 for n = 6', 1], ['20 x 27 x (1/27) = 20, term 20 a^3 b^3', 1]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { const ts = pterms(expand(xy(3, 1, 0), xy(fr(1, 3), 0, 1), 6)); Cx.assert(iv(t.c) === 20 && ts.length === 7 && iv(ts[3].c) === 20 && ts[3].e.join() === '3,3', 'middle term 20 a^3 b^3'); Cx.model([20, 27]); });
}
{
  const t = termsOf(x1(1, 3), x1(2, -1), 7).find((m) => m.e[0] === 5);
  Q('s209', mk.short({ marks: 2, stem: r`Which term of $\left(x^{3} + \dfrac{2}{x}\right)^{7}$ contains $x^{5}$? Find it.`, model: r`$T_{r+1} = \binom{7}{r}(x^{3})^{7-r}\left(\dfrac{2}{x}\right)^{r} = \binom{7}{r}2^{r}x^{21-4r}$. Setting $21 - 4r = 5$ gives $r = 4$, so it is the fifth term: $\binom{7}{4}2^{4}x^{5} = 35 \times 16\,x^{5} = ${t.c.n}x^{5}$.`, sol: 'Solve 21 - 4r = 5 for r.', scheme: [['Exponent 21 - 4r = 5 gives r = 4 (fifth term)', 1], ['35 x 16 = 560, term 560 x^5', 1]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { const all = termsOf(x1(1, 3), x1(2, -1), 7); Cx.assert(all.filter((m) => m.e[0] === 5).length === 1 && all.findIndex((m) => m.e[0] === 5) === 4 && iv(t.c) === 560, 'T5 = 560 x^5'); Cx.model([5, 4, 560]); });
}

// =============================================================== short answer, 3 marks
{
  const p = expand(x1(2, 1), x1(1, -1), 5);
  const ts = termsOf(x1(2, 1), x1(1, -1), 5);
  Q('s301', mk.short({ marks: 3, stem: r`Expand $\left(2x + \dfrac{1}{x}\right)^{5}$ in descending powers of $x$.`, model: r`The row for $n = 5$ is $1, 5, 10, 10, 5, 1$, and $T_{r+1} = \binom{5}{r}(2x)^{5-r}\left(\dfrac{1}{x}\right)^{r}$:\n\n${ts.map((m, k) => `$r = ${k}$: $${bn(5, k)}(2x)^{${5 - k}}x^{-${k}} = ${one(m, ['x'])}$`).join('\n\n')}\n\nAdding: $${pTex(p, ['x'])}$.`, sol: 'Write 1/x as x^(-1) and combine the powers of x in each term.', scheme: [['Pascal row 1, 5, 10, 10, 5, 1 and the general term', 1], ['Each term simplified (powers of 2 and of x)', 1], ['Final expansion 32x^5 + 80x^3 + 80x + 40/x + 10/x^3 + 1/x^5', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(pTex(p, ['x']) === '32x^{5} + 80x^{3} + 80x + 40x^{-1} + 10x^{-3} + x^{-5}' && ts.every((m, k) => m.e[0] === 5 - 2 * k), 'six terms checked'); Cx.model([32, 80, 40, 10]); });
}
{
  const d = ssub(spow(sd(3, 1, 7), 3), spow(sd(3, -1, 7), 3));
  Q('s302', mk.short({ marks: 3, stem: r`Show, by expanding both cubes, that $(3 + \sqrt{7})^{3} - (3 - \sqrt{7})^{3} = 68\sqrt{7}$.`, model: r`In $(3 + \sqrt{7})^{3}$ and $(3 - \sqrt{7})^{3}$ the terms with an even power of $\sqrt{7}$ are the same, so they cancel on subtraction, and the terms with an odd power are doubled:\n\n$2\left[\binom{3}{1}(3)^{2}\sqrt{7} + \binom{3}{3}(\sqrt{7})^{3}\right] = 2\left[27\sqrt{7} + 7\sqrt{7}\right] = 2 \times 34\sqrt{7} = 68\sqrt{7}$.`, sol: 'Subtracting keeps the odd powers of the root and doubles them.', scheme: [['Even powers cancel, odd powers double', 1], ['27 sqrt 7 and (sqrt 7)^3 = 7 sqrt 7', 1], ['2 x 34 sqrt 7 = 68 sqrt 7', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(d.a === 0n && d.b === 68n && d.d === 7n && 2 * (27 + 7) === 68, '68 sqrt 7 by exact surd arithmetic'); Cx.model([27, 34, 68]); });
}
{
  const k = (17n ** 12n - 1n) / 16n;
  Q('s303', mk.short({ marks: 3, stem: r`Use the binomial theorem to show that $17^{12} - 1$ is divisible by $16$.`, model: r`Write $17 = 16 + 1$. Then\n\n$17^{12} = (16 + 1)^{12} = 1 + \binom{12}{1}16 + \binom{12}{2}16^{2} + \cdots + 16^{12}$.\n\nSo $17^{12} - 1 = 16\left[12 + \binom{12}{2}16 + \cdots + 16^{11}\right]$, a multiple of $16$ because the bracket is a whole number. (Check: $17^{12} - 1 = ${17n ** 12n - 1n} = 16 \times ${k}$.)`, sol: 'Write 17 as 16 + 1; the first term 1 cancels with the minus 1.', scheme: [['17 = 16 + 1 and the expansion', 1], ['The term 1 cancels; 16 taken out as a factor', 1], ['Conclusion with the whole-number bracket', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { const tail = range(1, 12).reduce((u, i) => u + Cm(12, i) * 16n ** BigInt(i - 1), 0n); Cx.assert((17n ** 12n - 1n) % 16n === 0n && tail === k, 'bracket equals the quotient'); Cx.model([12, 16]); });
}
{
  const n = 8;
  const row = pascalRow(n);
  const ev = row.filter((_, i) => i % 2 === 0).reduce((u, v) => u + v, 0n), od = row.filter((_, i) => i % 2 === 1).reduce((u, v) => u + v, 0n);
  Q('s304', mk.short({ marks: 3, stem: r`Prove that in the expansion of $(1 + x)^{n}$ the coefficients in the odd places add up to the same total as those in the even places, and find that common total for $n = 8$.`, model: r`Put $x = 1$: $${bn('n', 0)} + ${bn('n', 1)} + ${bn('n', 2)} + \cdots = 2^{n}$. Put $x = -1$: $${bn('n', 0)} - ${bn('n', 1)} + ${bn('n', 2)} - \cdots = 0$.\n\nThe second result says (sum of the terms with even $r$) $-$ (sum with odd $r$) $= 0$, so the two sums are equal. Together they total $2^{n}$, so each is $2^{n-1}$.\n\nFor $n = 8$: each total is $2^{7} = ${ev}$. Check: $1 + 28 + 70 + 28 + 1 = ${ev}$ and $8 + 56 + 56 + 8 = ${od}$.`, sol: 'Use x = 1 and x = -1 and combine the two results.', scheme: [['x = 1 gives total 2^n', 1], ['x = -1 gives equal sums', 1], ['Each total 2^(n-1) = 128 for n = 8', 1]], d: 3, c: 'understanding', t: [1], time: 150 }), (Cx) => { Cx.assert(ev === 128n && od === 128n && row.join() === '1,8,28,56,70,56,28,8,1', '128 and 128'); Cx.model([28, 70, 56, 128]); });
}
{
  const x = decFr('0.01');
  const t = [fr(1), fmul(fr(10), x), fmul(fr(Cm(10, 2)), fpow(x, 2)), fmul(fr(Cm(10, 3)), fpow(x, 3))];
  const s = t.reduce(fadd);
  Q('s305', mk.short({ marks: 3, stem: r`Find the value of $1.01^{10}$ correct to four decimal places by using the first four terms of the expansion of $(1 + 0.01)^{10}$.`, model: r`$(1 + 0.01)^{10} \approx 1 + ${bn(10, 1)}(0.01) + ${bn(10, 2)}(0.01)^{2} + ${bn(10, 3)}(0.01)^{3}$.\n\nThe terms are $1$, $10 \times 0.01 = ${decExact(t[1])}$, $45 \times 0.0001 = ${decExact(t[2])}$ and $120 \times 0.000001 = ${decExact(t[3])}$.\n\nSum: $${decExact(s)}$, so $1.01^{10} \approx ${dec(s, 4)}$ to four decimal places.`, sol: 'Compute the four terms and add them before rounding.', scheme: [['Terms 1 and 0.1', 1], ['Terms 0.0045 and 0.00012', 1], ['Sum 1.10462, rounded to 1.1046', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(decExact(s) === '1.10462' && dec(s, 4) === '1.1046' && dec(fpow(decFr('1.01'), 10), 4) === '1.1046', 'four terms and the exact value both round to 1.1046'); Cx.model([0.1, 0.0045, 0.00012, 1.10462, 1.1046]); });
}
{
  const t = termsOf(x1(3, 2), x1(fr(-1, 2), -1), 9);
  const c = t.find((m) => m.e[0] === 0);
  Q('s306', mk.short({ marks: 3, stem: r`Find the term free of $x$ in the expansion of $\left(3x^{2} - \dfrac{1}{2x}\right)^{9}$.`, model: r`$T_{r+1} = \binom{9}{r}(3x^{2})^{9-r}\left(-\dfrac{1}{2x}\right)^{r} = \binom{9}{r}3^{9-r}\left(-\dfrac{1}{2}\right)^{r}x^{18-3r}$.\n\nThe power of $x$ is $0$ when $18 - 3r = 0$, that is $r = 6$.\n\n$T_{7} = \binom{9}{6}3^{3}\left(-\dfrac{1}{2}\right)^{6} = 84 \times 27 \times \dfrac{1}{64} = \dfrac{2268}{64} = ${fTex(c.c)}$.`, sol: 'Set the exponent 18 - 3r equal to 0.', scheme: [['General term with exponent 18 - 3r', 1], ['r = 6', 1], ['84 x 27 / 64 = 567/16', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(t.filter((m) => m.e[0] === 0).length === 1 && feq(c.c, fr(567, 16)) && t.indexOf(c) === 6, '567/16 at r = 6'); Cx.model([84, 27, 64, 2268, 567, 16]); });
}
{
  const ts = termsOf(x1(2, 1), x1(-3, 0), 5);
  const tp = termsOf(xy(2, 1, 0), xy(-3, 0, 1), 5);
  Q('s307', mk.short({ marks: 3, stem: r`Find the middle terms of the expansion of $(2p - 3q)^{5}$.`, model: r`The power $5$ is odd, so there are two middle terms, $T_{3}$ and $T_{4}$.\n\n$T_{3} = \binom{5}{2}(2p)^{3}(-3q)^{2} = 10 \times 8 \times 9\,p^{3}q^{2} = ${one(tp[2], ['p', 'q'])}$.\n\n$T_{4} = \binom{5}{3}(2p)^{2}(-3q)^{3} = 10 \times 4 \times (-27)\,p^{2}q^{3} = ${one(tp[3], ['p', 'q'])}$.`, sol: 'Odd n: terms number (n+1)/2 and (n+3)/2.', scheme: [['Two middle terms T3 and T4 since n = 5 is odd', 1], ['T3 = 720 p^3 q^2', 1], ['T4 = -1080 p^2 q^3', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(ts.length === 6 && iv(tp[2].c) === 720 && tp[2].e.join() === '3,2' && iv(tp[3].c) === -1080 && tp[3].e.join() === '2,3', 'T3 = 720 p^3 q^2, T4 = -1080 p^2 q^3'); Cx.model([720, 1080]); });
}
{
  const ts = termsOf(x1(1, 2), x1(1, -1), 7);
  const exps = ts.map((m) => m.e[0]);
  const t5 = ts.find((m) => m.e[0] === 5);
  Q('s308', mk.short({ marks: 3, stem: r`Show that the expansion of $\left(x^{2} + \dfrac{1}{x}\right)^{7}$ has no term free of $x$, and find the coefficient of $x^{5}$.`, model: r`$T_{r+1} = \binom{7}{r}(x^{2})^{7-r}\left(\dfrac{1}{x}\right)^{r} = \binom{7}{r}x^{14-3r}$.\n\nA term free of $x$ needs $14 - 3r = 0$, so $r = \dfrac{14}{3}$, which is not a whole number: there is no such term.\n\nFor $x^{5}$: $14 - 3r = 5$ gives $r = 3$, and the coefficient is $\binom{7}{3} = ${t5.c.n}$.`, sol: 'r must be a whole number from 0 to 7.', scheme: [['General term with exponent 14 - 3r', 1], ['14 - 3r = 0 gives a non-integer r', 1], ['r = 3 and coefficient 35', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(!exps.includes(0) && exps.join() === '14,11,8,5,2,-1,-4,-7' && iv(t5.c) === 35, 'exponents 14 - 3r never 0; coefficient of x^5 is 35'); Cx.model([14, 5, 3, 35]); });
}

// =============================================================== long answer, 5 marks
{
  const a = xy(fr(1, 2), 1, 0), b = xy(-2, 0, 1);
  const p = expand(a, b, 5);
  const ts = termsOf(a, b, 5);
  const names = ['a', 'b'];
  Q('l01', mk.long({ stem: r`Expand $\left(\dfrac{a}{2} - 2b\right)^{5}$ completely, showing each of the six terms.`, model: r`The row of Pascal's triangle for $n = 5$ is $1, 5, 10, 10, 5, 1$. Take the first term as $\dfrac{a}{2}$ and the second as $-2b$.\n\n${ts.map((m, k) => `$r = ${k}$: $${bn(5, k)}\\left(\\dfrac{a}{2}\\right)^{${5 - k}}(-2b)^{${k}} = ${one(m, names)}$`).join('\n\n')}\n\nAdding the six terms: $\left(\dfrac{a}{2} - 2b\right)^{5} = ${pTex(p, names)}$.`, sol: 'Keep the sign inside the second term, so odd powers of b are negative.', scheme: [['Row 1, 5, 10, 10, 5, 1 and the general term', 1], ['Terms with r = 0 and r = 1', 1], ['Terms with r = 2 and r = 3', 1], ['Terms with r = 4 and r = 5', 1], ['Complete expansion with signs', 1]], d: 3, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(pTex(p, names) === '\\dfrac{1}{32}a^{5} - \\dfrac{5}{8}a^{4}b + 5a^{3}b^{2} - 20a^{2}b^{3} + 40ab^{4} - 32b^{5}' && ts.length === 6, 'six terms'); Cx.model([10, 5, 20, 40, 32]); });
}
{
  const p = expand(x1(1, 0), x1(2, 1), 5);
  const xs = [decFr('0.02'), decFr('-0.02')];
  const co = pterms(p).sort((u, v) => u.e[0] - v.e[0]).map((m) => m.c);
  const terms = xs.map((x) => co.map((c, k) => fmul(c, fpow(x, k))));
  const sums = terms.map((t) => t.reduce(fadd));
  Q('l02', mk.long({ stem: r`(a) Expand $(1 + 2x)^{5}$ in ascending powers of $x$. (b) By putting $x = 0.02$, find the exact value of $1.04^{5}$. (c) By putting $x = -0.02$, find the exact value of $0.96^{5}$.`, model: r`**(a)** The row for $n = 5$ is $1, 5, 10, 10, 5, 1$, and the second term is $2x$: $(1 + 2x)^{5} = 1 + 5(2x) + 10(2x)^{2} + 10(2x)^{3} + 5(2x)^{4} + (2x)^{5} = ${pTex(p, ['x'], true)}$.\n\n**(b)** With $x = 0.02$ we have $1 + 2x = 1.04$. The terms are $1$, $${decExact(terms[0][1])}$, $${decExact(terms[0][2])}$, $${decExact(terms[0][3])}$, $${decExact(terms[0][4])}$ and $${decExact(terms[0][5])}$. Their sum is $1.04^{5} = ${decExact(sums[0])}$.\n\n**(c)** With $x = -0.02$ we have $1 + 2x = 0.96$ and the signs alternate: $1 - ${decExact(terms[0][1])} + ${decExact(terms[0][2])} - ${decExact(terms[0][3])} + ${decExact(terms[0][4])} - ${decExact(terms[0][5])} = ${decExact(sums[1])}$.`, sol: 'Substitute the small value of x into the expansion and add all six terms.', scheme: [['(a) Row 1, 5, 10, 10, 5, 1', 1], ['(a) Powers of 2 attached: 10x + 40x^2 + 80x^3 + 80x^4 + 32x^5', 1], ['(b) x = 0.02 gives the six terms', 1], ['(b) Sum 1.2166529024', 1], ['(c) x = -0.02 gives 0.8153726976', 1]], d: 3, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(co.map(fStr).join() === '1,10,40,80,80,32' && decExact(sums[0]) === '1.2166529024' && decExact(sums[1]) === '0.8153726976' && feq(sums[0], fpow(decFr('1.04'), 5)) && feq(sums[1], fpow(decFr('0.96'), 5)), 'coefficients and exact powers'); Cx.model([10, 40, 80, 32, '1.2166529024', '0.8153726976']); });
}
{
  const m9 = modpow(9, 35, 10), last2 = modpow(49, 15, 100), m4 = modpow(4, 99, 7);
  const part = 15 * 50 - 1;
  Q('l03', mk.long({ stem: r`Use the binomial theorem to find (a) the remainder when $9^{35}$ is divided by $10$; (b) the last two digits of $49^{15}$; (c) the remainder when $4^{99}$ is divided by $7$.`, model: r`**(a)** $9^{35} = (10 - 1)^{35}$. Every term of the expansion except the last has a factor $10$, and the last term is $(-1)^{35} = -1$. So $9^{35} = 10k - 1 = 10(k - 1) + 9$, and the remainder is $${m9}$.\n\n**(b)** $49^{15} = (50 - 1)^{15}$. Terms with $50^{2}$ or a higher power are multiples of $2500$, hence of $100$, so only the last two terms matter: $\binom{15}{14}(50)(-1)^{14} + (-1)^{15} = 750 - 1 = ${part}$. Since $${part} = 700 + 49$, the last two digits are $${last2}$.\n\n**(c)** $4^{99} = (4^{3})^{33} = 64^{33} = (63 + 1)^{33}$. Every term except the last has the factor $63$, a multiple of $7$, and the last term is $1$, so the remainder is $${m4}$.`, sol: 'Choose a nearby multiple: 10, 50 or 63, and keep only the terms that survive.', scheme: [['(a) 9 = 10 - 1; one term has no factor 10', 1], ['(a) Remainder 9, not -1', 1], ['(b) Only the last two terms survive modulo 100', 1], ['(b) 750 - 1 = 749, last two digits 49', 1], ['(c) 64^33 = (63 + 1)^33 gives remainder 1', 1]], d: 4, c: 'application', t: [1], time: 360 }), (Cx) => { Cx.assert(m9 === 9n && (9n ** 35n) % 10n === 9n && last2 === 49n && (49n ** 15n).toString().endsWith('49') && part === 749 && m4 === 1n && (4n ** 99n) % 7n === 1n && 63 % 7 === 0, 'remainders 9, last digits 49, remainder 1'); Cx.model([9, 750, 749, 49, 63, 1]); });
}
{
  const r7 = pascalRow(7), r8 = pascalRow(8);
  const p = expand(xy(1, 1, 0), xy(1, 0, 1), 8);
  const alt = r8.reduce((u, v, i) => (i % 2 ? u - v : u + v), 0n);
  const ev = r8.filter((_, i) => i % 2 === 0).reduce((u, v) => u + v, 0n);
  Q('l04', mk.long({ stem: r`(a) Build the row of Pascal's triangle for $n = 8$ from the row for $n = 7$, which is $1, 7, 21, 35, 35, 21, 7, 1$. (b) Write the expansion of $(x + y)^{8}$. (c) Put $x = 1$ and $y = -1$ to show that the coefficients in the odd places and in the even places have the same sum, and find it.`, model: r`**(a)** Each inner entry is the sum of the two entries above it: $1,\ 1 + 7 = 8,\ 7 + 21 = 28,\ 21 + 35 = 56,\ 35 + 35 = 70,\ 35 + 21 = 56,\ 21 + 7 = 28,\ 7 + 1 = 8,\ 1$. The row is $${r8.join(', ')}$.\n\n**(b)** $(x + y)^{8} = ${pTex(p, ['x', 'y'])}$.\n\n**(c)** With $x = 1$ and $y = -1$ the left side is $0^{8} = 0$, and the right side is $1 - 8 + 28 - 56 + 70 - 56 + 28 - 8 + 1 = ${alt}$. So (sum of the coefficients in the odd places) $=$ (sum in the even places). With $x = y = 1$ the two sums add up to $2^{8} = 256$, so each is $${ev}$.`, sol: 'Alternating signs give zero, so the two partial sums are equal.', scheme: [['(a) Neighbouring entries of row 7 added', 1], ['(a) Row 1, 8, 28, 56, 70, 56, 28, 8, 1', 1], ['(b) Expansion with the row as coefficients', 1], ['(c) x = 1, y = -1 gives 0 and equal sums', 1], ['(c) Total 256, each sum 128', 1]], d: 3, c: 'understanding', t: [1], time: 330 }), (Cx) => { Cx.assert(r8.join() === '1,8,28,56,70,56,28,8,1' && r7.map((v, i) => v + (r7[i + 1] ?? 0n)).slice(0, 7).join() === r8.slice(1, 8).join() && alt === 0n && ev === 128n && pterms(p).map((m) => m.c.n).join() === r8.join(), 'row 8, alternating sum 0, halves 128'); Cx.model([28, 56, 70, 256, 128]); });
}
{
  // enumerate the ways of picking b from r of the n brackets and compare with the formula and with the product
  const okAll = range(1, 8).every((n) => {
    const counts = new Array(n + 1).fill(0n);
    for (let mask = 0; mask < 1 << n; mask++) { let bits = 0; for (let i = 0; i < n; i++) if (mask & (1 << i)) bits++; counts[bits]++; }
    const prod = pterms(ppow(padd(asPoly(xy(1, 1, 0)), asPoly(xy(1, 0, 1))), n));
    return counts.every((c, k) => c === Cm(n, k)) && prod.every((m) => m.e[1] === n - m.e[0] && m.c.n === counts[m.e[1]]);
  });
  const p4 = pterms(expand(xy(1, 1, 0), xy(1, 0, 1), 4)).map((m) => m.c.n);
  Q('l05', mk.long({ stem: r`Prove the binomial theorem $(a + b)^{n} = \sum_{r=0}^{n} ${bn('n', 'r')}\,a^{n-r}b^{r}$ for a positive integer $n$ by counting how a term of the product of the $n$ brackets $(a + b)(a + b)\cdots(a + b)$ is formed, and check the result for $n = 4$.`, model: r`**Proof.** Multiplying out the $n$ brackets, each term of the product is formed by choosing one letter, $a$ or $b$, from every bracket and multiplying the choices.\n\nSuppose $b$ is chosen from exactly $r$ brackets. Then $a$ is chosen from the other $n - r$ brackets and the term is $a^{n-r}b^{r}$.\n\nThe number of ways to pick which $r$ of the $n$ brackets give the letter $b$ is $${bn('n', 'r')}$, so the term $a^{n-r}b^{r}$ occurs $${bn('n', 'r')}$ times in the product.\n\nAdding over all possible values $r = 0, 1, \ldots, n$ gives $(a + b)^{n} = \sum_{r=0}^{n} ${bn('n', 'r')}\,a^{n-r}b^{r}$.\n\n**Check for $n = 4$.** The numbers of ways are $${bn(4, 0)} = 1$, $${bn(4, 1)} = 4$, $${bn(4, 2)} = 6$, $${bn(4, 3)} = 4$, $${bn(4, 4)} = 1$, so $(a + b)^{4} = a^{4} + 4a^{3}b + 6a^{2}b^{2} + 4ab^{3} + b^{4}$, which agrees with multiplying $(a + b)^{2}(a + b)^{2}$ directly.`, sol: 'Choose b from r of the n brackets; count the choices; add over r.', scheme: [['One letter chosen from each bracket', 1], ['b from r brackets gives a^(n-r) b^r', 1], ['Number of choices is nCr', 1], ['Sum over r gives the theorem', 1], ['Check n = 4: coefficients 1, 4, 6, 4, 1', 1]], d: 3, c: 'understanding', t: [1], time: 330 }), (Cx) => { Cx.assert(okAll && p4.join() === '1,4,6,4,1' && peq(expand(xy(1, 1, 0), xy(1, 0, 1), 4), pmul(ppow(padd(asPoly(xy(1, 1, 0)), asPoly(xy(1, 0, 1))), 2), ppow(padd(asPoly(xy(1, 1, 0)), asPoly(xy(1, 0, 1))), 2))), 'subset counts equal nCr for n = 1..8; (a+b)^4 = (a+b)^2 (a+b)^2'); Cx.model([1, 4, 6]); });
}
{
  const a = x1(2, 2), b = x1(-1, -1);
  const ts = termsOf(a, b, 9);
  const exps = ts.map((m) => m.e[0]);
  const c0 = ts.find((m) => m.e[0] === 0), c3 = ts.find((m) => m.e[0] === 3);
  Q('l06', mk.long({ stem: r`For the expansion of $\left(2x^{2} - \dfrac{1}{x}\right)^{9}$, (a) write the general term; (b) find the term free of $x$; (c) find the coefficient of $x^{3}$; (d) show that there is no term containing $x^{10}$.`, model: r`**(a)** $T_{r+1} = \binom{9}{r}(2x^{2})^{9-r}\left(-\dfrac{1}{x}\right)^{r} = (-1)^{r}\binom{9}{r}2^{9-r}x^{18-3r}$.\n\n**(b)** The power of $x$ is $0$ when $18 - 3r = 0$, so $r = 6$ and the term is $(-1)^{6}\binom{9}{6}2^{3} = 84 \times 8 = ${c0.c.n}$.\n\n**(c)** $18 - 3r = 3$ gives $r = 5$, and the coefficient is $(-1)^{5}\binom{9}{5}2^{4} = -126 \times 16 = ${c3.c.n}$.\n\n**(d)** $18 - 3r = 10$ gives $r = \dfrac{8}{3}$, which is not a whole number, so no value of $r$ gives $x^{10}$. (In fact every power of $x$ here is a multiple of $3$.)`, sol: 'Exponent 18 - 3r; r must be a whole number from 0 to 9.', scheme: [['(a) General term with sign (-1)^r', 1], ['(b) r = 6 and 84 x 8 = 672', 1.5], ['(c) r = 5 and -2016', 1.5], ['(d) r = 8/3 not a whole number', 1]], d: 4, c: 'application', t: [2], time: 360 }), (Cx) => { Cx.assert(exps.join() === range(0, 9).map((k) => 18 - 3 * k).join() && !exps.includes(10) && exps.every((e) => e % 3 === 0) && iv(c0.c) === 672 && iv(c3.c) === -2016 && ts.indexOf(c0) === 6 && ts.indexOf(c3) === 5, 'terms 672 and -2016; no x^10'); Cx.model([84, 8, 672, 126, 16, 2016]); });
}
{
  const t8 = pterms(expand(xy(2, 1, 0), xy(3, 0, 1), 8))[4];
  const t9 = pterms(expand(xy(2, 1, 0), xy(3, 0, 1), 9));
  Q('l07', mk.long({ stem: r`(a) Find the middle term of $(2x + 3y)^{8}$. (b) Find the middle terms of $(2x + 3y)^{9}$. (c) Which of the two middle terms in (b) has the greater coefficient?`, model: r`**(a)** The power $8$ is even, so there is one middle term, $T_{5}$: $\binom{8}{4}(2x)^{4}(3y)^{4} = 70 \times 16 \times 81\,x^{4}y^{4} = ${t8.c.n}x^{4}y^{4}$.\n\n**(b)** The power $9$ is odd, so the middle terms are $T_{5}$ and $T_{6}$.\n\n$T_{5} = \binom{9}{4}(2x)^{5}(3y)^{4} = 126 \times 32 \times 81\,x^{5}y^{4} = ${t9[4].c.n}x^{5}y^{4}$.\n\n$T_{6} = \binom{9}{5}(2x)^{4}(3y)^{5} = 126 \times 16 \times 243\,x^{4}y^{5} = ${t9[5].c.n}x^{4}y^{5}$.\n\n**(c)** The binomial coefficients are equal ($126$), but $T_{6}$ has $3^{5}$ against $3^{4}$ and $2^{4}$ against $2^{5}$; comparing, $${t9[5].c.n} > ${t9[4].c.n}$, so $T_{6}$ has the greater coefficient.`, sol: 'Even n: one middle term; odd n: two, T((n+1)/2) and T((n+3)/2).', scheme: [['(a) T5 and 70 x 16 x 81', 1], ['(a) Value 90720', 1], ['(b) T5 and T6 identified for n = 9', 1], ['(b) 326592 and 489888', 1], ['(c) Comparison: T6 is greater', 1]], d: 3, c: 'application', t: [2], time: 330 }), (Cx) => { Cx.assert(iv(t8.c) === 90720 && t8.e.join() === '4,4' && iv(t9[4].c) === 326592 && iv(t9[5].c) === 489888 && t9.length === 10 && t9[5].c.n > t9[4].c.n && Cm(9, 4) === 126n && 70 * 16 * 81 === 90720, 'middle terms 90720, 326592, 489888'); Cx.model([90720, 326592, 489888, 126]); });
}

// =============================================================== case-based
{
  const row8 = pascalRow(8), row7 = pascalRow(7), row9 = pascalRow(9);
  const c3 = pcoef(expand(x1(1, 1), x1(2, 0), 5), [3]);
  const s8 = row8.reduce((u, v) => u + v, 0n);
  const e5 = expand(x1(1, 1), x1(-1, 0), 5);
  caseQ('c01', {
    passage: r`Rhea, an imagined student of the Hilltop Maths Club, prints Pascal's triangle up to the row for $n = 8$ on a poster, counting the single $1$ at the top as row $0$. She uses it to expand powers of sums. The row for $n = 5$ on her poster reads $1, 5, 10, 10, 5, 1$.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $${c3.n}$. (c) (i) $${pTex(e5, ['a'])}$. Or (ii) $${s8}$.`,
    sol: r`(a) Row $8$ has $9$ entries: $${row8.join(', ')}$. (b) $${bn(5, 3)} \times 2^{2} = 10 \times 4 = ${c3.n}$. (c) (i) Signs alternate because the second term is $-1$. (ii) $2^{8} = ${s8}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The row of Rhea's poster that gives the coefficients of $(x + y)^{8}$ is`, opts: [`$${row8.join(', ')}$`, `$${row7.join(', ')}$`, `$${row9.join(', ')}$`, '$1, 8, 16, 32, 64, 32, 16, 8, 1$'], key: 'a', sol: r`The power $8$ has $9$ coefficients, so it is the row $1, 8, 28, 56, 70, 56, 28, 8, 1$. The row for $n = 7$ has $8$ entries and the row for $n = 9$ has $10$.`, d: 2, c: 'application', t: [1], time: 60 })),
      child('b', mk.num({ stem: r`Using the row for $n = 5$, find the coefficient of $x^{3}$ in the expansion of $(x + 2)^{5}$.`, value: 40, sol: r`The term in $x^{3}$ has $r = 2$ (the power of $2$): $\binom{5}{2}x^{3}2^{2}$ has the coefficient $10 \times 4 = 40$.`, scheme: [['10 x 4 = 40', 1]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Use the row for $n = 5$ to expand $(a - 1)^{5}$.`, model: r`With the row $1, 5, 10, 10, 5, 1$ and the second term $-1$: $(a - 1)^{5} = ${pTex(e5, ['a'])}$.`, sol: 'Odd powers of the second term are negative.', scheme: [['Row 1, 5, 10, 10, 5, 1', 1], ['Alternating signs: a^5 - 5a^4 + 10a^3 - 10a^2 + 5a - 1', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the sum of all the entries in the row for $n = 8$ and write it as a power of $2$.`, model: r`Putting $a = b = 1$ in $(a + b)^{8}$ gives $2^{8} = ${s8}$. Check: $1 + 8 + 28 + 56 + 70 + 56 + 28 + 8 + 1 = ${s8}$.`, sol: 'The row sums to 2 to the power n.', scheme: [['a = b = 1 gives 2^8', 1], ['Sum 256', 1]], d: 2, c: 'understanding', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([row8.join(), row7.join(), row9.join(), '1,8,16,32,64,32,16,8,1'], pascalRow(8).join());
    Cx.child('b').val(iv(c3));
    Cx.child('c').assert(pTex(e5, ['a']) === 'a^{5} - 5a^{4} + 10a^{3} - 10a^{2} + 5a - 1' && row8.length === 9, 'a^5 - 5a^4 + 10a^3 - 10a^2 + 5a - 1');
    Cx.child('c').model([5, 10]);
    Cx.child('cii').assert(s8 === 256n && row8.join() === '1,8,28,56,70,56,28,8,1', '256');
    Cx.child('cii').model([256]);
  });
}
{
  const x = decFr('0.02');
  const terms = [fr(1), fmul(fr(5), x), fmul(fr(10), fpow(x, 2)), fmul(fr(10), fpow(x, 3)), fmul(fr(5), fpow(x, 4)), fpow(x, 5)];
  const three = terms.slice(0, 3).reduce(fadd);
  const exact = terms.reduce(fadd);
  const principal = fr(50000);
  const amt = fmul(principal, exact), appr = fmul(principal, three);
  const wrong = [three, fadd(fr(1), terms[1]), fadd(fadd(fr(1), terms[1]), fmul(fr(10), x)), fadd(fadd(fr(1), terms[1]), fpow(x, 2))];
  caseQ('c02', {
    passage: r`The imagined Greenfield Co-operative Society pays $2\%$ interest compounded yearly. A deposit of ₹50000 therefore grows in $5$ years to $50000 \times (1.02)^{5}$. A clerk writes $1.02 = 1 + 0.02$ and uses the binomial theorem to estimate the amount by hand.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${decExact(appr)}$. (c) (i) $${dec(amt, 2)}$. Or (ii) $${dec(fsub(amt, appr), 2)}$.`,
    sol: r`(a) $1 + 5(0.02) + 10(0.02)^{2} = ${decExact(three)}$. (b) $50000 \times ${decExact(three)} = ${decExact(appr)}$. (c) (i) $50000 \times ${decExact(exact)} = ${decExact(amt)}$. (ii) $${decExact(amt)} - ${decExact(appr)} = ${decExact(fsub(amt, appr))}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The sum of the first three terms of the expansion of $(1 + 0.02)^{5}$ is`, opts: [`$${decExact(three)}$`, `$${decExact(wrong[1])}$`, `$${decExact(wrong[2])}$`, `$${decExact(wrong[3])}$`], key: 'a', sol: r`The first three terms are $1$, $5(0.02) = 0.1$ and $10(0.02)^{2} = 0.004$, with sum $1.104$. The value $1.1$ stops after two terms, $1.3$ uses $10(0.02)$ without squaring, and $1.1004$ leaves out the coefficient $10$.`, d: 2, c: 'application', t: [1], time: 75 })),
      child('b', mk.num({ stem: r`Using only the first three terms of the expansion, estimate the amount (in rupees) after $5$ years.`, value: iv(appr), sol: r`$50000 \times 1.104 = 55200$, so the estimate is ₹55200.`, scheme: [['50000 x 1.104 = 55200', 1]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Use all six terms of the expansion to find the exact amount after $5$ years, to the nearest paisa.`, model: r`$(1.02)^{5} = 1 + ${decExact(terms[1])} + ${decExact(terms[2])} + ${decExact(terms[3])} + ${decExact(terms[4])} + ${decExact(terms[5])} = ${decExact(exact)}$.\n\nAmount: $50000 \times ${decExact(exact)} = ${decExact(amt)}$, that is ₹${dec(amt, 2)} to the nearest paisa.`, sol: 'Add all six terms before multiplying by the deposit.', scheme: [['Six terms of the expansion added: 1.1040808032', 1], ['Amount 55204.04016, to the nearest paisa 55204.04', 1]], d: 3, c: 'application', t: [1], time: 120 }), [
        mk.short({ marks: 2, stem: r`**(ii)** By how much (to the nearest paisa) is the estimate from the first three terms short of the exact amount?`, model: r`Exact amount ₹${decExact(amt)}, estimate ₹${decExact(appr)}. The difference is $${decExact(amt)} - ${decExact(appr)} = ${decExact(fsub(amt, appr))}$, that is ₹${dec(fsub(amt, appr), 2)}.`, sol: 'Subtract the estimate from the exact amount.', scheme: [['Exact and estimated amounts', 1], ['Difference 4.04', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(wrong.map((w) => +decExact(w)), 1.104);
    Cx.child('b').val(iv(appr));
    Cx.child('c').assert(decExact(exact) === '1.1040808032' && dec(amt, 2) === '55204.04' && feq(exact, fpow(decFr('1.02'), 5)), '1.1040808032 and 55204.04');
    Cx.child('c').model([0.1, 0.004, '1.1040808032', '55204.04016', '55204.04']);
    Cx.child('cii').assert(dec(fsub(amt, appr), 2) === '4.04', '4.04 short');
    Cx.child('cii').model([55200, 4.04]);
  });
}
{
  const x = decFr('0.05');
  const t = [fr(1), fmul(fr(3), x), fmul(fr(3), fpow(x, 2)), fpow(x, 3)];
  const vol = t.reduce(fadd);
  const lit = fmul(vol, fr(1000));
  const approx = fadd(t[0], t[1]);
  const less = [fr(1), fmul(fr(3), x), fmul(fr(3), fpow(x, 2)), fpow(x, 3)].map((v, k) => (k % 2 ? fmul(v, fr(-1)) : v)).reduce(fadd);
  const opt = [vol, fadd(fadd(fadd(fr(1), fmul(fr(3), x)), fmul(fr(3), x)), x), fadd(fadd(fadd(fr(1), fmul(fr(3), fpow(x, 2))), fmul(fr(3), fpow(x, 3))), fpow(x, 4)), fadd(fr(1), fpow(x, 3))];
  caseQ('c03', {
    passage: r`A water tank of an imagined fish farm is a cube of side $1.05$ m. Its volume in cubic metres is $(1.05)^{3}$, and the farm manager writes $1.05 = 1 + 0.05$ to work it out with the binomial theorem. One cubic metre holds $1000$ litres.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${decExact(lit)}$. (c) (i) $${decExact(fsub(vol, approx))}$. Or (ii) $${decExact(less)}$.`,
    sol: r`(a) $1 + 3(0.05) + 3(0.05)^{2} + (0.05)^{3} = ${decExact(vol)}$. (b) $${decExact(vol)} \times 1000 = ${decExact(lit)}$. (c) (i) $${decExact(vol)} - ${decExact(approx)} = ${decExact(fsub(vol, approx))}$. (ii) $1 - 0.15 + 0.0075 - 0.000125 = ${decExact(less)}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The binomial expansion of $(1 + 0.05)^{3}$ is`, opts: [r`$1 + 3(0.05) + 3(0.05)^{2} + (0.05)^{3}$`, r`$1 + 3(0.05) + 3(0.05) + 0.05$`, r`$1 + 3(0.05)^{2} + 3(0.05)^{3} + (0.05)^{4}$`, r`$1 + (0.05)^{3}$`], key: 'a', sol: r`The coefficients for $n = 3$ are $1, 3, 3, 1$ and the powers of $0.05$ rise from $0$ to $3$. The other three expressions have the values $${decExact(opt[1])}$, $${decExact(opt[2])}$ and $${decExact(opt[3])}$, none of which is $1.05^{3}$.`, d: 2, c: 'application', t: [1], time: 75 })),
      child('b', mk.num({ stem: r`Find the volume of the tank in litres.`, value: +decExact(lit), sol: r`$(1.05)^{3} = ${decExact(vol)}$ cubic metres, and $${decExact(vol)} \times 1000 = ${decExact(lit)}$ litres.`, scheme: [['Volume 1.157625 cubic metres', 0.5], ['1.157625 x 1000 = 1157.625', 0.5]], d: 2, c: 'application', t: [1], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** The manager keeps only the first two terms, $1 + 3(0.05)$. By how many cubic metres does this estimate fall short of the exact volume?`, model: r`Estimate: $1 + 0.15 = ${decExact(approx)}$. Exact volume: $${decExact(vol)}$. The shortfall is $${decExact(vol)} - ${decExact(approx)} = ${decExact(fsub(vol, approx))}$ cubic metres.`, sol: 'Exact volume minus the two-term estimate.', scheme: [['Estimate 1.15', 1], ['Shortfall 0.007625', 1]], d: 3, c: 'application', t: [1], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A second tank has side $0.95$ m. Write $0.95 = 1 - 0.05$ and use the binomial theorem to find its volume in cubic metres.`, model: r`$(1 - 0.05)^{3} = 1 - 3(0.05) + 3(0.05)^{2} - (0.05)^{3} = 1 - 0.15 + 0.0075 - 0.000125 = ${decExact(less)}$ cubic metres.`, sol: 'The second term is -0.05, so the signs alternate.', scheme: [['Expansion with alternating signs', 1], ['Value 0.857375', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(opt.map((v) => +decExact(v)), 1.157625);
    Cx.child('b').val(+decExact(lit));
    Cx.child('c').assert(decExact(vol) === '1.157625' && feq(vol, fpow(decFr('1.05'), 3)) && decExact(fsub(vol, approx)) === '0.007625', '1.157625, shortfall 0.007625');
    Cx.child('c').model([1.15, 1.157625, 0.007625]);
    Cx.child('cii').assert(decExact(less) === '0.857375' && feq(less, fpow(decFr('0.95'), 3)), '0.857375');
    Cx.child('cii').model([0.15, 0.0075, 0.000125, 0.857375]);
  });
}
{
  const ts = termsOf(x1(1, 1), x1(2, -1), 8);
  const c4 = ts.find((m) => m.e[0] === 4), c0 = ts.find((m) => m.e[0] === 0), cm2 = ts.find((m) => m.e[0] === -2);
  caseQ('c04', {
    passage: r`A puzzle card at an imagined maths fair shows the expression $\left(x + \dfrac{2}{x}\right)^{8}$. Visitors win a prize by finding particular terms of its expansion.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${c4.c.n}$. (c) (i) $${c0.c.n}$. Or (ii) $${cm2.c.n}$.`,
    sol: r`(a) $8 + 1 = 9$. (b) $T_{r+1} = \binom{8}{r}2^{r}x^{8-2r}$; $8 - 2r = 4$ gives $r = 2$ and $\binom{8}{2} \times 2^{2} = ${Cm(8, 2)} \times 4 = ${c4.c.n}$. (c) (i) $r = 4$: $${Cm(8, 4)} \times 16 = ${c0.c.n}$. (ii) $r = 5$: $${Cm(8, 5)} \times 32 = ${cm2.c.n}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The number of terms in the expansion of $\left(x + \dfrac{2}{x}\right)^{8}$ is`, opts: ['$9$', '$8$', '$10$', '$16$'], key: 'a', sol: r`A power $8$ gives $8 + 1 = 9$ terms; the fractions do not change the count because the powers of $x$ are all different.`, d: 1, c: 'recall', t: [1], time: 45 })),
      child('b', mk.num({ stem: r`Find the coefficient of $x^{4}$ in the expansion.`, value: iv(c4.c), sol: r`$T_{r+1} = \binom{8}{r}x^{8-r}\left(\dfrac{2}{x}\right)^{r} = \binom{8}{r}2^{r}x^{8-2r}$. The power $4$ needs $r = 2$: $\binom{8}{2}2^{2} = 28 \times 4 = 112$.`, scheme: [['Exponent 8 - 2r = 4, r = 2', 0.5], ['28 x 4 = 112', 0.5]], d: 3, c: 'application', t: [2], time: 105 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the term that does not contain $x$.`, model: r`The power of $x$ is $8 - 2r = 0$ when $r = 4$: $T_{5} = \binom{8}{4}2^{4} = 70 \times 16 = ${c0.c.n}$.`, sol: 'Set the exponent 8 - 2r to zero.', scheme: [['r = 4', 1], ['70 x 16 = 1120', 1]], d: 3, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the coefficient of $\dfrac{1}{x^{2}}$.`, model: r`$8 - 2r = -2$ gives $r = 5$: $\binom{8}{5}2^{5} = 56 \times 32 = ${cm2.c.n}$.`, sol: 'The exponent -2 gives r = 5.', scheme: [['r = 5', 1], ['56 x 32 = 1792', 1]], d: 4, c: 'analysis', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([ts.length, 8, 10, 16], 9);
    Cx.child('b').val(iv(c4.c));
    Cx.child('c').assert(iv(c0.c) === 1120 && ts.indexOf(c0) === 4 && Cm(8, 4) * 16n === 1120n, '1120 at r = 4');
    Cx.child('c').model([4, 70, 16, 1120]);
    Cx.child('cii').assert(iv(cm2.c) === 1792 && ts.indexOf(cm2) === 5 && Cm(8, 5) * 32n === 1792n, '1792 at r = 5');
    Cx.child('cii').model([5, 56, 32, 1792]);
  });
}
{
  const row = pascalRow(9);
  const total = row.reduce((u, v) => u + v, 0n);
  const ev = row.filter((_, i) => i % 2 === 0).reduce((u, v) => u + v, 0n);
  caseQ('c05', {
    passage: r`A decorator at an imagined lantern fair hangs lamp clusters in the shape of Pascal's triangle. The cluster in the $k$th place of row $n$ (counting from $0$) carries $\binom{n}{k}$ bulbs. She is planning row $9$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${Math.max(...row.map(N))}$. (c) (i) $${total}$. Or (ii) $${ev}$.`,
    sol: r`(a) Row $9$ has $9 + 1 = 10$ clusters. (b) The row is $${row.join(', ')}$; the greatest is $${Cm(9, 4)}$. (c) (i) $2^{9} = ${total}$. (ii) $2^{8} = ${ev}$.`,
    children: [
      child('a', mk.mcq({ stem: r`The number of lamp clusters in row $9$ is`, opts: ['$10$', '$9$', '$11$', '$512$'], key: 'a', sol: r`Row $n$ has entries for $k = 0, 1, \ldots, n$, which is $n + 1 = 10$ clusters. The number $512$ is the total number of bulbs, not of clusters.`, d: 1, c: 'recall', t: [1], time: 45 })),
      child('b', mk.num({ stem: r`Find the largest number of bulbs in any single cluster of row $9$.`, value: N(Cm(9, 4)), sol: r`The entries of row $9$ rise to the middle, where the two greatest are $\binom{9}{4} = \binom{9}{5} = 126$. The largest number of bulbs is $126$.`, scheme: [['The two middle entries 126', 1]], d: 2, c: 'understanding', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the total number of bulbs in row $9$ using the binomial theorem.`, model: r`The total is $\binom{9}{0} + \binom{9}{1} + \cdots + \binom{9}{9}$, the sum of the coefficients of $(a + b)^{9}$. Putting $a = b = 1$ gives $2^{9} = ${total}$ bulbs.`, sol: 'Give both letters the value 1.', scheme: [['Total as the sum of the coefficients of (a + b)^9', 1], ['2^9 = 512', 1]], d: 3, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The clusters in the places $k = 0, 2, 4, 6, 8$ are switched on first. Show that they carry $256$ bulbs in all.`, model: r`Put $a = 1$ and $b = -1$ in $(a + b)^{9}$: the alternating sum is $0$, so the clusters in the even places carry as many bulbs as those in the odd places. The two totals add up to $2^{9} = ${total}$, so each is $${total} \div 2 = ${ev}$. Check: $1 + 36 + 126 + 84 + 9 = ${ev}$.`, sol: 'Alternating sum zero means the two halves are equal.', scheme: [['a = 1, b = -1 gives equal halves', 1], ['512 / 2 = 256', 1]], d: 3, c: 'understanding', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([row.length, 9, 11, 512], 10);
    Cx.child('b').val(N(Cm(9, 4)));
    Cx.child('c').assert(total === 512n && 2n ** 9n === 512n && sumAlt(row) === 0n, '512 bulbs');
    Cx.child('c').model([512]);
    Cx.child('cii').assert(ev === 256n && 1n + 36n + 126n + 84n + 9n === 256n, '256 bulbs');
    Cx.child('cii').model([0, 512, 256, 126, 84]);
  });
}
function sumAlt(row) { return row.reduce((u, v, i) => (i % 2 ? u - v : u + v), 0n); }

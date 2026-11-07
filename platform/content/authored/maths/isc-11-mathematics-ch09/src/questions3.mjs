// ISC 11 Mathematics ch09 Binomial Theorem - short-3 and long-5 (in parts) items.
import { Q, mk } from './lib.mjs';
import { r, range, F, Cm, pascalRow, S, N, mon, fr, fabs, fTex, expand, termAt, termList, monoTex, polyTex, coefAt, terms, count, bn, pw, fmul, fadd, fpow, feq, dec, decFr, fNum } from './bin.mjs';

const T = (a, b, n, k) => termAt(a, b, n, k);
const ratioHits = (x, y, z) => { const hit = []; for (let n = 3; n <= 80; n++) for (let k = 1; k < n; k++) if (Cm(n, k - 1) * BigInt(y) === Cm(n, k) * BigInt(x) && Cm(n, k) * BigInt(z) === Cm(n, k + 1) * BigInt(y)) hit.push([n, k]); return hit; };

// ============================================================ Short answers, 3 marks
{
  const ex = expand(mon(3, 1), mon(-2, -1), 4); const s = polyTex(ex, ['x', 'z']);
  Q('s301', mk.short({ marks: 3, stem: r`Expand $\left(3x - \dfrac{2}{x}\right)^{4}$ and write each term in its simplest form.`, model: r`With coefficients $1, 4, 6, 4, 1$ and $a = 3x$, $b = -\dfrac{2}{x}$:

$(3x)^{4} + 4(3x)^{3}\left(-\dfrac{2}{x}\right) + 6(3x)^{2}\left(-\dfrac{2}{x}\right)^{2} + 4(3x)\left(-\dfrac{2}{x}\right)^{3} + \left(-\dfrac{2}{x}\right)^{4}$

$= 81x^{4} - 216x^{2} + 216 - \dfrac{96}{x^{2}} + \dfrac{16}{x^{4}}$.`, sol: 'Keep the sign of the second term inside its bracket before raising it to a power.', scheme: [['Five terms with coefficients $1, 4, 6, 4, 1$ and the correct powers', 1], ['Signs alternate because the second term is negative', 1], [`Simplified: $${s}$`, 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (C) => {
    C.assert(s === '81x^{4} - 216x^{2} + 216 - \\dfrac{96}{x^{2}} + \\dfrac{16}{x^{4}}', 'expansion by formula and multiplication'); C.model([81, 216, 96, 16]);
  });
}
{
  const a = mon(2, 1), b = mon(fr(-1, 3), -1), n = 10; const hit = range(0, n).filter((k) => T(a, b, n, k).e[0] === 0); const t = T(a, b, n, 5);
  Q('s302', mk.short({ marks: 3, stem: r`A constant term, free of $x$, appears when $\left(2x - \dfrac{1}{3x}\right)^{10}$ is expanded. Determine its exact value.`, model: r`$T_{r+1} = \binom{10}{r}(2x)^{10-r}\left(-\dfrac{1}{3x}\right)^{r} = \binom{10}{r}\,2^{10-r}\left(-\dfrac{1}{3}\right)^{r}x^{10-2r}$.

The term is free of $x$ when $10 - 2r = 0$, so $r = 5$, and it is the sixth term:

$T_{6} = \binom{10}{5}\,2^{5}\left(-\dfrac{1}{3}\right)^{5} = 252 \times 32 \times \left(-\dfrac{1}{243}\right) = -\dfrac{8064}{243} = -\dfrac{896}{27}$.`, sol: 'The power of $x$ is $(10 - r) - r$.', scheme: [['General term with the power $x^{10-2r}$', 1], ['$10 - 2r = 0$ gives $r = 5$, the sixth term', 1], ['$\\binom{10}{5}\\,2^{5}\\left(-\\dfrac{1}{3}\\right)^{5} = -\\dfrac{896}{27}$', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => {
    C.assert(hit.join() === '5' && t.c.n === -896n && t.c.d === 27n && 252 * 32 === 8064 && 8064 / 9 === 896 && 243 / 9 === 27, 'independent term -896/27 (formula and multiplication)'); C.model([252, 32, 243, 896, 27]);
  });
}
{
  const a = mon(2, 4), b = mon(-3, -1), n = 6; const hit = range(0, n).filter((k) => T(a, b, n, k).e[0] === -1); const t = T(a, b, n, 5);
  Q('s303', mk.short({ marks: 3, stem: r`After $\left(2x^{4} - \dfrac{3}{x}\right)^{6}$ is expanded, what number multiplies $\dfrac{1}{x}$?`, model: r`$T_{r+1} = \binom{6}{r}(2x^{4})^{6-r}\left(-\dfrac{3}{x}\right)^{r} = \binom{6}{r}\,2^{6-r}(-3)^{r}\,x^{24-5r}$.

We need $24 - 5r = -1$, so $r = 5$. The coefficient is $\binom{6}{5}\,2^{1}(-3)^{5} = 6 \times 2 \times (-243) = -2916$.`, sol: 'The power of $x$ is $4(6 - r) - r$.', scheme: [['Power of $x$ in $T_{r+1}$ is $24 - 5r$', 1], ['$24 - 5r = -1$ gives $r = 5$', 1], ['$\\binom{6}{5}\\,2\\,(-3)^{5} = -2916$', 1]], d: 3, c: 'application', t: [2], time: 140 }), (C) => {
    C.assert(hit.join() === '5' && t.c.n === -2916n && coefAt(expand(a, b, n), -1).n === -2916n && 6 * 2 * 243 === 2916, 'coefficient -2916'); C.model([6, 243, 2916]);
  });
}
{
  const a = mon(1, 1), b = mon(-2, 0, 1), n = 7; const t4 = T(a, b, n, 3), t5 = T(a, b, n, 4);
  Q('s304', mk.short({ marks: 3, stem: r`Determine the two terms that stand in the middle when $(u - 2v)^{7}$ is expanded.`, model: r`The expansion has $8$ terms, so there are two middle terms, $T_{4}$ and $T_{5}$.

$T_{4} = \binom{7}{3}u^{4}(-2v)^{3} = 35 \times (-8)\,u^{4}v^{3} = -280\,u^{4}v^{3}$.

$T_{5} = \binom{7}{4}u^{3}(-2v)^{4} = 35 \times 16\,u^{3}v^{4} = 560\,u^{3}v^{4}$.`, sol: 'Odd $n$ gives two middle terms.', scheme: [['Eight terms: $T_{4}$ and $T_{5}$', 1], ['$T_{4} = -280\\,u^{4}v^{3}$', 1], ['$T_{5} = 560\\,u^{3}v^{4}$', 1]], d: 3, c: 'application', t: [2], time: 140 }), (C) => {
    C.assert(t4.c.n === -280n && t5.c.n === 560n && t4.e.join() === '4,3' && t5.e.join() === '3,4' && 35 * 8 === 280 && 35 * 16 === 560 && coefAt(expand(a, b, n), 4, 3).n === -280n, 'T4 = -280, T5 = 560'); C.model([35, 280, 560]);
  });
}
{
  const a = mon(2, 5), b = mon(1, -2), n = 8; const hit = range(0, n).filter((k) => T(a, b, n, k).e[0] === 5); const t = T(a, b, n, 5);
  Q('s305', mk.short({ marks: 3, stem: r`Which term of the expansion of $\left(2x^{5} + \dfrac{1}{x^{2}}\right)^{8}$ contains $x^{5}$? Find that term.`, model: r`$T_{r+1} = \binom{8}{r}(2x^{5})^{8-r}\left(\dfrac{1}{x^{2}}\right)^{r} = \binom{8}{r}\,2^{8-r}\,x^{40-7r}$.

Setting $40 - 7r = 5$ gives $r = 5$, so $x^{5}$ is in the $6$th term:

$T_{6} = \binom{8}{5}\,2^{3}\,x^{5} = 56 \times 8\,x^{5} = 448\,x^{5}$.`, sol: 'The power of $x$ is $5(8 - r) - 2r$.', scheme: [['Power of $x$ in $T_{r+1}$ is $40 - 7r$', 1], ['$40 - 7r = 5$ gives $r = 5$, the $6$th term', 1], ['$T_{6} = 448x^{5}$', 1]], d: 3, c: 'application', t: [2], time: 140 }), (C) => {
    C.assert(hit.join() === '5' && t.c.n === 448n && 56 * 8 === 448 && coefAt(expand(a, b, n), 5).n === 448n, 'T6 = 448 x^5'); C.model([40, 56, 448]);
  });
}
{
  const ev = range(0, 16).filter((k) => k % 2 === 0).reduce((s, k) => s + Cm(16, k), 0n), od = range(0, 16).filter((k) => k % 2 === 1).reduce((s, k) => s + Cm(16, k), 0n);
  Q('s306', mk.short({ marks: 3, stem: r`By putting suitable values of $x$ in $(1 + x)^{n}$, show that $\binom{n}{0} + \binom{n}{2} + \binom{n}{4} + \cdots = 2^{n-1}$, and hence evaluate $\binom{16}{1} + \binom{16}{3} + \cdots + \binom{16}{15}$.`, model: r`$(1 + x)^{n} = \binom{n}{0} + \binom{n}{1}x + \binom{n}{2}x^{2} + \cdots$. Put $x = 1$: $E + O = 2^{n}$, where $E$ and $O$ are the sums of the even-numbered and odd-numbered coefficients. Put $x = -1$: $E - O = 0$. Adding gives $2E = 2^{n}$, so $E = 2^{n-1}$ and $O = 2^{n-1}$ too.

For $n = 16$ the required sum is $O = 2^{15} = 32768$.`, sol: 'Add and subtract the two substitutions.', scheme: [['$x = 1$ gives $E + O = 2^{n}$', 1], ['$x = -1$ gives $E - O = 0$, so $E = O = 2^{n-1}$', 1], ['For $n = 16$: $2^{15} = 32768$', 1]], d: 3, c: 'analysis', t: [3], time: 140 }), (C) => {
    C.assert(ev === 32768n && od === 32768n && 2n ** 15n === 32768n && range(1, 20).every((n) => range(0, n).filter((k) => k % 2 === 0).reduce((s, k) => s + Cm(n, k), 0n) === 2n ** BigInt(n - 1)), 'even = odd = 2^(n-1) for n = 1..20; n = 16 gives 32768'); C.model([32768]);
  });
}
{
  const hit = ratioHits(20, 35, 42);
  Q('s307', mk.short({ marks: 3, stem: r`Three consecutive coefficients in the expansion of $(1 + x)^{n}$ are in the ratio $20 : 35 : 42$. Find $n$ and the position of the first of these coefficients.`, model: r`Let the coefficients be $\binom{n}{r-1}, \binom{n}{r}, \binom{n}{r+1}$. Using $\dfrac{\binom{n}{k}}{\binom{n}{k-1}} = \dfrac{n - k + 1}{k}$:

$\dfrac{n - r + 1}{r} = \dfrac{35}{20} = \dfrac{7}{4}$ gives $4n - 11r + 4 = 0$, and $\dfrac{n - r}{r + 1} = \dfrac{42}{35} = \dfrac{6}{5}$ gives $5n - 11r - 6 = 0$.

Subtracting, $n = 10$, and then $11r = 44$, so $r = 4$. The coefficients are $\binom{10}{3}, \binom{10}{4}, \binom{10}{5} = 120, 210, 252$, which are $6$ times $20, 35, 42$, and the first is in the $4$th term.`, sol: 'Two ratios give two linear equations in $n$ and $r$.', scheme: [['Both ratios written with $\\dfrac{n - k + 1}{k}$', 1], ['$4n - 11r + 4 = 0$ and $5n - 11r - 6 = 0$', 1], ['$n = 10$, $r = 4$, checked with $120, 210, 252$', 1]], d: 4, c: 'analysis', t: [3], time: 170 }), (C) => {
    C.assert(hit.length === 1 && hit[0].join() === '10,4' && Cm(10, 3) === 120n && Cm(10, 4) === 210n && Cm(10, 5) === 252n && 120 * 7 === 840 && 6 * 20 === 120 && 6 * 35 === 210 && 6 * 42 === 252, 'n = 10, r = 4 by search'); C.model([4, 11, 10, 120, 210, 252]);
  });
}
{
  const x = decFr('0.02'); const ts = range(0, 2).map((k) => fmul(fr(Cm(20, k)), fpow(x, k))); const three = ts.reduce(fadd, fr(0)); const exact = fmul(fr(102n ** 20n), fr(1, 100n ** 20n));
  Q('s308', mk.short({ marks: 3, stem: r`Show, by using the first three terms of the binomial expansion, that $1.02^{20} > 1.4$.`, model: r`$1.02^{20} = (1 + 0.02)^{20} = 1 + 20(0.02) + \binom{20}{2}(0.02)^{2} + \cdots$. Every term is positive, so $1.02^{20}$ is greater than the sum of the first three terms: $1 + 0.4 + 190 \times 0.0004 = 1 + 0.4 + 0.076 = 1.476$. Since $1.476 > 1.4$, we get $1.02^{20} > 1.4$.`, sol: 'Dropping positive terms gives a lower bound.', scheme: [['Expansion of $(1 + 0.02)^{20}$ with all terms positive', 1], ['First three terms: $1 + 0.4 + 0.076 = 1.476$', 1], ['$1.476 > 1.4$, so the result follows', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => {
    C.assert(dec(three, 3) === '1.476' && fNum(exact) > 1.476 && Cm(20, 2) === 190n, 'three terms 1.476 < 1.02^20 (1.4859)'); C.model([0.4, 190, 0.076, 1.476, 1.4]);
  });
}
{
  const ok = range(1, 40).every((n) => (6n ** BigInt(n) - 5n * BigInt(n) - 1n) % 25n === 0n && (6n ** BigInt(n) - 5n * BigInt(n) - 1n) / 25n === range(2, n).reduce((s, k) => s + Cm(n, k) * 5n ** BigInt(k - 2), 0n));
  Q('s309', mk.short({ marks: 3, stem: r`Use the binomial theorem to prove that $6^{n} - 5n - 1$ is divisible by $25$ for every positive integer $n$.`, model: r`Write $6^{n} = (1 + 5)^{n} = 1 + \binom{n}{1}5 + \binom{n}{2}5^{2} + \binom{n}{3}5^{3} + \cdots + 5^{n}$.

So $6^{n} - 5n - 1 = \binom{n}{2}5^{2} + \binom{n}{3}5^{3} + \cdots + 5^{n}$. Every remaining term has the factor $5^{2} = 25$, so $6^{n} - 5n - 1 = 25\left[\binom{n}{2} + 5\binom{n}{3} + \cdots + 5^{n-2}\right]$, a multiple of $25$.`, sol: 'Split $6$ as $1 + 5$ and peel off the first two terms.', scheme: [['$6^{n} = (1 + 5)^{n}$ expanded', 1], ['The first two terms are $1$ and $5n$, so they cancel with $-5n - 1$', 1], ['Every other term has a factor $25$', 1]], d: 4, c: 'analysis', t: [3], time: 150 }), (C) => {
    C.assert(ok, 'divisible by 25 and the quotient is the bracketed sum, n = 1..40'); C.model([25]);
  });
}
{
  const x = decFr('-0.02'); const ts = range(0, 3).map((k) => fmul(fr(Cm(7, k)), fpow(x, k))); const four = ts.reduce(fadd, fr(0)); const exact = fmul(fr(98n ** 7n), fr(1, 100n ** 7n));
  Q('s310', mk.short({ marks: 3, stem: r`Writing $0.98$ as $1 - 0.02$, use the first four terms of the binomial expansion to find $0.98^{7}$ correct to four decimal places.`, model: r`$0.98^{7} = (1 - 0.02)^{7} \approx 1 - 7(0.02) + 21(0.02)^{2} - 35(0.02)^{3} = 1 - 0.14 + 0.0084 - 0.00028 = 0.86812$. Correct to four decimal places, $0.98^{7} = 0.8681$.`, sol: 'Alternate the signs because the second term is $-0.02$.', scheme: [['$(1 - 0.02)^{7}$ with alternating signs', 1], ['Terms $1, 0.14, 0.0084, 0.00028$', 1], ['$0.86812 \\approx 0.8681$', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => {
    C.assert(dec(four, 5) === '0.86812' && dec(four, 4) === '0.8681' && dec(exact, 4) === '0.8681', 'four terms 0.86812; exact 0.8681255'); C.model([0.14, 0.0084, 0.00028, 0.86812, 0.8681]);
  });
}
{
  const a = mon(2, 1), b = mon(-1, -2), n = 9; const t = T(a, b, n, 7); const fromEnd = termAt(a, b, n, n - 3 + 1); // third from the end
  Q('s311', mk.short({ marks: 3, stem: r`Find the third term from the end in the expansion of $\left(2x - \dfrac{1}{x^{2}}\right)^{9}$.`, model: r`There are $10$ terms, so the third term from the end is the $10 - 3 + 1 = 8$th term, $T_{8}$ with $r = 7$ (the terms counted from the end are $T_{10}, T_{9}, T_{8}$).

$T_{8} = \binom{9}{7}(2x)^{2}\left(-\dfrac{1}{x^{2}}\right)^{7} = 36 \times 4x^{2} \times \left(-\dfrac{1}{x^{14}}\right) = -144x^{-12} = -\dfrac{144}{x^{12}}$.`, sol: 'The $k$th term from the end is the $(n + 2 - k)$th term from the start.', scheme: [['Third from the end is $T_{8}$, so $r = 7$', 1], ['$\\binom{9}{7} = 36$ and $(2x)^{2} = 4x^{2}$', 1], ['$-\\dfrac{144}{x^{12}}$', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => {
    C.assert(t.c.n === -144n && t.e[0] === -12 && sameT(t, fromEnd) && Cm(9, 7) === 36n && terms(expand(a, b, n)).slice().reverse()[2].c.n === -144n, 'T8 = -144 x^-12, third from the end'); C.model([10, 8, 36, 144]);
  });
}
function sameT(u, v) { return u.c.n === v.c.n && u.c.d === v.c.d && u.e.join() === v.e.join(); }

// ============================================================ Long answers, 5 marks (in parts)
{
  const a = mon(1, 3), b = mon(fr(-1, 2), -1), n = 12;
  const t4 = T(a, b, n, 3), c20 = coefAt(expand(a, b, n), 20), ind = T(a, b, n, 9);
  const h20 = range(0, n).filter((k) => T(a, b, n, k).e[0] === 20), h0 = range(0, n).filter((k) => T(a, b, n, k).e[0] === 0);
  const gt = range(0, n).every((k) => { const t = T(a, b, n, k); return t.e[0] === 36 - 4 * k && feq(t.c, fmul(fr(Cm(12, k)), fpow(fr(-1, 2), k))); });
  Q('l01', mk.long({ stem: r`For the expansion of $\left(x^{3} - \dfrac{1}{2x}\right)^{12}$, find

(a) the general term in its simplest form, [1]

(b) the fourth term, [1]

(c) the coefficient of $x^{20}$, [1]

(d) the term independent of $x$. [2]`, model: r`(a) $T_{r+1} = \binom{12}{r}(x^{3})^{12-r}\left(-\dfrac{1}{2x}\right)^{r} = \binom{12}{r}\left(-\dfrac{1}{2}\right)^{r}x^{36-4r}$.

(b) The fourth term has $r = 3$: $\binom{12}{3}\left(-\dfrac{1}{2}\right)^{3}x^{24} = 220 \times \left(-\dfrac{1}{8}\right)x^{24} = -\dfrac{55}{2}\,x^{24}$.

(c) $36 - 4r = 20$ gives $r = 4$, and the coefficient is $\binom{12}{4}\left(-\dfrac{1}{2}\right)^{4} = \dfrac{495}{16}$.

(d) $36 - 4r = 0$ gives $r = 9$, the tenth term: $\binom{12}{9}\left(-\dfrac{1}{2}\right)^{9} = 220 \times \left(-\dfrac{1}{512}\right) = -\dfrac{55}{128}$.`, sol: 'Reduce every part to the power $36 - 4r$.', scheme: [['(a) general term with $x^{36-4r}$', 1], ['(b) $r = 3$: $-\\dfrac{55}{2}x^{24}$', 1], ['(c) $r = 4$: coefficient $\\dfrac{495}{16}$', 1], ['(d) $36 - 4r = 0$ gives $r = 9$', 1], ['(d) value $-\\dfrac{55}{128}$', 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => {
    C.assert(gt && t4.c.n === -55n && t4.c.d === 2n && t4.e[0] === 24 && h20.join() === '4' && c20.n === 495n && c20.d === 16n && h0.join() === '9' && ind.c.n === -55n && ind.c.d === 128n, 'general term, T4 = -55/2 x^24, 495/16, -55/128'); C.model([36, 55, 24, 495, 16, 9, 128]);
  });
}
{
  const a = mon(3, 1), b = mon(-1, 0, 1), n = 9; const t5 = T(a, b, n, 4), t6 = T(a, b, n, 5);
  const ratio = fmul(t6.c, fr(t5.c.d, t5.c.n)); const byFormula = fmul(fr(n - 5 + 1, 5), fr(-1, 3));
  Q('l02', mk.long({ stem: r`In the expansion of $(3x - y)^{9}$, find

(a) the number of terms, [1]

(b) the middle terms, [2]

(c) the ratio $T_{6} : T_{5}$ of the two middle terms, in terms of $x$ and $y$. [2]`, model: r`(a) The expansion has $9 + 1 = 10$ terms.

(b) With $10$ terms the middle terms are $T_{5}$ and $T_{6}$.

$T_{5} = \binom{9}{4}(3x)^{5}(-y)^{4} = 126 \times 243\,x^{5}y^{4} = 30618\,x^{5}y^{4}$.

$T_{6} = \binom{9}{5}(3x)^{4}(-y)^{5} = 126 \times 81 \times (-1)\,x^{4}y^{5} = -10206\,x^{4}y^{5}$.

(c) $\dfrac{T_{6}}{T_{5}} = \dfrac{-10206\,x^{4}y^{5}}{30618\,x^{5}y^{4}} = -\dfrac{y}{3x}$. This agrees with $\dfrac{T_{r+1}}{T_{r}} = \dfrac{n - r + 1}{r} \cdot \dfrac{b}{a}$ for $r = 5$: $\dfrac{5}{5} \times \dfrac{-y}{3x}$.`, sol: 'Odd $n$ would give one middle term; here $n = 9$ is odd so there are two.', scheme: [['(a) $10$ terms', 1], ['(b) middle terms are $T_{5}$ and $T_{6}$', 1], ['(b) $T_{5} = 30618x^{5}y^{4}$ and $T_{6} = -10206x^{4}y^{5}$', 1], ['(c) divide to get $-\\dfrac{y}{3x}$', 1], ['(c) check with the ratio formula', 1]], d: 4, c: 'application', t: [2, 3], time: 330 }), (C) => {
    C.assert(terms(expand(a, b, n)).length === 10 && t5.c.n === 30618n && t6.c.n === -10206n && 126 * 243 === 30618 && 126 * 81 === 10206 && t5.e.join() === '5,4' && t6.e.join() === '4,5' && ratio.n === -1n && ratio.d === 3n && feq(byFormula, fr(-1, 3)), 'T5 = 30618 x^5 y^4, T6 = -10206 x^4 y^5, ratio -y/(3x)'); C.model([10, 126, 243, 30618, 81, 10206, 3]);
  });
}
{
  // proof by induction: verified numerically for n = 1..14 with general monomials, and Pascal's rule for all k <= 14
  const pas = range(1, 14).every((k) => range(1, k).every((j) => Cm(k, j) + Cm(k, j - 1) === Cm(k + 1, j)));
  const thm = range(1, 14).every((n) => { const ex = expand(mon(1, 1), mon(1, 0, 1), n); return range(0, n).every((k) => coefAt(ex, n - k, k).n === Cm(n, k)) && terms(ex).length === n + 1; });
  Q('l03', mk.long({ stem: r`Prove by induction that for every positive integer $n$,

$(a + b)^{n} = \binom{n}{0}a^{n} + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^{2} + \cdots + \binom{n}{n}b^{n}$.

You may use Pascal's rule $\binom{k}{r} + \binom{k}{r-1} = \binom{k+1}{r}$ without proof.`, model: r`**Base case.** For $n = 1$ the right side is $\binom{1}{0}a + \binom{1}{1}b = a + b$, which equals the left side.

**Assumption.** Suppose the result holds for $n = k$: $(a + b)^{k} = \sum_{r=0}^{k}\binom{k}{r}a^{k-r}b^{r}$.

**Step.** Multiply both sides by $(a + b)$:
$(a + b)^{k+1} = \sum_{r=0}^{k}\binom{k}{r}a^{k+1-r}b^{r} + \sum_{r=0}^{k}\binom{k}{r}a^{k-r}b^{r+1}$.

In the second sum put $s = r + 1$, so it becomes $\sum_{s=1}^{k+1}\binom{k}{s-1}a^{k+1-s}b^{s}$.

The coefficient of $a^{k+1-r}b^{r}$ for $1 \le r \le k$ is therefore $\binom{k}{r} + \binom{k}{r-1} = \binom{k+1}{r}$ by Pascal's rule. The end terms are $\binom{k}{0}a^{k+1} = \binom{k+1}{0}a^{k+1}$ and $\binom{k}{k}b^{k+1} = \binom{k+1}{k+1}b^{k+1}$.

Hence $(a + b)^{k+1} = \sum_{r=0}^{k+1}\binom{k+1}{r}a^{k+1-r}b^{r}$: the result holds for $n = k + 1$.

**Conclusion.** The result is true for $n = 1$, and true for $k + 1$ whenever true for $k$, so by induction it is true for every positive integer $n$.`, sol: 'Multiply by $(a + b)$, shift the index in one sum, and combine with Pascal\'s rule.', scheme: [['Base case $n = 1$ checked', 1], ['Assume the result for $n = k$ and multiply by $(a + b)$', 1], ['Shift the index of the second sum so the powers match', 1], ['Combine coefficients with Pascal\'s rule and treat the end terms', 1], ['State that the result holds for $k + 1$ and conclude by induction', 1]], d: 4, c: 'analysis', t: [1], time: 420 }), (C) => {
    C.assert(pas && thm && Cm(1, 0) + Cm(1, 1) === 2n, 'Pascal rule for k <= 14 and the theorem for n = 1..14 by repeated multiplication'); C.model(['Pascal', 'induction', 'Base case', 'k + 1']);
  });
}
{
  const x = decFr('0.01'); const row = pascalRow(7);
  const t4 = range(0, 3).map((k) => fmul(fr(Cm(7, k)), fpow(x, k))); const up = t4.reduce(fadd, fr(0));
  const t4m = range(0, 3).map((k) => fmul(fr(Cm(7, k)), fpow(fr(-1, 100), k))); const dn = t4m.reduce(fadd, fr(0));
  const ex1 = fmul(fr(101n ** 7n), fr(1, 100n ** 7n)), ex2 = fmul(fr(99n ** 7n), fr(1, 100n ** 7n)); const sum = fadd(ex1, ex2);
  const evenSum = fmul(fr(2), [0, 2, 4, 6].reduce((s, k) => fadd(s, fmul(fr(Cm(7, k)), fpow(x, k))), fr(0)));
  Q('l04', mk.long({ stem: r`Let $x$ be small.

(a) Write the first four terms of the expansion of $(1 + x)^{7}$ in ascending powers of $x$. [1]

(b) Use $x = 0.01$ to find $1.01^{7}$ correct to four decimal places. [1]

(c) Use $x = -0.01$ to find $0.99^{7}$ correct to four decimal places. [1]

(d) Show that $1.01^{7} + 0.99^{7} = 2\left[1 + 21x^{2} + 35x^{4} + 7x^{6}\right]$ with $x = 0.01$ and find its value correct to six decimal places. [2]`, model: r`(a) $(1 + x)^{7} = 1 + 7x + 21x^{2} + 35x^{3} + \cdots$.

(b) $1.01^{7} \approx 1 + 0.07 + 21(0.0001) + 35(0.000001) = 1 + 0.07 + 0.0021 + 0.000035 = 1.072135$, which is $1.0721$ to four decimal places.

(c) $0.99^{7} \approx 1 - 0.07 + 0.0021 - 0.000035 = 0.932065$, which is $0.9321$ to four decimal places.

(d) In $(1 + x)^{7} + (1 - x)^{7}$ the odd powers of $x$ cancel and the even powers double, so the sum is $2\left[1 + \binom{7}{2}x^{2} + \binom{7}{4}x^{4} + \binom{7}{6}x^{6}\right] = 2\left[1 + 21x^{2} + 35x^{4} + 7x^{6}\right]$. With $x = 0.01$: $2\left[1 + 0.0021 + 0.00000035 + 0.000000000007\right] = 2.0042007$, which is $2.004201$ to six decimal places.`, sol: 'Four terms are enough for four places; for (d) only the even powers survive.', scheme: [['(a) $1 + 7x + 21x^{2} + 35x^{3}$', 1], ['(b) $1.072135 \\approx 1.0721$', 1], ['(c) $0.932065 \\approx 0.9321$', 1], ['(d) odd powers cancel, giving $2[1 + 21x^{2} + 35x^{4} + 7x^{6}]$', 1], ['(d) value $2.004201$', 1]], d: 3, c: 'application', t: [3], time: 330 }), (C) => {
    C.assert(row.slice(0, 4).join() === '1,7,21,35' && dec(up, 6) === '1.072135' && dec(up, 4) === '1.0721' && dec(ex1, 4) === '1.0721' && dec(dn, 6) === '0.932065' && dec(dn, 4) === '0.9321' && dec(ex2, 4) === '0.9321' && dec(evenSum, 6) === '2.004201' && dec(sum, 6) === '2.004201' && dec(evenSum, 7) === '2.0042007', 'four-term values and the even-power sum 2.0042007'); C.model([0.07, 0.0021, 1.072135, 0.932065, 21, 35, 2.0042007]);
  });
}
{
  const a = mon(1, 1), b = mon(-2, 0, 1), n = 5; const odd = coefAt(expand(mon(1, 1), mon(2, 0, 1), 5), 0, 5), diff = expand(a, b, n);
  const sumP = new Map(); const pl = expand(mon(1, 1), mon(2, 0, 1), 5), mi = expand(mon(1, 1), mon(-2, 0, 1), 5);
  const pairs = [[5, 0], [3, 2], [1, 4]].map(([ex, ey]) => fadd(coefAt(pl, ex, ey), coefAt(mi, ex, ey)).n);
  const rest = [[4, 1], [2, 3], [0, 5]].map(([ex, ey]) => fadd(coefAt(pl, ex, ey), coefAt(mi, ex, ey)).n);
  Q('l05', mk.long({ stem: r`(a) Use row $4$ of Pascal's triangle, $1, 4, 6, 4, 1$, to write row $5$. [1]

(b) Expand $(m - 2n)^{5}$. [2]

(c) Hence simplify $(m + 2n)^{5} + (m - 2n)^{5}$. [2]`, model: r`(a) Row $5$ is $1,\ 1 + 4,\ 4 + 6,\ 6 + 4,\ 4 + 1,\ 1$, that is $1, 5, 10, 10, 5, 1$.

(b) $(m - 2n)^{5} = m^{5} + 5m^{4}(-2n) + 10m^{3}(-2n)^{2} + 10m^{2}(-2n)^{3} + 5m(-2n)^{4} + (-2n)^{5} = ${polyTex(diff, ['m', 'n'])}$.

(c) In $(m + 2n)^{5}$ the signs are all positive, so adding it to the expansion in (b) cancels the terms with an odd power of $n$ and doubles the others: $(m + 2n)^{5} + (m - 2n)^{5} = 2m^{5} + 80m^{3}n^{2} + 160mn^{4}$.`, sol: 'Odd powers of $n$ cancel in the sum.', scheme: [['(a) $1, 5, 10, 10, 5, 1$', 1], ['(b) terms with the signs of $(-2n)^{r}$', 1], ['(b) $m^{5} - 10m^{4}n + 40m^{3}n^{2} - 80m^{2}n^{3} + 80mn^{4} - 32n^{5}$', 1], ['(c) odd powers of $n$ cancel', 1], ['(c) $2m^{5} + 80m^{3}n^{2} + 160mn^{4}$', 1]], d: 3, c: 'application', t: [1, 2], time: 330 }), (C) => {
    C.assert(pascalRow(5).join() === '1,5,10,10,5,1' && polyTex(diff, ['m', 'n']) === 'm^{5} - 10m^{4}n + 40m^{3}n^{2} - 80m^{2}n^{3} + 80mn^{4} - 32n^{5}' && pairs.join() === '2,80,160' && rest.join() === '0,0,0' && odd.n === 32n, '(m - 2n)^5 and the sum 2m^5 + 80m^3n^2 + 160mn^4 by multiplication'); C.model([5, 10, 40, 80, 32, 2, 160]);
  });
}
{
  const sol = range(2, 60).filter((n) => 2n * Cm(n, 2) === Cm(n, 1) + Cm(n, 3)); const ok = sol.filter((n) => n >= 3);
  Q('l06', mk.long({ stem: r`The coefficients of the second, third and fourth terms in the expansion of $(1 + x)^{n}$ are in arithmetic progression.

(a) Write the three coefficients. [1]

(b) Form an equation in $n$ and simplify it to a quadratic. [2]

(c) Solve it and state, with a reason, which root is acceptable. Verify your answer. [2]`, model: r`(a) The second, third and fourth terms have $r = 1, 2, 3$, so the coefficients are $\binom{n}{1} = n$, $\binom{n}{2} = \dfrac{n(n-1)}{2}$ and $\binom{n}{3} = \dfrac{n(n-1)(n-2)}{6}$.

(b) In an arithmetic progression, twice the middle term equals the sum of the others: $2\binom{n}{2} = \binom{n}{1} + \binom{n}{3}$, that is $n(n-1) = n + \dfrac{n(n-1)(n-2)}{6}$. Dividing by $n$ (non-zero) and multiplying by $6$: $6(n - 1) = 6 + (n - 1)(n - 2)$, which simplifies to $n^{2} - 9n + 14 = 0$.

(c) $(n - 2)(n - 7) = 0$, so $n = 2$ or $n = 7$. The expansion needs a fourth term, so $n \ge 3$ and $n = 2$ is rejected. So $n = 7$. Check: the coefficients are $7, 21, 35$, with common difference $14$.`, sol: 'Reject any root for which the fourth term does not exist.', scheme: [['(a) $n$, $\\dfrac{n(n-1)}{2}$, $\\dfrac{n(n-1)(n-2)}{6}$', 1], ['(b) $2\\binom{n}{2} = \\binom{n}{1} + \\binom{n}{3}$', 1], ['(b) quadratic $n^{2} - 9n + 14 = 0$', 1], ['(c) roots $2$ and $7$; reject $n = 2$ because there is no fourth term', 1], ['(c) $n = 7$ checked with $7, 21, 35$', 1]], d: 4, c: 'analysis', t: [3], time: 360 }), (C) => {
    C.assert(sol.join() === '2,7' && ok.join() === '7' && Cm(7, 1) === 7n && Cm(7, 2) === 21n && Cm(7, 3) === 35n && 21 - 7 === 14 && 35 - 21 === 14 && 9 * 9 - 4 * 14 === 25, 'n = 2 or 7 (formal); only n = 7 has a fourth term'); C.model([6, 9, 14, 2, 7, 35]);
  });
}
{
  const ok = range(1, 12).every((h) => { const mid = termAt(mon(1), mon(1, 1), 2 * h, h); let od = 1n; for (let i = 1; i <= h; i++) od *= BigInt(2 * i - 1); return mid.c.n * F(h) === od * 2n ** BigInt(h); });
  const m5 = Cm(10, 5), chk5 = (1n * 3n * 5n * 7n * 9n) * 2n ** 5n / F(5);
  Q('l07', mk.long({ stem: r`(a) State the number of terms in the expansion of $(1 + x)^{2n}$ and name the middle term. [1]

(b) Find the middle term. [1]

(c) Show that the middle term is $\dfrac{1 \cdot 3 \cdot 5 \cdots (2n - 1)}{n!}\,2^{n}x^{n}$. [2]

(d) Verify the formula for $n = 5$. [1]`, model: r`(a) The expansion has $2n + 1$ terms, an odd number, so the middle term is $T_{n+1}$.

(b) With $r = n$ the middle term is $\binom{2n}{n}x^{n}$.

(c) $\binom{2n}{n} = \dfrac{(2n)!}{n!\,n!}$. Split $(2n)!$ into the products of the odd and the even factors: $(2n)! = \left[1 \cdot 3 \cdot 5 \cdots (2n - 1)\right]\left[2 \cdot 4 \cdot 6 \cdots 2n\right]$, and $2 \cdot 4 \cdots 2n = 2^{n}\,n!$. Then $\dfrac{(2n)!}{n!\,n!} = \dfrac{1 \cdot 3 \cdot 5 \cdots (2n - 1) \cdot 2^{n}\,n!}{n!\,n!} = \dfrac{1 \cdot 3 \cdot 5 \cdots (2n - 1)}{n!}\,2^{n}$.

(d) For $n = 5$: $\binom{10}{5} = 252$. The formula gives $\dfrac{1 \cdot 3 \cdot 5 \cdot 7 \cdot 9}{5!} \times 2^{5} = \dfrac{945}{120} \times 32 = 252$.`, sol: 'Write $(2n)!$ as odd factors times even factors.', scheme: [['(a) $2n + 1$ terms; middle term is $T_{n+1}$', 1], ['(b) $\\binom{2n}{n}x^{n}$', 1], ['(c) split $(2n)!$ into odd and even factors', 1], ['(c) use $2 \\cdot 4 \\cdots 2n = 2^{n}\\,n!$ and cancel', 1], ['(d) $945/120 \\times 32 = 252$', 1]], d: 4, c: 'analysis', t: [2], time: 400 }), (C) => {
    C.assert(ok && m5 === 252n && chk5 === 252n && 945n * 32n / 120n === 252n && 1 * 3 * 5 * 7 * 9 === 945, 'middle coefficient formula for n = 1..12 and n = 5 gives 252'); C.model([2, 252, 945, 120, 32]);
  });
}

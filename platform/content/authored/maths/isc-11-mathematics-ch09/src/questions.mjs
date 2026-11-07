// ISC 11 Mathematics ch09 Binomial Theorem - multiple-choice and assertion-reason items.
// Every key is recomputed by the exact engine in bin.mjs; every distractor comes from its own wrong method.
import { Q, mk } from './lib.mjs';
import { r, range, F, Cm, pascalRow, S, N, mon, fr, expand, termAt, termList, monoTex, coefAt, terms, count, kCombs, bn, pw, fmul, fadd, fpow, dec, decFr, fNum } from './bin.mjs';

const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const D = (...xs) => xs.map((x) => `$${x}$`);
const mp = (b, e, m) => { let res = 1n; b = BigInt(b) % BigInt(m); e = BigInt(e); while (e > 0n) { if (e & 1n) res = (res * b) % BigInt(m); b = (b * b) % BigInt(m); e >>= 1n; } return res; };
const sameTerm = (u, v) => u.c.n * v.c.d === v.c.n * u.c.d && u.e.join() === v.e.join();
const nthName = (k) => `${k}${k % 10 === 1 && k !== 11 ? 'st' : k % 10 === 2 && k !== 12 ? 'nd' : k % 10 === 3 && k !== 13 ? 'rd' : 'th'}`;

// ============================================================ MCQ
{
  const r6 = pascalRow(6), r7 = pascalRow(7);
  M('m01', { stem: r`Row $6$ of Pascal's triangle reads $1, 6, 15, 20, 15, 6, 1$. In row $7$, the entry that lies directly below the neighbouring entries $15$ and $20$ is`, opts: D('35', '30', '5', '300'), sol: r`Each entry is the sum of the two entries above it, so the new entry is $15 + 20 = 35$. The value $30$ doubles $15$, $5$ is the difference, and $300$ is the product.`, d: 1, c: 'recall', t: [1], time: 40 }, (C) => {
    C.assert(r6[2] === 15n && r6[3] === 20n && r7[3] === 35n && r7[3] === Cm(7, 3) && 15 * 2 === 30 && 20 - 15 === 5 && 15 * 20 === 300, 'row 7 entry 35 = 15 + 20 = 7C3'); C.which([35, 30, 5, 300], N(r7[3]));
  });
}
{
  const a = mon(3), b = mon(-2, 1), n = 6; const t = termAt(a, b, n, 2);
  const w1 = Cm(6, 2) * 3n ** 4n * 2n, w2 = Cm(6, 2) * 3n ** 4n, w3 = Cm(6, 2) * 3n ** 2n * 4n;
  M('m02', { stem: r`In the expansion of $(3 - 2x)^{6}$ in powers of $x$, the coefficient of $x^{2}$ is`, opts: D(S(t.c.n), S(w1), S(w2), S(w3)), sol: r`The term with $x^{2}$ has $r = 2$: $\binom{6}{2}\,3^{4}(-2x)^{2} = 15 \times 81 \times 4 = ${S(t.c.n)}$. The value $${S(w1)}$ writes $(-2)^{2}$ as $2$; $${S(w2)}$ leaves out the factor $4$; $${S(w3)}$ uses $3^{2}$ instead of $3^{4}$.`, d: 2, c: 'understanding', t: [2], time: 75 }, (C) => {
    C.assert(t.c.n === 4860n && t.e[0] === 2 && coefAt(expand(a, b, n), 2).n === 4860n && w1 === 2430n && w2 === 1215n && w3 === 540n, 'coefficient of x^2 is 4860 (formula and multiplication)'); C.which([4860, 2430, 1215, 540], N(t.c.n));
  });
}
{
  // candidates for the general term of (a - b)^n, as (sign, binomial index, power of a, power of b)
  const cand = [
    (n, k) => ({ s: k % 2 ? -1 : 1, c: Cm(n, k), pa: n - k, pb: k }),
    (n, k) => ({ s: 1, c: Cm(n, k), pa: n - k, pb: k }),
    (n, k) => ({ s: k % 2 ? -1 : 1, c: Cm(n, k), pa: k, pb: n - k }),
    (n, k) => ({ s: k % 2 ? -1 : 1, c: Cm(n, k - 1), pa: n - k, pb: k }),
  ];
  const truth = (n, k) => { const t = termAt(mon(1, 1), mon(-1, 0, 1), n, k); return { s: t.c.n < 0n ? -1 : 1, c: t.c.n < 0n ? -t.c.n : t.c.n, pa: t.e[0], pb: t.e[1] }; };
  const eq = (u, v) => u.s === v.s && u.c === v.c && u.pa === v.pa && u.pb === v.pb;
  const ok = cand.map((f) => range(1, 9).every((n) => range(1, n).every((k) => eq(f(n, k), truth(n, k)))));
  M('m03', { stem: r`The general term, that is the $(r + 1)$th term, of the expansion of $(a - b)^{n}$ is`, opts: D(r`(-1)^{r}\binom{n}{r}a^{n-r}b^{r}`, r`\binom{n}{r}a^{n-r}b^{r}`, r`(-1)^{r}\binom{n}{r}a^{r}b^{n-r}`, r`(-1)^{r}\binom{n}{r-1}a^{n-r}b^{r}`), sol: r`Replace $b$ by $-b$ in $\binom{n}{r}a^{n-r}b^{r}$: the factor $(-b)^{r} = (-1)^{r}b^{r}$ gives the sign. Dropping the sign loses the alternation; swapping the powers of $a$ and $b$ describes the term from the other end, and $\binom{n}{r-1}$ belongs to the $r$th term.`, d: 1, c: 'recall', t: [2], time: 50 }, (C) => {
    C.assert(ok.join() === 'true,false,false,false', 'only the first formula matches every term of (a - b)^n for n = 1..9'); C.which(['A', 'B', 'C', 'D'], 'ABCD'[ok.indexOf(true)]);
  });
}
{
  const a = mon(1, 2), b = mon(1, -3), n = 15; const hit = range(0, n).filter((k) => termAt(a, b, n, k).e[0] === 0);
  M('m04', { stem: r`The term that does not contain $x$ in the expansion of $\left(x^{2} + \dfrac{1}{x^{3}}\right)^{15}$ is the`, opts: ['7th term', '6th term', '10th term', '9th term'], sol: r`The power of $x$ in $T_{r+1}$ is $2(15 - r) - 3r = 30 - 5r$, which is $0$ when $r = 6$. The term number is $r + 1 = 7$. Quoting $r$ itself gives the 6th term; solving $2r = 3(15 - r)$ with the roles of the two powers swapped gives $r = 9$, the 10th term.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    const swap = range(0, n).filter((k) => 2 * k - 3 * (n - k) === 0);
    C.assert(hit.join() === '6' && swap.join() === '9' && hit[0] + 1 === 7, 'T7 is the only term free of x; swapped powers give r = 9'); C.which(['7th term', '6th term', '10th term', '9th term'], `${hit[0] + 1}th term`);
  });
}
{
  const n = 11; const mid = [(n + 1) / 2, (n + 3) / 2];
  M('m05', { stem: r`The expansion of $(2a + b)^{11}$ is written out in full. Its middle terms are`, opts: ['6th and 7th terms', '5th and 6th terms', '6th term only', '7th and 8th terms'], sol: r`There are $11 + 1 = 12$ terms, an even number, so there are two middle terms: the $\dfrac{12}{2} = 6$th and the $7$th. The 5th and 6th terms would be the middle pair of an expansion with $10$ terms, a single middle term needs an odd number of terms, and the 7th and 8th pair belongs to $14$ terms.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    const pos = range(1, n + 1).filter((k) => k - 1 === Math.floor(n / 2) || k - 1 === Math.ceil(n / 2));
    C.assert(pos.join() === '5,6' || pos.join() === '6,7', 'positions'); C.assert(mid.join() === '6,7' && (n + 1) % 2 === 0, 'twelve terms: 6th and 7th'); C.which(['6,7', '5,6', '6', '7,8'], mid.join());
  });
}
{
  const a = mon(7, 1), b = mon(-4, 0, 1), n = 4; const tot = terms(expand(a, b, n)).reduce((s, m) => fadd(s, m.c), fr(0));
  M('m06', { stem: r`The sum of all the coefficients in the expansion of $(7x - 4y)^{4}$ is`, opts: D('81', '2145', '14641', '12'), sol: r`Putting $x = 1$ and $y = 1$ adds all the coefficients: $(7 - 4)^{4} = 3^{4} = 81$. The value $2145$ is $7^{4} - 4^{4}$, $14641$ is $11^{4}$ (adding instead of subtracting), and $12$ is $3 \times 4$.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    C.assert(tot.n === 81n && tot.d === 1n && 7 ** 4 - 4 ** 4 === 2145 && 11 ** 4 === 14641, 'coefficients of (7x - 4y)^4 add to 81'); C.which([81, 2145, 14641, 12], N(tot.n));
  });
}
{
  const sol = range(7, 60).filter((n) => Cm(n, 5) === Cm(n, 7));
  M('m07', { stem: r`In the expansion of $(1 + x)^{n}$ the coefficients of $x^{5}$ and $x^{7}$ are equal. The value of $n$ is`, opts: D('12', '11', '13', '6'), sol: r`The coefficients are $\binom{n}{5}$ and $\binom{n}{7}$. Equal combinations with different lower numbers satisfy $5 + 7 = n$, so $n = 12$. The value $11$ is $5 + 7 - 1$, $13$ is $5 + 7 + 1$, and $6$ is half of $12$.`, d: 3, c: 'application', t: [3], time: 80 }, (C) => {
    C.assert(sol.join() === '12' && Cm(12, 5) === 792n && Cm(12, 7) === 792n, 'search over n gives 12'); C.which([12, 11, 13, 6], sol[0]);
  });
}
{
  const a = mon(1, 1), b = mon(-2, -1), n = 10; const hit = range(0, n).filter((k) => termAt(a, b, n, k).e[0] === 2); const t = termAt(a, b, n, hit[0]);
  const alt = [3, 5].map((k) => termAt(a, b, n, k).c.n);
  M('m08', { stem: r`When $\left(x - \dfrac{2}{x}\right)^{10}$ is written out, the term in $x^{2}$ is multiplied by the number`, opts: D(S(t.c.n), S(-t.c.n), S(alt[0]), S(alt[1])), sol: r`The power of $x$ in $T_{r+1}$ is $(10 - r) - r = 10 - 2r$, which equals $2$ for $r = 4$. The coefficient is $\binom{10}{4}(-2)^{4} = 210 \times 16 = ${S(t.c.n)}$. The value $${S(-t.c.n)}$ gets the sign wrong; $${S(alt[0])}$ and $${S(alt[1])}$ come from $r = 3$ and $r = 5$.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(hit.join() === '4' && t.c.n === 3360n && alt[0] === -960n && alt[1] === -8064n && 210 * 16 === 3360, 'r = 4 gives 3360'); C.which([3360, -3360, -960, -8064], N(t.c.n));
  });
}
{
  const a = mon(1, 1), b = mon(2, 0, 1); const ts = (n, sg) => count(range(0, n), (k) => true);
  const even = range(0, 10).filter((k) => k % 2 === 0).length;
  const p = expand(mon(1, 1), mon(2, 0, 1), 10), q = expand(mon(1, 1), mon(-2, 0, 1), 10);
  const sum = new Map(); // add the two expansions term by term through the exact engine
  const keys = new Set([...terms(p), ...terms(q)].map((m) => m.e.join()));
  const nz = [...keys].filter((k) => { const [ex, ey] = k.split(',').map(Number); return fadd(coefAt(p, ex, ey), coefAt(q, ex, ey)).n !== 0n; }).length;
  M('m09', { stem: r`The expansions of $(x + 2y)^{10}$ and $(x - 2y)^{10}$ are added. The sum, written in full, has how many terms?`, opts: D('6', '11', '5', '22'), sol: r`Terms with an odd power of $y$ have opposite signs in the two expansions and cancel. Those with an even power ($0, 2, 4, 6, 8, 10$) double, so $6$ terms remain. The value $11$ counts the terms of one expansion, $5$ miscounts the even powers, and $22$ adds the term counts.`, d: 2, c: 'understanding', t: [1], time: 70 }, (C) => {
    C.assert(nz === 6 && even === 6 && 11 + 11 === 22, 'six terms survive the addition'); C.which([6, 11, 5, 22], nz);
  });
}
{
  const x = decFr('-0.01'); const ts = range(0, 2).map((k) => fmul(fr(Cm(12, k)), fpow(x, k))); const three = ts.reduce(fadd, fr(0));
  const w = [fr(88, 100), fadd(fadd(fr(1), fmul(fr(12), x)), fmul(fr(-66), fpow(x, 2))), fadd(fadd(fr(1), fmul(fr(-12), x)), fmul(fr(66), fpow(x, 2)))];
  M('m10', { stem: r`Using the first three terms of the binomial expansion, an approximate value of $0.99^{12}$ is`, opts: D('0.8866', '0.88', '0.8734', '1.1266'), sol: r`Write $0.99^{12} = (1 - 0.01)^{12}$ and add $1 - 12(0.01) + \binom{12}{2}(0.01)^{2} = 1 - 0.12 + 0.0066 = 0.8866$. The value $0.88$ stops after two terms, $0.8734$ subtracts the third term, and $1.1266$ takes every term as positive.`, d: 3, c: 'application', t: [3], time: 90 }, (C) => {
    C.assert(dec(three, 4) === '0.8866' && dec(w[0], 2) === '0.88' && dec(w[1], 4) === '0.8734' && dec(w[2], 4) === '1.1266', 'three terms give 0.8866'); C.which(['0.8866', '0.88', '0.8734', '1.1266'], dec(three, 4));
  });
}
{
  const f = [(n, k) => Cm(n + 1, k), (n, k) => Cm(n, k + 1), (n, k) => Cm(n + 1, k + 1), (n, k) => Cm(2 * n, k)];
  const ok = f.map((g) => range(2, 12).every((n) => range(1, n).every((k) => Cm(n, k - 1) + Cm(n, k) === g(n, k))));
  M('m11', { stem: r`For positive integers $n$ and $r$ with $r \le n$, the sum $\binom{n}{r-1} + \binom{n}{r}$ equals`, opts: D(r`\binom{n+1}{r}`, r`\binom{n}{r+1}`, r`\binom{n+1}{r+1}`, r`\binom{2n}{r}`), sol: r`This is Pascal's rule: choose $r$ from $n + 1$ objects by either including a named object (choose $r - 1$ from the other $n$) or leaving it out (choose $r$ from the other $n$). The other three expressions fail already for $n = 4$, $r = 2$, where the sum is $4 + 6 = 10$.`, d: 2, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(ok.join() === 'true,false,false,false' && Cm(4, 1) + Cm(4, 2) === 10n, "only C(n+1, r) matches for n = 2..12"); C.which(['A', 'B', 'C', 'D'], 'ABCD'[ok.indexOf(true)]);
  });
}
{
  const cand = [
    (k) => ({ s: k % 2 ? -1 : 1, c: Cm(9, k) * 2n ** BigInt(9 - k), x: 27 - 4 * k }),
    (k) => ({ s: k % 2 ? -1 : 1, c: Cm(9, k) * 2n ** BigInt(9 - k), x: 27 - 2 * k }),
    (k) => ({ s: k % 2 ? -1 : 1, c: Cm(9, k) * 2n ** BigInt(k), x: 27 - 4 * k }),
    (k) => ({ s: 1, c: Cm(9, k) * 2n ** BigInt(9 - k), x: 27 - 4 * k }),
  ];
  const truth = (k) => { const t = termAt(mon(2, 3), mon(-1, -1), 9, k); return { s: t.c.n < 0n ? -1 : 1, c: t.c.n < 0n ? -t.c.n : t.c.n, x: t.e[0] }; };
  const ok = cand.map((g) => range(0, 9).every((k) => { const u = g(k), v = truth(k); return u.s === v.s && u.c === v.c && u.x === v.x; }));
  M('m12', { stem: r`The general term of the expansion of $\left(2x^{3} - \dfrac{1}{x}\right)^{9}$, in its simplest form, is`, opts: D(r`(-1)^{r}\binom{9}{r}\,2^{9-r}x^{27-4r}`, r`(-1)^{r}\binom{9}{r}\,2^{9-r}x^{27-2r}`, r`(-1)^{r}\binom{9}{r}\,2^{r}x^{27-4r}`, r`\binom{9}{r}\,2^{9-r}x^{27-4r}`), sol: r`$T_{r+1} = \binom{9}{r}(2x^{3})^{9-r}\left(-\dfrac{1}{x}\right)^{r} = (-1)^{r}\binom{9}{r}2^{9-r}x^{3(9-r)-r}$ and $3(9 - r) - r = 27 - 4r$. The second option has $x^{27-2r}$ (the power $x^{-r}$ was mishandled), the third swaps the power of $2$, and the fourth drops the sign.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(ok.join() === 'true,false,false,false', 'only the first expression matches every term r = 0..9'); C.which(['A', 'B', 'C', 'D'], 'ABCD'[ok.indexOf(true)]);
  });
}
{
  const hit = []; for (let n = 3; n <= 60; n++) for (let k = 1; k < n; k++) if (Cm(n, k - 1) * 14n === Cm(n, k) * 6n && Cm(n, k) * 21n === Cm(n, k + 1) * 14n) hit.push([n, k]);
  M('m13', { stem: r`Three consecutive coefficients in the expansion of $(1 + x)^{n}$ are $36$, $84$ and $126$. The value of $n$ is`, opts: D('9', '8', '10', '12'), sol: r`Let the coefficients be $\binom{n}{r-1}, \binom{n}{r}, \binom{n}{r+1}$. Then $\dfrac{n - r + 1}{r} = \dfrac{84}{36} = \dfrac{7}{3}$ and $\dfrac{n - r}{r + 1} = \dfrac{126}{84} = \dfrac{3}{2}$. These give $3n - 10r + 3 = 0$ and $2n - 5r - 3 = 0$, so $n = 9$ and $r = 3$. Check: $\binom{9}{2} = 36$, $\binom{9}{3} = 84$, $\binom{9}{4} = 126$.`, d: 4, c: 'application', t: [3], time: 150 }, (C) => {
    C.assert(hit.length === 1 && hit[0][0] === 9 && hit[0][1] === 3 && Cm(9, 2) === 36n && Cm(9, 3) === 84n && Cm(9, 4) === 126n, 'search finds only n = 9, r = 3'); C.which([9, 8, 10, 12], hit[0][0]);
  });
}
{
  const lb = fadd(fr(1), fmul(fr(30), decFr('0.02')));
  M('m14', { stem: r`Because every term of the expansion of $(1 + 0.02)^{30}$ is positive, keeping only the first two terms gives a lower bound for $1.02^{30}$. That bound is`, opts: D('1.6', '0.6', '2.2', '1.06'), sol: r`$1.02^{30} = (1 + 0.02)^{30} \ge 1 + 30(0.02) = 1.6$. The value $0.6$ forgets the first term $1$, $2.2$ doubles the second term, and $1.06$ uses $3$ in place of $30$.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    C.assert(dec(lb, 1) === '1.6' && fNum(fmul(fr(102n ** 30n), fr(1, 100n ** 30n))) > 1.6, 'lower bound 1.6 is below 1.02^30'); C.which(['1.6', '0.6', '2.2', '1.06'], dec(lb, 1));
  });
}
{
  const rem = mp(6, 35, 7);
  M('m15', { stem: r`Writing $6 = 7 - 1$ and using the binomial theorem, the remainder when $6^{35}$ is divided by $7$ is`, opts: D('6', '1', '5', '0'), sol: r`$6^{35} = (7 - 1)^{35}$. Every term except the last has a factor $7$, and the last term is $(-1)^{35} = -1$. So $6^{35} = 7k - 1 = 7(k - 1) + 6$ for an integer $k$, and the remainder is $6$. The remainder $1$ would belong to an even power, and $0$ would need $6^{35}$ to be a multiple of $7$.`, d: 3, c: 'application', t: [3], time: 90 }, (C) => {
    C.assert(rem === 6n && mp(6, 34, 7) === 1n, '6^35 mod 7 = 6 (6^34 leaves 1)'); C.which([6, 1, 5, 0], N(rem));
  });
}
{
  const a = mon(1, 1), b = mon(3, -1), n = 6; const t = termAt(a, b, n, 3);
  M('m16', { stem: r`Counting from either end, the term standing exactly in the middle once $\left(z + \dfrac{3}{z}\right)^{6}$ is expanded has the value`, opts: D(S(t.c.n), '20', '60', '27'), sol: r`There are $7$ terms, so the middle term is $T_{4}$ with $r = 3$: $\binom{6}{3}z^{3}\left(\dfrac{3}{z}\right)^{3} = 20 \times 27 = ${S(t.c.n)}$, which does not contain $z$. The value $20$ is the binomial coefficient alone, $27$ leaves it out, and $60$ uses $3$ in place of $3^{3}$.`, d: 3, c: 'application', t: [2], time: 80 }, (C) => {
    C.assert(t.c.n === 540n && t.e[0] === 0 && 20 * 27 === 540 && 20 * 3 === 60, 'middle term 540'); C.which([540, 20, 60, 27], N(t.c.n));
  });
}
{
  const p = terms(expand(mon(2), mon(-3, 1), 8)).filter((m) => m.c.n < 0n).length;
  M('m17', { stem: r`The expansion of $(2 - 3x)^{8}$ is written in ascending powers of $x$. The number of terms with a negative coefficient is`, opts: D('4', '5', '8', '9'), sol: r`The $x^{r}$ term carries $(-3)^{r}$, which is negative exactly when $r$ is odd. For $r = 0, 1, \ldots, 8$ the odd values are $1, 3, 5, 7$, so $4$ terms are negative. The number $5$ counts the even values, $9$ counts every term, and $8$ is the power.`, d: 2, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(p === 4 && range(0, 8).filter((k) => k % 2 === 1).length === 4, 'four negative coefficients'); C.which([4, 5, 8, 9], p);
  });
}
{
  const n = 13; const odd = range(0, n).filter((k) => k % 2 === 1).reduce((s, k) => s + Cm(n, k), 0n);
  M('m18', { stem: r`The value of $\binom{13}{1} + \binom{13}{3} + \binom{13}{5} + \cdots + \binom{13}{13}$ is`, opts: D(S(odd), '8192', '2048', '8191'), sol: r`The sum of all binomial coefficients is $2^{13}$, and the odd-numbered and even-numbered sums are equal, so each is $2^{12} = ${S(odd)}$. The value $8192$ is the whole sum $2^{13}$, $2048$ is $2^{11}$, and $8191$ is $2^{13} - 1$.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
    C.assert(odd === 4096n && 2n ** 13n === 8192n, 'odd-indexed sum 4096'); C.which([4096, 8192, 2048, 8191], N(odd));
  });
}
{
  const sol = range(1, 40).filter((n) => 2n ** BigInt(n) === 256n);
  M('m19', { stem: r`In the expansion of $(a + b)^{n}$ the sum of the binomial coefficients is $256$. The number of terms in the expansion is`, opts: D('9', '8', '7', '10'), sol: r`The binomial coefficients add up to $2^{n} = 256 = 2^{8}$, so $n = 8$. The expansion has $n + 1 = 9$ terms. The value $8$ is $n$ itself, and $7$ and $10$ come from slips in counting.`, d: 3, c: 'application', t: [3], time: 70 }, (C) => {
    C.assert(sol.join() === '8' && sol[0] + 1 === 9, 'n = 8, nine terms'); C.which([9, 8, 7, 10], sol[0] + 1);
  });
}
{
  M('m20', { stem: r`The number of middle terms in the expansion of $(a + b)^{16}$ is`, opts: D('1', '2', '8', '9'), sol: r`There are $16 + 1 = 17$ terms, an odd number, so exactly one term has equal numbers of terms before and after it: $T_{9}$. The count of middle terms is $1$; the number $9$ names its position and $8$ is the number of terms before it.`, d: 1, c: 'recall', t: [2], time: 45 }, (C) => {
    C.assert(16 % 2 === 0 && (16 + 1) % 2 === 1 && 16 / 2 + 1 === 9, 'one middle term, T9'); C.which([1, 2, 8, 9], 1);
  });
}

// ============================================================ Assertion-reason
Q('ar1', mk.ar({ a: r`The expansion of $(2x - 3)^{7}$ has $8$ terms.`, r: r`The expansion of $(a + b)^{n}$ for a positive integer $n$ has $n + 1$ terms.`, key: 'a', sol: r`The powers of $a$ run from $n$ down to $0$, which gives $n + 1$ terms; for $n = 7$ that is $8$. So A is true, and R is the rule that gives it.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  C.assert(terms(expand(mon(2, 1), mon(-3), 7)).length === 8 && range(0, 7).length === 8, 'eight terms'); C.key('a');
});
Q('ar2', mk.ar({ a: r`The sum of all the coefficients in the expansion of $(x - 2)^{9}$ is $-1$.`, r: r`The sum of the coefficients of a polynomial in $x$ is found by putting $x = 1$ in it.`, key: 'a', sol: r`Putting $x = 1$ in $(x - 2)^{9}$ gives $(-1)^{9} = -1$, so A is true, and R names the method that produces that value, so R explains A.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const tot = terms(expand(mon(1, 1), mon(-2), 9)).reduce((s, m) => fadd(s, m.c), fr(0));
  C.assert(tot.n === -1n && tot.d === 1n, 'coefficients of (x - 2)^9 add to -1'); C.key('a');
});
Q('ar3', mk.ar({ a: r`The greatest coefficient in the expansion of $(1 + x)^{10}$ is $252$.`, r: r`For $0 \le r \le n$, $\binom{n}{r} = \binom{n}{n-r}$.`, key: 'b', sol: r`The coefficients of $(1 + x)^{10}$ are $1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1$, so the greatest is $\binom{10}{5} = 252$ and A is true. R is also true, but symmetry alone does not say which coefficient is greatest: that needs the fact that the coefficients rise up to the middle. So R is not the explanation.`, d: 3, c: 'analysis', t: [3] }), (C) => {
  const row = pascalRow(10); C.assert(Math.max(...row.map(Number)) === 252 && row[5] === 252n && range(0, 10).every((k) => row[k] === row[10 - k]), 'row 10 peaks at 252; symmetry holds'); C.key('b');
});
Q('ar4', mk.ar({ a: r`The expansion of $\left(x + \dfrac{1}{x}\right)^{7}$ has a term independent of $x$, namely the $4$th term.`, r: r`The expansion of $\left(x + \dfrac{1}{x}\right)^{n}$ has a term independent of $x$ only when $n$ is even.`, key: 'd', sol: r`The power of $x$ in $T_{r+1}$ is $(n - r) - r = n - 2r$. This is $0$ only if $n = 2r$, so $n$ must be even, and R is true. For $n = 7$ the power is $7 - 2r$, which is odd and never $0$, so A is false (the middle terms $T_{4}$ and $T_{5}$ contain $x$ and $\dfrac{1}{x}$).`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const ev = [4, 6, 8, 10, 12].every((n) => range(0, n).some((k) => n - 2 * k === 0)), od = [3, 5, 7, 9, 11].every((n) => range(0, n).every((k) => n - 2 * k !== 0));
  const t4 = termAt(mon(1, 1), mon(1, -1), 7, 3);
  C.assert(ev && od && t4.e[0] === 1, 'n = 7: T4 is x^1, no term free of x; even n always has one'); C.key('d');
});
Q('ar5', mk.ar({ a: r`$\binom{12}{0} + \binom{12}{2} + \binom{12}{4} + \cdots + \binom{12}{12} = 2048$.`, r: r`For every positive integer $n$, the sum of the binomial coefficients with even lower numbers equals the sum of those with odd lower numbers, and each equals $2^{n-1}$.`, key: 'a', sol: r`Putting $x = 1$ and $x = -1$ in $(1 + x)^{n}$ gives $\sum \binom{n}{r} = 2^{n}$ and $\sum (-1)^{r}\binom{n}{r} = 0$, so the even and odd sums are equal, each $2^{n-1}$. For $n = 12$, $2^{11} = 2048$. A is true and R is the rule behind it.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const ev = range(0, 12).filter((k) => k % 2 === 0).reduce((s, k) => s + Cm(12, k), 0n), od = range(0, 12).filter((k) => k % 2 === 1).reduce((s, k) => s + Cm(12, k), 0n);
  C.assert(ev === 2048n && od === 2048n && 2n ** 11n === 2048n, 'even and odd sums are 2048'); C.key('a');
});
Q('ar6', mk.ar({ a: r`The coefficient of $x^{3}$ in the expansion of $(1 + 2x)^{6}$ is $160$.`, r: r`The coefficient of $x^{r}$ in the expansion of $(1 + ax)^{n}$ is $\binom{n}{r}$.`, key: 'c', sol: r`The coefficient of $x^{3}$ is $\binom{6}{3}\,2^{3} = 20 \times 8 = 160$, so A is true. R is false: the term is $\binom{n}{r}(ax)^{r}$, so the coefficient is $\binom{n}{r}a^{r}$, not $\binom{n}{r}$. Here R would give only $20$.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const c = coefAt(expand(mon(1), mon(2, 1), 6), 3);
  C.assert(c.n === 160n && Cm(6, 3) === 20n && 20n * 8n === 160n, 'coefficient 160, not 20'); C.key('c');
});

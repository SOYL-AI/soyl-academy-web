// ISC 11 Mathematics ch10 Sequences and Series - multiple-choice and assertion-reason items.
// Every key is recomputed twice (exact formula on rationals, explicit listing of the terms); every distractor is computed from its own wrong method.
import { Q, mk } from './lib.mjs';
import { r, range, Fr, fr, sumF, apList, apTerm, apSum, apFrom, apMeans, gpList, gpTerm, gpSum, gpInf, recurring, decimals, gpMeans, s1, s2, s3, L1, L2, L3, LS, diffs, fitQuad, S } from './seq.mjs';

// Option 'a' is the key as authored; the build rotates keys afterwards. Option values are numbers (or fractions) checked by C.which.
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const O = (...xs) => xs.map((x) => (x instanceof Fr ? x.m() : `$${x}$`));
const nv = (x) => (x instanceof Fr ? x.num() : Number(x));
const W = (C, vals, target) => C.which(vals.map(nv), nv(target));

// ============================================================ MCQ
{
  const a = 23, d = -4, v = apTerm(a, d, 12), wrong = [a + 12 * d, a + 11 * -d, a + 10 * d];
  M('m01', { stem: r`The first term of an arithmetic progression is $23$ and its common difference is $-4$. Its twelfth term is`, opts: O(v, ...wrong), sol: r`$a_{12} = a + 11d = 23 + 11(-4) = ${v.str()}$. The value $${wrong[0]}$ uses $a + 12d$, one step too many; $${wrong[1]}$ uses $d = +4$; and $${wrong[2]}$ uses $a + 10d$, one step too few.`, d: 1, c: 'understanding', t: [1], time: 45 }, (C) => {
    C.assert(v.eq(-21) && apList(a, d, 12)[11].eq(v) && new Set([v.num(), ...wrong]).size === 4, 'a_12 = -21 by formula and by listing 12 terms'); W(C, [v, ...wrong], v);
  });
}
{
  const a = 7, d = 4, n = range(1, 60).filter((k) => apTerm(a, d, k).eq(95)), wrong = [22, 21, 24];
  M('m02', { stem: r`In the arithmetic progression $7, 11, 15, \ldots$ the term $95$ has position number`, opts: O(n[0], ...wrong), sol: r`$7 + (n - 1) \times 4 = 95$ gives $(n - 1) \times 4 = 88$, so $n - 1 = 22$ and $n = 23$. The value $22$ is $n - 1$, forgetting the $+1$; $21$ counts from the second term $11$ as if it were the first; $24$ adds the $1$ twice.`, d: 2, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(n.join() === '23' && apList(a, d, 23)[22].eq(95) && !wrong.includes(23), 'n = 23 by search over positions 1..60 and by listing'); W(C, [n[0], ...wrong], n[0]);
  });
}
{
  const { a, d } = apFrom(4, 14, 9, 34), v = apSum(a, d, 20), l = apList(a, d, 20);
  const wrong = [apSum(14, d, 20), apSum(a, d, 19), fr(20).mul(fr(a).mul(2).add(d.mul(19)))];
  M('m03', { stem: r`The fourth term of an arithmetic progression is $14$ and its ninth term is $34$. The sum of its first $20$ terms is`, opts: O(v, ...wrong), sol: r`From $a_9 - a_4 = 5d = 20$ we get $d = 4$, and $a = 14 - 3 \times 4 = 2$. So $S_{20} = \dfrac{20}{2}\,[2 \times 2 + 19 \times 4] = 10 \times 80 = ${v.str()}$. The value $${wrong[0].str()}$ takes $14$ as the first term; $${wrong[1].str()}$ stops at $19$ terms; $${wrong[2].str()}$ forgets the factor $\dfrac{1}{2}$.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(a.eq(2) && d.eq(4) && v.eq(800) && sumF(l).eq(800) && new Set([v.num(), ...wrong.map(nv)]).size === 4, 'S_20 = 800 by formula and by adding 20 terms'); W(C, [v, ...wrong], v);
  });
}
{
  const first = range(100, 999).find((x) => x % 7 === 0), last = range(100, 999).filter((x) => x % 7 === 0).pop();
  const xs = range(100, 999).filter((x) => x % 7 === 0), tot = xs.reduce((s, x) => s + x, 0);
  const n = xs.length, v = fr(n).mul(first + last).div(2);
  const wrong = [fr(129).mul(98 + 994).div(2), fr(n).mul(first + last), fr(127).mul(105 + 987).div(2)];
  M('m04', { stem: r`The sum of all three-digit numbers that are divisible by $7$ is`, opts: O(v, ...wrong), sol: r`The multiples run $105, 112, \ldots, 994$, an AP with $d = 7$. From $105 + (n - 1) \times 7 = 994$ we get $n = 128$. So $S = \dfrac{128}{2}(105 + 994) = 64 \times 1099 = ${v.str()}$. The value $${wrong[0].str()}$ includes the two-digit multiple $98$; $${wrong[1].str()}$ omits the factor $\dfrac{1}{2}$; $${wrong[2].str()}$ stops at $987$ and misses the last multiple $994$.`, d: 4, c: 'application', t: [1], time: 150 }, (C) => {
    C.assert(first === 105 && last === 994 && n === 128 && tot === 70336 && v.eq(70336) && new Set([v.num(), ...wrong.map(nv)]).size === 4, '70336 by listing all three-digit multiples of 7 and by the AP formula'); W(C, [v, ...wrong], v);
  });
}
{
  const m = apMeans(5, 61, 7), d = fr(61 - 5, 8), v = m[4];
  const wrong = [apTerm(5, d, 5), m[5], fr(5).add(fr(61 - 5, 7).mul(5))];
  M('m05', { stem: r`Seven arithmetic means are inserted between $5$ and $61$. The fifth of these means is`, opts: O(v, ...wrong), sol: r`The AP has $9$ terms, so $d = \dfrac{61 - 5}{8} = 7$ and the fifth mean is the sixth term: $5 + 5 \times 7 = ${v.str()}$. The value $${wrong[0].str()}$ is the fifth term (the fourth mean); $${wrong[1].str()}$ is the sixth mean; $${wrong[2].str()}$ divides by $7$ instead of $8$.`, d: 2, c: 'application', t: [1], time: 80 }, (C) => {
    C.assert(d.eq(7) && v.eq(40) && apList(5, 7, 9)[8].eq(61) && apList(5, 7, 9)[5].eq(40) && new Set([v.num(), ...wrong.map(nv)]).size === 4, 'fifth mean is 40 (9-term AP listed, last term 61)'); W(C, [v, ...wrong], v);
  });
}
{
  const ok = (k) => { const p = k + 2, q = 4 * k - 6, w = 3 * k - 2; return 2 * q === p + w; };
  const cand = [3, 4, 1, 6], res = cand.map(ok);
  const txt = (k) => `${k + 2}, ${4 * k - 6}, ${3 * k - 2}`;
  M('m06', { stem: r`The three numbers $k + 2$, $4k - 6$ and $3k - 2$ are in arithmetic progression. The value of $k$ is`, opts: O(...cand), sol: r`Three numbers are in AP when twice the middle one equals the sum of the others: $2(4k - 6) = (k + 2) + (3k - 2)$, so $8k - 12 = 4k$ and $k = 3$ (the numbers are $${txt(3)}$). For $k = 4$ the numbers are $${txt(4)}$, for $k = 1$ they are $${txt(1)}$, and for $k = 6$ they are $${txt(6)}$; none of these is an AP.`, d: 3, c: 'application', t: [1], time: 90 }, (C) => {
    C.assert(res.join() === 'true,false,false,false' && range(-20, 20).filter(ok).join() === '3', 'only k = 3 makes the three expressions an AP (search -20..20)'); C.which(cand, 3);
  });
}
{
  const hits = [];
  for (let a = 1; a <= 40; a++) for (let d = 1; d <= 20; d++) if ((a - d) + a + (a + d) === 33 && (a - d) * a * (a + d) === 1155) hits.push([a - d, a, a + d]);
  M('m07', { stem: r`Three positive numbers are in arithmetic progression. Their sum is $33$ and their product is $1155$. The smallest of the three numbers is`, opts: O(7, 11, 15, 4), sol: r`Take $a - d$, $a$, $a + d$. The sum is $3a = 33$, so $a = 11$. The product is $11(121 - d^2) = 1155$, so $121 - d^2 = 105$ and $d = 4$ (as the numbers are positive and increasing). The numbers are $7, 11, 15$ and the smallest is $7$. The value $11$ is the middle number, $15$ the largest, and $4$ the common difference.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(hits.length === 1 && hits[0].join() === '7,11,15', 'search over AP triples finds only 7, 11, 15'); C.which([7, 11, 15, 4], hits[0][0]);
  });
}
{
  const v = gpTerm(3, -2, 9), wrong = [gpTerm(3, -2, 10), gpTerm(3, 2, 10), v.neg()];
  M('m08', { stem: r`The geometric progression $3, -6, 12, \ldots$ has ninth term`, opts: O(v, ...wrong), sol: r`$a = 3$ and $r = -2$, so $a_9 = a r^{8} = 3 \times (-2)^8 = 3 \times 256 = ${v.str()}$. The value $${wrong[0].str()}$ uses $r^9$; $${wrong[1].str()}$ uses $r^9$ with a positive ratio; $${wrong[2].str()}$ gets the sign wrong, but $(-2)^8$ is positive.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    C.assert(v.eq(768) && gpList(3, -2, 9)[8].eq(768) && new Set([v.num(), ...wrong.map(nv)]).size === 4, 'a_9 = 768 by formula and by listing 9 terms'); W(C, [v, ...wrong], v);
  });
}
{
  const v = gpSum(7, 2, 8), wrong = [fr(7).mul(2 ** 8), gpSum(7, 2, 7), gpSum(7, 2, 9)];
  M('m09', { stem: r`Adding the first $8$ terms of the geometric progression $7, 14, 28, \ldots$ gives`, opts: O(v, ...wrong), sol: r`$a = 7$, $r = 2$, so $S_8 = \dfrac{7(2^8 - 1)}{2 - 1} = 7 \times 255 = ${v.str()}$. The value $${wrong[0].str()}$ is $7 \times 2^8$, which forgets the $-1$; $${wrong[1].str()}$ sums $7$ terms; $${wrong[2].str()}$ sums $9$ terms.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    C.assert(v.eq(1785) && sumF(gpList(7, 2, 8)).eq(1785) && new Set([v.num(), ...wrong.map(nv)]).size === 4, 'S_8 = 1785 by formula and by adding 8 terms'); W(C, [v, ...wrong], v);
  });
}
{
  const pos = range(1, 20).filter((n) => gpTerm(2, 3, n).eq(4374));
  M('m10', { stem: r`In the geometric progression $2, 6, 18, \ldots$ the number $4374$ occurs as the term numbered`, opts: O(pos[0], 7, 9, 2187), sol: r`$2 \times 3^{n-1} = 4374$ gives $3^{n-1} = 2187 = 3^7$, so $n - 1 = 7$ and $n = 8$. The value $7$ is the exponent $n - 1$; $9$ adds $1$ twice; $2187$ is the value of $3^{n-1}$, not of $n$.`, d: 3, c: 'application', t: [2], time: 80 }, (C) => {
    C.assert(pos.join() === '8' && gpList(2, 3, 8)[7].eq(4374) && 3 ** 7 === 2187, 'n = 8 by search and by listing'); C.which([8, 7, 9, 2187], pos[0]);
  });
}
{
  const v = gpInf(8, fr(-1, 2)), wrong = [gpInf(8, fr(1, 2)), gpInf(8, fr(-2)), fr(12)];
  M('m11', { stem: r`Added without end, the series $8 - 4 + 2 - 1 + \cdots$ approaches the value`, opts: O(v, ...wrong), sol: r`The ratio is $r = -\dfrac{1}{2}$, so $|r| < 1$ and $S_\infty = \dfrac{8}{1 - (-1/2)} = \dfrac{8}{3/2} = ${v.tex()}$. The value $${wrong[0].tex()}$ uses $r = +\dfrac{1}{2}$; $${wrong[1].tex()}$ uses $r = -2$, for which the formula does not apply; $12$ adds only the first two terms.`, d: 3, c: 'application', t: [2], time: 80 }, (C) => {
    const ps = []; let s = fr(0); for (const t of gpList(8, fr(-1, 2), 40)) { s = s.add(t); ps.push(s.num()); }
    C.assert(v.eq(fr(16, 3)) && Math.abs(ps[39] - 16 / 3) < 1e-9 && new Set([v.num(), ...wrong.map(nv)]).size === 4, 'partial sums of 40 terms approach 16/3'); W(C, [v, ...wrong], v);
  });
}
{
  const rr = fr(1).sub(fr(15, 25)), v = fr(15).mul(rr), wrong = [fr(25 - 15), fr(15).mul(fr(15, 25)), fr(15).mul(rr).mul(rr)];
  M('m12', { stem: r`An infinite geometric series has first term $15$ and sum $25$. Its second term is`, opts: O(v, ...wrong), sol: r`$\dfrac{15}{1 - r} = 25$ gives $1 - r = \dfrac{3}{5}$, so $r = \dfrac{2}{5}$ and the second term is $15 \times \dfrac{2}{5} = ${v.tex()}$. The value $${wrong[0].tex()}$ is the sum minus the first term (the sum of all later terms); $${wrong[1].tex()}$ uses $r = \dfrac{3}{5}$; $${wrong[2].tex()}$ is the third term.`, d: 3, c: 'application', t: [2], time: 90 }, (C) => {
    C.assert(rr.eq(fr(2, 5)) && gpInf(15, rr).eq(25) && v.eq(6) && new Set([v.num(), ...wrong.map(nv)]).size === 4, 'r = 2/5, second term 6, sum 25 checked'); W(C, [v, ...wrong], v);
  });
}
{
  const hits = gpMeans(16, 1, 3, [fr(1, 2), fr(-1, 2), 2, fr(1, 4)]).filter((h) => h.q.lt(1) && !h.q.lt(0));
  const means = hits[0].means, mid = means[1];
  M('m13', { stem: r`Three geometric means, all positive, are inserted between $16$ and $1$. The middle one is`, opts: O(mid, means[0], means[2], fr(17, 2)), sol: r`There are $4$ steps, so $r^4 = \dfrac{1}{16}$ and $r = \dfrac{1}{2}$ for positive means: $16, 8, 4, 2, 1$. The middle mean is $4$, which is also $\sqrt{16 \times 1}$. The value $8$ is the first mean, $2$ the third mean, and $\dfrac{17}{2}$ is the arithmetic mean of $16$ and $1$.`, d: 3, c: 'understanding', t: [2], time: 90 }, (C) => {
    C.assert(hits.length === 1 && mid.eq(4) && mid.mul(mid).eq(16) && gpList(16, fr(1, 2), 5)[4].eq(1), 'means 8, 4, 2 with r = 1/2'); W(C, [mid, means[0], means[2], fr(17, 2)], mid);
  });
}
{
  const v = recurring('', '135'), wrong = [fr(135, 1000), fr(135, 990), fr(135, 99)];
  M('m14', { stem: r`The recurring decimal $0.\overline{135} = 0.135135135\ldots$ equals the fraction`, opts: O(v, ...wrong), sol: r`It is an infinite GP with first term $0.135$ and ratio $0.001$: $\dfrac{0.135}{1 - 0.001} = \dfrac{135}{999} = ${v.tex()}$. The value $${wrong[0].tex()}$ is the terminating decimal $0.135$; $${wrong[1].tex()}$ divides by $990$ as if only one digit were not repeating; $${wrong[2].tex()}$ divides by $99$ as for a two-digit block.`, d: 3, c: 'application', t: [2], time: 90 }, (C) => {
    C.assert(v.eq(fr(5, 37)) && decimals(v, 12) === '135135135135' && new Set([v.num(), ...wrong.map(nv)]).size === 4, '5/37 has expansion 0.135135...'); W(C, [v, ...wrong], v);
  });
}
{
  const pairs = [];
  for (let a = 1; a <= 40; a++) for (let b = a; b <= 40; b++) if (a + b === 20 && a * b === 64) pairs.push([a, b]);
  M('m15', { stem: r`Two positive numbers have arithmetic mean $10$ and geometric mean $8$. The difference between the larger and the smaller number is`, opts: O(12, 20, 16, 6), sol: r`$a + b = 20$ and $ab = 64$, so $(a - b)^2 = 20^2 - 4 \times 64 = 144$ and $a - b = 12$ (the numbers are $4$ and $16$). The value $20$ is the sum, $16$ is the larger number, and $6$ is half of $12$.`, d: 3, c: 'application', t: [3], time: 90 }, (C) => {
    C.assert(pairs.length === 1 && pairs[0].join() === '4,16' && 16 - 4 === 12 && Math.sqrt(64) === 8, 'numbers 4 and 16 by search'); C.which([12, 20, 16, 6], pairs[0][1] - pairs[0][0]);
  });
}
{
  let best = Infinity;
  for (let k = 1; k <= 4000; k++) best = Math.min(best, 16 * (k / 1000) + 9 / (k / 1000));
  const atq = fr(16).mul(fr(3, 4)).add(fr(9).div(fr(3, 4)));
  M('m16', { stem: r`For positive real $x$, the least value of $16x + \dfrac{9}{x}$ is`, opts: O(24, 12, 25, 144), sol: r`The product of the two terms is $16x \cdot \dfrac{9}{x} = 144$, a constant. By AM $\ge$ GM, $16x + \dfrac{9}{x} \ge 2\sqrt{144} = 24$, with equality when $16x = \dfrac{9}{x}$, that is $x = \dfrac{3}{4}$. The value $12$ forgets the factor $2$; $25$ is the value at $x = 1$; $144$ is the product.`, d: 4, c: 'application', t: [3], time: 120 }, (C) => {
    C.assert(atq.eq(24) && best >= 24 - 1e-9 && best < 24 + 1e-3, 'minimum is 24 at x = 3/4 (scan of x from 0.001 to 4)'); C.which([24, 12, 25, 144], 24);
  });
}
{
  const Sn = (n) => n * n + 4 * n, v = Sn(8) - Sn(7);
  M('m17', { stem: r`The sum of the first $n$ terms of a sequence is $S_n = n^2 + 4n$. Its eighth term is`, opts: O(v, Sn(8), Sn(9) - Sn(8), 2 * 8 + 4), sol: r`$a_8 = S_8 - S_7 = (64 + 32) - (49 + 28) = 96 - 77 = ${v}$ (in general $a_n = 2n + 3$). The value $96$ is $S_8$, the sum of eight terms; $21$ is the ninth term; $20$ is $2n + 4$, which comes from a slip in the general term.`, d: 3, c: 'application', t: [1], time: 90 }, (C) => {
    const terms = range(1, 9).map((n) => Sn(n) - Sn(n - 1));
    C.assert(v === 19 && terms[7] === 19 && terms.every((x, i) => x === 2 * (i + 1) + 3) && terms.slice(0, 8).reduce((s, x) => s + x, 0) === Sn(8), 'a_8 = 19 and the first 8 terms add to S_8 = 96'); C.which([19, 96, 21, 20], v);
  });
}
{
  const v = s2(18), wrong = [BigInt(18 * 19 * 36 / 6), s1(18) ** 2n, s2(17)];
  M('m18', { stem: r`The value of $1^2 + 2^2 + 3^2 + \cdots + 18^2$ is`, opts: O(v, ...wrong), sol: r`$\sum_{k=1}^{n} k^2 = \dfrac{n(n+1)(2n+1)}{6}$ with $n = 18$: $\dfrac{18 \times 19 \times 37}{6} = 3 \times 19 \times 37 = ${v}$. The value $${wrong[0]}$ uses $2n$ instead of $2n + 1$; $${wrong[1]}$ is the square of $1 + 2 + \cdots + 18$, which belongs to cubes; $${wrong[2]}$ stops at $17^2$.`, d: 2, c: 'understanding', t: [4], time: 60 }, (C) => {
    C.assert(v === 2109n && L2(1, 18) === 2109n && new Set([v, ...wrong]).size === 4, '2109 by formula and by adding 18 squares'); C.which([2109, 2052, 29241, 1785], Number(v));
  });
}
{
  const v = LS(9, (k) => k * (k + 1)), wrong = [s2(9), s2(10), BigInt(9 * 10 * 11 / 2)];
  M('m19', { stem: r`The series $1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \cdots$ continued to $9$ terms has the sum`, opts: O(v, ...wrong), sol: r`The $k$th term is $k(k + 1) = k^2 + k$, so the sum is $\dfrac{9 \times 10 \times 19}{6} + \dfrac{9 \times 10}{2} = 285 + 45 = ${v}$ (this equals $\dfrac{n(n+1)(n+2)}{3}$). The value $${wrong[0]}$ is only $\sum k^2$; $${wrong[1]}$ is $\sum k^2$ to $10$ terms; $${wrong[2]}$ divides by $2$ instead of $3$.`, d: 3, c: 'application', t: [4], time: 100 }, (C) => {
    C.assert(v === 330n && s2(9) + s1(9) === 330n && BigInt(9 * 10 * 11 / 3) === 330n && new Set([v, ...wrong]).size === 4, '330 by listing 9 products and by the formula'); C.which([330, 285, 385, 495], Number(v));
  });
}
{
  const t = [4, 13, 28, 49, 76], q = fitQuad(t), v = q.at(10), wrongA = fitQuad([4, 13, 28, 49, 76]);
  const d2 = diffs(diffs(t));
  // wrong 1: treating the first differences as constant (AP); wrong 2: taking the second difference as A; wrong 3: the ninth term
  const ap = fr(4).add(fr(9).mul(9));
  const B2 = (() => { const A = 6; const bc = [4 - A, 13 - 4 * A]; const B = bc[1] - bc[0]; const Cc = bc[0] - B; return { A, B, Cc }; })();
  const w2 = B2.A * 100 + B2.B * 10 + B2.Cc;
  M('m20', { stem: r`The sequence $4, 13, 28, 49, 76, \ldots$ has constant second differences. Its tenth term is`, opts: O(v, ap, w2, q.at(9)), sol: r`The first differences are $9, 15, 21, 27$ and the second differences are all $6 = 2A$, so $A = 3$. From $3 + B + C = 4$ and $12 + 2B + C = 13$ we get $B = 0$ and $C = 1$, so $a_n = 3n^2 + 1$ and $a_{10} = 301$. The value $${ap.str()}$ treats the first difference $9$ as constant; $${w2}$ uses the second difference $6$ as $A$; $${q.at(9).str()}$ is the ninth term.`, d: 4, c: 'analysis', t: [4], time: 150 }, (C) => {
    C.assert(d2.join() === '6,6,6' && q.A.eq(3) && q.B.eq(0) && q.C.eq(1) && v.eq(301) && range(1, 5).every((n) => q.at(n).eq(t[n - 1])) && new Set([v.num(), ap.num(), w2, q.at(9).num()]).size === 4, 'a_n = 3n^2 + 1 fitted and checked on 5 terms; a_10 = 301'); W(C, [v, ap, w2, q.at(9)], v);
  });
}

// ============================================================ assertion-reason
Q('ar1', mk.ar({ a: r`The sum of the first $12$ terms of the progression $9, 14, 19, \ldots$ is $438$.`, r: r`For an arithmetic progression, $S_n = \dfrac{n}{2}\,[2a + (n - 1)d]$.`, key: 'a', sol: r`Here $a = 9$, $d = 5$, so $S_{12} = \dfrac{12}{2}\,[18 + 11 \times 5] = 6 \times 73 = 438$ and A is true. R is the formula used to get it, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const v = apSum(9, 5, 12);
  C.assert(v.eq(438) && sumF(apList(9, 5, 12)).eq(438), 'S_12 = 438 by formula and by listing'); C.sol([438, 73]);
});
Q('ar2', mk.ar({ a: r`The geometric series $20 + 10 + 5 + \cdots$ has the sum $40$.`, r: r`An infinite geometric series has a sum only when its common ratio is positive.`, key: 'c', sol: r`The ratio is $\dfrac{1}{2}$, so $S_\infty = \dfrac{20}{1 - 1/2} = 40$ and A is true. R is false: the condition is $|r| < 1$. For example, $r = -\dfrac{1}{2}$ gives a sum ($\dfrac{12}{3/2} = 8$ for $a = 12$), while the positive ratio $r = 2$ gives no sum.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const grow = gpList(1, 2, 30).map((x) => x.num()), alt = gpInf(12, fr(-1, 2));
  C.assert(gpInf(20, fr(1, 2)).eq(40) && alt.eq(8) && grow[29] > 1e8, 'sum is 40; r = -1/2 has a sum (8) and r = 2 diverges, so R is false'); C.sol([40, 8]);
});
Q('ar3', mk.ar({ a: r`Take the positive numbers $12$ and $27$: their arithmetic mean falls below their geometric mean.`, r: r`Whatever two positive numbers are chosen, the arithmetic mean is never less than the geometric mean.`, key: 'd', sol: r`The arithmetic mean is $\dfrac{12 + 27}{2} = \dfrac{39}{2}$ and the geometric mean is $\sqrt{12 \times 27} = 18$. Since $19.5 > 18$, A is false. R is a true statement (it is the AM-GM relation, and it is the reason A fails).`, d: 2, c: 'understanding', t: [3] }), (C) => {
  C.assert(fr(39, 2).num() > 18 && 18 * 18 === 12 * 27, 'AM 19.5 exceeds GM 18'); C.sol([18, 39]);
});
Q('ar4', mk.ar({ a: r`The tenth term of the geometric progression $2, 6, 18, \ldots$ is $39366$.`, r: r`For a geometric progression with $r \ne 1$, the sum of the first $n$ terms is $\dfrac{a(r^n - 1)}{r - 1}$.`, key: 'b', sol: r`$a_{10} = 2 \times 3^9 = 2 \times 19683 = 39366$, so A is true. R is also a true statement, but it gives the sum of $n$ terms, not the $n$th term, so it does not explain A.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  C.assert(gpTerm(2, 3, 10).eq(39366) && gpList(2, 3, 10)[9].eq(39366) && 3 ** 9 === 19683, 'a_10 = 39366 by formula and listing'); C.sol([39366, 19683]);
});
Q('ar5', mk.ar({ a: r`Four arithmetic means inserted between $7$ and $32$ are $12, 17, 22, 27$.`, r: r`If $n$ arithmetic means are inserted between $a$ and $b$, the common difference of the resulting progression is $\dfrac{b - a}{n + 1}$.`, key: 'a', sol: r`By R, $d = \dfrac{32 - 7}{5} = 5$, so the means are $12, 17, 22, 27$, and A is true. R is the rule that produces them, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const m = apMeans(7, 32, 4);
  C.assert(m.map((x) => x.str()).join() === '12,17,22,27' && apList(7, 5, 6)[5].eq(32), 'means 12, 17, 22, 27'); C.sol([5, 12, 27]);
});
Q('ar6', mk.ar({ a: r`The sum $1 + 2 + 3 + \cdots + 100$ is $5050$.`, r: r`For every positive integer $n$, $1^2 + 2^2 + \cdots + n^2 = (1 + 2 + \cdots + n)^2$.`, key: 'c', sol: r`$\dfrac{100 \times 101}{2} = 5050$, so A is true. R is false: for $n = 2$ the left side is $1 + 4 = 5$ while the right side is $3^2 = 9$. The square of the sum equals the sum of the cubes, not of the squares.`, d: 3, c: 'analysis', t: [4] }), (C) => {
  C.assert(s1(100) === 5050n && L1(1, 100) === 5050n && L2(1, 2) === 5n && L1(1, 2) ** 2n === 9n && L3(1, 2) === 9n, '5050; R fails at n = 2 (5 against 9) and holds for cubes'); C.sol([5050, 5, 9]);
});

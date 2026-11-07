// ISC 11 Mathematics ch09 Binomial Theorem - true-false, fill-blank, numerical and short-2 items.
import { Q, mk } from './lib.mjs';
import { r, range, F, Cm, pascalRow, S, N, mon, fr, fabs, expand, termAt, termList, monoTex, polyTex, coefAt, terms, count, kCombs, bn, pw, fmul, fadd, fpow, feq, dec, decFr, fNum, sd, smul, spow, sadd, ssub } from './bin.mjs';

const T = (a, b, n, k) => termAt(a, b, n, k);

// ============================================================ True-false
Q('tf1', mk.tf({ stem: r`The row of Pascal's triangle that supplies the coefficients of $(a + b)^{8}$ has $8$ entries.`, key: 'f', sol: r`The expansion of $(a + b)^{n}$ has $n + 1$ terms, so the row for $n = 8$ has $9$ entries: $1, 8, 28, 56, 70, 56, 28, 8, 1$.`, d: 1, c: 'understanding', t: [1] }), (C) => {
  C.assert(pascalRow(8).length === 9 && pascalRow(8).join() === '1,8,28,56,70,56,28,8,1', 'row 8 has 9 entries'); C.key('f');
});
Q('tf2', mk.tf({ stem: r`In the expansion of $(a + b)^{n}$ with $n$ even, the middle term is $T_{n/2}$.`, key: 'f', sol: r`There are $n + 1$ terms and the middle one has $n/2$ terms before it, so it is $T_{n/2 + 1}$. For $n = 6$ the middle term is $T_{4}$, not $T_{3}$.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  C.assert(range(1, 10).every((h) => { const n = 2 * h; return n / 2 + 1 - 1 === n - (n / 2 + 1 - 1) && n / 2 !== n / 2 + 1; }) && 6 / 2 + 1 === 4, 'T(n/2 + 1), not T(n/2)'); C.key('f');
});
Q('tf3', mk.tf({ stem: r`The expansions of $(p + q)^{9}$ and $(q + p)^{9}$ contain exactly the same terms, written in the opposite order.`, key: 't', sol: r`Addition is commutative, so the two brackets are equal. The first expansion starts with $p^{9}$ and ends with $q^{9}$, and the second does the reverse. The coefficients $\binom{9}{r}$ are symmetric, so they read the same either way.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const p = expand(mon(1, 1), mon(1, 0, 1), 9), q = expand(mon(1, 0, 1), mon(1, 1), 9);
  C.assert(terms(p).length === 10 && terms(p).every((m) => feq(coefAt(q, m.e[0], m.e[1]), m.c)), 'same terms'); C.key('t');
});
Q('tf4', mk.tf({ stem: r`A learner claims that $x^{r}$ is multiplied by $\binom{n}{r}$ alone when $(1 + 3x)^{n}$ is written out in powers of $x$.`, key: 'f', sol: r`The term is $\binom{n}{r}(3x)^{r} = \binom{n}{r}3^{r}x^{r}$, so the coefficient is $\binom{n}{r}3^{r}$. For $n = 4$, $r = 2$ it is $6 \times 9 = 54$, not $6$.`, d: 2, c: 'analysis', t: [2] }), (C) => {
  const c = coefAt(expand(mon(1), mon(3, 1), 4), 2); C.assert(c.n === 54n && Cm(4, 2) === 6n, 'coefficient 54, not 6'); C.key('f');
});
Q('tf5', mk.tf({ stem: r`The expansion of $\left(x + \dfrac{2}{x}\right)^{9}$ has a term that does not contain $x$.`, key: 'f', sol: r`The power of $x$ in $T_{r+1}$ is $(9 - r) - r = 9 - 2r$. This is $0$ only if $r = 4.5$, which is not a whole number, so no term is free of $x$.`, d: 3, c: 'application', t: [2] }), (C) => {
  const ex = expand(mon(1, 1), mon(2, -1), 9); C.assert(terms(ex).every((m) => m.e[0] !== 0) && terms(ex).length === 10, 'no term free of x'); C.key('f');
});

// ============================================================ Fill in the blank
Q('fb1', mk.fill({ stem: r`In the row of Pascal's triangle for $n = 8$, the entry in the position $r = 3$ (counting the first entry as $r = 0$) is ____.`, acc: [['56']], sol: r`The entry is $\binom{8}{3} = \dfrac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$, which is also $21 + 35$ from the row above.`, d: 1, c: 'understanding', t: [1] }), (C) => {
  C.assert(pascalRow(8)[3] === 56n && Cm(8, 3) === 56n && pascalRow(7)[2] + pascalRow(7)[3] === 56n, 'row 8 position 3 = 56'); C.blank(56);
});
Q('fb2', mk.fill({ stem: r`The expansion of $(a + b)^{15}$ has ____ middle terms.`, acc: [['2', 'two']], sol: r`There are $16$ terms, an even number, so there are $2$ middle terms: $T_{8}$ and $T_{9}$.`, d: 1, c: 'recall', t: [2] }), (C) => {
  C.assert((15 + 1) % 2 === 0 && (15 + 1) / 2 === 8, 'sixteen terms, two middle terms'); C.blank(2);
});
Q('fb3', mk.fill({ stem: r`When $(x + y)^{12}$ is written out, the term in $x^{8}y^{4}$ carries the numerical factor ____.`, acc: [['495']], sol: r`The term with $y^{4}$ has $r = 4$, so its coefficient is $\binom{12}{4} = \dfrac{12 \times 11 \times 10 \times 9}{24} = 495$.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  C.assert(coefAt(expand(mon(1, 1), mon(1, 0, 1), 12), 8, 4).n === 495n && Cm(12, 4) === 495n, 'x^8 y^4 has coefficient 495'); C.blank(495);
});
Q('fb4', mk.fill({ stem: r`The sum $\binom{9}{0} + \binom{9}{1} + \binom{9}{2} + \cdots + \binom{9}{9}$ equals ____.`, acc: [['512']], sol: r`Putting $x = 1$ in $(1 + x)^{9}$ gives the sum $2^{9} = 512$.`, d: 1, c: 'understanding', t: [3] }), (C) => {
  C.assert(pascalRow(9).reduce((s, v) => s + v, 0n) === 512n && 2n ** 9n === 512n, '2^9 = 512'); C.blank(512);
});
Q('fb5', mk.fill({ stem: r`The first two terms of the expansion of $(1 + 0.005)^{20}$ give the approximation ____.`, acc: [['1.1']], sol: r`$1 + 20(0.005) = 1 + 0.1 = 1.1$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  const v = fadd(fr(1), fmul(fr(20), decFr('0.005'))); C.assert(dec(v, 1) === '1.1' && v.d === 10n, '1 + 20 x 0.005 = 1.1'); C.blank(1.1);
});

// ============================================================ Numerical
{
  const t = T(mon(4), mon(-1, 1), 9, 3);
  Q('n1', mk.num({ stem: r`Expanding $(4 - x)^{9}$ in ascending powers of $x$, determine the number that multiplies $x^{3}$.`, value: -344064, unit: null, sol: r`The $x^{3}$ term has $r = 3$: $\binom{9}{3}\,4^{6}(-x)^{3} = 84 \times 4096 \times (-1)\,x^{3}$. The coefficient is $84 \times 4096 \times (-1) = -344064$.`, scheme: [['$\\binom{9}{3}\\,4^{6}(-1)^{3}$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(t.c.n === -344064n && t.e[0] === 3 && coefAt(expand(mon(4), mon(-1, 1), 9), 3).n === -344064n && 84 * 4096 === 344064, '-344064 by formula and by multiplication'); C.val(N(t.c.n));
  });
}
{
  const x = decFr('0.05'); const ts = range(0, 3).map((k) => fmul(fr(Cm(6, k)), fpow(x, k))); const four = ts.reduce(fadd, fr(0));
  Q('n2', mk.num({ stem: r`Use the first four terms of the expansion of $(1 + 0.05)^{6}$ to find an approximate value of $1.05^{6}$.`, value: 1.34, unit: null, sol: r`$1.05^{6} \approx 1 + 6(0.05) + 15(0.05)^{2} + 20(0.05)^{3} = 1 + 0.3 + 0.0375 + 0.0025$. The sum is $1 + 0.3 + 0.0375 + 0.0025 = 1.34$.`, scheme: [['The four terms $1$, $0.3$, $0.0375$, $0.0025$', 1]], marks: 1, d: 3, c: 'application', t: [3], time: 100 }), (C) => {
    C.assert(dec(four, 4) === '1.3400' && dec(ts[1], 4) === '0.3000' && dec(ts[2], 4) === '0.0375' && dec(ts[3], 4) === '0.0025', 'four terms sum to 1.34'); C.val(1.34);
  });
}
{
  const g = (a, b) => ({ a, b }); const mul = (u, v) => g(u.a * v.a - u.b * v.b, u.a * v.b + u.b * v.a);
  let z = g(1n, 0n); for (let i = 0; i < 5; i++) z = mul(z, g(1n, 2n)); // (1 + 2i)^5 by repeated multiplication
  const re = range(0, 5).filter((k) => k % 2 === 0).reduce((s, k) => s + Cm(5, k) * 2n ** BigInt(k) * (k % 4 === 0 ? 1n : -1n), 0n);
  Q('n3', mk.num({ stem: r`Using the binomial theorem and $i^{2} = -1$, find the real part of $(1 + 2i)^{5}$.`, value: 41, unit: null, sol: r`The real part comes from the even powers of $2i$: $\binom{5}{0} + \binom{5}{2}(2i)^{2} + \binom{5}{4}(2i)^{4} = 1 + 10(-4) + 5(16)$. The real part is $1 - 40 + 80 = 41$.`, scheme: [['Even powers of $2i$: $1$, $10(2i)^{2}$, $5(2i)^{4}$', 1]], marks: 1, d: 3, c: 'application', t: [1], time: 120 }), (C) => {
    C.assert(re === 41n && z.a === 41n && z.b === -38n, 'real part 41 by series and by repeated multiplication (41 - 38i)'); C.val(N(re));
  });
}
{
  const sol = range(2, 80).filter((n) => Cm(n, 2) === 78n);
  Q('n4', mk.num({ stem: r`The coefficient of the third term in the expansion of $(1 + x)^{n}$ is $78$. Find $n$.`, value: 13, unit: null, sol: r`The third term has $r = 2$, so its coefficient is $\binom{n}{2} = \dfrac{n(n - 1)}{2} = 78$. Then $n(n - 1) = 156$, that is $(n - 13)(n + 12) = 0$, and the positive root is $n = 13$.`, scheme: [['$n(n - 1) = 156$', 1]], marks: 1, d: 2, c: 'understanding', t: [2], time: 80 }), (C) => {
    C.assert(sol.join() === '13' && 13 * 12 === 156, 'n = 13 by search'); C.val(sol[0]);
  });
}
{
  const ev = range(0, 14).filter((k) => k % 2 === 0).reduce((s, k) => s + Cm(14, k), 0n);
  Q('n5', mk.num({ stem: r`Find the sum of the coefficients of the even powers of $x$ in the expansion of $(1 + x)^{14}$.`, value: 8192, unit: null, sol: r`The coefficients of the even powers are $\binom{14}{0}, \binom{14}{2}, \ldots, \binom{14}{14}$. Putting $x = 1$ and $x = -1$ and adding the two results gives twice this sum: $2^{14} + 0$. The sum is $\dfrac{2^{14}}{2} = 2^{13} = 8192$.`, scheme: [['$(1 + 1)^{14} + (1 - 1)^{14}$ is twice the even sum', 1]], marks: 1, d: 3, c: 'understanding', t: [3], time: 90 }), (C) => {
    C.assert(ev === 8192n && 2n ** 13n === 8192n, 'even-power coefficients add to 8192'); C.val(N(ev));
  });
}

// ============================================================ Short answers, 2 marks
{
  const r4 = pascalRow(4), r5 = pascalRow(5), r6 = pascalRow(6);
  Q('s201', mk.short({ marks: 2, stem: r`Row $4$ of Pascal's triangle is $1, 4, 6, 4, 1$. Build rows $5$ and $6$ by addition and use row $5$ to write the coefficients of $(a + b)^{5}$.`, model: r`Row $5$: the end entries are $1$ and each inner entry is the sum of the two entries above it in row $4$: $1,\ 1 + 4 = 5,\ 4 + 6 = 10,\ 6 + 4 = 10,\ 4 + 1 = 5,\ 1$, giving $1, 5, 10, 10, 5, 1$. Row $6$: $1,\ 1 + 5 = 6,\ 5 + 10 = 15,\ 10 + 10 = 20,\ 10 + 5 = 15,\ 5 + 1 = 6,\ 1$, giving $1, 6, 15, 20, 15, 6, 1$. The coefficients of $(a + b)^{5}$ are $1, 5, 10, 10, 5, 1$.`, sol: 'Each inner entry is the sum of the two entries above it.', scheme: [['Row $5$: $1, 5, 10, 10, 5, 1$', 1], ['Row $6$: $1, 6, 15, 20, 15, 6, 1$', 1]], d: 1, c: 'understanding', t: [1], time: 100 }), (C) => {
    C.assert(r5.join() === '1,5,10,10,5,1' && r6.join() === '1,6,15,20,15,6,1' && r4.join() === '1,4,6,4,1' && r5.every((v, k) => v === Cm(5, k)), 'rows 5 and 6'); C.model([5, 10, 15, 20]);
  });
}
{
  const ex = expand(mon(1, 1), mon(1, -1), 4);
  Q('s202', mk.short({ marks: 2, stem: r`Expand $\left(y + \dfrac{1}{y}\right)^{4}$ and simplify each term.`, model: r`Using the coefficients $1, 4, 6, 4, 1$: $y^{4} + 4y^{3}\cdot\dfrac{1}{y} + 6y^{2}\cdot\dfrac{1}{y^{2}} + 4y\cdot\dfrac{1}{y^{3}} + \dfrac{1}{y^{4}} = ${polyTex(ex, ['y', 'z'])}$.`, sol: 'The power of $y$ falls by $2$ from term to term.', scheme: [['Coefficients $1, 4, 6, 4, 1$ with the powers', 1], ['Simplified: $y^{4} + 4y^{2} + 6 + \\dfrac{4}{y^{2}} + \\dfrac{1}{y^{4}}$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (C) => {
    C.assert(polyTex(ex, ['y', 'z']) === 'y^{4} + 4y^{2} + 6 + \\dfrac{4}{y^{2}} + \\dfrac{1}{y^{4}}', 'expansion'); C.model([4, 6]);
  });
}
{
  const a = mon(2, 2), b = mon(1, -1), n = 6;
  const ok = range(0, n).every((k) => { const t = T(a, b, n, k); return t.c.n === Cm(6, k) * 2n ** BigInt(6 - k) && t.e[0] === 12 - 3 * k; });
  Q('s203', mk.short({ marks: 2, stem: r`Write the general term of $\left(2x^{2} + \dfrac{1}{x}\right)^{6}$ in its simplest form.`, model: r`$T_{r+1} = \binom{6}{r}(2x^{2})^{6-r}\left(\dfrac{1}{x}\right)^{r} = \binom{6}{r}\,2^{6-r}\,x^{2(6-r)}x^{-r} = \binom{6}{r}\,2^{6-r}\,x^{12-3r}$.`, sol: 'Combine the powers of $x$: $2(6 - r) - r = 12 - 3r$.', scheme: [['Substitute into $\\binom{n}{r}a^{n-r}b^{r}$', 1], ['Simplify the power of $x$ to $12 - 3r$', 1]], d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(ok, 'general term matches every term for r = 0..6'); C.model([6, 12]);
  });
}
{
  const t = T(mon(3, 1), mon(2, 0, 1), 7, 4); const row = pascalRow(7);
  Q('s204', mk.short({ marks: 2, stem: r`Find the fifth term in the expansion of $(3x + 2y)^{7}$.`, model: r`The fifth term has $r = 4$: $T_{5} = \binom{7}{4}(3x)^{3}(2y)^{4} = 35 \times 27x^{3} \times 16y^{4} = ${S(t.c.n)}\,x^{3}y^{4}$.`, sol: 'Fifth term means $r + 1 = 5$.', scheme: [['$r = 4$ and $\\binom{7}{4}(3x)^{3}(2y)^{4}$', 1], [`Value $${S(t.c.n)}\\,x^{3}y^{4}$`, 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => {
    C.assert(t.c.n === 15120n && t.e.join() === '3,4' && row[4] === 35n && 35 * 27 * 16 === 15120 && coefAt(expand(mon(3, 1), mon(2, 0, 1), 7), 3, 4).n === 15120n, 'T5 = 15120 x^3 y^4 (formula and multiplication)'); C.model([35, 15120]);
  });
}
{
  const t = T(mon(1, 1), mon(1, -1), 8, 4);
  Q('s205', mk.short({ marks: 2, stem: r`Find the middle term of the expansion of $\left(a + \dfrac{1}{a}\right)^{8}$ and state whether it contains $a$.`, model: r`There are $9$ terms, so the middle term is $T_{5}$ with $r = 4$: $\binom{8}{4}a^{4}\left(\dfrac{1}{a}\right)^{4} = 70 \times 1 = 70$. The powers of $a$ cancel, so the middle term is the constant $70$ and does not contain $a$.`, sol: 'Nine terms, so one middle term.', scheme: [['Middle term is $T_{5}$, $r = 4$', 1], ['$\\binom{8}{4} = 70$, no $a$ remains', 1]], d: 2, c: 'understanding', t: [2], time: 80 }), (C) => {
    C.assert(t.c.n === 70n && t.e[0] === 0 && Cm(8, 4) === 70n, 'middle term is 70'); C.model([70]);
  });
}
{
  const hit = range(0, 9).filter((k) => T(mon(1, 1), mon(1, -1), 9, k).e[0] === 0); const exps = range(0, 9).map((k) => 9 - 2 * k);
  Q('s206', mk.short({ marks: 2, stem: r`Show that the expansion of $\left(x + \dfrac{1}{x}\right)^{9}$ has no term that is independent of $x$.`, model: r`$T_{r+1} = \binom{9}{r}x^{9-r}x^{-r} = \binom{9}{r}x^{9-2r}$. For a term free of $x$ we need $9 - 2r = 0$, so $r = 4.5$. But $r$ must be a whole number from $0$ to $9$, so no such term exists. (Indeed $9 - 2r$ is always odd.)`, sol: 'Show that the exponent is never zero.', scheme: [['$T_{r+1} = \\binom{9}{r}x^{9-2r}$', 1], ['$9 - 2r = 0$ gives $r = 4.5$, not a whole number', 1]], d: 3, c: 'analysis', t: [2], time: 100 }), (C) => {
    C.assert(hit.length === 0 && exps.every((e) => e % 2 !== 0) && 9 / 2 === 4.5, 'exponents 9, 7, ..., -9 are all odd'); C.model([9, 4.5]);
  });
}
{
  const ev = range(0, 10).filter((k) => k % 2 === 0).reduce((s, k) => s + Cm(10, k), 0n);
  Q('s207', mk.short({ marks: 2, stem: r`Find the value of $\binom{10}{0} + \binom{10}{2} + \binom{10}{4} + \cdots + \binom{10}{10}$.`, model: r`In $(1 + x)^{10}$ put $x = 1$: $\sum \binom{10}{r} = 2^{10}$; put $x = -1$: $\sum (-1)^{r}\binom{10}{r} = 0$. The even-numbered sum equals the odd-numbered sum, so each is $\dfrac{2^{10}}{2} = \dfrac{1024}{2} = 2^{9} = 512$.`, sol: 'Add the results of $x = 1$ and $x = -1$, then halve.', scheme: [['Use $x = 1$ and $x = -1$ in $(1 + x)^{10}$', 1], ['Even sum $= 2^{9} = 512$', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => {
    C.assert(ev === 512n && 2n ** 9n === 512n, 'even sum 512'); C.model([1024, 512]);
  });
}
{
  const x = decFr('0.02'); const ts = range(0, 3).map((k) => fmul(fr(Cm(9, k)), fpow(x, k))); const four = ts.reduce(fadd, fr(0)); const exact = fmul(fr(102n ** 9n), fr(1, 100n ** 9n));
  Q('s208', mk.short({ marks: 2, stem: r`Use the first four terms of the expansion of $(1 + 0.02)^{9}$ to find $1.02^{9}$ correct to three decimal places.`, model: r`$1.02^{9} \approx 1 + 9(0.02) + 36(0.02)^{2} + 84(0.02)^{3} = 1 + 0.18 + 0.0144 + 0.000672 = 1.195072$. Correct to three decimal places the value is $1.195$.`, sol: 'Write each term as a decimal, then add.', scheme: [['The four terms $1, 0.18, 0.0144, 0.000672$', 1], ['Sum $1.195072 \\approx 1.195$', 1]], d: 2, c: 'application', t: [3], time: 100 }), (C) => {
    C.assert(dec(four, 6) === '1.195072' && dec(four, 3) === '1.195' && dec(exact, 3) === '1.195', 'four terms 1.195072; exact 1.195'); C.model([0.18, 0.0144, 0.000672, 1.195]);
  });
}
{
  const t = T(mon(3), mon(2, 1), 7, 3);
  Q('s209', mk.short({ marks: 2, stem: r`Once $(3 + 2x)^{7}$ has been expanded, which number stands in front of $x^{3}$? Show the working.`, model: r`The $x^{3}$ term has $r = 3$: $\binom{7}{3}\,3^{4}(2x)^{3} = 35 \times 81 \times 8\,x^{3}$. The coefficient is $35 \times 81 \times 8 = ${S(t.c.n)}$.`, sol: 'Match $x^{r}$ with $r = 3$.', scheme: [['$\\binom{7}{3}\\,3^{4}(2x)^{3}$', 1], [`Value ${S(t.c.n)}`, 1]], d: 2, c: 'understanding', t: [2], time: 80 }), (C) => {
    C.assert(t.c.n === 22680n && 35 * 81 * 8 === 22680 && coefAt(expand(mon(3), mon(2, 1), 7), 3).n === 22680n, '22680 by formula and by multiplication'); C.model([35, 81, 22680]);
  });
}
{
  // coefficients of x^2 and x^3 in (3 + kx)^9 equal -> k = 9/7
  const k = fr(9, 7);
  const c2 = fmul(fr(Cm(9, 2) * 3n ** 7n), fpow(k, 2)), c3 = fmul(fr(Cm(9, 3) * 3n ** 6n), fpow(k, 3));
  const roots = feq(fmul(fr(84), k), fr(108)) ? 1 : 0; // after dividing by 3^6 k^2: 36 x 3 = 84 k
  Q('s210', mk.short({ marks: 2, stem: r`The coefficients of $x^{2}$ and $x^{3}$ in the expansion of $(3 + kx)^{9}$ are equal, where $k$ is a non-zero constant. Find $k$.`, model: r`The coefficient of $x^{2}$ is $\binom{9}{2}\,3^{7}k^{2} = 36 \times 3^{7}k^{2}$ and of $x^{3}$ is $\binom{9}{3}\,3^{6}k^{3} = 84 \times 3^{6}k^{3}$. Equating and dividing by $3^{6}k^{2}$ (non-zero): $36 \times 3 = 84k$, so $k = \dfrac{108}{84} = \dfrac{9}{7}$.`, sol: 'Divide out the common factor $3^{6}k^{2}$.', scheme: [['Both coefficients written with $k$', 1], ['$108 = 84k$, so $k = \\dfrac{9}{7}$', 1]], d: 4, c: 'application', t: [2], time: 140 }), (C) => {
    C.assert(feq(c2, c3) && k.n === 9n && k.d === 7n && Cm(9, 2) === 36n && Cm(9, 3) === 84n && roots === 1, 'k = 9/7 makes both coefficients equal'); C.model([36, 84, 108, 9, 7]);
  });
}

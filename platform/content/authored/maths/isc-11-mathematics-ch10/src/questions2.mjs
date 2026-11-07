// ISC 11 Mathematics ch10 Sequences and Series - true-false, fill-in-the-blank, numerical and 2-mark short items.
import { Q, mk } from './lib.mjs';
import { r, range, Fr, fr, sumF, apList, apTerm, apSum, apFrom, apMeans, gpList, gpTerm, gpSum, gpInf, recurring, decimals, gpMeans, s1, s2, s3, L1, L2, L3, LS, diffs, fitQuad, S } from './seq.mjs';

// ============================================================ true-false
Q('tf1', mk.tf({ stem: r`In any arithmetic progression, the sum of the third term and the eleventh term equals the sum of the fifth term and the ninth term.`, key: 't', sol: r`With first term $a$ and common difference $d$: $a_3 + a_{11} = (a + 2d) + (a + 10d) = 2a + 12d$ and $a_5 + a_9 = (a + 4d) + (a + 8d) = 2a + 12d$. Terms whose positions have the same total ($3 + 11 = 5 + 9$) have the same sum.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const ok = [[1, 3], [5, -2], [-7, 4], [0, 9]].every(([a, d]) => apTerm(a, d, 3).add(apTerm(a, d, 11)).eq(apTerm(a, d, 5).add(apTerm(a, d, 9))) && apTerm(a, d, 3).add(apTerm(a, d, 11)).eq(fr(2 * a + 12 * d)));
  C.assert(ok, 'a_3 + a_11 = a_5 + a_9 = 2a + 12d for four sample progressions'); C.key('t');
});
Q('tf2', mk.tf({ stem: r`The geometric progression $4, 2, 1, \ldots$ has the property that the sum of its first ten terms is less than $8$, however the terms are added in order.`, key: 't', sol: r`Here $a = 4$, $r = \dfrac{1}{2}$, so $S_{10} = \dfrac{4(1 - 2^{-10})}{1/2} = 8\left(1 - \dfrac{1}{1024}\right) = \dfrac{1023}{128}$, which is just below $8$. Every partial sum is $8(1 - 2^{-n}) < 8$, the sum to infinity.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  const s10 = gpSum(4, fr(1, 2), 10);
  C.assert(s10.eq(fr(1023, 128)) && sumF(gpList(4, fr(1, 2), 10)).eq(s10) && s10.lt(8) && gpInf(4, fr(1, 2)).eq(8), 'S_10 = 1023/128 < 8 = S_infinity'); C.key('t');
});
Q('tf3', mk.tf({ stem: r`For two different positive numbers $a$ and $b$, their geometric mean $\sqrt{ab}$ always lies strictly between $a$ and $b$.`, key: 't', sol: r`If $0 < a < b$ then $a^2 < ab < b^2$, and taking square roots gives $a < \sqrt{ab} < b$. For example, the geometric mean of $4$ and $9$ is $6$, which lies between them.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  let ok = true; for (let a = 1; a <= 40; a++) for (let b = a + 1; b <= 40; b++) if (!(a * a < a * b && a * b < b * b)) ok = false;
  C.assert(ok && 6 * 6 === 4 * 9, 'a^2 < ab < b^2 for all pairs 1 <= a < b <= 40'); C.key('t');
});
Q('tf4', mk.tf({ stem: r`The sum $11^2 + 12^2 + \cdots + 20^2$ is found by subtracting the sum $1^2 + 2^2 + \cdots + 11^2$ from the sum $1^2 + 2^2 + \cdots + 20^2$.`, key: 'f', sol: r`That subtraction also removes $11^2$. The sum to subtract is $1^2 + \cdots + 10^2 = 385$, the term **before** the block: $2870 - 385 = 2485$. Subtracting $\sum_{1}^{11} k^2 = 506$ would give $2364$, which is $121$ too small.`, d: 2, c: 'analysis', t: [4] }), (C) => {
  C.assert(L2(11, 20) === 2485n && s2(20) - s2(10) === 2485n && s2(20) - s2(11) === 2364n && 2485n - 2364n === 121n && s2(11) === 506n, 'block 11..20 is 2485; wrong subtraction gives 2364'); C.key('f'); C.sol([2485, 385, 2364]);
});
Q('tf5', mk.tf({ stem: r`If an infinite geometric series has common ratio $r$ with $|r| < 1$, then its sum $\dfrac{a}{1 - r}$ is always greater than its first term $a$.`, key: 'f', sol: r`Take $a = 8$ and $r = -\dfrac{1}{2}$: the sum is $\dfrac{8}{3/2} = \dfrac{16}{3}$, which is less than $8$. The sum exceeds $a$ only when $a$ and $\dfrac{1}{1 - r}$ combine to something larger, which for $a > 0$ needs $r > 0$.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const s = gpInf(8, fr(-1, 2));
  C.assert(s.eq(fr(16, 3)) && s.lt(8) && gpInf(8, fr(1, 2)).eq(16), 'a counterexample: r = -1/2 gives 16/3 < 8'); C.key('f'); C.sol([8, 16]);
});

// ============================================================ fill-blank
{
  const { a, d } = apFrom(6, 3, 15, -24);
  Q('fb1', mk.fill({ stem: r`In an arithmetic progression the sixth term is $3$ and the fifteenth term is $-24$. Its common difference is ____.`, acc: [['-3']], sol: r`The nine steps from the sixth to the fifteenth term change the value by $-24 - 3 = -27$, so $d = \dfrac{-27}{9} = -3$.`, d: 2, c: 'understanding', t: [1] }), (C) => {
    C.assert(d.eq(-3) && a.eq(18) && apTerm(a, d, 6).eq(3) && apTerm(a, d, 15).eq(-24), 'd = -3, a = 18 reproduces both terms'); C.blank(-3);
  });
}
Q('fb2', mk.fill({ stem: r`Adding every whole number from $1$ to $25$, that is $1 + 2 + 3 + \cdots + 25$, gives ____.`, acc: [['325']], sol: r`$\dfrac{n(n + 1)}{2} = \dfrac{25 \times 26}{2} = 325$.`, d: 1, c: 'understanding', t: [4] }), (C) => {
  C.assert(s1(25) === 325n && L1(1, 25) === 325n, '325 by formula and by adding 25 terms'); C.blank(325);
});
Q('fb3', mk.fill({ stem: r`The geometric mean of the positive numbers $12$ and $27$ is ____.`, acc: [['18']], sol: r`$\sqrt{12 \times 27} = \sqrt{324} = 18$.`, d: 1, c: 'understanding', t: [2] }), (C) => {
  C.assert(18 * 18 === 12 * 27, '18^2 = 324 = 12 x 27'); C.blank(18);
});
{
  const v = gpInf(32, fr(-3, 5));
  Q('fb4', mk.fill({ stem: r`An infinite geometric series has first term $32$ and common ratio $-\dfrac{3}{5}$. Its sum to infinity is ____.`, acc: [['20']], sol: r`$|r| = \dfrac{3}{5} < 1$, so $S_\infty = \dfrac{32}{1 + 3/5} = \dfrac{32}{8/5} = 20$.`, d: 2, c: 'understanding', t: [2] }), (C) => {
    C.assert(v.eq(20) && Math.abs(gpList(32, fr(-3, 5), 60).reduce((s, x) => s + x.num(), 0) - 20) < 1e-9, 'sum 20: formula and 60 partial terms'); C.blank(20);
  });
}
{
  const v = LS(7, (k) => k * (k + 1));
  Q('fb5', mk.fill({ stem: r`Adding the first $7$ products of consecutive numbers, $1 \cdot 2$, $2 \cdot 3$, $3 \cdot 4$ and so on, gives ____.`, acc: [['168']], sol: r`The $k$th term is $k^2 + k$, so the sum is $\dfrac{7 \times 8 \times 15}{6} + \dfrac{7 \times 8}{2} = 140 + 28 = 168$.`, d: 3, c: 'application', t: [4] }), (C) => {
    C.assert(v === 168n && s2(7) + s1(7) === 168n && 7 * 8 * 9 / 3 === 168, '168 by listing and by formula'); C.blank(168);
  });
}

// ============================================================ numerical
{
  const n = range(1, 100).filter((k) => apTerm(-3, 4, k).eq(85));
  Q('n1', mk.num({ stem: r`How many terms are there in the arithmetic progression $-3, 1, 5, \ldots, 85$?`, value: 23, unit: null, sol: r`$a = -3$, $d = 4$, and $-3 + (n - 1) \times 4 = 85$ gives $(n - 1) \times 4 = 88$, so $n = 23$.`, scheme: [['Set $a + (n - 1)d = 85$ with $a = -3$, $d = 4$', 1]], marks: 1, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => {
    C.assert(n.join() === '23' && apList(-3, 4, 23).pop().eq(85), '23 terms by search and listing'); C.val(23);
  });
}
{
  const xs = range(51, 499).filter((x) => x % 9 === 0), v = xs.reduce((s, x) => s + x, 0);
  Q('n2', mk.num({ stem: r`Find the sum of all the integers between $50$ and $500$ that are divisible by $9$.`, value: 13725, unit: null, sol: r`The multiples are $54, 63, \ldots, 495$, an AP with $d = 9$. From $54 + (n - 1) \times 9 = 495$ we get $n = 50$. The sum is $\dfrac{50}{2}(54 + 495) = 25 \times 549 = 13725$.`, scheme: [['First term $54$, last term $495$, $d = 9$, so $n = 50$', 1]], marks: 1, d: 3, c: 'application', t: [1], time: 120 }), (C) => {
    C.assert(xs[0] === 54 && xs[xs.length - 1] === 495 && xs.length === 50 && v === 13725 && apSum(54, 9, 50).eq(13725), '13725 by listing all multiples of 9 and by the AP formula'); C.val(13725);
  });
}
{
  const ans = [];
  for (let a = 1; a <= 20; a++) for (let q = 2; q <= 6; q++) if (gpTerm(a, q, 2).eq(12) && gpTerm(a, q, 5).eq(324)) ans.push([a, q]);
  Q('n3', mk.num({ stem: r`A geometric progression of positive terms has second term $12$ and fifth term $324$. Find its seventh term.`, value: 2916, unit: null, sol: r`Dividing, $r^3 = \dfrac{324}{12} = 27$, so $r = 3$ and $a = \dfrac{12}{3} = 4$. Then $a_7 = 4 \times 3^6 = 4 \times 729 = 2916$.`, scheme: [['$r^3 = 27$, so $r = 3$ and $a = 4$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(ans.length === 1 && ans[0].join() === '4,3' && gpTerm(4, 3, 7).eq(2916) && gpList(4, 3, 7)[6].eq(2916), '2916 by search for (a, r) and by listing'); C.val(2916);
  });
}
{
  const n = range(1, 30).find((k) => gpSum(3, 2, k).num() > 1000);
  Q('n4', mk.num({ stem: r`The terms of $3, 6, 12, 24, \ldots$ are added one after another. What is the smallest number of terms whose sum exceeds $1000$?`, value: 9, unit: null, sol: r`$S_n = 3(2^n - 1)$. For $n = 8$, $S_8 = 3 \times 255 = 765$, which is below $1000$; for $n = 9$, $S_9 = 3 \times 511 = 1533$, which exceeds $1000$. So $n = 9$.`, scheme: [['$S_n = 3(2^n - 1) > 1000$, so $2^n > 334$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(n === 9 && gpSum(3, 2, 8).eq(765) && gpSum(3, 2, 9).eq(1533) && sumF(gpList(3, 2, 9)).eq(1533), 'S_8 = 765 and S_9 = 1533 by formula and listing'); C.val(9);
  });
}
{
  const hits = gpMeans(2, 486, 4, [3, -3, 2, 4]), m = hits.find((h) => h.q.eq(3)).means;
  Q('n5', mk.num({ stem: r`Four geometric means, all positive, are inserted between $2$ and $486$. Find the third of these means.`, value: 54, unit: null, sol: r`There are $5$ steps, so $r^5 = \dfrac{486}{2} = 243$ and $r = 3$. The means are $6, 18, 54, 162$, and the third is $2 \times 3^3 = 54$.`, scheme: [['$r^5 = 243$, so $r = 3$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(hits.length === 1 && m.map((x) => x.str()).join() === '6,18,54,162' && gpList(2, 3, 6)[5].eq(486), 'means 6, 18, 54, 162'); C.val(54);
  });
}
{
  const v = L2(6, 15);
  Q('n6', mk.num({ stem: r`Find the value of $6^2 + 7^2 + 8^2 + \cdots + 15^2$.`, value: 1185, unit: null, sol: r`The block is $\sum_{1}^{15} k^2 - \sum_{1}^{5} k^2 = \dfrac{15 \times 16 \times 31}{6} - \dfrac{5 \times 6 \times 11}{6} = 1240 - 55 = 1185$.`, scheme: [['Sum to $15$ minus sum to $5$, the term before the block', 1]], marks: 1, d: 3, c: 'application', t: [4], time: 100 }), (C) => {
    C.assert(v === 1185n && s2(15) - s2(5) === 1185n && s2(15) === 1240n && s2(5) === 55n, '1185 by listing 10 squares and by formula'); C.val(1185);
  });
}

// ============================================================ short, 2 marks
{
  const { a, d } = apFrom(4, 17, 10, 41), t20 = apTerm(a, d, 20);
  Q('s201', mk.short({ marks: 2, stem: r`The fourth term of an arithmetic progression is $17$ and its tenth term is $41$. Find the first term, the common difference and the twentieth term.`, model: r`$a_{10} - a_4 = 6d = 24$, so $d = 4$. Then $a = 17 - 3 \times 4 = 5$. The twentieth term is $a_{20} = 5 + 19 \times 4 = 81$.`, sol: 'Subtract the two given terms to remove $a$ and find $d$.', scheme: [['$6d = 24$, so $d = 4$ and $a = 5$', 1], ['$a_{20} = 5 + 19 \\times 4 = 81$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (C) => {
    C.assert(a.eq(5) && d.eq(4) && t20.eq(81) && apList(a, d, 20)[3].eq(17) && apList(a, d, 20)[9].eq(41) && apList(a, d, 20)[19].eq(81), 'a = 5, d = 4, a_20 = 81 by listing'); C.model([4, 5, 81]);
  });
}
{
  const v = apSum(-5, 4, 40);
  Q('s202', mk.short({ marks: 2, stem: r`Find the sum of the first $40$ terms of the arithmetic progression $-5, -1, 3, 7, \ldots$`, model: r`$a = -5$, $d = 4$, $n = 40$. $S_{40} = \dfrac{40}{2}\,[2(-5) + 39 \times 4] = 20 \times 146 = 2920$.`, sol: 'Use $S_n = \\dfrac{n}{2}[2a + (n-1)d]$ with a negative first term.', scheme: [['$a = -5$, $d = 4$ and the sum formula with $n = 40$', 1], ['$20 \\times 146 = 2920$', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => {
    C.assert(v.eq(2920) && sumF(apList(-5, 4, 40)).eq(2920), 'S_40 = 2920 by formula and by adding 40 terms'); C.model([4, 146, 2920]);
  });
}
{
  const m = apMeans(6, 30, 3);
  Q('s203', mk.short({ marks: 2, stem: r`Insert three arithmetic means between $6$ and $30$, and find the sum of the five numbers in the progression.`, model: r`There are $5$ terms, so $d = \dfrac{30 - 6}{4} = 6$. The means are $12, 18, 24$. The sum is $\dfrac{5}{2}(6 + 30) = 90$.`, sol: 'Count the steps: three means give four equal steps.', scheme: [['$d = \\dfrac{30 - 6}{4} = 6$; means $12, 18, 24$', 1], ['Sum $\\dfrac{5}{2}(6 + 30) = 90$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (C) => {
    C.assert(m.map((x) => x.str()).join() === '12,18,24' && sumF([fr(6), ...m, fr(30)]).eq(90) && apSum(6, 6, 5).eq(90), 'means 12, 18, 24; total 90'); C.model([6, 12, 18, 24, 90]);
  });
}
{
  const ans = [];
  for (let a = -10; a <= 10; a++) for (let q = -5; q <= 5; q++) if (q && a && gpTerm(a, q, 4).eq(-24) && gpTerm(a, q, 7).eq(192)) ans.push([a, q]);
  Q('s204', mk.short({ marks: 2, stem: r`The fourth term of a geometric progression is $-24$ and its seventh term is $192$. Find the common ratio and the first term.`, model: r`Dividing, $r^3 = \dfrac{192}{-24} = -8$, so $r = -2$. From $a r^3 = -24$ we get $a \times (-8) = -24$, so $a = 3$. The progression is $3, -6, 12, -24, \ldots$.`, sol: 'Divide the two terms; the cube root of a negative number is negative.', scheme: [['$r^3 = -8$, so $r = -2$', 1], ['$a(-8) = -24$, so $a = 3$', 1]], d: 2, c: 'understanding', t: [2], time: 100 }), (C) => {
    C.assert(ans.length === 1 && ans[0].join() === '3,-2' && gpList(3, -2, 7).map((x) => x.str()).join() === '3,-6,12,-24,48,-96,192', 'a = 3, r = -2 by search; list ends 192'); C.model([8, 2, 3, 24]);
  });
}
{
  const v = gpSum(5, -2, 7);
  Q('s205', mk.short({ marks: 2, stem: r`Find the sum of the first seven terms of the geometric progression $5, -10, 20, -40, \ldots$`, model: r`$a = 5$, $r = -2$, $n = 7$, and $(-2)^7 = -128$. $S_7 = \dfrac{5\,[(-2)^7 - 1]}{-2 - 1} = \dfrac{5 \times (-129)}{-3} = 215$.`, sol: 'Use $S_n = \\dfrac{a(r^n - 1)}{r - 1}$ with $r = -2$.', scheme: [['$r = -2$ and $(-2)^7 = -128$ in the formula', 1], ['$\\dfrac{5 \\times (-129)}{-3} = 215$', 1]], d: 2, c: 'understanding', t: [2], time: 100 }), (C) => {
    C.assert(v.eq(215) && sumF(gpList(5, -2, 7)).eq(215), 'S_7 = 215 by formula and by adding 7 terms'); C.model([128, 129, 215]);
  });
}
{
  const v = gpInf(54, fr(-1, 3));
  Q('s206', mk.short({ marks: 2, stem: r`Find the sum to infinity of the series $54 - 18 + 6 - 2 + \cdots$ and say why the sum exists.`, model: r`The common ratio is $r = \dfrac{-18}{54} = -\dfrac{1}{3}$, and $|r| < 1$, so the sum exists. $S_\infty = \dfrac{54}{1 + 1/3} = \dfrac{54}{4/3} = \dfrac{81}{2}$.`, sol: 'Check $|r| < 1$ first, then use $\\dfrac{a}{1 - r}$.', scheme: [['$r = -\\dfrac{1}{3}$ with $|r| < 1$, so the sum exists', 1], ['$S_\\infty = \\dfrac{54}{4/3} = \\dfrac{81}{2}$', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => {
    C.assert(v.eq(fr(81, 2)) && Math.abs(gpList(54, fr(-1, 3), 60).reduce((s, x) => s + x.num(), 0) - 40.5) < 1e-9, '81/2 by formula and 60 partial terms'); C.model([3, 54, 81]);
  });
}
{
  const v = recurring('', '592');
  Q('s207', mk.short({ marks: 2, stem: r`Write $0.\overline{592} = 0.592592592\ldots$ as a fraction in its lowest terms by treating the repeating block as a geometric series.`, model: r`It is a GP with first term $0.592$ and ratio $0.001$. Its sum is $\dfrac{0.592}{1 - 0.001} = \dfrac{592}{999} = \dfrac{16}{27}$ (dividing top and bottom by $37$).`, sol: 'Treat the repeating block as an infinite GP with ratio $10^{-3}$.', scheme: [['$\\dfrac{0.592}{1 - 0.001} = \\dfrac{592}{999}$', 1], ['Lowest terms $\\dfrac{16}{27}$', 1]], d: 2, c: 'understanding', t: [2], time: 100 }), (C) => {
    C.assert(v.eq(fr(16, 27)) && decimals(v, 12) === '592592592592' && 592 === 37 * 16 && 999 === 37 * 27, '16/27 = 0.592592...'); C.model([592, 999, 16, 27, 37]);
  });
}
{
  const am = fr(12 + 75, 2), gm = 30;
  Q('s208', mk.short({ marks: 2, stem: r`Find the arithmetic mean and the geometric mean of $12$ and $75$, and show that the arithmetic mean is the larger.`, model: r`$A = \dfrac{12 + 75}{2} = \dfrac{87}{2} = 43.5$ and $G = \sqrt{12 \times 75} = \sqrt{900} = 30$. Since $43.5 > 30$, the arithmetic mean is the larger.`, sol: 'Compare the two values; the difference is $13.5$.', scheme: [['$A = \\dfrac{87}{2}$ and $G = \\sqrt{900} = 30$', 1], ['$43.5 > 30$', 1]], d: 1, c: 'understanding', t: [3], time: 75 }), (C) => {
    C.assert(am.eq(fr(87, 2)) && gm * gm === 12 * 75 && am.num() > gm, 'A = 43.5, G = 30'); C.model([87, 43.5, 30]);
  });
}
{
  const v = L2(1, 20);
  Q('s209', mk.short({ marks: 2, stem: r`Use the formula for $\sum k^2$ to find $1^2 + 2^2 + 3^2 + \cdots + 20^2$.`, model: r`$\sum_{k=1}^{n} k^2 = \dfrac{n(n + 1)(2n + 1)}{6}$. For $n = 20$: $\dfrac{20 \times 21 \times 41}{6} = 10 \times 7 \times 41 = 2870$.`, sol: 'Substitute $n = 20$ and cancel before multiplying.', scheme: [['Formula with $n = 20$', 1], ['$\\dfrac{20 \\times 21 \\times 41}{6} = 2870$', 1]], d: 1, c: 'recall', t: [4], time: 75 }), (C) => {
    C.assert(v === 2870n && s2(20) === 2870n, '2870 by listing and by formula'); C.model([20, 21, 41, 2870]);
  });
}
{
  const v = L3(1, 14);
  Q('s210', mk.short({ marks: 2, stem: r`Find $1^3 + 2^3 + \cdots + 14^3$, and show that it equals the square of $1 + 2 + \cdots + 14$.`, model: r`$1 + 2 + \cdots + 14 = \dfrac{14 \times 15}{2} = 105$. Then $\sum k^3 = 105^2 = 11025$. So the sum of the cubes equals the square of the sum of the numbers.`, sol: 'The sum of cubes is the square of $\\dfrac{n(n+1)}{2}$.', scheme: [['$\\sum k = 105$', 1], ['$\\sum k^3 = 105^2 = 11025$', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => {
    C.assert(v === 11025n && s1(14) === 105n && 105n * 105n === 11025n && L1(1, 14) === 105n, '11025 = 105^2 by listing'); C.model([105, 11025]);
  });
}
{
  const t = [3, 8, 15, 24], q = fitQuad(t);
  Q('s211', mk.short({ marks: 2, stem: r`The sequence $3, 8, 15, 24, \ldots$ has constant second differences. Find its $n$th term and its tenth term.`, model: r`First differences $5, 7, 9$; second differences $2, 2$, so $A = 1$. From $1 + B + C = 3$ and $4 + 2B + C = 8$ we get $B = 2$, $C = 0$. So $a_n = n^2 + 2n$ and $a_{10} = 100 + 20 = 120$.`, sol: 'The second difference $2$ equals $2A$.', scheme: [['$A = 1$, $B = 2$, $C = 0$: $a_n = n^2 + 2n$', 1], ['$a_{10} = 120$', 1]], d: 2, c: 'application', t: [4], time: 110 }), (C) => {
    C.assert(diffs(diffs(t)).join() === '2,2' && q.A.eq(1) && q.B.eq(2) && q.C.eq(0) && q.at(10).eq(120) && range(1, 4).every((n) => q.at(n).eq(t[n - 1])), 'a_n = n^2 + 2n, a_10 = 120'); C.model([2, 120]);
  });
}

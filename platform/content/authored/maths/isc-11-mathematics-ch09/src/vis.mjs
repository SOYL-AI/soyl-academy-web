// Visuals for ISC 11 Mathematics ch09 Binomial Theorem. Every number in a table or figure is computed here and asserted.
import { table, flow, geom } from './lib.mjs';
import { r, range, F, Cm, pascalRow, S, N, mon, fr, fabs, fTex, fNum, dec, decFr, fmul, fadd, fpow, feq, expand, termAt, termList, monoTex, polyTex, coefAt, terms, bn, pw, kCombs, count, sd, smul, spow, sadd, ssub, sTex } from './bin.mjs';

export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
const tx = (s) => `$${s}$`;
export const V = {};

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Pascal\'s triangle'], ['b', 'The binomial theorem and its proof'], ['c', 'Special expansions'], ['d', 'The general term'], ['e', 'Particular terms and sums of two expansions']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: Pascal\'s triangle, the binomial theorem with its proof by induction, special expansions, the general term, and finding particular terms or the sum of two expansions.', 'Part 1 at a glance.');

// Pascal's triangle drawn as labelled points, rows 0..6, with one addition highlighted (row 5 entry 10 = 4 + 6)
{
  const rows = range(0, 6).map((n) => pascalRow(n));
  must(rows.every((row, n) => row.every((v, k) => v === Cm(n, k))), 'pascal rows agree with factorial formula');
  const points = {}; const segments = [];
  rows.forEach((row, n) => row.forEach((v, k) => { points[`p${n}_${k}`] = { at: [Math.round((7 + (k - n / 2) * 1.7) * 100) / 100, 7.2 - n * 1.05], label: S(v), label_position: 'n' }; }));
  must(rows[5][2] === 10n && rows[4][1] + rows[4][2] === 10n && rows[4][1] === 4n && rows[4][2] === 6n, 'highlight 4 + 6 = 10');
  segments.push({ from: 'p4_1', to: 'p5_2' }, { from: 'p4_2', to: 'p5_2' });
  V.pascal = geom({ width: 14, height: 8.6, points, segments, not_to_scale: true }, 'Pascal\'s triangle for rows 0 to 6: row 0 is 1, row 1 is 1 1, row 2 is 1 2 1, row 3 is 1 3 3 1, row 4 is 1 4 6 4 1, row 5 is 1 5 10 10 5 1 and row 6 is 1 6 15 20 15 6 1. Two lines join 4 and 6 in row 4 to 10 in row 5 to show that each entry is the sum of the two above it.', 'Each entry is the sum of the two entries above it.');
}
// building row 6 from row 5
{
  const r5 = pascalRow(5), r6 = pascalRow(6);
  const a = [...r5, 0n], b = [0n, ...r5];
  must(a.map((v, i) => v + b[i]).every((v, i) => v === r6[i]) && r6.every((v, k) => v === Cm(6, k)), 'row 6 by shifted addition');
  V.addRow = table(['', ...range(0, 6).map((k) => `$r = ${k}$`)], [['Row 5', ...a.map((v) => `$${v}$`)], ['Row 5 moved one place right', ...b.map((v) => `$${v}$`)], ['Add: row 6', ...r6.map((v) => `$${v}$`)]], 'Table that builds row 6 of Pascal\'s triangle from row 5: row 5 is 1 5 10 10 5 1, the same row moved one place right is added to it, and the sum is 1 6 15 20 15 6 1, which equals the binomial coefficients six choose r.', 'Add the row to itself shifted by one place.');
}
// we1: (2m - n)^4 from row 4
{
  const a = mon(2, 1, 0), b = mon(-1, 0, 1), n = 4;
  const ex = expand(a, b, n); const row = pascalRow(4);
  const rows = termList(a, b, n).map((t) => [`$${t.r}$`, `$${row[t.r]}$`, tx(`(2m)^{${n - t.r}}`), tx(`(-n)^{${t.r}}`), tx(monoTex(t, ['m', 'n']))]);
  must(polyTex(ex, ['m', 'n']) === '16m^{4} - 32m^{3}n + 24m^{2}n^{2} - 8mn^{3} + n^{4}', 'we1 expansion');
  V.we1 = table(['$r$', 'Row 4', 'Power of $2m$', 'Power of $-n$', 'Term'], rows, 'Worked example 1 table: using row 4 of Pascal\'s triangle, 1 4 6 4 1, the expansion of 2m minus n to the power 4 has the terms 16 m to the fourth, minus 32 m cubed n, plus 24 m squared n squared, minus 8 m n cubed and plus n to the fourth.', `$(2m - n)^4 = ${polyTex(ex, ['m', 'n'])}$`);
}
// binomial theorem table, n = 5, symbolic
{
  const rows = range(0, 5).map((k) => [`$${k}$`, tx(bn(5, k)), tx(`a^{${5 - k}}`), tx(`b^{${k}}`), tx(`${Cm(5, k)}a^{${5 - k}}b^{${k}}`.replace('^{1}', '').replace(/^1(?=a)/, '').replace('a^{0}', '').replace('b^{0}', ''))]);
  must(range(0, 5).map((k) => Cm(5, k)).join() === '1,5,10,10,5,1', 'row 5');
  V.thm = table(['$r$', 'Coefficient', 'Power of $a$', 'Power of $b$', 'Term'], rows, 'Table for the binomial theorem with n equal to 5: for r from 0 to 5 the coefficient is five choose r, the power of a falls from 5 to 0, the power of b rises from 0 to 5, and the terms are a to the fifth, 5 a to the fourth b, 10 a cubed b squared, 10 a squared b cubed, 5 a b to the fourth and b to the fifth.', '$(a + b)^{n} = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^{r}$');
}
// proof by induction: multiplying (a+b)^4 by (a+b)
{
  const k = 4;
  const rows = range(0, k + 1).map((rr) => {
    const fromA = Cm(k, rr), fromB = Cm(k, rr - 1);
    must(fromA + fromB === Cm(k + 1, rr), `pascal rule k=${k} r=${rr}`);
    return [`$${rr}$`, `$${fromA}$`, `$${fromB}$`, `$${fromA + fromB}$`, tx(bn(k + 1, rr))];
  });
  V.proof1 = table(['Power of $b$ in the product', 'From $a \\times$ (earlier term): $\\binom{4}{r}$', 'From $b \\times$ (earlier term): $\\binom{4}{r-1}$', 'Total coefficient', 'Equals'], rows, 'Table showing the induction step for k equal to 4: when the expansion of a plus b to the fourth is multiplied by a plus b, the coefficient of a to the 5 minus r times b to the r is four choose r plus four choose r minus 1, and this equals five choose r by Pascal\'s rule, giving 1, 5, 10, 10, 5, 1.', 'Two earlier terms feed each new term, and Pascal\'s rule adds them.');
}
V.proof2 = flow('LR', [['a', 'Base case $n = 1$: both sides equal $a + b$'], ['b', 'Assume true for $n = k$'], ['c', 'Multiply both sides by $a + b$'], ['d', 'Collect: coefficient is $\\binom{k}{r} + \\binom{k}{r-1}$'], ['e', 'Pascal\'s rule gives $\\binom{k+1}{r}$: true for $n = k + 1$']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the proof by induction: check n equal to 1, assume the theorem for n equal to k, multiply by a plus b, collect the coefficients as k choose r plus k choose r minus 1, and use Pascal\'s rule to get k plus 1 choose r, so the theorem holds for k plus 1.', 'Proof by induction in five steps.');
// features table for n = 6, with (a+b) and (a-b)
{
  const rows = range(0, 6).map((k) => [`$${k + 1}$`, tx(`${bn(6, k)} = ${Cm(6, k)}`), tx(`a^{${6 - k}}b^{${k}}`.replace('^{1}', '').replace('a^{0}', '').replace('b^{0}', '')), k % 2 ? '$-$' : '$+$']);
  must(range(0, 6).every((k) => Cm(6, k) === Cm(6, 6 - k)) && range(0, 6).reduce((s, k) => s + Cm(6, k), 0n) === 64n, 'symmetry and sum for n = 6');
  V.feat = table(['Term number', 'Coefficient', 'Letters', 'Sign in $(a - b)^6$'], rows, 'Table of features for n equal to 6: seven terms with coefficients 1, 6, 15, 20, 15, 6, 1 that read the same from either end, powers of a falling from 6 to 0 and powers of b rising from 0 to 6 so that the indices always add to 6, and signs that alternate in the expansion of a minus b to the sixth.', 'There are $n + 1$ terms and the indices of $a$ and $b$ add up to $n$.');
}
// we2: (2y - 1/y)^4
{
  const a = mon(2, 1, 0), b = mon(-1, -1, 0), n = 4;
  const ex = expand(a, b, n);
  const rows = termList(a, b, n).map((t) => [`$${t.r}$`, tx(`${Cm(4, t.r)} \\times (2y)^{${4 - t.r}} \\times \\left(-\\dfrac{1}{y}\\right)^{${t.r}}`), tx(monoTex(t, ['y', 'z']))]);
  must(polyTex(ex, ['y', 'z']) === '16y^{4} - 32y^{2} + 24 - \\dfrac{8}{y^{2}} + \\dfrac{1}{y^{4}}', 'we2 expansion');
  V.we2 = table(['$r$', 'Term $\\binom{4}{r}(2y)^{4-r}\\left(-\\frac{1}{y}\\right)^{r}$', 'Simplified'], rows, 'Worked example 2 table: expanding 2y minus 1 over y to the fourth gives 16 y to the fourth, minus 32 y squared, plus 24, minus 8 over y squared and plus 1 over y to the fourth.', `$\\left(2y - \\dfrac{1}{y}\\right)^{4} = ${polyTex(ex, ['y', 'z'])}$`);
}
// special cases n = 5: the printed expansions are asserted against the exact engine
{
  const asc = (p) => terms(p).reverse().map((m) => N(m.c.n)).join();
  must(asc(expand(mon(1), mon(1, 1), 5)) === '1,5,10,10,5,1' && asc(expand(mon(1), mon(-1, 1), 5)) === '1,-5,10,-10,5,-1', 'special cases (1 +- x)^5');
  must(terms(expand(mon(1, 1), mon(-1, 0, 1), 5)).map((m) => N(m.c.n)).join() === '1,-5,10,-10,5,-1', 'special case (a - b)^5');
  V.special = table(['Expression', 'Rule', 'Expansion for $n = 5$ (ascending powers of $x$)'], [
    [tx('(1 + x)^{n}'), tx('\\sum \\binom{n}{r} x^{r}'), tx('1 + 5x + 10x^{2} + 10x^{3} + 5x^{4} + x^{5}')],
    [tx('(1 - x)^{n}'), 'replace $x$ by $-x$: signs alternate', tx('1 - 5x + 10x^{2} - 10x^{3} + 5x^{4} - x^{5}')],
    [tx('(a - b)^{n}'), 'replace $b$ by $-b$', tx('a^{5} - 5a^{4}b + 10a^{3}b^{2} - 10a^{2}b^{3} + 5ab^{4} - b^{5}')],
  ], 'Table of special cases for n equal to 5: the expansion of 1 plus x to the fifth, the expansion of 1 minus x to the fifth obtained by replacing x with minus x so the signs alternate, and a minus b to the fifth obtained by replacing b with minus b.', 'Replace $b$ by $-b$ to get alternating signs.');
}
// general term table n = 7
{
  const rows = [0, 1, 2, 3].map((k) => [`$${k}$`, `$${k + 1}$`, tx(`T_{${k + 1}} = \\binom{7}{${k}} a^{${7 - k}} b^{${k}}`.replace('^{1}', '')), `$${Cm(7, k)}$`]);
  V.gen = table(['$r$', 'Term number $r + 1$', 'Term', 'Coefficient'], rows, 'Table of the general term for n equal to 7: for r equal to 0, 1, 2 and 3 the terms are the first, second, third and fourth terms, with coefficients 1, 7, 21 and 35 from seven choose r. The term number is always r plus 1.', '$T_{r+1} = \\binom{n}{r} a^{n-r} b^{r}$: the term number is one more than $r$.');
  must([0, 1, 2, 3].map((k) => Cm(7, k)).join() === '1,7,21,35', 'row 7 start');
}
// we3: 6th term of (x^2 - 3y)^8
{
  const a = mon(1, 2, 0), b = mon(-3, 0, 1), n = 8; const t = termAt(a, b, n, 5);
  must(t.c.n === -13608n && t.e.join() === '6,5' && Cm(8, 5) === 56n && 243 * 56 === 13608, 'we3 sixth term');
  V.we3 = table(['Step', 'Work'], [['Which $r$?', 'sixth term, so $r + 1 = 6$ and $r = 5$'], ['Substitute', tx(`T_{6} = ${bn(8, 5)}(x^{2})^{3}(-3y)^{5}`)], ['Simplify', tx(`56 \\times x^{6} \\times (-243)y^{5} = ${monoTex(t, ['x', 'y'])}`)]], 'Worked example 3 table: the sixth term of x squared minus 3y to the eighth uses r equal to 5, giving 56 times x to the sixth times minus 243 y to the fifth, which is minus 13608 x to the sixth y to the fifth.', 'Sixth term: $r = 5$.');
}
V.findpow = flow('LR', [['a', 'Write the general term'], ['b', 'Collect the power of $x$ in terms of $r$'], ['c', 'Set it equal to the required power'], ['d', 'Solve for $r$ (a whole number from $0$ to $n$)'], ['e', 'Substitute $r$ to get the term']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for finding a term with a given power of x: write the general term, collect the power of x in terms of r, set it equal to the power required, solve for r which must be a whole number from 0 to n, then substitute r to get the term.', 'Five steps to a term with a given power.');
// we4: coefficient of x^8 in (4x^3 + 1/(2x))^8
{
  const a = mon(4, 3, 0), b = mon(fr(1, 2), -1, 0), n = 8;
  const hits = range(0, n).filter((k) => termAt(a, b, n, k).e[0] === 8);
  must(hits.join() === '4', 'only r = 4 gives x^8');
  const t = termAt(a, b, n, 4); must(t.c.n === 1120n && t.c.d === 1n && 70 * 256 / 16 === 1120, 'we4 coefficient');
  V.we4 = table(['Step', 'Work'], [['General term', tx(`T_{r+1} = ${bn(8, 'r')}(4x^{3})^{8-r}\\left(\\dfrac{1}{2x}\\right)^{r}`)], ['Power of $x$', tx('3(8 - r) - r = 24 - 4r')], ['Set $24 - 4r = 8$', '$r = 4$'], ['Coefficient', tx(`${bn(8, 4)} \\times 4^{4} \\times \\dfrac{1}{2^{4}} = 70 \\times \\dfrac{256}{16} = 1120`)]], 'Worked example 4 table: in 4x cubed plus 1 over 2x to the eighth, the power of x in the general term is 24 minus 4r; setting this equal to 8 gives r equal to 4, and the coefficient is 70 times 256 over 16, which is 1120.', 'Solve $24 - 4r = 8$ for $r$.');
}
// adding and subtracting (a+b)^5 and (a-b)^5
{
  const sum = expand(mon(1, 1), mon(1, 0, 1), 5), dif = expand(mon(1, 1), mon(-1, 0, 1), 5);
  const plus = terms(sum).map((m) => N(m.c.n)); const minus = terms(dif).map((m) => N(m.c.n));
  must(plus.join() === '1,5,10,10,5,1' && minus.join() === '1,-5,10,-10,5,-1', 'signs');
  V.addsub = table(['Term', '$(a + b)^{5}$', '$(a - b)^{5}$', 'Sum', 'Difference'], range(0, 5).map((k) => { const c = Cm(5, k); const s = k % 2 ? -c : c; return [tx(`a^{${5 - k}}b^{${k}}`.replace('^{1}', '').replace('a^{0}', '').replace('b^{0}', '')), `$${c}$`, `$${s}$`, `$${c + s}$`, `$${c - s}$`]; }), 'Table of the sum and the difference of a plus b to the fifth and a minus b to the fifth: terms with an even power of b double in the sum and cancel in the difference, while terms with an odd power of b cancel in the sum and double in the difference.', 'Sum: even powers of $b$ double. Difference: odd powers double.');
}
// we5: (sqrt3 + 1)^5 - (sqrt3 - 1)^5 = 152
{
  const u = sd(1, 1, 3), v = sd(-1, 1, 3); // 1+sqrt3 ... but we need sqrt3+1 and sqrt3-1: a = sqrt3 (b-part), b = +-1
  const p = spow(sd(1, 1, 3), 5), q = spow(sd(-1, 1, 3), 5); const d = ssub(p, q);
  must(d.b === 0n && d.a === 152n, 'we5 value 152');
  const odd = Cm(5, 1) * 9n + Cm(5, 3) * 3n + Cm(5, 5) * 1n; must(2n * odd === 152n && odd === 76n, 'we5 formula');
  V.we5 = table(['Step', 'Work'], [['Odd powers of $1$ double', tx('(\\sqrt{3} + 1)^{5} - (\\sqrt{3} - 1)^{5} = 2\\left[\\binom{5}{1}(\\sqrt{3})^{4} + \\binom{5}{3}(\\sqrt{3})^{2} + \\binom{5}{5}\\right]')], ['Powers of $\\sqrt{3}$', tx('(\\sqrt{3})^{4} = 9, \\ (\\sqrt{3})^{2} = 3')], ['Value', tx('2(5 \\times 9 + 10 \\times 3 + 1) = 2 \\times 76 = 152')]], 'Worked example 5 table: in root 3 plus 1 to the fifth minus root 3 minus 1 to the fifth, only the terms with an odd power of 1 survive and are doubled; the value is 2 times 5 times 9 plus 10 times 3 plus 1, which is 2 times 76, which is 152.', 'Only half the terms survive, doubled.');
  must(u && v, 'surd');
}
V.summary1 = table(['Idea', 'Result'], [['Pascal\'s triangle', 'each entry is the sum of the two above it; row $n$ gives the coefficients of $(a + b)^{n}$'], ['Binomial theorem', tx('(a + b)^{n} = \\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^{r}')], ['Number of terms', '$n + 1$, with the indices of $a$ and $b$ adding to $n$'], ['General term', tx('T_{r+1} = \\binom{n}{r}a^{n-r}b^{r}')], ['Sum and difference', 'even or odd terms double; the others cancel']], 'Summary table of Part 1: Pascal\'s triangle, the binomial theorem, the number of terms, the general term and the sum and difference of two expansions.', 'Part 1 in five lines.');
V.tips1 = table(['Do', 'Avoid'], [['State the term number is $r + 1$', 'using $r$ as the term number'], ['Put brackets round negative and fractional second terms', 'losing the sign in $(-b)^{r}$'], ['Write the power of $x$ in terms of $r$ before solving', 'guessing $r$'], ['Check that $r$ is a whole number from $0$ to $n$', 'giving a term when $r$ is not valid']], 'Exam tips table for Part 1: state that the term number is r plus 1, bracket negative or fractional second terms, write the power of x in terms of r before solving, and check that r is a whole number from 0 to n.', 'Four habits that save marks.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Middle terms'], ['b', 'Term independent of $x$'], ['c', 'Binomial coefficients and their sums'], ['d', 'Ratios of coefficients'], ['e', 'Approximations and comparisons']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: middle terms, the term independent of x, binomial coefficients and their sums, ratios of consecutive coefficients, and approximations and comparisons.', 'Part 2 at a glance.');
// middle terms table n = 4..9
{
  const rows = range(4, 9).map((n) => { const mid = n % 2 === 0 ? [n / 2 + 1] : [(n + 1) / 2, (n + 3) / 2]; must(mid.every((m) => m >= 1 && m <= n + 1), 'mid in range'); must(n % 2 === 0 ? mid[0] - 1 === n - (mid[0] - 1) : (mid[0] - 1) + (mid[1] - 1) === n, `symmetric positions n=${n}`); return [`$${n}$`, `$${n + 1}$`, n % 2 ? 'two' : 'one', mid.map((m) => `$T_{${m}}$`).join(' and ')]; });
  V.mid = table(['$n$', 'Number of terms', 'Middle terms', 'Which'], rows, 'Table of middle terms for n from 4 to 9: when n is even there are n plus 1 terms, an odd number, and one middle term T of n over 2 plus 1; when n is odd there are two middle terms, T of n plus 1 over 2 and T of n plus 3 over 2.', 'Even $n$: one middle term. Odd $n$: two.');
}
// we1: middle term of (4a - b/2)^6
{
  const a = mon(4, 1, 0), b = mon(fr(-1, 2), 0, 1), n = 6; const t = termAt(a, b, n, 3);
  must(t.c.n === -160n && t.c.d === 1n && t.e.join() === '3,3' && 20 * 64 === 1280 && 1280 / 8 === 160, 'we1 middle term -160');
  V.d2we1 = table(['Step', 'Work'], [['Number of terms', '$6 + 1 = 7$, so one middle term, $T_{4}$ ($r = 3$)'], ['Substitute', tx(`${bn(6, 3)}(4a)^{3}\\left(-\\dfrac{b}{2}\\right)^{3}`)], ['Simplify', tx(`20 \\times 64a^{3} \\times \\left(-\\dfrac{b^{3}}{8}\\right) = ${monoTex(t, ['a', 'b'])}`)]], 'Worked example 1 table: 4a minus b over 2 to the sixth has seven terms, so one middle term, the fourth, with r equal to 3; it is 20 times 64 a cubed times minus b cubed over 8, which is minus 160 a cubed b cubed.', 'Seven terms: the fourth is the middle one.');
}
// we2: middle terms of (1 - 3z)^7
{
  const a = mon(1), b = mon(-3, 1, 0), n = 7; const t4 = termAt(a, b, n, 3), t5 = termAt(a, b, n, 4);
  must(t4.c.n === -945n && t5.c.n === 2835n && t4.e[0] === 3 && t5.e[0] === 4 && 35 * 27 === 945 && 35 * 81 === 2835, 'we2 middle terms');
  V.d2we2 = table(['Term', '$r$', 'Work', 'Value'], [['$T_{4}$', '$3$', tx(`${bn(7, 3)}(-3z)^{3} = 35 \\times (-27z^{3})`), tx(monoTex(t4, ['z', 'w']))], ['$T_{5}$', '$4$', tx(`${bn(7, 4)}(-3z)^{4} = 35 \\times 81z^{4}`), tx(monoTex(t5, ['z', 'w']))]], 'Worked example 2 table: 1 minus 3z to the seventh has eight terms and two middle terms, the fourth and the fifth; the fourth is 35 times minus 27 z cubed, which is minus 945 z cubed, and the fifth is 35 times 81 z to the fourth, which is 2835 z to the fourth.', 'Eight terms: the fourth and fifth are the middle terms.');
}
V.indep = flow('LR', [['a', 'General term $T_{r+1}$'], ['b', 'Power of $x$ in terms of $r$'], ['c', 'Set the power equal to $0$'], ['d', 'Solve for $r$'], ['e', 'Whole number from $0$ to $n$? Yes: substitute. No: no such term']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for the term independent of x: write the general term, find the power of x in terms of r, set it equal to 0, solve for r, and if r is a whole number from 0 to n substitute it, otherwise there is no such term.', 'Set the power of $x$ equal to zero.');
// we3: independent term of (x - 3/x^2)^12
{
  const a = mon(1, 1, 0), b = mon(-3, -2, 0), n = 12;
  const hits = range(0, n).filter((k) => termAt(a, b, n, k).e[0] === 0); must(hits.join() === '4', 'only r = 4');
  const t = termAt(a, b, n, 4); must(t.c.n === 40095n && 495 * 81 === 40095 && Cm(12, 4) === 495n, 'we3 value');
  V.d2we3 = table(['Step', 'Work'], [['General term', tx(`T_{r+1} = ${bn(12, 'r')}x^{12-r}\\left(-\\dfrac{3}{x^{2}}\\right)^{r} = ${bn(12, 'r')}(-3)^{r}x^{12-3r}`)], ['Power of $x$ is $0$', tx('12 - 3r = 0 \\Rightarrow r = 4')], ['Value', tx(`T_{5} = ${bn(12, 4)}(-3)^{4} = 495 \\times 81 = 40095`)]], 'Worked example 3 table: in x minus 3 over x squared to the twelfth the power of x in the general term is 12 minus 3r; this is zero when r is 4, and the term independent of x is 495 times 81, which is 40095.', 'The fifth term is free of $x$.');
}
// we4: no independent term in (x^2 - 3/x^3)^8
{
  const a = mon(1, 2, 0), b = mon(-3, -3, 0), n = 8;
  const rows = range(0, n).map((k) => { const e = termAt(a, b, n, k).e[0]; must(e === 16 - 5 * k, 'exponent formula'); return [`$${k}$`, tx(`16 - 5 \\times ${k} = ${e}`), e === 0 ? 'zero' : 'not zero']; });
  must(rows.every((rw) => rw[2] === 'not zero'), 'no r gives zero');
  V.d2we4 = table(['$r$', 'Power of $x$: $2(8 - r) - 3r$', 'Zero?'], rows, 'Worked example 4 table: in x squared minus 3 over x cubed to the eighth the power of x is 16 minus 5r; for r from 0 to 8 the powers are 16, 11, 6, 1, minus 4, minus 9, minus 14, minus 19 and minus 24, and none is zero, so there is no term independent of x.', '$16 - 5r = 0$ gives $r = 3.2$, not a whole number.');
  must(16 / 5 === 3.2, 'r = 3.2');
}
// binomial coefficient sums for n = 8
{
  const row = pascalRow(8); const even = row.filter((_, k) => k % 2 === 0).reduce((s, v) => s + v, 0n), odd = row.filter((_, k) => k % 2 === 1).reduce((s, v) => s + v, 0n);
  const tot = row.reduce((s, v) => s + v, 0n), alt = row.reduce((s, v, k) => s + (k % 2 ? -v : v), 0n);
  must(tot === 256n && even === 128n && odd === 128n && alt === 0n && row.join() === '1,8,28,56,70,56,28,8,1', 'sums for n = 8');
  V.sums = table(['Sum', 'How', 'Value for $n = 8$'], [['$C_0 + C_1 + \\cdots + C_n$', 'put $x = 1$ in $(1 + x)^{n}$', tx(`2^{8} = ${tot}`)], ['$C_0 - C_1 + C_2 - \\cdots$', 'put $x = -1$', `$${alt}$`], ['$C_0 + C_2 + C_4 + \\cdots$', 'add the two results and halve', tx(`2^{7} = ${even}`)], ['$C_1 + C_3 + C_5 + \\cdots$', 'subtract and halve', tx(`2^{7} = ${odd}`)]], 'Table of sums of binomial coefficients for n equal to 8, whose coefficients are 1, 8, 28, 56, 70, 56, 28, 8, 1: the total is 256, the alternating sum is 0, the sum of the even-numbered coefficients is 128 and the sum of the odd-numbered coefficients is 128.', 'Substitute $x = 1$ and $x = -1$ in $(1 + x)^{n}$.');
}
// we5: sum of coefficients and finding n from the sum of binomial coefficients
{
  const a = mon(2, 1, 0), b = mon(-5), n = 6; const ex = expand(a, b, n);
  const total = terms(ex).reduce((s, m) => fadd(s, m.c), fr(0)); must(total.n === 729n && total.d === 1n && (-3) ** 6 === 729, 'sum of coefficients 729');
  const nn = range(1, 30).filter((k) => pw(2, k) === 1024n); must(nn.join() === '10', 'n = 10');
  V.d2we5 = table(['Part', 'Work', 'Result'], [['(i) Sum of the coefficients of $(2x - 5)^{6}$', tx('\\text{put } x = 1: \\ (2 - 5)^{6} = (-3)^{6}'), '$729$'], ['(ii) Sum of binomial coefficients is $1024$', tx('2^{n} = 1024 = 2^{10}'), '$n = 10$']], 'Worked example 5 table: the sum of the coefficients of 2x minus 5 to the sixth is found by putting x equal to 1, giving minus 3 to the sixth, which is 729; and if the sum of the binomial coefficients is 1024 then 2 to the n is 2 to the 10, so n is 10.', 'Put $x = 1$ to add the coefficients.');
}
// ratio of consecutive coefficients, n = 12
{
  const rows = range(1, 5).map((k) => { const lhs = fr(Cm(12, k), Cm(12, k - 1)), rhs = fr(12 - k + 1, k); must(feq(lhs, rhs), `ratio k=${k}`); return [`$${k}$`, tx(`${Cm(12, k - 1)}, ${Cm(12, k)}`), tx(fTex(rhs)), tx(`\\dfrac{12 - ${k} + 1}{${k}}`)]; });
  V.ratio = table(['$r$', '$\\binom{12}{r-1}$, $\\binom{12}{r}$', 'Ratio $\\binom{12}{r} : \\binom{12}{r-1}$', 'Formula $\\dfrac{n - r + 1}{r}$'], rows, 'Table for n equal to 12 showing that the ratio of consecutive binomial coefficients, twelve choose r over twelve choose r minus 1, equals 12 minus r plus 1 over r: for r from 1 to 5 the ratios are 12, 11 over 2, 10 over 3, 9 over 4 and 8 over 5.', '$\\binom{n}{r} \\big/ \\binom{n}{r-1} = \\dfrac{n - r + 1}{r}$');
}
// we6: three consecutive coefficients in ratio 6 : 20 : 45
{
  const hit = []; for (let n = 3; n <= 60; n++) for (let k = 1; k < n; k++) { const x = Cm(n, k - 1), y = Cm(n, k), z = Cm(n, k + 1); if (x * 20n === y * 6n && y * 45n === z * 20n) hit.push([n, k]); }
  must(hit.length === 1 && hit[0][0] === 12 && hit[0][1] === 3, 'we6 unique n = 12');
  must(Cm(12, 2) === 66n && Cm(12, 3) === 220n && Cm(12, 4) === 495n && 66n * 20n === 220n * 6n && 220n * 45n === 495n * 20n, 'we6 check');
  V.d2we6 = table(['Step', 'Work'], [['Let the coefficients be', tx('\\binom{n}{r-1} : \\binom{n}{r} : \\binom{n}{r+1} = 6 : 20 : 45')], ['First ratio', tx('\\dfrac{n - r + 1}{r} = \\dfrac{20}{6} \\Rightarrow 3n - 13r + 3 = 0')], ['Second ratio', tx('\\dfrac{n - r}{r + 1} = \\dfrac{45}{20} \\Rightarrow 4n - 13r - 9 = 0')], ['Subtract', tx('n = 12 \\text{ and then } r = 3')], ['Check', tx('\\binom{12}{2}, \\binom{12}{3}, \\binom{12}{4} = 66, 220, 495 = 11 \\times (6, 20, 45)')]], 'Worked example 6 table: three consecutive coefficients in the ratio 6 to 20 to 45 give two equations, 3n minus 13r plus 3 equals 0 and 4n minus 13r minus 9 equals 0; subtracting gives n equal to 12 and r equal to 3, and the coefficients 66, 220 and 495 are 11 times 6, 20 and 45.', 'Two ratios give two equations in $n$ and $r$.');
}
// approximation: 1.02^7
{
  const x = decFr('0.02'); const n = 7; const ts = range(0, 7).map((k) => fmul(fr(Cm(n, k)), fpow(x, k)));
  let run = fr(0); const rows = range(0, 4).map((k) => { run = fadd(run, ts[k]); return [`$${k}$`, tx(`${bn(7, k)}(0.02)^{${k}}`), tx(dec(ts[k], 8)), tx(dec(run, 8))]; });
  const exact = fmul(fr(102n ** 7n), fr(1, 100n ** 7n)); const four = ts.slice(0, 4).reduce(fadd, fr(0));
  must(dec(four, 5) === '1.14868' && dec(four, 4) === '1.1487' && dec(exact, 4) === '1.1487' && dec(exact, 9) === '1.148685668', 'we7 values');
  V.approx = table(['$r$', 'Term', 'Value', 'Running total'], rows, 'Table of the first four terms of 1 plus 0.02 to the seventh: 1, 0.14, 0.0084 and 0.00028, with running totals 1, 1.14, 1.1484 and 1.14868. The terms shrink quickly, so a few terms give a good approximation.', 'Each term is much smaller than the one before.');
  V.d2we7 = table(['Step', 'Work'], [['Write', tx('1.02^{7} = (1 + 0.02)^{7}')], ['Terms', tx('1 + 7(0.02) + 21(0.02)^{2} + 35(0.02)^{3} = 1 + 0.14 + 0.0084 + 0.00028')], ['Sum', tx('1.14868')], ['Next term', tx(`35(0.02)^{4} = ${dec(ts[4], 8)}`) + ', too small to change the fourth decimal place'], ['Answer to 4 d.p.', '$1.1487$']], 'Worked example 7 table: 1.02 to the seventh is 1 plus 0.02 to the seventh, and the first four terms are 1, 0.14, 0.0084 and 0.00028 with sum 1.14868; the next term is 0.0000056, too small to change the fourth decimal place, so the answer is 1.1487.', 'Four terms are enough for four decimal places.');
}
// we8: 0.98^6 with three terms (and four terms) -- decreasing alternate signs
{
  const x = decFr('-0.02'); const n = 6; const ts = range(0, 6).map((k) => fmul(fr(Cm(n, k)), fpow(x, k)));
  const three = ts.slice(0, 3).reduce(fadd, fr(0)), four = ts.slice(0, 4).reduce(fadd, fr(0)); const exact = fmul(fr(98n ** 6n), fr(1, 100n ** 6n));
  must(dec(three, 4) === '0.8860' && dec(four, 5) === '0.88584' && dec(exact, 6) === '0.885842' && dec(three, 3) === '0.886' && dec(exact, 3) === '0.886', 'we8 values');
  V.d2we8 = table(['Step', 'Work'], [['Write', tx('0.98^{6} = (1 - 0.02)^{6}')], ['First three terms', tx('1 - 6(0.02) + 15(0.02)^{2} = 1 - 0.12 + 0.006')], ['Sum', tx('0.886')], ['Check with more terms', tx(`\\text{fourth term } -20(0.02)^{3} = ${dec(ts[3], 5)}, \\text{ total } ${dec(four, 5)}`)], ['Answer to 3 d.p.', '$0.886$']], 'Worked example 8 table: 0.98 to the sixth is 1 minus 0.02 to the sixth; the first three terms give 1 minus 0.12 plus 0.006, which is 0.886, and the fourth term, minus 0.00016, leaves 0.88584, which still rounds to 0.886.', 'With $-0.02$ the terms alternate in sign.');
}
// comparison: 1.03^8 > 1.26
{
  const x = decFr('0.03'); const n = 8; const ts = range(0, 8).map((k) => fmul(fr(Cm(n, k)), fpow(x, k)));
  const three = ts.slice(0, 3).reduce(fadd, fr(0)); const exact = fmul(fr(103n ** 8n), fr(1, 100n ** 8n));
  must(dec(three, 4) === '1.2652' && dec(exact, 6) === '1.266770' && ts.every((t) => t.n > 0n) && dec(three, 4) === '1.2652', 'compare 1.03^8');
  V.cmp = table(['Quantity', 'Value', 'Reason'], [['First two terms', tx('1 + 8(0.03) = 1.24'), 'a lower bound, since every other term is positive'], ['First three terms', tx('1.24 + 28(0.03)^{2} = 1.2652'), 'a better lower bound'], ['Conclusion', tx('1.03^{8} > 1.2652 > 1.26'), 'so $1.03^{8} > 1.26$']], 'Table comparing 1.03 to the eighth with 1.26: all terms of the expansion are positive, so the first three terms 1, 0.24 and 0.0252 give a lower bound of 1.2652, which is greater than 1.26.', 'Drop positive terms to get a lower bound.');
  V.d2we9 = table(['Step', 'Work'], [['Expand', tx('(1 + 0.03)^{8} = 1 + 8(0.03) + 28(0.03)^{2} + \\cdots')], ['Every later term is positive', 'so $1.03^{8}$ is at least the sum so far'], ['Sum of three terms', tx('1 + 0.24 + 0.0252 = 1.2652')], ['Compare', tx('1.2652 > 1.26 \\Rightarrow 1.03^{8} > 1.26')]], 'Worked example 9 table: expand 1.03 to the eighth, note that every term is positive, so the sum of the first three terms, 1.2652, is a lower bound that exceeds 1.26, which shows 1.03 to the eighth is greater than 1.26.', 'A lower bound from three terms settles the comparison.');
}
V.summary2 = table(['Idea', 'Result'], [['Middle terms', 'even $n$: $T_{n/2+1}$; odd $n$: $T_{(n+1)/2}$ and $T_{(n+3)/2}$'], ['Term independent of $x$', 'set the power of $x$ in $T_{r+1}$ to $0$; $r$ must be a whole number from $0$ to $n$'], ['Sums of coefficients', tx('\\sum \\binom{n}{r} = 2^{n}, \\ \\text{even sum} = \\text{odd sum} = 2^{n-1}')], ['Ratio', tx('\\binom{n}{r} \\big/ \\binom{n}{r-1} = \\dfrac{n - r + 1}{r}')], ['Approximation', tx('(1 + x)^{n} \\approx 1 + nx + \\binom{n}{2}x^{2} + \\cdots \\text{ for small } x')]], 'Summary table of Part 2: middle terms, the term independent of x, sums of binomial coefficients, ratios of consecutive coefficients and approximation of powers close to 1.', 'Part 2 in five lines.');
V.tips2 = table(['Do', 'Avoid'], [['Count the terms first to decide how many middle terms', 'assuming one middle term'], ['Show the equation for $r$ and its solution', 'quoting a term without finding $r$'], ['Say which values you substituted ($x = 1$ or $x = -1$)', 'stating a sum with no reason'], ['State how many terms you used and why that is enough', 'rounding before the last step']], 'Exam tips table for Part 2: count the terms first to decide how many middle terms there are, show the equation for r and its solution, say which values of x you substituted, and state how many terms you used for an approximation.', 'Four habits that save marks.');

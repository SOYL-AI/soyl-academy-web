// Visuals for ISC 11 Mathematics ch10 Sequences and Series. Every number in a table or figure is computed here (formula and listing) and asserted.
import { table, flow, plot } from './lib.mjs';
import { r, range, Fr, fr, sumF, apList, apTerm, apSum, apMeans, gpList, gpTerm, gpSum, gpInf, partials, gpMeans, recurring, decimals, s1, s2, s3, L1, L2, L3, LS, diffs, fitQuad, S } from './seq.mjs';

export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
export const V = {};
const jn = (xs, sep = ', ') => xs.map((x) => (x instanceof Fr ? x.tex() : String(x))).join(sep);
const M = (t) => `$${t}$`;

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Sequences, series and arithmetic progressions'], ['b', 'Sum of an AP, arithmetic means, choosing terms'], ['c', 'Geometric progressions and their sums'], ['d', 'Infinite GP and recurring decimals'], ['e', 'Geometric means']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: sequences and arithmetic progressions, the sum of an AP with arithmetic means and choosing terms, geometric progressions and their sums, the infinite GP with recurring decimals, and geometric means.', 'Part 1 at a glance.');

// sequence and series
{
  const t = apList(3, 4, 5), tot = sumF(t);
  must(jn(t) === '3, 7, 11, 15, 19' && tot.eq(55) && L1(1, 1) === 1n && apSum(3, 4, 5).eq(55), 'sequence and series');
  V.seq = table(['Idea', 'Written as', 'Example'], [['Sequence', 'an ordered list $a_1, a_2, a_3, \\ldots$', M(jn(t))], ['Series', 'the terms added: $a_1 + a_2 + a_3 + \\cdots$', M(`${jn(t, ' + ')} = ${tot.tex()}`)], ['General term', 'a rule giving $a_n$ from $n$', M('a_n = 4n - 1')]], 'Table comparing a sequence, the list 3, 7, 11, 15, 19, with the series made by adding its terms, which is 55, and the general term a n equal to 4 n minus 1.', 'A series is a sequence with its terms added.');
  must(range(1, 5).every((n) => 4 * n - 1 === Number(t[n - 1].n)), 'a_n = 4n - 1');
}
// AP plot: a = 5, d = 3
{
  const t = apList(5, 3, 7);
  must(t.every((x, i) => x.eq(3 * (i + 1) + 2)), 'a_n = 3n + 2');
  V.apPlot = plot({ x: [0, 8], y: [0, 26], fns: ['3*x+2'], pts: t.map((x, i) => [i + 1, Number(x.n), i === 0 ? '$a_1$' : i === 6 ? '$a_7$' : undefined]), xl: 'n', yl: 'a_n' }, 'Plot of the first seven terms of the arithmetic progression 5, 8, 11, 14, 17, 20, 23 against their position n; the points lie on the straight line a n equal to 3 n plus 2, so equal steps in n give equal steps in the term.', 'An AP lies on a straight line: slope $d = 3$.');
}
// we1: 17, 13, 9, ...
{
  const a = 17, d = -4;
  const t20 = apTerm(a, d, 20), nn = range(1, 60).filter((n) => apTerm(a, d, n).eq(-47));
  must(t20.eq(-59) && nn.join() === '17' && apList(a, d, 20)[19].eq(-59), 'we1');
  V.we1 = table(['Step', 'Work'], [['Read off', M('a = 17,\\; d = 13 - 17 = -4')], ['20th term', M('a_{20} = 17 + 19(-4) = -59')], ['Is $-47$ a term?', M('17 + (n - 1)(-4) = -47 \\Rightarrow n - 1 = 16 \\Rightarrow n = 17')]], 'Worked example 1 table for the arithmetic progression 17, 13, 9 and so on, with first term 17 and common difference minus 4: the twentieth term is minus 59 and minus 47 is the seventeenth term.', 'Use $a_n = a + (n - 1)d$.');
}
// sum of an AP: pairing
{
  const t = apList(3, 4, 5), rev = [...t].reverse();
  const pair = t.map((x, i) => x.add(rev[i]));
  must(pair.every((p) => p.eq(22)) && apSum(3, 4, 5).eq(sumF(t)) && fr(5).mul(22).div(2).eq(55), 'pairing');
  V.apSum = table(['Line', '1st', '2nd', '3rd', '4th', '5th'], [['$S$ forward', ...t.map((x) => M(x.tex()))], ['$S$ reversed', ...rev.map((x) => M(x.tex()))], ['Sum of the two lines', ...pair.map((x) => M(x.tex()))]], 'Table that writes the sum of 3, 7, 11, 15, 19 forwards and backwards; every column adds to 22, which is the first term plus the last term, so twice the sum is 5 times 22 and the sum is 55.', 'Each column is $a + l$, so $2S = n(a + l)$.');
}
// we2: a = 8, d = 3
{
  const a = 8, d = 3, s25 = apSum(a, d, 25), nn = range(1, 60).filter((n) => apSum(a, d, n).eq(385));
  must(s25.eq(1100) && sumF(apList(a, d, 25)).eq(1100) && nn.join() === '14' && sumF(apList(a, d, 14)).eq(385), 'we2 d1');
  V.we2 = table(['Question', 'Work'], [['Sum of 25 terms', M('S_{25} = \\dfrac{25}{2}\\,[16 + 24 \\times 3] = 1100')], ['Sum equal to $385$', M('\\dfrac{n}{2}\\,[16 + 3(n - 1)] = 385 \\Rightarrow 3n^2 + 13n - 770 = 0')], ['Solve', M('(3n + 55)(n - 14) = 0 \\Rightarrow n = 14')]], 'Worked example 2 table for the arithmetic progression 8, 11, 14 and so on: the sum of 25 terms is 1100, and the sum of 385 needs the quadratic 3 n squared plus 13 n minus 770 equal to zero, whose valid root is n equal to 14.', 'Reject the negative root.');
}
// AMs
{
  const m = apMeans(9, 44, 4), d = fr(44 - 9, 5);
  must(jn(m) === '16, 23, 30, 37' && d.eq(7) && apTerm(9, 7, 6).eq(44) && fr(9).add(44).div(2).eq(fr(53, 2)), 'AM insert');
  V.am = table(['Position', '$a$', 'mean 1', 'mean 2', 'mean 3', 'mean 4', '$b$'], [['Value', '$9$', ...m.map((x) => M(x.tex())), '$44$'], ['Rule', '$a$', '$a + d$', '$a + 2d$', '$a + 3d$', '$a + 4d$', '$a + 5d = b$']], 'Table of four arithmetic means inserted between 9 and 44: the six numbers form an AP with common difference 7, the single arithmetic mean of two numbers is half their sum, and for n means d equals b minus a over n plus 1.', '$n$ means make $n + 2$ terms: $d = \\dfrac{b - a}{n + 1}$.');
}
// we3
{
  const m = apMeans(-8, 40, 5), tot = sumF(m);
  must(jn(m) === '0, 8, 16, 24, 32' && tot.eq(80) && fr(5).mul(fr(-8).add(40).div(2)).eq(80), 'we3');
  V.we3 = table(['Step', 'Work'], [['Common difference', M('d = \\dfrac{40 - (-8)}{5 + 1} = 8')], ['The means', M(jn(m))], ['Their sum', M(`${jn(m, ' + ')} = ${tot.tex()} = 5 \\times \\dfrac{-8 + 40}{2}`)]], 'Worked example 3 table: five arithmetic means between minus 8 and 40 have common difference 8 and are 0, 8, 16, 24 and 32, with sum 80, which equals five times the arithmetic mean of the end numbers.', 'The means add to $n \\times \\dfrac{a + b}{2}$.');
}
// choosing terms
{
  const a = 10, d = 3;
  const t3 = [a - d, a, a + d], t4 = [a - 3 * d, a - d, a + d, a + 3 * d], t5 = [a - 2 * d, a - d, a, a + d, a + 2 * d];
  const sm = (t) => t.reduce((x, y) => x + y, 0);
  const cd = (t) => t.slice(1).map((x, i) => x - t[i]);
  must(sm(t3) === 3 * a && sm(t4) === 4 * a && sm(t5) === 5 * a && new Set(cd(t3)).size === 1 && new Set(cd(t4)).size === 1 && cd(t4)[0] === 2 * d && cd(t5)[0] === d, 'choose terms');
  V.three = table(['Terms', 'Choose', 'Common difference', 'Sum', `Example ($a = ${a}$, $d = ${d}$)`], [['3', '$a - d,\\; a,\\; a + d$', '$d$', '$3a$', M(t3.join(', '))], ['4', '$a - 3d,\\; a - d,\\; a + d,\\; a + 3d$', '$2d$', '$4a$', M(t4.join(', '))], ['5', '$a - 2d,\\; a - d,\\; a,\\; a + d,\\; a + 2d$', '$d$', '$5a$', M(t5.join(', '))]], 'Table of the symmetric choices of three, four and five terms in AP, with the common difference and the sum of each choice, and an example for a equal to 10 and d equal to 3: the sums are 30, 40 and 50.', 'The odd terms in the middle cancel $d$ in the sum.');
}
// we4: sum 27, product 693
{
  const hits = [];
  for (let x = 1; x <= 30; x++) for (let y = x; y <= 30; y++) { const z = 2 * y - x; if (z >= y && x + y + z === 27 && x * y * z === 693) hits.push([x, y, z]); }
  must(hits.length === 1 && hits[0].join() === '7,9,11' && (9 - 2) * 9 * (9 + 2) === 693, 'we4');
  V.we4 = table(['Step', 'Work'], [['Choose', M('a - d,\\; a,\\; a + d \\text{ with sum } 3a = 27 \\Rightarrow a = 9')], ['Use the product', M('9(81 - d^2) = 693 \\Rightarrow d^2 = 4')], ['The numbers', M('d = \\pm 2:\\; 7,\\; 9,\\; 11 \\text{ (or in reverse)}')]], 'Worked example 4 table: three numbers in AP with sum 27 and product 693, taken as a minus d, a, a plus d, give a equal to 9 and d squared equal to 4, so the numbers are 7, 9 and 11.', 'The sum alone fixes the middle term.');
}
// GP
{
  const t = gpList(3, 4, 5);
  must(jn(t) === '3, 12, 48, 192, 768' && t.every((x, i) => i === 0 || x.div(t[i - 1]).eq(4)) && t.every((x, i) => x.eq(fr(3).mul(fr(4).pow(i)))), 'gp table');
  V.gp = table(['$n$', '$a_n$', 'Ratio $\\dfrac{a_n}{a_{n-1}}$', '$a \\, r^{n-1}$'], t.map((x, i) => [`$${i + 1}$`, M(x.tex()), i === 0 ? 'none' : '$4$', M(`3 \\times 4^{${i}}`)]), 'Table for the geometric progression 3, 12, 48, 192, 768: every term is 4 times the one before, so the common ratio is 4 and the nth term is 3 times 4 to the power n minus 1.', 'Constant ratio: $a_n = a\\,r^{n-1}$.');
}
// we5: a_3 = 18, a_6 = -486
{
  const rs = range(-10, 10).filter((q) => q !== 0 && gpTerm(2, q, 3).eq(18) && gpTerm(2, q, 6).eq(-486));
  const sols = range(-12, 12).filter((q) => q !== 0).filter((q) => fr(-486).div(18).eq(fr(q).pow(3)));
  must(rs.join() === '-3' && sols.join() === '-3' && fr(18).div(9).eq(2) && gpTerm(2, -3, 8).eq(-4374) && gpList(2, -3, 8)[7].eq(-4374), 'we5');
  V.we5 = table(['Step', 'Work'], [['Divide the terms', M('\\dfrac{a_6}{a_3} = r^3 = \\dfrac{-486}{18} = -27 \\Rightarrow r = -3')], ['First term', M('a r^2 = 18 \\Rightarrow a = 2')], ['Eighth term', M('a_8 = 2 \\times (-3)^7 = -4374')]], 'Worked example 5 table: a geometric progression with third term 18 and sixth term minus 486 has r cubed equal to minus 27, so r is minus 3, the first term is 2 and the eighth term is minus 4374.', 'Divide, then take the cube root.');
}
// GP sum derivation: a = 2, r = 3, n = 5
{
  const t = gpList(2, 3, 5), rt = gpList(2, 3, 6).slice(1);
  must(sumF(t).eq(242) && sumF(rt).eq(726) && sumF(rt).sub(sumF(t)).eq(484) && gpSum(2, 3, 5).eq(242) && fr(2).mul(fr(3).pow(5).sub(1)).eq(484), 'gp sum derivation');
  V.gpSum = table(['Line', 'Terms'], [['$S$', M(`${jn(t, ' + ')}`)], ['$rS$', M(jn(rt, ' + '))], ['$rS - S$', M('486 - 2 = 484 = a\\,(r^n - 1)')], ['$S$', M('\\dfrac{484}{3 - 1} = 242')]], 'Table deriving the sum of a geometric progression for 2, 6, 18, 54, 162: multiplying the sum by the ratio 3 shifts every term, subtracting leaves 486 minus 2, which is 484, and dividing by 3 minus 1 gives 242.', '$S_n = \\dfrac{a(r^n - 1)}{r - 1}$, $r \\ne 1$.');
}
// we6: 243, 81, ... six terms
{
  const t = gpList(243, fr(1, 3), 6), tot = sumF(t);
  must(jn(t) === '243, 81, 27, 9, 3, 1' && tot.eq(364) && gpSum(243, fr(1, 3), 6).eq(364), 'we6');
  V.we6 = table(['Step', 'Work'], [['Read off', M('a = 243,\\; r = \\dfrac{81}{243} = \\dfrac{1}{3},\\; n = 6')], ['Formula', M('S_6 = \\dfrac{243\\,[1 - (1/3)^6]}{1 - 1/3} = 364')], ['Check by listing', M(`${jn(t, ' + ')} = 364`)]], 'Worked example 6 table: the geometric progression 243, 81, 27 with ratio one third has six-term sum 364 by the formula, and adding the six terms one by one gives the same total.', 'When $r < 1$ use $\\dfrac{a(1 - r^n)}{1 - r}$.');
}
// infinite: a = 12, r = 1/3
{
  const t = gpList(12, fr(1, 3), 8), ps = partials(t), inf = gpInf(12, fr(1, 3));
  must(inf.eq(18) && ps.every((p, i) => inf.sub(p).eq(fr(12).mul(fr(1, 3).pow(i + 1)).div(fr(2, 3)))) && ps[7].num() < 18 && 18 - ps[7].num() < 0.01, 'infinite partial sums');
  V.inf = plot({ x: [0, 9], y: [0, 20], fns: ['18'], pts: ps.map((p, i) => [i + 1, Math.round(p.num() * 1e9) / 1e9, i === 7 ? '$S_8$' : undefined, 'free']), xl: 'n', yl: 'S_n' }, 'Plot of the partial sums of the geometric series 12 plus 4 plus 4 over 3 and so on, with ratio one third: the sums climb 12, 16, 17.33 and level off just below the horizontal line at 18, the sum to infinity.', 'The partial sums approach $\\dfrac{a}{1 - r} = 18$.');
}
V.inf.spec.points.forEach((p) => { p.on_curve = false; });
// we7
{
  const rr = fr(1).sub(fr(18).div(54)), dec = recurring('5', '36'), dd = decimals(dec, 9);
  must(rr.eq(fr(2, 3)) && fr(18).div(fr(1).sub(rr)).eq(54) && dec.eq(fr(59, 110)) && dd === '536363636' && fr(59, 110).eq(fr(5, 10).add(fr(36, 990))), 'we7');
  V.we7 = table(['Part', 'Work'], [['(a) $a = 18$, sum $54$', M('\\dfrac{18}{1 - r} = 54 \\Rightarrow 1 - r = \\dfrac{1}{3} \\Rightarrow r = \\dfrac{2}{3}')], ['(b) $0.5\\overline{36}$', M('\\dfrac{5}{10} + \\dfrac{0.036}{1 - 0.01} = \\dfrac{1}{2} + \\dfrac{2}{55}')], ['Combine', M('\\dfrac{55 + 4}{110} = \\dfrac{59}{110}')]], 'Worked example 7 table: an infinite series with first term 18 and sum 54 has common ratio two thirds, and the recurring decimal 0.5 followed by repeating 36 is one half plus 0.036 over 0.99, which simplifies to 59 over 110.', 'Split a recurring decimal into a head and a GP.');
}
// GM and inserting GMs: 5 and 80, three means
{
  const hits = gpMeans(5, 80, 3, [2, -2, 3, 4, fr(1, 2)]);
  must(hits.length === 2 && hits.map((h) => h.q.str()).sort().join() === '-2,2' && jn(hits.find((h) => h.q.eq(2)).means) === '10, 20, 40' && jn(hits.find((h) => h.q.eq(-2)).means) === '-10, 20, -40' && 20 * 20 === 5 * 80, 'gm insert');
  V.gm = table(['Idea', 'Rule', 'Example'], [['GM of $a$ and $b$ (positive)', '$G = \\sqrt{ab}$, so $G^2 = ab$', M('\\sqrt{5 \\times 80} = 20')], ['$n$ means between $a$ and $b$', '$r^{n+1} = \\dfrac{b}{a}$', M('r^4 = 16 \\Rightarrow r = 2')], ['The means', '$ar,\\; ar^2,\\; \\ldots,\\; ar^n$', M('10,\\; 20,\\; 40')]], 'Table of geometric means: the geometric mean of 5 and 80 is 20, and three means between them come from r to the fourth equal to 16, so r is 2 and the means are 10, 20 and 40; r equal to minus 2 gives a second set when the number of means is odd.', 'An even power allows $r = \\pm$.');
}
// we8: two GMs between 54 and 16
{
  const hits = gpMeans(54, 16, 2, [fr(2, 3), fr(-2, 3), fr(3, 2), 2, 3]);
  must(hits.length === 1 && hits[0].q.eq(fr(2, 3)) && jn(hits[0].means) === '36, 24' && fr(54).mul(fr(2, 3).pow(3)).eq(16), 'we8');
  V.we8 = table(['Step', 'Work'], [['Total steps', M('54,\\; G_1,\\; G_2,\\; 16 \\text{ is a GP with } r^3 = \\dfrac{16}{54} = \\dfrac{8}{27}')], ['Ratio', M('r = \\dfrac{2}{3}')], ['The means', M('G_1 = 54 \\times \\dfrac{2}{3} = 36,\\quad G_2 = 36 \\times \\dfrac{2}{3} = 24')]], 'Worked example 8 table: two geometric means between 54 and 16 give a four-term geometric progression with r cubed equal to 8 over 27, so r is two thirds and the means are 36 and 24.', 'Count the steps: $n$ means need $r^{n+1}$.');
}
V.sum1 = table(['Topic', 'Result'], [['AP', '$a_n = a + (n-1)d$, $S_n = \\dfrac{n}{2}[2a + (n-1)d] = \\dfrac{n}{2}(a + l)$'], ['AM; $n$ means', '$A = \\dfrac{a + b}{2}$; $d = \\dfrac{b - a}{n + 1}$'], ['GP', '$a_n = ar^{n-1}$, $S_n = \\dfrac{a(r^n - 1)}{r - 1}$'], ['Infinite GP', '$S_\\infty = \\dfrac{a}{1 - r}$ for $|r| < 1$'], ['GM; $n$ means', '$G = \\sqrt{ab}$; $r^{n+1} = \\dfrac{b}{a}$']], 'Summary table of Part 1: the nth term and sum of an AP, the arithmetic mean and the common difference for n means, the nth term and sum of a GP, the sum to infinity for ratio below 1 in size, and the geometric mean with the ratio for n means.', 'Part 1 formulas.');
V.tips1 = table(['Do', 'Avoid'], [['Write $a$, $d$ (or $r$), $n$ before using a formula', 'Mixing up $n$ terms with $n$ means ($n + 2$ terms)'], ['Take $a - d, a, a + d$ when the sum is given', 'Using $\\dfrac{a}{1 - r}$ when $|r| \\ge 1$'], ['Check a quadratic in $n$: reject negative or fractional $n$', 'Forgetting $r = \\pm$ for an even number of means'], ['Check by listing the first few terms', 'Rounding recurring decimals instead of using a GP']], 'Table of exam habits for sequences and series: write a, d or r and n first, take a minus d, a, a plus d for three terms in AP, reject invalid values of n, and check by listing, while avoiding the usual slips with n means, the infinite sum and signs of the ratio.', 'Habits that earn the method marks.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'AM and GM of two numbers'], ['b', 'Proof that AM is at least GM'], ['c', 'Sums of n, n squared and n cubed'], ['d', 'Summing related series'], ['e', 'Method of differences']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the arithmetic and geometric means of two numbers, the proof that the arithmetic mean is at least the geometric mean, the sums of the first n natural numbers, their squares and their cubes, summing related series, and the method of differences.', 'Part 2 at a glance.');
// AM vs GM table
{
  const pairs = [[1, 16], [4, 9], [5, 20], [8, 8], [2, 50]];
  const rows = pairs.map(([a, b]) => {
    const am = fr(a + b, 2), gg = Math.round(Math.sqrt(a * b));
    must(gg * gg === a * b && am.sub(gg).num() >= 0 && (a === b) === am.eq(gg), `am gm ${a} ${b}`);
    return [`$${a}$`, `$${b}$`, M(am.tex()), `$${gg}$`, M(am.sub(gg).tex())];
  });
  V.amgm = table(['$a$', '$b$', 'AM $= \\dfrac{a+b}{2}$', 'GM $= \\sqrt{ab}$', 'AM $-$ GM'], rows, 'Table of the arithmetic and geometric means of five pairs of positive numbers: 1 and 16, 4 and 9, 5 and 20, 8 and 8, 2 and 50; the arithmetic mean is never smaller than the geometric mean and the two are equal only for 8 and 8.', 'AM $\\ge$ GM, equality only when $a = b$.');
}
// proof chain (sampled check)
{
  for (let a = 1; a <= 30; a++) for (let b = 1; b <= 30; b++) { must((a + b) * (a + b) - 4 * a * b === (a - b) * (a - b), 'identity (a+b)^2 - 4ab = (a-b)^2'); must((a + b) * (a + b) >= 4 * a * b, 'AM >= GM squared'); }
  V.proof = flow('TB', [['p', 'For positive a and b, the square of any real number is at least zero: (root a minus root b) squared is at least 0'], ['q', 'Expand: a minus 2 root ab plus b is at least 0'], ['u', 'So a plus b is at least 2 root ab'], ['v', 'Divide by 2: AM is at least GM'], ['w', 'Equality only when root a equals root b, that is a equals b']], [['p', 'q'], ['q', 'u'], ['u', 'v'], ['v', 'w']], 'Flow chart of the proof that the arithmetic mean is at least the geometric mean: start from the square of root a minus root b being non-negative, expand, rearrange to a plus b at least 2 root ab, divide by 2, and note that equality holds only when a equals b.', 'The whole proof is one square.');
}
// d2we1: AM 17, GM 15
{
  const pairs = [];
  for (let a = 1; a <= 60; a++) for (let b = a; b <= 60; b++) if (a + b === 34 && a * b === 225) pairs.push([a, b]);
  must(pairs.length === 1 && pairs[0].join() === '9,25' && Math.sqrt(9 * 25) === 15 && 34 * 34 - 4 * 225 === 256, 'amgm numbers');
  V.d2we1 = table(['Step', 'Work'], [['Two equations', M('a + b = 2 \\times 17 = 34,\\quad ab = 15^2 = 225')], ['Quadratic', M('x^2 - 34x + 225 = 0 \\Rightarrow (x - 9)(x - 25) = 0')], ['The numbers', M('9 \\text{ and } 25')]], 'Worked example 1 table of Part 2: two positive numbers with arithmetic mean 17 and geometric mean 15 have sum 34 and product 225, so they are the roots of x squared minus 34 x plus 225, which are 9 and 25.', 'Sum and product give a quadratic.');
}
// min value table: 9x + 4/x
{
  const xs = [fr(1, 3), fr(1, 2), fr(2, 3), fr(1), fr(2)];
  const vals = xs.map((x) => fr(9).mul(x).add(fr(4).div(x)));
  must(vals.map((v) => v.str()).join() === '15,25/2,12,13,20' && vals.every((v) => !v.lt(12)) && fr(9).mul(fr(2, 3)).eq(fr(4).div(fr(2, 3))), 'min value');
  V.minval = table(['$x$', '$9x$', '$\\dfrac{4}{x}$', '$9x + \\dfrac{4}{x}$'], xs.map((x, i) => [M(x.tex()), M(fr(9).mul(x).tex()), M(fr(4).div(x).tex()), M(vals[i].tex())]), 'Table of the values of 9 x plus 4 over x for x equal to one third, one half, two thirds, 1 and 2: the smallest value is 12 at x equal to two thirds, where the two terms are equal, matching the bound 2 times the square root of 36.', 'AM $\\ge$ GM: $9x + \\dfrac{4}{x} \\ge 2\\sqrt{36} = 12$.');
}
// d2we2: AM : GM = 25 : 24
{
  const found = [];
  for (let a = 1; a <= 100; a++) for (let b = 1; b <= a; b++) if (a + b === 50 && a * b === 576) found.push([a, b]);
  must(found.length === 1 && found[0].join() === '32,18' && 32 / 18 === 16 / 9, 'ratio problem');
  V.d2we2 = table(['Step', 'Work'], [['Write the means', M('\\text{AM} = 25k,\\; \\text{GM} = 24k \\Rightarrow a + b = 50k,\\; ab = 576k^2')], ['Quadratic', M('x^2 - 50k\\,x + 576k^2 = 0 \\Rightarrow (x - 32k)(x - 18k) = 0')], ['Ratio', M('a : b = 32 : 18 = 16 : 9')]], 'Worked example 2 table of Part 2: if the arithmetic and geometric means of two positive numbers are in the ratio 25 to 24, take them as 25 k and 24 k; the numbers are the roots of x squared minus 50 k x plus 576 k squared, namely 32 k and 18 k, so the ratio is 16 to 9.', 'The factor $k$ cancels in the ratio.');
}
// sums table n = 1..6
{
  const rows = range(1, 6).map((n) => { must(s1(n) === L1(1, n) && s2(n) === L2(1, n) && s3(n) === L3(1, n), `sk ${n}`); return [`$${n}$`, `$${S(s1(n))}$`, `$${S(s2(n))}$`, `$${S(s3(n))}$`]; });
  V.sk = table(['$n$', '$\\sum k$', '$\\sum k^2$', '$\\sum k^3$'], rows, 'Table of the sums of the first n natural numbers, their squares and their cubes for n from 1 to 6: 1, 3, 6, 10, 15, 21 then 1, 5, 14, 30, 55, 91 then 1, 9, 36, 100, 225, 441, each computed from the formula and by adding the terms.', '$\\dfrac{n(n+1)}{2}$, $\\dfrac{n(n+1)(2n+1)}{6}$, $\\left(\\dfrac{n(n+1)}{2}\\right)^2$.');
}
// telescoping identity
{
  const rows = range(1, 5).map((k) => { must((k + 1) ** 3 - k ** 3 === 3 * k * k + 3 * k + 1, `identity ${k}`); return [`$${k}$`, `$${(k + 1) ** 3 - k ** 3}$`, `$${3 * k * k + 3 * k + 1}$`]; });
  const tot = range(1, 5).reduce((s, k) => s + (k + 1) ** 3 - k ** 3, 0);
  must(tot === 215 && 6 ** 3 - 1 === 215 && 3 * Number(s2(5)) + 3 * Number(s1(5)) + 5 === 215, 'telescoping 5');
  V.tele = table(['$k$', '$(k+1)^3 - k^3$', '$3k^2 + 3k + 1$'], rows, 'Table checking the identity (k plus 1) cubed minus k cubed equals 3 k squared plus 3 k plus 1 for k from 1 to 5; adding the left column telescopes to 6 cubed minus 1, which is 215, and the right column gives 3 times 55 plus 3 times 15 plus 5, also 215.', 'Add over $k = 1, \\ldots, n$: the left side telescopes.');
}
// d2we3: sum_{k=1}^{15} (k^2 + 2k)
{
  const v = LS(15, (k) => k * k + 2 * k);
  must(v === 1480n && s2(15) === 1240n && 2n * s1(15) === 240n, 'd2we3');
  V.d2we3 = table(['Step', 'Work'], [['Split', M('\\sum_{k=1}^{15} (k^2 + 2k) = \\sum k^2 + 2\\sum k')], ['Formulae', M('\\dfrac{15 \\times 16 \\times 31}{6} + 2 \\times \\dfrac{15 \\times 16}{2} = 1240 + 240')], ['Value', '$1480$']], 'Worked example 3 table of Part 2: the series with general term k squared plus 2 k for k from 1 to 15 splits into the sum of squares 1240 and twice the sum of the first 15 numbers, 240, giving 1480.', 'Split into standard sums.');
}
// d2we4: 1.3 + 2.4 + ... + 14.16
{
  const v = LS(14, (k) => k * (k + 2)), lst = range(1, 14).map((k) => k * (k + 2));
  must(v === 1225n && s2(14) === 1015n && 2n * s1(14) === 210n && lst[13] === 224 && lst[0] === 3, 'd2we4');
  V.d2we4 = table(['Step', 'Work'], [['General term', M('a_k = k(k + 2) = k^2 + 2k,\\; k = 1, \\ldots, 14')], ['Split', M('\\dfrac{14 \\times 15 \\times 29}{6} + 2 \\times \\dfrac{14 \\times 15}{2} = 1015 + 210')], ['Value', '$1225$']], 'Worked example 4 table of Part 2: the series 1 times 3 plus 2 times 4 plus up to 14 times 16 has general term k times k plus 2, which splits into 1015 for the squares and 210 for twice the first 14 numbers, so the total is 1225.', 'Find $a_k$ first, then split.');
}
// cubes: (sum k)^2
{
  const ns = [3, 5, 8, 10];
  const rows = ns.map((n) => { must(s3(n) === s1(n) ** 2n && L3(1, n) === s3(n), `cube ${n}`); return [`$${n}$`, `$${S(s1(n))}$`, `$${S(s1(n) ** 2n)}$`, `$${S(L3(1, n))}$`]; });
  V.cube = table(['$n$', '$\\sum k$', '$(\\sum k)^2$', '$\\sum k^3$'], rows, 'Table showing that the sum of the first n cubes equals the square of the sum of the first n numbers for n equal to 3, 5, 8 and 10: for example n equal to 10 gives 55, 55 squared is 3025, and 3025 is also the sum of the cubes.', '$\\sum k^3 = \\left(\\sum k\\right)^2$.');
}
// d2we5: 11^3 + ... + 20^3
{
  must(L3(11, 20) === 41075n && s3(20) - s3(10) === 41075n && s3(20) === 44100n && s3(10) === 3025n, 'd2we5');
  V.d2we5 = table(['Step', 'Work'], [['Idea', M('11^3 + \\cdots + 20^3 = \\sum_{1}^{20} k^3 - \\sum_{1}^{10} k^3')], ['Formulae', M('\\left(\\dfrac{20 \\times 21}{2}\\right)^2 - \\left(\\dfrac{10 \\times 11}{2}\\right)^2 = 210^2 - 55^2')], ['Value', M('44100 - 3025 = 41075')]], 'Worked example 5 table of Part 2: the sum of cubes from 11 cubed to 20 cubed is the sum to 20 minus the sum to 10, which is 210 squared minus 55 squared, equal to 44100 minus 3025, so the value is 41075.', 'Subtract the part you do not want.');
}
// differences: 4, 9, 18, 31, 48
{
  const t = [4, 9, 18, 31, 48], d1 = diffs(t), d2 = diffs(d1), q = fitQuad(t);
  must(d1.join() === '5,9,13,17' && d2.join() === '4,4,4' && q.A.eq(2) && q.B.eq(-1) && q.C.eq(3) && range(1, 5).every((n) => q.at(n).eq(t[n - 1])), 'differences');
  V.diff = table(['$n$', '1', '2', '3', '4', '5'], [['$a_n$', ...t.map((x) => `$${x}$`)], ['First difference', ...d1.map((x) => `$${x}$`), ''], ['Second difference', ...d2.map((x) => `$${x}$`), '', '']].map((row) => row.length < 6 ? [...row, ...Array(6 - row.length).fill('')] : row), 'Table of the sequence 4, 9, 18, 31, 48 with its first differences 5, 9, 13, 17 and its constant second difference 4, which shows the nth term is a quadratic with leading coefficient 2, namely 2 n squared minus n plus 3.', 'Constant second difference $2A$: $a_n = An^2 + Bn + C$.');
}
// d2we6: 7, 12, 19, 28, 39 ; n^2 + 2n + 4 ; sum of 12
{
  const t = [7, 12, 19, 28, 39], d1 = diffs(t), d2 = diffs(d1), q = fitQuad(t);
  const sum12 = LS(12, (k) => k * k + 2 * k + 4);
  must(d1.join() === '5,7,9,11' && d2.join() === '2,2,2' && q.A.eq(1) && q.B.eq(2) && q.C.eq(4) && sum12 === 854n && s2(12) + 2n * s1(12) + 48n === 854n && s2(12) === 650n && range(1, 5).every((n) => q.at(n).eq(t[n - 1])), 'd2we6');
  V.d2we6 = table(['Step', 'Work'], [['Differences', M('5,\\; 7,\\; 9,\\; 11 \\text{ then } 2,\\; 2,\\; 2 \\Rightarrow A = 1')], ['Fit $n^2 + Bn + C$', M('1 + B + C = 7,\\; 4 + 2B + C = 12 \\Rightarrow B = 2,\\; C = 4')], ['Sum of 12 terms', M('\\sum (k^2 + 2k + 4) = 650 + 156 + 48 = 854')]], 'Worked example 6 table of Part 2: the sequence 7, 12, 19, 28, 39 has constant second difference 2, so the nth term is n squared plus 2 n plus 4, and the sum of its first 12 terms is 650 plus 156 plus 48, which is 854.', 'Second difference $= 2A$.');
}
V.sum2 = table(['Topic', 'Result'], [['AM, GM of $a, b > 0$', '$A = \\dfrac{a+b}{2}$, $G = \\sqrt{ab}$, $A \\ge G$, equal iff $a = b$'], ['Numbers from $A$ and $G$', '$a + b = 2A$, $ab = G^2$: roots of $x^2 - 2Ax + G^2 = 0$'], ['Standard sums', '$\\sum k = \\dfrac{n(n+1)}{2}$, $\\sum k^2 = \\dfrac{n(n+1)(2n+1)}{6}$, $\\sum k^3 = \\left(\\dfrac{n(n+1)}{2}\\right)^2$'], ['Related series', 'write $a_k$, split into standard sums'], ['Differences', 'constant second difference $2A$ gives $An^2 + Bn + C$']], 'Summary table of Part 2: the means of two positive numbers with AM at least GM, finding numbers from their means through a quadratic, the three standard sums, summing related series by writing the general term, and the method of differences giving a quadratic nth term.', 'Part 2 formulas.');
V.tips2 = table(['Do', 'Avoid'], [['State the general term $a_k$ before splitting a series', 'Using $n$ for the number of terms and the running index together'], ['Take a sum to $m$ minus a sum to $m - 1$ for a block of terms', 'Subtracting the sum to $m$ instead of the sum to $m - 1$'], ['Say why AM $\\ge$ GM needs positive numbers', 'Applying GM to a negative number'], ['Check the fitted $a_n$ against the first terms', 'Writing the second difference instead of $2A$']], 'Table of exam habits for Part 2: find the general term before splitting a series, subtract the sum to m minus 1 for a block, state that the means need positive numbers, and check the fitted nth term on the first terms, while avoiding index slips and using the second difference instead of twice the leading coefficient.', 'Habits that earn the method marks.');

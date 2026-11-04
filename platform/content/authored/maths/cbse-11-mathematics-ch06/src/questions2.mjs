// CBSE 11 Mathematics ch06 Permutations and Combinations — written items (short 2 and 3 marks, long 5 marks, case-based)
// with re-solve checks. Every number in a model answer is computed by an exact BigInt formula and re-counted by enumeration.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, range, F, P, Cm, multi, kPerms, kCombs, kSeqs, prod, distinctArr, count, list, arrBySet, distinctLines, triangles, nPt, nCt, genericExtras } from './pc.mjs';

const N = (b) => Number(b);
const isV = (c) => 'AEIOU'.includes(c);

// =============================================================== short answer, 2 marks
{
  const v = F(8) / (F(5) * F(3));
  Q('s201', mk.short({ marks: 2, stem: r`Simplify $\dfrac{8!}{5!\,3!}$ and say which number of the form ${'$'}${nCt('n', 'r')}$ it is.`, model: r`Write $8! = 8 \times 7 \times 6 \times 5!$ and cancel $5!$: $\dfrac{8 \times 7 \times 6}{3!} = \dfrac{336}{6} = ${v}$.\n\nThis is ${'$'}${nCt(8, 3)}$, the number of ways to choose $3$ objects from $8$.`, sol: 'Cancel the larger factorial in the denominator first.', scheme: [['Cancelling 5! to get 8 x 7 x 6 over 3!', 1], ['Value 56, recognised as 8C3', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(v === 56n && v === Cm(8, 3) && 8 * 7 * 6 === 336, '56 = 8C3'); Cx.model([56, 336]); });
}
{
  const v = F(9) / F(6);
  Q('s202', mk.short({ marks: 2, stem: r`Show that $\dfrac{n!}{(n-3)!} = n(n-1)(n-2)$ for $n \ge 3$, and use the result to find $\dfrac{9!}{6!}$.`, model: r`Since $n! = n(n-1)(n-2)\,(n-3)!$, dividing by $(n-3)!$ leaves $n(n-1)(n-2)$.\n\nPutting $n = 9$: $\dfrac{9!}{6!} = 9 \times 8 \times 7 = ${v}$.`, sol: 'Expand n factorial until (n minus 3) factorial appears.', scheme: [['Expanding n! down to (n-3)! and cancelling', 1], ['n = 9 gives 504', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(v === 504n && range(3, 20).every((n) => F(n) / F(n - 3) === BigInt(n * (n - 1) * (n - 2))), '504 and the identity for n = 3..20'); Cx.model([504]); });
}
{
  const sets = new Set();
  for (const [s, d] of prod(range(1, 6), range(1, 4))) sets.add(`s${s}d${d}`);
  for (const f of range(1, 3)) sets.add(`f${f}`);
  Q('s203', mk.short({ marks: 2, stem: r`A school kiosk of an imagined town sells $6$ kinds of sandwich and $4$ kinds of drink. A customer either buys one sandwich together with one drink, or buys one of $3$ kinds of fruit alone. How many different purchases are possible?`, model: r`Sandwich with drink: $6 \times 4 = 24$ (two stages, multiplication principle).\n\nFruit alone: $3$ (an alternative, so we add).\n\nTotal: $24 + 3 = ${sets.size}$ purchases.`, sol: 'Multiply within a combined choice, add between alternatives.', scheme: [['6 x 4 = 24 for the combined purchase', 1], ['Adding the 3 fruit-only purchases: 27', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(sets.size === 27, '27 purchases enumerated'); Cx.model([24, 27]); });
}
{
  const v = P(7, 3), n = count(kPerms(range(1, 7), 3));
  Q('s204', mk.short({ marks: 2, stem: r`Seven runners reach the final of an imagined school sports day. Find the number of ways in which the gold, silver and bronze medals can be given, and write it as ${'$'}${nPt('n', 'r')}$.`, model: r`The medals are different, so the order of the three winners matters. The number of ways is ${'$'}${nPt(7, 3)} = 7 \times 6 \times 5 = ${v}$.`, sol: 'Three places filled in turn: seven, six and five choices.', scheme: [['Order matters: 7P3 identified', 1], ['7 x 6 x 5 = 210', 1]], d: 1, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(v === 210n && n === 210, '210'); Cx.model([210]); });
}
{
  const hits = range(0, 6).filter((k) => P(6, k) === 120n);
  Q('s205', mk.short({ marks: 2, stem: r`Find the positive integer $r$ for which ${'$'}${nPt(6, 'r')} = 120$.`, model: r`Write the product of $r$ descending factors from $6$: $6$, $6 \times 5 = 30$, $6 \times 5 \times 4 = 120$. It reaches $120$ with three factors, so $r = ${hits[0]}$. (Check: ${'$'}${nPt(6, 3)} = \dfrac{6!}{3!} = 120$.)`, sol: 'Try r = 1, 2, 3 until the running product reaches 120.', scheme: [['Descending products 6, 30, 120', 1], ['r = 3 with a check', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(hits.join() === '3' && P(6, 3) === F(6) / F(3), 'r = 3'); Cx.model([3, 120]); });
}
{
  const all = list(distinctArr('TOOT')).sort();
  Q('s206', mk.short({ marks: 2, stem: r`List every distinct arrangement of the letters of the word TOOT and check the count against a formula.`, model: r`The arrangements are ${all.join(', ')}: $${all.length}$ in all.\n\nFormula: $\dfrac{4!}{2!\,2!} = \dfrac{24}{4} = ${multi(4, 2, 2)}$, which agrees.`, sol: 'Two letters repeat twice each, so divide 4 factorial by 2 factorial twice.', scheme: [['All six arrangements listed', 1], ['4!/(2! 2!) = 6 agrees', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(all.length === 6 && all.join() === [...arrBySet('TOOT')].sort().join() && multi(4, 2, 2) === 6n, 'six arrangements, two routes'); Cx.model(['OOTT', 'OTOT', 'OTTO', 'TOOT', 'TOTO', 'TTOO', 6]); });
}
{
  const v = Cm(12, 9);
  Q('s207', mk.short({ marks: 2, stem: r`Evaluate ${'$'}${nCt(12, 9)}$ by first using a property of combinations to make the lower number smaller.`, model: r`Since ${'$'}${nCt('n', 'r')} = ${nCt('n', 'n-r')}$, ${'$'}${nCt(12, 9)} = ${nCt(12, 3)} = \dfrac{12 \times 11 \times 10}{3 \times 2 \times 1} = \dfrac{1320}{6} = ${v}$.`, sol: 'Choosing 9 to keep is the same as choosing 3 to leave out.', scheme: [['Symmetry: 12C9 = 12C3', 1], ['12 x 11 x 10 over 6 = 220', 1]], d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(v === 220n && Cm(12, 3) === 220n && count(kCombs(range(1, 12), 9)) === 220, '220'); Cx.model([220, 1320]); });
}
{
  const all = count(kCombs(range(1, 8), 3)), withM = count(kCombs(range(1, 8), 3), (s) => s.includes(1));
  Q('s208', mk.short({ marks: 2, stem: r`A panel of $3$ is chosen from $8$ candidates, one of whom is Meera (an imagined person). In how many ways can the panel be chosen if Meera must be on it?`, model: r`Meera's place is fixed, so we choose the other $2$ panel members from the remaining $7$ candidates: ${'$'}${nCt(7, 2)} = \dfrac{7 \times 6}{2} = ${Cm(7, 2)}$.\n\nFor comparison, with no restriction there are ${'$'}${nCt(8, 3)} = ${Cm(8, 3)}$ panels.`, sol: 'Fix the particular person, then choose the rest.', scheme: [['Meera fixed, 2 chosen from 7', 1], ['7C2 = 21', 1]], d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(withM === 21 && all === 56 && Cm(7, 2) === 21n, '21 of 56'); Cx.model([21, 56]); });
}
{
  const a = Cm(9, 4), b = Cm(9, 5), c = Cm(10, 5);
  Q('s209', mk.short({ marks: 2, stem: r`Compute ${'$'}${nCt(9, 4)}$, ${'$'}${nCt(9, 5)}$ and ${'$'}${nCt(10, 5)}$, and show that ${'$'}${nCt(9, 4)} + ${nCt(9, 5)} = ${nCt(10, 5)}$.`, model: r`${'$'}${nCt(9, 4)} = \dfrac{9 \times 8 \times 7 \times 6}{24} = ${a}$ and ${'$'}${nCt(9, 5)} = ${b}$ (equal, by symmetry).\n\n${'$'}${nCt(10, 5)} = \dfrac{10 \times 9 \times 8 \times 7 \times 6}{120} = ${c}$.\n\nSo $${a} + ${b} = ${a + b} = ${c}$.`, sol: 'Evaluate each term, then add.', scheme: [['9C4 = 126 and 9C5 = 126', 1], ['10C5 = 252 and 126 + 126 = 252', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(a === 126n && b === 126n && c === 252n && a + b === c && count(kCombs(range(1, 10), 5)) === 252, '126 + 126 = 252'); Cx.model([126, 252]); });
}

// =============================================================== short answer, 3 marks
{
  const rep = count(prod(range(1, 5), range(0, 5), range(0, 5)));
  const dis = count(kPerms(range(0, 5), 3), (a) => a[0] !== 0);
  Q('s301', mk.short({ marks: 3, stem: r`Three-digit numbers (first digit not $0$) are formed from the digits $0, 1, 2, 3, 4, 5$. Find how many can be formed (a) if digits may repeat, (b) if no digit may repeat.`, model: r`**(a)** Hundreds place: $5$ choices ($1$ to $5$); tens: $6$; units: $6$. Number: $5 \times 6 \times 6 = ${rep}$.\n\n**(b)** Hundreds: $5$ choices; tens: any of the other $5$ digits (including $0$); units: $4$. Number: $5 \times 5 \times 4 = ${dis}$.`, sol: 'Fill the hundreds place first because it has the restriction.', scheme: [['Hundreds place has 5 choices', 1], ['(a) 5 x 6 x 6 = 180', 1], ['(b) 5 x 5 x 4 = 100', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (Cx) => { Cx.assert(rep === 180 && dis === 100, '180 and 100'); Cx.model([180, 100]); });
}
{
  const w = 'ORCHID', tot = count(kPerms([...w], 6)), tog = count(kPerms([...w], 6), (a) => { const ix = a.map((c, i) => (isV(c) ? i : -1)).filter((i) => i >= 0); return ix[1] - ix[0] === 1; });
  Q('s302', mk.short({ marks: 3, stem: r`The letters of the word ORCHID are arranged in a row. Find the number of arrangements (a) in all, (b) in which the two vowels are together, (c) in which the two vowels are not together.`, model: r`**(a)** All $6$ letters are different: $6! = ${F(6)}$.\n\n**(b)** Glue the vowels O and I into one block. The block and $4$ other letters give $5! = 120$ arrangements, and the vowels swap in $2! = 2$ ways: $120 \times 2 = ${tog}$.\n\n**(c)** Not together: $${F(6)} - ${tog} = ${F(6) - BigInt(tog)}$.`, sol: 'Count the complement for the not-together case.', scheme: [['(a) 6! = 720', 1], ['(b) 5! x 2! = 240', 1], ['(c) 720 - 240 = 480', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(tot === 720 && tog === 240 && tot - tog === 480, '720, 240, 480'); Cx.model([720, 240, 480]); });
}
{
  const w = 'LAPTOP', tot = count(distinctArr(w)), tog = count(distinctArr(w), (s) => s.includes('PP'));
  Q('s303', mk.short({ marks: 3, stem: r`Find the number of distinct arrangements of the letters of the word LAPTOP (a) in all, (b) with the two P's side by side, (c) with the two P's not side by side.`, model: r`**(a)** Six letters with P repeated: $\dfrac{6!}{2!} = ${tot}$.\n\n**(b)** Treat PP as one block. Five different objects (the block, L, A, T, O) give $5! = ${tog}$ arrangements.\n\n**(c)** $${tot} - ${tog} = ${tot - tog}$.`, sol: 'The block PP has no inner swap because the letters are identical.', scheme: [['(a) 6!/2! = 360', 1], ['(b) 5! = 120', 1], ['(c) 360 - 120 = 240', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(tot === 360 && tog === 120 && multi(6, 2) === 360n && F(5) === 120n, '360, 120, 240'); Cx.model([360, 120, 240]); });
}
{
  const ok = range(1, 22).every((n) => range(1, n).every((k) => Cm(n, k) + Cm(n, k - 1) === Cm(n + 1, k)));
  Q('s304', mk.short({ marks: 3, stem: r`Prove that ${'$'}${nCt('n', 'r')} + ${nCt('n', 'r-1')} = ${nCt('n+1', 'r')}$ for $1 \le r \le n$, and check it for $n = 8$ and $r = 3$.`, model: r`${'$'}${nCt('n', 'r')} + ${nCt('n', 'r-1')} = \dfrac{n!}{r!\,(n-r)!} + \dfrac{n!}{(r-1)!\,(n-r+1)!}$. Take the common factor $\dfrac{n!}{r!\,(n-r+1)!}$: the sum is $\dfrac{n!}{r!\,(n-r+1)!}\,[(n - r + 1) + r] = \dfrac{(n+1)\,n!}{r!\,(n+1-r)!} = ${nCt('n+1', 'r')}$.\n\nCheck: ${'$'}${nCt(8, 3)} + ${nCt(8, 2)} = ${Cm(8, 3)} + ${Cm(8, 2)} = ${Cm(8, 3) + Cm(8, 2)} = ${nCt(9, 3)}$.`, sol: 'Bring both terms over a common denominator r! (n - r + 1)!.', scheme: [['Both terms written with factorials', 1], ['Common factor and (n - r + 1) + r = n + 1', 1], ['Numerical check 56 + 28 = 84', 1]], d: 3, c: 'understanding', t: [3], time: 150 }), (Cx) => { Cx.assert(ok && Cm(8, 3) === 56n && Cm(8, 2) === 28n && Cm(9, 3) === 84n, 'identity for n <= 22; 56 + 28 = 84'); Cx.model([56, 28, 84]); });
}
{
  const al = range(1, 6).map((k) => `A${k}`), te = range(1, 4).map((k) => `T${k}`);
  const n = count(kCombs([...al, ...te], 5), (s) => s.filter((p) => p[0] === 'T').length >= 2);
  const a = Cm(4, 2) * Cm(6, 3), b = Cm(4, 3) * Cm(6, 2), c = Cm(4, 4) * Cm(6, 1);
  Q('s305', mk.short({ marks: 3, stem: r`A school choir of $5$ is to be picked from $6$ altos and $4$ tenors of an imagined school, with at least $2$ tenors in the choir. In how many ways can this be done?`, model: r`Split by the number of tenors:\n\n$2$ tenors: ${'$'}${nCt(4, 2)} \times ${nCt(6, 3)} = ${Cm(4, 2)} \times ${Cm(6, 3)} = ${a}$.\n\n$3$ tenors: ${'$'}${nCt(4, 3)} \times ${nCt(6, 2)} = ${Cm(4, 3)} \times ${Cm(6, 2)} = ${b}$.\n\n$4$ tenors: ${'$'}${nCt(4, 4)} \times ${nCt(6, 1)} = ${c}$.\n\nTotal: $${a} + ${b} + ${c} = ${a + b + c}$.`, sol: 'Add the cases for 2, 3 and 4 tenors; the cases do not overlap.', scheme: [['Cases by the number of tenors', 1], ['Each case product 120, 60, 6', 1], ['Sum 186', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(n === 186 && a + b + c === 186n, '186'); Cx.model([120, 60, 6, 186]); });
}
{
  const nn = 14, d = list(kCombs(range(0, nn - 1), 2)).filter(([i, j]) => !(j - i === 1 || (i === 0 && j === nn - 1))).length;
  const hits = range(3, 30).filter((m) => (m * (m - 3)) / 2 === 35);
  Q('s306', mk.short({ marks: 3, stem: r`(a) Find the number of diagonals of a convex polygon with $14$ sides. (b) A convex polygon has exactly $35$ diagonals; find its number of sides.`, model: r`**(a)** Any $2$ of the $14$ vertices give a segment: ${'$'}${nCt(14, 2)} = ${Cm(14, 2)}$. Subtract the $14$ sides: $${Cm(14, 2)} - 14 = ${d}$ diagonals.\n\n**(b)** For $n$ sides the count is ${'$'}${nCt('n', 2)} - n = \dfrac{n(n-3)}{2}$. Setting this equal to $35$: $n(n - 3) = 70$, so $n = ${hits[0]}$ (since $10 \times 7 = 70$).`, sol: 'Diagonals are all vertex pairs minus the sides.', scheme: [['(a) 14C2 = 91', 1], ['(a) 91 - 14 = 77', 1], ['(b) n(n - 3) = 70 gives n = 10', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(d === 77 && Cm(14, 2) === 91n && hits.join() === '10', '77 diagonals, 10 sides'); Cx.model([91, 77, 10, 70]); });
}
{
  const tot = count(kSeqs(range(0, 9), 4)), dis = count(kPerms(range(0, 9), 4));
  Q('s307', mk.short({ marks: 3, stem: r`A bicycle lock of an imagined shop has four wheels, each showing a digit from $0$ to $9$. Find the number of settings (a) in all, (b) with all four digits different, (c) with at least one digit repeated.`, model: r`**(a)** Each wheel has $10$ choices: $10^4 = ${tot}$.\n\n**(b)** $10 \times 9 \times 8 \times 7 = ${dis}$ (this is ${'$'}${nPt(10, 4)}$).\n\n**(c)** Subtract: $${tot} - ${dis} = ${tot - dis}$.`, sol: 'At least one repeated is the complement of all different.', scheme: [['(a) 10^4 = 10000', 1], ['(b) 10 x 9 x 8 x 7 = 5040', 1], ['(c) 10000 - 5040 = 4960', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (Cx) => { Cx.assert(tot === 10000 && dis === 5040 && tot - dis === 4960, '10000, 5040, 4960'); Cx.model([10000, 5040, 4960]); });
}
{
  const f = ['Asha', 'Dev', 'Ira', 'Kabir', 'Leela'];
  const tot = count(kPerms(f, 5)), tog = count(kPerms(f, 5), (a) => Math.abs(a.indexOf('Asha') - a.indexOf('Dev')) === 1);
  Q('s308', mk.short({ marks: 3, stem: r`Five imagined friends, Asha, Dev, Ira, Kabir and Leela, sit in a row for a photograph. Find the number of seatings (a) in all, (b) with Asha and Dev next to each other, (c) with Asha and Dev not next to each other.`, model: r`**(a)** $5! = ${tot}$.\n\n**(b)** Glue Asha and Dev into one block: the block and $3$ friends give $4! = 24$ orders, and the two inside the block swap in $2!$ ways: $24 \times 2 = ${tog}$.\n\n**(c)** $${tot} - ${tog} = ${tot - tog}$.`, sol: 'Block method for together; subtract for not together.', scheme: [['(a) 5! = 120', 1], ['(b) 4! x 2! = 48', 1], ['(c) 120 - 48 = 72', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(tot === 120 && tog === 48 && tot - tog === 72, '120, 48, 72'); Cx.model([120, 48, 72]); });
}

// =============================================================== long answer, 5 marks
{
  const nums = range(1000, 9999).map(String);
  const distinct = (s) => new Set(s).size === 4;
  const a = nums.length, b = nums.filter(distinct).length, c = nums.filter((s) => distinct(s) && +s[3] % 2 === 0).length, d = nums.filter((s) => distinct(s) && +s[3] % 5 === 0).length;
  const c0 = 9 * 8 * 7, c24 = 4 * 8 * 8 * 7, d0 = 9 * 8 * 7, d5 = 8 * 8 * 7;
  Q('l01', mk.long({ stem: r`Four-digit numbers (first digit not $0$) are formed from the digits $0$ to $9$. Find how many numbers are formed (a) in all, with digits allowed to repeat; (b) with all four digits different; (c) with all four digits different and the number even; (d) with all four digits different and the number divisible by $5$.`, model: r`**(a)** First digit: $9$ choices; the other three: $10$ each. Number: $9 \times 10 \times 10 \times 10 = ${a}$.\n\n**(b)** First digit $9$ choices, then $9$, $8$, $7$ for the next places: $9 \times 9 \times 8 \times 7 = ${b}$.\n\n**(c)** Last digit $0$: the first three places use the other nine digits in order, $9 \times 8 \times 7 = ${c0}$. Last digit $2, 4, 6$ or $8$ ($4$ ways): first digit $8$ choices (not $0$, not the last), then $8$ and $7$: $4 \times 8 \times 8 \times 7 = ${c24}$. Total: $${c0} + ${c24} = ${c}$.\n\n**(d)** Last digit $0$: $${d0}$. Last digit $5$: $8 \times 8 \times 7 = ${d5}$. Total: $${d0} + ${d5} = ${d}$.`, sol: 'Split the even and the five-divisible cases by the last digit, because 0 also affects the first place.', scheme: [['(a) 9 x 10 x 10 x 10 = 9000', 1], ['(b) 9 x 9 x 8 x 7 = 4536', 1], ['(c) last digit 0 and last digit 2, 4, 6, 8 treated separately', 1.5], ['(c) total 2296', 0.5], ['(d) 504 + 448 = 952', 1]], d: 4, c: 'application', t: [1, 2], time: 360 }), (Cx) => { Cx.assert(a === 9000 && b === 4536 && c === 2296 && d === 952 && c0 + c24 === 2296 && d0 + d5 === 952, 'counts 9000, 4536, 2296, 952'); Cx.model([9000, 4536, 504, 1792, 2296, 448, 952]); });
}
{
  const w = 'BOOKLET';
  const all = list(distinctArr(w));
  const tot = all.length, vt = all.filter((s) => { const ix = [...s].map((c, i) => (isV(c) ? i : -1)).filter((i) => i >= 0); return ix[ix.length - 1] - ix[0] === ix.length - 1; }).length, oo = all.filter((s) => s.includes('OO')).length;
  Q('l02', mk.long({ stem: r`The letters of the word BOOKLET are arranged in a row. Find the number of distinct arrangements (a) in all; (b) in which the three vowels are together; (c) in which the two O's are together; (d) in which the two O's are not together.`, model: r`**(a)** Seven letters, O repeated twice: $\dfrac{7!}{2!} = ${tot}$.\n\n**(b)** The vowels O, O, E form a block that can be arranged internally in $\dfrac{3!}{2!} = 3$ ways. The block and B, K, L, T give $5! = 120$ arrangements. Total: $120 \times 3 = ${vt}$.\n\n**(c)** Treat OO as one block. With B, K, L, E, T there are $6$ different objects: $6! = ${oo}$.\n\n**(d)** $${tot} - ${oo} = ${tot - oo}$.`, sol: 'For the block of vowels count its internal arrangements with the repeated O.', scheme: [['(a) 7!/2! = 2520', 1], ['(b) block arrangements 3 and 5!', 1.5], ['(b) total 360', 0.5], ['(c) 6! = 720', 1], ['(d) 2520 - 720 = 1800', 1]], d: 4, c: 'application', t: [2], time: 360 }), (Cx) => { Cx.assert(tot === 2520 && vt === 360 && oo === 720 && tot - oo === 1800 && multi(7, 2) === 2520n, '2520, 360, 720, 1800'); Cx.model([2520, 360, 720, 1800]); });
}
{
  const ppl = [...range(1, 4).map((k) => `G${k}`), ...range(1, 3).map((k) => `B${k}`)];
  const all = list(kPerms(ppl, 7));
  const tot = all.length;
  const boysTog = all.filter((a) => { const ix = a.map((p, i) => (p[0] === 'B' ? i : -1)).filter((i) => i >= 0); return ix[2] - ix[0] === 2; }).length;
  const alt = all.filter((a) => a.every((p, i) => (i % 2 === 0 ? p[0] === 'G' : p[0] === 'B'))).length;
  const noBB = all.filter((a) => a.every((p, i) => !(p[0] === 'B' && i > 0 && a[i - 1][0] === 'B'))).length;
  Q('l03', mk.long({ stem: r`Four girls and three boys of an imagined dance club stand in a row for a group picture, all seven being different people. Find the number of ways (a) in all; (b) with the three boys together; (c) with the boys and girls alternating; (d) with no two boys next to each other.`, model: r`**(a)** $7! = ${tot}$.\n\n**(b)** The three boys form one block, which can be ordered inside in $3! = 6$ ways. The block and $4$ girls give $5! = 120$ arrangements: $120 \times 6 = ${boysTog}$.\n\n**(c)** With $4$ girls and $3$ boys, alternating in a row of $7$ means G B G B G B G. The girls fill their $4$ places in $4! = 24$ ways and the boys fill their $3$ places in $3! = 6$ ways. Total: $24 \times 6 = ${alt}$.\n\n**(d)** Place the $4$ girls first: $4! = 24$ ways, leaving $5$ gaps (including both ends). Put the $3$ boys in $3$ different gaps in order: ${'$'}${nPt(5, 3)} = 60$. Total: $24 \times 60 = ${noBB}$.`, sol: 'For no two together, seat the girls first and slot the boys into the gaps.', scheme: [['(a) 7! = 5040', 1], ['(b) block of boys, 5! x 3! = 720', 1.5], ['(c) alternating, 3! x 4! = 144', 1.5], ['(d) girls first 4! and gaps 5P3', 1]], d: 4, c: 'application', t: [2], time: 360 }), (Cx) => { Cx.assert(tot === 5040 && boysTog === 720 && alt === 144 && noBB === 1440 && F(5) * F(3) === 720n && F(3) * F(4) === 144n && F(4) * P(5, 3) === 1440n, '5040, 720, 144, 1440'); Cx.model([5040, 720, 144, 1440]); });
}
{
  const pe = [...range(1, 6).map((k) => `T${k}`), ...range(1, 8).map((k) => `S${k}`)];
  const all = list(kCombs(pe, 5));
  const tot = all.length, two = all.filter((s) => s.filter((p) => p[0] === 'T').length === 2).length, ge3 = all.filter((s) => s.filter((p) => p[0] === 'S').length >= 3).length, rao = all.filter((s) => s.includes('T1')).length;
  const v3 = Cm(8, 3) * Cm(6, 2), v4 = Cm(8, 4) * Cm(6, 1), v5 = Cm(8, 5);
  Q('l04', mk.long({ stem: r`The staff of an imagined school has $6$ teachers, and $8$ students stand for election. A panel of $5$ is formed from these $14$ people. Find the number of panels (a) in all; (b) with exactly $2$ teachers; (c) with at least $3$ students; (d) that include a particular teacher, Mr Rao.`, model: r`**(a)** ${'$'}${nCt(14, 5)} = ${tot}$.\n\n**(b)** $2$ of $6$ teachers and $3$ of $8$ students: ${'$'}${nCt(6, 2)} \times ${nCt(8, 3)} = ${Cm(6, 2)} \times ${Cm(8, 3)} = ${two}$.\n\n**(c)** $3$, $4$ or $5$ students: ${'$'}${nCt(8, 3)} \times ${nCt(6, 2)} + ${nCt(8, 4)} \times ${nCt(6, 1)} + ${nCt(8, 5)} = ${v3} + ${v4} + ${v5} = ${ge3}$.\n\n**(d)** Mr Rao is fixed, so choose the other $4$ from the remaining $13$ people: ${'$'}${nCt(13, 4)} = ${rao}$.`, sol: 'For at least three students add the cases of 3, 4 and 5 students.', scheme: [['(a) 14C5 = 2002', 1], ['(b) 6C2 x 8C3 = 840', 1], ['(c) the three cases', 1.5], ['(c) total 1316', 0.5], ['(d) 13C4 = 715', 1]], d: 4, c: 'application', t: [3], time: 360 }), (Cx) => { Cx.assert(tot === 2002 && two === 840 && ge3 === 1316 && rao === 715 && v3 + v4 + v5 === 1316n && Cm(14, 5) === 2002n && Cm(13, 4) === 715n, '2002, 840, 1316, 715'); Cx.model([2002, 840, 1316, 715, 840, 420, 56]); });
}
{
  const base = range(0, 4).map((x) => [x, 0]);
  const extras = genericExtras(base, 7, [[0, 1], [1, 3], [2, 5], [4, 7], [5, 1], [6, 11], [7, 2], [3, 8], [8, 9], [9, 4], [10, 13], [11, 3], [12, 5], [13, 8]]);
  const pts = [...base, ...extras];
  const lines = distinctLines(pts), tri = triangles(pts);
  Q('l05', mk.long({ stem: r`Twelve points are marked on a flat board of an imagined workshop. Exactly five of them lie on one straight line and no other three of the points are collinear. Find (a) the number of lines through pairs of points if no three were collinear; (b) the actual number of distinct lines through at least two of the points; (c) the number of triangles if no three were collinear; (d) the actual number of triangles that can be drawn with vertices among the twelve points.`, model: r`**(a)** ${'$'}${nCt(12, 2)} = ${Cm(12, 2)}$.\n\n**(b)** The five collinear points give ${'$'}${nCt(5, 2)} = ${Cm(5, 2)}$ pairs but only $1$ line, so $${Cm(12, 2)} - ${Cm(5, 2)} + 1 = ${lines}$ lines.\n\n**(c)** ${'$'}${nCt(12, 3)} = ${Cm(12, 3)}$.\n\n**(d)** Three collinear points do not form a triangle, and the five points give ${'$'}${nCt(5, 3)} = ${Cm(5, 3)}$ such triples: $${Cm(12, 3)} - ${Cm(5, 3)} = ${tri}$.`, sol: 'Subtract the collinear triples and pairs, and add back the single line.', scheme: [['(a) 12C2 = 66', 1], ['(b) 66 - 10 + 1 = 57', 1.5], ['(c) 12C3 = 220', 1], ['(d) 220 - 10 = 210', 1.5]], d: 3, c: 'application', t: [3], time: 330 }), (Cx) => { Cx.assert(pts.length === 12 && lines === 57 && tri === 210 && Cm(12, 2) === 66n && Cm(12, 3) === 220n, 'coordinates give 57 lines and 210 triangles'); Cx.model([66, 57, 220, 210]); });
}
{
  const eq = range(4, 40).filter((n) => Cm(n, 4) === Cm(n, 6));
  const rr = range(0, 8).filter((k) => Cm(10, k) === Cm(10, k + 2));
  const okSym = range(0, 25).every((n) => range(0, n).every((k) => Cm(n, k) === Cm(n, n - k)));
  Q('l06', mk.long({ stem: r`(a) Prove that ${'$'}${nCt('n', 'r')} = ${nCt('n', 'n-r')}$ for $0 \le r \le n$. (b) Find $n$ if ${'$'}${nCt('n', 4)} = ${nCt('n', 6)}$. (c) Find $r$ if ${'$'}${nCt(10, 'r')} = ${nCt(10, 'r+2')}$. (d) Verify that ${'$'}${nCt(12, 5)} + ${nCt(12, 4)} = ${nCt(13, 5)}$.`, model: r`**(a)** ${'$'}${nCt('n', 'n-r')} = \dfrac{n!}{(n-r)!\,[n - (n-r)]!} = \dfrac{n!}{(n-r)!\,r!} = ${nCt('n', 'r')}$.\n\n**(b)** By (a), choosing $4$ equals choosing $6$ only when the two numbers add up to $n$: $n = 4 + 6 = ${eq[0]}$.\n\n**(c)** Similarly $r + (r + 2) = 10$, so $2r = 8$ and $r = ${rr[0]}$. Check: ${'$'}${nCt(10, 4)} = ${nCt(10, 6)} = ${Cm(10, 4)}$.\n\n**(d)** ${'$'}${nCt(12, 5)} = ${Cm(12, 5)}$ and ${'$'}${nCt(12, 4)} = ${Cm(12, 4)}$, so the sum is $${Cm(12, 5) + Cm(12, 4)}$. Also ${'$'}${nCt(13, 5)} = ${Cm(13, 5)}$. The two sides agree.`, sol: 'Equal combinations with different lower numbers mean the lower numbers add up to n.', scheme: [['(a) factorial proof', 1.5], ['(b) n = 10', 1], ['(c) r = 4 with a check 210', 1], ['(d) 792 + 495 = 1287 = 13C5', 1.5]], d: 3, c: 'understanding', t: [3], time: 330 }), (Cx) => { Cx.assert(okSym && eq.join() === '10' && rr.join() === '4' && Cm(10, 4) === 210n && Cm(12, 5) === 792n && Cm(12, 4) === 495n && Cm(13, 5) === 1287n && Cm(12, 5) + Cm(12, 4) === Cm(13, 5), 'symmetry n <= 25; n = 10; r = 4; 792 + 495 = 1287'); Cx.model([10, 4, 210, 792, 495, 1287]); });
}
{
  const all = list(distinctArr('PEPPER'));
  const tot = all.length, ppp = all.filter((s) => s.includes('PPP')).length, noPP = all.filter((s) => !s.includes('PP')).length;
  const startP = all.filter((s) => s[0] === 'P').length, bothP = all.filter((s) => s[0] === 'P' && s[5] === 'P').length;
  Q('l07', mk.long({ stem: r`The letters of the word PEPPER are arranged in a row. Find the number of distinct arrangements (a) in all; (b) with all three P's together; (c) with no two P's side by side; (d) beginning with P; (e) beginning and ending with P.`, model: r`**(a)** $\dfrac{6!}{3!\,2!} = ${tot}$.\n\n**(b)** Treat PPP as one block: the block, E, E, R give $\dfrac{4!}{2!} = ${ppp}$ arrangements.\n\n**(c)** Arrange E, E, R first: $\dfrac{3!}{2!} = 3$ ways. They leave $4$ gaps; the three P's go into $3$ different gaps: ${'$'}${nCt(4, 3)} = 4$. Total: $3 \times 4 = ${noPP}$.\n\n**(d)** Fix a P at the start. The other five letters P, P, E, E, R give $\dfrac{5!}{2!\,2!} = ${startP}$.\n\n**(e)** Fix P at both ends. The middle four letters P, E, E, R give $\dfrac{4!}{2!} = ${bothP}$.`, sol: 'Gaps method for no two P adjacent: arrange the other letters first.', scheme: [['(a) 6!/(3! 2!) = 60', 1], ['(b) block PPP, 4!/2! = 12', 1], ['(c) gaps method 3 x 4 = 12', 1.5], ['(d) 5!/(2! 2!) = 30', 0.5], ['(e) 4!/2! = 12', 1]], d: 4, c: 'application', t: [2], time: 360 }), (Cx) => { Cx.assert(tot === 60 && ppp === 12 && noPP === 12 && startP === 30 && bothP === 12 && multi(6, 3, 2) === 60n && multi(4, 2) === 12n && multi(5, 2, 2) === 30n, '60, 12, 12, 30, 12'); Cx.model([60, 12, 30]); });
}

// =============================================================== case-based
{
  const meal = list(prod(range(1, 4), range(1, 3), range(1, 2)));
  const light = 5;
  const withMain = meal.filter(([m]) => m === 1).length;
  const without = meal.filter(([m, , d]) => m !== 2 && d !== 2).length;
  caseQ('c01', {
    passage: r`The imagined Lakeview Cafe offers a set meal made of one main (4 kinds), one side (3 kinds) and one drink (2 kinds). It also offers a light plate: a single salad chosen from 5 kinds, with nothing else. A diner chooses either a set meal or a light plate. One of the mains is a paneer wrap and one of the drinks is lemonade.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $29$. (c) (i) $${withMain}$. Or (ii) $${without}$.`,
    sol: r`(a) $4 \times 3 \times 2 = ${meal.length}$. (b) $${meal.length} + ${light} = ${meal.length + light}$. (c) (i) $3 \times 2 = ${withMain}$. (ii) $3 \times 3 \times 1 = ${without}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of different set meals is', opts: ['$24$', '$9$', '$12$', '$14$'], key: 'a', sol: r`The three choices are made one after another: $4 \times 3 \times 2 = 24$. Adding $4 + 3 + 2$ gives $9$, which counts dishes.`, d: 2, c: 'application', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the total number of different orders a diner can place, counting both set meals and light plates.', value: 29, sol: r`Set meals and light plates are alternatives, so add: $24 + 5 = 29$.`, scheme: [['24 + 5 = 29', 1]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the number of set meals that contain the paneer wrap.', model: r`The main is fixed, so only the side and the drink are chosen: $3 \times 2 = ${withMain}$ set meals.`, sol: 'Fix the main, multiply the other two stages.', scheme: [['Main fixed', 1], ['3 x 2 = 6', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the number of set meals that contain neither the paneer wrap nor lemonade.', model: r`Mains other than the wrap: $3$. Sides: $3$. Drinks other than lemonade: $1$. Number: $3 \times 3 \times 1 = ${without}$.`, sol: 'Remove the two named items from their stages.', scheme: [['3 mains, 3 sides, 1 drink', 1], ['3 x 3 x 1 = 9', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([meal.length, 4 + 3 + 2, 4 * 3, 4 * 3 + 2], 24);
    Cx.child('b').val(meal.length + light);
    Cx.child('c').assert(withMain === 6 && meal.length === 24, '6 set meals with the wrap, 24 in all');
    Cx.child('c').model([6]);
    Cx.child('cii').assert(without === 9, '3 x 3 x 1 = 9 set meals');
    Cx.child('cii').model([9]);
  });
}
{
  const band = [...'ABCDEF'];
  const tot = count(kPerms(band, 6)), tog = count(kPerms(band, 6), (a) => Math.abs(a.indexOf('A') - a.indexOf('B')) === 1);
  const ends = count(kPerms(band, 6), (a) => (a[0] === 'A' && a[5] === 'B') || (a[0] === 'B' && a[5] === 'A'));
  caseQ('c02', {
    passage: r`An imagined school band has six musicians, Anu, Bela, Chirag, Dev, Esha and Farid. They line up in a row for a photograph. Anu and Bela are the two drummers.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${tog}$. (c) (i) $${tot - tog}$. Or (ii) $${ends}$.`,
    sol: r`(a) $6! = ${tot}$. (b) $5! \times 2! = ${tog}$. (c) (i) $${tot} - ${tog} = ${tot - tog}$. (ii) $2 \times 4! = ${ends}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of ways in which the six musicians can line up is', opts: ['$720$', '$360$', '$120$', '$36$'], key: 'a', sol: r`Six different people in a row: $6! = 720$.`, d: 1, c: 'application', t: [2], time: 45 })),
      child('b', mk.num({ stem: 'Find the number of line-ups in which the two drummers stand next to each other.', value: 240, sol: r`Treat the drummers as one block: the block and $4$ others give $5! = 120$ orders, and the drummers swap in $2$ ways: $120 \times 2 = 240$.`, scheme: [['5! = 120 for the block', 0.5], ['120 x 2 = 240', 0.5]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the number of line-ups in which the two drummers are not next to each other.', model: r`All line-ups: $6! = ${tot}$. Together: $${tog}$. Not together: $${tot} - ${tog} = ${tot - tog}$.`, sol: 'Subtract the together case from all line-ups.', scheme: [['720 and 240 used', 1], ['Difference 480', 1]], d: 3, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the number of line-ups in which the two drummers stand at the two ends of the row.', model: r`The two drummers take the two end places in $2! = 2$ ways. The other four musicians fill the middle in $4! = 24$ ways. Number: $2 \times 24 = ${ends}$.`, sol: 'Fix the ends first, then arrange the middle four.', scheme: [['Drummers at the ends: 2 ways', 1], ['4! = 24 and total 48', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([tot, 360, 120, 36], 720);
    Cx.child('b').val(tog);
    Cx.child('c').assert(tot - tog === 480, '480 not together');
    Cx.child('c').model([720, 240, 480]);
    Cx.child('cii').assert(ends === 48, '48 with drummers at the ends');
    Cx.child('cii').model([2, 24, 48]);
  });
}
{
  const codes = list(prod(range(1, 5), range(1, 5), range(1, 9), range(1, 9)));
  const dist = codes.filter(([a, b, c, d]) => a !== b && c !== d).length;
  const firstA = codes.filter(([a, b, c, d]) => a === 1 && c !== d).length;
  const same = codes.filter(([a, b, c, d]) => a === b && c === d).length;
  caseQ('c03', {
    passage: r`The imagined library of Hilltop School labels each shelf with a code made of two letters followed by two digits. The letters come from A, B, C, D, E and the digits from 1 to 9. Unless a question says otherwise, letters and digits may repeat.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${dist}$. (c) (i) $${firstA}$. Or (ii) $${same}$.`,
    sol: r`(a) $5 \times 5 \times 9 \times 9 = ${codes.length}$. (b) $5 \times 4 \times 9 \times 8 = ${dist}$. (c) (i) $1 \times 5 \times 9 \times 8 = ${firstA}$. (ii) $5 \times 9 = ${same}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of possible codes is', opts: ['$2025$', '$1440$', '$450$', '$14$'], key: 'a', sol: r`Each of the four places is filled independently: $5 \times 5 \times 9 \times 9 = 2025$.`, d: 2, c: 'application', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the number of codes in which the two letters are different and the two digits are different.', value: 1440, sol: r`Letters: $5 \times 4 = 20$. Digits: $9 \times 8 = 72$. Codes: $20 \times 72 = 1440$.`, scheme: [['20 letter pairs and 72 digit pairs', 0.5], ['20 x 72 = 1440', 0.5]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the number of codes that begin with the letter A and have two different digits (the second letter is free).', model: r`First letter: $1$ (it is A). Second letter: $5$. Digits: $9 \times 8 = 72$. Number: $1 \times 5 \times 72 = ${firstA}$.`, sol: 'Fix the first letter, count the rest.', scheme: [['First letter fixed, second letter 5', 1], ['1 x 5 x 72 = 360', 1]], d: 3, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the number of codes in which the two letters are the same and the two digits are the same.', model: r`Choose the repeated letter in $5$ ways and the repeated digit in $9$ ways: $5 \times 9 = ${same}$ codes.`, sol: 'Each repeated pair is one choice.', scheme: [['One choice each: 5 letters, 9 digits', 1], ['5 x 9 = 45', 1]], d: 3, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([codes.length, 1440, 450, 14], 2025);
    Cx.child('b').val(dist);
    Cx.child('c').assert(firstA === 360 && dist === 20 * 72, '360 codes starting with A');
    Cx.child('c').model([360]);
    Cx.child('cii').assert(same === 45, '45 codes with both pairs repeated');
    Cx.child('cii').model([45]);
  });
}
{
  const ppl = [...range(1, 7).map((k) => `G${k}`), ...range(1, 6).map((k) => `B${k}`)];
  const all = list(kCombs(ppl, 5));
  const tot = all.length, g3 = all.filter((s) => s.filter((p) => p[0] === 'G').length === 3).length, atLeastB = all.filter((s) => s.some((p) => p[0] === 'B')).length;
  const zi = all.filter((s) => s.includes('G1') && !s.includes('B1')).length;
  caseQ('c04', {
    passage: r`The imagined Orchard School must send a quiz team of 5 to an inter-school contest. The pool has 7 girls and 6 boys. One of the girls is Zoya and one of the boys is Imran.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${g3}$. (c) (i) $${atLeastB}$. Or (ii) $${zi}$.`,
    sol: r`(a) ${'$'}${nCt(13, 5)} = ${tot}$. (b) ${'$'}${nCt(7, 3)} \times ${nCt(6, 2)} = ${g3}$. (c) (i) $${tot} - ${Cm(7, 5)} = ${atLeastB}$. (ii) ${'$'}${nCt(11, 4)} = ${zi}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of ways to choose the team of $5$ from the $13$ pupils, with no restriction, is', opts: ['$1287$', '$154440$', '$65$', '$371293$'], key: 'a', sol: r`Order does not matter: ${'$'}${nCt(13, 5)} = \dfrac{13 \times 12 \times 11 \times 10 \times 9}{120} = 1287$.`, d: 2, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the number of teams with exactly $3$ girls and $2$ boys.', value: 525, sol: r`${'$'}${nCt(7, 3)} \times ${nCt(6, 2)} = 35 \times 15 = 525$.`, scheme: [['7C3 = 35 and 6C2 = 15', 0.5], ['35 x 15 = 525', 0.5]], d: 3, c: 'application', t: [3], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the number of teams that have at least one boy.', model: r`All teams: ${'$'}${nCt(13, 5)} = ${tot}$. Teams with no boy (all five from the $7$ girls): ${'$'}${nCt(7, 5)} = ${Cm(7, 5)}$. At least one boy: $${tot} - ${Cm(7, 5)} = ${atLeastB}$.`, sol: 'Complement: subtract the teams with no boy.', scheme: [['All teams 1287 and no-boy teams 21', 1], ['1287 - 21 = 1266', 1]], d: 3, c: 'application', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the number of teams that include Zoya but do not include Imran.', model: r`Zoya is in and Imran is out, so $11$ pupils remain, from whom $4$ more are chosen: ${'$'}${nCt(11, 4)} = ${zi}$.`, sol: 'Fix one pupil in and one out; choose the rest from the others.', scheme: [['11 pupils remain, 4 to choose', 1], ['11C4 = 330', 1]], d: 4, c: 'analysis', t: [3], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([tot, N(P(13, 5)), 65, 13 ** 5], 1287);
    Cx.child('b').val(g3);
    Cx.child('c').assert(atLeastB === 1266 && tot === 1287 && Cm(7, 5) === 21n, '1266 teams with a boy');
    Cx.child('c').model([1287, 21, 1266]);
    Cx.child('cii').assert(zi === 330 && Cm(11, 4) === 330n, '330 teams');
    Cx.child('cii').model([11, 330]);
  });
}
{
  const dots = 9;
  const pairs = count(kCombs(range(0, dots - 1), 2)), tri = count(kCombs(range(0, dots - 1), 3)), quad = count(kCombs(range(0, dots - 1), 4));
  const diag = list(kCombs(range(0, dots - 1), 2)).filter(([i, j]) => !(j - i === 1 || (i === 0 && j === dots - 1))).length;
  caseQ('c05', {
    passage: r`A rangoli designer in an imagined festival fair places $9$ dots on a circle, so that no three dots are collinear. She joins dots with straight lines to make patterns.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${tri}$. (c) (i) $${diag}$. Or (ii) $${quad}$.`,
    sol: r`(a) ${'$'}${nCt(9, 2)} = ${pairs}$. (b) ${'$'}${nCt(9, 3)} = ${tri}$. (c) (i) $${pairs} - 9 = ${diag}$. (ii) ${'$'}${nCt(9, 4)} = ${quad}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of straight lines that can be drawn joining two of the $9$ dots is', opts: ['$36$', '$72$', '$18$', '$81$'], key: 'a', sol: r`A line is fixed by an unordered pair of dots: ${'$'}${nCt(9, 2)} = 36$. The number $72$ counts each line twice.`, d: 2, c: 'application', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'Find the number of triangles that have three of the dots as their vertices.', value: 84, sol: r`No three dots are collinear, so every $3$ dots give a triangle: ${'$'}${nCt(9, 3)} = \dfrac{9 \times 8 \times 7}{6} = 84$.`, scheme: [['9C3 identified', 0.5], ['84', 0.5]], d: 3, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** The $9$ dots are joined to form a nine-sided polygon. Find the number of diagonals.', model: r`All lines through two dots: ${'$'}${nCt(9, 2)} = ${pairs}$. The $9$ sides are not diagonals, so there are $${pairs} - 9 = ${diag}$ diagonals.`, sol: 'Pairs of vertices minus the sides.', scheme: [['9C2 = 36', 1], ['36 - 9 = 27', 1]], d: 3, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the number of quadrilaterals that can be formed with four of the dots as vertices.', model: r`Any $4$ of the $9$ dots, taken in the order round the circle, give exactly one quadrilateral: ${'$'}${nCt(9, 4)} = \dfrac{9 \times 8 \times 7 \times 6}{24} = ${quad}$.`, sol: 'Four points on a circle give one convex quadrilateral.', scheme: [['One quadrilateral for each 4 dots', 1], ['9C4 = 126', 1]], d: 4, c: 'analysis', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([pairs, 2 * pairs, 18, 81], 36);
    Cx.child('b').val(tri);
    Cx.child('c').assert(diag === 27 && pairs === 36, '27 diagonals');
    Cx.child('c').model([36, 27]);
    Cx.child('cii').assert(quad === 126 && Cm(9, 4) === 126n, '126 quadrilaterals');
    Cx.child('cii').model([126]);
  });
}

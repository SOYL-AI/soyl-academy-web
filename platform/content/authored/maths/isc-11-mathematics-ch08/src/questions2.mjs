// ISC 11 Mathematics ch08 Permutations and Combinations - true-false, fill-blank, numerical, short-2 and short-3 items.
import { Q, mk } from './lib.mjs';
import { r, range, F, P, Cm, multi, S, N, kPerms, kCombs, kSeqs, distinctArr, arrBySet, count, circularClasses, circularFlip, polyDiagonals } from './cnt.mjs';

// ============================================================ True-false
Q('tf1', mk.tf({ stem: r`The quotient $\dfrac{8!}{4!}$ equals $2!$, because $8$ divided by $4$ is $2$.`, key: 'f', sol: r`Factorials do not divide like numbers. $\dfrac{8!}{4!} = 8 \times 7 \times 6 \times 5 = 1680$, which is far from $2! = 2$.`, d: 1, c: 'understanding', t: [1] }), (C) => {
  C.assert(F(8) / F(4) === 1680n && F(8) / F(4) !== F(2) && 8 * 7 * 6 * 5 === 1680, '8!/4! = 1680'); C.key('f');
});
{
  const row = F(6), ring = circularClasses(6);
  Q('tf2', mk.tf({ stem: r`Six different guests can be seated round a circular table in the same number of ways as they can be seated in a straight row of six chairs.`, key: 'f', sol: r`In a row there are $6! = 720$ seatings. Round a table the rotations of a seating are the same, so there are only $(6 - 1)! = 120$. The two numbers differ by a factor of $6$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
    C.assert(row === 720n && ring === 120 && F(5) === 120n && Number(row) / ring === 6, 'row 720, ring 120'); C.key('f');
  });
}
Q('tf3', mk.tf({ stem: r`For choosing from ten different tokens, the number of ways to take $3$ of them equals the number of ways to take $7$ of them.`, key: 't', sol: r`Choosing $3$ tokens to take is the same as choosing the $7$ to leave behind, so $^{10}C_{3} = {}^{10}C_{7} = 120$.`, d: 1, c: 'understanding', t: [4] }), (C) => {
  C.assert(count(kCombs(range(1, 10), 3)) === 120 && count(kCombs(range(1, 10), 7)) === 120 && Cm(10, 3) === Cm(10, 7), '10C3 = 10C7 = 120'); C.key('t');
});
Q('tf4', mk.tf({ stem: r`Picking $2$ of $6$ different books to lend to a friend, and arranging $2$ of the $6$ on a shelf in a particular order, are counted by the same number.`, key: 'f', sol: r`Lending is a selection: $^{6}C_{2} = 15$. Arranging is an ordered choice: $^{6}P_{2} = 30$. Each pair of books can be put on the shelf in $2!$ ways, so the second number is twice the first.`, d: 2, c: 'analysis', t: [4] }), (C) => {
  C.assert(count(kCombs(range(1, 6), 2)) === 15 && count(kPerms(range(1, 6), 2)) === 30 && P(6, 2) === 2n * Cm(6, 2), '6C2 = 15, 6P2 = 30'); C.key('f');
});
{
  const seen = new Set(); for (let m = 1; m < 64; m++) { let c = 0; for (let i = 0; i < 6; i++) if (m & (1 << i)) c++; seen.add(c); }
  Q('tf5', mk.tf({ stem: r`If a child may take any number of $6$ identical stickers, but at least one, the number of different outcomes is $6$.`, key: 't', sol: r`Because the stickers are identical, an outcome is fixed only by how many are taken: $1, 2, 3, 4, 5$ or $6$. That is $6$ outcomes. (The $2^6 - 1 = 63$ count applies only when the stickers are all different.)`, d: 2, c: 'understanding', t: [4] }), (C) => {
    C.assert(seen.size === 6 && 2 ** 6 - 1 === 63, 'identical items: 6 outcomes from 63 labelled selections'); C.key('t');
  });
}

// ============================================================ Fill in the blank
Q('fb1', mk.fill({ stem: r`The value of $^{9}P_{3}$ is ____.`, acc: [['504']], sol: r`$^{9}P_{3} = 9 \times 8 \times 7 = 504$.`, d: 1, c: 'understanding', t: [2] }), (C) => {
  C.assert(P(9, 3) === 504n && count(kPerms(range(1, 9), 3)) === 504, '9P3 = 504'); C.blank(504);
});
Q('fb2', mk.fill({ stem: r`A convex octagon has ____ diagonals.`, acc: [['20']], sol: r`Joining pairs of the $8$ vertices gives $^{8}C_{2} = 28$ segments, of which $8$ are sides, so there are $28 - 8 = 20$ diagonals.`, d: 1, c: 'understanding', t: [5] }), (C) => {
  C.assert(polyDiagonals(8) === 20 && Cm(8, 2) - 8n === 20n, 'octagon: 20 diagonals'); C.blank(20);
});
Q('fb3', mk.fill({ stem: r`The value of $\dfrac{12!}{10!\,2!}$ is ____.`, acc: [['66']], sol: r`$\dfrac{12!}{10!\,2!} = \dfrac{12 \times 11}{2} = 66$, which is $^{12}C_{2}$.`, d: 1, c: 'understanding', t: [4] }), (C) => {
  C.assert(F(12) / (F(10) * F(2)) === 66n && Cm(12, 2) === 66n, '12!/(10!2!) = 66'); C.blank(66);
});
Q('fb4', mk.fill({ stem: r`The letters of the word BANANA can be arranged in ____ distinct ways.`, acc: [['60']], sol: r`There are $6$ letters with A three times and N twice: $\dfrac{6!}{3!\,2!} = \dfrac{720}{12} = 60$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  C.assert(count(distinctArr('BANANA')) === 60 && multi(6, 3, 2) === 60n, '6!/(3!2!) = 60'); C.blank(60);
});
Q('fb5', mk.fill({ stem: r`Seven different keys are fixed on a ring that can be turned over, so two arrangements that are mirror images are not counted separately. The number of different key rings is ____.`, acc: [['360']], sol: r`Round a ring there are $(7 - 1)! = 720$ arrangements, and turning the ring over pairs them up, so there are $\dfrac{720}{2} = 360$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  C.assert(circularFlip(7) === 360 && F(6) / 2n === 360n, '(7-1)!/2 = 360'); C.blank(360);
});

// ============================================================ Numerical
{
  const v = count(kPerms(range(0, 7), 3), (a) => a[0] !== 0 && a[2] % 2 === 1);
  Q('n1', mk.num({ stem: r`How many odd three-digit numbers with three different digits can be written using only the digits $0, 1, 2, 3, 4, 5, 6, 7$?`, value: 144, unit: null, sol: r`The units digit is odd: $4$ choices ($1, 3, 5, 7$). The hundreds digit is not $0$ and not the units digit: $8 - 2 = 6$ choices. The tens digit is any of the $8 - 2 = 6$ digits left. The number is $4 \times 6 \times 6 = 144$.`, scheme: [['Units digit: $4$ choices (fill the awkward place first)', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 120 }), (C) => {
    C.assert(v === 144 && 4 * 6 * 6 === 144, '4 x 6 x 6 = 144 by enumeration'); C.val(v);
  });
}
{
  const v = count(distinctArr('PARALLEL'));
  Q('n2', mk.num({ stem: r`Find the number of distinct arrangements of all the letters of the word PARALLEL.`, value: 3360, unit: null, sol: r`PARALLEL has $8$ letters: A twice, L three times, and P, R, E once each. The number is $\dfrac{8!}{2!\,3!} = \dfrac{40320}{12} = 3360$.`, scheme: [['$\\dfrac{8!}{2!\\,3!}$', 1]], marks: 1, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => {
    C.assert(v === 3360 && multi(8, 2, 3) === 3360n, '8!/(2!3!) = 3360'); C.val(v);
  });
}
{
  const boys = range(1, 7).map((i) => 'b' + i), g6 = range(1, 6).map((i) => 'g' + i);
  Q('n3', mk.num({ stem: r`A debating club of an imagined school has $7$ boys and $6$ girls. A team of $5$ is formed with exactly $2$ girls. In how many ways can the team be chosen?`, value: 525, unit: null, sol: r`Choose the girls and the boys separately and multiply. Girls: $^{6}C_{2} = 15$. Boys: $^{7}C_{3} = 35$. The number of teams is $15 \times 35 = 525$.`, scheme: [['$^{6}C_{2} \\times {}^{7}C_{3}$', 1]], marks: 1, d: 3, c: 'application', t: [5], time: 90 }), (C) => {
    const w = count(kCombs([...boys, ...g6], 5), (g) => g.filter((x) => x[0] === 'g').length === 2);
    C.assert(w === 525 && Cm(6, 2) * Cm(7, 3) === 525n, '6C2 x 7C3 = 525 by enumeration'); C.val(w);
  });
}
{
  const v = circularClasses(7, (a) => { const i = a.indexOf(0), j = a.indexOf(1), n = a.length; return !((i - j + n) % n === 1 || (j - i + n) % n === 1); });
  Q('n4', mk.num({ stem: r`Seven imagined friends sit round a circular table, and two of them have quarrelled and must not sit next to each other. Seatings that differ by a rotation are the same. Find the number of seatings.`, value: 480, unit: null, sol: r`All seatings: $(7 - 1)! = 720$. Seatings with the two together: treat them as one unit, so $6$ units round the table in $5! = 120$ ways, times $2$ orders, which is $240$. So the number is $720 - 240 = 480$.`, scheme: [['Total $6!$ and together $2 \\times 5!$', 1]], marks: 1, d: 4, c: 'application', t: [3], time: 150 }), (C) => {
    C.assert(v === 480 && F(6) - 2n * F(5) === 480n, '6! - 2 x 5! = 480 by canonical rotation classes'); C.val(v);
  });
}
{
  const sol = range(3, 60).filter((n) => Cm(2 * n, 3) === 11n * Cm(n, 3));
  Q('n5', mk.num({ stem: r`The ratio of the number of ways of choosing $3$ objects from $2n$ different objects to the number of ways of choosing $3$ from $n$ different objects is $11 : 1$. Determine the integer $n$.`, value: 6, unit: null, sol: r`$\dfrac{^{2n}C_{3}}{^{n}C_{3}} = \dfrac{2n(2n - 1)(2n - 2)}{n(n - 1)(n - 2)} = \dfrac{4(2n - 1)}{n - 2}$. Setting this equal to $11$: $8n - 4 = 11n - 22$, so $3n = 18$ and $n = 6$. Check: $^{12}C_{3} = 220 = 11 \times 20 = 11 \times {}^{6}C_{3}$.`, scheme: [['Simplified ratio $\\dfrac{4(2n - 1)}{n - 2}$', 1]], marks: 1, d: 4, c: 'application', t: [4], time: 150 }), (C) => {
    C.assert(sol.join() === '6' && Cm(12, 3) === 220n && Cm(6, 3) === 20n, 'search over n gives n = 6'); C.val(sol[0]);
  });
}

// ============================================================ Short answers, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Using factorials, prove that $^{n}C_{r} = {}^{n}C_{n-r}$ for $0 \le r \le n$, and explain the result in words.`, model: r`$^{n}C_{n-r} = \dfrac{n!}{(n - r)!\,\bigl(n - (n - r)\bigr)!} = \dfrac{n!}{(n - r)!\,r!} = {}^{n}C_{r}$. In words: choosing $r$ objects to take is the same decision as choosing the $n - r$ objects to leave, so the two counts are equal. For example $^{9}C_{3} = {}^{9}C_{6} = 84$.`, sol: 'Replace $r$ by $n - r$ in the factorial formula and the two denominators swap.', scheme: [['Substitute $n - r$ in $\\dfrac{n!}{r!\\,(n - r)!}$ and simplify', 1], ['Explain: select $r$ equals leave $n - r$', 1]], d: 3, c: 'analysis', t: [4], time: 120 }), (C) => {
  C.assert(range(0, 14).every((n) => range(0, n).every((k) => Cm(n, k) === Cm(n, n - k))) && Cm(9, 3) === 84n && Cm(9, 6) === 84n, 'symmetry for n = 0..14; 9C3 = 9C6 = 84'); C.model([84]);
});
{
  const sol = range(1, 40).filter((n) => F(n + 1) === 12n * F(n - 1));
  Q('s202', mk.short({ marks: 2, stem: r`Determine the value of $n$, a positive integer, that makes $(n + 1)! = 12 \times (n - 1)!$ true.`, model: r`Write $(n + 1)! = (n + 1)\,n\,(n - 1)!$. Then $(n + 1)\,n\,(n - 1)! = 12\,(n - 1)!$, so $n(n + 1) = 12$, that is $n^2 + n - 12 = (n + 4)(n - 3) = 0$. Since $n$ is positive, $n = 3$. Check: $4! = 24 = 12 \times 2!$.`, sol: 'Expand the larger factorial down to the smaller one and cancel.', scheme: [['$n(n + 1) = 12$ after cancelling $(n - 1)!$', 1], ['$n = 3$, rejecting $n = -4$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (C) => {
    C.assert(sol.join() === '3' && F(4) === 24n && 12n * F(2) === 24n, 'search gives n = 3'); C.model([3, 12]);
  });
}
{
  const v = count(kPerms(range(1, 9), 5));
  Q('s203', mk.short({ marks: 2, stem: r`A coach picks the first five batters, in batting order, from a squad of nine imagined players. In how many different ways can the batting order be picked?`, model: r`The order matters, so this is $^{9}P_{5} = 9 \times 8 \times 7 \times 6 \times 5 = ${S(P(9, 5))}$.`, sol: 'An ordered choice of $5$ from $9$ is a permutation.', scheme: [['Identify an ordered choice, $^{9}P_{5}$', 1], [`Evaluate: ${S(P(9, 5))}`, 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (C) => {
    C.assert(v === 15120 && P(9, 5) === 15120n, '9P5 = 15120 by enumeration'); C.model([15120]);
  });
}
{
  const v = count(distinctArr('ENGINE'), (w) => w.includes('EE')), all = count(distinctArr('ENGINE'));
  Q('s204', mk.short({ marks: 2, stem: r`In how many distinct arrangements of the letters of the word ENGINE do the two E's stand side by side?`, model: r`Treat the two E's as one block EE. The units are EE, N, G, I, N: $5$ units with N twice. The number of arrangements is $\dfrac{5!}{2!} = 60$. (All arrangements of ENGINE number $\dfrac{6!}{2!\,2!} = 180$.)`, sol: 'Glue the alike letters into one block, then allow for the other repeated letter.', scheme: [['Block EE and $5$ units', 1], ['$\\dfrac{5!}{2!} = 60$', 1]], d: 3, c: 'application', t: [2, 3], time: 120 }), (C) => {
    C.assert(v === 60 && F(5) / F(2) === 60n && all === 180 && multi(6, 2, 2) === 180n, 'ENGINE with EE together = 60, in all 180'); C.model([60, 180]);
  });
}
{
  const v = circularFlip(6);
  Q('s205', mk.short({ marks: 2, stem: r`Six different flowers are strung into a garland that can be turned over. In how many different ways can the garland be made?`, model: r`Round a ring there are $(6 - 1)! = 120$ arrangements. A garland can be turned over, so each arrangement and its mirror image are one design: $\dfrac{120}{2} = 60$.`, sol: 'Circular count first, then halve for turning over.', scheme: [['$(6 - 1)! = 120$', 1], ['Halve for the mirror image: $60$', 1]], d: 2, c: 'understanding', t: [3], time: 80 }), (C) => {
    C.assert(v === 60 && F(5) / 2n === 60n, '(6-1)!/2 = 60 by rotation and reflection classes'); C.model([120, 60]);
  });
}
{
  const sol = range(0, 10).filter((k) => Cm(14, k) === Cm(14, k + 4));
  Q('s206', mk.short({ marks: 2, stem: r`Find the value of $r$ for which $^{14}C_{r} = {}^{14}C_{r+4}$.`, model: r`Equal combinations with the same $n$ need $r + (r + 4) = 14$, because $^{n}C_{a} = {}^{n}C_{b}$ with $a \ne b$ means $a + b = n$. So $2r = 10$ and $r = 5$. Check: $^{14}C_{5} = {}^{14}C_{9} = 2002$.`, sol: 'Use $^{n}C_{a} = {}^{n}C_{b} \\Rightarrow a + b = n$ when $a \\ne b$.', scheme: [['$r + (r + 4) = 14$', 1], ['$r = 5$ with the check $2002$', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (C) => {
    C.assert(sol.join() === '5' && Cm(14, 5) === 2002n && Cm(14, 9) === 2002n, 'search gives r = 5'); C.model([5, 2002]);
  });
}
Q('s207', mk.short({ marks: 2, stem: r`Verify by evaluating each term that $^{11}C_{4} + {}^{11}C_{5} = {}^{12}C_{5}$.`, model: r`$^{11}C_{4} = \dfrac{11 \times 10 \times 9 \times 8}{24} = 330$ and $^{11}C_{5} = \dfrac{11 \times 10 \times 9 \times 8 \times 7}{120} = 462$. The sum is $792$. Also $^{12}C_{5} = \dfrac{12 \times 11 \times 10 \times 9 \times 8}{120} = 792$, so the two sides are equal.`, sol: 'This is Pascal\'s rule with $n = 11$ and $r = 5$.', scheme: [['$^{11}C_{4} = 330$, $^{11}C_{5} = 462$, sum $792$', 1], ['$^{12}C_{5} = 792$, so equal', 1]], d: 2, c: 'understanding', t: [4], time: 100 }), (C) => {
  C.assert(Cm(11, 4) === 330n && Cm(11, 5) === 462n && Cm(11, 4) + Cm(11, 5) === Cm(12, 5) && Cm(12, 5) === 792n && count(kCombs(range(1, 12), 5)) === 792, '330 + 462 = 792 = 12C5'); C.model([330, 462, 792]);
});
{
  const v = count(kCombs(range(1, 8), 3), (g) => g.includes(1) && !g.includes(2));
  Q('s208', mk.short({ marks: 2, stem: r`A panel of $3$ is to be chosen from $8$ volunteers, among whom are Zoya and Ravi (imagined people). Zoya must be on the panel and Ravi must not be. In how many ways can the panel be chosen?`, model: r`Zoya is in and Ravi is out, so the other $2$ places are filled from the remaining $8 - 2 = 6$ volunteers: $^{6}C_{2} = \dfrac{6 \times 5}{2} = 15$.`, sol: 'Fix the forced member, remove the excluded one, then choose the rest.', scheme: [['Remaining pool is $6$ and the places left are $2$', 1], ['$^{6}C_{2} = 15$', 1]], d: 2, c: 'application', t: [5], time: 90 }), (C) => {
    C.assert(v === 15 && Cm(6, 2) === 15n, '6C2 = 15 by enumeration'); C.model([6, 2, 15]);
  });
}
{
  const v = count(kSeqs(range(1, 5), 3), (a) => a[0] * 100 + a[1] * 10 + a[2] < 300);
  Q('s209', mk.short({ marks: 2, stem: r`Three-digit numbers below $300$ are written using only the digits $1, 2, 3, 4, 5$, and a digit may be used more than once. How many such numbers are there?`, model: r`The hundreds digit must be $1$ or $2$: $2$ choices. The tens and units digits are each any of the $5$ digits. By the multiplication principle the number is $2 \times 5 \times 5 = 50$.`, sol: 'Handle the restricted place first.', scheme: [['Hundreds digit: $2$ choices', 1], ['$2 \\times 5 \\times 5 = 50$', 1]], d: 2, c: 'application', t: [1], time: 80 }), (C) => {
    C.assert(v === 50 && 2 * 5 * 5 === 50, '2 x 5 x 5 = 50 by enumeration'); C.model([2, 5, 50]);
  });
}

// ============================================================ Short answers, 3 marks
{
  let all = 0, five = 0; for (let n = 1000; n <= 9999; n++) if ([...String(n)].every((d) => Number(d) <= 6)) { all++; if (n % 5 === 0) five++; }
  Q('s301', mk.short({ marks: 3, stem: r`Four-digit numbers are written using only the digits $0, 1, 2, 3, 4, 5, 6$, and a digit may be used more than once. Find how many such numbers (a) there are in all, (b) are multiples of $5$.`, model: r`(a) The first digit cannot be $0$: $6$ choices. Each of the other three digits has $7$ choices. The number is $6 \times 7 \times 7 \times 7 = 2058$.

(b) A multiple of $5$ ends in $0$ or $5$: $2$ choices for the units digit. Then $6 \times 7 \times 7 \times 2 = 588$.`, sol: 'Count the restricted places first: the first digit and the units digit.', scheme: [['(a) $6 \\times 7^3 = 2058$', 1], ['(b) units digit $0$ or $5$: $2$ choices', 1], ['(b) $6 \\times 7 \\times 7 \\times 2 = 588$', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (C) => {
    C.assert(all === 2058 && five === 588 && 6 * 343 === 2058 && 6 * 49 * 2 === 588, '2058 and 588 by enumeration of 1000..9999'); C.model([2058, 588]);
  });
}
{
  const w = distinctArr('MACHINE'); const arr = [...w];
  const all = arr.length, tog = arr.filter((x) => /[AEI]{3}/.test(x)).length, vc = arr.filter((x) => 'AEI'.includes(x[0]) && !'AEI'.includes(x[6])).length;
  Q('s302', mk.short({ marks: 3, stem: r`The seven different letters of the word MACHINE are arranged in a row. Find the number of arrangements (a) in all, (b) in which the three vowels are together, (c) that begin with a vowel and end with a consonant.`, model: r`(a) $7! = 5040$.

(b) Treat the three vowels A, I, E as one block: the block and the $4$ consonants make $5$ units, $5! = 120$ ways, and the vowels can be ordered inside in $3! = 6$ ways. The number is $120 \times 6 = 720$.

(c) The first place has $3$ vowel choices, the last has $4$ consonant choices, and the middle five places take the other $5$ letters in $5! = 120$ ways: $3 \times 4 \times 120 = 1440$.`, sol: 'Block method for (b); fill the end places first for (c).', scheme: [['(a) $7! = 5040$', 1], ['(b) $5! \\times 3! = 720$', 1], ['(c) $3 \\times 4 \\times 5! = 1440$', 1]], d: 3, c: 'application', t: [2, 3], time: 170 }), (C) => {
    C.assert(all === 5040 && tog === 720 && vc === 1440 && 3n * 4n * F(5) === 1440n && F(5) * F(3) === 720n, '5040, 720, 1440 by enumeration of all 7! arrangements'); C.model([5040, 720, 1440]);
  });
}
{
  const adj = (a) => { const n = a.length, i = a.indexOf(0), j = a.indexOf(1); return (i - j + n) % n === 1 || (j - i + n) % n === 1; };
  const all = circularClasses(6), tog = circularClasses(6, adj), apart = circularClasses(6, (a) => !adj(a));
  Q('s303', mk.short({ marks: 3, stem: r`Six imagined friends sit round a circular table, and two seatings that differ only by a rotation are the same. Find the number of seatings (a) in all, (b) with two particular friends side by side, (c) with those two friends not side by side.`, model: r`(a) $(6 - 1)! = 120$.

(b) Treat the two friends as one unit: $5$ units round the table in $(5 - 1)! = 24$ ways, and the pair can swap in $2$ ways: $2 \times 24 = 48$.

(c) Subtract: $120 - 48 = 72$.`, sol: 'Circular count with the pair as one unit; subtract for the complement.', scheme: [['(a) $5! = 120$', 1], ['(b) $2 \\times 4! = 48$', 1], ['(c) $120 - 48 = 72$', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => {
    C.assert(all === 120 && tog === 48 && apart === 72 && F(5) - 2n * F(4) === 72n, '120, 48, 72 by canonical rotation classes'); C.model([120, 48, 72]);
  });
}
{
  const m = range(1, 6).map((i) => 'm' + i), w = range(1, 5).map((i) => 'w' + i);
  const ppl = [...m, ...w];
  const g = (f) => count(kCombs(ppl, 5), (c) => f(c.filter((x) => x[0] === 'w').length));
  Q('s304', mk.short({ marks: 3, stem: r`A garden committee of $5$ is chosen from $6$ men and $5$ women of an imagined housing society. Find the number of committees (a) with no restriction, (b) with exactly $3$ women, (c) with at least $4$ women.`, model: r`(a) $^{11}C_{5} = 462$.

(b) $3$ women and $2$ men: $^{5}C_{3} \times {}^{6}C_{2} = 10 \times 15 = 150$.

(c) $4$ women and $1$ man, or $5$ women and no man: $^{5}C_{4} \times {}^{6}C_{1} + {}^{5}C_{5} = 30 + 1 = 31$.`, sol: 'Split by the number of women, then add the cases for (c).', scheme: [['(a) $^{11}C_{5} = 462$', 1], ['(b) $^{5}C_{3} \\times {}^{6}C_{2} = 150$', 1], ['(c) $30 + 1 = 31$', 1]], d: 3, c: 'application', t: [5], time: 160 }), (C) => {
    C.assert(g(() => true) === 462 && g((k) => k === 3) === 150 && g((k) => k >= 4) === 31, '462, 150, 31 by enumeration'); C.model([462, 150, 31]);
  });
}
Q('s305', mk.short({ marks: 3, stem: r`Explain why $^{n}P_{r} = r! \times {}^{n}C_{r}$, and use $^{9}C_{4} = 126$ to find $^{9}P_{4}$.`, model: r`Each selection of $r$ objects from $n$ can be arranged in a row in $r!$ ways, and different selections give different arrangements, so the number of arrangements is $^{n}P_{r} = r! \times {}^{n}C_{r}$. For $n = 9$ and $r = 4$: $^{9}P_{4} = 4! \times 126 = 24 \times 126 = 3024$. Check: $9 \times 8 \times 7 \times 6 = 3024$.`, sol: 'Select first, then order the selection.', scheme: [['Each selection can be ordered in $r!$ ways', 1], ['So $^{n}P_{r} = r!\\,{}^{n}C_{r}$ (selections are distinct)', 1], ['$24 \\times 126 = 3024$', 1]], d: 3, c: 'analysis', t: [4], time: 140 }), (C) => {
  C.assert(P(9, 4) === 24n * Cm(9, 4) && Cm(9, 4) === 126n && P(9, 4) === 3024n && count(kPerms(range(1, 9), 4)) === 3024, '24 x 126 = 3024 = 9 x 8 x 7 x 6'); C.model([126, 24, 3024]);
});
{
  const items = [...range(1, 4).map((i) => 'r' + i), ...range(1, 3).map((i) => 'b' + i), 'x', 'y'];
  const seen = new Set();
  for (let mask = 1; mask < 1 << items.length; mask++) { const pick = items.filter((_, i) => mask & (1 << i)); seen.add(`${pick.filter((q) => q[0] === 'r').length},${pick.filter((q) => q[0] === 'b').length},${pick.filter((q) => q === 'x' || q === 'y').join('')}`); }
  Q('s306', mk.short({ marks: 3, stem: r`A craft box holds $4$ identical red marbles, $3$ identical blue marbles and $2$ different stickers. Find the number of ways of taking at least one of these items.`, model: r`Red marbles: $0$ to $4$ taken, $5$ choices. Blue marbles: $0$ to $3$, $4$ choices. Each sticker is taken or left, $2 \times 2 = 4$ choices. All selections: $5 \times 4 \times 4 = 80$. Remove the case where nothing is taken: $80 - 1 = 79$.`, sol: 'Identical items give $(p + 1)$ choices; each different item gives $2$; subtract the empty selection.', scheme: [['Marbles: $5 \\times 4$ choices', 1], ['Stickers: $2^2 = 4$ choices', 1], ['$5 \\times 4 \\times 4 - 1 = 79$', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => {
    C.assert(seen.size === 79 && 5 * 4 * 4 - 1 === 79, '79 distinct non-empty selections'); C.model([5, 4, 80, 79]);
  });
}
{
  const ns = range(3, 40).filter((n) => polyDiagonals(n) === 54);
  Q('s307', mk.short({ marks: 3, stem: r`A convex polygon has $54$ diagonals. (a) Find the number of its sides. (b) Find the number of triangles that can be formed by joining three of its vertices.`, model: r`(a) With $n$ sides the diagonals number $^{n}C_{2} - n = \dfrac{n(n - 1)}{2} - n = \dfrac{n(n - 3)}{2}$. Setting $\dfrac{n(n - 3)}{2} = 54$ gives $n^2 - 3n - 108 = 0$, so $(n - 12)(n + 9) = 0$ and $n = 12$.

(b) Any $3$ vertices form a triangle: $^{12}C_{3} = 220$.`, sol: 'Diagonals are all pairs of vertices minus the sides.', scheme: [['$\\dfrac{n(n - 3)}{2} = 54$', 1], ['$n = 12$, rejecting $n = -9$', 1], ['$^{12}C_{3} = 220$', 1]], d: 3, c: 'application', t: [5], time: 150 }), (C) => {
    C.assert(ns.join() === '12' && Cm(12, 3) === 220n && 12 * 9 / 2 === 54, 'search gives n = 12; 12C3 = 220'); C.model([12, 220]);
  });
}
{
  const vow = ['a', 'e', 'u'], con = ['b', 'd', 'k', 'm', 'z'];
  const v = count(kPerms([...vow, ...con], 4), (w) => w.filter((x) => vow.includes(x)).length === 2);
  Q('s308', mk.short({ marks: 3, stem: r`Four-letter words, meaningful or not, are made from $3$ different vowels and $5$ different consonants, using no letter twice. Each word has exactly $2$ vowels and $2$ consonants. Find the number of such words.`, model: r`Select the letters: $^{3}C_{2} \times {}^{5}C_{2} = 3 \times 10 = 30$ sets of $4$ letters. Arrange each set in $4! = 24$ ways. The number of words is $30 \times 24 = 720$.`, sol: 'Select the vowels and the consonants, then arrange every selected set.', scheme: [['$^{3}C_{2} \\times {}^{5}C_{2} = 30$ selections', 1], ['$4! = 24$ arrangements of each set', 1], ['$30 \\times 24 = 720$', 1]], d: 3, c: 'application', t: [5], time: 140 }), (C) => {
    C.assert(v === 720 && Cm(3, 2) * Cm(5, 2) * F(4) === 720n, '3C2 x 5C2 x 4! = 720 by enumeration'); C.model([30, 24, 720]);
  });
}
{
  // labels 0..3 are boys, 4..7 girls; alternate means neighbours differ in gender
  const alt = (a) => a.every((x, i) => (x < 4) !== (a[(i + 1) % 8] < 4));
  const v = circularClasses(8, alt);
  Q('s309', mk.short({ marks: 3, stem: r`Four boys and four girls of an imagined dance group sit round a circular table so that boys and girls alternate. Two seatings that differ only by a rotation are the same. Find the number of seatings.`, model: r`Seat the $4$ boys first round the table: $(4 - 1)! = 6$ ways. This leaves $4$ gaps, one between each pair of neighbouring boys. The $4$ girls fill the $4$ gaps in $4! = 24$ ways. By the multiplication principle the number of seatings is $6 \times 24 = 144$.`, sol: 'Fix the circular arrangement of one group, then place the other group in the gaps.', scheme: [['Boys round the table: $3! = 6$', 1], ['Girls in the gaps: $4! = 24$', 1], ['$6 \\times 24 = 144$', 1]], d: 4, c: 'application', t: [3], time: 170 }), (C) => {
    C.assert(v === 144 && F(3) * F(4) === 144n, '3! x 4! = 144 by canonical rotation classes of 8! seatings'); C.model([6, 24, 144]);
  });
}
{
  const sol = range(4, 40).filter((n) => P(n, 4) === 20n * P(n, 2));
  Q('s310', mk.short({ marks: 3, stem: r`The number of permutations of $4$ objects from $n$ different objects is $20$ times the number of permutations of $2$ objects from the same $n$, that is $^{n}P_{4} = 20 \times {}^{n}P_{2}$. Determine $n$.`, model: r`$^{n}P_{4} = n(n - 1)(n - 2)(n - 3)$ and $^{n}P_{2} = n(n - 1)$. Dividing by $n(n - 1)$: $(n - 2)(n - 3) = 20$, so $n^2 - 5n - 14 = 0$, that is $(n - 7)(n + 2) = 0$. Since $n \ge 4$, $n = 7$. Check: $^{7}P_{4} = 840 = 20 \times 42$.`, sol: 'Cancel the common factors $n(n - 1)$ and solve the resulting quadratic.', scheme: [['$(n - 2)(n - 3) = 20$', 1], ['$(n - 7)(n + 2) = 0$', 1], ['$n = 7$, rejecting $n = -2$', 1]], d: 3, c: 'application', t: [2], time: 140 }), (C) => {
    C.assert(sol.join() === '7' && P(7, 4) === 840n && P(7, 2) === 42n, 'search gives n = 7'); C.model([7, 20, 840]);
  });
}

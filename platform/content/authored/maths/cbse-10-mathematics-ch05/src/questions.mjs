// CBSE 10 Mathematics ch05 Arithmetic Progressions — practice bank with independent re-solve checks
// (terms and sums recomputed term by term from the givens; unknowns found by search; stories re-run).
import { Q, caseQ, child, mk, r, plot } from './lib.mjs';

/** nth term and sum of the first n terms, computed by adding terms one at a time (not by the formulas). */
const seq = (a, d, n) => Array.from({ length: n }, (_, k) => a + k * d);
const T = (a, d, n) => seq(a, d, n)[n - 1];
const S = (a, d, n) => seq(a, d, n).reduce((s, x) => s + x, 0);
const isAP = (xs) => xs.every((x, i) => i < 2 || Math.abs(x - xs[i - 1] - (xs[1] - xs[0])) < 1e-9);
/** Smallest natural n (≤ 1000) with pred(n). */
const firstN = (pred) => { for (let n = 1; n <= 1000; n++) if (pred(n)) return n; return null; };
const near = (u, v) => Math.abs(u - v) < 1e-9;

const qRun = plot({ x: [0, 22], y: [0, 14], xl: 'day n', yl: 'distance (km)', fns: [{ expr: '0.5x + 1.5', label: '$a_n = 0.5n + 1.5$', domain: [1, 21] }], pts: [[1, 2, '(1, 2)'], [2, 2.5, '(2, 2.5)'], [3, 3, '(3, 3)'], [4, 3.5, '(4, 3.5)'], [5, 4, '(5, 4)']] }, 'Plot of the distance Sneha runs on day n: the points (1, 2), (2, 2.5), (3, 3), (4, 3.5) and (5, 4) lie on a straight line that rises by half a kilometre for every day.', 'Daily distances lie on a straight line: an arithmetic progression.');

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'Which of the following lists is an arithmetic progression?', opts: ['$2, 4, 8, 16, \\ldots$', '$1, 4, 9, 16, \\ldots$', '$-7, -3, 1, 5, \\ldots$', r`$\dfrac12, \dfrac14, \dfrac16, \ldots$`], key: 'c', sol: r`Check the differences of consecutive terms.

(a) $4 - 2 = 2$ but $8 - 4 = 4$: not constant (each term is doubled).

(b) $4 - 1 = 3$, $9 - 4 = 5$: not constant (these are squares).

(c) $-3 - (-7) = 4$, $1 - (-3) = 4$, $5 - 1 = 4$: constant, so it **is** an AP with $d = 4$.

(d) $\dfrac14 - \dfrac12 = -\dfrac14$ but $\dfrac16 - \dfrac14 = -\dfrac{1}{12}$: not constant.`, d: 1, c: 'understanding', t: [1], time: 60 }), (C) => C.which([[2, 4, 8, 16], [1, 4, 9, 16], [-7, -3, 1, 5], [1 / 2, 1 / 4, 1 / 6]].map(isAP), true));
Q('m02', mk.mcq({ stem: r`The common difference of the AP $\dfrac34, \dfrac14, -\dfrac14, \ldots$ is`, opts: [r`$\dfrac12$`, r`$-\dfrac12$`, r`$\dfrac14$`, '$-1$'], key: 'b', sol: r`$d = a_2 - a_1 = \dfrac14 - \dfrac34 = -\dfrac24 = -\dfrac12$. Option (a) subtracts the wrong way round ($a_1 - a_2$). The terms decrease, so $d$ must be negative.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([0.5, -0.5, 0.25, -1], 1 / 4 - 3 / 4));
Q('m03', mk.mcq({ stem: r`If $k + 2$, $3k$ and $4k + 1$ are three consecutive terms of an AP, then $k$ equals`, opts: ['$3$', '$1$', '$-3$', r`$\dfrac23$`], key: 'a', sol: r`For three consecutive terms, the middle one is the average of the other two: $2(3k) = (k + 2) + (4k + 1)$, so $6k = 5k + 3$ and $k = 3$. **Check:** the terms are $5, 9, 13$, with common difference $4$.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { const k = firstN((n) => 2 * 3 * n === n + 2 + 4 * n + 1); C.which([3, 1, -3, 2 / 3], k); C.assert(isAP([k + 2, 3 * k, 4 * k + 1]), 'terms in AP'); });
Q('m04', mk.mcq({ stem: r`The $15$th term of the AP $11, 8, 5, \ldots$ is`, opts: ['$-31$', '$-34$', '$53$', '$-28$'], key: 'a', sol: r`$a = 11$, $d = -3$. $a_{15} = a + 14d = 11 - 42 = -31$. Option (b) uses $15d$ instead of $14d$; option (c) uses $d = +3$; option (d) is the $14$th term.`, d: 1, c: 'understanding', t: [2], time: 60 }), (C) => C.which([-31, -34, 53, -28], T(11, -3, 15)));
Q('m05', mk.mcq({ stem: r`Which term of the AP $6, 13, 20, \ldots$ is $104$?`, opts: ['$15$th', '$14$th', '$16$th', '$13$th'], key: 'a', sol: r`$a_n = 6 + (n - 1)7 = 104 \Rightarrow (n - 1)7 = 98 \Rightarrow n - 1 = 14 \Rightarrow n = 15$. Option (b) stops at $n - 1 = 14$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([15, 14, 16, 13], firstN((n) => T(6, 7, n) === 104)));
Q('m06', mk.mcq({ stem: r`The $n$th term of an AP is $a_n = 7 - 4n$. Its common difference is`, opts: ['$-4$', '$4$', '$3$', '$7$'], key: 'a', sol: r`$a_1 = 3$, $a_2 = -1$, so $d = -1 - 3 = -4$. In general $a_{n+1} - a_n = (7 - 4n - 4) - (7 - 4n) = -4$: the coefficient of $n$. Option (c) is the first term.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { const a = (n) => 7 - 4 * n; C.which([-4, 4, 3, 7], a(2) - a(1)); C.assert([1, 2, 3, 4, 5].every((n) => a(n + 1) - a(n) === -4), 'constant d'); });
Q('m07', mk.mcq({ stem: r`The number of terms in the AP $12, 17, 22, \ldots, 237$ is`, opts: ['$46$', '$45$', '$47$', '$225$'], key: 'a', sol: r`$237 = 12 + (n - 1)5 \Rightarrow (n - 1)5 = 225 \Rightarrow n - 1 = 45 \Rightarrow n = 46$. Option (b) forgets to add $1$ (it counts the gaps, not the terms).`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => C.which([46, 45, 47, 225], firstN((n) => T(12, 5, n) === 237)));
Q('m08', mk.mcq({ stem: r`In an AP, $a_7 = 34$ and $a_{13} = 64$. The common difference is`, opts: ['$5$', '$6$', '$30$', r`$\dfrac{30}{13}$`], key: 'a', sol: r`$a_{13} - a_7 = (a + 12d) - (a + 6d) = 6d = 64 - 34 = 30$, so $d = 5$. Option (b) divides by the wrong gap; the two terms are $13 - 7 = 6$ steps apart. **Check:** $a = 34 - 30 = 4$, and $4 + 12 \times 5 = 64$.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => { const d = (64 - 34) / 6; const a = 34 - 6 * d; C.which([5, 6, 30, 30 / 13], d); C.assert(T(a, d, 13) === 64, 'a13'); });
Q('m09', mk.mcq({ stem: r`The $8$th term from the end of the AP $4, 9, 14, \ldots, 254$ is`, opts: ['$219$', '$214$', '$39$', '$224$'], key: 'a', sol: r`From the end, the list is an AP with first term $l = 254$ and common difference $-5$: the $8$th term from the end is $l - 7d = 254 - 35 = 219$. Option (c) is the $8$th term from the start; option (d) uses $6d$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { const n = firstN((k) => T(4, 5, k) === 254); C.which([219, 214, 39, 224], T(4, 5, n - 7)); });
Q('m10', mk.mcq({ stem: r`Which of these numbers is a term of the AP $2, 9, 16, 23, \ldots$?`, opts: ['$100$', '$150$', '$302$', '$75$'], key: 'a', sol: r`Every term is $2 + 7k$ for a whole number $k$, i.e. leaves remainder $2$ on division by $7$. $100 - 2 = 98 = 7 \times 14$, so $100 = a_{15}$. For the others: $148$, $300$ and $73$ are not multiples of $7$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { const terms = new Set(seq(2, 7, 100)); C.which([100, 150, 302, 75].map((x) => terms.has(x)), true); });
Q('m11', mk.mcq({ stem: r`The sum of the first $20$ terms of the AP $1, 4, 7, \ldots$ is`, opts: ['$590$', '$620$', '$295$', '$58$'], key: 'a', sol: r`$S_{20} = \dfrac{20}{2}[2(1) + 19(3)] = 10 \times 59 = 590$. Option (b) uses $20d$ instead of $19d$; option (c) forgets that $\dfrac{n}{2} = 10$, not $5$; option (d) is $a_{20}$, not the sum.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { C.which([590, 620, 295, 58], S(1, 3, 20)); C.assert(T(1, 3, 20) === 58, 'a20'); });
Q('m12', mk.mcq({ stem: 'The sum of the first $n$ natural numbers is', opts: [r`$\dfrac{n(n + 1)}{2}$`, '$n(n + 1)$', r`$\dfrac{n(n - 1)}{2}$`, '$n^2$'], key: 'a', sol: r`$1, 2, 3, \ldots, n$ is an AP with $a = 1$, $l = n$: $S_n = \dfrac{n}{2}(1 + n)$. ($n^2$ is the sum of the first $n$ **odd** numbers.)`, d: 1, c: 'recall', t: [3], time: 45 }), (C) => { const fs = [(n) => (n * (n + 1)) / 2, (n) => n * (n + 1), (n) => (n * (n - 1)) / 2, (n) => n * n]; C.which(fs.map((g) => [3, 7, 10].every((n) => g(n) === S(1, 1, n))), true); });
Q('m13', mk.mcq({ stem: r`The sum $50 + 46 + 42 + \cdots + 2$ equals`, opts: ['$338$', '$312$', '$364$', '$676$'], key: 'a', sol: r`$a = 50$, $d = -4$, $l = 2$. $2 = 50 + (n - 1)(-4) \Rightarrow n - 1 = 12 \Rightarrow n = 13$. $S = \dfrac{13}{2}(50 + 2) = 13 \times 26 = 338$. Option (b) uses $n = 12$; option (d) forgets to halve.`, d: 2, c: 'application', t: [3], time: 90 }), (C) => { const n = firstN((k) => T(50, -4, k) === 2); C.which([338, 312, 364, 676], S(50, -4, n)); C.sol([13, 26]); });
Q('m14', mk.mcq({ stem: r`The sum of the first $n$ terms of an AP is $S_n = n^2 + 3n$. Its $4$th term is`, opts: ['$10$', '$28$', '$18$', '$46$'], key: 'a', sol: r`$a_4 = S_4 - S_3 = (16 + 12) - (9 + 9) = 28 - 18 = 10$. Option (b) is $S_4$, the sum of four terms, not the $4$th term.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => { const Sn = (n) => n * n + 3 * n; C.which([10, 28, 18, 46], Sn(4) - Sn(3)); });
Q('m15', mk.mcq({ stem: 'The sum of the first 15 odd natural numbers is', opts: ['$225$', '$240$', '$256$', '$120$'], key: 'a', sol: r`$1, 3, 5, \ldots$: $a = 1$, $d = 2$. $S_{15} = \dfrac{15}{2}[2 + 14 \times 2] = \dfrac{15}{2} \times 30 = 225 = 15^2$. Option (d) is the sum of the first $15$ natural numbers; option (c) is $16^2$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([225, 240, 256, 120], S(1, 2, 15)));
Q('m16', mk.mcq({ stem: 'Anil in Jaipur saves ₹100 in the first week, ₹130 in the second week, ₹160 in the third week, and so on. In which week does he save ₹520?', opts: ['15th', '14th', '16th', '13th'], key: 'a', sol: r`$a = 100$, $d = 30$: $100 + (n - 1)30 = 520 \Rightarrow (n - 1)30 = 420 \Rightarrow n - 1 = 14 \Rightarrow n = 15$. Option (b) stops at $n - 1$.`, d: 2, c: 'application', t: [2, 4], time: 75 }), (C) => C.which([15, 14, 16, 13], firstN((n) => T(100, 30, n) === 520)));
Q('m17', mk.mcq({ stem: 'In a nursery in Mysuru, plants are set in 10 rows. The first row has 6 plants and each row has 2 more plants than the row before it. The total number of plants is', opts: ['$150$', '$24$', '$140$', '$160$'], key: 'a', sol: r`$a = 6$, $d = 2$, $n = 10$: $S_{10} = 5[12 + 9 \times 2] = 5 \times 30 = 150$. Option (b) is the number in the last row ($6 + 18 = 24$); option (d) uses $10d$ instead of $9d$.`, d: 2, c: 'application', t: [3, 4], time: 75 }), (C) => { C.which([150, 24, 140, 160], S(6, 2, 10)); C.sol([24]); });
Q('m18', mk.mcq({ stem: 'A shopkeeper stacks soap boxes in rows: 21 in the bottom row, 2 fewer in each row above, and 1 box in the top row. How many boxes are there in all?', opts: ['$121$', '$11$', '$110$', '$231$'], key: 'a', sol: r`$21, 19, 17, \ldots, 1$: $1 = 21 + (n - 1)(-2) \Rightarrow n = 11$ rows. $S = \dfrac{11}{2}(21 + 1) = 121$. Option (b) is the number of rows; option (d) adds every whole number from $1$ to $21$.`, d: 3, c: 'application', t: [3, 4], time: 90 }), (C) => { const n = firstN((k) => T(21, -2, k) === 1); C.which([121, 11, 110, 231], S(21, -2, n)); });

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: r`The $17$th term of the AP $5, 9, 13, \ldots$ is $69$.`, r: r`The $n$th term of an AP with first term $a$ and common difference $d$ is $a + (n - 1)d$.`, key: 'a', sol: r`By R, $a_{17} = 5 + 16 \times 4 = 69$. Both are true and R is exactly the reason.`, d: 1, c: 'understanding', t: [2] }), (C) => { C.assert(T(5, 4, 17) === 69, 'a17'); C.key('a'); });
Q('ar2', mk.ar({ a: r`The sum of the first $10$ terms of the AP $2, 5, 8, \ldots$ is $155$.`, r: 'In an AP, the difference between any two consecutive terms is the same.', key: 'b', sol: r`A: $S_{10} = 5[4 + 9 \times 3] = 5 \times 31 = 155$, true. R is the definition of an AP, also true, but it does not compute the sum; the sum formula does. So R is not the explanation of A.`, d: 2, c: 'understanding', t: [1, 3] }), (C) => { C.assert(S(2, 3, 10) === 155, 'S10'); C.key('b'); });
Q('ar3', mk.ar({ a: '$3, 3, 3, 3, \\ldots$ is an arithmetic progression.', r: 'The common difference of an AP must be non-zero.', key: 'c', sol: r`A is true: every difference is $0$, which is constant, so it is an AP with $d = 0$. R is false: $d$ may be positive, negative **or zero**.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(isAP([3, 3, 3, 3]), 'constant AP'); C.key('c'); });
Q('ar4', mk.ar({ a: '$0$ is a term of the AP $31, 28, 25, \\ldots$', r: r`A number $p$ is a term of the AP $a, a + d, a + 2d, \ldots$ exactly when $\dfrac{p - a}{d}$ is a whole number.`, key: 'd', sol: r`R is true: $p = a + (n - 1)d$ needs $n - 1 = \dfrac{p - a}{d}$ to be a whole number. For $p = 0$: $\dfrac{0 - 31}{-3} = \dfrac{31}{3}$, not a whole number, so $0$ is **not** a term ($\ldots, 4, 1, -2, \ldots$ skips it). A is false.`, d: 3, c: 'analysis', t: [2] }), (C) => { C.assert(!seq(31, -3, 50).includes(0), '0 not a term'); C.key('d'); });
Q('ar5', mk.ar({ a: r`If the sum of the first $n$ terms of an AP is $S_n = 2n^2 + n$, then its common difference is $4$.`, r: r`For $n \ge 2$, the $n$th term is $a_n = S_n - S_{n-1}$.`, key: 'a', sol: r`By R, $a_n = (2n^2 + n) - (2(n - 1)^2 + (n - 1)) = 4n - 1$, giving $3, 7, 11, \ldots$ with $d = 4$. R explains A.`, d: 3, c: 'analysis', t: [3] }), (C) => { const Sn = (n) => 2 * n * n + n; const an = (n) => Sn(n) - Sn(n - 1); C.assert([2, 3, 4, 5].every((n) => an(n) - an(n - 1) === 4) && an(1) === 3, 'd = 4'); C.key('a'); });
Q('ar6', mk.ar({ a: 'The sum of the first few terms of an AP can never be zero.', r: 'An AP can have negative terms.', key: 'd', sol: r`A is false: $3 + 1 + (-1) + (-3) = 0$ is the sum of the first $4$ terms of the AP $3, 1, -1, -3, \ldots$. R is true (that same AP has negative terms).`, d: 2, c: 'evaluation', t: [3] }), (C) => { C.assert(S(3, -2, 4) === 0, 'sum 0'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: 'The numbers $1, 11, 111, 1111$ form an AP.', key: 'f', sol: r`The differences are $10$, $100$, $1000$: not constant, so it is not an AP.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(!isAP([1, 11, 111, 1111]), 'not AP'); C.key('f'); });
Q('tf2', mk.tf({ stem: 'If every term of an AP is multiplied by 3, the new list is also an AP.', key: 't', sol: r`If $a_{n+1} - a_n = d$, then $3a_{n+1} - 3a_n = 3d$, which is again constant. For example, $2, 5, 8$ becomes $6, 15, 24$ with $d = 9$.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(isAP(seq(2, 3, 6).map((x) => 3 * x)), 'scaled AP'); C.key('t'); });
Q('tf3', mk.tf({ stem: 'In the AP $10, 7, 4, \\ldots$, the 30th term is $-77$.', key: 't', sol: r`$a_{30} = 10 + 29(-3) = 10 - 87 = -77$.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(T(10, -3, 30) === -77, 'a30'); C.key('t'); });
Q('tf4', mk.tf({ stem: 'The sum of the first $n$ terms of an AP is always $n$ times its first term.', key: 'f', sol: r`Only when $d = 0$. For $1, 2, 3$: the sum is $6$, but $3 \times 1 = 3$. In general $S_n = na + \dfrac{n(n - 1)}{2}d$.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(S(1, 1, 3) === 6, 'counter-example'); C.key('f'); });
Q('tf5', mk.tf({ stem: 'If $S_n$ is the sum of the first $n$ terms of an AP, then $S_7 - S_6$ equals the 7th term.', key: 't', sol: r`$S_7 = a_1 + \cdots + a_6 + a_7$ and $S_6 = a_1 + \cdots + a_6$, so $S_7 - S_6 = a_7$.`, d: 1, c: 'recall', t: [3] }), (C) => { C.assert(S(4, 3, 7) - S(4, 3, 6) === T(4, 3, 7), 'example'); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: 'The common difference of the AP $-2, 5, 12, \\ldots$ is ___.', acc: [['7']], sol: r`$d = 5 - (-2) = 7$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(5 - -2));
Q('fb2', mk.fill({ stem: 'The 10th term of the AP $2.5, 4, 5.5, \\ldots$ is ___.', acc: [['16']], sol: r`$a = 2.5$, $d = 1.5$: $a_{10} = 2.5 + 9 \times 1.5 = 2.5 + 13.5 = 16$.`, d: 2, c: 'understanding', t: [2] }), (C) => C.blank(T(2.5, 1.5, 10)));
Q('fb3', mk.fill({ stem: 'The sum of the first 25 natural numbers is ___.', acc: [['325']], sol: r`$S_{25} = \dfrac{25 \times 26}{2} = 325$.`, d: 1, c: 'recall', t: [3] }), (C) => C.blank(S(1, 1, 25)));
Q('fb4', mk.fill({ stem: 'If $2x$, $x + 10$ and $3x + 2$ are consecutive terms of an AP, then $x =$ ___.', acc: [['6']], sol: r`$2(x + 10) = 2x + (3x + 2) \Rightarrow 2x + 20 = 5x + 2 \Rightarrow x = 6$. The terms are $12, 16, 20$.`, d: 2, c: 'application', t: [1] }), (C) => { const x = firstN((n) => 2 * (n + 10) === 2 * n + 3 * n + 2); C.blank(x); C.assert(isAP([2 * x, x + 10, 3 * x + 2]), 'AP'); });
Q('fb5', mk.fill({ stem: 'An AP has first term $4$, last term $40$ and $10$ terms. The sum of its terms is ___.', acc: [['220']], sol: r`$S = \dfrac{n}{2}(a + l) = \dfrac{10}{2}(4 + 40) = 5 \times 44 = 220$.`, d: 1, c: 'understanding', t: [3] }), (C) => { const d = (40 - 4) / 9; C.blank(S(4, d, 10)); });

// =============================================================== Numerical
Q('n01', mk.num({ stem: 'A courier service in Hyderabad charges ₹45 for the first kilogram and ₹18 for each additional kilogram. The charges for 1 kg, 2 kg, 3 kg, … form an AP. Find the charge (in ₹) for a 12 kg parcel.', value: 243, unit: '₹', marks: 2, sol: r`**Step 1.** $a = 45$, $d = 18$, and a $12$ kg parcel is the $12$th term. **Step 2.** $a_{12} = 45 + 11 \times 18 = 45 + 198 = 243$. The charge is ₹$243$.`, scheme: [['a = 45, d = 18 and a₁₂ = a + 11d', 1], ['₹243', 1]], d: 2, c: 'application', t: [2, 4], time: 120 }), (C) => { C.val(T(45, 18, 12)); C.sol([198]); });
Q('n02', mk.num({ stem: 'Which term of the AP $121, 117, 113, \\ldots$ is its first negative term?', value: 32, marks: 2, sol: r`**Step 1.** $a_n = 121 - 4(n - 1) < 0 \Rightarrow n - 1 > 30.25 \Rightarrow n > 31.25$. **Step 2.** The least whole number is $n = 32$. **Check:** $a_{31} = 121 - 120 = 1$ and $a_{32} = 121 - 124 = -3$.`, scheme: [['Inequality a + (n − 1)d < 0', 1], ['n = 32', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const n = firstN((k) => T(121, -4, k) < 0); C.val(n); C.assert(T(121, -4, 31) === 1 && T(121, -4, 32) === -3, 'neighbours'); C.sol([30.25, 31.25, 1, -3]); });
Q('n03', mk.num({ stem: 'How many two-digit numbers leave a remainder of 1 when divided by 4?', value: 22, sol: r`They are $13, 17, 21, \ldots, 97$: $a = 13$, $d = 4$, $l = 97$. $97 = 13 + (n - 1)4 \Rightarrow n - 1 = 21 \Rightarrow n = 22$.`, scheme: [['22', 1]], d: 2, c: 'application', t: [2], time: 90 }), (C) => { const brute = Array.from({ length: 90 }, (_, k) => k + 10).filter((x) => x % 4 === 1).length; C.val(brute); C.sol([13, 97, 21]); });
Q('n04', mk.num({ stem: 'Find the sum of the first 16 terms of the AP whose $n$th term is $a_n = 5n - 3$.', value: 632, marks: 2, sol: r`**Step 1.** $a_1 = 2$ and $a_{16} = 80 - 3 = 77$. **Step 2.** $S_{16} = \dfrac{16}{2}(2 + 77) = 8 \times 79 = 632$.`, scheme: [['a₁ = 2 and a₁₆ = 77', 1], ['S₁₆ = 632', 1]], d: 2, c: 'understanding', t: [2, 3], time: 120 }), (C) => { const terms = Array.from({ length: 16 }, (_, k) => 5 * (k + 1) - 3); C.val(terms.reduce((s, x) => s + x, 0)); C.sol([2, 77, 79]); });
Q('n05', mk.num({ stem: 'Find the sum $6 + 9.5 + 13 + \\cdots + 76$.', value: 861, marks: 2, sol: r`**Step 1.** $a = 6$, $d = 3.5$, $l = 76$: $76 = 6 + (n - 1)(3.5) \Rightarrow n - 1 = 20 \Rightarrow n = 21$. **Step 2.** $S = \dfrac{21}{2}(6 + 76) = \dfrac{21}{2} \times 82 = 861$.`, scheme: [['n = 21', 1], ['861', 1]], d: 2, c: 'understanding', t: [3], time: 150 }), (C) => { const n = firstN((k) => near(T(6, 3.5, k), 76)); C.val(S(6, 3.5, n)); C.sol([21, 82]); });
Q('n06', mk.num({ stem: 'How many terms of the AP $3, 7, 11, \\ldots$ must be added to get a sum of 406?', value: 14, marks: 2, sol: r`**Step 1.** $S_n = \dfrac{n}{2}[6 + 4(n - 1)] = n(2n + 1) = 406 \Rightarrow 2n^2 + n - 406 = 0$. **Step 2.** $b^2 - 4ac = 1 + 3248 = 3249 = 57^2$, so $n = \dfrac{-1 + 57}{4} = 14$ (the other root, $-14.5$, is not a natural number). **Check:** $14 \times 29 = 406$.`, scheme: [['2n² + n − 406 = 0', 1], ['n = 14 with rejection', 1]], d: 4, c: 'application', t: [3], time: 180 }), (C) => { C.val(firstN((k) => S(3, 4, k) === 406)); C.sol([3249, 57, 14.5, 29]); });
Q('n07', mk.num({ stem: 'A student in Bhubaneswar practises the sitar for 20 minutes on day 1 and adds 5 minutes every day. Find her total practice time, in hours, over the first two weeks.', value: 12.25, unit: 'h', marks: 2, sol: r`**Step 1.** $a = 20$, $d = 5$, $n = 14$: $S_{14} = 7[40 + 13 \times 5] = 7 \times 105 = 735$ minutes. **Step 2.** $735 \div 60 = 12.25$ hours.`, scheme: [['S₁₄ = 735 minutes', 1], ['12.25 h', 1]], d: 3, c: 'application', t: [3, 4], time: 150 }), (C) => { C.val(S(20, 5, 14) / 60); C.sol([735, 105]); });
Q('n08', mk.num({ stem: 'A dairy in Anand collects 1240 litres of milk on day 1, and its daily collection rises by 35 litres every day. On which day does the collection first exceed 2000 litres?', value: 23, marks: 2, sol: r`**Step 1.** $1240 + 35(n - 1) > 2000 \Rightarrow 35(n - 1) > 760 \Rightarrow n - 1 > 21.7$ (about). **Step 2.** So $n - 1 = 22$, $n = 23$. **Check:** day $22$: $1240 + 735 = 1975$; day $23$: $1240 + 770 = 2010$.`, scheme: [['Inequality 35(n − 1) > 760', 1], ['Day 23', 1]], d: 3, c: 'application', t: [2, 4], time: 150 }), (C) => { const n = firstN((k) => T(1240, 35, k) > 2000); C.val(n); C.assert(T(1240, 35, 22) === 1975 && T(1240, 35, 23) === 2010, 'neighbours'); C.sol([760, 1975, 2010]); });
Q('n09', mk.num({ stem: 'Find the sum of the first 40 positive even numbers.', value: 1640, sol: r`$2, 4, 6, \ldots, 80$: $S_{40} = \dfrac{40}{2}(2 + 80) = 20 \times 82 = 1640$.`, scheme: [['1640', 1]], d: 1, c: 'understanding', t: [3], time: 60 }), (C) => C.val(S(2, 2, 40)));

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Is $-10, -6, -2, 2, \\ldots$ an AP? If it is, write its next three terms.', model: r`Differences: $-6 - (-10) = 4$, $-2 - (-6) = 4$, $2 - (-2) = 4$. They are equal, so it is an AP with $d = 4$.

Next three terms: $6, 10, 14$.`, sol: 'Check every given difference, not just the first one.', scheme: [['Common difference 4 shown for all pairs', 1], ['6, 10, 14', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(isAP([-10, -6, -2, 2]), 'AP'); C.model([4, 6, 10, 14]); });
Q('s202', mk.short({ marks: 2, stem: 'The 9th term of an AP is 47 and its 15th term is 77. Find its 25th term.', model: r`$a + 8d = 47$ and $a + 14d = 77$. Subtracting, $6d = 30$, so $d = 5$ and $a = 47 - 40 = 7$.

$a_{25} = 7 + 24 \times 5 = 127$.`, sol: r`**Check:** $7 + 70 = 77$ for the $15$th term.`, scheme: [['a = 7, d = 5', 1], ['a₂₅ = 127', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => { const d = (77 - 47) / 6, a = 47 - 8 * d; C.assert(T(a, d, 15) === 77, 'a15'); C.model([a, d, T(a, d, 25)]); });
Q('s203', mk.short({ marks: 2, stem: 'In an AP, the 5th term is 19, and the 8th term exceeds the 13th term by 20. Find the first three terms.', model: r`$a_8 - a_{13} = (a + 7d) - (a + 12d) = -5d = 20$, so $d = -4$.

$a + 4d = 19 \Rightarrow a = 19 + 16 = 35$. The AP is $35, 31, 27, \ldots$`, sol: r`**Check:** $a_8 = 35 - 28 = 7$, $a_{13} = 35 - 48 = -13$, and $7 - (-13) = 20$.`, scheme: [['d = −4', 1], ['35, 31, 27', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const d = -4, a = 35; C.assert(T(a, d, 5) === 19 && T(a, d, 8) - T(a, d, 13) === 20, 'conditions'); C.model([35, 31, 27]); C.sol([7, -13]); });
Q('s204', mk.short({ marks: 2, stem: 'For what value of $n$ are the $n$th terms of the APs $50, 53, 56, \\ldots$ and $8, 14, 20, \\ldots$ equal? Find that common term.', model: r`$50 + 3(n - 1) = 8 + 6(n - 1) \Rightarrow 42 = 3(n - 1) \Rightarrow n - 1 = 14 \Rightarrow n = 15$.

The common term is $50 + 42 = 92$ (and $8 + 84 = 92$).`, sol: 'Equate the two general terms.', scheme: [['Equation and n = 15', 1], ['Common term 92', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => { const n = firstN((k) => T(50, 3, k) === T(8, 6, k)); C.assert(n === 15, 'n'); C.model([15, T(50, 3, n), 84]); });
Q('s205', mk.short({ marks: 2, stem: 'Find the middle term of the AP $6, 13, 20, \\ldots, 216$.', model: r`$216 = 6 + (n - 1)7 \Rightarrow n - 1 = 30 \Rightarrow n = 31$, an odd number, so the middle term is the $16$th.

$a_{16} = 6 + 15 \times 7 = 111$.`, sol: r`With $31$ terms, $15$ come before the middle term and $15$ after it. (Also: $\dfrac{6 + 216}{2} = 111$.)`, scheme: [['n = 31', 1], ['Middle (16th) term 111', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const n = firstN((k) => T(6, 7, k) === 216); C.assert(n % 2 === 1, 'odd count'); C.model([31, 16, T(6, 7, (n + 1) / 2)]); });
Q('s206', mk.short({ marks: 2, stem: 'Find the sum of the first 22 terms of the AP $8, 3, -2, \\ldots$', model: r`$a = 8$, $d = -5$. $S_{22} = \dfrac{22}{2}[16 + 21(-5)] = 11(16 - 105) = 11 \times (-89) = -979$.`, sol: 'The terms become negative from the 3rd term, so a negative sum is reasonable.', scheme: [['Substitution in Sₙ', 1], ['−979', 1]], d: 2, c: 'understanding', t: [3], time: 120 }), (C) => { C.assert(S(8, -5, 22) === -979, 'S22'); C.model([105, 89, -979]); });
Q('s207', mk.short({ marks: 2, stem: 'The sum of the first $n$ terms of an AP is $S_n = 3n^2 - n$. Find the AP and its 12th term.', model: r`$a_1 = S_1 = 2$ and $S_2 = 12 - 2 = 10$, so $a_2 = 10 - 2 = 8$ and $d = 6$. The AP is $2, 8, 14, \ldots$

$a_{12} = 2 + 11 \times 6 = 68$.`, sol: r`**Check:** $a_{12} = S_{12} - S_{11} = 420 - 352 = 68$.`, scheme: [['a = 2, d = 6', 1], ['a₁₂ = 68', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { const Sn = (n) => 3 * n * n - n; C.assert(Sn(12) - Sn(11) === 68 && T(2, 6, 12) === 68 && Sn(2) - Sn(1) === 8, 'AP'); C.model([2, 8, 14, 68]); C.sol([420, 352]); });
Q('s208', mk.short({ marks: 2, stem: 'Shalini in Pune puts ₹50 in a piggy bank on day 1, ₹60 on day 2, ₹70 on day 3, and so on. How much has she saved at the end of 20 days?', model: r`$a = 50$, $d = 10$, $n = 20$. $S_{20} = \dfrac{20}{2}[100 + 19 \times 10] = 10 \times 290 = 2900$.

She has saved ₹$2900$.`, sol: r`On day $20$ she puts in $50 + 190 = $ ₹$240$; check: $10(50 + 240) = 2900$.`, scheme: [['a = 50, d = 10, n = 20 in Sₙ', 1], ['₹2900', 1]], d: 2, c: 'application', t: [3, 4], time: 120 }), (C) => { C.assert(S(50, 10, 20) === 2900 && T(50, 10, 20) === 240, 'savings'); C.model([290, 2900]); });
Q('s209', mk.short({ marks: 2, stem: 'Rahul writes: "The sum of the first 12 terms of $4, 9, 14, \\ldots$ is $\\dfrac{12}{2}[4 + 11 \\times 5] = 354$." Find his mistake and give the correct sum.', model: r`The formula is $S_n = \dfrac{n}{2}[2a + (n - 1)d]$: he wrote $a$ where $2a$ is needed.

Correct: $S_{12} = 6[8 + 55] = 6 \times 63 = 378$.`, sol: r`**Check** with $l$: $a_{12} = 4 + 55 = 59$, and $6(4 + 59) = 378$.`, scheme: [['Identifies a used instead of 2a', 1], ['378', 1]], d: 2, c: 'evaluation', t: [3], time: 120 }), (C) => { C.assert(S(4, 5, 12) === 378 && 6 * (4 + 55) === 354, 'his value'); C.model([2, 63, 378]); C.sol([59]); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: 'The 7th term of an AP is 0. Prove that (a) $a_2 + a_{12} = 0$ and (b) the sum of its first 13 terms is 0.', model: r`$a_7 = a + 6d = 0$, so $a = -6d$.

(a) $a_2 + a_{12} = (a + d) + (a + 11d) = 2a + 12d = 2(a + 6d) = 0$.

(b) $S_{13} = \dfrac{13}{2}(a_1 + a_{13}) = \dfrac{13}{2}(2a + 12d) = 13(a + 6d) = 0$.`, sol: r`Terms equally far before and after the $7$th term are negatives of each other, e.g. for $d = 2$: $-12, -10, \ldots, 0, \ldots, 10, 12$.`, scheme: [['a = −6d (or a + 6d = 0)', 1], ['(a) shown', 1], ['(b) S₁₃ = 13(a + 6d) = 0', 1]], d: 4, c: 'analysis', t: [2, 3], time: 240 }), (C) => { for (const d of [2, -3, 0.5]) { const a = -6 * d; C.assert(near(T(a, d, 7), 0) && near(T(a, d, 2) + T(a, d, 12), 0) && near(S(a, d, 13), 0), `d = ${d}`); } C.model(['a = -6d', '2a + 12d']); });
Q('s302', mk.short({ marks: 3, stem: 'How many three-digit numbers leave a remainder of 3 when divided by 8? Find their sum.', model: r`They are $107, 115, \ldots, 995$ (since $107 = 8 \times 13 + 3$ and $995 = 8 \times 124 + 3$): an AP with $a = 107$, $d = 8$.

$995 = 107 + (n - 1)8 \Rightarrow n - 1 = 111 \Rightarrow n = 112$.

Sum $= \dfrac{112}{2}(107 + 995) = 56 \times 1102 = 61712$.`, sol: r`The smallest three-digit number of the form $8k + 3$ is $107$ ($99 = 8 \times 12 + 3$ has only two digits).`, scheme: [['First and last terms 107, 995', 1], ['n = 112', 1], ['Sum 61712', 1]], d: 3, c: 'application', t: [2, 3], time: 240 }), (C) => { const xs = Array.from({ length: 900 }, (_, k) => k + 100).filter((x) => x % 8 === 3); C.assert(xs[0] === 107 && xs.at(-1) === 995, 'ends'); C.model([xs.length, xs.reduce((s, x) => s + x, 0), 1102]); });
Q('s303', mk.short({ marks: 3, stem: 'The first and last terms of an AP are 11 and 263, and its common difference is 6. How many terms are there, and what is their sum?', model: r`$263 = 11 + (n - 1)6 \Rightarrow (n - 1)6 = 252 \Rightarrow n - 1 = 42 \Rightarrow n = 43$.

$S_{43} = \dfrac{43}{2}(11 + 263) = \dfrac{43}{2} \times 274 = 43 \times 137 = 5891$.`, sol: 'Use the last-term form of the sum once n is known.', scheme: [['(n − 1)6 = 252', 1], ['n = 43', 1], ['Sum 5891', 1]], d: 2, c: 'understanding', t: [2, 3], time: 240 }), (C) => { const n = firstN((k) => T(11, 6, k) === 263); C.assert(n === 43, 'n'); C.model([252, 43, 137, S(11, 6, n)]); });
Q('s304', mk.short({ marks: 3, stem: 'Find the sum of all three-digit natural numbers that end in the digit 7.', model: r`They are $107, 117, 127, \ldots, 997$: an AP with $a = 107$, $d = 10$.

$997 = 107 + (n - 1)10 \Rightarrow n - 1 = 89 \Rightarrow n = 90$.

Sum $= \dfrac{90}{2}(107 + 997) = 45 \times 1104 = 49680$.`, sol: r`There is one such number in each block of ten from $100$ to $999$: $90$ blocks, so $90$ numbers.`, scheme: [['AP with a = 107, d = 10, l = 997', 1], ['n = 90', 1], ['Sum 49680', 1]], d: 3, c: 'application', t: [2, 3], time: 240 }), (C) => { const xs = Array.from({ length: 900 }, (_, k) => k + 100).filter((x) => x % 10 === 7); C.model([xs.length, xs.reduce((s, x) => s + x, 0), 1104]); });
Q('s305', mk.short({ marks: 3, stem: 'Solve for $x$: $2 + 7 + 12 + \\cdots + x = 245$.', model: r`$a = 2$, $d = 5$. With $n$ terms, $S_n = \dfrac{n}{2}[4 + 5(n - 1)] = \dfrac{n(5n - 1)}{2} = 245$, so $5n^2 - n - 490 = 0$.

$b^2 - 4ac = 1 + 9800 = 9801 = 99^2$, so $n = \dfrac{1 + 99}{10} = 10$ (the negative root is rejected).

$x = a_{10} = 2 + 9 \times 5 = 47$.`, sol: r`**Check:** $\dfrac{10}{2}(2 + 47) = 245$.`, scheme: [['5n² − n − 490 = 0', 1], ['n = 10', 1], ['x = 47', 1]], d: 4, c: 'application', t: [3], time: 300 }), (C) => { const n = firstN((k) => S(2, 5, k) === 245); C.assert(n === 10, 'n'); C.model([490, 9801, 99, 10, T(2, 5, n)]); });
Q('s306', mk.short({ marks: 3, stem: 'A stand in a Kolkata stadium has 30 rows. The front row has 40 seats, and each row has 2 seats more than the row in front of it. How many seats are there in the last row, and in the whole stand?', model: r`$a = 40$, $d = 2$, $n = 30$.

Last row: $a_{30} = 40 + 29 \times 2 = 98$ seats.

Whole stand: $S_{30} = \dfrac{30}{2}(40 + 98) = 15 \times 138 = 2070$ seats.`, sol: 'Find the last term first, then use the (a + l) form.', scheme: [['a = 40, d = 2, n = 30', 1], ['Last row 98', 1], ['Total 2070', 1]], d: 2, c: 'application', t: [2, 3, 4], time: 240 }), (C) => { C.model([T(40, 2, 30), 138, S(40, 2, 30)]); });
Q('s307', mk.short({ marks: 3, stem: 'Meena deposits ₹8000 in a bank in Surat at 9% simple interest per year. (a) Show that the amounts in her account at the end of years 1, 2, 3, … form an AP. (b) Find the amount at the end of 15 years.', model: r`(a) Interest each year $= \dfrac{8000 \times 9}{100} = 720$. Amounts: $8720, 9440, 10160, \ldots$ Each year adds the same ₹$720$, so the amounts form an AP with $a = 8720$, $d = 720$.

(b) $a_{15} = 8720 + 14 \times 720 = 8720 + 10080 = 18800$. The amount is ₹$18800$.`, sol: r`**Check:** simple interest for $15$ years is $15 \times 720 = 10800$, and $8000 + 10800 = 18800$. (With compound interest the amounts would **not** form an AP.)`, scheme: [['Yearly interest ₹720', 1], ['AP with a = 8720, d = 720', 1], ['₹18800', 1]], d: 3, c: 'evaluation', t: [1, 2, 4], time: 240 }), (C) => { const amt = (n) => 8000 + n * 720; C.assert(isAP([1, 2, 3, 4].map(amt)) && amt(15) === T(8720, 720, 15), 'amounts'); C.model([720, 8720, 10080, amt(15)]); C.sol([10800]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: `In an AP, the sum of the 3rd and 9th terms is 34, and the 12th term is 47.

(a) Find the first term and the common difference.
(b) Find the sum of the first 20 terms.
(c) Is 100 a term of this AP? Which term is 97?`, model: r`(a) $a_3 + a_9 = 2a + 10d = 34$, so $a + 5d = 17$. Also $a + 11d = 47$. Subtracting, $6d = 30$: $d = 5$ and $a = 17 - 25 = -8$. The AP is $-8, -3, 2, 7, \ldots$

(b) $S_{20} = \dfrac{20}{2}[2(-8) + 19 \times 5] = 10(-16 + 95) = 10 \times 79 = 790$.

(c) $-8 + 5(n - 1) = 100 \Rightarrow n - 1 = 21.6$, not a whole number, so $100$ is not a term. $-8 + 5(n - 1) = 97 \Rightarrow n - 1 = 21 \Rightarrow n = 22$: $97$ is the $22$nd term.`, sol: r`**Check (a):** $a_3 = 2$, $a_9 = 32$, sum $34$; $a_{12} = -8 + 55 = 47$.`, scheme: [['a + 5d = 17 and a + 11d = 47', 1], ['a = −8, d = 5', 1], ['S₂₀ = 790', 1], ['100 not a term (n − 1 not whole)', 1], ['97 is the 22nd term', 1]], d: 3, c: 'application', t: [2, 3], time: 600 }), (C) => { const a = -8, d = 5; C.assert(T(a, d, 3) + T(a, d, 9) === 34 && T(a, d, 12) === 47, 'conditions'); C.assert(!seq(a, d, 40).includes(100), '100 not a term'); C.model([a, d, S(a, d, 20), 79, 21.6, firstN((n) => T(a, d, n) === 97)]); C.sol([2, 32]); });
Q('l02', mk.long({ stem: `The sum of the first 9 terms of an AP is 171, and the sum of its first 24 terms is 996.

(a) Find the first term and the common difference.
(b) Find its $n$th term.
(c) Find the sum of its first $n$ terms.`, model: r`(a) $S_9 = \dfrac92(2a + 8d) = 9(a + 4d) = 171$, so $a + 4d = 19$.

$S_{24} = 12(2a + 23d) = 996$, so $2a + 23d = 83$.

Substituting $a = 19 - 4d$: $38 - 8d + 23d = 83 \Rightarrow 15d = 45 \Rightarrow d = 3$, and $a = 19 - 12 = 7$.

(b) $a_n = 7 + (n - 1)3 = 3n + 4$.

(c) $S_n = \dfrac{n}{2}[14 + 3(n - 1)] = \dfrac{n(3n + 11)}{2}$.`, sol: r`**Check:** $S_9 = \dfrac{9 \times 38}{2} = 171$ and $S_{24} = \dfrac{24 \times 83}{2} = 996$.`, scheme: [['a + 4d = 19', 1], ['2a + 23d = 83', 1], ['d = 3, a = 7', 1], ['aₙ = 3n + 4', 1], ['Sₙ = n(3n + 11)/2', 1]], d: 4, c: 'application', t: [2, 3], time: 660 }), (C) => { C.assert(S(7, 3, 9) === 171 && S(7, 3, 24) === 996, 'sums'); C.assert([1, 5, 9, 30].every((n) => T(7, 3, n) === 3 * n + 4 && S(7, 3, n) === (n * (3 * n + 11)) / 2), 'general forms'); C.model([19, 83, 45, 3, 7, '3n + 4', '3n + 11']); C.sol([38]); });
Q('l03', mk.long({ stem: `Arjun, a carpenter in Lucknow, saves ₹500 in the first month and increases his saving by ₹150 every month.

(a) How much does he save in the 12th month?
(b) How much does he save in the whole first year?
(c) After how many months will his total savings be ₹20,650?`, model: r`$a = 500$, $d = 150$.

(a) $a_{12} = 500 + 11 \times 150 = 2150$: ₹$2150$.

(b) $S_{12} = \dfrac{12}{2}(500 + 2150) = 6 \times 2650 = 15900$: ₹$15900$.

(c) $\dfrac{n}{2}[1000 + 150(n - 1)] = 20650 \Rightarrow n(850 + 150n) = 41300 \Rightarrow 3n^2 + 17n - 826 = 0$.

$b^2 - 4ac = 289 + 9912 = 10201 = 101^2$, so $n = \dfrac{-17 + 101}{6} = 14$ (the negative root is rejected). After $14$ months.`, sol: r`**Check (c):** $S_{14} = 7[1000 + 13 \times 150] = 7 \times 2950 = 20650$.`, scheme: [['a₁₂ = ₹2150', 1], ['S₁₂ = ₹15900', 1], ['Equation 3n² + 17n − 826 = 0', 1], ['Discriminant 10201 and roots', 1], ['14 months with rejection', 1]], d: 4, c: 'application', t: [2, 3, 4], time: 660 }), (C) => { C.assert(S(500, 150, 14) === 20650, 'S14'); C.model([T(500, 150, 12), S(500, 150, 12), 826, 10201, 101, firstN((n) => S(500, 150, n) === 20650)]); C.sol([2950]); });
Q('l04', mk.long({ stem: `Ramesh claims: "If the sum of the first $n$ terms of a list of numbers is $S_n = 2n^2 + 3n + 1$, then the list is an AP."

(a) Find the first three numbers of the list.
(b) Is Ramesh right? Justify.
(c) Show that from the second number onwards the list is an AP, and find its 20th number.
(d) For $S_n = pn^2 + qn + r$, state the condition under which the whole list is an AP.`, model: r`(a) $S_1 = 6$, $S_2 = 15$, $S_3 = 28$. So $a_1 = 6$, $a_2 = 15 - 6 = 9$, $a_3 = 28 - 15 = 13$.

(b) $a_2 - a_1 = 3$ but $a_3 - a_2 = 4$: the differences are not equal, so the list is **not** an AP. Ramesh is wrong.

(c) For $n \ge 2$: $a_n = S_n - S_{n-1} = (2n^2 + 3n + 1) - (2(n - 1)^2 + 3(n - 1) + 1) = 4n + 1$. This rises by $4$ each time, so $a_2, a_3, \ldots$ is an AP with $d = 4$. $a_{20} = 81$.

(d) For $n \ge 2$, $a_n = 2pn + q - p$, and the first number is $a_1 = p + q + r$. The whole list is an AP only if $a_1$ also fits the formula, i.e. $p + q + r = 2p + q - p$, which means $r = 0$.`, sol: r`The constant $1$ in $S_n$ is added only once, to the first number, which spoils the pattern. ($4 \times 20 + 1 = 81$.)`, scheme: [['a₁ = 6, a₂ = 9, a₃ = 13', 1], ['Not an AP: differences 3 and 4', 1], ['aₙ = 4n + 1 for n ≥ 2', 1], ['a₂₀ = 81', 1], ['Condition r = 0 with reason', 1]], d: 5, c: 'evaluation', t: [1, 3], time: 720 }), (C) => { const Sn = (n) => 2 * n * n + 3 * n + 1; const an = (n) => (n === 1 ? Sn(1) : Sn(n) - Sn(n - 1)); C.assert(!isAP([1, 2, 3].map(an)) && isAP([2, 3, 4, 5, 6].map(an)) && an(20) === 81, 'list'); for (const [p, q, rr] of [[1, 2, 0], [3, -1, 0], [2, 1, 5]]) { const s = (n) => p * n * n + q * n + rr; const b = (n) => (n === 1 ? s(1) : s(n) - s(n - 1)); C.assert(isAP([1, 2, 3, 4].map(b)) === (rr === 0), `r = ${rr}`); } C.model([6, 9, 13, '4n + 1', 81, 'r = 0']); });
Q('l05', mk.long({ stem: `A mason in Jaisalmer builds a stepped wall of stone blocks. The bottom row has 60 blocks, and each row has 3 blocks fewer than the row below it. The top row has 3 blocks.

(a) How many rows does the wall have?
(b) How many blocks does it use in all?
(c) If only 400 blocks were available, how many complete rows could be built, starting from the bottom, and how many blocks would be left over?`, model: r`$a = 60$, $d = -3$.

(a) $3 = 60 + (n - 1)(-3) \Rightarrow n - 1 = 19 \Rightarrow n = 20$ rows.

(b) $S_{20} = \dfrac{20}{2}(60 + 3) = 630$ blocks.

(c) $S_n = \dfrac{n}{2}[120 - 3(n - 1)] = \dfrac{n(123 - 3n)}{2}$.

$S_8 = 4 \times 99 = 396 \le 400$, but $S_9 = \dfrac{9 \times 96}{2} = 432 > 400$.

So $8$ complete rows can be built, using $396$ blocks, with $4$ blocks left over.`, sol: r`In (c), solving $\dfrac{n(123 - 3n)}{2} = 400$ gives no whole-number $n$, so compare consecutive sums instead.`, scheme: [['n = 20 rows', 1], ['630 blocks', 1], ['Expression for Sₙ', 1], ['S₈ = 396 and S₉ = 432 compared', 1], ['8 rows, 4 left over', 1]], d: 4, c: 'analysis', t: [2, 3, 4], time: 660 }), (C) => { const n = firstN((k) => T(60, -3, k) === 3); const rows = firstN((k) => S(60, -3, k + 1) > 400); C.assert(n === 20 && S(60, -3, n) === 630 && rows === 8, 'wall'); C.model([20, 630, S(60, -3, 8), S(60, -3, 9), 400 - S(60, -3, 8)]); });
Q('l06', mk.long({ stem: `Two taxi services in Chandigarh charge as follows. Service P: ₹60 for the first kilometre and ₹15 for each further kilometre. Service Q: ₹30 for the first kilometre and ₹18 for each further kilometre.

(a) Show that the fares for 1 km, 2 km, 3 km, … of each service form an AP, and write the fare for $n$ km for each.
(b) For what distance are the two fares equal? What is that fare?
(c) Which service is cheaper for a 15 km trip, and by how much?`, model: r`(a) P: $60, 75, 90, \ldots$ ($d = 15$), Q: $30, 48, 66, \ldots$ ($d = 18$). Each fare is the previous one plus a fixed amount, so each list is an AP.

P: $a_n = 60 + (n - 1)15 = 15n + 45$. Q: $b_n = 30 + (n - 1)18 = 18n + 12$.

(b) $15n + 45 = 18n + 12 \Rightarrow 3n = 33 \Rightarrow n = 11$. Both fares are ₹$210$ for $11$ km.

(c) $a_{15} = 270$ and $b_{15} = 282$. Service P is cheaper by ₹$12$.`, sol: r`Q starts cheaper but rises faster, so beyond $11$ km P is cheaper.`, scheme: [['Both lists shown to be APs', 1], ['aₙ = 15n + 45 and bₙ = 18n + 12', 1], ['n = 11 km', 1], ['Fare ₹210', 1], ['15 km: P cheaper by ₹12', 1]], d: 3, c: 'application', t: [1, 2, 4], time: 600 }), (C) => { const n = firstN((k) => T(60, 15, k) === T(30, 18, k)); C.assert(n === 11, 'n'); C.model([T(60, 15, n), T(60, 15, 15), T(30, 18, 15), 12, '15n + 45', '18n + 12']); });

// =============================================================== Case-based
caseQ('c01', {
  passage: 'During Uttarayan in Ahmedabad, a kite shop sells 120 kites on the first day of the season, and every day it sells 15 kites more than on the day before.',
  d: 3, c: 'application',
  model: r`(a) Option (a): $255$. (b) Day $16$. (c) (i) $1875$ kites. Or (ii) $a_n = 105 + 15n$; days $11$ to $20$: $5250 - 1875 = 3375$ kites.`,
  sol: r`$a = 120$, $d = 15$. (a) $a_{10} = 120 + 135 = 255$. (b) $120 + 15(n - 1) = 345 \Rightarrow n = 16$. (c) (i) $S_{10} = 5(240 + 135) = 1875$. (ii) $S_{20} = 10(240 + 285) = 5250$.`,
  children: [
    child('a', mk.mcq({ stem: 'How many kites does the shop sell on day 10?', opts: ['$255$', '$270$', '$240$', '$135$'], key: 'a', sol: r`$a_{10} = 120 + 9 \times 15 = 255$. Option (b) uses $10d$; option (d) is only the increase $9d$.`, d: 1, c: 'understanding', t: [2], time: 60 })),
    child('b', mk.num({ stem: 'On which day does the shop sell 345 kites?', value: 16, sol: r`$120 + 15(n - 1) = 345 \Rightarrow 15(n - 1) = 225 \Rightarrow n = 16$.`, scheme: [['Day 16', 1]], d: 2, c: 'application', t: [2, 4], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** How many kites does the shop sell in the first 10 days altogether?', model: r`$S_{10} = \dfrac{10}{2}[240 + 9 \times 15] = 5 \times 375 = 1875$ kites.`, sol: 'Use the sum formula with n = 10.', scheme: [['Substitution', 1], ['1875', 1]], d: 2, c: 'application', t: [3, 4], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Show that the number of kites sold on day $n$ is $105 + 15n$, and find how many kites are sold from day 11 to day 20.', model: r`$a_n = 120 + (n - 1)15 = 105 + 15n$.

Days $11$ to $20$: $S_{20} - S_{10} = \dfrac{20}{2}(240 + 285) - 1875 = 5250 - 1875 = 3375$ kites.`, sol: 'Subtract the first ten days from the first twenty.', scheme: [['aₙ = 105 + 15n', 1], ['3375', 1]], d: 3, c: 'analysis', t: [2, 3], time: 150 }),
    ]),
  ],
}, (C) => { C.child('a').which([255, 270, 240, 135], T(120, 15, 10)); C.child('b').val(firstN((n) => T(120, 15, n) === 345)); C.child('c').model([S(120, 15, 10)]); C.child('cii').assert([1, 7, 20].every((n) => T(120, 15, n) === 105 + 15 * n), 'general term'); C.child('cii').model([S(120, 15, 20), S(120, 15, 20) - S(120, 15, 10)]); });

caseQ('c02', {
  passage: 'Sneha is training for a half marathon in Kochi. She runs 2 km on day 1 and increases her distance by 0.5 km every day. The graph shows her distance for the first five days.',
  assets: [qRun], d: 3, c: 'application',
  model: r`(a) Option (c): $0.5$ km. (b) $9$ km. (c) (i) $82.5$ km. Or (ii) Day $21$; total $147$ km.`,
  sol: r`$a = 2$, $d = 0.5$. (b) $a_{15} = 2 + 14 \times 0.5 = 9$. (c) (i) $S_{15} = \dfrac{15}{2}(2 + 9) = 82.5$. (ii) $2 + 0.5(n - 1) = 12 \Rightarrow n = 21$; $S_{21} = \dfrac{21}{2}(2 + 12) = 147$.`,
  children: [
    child('a', mk.mcq({ stem: 'The common difference of the AP of her daily distances is', opts: ['$2$ km', '$2.5$ km', '$0.5$ km', '$1$ km'], key: 'c', sol: r`From the graph, each day is $0.5$ km more than the day before: $2.5 - 2 = 0.5$.`, d: 1, c: 'understanding', t: [1], time: 45 })),
    child('b', mk.num({ stem: 'How far does she run on day 15 (in km)?', value: 9, unit: 'km', sol: r`$a_{15} = 2 + 14 \times 0.5 = 2 + 7 = 9$ km.`, scheme: [['9 km', 1]], d: 2, c: 'application', t: [2], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the total distance she runs in the first 15 days.', model: r`$S_{15} = \dfrac{15}{2}(a + a_{15}) = \dfrac{15}{2}(2 + 9) = \dfrac{15 \times 11}{2} = 82.5$ km.`, sol: 'Use the (a + l) form with l = 9.', scheme: [['Substitution', 1], ['82.5 km', 1]], d: 2, c: 'application', t: [3, 4], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** On which day does she run 12 km, and what is her total distance up to and including that day?', model: r`$2 + 0.5(n - 1) = 12 \Rightarrow 0.5(n - 1) = 10 \Rightarrow n = 21$.

Total $= \dfrac{21}{2}(2 + 12) = 21 \times 7 = 147$ km.`, sol: 'Find n first, then the sum.', scheme: [['Day 21', 1], ['147 km', 1]], d: 3, c: 'application', t: [2, 3], time: 150 }),
    ]),
  ],
}, (C) => { C.child('a').which([2, 2.5, 0.5, 1], 2.5 - 2); C.child('b').val(T(2, 0.5, 15)); C.child('c').model([S(2, 0.5, 15)]); const n = firstN((k) => T(2, 0.5, k) === 12); C.child('cii').model([n, S(2, 0.5, n)]); });

caseQ('c03', {
  passage: 'At a railway station in Nagpur, local trains to Wardha leave every 12 minutes. The first train of the day leaves at 5:40 am, the second at 5:52 am, the third at 6:04 am, and so on. Their departure times, in minutes after midnight, form an AP.',
  d: 3, c: 'application',
  model: r`(a) Option (b): $340, 352, 364, \ldots$ (b) $7{:}28$ am. (c) (i) $17$ trains. Or (ii) $89$ trains.`,
  sol: r`$5{:}40$ am is $340$ minutes after midnight, so $a = 340$, $d = 12$. (b) $a_{10} = 340 + 108 = 448$ minutes $= 7$ h $28$ min. (c) (i) $9{:}00$ am is $540$ minutes: $340 + 12(n - 1) < 540 \Rightarrow n - 1 < 16.7$, so $n - 1 \le 16$ and $n \le 17$ (the $17$th train leaves at $8{:}52$ am). (ii) $11{:}16$ pm is $1396$ minutes: $340 + 12(n - 1) = 1396 \Rightarrow n - 1 = 88 \Rightarrow n = 89$.`,
  children: [
    child('a', mk.mcq({ stem: 'The departure times, in minutes after midnight, are', opts: ['$540, 552, 564, \\ldots$', '$340, 352, 364, \\ldots$', '$340, 352, 366, \\ldots$', '$5.40, 5.52, 6.04, \\ldots$'], key: 'b', sol: r`$5$ h $40$ min $= 5 \times 60 + 40 = 340$ minutes, and each train is $12$ minutes later. Option (d) treats clock times as decimals, which do not form an AP ($6.04 - 5.52 \ne 5.52 - 5.40$).`, d: 2, c: 'understanding', t: [1], time: 75 })),
    child('b', mk.fill({ stem: 'The 10th train leaves at ___ am.', acc: [['7:28', '7.28', '7:28 am', '07:28']], sol: r`$a_{10} = 340 + 9 \times 12 = 448$ minutes $= 7$ h $28$ min, i.e. $7{:}28$ am.`, d: 2, c: 'application', t: [2], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** How many trains leave before 9:00 am?', model: r`$9{:}00$ am is $540$ minutes after midnight. $340 + 12(n - 1) < 540 \Rightarrow 12(n - 1) < 200 \Rightarrow n - 1 < 16.7$ (about), so the largest $n$ is $17$.

$17$ trains leave before $9{:}00$ am (the last of them at $8{:}52$ am).`, sol: 'Count terms below a bound with an inequality.', scheme: [['Inequality 12(n − 1) < 200', 1], ['17 trains', 1]], d: 3, c: 'application', t: [2, 4], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** The last train of the day leaves at 11:16 pm. How many trains run in the day?', model: r`$11{:}16$ pm is $23 \times 60 + 16 = 1396$ minutes after midnight.

$340 + 12(n - 1) = 1396 \Rightarrow 12(n - 1) = 1056 \Rightarrow n - 1 = 88 \Rightarrow n = 89$ trains.`, sol: 'Convert to minutes, then find n.', scheme: [['1396 minutes and equation', 1], ['89 trains', 1]], d: 3, c: 'application', t: [2, 4], time: 150 }),
    ]),
  ],
}, (C) => { const times = seq(340, 12, 120); C.child('a').key('b'); C.child('b').assert(times[9] === 7 * 60 + 28, '7:28'); C.child('b').blank('7:28'); C.child('c').model([times.filter((t) => t < 540).length, 540]); C.child('c').assert(times[16] === 8 * 60 + 52, '8:52'); C.child('cii').model([1396, times.indexOf(23 * 60 + 16) + 1, 1056]); });

caseQ('c04', {
  passage: r`In a maths quiz in Shillong, the quizmaster announces: "The sum of the first $n$ terms of a certain AP is $S_n = 5n^2 - 3n$." Teams must find facts about the AP from this rule alone.`,
  d: 4, c: 'analysis',
  model: r`(a) Option (d): $2$. (b) $d = 10$. (c) (i) $a_n = 10n - 8$. Or (ii) $192$ is the $20$th term.`,
  sol: r`$S_1 = 2$, $S_2 = 14$, so $a_1 = 2$, $a_2 = 12$, $d = 10$. $a_n = S_n - S_{n-1} = 10n - 8$. $10n - 8 = 192 \Rightarrow n = 20$.`,
  children: [
    child('a', mk.mcq({ stem: 'The first term of the AP is', opts: ['$5$', '$14$', '$-3$', '$2$'], key: 'd', sol: r`$a_1 = S_1 = 5 - 3 = 2$. Option (b) is $S_2$.`, d: 1, c: 'understanding', t: [3], time: 45 })),
    child('b', mk.fill({ stem: 'The common difference of the AP is ___.', acc: [['10']], sol: r`$a_2 = S_2 - S_1 = 14 - 2 = 12$, so $d = 12 - 2 = 10$.`, d: 2, c: 'application', t: [3], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the $n$th term of the AP.', model: r`$a_n = a + (n - 1)d = 2 + 10(n - 1) = 10n - 8$.

(Or $a_n = S_n - S_{n-1} = (5n^2 - 3n) - (5(n - 1)^2 - 3(n - 1)) = 10n - 8$.)`, sol: 'Either method gives the same result.', scheme: [['Method', 1], ['aₙ = 10n − 8', 1]], d: 3, c: 'application', t: [2, 3], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** Which term of the AP is 192?', model: r`$a_n = 10n - 8 = 192 \Rightarrow 10n = 200 \Rightarrow n = 20$. So $192$ is the $20$th term.`, sol: r`**Check:** $S_{20} - S_{19} = 1940 - 1748 = 192$.`, scheme: [['10n − 8 = 192', 1], ['20th term', 1]], d: 3, c: 'application', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { const Sn = (n) => 5 * n * n - 3 * n; const an = (n) => Sn(n) - Sn(n - 1); C.child('a').which([5, 14, -3, 2], Sn(1)); C.child('b').blank(an(2) - an(1)); C.child('c').assert([1, 2, 7, 20].every((n) => an(n) === 10 * n - 8), 'an'); C.child('c').model(['10n - 8']); C.child('cii').model([firstN((n) => an(n) === 192)]); C.child('cii').sol([Sn(20), Sn(19)]); });

caseQ('c05', {
  passage: 'The overhead tank of a housing society in Jodhpur holds 9600 litres of water at 6 am. A pump then draws out 550 litres every hour, so the amounts left at 6 am, 7 am, 8 am, … form an AP.',
  d: 3, c: 'application',
  model: r`(a) Option (c): $6850$ litres. (b) After $15$ hours. (c) (i) No: $\dfrac{9100}{550}$ is not a whole number. Or (ii) $5800$ litres drawn, $3800$ litres left.`,
  sol: r`After $k$ hours the tank holds $9600 - 550k$ litres. (a) $k = 5$: $9600 - 2750 = 6850$. (b) $9600 - 550k = 1350 \Rightarrow k = 15$. (c) (i) $9600 - 550k = 500 \Rightarrow k = 16.5$ (about), not whole. (ii) Drawn: $550, 600, 650, \ldots$; $S_8 = 4(1100 + 350) = 5800$.`,
  children: [
    child('a', mk.mcq({ stem: 'How much water is left after 5 hours (at 11 am)?', opts: ['$7400$ litres', '$6300$ litres', '$6850$ litres', '$2750$ litres'], key: 'c', sol: r`$9600 - 5 \times 550 = 9600 - 2750 = 6850$ litres. This is the $6$th term of the AP $9600, 9050, 8500, \ldots$; option (a) is the amount after $4$ hours and option (d) is the water drawn.`, d: 2, c: 'application', t: [2, 4], time: 60 })),
    child('b', mk.num({ stem: 'After how many hours will 1350 litres be left?', value: 15, unit: 'hours', sol: r`$9600 - 550k = 1350 \Rightarrow 550k = 8250 \Rightarrow k = 15$ hours.`, scheme: [['15 hours', 1]], d: 2, c: 'application', t: [2, 4], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Will the tank ever hold exactly 500 litres at one of the hourly readings? Justify.', model: r`We need $9600 - 550k = 500$, i.e. $550k = 9100$, so $k = \dfrac{9100}{550} \approx 16.55$, which is not a whole number.

So $500$ litres is **not** one of the readings (after $16$ hours $800$ litres are left, after $17$ hours $250$).`, sol: 'A value is a term only if it gives a whole number of steps.', scheme: [['Equation and k not whole', 1], ['Conclusion with neighbouring readings', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** A different pump draws 550 litres in the first hour, 600 litres in the second hour, 650 litres in the third hour, and so on. How much water would be drawn in the first 8 hours, and how much would be left?', model: r`Drawn: $550, 600, 650, \ldots$, an AP with $a = 550$, $d = 50$.

$S_8 = \dfrac82[1100 + 7 \times 50] = 4 \times 1450 = 5800$ litres drawn; $9600 - 5800 = 3800$ litres left.`, sol: 'The amounts drawn, not the amounts left, form this AP.', scheme: [['S₈ = 5800', 1], ['3800 left', 1]], d: 3, c: 'application', t: [3, 4], time: 150 }),
    ]),
  ],
}, (C) => { const left = (k) => 9600 - 550 * k; C.child('a').which([7400, 6300, 6850, 2750], left(5)); C.child('b').val(firstN((k) => left(k) === 1350)); C.child('c').assert(!Array.from({ length: 20 }, (_, k) => left(k)).includes(500) && left(16) === 800 && left(17) === 250, '500 never'); C.child('c').model([9100, 800, 250]); C.child('cii').model([S(550, 50, 8), 9600 - S(550, 50, 8), 1450]); });

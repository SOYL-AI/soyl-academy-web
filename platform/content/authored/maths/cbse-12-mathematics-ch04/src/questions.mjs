// CBSE 12 Mathematics ch04 Determinants — practice bank with independent re-solve checks.
// Givens are shared constants; authored answers are typed as literals and every check recomputes them
// with src/det.mjs (expansion along the first row, cofactors, adjoint, inverse, substitution back).
import { Q, caseQ, child, mk, r, plot } from '../../cbse-12-mathematics-ch01/src/lib.mjs';
import { mul, scal, I, eqM, isInverse, flat, col, det, minor, cof, adj, inv, expandRow, expandCol, triDet, area, solve, classify, bm, vm } from './det.mjs';

const eqv = (u, v) => u.length === v.length && u.every((x, i) => Math.abs(x - v[i]) < 1e-9);
/** Integer roots of a polynomial-like function on [-50, 50]. */
const intRoots = (g) => [...Array(101).keys()].map((k) => k - 50).filter((x) => Math.abs(g(x)) < 1e-9);

// ---------------------------------------------------------------- givens shared by items
const A_m05 = [[2, 3, -1], [0, 4, 2], [1, -1, 3]];
const A_m10 = [[1, 4, -2], [3, 0, 5], [-1, 2, 6]];
const A_n01 = [[1, 3, -2], [4, -1, 0], [2, 5, 3]];
const A_n05 = [[2, 1, 0], [0, 3, -1], [1, 0, 4]];
const A_s301 = [[4, 0, -1], [2, 0, 3], [5, 6, 2]];
const A_s305 = [[2, -1, 4], [3, 0, -2], [1, 5, 1]];
const A_s306 = [[3, 1], [2, -1]], B_s306 = [[2, 1], [1, 1]];
const A_s308 = [[1, 1, 1], [2, -1, 3], [3, 0, 4]], B_s308 = [3, 1, 5];
const A_l01 = [[1, 2, -1], [0, 1, 2], [3, 1, 1]];
const A_l02 = [[1, 1, 2], [2, -1, 1], [3, 2, -1]], B_l02 = [3, 9, 4];
const A_l03 = [[1, -1, 2], [2, 1, -1], [3, -2, 1]], B_l03 = [5, 1, 2];
const A_l04 = [[1, 2, 0], [0, 1, 1], [1, 0, 2]], B_l04 = [4, 4, 8];
const A_l05 = [[1, 0, 2], [2, 1, 0], [0, 3, 1]];
const A_n07 = [[1, 2, -1], [3, -1, 2], [2, 1, 1]], B_n07 = [-1, 15, 10];

// ---------------------------------------------------------------- figures used by questions
const qLine = plot({ x: [-2, 6], y: [-4, 10], fns: [{ expr: '2x - 1', label: '$y = 2x - 1$' }], pts: [[2, 3, 'A(2, 3)'], [4, 7, 'B(4, 7)'], [5, 9, 'C(5, 9)']] }, 'A straight line rising steeply with three marked points A at 2 comma 3, B at 4 comma 7 and C at 5 comma 9, all on the same line.', 'Three points on one line: the triangle they form has zero area.');

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The value of $\begin{vmatrix} 6 & -2 \\ 3 & 4 \end{vmatrix}$ is`, opts: ['$30$', '$18$', '$24$', '$-30$'], key: 'a', sol: r`$6 \times 4 - (-2)(3) = 24 + 6 = 30$. Option (b) subtracts $6$ instead of adding; (c) forgets the second product.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => C.which([30, 18, 24, -30], det([[6, -2], [3, 4]])));
Q('m02', mk.mcq({ stem: r`If $\begin{vmatrix} x & 2 \\ 8 & x \end{vmatrix} = 9$, then $x$ equals`, opts: [r`$\pm 5$`, '$5$ only', r`$\pm 3$`, r`$\pm 4$`], key: 'a', sol: r`$x^2 - 16 = 9$, so $x^2 = 25$ and $x = \pm 5$. Both signs work, so "$5$ only" is incomplete.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { const roots = intRoots((x) => det([[x, 2], [8, x]]) - 9); C.which(['pm5', '5', 'pm3', 'pm4'], roots.length === 2 && roots[0] === -roots[1] ? `pm${roots[1]}` : 'other'); });
Q('m03', mk.mcq({ stem: r`The value of $\begin{vmatrix} 1 & 0 & 0 \\ 4 & 2 & 0 \\ 7 & 5 & 3 \end{vmatrix}$ is`, opts: ['$6$', '$0$', '$18$', '$1$'], key: 'a', sol: r`Expand along row 1, which has two zeros: $1 \times \begin{vmatrix} 2 & 0 \\ 5 & 3 \end{vmatrix} = 1 \times (6 - 0) = 6$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => C.which([6, 0, 18, 1], det([[1, 0, 0], [4, 2, 0], [7, 5, 3]])));
Q('m04', mk.mcq({ stem: r`To evaluate $\begin{vmatrix} 3 & 0 & 1 \\ 2 & 0 & 5 \\ 4 & 7 & -1 \end{vmatrix}$ with the least work, expand along`, opts: ['row 1', 'column 2', 'row 3', 'column 3'], key: 'b', sol: r`Column 2 has two zeros, so only one cofactor is needed: $7 \times A_{32} = 7 \times \left(-(15 - 2)\right) = -91$. Rows 1 and 3 and column 3 have at most one zero.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const A = [[3, 0, 1], [2, 0, 5], [4, 7, -1]];
  const zeros = { r1: A[0].filter((v) => v === 0).length, c2: A.filter((row) => row[1] === 0).length, r3: A[2].filter((v) => v === 0).length, c3: A.filter((row) => row[2] === 0).length };
  const best = Object.entries(zeros).sort((a, b) => b[1] - a[1])[0][0];
  C.which(['r1', 'c2', 'r3', 'c3'], best);
  C.assert(expandCol(A, 2) === det(A) && det(A) === -91, 'value -91');
});
Q('m05', mk.mcq({ stem: r`The value of $${vm(A_m05)}$ is`, opts: ['$38$', '$30$', '$22$', '$46$'], key: 'a', sol: r`Along row 1: $2(12 + 2) - 3(0 - 2) + (-1)(0 - 4) = 28 + 6 + 4 = 38$.`, d: 2, c: 'understanding', t: [1], time: 90 }), (C) => C.which([38, 30, 22, 46], det(A_m05)));
Q('m06', mk.mcq({ stem: 'The area of the triangle with vertices $(0, 0)$, $(6, 0)$ and $(2, 5)$ is', opts: ['$15$ square units', '$30$ square units', '$12$ square units', '$7.5$ square units'], key: 'a', sol: r`$\dfrac12\left|\begin{vmatrix} 0 & 0 & 1 \\ 6 & 0 & 1 \\ 2 & 5 & 1 \end{vmatrix}\right| = \dfrac12|1 \times (30 - 0)| = 15$. Option (b) forgets the half.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([15, 30, 12, 7.5], area([0, 0], [6, 0], [2, 5])));
Q('m07', mk.mcq({ stem: 'The points $(2, 3)$, $(4, k)$ and $(8, 15)$ are collinear when $k$ equals', opts: ['$7$', '$6$', '$9$', '$5$'], key: 'a', sol: r`$\begin{vmatrix} 2 & 3 & 1 \\ 4 & k & 1 \\ 8 & 15 & 1 \end{vmatrix} = 2(k - 15) - 3(4 - 8) + (60 - 8k) = 42 - 6k = 0$, so $k = 7$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => C.which([7, 6, 9, 5], intRoots((k) => triDet([2, 3], [4, k], [8, 15]))[0]));
Q('m08', mk.mcq({ stem: r`For three points $P$, $Q$, $R$ in a plane, $\begin{vmatrix} x_1 & y_1 & 1 \\ x_2 & y_2 & 1 \\ x_3 & y_3 & 1 \end{vmatrix} = 0$ means that`, opts: ['$P$, $Q$, $R$ are collinear', '$PQR$ is a right triangle', '$PQR$ is equilateral', 'the origin lies inside $PQR$'], key: 'a', sol: 'The determinant is twice the (signed) area of triangle PQR. Zero area means the three points lie on one line.', d: 1, c: 'recall', t: [2], time: 40, assets: [qLine] }), (C) => { C.assert(triDet([2, 3], [4, 7], [5, 9]) === 0, 'figure points collinear'); C.key('a'); });
Q('m09', mk.mcq({ stem: r`For $A = \begin{bmatrix} 4 & -3 \\ 5 & 2 \end{bmatrix}$, the cofactor $A_{12}$ is`, opts: ['$-5$', '$5$', '$-3$', '$3$'], key: 'a', sol: r`Delete row 1 and column 2: $M_{12} = 5$. Then $A_{12} = (-1)^{1 + 2} M_{12} = -5$. Option (b) is the minor, not the cofactor.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => C.which([-5, 5, -3, 3], cof([[4, -3], [5, 2]], 1, 2)));
Q('m10', mk.mcq({ stem: r`The minor $M_{23}$ of $${vm(A_m10)}$ is`, opts: ['$6$', '$-6$', '$14$', '$-14$'], key: 'a', sol: r`Delete row 2 and column 3: $\begin{vmatrix} 1 & 4 \\ -1 & 2 \end{vmatrix} = 2 + 4 = 6$. The cofactor would be $-6$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([6, -6, 14, -14], minor(A_m10, 2, 3)));
Q('m11', mk.mcq({ stem: r`The adjoint of $\begin{bmatrix} 3 & -1 \\ 4 & 2 \end{bmatrix}$ is`, opts: [r`$\begin{bmatrix} 2 & 1 \\ -4 & 3 \end{bmatrix}$`, r`$\begin{bmatrix} 2 & -4 \\ 1 & 3 \end{bmatrix}$`, r`$\begin{bmatrix} 3 & 1 \\ -4 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} 2 & -1 \\ 4 & 3 \end{bmatrix}$`], key: 'a', sol: r`For a $2 \times 2$ matrix, swap the diagonal entries and change the signs of the other two: $\begin{bmatrix} 2 & 1 \\ -4 & 3 \end{bmatrix}$. Option (b) is the cofactor matrix (not transposed).`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.which([[2, 1, -4, 3], [2, -4, 1, 3], [3, 1, -4, 2], [2, -1, 4, 3]], flat(adj([[3, -1], [4, 2]]))));
Q('m12', mk.mcq({ stem: r`If $A$ is a square matrix of order $3$ and $|A| = 5$, then $|\operatorname{adj} A|$ is`, opts: ['$25$', '$5$', '$125$', '$15$'], key: 'a', sol: r`$|\operatorname{adj} A| = |A|^{n - 1} = 5^{2} = 25$ for $n = 3$. Option (c) uses the power $n$ instead of $n - 1$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => { const A = [[5, 0, 0], [0, 1, 0], [0, 0, 1]]; C.assert(det(A) === 5, 'sample |A| = 5'); C.which([25, 5, 125, 15], det(adj(A))); });
Q('m13', mk.mcq({ stem: r`If $A$ is a square matrix of order $3$ with $|A| = -2$, then $|3A|$ is`, opts: ['$-54$', '$-6$', '$54$', '$-18$'], key: 'a', sol: r`$|kA| = k^n|A|$ with $n = 3$: $|3A| = 27 \times (-2) = -54$. Option (b) multiplies by $3$ only once.`, d: 3, c: 'application', t: [3], time: 60 }), (C) => { const A = [[-2, 0, 0], [0, 1, 0], [0, 0, 1]]; C.which([-54, -6, 54, -18], det(scal(3, A))); });
Q('m14', mk.mcq({ stem: r`The matrix $\begin{bmatrix} k & 6 \\ 2 & 3 \end{bmatrix}$ is singular when $k$ equals`, opts: ['$4$', '$-4$', '$9$', '$1$'], key: 'a', sol: r`Singular means determinant $0$: $3k - 12 = 0$, so $k = 4$.`, d: 2, c: 'application', t: [3], time: 45 }), (C) => C.which([4, -4, 9, 1], intRoots((k) => det([[k, 6], [2, 3]]))[0]));
Q('m15', mk.mcq({ stem: r`If $A = \begin{bmatrix} 2 & 1 \\ 7 & 4 \end{bmatrix}$, then $A^{-1}$ is`, opts: [r`$\begin{bmatrix} 4 & -1 \\ -7 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} -4 & 1 \\ 7 & -2 \end{bmatrix}$`, r`$\begin{bmatrix} 4 & -7 \\ -1 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} 2 & -1 \\ -7 & 4 \end{bmatrix}$`], key: 'a', sol: r`$|A| = 8 - 7 = 1$ and $\operatorname{adj} A = \begin{bmatrix} 4 & -1 \\ -7 & 2 \end{bmatrix}$, so $A^{-1} = \dfrac{1}{1}\operatorname{adj} A$. Option (b) has the wrong overall sign; (c) is the transpose of the key.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { const A = [[2, 1], [7, 4]]; const cands = [[[4, -1], [-7, 2]], [[-4, 1], [7, -2]], [[4, -7], [-1, 2]], [[2, -1], [-7, 4]]]; C.which(cands.map((B) => isInverse(A, B)), true); });
Q('m16', mk.mcq({ stem: r`For a square matrix $A$ of order $3$, $A(\operatorname{adj} A) = 8I$. Then $|\operatorname{adj} A|$ is`, opts: ['$64$', '$8$', '$512$', '$24$'], key: 'a', sol: r`$A(\operatorname{adj} A) = |A|I$, so $|A| = 8$. Then $|\operatorname{adj} A| = |A|^{2} = 64$. Option (b) stops at $|A|$.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => { const A = [[2, 0, 0], [0, 2, 0], [0, 0, 2]]; C.assert(eqM(mul(A, adj(A)), scal(8, I(3))), 'sample A adj A = 8I'); C.which([64, 8, 512, 24], det(adj(A))); });
Q('m17', mk.mcq({ stem: r`The system $2x + 3y = 5$, $4x + 6y = 9$ has`, opts: ['a unique solution', 'no solution', 'infinitely many solutions', 'exactly two solutions'], key: 'b', sol: r`$|A| = 12 - 12 = 0$ and $(\operatorname{adj} A)B = \begin{bmatrix} 6 & -3 \\ -4 & 2 \end{bmatrix}\begin{bmatrix} 5 \\ 9 \end{bmatrix} = \begin{bmatrix} 3 \\ -2 \end{bmatrix} \ne O$, so the system is inconsistent.`, d: 3, c: 'application', t: [4], time: 75 }), (C) => { const A = [[2, 3], [4, 6]]; C.assert(eqv(mul(adj(A), col([5, 9])).flat(), [3, -2]), '(adj A)B'); C.which(['unique', 'none', 'infinite', 'two'], classify(A, [5, 9])); });
Q('m18', mk.mcq({ stem: r`If $AX = B$ is a system of linear equations with $|A| \ne 0$, its solution is`, opts: ['$X = A^{-1}B$', '$X = BA^{-1}$', '$X = AB^{-1}$', r`$X = (\operatorname{adj} A)B$`], key: 'a', sol: r`Pre-multiply both sides by $A^{-1}$: $A^{-1}AX = A^{-1}B$, so $X = A^{-1}B$. $BA^{-1}$ is not even defined when $B$ is a column; $(\operatorname{adj} A)B$ misses the factor $\dfrac{1}{|A|}$.`, d: 1, c: 'recall', t: [4], time: 40 }), (C) => { const A = [[3, 2], [5, -4]], X = [3, -1]; const B = mul(A, col(X)).flat(); C.assert(eqv(solve(A, B), X) && !eqv(mul(adj(A), col(B)).flat(), X), 'A^-1 B recovers X; adj A B does not'); C.key('a'); });

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`$\begin{vmatrix} 3 & 4 \\ 6 & 8 \end{vmatrix} = 0$.`, r: r`The value of $\begin{vmatrix} a & b \\ c & d \end{vmatrix}$ is $ad - bc$.`, key: 'a', sol: r`By R, the value is $3 \times 8 - 4 \times 6 = 24 - 24 = 0$, so A is true and R is the rule that shows it.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(det([[3, 4], [6, 8]]) === 0, 'zero'); C.key('a'); });
Q('ar2', mk.ar({ a: 'The points $(1, 1)$, $(2, 3)$ and $(4, 7)$ are collinear.', r: 'Three points are collinear exactly when the triangle they form has zero area.', key: 'a', sol: r`$\begin{vmatrix} 1 & 1 & 1 \\ 2 & 3 & 1 \\ 4 & 7 & 1 \end{vmatrix} = 1(3 - 7) - 1(2 - 4) + 1(14 - 12) = -4 + 2 + 2 = 0$. Zero area, so by R the points are collinear. R explains A.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(triDet([1, 1], [2, 3], [4, 7]) === 0, 'collinear'); C.key('a'); });
Q('ar3', mk.ar({ a: r`The matrix $\begin{bmatrix} 2 & -3 \\ 4 & -6 \end{bmatrix}$ is invertible.`, r: r`A square matrix $A$ is invertible if and only if $|A| \ne 0$.`, key: 'd', sol: r`$|A| = -12 + 12 = 0$, so the matrix is singular and has no inverse: A is false. R is the correct test, so R is true.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(det([[2, -3], [4, -6]]) === 0 && inv([[2, -3], [4, -6]]) === null, 'singular'); C.key('d'); });
Q('ar4', mk.ar({ a: r`If $A$ is a $3 \times 3$ matrix with $|A| = 4$, then $|\operatorname{adj} A| = 16$.`, r: r`For every square matrix $A$ of order $n$, $|\operatorname{adj} A| = |A|^{n}$.`, key: 'c', sol: r`The correct result is $|\operatorname{adj} A| = |A|^{n - 1}$, which gives $4^{2} = 16$. So A is true and R (power $n$) is false.`, d: 3, c: 'analysis', t: [3] }), (C) => { const A = [[4, 0, 0], [0, 1, 0], [0, 0, 1]]; C.assert(det(adj(A)) === 16 && det(adj(A)) !== det(A) ** 3, 'n - 1 not n'); C.key('c'); });
Q('ar5', mk.ar({ a: r`For the system $2x + y = 5$, $x - 3y = -1$, the coefficient matrix is non-singular.`, r: 'A system whose coefficient matrix is non-singular has exactly one solution.', key: 'b', sol: r`$|A| = 2(-3) - 1(1) = -7 \ne 0$, so A is true. R is also true (the solution here is $x = 2$, $y = 1$), but R describes what follows from a non-zero determinant; it does not explain why this determinant is non-zero.`, d: 3, c: 'analysis', t: [4] }), (C) => { const A = [[2, 1], [1, -3]]; C.assert(det(A) === -7 && eqv(solve(A, [5, -1]), [2, 1]), 'non-singular, (2, 1)'); C.key('b'); });
Q('ar6', mk.ar({ a: r`The determinant $\begin{vmatrix} 0 & 0 & 1 \\ 0 & 4 & 1 \\ 3 & 0 & 1 \end{vmatrix}$ equals $-12$, so the triangle with vertices $(0, 0)$, $(0, 4)$ and $(3, 0)$ has area $-6$ square units.`, r: 'The area of a triangle is half the absolute value of this determinant.', key: 'd', sol: r`The determinant is indeed $1 \times (0 - 12) = -12$, but an area cannot be negative. By R the area is $\dfrac12|-12| = 6$ square units. A is false; R is true.`, d: 2, c: 'analysis', t: [2] }), (C) => { C.assert(triDet([0, 0], [0, 4], [3, 0]) === -12 && area([0, 0], [0, 4], [3, 0]) === 6, 'det -12, area 6'); C.key('d'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: 'True or false: a determinant is defined only for a square matrix.', key: 't', sol: 'True. A determinant is a number attached to a square matrix; a 2 × 3 matrix, for example, has none.', d: 1, c: 'recall', t: [1] }), (C) => C.key('t'));
Q('tf2', mk.tf({ stem: r`True or false: expanding $${vm(A_m05)}$ along row 3 gives a different value from expanding it along row 1.`, key: 'f', sol: r`False. Expansion along any row or column gives the same value, here $38$. Along row 3: $1(6 + 4) - (-1)(4 - 0) + 3(8 - 0) = 10 + 4 + 24 = 38$.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(expandRow(A_m05, 3) === 38 && expandRow(A_m05, 1) === 38 && expandCol(A_m05, 2) === 38, 'all expansions 38'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`True or false: if $|A| = 0$, then $A^{-1}$ exists and equals $\operatorname{adj} A$.`, key: 'f', sol: r`False. $A^{-1} = \dfrac{1}{|A|}\operatorname{adj} A$ needs $|A| \ne 0$; a singular matrix has no inverse.`, d: 1, c: 'recall', t: [3] }), (C) => { C.assert(inv([[1, 2], [2, 4]]) === null, 'singular has no inverse'); C.key('f'); });
Q('tf4', mk.tf({ stem: r`True or false: for $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, $\operatorname{adj} A = \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$.`, key: 't', sol: r`True. The cofactors are $A_{11} = d$, $A_{12} = -c$, $A_{21} = -b$, $A_{22} = a$; transposing the cofactor matrix gives the stated adjoint.`, d: 2, c: 'understanding', t: [3] }), (C) => { const [a, b, c, d] = [3, 7, -2, 5]; C.assert(eqM(adj([[a, b], [c, d]]), [[d, -b], [-c, a]]), 'sample'); C.key('t'); });
Q('tf5', mk.tf({ stem: r`True or false: if $|A| = 0$ and $(\operatorname{adj} A)B \ne O$, then $AX = B$ has infinitely many solutions.`, key: 'f', sol: r`False. In that case the system is inconsistent: it has no solution. Infinitely many solutions are possible only when $(\operatorname{adj} A)B = O$.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(classify([[1, 2], [2, 4]], [3, 5]) === 'none', 'sample inconsistent'); C.key('f'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`$\begin{vmatrix} 7 & -2 \\ 3 & 1 \end{vmatrix} = $ ____.`, acc: [['13']], sol: r`$7 \times 1 - (-2)(3) = 7 + 6 = 13$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(det([[7, -2], [3, 1]])));
Q('fb2', mk.fill({ stem: r`For $A = \begin{bmatrix} 5 & 2 \\ -3 & 8 \end{bmatrix}$, the cofactor $A_{11} = $ ____.`, acc: [['8']], sol: r`Delete row 1 and column 1: $M_{11} = 8$, and $A_{11} = (+1) \times 8$.`, d: 1, c: 'understanding', t: [3] }), (C) => C.blank(cof([[5, 2], [-3, 8]], 1, 1)));
Q('fb3', mk.fill({ stem: r`If $A$ is a non-singular $2 \times 2$ matrix with $|A| = -6$, then $|A^{-1}| = $ ____.`, acc: [['-1/6', '−1/6', r`$-\dfrac{1}{6}$`, r`$-\frac{1}{6}$`]], sol: r`$AA^{-1} = I$ gives $|A||A^{-1}| = 1$, so $|A^{-1}| = \dfrac{1}{|A|}$. Answer: $-\dfrac{1}{6}$ (that is, −1/6).`, d: 2, c: 'application', t: [3] }), (C) => { const A = [[-6, 0], [0, 1]]; C.blank(det(inv(A))); });
Q('fb4', mk.fill({ stem: 'The area of the triangle with vertices $(1, 0)$, $(5, 0)$ and $(3, 6)$ is ____ square units.', acc: [['12']], sol: r`$\dfrac12\left|\begin{vmatrix} 1 & 0 & 1 \\ 5 & 0 & 1 \\ 3 & 6 & 1 \end{vmatrix}\right| = \dfrac12|1(0 - 6) - 0 + 1(30 - 0)| = \dfrac12 \times 24 = 12$.`, d: 2, c: 'understanding', t: [2] }), (C) => C.blank(area([1, 0], [5, 0], [3, 6])));
Q('fb5', mk.fill({ stem: r`If $A$ is a $3 \times 3$ matrix and $A(\operatorname{adj} A) = \begin{bmatrix} -4 & 0 & 0 \\ 0 & -4 & 0 \\ 0 & 0 & -4 \end{bmatrix}$, then $|A| = $ ____.`, acc: [['-4', '−4']], sol: r`$A(\operatorname{adj} A) = |A|I$, and the given matrix is $-4I$, so $|A| = -4$.`, d: 2, c: 'understanding', t: [3] }), (C) => { const A = [[-4, 0, 0], [0, 1, 0], [0, 0, 1]]; C.assert(eqM(mul(A, adj(A)), scal(-4, I(3))), 'sample'); C.blank(det(A)); });

// =============================================================== numerical
Q('n01', mk.num({ stem: r`Evaluate $${vm(A_n01)}$.`, value: -83, sol: r`Along row 1: $1(-3 - 0) - 3(12 - 0) + (-2)(20 + 2) = -3 - 36 - 44 = -83$.`, scheme: [['−83', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => C.val(det(A_n01)));
Q('n02', mk.num({ stem: r`Find the positive value of $x$ for which $\begin{vmatrix} x & 1 & 0 \\ 2 & x & 1 \\ 0 & 3 & 1 \end{vmatrix} = 8$.`, value: 5, sol: r`Along row 1: $x(x - 3) - 1(2 - 0) = x^2 - 3x - 2 = 8$, so $x^2 - 3x - 10 = 0$, $(x - 5)(x + 2) = 0$. Positive value: $x = 5$.`, scheme: [['5', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => C.val(intRoots((x) => det([[x, 1, 0], [2, x, 1], [0, 3, 1]]) - 8).filter((x) => x > 0)[0]));
Q('n03', mk.num({ stem: 'Find the area (in square units) of the triangle with vertices $(-2, 1)$, $(3, 4)$ and $(1, -3)$.', value: 14.5, sol: r`$\begin{vmatrix} -2 & 1 & 1 \\ 3 & 4 & 1 \\ 1 & -3 & 1 \end{vmatrix} = -2(4 + 3) - 1(3 - 1) + 1(-9 - 4) = -14 - 2 - 13 = -29$. Area $= \dfrac12|-29| = 14.5$.`, scheme: [['14.5', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => C.val(area([-2, 1], [3, 4], [1, -3])));
Q('n04', mk.num({ stem: 'The triangle with vertices $(1, 2)$, $(k, 0)$ and $(4, 5)$ has area $6$ square units. Find the positive value of $k$.', value: 3, sol: r`$\begin{vmatrix} 1 & 2 & 1 \\ k & 0 & 1 \\ 4 & 5 & 1 \end{vmatrix} = 1(0 - 5) - 2(k - 4) + 1(5k - 0) = 3k + 3$. So $|3k + 3| = 12$: $k = 3$ or $k = -5$. Positive value: $3$.`, scheme: [['3', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const ks = intRoots((k) => area([1, 2], [k, 0], [4, 5]) - 6); C.assert(eqv(ks, [-5, 3]), `k = ${ks}`); C.val(ks.find((k) => k > 0)); });
Q('n05', mk.num({ stem: r`For $A = ${bm(A_n05)}$, find $|\operatorname{adj} A|$.`, value: 529, sol: r`$|A| = 2(12 - 0) - 1(0 + 1) + 0 = 23$. For order $3$, $|\operatorname{adj} A| = |A|^2 = 529$.`, scheme: [['529', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => { C.assert(det(A_n05) === 23, '|A| = 23'); C.val(det(adj(A_n05))); });
Q('n06', mk.num({ stem: r`$A$ is a square matrix of order $3$ with $|A| = 3$. Find $|2\operatorname{adj} A|$.`, value: 72, sol: r`$|\operatorname{adj} A| = 3^2 = 9$, and $|2B| = 2^3|B|$ for order $3$, so $|2\operatorname{adj} A| = 8 \times 9 = 72$.`, scheme: [['72', 1]], d: 4, c: 'analysis', t: [3], time: 120 }), (C) => { const A = [[3, 0, 0], [0, 1, 0], [0, 0, 1]]; C.val(det(scal(2, adj(A)))); });
Q('n07', mk.num({ stem: r`Solve by the matrix method and give the value of $z$: $x + 2y - z = -1$, $3x - y + 2z = 15$, $2x + y + z = 10$.`, value: 5, sol: r`$|A| = 1(-1 - 2) - 2(3 - 4) + (-1)(3 + 2) = -6 \ne 0$. $X = A^{-1}B$ gives $x = 2$, $y = 1$, $z = 5$. Check: $2 + 2 - 5 = -1$ ✓, $6 - 1 + 10 = 15$ ✓, $4 + 1 + 5 = 10$ ✓.`, scheme: [['5', 1]], d: 3, c: 'application', t: [4], time: 240 }), (C) => { C.assert(det(A_n07) === -6, '|A| = -6'); const X = solve(A_n07, B_n07); C.assert(eqv(X, [2, 1, 5]), `X = ${X}`); C.val(X[2]); });

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Show that $\begin{vmatrix} x + 2 & x - 1 \\ x + 3 & x \end{vmatrix}$ has the same value for every real $x$, and find that value.`, model: r`Value $= (x + 2)x - (x - 1)(x + 3) = x^2 + 2x - (x^2 + 2x - 3) = 3$. The $x$-terms cancel, so the value is $3$ for every $x$.`, sol: 'Expand as ad − bc and simplify.', scheme: [['Expansion ad − bc written', 1], ['Simplified to 3, independent of x', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { C.assert([-3, 0, 1.5, 7, 100].every((x) => Math.abs(det([[x + 2, x - 1], [x + 3, x]]) - 3) < 1e-9), 'always 3'); C.model([3]); });
Q('s202', mk.short({ marks: 2, stem: r`Find $x$ if $\begin{vmatrix} x & 4 \\ 5 & x \end{vmatrix} = \begin{vmatrix} 5 & 2 \\ -2 & 5 \end{vmatrix}$.`, model: r`Left side $= x^2 - 20$. Right side $= 25 + 4 = 29$. So $x^2 - 20 = 29$, $x^2 = 49$, $x = \pm 7$.`, sol: 'Evaluate both sides, then solve the quadratic.', scheme: [['Both determinants evaluated', 1], ['x = ±7', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { const xs = intRoots((x) => det([[x, 4], [5, x]]) - det([[5, 2], [-2, 5]])); C.assert(eqv(xs, [-7, 7]), `${xs}`); C.model([29, 49, 7]); });
Q('s203', mk.short({ marks: 2, stem: 'Using determinants, find the area of the triangle with vertices $(2, 7)$, $(-3, 1)$ and $(6, -2)$.', model: r`$\begin{vmatrix} 2 & 7 & 1 \\ -3 & 1 & 1 \\ 6 & -2 & 1 \end{vmatrix} = 2(1 + 2) - 7(-3 - 6) + 1(6 - 6) = 6 + 63 + 0 = 69$. Area $= \dfrac12|69| = 34.5$ square units.`, sol: 'Half the absolute value of the vertex determinant.', scheme: [['Determinant = 69', 1], ['Area 34.5 square units', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { C.assert(triDet([2, 7], [-3, 1], [6, -2]) === 69, '69'); C.model([69, area([2, 7], [-3, 1], [6, -2])]); });
Q('s204', mk.short({ marks: 2, stem: 'Using determinants, find the equation of the line joining $(1, 4)$ and $(3, -2)$.', model: r`For a point $(x, y)$ on the line, $\begin{vmatrix} x & y & 1 \\ 1 & 4 & 1 \\ 3 & -2 & 1 \end{vmatrix} = 0$: $x(4 + 2) - y(1 - 3) + (-2 - 12) = 6x + 2y - 14 = 0$, i.e. $3x + y = 7$.`, sol: 'Collinearity of (x, y) with the two given points.', scheme: [['Determinant set to 0', 1], ['3x + y = 7', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => { const g = (x, y) => triDet([x, y], [1, 4], [3, -2]); C.assert([[0, 0], [1, 0], [0, 1]].every(([x, y]) => Math.abs(g(x, y) - (6 * x + 2 * y - 14)) < 1e-9), 'det = 6x + 2y - 14'); C.assert(3 * 1 + 4 === 7 && 3 * 3 - 2 === 7, 'points satisfy 3x + y = 7'); C.model(['3x + y = 7']); });
Q('s205', mk.short({ marks: 2, stem: r`For $A = \begin{bmatrix} 3 & -2 \\ 5 & 1 \end{bmatrix}$, find $\operatorname{adj} A$ and verify that $A(\operatorname{adj} A) = |A|I$.`, model: r`$\operatorname{adj} A = \begin{bmatrix} 1 & 2 \\ -5 & 3 \end{bmatrix}$ and $|A| = 3 + 10 = 13$. $A(\operatorname{adj} A) = \begin{bmatrix} 3 + 10 & 6 - 6 \\ 5 - 5 & 10 + 3 \end{bmatrix} = \begin{bmatrix} 13 & 0 \\ 0 & 13 \end{bmatrix} = 13I = |A|I$.`, sol: 'Swap the diagonal, negate the off-diagonal, multiply.', scheme: [['adj A', 1], ['Product = 13I = |A|I', 1]], d: 2, c: 'understanding', t: [3], time: 150 }), (C) => { const A = [[3, -2], [5, 1]]; C.assert(eqM(adj(A), [[1, 2], [-5, 3]]) && eqM(mul(A, adj(A)), scal(13, I(2))) && det(A) === 13, 'adj and 13I'); C.model([13]); });
Q('s206', mk.short({ marks: 2, stem: r`For what values of $k$ is $A = \begin{bmatrix} k & 2 \\ 3 & k - 1 \end{bmatrix}$ singular?`, model: r`$|A| = k(k - 1) - 6 = k^2 - k - 6 = (k - 3)(k + 2)$. $A$ is singular when $|A| = 0$: $k = 3$ or $k = -2$.`, sol: 'Set the determinant to zero and factorise.', scheme: [['|A| = k² − k − 6 = 0', 1], ['k = 3 or k = −2', 1]], d: 2, c: 'application', t: [3], time: 120 }), (C) => { const ks = intRoots((k) => det([[k, 2], [3, k - 1]])); C.assert(eqv(ks, [-2, 3]), `${ks}`); C.model([3, 2]); });
Q('s207', mk.short({ marks: 2, stem: r`$A$ is a square matrix of order $3$ with $|A| = 4$. Find $|\operatorname{adj} A|$ and $|A^{-1}|$.`, model: r`$|\operatorname{adj} A| = |A|^{3 - 1} = 4^2 = 16$. From $AA^{-1} = I$, $|A||A^{-1}| = 1$, so $|A^{-1}| = \dfrac{1}{4}$.`, sol: 'Use the two results for the adjoint and the inverse.', scheme: [['|adj A| = 16', 1], ['|A⁻¹| = 1/4', 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => { const A = [[4, 0, 0], [0, 1, 0], [0, 0, 1]]; C.assert(det(adj(A)) === 16 && Math.abs(det(inv(A)) - 0.25) < 1e-12, '16 and 1/4'); C.model([16, 0.25]); });
Q('s208', mk.short({ marks: 2, stem: 'Examine the consistency of the system $x + 3y = 5$, $2x + 6y = 8$.', model: r`$A = \begin{bmatrix} 1 & 3 \\ 2 & 6 \end{bmatrix}$, $|A| = 6 - 6 = 0$. $\operatorname{adj} A = \begin{bmatrix} 6 & -3 \\ -2 & 1 \end{bmatrix}$, $(\operatorname{adj} A)B = \begin{bmatrix} 30 - 24 \\ -10 + 8 \end{bmatrix} = \begin{bmatrix} 6 \\ -2 \end{bmatrix} \ne O$. So the system is **inconsistent** (no solution).`, sol: 'Singular A, then test (adj A)B.', scheme: [['|A| = 0 and adj A', 1], ['(adj A)B ≠ O, so inconsistent', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { const A = [[1, 3], [2, 6]]; C.assert(eqv(mul(adj(A), col([5, 8])).flat(), [6, -2]), '(adj A)B'); C.assert(classify(A, [5, 8]) === 'none', 'none'); C.model(['inconsistent']); });
Q('s209', mk.short({ marks: 2, stem: 'Show that the system $3x - y = 4$, $2x + 5y = 14$ is consistent and find its solution.', model: r`$|A| = 15 + 2 = 17 \ne 0$, so the system is consistent with a unique solution. $X = A^{-1}B = \dfrac{1}{17}\begin{bmatrix} 5 & 1 \\ -2 & 3 \end{bmatrix}\begin{bmatrix} 4 \\ 14 \end{bmatrix} = \dfrac{1}{17}\begin{bmatrix} 34 \\ 34 \end{bmatrix}$: $x = 2$, $y = 2$.`, sol: 'Non-zero determinant, then X = A⁻¹B.', scheme: [['|A| = 17 ≠ 0, consistent', 1], ['x = 2, y = 2', 1]], d: 2, c: 'application', t: [4], time: 150 }), (C) => { const A = [[3, -1], [2, 5]]; C.assert(det(A) === 17 && eqM(adj(A), [[5, 1], [-2, 3]]), 'det, adj'); C.assert(eqv(solve(A, [4, 14]), [2, 2]), '(2, 2)'); C.model([17, 34, 2]); });

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Evaluate $${vm(A_s301)}$ by expanding along the column with the most zeros. Check your answer by expanding along row 1.`, model: r`Column 2 has only one non-zero entry, $a_{32} = 6$. $A_{32} = (-1)^{5}\begin{vmatrix} 4 & -1 \\ 2 & 3 \end{vmatrix} = -(12 + 2) = -14$. Value $= 6 \times (-14) = -84$.
**Check (row 1):** $4(0 - 18) - 0 + (-1)(12 - 0) = -72 - 12 = -84$ ✓.`, sol: 'One cofactor along column 2; full expansion along row 1 as a check.', scheme: [['Cofactor A₃₂ = −14', 1], ['Value −84', 1], ['Check along row 1 gives −84', 1]], d: 2, c: 'understanding', t: [1], time: 180 }), (C) => { C.assert(cof(A_s301, 3, 2) === -14 && expandCol(A_s301, 2) === -84 && expandRow(A_s301, 1) === -84 && det(A_s301) === -84, 'all -84'); C.model([14, 84, 72, 12]); });
Q('s302', mk.short({ marks: 3, stem: r`Solve for $x$: $\begin{vmatrix} x & 3 & 0 \\ 2 & x & 1 \\ 0 & 5 & 1 \end{vmatrix} = 0$.`, model: r`Expand along row 1: $x(x \cdot 1 - 1 \cdot 5) - 3(2 \cdot 1 - 1 \cdot 0) + 0 = x^2 - 5x - 6$.
So $x^2 - 5x - 6 = 0$, $(x - 6)(x + 1) = 0$, giving $x = 6$ or $x = -1$.`, sol: 'Expand along the row with a zero, then solve the quadratic.', scheme: [['Expansion along row 1', 1], ['x² − 5x − 6 = 0', 1], ['x = 6 or x = −1', 1]], d: 3, c: 'application', t: [1], time: 180 }), (C) => { const xs = intRoots((x) => det([[x, 3, 0], [2, x, 1], [0, 5, 1]])); C.assert(eqv(xs, [-1, 6]), `${xs}`); C.model([6, 1]); });
Q('s303', mk.short({ marks: 3, stem: 'The area of the triangle with vertices $(k, 2)$, $(-1, 5)$ and $(3, -1)$ is $9$ square units. Find the possible values of $k$.', model: r`$\begin{vmatrix} k & 2 & 1 \\ -1 & 5 & 1 \\ 3 & -1 & 1 \end{vmatrix} = k(5 + 1) - 2(-1 - 3) + 1(1 - 15) = 6k + 8 - 14 = 6k - 6$.
$\dfrac12|6k - 6| = 9 \Rightarrow 6k - 6 = \pm 18$. So $k = 4$ or $k = -2$.`, sol: 'Use both signs of the absolute value.', scheme: [['Determinant 6k − 6', 1], ['|6k − 6| = 18 with both signs', 1], ['k = 4 or k = −2', 1]], d: 3, c: 'application', t: [2], time: 180 }), (C) => { const ks = intRoots((k) => area([k, 2], [-1, 5], [3, -1]) - 9); C.assert(eqv(ks, [-2, 4]), `${ks}`); C.model([4, 2, 18]); });
Q('s304', mk.short({ marks: 3, stem: r`Find the inverse of $A = \begin{bmatrix} 4 & 3 \\ 2 & 5 \end{bmatrix}$ by the adjoint method and verify that $AA^{-1} = I$.`, model: r`$|A| = 20 - 6 = 14 \ne 0$. $\operatorname{adj} A = \begin{bmatrix} 5 & -3 \\ -2 & 4 \end{bmatrix}$, so $A^{-1} = \dfrac{1}{14}\begin{bmatrix} 5 & -3 \\ -2 & 4 \end{bmatrix}$.
**Verify:** $A \begin{bmatrix} 5 & -3 \\ -2 & 4 \end{bmatrix} = \begin{bmatrix} 20 - 6 & -12 + 12 \\ 10 - 10 & -6 + 20 \end{bmatrix} = 14I$, so $AA^{-1} = I$.`, sol: 'Determinant, adjoint, divide, then multiply back.', scheme: [['|A| = 14', 1], ['A⁻¹ = (1/14) adj A', 1], ['Verification AA⁻¹ = I', 1]], d: 2, c: 'understanding', t: [3], time: 180 }), (C) => { const A = [[4, 3], [2, 5]]; C.assert(det(A) === 14 && eqM(adj(A), [[5, -3], [-2, 4]]) && isInverse(A, scal(1 / 14, [[5, -3], [-2, 4]])), 'inverse'); C.model([14]); });
Q('s305', mk.short({ marks: 3, stem: r`For $\Delta = ${vm(A_s305)}$, find the minors and cofactors of the elements of row 2, and use them to evaluate $\Delta$.`, model: r`$M_{21} = \begin{vmatrix} -1 & 4 \\ 5 & 1 \end{vmatrix} = -21$, $A_{21} = 21$. $M_{22} = \begin{vmatrix} 2 & 4 \\ 1 & 1 \end{vmatrix} = -2$, $A_{22} = -2$. $M_{23} = \begin{vmatrix} 2 & -1 \\ 1 & 5 \end{vmatrix} = 11$, $A_{23} = -11$.
$\Delta = a_{21}A_{21} + a_{22}A_{22} + a_{23}A_{23} = 3(21) + 0(-2) + (-2)(-11) = 63 + 22 = 85$.`, sol: 'Signs alternate −, +, − along row 2.', scheme: [['Three minors', 1], ['Three cofactors with signs', 1], ['Δ = 85', 1]], d: 3, c: 'understanding', t: [3, 1], time: 210 }), (C) => { C.assert(minor(A_s305, 2, 1) === -21 && minor(A_s305, 2, 2) === -2 && minor(A_s305, 2, 3) === 11, 'minors'); C.assert(expandRow(A_s305, 2) === 85 && det(A_s305) === 85, '85'); C.model([21, 2, 11, 85]); });
Q('s306', mk.short({ marks: 3, stem: r`For $A = ${bm(A_s306)}$ and $B = ${bm(B_s306)}$, verify that $(AB)^{-1} = B^{-1}A^{-1}$.`, model: r`$AB = \begin{bmatrix} 7 & 4 \\ 3 & 1 \end{bmatrix}$, $|AB| = 7 - 12 = -5$, so $(AB)^{-1} = -\dfrac{1}{5}\begin{bmatrix} 1 & -4 \\ -3 & 7 \end{bmatrix} = \dfrac{1}{5}\begin{bmatrix} -1 & 4 \\ 3 & -7 \end{bmatrix}$.
$|A| = -3 - 2 = -5$, $A^{-1} = \dfrac{1}{5}\begin{bmatrix} 1 & 1 \\ 2 & -3 \end{bmatrix}$; $|B| = 2 - 1 = 1$, $B^{-1} = \begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix}$.
$B^{-1}A^{-1} = \dfrac{1}{5}\begin{bmatrix} 1 - 2 & 1 + 3 \\ -1 + 4 & -1 - 6 \end{bmatrix} = \dfrac{1}{5}\begin{bmatrix} -1 & 4 \\ 3 & -7 \end{bmatrix} = (AB)^{-1}$ ✓.`, sol: 'Compute each side separately and compare.', scheme: [['(AB)⁻¹', 1], ['A⁻¹ and B⁻¹', 1], ['B⁻¹A⁻¹ equals (AB)⁻¹', 1]], d: 3, c: 'application', t: [3], time: 240 }), (C) => {
  const AB = mul(A_s306, B_s306);
  C.assert(eqM(AB, [[7, 4], [3, 1]]) && det(AB) === -5 && det(A_s306) === -5 && det(B_s306) === 1, 'AB and determinants');
  C.assert(eqM(inv(AB), scal(1 / 5, [[-1, 4], [3, -7]])) && eqM(inv(A_s306), scal(1 / 5, [[1, 1], [2, -3]])) && eqM(inv(B_s306), [[1, -1], [-1, 2]]), 'inverses');
  C.assert(eqM(mul(inv(B_s306), inv(A_s306)), inv(AB)), 'reversal');
  C.model([5, 7, 4, 3]);
});
Q('s307', mk.short({ marks: 3, stem: 'Solve by the matrix method: $4x - 3y = 11$, $3x + 2y = 4$.', model: r`$A = \begin{bmatrix} 4 & -3 \\ 3 & 2 \end{bmatrix}$, $|A| = 8 + 9 = 17 \ne 0$. $\operatorname{adj} A = \begin{bmatrix} 2 & 3 \\ -3 & 4 \end{bmatrix}$.
$X = A^{-1}B = \dfrac{1}{17}\begin{bmatrix} 2 & 3 \\ -3 & 4 \end{bmatrix}\begin{bmatrix} 11 \\ 4 \end{bmatrix} = \dfrac{1}{17}\begin{bmatrix} 34 \\ -17 \end{bmatrix}$, so $x = 2$, $y = -1$.
**Check:** $8 + 3 = 11$ ✓, $6 - 2 = 4$ ✓.`, sol: 'Write AX = B, find A⁻¹, multiply.', scheme: [['|A| = 17 and adj A', 1], ['X = A⁻¹B set up', 1], ['x = 2, y = −1', 1]], d: 2, c: 'understanding', t: [4], time: 180 }), (C) => { const A = [[4, -3], [3, 2]]; C.assert(det(A) === 17 && eqM(adj(A), [[2, 3], [-3, 4]]), 'adj'); C.assert(eqv(solve(A, [11, 4]), [2, -1]), '(2, -1)'); C.model([17, 34, 2, 1]); });
Q('s308', mk.short({ marks: 3, stem: 'Show that the system $x + y + z = 3$, $2x - y + 3z = 1$, $3x + 4z = 5$ is inconsistent.', model: r`$|A| = 1(-4 - 0) - 1(8 - 9) + 1(0 + 3) = -4 + 1 + 3 = 0$.
$\operatorname{adj} A = \begin{bmatrix} -4 & -4 & 4 \\ 1 & 1 & -1 \\ 3 & 3 & -3 \end{bmatrix}$, $(\operatorname{adj} A)B = \begin{bmatrix} -12 - 4 + 20 \\ 3 + 1 - 5 \\ 9 + 3 - 15 \end{bmatrix} = \begin{bmatrix} 4 \\ -1 \\ -3 \end{bmatrix} \ne O$.
So the system has no solution: it is inconsistent.`, sol: 'Singular A, then (adj A)B.', scheme: [['|A| = 0', 1], ['adj A and (adj A)B', 1], ['(adj A)B ≠ O, inconsistent', 1]], d: 4, c: 'analysis', t: [4], time: 240 }), (C) => { C.assert(det(A_s308) === 0 && eqM(adj(A_s308), [[-4, -4, 4], [1, 1, -1], [3, 3, -3]]), 'adj'); C.assert(eqv(mul(adj(A_s308), col(B_s308)).flat(), [4, -1, -3]) && classify(A_s308, B_s308) === 'none', 'inconsistent'); C.model([4, 1, 3, 'inconsistent']); });

// =============================================================== long answer, 5 marks
Q('l01', mk.long({ stem: r`Find $A^{-1}$ for $A = ${bm(A_l01)}$ and verify that $AA^{-1} = I$.`, model: r`**Determinant** (row 1): $|A| = 1(1 - 2) - 2(0 - 6) + (-1)(0 - 3) = -1 + 12 + 3 = 14 \ne 0$, so $A^{-1}$ exists.
**Cofactors:** $A_{11} = -1$, $A_{12} = 6$, $A_{13} = -3$; $A_{21} = -3$, $A_{22} = 4$, $A_{23} = 5$; $A_{31} = 5$, $A_{32} = -2$, $A_{33} = 1$.
**Adjoint** (transpose of the cofactor matrix): $\operatorname{adj} A = \begin{bmatrix} -1 & -3 & 5 \\ 6 & 4 & -2 \\ -3 & 5 & 1 \end{bmatrix}$.
**Inverse:** $A^{-1} = \dfrac{1}{14}\begin{bmatrix} -1 & -3 & 5 \\ 6 & 4 & -2 \\ -3 & 5 & 1 \end{bmatrix}$.
**Verify:** $A(\operatorname{adj} A) = \begin{bmatrix} 14 & 0 & 0 \\ 0 & 14 & 0 \\ 0 & 0 & 14 \end{bmatrix} = 14I$ (for example, row 1 times column 1: $-1 + 12 + 3 = 14$), so $AA^{-1} = I$.`, sol: 'Determinant, nine cofactors, transpose, divide, verify.', scheme: [['|A| = 14', 1], ['All nine cofactors', 1.5], ['adj A (transposed)', 1], ['A⁻¹ = (1/14) adj A', 0.5], ['Verification', 1]], d: 3, c: 'understanding', t: [3], time: 480 }), (C) => {
  C.assert(det(A_l01) === 14, '14');
  C.assert(eqv(flat([[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]].map(([i, j]) => [cof(A_l01, i, j)])), [-1, 6, -3, -3, 4, 5, 5, -2, 1]), 'cofactors');
  C.assert(eqM(adj(A_l01), [[-1, -3, 5], [6, 4, -2], [-3, 5, 1]]) && isInverse(A_l01, scal(1 / 14, [[-1, -3, 5], [6, 4, -2], [-3, 5, 1]])), 'inverse');
  C.model([14]);
});
Q('l02', mk.long({ stem: 'Solve by the matrix method: $x + y + 2z = 3$, $2x - y + z = 9$, $3x + 2y - z = 4$.', model: r`$AX = B$ with $A = ${bm(A_l02)}$, $B = \begin{bmatrix} 3 \\ 9 \\ 4 \end{bmatrix}$.
$|A| = 1(1 - 2) - 1(-2 - 3) + 2(4 + 3) = -1 + 5 + 14 = 18 \ne 0$: unique solution.
**Cofactors:** $A_{11} = -1$, $A_{12} = 5$, $A_{13} = 7$; $A_{21} = 5$, $A_{22} = -7$, $A_{23} = 1$; $A_{31} = 3$, $A_{32} = 3$, $A_{33} = -3$.
$\operatorname{adj} A = ${bm(adj(A_l02))}$.
$X = \dfrac{1}{18}(\operatorname{adj} A)B = \dfrac{1}{18}\begin{bmatrix} -3 + 45 + 12 \\ 15 - 63 + 12 \\ 21 + 9 - 12 \end{bmatrix} = \dfrac{1}{18}\begin{bmatrix} 54 \\ -36 \\ 18 \end{bmatrix}$, so $x = 3$, $y = -2$, $z = 1$.
**Check:** $3 - 2 + 2 = 3$ ✓, $6 + 2 + 1 = 9$ ✓, $9 - 4 - 1 = 4$ ✓.`, sol: 'Matrix form, determinant, adjoint, X = A⁻¹B, check.', scheme: [['Matrix form and |A| = 18', 1], ['Cofactors', 1.5], ['adj A', 0.5], ['X = A⁻¹B computed', 1.5], ['Answer with check', 0.5]], d: 3, c: 'application', t: [4, 3], time: 540 }), (C) => {
  C.assert(det(A_l02) === 18, '18');
  C.assert(eqM(adj(A_l02), [[-1, 5, 3], [5, -7, 3], [7, 1, -3]]), 'adj typed');
  C.assert(eqv(mul(adj(A_l02), col(B_l02)).flat(), [54, -36, 18]), 'adj B');
  C.assert(eqv(solve(A_l02, B_l02), [3, -2, 1]), 'X');
  C.model([18, 54, 36, 3, 2, 1]);
});
Q('l03', mk.long({ stem: r`Find $A^{-1}$ for $A = ${bm(A_l03)}$. Hence solve $x - y + 2z = 5$, $2x + y - z = 1$, $3x - 2y + z = 2$.`, model: r`$|A| = 1(1 - 2) - (-1)(2 + 3) + 2(-4 - 3) = -1 + 5 - 14 = -10 \ne 0$.
**Cofactors:** $A_{11} = -1$, $A_{12} = -5$, $A_{13} = -7$; $A_{21} = -3$, $A_{22} = -5$, $A_{23} = -1$; $A_{31} = -1$, $A_{32} = 5$, $A_{33} = 3$.
$\operatorname{adj} A = ${bm(adj(A_l03))}$, $A^{-1} = -\dfrac{1}{10}${bm(adj(A_l03))}$.
The system is $AX = B$ with $B = \begin{bmatrix} 5 \\ 1 \\ 2 \end{bmatrix}$, so $X = A^{-1}B = -\dfrac{1}{10}\begin{bmatrix} -5 - 3 - 2 \\ -25 - 5 + 10 \\ -35 - 1 + 6 \end{bmatrix} = -\dfrac{1}{10}\begin{bmatrix} -10 \\ -20 \\ -30 \end{bmatrix}$.
So $x = 1$, $y = 2$, $z = 3$. **Check:** $1 - 2 + 6 = 5$ ✓, $2 + 2 - 3 = 1$ ✓, $3 - 4 + 3 = 2$ ✓.`, sol: 'Inverse first; the coefficient matrix of the system is A itself.', scheme: [['|A| = −10', 1], ['Cofactors and adj A', 1.5], ['A⁻¹', 0.5], ['X = A⁻¹B', 1.5], ['x = 1, y = 2, z = 3', 0.5]], d: 3, c: 'application', t: [3, 4], time: 540 }), (C) => {
  C.assert(det(A_l03) === -10, '-10');
  C.assert(eqM(adj(A_l03), [[-1, -3, -1], [-5, -5, 5], [-7, -1, 3]]), 'adj typed');
  C.assert(eqv(mul(adj(A_l03), col(B_l03)).flat(), [-10, -20, -30]), 'adj B');
  C.assert(eqv(solve(A_l03, B_l03), [1, 2, 3]), 'X');
  C.model([10, 20, 30, 1, 2, 3]);
});
Q('l04', mk.long({ stem: r`Let $A = ${bm(A_l04)}$ and $B = ${bm(adj(A_l04))}$. Find $AB$. Hence find $A^{-1}$ and solve $x + 2y = 4$, $y + z = 4$, $x + 2z = 8$.`, model: r`$AB = \begin{bmatrix} 2 + 2 + 0 & -4 + 4 + 0 & 2 - 2 + 0 \\ 0 + 1 - 1 & 0 + 2 + 2 & 0 - 1 + 1 \\ 2 + 0 - 2 & -4 + 0 + 4 & 2 + 0 + 2 \end{bmatrix} = \begin{bmatrix} 4 & 0 & 0 \\ 0 & 4 & 0 \\ 0 & 0 & 4 \end{bmatrix} = 4I$.
So $A\left(\dfrac14 B\right) = I$ and $A^{-1} = \dfrac14 B$.
The system is $AX = C$ with $C = \begin{bmatrix} 4 \\ 4 \\ 8 \end{bmatrix}$ (the coefficient matrix is $A$). $X = \dfrac14 BC = \dfrac14\begin{bmatrix} 8 - 16 + 16 \\ 4 + 8 - 8 \\ -4 + 8 + 8 \end{bmatrix} = \dfrac14\begin{bmatrix} 8 \\ 4 \\ 12 \end{bmatrix}$.
So $x = 2$, $y = 1$, $z = 3$. **Check:** $2 + 2 = 4$ ✓, $1 + 3 = 4$ ✓, $2 + 6 = 8$ ✓.`, sol: 'A product equal to kI gives the inverse without cofactors.', scheme: [['AB computed', 1.5], ['AB = 4I', 0.5], ['A⁻¹ = B/4', 1], ['X = A⁻¹C', 1.5], ['Answer with check', 0.5]], d: 5, c: 'analysis', t: [3, 4], time: 480 }), (C) => {
  const B = adj(A_l04);
  C.assert(eqM(B, [[2, -4, 2], [1, 2, -1], [-1, 2, 1]]), 'B as printed');
  C.assert(eqM(mul(A_l04, B), scal(4, I(3))) && isInverse(A_l04, scal(0.25, B)), 'AB = 4I');
  C.assert(eqv(mul(B, col(B_l04)).flat(), [8, 4, 12]) && eqv(solve(A_l04, B_l04), [2, 1, 3]), 'X');
  C.model([4, 8, 12, 2, 1, 3]);
});
Q('l05', mk.long({ stem: r`For $A = ${bm(A_l05)}$, find $\operatorname{adj} A$ and verify that $A(\operatorname{adj} A) = (\operatorname{adj} A)A = |A|I$.`, model: r`$|A| = 1(1 - 0) - 0 + 2(6 - 0) = 13$.
**Cofactors:** $A_{11} = 1$, $A_{12} = -2$, $A_{13} = 6$; $A_{21} = 6$, $A_{22} = 1$, $A_{23} = -3$; $A_{31} = -2$, $A_{32} = 4$, $A_{33} = 1$.
$\operatorname{adj} A = ${bm(adj(A_l05))}$.
$A(\operatorname{adj} A) = \begin{bmatrix} 1 + 0 + 12 & 6 + 0 - 6 & -2 + 0 + 2 \\ 2 - 2 + 0 & 12 + 1 + 0 & -4 + 4 + 0 \\ 0 - 6 + 6 & 0 + 3 - 3 & 0 + 12 + 1 \end{bmatrix} = 13I$.
$(\operatorname{adj} A)A = \begin{bmatrix} 1 + 12 + 0 & 0 + 6 - 6 & 2 + 0 - 2 \\ -2 + 2 + 0 & 0 + 1 + 12 & -4 + 0 + 4 \\ 6 - 6 + 0 & 0 - 3 + 3 & 12 + 0 + 1 \end{bmatrix} = 13I$.
Both products equal $13I = |A|I$ ✓.`, sol: 'Nine cofactors, transpose, two products.', scheme: [['|A| = 13', 1], ['Cofactors', 1], ['adj A', 1], ['A(adj A) = 13I', 1], ['(adj A)A = 13I', 1]], d: 3, c: 'understanding', t: [3], time: 480 }), (C) => {
  C.assert(det(A_l05) === 13, '13');
  C.assert(eqM(adj(A_l05), [[1, 6, -2], [-2, 1, 4], [6, -3, 1]]), 'adj typed');
  C.assert(eqM(mul(A_l05, adj(A_l05)), scal(13, I(3))) && eqM(mul(adj(A_l05), A_l05), scal(13, I(3))), 'both products');
  C.model([13]);
});
Q('l06', mk.long({ stem: 'The vertices of a triangle are $A(-1, 3)$, $B(2, -1)$ and $C(5, 5)$. (a) Using determinants, find its area. (b) Using determinants, find the equation of the line $AB$. (c) Hence find the length of the altitude from $C$ to $AB$.', model: r`(a) $\begin{vmatrix} -1 & 3 & 1 \\ 2 & -1 & 1 \\ 5 & 5 & 1 \end{vmatrix} = -1(-1 - 5) - 3(2 - 5) + 1(10 + 5) = 6 + 9 + 15 = 30$. Area $= \dfrac12 \times 30 = 15$ square units.
(b) $\begin{vmatrix} x & y & 1 \\ -1 & 3 & 1 \\ 2 & -1 & 1 \end{vmatrix} = 0$: $x(3 + 1) - y(-1 - 2) + (1 - 6) = 0$, i.e. $4x + 3y - 5 = 0$.
(c) $AB = \sqrt{3^2 + 4^2} = 5$. Area $= \dfrac12 \times AB \times h$, so $15 = \dfrac52 h$ and $h = 6$ units.
(Check: distance of $C$ from $AB$ is $\dfrac{|20 + 15 - 5|}{5} = 6$ ✓.)`, sol: 'Area, line by collinearity, then area = half base times height.', scheme: [['Determinant 30, area 15', 1.5], ['Determinant for line set up', 1], ['4x + 3y − 5 = 0', 0.5], ['AB = 5', 1], ['Altitude 6', 1]], d: 4, c: 'analysis', t: [2], time: 480 }), (C) => {
  const [A, B, Cc] = [[-1, 3], [2, -1], [5, 5]];
  C.assert(triDet(A, B, Cc) === 30 && area(A, B, Cc) === 15, 'area 15');
  const g = (x, y) => triDet([x, y], A, B);
  C.assert([[0, 0], [1, 0], [0, 1]].every(([x, y]) => Math.abs(g(x, y) - (4 * x + 3 * y - 5)) < 1e-9), 'line 4x + 3y - 5');
  const ab = Math.hypot(B[0] - A[0], B[1] - A[1]);
  C.assert(ab === 5 && (2 * 15) / ab === 6 && Math.abs(4 * 5 + 3 * 5 - 5) / 5 === 6, 'altitude 6');
  C.model([30, 15, 5, 6, '4x + 3y - 5 = 0']);
});

// =============================================================== case-based (1 + 1 + 2, part (c) either/or)
const A_c01 = [[1, 1, 1], [2, 1, 1], [1, 3, 2]], B_c01 = [1000, 1250, 2100];
caseQ('c01', {
  passage: r`A school in Lucknow gives three kinds of prizes on Annual Day: for punctuality (₹$x$ each), cleanliness (₹$y$ each) and helpfulness (₹$z$ each). One prize of each kind costs ₹$1000$ in all. Class XII-A gave $2$ punctuality, $1$ cleanliness and $1$ helpfulness prize for ₹$1250$. Class XII-B gave $1$, $3$ and $2$ prizes of the three kinds for ₹$2100$. The system is written as $AX = B$ with $X = \begin{bmatrix} x \\ y \\ z \end{bmatrix}$. You are told that $\operatorname{adj} A = ${bm(adj(A_c01))}$.`,
  d: 3, c: 'application',
  model: r`(a) Option (a). (b) $|A| = 1$. (c) (i) $x = 250$, $y = 350$, $z = 400$. Or (ii) $A_{11} = -1$, $A_{12} = -3$, $A_{13} = 5$; $|A| = -1 - 3 + 5 = 1$.`,
  sol: r`(a) Rows: one of each; $2, 1, 1$; $1, 3, 2$. (b) $1(2 - 3) - 1(4 - 1) + 1(6 - 1) = 1$. (c) (i) $X = (\operatorname{adj} A)B$. (ii) Expansion along row 1.`,
  children: [
    child('a', mk.mcq({ stem: 'The coefficient matrix $A$ is', opts: [r`$\begin{bmatrix} 1 & 1 & 1 \\ 2 & 1 & 1 \\ 1 & 3 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} 1 & 2 & 1 \\ 1 & 1 & 3 \\ 1 & 1 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 1 \\ 2 & 3 & 1 \end{bmatrix}$`, r`$\begin{bmatrix} 2 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 3 & 2 \end{bmatrix}$`], key: 'a', sol: 'Each row lists the numbers of the three prizes in one condition, in the order x, y, z. Option (b) is the transpose.', d: 1, c: 'understanding', t: [4], time: 60 })),
    child('b', mk.num({ stem: 'Find |A|.', value: 1, sol: r`$|A| = 1(2 - 3) - 1(4 - 1) + 1(6 - 1) = -1 - 3 + 5 = 1$.`, scheme: [['1', 1]], d: 2, c: 'understanding', t: [1], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Use $X = A^{-1}B$ to find the value of each prize.', model: r`$A^{-1} = \dfrac{1}{|A|}\operatorname{adj} A = \operatorname{adj} A$. $X = \begin{bmatrix} -1000 + 1250 + 0 \\ -3000 + 1250 + 2100 \\ 5000 - 2500 - 2100 \end{bmatrix} = \begin{bmatrix} 250 \\ 350 \\ 400 \end{bmatrix}$. Punctuality ₹$250$, cleanliness ₹$350$, helpfulness ₹$400$.`, sol: 'Multiply adj A by B and divide by |A|.', scheme: [['X = (1/|A|)(adj A)B set up', 1], ['₹250, ₹350, ₹400', 1]], d: 3, c: 'application', t: [4], time: 180 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the cofactors of the elements of row 1 of $A$ and use them to verify the value of $|A|$.', model: r`$A_{11} = \begin{vmatrix} 1 & 1 \\ 3 & 2 \end{vmatrix} = -1$, $A_{12} = -\begin{vmatrix} 2 & 1 \\ 1 & 2 \end{vmatrix} = -3$, $A_{13} = \begin{vmatrix} 2 & 1 \\ 1 & 3 \end{vmatrix} = 5$. $|A| = 1(-1) + 1(-3) + 1(5) = 1$ ✓.`, sol: 'Signs +, −, + along row 1.', scheme: [['Three cofactors', 1], ['|A| = 1 verified', 1]], d: 2, c: 'understanding', t: [3], time: 150 }),
    ]),
  ],
}, (C) => {
  C.assert(eqM(adj(A_c01), [[-1, 1, 0], [-3, 1, 1], [5, -2, -1]]), 'adj typed');
  C.child('a').key('a');
  C.child('b').val(det(A_c01));
  const X = solve(A_c01, B_c01);
  C.assert(eqv(X, [250, 350, 400]), `X = ${X}`);
  C.child('c').model(X);
  C.child('cii').model([cof(A_c01, 1, 1), cof(A_c01, 1, 2), cof(A_c01, 1, 3)]);
});
const A_c02 = [[3, 2], [1, 2]];
caseQ('c02', {
  passage: r`A farmer near Ludhiana uses two fertilisers. One bag of fertiliser F1 gives $3$ kg of nitrogen and $1$ kg of phosphate; one bag of F2 gives $2$ kg of nitrogen and $2$ kg of phosphate. His wheat field needs exactly $24$ kg of nitrogen and $12$ kg of phosphate. He buys $x$ bags of F1 and $y$ bags of F2, so $3x + 2y = 24$ and $x + 2y = 12$, written $AX = B$.`,
  d: 3, c: 'application',
  model: r`(a) Option (a). (b) $|A| = 4$. (c) (i) $x = 6$, $y = 3$. Or (ii) $x = 8$, $y = 3$.`,
  sol: r`(a) Coefficients of x and y row by row. (b) $6 - 2 = 4$. (c) $X = \dfrac14\begin{bmatrix} 2 & -2 \\ -1 & 3 \end{bmatrix}B$.`,
  children: [
    child('a', mk.mcq({ stem: 'The matrix $A$ is', opts: [r`$\begin{bmatrix} 3 & 2 \\ 1 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} 3 & 1 \\ 2 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} 24 & 12 \\ 3 & 1 \end{bmatrix}$`, r`$\begin{bmatrix} 3 & 2 \\ 2 & 1 \end{bmatrix}$`], key: 'a', sol: 'Row 1 holds the coefficients of the nitrogen equation, row 2 those of the phosphate equation. Option (b) is the transpose.', d: 1, c: 'understanding', t: [4], time: 60 })),
    child('b', mk.num({ stem: 'Find |A|.', value: 4, sol: r`$|A| = 3 \times 2 - 2 \times 1 = 4$.`, scheme: [['4', 1]], d: 1, c: 'understanding', t: [1], time: 45 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find $A^{-1}$ and hence the number of bags of each fertiliser.', model: r`$A^{-1} = \dfrac14\begin{bmatrix} 2 & -2 \\ -1 & 3 \end{bmatrix}$. $X = A^{-1}B = \dfrac14\begin{bmatrix} 48 - 24 \\ -24 + 36 \end{bmatrix} = \dfrac14\begin{bmatrix} 24 \\ 12 \end{bmatrix}$: $x = 6$ bags of F1, $y = 3$ bags of F2.`, sol: 'Inverse by the adjoint, then X = A⁻¹B.', scheme: [['A⁻¹', 1], ['6 bags and 3 bags', 1]], d: 2, c: 'application', t: [4, 3], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** A second field needs $30$ kg of nitrogen and $14$ kg of phosphate. Using the same $A^{-1}$, find the number of bags of each fertiliser for it.', model: r`$A^{-1} = \dfrac14\begin{bmatrix} 2 & -2 \\ -1 & 3 \end{bmatrix}$, $X = \dfrac14\begin{bmatrix} 60 - 28 \\ -30 + 42 \end{bmatrix} = \dfrac14\begin{bmatrix} 32 \\ 12 \end{bmatrix}$: $x = 8$ bags of F1, $y = 3$ bags of F2.`, sol: 'Same inverse, new right-hand side.', scheme: [['X = A⁻¹B with the new B', 1], ['8 bags and 3 bags', 1]], d: 3, c: 'application', t: [4], time: 150 }),
    ]),
  ],
}, (C) => {
  C.assert(eqM(adj(A_c02), [[2, -2], [-1, 3]]), 'adj');
  C.child('a').key('a');
  C.child('b').val(det(A_c02));
  C.child('c').model(solve(A_c02, [24, 12]));
  C.assert(eqv(solve(A_c02, [24, 12]), [6, 3]) && eqv(solve(A_c02, [30, 14]), [8, 3]), 'bags');
  C.child('cii').model(solve(A_c02, [30, 14]));
});
const gA = [2, 3], gB = [14, 8], gC = [6, 15];
const gardenPlot = plot({ x: [0, 16], y: [0, 16], xl: 'x (m)', yl: 'y (m)', fns: [{ expr: '3 + 5(x - 2)/12', label: 'path $AB$', domain: [2, 14] }, { expr: '8 - 7(x - 14)/8', label: '$BC$', domain: [6, 14] }, { expr: '3 + 3(x - 2)', label: '$AC$', domain: [2, 6] }], pts: [[2, 3, 'A(2, 3)'], [14, 8, 'B(14, 8)'], [6, 15, 'C(6, 15)'], [8, 5.5, 'L(8, 5.5)']] }, 'A triangular garden drawn on a grid in metres with corners A at 2 comma 3, B at 14 comma 8 and C at 6 comma 15. A lamp post L at 8 comma 5.5 sits on side A B.', 'The garden $ABC$ and the lamp post $L$ on the path $AB$.');
caseQ('c03', {
  passage: r`A triangular garden in Chandigarh is mapped on a grid in metres with corners $A(2, 3)$, $B(14, 8)$ and $C(6, 15)$. A straight footpath runs along $AB$, and a lamp post stands at $L(8, 5.5)$.`,
  assets: [gardenPlot],
  d: 3, c: 'application',
  model: r`(a) Option (a). (b) $62$ m². (c) (i) the determinant is $0$, so $L$ is on $AB$. Or (ii) $3x - y - 3 = 0$.`,
  sol: r`(a) Area formula. (b) $\dfrac12|124|$. (c) (i) Collinearity test. (ii) $\begin{vmatrix} x & y & 1 \\ 2 & 3 & 1 \\ 6 & 15 & 1 \end{vmatrix} = 0$.`,
  children: [
    child('a', mk.mcq({ stem: 'The area of the garden is given by', opts: [r`$\dfrac12\left|\begin{vmatrix} 2 & 3 & 1 \\ 14 & 8 & 1 \\ 6 & 15 & 1 \end{vmatrix}\right|$`, r`$\begin{vmatrix} 2 & 3 & 1 \\ 14 & 8 & 1 \\ 6 & 15 & 1 \end{vmatrix}$`, r`$\dfrac12\begin{vmatrix} 2 & 3 \\ 14 & 8 \end{vmatrix}$`, r`$\dfrac12\left|\begin{vmatrix} 2 & 14 & 6 \\ 3 & 8 & 15 \\ 0 & 0 & 0 \end{vmatrix}\right|$`], key: 'a', sol: 'Half the absolute value of the 3 × 3 vertex determinant with a column of ones. Option (b) forgets the half and the absolute value.', d: 1, c: 'recall', t: [2], time: 60 })),
    child('b', mk.num({ stem: 'Find the area of the garden in square metres.', value: 62, unit: 'm²', sol: r`$2(8 - 15) - 3(14 - 6) + 1(210 - 48) = -14 - 24 + 162 = 124$; area $= 62$ m².`, scheme: [['62', 1]], d: 2, c: 'understanding', t: [2], time: 120 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Using determinants, show that the lamp post $L$ lies on the footpath $AB$.', model: r`$\begin{vmatrix} 2 & 3 & 1 \\ 14 & 8 & 1 \\ 8 & 5.5 & 1 \end{vmatrix} = 2(8 - 5.5) - 3(14 - 8) + 1(77 - 64) = 5 - 18 + 13 = 0$. Zero area, so $A$, $B$, $L$ are collinear: $L$ is on $AB$.`, sol: 'Collinearity by a zero determinant.', scheme: [['Determinant set up and evaluated', 1], ['Equals 0, so collinear', 1]], d: 3, c: 'application', t: [2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Using determinants, find the equation of the side $AC$.', model: r`$\begin{vmatrix} x & y & 1 \\ 2 & 3 & 1 \\ 6 & 15 & 1 \end{vmatrix} = x(3 - 15) - y(2 - 6) + (30 - 18) = -12x + 4y + 12 = 0$, i.e. $3x - y - 3 = 0$.`, sol: 'A general point (x, y) collinear with A and C.', scheme: [['Determinant set to 0', 1], ['3x − y − 3 = 0', 1]], d: 3, c: 'application', t: [2], time: 150 }),
    ]),
  ],
}, (C) => {
  C.child('a').key('a');
  C.child('b').val(area(gA, gB, gC));
  C.assert(triDet(gA, gB, [8, 5.5]) === 0, 'L collinear');
  C.child('c').model([0, 5, 18, 13]);
  const g = (x, y) => triDet([x, y], gA, gC);
  C.assert([[0, 0], [1, 0], [0, 1]].every(([x, y]) => Math.abs(g(x, y) - (-12 * x + 4 * y + 12)) < 1e-9), 'AC line');
  C.child('cii').model(['3x - y - 3 = 0']);
});
const A_c04 = [[2, 3, 1], [1, 2, 2], [3, 1, 2]], B_c04 = [1250, 1000, 1450];
caseQ('c04', {
  passage: r`At a kabaddi league match in Chennai, tickets are sold in three classes: adult (₹$x$), student (₹$y$) and senior citizen (₹$z$). In one hour, counter 1 sold $2$ adult, $3$ student and $1$ senior ticket for ₹$1250$; counter 2 sold $1$, $2$ and $2$ for ₹$1000$; counter 3 sold $3$, $1$ and $2$ for ₹$1450$. The system is $AX = B$ with $A = ${bm(A_c04)}$.`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $11$. (b) $A_{22} = 1$. (c) (i) first row of $\operatorname{adj} A$: $2, -5, 4$; $x = 300$. Or (ii) $y = 150$, $z = 200$.`,
  sol: r`(a) Expansion along row 1. (b) Delete row 2 and column 2. (c) $X = \dfrac{1}{11}(\operatorname{adj} A)B$.`,
  children: [
    child('a', mk.mcq({ stem: 'The value of |A| is', opts: ['$11$', '$-11$', '$21$', '$0$'], key: 'a', sol: r`$2(4 - 2) - 3(2 - 6) + 1(1 - 6) = 4 + 12 - 5 = 11$. Since it is not $0$, the prices are uniquely fixed.`, d: 2, c: 'understanding', t: [1], time: 90 })),
    child('b', mk.num({ stem: 'Find the cofactor $A_{22}$ of $A$.', value: 1, sol: r`$A_{22} = (+1)\begin{vmatrix} 2 & 1 \\ 3 & 2 \end{vmatrix} = 4 - 3 = 1$.`, scheme: [['1', 1]], d: 2, c: 'understanding', t: [3], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the first row of $\\operatorname{adj} A$ and hence the price of an adult ticket.', model: r`Row 1 of $\operatorname{adj} A$ is $(A_{11}, A_{21}, A_{31}) = (2, -5, 4)$. $x = \dfrac{1}{11}(2 \times 1250 - 5 \times 1000 + 4 \times 1450) = \dfrac{3300}{11} = 300$. Adult ticket ₹$300$.`, sol: 'Row 1 of adj A holds the cofactors of column 1.', scheme: [['Row 1 of adj A', 1], ['x = ₹300', 1]], d: 4, c: 'analysis', t: [3, 4], time: 180 }), [
      mk.short({ marks: 2, stem: r`**(ii)** Given $\operatorname{adj} A = ${bm(adj(A_c04))}$, find the prices of a student ticket and a senior citizen ticket.`, model: r`$y = \dfrac{1}{11}(4 \times 1250 + 1 \times 1000 - 3 \times 1450) = \dfrac{1650}{11} = 150$; $z = \dfrac{1}{11}(-5 \times 1250 + 7 \times 1000 + 1 \times 1450) = \dfrac{2200}{11} = 200$. Student ₹$150$, senior citizen ₹$200$.`, sol: 'Rows 2 and 3 of (adj A)B divided by |A|.', scheme: [['y = ₹150', 1], ['z = ₹200', 1]], d: 3, c: 'application', t: [4], time: 180 }),
    ]),
  ],
}, (C) => {
  C.assert(det(A_c04) === 11 && eqM(adj(A_c04), [[2, -5, 4], [4, 1, -3], [-5, 7, 1]]), 'det, adj');
  C.child('a').which([11, -11, 21, 0], det(A_c04));
  C.child('b').val(cof(A_c04, 2, 2));
  const X = solve(A_c04, B_c04);
  C.assert(eqv(X, [300, 150, 200]), `X = ${X}`);
  C.child('c').model([2, 5, 4, 3300, X[0]]);
  C.child('cii').model([1650, 2200, X[1], X[2]]);
});

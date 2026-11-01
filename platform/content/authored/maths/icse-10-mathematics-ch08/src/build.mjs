// Build ICSE 10 Mathematics ch08 Matrices. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch08/src/build.mjs
// Every matrix on the slides, in the notes, tables and figures is computed with mat.mjs (exact integer
// arithmetic) and asserted against the literal value typed in the text; the build stops on any mismatch.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { mat, M, bm, key, mul, add, sub, scal, sq, I2, O, eqM, isRow, isCol, isSquare, isZero, isIdentity, canAdd, prodOrder, prodWork, entryWork, solveInt, rows, cols, order } from './mat.mjs';

setUnit('icse-10-mathematics-ch08');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const is = (A, s) => key(A) === key(mat(s));
const pn = (v) => (v < 0 ? `(${v})` : `${v}`);
/** Element-by-element working for A + B or A - B as a bmatrix. */
const opWork = (A, B, op) => `\\begin{bmatrix} ${A.map((row, i) => row.map((a, j) => `${a} ${op} ${pn(B[i][j])}`).join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;

// ---------------------------------------------------------------- deck 1 visuals and worked examples
const canteen = mat('30 18; 25 22');
const glance = table(['Day', 'Idli', 'Dosa'], [['Monday', '30', '18'], ['Tuesday', '25', '22']], 'Table of plates sold at an imagined school canteen: on Monday 30 idli and 18 dosa, on Tuesday 25 idli and 22 dosa. Written as a matrix with one row per day and one column per dish, it has 2 rows and 2 columns.', `The same numbers as a matrix: $${bm(canteen)}$, order $${order(canteen)}$.`);
must(order(canteen) === '2 \\times 2', 'canteen');
const P1 = mat('3 -5; 0 8');
const positionTable = table(['', 'Column 1', 'Column 2'], [['Row 1', '$a_{11} = 3$', '$a_{12} = -5$'], ['Row 2', '$a_{21} = 0$', '$a_{22} = 8$']], 'Table naming the elements of the matrix with rows 3, minus 5 and 0, 8: the element a one one in row 1 and column 1 is 3; a one two is minus 5; a two one is 0; a two two is 8. The first number in the name is the row, the second the column.', `Element positions in $${bm(P1)}$: row first, then column.`);
must(P1[0][0] === 3 && P1[0][1] === -5 && P1[1][0] === 0 && P1[1][1] === 8, 'positions');
const orderEx = ['6 -1 2', '4; 9', '2 0; -3 5', '1 0 4; -2 7 3'].map(mat);
const orderTable = table(['Matrix', 'Rows', 'Columns', 'Order'], orderEx.map((A) => [`$${bm(A)}$`, `${rows(A)}`, `${cols(A)}`, `$${order(A)}$`]), 'Table of four matrices and their orders: a matrix with one row of three numbers has order 1 by 3; a matrix with one column of two numbers has order 2 by 1; a matrix with two rows and two columns has order 2 by 2; a matrix with two rows of three numbers has order 2 by 3.', 'Order $=$ rows $\\times$ columns, always rows first.');
must(orderEx.map((A) => `${rows(A)}x${cols(A)}`).join() === '1x3,2x1,2x2,2x3', 'orders');
const typeEx = [['Row matrix', 'only one row', '3 -2'], ['Column matrix', 'only one column', '5; 1'], ['Square matrix', 'as many rows as columns', '4 1; -6 2'], ['Zero (null) matrix', 'every element is $0$', '0 0; 0 0'], ['Identity matrix $I$', 'square; $1$ on the leading diagonal, $0$ elsewhere', '1 0; 0 1']];
must(isRow(mat(typeEx[0][2])) && isCol(mat(typeEx[1][2])) && isSquare(mat(typeEx[2][2])) && !isIdentity(mat(typeEx[2][2])) && isZero(mat(typeEx[3][2])) && isIdentity(mat(typeEx[4][2])), 'types');
const typesTable = table(['Type', 'What makes it', 'Example'], typeEx.map(([t, w, s]) => [t, w, `$${M(s)}$`]), 'Table of types of matrix: a row matrix has only one row, for example 3 and minus 2; a column matrix has only one column, for example 5 over 1; a square matrix has as many rows as columns; a zero or null matrix has every element 0; the identity matrix is square with 1 on the leading diagonal and 0 elsewhere.', 'Five types of matrix used in this chapter.');
const typesFlow = flow('TB', [['q', 'Count the rows and the columns'], ['r', 'One row: **row matrix**'], ['c', 'One column: **column matrix**'], ['s', 'Rows $=$ columns: **square matrix**'], ['i', '$1$ on the leading diagonal, $0$ elsewhere: **identity matrix**'], ['z', 'Every element $0$: **zero matrix** (any order)']], [['q', 'r'], ['q', 'c'], ['q', 's'], ['s', 'i', 'special case'], ['q', 'z']], 'Flow chart for naming a matrix: count the rows and columns. One row gives a row matrix; one column gives a column matrix; equal numbers of rows and columns give a square matrix, and a square matrix with 1 on the leading diagonal and 0 elsewhere is the identity matrix. A matrix whose elements are all 0 is a zero matrix of any order.', 'Naming a matrix by its shape and its elements.');
const eqPairs = [['2 5; -1 0', '2 5; -1 0'], ['2 5', '2; 5'], ['3 1; 0 4', '3 0; 1 4']].map(([a, b]) => [mat(a), mat(b)]);
must(eqM(...eqPairs[0]) && !canAdd(...eqPairs[1]) && !eqM(...eqPairs[2]) && canAdd(...eqPairs[2]), 'equal or not');
const eqTable = table(['Pair', 'Equal?', 'Why'], [[`$${bm(eqPairs[0][0])}$ and $${bm(eqPairs[0][1])}$`, 'yes', 'same order, same element in every position'], [`$${bm(eqPairs[1][0])}$ and $${bm(eqPairs[1][1])}$`, 'no', 'orders $1 \\times 2$ and $2 \\times 1$ differ'], [`$${bm(eqPairs[2][0])}$ and $${bm(eqPairs[2][1])}$`, 'no', 'same order, but the elements in two positions differ']], 'Table of three pairs of matrices: the first pair is equal because the orders and all elements match; the second pair holds the same numbers 2 and 5 but one is a row and the other a column, so they are not equal; in the third pair the orders match but the elements in two positions differ, so they are not equal.', 'Equal matrices: same order and equal corresponding elements.');
// WE1: [[x + y, -2], [6, x - y]] = [[11, -2], [6, 3]]
const [w1x, w1y] = solveInt(1, 1, 11, 1, -1, 3);
must(w1x === 7 && w1y === 4 && 2 * w1x === 14, 'we1');
const we1Plot = plot({ x: [0, 12], y: [-3, 12], fns: ['11 - x', 'x - 3'], pts: [[7, 4, '(7, 4)']] }, 'Graph of the two straight lines x plus y equals 11, falling from left to right, and x minus y equals 3, rising from left to right. They cross at the point (7, 4), so x equals 7 and y equals 4 satisfy both equations.', 'The two equations from equal elements meet at $(7, 4)$.');
const equalTable = table(['Position', 'Left', 'Right', 'Equation'], [['Row 1, column 1', '$x + y$', '$11$', '$x + y = 11$'], ['Row 1, column 2', '$-2$', '$-2$', 'already equal'], ['Row 2, column 1', '$6$', '$6$', 'already equal'], ['Row 2, column 2', '$x - y$', '$3$', '$x - y = 3$']], 'Table matching positions in the worked example: row 1 column 1 gives x plus y equals 11; row 2 column 2 gives x minus y equals 3; the other two positions already hold equal numbers, minus 2 and 6.', 'One equation for each position that holds an unknown.');
const addFlow = flow('LR', [['q', 'Do $A$ and $B$ have the same order?'], ['y', 'Add or subtract corresponding elements; the result has the same order'], ['n', '$A + B$ and $A - B$ are not defined']], [['q', 'y', 'yes'], ['q', 'n', 'no']], 'Flow chart for adding or subtracting matrices: first ask whether A and B have the same order. If yes, add or subtract the elements in corresponding positions, and the answer has the same order. If no, the sum and the difference are not defined.', 'Compatibility for addition and subtraction.');
// WE2: A + B and A - B
const W2A = mat('4 -3; 0 7'), W2B = mat('-2 5; 3 -6');
must(is(add(W2A, W2B), '2 2; 3 1') && is(sub(W2A, W2B), '6 -8; -3 13'), 'we2');
const we2Table = table(['', 'Element by element', 'Result'], [['$A + B$', `$${opWork(W2A, W2B, '+')}$`, `$${M('2 2; 3 1')}$`], ['$A - B$', `$${opWork(W2A, W2B, '-')}$`, `$${M('6 -8; -3 13')}$`]], 'Working table for A equal to the matrix with rows 4, minus 3 and 0, 7 and B with rows minus 2, 5 and 3, minus 6: adding corresponding elements gives rows 2, 2 and 3, 1; subtracting gives rows 6, minus 8 and minus 3, 13.', 'Add or subtract position by position; watch the signs.');
// data tables: an imagined library, books issued per class in two weeks
const lib1 = mat('12 9; 7 15'), lib2 = mat('10 6; 11 8'), libT = add(lib1, lib2);
must(is(libT, '22 15; 18 23'), 'library');
const dataTable = table(['Class', 'Fiction (week 1 + week 2)', 'Non-fiction (week 1 + week 2)'], [0, 1].map((i) => [`Class ${9 + i}`, `$${lib1[i][0]} + ${lib2[i][0]} = ${libT[i][0]}$`, `$${lib1[i][1]} + ${lib2[i][1]} = ${libT[i][1]}$`]), 'Table of books issued by an imagined school library: Class 9 borrowed 12 and then 10 fiction books, 22 in all, and 9 and then 6 non-fiction books, 15 in all; Class 10 borrowed 7 and 11 fiction books, 18 in all, and 15 and 8 non-fiction books, 23 in all.', `Adding the two weekly matrices: $${bm(lib1)} + ${bm(lib2)} = ${bm(libT)}$.`);
const sc1 = mat('2 -1; 0 4'), sc2 = mat('8 -2; 6 4'), sc3 = mat('1 -4; 3 2');
must(is(scal(3, sc1), '6 -3; 0 12') && is(scal([1, 2], sc2), '4 -1; 3 2') && eqM(add(sc3, O(2)), sc3) && isZero(add(sc3, scal(-1, sc3))), 'scalar table');
const scalarTable = table(['Rule', 'Example'], [['$kA$: multiply every element by $k$', `$3${bm(sc1)} = ${M('6 -3; 0 12')}$`], ['$k$ may be any non-zero rational number', `$\\dfrac{1}{2}${bm(sc2)} = ${M('4 -1; 3 2')}$`], ['$A + O = A$', `$${bm(sc3)} + ${bm(O(2))} = ${bm(sc3)}$`], ['$A + (-A) = O$', `$${bm(sc3)} + ${M('-1 4; -3 -2')} = ${bm(O(2))}$`]], 'Table of rules: to find k times A multiply every element by k, so 3 times the matrix with rows 2, minus 1 and 0, 4 has rows 6, minus 3 and 0, 12; k may be a fraction such as one half; adding the zero matrix changes nothing; adding minus A to A gives the zero matrix.', 'Scalar multiples, the zero matrix and the negative of a matrix.');
must(is(scal(-1, sc3), '-1 4; -3 -2'), 'minus A');
// WE3: 3P - (1/2)Q
const W3P = mat('2 0; -1 3'), W3Q = mat('4 -6; 2 8');
const w3a = scal(3, W3P), w3b = scal([1, 2], W3Q), w3 = sub(w3a, w3b);
must(is(w3a, '6 0; -3 9') && is(w3b, '2 -3; 1 4') && is(w3, '4 3; -4 5'), 'we3');
const we3Table = table(['Step', 'Result'], [['$3P$', `$${M('6 0; -3 9')}$`], ['$\\dfrac{1}{2}Q$', `$${M('2 -3; 1 4')}$`], ['$3P - \\dfrac{1}{2}Q$', `$${opWork(w3a, w3b, '-')} = ${M('4 3; -4 5')}$`]], 'Working table: 3 P has rows 6, 0 and minus 3, 9; one half of Q has rows 2, minus 3 and 1, 4; subtracting element by element gives rows 4, 3 and minus 4, 5.', 'Scalar multiples first, then subtract.');
// WE4: 2A + X = B
const W4A = mat('4 -2; 1 3'), W4B = mat('5 1; -2 10');
const w4a = scal(2, W4A), w4 = sub(W4B, w4a);
must(is(w4a, '8 -4; 2 6') && is(w4, '-3 5; -4 4') && eqM(add(w4a, w4), W4B), 'we4');
const we4Table = table(['Step', 'Working'], [['Make $X$ the subject', '$X = B - 2A$'], ['$2A$', `$${M('8 -4; 2 6')}$`], ['$X = B - 2A$', `$${opWork(W4B, w4a, '-')} = ${M('-3 5; -4 4')}$`], ['Check $2A + X$', `$${M('8 -4; 2 6')} + ${M('-3 5; -4 4')} = ${bm(W4B)}$`]], 'Working table for 2A plus X equals B: make X the subject, X equals B minus 2A; 2A has rows 8, minus 4 and 2, 6; subtracting from B gives X with rows minus 3, 5 and minus 4, 4; adding 2A and X gives back B.', 'Treat the matrix equation like a linear equation.');
const sum1 = table(['Idea', 'Key fact'], [['Order', '$m \\times n$: $m$ rows, $n$ columns ($mn$ elements)'], ['Types', 'row, column, square, zero (null), identity $I$'], ['Equality', 'same order and equal corresponding elements'], ['Addition and subtraction', 'only for the same order; work element by element'], ['Scalar multiple $kA$', 'multiply every element by $k$'], ['Matrix equations', 'e.g. $2A + X = B$ gives $X = B - 2A$']], 'Summary table for part 1: order is rows by columns; the types are row, column, square, zero and identity; equal matrices have the same order and equal corresponding elements; only matrices of the same order can be added or subtracted; k times A multiplies every element by k; matrix equations are solved like linear equations.', 'Part 1 on one card.');

// ---------------------------------------------------------------- deck 2 visuals and worked examples
const mulFlow = flow('LR', [['a', '$A$: order $m \\times n$'], ['b', '$B$: order $n \\times p$'], ['c', 'Columns of $A$ $=$ rows of $B$: $AB$ is defined'], ['d', '$AB$ has order $m \\times p$']], [['a', 'c'], ['b', 'c'], ['c', 'd']], 'Flow chart for multiplying matrices: A has order m by n and B has order n by p. When the number of columns of A equals the number of rows of B, the product A times B is defined, and it has order m by p.', 'Compatibility for multiplication.');
const compat = [[[2, 2], [2, 2]], [[2, 2], [2, 1]], [[1, 2], [2, 2]], [[2, 1], [2, 2]], [[2, 2], [1, 2]]].map(([a, b]) => { const p = prodOrder(a, b); return [`$${a[0]} \\times ${a[1]}$`, `$${b[0]} \\times ${b[1]}$`, p ? 'yes' : 'no', p ? `$${p[0]} \\times ${p[1]}$` : 'not defined']; });
must(compat.map((x) => x[2]).join() === 'yes,yes,yes,no,no', 'compat');
const compatTable = table(['First matrix', 'Second matrix', 'Product defined?', 'Order of product'], compat, 'Table of orders: 2 by 2 times 2 by 2 is defined and gives 2 by 2; 2 by 2 times 2 by 1 gives 2 by 1; 1 by 2 times 2 by 2 gives 1 by 2; but 2 by 1 times 2 by 2, and 2 by 2 times 1 by 2, are not defined because the inner numbers differ.', 'Inner numbers must match; the outer numbers give the order.');
const ruleTable = table(['Element of $AB$', 'Row of $A$', 'Column of $B$', 'Value'], [['Row 1, column 1', '$a, b$', '$p, r$', '$ap + br$'], ['Row 1, column 2', '$a, b$', '$q, s$', '$aq + bs$'], ['Row 2, column 1', '$c, d$', '$p, r$', '$cp + dr$'], ['Row 2, column 2', '$c, d$', '$q, s$', '$cq + ds$']], 'Table of the row by column rule for A with rows a, b and c, d and B with rows p, q and r, s: the element in row 1 column 1 of A times B is a p plus b r; row 1 column 2 is a q plus b s; row 2 column 1 is c p plus d r; row 2 column 2 is c q plus d s.', 'Each element of $AB$: a row of $A$ times a column of $B$.');
// WE1 (deck 2): juice stall, 2 x 2 by 2 x 1
const J1S = mat('40 25; 55 30'), J1P = mat('30; 50'), J1 = mul(J1S, J1P);
must(is(J1, '2450; 3150') && 40 * 30 === 1200 && 25 * 50 === 1250, 'deck 2 we1');
const juiceTable = table(['Day', 'Row of $S$ times $P$', 'Takings (₹)'], [['Saturday', `$${entryWork(J1S, J1P, 1, 1)} = ${J1[0][0]}$`, `${J1[0][0]}`], ['Sunday', `$${entryWork(J1S, J1P, 2, 1)} = ${J1[1][0]}$`, `${J1[1][0]}`]], 'Working table for an imagined juice stall: on Saturday 40 small cups at 30 rupees and 25 large cups at 50 rupees give 2450 rupees; on Sunday 55 small and 30 large cups give 3150 rupees.', 'Each row of $SP$ is one day\'s takings.');
// WE2 (deck 2): AB and BA
const W2a = mat('3 -1; 2 4'), W2b = mat('0 2; 1 -3');
must(is(mul(W2a, W2b), '-1 9; 4 -8') && is(mul(W2b, W2a), '4 8; -3 -13'), 'deck 2 we2');
const prodTable = table(['Product', 'Row-by-column working', 'Result'], [['$AB$', `$${prodWork(W2a, W2b)}$`, `$${M('-1 9; 4 -8')}$`], ['$BA$', `$${prodWork(W2b, W2a)}$`, `$${M('4 8; -3 -13')}$`]], 'Working table for A with rows 3, minus 1 and 2, 4 and B with rows 0, 2 and 1, minus 3: A times B has rows minus 1, 9 and 4, minus 8, while B times A has rows 4, 8 and minus 3, minus 13. The two products are different.', 'Same two matrices, different products.');
const commTable = table(['Position', '$AB$', '$BA$'], [[1, 1], [1, 2], [2, 1], [2, 2]].map(([i, j]) => [`Row ${i}, column ${j}`, `$${mul(W2a, W2b)[i - 1][j - 1]}$`, `$${mul(W2b, W2a)[i - 1][j - 1]}$`]), 'Table comparing the products from the worked example position by position: row 1 column 1 is minus 1 in A times B but 4 in B times A; row 1 column 2 is 9 against 8; row 2 column 1 is 4 against minus 3; row 2 column 2 is minus 8 against minus 13. No position agrees.', 'In general $AB \\ne BA$: the order of the factors matters.');
const IdA = mat('5 -2; 3 7');
must(eqM(mul(IdA, I2), IdA) && eqM(mul(I2, IdA), IdA), 'identity');
const identityTable = table(['Product', 'Working', 'Result'], [['$AI$', `$${prodWork(IdA, I2)}$`, `$${bm(IdA)}$`], ['$IA$', `$${prodWork(I2, IdA)}$`, `$${bm(IdA)}$`]], 'Working table for A with rows 5, minus 2 and 3, 7: multiplying by the identity matrix on the right or on the left gives A back, because every product with 0 vanishes and every product with 1 keeps the element.', '$AI = IA = A$: the identity matrix acts like the number $1$.');
const ZA = mat('1 -1; -2 2'), ZB = mat('3 1; 3 1');
must(isZero(mul(ZA, ZB)) && is(mul(ZB, ZA), '1 -1; 1 -1') && !isZero(ZA) && !isZero(ZB), 'zero product');
const zeroTable = table(['Product', 'Working', 'Result'], [['$AB$', `$${prodWork(ZA, ZB)}$`, `$${M('0 0; 0 0')}$`], ['$BA$', `$${prodWork(ZB, ZA)}$`, `$${M('1 -1; 1 -1')}$`]], 'Working table for A with rows 1, minus 1 and minus 2, 2 and B with rows 3, 1 and 3, 1: every element of A times B is 0, so A times B is the zero matrix although neither A nor B is zero; B times A has rows 1, minus 1 and 1, minus 1.', 'Two non-zero matrices with $AB = O$.');
const factsTable = table(['For numbers', 'For square matrices of order 2'], [['$ab = ba$', '$AB \\ne BA$ in general'], ['$ab = 0$ means $a = 0$ or $b = 0$', '$AB = O$ is possible with $A \\ne O$ and $B \\ne O$'], ['$(a + b)^2 = a^2 + 2ab + b^2$', '$(A + B)^2 = A^2 + AB + BA + B^2$'], ['$1 \\times a = a \\times 1 = a$', '$IA = AI = A$']], 'Table comparing numbers with matrices: numbers commute but matrices in general do not; a product of numbers is zero only if a factor is zero, but two non-zero matrices can multiply to the zero matrix; the square of a sum of matrices is A squared plus A B plus B A plus B squared; the identity matrix behaves like the number 1.', 'Rules from algebra that change for matrices.');
// WE3 (deck 2): A^2 - 3A + 5I = O
const W3 = mat('2 3; -1 1');
must(is(sq(W3), '1 9; -3 -2') && is(scal(3, W3), '6 9; -3 3') && isZero(add(sub(sq(W3), scal(3, W3)), scal(5, I2))), 'deck 2 we3');
const we3bTable = table(['Step', 'Result'], [['$A^2$', `$${prodWork(W3, W3)} = ${M('1 9; -3 -2')}$`], ['$3A$', `$${M('6 9; -3 3')}$`], ['$5I$', `$${M('5 0; 0 5')}$`], ['$A^2 - 3A + 5I$', `$\\begin{bmatrix} 1 - 6 + 5 & 9 - 9 + 0 \\\\ -3 - (-3) + 0 & -2 - 3 + 5 \\end{bmatrix} = ${M('0 0; 0 0')}$`]], 'Working table for A with rows 2, 3 and minus 1, 1: A squared has rows 1, 9 and minus 3, minus 2; 3A has rows 6, 9 and minus 3, 3; 5I has 5 on the leading diagonal; combining position by position gives the zero matrix.', 'Square first, then combine element by element.');
must(is(scal(5, I2), '5 0; 0 5'), '5I');
// WE4 (deck 2): unknowns from a product
const W4M = mat('3 1; 1 -2'), W4R = mat('11; -1');
const [u4x, u4y] = solveInt(3, 1, 11, 1, -2, -1);
must(u4x === 3 && u4y === 2 && key(mul(W4M, [[u4x], [u4y]])) === key(W4R) && 7 * 3 === 21 && 11 - 9 === 2, 'deck 2 we4');
const we4Plot = plot({ x: [0, 5], y: [-5, 12], fns: ['11 - 3x', '(x + 1)/2'], pts: [[3, 2, '(3, 2)']] }, 'Graph of the lines 3x plus y equals 11, falling steeply, and x minus 2y equals minus 1, rising gently. They cross at the point (3, 2), so x equals 3 and y equals 2 is the solution of the matrix equation.', 'The two equations from the product meet at $(3, 2)$.');
const sum2 = table(['Idea', 'Key fact'], [['Compatibility', '$AB$ needs columns of $A$ $=$ rows of $B$; order $m \\times p$'], ['Row-by-column rule', 'element $(i, j)$ of $AB$ $=$ row $i$ of $A$ times column $j$ of $B$'], ['Order matters', '$AB \\ne BA$ in general'], ['Identity', '$AI = IA = A$'], ['Zero products', '$AB = O$ does not force $A = O$ or $B = O$'], ['Squares', '$A^2 = A \\times A$, not the square of each element']], 'Summary table for part 2: A times B needs the columns of A to equal the rows of B; each element is a row of A times a column of B; A times B and B times A usually differ; the identity leaves a matrix unchanged; a product can be zero without either factor being zero; A squared is A times A, not the square of each element.', 'Part 2 on one card.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Matrices — Part 1: Order, types, equality, addition and subtraction',
  goals: ['State the order of a matrix and classify it as a row, column, square, zero or identity matrix', 'Use equality of matrices to find unknown elements', 'Decide when two matrices can be added and add or subtract them', 'Multiply a matrix by a rational number and solve equations such as 2A + X = B'],
  slides: [
    sl('title', 'Matrices, Part 1', { b: 'A matrix is a rectangular arrangement of numbers in rows and columns.', v: glance, n: 'Welcome to matrices. A matrix is simply numbers arranged in rows and columns, like a small table. Here an imagined school canteen records the plates of idli and dosa sold on two days. Keeping the numbers in their places lets us add, compare and multiply whole tables at once.' }),
    sl('concept', 'What you will be able to do', { ul: ['State the **order** of a matrix', 'Recognise **row, column, square, zero** and **identity** matrices', 'Use **equality of matrices** to find unknowns', 'Add, subtract and **scalar-multiply** matrices', 'Solve equations such as $2A + X = B$'], n: 'These are your goals for part one. You will name the order and type of a matrix, use equal matrices to find unknown numbers, decide when matrices can be added, and add, subtract and multiply them by numbers. Finally you will solve simple matrix equations.' }),
    sl('concept', 'Rows, columns and elements', { b: 'Each number in a matrix is an **element**. The element in row $i$ and column $j$ is written $a_{ij}$: row first, then column. Matrices are named with capital letters and written inside square brackets.', v: positionTable, n: 'Each number in a matrix is called an element. We name an element by its row and then its column. In this matrix, the element in row one and column two is minus five, and the element in row two and column one is zero. Always say the row first.' }),
    sl('concept', 'The order of a matrix', { b: 'A matrix with $m$ rows and $n$ columns has **order** $m \\times n$ (read "$m$ by $n$") and $mn$ elements.', v: orderTable, n: 'The order of a matrix tells its size: the number of rows, then the number of columns. A matrix with two rows and three columns has order two by three and six elements. Do not swap the numbers: two by three and three by two are different orders.' }),
    sl('check', 'Quick check: order', { b: 'Rows first, then columns.', chk: 'm01', n: 'Count the rows, then the columns, and write them in that order.' }),
    sl('concept', 'Types of matrix', { b: 'A matrix is named by its shape and by its elements.', v: typesTable, n: 'A row matrix has only one row and a column matrix only one column. A square matrix has as many rows as columns. In a zero, or null, matrix every element is zero. The identity matrix is square, with one on the leading diagonal, from top left to bottom right, and zero everywhere else.' }),
    sl('diagram', 'Naming a matrix', { b: 'Shape first, then the elements.', v: typesFlow, n: 'To name a matrix, first count its rows and columns. One row means a row matrix, one column a column matrix, and equal numbers of rows and columns a square matrix. Then look at the elements: all zeros give a zero matrix, and a square matrix with ones on the leading diagonal and zeros elsewhere is the identity.' }),
    sl('check', 'Quick check: square or identity?', { b: 'Look at the leading diagonal and the other elements.', chk: 'tf2', n: 'Is every square matrix an identity matrix? Think of a square matrix with other numbers in it.' }),
    sl('concept', 'Equality of matrices', { b: 'Two matrices are **equal** when they have the **same order** and **every pair of corresponding elements is equal**.', v: eqTable, n: 'Two matrices are equal only when they have the same order and the elements in matching positions are equal. A row holding two and five is not equal to a column holding two and five, because the orders differ. Equality gives one equation for each position.' }),
    sl('example', 'Worked example 1: unknowns from equal matrices', { b: `Find $x$ and $y$ if $\\begin{bmatrix} x + y & -2 \\\\ 6 & x - y \\end{bmatrix} = ${M('11 -2; 6 3')}$.`, ul: ['**Step 1 —** Corresponding elements: $x + y = 11$ and $x - y = 3$.', '**Step 2 —** Add: $2x = 14$, so $x = 7$.', '**Step 3 —** Then $y = 11 - 7 = 4$.', '**Answer —** $x = 7$, $y = 4$.'], v: we1Plot, n: 'The matrices have the same order, so we equate corresponding elements. Row one column one gives x plus y equals eleven. Row two column two gives x minus y equals three. Adding the two equations, two x is fourteen, so x is seven, and then y is four. The graph shows the two lines meeting at seven, four.' }),
    sl('check', 'Quick check: equal matrices', { b: 'Equate the elements in the same position.', chk: 'fb2', n: 'Match the element containing b with the element in the same position on the other side.' }),
    sl('concept', 'Adding and subtracting matrices', { b: 'Matrices of the **same order** are added (or subtracted) by adding (or subtracting) **corresponding elements**. Matrices of different orders cannot be added.', v: addFlow, n: 'Before adding, check the orders. If two matrices have the same order, add the elements in matching positions; the answer has that same order. Subtraction works in the same way. If the orders differ, the sum is simply not defined.' }),
    sl('example', 'Worked example 2: sum and difference', { b: `If $A = ${bm(W2A)}$ and $B = ${bm(W2B)}$, find $A + B$ and $A - B$.`, ul: ['**Step 1 —** Both are $2 \\times 2$, so both answers are defined.', `**Step 2 —** $A + B = ${M('2 2; 3 1')}$.`, `**Step 3 —** $A - B = ${M('6 -8; -3 13')}$.`], v: we2Table, n: 'Both matrices are two by two, so we may add and subtract. Work position by position. Four plus minus two is two, and minus three plus five is two. For the difference, take care with signs: minus three minus five is minus eight, and seven minus minus six is thirteen.' }),
    sl('concept', 'Matrices as data', { b: 'Adding matrices adds whole tables of data in one step.', v: dataTable, n: 'Matrices are useful for data. An imagined school library records the fiction and non fiction books borrowed by two classes in each of two weeks. Adding the two weekly matrices gives the totals for both weeks in one step, position by position.' }),
    sl('concept', 'Multiplying by a number', { b: 'For a number $k$ (an integer or any non-zero rational number), $kA$ is found by multiplying **every element** of $A$ by $k$. The zero matrix $O$ and the negative $-A$ behave like $0$ and $-a$.', v: scalarTable, n: 'To multiply a matrix by a number, multiply every element by that number. The number can be a fraction, such as one half. Adding the zero matrix changes nothing, and adding the negative of a matrix gives the zero matrix, just as with ordinary numbers.' }),
    sl('example', 'Worked example 3: combining scalar multiples', { b: `If $P = ${bm(W3P)}$ and $Q = ${bm(W3Q)}$, find $3P - \\dfrac{1}{2}Q$.`, ul: [`**Step 1 —** $3P = ${M('6 0; -3 9')}$.`, `**Step 2 —** $\\dfrac{1}{2}Q = ${M('2 -3; 1 4')}$.`, `**Answer —** $3P - \\dfrac{1}{2}Q = ${M('4 3; -4 5')}$.`], v: we3Table, n: 'First find each scalar multiple. Three times P multiplies every element by three. Half of Q halves every element. Then subtract position by position. For example, six minus two is four, and zero minus minus three is three.' }),
    sl('example', 'Worked example 4: a matrix equation', { b: `Solve $2A + X = B$ for $X$, where $A = ${bm(W4A)}$ and $B = ${bm(W4B)}$.`, ul: ['**Step 1 —** $X = B - 2A$.', `**Step 2 —** $2A = ${M('8 -4; 2 6')}$.`, `**Answer —** $X = ${M('-3 5; -4 4')}$.`], v: we4Table, n: 'Treat the matrix equation like a linear equation. Subtract two A from both sides, so X equals B minus two A. Double every element of A, then subtract from B position by position. Finally check: two A plus X gives back B.' }),
    sl('check', 'Quick check: one element of a combination', { b: 'You only need one position.', chk: 'n03', n: 'Pick out the elements in row one, column two, and combine just those.' }),
    sl('summary', 'Summary', { ul: ['Order $m \\times n$: rows first, then columns', 'Types: row, column, square, zero (null), identity', 'Equal matrices: same order, equal corresponding elements', 'Add or subtract only matrices of the same order', '$kA$: multiply every element by $k$; solve $2A + X = B$ like a linear equation'], v: sum1, n: 'To sum up part one. The order of a matrix is rows by columns. Matrices are named row, column, square, zero or identity. Equal matrices have the same order and equal corresponding elements. Only matrices of the same order can be added or subtracted, and a scalar multiple multiplies every element.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Finding unknowns (3 marks):** equations from equal elements 1 + each value 1', '**Matrix equation (3 marks):** rearranged 1 + scalar multiple 1 + answer 1', '**Mistake:** writing the order as columns by rows', '**Mistake:** adding matrices of different orders', '**Mistake:** sign slips such as $7 - (-6)$', '**Mistake:** multiplying only one row by the number'], n: 'Write the equations from equal elements before solving them, because each one earns a mark. In a matrix equation, rearrange first, then compute. Most lost marks come from signs, so write a bracket around every negative number you subtract. And remember: a number multiplies every element.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Matrices — Part 2: Multiplication of matrices',
  goals: ['Decide whether two matrices can be multiplied and state the order of the product', 'Multiply a 2 × 2 matrix by a 2 × 2 or 2 × 1 matrix, and a 1 × 2 matrix by a 2 × 2 matrix', 'Show with an example that AB ≠ BA, and use AI = IA = A', 'Find unknowns from matrix products and work with A²'],
  slides: [
    sl('title', 'Matrices, Part 2', { b: 'Multiplying matrices: rows of the first by columns of the second.', v: mulFlow, n: 'Welcome to part two. Multiplying matrices is not done position by position. Instead, each row of the first matrix meets each column of the second. First we learn when a product is defined and what its order is, then how to work it out.' }),
    sl('concept', 'What you will be able to do', { ul: ['Check **compatibility** for multiplication and state the order of a product', 'Use the **row-by-column rule**', 'Show that $AB \\ne BA$ in general, and use $AI = IA = A$', 'Find unknowns from a product', 'Work out $A^2$ and expressions such as $A^2 - 3A + 5I$'], n: 'These are your goals for part two. You will check whether a product is defined, multiply using the row by column rule, and see why the order of multiplication matters. You will also use the identity matrix, find unknowns from a product, and simplify expressions with A squared.' }),
    sl('concept', 'When is a product defined?', { b: '$AB$ is defined only when the **number of columns of $A$ equals the number of rows of $B$**. If $A$ is $m \\times n$ and $B$ is $n \\times p$, then $AB$ is $m \\times p$.', v: compatTable, n: 'Write the two orders side by side. If the inner numbers match, the product is defined, and the outer numbers give its order. A two by two matrix times a two by one matrix gives a two by one matrix. But a two by one matrix times a two by two matrix is not defined.' }),
    sl('check', 'Quick check: order of a product', { b: 'Inner numbers match? Outer numbers give the order.', chk: 'm06', n: 'Write the orders two by two and two by one side by side, then read off the outer numbers.' }),
    sl('concept', 'The row-by-column rule', { b: 'The element in row $i$ and column $j$ of $AB$ is found by multiplying the elements of **row $i$ of $A$** by the corresponding elements of **column $j$ of $B$** and adding.', v: ruleTable, n: 'To find one element of the product, take a row of the first matrix and a column of the second. Multiply first with first and second with second, then add. Row one with column one gives the top left element, row one with column two the top right, and so on.' }),
    sl('example', 'Worked example 1: a stall\'s takings', { b: `An imagined juice stall sells small cups at ₹30 and large cups at ₹50. It sells $40$ small and $25$ large on Saturday, and $55$ small and $30$ large on Sunday. Find $SP$ for $S = ${bm(J1S)}$ and $P = ${bm(J1P)}$.`, ul: ['**Step 1 —** $S$ is $2 \\times 2$ and $P$ is $2 \\times 1$, so $SP$ is $2 \\times 1$.', `**Step 2 —** $SP = ${prodWork(J1S, J1P)}$.`, `**Answer —** $SP = ${M('2450; 3150')}$: ₹2,450 on Saturday and ₹3,150 on Sunday.`], v: juiceTable, n: 'Check the orders first: two by two times two by one gives a two by one matrix, one row for each day. Saturday\'s row times the price column gives forty times thirty plus twenty five times fifty, which is two thousand four hundred and fifty rupees. Sunday gives three thousand one hundred and fifty rupees.' }),
    sl('example', 'Worked example 2: multiplying in both orders', { b: `If $A = ${bm(W2a)}$ and $B = ${bm(W2b)}$, find $AB$ and $BA$.`, ul: [`**Step 1 —** $AB = ${prodWork(W2a, W2b)} = ${M('-1 9; 4 -8')}$.`, `**Step 2 —** $BA = ${prodWork(W2b, W2a)} = ${M('4 8; -3 -13')}$.`, '**Conclusion —** $AB \\ne BA$.'], v: prodTable, n: 'For A times B, row one of A, three and minus one, meets column one of B, zero and one, giving minus one. Continue for the other three positions. Then multiply the other way round, B times A. The answers are completely different, so the order of multiplication matters.' }),
    sl('check', 'Quick check: one element of a product', { b: 'Row 1 of the first, column 2 of the second.', chk: 'fb6', n: 'Use row one of the first matrix and column two of the second: multiply in pairs and add.' }),
    sl('concept', 'Order matters: AB and BA', { b: 'Matrix multiplication is **not commutative**: in general $AB \\ne BA$. Sometimes only one of the two products is even defined.', v: commTable, n: 'Compare the two products from the worked example position by position. Not a single element agrees. So with matrices we must always keep the order of the factors. Sometimes only one order is defined at all, as with a two by two matrix and a column matrix.' }),
    sl('check', 'Quick check: true or false?', { b: 'One counter-example is enough.', chk: 'tf3', n: 'Decide whether A times B always equals B times A. Remember the worked example.' }),
    sl('concept', 'The identity matrix', { b: `For every square matrix $A$ of order $2$, $AI = IA = A$, where $I = ${M('1 0; 0 1')}$.`, v: identityTable, n: 'The identity matrix behaves like the number one. Multiply any two by two matrix by the identity, on the left or on the right, and you get the same matrix back. The zeros remove the unwanted products and the ones keep each element.' }),
    sl('concept', 'A product can be zero', { b: 'For matrices, $AB = O$ does **not** mean $A = O$ or $B = O$.', v: zeroTable, n: 'With numbers, if a product is zero then one factor must be zero. Not so with matrices. Here neither A nor B is the zero matrix, yet A times B is the zero matrix. And B times A is not zero, another reminder that order matters.' }),
    sl('diagram', 'Algebra that changes for matrices', { b: 'Keep $AB$ and $BA$ apart when you expand.', v: factsTable, n: 'Some rules of algebra change for matrices. Matrices do not commute in general. A product can be zero with neither factor zero. So the square of A plus B is A squared plus A B plus B A plus B squared, not A squared plus two A B plus B squared. The identity still acts like one.' }),
    sl('example', 'Worked example 3: an expression in A squared', { b: `If $A = ${bm(W3)}$, show that $A^2 - 3A + 5I = O$.`, ul: [`**Step 1 —** $A^2 = A \\times A = ${M('1 9; -3 -2')}$.`, `**Step 2 —** $3A = ${M('6 9; -3 3')}$ and $5I = ${M('5 0; 0 5')}$.`, '**Step 3 —** Combine position by position: every element is $0$, so the result is $O$.'], v: we3bTable, n: 'A squared means A times A, using the row by column rule, not squaring each element. Then find three A and five I. Combine the three matrices position by position. Every element comes to zero, so the expression is the zero matrix.' }),
    sl('check', 'Quick check: a square', { b: 'Row by column, not element by element.', chk: 'm12', n: 'Multiply the matrix by itself using rows and columns; do not square each element.' }),
    sl('example', 'Worked example 4: unknowns from a product', { b: `Find $x$ and $y$ if $${bm(W4M)} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = ${bm(W4R)}$.`, ul: ['**Step 1 —** Multiply out: $3x + y = 11$ and $x - 2y = -1$.', '**Step 2 —** Double the first and add the second: $7x = 21$, so $x = 3$.', '**Answer —** $y = 11 - 9 = 2$; so $x = 3$, $y = 2$.'], v: we4Plot, n: 'Multiply out the left side: the top row gives three x plus y, and the bottom row gives x minus two y. Equate these with eleven and minus one. Doubling the first equation and adding the second, seven x is twenty one, so x is three, and then y is two. The two lines on the graph meet at three, two.' }),
    sl('summary', 'Summary', { ul: ['$AB$ is defined when columns of $A$ $=$ rows of $B$; $(m \\times n)(n \\times p)$ gives $m \\times p$', 'Row-by-column rule for each element', '$AB \\ne BA$ in general; $AB = O$ is possible with $A, B \\ne O$', '$AI = IA = A$', '$A^2 = A \\times A$; find unknowns by multiplying out and equating'], v: sum2, n: 'To sum up part two. A product is defined when the columns of the first equal the rows of the second. Each element is a row times a column. The order of multiplication matters, a product can be zero without zero factors, and the identity leaves a matrix unchanged. A squared means A times A.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Product (2–3 marks):** working shown 1 + each correct row or element 1', '**Show that ... (3–4 marks):** $A^2$ 1–2 + other terms 1 + conclusion 1', '**Mistake:** multiplying corresponding elements instead of rows by columns', '**Mistake:** assuming $AB = BA$, or expanding $(A + B)^2$ as $A^2 + 2AB + B^2$', '**Mistake:** squaring each element to get $A^2$', '**Mistake:** forgetting to check the orders first'], n: 'Show the row by column working for at least one element, because method marks depend on it. Check the orders before you multiply, and state the order of the answer. Never assume that A times B equals B times A. And A squared is A times A, never the square of each element.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch08', version: 1, title: 'Matrices — chapter notes', language: 'en',
  sections: [
    { heading: '1. Matrices and their order', body_md: r`A **matrix** is a rectangular arrangement of numbers in rows and columns, written inside square brackets and named with a capital letter. Each number is an **element**; $a_{ij}$ is the element in row $i$ and column $j$.

- A matrix with $m$ rows and $n$ columns has **order** $m \times n$ (rows first) and $mn$ elements.
- $${M('6 -1 2')}$ has order $1 \times 3$; $${M('4; 9')}$ has order $2 \times 1$; $${M('2 0; -3 5')}$ has order $2 \times 2$.

*Example:* a canteen's sales over two days, with one row per day and one column per dish, form a $2 \times 2$ matrix.`, key_terms: [{ term: 'Matrix', definition_md: 'A rectangular arrangement of numbers in rows and columns.' }, { term: 'Element', definition_md: 'One number in a matrix; $a_{ij}$ is in row $i$, column $j$.' }, { term: 'Order', definition_md: 'Rows $\\times$ columns, written $m \\times n$.' }], formulas: [{ latex: '\\text{order} = m \\times n, \\quad \\text{number of elements} = mn', label: 'Order and size' }], visual: orderTable, visuals: [positionTable, glance], topic_ids: [topic(1)] },
    { heading: '2. Types of matrices', body_md: r`- **Row matrix:** only one row, e.g. $${M('3 -2')}$.
- **Column matrix:** only one column, e.g. $${M('5; 1')}$.
- **Square matrix:** as many rows as columns, e.g. order $2 \times 2$.
- **Zero (null) matrix** $O$: every element is $0$ (any order).
- **Identity matrix** $I$: a square matrix with $1$ on the leading diagonal (top left to bottom right) and $0$ elsewhere; of order $2$ it is $I = ${M('1 0; 0 1')}$.

Every identity matrix is square, but a square matrix need not be an identity matrix.`, key_terms: [{ term: 'Row matrix', definition_md: 'A matrix with only one row (order $1 \\times n$).' }, { term: 'Column matrix', definition_md: 'A matrix with only one column (order $m \\times 1$).' }, { term: 'Square matrix', definition_md: 'A matrix with as many rows as columns.' }, { term: 'Zero (null) matrix', definition_md: 'A matrix whose elements are all $0$, written $O$.' }, { term: 'Identity matrix', definition_md: 'A square matrix with $1$ on the leading diagonal and $0$ elsewhere, written $I$.' }], formulas: [{ latex: `I = ${M('1 0; 0 1')}, \\quad O = ${M('0 0; 0 0')}`, label: 'Identity and zero matrices of order 2' }], visual: typesTable, visuals: [typesFlow], topic_ids: [topic(1)] },
    { heading: '3. Equality of matrices', body_md: r`Two matrices are **equal** when they have the **same order** and **equal corresponding elements**. Equality gives one equation for each position, which is how unknowns are found.

*Example:* $\begin{bmatrix} x + y & -2 \\ 6 & x - y \end{bmatrix} = ${M('11 -2; 6 3')}$ gives $x + y = 11$ and $x - y = 3$, so $x = 7$ and $y = 4$.

$${M('2 5')}$ and $${M('2; 5')}$ hold the same numbers but are **not** equal: their orders differ.`, key_terms: [{ term: 'Equal matrices', definition_md: 'Matrices of the same order whose corresponding elements are equal.' }, { term: 'Corresponding elements', definition_md: 'Elements in the same row and column of two matrices of the same order.' }], formulas: [], visual: equalTable, visuals: [eqTable, we1Plot], topic_ids: [topic(1)] },
    { heading: '4. Compatibility for addition and multiplication', body_md: r`- **Addition and subtraction:** $A + B$ and $A - B$ are defined only when $A$ and $B$ have the **same order**; the result has that order.
- **Multiplication:** $AB$ is defined only when the **number of columns of $A$ equals the number of rows of $B$**. If $A$ is $m \times n$ and $B$ is $n \times p$, then $AB$ is $m \times p$.

*Examples:* a $2 \times 2$ matrix times a $2 \times 1$ matrix gives a $2 \times 1$ matrix; a $1 \times 2$ matrix times a $2 \times 2$ matrix gives a $1 \times 2$ matrix; a $2 \times 1$ matrix times a $2 \times 2$ matrix is not defined.`, key_terms: [{ term: 'Compatible for addition', definition_md: 'Two matrices of the same order.' }, { term: 'Compatible for multiplication', definition_md: '$AB$ is defined when columns of $A$ $=$ rows of $B$.' }], formulas: [{ latex: '(m \\times n)(n \\times p) \\to m \\times p', label: 'Order of a product' }], visual: compatTable, visuals: [addFlow, mulFlow], topic_ids: [topic(2)] },
    { heading: '5. Addition, subtraction and multiplication by a number', body_md: r`- **Sum and difference:** add or subtract corresponding elements: $${bm(W2A)} + ${bm(W2B)} = ${M('2 2; 3 1')}$.
- **Scalar multiple:** for a number $k$ (an integer or a non-zero rational number), $kA$ multiplies **every** element by $k$: $\dfrac{1}{2}${M('8 -2; 6 4')} = ${M('4 -1; 3 2')}$.
- $A + B = B + A$, $A + O = A$, $A + (-A) = O$.
- **Matrix equations** are solved like linear equations: $2A + X = B$ gives $X = B - 2A$; $\dfrac{1}{2}X + A = B$ gives $X = 2(B - A)$.`, key_terms: [{ term: 'Scalar multiple', definition_md: '$kA$: every element of $A$ multiplied by the number $k$.' }, { term: 'Negative of a matrix', definition_md: '$-A$: every element of $A$ with its sign changed; $A + (-A) = O$.' }], formulas: [{ latex: 'A \\pm B = [a_{ij} \\pm b_{ij}], \\quad kA = [k a_{ij}]', label: 'Sum, difference, scalar multiple' }], visual: we2Table, visuals: [scalarTable, we3Table, we4Table, dataTable], topic_ids: [topic(3)] },
    { heading: '6. Multiplying matrices', body_md: r`**Row-by-column rule:** the element in row $i$ and column $j$ of $AB$ is row $i$ of $A$ times column $j$ of $B$ (multiply in pairs and add):

$\begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} p & q \\ r & s \end{bmatrix} = \begin{bmatrix} ap + br & aq + bs \\ cp + dr & cq + ds \end{bmatrix}$, and $\begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} p \\ r \end{bmatrix} = \begin{bmatrix} ap + br \\ cp + dr \end{bmatrix}$.

*Example:* $${bm(J1S)}${bm(J1P)} = ${M('2450; 3150')}$ gives a stall's takings for two days.

**Unknowns from a product:** multiply out and equate: $${bm(W4M)}\begin{bmatrix} x \\ y \end{bmatrix} = ${bm(W4R)}$ gives $3x + y = 11$ and $x - 2y = -1$, so $x = 3$, $y = 2$.`, key_terms: [{ term: 'Row-by-column rule', definition_md: 'Each element of $AB$ is a row of $A$ times a column of $B$.' }], formulas: [{ latex: '(AB)_{ij} = a_{i1} b_{1j} + a_{i2} b_{2j}', label: 'Element of a product (order 2)' }], visual: ruleTable, visuals: [juiceTable, prodTable, we4Plot], topic_ids: [topic(4)] },
    { heading: '7. Properties of matrix multiplication', body_md: r`- **Not commutative:** in general $AB \ne BA$ (and one of them may not even be defined).
- **Identity:** $AI = IA = A$ for every square matrix $A$ of order $2$.
- **Zero products:** $AB = O$ is possible with $A \ne O$ and $B \ne O$.
- **Squares:** $A^2 = A \times A$ (row by column, not the square of each element), and $(A + B)^2 = A^2 + AB + BA + B^2$.

*Example:* for $A = ${bm(W3)}$, $A^2 = ${M('1 9; -3 -2')}$ and $A^2 - 3A + 5I = O$.

*Not in the ICSE 2027 syllabus:* adding, subtracting or multiplying matrices of order larger than $2 \times 2$; in this chapter all such working stays within order $2 \times 2$.`, key_terms: [{ term: 'Non-commutative', definition_md: '$AB$ and $BA$ are in general different.' }, { term: '$A^2$', definition_md: 'The product $A \\times A$ of a square matrix with itself.' }], formulas: [{ latex: 'AI = IA = A', label: 'Identity' }, { latex: '(A + B)^2 = A^2 + AB + BA + B^2', label: 'Square of a sum' }], visual: factsTable, visuals: [identityTable, zeroTable, we3bTable, commTable], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Order, type and equality (1–2 marks):* order rows by columns 1; each unknown 1.
- *Sums, differences and matrix equations (2–3 marks):* rearranged 1; scalar multiple 1; answer 1.
- *Products (2–4 marks):* orders checked and working shown 1; each correct row or element 1.
- *"Show that" with $A^2$ (3–4 marks):* $A^2$ 1–2; other terms 1; conclusion 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Writing the order as columns by rows.
2. Adding matrices of different orders, or multiplying when columns of the first $\ne$ rows of the second.
3. Multiplying corresponding elements instead of rows by columns.
4. Squaring each element to find $A^2$.
5. Assuming $AB = BA$, or that $AB = O$ forces $A = O$ or $B = O$.
6. Sign slips when subtracting negative elements.`,
  status: 'draft', provenance: d1.provenance,
};
must(is(scal([1, 2], mat('8 -2; 6 4')), '4 -1; 3 2') && is(add(W2A, W2B), '2 2; 3 1') && is(mul(J1S, J1P), '2450; 3150') && is(sq(W3), '1 9; -3 -2'), 'notes values');

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch08', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **matrix**?', 'A rectangular arrangement of numbers in rows and columns.', 'definition', 1),
    fc('f02', 'What is the **order** of a matrix with $m$ rows and $n$ columns?', '$m \\times n$ (rows first).', 'definition', 1),
    fc('f03', `Order of $${M('3 0 -1')}$?`, '$1 \\times 3$: a row matrix.', 'example', 1),
    fc('f04', 'How many elements does a matrix of order $m \\times n$ have?', '$mn$', 'formula', 1),
    fc('f05', 'What is a **row matrix**?', 'A matrix with only one row.', 'definition', 1),
    fc('f06', 'What is a **column matrix**?', 'A matrix with only one column.', 'definition', 1),
    fc('f07', 'What is a **square matrix**?', 'A matrix with as many rows as columns.', 'definition', 1),
    fc('f08', 'What is a **zero (null) matrix**?', 'A matrix whose elements are all $0$, written $O$.', 'definition', 1),
    fc('f09', 'Write the **identity matrix** of order $2$.', `$I = ${M('1 0; 0 1')}$`, 'definition', 1),
    fc('f10', 'When are two matrices **equal**?', 'When they have the same order and equal corresponding elements.', 'fact', 1),
    fc('f11', `If $\\begin{bmatrix} x & 2 \\\\ 0 & y + 1 \\end{bmatrix} = ${M('5 2; 0 -3')}$, find $x$ and $y$.`, '$x = 5$, $y = -4$', 'example', 1),
    fc('f12', `Are $${M('2 5')}$ and $${M('2; 5')}$ equal?`, 'No: their orders, $1 \\times 2$ and $2 \\times 1$, differ.', 'diagram', 1),
    fc('f13', 'When can two matrices be **added**?', 'Only when they have the same order.', 'concept', 2),
    fc('f14', 'When is the product $AB$ **defined**?', 'When the number of columns of $A$ equals the number of rows of $B$.', 'concept', 2),
    fc('f15', 'If $A$ is $m \\times n$ and $B$ is $n \\times p$, what is the order of $AB$?', '$m \\times p$', 'formula', 2),
    fc('f16', 'Can a $2 \\times 1$ matrix be multiplied by a $2 \\times 2$ matrix, in that order?', 'No: $1$ column but $2$ rows. (The other order gives a $2 \\times 1$ matrix.)', 'example', 2),
    fc('f17', 'How are matrices of the same order added or subtracted?', 'Add or subtract corresponding elements.', 'formula', 3),
    fc('f18', 'How is $kA$ found?', 'Multiply every element of $A$ by the number $k$.', 'formula', 3),
    fc('f19', `Find $\\dfrac{1}{2}${M('6 -4; 2 0')}$.`, `$${M('3 -2; 1 0')}$`, 'example', 3),
    fc('f20', 'Solve $2A + X = B$ for $X$.', '$X = B - 2A$', 'formula', 3),
    fc('f21', 'What are $A + O$ and $A + (-A)$?', '$A + O = A$ and $A + (-A) = O$.', 'fact', 3),
    fc('f22', 'How is the element in row $i$, column $j$ of $AB$ found?', 'Multiply row $i$ of $A$ by column $j$ of $B$ in pairs, and add.', 'concept', 4),
    fc('f23', `Find $${M('2 3; 1 0')}${M('2; 1')}$.`, `$${M('7; 2')}$`, 'example', 4),
    fc('f24', 'Is matrix multiplication **commutative**?', 'No: in general $AB \\ne BA$.', 'fact', 4),
    fc('f25', 'What are $AI$ and $IA$?', 'Both equal $A$.', 'formula', 4),
    fc('f26', 'If $AB = O$, must $A = O$ or $B = O$?', `No: for example $${bm(ZA)}${bm(ZB)} = O$.`, 'concept', 4),
    fc('f27', 'What does $A^2$ mean?', '$A \\times A$, by the row-by-column rule.', 'definition', 4),
    fc('f28', 'Expand $(A + B)^2$ for matrices.', '$A^2 + AB + BA + B^2$ (not $A^2 + 2AB + B^2$ unless $AB = BA$).', 'formula', 4),
    fc('f29', 'The most common slip when multiplying matrices?', 'Multiplying corresponding elements instead of rows by columns.', 'exam-tip', 4),
    fc('f30', 'What should you check before multiplying two matrices?', 'The orders: columns of the first must equal rows of the second; then state the order of the answer.', 'exam-tip', 2),
  ],
  status: 'draft', provenance: d1.provenance,
};
must(5 - 1 === 4 && -3 - 1 === -4 && order(mat('3 0 -1')) === '1 \\times 3' && is(scal([1, 2], mat('6 -4; 2 0')), '3 -2; 1 0') && is(mul(mat('2 3; 1 0'), mat('2; 1')), '7; 2') && isZero(mul(ZA, ZB)) && !canAdd(mat('2 5'), mat('2; 5')) && prodOrder([2, 2], [2, 1]).join() === '2,1' && prodOrder([2, 1], [2, 2]) === null, 'flashcard values');

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch08', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t04 only (order and types: row, column, square, zero, identity; equality of matrices; compatibility for addition and multiplication; addition, subtraction and multiplication by a non-zero rational number up to order 2 x 2, matrix equations such as 2A + X = B; multiplication of a 2 x 2 matrix by a compatible 2 x 2 or 2 x 1 matrix, and of a 1 x 2 matrix by a 2 x 2 matrix; AB ≠ BA, AI = IA = A, zero products, A²). Larger matrices appear only to state an order (1 x 3, 2 x 3, 3 x 2) or to test compatibility by orders; the removed topic (arithmetic with matrices larger than 2 x 2) appears only in one note (notes §7).', exact_arithmetic: 'every matrix is an integer array; sums, differences, scalar multiples (rational scalars only where every entry stays an integer), products, squares and expressions such as A² − 3A + 5I are recomputed with src/mat.mjs and compared with the literal matrices typed in the text; products of anything larger than 2 x 2 are refused; unknowns from equal matrices and from products are solved exactly (integer Cramer rule) and substituted back', figures: 'tables are generated from the matrices and asserted; the two plots mark only the intersection of the two lines from the equations (7, 4) and (3, 2)' } },
};
const tests = chapterTests('Matrices', {
  A: ['m04', 'm08', 'm11', 'ar2', 's301', 's304'],
  B: ['l01', 'l04'],
}, {
  A: ['m07', 'm10', 'm14', 'm18', 'm19', 'm20', 'ar3', 'ar6', 's401', 's403', 's404'],
  B: ['l02', 'l05', 'l07'],
});
build({ dir: DIR, release, testsSpec: tests });

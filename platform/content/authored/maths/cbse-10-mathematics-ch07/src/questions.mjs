// CBSE 10 Mathematics ch07 Coordinate Geometry — practice bank with independent re-solve checks
// (distances by Math.hypot, division points by vector interpolation A + t(B − A), unknowns found by search,
// collinearity by the distance test and by an independent slope test). Area of a triangle by coordinates is
// a removed topic and appears nowhere, not even as a distractor.
import { Q, caseQ, child, mk, r, plot } from '../../cbse-10-mathematics-ch05/src/lib.mjs';

const dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
/** Point P with AP : PB = m : n, by interpolation A + t(B − A), t = m / (m + n) (not the section formula). */
const divide = (A, B, m, n) => { const t = m / (m + n); return [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])]; };
const mid = (A, B) => divide(A, B, 1, 1);
const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
const same = (P, Q) => near(P[0], Q[0]) && near(P[1], Q[1]);
/** Cross product test (independent of distances): zero exactly when A, B, C are collinear. */
const collinear = (A, B, C) => near((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]), 0);
/** k with AP : PB = k : 1, for P on segment AB. */
const ratioK = (A, B, P) => dist(A, P) / dist(P, B);
/** Integer solutions in [-50, 50] of pred. */
const search = (pred) => Array.from({ length: 101 }, (_, k) => k - 50).filter(pred);
const rt = (v) => Math.round(v * 1e9) / 1e9;

const qMetro = plot({ x: [-5, 11], y: [-1, 10], xl: 'x (km)', yl: 'y (km)', series: [['metro line AB', [[-3, 2], [9, 8]], 'line']], pts: [[-3, 2, 'A(−3, 2)'], [9, 8, 'B(9, 8)']] }, 'Coordinate grid with the straight metro line from station A at (minus 3, 2) to station B at (9, 8); the line crosses the y-axis between them.', 'Metro line from $A(-3, 2)$ to $B(9, 8)$; $1$ unit $= 1$ km.');

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'The distance between the points $(0, 0)$ and $(-5, 12)$ is', opts: ['$13$', '$17$', '$7$', r`$\sqrt{119}$`], key: 'a', sol: r`$\sqrt{(-5)^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$. Option (b) adds $5 + 12$; option (d) subtracts the squares.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.which([13, 17, 7, Math.sqrt(119)], dist([0, 0], [-5, 12])));
Q('m02', mk.mcq({ stem: 'The distance between $(2, -3)$ and $(2, 5)$ is', opts: ['$8$', '$2$', '$4$', r`$\sqrt{68}$`], key: 'a', sol: r`Both points have $x = 2$, so they lie on a vertical line: distance $= |5 - (-3)| = 8$. Option (b) computes $5 - 3$, ignoring the sign of $-3$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => C.which([8, 2, 4, Math.sqrt(68)], dist([2, -3], [2, 5])));
Q('m03', mk.mcq({ stem: 'The distance between $(a, b)$ and $(-a, -b)$ is', opts: [r`$2\sqrt{a^2 + b^2}$`, r`$\sqrt{a^2 + b^2}$`, '$0$', r`$4\sqrt{a^2 + b^2}$`], key: 'a', sol: r`$\sqrt{(-a - a)^2 + (-b - b)^2} = \sqrt{4a^2 + 4b^2} = 2\sqrt{a^2 + b^2}$. The two points are reflections of each other in the origin, so the distance is twice the distance from the origin.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { const tests = [[3, 4], [-1, 2], [0.5, -7]]; const fs = [(a, b) => 2 * Math.hypot(a, b), (a, b) => Math.hypot(a, b), () => 0, (a, b) => 4 * Math.hypot(a, b)]; C.which(fs.map((g) => tests.every(([a, b]) => near(g(a, b), dist([a, b], [-a, -b])))), true); });
Q('m04', mk.mcq({ stem: 'The point on the $y$-axis that is equidistant from $A(7, 2)$ and $B(-3, 6)$ is', opts: ['$(0, -1)$', '$(-1, 0)$', '$(0, 1)$', '$(0, 4)$'], key: 'a', sol: r`Let $P(0, y)$. $PA^2 = PB^2$: $49 + (y - 2)^2 = 9 + (y - 6)^2 \Rightarrow 53 - 4y = 45 - 12y \Rightarrow 8y = -8 \Rightarrow y = -1$. **Check:** $PA = \sqrt{49 + 9} = \sqrt{58}$ and $PB = \sqrt{9 + 49} = \sqrt{58}$. Option (b) is on the $x$-axis; option (d) is the midpoint's $y$-coordinate.`, d: 3, c: 'application', t: [1], time: 120 }), (C) => { const ys = search((y) => near(dist([0, y], [7, 2]), dist([0, y], [-3, 6]))); C.assert(ys.length === 1, 'unique'); C.which([[0, -1], [-1, 0], [0, 1], [0, 4]], [0, ys[0]]); C.sol([58]); });
Q('m05', mk.mcq({ stem: 'If the distance between $(4, p)$ and $(1, 0)$ is $5$, then $p$ equals', opts: [r`$\pm 4$`, '$4$ only', r`$\pm 3$`, '$16$'], key: 'a', sol: r`$(4 - 1)^2 + p^2 = 25 \Rightarrow p^2 = 16 \Rightarrow p = 4$ or $p = -4$. Option (b) forgets the negative root; option (d) stops at $p^2$.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { const ps = search((p) => near(dist([4, p], [1, 0]), 5)); C.which([[-4, 4], [4], [-3, 3], [16]], ps); });
Q('m06', mk.mcq({ stem: 'The triangle with vertices $A(-2, 0)$, $B(2, 0)$ and $C(0, 2)$ is', opts: ['isosceles and right-angled', 'equilateral', 'scalene and right-angled', 'scalene and obtuse-angled'], key: 'a', sol: r`$AB = 4$, $BC = \sqrt{4 + 4} = 2\sqrt2$, $CA = 2\sqrt2$. Two sides are equal, and $BC^2 + CA^2 = 8 + 8 = 16 = AB^2$, so the angle at $C$ is $90^\circ$: isosceles and right-angled.`, d: 2, c: 'application', t: [1], time: 90 }), (C) => { const [A, B, Cc] = [[-2, 0], [2, 0], [0, 2]]; const [ab, bc, ca] = [dist(A, B), dist(B, Cc), dist(Cc, A)]; C.assert(near(bc, ca) && near(bc * bc + ca * ca, ab * ab) && !near(ab, bc), 'isosceles right'); C.key('a'); });
Q('m07', mk.mcq({ stem: 'The points $A(1, 1)$, $B(4, 5)$ and $C(7, 9)$', opts: ['are collinear, with $B$ between $A$ and $C$', 'form an isosceles triangle', 'form a right-angled triangle', 'are collinear, with $A$ between $B$ and $C$'], key: 'a', sol: r`$AB = \sqrt{9 + 16} = 5$, $BC = \sqrt{9 + 16} = 5$, $AC = \sqrt{36 + 64} = 10$. Since $AB + BC = AC$, the points are collinear and $B$ lies between $A$ and $C$ (in fact $B$ is the midpoint). Option (b) is tempting because $AB = BC$, but no triangle is formed.`, d: 2, c: 'analysis', t: [1], time: 90 }), (C) => { const [A, B, Cc] = [[1, 1], [4, 5], [7, 9]]; C.assert(collinear(A, B, Cc) && near(dist(A, B) + dist(B, Cc), dist(A, Cc)), 'collinear, B between'); C.key('a'); });
Q('m08', mk.mcq({ stem: 'The distance of the point $(-6, 8)$ from the origin is', opts: ['$10$', '$14$', '$2$', '$100$'], key: 'a', sol: r`$\sqrt{36 + 64} = \sqrt{100} = 10$. Option (d) forgets the square root; option (b) adds $6 + 8$.`, d: 1, c: 'recall', t: [1], time: 45 }), (C) => C.which([10, 14, 2, 100], dist([0, 0], [-6, 8])));
Q('m09', mk.mcq({ stem: 'The midpoint of the segment joining $(-4, 7)$ and $(8, -3)$ is', opts: ['$(2, 2)$', '$(6, -5)$', '$(2, 5)$', '$(-6, 5)$'], key: 'a', sol: r`$\left(\dfrac{-4 + 8}{2}, \dfrac{7 - 3}{2}\right) = (2, 2)$. Option (b) halves the differences instead of the sums; option (c) adds $7 + 3$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => C.which([[2, 2], [6, -5], [2, 5], [-6, 5]], mid([-4, 7], [8, -3])));
Q('m10', mk.mcq({ stem: 'The point that divides the segment joining $A(1, 3)$ and $B(6, 8)$ internally in the ratio $2 : 3$ is', opts: ['$(3, 5)$', '$(4, 6)$', '$(3.5, 5.5)$', '$(5, 3)$'], key: 'a', sol: r`$\left(\dfrac{2 \times 6 + 3 \times 1}{5}, \dfrac{2 \times 8 + 3 \times 3}{5}\right) = \left(\dfrac{15}{5}, \dfrac{25}{5}\right) = (3, 5)$. Option (b) uses the ratio $3 : 2$ (it pairs $m_1$ with $x_1$); option (c) is the midpoint.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => { C.which([[3, 5], [4, 6], [3.5, 5.5], [5, 3]], divide([1, 3], [6, 8], 2, 3)); C.assert(same(divide([1, 3], [6, 8], 3, 2), [4, 6]), 'distractor 3:2'); });
Q('m11', mk.mcq({ stem: '$M(2, -1)$ is the midpoint of $AB$, where $A$ is $(5, 3)$. The point $B$ is', opts: ['$(-1, -5)$', '$(3.5, 1)$', '$(8, 7)$', '$(-3, -4)$'], key: 'a', sol: r`$\dfrac{5 + x}{2} = 2 \Rightarrow x = -1$ and $\dfrac{3 + y}{2} = -1 \Rightarrow y = -5$. So $B = (-1, -5)$. Option (b) is the midpoint of $A$ and $M$; option (c) is on the wrong side of $A$.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => { const B = search((x) => (5 + x) / 2 === 2).map((x) => [x, search((y) => (3 + y) / 2 === -1)[0]])[0]; C.which([[-1, -5], [3.5, 1], [8, 7], [-3, -4]], B); C.assert(same(mid([5, 3], B), [2, -1]), 'midpoint'); });
Q('m12', mk.mcq({ stem: 'The $y$-axis divides the segment joining $(-3, 4)$ and $(6, -2)$ in the ratio', opts: ['$1 : 2$', '$2 : 1$', '$1 : 1$', '$3 : 2$'], key: 'a', sol: r`A point on the $y$-axis has $x = 0$. With ratio $k : 1$: $\dfrac{6k - 3}{k + 1} = 0 \Rightarrow k = \dfrac12$, i.e. $1 : 2$. The point is $(0, 2)$. Option (b) reverses the ratio.`, d: 2, c: 'application', t: [2], time: 90 }), (C) => { const A = [-3, 4], B = [6, -2]; const t = (0 - A[0]) / (B[0] - A[0]); C.which([1 / 2, 2, 1, 3 / 2], t / (1 - t)); C.assert(same(divide(A, B, 1, 2), [0, 2]), 'point (0, 2)'); });
Q('m13', mk.mcq({ stem: 'The point $P(1, 2)$ lies on the segment joining $A(-2, -4)$ and $B(3, 6)$. It divides $AB$ in the ratio', opts: ['$3 : 2$', '$2 : 3$', '$1 : 1$', '$3 : 5$'], key: 'a', sol: r`$\dfrac{3k - 2}{k + 1} = 1 \Rightarrow 3k - 2 = k + 1 \Rightarrow k = \dfrac32$: ratio $3 : 2$. **Check** with $y$: $\dfrac{3 \times 6 + 2 \times (-4)}{5} = \dfrac{10}{5} = 2$. Option (d) is $AP : AB$, not $AP : PB$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { const A = [-2, -4], B = [3, 6], P = [1, 2]; C.assert(collinear(A, B, P), 'on line'); C.which([1.5, 2 / 3, 1, 0.6], rt(ratioK(A, B, P))); });
Q('m14', mk.mcq({ stem: '$A(2, 1)$, $B(5, 2)$, $C(6, 5)$ and $D$ are the vertices of parallelogram $ABCD$, in order. The point $D$ is', opts: ['$(3, 4)$', '$(9, 6)$', '$(1, -2)$', '$(4, 3)$'], key: 'a', sol: r`The diagonals of a parallelogram bisect each other, so $AC$ and $BD$ have the same midpoint, $\left(\dfrac{2 + 6}{2}, \dfrac{1 + 5}{2}\right) = (4, 3)$. Then $D = (2 \times 4 - 5, 2 \times 3 - 2) = (3, 4)$. Option (b) is $B + C - A$, which gives parallelogram $ABDC$ instead; option (d) is the centre.`, d: 3, c: 'application', t: [2], time: 120 }), (C) => { const [A, B, Cc] = [[2, 1], [5, 2], [6, 5]]; const D = [A[0] + Cc[0] - B[0], A[1] + Cc[1] - B[1]]; C.which([[3, 4], [9, 6], [1, -2], [4, 3]], D); C.assert(same(mid(A, Cc), mid(B, D)), 'diagonals bisect'); });
Q('m15', mk.mcq({ stem: 'The point of trisection of the segment joining $A(-3, 6)$ and $B(6, -3)$ that is nearer to $A$ is', opts: ['$(0, 3)$', '$(3, 0)$', '$(1.5, 1.5)$', '$(-6, 9)$'], key: 'a', sol: r`Nearer to $A$ means $AP : PB = 1 : 2$: $\left(\dfrac{6 - 6}{3}, \dfrac{-3 + 12}{3}\right) = (0, 3)$. Option (b) is the other point of trisection (ratio $2 : 1$); option (c) is the midpoint.`, d: 2, c: 'understanding', t: [2], time: 75 }), (C) => { const A = [-3, 6], B = [6, -3]; const P = divide(A, B, 1, 2); C.which([[0, 3], [3, 0], [1.5, 1.5], [-6, 9]], P); C.assert(dist(A, P) < dist(P, B), 'nearer A'); });
Q('m16', mk.mcq({ stem: 'The $x$-axis divides the segment joining $(2, -6)$ and $(5, 3)$ in the ratio', opts: ['$2 : 1$', '$1 : 2$', '$3 : 2$', '$1 : 1$'], key: 'a', sol: r`On the $x$-axis $y = 0$: $\dfrac{3k - 6}{k + 1} = 0 \Rightarrow k = 2$, i.e. $2 : 1$. The point is $\left(\dfrac{10 + 2}{3}, 0\right) = (4, 0)$. Option (b) reverses the ratio.`, d: 2, c: 'application', t: [2], time: 90 }), (C) => { const A = [2, -6], B = [5, 3]; const t = (0 - A[1]) / (B[1] - A[1]); C.which([2, 0.5, 1.5, 1], rt(t / (1 - t))); C.assert(same(divide(A, B, 2, 1), [4, 0]), 'point'); });
Q('m17', mk.mcq({ stem: 'On a map of Chandigarh, 1 unit stands for 100 m. Two friends stand at $P(3, 4)$ and $Q(-5, -2)$. The straight-line distance between them is', opts: ['$1$ km', '$10$ m', '$1.4$ km', '$100$ m'], key: 'a', sol: r`$PQ = \sqrt{8^2 + 6^2} = \sqrt{100} = 10$ units $= 10 \times 100$ m $= 1000$ m $= 1$ km. Option (c) adds the horizontal and vertical gaps ($8 + 6 = 14$ units), which is the walking distance along the grid, not the straight-line distance.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => C.which([1000, 10, 1400, 100], dist([3, 4], [-5, -2]) * 100));
Q('m18', mk.mcq({ stem: 'Ravi’s house is at $(2, 3)$ and his school at $(10, 9)$ on a map. A shop lies on the straight road between them, three-quarters of the way from his house to the school. The shop is at', opts: ['$(8, 7.5)$', '$(4, 4.5)$', '$(6, 6)$', '$(7.5, 8)$'], key: 'a', sol: r`Three-quarters of the way means house to shop : shop to school $= 3 : 1$. So $\left(\dfrac{3 \times 10 + 1 \times 2}{4}, \dfrac{3 \times 9 + 1 \times 3}{4}\right) = (8, 7.5)$. Option (b) uses $1 : 3$ (one quarter of the way); option (c) is halfway.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { const H = [2, 3], S = [10, 9]; const P = divide(H, S, 3, 1); C.which([[8, 7.5], [4, 4.5], [6, 6], [7.5, 8]], P); C.assert(near(dist(H, P), 0.75 * dist(H, S)), '3/4 of the way'); });

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: 'The distance of the point $(5, -12)$ from the origin is $13$.', r: r`The distance of $(x, y)$ from the origin is $\sqrt{x^2 + y^2}$.`, key: 'a', sol: r`By R, $\sqrt{25 + 144} = 13$. R is the reason for A.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(dist([0, 0], [5, -12]) === 13, '13'); C.key('a'); });
Q('ar2', mk.ar({ a: 'The midpoint of $A(2, 4)$ and $B(6, 8)$ is $(4, 6)$.', r: r`The distance $AB$ is $4\sqrt2$.`, key: 'b', sol: r`A: $\left(\dfrac{2 + 6}{2}, \dfrac{4 + 8}{2}\right) = (4, 6)$, true. R: $\sqrt{16 + 16} = 4\sqrt2$, true. But a length does not give the coordinates of the midpoint, so R does not explain A.`, d: 2, c: 'understanding', t: [1, 2] }), (C) => { C.assert(same(mid([2, 4], [6, 8]), [4, 6]) && near(dist([2, 4], [6, 8]), 4 * Math.SQRT2), 'both'); C.key('b'); });
Q('ar3', mk.ar({ a: 'The points $(1, 2)$, $(2, 4)$ and $(3, 6)$ are collinear.', r: 'Three points are collinear whenever two of the three distances between them are equal.', key: 'c', sol: r`A: the distances are $\sqrt5$, $\sqrt5$ and $2\sqrt5$, and $\sqrt5 + \sqrt5 = 2\sqrt5$, so the points are collinear. R is false: the vertices of any isosceles triangle have two equal distances but are not collinear. The correct test is that the largest distance equals the sum of the other two.`, d: 3, c: 'analysis', t: [1] }), (C) => { C.assert(collinear([1, 2], [2, 4], [3, 6]) && !collinear([-2, 0], [2, 0], [0, 2]), 'A true, R counter-example'); C.key('c'); });
Q('ar4', mk.ar({ a: 'The point $(2, 3)$ divides the segment joining $(0, 0)$ and $(6, 9)$ in the ratio $1 : 3$.', r: r`The point dividing the join of $(x_1, y_1)$ and $(x_2, y_2)$ internally in the ratio $m_1 : m_2$ is $\left(\dfrac{m_1x_2 + m_2x_1}{m_1 + m_2}, \dfrac{m_1y_2 + m_2y_1}{m_1 + m_2}\right)$.`, key: 'd', sol: r`R is the section formula, true. By R, the ratio $1 : 3$ gives $\left(\dfrac{6}{4}, \dfrac{9}{4}\right)$, not $(2, 3)$. In fact $(2, 3)$ is one-third of the way, so the ratio is $1 : 2$. A is false.`, d: 2, c: 'application', t: [2] }), (C) => { C.assert(near(ratioK([0, 0], [6, 9], [2, 3]), 0.5) && !same(divide([0, 0], [6, 9], 1, 3), [2, 3]), 'ratio 1:2'); C.key('d'); });
Q('ar5', mk.ar({ a: 'The triangle with vertices $(0, 0)$, $(3, 0)$ and $(0, 4)$ is right-angled.', r: 'If the square of one side of a triangle equals the sum of the squares of the other two sides, the triangle is right-angled.', key: 'a', sol: r`The sides are $3$, $4$ and $5$, and $3^2 + 4^2 = 25 = 5^2$. By R (the converse of Pythagoras' theorem), the triangle is right-angled, at the origin.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(dist([3, 0], [0, 4]) === 5, '3-4-5'); C.key('a'); });
Q('ar6', mk.ar({ a: 'The $y$-axis divides the segment joining $(-4, 1)$ and $(2, 5)$ in the ratio $1 : 2$.', r: 'Every point on the $y$-axis has $x$-coordinate $0$.', key: 'd', sol: r`R is true. Using it: $\dfrac{2k - 4}{k + 1} = 0 \Rightarrow k = 2$, so the ratio is $2 : 1$, not $1 : 2$. A is false.`, d: 2, c: 'application', t: [2] }), (C) => { const A = [-4, 1], B = [2, 5]; const t = -A[0] / (B[0] - A[0]); C.assert(near(t / (1 - t), 2), '2:1'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: 'The distance between $(3, 0)$ and $(0, 4)$ is $7$.', key: 'f', sol: r`$\sqrt{9 + 16} = 5$. Adding $3 + 4$ is wrong: the distance is the hypotenuse, not the sum of the legs.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(dist([3, 0], [0, 4]) === 5, '5'); C.key('f'); });
Q('tf2', mk.tf({ stem: 'The points $(0, 5)$, $(0, -3)$ and $(0, 9)$ are collinear.', key: 't', sol: r`All three have $x = 0$: they lie on the $y$-axis. (Distances $8$, $12$, $4$, and $8 + 4 = 12$.)`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(collinear([0, 5], [0, -3], [0, 9]), 'collinear'); C.key('t'); });
Q('tf3', mk.tf({ stem: 'The midpoint of a segment divides it internally in the ratio $1 : 1$.', key: 't', sol: r`Putting $m_1 = m_2 = 1$ in the section formula gives $\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)$, the midpoint formula.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(same(divide([1, 7], [5, -3], 1, 1), [3, 2]), 'example'); C.key('t'); });
Q('tf4', mk.tf({ stem: 'The point dividing $AB$ internally in the ratio $2 : 3$ is closer to $B$ than to $A$.', key: 'f', sol: r`$AP : PB = 2 : 3$ means $AP = \dfrac25 AB$ and $PB = \dfrac35 AB$, so $P$ is closer to $A$.`, d: 2, c: 'understanding', t: [2] }), (C) => { const A = [0, 0], B = [10, 0]; const P = divide(A, B, 2, 3); C.assert(dist(A, P) < dist(P, B), 'closer to A'); C.key('f'); });
Q('tf5', mk.tf({ stem: 'If a point $P(x, y)$ is equidistant from $A(1, 0)$ and $B(-1, 0)$, then $x = 0$.', key: 't', sol: r`$(x - 1)^2 + y^2 = (x + 1)^2 + y^2 \Rightarrow -2x = 2x \Rightarrow x = 0$. Every such point is on the $y$-axis.`, d: 2, c: 'application', t: [1] }), (C) => { for (const y of [-3, 0, 2.5]) C.assert(near(dist([0, y], [1, 0]), dist([0, y], [-1, 0])) && !near(dist([0.5, y], [1, 0]), dist([0.5, y], [-1, 0])), `y = ${y}`); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: 'The distance between $(-1, -1)$ and $(2, 3)$ is ___.', acc: [['5']], sol: r`$\sqrt{3^2 + 4^2} = \sqrt{25} = 5$.`, d: 1, c: 'understanding', t: [1] }), (C) => C.blank(dist([-1, -1], [2, 3])));
Q('fb2', mk.fill({ stem: 'The midpoint of the segment joining $(6, -2)$ and $(-4, 8)$ is $(1,$ ___$)$.', acc: [['3']], sol: r`$y = \dfrac{-2 + 8}{2} = 3$; the midpoint is $(1, 3)$.`, d: 1, c: 'recall', t: [2] }), (C) => C.blank(mid([6, -2], [-4, 8])[1]));
Q('fb3', mk.fill({ stem: 'The distance of the point $(-8, 15)$ from the origin is ___.', acc: [['17']], sol: r`$\sqrt{64 + 225} = \sqrt{289} = 17$.`, d: 1, c: 'recall', t: [1] }), (C) => C.blank(dist([0, 0], [-8, 15])));
Q('fb4', mk.fill({ stem: 'If $(a, 2)$ is the midpoint of the segment joining $(3, -1)$ and $(7, 5)$, then $a =$ ___.', acc: [['5']], sol: r`$a = \dfrac{3 + 7}{2} = 5$ (and indeed $\dfrac{-1 + 5}{2} = 2$).`, d: 1, c: 'understanding', t: [2] }), (C) => { const M = mid([3, -1], [7, 5]); C.assert(M[1] === 2, 'y = 2'); C.blank(M[0]); });
Q('fb5', mk.fill({ stem: 'The $x$-axis divides the segment joining $(1, -2)$ and $(4, 6)$ in the ratio ___.', acc: [['1:3', '1 : 3']], sol: r`$\dfrac{6k - 2}{k + 1} = 0 \Rightarrow k = \dfrac13$: the ratio is $1 : 3$. The point is $\left(\dfrac{4 + 3}{4}, 0\right) = (1.75, 0)$.`, d: 2, c: 'application', t: [2] }), (C) => { const A = [1, -2], B = [4, 6]; const t = -A[1] / (B[1] - A[1]); C.assert(near(t / (1 - t), 1 / 3) && same(divide(A, B, 1, 3), [1.75, 0]), '1:3'); C.blank('1:3'); });

// =============================================================== Numerical
Q('n01', mk.num({ stem: 'Find the perimeter of the triangle with vertices $A(0, 0)$, $B(6, 8)$ and $C(6, 0)$.', value: 24, unit: 'units', marks: 2, sol: r`**Step 1.** $AB = \sqrt{36 + 64} = 10$, $BC = 8$ (vertical), $CA = 6$ (horizontal). **Step 2.** Perimeter $= 10 + 8 + 6 = 24$ units.`, scheme: [['Three sides 10, 8, 6', 1], ['24', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { const [A, B, Cc] = [[0, 0], [6, 8], [6, 0]]; C.val(dist(A, B) + dist(B, Cc) + dist(Cc, A)); });
Q('n02', mk.num({ stem: 'The distance between $(x, 7)$ and $(3, -1)$ is $10$ units. Find the positive value of $x$.', value: 9, marks: 2, sol: r`**Step 1.** $(x - 3)^2 + 64 = 100 \Rightarrow (x - 3)^2 = 36 \Rightarrow x - 3 = \pm 6$. **Step 2.** $x = 9$ or $x = -3$; the positive value is $9$.`, scheme: [['(x − 3)² = 36', 1], ['x = 9', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { const xs = search((x) => near(dist([x, 7], [3, -1]), 10)); C.assert(xs.join() === '-3,9', xs.join()); C.val(xs[1]); });
Q('n03', mk.num({ stem: 'Find the distance between $(-3, -4)$ and $(3, 4)$.', value: 10, unit: 'units', sol: r`$\sqrt{6^2 + 8^2} = \sqrt{100} = 10$ units.`, scheme: [['10', 1]], d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.val(dist([-3, -4], [3, 4])));
Q('n04', mk.num({ stem: 'The point $P$ divides the segment joining $A(-1, 7)$ and $B(4, -3)$ internally in the ratio $2 : 3$. Find the $y$-coordinate of $P$.', value: 3, marks: 2, sol: r`**Step 1.** $y = \dfrac{2 \times (-3) + 3 \times 7}{2 + 3} = \dfrac{-6 + 21}{5}$. **Step 2.** $y = \dfrac{15}{5} = 3$. (The point is $(1, 3)$.)`, scheme: [['Section formula with m₁ = 2 paired with B', 1], ['y = 3', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { const P = divide([-1, 7], [4, -3], 2, 3); C.val(P[1]); C.assert(same(P, [1, 3]), 'P'); });
Q('n05', mk.num({ stem: 'The segment joining $A(-4, 9)$ and $B(8, -3)$ crosses the $y$-axis at $P(0, y)$. Find $y$.', value: 5, marks: 2, sol: r`**Step 1.** $x = 0$: $\dfrac{8k - 4}{k + 1} = 0 \Rightarrow k = \dfrac12$, so $AP : PB = 1 : 2$. **Step 2.** $y = \dfrac{1 \times (-3) + 2 \times 9}{3} = \dfrac{15}{3} = 5$.`, scheme: [['Ratio 1 : 2', 1], ['y = 5', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const A = [-4, 9], B = [8, -3]; const t = -A[0] / (B[0] - A[0]); C.assert(near(t, 1 / 3), 'ratio 1:2'); C.val(A[1] + t * (B[1] - A[1])); });
Q('n06', mk.num({ stem: 'A circle has centre $(3, -1)$ and passes through $(-2, 11)$. Find its diameter.', value: 26, unit: 'units', marks: 2, sol: r`**Step 1.** Radius $= \sqrt{(-2 - 3)^2 + (11 + 1)^2} = \sqrt{25 + 144} = 13$. **Step 2.** Diameter $= 2 \times 13 = 26$ units.`, scheme: [['Radius 13', 1], ['Diameter 26', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => C.val(2 * dist([3, -1], [-2, 11])));
Q('n07', mk.num({ stem: 'On a survey map of Hyderabad, 1 unit represents 0.5 km. A drone flies straight from $H(1, 2)$ to $K(9, 17)$. How many kilometres does it fly?', value: 8.5, unit: 'km', marks: 2, sol: r`**Step 1.** $HK = \sqrt{8^2 + 15^2} = \sqrt{64 + 225} = \sqrt{289} = 17$ units. **Step 2.** $17 \times 0.5 = 8.5$ km.`, scheme: [['HK = 17 units', 1], ['8.5 km', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => C.val(dist([1, 2], [9, 17]) * 0.5));
Q('n08', mk.num({ stem: 'Find the length of the median $AD$ of the triangle with vertices $A(1, 8)$, $B(-2, 1)$ and $C(6, 3)$, correct to two decimal places.', value: 6.08, tol: 0.005, unit: 'units', marks: 2, sol: r`**Step 1.** $D$ is the midpoint of $BC$: $\left(\dfrac{-2 + 6}{2}, \dfrac{1 + 3}{2}\right) = (2, 2)$. **Step 2.** $AD = \sqrt{1^2 + 6^2} = \sqrt{37} \approx 6.08$ units.`, scheme: [['D = (2, 2)', 1], ['AD = √37 ≈ 6.08', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (C) => { const D = mid([-2, 1], [6, 3]); C.assert(same(D, [2, 2]), 'D'); C.val(dist([1, 8], D), 0.005); });
Q('n09', mk.num({ stem: 'Find the $x$-coordinate of the point that divides the segment joining $(-2, 4)$ and $(8, 9)$ internally in the ratio $3 : 2$.', value: 4, sol: r`$x = \dfrac{3 \times 8 + 2 \times (-2)}{5} = \dfrac{20}{5} = 4$.`, scheme: [['4', 1]], d: 1, c: 'understanding', t: [2], time: 60 }), (C) => C.val(divide([-2, 4], [8, 9], 3, 2)[0]));

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Find the distance between $P(-4, 3)$ and $Q(4, -3)$, and show that the origin is the midpoint of $PQ$.', model: r`$PQ = \sqrt{8^2 + (-6)^2} = \sqrt{100} = 10$ units.

Midpoint $= \left(\dfrac{-4 + 4}{2}, \dfrac{3 - 3}{2}\right) = (0, 0)$, the origin.`, sol: r`$P$ and $Q$ are reflections of each other in the origin, so each is $5$ units from it.`, scheme: [['PQ = 10', 1], ['Midpoint (0, 0)', 1]], d: 2, c: 'understanding', t: [1, 2], time: 90 }), (C) => { C.assert(same(mid([-4, 3], [4, -3]), [0, 0]), 'mid'); C.model([dist([-4, 3], [4, -3])]); });
Q('s202', mk.short({ marks: 2, stem: 'Find the values of $y$ for which the distance between $A(2, y)$ and $B(-4, 3)$ is $10$ units.', model: r`$(2 + 4)^2 + (y - 3)^2 = 100 \Rightarrow (y - 3)^2 = 64 \Rightarrow y - 3 = \pm 8$.

So $y = 11$ or $y = -5$.`, sol: r`Both values work: the two points $(2, 11)$ and $(2, -5)$ are each $10$ units from $B$.`, scheme: [['(y − 3)² = 64', 1], ['y = 11 or −5', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { const ys = search((y) => near(dist([2, y], [-4, 3]), 10)); C.assert(ys.join() === '-5,11', ys.join()); C.model([64, 11, -5]); });
Q('s203', mk.short({ marks: 2, stem: 'Find a relation between $x$ and $y$ such that the point $P(x, y)$ is equidistant from $A(5, 1)$ and $B(-1, 5)$.', model: r`$PA^2 = PB^2$: $(x - 5)^2 + (y - 1)^2 = (x + 1)^2 + (y - 5)^2$.

$-10x + 25 - 2y + 1 = 2x + 1 - 10y + 25 \Rightarrow -12x + 8y = 0 \Rightarrow 3x = 2y$.`, sol: r`**Check:** the midpoint $(2, 3)$ of $AB$ satisfies $3 \times 2 = 2 \times 3$, as it must.`, scheme: [['PA² = PB² expanded', 1], ['3x = 2y', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { for (const [x, y] of [[2, 3], [4, 6], [-2, -3]]) C.assert(near(dist([x, y], [5, 1]), dist([x, y], [-1, 5])), `(${x}, ${y}) equidistant`); C.assert(!near(dist([1, 1], [5, 1]), dist([1, 1], [-1, 5])), 'off the line'); C.model(['3x = 2y']); });
Q('s204', mk.short({ marks: 2, stem: 'Find the coordinates of the point that divides the segment joining $A(4, -3)$ and $B(-6, 7)$ internally in the ratio $3 : 2$.', model: r`$x = \dfrac{3(-6) + 2(4)}{3 + 2} = \dfrac{-18 + 8}{5} = -2$, $\quad y = \dfrac{3(7) + 2(-3)}{5} = \dfrac{21 - 6}{5} = 3$.

The point is $(-2, 3)$.`, sol: r`**Check:** $AP = \sqrt{36 + 36} = 6\sqrt2$, $PB = \sqrt{16 + 16} = 4\sqrt2$, ratio $3 : 2$.`, scheme: [['Correct substitution', 1], ['(−2, 3)', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { const P = divide([4, -3], [-6, 7], 3, 2); C.assert(same(P, [-2, 3]), 'P'); C.model([-2, 3]); C.sol([6, 4]); });
Q('s205', mk.short({ marks: 2, stem: '$M(3, -2)$ is the midpoint of the segment joining $A(x, 1)$ and $B(4, y)$. Find $x$ and $y$.', model: r`$\dfrac{x + 4}{2} = 3 \Rightarrow x = 2$; $\quad \dfrac{1 + y}{2} = -2 \Rightarrow y = -5$.`, sol: r`**Check:** the midpoint of $(2, 1)$ and $(4, -5)$ is $(3, -2)$.`, scheme: [['x = 2', 1], ['y = −5', 1]], d: 1, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert(same(mid([2, 1], [4, -5]), [3, -2]), 'mid'); C.model([2, -5]); });
Q('s206', mk.short({ marks: 2, stem: 'Find the ratio in which the $y$-axis divides the segment joining $A(6, -2)$ and $B(-3, 7)$. Also find the point of division.', model: r`Let the ratio be $k : 1$. On the $y$-axis $x = 0$: $\dfrac{-3k + 6}{k + 1} = 0 \Rightarrow k = 2$. Ratio $2 : 1$.

$y = \dfrac{2 \times 7 + 1 \times (-2)}{3} = \dfrac{12}{3} = 4$. The point is $(0, 4)$.`, sol: 'Use the k : 1 form, then the coordinate that must be zero.', scheme: [['Ratio 2 : 1', 1], ['(0, 4)', 1]], d: 2, c: 'application', t: [2], time: 150 }), (C) => { const A = [6, -2], B = [-3, 7]; const t = -A[0] / (B[0] - A[0]); C.assert(near(t / (1 - t), 2) && same(divide(A, B, 2, 1), [0, 4]), 'ratio and point'); C.model([2, 4]); });
Q('s207', mk.short({ marks: 2, stem: 'Arjun finds the distance between $(-3, 5)$ and $(2, -7)$ as $\\sqrt{(2 - 3)^2 + (-7 - 5)^2} = \\sqrt{145}$. Find his mistake and give the correct distance.', model: r`He used $x_1 = 3$ instead of $x_1 = -3$: the first bracket should be $2 - (-3) = 5$.

Correct distance: $\sqrt{5^2 + (-12)^2} = \sqrt{169} = 13$ units.`, sol: r`Substitute negative coordinates inside brackets to keep their signs.`, scheme: [['Identifies the sign error in x₁', 1], ['13', 1]], d: 2, c: 'evaluation', t: [1], time: 120 }), (C) => { C.assert(dist([-3, 5], [2, -7]) === 13 && near(Math.hypot(2 - 3, -7 - 5), Math.sqrt(145)), 'his and correct'); C.model([5, 169, 13]); });
Q('s208', mk.short({ marks: 2, stem: 'Show that $A(2, -2)$, $B(8, 4)$ and $C(5, 7)$ are the vertices of a right-angled triangle. At which vertex is the right angle?', model: r`$AB^2 = 36 + 36 = 72$, $BC^2 = 9 + 9 = 18$, $AC^2 = 9 + 81 = 90$.

$AB^2 + BC^2 = 72 + 18 = 90 = AC^2$, so by the converse of Pythagoras' theorem the triangle is right-angled, with the right angle at $B$ (opposite the longest side $AC$).`, sol: 'Compare squared lengths; there is no need to take square roots.', scheme: [['Three squared lengths', 1], ['Conclusion: right angle at B', 1]], d: 2, c: 'application', t: [1], time: 150 }), (C) => { const [A, B, Cc] = [[2, -2], [8, 4], [5, 7]]; const sq = (P, Q) => dist(P, Q) ** 2; C.assert(near(sq(A, B) + sq(B, Cc), sq(A, Cc)), 'right at B'); C.model([72, 18, 90]); });
Q('s209', mk.short({ marks: 2, stem: 'Find the point on the segment joining $A(-5, 4)$ and $B(7, -2)$ that is twice as far from $A$ as from $B$.', model: r`$AP = 2PB$ means $AP : PB = 2 : 1$.

$P = \left(\dfrac{2 \times 7 + 1 \times (-5)}{3}, \dfrac{2 \times (-2) + 1 \times 4}{3}\right) = \left(\dfrac{9}{3}, \dfrac{0}{3}\right) = (3, 0)$.`, sol: r`**Check:** $AP = \sqrt{64 + 16} = 4\sqrt5$, $PB = \sqrt{16 + 4} = 2\sqrt5$.`, scheme: [['Ratio 2 : 1', 1], ['(3, 0)', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => { const P = divide([-5, 4], [7, -2], 2, 1); C.assert(same(P, [3, 0]) && near(dist([-5, 4], P), 2 * dist(P, [7, -2])), 'P'); C.model([3, 0]); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: 'Name the type of quadrilateral formed by $A(-3, 1)$, $B(1, 4)$, $C(4, 0)$ and $D(0, -3)$, taken in order. Justify your answer.', model: r`Sides: $AB = \sqrt{16 + 9} = 5$, $BC = \sqrt{9 + 16} = 5$, $CD = \sqrt{16 + 9} = 5$, $DA = \sqrt{9 + 16} = 5$.

Diagonals: $AC = \sqrt{49 + 1} = \sqrt{50}$, $BD = \sqrt{1 + 49} = \sqrt{50}$.

All four sides are equal and the diagonals are equal, so $ABCD$ is a **square**.`, sol: r`Equal sides alone give only a rhombus; the equal diagonals make it a square.`, scheme: [['Four sides = 5', 1], ['Diagonals √50 each', 1], ['Conclusion: square, with reason', 1]], d: 3, c: 'analysis', t: [1], time: 240 }), (C) => { const P = [[-3, 1], [1, 4], [4, 0], [0, -3]]; const s = P.map((p, i) => dist(p, P[(i + 1) % 4])); C.assert(s.every((x) => near(x, 5)) && near(dist(P[0], P[2]), dist(P[1], P[3])) && near(dist(P[0], P[2]) ** 2, 50), 'square'); C.model([5, 50]); });
Q('s302', mk.short({ marks: 3, stem: 'Find the point on the $x$-axis that is equidistant from $A(-2, 5)$ and $B(2, -3)$.', model: r`Let $P(x, 0)$. $PA^2 = PB^2$: $(x + 2)^2 + 25 = (x - 2)^2 + 9$.

$x^2 + 4x + 29 = x^2 - 4x + 13 \Rightarrow 8x = -16 \Rightarrow x = -2$.

The point is $P(-2, 0)$. Check: $PA = 5$ and $PB = \sqrt{16 + 9} = 5$.`, sol: 'A point on the x-axis has y = 0.', scheme: [['P(x, 0) and PA² = PB²', 1], ['x = −2', 1], ['Point (−2, 0) with check', 1]], d: 2, c: 'application', t: [1], time: 240 }), (C) => { const xs = search((x) => near(dist([x, 0], [-2, 5]), dist([x, 0], [2, -3]))); C.assert(xs.length === 1 && xs[0] === -2, 'x'); C.model([-2, 5, 16]); });
Q('s303', mk.short({ marks: 3, stem: 'The vertices of a triangle are $A(1, 1)$, $B(7, 1)$ and $C(4, k)$, where $k > 1$. Find $k$ if the triangle is equilateral.', model: r`$AB = 6$. $AC = \sqrt{9 + (k - 1)^2}$ and $BC = \sqrt{9 + (k - 1)^2}$, so $AC = BC$ for every $k$.

Equilateral: $AC = AB$, so $9 + (k - 1)^2 = 36 \Rightarrow (k - 1)^2 = 27 \Rightarrow k - 1 = \pm 3\sqrt3$.

Since $k > 1$, $k = 1 + 3\sqrt3 \approx 6.20$.`, sol: r`$C$ lies on the perpendicular bisector $x = 4$ of $AB$, at height $3\sqrt3$ (the height of an equilateral triangle of side $6$) above $AB$.`, scheme: [['AB = 6 and AC = BC', 1], ['(k − 1)² = 27', 1], ['k = 1 + 3√3', 1]], d: 4, c: 'analysis', t: [1], time: 300 }), (C) => { const k = 1 + 3 * Math.sqrt(3); const [A, B, Cc] = [[1, 1], [7, 1], [4, k]]; C.assert(near(dist(A, B), dist(A, Cc)) && near(dist(A, B), dist(B, Cc)), 'equilateral'); C.model([6, 27, '1 + 3\\sqrt3', 6.2]); });
Q('s304', mk.short({ marks: 3, stem: 'Find the coordinates of the points that divide the segment joining $A(-4, 1)$ and $B(8, 9)$ into four equal parts.', model: r`The points divide $AB$ in the ratios $1 : 3$, $1 : 1$ and $3 : 1$.

$P = \left(\dfrac{8 - 12}{4}, \dfrac{9 + 3}{4}\right) = (-1, 3)$; $\quad Q = \left(\dfrac{-4 + 8}{2}, \dfrac{1 + 9}{2}\right) = (2, 5)$; $\quad R = \left(\dfrac{24 - 4}{4}, \dfrac{27 + 1}{4}\right) = (5, 7)$.`, sol: r`**Check:** each step from $A$ to $P$ to $Q$ to $R$ to $B$ adds $(3, 2)$.`, scheme: [['Ratios 1 : 3, 1 : 1, 3 : 1', 1], ['P(−1, 3) and Q(2, 5)', 1], ['R(5, 7)', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { const A = [-4, 1], B = [8, 9]; const pts = [[1, 3], [1, 1], [3, 1]].map(([m, n]) => divide(A, B, m, n)); C.assert(same(pts[0], [-1, 3]) && same(pts[1], [2, 5]) && same(pts[2], [5, 7]), 'points'); C.model([-1, 3, 2, 5, 7]); });
Q('s305', mk.short({ marks: 3, stem: 'The point $P(x, 2)$ lies on the segment joining $A(-4, 8)$ and $B(11, -7)$. Find the ratio in which $P$ divides $AB$, and find $x$.', model: r`Let $AP : PB = k : 1$. Using $y$: $\dfrac{-7k + 8}{k + 1} = 2 \Rightarrow -7k + 8 = 2k + 2 \Rightarrow 9k = 6 \Rightarrow k = \dfrac23$. Ratio $2 : 3$.

$x = \dfrac{2 \times 11 + 3 \times (-4)}{5} = \dfrac{10}{5} = 2$.`, sol: r`**Check:** $AP = \sqrt{36 + 36} = 6\sqrt2$ and $PB = \sqrt{81 + 81} = 9\sqrt2$, ratio $2 : 3$.`, scheme: [['Equation in k from y', 1], ['Ratio 2 : 3', 1], ['x = 2', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { const A = [-4, 8], B = [11, -7]; const t = (2 - A[1]) / (B[1] - A[1]); C.assert(near(t / (1 - t), 2 / 3), 'ratio'); const P = divide(A, B, 2, 3); C.assert(same(P, [2, 2]), 'P'); C.model(['2 : 3', 2]); C.sol([6, 9]); });
Q('s306', mk.short({ marks: 3, stem: '$A(-1, 2)$, $B(3, a)$, $C(6, 7)$ and $D(b, 5)$ are the vertices of parallelogram $ABCD$, taken in order. Find $a$ and $b$.', model: r`The diagonals of a parallelogram bisect each other, so $AC$ and $BD$ have the same midpoint.

Midpoint of $AC = \left(\dfrac{-1 + 6}{2}, \dfrac{2 + 7}{2}\right) = (2.5, 4.5)$.

Midpoint of $BD = \left(\dfrac{3 + b}{2}, \dfrac{a + 5}{2}\right)$. So $3 + b = 5$, $b = 2$, and $a + 5 = 9$, $a = 4$.`, sol: r`**Check:** $AB$ goes from $(-1, 2)$ to $(3, 4)$, a step of $(4, 2)$; $DC$ goes from $(2, 5)$ to $(6, 7)$, also $(4, 2)$.`, scheme: [['Diagonals bisect each other', 1], ['b = 2', 1], ['a = 4', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { const [A, B, Cc, D] = [[-1, 2], [3, 4], [6, 7], [2, 5]]; C.assert(same(mid(A, Cc), mid(B, D)) && B[0] - A[0] === Cc[0] - D[0] && B[1] - A[1] === Cc[1] - D[1], 'parallelogram'); C.model([2.5, 4.5, 2, 4]); });
Q('s307', mk.short({ marks: 3, stem: '$AB$ is a diameter of a circle with centre $O(2, -3)$. If $A$ is $(-1, 1)$, find $B$ and the radius of the circle.', model: r`$O$ is the midpoint of $AB$. With $B(x, y)$: $\dfrac{-1 + x}{2} = 2 \Rightarrow x = 5$ and $\dfrac{1 + y}{2} = -3 \Rightarrow y = -7$. So $B = (5, -7)$.

Radius $= OA = \sqrt{3^2 + 4^2} = 5$ units. (Check: $OB = \sqrt{9 + 16} = 5$.)`, sol: 'The centre is the midpoint of every diameter.', scheme: [['O is the midpoint of AB', 1], ['B(5, −7)', 1], ['Radius 5 with check', 1]], d: 2, c: 'application', t: [1, 2], time: 240 }), (C) => { const B = [5, -7]; C.assert(same(mid([-1, 1], B), [2, -3]) && dist([2, -3], [-1, 1]) === 5 && dist([2, -3], B) === 5, 'diameter'); C.model([5, -7]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: `A flower bed at Lalbagh, Bengaluru, is drawn on a grid with corners $A(1, 0)$, $B(5, 3)$, $C(9, 0)$ and $D(5, -3)$, where 1 unit is 1 m.

(a) Find the lengths of the four sides.
(b) Find the lengths of the diagonals $AC$ and $BD$.
(c) Name the shape, giving reasons.
(d) Show that the diagonals bisect each other.`, model: r`(a) $AB = \sqrt{16 + 9} = 5$ m, $BC = \sqrt{16 + 9} = 5$ m, $CD = \sqrt{16 + 9} = 5$ m, $DA = \sqrt{16 + 9} = 5$ m.

(b) $AC = 9 - 1 = 8$ m (horizontal) and $BD = 3 - (-3) = 6$ m (vertical).

(c) All four sides are equal but the diagonals are unequal ($8 \ne 6$), so $ABCD$ is a **rhombus that is not a square**.

(d) Midpoint of $AC = \left(\dfrac{1 + 9}{2}, 0\right) = (5, 0)$ and midpoint of $BD = \left(5, \dfrac{3 - 3}{2}\right) = (5, 0)$. They are the same point, so the diagonals bisect each other (and, being horizontal and vertical, they cross at right angles).`, sol: 'Equal sides with unequal diagonals means a rhombus, not a square.', scheme: [['Four sides 5 m', 1], ['Diagonals 8 m and 6 m', 1], ['Rhombus, not square, with reason', 1], ['Both midpoints (5, 0)', 1], ['Conclusion on bisection', 1]], d: 3, c: 'analysis', t: [1, 2], time: 600 }), (C) => { const P = [[1, 0], [5, 3], [9, 0], [5, -3]]; C.assert(P.every((p, i) => near(dist(p, P[(i + 1) % 4]), 5)) && dist(P[0], P[2]) === 8 && dist(P[1], P[3]) === 6 && same(mid(P[0], P[2]), mid(P[1], P[3])), 'rhombus'); C.model([5, 8, 6]); });
Q('l02', mk.long({ stem: `The vertices of triangle $ABC$ are $A(-1, 4)$, $B(5, 2)$ and $C(3, -6)$.

(a) Find the midpoint $D$ of $BC$ and the midpoint $E$ of $CA$.
(b) Find the point $P$ that divides the median $AD$ in the ratio $2 : 1$.
(c) Find the point $Q$ that divides the median $BE$ in the ratio $2 : 1$. What do you notice?
(d) Find the length of $AD$.`, model: r`(a) $D = \left(\dfrac{5 + 3}{2}, \dfrac{2 - 6}{2}\right) = (4, -2)$; $E = \left(\dfrac{3 - 1}{2}, \dfrac{-6 + 4}{2}\right) = (1, -1)$.

(b) $P = \left(\dfrac{2 \times 4 + 1 \times (-1)}{3}, \dfrac{2 \times (-2) + 1 \times 4}{3}\right) = \left(\dfrac73, 0\right)$.

(c) $Q = \left(\dfrac{2 \times 1 + 1 \times 5}{3}, \dfrac{2 \times (-1) + 1 \times 2}{3}\right) = \left(\dfrac73, 0\right)$. $P$ and $Q$ are the **same point**: the two medians meet at the point that divides each of them in the ratio $2 : 1$.

(d) $AD = \sqrt{(4 + 1)^2 + (-2 - 4)^2} = \sqrt{25 + 36} = \sqrt{61} \approx 7.81$ units.`, sol: r`The common point $\left(\dfrac73, 0\right)$ is where all three medians meet; its coordinates are the averages of the vertices' coordinates: $\dfrac{-1 + 5 + 3}{3} = \dfrac73$ and $\dfrac{4 + 2 - 6}{3} = 0$.`, scheme: [['D(4, −2) and E(1, −1)', 1], ['P(7/3, 0)', 1], ['Q(7/3, 0)', 1], ['Observation: same point', 1], ['AD = √61', 1]], d: 4, c: 'analysis', t: [1, 2], time: 660 }), (C) => { const [A, B, Cc] = [[-1, 4], [5, 2], [3, -6]]; const D = mid(B, Cc), E = mid(Cc, A); const P = divide(A, D, 2, 1), Qp = divide(B, E, 2, 1); C.assert(same(D, [4, -2]) && same(E, [1, -1]) && same(P, Qp) && same(P, [7 / 3, 0]), 'medians'); C.model([4, -2, 1, -1, '\\dfrac73', '\\sqrt{61}', rt(dist(A, D)).toFixed(2) * 1]); });
Q('l03', mk.long({ stem: `On a district map (1 unit = 1 km), three villages near Wardha are at $A(2, 1)$, $B(10, 7)$ and $C(18, 1)$. A straight road runs from $A$ to $C$.

(a) Find $AB$, $BC$ and $AC$, and name the type of triangle $ABC$.
(b) A health centre $W$ is to be built on the road $AC$ so that it is equally far from $A$ and $B$. Find its coordinates.
(c) How far is the health centre from $C$?`, model: r`(a) $AB = \sqrt{64 + 36} = 10$ km, $BC = \sqrt{64 + 36} = 10$ km, $AC = 16$ km. Two sides are equal: $ABC$ is **isosceles** (and not right-angled, since $10^2 + 10^2 = 200 \ne 256 = 16^2$).

(b) The road $AC$ is the line $y = 1$, so $W = (x, 1)$. $WA^2 = WB^2$: $(x - 2)^2 = (x - 10)^2 + 36$.

$x^2 - 4x + 4 = x^2 - 20x + 136 \Rightarrow 16x = 132 \Rightarrow x = 8.25$. So $W = (8.25, 1)$.

Check: $WA = 6.25$ km and $WB = \sqrt{1.75^2 + 6^2} = \sqrt{39.0625} = 6.25$ km.

(c) $WC = 18 - 8.25 = 9.75$ km.`, sol: r`Since $A$ and $C$ have the same $y$-coordinate, every point of the road has $y = 1$.`, scheme: [['AB = BC = 10, AC = 16, isosceles', 1], ['W = (x, 1) and WA² = WB²', 1], ['x = 8.25', 1], ['Check WA = WB = 6.25', 1], ['WC = 9.75 km', 1]], d: 4, c: 'application', t: [1], time: 660 }), (C) => { const [A, B, Cc] = [[2, 1], [10, 7], [18, 1]]; let W = null; for (let x = 2; x <= 18; x += 0.25) if (near(dist([x, 1], A), dist([x, 1], B))) W = [x, 1]; C.assert(W && W[0] === 8.25 && near(dist(W, A), 6.25), 'W'); C.model([10, 16, 200, 256, 132, 8.25, 6.25, 39.0625, dist(W, Cc)]); });
Q('l04', mk.long({ stem: `$A(1, 3)$ and $B(5, 1)$ are two points.

(a) Find $AB^2$.
(b) $P(x, 0)$ is a point on the $x$-axis such that the angle $APB$ is a right angle. Show that $x^2 - 6x + 8 = 0$.
(c) Find all such points $P$.
(d) For which of these points is triangle $APB$ isosceles? Justify.`, model: r`(a) $AB^2 = 4^2 + (-2)^2 = 20$.

(b) The angle at $P$ is $90^\circ$ exactly when $PA^2 + PB^2 = AB^2$ (Pythagoras' theorem and its converse).

$PA^2 + PB^2 = (x - 1)^2 + 9 + (x - 5)^2 + 1 = 2x^2 - 12x + 36$. Setting this equal to $20$: $2x^2 - 12x + 16 = 0$, i.e. $x^2 - 6x + 8 = 0$.

(c) $(x - 2)(x - 4) = 0$, so $P = (2, 0)$ or $P = (4, 0)$.

(d) For $P(2, 0)$: $PA = \sqrt{1 + 9} = \sqrt{10}$ and $PB = \sqrt{9 + 1} = \sqrt{10}$: equal, so the triangle is isosceles (right-angled and isosceles).

For $P(4, 0)$: $PA = \sqrt{9 + 9} = \sqrt{18}$ and $PB = \sqrt{1 + 1} = \sqrt2$: not isosceles (check: $18 + 2 = 20$).`, sol: r`Both points satisfy the right-angle condition; only one gives equal legs.`, scheme: [['AB² = 20', 1], ['Equation x² − 6x + 8 = 0 derived', 1], ['P(2, 0) and P(4, 0)', 1], ['P(2, 0): PA = PB = √10', 1], ['P(4, 0): √18 and √2, not isosceles', 1]], d: 5, c: 'analysis', t: [1], time: 720 }), (C) => { const A = [1, 3], B = [5, 1]; const sq = (P, Q) => dist(P, Q) ** 2; const xs = search((x) => near(sq([x, 0], A) + sq([x, 0], B), sq(A, B))); C.assert(xs.join() === '2,4', xs.join()); C.assert(near(dist([2, 0], A), dist([2, 0], B)) && !near(dist([4, 0], A), dist([4, 0], B)), 'isosceles at 2'); C.model([20, 'x^2 - 6x + 8 = 0', '\\sqrt{10}', '\\sqrt{18}', '\\sqrt2']); });
Q('l05', mk.long({ stem: `$A(-3, -6)$ and $B(6, 3)$ are two points.

(a) Find the ratio in which the $x$-axis divides $AB$, and the point of division $P$.
(b) Find the ratio in which the $y$-axis divides $AB$, and the point of division $Q$.
(c) Show that $Q$ and $P$ divide $AB$ into three equal parts.
(d) Find the length of each part.`, model: r`(a) With ratio $k : 1$ and $y = 0$: $\dfrac{3k - 6}{k + 1} = 0 \Rightarrow k = 2$. Ratio $2 : 1$; $P = \left(\dfrac{2 \times 6 - 3}{3}, 0\right) = (3, 0)$.

(b) With $x = 0$: $\dfrac{6k - 3}{k + 1} = 0 \Rightarrow k = \dfrac12$. Ratio $1 : 2$; $Q = \left(0, \dfrac{3 - 12}{3}\right) = (0, -3)$.

(c) $Q$ divides $AB$ in the ratio $1 : 2$ and $P$ in the ratio $2 : 1$, so they are the two points of trisection: $AQ = QP = PB = \dfrac13 AB$. (Each step $A \to Q \to P \to B$ adds $(3, 3)$.)

(d) $AB = \sqrt{81 + 81} = 9\sqrt2$, so each part is $3\sqrt2 \approx 4.24$ units.`, sol: r`Check (d): $AQ = \sqrt{9 + 9} = 3\sqrt2$.`, scheme: [['x-axis: 2 : 1, P(3, 0)', 1], ['y-axis: 1 : 2, Q(0, −3)', 1], ['Trisection argued', 1], ['AB = 9√2', 1], ['Each part 3√2', 1]], d: 4, c: 'analysis', t: [1, 2], time: 660 }), (C) => { const A = [-3, -6], B = [6, 3]; const P = divide(A, B, 2, 1), Qp = divide(A, B, 1, 2); C.assert(same(P, [3, 0]) && same(Qp, [0, -3]) && near(dist(A, Qp), dist(Qp, P)) && near(dist(Qp, P), dist(P, B)) && near(dist(A, B), 9 * Math.SQRT2), 'trisection'); C.model([2, 3, -3, '9\\sqrt2', '3\\sqrt2', 4.24]); });
Q('l06', mk.long({ stem: `On a map of Jaipur (1 unit = 1 km), a warehouse is at $W(-4, -3)$ and a shop at $S(8, 6)$.

(a) Find the straight-line distance $WS$.
(b) A fuel station $F$ lies on $WS$ with $WF : FS = 1 : 2$. Find $F$.
(c) Find $WF$ and check that it is one-third of $WS$.
(d) A second shop is at $T(11, 2)$. Show that triangle $WST$ is right-angled, and name the right angle.`, model: r`(a) $WS = \sqrt{12^2 + 9^2} = \sqrt{225} = 15$ km.

(b) $F = \left(\dfrac{1 \times 8 + 2 \times (-4)}{3}, \dfrac{1 \times 6 + 2 \times (-3)}{3}\right) = (0, 0)$: the fuel station is at the origin.

(c) $WF = \sqrt{16 + 9} = 5$ km $= \dfrac{15}{3}$ ✓.

(d) $ST = \sqrt{9 + 16} = 5$, $WT = \sqrt{225 + 25} = \sqrt{250}$. $WS^2 + ST^2 = 225 + 25 = 250 = WT^2$, so the triangle is right-angled at $S$ (angle $WST = 90^\circ$).`, sol: 'Use squared lengths for the right-angle test.', scheme: [['WS = 15 km', 1], ['F = (0, 0)', 1], ['WF = 5 km', 1], ['ST = 5 and WT² = 250', 1], ['Right angle at S', 1]], d: 3, c: 'application', t: [1, 2], time: 600 }), (C) => { const [W, S, T] = [[-4, -3], [8, 6], [11, 2]]; const F = divide(W, S, 1, 2); C.assert(same(F, [0, 0]) && near(dist(W, F), dist(W, S) / 3) && near(dist(W, S) ** 2 + dist(S, T) ** 2, dist(W, T) ** 2), 'all'); C.model([15, 5, 225, 25, 250]); });

// =============================================================== Case-based
caseQ('c01', {
  passage: 'For a treasure hunt at a school in Shimla, the playground is marked with a grid (1 unit = 1 m). The first clue is at $A(1, 2)$ and the second at $B(7, 10)$. The treasure lies on the straight line from $A$ to $B$, one-quarter of the way from $A$.',
  d: 3, c: 'application',
  model: r`(a) Option (b): $10$ m. (b) $(4, 6)$. (c) (i) $(2.5, 4)$. Or (ii) $AB = AC = 10$ and $AB^2 + AC^2 = 200 = BC^2$: isosceles and right-angled at $A$.`,
  sol: r`(a) $\sqrt{36 + 64} = 10$. (b) $\left(\dfrac{1 + 7}{2}, \dfrac{2 + 10}{2}\right)$. (c) (i) $AP : PB = 1 : 3$: $\left(\dfrac{7 + 3}{4}, \dfrac{10 + 6}{4}\right)$. (ii) $BC = \sqrt{4 + 196} = \sqrt{200}$.`,
  children: [
    child('a', mk.mcq({ stem: 'The distance between the two clues is', opts: ['$14$ m', '$10$ m', r`$\sqrt{52}$ m`, '$100$ m'], key: 'b', sol: r`$AB = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$ m. Option (a) adds $6 + 8$; option (d) forgets the square root.`, d: 1, c: 'understanding', t: [1], time: 60 })),
    child('b', mk.fill({ stem: 'The midpoint of $AB$ is $(4,$ ___$)$.', acc: [['6']], sol: r`$\dfrac{2 + 10}{2} = 6$.`, d: 1, c: 'understanding', t: [2], time: 45 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the coordinates of the treasure.', model: r`One-quarter of the way from $A$ means $AP : PB = 1 : 3$.

$P = \left(\dfrac{1 \times 7 + 3 \times 1}{4}, \dfrac{1 \times 10 + 3 \times 2}{4}\right) = (2.5, 4)$.`, sol: 'One-quarter of the way is the ratio 1 : 3, not 1 : 4.', scheme: [['Ratio 1 : 3', 1], ['(2.5, 4)', 1]], d: 3, c: 'application', t: [2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** A third clue is at $C(9, -4)$. What kind of triangle do the three clues form? Justify.', model: r`$AB = 10$, $AC = \sqrt{64 + 36} = 10$, $BC = \sqrt{4 + 196} = \sqrt{200}$.

$AB = AC$, and $AB^2 + AC^2 = 100 + 100 = 200 = BC^2$. So the triangle is **isosceles and right-angled at $A$**.`, sol: 'Compare all three squared lengths.', scheme: [['Three lengths', 1], ['Isosceles right triangle, right angle at A', 1]], d: 3, c: 'analysis', t: [1], time: 150 }),
    ]),
  ],
}, (C) => { const [A, B, Cc] = [[1, 2], [7, 10], [9, -4]]; C.child('a').which([14, 10, Math.sqrt(52), 100], dist(A, B)); C.child('b').blank(mid(A, B)[1]); const P = divide(A, B, 1, 3); C.child('c').assert(same(P, [2.5, 4]) && near(dist(A, P), dist(A, B) / 4), 'quarter'); C.child('c').model([2.5, 4]); C.child('cii').assert(near(dist(A, Cc), 10) && near(dist(A, B) ** 2 + dist(A, Cc) ** 2, dist(B, Cc) ** 2), 'right at A'); C.child('cii').model([200]); C.model(['(2.5, 4)', 10, 200]); });

caseQ('c02', {
  passage: 'A new metro line in Kolkata runs straight from station $A(-3, 2)$ to station $B(9, 8)$ on the city grid, where 1 unit is 1 km. The graph shows the line.',
  assets: [qMetro], d: 3, c: 'application',
  model: r`(a) Option (c): $(3, 5)$. (b) $(1, 4)$. (c) (i) $AP = 2\sqrt5 \approx 4.47$ km. Or (ii) $1 : 3$, at $(0, 3.5)$.`,
  sol: r`(a) $\left(\dfrac{-3 + 9}{2}, \dfrac{2 + 8}{2}\right)$. (b) $P = \left(\dfrac{9 - 6}{3}, \dfrac{8 + 4}{3}\right)$. (c) (i) $\sqrt{16 + 4}$. (ii) $\dfrac{9k - 3}{k + 1} = 0$.`,
  children: [
    child('a', mk.mcq({ stem: 'An interchange station is to be built exactly halfway between A and B. Its position is', opts: ['$(6, 3)$', '$(6, 10)$', '$(3, 5)$', '$(12, 6)$'], key: 'c', sol: r`Midpoint $= \left(\dfrac{-3 + 9}{2}, \dfrac{2 + 8}{2}\right) = (3, 5)$. Option (a) halves the differences; option (d) is the difference itself.`, d: 1, c: 'understanding', t: [2], time: 60 })),
    child('b', mk.num({ stem: 'Station P divides AB in the ratio 1 : 2. Find the y-coordinate of P.', value: 4, sol: r`$y = \dfrac{1 \times 8 + 2 \times 2}{3} = \dfrac{12}{3} = 4$; $P = (1, 4)$.`, scheme: [['4', 1]], d: 2, c: 'understanding', t: [2], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** How far is station P from station A?', model: r`$P = \left(\dfrac{9 + 2(-3)}{3}, 4\right) = (1, 4)$. $AP = \sqrt{(1 + 3)^2 + (4 - 2)^2} = \sqrt{20} = 2\sqrt5 \approx 4.47$ km.`, sol: r`Also $AB = \sqrt{144 + 36} = 6\sqrt5$, and $AP = \dfrac13 AB$ ✓.`, scheme: [['P = (1, 4)', 1], ['AP = 2√5 ≈ 4.47 km', 1]], d: 2, c: 'application', t: [1, 2], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** The line crosses the $y$-axis (a highway). In what ratio does the highway divide AB, and where does the line cross it?', model: r`On the $y$-axis $x = 0$: $\dfrac{9k - 3}{k + 1} = 0 \Rightarrow k = \dfrac13$. Ratio $1 : 3$.

$y = \dfrac{1 \times 8 + 3 \times 2}{4} = \dfrac{14}{4} = 3.5$. The crossing is at $(0, 3.5)$.`, sol: 'Use the k : 1 form.', scheme: [['Ratio 1 : 3', 1], ['(0, 3.5)', 1]], d: 3, c: 'application', t: [2], time: 150 }),
    ]),
  ],
}, (C) => { const A = [-3, 2], B = [9, 8]; C.child('a').which([[6, 3], [6, 10], [3, 5], [12, 6]], mid(A, B)); const P = divide(A, B, 1, 2); C.child('b').val(P[1]); C.child('c').model([4, 4.47]); C.child('c').assert(near(dist(A, P), 2 * Math.sqrt(5)) && near(dist(A, P), dist(A, B) / 3), 'AP'); const t = -A[0] / (B[0] - A[0]); C.child('cii').assert(near(t / (1 - t), 1 / 3), '1:3'); C.child('cii').model([3.5]); C.model(['(3, 5)', '(1, 4)', '2\\sqrt5', '(0, 3.5)']); });

caseQ('c03', {
  passage: 'A playground in Bhopal is drawn on a grid (1 unit = 10 m) with corners $P(-2, 1)$, $Q(2, -2)$, $R(5, 2)$ and $S(1, 5)$, taken in order.',
  d: 3, c: 'analysis',
  model: r`(a) Option (d): $5$ units. (b) $7.07$ units. (c) (i) All sides $5$, diagonals $\sqrt{50}$: a square. Or (ii) Centre $(1.5, 1.5)$, about $3.54$ units ($35.4$ m) from every corner.`,
  sol: r`$PQ = QR = RS = SP = 5$; $PR = \sqrt{49 + 1} = \sqrt{50}$, $QS = \sqrt{1 + 49} = \sqrt{50}$. Centre $= $ midpoint of $PR = (1.5, 1.5)$.`,
  children: [
    child('a', mk.mcq({ stem: 'The length of side PQ (in grid units) is', opts: ['$7$', r`$\sqrt{7}$`, '$25$', '$5$'], key: 'd', sol: r`$PQ = \sqrt{4^2 + (-3)^2} = \sqrt{25} = 5$. Option (a) adds $4 + 3$; option (c) forgets the square root.`, d: 1, c: 'understanding', t: [1], time: 60 })),
    child('b', mk.num({ stem: 'Find the length of diagonal PR in grid units, correct to two decimal places.', value: 7.07, tol: 0.005, unit: 'units', sol: r`$PR = \sqrt{7^2 + 1^2} = \sqrt{50} = 5\sqrt2 \approx 7.07$.`, scheme: [['7.07', 1]], d: 2, c: 'understanding', t: [1], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Show that the playground is a square.', model: r`$PQ = QR = RS = SP = 5$ units (each is $\sqrt{4^2 + 3^2}$).

Diagonals: $PR = \sqrt{50}$ and $QS = \sqrt{1 + 49} = \sqrt{50}$.

Four equal sides and equal diagonals: $PQRS$ is a square.`, sol: 'Equal sides give a rhombus; equal diagonals make it a square.', scheme: [['Four equal sides', 1], ['Equal diagonals and conclusion', 1]], d: 3, c: 'analysis', t: [1], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** A flagpole is to stand at the centre of the playground. Find its position, and its distance in metres from each corner.', model: r`The centre is the midpoint of diagonal $PR$: $\left(\dfrac{-2 + 5}{2}, \dfrac{1 + 2}{2}\right) = (1.5, 1.5)$ (also the midpoint of $QS$).

Distance to each corner $= \dfrac12 PR = \dfrac{\sqrt{50}}{2} \approx 3.54$ units $\approx 35.4$ m.`, sol: 'The diagonals of a square are equal and bisect each other.', scheme: [['Centre (1.5, 1.5)', 1], ['About 35.4 m', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }),
    ]),
  ],
}, (C) => { const V = [[-2, 1], [2, -2], [5, 2], [1, 5]]; C.child('a').which([7, Math.sqrt(7), 25, 5], dist(V[0], V[1])); C.child('b').val(dist(V[0], V[2]), 0.005); C.child('c').assert(V.every((p, i) => near(dist(p, V[(i + 1) % 4]), 5)) && near(dist(V[0], V[2]), dist(V[1], V[3])), 'square'); C.child('c').model([5, '\\sqrt{50}']); const O = mid(V[0], V[2]); C.child('cii').assert(same(O, mid(V[1], V[3])) && V.every((p) => near(dist(O, p), Math.sqrt(50) / 2)), 'centre'); C.child('cii').model([1.5, 3.54, 35.4]); C.model(['(1.5, 1.5)', 7.07, 3.54, 35.4]); });

caseQ('c04', {
  passage: 'A farm near Nashik is mapped with the $x$-axis and $y$-axis along two boundary walls (1 unit = 10 m). A straight irrigation pipe runs from $A(-4, 6)$ to $B(8, -3)$, crossing both walls.',
  d: 3, c: 'application',
  model: r`(a) Option (a): $(2, 1.5)$. (b) $15$ units. (c) (i) $2 : 1$, at $(4, 0)$. Or (ii) $1 : 2$, at $(0, 3)$.`,
  sol: r`(a) $\left(\dfrac{-4 + 8}{2}, \dfrac{6 - 3}{2}\right)$. (b) $\sqrt{144 + 81} = 15$. (c) (i) $y = 0$: $\dfrac{-3k + 6}{k + 1} = 0$, $k = 2$. (ii) $x = 0$: $\dfrac{8k - 4}{k + 1} = 0$, $k = \dfrac12$.`,
  children: [
    child('a', mk.mcq({ stem: 'The midpoint of the pipe is at', opts: ['$(2, 1.5)$', '$(6, -4.5)$', '$(2, 4.5)$', '$(4, 3)$'], key: 'a', sol: r`$\left(\dfrac{-4 + 8}{2}, \dfrac{6 + (-3)}{2}\right) = (2, 1.5)$. Option (b) halves the differences.`, d: 1, c: 'understanding', t: [2], time: 60 })),
    child('b', mk.num({ stem: 'Find the length of the pipe in grid units.', value: 15, unit: 'units', sol: r`$AB = \sqrt{12^2 + 9^2} = \sqrt{225} = 15$ units ($150$ m).`, scheme: [['15', 1]], d: 2, c: 'understanding', t: [1], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** In what ratio does the $x$-axis wall divide the pipe, and where does the pipe cross it?', model: r`$y = 0$: $\dfrac{-3k + 6}{k + 1} = 0 \Rightarrow k = 2$. Ratio $2 : 1$.

$x = \dfrac{2 \times 8 + 1 \times (-4)}{3} = 4$. The pipe crosses at $(4, 0)$.`, sol: 'Set the y-coordinate of the division point to 0.', scheme: [['Ratio 2 : 1', 1], ['(4, 0)', 1]], d: 3, c: 'application', t: [2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** In what ratio does the $y$-axis wall divide the pipe, and where does the pipe cross it?', model: r`$x = 0$: $\dfrac{8k - 4}{k + 1} = 0 \Rightarrow k = \dfrac12$. Ratio $1 : 2$.

$y = \dfrac{1 \times (-3) + 2 \times 6}{3} = 3$. The pipe crosses at $(0, 3)$.`, sol: 'Set the x-coordinate of the division point to 0.', scheme: [['Ratio 1 : 2', 1], ['(0, 3)', 1]], d: 3, c: 'application', t: [2], time: 150 }),
    ]),
  ],
}, (C) => { const A = [-4, 6], B = [8, -3]; C.child('a').which([[2, 1.5], [6, -4.5], [2, 4.5], [4, 3]], mid(A, B)); C.child('b').val(dist(A, B)); C.child('c').assert(same(divide(A, B, 2, 1), [4, 0]), 'x-axis'); C.child('c').model([4]); C.child('cii').assert(same(divide(A, B, 1, 2), [0, 3]), 'y-axis'); C.child('cii').model([3]); C.model(['(2, 1.5)', 15, '(4, 0)', '(0, 3)']); });

caseQ('c05', {
  passage: 'A mobile tower near Kanpur stands at $T(2, 3)$ on a map grid (1 unit = 1 km) and covers every place within 5 km of it. Three villages are at $P(5, 7)$, $Q(-2, 6)$ and $R(6, -1)$.',
  d: 4, c: 'analysis',
  model: r`(a) Option (b): $5$ km. (b) no. (c) (i) $M(1.5, 6.5)$, $TM = \sqrt{12.5} \approx 3.54$ km. Or (ii) $4\sqrt2 \approx 5.66$ km.`,
  sol: r`$TP = \sqrt{9 + 16} = 5$, $TQ = \sqrt{16 + 9} = 5$, $TR = \sqrt{16 + 16} = \sqrt{32} \approx 5.66 > 5$.`,
  children: [
    child('a', mk.mcq({ stem: 'The distance of village P from the tower is', opts: ['$7$ km', '$5$ km', '$25$ km', r`$\sqrt{7}$ km`], key: 'b', sol: r`$TP = \sqrt{3^2 + 4^2} = 5$ km: P is just within range (on the boundary).`, d: 1, c: 'understanding', t: [1], time: 60 })),
    child('b', mk.fill({ stem: 'Is village R covered by the tower? Answer yes or no: ___', acc: [['no']], sol: r`$TR = \sqrt{16 + 16} = \sqrt{32} \approx 5.66$ km $> 5$ km, so R is **not** covered.`, d: 2, c: 'application', t: [1], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** A repeater is placed at the midpoint M of PQ. Find M and its distance from the tower.', model: r`$M = \left(\dfrac{5 - 2}{2}, \dfrac{7 + 6}{2}\right) = (1.5, 6.5)$.

$TM = \sqrt{0.5^2 + 3.5^2} = \sqrt{0.25 + 12.25} = \sqrt{12.5} \approx 3.54$ km.`, sol: 'P and Q are both 5 km from T, so the midpoint of PQ is closer than 5 km.', scheme: [['M(1.5, 6.5)', 1], ['TM ≈ 3.54 km', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** What is the least range (in km) the tower needs so that all three villages are covered?', model: r`The farthest village decides: $TP = 5$, $TQ = 5$, $TR = \sqrt{32} = 4\sqrt2 \approx 5.66$ km.

The least range is $4\sqrt2 \approx 5.66$ km.`, sol: 'Compare all three distances and take the largest.', scheme: [['Three distances', 1], ['4√2 ≈ 5.66 km', 1]], d: 4, c: 'analysis', t: [1], time: 150 }),
    ]),
  ],
}, (C) => { const [T, P, Qv, R] = [[2, 3], [5, 7], [-2, 6], [6, -1]]; C.child('a').which([7, 5, 25, Math.sqrt(7)], dist(T, P)); C.child('b').assert(dist(T, R) > 5, 'R outside'); C.child('b').blank('no'); const M = mid(P, Qv); C.child('c').assert(same(M, [1.5, 6.5]), 'M'); C.child('c').model([1.5, 6.5, 12.5, 3.54]); C.child('cii').assert(near(Math.max(dist(T, P), dist(T, Qv), dist(T, R)), 4 * Math.SQRT2), 'max'); C.child('cii').model([5.66, '4\\sqrt2']); C.model(['(1.5, 6.5)', 3.54, 5.66]); });

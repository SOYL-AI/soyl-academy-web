// CBSE 9 Mathematics ch06 Coordinate Geometry: written items (short 2 and 3 marks, long 5 marks, case-based).
// Positions come from sign tests, distances from differences of shared coordinates, midpoints from averages.
import { Q, caseQ, child, mk, plot } from './lib.mjs';
import { r, must, close, range, where, mid, along } from './h.mjs';

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Write the quadrant in which each point lies: $(3, -4)$, $(-2, -5)$, $(-6, 1)$ and $(5, 2)$.`, model: r`$(3, -4)$ has $x > 0$, $y < 0$: fourth quadrant.\n\n$(-2, -5)$ has both coordinates negative: third quadrant.\n\n$(-6, 1)$ has $x < 0$, $y > 0$: second quadrant.\n\n$(5, 2)$ has both coordinates positive: first quadrant.`, sol: 'Use the signs of the two coordinates.', scheme: [['Fourth and third quadrants', 1], ['Second and first quadrants', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert([[3, -4], [-2, -5], [-6, 1], [5, 2]].map(([x, y]) => where(x, y)).join() === 'fourth quadrant,third quadrant,second quadrant,first quadrant', 'quadrants'); Cx.model(['fourth', 'third', 'second', 'first']); });
{
  const S = [-2, 2], side = along([-2, -2], [2, -2]);
  Q('s202', mk.short({ marks: 2, stem: r`Three vertices of a square with sides parallel to the axes are $(-2, -2)$, $(2, -2)$ and $(2, 2)$. Find the fourth vertex and the area of the square.`, model: r`The fourth vertex has the $x$-coordinate of $(-2, -2)$ and the $y$-coordinate of $(2, 2)$, so it is $(-2, 2)$.\n\nThe side is $|2 - (-2)| = 4$, so the area is $4 \times 4 = 16$ square units.`, sol: 'Match the missing coordinates with the given vertices.', scheme: [['(-2, 2)', 1], ['Side 4 and area 16', 1]], d: 2, c: 'application', t: [1, 2], time: 90 }), (Cx) => { Cx.assert(S[0] === -2 && S[1] === 2 && side === 4 && side * side === 16 && along([2, -2], [2, 2]) === side, 'square'); Cx.model([2, 4, 16]); });
}
Q('s203', mk.short({ marks: 2, stem: r`(a) Write the coordinates of the origin. (b) What are the signs of the $x$-coordinate and the $y$-coordinate of a point in the second quadrant?`, model: r`(a) The origin is $(0, 0)$, where the two axes cross.\n\n(b) In the second quadrant the point is to the left of the $y$-axis and above the $x$-axis, so the $x$-coordinate is negative and the $y$-coordinate is positive.`, sol: 'Think of the position relative to each axis.', scheme: [['(0, 0)', 1], ['x negative and y positive', 1]], d: 1, c: 'recall', t: [1], time: 75 }), (Cx) => { Cx.assert(where(0, 0) === 'origin' && where(-3, 4) === 'second quadrant' && -3 < 0 && 4 > 0, 'origin and signs'); Cx.model([0]); });
Q('s204', mk.short({ marks: 2, stem: r`On the plan of a park in Imphal the entrance gate is the origin. A fountain is at $(3, 4)$. A bench is $5$ units to the west of the fountain on the same horizontal path. Write the coordinates of the bench and name its quadrant.`, model: r`Going west decreases the $x$-coordinate and the $y$-coordinate stays the same: $(3 - 5, 4) = (-2, 4)$.\n\nIt has $x < 0$ and $y > 0$, so the bench is in the second quadrant.`, sol: 'West means a smaller x-coordinate.', scheme: [['(-2, 4)', 1], ['Second quadrant', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { const b = [3 - 5, 4]; Cx.assert(b[0] === -2 && b[1] === 4 && where(...b) === 'second quadrant', 'bench'); Cx.model([3, 5, 2, 4]); });
Q('s205', mk.short({ marks: 2, stem: r`Find the distance between (i) $(-8, 3)$ and $(2, 3)$, and (ii) $(5, -6)$ and $(5, 9)$.`, model: r`(i) Both points have $y = 3$, so the distance is the difference of the $x$-coordinates: $|2 - (-8)| = 10$ units.\n\n(ii) Both points have $x = 5$, so the distance is the difference of the $y$-coordinates: $|9 - (-6)| = 15$ units.`, sol: 'Use the coordinate that changes.', scheme: [['10 units', 1], ['15 units', 1]], d: 1, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(along([-8, 3], [2, 3]) === 10 && along([5, -6], [5, 9]) === 15, '10 and 15'); Cx.model([10, 15]); });
Q('s206', mk.short({ marks: 2, stem: r`Find the midpoint of the segment joining $(-3, -7)$ and $(9, 5)$.`, model: r`Midpoint $= \left(\dfrac{-3 + 9}{2}, \dfrac{-7 + 5}{2}\right) = \left(\dfrac{6}{2}, \dfrac{-2}{2}\right) = (3, -1)$.`, sol: 'Average the x-coordinates and the y-coordinates.', scheme: [['Uses the midpoint formula', 1], ['(3, -1)', 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (Cx) => { const m = mid([-3, -7], [9, 5]); Cx.assert(m[0] === 3 && m[1] === -1, '(3, -1)'); Cx.model([6, 2, 3, 1]); });
Q('s207', mk.short({ marks: 2, stem: r`The midpoint of the segment $AB$ is $(2, -1)$ and $A$ is $(-4, 5)$. Find the coordinates of $B$.`, model: r`Let $B = (p, q)$. Then $\dfrac{-4 + p}{2} = 2$, so $p = 8$, and $\dfrac{5 + q}{2} = -1$, so $q = -7$.\n\nSo $B = (8, -7)$.`, sol: 'Put the average of each coordinate equal to the midpoint.', scheme: [['p = 8', 1], ['q = -7', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { const B = [2 * 2 - -4, 2 * -1 - 5]; Cx.assert(B[0] === 8 && B[1] === -7 && mid([-4, 5], B)[0] === 2 && mid([-4, 5], B)[1] === -1, 'B = (8, -7)'); Cx.model([8, 7, 4, 5]); });

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`The points $A(-4, 3)$, $B(-4, -2)$ and $C(3, -2)$ are three vertices of a rectangle with sides parallel to the axes. (i) Name the quadrant of each point. (ii) Find the fourth vertex $D$. (iii) Find the area of the rectangle.`, model: r`(i) $A(-4, 3)$ is in the second quadrant, $B(-4, -2)$ in the third and $C(3, -2)$ in the fourth.\n\n(ii) $D$ has the $x$-coordinate of $C$ and the $y$-coordinate of $A$: $D = (3, 3)$.\n\n(iii) $AB = |3 - (-2)| = 5$ and $BC = |3 - (-4)| = 7$, so the area is $5 \times 7 = 35$ square units.`, sol: 'Use signs for the quadrants and shared coordinates for D.', scheme: [['Three quadrants', 1], ['D = (3, 3)', 1], ['Area 35', 1]], d: 2, c: 'application', t: [1, 2], time: 150 }), (Cx) => { Cx.assert([[-4, 3], [-4, -2], [3, -2]].map(([x, y]) => where(x, y)).join() === 'second quadrant,third quadrant,fourth quadrant' && along([-4, 3], [-4, -2]) * along([-4, -2], [3, -2]) === 35, 'quadrants and area'); Cx.model([3, 5, 7, 35]); });
Q('s302', mk.short({ marks: 3, stem: r`(i) Write the coordinates of the point on the $x$-axis that is $5$ units to the left of the origin. (ii) Write the coordinates of the point on the $y$-axis that is $3$ units below the origin. (iii) Explain why the point in (ii) does not belong to any quadrant.`, model: r`(i) A point on the $x$-axis has $y = 0$, and $5$ units to the left gives $x = -5$: $(-5, 0)$.\n\n(ii) A point on the $y$-axis has $x = 0$, and $3$ units below gives $y = -3$: $(0, -3)$.\n\n(iii) The four quadrants are the regions strictly between the axes. The point $(0, -3)$ has $x = 0$, so it lies on the $y$-axis, which is a boundary between two quadrants, not inside one.`, sol: 'Points on an axis have a zero coordinate.', scheme: [['(-5, 0)', 1], ['(0, -3)', 1], ['On the axis, so on a boundary', 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (Cx) => { Cx.assert(where(-5, 0) === 'x-axis' && where(0, -3) === 'y-axis', 'on axes'); Cx.model([5, 3]); });
{
  const pts = range(-5, 5).filter((v) => v).flatMap((x) => range(-5, 5).filter((v) => v).map((y) => [x, y]));
  const prodPos = new Set(pts.filter(([x, y]) => x * y > 0).map(([x, y]) => where(x, y))), prodNeg = new Set(pts.filter(([x, y]) => x * y < 0).map(([x, y]) => where(x, y)));
  Q('s303', mk.short({ marks: 3, stem: r`A point $P(a, b)$ is not on either axis. (i) In which quadrants can $P$ lie if $ab > 0$? (ii) In which quadrants can $P$ lie if $ab < 0$? Give one example point for each case.`, model: r`(i) $ab > 0$ means $a$ and $b$ have the same sign: both positive (first quadrant) or both negative (third quadrant). Example: $(2, 3)$ or $(-2, -3)$.\n\n(ii) $ab < 0$ means $a$ and $b$ have opposite signs: $a < 0$, $b > 0$ (second quadrant) or $a > 0$, $b < 0$ (fourth quadrant). Example: $(-2, 3)$ or $(2, -3)$.`, sol: 'The sign of the product depends on whether the signs of a and b agree.', scheme: [['First and third quadrants when ab is positive', 1], ['Second and fourth quadrants when ab is negative', 1], ['Correct example points', 1]], d: 3, c: 'analysis', t: [1], time: 150 }), (Cx) => { Cx.assert([...prodPos].sort().join() === 'first quadrant,third quadrant' && [...prodNeg].sort().join() === 'fourth quadrant,second quadrant' && where(2, 3) === 'first quadrant' && where(-2, 3) === 'second quadrant', 'quadrants by sign of ab'); Cx.model([2, 3]); });
}
Q('s304', mk.short({ marks: 3, stem: r`$A(-5, 2)$, $B(7, 2)$ and $C(7, -6)$ are three points on a town plan. Find (i) the length of $AB$, (ii) the length of $BC$, and (iii) the midpoint of $AB$.`, model: r`(i) $A$ and $B$ have the same $y$-coordinate, so $AB = |7 - (-5)| = 12$ units.\n\n(ii) $B$ and $C$ have the same $x$-coordinate, so $BC = |2 - (-6)| = 8$ units.\n\n(iii) The midpoint of $AB$ is $\left(\dfrac{-5 + 7}{2}, \dfrac{2 + 2}{2}\right) = (1, 2)$.`, sol: 'Use the shared coordinate to see the direction, then subtract.', scheme: [['AB = 12', 1], ['BC = 8', 1], ['Midpoint (1, 2)', 1]], d: 2, c: 'application', t: [2], time: 150 }), (Cx) => { const m = mid([-5, 2], [7, 2]); Cx.assert(along([-5, 2], [7, 2]) === 12 && along([7, 2], [7, -6]) === 8 && m[0] === 1 && m[1] === 2, 'lengths and midpoint'); Cx.model([12, 8, 1, 2]); });
Q('s305', mk.short({ marks: 3, stem: r`A delivery rider in Ludhiana starts at $(-4, -1)$ on a grid plan, rides east along the street $y = -1$ to $(5, -1)$ and then north along the street $x = 5$ to $(5, 6)$. Find the distance of each stretch and the total distance ridden.`, model: r`East stretch: $|5 - (-4)| = 9$ units.\n\nNorth stretch: $|6 - (-1)| = 7$ units.\n\nTotal distance ridden $= 9 + 7 = 16$ units.`, sol: 'Each stretch is parallel to an axis.', scheme: [['East stretch 9', 1], ['North stretch 7', 1], ['Total 16', 1]], d: 2, c: 'application', t: [2], time: 120 }), (Cx) => { const a = along([-4, -1], [5, -1]), b = along([5, -1], [5, 6]); Cx.assert(a === 9 && b === 7 && a + b === 16, '9, 7, 16'); Cx.model([9, 7, 16]); });

// =============================================================== long answer, 5 marks
{
  const P = [-5, -2], Qp = [4, -2], R = [4, 3], S = [-5, 3];
  const pq = along(P, Qp), qr = along(Qp, R), M = mid(P, R);
  Q('l01', mk.long({ stem: r`The plan of a rectangular playground has corners $P(-5, -2)$, $Q(4, -2)$ and $R(4, 3)$, with sides parallel to the axes. (a) Find the fourth corner $S$. (b) Find the lengths $PQ$ and $QR$. (c) Find the perimeter and the area. (d) Find the midpoint of the diagonal $PR$. (e) Name the quadrant of each corner.`, model: r`**(a)** $S$ has the $x$-coordinate of $P$ and the $y$-coordinate of $R$: $S = (-5, 3)$.\n\n**(b)** $PQ = |4 - (-5)| = 9$ units and $QR = |3 - (-2)| = 5$ units.\n\n**(c)** Perimeter $= 2 \times (9 + 5) = 28$ units. Area $= 9 \times 5 = 45$ square units.\n\n**(d)** Midpoint of $PR = \left(\dfrac{-5 + 4}{2}, \dfrac{-2 + 3}{2}\right) = (-0.5, 0.5)$.\n\n**(e)** $P(-5, -2)$ is in the third quadrant, $Q(4, -2)$ in the fourth, $R(4, 3)$ in the first and $S(-5, 3)$ in the second.`, sol: 'Use shared coordinates for the sides and averages for the midpoint.', scheme: [['(a) S = (-5, 3)', 1], ['(b) PQ = 9, QR = 5', 1], ['(c) perimeter 28 and area 45', 1], ['(d) (-0.5, 0.5)', 1], ['(e) the four quadrants', 1]], d: 3, c: 'application', t: [1, 2], time: 420 }), (Cx) => { Cx.assert(S[0] === P[0] && S[1] === R[1] && pq === 9 && qr === 5 && 2 * (pq + qr) === 28 && pq * qr === 45 && M[0] === -0.5 && M[1] === 0.5 && [P, Qp, R, S].map((p) => where(...p)).join() === 'third quadrant,fourth quadrant,first quadrant,second quadrant', 'rectangle'); Cx.model([9, 5, 28, 45, 0.5]); });
}
{
  const rook = [2, 3], king = [8, 3], bishop = [5, 6], up = [2, 8];
  Q('l02', mk.long({ stem: r`On a chessboard the columns are numbered $1$ to $8$ from left to right and the rows $1$ to $8$ from bottom to top, and a square is written (column, row). A white rook stands on $(2, 3)$, the black king on $(8, 3)$ and a bishop on $(5, 6)$. (a) Are the rook and the king on the same row or the same column? (b) How many squares apart are they? (c) The rook moves straight up to the last row. Write its new square and how many squares it moved. (d) A bishop moves along a diagonal, changing its column and row by the same amount. Is the rook on a diagonal of the bishop? (e) Which square on row $3$ is exactly halfway between the rook and the king?`, model: r`**(a)** Both squares have row $3$, so they are on the same row.\n\n**(b)** The distance is the difference of the columns: $8 - 2 = 6$ squares.\n\n**(c)** Moving up keeps the column and changes the row to $8$: the new square is $(2, 8)$. The rook moved $8 - 3 = 5$ squares.\n\n**(d)** From $(5, 6)$ to $(2, 3)$ the column changes by $-3$ and the row changes by $-3$. They are equal in size, so the rook is on a diagonal of the bishop.\n\n**(e)** The halfway square is $\left(\dfrac{2 + 8}{2}, 3\right) = (5, 3)$.`, sol: 'Squares on one row share the second number; use averages for halfway.', scheme: [['(a) same row 3', 1], ['(b) 6 squares', 1], ['(c) (2, 8) and 5 squares', 1], ['(d) changes of -3 and -3', 1], ['(e) (5, 3)', 1]], d: 3, c: 'application', t: [1, 2], time: 420 }), (Cx) => { const m = mid(rook, king); Cx.assert(rook[1] === king[1] && along(rook, king) === 6 && up[0] === rook[0] && up[1] - rook[1] === 5 && rook[0] - bishop[0] === rook[1] - bishop[1] && m[0] === 5 && m[1] === 3, 'chess'); Cx.model([3, 8, 6, 5, 2]); });
}
{
  const A = [-6, -2], B = [2, -2], C = [2, 5];
  const M = mid(A, B), N = mid(B, C), K = mid(A, C);
  Q('l03', mk.long({ stem: r`$A(-6, -2)$, $B(2, -2)$ and $C(2, 5)$ are three points on a survey map. (a) Find the lengths $AB$ and $BC$. (b) Find the midpoint $M$ of $AB$. (c) Find the midpoint $N$ of $BC$. (d) Find the midpoint $K$ of $AC$. (e) Compare the coordinates of $K$ with those of $M$ and $N$, and describe what you notice.`, model: r`**(a)** $AB = |2 - (-6)| = 8$ units and $BC = |5 - (-2)| = 7$ units.\n\n**(b)** $M = \left(\dfrac{-6 + 2}{2}, \dfrac{-2 + (-2)}{2}\right) = (-2, -2)$.\n\n**(c)** $N = \left(\dfrac{2 + 2}{2}, \dfrac{-2 + 5}{2}\right) = (2, 1.5)$.\n\n**(d)** $K = \left(\dfrac{-6 + 2}{2}, \dfrac{-2 + 5}{2}\right) = (-2, 1.5)$.\n\n**(e)** The $x$-coordinate of $K$ is $-2$, the same as that of $M$, and the $y$-coordinate of $K$ is $1.5$, the same as that of $N$. So $K$ lies directly above $M$ and directly to the left of $N$.`, sol: 'Average the coordinates for each midpoint, then compare.', scheme: [['(a) AB = 8, BC = 7', 1], ['(b) M = (-2, -2)', 1], ['(c) N = (2, 1.5)', 1], ['(d) K = (-2, 1.5)', 1], ['(e) K has the x of M and the y of N', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert(along(A, B) === 8 && along(B, C) === 7 && M[0] === -2 && M[1] === -2 && N[0] === 2 && N[1] === 1.5 && K[0] === M[0] && K[1] === N[1], 'midpoints'); Cx.model([8, 7, 2, 1.5]); });
}
{
  const P = [-5, 4], M = [1, -2], Qp = [2 * 1 - -5, 2 * -2 - 4];
  const R = mid(P, M), S = mid(M, Qp), RS = mid(R, S);
  Q('l04', mk.long({ stem: r`$P(-5, 4)$ and $Q$ are the ends of a straight road on a plan, and $M(1, -2)$ is the midpoint of $PQ$. (a) Find $Q$. (b) Find the midpoint $R$ of $PM$. (c) Find the midpoint $S$ of $MQ$. (d) Find the midpoint of $RS$ and compare it with $M$. (e) Find the difference of the $x$-coordinates of $P$ and $Q$, and the difference of the $y$-coordinates, and compare them.`, model: r`**(a)** If $Q = (p, q)$, $\dfrac{-5 + p}{2} = 1$ gives $p = 7$, and $\dfrac{4 + q}{2} = -2$ gives $q = -8$. So $Q = (7, -8)$.\n\n**(b)** $R = \left(\dfrac{-5 + 1}{2}, \dfrac{4 + (-2)}{2}\right) = (-2, 1)$.\n\n**(c)** $S = \left(\dfrac{1 + 7}{2}, \dfrac{-2 + (-8)}{2}\right) = (4, -5)$.\n\n**(d)** The midpoint of $RS$ is $\left(\dfrac{-2 + 4}{2}, \dfrac{1 + (-5)}{2}\right) = (1, -2)$, which is $M$ itself.\n\n**(e)** The $x$-coordinates differ by $7 - (-5) = 12$ and the $y$-coordinates by $|4 - (-8)| = 12$. The two differences are equal.`, sol: 'Use the midpoint formula in each step.', scheme: [['(a) Q = (7, -8)', 1], ['(b) R = (-2, 1)', 1], ['(c) S = (4, -5)', 1], ['(d) midpoint of RS is M', 1], ['(e) both differences are 12', 1]], d: 3, c: 'analysis', t: [2], time: 450 }), (Cx) => { Cx.assert(Qp[0] === 7 && Qp[1] === -8 && R[0] === -2 && R[1] === 1 && S[0] === 4 && S[1] === -5 && RS[0] === M[0] && RS[1] === M[1] && Qp[0] - P[0] === 12 && P[1] - Qp[1] === 12, 'road points'); Cx.model([7, 8, 2, 1, 4, 5, 12]); });
}
{
  const A = [2, -3], k = range(1, 40).filter((v) => Math.abs(v - -3) === 10);
  const B = [2, k[0]], M = mid(A, B), c = range(-30, 30).filter((v) => mid(A, [v, 0])[0] === 0), C = [c[0], 0], Mc = mid(A, C), BC = mid(B, C);
  Q('l05', mk.long({ stem: r`$A(2, -3)$ and $B(2, k)$ lie on a vertical line, with $AB = 10$ units and $k > 0$. (a) Find $k$. (b) Find the midpoint $M$ of $AB$. (c) A point $C$ on the $x$-axis is chosen so that the midpoint of $AC$ lies on the $y$-axis. Find $C$ and that midpoint. (d) Find the midpoint of $BC$. (e) Is the midpoint of $BC$ also on the $y$-axis? Explain why this happens.`, model: r`**(a)** $|k - (-3)| = 10$ gives $k + 3 = 10$ (as $k > 0$), so $k = 7$ and $B = (2, 7)$.\n\n**(b)** $M = \left(\dfrac{2 + 2}{2}, \dfrac{-3 + 7}{2}\right) = (2, 2)$.\n\n**(c)** Let $C = (c, 0)$. The midpoint of $AC$ has $x$-coordinate $\dfrac{2 + c}{2}$, which must be $0$, so $c = -2$ and $C = (-2, 0)$. The midpoint of $AC$ is $\left(0, \dfrac{-3 + 0}{2}\right) = (0, -1.5)$.\n\n**(d)** The midpoint of $BC$ is $\left(\dfrac{2 + (-2)}{2}, \dfrac{7 + 0}{2}\right) = (0, 3.5)$.\n\n**(e)** Yes, its $x$-coordinate is $0$. Both $A$ and $B$ have $x = 2$ and $C$ has $x = -2$, so each midpoint has $x$-coordinate $\dfrac{2 + (-2)}{2} = 0$.`, sol: 'Use the difference of y-coordinates for AB; set the averaged x-coordinate to 0.', scheme: [['(a) k = 7', 1], ['(b) M = (2, 2)', 1], ['(c) C = (-2, 0) and (0, -1.5)', 1], ['(d) (0, 3.5)', 1], ['(e) x-coordinate 0 because A and B share x = 2', 1]], d: 4, c: 'analysis', t: [2], time: 480 }), (Cx) => { Cx.assert(k.length === 1 && k[0] === 7 && M[0] === 2 && M[1] === 2 && c.length === 1 && C[0] === -2 && Mc[0] === 0 && Mc[1] === -1.5 && BC[0] === 0 && BC[1] === 3.5, 'points'); Cx.model([7, 2, 1.5, 3.5]); });
}

// =============================================================== case-based
{
  caseQ('c01', {
    passage: r`A school plan is drawn on a grid with the main gate at the origin $(0, 0)$ and $1$ unit equal to $10$ m. The library is at $(4, 3)$, the hall at $(4, -3)$, the canteen at $(-2, -4)$ and the playground at $(-5, 2)$.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $6$. (c) (i) $(4, 0)$ on the $x$-axis. Or (ii) $(2, -4)$ in the fourth quadrant.`,
    sol: r`(a) $(-2, -4)$ has both coordinates negative. (b) $|3 - (-3)| = 6$. (c) (i) $\left(\dfrac{4 + 4}{2}, \dfrac{3 + (-3)}{2}\right) = (4, 0)$. (ii) $(-2 + 4, -4) = (2, -4)$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which place lies in the third quadrant?', opts: ['the canteen', 'the library', 'the hall', 'the playground'], key: 'a', sol: r`The third quadrant has both coordinates negative. Only the canteen $(-2, -4)$ qualifies. The library is in the first quadrant, the hall in the fourth and the playground in the second.`, d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'What is the distance between the library and the hall, in units?', value: 6, sol: r`Both have $x = 4$, so the distance is the difference of the $y$-coordinates: $|3 - (-3)| = 6$ units.`, scheme: [['Same x, so use the y-coordinates', 0.5], ['6 units', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** A water cooler is to be placed at the midpoint of the library and the hall. Find its coordinates and say where it lies.`, model: r`The midpoint is $\left(\dfrac{4 + 4}{2}, \dfrac{3 + (-3)}{2}\right) = (4, 0)$. Its $y$-coordinate is $0$, so it lies on the $x$-axis.`, sol: 'Average the coordinates.', scheme: [['(4, 0)', 1], ['On the x-axis', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A new store is to be built $4$ units east of the canteen on the same horizontal street. Find its coordinates and quadrant.`, model: r`East increases the $x$-coordinate: $(-2 + 4, -4) = (2, -4)$. It has $x > 0$ and $y < 0$, so it is in the fourth quadrant.`, sol: 'East means a larger x-coordinate.', scheme: [['(2, -4)', 1], ['Fourth quadrant', 1]], d: 2, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([where(-2, -4) === 'third quadrant' ? 1 : 0, where(4, 3) === 'third quadrant' ? 1 : 0, where(4, -3) === 'third quadrant' ? 1 : 0, where(-5, 2) === 'third quadrant' ? 1 : 0], 1);
    Cx.child('b').val(along([4, 3], [4, -3]));
    const m = mid([4, 3], [4, -3]);
    Cx.child('c').assert(m[0] === 4 && m[1] === 0 && where(...m) === 'x-axis', '(4, 0)');
    Cx.child('c').model([4, 0, 3]);
    Cx.child('cii').assert(-2 + 4 === 2 && where(2, -4) === 'fourth quadrant', '(2, -4)');
    Cx.child('cii').model([2, 4]);
  });
}
{
  const R = [-3, 2], C1 = [5, 2], C2 = [5, -4];
  caseQ('c02', {
    passage: r`A delivery rider in Madurai rides along the straight streets of a grid plan with the temple at the origin. The restaurant is at $(-3, 2)$, the first customer at $(5, 2)$ and the second customer at $(5, -4)$. One unit is one block.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $8$. (c) (i) $(1, 2)$. Or (ii) $14$ blocks.`,
    sol: r`(a) Both have $y = 2$. (b) $|5 - (-3)| = 8$. (c) (i) $\left(\dfrac{-3 + 5}{2}, 2\right) = (1, 2)$. (ii) $8 + |-4 - 2| = 8 + 6 = 14$.`,
    children: [
      child('a', mk.mcq({ stem: 'The street from the restaurant to the first customer is', opts: ['parallel to the $x$-axis', 'parallel to the $y$-axis', 'passing through the origin', 'a street in the fourth quadrant only'], key: 'a', sol: r`Both the restaurant $(-3, 2)$ and the first customer $(5, 2)$ have $y = 2$, so the street is the horizontal line $y = 2$, parallel to the $x$-axis. It does not pass through the origin.`, d: 2, c: 'understanding', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'How many blocks does the rider ride from the restaurant to the first customer?', value: 8, sol: r`The points are on the line $y = 2$, so the distance is $|5 - (-3)| = 8$ blocks.`, scheme: [['Horizontal street', 0.5], ['8 blocks', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** The rider takes a rest at the midpoint of the restaurant and the first customer. Find its coordinates.`, model: r`The midpoint is $\left(\dfrac{-3 + 5}{2}, \dfrac{2 + 2}{2}\right) = (1, 2)$.`, sol: 'Average the coordinates.', scheme: [['Uses the midpoint formula', 1], ['(1, 2)', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** After the first customer the rider goes along $x = 5$ to the second customer. Find the total distance from the restaurant to the second customer by this route.`, model: r`From the first customer $(5, 2)$ to the second $(5, -4)$ is $|2 - (-4)| = 6$ blocks. The total is $8 + 6 = 14$ blocks.`, sol: 'Add the two stretches.', scheme: [['Second stretch 6', 1], ['Total 14', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([R[1] === C1[1] ? 1 : 0, R[0] === C1[0] ? 1 : 0, 0, 0], 1);
    Cx.child('b').val(along(R, C1));
    Cx.child('c').assert(mid(R, C1)[0] === 1 && mid(R, C1)[1] === 2, '(1, 2)');
    Cx.child('c').model([2, 1, 5]);
    Cx.child('cii').assert(along(C1, C2) === 6 && along(R, C1) + along(C1, C2) === 14, '14');
    Cx.child('cii').model([6, 8, 14]);
  });
}
{
  const A = [-8, 5], B = [6, -3], M = mid(A, B), P = mid(A, M), P2 = mid(M, B);
  caseQ('c03', {
    passage: r`A straight road on a town plan runs from $A(-8, 5)$ to $B(6, -3)$. The electricity board places a transformer at the midpoint $M$ of the road.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $1$. (c) (i) $(-4.5, 3)$. Or (ii) $(2.5, -1)$.`,
    sol: r`(a) $M = \left(\dfrac{-8 + 6}{2}, \dfrac{5 + (-3)}{2}\right) = (-1, 1)$. (b) The distance from the $y$-axis is $|-1| = 1$. (c) (i) $\left(\dfrac{-8 + (-1)}{2}, \dfrac{5 + 1}{2}\right) = (-4.5, 3)$. (ii) $\left(\dfrac{-1 + 6}{2}, \dfrac{1 + (-3)}{2}\right) = (2.5, -1)$.`,
    children: [
      child('a', mk.mcq({ stem: 'The coordinates of the transformer $M$ are', opts: ['$(-1, 1)$', '$(-2, 2)$', '$(-14, 8)$', '$(1, -1)$'], key: 'a', sol: r`$M = \left(\dfrac{-8 + 6}{2}, \dfrac{5 + (-3)}{2}\right) = (-1, 1)$. The pair $(-2, 2)$ is the sum without halving, and $(1, -1)$ has both signs wrong.`, d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'How far is the transformer from the $y$-axis, in units?', value: 1, sol: r`The distance of a point from the $y$-axis is the size of its $x$-coordinate. For $M(-1, 1)$ it is $|-1| = 1$ unit.`, scheme: [['Uses the x-coordinate', 0.5], ['1 unit', 0.5]], d: 2, c: 'application', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** A pole is to be put at the midpoint of $AM$. Find its coordinates.`, model: r`The midpoint of $A(-8, 5)$ and $M(-1, 1)$ is $\left(\dfrac{-8 + (-1)}{2}, \dfrac{5 + 1}{2}\right) = (-4.5, 3)$.`, sol: 'Average the coordinates of A and M.', scheme: [['Uses the midpoint formula', 1], ['(-4.5, 3)', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A pole is to be put at the midpoint of $MB$. Find its coordinates.`, model: r`The midpoint of $M(-1, 1)$ and $B(6, -3)$ is $\left(\dfrac{-1 + 6}{2}, \dfrac{1 + (-3)}{2}\right) = (2.5, -1)$.`, sol: 'Average the coordinates of M and B.', scheme: [['Uses the midpoint formula', 1], ['(2.5, -1)', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([M[0] === -1 && M[1] === 1 ? 1 : 0, M[0] === -2 && M[1] === 2 ? 1 : 0, M[0] === -14 && M[1] === 8 ? 1 : 0, M[0] === 1 && M[1] === -1 ? 1 : 0], 1);
    Cx.child('b').val(Math.abs(M[0]));
    Cx.child('c').assert(P[0] === -4.5 && P[1] === 3, '(-4.5, 3)');
    Cx.child('c').model([8, 1, 4.5, 3]);
    Cx.child('cii').assert(P2[0] === 2.5 && P2[1] === -1, '(2.5, -1)');
    Cx.child('cii').model([1, 6, 2.5, 1]);
  });
}
{
  const S = [-6, -3], T = [2, -3], U = [2, 5], V = [S[0], U[1]];
  const g = plot({ x: [-8, 4], y: [-5, 7], pts: [[-6, -3, 'S (-6, -3)'], [2, -3, 'T (2, -3)'], [2, 5, 'U (2, 5)']], series: [{ label: 'path from S to T to U', points: [[-6, -3], [2, -3], [2, 5]], kind: 'line' }] }, 'Grid showing the treasure hunt path: the point S at minus 6 comma minus 3, then T at 2 comma minus 3 to its right, then U at 2 comma 5 straight above T.', 'The treasure hunt path S, T, U.');
  caseQ('c04', {
    passage: r`For a school fair in Thrissur, a treasure hunt path is marked on a grid. Teams start at $S(-6, -3)$, walk along a straight line to $T(2, -3)$ and then to $U(2, 5)$, as in the figure. One unit is one metre.`,
    assets: [g],
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $8$. (c) (i) $V = (-6, 5)$ in the second quadrant. Or (ii) $(-2, 1)$.`,
    sol: r`(a) $U(2, 5)$ has both coordinates positive. (b) $|2 - (-6)| = 8$. (c) (i) $V$ has the $x$-coordinate of $S$ and the $y$-coordinate of $U$. (ii) $\left(\dfrac{-6 + 2}{2}, \dfrac{-3 + 5}{2}\right) = (-2, 1)$.`,
    children: [
      child('a', mk.mcq({ stem: 'The point $U$ lies in the', opts: ['first quadrant', 'second quadrant', 'third quadrant', 'fourth quadrant'], key: 'a', sol: r`$U(2, 5)$ has $x > 0$ and $y > 0$, so it is in the first quadrant. The point $S(-6, -3)$ is in the third quadrant and $T(2, -3)$ is in the fourth.`, d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'How many metres is the walk from $S$ to $T$?', value: 8, sol: r`$S$ and $T$ both have $y = -3$, so the distance is $|2 - (-6)| = 8$ metres.`, scheme: [['Same y, use the x-coordinates', 0.5], ['8 metres', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** $S$, $T$, $U$ and a fourth point $V$ are the corners of a square. Find $V$ and name its quadrant.`, model: r`$ST = 8$ and $TU = |5 - (-3)| = 8$, so the corners form a square. The fourth corner $V$ has the $x$-coordinate of $S$ and the $y$-coordinate of $U$: $V = (-6, 5)$. It has $x < 0$ and $y > 0$, so it is in the second quadrant.`, sol: 'Use the shared coordinates.', scheme: [['V = (-6, 5)', 1], ['Second quadrant', 1]], d: 3, c: 'application', t: [1, 2], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A flag is to be placed at the midpoint of $S$ and $U$. Find its coordinates.`, model: r`The midpoint is $\left(\dfrac{-6 + 2}{2}, \dfrac{-3 + 5}{2}\right) = (-2, 1)$.`, sol: 'Average the coordinates.', scheme: [['Uses the midpoint formula', 1], ['(-2, 1)', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([where(...U) === 'first quadrant' ? 1 : 0, where(...U) === 'second quadrant' ? 1 : 0, where(...U) === 'third quadrant' ? 1 : 0, where(...U) === 'fourth quadrant' ? 1 : 0], 1);
    Cx.child('b').val(along(S, T));
    Cx.child('c').assert(along(S, T) === along(T, U) && V[0] === -6 && V[1] === 5 && where(...V) === 'second quadrant', 'square');
    Cx.child('c').model([8, 5, 6]);
    Cx.child('cii').assert(mid(S, U)[0] === -2 && mid(S, U)[1] === 1, '(-2, 1)');
    Cx.child('cii').model([6, 2, 3, 5, 1]);
  });
}

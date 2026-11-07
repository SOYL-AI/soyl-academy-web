// CBSE 9 Mathematics ch08 Lines and Angles: written items (short 2 and 3 marks, long 5 marks, case-based). Every angle-chasing
// answer is computed from ray directions or by solving the stated equation by search; proofs are marked qualitative with the
// reason, and each proof also carries a numerical spot-check computed from coordinates.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, close, range, eight, crossAngles, gap, CORR, ALT, COIN, VERT, transFig } from './h.mjs';
import { fLinProof, fNames } from './figs.mjs';

const has = (list, a, b) => list.some(([p, q]) => (p === a && q === b) || (p === b && q === a));
const pairKind = (a, b) => (has(CORR, a, b) ? 'corresponding' : has(ALT, a, b) ? 'alternate' : has(COIN, a, b) ? 'co-interior' : has(VERT, a, b) ? 'vertical' : 'other');

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Define a ray and an angle. How does a ray differ from a line segment?', model: r`A **ray** is a part of a line that starts at one point and goes on for ever in one direction. An **angle** is formed by two rays with the same starting point, called the vertex.\n\nA line segment has two end points and a fixed length, but a ray has only one end point and no fixed length.`, sol: 'Ray: one end point. Angle: two rays with a common starting point.', scheme: [['Defines a ray and an angle', 1], ['Segment has two end points, a ray has one', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), null, 'definitions: marked by the scheme');
{
  const xs = range(1, 89).filter((x) => x === 2 * (90 - x) - 24);
  Q('s202', mk.short({ marks: 2, stem: r`A surveyor measures an angle that is $24^\circ$ less than twice its complement. Find the angle.`, model: r`Let the angle be $x$. Its complement is $90 - x$, so $x = 2(90 - x) - 24 = 156 - 2x$.\n\nThen $3x = 156$, so $x = 52^\circ$. Check: the complement is $38^\circ$ and $2 \times 38 - 24 = 52$.`, sol: 'Form the equation from the complement.', scheme: [['x = 2(90 - x) - 24', 1], ['52 degrees', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(xs.join() === '52' && 2 * (90 - 52) - 24 === 52, '52'); Cx.model([2, 90, 156, 52, 38, 24]); });
}
{
  const xs = range(1, 60).filter((x) => 3 * x - 5 + 2 * x + 15 === 180);
  Q('s203', mk.short({ marks: 2, stem: r`A ray $OC$ stands on a straight line $AB$ with $\angle AOC = (3x - 5)^\circ$ and $\angle COB = (2x + 15)^\circ$. Find $x$ and both angles.`, model: r`The angles form a linear pair, so $(3x - 5) + (2x + 15) = 180$, that is $5x + 10 = 180$ and $x = 34$.\n\n$\angle AOC = 3 \times 34 - 5 = 97^\circ$ and $\angle COB = 2 \times 34 + 15 = 83^\circ$.`, sol: 'The angles of a linear pair add up to 180 degrees.', scheme: [['Linear pair: sum 180, x = 34', 1], ['97 and 83 degrees', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(xs.join() === '34' && 3 * 34 - 5 === 97 && 2 * 34 + 15 === 83 && 97 + 83 === 180, 'x = 34'); Cx.model([34, 97, 83, 180]); });
}
Q('s204', mk.short({ marks: 2, stem: 'State the converse of the linear pair theorem. Is it true?', model: r`**Converse:** if two adjacent angles add up to $180^\circ$, then their non-common arms form a straight line (they are a linear pair).\n\nIt is true. For example, adjacent angles of $115^\circ$ and $65^\circ$ add up to $180^\circ$, so their outer arms lie on one straight line.`, sol: 'Swap the given and the conclusion of the theorem.', scheme: [['Converse stated correctly', 1], ['Says it is true, with an example', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(115 + 65 === 180, 'example sums to 180'); Cx.model([115, 65, 180]); });
{
  const xs = range(1, 80).filter((x) => 4 * x - 10 === 3 * x + 20);
  Q('s205', mk.short({ marks: 2, stem: r`The lines $l$ and $m$ are parallel. A transversal makes corresponding angles $(4x - 10)^\circ$ and $(3x + 20)^\circ$. Find $x$ and the angles.`, model: r`Corresponding angles between parallel lines are equal, so $4x - 10 = 3x + 20$ and $x = 30$.\n\nEach angle is $4 \times 30 - 10 = 110^\circ$ (and $3 \times 30 + 20 = 110^\circ$).`, sol: 'Corresponding angles are equal when the lines are parallel.', scheme: [['Sets the angles equal: x = 30', 1], ['Each angle is 110 degrees', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(xs.join() === '30' && 4 * 30 - 10 === 110 && 3 * 30 + 20 === 110, 'x = 30'); Cx.model([30, 110]); });
}
Q('s206', mk.short({ marks: 2, stem: r`In the figure $l \parallel m$. Name two pairs of corresponding angles and one pair of co-interior angles.`, model: r`Corresponding angles: $\angle 1$ and $\angle 5$, and $\angle 2$ and $\angle 6$ (also $\angle 3, \angle 7$ and $\angle 4, \angle 8$).\n\nCo-interior angles: $\angle 3$ and $\angle 6$ (they add up to $180^\circ$).`, sol: 'Corresponding: same position at each crossing. Co-interior: between the lines, same side.', scheme: [['Two pairs of corresponding angles', 1], ['One pair of co-interior angles', 1]], d: 1, c: 'understanding', t: [3], time: 90, assets: [fNames] }), (Cx) => { const E = eight(65); Cx.assert(pairKind(1, 5) === 'corresponding' && pairKind(2, 6) === 'corresponding' && pairKind(3, 6) === 'co-interior' && close(E[3] + E[6], 180), 'the named pairs'); Cx.model([1, 5, 2, 6, 3, 180]); });
Q('s207', mk.short({ marks: 2, stem: 'Write the first line and the last line of a proof by contradiction that there is no largest even number.', model: r`**First line:** Suppose that there is a largest even number, $N$.\n\n**Last line:** But $N + 2$ is an even number that is greater than $N$, which contradicts the choice of $N$. So there is no largest even number.`, sol: 'Assume the opposite, then reach the contradiction.', scheme: [['Assumption: a largest even number N exists', 1], ['N + 2 is even and larger: contradiction', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), null, 'proof by contradiction: first and last lines marked by the scheme');

// =============================================================== short answer, 3 marks
{
  const a = crossAngles(0, 72);
  Q('s301', mk.short({ marks: 3, stem: r`Prove that if two lines intersect, the vertically opposite angles are equal. Check it when $\angle BOC = 72^\circ$.`, model: r`Let $AB$ and $CD$ cross at $O$. $\angle AOC + \angle COB = 180^\circ$ (linear pair) and $\angle COB + \angle BOD = 180^\circ$ (linear pair). So $\angle AOC + \angle COB = \angle COB + \angle BOD$, and taking $\angle COB$ from both sides, $\angle AOC = \angle BOD$.\n\nCheck: if $\angle BOC = 72^\circ$ then $\angle AOD = 72^\circ$ (similarly), and $\angle AOC = \angle BOD = 180^\circ - 72^\circ = 108^\circ$.`, sol: 'Two linear pairs share the angle COB.', scheme: [['Two linear pairs', 1], ['Equates the sums and takes COB from both sides', 1], ['The check: 72 and 108 degrees', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), (Cx) => { Cx.assert(close(a.COA, a.DOB) && close(a.BOC, a.AOD) && close(a.COA, 108) && close(a.BOC, 72), 'the check angles from coordinates'); Cx.model([180, 72, 108]); });
}
{
  const E = eight(118);
  Q('s302', mk.short({ marks: 3, stem: r`In the figure $l \parallel m$ and $\angle 2 = 118^\circ$. Find $\angle 3$, $\angle 5$ and $\angle 6$, giving a reason for each.`, model: r`$\angle 3 = 180^\circ - 118^\circ = 62^\circ$ (linear pair with $\angle 2$).\n\n$\angle 5 = \angle 3 = 62^\circ$ (alternate interior angles, $l \parallel m$).\n\n$\angle 6 = \angle 2 = 118^\circ$ (corresponding angles, $l \parallel m$).`, sol: 'Linear pair, alternate angles, corresponding angles.', scheme: [['Angle 3 = 62, linear pair', 1], ['Angle 5 = 62, alternate interior angles', 1], ['Angle 6 = 118, corresponding angles', 1]], d: 2, c: 'application', t: [3], time: 150, assets: [transFig(118, [[2, '118°'], [3, '?'], [5, '?'], [6, '?']], 'Two parallel lines l and m cut by a transversal t. The angle 2 at the upper crossing is 118 degrees. The angles 3, 5 and 6 are marked with question marks.', 'Find the angles marked $?$.')] }), (Cx) => { Cx.assert(E[2] === 118 && E[3] === 62 && E[5] === 62 && E[6] === 118, 'angles 62, 62, 118'); Cx.model([62, 118, 180]); });
}
{
  const E = eight(65);
  Q('s303', mk.short({ marks: 3, stem: r`Two parallel lines are cut by a transversal. Prove that the interior angles on the same side of the transversal add up to $180^\circ$. Check with $\angle 6 = 65^\circ$ in the figure with the numbered angles.`, model: r`In the figure with the angles numbered $1$ to $8$, $l \parallel m$. $\angle 2 + \angle 3 = 180^\circ$ (linear pair on the line $t$). $\angle 2 = \angle 6$ (corresponding angles, $l \parallel m$). So $\angle 6 + \angle 3 = 180^\circ$: the co-interior angles add up to $180^\circ$.\n\nCheck: $\angle 6 = 65^\circ$ gives $\angle 3 = 115^\circ$ and $65^\circ + 115^\circ = 180^\circ$.`, sol: 'Use a linear pair and the corresponding angles axiom.', scheme: [['Linear pair: angle 2 + angle 3 = 180', 1], ['Corresponding angles: angle 2 = angle 6', 1], ['Conclusion and the check 65 + 115 = 180', 1]], d: 3, c: 'analysis', t: [3], time: 150, assets: [fNames] }), (Cx) => { Cx.assert(close(E[2], E[6]) && close(E[2] + E[3], 180) && close(E[6] + E[3], 180) && E[6] === 65 && E[3] === 115, 'angles 6 and 3'); Cx.model([180, 65, 115]); });
}
Q('s304', mk.short({ marks: 3, stem: 'Prove by contradiction that two different lines cannot meet at two different points.', model: r`Suppose that two different lines $l$ and $m$ meet at two different points $P$ and $Q$.\n\nThen both $l$ and $m$ pass through $P$ and $Q$, so there are two different lines through the two points $P$ and $Q$.\n\nBut exactly one line passes through two given points. This is a contradiction, so our supposition is false: two different lines meet in at most one point.`, sol: 'Assume two common points and use that only one line passes through two points.', scheme: [['Supposes two common points P and Q', 1], ['Two different lines through P and Q', 1], ['Contradiction and conclusion', 1]], d: 2, c: 'application', t: [4], time: 150 }), null, 'proof by contradiction: assumption, two lines through two points, contradiction; marked by the scheme');
{
  const aB = 48, aC = 62, aA = 180 - aB - aC;
  Q('s305', mk.short({ marks: 3, stem: r`In a triangle $ABC$ a line $PQ$ is drawn through $A$ parallel to $BC$, with $P$ on the side of $B$. The angles $\angle PAB = 48^\circ$ and $\angle QAC = 62^\circ$. Find the three angles of the triangle. (Use the fact, proved in this chapter from parallel lines, that $\angle PAB + \angle BAC + \angle CAQ = 180^\circ$.)`, model: r`$PQ \parallel BC$, so $\angle B = \angle PAB = 48^\circ$ and $\angle C = \angle QAC = 62^\circ$ (alternate interior angles).\n\nThe angles on the straight line $PQ$ at $A$ add up to $180^\circ$, so $\angle BAC = 180^\circ - 48^\circ - 62^\circ = 70^\circ$.\n\nThe angles are $\angle A = 70^\circ$, $\angle B = 48^\circ$ and $\angle C = 62^\circ$.`, sol: 'Alternate angles, then the straight angle at A.', scheme: [['Angle B = 48 and angle C = 62 by alternate angles', 1.5], ['Angle A = 180 - 48 - 62', 1], ['Angles 70, 48, 62', 0.5]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(aA === 70 && aA + aB + aC === 180, 'angles 70, 48, 62'); Cx.model([48, 62, 70, 180]); });
}

// =============================================================== long answer, 5 marks
{
  const x = range(1, 80).filter((v) => 4 * v + 5 + 2 * v + 25 === 180)[0], AOC = 4 * x + 5, COB = 2 * x + 25, a = crossAngles(0, COB);
  Q('l01', mk.long({ stem: r`Two roads $AB$ and $CD$ cross at a roundabout $O$ in Nagpur, with $\angle AOC = (4x + 5)^\circ$ and $\angle COB = (2x + 25)^\circ$. (a) Why do $\angle AOC$ and $\angle COB$ add up to $180^\circ$? (b) Find $x$. (c) Find $\angle AOC$ and $\angle COB$. (d) Find $\angle BOD$ and $\angle AOD$, giving the reason. (e) Check that the four angles at $O$ add up to $360^\circ$.`, model: r`**(a)** The ray $OC$ stands on the line $AB$, so $\angle AOC$ and $\angle COB$ form a linear pair.\n\n**(b)** $(4x + 5) + (2x + 25) = 180$, so $6x + 30 = 180$ and $x = 25$.\n\n**(c)** $\angle AOC = 4 \times 25 + 5 = 105^\circ$ and $\angle COB = 2 \times 25 + 25 = 75^\circ$.\n\n**(d)** $\angle BOD = \angle AOC = 105^\circ$ and $\angle AOD = \angle COB = 75^\circ$ (vertically opposite angles).\n\n**(e)** $105^\circ + 75^\circ + 105^\circ + 75^\circ = 360^\circ$.`, sol: 'Linear pair, then vertically opposite angles.', scheme: [['(a) linear pair', 1], ['(b) x = 25', 1], ['(c) 105 and 75 degrees', 1], ['(d) 105 and 75 by vertically opposite angles', 1], ['(e) total 360 degrees', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert(x === 25 && AOC === 105 && COB === 75 && close(a.COA, 105) && close(a.BOC, 75) && close(a.DOB, 105) && close(a.AOD, 75) && 105 + 75 + 105 + 75 === 360, 'x = 25, angles 105 and 75'); Cx.model([180, 25, 105, 75, 360]); });
}
Q('l02', mk.long({ stem: r`Prove the linear pair theorem: if a ray $OC$ stands on a line $AB$, then $\angle AOC + \angle COB = 180^\circ$. (a) Draw $OD \perp AB$ with $D$ on the same side as $C$, and state the measures of $\angle AOD$ and $\angle DOB$. (b) Write $\angle AOC$ in terms of $\angle DOC$. (c) Write $\angle COB$ in terms of $\angle DOC$. (d) Add to prove the theorem. (e) In the figure, $\angle DOC = 25^\circ$ and $\angle COB = 65^\circ$. Verify the theorem.`, model: r`**(a)** $OD \perp AB$, so $\angle AOD = \angle DOB = 90^\circ$.\n\n**(b)** $OD$ lies inside $\angle AOC$, so $\angle AOC = \angle AOD + \angle DOC = 90^\circ + \angle DOC$.\n\n**(c)** $OC$ lies inside $\angle DOB$, so $\angle COB = \angle DOB - \angle DOC = 90^\circ - \angle DOC$.\n\n**(d)** $\angle AOC + \angle COB = (90^\circ + \angle DOC) + (90^\circ - \angle DOC) = 180^\circ$.\n\n**(e)** $\angle AOC = 90^\circ + 25^\circ = 115^\circ$ and $\angle COB = 65^\circ$, and $115^\circ + 65^\circ = 180^\circ$. Also $90^\circ - 25^\circ = 65^\circ$.`, sol: 'Use a perpendicular and angle addition.', scheme: [['(a) both angles are 90 degrees', 1], ['(b) 90 + angle DOC', 1], ['(c) 90 - angle DOC', 1], ['(d) the sum is 180', 1], ['(e) 115 + 65 = 180', 1]], d: 3, c: 'analysis', t: [2], time: 420, assets: [fLinProof] }), null, 'proof of the linear pair theorem: each step marked by the scheme; the numbers (25, 65, 115) are asserted in the figure in figs.mjs');
{
  const E = eight(68);
  Q('l03', mk.long({ stem: r`Two parallel roads $l$ and $m$ are crossed by a road $t$, as in the figure. $\angle 1 = 112^\circ$. Find (a) $\angle 2$, (b) $\angle 3$ and $\angle 4$, (c) $\angle 5$ and $\angle 6$, (d) $\angle 7$ and $\angle 8$, giving a reason each time, and (e) check that the co-interior angles $\angle 3$ and $\angle 6$ add up to $180^\circ$.`, model: r`**(a)** $\angle 2 = 180^\circ - 112^\circ = 68^\circ$ (linear pair with $\angle 1$).\n\n**(b)** $\angle 3 = \angle 1 = 112^\circ$ and $\angle 4 = \angle 2 = 68^\circ$ (vertically opposite angles).\n\n**(c)** $\angle 5 = \angle 1 = 112^\circ$ and $\angle 6 = \angle 2 = 68^\circ$ (corresponding angles, $l \parallel m$).\n\n**(d)** $\angle 7 = \angle 5 = 112^\circ$ and $\angle 8 = \angle 6 = 68^\circ$ (vertically opposite angles).\n\n**(e)** $\angle 3 + \angle 6 = 112^\circ + 68^\circ = 180^\circ$.`, sol: 'Linear pair, vertically opposite angles, corresponding angles.', scheme: [['(a) 68 degrees', 1], ['(b) 112 and 68', 1], ['(c) 112 and 68 by corresponding angles', 1], ['(d) 112 and 68', 1], ['(e) 112 + 68 = 180', 1]], d: 3, c: 'application', t: [3], time: 420, assets: [transFig(68, [[1, '112°'], [2, '?'], [3, '?'], [4, '?'], [5, '?'], [6, '?'], [7, '?'], [8, '?']], 'Two parallel lines l and m cut by a transversal t with the eight angles marked. The angle 1 is 112 degrees and the other seven are marked with question marks.', 'Find the angles marked $?$ when $\\angle 1 = 112^\\circ$.')] }), (Cx) => { Cx.assert(E[1] === 112 && E[2] === 68 && E[3] === 112 && E[4] === 68 && E[5] === 112 && E[6] === 68 && E[7] === 112 && E[8] === 68 && E[3] + E[6] === 180, 'the eight angles'); Cx.model([68, 112, 180]); });
}
{
  const t = 72, ang = (d) => gap(t, d);
  Q('l04', mk.long({ stem: r`Three lines $l$, $m$ and $n$ are drawn so that $l \parallel m$ and $m \parallel n$. A transversal $t$ makes an angle of $72^\circ$ with $l$, measured on the upper right at the crossing. (a) What angle does $t$ make with $m$ in the same position, and why? (b) What angle does it make with $n$, and why? (c) Hence show that $l \parallel n$. (d) Find the co-interior angle to the $72^\circ$ angle at $n$. (e) A fourth line $k$ makes an angle of $70^\circ$ with $t$ in the same position. Is $k \parallel l$?`, model: r`**(a)** $72^\circ$: corresponding angles are equal since $l \parallel m$.\n\n**(b)** $72^\circ$: corresponding angles are equal since $m \parallel n$.\n\n**(c)** The transversal makes equal corresponding angles ($72^\circ$ and $72^\circ$) with $l$ and $n$, so $l \parallel n$ by the converse of the corresponding angles axiom. (Lines parallel to the same line are parallel.)\n\n**(d)** The co-interior angle is $180^\circ - 72^\circ = 108^\circ$.\n\n**(e)** No: the corresponding angles $70^\circ$ and $72^\circ$ are not equal, so $k$ is not parallel to $l$.`, sol: 'Corresponding angles twice, then the converse.', scheme: [['(a) 72 degrees, corresponding angles', 1], ['(b) 72 degrees, corresponding angles', 1], ['(c) converse gives l parallel to n', 1], ['(d) 108 degrees', 1], ['(e) 70 is not 72, so not parallel', 1]], d: 3, c: 'analysis', t: [3], time: 420 }), (Cx) => { Cx.assert(ang(0) === 72 && ang(0) === ang(0) && 180 - 72 === 108 && ang(2) === 70 && ang(2) !== ang(0), 'l, m, n horizontal give 72; a line at 2 degrees gives 70'); Cx.model([72, 108, 70, 180]); });
}
{
  const oddSqOdd = range(1, 199).filter((n) => n % 2 === 1).every((n) => (n * n) % 2 === 1);
  Q('l05', mk.long({ stem: r`(a) Write the four steps of a proof by contradiction. (b) Prove by contradiction that if $n^2$ is even, then $n$ is even. (c) Show that $n = 14$ and $n = 15$ agree with this result. (d) Prove by contradiction that there is no largest even number. (e) A triangle has angles that add up to $180^\circ$ (proved from parallel lines in this chapter). Prove by contradiction that a triangle cannot have two right angles.`, model: r`**(a)** Assume the statement is false; reason correctly from the assumption; reach a result that contradicts a known fact; conclude that the statement is true.\n\n**(b)** Suppose $n^2$ is even but $n$ is odd, $n = 2k + 1$. Then $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$, which is odd. This contradicts $n^2$ being even, so $n$ is even.\n\n**(c)** $14^2 = 196$ is even and $14$ is even. $15^2 = 225$ is odd and $15$ is odd.\n\n**(d)** Suppose $N$ is the largest even number. Then $N + 2$ is even and greater than $N$, a contradiction.\n\n**(e)** Suppose a triangle has two right angles. Then the sum of two angles is $90^\circ + 90^\circ = 180^\circ$, so the third angle would be $180^\circ - 180^\circ = 0^\circ$, which is impossible. So a triangle cannot have two right angles.`, sol: 'Assume the opposite and reach a contradiction each time.', scheme: [['(a) the four steps', 1], ['(b) n odd gives n squared odd', 1.5], ['(c) 196 and 225', 0.5], ['(d) N + 2', 1], ['(e) third angle 0 degrees', 1]], d: 4, c: 'analysis', t: [4], time: 480 }), (Cx) => { Cx.assert(oddSqOdd && 14 * 14 === 196 && 196 % 2 === 0 && 15 * 15 === 225 && 225 % 2 === 1 && 180 - 90 - 90 === 0, 'odd squares are odd; 196, 225; third angle 0'); Cx.model([196, 225, 180, 0, 2]); });
}

// =============================================================== case-based
{
  const clock = (h, m) => ({ hour: 30 * h + 0.5 * m, min: 6 * m }), between = (h, m) => { const c = clock(h, m); return gap(c.hour, c.min); };
  caseQ('c01', {
    passage: r`A wall clock in a school in Bhopal has an hour hand and a minute hand. The minute hand turns through $6^\circ$ every minute, and the hour hand turns through $0.5^\circ$ every minute. At $12$ o'clock both hands point straight up.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $120$. (c) (i) $75^\circ$. Or (ii) $160^\circ$.`,
    sol: r`(a) $25 \times 6 = 150^\circ$. (b) At $4$ o'clock the hour hand has turned $4 \times 30 = 120^\circ$ and the minute hand $0^\circ$, so the angle is $120^\circ$. (c) (i) At $3{:}30$ the hour hand has turned $105^\circ$ and the minute hand $180^\circ$: $180 - 105 = 75^\circ$. (ii) At $9{:}20$ the hour hand has turned $280^\circ$ and the minute hand $120^\circ$: $280 - 120 = 160^\circ$.`,
    children: [
      child('a', mk.mcq({ stem: 'In $25$ minutes the minute hand turns through', opts: [r`$150^\circ$`, r`$125^\circ$`, r`$90^\circ$`, r`$180^\circ$`], key: 'a', sol: r`The minute hand turns $6^\circ$ every minute, so in $25$ minutes it turns $25 \times 6 = 150^\circ$. The value $125^\circ$ is $25 \times 5$.`, d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the angle between the hands at $4$ o\'clock, in degrees.', value: 120, sol: r`At $4$ o'clock the hour hand has turned $4 \times 30 = 120^\circ$ from the top, and the minute hand is at the top, so the angle between them is $120^\circ$.`, scheme: [['Hour hand turned 120 degrees', 0.5], ['120 degrees', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the angle between the hands at $3{:}30$.`, model: r`At $3{:}30$ the hour hand has turned $3 \times 30 + 30 \times 0.5 = 105^\circ$. The minute hand has turned $30 \times 6 = 180^\circ$. The angle between them is $180^\circ - 105^\circ = 75^\circ$.`, sol: 'Find the position of each hand and subtract.', scheme: [['Hour hand 105 degrees and minute hand 180 degrees', 1], ['75 degrees', 1]], d: 3, c: 'application', t: [1], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the angle between the hands at $9{:}20$.`, model: r`At $9{:}20$ the hour hand has turned $9 \times 30 + 20 \times 0.5 = 280^\circ$. The minute hand has turned $20 \times 6 = 120^\circ$. The angle between them is $280^\circ - 120^\circ = 160^\circ$.`, sol: 'Find the position of each hand and subtract.', scheme: [['Hour hand 280 degrees and minute hand 120 degrees', 1], ['160 degrees', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([25 * 6, 25 * 5, 90, 180], 150);
    Cx.child('b').val(between(4, 0));
    Cx.child('c').assert(clock(3, 30).hour === 105 && clock(3, 30).min === 180 && between(3, 30) === 75, '75');
    Cx.child('c').model([105, 180, 75]);
    Cx.child('cii').assert(clock(9, 20).hour === 280 && clock(9, 20).min === 120 && between(9, 20) === 160, '160');
    Cx.child('cii').model([280, 120, 160]);
  });
}
{
  const x = range(1, 60).filter((v) => 3 * v + 10 === 5 * v - 30)[0], a = crossAngles(0, 110), dirE = (180 + 110) / 2, dirD = 110 + 180;
  caseQ('c02', {
    passage: r`Two roads $AB$ and $CD$ cross at a roundabout $O$ in Indore. The angle $\angle AOC = (3x + 10)^\circ$ and the angle $\angle BOD = (5x - 30)^\circ$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $20$. (c) (i) $110^\circ$. Or (ii) $145^\circ$.`,
    sol: r`(a) They are vertically opposite angles, so they are equal. (b) $3x + 10 = 5x - 30$ gives $x = 20$. (c) (i) $\angle AOC = 70^\circ$, so $\angle AOD = 180^\circ - 70^\circ = 110^\circ$. (ii) $\angle AOE = 35^\circ$, so $\angle EOD = 35^\circ + 110^\circ = 145^\circ$.`,
    children: [
      child('a', mk.mcq({ stem: r`The angles $\angle AOC$ and $\angle BOD$ are`, opts: ['vertically opposite and equal', 'a linear pair', 'complementary', 'co-interior angles'], key: 'a', sol: 'The roads cross at $O$, and $\\angle AOC$ and $\\angle BOD$ face each other across $O$, so they are vertically opposite and therefore equal. A linear pair would share an arm, and complementary angles add up to $90^\\circ$.', d: 1, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find $x$.', value: 20, sol: r`Vertically opposite angles are equal: $3x + 10 = 5x - 30$, so $2x = 40$ and $x = 20$.`, scheme: [['3x + 10 = 5x - 30', 0.5], ['x = 20', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find $\angle AOD$, giving the reason.`, model: r`$\angle AOC = 3 \times 20 + 10 = 70^\circ$. $\angle AOD$ and $\angle AOC$ form a linear pair on the line $CD$, so $\angle AOD = 180^\circ - 70^\circ = 110^\circ$.`, sol: 'Linear pair with angle AOC.', scheme: [['Angle AOC = 70 degrees', 1], ['Angle AOD = 110 degrees by linear pair', 1]], d: 2, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A third lane $OE$ bisects $\angle AOC$. Find $\angle EOD$.`, model: r`$\angle AOE = 70^\circ \div 2 = 35^\circ$. The ray $OA$ lies between $OE$ and $OD$, so $\angle EOD = \angle EOA + \angle AOD = 35^\circ + 110^\circ = 145^\circ$.`, sol: 'Half of angle AOC, then add angle AOD.', scheme: [['Angle AOE = 35 degrees', 1], ['Angle EOD = 145 degrees', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['vertical', 'linear', 'complementary', 'co-interior'], 'vertical');
    Cx.child('b').val(x);
    Cx.child('c').assert(3 * x + 10 === 70 && close(a.COA, 70) && close(a.AOD, 110) && 180 - 70 === 110, '110');
    Cx.child('c').model([70, 180, 110]);
    Cx.child('cii').assert(gap(dirE, 180) === 35 && gap(dirE, dirD) === 145, '145');
    Cx.child('cii').model([70, 35, 110, 145]);
  });
}
{
  const E = eight(65);
  caseQ('c03', {
    passage: r`Two parallel rails $l$ and $m$ of a railway track near Chennai are crossed by a footpath $t$. In the figure, $\angle 2 = 65^\circ$.`,
    d: 3, c: 'application', assets: [transFig(65, [[2, '65°'], [3, '?'], [5, '?'], [6, '?']], 'Two parallel rails l and m cut by a footpath t. The angle 2 at the upper crossing is 65 degrees. The angles 3, 5 and 6 are marked with question marks.', 'The rails $l \\parallel m$ and the footpath $t$.')],
    model: r`(a) Option (a). (b) $115$. (c) (i) $\angle 5 = 115^\circ$. Or (ii) $65^\circ$.`,
    sol: r`(a) $\angle 6 = \angle 2 = 65^\circ$ (corresponding angles). (b) $\angle 3 = 180^\circ - 65^\circ = 115^\circ$ (linear pair). (c) (i) $\angle 5 = \angle 3 = 115^\circ$ (alternate interior angles). (ii) A third rail $n$ with $m \parallel n$ is parallel to $l$, so the footpath makes $65^\circ$ with $n$.`,
    children: [
      child('a', mk.mcq({ stem: r`The angle $\angle 6$ is`, opts: [r`$65^\circ$`, r`$115^\circ$`, r`$25^\circ$`, r`$90^\circ$`], key: 'a', sol: r`$\angle 6$ and $\angle 2$ are corresponding angles between the parallel rails, so $\angle 6 = \angle 2 = 65^\circ$. The value $115^\circ$ is $\angle 3$.`, d: 1, c: 'understanding', t: [3], time: 60 })),
      child('b', mk.num({ stem: 'Find $\\angle 3$, in degrees.', value: 115, sol: r`$\angle 2$ and $\angle 3$ form a linear pair on the line $t$, so $\angle 3 = 180^\circ - 65^\circ = 115^\circ$.`, scheme: [['Linear pair with angle 2', 0.5], ['115 degrees', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find $\angle 5$ and name the type of angle pair that $\angle 3$ and $\angle 5$ form.`, model: r`$\angle 3$ and $\angle 5$ are alternate interior angles between parallel lines, so $\angle 5 = \angle 3 = 180^\circ - 65^\circ = 115^\circ$ (as $\angle 2 = 65^\circ$).`, sol: 'Alternate interior angles are equal.', scheme: [['Names alternate interior angles', 1], ['Angle 5 = 115 degrees', 1]], d: 2, c: 'application', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A third rail $n$ is parallel to $m$. What angle does the footpath make with $n$ in the same position as $\angle 2$? Give the reason.`, model: r`Since $l \parallel m$ and $m \parallel n$, the rails $l$ and $n$ are parallel (lines parallel to the same line are parallel). So the corresponding angle at $n$ is also $65^\circ$.`, sol: 'Transitivity of parallel lines, then corresponding angles.', scheme: [['l is parallel to n by transitivity', 1], ['65 degrees by corresponding angles', 1]], d: 3, c: 'application', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([E[6], E[3], 25, 90], 65);
    Cx.child('b').val(E[3]);
    Cx.child('c').assert(E[5] === 115 && E[3] === E[5] && pairKind(3, 5) === 'alternate', '115');
    Cx.child('c').model([115, 65]);
    Cx.child('cii').assert(E[2] === 65 && E[6] === 65, '65');
    Cx.child('cii').model([65]);
  });
}
{
  const big = 1000000, evens = range(0, 400).filter((k) => k % 2 === 0);
  caseQ('c04', {
    passage: r`Ravi says: "There is a largest even number, $N$." His classmate Ayesha wants to show that he is wrong, using a proof by contradiction.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $1000002$. (c) (i) The proof uses $N + 2$. Or (ii) There is no greatest odd number.`,
    sol: r`(a) $N + 2$ is even and bigger than $N$. (b) $1000000 + 2 = 1000002$. (c) (i) Suppose $N$ is the largest even number; $N + 2$ is even and greater than $N$; contradiction. (ii) Suppose $M$ is the greatest odd number; $M + 2$ is odd and greater than $M$; contradiction.`,
    children: [
      child('a', mk.mcq({ stem: 'Which fact does Ayesha use to contradict Ravi?', opts: ['$N + 2$ is an even number bigger than $N$', '$N - 2$ is an even number smaller than $N$', '$2N$ is an odd number', '$N$ is a multiple of $4$'], key: 'a', sol: 'Adding $2$ to an even number gives another even number, and it is bigger. So $N$ cannot be the largest even number. The numbers $N - 2$ and $2N$ do not give a bigger even number.', d: 1, c: 'understanding', t: [4], time: 60 })),
      child('b', mk.num({ stem: 'Ravi says that $N = 1000000$ is the largest even number. Find an even number that is greater than it, by Ayesha\'s method.', value: 1000002, sol: r`$N + 2 = 1000000 + 2 = 1000002$, which is even and greater than $N$.`, scheme: [['N + 2', 0.5], ['1000002', 0.5]], d: 2, c: 'application', t: [4], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Write Ayesha's proof in three lines: assumption, reasoning, conclusion.`, model: r`**Assume** that $N$ is the largest even number.\n\n**Reason:** $N + 2$ is also even and $N + 2 > N$, which contradicts the choice of $N$.\n\n**Conclude:** the assumption is false, so there is no largest even number.`, sol: 'Assume, reason, conclude.', scheme: [['Assumption and reasoning with N + 2', 1], ['Conclusion', 1]], d: 2, c: 'application', t: [4], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Use a similar proof to show that there is no greatest odd number.`, model: r`Suppose $M$ is the greatest odd number. Then $M + 2$ is also odd and $M + 2 > M$, which contradicts the choice of $M$. So there is no greatest odd number.`, sol: 'Add 2 to the supposed greatest odd number.', scheme: [['Supposes M is the greatest odd number', 1], ['M + 2 is odd and bigger: contradiction', 1]], d: 3, c: 'application', t: [4], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['n+2', 'n-2', '2n', '4'], 'n+2');
    Cx.child('b').val(big + 2);
    Cx.child('c').assert(evens.every((N) => (N + 2) % 2 === 0 && N + 2 > N) && (big + 2) % 2 === 0, 'N + 2');
    Cx.child('c').model(['N + 2']);
    Cx.child('cii').assert(range(0, 400).filter((k) => k % 2 === 1).every((M) => (M + 2) % 2 === 1 && M + 2 > M), 'M + 2 is odd');
    Cx.child('cii').model(['M + 2']);
  });
}

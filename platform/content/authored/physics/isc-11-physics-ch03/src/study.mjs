// ISC 11 ch03 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { Vec } from './phys.mjs';
import { V, EX, ijk, plotR } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10 } = EX;
const d3 = (x) => dec(x, 3);
const I = r`\hat{\imath}`;
const J = r`\hat{\jmath}`;
const K = r`\hat{k}`;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Vectors — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Scalars and vectors; position and displacement vectors; equal, null and coplanar vectors',
      r`- A **scalar** has magnitude only (mass, time, speed, work, energy, power). A **vector** has magnitude and direction and obeys the laws of vector addition (displacement, velocity, force, momentum, torque). Electric current has a sense but adds arithmetically, so it is a scalar.
- A vector is drawn as an arrow: length = magnitude, arrowhead = direction; written $\vec{A}$, magnitude $|\vec{A}| = A$.
- **Position vector** $\vec{r}$: from the origin to a point. **Displacement** $\Delta\vec{r} = \vec{r}_2 - \vec{r}_1$ depends only on the end points. A drone from $P(${ex1.P.join(', ')})$ to $Q(${ex1.Q.join(', ')})$ m has $\Delta\vec{r} = (${ex1.d.join(', ')})$ m, magnitude ${ex1.m} m, at ${d3(ex1.ang)}° to the $x$-axis.
- **Equal vectors:** same magnitude and direction. **Negative vector** $-\vec{A}$: opposite direction. **Null vector** $\vec{0}$: zero magnitude, no definite direction; $\vec{A} + (-\vec{A}) = \vec{0}$ (a complete round trip has zero displacement). **Coplanar vectors** lie in one plane; any two vectors and their sum are coplanar.`,
      [kt('Vector', 'A quantity with magnitude and direction that obeys the vector addition laws.'), kt('Displacement', 'The vector from the initial to the final position, r₂ − r₁.'), kt('Null vector', 'The vector of zero magnitude and no definite direction.'), kt('Coplanar vectors', 'Vectors that lie in the same plane.')],
      [fm(r`\Delta\vec{r} = \vec{r}_2 - \vec{r}_1`, 'Displacement vector'), fm(r`\vec{A} + (-\vec{A}) = \vec{0}`, 'A vector and its negative')],
      V.pos,
      [1],
    ),
    sec(
      '2. Unit vectors î, ĵ, k̂; magnitude; multiplication by a real number',
      r`- A **unit vector** has magnitude 1, no unit and no dimension; $${I}$, $${J}$, $${K}$ point along $+x$, $+y$, $+z$ and are mutually perpendicular. Any vector is $\vec{A} = A_x${I} + A_y${J} + A_z${K}$.
- Magnitude $|\vec{A}| = \sqrt{A_x^2 + A_y^2 + A_z^2}$; unit vector $\hat{A} = \vec{A}/|\vec{A}|$. For $\vec{A} = ${ijk(ex2.A)}$ m: $|\vec{A}| = ${ex2.m}$ m and $\hat{A} = (${ijk(ex2.A)})/${ex2.m}$.
- **Multiplication by a real number:** $\lambda\vec{A}$ has magnitude $|\lambda|A$, direction of $\vec{A}$ if $\lambda > 0$, opposite if $\lambda < 0$, and is $\vec{0}$ if $\lambda = 0$. In components every component is multiplied by $\lambda$. Two vectors are parallel when $\vec{B} = \lambda\vec{A}$.`,
      [kt('Unit vector', 'A vector of magnitude one that gives a direction only.'), kt('Components', 'The coefficients A_x, A_y, A_z in A = A_x î + A_y ĵ + A_z k̂.'), kt('Parallel vectors', 'Vectors with one a real multiple of the other.')],
      [fm(r`\vec{A} = A_x\hat{\imath} + A_y\hat{\jmath} + A_z\hat{k}`, 'Unit-vector form'), fm(r`|\vec{A}| = \sqrt{A_x^2 + A_y^2 + A_z^2}`, 'Magnitude'), fm(r`\hat{A} = \dfrac{\vec{A}}{|\vec{A}|}`, 'Unit vector along A')],
      V.axes3d,
      [2],
      [V.scalev],
    ),
    sec(
      '3. Addition and subtraction: triangle and parallelogram laws; resultant; special cases',
      r`- **Triangle law:** the sum of two vectors drawn head to tail is the third side of the triangle. **Parallelogram law:** two vectors drawn from a point as adjacent sides have the diagonal through that point as their sum. (Proof of the commutative and associative laws is not required.)
- With $\theta$ between $\vec{A}$ and $\vec{B}$: $R = \sqrt{A^2 + B^2 + 2AB\cos\theta}$ and $\tan\alpha = \dfrac{B\sin\theta}{A + B\cos\theta}$, $\alpha$ measured from $\vec{A}$. Derivation: drop $SN \perp OP$ produced; $ON = A + B\cos\theta$, $SN = B\sin\theta$; Pythagoras in $\triangle ONS$.
- Special cases: $\theta = 0^\circ$, $R = A + B$ (maximum); $90^\circ$, $R = \sqrt{A^2 + B^2}$; $180^\circ$, $R = |A - B|$ (minimum); equal magnitudes, $R = 2A\cos(\theta/2)$ along the bisector. Always $|A - B| \le R \le A + B$.
- Example: ${ex3.A} N and ${ex3.B} N at ${ex3.th}° give $R = ${ex3.R}$ N at ${d3(ex3.alpha)}° from the ${ex3.A} N force.
- **Subtraction:** $\vec{A} - \vec{B} = \vec{A} + (-\vec{B})$; the two diagonals of the parallelogram are $\vec{A} + \vec{B}$ and $\vec{A} - \vec{B}$; $|\vec{A} - \vec{B}| = \sqrt{A^2 + B^2 - 2AB\cos\theta}$. In unit-vector form add or subtract component by component: $${ijk(ex4.A)}$ and $${ijk(ex4.B)}$ give $${ijk(ex4.sum)}$ and $${ijk(ex4.dif)}$.`,
      [kt('Resultant', 'The single vector equivalent to the sum of two or more vectors.'), kt('Triangle law', 'Head-to-tail addition: the resultant closes the triangle.'), kt('Parallelogram law', 'The resultant of two vectors from a point is the diagonal of the parallelogram on them.')],
      [fm(r`R = \sqrt{A^2 + B^2 + 2AB\cos\theta}`, 'Magnitude of the resultant'), fm(r`\tan\alpha = \dfrac{B\sin\theta}{A + B\cos\theta}`, 'Direction of the resultant from A'), fm(r`|\vec{A} - \vec{B}| = \sqrt{A^2 + B^2 - 2AB\cos\theta}`, 'Magnitude of the difference')],
      V.vadd,
      [3],
      [V.deriv, plotR, V.vsub],
    ),
    sec(
      '4. Resolution of a vector; rectangular components and the resultant',
      r`- **Resolution** replaces a vector by components whose sum is the vector. Along perpendicular axes, with $\theta$ from the $x$-axis: $A_x = A\cos\theta$, $A_y = A\sin\theta$, $A = \sqrt{A_x^2 + A_y^2}$, $\tan\theta = A_y/A_x$. A ${ex5.F} N pull at ${ex5.th}° has components ${d3(ex5.x)} N and ${d3(ex5.y)} N.
- **In 3-D:** $A = \sqrt{A_x^2 + A_y^2 + A_z^2}$; direction cosines $\cos\alpha = A_x/A$, $\cos\beta = A_y/A$, $\cos\gamma = A_z/A$ with $\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$. For $${ijk(ex6.A)}$ the angles are ${d3(ex6.ang[0])}°, ${d3(ex6.ang[1])}°, ${d3(ex6.ang[2])}°.
- **Resultant from components:** $\Sigma X$ and $\Sigma Y$ are the sums of the components; $R = \sqrt{(\Sigma X)^2 + (\Sigma Y)^2}$, $\tan\varphi = \Sigma Y/\Sigma X$ with the quadrant from the signs. Three pulls of ${ex7.forces.map((f) => f[0]).join(' N, ')} N at ${ex7.forces.map((f) => f[1]).join('°, ')}° give $R = ${d3(ex7.R)}$ N at ${d3(ex7.ang)}°.
- If $\Sigma X = \Sigma Y = 0$ the vectors add to the null vector (equilibrium).`,
      [kt('Rectangular components', 'Components along two (or three) mutually perpendicular axes.'), kt('Direction cosines', 'The cosines of the angles a vector makes with the three axes.')],
      [fm(r`A_x = A\cos\theta,\; A_y = A\sin\theta`, 'Components'), fm(r`R = \sqrt{(\Sigma X)^2 + (\Sigma Y)^2}`, 'Resultant from components'), fm(r`\tan\varphi = \dfrac{\Sigma Y}{\Sigma X}`, 'Angle of the resultant')],
      V.resolve,
      [4],
      [V.axes3d],
    ),
    sec(
      '5. Scalar (dot) product and vector (cross) product',
      r`- **Dot product** $\vec{A}\cdot\vec{B} = AB\cos\theta$ (a scalar): magnitude of one times the projection of the other. Work $W = \vec{F}\cdot\vec{s}$; power $P = \vec{F}\cdot\vec{v}$. Commutative, distributive; $\vec{A}\cdot\vec{A} = A^2$; $${I}\cdot${I} = 1$, $${I}\cdot${J} = 0$ etc.; component form $A_xB_x + A_yB_y + A_zB_z$; angle $\cos\theta = \vec{A}\cdot\vec{B}/(AB)$; perpendicular if the product is zero. For $${ijk(ex8.F)}$ N and $${ijk(ex8.s)}$ m: $W = ${ex8.W}$ J, $\theta = ${d3(ex8.ang)}^\circ$.
- **Cross product** $\vec{A}\times\vec{B} = AB\sin\theta\,\hat{n}$ (a vector): $\hat{n}$ by the right-hand screw rule; magnitude = area of the parallelogram. Torque $\vec{\tau} = \vec{r}\times\vec{F}$. Not commutative: $\vec{B}\times\vec{A} = -\vec{A}\times\vec{B}$; $\vec{A}\times\vec{A} = \vec{0}$; $${I}\times${J} = ${K}$, $${J}\times${K} = ${I}$, $${K}\times${I} = ${J}$; determinant form for components. For $${ijk(ex9.A)}$ and $${ijk(ex9.B)}$: $\vec{A}\times\vec{B} = ${ijk(ex9.C)}$. A ${ex10.F[1]} N force at right angles to a ${ex10.r[0]} m arm gives $\tau = ${ex10.m}$ N m.
- **Special angles:** $0^\circ$: $A\cdot B = AB$, $A\times B = 0$; $90^\circ$: $A\cdot B = 0$, $|A\times B| = AB$; $180^\circ$: $A\cdot B = -AB$, $A\times B = 0$.`,
      [kt('Scalar product', 'A·B = AB cos θ, a scalar; gives work as F·s.'), kt('Vector product', 'A × B = AB sin θ n̂, a vector perpendicular to both; gives torque as r × F.'), kt('Right-hand screw rule', 'The direction of A × B is the way a right-handed screw advances when turned from A to B.')],
      [fm(r`\vec{A}\cdot\vec{B} = AB\cos\theta = A_xB_x + A_yB_y + A_zB_z`, 'Dot product'), fm(r`|\vec{A}\times\vec{B}| = AB\sin\theta`, 'Magnitude of the cross product'), fm(r`\vec{\tau} = \vec{r}\times\vec{F}`, 'Torque')],
      V.dot,
      [5],
      [V.cross],
    ),
  ],
  exam_tips_md: `- Draw the figure for every derivation (parallelogram with the perpendicular for R and α) and show each step; give the angle with the vector it is measured from.
- In unit-vector problems keep the signs of components; |A − B| is not A − B in magnitude.
- Resolve with the angle from the axis you are told; check with √(Aₓ² + A_y²) = A. Fix the quadrant of the resultant from the signs of ΣX and ΣY.
- Dot product: a scalar, a sum of three products, zero for perpendicular vectors. Cross product: a vector, a determinant, perpendicular to both; B × A = −A × B.
- State the right-hand screw rule and the unit (J for work, N m for torque); electric current is a scalar even though it has a sense.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define a vector. Which test separates a vector from a scalar that has a direction?', 'A vector has magnitude and direction and obeys the vector addition laws; current has a sense but adds like a number, so it is a scalar.', 'concept', 1),
    fc(2, 'What is a displacement vector?', 'The vector from the initial to the final position, $\\vec{r}_2 - \\vec{r}_1$; it does not depend on the path.', 'concept', 1),
    fc(3, 'Define a position vector.', 'A vector from the origin to the point.', 'concept', 1),
    fc(4, 'When are two vectors equal?', 'When they have the same magnitude and the same direction, wherever they are drawn.', 'concept', 1),
    fc(5, 'What is a null vector?', 'A vector of zero magnitude and no definite direction, e.g. the displacement after a round trip.', 'concept', 1),
    fc(6, 'When are vectors coplanar?', 'When they lie in one plane (or can be drawn in one plane by shifting them parallel to themselves).', 'concept', 1),
    fc(7, 'Are two vectors always coplanar?', 'Yes. Any two vectors, with their sum, lie in one plane; three vectors need not.', 'fact', 1),
    fc(8, 'What is the negative of a vector?', 'A vector of the same magnitude in the opposite direction; $\\vec{A} + (-\\vec{A}) = \\vec{0}$.', 'concept', 1),
    fc(9, 'What is a unit vector? State its magnitude and dimension.', 'A vector giving direction only; magnitude 1, no unit, dimensionless.', 'concept', 2),
    fc(10, 'Name the unit vectors along x, y and z.', '$\\hat{\\imath}$, $\\hat{\\jmath}$ and $\\hat{k}$.', 'fact', 2),
    fc(11, 'Write the magnitude of $A_x\\hat{\\imath} + A_y\\hat{\\jmath} + A_z\\hat{k}$.', '$\\sqrt{A_x^2 + A_y^2 + A_z^2}$.', 'formula', 2),
    fc(12, 'Write the unit vector along $\\vec{A}$.', '$\\hat{A} = \\vec{A}/|\\vec{A}|$.', 'formula', 2),
    fc(13, 'What does $\\lambda\\vec{A}$ look like for $\\lambda < 0$?', 'Magnitude $|\\lambda|A$ and direction opposite to $\\vec{A}$.', 'concept', 2),
    fc(14, 'State the triangle law of vector addition.', 'If two vectors are drawn head to tail as two sides of a triangle, their sum is the third side from the tail of the first to the head of the second.', 'concept', 3),
    fc(15, 'State the parallelogram law.', 'If two vectors are drawn from a point as adjacent sides of a parallelogram, their sum is the diagonal through that point.', 'concept', 3),
    fc(16, 'Write the magnitude of the resultant of $\\vec{A}$ and $\\vec{B}$ at angle $\\theta$.', '$R = \\sqrt{A^2 + B^2 + 2AB\\cos\\theta}$.', 'formula', 3),
    fc(17, 'Write the direction of the resultant.', '$\\tan\\alpha = \\dfrac{B\\sin\\theta}{A + B\\cos\\theta}$, $\\alpha$ measured from $\\vec{A}$.', 'formula', 3),
    fc(18, 'What is R when the vectors are parallel, perpendicular and antiparallel?', '$A + B$; $\\sqrt{A^2 + B^2}$; $|A - B|$.', 'formula', 3),
    fc(19, 'Between which limits does the resultant of A and B lie?', '$|A - B| \\le R \\le A + B$.', 'fact', 3),
    fc(20, 'What are the diagonals of a parallelogram on $\\vec{A}$ and $\\vec{B}$?', 'The sum $\\vec{A} + \\vec{B}$ and the difference $\\vec{A} - \\vec{B}$.', 'concept', 3),
    fc(21, 'Write the rectangular components of a vector A at angle θ to the x-axis.', '$A_x = A\\cos\\theta$ and $A_y = A\\sin\\theta$.', 'formula', 4),
    fc(22, 'How do you recover A and θ from the components?', '$A = \\sqrt{A_x^2 + A_y^2}$ and $\\tan\\theta = A_y/A_x$ (check the quadrant).', 'formula', 4),
    fc(23, 'What are the direction cosines of a vector?', '$A_x/A$, $A_y/A$, $A_z/A$, the cosines of the angles with the axes; their squares add to 1.', 'concept', 4),
    fc(24, 'How do you find the resultant of several coplanar vectors?', 'Add the x components and the y components separately: $R = \\sqrt{(\\Sigma X)^2 + (\\Sigma Y)^2}$, $\\tan\\varphi = \\Sigma Y/\\Sigma X$.', 'concept', 4),
    fc(25, 'Define the scalar product and give an example from physics.', '$\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta$, a scalar; work $W = \\vec{F}\\cdot\\vec{s}$.', 'formula', 5),
    fc(26, 'Write the dot product in components and the condition for perpendicular vectors.', '$A_xB_x + A_yB_y + A_zB_z$; perpendicular when it is zero.', 'formula', 5),
    fc(27, 'Define the vector product and give an example.', '$\\vec{A}\\times\\vec{B} = AB\\sin\\theta\\,\\hat{n}$, a vector by the right-hand screw rule; torque $\\vec{\\tau} = \\vec{r}\\times\\vec{F}$.', 'formula', 5),
    fc(28, 'Give the cross products of the unit vectors.', '$\\hat{\\imath}\\times\\hat{\\jmath} = \\hat{k}$, $\\hat{\\jmath}\\times\\hat{k} = \\hat{\\imath}$, $\\hat{k}\\times\\hat{\\imath} = \\hat{\\jmath}$; reversed order gives the negative; $\\hat{\\imath}\\times\\hat{\\imath} = 0$.', 'formula', 5),
    fc(29, 'Is the cross product commutative?', 'No: $\\vec{B}\\times\\vec{A} = -(\\vec{A}\\times\\vec{B})$.', 'fact', 5),
    fc(30, 'What are $\\vec{A}\\cdot\\vec{B}$ and $|\\vec{A}\\times\\vec{B}|$ at 0°, 90° and 180°?', '0°: $AB$ and 0; 90°: 0 and $AB$; 180°: $-AB$ and 0.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};

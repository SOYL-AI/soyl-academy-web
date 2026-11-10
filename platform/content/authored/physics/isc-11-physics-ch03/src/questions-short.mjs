// ISC 11 ch03 question bank, part 2: short answers of 2 marks (30–50 words) and 3 marks (50–80 words; derivations).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { Vec, rad, deg, mn, angleBetween, sumPolar, R6 } from './phys.mjs';

const { short } = mk;

// ================================================================ 2 marks
add('scalvec-short', short({
  marks: 2,
  stem: 'Classify each of the following as a scalar or a vector, with a one-line reason: (i) the work done in lifting a bucket from a well, (ii) the momentum of a moving cricket ball.',
  model: '(i) Work is a scalar: it has magnitude only, and the works done on a body add as ordinary numbers. (ii) Momentum is a vector: it is mass times velocity, so it has the direction of the velocity as well as a magnitude, and momenta add by the parallelogram law.',
  sol: 'Work scalar (no direction); momentum vector (mass times velocity).',
  scheme: [['Work: scalar, magnitude only', 1], ['Momentum: vector, direction of velocity, adds by the parallelogram law', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('posdisp-short', short({
  marks: 2,
  stem: 'How does the position vector of a point differ from the displacement vector between two points? Why is the displacement of a runner zero after one complete lap of a track although the distance run is not?',
  model: 'A position vector starts at the origin and ends at the point; the displacement is the final position vector minus the initial one and depends only on the end points. After one lap the end point is the start point, so the displacement is zero, while the distance is the length of the track.',
  sol: 'Position from the origin; displacement = r₂ − r₁; round trip has equal end points.',
  scheme: [['Position vector from the origin; displacement = final − initial position', 1], ['Round trip: same end points, so null displacement; distance is the track length', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('equalneg-short', short({
  marks: 2,
  stem: 'Distinguish between equal vectors and the negative of a vector. What is obtained when a vector is added to its negative?',
  model: 'Equal vectors have the same magnitude and the same direction, wherever they are drawn. The negative of a vector has the same magnitude but the opposite direction. A vector added to its negative gives the null vector, which has zero magnitude and no definite direction.',
  sol: 'Same direction against opposite direction; sum is the null vector.',
  scheme: [['Equal: same magnitude and direction; negative: same magnitude, opposite direction', 1], ['A + (−A) = null vector (zero magnitude, no definite direction)', 1]],
  d: 1, c: 'recall', t: [1],
}));
const ud = { A: [3, 4] };
ud.m = Vec.mag(ud.A);
ud.u = ud.A.map((c) => c / ud.m);
add('unitdef-short', short({
  marks: 2,
  stem: 'What is a unit vector? Find the unit vector along A = 3î + 4ĵ.',
  model: r`A unit vector has magnitude one and no unit or dimension; it only shows a direction. Here $|\vec{A}| = \sqrt{9 + 16} = ${ud.m}$, so $\hat{A} = \vec{A}/|\vec{A}| = ${ud.u[0]}\hat{\imath} + ${ud.u[1]}\hat{\jmath}$, whose own magnitude is one.`,
  sol: 'Divide A by its magnitude 5.',
  scheme: [['Unit vector: magnitude 1, no unit, gives direction only', 1], [`|A| = ${ud.m}; Â = ${ud.u[0]} î + ${ud.u[1]} ĵ`, 1]],
  d: 2, c: 'application', t: [2],
}), () => near(Math.hypot(...ud.u), 1, 1e-12) && ud.u.join() === '0.6,0.8' || 'unitdef');
add('scalem-short', short({
  marks: 2,
  stem: 'A vector A is multiplied in turn by the real numbers 2, ½ and −3. State the magnitude and the direction of each new vector in terms of A.',
  model: 'The vector 2A has magnitude 2A and points along A. The vector ½A has magnitude A/2 and also points along A. The vector −3A has magnitude 3A and points opposite to A, because a negative number reverses the direction.',
  sol: 'λA has magnitude |λ|A; direction reverses for negative λ.',
  scheme: [['2A: magnitude 2A, same direction; ½A: magnitude A/2, same direction', 1], ['−3A: magnitude 3A, opposite direction', 1]],
  d: 1, c: 'understanding', t: [2],
}), () => {
  const A = [3, 4];
  const ok = [2, 0.5, -3].every((k) => near(Vec.mag(Vec.scale(A, k)), Math.abs(k) * 5, 1e-12) && (k > 0 ? Vec.dot(Vec.scale(A, k), A) > 0 : Vec.dot(Vec.scale(A, k), A) < 0));
  return ok || 'scalem';
});
add('tri-short', short({
  marks: 2,
  stem: 'State the triangle law of vector addition and say how the parallelogram law gives the same resultant.',
  model: 'If two vectors are drawn head to tail, as two sides of a triangle taken in order, their sum is the third side drawn from the tail of the first to the head of the second. In the parallelogram law the vectors start at a common point, and the diagonal from that point is the same resultant.',
  sol: 'Head to tail gives the closing side; tail to tail gives the diagonal.',
  scheme: [['Triangle law: head-to-tail vectors, resultant is the closing third side', 1], ['Parallelogram law: common tail, resultant is the diagonal, equal to the same vector', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('special90-short', short({
  marks: 2,
  stem: 'Two forces F₁ and F₂ act at a point at right angles to each other. Write the magnitude of their resultant and its direction measured from F₁.',
  model: r`For $\theta = 90^\circ$ we have $\cos\theta = 0$ and $\sin\theta = 1$ in the general results, so the magnitude is $R = \sqrt{F_1^2 + F_2^2}$. The direction is given by $\tan\alpha = F_2/F_1$, with $\alpha$ measured from $F_1$ towards $F_2$.`,
  sol: 'Put θ = 90° in R and tan α.',
  scheme: [['R = √(F₁² + F₂²)', 1], ['tan α = F₂/F₁, α measured from F₁', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('minr-short', short({
  marks: 2,
  stem: 'Under what condition is the resultant of two vectors A and B (a) the largest and (b) the smallest? Give the value of each in terms of A and B.',
  model: r`The resultant is largest when the vectors point in the same direction, $\theta = 0^\circ$, and then $R_{max} = A + B$. It is smallest when they point in opposite directions, $\theta = 180^\circ$, and then $R_{min} = |A - B|$. Every other angle gives a value between these two.`,
  sol: 'cos θ = 1 gives the sum; cos θ = −1 gives the difference.',
  scheme: [['Largest at θ = 0°: A + B', 1], ['Smallest at θ = 180°: |A − B|', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('resolve-short', short({
  marks: 2,
  stem: 'A force F acts at an angle θ above the horizontal. Write its horizontal and vertical components and show how F and θ are recovered from them.',
  model: r`The horizontal component is $F_x = F\cos\theta$ and the vertical component is $F_y = F\sin\theta$. Since the two components and F form a right-angled triangle, $F = \sqrt{F_x^2 + F_y^2}$ and $\tan\theta = F_y/F_x$ give back the magnitude and the angle.`,
  sol: 'Right-angled triangle of F, Fx and Fy.',
  scheme: [['Fx = F cos θ, Fy = F sin θ', 1], ['F = √(Fx² + Fy²), tan θ = Fy/Fx', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('dircos-short', short({
  marks: 2,
  stem: 'What are the direction cosines of a vector A = Aₓî + A_yĵ + A_zk̂? Show that the sum of their squares is one.',
  model: r`They are the cosines of the angles that $\vec{A}$ makes with the x, y and z axes, namely $l = A_x/A$, $m = A_y/A$ and $n = A_z/A$, found by dividing each component by the magnitude. Adding the squares gives $(A_x^2 + A_y^2 + A_z^2)/A^2$, and since the numerator equals $A^2$ by the magnitude formula, the sum $l^2 + m^2 + n^2$ is one.`,
  sol: 'Divide each component by the magnitude and add the squares.',
  scheme: [['Direction cosines = Aₓ/A, A_y/A, A_z/A (cosines of the angles with the axes)', 1], ['Sum of squares = (Aₓ² + A_y² + A_z²)/A² = 1', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('dotdef-short', short({
  marks: 2,
  stem: 'Define the scalar product of two vectors. Name one physical quantity that is defined as a scalar product.',
  model: r`The scalar product of $\vec{A}$ and $\vec{B}$ is the scalar $\vec{A}\cdot\vec{B} = AB\cos\theta$, where $\theta$ is the angle between them; it equals the magnitude of one vector times the projection of the other on it. Work done by a force, $W = \vec{F}\cdot\vec{s}$, is a scalar product.`,
  sol: 'A B cos θ; work as F·s.',
  scheme: [['A·B = AB cos θ, a scalar', 1], ['Work W = F·s (or power P = F·v)', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('rhs-short', short({
  marks: 2,
  stem: 'State the right-hand screw rule for the direction of A × B and name one physical quantity that is defined as a vector product.',
  model: r`Turn a right-handed screw from the first vector $\vec{A}$ towards the second vector $\vec{B}$ through the smaller angle; the direction in which the screw advances is the direction of $\vec{A}\times\vec{B}$, perpendicular to both. Torque, $\vec{\tau} = \vec{r}\times\vec{F}$, is a vector product.`,
  sol: 'Screw turned from A to B advances along A × B; torque as example.',
  scheme: [['Right-handed screw turned from A to B advances along A × B (perpendicular to both)', 1], ['Torque τ = r × F (or angular momentum)', 1]],
  d: 2, c: 'recall', t: [5],
}));

// ================================================================ 3 marks
add('coplan-short3', short({
  marks: 3,
  stem: 'Define coplanar vectors. Show that two vectors A and B and their resultant R are always coplanar, and say whether any three vectors in space must be coplanar.',
  model: 'Coplanar vectors lie in one plane, or can be drawn in one plane by shifting them parallel to themselves. Two vectors drawn from a point fix a plane, and their resultant is the diagonal of the parallelogram in that plane, so A, B and R are coplanar. Three vectors in general are not: three edges meeting at the corner of a cube are not coplanar.',
  sol: 'A, B and the diagonal lie in the plane of the parallelogram; three edges of a cube are a counter-example.',
  scheme: [['Coplanar: lie in one plane', 1], ['A and B fix a plane; R is the diagonal of the parallelogram in it', 1], ['Three vectors need not be coplanar (cube corner example)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('magproof-short3', short({
  marks: 3,
  stem: 'Show that the magnitude of the vector A = Aₓî + A_yĵ + A_zk̂ is √(Aₓ² + A_y² + A_z²).',
  model: r`Take a box with edges $A_x$, $A_y$, $A_z$ along the axes, whose diagonal from the origin is $\vec{A}$. The diagonal of the base in the xy-plane has length $\sqrt{A_x^2 + A_y^2}$ by Pythagoras. This base diagonal and the vertical edge $A_z$ are perpendicular, so $A^2 = A_x^2 + A_y^2 + A_z^2$ and $A = \sqrt{A_x^2 + A_y^2 + A_z^2}$.`,
  sol: 'Pythagoras twice: base diagonal, then the space diagonal.',
  scheme: [['Box with edges Aₓ, A_y, A_z; A is its diagonal', 1], ['Base diagonal = √(Aₓ² + A_y²) (Pythagoras)', 1], ['Second Pythagoras step with A_z gives the result', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rmag-short3', short({
  marks: 3,
  stem: 'Two vectors A and B act at a point with an angle θ between them. Using the parallelogram law, derive an expression for the magnitude of their resultant.',
  model: r`Draw the vectors head to tail: let $OP$ represent $A$ and $PS$ represent $B$, with $\theta$ the angle between them, so that $OS$ is the resultant $R$. Draw $SN$ perpendicular to $OP$ produced. In the right-angled triangle $PNS$, $PN = B\cos\theta$ and $SN = B\sin\theta$. In the right-angled triangle $ONS$, Pythagoras gives $OS^2 = (A + B\cos\theta)^2 + (B\sin\theta)^2$, which with $\cos^2\theta + \sin^2\theta = 1$ simplifies to $R = \sqrt{A^2 + B^2 + 2AB\cos\theta}$.`,
  sol: 'Perpendicular from the tip of the resultant; Pythagoras in the big right-angled triangle.',
  scheme: [['Figure: OP = A, PS = B, SN perpendicular to OP produced', 1], ['PN = B cos θ, SN = B sin θ; OS² = (A + B cos θ)² + (B sin θ)²', 1], ['R = √(A² + B² + 2AB cos θ)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('ralpha-short3', short({
  marks: 3,
  stem: 'Two vectors A and B act at a point with an angle θ between them. Derive an expression for the direction of the resultant, measured from A.',
  model: r`Complete the parallelogram with $OP = A$, $PS = B$ and the resultant $OS = R$, and draw $SN$ perpendicular to $OP$ produced. In the right-angled triangle $PNS$ we get $PN = B\cos\theta$ and $SN = B\sin\theta$, so the base of the large triangle is $ON = A + B\cos\theta$. If $\alpha$ is the angle that $OS$ makes with $OP$, the definition of the tangent in the triangle $ONS$ gives $\tan\alpha = SN/ON = \dfrac{B\sin\theta}{A + B\cos\theta}$, measured from the vector $A$.`,
  sol: 'Tangent in triangle ONS: SN over ON.',
  scheme: [['Figure with SN perpendicular to OP produced', 1], ['PN = B cos θ, SN = B sin θ, ON = A + B cos θ', 1], ['tan α = B sin θ / (A + B cos θ)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('diag-short3', short({
  marks: 3,
  stem: 'Show with the help of a parallelogram that its two diagonals represent A + B and A − B. Write |A − B| in terms of A, B and the angle θ between them.',
  model: r`Draw A and B from a common point and complete the parallelogram. The diagonal from that point is $\vec{A} + \vec{B}$ by the parallelogram law. The other diagonal, from the tip of $\vec{B}$ to the tip of $\vec{A}$, satisfies $\vec{B} + \text{(diagonal)} = \vec{A}$, so it is $\vec{A} - \vec{B}$. Replacing $\theta$ by $180^\circ - \theta$ gives $|\vec{A} - \vec{B}| = \sqrt{A^2 + B^2 - 2AB\cos\theta}$.`,
  sol: 'Triangle law on the second diagonal; replace θ by 180° − θ.',
  scheme: [['Common diagonal is A + B (parallelogram law)', 1], ['Other diagonal from tip of B to tip of A is A − B (triangle law)', 1], ['|A − B| = √(A² + B² − 2AB cos θ)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
const eqf = { a: 5, b: 12 };
eqf.R = Math.hypot(eqf.a, eqf.b);
eqf.alpha = deg(Math.atan2(eqf.b, eqf.a));
add('equilib-short3', short({
  marks: 3,
  stem: 'Two forces of 5 N and 12 N act at a point at right angles to each other. Find the magnitude of the third force that keeps the point in equilibrium and state its direction relative to the 5 N force.',
  model: r`The resultant of the two forces is $R = \sqrt{5^2 + 12^2} = ${eqf.R}$ N, at $\alpha = \tan^{-1}(12/5) = ${dec(eqf.alpha, 3)}^\circ$ from the 5 N force. For equilibrium the third force must cancel this resultant, so its magnitude is ${eqf.R} N and it acts exactly opposite to the resultant, at ${dec(180 + eqf.alpha, 4)} degrees from the 5 N force, on the far side.`,
  sol: 'Third force = −(resultant of the other two).',
  scheme: [[`Resultant R = √(25 + 144) = ${eqf.R} N`, 1], [`Direction of R: tan α = 12/5, α = ${dec(eqf.alpha, 3)}° from the 5 N force`, 1], [`Third force ${eqf.R} N, opposite to R (at ${dec(180 + eqf.alpha, 4)}° from the 5 N force)`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(sumPolar([[5, 0], [12, 90]]).R, eqf.R, 1e-12) && sumPolar([[5, 0], [12, 90], [13, 180 + eqf.alpha]]).R < 1e-9 || 'equilib');
add('compsum-short3', short({
  marks: 3,
  stem: 'Describe how the resultant of three coplanar forces is found by resolving them along two perpendicular axes. Give the formulae for the magnitude and direction of the resultant.',
  model: r`Choose perpendicular x and y axes and resolve each force into $F\cos\theta$ along x and $F\sin\theta$ along y, keeping the signs. Add all the x components to get $\Sigma X$ and all the y components to get $\Sigma Y$. Then $R = \sqrt{(\Sigma X)^2 + (\Sigma Y)^2}$ and $\tan\varphi = \Sigma Y/\Sigma X$, the quadrant being fixed by the signs of the two sums.`,
  sol: 'Resolve, add the components separately, combine by Pythagoras.',
  scheme: [['Resolve each force along x and y with signs', 1], ['ΣX and ΣY by adding components', 1], ['R = √(ΣX² + ΣY²), tan φ = ΣY/ΣX with quadrant from the signs', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('comp-short3', short({
  marks: 3,
  stem: 'A vector A makes an angle θ with the x-axis. Obtain its rectangular components and show that Aₓ² + A_y² = A².',
  model: r`Draw the vector $\vec{A}$ from the origin and drop a perpendicular from its tip to the x-axis. This makes a right-angled triangle whose hypotenuse is $A$ and whose angle at the origin is $\theta$. The side next to $\theta$ gives $A_x = A\cos\theta$ and the opposite side gives $A_y = A\sin\theta$. Squaring and adding the two components, and using $\cos^2\theta + \sin^2\theta = 1$, gives $A_x^2 + A_y^2 = A^2$.`,
  sol: 'Right-angled triangle; cos² + sin² = 1.',
  scheme: [['Figure: perpendicular from the tip of A to the x-axis', 1], ['Aₓ = A cos θ, A_y = A sin θ', 1], ['Aₓ² + A_y² = A²(cos²θ + sin²θ) = A²', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('dotcomp-short3', short({
  marks: 3,
  stem: 'Using î·î = 1 and î·ĵ = 0, show that the scalar product of A = Aₓî + A_yĵ + A_zk̂ and B = Bₓî + B_yĵ + B_zk̂ is AₓBₓ + A_yB_y + A_zB_z.',
  model: r`Multiply out $\vec{A}\cdot\vec{B}$ using the distributive law, which gives nine terms of the type $A_iB_j$ times a dot product of unit vectors. The three terms with equal unit vectors, such as $\hat{\imath}\cdot\hat{\imath}$, are each equal to one. The six terms with different unit vectors are perpendicular pairs and vanish. What remains is $A_xB_x + A_yB_y + A_zB_z$.`,
  sol: 'Nine terms; three survive.',
  scheme: [['Expand with the distributive law (nine terms)', 1], ['î·î = ĵ·ĵ = k̂·k̂ = 1', 1], ['î·ĵ = ĵ·k̂ = k̂·î = 0, so the result AₓBₓ + A_yB_y + A_zB_z', 1]],
  d: 3, c: 'understanding', t: [5],
}));
const cx = { A: [3, 2], B: [1, 4] };
cx.z = Vec.cross2(cx.A, cx.B);
add('crosscomp-short3', short({
  marks: 3,
  stem: 'For two vectors in the xy-plane, show that A × B = (AₓB_y − A_yBₓ)k̂, using î × ĵ = k̂. Evaluate it for A = 3î + 2ĵ and B = î + 4ĵ.',
  model: r`Multiply out the two vectors with the distributive law. The products of a unit vector with itself, $\hat{\imath}\times\hat{\imath}$ and $\hat{\jmath}\times\hat{\jmath}$, are zero. Also $\hat{\imath}\times\hat{\jmath} = \hat{k}$ while $\hat{\jmath}\times\hat{\imath} = -\hat{k}$, so only two terms remain and $\vec{A}\times\vec{B} = (A_xB_y - A_yB_x)\hat{k}$. For the given vectors the value is $(3 \times 4 - 2 \times 1)\hat{k} = ${cx.z}\hat{k}$, along the $+z$ axis.`,
  sol: 'Only the two mixed terms survive.',
  scheme: [['Same-unit-vector terms vanish', 1], ['î × ĵ = k̂, ĵ × î = −k̂ give (AₓB_y − A_yBₓ)k̂', 1], [`Value (3)(4) − (2)(1) = ${cx.z}, so ${cx.z} k̂`, 1]],
  d: 3, c: 'application', t: [5],
}), () => cx.z === 10 && near(Vec.mag(Vec.cross3([...cx.A, 0], [...cx.B, 0])), 10, 1e-12) || 'crosscomp');
const wk = { F: [4, 3], s: [6, 2] };
wk.W = Vec.dot(wk.F, wk.s);
wk.ang = angleBetween(wk.F, wk.s);
add('work-short3', short({
  marks: 3,
  stem: 'A force F = 4î + 3ĵ newton moves a body through a displacement s = 6î + 2ĵ metre. Find the work done and the angle between the force and the displacement.',
  model: r`The work is the scalar product of force and displacement, found by multiplying the matching components and adding: $W = \vec{F}\cdot\vec{s} = (4)(6) + (3)(2) = ${wk.W}$ J. The angle then follows from the definition of the dot product. The magnitudes are $F = \sqrt{16 + 9} = 5$ N and $s = \sqrt{36 + 4} = ${dec(Vec.mag(wk.s), 4)}$ m, so $\cos\theta = ${wk.W}/(5 \times ${dec(Vec.mag(wk.s), 4)}) = ${dec(wk.W / (5 * Vec.mag(wk.s)), 4)}$ and the angle is $${dec(wk.ang, 3)}^\circ$, which is acute because the work is positive.`,
  sol: 'Dot product of components, then arccos.',
  scheme: [[`W = F·s = 24 + 6 = ${wk.W} J`, 1], ['F = 5 N, s = √40 m', 1], [`cos θ = ${dec(wk.W / (5 * Vec.mag(wk.s)), 4)}, θ = ${dec(wk.ang, 3)}°`, 1]],
  d: 3, c: 'application', t: [5],
}), () => near(Math.hypot(...wk.F) * Math.hypot(...wk.s) * Math.cos(rad(wk.ang)), wk.W, 1e-9) && wk.W === 30 || 'work');
const tq = { r: 0.5, F: 20, th: 30 };
tq.t = tq.r * tq.F * Math.sin(rad(tq.th));
add('torque-short3', short({
  marks: 3,
  stem: 'A force of 20 N is applied at the end of a 0.5 m spanner, at 30° to the length of the spanner. Find the magnitude of the torque about the nut and state the direction of the torque vector.',
  model: r`Torque is the vector product $\vec{\tau} = \vec{r}\times\vec{F}$, with magnitude $\tau = rF\sin\theta = (0.5)(20)\sin 30^\circ = ${dec(tq.t, 3)}$ N m. Its direction is perpendicular to the plane containing the spanner and the force, given by the right-hand screw rule: along the axis of the nut, out of the plane if the turn is anticlockwise.`,
  sol: 'τ = r F sin θ; direction by the screw rule.',
  scheme: [['τ = r × F, magnitude r F sin θ', 1], [`τ = 0.5 × 20 × sin 30° = ${dec(tq.t, 3)} N m`, 1], ['Direction perpendicular to the plane of r and F (right-hand screw rule)', 1]],
  d: 3, c: 'application', t: [5],
}), () => {
  const rv = [0.5, 0];
  const Fv = Vec.polar(20, 30);
  return near(Vec.cross2(rv, Fv), tq.t, 1e-9) && near(tq.t, 5, 1e-12) || 'torque-short3';
});

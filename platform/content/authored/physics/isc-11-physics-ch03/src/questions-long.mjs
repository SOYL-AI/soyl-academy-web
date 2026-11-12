// ISC 11 ch03 question bank, part 3: long answers (5 marks), set in parts with the marks shown.
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { Vec, rad, deg, mn, angleBetween, angleByCross, sumPolar, foldPolar } from './phys.mjs';

const { long } = mk;
const I = r`\hat{\imath}`;
const J = r`\hat{\jmath}`;
const K = r`\hat{k}`;

// ---------------------------------------------------------------- t01, t02: a drone in space
const dr = { P: [3, -2, 5], Q: [7, 1, 17] };
dr.d = Vec.sub(dr.Q, dr.P);
dr.m = Vec.mag(dr.d);
dr.u = dr.d.map((c) => c / dr.m);
add('drone-long', long({
  stem: '(a) Define a position vector and a displacement vector and state how they are related. [2] (b) A drone flies from the point P(3, −2, 5) m to the point Q(7, 1, 17) m. Find its displacement vector, the magnitude of the displacement and the unit vector along it. [3]',
  model: r`(a) A position vector joins the origin to a point in space and tells where that point is. A displacement vector joins an initial position to a final position. It equals the final position vector minus the initial position vector, $\Delta\vec{r} = \vec{r}_2 - \vec{r}_1$, and depends only on the two end points, not on the path followed.

(b) Subtracting the coordinates of P from those of Q gives $\Delta\vec{r} = (7 - 3)${I} + (1 + 2)${J} + (17 - 5)${K} = ${dr.d[0]}${I} + ${dr.d[1]}${J} + ${dr.d[2]}${K}$ m. Its magnitude is the square root of the sum of the squares of the components, $\sqrt{16 + 9 + 144} = ${dr.m}$ m. The unit vector along the displacement is found by dividing the displacement vector by this magnitude: $(${dr.d[0]}${I} + ${dr.d[1]}${J} + ${dr.d[2]}${K})/${dr.m}$; it has magnitude one and no unit.`,
  sol: 'Final minus initial position; divide by the magnitude.',
  scheme: [['Position vector: from the origin to the point', 1], ['Displacement = r₂ − r₁, depends only on the end points', 1], [`Δr = ${dr.d[0]} î + ${dr.d[1]} ĵ + ${dr.d[2]} k̂ m`, 1], [`|Δr| = √169 = ${dr.m} m`, 1], [`Unit vector = (${dr.d[0]} î + ${dr.d[1]} ĵ + ${dr.d[2]} k̂)/${dr.m}`, 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => dr.d.join() === '4,3,12' && dr.m === 13 && near(Vec.mag(dr.u), 1, 1e-12) || 'drone');

// ---------------------------------------------------------------- t03: derivation of the resultant
add('parallel-long', long({
  stem: '(a) State the parallelogram law of vector addition. [1] (b) Two vectors A and B act at a point with an angle θ between them. Derive an expression for the magnitude of the resultant R. [2] (c) Derive an expression for the angle α that R makes with A. [2]',
  model: r`(a) If two vectors are drawn from a point as the adjacent sides of a parallelogram, their resultant is represented by the diagonal of the parallelogram through that point.

(b) Let $OP = A$, $PS = B$ and $OS = R$, and draw $SN$ perpendicular to $OP$ produced. In the triangle $PNS$, $PN = B\cos\theta$ and $SN = B\sin\theta$. In the right-angled triangle $ONS$, Pythagoras gives $R^2 = (A + B\cos\theta)^2 + (B\sin\theta)^2$, and since $\cos^2\theta + \sin^2\theta = 1$, $R = \sqrt{A^2 + B^2 + 2AB\cos\theta}$.

(c) In the same triangle the tangent of the angle $\alpha$ is the opposite side over the adjacent side: $\tan\alpha = \dfrac{SN}{ON} = \dfrac{B\sin\theta}{A + B\cos\theta}$, so $\alpha$ is measured from the vector $A$.`,
  sol: 'Perpendicular SN to OP produced; Pythagoras for R, tangent for α.',
  scheme: [['Parallelogram law stated: diagonal through the common point', 1], ['Figure with SN perpendicular to OP produced; PN = B cos θ, SN = B sin θ', 1], ['R = √(A² + B² + 2AB cos θ)', 1], ['tan α = SN/ON with ON = A + B cos θ', 1], ['α = tan⁻¹[B sin θ/(A + B cos θ)]', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t03: special cases and a numerical
const cs = { A: 8, B: 6, th: 60 };
cs.rs = sumPolar([[cs.A, 0], [cs.B, cs.th]]);
cs.R = Math.sqrt(cs.A ** 2 + cs.B ** 2 + 2 * cs.A * cs.B * Math.cos(rad(cs.th)));
cs.alpha = deg(Math.atan2(cs.B * Math.sin(rad(cs.th)), cs.A + cs.B * Math.cos(rad(cs.th))));
add('cases-long', long({
  stem: '(a) Write the magnitude of the resultant of two vectors A and B when the angle between them is (i) 0°, (ii) 90° and (iii) 180°, and say which gives the largest and the smallest value. [2] (b) Two forces of 8 N and 6 N act at a point with an angle of 60° between them. Find the magnitude of the resultant and its direction with respect to the 8 N force. [3]',
  model: r`(a) Put each angle into $R = \sqrt{A^2 + B^2 + 2AB\cos\theta}$. (i) For parallel vectors the magnitudes simply add, $R = A + B$, the largest value. (ii) At right angles $R = \sqrt{A^2 + B^2}$. (iii) For opposite vectors the magnitudes subtract, $R = |A - B|$, the smallest value.

(b) Now apply the same law to the two forces given in the question, taking the 8 N force as the first vector. $R^2 = 8^2 + 6^2 + 2(8)(6)\cos 60^\circ = 64 + 36 + 48 = ${Math.round(cs.R * cs.R)}$, so $R = ${dec(cs.R, 4)}$ N. For the direction, $\tan\alpha = \dfrac{6\sin 60^\circ}{8 + 6\cos 60^\circ} = \dfrac{${dec(6 * Math.sin(rad(60)), 4)}}{11} = ${dec((6 * Math.sin(rad(60))) / 11, 4)}$, so the resultant makes $${dec(cs.alpha, 3)}^\circ$ with the 8 N force. As expected, it lies between the two forces and nearer the larger one, and its magnitude is less than their arithmetic sum of 14 N.`,
  sol: 'Special angles in the general law; then R² and tan α for 8 N and 6 N.',
  scheme: [['0°: A + B (largest); 180°: |A − B| (smallest)', 1], ['90°: √(A² + B²)', 1], ['R² = 64 + 36 + 48 = 148', 1], [`R = ${dec(cs.R, 4)} N`, 1], [`tan α = ${dec((6 * Math.sin(rad(60))) / 11, 4)}, α = ${dec(cs.alpha, 3)}° from the 8 N force`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(cs.rs.R, cs.R, 1e-9) && near(cs.rs.ang, cs.alpha, 1e-9) && near(cs.R ** 2, 148, 1e-9) || 'cases');

// ---------------------------------------------------------------- t04: resolution and three forces
const rf = { f: [[12, 30], [16, 150], [10, 270]] };
rf.s = sumPolar(rf.f);
rf.fold = foldPolar(rf.f);
rf.x = rf.f.map(([m, a]) => m * Math.cos(rad(a)));
rf.y = rf.f.map(([m, a]) => m * Math.sin(rad(a)));
rf.phi = 180 - deg(Math.atan(rf.s.y / -rf.s.x));
add('resolve-long', long({
  stem: '(a) A force F acts at an angle θ to the x-axis. Write its rectangular components and show that they reproduce the magnitude of F. [2] (b) Three forces of 12 N, 16 N and 10 N act at a point in the directions 30°, 150° and 270° from the +x axis. Find the magnitude and direction of the resultant by resolving along the axes. [3]',
  model: r`(a) Resolving along the axes gives $F_x = F\cos\theta$ and $F_y = F\sin\theta$. Squaring and adding the components, $F_x^2 + F_y^2 = F^2(\cos^2\theta + \sin^2\theta) = F^2$, so the components reproduce the magnitude of the force.

(b) Draw the three forces from the point, measure each angle from the +x axis, resolve every force along the two axes and add the components with their signs, taking care over which are negative. $\Sigma X = 12\cos 30^\circ + 16\cos 150^\circ + 10\cos 270^\circ = ${dec(rf.x[0], 4)} - ${dec(-rf.x[1], 4)} + 0 = ${mn(dec(rf.s.x, 4))}$ N and $\Sigma Y = 6 + 8 - 10 = ${dec(rf.s.y, 3)}$ N. The magnitude is $R = \sqrt{${dec(rf.s.x ** 2, 4)} + ${dec(rf.s.y ** 2, 4)}} = ${dec(rf.s.R, 4)}$ N. Since $\Sigma X$ is negative and $\Sigma Y$ is positive, the resultant lies in the second quadrant, at $${dec(rf.phi, 4)}^\circ$ from the $+x$ axis.`,
  sol: 'Resolve each force; the signs of the sums give the quadrant.',
  scheme: [['Fx = F cos θ, Fy = F sin θ', 1], ['Fx² + Fy² = F²', 1], [`ΣX = ${mn(dec(rf.s.x, 4))} N, ΣY = ${dec(rf.s.y, 3)} N`, 1], [`R = ${dec(rf.s.R, 4)} N`, 1], [`Second quadrant: angle ${dec(rf.phi, 4)}° from +x`, 1]],
  d: 4, c: 'application', t: [4],
}), () => near(rf.fold.R, rf.s.R, 1e-9) && near(rf.s.R ** 2, 28, 1e-9) && near(Vec.ang([rf.s.x, rf.s.y]), rf.phi, 1e-9) || 'resolve-long');

// ---------------------------------------------------------------- t02, t03, t04: vectors in three dimensions
const v3 = { A: [3, -2, 6], B: [1, 2, -2] };
v3.sum = Vec.add(v3.A, v3.B);
v3.c = Vec.sub(Vec.scale(v3.A, 2), Vec.scale(v3.B, 3));
v3.ms = Vec.mag(v3.sum);
v3.mA = Vec.mag(v3.A);
v3.gam = deg(Math.acos(v3.A[2] / v3.mA));
add('threed-long', long({
  stem: 'Two vectors are A = 3î − 2ĵ + 6k̂ and B = î + 2ĵ − 2k̂. (a) Find A + B and 2A − 3B. [2] (b) Find the magnitude of A + B. [1] (c) Find the magnitude of A and the angle that A makes with the z-axis. [2]',
  model: r`(a) Add or subtract the vectors component by component. $\vec{A} + \vec{B} = (3 + 1)${I} + (-2 + 2)${J} + (6 - 2)${K} = ${v3.sum[0]}${I} + ${v3.sum[2]}${K}$, because the $\hat{\jmath}$ component cancels. For the second combination, multiply first and then subtract: $2\vec{A} - 3\vec{B} = (6 - 3)${I} + (-4 - 6)${J} + (12 + 6)${K} = ${v3.c[0]}${I} - ${-v3.c[1]}${J} + ${v3.c[2]}${K}$.

(b) The magnitude is the square root of the sum of the squares of the components: $|\vec{A} + \vec{B}| = \sqrt{16 + 0 + 16} = \sqrt{32} = ${dec(v3.ms, 4)}$.

(c) $|\vec{A}| = \sqrt{9 + 4 + 36} = ${v3.mA}$. The cosine of the angle with the z-axis is the z component divided by the magnitude, $\cos\gamma = 6/${v3.mA}$, so the angle with the z-axis is $${dec(v3.gam, 3)}^\circ$.`,
  sol: 'Component by component; direction cosine A_z/A.',
  scheme: [[`A + B = ${v3.sum[0]} î + ${v3.sum[2]} k̂`, 1], [`2A − 3B = ${v3.c[0]} î − ${-v3.c[1]} ĵ + ${v3.c[2]} k̂`, 1], [`|A + B| = √32 = ${dec(v3.ms, 4)}`, 1], [`|A| = ${v3.mA}`, 1], [`cos γ = 6/7, γ = ${dec(v3.gam, 3)}°`, 1]],
  d: 3, c: 'application', t: [2, 3, 4],
}), () => v3.sum.join() === '4,0,4' && v3.c.join() === '3,-10,18' && v3.mA === 7 && near(Vec.mag(Vec.sub(v3.sum, [0, 0, 0])), Math.sqrt(32), 1e-12) && near(Math.cos(rad(v3.gam)), 6 / 7, 1e-12) || 'threed');

// ---------------------------------------------------------------- t05: scalar product and work
const dw = { F: [5, 2, -3], P: [1, 2, 3], Q: [4, 6, 5] };
dw.s = Vec.sub(dw.Q, dw.P);
dw.W = Vec.dot(dw.F, dw.s);
dw.ang = angleBetween(dw.F, dw.s);
add('dotwork-long', long({
  stem: '(a) Define the scalar product of two vectors and state two of its properties. [2] (b) A force F = 5î + 2ĵ − 3k̂ newton displaces a body from the point (1, 2, 3) m to the point (4, 6, 5) m. Find the work done by the force. [2] (c) Find the angle between the force and the displacement. [1]',
  model: r`(a) The scalar product is $\vec{A}\cdot\vec{B} = AB\cos\theta$, and the result is a scalar. Two properties: it is commutative, $\vec{A}\cdot\vec{B} = \vec{B}\cdot\vec{A}$, and distributive over addition; it is also zero for two perpendicular vectors.

(b) The displacement is the final position minus the initial position: $\vec{s} = (4 - 1)${I} + (6 - 2)${J} + (5 - 3)${K} = ${dw.s[0]}${I} + ${dw.s[1]}${J} + ${dw.s[2]}${K}$ m. The work done is the dot product of force and displacement, $W = (5)(3) + (2)(4) + (-3)(2) = ${dw.W}$ J.

(c) The magnitudes are $F = \sqrt{38}$ N and $s = \sqrt{29}$ m, so $\cos\theta = ${dw.W}/\sqrt{38 \times 29} = ${dec(dw.W / Math.sqrt(38 * 29), 4)}$, which gives an angle of $${dec(dw.ang, 3)}^\circ$ between the force and the displacement.`,
  sol: 'Displacement from the end points; dot product of components; arccos.',
  scheme: [['A·B = AB cos θ, a scalar', 1], ['Two properties (commutative, distributive, zero for perpendicular vectors)', 1], [`s = ${dw.s[0]} î + ${dw.s[1]} ĵ + ${dw.s[2]} k̂ m`, 1], [`W = 15 + 8 − 6 = ${dw.W} J`, 1], [`cos θ = ${dec(dw.W / Math.sqrt(38 * 29), 4)}, θ = ${dec(dw.ang, 3)}°`, 1]],
  d: 3, c: 'application', t: [5],
}), () => dw.s.join() === '3,4,2' && dw.W === 17 && near(angleByCross(dw.F, dw.s), dw.ang, 1e-9) || 'dotwork');

// ---------------------------------------------------------------- t05: vector product and torque
const cp = { A: [2, -1, 3], B: [1, 2, -1], rr: 0.4, F: 25 };
cp.C = Vec.cross3(cp.A, cp.B);
cp.m = Vec.mag(cp.C);
cp.tau = cp.rr * cp.F * Math.sin(rad(90));
add('crosstorque-long', long({
  stem: '(a) Define the vector product A × B and state how the direction of A × B is found. [2] (b) For A = 2î − ĵ + 3k̂ and B = î + 2ĵ − k̂ find A × B and verify that it is perpendicular to A. [2] (c) A force of 25 N is applied at right angles to a door at a point 0.4 m from the hinge. Find the magnitude of the torque. [1]',
  model: r`(a) The vector product is $\vec{A}\times\vec{B} = AB\sin\theta\,\hat{n}$, a vector whose magnitude equals the area of the parallelogram on $\vec{A}$ and $\vec{B}$. Its direction $\hat{n}$ is perpendicular to both vectors, found by the right-hand screw rule: a right-handed screw turned from $\vec{A}$ towards $\vec{B}$ advances along $\hat{n}$.

(b) Using the determinant form, $\vec{A}\times\vec{B} = ((-1)(-1) - (3)(2))${I} + ((3)(1) - (2)(-1))${J} + ((2)(2) - (-1)(1))${K} = ${cp.C[0]}${I} + ${cp.C[1]}${J} + ${cp.C[2]}${K}$. To verify, $\vec{A}\cdot(\vec{A}\times\vec{B}) = (2)(${cp.C[0]}) + (-1)(${cp.C[1]}) + (3)(${cp.C[2]}) = ${Vec.dot(cp.A, cp.C)}$, so the product is perpendicular to $\vec{A}$.

(c) The force is perpendicular to the lever arm, so $\tau = rF\sin 90^\circ = (0.4)(25) = ${cp.tau}$ N m.`,
  sol: 'Component formula, dot product zero check, τ = r F.',
  scheme: [['A × B = AB sin θ n̂, a vector', 1], ['Direction by the right-hand screw rule, perpendicular to both', 1], [`A × B = ${mn(cp.C[0])} î + ${cp.C[1]} ĵ + ${cp.C[2]} k̂`, 1], ['A·(A × B) = −10 − 5 + 15 = 0, so perpendicular to A', 1], [`τ = 0.4 × 25 = ${cp.tau} N m`, 1]],
  d: 4, c: 'application', t: [5],
}), () => cp.C.join() === '-5,5,5' && Vec.dot(cp.A, cp.C) === 0 && Vec.dot(cp.B, cp.C) === 0 && cp.tau === 10 && near(Vec.mag(Vec.cross3(cp.A, cp.B)), Vec.mag(cp.A) * Vec.mag(cp.B) * Math.sin(rad(angleBetween(cp.A, cp.B))), 1e-9) || 'crosstorque');

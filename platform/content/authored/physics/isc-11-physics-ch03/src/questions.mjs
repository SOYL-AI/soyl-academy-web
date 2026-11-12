// ISC 11 ch03 question bank, part 1: objective items (1 mark): MCQs, assertion-reason, true-false, fill-blank and numericals.
// Every number is computed here and re-solved by an independent `check` (component arithmetic, angle by another route,
// Heron's formula, triangle inequality). Solutions and schemes print the computed values.
// AR keys across the chapter: a (null), b (current), c (less), d (fifteen), a (cross), c (work).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { Vec, rad, deg, mn, angleBetween, angleByCross, sumPolar, foldPolar } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const d2 = (x) => dec(x, 3);

// ================================================================ t01 scalars and vectors; position and displacement; equal, null, coplanar
add('kinds-mcq', mcq({
  stem: 'Which statement about the null vector is correct?',
  right: 'It has zero magnitude and no definite direction, and adding it to any vector leaves that vector unchanged',
  wrong: ['It has zero magnitude and always points along the x-axis', 'It is the number zero, so it is a scalar', 'It has unit magnitude and no definite direction'],
  sol: 'The null vector has magnitude zero and no definite direction; A + 0 = A. It is a vector, not the number zero, and a unit magnitude would make it a unit vector.',
  d: 1, c: 'recall', t: [1],
}));
add('vecpair-mcq', mcq({
  stem: 'A hockey stick strikes a ball. Which pair below contains only vector quantities?',
  right: 'Momentum of the ball and force exerted by the stick',
  wrong: ['Kinetic energy of the ball and work done by the stick', 'Speed of the ball and time of contact', 'Mass of the ball and power delivered by the player'],
  sol: 'Momentum and force have magnitude and direction. Kinetic energy, work, speed, time, mass and power are scalars.',
  d: 1, c: 'recall', t: [1],
}));
add('current-mcq', mcq({
  stem: 'Electric current flows in a definite direction along a wire, yet it is classified as a scalar. The reason is that',
  right: 'currents meeting at a junction add arithmetically and not by the parallelogram law',
  wrong: ['the direction of a current changes when the axes are rotated', 'its SI unit, the ampere, is a base unit', 'a current has a magnitude but is measured without any sign'],
  sol: 'A quantity is a vector only if it obeys the vector addition laws. Currents at a junction add as ordinary numbers, so current is a scalar although it has a sense along the wire.',
  d: 2, c: 'understanding', t: [1],
}));
const bt = { from: [-2, 3], to: [4, -1] };
bt.d = Vec.sub(bt.to, bt.from);
add('dispvec-mcq', mcq({
  stem: `A boat on a lake moves from the point (−2, 3) m to the point (4, −1) m, where the axes point east and north. Its displacement vector is`,
  right: `${bt.d[0]} î − ${-bt.d[1]} ĵ`.replace('- ', '− '),
  wrong: [`${bt.from[0] + bt.to[0]} î + ${bt.from[1] + bt.to[1]} ĵ`, `−${bt.d[0]} î + ${-bt.d[1]} ĵ`, `${bt.from[0] + bt.to[0]} î − ${-bt.d[1]} ĵ`],
  scheme: [[`Δr = (4 − (−2)) î + (−1 − 3) ĵ = ${bt.d[0]} î − ${-bt.d[1]} ĵ (@K)`, 1]],
  sol: `Displacement = final position − initial position = (4 + 2) î + (−1 − 3) ĵ = ${bt.d[0]} î − ${-bt.d[1]} ĵ. Adding the two positions would give 2 î + 2 ĵ, and the displacement of the return trip would be −6 î + 4 ĵ.`,
  d: 2, c: 'application', t: [1],
}), () => bt.d[0] === 6 && bt.d[1] === -4 && near(Math.hypot(4 - -2, -1 - 3), Vec.mag(bt.d), 1e-12) || 'dispvec');
add('coplanar-mcq', mcq({
  stem: 'Which of the following sets of vectors is always coplanar?',
  right: 'A, B and A + B, for any two vectors A and B',
  wrong: ['Three forces along the three edges of a cube that meet at one corner', 'The position vectors of any three points in space', 'A, B and A × B'],
  sol: 'The sum A + B lies in the plane of A and B. Three edges from one corner of a cube are mutually perpendicular, so they are not coplanar; three position vectors need not be; and A × B is perpendicular to the plane of A and B.',
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 unit vectors, magnitude, multiplication by a number
const m3 = { v: [1, 4, 8] };
m3.m = Vec.mag(m3.v);
add('mag-mcq', mcq({
  stem: 'The magnitude of the vector î + 4ĵ + 8k̂ is',
  right: `${m3.m}`,
  wrong: [`${m3.v[0] + m3.v[1] + m3.v[2]}`, `√${m3.v[0] + m3.v[1] + m3.v[2]} ≈ ${dec(Math.sqrt(m3.v[0] + m3.v[1] + m3.v[2]), 2)}`, `${m3.m * m3.m}`],
  scheme: [[`|A| = √(1 + 16 + 64) = √81 = ${m3.m} (@K)`, 1]],
  sol: `|A| = √(1² + 4² + 8²) = √81 = ${m3.m}. Adding the components gives 13, and taking the root of 13 or stopping at 81 forgets one step.`,
  d: 1, c: 'application', t: [2],
}), () => near(Math.sqrt(m3.v.reduce((s, c) => s + c * c, 0)), 9, 1e-12) || 'mag');
const ud = { v: [-6, 8, 0] };
ud.m = Vec.mag(ud.v);
ud.u = ud.v.map((c) => c / ud.m);
add('unitdir-mcq', mcq({
  stem: 'The unit vector in the direction of −6î + 8ĵ is',
  right: `${mn(ud.u[0])} î + ${ud.u[1]} ĵ`,
  wrong: ['−6î + 8ĵ', `${-ud.u[0]} î + ${ud.u[1]} ĵ`, `${mn(ud.u[1])} î − ${-ud.u[0]} ĵ`.replace('0.8 î', '0.8 î')],
  scheme: [[`|A| = √(36 + 64) = ${ud.m}; Â = A/${ud.m} = ${mn(ud.u[0])} î + ${ud.u[1]} ĵ (@K)`, 1]],
  sol: `|A| = √((−6)² + 8²) = ${ud.m}. Dividing each component by ${ud.m} gives ${mn(ud.u[0])} î + ${ud.u[1]} ĵ, whose magnitude is √(0.36 + 0.64) = 1. The vector −6î + 8ĵ itself has magnitude ${ud.m}.`,
  d: 2, c: 'application', t: [2],
}), () => near(Math.hypot(-0.6, 0.8), 1, 1e-12) && near(-0.6 * ud.m, -6, 1e-12) && near(0.8 * ud.m, 8, 1e-12) || 'unitdir');
const sc = { A: [2, -1, 2], lam: -3 };
sc.m = Math.abs(sc.lam) * Vec.mag(sc.A);
add('scale-mcq', mcq({
  stem: 'For the vector A = 2î − ĵ + 2k̂, the magnitude of the vector −3A is',
  right: `${sc.m}`,
  wrong: ['3', '27', '−9'],
  scheme: [[`|A| = √(4 + 1 + 4) = 3, so |−3A| = 3 × 3 = ${sc.m} (@K)`, 1]],
  sol: `|A| = 3 and |λA| = |λ||A| = 3 × 3 = ${sc.m}. The minus sign only reverses the direction; a magnitude is never negative.`,
  d: 2, c: 'application', t: [2],
}), () => near(Vec.mag(Vec.scale(sc.A, sc.lam)), sc.m, 1e-12) || 'scale');
add('unitprop-mcq', mcq({
  stem: 'Which statement about the unit vector î is correct?',
  right: 'It has magnitude one, no dimensions and points along the positive x-axis',
  wrong: ['It has the unit of the vector from which it is derived', 'It always has the same magnitude as the vector it describes', 'Its magnitude depends on the units of the axes'],
  sol: 'A unit vector is dimensionless and has magnitude exactly one. î is the unit vector along +x; ĵ and k̂ are along +y and +z.',
  d: 1, c: 'recall', t: [2],
}));
const pl = { A: [2, 3], B: [6] };
pl.p = (pl.B[0] / pl.A[0]) * pl.A[1];
add('parallel-mcq', mcq({
  stem: 'The vectors 2î + 3ĵ and 6î + pĵ are parallel. The value of p is',
  right: `${pl.p}`,
  wrong: ['4', '6', '18'],
  scheme: [[`6/2 = p/3, so p = ${pl.p} (@K)`, 1]],
  sol: `Parallel vectors are multiples of each other: 6î + pĵ = λ(2î + 3ĵ) gives λ = 6/2 = 3 and p = 3 × 3 = ${pl.p}.`,
  d: 3, c: 'application', t: [2],
}), () => near(Vec.mag([6, pl.p]) / Vec.mag([2, 3]), 3, 1e-12) || 'parallel');

// ================================================================ t03 triangle and parallelogram laws
const rp = { a: 9, b: 12 };
rp.R = Math.hypot(rp.a, rp.b);
add('rperp-mcq', mcq({
  stem: 'Two forces of 9 N and 12 N act at a point at right angles to each other. The magnitude of their resultant is',
  right: `${rp.R} N`,
  wrong: [`${rp.a + rp.b} N`, `${rp.b - rp.a} N`, `${rp.R * rp.R} N`],
  scheme: [[`R = √(9² + 12²) = √225 = ${rp.R} N (@K)`, 1]],
  sol: `For θ = 90°, R = √(A² + B²) = √(81 + 144) = ${rp.R} N. Adding magnitudes (21 N) is valid only for parallel forces.`,
  d: 1, c: 'application', t: [3],
}), () => near(Vec.mag(Vec.add([9, 0], [0, 12])), rp.R, 1e-12) || 'rperp');
const rg = { a: 12, b: 5 };
add('range-mcq', mcq({
  stem: 'Two vectors have magnitudes 12 and 5. The magnitude of their resultant can have any value from',
  right: `${rg.a - rg.b} to ${rg.a + rg.b}`,
  wrong: [`${rg.b} to ${rg.a}`, `0 to ${rg.a + rg.b}`, `${rg.a - rg.b} to ${rg.a}`],
  scheme: [[`Minimum 12 − 5 = ${rg.a - rg.b} (θ = 180°), maximum 12 + 5 = ${rg.a + rg.b} (θ = 0°) (@K)`, 1]],
  sol: `R lies between |A − B| (opposite directions) and A + B (same direction): ${rg.a - rg.b} to ${rg.a + rg.b}. It can be zero only if the two magnitudes are equal.`,
  d: 2, c: 'application', t: [3],
}), () => {
  let lo = 1e9;
  let hi = 0;
  for (let th = 0; th <= 180; th += 0.5) {
    const m = Vec.mag(Vec.add([rg.a, 0], Vec.polar(rg.b, th)));
    lo = Math.min(lo, m);
    hi = Math.max(hi, m);
  }
  return (near(lo, 7, 1e-9) && near(hi, 17, 1e-9)) || 'range';
});
const eq = { th: 120 };
add('equal120-mcq', mcq({
  stem: 'Two forces, each of magnitude F, act at a point with an angle of 120° between them. Their resultant has magnitude',
  right: 'F',
  wrong: ['2F', 'F/2', 'F√3'],
  scheme: [['R² = F² + F² + 2F² cos 120° = F², so R = F (@K)', 1]],
  sol: 'R² = F² + F² + 2F·F cos 120° = 2F² − F² = F². For equal vectors R = 2F cos(θ/2) = 2F cos 60° = F.',
  d: 3, c: 'application', t: [3],
}), () => near(Vec.mag(Vec.add([1, 0], Vec.polar(1, eq.th))), 1, 1e-12) || 'equal120');
const al = { f: 5, th: 60 };
al.alpha = deg(Math.atan2(al.f * Math.sin(rad(al.th)), al.f + al.f * Math.cos(rad(al.th))));
add('alpha-mcq', mcq({
  stem: 'Two forces of 5 N each act at a point, 60° apart. The resultant makes an angle with either force of',
  right: `${Math.round(al.alpha)}°`,
  wrong: ['60°', '45°', '15°'],
  scheme: [[`tan α = 5 sin 60° / (5 + 5 cos 60°) = 0.577, so α = ${Math.round(al.alpha)}° (@K)`, 1]],
  sol: `For equal vectors the resultant bisects the angle between them, so α = θ/2 = ${Math.round(al.alpha)}°. Direct calculation: tan α = (5 × 0.866)/(5 + 2.5) = 0.577.`,
  d: 2, c: 'application', t: [3],
}), () => near(Vec.ang(Vec.add([5, 0], Vec.polar(5, 60))), 30, 1e-9) || 'alpha');
const df = { m: 10, th: 60 };
df.d = Math.round(Vec.mag(Vec.sub([df.m, 0], Vec.polar(df.m, df.th))) * 1e6) / 1e6;
add('diff-mcq', mcq({
  stem: 'Two vectors A and B have equal magnitudes of 10 units and the angle between them is 60°. The magnitude of A − B is',
  right: `${df.d} units`,
  wrong: [`${dec(Vec.mag(Vec.add([df.m, 0], Vec.polar(df.m, df.th))), 4)} units`, '0', '20 units'],
  scheme: [[`|A − B|² = 100 + 100 − 2(100) cos 60° = 100, so |A − B| = ${df.d} (@K)`, 1]],
  sol: `|A − B| = √(A² + B² − 2AB cos θ) = √(200 − 100) = ${df.d}. The value 17.32 would be |A + B|, and 20 would need θ = 180° for the difference.`,
  d: 3, c: 'application', t: [3],
}), () => near(df.d, 10, 1e-9) || 'diff');
const eqf = [['3 N, 4 N, 8 N', 3, 4, 8], ['2 N, 3 N, 6 N', 2, 3, 6], ['5 N, 5 N, 11 N', 5, 5, 11], ['4 N, 5 N, 8 N', 4, 5, 8]];
const canBalance = (a, b, c) => a + b >= c && a + c >= b && b + c >= a;
add('equil-mcq', mcq({
  stem: 'Three forces act at a point. Which set of magnitudes can keep the point in equilibrium?',
  right: eqf[3][0],
  wrong: [eqf[0][0], eqf[1][0], eqf[2][0]],
  sol: 'Three forces balance only if they can form a closed triangle, so each must be less than or equal to the sum of the other two. Only 4 N, 5 N and 8 N satisfies this (4 + 5 > 8); in each wrong set the largest force exceeds the sum of the other two.',
  d: 3, c: 'application', t: [3],
}), () => eqf.map(([, a, b, c]) => canBalance(a, b, c)).join() === 'false,false,false,true' || 'equil');

const mm = { hi: 18, lo: 6 };
mm.P = (mm.hi + mm.lo) / 2;
mm.Q = (mm.hi - mm.lo) / 2;
mm.R = Math.sqrt(mm.P ** 2 + mm.Q ** 2);
add('maxmin-mcq', mcq({
  stem: 'Two forces acting at a point have a largest possible resultant of 18 N and a smallest possible resultant of 6 N. If the two forces are made to act at right angles to each other, their resultant is',
  right: `${dec(mm.R, 3)} N`,
  wrong: ['12 N', '15 N', '17 N'],
  scheme: [[`P + Q = 18 and P − Q = 6 give P = ${mm.P} N, Q = ${mm.Q} N; R = √(${mm.P}² + ${mm.Q}²) = ${dec(mm.R, 3)} N (@K)`, 1]],
  sol: `The largest resultant is P + Q = 18 N and the smallest is P − Q = 6 N, so P = ${mm.P} N and Q = ${mm.Q} N. At 90° R = √(P² + Q²) = √${mm.P ** 2 + mm.Q ** 2} = ${dec(mm.R, 3)} N.`,
  d: 4, c: 'analysis', t: [3],
}), () => {
  let hi = 0;
  let lo = 1e9;
  for (let th = 0; th <= 180; th += 0.5) {
    const m = Vec.mag(Vec.add([mm.P, 0], Vec.polar(mm.Q, th)));
    hi = Math.max(hi, m);
    lo = Math.min(lo, m);
  }
  return (near(hi, 18, 1e-9) && near(lo, 6, 1e-9) && near(Vec.mag(Vec.add([mm.P, 0], [0, mm.Q])), mm.R, 1e-12)) || 'maxmin';
});
const pr = { A: 10, B: 6 };
pr.th = deg(Math.acos(-pr.B / pr.A));
add('perpres-mcq', mcq({
  stem: 'A force of 10 N and a force of 6 N act at a point. The angle between them is adjusted until the resultant is perpendicular to the 6 N force. The angle between the two forces is then',
  right: `${dec(pr.th, 4)}°`,
  wrong: [`${dec(deg(Math.acos(pr.B / pr.A)), 3)}°`, `${dec(deg(Math.acos(-0.8)), 4)}°`, '90°'],
  scheme: [[`(A + B)·B = 0 gives AB cos θ + B² = 0, so cos θ = −6/10 and θ = ${dec(pr.th, 4)}° (@K)`, 1]],
  sol: `The resultant R = A + B is perpendicular to B when R·B = 0, that is AB cos θ + B² = 0. Hence cos θ = −B/A = −0.6 and θ = ${dec(pr.th, 4)}°. The angle is obtuse because the larger force must pull back against the 6 N force; at 90° the resultant would lean towards the 10 N force.`,
  d: 5, c: 'analysis', t: [3, 5],
}), () => {
  let best = 0;
  let bd = 1e9;
  for (let th = 0; th <= 180; th += 0.001) {
    const rr = Vec.add([pr.A, 0], Vec.polar(pr.B, th));
    const b = Vec.polar(pr.B, th);
    const d = Math.abs(Vec.dot(rr, b));
    if (d < bd) {
      bd = d;
      best = th;
    }
  }
  return near(best, pr.th, 1e-4) || 'perpres';
});

// ================================================================ t04 resolution and rectangular components
const fx = { F: 40, th: 60 };
fx.x = fx.F * Math.cos(rad(fx.th));
add('fx-mcq', mcq({
  stem: 'A force of 40 N acts at 60° to the x-axis. Its component along the x-axis is',
  right: `${Math.round(fx.x)} N`,
  wrong: [`${dec(fx.F * Math.sin(rad(fx.th)), 3)} N`, '40 N', '80 N'],
  scheme: [[`Fx = 40 cos 60° = ${Math.round(fx.x)} N (@K)`, 1]],
  sol: `Fx = F cos θ = 40 × 0.5 = ${Math.round(fx.x)} N. The value ${dec(fx.F * Math.sin(rad(fx.th)), 3)} N is F sin θ, the component along y.`,
  d: 1, c: 'application', t: [4],
}), () => near(Vec.polar(fx.F, fx.th)[0], 20, 1e-9) || 'fx');
const m2 = { x: 12, y: -5 };
m2.m = Math.hypot(m2.x, m2.y);
m2.a = deg(Math.atan(-m2.y / m2.x));
add('mag2-mcq', mcq({
  stem: 'A force has components Fx = 12 N and Fy = −5 N along the x- and y-axes. The magnitude and direction of the force are',
  right: `${m2.m} N, ${dec(m2.a, 3)}° below the +x axis`,
  wrong: [`${m2.m} N, ${dec(m2.a, 3)}° above the +x axis`, `${m2.x - m2.y} N, ${dec(m2.a, 3)}° below the +x axis`, `${m2.m} N, ${dec(90 - m2.a, 3)}° below the +x axis`],
  scheme: [[`F = √(144 + 25) = ${m2.m} N; tan φ = −5/12, φ = −${dec(m2.a, 3)}° (@K)`, 1]],
  sol: `F = √(12² + 5²) = ${m2.m} N. Since Fy is negative and Fx positive, the force points into the fourth quadrant at tan⁻¹(5/12) = ${dec(m2.a, 3)}° below +x.`,
  d: 2, c: 'application', t: [4],
}), () => near(Vec.ang([m2.x, m2.y]), -m2.a, 1e-9) && near(Vec.mag([m2.x, m2.y]), 13, 1e-12) || 'mag2');
add('sincos-mcq', mcq({
  stem: 'A vector A makes an angle θ with the y-axis. Its component along the x-axis is',
  right: 'A sin θ',
  wrong: ['A cos θ', 'A tan θ', 'A / sin θ'],
  sol: 'The angle is measured from the y-axis, so the component along y is A cos θ and the component along x is the side opposite the angle, A sin θ. Using A cos θ for x is the usual slip when the angle is from the other axis.',
  d: 3, c: 'understanding', t: [4],
}));
const cs = { x: 7, y: 24 };
cs.R = Math.hypot(cs.x, cs.y);
cs.a = deg(Math.atan2(cs.y, cs.x));
add('compsum-mcq', mcq({
  stem: 'Two forces act on a point: 7 N along +x and 24 N along +y. Their resultant is',
  right: `${cs.R} N at ${dec(cs.a, 3)}° to the x-axis`,
  wrong: [`${cs.x + cs.y} N at ${dec(cs.a, 3)}° to the x-axis`, `${cs.R} N at ${dec(90 - cs.a, 3)}° to the x-axis`, `${cs.y - cs.x} N at 45° to the x-axis`],
  scheme: [[`R = √(7² + 24²) = ${cs.R} N; tan φ = 24/7, φ = ${dec(cs.a, 3)}° (@K)`, 1]],
  sol: `The forces are perpendicular, so R = √(49 + 576) = ${cs.R} N and tan φ = ΣY/ΣX = 24/7, giving φ = ${dec(cs.a, 3)}° from the x-axis.`,
  d: 2, c: 'application', t: [3, 4],
}), () => near(Vec.mag([cs.x, cs.y]), 25, 1e-12) && near(Vec.ang([cs.x, cs.y]), cs.a, 1e-12) && near(cs.a, 73.74, 1e-3) || 'compsum');

const dz = { A: [2, 3, 6] };
dz.m = Vec.mag(dz.A);
add('dir3d-mcq', mcq({
  stem: 'A vector 2î + 3ĵ + 6k̂ makes an angle γ with the z-axis. The value of cos γ is',
  right: `${dz.A[2]}/${dz.m}`,
  wrong: [`${dz.A[0]}/${dz.m}`, `${dz.A[1]}/${dz.m}`, `${dz.m}/${dz.A[2]}`],
  scheme: [[`|A| = √49 = ${dz.m}; cos γ = A_z/|A| = ${dz.A[2]}/${dz.m} (@K)`, 1]],
  sol: `The direction cosine with the z-axis is the z component divided by the magnitude: 6/√(4 + 9 + 36) = 6/${dz.m}. The values 2/7 and 3/7 belong to the x- and y-axes.`,
  d: 2, c: 'application', t: [4],
}), () => near(Math.cos(rad(angleByCross(dz.A, [0, 0, 1]))), 6 / 7, 1e-12) || 'dir3d');

// ================================================================ t05 dot and cross products
const dv ={ A: [2, 3, -1], B: [1, -1, 4] };
dv.d = Vec.dot(dv.A, dv.B);
add('dotval-mcq', mcq({
  stem: 'For A = 2î + 3ĵ − k̂ and B = î − ĵ + 4k̂, the scalar product A·B is',
  right: mn(dv.d),
  wrong: [`${-dv.d}`, '−9', '0'],
  scheme: [[`A·B = (2)(1) + (3)(−1) + (−1)(4) = ${mn(dv.d)} (@K)`, 1]],
  sol: `A·B = AₓBₓ + A_yB_y + A_zB_z = 2 − 3 − 4 = ${mn(dv.d)}. It is a scalar, so there is no direction to state.`,
  d: 2, c: 'application', t: [5],
}), () => dv.d === -5 && near(Vec.mag(dv.A) * Vec.mag(dv.B) * Math.cos(rad(angleByCross(dv.A, dv.B))), dv.d, 1e-9) || 'dotval');
const pp = { A: (p) => [2, p, 1], B: [1, -4, 2] };
const perpP = (p) => Vec.dot(pp.A(p), pp.B);
add('perp-mcq', mcq({
  stem: 'The vectors 2î + pĵ + k̂ and î − 4ĵ + 2k̂ are perpendicular. The value of p is',
  right: '1',
  wrong: ['0', '2', '−1'],
  scheme: [['2 − 4p + 2 = 0, so p = 1 (@K)', 1]],
  sol: 'Perpendicular vectors have a zero dot product: (2)(1) + (p)(−4) + (1)(2) = 4 − 4p = 0, so p = 1.',
  d: 3, c: 'application', t: [5],
}), () => perpP(1) === 0 && perpP(0) !== 0 && perpP(2) !== 0 && perpP(-1) !== 0 || 'perp');
add('crossunit-mcq', mcq({
  stem: 'In a right-handed system of axes, k̂ × î equals',
  right: 'ĵ',
  wrong: ['−ĵ', 'k̂', '0'],
  sol: 'The cyclic order î → ĵ → k̂ → î gives î × ĵ = k̂, ĵ × k̂ = î and k̂ × î = ĵ. Reversing the order would give −ĵ.',
  d: 2, c: 'recall', t: [5],
}), () => Vec.cross3([0, 0, 1], [1, 0, 0]).join() === '0,1,0' || 'crossunit');
add('crosszero-mcq', mcq({
  stem: 'The vector product of two non-zero vectors A and B is the null vector only when',
  right: 'A and B are parallel or antiparallel',
  wrong: ['A and B are perpendicular', 'A and B have equal magnitudes', 'A and B are drawn from the same point'],
  sol: '|A × B| = AB sin θ is zero for non-zero vectors only if sin θ = 0, that is θ = 0° or 180°. For perpendicular vectors the cross product is largest.',
  d: 2, c: 'understanding', t: [5],
}));
add('dotzero-mcq', mcq({
  stem: 'For two non-zero vectors, A·B = 0 means that',
  right: 'A and B are perpendicular to each other',
  wrong: ['A and B are parallel to each other', 'A and B have equal magnitudes', 'one of the vectors is a unit vector'],
  sol: 'A·B = AB cos θ is zero with A and B non-zero only if cos θ = 0, that is θ = 90°.',
  d: 1, c: 'understanding', t: [5],
}));

// ================================================================ assertion-reason (keys a, b, c, d, a, c)
add('null-ar', ar({
  a: 'A bus that returns to its starting stand after a round trip has a null displacement vector.',
  r: 'Displacement is the vector from the initial position to the final position, so it is zero when the two positions coincide.',
  key: 'a',
  sol: 'A is true: the start and end positions are the same. R is true and gives exactly the reason, so R explains A.',
  d: 1, c: 'understanding', t: [1],
}));
add('current-ar', ar({
  a: 'Electric current is a scalar quantity although it is shown by an arrow in a circuit diagram.',
  r: 'The ampere, the SI unit of electric current, is one of the seven base units.',
  key: 'b',
  sol: 'A is true: currents add arithmetically and do not obey the parallelogram law. R is also true, but being a base unit says nothing about whether a quantity is a scalar or a vector, so R does not explain A.',
  d: 2, c: 'understanding', t: [1],
}));
const ls = { a: 5, b: 6 };
add('less-ar', ar({
  a: 'The magnitude of the sum of two vectors can be smaller than the magnitude of either vector.',
  r: 'Vectors are added by adding their magnitudes arithmetically.',
  key: 'c',
  sol: `A is true: for antiparallel vectors of magnitudes ${ls.a} and ${ls.b} the sum has magnitude ${ls.b - ls.a}, smaller than both. R is false: magnitudes add arithmetically only for vectors in the same direction. So A is true and R is false.`,
  d: 2, c: 'analysis', t: [3],
}), () => Vec.mag(Vec.add([ls.a, 0], [-ls.b, 0])) < Math.min(ls.a, ls.b) || 'less');
const ft = { a: 5, b: 7 };
add('fifteen-ar', ar({
  a: 'Two vectors of magnitudes 5 and 7 can have a resultant of magnitude 15.',
  r: 'The magnitude of the resultant of two vectors is never greater than the sum of their magnitudes.',
  key: 'd',
  sol: `A is false: the largest possible resultant is ${ft.a} + ${ft.b} = ${ft.a + ft.b}, for parallel vectors. R is true and is the reason A fails. So A is false and R is true.`,
  d: 3, c: 'analysis', t: [3],
}), () => {
  let hi = 0;
  for (let th = 0; th <= 180; th += 0.25) hi = Math.max(hi, Vec.mag(Vec.add([ft.a, 0], Vec.polar(ft.b, th))));
  return (near(hi, 12, 1e-9) && hi < 15) || 'fifteen';
});
add('cross-ar', ar({
  a: 'The vector product of two vectors is not commutative.',
  r: 'Interchanging A and B reverses the direction of A × B, that is, B × A = −(A × B).',
  key: 'a',
  sol: 'A is true. R states what happens when the order is interchanged, B × A = −(A × B), which is exactly why the product is not commutative. So R explains A.',
  d: 2, c: 'understanding', t: [5],
}), () => Vec.cross3([1, 2, 3], [4, 5, 6]).join() === Vec.scale(Vec.cross3([4, 5, 6], [1, 2, 3]), -1).join() || 'cross-ar');
add('work-ar', ar({
  a: 'A force acting at right angles to the displacement of a body does no work on it.',
  r: 'Work is the vector product of force and displacement.',
  key: 'c',
  sol: 'A is true: W = F s cos 90° = 0. R is false: work is the scalar (dot) product F·s, not a vector product. So A is true and R is false.',
  d: 2, c: 'understanding', t: [5],
}), () => near(Vec.dot([0, 9], [4, 0]), 0, 1e-12) || 'work-ar');

// ================================================================ true-false and fill-blank
add('unitmag-tf', tf({
  stem: 'A unit vector drawn along a force of 20 N has a magnitude of 20 N.',
  key: 'f',
  sol: 'False. A unit vector has magnitude 1 and no unit; it only shows the direction. The force is 20 N times that unit vector.',
  d: 1, c: 'recall', t: [2],
}), () => near(Vec.mag(Vec.unit([12, -16])), 1, 1e-12) && near(Vec.mag(Vec.scale(Vec.unit([12, -16]), 20)), 20, 1e-12) || 'unitmag');
add('coplanar2-tf', tf({
  stem: 'Any two vectors, together with their resultant, lie in one plane.',
  key: 't',
  sol: 'True. The two vectors drawn from a point define a plane, and their sum is the diagonal of the parallelogram in that plane.',
  d: 2, c: 'understanding', t: [1],
}));
add('null-fill', fill({
  stem: 'The sum of a vector and its negative is the ___ vector.',
  acc: [['null', 'zero']],
  sol: 'A + (−A) = 0, the **null** (zero) vector: zero magnitude and no definite direction.',
  d: 1, c: 'recall', t: [1],
}));
add('ijk-fill', fill({
  stem: 'In a right-handed system of axes, î × ĵ = ___ (name the unit vector).',
  acc: [['k̂', 'k', 'k hat', 'k-hat']],
  sol: 'î × ĵ = **k̂**, along the +z axis by the right-hand screw rule; ĵ × î = −k̂.',
  d: 1, c: 'recall', t: [5],
}));

// ================================================================ numericals
const dn = { from: [2, -1], to: [7, 11] };
dn.d = Vec.sub(dn.to, dn.from);
dn.m = Vec.mag(dn.d);
add('disp-num', num({
  stem: 'A survey drone moves from the point (2, −1) m to the point (7, 11) m in a horizontal plane. Find the magnitude of its displacement, in m.',
  value: dn.m, tol: 0.05, unit: 'm',
  sol: r`$\Delta\vec{r} = (7 - 2)\hat{\imath} + (11 + 1)\hat{\jmath} = 5\hat{\imath} + 12\hat{\jmath}$; $|\Delta\vec{r}| = \sqrt{25 + 144} = ${dn.m}$ m.`,
  scheme: [[`Δr = (${dn.d[0]}, ${dn.d[1]}) m; magnitude = √169 = ${dn.m} m`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(Math.hypot(7 - 2, 11 - -1), q.answer.value, 1e-9) && dn.m === 13 || 'disp-num');
const un = { v: [2, -6, 9] };
un.m = Vec.mag(un.v);
un.k = un.v[2] / un.m;
add('unitk-num', num({
  stem: 'Find the k̂ component of the unit vector in the direction of 2î − 6ĵ + 9k̂. Give the value to 3 decimal places.',
  value: un.k, tol: 0.005, unit: null,
  sol: r`$|\vec{A}| = \sqrt{4 + 36 + 81} = ${un.m}$; the $\hat{k}$ component of $\hat{A}$ is $9/${un.m} = ${dec(un.k, 3)}$.`,
  scheme: [[`|A| = √121 = ${un.m}; k̂ component = 9/${un.m} = ${dec(un.k, 3)}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(Vec.unit(un.v)[2], q.answer.value, 1e-9) && un.m === 11 || 'unitk-num');
const r2 = { a: 12, b: 15, th: 60 };
r2.R = Math.sqrt(r2.a * r2.a + r2.b * r2.b + 2 * r2.a * r2.b * Math.cos(rad(r2.th)));
add('rtwo-num', num({
  stem: 'Two ropes pull a stalled tempo with forces of 12 N and 15 N, the angle between the ropes being 60°. Find the magnitude of the resultant force, in N.',
  value: r2.R, tol: 0.1, unit: 'N', marks: 2,
  sol: r`$R = \sqrt{12^2 + 15^2 + 2(12)(15)\cos 60^\circ} = \sqrt{144 + 225 + 180} = \sqrt{${r2.a * r2.a + r2.b * r2.b + r2.a * r2.b}} = ${dec(r2.R, 4)}$ N.`,
  scheme: [['R² = 144 + 225 + 2(12)(15)(0.5) = 549', 1], [`R = ${dec(r2.R, 4)} N`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(sumPolar([[r2.a, 0], [r2.b, r2.th]]).R, q.answer.value, 1e-9) || 'rtwo');
const r3 = { a: 9, b: 6, th: 120 };
r3.R = Math.sqrt(r3.a * r3.a + r3.b * r3.b + 2 * r3.a * r3.b * Math.cos(rad(r3.th)));
add('r120-num', num({
  stem: 'Forces of 9 N and 6 N act at a point with an angle of 120° between them. Find the magnitude of the resultant, in N.',
  value: r3.R, tol: 0.05, unit: 'N',
  sol: r`$R^2 = 81 + 36 + 2(9)(6)\cos 120^\circ = 117 - 54 = 63$, so $R = ${dec(r3.R, 3)}$ N.`,
  scheme: [[`R² = 81 + 36 − 54 = 63; R = ${dec(r3.R, 3)} N`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(sumPolar([[r3.a, 0], [r3.b, r3.th]]).R, q.answer.value, 1e-9) && near(r3.R ** 2, 63, 1e-9) || 'r120');
const s3 = { A: [4, 7, -2], B: [1, 3, 4] };
s3.D = Vec.sub(s3.A, s3.B);
s3.m = Vec.mag(s3.D);
add('sub3d-num', num({
  stem: 'If A = 4î + 7ĵ − 2k̂ and B = î + 3ĵ + 4k̂, find the magnitude of A − B.',
  value: s3.m, tol: 0.05, unit: null, marks: 2,
  sol: r`$\vec{A} - \vec{B} = 3\hat{\imath} + 4\hat{\jmath} - 6\hat{k}$; $|\vec{A} - \vec{B}| = \sqrt{9 + 16 + 36} = \sqrt{61} = ${dec(s3.m, 3)}$.`,
  scheme: [[`A − B = 3î + 4ĵ − 6k̂ (subtract component by component)`, 1], [`|A − B| = √61 = ${dec(s3.m, 3)}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(Math.sqrt((4 - 1) ** 2 + (7 - 3) ** 2 + (-2 - 4) ** 2), q.answer.value, 1e-9) && s3.D.join() === '3,4,-6' || 'sub3d');
const fxn = { F: 60, th: 35 };
fxn.x = fxn.F * Math.cos(rad(fxn.th));
add('fx-num', num({
  stem: 'A porter pulls a luggage trolley with a rope that exerts a force of 60 N at 35° above the horizontal. Find the horizontal component of the force, in N.',
  value: fxn.x, tol: 0.1, unit: 'N',
  sol: r`$F_x = F\cos\theta = 60\cos 35^\circ = 60 \times ${dec(Math.cos(rad(fxn.th)), 4)} = ${dec(fxn.x, 3)}$ N.`,
  scheme: [[`Fx = 60 cos 35° = ${dec(fxn.x, 3)} N`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => near(Vec.polar(fxn.F, fxn.th)[0], q.answer.value, 1e-9) && near(Math.sqrt(fxn.F ** 2 - (fxn.F * Math.sin(rad(fxn.th))) ** 2), q.answer.value, 1e-9) || 'fx-num');
const rn = { X: [18, 0], Y: [0, 24], N: [-10, 0] };
rn.sx = rn.X[0] + rn.N[0];
rn.sy = rn.Y[1];
rn.R = Math.hypot(rn.sx, rn.sy);
add('resnum-num', num({
  stem: 'Three forces act at a point: 18 N along +x, 24 N along +y and 10 N along −x. Find the magnitude of the resultant, in N.',
  value: rn.R, tol: 0.1, unit: 'N',
  sol: r`$\Sigma X = 18 - 10 = ${rn.sx}$ N and $\Sigma Y = 24$ N, so $R = \sqrt{${rn.sx}^2 + 24^2} = \sqrt{${rn.sx ** 2 + 576}} = ${dec(rn.R, 4)}$ N.`,
  scheme: [[`ΣX = 8 N, ΣY = 24 N; R = √640 = ${dec(rn.R, 4)} N`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(Vec.mag(Vec.add(Vec.add(rn.X, rn.Y), rn.N)), q.answer.value, 1e-9) || 'resnum');
const th3 = { f: [[10, 0], [15, 120], [8, 240]] };
th3.s = sumPolar(th3.f);
th3.fold = foldPolar(th3.f);
add('three-num', num({
  stem: 'Three tractors pull a log with forces of 10 N, 15 N and 8 N whose lines of action make angles of 0°, 120° and 240° with the +x direction. Find the magnitude of the resultant force, in N.',
  value: th3.s.R, tol: 0.05, unit: 'N', marks: 3,
  sol: r`$\Sigma X = 10 + 15\cos 120^\circ + 8\cos 240^\circ = 10 - 7.5 - 4 = ${dec(th3.s.x, 3)}$ N; $\Sigma Y = 15\sin 120^\circ + 8\sin 240^\circ = ${dec(th3.s.y, 4)}$ N; $R = \sqrt{${dec(th3.s.x ** 2, 3)} + ${dec(th3.s.y ** 2, 4)}} = ${dec(th3.s.R, 4)}$ N.`,
  scheme: [[`ΣX = 10 − 7.5 − 4 = ${mn(dec(th3.s.x, 3))} N`, 1], [`ΣY = ${dec(15 * Math.sin(rad(120)), 4)} − ${dec(-8 * Math.sin(rad(240)), 4)} = ${dec(th3.s.y, 4)} N`, 1], [`R = √(ΣX² + ΣY²) = ${dec(th3.s.R, 4)} N`, 1]],
  d: 4, c: 'application', t: [4],
}), (q) => near(th3.fold.R, q.answer.value, 1e-9) && near(th3.s.R, th3.fold.R, 1e-9) || 'three');
const pw = { F: [7, 3], v: [2, 5] };
pw.P = Vec.dot(pw.F, pw.v);
add('power-num', num({
  stem: 'A force F = 7î + 3ĵ newton acts on a cart moving with velocity v = 2î + 5ĵ m s⁻¹. Find the power delivered, P = F·v, in W.',
  value: pw.P, tol: 0.05, unit: 'W',
  sol: r`$P = \vec{F}\cdot\vec{v} = (7)(2) + (3)(5) = 14 + 15 = ${pw.P}$ W.`,
  scheme: [[`P = 14 + 15 = ${pw.P} W`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(Vec.mag(pw.F) * Vec.mag(pw.v) * Math.cos(rad(angleBetween(pw.F, pw.v))), q.answer.value, 1e-9) && pw.P === 29 || 'power');
const an = { A: [2, 2, -1], B: [6, 3, 2] };
an.ang = angleBetween(an.A, an.B);
add('angle-num', num({
  stem: 'Find the angle, in degrees, between the vectors A = 2î + 2ĵ − k̂ and B = 6î + 3ĵ + 2k̂.',
  value: an.ang, tol: 0.1, unit: 'degree', marks: 2,
  sol: r`$\vec{A}\cdot\vec{B} = 12 + 6 - 2 = ${Vec.dot(an.A, an.B)}$; $A = 3$, $B = 7$; $\cos\theta = \dfrac{${Vec.dot(an.A, an.B)}}{21} = ${dec(Vec.dot(an.A, an.B) / 21, 4)}$, so $\theta = ${dec(an.ang, 5)}$ degrees.`,
  scheme: [[`A·B = 12 + 6 − 2 = ${Vec.dot(an.A, an.B)}; A = 3, B = 7`, 1], [`cos θ = ${Vec.dot(an.A, an.B)}/21, θ = ${dec(an.ang, 4)}°`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => near(angleByCross(an.A, an.B), q.answer.value, 1e-9) && Vec.mag(an.A) === 3 && Vec.mag(an.B) === 7 || 'angle');
const ar2 = { A: [2, 3, 1], B: [1, -2, 4] };
ar2.C = Vec.cross3(ar2.A, ar2.B);
ar2.tri = 0.5 * Vec.mag(ar2.C);
add('area-num', num({
  stem: 'Two sides of a triangular plot are given by the vectors A = 2î + 3ĵ + k̂ and B = î − 2ĵ + 4k̂ (in m). Find the area of the plot, ½|A × B|, in m².',
  value: ar2.tri, tol: 0.05, unit: 'm²', marks: 2,
  sol: r`$\vec{A}\times\vec{B} = (12 + 2)\hat{\imath} + (1 - 8)\hat{\jmath} + (-4 - 3)\hat{k} = ${ar2.C[0]}\hat{\imath} - 7\hat{\jmath} - 7\hat{k}$; magnitude $\sqrt{196 + 49 + 49} = \sqrt{294} = ${dec(Vec.mag(ar2.C), 4)}$; area $= \tfrac{1}{2}\times ${dec(Vec.mag(ar2.C), 4)} = ${dec(ar2.tri, 4)}$ m².`,
  scheme: [[`A × B = 14î − 7ĵ − 7k̂, |A × B| = √294 = ${dec(Vec.mag(ar2.C), 4)}`, 1], [`Area = ½|A × B| = ${dec(ar2.tri, 4)} m²`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => {
  const a = Vec.mag(ar2.A);
  const b = Vec.mag(ar2.B);
  const c = Vec.mag(Vec.sub(ar2.A, ar2.B));
  const s = (a + b + c) / 2;
  return near(Math.sqrt(s * (s - a) * (s - b) * (s - c)), q.answer.value, 1e-9) || 'area';
});
const tq = { r: [0.5, 0.2], F: [30, -20] };
tq.t = Vec.cross2(tq.r, tq.F);
add('torque-num', num({
  stem: 'A force F = (30î − 20ĵ) N acts at the point with position vector r = (0.5î + 0.2ĵ) m from a pivot. Find the magnitude of the torque r × F about the pivot, in N m.',
  value: Math.abs(tq.t), tol: 0.05, unit: 'N m', marks: 3,
  sol: r`$\vec{r}\times\vec{F} = (r_xF_y - r_yF_x)\hat{k} = ((0.5)(-20) - (0.2)(30))\hat{k} = (-10 - 6)\hat{k} = ${tq.t}\hat{k}$ N m; magnitude ${Math.abs(tq.t)} N m, along $-z$.`,
  scheme: [['Both vectors lie in the xy-plane, so the torque is along z', 1], [`τ_z = (0.5)(−20) − (0.2)(30) = −10 − 6 = ${mn(tq.t)} N m`, 1], [`Magnitude = ${Math.abs(tq.t)} N m, along −z (clockwise)`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => {
  const th = deg(Math.atan2(tq.F[1], tq.F[0]) - Math.atan2(tq.r[1], tq.r[0]));
  return near(Vec.mag(tq.r) * Vec.mag(tq.F) * Math.abs(Math.sin(rad(th))), q.answer.value, 1e-9) && tq.t === -16 || 'torque';
});

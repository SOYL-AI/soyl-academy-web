// ch03 Motion in a Plane — question bank, part 1: t01 (scalars, vectors, addition, subtraction, resolution, change of velocity)
// and t02 (scalar and vector products). Every numerical is computed here and re-solved by an independent `check`; solutions and
// schemes print the computed values.
// AR keys across the chapter: a (equal vectors), d (dot product), c (top of path), b (circular motion), a (horizontal projection).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { rad, deg, Vec, resultant2 } from './phys.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const d3 = (x) => dec(x, 3);

// ================================================================ t01 scalars, vectors, addition, subtraction, resolution
add('scalarvec-mcq', mcq({
  stem: 'A weather bulletin for Chennai lists: temperature 31 °C, wind speed 18 km/h, wind blowing from the north-east at 18 km/h, rainfall 12 mm. Which entry is a vector?',
  right: 'wind blowing from the north-east at 18 km/h',
  wrong: ['temperature 31 °C', 'wind speed 18 km/h', 'rainfall 12 mm'],
  sol: 'A vector needs a direction as well as a magnitude. Only the wind with its direction (from the north-east) qualifies; the speed alone, the temperature and the rainfall depth are scalars — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('scalar-fill', fill({
  stem: 'The mass of a gas cylinder is given by a number and a unit only, with no direction; such a quantity is called a ___ quantity.',
  acc: [['scalar']],
  sol: 'A quantity with magnitude and unit but no direction is a **scalar**.',
  d: 1, c: 'recall', t: [1],
}));
add('sub-tf', tf({
  stem: 'For any two vectors A and B, the vector A − B is the same as the vector B − A.',
  key: 'f',
  sol: 'False. B − A = −(A − B): the two have equal magnitudes but opposite directions, so subtraction of vectors is not commutative.',
  d: 2, c: 'understanding', t: [1],
}));
const mm = { a: 7, b: 3 };
add('maxmin-mcq', mcq({
  stem: 'Two forces of 7 N and 3 N act together at a point. Which of the following cannot be the magnitude of their resultant?',
  right: '12 N',
  wrong: ['4 N', '6 N', '10 N'],
  sol: `The resultant lies between |${mm.a} − ${mm.b}| = ${mm.a - mm.b} N (opposite directions) and ${mm.a} + ${mm.b} = ${mm.a + mm.b} N (same direction). 4 N, 6 N and 10 N lie in this range; 12 N does not — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => mm.a + mm.b === 10 && mm.a - mm.b === 4 || 'mm');
add('tri-mcq', mcq({
  stem: 'Three coplanar forces can keep a body at rest (zero resultant) only if they can form the sides of a closed triangle. Which set of magnitudes can do this?',
  right: '4 N, 5 N, 8 N',
  wrong: ['2 N, 3 N, 8 N', '10 N, 3 N, 5 N', '1 N, 1 N, 3 N'],
  sol: 'The largest force must not exceed the sum of the other two. 8 ≤ 4 + 5 = 9 holds for 4 N, 5 N, 8 N; 8 > 5, 10 > 8 and 3 > 2 fail for the other sets — option (@K).',
  d: 3, c: 'application', t: [1],
}), () => 8 <= 9 && 8 > 5 && 10 > 8 && 3 > 2 || 'tri');
const rs1 = { A: 5.0, B: 8.0, th: 60 };
rs1.q = resultant2(rs1.A, rs1.B, rs1.th);
rs1.sq = rs1.A ** 2 + rs1.B ** 2 + 2 * rs1.A * rs1.B * Math.cos(rad(rs1.th));
add('res-num', num({
  stem: 'Two tugboats pull a barge in a Kochi harbour with forces of 5.0 kN and 8.0 kN. The angle between the two ropes is 60°. Find the magnitude of the resultant force, in kN (3 significant figures).',
  value: v3(rs1.q.R), tol: 0.05, unit: 'kN',
  sol: r`$R = \sqrt{A^2 + B^2 + 2AB\cos\theta} = \sqrt{${rs1.A ** 2} + ${rs1.B ** 2} + 2(${rs1.A})(${rs1.B})\cos 60^\circ} = \sqrt{${rs1.A ** 2} + ${rs1.B ** 2} + ${rs1.A * rs1.B}} = \sqrt{${rs1.sq}} = ${d3(rs1.q.R)}$ kN.`,
  scheme: [['Law of cosines: R² = A² + B² + 2AB cos θ', 1], [`R² = ${rs1.sq}, R = ${d3(rs1.q.R)} kN`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(Vec.mag(Vec.add([rs1.A, 0], Vec.polar(rs1.B, rs1.th))), q.answer.value, 0.005) || 'res');
const al = resultant2(8.0, 5.0, 60);
add('alpha-num', num({
  stem: 'For the two tugboat forces of 8.0 kN and 5.0 kN with 60° between the ropes, find the angle the resultant makes with the 8.0 kN rope, in degrees (3 significant figures).',
  value: v3(al.alpha), tol: 0.1, unit: '°',
  sol: r`$\tan\alpha = \dfrac{B\sin\theta}{A + B\cos\theta} = \dfrac{5.0\sin 60^\circ}{8.0 + 5.0\cos 60^\circ} = \dfrac{${d3(5 * Math.sin(rad(60)))}}{${8 + 5 * Math.cos(rad(60))}} = ${d3(Math.tan(rad(al.alpha)))}$, so $\alpha = ${d3(al.alpha)}$ degrees.`,
  scheme: [['tan α = B sin θ / (A + B cos θ) with A = 8.0, B = 5.0', 1], [`tan α = ${d3(Math.tan(rad(al.alpha)))}, α = ${d3(al.alpha)}°`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(Vec.ang(Vec.add([8, 0], Vec.polar(5, 60))), q.answer.value, 0.003) || 'alpha');
const pl = { F: 80, th: 30 };
pl.x = pl.F * Math.cos(rad(pl.th));
add('resolve-mcq', mcq({
  stem: 'A porter pulls a luggage trolley along a level platform with a rope that makes 30° with the ground and carries a tension of 80 N. The component of the pull along the ground is',
  right: `${d3(pl.x)} N`,
  wrong: ['40.0 N', '80.0 N', `${d3(pl.F * Math.tan(rad(pl.th)))} N`],
  sol: `The component along the ground is F cos θ = 80 cos 30° = ${d3(pl.x)} N. Using sin gives the vertical component 40.0 N, and 80 tan 30° is not a component of anything here — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(pl.x, 69.28, 0.001) || 'pl');
const rp = { F: 60, th: 40 };
rp.y = rp.F * Math.sin(rad(rp.th));
add('angle-mcq', mcq({
  stem: 'The components of a velocity are 9.0 m/s along +x and 12.0 m/s along −y. The velocity points',
  right: '53° below the +x axis',
  wrong: ['53° above the +x axis', '37° below the +x axis', '37° above the +x axis'],
  sol: `tan θ = 12/9, so θ = ${d3(deg(Math.atan2(12, 9)))}° measured from +x; the y-component is negative, so it lies below the axis — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => Math.round(deg(Math.atan2(-12, 9))) === -53 || 'angle');
const dm = { e: 2.4, n: 1.8 };
dm.v = Math.hypot(dm.e, dm.n);
add('unit-mcq', mcq({
  stem: 'The unit vector along the vector 3î − 4ĵ is',
  right: '0.6î − 0.8ĵ',
  wrong: ['3î − 4ĵ', '0.8î − 0.6ĵ', '0.6î + 0.8ĵ'],
  sol: 'The magnitude is √(9 + 16) = 5, and the unit vector is the vector divided by its magnitude: (3î − 4ĵ)/5 = 0.6î − 0.8ĵ — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => near(Vec.mag(Vec.scale([3, -4], 1 / 5)), 1, 1e-9) || 'unit');
const sb = { A: [5, 2], B: [2, -6] };
sb.d = Vec.sub(sb.A, sb.B);
sb.m = Vec.mag(sb.d);
add('sub-num', num({
  stem: 'Two vectors are A = 5î + 2ĵ and B = 2î − 6ĵ (SI units). Find the magnitude of A − B (3 significant figures).',
  value: v3(sb.m), tol: 0.02, unit: null,
  sol: r`$\vec{A} - \vec{B} = (5 - 2)\hat{i} + (2 - (-6))\hat{j} = ${sb.d[0]}\hat{i} + ${sb.d[1]}\hat{j}$, so $|\vec{A} - \vec{B}| = \sqrt{${sb.d[0] ** 2} + ${sb.d[1] ** 2}} = \sqrt{${sb.d[0] ** 2 + sb.d[1] ** 2}} = ${d3(sb.m)}$.`,
  scheme: [[`A − B = ${sb.d[0]}î + ${sb.d[1]}ĵ`, 1], [`|A − B| = ${d3(sb.m)}`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(Math.hypot(3, 8), q.answer.value, 0.003) && near(Math.hypot(5 - 2, 2 + 6), q.answer.value, 0.003) || 'sb');
add('equal-ar', ar({
  a: 'Two vectors of equal magnitude P, with an angle of 120° between them, have a resultant of magnitude P.',
  r: 'The magnitude of the resultant is √(P² + P² + 2P² cos θ), and cos 120° = −½.',
  key: 'a',
  sol: 'R = √(P² + P² + 2P² (−½)) = √(P²) = P. Both statements are true and R is exactly the working that gives A — option (a).',
  d: 2, c: 'application', t: [1],
}));
const rl = { v1: [24, 0], v2: [0, 7] };
rl.dv = Vec.sub(rl.v2, rl.v1);
rl.v = Vec.mag(rl.dv);
add('dv-num', num({
  stem: 'A hockey ball moving east at 24 m/s is deflected by a stick so that it moves north at 7.0 m/s. Find the magnitude of the change in its velocity, in m/s.',
  value: v3(rl.v), tol: 0.1, unit: 'm/s',
  sol: r`The change in velocity is $\Delta\vec{v} = \vec{v}_2 - \vec{v}_1 = \vec{v}_2 + (-\vec{v}_1)$: ${rl.v2[1]} m/s north together with ${rl.v1[0]} m/s west, two perpendicular parts. $|\Delta\vec{v}| = \sqrt{${rl.v1[0]}^2 + ${rl.v2[1]}^2} = ${d3(rl.v)}$ m/s.`,
  scheme: [['Δv = v₂ − v₁ = v₂ + (−v₁): 7.0 m/s north and 24 m/s west', 1], [`|Δv| = √(24² + 7²) = ${d3(rl.v)} m/s`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(Math.hypot(24, 7), q.answer.value, 1e-9) && q.answer.value === 25 || 'rl');
const rv = { A: [20, 0], B: [0, 15] };
rv.rel = Vec.sub(rv.A, rv.B);
add('vsub-mcq', mcq({
  stem: 'A surveyor’s displacement A is 20 m east and displacement B is 15 m north. The vector A − B has magnitude and direction',
  right: '25 m, 36.9° south of east',
  wrong: ['25 m, 36.9° north of east', '5 m, towards the east', '35 m, towards the south-east'],
  sol: `A − B = A + (−B) = (20, 0) + (0, −15) = (20, −15). Its magnitude is ${Vec.mag(rv.rel)} m and it points ${d3(-Vec.ang(rv.rel))}° south of east — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => Vec.mag(rv.rel) === 25 && near(Vec.ang(rv.rel), -36.87, 1e-3) || 'rv');
add('sv-short', short({
  marks: 2,
  stem: 'Distinguish between a scalar and a vector quantity, giving two examples of each from the motion of a cricket ball.',
  model: 'A **scalar** has magnitude and unit only (the distance it travels, its speed, its mass). A **vector** also has a direction and adds by the triangle law (its displacement from the bat, its velocity, the force of the bat on it). Speed is the magnitude of velocity; velocity needs a direction as well.',
  sol: 'Magnitude only vs magnitude and direction; two examples each.',
  scheme: [['Scalar: magnitude only; vector: magnitude and direction (triangle law)', 1], ['Two valid examples of each', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('comp-short', short({
  marks: 2,
  stem: 'What is meant by resolving a vector into rectangular components? Write the components of a vector of magnitude A inclined at an angle θ to the x-axis.',
  model: 'Resolving a vector means writing it as the sum of two perpendicular vectors along chosen axes. For a vector of magnitude A at angle θ to the x-axis the components are **A_x = A cos θ** along x and **A_y = A sin θ** along y, so A = A_x î + A_y ĵ.',
  sol: 'Sum of perpendicular parts; A cos θ and A sin θ.',
  scheme: [['Meaning: sum of two perpendicular vectors along the axes', 1], ['A_x = A cos θ, A_y = A sin θ', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('negscale-short', short({
  marks: 2,
  stem: 'A vector A is multiplied by the real number −3. State the magnitude and direction of the result, and say what the unit vector along A is.',
  model: 'The result −3A has magnitude **three times** that of A and points in the direction **opposite** to A, because the number is negative. The unit vector along A is **Â = A/A**: it has magnitude one, no unit, and the direction of A.',
  sol: '3A long, reversed; unit vector A/|A|.',
  scheme: [['|−3A| = 3A and direction reversed', 1], ['Unit vector = A divided by its magnitude', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('parallelogram-short3', short({
  marks: 3,
  stem: 'State the parallelogram law of vector addition. Using it, write the expression for the magnitude of the resultant of two vectors A and B inclined at an angle θ, and state when the resultant is largest and when it is smallest.',
  model: 'If two vectors are drawn from a point as adjacent sides of a parallelogram, the diagonal from that point gives their resultant. Its magnitude is **R = √(A² + B² + 2AB cos θ)**. R is largest, A + B, when θ = 0° (the vectors are parallel), and smallest, |A − B|, when θ = 180° (opposite).',
  sol: 'Law; R formula; limits.',
  scheme: [['Statement: diagonal of the parallelogram is the resultant', 1], ['R = √(A² + B² + 2AB cos θ)', 1], ['Largest A + B at 0°, smallest |A − B| at 180°', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const vl = { A: 24, B: 7 };
vl.R = Math.hypot(vl.A, vl.B);
vl.al = deg(Math.atan2(vl.B, vl.A));
add('vec-long', long({
  stem: '(a) State the triangle law of vector addition and write the formulas for the magnitude and direction of the resultant of two vectors A and B with an angle θ between them. (b) Two perpendicular forces of 24 N and 7 N act at a point. Find the magnitude of their resultant and its angle with the 24 N force. (c) Between what limits can the resultant of these two forces lie, if the angle between them could be changed?',
  model: r`(a) **Triangle law:** if two vectors are drawn head to tail, the third side from the tail of the first to the head of the second represents their sum. The resultant has magnitude $R = \sqrt{A^2 + B^2 + 2AB\cos\theta}$ and makes an angle $\alpha$ with $\vec{A}$ given by $\tan\alpha = \dfrac{B\sin\theta}{A + B\cos\theta}$.

(b) At $\theta = 90^\circ$: $R = \sqrt{${vl.A}^2 + ${vl.B}^2} = \sqrt{${vl.A ** 2 + vl.B ** 2}} = ${vl.R}$ N. $\tan\alpha = \dfrac{${vl.B}}{${vl.A}} = ${d3(vl.B / vl.A)}$, so $\alpha = ${d3(vl.al)}$ degrees from the 24 N force.

(c) The resultant is least, $${vl.A} - ${vl.B} = ${vl.A - vl.B}$ N, when the forces are opposite and greatest, $${vl.A} + ${vl.B} = ${vl.A + vl.B}$ N, when they act in the same direction.`,
  sol: 'Triangle law and formulas; 25 N at 16.3°; limits 17 N to 31 N.',
  scheme: [['Triangle law stated', 1], ['R and α formulas', 1], [`R = ${vl.R} N`, 1], [`α = ${d3(vl.al)}° from the 24 N force`, 1], [`Limits ${vl.A - vl.B} N and ${vl.A + vl.B} N`, 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => vl.R === 25 && near(vl.al, 16.26, 1e-3) && near(resultant2(24, 7, 90).R, 25, 1e-9) || 'vl');
// case: drone
const dr = { n: 120, e: 90 };
dr.disp = Math.hypot(dr.n, dr.e);
dr.path = dr.n + dr.e;
dr.dir = deg(Math.atan2(dr.e, dr.n));
add('drone-case', mk.case({
  passage: 'A survey drone leaves a warehouse in Indore, flies 120 m due north to a water tank and then turns and flies 90 m due east to a gate, before stopping. Take east as the positive x direction and north as the positive y direction.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The distance covered by the drone, and its displacement from the warehouse, are respectively',
      right: `${dr.path} m and ${dr.disp} m`,
      wrong: [`${dr.disp} m and ${dr.path} m`, `${dr.path} m and ${dr.path} m`, `${dr.disp} m and ${dr.disp} m`],
      sol: `Distance = 120 + 90 = ${dr.path} m (a scalar, the whole route). Displacement = √(120² + 90²) = ${dr.disp} m (a vector, straight from start to finish) — option (@K).`,
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Express the drone’s displacement as a vector in terms of î and ĵ and give its magnitude, in m.',
      value: dr.disp, tol: 0.5, unit: 'm',
      sol: r`$\vec{d} = (${dr.e}\hat{i} + ${dr.n}\hat{j})$ m. Magnitude $= \sqrt{${dr.e}^2 + ${dr.n}^2} = \sqrt{${dr.e ** 2 + dr.n ** 2}} = ${dr.disp}$ m.`,
      scheme: [[`d = ${dr.e}î + ${dr.n}ĵ, |d| = ${dr.disp} m`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the direction of the displacement, as an angle east of north.',
      model: r`The displacement has $\tan\phi = \dfrac{${dr.e}}{${dr.n}} = ${d3(dr.e / dr.n)}$, where $\phi$ is the angle from north towards east, so $\phi = ${d3(dr.dir)}^\circ$ **east of north**. It points from the warehouse straight towards the gate, not along either leg.`,
      sol: 'tan φ = 90/120; 36.9° east of north.',
      scheme: [[`tan φ = east part / north part = ${dr.e}/${dr.n}`, 1], [`φ = ${d3(dr.dir)}° east of north`, 1]],
      d: 3, c: 'application', t: [1], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A student says the drone’s displacement is 210 m, because that is how far it flew. Evaluate this statement.',
        model: r`The statement is **wrong**. Displacement is the straight-line vector from the start to the finish: $\sqrt{${dr.n}^2 + ${dr.e}^2} = ${dr.disp}$ m, in a direction ${d3(dr.dir)}° east of north. The 210 m is the **distance**, the length of the route; it is greater because the drone turned.`,
        sol: 'Displacement 150 m, distance 210 m.',
        scheme: [['Wrong: displacement ≠ distance travelled', 1], [`Displacement ${dr.disp} m; distance ${dr.path} m is larger because the path turns`, 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => dr.disp === 150 && near(dr.dir, 36.87, 1e-3) && near(q.children[1].answer.value, 150, 1e-9) || 'dr');

// ================================================================ t02 scalar and vector products
add('dotperp-mcq', mcq({
  stem: 'For which pair of vectors is the scalar product equal to zero?',
  right: '2î + 3ĵ and 3î − 2ĵ',
  wrong: ['2î + 3ĵ and 2î + 3ĵ', '2î + 3ĵ and −2î − 3ĵ', '2î + 3ĵ and 3î + 2ĵ'],
  sol: 'The dot product is the sum of products of matching components: (2)(3) + (3)(−2) = 0 for the first pair. The other pairs give 13, −13 and 12 — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => 2 * 3 + 3 * -2 === 0 && 13 === 4 + 9 && 6 + 6 === 12 || 'dotperp');
const dt = { A: [2, 3, -1], B: [1, -2, 4] };
dt.d = Vec.dot(dt.A, dt.B);
const an = { A: [3, 4], B: [5, 12] };
an.cos = Vec.dot(an.A, an.B) / (Vec.mag(an.A) * Vec.mag(an.B));
an.th = deg(Math.acos(an.cos));
add('angle-num', num({
  stem: 'Find the angle between the vectors A = 3î + 4ĵ and B = 5î + 12ĵ, in degrees (3 significant figures).',
  value: v3(an.th), tol: 0.1, unit: '°',
  sol: r`$\vec{A}\cdot\vec{B} = (3)(5) + (4)(12) = ${Vec.dot(an.A, an.B)}$, $A = ${Vec.mag(an.A)}$, $B = ${Vec.mag(an.B)}$. $\cos\theta = \dfrac{${Vec.dot(an.A, an.B)}}{${Vec.mag(an.A)} \times ${Vec.mag(an.B)}} = ${d3(an.cos)}$, so $\theta = ${d3(an.th)}$ degrees.`,
  scheme: [[`A·B = ${Vec.dot(an.A, an.B)}, A = 5, B = 13`, 1], [`cos θ = ${d3(an.cos)}`, 1], [`θ = ${d3(an.th)}°`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(Math.abs(Vec.ang(an.A) - Vec.ang(an.B)), q.answer.value, 0.005) || 'an');
const pj = { A: [6, 8], B: [3, -4] };
pj.c = Vec.dot(pj.A, pj.B) / Vec.mag(pj.B);
add('proj-num', num({
  stem: 'Find the component of A = 6î + 8ĵ along the direction of B = 3î − 4ĵ.',
  value: v3(pj.c), tol: 0.02, unit: null,
  sol: r`The component of $\vec{A}$ along $\vec{B}$ is $\vec{A}\cdot\hat{B} = \dfrac{\vec{A}\cdot\vec{B}}{B} = \dfrac{(6)(3) + (8)(-4)}{\sqrt{9 + 16}} = \dfrac{${Vec.dot(pj.A, pj.B)}}{5} = ${d3(pj.c)}$. The negative sign means A has a component opposite to B.`,
  scheme: [['Component = A·B / B', 1], [`(18 − 32)/5 = ${d3(pj.c)}`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(Vec.mag(pj.A) * Math.cos(rad(Vec.ang(pj.A) - Vec.ang(pj.B))), q.answer.value, 0.003) || 'pj');
const pl2 = { A: [4, 0, 2] };
const lam = 11;
add('perplambda-num', num({
  stem: 'The vectors A = 4î + λĵ + 2k̂ and B = 3î − 2ĵ + 5k̂ are perpendicular. Find the value of λ.',
  value: lam, tol: 0.05, unit: null,
  sol: r`Perpendicular vectors have $\vec{A}\cdot\vec{B} = 0$: $(4)(3) + (\lambda)(-2) + (2)(5) = 12 - 2\lambda + 10 = 0$, so $22 - 2\lambda = 0$ and $\lambda = ${lam}$.`,
  scheme: [['A·B = 0', 1], [`12 − 2λ + 10 = 0, λ = ${lam}`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => Vec.dot([4, q.answer.value, 2], [3, -2, 5]) === 0 || 'lam');
void pl2;
const cx = { A: [1, 2, 3], B: [2, -1, 1] };
cx.c = Vec.cross3(cx.A, cx.B);
cx.m = Vec.mag(cx.c);
add('cross-num', num({
  stem: 'Find the magnitude of the vector product of A = î + 2ĵ + 3k̂ and B = 2î − ĵ + k̂ (3 significant figures).',
  value: v3(cx.m), tol: 0.02, unit: null,
  sol: r`$\vec{A}\times\vec{B} = (A_yB_z - A_zB_y)\hat{i} + (A_zB_x - A_xB_z)\hat{j} + (A_xB_y - A_yB_x)\hat{k} = ${cx.c[0]}\hat{i} + ${cx.c[1]}\hat{j} - ${-cx.c[2]}\hat{k}$. Magnitude $= \sqrt{${cx.c[0] ** 2} + ${cx.c[1] ** 2} + ${cx.c[2] ** 2}} = \sqrt{${cx.c.reduce((s, x) => s + x * x, 0)}} = ${d3(cx.m)}$.`,
  scheme: [[`A × B = ${cx.c[0]}î + ${cx.c[1]}ĵ − ${-cx.c[2]}k̂`, 2], [`Magnitude = ${d3(cx.m)}`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => near(Math.sqrt(75), q.answer.value, 0.003) && cx.c.join() === '5,5,-5' || 'cx');
const ta = { P: [1, 1], Q: [5, 2], R: [3, 6] };
ta.u = Vec.sub(ta.Q, ta.P);
ta.w = Vec.sub(ta.R, ta.P);
ta.cr = Vec.cross2(ta.u, ta.w);
ta.area = Math.abs(ta.cr) / 2;
add('triarea-num', num({
  stem: 'A triangular plot has its corners at P(1 m, 1 m), Q(5 m, 2 m) and R(3 m, 6 m) on a field map. Use the vector product to find its area, in m².',
  value: ta.area, tol: 0.05, unit: 'm²',
  sol: r`$\vec{PQ} = (${ta.u[0]}\hat{i} + ${ta.u[1]}\hat{j})$ m and $\vec{PR} = (${ta.w[0]}\hat{i} + ${ta.w[1]}\hat{j})$ m. $|\vec{PQ}\times\vec{PR}| = |(${ta.u[0]})(${ta.w[1]}) - (${ta.u[1]})(${ta.w[0]})| = |${ta.u[0] * ta.w[1]} - ${ta.u[1] * ta.w[0]}| = ${ta.u[0] * ta.w[1] - ta.u[1] * ta.w[0]}$, and the area is half of this: $\tfrac{1}{2} \times ${ta.cr} = ${ta.area}$ m$^2$.`,
  scheme: [[`PQ = ${ta.u[0]}î + ${ta.u[1]}ĵ, PR = ${ta.w[0]}î + ${ta.w[1]}ĵ`, 1], [`|PQ × PR| = ${ta.cr}`, 1], [`Area = ½ × ${ta.cr} = ${ta.area} m²`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [2],
}), (q) => near(0.5 * Math.abs((5 - 1) * (6 - 1) - (3 - 1) * (2 - 1)), q.answer.value, 1e-9) && ta.area === 9 || 'ta');
add('crossdir-mcq', mcq({
  stem: 'Using the right-handed unit vectors î, ĵ and k̂ along x, y and z, the vector product k̂ × ĵ equals',
  right: '−î',
  wrong: ['î', 'ĵ', 'the null vector'],
  sol: 'In the cyclic order î → ĵ → k̂ → î the product is positive (ĵ × k̂ = î). Here the order is reversed (k̂ × ĵ), so the result is −î — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('crosscomm-tf', tf({
  stem: 'For two non-zero vectors that are not parallel, A × B and B × A are the same vector.',
  key: 'f',
  sol: 'False. The two have the same magnitude AB sin θ but opposite directions, since B × A = −(A × B): reversing the order reverses the right-hand rule direction.',
  d: 2, c: 'understanding', t: [2],
}));
add('dotzero-ar', ar({
  a: 'The scalar product of a vector with itself can be negative.',
  r: 'A·A equals the square of the magnitude of A.',
  key: 'd',
  sol: 'R is true: A·A = AB cos 0° with B = A gives A². A is false, because a square of a real magnitude is never negative — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('dotproj-short', short({
  marks: 2,
  stem: 'Explain the geometrical meaning of the scalar product A·B and say why it is zero when A and B are perpendicular.',
  model: 'A·B = AB cos θ is the magnitude of A multiplied by the **component of B along A** (or B times the component of A along B). For perpendicular vectors θ = 90°, so the component of one along the other is zero and the product is **zero**.',
  sol: 'A × projection of B on A; cos 90° = 0.',
  scheme: [['A·B = A × (component of B along A) = AB cos θ', 1], ['θ = 90°, cos θ = 0, so product zero', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('products-short3', short({
  marks: 3,
  stem: 'State three differences between the scalar product and the vector product of two vectors.',
  model: 'The scalar product A·B = AB cos θ is a **scalar**, while the vector product A × B = AB sin θ n̂ is a **vector** perpendicular to both. A·B is **commutative**; A × B changes sign when the order is reversed. A·B is **zero for perpendicular** vectors, while A × B is zero for **parallel** vectors.',
  sol: 'Scalar/vector; commutative/anticommutative; zero when perpendicular/parallel.',
  scheme: [['Scalar result against vector result', 1], ['Commutative against changes sign on reversal', 1], ['Zero when perpendicular against zero when parallel', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const pr = { A: [1, -2, 2], B: [2, 2, 1] };
pr.dot = Vec.dot(pr.A, pr.B);
pr.cr = Vec.cross3(pr.A, pr.B);
pr.m = Vec.mag(pr.cr);
add('products-long', long({
  stem: '(a) Define the scalar product and the vector product of two vectors and state the direction rule for the vector product. (b) For A = î − 2ĵ + 2k̂ and B = 2î + 2ĵ + k̂ find A·B, A × B and the angle between the vectors. (c) What is the area of the parallelogram having A and B as adjacent sides?',
  model: r`(a) The **scalar product** is $\vec{A}\cdot\vec{B} = AB\cos\theta$, a scalar. The **vector product** is $\vec{A}\times\vec{B} = AB\sin\theta\,\hat{n}$, where $\hat{n}$ is perpendicular to both vectors, in the sense given by the right-hand rule (fingers from $\vec{A}$ towards $\vec{B}$, thumb along $\hat{n}$).

(b) $\vec{A}\cdot\vec{B} = (1)(2) + (-2)(2) + (2)(1) = 2 - 4 + 2 = ${pr.dot}$. $\vec{A}\times\vec{B} = (-2 \cdot 1 - 2 \cdot 2)\hat{i} + (2 \cdot 2 - 1 \cdot 1)\hat{j} + (1 \cdot 2 - (-2)(2))\hat{k} = ${pr.cr[0]}\hat{i} + ${pr.cr[1]}\hat{j} + ${pr.cr[2]}\hat{k}$. A zero dot product means $\cos\theta = 0$: the angle is $90^\circ$.

(c) The area equals $|\vec{A}\times\vec{B}| = \sqrt{${pr.cr[0] ** 2} + ${pr.cr[1] ** 2} + ${pr.cr[2] ** 2}} = ${pr.m}$ square units (as expected: $AB = 3 \times 3 = 9$ when $\theta = 90^\circ$).`,
  sol: 'Definitions; A·B = 0, A × B = −6î + 3ĵ + 6k̂, 90°; area 9.',
  scheme: [['Both definitions and the right-hand rule', 1], [`A·B = ${pr.dot}, so θ = 90°`, 1], [`A × B = ${pr.cr[0]}î + ${pr.cr[1]}ĵ + ${pr.cr[2]}k̂`, 2], [`Area = |A × B| = ${pr.m}`, 1]],
  d: 4, c: 'application', t: [2], wl: null,
}), () => pr.dot === 0 && pr.m === 9 && pr.cr.join() === '-6,3,6' && Vec.mag(pr.A) * Vec.mag(pr.B) === 9 || 'pr');
const sp = { r: 0.3, F: 40, th: 60 };
sp.tau = sp.r * sp.F * Math.sin(rad(sp.th));
sp.tau90 = sp.r * sp.F;
add('spanner-case', mk.case({
  passage: 'A mechanic in a Chennai garage tightens a wheel nut with a spanner. The turning effect (torque) of a force F applied at a point whose position vector from the nut is r is defined as the vector product r × F. She pushes on the end of the spanner, 0.30 m from the nut, with a force of 40 N that makes an angle of 60° with the length of the spanner.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The torque r × F is directed',
      right: 'perpendicular to the plane containing r and F',
      wrong: ['along the spanner', 'along the force', 'opposite to the force'],
      sol: 'The vector product of two vectors is perpendicular to both of them, hence to the plane that contains them — option (@K).',
      d: 1, c: 'recall', t: [2],
    })),
    part('b', num({
      stem: 'Find the magnitude of the torque, in N m.',
      value: v3(sp.tau), tol: 0.05, unit: 'N m',
      sol: r`$|\vec{r}\times\vec{F}| = rF\sin\theta = 0.30 \times 40 \times \sin 60^\circ = ${sp.r * sp.F} \times ${d3(Math.sin(rad(60)))} = ${d3(sp.tau)}$ N m.`,
      scheme: [[`rF sin θ = ${sp.r * sp.F} × sin 60° = ${d3(sp.tau)} N m`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'What is the magnitude of the torque if she pushes at right angles to the spanner with the same 40 N force?',
      model: r`For $\theta = 90^\circ$, $\sin\theta = 1$ and the torque is greatest: $rF = 0.30 \times 40 = ${d3(sp.tau90)}$ N m, more than the ${d3(sp.tau)} N m above because the whole force now acts across the spanner.`,
      sol: 'rF = 12.0 N m.',
      scheme: [['sin 90° = 1, torque = rF', 1], [`= 0.30 × 40 = ${d3(sp.tau90)} N m`, 1]],
      d: 2, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A friend suggests that pushing along the length of the spanner, towards the nut, gives the largest torque. Evaluate this idea.',
        model: r`The idea is **wrong**. For a push along the spanner $\theta = 0^\circ$, so $\sin\theta = 0$ and $|\vec{r}\times\vec{F}| = 0$: the torque is zero. The torque is largest when the force is **perpendicular** to the spanner ($\sin 90^\circ = 1$), giving $${d3(sp.tau90)}$ N m here.`,
        sol: 'Parallel force: sin 0 = 0, torque zero.',
        scheme: [['Along the spanner: θ = 0, torque zero', 1], ['Largest at 90°, where sin θ = 1', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(sp.tau, 10.392, 1e-3) && sp.tau90 === 12 && near(Math.abs(Vec.cross2([0.3, 0], Vec.polar(40, 60))), q.children[1].answer.value, 0.005) || 'sp');

// ---------------------------------------------------------------- qualitative (understanding) items added in the competency rebalance
add('compind-mcq', mcq({
  stem: 'A force acts on a crate in a Nagpur godown. A worker describes it with x and y axes, and a second worker, with axes turned through 30° relative to the first, describes the same force. Which statement is correct?',
  right: 'The force is the same vector, but its components along the two sets of axes differ',
  wrong: ['The force itself is different, because its components are different', 'The components are the same, but the magnitude of the force differs', 'Both the force and its components are the same, since the crate has not moved'],
  sol: 'A vector is a physical quantity that does not depend on the axes chosen; only its components do, because they are projections on the chosen axes — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sumlimits-short', short({
  marks: 2,
  stem: 'Can the magnitude of the resultant of two vectors be smaller than the magnitude of either vector? Answer with an example and a reason, without calculation of angles.',
  model: 'Yes. When two vectors point in nearly opposite directions they partly cancel. For example, forces of 3 N and 5 N pulling in opposite directions give a resultant of 2 N, which is smaller than both. The resultant lies between |A − B| and A + B.',
  sol: 'Opposite directions give |A − B|, which can be smaller than both.',
  scheme: [['Yes: vectors can partly cancel when roughly opposite', 1], ['Valid example, and the limit |A − B| ≤ R ≤ A + B', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('dotsign-mcq', mcq({
  stem: 'The scalar product of two non-zero vectors A and B is found to be negative. What does this tell us about the angle between them?',
  right: 'It is greater than 90° and at most 180°',
  wrong: ['It is less than 90°', 'It is exactly 90°', 'It is exactly 0°'],
  sol: 'A·B = AB cos θ with A and B positive, so the sign is that of cos θ, which is negative only for θ between 90° and 180° — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));

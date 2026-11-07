// ch03 Motion in a Plane — two decks: Part 1 (t01–t02) vectors, their addition, subtraction, resolution and the scalar and
// vector products; Part 2 (t03–t04) motion in a plane, projectile motion and uniform circular motion.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, Vec, proj, projNumeric, resultant2, accelMag } from './phys.mjs';
import * as G from './svgs.mjs';

const d3 = (x) => dec(x, 3);
const d4 = (x) => dec(x, 4);

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { A: G.VADD_DATA.A, B: G.VADD_DATA.B, th: G.VADD_DATA.theta };
Object.assign(ex1, resultant2(ex1.A, ex1.B, ex1.th));
ex1.sub = Math.sqrt(ex1.A ** 2 + ex1.B ** 2 - 2 * ex1.A * ex1.B * Math.cos(rad(ex1.th)));
ex1.sq = ex1.A ** 2 + ex1.B ** 2 + 2 * ex1.A * ex1.B * Math.cos(rad(ex1.th));
ex1.cross = R6(2 * ex1.A * ex1.B * Math.cos(rad(ex1.th)));

const ex2 = { f: [[12, 0], [10, 120], [8, 240]] };
ex2.c = ex2.f.map(([m, a]) => Vec.polar(m, a));
ex2.sum = ex2.c.reduce((s, v) => Vec.add(s, v), [0, 0]);
ex2.R = Vec.mag(ex2.sum);
ex2.ang = Vec.ang(ex2.sum);

const ex3 = { F: [6, 2], d: [3, -4] };
ex3.W = Vec.dot(ex3.F, ex3.d);
ex3.cos = ex3.W / (Vec.mag(ex3.F) * Vec.mag(ex3.d));
ex3.th = deg(Math.acos(ex3.cos));

const ex4 = { A: [2, 3, 0], B: [4, -1, 0] };
ex4.cr = Vec.cross3(ex4.A, ex4.B);
ex4.mag = Vec.mag(ex4.cr);
ex4.dot = Vec.dot(ex4.A, ex4.B);
ex4.sin = ex4.mag / (Vec.mag(ex4.A) * Vec.mag(ex4.B));
ex4.th = deg(Math.asin(ex4.sin));
ex4.area = ex4.mag / 2;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex5 = { u: [3, 0], a: [1, 2], t: 4 };
ex5.pos = (t) => [ex5.u[0] * t + 0.5 * ex5.a[0] * t * t, ex5.u[1] * t + 0.5 * ex5.a[1] * t * t];
ex5.r = ex5.pos(ex5.t);
ex5.v = [ex5.u[0] + ex5.a[0] * ex5.t, ex5.u[1] + ex5.a[1] * ex5.t];
ex5.speed = Vec.mag(ex5.v);
ex5.dir = Vec.ang(ex5.v);
ex5.rmag = Vec.mag(ex5.r);


const ex7 = { u: G.HORIZ_DATA.u, T: G.HORIZ_DATA.T };
ex7.h = 0.5 * g * ex7.T ** 2;
ex7.R = ex7.u * ex7.T;
ex7.vy = g * ex7.T;
ex7.v = Math.hypot(ex7.u, ex7.vy);
ex7.ang = deg(Math.atan2(ex7.vy, ex7.u));

const ex8 = { u: G.PROJ_DATA.u, th: G.PROJ_DATA.theta };
Object.assign(ex8, proj(ex8.u, ex8.th));
ex8.T = R6(ex8.T);
ex8.tTop = R6(ex8.tTop);

const ex9 = { R: 90 };
ex9.u = Math.sqrt(ex9.R * g);
ex9.H = ex9.R / 4;
ex9.T = (2 * ex9.u * Math.sin(rad(45))) / g;

const ex10 = { r: 60, kmh: 54 };
ex10.v = ex10.kmh / 3.6;
ex10.a = ex10.v ** 2 / ex10.r;
ex10.w = ex10.v / ex10.r;
ex10.T = (2 * Math.PI * ex10.r) / ex10.v;

const ex11 = { R: 6.4e6, day: 86400 };
ex11.w = (2 * Math.PI) / ex11.day;
ex11.v = ex11.w * ex11.R;
ex11.a = ex11.w ** 2 * ex11.R;

export const EX = { ex1, ex2, ex3, ex4, ex5, ex7, ex8, ex9, ex10, ex11 };
export const NUMCHECK = {
  ex8: projNumeric(ex8.u, ex8.th),
  ex9: projNumeric(ex9.u, 45),
  ex7: projNumeric(ex7.u, 0, ex7.h),
  ex5a: accelMag((t) => ex5.pos(t), 2),
  ex10a: accelMag((t) => [ex10.r * Math.cos(ex10.w * t), ex10.r * Math.sin(ex10.w * t)], 3, 1e-2),
  ex11a: accelMag((t) => [ex11.R * Math.cos(ex11.w * t), ex11.R * Math.sin(ex11.w * t)], 1000, 10),
};

// ---------------------------------------------------------------- visuals
export const V = {
  vadd: svgV(G.VADD, 'Parallelogram and triangle laws of vector addition for two vectors of magnitudes 6 and 4 at 60 degrees', 'The diagonal of the parallelogram is the resultant; the triangle law gives the same arrow.'),
  vsub: svgV(G.VSUB, 'Subtraction of vectors drawn as addition of the reversed vector', 'A − B = A + (−B).'),
  scalev: svgV(G.SCALEV, 'A vector with its double, half and negative drawn from one point', 'Multiplying by a real number changes length and, for a negative number, reverses direction.'),
  resolve: svgV(G.RESOLVE, 'A vector of magnitude 10 resolved into components 8 and 6 along the axes, with unit vectors', 'A = A_x î + A_y ĵ.'),
  dotcross: svgV(G.DOTCROSS, 'Geometry of the dot product as a projection and of the cross product as a parallelogram area', 'A·B = A (B cos θ); |A × B| = area of the parallelogram.'),
  proj: svgV(G.PROJ, 'A projectile launched at 39.2 metres per second at 30 degrees drawn to scale with velocity components', 'Horizontal velocity constant; vertical velocity changes uniformly.'),
  horiz: svgV(G.HORIZ, 'A ball thrown horizontally from a cliff beside a dropped ball, one picture per second', 'Equal times, equal drops: the horizontal motion does not affect the fall.'),
  circ: svgV(G.CIRC, 'Uniform circular motion with tangent velocity vectors and centre-directed acceleration vectors', 'Velocity along the tangent, acceleration towards the centre.'),
  deltav: svgV(G.DELTAV, 'The change of velocity between two nearby points of a circular path', 'Δv points towards the centre when Δθ is small.'),
};

const ax = (label, min, max) => ({ label, min, max });
const cf = (x) => x.toFixed(6);
export const plotMotion = plot(
  {
    x: ax('x (m)', 0, 22),
    y: ax('y (m)', 0, 18),
    functions: [{ expr: `(sqrt(${ex5.u[0] ** 2}+${2 * ex5.a[0] * 0.5 * 2}*x)-${ex5.u[0]})^2`, label: 'path of the particle: x = 3t + 0.5t², y = t²', domain: [0, ex5.r[0]] }],
  },
  'Path in the x y plane of a particle that starts along the x-axis and accelerates in x and y: a curve bending upward that reaches x equal 20 metres and y equal 16 metres at 4 seconds',
  'The path is a curve, although each component moves with constant acceleration.',
);
// check the plot expression: t = sqrt(9 + 2x) − 3 (from x = 3t + 0.5t²), y = t²
export const plotHoriz = plot(
  {
    x: ax('horizontal distance x (m)', 0, 90),
    y: ax('height above the ground y (m)', 0, 85),
    functions: [{ expr: `${ex7.h} - ${cf(g / (2 * ex7.u ** 2))}*x^2`, label: 'y = 78.4 − (g / 2u²) x²', domain: [0, ex7.R] }],
  },
  'Path of a ball thrown horizontally at 20 metres per second from a height of 78.4 metres: half of a downward-opening parabola that reaches the ground 80 metres away',
  'Horizontal projection: half a parabola.',
);
const ANG = [15, 30, 45, 60, 75];
const U20 = 20;
export const plotAngles = plot(
  {
    x: ax('horizontal distance x (m)', 0, 44),
    y: ax('height y (m)', 0, 21),
    functions: ANG.map((th) => {
      const p = proj(U20, th);
      return { expr: `${cf(Math.tan(rad(th)))}*x - ${cf(g / (2 * U20 * U20 * Math.cos(rad(th)) ** 2))}*x^2`, label: `${th}°: R = ${d3(p.R)} m, H = ${d3(p.H)} m`, domain: [0, p.R] };
    }),
  },
  'Five trajectories of a ball thrown at 20 metres per second at 15, 30, 45, 60 and 75 degrees: the 45 degree path has the longest range, 40.8 metres, and the 15 and 75 degree paths have the same range, 20.4 metres',
  'Same speed 20 m s⁻¹; complementary angles give equal ranges.',
);
export const plotRange = plot(
  {
    x: ax('angle of projection θ (degrees)', 0, 90),
    y: ax('range R (m)', 0, 45),
    functions: [{ expr: `${cf((U20 * U20) / g)}*sin(2*x*pi/180)`, label: 'R = (u² / g) sin 2θ, u = 20 m/s', domain: [0, 90] }],
    vlines: [{ x: 45, label: 'θ = 45°: R = u²/g = 40.8 m', dashed: true }],
  },
  'Range against angle of projection for a speed of 20 metres per second: a symmetric hump about 45 degrees with a maximum of 40.8 metres',
  'The range curve is symmetric about 45°.',
);
export const plotCircA = plot(
  {
    x: ax('speed v (m/s)', 0, 10),
    y: ax('centripetal acceleration a (m/s²)', 0, 22),
    functions: [{ expr: 'x^2/5', label: 'a = v²/r for r = 5 m', domain: [0, 10] }],
  },
  'Centripetal acceleration against speed on a circle of radius 5 metres: a parabola, so doubling the speed makes the acceleration four times as large',
  'a ∝ v² at fixed radius.',
);
export const plotCircR = plot(
  {
    x: ax('radius r (m)', 0, 10),
    y: ax('centripetal acceleration a (m/s²)', 0, 17),
    functions: [{ expr: '16/x', label: 'a = v²/r for v = 4 m/s', domain: [1, 10] }],
  },
  'Centripetal acceleration against radius at a speed of 4 metres per second: a falling curve, so doubling the radius halves the acceleration',
  'a ∝ 1/r at fixed speed.',
);

// ---------------------------------------------------------------- tables
const T1 = table(
  ['Kind', 'Needs', 'Examples', 'Adds like'],
  [
    ['Scalar', 'Magnitude and unit only', 'Mass, time, speed, distance, temperature, energy', 'Ordinary numbers'],
    ['Vector', 'Magnitude, unit and direction', 'Displacement, velocity, acceleration, force', 'Triangle or parallelogram law'],
    ['Current, pressure', 'Magnitude and a sense, but do not obey the vector addition law', 'Treated as scalars', 'Ordinary numbers'],
  ],
  'Table comparing scalars and vectors with examples and how each is added',
);
const T2 = table(
  ['Operation', 'In components', 'Result'],
  [
    ['A + B', '(A_x + B_x) î + (A_y + B_y) ĵ', 'vector'],
    ['A − B', '(A_x − B_x) î + (A_y − B_y) ĵ', 'vector'],
    ['λ A', 'λ A_x î + λ A_y ĵ', 'vector'],
    ['Magnitude', '|A| = √(A_x² + A_y²)', 'scalar'],
    ['Direction', 'tan θ = A_y / A_x', 'angle from +x'],
    ['Unit vector', 'Â = A / |A|', 'magnitude 1, no unit'],
  ],
  'Table of vector operations in rectangular components',
);
const T3 = table(
  ['Property', 'Scalar product A·B', 'Vector product A × B'],
  [
    ['Result', 'Scalar', 'Vector'],
    ['Magnitude', 'A B cos θ', 'A B sin θ'],
    ['Direction', 'None', 'Perpendicular to both, right-hand rule'],
    ['Order', 'A·B = B·A', 'A × B = −(B × A)'],
    ['Zero when', 'θ = 90° (perpendicular)', 'θ = 0° or 180° (parallel)'],
    ['Geometry', 'A times the projection of B on A', 'Area of the parallelogram'],
    ['Unit vectors', 'î·î = 1, î·ĵ = 0', 'î × ĵ = k̂, î × î = 0'],
  ],
  'Table comparing the scalar product and the vector product',
);
const T4 = table(
  ['Product', 'î', 'ĵ', 'k̂'],
  [['î ×', '0', 'k̂', '−ĵ'], ['ĵ ×', '−k̂', '0', 'î'], ['k̂ ×', 'ĵ', '−î', '0']],
  'Table of the cross products of the unit vectors i, j and k: cyclic order gives plus, reverse order gives minus',
);
const T5 = table(
  ['Quantity', 'Horizontal (x)', 'Vertical (y)'],
  [
    ['Acceleration', '0', '−g'],
    ['Velocity at time t', 'u cos θ (constant)', 'u sin θ − g t'],
    ['Position at time t', 'u cos θ · t', 'u sin θ · t − ½ g t²'],
    ['At the top', 'u cos θ', '0'],
  ],
  'Table of the horizontal and vertical components of acceleration, velocity and position of a projectile',
);
const pr = (th) => proj(U20, th);
const T6 = table(
  ['θ (degrees)', 'Range R (m)', 'Max height H (m)', 'Time of flight T (s)'],
  [15, 30, 45, 60, 75].map((th) => [String(th), d3(pr(th).R), d3(pr(th).H), d3(pr(th).T)]),
  'Table of range, maximum height and time of flight for a speed of 20 metres per second at five angles of projection',
);
const T7 = table(
  ['Quantity', 'Symbol and relation', 'SI unit'],
  [
    ['Period', 'T = time for one revolution', 's'],
    ['Frequency', 'f = 1/T', 'hertz (s⁻¹)'],
    ['Angular speed', 'ω = Δθ/Δt = 2π/T = 2πf', 'rad s⁻¹'],
    ['Speed', 'v = ω r = 2π r/T', 'm s⁻¹'],
    ['Centripetal acceleration', 'a = v²/r = ω² r', 'm s⁻²'],
  ],
  'Table of period, frequency, angular speed, speed and centripetal acceleration for uniform circular motion',
);
const T8 = table(
  ['Initial speed', 'Range', 'Height', 'Time of flight'],
  [['u → 2u (same angle)', '× 4', '× 4', '× 2'], ['θ → 90° − θ', 'same', 'changes', 'changes'], ['θ = 45°', 'maximum, u²/g', 'R/4', '√2 u / g']],
  'Table of how range, height and time of flight scale with speed and angle',
);
const T9 = table(
  ['Part of the path', 'Velocity', 'Acceleration'],
  [['Rising', 'up and forward, vertical part shrinking', 'g downward'], ['At the top', 'horizontal only, u cos θ', 'g downward'], ['Falling', 'down and forward, vertical part growing', 'g downward']],
  'Table of velocity and acceleration of a projectile while rising, at the top and while falling',
);
export const TABLES = { T1, T2, T3, T4, T5, T6, T7, T8, T9 };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Motion in a Plane — Part 1: Vectors and their products',
  goals: [
    'Distinguish scalars from vectors and add, subtract and scale vectors graphically and by components',
    'Resolve a vector into rectangular components and write it with unit vectors',
    'Calculate scalar (dot) and vector (cross) products and interpret them geometrically',
  ],
  slides: [
    sl('title', 'Motion in a Plane', {
      b: 'Part 1 — vectors: quantities that have a direction as well as a size, and the rules for combining them.',
      v: V.vadd,
      n: 'A kite flies in the wind, a boat crosses a river, a ball is hit across a field. None of these can be described by one number on one line. We need quantities with direction. In this part we meet vectors, learn to add, subtract and resolve them, and then study two ways of multiplying them.',
    }),
    sl('concept', 'Scalars and vectors', {
      b: 'Some quantities need only a size; others also need a direction.',
      ul: [
        '**Scalar**: magnitude and unit only (mass, time, distance, speed, energy). Scalars add like ordinary numbers.',
        '**Vector**: magnitude, unit **and** direction, and it obeys the vector addition law (displacement, velocity, acceleration, force).',
        'A vector is drawn as an arrow: length = magnitude, arrowhead = direction. In print it is written $\\vec{A}$ and its magnitude as $|\\vec{A}|$ or $A$.',
        'Two vectors are **equal** if they have the same magnitude and direction, wherever they are drawn.',
      ],
      v: T1,
      n: 'A scalar is fixed by a number and a unit, like a mass of five kilograms. A vector also needs a direction, like a velocity of five metres per second towards the north. Vectors are drawn as arrows. Two arrows with the same length and direction represent equal vectors, wherever on the page they are drawn.',
    }),
    sl('diagram', 'Multiplying a vector by a real number', {
      b: r`For a real number $\lambda$, the vector $\lambda\vec{A}$ has magnitude $|\lambda|A$.`,
      ul: [
        r`If $\lambda > 0$ it points the same way as $\vec{A}$; if $\lambda < 0$ it points the opposite way.`,
        r`$-\vec{A}$ has the same magnitude as $\vec{A}$ and the opposite direction; $\vec{A} + (-\vec{A}) = \vec{0}$, the **null vector**.`,
        r`The **unit vector** along $\vec{A}$ is $\hat{A} = \vec{A}/A$: magnitude one, no unit, only direction.`,
      ],
      v: V.scalev,
      n: 'Multiply a vector by two and it becomes twice as long, with the same direction. Multiply by one half and it is half as long. Multiply by minus one and you get an arrow of the same length pointing the opposite way. A vector divided by its own length is a unit vector: it carries only the direction.',
    }),
    sl('concept', 'Adding vectors: triangle and parallelogram laws', {
      b: 'Displacements show how vectors add: walk along $\\vec{A}$, then along $\\vec{B}$.',
      ul: [
        '**Triangle law**: place the tail of $\\vec{B}$ at the head of $\\vec{A}$; the resultant $\\vec{R} = \\vec{A} + \\vec{B}$ joins the tail of $\\vec{A}$ to the head of $\\vec{B}$.',
        '**Parallelogram law**: draw $\\vec{A}$ and $\\vec{B}$ from one point; the diagonal from that point is $\\vec{R}$.',
        'Vector addition is **commutative** ($\\vec{A}+\\vec{B}=\\vec{B}+\\vec{A}$) and **associative**.',
        'Magnitudes do not simply add: $R \\le A + B$, with equality only for parallel vectors.',
      ],
      v: V.vadd,
      n: 'Draw the two vectors from one point and complete the parallelogram. The diagonal from that point is the resultant. If you instead place the second vector at the head of the first, you reach the same point: that is the triangle law. The order does not matter, but the lengths do not simply add up.',
    }),
    sl('concept', 'Magnitude and direction of the resultant', {
      b: r`For $\vec{A}$ and $\vec{B}$ with angle $\theta$ between them (tail to tail):`,
      m: [r`R = \sqrt{A^2 + B^2 + 2AB\cos\theta}`, r`\tan\alpha = \dfrac{B\sin\theta}{A + B\cos\theta}`],
      ul: [
        r`$\alpha$ is the angle of $\vec{R}$ from $\vec{A}$.`,
        r`Largest resultant $A + B$ at $\theta = 0^\circ$; smallest $|A - B|$ at $\theta = 180^\circ$; at $\theta = 90^\circ$, $R = \sqrt{A^2 + B^2}$.`,
        'So the magnitude of the resultant of two vectors lies between $|A-B|$ and $A+B$.',
      ],
      v: V.vadd,
      n: 'By the law of cosines on the triangle, the resultant has size given by the square root of A squared plus B squared plus two A B cosine theta. Its angle from A comes from the tangent formula. The resultant is largest when the vectors are parallel, smallest when they are opposite, and always lies between those limits.',
    }),
    sl('example', 'Worked example 1: two cables on a signboard post', {
      b: r`Two cables pull a signboard post in a Pune market with forces of $${ex1.A}$ kN and $${ex1.B}$ kN, at $${ex1.th}^\circ$ to each other. Find the magnitude of the resultant pull and its direction relative to the ${ex1.A} kN cable.`,
      ul: [
        r`$R = \sqrt{${ex1.A}^2 + ${ex1.B}^2 + 2(${ex1.A})(${ex1.B})\cos ${ex1.th}^\circ} = \sqrt{${ex1.A ** 2} + ${ex1.B ** 2} + ${ex1.cross}} = \sqrt{${ex1.sq}} = ${d3(ex1.R)}$ kN.`,
        r`$\tan\alpha = \dfrac{${ex1.B}\sin ${ex1.th}^\circ}{${ex1.A} + ${ex1.B}\cos ${ex1.th}^\circ} = \dfrac{${d3(ex1.B * Math.sin(rad(ex1.th)))}}{${ex1.A + ex1.B * Math.cos(rad(ex1.th))}} = ${d3(Math.tan(rad(ex1.alpha)))}$, so $\alpha = ${d3(ex1.alpha)}^\circ$.`,
        r`The resultant is $${d3(ex1.R)}$ kN, $${d3(ex1.alpha)}^\circ$ from the ${ex1.A} kN cable towards the ${ex1.B} kN cable.`,
      ],
      v: V.vadd,
      n: `Put six and four into the formula with sixty degrees between them. Six squared is thirty six, four squared is sixteen, and two times six times four times cosine of sixty is twenty four. The sum is seventy six, so the resultant is ${d3(ex1.R)} kilonewtons. The tangent formula then gives an angle of ${d3(ex1.alpha)} degrees from the six kilonewton cable.`,
    }),
    sl('check', 'Quick check: range of a resultant', {
      b: 'Choose the correct option.',
      v: V.vadd,
      chk: 'maxmin-mcq',
      n: 'Remember the largest and smallest possible resultants of two vectors.',
    }),
    sl('diagram', 'Subtracting vectors', {
      b: r`$\vec{A} - \vec{B}$ is defined as $\vec{A} + (-\vec{B})$.`,
      m: [r`|\vec{A} - \vec{B}| = \sqrt{A^2 + B^2 - 2AB\cos\theta}`],
      ul: [
        'Reverse $\\vec{B}$ and add; or join the head of $\\vec{B}$ to the head of $\\vec{A}$ (both tails together) and the arrow runs from $\\vec{B}$ to $\\vec{A}$.',
        r`Subtraction is **not** commutative: $\vec{B} - \vec{A} = -(\vec{A} - \vec{B})$.`,
        `For the vectors of Example 1: $|\\vec{A}-\\vec{B}| = \\sqrt{${ex1.A ** 2} + ${ex1.B ** 2} - ${ex1.cross}} = ${d3(ex1.sub)}$.`,
      ],
      v: V.vsub,
      n: `To subtract, reverse the second vector and add. The same arrow joins the tip of B to the tip of A. For the same six and four unit vectors at sixty degrees, the difference has size ${d3(ex1.sub)}, smaller than the sum. Subtraction is not commutative: swapping the order reverses the arrow.`,
    }),
    sl('diagram', 'Resolving a vector; unit vectors', {
      b: r`Any vector in a plane is the sum of two perpendicular components.`,
      ul: [
        r`$\hat{i}$ and $\hat{j}$ are unit vectors along $+x$ and $+y$.`,
        r`$\vec{A} = A_x\hat{i} + A_y\hat{j}$ with $A_x = A\cos\theta$ and $A_y = A\sin\theta$.`,
        r`Conversely $A = \sqrt{A_x^2 + A_y^2}$ and $\tan\theta = A_y/A_x$; take care of the quadrant.`,
        'A resolved component is independent of the other: this idea makes projectile motion easy.',
      ],
      v: V.resolve,
      n: 'Choose perpendicular axes and drop a perpendicular from the tip of the vector onto each axis. The two components, A cosine theta along x and A sine theta along y, add back to the vector. Written with unit vectors, the example vector is eight i hat plus six j hat, with magnitude ten.',
    }),
    sl('concept', 'Adding by components (the analytical method)', {
      b: 'Add the x parts and the y parts separately.',
      ul: [
        r`If $\vec{R} = \vec{A} + \vec{B}$ then $R_x = A_x + B_x$ and $R_y = A_y + B_y$.`,
        'This works for any number of vectors, and subtraction and scaling work the same way.',
        r`Finish with $R = \sqrt{R_x^2 + R_y^2}$ and $\tan\theta = R_y/R_x$.`,
      ],
      v: T2,
      n: 'The analytical method is the most reliable. Resolve every vector along x and y, add the x components, add the y components, and then rebuild the resultant from its two components. It works for any number of vectors and for subtraction and scaling too.',
    }),
    sl('example', 'Worked example 2: three forces', {
      b: r`Three forces act on a ring: $${ex2.f[0][0]}$ N along $+x$, $${ex2.f[1][0]}$ N at $${ex2.f[1][1]}^\circ$ and $${ex2.f[2][0]}$ N at $${ex2.f[2][1]}^\circ$ from $+x$. Find the resultant.`,
      ul: [
        r`$F_x = ${ex2.f[0][0]} + ${ex2.f[1][0]}\cos ${ex2.f[1][1]}^\circ + ${ex2.f[2][0]}\cos ${ex2.f[2][1]}^\circ = ${ex2.f[0][0]} + (${d3(ex2.c[1][0])}) + (${d3(ex2.c[2][0])}) = ${d3(ex2.sum[0])}$ N.`,
        r`$F_y = 0 + ${ex2.f[1][0]}\sin ${ex2.f[1][1]}^\circ + ${ex2.f[2][0]}\sin ${ex2.f[2][1]}^\circ = ${d3(ex2.c[1][1])} + (${d3(ex2.c[2][1])}) = ${d3(ex2.sum[1])}$ N.`,
        r`$F = \sqrt{${d3(ex2.sum[0])}^2 + ${d3(ex2.sum[1])}^2} = ${d3(ex2.R)}$ N at $\theta = ${d3(ex2.ang)}^\circ$ above $+x$ ($\tan\theta = ${d3(ex2.sum[1] / ex2.sum[0])}$).`,
      ],
      v: T2,
      n: `Resolve each force. The x components add to ${d3(ex2.sum[0])} newtons and the y components to ${d3(ex2.sum[1])} newtons. The resultant therefore has magnitude ${d3(ex2.R)} newtons, at ${d3(ex2.ang)} degrees above the x axis.`,
    }),
    sl('check', 'Quick check: components', {
      b: 'Choose the correct option.',
      v: V.resolve,
      chk: 'resolve-mcq',
      n: 'Use the cosine for the component along the angle and the sine for the other.',
    }),
    sl('diagram', 'Scalar (dot) product', {
      b: r`$\vec{A}\cdot\vec{B} = AB\cos\theta$, a **scalar**.`,
      ul: [
        r`Geometric meaning: $A$ times the component of $\vec{B}$ along $\vec{A}$ (or the other way round).`,
        r`Commutative and distributive: $\vec{A}\cdot\vec{B} = \vec{B}\cdot\vec{A}$.`,
        r`$\vec{A}\cdot\vec{A} = A^2$; $\hat{i}\cdot\hat{i} = \hat{j}\cdot\hat{j} = \hat{k}\cdot\hat{k} = 1$ and $\hat{i}\cdot\hat{j} = 0$ etc.`,
        r`In components: $\vec{A}\cdot\vec{B} = A_xB_x + A_yB_y + A_zB_z$. Zero for perpendicular vectors.`,
      ],
      v: V.dotcross,
      n: 'The scalar product multiplies the size of one vector by the component of the other along it. The result is a number with no direction. It is zero when the vectors are perpendicular, and in components it is the sum of the products of matching components. In the figure the answer is six times three, eighteen.',
    }),
    sl('example', 'Worked example 3: angle between a force and a displacement', {
      b: r`A force $\vec{F} = (${ex3.F[0]}\hat{i} + ${ex3.F[1]}\hat{j})$ N acts on a trolley that is displaced by $\vec{d} = (${ex3.d[0]}\hat{i} - ${-ex3.d[1]}\hat{j})$ m. Find $\vec{F}\cdot\vec{d}$ and the angle between them.`,
      ul: [
        r`$\vec{F}\cdot\vec{d} = (${ex3.F[0]})(${ex3.d[0]}) + (${ex3.F[1]})(${ex3.d[1]}) = ${ex3.F[0] * ex3.d[0]} + (${ex3.F[1] * ex3.d[1]}) = ${ex3.W}$ N m (this is the work done, as chapter 5 will show).`,
        r`$F = \sqrt{${ex3.F[0] ** 2} + ${ex3.F[1] ** 2}} = ${d3(Vec.mag(ex3.F))}$ N and $d = \sqrt{${ex3.d[0] ** 2} + ${ex3.d[1] ** 2}} = ${Vec.mag(ex3.d)}$ m.`,
        r`$\cos\theta = \dfrac{${ex3.W}}{${d3(Vec.mag(ex3.F))} \times ${Vec.mag(ex3.d)}} = ${d3(ex3.cos)}$, so $\theta = ${d3(ex3.th)}^\circ$.`,
      ],
      v: V.dotcross,
      n: `Multiply matching components and add: eighteen minus eight is ${ex3.W}. The magnitudes are ${d3(Vec.mag(ex3.F))} and ${Vec.mag(ex3.d)}, so the cosine of the angle is ${d3(ex3.cos)} and the angle is ${d3(ex3.th)} degrees.`,
    }),
    sl('diagram', 'Vector (cross) product', {
      b: r`$\vec{A}\times\vec{B} = AB\sin\theta\ \hat{n}$, a **vector**.`,
      ul: [
        r`Direction: perpendicular to both, by the **right-hand rule** (curl the fingers from $\vec{A}$ to $\vec{B}$; the thumb gives $\hat{n}$).`,
        r`Magnitude $AB\sin\theta$ = area of the parallelogram on $\vec{A}$ and $\vec{B}$. Zero for parallel vectors.`,
        r`**Not commutative**: $\vec{B}\times\vec{A} = -\vec{A}\times\vec{B}$.`,
        r`$\vec{A}\times\vec{B} = (A_yB_z - A_zB_y)\hat{i} + (A_zB_x - A_xB_z)\hat{j} + (A_xB_y - A_yB_x)\hat{k}$.`,
      ],
      v: V.dotcross,
      n: 'The vector product has size A B sine theta, which equals the area of the parallelogram on the two vectors. Its direction is perpendicular to both, found with the right hand rule. Swapping the order reverses it. For the vectors in the figure the area is twenty four, and the product points out of the page.',
    }),
    sl('concept', 'Cross products of the unit vectors', {
      b: r`In the cyclic order $\hat{i} \to \hat{j} \to \hat{k} \to \hat{i}$ the product is positive; in the reverse order it is negative.`,
      ul: [
        r`$\hat{i}\times\hat{j} = \hat{k}$, $\hat{j}\times\hat{k} = \hat{i}$, $\hat{k}\times\hat{i} = \hat{j}$.`,
        r`$\hat{i}\times\hat{i} = \hat{j}\times\hat{j} = \hat{k}\times\hat{k} = \vec{0}$.`,
        'These nine results generate the component formula.',
      ],
      v: T4,
      n: 'Remember the cycle: i, j, k, and back to i. A product taken along the cycle gives plus the third vector; taken against the cycle it gives minus. A unit vector crossed with itself is zero.',
    }),
    sl('example', 'Worked example 4: a cross product in the plane', {
      b: r`Let $\vec{A} = (${ex4.A[0]}\hat{i} + ${ex4.A[1]}\hat{j})$ and $\vec{B} = (${ex4.B[0]}\hat{i} - ${-ex4.B[1]}\hat{j})$. Find $\vec{A}\times\vec{B}$, the angle between the vectors and the area of the triangle they span.`,
      ul: [
        r`$\vec{A}\times\vec{B} = (A_xB_y - A_yB_x)\hat{k} = (${ex4.A[0]})(${ex4.B[1]}) - (${ex4.A[1]})(${ex4.B[0]}) = ${ex4.A[0] * ex4.B[1]} - ${ex4.A[1] * ex4.B[0]} = ${ex4.cr[2]}$, so $\vec{A}\times\vec{B} = ${ex4.cr[2]}\,\hat{k}$ (into the page).`,
        r`$AB\sin\theta = ${ex4.mag}$ with $A = \sqrt{${Vec.dot(ex4.A, ex4.A)}}$ and $B = \sqrt{${Vec.dot(ex4.B, ex4.B)}}$: $\sin\theta = ${d3(ex4.sin)}$ and $\vec{A}\cdot\vec{B} = ${ex4.dot} > 0$, so $\theta = ${d3(ex4.th)}^\circ$ (acute).`,
        r`Triangle area $= \tfrac{1}{2}|\vec{A}\times\vec{B}| = ${ex4.area}$ square units.`,
      ],
      v: V.dotcross,
      n: `Only the k component survives: two times minus one, minus three times four, gives minus fourteen. So the cross product has magnitude fourteen and points into the page. The sine of the angle is ${d3(ex4.sin)}, so the angle is ${d3(ex4.th)} degrees, and the triangle on these vectors has area ${ex4.area}.`,
    }),
    sl('check', 'Quick check: direction of a cross product', {
      b: 'Choose the correct option.',
      v: T4,
      chk: 'crossdir-mcq',
      n: 'Use the cyclic order of the unit vectors.',
    }),
    sl('concept', 'Dot and cross products compared', {
      b: 'Two products, two different jobs.',
      ul: [
        'Use the **dot** product to find an angle, a projection, or a scalar such as work.',
        'Use the **cross** product to find an area, a perpendicular direction, or a vector such as torque (later chapters).',
      ],
      v: T3,
      n: 'The dot product gives a scalar and is zero for perpendicular vectors. The cross product gives a vector and is zero for parallel vectors. One is commutative, the other changes sign when the order is swapped.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Vector', 'Magnitude + direction; obeys triangle / parallelogram law'],
          ['Resultant', 'R = √(A² + B² + 2AB cos θ); |A − B| ≤ R ≤ A + B'],
          ['Subtraction', 'A − B = A + (−B)'],
          ['Components', 'A_x = A cos θ, A_y = A sin θ; A = A_x î + A_y ĵ'],
          ['Dot product', 'A B cos θ = A_x B_x + A_y B_y + A_z B_z (scalar)'],
          ['Cross product', 'A B sin θ, right-hand rule (vector); area of parallelogram'],
        ],
        'Summary table of vector addition, subtraction, components and the two products',
      ),
      n: 'To sum up. Vectors add by the triangle or parallelogram law, or by adding components. Subtraction is addition of the reversed vector. Any vector in a plane is the sum of its components along the axes. The dot product gives a scalar and the cross product a vector.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State the angle between the vectors clearly: tail to tail for the resultant formula.',
        'Resolve and add components when there are three or more vectors, or when the angle is awkward.',
        'Check the quadrant of an angle from the signs of the components before using the tangent.',
        'Dot product: scalar, A B cos θ. Cross product: vector, A B sin θ, and say its direction.',
      ],
      v: T3,
      n: 'Always say which angle you are using. With three or more vectors, resolve and add components. Check the quadrant from the signs of the components. And for products, remember the dot gives a number and the cross gives a vector whose direction you must state.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Motion in a Plane — Part 2: Projectiles and circular motion',
  goals: [
    'Describe motion in a plane with position, velocity and acceleration vectors',
    'Derive and use the equation of path, time of flight, maximum height and range of a projectile',
    'Derive and use centripetal acceleration and angular velocity in uniform circular motion',
  ],
  slides: [
    sl('title', 'Projectiles and circles', {
      b: 'Part 2 — motion that curves: a thrown ball and a point on a spinning wheel.',
      v: V.proj,
      n: 'A cricket ball hit high in the air follows a smooth arch. A point on a spinning wheel follows a circle. Both are motion in a plane, and both become simple once we treat the two perpendicular directions separately. This part shows how.',
    }),
    sl('concept', 'Position, velocity and acceleration in a plane', {
      b: 'In a plane each is a vector with two components.',
      ul: [
        r`Position vector $\vec{r} = x\hat{i} + y\hat{j}$; displacement $\Delta\vec{r} = \vec{r}_2 - \vec{r}_1$.`,
        r`Velocity $\vec{v} = d\vec{r}/dt = v_x\hat{i} + v_y\hat{j}$ is always **tangent to the path**; acceleration $\vec{a} = d\vec{v}/dt$.`,
        r`For **constant acceleration**: $\vec{v} = \vec{u} + \vec{a}t$ and $\vec{r} = \vec{r}_0 + \vec{u}t + \tfrac{1}{2}\vec{a}t^2$, which split into two independent one-dimensional sets (chapter 2), one for $x$ and one for $y$.`,
      ],
      v: T5,
      n: 'In a plane, position, velocity and acceleration are all vectors with an x part and a y part. The velocity is always tangent to the path. When the acceleration is constant, the equations of straight line motion apply separately along x and along y, and the two parts combine as vectors.',
    }),
    sl('example', 'Worked example 5: constant acceleration in a plane', {
      b: r`A particle starts from the origin with velocity $${ex5.u[0]}\hat{i}$ m s$^{-1}$ and has a constant acceleration $(${ex5.a[0]}\hat{i} + ${ex5.a[1]}\hat{j})$ m s$^{-2}$. Find its position, velocity, speed and the direction of its velocity at $t = ${ex5.t}$ s.`,
      ul: [
        r`$x = ${ex5.u[0]}(${ex5.t}) + \tfrac{1}{2}(${ex5.a[0]})(${ex5.t})^2 = ${ex5.r[0]}$ m and $y = 0 + \tfrac{1}{2}(${ex5.a[1]})(${ex5.t})^2 = ${ex5.r[1]}$ m.`,
        r`$v_x = ${ex5.u[0]} + (${ex5.a[0]})(${ex5.t}) = ${ex5.v[0]}$ m s$^{-1}$ and $v_y = 0 + (${ex5.a[1]})(${ex5.t}) = ${ex5.v[1]}$ m s$^{-1}$.`,
        r`Speed $= \sqrt{${ex5.v[0] ** 2} + ${ex5.v[1] ** 2}} = ${d3(ex5.speed)}$ m s$^{-1}$; direction $\tan\theta = ${ex5.v[1]}/${ex5.v[0]}$, $\theta = ${d3(ex5.dir)}^\circ$ above $+x$.`,
      ],
      v: plotMotion,
      n: `Treat x and y separately. In four seconds x grows to ${ex5.r[0]} metres and y to ${ex5.r[1]} metres. The velocity components are ${ex5.v[0]} and ${ex5.v[1]} metres per second, so the speed is ${d3(ex5.speed)} metres per second at ${d3(ex5.dir)} degrees above the x axis. The path curves upward.`,
    }),
    sl('concept', 'Projectile motion: two independent motions', {
      b: 'A **projectile** moves under gravity alone (air resistance neglected). Its acceleration is $g$ downward everywhere.',
      ul: [
        '**Horizontal:** no acceleration, so $v_x$ is constant.',
        '**Vertical:** acceleration $-g$, as for a body thrown up or dropped.',
        'The two motions are **independent**: time is the common link.',
        'Evidence: a ball dropped and a ball thrown horizontally from the same height reach the ground together.',
      ],
      v: V.horiz,
      n: 'A projectile feels only gravity, so horizontally it keeps a constant velocity and vertically it accelerates downward at nine point eight metres per second squared. The two motions are independent. A ball thrown sideways and a ball dropped from the same height fall together, as the equal heights in the picture show.',
    }),
    sl('example', 'Worked example 6: horizontal projection from a cliff', {
      b: r`A stone is thrown horizontally at $${ex7.u}$ m s$^{-1}$ from the top of a cliff $${d3(ex7.h)}$ m high ($g = 9.8$ m s$^{-2}$). Find the time of flight, the horizontal range, and the speed and direction of the stone as it lands.`,
      ul: [
        r`Vertical: $h = \tfrac{1}{2}gT^2$, so $T = \sqrt{\dfrac{2(${d3(ex7.h)})}{9.8}} = \sqrt{${R6(2 * ex7.h / g)}} = ${ex7.T}$ s.`,
        r`Range $R = uT = ${ex7.u} \times ${ex7.T} = ${ex7.R}$ m.`,
        r`At landing $v_x = ${ex7.u}$ and $v_y = gT = 9.8 \times ${ex7.T} = ${d3(ex7.vy)}$ m s$^{-1}$ downward; $v = \sqrt{${ex7.u ** 2} + ${d3(ex7.vy)}^2} = ${d3(ex7.v)}$ m s$^{-1}$, at $\tan^{-1}(${d3(ex7.vy)}/${ex7.u}) = ${d3(ex7.ang)}^\circ$ below the horizontal.`,
      ],
      v: plotHoriz,
      n: `The fall takes the same time as a drop from the cliff: ${ex7.T} seconds. In that time the stone moves ${ex7.R} metres sideways. Just before landing its vertical speed is ${d3(ex7.vy)} metres per second and its horizontal speed is still ${ex7.u}, so it hits at ${d3(ex7.v)} metres per second, ${d3(ex7.ang)} degrees below the horizontal.`,
    }),
    sl('check', 'Quick check: independence of motions', {
      b: 'Choose the correct option.',
      v: V.horiz,
      chk: 'indep-mcq',
      n: 'Think about the vertical motion of each ball.',
    }),
    sl('diagram', 'Projectile at an angle: the equation of path', {
      b: r`Launch speed $u$ at angle $\theta$ above the horizontal: $u_x = u\cos\theta$, $u_y = u\sin\theta$.`,
      m: [r`x = u\cos\theta\,t,\qquad y = u\sin\theta\,t - \tfrac{1}{2}gt^2`, r`y = x\tan\theta - \dfrac{g\,x^2}{2u^2\cos^2\theta}`],
      ul: [
        r`Eliminating $t$ gives $y = ax - bx^2$: a **parabola**.`,
        r`Velocity at time $t$: $v_x = u\cos\theta$, $v_y = u\sin\theta - gt$; the speed is least at the top.`,
      ],
      v: V.proj,
      n: 'Resolve the launch velocity. Horizontally x is u cosine theta times t, vertically y is u sine theta times t minus half g t squared. Eliminate t and y becomes a quadratic in x: the path is a parabola. In the figure the vertical arrow shrinks to zero at the top and then reverses, while the horizontal arrow never changes.',
    }),
    sl('concept', 'Time of flight, maximum height and range', {
      b: 'For a launch and landing at the same level:',
      m: [r`T = \dfrac{2u\sin\theta}{g},\qquad H = \dfrac{u^2\sin^2\theta}{2g},\qquad R = \dfrac{u^2\sin 2\theta}{g}`],
      ul: [
        r`$T$: set $y = 0$. $H$: set $v_y = 0$ (at time $T/2$). $R = u\cos\theta\times T$.`,
        r`$R$ is greatest at $\theta = 45^\circ$, where $R_{max} = u^2/g$; then $H = R_{max}/4$.`,
        r`Angles $\theta$ and $90^\circ - \theta$ give the **same range**.`,
        r`$\dfrac{H}{R} = \dfrac{\tan\theta}{4}$.`,
      ],
      v: plotRange,
      n: 'Setting the height to zero gives the time of flight. Setting the vertical velocity to zero gives the maximum height. Multiplying the horizontal speed by the time of flight gives the range, u squared sine two theta over g. The range is greatest at forty five degrees, and two angles that add to ninety degrees give the same range.',
    }),
    sl('diagram', 'Same speed, different angles', {
      b: 'A ball thrown at 20 m s$^{-1}$ at five angles:',
      ul: [
        'The 15° and 75° paths have the same range; the 30° and 60° paths too.',
        'Larger angle: higher and longer in the air; but beyond 45° the range falls again.',
      ],
      v: plotAngles,
      n: 'All five balls leave at twenty metres per second. The forty five degree path goes farthest. The paths at fifteen and seventy five degrees land at the same place, but the steeper one climbs much higher and stays in the air longer.',
    }),
    sl('example', 'Worked example 7: a launch at 30 degrees', {
      b: r`A ball is launched at $${ex8.u}$ m s$^{-1}$ at $${ex8.th}^\circ$ above the horizontal ($g = 9.8$ m s$^{-2}$). Find the time to reach the top, the maximum height, the time of flight and the range.`,
      ul: [
        r`$u_x = ${ex8.u}\cos ${ex8.th}^\circ = ${d4(ex8.ux)}$ m s$^{-1}$ and $u_y = ${ex8.u}\sin ${ex8.th}^\circ = ${d3(ex8.uy)}$ m s$^{-1}$.`,
        r`Time to the top $= u_y/g = ${d3(ex8.uy)}/9.8 = ${ex8.tTop}$ s; $H = \dfrac{u_y^2}{2g} = \dfrac{${d3(ex8.uy ** 2)}}{19.6} = ${d3(ex8.H)}$ m.`,
        r`$T = 2 \times ${ex8.tTop} = ${ex8.T}$ s and $R = u_xT = ${d4(ex8.ux)} \times ${ex8.T} = ${d4(ex8.R)}$ m.`,
      ],
      v: V.proj,
      n: `Resolve the launch velocity into ${d4(ex8.ux)} horizontally and ${d3(ex8.uy)} vertically. The ball reaches the top after ${ex8.tTop} seconds, at a height of ${d3(ex8.H)} metres. The flight lasts ${ex8.T} seconds, so the range is ${d4(ex8.R)} metres.`,
    }),
    sl('check', 'Quick check: scaling', {
      b: 'Choose the correct option.',
      v: T8,
      chk: 'speedscale-mcq',
      n: 'Range depends on the square of the launch speed.',
    }),
    sl('concept', 'What changes along the path', {
      b: 'Velocity and acceleration while a projectile rises, tops out and falls:',
      ul: [
        'The **acceleration** is $g$ downward throughout, including at the top.',
        'At the top $v_y = 0$ but $v_x = u\\cos\\theta \\neq 0$, so the speed there is $u\\cos\\theta$, the minimum.',
        'It lands with the launch speed (same level) at the angle $\\theta$ below the horizontal.',
      ],
      v: T9,
      n: 'The acceleration never changes: gravity pulls down all the time. At the top only the vertical velocity vanishes, so the speed there is u cosine theta, the smallest on the path. On landing at the launch level the speed is the launch speed again.',
    }),
    sl('example', 'Worked example 8: the longest throw', {
      b: r`A fielder can throw a cricket ball a greatest horizontal distance of $${ex9.R}$ m on level ground. Find her throwing speed, and the maximum height and time of flight when she throws at $45^\circ$.`,
      ul: [
        r`$R_{max} = u^2/g$, so $u = \sqrt{${ex9.R} \times 9.8} = \sqrt{${R6(ex9.R * g)}} = ${d3(ex9.u)}$ m s$^{-1}$.`,
        r`At $45^\circ$: $H = R_{max}/4 = ${ex9.H}$ m.`,
        r`$T = \dfrac{2u\sin 45^\circ}{g} = \dfrac{2 \times ${d3(ex9.u)} \times 0.7071}{9.8} = ${d3(ex9.T)}$ s.`,
      ],
      v: plotRange,
      n: `The greatest range occurs at forty five degrees and equals u squared over g. So the speed is ${d3(ex9.u)} metres per second. At that angle the height is a quarter of the range, ${ex9.H} metres, and the flight takes ${d3(ex9.T)} seconds.`,
    }),
    sl('concept', 'Uniform circular motion: angular speed', {
      b: 'A body moving on a circle at constant speed.',
      ul: [
        r`**Period** $T$: time for one revolution; **frequency** $f = 1/T$.`,
        r`**Angular speed** $\omega = \Delta\theta/\Delta t = 2\pi/T = 2\pi f$ (rad s$^{-1}$); $\theta$ must be in radians.`,
        r`Speed $v = \omega r = 2\pi r/T$; the speed is constant, the **velocity is not** (its direction changes).`,
        'Every point on a rotating disc has the same $\\omega$ but a speed proportional to its radius.',
      ],
      v: T7,
      n: 'Angular speed is the angle swept per second, measured in radians. It equals two pi over the period. The speed along the circle is omega times the radius. Although the speed is constant, the velocity keeps changing direction.',
    }),
    sl('diagram', 'Centripetal acceleration', {
      b: 'Compare the velocities at two points separated by angle $\\Delta\\theta$.',
      m: [r`|\Delta\vec{v}| = 2v\sin\dfrac{\Delta\theta}{2} \approx v\Delta\theta,\qquad \Delta t = \dfrac{r\Delta\theta}{v}`, r`a = \dfrac{|\Delta\vec{v}|}{\Delta t} = \dfrac{v^2}{r} = \omega^2 r`],
      ul: [
        r`As $\Delta\theta \to 0$, $\Delta\vec{v}$ points **to the centre**: the acceleration is **centripetal**.`,
        r`Two arrows of equal length $v$ and an angle $\Delta\theta$ between them form an isosceles triangle.`,
      ],
      v: V.deltav,
      n: 'Draw the two velocities from one point. They have equal lengths and an angle between them, so their difference is the short third side, about v times the angle. Dividing by the time, which is r times the angle over v, gives v squared over r. The direction of the change is towards the centre.',
    }),
    sl('diagram', 'Velocity along the tangent, acceleration to the centre', {
      b: r`$a = v^2/r = \omega^2 r$, directed toward the centre, perpendicular to $\vec{v}$.`,
      ul: [
        r`At fixed $r$: $a \propto v^2$. At fixed $v$: $a \propto 1/r$. At fixed $\omega$: $a \propto r$.`,
        'Because $\\vec{a} \\perp \\vec{v}$ the acceleration changes only the direction of the velocity, not the speed.',
      ],
      v: V.circ,
      n: 'At each point the velocity is along the tangent and the acceleration points to the centre, at a right angle to it. In the figure the radius is five metres and the speed four metres per second, so the acceleration is three point two metres per second squared. A right angle means the speed does not change, only its direction.',
    }),
    sl('example', 'Worked example 9: a bike on a circular track', {
      b: r`A motorbike goes round a circular track of radius $${ex10.r}$ m at a steady $${ex10.kmh}$ km h$^{-1}$. Find its angular speed, period and centripetal acceleration.`,
      ul: [
        r`$v = ${ex10.kmh}/3.6 = ${ex10.v}$ m s$^{-1}$.`,
        r`$\omega = v/r = ${ex10.v}/${ex10.r} = ${ex10.w}$ rad s$^{-1}$; $T = 2\pi/\omega = ${d3(ex10.T)}$ s.`,
        r`$a = v^2/r = \dfrac{${ex10.v ** 2}}{${ex10.r}} = ${ex10.a}$ m s$^{-2}$ $= \omega^2 r$ (check: $${ex10.w ** 2} \times ${ex10.r} = ${ex10.a}$).`,
      ],
      v: plotCircA,
      n: `First convert the speed to ${ex10.v} metres per second. The angular speed is ${ex10.w} radians per second, the period is ${d3(ex10.T)} seconds, and the centripetal acceleration is ${ex10.a} metres per second squared, directed to the centre of the track.`,
    }),
    sl('example', 'Worked example 10: a point on the equator', {
      b: r`The Earth turns once in 24 h (86 400 s). Taking its radius as $6.4 \times 10^6$ m, find the speed and centripetal acceleration of a point on the equator.`,
      ul: [
        r`$\omega = \dfrac{2\pi}{86400} = ${d4(ex11.w * 1e5)} \times 10^{-5}$ rad s$^{-1}$.`,
        r`$v = \omega R = ${d3(ex11.v)}$ m s$^{-1}$.`,
        r`$a = \omega^2 R = ${d3(ex11.a)}$ m s$^{-2}$, about ${d3((ex11.a / g) * 100)} per cent of $g$ (so its effect on weight is small).`,
      ],
      v: plotCircR,
      n: `The Earth's angular speed is about seven point two seven times ten to the minus five radians per second. A point on the equator therefore moves at ${d3(ex11.v)} metres per second and has a centripetal acceleration of only ${d3(ex11.a)} metres per second squared, a small fraction of g.`,
    }),
    sl('check', 'Quick check: direction of acceleration', {
      b: 'Choose the correct option.',
      v: V.circ,
      chk: 'cdir-mcq',
      n: 'The speed is constant, but is the velocity?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Motion in a plane', 'Two independent components; v tangent to the path'],
          ['Projectile', 'a = g downward; y = x tan θ − g x²/(2u² cos² θ)'],
          ['T, H, R', '2u sin θ/g; u² sin² θ/2g; u² sin 2θ/g (R max at 45°)'],
          ['Angular speed', 'ω = 2π/T; v = ω r'],
          ['Centripetal acceleration', 'a = v²/r = ω² r, towards the centre'],
        ],
        'Summary table of motion in a plane, projectile formulas and circular motion',
      ),
      n: 'To sum up. In a plane the two components move independently. A projectile has constant horizontal velocity and constant downward acceleration, giving a parabola, with time of flight, height and range from the standard formulas. In uniform circular motion the acceleration is v squared over r, directed towards the centre.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Resolve the launch velocity first; horizontal and vertical motions share only the time.',
        'The standard T, H, R formulas hold only when landing is at the launch level; otherwise solve the vertical equation.',
        'Convert km h⁻¹ to m s⁻¹ and rpm to rad s⁻¹ before using a = v²/r or ω² r.',
        'In circular motion the speed is constant but the velocity and acceleration are not; the acceleration is never zero.',
      ],
      v: T6,
      n: 'Resolve the launch velocity first. Use the standard formulas only when landing is at the launch level. Convert speeds and revolutions per minute to standard units. And remember that in circular motion the acceleration is never zero, even though the speed is constant.',
    }),
  ],
});

// ISC 11 ch03 Vectors — two decks. Part 1 (t01, t02, t03): scalars and vectors, position and displacement vectors,
// equal / null / coplanar vectors, unit vectors î ĵ k̂, multiplication by a real number, the triangle and parallelogram
// laws with the derivation of R and α, special cases, subtraction and the two diagonals. Part 2 (t04, t05): resolution into
// rectangular components (2-D and 3-D), the resultant from components, the dot product (work) and the cross product (torque).
// Every number is computed here from stated data; narration spells numbers out in words (TTS-safe).
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { Vec, rad, deg, R6, mn, resultant2, angleBetween, sumPolar } from './phys.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- number words for narration (TTS-safe)
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function below1000(n) {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts = [];
  if (h) parts.push(`${ONES[h]} hundred`);
  if (rest) {
    const ten = rest < 20 ? ONES[rest] : TENS[Math.floor(rest / 10)] + (rest % 10 ? ` ${ONES[rest % 10]}` : '');
    parts.push(h ? `and ${ten}` : ten);
  }
  return parts.join(' ');
}
/** Number in words: integers up to 999999, decimals read digit by digit ("nine point eight"), negatives "minus". */
export function W(x) {
  if (x < 0) return `minus ${W(-x)}`;
  const s = String(R6(x));
  const [ip, fp] = s.split('.');
  const n = Number(ip);
  let out;
  if (n === 0) out = 'zero';
  else {
    const th = Math.floor(n / 1000);
    const rest = n % 1000;
    out = [th ? `${below1000(th)} thousand` : '', rest ? (th && rest < 100 ? `and ${below1000(rest)}` : below1000(rest)) : ''].filter(Boolean).join(' ');
  }
  if (fp) out += ` point ${[...fp].map((d) => ONES[Number(d)]).join(' ')}`;
  return out;
}
const d3 = (x) => dec(x, 3);
const Wd = (x, n = 3) => W(Number(dec(x, n)));
const I = r`\hat{\imath}`;
const J = r`\hat{\jmath}`;
const K = r`\hat{k}`;
/** LaTeX of a 3-vector a i + b j + c k with signs (zero terms dropped, coefficients ±1 shown as ±). */
export function ijk(v) {
  const names = [I, J, K];
  let out = '';
  v.forEach((c, i) => {
    if (c === 0) return;
    const mag = Math.abs(c);
    const coef = mag === 1 ? '' : String(mag);
    out += `${c < 0 ? '-' : out ? '+' : ''}${coef}${names[i]}`;
  });
  return out || '0';
}
/** Plain-text 3-vector a î + b ĵ + c k̂ with proper signs. */
const tijk = (v) => v.map((c, i) => `${i ? (c < 0 ? ' − ' : ' + ') : c < 0 ? '−' : ''}${Math.abs(c)}${['î', 'ĵ', 'k̂'][i]}`).join('');
const vtext = (v, u = '') => `(${v.map(mn).join(', ')})${u ? ` ${u}` : ''}`;

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { P: G.POS_DATA.P, Q: G.POS_DATA.Q };
ex1.d = Vec.sub(ex1.Q, ex1.P);
ex1.m = Vec.mag(ex1.d);
ex1.ang = Vec.ang(ex1.d);

const ex2 = { A: [4, -3, 12] };
ex2.m = Vec.mag(ex2.A);
ex2.u = ex2.A.map((c) => c / ex2.m);
ex2.um = Vec.mag(ex2.u);
ex2.half = Vec.scale(ex2.A, -0.5);

const ex3 = { A: 7, B: 8, th: 60 };
ex3.rs = resultant2(ex3.A, ex3.B, ex3.th);
ex3.R = R6(ex3.rs.R);
ex3.alpha = ex3.rs.alpha;
ex3.beta = ex3.th - ex3.alpha; // angle of R with B

const ex4 = { A: [5, -1, 4], B: [-3, 4, 2] };
ex4.sum = Vec.add(ex4.A, ex4.B);
ex4.dif = Vec.sub(ex4.A, ex4.B);
ex4.ms = Vec.mag(ex4.sum);
ex4.md = Vec.mag(ex4.dif);

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex5 = { F: 50, th: 30 };
ex5.x = ex5.F * Math.cos(rad(ex5.th));
ex5.y = ex5.F * Math.sin(rad(ex5.th));
ex5.back = Math.hypot(ex5.x, ex5.y);

const ex6 = { A: G.AXES3D_DATA.A };
ex6.m = Vec.mag(ex6.A);
ex6.cos = ex6.A.map((c) => c / ex6.m);
ex6.ang = ex6.cos.map((c) => deg(Math.acos(c)));
ex6.sq = ex6.cos.reduce((s, c) => s + c * c, 0);

const ex7 = { forces: [[40, 0], [30, 90], [20, 210]] };
ex7.rows = ex7.forces.map(([m, a]) => [m, a, R6(m * Math.cos(rad(a))), R6(m * Math.sin(rad(a)))]);
ex7.X = ex7.rows.reduce((s, row) => s + row[2], 0);
ex7.Y = ex7.rows.reduce((s, row) => s + row[3], 0);
ex7.R = Math.hypot(ex7.X, ex7.Y);
ex7.ang = deg(Math.atan2(ex7.Y, ex7.X));

const ex8 = { F: [2, -3, 4], s: [5, 2, 3] };
ex8.W = Vec.dot(ex8.F, ex8.s);
ex8.cos = ex8.W / (Vec.mag(ex8.F) * Vec.mag(ex8.s));
ex8.ang = deg(Math.acos(ex8.cos));
ex8.mF = Vec.mag(ex8.F);
ex8.ms = Vec.mag(ex8.s);

const ex9 = { A: [3, 1, -2], B: [1, -2, 2] };
ex9.C = Vec.cross3(ex9.A, ex9.B);
ex9.m = Vec.mag(ex9.C);
ex9.pa = Vec.dot(ex9.A, ex9.C);
ex9.pb = Vec.dot(ex9.B, ex9.C);
ex9.rev = Vec.cross3(ex9.B, ex9.A);
const ex10 = { r: [0.3, 0, 0], F: [20, 40, 0] };
ex10.tau = Vec.cross3(ex10.r, ex10.F);
ex10.m = Vec.mag(ex10.tau);

export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10 };

// ---------------------------------------------------------------- visuals
export const V = {
  pos: svgV(G.POS, 'Position vectors from the origin to P at 2, 1 and Q at 6, 4, and the displacement vector from P to Q: 4 metres along x and 3 metres along y, 5 metres long', 'Δr = r₂ − r₁ depends only on the end points.'),
  axes3d: svgV(G.AXES3D, 'Axes with unit vectors i-hat, j-hat, k-hat and the vector 2 i-hat plus 3 j-hat plus 6 k-hat inside a box of edges 2, 3 and 6; its magnitude is 7', 'Components along x, y and z are the box edges; the magnitude is the box diagonal.'),
  scalev: svgV(G.SCALEV, 'A vector A with 2A twice as long in the same direction, half of A, and minus A pointing the opposite way', 'λA: magnitude |λ| A; direction of A if λ > 0, opposite if λ < 0.'),
  vadd: svgV(G.VADD, 'Parallelogram of A of 5 units and B of 4 units at 60 degrees; the resultant is the diagonal of 7.81 units at 26.3 degrees to A, and the dashed copy of B shows the triangle law', 'Parallelogram law (tail to tail) and triangle law (tail to head) give the same R.'),
  deriv: svgV(G.DERIV, 'Derivation of the resultant: A along OP, B along PS at theta to OP produced; perpendicular SN gives PN equal to B cos theta and SN equal to B sin theta', 'Right-angled triangle ONS: ON = A + B cos θ, SN = B sin θ.'),
  vsub: svgV(G.VSUB, 'Parallelogram on A and B with both diagonals: A plus B from the common tail, and A minus B from the tip of B to the tip of A', 'The two diagonals are A + B and A − B.'),
  resolve: svgV(G.RESOLVE, 'A force of 25 newtons resolved into a horizontal component of 20 newtons and a vertical component of 15 newtons', 'Fx = F cos θ and Fy = F sin θ; the components and F form a right-angled triangle.'),
  dot: svgV(G.DOT, 'A force of 10 newtons at about 53 degrees to a displacement of 6 metres: the component along the displacement is 6 newtons, so the work is 36 joules', 'Work = F·s: only the component of F along s counts.'),
  cross: svgV(G.CROSS, 'Left: the magnitude of the cross product equals the area of the parallelogram, 20. Right: a force of 30 newtons at 30 degrees on a spanner of 0.4 metres gives a torque of 6 newton metres out of the page', '|A × B| = A B sin θ; torque τ = r × F.'),
};

const AB = G.VADD_DATA;
const rcurve = (sgn) => `sqrt(${AB.A * AB.A + AB.B * AB.B}${sgn}${2 * AB.A * AB.B}*cos(x*pi/180))`;
export const plotR = plot(
  {
    x: { label: 'angle θ between A and B (degrees)', min: 0, max: 180 },
    y: { label: 'magnitude (units)', min: 0, max: 10 },
    functions: [
      { expr: rcurve('+'), label: '|A + B|, A = 5, B = 4', domain: [0, 180] },
      { expr: rcurve('-'), label: '|A − B|', domain: [0, 180] },
    ],
    vlines: [{ x: 90, label: 'θ = 90°: |A + B| = |A − B| = 6.4', dashed: true }],
  },
  'Graph of the magnitude of A plus B and A minus B against the angle between them for A equal to 5 and B equal to 4: the sum falls from 9 at zero degrees to 1 at 180 degrees, the difference rises from 1 to 9, and they are equal at 90 degrees',
  'R is largest (A + B) at 0° and smallest (A − B) at 180°.',
);

// ---------------------------------------------------------------- tables
const T_SV = table(
  ['Quantity', 'Kind', 'Why'],
  [
    ['Mass of a cricket ball', 'Scalar', 'magnitude only'],
    ['Displacement of the ball from the bat', 'Vector', 'magnitude and direction; adds by the triangle law'],
    ['Speed shown on a speedometer', 'Scalar', 'no direction'],
    ['Velocity, force, momentum, torque', 'Vector', 'magnitude and direction; obey vector addition'],
    ['Work, energy, power, time', 'Scalar', 'magnitude only'],
    ['Electric current', 'Scalar', 'has a sense, but currents add arithmetically, not by the parallelogram law'],
  ],
  'Table that classifies physical quantities as scalars or vectors with a reason for each',
);
const T_KINDS = table(
  ['Name', 'Meaning', 'Example'],
  [
    ['Equal vectors', 'Same magnitude and same direction (position does not matter)', 'Two boats sailing due east at the same speed'],
    ['Negative of A', 'Same magnitude as A, opposite direction', 'Displacement home to school and school to home'],
    ['Null (zero) vector', 'Magnitude zero, no definite direction; A + (−A) = 0', 'Displacement after a complete round trip'],
    ['Coplanar vectors', 'Lie in one plane, or can be drawn in one plane when moved parallel to themselves', 'A, B and A + B are always coplanar'],
  ],
  'Table of equal, negative, null and coplanar vectors with a meaning and an example of each',
);
const T_EX2 = table(
  ['Step', 'Working'],
  [
    ['Vector', `A = ${vtext(ex2.A, 'm')}`],
    ['Magnitude', `|A| = √(${ex2.A.map((c) => c * c).join(' + ')}) = √${ex2.m * ex2.m} = ${ex2.m} m`],
    ['Unit vector', `Â = A/|A| = (${tijk(ex2.A)})/${ex2.m}`],
    ['Check', `|Â| = √(${ex2.A.map((c) => `(${mn(c)}/${ex2.m})²`).join(' + ')}) = ${dec(ex2.um, 3)}`],
  ],
  'Table with the magnitude and the unit vector of the vector 4 i minus 3 j plus 12 k',
);
const T_EX3 = table(
  ['Quantity', 'Working', 'Value'],
  [
    ['R²', `${ex3.A}² + ${ex3.B}² + 2(${ex3.A})(${ex3.B}) cos ${ex3.th}°`, `${ex3.A * ex3.A} + ${ex3.B * ex3.B} + ${2 * ex3.A * ex3.B * 0.5} = ${ex3.R * ex3.R}`],
    ['R', `√${ex3.R * ex3.R}`, `${ex3.R} N`],
    ['tan α', `${ex3.B} sin ${ex3.th}° ÷ (${ex3.A} + ${ex3.B} cos ${ex3.th}°)`, `${d3(ex3.B * Math.sin(rad(ex3.th)))} ÷ ${ex3.A + ex3.B * 0.5} = ${d3((ex3.B * Math.sin(rad(ex3.th))) / (ex3.A + ex3.B * 0.5))}`],
    ['α (from the 7 N force)', 'tan⁻¹ of the above', `${d3(ex3.alpha)}°`],
  ],
  'Table with the resultant of a 7 newton and an 8 newton force at 60 degrees: magnitude 13 newtons and angle about 32.2 degrees from the 7 newton force',
);
const T_EX4 = table(
  ['Quantity', 'î', 'ĵ', 'k̂', 'Magnitude'],
  [
    ['A', ...ex4.A.map(mn), `√${Vec.dot(ex4.A, ex4.A)} = ${d3(Vec.mag(ex4.A))}`],
    ['B', ...ex4.B.map(mn), `√${Vec.dot(ex4.B, ex4.B)} = ${d3(Vec.mag(ex4.B))}`],
    ['A + B', ...ex4.sum.map(mn), `√${Vec.dot(ex4.sum, ex4.sum)} = ${ex4.ms}`],
    ['A − B', ...ex4.dif.map(mn), `√${Vec.dot(ex4.dif, ex4.dif)} = ${d3(ex4.md)}`],
  ],
  'Table of the components of A, B, A plus B and A minus B and their magnitudes',
);
const T_SPECIAL = table(
  ['Angle θ between A and B', 'R', 'Direction of R', 'Name'],
  [
    ['0°', 'A + B (largest)', 'α = 0, along both', 'parallel vectors'],
    ['90°', '√(A² + B²)', 'tan α = B/A', 'perpendicular vectors'],
    ['120° with A = B', 'A', 'α = 60° from each', 'equal vectors, 120° apart'],
    ['180°', '|A − B| (smallest)', 'along the larger vector', 'antiparallel vectors'],
  ],
  'Table of the special cases of the resultant for angles 0, 90 and 180 degrees and for equal vectors 120 degrees apart',
);
const T_COMP = table(
  ['Quantity', 'Formula', 'Value for F = 50 N at 30°'],
  [
    ['Fx (along x)', 'F cos θ', `${d3(ex5.x)} N`],
    ['Fy (along y)', 'F sin θ', `${d3(ex5.y)} N`],
    ['Check on the magnitude', '√(Fx² + Fy²)', `${d3(ex5.back)} N`],
    ['Angle from the components', 'tan⁻¹(Fy/Fx)', `${d3(deg(Math.atan2(ex5.y, ex5.x)))}°`],
  ],
  'Table with the rectangular components of a 50 newton force at 30 degrees, recovering the magnitude and the angle',
);
const T_EX6 = table(
  ['Axis', 'Component', 'cos of the angle = component ÷ 7', 'Angle with the axis'],
  ex6.A.map((c, i) => [['x', 'y', 'z'][i], String(c), `${c}/${ex6.m} = ${d3(ex6.cos[i])}`, `${d3(ex6.ang[i])}°`]),
  'Table of the direction cosines and angles of the vector 2 i plus 3 j plus 6 k with the x, y and z axes',
);
const T_RES = table(
  ['Step', 'What to do'],
  [
    ['1', 'Draw the axes and mark each force with its angle from +x'],
    ['2', 'Resolve each force: X = F cos θ, Y = F sin θ (keep the signs)'],
    ['3', 'Add: ΣX = X₁ + X₂ + …, ΣY = Y₁ + Y₂ + …'],
    ['4', 'R = √((ΣX)² + (ΣY)²)'],
    ['5', 'tan φ = ΣY/ΣX; fix the quadrant from the signs of ΣX and ΣY'],
  ],
  'Table of the five steps for finding the resultant of coplanar forces by rectangular components',
);
const T_EX7 = table(
  ['Force', 'Angle from +x', 'X = F cos θ (N)', 'Y = F sin θ (N)'],
  [...ex7.rows.map(([m, a, x, y]) => [`${m} N`, `${a}°`, d3(x), d3(y)]), ['Sum', '', `ΣX = ${d3(ex7.X)}`, `ΣY = ${d3(ex7.Y)}`]],
  'Table of the components of three forces of 40, 30 and 20 newtons and their sums',
);
const T_DOTP = table(
  ['Result', 'Dot product A·B = A B cos θ'],
  [
    ['Commutative', 'A·B = B·A'],
    ['Distributive', 'A·(B + C) = A·B + A·C'],
    ['Same vector', 'A·A = A², so A = √(A·A)'],
    ['Unit vectors', 'î·î = ĵ·ĵ = k̂·k̂ = 1; î·ĵ = ĵ·k̂ = k̂·î = 0'],
    ['Components', 'A·B = AₓBₓ + A_yB_y + A_zB_z'],
    ['Angle', 'cos θ = A·B ÷ (A B)'],
  ],
  'Table of the properties of the scalar product, including its component form and the angle formula',
);
const T_EX8 = table(
  ['Quantity', 'Working', 'Result'],
  [
    ['F', `(${ex8.F.map(mn).join(', ')}) N`, `|F| = √${Vec.dot(ex8.F, ex8.F)} = ${d3(ex8.mF)} N`],
    ['s', `(${ex8.s.map(mn).join(', ')}) m`, `|s| = √${Vec.dot(ex8.s, ex8.s)} = ${d3(ex8.ms)} m`],
    ['Work W = F·s', `${ex8.F.map((c, i) => `(${c})(${ex8.s[i]})`).join(' + ')}`, `${ex8.W} J`],
    ['cos θ', `${ex8.W} ÷ (${d3(ex8.mF)} × ${d3(ex8.ms)})`, `${d3(ex8.cos)}, so θ = ${d3(ex8.ang)}°`],
  ],
  'Table with the work done by a force F on a displacement s from their components and the angle between them',
);
const T_CROSSP = table(
  ['Result', 'Cross product A × B = A B sin θ n̂'],
  [
    ['Direction', 'perpendicular to both A and B; right-hand screw rule'],
    ['Not commutative', 'B × A = −(A × B)'],
    ['Distributive', 'A × (B + C) = A × B + A × C'],
    ['Same vector', 'A × A = 0 (sin 0° = 0)'],
    ['Unit vectors', 'î × ĵ = k̂, ĵ × k̂ = î, k̂ × î = ĵ; reversed order gives the negative; î × î = 0'],
    ['Components', 'A × B = (A_yB_z − A_zB_y) î + (A_zBₓ − AₓB_z) ĵ + (AₓB_y − A_yBₓ) k̂'],
  ],
  'Table of the properties of the vector product, including the unit-vector rule and the component form',
);
const T_SPEC2 = table(
  ['Angle θ', 'A·B = A B cos θ', '|A × B| = A B sin θ', 'Meaning'],
  [
    ['0°', 'A B (largest)', '0', 'parallel: full work, no torque'],
    ['90°', '0', 'A B (largest)', 'perpendicular: no work, full torque'],
    ['180°', '−A B (smallest)', '0', 'antiparallel: negative work, no torque'],
  ],
  'Table of the dot and cross products for angles of 0, 90 and 180 degrees',
);

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Vectors — Part 1: Describing, adding and subtracting vectors',
  goals: [
    'Classify quantities as scalars or vectors, and describe position, displacement, equal, null and coplanar vectors',
    'Write vectors in terms of î, ĵ and k̂; find the magnitude and the unit vector; multiply a vector by a real number',
    'Add and subtract vectors by the triangle and parallelogram laws and in unit-vector form',
    'Derive the magnitude and direction of the resultant, and state its special cases',
  ],
  slides: [
    sl('title', 'Describing, adding and subtracting vectors', {
      b: 'Part 1 — what a vector is, how to write it with unit vectors, and how two vectors combine.',
      v: V.vadd,
      n: 'In this part we meet vectors, quantities that need a direction as well as a size. We write them with unit vectors, multiply them by numbers, and add and subtract them by the triangle and parallelogram laws. We derive the magnitude and direction of the resultant and look at its special cases.',
    }),
    sl('concept', 'Scalars and vectors', {
      b: 'A **scalar** has magnitude only; a **vector** has magnitude **and** direction and obeys the laws of vector addition.',
      ul: [
        'Scalars add like numbers: 3 kg + 4 kg = 7 kg. Vectors add by the triangle law: 3 m east and 4 m north give 5 m at an angle.',
        'A vector is drawn as an arrow: length = magnitude, arrowhead = direction. We write $\\vec{A}$ and its magnitude $|\\vec{A}|$ or $A$.',
        'Electric current has a direction in a wire but is a **scalar**: currents add arithmetically, not by the parallelogram law.',
        'Multiplying or dividing by a scalar changes the magnitude, never the line of action (except for a sign).',
      ],
      v: T_SV,
      n: 'A scalar is described by a number and a unit alone, like mass or time. A vector needs a direction too, and combines by the triangle law. We draw a vector as an arrow whose length shows the magnitude. Electric current has a sense along the wire, but currents add like ordinary numbers, so current is a scalar.',
    }),
    sl('concept', 'Position and displacement vectors', {
      b: 'A **position vector** $\\vec{r}$ joins the origin $O$ to a point; the **displacement** joins one position to another.',
      m: [r`\Delta\vec{r} = \vec{r}_2 - \vec{r}_1`],
      ul: [
        'Displacement depends only on the initial and final positions, not on the path; the distance travelled is a scalar and can be larger.',
        'In a plane $\\vec{r} = (x, y)$; in space $\\vec{r} = (x, y, z)$. The displacement from $P$ to $Q$ is $\\overrightarrow{PQ} = \\vec{r}_Q - \\vec{r}_P$.',
        'If the end point is the start point, the displacement is the null vector.',
      ],
      v: V.pos,
      n: 'A position vector starts at the origin and ends at the point. The displacement from one point to another is the final position vector minus the initial position vector. It depends only on the end points, not on the route, and it is zero for a complete round trip. The distance travelled is a scalar and can be larger than the size of the displacement.',
    }),
    sl('example', 'Worked example 1: a survey drone', {
      b: r`A drone moves from $P(${ex1.P.join(', ')})$ to $Q(${ex1.Q.join(', ')})$ in metres. Find its displacement, the magnitude and the angle with the $x$-axis.`,
      ul: [
        r`$\Delta\vec{r} = \vec{r}_Q - \vec{r}_P = (${ex1.Q[0]} - ${ex1.P[0]}, ${ex1.Q[1]} - ${ex1.P[1]}) = (${ex1.d.join(', ')})$ m.`,
        r`$|\Delta\vec{r}| = \sqrt{${ex1.d[0]}^2 + ${ex1.d[1]}^2} = \sqrt{${ex1.m * ex1.m}} = ${ex1.m}$ m.`,
        r`$\tan\varphi = \dfrac{${ex1.d[1]}}{${ex1.d[0]}} = ${dec(ex1.d[1] / ex1.d[0], 3)}$, so $\varphi = ${d3(ex1.ang)}^\circ$ above the $x$-axis.`,
      ],
      v: V.pos,
      n: `The displacement is the final position minus the initial position, which is ${W(ex1.d[0])} metres along x and ${W(ex1.d[1])} metres along y. Its magnitude is the square root of sixteen plus nine, which is ${W(ex1.m)} metres. The angle with the x axis has tangent three over four, so it is about ${Wd(ex1.ang)} degrees above the axis.`,
    }),
    sl('concept', 'Equal, negative, null and coplanar vectors', {
      b: 'Four ideas you will use all the time:',
      ul: [
        '**Equal vectors:** same magnitude and same direction. A vector can be shifted parallel to itself without change.',
        '**Negative vector:** $-\\vec{A}$ has the magnitude of $\\vec{A}$ and the opposite direction; $\\vec{A} + (-\\vec{A}) = \\vec{0}$.',
        '**Null vector** $\\vec{0}$: zero magnitude, no definite direction. It is a vector, not the number zero.',
        '**Coplanar vectors** lie in one plane. Any two vectors, and their sum, are always coplanar; three vectors need not be.',
      ],
      v: T_KINDS,
      n: 'Equal vectors have the same magnitude and direction, wherever they are drawn. The negative of a vector has the same size and the opposite direction, and adding the two gives the null vector, which has zero magnitude and no definite direction. Vectors are coplanar if they can be drawn in one plane. Two vectors and their sum are always coplanar.',
    }),
    sl('check', 'Quick check: kinds of vectors', {
      b: 'Choose the correct option.',
      v: T_KINDS,
      chk: 'kinds-mcq',
      n: 'Recall what each term means before you choose.',
    }),
    sl('concept', 'Unit vectors î, ĵ, k̂', {
      b: r`A **unit vector** has magnitude 1, no unit and no dimension; it only shows a direction. $${I}$, $${J}$ and $${K}$ point along $+x$, $+y$ and $+z$.`,
      m: [r`\vec{A} = A_x${I} + A_y${J} + A_z${K}`, r`\hat{A} = \dfrac{\vec{A}}{|\vec{A}|}`],
      ul: [
        r`$A_x$, $A_y$, $A_z$ are the **components** of $\vec{A}$; $A_x${I}$ is the part of $\vec{A}$ along $x$ and so on.`,
        r`$${I}$, $${J}$, $${K}$ are mutually perpendicular and each has magnitude 1.`,
        r`Any vector in space is a sum of three vectors along the axes. In a plane, $A_z = 0$.`,
      ],
      v: V.axes3d,
      n: 'A unit vector has magnitude one and only shows direction. The unit vectors i hat, j hat and k hat point along the x, y and z axes and are mutually perpendicular. Any vector can be written as A x times i hat plus A y times j hat plus A z times k hat, where the three numbers are its components.',
    }),
    sl('concept', 'Magnitude and the unit vector along A', {
      b: 'The magnitude comes from Pythagoras applied twice; dividing by it gives the unit vector.',
      m: [r`|\vec{A}| = \sqrt{A_x^2 + A_y^2 + A_z^2}`, r`\hat{A} = \dfrac{A_x${I} + A_y${J} + A_z${K}}{\sqrt{A_x^2 + A_y^2 + A_z^2}}`],
      ul: [
        r`Example: $\vec{A} = 2${I} + 3${J} + 6${K}$ has $|\vec{A}| = \sqrt{4 + 9 + 36} = 7$ and $\hat{A} = (2${I} + 3${J} + 6${K})/7$.`,
        r`The magnitude of any unit vector is $1$; the three components of $\hat{A}$ are the direction cosines.`,
        'A vector of magnitude $F$ along $\\hat{A}$ is $F\\hat{A}$.',
      ],
      v: V.axes3d,
      n: 'The magnitude of a vector is the square root of the sum of the squares of its components. For two, three and six, that is the square root of forty nine, which is seven. Dividing the vector by its magnitude gives the unit vector in its direction. A vector of magnitude F along that direction is simply F times the unit vector.',
    }),
    sl('example', 'Worked example 2: a kite string', {
      b: r`A kite is displaced by $\vec{A} = ${ijk(ex2.A)}$ m. Find $|\vec{A}|$, the unit vector $\hat{A}$ and the vector of magnitude 26 m along $-\vec{A}$.`,
      ul: [
        r`$|\vec{A}| = \sqrt{${ex2.A.map((c) => c * c).join(' + ')}} = \sqrt{${ex2.m * ex2.m}} = ${ex2.m}$ m.`,
        r`$\hat{A} = \dfrac{${ijk(ex2.A)}}{${ex2.m}}$; check: $\dfrac{${ex2.A.map((c) => c * c).join(' + ')}}{${ex2.m * ex2.m}} = 1$.`,
        r`Along $-\vec{A}$ with magnitude 26 m: $-26\hat{A} = -2(${ijk(ex2.A)}) = ${ijk(Vec.scale(ex2.A, -2))}$ m.`,
      ],
      v: T_EX2,
      n: `The magnitude is the square root of sixteen plus nine plus one hundred and forty four, which is ${W(ex2.m)} metres. Dividing the vector by ${W(ex2.m)} gives the unit vector. A vector of magnitude twenty six metres in the opposite direction is minus twenty six times the unit vector, which is minus two times the original vector.`,
    }),
    sl('concept', 'Multiplying a vector by a real number', {
      b: r`For a real number $\lambda$, $\lambda\vec{A}$ is a vector of magnitude $|\lambda| A$.`,
      ul: [
        r`If $\lambda > 0$ it points along $\vec{A}$; if $\lambda < 0$ it points opposite to $\vec{A}$; if $\lambda = 0$ it is the null vector.`,
        r`In components: $\lambda\vec{A} = \lambda A_x\,` + I + r` + \lambda A_y\,` + J + r` + \lambda A_z\,` + K + r`$.`,
        r`Two non-zero vectors are **parallel** (or antiparallel) when one is a multiple of the other: $\vec{B} = \lambda\vec{A}$.`,
        r`Dividing by a number is multiplying by its reciprocal: $\hat{A} = \dfrac{1}{A}\vec{A}$.`,
      ],
      v: V.scalev,
      n: 'Multiplying a vector by a positive number stretches or shrinks it without changing its direction. A negative number also reverses the direction, and zero gives the null vector. In components, every component is multiplied by the number. Two vectors are parallel when one is a number times the other.',
    }),
    sl('check', 'Quick check: unit vectors', {
      b: 'Choose the correct option.',
      v: V.scalev,
      chk: 'unitdir-mcq',
      n: 'Divide the vector by its magnitude, then check that the result has magnitude one.',
    }),
    sl('concept', 'Triangle and parallelogram laws', {
      b: 'Two ways to draw the same sum $\\vec{R} = \\vec{A} + \\vec{B}$:',
      ul: [
        '**Triangle law:** if two vectors are drawn head to tail as two sides of a triangle, their sum is the third side drawn from the tail of the first to the head of the second.',
        '**Parallelogram law:** if two vectors are drawn from a common point as adjacent sides of a parallelogram, their sum is the diagonal through that point.',
        'The sum is called the **resultant**; the order of addition does not change it. (The proof of commutative and associative laws is not required.)',
        'Subtracting: $\\vec{A} - \\vec{B} = \\vec{A} + (-\\vec{B})$.',
      ],
      v: V.vadd,
      n: 'In the triangle law, place the tail of the second vector at the head of the first; the resultant joins the start of the first to the end of the second. In the parallelogram law, draw both vectors from one point and complete the parallelogram; the diagonal from that point is the resultant. Both laws give the same vector.',
    }),
    sl('diagram', 'Magnitude of the resultant', {
      b: r`Let $\vec{A}$ and $\vec{B}$ have an angle $\theta$ between them. Draw $SN \perp OP$ produced, where $OP = A$, $PS = B$, $OS = R$.`,
      m: [r`ON = A + B\cos\theta, \qquad SN = B\sin\theta`, r`R^2 = ON^2 + SN^2 = (A + B\cos\theta)^2 + (B\sin\theta)^2`, r`R^2 = A^2 + B^2 + 2AB\cos\theta \;\Rightarrow\; R = \sqrt{A^2 + B^2 + 2AB\cos\theta}`],
      ul: [
        r`In $\triangle PNS$: $PN = B\cos\theta$ and $SN = B\sin\theta$, since $\angle SPN = \theta$.`,
        r`In the right-angled triangle $ONS$ Pythagoras gives $R^2$; use $\cos^2\theta + \sin^2\theta = 1$.`,
      ],
      v: V.deriv,
      n: 'Draw the vectors head to tail and drop a perpendicular from the end of the resultant to the line of the first vector. In the small right triangle, the base is B cos theta and the height is B sin theta. In the big right triangle the base is A plus B cos theta. Pythagoras and the identity cos squared plus sin squared equals one give R squared equals A squared plus B squared plus two A B cos theta.',
    }),
    sl('diagram', 'Direction of the resultant', {
      b: r`Let $\alpha$ be the angle that $\vec{R}$ makes with $\vec{A}$. In the same right-angled triangle $ONS$:`,
      m: [r`\tan\alpha = \dfrac{SN}{ON} = \dfrac{B\sin\theta}{A + B\cos\theta}`, r`\alpha = \tan^{-1}\!\left(\dfrac{B\sin\theta}{A + B\cos\theta}\right)`],
      ul: [
        r`$\alpha$ is measured from $\vec{A}$; the angle of $\vec{R}$ with $\vec{B}$ is $\theta - \alpha$.`,
        r`If $A + B\cos\theta < 0$ the angle $\alpha$ is obtuse: use the signs of numerator and denominator to place it.`,
        r`Check with the figure: $A = 5$, $B = 4$, $\theta = 60^\circ$ gives $R = \sqrt{61} = 7.81$ and $\alpha = 26.3^\circ$.`,
      ],
      v: V.deriv,
      n: 'In the same right triangle the tangent of alpha is the height over the base, which is B sin theta over A plus B cos theta. So alpha is the inverse tangent of that ratio, measured from the first vector. The angle with the second vector is theta minus alpha. With five, four and sixty degrees, the resultant is root sixty one and alpha is about twenty six degrees.',
    }),
    sl('concept', 'Special cases of the resultant', {
      b: 'Put the angle $\\theta$ into $R^2 = A^2 + B^2 + 2AB\\cos\\theta$:',
      ul: [
        r`$\theta = 0^\circ$: $R = A + B$, the largest value; $\theta = 180^\circ$: $R = |A - B|$, the smallest. So $|A - B| \le R \le A + B$.`,
        r`$\theta = 90^\circ$: $R = \sqrt{A^2 + B^2}$ and $\tan\alpha = B/A$.`,
        r`$A = B$: $R = 2A\cos(\theta/2)$ and $\alpha = \theta/2$ (the diagonal of a rhombus bisects the angle); at $120^\circ$, $R = A$.`,
        'Three vectors that form a closed triangle taken in order add to the null vector.',
      ],
      v: plotR,
      n: 'When the vectors point the same way the resultant is the sum of the magnitudes, the largest possible. When they point oppositely it is the difference, the smallest. At right angles it is the square root of the sum of squares. If the two vectors are equal, the resultant bisects the angle between them, and at one hundred and twenty degrees it equals each of them.',
    }),
    sl('check', 'Quick check: range of the resultant', {
      b: 'Choose the correct option.',
      v: plotR,
      chk: 'range-mcq',
      n: 'Think of the largest and the smallest value the resultant can take.',
    }),
    sl('example', 'Worked example 3: two ropes on a barge', {
      b: r`Two ropes pull a barge with forces of ${ex3.A} N and ${ex3.B} N, ${ex3.th}$^\circ$ apart. Find the magnitude and direction of the resultant force.`,
      ul: [
        r`$R^2 = ${ex3.A}^2 + ${ex3.B}^2 + 2(${ex3.A})(${ex3.B})\cos ${ex3.th}^\circ = ${ex3.A * ex3.A} + ${ex3.B * ex3.B} + ${2 * ex3.A * ex3.B * 0.5} = ${ex3.R * ex3.R}$, so $R = ${ex3.R}$ N.`,
        r`$\tan\alpha = \dfrac{${ex3.B}\sin ${ex3.th}^\circ}{${ex3.A} + ${ex3.B}\cos ${ex3.th}^\circ} = \dfrac{${d3(ex3.B * Math.sin(rad(ex3.th)))}}{${ex3.A + ex3.B * 0.5}} = ${d3((ex3.B * Math.sin(rad(ex3.th))) / (ex3.A + ex3.B * 0.5))}$, so $\alpha = ${d3(ex3.alpha)}^\circ$ from the ${ex3.A} N rope.`,
        r`Angle with the ${ex3.B} N rope: $${ex3.th}^\circ - ${d3(ex3.alpha)}^\circ = ${d3(ex3.beta)}^\circ$, so the resultant lies nearer the larger force.`,
      ],
      v: T_EX3,
      n: `Using the law just derived, R squared is forty nine plus sixty four plus fifty six, which is ${W(ex3.R * ex3.R)}, so the resultant is ${W(ex3.R)} newtons. The tangent of alpha is ${Wd(ex3.B * Math.sin(rad(ex3.th)))} over eleven, so alpha is about ${Wd(ex3.alpha)} degrees from the smaller force. The resultant lies closer to the larger force, as it should.`,
    }),
    sl('concept', 'Subtraction and the two diagonals', {
      b: r`The two diagonals of a parallelogram on $\vec{A}$ and $\vec{B}$ are the sum and the difference.`,
      m: [r`\vec{A} - \vec{B} = \vec{A} + (-\vec{B})`, r`|\vec{A} - \vec{B}| = \sqrt{A^2 + B^2 - 2AB\cos\theta}`],
      ul: [
        'The diagonal from the common point is $\\vec{A} + \\vec{B}$; the other diagonal, drawn from the head of $\\vec{B}$ to the head of $\\vec{A}$, is $\\vec{A} - \\vec{B}$.',
        r`Replace $\theta$ by $180^\circ - \theta$ in the law of the sum, since $-\vec{B}$ makes that angle with $\vec{A}$.`,
        'In unit-vector form, add or subtract component by component.',
        r`Adding the squares of the diagonals gives $|\vec{A} + \vec{B}|^2 + |\vec{A} - \vec{B}|^2 = 2(A^2 + B^2)$.`,
      ],
      v: V.vsub,
      n: 'To subtract B from A, add the negative of B. In the parallelogram on A and B, one diagonal from the common point is the sum, and the other diagonal, from the head of B to the head of A, is the difference. The magnitude of the difference uses minus two A B cos theta. In unit vector form, simply subtract component by component.',
    }),
    sl('example', 'Worked example 4: sum and difference in unit-vector form', {
      b: r`$\vec{A} = ${ijk(ex4.A)}$ and $\vec{B} = ${ijk(ex4.B)}$. Find $\vec{A} + \vec{B}$, $\vec{A} - \vec{B}$ and their magnitudes.`,
      ul: [
        r`$\vec{A} + \vec{B} = (${ex4.A[0]} + (${ex4.B[0]}))${I} + (${ex4.A[1]} + ${ex4.B[1]})${J} + (${ex4.A[2]} + ${ex4.B[2]})${K} = ${ijk(ex4.sum)}$; $|\vec{A} + \vec{B}| = \sqrt{${Vec.dot(ex4.sum, ex4.sum)}} = ${ex4.ms}$.`,
        r`$\vec{A} - \vec{B} = (${ex4.A[0]} - (${ex4.B[0]}))${I} + (${ex4.A[1]} - ${ex4.B[1]})${J} + (${ex4.A[2]} - ${ex4.B[2]})${K} = ${ijk(ex4.dif)}$; $|\vec{A} - \vec{B}| = \sqrt{${Vec.dot(ex4.dif, ex4.dif)}} = ${d3(ex4.md)}$.`,
        r`Check: $|\vec{A} + \vec{B}|^2 + |\vec{A} - \vec{B}|^2 = ${Vec.dot(ex4.sum, ex4.sum)} + ${Vec.dot(ex4.dif, ex4.dif)} = ${Vec.dot(ex4.sum, ex4.sum) + Vec.dot(ex4.dif, ex4.dif)} = 2(${Vec.dot(ex4.A, ex4.A)} + ${Vec.dot(ex4.B, ex4.B)})$.`,
      ],
      v: T_EX4,
      n: `Add the matching components to get the sum, which has components two, three and six and magnitude ${W(ex4.ms)}. Subtract them to get the difference, with components eight, minus five and two, and magnitude about ${Wd(ex4.md)}. As a check, the squares of the two magnitudes add up to twice the sum of the squares of the original magnitudes.`,
    }),
    sl('check', 'Quick check: adding vectors', {
      b: 'Work out the answer.',
      v: V.vsub,
      chk: 'sub3d-num',
      n: 'Subtract each component, then take the square root of the sum of squares.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Scalar and vector', 'Vector: magnitude + direction + vector addition; current is a scalar'],
          ['Displacement', 'Δr = r₂ − r₁; depends on the end points only'],
          ['Unit-vector form', 'A = Aₓî + A_yĵ + A_zk̂; |A| = √(Aₓ² + A_y² + A_z²); Â = A/|A|'],
          ['λA', 'magnitude |λ|A; opposite direction if λ < 0'],
          ['Resultant', 'R = √(A² + B² + 2AB cos θ); tan α = B sin θ ÷ (A + B cos θ)'],
          ['Special cases', '0°: A + B; 90°: √(A² + B²); 180°: |A − B|'],
          ['Difference', 'A − B = A + (−B); other diagonal of the parallelogram'],
        ],
        'Summary table of scalars and vectors, displacement, unit-vector form, multiplication by a number, the resultant and its special cases, and the difference',
      ),
      n: 'To sum up. A vector has magnitude and direction and adds by the triangle or parallelogram law. A displacement is the final position minus the initial one. Write vectors with i hat, j hat and k hat, find the magnitude by Pythagoras and the unit vector by dividing. The resultant has magnitude root of A squared plus B squared plus two A B cos theta. Subtraction is addition of the negative.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'In the derivation of $R$ draw the figure with $A$, $B$, $\\theta$, the perpendicular and the right-angled triangle; marks go for the figure, $ON$ and $SN$, the Pythagoras step and the final result.',
        'Say which angle $\\alpha$ is measured from, and whether $\\theta$ is the angle between the vectors placed tail to tail.',
        'In unit-vector problems write each component with its sign; $|\\vec{A} - \\vec{B}|$ is not $A - B$.',
        'Common mistakes: adding magnitudes for non-parallel vectors; forgetting that the unit vector has magnitude 1 and no unit; calling current a vector.',
      ],
      v: T_SPECIAL,
      n: 'In the derivation, draw a neat figure and show every step to the final formula. State clearly which angle alpha is measured from. In unit vector work keep the signs of components, and remember that the magnitude of a difference is not the difference of the magnitudes. Do not add magnitudes of vectors that are not parallel, and do not call electric current a vector.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Vectors — Part 2: Components, dot product and cross product',
  goals: [
    'Resolve a vector into rectangular components in two and three dimensions',
    'Find the resultant of several vectors and its angle from their rectangular components',
    'Define and use the scalar (dot) product, with work as an example, and find the angle between vectors',
    'Define and use the vector (cross) product, with torque as an example, and state the special cases for 0°, 90° and 180°',
  ],
  slides: [
    sl('title', 'Components, dot product and cross product', {
      b: 'Part 2 — splitting a vector along the axes, and the two ways of multiplying two vectors.',
      v: V.resolve,
      n: 'In this part we split a vector into rectangular components, use components to add many vectors, and meet the two products of vectors. The dot product gives a scalar, like work. The cross product gives a vector, like torque. We finish with their special cases at zero, ninety and one hundred and eighty degrees.',
    }),
    sl('concept', 'Resolution into rectangular components', {
      b: r`**Resolving** a vector means replacing it by two or more vectors, **components**, whose sum is the vector. Along perpendicular axes:`,
      m: [r`A_x = A\cos\theta, \quad A_y = A\sin\theta`, r`A = \sqrt{A_x^2 + A_y^2}, \quad \tan\theta = \dfrac{A_y}{A_x}`],
      ul: [
        r`$\theta$ is the angle with the $x$-axis; if it is measured from the $y$-axis, the cosine and sine swap.`,
        r`$\vec{A} = A_x${I} + A_y${J}$; the components and $\vec{A}$ form a right-angled triangle, so $A^2 = A_x^2 + A_y^2$.`,
        'A component can be positive, negative or zero, and never exceeds the magnitude of the vector.',
        'Resolve along any two perpendicular directions that suit the problem, for example along and across a slope.',
      ],
      v: V.resolve,
      n: 'To resolve a vector, replace it by two perpendicular components. If theta is the angle with the x axis, the x component is A cos theta and the y component is A sin theta. The vector is the hypotenuse of the right triangle, so its magnitude is the square root of the sum of the squares, and the tangent of theta is the ratio of the components.',
    }),
    sl('example', 'Worked example 5: pulling a handcart', {
      b: r`A porter pulls a handcart with a rope that exerts ${ex5.F} N at ${ex5.th}$^\circ$ above the horizontal. Find the horizontal and vertical components.`,
      ul: [
        r`$F_x = F\cos\theta = ${ex5.F}\cos ${ex5.th}^\circ = ${d3(ex5.x)}$ N (this part moves the cart forward).`,
        r`$F_y = F\sin\theta = ${ex5.F}\sin ${ex5.th}^\circ = ${d3(ex5.y)}$ N (this part lifts the rope end and eases the load).`,
        r`Check: $\sqrt{${d3(ex5.x)}^2 + ${d3(ex5.y)}^2} = ${d3(ex5.back)}$ N, the original force.`,
      ],
      v: T_COMP,
      n: `The horizontal component is fifty times cosine of thirty degrees, about ${Wd(ex5.x)} newtons, and it moves the cart forward. The vertical component is fifty times sine of thirty degrees, which is ${W(ex5.y)} newtons, and it partly lifts the load. Combining them again gives back fifty newtons.`,
    }),
    sl('concept', 'Resolution in three dimensions', {
      b: r`In space, $\vec{A} = A_x${I} + A_y${J} + A_z${K}$; the components are the edges of a box whose diagonal is $\vec{A}$.`,
      m: [r`A = \sqrt{A_x^2 + A_y^2 + A_z^2}`, r`\cos\alpha = \dfrac{A_x}{A}, \quad \cos\beta = \dfrac{A_y}{A}, \quad \cos\gamma = \dfrac{A_z}{A}`],
      ul: [
        r`$\alpha$, $\beta$, $\gamma$ are the angles that $\vec{A}$ makes with the $x$, $y$ and $z$ axes; the cosines are the **direction cosines**.`,
        r`The unit vector is $\hat{A} = \cos\alpha\,` + I + r` + \cos\beta\,` + J + r` + \cos\gamma\,` + K + r`$, so $\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$.`,
        'Add, subtract and scale 3-D vectors component by component.',
      ],
      v: V.axes3d,
      n: 'In three dimensions a vector has three components, the edges of a box whose diagonal is the vector. Its magnitude is the square root of the sum of the three squares. The angles with the axes have cosines equal to each component divided by the magnitude, the direction cosines, and the sum of their squares is always one.',
    }),
    sl('example', 'Worked example 6: direction cosines', {
      b: r`Find the angles that $\vec{A} = ${ijk(ex6.A)}$ makes with the three axes, and verify that the squares of the direction cosines add to 1.`,
      ul: [
        r`$A = \sqrt{${ex6.A.map((c) => c * c).join(' + ')}} = ${ex6.m}$.`,
        r`$\cos\alpha = \dfrac{${ex6.A[0]}}{${ex6.m}}$, $\cos\beta = \dfrac{${ex6.A[1]}}{${ex6.m}}$, $\cos\gamma = \dfrac{${ex6.A[2]}}{${ex6.m}}$, giving $\alpha = ${d3(ex6.ang[0])}^\circ$, $\beta = ${d3(ex6.ang[1])}^\circ$, $\gamma = ${d3(ex6.ang[2])}^\circ$.`,
        r`Check: $\dfrac{${ex6.A.map((c) => c * c).join(' + ')}}{${ex6.m * ex6.m}} = ${R6(ex6.sq)}$.`,
      ],
      v: T_EX6,
      n: `The magnitude is seven. The direction cosines are two sevenths, three sevenths and six sevenths, which give angles of about ${Wd(ex6.ang[0])}, ${Wd(ex6.ang[1])} and ${Wd(ex6.ang[2])} degrees with the three axes. The squares of the cosines add up to forty nine over forty nine, which is one, so the check works.`,
    }),
    sl('check', 'Quick check: direction angle', {
      b: 'Choose the correct option.',
      v: V.axes3d,
      chk: 'dir3d-mcq',
      n: 'Divide the component by the magnitude and take the inverse cosine.',
    }),
    sl('concept', 'Resultant from rectangular components', {
      b: 'To add many coplanar vectors, add their components. The resultant and its angle follow from the sums:',
      m: [r`\Sigma X = A_x + B_x + C_x + \cdots, \qquad \Sigma Y = A_y + B_y + C_y + \cdots`, r`R = \sqrt{(\Sigma X)^2 + (\Sigma Y)^2}, \qquad \tan\varphi = \dfrac{\Sigma Y}{\Sigma X}`],
      ul: [
        r`$\varphi$ is the angle of $\vec{R}$ with the $x$-axis; the signs of $\Sigma X$ and $\Sigma Y$ tell the quadrant (a calculator gives only $-90^\circ$ to $90^\circ$).`,
        'For two vectors this agrees with $R^2 = A^2 + B^2 + 2AB\\cos\\theta$.',
        'The resultant is zero when $\\Sigma X = 0$ and $\\Sigma Y = 0$: the forces balance.',
      ],
      v: T_RES,
      n: 'To find the resultant of many vectors, resolve each along x and y, add all the x components, add all the y components, and combine the two sums by Pythagoras. The tangent of the angle is the sum of y over the sum of x, and the signs show the quadrant. If both sums are zero the vectors balance and the resultant is the null vector.',
    }),
    sl('example', 'Worked example 7: three ropes on a stuck cart', {
      b: r`Three villagers pull a bullock cart with forces of ${ex7.forces[0][0]} N at ${ex7.forces[0][1]}$^\circ$, ${ex7.forces[1][0]} N at ${ex7.forces[1][1]}$^\circ$ and ${ex7.forces[2][0]} N at ${ex7.forces[2][1]}$^\circ$ from the $+x$ direction. Find the resultant.`,
      ul: [
        r`$\Sigma X = ${d3(ex7.rows[0][2])} + ${d3(ex7.rows[1][2])} + (${d3(ex7.rows[2][2])}) = ${d3(ex7.X)}$ N and $\Sigma Y = ${d3(ex7.rows[0][3])} + ${d3(ex7.rows[1][3])} + (${d3(ex7.rows[2][3])}) = ${d3(ex7.Y)}$ N.`,
        r`$R = \sqrt{${d3(ex7.X)}^2 + ${d3(ex7.Y)}^2} = ${d3(ex7.R)}$ N.`,
        r`$\tan\varphi = \dfrac{${d3(ex7.Y)}}{${d3(ex7.X)}} = ${d3(ex7.Y / ex7.X)}$, so $\varphi = ${d3(ex7.ang)}^\circ$ from $+x$ (first quadrant: both sums positive).`,
      ],
      v: T_EX7,
      n: `Resolve each force. The sum of the x components is ${Wd(ex7.X)} newtons and the sum of the y components is ${Wd(ex7.Y)} newtons. Both are positive, so the resultant lies in the first quadrant. Its magnitude is about ${Wd(ex7.R)} newtons and it makes an angle of about ${Wd(ex7.ang)} degrees with the x axis.`,
    }),
    sl('check', 'Quick check: resultant from components', {
      b: 'Work out the answer.',
      v: T_RES,
      chk: 'resnum-num',
      n: 'Add the x components and the y components separately before combining them.',
    }),
    sl('concept', 'Scalar (dot) product', {
      b: r`The **scalar product** of $\vec{A}$ and $\vec{B}$, with angle $\theta$ between them, is a **scalar**:`,
      m: [r`\vec{A}\cdot\vec{B} = AB\cos\theta`, r`W = \vec{F}\cdot\vec{s} = F s\cos\theta`],
      ul: [
        r`It is the magnitude of one vector times the **projection** of the other on it: $A(B\cos\theta)$.`,
        r`**Work** is the standard example: only the component of the force along the displacement does work, so $W = \vec{F}\cdot\vec{s}$.`,
        'It is positive for $\\theta < 90^\\circ$, zero at $90^\\circ$ and negative for $\\theta > 90^\\circ$.',
        r`Another use: power $P = \vec{F}\cdot\vec{v}$.`,
      ],
      v: V.dot,
      n: 'The scalar or dot product of two vectors is the product of their magnitudes and the cosine of the angle between them. The answer is a scalar. It equals the magnitude of one vector times the projection of the other along it. Work is the standard example: only the part of the force along the displacement does work. The dot product is positive below ninety degrees, zero at ninety, and negative above.',
    }),
    sl('concept', 'Properties and component form of the dot product', {
      b: r`From $\vec{A}\cdot\vec{B} = AB\cos\theta$ and the unit-vector products, the component form follows:`,
      m: [r`\vec{A}\cdot\vec{B} = A_xB_x + A_yB_y + A_zB_z`, r`\cos\theta = \dfrac{\vec{A}\cdot\vec{B}}{AB}`],
      ul: [
        r`$\hat{\imath}\cdot\hat{\imath} = \hat{\jmath}\cdot\hat{\jmath} = \hat{k}\cdot\hat{k} = 1$ ($\theta = 0$) and $\hat{\imath}\cdot\hat{\jmath} = \hat{\jmath}\cdot\hat{k} = \hat{k}\cdot\hat{\imath} = 0$ ($\theta = 90^\circ$).`,
        r`Expand $(A_x\hat{\imath} + A_y\hat{\jmath} + A_z\hat{k})\cdot(B_x\hat{\imath} + B_y\hat{\jmath} + B_z\hat{k})$ with the distributive law; the cross terms vanish.`,
        r`$\vec{A}\cdot\vec{A} = A^2$. Two non-zero vectors are **perpendicular** when $\vec{A}\cdot\vec{B} = 0$.`,
      ],
      v: T_DOTP,
      n: 'The dot product is commutative and distributive. The dot product of a unit vector with itself is one, and with a different unit vector it is zero. Multiplying out the components, only the matching terms survive, so the dot product is A x B x plus A y B y plus A z B z. The cosine of the angle between two vectors is the dot product divided by the product of the magnitudes.',
    }),
    sl('example', 'Worked example 8: work and the angle between two vectors', {
      b: r`A force $\vec{F} = ${ijk(ex8.F)}$ N moves a body through $\vec{s} = ${ijk(ex8.s)}$ m. Find the work done and the angle between $\vec{F}$ and $\vec{s}$.`,
      ul: [
        r`$W = \vec{F}\cdot\vec{s} = (${ex8.F[0]})(${ex8.s[0]}) + (${ex8.F[1]})(${ex8.s[1]}) + (${ex8.F[2]})(${ex8.s[2]}) = ${ex8.W}$ J.`,
        r`$F = \sqrt{${Vec.dot(ex8.F, ex8.F)}} = ${d3(ex8.mF)}$ N and $s = \sqrt{${Vec.dot(ex8.s, ex8.s)}} = ${d3(ex8.ms)}$ m.`,
        r`$\cos\theta = \dfrac{${ex8.W}}{${d3(ex8.mF)} \times ${d3(ex8.ms)}} = ${d3(ex8.cos)}$, so $\theta = ${d3(ex8.ang)}^\circ$ (acute, so the work is positive).`,
      ],
      v: T_EX8,
      n: `Multiply the matching components and add: ten minus six plus twelve, which is ${W(ex8.W)} joules. The magnitudes are the square roots of twenty nine and thirty eight. The cosine of the angle is ${W(ex8.W)} divided by their product, about ${Wd(ex8.cos)}, so the angle is about ${Wd(ex8.ang)} degrees. It is acute, which matches the positive work.`,
    }),
    sl('check', 'Quick check: perpendicular vectors', {
      b: 'Choose the correct option.',
      v: T_DOTP,
      chk: 'dotzero-mcq',
      n: 'Perpendicular vectors have a zero dot product.',
    }),
    sl('concept', 'Vector (cross) product', {
      b: r`The **vector product** of $\vec{A}$ and $\vec{B}$ is a **vector** of magnitude $AB\sin\theta$:`,
      m: [r`\vec{A}\times\vec{B} = AB\sin\theta\,\hat{n}`, r`\vec{\tau} = \vec{r}\times\vec{F}, \qquad \tau = rF\sin\theta`],
      ul: [
        r`$\hat{n}$ is perpendicular to the plane of $\vec{A}$ and $\vec{B}$, given by the **right-hand screw rule**: turn a right-handed screw from $\vec{A}$ to $\vec{B}$ through the smaller angle; it advances along $\hat{n}$.`,
        r`The magnitude equals the **area of the parallelogram** on $\vec{A}$ and $\vec{B}$.`,
        r`**Torque** is the standard example: $\vec{\tau} = \vec{r}\times\vec{F}$, with $\vec{r}$ from the axis to the point of application of the force.`,
      ],
      v: V.cross,
      n: 'The vector or cross product of two vectors has magnitude A B sin theta and a direction perpendicular to both, given by the right hand screw rule. Its magnitude equals the area of the parallelogram on the two vectors. Torque is the standard example: the cross product of the position vector from the axis with the force.',
    }),
    sl('concept', 'Properties and component form of the cross product', {
      b: r`Reversing the order reverses the direction; unit vectors follow a cyclic pattern.`,
      m: [r`\vec{A}\times\vec{B} = (A_yB_z - A_zB_y)\hat{\imath} + (A_zB_x - A_xB_z)\hat{\jmath} + (A_xB_y - A_yB_x)\hat{k}`, r`\vec{A}\times\vec{B} = \begin{vmatrix} \hat{\imath} & \hat{\jmath} & \hat{k} \\ A_x & A_y & A_z \\ B_x & B_y & B_z \end{vmatrix}`],
      ul: [
        r`$\hat{\imath}\times\hat{\jmath} = \hat{k}$, $\hat{\jmath}\times\hat{k} = \hat{\imath}$, $\hat{k}\times\hat{\imath} = \hat{\jmath}$; $\hat{\imath}\times\hat{\imath} = 0$ and so on.`,
        r`$\vec{B}\times\vec{A} = -(\vec{A}\times\vec{B})$: the cross product is **not** commutative. $\vec{A}\times\vec{A} = \vec{0}$.`,
        r`Distributive: $\vec{A}\times(\vec{B} + \vec{C}) = \vec{A}\times\vec{B} + \vec{A}\times\vec{C}$.`,
      ],
      v: T_CROSSP,
      n: 'Reversing the order of the cross product reverses its direction, so it is not commutative. A vector crossed with itself is zero. For the unit vectors, i hat cross j hat is k hat, j hat cross k hat is i hat, and k hat cross i hat is j hat, and the reverse orders give negatives. Multiplying out gives the component form, which you can remember as a three by three determinant.',
    }),
    sl('example', 'Worked example 9: a cross product and a torque', {
      b: r`(a) Find $\vec{A}\times\vec{B}$ for $\vec{A} = ${ijk(ex9.A)}$ and $\vec{B} = ${ijk(ex9.B)}$. (b) A force $\vec{F} = ${ijk(ex10.F)}$ N acts at $\vec{r} = ${ijk(ex10.r)}$ m. Find the torque.`,
      ul: [
        r`(a) $\vec{A}\times\vec{B} = ((${ex9.A[1]})(${ex9.B[2]}) - (${ex9.A[2]})(${ex9.B[1]}))${I} + ((${ex9.A[2]})(${ex9.B[0]}) - (${ex9.A[0]})(${ex9.B[2]}))${J} + ((${ex9.A[0]})(${ex9.B[1]}) - (${ex9.A[1]})(${ex9.B[0]}))${K} = ${ijk(ex9.C)}$.`,
        r`Check: $\vec{A}\cdot(\vec{A}\times\vec{B}) = ${ex9.pa}$ and $\vec{B}\cdot(\vec{A}\times\vec{B}) = ${ex9.pb}$, so it is perpendicular to both; $|\vec{A}\times\vec{B}| = \sqrt{${Vec.dot(ex9.C, ex9.C)}} = ${d3(ex9.m)}$.`,
        r`(b) $\vec{\tau} = \vec{r}\times\vec{F} = (0.3)(40)${K} = ${ex10.tau[2]}${K}$ N m: magnitude ${ex10.m} N m, along $+z$ (anticlockwise turning).`,
      ],
      v: V.cross,
      n: `For part a, use the component formula. The result has components minus two, minus eight and minus seven. As a check, its dot product with each original vector is zero, so it is perpendicular to both. For part b, only the y component of the force, forty newtons, acts at right angles to the radius of point three metres, so the torque is ${W(ex10.m)} newton metres along the z axis.`,
    }),
    sl('check', 'Quick check: reversing a cross product', {
      b: 'Judge the assertion and the reason.',
      v: T_CROSSP,
      chk: 'cross-ar',
      n: 'Think about what happens to the direction when the order is reversed.',
    }),
    sl('concept', 'Dot and cross products at 0°, 90° and 180°', {
      b: 'Two products, two special-angle patterns:',
      ul: [
        r`**Parallel** ($\theta = 0^\circ$): $\vec{A}\cdot\vec{B} = AB$ (largest) and $\vec{A}\times\vec{B} = \vec{0}$.`,
        r`**Perpendicular** ($\theta = 90^\circ$): $\vec{A}\cdot\vec{B} = 0$ and $|\vec{A}\times\vec{B}| = AB$ (largest).`,
        r`**Antiparallel** ($\theta = 180^\circ$): $\vec{A}\cdot\vec{B} = -AB$ and $\vec{A}\times\vec{B} = \vec{0}$.`,
        'Dot product: a scalar, commutative, measures how much two vectors point the same way. Cross product: a vector, not commutative, measures how much they are at right angles.',
      ],
      v: T_SPEC2,
      n: 'At zero degrees the dot product is largest and the cross product vanishes. At ninety degrees the dot product vanishes and the cross product is largest. At one hundred and eighty degrees the dot product is the most negative and the cross product again vanishes. The dot product is a commutative scalar; the cross product is a vector that changes sign when the order is reversed.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Rectangular components', 'Aₓ = A cos θ, A_y = A sin θ; A = √(Aₓ² + A_y²); 3-D: add A_z'],
          ['Direction cosines', 'cos α = Aₓ/A, … ; cos²α + cos²β + cos²γ = 1'],
          ['Resultant from components', 'R = √((ΣX)² + (ΣY)²); tan φ = ΣY/ΣX'],
          ['Dot product', 'A·B = AB cos θ = AₓBₓ + A_yB_y + A_zB_z; work W = F·s'],
          ['Cross product', 'A × B = AB sin θ n̂ (right-hand screw); torque τ = r × F'],
          ['Special angles', '0°: A·B = AB, A × B = 0; 90°: A·B = 0, |A × B| = AB; 180°: A·B = −AB, A × B = 0'],
        ],
        'Summary table of components, direction cosines, the resultant from components, the dot product, the cross product and their special angles',
      ),
      n: 'To sum up. Resolve a vector into A cos theta and A sin theta, and recover its size by Pythagoras. For many forces, add the x and y components separately. The dot product is a scalar, A B cos theta, equal to the sum of products of matching components, and gives work. The cross product is a vector of magnitude A B sin theta along the right hand screw direction, and gives torque.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Draw the axes and mark the angle before resolving; check with $\\sqrt{A_x^2 + A_y^2} = A$.',
        'When the angle is measured from the $y$-axis the components swap: $A_x = A\\sin\\theta$.',
        'Write the dot product as a sum of three products and the cross product as a determinant, line by line; give the unit of work (J) or torque (N m) and the direction of $\\vec{\\tau}$.',
        'State the right-hand screw rule when asked for the direction of a cross product.',
        'Common mistakes: using $\\tan^{-1}$ without checking the quadrant; $\\vec{A}\\times\\vec{B} = \\vec{B}\\times\\vec{A}$; treating the dot product as a vector.',
      ],
      v: T_SPEC2,
      n: 'Draw the axes and the angle before resolving, and check your components with Pythagoras. If the angle is measured from the y axis, sine and cosine swap. Write the dot product as a sum of three products and the cross product as a determinant. State the right hand screw rule for direction, and give the unit of work or torque. Do not swap the order of a cross product without changing its sign.',
    }),
  ],
});

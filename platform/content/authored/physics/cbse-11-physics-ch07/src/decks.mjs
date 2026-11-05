// ch07 Gravitation — two decks: Part 1 (t01–t02) Kepler's laws, the universal law of gravitation, superposition, g and its variation with
// height and depth; Part 2 (t03–t04) potential energy and potential, escape speed, orbital speed and the energy of a satellite.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { G, ME, RE, g, GM, GMg, MARS, MOON, R6, pull } from './phys.mjs';
import * as V0 from './svgs.mjs';

const X = (x, n = 3) => sci(x, n);

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { a: 2.25 };
ex1.T = ex1.a ** 1.5;
const ex2 = { Ms: 2.0e30, Me: 6.0e24, r: 1.5e11 };
ex2.F = pull(ex2.Ms, ex2.Me, ex2.r);
const ex3 = V0.SUP;
const ex4 = { M: MOON.M, R: MOON.R };
ex4.g = (G * ex4.M) / ex4.R ** 2;
const ex5 = { h: 3.2e5 };
ex5.x = ex5.h / RE;
ex5.exact = g / (1 + ex5.x) ** 2;
ex5.approx = g * (1 - 2 * ex5.x);
ex5.depth = g * (1 - ex5.x);
const PL = [
  ['Mercury', 0.387, 0.241],
  ['Venus', 0.723, 0.615],
  ['Earth', 1.0, 1.0],
  ['Mars', 1.524, 1.881],
  ['Jupiter', 5.203, 11.86],
  ['Saturn', 9.537, 29.46],
];

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const p1 = { m: 250, r: 1.0e7 };
p1.U = (-GM * p1.m) / p1.r;
const p2 = { m1: 5.0, m2: 10.0, d: 0.5, x: 0.2 };
p2.V = -G * (p2.m1 / p2.x + p2.m2 / (p2.d - p2.x));
const p3 = { m: 120, h: 3.2e6 };
p3.dU = (p3.m * g * RE * p3.h) / (RE + p3.h);
p3.naive = p3.m * g * p3.h;
const p4 = { M: MARS.M, R: MARS.R };
p4.ve = Math.sqrt((2 * G * p4.M) / p4.R);
p4.vc = p4.ve / Math.SQRT2;
const p5 = { h: RE };
p5.r = RE + p5.h;
p5.v = Math.sqrt((g * RE * RE) / p5.r);
p5.T = (2 * Math.PI * p5.r) / p5.v;
const p6 = { m: 400, r1: 8.0e6, r2: 1.2e7 };
p6.dE = ((GM * p6.m) / 2) * (1 / p6.r1 - 1 / p6.r2);
p6.E1 = (-GM * p6.m) / (2 * p6.r1);
p6.E2 = (-GM * p6.m) / (2 * p6.r2);
const veEarth = Math.sqrt((2 * GM) / RE);
const veMoon = Math.sqrt((2 * G * MOON.M) / MOON.R);

export const EX = { ex1, ex2, ex3, ex4, ex5, p1, p2, p3, p4, p5, p6, veEarth, veMoon, PL };

// ---------------------------------------------------------------- visuals
export const V = {
  kepler: svgV(V0.KEPLER, 'An ellipse with the Sun at one focus; two shaded wedges swept in equal times have equal areas, so the planet is fastest at perihelion and slowest at aphelion', 'Equal areas in equal times: the planet speeds up near the Sun.'),
  sup: svgV(V0.SUPER, 'Three masses at the corners of a 3-4-5 triangle with the two pulls on the 4 kilogram mass drawn at right angles and their vector sum as the net force', 'Add the pulls as vectors: gravity obeys superposition.'),
  earthg: svgV(V0.EARTHG, 'Earth cross-section with a point at height R above the surface, where g is a quarter of its surface value, and a point at depth R over 2, where g is half', 'g falls both above and below the surface.'),
  cannon: svgV(V0.CANNON, 'Newton cannon: launches at less than, equal to, a little more than and root two times the circular speed give a fall back, a circle, an ellipse and an escape', 'Faster launches go farther; at root two times the circular speed the body escapes.'),
  orbit: svgV(V0.ORBIT, 'A satellite in a circular orbit of radius twice the Earth radius with the force towards the centre and the velocity along the tangent', 'Force towards the centre, velocity along the tangent.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotKepler = plot(
  {
    x: ax('a³ (AU³)', 0, 900),
    y: ax('T² (year²)', 0, 900),
    functions: [{ expr: 'x', label: 'T² = a³ (T in years, a in AU)', domain: [0, 900] }],
    series: [{ label: 'six planets (a³, T²)', kind: 'scatter', points: PL.map(([, a, T]) => [R6(a ** 3), R6(T * T)]) }],
  },
  'Plot of the square of the orbital period in years against the cube of the mean distance in astronomical units for the six inner planets: the points lie on the straight line through the origin with slope one',
  'T² is proportional to a³: all planets lie on one straight line.',
);
export const plotG = plot(
  {
    x: ax('distance from the centre, r / R', 0, 4),
    y: ax('g′ / g', 0, 1.1),
    functions: [
      { expr: 'x', label: 'inside (uniform density): g′ = g r/R', domain: [0, 1] },
      { expr: '1/x^2', label: 'outside: g′ = g R²/r²', domain: [1, 4] },
    ],
    vlines: [{ x: 1, label: 'surface', dashed: true }],
  },
  'Graph of g divided by its surface value against distance from the Earth centre in units of the radius: a straight line rising from zero at the centre to one at the surface, then an inverse-square fall outside',
  'g is zero at the centre, largest at the surface and falls as 1/r² outside.',
);
export const plotU = plot(
  {
    x: ax('distance from the centre, r / R', 1, 8),
    y: ax('U / (G M m / R)', -1.1, 0.1),
    functions: [{ expr: '-1/x', label: 'U = −G M m / r', domain: [1, 8] }],
    hlines: [{ y: 0, label: 'U = 0 at infinity', dashed: true }],
  },
  'Graph of gravitational potential energy in units of GMm over R against distance in units of R: a curve starting at minus one at the surface and rising towards zero at large distance',
  'U is negative everywhere and rises towards 0 as r increases.',
);
export const plotE = plot(
  {
    x: ax('orbit radius, r / R', 1, 6),
    y: ax('energy / (G M m / R)', -1.1, 0.6),
    functions: [
      { expr: '0.5/x', label: 'K = G M m / 2r', domain: [1, 6] },
      { expr: '-1/x', label: 'U = −G M m / r', domain: [1, 6] },
      { expr: '-0.5/x', label: 'E = K + U = −G M m / 2r', domain: [1, 6] },
    ],
    hlines: [{ y: 0, label: 'E = 0: free', dashed: true }],
  },
  'Graph of kinetic, potential and total energy of a satellite in a circular orbit against orbit radius: kinetic energy positive and falling, potential energy negative and twice as large in magnitude as the total, total energy negative and equal to minus the kinetic energy',
  'E = −K = U/2 at every orbit radius.',
);
export const plotVorb = plot(
  {
    x: ax('orbit radius r (10⁶ m)', 6.4, 20),
    y: ax('speed (km/s)', 0, 12),
    functions: [
      { expr: `sqrt(${GM / 1e12}/x)`, label: 'orbital speed v = √(GM/r)', domain: [6.4, 20] },
      { expr: `sqrt(${(2 * GM) / 1e12}/x)`, label: 'escape speed = √2 × orbital speed', domain: [6.4, 20] },
    ],
  },
  'Graph of orbital speed and escape speed in kilometres per second against distance from the Earth centre: both fall with distance and the escape curve is root two times higher',
  'Higher orbits are slower; escape speed is always √2 times the orbital speed at the same r.',
);

// ---------------------------------------------------------------- tables
const T1 = table(
  ['Law', 'Statement', 'Physical reason'],
  [
    ['1. Orbits', 'A planet moves in an ellipse with the Sun at one focus', 'Inverse-square attraction'],
    ['2. Areas', 'The line from Sun to planet sweeps equal areas in equal times', 'Force along the line: angular momentum is constant'],
    ['3. Periods', 'T² is proportional to a³ (a = semi-major axis)', 'Gravity falls as 1/r²'],
  ],
  'Table of Kepler three laws, what each states and its physical reason',
);
const T2 = table(
  ['Planet', 'a (AU)', 'T (year)', 'T² / a³'],
  PL.map(([n, a, T]) => [n, String(a), String(T), dec(T ** 2 / a ** 3, 3)]),
  'Table of the mean distance in astronomical units and the period in years of six planets and the ratio T squared over a cubed, which is about one for each',
);
const T3 = table(
  ['Where', 'g′', 'Condition'],
  [
    ['At the surface', 'G M / R²', 'Spherical Earth of mass M'],
    ['Height h above', 'g R² / (R + h)² ≈ g (1 − 2h/R)', 'h much less than R for the approximation'],
    ['Depth d below', 'g (1 − d/R)', 'Uniform density; only the inner sphere pulls'],
    ['Centre', '0', 'Equal pulls all round'],
  ],
  'Table of the acceleration due to gravity at the surface, at a height, at a depth and at the centre of the Earth',
);
const T4 = table(
  ['Quantity', 'Symbol', 'Unit', 'Kind'],
  [
    ['Gravitational potential energy of m at distance r', 'U = −G M m / r', 'joule', 'Scalar, belongs to the pair'],
    ['Gravitational potential at distance r', 'V = −G M / r', 'joule per kilogram', 'Scalar, belongs to the point'],
    ['Link', 'U = m V', '', 'Potential energy = mass × potential'],
  ],
  'Table comparing gravitational potential energy and gravitational potential: symbol, unit and kind',
);
const mghRows = [1e3, 1e4, 1e5, 6.4e5, 6.4e6].map((h) => [`${h / 1e3} km`, dec((h * g * RE) / (RE + h) / 1e3, 3), dec((g * h) / 1e3, 3), `${dec((1 - RE / (RE + h)) * 100, 3)} %`]);
const T5 = table(
  ['Height h', 'Exact ΔU per kg (kJ)', 'g h per kg (kJ)', 'g h is too big by'],
  mghRows,
  'Table comparing the exact change of potential energy per kilogram with g h for heights from 1 kilometre to 6400 kilometres',
);
const T6 = table(
  ['Body', 'M (kg)', 'R (m)', 'Escape speed'],
  [
    ['Earth', '6.0 × 10²⁴', '6.4 × 10⁶', `${dec(veEarth / 1e3, 3)} km/s`],
    ['Moon', '7.35 × 10²²', '1.74 × 10⁶', `${dec(veMoon / 1e3, 3)} km/s`],
    ['Mars', '6.4 × 10²³', '3.4 × 10⁶', `${dec(p4.ve / 1e3, 3)} km/s`],
  ],
  'Table of the mass, radius and escape speed of the Earth, the Moon and Mars computed from root of 2GM over R',
);
const T7 = table(
  ['Quantity (circular orbit, radius r)', 'Formula'],
  [
    ['Orbital speed', 'v = √(G M / r)'],
    ['Period', 'T = 2π √(r³ / G M)'],
    ['Kinetic energy', 'K = G M m / 2r'],
    ['Potential energy', 'U = −G M m / r'],
    ['Total energy', 'E = −G M m / 2r = −K'],
    ['Escape speed at the same r', '√2 × v'],
  ],
  'Table of formulae for a satellite in a circular orbit: speed, period, kinetic, potential and total energy, and the escape speed',
);
export const TABLES = { T1, T2, T3, T4, T5, T6, T7 };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Gravitation — Part 1: Kepler’s laws, universal gravitation and g',
  goals: [
    'State Kepler’s three laws and use the law of periods and the law of areas',
    'Apply Newton’s law of gravitation to two and to several masses (superposition)',
    'Find g from G, M and R, and derive how g changes with height and depth',
  ],
  slides: [
    sl('title', 'Gravitation', {
      b: 'Part 1 — how planets move, how masses attract, and how g changes as you climb or dig.',
      v: V.kepler,
      n: 'A cricket ball, the Moon and a satellite launched from Sriharikota all obey one law of attraction. In this part we start from the way planets move round the Sun, meet Newton’s law of gravitation, add up the pulls of several masses, and then see how the acceleration due to gravity changes with height and depth.',
    }),
    sl('concept', 'Kepler’s three laws', {
      b: 'Kepler summarised the motion of the planets in three laws:',
      ul: [
        '**Law of orbits:** every planet moves in an **ellipse** with the Sun at one **focus**.',
        '**Law of areas:** the line from the Sun to the planet sweeps out **equal areas in equal times**.',
        r`**Law of periods:** the square of the period is proportional to the cube of the semi-major axis, $T^2 \propto a^3$.`,
        'The point of the orbit nearest the Sun is **perihelion**, the farthest is **aphelion**.',
      ],
      v: T1,
      n: 'Kepler found three rules in the observations of the planets. First, each orbit is an ellipse with the Sun at one focus. Second, the line joining the Sun and the planet sweeps equal areas in equal times. Third, the square of the period is proportional to the cube of the semi-major axis. The nearest point to the Sun is called perihelion and the farthest point aphelion.',
    }),
    sl('diagram', 'The law of areas: fast near the Sun, slow far away', {
      b: 'In the picture the two wedges are swept in the same time interval.',
      ul: [
        'Equal areas in equal times means the planet moves **faster near perihelion** and slower near aphelion.',
        r`The area swept per second is $\dfrac{dA}{dt} = \dfrac{L}{2m}$, where $L$ is the angular momentum about the Sun.`,
        'Gravity acts along the line to the Sun, so its torque about the Sun is zero and L stays constant.',
        r`At the two extreme points $v_p r_p = v_a r_a$, so the speed ratio is the inverse of the distance ratio.`,
      ],
      v: V.kepler,
      n: 'Look at the two shaded wedges. They are swept in the same time, so they have the same area. The wedge near the Sun is short and wide, so the planet must cover a long arc, and it moves quickly. The wedge far from the Sun is long and thin, so the arc is short and the planet is slow. This is conservation of angular momentum, because gravity pulls straight towards the Sun.',
    }),
    sl('concept', 'The law of periods', {
      b: r`For orbits of different size around the same Sun, $\dfrac{T^2}{a^3}$ is the same constant.`,
      m: [r`T^2 = \dfrac{4\pi^2}{G M}\, r^3 \quad \text{(circular orbit of radius } r\text{)}`],
      ul: [
        'In years and astronomical units (AU) the constant is 1 for the Sun: T² = a³.',
        'A larger orbit has a longer period, and disproportionately so: double the radius, period × 2√2.',
        'The table shows six planets; T²/a³ is 1.00 within the accuracy of the data.',
        r`Circular orbit: set $\dfrac{G M m}{r^2} = m \omega^2 r$ with $\omega = \dfrac{2\pi}{T}$ to get the formula above.`,
      ],
      v: plotKepler,
      n: 'The law of periods says that the square of the period divided by the cube of the mean distance is the same for every planet. Measure the period in years and the distance in astronomical units, and the constant for the Sun is exactly one. The graph shows all six inner planets falling on a single straight line. For a circular orbit you can derive the law by equating the gravitational force to the mass times omega squared times radius.',
    }),
    sl('example', 'Worked example 1: a small body far from the Sun', {
      b: r`A small body orbits the Sun at a mean distance of $${ex1.a}$ AU. Using Earth ($T = 1$ year at $1$ AU), find its period.`,
      ul: [
        r`$\dfrac{T^2}{a^3}$ is the same for both: $\dfrac{T^2}{${ex1.a}^3} = \dfrac{1^2}{1^3}$.`,
        r`$T^2 = ${ex1.a}^3 = ${dec(ex1.a ** 3, 5)}$, so $T = \sqrt{${dec(ex1.a ** 3, 5)}} = ${dec(ex1.T, 4)}$ year.`,
        r`Note: $T = a^{3/2} = ${ex1.a}^{1.5}$; the body takes ${dec(ex1.T, 4)} times as long as Earth.`,
      ],
      v: plotKepler,
      n: `Compare with Earth, whose period is one year at one astronomical unit. The ratio of period squared to distance cubed must be one for the small body too. The distance cubed is ${dec(ex1.a ** 3, 5)}, so the period squared is the same number, and the period is ${dec(ex1.T, 4)} years.`,
    }),
    sl('check', 'Quick check: where is the comet fastest?', {
      b: 'Choose the correct option.',
      v: V.kepler,
      chk: 'comet-mcq',
      n: 'Think about the law of areas.',
    }),
    sl('concept', 'Newton’s universal law of gravitation', {
      b: 'Every particle attracts every other particle with a force along the line joining them:',
      m: [r`F = \dfrac{G\, m_1 m_2}{r^2}, \qquad G = 6.67 \times 10^{-11}\ \text{N m}^2\,\text{kg}^{-2}`],
      ul: [
        'The force is **always attractive**, **mutual** (equal and opposite on the two bodies) and acts along the line joining them.',
        'It varies as 1/r²: double the distance and the force falls to one quarter.',
        'G is a universal constant, the same everywhere; it is so small that gravity between everyday objects is negligible.',
        'A uniform sphere attracts outside bodies as if all its mass were at its centre.',
      ],
      v: V.sup,
      n: 'Newton’s law says that two point masses attract with a force proportional to the product of the masses and inversely proportional to the square of the distance between them. The force acts along the line joining them, it is always attractive, and the two bodies pull on each other with equal and opposite forces. The constant G is very small, about six point six seven times ten to the power minus eleven in SI units, so the pull between everyday objects is tiny.',
    }),
    sl('example', 'Worked example 2: the Sun pulls the Earth', {
      b: r`Take $M_S = 2.0 \times 10^{30}$ kg, $M_E = 6.0 \times 10^{24}$ kg and the Sun–Earth distance $1.5 \times 10^{11}$ m. Find the force of attraction.`,
      ul: [
        r`$F = \dfrac{G M_S M_E}{r^2} = \dfrac{6.67 \times 10^{-11} \times 2.0 \times 10^{30} \times 6.0 \times 10^{24}}{(1.5 \times 10^{11})^2}$`,
        r`$= \dfrac{${X(G * ex2.Ms * ex2.Me)}}{${X(ex2.r ** 2)}} = ${X(ex2.F)}$ N.`,
        'The same force acts on the Sun (Newton’s third law), but the Sun’s acceleration is tiny because its mass is huge.',
      ],
      v: V.kepler,
      n: `Multiply the constant of gravitation by the two masses and divide by the square of the distance. The result is about ${dec(ex2.F / 1e22, 3)} times ten to the power twenty two newtons. The Earth pulls on the Sun with exactly the same force, but the Sun is so massive that its acceleration is negligible.`,
    }),
    sl('concept', 'Superposition: the pull of several masses', {
      b: 'The force on a body due to several masses is the **vector sum** of the individual forces; each pair acts as if the others were absent.',
      ul: [
        r`$\vec F = \vec F_1 + \vec F_2 + \dots$, each $F_i = \dfrac{G m M_i}{r_i^2}$ directed towards mass $M_i$.`,
        'Draw each force along its line, then add the vectors by components or with the parallelogram law.',
        'Forces from two equal masses on opposite sides of a body cancel on the line between them: there is a point of zero net force.',
        'Sum for a few masses; for a uniform sphere the sum reduces to a single force at the centre.',
      ],
      v: V.sup,
      n: 'Gravity obeys superposition. To find the force on one body from several others, work out the pull of each one separately, along its own line, and then add the forces as vectors. If two equal masses lie on opposite sides of a body, their pulls point opposite ways and cancel on the line between them.',
    }),
    sl('example', 'Worked example 3: pulls at right angles', {
      b: r`A $${ex3.mA}$ kg mass A has a $${ex3.mB}$ kg mass B at $${ex3.rB}$ m along $+x$ and a $${ex3.mC}$ kg mass C at $${ex3.rC}$ m along $+y$. Find the net gravitational force on A.`,
      ul: [
        r`$F_{AB} = \dfrac{G m_A m_B}{r_B^2} = \dfrac{6.67 \times 10^{-11} \times ${ex3.mA} \times ${ex3.mB}}{${ex3.rB}^2} = ${dec(ex3.FB * 1e9, 3)} \times 10^{-9}$ N, along $+x$.`,
        r`$F_{AC} = \dfrac{6.67 \times 10^{-11} \times ${ex3.mA} \times ${ex3.mC}}{${ex3.rC}^2} = ${dec(ex3.FC * 1e9, 3)} \times 10^{-9}$ N, along $+y$.`,
        r`The forces are perpendicular: $F = \sqrt{F_{AB}^2 + F_{AC}^2} = ${dec(ex3.F * 1e9, 3)} \times 10^{-9}$ N.`,
        r`Direction: $\tan\theta = \dfrac{F_{AC}}{F_{AB}} = ${dec(ex3.FC / ex3.FB, 3)}$, so $\theta \approx ${dec(ex3.ang, 3)}^\circ$ from AB towards AC.`,
      ],
      v: V.sup,
      n: `The pull of B along the x axis is ${dec(ex3.FB * 1e9, 3)} nanonewtons and the pull of C along the y axis is ${dec(ex3.FC * 1e9, 3)} nanonewtons. They are at right angles, so the resultant is the square root of the sum of their squares, ${dec(ex3.F * 1e9, 3)} nanonewtons, at about ${dec(ex3.ang, 3)} degrees from the line to B.`,
    }),
    sl('check', 'Quick check: two attractions', {
      b: 'Compute the force.',
      v: V.sup,
      chk: 'tanker-num',
      n: 'Use the formula with the stated masses and distance.',
    }),
    sl('concept', 'Acceleration due to gravity from G, M and R', {
      b: r`A body of mass $m$ at the surface of a planet of mass $M$ and radius $R$ is pulled with $F = \dfrac{G M m}{R^2} = m g$.`,
      m: [r`g = \dfrac{G M}{R^2} = \dfrac{4}{3}\pi G \rho R`],
      ul: [
        'g does not depend on the mass m of the falling body, so all bodies fall alike (air resistance apart).',
        r`For the Earth, $\dfrac{GM}{R^2} = \dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24}}{(6.4 \times 10^6)^2} \approx ${dec(GM / RE ** 2, 3)}$ m s$^{-2}$; we use $9.8$ m s$^{-2}$.`,
        'Weight of a body is mg: the pull of the planet on it. Mass is a property of the body; weight changes with g.',
        'Larger radius at fixed density means larger g; the Moon, being smaller, has a smaller g.',
      ],
      v: T3,
      n: 'At the surface the weight of a body is the gravitational pull, so g equals G M over R squared. It does not depend on the mass of the falling body. For the Earth it comes to about nine point eight metres per second squared. A planet of the same density but larger radius has a larger g, because g is four thirds pi G rho R.',
    }),
    sl('example', 'Worked example 4: g on the Moon', {
      b: r`The Moon has $M = 7.35 \times 10^{22}$ kg and $R = 1.74 \times 10^6$ m. Find g on its surface and the weight of a $60$ kg astronaut there.`,
      ul: [
        r`$g_M = \dfrac{G M}{R^2} = \dfrac{6.67 \times 10^{-11} \times 7.35 \times 10^{22}}{(1.74 \times 10^6)^2} = \dfrac{${X(G * ex4.M)}}{${X(ex4.R ** 2)}} = ${dec(ex4.g, 3)}$ m s$^{-2}$.`,
        r`Weight $= m g_M = 60 \times ${dec(ex4.g, 3)} = ${dec(60 * ex4.g, 3)}$ N, about $\dfrac{1}{6}$ of her weight on the Earth.`,
      ],
      v: T3,
      n: `Put the Moon’s mass and radius into G M over R squared. The answer is about ${dec(ex4.g, 3)} metres per second squared, roughly one sixth of the Earth’s value. A sixty kilogram astronaut therefore weighs about ${dec(60 * ex4.g, 3)} newtons on the Moon, while her mass is still sixty kilograms.`,
    }),
    sl('concept', 'g above the surface', {
      b: r`At height $h$ the distance from the centre is $R + h$, so $g' = \dfrac{G M}{(R+h)^2}$.`,
      m: [r`g' = g\left(\dfrac{R}{R+h}\right)^2 = g\left(1 + \dfrac{h}{R}\right)^{-2} \approx g\left(1 - \dfrac{2h}{R}\right) \quad (h \ll R)`],
      ul: [
        'g′ decreases with height; at h = R it is g/4.',
        r`Binomial approximation $(1 + x)^{-2} \approx 1 - 2x$ is good only for small $x = h/R$.`,
        'Weight falls in the same proportion: a body weighs less at the top of a mountain.',
      ],
      v: V.earthg,
      n: 'Above the surface, the distance from the centre of the Earth is the radius plus the height, so g falls as the inverse square of that distance. At a height equal to the radius, g is a quarter of its surface value. For heights much smaller than the radius, the binomial theorem gives g prime approximately equal to g times one minus two h over R.',
    }),
    sl('concept', 'g below the surface', {
      b: r`Assume a uniform Earth of density $\rho$. A body at depth $d$ is at distance $r = R - d$ from the centre.`,
      ul: [
        'The shell above it pulls with zero net force on the body; only the **inner sphere** of radius r attracts it, as if its mass were at the centre.',
        r`Inner mass $= \dfrac{4}{3}\pi r^3 \rho$, so $g' = \dfrac{G \cdot \frac{4}{3}\pi r^3 \rho}{r^2} = \dfrac{4}{3}\pi G \rho\, r = g\,\dfrac{r}{R}$.`,
        r`Hence $g' = g\left(1 - \dfrac{d}{R}\right)$: linear fall to **zero at the centre**.`,
        'Real Earth is denser near the centre, so the true g first rises slightly with depth; the uniform model is the textbook approximation.',
      ],
      v: plotG,
      n: 'Inside a uniform Earth, the shell of matter outside the body pulls with no net force. Only the inner sphere of radius r attracts it. Its mass is proportional to r cubed, so g prime is proportional to r. That gives g prime equals g times one minus d over R, falling in a straight line to zero at the centre. The graph shows this linear fall inside and the inverse square fall outside.',
    }),
    sl('example', 'Worked example 5: a 320 km climb and a 320 km dig', {
      b: r`Take $g = 9.8$ m s$^{-2}$ and $R = 6.4 \times 10^6$ m. Find g at a height of $320$ km, by the exact and the approximate formulas, and at a depth of $320$ km.`,
      ul: [
        r`$\dfrac{h}{R} = \dfrac{3.2 \times 10^5}{6.4 \times 10^6} = ${ex5.x}$.`,
        r`Exact: $g' = \dfrac{9.8}{(1 + ${ex5.x})^2} = ${dec(ex5.exact, 4)}$ m s$^{-2}$. Approximate: $9.8\,(1 - 2 \times ${ex5.x}) = ${dec(ex5.approx, 4)}$ m s$^{-2}$.`,
        r`Depth: $g' = 9.8\,(1 - ${ex5.x}) = ${dec(ex5.depth, 4)}$ m s$^{-2}$.`,
        'The same distance fall is about twice as big for a climb as for a dig (2h/R against d/R).',
      ],
      v: V.earthg,
      n: `The ratio of height to radius is point zero five. The exact formula gives ${dec(ex5.exact, 4)} metres per second squared, and the approximate formula gives ${dec(ex5.approx, 4)}, which is already close. At the same depth below the surface, g is ${dec(ex5.depth, 4)}. Notice that climbing reduces g about twice as much as digging the same distance.`,
    }),
    sl('check', 'Quick check: g inside the Earth', {
      b: 'Compute g at depth.',
      v: plotG,
      chk: 'depth-num',
      n: 'Use g prime equals g times one minus d over R.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Kepler 1, 2, 3', 'Ellipse with the Sun at a focus; equal areas in equal times; T² ∝ a³'],
          ['Law of gravitation', 'F = G m₁m₂/r², attractive, mutual, along the line; G = 6.67 × 10⁻¹¹ N m² kg⁻²'],
          ['Superposition', 'Add the pulls of several masses as vectors'],
          ['g at the surface', 'g = G M/R²'],
          ['g at height h', 'g R²/(R+h)² ≈ g (1 − 2h/R)'],
          ['g at depth d', 'g (1 − d/R); zero at the centre'],
        ],
        'Summary table of Kepler laws, the law of gravitation, superposition and the variation of g',
      ),
      n: 'To sum up. Planets move in ellipses, sweep equal areas in equal times, and have periods whose squares go as the cubes of their distances. Two masses attract with a force G m one m two over r squared; several masses add as vectors. The acceleration due to gravity at the surface is G M over R squared. It falls with height roughly as one minus two h over R, and with depth as one minus d over R.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State the three laws in words; for T² ∝ a³ use a (semi-major axis) for ellipses and r for circles.',
        'Draw each force on its own line before adding: gravity problems with several masses are vector problems.',
        'Say which formula for g′ applies: inverse square for height (exact), linear for depth (uniform Earth).',
        'Use the approximation 1 − 2h/R only when h is small compared with R; otherwise use the exact form.',
      ],
      v: T3,
      n: 'Quote Kepler’s laws in words and use the semi-major axis for ellipses. In several mass problems draw each force before you add. Remember that g falls as the inverse square with height but linearly with depth, and use the small height approximation only when h is much smaller than R.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Gravitation — Part 2: Potential energy, escape speed and satellites',
  goals: [
    'Define and calculate gravitational potential energy and potential',
    'Derive and apply the escape speed',
    'Derive the orbital speed and period of a satellite and its energy',
  ],
  slides: [
    sl('title', 'Energy in the gravitational field', {
      b: 'Part 2 — potential energy, escape and satellites.',
      v: V.orbit,
      n: 'A rocket leaving Sriharikota has to climb out of the Earth’s gravitational field, and a satellite that stays up has to keep moving sideways fast enough. In this part we use energy to understand both: gravitational potential energy and potential, the escape speed, and the speed, period and energy of a satellite.',
    }),
    sl('concept', 'Gravitational potential energy', {
      b: r`Take the potential energy to be zero when the two masses are infinitely far apart. Bringing $m$ from infinity to distance $r$ from $M$, gravity does positive work, so the energy becomes **negative**:`,
      m: [r`U(r) = -\dfrac{G M m}{r}`],
      ul: [
        r`As $m$ moves in from $x = \infty$ to $x = r$ gravity does work $W = \int_r^{\infty} \dfrac{G M m}{x^2}\,dx = \dfrac{G M m}{r}$, and $U(r) = U(\infty) - W = -\dfrac{G M m}{r}$.`,
        r`Equivalently, an outside agent must supply $+\dfrac{G M m}{r}$ to take $m$ back to infinity.`,
        'U belongs to the **pair** of masses, increases (becomes less negative) as r increases, and tends to 0 at infinity.',
        'The force is conservative: the work depends only on the end points, not the path.',
      ],
      v: plotU,
      n: 'We choose the potential energy to be zero when the masses are infinitely far apart. As the mass comes in from infinity, gravity does positive work, so the energy becomes negative, minus G M m over r. The graph rises towards zero as the distance grows. The energy belongs to the pair of masses, and because gravity is conservative the work between two points does not depend on the path.',
    }),
    sl('example', 'Worked example 1: a satellite’s potential energy', {
      b: r`A $${p1.m}$ kg satellite is at a distance $r = 1.0 \times 10^7$ m from the centre of the Earth ($G = 6.67 \times 10^{-11}$, $M_E = 6.0 \times 10^{24}$ kg). Find its gravitational potential energy and the gravitational potential there.`,
      ul: [
        r`$U = -\dfrac{G M m}{r} = -\dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24} \times ${p1.m}}{1.0 \times 10^7} = ${X(p1.U)}$ J.`,
        r`$V = \dfrac{U}{m} = -\dfrac{G M}{r} = ${X(p1.U / p1.m)}$ J kg$^{-1}$.`,
      ],
      v: plotU,
      n: `The potential energy is minus G M m over r. With the stated numbers it comes to about minus ${dec(-p1.U / 1e9, 3)} times ten to the power nine joules. Dividing by the mass of the satellite gives the gravitational potential, about minus ${dec(-p1.U / p1.m / 1e6, 3)} million joules per kilogram.`,
    }),
    sl('concept', 'Gravitational potential', {
      b: r`The **gravitational potential** at a point is the potential energy per unit mass there: $V = \dfrac{U}{m}$.`,
      m: [r`V = -\dfrac{G M}{r}, \qquad V_{\text{total}} = V_1 + V_2 + \dots`],
      ul: [
        'V is the work done **per kilogram** by an outside agent in bringing a test mass slowly from infinity to the point, with a sign: V is negative.',
        'Potential is a **scalar**: potentials of several masses add as plain numbers (unlike fields, which add as vectors).',
        'Unit: joule per kilogram (J kg⁻¹). Potential energy of a mass m at that point: U = m V.',
        'Potential energy of a system of masses: add −G m_i m_j / r_ij over every pair once.',
      ],
      v: T4,
      n: 'The gravitational potential is the potential energy per unit mass. It equals minus G M over r, it is negative, and it is a scalar. That means the potential at a point due to several masses is found by adding ordinary numbers, with no vectors needed. The potential energy of a mass there is simply the mass times the potential.',
    }),
    sl('example', 'Worked example 2: potential of two masses', {
      b: r`Masses of $${p2.m1}$ kg and $${p2.m2}$ kg are $${p2.d}$ m apart. Find the gravitational potential at the point on the line between them, $${p2.x}$ m from the lighter mass.`,
      ul: [
        r`Distances: $${p2.x}$ m from the $${p2.m1}$ kg mass and $${p2.d} - ${p2.x} = ${R6(p2.d - p2.x)}$ m from the $${p2.m2}$ kg mass.`,
        r`$V = -G\left(\dfrac{${p2.m1}}{${p2.x}} + \dfrac{${p2.m2}}{${R6(p2.d - p2.x)}}\right) = -6.67 \times 10^{-11} \times ${dec(p2.m1 / p2.x + p2.m2 / (p2.d - p2.x), 4)} = ${X(p2.V)}$ J kg$^{-1}$.`,
        'Scalars add: no directions needed. (The gravitational field there is a vector and is found separately.)',
      ],
      v: T4,
      n: `Find the distance from each mass, then add the two potentials, which are scalars. The sum of mass over distance is ${dec(p2.m1 / p2.x + p2.m2 / (p2.d - p2.x), 4)} kilograms per metre, and multiplying by minus G gives about minus ${dec(-p2.V * 1e9, 3)} times ten to the power minus nine joules per kilogram.`,
    }),
    sl('check', 'Quick check: moving outwards', {
      b: 'Choose the correct option.',
      v: plotU,
      chk: 'pe-increase-mcq',
      n: 'Look at the graph of potential energy against distance.',
    }),
    sl('concept', 'Near the surface: why U = mgh works', {
      b: r`Raising $m$ from $R$ to $R + h$ changes the potential energy by $\Delta U = G M m\left(\dfrac{1}{R} - \dfrac{1}{R+h}\right) = \dfrac{G M m\, h}{R(R+h)}$.`,
      m: [r`\Delta U = \dfrac{m g R\, h}{R + h} \;\approx\; m g h \quad (h \ll R)`],
      ul: [
        r`Used $GM = gR^2$. For $h \ll R$ the denominator is about $R$, giving the familiar $mgh$.`,
        'For large h the exact result is smaller than m g h: g decreases as you rise, so g h overestimates the work.',
        'The table shows how mgh drifts away from the exact value for heights up to R.',
      ],
      v: T5,
      n: 'The exact change of potential energy between the surface and a height h is m g R h divided by R plus h. When h is much smaller than R this is just m g h. The table shows that the simple formula is accurate to about a hundredth of a percent for a one kilometre climb, but overestimates by about nine percent at six hundred and forty kilometres, and by fifty percent at a height equal to the radius.',
    }),
    sl('example', 'Worked example 3: lifting a package to 3200 km', {
      b: r`How much work must be done to raise a $${p3.m}$ kg package from the Earth’s surface to a height of $3200$ km? Take $g = 9.8$ m s$^{-2}$, $R = 6.4 \times 10^6$ m. Compare with $mgh$.`,
      ul: [
        r`$W = \Delta U = \dfrac{m g R h}{R + h} = \dfrac{${p3.m} \times 9.8 \times 6.4 \times 10^6 \times 3.2 \times 10^6}{9.6 \times 10^6} = ${X(p3.dU)}$ J.`,
        r`The naive value $m g h = ${p3.m} \times 9.8 \times 3.2 \times 10^6 = ${X(p3.naive)}$ J is too large by ${dec(((p3.naive - p3.dU) / p3.dU) * 100, 3)}% of the true work.`,
      ],
      v: T5,
      n: `Use the exact formula, because the height is not small compared with the radius. It gives ${dec(p3.dU / 1e9, 4)} times ten to the power nine joules. The simple formula m g h would give ${dec(p3.naive / 1e9, 4)} times ten to the power nine joules, which is fifty percent too large.`,
    }),
    sl('concept', 'Escape speed', {
      b: r`The **escape speed** is the minimum speed that lets a body leave the planet and never return (air resistance ignored). It needs total energy $\ge 0$.`,
      m: [r`\tfrac{1}{2} m v_e^2 - \dfrac{G M m}{R} = 0 \;\Rightarrow\; v_e = \sqrt{\dfrac{2 G M}{R}} = \sqrt{2 g R}`],
      ul: [
        r`Earth: $v_e = \sqrt{2 \times 9.8 \times 6.4 \times 10^6} = ${dec(Math.sqrt(2 * g * RE) / 1e3, 3)}$ km s$^{-1}$.`,
        'It does not depend on the mass of the body, nor on the direction of launch (if nothing obstructs it).',
        'It is √2 times the orbital speed near the surface.',
        'A body launched at v < v_e rises to a finite height and falls back.',
      ],
      v: T6,
      n: 'To escape, a body must reach infinity with at least zero speed. Setting the total energy to zero gives the escape speed, the square root of two G M over R, which is also the square root of two g R. For the Earth it comes to eleven point two kilometres per second. It does not depend on the mass of the body or on the direction in which it is launched.',
    }),
    sl('example', 'Worked example 4: leaving Mars', {
      b: r`Mars has $M = 6.4 \times 10^{23}$ kg and $R = 3.4 \times 10^6$ m. Find the escape speed.`,
      ul: [
        r`$v_e = \sqrt{\dfrac{2 G M}{R}} = \sqrt{\dfrac{2 \times 6.67 \times 10^{-11} \times 6.4 \times 10^{23}}{3.4 \times 10^6}} = \sqrt{${X(p4.ve ** 2)}}$ m s$^{-1}$`,
        r`$= ${dec(p4.ve, 4)}$ m s$^{-1}$ $= ${dec(p4.ve / 1e3, 3)}$ km s$^{-1}$, less than half the Earth’s value.`,
      ],
      v: T6,
      n: `Put the mass and radius of Mars into root two G M over R. The speed is about ${dec(p4.ve / 1e3, 3)} kilometres per second, less than half the escape speed from the Earth, because Mars is much less massive.`,
    }),
    sl('check', 'Quick check: escape speed', {
      b: 'Compute the escape speed.',
      v: T6,
      chk: 'moon-ve-num',
      n: 'Use the square root of two G M over R with the Moon’s data.',
    }),
    sl('concept', 'Orbital speed and period', {
      b: r`A satellite in a circular orbit of radius $r = R + h$ is kept moving in a circle by gravity alone:`,
      m: [r`\dfrac{m v^2}{r} = \dfrac{G M m}{r^2} \;\Rightarrow\; v = \sqrt{\dfrac{G M}{r}}, \qquad T = \dfrac{2\pi r}{v} = 2\pi\sqrt{\dfrac{r^3}{G M}}`],
      ul: [
        r`Near the surface ($r \approx R$): $v = \sqrt{gR} = ${dec(Math.sqrt(g * RE) / 1e3, 3)}$ km s$^{-1}$ and $T = 2\pi\sqrt{R/g} \approx ${dec((2 * Math.PI * Math.sqrt(RE / g)) / 60, 3)}$ minutes.`,
        'v and T depend only on the orbit radius and the central mass, **not on the satellite’s mass**.',
        'A higher orbit is slower and has a longer period (Kepler’s law of periods again).',
        'Newton’s cannon: below v the body falls, at v it circles, between v and √2 v it follows an ellipse, at √2 v it escapes.',
      ],
      v: V.cannon,
      n: 'A satellite is in free fall all the time: gravity supplies exactly the force needed for circular motion. Equating the two gives the orbital speed, root G M over r, and the period, two pi root r cubed over G M. Neither depends on the mass of the satellite. Near the Earth’s surface the speed is about seven point nine kilometres per second and the period about eighty five minutes.',
    }),
    sl('example', 'Worked example 5: a satellite at one Earth radius above the surface', {
      b: r`A satellite orbits at a height $h = R$ above the Earth. Take $g = 9.8$ m s$^{-2}$ and $R = 6.4 \times 10^6$ m. Find its speed and period.`,
      ul: [
        r`$r = R + h = ${X(p5.r)}$ m. $v = \sqrt{\dfrac{g R^2}{r}} = \sqrt{\dfrac{9.8 \times (6.4 \times 10^6)^2}{${X(p5.r)}}} = ${dec(p5.v, 4)}$ m s$^{-1}$ $= ${dec(p5.v / 1e3, 3)}$ km s$^{-1}$.`,
        r`$T = \dfrac{2\pi r}{v} = \dfrac{2\pi \times ${X(p5.r)}}{${dec(p5.v, 4)}} = ${dec(p5.T, 4)}$ s $\approx ${dec(p5.T / 3600, 3)}$ h.`,
      ],
      v: V.orbit,
      n: `At twice the Earth’s radius the speed is ${dec(p5.v / 1e3, 3)} kilometres per second, lower than the surface value of seven point nine. The period is ${dec(p5.T, 4)} seconds, about ${dec(p5.T / 3600, 3)} hours, much longer than the eighty five minutes near the surface.`,
    }),
    sl('diagram', 'Higher orbit, lower speed, easier escape', {
      b: 'Orbital speed and escape speed against orbit radius:',
      ul: [
        'Both fall as 1/√r; the escape speed is always √2 times the orbital speed at the same radius.',
        'To go from a lower to a higher circular orbit a satellite loses speed, even though it must be given energy.',
        'In the lowest orbits air drag removes energy and the satellite spirals in, speeding up.',
      ],
      v: plotVorb,
      n: 'Both curves fall with distance, and the escape curve always lies root two times above the orbital curve. This explains a surprising fact: moving to a higher circular orbit means the satellite ends up moving more slowly, even though we had to supply energy to raise it. If air drag removes energy in a low orbit, the satellite sinks to a lower orbit and speeds up.',
    }),
    sl('concept', 'Energy of an orbiting satellite', {
      b: r`In a circular orbit of radius $r$, with $v^2 = \dfrac{G M}{r}$:`,
      m: [r`K = \tfrac{1}{2} m v^2 = \dfrac{G M m}{2r}, \quad U = -\dfrac{G M m}{r}, \quad E = K + U = -\dfrac{G M m}{2r} = -K`],
      ul: [
        'The total energy is **negative**: the satellite is bound. The magnitude |E| = K is the **binding energy**, the extra energy that would free it.',
        'U = −2K, so E = U/2.',
        'To raise the orbit radius from r₁ to r₂, the energy needed is ΔE = (G M m / 2)(1/r₁ − 1/r₂).',
        'Losing energy to drag makes E more negative: r decreases and K increases.',
      ],
      v: plotE,
      n: 'In a circular orbit the kinetic energy is G M m over two r, the potential energy is minus G M m over r, and the total energy is minus G M m over two r, equal to minus the kinetic energy. The total is negative because the satellite is bound. The kinetic energy is the binding energy: that much extra energy would free the satellite. Raising the orbit needs energy, but the satellite slows down.',
    }),
    sl('example', 'Worked example 6: raising an orbit', {
      b: r`A $${p6.m}$ kg satellite is moved from a circular orbit of radius $8.0 \times 10^6$ m to one of radius $1.2 \times 10^7$ m. Find its total energy in each orbit and the energy needed ($G = 6.67 \times 10^{-11}$, $M_E = 6.0 \times 10^{24}$ kg).`,
      ul: [
        r`$E_1 = -\dfrac{G M m}{2 r_1} = ${X(p6.E1)}$ J and $E_2 = -\dfrac{G M m}{2 r_2} = ${X(p6.E2)}$ J.`,
        r`$\Delta E = E_2 - E_1 = ${X(p6.E2)} - (${X(p6.E1)}) = ${X(p6.dE)}$ J.`,
        'The speed falls from the lower orbit to the higher one, so the energy goes into potential energy.',
      ],
      v: plotE,
      n: `The energy in the lower orbit is minus ${dec(-p6.E1 / 1e9, 4)} times ten to the power nine joules and in the higher orbit minus ${dec(-p6.E2 / 1e9, 4)} times ten to the power nine joules. The difference, ${dec(p6.dE / 1e9, 4)} times ten to the power nine joules, is the energy that must be supplied.`,
    }),
    sl('check', 'Quick check: speeds in two orbits', {
      b: 'Choose the correct option.',
      v: plotVorb,
      chk: 'satratio-mcq',
      n: 'Orbital speed varies as one over the square root of the radius.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Potential energy', 'U = −G M m / r (zero at infinity); near the surface ΔU ≈ m g h'],
          ['Potential', 'V = −G M / r; a scalar, so potentials add'],
          ['Escape speed', 'v_e = √(2GM/R) = √(2gR) = 11.2 km/s for the Earth'],
          ['Orbital speed, period', 'v = √(GM/r); T = 2π √(r³/GM); independent of m'],
          ['Energies', 'K = GMm/2r; U = −GMm/r; E = −GMm/2r = −K'],
          ['v_e and v at the same r', 'v_e = √2 v'],
        ],
        'Summary table of potential energy, potential, escape speed, orbital speed and satellite energies',
      ),
      n: 'To sum up. The potential energy of two masses is minus G M m over r and the potential is minus G M over r. The escape speed is root two G M over R, which is eleven point two kilometres per second for the Earth. A satellite in a circular orbit has speed root G M over r, a period two pi root r cubed over G M, and a total energy equal to minus its kinetic energy.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Say where U = 0 (at infinity) before using −GMm/r; check that signs give a negative U and negative E for bound orbits.',
        'Use g R² in place of G M when the problem gives g and R, and say so.',
        'Derive v_e from energy conservation and v_orbit from F = mv²/r; do not mix them up.',
        'Use the exact ΔU = mgRh/(R+h) when h is not much smaller than R; ΔU = mgh only for small h.',
      ],
      v: T7,
      n: 'Always say that the potential energy is taken as zero at infinity, and check that your signs make bound energies negative. Use g R squared for G M when the data are given that way. Derive the escape speed from energy and the orbital speed from the force. And use m g h only when the height is small compared with the radius.',
    }),
  ],
});
void GMg;
void ME;
void r;

// ch07 Gravitation — question bank, part 1: t01 (Kepler's laws, universal gravitation, superposition) and t02 (g and its variation).
// Every numerical is computed here and re-solved by an independent `check`; solutions and schemes print the computed values.
// AR keys planned across the chapter: a (periods), c (g at depth), d (g at height R), a (negative PE), b (Moon), c (orbits): a 2, b 1, c 2, d 1.
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { G, GM, RE, g, ME, MARS, R6, pull, root, orbit2d, xp } from './phys.mjs';

const { mcq, ar, tf, fill, match, num, short, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const X = (x, n = 3) => sci(x, n);
void ME; void GM; void orbit2d; void part;

// ================================================================ t01 Kepler's laws, universal gravitation, superposition
add('comet-mcq', mcq({
  stem: 'A periodic comet moves round the Sun in a long elliptical orbit with the Sun at one focus. The comet has its greatest speed when it is',
  right: 'nearest the Sun, because the line joining it to the Sun must sweep equal areas in equal times',
  wrong: ['farthest from the Sun, where the Sun’s pull on it is weakest', 'at the ends of the minor axis, where the pull is perpendicular to its path', 'at every point equally, because the force always points to the Sun'],
  sol: 'Equal areas in equal times means a short radius needs a long arc in the same time, so the speed is greatest at perihelion — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const k3 = { a: 9.0 };
k3.T = k3.a ** 1.5;
add('kepler3-mcq', mcq({
  stem: 'A newly catalogued dwarf planet moves round the Sun in a nearly circular path of mean radius 9.0 AU. Taking Earth’s period as 1 year at 1 AU, its period is',
  right: `${k3.T} years`,
  wrong: ['81 years', '9.0 years', '3.0 years'],
  sol: `$T^2 \\propto a^3$, so $T^2 = 9.0^3 = ${9 ** 3}$ and $T = \\sqrt{${9 ** 3}} = ${k3.T}$ years — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => k3.T === 27 || 'k3');
add('dist-mcq', mcq({
  stem: 'Two lead spheres attract each other with a force F. If the mass of one sphere is doubled and the distance between their centres is tripled, the force becomes',
  right: '2F/9',
  wrong: ['6F', '2F/3', 'F/9'],
  sol: 'F ∝ m₁m₂/r². The factor is 2 × (1/3)² = 2/9 — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => near(2 / 9, 2 * (1 / 3) ** 2, 1e-12) || 'dist');
add('book-mcq', mcq({
  stem: `A ${2.0} kg book lies on a table. The Earth pulls the book with a force of ${(2 * g).toFixed(1)} N. The book pulls the Earth with a force of`,
  right: `${(2 * g).toFixed(1)} N, directed towards the book`,
  wrong: ['zero, because the Earth is too massive to be moved', `${(2 * g).toFixed(1)} N, directed away from the book`, '2.0 N, one for each kilogram of the book'],
  sol: 'Gravitational forces between two bodies are an equal and opposite pair (Newton’s third law), so the book pulls the Earth with the same magnitude, towards the book — option (@K).',
  d: 1, c: 'understanding', t: [1],
}), () => near(2 * g, 19.6, 1e-9) || 'book');
add('G-fill', fill({
  stem: 'In a torsion-balance experiment with lead spheres, the universal constant of gravitation is measured as G ≈ ___ × 10⁻¹¹ N m² kg⁻².',
  acc: [['6.67', '6.7', '6.674']],
  sol: 'G ≈ **6.67** × 10⁻¹¹ N m² kg⁻².',
  d: 1, c: 'recall', t: [1],
}));
add('kepler3-ar', ar({
  a: 'Mercury takes a shorter time than Mars to go once round the Sun.',
  r: 'The square of a planet’s period is proportional to the cube of the semi-major axis of its orbit, and Mercury’s orbit is the smaller.',
  key: 'a',
  sol: 'Both are true, and R explains A: with the smaller a, Mercury has the smaller T — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('midpoint-tf', tf({
  stem: 'A small body placed exactly midway between two identical masses, far from everything else, feels no net gravitational force from them.',
  key: 't',
  sol: 'True. The two pulls are equal in magnitude and opposite in direction, so their vector sum is zero (superposition).',
  d: 2, c: 'understanding', t: [1],
}));
add('inverse-tf', tf({
  stem: 'When the distance between two planets is doubled, the gravitational attraction between them is reduced to half its value.',
  key: 'f',
  sol: 'False. The force varies as 1/r², so doubling the distance reduces it to **one quarter**.',
  d: 1, c: 'understanding', t: [1],
}));
const tk = { m: 2.0e8, d: 100 };
tk.F = pull(tk.m, tk.m, tk.d);
add('tanker-num', num({
  stem: 'Two oil tankers, each of mass 2.0 × 10⁸ kg, float with their centres 100 m apart. Take G = 6.67 × 10⁻¹¹ N m² kg⁻². Find the gravitational force between them, in N.',
  value: v3(tk.F), tol: 1, unit: 'N',
  sol: r`$F = G\dfrac{m_1 m_2}{r^2} = 6.67 \times 10^{-11} \times \dfrac{(2.0 \times 10^8)^2}{(100)^2} = ${v3(tk.F)}$ N.`,
  scheme: [['F = G m₁m₂/r² with the given values', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(tk.F, 6.67e-11 * 4e16 / 1e4, 1e-9) && near(q.answer.value, 267, 0.005) || 'tk');
const eq = { m: 30, a: 0.6 };
eq.pair = pull(eq.m, eq.m, eq.a);
eq.F = Math.sqrt(3) * eq.pair;
add('equilateral-num', num({
  stem: 'Three identical spheres of mass 30 kg sit at the corners of an equilateral triangle of side 0.60 m, in free space. With G = 6.67 × 10⁻¹¹ N m² kg⁻², find the magnitude of the net gravitational force on one sphere, in units of 10⁻⁷ N.',
  value: v3(eq.F / 1e-7), tol: 0.02, unit: '10⁻⁷ N',
  sol: r`Each of the other two spheres pulls with $F_1 = \dfrac{G m^2}{a^2} = ${dec(eq.pair / 1e-7, 4)} \times 10^{-7}$ N, along the sides at $60^\circ$ to each other. The components perpendicular to the bisector cancel, so $F = 2F_1\cos 30^\circ = \sqrt{3}\,F_1 = ${dec(Math.sqrt(3), 4)} \times ${dec(eq.pair / 1e-7, 4)} \times 10^{-7} = ${dec(eq.F / 1e-7, 4)} \times 10^{-7}$ N. In units of $10^{-7}$ N: $F = ${v3(eq.F / 1e-7)}$.`,
  scheme: [[`Pair force ${dec(eq.pair / 1e-7, 3)} × 10⁻⁷ N`, 1], [`Net = √3 × pair force = ${v3(eq.F / 1e-7)} × 10⁻⁷ N`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => {
  const f = (ang) => [pull(eq.m, eq.m, eq.a) * Math.cos(ang), pull(eq.m, eq.m, eq.a) * Math.sin(ang)];
  const [x1, y1] = f(Math.PI / 6);
  const [x2, y2] = f(-Math.PI / 6);
  return near(Math.hypot(x1 + x2, y1 + y2) / 1e-7, q.answer.value, 0.003) || 'eq';
});
const nz = { m1: 16, m2: 9, L: 7.0 };
nz.x = root((x) => nz.m1 / (x * x) - nz.m2 / ((nz.L - x) ** 2), 0.1, nz.L - 0.1);
add('neutral-num', num({
  stem: 'Two bodies of mass 16 kg and 9 kg are 7.0 m apart, far from all other matter. A small test mass lies on the line joining them. How far from the 16 kg body must it be for the net gravitational force on it to be zero, in m?',
  value: v3(nz.x), tol: 0.02, unit: 'm',
  sol: r`At the point of zero force the pulls are equal: $\dfrac{G m \times 16}{x^2} = \dfrac{G m \times 9}{(7.0 - x)^2}$. Taking square roots, $\dfrac{x}{7.0 - x} = \sqrt{\dfrac{16}{9}} = \dfrac{4}{3}$, so $3x = 4(7.0 - x)$, $7x = 28$ and $x = ${v3(nz.x)}$ m.`,
  scheme: [['Equal pulls: 16/x² = 9/(7.0 − x)²', 1], [`x = ${v3(nz.x)} m from the 16 kg body`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(nz.x, q.answer.value, 0.003) && near(nz.x, 4, 1e-6) || 'nz');
const ap = { T: 64, q: 0.4 };
ap.a = ap.T ** (2 / 3);
ap.Q = 2 * ap.a - ap.q;
add('aphelion-num', num({
  stem: 'A periodic comet takes 64 years to go once round the Sun, and at perihelion it is 0.40 AU from the Sun. Using Earth’s period (1 year at 1 AU), find its greatest distance from the Sun, in AU.',
  value: v3(ap.Q), tol: 0.1, unit: 'AU',
  sol: r`$a^3 = T^2 = 64^2 = ${64 ** 2}$ in AU³ and year², so the semi-major axis is $a = \sqrt[3]{${64 ** 2}} = ${dec(ap.a, 3)}$ AU. The ellipse has perihelion plus aphelion $= 2a$, so $r_a = 2a - r_p = 2 \times ${dec(ap.a, 3)} - 0.40 = ${v3(ap.Q)}$ AU.`,
  scheme: [[`a = ${dec(ap.a, 3)} AU from T² = a³`, 1], [`r_a = 2a − r_p = ${v3(ap.Q)} AU`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(ap.a ** 3, ap.T ** 2, 1e-9) && near(q.answer.value, 31.6, 1e-3) || 'ap');
const ev = { rp: 1.47e11, ra: 1.52e11, vp: 30.3 };
ev.va = (ev.vp * ev.rp) / ev.ra;
add('areal-num', num({
  stem: 'The Earth is 1.47 × 10¹¹ m from the Sun at perihelion, where its orbital speed is 30.3 km/s, and 1.52 × 10¹¹ m away at aphelion. Find its speed at aphelion, in km/s.',
  value: v3(ev.va), tol: 0.05, unit: 'km/s',
  sol: r`At perihelion and aphelion the velocity is perpendicular to the radius, so angular momentum conservation gives $v_a r_a = v_p r_p$ and $v_a = v_p\,\dfrac{r_p}{r_a} = 30.3 \times \dfrac{1.47}{1.52} = ${v3(ev.va)}$ km/s.`,
  scheme: [['v_p r_p = v_a r_a', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => {
  const e = (ev.ra - ev.rp) / (ev.ra + ev.rp);
  return near(ev.vp * (1 - e) / (1 + e), q.answer.value, 0.003) || 'ev';
});
add('law-match', match({
  stem: 'Match each statement about the planets in List I with the law or principle in List II that explains it.',
  pairs: [
    ['Mercury moves fastest when it is nearest the Sun', 'Law of areas'],
    ['The Sun is not at the centre of a planet’s path but at one focus of it', 'Law of orbits'],
    ['A planet four times as far from the Sun as another takes eight times as long to go round', 'Law of periods'],
    ['When the distance from the Sun is doubled, the Sun’s pull on a planet falls to a quarter', 'Newton’s inverse-square law of gravitation'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Faster near the Sun: areas (q). Sun at a focus: orbits (s). Period 8 times for a 4 times radius, since 4^1.5 = 8: periods (p). Quarter pull at twice the distance: inverse-square law (r).',
  marks: 2, d: 2, c: 'understanding', t: [1],
}));
add('area-short', short({
  marks: 2,
  stem: 'Use the idea of angular momentum to explain why a planet moves faster when it is closer to the Sun.',
  model: 'The Sun’s pull on the planet acts along the line joining them, so its torque about the Sun is zero and the planet’s angular momentum about the Sun is constant. At the nearest and farthest points $L = m v r$, so $v r$ is constant: a smaller $r$ means a larger speed $v$.',
  sol: 'Torque zero, L constant, v r constant.',
  scheme: [['Gravity is central: zero torque, angular momentum conserved', 1], ['L = m v r constant, so smaller r means larger v', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const ap2 = { m: 0.20 };
ap2.F = ap2.m * g;
ap2.a = ap2.F / ME;
add('mutual-short', short({
  marks: 2,
  stem: 'A 0.20 kg apple falls from a branch. Explain, with numbers, why the apple’s pull on the Earth makes no noticeable difference to the Earth’s motion.',
  model: r`The Earth pulls the apple with $F = mg = ${dec(ap2.F, 3)}$ N, so by the third law the apple pulls the Earth with the same $${dec(ap2.F, 3)}$ N. The Earth’s acceleration is $F/M = ${dec(ap2.F, 3)} / (6.0 \times 10^{24}) = ${X(ap2.a)}$ m s$^{-2}$, far too small to detect.`,
  sol: 'Equal forces; a = F/M is negligible for the huge mass of the Earth.',
  scheme: [['Equal and opposite forces of 1.96 N', 1], [`a = F/M = ${xp(ap2.a)} m s⁻²: negligible because M is huge`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near(ap2.F, 1.96, 1e-9) && near(ap2.a, 3.27e-25, 0.01) || 'ap2');
const st = { m: 60, d: 1.0, clip: 1.0e-4 };
st.F = pull(st.m, st.m, st.d);
st.W = st.clip * g;
add('students-short3', short({
  marks: 3,
  stem: 'Two students of mass 60 kg each stand 1.0 m apart. Treating them as point masses, find the gravitational force between them (G = 6.67 × 10⁻¹¹ N m² kg⁻²) and compare it with the weight of a 0.10 g paper clip. Why do we not notice such forces?',
  model: r`$F = \dfrac{G m^2}{r^2} = 6.67 \times 10^{-11} \times 3600 / 1.0 = ${X(st.F)}$ N. The weight of the clip is $0.10 \times 10^{-3} \times 9.8 = ${X(st.W)}$ N, about ${dec(st.W / st.F, 2)} times larger. G is so small that gravity is noticeable only when at least one body is as massive as a planet; the forces between everyday objects are swamped by other forces such as friction.`,
  sol: 'F ≈ 2.4 × 10⁻⁷ N; the clip’s weight is about 4100 times larger.',
  scheme: [[`F = G m²/r² = ${xp(st.F)} N`, 1], [`Clip’s weight ${xp(st.W)} N, about ${dec(st.W / st.F, 2)} times larger`, 1], ['G is tiny; the effect is swamped by other forces', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(st.F, 2.4e-7, 0.01) && near(st.W, 9.8e-4, 1e-9) || 'st');
add('law-short3', short({
  marks: 3,
  stem: 'State Newton’s universal law of gravitation, write it in symbols and give two properties of the gravitational force between two point masses.',
  model: r`Every particle in the universe attracts every other with a force proportional to the product of their masses and inversely proportional to the square of the distance between them: $F = G m_1 m_2 / r^2$, where $G$ is the universal constant. The force is always attractive, acts along the line joining the particles, and forms an equal and opposite pair on the two bodies.`,
  sol: 'Statement, formula, two properties.',
  scheme: [['Statement: ∝ m₁m₂ and ∝ 1/r²', 1], ['F = G m₁m₂/r²', 1], ['Two properties (attractive, along the line, mutual/equal and opposite)', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('kepler3-derive-short3', short({
  marks: 3,
  stem: 'A planet of mass m moves in a circular orbit of radius r about a star of mass M. Derive the relation between its period T and r, and say what law of Kepler this gives.',
  model: r`A planet in a circular orbit is held there by gravity alone, so the gravitational force supplies the centripetal force: $\dfrac{GMm}{r^2} = m\omega^2 r$ with $\omega = 2\pi/T$. Cancelling $m$ and rearranging gives $T^2 = \dfrac{4\pi^2}{GM}\,r^3$. For one star the factor $4\pi^2/GM$ is the same for every planet, so $T^2$ is proportional to $r^3$. This is Kepler’s law of periods, here for a circular orbit.`,
  sol: 'Force equals m ω² r; T² = 4π² r³/(GM).',
  scheme: [['GMm/r² = mω²r', 1], ['T² = 4π² r³/(GM)', 1], ['T² ∝ r³: law of periods', 1]],
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 g and its variation
const ms = { M: MARS.M, R: MARS.R };
ms.g = (G * ms.M) / ms.R ** 2;
add('marsg-num', num({
  stem: 'Mars has mass 6.4 × 10²³ kg and radius 3.4 × 10⁶ m. Using G = 6.67 × 10⁻¹¹ N m² kg⁻², find the acceleration due to gravity at its surface, in m/s².',
  value: v3(ms.g), tol: 0.02, unit: 'm/s²',
  sol: r`$g = \dfrac{G M}{R^2} = \dfrac{6.67 \times 10^{-11} \times 6.4 \times 10^{23}}{(3.4 \times 10^6)^2} = \dfrac{${X(G * ms.M)}}{${X(ms.R ** 2)}} = ${v3(ms.g)}$ m/s².`,
  scheme: [['g = GM/R²', 1], [`g = ${v3(ms.g)} m/s²`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near((6.67e-11 * 6.4e23) / 3.4e6 ** 2, q.answer.value, 0.003) || 'ms');
const al = { h: 3.2e6 };
al.g = g * (RE / (RE + al.h)) ** 2;
add('alt-num', num({
  stem: 'Take g = 9.8 m/s² at the Earth’s surface and R = 6.4 × 10⁶ m. Find the acceleration due to gravity at a height of 3200 km above the surface, in m/s².',
  value: v3(al.g), tol: 0.02, unit: 'm/s²',
  sol: r`$g' = g\left(\dfrac{R}{R+h}\right)^2 = 9.8 \times \left(\dfrac{6.4 \times 10^6}{9.6 \times 10^6}\right)^2 = 9.8 \times ${dec((RE / (RE + al.h)) ** 2, 4)} = ${v3(al.g)}$ m/s².`,
  scheme: [['g′ = g R²/(R + h)² with R + h = 9.6 × 10⁶ m', 1], [`g′ = ${v3(al.g)} m/s²`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near((g * RE * RE) / (RE + al.h) ** 2, q.answer.value, 0.003) || 'al');
const hl = { h: 8800 };
hl.pct = ((2 * hl.h) / RE) * 100;
hl.exact = (1 - (RE / (RE + hl.h)) ** 2) * 100;
add('hill-num', num({
  stem: 'A Himalayan summit is 8.8 km above sea level. Using the small-height approximation and R = 6.4 × 10⁶ m, find by what percentage g is smaller there than at sea level.',
  value: v3(hl.pct), tol: 0.003, unit: '%',
  sol: r`$\dfrac{\Delta g}{g} \approx \dfrac{2h}{R} = \dfrac{2 \times 8.8 \times 10^3}{6.4 \times 10^6} = ${dec(hl.pct / 100, 3)}$, so $\dfrac{\Delta g}{g} \times 100 = ${v3(hl.pct)}$ per cent. (The exact formula gives ${dec(hl.exact, 3)} per cent.)`,
  scheme: [['Δg/g ≈ 2h/R', 1], [`${v3(hl.pct)} %`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(hl.exact, q.answer.value, 0.01) || 'hl');
const dp = { d: 1.6e6 };
dp.g = g * (1 - dp.d / RE);
add('depth-num', num({
  stem: 'Assume the Earth is a uniform sphere with g = 9.8 m/s² at the surface and R = 6.4 × 10⁶ m. A borehole reaches a depth of 1600 km. Find g at the bottom, in m/s².',
  value: v3(dp.g), tol: 0.02, unit: 'm/s²',
  sol: r`$g' = g\left(1 - \dfrac{d}{R}\right) = 9.8 \times \left(1 - \dfrac{1.6 \times 10^6}{6.4 \times 10^6}\right) = 9.8 \times 0.75 = ${v3(dp.g)}$ m/s².`,
  scheme: [[`g′ = g(1 − d/R) = ${v3(dp.g)} m/s²`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(g * (RE - dp.d) / RE, q.answer.value, 0.003) || 'dp');
const as = { m: 60, h: 4.0e5 };
as.F = as.m * g * (RE / (RE + as.h)) ** 2;
add('astro-num', num({
  stem: 'A 60 kg astronaut is at a height of 400 km above the Earth’s surface. Taking g = 9.8 m/s² and R = 6.4 × 10⁶ m, find the gravitational force of the Earth on her, in N.',
  value: v3(as.F), tol: 1, unit: 'N',
  sol: r`$g' = 9.8 \times \left(\dfrac{6.4}{6.8}\right)^2 = ${dec(g * (RE / (RE + as.h)) ** 2, 4)}$ m/s², so $F = m g' = 60 \times ${dec(g * (RE / (RE + as.h)) ** 2, 4)} = ${v3(as.F)}$ N, about 89% of her weight on the ground ($588$ N).`,
  scheme: [['g′ = g R²/(R + h)²', 1], [`F = m g′ = ${v3(as.F)} N`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near((60 * GM_g()) / (RE + as.h) ** 2, q.answer.value, 0.003) || 'as');
function GM_g() {
  return g * RE * RE;
}
add('exo-mcq', mcq({
  stem: 'An exoplanet has 0.10 times the mass and 0.50 times the radius of the Earth. If g at the Earth’s surface is 9.8 m/s², g at its surface is',
  right: `${dec(0.1 / 0.25 * g, 3)} m/s²`,
  wrong: ['4.9 m/s²', '1.96 m/s²', '9.8 m/s²'],
  sol: `g ∝ M/R², so g' = 9.8 × 0.10/(0.50)² = 9.8 × 0.40 = ${dec(0.4 * g, 3)} m/s² — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(0.4 * g, 3.92, 1e-9) || 'exo');
add('altquarter-mcq', mcq({
  stem: 'At what height above the Earth’s surface is the acceleration due to gravity one quarter of its value at the surface? (R is the radius of the Earth.)',
  right: 'R',
  wrong: ['R/2', '2R', '4R'],
  sol: 'g′ = g R²/(R + h)² = g/4 needs (R + h)² = 4R², so R + h = 2R and h = R — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('depthhalf-mcq', mcq({
  stem: 'Inside a uniform spherical Earth of radius R, at what depth below the surface is g equal to half its surface value?',
  right: 'R/2',
  wrong: ['R/4', 'R', 'R/√2'],
  sol: 'g′ = g(1 − d/R) = g/2 gives d = R/2 — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('altdepth-mcq', mcq({
  stem: 'A tower of height x and a mine shaft of depth x are both very small compared with the Earth’s radius R. Compared with the value at the surface, the fractional decrease in g at the top of the tower is',
  right: 'twice the fractional decrease at the bottom of the shaft, 2x/R against x/R',
  wrong: ['half the fractional decrease at the bottom of the shaft', 'equal to the fractional decrease at the bottom of the shaft', 'zero, because the Earth’s mass is unchanged'],
  sol: 'Above the surface g falls by the fraction 2x/R; below it (uniform Earth) by x/R, so the tower’s decrease is twice as large — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('density-mcq', mcq({
  stem: 'Two planets have the same mean density, and their radii are in the ratio 1 : 2. The ratio of the accelerations due to gravity at their surfaces is',
  right: '1 : 2',
  wrong: ['1 : 4', '1 : 8', '1 : 1'],
  sol: 'g = (4/3)πGρR, so at equal density g ∝ R and the ratio is 1 : 2 — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('centre-fill', fill({
  stem: 'In the model of a uniform Earth, a tunnel through the exact centre has g equal to ___ at the centre.',
  acc: [['zero', '0']],
  sol: 'At the centre the inner sphere has zero radius, so g′ = g(1 − R/R) = **zero**.',
  d: 2, c: 'understanding', t: [2],
}));
add('glinear-tf', tf({
  stem: 'Inside a uniform spherical Earth, g decreases in direct proportion to the distance moved from the surface towards the centre.',
  key: 't',
  sol: 'True. g′ = g(1 − d/R) falls linearly with the depth d, reaching zero at the centre.',
  d: 2, c: 'understanding', t: [2],
}));
add('gdepth-ar', ar({
  a: 'At the bottom of a mine 3.2 km deep, g is slightly less than at the surface.',
  r: 'The formula g = GM/r², with M the whole mass of the Earth, holds at every depth.',
  key: 'c',
  sol: 'A is true: g′ = g(1 − d/R). R is false: below the surface only the mass inside radius r attracts, so M must be replaced by the inner mass — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('galt-ar', ar({
  a: 'At a height equal to the Earth’s radius above the surface, g is half its surface value.',
  r: 'Above the surface, g varies inversely as the square of the distance from the centre of the Earth.',
  key: 'd',
  sol: 'R is true, but at h = R the distance is 2R so g falls to g/4, not g/2: A is false — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('gmass-short', short({
  marks: 2,
  stem: 'The Earth pulls a heavier stone with a greater force than a lighter one. Why, then, do both fall with the same acceleration near the surface?',
  model: r`The force on a stone of mass $m$ is $G M m/R^2$, but its acceleration is force divided by mass: $a = GM/R^2 = g$. The mass $m$ cancels, because the greater pull on the heavier stone is exactly offset by its greater inertia.`,
  sol: 'a = F/m = GM/R²; m cancels.',
  scheme: [['F = GMm/R² is proportional to m', 1], ['a = F/m = GM/R²: independent of m (greater pull, greater inertia)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('centre-short', short({
  marks: 2,
  stem: 'A miner reaches the centre of a uniform Earth. State, with a reason, what happens to her mass and to her weight there.',
  model: r`Her mass is unchanged: it is a property of the body. Her weight, the gravitational pull on her, becomes zero, because at the centre $g' = g(1 - d/R) = 0$ with $d = R$; equivalently, the Earth’s matter pulls equally in all directions and the pulls cancel.`,
  sol: 'Mass same; weight zero since g′ = 0.',
  scheme: [['Mass unchanged', 1], ['Weight zero: g′ = g(1 − R/R) = 0 (pulls cancel)', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('galt-derive-short3', short({
  marks: 3,
  stem: 'Derive the expression for the acceleration due to gravity at a height h above the Earth’s surface, and show that for h much smaller than R it is approximately g(1 − 2h/R).',
  model: r`Near the surface the pull on a body, per unit mass, is $GM/R^2 = g$. At a height $h$ the body is farther from the centre, at distance $R + h$, so the acceleration there is $g' = GM/(R+h)^2$, which can be written $g' = g(1 + h/R)^{-2}$. When $h$ is very small compared with $R$ we expand this with the binomial theorem and keep the first two terms, so $g' \approx g(1 - 2h/R)$.`,
  sol: 'g′ = GM/(R + h)² = g(1 + h/R)⁻²; expand.',
  scheme: [['g = GM/R² and g′ = GM/(R + h)²', 1], ['g′ = g(1 + h/R)⁻²', 1], ['Binomial expansion: g′ ≈ g(1 − 2h/R)', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('gdepth-derive-short3', short({
  marks: 3,
  stem: 'Taking the Earth to be a sphere of uniform density, derive the acceleration due to gravity at a depth d below the surface.',
  model: r`At depth $d$ the body is at distance $r = R - d$ from the centre. The shell of matter outside radius $r$ exerts no net force on it, so only the inner sphere attracts it. For uniform density the mass of that sphere is $M r^3/R^3$, so $g' = G M r^3/(R^3 r^2) = GMr/R^3 = g\,r/R$. Therefore $g' = g(1 - d/R)$, which falls linearly with depth and vanishes at the centre.`,
  sol: 'Inner mass Mr³/R³; g′ = g r/R.',
  scheme: [['Only the inner sphere of radius R − d attracts', 1], ['Its mass is M(R − d)³/R³', 1], ['g′ = g(1 − d/R)', 1]],
  d: 3, c: 'understanding', t: [2],
}));

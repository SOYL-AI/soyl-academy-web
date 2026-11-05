// ch07 notes and flashcards.
import { T, unit, PROV, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, plotKepler, plotG, plotU, plotE, plotVorb, TABLES } from './decks.mjs';

const X = (x, n = 3) => sci(x, n);
const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, p1, p2, p3, p4, p5, p6, veEarth, veMoon } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Gravitation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Kepler’s laws, the law of gravitation and superposition',
      r`- **Kepler’s laws:** (1) each planet moves in an ellipse with the Sun at one focus; (2) the line from the Sun to the planet sweeps equal areas in equal times (angular momentum is conserved because gravity is central, so a planet is fastest at perihelion: $v_p r_p = v_a r_a$); (3) $T^2 \propto a^3$ with $a$ the semi-major axis. For a circular orbit $T^2 = \dfrac{4\pi^2}{GM}r^3$. A body at $${ex1.a}$ AU has $T = ${dec(ex1.T, 4)}$ years.
- **Newton’s law:** $F = \dfrac{G m_1 m_2}{r^2}$, attractive, along the line joining the bodies, equal and opposite on the two; $G = 6.67 \times 10^{-11}$ N m² kg⁻². The Sun pulls the Earth with $${X(ex2.F)}$ N ($M_S = 2.0 \times 10^{30}$ kg, $r = 1.5 \times 10^{11}$ m).
- **Superposition:** the force on a body from several masses is the vector sum of the individual pulls. A 4.0 kg mass with 2.0 kg at 0.30 m and 3.0 kg at 0.40 m (perpendicular) feels $${dec(ex3.F * 1e9, 3)}$ nN at $${dec(ex3.ang, 3)}^\circ$ from the line to the 2.0 kg mass.
- A uniform sphere acts on outside bodies as if its whole mass were at its centre.`,
      [kt('Perihelion and aphelion', 'The nearest and farthest points of a planet’s orbit from the Sun; the speed is greatest at perihelion.'), kt('Semi-major axis', 'Half the longest diameter of the ellipse; the length that enters T² ∝ a³.'), kt('Superposition', 'The net gravitational force is the vector sum of the forces due to the individual masses.')],
      [fm(r`F = \dfrac{G m_1 m_2}{r^2}`, 'Law of gravitation'), fm(r`T^2 = \dfrac{4\pi^2}{GM}\,r^3`, 'Law of periods, circular orbit'), fm(r`v_p r_p = v_a r_a`, 'Law of areas at the extreme points')],
      V.kepler,
      [1],
      [plotKepler, V.sup, TABLES.T1, TABLES.T2],
    ),
    sec(
      '2. Acceleration due to gravity and its variation',
      r`- **At the surface:** $g = \dfrac{GM}{R^2} = \dfrac{4}{3}\pi G\rho R$; independent of the mass of the falling body. On the Moon $g = ${dec(ex4.g, 3)}$ m s⁻², about one sixth of the Earth’s.
- **Above the surface:** $g' = g\left(\dfrac{R}{R+h}\right)^2 \approx g\left(1 - \dfrac{2h}{R}\right)$ for $h \ll R$. At $h = R$, $g' = g/4$. At 320 km the exact value is $${dec(ex5.exact, 4)}$ m s⁻² against $${dec(ex5.approx, 4)}$ from the approximation.
- **Below the surface** (uniform Earth): only the inner sphere attracts, so $g' = g\left(1 - \dfrac{d}{R}\right)$, falling linearly to zero at the centre; at 320 km deep $g' = ${dec(ex5.depth, 4)}$ m s⁻². Over the same small distance, g falls twice as fast above the surface (2h/R) as below it (d/R).
- Weight $mg$ varies with place while mass does not; the Earth’s rotation and its non-uniform density are not considered here.`,
      [kt('Acceleration due to gravity', 'The acceleration of a freely falling body, GM/R² at the surface of a planet.'), kt('Inner sphere', 'At depth d only the mass within radius R − d attracts a body; the shell above exerts no net force.')],
      [fm(r`g = \dfrac{GM}{R^2}`, 'g at the surface'), fm(r`g' = g\left(1 + \dfrac{h}{R}\right)^{-2}`, 'g at height h'), fm(r`g' = g\left(1 - \dfrac{d}{R}\right)`, 'g at depth d')],
      V.earthg,
      [2],
      [plotG, TABLES.T3],
    ),
    sec(
      '3. Gravitational potential energy and potential',
      r`- With zero at infinity, $U(r) = -\dfrac{GMm}{r}$: negative, rising towards zero as $r$ increases. A $${p1.m}$ kg satellite at $1.0 \times 10^7$ m has $U = ${X(p1.U)}$ J.
- **Potential** $V = U/m = -\dfrac{GM}{r}$ is a scalar, so potentials of several masses add as numbers; $U = mV$. Two masses (5.0 kg and 10 kg) 0.50 m apart give $V = ${X(p2.V)}$ J kg⁻¹ at 0.20 m from the lighter one.
- Gravity is conservative: the work between two points depends only on the end points.
- **Near the surface:** $\Delta U = \dfrac{mgRh}{R+h} \approx mgh$ for $h \ll R$; the exact value is smaller than $mgh$ because g decreases with height. Lifting 120 kg through 3200 km needs $${X(p3.dU)}$ J, not $${X(p3.naive)}$ J.`,
      [kt('Gravitational potential energy', 'The work done by an external agent in bringing a mass from infinity to a point; negative, −GMm/r.'), kt('Gravitational potential', 'Potential energy per unit mass, −GM/r, a scalar.')],
      [fm(r`U = -\dfrac{GMm}{r}`, 'Potential energy'), fm(r`V = -\dfrac{GM}{r}`, 'Potential'), fm(r`\Delta U = \dfrac{mgRh}{R+h}`, 'Raising a body from the surface to height h')],
      plotU,
      [3],
      [TABLES.T4, TABLES.T5],
    ),
    sec(
      '4. Escape speed, orbital speed and energy of a satellite',
      r`- **Escape speed:** $\tfrac{1}{2}mv_e^2 - \dfrac{GMm}{R} = 0$ gives $v_e = \sqrt{\dfrac{2GM}{R}} = \sqrt{2gR}$: ${dec(veEarth / 1e3, 3)} km s⁻¹ for the Earth, ${dec(veMoon / 1e3, 3)} km s⁻¹ for the Moon, ${dec(p4.ve / 1e3, 3)} km s⁻¹ for Mars. It does not depend on the projectile’s mass or the direction of launch.
- **Circular orbit:** $\dfrac{mv^2}{r} = \dfrac{GMm}{r^2}$ gives $v = \sqrt{\dfrac{GM}{r}}$ and $T = 2\pi\sqrt{\dfrac{r^3}{GM}}$, independent of the satellite’s mass; $v_e = \sqrt{2}\,v$. Close to the Earth $v = \sqrt{gR} \approx 7.9$ km s⁻¹ and $T \approx 85$ minutes. At $h = R$: $v = ${dec(p5.v / 1e3, 3)}$ km s⁻¹, $T \approx ${dec(p5.T / 3600, 3)}$ h.
- **Energy:** $K = \dfrac{GMm}{2r}$, $U = -\dfrac{GMm}{r}$, $E = -\dfrac{GMm}{2r} = -K$. Negative E means the satellite is bound; $|E|$ is the binding energy. Raising a 400 kg satellite from $8.0 \times 10^6$ m to $1.2 \times 10^7$ m needs $${X(p6.dE)}$ J although its speed decreases.
- Air drag lowers E, so the orbit shrinks and the speed rises.
- Geostationary and polar satellites and weightlessness are not treated in this chapter (see the README for the scope decision).`,
      [kt('Escape speed', 'The least launch speed that lets a body reach infinity with no speed left; √(2GM/R).'), kt('Orbital speed', 'The speed of a satellite in a circular orbit, √(GM/r).'), kt('Binding energy', 'The magnitude of the total energy of a bound satellite; the energy needed to free it.')],
      [fm(r`v_e = \sqrt{\dfrac{2GM}{R}}`, 'Escape speed'), fm(r`v = \sqrt{\dfrac{GM}{r}}`, 'Orbital speed'), fm(r`E = -\dfrac{GMm}{2r}`, 'Total energy of a circular orbit')],
      V.cannon,
      [4],
      [V.orbit, plotVorb, plotE, TABLES.T6, TABLES.T7],
    ),
  ],
  exam_tips_md: `- Quote Kepler’s laws in words; for T² ∝ a³ use the semi-major axis a of an ellipse.
- Add forces of several masses as vectors; potentials as numbers.
- g′ falls as the inverse square above the surface (exact) and linearly below it (uniform Earth).
- Say that the potential energy is zero at infinity before using −GMm/r; bound energies are negative.
- Derive v_e from energy and v_orbit from force; use gR² for GM when g and R are given.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'State Kepler’s law of orbits.', 'Each planet moves in an ellipse with the Sun at one focus.', 'concept', 1),
    fc(2, 'State Kepler’s law of areas.', 'The line from the Sun to a planet sweeps out equal areas in equal intervals of time.', 'concept', 1),
    fc(3, 'State Kepler’s law of periods.', 'The square of the period is proportional to the cube of the semi-major axis: $T^2 \\propto a^3$.', 'concept', 1),
    fc(4, 'Why is a planet fastest at perihelion?', 'Gravity is central, so angular momentum is conserved: $v r$ is constant at the extreme points, and r is smallest at perihelion.', 'concept', 1),
    fc(5, 'Write Newton’s law of gravitation.', '$F = G m_1 m_2/r^2$, attractive and along the line joining the bodies.', 'formula', 1),
    fc(6, 'Value and unit of G.', '$6.67 \\times 10^{-11}$ N m² kg⁻².', 'fact', 1),
    fc(7, 'If the distance between two masses is doubled, what happens to the force?', 'It falls to one quarter (inverse-square law).', 'concept', 1),
    fc(8, 'How do you find the force on a mass due to several others?', 'Add the individual forces as vectors (superposition).', 'concept', 1),
    fc(9, 'Orbit period of a body at 9.0 AU from the Sun?', '27 years, since $T = a^{3/2} = 9^{1.5}$.', 'example', 1),
    fc(10, 'Write g in terms of G, M and R.', '$g = GM/R^2$.', 'formula', 2),
    fc(11, 'Does g depend on the mass of the falling body?', 'No: the mass cancels in $a = F/m = GM/R^2$.', 'concept', 2),
    fc(12, 'Write g at a height h above the surface.', '$g\' = g R^2/(R+h)^2 \\approx g(1 - 2h/R)$ for $h \\ll R$.', 'formula', 2),
    fc(13, 'What is g at a height equal to the Earth’s radius?', '$g/4$.', 'example', 2),
    fc(14, 'Write g at a depth d (uniform Earth).', '$g\' = g(1 - d/R)$.', 'formula', 2),
    fc(15, 'What is g at the centre of the Earth (uniform model)?', 'Zero.', 'fact', 2),
    fc(16, 'Why does only the inner sphere pull a body at depth d?', 'The shell outside radius R − d exerts zero net force on a body inside it.', 'concept', 2),
    fc(17, 'Which falls faster over a small distance x: g above or below the surface?', 'Above: the fractional fall is 2x/R against x/R below.', 'concept', 2),
    fc(18, 'Same density, radius doubled: what happens to g?', 'It doubles, since $g = \\tfrac{4}{3}\\pi G\\rho R$.', 'example', 2),
    fc(19, 'Write the gravitational potential energy of m at distance r from M.', '$U = -GMm/r$ (zero at infinity).', 'formula', 3),
    fc(20, 'Why is U negative?', 'Gravity does positive work as the mass comes in from infinity, where U = 0.', 'concept', 3),
    fc(21, 'Define gravitational potential.', 'Potential energy per unit mass: $V = -GM/r$, a scalar; unit J kg⁻¹.', 'concept', 3),
    fc(22, 'How do potentials of several masses combine?', 'Add them as scalars.', 'concept', 3),
    fc(23, 'Exact work to raise m from R to R + h?', '$mgRh/(R+h)$, which tends to $mgh$ for small h.', 'formula', 3),
    fc(24, 'Write the escape speed.', '$v_e = \\sqrt{2GM/R} = \\sqrt{2gR}$; 11.2 km/s for the Earth.', 'formula', 4),
    fc(25, 'Does escape speed depend on the projectile’s mass?', 'No; the mass cancels from the energy condition.', 'concept', 4),
    fc(26, 'Orbital speed of a satellite at radius r?', '$v = \\sqrt{GM/r}$, independent of the satellite’s mass.', 'formula', 4),
    fc(27, 'Period of a circular orbit?', '$T = 2\\pi\\sqrt{r^3/GM}$.', 'formula', 4),
    fc(28, 'Ratio of escape speed to orbital speed at the same radius?', '$\\sqrt{2}$.', 'fact', 4),
    fc(29, 'Write K, U and E for a satellite in a circular orbit.', '$K = GMm/2r$, $U = -GMm/r$, $E = -GMm/2r = -K$.', 'formula', 4),
    fc(30, 'Exam tip: what happens to a low satellite as air drag removes energy?', 'E becomes more negative, so r decreases and the speed increases.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};

// ISC 12 Physics ch07 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, coilPlot, finitePlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Moving Charges and Magnetic Field — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Oersted’s experiment and the definition of B',
      `- **Oersted (1820):** a compass needle near a current-carrying wire deflects, and the deflection reverses with the current: a current produces a **magnetic field**. Field lines of a straight wire are circles round it (right-hand grip rule).
- A charge q moving with velocity **v** in a field **B** feels $\\vec F = q(\\vec v \\times \\vec B)$, of size $qvB\\sin\\theta$, perpendicular to both **v** and **B**. This defines B: $B = F/(qv\\sin\\theta)$.
- Unit: **tesla**, 1 T = 1 N A⁻¹ m⁻¹ = 1 N s C⁻¹ m⁻¹; 1 gauss = 10⁻⁴ T. No force on a charge at rest or moving along B.`,
      [kt('Magnetic field (B)', 'Vector field defined by the force F = q(v × B) on a moving charge; unit tesla.'), kt('Tesla', 'Field in which a charge of 1 C moving at 1 m s⁻¹ perpendicular to the field feels 1 N.')],
      [fm(r`\vec F = q\left(\vec v \times \vec B\right)`, 'Magnetic force on a moving charge')],
      V.forcedef,
      [1],
      [V.oersted],
    ),
    sec(
      '2. The Biot–Savart law',
      `$d\\vec B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,d\\vec l \\times \\vec r}{r^3}$, size $dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}$, with $\\mu_0 = 4\\pi \\times 10^{-7}$ T m A⁻¹.
- $d\\vec B$ is perpendicular to the plane of $d\\vec l$ and $\\vec r$; zero along the line of the element.
- Compared with Coulomb’s law: both inverse-square and both obey superposition; but the source $I\\,d\\vec l$ is a vector, the field depends on $\\sin\\theta$ and is perpendicular to $\\vec r$ (the electric field is along $\\vec r$).`,
      [kt('Permeability of free space', 'μ₀ = 4π × 10⁻⁷ T m A⁻¹; μ₀/4π = 10⁻⁷.')],
      [fm(r`d\vec B = \dfrac{\mu_0}{4\pi}\,\dfrac{I\,d\vec l \times \vec r}{r^3}`, 'Biot–Savart law')],
      V.biot,
      [1],
    ),
    sec(
      '3. Circular coil: centre and axis',
      `- **Centre** of a coil of N turns, radius R: every element is at 90° to the line to the centre and at distance R, so $B = \\dfrac{\\mu_0NI}{2R}$ along the axis (right-hand grip rule).
- **Axis**, distance x from the centre: components across the axis cancel in pairs; $B = \\dfrac{\\mu_0NIR^2}{2(R^2 + x^2)^{3/2}}$. Far away, $B \\approx \\mu_0NIR^2/2x^3$.
- Example: 40 turns, R = 8.0 cm, 0.60 A gives 1.88 × 10⁻⁴ T at the centre and 0.512 of that at x = 6.0 cm.`,
      [kt('Right-hand grip rule (coil)', 'Curl the fingers of the right hand along the current; the thumb gives the field at the centre.')],
      [fm(r`B = \dfrac{\mu_0NI}{2R}`, 'Centre of a coil'), fm(r`B = \dfrac{\mu_0NIR^2}{2\left(R^2 + x^2\right)^{3/2}}`, 'Axis of a coil')],
      V.loop,
      [2],
      [coilPlot],
    ),
    sec(
      '4. Ampere’s circuital law and its uses',
      `- $\\oint \\vec B \\cdot d\\vec l = \\mu_0 I_{\\text{enclosed}}$ round any closed loop; currents outside do not count, opposite currents count with opposite signs. Useful when symmetry makes B constant along the loop.
- **Long straight wire:** $B = \\mu_0I/2\\pi r$, circles round the wire.
- **Long solenoid:** $B = \\mu_0nI$ inside (n = turns per metre), uniform and along the axis; weak outside; independent of the radius.
- **Finite straight wire** (formula only): $B = \\dfrac{\\mu_0I}{4\\pi a}(\\sin\\alpha + \\sin\\beta)$, angles from the perpendicular; long wire $\\alpha = \\beta = 90^\\circ$.`,
      [kt('Amperian loop', 'Closed path chosen so that B is constant in size and along (or across) the path, making the line integral easy.'), kt('Solenoid', 'Long, closely wound coil; field inside μ₀nI.')],
      [fm(r`\oint \vec B \cdot d\vec l = \mu_0 I_{\text{enc}}`, 'Ampere’s circuital law'), fm(r`B = \dfrac{\mu_0I}{2\pi r},\qquad B = \mu_0nI`, 'Long wire; long solenoid'), fm(r`B = \dfrac{\mu_0I}{4\pi a}\left(\sin\alpha + \sin\beta\right)`, 'Finite wire')],
      V.ampere,
      [3],
      [V.solenoid, V.finite, finitePlot],
    ),
    sec(
      '5. Lorentz force and the motion of charges',
      `- $\\vec F = q(\\vec E + \\vec v \\times \\vec B)$. The magnetic part is perpendicular to **v**, so it does **no work**: speed and kinetic energy stay constant.
- $\\vec v \\perp \\vec B$: circle, $r = mv/qB$, $T = 2\\pi m/qB$ (independent of v), $f = qB/2\\pi m$.
- At angle θ: helix, $r = mv\\sin\\theta/qB$, pitch $p = 2\\pi mv\\cos\\theta/qB$. Along B: straight line.
- Crossed E and B: undeflected when $v = E/B$ (velocity selector).`,
      [kt('Lorentz force', 'Total force q(E + v × B) on a charge moving in electric and magnetic fields.'), kt('Pitch', 'Distance a charge on a helix moves along the field in one revolution.')],
      [fm(r`\vec F = q\left(\vec E + \vec v \times \vec B\right)`, 'Lorentz force'), fm(r`r = \dfrac{mv}{qB},\qquad T = \dfrac{2\pi m}{qB}`, 'Circular motion')],
      V.circle,
      [4],
      [V.helix, V.selector],
    ),
    sec(
      '6. Forces on currents; the ampere and the coulomb',
      `- Conductor of length l: $\\vec F = I(\\vec l \\times \\vec B)$, $F = BIl\\sin\\theta$ (from $nAl$ electrons each feeling $ev_dB\\sin\\theta$, with $I = nAev_d$). Zero when the wire is along B.
- Parallel wires: $f = \\dfrac{\\mu_0I_1I_2}{2\\pi r}$ per unit length; like currents **attract**, unlike **repel**; equal and opposite forces.
- **Ampere:** the steady current in each of two long, thin, parallel wires 1 m apart in vacuum that gives a force of 2 × 10⁻⁷ N per metre. **Coulomb:** the charge carried in 1 s by 1 A (1 C = 1 A s).`,
      [kt('Ampere', 'Current in each of two long parallel wires 1 m apart in vacuum giving 2 × 10⁻⁷ N per metre between them.'), kt('Coulomb', 'Charge passing a point in 1 s when the current is 1 A.')],
      [fm(r`\vec F = I\left(\vec l \times \vec B\right)`, 'Force on a conductor'), fm(r`\dfrac{F}{l} = \dfrac{\mu_0I_1I_2}{2\pi r}`, 'Parallel currents')],
      V.parallel,
      [5],
      [V.rod],
    ),
  ],
  exam_tips_md: `- Write the Biot–Savart law and the Lorentz force in vector form.
- Convert cm to m; μ₀/4π = 10⁻⁷, μ₀/2π = 2 × 10⁻⁷.
- Coils: N turns; solenoids: n turns per metre.
- Directions: set up x, y, z axes and use the cross product; reverse for electrons.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What did Oersted observe in 1820?', 'A compass needle near a current-carrying wire deflects; reversing the current reverses the deflection.', 'fact', 1),
    fc(2, 'Magnetic force on a charge q moving with velocity v in field B?', '$\\vec F = q(\\vec v \\times \\vec B)$, size $qvB\\sin\\theta$.', 'formula', 1),
    fc(3, 'Direction of the magnetic force on a moving charge?', 'Perpendicular to both v and B.', 'fact', 1),
    fc(4, 'SI unit of B, in base-derived form?', 'Tesla: 1 T = 1 N A⁻¹ m⁻¹.', 'fact', 1),
    fc(5, 'One gauss in tesla?', '10⁻⁴ T.', 'fact', 1),
    fc(6, 'Biot–Savart law (vector form)?', '$d\\vec B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,d\\vec l \\times \\vec r}{r^3}$.', 'formula', 1),
    fc(7, 'Value of μ₀?', '4π × 10⁻⁷ T m A⁻¹.', 'fact', 1),
    fc(8, 'Field of a current element at a point on its own line?', 'Zero (sin θ = 0).', 'concept', 1),
    fc(9, 'Field at the centre of a coil of N turns, radius R?', '$\\mu_0NI/2R$.', 'formula', 2),
    fc(10, 'Field on the axis of a coil at distance x?', '$\\mu_0NIR^2/2(R^2 + x^2)^{3/2}$.', 'formula', 2),
    fc(11, 'How does the axial field of a coil fall far away?', 'As 1/x³.', 'concept', 2),
    fc(12, 'Current anticlockwise as you look at a coil: field at the centre?', 'Towards you (right-hand grip rule).', 'concept', 2),
    fc(13, 'Ampere’s circuital law?', '$\\oint \\vec B \\cdot d\\vec l = \\mu_0 I_{\\text{enc}}$.', 'formula', 3),
    fc(14, 'Field near a long straight wire?', '$\\mu_0I/2\\pi r$.', 'formula', 3),
    fc(15, 'Shape of the field lines of a long straight wire?', 'Concentric circles in planes perpendicular to the wire.', 'fact', 3),
    fc(16, 'Field inside a long solenoid?', '$\\mu_0nI$, n = turns per metre.', 'formula', 3),
    fc(17, 'Does the solenoid field depend on its radius?', 'No: only on n and I.', 'concept', 3),
    fc(18, 'Field of a finite straight wire?', '$(\\mu_0I/4\\pi a)(\\sin\\alpha + \\sin\\beta)$.', 'formula', 3),
    fc(19, 'Lorentz force?', '$q(\\vec E + \\vec v \\times \\vec B)$.', 'formula', 4),
    fc(20, 'Work done by a magnetic force on a moving charge?', 'Zero: the force is perpendicular to v.', 'concept', 4),
    fc(21, 'Radius of the circle for v ⊥ B?', '$mv/qB$.', 'formula', 4),
    fc(22, 'Period of revolution in a uniform B?', '$2\\pi m/qB$, independent of speed.', 'formula', 4),
    fc(23, 'Path when v makes an angle θ (not 0° or 90°) with B?', 'A helix about the field direction.', 'concept', 4),
    fc(24, 'Pitch of the helix?', '$2\\pi mv\\cos\\theta/qB$.', 'formula', 4),
    fc(25, 'Speed passed undeflected by crossed E and B?', '$v = E/B$.', 'formula', 4),
    fc(26, 'Force on a straight conductor in B?', '$\\vec F = I(\\vec l \\times \\vec B)$, $BIl\\sin\\theta$.', 'formula', 5),
    fc(27, 'Force per metre between parallel currents?', '$\\mu_0I_1I_2/2\\pi r$; like currents attract.', 'formula', 5),
    fc(28, 'Definition of one ampere?', 'Current in each of two long parallel wires 1 m apart in vacuum giving 2 × 10⁻⁷ N per metre.', 'fact', 5),
    fc(29, 'Definition of one coulomb?', 'Charge carried in 1 s by a current of 1 A.', 'fact', 5),
    fc(30, 'Exam tip: direction of a magnetic force on an electron?', 'Work out v × B, then reverse it.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};

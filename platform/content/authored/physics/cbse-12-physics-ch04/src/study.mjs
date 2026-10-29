// ch04 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, loopPlot, wirePlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Moving Charges and Magnetism — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Lorentz force and motion of charges',
      `**Lorentz force:** $\\vec F = q(\\vec E + \\vec v \\times \\vec B)$. Magnetic part $qvB\\sin\\theta$, perpendicular to $\\vec v$ and $\\vec B$; zero for $v = 0$ or $\\vec v \\parallel \\vec B$; does **no work** (speed constant). Unit of $B$: tesla (T).

**Uniform $\\vec B$, $\\vec v \\perp \\vec B$:** circle with $r = \\dfrac{mv}{qB}$, period $T = \\dfrac{2\\pi m}{qB}$, frequency $f = \\dfrac{qB}{2\\pi m}$ — independent of speed. With a component of $\\vec v$ along $\\vec B$: a **helix** (pitch $= v_\\parallel T$).

**Crossed fields (velocity selector):** $\\vec E \\perp \\vec B \\perp \\vec v$ with opposing forces; undeflected when $qE = qvB$, i.e. $v = E/B$, for any charge or mass.`,
      [kt('Lorentz force', 'The total force on a charge in electric and magnetic fields, $q(\\vec E + \\vec v \\times \\vec B)$.'), kt('Tesla', 'Field in which a charge of 1 C moving at 1 m s⁻¹ perpendicular to it feels 1 N.')],
      [fm(r`\vec F = q\left(\vec E + \vec v \times \vec B\right)`, 'Lorentz force'), fm(r`r = \dfrac{mv}{qB},\qquad T = \dfrac{2\pi m}{qB}`, 'Circular motion'), fm(r`v = \dfrac{E}{B}`, 'Velocity selector')],
      V.circle,
      [1],
      [V.selector],
    ),
    sec(
      '2. Biot–Savart law and the circular loop',
      `**Biot–Savart law:** $d\\vec B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,d\\vec l \\times \\hat r}{r^2}$, $dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}$, $\\mu_0 = 4\\pi \\times 10^{-7}$ T m A$^{-1}$.

**Axis of a circular loop** (radius $R$, distance $x$): each element is at distance $\\sqrt{R^2+x^2}$ and perpendicular to the line to P, so $dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl}{R^2+x^2}$. Perpendicular components cancel in pairs; axial components $dB\\cos\\alpha$ with $\\cos\\alpha = R/\\sqrt{R^2+x^2}$ add over $\\oint dl = 2\\pi R$:
$$B = \\dfrac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$$
At the centre $B = \\mu_0 I/2R$ ($N$ turns: multiply by $N$). Far away ($x \\gg R$): $B \\approx \\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{x^3}$ with $m = I\\pi R^2$. Direction: right-hand rule (fingers with the current, thumb along $\\vec B$).`,
      [kt('Biot–Savart law', 'Gives the magnetic field of a small current element.'), kt('Permeability of free space', '$\\mu_0 = 4\\pi \\times 10^{-7}$ T m A⁻¹.')],
      [fm(r`dB = \dfrac{\mu_0}{4\pi}\,\dfrac{I\,dl\sin\theta}{r^2}`, 'Biot–Savart'), fm(r`B = \dfrac{\mu_0 I R^2}{2\left(R^2 + x^2\right)^{3/2}}`, 'Loop axis')],
      V.loop,
      [2],
      [V.biot, loopPlot],
    ),
    sec(
      '3. Ampere’s circuital law',
      `$$\\oint \\vec B\\cdot d\\vec l = \\mu_0 I_\\text{enc}$$
- **Long straight wire:** circle of radius $r$ round the wire; $B$ tangential and constant: $B = \\dfrac{\\mu_0 I}{2\\pi r}$. Field lines are concentric circles (right-hand thumb rule).
- **Long solenoid** ($n$ turns per metre): uniform field inside along the axis, $B = \\mu_0 nI$; nearly zero outside; behaves like a bar magnet (treated qualitatively in the syllabus).

Like Gauss’s law, Ampere’s law always holds but gives $B$ easily only when symmetry makes $B$ constant along the chosen loop.`,
      [kt('Amperian loop', 'A closed path chosen to apply Ampere’s circuital law.'), kt('Solenoid', 'A long, closely wound helical coil.')],
      [fm(r`B = \dfrac{\mu_0 I}{2\pi r}`, 'Long straight wire'), fm(r`B = \mu_0 n I`, 'Long solenoid')],
      V.ampere,
      [3],
      [wirePlot, V.solenoid],
    ),
    sec(
      '4. Forces on currents; the ampere',
      `**Force on a straight conductor:** $\\vec F = I\\vec l \\times \\vec B$, $F = IlB\\sin\\theta$.

**Two long parallel wires** a distance $d$ apart: $\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}$. Currents in the **same** direction **attract**; opposite currents **repel**. The forces on the two wires are equal and opposite.

**Ampere (classic definition):** the current which, in each of two long parallel wires 1 m apart in vacuum, produces a force of $2 \\times 10^{-7}$ N per metre of length.`,
      [kt('Ampere', 'Current in two long parallel wires 1 m apart giving a force of 2 × 10⁻⁷ N per metre between them.')],
      [fm(r`\vec F = I\,\vec l \times \vec B`, 'Force on a wire'), fm(r`\dfrac{F}{L} = \dfrac{\mu_0 I_1 I_2}{2\pi d}`, 'Parallel currents')],
      V.parallel,
      [4],
    ),
    sec(
      '5. Torque on a current loop; magnetic dipole',
      `A coil of $N$ turns, area $A$, current $I$ in a uniform field: net force zero; torque
$$\\tau = NIAB\\sin\\theta,\\qquad \\vec\\tau = \\vec m \\times \\vec B,\\qquad \\vec m = NI\\vec A$$
($\\theta$ between the normal to the coil and $\\vec B$). Maximum when the plane of the coil is parallel to $\\vec B$; zero when it is perpendicular. Stable equilibrium with $\\vec m$ along $\\vec B$.

A current loop is a **magnetic dipole** (moment in A m²), the analogue of an electric dipole: $\\vec\\tau = \\vec p\\times\\vec E$ ↔ $\\vec\\tau = \\vec m\\times\\vec B$; far field $\\propto m/r^3$.`,
      [kt('Magnetic dipole moment', '$\\vec m = NI\\vec A$, directed along the normal given by the right-hand rule.')],
      [fm(r`\vec\tau = \vec m \times \vec B,\qquad m = NIA`, 'Torque on a coil')],
      V.torque,
      [5],
    ),
    sec(
      '6. Moving coil galvanometer',
      `Coil on a soft-iron core in a **radial** field (concave pole pieces), so the torque is $NIAB$ at all deflections; spring restoring torque $k\\phi$. Equilibrium: $\\phi = \\dfrac{NAB}{k}I$ — linear scale.

- **Current sensitivity** $\\phi/I = NAB/k$; **voltage sensitivity** $\\phi/V = NAB/kG$.
- Raising $N$ raises current sensitivity but also $G$, so voltage sensitivity may not rise.

**Conversions** ($G$, full-scale $I_g$):
- Ammeter of range $I$: shunt $S = \\dfrac{I_gG}{I - I_g}$ in **parallel** (very low total resistance; connected in series).
- Voltmeter of range $V$: $R = \\dfrac{V}{I_g} - G$ in **series** (very high total resistance; connected in parallel).`,
      [kt('Radial field', 'Field whose lines point along radii, so the plane of the coil always lies along the field.'), kt('Current sensitivity', 'Deflection per unit current, $NAB/k$.'), kt('Shunt', 'Small resistance connected in parallel with a galvanometer.')],
      [fm(r`\phi = \dfrac{NAB}{k}\,I`, 'Galvanometer'), fm(r`S = \dfrac{I_g G}{I - I_g},\qquad R = \dfrac{V}{I_g} - G`, 'Conversions')],
      V.meters,
      [6],
    ),
  ],
  exam_tips_md: `- Directions: right-hand rule for $\\vec v \\times \\vec B$ and $I\\vec l \\times \\vec B$; reverse for negative charges.
- Derivations to practise: field on the axis of a loop; force between parallel currents; torque on a rectangular coil.
- Constants: $\\mu_0/4\\pi = 10^{-7}$, $\\mu_0/2\\pi = 2 \\times 10^{-7}$ (SI).
- Galvanometer: explain the radial field and the linear scale; ammeter low resistance in series, voltmeter high resistance in parallel.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Lorentz force?', '$\\vec F = q(\\vec E + \\vec v \\times \\vec B)$.', 'formula', 1),
    fc(2, 'Magnetic force on a charge moving along B?', 'Zero.', 'fact', 1),
    fc(3, 'Why does a magnetic force do no work?', 'It is always perpendicular to the velocity.', 'concept', 1),
    fc(4, 'Radius and period of circular motion in B?', '$r = mv/qB$; $T = 2\\pi m/qB$ (independent of v).', 'formula', 1),
    fc(5, 'Path when v makes an angle with B?', 'A helix.', 'fact', 1),
    fc(6, 'Speed selected by crossed E and B?', '$v = E/B$.', 'formula', 1),
    fc(7, 'Biot–Savart law?', '$dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}$, perpendicular to dl and r.', 'formula', 2),
    fc(8, 'Value of μ₀?', '$4\\pi \\times 10^{-7}$ T m A$^{-1}$.', 'fact', 2),
    fc(9, 'Field on the axis of a loop?', '$\\mu_0 IR^2/2(R^2+x^2)^{3/2}$.', 'formula', 2),
    fc(10, 'Field at the centre of a coil of N turns?', '$\\mu_0 NI/2R$.', 'formula', 2),
    fc(11, 'Direction of the field of a loop?', 'Curl right-hand fingers with the current; thumb gives B.', 'concept', 2),
    fc(12, 'Ampere’s circuital law?', '$\\oint \\vec B\\cdot d\\vec l = \\mu_0 I_\\text{enc}$.', 'formula', 3),
    fc(13, 'Field of a long straight wire?', '$\\mu_0 I/2\\pi r$, circles round the wire.', 'formula', 3),
    fc(14, 'Field inside a long solenoid?', '$\\mu_0 nI$, uniform, along the axis.', 'formula', 3),
    fc(15, 'Field just outside a long solenoid (middle)?', 'Nearly zero.', 'fact', 3),
    fc(16, 'Force on a straight wire in B?', '$\\vec F = I\\vec l \\times \\vec B$; $IlB\\sin\\theta$.', 'formula', 4),
    fc(17, 'Force per length between parallel wires?', '$\\mu_0 I_1I_2/2\\pi d$.', 'formula', 4),
    fc(18, 'Parallel currents in the same direction?', 'Attract.', 'fact', 4),
    fc(19, 'Classic definition of the ampere?', 'Current giving $2 \\times 10^{-7}$ N m$^{-1}$ between two long parallel wires 1 m apart in vacuum.', 'definition', 4),
    fc(20, 'Torque on a coil in B?', '$\\tau = NIAB\\sin\\theta$, θ between normal and B.', 'formula', 5),
    fc(21, 'Magnetic moment of a coil?', '$m = NIA$ (A m²), along the right-hand normal.', 'definition', 5),
    fc(22, 'Coil orientation for maximum torque?', 'Plane of the coil parallel to B (normal perpendicular to B).', 'concept', 5),
    fc(23, 'Net force on a current loop in a uniform field?', 'Zero (only a torque).', 'fact', 5),
    fc(24, 'Why a radial field in a galvanometer?', 'Torque NIAB at every angle, so deflection ∝ current (linear scale).', 'concept', 6),
    fc(25, 'Current sensitivity of a galvanometer?', '$NAB/k$.', 'formula', 6),
    fc(26, 'Converting a galvanometer to an ammeter?', 'Small shunt in parallel: $S = I_gG/(I - I_g)$.', 'formula', 6),
    fc(27, 'Converting a galvanometer to a voltmeter?', 'Large resistance in series: $R = V/I_g - G$.', 'formula', 6),
    fc(28, 'Ideal ammeter and voltmeter resistances?', 'Ammeter zero; voltmeter infinite.', 'concept', 6),
    fc(29, 'Exam tip: direction of force on an electron?', 'Find v × B, then reverse it.', 'exam-tip', 1),
    fc(30, 'Exam tip: θ in τ = NIAB sin θ?', 'Angle between the coil’s normal and B, not the plane.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};

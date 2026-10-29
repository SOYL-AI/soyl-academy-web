// ch02 notes and flashcards.
import { T, unit, table, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, potPlot, shellVPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electrostatic Potential and Capacitance — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Potential and potential difference',
      `The electrostatic force is **conservative**, so the work done in moving a charge between two points is independent of the path.

- **Potential difference:** $V_B - V_A = W_{A\\to B}/q$, the work done by an external agent per unit positive charge (moved slowly, without acceleration).
- **Potential at a point:** work per unit charge to bring a test charge from infinity ($V_\\infty = 0$). Unit **volt** ($1\\ \\text{V} = 1\\ \\text{J C}^{-1}$). A scalar.
- **Point charge:** $V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r}$.
- **System of charges:** $V = k\\sum q_i/r_i$, an algebraic (signed) sum.
- **Dipole** ($r \\gg a$): $V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p\\cos\\theta}{r^2}$; on the axis $kp/r^2$, on the equatorial plane **0**.
- **Charged shell or conducting sphere** (radius $R$): $V = kq/r$ outside; $V = kq/R$ everywhere on and inside.`,
      [kt('Electric potential', 'Work done per unit positive test charge in bringing it from infinity to the point.'), kt('Volt', 'One joule of work per coulomb of charge.')],
      [fm(r`V = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r}`, 'Point charge'), fm(r`V = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p\cos\theta}{r^2}`, 'Dipole'), fm(r`W_{A\to B} = q(V_B - V_A)`, 'Work by an external agent')],
      potPlot,
      [1],
      [shellVPlot],
    ),
    sec(
      '2. Equipotential surfaces and the field',
      `An **equipotential surface** has the same potential everywhere on it.

- No work is done in moving a charge along it.
- $\\vec E$ is **perpendicular** to it at every point and points towards **lower** potential.
- Equipotentials never intersect.
- Shapes: point charge → concentric spheres; uniform field → parallel planes perpendicular to $\\vec E$; dipole → closed surfaces round each charge with the $V = 0$ plane midway.

**Field from potential:** $E = -\\dfrac{dV}{dl}$ along the direction of greatest decrease. In a uniform field $E = \\Delta V/d$. Closely spaced equipotentials mean a strong field. V m$^{-1}$ = N C$^{-1}$.`,
      [kt('Equipotential surface', 'A surface on which the potential has the same value at every point.'), kt('Potential gradient', 'Rate of change of potential with distance; the field is its negative.')],
      [fm(r`E = -\dfrac{dV}{dl},\qquad E = \dfrac{\Delta V}{d}\ \text{(uniform)}`, 'Field and potential')],
      V.dipole,
      [2],
      [V.point, V.uniform],
    ),
    sec(
      '3. Potential energy',
      `**Two charges:** $U = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r_{12}}$ (work to bring them from infinity to separation $r_{12}$). Positive for like charges, negative for unlike (bound).

**Three or more charges:** sum over every **pair** once, e.g. $U = k\\left(\\dfrac{q_1q_2}{r_{12}} + \\dfrac{q_1q_3}{r_{13}} + \\dfrac{q_2q_3}{r_{23}}\\right)$.

**Charge in an external potential:** $U = qV(\\vec r)$. Two charges in an external field: $U = q_1V(\\vec r_1) + q_2V(\\vec r_2) + \\dfrac{kq_1q_2}{r_{12}}$.

**Dipole in a uniform field:** $U(\\theta) = -pE\\cos\\theta = -\\vec p\\cdot\\vec E$. Minimum $-pE$ at $\\theta = 0$ (stable); maximum $+pE$ at $180^\\circ$ (unstable). Work to rotate from $\\theta_1$ to $\\theta_2$: $pE(\\cos\\theta_1 - \\cos\\theta_2)$.

*Electron volt:* $1\\ \\text{eV} = 1.6 \\times 10^{-19}$ J, the energy gained by an electron through 1 V.`,
      [kt('Potential energy of a system', 'Work done in assembling the charges from infinite separation.'), kt('Electron volt', 'Energy gained by a charge $e$ moving through a potential difference of 1 V; $1.6 \\times 10^{-19}$ J.')],
      [fm(r`U = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r_{12}}`, 'Two charges'), fm(r`U = -\vec p\cdot\vec E`, 'Dipole in a uniform field')],
      V.triangle,
      [3],
    ),
    sec(
      '4. Conductors in electrostatics',
      `In electrostatic equilibrium:

1. $\\vec E = 0$ inside the conductor;
2. just outside, $\\vec E$ is normal to the surface, $E = \\sigma/\\varepsilon_0$;
3. there is no net charge inside; excess charge sits on the surface;
4. the potential is the same everywhere in and on the conductor;
5. a charge-free cavity has $\\vec E = 0$ whatever the outside fields — **electrostatic shielding** (why a car or a metal cage protects people in a thunderstorm, and why sensitive instruments are kept in metal cases).

Charge density is larger where the surface is more sharply curved (pointed ends).`,
      [kt('Electrostatic shielding', 'The field inside a charge-free cavity of a conductor is zero, whatever charges or fields are outside.')],
      [fm(r`E_\text{surface} = \dfrac{\sigma}{\varepsilon_0}\,\hat n`, 'Field just outside a conductor')],
      V.conductor,
      [4],
    ),
    sec(
      '5. Dielectrics and polarisation',
      `A **dielectric** is an insulator. In an external field:

- **non-polar** molecules (O₂, H₂) acquire **induced** dipoles;
- **polar** molecules (H₂O, HCl) have permanent dipoles that partly **align** with the field (opposed by thermal motion).

The material becomes **polarised**: dipole moment per unit volume $\\vec P$, proportional to $\\vec E$ for most materials. Bound charges appear on the surfaces facing the plates and produce a field opposite to the applied one, so the field inside is reduced: $E = E_0/K$, where $K$ (or $\\varepsilon_r$) is the **dielectric constant**. $\\varepsilon = K\\varepsilon_0$.`,
      [kt('Polarisation', 'Dipole moment per unit volume of a dielectric in a field.'), kt('Dielectric constant', 'The factor $K$ by which a dielectric reduces the field (and increases the capacitance).')],
      [fm(r`E = \dfrac{E_0}{K},\qquad \varepsilon = K\varepsilon_0`, 'Dielectric')],
      V.dielectric,
      [4],
    ),
    sec(
      '6. Capacitors and capacitance',
      `A capacitor: two conductors with charges $+Q$ and $-Q$ separated by an insulator. $C = Q/V$, unit **farad** (μF, nF, pF in practice).

**Parallel plates** (area $A$, gap $d$): field between plates $\\sigma/\\varepsilon_0$ (sheet fields add; outside they cancel), $V = Qd/\\varepsilon_0A$, so $C = \\dfrac{\\varepsilon_0A}{d}$. With a dielectric filling the gap: $C = \\dfrac{K\\varepsilon_0A}{d}$. Slab of thickness $t$: $C = \\dfrac{\\varepsilon_0A}{d - t + t/K}$.

**Combinations:**

| | Series | Parallel |
|---|---|---|
| Same on each | charge $Q$ | voltage $V$ |
| Adds | voltages | charges |
| Equivalent | $\\dfrac{1}{C} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\dots$ | $C = C_1 + C_2 + \\dots$ |

Two in series: $C = \\dfrac{C_1C_2}{C_1 + C_2}$; the smaller capacitor takes the larger voltage.`,
      [kt('Capacitance', 'Charge stored per unit potential difference, $C = Q/V$.'), kt('Farad', 'Capacitance that stores 1 C at 1 V.')],
      [fm(r`C = \dfrac{K\varepsilon_0 A}{d}`, 'Parallel plates'), fm(r`\dfrac{1}{C_s} = \sum \dfrac{1}{C_i},\qquad C_p = \sum C_i`, 'Combinations')],
      V.plates,
      [5],
      [V.combos],
    ),
    sec(
      '7. Energy stored in a capacitor',
      `$$U = \\dfrac{Q^2}{2C} = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2}QV$$
(formula used without derivation; it is the area under the V–Q line). The energy resides in the field between the plates.

**Inserting a dielectric (constant K):**

| | Battery connected (V fixed) | Battery disconnected (Q fixed) |
|---|---|---|
| C | × K | × K |
| Q | × K | unchanged |
| V | unchanged | ÷ K |
| U | × K | ÷ K |

**Sharing charge** between two capacitors conserves charge but always loses energy (heat and radiation in the wires). Two identical capacitors, one charged: half the energy is lost.`,
      [kt('Common potential', 'The final voltage when charged capacitors are joined: total charge divided by total capacitance.')],
      [fm(r`U = \dfrac{Q^2}{2C} = \dfrac{1}{2}CV^2 = \dfrac{1}{2}QV`, 'Stored energy')],
      null,
      [6],
    ),
  ],
  exam_tips_md: `- Keep signs in potentials and energies; add potentials as numbers, not vectors.
- Work by an agent $= q(V_f - V_i)$; along an equipotential it is zero.
- **Connected or disconnected?** Decide first in every dielectric or plate-separation question.
- Series: same Q; parallel: same V. Check that the series result is smaller than the smallest capacitor.
- Convert pF ($10^{-12}$), nF ($10^{-9}$), μF ($10^{-6}$), mm and cm² before substituting.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define potential difference.', 'Work done by an external agent per unit positive charge in moving it from one point to the other: $V_B - V_A = W/q$.', 'definition', 1),
    fc(2, '1 volt = ?', '1 joule per coulomb.', 'fact', 1),
    fc(3, 'Potential of a point charge?', '$V = kq/r$ (signed).', 'formula', 1),
    fc(4, 'Potential of a short dipole?', '$V = kp\\cos\\theta/r^2$.', 'formula', 1),
    fc(5, 'Potential on the equatorial plane of a dipole?', 'Zero (but the field is not zero).', 'fact', 1),
    fc(6, 'Potential inside a charged conducting sphere?', 'Constant, equal to the surface value $kq/R$.', 'concept', 1),
    fc(7, 'Why is no work done along an equipotential?', '$W = q\\Delta V$ and $\\Delta V = 0$.', 'concept', 2),
    fc(8, 'Angle between field lines and equipotentials?', '$90^\\circ$ at every point.', 'fact', 2),
    fc(9, 'Equipotentials of a point charge?', 'Concentric spheres.', 'diagram', 2),
    fc(10, 'Equipotentials of a uniform field?', 'Parallel planes perpendicular to the field.', 'diagram', 2),
    fc(11, 'Relation between E and V?', '$E = -dV/dl$; uniform field $E = \\Delta V/d$.', 'formula', 2),
    fc(12, 'Why can two equipotentials never cross?', 'The crossing point would have two different potentials.', 'concept', 2),
    fc(13, 'Potential energy of two charges?', '$U = kq_1q_2/r$ (signed).', 'formula', 3),
    fc(14, 'Meaning of negative potential energy of two charges?', 'Unlike charges: the system is bound; work must be done to separate them.', 'concept', 3),
    fc(15, 'Number of pair terms for four charges?', 'Six.', 'example', 3),
    fc(16, 'Potential energy of a dipole in a uniform field?', '$U = -pE\\cos\\theta$.', 'formula', 3),
    fc(17, 'Work to turn a dipole from 0° to 180°?', '$2pE$.', 'example', 3),
    fc(18, '1 electron volt in joules?', '$1.6 \\times 10^{-19}$ J.', 'fact', 3),
    fc(19, 'Field inside a conductor in equilibrium?', 'Zero.', 'fact', 4),
    fc(20, 'Field just outside a charged conductor?', '$\\sigma/\\varepsilon_0$, normal to the surface.', 'formula', 4),
    fc(21, 'Electrostatic shielding?', 'Zero field inside a charge-free cavity of a conductor, whatever is outside.', 'definition', 4),
    fc(22, 'Polar vs non-polar dielectric?', 'Polar: permanent molecular dipoles (water). Non-polar: dipoles only induced by the field (oxygen).', 'concept', 4),
    fc(23, 'Effect of a dielectric on the field between plates (same Q)?', 'Reduced from $E_0$ to $E_0/K$.', 'concept', 4),
    fc(24, 'Define capacitance and its unit.', '$C = Q/V$; farad = coulomb per volt.', 'definition', 5),
    fc(25, 'Capacitance of a parallel-plate capacitor?', '$C = \\varepsilon_0A/d$; with dielectric $K\\varepsilon_0A/d$.', 'formula', 5),
    fc(26, 'Series combination rule?', '$1/C = 1/C_1 + 1/C_2 + \\dots$; same charge on each.', 'formula', 5),
    fc(27, 'Parallel combination rule?', '$C = C_1 + C_2 + \\dots$; same voltage across each.', 'formula', 5),
    fc(28, 'Two capacitors in series: which has the larger voltage?', 'The smaller capacitance.', 'concept', 5),
    fc(29, 'Energy stored in a capacitor?', '$U = Q^2/2C = \\tfrac12CV^2 = \\tfrac12QV$.', 'formula', 6),
    fc(30, 'Dielectric inserted, battery connected: U?', 'Increases K times (V fixed, C × K).', 'example', 6),
    fc(31, 'Dielectric inserted, battery disconnected: U?', 'Decreases K times (Q fixed, C × K).', 'example', 6),
    fc(32, 'Exam tip: dielectric questions?', 'First decide whether Q or V is fixed, then track C, Q, V, E, U.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};

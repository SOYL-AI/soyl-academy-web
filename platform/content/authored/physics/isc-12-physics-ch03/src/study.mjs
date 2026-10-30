// ISC 12 Physics ch03 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, VEplot, dipoleUplot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electrostatic Potential and Potential Energy — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Potential, potential difference and equipotentials',
      `- **Potential difference:** $V_B - V_A = W_{AB}/q_0$, work per unit positive test charge moved (without acceleration) from A to B. **Potential:** work per unit charge to bring a test charge from infinity ($V_\\infty = 0$). Unit volt = J C⁻¹; scalar.
- The electrostatic force is conservative: W is independent of path. A positive charge moves naturally from high to low potential.
- **Equipotential surface:** all points at the same V. No work along it; **E is perpendicular** to it; E points from higher to lower V; equipotentials are closer where E is larger; two never intersect. Point charge: concentric spheres; uniform field: parallel planes. Uniform field: $E = \\Delta V/d$.`,
      [kt('Electric potential', 'Work done per unit positive charge in bringing a test charge from infinity to the point.'), kt('Equipotential surface', 'A surface on which every point has the same potential.')],
      [fm(r`V_B - V_A = \dfrac{W_{AB}}{q_0}`, 'Potential difference')],
      V.uniform,
      [1],
    ),
    sec(
      '2. Potential of a point charge',
      `$W = -\\int_\\infty^{r}\\dfrac{kqq_0}{x^2}dx = \\dfrac{kqq_0}{r}$, so $V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r}$: positive near +q, negative near −q.
Graphs: $V \\propto 1/r$ while $E \\propto 1/r^2$ (E falls faster); at any point $V/E = r$.`,
      [],
      [fm(r`V = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r}`, 'Potential of a point charge')],
      VEplot,
      [2],
      [V.point],
    ),
    sec(
      '3. Potential of a system of charges and of a dipole',
      `- System: $V = \\dfrac{1}{4\\pi\\varepsilon_0}\\sum_i \\dfrac{q_i}{r_i}$ (algebraic sum, signs kept). V can be zero where E is not.
- Dipole ($\\pm q$, separation $2a$, $p = 2qa$): **axial** $V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{r^2 - a^2} \\approx \\dfrac{kp}{r^2}$; **equatorial** $V = 0$; **general point** ($r \\gg a$) $V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p\\cos\\theta}{r^2}$. Dipole potential falls as $1/r^2$.
- Dipole equipotentials: closed surfaces round each charge; the perpendicular bisector is the V = 0 equipotential.`,
      [],
      [fm(r`V = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p\cos\theta}{r^2}`, 'Dipole potential (r ≫ a)')],
      V.dpoint,
      [3],
      [V.dipole],
    ),
    sec(
      '4. Potential energy of charges',
      `- A charge $q$ at potential $V$: $U = qV$. 1 eV = $1.6 \\times 10^{-19}$ J (energy of an electron through 1 V).
- Two charges: $U = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r_{12}}$ — the work to bring them from infinity; positive for like charges, negative for unlike (bound).
- Three charges: $U = k\\left(\\dfrac{q_1q_2}{r_{12}} + \\dfrac{q_1q_3}{r_{13}} + \\dfrac{q_2q_3}{r_{23}}\\right)$ (each pair once). Work by an external agent = increase in U.`,
      [kt('Electrostatic potential energy', 'The work done in assembling a system of charges from infinity.'), kt('Electronvolt', 'Energy gained by an electron through a potential difference of one volt.')],
      [fm(r`U = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r_{12}}`, 'Two charges')],
      V.tri,
      [4],
    ),
    sec(
      '5. Potential energy of a dipole in a uniform field',
      `Work to rotate from θ₁ to θ₂: $W = \\int pE\\sin\\theta\\,d\\theta = pE(\\cos\\theta_1 - \\cos\\theta_2)$. With $U(90°) = 0$: $U = -pE\\cos\\theta = -\\vec p\\cdot\\vec E$.
- θ = 0°: $U = -pE$ (minimum, **stable**); θ = 90°: 0; θ = 180°: $+pE$ (maximum, **unstable**).
- Work to turn from 0° to 180°: $2pE$; from 0° to 90°: $pE$.`,
      [kt('Stable equilibrium', 'A position of minimum potential energy, to which the system returns after a small displacement.')],
      [fm(r`U = -\vec p\cdot\vec E = -pE\cos\theta`, 'Dipole energy')],
      V.dpe,
      [5],
      [dipoleUplot],
    ),
  ],
  exam_tips_md: `- Derive V = kq/r from the work from infinity; V(∞) = 0.
- Add potentials algebraically; energies pair by pair.
- U = −pE cos θ: stable at 0°, unstable at 180°; W(0° → 180°) = 2pE.
- Equipotentials ⟂ field lines: give the reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Definition of electric potential?', 'Work per unit positive charge to bring a test charge from infinity.', 'concept', 1),
    fc(2, 'SI unit of potential?', 'Volt = J C⁻¹.', 'fact', 1),
    fc(3, 'Is potential a scalar or a vector?', 'Scalar.', 'fact', 1),
    fc(4, 'Work done moving a charge along an equipotential?', 'Zero.', 'fact', 1),
    fc(5, 'Angle between E and an equipotential surface?', '90°.', 'fact', 1),
    fc(6, 'Equipotentials of a point charge?', 'Concentric spheres.', 'fact', 1),
    fc(7, 'Equipotentials of a uniform field?', 'Parallel planes perpendicular to E.', 'fact', 1),
    fc(8, 'Relation of E and V in a uniform field?', '$E = \\Delta V/d$.', 'formula', 1),
    fc(9, 'Potential of a point charge?', '$V = kq/r$.', 'formula', 2),
    fc(10, 'How do V and E of a point charge depend on r?', 'V ∝ 1/r, E ∝ 1/r².', 'concept', 2),
    fc(11, 'V/E for a point charge?', 'Equals r.', 'concept', 2),
    fc(12, 'Potential of several charges?', 'Algebraic sum of kq/r.', 'formula', 3),
    fc(13, 'Potential on the equatorial line of a dipole?', 'Zero.', 'fact', 3),
    fc(14, 'Potential on the axis of a short dipole?', '$kp/r^2$.', 'formula', 3),
    fc(15, 'Dipole potential at a general point?', '$kp\\cos\\theta/r^2$.', 'formula', 3),
    fc(16, 'Can V be zero where E is not?', 'Yes (e.g. a dipole’s equatorial line).', 'concept', 3),
    fc(17, 'Potential energy of a charge q at potential V?', '$U = qV$.', 'formula', 4),
    fc(18, 'Value of 1 eV?', '$1.6 \\times 10^{-19}$ J.', 'fact', 4),
    fc(19, 'Potential energy of two charges?', '$kq_1q_2/r_{12}$.', 'formula', 4),
    fc(20, 'Sign of U for two unlike charges?', 'Negative.', 'fact', 4),
    fc(21, 'Energy of three charges?', 'Sum over the three pairs.', 'formula', 4),
    fc(22, 'Work by an external agent equals?', 'Increase in potential energy.', 'concept', 4),
    fc(23, 'Potential energy of a dipole in a uniform field?', '$U = -\\vec p\\cdot\\vec E$.', 'formula', 5),
    fc(24, 'Dipole energy at θ = 0°?', '$-pE$ (stable).', 'fact', 5),
    fc(25, 'Dipole energy at θ = 180°?', '$+pE$ (unstable).', 'fact', 5),
    fc(26, 'Work to rotate a dipole from 0° to 180°?', '$2pE$.', 'formula', 5),
    fc(27, 'Where is U = 0 taken for a dipole?', 'At θ = 90°.', 'fact', 5),
    fc(28, 'Example: 5 nC, 30 cm. V?', '150 V.', 'example', 2),
    fc(29, 'Exam tip: adding potentials?', 'As signed numbers, not vectors.', 'exam-tip', 3),
    fc(30, 'Exam tip: multi-charge energy?', 'Each pair once, signs kept.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};

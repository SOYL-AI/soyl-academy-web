// ISC 12 Physics ch01 notes and flashcards.
import { T, unit, PROV, r } from './lib.mjs';
import { V, inverseSq, dipolePlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electric Charges and Fields — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electric charge',
      `- **Frictional electricity:** rubbing transfers **electrons**; the gainer becomes negative, the loser equally positive (glass–silk: glass +; ebonite–fur: ebonite −).
- Two kinds of charge: like charges repel, unlike attract. **Conductors** let charge move freely; **insulators** do not.
- **Quantisation:** $q = n e$, $e = 1.6 \\times 10^{-19}$ C, n an integer. **Conservation:** the total charge of an isolated system is constant. Charge is also additive and the same in all frames.`,
      [kt('Quantisation of charge', 'Every charge is an integral multiple of the electronic charge e.'), kt('Conservation of charge', 'The net charge of an isolated system remains constant.')],
      [fm(r`q = n e`, 'Quantisation')],
      V.forces,
      [1],
    ),
    sec(
      '2. Coulomb’s law and superposition',
      `- $F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r^2}$, $\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}$ N m² C⁻², $\\varepsilon_0 = 8.85 \\times 10^{-12}$ C² N⁻¹ m⁻²; along the line joining the charges.
- Vector form: $\\vec F_{12} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r^2}\\hat r_{12}$ (force on $q_2$, $\\hat r_{12}$ from $q_1$ to $q_2$); $\\vec F_{21} = -\\vec F_{12}$.
- In a medium: $F_m = F/K$, with $K = \\varepsilon/\\varepsilon_0$ (dielectric constant, relative permittivity).
- **Coulomb**: the charge that exerts $9 \\times 10^{9}$ N on an equal charge 1 m away in vacuum.
- Compared with gravitation: both inverse-square and central; electric force can attract or repel, depends on the medium, and is about $10^{36}$ times stronger between two protons.
- **Superposition:** the net force on a charge is the vector sum of the forces due to each other charge, each found as if the others were absent.`,
      [kt('Dielectric constant', 'K = ε/ε₀, the factor by which a medium reduces the force between charges.')],
      [fm(r`F = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}`, 'Coulomb’s law'), fm(r`\vec F_0 = \sum_i \vec F_{0i}`, 'Superposition')],
      V.super,
      [2, 3],
    ),
    sec(
      '3. Electric field and charge densities',
      `- $\\vec E = \\lim_{q_0 \\to 0}\\vec F/q_0$; unit N C⁻¹ = V m⁻¹. A charge in a field feels $\\vec F = q\\vec E$.
- Point charge: $E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2}$, radially outward for $q > 0$, inward for $q < 0$. Several charges: vector sum.
- Between two like charges $q_1$, $q_2$ distance $d$ apart, $E = 0$ at $x = \\dfrac{d\\sqrt{q_1}}{\\sqrt{q_1} + \\sqrt{q_2}}$ from $q_1$.
- Charge densities: linear $\\lambda = dq/dl$ (C m⁻¹), surface $\\sigma = dq/dA$ (C m⁻²), volume $\\rho = dq/dV$ (C m⁻³).`,
      [kt('Electric field', 'Force per unit positive test charge at a point.')],
      [fm(r`E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}`, 'Field of a point charge')],
      inverseSq,
      [4],
    ),
    sec(
      '4. Electric lines of force',
      `- Tangent gives the direction of $\\vec E$; lines start on + charges and end on − charges (or at infinity).
- Two lines **never intersect** (unique direction of $\\vec E$ at a point); they are **denser** where E is larger; electrostatic lines **never form closed loops**; they meet a conductor normally.
- Patterns: radial for a point charge; curved from + to − for a dipole; bending apart with a **neutral point** for two like charges; straight, parallel and equally spaced (uniform field) between oppositely charged parallel plates.`,
      [kt('Neutral point', 'A point where the resultant electric field is zero.')],
      [],
      V.dipole,
      [5],
      [V.like],
    ),
    sec(
      '5. Electric dipole',
      `- Dipole: $+q$ and $-q$ separated by $2a$; moment $\\vec p = q(2a)$ from $-q$ to $+q$ (C m).
- **Axial point** (distance r from centre): $E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2pr}{(r^2 - a^2)^2} \\approx \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2p}{r^3}$, along $\\vec p$.
- **Equatorial point:** $E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{(r^2 + a^2)^{3/2}} \\approx \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{r^3}$, opposite to $\\vec p$. For a short dipole, $E_\\text{axial} = 2E_\\text{eq}$ at the same r.
- **Uniform field:** net force zero; torque $\\vec\\tau = \\vec p \\times \\vec E$, $\\tau = pE\\sin\\theta$ (max $pE$ at 90°, zero at 0° and 180°); the dipole rotates to align with E but does not translate. In a non-uniform field there is also a net force.`,
      [kt('Dipole moment', 'Product of either charge and the separation, directed from −q to +q.')],
      [fm(r`E_\text{axial} \approx \dfrac{1}{4\pi\varepsilon_0}\dfrac{2p}{r^3}`, 'Axial field (short dipole)'), fm(r`E_\text{eq} \approx \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{r^3}`, 'Equatorial field (short dipole)'), fm(r`\vec\tau = \vec p \times \vec E`, 'Torque on a dipole')],
      V.geom,
      [6, 7],
      [dipolePlot, V.torque],
    ),
  ],
  exam_tips_md: `- Convert μC, nC, cm, mm to SI first; give directions for forces and fields.
- Superposition: diagram, components, then magnitude and angle.
- Dipole derivations: labelled figure, exact result, then the r ≫ a approximation.
- Torque: zero net force in a uniform field; τ = pE sin θ and τ = p × E.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What moves when two bodies are charged by rubbing?', 'Electrons.', 'concept', 1),
    fc(2, 'Glass rubbed with silk becomes?', 'Positive (it loses electrons).', 'fact', 1),
    fc(3, 'Quantisation of charge?', '$q = n e$, n an integer.', 'formula', 1),
    fc(4, 'Value of e?', '$1.6 \\times 10^{-19}$ C.', 'fact', 1),
    fc(5, 'Conservation of charge?', 'Total charge of an isolated system is constant.', 'concept', 1),
    fc(6, 'Coulomb’s law?', '$F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r^2}$.', 'formula', 2),
    fc(7, 'Value of 1/4πε₀?', '$9 \\times 10^{9}$ N m² C⁻².', 'fact', 2),
    fc(8, 'Value of ε₀?', '$8.85 \\times 10^{-12}$ C² N⁻¹ m⁻².', 'fact', 2),
    fc(9, 'Force between charges in a medium of dielectric constant K?', '$F/K$.', 'formula', 2),
    fc(10, 'Define one coulomb.', 'Charge exerting 9 × 10⁹ N on an equal charge 1 m away in vacuum.', 'concept', 2),
    fc(11, 'Electric : gravitational force between two protons?', 'About 10³⁶.', 'fact', 2),
    fc(12, 'Superposition principle?', 'Net force is the vector sum of the forces from each charge.', 'concept', 3),
    fc(13, 'Definition of electric field?', 'Force per unit positive test charge.', 'concept', 4),
    fc(14, 'SI unit of electric field?', 'N C⁻¹ (or V m⁻¹).', 'fact', 4),
    fc(15, 'Field of a point charge?', '$E = kq/r^2$.', 'formula', 4),
    fc(16, 'Force on a charge q in a field E?', '$\\vec F = q\\vec E$.', 'formula', 4),
    fc(17, 'Linear charge density and its unit?', 'λ = charge per unit length, C m⁻¹.', 'formula', 4),
    fc(18, 'Surface charge density unit?', 'C m⁻².', 'fact', 4),
    fc(19, 'Why can two field lines never cross?', 'The field would have two directions at one point.', 'concept', 5),
    fc(20, 'Field lines between charged parallel plates?', 'Straight, parallel, equally spaced: a uniform field.', 'fact', 5),
    fc(21, 'What is a neutral point?', 'A point where the resultant field is zero.', 'concept', 5),
    fc(22, 'Direction of the dipole moment?', 'From −q to +q.', 'fact', 6),
    fc(23, 'Axial field of a short dipole?', '$2kp/r^3$, along p.', 'formula', 6),
    fc(24, 'Equatorial field of a short dipole?', '$kp/r^3$, opposite to p.', 'formula', 6),
    fc(25, 'E_axial : E_eq at the same distance (short dipole)?', '2 : 1.', 'fact', 6),
    fc(26, 'Exact axial field of a dipole?', '$\\dfrac{2kpr}{(r^2 - a^2)^2}$.', 'formula', 6),
    fc(27, 'Net force on a dipole in a uniform field?', 'Zero.', 'fact', 7),
    fc(28, 'Torque on a dipole in a uniform field?', '$\\tau = pE\\sin\\theta$; $\\vec\\tau = \\vec p \\times \\vec E$.', 'formula', 7),
    fc(29, 'Exam tip: before substituting?', 'Convert μC, nC, cm and mm to SI.', 'exam-tip', 2),
    fc(30, 'Exam tip: dipole derivations?', 'Labelled figure, exact form, then r ≫ a.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};

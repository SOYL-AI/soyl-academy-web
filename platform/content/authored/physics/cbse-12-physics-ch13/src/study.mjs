// ch13 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, beCurve, forcePlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Nuclei — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Composition and size of nuclei',
      `- Nucleus: $Z$ protons and $N = A - Z$ neutrons (**nucleons**); notation ${'$'}{}^{A}_{Z}\\text{X}$.
- **Isotopes:** same Z, different A. **Isobars:** same A, different Z. **Isotones:** same N.
- Masses in unified atomic mass units: 1 u = 1/12 of the mass of a ¹²C atom = $1.6605 \\times 10^{-27}$ kg; $m_p = 1.007276$ u, $m_n = 1.008665$ u, $m_\\text{H} = 1.007825$ u.
- **Radius:** $R = R_0A^{1/3}$, $R_0 \\approx 1.2$ fm. Volume ∝ A, so nuclear **density** is the same for all nuclei, about $2.3 \\times 10^{17}$ kg m⁻³.`,
      [kt('Nucleon', 'A proton or a neutron.'), kt('Isotopes', 'Nuclides of the same element (same Z) with different mass numbers.')],
      [fm(r`R = R_0A^{1/3}`, 'Nuclear radius')],
      V.sizes,
      [1],
    ),
    sec(
      '2. The nuclear force',
      `- Holds nucleons together against the Coulomb repulsion of protons; **much stronger** than the electrostatic force at nuclear distances.
- **Short range:** strongly attractive around 1 fm, negligible beyond a few fm; **repulsive** below about 0.8 fm (so nuclei do not collapse).
- **Charge-independent:** p–p, n–n and n–p forces are about equal.
- **Saturation:** each nucleon interacts only with its nearest neighbours.`,
      [kt('Nuclear force', 'The strong, short-range, charge-independent attraction between nucleons.')],
      [],
      forcePlot,
      [1],
    ),
    sec(
      '3. Mass–energy, mass defect and binding energy',
      `- $E = mc^2$; 1 u ≈ 931.5 MeV; 1 MeV = $1.6 \\times 10^{-13}$ J.
- **Mass defect:** $\\Delta M = Zm_\\text{H} + (A - Z)m_n - M_\\text{atom}$ (with atomic masses).
- **Binding energy:** $E_b = \\Delta M c^2 = \\Delta M \\times 931.5$ MeV/u: the energy to separate the nucleus into its nucleons.
- **Binding energy per nucleon** $E_{bn} = E_b/A$: about 7.07 MeV for ⁴He, 7.98 MeV for ¹⁶O, a **peak ≈ 8.8 MeV near A = 56**, about 7.6 MeV for ²³⁵U and ²³⁸U.
- Nearly constant $E_{bn}$ for 30 < A < 170 shows the short range (saturation) of the nuclear force; the fall for heavy nuclei is due to Coulomb repulsion.`,
      [kt('Mass defect', 'The difference between the total mass of the separate nucleons and the mass of the nucleus.'), kt('Binding energy', 'Energy equivalent of the mass defect; energy needed to break the nucleus into free nucleons.')],
      [fm(r`E_b = \left[Zm_\text{H} + (A - Z)m_n - M\right]c^2`, 'Binding energy'), fm(r`E_{bn} = \dfrac{E_b}{A}`, 'Binding energy per nucleon')],
      beCurve,
      [2],
    ),
    sec(
      '4. Nuclear fission and fusion',
      `- **Fission:** a heavy nucleus splits into two medium nuclei, e.g. $\\text{n} + {}^{235}\\text{U} \\to {}^{141}\\text{Ba} + {}^{92}\\text{Kr} + 3\\text{n}$; about **200 MeV** per fission (≈ 0.85 MeV per nucleon). The neutrons can sustain a **chain reaction**: uncontrolled in a bomb, controlled in a **reactor** (moderator slows neutrons; control rods absorb them; coolant removes heat).
- **Fusion:** light nuclei join, e.g. $\\,{}^{2}\\text{H} + {}^{3}\\text{H} \\to {}^{4}\\text{He} + \\text{n} + 17.6$ MeV (≈ 3.5 MeV per nucleon). Needs $10^7$–$10^8$ K to overcome Coulomb repulsion (thermonuclear). Powers the Sun: net $4\\,{}^{1}\\text{H} \\to {}^{4}\\text{He}$ + 26.7 MeV.
- **Why both release energy:** the products lie nearer the **peak** of the BE-per-nucleon curve, so they are more tightly bound; the gain in total binding energy is released.
- $Q$ = (mass before − mass after) × 931.5 MeV/u = (total BE after − total BE before).`,
      [kt('Fission', 'Splitting of a heavy nucleus into two lighter nuclei with release of energy.'), kt('Fusion', 'Joining of light nuclei into a heavier nucleus with release of energy.'), kt('Chain reaction', 'A self-sustaining series of fissions caused by the neutrons from earlier fissions.')],
      [fm(r`Q = \left(\sum m_\text{before} - \sum m_\text{after}\right) \times 931.5\ \text{MeV/u}`, 'Energy released')],
      V.fission,
      [3],
      [V.fusion],
    ),
  ],
  exam_tips_md: `- Use $m_\\text{H}$ with atomic masses; keep six decimal places until the end.
- 1 u = 931.5 MeV; 1 MeV = $1.6 \\times 10^{-13}$ J.
- Sketch the BE curve: peak ≈ 8.8 MeV near A = 56; explain fission and fusion from it.
- Balance A and Z in every nuclear equation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What are nucleons?', 'Protons and neutrons.', 'concept', 1),
    fc(2, 'Atomic number Z and mass number A?', 'Z = number of protons; A = number of nucleons.', 'concept', 1),
    fc(3, 'Isotopes?', 'Same Z, different A.', 'concept', 1),
    fc(4, 'Isobars?', 'Same A, different Z.', 'concept', 1),
    fc(5, 'Isotones?', 'Same neutron number N.', 'concept', 1),
    fc(6, '1 u in kg?', '$1.6605 \\times 10^{-27}$ kg.', 'fact', 1),
    fc(7, 'Nuclear radius formula?', '$R = R_0A^{1/3}$, $R_0 \\approx 1.2$ fm.', 'formula', 1),
    fc(8, 'Nuclear density?', 'About $2.3 \\times 10^{17}$ kg m⁻³, the same for all nuclei.', 'fact', 1),
    fc(9, 'Range of the nuclear force?', 'A few fm (short range).', 'fact', 1),
    fc(10, 'Is the nuclear force charge-dependent?', 'No: p–p, n–n, n–p about equal.', 'fact', 1),
    fc(11, 'Nuclear force below 0.8 fm?', 'Repulsive.', 'fact', 1),
    fc(12, 'Energy equivalent of 1 u?', 'About 931.5 MeV.', 'formula', 2),
    fc(13, '1 MeV in joules?', '$1.6 \\times 10^{-13}$ J.', 'fact', 2),
    fc(14, 'Mass defect?', '$\\Delta M = Zm_\\text{H} + (A - Z)m_n - M$.', 'formula', 2),
    fc(15, 'Binding energy?', '$E_b = \\Delta M c^2$.', 'formula', 2),
    fc(16, 'BE per nucleon of ⁴He?', 'About 7.07 MeV.', 'example', 2),
    fc(17, 'Peak of the BE-per-nucleon curve?', 'About 8.8 MeV near A = 56 (iron).', 'fact', 2),
    fc(18, 'BE per nucleon of uranium?', 'About 7.6 MeV.', 'fact', 2),
    fc(19, 'Why is the curve nearly flat in the middle?', 'Nuclear force is short-range and saturates.', 'concept', 2),
    fc(20, 'Why does it fall for heavy nuclei?', 'Coulomb repulsion between many protons.', 'concept', 2),
    fc(21, 'What is fission?', 'Splitting of a heavy nucleus into two medium nuclei.', 'concept', 3),
    fc(22, 'Energy per fission of U-235?', 'About 200 MeV.', 'fact', 3),
    fc(23, 'Role of a moderator?', 'Slows neutrons down.', 'fact', 3),
    fc(24, 'Role of control rods?', 'Absorb neutrons to control the chain reaction.', 'fact', 3),
    fc(25, 'What is fusion?', 'Joining of light nuclei into a heavier one.', 'concept', 3),
    fc(26, 'D–T fusion energy?', '17.6 MeV (≈ 3.5 MeV per nucleon).', 'example', 3),
    fc(27, 'Why does fusion need very high temperature?', 'To overcome Coulomb repulsion between nuclei.', 'concept', 3),
    fc(28, 'Why do fission and fusion both release energy?', 'Products are nearer the BE peak, more tightly bound.', 'concept', 3),
    fc(29, 'Exam tip: atomic masses in mass defect?', 'Use m_H, not m_p.', 'exam-tip', 2),
    fc(30, 'Exam tip: before using a nuclear equation?', 'Check A and Z balance.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};

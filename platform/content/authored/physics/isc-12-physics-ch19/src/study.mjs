// ISC 12 Physics ch19 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, countPlot, uPlot, energyPlot, rydPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Atoms — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The alpha-scattering experiment and Rutherford’s model',
      `- **Thomson’s model:** positive charge spread uniformly through the atom, electrons embedded in it; it predicts only tiny deflections of α particles and none thrown back.
- **Geiger–Marsden experiment (1909–1913):** a narrow beam of α particles from a radioactive source in a lead block falls on a very thin gold foil in an evacuated chamber; a zinc sulphide screen with a microscope, turned round the foil, counts the scintillations at each scattering angle θ.
- **Observations → conclusions:** (i) most α particles pass straight through or are deflected by a degree or two → the atom is mostly empty space; (ii) a few are deflected through large angles → the positive charge is concentrated in a tiny region; (iii) about 1 in several thousand is turned back (θ > 90°) → that region also holds nearly all the mass.
- **Rutherford’s nuclear model:** a tiny, massive, positively charged **nucleus** (radius about $10^{-15}$–$10^{-14}$ m) with electrons revolving round it at distances of about $10^{-10}$ m; the electrons are too light (about 1/7300 of an α particle’s mass) to deflect α particles appreciably.
- The mathematical theory of α scattering (the impact-parameter formula and Rutherford’s scattering formula) is **not** in the ISC syllabus.`,
      [kt('Scintillation', 'A tiny flash of light produced when an α particle strikes a zinc sulphide screen.'), kt('Nucleus', 'The tiny central part of an atom that contains all its positive charge and nearly all its mass.')],
      [],
      V.geiger,
      [1],
      [V.traj, countPlot],
    ),
    sec(
      '2. Distance of closest approach; limits of Rutherford’s model',
      `- An α particle (charge 2e) of kinetic energy K aimed **head-on** at a nucleus (charge Ze) stops momentarily at the **distance of closest approach** d, where all its kinetic energy has become electrostatic potential energy (nucleus treated as fixed):
$$K = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{2Ze^2}{d}\\quad\\Rightarrow\\quad d = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{2Ze^2}{K}$$
- d is an **upper limit** to the radius of the nucleus; d ∝ Z/K. Use 1 MeV = 1.6 × 10⁻¹³ J; $\\dfrac{e^2}{4\\pi\\varepsilon_0} = 1.44$ MeV fm.
- Example: 5.0 MeV α on gold (Z = 79): d = 4.55 × 10⁻¹⁴ m ≈ 45.5 fm; the atom (≈ 1.4 × 10⁻¹⁰ m) is about 3000 times larger.
- **Limitations of Rutherford’s model:** an orbiting electron is accelerated and should radiate (classical electromagnetism), spiralling into the nucleus in about $10^{-8}$ s, so atoms would be unstable; the radiated frequency would change continuously, giving a continuous spectrum instead of the observed line spectrum.`,
      [kt('Distance of closest approach', 'The least distance from the centre of a nucleus reached by an α particle aimed head-on at it, where its kinetic energy has all become electrostatic potential energy.')],
      [fm(r`d = \dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{2Ze^2}{K}`, 'Distance of closest approach of an α particle')],
      uPlot,
      [1],
      [V.spiral],
    ),
    sec(
      '3. Bohr’s postulates; radius and speed of the nth orbit',
      `- **Postulates (hydrogen):** (1) the electron revolves in certain circular **stationary orbits** without radiating, the Coulomb force providing the centripetal force; (2) in these orbits the angular momentum is quantised: $mvr = \\dfrac{nh}{2\\pi}$, n = 1, 2, 3, … (n the principal quantum number); (3) a photon is emitted or absorbed only when the electron jumps between orbits: $h\\nu = E_{n_2} - E_{n_1}$.
- **Radius (derivation):** $\\dfrac{mv^2}{r} = \\dfrac{e^2}{4\\pi\\varepsilon_0 r^2}$ and $v = \\dfrac{nh}{2\\pi m r}$ give $r_n = \\dfrac{\\varepsilon_0 n^2h^2}{\\pi m e^2} = 0.53\\,n^2$ Å; r ∝ n², radii 1 : 4 : 9 : 16; r₁ = 0.53 Å is the Bohr radius.
- **Speed (derivation):** dividing $mv^2r = \\dfrac{e^2}{4\\pi\\varepsilon_0}$ by $mvr = \\dfrac{nh}{2\\pi}$: $v_n = \\dfrac{e^2}{2\\varepsilon_0 nh} = \\dfrac{2.2 \\times 10^6}{n}$ m s⁻¹; v ∝ 1/n; v₁ ≈ c/137.
- Frequency of revolution $\\dfrac{v}{2\\pi r} \\propto \\dfrac{1}{n^3}$; linear momentum mv ∝ 1/n; angular momentum ∝ n.`,
      [kt('Stationary orbit', 'An allowed Bohr orbit in which the electron does not radiate energy.'), kt('Bohr radius', 'The radius of the first orbit of hydrogen, about 0.53 Å (5.3 × 10⁻¹¹ m).')],
      [fm(r`mvr = \dfrac{nh}{2\pi}`, 'Bohr’s quantum condition'), fm(r`r_n = \dfrac{\varepsilon_0 n^2 h^2}{\pi m e^2}`, 'Radius of the nth orbit'), fm(r`v_n = \dfrac{e^2}{2\varepsilon_0 n h}`, 'Speed in the nth orbit')],
      V.orbits,
      [2],
    ),
    sec(
      '4. Energy of the electron; meaning of negative energy',
      `- **Kinetic energy:** $K = \\dfrac{1}{2}mv^2 = \\dfrac{e^2}{8\\pi\\varepsilon_0 r}$; **potential energy:** $U = -\\dfrac{e^2}{4\\pi\\varepsilon_0 r}$; **total:** $E = K + U = -\\dfrac{e^2}{8\\pi\\varepsilon_0 r}$, so K = −E and U = 2E.
- With $r_n$: $E_n = -\\dfrac{me^4}{8\\varepsilon_0^2 n^2 h^2} = -\\dfrac{13.6}{n^2}$ eV; E₁ = −13.6, E₂ = −3.40, E₃ = −1.51, E₄ = −0.85 eV, E∞ = 0.
- **Negative total energy** means the electron is **bound** to the nucleus: zero is the free electron at rest far away, so energy must be supplied to remove it. The more negative E, the more tightly bound.
- **Ionisation energy** from level n: 13.6/n² eV (13.6 eV from the ground state; ionisation potential 13.6 V). **Excitation energy:** E_n − E₁ (10.2 eV to n = 2, 12.09 eV to n = 3).
- As n increases, E and U increase (towards zero) while K and v decrease.`,
      [kt('Ionisation energy', 'The minimum energy needed to remove the electron from an atom in a given state; 13.6 eV for hydrogen in its ground state.'), kt('Excitation energy', 'The energy needed to raise an electron from the ground state to a higher energy level.')],
      [fm(r`E_n = -\dfrac{me^4}{8\varepsilon_0^2 n^2 h^2} = -\dfrac{13.6}{n^2}\ \text{eV}`, 'Total energy of the nth level'), fm(r`K = -E,\quad U = 2E`, 'Kinetic and potential energy')],
      energyPlot,
      [2],
      [V.levels],
    ),
    sec(
      '5. Energy-level diagram and the five series',
      `- The **energy-level diagram** shows the allowed energies as horizontal lines (n = 1 at −13.6 eV, crowding together towards 0 at n = ∞). A downward jump emits a photon $h\\nu = E_{n_2} - E_{n_1}$; an upward jump needs exactly that energy to be absorbed.
- **Series** (lines ending on the same lower level n₁): **Lyman** n₁ = 1, ultraviolet (91.2–121.5 nm); **Balmer** n₁ = 2, visible and near ultraviolet (364.6–656.3 nm; the lines from n₂ = 3–6 are visible); **Paschen** n₁ = 3, infrared (820–1875 nm); **Brackett** n₁ = 4, infrared (1459–4051 nm); **Pfund** n₁ = 5, far infrared (2279–7458 nm).
- The infrared series overlap; Lyman and Balmer do not.
- Atoms excited to level n can emit $\\dfrac{n(n-1)}{2}$ different lines. Cool hydrogen (all in n = 1) absorbs only Lyman lines.`,
      [kt('Series limit', 'The shortest wavelength of a spectral series, for the jump from n₂ = ∞ to the series level n₁.'), kt('Energy-level diagram', 'A diagram showing the allowed energies of an atom as horizontal lines, with transitions as vertical arrows.')],
      [fm(r`h\nu = E_{n_2} - E_{n_1}`, 'Bohr’s frequency condition'), fm(r`N = \dfrac{n(n-1)}{2}`, 'Number of possible lines from level n')],
      V.series,
      [3],
      [V.strip],
    ),
    sec(
      '6. The Rydberg formula; successes and limits of Bohr’s model',
      `- From $\\dfrac{hc}{\\lambda} = E_{n_2} - E_{n_1}$: $\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)$ with $R = \\dfrac{me^4}{8\\varepsilon_0^2ch^3} = 1.097 \\times 10^7$ m⁻¹ (the **Rydberg constant**). Equivalently λ (nm) = 1240/ΔE (eV).
- **Method:** n₁ is the lower level (it fixes the series), n₂ the upper. Series limit $\\lambda_\\infty = n_1^2/R$; first line n₂ = n₁ + 1. To identify a line, decide the series from the wavelength range, then solve for n₂.
- Example: 5 → 2 gives 1/λ = 1.097 × 10⁷ × 0.21, λ = 434 nm (Balmer, violet). A line at 1282 nm is Paschen 5 → 3.
- A graph of 1/λ against 1/n₂² for one series is a straight line of slope −R.
- **Successes:** stability, size and ionisation energy of hydrogen, all its wavelengths. **Limits:** only one-electron atoms; no line intensities or fine structure; quantum rules assumed, not explained.`,
      [kt('Rydberg constant', 'The constant R = 1.097 × 10⁷ m⁻¹ in the formula for the wave numbers of the hydrogen lines.')],
      [fm(r`\dfrac{1}{\lambda} = R\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)`, 'Rydberg formula'), fm(r`R = \dfrac{me^4}{8\varepsilon_0^2 c h^3}`, 'Rydberg constant from Bohr’s theory')],
      rydPlot,
      [3],
    ),
  ],
  exam_tips_md: `- Pair each α-scattering observation with its conclusion; for closest approach use charge 2e and 1 MeV = 1.6 × 10⁻¹³ J.
- Bohr derivations: start from mv²/r = e²/(4πε₀r²) and mvr = nh/2π; end with r ∝ n², v ∝ 1/n, E ∝ −1/n².
- Negative energy = bound electron; ionisation energy from level n is 13.6/n² eV.
- Rydberg formula with n₁ the lower level; give λ in nm and name the series and region.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Thomson’s model of the atom?', 'Positive charge spread evenly through the atom, electrons embedded in it.', 'definition', 1),
    fc(2, 'What did Geiger and Marsden fire at a thin gold foil?', 'A narrow beam of α particles; they counted scintillations on a ZnS screen at each angle.', 'fact', 1),
    fc(3, 'Why was the scattering chamber evacuated?', 'So that air molecules would not stop or scatter the α particles.', 'concept', 1),
    fc(4, 'Most α particles pass straight through. Conclusion?', 'The atom is mostly empty space.', 'concept', 1),
    fc(5, 'A very few α particles bounce back. Conclusion?', 'Positive charge and nearly all the mass are packed into a tiny nucleus.', 'concept', 1),
    fc(6, 'Why do the electrons hardly deflect α particles?', 'An electron has only about 1/7300 of the α particle’s mass.', 'concept', 1),
    fc(7, 'Distance of closest approach?', '$d = \\dfrac{1}{4\\pi\\varepsilon_0}\\cdot\\dfrac{2Ze^2}{K}$, where all the α’s kinetic energy has become potential energy.', 'formula', 1),
    fc(8, 'How does d depend on K and Z?', 'd ∝ Z/K: double the energy, half the distance.', 'concept', 1),
    fc(9, 'Typical sizes of an atom and a nucleus?', 'Atom ~10⁻¹⁰ m; nucleus ~10⁻¹⁵ to 10⁻¹⁴ m.', 'fact', 1),
    fc(10, 'Two failures of Rutherford’s model?', 'An orbiting (accelerated) electron should radiate and spiral in: no stable atoms; and it would give a continuous, not a line, spectrum.', 'concept', 1),
    fc(11, 'Bohr’s quantum condition?', '$mvr = \\dfrac{nh}{2\\pi}$, n = 1, 2, 3, …', 'formula', 2),
    fc(12, 'Bohr’s frequency condition?', '$h\\nu = E_{n_2} - E_{n_1}$: one photon per jump.', 'formula', 2),
    fc(13, 'Radius of the nth orbit of hydrogen?', '$r_n = \\dfrac{\\varepsilon_0 n^2h^2}{\\pi me^2} = 0.53\\,n^2$ Å.', 'formula', 2),
    fc(14, 'Speed in the nth orbit of hydrogen?', '$v_n = \\dfrac{e^2}{2\\varepsilon_0 nh} = \\dfrac{2.2 \\times 10^6}{n}$ m s⁻¹.', 'formula', 2),
    fc(15, 'How do r, v and the revolution frequency scale with n?', 'r ∝ n², v ∝ 1/n, frequency ∝ 1/n³.', 'concept', 2),
    fc(16, 'K, U and E of the electron in terms of r?', 'K = e²/(8πε₀r), U = −e²/(4πε₀r), E = −e²/(8πε₀r).', 'formula', 2),
    fc(17, 'Relations between K, U and E in a Bohr orbit?', 'K = −E and U = 2E.', 'concept', 2),
    fc(18, 'Energy of the nth level of hydrogen?', '$E_n = -\\dfrac{13.6}{n^2}$ eV.', 'formula', 2),
    fc(19, 'What does the negative total energy mean?', 'The electron is bound: energy must be supplied to free it (E = 0 is the free electron at rest far away).', 'concept', 2),
    fc(20, 'Ionisation energy of hydrogen from level n?', '13.6/n² eV (13.6 eV from the ground state).', 'formula', 2),
    fc(21, 'n = 4 level: K, U, E?', '+0.85 eV, −1.70 eV, −0.85 eV.', 'example', 2),
    fc(22, 'Rydberg formula?', '$\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)$, R = 1.097 × 10⁷ m⁻¹, n₁ the lower level.', 'formula', 3),
    fc(23, 'Series ending on n = 1, 2, 3, 4, 5?', 'Lyman, Balmer, Paschen, Brackett, Pfund.', 'fact', 3),
    fc(24, 'Region of each hydrogen series?', 'Lyman UV; Balmer visible and near UV; Paschen, Brackett IR; Pfund far IR.', 'fact', 3),
    fc(25, 'Series limit?', 'Shortest wavelength of a series (n₂ = ∞): λ = n₁²/R.', 'definition', 3),
    fc(26, 'Line from n = 5 to n = 2?', 'Balmer, 434 nm, violet.', 'example', 3),
    fc(27, 'Number of lines from atoms excited to level n?', 'n(n − 1)/2 (15 from n = 6).', 'formula', 3),
    fc(28, 'Why does cool hydrogen absorb only Lyman lines?', 'Almost all its atoms are in n = 1, so every absorption starts there.', 'concept', 3),
    fc(29, 'Two limitations of Bohr’s model?', 'Fails for many-electron atoms; cannot explain line intensities or fine structure.', 'concept', 3),
    fc(30, 'Exam tip: identifying an infrared line?', 'The IR series overlap: test the possible n₁ values with the Rydberg formula and look for a whole-number n₂.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};

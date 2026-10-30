// ch12 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, scatPlot, levelPlot } from './decks.mjs';

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
      '1. Alpha-particle scattering',
      `- **Thomson model:** positive charge spread uniformly through the atom, electrons embedded; predicts only tiny deflections of alpha particles.
- **Geiger–Marsden experiment:** a collimated beam of alpha particles (about 5.5 MeV) on a very thin gold foil; a ZnS screen and microscope count the particles scattered through each angle θ; apparatus in vacuum.
- **Observations:** most pass undeflected or nearly so; a few are deflected through large angles; about 1 in 8000 through more than 90°; some almost straight back. The number scattered falls steeply with θ (∝ 1/sin⁴(θ/2)).`,
      [kt('Alpha particle', 'A helium nucleus: charge +2e, mass about four times that of a proton.')],
      [],
      V.geiger,
      [1],
      [scatPlot],
    ),
    sec(
      '2. Rutherford’s nuclear model',
      `- All the positive charge and nearly all the mass are in a tiny **nucleus** (about $10^{-15}$–$10^{-14}$ m); the atom (about $10^{-10}$ m) is mostly **empty space**; electrons revolve round the nucleus.
- **Impact parameter** $b$: perpendicular distance of the initial path from the nucleus. Small $b$ → large deflection; $b = 0$ → $\\theta = 180°$; large $b$ → little deflection.
- **Distance of closest approach** (head-on): $K = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{d}$, so $d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{K}$; an upper limit to the nuclear size.
- **Drawbacks:** an orbiting (accelerating) electron should radiate, lose energy and spiral into the nucleus; the model predicts a continuous spectrum, not lines.`,
      [kt('Impact parameter', 'Perpendicular distance between the initial velocity of an alpha particle and the centre of the nucleus.'), kt('Distance of closest approach', 'Least distance from the nucleus reached by a head-on alpha particle, where its kinetic energy has all become potential energy.')],
      [fm(r`d = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2Ze^2}{K}`, 'Distance of closest approach')],
      V.traj,
      [1],
    ),
    sec(
      '3. Bohr model of hydrogen',
      `**Postulates:** (1) the electron moves in certain orbits without radiating; (2) in them $mvr = \\dfrac{nh}{2\\pi}$; (3) a jump from $E_i$ to $E_f$ emits a photon with $h\\nu = E_i - E_f$.

From $\\dfrac{mv^2}{r} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^2}{r^2}$ and $mvr = \\dfrac{nh}{2\\pi}$:
- $v_n = \\dfrac{e^2}{2\\varepsilon_0 nh} \\approx \\dfrac{2.18 \\times 10^{6}}{n}$ m s⁻¹
- $r_n = \\dfrac{n^2h^2\\varepsilon_0}{\\pi me^2} \\approx 0.53n^2$ Å (Bohr radius $r_1 \\approx 5.3 \\times 10^{-11}$ m)
- $E_n = -\\dfrac{me^4}{8\\varepsilon_0^2h^2n^2} = -\\dfrac{13.6}{n^2}$ eV; $K = -E_n$, $U = 2E_n$.
- Ground state −13.6 eV; ionisation energy 13.6 eV; first excited state −3.4 eV.
- Bohr’s second postulate follows if a whole number of de Broglie wavelengths fits round the orbit: $2\\pi r = n\\lambda$.
- Works for hydrogen-like atoms only; does not explain many-electron spectra or line intensities.`,
      [kt('Stationary orbit', 'An allowed Bohr orbit in which the electron does not radiate.'), kt('Ionisation energy', 'Energy needed to remove the electron from the ground state: 13.6 eV for hydrogen.')],
      [fm(r`r_n = \dfrac{n^2h^2\varepsilon_0}{\pi me^2}`, 'Radius of nth orbit'), fm(r`v_n = \dfrac{e^2}{2\varepsilon_0 nh}`, 'Speed in nth orbit'), fm(r`E_n = -\dfrac{13.6}{n^2}\ \text{eV}`, 'Energy of nth level')],
      V.orbits,
      [2],
      [levelPlot],
    ),
    sec(
      '4. The hydrogen spectrum',
      `- A jump from $n_i$ to $n_f$ emits $h\\nu = 13.6\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)$ eV; $\\lambda = hc/\\Delta E$ ($hc \\approx 1240$ eV nm). Discrete levels → **line** spectrum; absorption lines at the same wavelengths.
- **Series:** Lyman ($n_f = 1$, ultraviolet, limit ≈ 91 nm); Balmer ($n_f = 2$, visible: 3 → 2 red ≈ 656 nm); Paschen ($n_f = 3$, infrared); Brackett, Pfund (far infrared).
- Lines in a series crowd towards the **series limit** ($n_i \\to \\infty$).
- From level $n$, the number of possible lines is $n(n - 1)/2$.`,
      [kt('Spectral series', 'A set of lines produced by jumps ending on the same lower level.'), kt('Series limit', 'Shortest wavelength in a series, from a jump starting at n = ∞.')],
      [fm(r`h\nu = 13.6\left(\dfrac{1}{n_f^2} - \dfrac{1}{n_i^2}\right)\ \text{eV}`, 'Photon from a jump')],
      V.levels,
      [3],
    ),
  ],
  exam_tips_md: `- Pair each scattering observation with its conclusion; define impact parameter.
- Closest approach: $K = 2Ze^2/(4\\pi\\varepsilon_0 d)$; 1 MeV = $1.6 \\times 10^{-13}$ J.
- Bohr: $r \\propto n^2$, $v \\propto 1/n$, $E = -13.6/n^2$ eV, $K = -E$, $U = 2E$.
- Lines: ΔE in eV, then $\\lambda = hc/\\Delta E$; number of lines $n(n - 1)/2$.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Thomson’s model in one line?', 'Positive charge spread through the atom with electrons embedded in it.', 'concept', 1),
    fc(2, 'Target in the Geiger–Marsden experiment?', 'A very thin gold foil.', 'fact', 1),
    fc(3, 'Detector used?', 'A zinc sulphide screen viewed through a microscope.', 'fact', 1),
    fc(4, 'Main observation?', 'Most α particles pass straight through; a few are deflected through large angles.', 'fact', 1),
    fc(5, 'What fraction were deflected by more than 90°?', 'About 1 in 8000.', 'fact', 1),
    fc(6, 'Conclusion from most α passing through?', 'The atom is mostly empty space.', 'concept', 1),
    fc(7, 'Conclusion from large-angle scattering?', 'Positive charge and mass are concentrated in a tiny nucleus.', 'concept', 1),
    fc(8, 'Impact parameter?', 'Perpendicular distance of the α’s initial path from the nucleus.', 'concept', 1),
    fc(9, 'Impact parameter for θ = 180°?', 'Zero (head-on).', 'fact', 1),
    fc(10, 'Distance of closest approach?', '$d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{K}$.', 'formula', 1),
    fc(11, 'Size of nucleus vs atom?', 'About 10⁻¹⁵–10⁻¹⁴ m vs about 10⁻¹⁰ m.', 'fact', 1),
    fc(12, 'Main drawback of Rutherford’s model?', 'An orbiting electron should radiate and spiral into the nucleus.', 'concept', 1),
    fc(13, 'Bohr’s quantum condition?', '$mvr = nh/2\\pi$.', 'formula', 2),
    fc(14, 'Bohr’s frequency condition?', '$h\\nu = E_i - E_f$.', 'formula', 2),
    fc(15, 'Radius of nth orbit?', '$r_n = n^2h^2\\varepsilon_0/\\pi me^2 \\approx 0.53n^2$ Å.', 'formula', 2),
    fc(16, 'Speed in nth orbit?', '$v_n = e^2/2\\varepsilon_0 nh \\approx 2.18 \\times 10^6/n$ m s⁻¹.', 'formula', 2),
    fc(17, 'Energy of nth level of hydrogen?', '$E_n = -13.6/n^2$ eV.', 'formula', 2),
    fc(18, 'Relation of K, U and E in a Bohr orbit?', '$K = -E$, $U = 2E$.', 'concept', 2),
    fc(19, 'Ionisation energy of hydrogen?', '13.6 eV.', 'fact', 2),
    fc(20, 'Why is the electron’s total energy negative?', 'It is bound to the nucleus.', 'concept', 2),
    fc(21, 'de Broglie view of Bohr orbits?', 'A whole number of wavelengths fits round the orbit: 2πr = nλ.', 'concept', 2),
    fc(22, 'Lyman series ends on?', 'n = 1 (ultraviolet).', 'fact', 3),
    fc(23, 'Balmer series ends on?', 'n = 2 (visible).', 'fact', 3),
    fc(24, 'Paschen series ends on?', 'n = 3 (infrared).', 'fact', 3),
    fc(25, 'Wavelength of the 3 → 2 line?', 'About 656 nm (red).', 'example', 3),
    fc(26, 'Shortest Lyman wavelength?', 'About 91 nm (series limit).', 'example', 3),
    fc(27, 'Number of lines from level n?', '$n(n - 1)/2$.', 'formula', 3),
    fc(28, 'Why does hydrogen give a line spectrum?', 'Only discrete energy levels exist, so only certain photon energies.', 'concept', 3),
    fc(29, 'Exam tip: converting MeV to J?', '1 MeV = 1.6 × 10⁻¹³ J.', 'exam-tip', 1),
    fc(30, 'Exam tip: wavelength of a line?', 'ΔE in eV, λ = hc/ΔE with hc ≈ 1240 eV nm.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};

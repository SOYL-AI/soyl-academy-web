// ch11 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, ivIntensity, ivFrequency, iIntensity, v0Plot, lamPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Dual Nature of Radiation and Matter — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electron emission and the photoelectric effect',
      `- **Work function** $\\varphi_0$: least energy needed to free an electron from a metal surface; 1 eV = $1.6 \\times 10^{-19}$ J. Emission by heat (thermionic), strong field (field emission) or light (photoelectric).
- **Hertz** (1887): ultraviolet light helped sparks across a gap. **Hallwachs**: a negatively charged zinc plate discharged in UV; a neutral plate became positive. **Lenard**: UV on the emitter of an evacuated tube produced a current that stopped when the light was cut off; the particles were electrons (**photoelectrons**).
- Zinc and cadmium need UV; alkali metals (Na, K, Cs) respond to visible light.`,
      [kt('Work function', 'Minimum energy needed to remove an electron from the surface of a metal.'), kt('Photoelectric effect', 'Emission of electrons from a surface when light of suitable frequency falls on it.')],
      [],
      V.thr,
      [1],
    ),
    sec(
      '2. Experimental study',
      `Emitter C and collector A in an evacuated tube; light through a quartz window; collector potential variable and reversible; microammeter for the photocurrent.
- **Intensity:** photocurrent ∝ intensity (number of electrons per second ∝ intensity).
- **Potential:** current rises to a **saturation** value as A is made positive; it falls to zero at the **stopping potential** $-V_0$: $eV_0 = K_\\text{max}$. Different intensities, same ν: different saturation currents, **same** $V_0$.
- **Frequency:** same intensity, higher ν: same saturation current, **larger** $V_0$. $V_0$ against ν is a straight line cutting the axis at the **threshold frequency** $\\nu_0$; slope $h/e$ for all metals.
- **No time lag** (< $10^{-9}$ s).
- **Wave theory fails:** it predicts $K_\\text{max}$ rising with intensity, emission at any frequency, and a time lag in dim light.`,
      [kt('Stopping potential', 'The negative collector potential that just stops the most energetic photoelectrons; eV₀ = K_max.'), kt('Threshold frequency', 'Minimum frequency of light that can cause photoelectric emission from a given metal.'), kt('Saturation current', 'Maximum photocurrent, reached when all emitted electrons are collected.')],
      [fm(r`eV_0 = K_\text{max} = \tfrac{1}{2}m v_\text{max}^2`, 'Stopping potential')],
      V.cell,
      [2],
      [iIntensity, ivIntensity, ivFrequency],
    ),
    sec(
      '3. Photons and Einstein’s photoelectric equation',
      `- Light is a stream of **photons**: $E = h\\nu = hc/\\lambda$, $p = h/\\lambda$, speed $c$, zero rest mass, no charge. Intensity ∝ number of photons per second (for one frequency). $h = 6.63 \\times 10^{-34}$ J s; $hc \\approx 1240$ eV nm.
- One photon is absorbed by one electron: $h\\nu = \\varphi_0 + K_\\text{max}$, i.e. $K_\\text{max} = eV_0 = h\\nu - \\varphi_0 = h(\\nu - \\nu_0)$.
- **Threshold:** $\\nu_0 = \\varphi_0/h$, $\\lambda_0 = hc/\\varphi_0$.
- $V_0 = \\dfrac{h}{e}\\nu - \\dfrac{\\varphi_0}{e}$: slope $h/e$ (same for all metals), intercept $\\nu_0$ (depends on the metal).
- Explains: $K_\\text{max}$ independent of intensity; threshold; linear rise with ν; instant emission; current ∝ number of photons.`,
      [kt('Photon', 'A quantum of electromagnetic radiation with energy hν and momentum h/λ.')],
      [fm(r`K_\text{max} = h\nu - \varphi_0 = eV_0`, 'Einstein’s photoelectric equation'), fm(r`E = h\nu = \dfrac{hc}{\lambda}`, 'Photon energy'), fm(r`\lambda_0 = \dfrac{hc}{\varphi_0}`, 'Threshold wavelength')],
      V.split,
      [3],
      [v0Plot],
    ),
    sec(
      '4. Matter waves',
      `- **Dual nature:** radiation shows wave (interference, diffraction) and particle (photoelectric effect) behaviour.
- **de Broglie relation:** a particle of momentum $p$ has wavelength $\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv} = \\dfrac{h}{\\sqrt{2mK}}$.
- Charged particle accelerated through $V$: $K = qV$, $\\lambda = \\dfrac{h}{\\sqrt{2mqV}}$; electron: $\\lambda \\approx \\dfrac{1.227}{\\sqrt{V}}$ nm.
- Equal kinetic energy: $\\lambda \\propto 1/\\sqrt{m}$. Equal momentum: equal $\\lambda$.
- Everyday objects: $\\lambda$ far too small to observe; electrons: comparable to atomic spacings (basis of the electron microscope).`,
      [kt('de Broglie wavelength', 'Wavelength associated with a moving particle, λ = h/p.')],
      [fm(r`\lambda = \dfrac{h}{p} = \dfrac{h}{\sqrt{2mK}}`, 'de Broglie relation'), fm(r`\lambda_e \approx \dfrac{1.227}{\sqrt{V}}\ \text{nm}`, 'Electron accelerated through V')],
      lamPlot,
      [4],
    ),
  ],
  exam_tips_md: `- Three graphs: I–intensity (line), I–V at different intensities (same $-V_0$), I–V at different frequencies (same saturation).
- $eV_0 = K_\\text{max} = h\\nu - \\varphi_0$; slope of $V_0$–ν is $h/e$.
- $hc \\approx 1240$ eV nm; 1 eV = $1.6 \\times 10^{-19}$ J.
- $\\lambda = h/p = h/\\sqrt{2mK}$; electron $1.227/\\sqrt{V}$ nm.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is the work function?', 'The least energy needed to free an electron from a metal surface.', 'concept', 1),
    fc(2, '1 eV in joules?', '$1.6 \\times 10^{-19}$ J.', 'fact', 1),
    fc(3, 'What did Hallwachs observe?', 'A negatively charged zinc plate lost its charge in UV light.', 'fact', 1),
    fc(4, 'What are photoelectrons?', 'Electrons emitted from a surface by light.', 'concept', 1),
    fc(5, 'Which metals emit with visible light?', 'Alkali metals such as Na, K, Cs.', 'fact', 1),
    fc(6, 'Photocurrent depends on intensity how?', 'Directly proportional.', 'fact', 2),
    fc(7, 'Stopping potential relation?', '$eV_0 = K_\\text{max}$.', 'formula', 2),
    fc(8, 'Does V₀ depend on intensity?', 'No.', 'fact', 2),
    fc(9, 'How does V₀ vary with frequency?', 'Increases linearly (above ν₀).', 'fact', 2),
    fc(10, 'Threshold frequency?', 'Minimum frequency for emission; below it, no electrons however bright the light.', 'concept', 2),
    fc(11, 'Time lag in photoelectric emission?', 'None (less than about 10⁻⁹ s).', 'fact', 2),
    fc(12, 'Saturation current depends on?', 'Intensity (number of photons per second).', 'fact', 2),
    fc(13, 'Three failures of the wave theory?', 'K_max independent of intensity; threshold frequency; no time lag.', 'concept', 2),
    fc(14, 'Photon energy?', '$E = h\\nu = hc/\\lambda$.', 'formula', 3),
    fc(15, 'Photon momentum?', '$p = h/\\lambda$.', 'formula', 3),
    fc(16, 'Einstein’s photoelectric equation?', '$K_\\text{max} = h\\nu - \\varphi_0$.', 'formula', 3),
    fc(17, 'Threshold wavelength?', '$\\lambda_0 = hc/\\varphi_0$.', 'formula', 3),
    fc(18, 'Slope of V₀ against ν?', '$h/e$, the same for all metals.', 'concept', 3),
    fc(19, 'Intercept of V₀–ν line on the ν axis?', 'Threshold frequency ν₀.', 'concept', 3),
    fc(20, 'Brighter light of the same colour means?', 'More photons per second, same energy per photon.', 'concept', 3),
    fc(21, 'Value of hc in eV nm?', 'About 1240 eV nm.', 'fact', 3),
    fc(22, 'Example: 400 nm on potassium (φ₀ = 2.25 eV). K_max?', 'About 0.86 eV.', 'example', 3),
    fc(23, 'de Broglie relation?', '$\\lambda = h/p = h/mv$.', 'formula', 4),
    fc(24, 'λ in terms of kinetic energy?', '$\\lambda = h/\\sqrt{2mK}$.', 'formula', 4),
    fc(25, 'Electron accelerated through V: λ?', '$\\approx 1.227/\\sqrt{V}$ nm.', 'formula', 4),
    fc(26, 'Equal kinetic energy: which has the longer λ, electron or proton?', 'Electron (λ ∝ 1/√m).', 'concept', 4),
    fc(27, 'Equal momentum: compare λ.', 'Equal.', 'concept', 4),
    fc(28, 'Why is a cricket ball’s λ never seen?', 'h/mv is about 10⁻³⁴ m, far too small.', 'example', 4),
    fc(29, 'Exam tip: units in Einstein’s equation?', 'Keep everything in eV, or everything in J.', 'exam-tip', 3),
    fc(30, 'Exam tip: graph of I against V for different frequencies?', 'Same saturation current, different stopping potentials.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};

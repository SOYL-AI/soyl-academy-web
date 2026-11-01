// ISC 12 Physics ch18 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, ivIntensity, ivFrequency, photonPlot, v0Plot, dataPlot, lamPlot } from './decks.mjs';

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
      '1. The photoelectric effect: observations and experimental facts',
      `- **Photoelectric effect:** emission of electrons (photoelectrons) from a metal surface when light of suitable frequency falls on it.
- **Hertz (1887):** ultraviolet light from a transmitter spark made sparks jump more easily across a receiver gap; glass (which absorbs ultraviolet) weakened the effect, quartz did not. **Hallwachs:** a negatively charged zinc plate in ultraviolet loses its charge.
- **Lenard’s apparatus:** emitter C and collector A in an evacuated bulb, light through a quartz window, a potential divider with a reversing key to set the collector potential V, a microammeter for the photocurrent.
- **Facts:** (i) photocurrent ∝ intensity (frequency fixed, above threshold); (ii) the current saturates at large positive V and falls to zero at a negative **stopping potential** −V₀, with $eV_0 = K_{\\max}$; (iii) V₀ does not depend on intensity but rises linearly with frequency; (iv) no emission below a **threshold frequency** f₀ of the metal, however intense the light; (v) emission is instantaneous (within about 10⁻⁹ s).
- **Wave theory fails:** it spreads energy over the wavefront at a rate set by intensity, so it expects K_max to grow with intensity, emission at any frequency if bright enough, and a measurable delay in dim light. Only fact (i) agrees.`,
      [kt('Stopping potential', 'The negative potential of the collector, relative to the emitter, that just reduces the photocurrent to zero; eV₀ equals the maximum kinetic energy of the photoelectrons.'), kt('Saturation current', 'The largest photocurrent for a given beam, reached when every emitted electron is collected; it is proportional to the intensity.')],
      [fm(r`eV_0 = K_{\max} = \tfrac{1}{2}mv_{\max}^2`, 'Stopping potential and maximum kinetic energy')],
      V.lenard,
      [1],
      [V.hertz, ivIntensity, ivFrequency],
    ),
    sec(
      '2. Photons and Einstein’s photoelectric equation',
      `- **Quantisation of radiation:** light of frequency f travels and is absorbed as **photons**, each of energy $E = hf = \\dfrac{hc}{\\lambda}$ (Planck, Einstein). Here $h = 6.6 \\times 10^{-34}$ J s, so $E\\,(\\text{eV}) = \\dfrac{1237.5}{\\lambda\\,(\\text{nm})}$. Intensity = photons per second per unit area × hf.
- **Work function W₀:** the least energy needed to remove an electron from the surface of a metal (a few eV; depends on the metal and its surface).
- **Einstein’s equation:** one photon is absorbed by one electron; $K_{\\max} = hf - W_0 = eV_0$. Electrons from deeper levels leave with less energy.
- **Threshold:** $hf_0 = W_0$, so $f_0 = \\dfrac{W_0}{h}$ and $\\lambda_0 = \\dfrac{hc}{W_0}$. No emission for f < f₀ (λ > λ₀).
- **Explains the facts:** threshold (one photon must supply W₀); K_max set by f, not intensity; no delay (the whole photon is absorbed at once); current ∝ number of photons ∝ intensity.
- A graph of K_max against f is a straight line of slope h, cutting the f axis at f₀ and (extended) the K_max axis at −W₀.`,
      [kt('Photon', 'A quantum of electromagnetic radiation of energy hf and momentum h/λ, travelling at c, with zero rest mass and no charge.'), kt('Work function', 'The minimum energy needed to free an electron from the surface of a metal.'), kt('Threshold frequency', 'The lowest frequency of light that can eject photoelectrons from a given metal: f₀ = W₀/h.')],
      [fm(r`E = hf = \dfrac{hc}{\lambda}`, 'Photon energy'), fm(r`K_{\max} = hf - W_0`, 'Einstein’s photoelectric equation'), fm(r`f_0 = \dfrac{W_0}{h},\quad \lambda_0 = \dfrac{hc}{W_0}`, 'Threshold frequency and wavelength')],
      V.well,
      [2],
      [photonPlot],
    ),
    sec(
      '3. Planck’s constant from the V₀–f graph; photon momentum',
      `- Dividing Einstein’s equation by e: $V_0 = \\dfrac{h}{e}f - \\dfrac{W_0}{e}$. A graph of V₀ against f is a **straight line**: slope $\\dfrac{h}{e}$ (the same for all metals, so the lines are parallel), intercept on the f axis $f_0$, intercept on the V₀ axis $-\\dfrac{W_0}{e}$.
- **To find h:** measure V₀ for several frequencies, draw the best line, $h = e \\times$ slope; then $W_0 = hf_0$. With h = 6.6 × 10⁻³⁴ J s the slope is 4.125 × 10⁻¹⁵ V s.
- **Photon momentum:** with zero rest mass, $E = pc$, so $p = \\dfrac{E}{c} = \\dfrac{h}{\\lambda}$. A beam of power P absorbed by a surface exerts force P/c; reflected normally, 2P/c.`,
      [kt('Photon momentum', 'p = h/λ = E/c: the momentum carried by a photon of wavelength λ.')],
      [fm(r`V_0 = \dfrac{h}{e}f - \dfrac{W_0}{e}`, 'Stopping potential against frequency'), fm(r`p = \dfrac{h}{\lambda} = \dfrac{E}{c}`, 'Photon momentum')],
      v0Plot,
      [3],
      [dataPlot],
    ),
    sec(
      '4. Wave–particle duality and de Broglie waves',
      `- **Dual nature of radiation:** light shows wave behaviour in propagation (interference, diffraction, polarisation) and particle behaviour in interaction with matter (photoelectric effect).
- **de Broglie hypothesis (1924):** every moving particle has a wave associated with it, of wavelength $\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$.
- **Electron accelerated from rest through V:** $eV = \\dfrac{p^2}{2m}$, so $\\lambda = \\dfrac{h}{\\sqrt{2meV}} \\approx \\dfrac{1.22}{\\sqrt{V}}$ nm (with h = 6.6 × 10⁻³⁴ J s). In general $\\lambda = \\dfrac{h}{\\sqrt{2mK}} = \\dfrac{h}{\\sqrt{2mqV}}$.
- Everyday objects have wavelengths far too small to show diffraction; electrons of a few hundred eV have λ ≈ 0.1 nm, comparable to atomic spacings.`,
      [kt('de Broglie wavelength', 'The wavelength h/p of the wave associated with a moving particle of momentum p.'), kt('Wave–particle duality', 'The fact that radiation and matter each show wave behaviour in some experiments and particle behaviour in others.')],
      [fm(r`\lambda = \dfrac{h}{mv}`, 'de Broglie wavelength'), fm(r`\lambda = \dfrac{h}{\sqrt{2meV}}`, 'Electron accelerated through V')],
      lamPlot,
      [4],
    ),
    sec(
      '5. Electron diffraction and the Davisson–Germer experiment (qualitative)',
      `- **Apparatus:** an electron gun (heated filament, anode at accelerating potential V) sends a narrow beam onto a **nickel crystal** in a vacuum chamber; a **movable detector** measures the number of electrons scattered at each angle φ to the incident beam.
- **Observation:** a sharp peak (spur) in the scattered intensity at φ ≈ 50° when V = 54 V; the peak weakens at higher and lower voltages.
- **Conclusion:** a strong beam in one direction is diffraction by the regular rows of atoms; the wavelength found agreed with h/p. Electrons behave as waves, confirming de Broglie’s hypothesis.
- **Thomson:** electrons through a thin foil of tiny crystals give concentric rings like X-rays; higher V gives smaller rings.
- The quantitative treatment of the experiment is not in the ISC syllabus.`,
      [kt('Electron diffraction', 'The spreading of an electron beam into definite directions (spots or rings) by the regular arrangement of atoms in a crystal, showing the wave nature of electrons.')],
      [],
      V.dgApp,
      [5],
      [V.dgPolar, V.rings],
    ),
  ],
  exam_tips_md: `- State constants: h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m/s, mₑ = 9.1 × 10⁻³¹ kg; hc = 1237.5 eV nm with these values.
- K_max = hf − W₀ = eV₀; V₀ in volts equals K_max in eV. Intensity changes the current only; frequency changes V₀ only.
- V₀–f graph: slope h/e, f-intercept f₀, W₀ = hf₀. Photon momentum h/λ.
- Electron: λ = h/√(2meV) ≈ 1.22/√V nm. Davisson–Germer: qualitative description and conclusion only.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What did Hertz notice about his receiver gap in 1887?', 'It sparked more easily when ultraviolet light from the transmitter spark fell on it.', 'fact', 1),
    fc(2, 'Why did a glass sheet weaken Hertz’s effect but quartz did not?', 'Glass absorbs ultraviolet; quartz transmits it.', 'concept', 1),
    fc(3, 'Why is a photocell bulb evacuated?', 'So photoelectrons reach the collector without colliding with gas molecules.', 'concept', 1),
    fc(4, 'What is the saturation current?', 'The largest photocurrent, when all emitted electrons reach the collector; ∝ intensity.', 'definition', 1),
    fc(5, 'Define stopping potential.', 'The negative collector potential that just stops the fastest photoelectrons: eV₀ = K_max.', 'definition', 1),
    fc(6, 'Effect of doubling intensity (same frequency) on V₀?', 'None: V₀ is unchanged; only the current doubles.', 'fact', 1),
    fc(7, 'Why does some current flow at zero collector potential?', 'Photoelectrons leave the emitter with kinetic energy and some reach the collector unaided.', 'concept', 1),
    fc(8, 'Three facts the wave theory cannot explain?', 'Threshold frequency; K_max independent of intensity; no time lag.', 'concept', 1),
    fc(9, 'Energy of a photon?', '$E = hf = \\dfrac{hc}{\\lambda}$.', 'formula', 2),
    fc(10, 'Photon energy in eV from λ in nm (h = 6.6 × 10⁻³⁴ J s)?', 'E = 1237.5/λ.', 'formula', 2),
    fc(11, 'Einstein’s photoelectric equation?', '$K_{\\max} = hf - W_0$.', 'formula', 2),
    fc(12, 'Define work function.', 'The minimum energy needed to remove an electron from a metal surface.', 'definition', 2),
    fc(13, 'Threshold frequency and wavelength?', 'f₀ = W₀/h; λ₀ = hc/W₀.', 'formula', 2),
    fc(14, 'Why is it called the maximum kinetic energy?', 'Electrons from deeper levels lose more energy getting out; only the topmost leave with hf − W₀.', 'concept', 2),
    fc(15, '412.5 nm photon energy?', '3.0 eV.', 'example', 2),
    fc(16, 'Magnesium (W₀ = 3.7 eV) in 225 nm light: K_max?', '5.5 − 3.7 = 1.8 eV; V₀ = 1.8 V.', 'example', 2),
    fc(17, 'Why no time lag in photoemission?', 'Each photon gives all its energy to one electron at once.', 'concept', 2),
    fc(18, 'Slope of a V₀–f graph?', 'h/e (4.125 × 10⁻¹⁵ V s), the same for all metals.', 'formula', 3),
    fc(19, 'What does the f-axis intercept of a V₀–f line give?', 'The threshold frequency f₀; W₀ = hf₀.', 'concept', 3),
    fc(20, 'V₀-axis intercept of the extended V₀–f line?', '−W₀/e.', 'formula', 3),
    fc(21, 'Momentum of a photon?', '$p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}$.', 'formula', 3),
    fc(22, 'Force of a beam of power P fully absorbed?', 'P/c (2P/c if reflected straight back).', 'formula', 3),
    fc(23, 'What is meant by wave–particle duality?', 'Radiation and matter show wave behaviour in some experiments and particle behaviour in others.', 'definition', 4),
    fc(24, 'de Broglie relation?', '$\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$.', 'formula', 4),
    fc(25, 'λ of an electron accelerated through V?', '$\\dfrac{h}{\\sqrt{2meV}} \\approx \\dfrac{1.22}{\\sqrt V}$ nm.', 'formula', 4),
    fc(26, 'Why don’t we see a sprinter diffract?', 'λ = h/mv ≈ 10⁻³⁶ m, far smaller than any opening.', 'concept', 4),
    fc(27, 'What did Davisson and Germer fire at a nickel crystal?', 'A narrow beam of electrons accelerated through a known potential.', 'fact', 5),
    fc(28, 'Davisson–Germer key observation?', 'A sharp peak in scattered electrons at about 50° for 54 V.', 'fact', 5),
    fc(29, 'Conclusion of the Davisson–Germer experiment?', 'Electrons are diffracted by crystals: they behave as waves, with λ = h/p.', 'concept', 5),
    fc(30, 'Exam tip: K_max in eV and V₀ in volts?', 'Same number: V₀ = 1.8 V means K_max = 1.8 eV.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};

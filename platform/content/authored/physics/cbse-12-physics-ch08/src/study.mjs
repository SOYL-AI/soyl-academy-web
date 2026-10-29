// ch08 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, ebPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electromagnetic Waves — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Displacement current',
      `**The puzzle:** for a loop round the wire of a charging capacitor, Ampere’s law $\\oint \\vec B\\cdot d\\vec l = \\mu_0 I$ gives $\\mu_0 I$ for a flat surface pierced by the wire but **zero** for a surface passing through the gap, where no charge flows.

**Maxwell’s fix:** a changing electric flux acts like a current, the **displacement current** $I_d = \\varepsilon_0\\dfrac{d\\Phi_E}{dt}$. In the gap $\\Phi_E = q/\\varepsilon_0$, so $I_d = dq/dt = I$: the total current is continuous.

**Ampere–Maxwell law:** $\\oint \\vec B\\cdot d\\vec l = \\mu_0 I_c + \\mu_0\\varepsilon_0\\dfrac{d\\Phi_E}{dt}$. A changing electric field produces a magnetic field (the counterpart of Faraday’s law).`,
      [kt('Displacement current', 'The term ε₀ dΦE/dt that acts like a current wherever the electric flux is changing.')],
      [fm(r`I_d = \varepsilon_0\dfrac{d\Phi_E}{dt}`, 'Displacement current'), fm(r`\oint \vec B\cdot d\vec l = \mu_0\left(I_c + \varepsilon_0\dfrac{d\Phi_E}{dt}\right)`, 'Ampere–Maxwell law')],
      V.disp,
      [1],
    ),
    sec(
      '2. Electromagnetic waves and their characteristics',
      `- **Source:** accelerated (e.g. oscillating) charges. A charge at rest gives only E; steady motion gives E and steady B; acceleration radiates. The wave’s frequency equals the frequency of oscillation of the charge.
- **Self-sustaining:** a changing E makes B and a changing B makes E, so the disturbance travels; **no medium** is needed.
- **Plane wave along x:** $E_y = E_0\\sin(kx - \\omega t)$, $B_z = B_0\\sin(kx - \\omega t)$: E and B are perpendicular to each other and to the direction of travel (**transverse**), and **in phase**; $\\vec E \\times \\vec B$ is along the direction of travel.
- **Speed:** $c = 1/\\sqrt{\\mu_0\\varepsilon_0} \\approx 3.0 \\times 10^8$ m s⁻¹ in vacuum, the same for all frequencies; in a medium $v = 1/\\sqrt{\\mu\\varepsilon} < c$.
- $E_0/B_0 = c$; $c = f\\lambda$; $k = 2\\pi/\\lambda$, $\\omega = 2\\pi f$.
- EM waves carry **energy** and **momentum** (they exert radiation pressure).`,
      [kt('Transverse wave', 'A wave whose oscillations are perpendicular to its direction of travel.')],
      [fm(r`c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}},\qquad E_0 = cB_0,\qquad c = f\lambda`, 'EM wave relations')],
      V.wave,
      [2],
      [ebPlot],
    ),
    sec(
      '3. The electromagnetic spectrum',
      `In order of **decreasing wavelength** (increasing frequency and photon energy); the edges are approximate:

| Band | Wavelength | Produced by | Uses |
|---|---|---|---|
| Radio | > 0.1 m | oscillating currents in aerials | AM/FM radio, TV, mobile phones |
| Microwave | 0.1 m – 1 mm | magnetron, klystron | radar, ovens (2.45 GHz), satellite links, Wi-Fi |
| Infrared | 1 mm – 700 nm | hot bodies, molecular vibrations | remote controls, night vision, physiotherapy; greenhouse effect |
| Visible | 700 – 400 nm | electron transitions in atoms | vision, photography |
| Ultraviolet | 400 nm – 1 nm | Sun, arc lamps | sterilisation, LASIK; absorbed by the ozone layer |
| X-rays | 1 nm – about 1 pm | fast electrons hitting a metal target | medical imaging, crystal structure |
| Gamma rays | below about 1 pm | radioactive nuclei | cancer therapy, sterilising equipment |`,
      [kt('Electromagnetic spectrum', 'The full range of EM waves arranged by wavelength or frequency.'), kt('Ozone layer', 'Upper-atmosphere layer that absorbs most of the Sun’s ultraviolet.')],
      [],
      V.spec,
      [3],
    ),
  ],
  exam_tips_md: `- Displacement current: describe the two surfaces with one boundary, then $I_d = \\varepsilon_0\\,d\\Phi_E/dt$.
- Transverse nature: E ⟂ B ⟂ direction of travel; E and B in phase; E × B gives the direction.
- $c = 1/\\sqrt{\\mu_0\\varepsilon_0}$, $E_0 = cB_0$, $c = f\\lambda$.
- Spectrum: order, one source and two uses for each band; convert f to λ before naming a band.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why did Maxwell add displacement current?', 'Ampere’s law gave two answers for one loop round a charging capacitor.', 'concept', 1),
    fc(2, 'Displacement current formula?', '$I_d = \\varepsilon_0\\,d\\Phi_E/dt$.', 'formula', 1),
    fc(3, 'Displacement current in a charging capacitor equals?', 'The conduction current in the leads.', 'fact', 1),
    fc(4, 'Ampere–Maxwell law?', '$\\oint \\vec B\\cdot d\\vec l = \\mu_0(I_c + \\varepsilon_0\\,d\\Phi_E/dt)$.', 'formula', 1),
    fc(5, 'What does a changing electric field produce?', 'A magnetic field.', 'concept', 1),
    fc(6, 'Source of EM waves?', 'Accelerated (oscillating) charges.', 'fact', 2),
    fc(7, 'Do EM waves need a medium?', 'No; they travel through vacuum.', 'fact', 2),
    fc(8, 'Speed of EM waves in vacuum?', '$c = 1/\\sqrt{\\mu_0\\varepsilon_0} \\approx 3 \\times 10^8$ m s⁻¹.', 'formula', 2),
    fc(9, 'Relation between E₀ and B₀?', '$E_0 = cB_0$.', 'formula', 2),
    fc(10, 'Why are EM waves transverse?', 'E and B are both perpendicular to the direction of travel.', 'concept', 2),
    fc(11, 'Phase relation of E and B in an EM wave?', 'In phase.', 'fact', 2),
    fc(12, 'Direction of travel from E and B?', 'Along E × B.', 'concept', 2),
    fc(13, 'Do EM waves carry momentum?', 'Yes; they exert radiation pressure.', 'fact', 2),
    fc(14, 'Order of the EM spectrum (longest λ first)?', 'Radio, microwave, infrared, visible, ultraviolet, X-rays, gamma.', 'fact', 3),
    fc(15, 'Wavelength range of visible light?', 'About 400–700 nm.', 'fact', 3),
    fc(16, 'Source of microwaves?', 'Magnetron or klystron valves.', 'fact', 3),
    fc(17, 'Frequency of a microwave oven?', '2.45 GHz (λ ≈ 12 cm).', 'example', 3),
    fc(18, 'Two uses of infrared?', 'Remote controls; night vision (also physiotherapy).', 'example', 3),
    fc(19, 'Radiation absorbed by the ozone layer?', 'Ultraviolet.', 'fact', 3),
    fc(20, 'How are X-rays produced?', 'Fast electrons striking a metal target.', 'fact', 3),
    fc(21, 'Use of X-rays in medicine?', 'Imaging bones (they pass through soft tissue).', 'example', 3),
    fc(22, 'Source of gamma rays?', 'Radioactive nuclei (nuclear reactions).', 'fact', 3),
    fc(23, 'Use of gamma rays?', 'Cancer therapy; sterilising medical equipment.', 'example', 3),
    fc(24, 'Wavelength of 100 MHz FM radio?', '3 m.', 'example', 3),
    fc(25, 'Which radiation keeps the Earth warm via the greenhouse effect?', 'Infrared.', 'concept', 3),
    fc(26, 'Exam tip: naming the band from a frequency?', 'Convert to λ = c/f first.', 'exam-tip', 3),
    fc(27, 'Exam tip: explaining displacement current?', 'Two surfaces, one loop: one cut by the wire, one through the gap.', 'exam-tip', 1),
    fc(28, 'Speed of EM waves in a medium?', '$v = 1/\\sqrt{\\mu\\varepsilon}$, less than c.', 'formula', 2),
  ],
  status: 'draft',
  provenance: PROV,
};

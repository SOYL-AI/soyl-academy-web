// ICSE 10 Physics ch06 Spectrum — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Spectrum — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Dispersion of white light',
      `- **Dispersion:** the splitting of white light into its constituent colours by a prism. The band of colours is the **spectrum**: violet, indigo, blue, green, yellow, orange, red (VIBGYOR).
- **Cause:** in a material medium, light of different colours travels at different speeds, so the **refractive index depends on wavelength**: $\\mu_{violet} > \\mu_{red}$. Hence **violet is deviated most and red least**.
- In vacuum all colours travel at the same speed, $3 \\times 10^{8}$ m s⁻¹.
- A prism only separates colours already present; a second, identical prism placed inverted recombines them into white light.
- **Monochromatic light** (one wavelength, for example a sodium lamp) is deviated but not dispersed.`,
      [kt('Dispersion', 'The splitting of white light into its constituent colours on passing through a prism.'), kt('Spectrum', 'The band of colours obtained when white light is dispersed.'), kt('Monochromatic light', 'Light of a single wavelength (single colour).')],
      [fm(r`\mu = \frac{c}{v}, \quad \mu_{violet} > \mu_{red}`, 'Refractive index depends on colour')],
      table(['Colour', 'Speed in glass', 'μ in glass', 'Deviation'], [['Red', 'Highest', 'Least', 'Least'], ['Violet', 'Lowest', 'Greatest', 'Greatest']], 'Table comparing red and violet light in glass'),
      [1],
    ),
    sec(
      '2. The visible spectrum',
      r`- Wavelength range about **400 nm (violet) to 700–800 nm (red)**; $1\ \text{nm} = 10^{-9}$ m.
- Order of increasing wavelength: violet, indigo, blue, green, yellow, orange, red; frequency increases the other way ($c = f\lambda$).
- Colour is decided by **frequency**, which does not change on refraction.`,
      [kt('Wavelength', 'The distance between two successive crests (or compressions) of a wave.')],
      [fm(r`c = f \lambda`, 'Wave equation for light')],
      table(['Colour', 'Wavelength (about)', 'Frequency (about)'], [['Violet', '400 nm', '7.5 × 10¹⁴ Hz'], ['Green', '530 nm', '5.7 × 10¹⁴ Hz'], ['Red', '700 nm', '4.3 × 10¹⁴ Hz']], 'Table of wavelength and frequency of violet, green and red light'),
      [1, 2],
    ),
    sec(
      '3. The electromagnetic spectrum',
      `| Region | Wavelength (about) | Source or use |
|---|---|---|
| Gamma rays | below 10⁻¹¹ m | Radioactive nuclei; cancer treatment |
| X-rays | 10⁻¹¹ to 10⁻⁸ m | Fast electrons hitting a metal; bone images |
| Ultraviolet | 10⁻⁸ to 4 × 10⁻⁷ m | Sun, arcs; sterilising |
| Visible | 4 × 10⁻⁷ to 8 × 10⁻⁷ m | Sun, lamps; seeing |
| Infrared | 8 × 10⁻⁷ to 10⁻³ m | Hot bodies; remote controls |
| Microwaves | 10⁻³ to 0.3 m | Ovens, radar, mobile phones |
| Radio waves | above 0.3 m | Broadcasting |

**Common properties:** produced by accelerated charges; transverse electric and magnetic fields; travel in vacuum at $3 \\times 10^{8}$ m s⁻¹; obey $c = f\\lambda$; not deflected by electric or magnetic fields; can be reflected and refracted; carry energy.`,
      [kt('Electromagnetic wave', 'A transverse wave of changing electric and magnetic fields that can travel through vacuum at the speed of light.')],
      [],
      table(['Order', 'Increasing wavelength', 'Increasing frequency'], [['First', 'Gamma rays', 'Radio waves'], ['Last', 'Radio waves', 'Gamma rays']], 'Table showing the two ends of the electromagnetic spectrum'),
      [2],
    ),
    sec(
      '4. Infrared and ultraviolet radiation',
      `**Infrared (IR):** beyond red. Produced by hot bodies (Sun, heater, human body). Detected by a thermopile or blackened-bulb thermometer. Properties: strong heating effect; less scattered by haze and fog; absorbed by water vapour and CO₂; reflected by polished surfaces. Uses: remote controls, night vision and thermal cameras, haze photography, physiotherapy, drying paint, weather satellites, greenhouses.

**Ultraviolet (UV):** beyond violet. Produced by the Sun, electric arcs, mercury vapour lamps (quartz tubes). Detected by photographic film and fluorescence (zinc sulphide). Properties: causes fluorescence; kills germs; causes chemical changes (tanning); absorbed by ordinary glass, transmitted by quartz; absorbed by the ozone layer. Uses: sterilising water and instruments, checking forged notes, vitamin D formation. Harmful in excess: sunburn, eye damage, skin cancer.`,
      [kt('Thermopile', 'A detector of infrared radiation that produces a current when warmed by the radiation.'), kt('Fluorescence', 'The emission of visible light by a substance while ultraviolet radiation falls on it.')],
      [],
      table(['Feature', 'Infrared', 'Ultraviolet'], [['Position', 'Beyond red', 'Beyond violet'], ['Detector', 'Thermopile', 'Fluorescent screen, film'], ['Glass', 'Partly transmitted', 'Absorbed (quartz transmits)'], ['Main effect', 'Heating', 'Chemical, germicidal']], 'Table comparing infrared and ultraviolet radiation'),
      [3],
    ),
    sec(
      '5. Scattering of light',
      r`- **Scattering:** absorption and re-emission of light in all directions by small particles.
- For particles much smaller than the wavelength (air molecules): scattered intensity $\propto \dfrac{1}{\lambda^{4}}$. Blue is scattered about 5 times as much as red.
- **Blue sky:** air molecules scatter blue most; skylight is mainly blue.
- **Red Sun at sunrise and sunset:** long path through air removes blue by scattering; red reaches the eye.
- **Red danger signals:** red is scattered least and penetrates fog farthest.
- **White clouds:** large droplets scatter all colours equally.
- **Black sky in space or on the Moon:** no atmosphere, no scattering.`,
      [kt('Scattering of light', 'The process by which small particles absorb light and send it out again in all directions.')],
      [fm(r`I_{\text{scattered}} \propto \frac{1}{\lambda^{4}}`, 'Scattering by very small particles')],
      table(['Observation', 'Reason'], [['Blue sky', 'Blue scattered most'], ['Red sunrise', 'Blue scattered out on a long path'], ['Red signals', 'Red scattered least'], ['White clouds', 'Large drops scatter all colours']], 'Table of four scattering effects and their reasons'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying red is deviated (or scattered) most.
- Saying the prism “produces” colours.
- Mixing up the order of the electromagnetic spectrum, especially X-rays and gamma rays, or infrared and microwaves.
- Forgetting that ordinary glass absorbs ultraviolet.
- Explaining the red sunrise without mentioning the longer path through air.

**How marks are usually awarded**
- Dispersion: definition (1), cause — μ depends on wavelength (1), order of deviation (1).
- IR and UV: each property or use 1 mark; a named detector or source earns credit.
- Scattering: name the particles, the wavelength dependence and the conclusion.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Dispersion?', 'Splitting of white light into its colours by a prism.', 'definition', 1),
    fc(2, 'Order of colours from a prism (VIBGYOR)?', 'Violet, indigo, blue, green, yellow, orange, red.', 'fact', 1),
    fc(3, 'Colour deviated most?', 'Violet.', 'fact', 1),
    fc(4, 'Colour deviated least?', 'Red.', 'fact', 1),
    fc(5, 'Cause of dispersion?', 'Refractive index of glass differs for different colours.', 'concept', 1),
    fc(6, 'Speed of colours in vacuum?', 'All the same: 3 × 10⁸ m/s.', 'fact', 1),
    fc(7, 'Recombining a spectrum?', 'Second identical prism, inverted.', 'example', 1),
    fc(8, 'Monochromatic light?', 'Light of a single wavelength.', 'definition', 1),
    fc(9, 'Visible wavelength range?', 'About 400 nm to 700–800 nm.', 'fact', 2),
    fc(10, 'Wave equation for light?', 'c = f λ.', 'formula', 2),
    fc(11, 'EM order, increasing wavelength?', 'Gamma, X-rays, UV, visible, IR, microwaves, radio.', 'fact', 2),
    fc(12, 'Shortest-wavelength EM radiation?', 'Gamma rays.', 'fact', 2),
    fc(13, 'Speed of all EM waves in vacuum?', '3 × 10⁸ m/s.', 'fact', 2),
    fc(14, 'Are EM waves longitudinal or transverse?', 'Transverse.', 'concept', 2),
    fc(15, 'Do EM waves need a medium?', 'No.', 'concept', 2),
    fc(16, 'Effect of a magnetic field on EM waves?', 'No deflection (no charge).', 'concept', 2),
    fc(17, 'Region just beyond red?', 'Infrared.', 'fact', 3),
    fc(18, 'Detector of infrared?', 'Thermopile or blackened-bulb thermometer.', 'fact', 3),
    fc(19, 'Two uses of infrared?', 'Remote controls; night vision (also physiotherapy).', 'example', 3),
    fc(20, 'Why IR for photographs in haze?', 'Long wavelength, scattered less.', 'concept', 3),
    fc(21, 'Region just beyond violet?', 'Ultraviolet.', 'fact', 3),
    fc(22, 'Detector of ultraviolet?', 'Fluorescent screen or photographic film.', 'fact', 3),
    fc(23, 'Prism material for UV?', 'Quartz (glass absorbs UV).', 'fact', 3),
    fc(24, 'Two uses of ultraviolet?', 'Sterilising water; checking forged notes.', 'example', 3),
    fc(25, 'What absorbs most solar UV?', 'The ozone layer.', 'fact', 3),
    fc(26, 'Scattering law for tiny particles?', 'Intensity ∝ 1/λ⁴.', 'formula', 4),
    fc(27, 'Why is the sky blue?', 'Air molecules scatter blue light most.', 'concept', 4),
    fc(28, 'Why is the rising Sun red?', 'Long path through air scatters away blue.', 'concept', 4),
    fc(29, 'Why are danger signals red?', 'Red is scattered least, seen from far.', 'concept', 4),
    fc(30, 'Sky colour seen from the Moon?', 'Black: no atmosphere to scatter light.', 'example', 4),
    fc(31, 'Exam tip: IR and UV', 'Give two properties, two uses and a detector for each.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};

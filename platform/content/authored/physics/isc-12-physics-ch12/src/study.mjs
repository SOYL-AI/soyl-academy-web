// ISC 12 Physics ch12 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, qPlot, lamPlot } from './decks.mjs';

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
      `- **The problem:** Ampère’s law $\\oint \\vec B \\cdot d\\vec l = \\mu_0 i$ allows any surface bounded by the loop. For a loop round the lead of a charging capacitor, a flat disc encloses the current $i$, but a surface bulging through the gap encloses no conduction current: two answers for one loop.
- **Maxwell’s fix:** a changing electric flux acts as a current, the **displacement current** $i_d = \\varepsilon_0\\,\\dfrac{d\\Phi_E}{dt}$. Ampère–Maxwell law: $\\oint \\vec B \\cdot d\\vec l = \\mu_0(i + i_d)$.
- For a parallel-plate capacitor: $\\Phi_E = EA = q/\\varepsilon_0$, so $i_d = dq/dt = i$: the current is **continuous** through the gap. Also $i_d = C\\,dV/dt = \\varepsilon_0A\\,dE/dt$.
- The displacement current produces a magnetic field (circles round the axis of the plates) exactly like a conduction current. It exists only while E changes: zero once the capacitor is fully charged, so steady DC is blocked.
- Conduction current: moving charges in a conductor. Displacement current: changing E, possible even in vacuum. ISC: basic idea and formula only.`,
      [kt('Displacement current', 'ε₀ dΦE/dt: the current-like effect of a changing electric flux, which produces a magnetic field.'), kt('Continuity of current', 'Conduction current in the leads plus displacement current in the gap form one unbroken current round a circuit with a capacitor.')],
      [fm(r`i_d = \varepsilon_0\,\dfrac{d\Phi_E}{dt}`, 'Displacement current'), fm(r`\oint \vec B \cdot d\vec l = \mu_0(i + i_d)`, 'Ampère–Maxwell law')],
      V.disp,
      [1],
      [V.loops, qPlot],
    ),
    sec(
      '2. Nature of electromagnetic waves',
      `- A changing B produces E (Faraday); a changing E produces B (Maxwell). Each regenerates the other, so the disturbance travels through empty space.
- **Source:** accelerated charges, for example charges oscillating in an aerial; the wave has the frequency of the oscillation. A charge at rest or in uniform motion does not radiate.
- **Transverse:** in a plane wave along x, E oscillates along y and B along z: $\\vec E \\perp \\vec B$, both perpendicular to the direction of travel, which is the direction of $\\vec E \\times \\vec B$. E and B are **in phase**.
- Sketch: a sine curve of E in one plane and of B in the perpendicular plane, both on the same axis of travel, peaking together; label E, B, the direction of travel and λ.`,
      [kt('Electromagnetic wave', 'Linked oscillating electric and magnetic fields, at right angles to each other and to the direction of travel, moving at c in vacuum.'), kt('Transverse wave', 'A wave whose oscillations are at right angles to its direction of travel.')],
      [],
      V.wave,
      [2],
    ),
    sec(
      '3. Speed and properties of EM waves',
      `- Speed in vacuum: $c = \\dfrac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = 3.0 \\times 10^{8}$ m s⁻¹. It matched the measured speed of light, so light is an EM wave; Hertz produced and detected radio waves to confirm the theory.
- Peak fields: $\\dfrac{E_0}{B_0} = c$. For every EM wave in vacuum: $c = f\\lambda$. In a material medium the speed is less than c (qualitative only).
- **Common properties:** transverse; same speed c in vacuum; no medium needed; E and B in phase; carry energy and momentum; uncharged, so not deflected by electric or magnetic fields; show reflection, refraction, interference, diffraction and polarisation.
- The bands differ only in frequency (and so wavelength).`,
      [kt('Speed of light in vacuum', 'c = 1/√(μ₀ε₀) = 3.0 × 10⁸ m s⁻¹, the same for every EM wave.')],
      [fm(r`c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}},\qquad \dfrac{E_0}{B_0} = c`, 'Speed; peak fields'), fm(r`c = f\lambda`, 'Wave relation')],
      V.wave,
      [2],
    ),
    sec(
      '4. The electromagnetic spectrum: order and ranges',
      `- Increasing frequency (decreasing wavelength): **radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays**.
- Approximate wavelengths: radio longer than 30 cm; microwaves 1 mm to 30 cm (1–300 GHz); infrared 700 nm to 1 mm; visible 400–700 nm; ultraviolet 1–400 nm; X-rays 1 pm to 1 nm; gamma rays below about 10 pm. Boundaries are not sharp.
- X-rays and gamma rays overlap; they are named by origin (electrons hitting a target, or nuclei).
- Place a wave in its band by converting with $c = f\\lambda$. From ultraviolet upwards the radiation is **ionising**.`,
      [kt('Electromagnetic spectrum', 'The whole range of EM waves arranged by frequency or wavelength, from radio waves to gamma rays.'), kt('Ionising radiation', 'Radiation able to knock electrons out of atoms: ultraviolet, X-rays and gamma rays.')],
      [],
      V.spec,
      [3],
    ),
    sec(
      '5. Radio waves, microwaves and infrared',
      `- **Radio:** source — oscillating currents in aerials; detection — aerial with a tuned circuit; uses — AM and FM broadcasting, TV, two-way radio, radio astronomy. Medium waves are reflected by the ionosphere.
- **Microwaves:** source — magnetron, klystron, Gunn diode and transistor oscillators; detection — dish or horn with a crystal diode; uses — radar (distance = ct/2), microwave ovens (2.45 GHz, absorbed by water in food), mobile phones, Wi-Fi, satellite links (they pass through the ionosphere).
- **Infrared:** source — hot and warm bodies, IR LEDs; detection — thermopile, bolometer, IR photodiode, thermal camera, the skin; uses — remote controls, non-contact thermometers, night vision, physiotherapy, optical fibres, greenhouses (absorbed by water vapour and CO₂).`,
      [kt('Magnetron', 'Valve that generates the microwaves in a microwave oven and in some radars.'), kt('Radar', 'Finding the distance of an object from the echo time t of a microwave pulse: d = ct/2.')],
      [fm(r`d = \dfrac{ct}{2}`, 'Radar ranging')],
      V.atmos,
      [3],
      [lamPlot],
    ),
    sec(
      '6. Visible light, ultraviolet, X-rays and gamma rays',
      `- **Visible (400–700 nm):** source — Sun, flames, lamps, LEDs, lasers; detection — eye, photocell, camera sensor, film; uses — vision, photography, photosynthesis.
- **Ultraviolet:** source — Sun, mercury-vapour lamps, welding arcs; detection — photocells, fluorescent materials, film; uses — sterilising water and surfaces, detecting forged notes, vitamin D. Mostly absorbed by the **ozone layer**; excess causes sunburn, eye damage, skin cancer.
- **X-rays:** source — fast electrons striking a metal target in an X-ray tube; detection — film, fluorescent screen, digital detector, GM counter; uses — radiography, CT scans, baggage checks, crystal structure (wavelengths near atomic spacing). Ionising: limit exposure, shield with lead.
- **Gamma rays:** source — radioactive nuclei (e.g. cobalt-60); detection — GM and scintillation counters; uses — radiotherapy, sterilising medical items, food irradiation, checking welds. Most penetrating.`,
      [kt('Fluorescence', 'Absorbing ultraviolet and giving out visible light; used to detect UV and to check banknotes.'), kt('X-ray tube', 'Evacuated tube in which fast electrons strike a metal target and produce X-rays.')],
      [],
      V.spec,
      [3],
    ),
  ],
  exam_tips_md: `- Continuity of current: one loop, two surfaces; the gap surface needs the displacement current $\\varepsilon_0\\,d\\Phi_E/dt$.
- For a capacitor, $i_d = C\\,dV/dt$; it is zero once the capacitor is fully charged.
- Sketch E, B and the direction of travel mutually perpendicular, E and B in phase; $E_0 = cB_0$, $c = f\\lambda$.
- Spectrum: order both ways, approximate ranges, and one source, detector and use for each band.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Displacement current in terms of electric flux?', '$i_d = \\varepsilon_0\\,d\\Phi_E/dt$.', 'formula', 1),
    fc(2, 'Why was displacement current needed?', 'For a loop round a charging capacitor’s lead, a surface through the gap encloses no conduction current, so Ampère’s law gave two answers.', 'concept', 1),
    fc(3, 'Ampère–Maxwell law?', '$\\oint \\vec B \\cdot d\\vec l = \\mu_0(i + i_d)$.', 'formula', 1),
    fc(4, 'Displacement current in a capacitor compared with the current in its leads?', 'Equal: $i_d = dq/dt = i$, so the current is continuous.', 'concept', 1),
    fc(5, 'Displacement current from the p.d. across a capacitor?', '$i_d = C\\,dV/dt$.', 'formula', 1),
    fc(6, 'Displacement current once a capacitor is fully charged?', 'Zero: the electric field no longer changes.', 'concept', 1),
    fc(7, 'Shape of the magnetic field lines round a charging capacitor’s gap?', 'Circles centred on the axis of the plates.', 'fact', 1),
    fc(8, 'What produces electromagnetic waves?', 'Accelerated charges, such as charges oscillating in an aerial.', 'concept', 2),
    fc(9, 'Directions of E and B in an EM wave?', 'Perpendicular to each other and to the direction of travel ($\\vec E \\times \\vec B$).', 'concept', 2),
    fc(10, 'Phase relation of E and B in a travelling EM wave?', 'In phase: they peak together.', 'fact', 2),
    fc(11, 'Speed of EM waves in vacuum from μ₀ and ε₀?', '$c = 1/\\sqrt{\\mu_0\\varepsilon_0} = 3.0 \\times 10^{8}$ m s⁻¹.', 'formula', 2),
    fc(12, 'Ratio of the peak fields of an EM wave in vacuum?', '$E_0/B_0 = c$.', 'formula', 2),
    fc(13, 'Who first generated and detected radio waves in a laboratory?', 'Heinrich Hertz (1887–88).', 'fact', 2),
    fc(14, 'Four properties shared by all EM waves?', 'Transverse; speed c in vacuum; need no medium; carry energy and momentum (also uncharged, E and B in phase).', 'concept', 2),
    fc(15, 'E₀ = 90 V m⁻¹: B₀?', '$3.0 \\times 10^{-7}$ T.', 'example', 2),
    fc(16, 'The spectrum in order of increasing frequency?', 'Radio, microwave, infrared, visible, ultraviolet, X-rays, gamma rays.', 'fact', 3),
    fc(17, 'Wavelength range of visible light?', 'About 400 nm (violet) to 700 nm (red).', 'fact', 3),
    fc(18, 'Wavelength of a 6.0 GHz signal?', '5.0 cm (microwave).', 'example', 3),
    fc(19, 'Source and detector of radio waves?', 'Oscillating current in an aerial; receiving aerial with a tuned circuit.', 'fact', 3),
    fc(20, 'Valve that makes the microwaves in an oven?', 'Magnetron.', 'fact', 3),
    fc(21, 'Radar: distance from the echo time t?', '$d = ct/2$.', 'formula', 3),
    fc(22, 'Two detectors of infrared?', 'Thermopile and bolometer (also IR photodiodes, thermal cameras).', 'fact', 3),
    fc(23, 'Two uses of infrared?', 'Remote controls and non-contact thermometers (also night vision, fibre links).', 'fact', 3),
    fc(24, 'What absorbs most of the Sun’s short-wave ultraviolet?', 'The ozone layer.', 'fact', 3),
    fc(25, 'Two uses of ultraviolet?', 'Sterilising water and surfaces; checking banknotes by fluorescence.', 'fact', 3),
    fc(26, 'How are X-rays produced?', 'Fast electrons strike a metal target in an X-ray tube.', 'fact', 3),
    fc(27, 'Source and detector of gamma rays?', 'Radioactive nuclei (cobalt-60); Geiger–Müller or scintillation counter.', 'fact', 3),
    fc(28, 'Which bands are ionising?', 'Ultraviolet, X-rays and gamma rays.', 'concept', 3),
    fc(29, 'Why are satellites reached with microwaves rather than medium waves?', 'Microwaves pass through the ionosphere; medium waves are reflected by it.', 'concept', 3),
    fc(30, 'Exam tip: X-rays or gamma rays of the same wavelength?', 'Physically identical; named by origin (electrons or nuclei).', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};

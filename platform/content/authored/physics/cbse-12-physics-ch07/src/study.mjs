// ch07 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, sinePlot, lagPlot, resPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Alternating Current — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Peak and rms values',
      `A sinusoidal supply: $v = V_0\\sin\\omega t$, $\\omega = 2\\pi f$ (India: 50 Hz, ω ≈ 314 rad s⁻¹). The average current over a cycle is zero, but the average of $\\sin^2$ is 1/2, so power is delivered.

**rms value:** the steady value giving the same average heating: $\\bar P = I_\\text{rms}^2R = \\tfrac12 I_0^2R$, so $I_\\text{rms} = I_0/\\sqrt2 \\approx 0.707I_0$ and $V_\\text{rms} = V_0/\\sqrt2$. AC meters read rms; “220 V mains” is rms (peak ≈ 311 V).`,
      [kt('rms value', 'The steady (DC) value that produces the same average heating in a resistor; I₀/√2 for a sinusoid.')],
      [fm(r`I_\text{rms} = \dfrac{I_0}{\sqrt2},\qquad V_\text{rms} = \dfrac{V_0}{\sqrt2}`, 'rms values')],
      sinePlot,
      [1],
    ),
    sec(
      '2. AC through R, L and C; reactance',
      `| Element | Opposition | Phase of I relative to V | Average power |
|---|---|---|---|
| R | R | in phase | $I_\\text{rms}^2R$ |
| L | $X_L = \\omega L$ | lags by π/2 | 0 |
| C | $X_C = 1/\\omega C$ | leads by π/2 | 0 |

- Inductor: $L\\,di/dt = V_0\\sin\\omega t$ gives $i = \\dfrac{V_0}{\\omega L}\\sin(\\omega t - \\pi/2)$.
- Capacitor: $i = C\\,dv/dt = \\omega CV_0\\cos\\omega t = \\dfrac{V_0}{1/\\omega C}\\sin(\\omega t + \\pi/2)$.
- $X_L \\propto f$ (blocks high frequencies, passes DC); $X_C \\propto 1/f$ (blocks DC, passes high frequencies).
- **Phasors:** arrows of length equal to the peak value rotating anticlockwise at ω; projections give instantaneous values; angles give phase differences.`,
      [kt('Inductive reactance', 'X_L = ωL, the opposition of an inductor to AC.'), kt('Capacitive reactance', 'X_C = 1/ωC, the opposition of a capacitor to AC.'), kt('Phasor', 'A rotating vector representing a sinusoidal quantity.')],
      [fm(r`X_L = \omega L,\qquad X_C = \dfrac{1}{\omega C}`, 'Reactances')],
      V.ph3,
      [2],
      [lagPlot],
    ),
    sec(
      '3. Series LCR circuit and resonance',
      `Same current through all; voltages add as phasors: $V = \\sqrt{V_R^2 + (V_L - V_C)^2}$.

$$Z = \\sqrt{R^2 + (X_L - X_C)^2},\\qquad I = V/Z,\\qquad \\tan\\phi = \\dfrac{X_L - X_C}{R}$$
$X_L > X_C$: inductive (V leads I); $X_C > X_L$: capacitive (I leads V).

**Resonance:** $X_L = X_C$ at $\\omega_0 = 1/\\sqrt{LC}$, $f_0 = 1/2\\pi\\sqrt{LC}$. Then $Z = R$ (minimum), $I = V/R$ (maximum), φ = 0. Smaller R gives a sharper resonance — used in radio tuning. Voltages across L and C at resonance can be much larger than the supply voltage.`,
      [kt('Impedance', 'Total opposition of an AC circuit, Z = V/I.'), kt('Resonance', 'Condition X_L = X_C at which a series LCR circuit carries maximum current.')],
      [fm(r`Z = \sqrt{R^2 + (X_L - X_C)^2},\qquad \tan\phi = \dfrac{X_L - X_C}{R}`, 'Impedance'), fm(r`\omega_0 = \dfrac{1}{\sqrt{LC}}`, 'Resonance')],
      V.lcr,
      [3],
      [V.tri, resPlot],
    ),
    sec(
      '4. Power, power factor and wattless current',
      `Average power $P = V_\\text{rms}I_\\text{rms}\\cos\\phi$; **power factor** $\\cos\\phi = R/Z$ (series LCR).

- Pure R: cos φ = 1. Pure L or C: cos φ = 0 (energy stored and returned each cycle). At resonance: 1.
- Only resistance dissipates: $P = I_\\text{rms}^2R$.
- **Wattless current:** the component $I\\sin\\phi$, 90° out of phase with V, delivers no average power but still causes $I^2R$ loss in the supply lines. Capacitors are added to inductive loads (motors) to raise the power factor.`,
      [kt('Power factor', 'cos φ, the ratio of real power to the product V_rms I_rms.'), kt('Wattless current', 'The component of current 90° out of phase with the voltage; it consumes no average power.')],
      [fm(r`P = V_\text{rms}I_\text{rms}\cos\phi`, 'Average power')],
      V.tri,
      [4],
    ),
    sec(
      '5. AC generator and transformer',
      `**AC generator:** a coil (N turns, area A) rotates at ω in field B: $\\Phi = NBA\\cos\\omega t$, $\\varepsilon = NBA\\omega\\sin\\omega t$, peak $\\varepsilon_0 = NBA\\omega$ (largest when the coil’s plane is parallel to B). Slip rings and brushes connect the coil to the circuit. Mechanical energy → electrical energy.

**Transformer:** primary and secondary on a laminated soft-iron core; works by mutual induction, AC only.
- Ideal: $\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p} = \\dfrac{I_p}{I_s}$; power in = power out.
- Step-up ($N_s > N_p$) for transmission; step-down for distribution and chargers.
- Losses: copper ($I^2R$, thick wires), flux leakage (interleaved windings), hysteresis (soft iron), heating of the core by induced currents (laminated core).`,
      [kt('Transformer', 'A device that changes an alternating voltage using mutual induction between two coils on a common core.'), kt('Turns ratio', 'N_s/N_p, equal to V_s/V_p for an ideal transformer.')],
      [fm(r`\varepsilon = NBA\omega\sin\omega t`, 'Generator'), fm(r`\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p} = \dfrac{I_p}{I_s}`, 'Ideal transformer')],
      V.gen,
      [5],
      [V.tr],
    ),
  ],
  exam_tips_md: `- Mains figures are rms; peak = √2 × rms.
- CIVIL: in C, I leads V; in L, V leads I.
- Series LCR: draw I as reference; Z from the impedance triangle; at resonance Z = R, I max, in phase.
- Power: P = VI cos φ; wattless current I sin φ.
- Transformer: turns-ratio relations; list losses with remedies.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'rms current of a sinusoidal AC?', '$I_0/\\sqrt2 \\approx 0.707I_0$.', 'formula', 1),
    fc(2, 'Peak value of 220 V rms mains?', 'About 311 V.', 'example', 1),
    fc(3, 'Average of AC current over a full cycle?', 'Zero.', 'fact', 1),
    fc(4, 'Why define rms values?', 'They give the same average heating as a steady current; meters and ratings use them.', 'concept', 1),
    fc(5, 'Frequency of Indian mains?', '50 Hz (ω ≈ 314 rad s⁻¹).', 'fact', 1),
    fc(6, 'Phase of current in a pure resistor?', 'In phase with the voltage.', 'fact', 2),
    fc(7, 'Phase of current in a pure inductor?', 'Lags the voltage by 90°.', 'fact', 2),
    fc(8, 'Phase of current in a pure capacitor?', 'Leads the voltage by 90°.', 'fact', 2),
    fc(9, 'Inductive reactance?', '$X_L = \\omega L = 2\\pi fL$.', 'formula', 2),
    fc(10, 'Capacitive reactance?', '$X_C = 1/\\omega C$.', 'formula', 2),
    fc(11, 'Behaviour of L and C for DC?', 'L acts as a short (X_L = 0); C acts as an open circuit (X_C infinite).', 'concept', 2),
    fc(12, 'Memory aid for phase?', 'CIVIL: C — I leads V; L — V leads I.', 'exam-tip', 2),
    fc(13, 'What is a phasor?', 'A rotating arrow whose projection gives the instantaneous value.', 'definition', 2),
    fc(14, 'Impedance of series LCR?', '$Z = \\sqrt{R^2 + (X_L - X_C)^2}$.', 'formula', 3),
    fc(15, 'Phase angle of series LCR?', '$\\tan\\phi = (X_L - X_C)/R$.', 'formula', 3),
    fc(16, 'Resonant angular frequency?', '$\\omega_0 = 1/\\sqrt{LC}$.', 'formula', 3),
    fc(17, 'Three features of series resonance?', 'Z = R (minimum), I maximum, V and I in phase.', 'concept', 3),
    fc(18, 'Effect of smaller R on resonance?', 'Taller, sharper peak.', 'concept', 3),
    fc(19, 'Use of series resonance?', 'Tuning radios and TVs to one station.', 'example', 3),
    fc(20, 'Average power in AC?', '$P = V_\\text{rms}I_\\text{rms}\\cos\\phi$.', 'formula', 4),
    fc(21, 'Power factor of series LCR?', '$\\cos\\phi = R/Z$.', 'formula', 4),
    fc(22, 'Power in a pure inductor or capacitor?', 'Zero on average.', 'fact', 4),
    fc(23, 'Wattless current?', '$I\\sin\\phi$: the part 90° out of phase, delivering no power.', 'definition', 4),
    fc(24, 'Why improve the power factor?', 'Less current for the same power, so lower line losses.', 'concept', 4),
    fc(25, 'Peak emf of an AC generator?', '$\\varepsilon_0 = NBA\\omega$.', 'formula', 5),
    fc(26, 'Coil position for maximum generator emf?', 'Plane of the coil parallel to B (flux zero, changing fastest).', 'concept', 5),
    fc(27, 'Ideal transformer relations?', '$V_s/V_p = N_s/N_p = I_p/I_s$.', 'formula', 5),
    fc(28, 'Why does a transformer not work on DC?', 'Steady current gives no changing flux, so no induced emf.', 'concept', 5),
    fc(29, 'Why is a transformer core laminated?', 'To reduce energy lost by heating of the core by induced currents.', 'fact', 5),
    fc(30, 'Why transmit power at high voltage?', 'Small current for the same power, so small I²R loss in lines.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};

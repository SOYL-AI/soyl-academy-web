// ISC 12 Physics ch11 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, sqPlot, lagPlot, leadPlot, xfPlot, zPlot, iPlot, powerPlot, genPlot, energyPlot, pfTable, acdcTable } from './decks.mjs';

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
      '1. Sinusoidal AC; mean and rms values',
      `- $i = I_0\\sin(\\omega t + \\phi_0)$: **peak** $I_0$, **period** $T$, **frequency** $f = 1/T$, angular frequency $\\omega = 2\\pi f$, **phase** $(\\omega t + \\phi_0)$. Indian mains: 230 V rms, 50 Hz, $T = 20$ ms.
- A **phasor** is a vector of length equal to the peak, turning anticlockwise at $\\omega$; its projection gives the instantaneous value. The quantity whose phasor is ahead **leads**.
- **Mean over a half cycle:** $\\bar I = \\dfrac{2}{T}\\int_0^{T/2} I_0\\sin\\omega t\\,dt = \\dfrac{2I_0}{\\pi} \\approx 0.637\\,I_0$. Over a full cycle the mean is zero.
- **rms value:** the steady current giving the same heating in a resistor. $\\overline{\\sin^2\\omega t} = \\tfrac12$, so $I_\\text{rms} = I_0/\\sqrt2 \\approx 0.707\\,I_0$ (sine waves only). AC meters and ratings use rms values.`,
      [kt('rms value', 'The steady (DC) value that would produce the same heat in a given resistor in the same time; I₀/√2 for a sinusoidal current.'), kt('Phasor', 'A rotating vector whose length is the peak value of a sinusoidal quantity and whose projection gives its instantaneous value.')],
      [fm(r`\bar I = \dfrac{2I_0}{\pi}`, 'Half-cycle mean'), fm(r`I_\text{rms} = \dfrac{I_0}{\sqrt2},\qquad V_\text{rms} = \dfrac{V_0}{\sqrt2}`, 'rms values')],
      V.wave,
      [1],
      [V.phase, sqPlot],
    ),
    sec(
      '2. AC through pure R, L and C',
      `- **Resistor:** $i$ in phase with $v$; $I_\\text{rms} = V_\\text{rms}/R$.
- **Inductor:** $v = L\\,di/dt$ gives $i = I_0\\sin(\\omega t - \\pi/2)$: current **lags** by 90°. **Inductive reactance** $X_L = \\omega L = 2\\pi fL$.
- **Capacitor:** $i = dq/dt = C\\,dv/dt$ gives $i = I_0\\sin(\\omega t + \\pi/2)$: current **leads** by 90°. **Capacitive reactance** $X_C = 1/(\\omega C) = 1/(2\\pi fC)$.
- Graphs against f: $X_L$ a straight line through the origin; $X_C$ a rectangular hyperbola. A coil passes DC and low frequencies; a capacitor blocks DC and passes high frequencies.`,
      [kt('Reactance', 'The opposition of an inductor (ωL) or a capacitor (1/ωC) to alternating current, in ohms; it depends on frequency and causes no heating.')],
      [fm(r`X_L = \omega L = 2\pi fL,\qquad X_C = \dfrac{1}{\omega C} = \dfrac{1}{2\pi fC}`, 'Reactances')],
      V.elements,
      [2],
      [lagPlot, leadPlot, xfPlot],
    ),
    sec(
      '3. The series LCR circuit',
      `- Same current through all; phasors: $V_R$ along $I$, $V_L$ 90° ahead, $V_C$ 90° behind. Add as phasors: $V^2 = V_R^2 + (V_L - V_C)^2$.
- **Impedance** $Z = \\sqrt{R^2 + (X_L - X_C)^2}$, $I = V/Z$; **phase angle** $\\tan\\phi = (X_L - X_C)/R$. $X_L > X_C$: inductive, $I$ lags; $X_C > X_L$: capacitive, $I$ leads.
- **RL:** $Z = \\sqrt{R^2 + \\omega^2L^2}$, $\\tan\\phi = \\omega L/R$ (lags). **RC:** $Z = \\sqrt{R^2 + 1/\\omega^2C^2}$, $\\tan\\phi = 1/\\omega CR$ (leads).
- Against frequency: $Z$ falls to a minimum $R$ where $X_L = X_C$ and rises again; $I = V/Z$ peaks there. The voltage across L or C can exceed the supply voltage.`,
      [kt('Impedance', 'The total opposition of a circuit to AC, Z = V/I; for a series LCR circuit √(R² + (X_L − X_C)²).'), kt('Phase angle', 'The angle φ by which the supply voltage leads (or lags) the current; tan φ = (X_L − X_C)/R.')],
      [fm(r`Z = \sqrt{R^2 + (X_L - X_C)^2},\qquad \tan\phi = \dfrac{X_L - X_C}{R}`, 'Series LCR')],
      V.lcrPhasor,
      [3],
      [V.lcr, V.triangle, zPlot],
    ),
    sec(
      '4. Power, power factor, wattless current and the choke',
      `- $p = vi$; average over a cycle: $P = V_\\text{rms}I_\\text{rms}\\cos\\phi = I_\\text{rms}^2R$. $V_\\text{rms}I_\\text{rms}$ is the apparent power (VA).
- **Power factor** $\\cos\\phi = R/Z$: 1 for a pure resistor (and at resonance), 0 for a pure L or C.
- **Wattless current:** the component $I\\sin\\phi$ in quadrature with $V$; it does no work over a cycle but still heats the supply cables. The active component is $I\\cos\\phi$.
- **Choke coil:** large L, very small R, laminated iron core; power factor nearly zero, so it limits an AC with almost no loss (a resistor would waste $I^2R$).`,
      [kt('Power factor', 'cos φ, the ratio of the true power to the apparent power V_rms I_rms; equal to R/Z for a series circuit.'), kt('Wattless current', 'The component I sin φ of an alternating current that is 90° out of phase with the voltage and so delivers no average power.'), kt('Choke coil', 'An inductor of large inductance and negligible resistance used to limit an alternating current without wasting energy.')],
      [fm(r`P = V_\text{rms}I_\text{rms}\cos\phi,\qquad \cos\phi = \dfrac{R}{Z}`, 'Average power')],
      V.wattless,
      [4],
      [powerPlot, pfTable, V.choke],
    ),
    sec(
      '5. Resonance, bandwidth, Q factor and LC oscillations',
      `- **Resonance** when $X_L = X_C$: $\\omega_0 = 1/\\sqrt{LC}$, $f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$. Then $Z = R$, $I_0 = V/R$, $\\phi = 0$, power factor 1; $V_L = V_C$, each possibly much larger than $V$.
- **Half-power frequencies** $f_1$, $f_2$: $I = I_0/\\sqrt2$. **Bandwidth** $\\Delta\\omega = R/L$ ($\\Delta f = R/2\\pi L$). **Q factor** $Q = \\omega_0/\\Delta\\omega = \\omega_0L/R = \\tfrac1R\\sqrt{L/C}$; $V_L = QV$ at resonance. (Formulae only; derivations not required.)
- Smaller R: taller, sharper peak, larger Q, same $f_0$. Used in radio tuning.
- **LC oscillations** (qualitative): a charged capacitor across a coil; energy passes back and forth between the electric field of C and the magnetic field of L at $f = \\dfrac{1}{2\\pi\\sqrt{LC}}$; resistance makes the oscillations die away.`,
      [kt('Resonant frequency', 'The frequency 1/(2π√(LC)) at which X_L = X_C in a series LCR circuit, so that the impedance is least and the current greatest.'), kt('Q factor', 'ω₀/Δω = ω₀L/R for a series LCR circuit: a measure of the sharpness of resonance.'), kt('Bandwidth', 'The gap between the two half-power frequencies, at which the current is I₀/√2.')],
      [fm(r`f_0 = \dfrac{1}{2\pi\sqrt{LC}}`, 'Resonant frequency'), fm(r`\Delta\omega = \dfrac{R}{L},\qquad Q = \dfrac{\omega_0L}{R} = \dfrac{1}{R}\sqrt{\dfrac{L}{C}}`, 'Bandwidth and Q')],
      iPlot,
      [5],
      [V.lc, energyPlot],
    ),
    sec(
      '6. The AC generator; AC and DC',
      `- **Principle:** electromagnetic induction in a coil turned in a magnetic field. **Parts:** armature coil, field magnet, slip rings, carbon brushes; driven by a turbine or engine.
- **Theory:** with the normal along B at $t = 0$, $\\Phi = NBA\\cos\\omega t$ and $e = -d\\Phi/dt = NBA\\omega\\sin\\omega t$; peak $e_0 = NBA\\omega$ when the plane is along B; $e = 0$ when the plane faces B. Frequency = rotations per second.
- **AC against DC:** AC reverses periodically and is easily transformed for efficient long-distance transmission; DC flows one way and is needed for charging, electroplating and electronics. AC is measured by its rms value.`,
      [kt('Slip rings', 'Two rings on the axle of an AC generator, joined to the ends of the coil, which with the brushes connect the turning coil to the external circuit.'), kt('Armature', 'The coil of many turns that is rotated in the magnetic field of a generator.')],
      [fm(r`e = NBA\omega\sin\omega t,\qquad e_0 = NBA\omega`, 'Generator emf')],
      V.gen,
      [6],
      [V.genTheory, genPlot, acdcTable],
    ),
  ],
  exam_tips_md: `- AC values: mains and meters give rms; peak = √2 × rms; half-cycle mean = 2/π × peak.
- Reactances: X_L = 2πfL, X_C = 1/(2πfC); in series circuits add voltages as phasors.
- Power: P = V_rms I_rms cos φ = I_rms² R; a pure L or C takes no power.
- Resonance: f₀ = 1/(2π√LC), Z = R; quote bandwidth R/L and Q = ω₀L/R without derivation.
- Generator: e = NBAω sin ωt; say where the angle is measured from.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Period of 50 Hz mains?', '20 ms (T = 1/f).', 'fact', 1),
    fc(2, 'Angular frequency in terms of f and T?', '$\\omega = 2\\pi f = 2\\pi/T$.', 'formula', 1),
    fc(3, 'Mean of a sinusoidal current over a full cycle?', 'Zero.', 'fact', 1),
    fc(4, 'Mean over a half cycle?', '$2I_0/\\pi \\approx 0.637\\,I_0$.', 'formula', 1),
    fc(5, 'rms value of a sinusoidal current?', '$I_0/\\sqrt2 \\approx 0.707\\,I_0$.', 'formula', 1),
    fc(6, 'What does an AC voltmeter on the mains read?', 'The rms value, 230 V (peak about 325 V).', 'fact', 1),
    fc(7, 'Phase relation in a pure resistor?', 'Current in phase with voltage.', 'fact', 2),
    fc(8, 'Phase relation in a pure inductor?', 'Current lags the voltage by 90° (π/2).', 'fact', 2),
    fc(9, 'Phase relation in a pure capacitor?', 'Current leads the voltage by 90° (π/2).', 'fact', 2),
    fc(10, 'Inductive reactance?', '$X_L = \\omega L = 2\\pi fL$ (ohm).', 'formula', 2),
    fc(11, 'Capacitive reactance?', '$X_C = 1/(\\omega C) = 1/(2\\pi fC)$ (ohm).', 'formula', 2),
    fc(12, 'Shape of the X_L and X_C graphs against f?', 'X_L: straight line through the origin. X_C: rectangular hyperbola.', 'concept', 2),
    fc(13, 'Why does a capacitor block steady DC?', 'For f = 0, X_C = 1/(2πfC) is infinite.', 'concept', 2),
    fc(14, 'Impedance of a series LCR circuit?', '$Z = \\sqrt{R^2 + (X_L - X_C)^2}$.', 'formula', 3),
    fc(15, 'Phase angle of a series LCR circuit?', '$\\tan\\phi = (X_L - X_C)/R$.', 'formula', 3),
    fc(16, 'Series RC circuit: does the current lead or lag?', 'Leads, by an angle between 0° and 90°; tan φ = 1/(ωCR).', 'concept', 3),
    fc(17, 'Voltmeters read V_R = 30 V and V_L = 40 V in a series RL circuit. Supply voltage?', '50 V (phasor sum, not 70 V).', 'example', 3),
    fc(18, 'Average power in an AC circuit?', '$P = V_\\text{rms}I_\\text{rms}\\cos\\phi$.', 'formula', 4),
    fc(19, 'Power factor of a series LCR circuit?', '$\\cos\\phi = R/Z$.', 'formula', 4),
    fc(20, 'Power taken by an ideal inductor or capacitor?', 'Zero: power factor 0.', 'fact', 4),
    fc(21, 'Wattless current?', 'The component I sin φ at 90° to V; it does no work over a cycle.', 'definition', 4),
    fc(22, 'Why use a choke rather than a resistor to limit AC?', 'Its power factor is nearly zero, so it wastes almost no energy.', 'exam-tip', 4),
    fc(23, 'Resonant frequency of a series LCR circuit?', '$f_0 = 1/(2\\pi\\sqrt{LC})$.', 'formula', 5),
    fc(24, 'Impedance and current at resonance?', 'Z = R (least); I = V/R (greatest); power factor 1.', 'fact', 5),
    fc(25, 'Bandwidth of a series LCR circuit?', '$\\Delta\\omega = R/L$, i.e. $\\Delta f = R/(2\\pi L)$.', 'formula', 5),
    fc(26, 'Q factor?', '$Q = \\omega_0L/R = \\dfrac{1}{R}\\sqrt{L/C} = \\omega_0/\\Delta\\omega$.', 'formula', 5),
    fc(27, 'LC oscillations in one sentence?', 'Energy passes back and forth between the electric field of C and the magnetic field of L.', 'concept', 5),
    fc(28, 'Principle of the AC generator?', 'Electromagnetic induction: a coil turned in a magnetic field has a changing flux.', 'concept', 6),
    fc(29, 'Emf of a generator coil?', '$e = NBA\\omega\\sin\\omega t$; peak $NBA\\omega$ when the plane is along B.', 'formula', 6),
    fc(30, 'Main advantage of AC over DC for the mains?', 'Its voltage can be stepped up or down by transformers, so power is sent at high voltage with small loss.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};

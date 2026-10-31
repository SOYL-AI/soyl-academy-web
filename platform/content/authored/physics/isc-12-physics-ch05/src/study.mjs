// ISC 12 Physics ch05 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, viPlot, rhoPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electric Current, Ohm’s Law and Resistivity — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Free electrons, drift and mobility',
      `- Current $I = \\Delta q/\\Delta t$ (A = C s⁻¹); conventional current is opposite to electron flow.
- Free electrons move randomly (~10⁵ m s⁻¹) colliding with ions; **relaxation time** τ = mean time between collisions (~10⁻¹⁴ s).
- In a field: acceleration $eE/m$; **drift velocity** $v_d = eE\\tau/m$ (opposite to E), ~10⁻⁴ m s⁻¹. **Mobility** $\\mu = v_d/E = e\\tau/m$ (m² V⁻¹ s⁻¹).
- **$I = n e A v_d$** (n = free electrons per m³): all electrons within $v_d\\Delta t$ of a section cross it in $\\Delta t$.
- Lamps light instantly because the **field** is set up along the wire at nearly the speed of light.`,
      [kt('Relaxation time', 'Average time between successive collisions of a free electron with the ions.'), kt('Drift velocity', 'Average velocity acquired by free electrons in a conductor in an electric field.'), kt('Mobility', 'Drift velocity per unit electric field, eτ/m.')],
      [fm(r`I = n e A v_d`, 'Current and drift'), fm(r`v_d = \dfrac{eE\tau}{m}`, 'Drift velocity')],
      V.drift,
      [1],
      [V.walk],
    ),
    sec(
      '2. Ohm’s law in microscopic form',
      `- Current density $J = I/A = n e v_d$ (A m⁻²). With $v_d = eE\\tau/m$: $J = \\dfrac{n e^2\\tau}{m}E = \\sigma E$.
- Conductivity $\\sigma = \\dfrac{n e^2\\tau}{m}$; resistivity $\\rho = \\dfrac{m}{n e^2\\tau}$.
- For a wire, $E = V/l$, $J = I/A$ give $V = IR$ with $R = \\rho l/A$: **Ohm’s law** (V ∝ I at constant temperature).`,
      [kt('Current density', 'Current per unit cross-sectional area, J = I/A.')],
      [fm(r`\vec J = \sigma\vec E`, 'Ohm’s law (vector form)'), fm(r`\rho = \dfrac{m}{n e^2\tau}`, 'Resistivity')],
      V.walk,
      [2],
    ),
    sec(
      '3. Resistance, resistivity and V–I graphs',
      `- $R = \\rho l/A$; conductance $G = 1/R$ (S); conductivity $\\sigma = 1/\\rho$ (S m⁻¹).
- Stretching to $n$ times the length at constant volume: $A \\to A/n$, $R \\to n^2R$.
- **Ohmic:** V–I graph a straight line through the origin (metals at constant temperature). **Non-ohmic:** curved (filament lamp), one-way (diode), negative slope regions, or different in reverse.`,
      [kt('Resistivity', 'Resistance of a conductor of unit length and unit cross-section; a property of the material.'), kt('Ohmic conductor', 'One for which V is proportional to I at constant temperature.')],
      [fm(r`R = \dfrac{\rho l}{A}`, 'Resistance of a wire')],
      V.wire,
      [3],
      [viPlot, V.stretch],
    ),
    sec(
      '4. Temperature dependence',
      `- Metals: $\\rho_T = \\rho_0[1 + \\alpha(T - T_0)]$, α > 0 (copper about 3.9 × 10⁻³ °C⁻¹): n constant, τ decreases as ions vibrate more.
- Semiconductors: ρ **decreases** with temperature (negative α): n increases sharply, outweighing the fall in τ.
- Alloys (manganin, constantan): very small α, high ρ — standard resistors; nichrome for heaters.`,
      [kt('Temperature coefficient of resistivity', 'Fractional change in resistivity per degree rise in temperature.')],
      [fm(r`R_T = R_0[1 + \alpha(T - T_0)]`, 'Temperature dependence')],
      rhoPlot,
      [4],
    ),
    sec(
      '5. Electrical energy and power',
      `- $P = VI = I^2R = V^2/R$; energy $W = Pt = VIt$; Joule heating $H = I^2Rt$.
- Commercial unit: 1 kW h (one “unit”) = $3.6 \\times 10^{6}$ J. Bill = total kW h × rate.
- Rated appliance: $R = V_\\text{rated}^2/P_\\text{rated}$; on a different supply $P' = V'^2/R$.
- Long-distance transmission at high voltage reduces current and so the $I^2R$ loss.`,
      [kt('Kilowatt hour', 'Energy used by a 1 kW device in one hour, 3.6 × 10⁶ J.')],
      [fm(r`P = VI = I^2R = \dfrac{V^2}{R}`, 'Electrical power')],
      viPlot,
      [5],
    ),
  ],
  exam_tips_md: `- Derive $I = n e A v_d$ and ρ = m/(ne²τ); convert mm² to m².
- Stretching: constant volume, R ∝ l².
- Temperature: explain through n and τ.
- Power: choose the form using the common quantity; bills in kW h.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define relaxation time.', 'Mean time between successive collisions of a free electron.', 'concept', 1),
    fc(2, 'Drift velocity formula?', '$v_d = eE\\tau/m$.', 'formula', 1),
    fc(3, 'Typical drift speed in a wire?', 'About 10⁻⁴ m s⁻¹.', 'fact', 1),
    fc(4, 'Typical random speed of free electrons?', 'About 10⁵ m s⁻¹.', 'fact', 1),
    fc(5, 'Relation between I and v_d?', '$I = n e A v_d$.', 'formula', 1),
    fc(6, 'Define mobility.', 'Drift velocity per unit field, μ = eτ/m.', 'formula', 1),
    fc(7, 'SI unit of mobility?', 'm² V⁻¹ s⁻¹.', 'fact', 1),
    fc(8, 'Why does a lamp light instantly?', 'The field travels along the wire at nearly the speed of light.', 'concept', 1),
    fc(9, 'Current density?', '$J = I/A = n e v_d$.', 'formula', 2),
    fc(10, 'Ohm’s law in vector form?', '$\\vec J = \\sigma\\vec E$.', 'formula', 2),
    fc(11, 'Conductivity in terms of τ?', '$\\sigma = n e^2\\tau/m$.', 'formula', 2),
    fc(12, 'Resistivity in terms of τ?', '$\\rho = m/(n e^2\\tau)$.', 'formula', 2),
    fc(13, 'Resistance of a wire?', '$R = \\rho l/A$.', 'formula', 3),
    fc(14, 'Unit of resistivity?', 'Ω m.', 'fact', 3),
    fc(15, 'Unit of conductance?', 'Siemens (S).', 'fact', 3),
    fc(16, 'Wire stretched to twice its length: R?', 'Four times.', 'concept', 3),
    fc(17, 'Shape of the V–I graph of an ohmic conductor?', 'Straight line through the origin.', 'concept', 3),
    fc(18, 'Example of a non-ohmic device?', 'Filament lamp, diode, thermistor.', 'example', 3),
    fc(19, 'Resistivity of a metal on heating?', 'Increases (τ decreases).', 'concept', 4),
    fc(20, 'Resistivity of a semiconductor on heating?', 'Decreases (n increases).', 'concept', 4),
    fc(21, 'Temperature formula for R?', '$R_T = R_0[1 + \\alpha\\Delta T]$.', 'formula', 4),
    fc(22, 'Alloys for standard resistors?', 'Manganin, constantan (small α).', 'fact', 4),
    fc(23, 'Electrical power formulas?', '$VI = I^2R = V^2/R$.', 'formula', 5),
    fc(24, '1 kW h in joules?', '$3.6 \\times 10^{6}$ J.', 'fact', 5),
    fc(25, 'Resistance of a 1000 W, 230 V heater?', 'About 52.9 Ω.', 'example', 5),
    fc(26, 'Why transmit power at high voltage?', 'Smaller current, smaller I²R loss.', 'concept', 5),
    fc(27, 'Joule heating?', '$H = I^2Rt$.', 'formula', 5),
    fc(28, 'Example: 2 kW for 3 h. Units?', '6 kW h.', 'example', 5),
    fc(29, 'Exam tip: drift problems?', 'Convert mm² to m² (× 10⁻⁶).', 'exam-tip', 1),
    fc(30, 'Exam tip: stretching problems?', 'Keep the volume constant.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};

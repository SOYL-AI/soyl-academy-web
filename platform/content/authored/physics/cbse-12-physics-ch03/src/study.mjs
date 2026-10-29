// ch03 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, viPlot, rhoPlot, termPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Current Electricity — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Current, drift velocity and mobility',
      `**Current** $I = dq/dt$ (ampere, A = C s$^{-1}$); conventional direction = direction of positive-charge flow. In metals, electrons move opposite to it.

**Drift velocity.** Free electrons move randomly (no net velocity without a field). In a field each gains $-e\\vec E/m$ between collisions; averaged over the relaxation time $\\tau$:
$$\\vec v_d = -\\dfrac{e\\vec E}{m}\\tau$$

**Current–drift relation.** In time $\\Delta t$ the electrons in a length $v_d\\Delta t$ cross area $A$: $\\Delta q = n e A v_d\\Delta t$, so
$$I = n e A v_d,\\qquad j = \\dfrac{I}{A} = n e v_d$$

**Mobility** $\\mu = \\dfrac{v_d}{E} = \\dfrac{e\\tau}{m}$ (m² V$^{-1}$ s$^{-1}$).

Typical drift speed: about $10^{-4}$ m s$^{-1}$; the field (and so the signal) travels at nearly the speed of light, which is why a lamp lights at once.`,
      [kt('Drift velocity', 'Average velocity of free electrons in a conductor in an electric field.'), kt('Relaxation time', 'Average time between successive collisions of a free electron.'), kt('Mobility', 'Drift speed per unit electric field.')],
      [fm(r`I = n e A v_d`, 'Current and drift'), fm(r`v_d = \dfrac{eE\tau}{m},\qquad \mu = \dfrac{e\tau}{m}`, 'Drift and mobility')],
      V.drift,
      [1],
    ),
    sec(
      '2. Ohm’s law, resistivity and conductivity',
      `Substituting $v_d = eE\\tau/m$ and $E = V/l$ into $I = n e A v_d$:
$$V = IR,\\qquad R = \\rho\\dfrac{l}{A},\\qquad \\rho = \\dfrac{m}{n e^2\\tau},\\qquad \\sigma = \\dfrac{1}{\\rho},\\qquad \\vec j = \\sigma\\vec E$$

- $R$ (ohm) depends on the sample; $\\rho$ (Ω m) only on the material and temperature.
- Stretching a wire $k$ times (constant volume): $R \\to k^2R$.

**V–I characteristics.** *Linear (ohmic):* straight line through the origin, same for both directions. *Non-linear:* filament lamp (R rises as it heats), diode (depends on the sign of V), GaAs (more than one V for some I).

**Temperature dependence.**
- Metals: $\\rho_T = \\rho_0[1 + \\alpha(T - T_0)]$, $\\alpha > 0$ — hotter ions, more collisions, smaller $\\tau$.
- Alloys (nichrome, manganin, constantan): very small $\\alpha$ — standard resistors and heater elements.
- Semiconductors: $\\rho$ falls with temperature ($\\alpha < 0$) because $n$ rises steeply.`,
      [kt('Resistivity', 'Resistance of a sample of unit length and unit cross-section; a property of the material.'), kt('Ohmic conductor', 'A conductor whose current is proportional to the applied voltage at constant temperature.'), kt('Temperature coefficient of resistivity', 'Fractional change in resistivity per degree rise in temperature, α.')],
      [fm(r`R = \rho\,\dfrac{l}{A},\qquad \rho = \dfrac{m}{n e^2\tau}`, 'Resistance and resistivity'), fm(r`\rho_T = \rho_0[1 + \alpha(T - T_0)]`, 'Temperature dependence')],
      viPlot,
      [2],
      [rhoPlot],
    ),
    sec(
      '3. Electrical energy and power',
      `Charge $q$ moving through potential difference $V$ transfers energy $qV$. Power delivered to a resistor:
$$P = VI = I^2R = \\dfrac{V^2}{R}$$

- Series (same $I$): the larger $R$ dissipates more ($I^2R$).
- Parallel (same $V$): the smaller $R$ dissipates more ($V^2/R$).
- Rated values give $R = V_\\text{rated}^2/P_\\text{rated}$; then use the actual voltage.
- Energy $W = Pt$; 1 kWh $= 3.6 \\times 10^{6}$ J.
- Power is sent over long distances at high voltage so that the current, and the $I^2R$ loss in the lines, is small.`,
      [kt('Kilowatt hour', 'Energy used by a 1 kW appliance in one hour, $3.6 \\times 10^{6}$ J.')],
      [fm(r`P = VI = I^2R = \dfrac{V^2}{R}`, 'Power')],
      null,
      [3],
    ),
    sec(
      '4. Cells: emf, internal resistance and combinations',
      `**EMF** $E$: terminal p.d. of a cell when it supplies no current. **Internal resistance** $r$: resistance of the electrolyte and electrodes.

- Discharging: $V = E - Ir$, $I = \\dfrac{E}{R + r}$. Charging: $V = E + Ir$.
- Short circuit: $I = E/r$. Open circuit: $V = E$.
- $V$–$I$ graph: straight line, intercept $E$, slope $-r$.

**Combinations**
- Series: $E_\\text{eq} = \\sum E_i$ (a reversed cell subtracts), $r_\\text{eq} = \\sum r_i$.
- Parallel: $\\dfrac{E_\\text{eq}}{r_\\text{eq}} = \\sum \\dfrac{E_i}{r_i}$, $\\dfrac{1}{r_\\text{eq}} = \\sum \\dfrac{1}{r_i}$. For $n$ identical cells: $E$, $r/n$.`,
      [kt('EMF', 'Work done by the source per unit charge in taking charge round the circuit; equals the terminal p.d. on open circuit.'), kt('Internal resistance', 'Resistance offered by the cell itself to the current through it.')],
      [fm(r`V = E - Ir,\qquad I = \dfrac{E}{R + r}`, 'Terminal voltage'), fm(r`\dfrac{E_\text{eq}}{r_\text{eq}} = \dfrac{E_1}{r_1} + \dfrac{E_2}{r_2}`, 'Cells in parallel')],
      V.cell,
      [4],
      [termPlot, V.cells],
    ),
    sec(
      '5. Kirchhoff’s rules',
      `**Junction rule** (charge conservation): $\\sum I_\\text{in} = \\sum I_\\text{out}$ at every junction.

**Loop rule** (energy conservation): $\\sum \\Delta V = 0$ round any closed loop.

**Method:** (1) mark a current in every branch with an assumed direction; (2) apply the junction rule to reduce unknowns; (3) choose independent loops and add potential changes with the sign rules (resistor along I: $-IR$; cell − to +: $+E$); (4) solve; a negative current flows opposite to the arrow.

*Worked result (deck example):* 12 V/2 Ω and 6 V/2 Ω branches with 4 Ω across them give 2.4 A, −0.6 A (the 6 V cell is charged) and 1.8 A.`,
      [kt('Junction rule', 'The algebraic sum of currents at a junction is zero.'), kt('Loop rule', 'The algebraic sum of potential changes round a closed loop is zero.')],
      [fm(r`\sum I = 0,\qquad \sum \Delta V = 0`, 'Kirchhoff’s rules')],
      V.kirch,
      [5],
    ),
    sec(
      '6. Wheatstone bridge and metre bridge',
      `Arms P (A–B), Q (B–C), R (A–D), S (D–C); cell across A–C, galvanometer across B–D.

**Balance** ($I_g = 0$): B and D at the same potential. Loop ABDA: $I_1P = I_2R$; loop BCDB: $I_1Q = I_2S$. Dividing:
$$\\dfrac{P}{Q} = \\dfrac{R}{S}$$
Balance is independent of the emf and of the galvanometer’s resistance; the cell and galvanometer may be interchanged.

**Metre bridge:** two arms are lengths $l$ and $100 - l$ (cm) of a uniform wire: $\\dfrac{X}{R} = \\dfrac{l}{100 - l}$ (X in the left gap). Best accuracy with balance near the middle; end errors are reduced by interchanging X and R and averaging.`,
      [kt('Balanced bridge', 'A Wheatstone bridge in which the galvanometer current is zero.')],
      [fm(r`\dfrac{P}{Q} = \dfrac{R}{S}`, 'Wheatstone balance'), fm(r`X = R\,\dfrac{l}{100 - l}`, 'Metre bridge')],
      V.bridge,
      [6],
      [V.metre],
    ),
  ],
  exam_tips_md: `- Derivations to practise: $I = n e A v_d$; $\\rho = m/n e^2\\tau$ from drift; Wheatstone balance from Kirchhoff's rules.
- Units: mm² $= 10^{-6}$ m²; drift speeds are tiny, signal speeds are not.
- Loop rule signs: decide them once, write them on the diagram.
- In bridge questions, balance means no galvanometer current, so it can be removed from the circuit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define electric current and its SI unit.', 'Rate of flow of charge, $I = dq/dt$; ampere (C s$^{-1}$).', 'definition', 1),
    fc(2, 'Drift velocity?', 'Average velocity of free electrons in a field: $v_d = eE\\tau/m$.', 'definition', 1),
    fc(3, 'Relation between current and drift velocity?', '$I = n e A v_d$.', 'formula', 1),
    fc(4, 'Mobility?', '$\\mu = v_d/E = e\\tau/m$; m² V$^{-1}$ s$^{-1}$.', 'definition', 1),
    fc(5, 'Typical drift speed in a copper wire?', 'About $10^{-4}$ m s$^{-1}$.', 'fact', 1),
    fc(6, 'Why does a lamp light instantly if drift is so slow?', 'The field is set up along the whole wire almost at the speed of light, so all electrons start drifting together.', 'concept', 1),
    fc(7, 'Ohm’s law?', '$V = IR$ for a conductor at constant temperature (I ∝ V).', 'definition', 2),
    fc(8, 'Resistance in terms of resistivity?', '$R = \\rho l/A$.', 'formula', 2),
    fc(9, 'Resistivity from the drift model?', '$\\rho = m/n e^2\\tau$.', 'formula', 2),
    fc(10, 'Wire stretched to twice its length: R?', 'Four times (area halves, length doubles).', 'example', 2),
    fc(11, 'Two examples of non-ohmic devices?', 'Filament lamp; diode (also GaAs devices).', 'example', 2),
    fc(12, 'Resistivity of a metal vs temperature?', 'Rises: $\\rho_T = \\rho_0[1 + \\alpha(T - T_0)]$.', 'formula', 2),
    fc(13, 'Why does a semiconductor’s resistivity fall when heated?', 'The number of charge carriers rises steeply.', 'concept', 2),
    fc(14, 'Why is manganin used for standard resistors?', 'Very small temperature coefficient (and high resistivity).', 'fact', 2),
    fc(15, 'Power in a resistor?', '$P = VI = I^2R = V^2/R$.', 'formula', 3),
    fc(16, 'Series bulbs: which glows brighter?', 'The one with larger resistance (lower power rating), since $P = I^2R$.', 'concept', 3),
    fc(17, '1 kWh in joules?', '$3.6 \\times 10^{6}$ J.', 'fact', 3),
    fc(18, 'Why transmit power at high voltage?', 'Smaller current for the same power, so a smaller $I^2R$ loss in the lines.', 'concept', 3),
    fc(19, 'Define emf.', 'Terminal p.d. of a cell on open circuit; work per unit charge done by the cell.', 'definition', 4),
    fc(20, 'Terminal voltage while discharging and charging?', '$V = E - Ir$; $V = E + Ir$.', 'formula', 4),
    fc(21, 'Short-circuit current of a cell?', '$E/r$.', 'formula', 4),
    fc(22, 'n identical cells in series?', 'emf $nE$, internal resistance $nr$.', 'formula', 4),
    fc(23, 'n identical cells in parallel?', 'emf $E$, internal resistance $r/n$.', 'formula', 4),
    fc(24, 'From a V–I graph of a cell, find E and r?', 'E = intercept on the V-axis; r = −slope.', 'diagram', 4),
    fc(25, 'Kirchhoff’s junction rule and its basis?', 'Sum of currents in = sum out; conservation of charge.', 'definition', 5),
    fc(26, 'Kirchhoff’s loop rule and its basis?', 'Sum of potential changes round a loop = 0; conservation of energy.', 'definition', 5),
    fc(27, 'A Kirchhoff current comes out negative. Meaning?', 'It flows opposite to the assumed direction.', 'concept', 5),
    fc(28, 'Wheatstone balance condition?', '$P/Q = R/S$ (no galvanometer current).', 'formula', 6),
    fc(29, 'Does bridge balance depend on the cell’s emf?', 'No.', 'fact', 6),
    fc(30, 'Metre bridge formula?', '$X = R\\,l/(100 - l)$.', 'formula', 6),
    fc(31, 'Why balance near the middle of a metre bridge?', 'To reduce the effect of end resistance and reading errors.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};

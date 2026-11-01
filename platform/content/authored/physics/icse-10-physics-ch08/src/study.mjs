// ICSE 10 Physics ch08 Current Electricity — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

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
      '1. Charge, current, potential difference and resistance',
      r`- **Current** is the rate of flow of charge: $I = Q/t$; unit **ampere** (1 A = 1 C s⁻¹). Charge of an electron $e = 1.6 \times 10^{-19}$ C; number of electrons $n = Q/e$.
- **Conventional current** flows from + to − in the outside circuit; electrons drift from − to +.
- **Potential difference** between two points = work done per unit charge moved between them: $V = W/Q$; **1 V = 1 J C⁻¹**.
- **Resistance** = opposition to current: $R = V/I$; **1 Ω = 1 V A⁻¹**.
- **Ammeter**: low resistance, joined **in series**. **Voltmeter**: high resistance, joined **in parallel**.`,
      [kt('Electric current', 'The amount of charge flowing through a cross-section of a conductor in one second.'), kt('Potential difference', 'The work done in moving a unit positive charge from one point of a circuit to another.'), kt('Resistance', 'The opposition a conductor offers to the flow of charge through it, measured as V divided by I.')],
      [fm(r`I = \dfrac{Q}{t}`, 'Current'), fm(r`V = \dfrac{W}{Q}`, 'Potential difference'), fm(r`n = \dfrac{Q}{e}`, 'Number of electrons')],
      table(['Quantity', 'SI unit', 'Meter and connection'], [['Current', 'ampere (A)', 'Ammeter, series'], ['p.d.', 'volt (V)', 'Voltmeter, parallel'], ['Resistance', 'ohm (Ω)', 'From V ÷ I']], 'Table of current, potential difference and resistance with units and meters'),
      [1],
    ),
    sec(
      '2. Ohm’s law; ohmic and non-ohmic conductors',
      r`**Ohm’s law:** the current through a conductor is directly proportional to the p.d. across its ends, provided temperature and other physical conditions remain unchanged: $V = IR$.

**Verification:** cell, key, rheostat, ammeter and the resistor in series; voltmeter across the resistor. Vary the current with the rheostat; for each setting record V and I. V ÷ I is constant, and the V–I graph is a straight line through the origin with **slope = R**.

**Ohmic conductors:** metals and alloys at constant temperature. **Non-ohmic:** filament lamp (graph curves as R rises with temperature), junction diode, LED, thermistor, electrolytes.`,
      [kt('Ohmic conductor', 'A conductor whose V–I graph is a straight line through the origin, so that its resistance does not depend on the current.'), kt('Non-ohmic conductor', 'A conductor that does not obey Ohm’s law; its V–I graph is not a straight line through the origin.')],
      [fm(r`V = IR`, 'Ohm’s law'), fm(r`R = \text{slope of the V-I graph}`, 'Resistance from the graph')],
      table(['Conductor', 'Obeys Ohm’s law?'], [['Constantan wire, constant temperature', 'Yes'], ['Filament of a lamp', 'No'], ['Junction diode', 'No']], 'Table of three conductors and whether they obey Ohm’s law'),
      [1],
    ),
    sec(
      '3. Factors affecting resistance; specific resistance',
      r`- $R \propto l$ (longer, more resistance); $R \propto 1/A$ (thicker, less resistance); depends on **material** and **temperature**.
- $R = \rho \dfrac{l}{A}$; **specific resistance (resistivity)** $\rho = \dfrac{RA}{l}$, the resistance of a conductor of unit length and unit area of cross-section; unit **Ω m**.
- $\rho$ depends on the **material and temperature only**, not on length or area.
- Area of a round wire $A = \pi d^{2}/4$: halving the diameter makes R four times.
- Stretching a wire to n times its length (volume constant) makes its area 1/n times, so R becomes $n^{2}$ times.
- Copper and aluminium (low ρ): connecting wires and cables. Nichrome (high ρ, high melting point): heating elements. Manganin, constantan (resistance hardly changes with temperature): standard resistors.`,
      [kt('Specific resistance', 'The resistance of a conductor of the material having unit length and unit area of cross-section; also called resistivity.')],
      [fm(r`R = \rho \dfrac{l}{A}`, 'Resistance of a wire'), fm(r`\rho = \dfrac{RA}{l}`, 'Specific resistance'), fm(r`1\ \text{mm}^{2} = 10^{-6}\ \text{m}^{2}`, 'Area conversion')],
      table(['Change', 'Effect on R', 'Effect on ρ'], [['Length doubled', 'Doubled', 'None'], ['Area doubled', 'Halved', 'None'], ['Metal heated', 'Increases', 'Increases']], 'Table of the effect of changes in a wire on its resistance and specific resistance'),
      [2],
    ),
    sec(
      '4. Temperature, semiconductors and superconductors',
      `- **Metals:** resistance increases with rise in temperature (the ions vibrate more and impede the electrons).
- **Alloys** (manganin, constantan): resistance changes very little with temperature.
- **Semiconductors** (silicon, germanium) and thermistors: resistance **decreases** as temperature rises.
- **Superconductors:** materials whose resistance becomes **zero** below a **critical temperature**; first seen in mercury below about 4.2 K. A current in a superconducting loop produces no heat, so it can flow without loss.`,
      [kt('Superconductor', 'A material whose electrical resistance becomes zero when it is cooled below its critical temperature.'), kt('Critical temperature', 'The temperature below which a material becomes superconducting.')],
      [],
      table(['Material', 'When heated, R'], [['Copper, iron', 'Rises'], ['Manganin', 'Almost unchanged'], ['Germanium', 'Falls']], 'Table of how resistance changes with temperature for three kinds of material'),
      [2],
    ),
    sec(
      '5. E.m.f., internal resistance and terminal voltage',
      r`- **E.m.f. (E):** work done by the cell per unit positive charge in carrying it round the complete circuit, including the cell; equals the terminal p.d. on **open circuit**.
- **Terminal voltage (V):** p.d. across the terminals while the cell supplies current; $V = E - Ir$, so $V < E$.
- **Internal resistance (r):** resistance of the electrolyte (and electrodes) inside the cell. It **increases** with the separation of the electrodes and the concentration of the electrolyte; it **decreases** with a larger electrode area in the electrolyte and a higher temperature.
- $E = I(R + r)$; **lost volts** = $Ir$.`,
      [kt('E.m.f.', 'The energy supplied by a cell to each unit of charge driven round the whole circuit; it is the terminal voltage when no current is drawn.'), kt('Internal resistance', 'The resistance offered by the electrolyte inside a cell to the flow of current through the cell.'), kt('Terminal voltage', 'The potential difference across the terminals of a cell while it is supplying current.')],
      [fm(r`I = \dfrac{E}{R + r}`, 'Current from a cell'), fm(r`V = E - Ir`, 'Terminal voltage')],
      table(['Situation', 'Voltmeter across terminals reads'], [['No current drawn', 'E'], ['Current I drawn', 'E − Ir'], ['Terminals shorted (R = 0)', 'Zero; I = E ÷ r']], 'Table of terminal readings of a cell in three situations'),
      [3],
    ),
    sec(
      '6. Resistors in series and in parallel; networks',
      r`**Series:** same current through each; $V = V_{1} + V_{2} + V_{3}$, so $R_{s} = R_{1} + R_{2} + R_{3}$; $R_{s}$ is greater than the largest resistor; one break stops the whole circuit.

**Parallel:** same p.d. across each; $I = I_{1} + I_{2} + I_{3}$, so $\dfrac{1}{R_{p}} = \dfrac{1}{R_{1}} + \dfrac{1}{R_{2}} + \dfrac{1}{R_{3}}$; $R_{p}$ is less than the smallest; branches work independently. For n equal resistors R: series $nR$, parallel $R/n$.

**Networks:** reduce each parallel group, add series parts and r, find the main current, then work back with V = IR.`,
      [kt('Equivalent resistance', 'The single resistance that would draw the same current from the same source as a combination of resistors.')],
      [fm(r`R_{s} = R_{1} + R_{2} + R_{3}`, 'Series'), fm(r`\dfrac{1}{R_{p}} = \dfrac{1}{R_{1}} + \dfrac{1}{R_{2}} + \dfrac{1}{R_{3}}`, 'Parallel'), fm(r`R_{p} = \dfrac{R_{1}R_{2}}{R_{1} + R_{2}}`, 'Two in parallel')],
      table(['Feature', 'Series', 'Parallel'], [['Same for each', 'Current', 'p.d.'], ['Equivalent R', 'More than the largest', 'Less than the smallest'], ['One part fails', 'All stop', 'Others work']], 'Table comparing series and parallel connections'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Leaving out “at constant temperature” from Ohm’s law.
- Forgetting to convert mm² to m² in R = ρl ÷ A.
- Saying specific resistance changes when a wire is cut or stretched.
- Ignoring the internal resistance when it is given.
- Forgetting to invert 1/Rp.

**How marks are usually awarded**
- Calculations: formula (1), substitution with units (1), answer with unit (1).
- Laws: the statement with its condition.
- Derivations: state what is common to each resistor, write the equations, combine them.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Electric current in terms of charge?', 'I = Q ÷ t, the charge passing per second.', 'formula', 1),
    fc(2, 'One ampere?', 'One coulomb of charge passing a point each second.', 'definition', 1),
    fc(3, 'Charge on one electron?', '1.6 × 10⁻¹⁹ C.', 'fact', 1),
    fc(4, 'Direction of conventional current outside a cell?', 'From the positive terminal to the negative terminal.', 'fact', 1),
    fc(5, 'One volt?', 'One joule of work done per coulomb of charge.', 'definition', 1),
    fc(6, 'Ohm’s law?', 'V ∝ I for a conductor at constant temperature; V = IR.', 'definition', 1),
    fc(7, 'How is an ammeter connected?', 'In series; it has a very low resistance.', 'fact', 1),
    fc(8, 'How is a voltmeter connected?', 'In parallel; it has a very high resistance.', 'fact', 1),
    fc(9, 'Slope of a V–I graph (V on y-axis)?', 'The resistance R.', 'diagram', 1),
    fc(10, 'Shape of the V–I graph of a lamp filament?', 'A curve bending upwards: R rises as it heats.', 'diagram', 1),
    fc(11, 'Two non-ohmic devices?', 'Junction diode and filament lamp (also LED, thermistor).', 'example', 1),
    fc(12, 'Use of a rheostat?', 'To vary the current in a circuit.', 'fact', 1),
    fc(13, 'Resistance and length?', 'Directly proportional: R ∝ l.', 'concept', 2),
    fc(14, 'Resistance and area of cross-section?', 'Inversely proportional: R ∝ 1/A.', 'concept', 2),
    fc(15, 'Formula linking R and ρ?', 'R = ρl ÷ A.', 'formula', 2),
    fc(16, 'SI unit of specific resistance?', 'Ohm metre (Ω m).', 'fact', 2),
    fc(17, 'Does ρ change when a wire is cut in half?', 'No; it depends only on material and temperature.', 'concept', 2),
    fc(18, 'Why nichrome for heating elements?', 'High specific resistance and high melting point; does not oxidise easily.', 'example', 2),
    fc(19, 'Effect of heating on the resistance of a metal?', 'It increases.', 'fact', 2),
    fc(20, 'Effect of heating on a semiconductor’s resistance?', 'It decreases.', 'fact', 2),
    fc(21, 'Superconductor?', 'A material with zero resistance below its critical temperature.', 'definition', 2),
    fc(22, 'E.m.f. of a cell, measured how?', 'Voltmeter across the terminals with no current drawn.', 'concept', 3),
    fc(23, 'Terminal voltage formula?', 'V = E − Ir.', 'formula', 3),
    fc(24, 'Current from a cell with internal resistance r?', 'I = E ÷ (R + r).', 'formula', 3),
    fc(25, 'Two ways to reduce internal resistance?', 'Larger electrodes; electrodes closer together (also a warmer cell).', 'concept', 3),
    fc(26, 'Series: what is the same for every resistor?', 'The current.', 'fact', 4),
    fc(27, 'Parallel: what is the same for every resistor?', 'The potential difference.', 'fact', 4),
    fc(28, 'Two resistors in parallel: quick formula?', 'Product ÷ sum: R₁R₂ ÷ (R₁ + R₂).', 'formula', 4),
    fc(29, 'n equal resistors R in parallel?', 'R ÷ n.', 'formula', 4),
    fc(30, 'Exam tip: networks', 'Reduce parallel groups, add r, find I, then check the branch currents add up.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};

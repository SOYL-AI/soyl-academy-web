// ICSE 9 Chemistry ch12 notes and flashcards.
import { T, unit, PROV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import * as K from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const M = '−';

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Study of Gas Laws — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Behaviour of gases explained by molecular motion',
      `The molecules of a gas are **far apart**, move **at random in straight lines** and collide with each other and with the walls of the container. This explains the properties of gases: they have no fixed shape or volume, fill their container, and can be compressed because there is much empty space between molecules.

**Pressure** is the force exerted by the gas on each unit area of the wall. It is caused by the **countless collisions** of molecules with the wall.

| Change | Observation | Explanation |
|---|---|---|
| Gas heated in a closed rigid vessel | Pressure rises | Molecules move faster: harder and more frequent hits on the wall |
| Gas heated under a free piston | Volume increases | Faster molecules push the piston out until the pressure inside again equals the outside pressure |
| Gas compressed at constant temperature | Pressure rises | The same molecules hit a smaller area of wall more often |
| Gas cooled | Pressure or volume falls | Slower molecules hit less hard and less often |

The average speed of the molecules depends on the temperature, not on the pressure.`,
      [kt('Gas pressure', 'The force that gas molecules exert on each unit area of the container wall by colliding with it.')],
      [],
      V.motion,
      [1],
    ),
    sec(
      "2. Boyle's law",
      `**Statement:** at constant temperature, the volume of a fixed mass of gas is **inversely proportional** to its pressure.

**Derivation of the form:** $V \\propto 1/P$, so $V = k/P$, that is $PV = k$ (a constant). For a gas taken from one state to another at the same temperature, $P_1V_1 = P_2V_2$.

**Explanation by molecules:** when the volume is made smaller, the molecules are packed into a smaller space and hit each unit area of wall more often, so the pressure rises.

**Graphs** (fixed mass, constant temperature):
- P against V: a **curve** (rectangular hyperbola) that never meets the axes.
- P against 1/V: a **straight line through the origin**.
- PV against P: a **horizontal straight line**.

Imagined readings: V = ${K.BOYLE_V.join(', ')} cm³ with P = ${K.BOYLE_P.join(', ')} mm Hg give P × V = ${K.BOYLE_K} each time.`,
      [kt("Boyle's law", 'At constant temperature the volume of a fixed mass of gas is inversely proportional to its pressure.')],
      [fm(r`PV = \text{constant}`, "Boyle's law"), fm(r`P_1V_1 = P_2V_2`, 'Same gas, two states, same temperature')],
      V.boylePV,
      [2],
      [V.boyleP1V, V.apparatus],
    ),
    sec(
      "3. Charles's law and absolute zero",
      `**Statement:** at constant pressure, the volume of a fixed mass of gas is **directly proportional to its absolute temperature (in kelvin)**.

$V \\propto T$, so $V/T = k$ and $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$.

Older books state it in the Celsius form: for each degree Celsius rise (or fall) in temperature, the volume changes by $1/273$ of its volume at 0 °C, that is $V_t = V_0\\left(1 + \\dfrac{t}{273}\\right)$. Both forms give the same results.

**Graphs:**
- V against Celsius temperature: a straight line that does **not** pass through the origin. If it is extended backwards (**extrapolated**), it meets the temperature axis at **${M}273 °C**, where the volume would be **zero**.
- V against kelvin temperature: a straight line **through the origin**.

**Absolute zero** is $0$ K ($${M}273$ °C), the lowest possible temperature. Real gases condense to liquids (and then solids) before reaching it, so the zero-volume point is obtained only by extrapolation. Imagined readings: V = ${K.CH_V.join(', ')} cm³ at ${K.CH_C.map((c) => (c < 0 ? M + Math.abs(c) : c)).join(', ')} °C.`,
      [kt("Charles's law", 'At constant pressure the volume of a fixed mass of gas is directly proportional to its kelvin temperature.'), kt('Absolute zero', 'The lowest possible temperature, 0 K or −273 °C, found by extrapolating the volume-temperature graph.')],
      [fm(r`\dfrac{V}{T} = \text{constant}`, "Charles's law"), fm(r`\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}`, 'Same gas, two states, same pressure (T in kelvin)')],
      V.charlesC,
      [3],
      [V.charlesK],
    ),
    sec(
      '4. Kelvin and Celsius scales; standard temperature and pressure',
      `**Conversion:** $T\\text{ (K)} = t\\text{ (°C)} + 273$ and $t = T - 273$. A kelvin degree and a Celsius degree are the same size.

| Celsius | Kelvin |
|---|---|
| ${M}273 °C | 0 K (absolute zero) |
| 0 °C | 273 K (ice melts) |
| 27 °C | ${K.CONV.roomK} K |
| 100 °C | ${K.toK(100)} K (water boils) |

**STP (standard temperature and pressure):** **273 K** (0 °C) and **760 mm Hg** (1 atmosphere). Gas volumes are compared at STP because they depend on temperature and pressure. (Textbooks that use the value ${M}273.15 °C give 273.15 K; ICSE Class IX uses 273 K.)

**Temperatures must be in kelvin in every gas-law calculation.** Using degrees Celsius gives wrong answers.`,
      [kt('Kelvin scale', 'The absolute temperature scale, with 0 K at absolute zero; K = °C + 273.'), kt('STP', 'Standard temperature and pressure: 273 K and 760 mm Hg.')],
      [fm(r`T = t + 273`, 'Celsius to kelvin')],
      V.scales,
      [4],
    ),
    sec(
      '5. The gas equation and reduction to STP',
      `**Derivation:** take a fixed mass of gas from $(P_1, V_1, T_1)$ to $(P_2, V_2, T_2)$ in two steps.
1. Change the pressure from $P_1$ to $P_2$ at constant $T_1$ (Boyle): the volume becomes $V' = P_1V_1/P_2$.
2. Change the temperature from $T_1$ to $T_2$ at constant $P_2$ (Charles): $V'/T_1 = V_2/T_2$.

Combining: $\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}$, the **combined gas equation**.

**Reduction to STP:** put $P_2 = 760$ mm Hg and $T_2 = 273$ K, so $V_0 = \\dfrac{P_1V_1 \\times 273}{T_1 \\times 760}$.

**Method for every problem:** (1) list the given values for the two states, (2) change °C to K, (3) use the same units for the two pressures and the two volumes, (4) rearrange, substitute, and give the answer with its unit, (5) check that the direction of change is sensible.

Worked results (imagined data): ${K.SA.V1} cm³ at ${K.SA.P1} mm Hg and ${K.SA.T1C} °C becomes ${K.SA_V2} cm³ at ${K.SA.P2} mm Hg and ${K.SA.T2C} °C; ${K.ST1.V1} cm³ at ${K.ST1.P1} mm Hg and ${K.ST1.T1C} °C becomes ${K.ST1_V0} cm³ at STP.`,
      [kt('Combined gas equation', 'The relation P₁V₁/T₁ = P₂V₂/T₂ for a fixed mass of gas, obtained by combining Boyle’s and Charles’s laws.')],
      [fm(r`\dfrac{P_1V_1}{T_1} = \dfrac{P_2V_2}{T_2}`, 'Combined gas equation'), fm(r`V_0 = \dfrac{P_1V_1 \times 273}{T_1 \times 760}`, 'Volume at STP')],
      null,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using degrees Celsius instead of **kelvin** in Charles's law or the gas equation.
- Writing Boyle's law without **constant temperature** and **fixed mass**, or Charles's law without **constant pressure**.
- Saying the P–V graph is a straight line. It is a **curve**; the **P against 1/V** graph is the straight line through the origin.
- Mixing units, such as one pressure in mm Hg and the other in atmospheres.
- Forgetting to say that the zero-volume point at ${M}273 °C comes from **extrapolation**.
- Giving STP as 0 K or 100 °C; it is **273 K and 760 mm Hg**.

**How marks are usually awarded**
- 1 mark: a law, a term, a conversion or a standard value.
- 2 marks: a short calculation with the formula, or an explanation using molecules.
- 3 marks: a numerical with working or three-point answer.
- 10-mark structured question: a data table, a graph or apparatus followed by parts such as conversions, a calculation, a law and an explanation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What causes the pressure of a gas?', 'Collisions of its molecules with the walls of the container.', 'concept', 1),
    fc(2, 'Why can a gas be compressed easily?', 'Its molecules are far apart, so there is a lot of empty space.', 'concept', 1),
    fc(3, 'Why does the pressure of gas in a closed rigid vessel rise on heating?', 'Molecules move faster: harder and more frequent hits on the wall.', 'concept', 1),
    fc(4, 'Why does a heated gas under a free piston expand?', 'Faster molecules push the piston out until the pressure again equals the outside pressure.', 'concept', 1),
    fc(5, 'State Boyle’s law.', 'At constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure.', 'definition', 2),
    fc(6, 'Mathematical form of Boyle’s law?', 'PV = constant, or P₁V₁ = P₂V₂.', 'formula', 2),
    fc(7, 'What stays constant in Boyle’s law?', 'The temperature and the mass of the gas.', 'fact', 2),
    fc(8, 'Shape of the P against V graph?', 'A curve (rectangular hyperbola) that does not meet the axes.', 'fact', 2),
    fc(9, 'Shape of the P against 1/V graph?', 'A straight line through the origin.', 'fact', 2),
    fc(10, 'Explain Boyle’s law by molecules.', 'A smaller volume means more collisions per unit area of wall each second, so the pressure rises.', 'concept', 2),
    fc(11, 'If the volume of a gas is halved at constant temperature, the pressure…', 'doubles.', 'fact', 2),
    fc(12, 'State Charles’s law.', 'At constant pressure, the volume of a fixed mass of gas is directly proportional to its kelvin temperature.', 'definition', 3),
    fc(13, 'Mathematical form of Charles’s law?', 'V/T = constant, or V₁/T₁ = V₂/T₂ (T in kelvin).', 'formula', 3),
    fc(14, 'What stays constant in Charles’s law?', 'The pressure and the mass of the gas.', 'fact', 3),
    fc(15, 'What does the V against Celsius temperature graph show when extended backwards?', 'Zero volume at −273 °C.', 'fact', 3),
    fc(16, 'What is absolute zero?', '0 K, which is −273 °C: the lowest possible temperature.', 'definition', 3),
    fc(17, 'Why is absolute zero found by extrapolation?', 'Real gases liquefy before reaching it, so the line cannot be measured down to it.', 'concept', 3),
    fc(18, 'Shape of the V against T (kelvin) graph?', 'A straight line through the origin.', 'fact', 3),
    fc(19, 'Convert degrees Celsius to kelvin.', 'Add 273: K = °C + 273.', 'formula', 4),
    fc(20, 'Convert kelvin to degrees Celsius.', 'Subtract 273: °C = K − 273.', 'formula', 4),
    fc(21, 'The freezing point of water in kelvin?', '273 K.', 'fact', 4),
    fc(22, 'The boiling point of water in kelvin?', '373 K.', 'fact', 4),
    fc(23, 'What does STP stand for and what are its values?', 'Standard temperature and pressure: 273 K and 760 mm Hg.', 'definition', 4),
    fc(24, 'Why must temperature be in kelvin in gas-law calculations?', 'Volume is proportional to the kelvin temperature, not the Celsius temperature.', 'exam-tip', 4),
    fc(25, 'Write the combined gas equation.', 'P₁V₁/T₁ = P₂V₂/T₂.', 'formula', 5),
    fc(26, 'How is the combined gas equation derived?', 'Apply Boyle’s law at T₁ to reach P₂, then Charles’s law at P₂ to reach T₂.', 'concept', 5),
    fc(27, 'Formula for the volume at STP?', 'V₀ = P₁V₁ × 273 ÷ (T₁ × 760).', 'formula', 5),
    fc(28, '1 atmosphere in mm Hg?', '760 mm Hg.', 'fact', 5),
    fc(29, 'Five steps for a gas-law problem?', 'List the data; convert to kelvin; keep units alike; substitute; check the direction.', 'exam-tip', 5),
    fc(30, 'A gas is heated at constant pressure. Its volume…', 'increases, in proportion to its kelvin temperature.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};

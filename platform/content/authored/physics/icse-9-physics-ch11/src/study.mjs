// ICSE 9 Physics ch11 notes and flashcards.
import { T, unit, PROV, svgV, table, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { SYMBOLS, CIRCUIT, OPEN_CLOSED, OHM_CIRCUIT, METAL, VI_GRAPH } from './svgs.mjs';
import * as K from './calc.mjs';

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
      '1. Free electrons, conductors and insulators; electric charge',
      `A metal is made of fixed positive **ions** with a cloud of **free electrons** moving at random among them. These electrons are not bound to any one atom, so a metal can carry a current.

Materials are grouped by how well they conduct:
- **Good conductors:** metals such as copper, silver and aluminium (many free electrons); graphite and salt solutions also conduct.
- **Bad conductors or insulators:** rubber, glass, dry wood, plastic (almost no free electrons).
- **Semiconductors:** silicon and germanium; they conduct better than insulators but far worse than metals.
- **Superconductors:** materials whose resistance falls to **zero** below a certain low temperature (for example mercury at about 4 K).

**Electric charge** is measured in **coulombs** (C). The electron carries a negative charge of **1.6 × 10⁻¹⁹ C** and the proton an equal positive charge. Charge is **quantised**: the charge on any body is a whole-number multiple of the charge of an electron,

**q = n e**

where n is a whole number. A body with 5 × 10¹² extra electrons has a negative charge of ${K.BODY_Q_UNITS} × 10⁻⁷ C. One coulomb is the charge of about 6.25 × 10¹⁸ electrons.`,
      [kt('Free electron', 'An electron in a metal that is not bound to any one atom and can move through the metal.'), kt('Insulator', 'A material that has almost no free charges and so does not conduct.'), kt('Superconductor', 'A material whose resistance becomes zero below a certain low temperature.'), kt('Quantisation of charge', 'The charge on a body is always a whole-number multiple of the charge of an electron, q = n e.')],
      [fm(r`q = n e`, 'Charge on a body')],
      svgV(METAL, 'Free electrons moving at random among fixed positive ions in a metal, and drifting when a battery is connected'),
      [1],
      [],
    ),
    sec(
      '2. Electric current',
      `**Electric current** is the **rate of flow of charge** past a point in a circuit:

**I = Q ÷ t**

The SI unit is the **ampere** (A): 1 A = 1 C s⁻¹. A current of ${K.COIL_I} A means ${K.COIL_I} C of charge passes every second; ${K.COIL.q} C in ${K.COIL.min} minutes (${K.COIL_T} s) is ${K.COIL_I} A.

In a metal the charge carriers are **electrons**, which flow from the **negative** terminal of the cell towards the **positive** terminal. By an old convention the current is said to flow the opposite way, from the **positive** terminal through the external circuit to the **negative** terminal: this is the **conventional current**. Both are used; in diagrams the arrow on the wire usually shows the conventional current.`,
      [kt('Electric current', 'The rate of flow of electric charge; I = Q / t.'), kt('Ampere', 'The SI unit of current: one coulomb of charge flowing per second.'), kt('Conventional current', 'Current taken to flow from the positive terminal to the negative terminal of the cell outside the cell; opposite to the flow of electrons.')],
      [fm(r`I = \dfrac{Q}{t}`, 'Current')],
      svgV(CIRCUIT, 'A simple circuit showing the conventional current clockwise and the electron flow anticlockwise'),
      [2],
    ),
    sec(
      '3. Potential difference and resistance',
      `The **potential difference** (p.d.) between two points is the **work done in moving a unit positive charge** from one point to the other:

**V = W ÷ q**, so **W = q V**

Its SI unit is the **volt** (V): 1 V = 1 J C⁻¹. A 9 V battery does ${K.MOVE_W} J of work in moving ${K.MOVE.q} C of charge through it. (Only the definition and its use are needed; no derivation.)

**Resistance** is the opposition a conductor offers to the flow of current. It is the ratio of the p.d. across the conductor to the current through it:

**R = V ÷ I**

The SI unit is the **ohm** (Ω): one ohm is the resistance of a conductor in which a current of one ampere flows when the p.d. across it is one volt. A p.d. of ${K.OHM.v} V that sends ${K.OHM.i} A through a coil shows a resistance of ${K.OHM_R} Ω.`,
      [kt('Potential difference', 'The work done in moving a unit positive charge between two points; V = W / q; unit volt.'), kt('Volt', 'The p.d. between two points when one joule of work is done in moving one coulomb of charge between them.'), kt('Resistance', 'The opposition a conductor offers to the flow of current; R = V / I.'), kt('Ohm', 'The SI unit of resistance: one volt per ampere.')],
      [fm(r`V = \dfrac{W}{q}`, 'Potential difference'), fm(r`R = \dfrac{V}{I}`, 'Resistance')],
      null,
      [3],
    ),
    sec(
      '4. Simple circuits and circuit symbols',
      `A **circuit** is a closed path for the current. In a **closed circuit** the key is on and the current flows; in an **open circuit** there is a gap (for example the key is open) and no current flows.

Standard symbols: **cell** (long thin plate positive, short thick plate negative), **battery** (cells joined), **key** or switch, **bulb**, **resistor**, **rheostat** (a resistor whose resistance can be changed to vary the current) and **ammeter**. An **ammeter** measures current and is joined **in series** with the part of the circuit through which the current is to be found. (A galvanometer only detects a current; how these meters work is not required.)`,
      [kt('Closed circuit', 'A complete path in which current can flow.'), kt('Open circuit', 'A circuit with a break in it, so no current flows.'), kt('Rheostat', 'A variable resistor used to change the current in a circuit.'), kt('Ammeter', 'An instrument joined in series to measure the current in a circuit.')],
      [],
      svgV(SYMBOLS, 'Circuit symbols for a cell, battery, key, bulb, resistor, rheostat, ammeter and voltmeter'),
      [4],
      [svgV(OPEN_CLOSED, 'An open circuit with the bulb off and a closed circuit with the bulb on')],
    ),
    sec(
      '5. Sources of direct current',
      `A source of **direct current** (DC) pushes charge round a circuit in **one direction only**. Common sources:
- a **dry cell** (the cell in a torch, a clock or a remote control), used once and then discarded;
- an **accumulator** (a rechargeable cell such as a car battery or an inverter battery), which can be charged again and reused;
- a group of cells joined together is called a **battery**.

This is only a brief introduction; the construction, the working and the equations of cells and accumulators are not part of the Class IX course.`,
      [kt('Direct current', 'Current that flows in one direction only.'), kt('Accumulator', 'A rechargeable cell that can be charged and used again.')],
      [],
      null,
      [5],
    ),
    sec(
      "6. Ohm's law",
      `**Ohm's law:** at constant temperature, the current through a metallic conductor is directly proportional to the potential difference across its ends:

**V ∝ I**, that is **V = I R**

where R is a constant called the resistance of the conductor. A graph of V against I is a **straight line through the origin** and its **slope is R**. In the experiment a battery, a key, a rheostat (to change the current), an ammeter in series and a voltmeter across the conductor are used.

For a coil of ${K.READ.r} Ω the readings give V = ${K.READ_V.join(', ')} V for I = ${K.READ.i.join(', ')} A; the ratio V ÷ I is ${K.READ.r} Ω each time. Rearranged: **I = V ÷ R** and **R = V ÷ I**.`,
      [kt("Ohm's law", 'At constant temperature, the current through a conductor is directly proportional to the p.d. across it.')],
      [fm(r`V = IR`, "Ohm's law")],
      svgV(VI_GRAPH, 'Graph of p.d. against current for a coil: a straight line through the origin'),
      [6],
      [svgV(OHM_CIRCUIT, "The circuit for verifying Ohm's law with a battery, key, rheostat, ammeter, resistor and voltmeter")],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that electrons flow from the positive terminal; electrons go from negative to positive, and the conventional current goes the other way.
- Forgetting to convert minutes to seconds in I = Q ÷ t.
- Writing the charge of an electron as positive, or giving a charge that is not a whole number of electron charges.
- Mixing up the units: coulomb (charge), ampere (current), volt (p.d.), ohm (resistance).
- Joining an ammeter in parallel; it goes in series with the part of the circuit being measured.
- In drawing a cell, reversing the plates: the long thin plate is positive.
- Saying that V = IR holds at any temperature; it holds at constant temperature for a metallic conductor.

**How marks are usually awarded**
- 1 mark: a definition, a unit or a symbol.
- 2 marks: a numerical with formula, substitution and unit, or two short points.
- 3 marks: a two-step calculation (for example current and then the number of electrons), or a short explanation of conduction.
- 10-mark structured question: a circuit diagram or a table of readings: name the components, show the direction of the current, define and calculate I, V and R, read a V–I graph and give a reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What are free electrons?', 'Electrons in a metal that are not bound to any one atom and can move through it.', 'definition', 1),
    fc(2, 'Why do metals conduct electricity?', 'They contain a large number of free electrons.', 'concept', 1),
    fc(3, 'Name two good conductors and two insulators.', 'Good conductors: copper, silver. Insulators: rubber, glass.', 'example', 1),
    fc(4, 'Name two semiconductors.', 'Silicon and germanium.', 'example', 1),
    fc(5, 'What is a superconductor?', 'A material whose resistance is zero below a certain low temperature.', 'definition', 1),
    fc(6, 'SI unit of electric charge?', 'The coulomb (C).', 'fact', 1),
    fc(7, 'Charge of an electron?', 'Negative, 1.6 × 10⁻¹⁹ C.', 'fact', 1),
    fc(8, 'What does quantisation of charge mean?', 'The charge on a body is a whole-number multiple of the electron charge: q = n e.', 'concept', 1),
    fc(9, 'Define electric current.', 'The rate of flow of charge: I = Q ÷ t.', 'definition', 2),
    fc(10, 'SI unit of current?', 'The ampere (A); 1 A = 1 C s⁻¹.', 'fact', 2),
    fc(11, 'Convert 5 minutes to seconds for I = Q ÷ t.', '5 × 60 = 300 s.', 'exam-tip', 2),
    fc(12, 'Direction of conventional current?', 'From the positive terminal to the negative terminal outside the cell.', 'concept', 2),
    fc(13, 'Direction of electron flow?', 'From the negative terminal to the positive terminal outside the cell.', 'concept', 2),
    fc(14, 'Define potential difference.', 'The work done in moving a unit positive charge between two points: V = W ÷ q.', 'definition', 3),
    fc(15, 'SI unit of p.d. and its meaning?', 'The volt: 1 V = 1 J C⁻¹.', 'fact', 3),
    fc(16, 'Work done in moving a charge q through a p.d. V?', 'W = q V.', 'formula', 3),
    fc(17, 'Define resistance.', 'The opposition a conductor offers to the flow of current: R = V ÷ I.', 'definition', 3),
    fc(18, 'Define the ohm.', 'The resistance of a conductor in which a current of 1 A flows when the p.d. across it is 1 V.', 'definition', 3),
    fc(19, 'What is a closed circuit?', 'A complete path in which current flows.', 'definition', 4),
    fc(20, 'What is an open circuit?', 'A circuit with a break (for example an open key): no current flows.', 'definition', 4),
    fc(21, 'Which plate of the cell symbol is positive?', 'The long thin plate.', 'fact', 4),
    fc(22, 'What does a rheostat do?', 'Changes the resistance in a circuit, and so the current.', 'concept', 4),
    fc(23, 'How is an ammeter connected?', 'In series with the part of the circuit whose current is to be measured.', 'concept', 4),
    fc(24, 'Symbol for a bulb?', 'A circle with a cross inside it.', 'fact', 4),
    fc(25, 'What is direct current?', 'Current that flows in one direction only.', 'definition', 5),
    fc(26, 'Name two sources of direct current.', 'A dry cell and an accumulator.', 'example', 5),
    fc(27, 'Which source can be recharged?', 'An accumulator.', 'concept', 5),
    fc(28, "State Ohm's law.", 'At constant temperature, the current through a conductor is proportional to the p.d. across it: V = I R.', 'definition', 6),
    fc(29, "What does the V–I graph of a conductor obeying Ohm's law look like?", 'A straight line through the origin; its slope is the resistance.', 'concept', 6),
    fc(30, 'Rearrangements of V = I R?', 'I = V ÷ R and R = V ÷ I.', 'formula', 6),
  ],
  status: 'draft',
  provenance: PROV,
};

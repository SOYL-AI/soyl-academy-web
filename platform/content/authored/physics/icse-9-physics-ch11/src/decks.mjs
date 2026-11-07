// ICSE 9 Physics ch11 Current Electricity — Part 1 (t01–t03: free electrons, charge, current, p.d. and resistance),
// Part 2 (t04–t06: circuits and symbols, sources of direct current, Ohm's law).
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { SYMBOLS, CIRCUIT, OPEN_CLOSED, OHM_CIRCUIT, METAL, VI_GRAPH } from './svgs.mjs';
import * as K from './calc.mjs';

const fig = {
  metal: svgV(METAL, 'Free electrons moving at random among fixed positive ions in a metal, and drifting when a battery is connected'),
  circuit: svgV(CIRCUIT, 'A simple circuit with the conventional current clockwise and the electron flow anticlockwise'),
  symbols: svgV(SYMBOLS, 'Circuit symbols for a cell, battery, key, bulb, resistor, rheostat, ammeter and voltmeter'),
  oc: svgV(OPEN_CLOSED, 'An open circuit with the bulb off and a closed circuit with the bulb on'),
  ohmc: svgV(OHM_CIRCUIT, "The circuit for verifying Ohm's law"),
  vi: svgV(VI_GRAPH, 'Graph of p.d. against current for a coil: a straight line through the origin'),
};

export const deck1 = deck({
  part: 1,
  title: 'Current Electricity — Part 1: Charge, current, p.d. and resistance',
  goals: [
    'Explain conduction in metals using free electrons and classify materials',
    'Use q = n e and I = Q/t, and show the directions of conventional current and electron flow',
    'Define potential difference and resistance and use W = qV',
  ],
  slides: [
    sl('title', 'Charge, current and resistance', {
      b: 'Part 1: what carries the current in a wire, how charge is counted, and how current, potential difference and resistance are defined.',
      v: flow('LR', [['e', 'Free electrons'], ['q', 'Charge'], ['i', 'Current'], ['v', 'P.d. and resistance']], [['e', 'q'], ['q', 'i'], ['i', 'v']], 'Flow: free electrons, charge, current, potential difference and resistance'),
      n: 'This part starts inside a metal wire. We see what carries the current, how charge is measured, and how the ideas of current, potential difference and resistance are defined and used.',
    }),
    sl('diagram', 'Free electrons in a metal', {
      b: 'A metal is made of fixed positive **ions** with a cloud of **free electrons** moving at random. With no battery there is no net flow. When a battery is joined, the electrons **drift** towards the positive end: this flow is the **current**.',
      v: fig.metal,
      n: 'The electrons in a metal are free to move about among the fixed ions. Without a battery they wander at random and nothing flows overall. With a battery they also drift slowly towards the positive end, and that drift is the current.',
    }),
    sl('concept', 'Conductors, insulators, semiconductors and superconductors', {
      b: 'Metals have many free electrons and are **good conductors**. **Insulators** have almost none. **Semiconductors** lie between the two. A **superconductor** has **zero resistance** below a certain low temperature.',
      v: table(['Kind', 'Free charges', 'Examples'], [['Good conductor', 'very many', 'copper, silver, aluminium'], ['Insulator', 'almost none', 'rubber, glass, dry wood'], ['Semiconductor', 'few', 'silicon, germanium'], ['Superconductor', 'resistance zero when cold', 'mercury near four kelvin']], 'Table of kinds of material with free charges and examples'),
      n: 'Copper and silver conduct very well. Rubber and glass do not conduct at all. Silicon and germanium lie in between. And a superconductor, once cooled below a certain temperature, has no resistance whatever.',
    }),
    sl('check', 'Quick check: classifying materials', {
      b: 'Where does silicon belong?',
      v: table(['Material', 'Class?'], [['Silicon', '?']], 'Table asking for the class of silicon'),
      chk: 'chk-class',
      n: 'Silicon conducts better than rubber but far worse than copper. Which class of material does it belong to?',
    }),
    sl('concept', 'Electric charge and its quantisation', {
      b: r`Charge is measured in **coulombs** (C). An electron has a negative charge of $1.6 \times 10^{-19}$ C. The charge on any body is a whole-number multiple of this: $q = n e$.`,
      v: table(['Number of extra electrons n', 'Charge q = n e'], [['1', '1.6 × 10⁻¹⁹ C'], ['1000', '1.6 × 10⁻¹⁶ C'], ['5 × 10¹²', `${K.BODY_Q_UNITS} × 10⁻⁷ C`]], 'Table of the charge for different numbers of electrons'),
      n: 'Charge cannot take just any value. It comes in whole numbers of electron charges. A body with a whole number n of extra electrons has charge n times the electron charge, and it is negative.',
    }),
    sl('example', 'Worked example 1: counting electrons', {
      b: r`**Problem.** A small spark carries a charge of $3.2 \times 10^{-6}$ C. How many electrons pass? (Charge of an electron $= 1.6 \times 10^{-19}$ C.)

**Step 1.** From $q = n e$: $n = \dfrac{q}{e}$.

**Step 2.** $n = \dfrac{3.2 \times 10^{-6}}{1.6 \times 10^{-19}} = 2 \times 10^{13}$.`,
      v: table(['Quantity', 'Value'], [['Charge q', '3.2 × 10⁻⁶ C'], ['Electron charge e', '1.6 × 10⁻¹⁹ C'], ['Number n', '2 × 10¹³']], 'Table of the charge, the electron charge and the number of electrons'),
      n: 'The total charge is a whole number of electron charges, so divide the charge by the charge of one electron. The answer is a very large number, two times ten to the power thirteen.',
    }),
    sl('concept', 'Electric current', {
      b: '**Current** is the **rate of flow of charge**: **I = Q ÷ t**. The SI unit is the **ampere** (A): one coulomb per second. Convert minutes to seconds before substituting.',
      v: table(['Quantity', 'Symbol', 'SI unit'], [['Charge', 'Q', 'coulomb'], ['Time', 't', 'second'], ['Current', 'I', 'ampere']], 'Table of charge, time and current with their symbols and units'),
      n: 'Current tells us how much charge passes a point each second. One ampere means one coulomb every second. Always change minutes into seconds before dividing the charge by the time.',
    }),
    sl('example', 'Worked example 2: a current from charge and time', {
      b: r`**Problem.** A charge of ${K.COIL.q} C flows through a heater coil in ${K.COIL.min} minutes. Find the current.

**Step 1.** $t = ${K.COIL.min} \times 60 = ${K.COIL_T}$ s.

**Step 2.** $I = \dfrac{Q}{t} = \dfrac{${K.COIL.q}}{${K.COIL_T}} = ${K.COIL_I}$ A.`,
      v: table(['Quantity', 'Value'], [['Charge Q', `${K.COIL.q} C`], ['Time t', `${K.COIL_T} s`], ['Current I', `${K.COIL_I} A`]], 'Table of the charge, time and current for the heater coil'),
      n: 'Three minutes is one hundred and eighty seconds. Five hundred and forty coulombs in one hundred and eighty seconds is three coulombs every second, that is, three amperes.',
    }),
    sl('check', 'Quick check: finding the current', {
      b: 'Divide the charge by the time in seconds.',
      v: table(['Charge', 'Time'], [[`${K.CHK_I.q} C`, `${K.CHK_I.t} s`]], 'Table giving a charge and a time'),
      chk: 'chk-I',
      n: 'A charge of twenty four coulombs passes a point in eight seconds. What is the current?',
    }),
    sl('diagram', 'Two directions of flow', {
      b: 'Electrons flow from the **negative** terminal to the **positive** terminal outside the cell. The **conventional current** is taken the opposite way, from **positive to negative**. Arrows on circuit diagrams usually show the conventional current.',
      v: fig.circuit,
      n: 'The red arrows show the conventional current, leaving the positive plate of the cell. The blue dashed arrows show the electrons, which really move the other way, from the negative plate round to the positive plate.',
    }),
    sl('check', 'Quick check: direction', {
      b: 'Outside the cell, which way do the electrons go?',
      v: table(['Terminal', 'Sign'], [['Long plate of the cell', 'positive'], ['Short plate of the cell', 'negative']], 'Table of the signs of the two plates of a cell'),
      chk: 'chk-dir',
      n: 'In the wires outside a cell, in which direction do the electrons flow?',
    }),
    sl('concept', 'Potential difference', {
      b: r`The **potential difference** between two points is the **work done in moving a unit positive charge** between them: $V = \dfrac{W}{q}$, so $W = qV$. Its unit is the **volt**: one joule per coulomb.`,
      v: table(['Quantity', 'Symbol', 'SI unit'], [['Work', 'W', 'joule'], ['Charge', 'q', 'coulomb'], ['Potential difference', 'V', 'volt']], 'Table of work, charge and potential difference with their symbols and units'),
      n: 'A cell gives energy to every coulomb of charge that passes through it. Potential difference is that energy per coulomb, and its unit, the volt, means one joule for every coulomb.',
    }),
    sl('example', 'Worked example 3: work done by a battery', {
      b: r`**Problem.** A ${K.MOVE.v} V battery moves ${K.MOVE.q} C of charge round a circuit. How much work does it do?

**Step 1.** $W = qV$.

**Step 2.** $W = ${K.MOVE.q} \times ${K.MOVE.v} = ${K.MOVE_W}$ J.`,
      v: table(['Quantity', 'Value'], [['Charge q', `${K.MOVE.q} C`], ['P.d. V', `${K.MOVE.v} V`], ['Work W', `${K.MOVE_W} J`]], 'Table of the charge, the potential difference and the work done'),
      n: 'Each coulomb gains nine joules, so forty coulombs gain forty times nine. The battery does three hundred and sixty joules of work.',
    }),
    sl('check', 'Quick check: work and potential difference', {
      b: 'Use W = qV.',
      v: table(['Charge', 'P.d.'], [[`${K.CHK_W.q} C`, `${K.CHK_W.v} V`]], 'Table giving a charge and a potential difference'),
      chk: 'chk-W',
      n: 'A charge of five coulombs is moved through a potential difference of six volts. How much work is done?',
    }),
    sl('concept', 'Resistance and the ohm', {
      b: '**Resistance** is the opposition a conductor offers to the flow of current: **R = V ÷ I**. The SI unit is the **ohm** (Ω): the resistance in which **one ampere** flows when the p.d. is **one volt**.',
      v: table(['Case', 'V', 'I', 'R = V ÷ I'], [['Coil A', '6 V', '2 A', '3 ohm'], ['Coil B', '6 V', '0.5 A', '12 ohm']], 'Table of two coils with the same potential difference and different resistances'),
      n: 'For the same potential difference a larger resistance lets less current flow. One ohm is the resistance in which a potential difference of one volt drives a current of one ampere.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Metals conduct because they contain free electrons; insulators have almost none.',
        'Charge q = n e; the electron has charge 1.6 × 10⁻¹⁹ C.',
        'I = Q ÷ t (ampere); electrons flow negative to positive, conventional current positive to negative.',
        'V = W ÷ q (volt) and R = V ÷ I (ohm).',
      ],
      v: table(['Quantity', 'Unit', 'Formula'], [['Charge', 'coulomb', 'q = n e'], ['Current', 'ampere', 'I = Q ÷ t'], ['P.d.', 'volt', 'V = W ÷ q'], ['Resistance', 'ohm', 'R = V ÷ I']], 'Summary table of the quantities, units and formulae of Part 1'),
      n: 'To sum up. Free electrons carry the current in a metal. Charge comes in whole numbers of electron charges. Current is charge per second, potential difference is work per coulomb, and resistance is potential difference divided by current.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert minutes to seconds before using I = Q ÷ t.',
        'Electrons go from negative to positive; the conventional current is the opposite.',
        'Write the unit with every answer and match each unit to its quantity.',
        'In a numerical write the formula, the substitution and the answer with its unit.',
      ],
      v: table(['Slip', 'Fix'], [['Current in minutes', 'Change to seconds first'], ['Electrons flow from positive', 'They flow from negative to positive'], ['Positive charge on electron', 'Electron charge is negative']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Change minutes to seconds. Remember which way the electrons go and which way the conventional current goes. And give a formula, a substitution and a unit in every numerical.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: "Current Electricity — Part 2: Circuits, sources and Ohm's law",
  goals: [
    'Draw circuit diagrams with the standard symbols and distinguish open and closed circuits',
    'Name sources of direct current and give a use of each',
    "State Ohm's law and solve problems with V = IR",
  ],
  slides: [
    sl('title', "Circuits and Ohm's law", {
      b: "Part 2: the symbols used to draw circuits, the sources that drive them, and the law that links current, potential difference and resistance.",
      v: flow('LR', [['s', 'Symbols'], ['c', 'Open and closed circuits'], ['d', 'Sources of DC'], ['o', "Ohm's law"]], [['s', 'c'], ['c', 'd'], ['d', 'o']], "Flow: symbols, open and closed circuits, sources of direct current, Ohm's law"),
      n: 'This part draws circuits with standard symbols, separates open from closed circuits, meets the common sources of direct current, and ends with Ohm’s law and its numericals.',
    }),
    sl('diagram', 'Circuit symbols', {
      b: 'Learn the symbols: **cell** (long thin plate positive), **battery**, **key**, **bulb**, **resistor**, **rheostat** and **ammeter**. The voltmeter, which measures p.d., is a circle with a V.',
      v: fig.symbols,
      n: 'Each part of a circuit has its own symbol. In the cell, the long thin plate is the positive one. A rheostat is a resistor with an arrow through it. The ammeter is a circle with the letter A.',
    }),
    sl('diagram', 'Open and closed circuits', {
      b: 'A **closed circuit** is a complete path: the key is on, a current flows and the bulb glows. In an **open circuit** there is a gap, such as an open key: **no current flows** and the bulb stays off.',
      v: fig.oc,
      n: 'On the left the key is open, so the path is broken and nothing flows. On the right the key is closed, the path is complete, current flows and the bulb glows.',
    }),
    sl('check', 'Quick check: why the bulb is off', {
      b: 'Look at the key.',
      v: table(['Part', 'State'], [['Cell', 'connected'], ['Bulb', 'working'], ['Key', 'open']], 'Table of the state of the parts of a circuit with an open key'),
      chk: 'chk-open',
      n: 'A cell, a working bulb and a key are joined in a loop, but the bulb does not glow. The key is open. Why does the bulb stay off?',
    }),
    sl('concept', 'Sources of direct current', {
      b: '**Direct current** flows in **one direction only**. A **dry cell** is used until it is spent. An **accumulator** is **rechargeable**. Several cells joined together form a **battery**. (Their construction and working are not needed.)',
      v: table(['Source', 'Rechargeable?', 'Use'], [['Dry cell', 'no', 'torch, wall clock, remote control'], ['Accumulator', 'yes', 'car, inverter']], 'Table of two sources of direct current, whether they can be recharged and a use of each'),
      n: 'A dry cell powers a torch or a clock and is thrown away when it is spent. An accumulator can be charged again and again, which is why a car or an inverter uses one.',
    }),
    sl('diagram', "Ohm's law", {
      b: "**Ohm's law:** at constant temperature the current through a metallic conductor is directly proportional to the potential difference across it: **V = IR**. The graph of V against I is a **straight line through the origin**; its **slope is R**.",
      v: fig.vi,
      n: 'If the potential difference is doubled the current is doubled, and the graph is a straight line through the origin. The steepness of the line, its slope, is the resistance.',
    }),
    sl('diagram', "The circuit for Ohm's law", {
      b: 'A battery, a key, a **rheostat** (to change the current), an **ammeter in series** and the conductor R. A voltmeter is joined **across R**. For each setting of the rheostat read I and V.',
      v: fig.ohmc,
      n: 'The ammeter is in series so that the whole current passes through it. The voltmeter is joined across the conductor. Moving the rheostat changes the current, and we note the matching potential difference each time.',
    }),
    sl('example', "Worked example 1: using the readings", {
      b: r`**Problem.** For a coil the readings are $I = 0.1$, $0.2$, $0.3$, $0.4$, $0.5$ A and $V = ${K.READ_V.join(', ')}$ V. Show that the coil obeys Ohm's law and find its resistance.

**Step 1.** $\dfrac{V}{I} = \dfrac{${K.READ_V[0]}}{0.1} = \dfrac{${K.READ_V[4]}}{0.5} = ${K.READ.r}$, the same for every pair.

**Step 2.** So $V \propto I$ and $R = ${K.READ.r}$ ohm.`,
      v: table(['I (A)', 'V (V)', 'V ÷ I'], K.READ.i.map((i, k) => [String(i), String(K.READ_V[k]), String(K.READ_RATIOS[k])]), 'Table of the readings of current and potential difference with the ratio for each pair'),
      n: 'Divide each potential difference by its current. The answer is the same every time, twelve ohms, so the potential difference is proportional to the current and the coil obeys Ohm’s law.',
    }),
    sl('example', 'Worked example 2: current in a bulb', {
      b: r`**Problem.** A bulb of resistance ${K.MAINS.r} ohm is joined across a ${K.MAINS.v} V supply. Find the current.

**Step 1.** $I = \dfrac{V}{R}$.

**Step 2.** $I = \dfrac{${K.MAINS.v}}{${K.MAINS.r}} = ${K.MAINS_I}$ A.`,
      v: table(['Quantity', 'Value'], [['P.d. V', `${K.MAINS.v} V`], ['Resistance R', `${K.MAINS.r} ohm`], ['Current I', `${K.MAINS_I} A`]], 'Table of the potential difference, resistance and current for the bulb'),
      n: 'Rearrange the law to find the current: potential difference divided by resistance. Two hundred and thirty divided by four hundred and sixty is one half, so the current is half an ampere.',
    }),
    sl('check', 'Quick check: finding the p.d.', {
      b: 'Multiply the current by the resistance.',
      v: table(['R', 'I'], [[`${K.CHK_OHM.r} ohm`, `${K.CHK_OHM.i} A`]], 'Table giving a resistance and a current'),
      chk: 'chk-ohm',
      n: 'A current of three tenths of an ampere flows through a resistor of twenty ohms. What is the potential difference across it?',
    }),
    sl('example', 'Worked example 3: finding the resistance', {
      b: r`**Problem.** A p.d. of ${K.OHM.v} V sends ${K.OHM.i} A through a coil. Find its resistance.

**Step 1.** $R = \dfrac{V}{I}$.

**Step 2.** $R = \dfrac{${K.OHM.v}}{${K.OHM.i}} = ${K.OHM_R}$ ohm.`,
      v: table(['Quantity', 'Value'], [['P.d. V', `${K.OHM.v} V`], ['Current I', `${K.OHM.i} A`], ['Resistance R', `${K.OHM_R} ohm`]], 'Table of the potential difference, current and resistance of the coil'),
      n: 'Divide the potential difference by the current. Seven point two divided by zero point four is eighteen, so the resistance of the coil is eighteen ohms.',
    }),
    sl('check', 'Quick check: finding the resistance', {
      b: 'Divide the potential difference by the current.',
      v: table(['V', 'I'], [[`${K.CHK_R.v} V`, `${K.CHK_R.i} A`]], 'Table giving a potential difference and a current'),
      chk: 'chk-R',
      n: 'A potential difference of twelve volts drives a current of half an ampere through a coil. What is the resistance of the coil?',
    }),
    sl('check', 'Quick check: the ammeter', {
      b: 'Where does the ammeter go?',
      v: table(['Meter', 'Measures'], [['Ammeter', 'current'], ['Voltmeter', 'p.d.']], 'Table of the two meters and what they measure'),
      chk: 'chk-sym',
      n: 'To measure the current through a bulb, how must the ammeter be joined in the circuit?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A closed circuit is complete and carries current; an open circuit has a gap and carries none.',
        'Dry cells and accumulators are sources of direct current; an accumulator can be recharged.',
        "Ohm's law: at constant temperature V ∝ I, so V = I R; the V–I graph is a straight line through the origin with slope R.",
        'An ammeter is joined in series; a voltmeter is joined across the part measured.',
      ],
      v: table(['To find', 'Use'], [['Current', 'I = V ÷ R'], ['P.d.', 'V = I R'], ['Resistance', 'R = V ÷ I']], 'Summary table of the three forms of Ohm’s law'),
      n: 'To sum up. Closed circuits carry current and open circuits do not. Cells and accumulators give direct current. Ohm’s law lets us find current, potential difference or resistance from the other two.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'In every circuit diagram use the standard symbols and mark the ammeter in series.',
        'Say "at constant temperature" when stating Ohm’s law.',
        'Pick the form of V = I R that has your unknown alone, then substitute with units.',
        'For a V–I graph, use a pair of points far apart to find the slope.',
      ],
      v: table(['Slip', 'Fix'], [['Ammeter in parallel', 'Ammeter goes in series'], ['Cell plates reversed', 'Long thin plate is positive'], ['Leaving out the unit of R', 'Resistance is in ohm']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Use the standard symbols and put the ammeter in series. State Ohm’s law with constant temperature. Choose the form of the equation that isolates the unknown. And finish every answer with its unit.',
    }),
  ],
});

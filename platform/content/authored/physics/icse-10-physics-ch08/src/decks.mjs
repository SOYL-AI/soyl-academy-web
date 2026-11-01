// ICSE 10 Physics ch08 Current Electricity — two decks: Part 1 (t01–t02) charge, current, potential difference,
// resistance, Ohm's law and its verification, ohmic and non-ohmic conductors, factors affecting resistance, specific
// resistance and superconductors; Part 2 (t03–t04) e.m.f., internal resistance and terminal voltage, resistors in series
// and in parallel, and simple networks.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { OHM_VERIFY, WIRE_FACTORS, EMF_CELL, SERIES, PARALLEL, NETWORK } from './svgs.mjs';

const V = {
  ohm: svgV(OHM_VERIFY, 'Circuit for verifying Ohm’s law: battery, key, rheostat and ammeter in series with a resistor, and a voltmeter across the resistor'),
  wire: svgV(WIRE_FACTORS, 'Three wires of one material showing that resistance doubles with twice the length and halves with twice the area'),
  emf: svgV(EMF_CELL, 'A cell with its internal resistance inside a dashed box, driving current through an external resistor, with a voltmeter across its terminals'),
  series: svgV(SERIES, 'Two, four and six ohm resistors in series across a six volt battery, with the same current through each'),
  parallel: svgV(PARALLEL, 'Six, twelve and four ohm resistors in parallel across a six volt battery, with the full voltage across each branch'),
  network: svgV(NETWORK, 'A two ohm resistor in series with a six ohm and three ohm parallel pair, driven by a nine volt battery of internal resistance one ohm'),
  vi: plot(
    {
      x: { min: 0, max: 1, label: 'current I (A)' },
      y: { min: 0, max: 8, label: 'p.d. V (V)' },
      functions: [
        { expr: '6x', label: 'manganin coil (ohmic): straight line', domain: [0, 1] },
        { expr: '2x + 6x^3', label: 'torch-bulb filament (non-ohmic): curves up', domain: [0, 1] },
      ],
      points: [{ at: [0.5, 3], label: 'slope = 3 ÷ 0.5 = 6 Ω' }],
    },
    'Graph of potential difference against current. A manganin coil gives a straight line through the origin with slope six ohms. A torch bulb filament gives a curve that bends upwards, because its resistance rises as it heats up.',
    'For an ohmic conductor the V–I graph is a straight line through the origin; its slope is the resistance.',
  ),
  tv: plot(
    {
      x: { min: 0, max: 6, label: 'current drawn I (A)' },
      y: { min: 0, max: 3.5, label: 'terminal p.d. V (V)' },
      functions: [{ expr: '3 - 0.5x', label: 'V = E − Ir (E = 3 V, r = 0.5 Ω)', domain: [0, 6] }],
      points: [{ at: [0, 3], label: 'no current: V = E = 3 V' }, { at: [1, 2.5], label: 'I = 1 A: V = 2.5 V' }],
    },
    'Graph of terminal voltage against the current drawn from a cell of electromotive force three volts and internal resistance half an ohm. The line starts at three volts when no current flows and falls by half a volt for every ampere drawn.',
    'Terminal p.d. falls as more current is drawn; the intercept is the e.m.f. and the fall per ampere is r.',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Current Electricity — Part 1: Ohm’s law and resistance',
  goals: [
    'Relate charge, current and potential difference, and use Q = It and V = W/Q',
    'State Ohm’s law, describe its verification and find resistance from a V–I graph',
    'Distinguish ohmic and non-ohmic conductors',
    'Use R = ρl/A and explain how temperature and material affect resistance; describe superconductors',
  ],
  slides: [
    sl('title', 'What keeps the charge moving?', {
      b: 'Part 1 — a cell pushes charge round a circuit. How much flows, how hard it is pushed, and what holds it back are measured by **current**, **potential difference** and **resistance**.',
      v: table(['Quantity', 'Symbol', 'SI unit', 'Measured with'], [['Charge', 'Q', 'coulomb (C)', '—'], ['Current', 'I', 'ampere (A)', 'ammeter (in series)'], ['Potential difference', 'V', 'volt (V)', 'voltmeter (in parallel)'], ['Resistance', 'R', 'ohm (Ω)', 'V ÷ I']], 'Table of charge, current, potential difference and resistance with their symbols, units and measuring instruments'),
      n: 'Namaste! When you switch on a study lamp, charge starts moving through its wires at once. In this part we measure how much charge flows each second, how strongly the cell pushes it, and how much the wire resists it. These three ideas, current, potential difference and resistance, are linked by a simple law named after Georg Ohm.',
    }),
    sl('concept', 'Charge and electric current', {
      b: r`Charge is carried in metals by **free electrons** (charge of one electron $e = 1.6 \times 10^{-19}$ C). **Electric current** is the rate of flow of charge: $I = \dfrac{Q}{t}$. **1 ampere** = 1 coulomb passing a point each second. **Conventional current** flows from the **positive** terminal of the cell, through the outside circuit, to the **negative** terminal; electrons drift the opposite way.`,
      v: table(['Charge Q (C)', 'Time t (s)', 'Current I = Q ÷ t (A)'], [['60', '30', '2'], ['15', '60', '0.25'], ['1', '1', '1']], 'Table of charge, time and the resulting current'),
      n: 'Current is the rate at which charge flows past a point. One ampere means one coulomb every second. In a metal wire the charge is carried by free electrons, which drift from the negative terminal towards the positive terminal. By an old convention, though, we draw the current flowing the other way, out of the positive terminal and round to the negative.',
    }),
    sl('concept', 'Potential difference and resistance', {
      b: r`The **potential difference** between two points is the **work done per unit charge** in moving charge between them: $V = \dfrac{W}{Q}$; **1 volt = 1 joule per coulomb**. **Resistance** is the opposition a conductor offers to the flow of current: $R = \dfrac{V}{I}$; **1 ohm** is the resistance of a conductor that carries 1 A when the p.d. across it is 1 V.`,
      v: flow('LR', [['w', 'Cell does work W'], ['v', 'Each coulomb gets V = W ÷ Q joules'], ['i', 'Current I flows'], ['r', 'Resistance R = V ÷ I opposes it']], [['w', 'v'], ['v', 'i'], ['i', 'r']], 'Flow from the work done by the cell to potential difference, current and resistance'),
      n: 'A cell does work on each coulomb of charge it pushes. The work done per coulomb between two points is the potential difference, measured in volts, where one volt is one joule per coulomb. Every conductor holds back the flow a little. This opposition is its resistance, the potential difference divided by the current, measured in ohms.',
    }),
    sl('diagram', 'Ohm’s law and its verification', {
      b: '**Ohm’s law:** the current through a conductor is **directly proportional to the potential difference** across its ends, **provided its temperature and other physical conditions stay the same**: V ∝ I, or **V = IR**. **Verification:** connect the resistor with an **ammeter in series** and a **voltmeter in parallel**; change the current with the **rheostat**; record several pairs of V and I; the ratio V ÷ I stays constant.',
      v: V.ohm,
      n: 'Ohm’s law says the current through a conductor is directly proportional to the potential difference across it, as long as its temperature stays the same. To check it, put an ammeter in series and a voltmeter across the resistor. Turn the rheostat to change the current and note several pairs of readings. The voltage divided by the current comes out the same each time.',
    }),
    sl('diagram', 'The V–I graph: finding R from the slope', {
      b: 'Plot **V on the y-axis** against **I on the x-axis**. For an **ohmic** conductor at constant temperature the points lie on a **straight line through the origin**, and **slope = V ÷ I = R**. For a **filament lamp** the graph **curves upwards**: as the filament heats up, its resistance rises, so V ÷ I grows.',
      v: V.vi,
      n: 'Plot potential difference upwards and current along. A manganin coil gives a straight line through the origin, and the slope of that line is its resistance, here six ohms. A torch bulb filament gives a curve that bends upwards, because the filament gets hotter as the current grows, and a hotter metal has a higher resistance.',
    }),
    sl('example', 'Worked example: using Ohm’s law', {
      b: r`**Problem.** The element of a soldering iron carries 0.5 A when connected to a 24 V transformer. (a) Find its resistance. (b) What current flows if it is connected to 18 V, its temperature staying the same?

**(a)** $R = \dfrac{V}{I} = \dfrac{24}{0.5} = 48$ Ω.

**(b)** $I = \dfrac{V}{R} = \dfrac{18}{48} = 0.375$ A.`,
      v: table(['Quantity', 'Value'], [['p.d. (first)', '24 V'], ['Current (first)', '0.5 A'], ['Resistance', '48 Ω'], ['Current at 18 V', '0.375 A']], 'Table of values in the soldering iron example'),
      n: 'First find the resistance: twenty four volts divided by half an ampere gives forty eight ohms. If the temperature stays the same, the resistance stays the same, so at eighteen volts the current is eighteen divided by forty eight, which is three hundred and seventy five thousandths of an ampere. Always write the unit with each answer.',
    }),
    sl('check', 'Quick check: Ohm’s law', {
      b: 'Find a resistance from a pair of readings.',
      n: 'Quick check. Resistance is the potential difference divided by the current.',
      chk: 'ohm-mcq',
    }),
    sl('concept', 'Ohmic and non-ohmic conductors', {
      b: '**Ohmic conductors** obey Ohm’s law: their V–I graph is a straight line through the origin (metal wires and alloys such as **nichrome, manganin, constantan** at constant temperature). **Non-ohmic conductors** do not: the V–I graph is a **curve**, or the current depends on which way it flows. Examples: a **filament lamp**, a **junction diode**, an **LED**, a **thermistor**, a **dilute acid** in a voltameter.',
      v: table(['Conductor', 'V–I graph', 'Type'], [['Manganin coil at constant temperature', 'Straight line through origin', 'Ohmic'], ['Torch-bulb filament', 'Curves up (R rises as it heats)', 'Non-ohmic'], ['Junction diode', 'Conducts well one way only', 'Non-ohmic'], ['Thermistor', 'R falls as it warms', 'Non-ohmic']], 'Table comparing ohmic and non-ohmic conductors'),
      n: 'A conductor that obeys Ohm’s law is called ohmic. Metal wires and alloys such as nichrome and manganin are ohmic, as long as their temperature does not change. Others are non-ohmic. A glowing lamp filament heats up, so its resistance rises. A diode lets current through easily in one direction only. Their graphs are not straight lines.',
    }),
    sl('diagram', 'Factors affecting resistance', {
      b: r`The resistance of a wire depends on: (1) its **length** — $R \propto l$; (2) its **area of cross-section** — $R \propto \dfrac{1}{A}$ (thick wires have less resistance); (3) the **material**; (4) the **temperature** — for metals, R **increases** as temperature rises. Together: $R = \rho \dfrac{l}{A}$, where $\rho$ is the **specific resistance (resistivity)** of the material.`,
      v: V.wire,
      n: 'A longer wire has more resistance, because the electrons must travel farther, colliding all the way. A thicker wire has less resistance, because it offers more room for the flow. Double the length and the resistance doubles; double the area and it halves. Resistance also depends on the material and, for metals, rises with temperature.',
    }),
    sl('example', 'Worked example: specific resistance', {
      b: r`**Problem.** A coil for a hot-plate is wound from 5 m of nichrome wire of cross-sectional area $0.25 \times 10^{-6}$ m². Specific resistance of nichrome $= 1.1 \times 10^{-6}$ Ω m. Find (a) the resistance of the coil, (b) the length needed for a 33 Ω coil.

**(a)** $R = \dfrac{\rho l}{A} = \dfrac{1.1 \times 10^{-6} \times 5}{0.25 \times 10^{-6}} = 22$ Ω.

**(b)** $l = \dfrac{RA}{\rho} = \dfrac{33 \times 0.25 \times 10^{-6}}{1.1 \times 10^{-6}} = 7.5$ m.`,
      v: table(['Quantity', 'Value'], [['Specific resistance', '1.1 × 10⁻⁶ Ω m'], ['Area', '0.25 mm²'], ['5 m of wire', '22 Ω'], ['Length for 33 Ω', '7.5 m']], 'Table of the values in the nichrome hot-plate example'),
      n: 'Resistance equals specific resistance times length divided by area. Five metres of this nichrome wire gives twenty two ohms. For thirty three ohms, rearrange the formula: length equals resistance times area divided by specific resistance, which gives seven and a half metres. Notice that the powers of ten cancel neatly when you write the area in square metres.',
    }),
    sl('check', 'Quick check: thickness of a wire', {
      b: 'Predict how resistance changes with the diameter of a wire.',
      n: 'Quick check. Area depends on the square of the diameter, and resistance is inversely proportional to area.',
      chk: 'area-mcq',
    }),
    sl('concept', 'Specific resistance, temperature and superconductors', {
      b: r`**Specific resistance** $\rho = \dfrac{RA}{l}$ is the resistance of a wire of **unit length and unit area of cross-section**; SI unit **ohm metre (Ω m)**. It depends only on the **material** and its **temperature**, not on the wire’s size. **Metals:** resistance rises with temperature. **Semiconductors** (germanium, silicon): resistance falls as they warm. **Superconductors:** below a **critical temperature** their resistance becomes **zero** (mercury, below about 4.2 K).`,
      v: table(['Material', 'ρ at 20 °C (Ω m)', 'Typical use'], [['Copper', '1.7 × 10⁻⁸', 'Connecting wires, cables'], ['Aluminium', '2.7 × 10⁻⁸', 'Overhead power lines'], ['Manganin', '4.4 × 10⁻⁷', 'Standard resistors'], ['Nichrome', '1.1 × 10⁻⁶', 'Heating elements']], 'Table of specific resistances of four materials and their uses'),
      n: 'Specific resistance belongs to the material, not to the particular wire. Copper and aluminium have very low values, so they make good connecting wires. Alloys such as nichrome have high values, so they make good heating elements. Heating a metal raises its resistance. Cooling some materials far enough makes their resistance vanish completely. These are superconductors.',
    }),
    sl('check', 'Quick check: superconductors', {
      b: 'Recall what happens to a superconductor below its critical temperature.',
      n: 'Quick check. Below the critical temperature, a superconductor has no resistance at all.',
      chk: 'super-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'I = Q ÷ t (ampere); V = W ÷ Q (volt); R = V ÷ I (ohm).',
        'Ohm’s law: V ∝ I at constant temperature, so V = IR; slope of the V–I graph = R.',
        'Ohmic: metals and alloys at constant temperature; non-ohmic: filament lamp, diode, thermistor.',
        'R = ρl ÷ A: R grows with length, falls with area; ρ depends on material and temperature only.',
        'Superconductors have zero resistance below a critical temperature.',
      ],
      v: table(['Formula', 'Use it to find'], [['I = Q ÷ t', 'Current or charge'], ['V = IR', 'Any one of V, I, R'], ['R = ρl ÷ A', 'Resistance or length of a wire']], 'Summary table of the three formulae of Part 1'),
      n: 'Let us sum up Part 1. Current is charge per second, potential difference is work per coulomb, and resistance is potential difference divided by current. Ohm’s law says that, at a steady temperature, current is proportional to potential difference. A wire’s resistance grows with its length, falls with its thickness, and depends on its material and temperature.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always add “provided the temperature remains the same” when stating Ohm’s law.',
        'Convert mm² to m² (1 mm² = 10⁻⁶ m²) before using R = ρl ÷ A.',
        'When a wire is stretched, its length rises and its area falls: R rises by the square of the stretch factor.',
        'Ammeter in series, voltmeter in parallel — say so in every circuit description.',
      ],
      v: table(['Slip', 'Fix'], [['Slope of V–I graph = 1 ÷ R', 'With V on the y-axis, slope = R'], ['Resistivity changes when the wire is cut', 'Only R changes; ρ stays the same'], ['Area 0.5 mm² used as 0.5', 'Write 0.5 × 10⁻⁶ m²']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. When you state Ohm’s law, always add the condition that the temperature stays the same. Change square millimetres into square metres before using the resistivity formula. Remember that cutting a wire changes its resistance but not its specific resistance. And in every circuit, place the ammeter in series and the voltmeter in parallel.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Current Electricity — Part 2: Cells and combinations of resistors',
  goals: [
    'Distinguish the e.m.f. of a cell from its terminal voltage',
    'Use E = I(R + r) and V = E − Ir',
    'Derive and use the equivalent resistance of resistors in series and in parallel',
    'Find currents and potential differences in a simple series–parallel network',
  ],
  slides: [
    sl('title', 'Inside the cell, and many paths', {
      b: 'Part 2 — a cell is not a perfect source: some of its push is used up inside it. And real circuits join resistors **one after another** or **side by side**.',
      v: table(['Question', 'Idea used'], [['Why does a torch dim as its cells age?', 'Internal resistance rises'], ['Why do fairy lights go dark together?', 'Series connection'], ['Why do room lamps work independently?', 'Parallel connection'], ['How much current does the battery give?', 'Equivalent resistance']], 'Table of everyday questions and the idea each one uses'),
      n: 'In this part we look inside the cell itself and find that some of its push is lost before the charge even leaves it. Then we join resistors in two ways: one after another, in series, and side by side, in parallel. With these ideas you can work out the current and the voltage in any simple circuit.',
    }),
    sl('concept', 'E.m.f. and terminal voltage', {
      b: '**Electromotive force (e.m.f.), E:** the work done by the cell in moving a unit positive charge round the **whole circuit, including the cell**; it equals the p.d. across the terminals **when no current is drawn** (open circuit). **Terminal voltage, V:** the p.d. across the terminals **when the cell supplies current**. Because the cell has **internal resistance r**, part of the e.m.f. (the **lost volts, Ir**) is used inside it, so **V < E** while current flows.',
      v: table(['Feature', 'E.m.f. (E)', 'Terminal voltage (V)'], [['When measured', 'No current drawn', 'Current being drawn'], ['Value', 'Fixed for the cell', 'Less than E; falls as I rises'], ['Depends on', 'Materials of electrodes and electrolyte', 'E, the current and r']], 'Table comparing the electromotive force and the terminal voltage of a cell'),
      n: 'The electromotive force of a cell is the total work it does on each unit of charge sent round the circuit. You read it with a good voltmeter when the cell is not supplying current. Once current flows, some energy is used up inside the cell, so the voltage across its terminals, the terminal voltage, is smaller than the electromotive force.',
    }),
    sl('diagram', 'Internal resistance in a circuit', {
      b: r`The cell behaves like an ideal e.m.f. E in series with a small **internal resistance r**. The current is $I = \dfrac{E}{R + r}$, so $E = I(R + r) = IR + Ir$, that is **e.m.f. = terminal voltage + lost volts**, $V = E - Ir$. Internal resistance **increases** with the distance between the electrodes and the concentration of the electrolyte, and **decreases** with a larger area of electrodes in the electrolyte and a higher temperature.`,
      v: V.emf,
      n: 'Think of a real cell as a perfect source with a small resistor hidden inside it. The current is the electromotive force divided by the total resistance, outside plus inside. The push used inside is the current times the internal resistance, called the lost volts. What remains appears across the terminals. In the figure, three volts gives one ampere, and two and a half volts reach the terminals.',
    }),
    sl('example', 'Worked example: finding internal resistance', {
      b: r`**Problem.** A battery reads 6 V on a high-resistance voltmeter when nothing else is connected. When a 5 Ω lamp is connected across it, the voltmeter reads 5 V. Find (a) the current, (b) the lost volts, (c) the internal resistance.

**(a)** $I = \dfrac{V}{R} = \dfrac{5}{5} = 1$ A.

**(b)** Lost volts $= E - V = 6 - 5 = 1$ V.

**(c)** $r = \dfrac{1}{1} = 1$ Ω.`,
      v: table(['Reading', 'Value', 'Meaning'], [['Voltmeter, no load', '6 V', 'E.m.f.'], ['Voltmeter, lamp on', '5 V', 'Terminal voltage'], ['Difference', '1 V', 'Lost volts Ir'], ['r = lost volts ÷ I', '1 Ω', 'Internal resistance']], 'Table of the readings and results in the internal resistance example'),
      n: 'With nothing connected, the voltmeter reads the electromotive force, six volts. With the lamp on, it reads the terminal voltage, five volts. The current through the five ohm lamp is one ampere. The missing one volt was used inside the battery, so the internal resistance is one volt divided by one ampere, which is one ohm.',
    }),
    sl('check', 'Quick check: e.m.f. and internal resistance', {
      b: 'Find the current from a cell with internal resistance.',
      n: 'Quick check. Divide the electromotive force by the external and internal resistances added together.',
      chk: 'emf-mcq',
    }),
    sl('diagram', 'Terminal voltage falls as more current is drawn', {
      b: r`Since $V = E - Ir$, a graph of terminal voltage against current is a **straight line falling from E**. Its **intercept on the V-axis is the e.m.f.**, and it falls by **r volts for every ampere** drawn. A heavy load (small R, large I) makes the terminal voltage drop most — which is why headlights dim while a car’s starter motor is running.`,
      v: V.tv,
      n: 'The more current you draw, the more volts are lost inside the cell. So the terminal voltage falls in a straight line as the current rises. Where the line meets the voltage axis, no current flows, and the reading is the electromotive force. The steepness of the line tells you the internal resistance.',
    }),
    sl('diagram', 'Resistors in series', {
      b: r`In **series**, resistors are joined **end to end**, so the **same current I** flows through each, and the p.d.s add: $V = V_{1} + V_{2} + V_{3}$. Using $V = IR$: $IR_{s} = IR_{1} + IR_{2} + IR_{3}$, so $R_{s} = R_{1} + R_{2} + R_{3}$. The equivalent resistance is **more than the largest** resistor. If one part breaks, the whole circuit stops.`,
      v: V.series,
      n: 'In a series circuit there is only one path, so the same current passes through every resistor. The battery voltage is shared out, and the biggest share goes to the biggest resistor. Since each share equals the current times that resistance, the equivalent resistance is simply the sum. In the figure, two, four and six ohms make twelve ohms.',
    }),
    sl('diagram', 'Resistors in parallel', {
      b: r`In **parallel**, each resistor is connected **across the same two points**, so the **same p.d. V** is across each, and the currents add: $I = I_{1} + I_{2} + I_{3}$. Using $I = \dfrac{V}{R}$: $\dfrac{1}{R_{p}} = \dfrac{1}{R_{1}} + \dfrac{1}{R_{2}} + \dfrac{1}{R_{3}}$. The equivalent resistance is **less than the smallest** resistor. For two resistors, $R_{p} = \dfrac{R_{1}R_{2}}{R_{1} + R_{2}}$.`,
      v: V.parallel,
      n: 'In a parallel circuit each resistor sits across the same two points, so each gets the full battery voltage. The current splits, and the smallest resistor takes the largest share. The branch currents add up to the total current. Every extra branch gives the charge another path, so the equivalent resistance is always less than the smallest single resistor.',
    }),
    sl('example', 'Worked example: series and parallel', {
      b: r`**Problem.** A 12 Ω and a 4 Ω resistor are connected (a) in series and (b) in parallel across a 6 V supply of negligible internal resistance. Find the equivalent resistance and the current from the supply in each case.

**(a)** $R_{s} = 12 + 4 = 16$ Ω; $I = \dfrac{6}{16} = 0.375$ A.

**(b)** $R_{p} = \dfrac{12 \times 4}{12 + 4} = 3$ Ω; $I = \dfrac{6}{3} = 2$ A.`,
      v: table(['Connection', 'Equivalent R', 'Supply current'], [['Series', '16 Ω', '0.375 A'], ['Parallel', '3 Ω', '2 A']], 'Table comparing the series and parallel results for the twelve ohm and four ohm resistors'),
      n: 'In series, simply add: twelve plus four is sixteen ohms, and six volts drives a small current. In parallel, use product over sum: forty eight divided by sixteen gives three ohms, less than either resistor, so the same supply drives a much bigger current of two amperes. Parallel connection always draws more current from the supply.',
    }),
    sl('check', 'Quick check: series circuit', {
      b: 'Find the current through one resistor in a series chain.',
      n: 'Quick check. In series, add the resistances first, then use Ohm’s law for the whole circuit.',
      chk: 'series-mcq',
    }),
    sl('diagram', 'A simple network', {
      b: '**Method for a series–parallel network:** (1) replace each parallel group by its equivalent; (2) add the series parts, **including the internal resistance**; (3) find the total current from the e.m.f.; (4) work back: p.d. across each part with V = IR, then the current in each parallel branch. In the figure: 6 Ω ∥ 3 Ω = 2 Ω; total 2 + 2 + 1 = 5 Ω; I = 9 ÷ 5 = 1.8 A.',
      v: V.network,
      n: 'To solve a network, first replace each parallel group by a single equivalent resistor. Then add everything in series, including the cell’s own internal resistance. Divide the electromotive force by this total to get the current from the cell. Finally, work backwards, finding the voltage across each part and the current in each branch.',
    }),
    sl('example', 'Worked example: currents in a network', {
      b: r`**Problem.** For the network in the figure (E = 9 V, r = 1 Ω, 2 Ω in series with 6 Ω ∥ 3 Ω), find the p.d. across the parallel pair, the current in each branch, and the terminal voltage.

**Parallel pair:** $\dfrac{6 \times 3}{6 + 3} = 2$ Ω; $I = \dfrac{9}{2 + 2 + 1} = 1.8$ A.

**p.d. across the pair:** $1.8 \times 2 = 3.6$ V.

**Branches:** $\dfrac{3.6}{6} = 0.6$ A and $\dfrac{3.6}{3} = 1.2$ A (sum 1.8 A ✓).

**Terminal voltage:** $9 - 1.8 \times 1 = 7.2$ V.`,
      v: table(['Part', 'Current (A)', 'p.d. (V)'], [['2 Ω resistor', '1.8', '3.6'], ['6 Ω branch', '0.6', '3.6'], ['3 Ω branch', '1.2', '3.6'], ['Internal resistance', '1.8', '1.8']], 'Table of the current and potential difference for each part of the network'),
      n: 'The parallel pair is equivalent to two ohms, so the whole circuit has five ohms and the current is one point eight amperes. The pair then has three point six volts across it. The six ohm branch takes a third of the current and the three ohm branch two thirds. One point eight volts are lost inside, leaving seven point two volts at the terminals.',
    }),
    sl('check', 'Quick check: parallel pair', {
      b: 'Find the equivalent resistance of two resistors in parallel.',
      n: 'Quick check. For two resistors in parallel, divide the product by the sum.',
      chk: 'par-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'E.m.f. E: p.d. across the terminals when no current is drawn; terminal voltage V = E − Ir when current I flows.',
        'E = I(R + r); lost volts = Ir; r depends on electrolyte, electrode area and separation, and temperature.',
        'Series: same current; Rs = R₁ + R₂ + R₃ (more than the largest).',
        'Parallel: same p.d.; 1/Rp = 1/R₁ + 1/R₂ + 1/R₃ (less than the smallest).',
        'Networks: reduce parallel groups, add series parts and r, find I, then work back.',
      ],
      v: table(['Connection', 'Same for each', 'Adds up', 'Equivalent'], [['Series', 'Current', 'p.d.', 'R₁ + R₂ + …'], ['Parallel', 'p.d.', 'Current', '1/Rp = 1/R₁ + 1/R₂ + …']], 'Summary table of series and parallel connections'),
      n: 'Let us sum up Part 2. A cell’s electromotive force is its open circuit voltage; when current flows, the internal resistance takes away some volts, so the terminal voltage is lower. In series, the current is the same and the resistances add. In parallel, the voltage is the same and the reciprocals add. Networks are solved step by step.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Never forget r: the current is E ÷ (R + r), not E ÷ R.',
        'For a parallel group, check that your answer is smaller than the smallest resistor.',
        'In a network, check that the branch currents add up to the main current.',
        'In derivations, state what is common (I in series, V in parallel) before writing the equations.',
      ],
      v: table(['Slip', 'Fix'], [['1/Rp found, but not inverted', 'Take the reciprocal at the end'], ['Terminal voltage taken as E', 'V = E − Ir when current flows'], ['Branch currents found with E', 'Use the p.d. across that branch']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Include the internal resistance whenever it is given. After adding reciprocals for a parallel group, remember to turn the answer upside down. Check that branch currents add up to the total. And in a derivation, begin by saying what is the same for every resistor: the current in series, the voltage in parallel.',
    }),
  ],
});

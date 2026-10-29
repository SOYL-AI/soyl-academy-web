// ch03 Current Electricity — two decks: Part 1 (t01–t03) current, drift, Ohm's law, resistivity and power; Part 2
// (t04–t06) cells, Kirchhoff's rules and the Wheatstone and metre bridges. Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, QE, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers
const ex1 = (() => {
  const n = 8.5e28;
  const A = 1.0e-6;
  const I = 2.0;
  const vd = I / (n * QE * A);
  return { n, A, I, vd, tMetre: 1 / vd / 3600 };
})();
const ex2 = (() => {
  const rho = 1.7e-8;
  const L = 50;
  const A = 1.0e-6;
  const R = (rho * L) / A;
  const R20 = 10.0;
  const alpha = 3.9e-3;
  const R100 = R20 * (1 + alpha * 80);
  return { R, R100 };
})();
const ex3 = (() => {
  const P = 1000;
  const V = 220;
  const R = V ** 2 / P;
  const I = P / V;
  const P200 = 200 ** 2 / R;
  return { R, I, P200 };
})();
const ex4 = (() => {
  const E = 12;
  const rr = 0.5;
  const R = 5.5;
  const I = E / (R + rr);
  return { I, V: E - I * rr, Isc: E / rr };
})();
const ex5 = G.KIRCH_DATA;
const ex6 = { X: (4 * 40) / 60 };
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };

export const V = {
  drift: svgV(G.DRIFT, 'Electrons drifting opposite to the field and current in a conductor of cross-section A'),
  cell: svgV(G.CELL_R, 'Cell with internal resistance connected to an external resistor, with a voltmeter across the cell'),
  cells: svgV(G.CELLS, 'Three cells in series and two cells in parallel with their combination formulas'),
  kirch: svgV(G.KIRCH, 'Two-loop circuit with two cells and three resistors and the solved branch currents', 'Currents solved with Kirchhoff’s rules; arrows drawn in the solved directions.'),
  bridge: svgV(G.BRIDGE, 'Wheatstone bridge with arms P, Q, R, S, a galvanometer between B and D and a cell across A and C'),
  metre: svgV(G.METRE, 'Metre bridge with an unknown resistance in the left gap, a known one in the right gap and a jockey on the wire'),
};
export const viPlot = plot(
  {
    x: { min: 0, max: 10, label: 'V (V)' },
    y: { min: 0, max: 2.2, label: 'I (A)' },
    functions: [
      { expr: 'x/5', label: 'ohmic resistor (R = 5 Ω): straight line through the origin' },
      { expr: '0.6sqrt(x)', label: 'filament lamp: curve bends over as it heats' },
    ],
  },
  'Current against voltage: a straight line through the origin for an ohmic resistor and a curve that bends towards the voltage axis for a filament lamp whose resistance rises as it heats',
  'Ohmic: constant slope 1/R. Non-ohmic: slope changes with V.',
);
export const rhoPlot = plot(
  {
    x: { min: 0, max: 400, label: 'temperature (°C)' },
    y: { min: 0, max: 3.2, label: 'ρ / ρ at 0 °C' },
    functions: [
      { expr: '1 + 0.0039x', label: 'copper (metal): rises nearly linearly' },
      { expr: '1 + 0.0004x', label: 'nichrome (alloy): almost constant' },
      { expr: '3exp(-x/80)', label: 'semiconductor: falls steeply' },
    ],
  },
  'Relative resistivity against temperature: copper rises steadily, nichrome barely changes and a semiconductor falls steeply',
  'Shapes only; the semiconductor curve is scaled to fit.',
);
export const termPlot = plot(
  {
    x: { min: 0, max: 26, label: 'I (A)' },
    y: { min: 0, max: 13, label: 'terminal voltage V (V)' },
    functions: [{ expr: '12 - 0.5x', label: 'V = E − Ir (E = 12 V, r = 0.5 Ω)', domain: [0, 24] }],
    points: [
      { at: [0, 12], label: 'I = 0: V = E' },
      { at: [24, 0], label: 'short circuit: I = E/r' },
      { at: [2, 11], label: 'R = 5.5 Ω' },
    ],
  },
  'Terminal voltage falls linearly with current from 12 volts at zero current to zero at the short-circuit current of 24 amperes; the slope is minus r',
  'Intercept on the V-axis = E; slope = −r.',
);

export const deck1 = deck({
  part: 1,
  title: 'Current Electricity — Part 1: Current, resistance and power',
  goals: [
    'Derive the relation between current and drift velocity and define mobility',
    'Distinguish ohmic and non-ohmic conductors; use resistivity and conductivity',
    'Explain how resistivity depends on temperature',
    'Calculate the power dissipated in resistors',
  ],
  slides: [
    sl('title', 'Current Electricity', {
      b: 'Part 1 — what happens inside a wire when current flows, why materials resist it, and how much power that resistance turns into heat.',
      v: flow('LR', [['i', 'Current I'], ['d', 'Drift velocity'], ['o', 'Ohm’s law'], ['r', 'Resistivity and temperature'], ['p', 'Power']], [['i', 'd'], ['d', 'o'], ['o', 'r'], ['r', 'p']], 'Flow of the part: current, drift velocity, Ohm’s law, resistivity and temperature, power'),
      n: 'Switch on a ceiling fan and the current starts almost at once, yet the electrons in the wire crawl along at less than a millimetre per second. In this part we explain that puzzle with drift velocity, derive Ohm’s law from it, see how the material and temperature decide resistance, and calculate the heating power of resistors, from a geyser element to a phone charger cable.',
    }),
    sl('concept', 'Electric current', {
      b: r`**Current** is the rate of flow of charge through a cross-section:
$$I = \dfrac{\Delta q}{\Delta t}\ \ (\text{steady}),\qquad I = \dfrac{dq}{dt},\qquad 1\ \text{A} = 1\ \text{C s}^{-1}$$
Its direction (conventional current) is the direction in which positive charge would flow; in metals the electrons move the other way.`,
      ul: ['Current is a scalar: it has a sense along the wire but does not add as a vector.', 'Charge carriers: electrons in metals, ions in electrolytes, electrons and holes in semiconductors.'],
      v: table(['Situation', 'Typical current'], [['Lightning stroke', 'tens of thousands of amperes'], ['Room heater', 'about 5 to 10 A'], ['Phone charging', 'about 1 to 3 A'], ['Nerve signal', 'microamperes']], 'Table of typical currents from lightning to nerve signals'),
      n: 'Current measures how much charge passes a cross-section each second; one ampere is one coulomb per second. By convention its direction is the way positive charge would move, so in a metal wire the electrons actually travel opposite to the current arrow. Although we draw arrows for current, it is a scalar: at a junction currents add as plain numbers, which is the basis of Kirchhoff’s first rule.',
    }),
    sl('diagram', 'Drift velocity', {
      b: r`Free electrons move randomly at high speed, but with no field their average velocity is zero. A field $\vec E$ gives each electron an acceleration $-e\vec E/m$ between collisions. The average velocity gained is the **drift velocity**:
$$\vec v_d = -\dfrac{e\vec E}{m}\,\tau$$
where $\tau$ is the average time between collisions (relaxation time).`,
      v: V.drift,
      n: 'Inside a metal the free electrons zip around randomly at very high speeds, colliding with ions. With no field, their velocities average to zero, so there is no current. A field nudges every electron in the direction opposite to the field between collisions. The small average velocity this produces is the drift velocity: e E over m, times the average time between collisions. It is tiny, but there are enormous numbers of electrons.',
    }),
    sl('concept', 'Current and drift velocity', {
      b: r`In time $\Delta t$, all free electrons within a length $v_d\,\Delta t$ cross a section of area $A$. With $n$ free electrons per unit volume:`,
      m: [r`\Delta q = n e A\, v_d\,\Delta t \quad\Rightarrow\quad I = n e A v_d`],
      ul: [
        r`Current density $j = I/A = n e v_d$.`,
        r`**Mobility** $\mu = \dfrac{v_d}{E} = \dfrac{e\tau}{m}$, unit m² V$^{-1}$ s$^{-1}$: drift speed per unit field.`,
      ],
      v: V.drift,
      n: 'Picture a length of wire equal to the distance an electron drifts in a time delta t. Every free electron in that length crosses the end section in that time. Their number is n times A times that length, so the charge is n e A v d delta t. Dividing by time gives I equals n e A v d. Mobility is the drift speed for each volt per metre of field, and equals e tau over m.',
    }),
    sl('example', 'Worked example 1: how slow is the drift?', {
      b: r`A copper wire of cross-section $1.0$ mm² carries $2.0$ A. Copper has $n = 8.5 \times 10^{28}$ free electrons per m³. Find the drift speed.`,
      ul: [
        r`Step 1 — $A = 1.0 \times 10^{-6}$ m².`,
        r`Step 2 — $v_d = \dfrac{I}{n e A} = \dfrac{2.0}{8.5 \times 10^{28} \times 1.6 \times 10^{-19} \times 1.0 \times 10^{-6}} = ${sci(ex1.vd, 2)}$ m s$^{-1}$.`,
        r`Step 3 — at this speed an electron takes about ${dec(ex1.tMetre, 2)} hours to drift one metre.`,
        'Why lights come on at once — the field travels along the wire at nearly the speed of light, so electrons everywhere start drifting together.',
      ],
      v: table(['Quantity', 'Value'], [['n', '$8.5 \\times 10^{28}$ m$^{-3}$'], ['A', '$1.0 \\times 10^{-6}$ m²'], ['$v_d$', `$${sci(ex1.vd, 2)}$ m s$^{-1}$`]], 'Worked table: electron density, area and a drift speed of about 0.15 millimetre per second'),
      n: 'Convert one square millimetre to ten to the minus six square metre, then divide the current by n e A. The drift speed is about one point five times ten to the minus four metre per second, roughly a seventh of a millimetre each second. An electron would need about two hours to drift one metre. Lights still come on instantly because the field is set up along the whole wire almost immediately.',
    }),
    sl('check', 'Quick check: drift and area', {
      b: 'The same current flows through a thick and a thin section of one copper wire.',
      v: null,
      chk: 'drift-mcq',
      n: 'The current and the electron density are the same in both sections. Use I equals n e A v d to compare the drift speeds.',
    }),
    sl('concept', 'Ohm’s law, resistance and resistivity', {
      b: r`From $v_d = e E\tau/m$ and $E = V/l$: $I = n e A v_d = \dfrac{n e^2\tau A}{ml}V$, so $V = IR$ with
$$R = \rho\,\dfrac{l}{A},\qquad \rho = \dfrac{m}{n e^2\tau},\qquad \sigma = \dfrac{1}{\rho}$$`,
      ul: ['$R$ depends on the sample (length, area); $\\rho$ depends only on the material and its temperature.', 'Units: $R$ in ohm (Ω), $\\rho$ in Ω m, conductivity $\\sigma$ in S m$^{-1}$.', 'Vector form: $\\vec j = \\sigma\\vec E$.'],
      v: table(['Material', 'ρ at 20 °C (Ω m, approx.)', 'Class'], [['Copper', '$1.7 \\times 10^{-8}$', 'Conductor'], ['Nichrome', '$1.0 \\times 10^{-6}$', 'Alloy (heaters)'], ['Silicon (pure)', 'about $2 \\times 10^{3}$', 'Semiconductor'], ['Glass', '$10^{10}$ to $10^{14}$', 'Insulator']], 'Table of approximate resistivities: copper, nichrome, pure silicon and glass, from conductors to insulators'),
      n: 'Put the drift velocity into I equals n e A v d and use E equals V over l. The current comes out proportional to the voltage, which is Ohm’s law, with resistance rho l over A. Resistivity, rho, belongs to the material: it is m over n e squared tau. A long thin wire has more resistance than a short thick one of the same metal. Conductivity is just one over resistivity.',
    }),
    sl('example', 'Worked example 2: resistance from resistivity', {
      b: r`(a) Find the resistance of 50 m of copper wire of cross-section 1.0 mm² ($\rho = 1.7 \times 10^{-8}$ Ω m). (b) A copper coil has resistance 10.0 Ω at 20 °C. Find its resistance at 100 °C ($\alpha = 3.9 \times 10^{-3}$ °C$^{-1}$).`,
      ul: [
        r`(a) $R = \dfrac{\rho l}{A} = \dfrac{1.7 \times 10^{-8} \times 50}{1.0 \times 10^{-6}} = ${dec(ex2.R, 2)}$ Ω.`,
        r`(b) $R_T = R_0[1 + \alpha(T - T_0)] = 10.0 \times (1 + 3.9 \times 10^{-3} \times 80) = ${dec(ex2.R100, 3)}$ Ω.`,
        'Check — a 31% rise for an 80 °C rise is typical of metals.',
      ],
      v: V.drift,
      n: 'For part a, use R equals rho l over A, with the area in square metres: fifty metres of household copper wire has less than one ohm. For part b, metals obey R T equals R nought times one plus alpha times the temperature rise, roughly. An eighty degree rise multiplies the resistance by about one point three, so the coil reaches about thirteen point one ohms.',
    }),
    sl('two-column', 'Linear and non-linear V–I characteristics', {
      b: 'Ohm’s law is not a law of nature; many devices do not obey it.',
      cols: [
        '**Ohmic (linear)**\n\n- $I$ proportional to $V$: a straight line through the origin.\n- Same $R$ for every current and for both directions.\n- Example: a metal wire at constant temperature.',
        '**Non-ohmic (non-linear)**\n\n- $V$ not proportional to $I$ (filament lamp, as it heats).\n- Depends on the sign of $V$ (a diode conducts one way).\n- More than one $V$ for the same $I$ (GaAs devices).',
      ],
      v: viPlot,
      n: 'For an ohmic conductor the graph of current against voltage is a straight line through the origin, and reversing the voltage simply reverses the current. Many devices break this rule. A lamp filament heats up, so its resistance rises and the graph bends. A diode lets current through in one direction only. Some materials, such as gallium arsenide, even have regions where the current falls as voltage rises.',
    }),
    sl('diagram', 'Resistivity and temperature', {
      b: r`For metals over a moderate range: $\rho_T = \rho_0[1 + \alpha(T - T_0)]$, with $\alpha > 0$.`,
      ul: ['**Metals:** hotter ions vibrate more, so $\\tau$ falls and $\\rho$ rises.', '**Alloys** (nichrome, manganin, constantan): very small $\\alpha$, used for standard resistors and heater elements.', '**Semiconductors:** $n$ rises sharply with temperature, so $\\rho$ falls ($\\alpha < 0$).'],
      v: rhoPlot,
      n: 'In a metal, heating makes the ions vibrate more strongly, so electrons collide more often; tau falls and resistivity rises almost linearly. Alloys such as manganin hardly change, which makes them ideal for standard resistors. In a semiconductor, heating frees many more charge carriers, so n grows faster than tau falls, and the resistivity drops steeply. The temperature coefficient is then negative.',
    }),
    sl('check', 'Quick check: semiconductor heating', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'semi-ar',
      n: 'Think about what happens to the number of charge carriers and to the time between collisions when a semiconductor is heated.',
    }),
    sl('concept', 'Electrical energy and power', {
      b: r`Charge $q$ falling through potential difference $V$ loses energy $qV$, which appears as heat in a resistor. Power:
$$P = VI = I^2R = \dfrac{V^2}{R},\qquad \text{energy } W = Pt$$`,
      ul: ['Use $I^2R$ when the current is the same (series), $V^2/R$ when the voltage is the same (parallel).', 'Commercial unit: 1 kWh $= 3.6 \\times 10^{6}$ J.', 'Transmission at high voltage cuts the $I^2R$ loss in the cables.'],
      v: table(['Same in the circuit', 'Larger power in', 'Use'], [['Current (series)', 'Larger R', '$P = I^2R$'], ['Voltage (parallel)', 'Smaller R', '$P = V^2/R$']], 'Table: in series the larger resistor dissipates more power; in parallel the smaller one does'),
      n: 'Each coulomb passing through a resistor loses V joules, so the power is V times I. Using Ohm’s law this becomes I squared R or V squared over R. Pick the form that matches what is fixed: in series the current is common, so the larger resistance gets hotter; in parallel the voltage is common, so the smaller resistance gets hotter. This is also why power lines use very high voltages.',
    }),
    sl('example', 'Worked example 3: a heater on a low supply', {
      b: r`A heater is rated 1000 W, 220 V. Find (a) its resistance and rated current, (b) its power if the supply falls to 200 V (resistance unchanged).`,
      ul: [
        r`(a) $R = \dfrac{V^2}{P} = \dfrac{220^2}{1000} = ${dec(ex3.R, 3)}$ Ω; $I = \dfrac{P}{V} = \dfrac{1000}{220} = ${dec(ex3.I, 3)}$ A.`,
        r`(b) $P' = \dfrac{200^2}{48.4} = ${dec(ex3.P200, 3)}$ W.`,
        'Check — a 9% drop in voltage gives about a 17% drop in power, because $P \\propto V^2$.',
      ],
      v: table(['Supply', 'Power'], [['220 V', '1000 W'], ['200 V', `about ${Math.round(ex3.P200)} W`]], 'Worked table: 1000 watts at 220 volts and about 826 watts at 200 volts'),
      n: 'Use the rating to find the resistance: two hundred and twenty squared over one thousand gives forty eight point four ohms, and the rated current is about four and a half amperes. When the supply sags to two hundred volts, the resistance stays the same, so the power is two hundred squared over forty eight point four, about eight hundred and twenty six watts. Power falls faster than voltage because it depends on V squared.',
    }),
    sl('check', 'Quick check: bulbs in series', {
      b: 'Two bulbs, 100 W and 60 W (both rated 220 V), are joined in series across 220 V.',
      v: viPlot,
      chk: 'bulbs-mcq',
      n: 'Find which bulb has the larger resistance from P equals V squared over R. In series the current is the same, so use I squared R.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Current', '$I = dq/dt$; 1 A = 1 C s$^{-1}$'],
          ['Drift', '$v_d = eE\\tau/m$; $I = n e A v_d$'],
          ['Mobility', '$\\mu = v_d/E = e\\tau/m$'],
          ['Resistance', '$R = \\rho l/A$, $\\rho = m/n e^2\\tau$'],
          ['Temperature (metals)', '$\\rho_T = \\rho_0[1 + \\alpha(T - T_0)]$'],
          ['Power', '$P = VI = I^2R = V^2/R$'],
        ],
        'Summary table of current, drift, mobility, resistance, temperature dependence and power',
      ),
      n: 'To sum up: current is charge per second and equals n e A v d. Electrons drift slowly, with a speed set by the field and the time between collisions. Resistance is rho l over A, and resistivity depends on the material and temperature, rising for metals and falling for semiconductors. Some devices are not ohmic. Power in a resistor is V I, I squared R or V squared over R.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Derivation of $I = n e A v_d$: draw the cylinder of length $v_d\\Delta t$, count the electrons, divide by $\\Delta t$.',
        'Stretching a wire to $k$ times its length (same volume): area falls $k$ times, so $R$ rises $k^2$ times.',
        'Do not confuse drift speed (about $10^{-4}$ m s$^{-1}$) with the speed of the signal (close to the speed of light).',
        'Rated power and voltage give $R$; then use the actual voltage.',
      ],
      v: table(['Wire changed', 'Effect on R'], [['Length doubled (same area)', '× 2'], ['Area doubled (same length)', '÷ 2'], ['Stretched to double length (same volume)', '× 4']], 'Table of how resistance changes when a wire is lengthened, thickened or stretched'),
      n: 'Examiners love the drift-velocity derivation: draw the cylinder, count electrons and divide by time. For stretched wires remember the volume stays the same, so doubling the length halves the area and the resistance becomes four times. Keep the drift speed and the signal speed separate in your mind. And for appliances, find the resistance from the rating first, then apply the actual voltage.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Current Electricity — Part 2: Cells, Kirchhoff’s rules and bridges',
  goals: [
    'Relate the terminal voltage of a cell to its emf and internal resistance',
    'Combine cells in series and in parallel',
    'Apply Kirchhoff’s junction and loop rules to multi-loop circuits',
    'Derive the balance condition of a Wheatstone bridge and use a metre bridge',
  ],
  slides: [
    sl('title', 'Cells, Kirchhoff’s rules and bridges', {
      b: 'Part 2 — what a cell really supplies, how to solve any network of cells and resistors, and how a balanced bridge measures resistance precisely.',
      v: flow('LR', [['e', 'EMF and internal resistance'], ['c', 'Cells in series and parallel'], ['k', 'Kirchhoff’s rules'], ['w', 'Wheatstone bridge'], ['m', 'Metre bridge']], [['e', 'c'], ['c', 'k'], ['k', 'w'], ['w', 'm']], 'Flow of the part: emf and internal resistance, combinations of cells, Kirchhoff’s rules, Wheatstone bridge, metre bridge'),
      n: 'Why does a car’s headlight dim when the starter motor runs? Because every real cell has internal resistance. In this part we model a cell by its emf and internal resistance, combine cells, and learn two rules from Kirchhoff that solve any circuit. Finally we use them to find when a Wheatstone bridge is balanced, the principle of the metre bridge you use in the laboratory.',
    }),
    sl('concept', 'EMF and internal resistance', {
      b: r`The **emf** $E$ of a cell is the potential difference between its terminals when **no current** flows (the work done per unit charge by the cell’s chemical action). With current $I$ through internal resistance $r$:`,
      m: [r`V = E - Ir,\qquad I = \dfrac{E}{R + r}`],
      ul: ['Discharging: $V < E$. Charging (current forced in at the + terminal): $V = E + Ir$.', 'Short circuit ($R = 0$): $I_\\text{max} = E/r$.'],
      v: V.cell,
      n: 'A cell drives charge round a circuit using chemical energy. Its emf is the voltage across its terminals when it supplies no current. Real cells have internal resistance, so when a current flows, part of the emf is used up inside the cell, I r, and the terminal voltage falls to E minus I r. While a cell is being charged the current flows the other way and the terminal voltage is E plus I r.',
    }),
    sl('diagram', 'Terminal voltage against current', {
      b: 'Plotting $V$ against $I$ for one cell with different loads gives a straight line: intercept $E$, slope $-r$.',
      v: termPlot,
      n: 'If you connect different loads to the same cell and plot terminal voltage against current, you get a falling straight line. Where the current is zero, the voltage equals the emf. Its slope is minus the internal resistance. Extend it to zero voltage and you find the short-circuit current, E over r. This graph is how internal resistance is measured in the laboratory.',
    }),
    sl('example', 'Worked example 4: a cell under load', {
      b: r`A cell of emf 12 V and internal resistance 0.5 Ω is connected to a 5.5 Ω resistor. Find the current, the terminal voltage, and the current if the terminals are shorted.`,
      ul: [
        r`Step 1 — $I = \dfrac{E}{R + r} = \dfrac{12}{5.5 + 0.5} = ${dec(ex4.I, 2)}$ A.`,
        r`Step 2 — $V = E - Ir = 12 - 2.0 \times 0.5 = ${dec(ex4.V, 3)}$ V (also $IR = 2.0 \times 5.5 = 11$ V).`,
        r`Step 3 — short circuit: $I = E/r = 12/0.5 = ${dec(ex4.Isc, 2)}$ A — large enough to overheat the cell.`,
      ],
      v: termPlot,
      n: 'The total resistance is the external five point five ohms plus the internal half ohm, so the current is two amperes. One volt is lost inside the cell, leaving eleven volts at the terminals, which matches I times R. If the terminals were shorted, only the internal resistance would limit the current, giving twenty four amperes. That is why shorting a battery can make it dangerously hot.',
    }),
    sl('two-column', 'Cells in series and in parallel', {
      b: 'Combining cells (all connected the same way round):',
      cols: [
        r`**Series** (+ of one to − of the next)
$$E_\text{eq} = E_1 + E_2 + \dots,\qquad r_\text{eq} = r_1 + r_2 + \dots$$
A cell connected the wrong way round subtracts its emf.`,
        r`**Parallel** (+ to +, − to −)
$$\dfrac{E_\text{eq}}{r_\text{eq}} = \dfrac{E_1}{r_1} + \dfrac{E_2}{r_2},\qquad \dfrac{1}{r_\text{eq}} = \dfrac{1}{r_1} + \dfrac{1}{r_2}$$
$n$ identical cells: emf $E$, internal resistance $r/n$.`,
      ],
      v: V.cells,
      n: 'In series, emfs add and so do internal resistances; that is how a torch gets three volts from two cells. A cell put in backwards subtracts its emf. In parallel, the combination is found from E over r adding, and one over r adding. For identical cells in parallel the emf stays the same, but the internal resistance is divided by the number of cells, so the combination can deliver a larger current.',
    }),
    sl('check', 'Quick check: identical cells', {
      b: 'Find the internal resistance of a parallel combination.',
      v: V.cells,
      chk: 'parallel-num',
      n: 'For identical cells in parallel, the emf is unchanged and the internal resistance is divided by the number of cells.',
    }),
    sl('concept', 'Kirchhoff’s rules', {
      b: 'Two rules solve any network:',
      ul: [
        r`**Junction rule** (conservation of charge): at any junction, the sum of currents entering equals the sum leaving, $\sum I = 0$.`,
        r`**Loop rule** (conservation of energy): round any closed loop, the algebraic sum of potential changes is zero, $\sum \Delta V = 0$.`,
        'Signs: going through a resistor **along** the assumed current, potential drops by IR; going through a cell from − to +, potential rises by E.',
        'If a current comes out negative, it simply flows opposite to the arrow you assumed.',
      ],
      v: V.kirch,
      n: 'Kirchhoff’s first rule says charge cannot pile up at a junction, so the currents flowing in equal the currents flowing out. The second rule says that if you walk round any closed loop and add up every rise and fall of potential, you return to where you started, so the total is zero. Choose current directions, apply the sign rules carefully, and a negative answer just means the true current flows the other way.',
    }),
    sl('example', 'Worked example 5: a two-loop circuit', {
      b: r`In the circuit, $E_1 = 12$ V with $R_1 = 2$ Ω, $E_2 = 6$ V with $R_2 = 2$ Ω, and $R_3 = 4$ Ω joins A and B. Find all three currents.`,
      ul: [
        r`Step 1 — junction A: $I_1 + I_2 = I_3$ (all assumed flowing up the cell branches into A).`,
        r`Step 2 — left loop: $12 - 2I_1 - 4I_3 = 0$; right loop: $6 - 2I_2 - 4I_3 = 0$.`,
        r`Step 3 — solving: $I_1 = ${dec(ex5.I1, 2)}$ A, $I_2 = ${dec(ex5.I2, 2)}$ A, $I_3 = ${dec(ex5.I3, 2)}$ A.`,
        r`Meaning — $I_2$ is negative: 0.6 A flows **down** through the 6 V cell, charging it.`,
      ],
      v: V.kirch,
      n: 'Assume both cell currents flow up into junction A and out through the four ohm resistor. The junction rule links the three currents. Walk round the left loop: twelve volts up, then drops of two I one and four I three. Do the same on the right. Solving gives two point four amperes, minus zero point six amperes and one point eight amperes. The minus sign tells you the six volt cell is actually being charged.',
    }),
    sl('check', 'Quick check: junction rule', {
      b: 'Apply the junction rule.',
      v: V.kirch,
      chk: 'junction-num',
      n: 'Currents in equal currents out. Add the currents arriving at the junction and subtract those already leaving.',
    }),
    sl('diagram', 'The Wheatstone bridge', {
      b: r`Four resistors P, Q, R, S form a loop; a cell is across A–C and a galvanometer across B–D. The bridge is **balanced** when the galvanometer current is zero, which happens when
$$\dfrac{P}{Q} = \dfrac{R}{S}$$`,
      v: V.bridge,
      n: 'The Wheatstone bridge is four resistors arranged in a diamond, with a cell across one diagonal and a galvanometer across the other. Adjust one resistor until the galvanometer shows no deflection. Then points B and D are at the same potential, and the ratio P over Q equals R over S. Knowing three resistances gives the fourth, independently of the cell’s emf.',
    }),
    sl('concept', 'Deriving the balance condition', {
      b: 'With zero current in the galvanometer ($I_g = 0$), apply Kirchhoff’s rules:',
      ul: [
        r`Junctions B and D: the current $I_1$ in P also flows through Q; the current $I_2$ in R also flows through S.`,
        r`Loop A–B–D–A: $-I_1P + I_2R = 0$ (no drop across G), so $I_1P = I_2R$.`,
        r`Loop B–C–D–B: $-I_1Q + I_2S = 0$, so $I_1Q = I_2S$.`,
        r`Divide: $\dfrac{P}{Q} = \dfrac{R}{S}$.`,
      ],
      v: V.bridge,
      n: 'Start from the balance condition: no current through the galvanometer. Then the same current flows through P and Q, and another single current flows through R and S. In the loop through A, B and D, the drop across P equals the drop across R. In the loop through B, C and D, the drop across Q equals the drop across S. Divide one equation by the other and the currents cancel, leaving P over Q equals R over S.',
    }),
    sl('example', 'Worked example 6: the metre bridge', {
      b: r`In a metre bridge, an unknown resistance X is in the left gap and a 4.0 Ω resistor in the right gap. The balance point is 40.0 cm from the left end. Find X.`,
      ul: [
        r`Step 1 — the wire segments act as R and S, proportional to their lengths: $\dfrac{X}{R} = \dfrac{l}{100 - l}$.`,
        r`Step 2 — $X = 4.0 \times \dfrac{40}{60} = ${dec(ex6.X, 3)}$ Ω.`,
        'Check — X is smaller than 4 Ω, consistent with balance on the shorter side.',
        'Good practice — choose R so that balance is near the middle of the wire, to reduce end errors.',
      ],
      v: V.metre,
      n: 'A metre bridge is a Wheatstone bridge in which two of the arms are parts of a uniform one metre wire. Their resistances are proportional to their lengths, so X over R equals l over one hundred minus l. With balance at forty centimetres, X is four times forty over sixty, about two point six seven ohms. Balance near the middle of the wire gives the most accurate result.',
    }),
    sl('check', 'Quick check: swapping the resistors', {
      b: 'The unknown and the known resistors in a metre bridge are interchanged.',
      v: V.metre,
      chk: 'swap-mcq',
      n: 'Write the balance condition before and after the swap. The resistances do not change, only their positions.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Terminal voltage', '$V = E - Ir$ (discharging), $E + Ir$ (charging)'],
          ['Current', '$I = E/(R + r)$'],
          ['Cells in series', '$E = \\sum E_i$, $r = \\sum r_i$'],
          ['Cells in parallel', '$E/r = \\sum E_i/r_i$, $1/r = \\sum 1/r_i$'],
          ['Kirchhoff', '$\\sum I = 0$ at a junction; $\\sum \\Delta V = 0$ round a loop'],
          ['Bridges', '$P/Q = R/S$; metre bridge $X/R = l/(100 - l)$'],
        ],
        'Summary table of terminal voltage, current, cell combinations, Kirchhoff’s rules and bridge balance conditions',
      ),
      n: 'To sum up: a cell has an emf and an internal resistance, so its terminal voltage drops as it supplies more current. Cells in series add their emfs and resistances; identical cells in parallel keep the emf but share the internal resistance. Kirchhoff’s junction and loop rules come from conservation of charge and energy, and they give the Wheatstone balance condition, P over Q equals R over S, used in the metre bridge.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Mark assumed current directions on the circuit before writing any equation; keep them fixed.',
        'Loop signs: resistor along current −IR; cell from − to + is +E.',
        'A negative answer is not wrong: the current flows the other way.',
        'Bridge balance does not depend on the cell’s emf or on the galvanometer’s resistance.',
      ],
      v: table(['Moving through', 'Potential change'], [['Resistor, along I', '−IR'], ['Resistor, against I', '+IR'], ['Cell, − to +', '+E'], ['Cell, + to −', '−E']], 'Table of sign rules for the loop rule: resistors along and against the current and cells in each direction'),
      n: 'In circuit questions, draw and label your current directions first and stick to them. Use the sign table for every element you pass through. If an answer comes out negative, keep it: it just tells you the direction. Remember that at balance a Wheatstone bridge does not care about the emf or the galvanometer, which is why the method is accurate.',
    }),
  ],
});

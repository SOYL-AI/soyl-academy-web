// ISC 12 Physics ch06 Cells, Kirchhoff's Laws, Bridges and Potentiometer — two decks: Part 1 (t01–t03) emf, internal
// resistance, grouping of cells and Kirchhoff's laws; Part 2 (t04–t06) the Wheatstone and metre bridges and the
// potentiometer with its applications. Numbers computed here or in svgs.mjs.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers
const ex1 = G.LOAD_DATA;
const ex2 = G.GROUP_DATA;
ex2.series = (ex2.N * ex2.E) / (ex2.R + ex2.N * ex2.r);
ex2.parallel = ex2.E / (ex2.R + ex2.r / ex2.N);
const ex3 = G.UNEQ_DATA;
const ex4 = G.KIRCH_DATA;
const ex5 = G.METRE_DATA;
ex5.lswap = (100 * ex5.R) / (ex5.R + ex5.X);
const ex6 = G.POT_DATA;
ex6.lD = ex6.daniell / ex6.k;
const ex7 = { E1: ex6.daniell, l1: ex6.lD, l2: ex6.unknownL };
ex7.E2 = (ex7.E1 * ex7.l2) / ex7.l1;
const ex8 = { l1: ex6.cellL1, l2: ex6.cellL2, R: ex6.shunt };
ex8.r = (ex8.R * (ex8.l1 - ex8.l2)) / ex8.l2;
ex8.E = ex8.l1 * ex6.k;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8 };

export const V = {
  load: svgV(G.CELL_LOAD, 'Cell with internal resistance driving current through an external resistor'),
  groups: svgV(G.GROUPS, 'Mixed grouping of identical cells: m rows of n cells'),
  uneq: svgV(G.UNEQUAL, 'Two cells of unequal emf in parallel feeding a load', 'Currents as solved in worked example 3.'),
  kirch: svgV(G.KIRCH, 'Two-loop circuit solved with Kirchhoff’s laws', 'Currents as solved in worked example 4.'),
  bridge: svgV(G.BRIDGE, 'Wheatstone bridge'),
  metre: svgV(G.METRE, 'Metre bridge with the jockey at the balance point', 'Worked example 5: balance at 55.0 cm.'),
  pot: svgV(G.POT, 'Potentiometer: driver circuit and a cell balanced against the wire', 'Worked example 6: k = 0.40 V m⁻¹, balance at 2.7 m.'),
  potCmp: svgV(G.POT_COMPARE, 'Potentiometer with a two-way key for comparing two emfs'),
  potInt: svgV(G.POT_INTERNAL, 'Potentiometer with a shunt resistance across the cell for finding its internal resistance'),
};
export const termPlot = plot(
  {
    x: { min: 0, max: 5.5, label: 'current drawn I (A)' },
    y: { min: 0, max: 2.4, label: 'terminal p.d. V (V)' },
    functions: [{ expr: '2 - 0.4x', label: 'V = E − Ir (E = 2.0 V, r = 0.40 Ω)', domain: [0, 5] }],
    points: [
      { at: [0, 2], label: 'open circuit: V = E' },
      { at: [1, 1.6], label: 'R = 1.6 Ω: I = 1.0 A' },
      { at: [5, 0], label: 'short circuit: I = E/r' },
    ],
  },
  'Terminal potential difference of a cell of emf 2 volts and internal resistance 0.4 ohm against the current it supplies: a straight line falling from 2 volts at zero current to zero at the short-circuit current of 5 amperes',
  'Intercept on the V-axis = E; slope = −r.',
);
const gI = (m) => (18 * m) / (1.8 * m * m + 7.2);
export const groupPlot = plot(
  {
    x: { min: 0, max: 12.5, label: 'number of parallel rows m (12 cells in all)' },
    y: { min: 0, max: 3, label: 'current in R = 1.8 Ω (A)' },
    functions: [{ expr: '18x/(1.8x^2 + 7.2)', label: 'I = nE/(R + nr/m), n = 12/m', domain: [1, 12] }],
    points: ex2.rows.map(({ m, n }) => ({ at: [m, Number(gI(m).toFixed(4))], label: m === 2 ? 'maximum: 2 rows of 6' : `${m} × ${n}` })),
  },
  'Current through a 1.8 ohm load from twelve cells of 1.5 volts and 0.6 ohm each, against the number of parallel rows: 2.0 amperes with all in series, a maximum of 2.5 amperes with two rows of six, and only about 0.81 ampere with all twelve in parallel',
  'Best arrangement: R = nr/m (here 1.8 Ω = 6 × 0.6/2).',
);
export const potPlot = plot(
  {
    x: { min: 0, max: 4, label: 'length l from A (m)' },
    y: { min: 0, max: 1.8, label: 'potential drop from A (V)' },
    functions: [{ expr: '0.4x', label: 'V = kl (k = 0.40 V m⁻¹)', domain: [0, 4] }],
    points: [
      { at: [2.7, 1.08], label: '1.08 V cell: l = 2.7 m' },
      { at: [3.6, 1.44], label: '1.44 V cell: l = 3.6 m' },
    ],
  },
  'Potential drop along a uniform potentiometer wire against the length from end A: a straight line of slope 0.4 volt per metre, so a 1.08 volt cell balances at 2.7 metres and a 1.44 volt cell at 3.6 metres',
  'Uniform wire, steady current: V ∝ l.',
);
const groupTable = table(
  ['Grouping (identical cells E, r)', 'Equivalent cell', 'Current in R'],
  [
    ['n in series', 'emf nE, resistance nr', '$I = \\dfrac{nE}{R + nr}$'],
    ['m in parallel', 'emf E, resistance r/m', '$I = \\dfrac{E}{R + r/m}$'],
    ['m rows of n (mixed)', 'emf nE, resistance nr/m', '$I = \\dfrac{nE}{R + nr/m}$'],
  ],
  'Table of the equivalent emf, internal resistance and current for identical cells in series, in parallel and in mixed grouping',
);
const potVsVolt = table(
  ['Potentiometer', 'Voltmeter'],
  [
    ['Draws no current at balance', 'Always draws some current'],
    ['Measures the emf itself', 'Reads the terminal p.d. (less than E)'],
    ['Acts as an ideal (infinite-resistance) voltmeter', 'Finite resistance'],
    ['Sensitivity raised by a smaller gradient k', 'Fixed by its scale'],
    ['Slower; needs a steady driver', 'Quick, direct reading'],
  ],
  'Table comparing a potentiometer and a voltmeter for measuring the emf of a cell',
);

export const deck1 = deck({
  part: 1,
  title: 'Cells, Kirchhoff’s Laws, Bridges and Potentiometer — Part 1: Cells and Kirchhoff’s laws',
  goals: [
    'Distinguish the emf of a cell from its terminal potential difference and derive E = I(R + r)',
    'Find the current from series, parallel and mixed groupings of cells, and from two unequal cells in parallel',
    'Apply Kirchhoff’s junction and loop laws to circuits with more than one loop',
  ],
  slides: [
    sl('title', 'Cells, Kirchhoff’s Laws, Bridges and Potentiometer', {
      b: 'Part 1 — what a cell really supplies, how cells are best grouped, and two laws that solve any network.',
      v: V.load,
      n: 'Switch on a torch with weak cells and the bulb glows dimly, even though each cell is still rated one and a half volts. The cell itself has resistance, and some of its energy is used up inside it. In this part we separate the emf of a cell from the voltage at its terminals, learn how to group cells for the most current, and meet Kirchhoff’s two laws for networks.',
    }),
    sl('concept', 'Electromotive force (emf)', {
      b: r`A cell uses chemical energy to move charge from its negative to its positive terminal, against the electric field inside it. The **emf** E is the work done by the cell per unit charge taken once round the complete circuit:
$$E = \dfrac{W}{q}\qquad(\text{unit: J C}^{-1} = \text{V})$$`,
      ul: ['Emf is not a force: it is energy supplied per coulomb.', 'On open circuit (no current) the terminal p.d. equals E.'],
      v: V.load,
      n: 'Inside a cell, chemical reactions push positive charge towards the positive terminal, against the field. The energy the cell gives to each coulomb that goes once round the circuit is its electromotive force, or emf, measured in joules per coulomb, that is volts. Despite the old name, emf is not a force. When no current is drawn, a voltmeter across the cell reads exactly its emf.',
    }),
    sl('diagram', 'Internal resistance and terminal potential difference', {
      b: r`The electrolyte and electrodes have an **internal resistance** r. With an external resistor R, energy conservation per coulomb gives
$$E = IR + Ir = I(R + r),\qquad V = IR = E - Ir$$`,
      ul: ['**Ir** is the “lost volts”: energy per coulomb turned to heat inside the cell.', 'While the cell is being **charged** (current forced in at the + terminal): $V = E + Ir$.'],
      v: V.load,
      n: 'Each coulomb that goes round gains E joules in the cell and gives up I R joules in the external resistor and I r joules inside the cell. So E equals I times R plus r. The terminal potential difference, the voltage across the external resistor, is E minus I r: the more current drawn, the lower it falls. When a charger forces current backwards through a cell, the terminal voltage is E plus I r instead.',
    }),
    sl('example', 'Worked example 1: a battery under load', {
      b: r`A battery of emf 4.5 V and internal resistance 0.30 Ω is connected to a 2.7 Ω resistor. Find the current, the terminal p.d. and the lost volts.`,
      ul: [
        r`Step 1 — $I = \dfrac{E}{R + r} = \dfrac{4.5}{2.7 + 0.30} = ${dec(ex1.I, 2)}$ A.`,
        r`Step 2 — $V = E - Ir = 4.5 - ${dec(ex1.I, 2)} \times 0.30 = ${dec(ex1.V, 3)}$ V (check: $IR = ${dec(ex1.I, 2)} \times 2.7 = ${dec(ex1.I * ex1.R, 3)}$ V).`,
        r`Step 3 — lost volts $Ir = ${dec(ex1.lost, 2)}$ V, heating the battery.`,
      ],
      v: table(['Quantity', 'Value'], [['Current I', '1.5 A'], ['Terminal p.d. V', '4.05 V'], ['Lost volts Ir', '0.45 V']], 'Worked table: current 1.5 amperes, terminal voltage 4.05 volts, lost volts 0.45 volt'),
      n: 'The total resistance in the loop is three ohms, so four and a half volts drives one and a half amperes. Inside the battery, one and a half amperes through point three ohm uses up nearly half a volt, so the terminals show only about four point zero five volts. Checking, one and a half amperes through two point seven ohms gives the same answer.',
    }),
    sl('diagram', 'Terminal p.d. against current', {
      b: r`Plotting V against I for one cell gives a straight line $V = E - Ir$:`,
      ul: ['Intercept on the V-axis (I = 0): the emf E.', 'Slope: −r. Intercept on the I-axis: the short-circuit current E/r.', 'Measuring V at two currents gives both E and r.'],
      v: termPlot,
      n: 'If we vary the external resistance and plot the terminal voltage against the current, we get a straight line falling with slope minus r. Where it meets the voltage axis, at zero current, it gives the emf. Where it meets the current axis, at zero terminal voltage, is the short-circuit current, E over r. Two readings of voltage and current are enough to find both E and r.',
    }),
    sl('check', 'Quick check: short-circuit current', {
      b: 'Choose the correct option.',
      v: termPlot,
      chk: 'shortcircuit-mcq',
      n: 'With a thick copper wire across the cell, only the internal resistance limits the current.',
    }),
    sl('diagram', 'Grouping identical cells', {
      b: 'Cells are grouped to give more voltage, more current or a longer life:',
      v: groupTable,
      ul: ['**Series** helps when R is large compared with r.', '**Parallel** helps when R is small compared with r, and shares the load so the cells last longer.'],
      n: 'Join n identical cells in series and the emfs add, but so do the internal resistances. Join m in parallel and the emf stays the same while the internal resistance falls to r over m. Series wins when the external resistance is large; parallel wins when it is small, and each cell then supplies only a share of the current, so the battery lasts longer.',
    }),
    sl('concept', 'Mixed grouping: the best arrangement', {
      b: r`N = mn cells as **m rows** in parallel, each of **n cells** in series:
$$I = \dfrac{nE}{R + \dfrac{nr}{m}}$$`,
      ul: [r`For fixed N, I is **largest when** $R = \dfrac{nr}{m}$: the external resistance equals the internal resistance of the combination.`],
      v: V.groups,
      n: 'In a mixed grouping, each row has n cells in series, giving emf n E and resistance n r, and m such rows in parallel reduce the resistance to n r over m. The current is n E over R plus n r over m. Keeping the total number of cells fixed, this current is greatest when the external resistance equals the internal resistance of the battery, n r over m.',
    }),
    sl('example', 'Worked example 2: twelve cells, one load', {
      b: r`Twelve cells, each of emf 1.5 V and internal resistance 0.60 Ω, drive current through a 1.8 Ω resistor. Find the best grouping and the current. Compare all in series and all in parallel.`,
      ul: [
        r`Best: $R = \dfrac{nr}{m}$ with $mn = 12$: $1.8 = \dfrac{0.6n}{m}$ gives $n = 3m$, so $3m^2 = 12$: **m = 2 rows of n = 6**.`,
        r`$I = \dfrac{6 \times 1.5}{1.8 + 6 \times 0.6/2} = \dfrac{9.0}{3.6} = ${dec(ex2.best.I, 2)}$ A.`,
        r`All in series: $\dfrac{18}{1.8 + 7.2} = ${dec(ex2.series, 2)}$ A; all in parallel: $\dfrac{1.5}{1.8 + 0.05} \approx ${dec(ex2.parallel, 2)}$ A.`,
      ],
      v: groupPlot,
      n: 'Setting the load equal to the battery’s internal resistance, and keeping twelve cells in all, gives two rows of six. Each row has nine volts and three point six ohms; two rows in parallel have one point eight ohms. Nine volts across three point six ohms in total gives two and a half amperes, more than the two amperes from all in series and far more than the point eight from all in parallel.',
    }),
    sl('diagram', 'Two cells of unequal emf in parallel', {
      b: r`Cells $E_1, r_1$ and $E_2, r_2$ with positive terminals joined act as one cell of
$$E_{eq} = \dfrac{E_1r_2 + E_2r_1}{r_1 + r_2},\qquad r_{eq} = \dfrac{r_1r_2}{r_1 + r_2}$$`,
      ul: ['Derived from $V = E_1 - I_1r_1 = E_2 - I_2r_2$ and $I = I_1 + I_2$.', 'For n cells in series (any emfs), emfs add with sign (a reversed cell subtracts) and $r = r_1 + r_2 + \\dots$'],
      v: V.uneq,
      n: 'When two different cells are joined in parallel, the common terminal voltage V equals E one minus I one r one, and also E two minus I two r two, while the load current is the sum of the two cell currents. Eliminating the cell currents gives a single equivalent cell: a weighted average of the emfs, and the two internal resistances in parallel. In series, emfs simply add, with a reversed cell counted negative.',
    }),
    sl('example', 'Worked example 3: unequal cells sharing a load', {
      b: r`A 2.0 V cell ($r_1$ = 0.40 Ω) and a 1.5 V cell ($r_2$ = 0.60 Ω) are joined in parallel across a 1.56 Ω load. Find the load current and the current in each cell.`,
      ul: [
        r`Step 1 — $E_{eq} = \dfrac{2.0 \times 0.60 + 1.5 \times 0.40}{1.0} = ${dec(ex3.Eeq, 2)}$ V; $r_{eq} = \dfrac{0.40 \times 0.60}{1.0} = ${dec(ex3.req, 2)}$ Ω.`,
        r`Step 2 — $I = \dfrac{1.8}{1.56 + 0.24} = ${dec(ex3.I, 2)}$ A; terminal p.d. $V = IR = ${dec(ex3.V, 3)}$ V.`,
        r`Step 3 — $I_1 = \dfrac{2.0 - 1.56}{0.40} = ${dec(ex3.I1, 2)}$ A; $I_2 = \dfrac{1.5 - 1.56}{0.60} = ${dec(ex3.I2, 1)}$ A: the 1.5 V cell is **being charged**.`,
      ],
      v: V.uneq,
      n: 'The pair behaves as a one point eight volt cell of point two four ohm, so one ampere flows through the load and the terminals sit at one point five six volts. That is more than the emf of the weaker cell, so current is pushed backwards through it: the stronger cell supplies one point one amperes, a tenth of an ampere of which charges the weaker cell.',
    }),
    sl('check', 'Quick check: unequal cells in parallel', {
      b: 'Calculate the equivalent emf.',
      v: V.uneq,
      chk: 'unequal-num',
      n: 'Weight each emf by the other cell’s internal resistance.',
    }),
    sl('concept', 'Kirchhoff’s laws', {
      b: '**Junction law** (conservation of charge): at any junction, $\\sum I_{in} = \\sum I_{out}$, or $\\sum I = 0$.\n\n**Loop law** (conservation of energy): round any closed loop, $\\sum E = \\sum IR$, or the algebraic sum of potential changes is zero.',
      v: table(
        ['Going round the loop…', 'Change in potential'],
        [
          ['through R in the direction of I', '−IR'],
          ['through R against I', '+IR'],
          ['through a cell from − to +', '+E'],
          ['through a cell from + to −', '−E'],
        ],
        'Sign convention table for Kirchhoff’s loop law: minus I R along the current, plus I R against it, plus E from the negative to the positive terminal of a cell, minus E the other way',
      ),
      n: 'Charge cannot pile up at a junction in a steady circuit, so what flows in must flow out: that is the junction law. A charge taken round any closed loop returns to its starting potential, so the rises and falls of potential cancel: that is the loop law, a statement of energy conservation. Assume a direction for each current; if one comes out negative, it simply flows the other way.',
    }),
    sl('example', 'Worked example 4: a two-loop circuit', {
      b: r`In the circuit shown, find the currents $I_1$, $I_2$ and $I_3$.`,
      ul: [
        r`Junction A: $I_3 = I_1 + I_2$.`,
        r`Left loop: $10 = 2I_1 + 4I_3$; right loop: $8 = 4I_2 + 4I_3$.`,
        r`Solving: $I_1 = ${dec(ex4.I1, 2)}$ A, $I_2 = ${dec(ex4.I2, 2)}$ A, $I_3 = ${dec(ex4.I3, 3)}$ A; $V_A - V_B = 4I_3 = ${dec(ex4.V, 2)}$ V.`,
      ],
      v: V.kirch,
      n: 'Take the currents up the two cell branches and down the middle. The junction law at A says the middle current is the sum of the other two. Going round the left loop, ten volts equals two I one plus four I three; round the right loop, eight volts equals four I two plus four I three. Solving gives one and a half amperes, a quarter of an ampere, and one point seven five amperes down the middle.',
    }),
    sl('check', 'Quick check: signs in the loop law', {
      b: 'Choose the correct option.',
      v: V.kirch,
      chk: 'loopsign-mcq',
      n: 'Crossing a cell from its positive to its negative terminal, does the potential rise or fall?',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Emf', 'Work per unit charge by the cell; equals V on open circuit'],
          ['Cell on load', '$E = I(R + r)$, $V = E - Ir$; charging: $V = E + Ir$'],
          ['Series / parallel', '$nE/(R + nr)$ / $E/(R + r/m)$'],
          ['Mixed grouping', '$nE/(R + nr/m)$; largest when $R = nr/m$'],
          ['Unequal cells in parallel', '$E_{eq} = (E_1r_2 + E_2r_1)/(r_1 + r_2)$'],
          ['Kirchhoff', 'Junction: charge conserved; loop: energy conserved'],
        ],
        'Summary table of emf, the cell on load, grouping of cells, unequal cells in parallel and Kirchhoff’s laws',
      ),
      n: 'To sum up: emf is the energy a cell gives each coulomb, and the terminal voltage falls below it by I r when current is drawn. Identical cells in mixed grouping give the most current when the load equals the internal resistance of the battery. Unequal cells in parallel act as one equivalent cell. And Kirchhoff’s junction and loop laws, from conservation of charge and energy, solve any network.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Derive $E = I(R + r)$ from energy per coulomb, not from a formula.',
        'Charging or discharging? It decides $E - Ir$ or $E + Ir$.',
        'In Kirchhoff problems, mark directions first and keep one sign convention.',
        'A negative answer means the current flows opposite to your arrow; do not change the equations.',
      ],
      v: table(['Asked', 'Key point'], [['V on open circuit?', 'Equals E'], ['Best grouping?', 'R = nr/m'], ['Reversed cell in series?', 'Emf −2E, r unchanged']], 'Table of common questions and the key point for each'),
      n: 'Examiners like the derivation of E equals I times R plus r from energy conservation, so practise it. Always ask whether the cell is charging or discharging before writing the terminal voltage. In network problems, draw and label every current first, then use one sign convention throughout. A negative current is not a mistake; it just flows the other way.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Cells, Kirchhoff’s Laws, Bridges and Potentiometer — Part 2: Bridges and the potentiometer',
  goals: [
    'Derive the balance condition of a Wheatstone bridge and use a metre bridge to find an unknown resistance',
    'Explain the principle of the potentiometer, its potential gradient and how to make it more sensitive',
    'Use a potentiometer to compare emfs and to find the internal resistance of a cell',
  ],
  slides: [
    sl('title', 'Bridges and the potentiometer', {
      b: 'Part 2 — null methods: instruments that measure by finding where the current is zero.',
      v: V.pot,
      n: 'A meter that draws current always disturbs what it measures. The instruments in this part avoid that: they are balanced until a sensitive galvanometer reads zero. The Wheatstone bridge and its laboratory form, the metre bridge, measure resistance this way, and the potentiometer measures emf without drawing any current from the cell. All three follow directly from Kirchhoff’s laws.',
    }),
    sl('diagram', 'The Wheatstone bridge', {
      b: r`Four resistors P, Q, R, S, a cell across AC and a galvanometer across BD. At **balance** ($I_g = 0$), B and D are at the same potential, so the same current $I_1$ flows through P and Q and $I_2$ through R and S:
$$I_1P = I_2R,\quad I_1Q = I_2S\ \Rightarrow\ \dfrac{P}{Q} = \dfrac{R}{S}$$`,
      ul: ['Loop ABDA with $I_g = 0$ gives the first equation; loop BCDB the second.', 'Balance does not depend on the emf of the cell or the resistance of the galvanometer.'],
      v: V.bridge,
      n: 'In a Wheatstone bridge, the galvanometer joins the midpoints of two potential dividers. When it reads zero, no current crosses from B to D, so P and Q carry the same current, and so do R and S. The loop law round the left triangle gives I one P equals I two R, and round the right triangle I one Q equals I two S. Dividing, P over Q equals R over S.',
    }),
    sl('diagram', 'The metre bridge', {
      b: r`A practical Wheatstone bridge: a uniform wire 100 cm long forms the ratio arms. With X in the left gap and a known R in the right, balance at length l gives
$$\dfrac{X}{R} = \dfrac{l}{100 - l}\qquad\Rightarrow\qquad X = R\,\dfrac{l}{100 - l}$$`,
      ul: ['The wire’s resistance is proportional to length, so the arms are in the ratio l : (100 − l).', 'Choose R so that l is near the **middle**: the end resistances at the copper strips then matter least.', 'Touch the jockey gently; do not slide it along the wire.'],
      v: V.metre,
      n: 'In the metre bridge, the two lower arms of the bridge are replaced by the two parts of a uniform wire, one metre long, on either side of a sliding contact called the jockey. Their resistances are in the ratio of their lengths. So at balance, the unknown over the known resistance equals l over one hundred minus l. A balance near the middle of the wire gives the most reliable result.',
    }),
    sl('example', 'Worked example 5: finding an unknown resistance', {
      b: r`With a 9.0 Ω resistor in the right gap of a metre bridge, the null point is 55.0 cm from the left end. Find X. Where is the null point if X and the 9.0 Ω resistor are interchanged?`,
      ul: [
        r`Step 1 — $X = R\,\dfrac{l}{100 - l} = 9.0 \times \dfrac{55.0}{45.0} = ${dec(ex5.X, 3)}$ Ω.`,
        r`Step 2 — interchanged: $\dfrac{9.0}{11.0} = \dfrac{l'}{100 - l'}$ gives $l' = \dfrac{900}{20.0} = ${dec(ex5.lswap, 3)}$ cm, i.e. $100 - 55.0$.`,
      ],
      v: V.metre,
      n: 'The null point at fifty five centimetres means the unknown is fifty five forty fifths of the known nine ohms, which is eleven ohms. If the two resistors swap gaps, the balance moves to the mirror position, forty five centimetres from the left end. Taking both readings and averaging the two results helps to cancel the end errors.',
    }),
    sl('check', 'Quick check: a balanced bridge', {
      b: 'Calculate the missing resistance.',
      v: V.bridge,
      chk: 'bridgeS-num',
      n: 'At balance, the ratio of the two upper arms equals the ratio of the two lower arms.',
    }),
    sl('concept', 'The potentiometer: principle', {
      b: r`A long uniform wire AB carries a **steady current** from a driver cell. The potential drop along it is proportional to length: $V = kl$. A cell joined (+ to A) through a galvanometer to a jockey is **balanced** at length l when its emf equals the drop over l:
$$E = kl$$`,
      ul: ['At balance **no current** flows through the cell, so its full emf is measured: the potentiometer is an **ideal voltmeter** (infinite resistance).', 'Needs: driver emf greater than E, and both + terminals joined to A.'],
      v: V.pot,
      n: 'A steady current through a uniform wire makes the potential fall evenly along it. Connect a cell, positive to A, through a galvanometer to a point on the wire. If the drop along the wire up to that point equals the emf, nothing flows through the galvanometer. Because the cell then supplies no current, there is no lost voltage inside it, and we measure its true emf.',
    }),
    sl('diagram', 'Potential gradient', {
      b: r`The **potential gradient** k is the fall of potential per unit length of the wire:
$$k = \dfrac{V_{AB}}{L} = \dfrac{I\rho}{A}\quad(\text{V m}^{-1})$$`,
      ul: ['k is constant along the wire only if the current is steady and the wire uniform (same material and cross-section).', 'The wire is made of an alloy such as constantan or manganin: high resistivity and very small temperature coefficient.'],
      v: potPlot,
      n: 'The potential gradient is the voltage across the whole wire divided by its length, or, equivalently, the current times the resistance of one metre of the wire. It is constant only if the current stays steady and the wire is uniform. That is why potentiometer wires are made of alloys like constantan, whose resistance hardly changes as they warm up.',
    }),
    sl('example', 'Worked example 6: gradient and balancing length', {
      b: r`A 4.0 m potentiometer wire of resistance 8.0 Ω is in series with a rheostat set at 2.0 Ω and a 2.0 V accumulator of negligible internal resistance. Find the potential gradient and the balancing length for a Daniell cell of emf 1.08 V.`,
      ul: [
        r`Step 1 — $I = \dfrac{2.0}{8.0 + 2.0} = ${dec(ex6.I, 2)}$ A; $V_{AB} = IR_w = ${dec(ex6.Vw, 2)}$ V.`,
        r`Step 2 — $k = \dfrac{1.6}{4.0} = ${dec(ex6.k, 2)}$ V m$^{-1}$.`,
        r`Step 3 — $l = \dfrac{E}{k} = \dfrac{1.08}{0.40} = ${dec(ex6.lD, 2)}$ m.`,
      ],
      v: V.pot,
      n: 'The driver sends two volts through ten ohms, so the current is a fifth of an ampere and the wire, eight ohms, has one point six volts across it. Spread over four metres, that is a gradient of point four volt per metre. A Daniell cell of one point zero eight volts therefore balances two point seven metres from A.',
    }),
    sl('concept', 'Sensitivity of a potentiometer', {
      b: r`A potentiometer is more **sensitive** when a small change in emf gives a large change in balancing length, i.e. when **k is small**.`,
      ul: ['Use a **longer wire** (for the same p.d. across it).', 'Increase the **rheostat resistance** to reduce the current (but keep $kL > E$).', 'For a few millivolts (a thermocouple), a large series resistance makes k about a millivolt per metre.'],
      v: potPlot,
      n: 'Sensitivity means how far the balance point moves for a small change in emf. Since the length is emf divided by k, a smaller gradient spreads the same emf over more wire. We lower k by using a longer wire or by adding resistance in the driver circuit. But the whole wire must still carry more potential drop than the emf being measured, or there will be no balance point.',
    }),
    sl('check', 'Quick check: no balance point', {
      b: 'Choose the correct option.',
      v: V.pot,
      chk: 'nobalance-mcq',
      n: 'What must be true of the potential drop along the whole wire?',
    }),
    sl('diagram', 'Comparing the emfs of two cells', {
      b: r`With a two-way key, cells $E_1$ and $E_2$ are balanced in turn against the same wire (same k):
$$E_1 = kl_1,\quad E_2 = kl_2\quad\Rightarrow\quad \dfrac{E_1}{E_2} = \dfrac{l_1}{l_2}$$`,
      ul: ['k cancels, so neither the driver emf nor the wire’s resistance needs to be known.', 'Internal resistances do not matter: no current flows through the cells at balance.'],
      v: V.potCmp,
      n: 'To compare two emfs, both cells are joined, positive to A, to the two sides of a two-way key, so either can be connected to the galvanometer. Each is balanced in turn against the same wire carrying the same current. Since each emf is k times its balancing length, the ratio of the emfs is just the ratio of the lengths, whatever the gradient.',
    }),
    sl('example', 'Worked example 7: comparing emfs', {
      b: r`On the potentiometer of worked example 6, the 1.08 V Daniell cell balances at 2.70 m and an unknown cell at 3.60 m. Find the emf of the unknown cell.`,
      ul: [r`$E_2 = E_1\,\dfrac{l_2}{l_1} = 1.08 \times \dfrac{3.60}{2.70} = ${dec(ex7.E2, 3)}$ V.`, r`Check with k: $0.40 \times 3.60 = 1.44$ V.`],
      v: V.potCmp,
      n: 'The unknown cell needs a third more wire than the Daniell cell, so its emf is a third larger: one point zero eight times three point six over two point seven gives one point four four volts. Using the gradient of point four volt per metre gives the same result, which is a useful check on the readings.',
    }),
    sl('diagram', 'Internal resistance of a cell', {
      b: r`Balance the cell on open circuit ($K_2$ open): $E = kl_1$. Close $K_2$ so it drives current through R: the balance gives its terminal p.d. $V = kl_2$. Since $\dfrac{E}{V} = \dfrac{R + r}{R}$,
$$r = R\left(\dfrac{l_1 - l_2}{l_2}\right)$$`,
      ul: ['$l_2 < l_1$, because the terminal p.d. is less than E while the cell supplies current.'],
      v: V.potInt,
      n: 'First balance the cell with the key open: the length measures its emf. Then close the key so the cell drives current through a known resistance R. Now the balance measures the terminal voltage, which is smaller, so the balancing length is shorter. The ratio E over V equals R plus r over R, which rearranges to r equals R times l one minus l two, over l two.',
    }),
    sl('example', 'Worked example 8: internal resistance', {
      b: r`A cell balances at 3.00 m on open circuit. With a 9.0 Ω resistor across it, the balance is at 2.50 m. Find its internal resistance (and, with k = 0.40 V m⁻¹, its emf).`,
      ul: [r`$r = R\,\dfrac{l_1 - l_2}{l_2} = 9.0 \times \dfrac{3.00 - 2.50}{2.50} = ${dec(ex8.r, 2)}$ Ω.`, r`$E = kl_1 = 0.40 \times 3.00 = ${dec(ex8.E, 2)}$ V; terminal p.d. $= 0.40 \times 2.50 = 1.0$ V.`],
      v: V.potInt,
      n: 'Closing the key shortens the balance by half a metre, a fifth of the second length, so the internal resistance is a fifth of nine ohms: one point eight ohms. With the gradient of point four volt per metre, the emf is one point two volts and the terminal voltage one volt, so a ninth of an ampere is flowing.',
    }),
    sl('check', 'Quick check: internal resistance', {
      b: 'Calculate the internal resistance.',
      v: V.potInt,
      chk: 'intR-num',
      n: 'Use r equals R times the fall in balancing length, divided by the second length.',
    }),
    sl('two-column', 'Potentiometer or voltmeter?', {
      b: 'Why the potentiometer measures emf better:',
      v: potVsVolt,
      cols: ['**Potentiometer**\n- No current at balance\n- True emf\n- Sensitivity adjustable', '**Voltmeter**\n- Draws current\n- Terminal p.d. only\n- Quick, but less accurate'],
      n: 'A voltmeter always draws some current, so across a cell it reads the terminal voltage, a little less than the emf. The potentiometer draws none at balance, so it measures the emf itself, and its sensitivity can be raised by lowering the gradient. Its drawbacks are that it is slower to use and needs a steady driver cell.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Wheatstone bridge', 'Balanced when $P/Q = R/S$'],
          ['Metre bridge', '$X = R\\,l/(100 - l)$; balance near the middle'],
          ['Potentiometer', '$E = kl$ at balance; no current drawn'],
          ['Potential gradient', '$k = V_{AB}/L$; smaller k, more sensitive'],
          ['Comparing emfs', '$E_1/E_2 = l_1/l_2$'],
          ['Internal resistance', '$r = R(l_1 - l_2)/l_2$'],
        ],
        'Summary table of the Wheatstone bridge, metre bridge, potentiometer principle, potential gradient, comparing emfs and internal resistance',
      ),
      n: 'To sum up: a Wheatstone bridge balances when the ratios of its arms are equal, and the metre bridge uses the two parts of a uniform wire as two of those arms. A potentiometer balances an emf against the steady potential drop along a uniform wire, drawing no current, so it compares emfs by the ratio of lengths and finds internal resistance from two balancing lengths.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Derive the bridge balance from Kirchhoff’s loop law with $I_g = 0$.',
        'In metre-bridge sums, check which gap holds the unknown before using l or 100 − l.',
        'No balance point: driver emf too small, or the + terminals not both at A.',
        'Internal resistance: $l_2$ is the length with the resistor connected.',
      ],
      v: table(['Asked', 'Key point'], [['Why near 50 cm?', 'End errors least'], ['More sensitive?', 'Lower k: longer wire, more rheostat'], ['Why not a voltmeter?', 'It draws current']], 'Table of common questions and the key point for each'),
      n: 'For the bridge derivation, apply the loop law to the two triangles with no current through the galvanometer. In metre-bridge numericals, check which gap the unknown is in. If no balance point exists, suspect a weak driver cell or a cell connected the wrong way round. And in internal-resistance problems, remember that the shorter length is the one with the resistor connected.',
    }),
  ],
});

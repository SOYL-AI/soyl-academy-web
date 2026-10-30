// ISC 12 Chemistry ch03 Electrochemical Cells and Electrode Potential — two decks: Part 1 (t01–t02) cells, cell
// notation, single electrode potential and the SHE; Part 2 (t03–t05) factors affecting electrode potential, the
// electrochemical series, the Nernst equation, ΔG and K.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { DANIELL, SHE } from './svgs.mjs';

export const V = {
  daniell: svgV(DANIELL, 'Daniell cell with a zinc rod in zinc sulfate solution, a copper rod in copper sulfate solution, a salt bridge and a voltmeter; electrons flow through the wire from zinc to copper', 'Zinc is the anode (oxidation, negative); copper is the cathode (reduction, positive).'),
  she: svgV(SHE, 'Standard hydrogen electrode: platinum foil coated with platinum black in acid of hydrogen ion concentration 1 mol per litre, with hydrogen gas at 1 bar bubbled over it', 'Its electrode potential is taken as zero at all temperatures.'),
};

// Nernst: E of Cu2+/Cu against log[Cu2+] at 298 K (slope 0.0295 V per decade).
export const nernstPlot = plot(
  {
    x: { min: -4, max: 0, label: 'log [Cu²⁺]' },
    y: { min: 0.2, max: 0.36, label: 'Electrode potential E (V)' },
    series: [{ label: 'Cu²⁺/Cu at 298 K', kind: 'line', points: [-4, -3, -2, -1, 0].map((l) => [l, +(0.34 + 0.0295 * l).toFixed(4)]) }],
    points: [{ at: [0, 0.34], label: 'E° = +0.34 V at 1 M', on_curve: true }],
  },
  'Electrode potential of a copper electrode against the logarithm of copper ion concentration: a straight line rising with slope about 0.03 volt per tenfold increase, reaching 0.34 volt at 1 mol per litre',
  'Slope = 0.059/n = 0.0295 V per tenfold change in concentration (n = 2).',
);

export const deck1 = deck({
  part: 1,
  title: 'Electrochemical Cells and Electrode Potential — Part 1: Cells and the standard hydrogen electrode',
  goals: [
    'Compare electrolytic and electrochemical (galvanic) cells',
    'Explain how a Daniell cell produces a current and write its half-reactions and cell notation',
    'Describe the standard hydrogen electrode, its preparation, use and limitations',
    'Explain how the standard electrode potentials of Zn²⁺/Zn and Cu²⁺/Cu are measured against the SHE',
  ],
  slides: [
    sl('title', 'Electrochemical cells', {
      b: 'Part 1 — turning a redox reaction into an electric current, and measuring electrode potentials.',
      v: flow('LR', [['a', 'Spontaneous redox reaction'], ['b', 'Oxidation and reduction in separate half-cells'], ['c', 'Electrons through the wire'], ['d', 'Electrical work']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow: a spontaneous redox reaction split into two half-cells drives electrons through a wire to do work'),
      n: 'Namaste! A torch cell, a mobile phone battery and the pacemaker in a patient’s chest all turn chemical energy into electrical energy. In this chapter we see how a redox reaction can be split into two halves so that electrons are forced to travel through a wire, how such a cell is written in shorthand, and how the tendency of each electrode to gain or lose electrons is measured.',
    }),
    sl('concept', 'Electrolytic and electrochemical cells', {
      b: 'In an **electrochemical (galvanic or voltaic) cell**, a spontaneous redox reaction produces electrical energy. In an **electrolytic cell**, electrical energy from an outside source drives a non-spontaneous reaction. In both, **oxidation occurs at the anode and reduction at the cathode**.',
      v: table(['Feature', 'Electrochemical (galvanic) cell', 'Electrolytic cell'], [['Energy change', 'Chemical → electrical', 'Electrical → chemical'], ['Reaction', 'Spontaneous (ΔG < 0)', 'Non-spontaneous, driven by a battery'], ['Anode sign', 'Negative', 'Positive'], ['Cathode sign', 'Positive', 'Negative'], ['Salt bridge', 'Usually needed', 'Not needed (one vessel)'], ['Example', 'Daniell cell, dry cell', 'Electroplating, electrolysis of brine']], 'Table comparing electrochemical and electrolytic cells'),
      n: 'There are two kinds of cell. In an electrochemical, or galvanic, cell a spontaneous reaction pushes electrons through a wire, so chemical energy becomes electrical energy. In an electrolytic cell a battery forces a reaction that would not happen on its own. One rule holds in both: oxidation at the anode, reduction at the cathode. Only the signs of the electrodes swap.',
    }),
    sl('diagram', 'The Daniell cell', {
      b: 'A zinc rod in ZnSO₄ solution and a copper rod in CuSO₄ solution, joined by a wire and a **salt bridge**. With 1 M solutions at 298 K the voltmeter reads about 1.10 V.',
      v: V.daniell,
      n: 'Here is the Daniell cell. A zinc rod stands in zinc sulfate solution and a copper rod in copper sulfate solution. A wire joins the rods through a voltmeter, and a salt bridge joins the two solutions. With both solutions at one molar the voltmeter reads about one point one volts, and electrons flow through the wire from the zinc to the copper.',
    }),
    sl('concept', 'How the cell produces a current', {
      b: r`Zinc has a greater tendency to lose electrons than copper. Zinc atoms are **oxidised** at the anode; the electrons flow through the external wire to the copper, where Cu²⁺ ions are **reduced**. The **salt bridge** (KCl, KNO₃ or NH₄NO₃ in agar) lets ions migrate so that both solutions stay neutral, completing the circuit.`,
      m: [r`\text{Anode: } \ce{Zn(s) -> Zn^2+(aq) + 2e-}`, r`\text{Cathode: } \ce{Cu^2+(aq) + 2e- -> Cu(s)}`, r`\text{Cell: } \ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}`],
      v: table(['Function of the salt bridge', 'Result'], [['Completes the internal circuit', 'Current can flow'], ['Supplies ions to neutralise charge build-up', 'Reaction continues'], ['Prevents direct mixing of solutions', 'Cu²⁺ does not react directly with zinc'], ['Reduces the liquid junction potential', 'Steadier voltage']], 'Table of the functions of a salt bridge'),
      n: 'Why does current flow? Zinc gives up electrons more readily than copper. Zinc atoms lose two electrons each and enter the solution as zinc ions; the electrons travel through the wire to the copper rod, where copper ions pick them up and deposit as copper metal. Without the salt bridge, positive charge would pile up around the zinc and negative charge around the copper, and the current would stop almost at once.',
    }),
    sl('concept', 'Cell notation', {
      b: r`**Anode on the left, cathode on the right.** A single vertical line marks a phase boundary; a double line is the salt bridge. Concentrations (or pressures) are given in brackets. An inert electrode (Pt) is written at the end when the half-cell has no metal of its own.`,
      m: [r`\ce{Zn(s) | Zn^2+(aq, 1 M) || Cu^2+(aq, 1 M) | Cu(s)}`, r`\ce{Pt | H2(g, 1 bar) | H+(aq, 1 M) || Ag+(aq, 1 M) | Ag(s)}`, r`E_\text{cell} = E_\text{right} - E_\text{left} = E_\text{cathode} - E_\text{anode}`],
      v: table(['Symbol', 'Meaning'], [['Left half-cell', 'Anode (oxidation)'], ['Right half-cell', 'Cathode (reduction)'], ['|', 'Phase boundary'], ['||', 'Salt bridge'], ['Pt', 'Inert electrode for gas or ion–ion half-cells']], 'Table of conventions in cell notation'),
      n: 'Cells are written in a shorthand. The anode goes on the left and the cathode on the right. A single line marks the boundary between a solid and a solution, and a double line stands for the salt bridge. When a half-cell involves a gas or two ions, an inert platinum electrode is written at the end. The cell voltage is the right-hand potential minus the left-hand one.',
    }),
    sl('example', 'Worked example: from a reaction to cell notation', {
      b: r`**Problem.** Write the half-reactions and the cell notation for a cell based on $\ce{Fe(s) + 2Ag+(aq) -> Fe^2+(aq) + 2Ag(s)}$, with 0.1 M Fe²⁺ and 0.5 M Ag⁺.

**Step 1.** Oxidation (anode): $\ce{Fe -> Fe^2+ + 2e-}$; reduction (cathode): $\ce{Ag+ + e- -> Ag}$ (twice).

**Step 2.** $\ce{Fe(s) | Fe^2+(aq, 0.1 M) || Ag+(aq, 0.5 M) | Ag(s)}$.`,
      v: table(['Half-cell', 'Process', 'Position in notation'], [['Fe | Fe²⁺', 'Oxidation (anode)', 'Left'], ['Ag⁺ | Ag', 'Reduction (cathode)', 'Right']], 'Table of the iron and silver half-cells, their processes and positions'),
      n: 'Start with the overall reaction and find which species loses electrons. Iron goes from zero to plus two, so it is oxidised: that half-cell is the anode and goes on the left. Silver ions gain electrons and are reduced at the cathode, written on the right. Put the concentrations in brackets and join the two halves with a double line for the salt bridge.',
    }),
    sl('check', 'Quick check: anode or cathode?', {
      b: 'Identify the anode, or the direction of electron flow, from a cell notation.',
      n: 'Quick check. The left-hand electrode in cell notation is the anode, where oxidation takes place, and electrons leave it through the wire.',
      chk: 'notation-mcq',
    }),
    sl('concept', 'Single electrode potential', {
      b: 'When a metal dips into a solution of its ions, an equilibrium $\\ce{M^{n+} + ne- <=> M}$ sets up and a potential difference develops between metal and solution: the **electrode potential**. Its absolute value **cannot be measured**; only differences between two electrodes can. So all potentials are measured against a reference, the **standard hydrogen electrode (SHE)**, assigned $E^\\circ = 0.00\\ \\text{V}$ at all temperatures. By IUPAC convention potentials are quoted as **reduction potentials**.',
      v: table(['Term', 'Meaning'], [['Electrode potential', 'Potential difference between an electrode and its solution'], ['Standard electrode potential E°', 'Measured at 1 M ions, 1 bar gas, 298 K'], ['Reduction potential', 'Tendency to gain electrons (IUPAC convention)'], ['Oxidation potential', 'Same value, opposite sign']], 'Table of terms about electrode potential'),
      n: 'When a metal is dipped into a solution of its own ions, some atoms may lose electrons and enter the solution, or some ions may gain electrons and deposit, until an equilibrium is reached. A potential difference builds up between the metal and the solution. We cannot measure this on its own, because any measuring wire forms a second electrode. So we measure every electrode against one agreed reference, the standard hydrogen electrode.',
    }),
    sl('diagram', 'The standard hydrogen electrode', {
      b: '**Preparation:** a platinum foil coated with **platinum black** (finely divided Pt, large surface; adsorbs H₂) dips into 1 M H⁺ (e.g. HCl) at 298 K; pure hydrogen gas at **1 bar** is bubbled over it. Half-reaction: $\\ce{2H+(aq) + 2e- <=> H2(g)}$, $E^\\circ = 0$. **Limitations:** hard to keep H⁺ exactly 1 M and H₂ exactly 1 bar; platinum is easily poisoned by impurities (e.g. arsenic, sulfur compounds); cannot be used in solutions of oxidising agents; inconvenient to set up, so secondary reference electrodes are used in practice.',
      v: V.she,
      n: 'This is the standard hydrogen electrode. A platinum foil coated with finely divided platinum black, which gives a large surface and adsorbs hydrogen, dips into acid with hydrogen ions at one mole per litre. Pure hydrogen at one bar bubbles over it. Its potential is defined as zero. But it is awkward: the acid concentration and gas pressure must be exact, platinum is easily poisoned, and it cannot be used with oxidising agents.',
    }),
    sl('concept', 'Measuring E° of Zn²⁺/Zn and Cu²⁺/Cu', {
      b: 'The half-cell is connected to the SHE through a salt bridge and a voltmeter. The **direction of electron flow** decides the sign.',
      m: [r`\ce{Zn | Zn^2+(1 M) || H+(1 M) | H2(1 bar) | Pt}: \ E^\circ_\text{cell} = 0.76\ \text{V} = 0 - E^\circ_{\ce{Zn^2+/Zn}}`, r`\ce{Pt | H2(1 bar) | H+(1 M) || Cu^2+(1 M) | Cu}: \ E^\circ_\text{cell} = 0.34\ \text{V} = E^\circ_{\ce{Cu^2+/Cu}} - 0`],
      v: table(['Half-cell vs SHE', 'Electrons flow', 'Half-cell acts as', 'E°'], [['Zn²⁺/Zn', 'From zinc to SHE', 'Anode (zinc oxidised)', '−0.76 V'], ['Cu²⁺/Cu', 'From SHE to copper', 'Cathode (Cu²⁺ reduced)', '+0.34 V']], 'Table showing how the signs of the zinc and copper standard potentials follow from electron flow'),
      n: 'To measure the standard potential of zinc, join a zinc half-cell with one molar zinc ions to the standard hydrogen electrode. Electrons flow from the zinc to the hydrogen electrode, so zinc is the anode, and the voltmeter reads nought point seven six volts; the reduction potential of zinc is therefore minus nought point seven six. With copper, electrons flow the other way, copper is the cathode, and its potential is plus nought point three four volts.',
    }),
    sl('example', 'Worked example: finding an unknown standard potential', {
      b: r`**Problem.** A nickel half-cell (1 M Ni²⁺) is connected to the SHE. The voltmeter reads $0.25\ \text{V}$ and electrons flow from the nickel to the SHE. Find $E^\circ_{\ce{Ni^2+/Ni}}$ and write the cell.

**Step 1.** Electrons leave nickel, so nickel is the anode (left).

**Step 2.** $\ce{Ni | Ni^2+(1 M) || H+(1 M) | H2(1 bar) | Pt}$.

**Step 3.** $E^\circ_\text{cell} = 0 - E^\circ_{\ce{Ni^2+/Ni}} = 0.25$, so $E^\circ_{\ce{Ni^2+/Ni}} = -0.25\ \text{V}$.`,
      v: flow('LR', [['a', 'Connect half-cell to SHE'], ['b', 'Find direction of electron flow'], ['c', 'Decide anode and cathode'], ['d', 'E°cell = E°cathode − E°anode'], ['e', 'Solve for unknown E°']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow for finding an unknown standard electrode potential against the SHE'),
      n: 'The direction of electron flow tells us which electrode is the anode. Electrons leave the nickel, so nickel is oxidised and is the anode. The cell voltage, nought point two five, equals the cathode potential, zero for hydrogen, minus the nickel potential. So the standard reduction potential of nickel is minus nought point two five volts.',
    }),
    sl('check', 'Quick check: the SHE', {
      b: 'Recall a feature or a limitation of the standard hydrogen electrode.',
      n: 'Quick check. Think about what makes the hydrogen electrode standard, and why chemists avoid it in everyday measurements.',
      chk: 'she-mcq',
    }),
    sl('check', 'Quick check: sign of E°', {
      b: 'Deduce the sign of a standard electrode potential from the direction of electron flow.',
      n: 'Quick check. If the half-cell is the anode when joined to the SHE, its reduction potential is negative.',
      chk: 'sign-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Galvanic cell: spontaneous reaction → electricity; electrolytic cell: electricity drives reaction.',
        'Oxidation at anode, reduction at cathode; salt bridge completes the circuit.',
        'Cell notation: anode | anode solution || cathode solution | cathode.',
        'Electrode potentials are measured against the SHE (E° = 0); quoted as reduction potentials.',
        'SHE: Pt black, 1 M H⁺, H₂ at 1 bar; limitations: hard to maintain, poisoned, not with oxidants.',
      ],
      v: table(['Electrode', 'E° / V'], [['Cu²⁺/Cu', '+0.34'], ['H⁺/H₂ (SHE)', '0.00'], ['Ni²⁺/Ni', '−0.25'], ['Zn²⁺/Zn', '−0.76']], 'Summary table of four standard electrode potentials'),
      n: 'Let us sum up Part 1. A galvanic cell separates oxidation and reduction so that electrons flow through a wire; the salt bridge completes the circuit. Cells are written with the anode on the left. Electrode potentials are measured against the standard hydrogen electrode, which has zero potential but is awkward to use. The direction of electron flow gives the sign of each potential.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give at least two functions of the salt bridge.',
        'For the SHE, describe preparation (Pt black, 1 M H⁺, 1 bar H₂) and two limitations.',
        'Decide the sign of E° from the direction of electron flow relative to the SHE.',
        'Write both half-reactions and the overall reaction with states.',
      ],
      v: table(['Slip', 'Fix'], [['Anode is always positive', 'Anode is negative in a galvanic cell'], ['Writing the cathode on the left', 'Anode left, cathode right'], ['SHE potential depends on temperature', 'Taken as zero at all temperatures']], 'Table of three common slips in Part 1 and fixes'),
      n: 'A few tips. When asked about the salt bridge, give at least two functions. For the hydrogen electrode, describe how it is set up and give two limitations. Decide the sign of a standard potential from the direction of electron flow. And always write the half-reactions with state symbols.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electrochemical Cells and Electrode Potential — Part 2: Electrochemical series and the Nernst equation',
  goals: [
    'Predict how electrode potential changes with concentration, temperature and the nature of the electrode',
    'Use the electrochemical series to predict displacement reactions and calculate standard cell emf',
    'Calculate the emf of a cell at non-standard concentrations using the Nernst equation',
    'Calculate ΔG° and the equilibrium constant from the standard cell emf',
  ],
  slides: [
    sl('title', 'Electrode potentials at work', {
      b: 'Part 2 — ranking electrodes, predicting reactions and correcting for concentration.',
      v: flow('LR', [['a', 'Factors affecting E'], ['b', 'Electrochemical series'], ['c', 'Nernst equation'], ['d', 'ΔG° and K']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of topics in Part 2'),
      n: 'Once we can measure electrode potentials, we can rank them in a series and use it to predict which metal will displace another, whether a metal will liberate hydrogen from an acid, and how large a cell’s voltage will be. The Nernst equation then tells us how the voltage changes when the solutions are not one molar, and links voltage to Gibbs energy and equilibrium.',
    }),
    sl('concept', 'Factors affecting electrode potential', {
      b: 'For $\\ce{M^{n+} + ne- <=> M}$: **(1) Concentration of ions:** increasing [Mⁿ⁺] shifts the equilibrium right and makes the reduction potential **more positive** (Le Chatelier; Nernst). **(2) Temperature:** E changes with T (the Nernst factor 2.303RT/nF grows with T). **(3) Nature of the electrode:** metals that lose electrons easily (low ionisation enthalpy, high hydration enthalpy of the ion) have **more negative** reduction potentials.',
      v: nernstPlot,
      n: 'Three things affect an electrode potential. First, concentration: adding more metal ions pushes the reduction equilibrium forward, so the potential becomes more positive; for copper it rises by about three hundredths of a volt for each tenfold increase. Second, temperature, because the Nernst factor contains temperature. Third, the nature of the metal itself: metals that give up electrons easily have very negative reduction potentials.',
    }),
    sl('check', 'Quick check: factors affecting E', {
      b: 'Predict how an electrode potential changes when the ion concentration changes.',
      n: 'Quick check. More metal ions push the reduction equilibrium forward, making the potential more positive.',
      chk: 'factor-mcq',
    }),
    sl('concept', 'The electrochemical series', {
      b: r`Standard **reduction** potentials arranged in order. **More positive** $E^\circ$: stronger **oxidising agent**. **More negative** $E^\circ$: stronger **reducing agent**, more reactive metal.`,
      v: table(['Half-reaction (reduction)', r`$E^\circ$ / V`], [[r`$\ce{F2 + 2e- -> 2F-}$`, '+2.87'], [r`$\ce{Cl2 + 2e- -> 2Cl-}$`, '+1.36'], [r`$\ce{Br2 + 2e- -> 2Br-}$`, '+1.09'], [r`$\ce{Ag+ + e- -> Ag}$`, '+0.80'], [r`$\ce{Fe^3+ + e- -> Fe^2+}$`, '+0.77'], [r`$\ce{Cu^2+ + 2e- -> Cu}$`, '+0.34'], [r`$\ce{2H+ + 2e- -> H2}$`, '0.00'], [r`$\ce{Pb^2+ + 2e- -> Pb}$`, '−0.13'], [r`$\ce{Ni^2+ + 2e- -> Ni}$`, '−0.25'], [r`$\ce{Fe^2+ + 2e- -> Fe}$`, '−0.44'], [r`$\ce{Zn^2+ + 2e- -> Zn}$`, '−0.76'], [r`$\ce{Al^3+ + 3e- -> Al}$`, '−1.66'], [r`$\ce{Mg^2+ + 2e- -> Mg}$`, '−2.37'], [r`$\ce{K+ + e- -> K}$`, '−2.93']], 'Table of standard reduction potentials at 298 K from fluorine to potassium'),
      n: 'Here is an electrochemical series written as reductions. Fluorine at the top, with the most positive value, grabs electrons most strongly: it is the strongest oxidising agent. Potassium near the bottom gives electrons away most readily: it is the strongest reducing agent and a very reactive metal. Notice that the iron three to iron two couple sits just below silver.',
    }),
    sl('example', 'Worked example: standard emf and the cell reaction', {
      b: r`**Problem.** For $\ce{Al | Al^3+ (1 M) || Ni^2+ (1 M) | Ni}$, find $E^\circ_\text{cell}$ and write the balanced cell reaction. ($E^\circ$: Al³⁺/Al $-1.66$ V, Ni²⁺/Ni $-0.25$ V)

**Step 1.** $E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode} = -0.25 - (-1.66) = 1.41\ \text{V}$.

**Step 2.** Electrons: Al gives 3, Ni²⁺ takes 2; LCM 6.

**Step 3.** $\ce{2Al(s) + 3Ni^2+(aq) -> 2Al^3+(aq) + 3Ni(s)}$; $n = 6$. $E^\circ$ is **not** multiplied by the coefficients.`,
      v: table(['Electrode', 'E° / V', 'Role'], [['Ni²⁺/Ni', '−0.25', 'Cathode'], ['Al³⁺/Al', '−1.66', 'Anode'], ['E°cell', '+1.41', 'Spontaneous']], 'Table of the aluminium–nickel cell with standard potentials and emf'),
      n: 'Subtract the anode potential from the cathode potential: minus nought point two five minus minus one point six six gives one point four one volts. To balance the reaction, each aluminium atom gives three electrons and each nickel ion takes two, so we need two aluminium and three nickel, with six electrons in all. The potentials are not multiplied by these numbers, because electrode potential does not depend on the amount of substance.',
    }),
    sl('concept', 'Using the series to predict reactions', {
      b: '(1) A metal with a **lower** (more negative) E° displaces a metal with a higher E° from a solution of its salt. (2) Metals with **negative** E° liberate H₂ from dilute acids; those with positive E° do not. (3) A reaction is feasible if the calculated $E^\\circ_\\text{cell}$ is **positive**.',
      v: table(['Question', 'Answer'], [['Does iron displace copper from CuSO₄?', 'Yes: E° of Fe (−0.44) is lower than Cu (+0.34)'], ['Does silver liberate H₂ from dilute HCl?', 'No: E° of Ag is positive'], ['Can Br₂ oxidise Fe²⁺ to Fe³⁺?', 'Yes: 1.09 − 0.77 = +0.32 V'], ['Can I₂ (E° +0.54) oxidise Fe²⁺?', 'No: 0.54 − 0.77 is negative']], 'Table of predictions from the electrochemical series'),
      n: 'The series becomes a prediction tool. A metal lower in the list displaces one higher up, so iron displaces copper. Metals with negative potentials release hydrogen from dilute acids; copper and silver do not. For any redox reaction, imagine it happens, calculate the cell voltage, and if the answer is positive the reaction is feasible: bromine can oxidise iron two ions, but iodine cannot.',
    }),
    sl('example', 'Worked example: storing a solution', {
      b: r`**Problem.** Can a copper(II) sulfate solution be stored in an iron tank? Can it be stored in a silver vessel? ($E^\circ$: Cu²⁺/Cu $+0.34$, Fe²⁺/Fe $-0.44$, Ag⁺/Ag $+0.80$ V)

**Iron tank:** $\ce{Fe + Cu^2+ -> Fe^2+ + Cu}$: $E^\circ = 0.34 - (-0.44) = 0.78\ \text{V}$, positive — the tank would dissolve. **No.**

**Silver vessel:** $\ce{2Ag + Cu^2+ -> 2Ag+ + Cu}$: $E^\circ = 0.34 - 0.80 = -0.46\ \text{V}$, negative — no reaction. **Yes.**`,
      v: table(['Vessel', 'E°cell / V', 'Verdict'], [['Iron', '+0.78', 'Reacts: unsuitable'], ['Silver', '−0.46', 'No reaction: suitable']], 'Table of the two storage tests with cell emf and verdict'),
      n: 'For each vessel, imagine the metal reacting with copper ions. With iron, the cell voltage is nought point three four minus minus nought point four four, a positive nought point seven eight volts, so iron would dissolve and copper would deposit. With silver, the voltage is nought point three four minus nought point eight, which is negative, so nothing happens and the silver vessel is safe.',
    }),
    sl('check', 'Quick check: electrochemical series', {
      b: 'Use standard reduction potentials to choose the strongest oxidising or reducing agent, or to predict a displacement.',
      n: 'Quick check. More positive potential, stronger oxidising agent; more negative, stronger reducing agent.',
      chk: 'series-mcq',
    }),
    sl('concept', 'The Nernst equation', {
      b: r`For an electrode $\ce{M^{n+} + ne- -> M}$ and for a cell reaction with reaction quotient $Q$ (pure solids omitted), at temperature $T$ and, numerically, at $298\ \text{K}$:`,
      m: [r`E = E^\circ - \frac{2.303RT}{nF}\log\frac{1}{[\ce{M^{n+}}]} = E^\circ + \frac{0.059}{n}\log[\ce{M^{n+}}]`, r`E_\text{cell} = E^\circ_\text{cell} - \frac{0.059}{n}\log Q \quad (298\ \text{K})`],
      v: table(['Symbol', 'Value or meaning'], [['R', '8.314 J K⁻¹ mol⁻¹'], ['F', '96500 C mol⁻¹'], ['n', 'Electrons transferred'], ['2.303RT/F at 298 K', '0.059 V'], ['Q', 'Products ÷ reactants (ions only)']], 'Table of the symbols in the Nernst equation'),
      n: 'Real solutions are rarely exactly one molar, so Nernst gave an equation to correct the standard potential. For a whole cell, the voltage equals the standard voltage minus nought point nought five nine over n, times the logarithm of the reaction quotient, at twenty five degrees Celsius. The quotient is products over reactants, using concentrations of ions and leaving out pure solids.',
    }),
    sl('example', 'Worked example: emf at non-standard concentrations', {
      b: r`**Problem.** Calculate the emf at $298\ \text{K}$ of $\ce{Ni | Ni^2+ (0.01 M) || Cu^2+ (0.1 M) | Cu}$. ($E^\circ$: Cu²⁺/Cu $+0.34$, Ni²⁺/Ni $-0.25$ V)

**Step 1.** $E^\circ_\text{cell} = 0.34 - (-0.25) = 0.59\ \text{V}$; $n = 2$.

**Step 2.** $Q = [\ce{Ni^2+}] \div [\ce{Cu^2+}] = 0.01 \div 0.1 = 0.1$; $\log Q = -1$.

**Step 3.** $E_\text{cell} = 0.59 - \dfrac{0.059}{2} \times (-1) = 0.59 + 0.0295 = 0.6195\ \text{V}$.`,
      v: table(['Quantity', 'Value'], [['E°cell', '0.59 V'], ['n', '2'], ['log Q', '−1'], ['Ecell', '0.62 V']], 'Table of values in the nickel–copper Nernst example'),
      n: 'First find the standard voltage, nought point five nine volts, with two electrons transferred. The reaction quotient is the product ion, nickel, over the reactant ion, copper: nought point nought one over nought point one, which is a tenth, with a logarithm of minus one. Subtracting a negative term raises the voltage slightly, to about nought point six two volts.',
    }),
    sl('concept', 'Emf, Gibbs energy and the equilibrium constant', {
      b: r`The maximum electrical work a cell can do equals the decrease in Gibbs energy. A **positive** $E_\text{cell}$ means **negative** $\Delta G$: spontaneous. At equilibrium $E_\text{cell} = 0$ and $Q = K$.`,
      m: [r`\Delta G = -nFE_\text{cell}, \qquad \Delta G^\circ = -nFE^\circ_\text{cell}`, r`\Delta G^\circ = -2.303RT\log K \ \Rightarrow\ E^\circ_\text{cell} = \frac{0.059}{n}\log K\ (298\ \text{K})`],
      v: table(['E°cell', 'ΔG°', 'K', 'Spontaneity'], [['Positive', 'Negative', '> 1', 'Spontaneous'], ['Zero', 'Zero', '1', 'Equilibrium'], ['Negative', 'Positive', '< 1', 'Non-spontaneous']], 'Table linking E°cell, ΔG° and K'),
      n: 'A cell can do electrical work equal to the fall in its Gibbs energy, so the Gibbs energy change equals minus n F times the voltage. A positive voltage means a negative Gibbs energy change and a spontaneous reaction. When the cell is flat it is at equilibrium: the voltage is zero and the quotient equals the equilibrium constant, which gives a direct link between the standard voltage and K.',
    }),
    sl('example', 'Worked example: ΔG° and K from E°', {
      b: r`**Problem.** For $\ce{Cu(s) + 2Ag+(aq) -> Cu^2+(aq) + 2Ag(s)}$, $E^\circ_\text{cell} = 0.46\ \text{V}$. Calculate $\Delta G^\circ$ and $K$ at $298\ \text{K}$ ($F = 96500\ \text{C mol}^{-1}$).

**Step 1.** $n = 2$; $\Delta G^\circ = -2 \times 96500 \times 0.46 = -88780\ \text{J} = -88.78\ \text{kJ mol}^{-1}$.

**Step 2.** $\log K = \dfrac{2 \times 0.46}{0.059} = 15.59$.

**Step 3.** $K = 10^{15.59} \approx 3.9 \times 10^{15}$.`,
      v: table(['Quantity', 'Value'], [['ΔG°', '−88.78 kJ/mol'], ['log K', '15.59'], ['K', 'about 3.9 × 10¹⁵']], 'Table of the Gibbs energy change and equilibrium constant for the copper–silver cell'),
      n: 'Two electrons are transferred. Minus two times ninety six thousand five hundred times nought point four six gives about minus eighty nine kilojoules per mole, a clearly spontaneous reaction. For the equilibrium constant, two times nought point four six over nought point nought five nine is about fifteen point six, so K is about four times ten to the fifteen: copper reduces silver ions almost completely.',
    }),
    sl('check', 'Quick check: Nernst and ΔG', {
      b: 'Predict how the emf changes with concentration, or link the sign of E° to ΔG° and K.',
      n: 'Quick check. Increasing the reactant ion concentration lowers Q and raises the emf. A positive standard emf means a negative standard Gibbs energy change and an equilibrium constant greater than one.',
      chk: 'nernst-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'E depends on ion concentration, temperature and the nature of the electrode.',
        'Electrochemical series: more positive E°, stronger oxidant; more negative, stronger reductant.',
        r`$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$; positive → feasible.`,
        r`Nernst: $E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q$ at 298 K.`,
        r`$\Delta G^\circ = -nFE^\circ_\text{cell}$; $\log K = \dfrac{nE^\circ_\text{cell}}{0.059}$.`,
      ],
      v: table(['Relation', 'Equation'], [['Nernst (cell)', r`$E = E^\circ - \dfrac{0.059}{n}\log Q$`], ['Gibbs energy', r`$\Delta G^\circ = -nFE^\circ$`], ['Equilibrium', r`$\log K = \dfrac{nE^\circ}{0.059}$`]], 'Summary table of Part 2 relations'),
      n: 'Let us sum up Part 2. Electrode potentials depend on concentration, temperature and the metal. Arranged as a series, they tell us which substances are strong oxidising or reducing agents and whether a reaction is feasible. The Nernst equation corrects the voltage for concentration, and the standard voltage gives both the standard Gibbs energy change and the equilibrium constant.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Never multiply E° by stoichiometric coefficients.',
        'Use the same n in the Nernst equation and in ΔG° = −nFE°.',
        'Q contains ions (and gas pressures) only; omit pure solids.',
        'Report ΔG° in kJ mol⁻¹ with its sign.',
      ],
      v: table(['Slip', 'Fix'], [['Doubling E° for 2Ag⁺', 'E° is intensive'], ['Q = reactants ÷ products', 'Products ÷ reactants'], ['Positive E° → positive ΔG°', 'Positive E° → negative ΔG°']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Never multiply a standard potential by the coefficients in the equation. Keep n the same everywhere in a problem. In the reaction quotient, put products over reactants and leave out pure solids. And always report the Gibbs energy change in kilojoules with its sign.',
    }),
  ],
});

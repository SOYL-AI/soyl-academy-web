// ch02 Electrochemistry — two decks: Part 1 (t01–t02) galvanic cells, electrode potentials, Nernst equation, ΔG° and K;
// Part 2 (t03–t06) conductance, electrolysis, batteries and fuel cells, corrosion.
import { sl, deck, table, flow, svgV, plot, chem, r } from './lib.mjs';
import { DANIELL, SHE, ELECTROLYSIS, FUELCELL, RUST } from './svgs.mjs';

export const V = {
  daniell: svgV(DANIELL, 'Daniell cell with a zinc rod in zinc sulfate solution, a copper rod in blue copper sulfate solution, a salt bridge and a voltmeter; electrons flow through the wire from zinc to copper', 'Zinc is the anode (oxidation, negative); copper is the cathode (reduction, positive).'),
  she: svgV(SHE, 'Standard hydrogen electrode: platinum foil coated with platinum black in acid of hydrogen ion concentration 1 mol per litre, with hydrogen gas at 1 bar bubbled over it', 'Its electrode potential is taken as zero at all temperatures.'),
  electrolysis: svgV(ELECTROLYSIS, 'Electrolytic cell driven by a battery: cations move to the cathode joined to the negative terminal, anions move to the anode joined to the positive terminal'),
  fuelcell: svgV(FUELCELL, 'Hydrogen–oxygen fuel cell with hydrogen fed to the anode, oxygen to the cathode, an alkali electrolyte between them, water leaving at the bottom and a lamp in the external circuit'),
  rust: svgV(RUST, 'A drop of water on iron: the middle of the drop is the anode where iron dissolves, the edge is the cathode where oxygen is reduced, electrons flow through the iron, and rust forms near the edge', 'Schematic; the drop is drawn far larger than real size.'),
};

// Molar conductivity against √c: KCl (strong, Λm = 149.8 − 85√c) and ethanoic acid (weak, Ka = 1.8 × 10⁻⁵, Λ°m = 390.5).
const KA = 1.8e-5;
const alphaOf = (c) => (-KA + Math.sqrt(KA * KA + 4 * KA * c)) / (2 * c);
const roots = [0.02, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];
export const condPlot = plot(
  {
    x: { min: 0, max: 0.3, label: 'Square root of concentration' },
    y: { min: 0, max: 400, label: 'Molar conductivity (S cm² per mol)' },
    series: [
      { label: 'Potassium chloride (strong)', kind: 'line', points: [0, 0.1, 0.2, 0.3].map((s) => [s, +(149.8 - 85 * s).toFixed(1)]) },
      { label: 'Ethanoic acid (weak)', kind: 'line', points: roots.map((s) => [s, +(390.5 * alphaOf(s * s)).toFixed(1)]) },
    ],
    points: [{ at: [0, 390.5], label: 'Λ°m of ethanoic acid (not reachable by experiment)', on_curve: false }],
  },
  'Molar conductivity against the square root of concentration: potassium chloride falls along a gentle straight line from about 150; ethanoic acid is low at ordinary concentrations and rises steeply only on very great dilution towards 390.5',
  'Strong electrolyte: extrapolate the straight line to zero concentration. Weak electrolyte: the curve cannot be extrapolated, so use Kohlrausch’s law.',
);

export const deck1 = deck({
  part: 1,
  title: 'Electrochemistry — Part 1: Galvanic cells and electrode potentials',
  goals: [
    'Describe a galvanic cell, write its cell notation and identify the anode and cathode',
    'Use standard electrode potentials to calculate standard cell EMF and predict whether a reaction is feasible',
    'Apply the Nernst equation to electrodes and cells at 298 K',
    'Relate cell EMF to the Gibbs energy change and the equilibrium constant',
  ],
  slides: [
    sl('title', 'Electrochemistry', {
      b: 'Part 1 — getting electricity out of a chemical reaction, and measuring how strongly it wants to happen.',
      v: flow('LR', [['a', 'Spontaneous redox reaction'], ['b', 'Oxidation and reduction kept apart'], ['c', 'Electrons forced through a wire'], ['d', 'Electrical work']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow: a spontaneous redox reaction, with oxidation and reduction separated, sends electrons through a wire to do electrical work'),
      n: 'Namaste! Your phone, a torch, a car and even a pacemaker run on chemistry. Electrochemistry studies how chemical reactions produce electricity, and how electricity can drive reactions that would not happen by themselves. In this part we build a cell from two metals, measure electrode potentials, and see how the voltage of a cell is linked to concentration, to Gibbs energy and to the equilibrium constant.',
    }),
    sl('concept', 'Two kinds of electrochemical cell', {
      b: 'In a **galvanic (voltaic) cell** a spontaneous redox reaction produces electricity. In an **electrolytic cell** electrical energy drives a non-spontaneous reaction. In both, **oxidation occurs at the anode** and **reduction at the cathode**.',
      v: table(['', 'Galvanic cell', 'Electrolytic cell'], [['Energy change', 'Chemical → electrical', 'Electrical → chemical'], ['Reaction', 'Spontaneous', 'Non-spontaneous, driven by a battery'], ['Anode', 'Negative; oxidation', 'Positive; oxidation'], ['Cathode', 'Positive; reduction', 'Negative; reduction'], ['Example', 'Daniell cell, dry cell', 'Electroplating, refining copper']], 'Table comparing galvanic and electrolytic cells: energy change, reaction, sign and process at each electrode, and examples'),
      n: 'There are two kinds of electrochemical cell. A galvanic cell lets a spontaneous reaction push electrons through a wire, so chemical energy becomes electrical energy. An electrolytic cell does the reverse: a battery forces a reaction that would not go on its own. One rule never changes. Oxidation always happens at the anode and reduction at the cathode. Only the signs of the electrodes swap between the two kinds of cell.',
    }),
    sl('diagram', 'The Daniell cell', {
      b: 'Zinc in zinc sulfate solution and copper in copper sulfate solution are joined by a wire and a **salt bridge**. The voltmeter reads about 1.1 V when the solutions are 1 M.',
      v: V.daniell,
      n: 'Here is the classic galvanic cell, the Daniell cell. A zinc rod stands in zinc sulfate solution and a copper rod in blue copper sulfate solution. A wire joins the rods through a voltmeter, and a salt bridge joins the solutions. When both solutions are one molar, the voltmeter reads about one point one volts. Electrons leave the zinc, travel through the wire and arrive at the copper.',
    }),
    sl('concept', 'What happens in each half-cell', {
      b: r`Zinc is oxidised at the **anode**; copper ions are reduced at the **cathode**. The **salt bridge** (for example potassium chloride or ammonium nitrate in agar) completes the circuit and keeps both solutions electrically neutral.`,
      m: [r`\text{Anode: } \ce{Zn(s) -> Zn^2+(aq) + 2e-}`, r`\text{Cathode: } \ce{Cu^2+(aq) + 2e- -> Cu(s)}`, r`\text{Overall: } \ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}`],
      v: table(['Without a salt bridge', 'With a salt bridge'], [['Positive charge builds up around zinc; negative around copper', 'Ions from the bridge move to cancel the charges'], ['Current stops almost at once', 'Current flows steadily'], ['Solutions would mix if joined directly', 'Solutions stay separate']], 'Table contrasting a cell without a salt bridge, where charge builds up and current stops, with a cell with one, where ions keep the solutions neutral'),
      n: 'At the zinc rod, zinc atoms lose two electrons and go into solution as zinc ions. That is oxidation, so zinc is the anode. At the copper rod, copper ions from the solution take two electrons and coat the rod with copper. That is reduction, so copper is the cathode. The salt bridge lets ions move between the beakers, so that charge does not pile up and stop the current.',
    }),
    sl('concept', 'Writing a cell in short form', {
      b: r`Convention: **anode on the left, cathode on the right**. A single vertical line separates phases; a double line is the salt bridge. Concentrations go in brackets.`,
      m: [r`\ce{Zn(s) | Zn^2+(aq, 1 M) || Cu^2+(aq, 1 M) | Cu(s)}`, r`E_\text{cell} = E_\text{right} - E_\text{left} = E_\text{cathode} - E_\text{anode}`],
      v: table(['Symbol', 'Meaning'], [['Left electrode', 'Anode, oxidation'], ['Right electrode', 'Cathode, reduction'], ['|', 'Boundary between phases'], ['||', 'Salt bridge']], 'Table of the conventions used when writing a cell: anode on the left, cathode on the right, single line for a phase boundary, double line for a salt bridge'),
      n: 'Chemists write cells in a short form. The anode goes on the left and the cathode on the right. A single line marks a boundary between a solid and a solution, and a double line stands for the salt bridge. The cell voltage is then the potential of the right-hand electrode minus that of the left-hand electrode, that is, cathode minus anode.',
    }),
    sl('check', 'Quick check: anode or cathode?', {
      b: 'In a cell written as Mg | Mg²⁺ || Ag⁺ | Ag, decide which electrode is oxidised.',
      n: 'Quick check. Use the cell notation rule: which side is the anode, and what process always happens at the anode?',
      chk: 'notation-anode-mcq',
    }),
    sl('concept', 'Electrode potential and the reference electrode', {
      b: 'Each electrode has a tendency to gain or lose electrons, its **electrode potential**. Only differences can be measured, so every electrode is compared with the **standard hydrogen electrode (SHE)**, given a potential of exactly zero. **Standard** conditions: 1 M solutions, gases at 1 bar, 298 K.',
      m: [r`\ce{2H+(aq) + 2e- -> H2(g)} \qquad E^\circ = 0.00\ \text{V}`],
      v: table(['Electrode connected to the SHE', 'Reading', 'Meaning'], [['Copper in 1 M copper(II) ions', r`$+0.34\ \text{V}$, copper is the cathode`, 'Copper ions are reduced more easily than hydrogen ions'], ['Zinc in 1 M zinc ions', r`$-0.76\ \text{V}$, zinc is the anode`, 'Zinc is oxidised more easily than hydrogen']], 'Table showing copper with a standard potential of plus 0.34 volts and zinc with minus 0.76 volts when measured against the standard hydrogen electrode'),
      n: 'We cannot measure the potential of one electrode alone, just as we cannot measure the height of a hill without choosing sea level. So we choose a reference: the standard hydrogen electrode, given a potential of zero. Every other electrode is paired with it under standard conditions. Copper comes out at plus zero point three four volts and zinc at minus zero point seven six.',
    }),
    sl('diagram', 'The standard hydrogen electrode', {
      b: 'Hydrogen gas at 1 bar bubbles over **platinum coated with platinum black** dipping into acid with hydrogen ion concentration 1 M. Platinum carries electrons but does not react.',
      v: V.she,
      n: 'This is the reference electrode. A piece of platinum foil, coated with finely divided platinum black so that it has a large surface, dips into acid with a hydrogen ion concentration of one mole per litre. Pure hydrogen gas at one bar bubbles over it. The platinum only passes electrons in and out; the real electrode reaction is between hydrogen ions and hydrogen gas.',
    }),
    sl('concept', 'The electrochemical series', {
      b: r`Standard **reduction** potentials, listed in order. A **more positive** $E^\circ$ means the oxidised form is a **stronger oxidising agent**; a **more negative** $E^\circ$ means the metal is a **stronger reducing agent**.`,
      v: table(['Half-reaction (reduction)', r`$E^\circ$ / V`], [[r`$\ce{F2 + 2e- -> 2F-}$`, r`$+2.87$`], [r`$\ce{Cl2 + 2e- -> 2Cl-}$`, r`$+1.36$`], [r`$\ce{Ag+ + e- -> Ag}$`, r`$+0.80$`], [r`$\ce{Cu^2+ + 2e- -> Cu}$`, r`$+0.34$`], [r`$\ce{2H+ + 2e- -> H2}$`, r`$0.00$`], [r`$\ce{Ni^2+ + 2e- -> Ni}$`, r`$-0.25$`], [r`$\ce{Fe^2+ + 2e- -> Fe}$`, r`$-0.44$`], [r`$\ce{Zn^2+ + 2e- -> Zn}$`, r`$-0.76$`], [r`$\ce{Mg^2+ + 2e- -> Mg}$`, r`$-2.37$`], [r`$\ce{Li+ + e- -> Li}$`, r`$-3.05$`]], 'Table of standard reduction potentials at 298 K from fluorine at plus 2.87 volts down to lithium at minus 3.05 volts'),
      n: 'Here is a short electrochemical series, written as reductions. Fluorine at the top has the most positive value, so it grabs electrons most strongly: it is the strongest oxidising agent. Lithium at the bottom has the most negative value, so it gives electrons away most readily: it is the strongest reducing agent. A metal lower in the table can push the ions of a metal higher in the table out of solution.',
    }),
    sl('example', 'Worked example: standard EMF of a cell', {
      b: r`**Problem.** Find $E^\circ_\text{cell}$ for $\ce{Mg | Mg^2+ (1 M) || Ag+ (1 M) | Ag}$ and write the cell reaction.

**Step 1.** $E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode} = 0.80 - (-2.37) = 3.17\ \text{V}$.

**Step 2.** Balance electrons: magnesium gives 2, each silver ion takes 1.

**Step 3.** $\ce{Mg(s) + 2Ag+(aq) -> Mg^2+(aq) + 2Ag(s)}$. The positive EMF shows the reaction is spontaneous.`,
      v: table(['Electrode', r`$E^\circ$ / V`, 'Role'], [['Silver', r`$+0.80$`, 'Cathode (reduction)'], ['Magnesium', r`$-2.37$`, 'Anode (oxidation)'], [r`$E^\circ_\text{cell}$`, r`$+3.17$`, 'Spontaneous']], 'Table of the silver and magnesium standard potentials and the resulting cell EMF of plus 3.17 volts'),
      n: 'Take the cathode potential and subtract the anode potential. Silver is plus zero point eight, magnesium is minus two point three seven, so the difference is three point one seven volts. Notice that we never multiply a potential by the number of electrons; potentials are intensive. We only use the electrons to balance the overall equation: one magnesium atom reduces two silver ions.',
    }),
    sl('example', 'Worked example: can you stir it with that?', {
      b: r`**Problem.** Can silver nitrate solution be stirred with a nickel spatula? ($E^\circ$: $\ce{Ag+/Ag} = +0.80\ \text{V}$, $\ce{Ni^2+/Ni} = -0.25\ \text{V}$)

**Step 1.** Suppose nickel reacts: nickel would be the anode, silver ions the cathode.

**Step 2.** $E^\circ_\text{cell} = 0.80 - (-0.25) = 1.05\ \text{V}$, which is positive.

**Step 3.** So $\ce{Ni + 2Ag+ -> Ni^2+ + 2Ag}$ is spontaneous: the spatula would dissolve and silver would deposit. **No**, do not use it.`,
      v: flow('LR', [['a', 'Assume the reaction happens'], ['b', 'E°cell = E°cathode − E°anode'], ['c', 'Positive → reaction occurs'], ['d', 'Negative → no reaction']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow for predicting a reaction: assume it happens, calculate the cell EMF, positive means it occurs, negative means it does not'),
      n: 'To test whether a reaction happens, imagine it does, and work out the cell voltage. Nickel would be oxidised, so it is the anode; silver ions would be reduced at the cathode. The EMF is zero point eight minus minus zero point two five, which is one point zero five volts. A positive EMF means the reaction is spontaneous, so the nickel spatula would be eaten away.',
    }),
    sl('concept', 'Using the series to predict', {
      b: 'A metal with a lower (more negative) reduction potential displaces a metal ion with a higher one. Metals below hydrogen release hydrogen from dilute acids; metals above it do not.',
      v: table(['Question', 'Answer from the series'], [['Does zinc displace copper from copper sulfate?', 'Yes: zinc is lower'], ['Does copper react with dilute hydrochloric acid?', 'No: copper is above hydrogen'], ['Can chlorine oxidise bromide ions?', 'Yes: chlorine is higher than bromine'], ['Which is the stronger reducing agent, iron or magnesium?', 'Magnesium (more negative)']], 'Table of four predictions made from the electrochemical series about displacement, reaction with acid, oxidation of bromide and reducing strength'),
      n: 'The series turns into a quick prediction tool. A metal that sits lower in the list, with a more negative potential, will displace the ions of a metal sitting higher. Metals with negative potentials push hydrogen out of dilute acids; copper and silver, with positive potentials, do not. In the same way, chlorine can pull electrons from bromide ions, because chlorine sits higher.',
    }),
    sl('check', 'Quick check: strongest reducing agent', {
      b: 'Use the table of standard reduction potentials to pick the strongest reducing agent.',
      n: 'Quick check. A reducing agent gives away electrons. Look for the species that gives up electrons most readily: which end of the table is it at?',
      chk: 'reducing-agent-mcq',
    }),
    sl('concept', 'The Nernst equation for an electrode', {
      b: r`Electrode potentials change with concentration. For $\ce{M^{n+}(aq) + ne- -> M(s)}$, at $298\ \text{K}$:`,
      m: [r`E = E^\circ - \dfrac{2.303RT}{nF}\log\dfrac{1}{[\ce{M^{n+}}]} = E^\circ - \dfrac{0.059}{n}\log\dfrac{1}{[\ce{M^{n+}}]}`],
      v: table(['Symbol', 'Meaning'], [[r`$R$`, r`$8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$`], [r`$F$`, r`Faraday constant, $96500\ \text{C mol}^{-1}$`], [r`$n$`, 'Electrons in the half-reaction'], [r`$\dfrac{2.303RT}{F}$`, r`$0.059\ \text{V}$ at $298\ \text{K}$`]], 'Table of the symbols in the Nernst equation, with 2.303 RT over F equal to 0.059 volts at 298 kelvin'),
      n: 'Standard potentials apply only at one molar. Real solutions are seldom exactly one molar, so Walther Nernst gave an equation to correct the potential. The correction term contains the gas constant, the temperature, the number of electrons and the Faraday constant, which is the charge on one mole of electrons. At twenty five degrees Celsius the whole group of constants becomes zero point zero five nine volts.',
    }),
    sl('concept', 'The Nernst equation for a cell', {
      b: r`For a cell reaction $\ce{aA + bB -> cC + dD}$ with $n$ electrons transferred, $Q$ is the reaction quotient (pure solids are left out).`,
      m: [r`E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q`, r`\text{Daniell: } E_\text{cell} = 1.10 - \dfrac{0.059}{2}\log\dfrac{[\ce{Zn^2+}]}{[\ce{Cu^2+}]}`],
      v: table(['Change', 'Effect on Daniell cell EMF'], [['More copper ions (product side smaller Q)', 'EMF rises'], ['More zinc ions (larger Q)', 'EMF falls'], ['Cell runs until equilibrium', 'EMF falls to zero (battery is flat)']], 'Table of how changing the copper and zinc ion concentrations changes the EMF of the Daniell cell, falling to zero at equilibrium'),
      n: 'For a whole cell, the Nernst equation uses the reaction quotient, which is products over reactants, leaving out pure solids. For the Daniell cell that is zinc ion concentration over copper ion concentration. If you increase copper ions, the quotient falls and the voltage rises. As the cell runs, zinc ions build up and copper ions are used, so the voltage falls, reaching zero at equilibrium.',
    }),
    sl('example', 'Worked example: EMF at non-standard concentrations', {
      b: r`**Problem.** Find the EMF at $298\ \text{K}$ of $\ce{Zn | Zn^2+ (0.01 M) || Cu^2+ (1.0 M) | Cu}$, given $E^\circ_\text{cell} = 1.10\ \text{V}$.

**Step 1.** $n = 2$; $Q = \dfrac{[\ce{Zn^2+}]}{[\ce{Cu^2+}]} = \dfrac{0.01}{1.0} = 0.01$, so $\log Q = -2$.

**Step 2.** $E_\text{cell} = 1.10 - \dfrac{0.059}{2} \times (-2) = 1.10 + 0.059 = 1.159\ \text{V}$.`,
      v: table(['Quantity', 'Value'], [[r`$n$`, r`$2$`], [r`$Q$`, r`$0.01$`], [r`$\log Q$`, r`$-2$`], [r`$E_\text{cell}$`, r`$1.159\ \text{V}$`]], 'Table of n equal to 2, Q equal to 0.01, log Q equal to minus 2, and the cell EMF of 1.159 volts'),
      n: 'Two electrons move in the Daniell reaction, so n is two. The quotient is zero point zero one over one, and its logarithm is minus two. Zero point zero five nine over two, times minus two, is minus zero point zero five nine, and subtracting a negative adds it. The EMF rises to about one point one six volts, because the product ions are scarce.',
    }),
    sl('example', 'Worked example: pH from a hydrogen electrode', {
      b: r`**Problem.** A hydrogen electrode ($p_{\ce{H2}} = 1\ \text{bar}$) dipped in an acid solution has a potential of $-0.177\ \text{V}$ at $298\ \text{K}$. Find the pH.

**Step 1.** For $\ce{2H+ + 2e- -> H2}$: $E = 0 - \dfrac{0.059}{2}\log\dfrac{1}{[\ce{H+}]^2} = -0.059\,\text{pH}$.

**Step 2.** $\text{pH} = \dfrac{0.177}{0.059} = 3$.`,
      v: table(['pH', r`$E$ of hydrogen electrode / V`], [['0', r`$0.000$`], ['3', r`$-0.177$`], ['7', r`$-0.413$`]], 'Table of hydrogen electrode potential against pH: zero at pH 0, minus 0.177 volts at pH 3 and minus 0.413 volts at pH 7'),
      n: 'A hydrogen electrode is really a pH sensor. Applying Nernst with two electrons and the square of the hydrogen ion concentration, the potential works out to minus zero point zero five nine times the pH. A reading of minus zero point one seven seven volts therefore means a pH of three. Each step of one pH unit shifts the potential by fifty nine millivolts.',
    }),
    sl('concept', 'Cell EMF, Gibbs energy and equilibrium', {
      b: r`The electrical work a cell can do equals the decrease in Gibbs energy. A **positive** $E_\text{cell}$ means a **negative** $\Delta G$: a spontaneous reaction. At equilibrium $E_\text{cell} = 0$, which links $E^\circ_\text{cell}$ to $K$.`,
      m: [r`\Delta_\text{r}G = -nFE_\text{cell}, \qquad \Delta_\text{r}G^\circ = -nFE^\circ_\text{cell}`, r`E^\circ_\text{cell} = \dfrac{0.059}{n}\log K \quad (298\ \text{K})`],
      v: table([r`$E^\circ_\text{cell}$`, r`$\Delta_\text{r}G^\circ$`, r`$K$`, 'Reaction'], [['Positive', 'Negative', 'Greater than 1', 'Spontaneous, products favoured'], ['Zero', 'Zero', 'Equal to 1', 'At equilibrium'], ['Negative', 'Positive', 'Less than 1', 'Non-spontaneous']], 'Table linking the sign of the standard cell EMF to the sign of the standard Gibbs energy change and the size of the equilibrium constant'),
      n: 'A cell can do electrical work equal to the fall in its Gibbs energy. So Gibbs energy change equals minus n times the Faraday constant times the cell EMF. A positive EMF means a negative Gibbs energy change and a spontaneous reaction. Because the EMF is zero at equilibrium, the standard EMF also tells us the equilibrium constant: a positive standard EMF of even one volt gives an enormous constant.',
    }),
    sl('example', 'Worked example: ΔG° and K for the Daniell cell', {
      b: r`**Problem.** For the Daniell cell, $E^\circ_\text{cell} = 1.10\ \text{V}$ and $n = 2$. Find $\Delta_\text{r}G^\circ$ and $K$ at $298\ \text{K}$. ($F = 96500\ \text{C mol}^{-1}$)

**Step 1.** $\Delta_\text{r}G^\circ = -2 \times 96500 \times 1.10 = -212300$, so $-212.3\ \text{kJ mol}^{-1}$.

**Step 2.** $\log K = \dfrac{2 \times 1.10}{0.059} \approx 37.29$.

**Step 3.** $K \approx 1.9 \times 10^{37}$: the reaction goes essentially to completion.`,
      v: table(['Quantity', 'Value'], [[r`$\Delta_\text{r}G^\circ$`, r`$-212.3\ \text{kJ mol}^{-1}$`], [r`$\log K$`, r`$\approx 37.29$`], [r`$K$`, r`$\approx 1.9 \times 10^{37}$`]], 'Table of the results: standard Gibbs energy change minus 212.3 kilojoules per mole and equilibrium constant about 1.9 times ten to the power 37'),
      n: 'Multiply minus two by the Faraday constant by one point one zero, and you get about minus two hundred and twelve kilojoules per mole. That large negative value shows a very favourable reaction. For the equilibrium constant, two times one point one over zero point zero five nine is about thirty seven point three, so the constant is about ten to the power thirty seven. Zinc removes copper ions almost completely.',
    }),
    sl('check', 'Quick check: signs', {
      b: 'A cell has a negative standard EMF. Decide what this means for the Gibbs energy change and the equilibrium constant.',
      n: 'Quick check. Use the relation between Gibbs energy and EMF, remembering the minus sign, and then think about what a positive Gibbs energy change means for the equilibrium constant.',
      chk: 'negative-emf-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Galvanic cell: spontaneous redox → electricity; anode (oxidation) negative, cathode (reduction) positive.',
        'Salt bridge completes the circuit and keeps solutions neutral.',
        r`$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$; potentials are never multiplied by stoichiometric coefficients.`,
        'More positive E° → stronger oxidising agent; more negative → stronger reducing agent.',
        r`Nernst: $E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q$ at 298 K.`,
        r`$\Delta_\text{r}G^\circ = -nFE^\circ_\text{cell}$; $\log K = \dfrac{nE^\circ_\text{cell}}{0.059}$.`,
      ],
      v: table(['Relation', 'Equation'], [['Cell EMF', r`$E^\circ_\text{cell} = E^\circ_\text{R} - E^\circ_\text{L}$`], ['Nernst', r`$E = E^\circ - \dfrac{0.059}{n}\log Q$`], ['Gibbs energy', r`$\Delta G^\circ = -nFE^\circ$`], ['Equilibrium', r`$\log K = \dfrac{nE^\circ}{0.059}$`]], 'Summary table of the cell EMF, Nernst, Gibbs energy and equilibrium constant relations'),
      n: 'Let us sum up Part 1. A galvanic cell turns a spontaneous redox reaction into electricity, with oxidation at the anode and reduction at the cathode. The standard EMF is the cathode potential minus the anode potential. The Nernst equation corrects for concentration. And the EMF is tied to the Gibbs energy change and to the equilibrium constant, so one measurement of voltage tells us a lot about a reaction.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Never multiply E° by the number of electrons when balancing a cell reaction.',
        'Write the anode on the left in cell notation; check that E°cell comes out positive for a working cell.',
        'In the Nernst equation, Q is products over reactants; leave out pure solids and liquids.',
        'Keep n the same in the Nernst equation and in ΔG° = −nFE°.',
        'Give ΔG° in kJ mol⁻¹ by dividing joules by 1000, and keep the minus sign.',
      ],
      v: table(['Slip', 'Fix'], [['Doubling E° for 2 Ag⁺', 'E° is intensive: do not multiply'], ['Q written as reactants over products', 'Products over reactants'], ['Forgetting the sign of ΔG°', 'Positive E° means negative ΔG°']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'A few exam tips. Electrode potentials are never multiplied by the number of electrons, even when you double an equation. In cell notation, write the anode on the left. In the Nernst equation, the quotient is products over reactants, and pure solids are left out. Use the same n everywhere. And when you report a Gibbs energy change, convert joules to kilojoules and keep the minus sign.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electrochemistry — Part 2: Conductance, electrolysis, batteries and corrosion',
  goals: [
    'Define conductivity and molar conductivity and explain how they vary with concentration',
    'Apply Kohlrausch’s law to find limiting molar conductivities and the degree of dissociation of weak electrolytes',
    'Apply Faraday’s laws and predict the products of electrolysis',
    'Describe primary and secondary batteries and the hydrogen–oxygen fuel cell, and explain corrosion and its prevention',
  ],
  slides: [
    sl('title', 'Ions on the move', {
      b: 'Part 2 — how solutions conduct, how electricity makes new substances, how batteries store energy and why iron rusts.',
      v: flow('LR', [['a', 'Ions carry current'], ['b', 'Conductance measured'], ['c', 'Electrolysis makes products'], ['d', 'Batteries and fuel cells'], ['e', 'Corrosion']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the topics in Part 2: ions carry current, conductance, electrolysis, batteries and fuel cells, corrosion'),
      n: 'In Part 2 the ions take centre stage. In a metal wire electrons carry the current, but in a solution ions do. We will measure how well a solution conducts, use conductance to study weak acids, apply Faraday’s laws to electrolysis, look inside batteries and fuel cells, and finally see why an iron gate rusts and how we can stop it.',
    }),
    sl('concept', 'Resistance, conductance and conductivity', {
      b: r`Resistance $R = \rho \dfrac{l}{A}$. Its reciprocal is **conductance** $G$ (unit siemens, S). The reciprocal of resistivity is **conductivity** $\kappa$ (kappa): the conductance of a solution between electrodes $1\ \text{cm}^2$ in area and $1\ \text{cm}$ apart.`,
      m: [r`G = \dfrac{1}{R}, \qquad \kappa = \dfrac{1}{\rho} = \dfrac{1}{R}\cdot\dfrac{l}{A}`],
      v: table(['Quantity', 'Symbol', 'Unit'], [['Resistance', r`$R$`, r`$\Omega$`], ['Resistivity', r`$\rho$`, r`$\Omega\ \text{cm}$`], ['Conductance', r`$G$`, r`$\text{S}$ ($= \Omega^{-1}$)`], ['Conductivity', r`$\kappa$`, r`$\text{S cm}^{-1}$`], ['Cell constant', r`$G^* = \dfrac{l}{A}$`, r`$\text{cm}^{-1}$`]], 'Table of resistance, resistivity, conductance, conductivity and cell constant with their symbols and units'),
      n: 'A solution resists current just as a wire does. Its resistance depends on the length between the electrodes and on their area. Conductance is simply one over resistance and is measured in siemens. Conductivity, written with the Greek letter kappa, is the conductance of a cube of solution one centimetre on each side. It depends on the electrolyte, its concentration and the temperature.',
    }),
    sl('concept', 'Measuring conductivity: the cell constant', {
      b: r`A **conductivity cell** has two platinised platinum electrodes a fixed distance apart. Its **cell constant** $G^* = \dfrac{l}{A}$ is found once using a potassium chloride solution of known $\kappa$. Alternating current is used, so that the solution is not electrolysed.`,
      m: [r`\kappa = \dfrac{G^*}{R}`],
      v: flow('LR', [['a', 'Fill cell with standard KCl solution'], ['b', 'Measure R; find G* = κ × R'], ['c', 'Fill with test solution'], ['d', 'Measure R; κ = G* ÷ R']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for using a conductivity cell: calibrate with standard potassium chloride to find the cell constant, then measure the test solution'),
      n: 'We cannot measure the length and area inside a real conductivity cell accurately, so we calibrate it. First we fill it with a potassium chloride solution whose conductivity is known, measure the resistance, and find the cell constant. After that, any solution’s conductivity is the cell constant divided by its resistance. Alternating current is used, so that no electrolysis happens at the electrodes during measurement.',
    }),
    sl('concept', 'Molar conductivity', {
      b: r`To compare electrolytes fairly, divide conductivity by concentration. **Molar conductivity** $\Lambda_\text{m}$ is the conductance of all the ions from one mole of electrolyte between electrodes 1 cm apart.`,
      m: [r`\Lambda_\text{m} = \dfrac{\kappa}{c}, \qquad \Lambda_\text{m}\ (\text{S cm}^2\ \text{mol}^{-1}) = \dfrac{\kappa\ (\text{S cm}^{-1}) \times 1000}{c\ (\text{mol L}^{-1})}`],
      v: table(['On dilution', 'Conductivity κ', 'Molar conductivity Λm'], [['What changes', 'Fewer ions per cm³', 'Ions from one mole spread over more volume'], ['Trend', 'Decreases', 'Increases'], ['Reason', 'Fewer charge carriers in each unit volume', 'Ions move more freely; weak electrolytes dissociate more']], 'Table: on dilution conductivity decreases because there are fewer ions per unit volume, while molar conductivity increases'),
      n: 'Conductivity alone is not a fair way to compare electrolytes, because a stronger solution simply has more ions. So we divide by concentration and get the molar conductivity. Watch the units: with conductivity per centimetre and concentration per litre, we multiply by one thousand. On dilution, conductivity falls, as there are fewer ions in each cubic centimetre, but molar conductivity rises.',
    }),
    sl('example', 'Worked example: conductivity and molar conductivity', {
      b: r`**Problem.** A conductivity cell with cell constant $1.30\ \text{cm}^{-1}$ shows a resistance of $520\ \Omega$ when filled with $0.020\ \text{M}$ sodium chloride. Find $\kappa$ and $\Lambda_\text{m}$.

**Step 1.** $\kappa = \dfrac{G^*}{R} = \dfrac{1.30}{520} = 0.0025$, so $2.5 \times 10^{-3}\ \text{S cm}^{-1}$.

**Step 2.** $\Lambda_\text{m} = \dfrac{0.0025 \times 1000}{0.020} = 125$, so $125\ \text{S cm}^2\ \text{mol}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['Cell constant', r`$1.30\ \text{cm}^{-1}$`], ['Resistance', r`$520\ \Omega$`], [r`$\kappa$`, r`$2.5 \times 10^{-3}\ \text{S cm}^{-1}$`], [r`$\Lambda_\text{m}$`, r`$125\ \text{S cm}^2\ \text{mol}^{-1}$`]], 'Table of the data and results: cell constant 1.30, resistance 520 ohm, conductivity 0.0025 siemens per centimetre and molar conductivity 125'),
      n: 'Divide the cell constant by the resistance: one point three over five hundred and twenty is two point five thousandths of a siemens per centimetre. For molar conductivity, multiply by one thousand and divide by the concentration, zero point zero two. The answer is one hundred and twenty five siemens square centimetre per mole. Always write the unit; it is part of the mark.',
    }),
    sl('diagram', 'Strong and weak electrolytes on dilution', {
      b: r`**Strong** electrolytes: $\Lambda_\text{m}$ rises gently and linearly with dilution, $\Lambda_\text{m} = \Lambda^\circ_\text{m} - A\sqrt{c}$, so $\Lambda^\circ_\text{m}$ is found by extrapolation. **Weak** electrolytes: $\Lambda_\text{m}$ is low and rises steeply only at very low concentration, as dissociation increases; $\Lambda^\circ_\text{m}$ cannot be found by extrapolation.`,
      v: condPlot,
      n: 'Look at the two curves. For potassium chloride, a strong electrolyte, the molar conductivity falls in a nearly straight line as the square root of concentration rises, so we can extend the line back to zero concentration to find the limiting value. Ethanoic acid, a weak electrolyte, has a low molar conductivity that shoots up only on great dilution. Its limiting value cannot be read off the graph.',
    }),
    sl('concept', 'Kohlrausch’s law', {
      b: r`**Kohlrausch’s law of independent migration of ions:** the limiting molar conductivity of an electrolyte is the sum of the limiting molar conductivities of its cation and anion, each multiplied by the number of that ion in the formula.`,
      m: [r`\Lambda^\circ_\text{m} = \nu_+ \lambda^\circ_+ + \nu_- \lambda^\circ_-`],
      v: table(['Ion', r`$\lambda^\circ$ / S cm² mol⁻¹`, 'Ion', r`$\lambda^\circ$ / S cm² mol⁻¹`], [[r`$\ce{H+}$`, r`$349.6$`, r`$\ce{OH-}$`, r`$199.1$`], [r`$\ce{Na+}$`, r`$50.1$`, r`$\ce{Cl-}$`, r`$76.3$`], [r`$\ce{K+}$`, r`$73.5$`, r`$\ce{HCOO-}$`, r`$54.6$`], [r`$\ce{NH4+}$`, r`$73.5$`, r`$\ce{CH3COO-}$`, r`$40.9$`], [r`$\ce{Ca^2+}$`, r`$119.0$`, r`$\ce{SO4^2-}$`, r`$160.0$`]], 'Table of limiting molar conductivities of ions at 298 K, from hydrogen ion 349.6 and hydroxide 199.1 to ethanoate 40.9'),
      n: 'Kohlrausch noticed that at infinite dilution each ion moves independently and makes its own fixed contribution. So the limiting molar conductivity of any electrolyte is just the sum of its ions’ contributions, each multiplied by how many of that ion the formula contains. Notice how large the values for hydrogen and hydroxide ions are: they move by a special hopping process through water.',
    }),
    sl('example', 'Worked example: Λ°m of a weak base by Kohlrausch’s law', {
      b: r`**Problem.** $\Lambda^\circ_\text{m}$ of $\ce{NH4Cl}$, $\ce{NaOH}$ and $\ce{NaCl}$ are $149.8$, $249.2$ and $126.4\ \text{S cm}^2\ \text{mol}^{-1}$. Find $\Lambda^\circ_\text{m}$ of $\ce{NH4OH}$.

**Step 1.** $\Lambda^\circ(\ce{NH4OH}) = \lambda^\circ(\ce{NH4+}) + \lambda^\circ(\ce{OH-}) = \Lambda^\circ(\ce{NH4Cl}) + \Lambda^\circ(\ce{NaOH}) - \Lambda^\circ(\ce{NaCl})$.

**Step 2.** $= 149.8 + 249.2 - 126.4 = 272.6$, so $272.6\ \text{S cm}^2\ \text{mol}^{-1}$.`,
      v: flow('LR', [['a', 'NH₄Cl: NH₄⁺ + Cl⁻'], ['b', '+ NaOH: Na⁺ + OH⁻'], ['c', '− NaCl: Na⁺ + Cl⁻'], ['d', '= NH₄⁺ + OH⁻']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing that adding the values for ammonium chloride and sodium hydroxide and subtracting sodium chloride leaves ammonium plus hydroxide'),
      n: 'We cannot measure the limiting value for ammonium hydroxide directly because it is weak. But we can combine three strong electrolytes. Ammonium chloride plus sodium hydroxide gives ammonium, chloride, sodium and hydroxide. Subtracting sodium chloride removes the sodium and the chloride, leaving exactly ammonium and hydroxide. The answer is about two hundred and seventy three.',
    }),
    sl('example', 'Worked example: degree of dissociation and Ka', {
      b: r`**Problem.** A $0.025\ \text{M}$ methanoic acid ($\ce{HCOOH}$) solution has $\Lambda_\text{m} = 33.0\ \text{S cm}^2\ \text{mol}^{-1}$. Using the ion values in the table, find $\alpha$ and $K_\text{a}$.

**Step 1.** $\Lambda^\circ_\text{m} = 349.6 + 54.6 = 404.2\ \text{S cm}^2\ \text{mol}^{-1}$.

**Step 2.** $\alpha = \dfrac{\Lambda_\text{m}}{\Lambda^\circ_\text{m}} = \dfrac{33.0}{404.2} \approx 0.0816$.

**Step 3.** $K_\text{a} = \dfrac{c\alpha^2}{1 - \alpha} \approx \dfrac{0.025 \times 0.0816^2}{0.918} \approx 1.81 \times 10^{-4}$.`,
      v: table(['Quantity', 'Value'], [[r`$\Lambda^\circ_\text{m}$`, r`$404.2$`], [r`$\alpha$`, r`$\approx 0.0816$`], [r`$K_\text{a}$`, r`$\approx 1.81 \times 10^{-4}$`]], 'Table of results for methanoic acid: limiting molar conductivity 404.2, degree of dissociation about 0.082 and acid constant about 1.8 times ten to the minus 4'),
      n: 'For a weak acid, the ratio of the measured molar conductivity to the limiting value is the fraction of molecules that have split into ions. Kohlrausch gives the limit as hydrogen ion plus methanoate, four hundred and four point two. Dividing thirty three by that gives about eight percent dissociation. Putting this into the expression for the acid constant gives about one point eight times ten to the minus four.',
    }),
    sl('check', 'Quick check: dilution', {
      b: 'A solution of a strong electrolyte is diluted. Decide what happens to κ and to Λm.',
      n: 'Quick check. Think separately about the number of ions in each cubic centimetre and about how freely the ions from one mole can move.',
      chk: 'dilution-trend-mcq',
    }),
    sl('diagram', 'Electrolysis', {
      b: 'In an **electrolytic cell** a battery pushes electrons into the **cathode**, where cations are reduced, and pulls them out of the **anode**, where anions (or the anode metal) are oxidised.',
      v: V.electrolysis,
      n: 'Now we reverse the process and use electricity to cause a reaction. The battery pumps electrons into one electrode, the cathode, which becomes negative and attracts the cations; they gain electrons and are reduced. The other electrode, the anode, is positive; anions give up electrons there and are oxidised. Electroplating, refining of copper and the production of sodium and chlorine all use electrolysis.',
    }),
    sl('concept', 'Faraday’s laws of electrolysis', {
      b: r`**First law:** the mass of substance deposited or liberated is proportional to the charge passed, $m = ZIt$. **Second law:** for the same charge, masses of different substances are proportional to their molar masses divided by the number of electrons per ion. One mole of electrons carries **1 faraday**, $F \approx 96500\ \text{C mol}^{-1}$.`,
      m: [r`Q = It, \qquad \text{moles of } e^- = \dfrac{Q}{F}, \qquad m = \dfrac{Q}{nF} \times M`],
      v: table(['Half-reaction', 'Faradays per mole of product'], [[r`$\ce{Ag+ + e- -> Ag}$`, '1'], [r`$\ce{Cu^2+ + 2e- -> Cu}$`, '2'], [r`$\ce{Al^3+ + 3e- -> Al}$`, '3'], [r`$\ce{2Cl- -> Cl2 + 2e-}$`, '2']], 'Table of the number of faradays needed per mole of silver, copper, aluminium and chlorine'),
      n: 'Michael Faraday found two simple rules. The mass of product is proportional to the charge passed, which is current times time. And one mole of electrons, a charge of about ninety six thousand five hundred coulombs called one faraday, deposits one mole of silver, half a mole of copper or a third of a mole of aluminium, because those ions need one, two or three electrons each.',
    }),
    sl('example', 'Worked example: silver plating', {
      b: r`**Problem.** A spoon is silver-plated using a current of $0.50\ \text{A}$ for $1930\ \text{s}$. What mass of silver is deposited? ($\ce{Ag+ + e- -> Ag}$, $M = 108\ \text{g mol}^{-1}$)

**Step 1.** $Q = It = 0.50 \times 1930 = 965$, so $965\ \text{C}$.

**Step 2.** Moles of electrons $= \dfrac{965}{96500} = 0.01$, so $0.01\ \text{mol}$ of silver.

**Step 3.** Mass $= 0.01 \times 108 = 1.08$, so $1.08\ \text{g}$ of silver.`,
      v: flow('LR', [['a', 'Q = I × t'], ['b', 'mol e⁻ = Q ÷ F'], ['c', 'mol product = mol e⁻ ÷ n'], ['d', 'mass = mol × M']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for a Faraday’s law calculation: charge from current and time, moles of electrons, moles of product, mass'),
      n: 'First find the charge: half an ampere for one thousand nine hundred and thirty seconds is nine hundred and sixty five coulombs. Divide by the Faraday constant to get one hundredth of a mole of electrons. Each silver ion needs one electron, so one hundredth of a mole of silver is deposited. At one hundred and eight grams per mole, that is one point zero eight grams.',
    }),
    sl('concept', 'Predicting the products of electrolysis', {
      b: 'Products depend on the state of the electrolyte, the electrodes and the electrode potentials. In water, water itself may be reduced or oxidised instead of the ions. Some reactions are slower than their E° suggests and need an extra voltage, the **overpotential**; this is why chlorine, not oxygen, forms from concentrated brine.',
      v: table(['Electrolyte (electrodes)', 'Cathode product', 'Anode product'], [['Molten sodium chloride (inert)', 'Sodium', 'Chlorine'], ['Concentrated aqueous sodium chloride (inert)', 'Hydrogen (water is reduced)', 'Chlorine (overpotential of oxygen)'], ['Dilute sulfuric acid (platinum)', 'Hydrogen', 'Oxygen'], ['Concentrated sulfuric acid (platinum)', 'Hydrogen', r`Peroxodisulfate ions, $\ce{S2O8^2-}$`], ['Copper sulfate (copper electrodes)', 'Copper deposits', 'Copper anode dissolves'], ['Copper sulfate (platinum)', 'Copper', 'Oxygen']], 'Table of electrolysis products at the cathode and anode for molten and aqueous sodium chloride, dilute and concentrated sulfuric acid, and copper sulfate with copper or platinum electrodes'),
      n: 'Which products form? With molten sodium chloride there is no water, so sodium forms at the cathode and chlorine at the anode. In aqueous solution, water competes. Water is reduced more easily than sodium ions, so hydrogen forms at the cathode. At the anode, oxygen should form in theory, but it needs a large overpotential, so chlorine forms from concentrated brine. With copper electrodes, the copper anode itself dissolves.',
    }),
    sl('check', 'Quick check: products from brine', {
      b: 'Decide which gas is produced at the cathode when concentrated sodium chloride solution is electrolysed with inert electrodes.',
      n: 'Quick check. Compare how easily sodium ions and water molecules are reduced at the cathode.',
      chk: 'brine-cathode-mcq',
    }),
    sl('concept', 'Batteries: primary and secondary', {
      b: 'A **primary** battery cannot be recharged: its reaction runs once. A **secondary** battery can be recharged by passing current in the opposite direction.',
      v: table(['Battery', 'Type', 'Anode', 'Cathode / electrolyte', 'Voltage'], [['Dry cell (Leclanché)', 'Primary', 'Zinc container', 'Carbon rod with manganese dioxide; ammonium chloride and zinc chloride paste', 'About 1.5 V'], ['Mercury cell', 'Primary', 'Zinc–mercury amalgam', 'Paste of mercury(II) oxide and carbon; potassium hydroxide and zinc oxide', 'About 1.35 V, constant'], ['Lead storage battery', 'Secondary', 'Lead', 'Lead dioxide; about 38% sulfuric acid', 'About 2 V per cell'], ['Nickel–cadmium', 'Secondary', 'Cadmium', 'Nickel(III) oxide-hydroxide; alkali', 'About 1.2 V']], 'Table of the dry cell, mercury cell, lead storage battery and nickel cadmium cell with their type, anode, cathode and electrolyte, and voltage'),
      n: 'Batteries come in two families. A primary battery, like the dry cell in a television remote, runs its reaction once and is then thrown away. The mercury cell, used in hearing aids and watches, gives a very steady voltage because no ions in solution change concentration during its life. A secondary battery, like the lead storage battery in a car, can be recharged again and again.',
    }),
    sl('concept', 'The lead storage battery', {
      b: r`On **discharge**, both electrodes turn into lead sulfate and the sulfuric acid is used up, so its density falls. On **charging**, the reaction is reversed by an external supply.`,
      m: [r`\text{Anode: } \ce{Pb + SO4^2- -> PbSO4 + 2e-}`, r`\text{Cathode: } \ce{PbO2 + SO4^2- + 4H+ + 2e- -> PbSO4 + 2H2O}`],
      v: chem('Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O', 'Overall discharge reaction of the lead storage battery: lead plus lead dioxide plus two sulfuric acid gives two lead sulfate plus two water', 'Charging drives this reaction from right to left.'),
      n: 'In a car battery, lead is the anode and lead dioxide is the cathode, both dipping in sulfuric acid. As the battery delivers current, both plates become coated with lead sulfate and the acid is used up, so the liquid becomes less dense. A mechanic can check the charge by measuring this density. When the engine runs, the alternator pushes current back and reverses the reaction.',
    }),
    sl('diagram', 'Fuel cells', {
      b: r`A **fuel cell** turns the energy of burning a fuel directly into electricity, with reactants fed in continuously. In the hydrogen–oxygen cell (used in spacecraft) the only product is water; efficiency is about 70%, compared with about 40% for a thermal power plant.`,
      v: V.fuelcell,
      m: [r`\text{Anode: } \ce{2H2(g) + 4OH-(aq) -> 4H2O(l) + 4e-}`, r`\text{Cathode: } \ce{O2(g) + 2H2O(l) + 4e- -> 4OH-(aq)}`, r`\text{Overall: } \ce{2H2(g) + O2(g) -> 2H2O(l)}`],
      n: 'A fuel cell is a galvanic cell that never runs down as long as fuel is supplied. Hydrogen is oxidised at one porous electrode and oxygen is reduced at the other, with hot alkali in between. The overall reaction is just hydrogen burning to water, but without a flame, so far more of the energy comes out as electricity. Spacecraft have used such cells and drunk the water they make.',
    }),
    sl('diagram', 'Corrosion is an electrochemical cell', {
      b: 'On a moist iron surface, one region acts as an **anode** where iron is oxidised, and another as a **cathode** where oxygen is reduced. Iron(II) ions are then oxidised further and form **rust**, hydrated iron(III) oxide.',
      v: V.rust,
      m: [r`\ce{2Fe(s) + O2(g) + 4H+(aq) -> 2Fe^2+(aq) + 2H2O(l)}`],
      n: 'Rusting is a tiny galvanic cell on the surface of iron. Under a drop of water, iron in one spot gives up electrons and dissolves. The electrons travel through the metal to another spot where oxygen from the air takes them, helped by hydrogen ions from dissolved carbon dioxide. The dissolved iron ions are oxidised further by air and form flaky, hydrated iron oxide: rust. Salt water speeds it up.',
    }),
    sl('concept', 'Preventing corrosion', {
      b: 'Corrosion is stopped by keeping oxygen and water away, or by making something else be oxidised instead of the iron.',
      v: table(['Method', 'How it works', 'Example'], [['Barrier', 'Paint, oil, grease or plastic keeps out air and water', 'Painted iron gates, oiled tools'], ['Galvanising', 'Zinc coating; zinc is more reactive and corrodes first even when scratched', 'Galvanised buckets and roofing sheets'], ['Sacrificial anode', 'A block of a more active metal is joined to the iron and corrodes instead', 'Magnesium blocks on ship hulls and buried pipelines'], ['Anti-rust solutions', 'Chemicals such as phosphates form a protective layer', 'Car body treatments']], 'Table of four methods to prevent corrosion: barrier coatings, galvanising, sacrificial anodes and anti-rust solutions, with how each works and examples'),
      n: 'To stop rusting, we either shut out water and air, or make another metal corrode first. Paint and oil are simple barriers, but a scratch lets rust start. Galvanising coats iron with zinc, which has a more negative potential, so zinc is oxidised first even where the coat is broken. Ships and buried pipelines carry blocks of magnesium that slowly dissolve, sacrificing themselves to protect the steel.',
    }),
    sl('check', 'Quick check: sacrificial protection', {
      b: 'Choose a metal that could protect an iron pipeline as a sacrificial anode.',
      n: 'Quick check. A sacrificial anode must be oxidised more easily than iron. Look for a metal with a more negative standard reduction potential.',
      chk: 'sacrificial-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`$\kappa = G^*/R$; $\Lambda_\text{m} = \kappa \times 1000 / c$ in $\text{S cm}^2\ \text{mol}^{-1}$.`,
        'On dilution κ decreases and Λm increases; strong electrolytes follow Λm = Λ°m − A√c.',
        r`Kohlrausch: $\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-$; for a weak electrolyte $\alpha = \Lambda_\text{m}/\Lambda^\circ_\text{m}$.`,
        r`Faraday: $m = \dfrac{ItM}{nF}$; $1\ F \approx 96500\ \text{C mol}^{-1}$.`,
        'Primary cells (dry, mercury) are not rechargeable; secondary cells (lead storage, nickel–cadmium) are.',
        'Fuel cells convert fuel energy directly into electricity; corrosion is an electrochemical process prevented by barriers or sacrificial metals.',
      ],
      v: table(['Idea', 'Key relation'], [['Conductivity', r`$\kappa = G^*/R$`], ['Molar conductivity', r`$\Lambda_\text{m} = \kappa \times 1000/c$`], ['Kohlrausch', r`$\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-$`], ['Faraday', r`$m = \dfrac{ItM}{nF}$`]], 'Summary table of the key relations in Part 2'),
      n: 'Let us sum up Part 2. Conductivity comes from the cell constant and the resistance, and molar conductivity is conductivity per unit concentration. Kohlrausch’s law gives limiting values and the degree of dissociation of weak electrolytes. Faraday’s laws link charge to the mass of product. Batteries are primary or secondary, fuel cells run on a steady supply of fuel, and corrosion is a cell we try to stop.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        r`In $\Lambda_\text{m} = \kappa \times 1000/c$, κ must be in $\text{S cm}^{-1}$ and c in $\text{mol L}^{-1}$.`,
        'For Kohlrausch combinations, write the ions out and check that the unwanted ions cancel.',
        'In Faraday problems, convert minutes to seconds and use the number of electrons per ion.',
        'For brine electrolysis, mention overpotential to explain chlorine at the anode.',
        'Galvanising protects even when scratched because zinc is more reactive (more negative E°) than iron.',
      ],
      v: table(['Slip', 'Fix'], [['Forgetting the factor 1000', 'Use it when c is in mol per litre'], ['Using minutes for t', 'Convert to seconds'], ['Saying zinc coating is just a barrier', 'Zinc is oxidised in preference to iron']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some final tips. Watch the factor of one thousand in molar conductivity, and keep conductivity per centimetre and concentration per litre. In Kohlrausch problems, write out the ions so you can see them cancel. In Faraday problems, time must be in seconds. For brine, explain chlorine with overpotential. And remember that galvanising works because zinc is more reactive than iron, not only because it is a coat.',
    }),
  ],
});

// ISC 12 Chemistry ch03 Electrochemical Cells and Electrode Potential — question bank (ISC style). MCQ keys are
// placed by the builder (balanced); AR keys planned: a b c d a. Every numerical is re-solved by its check function.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 cells and notation
add('notation-mcq', mcq({
  stem: r`In the cell $\ce{Pb(s) | Pb^2+(aq) || Ag+(aq) | Ag(s)}$, electrons in the external wire flow:`,
  right: 'from the lead electrode to the silver electrode',
  wrong: ['from the silver electrode to the lead electrode', 'through the salt bridge from lead to silver', 'in both directions alternately'],
  sol: 'The left electrode (Pb) is the anode; electrons leave the anode through the wire to the cathode (Ag) — option (@K). Ions, not electrons, move in the salt bridge (@2).',
  d: 2, c: 'understanding', t: [1],
}));
add('cell-type-mcq', mcq({
  stem: 'Which statement is true of an electrolytic cell but not of a galvanic cell?',
  right: 'The anode is the positive electrode',
  wrong: ['Oxidation occurs at the anode', 'The reaction is spontaneous', 'Chemical energy is converted into electrical energy'],
  sol: 'In an electrolytic cell the anode is joined to the positive terminal of the supply — option (@K). Oxidation at the anode is true of both (@1).',
  d: 2, c: 'understanding', t: [1],
}));
add('saltbridge-mcq', mcq({
  stem: 'Potassium nitrate in agar is often preferred to potassium chloride in the salt bridge of a cell containing silver nitrate solution because:',
  right: 'chloride ions would precipitate silver chloride',
  wrong: ['nitrate ions conduct electricity faster than any other ion', 'potassium chloride is insoluble in agar', 'nitrate ions take part in the cell reaction'],
  sol: 'Ag⁺ + Cl⁻ → AgCl(s) would block the junction and remove Ag⁺ — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('half-mcq', mcq({
  stem: r`For the cell $\ce{Mg(s) | Mg^2+(aq) || Cu^2+(aq) | Cu(s)}$, the reaction at the cathode is:`,
  right: r`$\ce{Cu^2+(aq) + 2e- -> Cu(s)}$`,
  wrong: [r`$\ce{Mg(s) -> Mg^2+(aq) + 2e-}$`, r`$\ce{Cu(s) -> Cu^2+(aq) + 2e-}$`, r`$\ce{Mg^2+(aq) + 2e- -> Mg(s)}$`],
  sol: 'The right-hand electrode is the cathode, where reduction of Cu²⁺ occurs — option (@K). Oxidation of Mg (@1) happens at the anode.',
  d: 1, c: 'understanding', t: [1],
}));
add('cell-tf', tf({
  stem: 'In a galvanic cell, the electrode at which oxidation takes place is the positive electrode.',
  key: 'f',
  sol: 'False. In a galvanic cell, oxidation occurs at the anode, which is the negative electrode.',
  d: 1, c: 'recall', t: [1],
}));
add('saltbridge-ar', ar({
  a: 'A galvanic cell stops producing current almost at once if its salt bridge is removed.',
  r: 'The salt bridge allows ions to migrate so that both half-cells remain electrically neutral.',
  key: 'a',
  sol: 'Both are true and R explains A: without it, charge builds up and the circuit is broken — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('cell-short', short({
  marks: 2,
  stem: 'Give two differences between an electrochemical (galvanic) cell and an electrolytic cell.',
  model: 'A galvanic cell converts chemical energy into electrical energy using a spontaneous reaction, while an electrolytic cell uses electrical energy to drive a non-spontaneous reaction. In a galvanic cell the anode is negative and the cathode positive; in an electrolytic cell the anode is positive and the cathode negative.',
  sol: 'Energy conversion; polarity.',
  scheme: [['Energy conversion/spontaneity', 1], ['Polarity of electrodes', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('notation-short', short({
  marks: 2, wl: null,
  stem: r`For the reaction $\ce{Zn(s) + 2Fe^3+(aq) -> Zn^2+(aq) + 2Fe^2+(aq)}$, write the anode and cathode half-reactions and the cell notation (use platinum for the iron half-cell).`,
  model: r`Anode: $\ce{Zn -> Zn^2+ + 2e-}$. Cathode: $\ce{Fe^3+ + e- -> Fe^2+}$ (twice).

Cell: $\ce{Zn(s) | Zn^2+(aq) || Fe^3+(aq), Fe^2+(aq) | Pt(s)}$.`,
  sol: 'Half-reactions; notation with Pt.',
  scheme: [['Both half-reactions', 1], ['Cell notation with Pt', 1]],
  d: 2, c: 'application', t: [1],
}));
add('daniell-short3', short({
  marks: 3,
  stem: 'Describe how a Daniell cell produces an electric current. Write the half-reactions and state two functions of the salt bridge.',
  model: 'A zinc rod in zinc sulfate solution is joined by a wire and a salt bridge to a copper rod in copper sulfate solution. Zinc loses electrons more readily than copper: Zn → Zn²⁺ + 2e⁻ at the anode. The electrons travel through the wire to the copper, where Cu²⁺ + 2e⁻ → Cu at the cathode, so a current flows. The salt bridge completes the circuit and keeps both solutions electrically neutral (it also prevents the solutions from mixing).',
  sol: 'Electron flow; half-reactions; salt bridge.',
  scheme: [['Description and direction of electron flow', 1], ['Two half-reactions', 1], ['Two functions of salt bridge', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 SHE and measuring E°
add('she-mcq', mcq({
  stem: 'A student plans to use a standard hydrogen electrode in a solution containing traces of arsenic compounds. Which limitation of the SHE is most relevant?',
  right: 'Its platinum surface is easily poisoned by impurities',
  wrong: ['Its potential changes with temperature', 'It contains no gas phase', 'Its potential is +1.00 V'],
  sol: 'Platinum black is poisoned by traces of impurities such as arsenic compounds — option (@K). The SHE is assigned 0 V at all temperatures (@1).',
  d: 1, c: 'recall', t: [2],
}));
add('sign-mcq', mcq({
  stem: 'A metal M in 1 M M²⁺ is connected to the SHE. The voltmeter reads 0.44 V and the metal electrode is found to be the anode. The standard reduction potential of M²⁺/M is:',
  right: '−0.44 V',
  wrong: ['+0.44 V', '0.00 V', '−0.88 V'],
  sol: 'E°cell = E°(SHE) − E°(M) = 0 − E° = 0.44, so E° = −0.44 V — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pt-black-mcq', mcq({
  stem: 'The platinum foil of a standard hydrogen electrode is coated with platinum black in order to:',
  right: 'provide a large surface that adsorbs hydrogen and speeds up the electrode reaction',
  wrong: ['make the electrode potential positive', 'prevent hydrogen from reaching the solution', 'react with H⁺ ions to form a platinum salt'],
  sol: 'Finely divided Pt has a large surface and catalyses 2H⁺ + 2e⁻ ⇌ H₂ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('absolute-mcq', mcq({
  stem: 'Why can the absolute potential of a single electrode not be measured?',
  right: 'Any measuring circuit introduces a second electrode, so only a difference of potentials can be measured',
  wrong: ['Single electrodes have no potential', 'The potential changes too quickly', 'Voltmeters cannot measure potentials below 1 V'],
  sol: 'A voltmeter measures a potential difference between two electrodes — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('she-fill', fill({
  stem: 'In the standard hydrogen electrode, hydrogen gas is bubbled at a pressure of ___ bar over platinum in a solution of hydrogen ion concentration 1 M.',
  acc: [['1', 'one']],
  sol: '**1 bar**.',
  d: 1, c: 'recall', t: [2],
}));
add('she-ar', ar({
  a: 'The standard hydrogen electrode is rarely used for routine measurements in industry.',
  r: 'The potential of the standard hydrogen electrode is taken as zero at all temperatures.',
  key: 'b',
  sol: 'Both are true, but R does not explain A; the SHE is avoided because it is difficult to set up and maintain and is easily poisoned — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('she-short', short({
  marks: 2,
  stem: 'Describe how a standard hydrogen electrode is set up and write its electrode reaction.',
  model: 'A platinum foil coated with platinum black is dipped into an acid solution in which [H⁺] = 1 M at 298 K, and pure hydrogen gas at 1 bar is bubbled over it. Electrode reaction: 2H⁺(aq) + 2e⁻ ⇌ H₂(g); E° = 0.00 V.',
  sol: 'Pt black, 1 M H⁺, 1 bar H₂; reaction.',
  scheme: [['Set-up (Pt black, 1 M H⁺, 1 bar H₂)', 1], ['Electrode reaction and E° = 0', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('limit-short', short({
  marks: 2,
  stem: 'A school laboratory decides not to use the standard hydrogen electrode as its everyday reference electrode. State two limitations of the SHE that justify this decision.',
  model: 'It is difficult to maintain the hydrogen ion concentration at exactly 1 M and the gas pressure at exactly 1 bar. The platinum is easily poisoned by impurities, and the electrode cannot be used in solutions containing oxidising agents.',
  sol: 'Any two limitations.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('measure-short3', short({
  marks: 3,
  stem: 'Explain, with cell notations, how the standard electrode potentials of Zn²⁺/Zn and Cu²⁺/Cu are measured using the standard hydrogen electrode, and how their signs are decided.',
  model: r`Each half-cell (1 M ions, 298 K) is joined to the SHE through a salt bridge and a voltmeter. For zinc, electrons flow from Zn to the SHE, so zinc is the anode: $\ce{Zn | Zn^2+(1 M) || H+(1 M) | H2(1 bar) | Pt}$; $E^\circ_\text{cell} = 0.76 = 0 - E^\circ_{\ce{Zn^2+/Zn}}$, so $E^\circ = -0.76\ \text{V}$. For copper, electrons flow from the SHE to Cu, so copper is the cathode: $\ce{Pt | H2(1 bar) | H+(1 M) || Cu^2+(1 M) | Cu}$; $E^\circ_\text{cell} = 0.34 = E^\circ_{\ce{Cu^2+/Cu}} - 0$, so $E^\circ = +0.34\ \text{V}$.`,
  sol: 'Zn anode, −0.76; Cu cathode, +0.34.',
  scheme: [['Set-up against SHE', 1], ['Zinc: notation and −0.76 V', 1], ['Copper: notation and +0.34 V', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('she-long', long({
  stem: '(a) Draw a labelled diagram of the standard hydrogen electrode and state two of its limitations. [2]\n\n(b) An unknown metal X in 1 M X²⁺ is connected to the SHE. The voltmeter reads 0.13 V, and X is found to be the anode. A second cell is made from X | X²⁺(1 M) and Ag⁺(1 M) | Ag (E° = +0.80 V). Find E° of X²⁺/X, write the notation of the second cell and calculate its standard emf. [3]',
  model: r`(a) Diagram: platinum foil coated with platinum black in a glass jacket, dipping into 1 M H⁺; pure H₂ at 1 bar entering at the top and bubbling over the foil; a wire from the Pt. Limitations: difficult to maintain 1 M H⁺ and 1 bar H₂; Pt easily poisoned; not usable with oxidising agents.

(b) X is the anode against the SHE, so $0.13 = 0 - E^\circ_{\ce{X^2+/X}}$ and $E^\circ = -0.13\ \text{V}$. Second cell: $\ce{X(s) | X^2+(1 M) || Ag+(1 M) | Ag(s)}$; $E^\circ_\text{cell} = 0.80 - (-0.13) = 0.93\ \text{V}$.`,
  sol: 'Diagram and limitations; −0.13 V; 0.93 V.',
  scheme: [['(a) Labelled diagram', 1], ['(a) Two limitations', 1], ['(b) E° = −0.13 V', 1], ['(b) Cell notation', 1], ['(b) E°cell = 0.93 V', 1]],
  d: 3, c: 'application', t: [2, 4],
}));

// ---------------------------------------------------------------- t03 factors affecting electrode potential
add('factor-mcq', mcq({
  stem: 'The concentration of Cu²⁺ in a copper half-cell is increased from 0.01 M to 0.1 M at 298 K. The reduction potential of the electrode:',
  right: 'increases by about 0.03 V',
  wrong: ['decreases by about 0.03 V', 'increases by about 0.06 V', 'does not change'],
  sol: 'E = E° + (0.059/2) log [Cu²⁺], so a tenfold increase raises E by 0.0295 V — option (@K). 0.06 V would apply for n = 1 (@2).',
  d: 3, c: 'application', t: [3],
}));
add('nature-mcq', mcq({
  stem: 'Which property of a metal tends to make its standard reduction potential more negative?',
  right: 'A high hydration enthalpy of its ion together with a low ionisation enthalpy',
  wrong: ['A high ionisation enthalpy', 'A very high enthalpy of sublimation', 'A low hydration enthalpy of its ion'],
  sol: 'Easy loss of electrons and strong hydration of the ion favour M → Mⁿ⁺(aq), giving a negative E° (as for Li) — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('temp-mcq', mcq({
  stem: 'In the Nernst equation, the factor 2.303RT/nF equals 0.059/n V at 298 K. At a higher temperature this factor:',
  right: 'becomes larger',
  wrong: ['becomes smaller', 'stays exactly the same', 'becomes zero'],
  sol: 'The factor is proportional to T — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('factor-tf', tf({
  stem: 'Diluting the solution in a zinc half-cell makes its reduction potential more negative.',
  key: 't',
  sol: 'True. E = E° + (0.059/2) log[Zn²⁺]; a smaller [Zn²⁺] makes the log term more negative.',
  d: 2, c: 'application', t: [3],
}));
add('factor-ar', ar({
  a: 'The electrode potential of a metal–ion electrode depends on the concentration of the metal ions.',
  r: 'The standard electrode potential E° changes with the concentration of the metal ions.',
  key: 'c',
  sol: 'A is true; R is false — E° is defined at 1 M and is a constant; it is E that changes with concentration — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('factor-num', num({
  stem: r`Calculate the electrode potential, in V, of a silver electrode dipped in $0.010\ \text{M}$ silver nitrate at $298\ \text{K}$. ($E^\circ_{\ce{Ag+/Ag}} = +0.80\ \text{V}$)`,
  value: 0.682, tol: 0.002, unit: 'V',
  sol: r`$E = E^\circ + 0.059\log[\ce{Ag+}] = 0.80 + 0.059 \times (-2) = 0.682$, so $0.682\ \text{V}$.`,
  scheme: [['0.682 V', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(0.8 + 0.059 * -2, 0.682) || 'ag');
add('factor-short', short({
  marks: 2,
  stem: 'State three factors on which the electrode potential of a metal dipped in a solution of its ions depends.',
  model: 'The concentration of the metal ions in solution (higher concentration, more positive reduction potential), the temperature, and the nature of the metal (its ionisation enthalpy, sublimation enthalpy and the hydration enthalpy of its ion).',
  sol: 'Concentration, temperature, nature.',
  scheme: [['Two factors', 1], ['Third factor', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('conc-short3', short({
  marks: 3,
  stem: 'Calculate the reduction potential at 298 K of (a) a zinc electrode in 0.001 M Zn²⁺ and (b) a copper electrode in 0.1 M Cu²⁺. (E°: Zn²⁺/Zn −0.76 V, Cu²⁺/Cu +0.34 V) (c) Hence find the emf of the cell made from these two electrodes.',
  model: r`(a) $E = -0.76 + \dfrac{0.059}{2}\log(0.001) = -0.76 - 0.0885 = -0.8485\ \text{V}$.

(b) $E = 0.34 + \dfrac{0.059}{2}\log(0.1) = 0.34 - 0.0295 = 0.3105\ \text{V}$.

(c) $E_\text{cell} = 0.3105 - (-0.8485) = 1.159\ \text{V}$.`,
  sol: '−0.849 V; +0.311 V; 1.159 V.',
  scheme: [['(a) −0.849 V', 1], ['(b) +0.311 V', 1], ['(c) 1.159 V', 1]],
  d: 3, c: 'application', t: [3, 5],
}));

// ---------------------------------------------------------------- t04 electrochemical series
add('series-mcq', mcq({
  stem: 'Standard reduction potentials (V): Br₂/Br⁻ +1.09, I₂/I⁻ +0.54, Fe³⁺/Fe²⁺ +0.77, Sn⁴⁺/Sn²⁺ +0.15. Which is the strongest reducing agent?',
  right: 'Sn²⁺',
  wrong: ['Br⁻', 'I⁻', 'Fe²⁺'],
  sol: 'The reduced form of the couple with the lowest E° is the strongest reducing agent — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('displace-mcq', mcq({
  stem: 'Given E° (V): Al³⁺/Al −1.66, Zn²⁺/Zn −0.76, Fe²⁺/Fe −0.44, Pb²⁺/Pb −0.13, Cu²⁺/Cu +0.34. Which metal can displace lead from lead nitrate solution but cannot displace zinc from zinc sulfate?',
  right: 'Iron',
  wrong: ['Copper', 'Aluminium', 'Lead'],
  sol: 'Iron (−0.44) lies below lead (−0.13) but above zinc (−0.76) — option (@K). Aluminium displaces both (@2); copper displaces neither (@1).',
  d: 3, c: 'application', t: [4],
}));
add('acid-mcq', mcq({
  stem: 'Which metal will NOT liberate hydrogen from dilute hydrochloric acid?',
  right: 'Silver (E° = +0.80 V)',
  wrong: ['Magnesium (E° = −2.37 V)', 'Iron (E° = −0.44 V)', 'Zinc (E° = −0.76 V)'],
  sol: 'Only metals with negative E° reduce H⁺ to H₂ — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('ecell-mcq', mcq({
  stem: 'E°(Cr³⁺/Cr) = −0.74 V and E°(Ag⁺/Ag) = +0.80 V. The standard emf of the cell Cr | Cr³⁺ || Ag⁺ | Ag is:',
  right: '1.54 V',
  wrong: ['0.06 V', '3.14 V', '−1.54 V'],
  sol: 'E° = 0.80 − (−0.74) = 1.54 V; E° is not multiplied by 3 (@2) — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('oxidant-mcq', mcq({
  stem: 'Which halogen can oxidise both Br⁻ and I⁻ ions but not F⁻? (E°/V: F₂ 2.87, Cl₂ 1.36, Br₂ 1.09, I₂ 0.54)',
  right: 'Chlorine',
  wrong: ['Fluorine', 'Bromine', 'Iodine'],
  sol: 'Cl₂ has a higher E° than Br₂ and I₂ but lower than F₂ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('series-match', match({
  stem: 'Using the electrochemical series, match each observation with its explanation.',
  pairs: [
    ['Zinc dissolves in dilute HCl, releasing H₂', 'E° of Zn²⁺/Zn is negative'],
    ['Copper does not react with dilute HCl', 'E° of Cu²⁺/Cu is positive'],
    ['Iron displaces copper from CuSO₄ solution', 'E° of Fe is lower than that of Cu'],
    ['Fluorine is the strongest oxidising agent', 'F₂/F⁻ has the highest E°'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Each observation follows from the position of the couple in the series.',
  d: 2, c: 'understanding', t: [4],
}));
add('intensive-ar', ar({
  a: 'The standard potential of 2Cu²⁺ + 4e⁻ → 2Cu is twice that of Cu²⁺ + 2e⁻ → Cu.',
  r: 'Electrode potential is an intensive property.',
  key: 'd',
  sol: 'A is false — both have E° = +0.34 V; R is true and is the reason the value is unchanged — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('series-tf', tf({
  stem: 'A metal higher in the electrochemical series (more positive E°) displaces a metal lower in the series from its salt solution.',
  key: 'f',
  sol: 'False. The metal with the lower (more negative) E° displaces the one with the higher E°.',
  d: 1, c: 'understanding', t: [4],
}));
add('ecell-num', num({
  stem: r`Calculate the standard emf, in V, of the cell $\ce{Al(s) | Al^3+(1 M) || Cu^2+(1 M) | Cu(s)}$. ($E^\circ$: Al³⁺/Al $-1.66$ V, Cu²⁺/Cu $+0.34$ V)`,
  value: 2, tol: 0.005, unit: 'V',
  sol: r`$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode} = 0.34 - (-1.66) = 2.00$, so $2.00\ \text{V}$.`,
  scheme: [['2.00 V', 1]],
  d: 1, c: 'application', t: [4],
}), () => near(0.34 + 1.66, 2) || 'al-cu');
add('feasible-short', short({
  marks: 2,
  stem: 'Predict, with calculation, whether iodine can oxidise Fe²⁺ to Fe³⁺ under standard conditions. (E°: I₂/I⁻ +0.54 V; Fe³⁺/Fe²⁺ +0.77 V)',
  model: r`Assume $\ce{2Fe^2+ + I2 -> 2Fe^3+ + 2I-}$: cathode I₂/I⁻, anode Fe³⁺/Fe²⁺. $E^\circ_\text{cell} = 0.54 - 0.77 = -0.23\ \text{V}$. Negative, so the reaction is not feasible: iodine cannot oxidise Fe²⁺ (instead Fe³⁺ oxidises I⁻).`,
  sol: '−0.23 V, not feasible.',
  scheme: [['Calculation −0.23 V', 1], ['Conclusion', 1]],
  d: 2, c: 'application', t: [4],
}));
add('vessel-short', short({
  marks: 2,
  stem: 'Can a solution of nickel(II) sulfate be stirred with a copper rod, and can it be stored in a zinc container? Justify each answer. (E°: Ni²⁺/Ni −0.25 V, Cu²⁺/Cu +0.34 V, Zn²⁺/Zn −0.76 V)',
  model: 'Copper rod: Cu + Ni²⁺ → Cu²⁺ + Ni would have E° = −0.25 − 0.34 = −0.59 V, negative, so there is no reaction and the copper rod can be used. Zinc container: Zn + Ni²⁺ → Zn²⁺ + Ni has E° = −0.25 − (−0.76) = +0.51 V, positive, so zinc would dissolve; it cannot be used.',
  sol: 'Copper yes; zinc no.',
  scheme: [['Copper: E° negative, safe', 1], ['Zinc: E° positive, unsafe', 1]],
  d: 2, c: 'application', t: [4],
}));
add('series-short3', short({
  marks: 3,
  stem: 'State three applications of the electrochemical series, illustrating each with an example.',
  model: '(1) Comparing oxidising and reducing strength: F₂, with the highest E°, is the strongest oxidising agent; Li, with the lowest, is the strongest reducing agent. (2) Predicting displacement: zinc (E° −0.76 V) displaces copper (+0.34 V) from copper sulfate solution. (3) Predicting reaction with acids: metals with negative E°, such as magnesium, liberate H₂ from dilute acids, while copper does not. (Also: calculating E°cell and predicting feasibility.)',
  sol: 'Three applications with examples.',
  scheme: [['First application with example', 1], ['Second application with example', 1], ['Third application with example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ecell-short3', short({
  marks: 3,
  stem: 'A cell is made from a magnesium electrode in 1 M Mg²⁺ and a lead electrode in 1 M Pb²⁺. (E°: Mg²⁺/Mg −2.37 V, Pb²⁺/Pb −0.13 V) (a) Which electrode is the anode? (b) Write the cell notation and the cell reaction. (c) Calculate E°cell.',
  model: r`(a) Magnesium (lower E°) is the anode.

(b) $\ce{Mg(s) | Mg^2+(1 M) || Pb^2+(1 M) | Pb(s)}$; $\ce{Mg(s) + Pb^2+(aq) -> Mg^2+(aq) + Pb(s)}$.

(c) $E^\circ_\text{cell} = -0.13 - (-2.37) = 2.24\ \text{V}$.`,
  sol: 'Mg anode; 2.24 V.',
  scheme: [['(a) Mg anode', 1], ['(b) Notation and reaction', 1], ['(c) 2.24 V', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 Nernst, ΔG and K
add('nernst-mcq', mcq({
  stem: r`For the cell $\ce{Zn | Zn^2+(c_1) || Cu^2+(c_2) | Cu}$, which change increases the emf at 298 K?`,
  right: 'Increasing the concentration of Cu²⁺',
  wrong: ['Increasing the concentration of Zn²⁺', 'Making the zinc rod larger', 'Diluting the copper sulfate solution'],
  sol: 'E = E° − (0.059/2) log([Zn²⁺]/[Cu²⁺]); raising [Cu²⁺] lowers Q and raises E — option (@K). The size of the electrode has no effect (@2).',
  d: 2, c: 'application', t: [5],
}));
add('conc-cell-mcq', mcq({
  stem: 'A concentration cell Cu | Cu²⁺(0.01 M) || Cu²⁺(1.0 M) | Cu is set up at 298 K. Its emf is about:',
  right: '0.059 V',
  wrong: ['0.00 V', '0.118 V', '0.0295 V'],
  sol: 'E° = 0 and n = 2: E = −(0.059/2) log(0.01 ÷ 1.0) = −0.0295 × (−2) = 0.059 V — option (@K). Using n = 1 gives (@2).',
  d: 3, c: 'application', t: [5],
}));
add('dg-mcq', mcq({
  stem: 'For a cell reaction with n = 1 and E°cell = 0.40 V at 298 K, ΔG° is about (F = 96500 C mol⁻¹):',
  right: '−38.6 kJ mol⁻¹',
  wrong: ['+38.6 kJ mol⁻¹', '−77.2 kJ mol⁻¹', '−0.386 kJ mol⁻¹'],
  sol: 'ΔG° = −1 × 96500 × 0.40 = −38600 J = −38.6 kJ mol⁻¹ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('k-mcq', mcq({
  stem: 'A two-electron cell reaction has E°cell = 0.059 V at 298 K. Its equilibrium constant is:',
  right: '100',
  wrong: ['10', '1', '0.01'],
  sol: 'log K = nE°/0.059 = 2 × 0.059/0.059 = 2; K = 100 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('equilibrium-mcq', mcq({
  stem: 'A torch cell has run until it no longer gives any current. At this stage:',
  right: 'Ecell = 0 and the reaction quotient equals the equilibrium constant',
  wrong: ['E°cell = 0', 'ΔG° = 0', 'The reaction quotient is zero'],
  sol: 'A flat cell is at equilibrium: E = 0 and Q = K; E° and ΔG° are fixed constants — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('ph-mcq', mcq({
  stem: 'A hydrogen electrode (H₂ at 1 bar) dips into a solution and shows a potential of −0.236 V at 298 K. The pH of the solution is:',
  right: '4',
  wrong: ['2', '0.236', '10'],
  sol: 'E = −0.059 pH; pH = 0.236 ÷ 0.059 = 4 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('nernst-fill', fill({
  stem: 'At 298 K, the value of 2.303RT/F in the Nernst equation is ___ V.',
  acc: [['0.059', '0.0591']],
  sol: '**0.059 V**.',
  d: 1, c: 'recall', t: [5],
}));
add('dg-tf', tf({
  stem: 'A cell reaction with a positive standard emf has an equilibrium constant greater than 1.',
  key: 't',
  sol: 'True. log K = nE°/0.059 is positive, so K > 1.',
  d: 1, c: 'understanding', t: [5],
}));
add('dg-ar', ar({
  a: 'A cell reaction with a negative standard emf has a positive standard Gibbs energy change.',
  r: 'ΔG° = −nFE°cell.',
  key: 'a',
  sol: 'Both are true; the minus sign in R makes ΔG° positive when E° is negative — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('emf-num', num({
  marks: 2,
  stem: 'A magnesium–copper cell is set up with 0.001 M Mg²⁺ and 0.0001 M Cu²⁺ at 298 K. Its standard emf is 2.71 V. What is the emf of the cell, in volts, under these conditions?',
  value: 2.68, tol: 0.003, unit: 'V',
  sol: r`$n = 2$; $Q = 0.001 \div 0.0001 = 10$; $\log Q = 1$. $E = 2.71 - \dfrac{0.059}{2} \times 1 = 2.6805$, so $2.68\ \text{V}$.`,
  scheme: [['Q = 10 and n = 2', 1], ['E = 2.68 V', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(2.71 - 0.0295, 2.6805, 0.001) || 'emf');
add('dg-num', num({
  marks: 2,
  stem: r`For the cell reaction $\ce{2Al(s) + 3Ni^2+(aq) -> 2Al^3+(aq) + 3Ni(s)}$, $E^\circ_\text{cell} = 1.41\ \text{V}$. Calculate $\Delta G^\circ$ in kJ mol⁻¹ ($F = 96500\ \text{C mol}^{-1}$).`,
  value: -816.4, tol: 0.5, unit: 'kJ/mol',
  sol: r`$n = 6$; $\Delta G^\circ = -6 \times 96500 \times 1.41 = -816390\ \text{J}$; in kJ $-816390 \div 1000 = -816.4$, so $-816.4\ \text{kJ mol}^{-1}$.`,
  scheme: [['n = 6', 1], ['−816.4 kJ/mol', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(-6 * 96500 * 1.41 / 1000, -816.39, 0.001) || 'dg');
add('k-num', num({
  stem: r`Calculate $\log K$ at $298\ \text{K}$ for $\ce{Fe(s) + Cu^2+(aq) -> Fe^2+(aq) + Cu(s)}$, given $E^\circ_\text{cell} = 0.78\ \text{V}$.`,
  value: 26.44, tol: 0.03, unit: null,
  sol: r`$\log K = \dfrac{nE^\circ}{0.059} = \dfrac{2 \times 0.78}{0.059} = 26.44$.`,
  scheme: [['26.44', 1]],
  d: 2, c: 'application', t: [5],
}), () => near((2 * 0.78) / 0.059, 26.44, 0.001) || 'logk');
add('nernst-short', short({
  marks: 2,
  stem: 'Write the Nernst equation for the cell Fe | Fe²⁺(aq) || Ag⁺(aq) | Ag at 298 K, and state how its emf changes if [Ag⁺] is increased.',
  model: r`Cell reaction $\ce{Fe + 2Ag+ -> Fe^2+ + 2Ag}$, $n = 2$: $E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{2}\log\dfrac{[\ce{Fe^2+}]}{[\ce{Ag+}]^2}$. Increasing [Ag⁺] decreases Q, so the emf increases.`,
  sol: 'Equation with [Ag⁺]²; emf rises.',
  scheme: [['Correct Nernst equation with squared term', 1], ['Emf increases', 1]],
  d: 2, c: 'application', t: [5],
}));
add('dgk-short', short({
  marks: 2,
  stem: 'Show how the standard emf of a cell is related to its equilibrium constant at 298 K, starting from the Nernst equation.',
  model: r`$E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q$. At equilibrium $E_\text{cell} = 0$ and $Q = K$, so $0 = E^\circ_\text{cell} - \dfrac{0.059}{n}\log K$, giving $E^\circ_\text{cell} = \dfrac{0.059}{n}\log K$.`,
  sol: 'E = 0, Q = K at equilibrium.',
  scheme: [['E = 0 and Q = K at equilibrium', 1], ['Final relation', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('nernst-short3', short({
  marks: 3,
  stem: 'For the cell Cu(s) | Cu²⁺(0.02 M) || Ag⁺(0.2 M) | Ag(s) at 298 K (E°: Cu²⁺/Cu +0.34 V, Ag⁺/Ag +0.80 V): (a) write the cell reaction, (b) calculate E°cell and (c) calculate Ecell.',
  model: r`(a) $\ce{Cu(s) + 2Ag+(aq) -> Cu^2+(aq) + 2Ag(s)}$; $n = 2$.

(b) $E^\circ_\text{cell} = 0.80 - 0.34 = 0.46\ \text{V}$.

(c) $Q = \dfrac{0.02}{(0.2)^2} = 0.5$; $\log Q = -0.301$; $E = 0.46 - \dfrac{0.059}{2} \times (-0.301) = 0.46 + 0.0089 = 0.469\ \text{V}$.`,
  sol: '0.46 V; 0.469 V.',
  scheme: [['(a) Cell reaction', 1], ['(b) 0.46 V', 1], ['(c) 0.469 V', 1]],
  d: 3, c: 'application', t: [5],
}));
add('dg-short3', short({
  marks: 3,
  stem: 'For the cell Zn(s) | Zn²⁺(1 M) || Ag⁺(1 M) | Ag(s) at 298 K (E°: Zn²⁺/Zn −0.76 V, Ag⁺/Ag +0.80 V), calculate (a) E°cell, (b) ΔG° and (c) log K. (F = 96500 C mol⁻¹)',
  model: r`(a) $E^\circ_\text{cell} = 0.80 - (-0.76) = 1.56\ \text{V}$.

(b) $\ce{Zn + 2Ag+ -> Zn^2+ + 2Ag}$, $n = 2$: $\Delta G^\circ = -2 \times 96500 \times 1.56 = -301080\ \text{J}$, i.e. $-301.1\ \text{kJ mol}^{-1}$.

(c) $\log K = \dfrac{2 \times 1.56}{0.059} \approx 52.9$.`,
  sol: '1.56 V; −301.1 kJ/mol; log K = 52.9.',
  scheme: [['(a) 1.56 V', 1], ['(b) −301.1 kJ/mol', 1], ['(c) 52.9', 1]],
  d: 3, c: 'application', t: [5],
}));
add('ph-short3', short({
  marks: 3,
  stem: 'A cell is made of a hydrogen electrode (H₂ at 1 bar) dipping into a solution of unknown pH, connected to the SHE. The emf at 298 K is 0.354 V. (a) Which electrode is the anode? (b) Calculate the pH of the solution. (c) Would the emf rise or fall if the solution were made more acidic?',
  model: r`(a) The electrode in the unknown solution has the lower [H⁺], so its potential is negative ($E = -0.059\,\text{pH}$); it is the anode.

(b) $E_\text{cell} = 0 - (-0.059\,\text{pH}) = 0.059\,\text{pH} = 0.354$, so $\text{pH} = 6.0$.

(c) A more acidic solution has a lower pH, so the emf would fall (towards zero at pH 0).`,
  sol: 'Unknown electrode anode; pH 6.0; emf falls.',
  scheme: [['(a) Anode identified', 1], ['(b) pH = 6.0', 1], ['(c) Emf falls', 1]],
  d: 4, c: 'analysis', t: [5],
}));
add('nernst-long', long({
  stem: '(a) Derive the relation between the standard emf of a cell and the equilibrium constant of its reaction, starting from ΔG° = −nFE° and ΔG° = −2.303RT log K. [2]\n\n(b) For the cell Zn(s) | Zn²⁺(0.04 M) || Ni²⁺(0.4 M) | Ni(s) at 298 K (E°: Zn²⁺/Zn −0.76 V, Ni²⁺/Ni −0.25 V), calculate (i) E°cell, (ii) Ecell and (iii) ΔG° (F = 96500 C mol⁻¹). [3]',
  model: r`(a) $-nFE^\circ = -2.303RT\log K$, so $E^\circ = \dfrac{2.303RT}{nF}\log K$; at 298 K, $E^\circ = \dfrac{0.059}{n}\log K$.

(b) (i) $E^\circ_\text{cell} = -0.25 - (-0.76) = 0.51\ \text{V}$. (ii) $n = 2$; $Q = 0.04 \div 0.4 = 0.1$; $E = 0.51 - \dfrac{0.059}{2}\log 0.1 = 0.51 + 0.0295 = 0.5395\ \text{V}$. (iii) $\Delta G^\circ = -2 \times 96500 \times 0.51 = -98430\ \text{J} = -98.43\ \text{kJ mol}^{-1}$.`,
  sol: 'Derivation; 0.51 V; 0.540 V; −98.43 kJ/mol.',
  scheme: [['(a) Derivation', 2], ['(b)(i) 0.51 V', 1], ['(b)(ii) 0.540 V', 1], ['(b)(iii) −98.43 kJ/mol', 1]],
  d: 3, c: 'application', t: [5],
}));
add('series-long', long({
  stem: '(a) What is the electrochemical series? How does it help to predict whether a metal will liberate hydrogen from a dilute acid? [2]\n\n(b) Given E° (V): Ag⁺/Ag +0.80, Cu²⁺/Cu +0.34, Fe²⁺/Fe −0.44, Mg²⁺/Mg −2.37: (i) which metal is the strongest reducing agent? (ii) Which pair of electrodes gives a cell of the highest standard emf, and what is its value? (iii) Will copper displace silver from silver nitrate solution? Justify. [3]',
  model: '(a) The arrangement of electrodes (half-cells) in order of their standard reduction potentials. A metal with a negative E° is a stronger reducing agent than hydrogen and reduces H⁺ to H₂, so it liberates hydrogen from dilute acids; a metal with a positive E° does not. (b) (i) Magnesium (lowest E°). (ii) Mg and Ag: E°cell = 0.80 − (−2.37) = 3.17 V. (iii) Yes: Cu + 2Ag⁺ → Cu²⁺ + 2Ag has E°cell = 0.80 − 0.34 = +0.46 V, which is positive, so copper displaces silver.',
  sol: 'Series; Mg; 3.17 V; yes (+0.46 V).',
  scheme: [['(a) Definition', 1], ['(a) Use for H₂ liberation', 1], ['(b)(i) Mg', 1], ['(b)(ii) Mg–Ag, 3.17 V', 1], ['(b)(iii) Yes with +0.46 V', 1]],
  d: 2, c: 'application', t: [4],
}));
add('cell-long', long({
  stem: '(a) With the help of a labelled diagram, describe the construction and working of a Daniell cell. Write the reactions at each electrode and the cell notation. [3]\n\n(b) Explain what happens to the emf of a Daniell cell as it is used, with reference to the Nernst equation. [2]',
  model: r`(a) A zinc rod dips into ZnSO₄ solution and a copper rod into CuSO₄ solution in separate beakers; the solutions are joined by a salt bridge and the rods by a wire through a voltmeter. Anode: $\ce{Zn -> Zn^2+ + 2e-}$; cathode: $\ce{Cu^2+ + 2e- -> Cu}$; electrons flow from Zn to Cu through the wire. Notation: $\ce{Zn(s) | Zn^2+(aq) || Cu^2+(aq) | Cu(s)}$; $E^\circ = 1.10\ \text{V}$.

(b) $E = 1.10 - \dfrac{0.059}{2}\log\dfrac{[\ce{Zn^2+}]}{[\ce{Cu^2+}]}$. As the cell works, [Zn²⁺] rises and [Cu²⁺] falls, so Q increases and the emf falls, reaching zero when the reaction reaches equilibrium.`,
  sol: 'Construction and reactions; emf falls as Q rises.',
  scheme: [['(a) Diagram/construction', 1], ['(a) Electrode reactions', 1], ['(a) Notation', 1], ['(b) Nernst equation and Q', 1], ['(b) Emf falls to zero', 1]],
  d: 2, c: 'understanding', t: [1, 5],
}));

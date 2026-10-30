// ISC 12 Chemistry ch04 Electrolytic Conductance, Electrolysis, Batteries and Corrosion — two decks:
// Part 1 (t01–t03) conductance terms, cell constant, molar and equivalent conductance, Kohlrausch's law;
// Part 2 (t04–t06) Faraday's laws, primary and secondary cells, fuel cell, corrosion.
import { sl, deck, table, flow, svgV, plot, chem, r } from './lib.mjs';
import { ELECTROLYSIS, FUELCELL, RUST } from './svgs.mjs';

export const V = {
  electrolysis: svgV(ELECTROLYSIS, 'Electrolytic cell driven by a battery: cations move to the cathode joined to the negative terminal, anions move to the anode joined to the positive terminal'),
  fuelcell: svgV(FUELCELL, 'Hydrogen–oxygen fuel cell with hydrogen fed to the anode, oxygen to the cathode, an alkali electrolyte between them, water leaving at the bottom and a lamp in the external circuit'),
  rust: svgV(RUST, 'A drop of water on iron: the middle of the drop is the anode where iron dissolves, the edge is the cathode where oxygen is reduced, electrons flow through the iron, and rust forms near the edge', 'Schematic; the drop is drawn far larger than real size.'),
};

// Molar conductance against √c: KCl (strong, 149.8 − 85√c) and ethanoic acid (weak, Ka 1.8 × 10⁻⁵, Λ° 390.5).
const KA = 1.8e-5;
const alphaOf = (c) => (-KA + Math.sqrt(KA * KA + 4 * KA * c)) / (2 * c);
export const condPlot = plot(
  {
    x: { min: 0, max: 0.3, label: 'Square root of concentration' },
    y: { min: 0, max: 400, label: 'Molar conductance (S cm² mol⁻¹)' },
    series: [
      { label: 'KCl (strong electrolyte)', kind: 'line', points: [0, 0.1, 0.2, 0.3].map((s) => [s, +(149.8 - 85 * s).toFixed(1)]) },
      { label: 'Ethanoic acid (weak electrolyte)', kind: 'line', points: [0.02, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3].map((s) => [s, +(390.5 * alphaOf(s * s)).toFixed(1)]) },
    ],
    points: [{ at: [0, 390.5], label: 'Λ° of ethanoic acid (cannot be reached by extrapolation)', on_curve: false }],
  },
  'Molar conductance against the square root of concentration: potassium chloride falls along a gentle straight line from about 150; ethanoic acid stays low and rises steeply only at very great dilution towards 390.5',
  'Strong electrolyte: extrapolate the straight line to zero concentration. Weak electrolyte: use Kohlrausch’s law.',
);

export const deck1 = deck({
  part: 1,
  title: 'Electrolytic Conductance, Electrolysis, Batteries and Corrosion — Part 1: Conductance',
  goals: [
    'Compare metallic and electrolytic conductance',
    'Define resistance, specific resistance, conductance, specific conductance and cell constant, and calculate them',
    'Interconvert specific, molar and equivalent conductance and explain their variation with concentration',
    'Apply Kohlrausch’s law to find limiting molar conductance and the degree of dissociation of a weak electrolyte',
  ],
  slides: [
    sl('title', 'Electrolytic conductance', {
      b: 'Part 1 — how solutions of electrolytes carry current, and how we measure and compare it.',
      v: flow('LR', [['a', 'Ions carry charge'], ['b', 'Resistance and conductance'], ['c', 'Specific, molar and equivalent conductance'], ['d', 'Kohlrausch’s law']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of topics in Part 1'),
      n: 'In a copper wire, electrons carry the current; in a solution of salt, ions do. In this part we see how the conductance of a solution is defined and measured, why chemists divide it by concentration to compare electrolytes, how it changes when a solution is diluted, and how Kohlrausch’s law lets us find values that cannot be measured directly.',
    }),
    sl('concept', 'Metallic and electrolytic conductance', {
      b: 'Metals conduct by movement of **electrons**; electrolytes (solutions or melts) conduct by movement of **ions**, with chemical change at the electrodes.',
      v: table(['Feature', 'Metallic conductance', 'Electrolytic conductance'], [['Charge carriers', 'Electrons', 'Ions'], ['Chemical change', 'None', 'Decomposition at the electrodes'], ['Transfer of matter', 'No', 'Yes, ions move'], ['Effect of rise in temperature', 'Conductance decreases (vibrating ions scatter electrons)', 'Conductance increases (less viscosity, more dissociation)'], ['Examples', 'Copper, silver', 'Aqueous NaCl, molten KCl']], 'Table comparing metallic and electrolytic conductance'),
      n: 'Metals and electrolytes both conduct, but in different ways. In a metal, free electrons drift through the lattice and nothing changes chemically; heating makes the lattice ions vibrate more and conductance falls. In an electrolyte, ions themselves move, matter is transported and chemical changes happen at the electrodes; heating lowers the viscosity and increases dissociation, so conductance rises.',
    }),
    sl('concept', 'Resistance, conductance and cell constant', {
      b: r`Resistance $R = \rho\dfrac{l}{A}$, where $\rho$ is the **specific resistance** (resistivity). **Conductance** $G = 1/R$ (siemens, S). **Specific conductance** (conductivity) $\kappa = 1/\rho$: the conductance of a 1 cm cube of solution. **Cell constant** $G^* = l/A$, found by calibrating with a KCl solution of known $\kappa$.`,
      m: [r`\kappa = \frac{1}{\rho} = \frac{1}{R}\cdot\frac{l}{A} = \frac{G^*}{R}`],
      v: table(['Quantity', 'Symbol', 'Unit'], [['Resistance', 'R', 'Ω'], ['Specific resistance', 'ρ', 'Ω cm'], ['Conductance', 'G', 'S = Ω⁻¹'], ['Specific conductance', 'κ', 'S cm⁻¹'], ['Cell constant', 'G* = l/A', 'cm⁻¹']], 'Table of conductance quantities with symbols and units'),
      n: 'A solution between two electrodes has a resistance that depends on the distance between the electrodes and their area. The reciprocal of resistance is conductance, measured in siemens. Specific conductance, or conductivity, is the conductance of a centimetre cube of solution. Since the exact geometry of a real cell is hard to measure, we find its cell constant by filling it with a potassium chloride solution of known conductivity. Alternating current is used to avoid electrolysis.',
    }),
    sl('concept', 'Molar and equivalent conductance', {
      b: r`To compare electrolytes, divide $\kappa$ by concentration. **Molar conductance** $\Lambda_\text{m}$: conductance of all the ions from one mole of electrolyte. **Equivalent conductance** $\Lambda_\text{eq}$: conductance of all the ions from one gram equivalent.`,
      m: [r`\Lambda_\text{m} = \frac{\kappa \times 1000}{M}\ \ (\text{S cm}^2\ \text{mol}^{-1}), \qquad \Lambda_\text{eq} = \frac{\kappa \times 1000}{N}\ \ (\text{S cm}^2\ \text{eq}^{-1})`, r`\Lambda_\text{m} = n \times \Lambda_\text{eq}`],
      v: table(['On dilution', 'κ', 'Λm and Λeq'], [['Trend', 'Decreases', 'Increase'], ['Reason', 'Fewer ions per cm³', 'Ions from 1 mol (or 1 eq) move more freely; weak electrolytes dissociate more']], 'Table of the effect of dilution on specific, molar and equivalent conductance'),
      n: 'A stronger solution conducts better simply because it holds more ions, so we divide by concentration. Molar conductance is the specific conductance times a thousand over the molarity; equivalent conductance uses the normality instead. For a salt such as calcium chloride, where n is two, the molar conductance is twice the equivalent conductance. On dilution, specific conductance falls, but molar and equivalent conductance rise.',
    }),
    sl('example', 'Worked example: κ, Λm and Λeq', {
      b: r`**Problem.** A cell of cell constant $0.85\ \text{cm}^{-1}$ has a resistance of $340\ \Omega$ when filled with $0.010\ \text{M}$ $\ce{CaCl2}$. Find $\kappa$, $\Lambda_\text{m}$ and $\Lambda_\text{eq}$.

**Step 1.** $\kappa = G^*/R = 0.85 \div 340 = 2.5 \times 10^{-3}\ \text{S cm}^{-1}$.

**Step 2.** $\Lambda_\text{m} = 2.5 \times 10^{-3} \times 1000 \div 0.010 = 250\ \text{S cm}^2\ \text{mol}^{-1}$.

**Step 3.** Normality $= 2 \times 0.010 = 0.020\ \text{N}$; $\Lambda_\text{eq} = 2.5 \times 10^{-3} \times 1000 \div 0.020 = 125\ \text{S cm}^2\ \text{eq}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['κ', '2.5 × 10⁻³ S cm⁻¹'], ['Λm', '250 S cm² mol⁻¹'], ['Λeq', '125 S cm² eq⁻¹']], 'Table of results of the calcium chloride example'),
      n: 'Divide the cell constant by the resistance: nought point eight five over three hundred and forty is two point five thousandths of a siemens per centimetre. Multiply by a thousand and divide by the molarity for the molar conductance, two hundred and fifty. Calcium chloride gives two equivalents per mole, so its normality is twice its molarity and the equivalent conductance is half the molar value.',
    }),
    sl('diagram', 'Variation with concentration', {
      b: r`**Strong** electrolytes: $\Lambda_\text{m}$ rises slowly and linearly on dilution, $\Lambda_\text{m} = \Lambda^\circ_\text{m} - A\sqrt{c}$ (Debye–Hückel–Onsager), so $\Lambda^\circ_\text{m}$ is found by extrapolation. **Weak** electrolytes: $\Lambda_\text{m}$ is low and rises steeply at high dilution because the degree of dissociation increases; $\Lambda^\circ_\text{m}$ cannot be found by extrapolation.`,
      v: condPlot,
      n: 'Compare the two graphs. For potassium chloride, a strong electrolyte that is fully ionised, molar conductance falls slightly in a straight line as concentration rises, because ions crowd and drag on each other; we can extend the line to zero concentration. Ethanoic acid, a weak electrolyte, is only slightly ionised; on great dilution it ionises more and its molar conductance shoots up, so its limiting value cannot be read from the graph.',
    }),
    sl('check', 'Quick check: dilution', {
      b: 'Predict how κ and Λm change when an electrolyte solution is diluted.',
      n: 'Quick check. Think separately about ions per cubic centimetre and about the ions from one mole.',
      chk: 'dilution-mcq',
    }),
    sl('concept', 'Kohlrausch’s law of independent migration of ions', {
      b: r`At infinite dilution each ion contributes a definite amount to the conductance, independent of the other ion: $\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-$. **Applications:** (1) $\Lambda^\circ_\text{m}$ of weak electrolytes; (2) degree of dissociation $\alpha = \Lambda_\text{m}/\Lambda^\circ_\text{m}$; (3) dissociation constant $K_\text{a} = c\alpha^2/(1-\alpha)$; (4) solubility of sparingly soluble salts.`,
      m: [r`\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-`, r`\alpha = \frac{\Lambda_\text{m}}{\Lambda^\circ_\text{m}}, \qquad K_\text{a} = \frac{c\alpha^2}{1 - \alpha}`],
      v: table(['Ion', 'λ° / S cm² mol⁻¹', 'Ion', 'λ° / S cm² mol⁻¹'], [['H⁺', '349.6', 'OH⁻', '199.1'], ['K⁺', '73.5', 'Cl⁻', '76.3'], ['Na⁺', '50.1', 'CH₃COO⁻', '40.9'], ['Ag⁺', '61.9', 'NO₃⁻', '71.4'], ['Mg²⁺', '106.0', 'SO₄²⁻', '160.0']], 'Table of limiting molar conductances of ions at 298 K'),
      n: 'Kohlrausch noticed that at infinite dilution every ion moves independently and adds its own fixed contribution. So the limiting molar conductance of any electrolyte is the sum of its ions’ values, each multiplied by how many of that ion the formula contains. This lets us find limiting values for weak electrolytes, their degree of dissociation, their dissociation constant, and even the solubility of sparingly soluble salts.',
    }),
    sl('example', 'Worked example: Λ° of ethanoic acid from strong electrolytes', {
      b: r`**Problem.** At 298 K, $\Lambda^\circ_\text{m}$ of $\ce{HCl}$, $\ce{CH3COOK}$ and $\ce{KCl}$ are $425.9$, $114.4$ and $149.8\ \text{S cm}^2\ \text{mol}^{-1}$. Find $\Lambda^\circ_\text{m}$ of ethanoic acid.

**Step 1.** $\Lambda^\circ(\ce{CH3COOH}) = \Lambda^\circ(\ce{HCl}) + \Lambda^\circ(\ce{CH3COOK}) - \Lambda^\circ(\ce{KCl})$.

**Step 2.** $= 425.9 + 114.4 - 149.8 = 390.5\ \text{S cm}^2\ \text{mol}^{-1}$.`,
      v: flow('LR', [['a', 'HCl: H⁺ + Cl⁻'], ['b', '+ CH₃COOK: K⁺ + CH₃COO⁻'], ['c', '− KCl: K⁺ + Cl⁻'], ['d', '= H⁺ + CH₃COO⁻']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing ions cancelling to leave hydrogen and ethanoate ions'),
      n: 'We cannot measure the limiting value for ethanoic acid directly, but we can combine three strong electrolytes. Hydrochloric acid plus potassium ethanoate contains hydrogen, chloride, potassium and ethanoate ions. Subtracting potassium chloride removes potassium and chloride, leaving exactly hydrogen and ethanoate. The answer is three hundred and ninety point five.',
    }),
    sl('example', 'Worked example: degree of dissociation and Ka', {
      b: r`**Problem.** A $0.050\ \text{M}$ ethanoic acid solution has $\Lambda_\text{m} = 7.30\ \text{S cm}^2\ \text{mol}^{-1}$. Using $\Lambda^\circ_\text{m} = 390.5$, find $\alpha$ and $K_\text{a}$.

**Step 1.** $\alpha = 7.30 \div 390.5 = 0.0187$.

**Step 2.** $K_\text{a} = \dfrac{c\alpha^2}{1 - \alpha} = \dfrac{0.050 \times (0.0187)^2}{0.9813} \approx 1.78 \times 10^{-5}$.`,
      v: table(['Quantity', 'Value'], [['Λm', '7.30'], ['Λ°m', '390.5'], ['α', '0.0187'], ['Ka', 'about 1.78 × 10⁻⁵']], 'Table of results for ethanoic acid'),
      n: 'For a weak electrolyte, the measured molar conductance divided by the limiting value gives the fraction of molecules ionised: here just under two percent. Substituting into the expression for the dissociation constant gives about one point eight times ten to the minus five, the familiar value for ethanoic acid.',
    }),
    sl('check', 'Quick check: Kohlrausch’s law', {
      b: 'Combine limiting molar conductances of ions or salts.',
      n: 'Quick check. Write out the ions in each electrolyte and make sure the unwanted ones cancel.',
      chk: 'kohlrausch-mcq',
    }),
    sl('check', 'Quick check: cell constant', {
      b: 'Use the cell constant and resistance to find κ, or vice versa.',
      n: 'Quick check. Specific conductance equals cell constant divided by resistance.',
      chk: 'cellconst-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Metals conduct by electrons; electrolytes by ions, with chemical change.',
        r`$\kappa = G^*/R$; $\Lambda_\text{m} = \kappa \times 1000/M$; $\Lambda_\text{eq} = \kappa \times 1000/N$.`,
        'On dilution κ decreases while Λm and Λeq increase.',
        'Strong electrolytes: Λm = Λ°m − A√c; weak: steep rise at high dilution.',
        r`Kohlrausch: $\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-$; $\alpha = \Lambda_\text{m}/\Lambda^\circ_\text{m}$.`,
      ],
      v: table(['Quantity', 'Relation'], [['Specific conductance', 'κ = G*/R'], ['Molar conductance', 'Λm = 1000κ/M'], ['Equivalent conductance', 'Λeq = 1000κ/N'], ['Degree of dissociation', 'α = Λm/Λ°m']], 'Summary table of conductance relations'),
      n: 'Let us sum up Part 1. Electrolytes conduct by moving ions. Specific conductance comes from the cell constant and the resistance, and dividing by concentration gives molar or equivalent conductance, which rise on dilution. Strong and weak electrolytes behave differently on dilution, and Kohlrausch’s law gives limiting values, degrees of dissociation and dissociation constants for weak electrolytes.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Use κ in S cm⁻¹ and concentration in mol L⁻¹ (or eq L⁻¹) with the factor 1000.',
        'Distinguish molar and equivalent conductance: Λm = n Λeq.',
        'In Kohlrausch combinations, check that unwanted ions cancel.',
        'Always state units: S cm² mol⁻¹ or S cm² eq⁻¹.',
      ],
      v: table(['Slip', 'Fix'], [['Dropping the factor 1000', 'Include it when c is per litre'], ['κ increases on dilution', 'κ decreases; Λm increases'], ['Extrapolating weak electrolytes', 'Use Kohlrausch’s law']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Watch the factor of a thousand and the units. Keep molar and equivalent conductance apart. Write the ions out in Kohlrausch problems so you can see them cancel. And remember that the limiting value for a weak electrolyte cannot be found from a graph.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electrolytic Conductance, Electrolysis, Batteries and Corrosion — Part 2: Electrolysis, cells and corrosion',
  goals: [
    'State and apply Faraday’s first and second laws of electrolysis, and relate the faraday to Avogadro’s number and the electronic charge',
    'Write electrode reactions for the dry cell, mercury cell, lead storage battery and hydrogen–oxygen fuel cell',
    'Distinguish primary from secondary cells',
    'Explain rusting as an electrochemical process and describe methods of preventing corrosion',
  ],
  slides: [
    sl('title', 'Electricity making chemicals, chemicals making electricity', {
      b: 'Part 2 — electrolysis, batteries, fuel cells and the corrosion of iron.',
      v: flow('LR', [['a', 'Faraday’s laws'], ['b', 'Primary cells'], ['c', 'Secondary cells'], ['d', 'Fuel cells'], ['e', 'Corrosion']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of topics in Part 2'),
      n: 'In Part 2 we look at both directions of electrochemistry. Faraday’s laws tell us how much product electrolysis makes. Batteries and fuel cells turn chemical reactions into useful electricity, and rusting turns out to be an unwanted electrochemical cell on the surface of iron, which we can stop in several clever ways.',
    }),
    sl('diagram', 'Electrolysis', {
      b: 'In an **electrolytic cell** a battery pushes electrons into the **cathode**, where cations are reduced, and draws them from the **anode**, where anions (or the anode metal) are oxidised.',
      v: V.electrolysis,
      n: 'In electrolysis, a battery pumps electrons into one electrode, the cathode, which becomes negative and attracts cations; they gain electrons and are reduced. The other electrode, the anode, is positive, and anions give up their electrons there and are oxidised. Electroplating, refining of copper and the manufacture of sodium and chlorine all depend on electrolysis.',
    }),
    sl('concept', 'Faraday’s laws of electrolysis', {
      b: r`**First law:** the mass of a substance deposited or liberated at an electrode is proportional to the quantity of electricity passed: $m = ZQ = ZIt$, where $Z$ is the **electrochemical equivalent**. **Second law:** when the same quantity of electricity passes through different electrolytes, the masses of substances deposited are proportional to their **equivalent masses**: $\dfrac{m_1}{m_2} = \dfrac{E_1}{E_2}$.`,
      m: [r`m = ZIt = \frac{E\,It}{F} = \frac{M\,It}{nF}`, r`\frac{m_1}{m_2} = \frac{E_1}{E_2}`],
      v: table(['Electrode reaction', 'Faradays per mole of product', 'Equivalent mass'], [['Ag⁺ + e⁻ → Ag', '1', '108'], ['Cu²⁺ + 2e⁻ → Cu', '2', '31.75'], ['Al³⁺ + 3e⁻ → Al', '3', '9'], ['2H⁺ + 2e⁻ → H₂', '2 (per mol H₂)', '1']], 'Table of faradays required and equivalent masses for some electrode reactions'),
      n: 'Faraday found two rules. First, the mass of product is proportional to the charge passed, current times time; the constant is called the electrochemical equivalent. Second, the same charge deposits masses in the ratio of their equivalent masses: the molar mass divided by the number of electrons each ion needs. So the charge that deposits a hundred and eight grams of silver deposits only thirty one point seven five grams of copper.',
    }),
    sl('concept', 'The faraday', {
      b: r`One **faraday** is the charge on one mole of electrons: $F = N_\text{A}e = 6.022 \times 10^{23} \times 1.602 \times 10^{-19} \approx 96500\ \text{C mol}^{-1}$. It deposits one gram equivalent of any substance.`,
      m: [r`F = N_\text{A}\, e \approx 96500\ \text{C mol}^{-1}`],
      v: table(['Quantity', 'Value'], [['Avogadro constant N_A', '6.022 × 10²³ mol⁻¹'], ['Electronic charge e', '1.602 × 10⁻¹⁹ C'], ['Faraday F = N_A e', 'about 96 500 C mol⁻¹'], ['Charge to deposit 1 mol Cu', '2F = 193 000 C']], 'Table of the Avogadro constant, electronic charge and the faraday'),
      n: 'Why is the faraday about ninety six thousand five hundred coulombs? It is simply the charge on one electron multiplied by the number of electrons in a mole: one point six times ten to the minus nineteen coulomb times six times ten to the twenty three. This charge deposits one gram equivalent of any substance, which is the second law in another form.',
    }),
    sl('example', 'Worked example: copper plating', {
      b: r`**Problem.** A current of $2.0\ \text{A}$ is passed through copper sulfate solution for $30$ minutes. What mass of copper is deposited? ($M = 63.5$)

**Step 1.** $Q = It = 2.0 \times 1800 = 3600\ \text{C}$.

**Step 2.** Moles of electrons $= 3600 \div 96500 = 0.0373$.

**Step 3.** $\ce{Cu^2+ + 2e- -> Cu}$: moles of Cu $= 0.0373 \div 2 = 0.01865$; mass $= 0.01865 \times 63.5 = 1.18\ \text{g}$.`,
      v: flow('LR', [['a', 'Q = I × t (seconds)'], ['b', 'mol e⁻ = Q ÷ F'], ['c', 'mol product = mol e⁻ ÷ n'], ['d', 'mass = mol × M']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for a Faraday’s law calculation'),
      n: 'Convert thirty minutes to eighteen hundred seconds, so the charge is three thousand six hundred coulombs. Dividing by the faraday gives about three and three quarter hundredths of a mole of electrons. Each copper ion needs two electrons, so we get half that number of moles of copper, and multiplying by the molar mass gives about one point one eight grams.',
    }),
    sl('example', 'Worked example: cells in series (second law)', {
      b: r`**Problem.** The same current flows through silver nitrate and copper sulfate solutions in series. $2.16\ \text{g}$ of silver is deposited. What mass of copper is deposited? (Equivalent masses: Ag 108, Cu 31.75)

**Step 1.** By the second law, $\dfrac{m_\text{Cu}}{m_\text{Ag}} = \dfrac{E_\text{Cu}}{E_\text{Ag}}$.

**Step 2.** $m_\text{Cu} = 2.16 \times \dfrac{31.75}{108} = 0.635\ \text{g}$.`,
      v: table(['Cell', 'Equivalent mass', 'Mass deposited'], [['Silver nitrate', '108', '2.16 g'], ['Copper sulfate', '31.75', '0.635 g']], 'Table of masses deposited in two cells in series'),
      n: 'Cells joined in series carry exactly the same charge. So the masses deposited are in the ratio of the equivalent masses. Two point one six grams of silver is two hundredths of an equivalent, so the copper cathode gains two hundredths of an equivalent of copper too: nought point six three five grams.',
    }),
    sl('check', 'Quick check: Faraday’s laws', {
      b: 'Find the charge needed, or the mass deposited, in an electrolysis.',
      n: 'Quick check. One faraday deposits one gram equivalent: one mole of a singly charged ion, half a mole of a doubly charged one.',
      chk: 'faraday-mcq',
    }),
    sl('concept', 'Primary and secondary cells', {
      b: 'A **primary cell** cannot be recharged: once its reactants are used up, it is discarded (dry cell, mercury cell). A **secondary cell** can be recharged by passing current through it in the opposite direction (lead storage battery, nickel–cadmium cell).',
      v: table(['Cell', 'Type', 'Anode', 'Cathode and electrolyte', 'Voltage'], [['Leclanché (dry) cell', 'Primary', 'Zinc container', 'Carbon rod + MnO₂; NH₄Cl and ZnCl₂ paste', 'about 1.5 V'], ['Mercury cell', 'Primary', 'Zn–Hg amalgam', 'HgO + carbon paste; KOH + ZnO', 'about 1.35 V, constant'], ['Lead storage battery', 'Secondary', 'Pb', 'PbO₂; about 38% H₂SO₄', 'about 2 V per cell'], ['Nickel–cadmium', 'Secondary', 'Cd', 'NiO(OH); KOH', 'about 1.2 V']], 'Table of primary and secondary cells'),
      n: 'Batteries come in two families. A primary cell, such as the dry cell in a torch, runs its reaction once and is then thrown away. A secondary cell, such as the lead storage battery in a car or the nickel cadmium cell, can be recharged: an outside supply drives the reaction backwards, restoring the original substances.',
    }),
    sl('concept', 'The dry cell and the mercury cell', {
      b: '**Leclanché cell:** zinc container (anode) and carbon rod surrounded by MnO₂ and carbon (cathode), in a moist paste of NH₄Cl and ZnCl₂. **Mercury cell:** used in hearing aids and watches; its voltage stays **constant** because the overall reaction involves no ions whose concentration changes.',
      m: [r`\text{Dry cell anode: } \ce{Zn -> Zn^2+ + 2e-}`, r`\text{Dry cell cathode: } \ce{MnO2 + NH4+ + e- -> MnO(OH) + NH3}`, r`\text{Mercury cell anode: } \ce{Zn(s) + 2OH- -> ZnO(s) + H2O + 2e-}`, r`\text{Mercury cell cathode: } \ce{HgO + H2O + 2e- -> Hg(l) + 2OH-}`, r`\text{Overall: } \ce{Zn(s) + HgO(s) -> ZnO(s) + Hg(l)}`],
      v: table(['Feature', 'Dry cell', 'Mercury cell'], [['Voltage', 'about 1.5 V, falls with use', 'about 1.35 V, constant'], ['Electrolyte', 'NH₄Cl/ZnCl₂ paste', 'KOH/ZnO paste'], ['Use', 'Torches, clocks, remotes', 'Hearing aids, watches']], 'Table comparing the dry cell and the mercury cell'),
      n: 'In a dry cell, the zinc case is the anode and dissolves; manganese dioxide around the carbon rod is reduced at the cathode. Ammonia formed there combines with zinc ions. Its voltage drops slowly with use. In the mercury cell, the overall reaction is zinc plus mercury oxide giving zinc oxide and mercury, all solids or liquids, so no ion concentration changes and the voltage stays steady at about one point three five volts.',
    }),
    sl('concept', 'The lead storage battery', {
      b: r`**Discharge:** both electrodes become coated with PbSO₄ and H₂SO₄ is consumed (density falls). **Charging:** an external source reverses the reactions.`,
      m: [r`\text{Anode: } \ce{Pb(s) + SO4^2-(aq) -> PbSO4(s) + 2e-}`, r`\text{Cathode: } \ce{PbO2(s) + SO4^2-(aq) + 4H+(aq) + 2e- -> PbSO4(s) + 2H2O(l)}`],
      v: chem('Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O', 'Overall discharge reaction of the lead storage battery', 'Charging drives this reaction from right to left.'),
      n: 'In a car battery, lead is the anode and lead dioxide the cathode, both in sulfuric acid. As it discharges, both plates become coated with lead sulfate and the acid is used up, so its density falls; a hydrometer reading tells the state of charge. When the engine runs, the alternator drives the reactions backwards and recharges the battery.',
    }),
    sl('diagram', 'The hydrogen–oxygen fuel cell', {
      b: 'A **fuel cell** converts the energy of a fuel directly into electricity, with reactants supplied continuously. Hydrogen and oxygen bubble through porous carbon electrodes (with Pt or Pd catalyst) into hot aqueous KOH or NaOH. Efficiency about 70%; the only product is water; used in spacecraft.',
      v: V.fuelcell,
      m: [r`\text{Anode: } \ce{2H2(g) + 4OH-(aq) -> 4H2O(l) + 4e-}`, r`\text{Cathode: } \ce{O2(g) + 2H2O(l) + 4e- -> 4OH-(aq)}`],
      n: 'A fuel cell is a galvanic cell that keeps running as long as fuel is fed in. Hydrogen is oxidised at one porous electrode and oxygen is reduced at the other, with hot alkali between them. The overall reaction is just hydrogen and oxygen forming water, but without a flame, so about seventy percent of the energy comes out as electricity, and the water produced was drunk by astronauts.',
    }),
    sl('check', 'Quick check: cells', {
      b: 'Identify a primary or secondary cell, or explain a property of the mercury cell or fuel cell.',
      n: 'Quick check. Rechargeable cells are secondary. A cell with no changing ion concentrations gives a constant voltage.',
      chk: 'battery-mcq',
    }),
    sl('diagram', 'Corrosion: an electrochemical process', {
      b: 'On moist iron, one region acts as an **anode** where iron is oxidised and another as a **cathode** where oxygen is reduced (helped by H⁺ from dissolved CO₂). Fe²⁺ is oxidised further by air and forms **rust**, Fe₂O₃·xH₂O. **Factors:** moisture, oxygen, electrolytes (salt water), acidic gases (CO₂, SO₂), contact with a less reactive metal, impurities and strain in the metal.',
      v: V.rust,
      m: [r`\text{Anode: } \ce{2Fe(s) -> 2Fe^2+(aq) + 4e-}`, r`\text{Cathode: } \ce{O2(g) + 4H+(aq) + 4e- -> 2H2O(l)}`, r`\ce{2Fe(s) + O2(g) + 4H+(aq) -> 2Fe^2+(aq) + 2H2O(l)}`],
      n: 'Rusting is a tiny galvanic cell. Under a drop of water, iron at one spot gives up electrons and dissolves as iron two ions. The electrons travel through the metal to another spot, where oxygen takes them, helped by hydrogen ions from dissolved carbon dioxide. Air oxidises the iron ions further to hydrated iron three oxide: rust. Salt, acid gases and contact with less reactive metals all speed it up.',
    }),
    sl('concept', 'Preventing corrosion', {
      b: 'Keep oxygen and water away, or make another metal corrode instead.',
      v: table(['Method', 'How it works', 'Example'], [['Barrier coating', 'Paint, oil, grease, plastic shut out air and water', 'Painted gates, oiled tools'], ['Galvanising', 'Zinc coating; Zn (−0.76 V) is oxidised first even if scratched', 'Galvanised roofing sheets'], ['Tinning', 'Tin coating as a barrier (but iron rusts faster once scratched)', 'Food cans'], ['Sacrificial (cathodic) protection', 'A more active metal (Mg, Zn) joined to iron corrodes instead', 'Magnesium blocks on ships and pipelines'], ['Alloying', 'Chromium and nickel form a protective oxide film', 'Stainless steel']], 'Table of methods of preventing corrosion'),
      n: 'To stop corrosion we either shut out air and water or let another metal corrode first. Paint and oil are barriers. Zinc coating, or galvanising, protects even where scratched, because zinc is more easily oxidised than iron. Tin is only a barrier: once a tin can is scratched, the iron rusts faster. Ships and pipelines carry blocks of magnesium that slowly dissolve, and stainless steel contains chromium, which forms a protective oxide layer.',
    }),
    sl('check', 'Quick check: corrosion', {
      b: 'Choose a sacrificial metal or explain a corrosion observation.',
      n: 'Quick check. A sacrificial anode must have a more negative reduction potential than iron.',
      chk: 'sacrificial-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Faraday’s first law m = ZIt; second law m₁/m₂ = E₁/E₂; F = N_A e ≈ 96500 C mol⁻¹.',
        'Primary cells (dry, mercury) are not rechargeable; secondary cells (lead storage, Ni–Cd) are.',
        'Mercury cell voltage is constant; lead storage battery acid density falls on discharge.',
        'H₂–O₂ fuel cell: continuous supply, about 70% efficient, product water.',
        'Rusting is electrochemical; prevented by barriers, galvanising, sacrificial anodes, alloying.',
      ],
      v: table(['Device', 'Key reaction or idea'], [['Electrolysis', 'm = MIt/(nF)'], ['Lead battery', 'Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O'], ['Fuel cell', '2H₂ + O₂ → 2H₂O'], ['Rusting', '2Fe + O₂ + 4H⁺ → 2Fe²⁺ + 2H₂O']], 'Summary table of Part 2'),
      n: 'Let us sum up Part 2. Faraday’s laws link the charge passed to the mass of product, and the faraday is Avogadro’s number of electronic charges. Primary cells are used once; secondary cells are recharged. The mercury cell gives a steady voltage and the fuel cell runs on a continuous supply of hydrogen and oxygen. Rusting is an electrochemical process that we prevent with coatings and sacrificial metals.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Convert time to seconds in Faraday problems.',
        'For the second law, use equivalent masses (M ÷ n).',
        'Write electrode reactions for each cell with states.',
        'Explain why galvanising protects even when scratched.',
      ],
      v: table(['Slip', 'Fix'], [['Time in minutes', 'Use seconds'], ['Mercury cell voltage falls', 'It stays constant'], ['Tinning protects like galvanising', 'Tin is only a barrier']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Always convert time to seconds. For the second law, work with equivalent masses. Learn the electrode reactions of each cell. And be ready to explain why zinc protects iron even when the coating is scratched, while tin does not.',
    }),
  ],
});

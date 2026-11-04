// ch09 Hydrocarbons — two decks: Part 1 (t01, t02) alkanes and alkenes; Part 2 (t03, t04) alkynes and aromatic hydrocarbons.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { NEWMAN, ENERGY, CISTRANS, MARKOV_MECH, MARKOV_ENERGY, KEKULE, PICLOUD, EAS_MECH } from './svgs.mjs';

export const V = {
  newman: svgV(NEWMAN, 'Newman projections of staggered and eclipsed ethane and a sawhorse projection of the staggered form', 'Blue hydrogens are on the front carbon, green on the back carbon.'),
  energy: svgV(ENERGY, 'Potential energy of ethane against dihedral angle, repeating every 120 degrees, with maxima of 12.5 kilojoules per mole at the eclipsed conformations', 'The curve is computed from E = 6.25 (1 + cos 3θ) kJ mol⁻¹, θ measured from the eclipsed form.'),
  cistrans: svgV(CISTRANS, 'Planar drawings of cis-but-2-ene and trans-but-2-ene with their boiling points, melting points and polarity'),
  markov: svgV(MARKOV_MECH, 'Curly-arrow mechanism of the addition of HBr to propene through a secondary carbocation to 2-bromopropane', 'Red arrows show the π electrons attacking H; the blue arrow is the lone pair of bromide attacking the carbocation.'),
  markovE: svgV(MARKOV_ENERGY, 'Schematic energy profile comparing the secondary and primary carbocation routes for HBr addition to propene', 'Schematic; the energies are not measured values.'),
  kekule: svgV(KEKULE, 'Two Kekulé structures of benzene, the resonance arrows between them and the hybrid drawn with a circle'),
  pi: svgV(PICLOUD, 'Side view of six parallel p orbitals of benzene and the doughnut-shaped delocalised π cloud above and below the ring plane'),
  eas: svgV(EAS_MECH, 'Two-step mechanism of electrophilic substitution of benzene: attack on the electrophile to form the arenium ion, then loss of a proton to restore the ring', 'Red arrow: π electrons attack E⁺. Blue arrow: the C–H bond electrons return to the ring.'),
};

// Hückel table, computed: aromatic only if planar, cyclic, fully conjugated and 4n + 2 π electrons.
const huckel = (e) => e >= 2 && (e - 2) % 4 === 0;
const HK = [
  ['Benzene', 6, true],
  ['Naphthalene', 10, true],
  ['Anthracene', 14, true],
  ['Cyclobutadiene', 4, true],
  ['Cyclooctatetraene (tub-shaped)', 8, false],
].map(([name, e, planar]) => [name, String(e), planar ? 'Yes' : 'No', huckel(e) ? `Yes (n = ${(e - 2) / 4})` : 'No', planar && huckel(e) ? 'Aromatic' : 'Not aromatic']);

export const deck1 = deck({
  part: 1,
  title: 'Hydrocarbons — Part 1: Alkanes and alkenes',
  goals: [
    'Name alkanes, draw their chain isomers and write their methods of preparation',
    'Explain the free-radical halogenation of alkanes and the conformations of ethane',
    'Describe the structure, geometric isomerism and preparation of alkenes',
    'Predict products of addition to alkenes using Markovnikov’s rule, the peroxide effect and ozonolysis',
  ],
  slides: [
    sl('title', 'Hydrocarbons', {
      b: 'Part 1 — compounds of carbon and hydrogen only: alkanes (single bonds) and alkenes (a C=C double bond). Chapter 9 is taught for the school annual examination.',
      v: table(['Hydrocarbon', 'Where you meet it'], [['Propane and butane', 'LPG in kitchen cylinders'], ['Octane and its isomers', 'Petrol for scooters and cars'], ['Ethene', 'Raw material of polythene bags'], ['Ethyne', 'Gas welding and cutting'], ['Benzene and toluene', 'Solvents and starting materials for dyes and drugs']], 'Table of hydrocarbons met in daily life'),
      n: 'Namaste! The gas in a kitchen cylinder, the petrol in a scooter, the polythene bag from the market and the flame of a welder are all hydrocarbons, compounds made of carbon and hydrogen only. In this chapter we meet four families. Part one covers alkanes and alkenes: how to name them, make them, and predict what they do when other reagents attack.',
    }),
    sl('concept', 'Families of hydrocarbons', {
      b: 'Hydrocarbons are classified as **saturated** (only single bonds) and **unsaturated** (C=C or C≡C), and as **open-chain or ring** (alicyclic and aromatic).',
      v: table(['Family', 'General formula', 'Carbon hybridisation', 'Shape at carbon', 'Example'], [['Alkanes', 'CₙH₂ₙ₊₂', 'sp³', 'Tetrahedral, 109.5°', 'Pentane'], ['Alkenes', 'CₙH₂ₙ', 'sp² (C=C)', 'Trigonal planar, 120°', 'Pent-1-ene'], ['Alkynes', 'CₙH₂ₙ₋₂', 'sp (C≡C)', 'Linear, 180°', 'Pent-1-yne'], ['Arenes', 'Benzene: C₆H₆', 'sp²', 'Planar ring', 'Methylbenzene']], 'Table of the hydrocarbon families with general formula, hybridisation and shape'),
      n: 'Hydrocarbons are sorted by the bonds between their carbon atoms. Alkanes have only single bonds, so every carbon is sp three hybridised and tetrahedral. Alkenes have a carbon carbon double bond, with sp two carbons that are flat. Alkynes have a triple bond and a straight sp carbon. Arenes contain the special ring of benzene. Remember the general formulas, because they tell you the degree of unsaturation.',
    }),
    sl('concept', 'Naming alkanes and chain isomerism', {
      b: 'Choose the **longest chain**, number from the end nearer the first branch, and list substituents **alphabetically**. Alkanes with four or more carbons show **chain isomerism**.',
      v: table(['Formula', 'Number of chain isomers', 'Example of an isomer'], [['C₄H₁₀', '2', '2-Methylpropane'], ['C₅H₁₂', '3', '2,2-Dimethylpropane'], ['C₆H₁₄', '5', '2,3-Dimethylbutane'], ['C₇H₁₆', '9', '2,2,3-Trimethylbutane']], 'Table of the number of chain isomers of butane, pentane, hexane and heptane with an example'),
      n: 'To name an alkane, find the longest continuous chain, number it from the end that gives the first branch the lowest number, and write the branches in alphabetical order. Because carbon atoms can be joined in different sequences, alkanes from four carbons upward show chain isomerism. Butane has two isomers, pentane three, hexane five and heptane nine. The count grows quickly with size.',
    }),
    sl('example', 'Worked example: naming and counting isomers', {
      b: r`**Problem.** (a) Name $\ce{(CH3)2CHCH2C(CH3)3}$. (b) Draw all chain isomers of $\ce{C5H12}$ and name them.

**(a)** Longest chain: five carbons (pentane). Methyl groups on C2, C2 and C4 when numbered from the end that gives the first branch the lower number: **2,2,4-trimethylpentane**.

**(b)** Pentane; 2-methylbutane; 2,2-dimethylpropane. Three isomers. The most branched has the lowest boiling point.`,
      v: flow('LR', [['a', 'Longest chain'], ['b', 'Lowest locant to first branch'], ['c', 'Alphabetical prefixes'], ['d', 'Add locants and multipliers']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for naming an alkane: longest chain, lowest locants, alphabetical order, locants and multiplying prefixes'),
      n: 'Follow the steps in order. First find the longest chain, here five carbons, so the parent is pentane. Number it so the first branch gets the smaller number. Three methyl groups give the prefix trimethyl with locants two, two and four. For the isomer count, shorten the main chain one carbon at a time and move the branch around. Pentane gives exactly three isomers.',
    }),
    sl('concept', 'Preparation of alkanes', {
      b: '**Hydrogenation** of alkenes or alkynes (Ni, Pt or Pd) and **reduction** of alkyl halides (Zn and acid) keep the carbon number. **Wurtz reaction** doubles the alkyl group; **decarboxylation** loses one carbon; **Kolbe electrolysis** joins two alkyl groups.',
      m: [r`\ce{CH3CH2Cl + Zn + HCl -> CH3CH3 + ZnCl2}`, r`\ce{2CH3Br + 2Na ->[dry ether] C2H6 + 2NaBr}`, r`\ce{CH3COONa + NaOH ->[CaO, heat] CH4 + Na2CO3}`, r`\ce{2CH3COONa + 2H2O ->[electrolysis] C2H6 + 2CO2 + H2 + 2NaOH}`],
      v: table(['Method', 'Reactant', 'Carbon count of alkane'], [['Hydrogenation (Ni, 473–573 K)', 'Alkene or alkyne', 'Same'], ['Reduction (Zn, H⁺)', 'Alkyl halide', 'Same'], ['Wurtz (Na, dry ether)', 'Alkyl halide', 'Doubled'], ['Decarboxylation (soda lime)', 'Sodium carboxylate', 'One less'], ['Kolbe electrolysis (aqueous)', 'Sodium or potassium carboxylate', 'Doubled, minus two carbons as CO₂']], 'Table of five methods of preparing alkanes and the carbon count of the alkane'),
      n: 'There are five routes to alkanes. Hydrogen adds across a double or triple bond over a nickel, platinum or palladium catalyst. A halide can be reduced by zinc and acid. In the Wurtz reaction sodium in dry ether joins two alkyl groups. Heating a sodium carboxylate with soda lime removes one carbon as carbonate. Electrolysing a carboxylate joins two alkyl groups at the anode. Watch how each method changes the carbon count.',
    }),
    sl('concept', 'Physical properties of alkanes', {
      b: 'Alkanes are **non-polar**: insoluble in water, soluble in non-polar solvents. Boiling point rises with chain length (stronger van der Waals forces) and **falls with branching** (smaller surface area). Methane to butane are gases at room temperature.',
      v: table(['Alkane', 'Boiling point / K'], [['Methane', '112'], ['Ethane', '184'], ['Propane', '231'], ['Butane', '273'], ['Pentane', '309'], ['2-Methylbutane', '301'], ['2,2-Dimethylpropane', '283']], 'Table of boiling points of alkanes showing the rise with chain length and the fall with branching in the pentane isomers'),
      n: 'Alkane molecules are non-polar, held together only by weak van der Waals forces. These grow with molecular size, so boiling points climb steadily from methane to octane. For isomers with the same mass, a branched molecule is more compact, touches its neighbours over a smaller area, and therefore boils lower. That is why the pentane isomers boil in the order shown in the table.',
    }),
    sl('concept', 'Chemical properties of alkanes', {
      b: 'Alkanes are fairly unreactive (strong, non-polar C–C and C–H bonds) but burn, and react under special conditions.',
      m: [r`\ce{CH4 + 2O2 -> CO2 + 2H2O}`, r`\ce{2CH3CH3 + 3O2 ->[(CH3COO)2Mn] 2CH3COOH + 2H2O}`, r`\ce{CH3CH2CH2CH3 ->[anhyd. AlCl3/HCl] (CH3)2CHCH3}`, r`\ce{C6H14 ->[Cr2O3/V2O5, 773 K, 10-20 atm] C6H6 + 4H2}`, r`\ce{C12H26 ->[773 K, catalyst] C6H14 + C6H12}`],
      v: table(['Reaction', 'Conditions', 'Result'], [['Combustion', 'Excess air', 'CO₂ + H₂O; large heat release'], ['Controlled oxidation', 'Cu, 523 K, 100 atm; or Mn(II) ethanoate', 'Methanol; ethanoic acid'], ['Isomerisation', 'Anhydrous AlCl₃ and HCl', 'Straight chain to branched chain'], ['Aromatisation', 'Cr₂O₃/V₂O₅, 773 K', 'Hexane to benzene'], ['Pyrolysis (cracking)', '773 K with catalyst', 'Smaller alkane + alkene']], 'Table of combustion, controlled oxidation, isomerisation, aromatisation and pyrolysis of alkanes'),
      n: 'Alkanes burn completely to carbon dioxide and water, releasing a lot of heat, which is why they are fuels. With limited oxygen and a catalyst they give alcohols or acids. Aluminium chloride rearranges a straight chain into a branched one. Heated with metal oxides under pressure, hexane loses hydrogen and becomes benzene. At high temperature, big alkanes crack into smaller alkanes and alkenes.',
    }),
    sl('concept', 'Halogenation: a free-radical chain', {
      b: 'In sunlight, methane and chlorine give chloromethane. The mechanism has three stages: **initiation** (light splits Cl₂ into Cl• atoms), **propagation** (two steps that regenerate a radical), **termination** (radicals combine).',
      m: [r`\ce{CH4 + Cl2 ->[hv] CH3Cl + HCl}`],
      v: flow('LR', [['i', 'Initiation: Cl–Cl splits into two Cl•'], ['p1', 'Propagation 1: Cl• + CH₄ gives HCl + CH₃•'], ['p2', 'Propagation 2: CH₃• + Cl₂ gives CH₃Cl + Cl•'], ['t', 'Termination: Cl• + Cl•, CH₃• + CH₃•, CH₃• + Cl•']], [['i', 'p1'], ['p1', 'p2'], ['p2', 'p1', 'chain repeats'], ['p2', 't']], 'Flow of the free-radical chain mechanism of chlorination of methane: initiation, two propagation steps that repeat, and termination'),
      n: 'Chlorination of methane is a chain reaction. Ultraviolet light splits a chlorine molecule into two chlorine atoms, each with an unpaired electron. A chlorine atom pulls a hydrogen from methane, making hydrogen chloride and a methyl radical. The methyl radical then takes a chlorine atom from another chlorine molecule, producing chloromethane and a fresh chlorine atom, so the chain goes on until radicals meet and combine.',
    }),
    sl('check', 'Quick check: radical chain', {
      b: 'Identify a propagation step.',
      n: 'Quick check. A propagation step uses up one radical and produces another radical.',
      chk: 'propagation-mcq',
    }),
    sl('diagram', 'Conformations of ethane', {
      b: 'Rotation about the C–C single bond gives different spatial arrangements called **conformations**. The two extremes are **staggered** (dihedral angle 60°, lowest energy) and **eclipsed** (0°, highest energy), shown as Newman and sawhorse projections.',
      v: V.newman,
      n: 'Because the sigma bond between the two carbons of ethane allows rotation, the hydrogens can take many relative positions. In a Newman projection we look straight down the carbon carbon bond. In the staggered form the back hydrogens sit midway between the front ones, as far apart as possible. In the eclipsed form they are exactly behind the front ones, so the electron clouds of the bonds repel more.',
    }),
    sl('diagram', 'Energy and torsional strain', {
      b: 'Rotating one CH₃ group by 360° gives three energy maxima and three minima. The eclipsed form is about **12.5 kJ mol⁻¹** higher in energy than the staggered form (torsional strain), yet the barrier is small enough for rotation to be almost free at room temperature.',
      v: V.energy,
      n: 'This graph plots the energy of ethane as one methyl group turns. Every sixty degrees the molecule swaps between a staggered minimum and an eclipsed maximum. The energy gap is about twelve point five kilojoules per mole, called torsional strain. Thermal energy at room temperature is only about two and a half kilojoules per mole, but molecules collide hard enough that the barrier is crossed countless times each second.',
    }),
    sl('check', 'Quick check: dihedral angle', {
      b: 'Relate conformation to dihedral angle and energy.',
      n: 'Quick check. Picture the Newman projection and the angle between a front and a nearest back hydrogen.',
      chk: 'dihedral-mcq',
    }),
    sl('example', 'Worked example: how often is ethane eclipsed?', {
      b: r`**Problem.** Estimate the ratio of molecules in one eclipsed conformation to one staggered conformation at 298 K, given a barrier of $12.5\ \text{kJ mol}^{-1}$. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$; ignore entropy differences.)

**Step 1.** $RT = 8.314 \times 298 \approx 2478\ \text{J mol}^{-1} = 2.478\ \text{kJ mol}^{-1}$.

**Step 2.** Ratio $= e^{-12.5/2.478} = e^{-5.04}$.

**Step 3.** $e^{-5.04} \approx 6.4 \times 10^{-3}$: only about 6 eclipsed molecules for every 1000 staggered ones, so ethane spends almost all its time staggered.`,
      v: V.energy,
      n: 'We compare the barrier with the thermal energy. At room temperature, R times T is about two point five kilojoules per mole. The barrier is five times larger, so the fraction of molecules found at the top of the barrier is e to the power of minus five, about six in a thousand. Ethane therefore spends nearly all its time in the staggered form, although it keeps turning through every angle.',
    }),
    sl('concept', 'Alkenes: structure and geometric isomerism', {
      b: 'The C=C carbons are sp² hybridised; the double bond is one **σ** and one **π** bond (sideways overlap of p orbitals). The π bond prevents rotation, so alkenes with **two different groups on each double-bond carbon** show **cis–trans isomerism**.',
      v: V.cistrans,
      n: 'In an alkene the two double bond carbons use sp two orbitals for sigma bonds, and the leftover p orbitals overlap sideways to form a pi bond. Breaking that overlap would need a lot of energy, so there is no free rotation. If each carbon holds two different groups, two arrangements are possible. The cis isomer has similar groups on the same side, the trans isomer on opposite sides. They differ in polarity, boiling point and melting point.',
    }),
    sl('concept', 'Preparation of alkenes', {
      b: '**Partial reduction of alkynes:** Lindlar catalyst gives the **cis** alkene; sodium in liquid ammonia gives the **trans** alkene. **Dehydrohalogenation** (alcoholic KOH), **dehydration** of alcohols (conc. H₂SO₄) and **dehalogenation** of vicinal dihalides (Zn) also give alkenes.',
      m: [r`\ce{CH3CH2Br + KOH ->[alcohol, heat] CH2=CH2 + KBr + H2O}`, r`\ce{CH3CH2OH ->[conc. H2SO4, 443 K] CH2=CH2 + H2O}`, r`\ce{BrCH2CH2Br + Zn -> CH2=CH2 + ZnBr2}`],
      v: table(['Starting material', 'Reagent', 'Product'], [['But-2-yne', 'H₂, Pd/CaCO₃ poisoned with quinoline (Lindlar)', 'cis-But-2-ene'], ['But-2-yne', 'Na in liquid NH₃', 'trans-But-2-ene'], ['Bromoethane', 'Alcoholic KOH, heat', 'Ethene'], ['Propan-2-ol', 'Conc. H₂SO₄, heat', 'Propene'], ['1,2-Dibromoethane', 'Zn dust', 'Ethene']], 'Table of five methods of preparing alkenes with reagent and product'),
      n: 'Alkenes can be made in several ways. Partial hydrogenation of an alkyne over a poisoned palladium catalyst, the Lindlar catalyst, stops at the cis alkene, while sodium in liquid ammonia gives the trans alkene. Alcoholic potassium hydroxide removes a hydrogen halide from a haloalkane. Concentrated sulfuric acid removes water from an alcohol. Zinc removes two halogens from a vicinal dihalide.',
    }),
    sl('diagram', 'Markovnikov addition: the carbocation path', {
      b: 'Unsymmetrical alkene + HX: **H adds to the carbon with more hydrogens** (Markovnikov’s rule). The π bond attacks H⁺ in the slow step to give the **more stable carbocation** (3° > 2° > 1°), which is then trapped by X⁻.',
      m: [r`\ce{CH3CH=CH2 + HBr -> CH3CHBrCH3}`],
      v: V.markov,
      n: 'Here is the mechanism with curly arrows. The pi electrons of propene attack the hydrogen of hydrogen bromide, and the bromine leaves with the bonding pair as bromide. Hydrogen could add to either carbon, but it goes to the end carbon, because that leaves the positive charge on the middle carbon, a secondary carbocation. Bromide then attacks it quickly, giving two bromopropane. That is Markovnikov addition.',
    }),
    sl('diagram', 'Why the secondary carbocation wins', {
      b: 'Alkyl groups **donate electrons** (inductive effect and hyperconjugation) and spread the positive charge, so a 2° carbocation is lower in energy than a 1° one. A lower intermediate means a lower first transition state, so that route is faster.',
      v: V.markovE,
      n: 'The energy profile makes the point. Both routes begin at the same place, but the primary carbocation sits higher in energy, because it has only one alkyl group to share its positive charge. A higher intermediate goes with a higher transition state, so the primary route is slower. Nearly all the product therefore comes through the secondary carbocation, which is the Markovnikov rule explained.',
    }),
    sl('check', 'Quick check: carbocation stability', {
      b: 'Rank carbocations or predict the Markovnikov product of a substituted alkene.',
      n: 'Quick check. Count the alkyl groups on the positively charged carbon.',
      chk: 'carbocation-mcq',
    }),
    sl('concept', 'Peroxide effect and other additions', {
      b: 'With **HBr only**, in the presence of a peroxide, addition is **anti-Markovnikov** by a free-radical chain (Kharasch effect): Br• adds first to give the more stable 2° radical. HCl and HI do not show it. Other additions: H₂ (Ni) gives alkanes; Br₂ in CCl₄ gives vicinal dibromides (red-brown colour disappears); H₂O with H⁺ follows Markovnikov.',
      m: [r`\ce{CH3CH2CH=CH2 + HBr ->[peroxide] CH3CH2CH2CH2Br}`, r`\ce{CH2=CH2 + Br2 -> BrCH2CH2Br}`, r`\ce{CH3CH=CH2 + H2O ->[H+] CH3CH(OH)CH3}`],
      v: table(['Reagent', 'Alkene', 'Main product'], [['HBr, no peroxide', 'But-1-ene', '2-Bromobutane'], ['HBr + peroxide', 'But-1-ene', '1-Bromobutane'], ['HCl + peroxide', 'But-1-ene', '2-Chlorobutane (no peroxide effect)'], ['Br₂ in CCl₄', 'Ethene', '1,2-Dibromoethane'], ['H₂O, H⁺', 'Propene', 'Propan-2-ol']], 'Table of additions to alkenes including the peroxide effect that occurs only with hydrogen bromide'),
      n: 'Peroxides change the course of hydrogen bromide addition, but only hydrogen bromide. A peroxide makes bromine atoms, and a bromine atom adds to the end carbon of the alkene, because that gives the more stable secondary radical. The radical then takes a hydrogen from hydrogen bromide. The result is anti Markovnikov. With hydrogen chloride or hydrogen iodide the chain steps are not favourable, so the usual product forms.',
    }),
    sl('concept', 'Ozonolysis, Baeyer’s test and polymerisation', {
      b: '**Ozonolysis** (O₃, then Zn and water) cuts the C=C bond and puts C=O on each carbon; the products tell you where the double bond was. **Baeyer’s test:** cold dilute alkaline KMnO₄ is decolourised and a vicinal diol forms. **Polymerisation:** many ethene molecules join to give polythene.',
      m: [r`\ce{CH3CH=CHCH3 + O3 + H2O ->[Zn] 2CH3CHO + H2O2}`, r`\ce{3CH2=CH2 + 2KMnO4 + 4H2O -> 3HOCH2CH2OH + 2MnO2 + 2KOH}`],
      v: table(['Alkene unit', 'Ozonolysis product from that carbon'], [['=CH₂', 'Methanal, HCHO'], ['=CHR', 'Aldehyde, RCHO'], ['=CR₂', 'Ketone, R₂C=O']], 'Table showing the carbonyl compound formed from each type of double-bond carbon in ozonolysis'),
      n: 'Three more reactions complete the picture. In ozonolysis, ozone cuts the double bond and each carbon becomes a carbonyl carbon. A carbon with two hydrogens gives methanal, one with a single alkyl group gives an aldehyde, and one with two alkyl groups gives a ketone. In the Baeyer test, purple permanganate turns brown as a diol forms. Finally, ethene molecules join in long chains to make polythene.',
    }),
    sl('example', 'Worked example: identify the alkene', {
      b: r`**Problem.** An alkene $\ce{C6H12}$ on ozonolysis (Zn, H₂O) gives only propanone. Identify it and check the formula.

**Step 1.** One product only, so the alkene is symmetrical: both carbons of C=C become $\ce{(CH3)2C=O}$.

**Step 2.** Join the two carbons: $\ce{(CH3)2C=C(CH3)2}$, **2,3-dimethylbut-2-ene**.

**Step 3.** Check: two $\ce{C3H6O}$ units give $\ce{C6H12}$ once the two oxygens are removed. ✓`,
      v: table(['Carbonyl product', 'Formula', 'Carbon that was in the C=C'], [['Propanone', 'C₃H₆O', '(CH₃)₂C='], ['Propanone', 'C₃H₆O', '=C(CH₃)₂']], 'Table showing two propanone molecules each contributing a dimethyl-substituted double-bond carbon'),
      n: 'To work backwards from ozonolysis products, remove the oxygen from each carbonyl and join the two carbons with a double bond. Here both fragments are propanone, so the alkene is symmetrical, with two methyl groups on each carbon: two three dimethylbut two ene. Check by adding the carbons: three plus three is six, and the hydrogens are six plus six, twelve. The formula agrees.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Alkanes CₙH₂ₙ₊₂: made by hydrogenation, Wurtz, decarboxylation, Kolbe; react by free-radical halogenation, combustion, isomerisation, aromatisation, cracking.',
        'Ethane conformations: staggered (60°) is the minimum, eclipsed (0°) is 12.5 kJ mol⁻¹ higher.',
        'Alkenes CₙH₂ₙ: sp², π bond, cis–trans isomerism; Lindlar gives cis, Na/NH₃ gives trans.',
        'Markovnikov via the more stable carbocation; peroxide effect for HBr only.',
        'Ozonolysis locates the double bond; Baeyer’s test detects it.',
      ],
      v: table(['Reaction', 'Alkane', 'Alkene'], [['Halogen (light)', 'Substitution, free radical', 'Addition (no light needed)'], ['HX', 'No reaction', 'Addition, Markovnikov'], ['KMnO₄ (cold, dilute)', 'No reaction', 'Decolourised'], ['Bromine in CCl₄', 'No reaction in the dark', 'Decolourised']], 'Table comparing the behaviour of alkanes and alkenes towards four reagents'),
      n: 'Let us sum up Part one. Alkanes are saturated and give substitution through free radicals. Ethane has staggered and eclipsed conformations separated by about twelve point five kilojoules per mole. Alkenes have a pi bond, show cis trans isomerism, and add reagents. Hydrogen halides add by Markovnikov’s rule through the more stable carbocation, except hydrogen bromide with peroxide. Ozonolysis tells us where the double bond was.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Name the longest chain first; alphabetical order beats numerical order of substituents.',
        'Draw Newman projections with the front bonds meeting at the centre and the back bonds starting at the circle.',
        'Peroxide effect: HBr only. Write the radical (not carbocation) mechanism.',
        'For ozonolysis, write the carbonyl compounds first, then join the carbons.',
        'Say "Lindlar, cis" and "Na in liquid NH₃, trans" together.',
      ],
      v: table(['Slip', 'Fix'], [['Peroxide effect with HCl', 'HBr only'], ['H adds to the carbon with fewer hydrogens', 'H goes to the carbon with more hydrogens'], ['Eclipsed shown as lower energy', 'Staggered is lower by 12.5 kJ mol⁻¹']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips for the examination. Always find the longest chain before naming. In a Newman projection, draw the circle for the back carbon. The peroxide effect belongs to hydrogen bromide alone. For ozonolysis, write the carbonyl compounds first and then join the carbons that carried the oxygen. And link the reagent with the geometry: Lindlar gives cis, sodium in liquid ammonia gives trans.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Hydrocarbons — Part 2: Alkynes and aromatic hydrocarbons',
  goals: [
    'Explain the acidity of terminal alkynes and write their preparation and addition reactions',
    'Describe the structure of benzene by resonance and apply the Hückel (4n + 2) rule',
    'Write the mechanism of electrophilic substitution and the five key reactions of benzene',
    'Predict the directive influence of substituents; state the toxicity of benzene and polynuclear hydrocarbons',
  ],
  slides: [
    sl('title', 'Alkynes and Aromatic Hydrocarbons', {
      b: 'Part 2 — the carbon–carbon triple bond and the special stability of benzene.',
      v: table(['Compound', 'Role'], [['Ethyne', 'Oxyacetylene flame for welding'], ['Benzene', 'Starting material for plastics and dyes; a toxic solvent'], ['Toluene', 'Solvent in paints'], ['Naphthalene', 'Moth balls (fused rings)']], 'Table of an alkyne and aromatic hydrocarbons and their uses'),
      n: 'Welcome to part two. Ethyne burns with a flame hot enough to cut steel, and benzene is the parent of thousands of dyes, drugs and plastics. Yet benzene does not behave like an alkene, even though it looks as if it has three double bonds. We shall see why, and we shall learn how benzene reacts, where new groups enter the ring, and why some aromatic compounds are dangerous.',
    }),
    sl('concept', 'Alkynes: structure', {
      b: 'In ethyne the carbons are **sp hybridised**: linear, 180°, one σ and two π bonds. The C≡C bond is short and strong.',
      v: table(['Bond', 'Length / pm', 'Enthalpy / kJ mol⁻¹', 'Hybridisation', 'Percent s-character'], [['C–C in ethane', '154', '347', 'sp³', '25'], ['C=C in ethene', '134', '611', 'sp²', '33'], ['C≡C in ethyne', '120', '837', 'sp', '50']], 'Table comparing bond length, enthalpy, hybridisation and s-character of ethane, ethene and ethyne carbon bonds'),
      n: 'In ethyne each carbon uses one s and one p orbital to make two sp hybrid orbitals, giving a straight molecule. The two leftover p orbitals on each carbon form two pi bonds. The triple bond is the shortest and strongest carbon carbon bond we meet. Notice the s character: it rises from twenty five to fifty percent as we go from alkane to alkyne, and this explains the acidity of ethyne.',
    }),
    sl('concept', 'Acidity of terminal alkynes', {
      b: 'An sp carbon holds its electrons closer to the nucleus (50% s-character), so it is more electronegative and the ≡C–H hydrogen is **weakly acidic**. Order of acidity: **ethyne > ethene > ethane**. Only **terminal** alkynes react with sodium or sodium amide.',
      m: [r`\ce{2CH#CH + 2Na -> 2CH#CNa + H2}`, r`\ce{CH#CH + NaNH2 -> CH#CNa + NH3}`],
      v: table(['Hydrocarbon', 'Carbon bearing H', 'Approximate pKa', 'Reacts with Na or NaNH₂?'], [['Ethyne', 'sp', '25', 'Yes'], ['Ethene', 'sp²', '44', 'No'], ['Ethane', 'sp³', '50', 'No'], ['But-2-yne', 'No ≡C–H', '—', 'No']], 'Table of acidity of ethyne, ethene and ethane and which react with sodium or sodium amide'),
      n: 'Why is ethyne a weak acid while ethane is not? The answer is the hybridisation of the carbon holding the hydrogen. An sp carbon has half s character, so it pulls electrons more strongly, stabilises the negative charge left after a proton is lost, and releases hydrogen more easily. Sodium releases hydrogen gas, and sodium amide removes the proton to give ammonia. A hydrocarbon like but two yne has no such hydrogen, so it does not react.',
    }),
    sl('check', 'Quick check: terminal alkynes', {
      b: 'Decide which alkyne reacts with sodium.',
      n: 'Quick check. Look for a hydrogen attached directly to a triple-bonded carbon.',
      chk: 'terminal-mcq',
    }),
    sl('concept', 'Preparation of alkynes', {
      b: 'Ethyne is made in the laboratory from **calcium carbide** and water. Alkynes in general are made by **double dehydrohalogenation of a vicinal (or geminal) dihalide** with a strong base.',
      m: [r`\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}`, r`\ce{BrCH2CH2Br + 2KOH ->[alcohol, heat] CH#CH + 2KBr + 2H2O}`],
      v: flow('LR', [['a', 'Vicinal dibromide'], ['b', 'Vinyl bromide'], ['c', 'Alkyne']], [['a', 'b', 'first KOH (alcoholic): lose HBr'], ['b', 'c', 'second KOH or NaNH₂: lose HBr']], 'Flow of double dehydrohalogenation of a vicinal dibromide through a vinyl bromide to an alkyne'),
      n: 'Calcium carbide reacts with water at once, giving ethyne gas and calcium hydroxide, the old carbide lamp reaction. For other alkynes we start from a dihalide with halogens on neighbouring carbons. Alcoholic potassium hydroxide removes one molecule of hydrogen bromide to give a vinyl bromide, and a second removal, often with sodium amide, gives the triple bond.',
    }),
    sl('concept', 'Addition reactions of alkynes', {
      b: 'Alkynes add two molecules of H₂, X₂ or HX. **H₂:** Ni gives the alkane; Lindlar gives the **cis** alkene; Na/liquid NH₃ gives the **trans** alkene. **HX** adds by Markovnikov’s rule, twice. **Water** (HgSO₄, dilute H₂SO₄) gives a carbonyl compound by tautomerism.',
      m: [r`\ce{CH#CH + 2Br2 -> CHBr2CHBr2}`, r`\ce{CH3C#CH + 2HBr -> CH3CBr2CH3}`, r`\ce{CH#CH + H2O ->[HgSO4, dil. H2SO4] CH3CHO}`],
      v: table(['Reagent', 'Ethyne gives', 'Propyne gives'], [['H₂, Ni', 'Ethane', 'Propane'], ['Br₂ (excess)', '1,1,2,2-Tetrabromoethane', '1,1,2,2-Tetrabromopropane'], ['HBr (excess)', '1,1-Dibromoethane', '2,2-Dibromopropane'], ['H₂O, Hg²⁺, H⁺', 'Ethanal', 'Propanone']], 'Table of products of addition reactions of ethyne and propyne'),
      n: 'Alkynes add reagents twice, because they have two pi bonds. Bromine in excess gives a tetrabromo compound. Hydrogen bromide adds twice by Markovnikov’s rule, putting both bromines on the same carbon. In the presence of mercury salts and dilute acid, water adds to ethyne to give an unstable enol that shifts at once to ethanal; propyne similarly gives propanone.',
    }),
    sl('example', 'Worked example: predict the products', {
      b: r`**Problem.** Write the product of (a) but-2-yne with H₂/Lindlar, (b) but-2-yne with Na/liquid NH₃, (c) propyne with excess HBr, (d) ethyne with Na.

**(a)** cis-But-2-ene. **(b)** trans-But-2-ene.

**(c)** Markovnikov twice: $\ce{CH3CBr2CH3}$, 2,2-dibromopropane.

**(d)** $\ce{CH#CNa}$ (sodium ethynide) and hydrogen gas.`,
      v: flow('LR', [['a', 'Is there an ≡C–H?'], ['b', 'Reagent: Na, NaNH₂ (acid-base)'], ['c', 'Reagent: H₂/Lindlar or Na/NH₃ (reduction)'], ['d', 'Reagent: HX (Markovnikov)']], [['a', 'b', 'yes'], ['a', 'c'], ['a', 'd']], 'Flow for predicting the reaction of an alkyne from the reagent: acid-base, partial reduction or HX addition'),
      n: 'First look at the reagent. Sodium or sodium amide acts as a base, and only a terminal alkyne has a hydrogen to give up. Hydrogen with Lindlar catalyst stops at the cis alkene, while sodium in liquid ammonia gives the trans alkene. Hydrogen halides add twice, always following Markovnikov, so propyne ends as two two dibromopropane with both bromines on the middle carbon.',
    }),
    sl('concept', 'Cyclic polymerisation and combustion', {
      b: 'Ethyne passed through a **red-hot iron tube (873 K)** trimerises to **benzene**. Ethyne burns with a sooty, very hot flame (oxy-acetylene torch).',
      m: [r`\ce{3C2H2 ->[red-hot Fe tube, 873 K] C6H6}`, r`\ce{2C2H2 + 5O2 -> 4CO2 + 2H2O}`],
      v: table(['Reaction', 'Reagent and condition', 'Product'], [['Cyclic polymerisation', 'Red-hot iron tube, 873 K', 'Benzene'], ['Combustion', 'Oxygen', 'CO₂ + H₂O, flame about 3000 K with pure oxygen']], 'Table of the cyclic polymerisation and combustion of ethyne'),
      n: 'Here is a surprising reaction. Pass ethyne through a red hot iron tube and three molecules join in a ring to give benzene. This is called cyclic polymerisation. Ethyne also burns in oxygen with an extremely hot flame, which is why the oxyacetylene torch can cut and weld metal. In air it burns with a smoky flame because the carbon content is high.',
    }),
    sl('diagram', 'Benzene: Kekulé structures and resonance', {
      b: 'Benzene, C₆H₆, is a **planar regular hexagon**; all six C–C bonds are **139 pm**, between a single (154 pm) and a double bond (134 pm). No single Kekulé structure explains this, so benzene is a **resonance hybrid** of two structures.',
      v: V.kekule,
      n: 'Benzene puzzled chemists for decades. It has six carbons and six hydrogens, yet it does not decolourise bromine water or permanganate as alkenes do. Experiments show all carbon carbon bonds are the same length, one hundred and thirty nine picometres. Neither Kekulé structure alone can account for that. The real molecule is a resonance hybrid, a blend of both, shown by a hexagon with a circle.',
    }),
    sl('diagram', 'The π cloud of benzene', {
      b: 'Each carbon is sp²: three σ bonds in the ring plane. The sixth electron of each carbon sits in a **p orbital perpendicular to the plane**; the six p orbitals overlap all round the ring to give a **delocalised π cloud** above and below.',
      v: V.pi,
      n: 'Each carbon of benzene uses sp two orbitals to bond to two neighbours and one hydrogen, so the ring is flat with angles of one hundred and twenty degrees. The leftover p orbitals stand upright and overlap sideways with both neighbours, forming a continuous doughnut of electron density above and below the plane. Six electrons are shared by all six carbons, and this delocalisation lowers the energy of benzene.',
    }),
    sl('concept', 'Resonance energy: how stable is benzene?', {
      b: r`Hydrogenation of cyclohexene releases about $120\ \text{kJ mol}^{-1}$. Three isolated double bonds would release $3 \times 120 = 360$, but benzene releases only about $208\ \text{kJ mol}^{-1}$. The difference, about **150 kJ mol⁻¹**, is the **resonance (delocalisation) energy**.`,
      v: table(['Compound', 'Heat of hydrogenation / kJ mol⁻¹'], [['Cyclohexene (one C=C)', '−120'], ['Three C=C, expected', '−360'], ['Benzene, observed', '−208'], ['Stabilisation of benzene (about)', '150']], 'Table of heats of hydrogenation of cyclohexene, the expected value for three double bonds, and benzene, giving the resonance energy'),
      n: 'We can measure the stability of benzene. Adding hydrogen to one double bond in cyclohexene gives out about one hundred and twenty kilojoules per mole. Three double bonds should give out three hundred and sixty, but benzene gives out only about two hundred and eight. Benzene is therefore about one hundred and fifty kilojoules per mole more stable than expected. This is why benzene prefers substitution, which keeps the ring, to addition.',
    }),
    sl('concept', 'Aromaticity and the Hückel rule', {
      b: 'A compound is **aromatic** if its ring is **planar, cyclic, fully conjugated** and has **(4n + 2) π electrons** (n = 0, 1, 2 …): 2, 6, 10, 14 …',
      v: table(['Compound', 'π electrons', 'Planar and conjugated?', '4n + 2 satisfied?', 'Verdict'], HK, 'Table applying the Hückel rule to benzene, naphthalene, anthracene, cyclobutadiene and cyclooctatetraene'),
      n: 'The Hückel rule tells us when a ring is aromatic. The molecule must be flat, cyclic, and conjugated all the way round, and the number of pi electrons must equal four n plus two, where n is zero or a whole number. Benzene has six, naphthalene ten, anthracene fourteen, all of the form. Cyclobutadiene has four, and cyclooctatetraene has eight and is tub shaped, so neither is aromatic.',
    }),
    sl('check', 'Quick check: Hückel rule', {
      b: 'Apply the 4n + 2 rule.',
      n: 'Quick check. Count the pi electrons and test whether the number fits four n plus two.',
      chk: 'huckel-mcq',
    }),
    sl('concept', 'Preparation of benzene', {
      b: 'Benzene is obtained industrially from coal tar and petroleum (aromatisation). In the laboratory: **cyclic polymerisation of ethyne**, **decarboxylation of sodium benzoate** with soda lime, and **reduction of phenol** with zinc dust.',
      m: [r`\ce{C6H5COONa + NaOH ->[CaO, heat] C6H6 + Na2CO3}`, r`\ce{C6H5OH + Zn -> C6H6 + ZnO}`],
      v: table(['Method', 'Starting material', 'Condition'], [['Cyclic polymerisation', 'Ethyne', 'Red-hot iron tube, 873 K'], ['Decarboxylation', 'Sodium benzoate', 'Soda lime, heat'], ['Reduction', 'Phenol', 'Zinc dust, heat'], ['Aromatisation', 'Hexane', 'Cr₂O₃/V₂O₅, 773 K']], 'Table of four methods of preparing benzene'),
      n: 'Benzene is made on a large scale from coal tar and from petroleum. In the laboratory, ethyne trimerises in a hot iron tube. Heating sodium benzoate with soda lime removes the carboxyl group as carbonate and leaves benzene. Phenol heated with zinc dust loses its oxygen to the zinc, again leaving benzene. Hexane can also be converted to benzene with metal oxide catalysts.',
    }),
    sl('concept', 'Electrophiles for substitution', {
      b: 'Because of its π cloud, benzene reacts with **electrophiles** (E⁺) and keeps its ring: **electrophilic substitution**. The electrophile is generated in each reaction.',
      m: [r`\ce{HNO3 + 2H2SO4 -> NO2^+ + H3O^+ + 2HSO4^-}`, r`\ce{Cl2 + FeCl3 -> Cl^+ + FeCl4^-}`, r`\ce{CH3Cl + AlCl3 -> CH3^+ + AlCl4^-}`, r`\ce{CH3COCl + AlCl3 -> CH3CO^+ + AlCl4^-}`],
      v: table(['Reaction', 'Reagents', 'Electrophile', 'Product from benzene'], [['Nitration', 'Conc. HNO₃ + conc. H₂SO₄, 333 K', 'NO₂⁺', 'Nitrobenzene'], ['Halogenation', 'Cl₂ or Br₂ + anhydrous FeCl₃ or FeBr₃', 'Cl⁺ (polarised Cl–Cl)', 'Chlorobenzene'], ['Sulfonation', 'Fuming H₂SO₄', 'SO₃', 'Benzenesulfonic acid'], ['Friedel–Crafts alkylation', 'CH₃Cl + anhydrous AlCl₃', 'CH₃⁺ (or its complex)', 'Methylbenzene'], ['Friedel–Crafts acylation', 'CH₃COCl + anhydrous AlCl₃', 'CH₃CO⁺', 'Phenylethanone']], 'Table of five electrophilic substitution reactions of benzene with reagents, electrophile and product'),
      n: 'The pi cloud of benzene attracts electron poor species called electrophiles. In each reaction the electrophile must first be made. A mixture of nitric and sulfuric acids makes the nitronium ion. Chlorine with iron chloride gives a strongly polarised chlorine. Sulfur trioxide in fuming sulfuric acid does the sulfonation. And an alkyl or acyl chloride with aluminium chloride gives a carbocation or an acylium ion for the Friedel Crafts reactions.',
    }),
    sl('diagram', 'Mechanism of electrophilic substitution', {
      b: 'Step 1 (slow): the π electrons attack E⁺ to form the **arenium ion** (σ complex), a resonance-stabilised carbocation. Step 2 (fast): loss of H⁺ **restores the aromatic ring**.',
      v: V.eas,
      n: 'All the substitution reactions follow one pattern. In the slow first step, two electrons from the pi cloud form a bond to the electrophile. This gives the arenium ion, in which one carbon holds both the hydrogen and the new group, and the positive charge is shared by the other five. In the fast second step a proton leaves, the electrons return to the ring, and aromaticity is restored.',
    }),
    sl('example', 'Worked example: two substitutions', {
      b: r`**Problem.** Write the equation and electrophile for (a) nitration of benzene, (b) Friedel–Crafts acylation of benzene with ethanoyl chloride.

**(a)** $\ce{C6H6 + HNO3 ->[conc. H2SO4, 333 K] C6H5NO2 + H2O}$; electrophile $\ce{NO2+}$.

**(b)** $\ce{C6H6 + CH3COCl ->[anhyd. AlCl3] C6H5COCH3 + HCl}$; electrophile $\ce{CH3CO+}$. The product is phenylethanone (acetophenone).`,
      v: flow('LR', [['a', 'Make E⁺ from reagent + catalyst'], ['b', 'π cloud attacks E⁺'], ['c', 'Arenium ion'], ['d', 'Lose H⁺: product']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of electrophilic substitution: generate the electrophile, attack by the pi cloud, arenium ion, loss of proton'),
      n: 'In every case, name the electrophile first. For nitration, concentrated nitric acid and sulfuric acid at about fifty degrees give nitrobenzene and water. For acylation, ethanoyl chloride with anhydrous aluminium chloride supplies the acylium ion, and benzene is converted into phenylethanone, with hydrogen chloride as the by product. The aluminium chloride must be anhydrous, because water destroys it.',
    }),
    sl('concept', 'Directive influence of substituents', {
      b: 'A group already on the ring decides **where** the next group goes and **how fast**. **Activating, o/p-directing:** –OH, –NH₂, –OCH₃, –CH₃ (electron-donating). **Deactivating, o/p-directing:** halogens. **Deactivating, m-directing:** –NO₂, –CN, –CHO, –COOH, –SO₃H (electron-withdrawing).',
      v: table(['Group', 'Effect on rate', 'Position of new group', 'Reason'], [['–OH, –NH₂, –OCH₃', 'Strongly activating', 'ortho and para', 'Lone pair donated into the ring (+M)'], ['–CH₃, –alkyl', 'Weakly activating', 'ortho and para', '+I effect and hyperconjugation'], ['–Cl, –Br', 'Deactivating', 'ortho and para', '–I outweighs +M, but +M controls position'], ['–NO₂, –CN, –CHO, –COOH', 'Strongly deactivating', 'meta', '–M and –I withdraw electrons, most from o and p']], 'Table of directing effects of substituents on benzene with the effect on rate, orientation and reason'),
      n: 'A substituent controls both the speed of further substitution and the position. Groups that push electrons into the ring, such as hydroxyl, amino and methyl, make it more reactive and direct the newcomer to the ortho and para positions. Groups that pull electrons out, such as nitro, cyano, aldehyde and carboxyl, make the ring less reactive and send the newcomer to the meta position. Halogens are the odd ones: deactivating but ortho and para directing.',
    }),
    sl('check', 'Quick check: directing groups', {
      b: 'Predict the position of substitution.',
      n: 'Quick check. Decide whether the group donates or withdraws electrons.',
      chk: 'meta-mcq',
    }),
    sl('example', 'Worked example: reading isomer data', {
      b: r`**Problem.** Nitration of methylbenzene gives 58% ortho, 4% meta and 38% para products (approximate). Calculate the yield per position and explain.

**Per position:** ortho $= 58 \div 2 = 29$, meta $= 4 \div 2 = 2$, para $= 38 \div 1 = 38$.

**Explanation.** The CH₃ group donates electrons (+I, hyperconjugation), stabilising the arenium ions from ortho and para attack, where the positive charge falls on the carbon bearing CH₃. Para is favoured over ortho for steric reasons.`,
      v: table(['Position', 'Number of positions', 'Total yield / %', 'Yield per position / %'], [['ortho', '2', '58', '29'], ['meta', '2', '4', '2'], ['para', '1', '38', '38']], 'Table of the nitration yield of methylbenzene per ortho, meta and para position'),
      n: 'Data on isomer ratios need care, because there are two ortho positions, two meta positions and only one para position. Dividing the totals by the number of positions shows that each para position is the most reactive, each ortho position next, and each meta position is almost unreactive. The methyl group donates electrons and stabilises the arenium ion when the charge falls next to it, which happens only for ortho and para attack.',
    }),
    sl('concept', 'Carcinogenicity and toxicity', {
      b: '**Benzene** is toxic: long exposure damages bone marrow and can cause leukaemia. **Polynuclear (fused-ring) hydrocarbons** with more than two benzene rings, such as **benzpyrene** (C₂₀H₁₂), are carcinogenic. They form by incomplete combustion of coal, petroleum and tobacco and damage DNA.',
      v: table(['Compound', 'Formula', 'Source', 'Hazard'], [['Benzene', 'C₆H₆', 'Industrial solvent, petrol vapour', 'Toxic to bone marrow; carcinogenic'], ['Naphthalene', 'C₁₀H₈', 'Moth balls', 'Harmful if swallowed or inhaled'], ['Benzpyrene', 'C₂₀H₁₂', 'Tobacco smoke, charred food, coal and vehicle exhaust', 'Carcinogenic: damages DNA']], 'Table of benzene, naphthalene and benzpyrene with source and hazard'),
      n: 'Aromatic compounds are not harmless. Benzene vapour, breathed over years, damages the bone marrow and can cause leukaemia, so it is no longer used as an ordinary solvent. Compounds with several fused benzene rings, such as benzpyrene, form when coal, petrol, wood or tobacco burn incompletely. In the body they are converted into reactive products that damage DNA and may cause cancer. Good ventilation and clean combustion lower the risk.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Alkynes: sp, linear; terminal ≡C–H is acidic (sp, 50% s); CaC₂ gives ethyne; two additions; ethyne gives benzene on cyclic polymerisation.',
        'Benzene: planar, C–C 139 pm, resonance hybrid, resonance energy about 150 kJ mol⁻¹.',
        'Aromatic: planar, cyclic, conjugated, (4n + 2) π electrons.',
        'Electrophilic substitution: nitration, halogenation, sulfonation, Friedel–Crafts alkylation and acylation, via the arenium ion.',
        'Activating groups: o/p; deactivating groups: m (halogens: o/p).',
        'Polynuclear hydrocarbons such as benzpyrene are carcinogenic.',
      ],
      v: table(['Reaction', 'Reagent', 'Product from benzene'], [['Nitration', 'HNO₃/H₂SO₄', 'Nitrobenzene'], ['Bromination', 'Br₂/FeBr₃', 'Bromobenzene'], ['Sulfonation', 'Fuming H₂SO₄', 'Benzenesulfonic acid'], ['Alkylation', 'RCl/AlCl₃', 'Alkylbenzene'], ['Acylation', 'RCOCl/AlCl₃', 'Aryl ketone']], 'Summary table of electrophilic substitution reactions of benzene'),
      n: 'To sum up Part two. Alkynes have an acidic terminal hydrogen, add reagents twice, and ethyne trimerises to benzene. Benzene is a flat resonance hybrid with a delocalised six electron cloud, and it obeys the Hückel rule. It undergoes electrophilic substitution through the arenium ion. Substituents direct the next group to ortho and para or to meta. And fused ring hydrocarbons like benzpyrene are carcinogenic.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Only terminal alkynes react with Na, NaNH₂ and ammoniacal silver nitrate.',
        'Write the electrophile and its generation in every substitution answer.',
        'In a Hückel question, check planarity and conjugation before counting electrons.',
        'Halogens: deactivating but ortho and para directing; nitro: meta.',
        'Friedel–Crafts fails on strongly deactivated rings such as nitrobenzene; use anhydrous AlCl₃.',
      ],
      v: table(['Slip', 'Fix'], [['Cyclooctatetraene is aromatic (8 electrons)', 'Not 4n + 2, and not planar'], ['Alkynes add only once', 'Two additions with excess reagent'], ['Methyl is meta-directing', 'Methyl is ortho and para directing']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some last tips. Write the electrophile and how it forms every time you answer a substitution question. For Hückel, check that the ring is flat and fully conjugated before counting electrons. Remember the odd case of halogens, which are deactivating yet ortho and para directing. And remember that nitrobenzene is too deactivated for a Friedel Crafts reaction, so aluminium chloride cannot help it.',
    }),
  ],
});

// ch21 Alkanes — two decks. Part 1 (t01–t03): classification, nomenclature, isomerism, occurrence, conformations of ethane,
// preparation. Part 2 (t04–t05): physical properties and chemical properties (combustion, halogenation, oxidation, cyclisation,
// aromatisation, isomerisation, pyrolysis, uses).
import { sl, deck, table, flow, chem, svgV } from './lib.mjs';
import { PENTANES, CONFORM, ENERGY, BPLOT, CHLOR, AROM, KOLBE, BPDATA } from './svgs.mjs';

export const V = {
  pentanes: svgV(PENTANES, 'The three chain isomers of pentane drawn as skeletal structures with their boiling points: pentane 309 K, 2-methylbutane 301 K, 2,2-dimethylpropane 283 K'),
  conform: svgV(CONFORM, 'Sawhorse and Newman projections of the staggered and eclipsed conformations of ethane'),
  energy: svgV(ENERGY, 'Graph of torsional energy of ethane against dihedral angle: minima at 60, 180 and 300 degrees and maxima of 12.5 kilojoules per mole at 0, 120, 240 and 360 degrees'),
  bplot: svgV(BPLOT, 'Graph of boiling point against number of carbon atoms for the first ten unbranched alkanes, rising steadily'),
  chlor: svgV(CHLOR, 'Initiation, propagation and termination steps in the free-radical chlorination of methane'),
  arom: svgV(AROM, 'Hexane converted to benzene and heptane to methylbenzene with loss of four molecules of hydrogen over a chromium(III) oxide and aluminium oxide catalyst'),
  kolbe: svgV(KOLBE, "Electrolysis cell for Kolbe's reaction with aqueous sodium ethanoate: ethane and carbon dioxide at the anode, hydrogen at the cathode"),
};

const NAMES = ['methane', 'ethane', 'propane', 'butane', 'pentane', 'hexane', 'heptane', 'octane', 'nonane', 'decane'];
const FORM = ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀', 'C₅H₁₂', 'C₆H₁₄', 'C₇H₁₆', 'C₈H₁₈', 'C₉H₂₀', 'C₁₀H₂₂'];
const STATE = ['gas', 'gas', 'gas', 'gas', 'liquid', 'liquid', 'liquid', 'liquid', 'liquid', 'liquid'];
const TEN = NAMES.map((n, i) => [`${i + 1}`, n, FORM[i], BPDATA[i].toFixed(1).replace('-', '−'), STATE[i]]);

// worked example, combustion of butane (computed once)
const M_BUT = 58; // C4H10: 4 × 12 + 10
const mBut = 11.6;
const nBut = mBut / M_BUT; // 0.200 mol
const nO2 = (13 / 2) * nBut; // 1.30 mol
const vO2 = nO2 * 22.4; // 29.12 L at STP
const nCO2 = 4 * nBut; // 0.800 mol
const mCO2 = nCO2 * 44; // 35.2 g
const mH2O = 5 * nBut * 18; // 18.0 g
// worked example, chlorination of propane (computed once)
const relR = 1.0;
const relS = 3.8;
const wP = 6 * relR;
const wS = 2 * relS;
const pP = (100 * wP) / (wP + wS);
const pS = (100 * wS) / (wP + wS);

export const deck1 = deck({
  part: 1,
  title: 'Alkanes — Part 1: Classification, isomerism, conformations and preparation',
  goals: [
    'Classify hydrocarbons and name alkanes by IUPAC rules, including the isomers of pentane',
    'Draw staggered and eclipsed ethane in Sawhorse and Newman projections and explain their stability',
    'Write equations for preparing alkanes by decarboxylation, Kolbe electrolysis, Wurtz reaction, Corey–House synthesis and from aldehydes and Grignard reagents',
  ],
  slides: [
    sl('title', 'Hydrocarbons and the place of alkanes', {
      b: '**Hydrocarbons** contain only carbon and hydrogen. They are **open-chain (aliphatic)** or **closed-chain (cyclic)**; the open-chain ones are **saturated** (alkanes, only C–C single bonds) or **unsaturated** (alkenes and alkynes). Cyclic ones are **alicyclic** (cycloalkanes) or **aromatic** (benzene and its derivatives).',
      v: flow('TB', [['h', 'Hydrocarbons'], ['o', 'Open chain (aliphatic)'], ['c', 'Closed chain (cyclic)'], ['s', 'Saturated: alkanes'], ['u', 'Unsaturated: alkenes, alkynes'], ['a', 'Alicyclic: cycloalkanes'], ['r', 'Aromatic: benzene and derivatives']], [['h', 'o'], ['h', 'c'], ['o', 's'], ['o', 'u'], ['c', 'a'], ['c', 'r']], 'Flow chart classifying hydrocarbons into open chain saturated and unsaturated, and closed chain alicyclic and aromatic'),
      n: 'Welcome to the study of alkanes. Hydrocarbons are compounds of carbon and hydrogen only. They are classified by their carbon skeleton. Open chain compounds are either saturated, the alkanes, or unsaturated, the alkenes and alkynes. Closed chain compounds are alicyclic, such as cyclohexane, or aromatic, such as benzene. In this part we look at alkanes, their structures, shapes and preparation.',
    }),
    sl('concept', 'Homologous series and the general formula', {
      b: 'Alkanes form a **homologous series** with general formula **CₙH₂ₙ₊₂**: each member differs from the next by **–CH₂–** (14 mass units) and they show a gradual change in properties. Every carbon is **sp³** hybridised, with tetrahedral bond angles of about 109.5° and C–C bonds of 154 pm.',
      v: table(['n', 'Name', 'Formula', 'Boiling point (°C)', 'State at 298 K'], TEN, 'Table of the first ten unbranched alkanes with name, molecular formula, boiling point in degrees Celsius and physical state at 298 kelvin'),
      n: 'The alkanes form a homologous series. Each member differs from the next by one carbon and two hydrogens, a methylene group, and the general formula is C n H two n plus two. Every carbon atom is sp three hybridised, so the bonds point to the corners of a tetrahedron at about one hundred and nine and a half degrees. The first four members are gases and the next are liquids.',
    }),
    sl('concept', 'Naming alkanes by IUPAC rules', {
      b: '(1) Choose the **longest continuous carbon chain** as the parent. (2) Number it from the end that gives the **lowest locant** to the first branch (or the lowest set of locants). (3) Name branches as alkyl groups; list them in **alphabetical order**. (4) Use di-, tri- for repeated groups (ignored in alphabetising). (5) Write: locants–substituents then parent.',
      v: flow('LR', [['a', 'Longest chain'], ['b', 'Lowest locants'], ['c', 'Alphabetical order'], ['d', 'Locants + name']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the steps in naming an alkane: longest chain, lowest locants, alphabetical order, then writing the name'),
      n: 'To name an alkane, follow four steps. First find the longest continuous chain; that gives the parent name. Next number the chain from the end that gives the lowest numbers to the branches. Then name each branch as an alkyl group and arrange them in alphabetical order. Finally write the locants, the substituent names and the parent name together, using di or tri when a group repeats.',
    }),
    sl('diagram', 'Chain isomerism: the isomers of pentane', {
      b: 'Alkanes show **chain isomerism**. Butane has 2 isomers, **pentane has 3**, hexane 5, heptane 9 and octane 18. The three isomers of C₅H₁₂ are **pentane**, **2-methylbutane** (isopentane) and **2,2-dimethylpropane** (neopentane); they differ in physical properties such as boiling point.',
      v: V.pentanes,
      n: 'Alkanes with four or more carbon atoms show chain isomerism. Pentane has three isomers. Pentane itself has a straight chain. Two methylbutane has one methyl branch on the second carbon. Two two dimethylpropane has two methyl groups on the same carbon and is the most compact. They have the same molecular formula but different boiling points.',
    }),
    sl('example', 'Worked example: naming a branched alkane', {
      b: '**Problem.** Name $\\ce{(CH3)3C-CH2-CH(CH3)2}$.\n\n**Solution.** The longest chain has **5 carbons** (pentane). Numbering from the left puts branches at 2, 2, 4; from the right at 2, 4, 4. The first set is lower. Three methyl groups: **2,2,4-trimethylpentane** (isooctane, C₈H₁₈, the reference fuel for octane number).',
      v: table(['Step', 'Result'], [['Longest chain', '5 carbons: pentane'], ['Branches', 'Three CH₃ (methyl) groups'], ['Locants, lowest set', '2, 2, 4 (not 2, 4, 4)'], ['Name', '2,2,4-Trimethylpentane']], 'Table with the steps in naming 2,2,4-trimethylpentane: parent chain, branches, locants and name'),
      n: 'Let us name this compound. The longest chain has five carbons, so the parent is pentane. There are three methyl branches. Numbering from the left gives the locants two, two, four, while numbering from the right gives two, four, four. The first set is lower, so we choose it. The name is two two four trimethylpentane, also called isooctane, the standard fuel for octane rating.',
    }),
    sl('check', 'Quick check: IUPAC name', {
      b: 'Apply the rules: longest chain, lowest locants, alphabetical order.',
      n: 'Quick check. Find the longest chain first, then number from the end that gives the lowest locants, and list the branches alphabetically.',
      chk: 'nomen-mcq',
    }),
    sl('concept', 'Occurrence of alkanes', {
      b: '**Natural gas** is mainly methane (with some ethane, propane and butane); **biogas** and marsh gas are also mostly methane, formed by anaerobic decay. **Petroleum** is a complex mixture of alkanes (with cycloalkanes and aromatics) that is separated by fractional distillation into fractions of rising boiling range.',
      v: table(['Fraction', 'Approximate carbon range', 'Use'], [['Refinery gas / LPG', 'C₁–C₄', 'Cooking fuel'], ['Petrol (gasoline)', 'C₅–C₁₀', 'Motor fuel'], ['Kerosene', 'C₁₀–C₁₆', 'Jet fuel, stoves'], ['Diesel', 'C₁₅–C₂₀', 'Engines'], ['Lubricating oil, wax, bitumen', '> C₂₀', 'Lubricants, road surfacing']], 'Table of petroleum fractions with carbon range and uses'),
      n: 'Alkanes occur in nature mainly as natural gas and petroleum. Natural gas and biogas are largely methane. Petroleum is a complex mixture separated by fractional distillation. The lightest fraction is refinery gas and bottled gas, then petrol, kerosene and diesel, and finally lubricating oil, wax and bitumen. The heavier the fraction, the more carbon atoms in its molecules.',
    }),
    sl('diagram', 'Conformations: Sawhorse and Newman projections', {
      b: '**Conformations** are the different arrangements of atoms produced by rotation about a **single bond**. In ethane the extremes are **staggered** (C–H bonds 60° apart) and **eclipsed** (0° apart). A **Sawhorse** projection views the C–C bond obliquely; a **Newman** projection looks along it, the front carbon at the centre and the rear carbon as the circle. **Methane** has no C–C bond, so it has only one arrangement.',
      v: V.conform,
      n: 'Rotation about the carbon carbon single bond of ethane gives different arrangements called conformations. The two extremes are the staggered form and the eclipsed form. In a sawhorse projection we look at the bond from an angle. In a Newman projection we look straight down the bond; the front carbon is the centre of the picture and the rear carbon is the circle. Methane has no carbon carbon bond, so it has no such conformations.',
    }),
    sl('diagram', 'Why the staggered conformation is more stable', {
      b: 'In the **eclipsed** form the C–H bonding pairs on the two carbons are as close as possible, so repulsion (**torsional strain**) is greatest; in the **staggered** form they are farthest apart. The staggered form is lower in energy by about **12.5 kJ mol⁻¹**, the **torsional barrier**. This is small, so at room temperature ethane rotates almost freely and the conformations cannot be separated.',
      v: V.energy,
      n: 'This graph shows the energy of ethane as one methyl group turns through three hundred and sixty degrees. Staggered forms are at the minima. The eclipsed forms are at the maxima, about twelve and a half kilojoules per mole higher, because bonding pairs on neighbouring carbons are closest and repel most. The barrier is small, so molecules rotate freely at room temperature and the conformations cannot be isolated.',
    }),
    sl('check', 'Quick check: Newman projection', {
      b: 'Read the dihedral angle and the stability from the projection.',
      n: 'Quick check. Look down the carbon carbon bond and compare the front and back bonds.',
      chk: 'newman-mcq',
    }),
    sl('concept', 'Preparation of alkanes: the main routes', {
      b: 'Alkanes are made by **decarboxylation** (loses a carbon), **Kolbe electrolysis** (joins two R groups), the **Wurtz reaction** (joins two R groups), **Corey–House synthesis** (joins two different groups), **reduction of aldehydes** and by **hydrolysis of Grignard reagents**.',
      v: table(['Method', 'Starting material', 'Reagent', 'Carbon count'], [['Decarboxylation', 'RCOONa', 'NaOH + CaO (soda lime), heat', 'R–H, one carbon less than the acid'], ['Kolbe electrolysis', 'RCOONa (aq)', 'Electrolysis', 'R–R, twice R'], ['Wurtz reaction', 'RX', 'Na, dry ether', 'R–R, twice R'], ['Corey–House', 'R′X + R₂CuLi', 'Dry ether', 'R–R′, any combination'], ['Aldehyde reduction', 'RCHO', 'Zn–Hg / conc. HCl', 'R–CH₃, same carbons'], ['Grignard hydrolysis', 'RMgX', 'H₂O', 'R–H, same carbons']], 'Table of six preparations of alkanes with starting material, reagent and carbon count'),
      n: 'Here are the main ways of making alkanes. Decarboxylation of a sodium carboxylate with soda lime loses one carbon. Kolbe electrolysis and the Wurtz reaction join two alkyl groups, doubling the carbon count. Corey House synthesis joins two different groups. An aldehyde can be reduced to an alkane with zinc amalgam and hydrochloric acid, and a Grignard reagent gives an alkane with water.',
    }),
    sl('diagram', "Kolbe's electrolysis", {
      b: 'Electrolysis of **aqueous sodium or potassium carboxylate** gives an alkane at the **anode**: $2\\text{RCOO}^- \\rightarrow \\text{R–R} + 2\\text{CO}_2 + 2e^-$; hydrogen and alkali form at the cathode. Sodium ethanoate gives **ethane**; sodium propanoate gives **butane**. The method gives an alkane with an **even** number of carbon atoms (R–R) from a single salt.',
      v: V.kolbe,
      n: 'In Kolbe electrolysis an aqueous solution of a sodium carboxylate is electrolysed between platinum electrodes. At the anode two carboxylate ions lose electrons and form an alkane with carbon dioxide. At the cathode water is reduced to hydrogen and hydroxide ions. Sodium ethanoate gives ethane. Two alkyl groups join, so the alkane has twice the carbons of the alkyl group.',
    }),
    sl('diagram', 'Wurtz reaction and Corey–House synthesis', {
      b: '**Wurtz:** an alkyl halide with sodium in dry ether gives a symmetrical alkane. With two different halides a **mixture of three alkanes** forms, so it is not suitable for odd-carbon or unsymmetrical alkanes. **Corey–House:** lithium dialkylcuprate with an alkyl halide gives a clean, unsymmetrical alkane.',
      v: chem('2CH3CH2Br + 2Na ->[dry ether] CH3CH2CH2CH3 + 2NaBr', 'Wurtz reaction: two bromoethane plus two sodium in dry ether gives butane and two sodium bromide', 'Wurtz: R–X to R–R'),
      n: 'In the Wurtz reaction, an alkyl halide is treated with sodium metal in dry ether and two alkyl groups join. Bromoethane gives butane. With two different halides the products are a mixture of three alkanes that are hard to separate, so the method suits symmetrical alkanes only. The Corey House synthesis uses a lithium dialkylcuprate with an alkyl halide to join two different groups cleanly.',
    }),
    sl('example', 'Worked example: choosing the Wurtz halide', {
      b: '**Problem.** Which alkyl halide gives **2,5-dimethylhexane** by the Wurtz reaction?\n\n**Solution.** The Wurtz reaction joins two identical R groups, so cut the chain in the middle (C-3–C-4): each half is **(CH₃)₂CH–CH₂–**, 2-methylpropyl. The halide is **1-bromo-2-methylpropane**: $\\ce{2(CH3)2CHCH2Br + 2Na -> (CH3)2CHCH2CH2CH(CH3)2 + 2NaBr}$.',
      v: chem('2(CH3)2CHCH2Br + 2Na -> (CH3)2CHCH2CH2CH(CH3)2 + 2NaBr', 'Two 1-bromo-2-methylpropane plus two sodium gives 2,5-dimethylhexane and two sodium bromide'),
      n: 'To make two five dimethylhexane by the Wurtz reaction, split the chain at its centre. Each half is a two methylpropyl group, so the halide is one bromo two methylpropane. Two molecules of this halide react with two atoms of sodium to give the eight carbon alkane and two formula units of sodium bromide. The carbon count is twice that of the alkyl group.',
    }),
    sl('concept', 'From aldehydes and Grignard reagents; decarboxylation', {
      b: '**Decarboxylation:** heating sodium ethanoate with soda lime gives methane (one carbon fewer than the acid). **Aldehydes** are reduced to alkanes with zinc amalgam and conc. HCl (Clemmensen): same carbon number. **Grignard reagents** react with water (or any compound with an acidic hydrogen): $\\ce{CH3MgBr + H2O -> CH4 + Mg(OH)Br}$.',
      v: chem('CH3CH2MgBr + H2O -> CH3CH3 + Mg(OH)Br', 'Ethylmagnesium bromide plus water gives ethane and magnesium hydroxide bromide', 'Grignard reagent + water gives an alkane'),
      n: 'Three more preparations. Heating sodium ethanoate with soda lime removes carbon dioxide as sodium carbonate and gives methane, one carbon fewer than the acid. An aldehyde is reduced to the alkane with the same number of carbons by zinc amalgam and concentrated hydrochloric acid. A Grignard reagent is converted to an alkane by water; ethylmagnesium bromide gives ethane.',
    }),
    sl('check', 'Quick check: decarboxylation', {
      b: 'Count carbon atoms: the alkane from decarboxylation has one carbon fewer than the acid.',
      n: 'Quick check. Decide what is removed from the carboxylate salt and which alkane is left.',
      chk: 'decarb-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Alkanes: saturated open-chain hydrocarbons, CₙH₂ₙ₊₂, sp³ carbon; pentane has 3 chain isomers.',
        'Name by longest chain, lowest locants, alphabetical order.',
        'Ethane: staggered (most stable) and eclipsed (about 12.5 kJ mol⁻¹ higher); shown in Sawhorse and Newman projections.',
        'Decarboxylation gives R–H; Kolbe and Wurtz give R–R; Corey–House gives R–R′.',
        'Aldehydes (Zn–Hg/HCl) and Grignard reagents (with water) also give alkanes.',
      ],
      v: table(['Method', 'Product from RCOONa or RX'], [['Soda lime', 'R–H (one carbon less)'], ['Kolbe', 'R–R'], ['Wurtz', 'R–R'], ['Corey–House', 'R–R′'], ['Grignard + H₂O', 'R–H']], 'Summary table of products from the preparations of alkanes'),
      n: 'To sum up Part one. Alkanes are saturated hydrocarbons with the formula C n H two n plus two. They are named by the longest chain and lowest locants. Ethane has staggered and eclipsed conformations; the staggered one is more stable by about twelve and a half kilojoules per mole. Alkanes are made by decarboxylation, Kolbe electrolysis, the Wurtz reaction, Corey House synthesis, reduction of aldehydes and hydrolysis of Grignard reagents.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In IUPAC names, choose the longest chain first, then the lowest locants; branches go in alphabetical order.',
        'Draw Newman projections with the front bonds meeting at the centre and the rear bonds from the circle.',
        'Say clearly: staggered is more stable because of less torsional strain.',
        'For Wurtz questions, state that unsymmetrical or odd-carbon alkanes give a mixture.',
      ],
      v: table(['Slip', 'Fix'], [['Longest chain not taken through the branch', 'Count all routes; choose the longest'], ['Kolbe product has one carbon fewer', 'That is decarboxylation; Kolbe doubles R'], ['Eclipsed called more stable', 'Staggered has lower energy']], 'Table of three common slips about alkane names, preparations and conformations, with corrections'),
      n: 'A few tips for the exam. Always take the longest chain, then number for the lowest locants. When you draw a Newman projection, keep the front bonds meeting at the centre and the rear bonds starting at the circle. Remember that the staggered form is more stable. And for the Wurtz reaction, say that two different halides give a mixture of three alkanes.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alkanes — Part 2: Physical and chemical properties',
  goals: [
    'Explain the trend in boiling points with chain length and branching',
    'Write the free-radical mechanism of chlorination of methane and calculate product ratios',
    'Write equations for combustion, catalytic oxidation, cyclisation, aromatisation, isomerisation and pyrolysis of alkanes',
  ],
  slides: [
    sl('title', 'Physical properties of alkanes', {
      b: 'Alkane molecules are **non-polar**, held together only by weak **London (dispersion) forces**. These forces grow with molecular size and surface contact, which governs boiling point, melting point and density; non-polar solvents dissolve alkanes but water does not.',
      v: table(['Property', 'Trend'], [['State', 'C₁–C₄ gases; C₅–C₁₇ liquids; higher solids'], ['Boiling point', 'Rises with chain length; falls with branching'], ['Density', 'Rises slowly but stays below 1 g mL⁻¹'], ['Solubility', 'Insoluble in water; soluble in non-polar solvents']], 'Table of the physical properties of alkanes and their trends'),
      n: 'Alkanes are non polar molecules. Only weak London dispersion forces act between them, and these forces increase with the size of the molecule. So the first four alkanes are gases, the middle ones are liquids and the higher ones are waxy solids. Alkanes do not dissolve in water but dissolve readily in non polar solvents, and they are less dense than water.',
    }),
    sl('diagram', 'Boiling point and chain length', {
      b: 'Each extra –CH₂– increases the surface area and the dispersion forces, so the boiling point rises: **−161.5 °C** for methane, **36.1 °C** for pentane, **174.1 °C** for decane. The increments shrink (about 73 °C from CH₄ to C₂H₆, about 23 °C from C₉ to C₁₀).',
      v: V.bplot,
      n: 'The boiling point of unbranched alkanes rises steadily with the number of carbon atoms. A longer molecule has a larger surface and stronger dispersion forces, so more energy is needed to separate the molecules. Methane boils at minus one hundred sixty one degrees Celsius and decane at one hundred seventy four. The rise per added carbon becomes smaller as the chain grows longer.',
    }),
    sl('diagram', 'Branching lowers the boiling point', {
      b: 'For isomers of the same molar mass, **branching** makes the molecule more **spherical** and reduces the surface area of contact, so the dispersion forces are weaker and the boiling point is lower: pentane 309 K > 2-methylbutane 301 K > 2,2-dimethylpropane 283 K. (The compact, symmetrical isomer has the higher melting point.)',
      v: V.pentanes,
      n: 'Isomers of the same formula show how shape affects boiling point. The straight chain pentane has the largest surface area and boils at three hundred and nine kelvin. The more branched isomers are more compact, touch their neighbours over a smaller area and have weaker forces, so they boil lower. Two two dimethylpropane boils at only two hundred and eighty three kelvin.',
    }),
    sl('concept', 'Solubility and density', {
      b: 'Water molecules are strongly hydrogen bonded; alkane molecules cannot form hydrogen bonds or dipole interactions with water, so alkanes are **insoluble** in water ("like dissolves like"). They dissolve in benzene, ether and tetrachloromethane. Liquid alkanes **float** on water (density about 0.63 g mL⁻¹ for pentane to 0.73 for decane).',
      v: table(['Alkane', 'Density at 293 K (g mL⁻¹)'], [['Pentane', '0.63'], ['Hexane', '0.66'], ['Octane', '0.70'], ['Decane', '0.73']], 'Table of densities of liquid alkanes, all below that of water'),
      n: 'Alkanes cannot form hydrogen bonds or dipole interactions with water, so they do not dissolve in it. They dissolve in non polar solvents such as benzene and ether, following the rule that like dissolves like. The liquid alkanes are less dense than water, with densities between about point six three and point seven three, so they float on water.',
    }),
    sl('check', 'Quick check: boiling points', {
      b: 'Compare chain length and branching using the data.',
      n: 'Quick check. Compare the molecular size first and then the shape of each molecule.',
      chk: 'bpdata-mcq',
    }),
    sl('concept', 'Combustion', {
      b: 'Alkanes burn in excess air or oxygen to give **carbon dioxide and water** with the release of much heat; this is why they are fuels. In limited air, carbon monoxide and soot form. General equation: CₙH₂ₙ₊₂ + (3n + 1)/2 O₂ → n CO₂ + (n + 1) H₂O.',
      v: chem('2C4H10 + 13O2 -> 8CO2 + 10H2O', 'Complete combustion of butane: two butane plus thirteen oxygen gives eight carbon dioxide and ten water', 'Complete combustion of butane'),
      n: 'All alkanes burn in plenty of air to form carbon dioxide and water, and release a great deal of heat. That is why methane, propane and butane are used as fuels. For an alkane with n carbons, the oxygen needed is three n plus one over two molecules, and the products are n carbon dioxide and n plus one water. In a limited supply of air, carbon monoxide or soot forms.',
    }),
    sl('example', 'Worked example: combustion of butane', {
      b: `**Problem.** Butane (${mBut.toFixed(1)} g, M = ${M_BUT} g mol⁻¹) burns completely: $\\ce{2C4H10 + 13O2 -> 8CO2 + 10H2O}$. Find the volume of O₂ at STP and the masses of CO₂ and H₂O.\n\n**Solution.** n(C₄H₁₀) = ${mBut.toFixed(1)} ÷ ${M_BUT} = ${nBut.toFixed(3)} mol. O₂ = 13/2 × ${nBut.toFixed(3)} = ${nO2.toFixed(2)} mol = ${vO2.toFixed(1)} L. CO₂ = 4 × ${nBut.toFixed(3)} = ${nCO2.toFixed(3)} mol = ${mCO2.toFixed(1)} g. H₂O = 5 × ${nBut.toFixed(3)} = ${(5 * nBut).toFixed(2)} mol = ${mH2O.toFixed(1)} g.`,
      v: table(['Quantity', 'Moles', 'Result'], [['C₄H₁₀', nBut.toFixed(3), `${mBut.toFixed(1)} g`], ['O₂ needed', nO2.toFixed(2), `${vO2.toFixed(1)} L at STP`], ['CO₂ formed', nCO2.toFixed(3), `${mCO2.toFixed(1)} g`], ['H₂O formed', (5 * nBut).toFixed(2), `${mH2O.toFixed(1)} g`]], 'Table of moles and results for the complete combustion of butane'),
      n: 'Work in moles. The molar mass of butane is fifty eight, so eleven point six grams is point two zero zero mole. From the equation, two moles of butane need thirteen moles of oxygen, so point two zero zero mole needs one point three zero moles, about twenty nine litres at standard conditions. It gives point eight moles of carbon dioxide, which is thirty five point two grams, and eighteen grams of water.',
    }),
    sl('concept', 'Halogenation: substitution by a free-radical chain', {
      b: 'In **diffused sunlight, ultraviolet light or at 520–670 K**, chlorine or bromine replaces H atoms of an alkane: CH₄ gives CH₃Cl, CH₂Cl₂, CHCl₃ and CCl₄. **Reactivity of halogens:** F₂ > Cl₂ > Br₂ > I₂ (fluorine is explosive; iodine is reversible and needs an oxidising agent). **Reactivity of C–H:** **tertiary > secondary > primary** (more stable radical).',
      v: table(['Type of hydrogen', 'Radical formed', 'Relative rate of chlorination (given)'], [['Primary (1°)', 'Primary radical', '1.0'], ['Secondary (2°)', 'Secondary radical', '3.8'], ['Tertiary (3°)', 'Tertiary radical', '5.0']], 'Table of relative rates of abstraction of primary, secondary and tertiary hydrogen atoms by a chlorine radical'),
      n: 'In ultraviolet light or at high temperature, alkanes react with chlorine or bromine by replacing hydrogen atoms, one after another. Fluorine is too violent and iodine does not react well. Among the hydrogen atoms in an alkane, tertiary ones are replaced most readily, then secondary, then primary, because the radical formed is more stable. The relative rates for chlorine are about one, three point eight and five.',
    }),
    sl('diagram', 'Mechanism of the chlorination of methane', {
      b: 'A **free-radical chain** with three stages. **Initiation:** light splits Cl–Cl homolytically into 2 Cl•. **Propagation:** Cl• + CH₄ → HCl + •CH₃, then •CH₃ + Cl₂ → CH₃Cl + Cl•; the chain repeats. **Termination:** two radicals combine and the chain ends (Cl• + Cl•, •CH₃ + Cl•, •CH₃ + •CH₃ giving ethane as a by-product).',
      v: V.chlor,
      n: 'The mechanism has three stages. In initiation, ultraviolet light splits a chlorine molecule into two chlorine atoms, each with an unpaired electron. In propagation, a chlorine atom takes a hydrogen from methane to give a methyl radical, which takes a chlorine atom from a chlorine molecule, forming chloromethane and a new chlorine atom. In termination, two radicals combine and the chain stops.',
    }),
    sl('example', 'Worked example: monochlorination of propane', {
      b: `**Problem.** Propane is chlorinated in light. Using relative rates 1° : 2° = ${relR.toFixed(1)} : ${relS.toFixed(1)} (given), find the percentage of 2-chloropropane.\n\n**Solution.** Propane has **6 primary** and **2 secondary** hydrogens. Weights: 6 × ${relR.toFixed(1)} = ${wP.toFixed(1)}; 2 × ${relS.toFixed(1)} = ${wS.toFixed(1)}; total ${(wP + wS).toFixed(1)}. **2-Chloropropane = ${wS.toFixed(1)} ÷ ${(wP + wS).toFixed(1)} × 100 = ${pS.toFixed(1)}%**; 1-chloropropane = ${pP.toFixed(1)}%.`,
      v: table(['Product', 'Hydrogens × rate', 'Share'], [['1-Chloropropane', `6 × ${relR.toFixed(1)} = ${wP.toFixed(1)}`, `${pP.toFixed(1)}%`], ['2-Chloropropane', `2 × ${relS.toFixed(1)} = ${wS.toFixed(1)}`, `${pS.toFixed(1)}%`]], 'Table of the expected percentages of 1-chloropropane and 2-chloropropane from the chlorination of propane'),
      n: 'Count the hydrogens of each kind. Propane has six primary hydrogens and two secondary ones. Multiply each number by its relative rate: six times one gives six, and two times three point eight gives seven point six. The total is thirteen point six. The share of two chloropropane is seven point six over thirteen point six, about fifty five point nine percent, and the rest is one chloropropane.',
    }),
    sl('check', 'Quick check: chain termination', {
      b: 'A termination step uses up two radicals.',
      n: 'Quick check. Which of the steps combines two radicals into a molecule?',
      chk: 'term-mcq',
    }),
    sl('concept', 'Catalytic oxidation', {
      b: 'With **limited oxygen and a catalyst**, alkanes are oxidised to useful compounds instead of burning completely. Methane gives **methanol** (Cu tube, 523 K, 100 atm) or **methanal** (Mo₂O₃); **ethane** is oxidised to **ethanoic acid** (manganese(II) ethanoate as catalyst).',
      v: table(['Reactant', 'Conditions', 'Product'], [['2CH₄ + O₂', 'Cu tube, 523 K, 100 atm', '2CH₃OH (methanol)'], ['CH₄ + O₂', 'Mo₂O₃, heat', 'HCHO + H₂O (methanal)'], ['2CH₃CH₃ + 3O₂', '(CH₃COO)₂Mn, heat, pressure', '2CH₃COOH + 2H₂O (ethanoic acid)']], 'Table of catalytic oxidations of methane and ethane with conditions and products'),
      n: 'If an alkane is heated with a limited supply of oxygen in the presence of a catalyst, it is oxidised partially rather than burnt. Methane with copper at five hundred twenty three kelvin and one hundred atmospheres gives methanol. With molybdenum oxide it gives methanal. Ethane can be oxidised to ethanoic acid using a manganese ethanoate catalyst. These are important industrial routes.',
    }),
    sl('diagram', 'Cyclisation and aromatisation', {
      b: 'Alkanes with **six or more carbons** heated at **773 K, 10–20 atm** over $\\ce{Cr2O3/Al2O3}$ (or V₂O₅, Mo₂O₃) lose hydrogen and form a ring: **cyclisation** gives cyclohexane, then **aromatisation** gives benzene. Hexane → benzene + 4H₂; heptane → methylbenzene + 4H₂.',
      v: V.arom,
      n: 'When hexane or higher alkanes are passed over a mixed oxide catalyst at seven hundred seventy three kelvin and high pressure, they close into rings and lose hydrogen. This ring closure is cyclisation, and the further loss of hydrogen to form a benzene ring is aromatisation. Hexane gives benzene, and heptane gives methylbenzene, with four molecules of hydrogen released in each case.',
    }),
    sl('concept', 'Isomerisation and pyrolysis', {
      b: '**Isomerisation:** n-alkanes are converted to branched isomers by anhydrous AlCl₃ and HCl at about 573 K and 35 atm; butane gives 2-methylpropane. **Pyrolysis (cracking):** at high temperature, large alkanes break into smaller alkanes and alkenes: $\\ce{C12H26 -> C7H16 + C5H10}$, and $\\ce{CH4 -> C + 2H2}$ at very high temperature.',
      v: chem('CH3CH2CH2CH3 ->[AlCl3/HCl] (CH3)2CHCH3', 'Isomerisation of butane to 2-methylpropane with aluminium chloride and hydrogen chloride', 'n-Butane to 2-methylpropane'),
      n: 'Two more reactions. In isomerisation, a straight chain alkane is converted to a branched isomer by anhydrous aluminium chloride and hydrogen chloride; butane gives two methylpropane. In pyrolysis, also called cracking, a large alkane is heated strongly in the absence of air and breaks into smaller alkanes and alkenes. Dodecane can give heptane and pentene. Cracking supplies petrol from heavier fractions.',
    }),
    sl('check', 'Quick check: aromatisation', {
      b: 'Count the hydrogen atoms lost as the ring forms.',
      n: 'Quick check. Compare the molecular formulae of the alkane and the aromatic product.',
      chk: 'aroma-mcq',
    }),
    sl('concept', 'Uses of alkanes', {
      b: 'Alkanes are mainly **fuels** and **raw materials**: methane (natural gas, CNG, hydrogen, carbon black), LPG (propane + butane), petrol, kerosene and diesel, lubricating oils, paraffin wax and bitumen, and feedstock for chloroalkanes, alcohols and ethene.',
      v: table(['Alkane or fraction', 'Use'], [['Methane', 'CNG, domestic gas; makes hydrogen and carbon black'], ['Propane, butane', 'LPG cooking fuel'], ['Petrol, diesel, kerosene', 'Vehicle and jet fuel'], ['Paraffin wax', 'Candles, polishes'], ['Bitumen', 'Road surfacing']], 'Table of uses of alkanes and petroleum fractions'),
      n: 'Alkanes are our main fuels. Methane is compressed natural gas and domestic gas. Propane and butane are bottled as liquefied petroleum gas. Petrol, kerosene and diesel power vehicles and aircraft. Heavier alkanes give lubricating oils, wax for candles and bitumen for roads. Alkanes are also raw materials for making hydrogen, carbon black, solvents and many other organic compounds.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Boiling point rises with chain length (dispersion forces) and falls with branching; alkanes are insoluble in water.',
        'Combustion gives CO₂ and H₂O; catalytic oxidation gives methanol, methanal or ethanoic acid.',
        'Halogenation is a free-radical chain: initiation, propagation, termination; reactivity 3° > 2° > 1°.',
        'Heating over Cr₂O₃/Al₂O₃ cyclises and aromatises hexane to benzene; AlCl₃/HCl isomerises; pyrolysis cracks.',
      ],
      v: table(['Reaction', 'Reagent or condition'], [['Chlorination', 'Cl₂, light'], ['Catalytic oxidation', 'Cu, 523 K, 100 atm'], ['Aromatisation', 'Cr₂O₃/Al₂O₃, 773 K'], ['Isomerisation', 'AlCl₃/HCl, 573 K'], ['Pyrolysis', 'High temperature, no air']], 'Summary table of reactions of alkanes and their conditions'),
      n: 'To sum up Part two. The boiling point of alkanes rises with chain length and falls with branching, and alkanes do not dissolve in water. They burn to carbon dioxide and water, can be oxidised to methanol or ethanoic acid with catalysts, and react with halogens by a free radical chain. Hexane is aromatised to benzene, butane is isomerised, and large alkanes are cracked.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Explain boiling-point trends with surface area and dispersion forces, not with bond strength.',
        'Write the mechanism in three labelled stages with equations for each step.',
        'For combustion calculations, balance the equation first and work in moles.',
        'Give the catalyst and conditions with each reaction.',
      ],
      v: table(['Slip', 'Fix'], [['Branching raises the boiling point', 'It lowers it (smaller surface)'], ['Two Cl• form in propagation', 'Cl• is used and regenerated'], ['Omitting catalyst in aromatisation', 'Cr₂O₃/Al₂O₃, 773 K, 10–20 atm']], 'Table of three common slips on alkane properties and their corrections'),
      n: 'Tips for Part two. Explain boiling point trends with surface area and dispersion forces. Write the chlorination mechanism in three stages with an equation for each step. In combustion calculations, balance the equation first and then work in moles. And always state the catalyst and conditions with each reaction, for example chromium oxide on alumina for aromatisation.',
    }),
  ],
});

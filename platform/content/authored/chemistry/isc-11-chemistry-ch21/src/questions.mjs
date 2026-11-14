// ch21 Alkanes — question bank (ISC style). AR keys planned: a b c d b c. MCQ keys are placed by the builder.
// Numbers printed in stems are the exact values used in the computations (strings carry the significant figures).
import { mk, add, r, near, dec } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const BARRIER = 12.5; // kJ mol-1, torsional barrier of ethane (standard textbook value)
const R_GAS = 8.314; // J K-1 mol-1
const REL_S = 3.8; // relative rate of chlorination, secondary : primary (given)
const REL_T = 5.0; // tertiary : primary (given)
const MV = 22.4; // L at STP

// ---------------------------------------------------------------- t01 classification, nomenclature, isomerism, occurrence
add('class-mcq', mcq({
  stem: 'A teacher hands out cards showing four hydrocarbons and asks which one is an alicyclic compound. The answer is:',
  right: 'cyclohexane',
  wrong: ['benzene', 'hex-1-ene', 'methylbenzene'],
  sol: 'Alicyclic compounds have a closed ring without aromatic character: cyclohexane, option (@K). Benzene and methylbenzene are aromatic (@1, @3); hex-1-ene is an open-chain (aliphatic) alkene (@2).',
  d: 1, c: 'recall', t: [1],
}));
add('hybrid-mcq', mcq({
  stem: 'The carbon–carbon single bond in an ethane molecule is formed by the overlap of:',
  right: 'sp³ hybrid orbitals, head-on, giving a sigma bond',
  wrong: ['sp² hybrid orbitals, head-on, giving a sigma bond', 'unhybridised p orbitals, sideways, giving a pi bond', 's and sp³ orbitals, head-on, giving a sigma bond'],
  sol: 'Each carbon of ethane is sp³ hybridised, so the C–C bond is a σ bond from head-on overlap of two sp³ orbitals — option (@K). Options (@1), (@2) and (@3) describe other hybridisations or a π bond.',
  d: 1, c: 'recall', t: [1],
}));
add('nomen-mcq', mcq({
  stem: 'An analyst at an oil refinery records the structure CH₃CH(CH₃)CH₂CH(CH₂CH₃)CH₂CH₂CH₃ for a sample. Its IUPAC name is:',
  right: '4-ethyl-2-methylheptane',
  wrong: ['2-methyl-4-ethylheptane', '4-ethyl-6-methylheptane', '2-methyl-4-propylhexane'],
  sol: 'The longest chain has 7 carbons (heptane): CH₃–CH(CH₃)–CH₂–CH(C₂H₅)–CH₂–CH₂–CH₃. Numbering from the end nearer the first branch gives locants 2 and 4 (not 4 and 6). Alphabetically, ethyl comes before methyl: 4-ethyl-2-methylheptane, option (@K). Option (@1) breaks the alphabetical order, (@2) the lowest-locant rule and (@3) the longest-chain rule.',
  d: 2, c: 'application', t: [1],
}));
add('isocount-mcq', mcq({
  stem: 'A student lists every chain isomer of heptane, C₇H₁₆, including heptane itself. The number of isomers is:',
  right: '9',
  wrong: ['7', '8', '5'],
  sol: 'The numbers of chain isomers for C₄ to C₈ alkanes are 2, 3, 5, 9 and 18, so heptane (C₇) has 9 isomers — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('natgas-mcq', mcq({
  stem: 'The gas that bubbles up from decaying vegetation in a marsh, and is also the chief constituent of compressed natural gas, is:',
  right: 'methane',
  wrong: ['ethane', 'propane', 'ethene'],
  sol: 'Marsh gas, biogas and natural gas are mainly methane, option (@K); ethane and propane are only minor constituents (@1, @2) and ethene is not a natural-gas component (@3).',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 conformations
add('newman-mcq', mcq({
  stem: 'A Newman projection of ethane shows six C–H lines spaced at 60° intervals around the centre. This conformation is:',
  right: 'staggered, and the more stable of the two extreme forms',
  wrong: ['eclipsed, and the more stable of the two extreme forms', 'eclipsed, and the less stable of the two extreme forms', 'staggered, and the less stable of the two extreme forms'],
  sol: 'Six lines at equal 60° intervals mean that each rear bond lies midway between two front bonds: this is the staggered conformation, which has the least repulsion and the lowest energy — option (@K). Options (@1) and (@2) call it eclipsed; (@3) gets the stability wrong.',
  d: 2, c: 'understanding', t: [2],
}));
add('eclipse-mcq', mcq({
  stem: 'The torsional strain in ethane is greatest in the conformation in which:',
  right: 'each C–H bond on one carbon lies directly behind a C–H bond on the other carbon (dihedral angle 0°)',
  wrong: ['each C–H bond on one carbon bisects the angle between two C–H bonds on the other carbon', 'the C–C bond is longer than 154 pm', 'the molecule has a net dipole moment'],
  sol: 'Torsional strain arises from repulsion between bonding pairs on adjacent carbons. It is greatest when they are closest, with a dihedral angle of 0° — option (@K). Option (@1) describes the staggered form; (@2) and (@3) are not features of conformations.',
  d: 2, c: 'understanding', t: [2],
}));
add('energy-mcq', mcq({
  stem: 'Ethane is rotated about its C–C bond through one complete turn of 360°. The number of staggered conformations passed through, each a minimum on the energy curve, is:',
  right: 'three, at 60°, 180° and 300°',
  wrong: ['two, at 90° and 270°', 'six, one every 60°', 'one, at 180°'],
  sol: 'Each methyl group has three C–H bonds, so the pattern repeats every 120°: minima (staggered) at 60°, 180° and 300°, and maxima (eclipsed) at 0°, 120° and 240° — option (@K).',
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 preparation
add('decarb-mcq', mcq({
  stem: 'Sodium 3-methylbutanoate, (CH₃)₂CHCH₂COONa, is heated strongly with soda lime. The hydrocarbon formed is:',
  right: '2-methylpropane',
  wrong: ['butane', '2-methylbutane', 'propane'],
  sol: 'Decarboxylation replaces –COONa by –H: (CH₃)₂CHCH₂–H, which is 2-methylpropane — option (@K). The product has one carbon fewer than the acid; (@2) keeps the carboxyl carbon, while (@1) and (@3) have the wrong skeleton.',
  d: 2, c: 'application', t: [3],
}));
add('kolbe-mcq', mcq({
  stem: 'A concentrated aqueous solution of sodium butanoate is electrolysed between platinum electrodes. The organic product at the anode is:',
  right: 'hexane',
  wrong: ['propane', 'butane', 'octane'],
  sol: 'In Kolbe electrolysis two R–COO⁻ ions give R–R. Here R = C₃H₇, so R–R is hexane — option (@K). Propane (@1) is what soda-lime decarboxylation would give; (@2) and (@3) join the wrong number of carbons.',
  d: 2, c: 'application', t: [3],
}));
add('wurtz-mcq', mcq({
  stem: 'A student wishes to make hexane in good yield by the Wurtz reaction, using a single alkyl halide and sodium in dry ether. The halide to choose is:',
  right: '1-bromopropane',
  wrong: ['1-bromohexane', 'bromoethane', '1-bromobutane'],
  sol: 'The Wurtz reaction joins two identical R groups, giving R–R with twice the carbons of R. Hexane has 6 carbons, so R = C₃H₇ and the halide is 1-bromopropane — option (@K). The others give dodecane (@1), butane (@2) and octane (@3).',
  d: 2, c: 'application', t: [3],
}));
add('corey-mcq', mcq({
  stem: 'Lithium dimethylcuprate, (CH₃)₂CuLi, is treated with 1-bromobutane in dry ether. The alkane formed is:',
  right: 'pentane',
  wrong: ['hexane', 'butane', 'ethane'],
  sol: 'In the Corey–House synthesis R₂CuLi + R′X gives R–R′. Here R = CH₃ and R′ = C₄H₉, so the product is pentane — option (@K). Hexane (@1), butane (@2) and ethane (@3) would need other groups.',
  d: 3, c: 'application', t: [3],
}));
add('grig-mcq', mcq({
  stem: 'Propylmagnesium bromide, prepared in dry ether, is poured into water. The organic product is:',
  right: 'propane',
  wrong: ['propan-1-ol', 'hexane', 'propene'],
  sol: 'A Grignard reagent is hydrolysed by water to the alkane: C₃H₇MgBr + H₂O gives C₃H₈ (propane) and Mg(OH)Br — option (@K). Propan-1-ol (@1) would need oxygen insertion, hexane (@2) is a coupling product and propene (@3) needs elimination.',
  d: 2, c: 'application', t: [3],
}));
add('aldred-mcq', mcq({
  stem: 'Butanal is warmed with zinc amalgam and concentrated hydrochloric acid. The main product is:',
  right: 'butane',
  wrong: ['butan-1-ol', 'propane', 'but-1-ene'],
  sol: 'Clemmensen reduction converts the C=O group of an aldehyde into CH₂, so butanal, CH₃CH₂CH₂CHO, gives butane — option (@K). Butan-1-ol (@1) is only a partial reduction product; propane (@2) has lost a carbon and but-1-ene (@3) is unsaturated.',
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 physical properties
add('bpdata-mcq', mcq({
  stem: 'A sample labelled C₅H₁₂ boils at 301 K. Pentane boils at 309 K and 2,2-dimethylpropane at 283 K. The sample is most likely:',
  right: '2-methylbutane',
  wrong: ['pentane', '2,2-dimethylpropane', 'cyclopentane'],
  sol: 'Branching lowers the boiling point: straight-chain pentane (309 K) > singly branched isomer > doubly branched 2,2-dimethylpropane (283 K). A value of 301 K lies between them, so the sample is 2-methylbutane — option (@K). Options (@1) and (@2) are the isomers with the other two boiling points; cyclopentane (@3) is C₅H₁₀.',
  d: 2, c: 'application', t: [4],
}));
add('branch-mcq', mcq({
  stem: 'Of the four isomers of C₆H₁₄ below, the one with the lowest boiling point is:',
  right: '2,2-dimethylbutane',
  wrong: ['hexane', '2-methylpentane', '3-methylpentane'],
  sol: 'All four isomers have the same molar mass, so the one with the smallest surface area (most compact, most branched) has the weakest dispersion forces and the lowest boiling point: 2,2-dimethylbutane — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('solub-mcq', mcq({
  stem: 'Liquid hexane is poured gently into a beaker of water and the mixture is stirred. After some time, the observation is:',
  right: 'two layers, with hexane floating on top',
  wrong: ['a single clear layer', 'two layers, with hexane at the bottom', 'a single layer that smells of an alcohol'],
  sol: 'Hexane is non-polar and cannot form hydrogen bonds with water, so it does not dissolve; being less dense than water it forms the upper layer — option (@K). It neither dissolves (@1) nor sinks (@2) nor reacts with water (@3).',
  d: 1, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 chemical properties
add('term-mcq', mcq({
  stem: 'In the chlorination of methane in sunlight, which of these represents a chain-termination step?',
  right: '•CH₃ + •CH₃ → CH₃CH₃',
  wrong: ['CH₄ + Cl• → •CH₃ + HCl', '•CH₃ + Cl₂ → CH₃Cl + Cl•', 'Cl₂ → 2Cl•'],
  sol: 'A termination step removes two radicals by combining them into a molecule: •CH₃ + •CH₃ → C₂H₆ — option (@K). Options (@1) and (@2) are propagation steps (a radical is regenerated) and (@3) is initiation.',
  d: 2, c: 'understanding', t: [5],
}));
add('monochl-mcq', mcq({
  stem: 'When 2-methylbutane is chlorinated in sunlight, the number of different monochloro structural isomers that can form is:',
  right: '4',
  wrong: ['2', '3', '5'],
  sol: 'Count the hydrogen types in CH₃CH(CH₃)CH₂CH₃: the two equivalent CH₃ groups on C-2, the C-2 H, the CH₂ hydrogens and the terminal CH₃. That makes 4 types of hydrogen, so 4 monochloro isomers — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('aroma-mcq', mcq({
  stem: 'Hexane is passed over a Cr₂O₃/Al₂O₃ catalyst at 773 K and 10–20 atm and is converted to benzene. The number of moles of hydrogen gas liberated per mole of hexane is:',
  right: '4',
  wrong: ['1', '3', '7'],
  sol: 'C₆H₁₄ gives C₆H₆, so 14 − 6 = 8 hydrogen atoms are lost, that is 4 mol of H₂ — option (@K). One mole (@1) is lost in cyclisation alone and 3 mol (@2) when cyclohexane goes to benzene; 7 (@3) assumes all 14 H atoms leave.',
  d: 2, c: 'application', t: [5],
}));
add('isom-mcq', mcq({
  stem: 'Anhydrous aluminium chloride and hydrogen chloride at about 573 K convert n-butane mainly into:',
  right: '2-methylpropane',
  wrong: ['cyclobutane', 'propane', 'but-2-ene'],
  sol: 'These conditions bring about isomerisation of a straight-chain alkane to its branched isomer: n-butane gives 2-methylpropane — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('catox-mcq', mcq({
  stem: 'A mixture of methane with a limited supply of oxygen is passed through a copper tube at 523 K and 100 atm. The main product is:',
  right: 'methanol',
  wrong: ['methanal', 'carbon dioxide', 'chloromethane'],
  sol: 'Controlled catalytic oxidation with copper under these conditions converts methane to methanol: 2CH₄ + O₂ gives 2CH₃OH — option (@K). Methanal (@1) needs Mo₂O₃; carbon dioxide (@2) is the product of complete combustion; there is no chlorine present for (@3).',
  d: 2, c: 'understanding', t: [5],
}));
{
  const n = 0.5;
  const vO2 = 5 * n * MV; // 56.0 L
  add('o2vol-mcq', mcq({
    stem: `Propane, C₃H₈, is burnt completely in a burner. The volume of oxygen at STP (molar volume ${MV} L) needed for ${n.toFixed(2)} mol of propane is:`,
    right: `${vO2.toFixed(1)} L`,
    wrong: [`${(n * MV).toFixed(1)} L`, `${(3 * n * MV).toFixed(1)} L`, `${(10 * n * MV).toFixed(0)} L`],
    sol: r`C₃H₈ + 5O₂ → 3CO₂ + 4H₂O, so $n(\text{O}_2) = 5 \times ${n.toFixed(2)} = ${(5 * n).toFixed(2)}\ \text{mol}$ and $V = ${(5 * n).toFixed(2)} \times ${MV} = ${vO2.toFixed(1)}\ \text{L}$ — option (@K). Option (@1) is the volume of propane itself, (@2) is the volume of CO₂ formed and (@3) doubles the oxygen.`,
    d: 2, c: 'application', t: [5],
  }), () => near(vO2, 56.0, 0.001) || 'vO2');
}
add('uses-mcq', mcq({
  stem: 'The fuel sold in a household LPG cylinder consists mainly of:',
  right: 'butane and propane',
  wrong: ['methane and ethane', 'ethene and ethyne', 'pentane and hexane'],
  sol: 'LPG is a mixture of butane and propane compressed to a liquid — option (@K). Methane and ethane (@1) are the main components of natural gas, and (@2) and (@3) are not used as LPG.',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- assertion-reason
add('stagger-ar', ar({
  a: 'The staggered conformation of ethane has a lower energy than the eclipsed conformation.',
  r: 'In the staggered conformation the C–H bonding pairs on the two carbons are as far apart as possible, so the repulsion between them is least.',
  key: 'a',
  sol: 'Both are true, and R explains A: the minimum repulsion between bonding pairs lowers the energy of the staggered form — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('bp-ar', ar({
  a: '2,2-Dimethylpropane boils at a lower temperature than pentane.',
  r: 'Both pentane and 2,2-dimethylpropane burn completely in excess oxygen to give carbon dioxide and water.',
  key: 'b',
  sol: 'Both statements are true. The lower boiling point is due to the compact shape and smaller surface area of 2,2-dimethylpropane, not to its combustion products, so R does not explain A — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('chlor-ar', ar({
  a: 'Methane reacts with chlorine in ultraviolet light to give chloromethane.',
  r: 'The reaction proceeds through ionic intermediates formed by heterolytic fission of the Cl–Cl bond.',
  key: 'c',
  sol: 'A is true. R is false: light causes homolytic fission, giving chlorine radicals, and the reaction is a free-radical chain — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('kolbe-ar', ar({
  a: 'The electrolysis of aqueous sodium ethanoate gives methane at the anode.',
  r: 'Hydrogen gas is liberated at the anode in this electrolysis.',
  key: 'd',
  sol: 'Both are false: the anode product is ethane (with carbon dioxide), formed by coupling of two methyl groups, and hydrogen is liberated at the cathode — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('corey-ar', ar({
  a: 'The Corey–House synthesis can be used to prepare an unsymmetrical alkane such as pentane.',
  r: 'Alkanes are insoluble in water.',
  key: 'b',
  sol: 'Both are true. The insolubility of alkanes in water has no bearing on how an alkane is built from R₂CuLi and R′X, so R is not the explanation — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('wurtz-ar', ar({
  a: 'A mixture of bromoethane and 1-bromopropane treated with sodium in dry ether gives three different alkanes.',
  r: 'Each alkyl halide can react only with molecules of its own kind.',
  key: 'c',
  sol: 'A is true: butane, pentane and hexane form. R is false: the radicals or organosodium compounds can couple with those from either halide, which is why a mixture is formed — option (c).',
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- true-false, fill, match
add('eclipse-tf', tf({
  stem: 'In the eclipsed conformation of ethane the hydrogen atoms on the two carbons are as far apart as possible.',
  key: 'f',
  sol: 'False. In the eclipsed conformation they are directly behind one another (dihedral angle 0°); it is the staggered conformation that keeps them farthest apart.',
  d: 1, c: 'understanding', t: [2],
}));
add('wurtzmono-tf', tf({
  stem: 'When one alkyl halide, RX, is treated with sodium in dry ether, the alkane R–R formed has twice as many carbon atoms as the group R.',
  key: 't',
  sol: 'True. Two R groups couple, so the alkane contains 2 × (carbons in R) carbon atoms.',
  d: 1, c: 'understanding', t: [3],
}));
add('branch-tf', tf({
  stem: 'Among isomeric alkanes, the more highly branched isomer usually has the higher boiling point.',
  key: 'f',
  sol: 'False. Branching makes the molecule more compact and reduces the surface area, so the dispersion forces and the boiling point are lower.',
  d: 1, c: 'understanding', t: [4],
}));
add('corey-fill', fill({
  stem: 'In the Corey–House synthesis, lithium dialkylcuprate is made from an alkyllithium and copper(I) ___.',
  acc: [['iodide', 'copper(I) iodide', 'CuI']],
  sol: '**Iodide**: 2RLi + CuI gives R₂CuLi + LiI.',
  d: 2, c: 'recall', t: [3],
}));
add('barrier-fill', fill({
  stem: 'The energy difference between the eclipsed and staggered forms of ethane, called the torsional barrier, is about ___ kJ mol⁻¹.',
  acc: [['12.5', '12.55', '12.6']],
  sol: 'About **12.5** kJ mol⁻¹.',
  d: 1, c: 'recall', t: [2],
}));
add('radical-fill', fill({
  stem: 'The reaction of an alkane with chlorine in sunlight proceeds by a ___ chain mechanism.',
  acc: [['free radical', 'free-radical', 'radical']],
  sol: 'A **free-radical** chain mechanism: initiation, propagation and termination.',
  d: 1, c: 'recall', t: [5],
}));
add('cond-match', match({
  stem: 'Match each reaction of alkanes in Column I with its reagent or conditions in Column II.',
  pairs: [
    ['Free-radical chlorination of methane', 'Cl₂ and ultraviolet light'],
    ['Aromatisation of hexane', 'Cr₂O₃/Al₂O₃, 773 K, 10–20 atm'],
    ['Isomerisation of n-butane', 'Anhydrous AlCl₃ and HCl, 573 K'],
    ['Oxidation of methane to methanol', 'Copper tube, 523 K, 100 atm'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Halogenation needs Cl₂ with light; aromatisation uses the mixed oxide catalyst at 773 K; isomerisation uses AlCl₃ with HCl; the oxidation to methanol uses copper at 523 K and 100 atm.',
  d: 2, c: 'understanding', t: [5],
}));
add('bpm-match', match({
  stem: 'Match each alkane in Column I with its approximate boiling point in Column II.',
  pairs: [
    ['Propane', 'About 231 K'],
    ['Methane', 'About 112 K'],
    ['Butane', 'About 273 K'],
    ['Ethane', 'About 185 K'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Boiling points rise with chain length: methane 112 K < ethane 185 K < propane 231 K < butane 273 K.',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- numericals
{
  const n = 0.24;
  const E = n * BARRIER; // 3.00 kJ
  add('torsion-num', num({
    stem: `A sample contains ${n.toFixed(3)} mol of ethane, all in the staggered conformation. Taking the torsional barrier as ${BARRIER.toFixed(1)} kJ mol⁻¹, how much energy, in kJ, is needed to bring all the molecules to the eclipsed conformation?`,
    value: 3.0, tol: 0.01, unit: 'kJ',
    sol: r`$E = n \times \text{barrier} = ${n.toFixed(3)} \times ${BARRIER.toFixed(1)} = ${E.toFixed(2)}\ \text{kJ}$.`,
    scheme: [['Energy = moles × barrier', 0.5], ['3.00 kJ', 0.5]],
    d: 1, c: 'understanding', t: [2],
  }), () => near(E, 3.0, 0.001) || 'E');
}
{
  const mAlk = 1.44;
  const mCO2 = 4.4;
  const nC = mCO2 / 44; // 0.100 mol of C
  let found = null;
  for (let k = 1; k <= 20; k++) if (near((k * mAlk) / (14 * k + 2), nC, 0.001)) found = k;
  add('formula-num', num({
    stem: `A sample of ${mAlk.toFixed(2)} g of an open-chain saturated hydrocarbon burns completely to give ${mCO2.toFixed(2)} g of carbon dioxide. How many carbon atoms does one molecule of the hydrocarbon contain? (C = 12, H = 1, O = 16)`,
    value: 5, tol: 0, marks: 2,
    sol: r`$n(\text{C}) = \dfrac{${mCO2.toFixed(2)}}{44} = ${nC.toFixed(3)}\ \text{mol}$. For $\text{C}_x\text{H}_{2x+2}$ (molar mass $14x + 2$): $\dfrac{${mAlk.toFixed(2)}}{14x+2} \times x = ${nC.toFixed(3)}$, so $${mAlk.toFixed(2)}x = ${nC.toFixed(3)}(14x + 2)$, which gives $x = 5$. The hydrocarbon is C₅H₁₂ (M = 72; $1.44 \div 72 = 0.0200$ mol, which gives $5 \times 0.0200 = 0.100$ mol of CO₂).`,
    scheme: [['Moles of C from CO₂ = 0.100', 1], ['Uses CₓH₂ₓ₊₂ and molar mass 14x + 2', 0.5], ['x = 5', 0.5]],
    d: 3, c: 'application', t: [5],
  }), () => found === 5 || 'formula');
}
{
  const m = 9.6;
  const M = 96; // C2H5COONa: 36 + 5 + 32 + 23
  const n = m / M; // 0.100 mol
  const V = n * MV; // 2.24 L
  add('decarb-num', num({
    stem: `A chemist heats ${m.toFixed(2)} g of sodium propanoate with excess soda lime until the reaction is complete. What volume of ethane, in litres at STP, is obtained? (Na = 23, C = 12, H = 1, O = 16; molar volume ${MV} L)`,
    value: 2.24, tol: 0.01, unit: 'L',
    sol: r`CH₃CH₂COONa + NaOH → CH₃CH₃ + Na₂CO₃. $M = ${M}\ \text{g mol}^{-1}$, so $n = ${m.toFixed(2)} \div ${M} = ${n.toFixed(3)}\ \text{mol}$ and 1 mol gives 1 mol of ethane: $V = ${n.toFixed(3)} \times ${MV} = ${V.toFixed(2)}\ \text{L}$.`,
    scheme: [['Molar mass 96 and n = 0.100 mol', 0.5], ['1 : 1 ratio and V = 2.24 L', 0.5]],
    d: 2, c: 'application', t: [3],
  }), () => near(V, 2.24, 0.001) || 'V');
}
{
  const wP = 6 * 1.0;
  const wS = 4 * REL_S;
  const pct = (100 * wS) / (wP + wS); // 71.7
  add('chlor-num', num({
    stem: `Butane is monochlorinated in sunlight. A secondary hydrogen is ${REL_S.toFixed(1)} times as reactive as a primary hydrogen towards a chlorine radical (given). What percentage of the monochloro product is 2-chlorobutane?`,
    value: 71.7, tol: 0.1, unit: '%',
    sol: r`Butane, CH₃CH₂CH₂CH₃, has 6 primary and 4 secondary hydrogens. Weights: $6 \times 1.0 = ${wP.toFixed(1)}$ and $4 \times ${REL_S.toFixed(1)} = ${wS.toFixed(1)}$. $\%\ \text{2-chlorobutane} = \dfrac{${wS.toFixed(1)}}{${wP.toFixed(1)} + ${wS.toFixed(1)}} \times 100 = ${pct.toFixed(2)} \approx 71.7\%$.`,
    scheme: [['6 primary and 4 secondary hydrogens', 0.5], ['Weights 6.0 and 15.2', 0.5]],
    d: 4, c: 'analysis', t: [5],
  }), () => near(pct, 71.7, 0.001) || 'pct');
}

// ---------------------------------------------------------------- short answers, 2 marks
add('homol-short', short({
  marks: 2,
  stem: 'A student is asked to explain why the alkanes are called a homologous series. State what is meant by a homologous series, and give the general formula of the alkanes and the difference in mass between successive members.',
  model: 'A homologous series is a family of compounds with the same functional group (here only C–C and C–H single bonds), the same general formula, and successive members that differ by a –CH₂– unit, with a gradual change in properties. The general formula of alkanes is CₙH₂ₙ₊₂, and successive members differ by 14 mass units.',
  sol: 'Definition; formula; 14 u.',
  scheme: [['Definition with –CH₂– difference', 1], ['General formula CₙH₂ₙ₊₂', 0.5], ['14 u difference', 0.5]],
  d: 1, c: 'recall', t: [1],
}));
add('pentane-short', short({
  marks: 2,
  stem: 'A hydrocarbon dealer is shown three samples, all of C₅H₁₂. Write the IUPAC names of the isomer with one methyl branch and the isomer with two methyl branches, and name the type of isomerism.',
  model: 'One methyl branch: 2-methylbutane. Two methyl branches (both on C-2): 2,2-dimethylpropane. The third isomer is straight-chain pentane. They differ in the carbon skeleton, so the isomerism is chain isomerism.',
  sol: 'Two names; chain isomerism.',
  scheme: [['2-Methylbutane', 0.5], ['2,2-Dimethylpropane', 0.5], ['Chain isomerism', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('methconf-short', short({
  marks: 2,
  stem: 'Ethane has a staggered and an eclipsed conformation, but methane has no separate conformations. Explain why.',
  model: 'Conformations arise from rotation about a C–C single bond, which changes the relative positions of the groups on the two carbons. Methane has no C–C bond, only four equivalent C–H bonds on one carbon, so there is only one arrangement; ethane has a C–C bond, so rotation gives different arrangements.',
  sol: 'Need a C–C bond.',
  scheme: [['Conformations come from rotation about a C–C bond', 1], ['Methane has none, so a single arrangement', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('newmandraw-short', short({
  marks: 2,
  stem: 'Describe how the eclipsed conformation of ethane appears in a Newman projection, giving the dihedral angle, and say why this form is less stable than the staggered form.',
  model: 'The three C–H bonds of the rear carbon, drawn from the edge of the circle, lie directly behind the three C–H bonds of the front carbon, which meet at the centre (drawn slightly turned so that they can be seen); the dihedral angle is 0°. The bonding pairs on the two carbons are closest, so repulsion (torsional strain) is greatest and the energy is higher by about 12.5 kJ mol⁻¹.',
  sol: 'Rear bonds behind front bonds; 0°; torsional strain.',
  scheme: [['Rear C–H bonds directly behind front bonds, dihedral angle 0°', 1], ['Closest bonding pairs: greatest torsional strain', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('decarbEq-short', short({
  marks: 2,
  stem: r`Sodium pentanoate is heated with soda lime (NaOH and CaO). Write the balanced equation and name the alkane formed.`,
  model: r`$\ce{CH3CH2CH2CH2COONa + NaOH ->[CaO][\Delta] CH3CH2CH2CH3 + Na2CO3}$. The alkane is butane, with one carbon less than the pentanoate.`,
  sol: 'Balanced equation; butane.',
  scheme: [['Balanced equation', 1.5], ['Butane', 0.5]],
  d: 2, c: 'application', t: [3],
}));
add('wurtzEq-short', short({
  marks: 2,
  stem: 'Show, with a balanced equation, how 2,3-dimethylbutane can be prepared by the Wurtz reaction from a single halide.',
  model: r`The halide is 2-bromopropane: $\ce{2(CH3)2CHBr + 2Na ->[dry ether] (CH3)2CHCH(CH3)2 + 2NaBr}$. Two isopropyl groups join to give 2,3-dimethylbutane.`,
  sol: '2-Bromopropane and sodium.',
  scheme: [['2-Bromopropane as the halide', 0.5], ['Balanced equation with sodium and dry ether', 1], ['Isopropyl groups join', 0.5]],
  d: 2, c: 'application', t: [3],
}));
add('coreyEq-short', short({
  marks: 2,
  stem: 'Show by equations how propane may be prepared by the Corey–House synthesis starting from chloromethane and bromoethane.',
  model: r`Step 1: $\ce{CH3Cl + 2Li -> CH3Li + LiCl}$. Step 2: $\ce{2CH3Li + CuI -> (CH3)2CuLi + LiI}$. Step 3: $\ce{(CH3)2CuLi + CH3CH2Br -> CH3CH2CH3 + CH3Cu + LiBr}$.`,
  sol: 'Alkyllithium; dialkylcuprate; coupling with bromoethane.',
  scheme: [['Methyllithium from chloromethane and Li', 0.5], ['Lithium dimethylcuprate with CuI', 0.5], ['Coupling with bromoethane to give propane', 1]],
  d: 3, c: 'application', t: [3],
}));
add('nonpolar-short', short({
  marks: 2,
  stem: 'Hexane is insoluble in water but dissolves readily in benzene. Explain, using the nature of the forces between the molecules.',
  model: 'Water molecules are held together by strong hydrogen bonds. Hexane is non-polar and cannot form hydrogen bonds or dipole interactions with water, so it does not mix. Benzene and hexane are both non-polar and are held by similar London (dispersion) forces, so they mix freely: like dissolves like.',
  sol: 'Hydrogen bonding in water; like dissolves like.',
  scheme: [['Water is hydrogen bonded; hexane cannot interact with it', 1], ['Similar weak forces in hexane and benzene: like dissolves like', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('arom-short', short({
  marks: 2,
  stem: 'An industrial chemist heats n-hexane in a reactor. Write the equation, with the catalyst and conditions, for its aromatisation.',
  model: r`$\ce{C6H14 ->[Cr2O3/Al2O3][773 K, 10-20 atm] C6H6 + 4H2}$. Hexane forms benzene with loss of four molecules of hydrogen (cyclohexane is an intermediate).`,
  sol: 'Equation; catalyst; conditions.',
  scheme: [['Balanced equation C₆H₁₄ → C₆H₆ + 4H₂', 1], ['Cr₂O₃/Al₂O₃ catalyst', 0.5], ['773 K and 10–20 atm', 0.5]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- short answers, 3 marks
add('wurtz-short3', short({
  marks: 3,
  stem: 'A mixture of bromoethane and 1-bromopropane is warmed with sodium in dry ether. Name the three alkanes that can form, and explain why the Wurtz reaction is unsuitable for preparing an alkane with an odd number of carbon atoms such as pentane.',
  model: 'The alkanes are butane (from two ethyl groups), pentane (ethyl + propyl) and hexane (two propyl groups). A single alkyl halide gives only R–R, with an even number of carbons. To obtain pentane we must use two different halides, and then the two other symmetrical alkanes form as well, so the product is a mixture of three alkanes whose boiling points are close and which are hard to separate, and the yield of pentane is low.',
  sol: 'Butane, pentane, hexane; mixture; low yield.',
  scheme: [['Butane, pentane and hexane named', 1], ['A single halide gives only an even-carbon R–R', 1], ['Two halides give a mixture that is hard to separate', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('kolbe-short3', short({
  marks: 3,
  stem: 'Aqueous sodium propanoate is electrolysed between platinum electrodes. Write the half-reactions at the anode and at the cathode, name the alkane formed, and state which alkane would be formed if the same salt were heated with soda lime.',
  model: r`Anode: $\ce{2CH3CH2COO- -> CH3CH2CH2CH3 + 2CO2 + 2e-}$ (butane). Cathode: $\ce{2H2O + 2e- -> H2 + 2OH-}$. Heating sodium propanoate with soda lime gives ethane (decarboxylation, one carbon fewer than the acid), not butane.`,
  sol: 'Half-reactions; butane; ethane.',
  scheme: [['Anode reaction giving butane', 1], ['Cathode reaction giving H₂', 1], ['Ethane from soda lime', 1]],
  d: 3, c: 'application', t: [3],
}));
add('bp-short3', short({
  marks: 3,
  stem: 'The boiling points of four isomers of C₆H₁₄ are hexane 68.7 °C, 2-methylpentane 60.3 °C, 2,3-dimethylbutane 58.0 °C and 2,2-dimethylbutane 49.7 °C. State how the boiling point changes with the number of branches, explain it, and say why the two isomers with two methyl branches differ.',
  model: 'The boiling point falls as branching increases: hexane (no branch) is highest, 2-methylpentane (one branch) is lower, and the two dimethylbutanes are lower still. Branching makes the molecule more compact, which reduces the surface area of contact between neighbouring molecules, so the London dispersion forces are weaker and less energy is needed to separate them. 2,2-Dimethylbutane, with both methyl groups on one carbon, is the more nearly spherical of the two and so has the lower boiling point (49.7 °C against 58.0 °C).',
  sol: 'Falls with branching; smaller surface; 2,2- is more spherical.',
  scheme: [['Boiling point falls with branching', 0.5], ['Compact shape, smaller surface, weaker dispersion forces', 1.5], ['2,2-isomer more spherical, so lower than the 2,3-isomer', 1]],
  d: 3, c: 'analysis', t: [4],
}));
{
  const RT = (R_GAS * 298) / 1000; // kJ mol-1
  const ratio = BARRIER / RT; // 5.04
  add('torsion-short3', short({
    marks: 3,
    stem: `At 298 K, the quantity RT (R = ${R_GAS} J K⁻¹ mol⁻¹) is the typical thermal energy of a mole of molecules. Calculate RT in kJ mol⁻¹, compare it with the torsional barrier of ethane (${BARRIER.toFixed(1)} kJ mol⁻¹), and use the comparison to explain why the staggered and eclipsed forms of ethane cannot be separated.`,
    model: `RT = 8.314 × 298 ÷ 1000 = ${RT.toFixed(2)} kJ mol⁻¹. The barrier of ${BARRIER.toFixed(1)} kJ mol⁻¹ is only about ${ratio.toFixed(1)} times RT, so collisions at room temperature easily supply the energy to cross it: the molecule rotates millions of times a second between staggered forms, passing through eclipsed forms, and no single conformation can be isolated. The staggered form is the more stable, so most molecules are found in it at any instant.`,
    sol: 'RT; comparison; free rotation.',
    scheme: [['RT = 2.48 kJ mol⁻¹', 1], ['Barrier about 5 times RT: easily crossed', 1], ['Conformations interconvert rapidly, so cannot be separated', 1]],
    d: 3, c: 'analysis', t: [2],
  }), () => near(RT, 2.478, 0.001) || 'RT');
}
add('chlorin-short3', short({
  marks: 3,
  stem: 'A student irradiates a mixture of ethane and chlorine and finds a little butane in the products. Write the equation for the initiation step, the two propagation steps for the formation of chloroethane, and a termination step that accounts for the butane.',
  model: 'Initiation: Cl₂ → 2Cl• (light; homolytic fission). Propagation: CH₃CH₃ + Cl• → CH₃CH₂• + HCl, and CH₃CH₂• + Cl₂ → CH₃CH₂Cl + Cl•. Termination giving butane: two ethyl radicals combine, 2CH₃CH₂• → CH₃CH₂CH₂CH₃.',
  sol: 'Initiation; two propagation steps; termination.',
  scheme: [['Initiation: homolysis of Cl₂', 0.5], ['Two propagation steps', 1.5], ['Termination: two ethyl radicals give butane', 1]],
  d: 3, c: 'application', t: [5],
}));
{
  const nH = { prim: 12, tert: 2 };
  const wp = nH.prim * 1.0;
  const wt = nH.tert * REL_T;
  const pct = (100 * wt) / (wp + wt); // 45.45
  add('dmbutane-short3', short({
    marks: 3,
    stem: `2,3-Dimethylbutane, (CH₃)₂CHCH(CH₃)₂, is monochlorinated in light. Name the two products, and, taking a tertiary hydrogen to be ${REL_T.toFixed(1)} times as reactive as a primary hydrogen (given), calculate the percentage of the tertiary chloride in the product.`,
    model: `The products are 1-chloro-2,3-dimethylbutane (primary) and 2-chloro-2,3-dimethylbutane (tertiary). The molecule has 12 primary and 2 tertiary hydrogens. Weights: 12 × 1.0 = ${wp.toFixed(1)}; 2 × ${REL_T.toFixed(1)} = ${wt.toFixed(1)}. Tertiary chloride = ${wt.toFixed(1)} ÷ ${(wp + wt).toFixed(1)} × 100 = ${pct.toFixed(1)}%.`,
    sol: 'Two names; hydrogen counts; percentage.',
    scheme: [['Two products named', 1], ['12 primary and 2 tertiary hydrogens, weights 12.0 and 10.0', 1], ['45.5%', 1]],
    d: 3, c: 'application', t: [5],
  }), () => near(pct, 45.45, 0.001) || 'pct');
}
{
  const m = 2.2;
  const n = m / 44; // 0.050 mol
  const vO2 = 5 * n * MV; // 5.6 L
  const mCO2 = 3 * n * 44; // 6.6 g
  const mH2O = 4 * n * 18; // 3.6 g
  add('combust-short3', short({
    marks: 3,
    stem: `A camping stove burns ${m.toFixed(2)} g of propane completely. Write the balanced equation and calculate (i) the volume of oxygen consumed at STP and (ii) the mass of carbon dioxide formed. (C = 12, H = 1, O = 16; molar volume ${MV} L)`,
    model: r`$\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$. $n(\text{C}_3\text{H}_8) = 2.20 \div 44 = 0.0500$ mol. (i) $n(\text{O}_2) = 5 \times 0.0500 = 0.250$ mol, so $V = 0.250 \times 22.4 = 5.60$ L. (ii) $n(\text{CO}_2) = 3 \times 0.0500 = 0.150$ mol, so mass $= 0.150 \times 44 = 6.60$ g.`,
    sol: 'Equation; oxygen volume; carbon dioxide mass.',
    scheme: [['Balanced equation', 1], ['Oxygen: 5.60 L', 1], ['Carbon dioxide: 6.60 g', 1]],
    d: 3, c: 'application', t: [5],
  }), () => near(vO2, 5.6, 0.001) && near(mCO2, 6.6, 0.001) && near(mH2O, 3.6, 0.001) || 'combust');
}
add('crack-short3', short({
  marks: 3,
  stem: 'Large alkanes are cracked in a refinery. Write balanced equations for the pyrolysis of (i) hexadecane, C₁₆H₃₄, giving one alkane and one alkene of 8 carbons each, and (ii) ethane, giving ethene. State one reason why cracking is important.',
  model: r`(i) $\ce{C16H34 -> C8H18 + C8H16}$ (octane and oct-1-ene or another octene). (ii) $\ce{CH3CH3 -> CH2=CH2 + H2}$. Cracking converts heavy, less useful fractions into smaller alkanes (petrol range) and alkenes, which are raw materials for plastics and other chemicals.`,
  sol: 'Two equations; use.',
  scheme: [['Equation (i)', 1], ['Equation (ii)', 1], ['Reason: more petrol or alkene feedstock', 1]],
  d: 2, c: 'application', t: [5],
}));
add('catox-short3', short({
  marks: 3,
  stem: 'Write balanced equations, with the catalyst or conditions, for the controlled oxidation of (i) methane to methanol, (ii) methane to methanal and (iii) ethane to ethanoic acid.',
  model: r`(i) $\ce{2CH4 + O2 ->[Cu][523 K, 100 atm] 2CH3OH}$. (ii) $\ce{CH4 + O2 ->[Mo2O3] HCHO + H2O}$. (iii) $\ce{2CH3CH3 + 3O2 ->[(CH3COO)2Mn] 2CH3COOH + 2H2O}$.`,
  sol: 'Three balanced equations.',
  scheme: [['Methanol equation with conditions', 1], ['Methanal equation with catalyst', 1], ['Ethanoic acid equation with catalyst', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('isomer-short3', short({
  marks: 3,
  stem: 'Name the process and write the equation, with catalyst or conditions, for each of these changes of an alkane: (i) n-butane to 2-methylpropane, (ii) hexane to cyclohexane, (iii) hexane to benzene.',
  model: r`(i) Isomerisation: $\ce{CH3CH2CH2CH3 ->[AlCl3/HCl][573 K] (CH3)2CHCH3}$. (ii) Cyclisation: $\ce{C6H14 ->[Cr2O3/Al2O3][773 K] C6H12 + H2}$. (iii) Aromatisation: $\ce{C6H14 ->[Cr2O3/Al2O3][773 K, 10-20 atm] C6H6 + 4H2}$.`,
  sol: 'Isomerisation, cyclisation, aromatisation.',
  scheme: [['Isomerisation with AlCl₃/HCl', 1], ['Cyclisation equation', 1], ['Aromatisation equation', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- long answers (5 marks, in parts)
{
  const E = (th) => (BARRIER / 2) * (1 + Math.cos((3 * th * Math.PI) / 180));
  const vals = [0, 30, 60, 90, 120].map((th) => E(th));
  const n = 2.0;
  const tot = n * (vals[0] - vals[2]); // 25.0 kJ
  add('conf-long', long({
    stem: `A computer model gives these relative energies for ethane (illustrative values, kJ mol⁻¹) at dihedral angles of 0°, 30°, 60°, 90° and 120°: ${vals.map((v) => v.toFixed(2)).join(', ')}.\n\n(a) Which angles correspond to the staggered and which to the eclipsed conformation? Describe the Newman projection of each. [2]\n\n(b) Calculate the energy needed to convert ${n.toFixed(2)} mol of ethane from the most stable to the least stable conformation. [1]\n\n(c) Explain why the staggered conformation is more stable and why the two forms cannot be separated at room temperature. [2]`,
    model: `(a) The energy is lowest (0) at 60° and highest (${vals[0].toFixed(2)}) at 0° and 120°. So 60° is staggered (rear C–H bonds midway between the front bonds, six lines 60° apart) and 0° and 120° are eclipsed (rear bonds directly behind the front bonds). (b) E = ${n.toFixed(2)} × (${vals[0].toFixed(2)} − ${vals[2].toFixed(2)}) = ${tot.toFixed(1)} kJ. (c) In the staggered form the bonding pairs on the two carbons are farthest apart, so repulsion (torsional strain) is least; in the eclipsed form they are closest. The barrier is small compared with the thermal energy at room temperature, so the molecule rotates freely and the forms interconvert too fast to be separated.`,
    sol: 'Staggered 60°, eclipsed 0° and 120°; energy 25.0 kJ; torsional strain and low barrier.',
    scheme: [['(a) staggered at 60°, eclipsed at 0° and 120°', 1], ['(a) Newman descriptions', 1], ['(b) 2.00 × 12.5 = 25.0 kJ', 1], ['(c) less repulsion between bonding pairs in staggered form', 1], ['(c) low barrier, free rotation, cannot be separated', 1]],
    d: 3, c: 'analysis', t: [2],
  }), () => near(tot, 25, 0.001) && near(vals[1], 6.25, 0.001) || 'conf');
}
add('prep-long', long({
  stem: '(a) Write the equation for the Wurtz reaction of 1-bromopropane and name the alkane. If bromomethane is also present in the mixture, name the three alkanes that can be formed. [2]\n\n(b) Aqueous sodium propanoate is electrolysed: write the reaction at the anode and name the alkane. [2]\n\n(c) State one advantage of the Corey–House synthesis over the Wurtz reaction for making an unsymmetrical alkane. [1]',
  model: r`(a) $\ce{2CH3CH2CH2Br + 2Na -> CH3CH2CH2CH2CH2CH3 + 2NaBr}$ gives hexane. With bromomethane also present, the alkanes are ethane (CH₃–CH₃), butane (CH₃–C₃H₇) and hexane (C₃H₇–C₃H₇). (b) Anode: $\ce{2CH3CH2COO- -> CH3CH2CH2CH3 + 2CO2 + 2e-}$; the alkane is butane. (c) Corey–House joins two different alkyl groups cleanly (R₂CuLi + R′X gives R–R′ only), so no mixture of alkanes is formed.`,
  sol: 'Wurtz; Kolbe; Corey–House advantage.',
  scheme: [['(a) balanced equation and hexane', 1], ['(a) ethane, butane, hexane with bromomethane', 1], ['(b) anode equation', 1], ['(b) butane', 1], ['(c) unsymmetrical alkane without a mixture', 1]],
  d: 3, c: 'application', t: [3],
}));
add('halog-long', long({
  stem: '(a) Describe the mechanism of the monochlorination of methane in sunlight, giving the equation for each step under the headings initiation, propagation and termination. [3]\n\n(b) Chloromethane is accompanied by dichloromethane, trichloromethane and tetrachloromethane. Why is this, and how can the yield of chloromethane be increased? [1]\n\n(c) Arrange F₂, Cl₂, Br₂ and I₂ in decreasing order of their reactivity towards alkanes. [1]',
  model: '(a) Initiation: Cl₂ → 2Cl• (light). Propagation: CH₄ + Cl• → •CH₃ + HCl, then •CH₃ + Cl₂ → CH₃Cl + Cl• (repeated). Termination: any two radicals combine, e.g. Cl• + Cl• → Cl₂, •CH₃ + Cl• → CH₃Cl or •CH₃ + •CH₃ → C₂H₆. (b) Chloromethane still has hydrogen atoms, which a chlorine radical can replace in further chain steps. Using a large excess of methane makes chlorine radicals more likely to meet methane than chloromethane. (c) F₂ > Cl₂ > Br₂ > I₂.',
  sol: 'Mechanism; further substitution and excess methane; halogen order.',
  scheme: [['(a) initiation', 1], ['(a) propagation steps', 1], ['(a) termination', 1], ['(b) further substitution and excess of methane', 1], ['(c) F₂ > Cl₂ > Br₂ > I₂', 1]],
  d: 3, c: 'application', t: [5],
}));
{
  const rise = (125.7 - 36.1) / 3; // 29.87
  add('bpdata-long', long({
    stem: '(a) The boiling points of pentane, hexane, heptane and octane are 36.1 °C, 68.7 °C, 98.4 °C and 125.7 °C. Calculate the average rise in boiling point for each added –CH₂– group, in °C. [1]\n\n(b) Explain why the boiling point increases as the chain gets longer. [2]\n\n(c) Hexane, 2-methylpentane and 2,2-dimethylbutane boil at 68.7 °C, 60.3 °C and 49.7 °C. Explain the trend. [2]',
    model: `(a) Rise = (125.7 − 36.1) ÷ 3 = ${rise.toFixed(2)} ≈ ${rise.toFixed(1)} °C per –CH₂– group. (b) Alkane molecules are non-polar and held by London dispersion forces. A longer chain has more surface and more electrons, so the attraction between neighbouring molecules is stronger, and more energy is needed to separate them. (c) The three are isomers of C₆H₁₄. More branching makes the molecule more compact, which reduces the surface area of contact, so the dispersion forces are weaker and the boiling point is lower.`,
    sol: 'Average rise; dispersion forces; branching.',
    scheme: [['(a) 29.9 °C per –CH₂–', 1], ['(b) non-polar, dispersion forces', 1], ['(b) longer chain: larger surface, stronger forces', 1], ['(c) branching makes the molecule compact', 1], ['(c) smaller surface, weaker forces, lower boiling point', 1]],
    d: 3, c: 'analysis', t: [4],
  }), () => near(rise, 29.87, 0.001) || 'rise');
}
{
  const m = 4.3;
  const n = m / 86; // 0.0500 mol
  const vO2 = 9.5 * n * MV; // 10.64
  const mCO2 = 6 * n * 44; // 13.2
  add('comb-long', long({
    stem: `(a) Write a balanced equation for the complete combustion of hexane, C₆H₁₄, using whole-number coefficients. [1]\n\n(b) A sample of ${m.toFixed(2)} g of hexane burns completely. Calculate the volume of oxygen consumed at STP and the mass of carbon dioxide produced. (C = 12, H = 1, O = 16; molar volume ${MV} L) [2]\n\n(c) When hexane burns in a poor supply of air, carbon monoxide and soot may form. Write one equation for the formation of carbon monoxide and say why it is dangerous. [2]`,
    model: r`(a) $\ce{2C6H14 + 19O2 -> 12CO2 + 14H2O}$. (b) $n(\text{C}_6\text{H}_{14}) = 4.30 \div 86 = 0.0500$ mol; $n(\text{O}_2) = 9.5 \times 0.0500 = 0.475$ mol, so $V = 0.475 \times 22.4 = 10.6$ L; $n(\text{CO}_2) = 6 \times 0.0500 = 0.300$ mol, so mass $= 0.300 \times 44 = 13.2$ g. (c) For example $\ce{2C6H14 + 13O2 -> 12CO + 14H2O}$. Carbon monoxide is a colourless, odourless gas that binds to haemoglobin in blood more strongly than oxygen does, so it prevents oxygen transport and is poisonous.`,
    sol: 'Equation; oxygen 10.6 L and CO₂ 13.2 g; carbon monoxide.',
    scheme: [['(a) balanced equation', 1], ['(b) oxygen volume', 1], ['(b) carbon dioxide mass', 1], ['(c) equation for carbon monoxide', 1], ['(c) binds haemoglobin, so poisonous', 1]],
    d: 3, c: 'application', t: [5],
  }), () => near(vO2, 10.64, 0.001) && near(mCO2, 13.2, 0.001) || 'comb');
}
add('react-long', long({
  stem: '(a) Write equations, with conditions, for (i) the aromatisation of heptane and (ii) the isomerisation of n-pentane to 2-methylbutane. [3]\n\n(b) Name the process in which a large alkane such as hexadecane breaks into smaller molecules on strong heating in the absence of air, give one equation and state one industrial use of the products. [2]',
  model: r`(a) (i) $\ce{CH3(CH2)5CH3 ->[Cr2O3/Al2O3][773 K, 10-20 atm] C6H5CH3 + 4H2}$ (methylbenzene). (ii) $\ce{CH3CH2CH2CH2CH3 ->[AlCl3/HCl][573 K] CH3CH2CH(CH3)2}$. (b) Pyrolysis (cracking): $\ce{C16H34 -> C8H18 + C8H16}$. Products: petrol-range alkanes as fuel, or alkenes as raw material for plastics.`,
  sol: 'Aromatisation; isomerisation; cracking.',
  scheme: [['(a)(i) equation with conditions', 1.5], ['(a)(ii) equation with conditions', 1.5], ['(b) pyrolysis equation', 1], ['(b) one use', 1]].map(([a, b]) => [a, b]).slice(0, 4),
  d: 3, c: 'application', t: [5],
}));

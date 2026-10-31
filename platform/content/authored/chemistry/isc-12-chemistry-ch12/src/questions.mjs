// ISC 12 Chemistry ch12 Haloalkanes — question bank (ISC style). Stems name their own compounds and data.
// MCQ keys are placed by the builder; AR keys planned: a d c a b. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, names, C–X bond
add('classify-mcq', mcq({
  stem: 'Neopentyl bromide, (CH₃)₃CCH₂Br, is classified as a:',
  right: 'primary alkyl halide',
  wrong: ['secondary alkyl halide', 'tertiary alkyl halide', 'allylic halide'],
  sol: 'The CH₂Br carbon is joined to only one other carbon — option (@K), although it is very crowded.',
  d: 2, c: 'application', t: [1],
}));
add('iupac-mcq', mcq({
  stem: 'The IUPAC name of isopentyl bromide, (CH₃)₂CHCH₂CH₂Br, is:',
  right: '1-bromo-3-methylbutane',
  wrong: ['4-bromo-2-methylbutane', '1-bromo-2-methylbutane', '2-methyl-4-bromobutane'],
  sol: 'Number from the end nearer the substituents giving the lowest set {1,3}; prefixes alphabetical — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bond-mcq', mcq({
  stem: 'Among the halomethanes CH₃F, CH₃Cl, CH₃Br and CH₃I, which carbon–halogen bond is the longest and weakest?',
  right: 'C–I in CH₃I',
  wrong: ['C–F in CH₃F', 'C–Cl in CH₃Cl', 'C–Br in CH₃Br'],
  sol: 'Bond length rises and bond enthalpy falls from F to I (C–I about 214 pm, 234 kJ mol⁻¹) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('allyl-tf', tf({
  stem: '3-Bromoprop-1-ene, CH₂=CHCH₂Br, is a vinylic halide.',
  key: 'f',
  sol: 'False. Bromine is on the sp³ carbon next to the double bond: an allylic halide.',
  d: 1, c: 'understanding', t: [1],
}));
add('isomers-fill', fill({
  stem: 'The number of structural isomers of the monochlorobutane C₄H₉Cl is ___.',
  acc: [['4', 'four']],
  sol: '**4**: 1-chlorobutane, 2-chlorobutane, 1-chloro-2-methylpropane and 2-chloro-2-methylpropane.',
  d: 3, c: 'application', t: [1],
}));
add('name-match', match({
  stem: 'Match each common name with the IUPAC name of the same compound.',
  pairs: [
    ['Isopropyl bromide', '2-Bromopropane'],
    ['tert-Butyl chloride', '2-Chloro-2-methylpropane'],
    ['Iodoform', 'Triiodomethane'],
    ['Methylene chloride', 'Dichloromethane'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Isopropyl bromide = 2-bromopropane; tert-butyl chloride = 2-chloro-2-methylpropane; iodoform = triiodomethane; methylene chloride = dichloromethane.',
  d: 1, c: 'recall', t: [1],
}));
add('name-short', short({
  marks: 2,
  stem: 'Give the IUPAC names of (a) CH₃CHBrCH(CH₃)₂ and (b) (CH₃)₂CClCH₂CH₃, and classify each as primary, secondary or tertiary.',
  model: '(a) 2-Bromo-3-methylbutane: the C–Br carbon has two carbon neighbours — secondary. (b) 2-Chloro-2-methylbutane: the C–Cl carbon has three carbon neighbours — tertiary.',
  sol: '2°; 3°.',
  scheme: [['(a) Name and 2°', 1], ['(b) Name and 3°', 1]],
  d: 2, c: 'application', t: [1],
}));
add('isomers-short3', short({
  marks: 3,
  stem: 'Write the structures and IUPAC names of all the structural isomers of C₄H₉Br, and classify each as primary, secondary or tertiary.',
  model: 'CH₃CH₂CH₂CH₂Br, 1-bromobutane (1°); CH₃CH₂CHBrCH₃, 2-bromobutane (2°); (CH₃)₂CHCH₂Br, 1-bromo-2-methylpropane (1°); (CH₃)₃CBr, 2-bromo-2-methylpropane (3°).',
  sol: 'Four isomers: 1°, 2°, 1°, 3°.',
  scheme: [['Four structures', 1], ['Four names', 1], ['Classification', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('prep-mcq', mcq({
  stem: 'Silver propanoate, CH₃CH₂COOAg, is heated with bromine in tetrachloromethane. The organic product is:',
  right: 'bromoethane',
  wrong: ['1-bromopropane', '2-bromopropanoic acid', 'bromomethane'],
  sol: 'Hunsdiecker reaction: CO₂ is lost, so the product has one carbon fewer — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('markov-mcq', mcq({
  stem: 'Hydrogen chloride adds to 2-methylpropene, (CH₃)₂C=CH₂. The main product is:',
  right: '2-chloro-2-methylpropane',
  wrong: ['1-chloro-2-methylpropane', '1-chlorobutane', '2-chlorobutane'],
  sol: 'Markovnikov: H goes to the CH₂ end, Cl to the carbon giving the more stable tertiary carbocation — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('swarts-mcq', mcq({
  stem: 'Heating bromoethane with mercury(I) fluoride, Hg₂F₂, to give fluoroethane is an example of the:',
  right: 'Swarts reaction',
  wrong: ['Finkelstein reaction', 'Hunsdiecker reaction', 'Wurtz reaction'],
  sol: 'Metal fluorides replace Cl or Br by F — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('pbr3-mcq', mcq({
  stem: 'Ethanol is warmed with red phosphorus and bromine. The organic product is:',
  right: 'bromoethane, formed by PBr₃ generated in situ',
  wrong: ['ethene, formed by dehydration', '1,2-dibromoethane, formed by addition', 'ethyl phosphate'],
  sol: '2P + 3Br₂ → 2PBr₃; 3C₂H₅OH + PBr₃ → 3C₂H₅Br + H₃PO₃ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('zncl2-mcq', mcq({
  stem: 'Anhydrous zinc chloride is needed when hydrogen chloride converts propan-1-ol into 1-chloropropane because it:',
  right: 'acts as a Lewis acid that helps the C–O bond break',
  wrong: ['removes the chloride ions from solution', 'oxidises the alcohol to an aldehyde', 'acts as a source of chloride ions only'],
  sol: 'ZnCl₂ coordinates to the oxygen, making the –OH a better leaving group — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('finkel-ar', ar({
  a: 'Stirring 1-chlorobutane with sodium iodide in dry acetone gives 1-iodobutane in high yield.',
  r: 'Sodium chloride is insoluble in dry acetone, so it precipitates and is removed from the equilibrium.',
  key: 'a',
  sol: 'Both are true, and the precipitation of NaCl drives the reaction forward — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('hunsd-tf', tf({
  stem: 'In the Hunsdiecker reaction, the bromoalkane formed has the same number of carbon atoms as the carboxylic acid used.',
  key: 'f',
  sol: 'False. One carbon is lost as CO₂, so the bromoalkane has one carbon fewer.',
  d: 1, c: 'understanding', t: [2],
}));
add('hunsd-num', num({
  marks: 2,
  stem: r`What mass of bromoethane ($M = 109$) is formed from $3.62\ \text{g}$ of silver propanoate ($M = 181$) by the Hunsdiecker reaction, assuming complete conversion?`,
  value: 2.18, tol: 0.01, unit: 'g',
  sol: r`$n = 3.62 \div 181 = 0.0200\ \text{mol}$; 1 : 1 ratio, so mass of bromoethane $= 0.0200 \times 109 = 2.18\ \text{g}$.`,
  scheme: [['0.0200 mol', 1], ['2.18 g', 1]],
  d: 3, c: 'application', t: [2],
}), () => near((3.62 / 181) * 109, 2.18) || 'mass');
add('socl2-num', num({
  marks: 2,
  stem: r`$0.10\ \text{mol}$ of ethanol reacts completely with thionyl chloride: $\ce{C2H5OH + SOCl2 -> C2H5Cl + SO2 + HCl}$. Calculate the total volume of gaseous by-products at STP, in litres. (Molar volume $22.4\ \text{L}$)`,
  value: 4.48, tol: 0.02, unit: 'L',
  sol: r`Gaseous by-products: 0.10 mol SO₂ + 0.10 mol HCl = 0.20 mol; $V = 0.20 \times 22.4 = 4.48\ \text{L}$.`,
  scheme: [['0.20 mol gas', 1], ['4.48 L', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(0.2 * 22.4, 4.48) || 'v');
add('socl2-short', short({
  marks: 2,
  stem: 'Write the equation for the reaction of propan-2-ol with thionyl chloride, and give the reason this reagent is preferred for preparing pure 2-chloropropane.',
  model: r`$\ce{(CH3)2CHOH + SOCl2 -> (CH3)2CHCl + SO2 + HCl}$. Both by-products, SO₂ and HCl, are gases that escape from the mixture, so the chloroalkane is left almost pure without separation.`,
  sol: 'Equation; gaseous by-products.',
  scheme: [['Equation', 1], ['Gaseous by-products', 1]],
  d: 2, c: 'application', t: [2],
}));
add('hunsd-short', short({
  marks: 2,
  stem: 'What is the Hunsdiecker reaction? Write the equation for the reaction starting from silver ethanoate.',
  model: r`The silver salt of a carboxylic acid is heated with bromine in CCl₄; CO₂ is lost and a bromoalkane with one carbon fewer is formed. $\ce{CH3COOAg + Br2 ->[CCl4] CH3Br + CO2 + AgBr}$.`,
  sol: 'Definition; bromomethane.',
  scheme: [['Definition', 1], ['Equation', 1]],
  d: 2, c: 'application', t: [2],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Write equations, with conditions, for preparing (a) 2-bromobutane from but-1-ene, (b) 1-iodopropane from 1-chloropropane and (c) fluoroethane from bromoethane. Name reactions (b) and (c).',
  model: r`(a) $\ce{CH3CH2CH=CH2 + HBr -> CH3CH2CHBrCH3}$ (Markovnikov, no peroxide). (b) $\ce{CH3CH2CH2Cl + NaI ->[dry acetone] CH3CH2CH2I + NaCl}$ — Finkelstein. (c) $\ce{CH3CH2Br + AgF -> CH3CH2F + AgBr}$ — Swarts.`,
  sol: 'Markovnikov; Finkelstein; Swarts.',
  scheme: [['(a)', 1], ['(b) with name', 1], ['(c) with name', 1]],
  d: 2, c: 'application', t: [2],
}));
add('markov-short3', short({
  marks: 3,
  stem: '2-Methylpropene reacts with HBr (a) in the dark without peroxide and (b) in the presence of benzoyl peroxide. Name the main product in each case, explain the difference, and state whether HCl shows the same effect.',
  model: '(a) 2-Bromo-2-methylpropane (Markovnikov addition via the more stable tertiary carbocation). (b) 1-Bromo-2-methylpropane (anti-Markovnikov, Kharasch or peroxide effect: a free-radical mechanism in which Br• adds to the CH₂ end to give the more stable tertiary radical). HCl does not show the peroxide effect.',
  sol: 'Markovnikov vs anti-Markovnikov; only HBr.',
  scheme: [['(a) Product and reason', 1], ['(b) Product and reason', 1], ['HCl: no peroxide effect', 1]],
  d: 4, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 physical properties
add('bp-mcq', mcq({
  stem: 'Of the four haloethanes C₂H₅F, C₂H₅Cl, C₂H₅Br and C₂H₅I, the one with the highest boiling point is:',
  right: 'C₂H₅I',
  wrong: ['C₂H₅F', 'C₂H₅Cl', 'C₂H₅Br'],
  sol: 'Largest, most polarisable molecule, strongest van der Waals forces — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('sol-mcq', mcq({
  stem: 'Bromoethane is only slightly soluble in water although its molecules are polar. This is because:',
  right: 'the energy released in forming attractions with water is less than that needed to break water’s hydrogen bonds',
  wrong: ['bromoethane reacts with water at once', 'bromoethane molecules are non-polar', 'bromoethane forms strong hydrogen bonds with itself'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('branch-mcq', mcq({
  stem: 'Which C₅H₁₁Br isomer has the lowest boiling point?',
  right: '2-Bromo-2-methylbutane',
  wrong: ['1-Bromopentane', '2-Bromopentane', '3-Bromopentane'],
  sol: 'Most branched, most compact, smallest surface area — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('bp-short', short({
  marks: 2,
  stem: 'Explain why 1-bromobutane (b.p. 375 K) boils at a higher temperature than its isomer 2-bromo-2-methylpropane (b.p. 346 K).',
  model: 'Both have the same molar mass. 1-Bromobutane is an unbranched chain with a large surface area, so its molecules have stronger van der Waals forces between them. 2-Bromo-2-methylpropane is highly branched and nearly spherical, with a smaller contact area and weaker attractions, so it boils lower.',
  sol: 'Branching reduces surface area and van der Waals forces.',
  scheme: [['Same mass; branching', 1], ['Surface area and forces', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 SN1 / SN2 and optical rotation
add('mech-mcq', mcq({
  stem: 'Optically active (S)-2-bromobutane is treated with a high concentration of OH⁻ in a polar aprotic solvent, and reacts by the SN2 mechanism. The product is:',
  right: '(R)-butan-2-ol, optically active, formed with inversion of configuration',
  wrong: ['racemic butan-2-ol, optically inactive', '(S)-butan-2-ol formed with retention', 'but-2-ene only'],
  sol: 'Backside attack inverts the configuration (Walden inversion) — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('rate-mcq', mcq({
  stem: 'The rate of hydrolysis of 2-chloro-2-methylpropane in aqueous ethanol does not change when the concentration of hydroxide ions is doubled. This shows that the reaction:',
  right: 'is SN1, with the slow step involving only the haloalkane',
  wrong: ['is SN2, with both reactants in the slow step', 'does not involve a carbocation', 'is zero order in the haloalkane'],
  sol: 'Rate = k[RX], independent of [OH⁻] — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('order-mcq', mcq({
  stem: 'Arrange (CH₃)₃CBr, CH₃CH₂Br, CH₃Br and (CH₃)₂CHBr in increasing order of reactivity by the SN2 mechanism.',
  right: '(CH₃)₃CBr < (CH₃)₂CHBr < CH₃CH₂Br < CH₃Br',
  wrong: ['CH₃Br < CH₃CH₂Br < (CH₃)₂CHBr < (CH₃)₃CBr', '(CH₃)₂CHBr < (CH₃)₃CBr < CH₃Br < CH₃CH₂Br', 'CH₃CH₂Br < CH₃Br < (CH₃)₃CBr < (CH₃)₂CHBr'],
  sol: 'Steric hindrance increases from methyl to tertiary — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('racem-mcq', mcq({
  stem: 'Why does SN1 hydrolysis of an optically active tertiary chloride give a nearly racemic alcohol?',
  right: 'The planar carbocation intermediate is attacked about equally from both faces',
  wrong: ['The nucleophile always attacks from the back', 'The C–Cl bond never fully breaks', 'Tertiary alcohols cannot be chiral'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('benzyl-mcq', mcq({
  stem: 'Benzyl chloride, C₆H₅CH₂Cl, is hydrolysed by the SN1 route much faster than 1-chloropropane. The reason is that:',
  right: 'the benzyl carbocation is stabilised by resonance with the benzene ring',
  wrong: ['the C–Cl bond in benzyl chloride is stronger', 'benzyl chloride is a tertiary halide', 'the benzene ring blocks attack by water'],
  sol: 'Delocalisation of the positive charge into the ring — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('sn2-ar', ar({
  a: '2-Bromo-2-methylpropane reacts faster than bromomethane by the SN2 mechanism.',
  r: 'Three methyl groups hinder the backside approach of the nucleophile in 2-bromo-2-methylpropane.',
  key: 'd',
  sol: 'A is false: bromomethane reacts much faster by SN2. R is true — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('sn1-ar', ar({
  a: 'SN1 reactions of tertiary halides are favoured by polar protic solvents such as water.',
  r: 'SN1 reactions follow second-order kinetics.',
  key: 'c',
  sol: 'A is true (the solvent stabilises the ions). R is false: SN1 is first order, rate = k[RX] — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('chiral-tf', tf({
  stem: '1-Bromobutane is optically active.',
  key: 'f',
  sol: 'False. No carbon in 1-bromobutane carries four different groups.',
  d: 1, c: 'understanding', t: [4],
}));
add('walden-fill', fill({
  stem: 'The inversion of configuration at carbon that accompanies an SN2 reaction is called ___ inversion.',
  acc: [['Walden']],
  sol: '**Walden** inversion.',
  d: 1, c: 'recall', t: [4],
}));
add('rate-num', num({
  marks: 2,
  stem: r`For the SN2 reaction of 1-bromopropane with hydroxide ions, the initial rate is $2.0 \times 10^{-4}\ \text{mol L}^{-1}\ \text{s}^{-1}$ when $[\text{RBr}] = [\ce{OH-}] = 0.10\ \text{mol L}^{-1}$. Calculate the rate constant in L mol⁻¹ s⁻¹.`,
  value: 0.02, tol: 0.0002, unit: 'L mol⁻¹ s⁻¹',
  sol: r`Rate $= k[\text{RBr}][\ce{OH-}]$, so $k = 2.0 \times 10^{-4} \div (0.10 \times 0.10) = 0.020\ \text{L mol}^{-1}\ \text{s}^{-1}$.`,
  scheme: [['Rate law', 1], ['k = 0.020', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(2e-4 / 0.01, 0.02) || 'k');
add('sn2-short', short({
  marks: 2,
  stem: 'The reaction of hydroxide ions with 1-chlorobutane is second order, but 2-chloro-2-methylpropane hardly reacts by this route. Explain both observations.',
  model: 'With 1-chlorobutane the reaction is SN2: one step in which OH⁻ attacks the carbon from the back as Cl⁻ leaves, so both species are in the rate-determining step: rate = k[RCl][OH⁻]. In 2-chloro-2-methylpropane the three methyl groups block backside approach (steric hindrance), so SN2 is very slow; it reacts instead by SN1.',
  sol: 'One step, both species; steric hindrance.',
  scheme: [['SN2 and second-order rate law', 1], ['Steric hindrance for 3°', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('sn1-short3', short({
  marks: 3,
  stem: 'Describe the SN1 mechanism for the hydrolysis of 2-bromo-2-methylpropane in aqueous acetone. Give the rate law and explain why tertiary halides favour this mechanism.',
  model: r`Step 1 (slow): $\ce{(CH3)3CBr -> (CH3)3C+ + Br-}$, forming a planar tertiary carbocation. Step 2 (fast): $\ce{(CH3)3C+ + H2O -> (CH3)3COH + H+}$ (or OH⁻ attack). Rate = k[(CH₃)₃CBr], first order. Three alkyl groups stabilise the carbocation by their +I effect (and hyperconjugation) and hinder backside attack, so SN1 is favoured.`,
  sol: 'Two steps; rate = k[RBr]; stable 3° carbocation.',
  scheme: [['Two steps', 1], ['Rate law', 1], ['Stability of 3° carbocation', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('stereo-short3', short({
  marks: 3,
  stem: 'Compare the stereochemical outcome when (a) optically active 2-bromooctane reacts with concentrated NaOH in acetone by SN2 and (b) optically active 3-chloro-3-methylheptane is hydrolysed in water by SN1. Explain each.',
  model: '(a) Inversion of configuration: the nucleophile attacks from the side opposite Br, so the product is optically active with the opposite configuration. (b) Racemisation (mostly): the planar carbocation is attacked from either face about equally, giving nearly equal amounts of both enantiomers, so the product is largely optically inactive.',
  sol: 'Inversion; racemisation.',
  scheme: [['(a) Inversion', 1], ['(b) Racemisation', 1], ['Explanations', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 substitution with nucleophiles
add('nuc-mcq', mcq({
  stem: '2-Bromopropane is heated with ethanolic potassium nitrite. The main organic product is:',
  right: 'propan-2-yl nitrite, (CH₃)₂CH–O–N=O',
  wrong: ['2-nitropropane, (CH₃)₂CH–NO₂', 'propan-2-ol', 'propanenitrile'],
  sol: 'Ionic KNO₂: the oxygen end attacks, giving an alkyl nitrite — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('kcn-mcq', mcq({
  stem: 'Which reagent converts 1-chlorobutane into a compound containing five carbon atoms?',
  right: 'Ethanolic KCN',
  wrong: ['Aqueous KOH', 'NaI in acetone', 'LiAlH₄'],
  sol: 'Substitution by CN⁻ gives pentanenitrile — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('nh3-mcq', mcq({
  stem: '1-Bromobutane is heated with excess alcoholic ammonia in a sealed tube. The main product is:',
  right: 'butan-1-amine',
  wrong: ['butan-1-ol', 'but-1-ene', 'butanenitrile'],
  sol: 'NH₃ substitutes Br; excess NH₃ limits further alkylation — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('kcn-ar', ar({
  a: 'Haloalkanes give alkyl cyanides with KCN but alkyl isocyanides with AgCN.',
  r: 'KCN is ionic, so the more nucleophilic carbon end of CN⁻ attacks; AgCN is largely covalent, so only the nitrogen lone pair is free to attack.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('nitrile-fill', fill({
  stem: 'Bromoethane heated with ethanolic potassium cyanide gives CH₃CH₂CN, whose IUPAC name is propane___.',
  acc: [['nitrile']],
  sol: 'Propane**nitrile**.',
  d: 1, c: 'recall', t: [5],
}));
add('reag-match', match({
  stem: 'Match each reagent used on 1-iodobutane with the type of product formed.',
  pairs: [
    ['AgNO₂', 'Nitroalkane'],
    ['KNO₂', 'Alkyl nitrite'],
    ['AgCN', 'Isocyanide'],
    ['CH₃COOAg', 'Ester'],
  ],
  order: [3, 1, 0, 2],
  sol: 'AgNO₂ → nitroalkane; KNO₂ → alkyl nitrite; AgCN → isocyanide; CH₃COOAg → ester (butyl ethanoate).',
  d: 2, c: 'application', t: [5],
}));
add('kcn-num', num({
  marks: 2,
  stem: r`$10.9\ \text{g}$ of bromoethane ($M = 109$) is heated with excess ethanolic KCN. If the yield is 80%, what mass of propanenitrile ($M = 55$) is obtained?`,
  value: 4.4, tol: 0.02, unit: 'g',
  sol: r`$n = 10.9 \div 109 = 0.100\ \text{mol}$; theoretical mass $= 0.100 \times 55 = 5.5\ \text{g}$; actual $= 5.5 \times 0.80 = 4.4\ \text{g}$.`,
  scheme: [['Theoretical 5.5 g', 1], ['4.4 g', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(0.1 * 55 * 0.8, 4.4) || 'mass');
add('kno2-short', short({
  marks: 2,
  stem: 'Name the products formed when 1-chloropropane reacts with (a) KNO₂ and (b) AgNO₂, and explain why they differ.',
  model: '(a) Propyl nitrite, CH₃CH₂CH₂–O–N=O. (b) 1-Nitropropane, CH₃CH₂CH₂–NO₂. Nitrite is ambident: in ionic KNO₂ the negatively charged oxygen attacks; in covalent AgNO₂ the oxygen is bonded to silver and the nitrogen lone pair attacks.',
  sol: 'Nitrite ester vs nitroalkane; ambident ion.',
  scheme: [['Two products', 1], ['Ambident explanation', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('nuc-short3', short({
  marks: 3,
  stem: 'Name the organic product when 2-bromobutane reacts with (a) aqueous KOH, (b) NaI in dry acetone and (c) LiAlH₄.',
  model: '(a) Butan-2-ol (substitution of Br by OH). (b) 2-Iodobutane (Finkelstein exchange). (c) Butane (Br replaced by H).',
  sol: 'Butan-2-ol; 2-iodobutane; butane.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 elimination, Wurtz, Grignard
add('elim-mcq', mcq({
  stem: 'Heating 3-bromo-2-methylpentane, CH₃CH(CH₃)CHBrCH₂CH₃, with ethanolic KOH gives mainly:',
  right: '2-methylpent-2-ene',
  wrong: ['4-methylpent-2-ene', '2-methylpent-1-ene', '3-methylpentan-2-ol'],
  sol: 'Removing H from C-2 gives the trisubstituted alkene (Saytzeff product) — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('wurtz-mcq', mcq({
  stem: '1-Bromopropane is treated with sodium metal in dry ether. The hydrocarbon formed is:',
  right: 'hexane',
  wrong: ['propane', 'propene', 'butane'],
  sol: '2C₃H₇Br + 2Na → C₆H₁₄ + 2NaBr — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('grig-mcq', mcq({
  stem: 'Propylmagnesium bromide, CH₃CH₂CH₂MgBr, is added to water. The organic product is:',
  right: 'propane',
  wrong: ['propan-1-ol', 'propene', 'hexane'],
  sol: 'RMgX + H₂O → RH + Mg(OH)X — option (@K).',
  d: 1, c: 'application', t: [6],
}));
add('aqalc-mcq', mcq({
  stem: '2-Bromopropane is heated separately with aqueous KOH and with alcoholic KOH. The main products are, respectively:',
  right: 'propan-2-ol and propene',
  wrong: ['propene and propan-2-ol', 'propan-1-ol and propene', 'propan-2-ol in both cases'],
  sol: 'Aqueous: substitution; alcoholic: elimination — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('elim-ar', ar({
  a: 'Alcoholic KOH converts 2-bromobutane mainly into but-2-ene.',
  r: 'But-2-ene is a gas at room temperature.',
  key: 'b',
  sol: 'Both are true, but A is explained by Saytzeff’s rule (the more substituted alkene is favoured), not by the physical state of the product — option (b).',
  d: 2, c: 'understanding', t: [6],
}));
add('saytz-tf', tf({
  stem: 'According to Saytzeff’s rule, the less substituted alkene is the major product of dehydrohalogenation.',
  key: 'f',
  sol: 'False. The more substituted (more alkylated) alkene is the major product.',
  d: 1, c: 'recall', t: [6],
}));
add('grig-fill', fill({
  stem: 'Ethylmagnesium iodide is prepared by adding iodoethane to magnesium turnings in dry ___ (the usual solvent).',
  acc: [['ether', 'diethyl ether', 'ethoxyethane']],
  sol: 'Dry **ether** (ethoxyethane).',
  d: 1, c: 'recall', t: [6],
}));
add('wurtz-num', num({
  marks: 2,
  stem: r`$0.30\ \text{mol}$ of 1-bromopropane reacts completely with sodium in dry ether. What mass of hexane ($M = 86$) forms?`,
  value: 12.9, tol: 0.05, unit: 'g',
  sol: r`$\ce{2C3H7Br + 2Na -> C6H14 + 2NaBr}$: $n(\text{hexane}) = 0.30 \div 2 = 0.15\ \text{mol}$; mass $= 0.15 \times 86 = 12.9\ \text{g}$.`,
  scheme: [['0.15 mol', 1], ['12.9 g', 1]],
  d: 2, c: 'application', t: [6],
}), () => near(0.15 * 86, 12.9) || 'mass');
add('saytz-short', short({
  marks: 2,
  stem: 'State Saytzeff’s rule and apply it to the dehydrobromination of 2-bromopentane with alcoholic KOH.',
  model: 'In dehydrohalogenation, the alkene with more alkyl groups on the double-bonded carbons (the more substituted alkene) is the major product. 2-Bromopentane gives pent-2-ene (major) and pent-1-ene (minor).',
  sol: 'Rule; pent-2-ene major.',
  scheme: [['Rule', 1], ['Pent-2-ene major', 1]],
  d: 2, c: 'application', t: [6],
}));
add('elim-short3', short({
  marks: 3,
  stem: '2-Chloro-3-methylbutane is heated with alcoholic KOH. (a) Write the structures and names of the two possible alkenes. (b) Which is the major product, and why? (c) Why do tertiary halides tend to undergo elimination rather than substitution with strong bases?',
  model: '(a) (CH₃)₂C=CHCH₃, 2-methylbut-2-ene; and (CH₃)₂CHCH=CH₂, 3-methylbut-1-ene. (b) 2-Methylbut-2-ene: it is trisubstituted, more stable (Saytzeff). (c) The crowded carbon hinders nucleophilic attack, but the many β-hydrogens are easily removed by a base; the more substituted alkene formed is stable.',
  sol: 'Two alkenes; trisubstituted major; steric hindrance.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [6],
}));

// ---------------------------------------------------------------- t07 chloroform, iodoform, others
add('poly-mcq', mcq({
  stem: 'Which of these gives a yellow precipitate when warmed with iodine and sodium hydroxide solution?',
  right: 'Propan-2-ol',
  wrong: ['Methanol', 'Propan-1-ol', 'Methanal'],
  sol: 'Propan-2-ol has a CH₃CH(OH)– group (iodoform test positive) — option (@K).',
  d: 2, c: 'application', t: [7],
}));
add('picrin-mcq', mcq({
  stem: 'Chloroform reacts with concentrated nitric acid to give a tear gas used as an insecticide. This product is:',
  right: 'chloropicrin, CCl₃NO₂',
  wrong: ['phosgene, COCl₂', 'nitromethane, CH₃NO₂', 'tetrachloromethane, CCl₄'],
  sol: 'CHCl₃ + HNO₃ → CCl₃NO₂ + H₂O — option (@K).',
  d: 2, c: 'recall', t: [7],
}));
add('ccl4-mcq', mcq({
  stem: 'Tetrachloromethane is non-polar although each C–Cl bond is polar. This is because:',
  right: 'its regular tetrahedral shape makes the four bond dipoles cancel',
  wrong: ['carbon and chlorine have the same electronegativity', 'it has a lone pair on carbon', 'its C–Cl bonds are ionic'],
  sol: 'Symmetrical tetrahedron; net dipole zero — option (@K).',
  d: 2, c: 'understanding', t: [7],
}));
add('koh-mcq', mcq({
  stem: 'Chloroform is boiled with aqueous potassium hydroxide. The organic product is:',
  right: 'potassium methanoate, HCOOK',
  wrong: ['methanol', 'potassium ethanoate', 'dichloromethane'],
  sol: 'CHCl₃ + 4KOH → HCOOK + 3KCl + 2H₂O — option (@K).',
  d: 2, c: 'recall', t: [7],
}));
add('iodo-tf', tf({
  stem: 'Methanol gives a positive iodoform test.',
  key: 'f',
  sol: 'False. Methanol has no CH₃CH(OH)– or CH₃CO– group.',
  d: 1, c: 'understanding', t: [7],
}));
add('phosgene-fill', fill({
  stem: 'In light, chloroform is slowly oxidised by air to the poisonous gas COCl₂, commonly called ___.',
  acc: [['phosgene', 'carbonyl chloride']],
  sol: '**Phosgene** (carbonyl chloride).',
  d: 1, c: 'recall', t: [7],
}));
add('iodo-num', num({
  marks: 2,
  stem: r`$1.16\ \text{g}$ of acetone ($M = 58$) is warmed with excess iodine and NaOH: $\ce{CH3COCH3 + 3I2 + 4NaOH -> CHI3 + CH3COONa + 3NaI + 3H2O}$. What mass of iodoform ($M = 394$) forms, assuming complete reaction?`,
  value: 7.88, tol: 0.03, unit: 'g',
  sol: r`$n = 1.16 \div 58 = 0.0200\ \text{mol}$; 1 : 1, so mass $= 0.0200 \times 394 = 7.88\ \text{g}$.`,
  scheme: [['0.0200 mol', 1], ['7.88 g', 1]],
  d: 2, c: 'application', t: [7],
}), () => near((1.16 / 58) * 394, 7.88) || 'mass');
add('iodo-short', short({
  marks: 2,
  stem: 'What is the iodoform test? Which of ethanol, methanol, propan-2-ol and propanal give a positive result?',
  model: 'Warming a compound with iodine and NaOH (or Na₂CO₃) gives a yellow precipitate of iodoform, CHI₃, if it contains CH₃CO– or CH₃CH(OH)–. Positive: ethanol and propan-2-ol. Negative: methanol and propanal.',
  sol: 'Yellow CHI₃; ethanol and propan-2-ol.',
  scheme: [['Test described', 1], ['Correct compounds', 1]],
  d: 2, c: 'application', t: [7],
}));
add('ccl4-short', short({
  marks: 2,
  stem: 'Explain why tetrachloromethane, though unreactive at ground level, harms the ozone layer.',
  model: 'CCl₄ is very stable and unreactive in the lower atmosphere, so it is not broken down there and slowly diffuses into the stratosphere. There, ultraviolet light breaks C–Cl bonds, releasing chlorine atoms that catalyse the destruction of ozone (Cl• + O₃ → ClO• + O₂).',
  sol: 'Stable; reaches stratosphere; UV releases Cl•.',
  scheme: [['Stability; reaches stratosphere', 1], ['Cl atoms destroy ozone', 1]],
  d: 3, c: 'understanding', t: [7],
}));
add('chcl3-short3', short({
  marks: 3,
  stem: 'Write balanced equations for (a) the preparation of chloroform from acetone using bleaching powder (shown as Cl₂ and Ca(OH)₂), (b) the reaction of chloroform with concentrated nitric acid and (c) the reaction of chloroform with silver powder on heating.',
  model: r`(a) $\ce{CH3COCH3 + 3Cl2 -> CCl3COCH3 + 3HCl}$; $\ce{2CCl3COCH3 + Ca(OH)2 -> 2CHCl3 + (CH3COO)2Ca}$. (b) $\ce{CHCl3 + HNO3 -> CCl3NO2 + H2O}$ (chloropicrin). (c) $\ce{2CHCl3 + 6Ag -> C2H2 + 6AgCl}$ (ethyne).`,
  sol: 'Three sets of equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [7],
}));

// ---------------------------------------------------------------- long answers
add('nameprep-long', long({
  stem: '(a) Give the IUPAC name and classify each of: (CH₃)₂CHCH₂Cl, CH₃CH₂CBr(CH₃)₂ and BrCH₂CH=CH₂. [1½]\n\n(b) Write equations to prepare 1-bromobutane from (i) but-1-ene, (ii) butan-1-ol and (iii) silver pentanoate. [2]\n\n(c) Using bond data (C–Cl 351, C–Br 293, C–I 234 kJ mol⁻¹), explain the order of reactivity of haloalkanes RCl, RBr and RI. [1½]',
  model: r`(a) 1-Chloro-2-methylpropane (1°); 2-bromo-2-methylbutane (3°); 3-bromoprop-1-ene (allylic).

(b) (i) $\ce{CH3CH2CH=CH2 + HBr ->[peroxide] CH3CH2CH2CH2Br}$. (ii) $\ce{3CH3CH2CH2CH2OH + PBr3 -> 3CH3CH2CH2CH2Br + H3PO3}$. (iii) $\ce{CH3CH2CH2CH2COOAg + Br2 ->[CCl4] CH3CH2CH2CH2Br + CO2 + AgBr}$.

(c) The bond enthalpy falls from C–Cl to C–I, so the C–I bond is broken most easily: reactivity RI > RBr > RCl.`,
  sol: 'Names; three preparations; RI > RBr > RCl.',
  scheme: [['(a)', 1.5], ['(b) Three equations', 2], ['(c) Reactivity from bond enthalpy', 1.5]],
  d: 3, c: 'application', t: [1, 2],
}));
add('sn-long', long({
  stem: '(a) Describe the SN1 mechanism for the hydrolysis of 2-chloro-2-methylpropane, giving the rate law. [2]\n\n(b) What is the stereochemical outcome when an optically active secondary bromide reacts by SN2? Explain. [1½]\n\n(c) Arrange CH₃Br, CH₃CH₂Br, (CH₃)₂CHBr and (CH₃)₃CBr in order of increasing reactivity (i) by SN1 and (ii) by SN2. [1½]',
  model: r`(a) Step 1 (slow): $\ce{(CH3)3CCl -> (CH3)3C+ + Cl-}$. Step 2 (fast): $\ce{(CH3)3C+ + OH- -> (CH3)3COH}$. Rate = k[(CH₃)₃CCl] (first order).

(b) Inversion of configuration (Walden inversion): the nucleophile attacks from the side opposite the leaving bromide; in the transition state the three other groups lie in a plane and then flip over, so the product is optically active with the opposite configuration.

(c) (i) SN1: CH₃Br < CH₃CH₂Br < (CH₃)₂CHBr < (CH₃)₃CBr. (ii) SN2: (CH₃)₃CBr < (CH₃)₂CHBr < CH₃CH₂Br < CH₃Br.`,
  sol: 'Two-step SN1; inversion; opposite orders.',
  scheme: [['(a) Steps', 1], ['(a) Rate law', 1], ['(b) Inversion explained', 1.5], ['(c) Two orders', 1.5]],
  d: 3, c: 'application', t: [4],
}));
add('nuc-long', long({
  stem: '(a) Give the main organic product when chloroethane reacts with (i) KCN, (ii) AgCN, (iii) KNO₂, (iv) AgNO₂ and (v) LiAlH₄. [2½]\n\n(b) Explain why KCN and AgCN give different products. [1½]\n\n(c) Why is excess ammonia used to prepare ethanamine from chloroethane? [1]',
  model: '(a) (i) Propanenitrile, CH₃CH₂CN. (ii) Ethyl isocyanide (isocyanoethane), CH₃CH₂NC. (iii) Ethyl nitrite, CH₃CH₂ONO. (iv) Nitroethane, CH₃CH₂NO₂. (v) Ethane.\n\n(b) CN⁻ is ambident. KCN is ionic, so free CN⁻ attacks through the more nucleophilic carbon, giving a nitrile. AgCN is covalent (Ag–C bond), so only the nitrogen lone pair is available, giving an isocyanide.\n\n(c) The ethanamine formed is itself a nucleophile and can react with more chloroethane to give secondary and tertiary amines and a quaternary salt; a large excess of NH₃ makes reaction with NH₃ much more likely.',
  sol: 'Five products; ambident CN⁻; excess NH₃ limits polyalkylation.',
  scheme: [['(a) Five products', 2.5], ['(b) Ambident explanation', 1.5], ['(c) Polyalkylation', 1]],
  d: 3, c: 'application', t: [5],
}));
add('elim-long', long({
  stem: '(a) 2-Bromo-2-methylpentane is heated with alcoholic KOH. Write the two possible alkenes and identify the major product using Saytzeff’s rule. [2]\n\n(b) State the conditions that favour elimination over substitution. [1]\n\n(c) Starting from 1-bromo-2-methylpropane, write equations for (i) the Wurtz reaction and (ii) the formation of the Grignard reagent and its reaction with water. Name the organic products. [2]',
  model: r`(a) $\ce{(CH3)2C=CHCH2CH3}$, 2-methylpent-2-ene (trisubstituted, major); $\ce{CH2=C(CH3)CH2CH2CH3}$, 2-methylpent-1-ene (disubstituted, minor).

(b) Alcoholic (not aqueous) KOH, strong or bulky base, high temperature, and tertiary or secondary halides.

(c) (i) $\ce{2(CH3)2CHCH2Br + 2Na ->[dry ether] (CH3)2CHCH2CH2CH(CH3)2 + 2NaBr}$: 2,5-dimethylhexane. (ii) $\ce{(CH3)2CHCH2Br + Mg ->[dry ether] (CH3)2CHCH2MgBr}$; $\ce{(CH3)2CHCH2MgBr + H2O -> (CH3)2CHCH3 + Mg(OH)Br}$: 2-methylpropane.`,
  sol: 'Saytzeff; conditions; 2,5-dimethylhexane; 2-methylpropane.',
  scheme: [['(a) Two alkenes and major', 2], ['(b) Conditions', 1], ['(c) Wurtz', 1], ['(c) Grignard', 1]],
  d: 4, c: 'analysis', t: [6],
}));
add('poly-long', long({
  stem: '(a) Write equations for the preparation of chloroform from ethanol and bleaching powder, taking bleaching powder as a source of Cl₂ and Ca(OH)₂. [2]\n\n(b) Write the equation for the iodoform reaction of ethanol and state two observations. [1½]\n\n(c) What are freons? Explain, with equations, how they damage the ozone layer. [1½]',
  model: r`(a) Ethanol is oxidised to ethanal, which is chlorinated and then cleaved: $\ce{CH3CH2OH + Cl2 -> CH3CHO + 2HCl}$; $\ce{CH3CHO + 3Cl2 -> CCl3CHO + 3HCl}$; $\ce{2CCl3CHO + Ca(OH)2 -> 2CHCl3 + (HCOO)2Ca}$.

(b) $\ce{C2H5OH + 4I2 + 6NaOH -> CHI3 + HCOONa + 5NaI + 5H2O}$. Yellow crystalline precipitate; characteristic antiseptic smell.

(c) Freons are chlorofluorocarbons such as CCl₂F₂, once used as refrigerants and propellants. Being inert, they reach the stratosphere, where UV light breaks them: $\ce{CF2Cl2 ->[UV] CF2Cl + Cl}$; the Cl atoms destroy ozone catalytically: $\ce{Cl + O3 -> ClO + O2}$, $\ce{ClO + O -> Cl + O2}$.`,
  sol: 'Three-step preparation; iodoform; CFC chain.',
  scheme: [['(a) Equations', 2], ['(b) Equation and observations', 1.5], ['(c) Freons and ozone', 1.5]],
  d: 3, c: 'application', t: [7],
}));

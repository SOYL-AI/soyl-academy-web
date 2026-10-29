// ch06 Haloalkanes and Haloarenes — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, naming, C–X bond
add('classify-mcq', mcq({
  stem: r`$\ce{CH2=CH-CH2-Br}$ is classified as:`,
  right: 'an allylic halide',
  wrong: ['a vinylic halide', 'a benzylic halide', 'a tertiary alkyl halide'],
  sol: 'Bromine is on an sp³ carbon next to the C=C double bond: allylic — option (@K). A vinylic halide (@1) would have Br on the sp² carbon itself.',
  d: 2, c: 'understanding', t: [1],
}));
add('name-mcq', mcq({
  stem: r`The IUPAC name of $\ce{(CH3)2CHCH2CH(Cl)CH3}$ is:`,
  right: '2-chloro-4-methylpentane',
  wrong: ['4-chloro-2-methylpentane', '2-chloro-4-methylhexane', '1-chloro-1,3-dimethylbutane'],
  sol: 'The longest chain has five carbons. Numbering from either end gives the locants 2 and 4, so the tie is broken alphabetically: chloro comes before methyl and gets the lower number — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('cx-bond-mcq', mcq({
  stem: 'Which of these haloalkanes undergoes nucleophilic substitution most readily, other factors being equal?',
  right: 'Iodoethane',
  wrong: ['Fluoroethane', 'Chloroethane', 'Bromoethane'],
  sol: 'The C–I bond is the longest and weakest (about 234 kJ mol⁻¹), so iodide is the best leaving group — option (@K).',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('vic-gem-tf', tf({
  stem: '1,2-Dibromoethane is a geminal dihalide.',
  key: 'f',
  sol: 'False. The two bromine atoms are on adjacent carbons, so it is a vicinal (vic) dihalide; a geminal dihalide has both on the same carbon, e.g. 1,1-dibromoethane.',
  d: 1, c: 'recall', t: [1],
}));
add('bond-fill', fill({
  stem: 'In a C–X bond, the carbon atom carries a partial ___ charge because the halogen is more electronegative.',
  acc: [['positive', '+']],
  sol: 'Carbon is δ+ (partial **positive**) and the halogen δ−.',
  d: 1, c: 'recall', t: [1],
}));
add('name-match', match({
  stem: 'Match each structure with its IUPAC name.',
  pairs: [
    [r`$\ce{CH2=CHCH2Cl}$`, '3-Chloroprop-1-ene'],
    [r`$\ce{C6H5CH2Cl}$`, '(Chloromethyl)benzene'],
    [r`$\ce{CH3CHCl2}$`, '1,1-Dichloroethane'],
    [r`$\ce{(CH3)3CBr}$`, '2-Bromo-2-methylpropane'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Allyl chloride is 3-chloroprop-1-ene; benzyl chloride is (chloromethyl)benzene; ethylidene chloride is 1,1-dichloroethane; tert-butyl bromide is 2-bromo-2-methylpropane.',
  d: 2, c: 'understanding', t: [1],
}));
add('name-short', short({
  marks: 2,
  stem: 'Draw (or write) the structures of 1-bromo-4-chlorobut-2-ene and 1,4-dibromobenzene, and classify the C–Br bond in each.',
  model: r`1-Bromo-4-chlorobut-2-ene is $\ce{BrCH2-CH=CH-CH2Cl}$: the C–Br carbon is sp³ and next to C=C, so it is an **allylic** halide. 1,4-Dibromobenzene has two Br on opposite carbons of a benzene ring: each C–Br is an **aryl** halide bond (sp² carbon).`,
  sol: 'Write the chain or ring, then check the hybridisation of the carbon bearing Br.',
  scheme: [['First structure and allylic classification', 1], ['Second structure and aryl classification', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('socl2-mcq', mcq({
  stem: 'Which reagent converts ethanol into chloroethane with only gaseous by-products, so that the product is easy to purify?',
  right: 'Thionyl chloride',
  wrong: ['Phosphorus pentachloride', 'Phosphorus trichloride', 'Concentrated HCl with anhydrous ZnCl₂'],
  sol: r`$\ce{C2H5OH + SOCl2 -> C2H5Cl + SO2 + HCl}$: SO₂ and HCl escape as gases — option (@K). PCl₅ leaves POCl₃, PCl₃ leaves H₃PO₃, and Lucas reagent leaves water.`,
  d: 1, c: 'understanding', t: [2],
}));
add('markov-mcq', mcq({
  stem: 'Propene reacts with HBr in the presence of benzoyl peroxide. The main product is:',
  right: '1-bromopropane',
  wrong: ['2-bromopropane', '1,2-dibromopropane', 'propan-2-ol'],
  sol: 'With peroxide, HBr adds anti-Markovnikov (Kharasch effect): Br goes to the terminal carbon — option (@K). Without peroxide, 2-bromopropane (@1) forms.',
  d: 2, c: 'application', t: [2],
}));
add('finkel-mcq', mcq({
  stem: 'In the Finkelstein reaction, chloroethane is converted to iodoethane using sodium iodide in dry acetone. Why does the reaction go almost to completion?',
  right: 'Sodium chloride is insoluble in dry acetone and precipitates, removing a product.',
  wrong: ['Iodide is a weaker nucleophile than chloride.', 'Acetone reacts with chloroethane.', 'The C–I bond is stronger than the C–Cl bond.'],
  sol: 'NaCl precipitates from acetone, so by Le Chatelier’s principle the equilibrium shifts forward — option (@K). The C–I bond is in fact weaker (@3).',
  d: 2, c: 'understanding', t: [2],
}));
add('sandmeyer-mcq', mcq({
  stem: 'Aniline is converted into bromobenzene by:',
  right: 'diazotisation with NaNO₂/HCl at 273–278 K, then warming with CuBr/HBr',
  wrong: ['heating with bromine water', 'heating with HBr and ZnCl₂', 'treating with NaBr in dry acetone'],
  sol: 'Sandmeyer reaction: the diazonium group is replaced by Br using CuBr — option (@K). Bromine water (@1) gives 2,4,6-tribromoaniline.',
  d: 3, c: 'application', t: [2],
}));
add('peroxide-ar', ar({
  a: 'Propene gives 2-bromopropane with HBr, but 1-bromopropane with HBr in the presence of a peroxide.',
  r: 'In the presence of peroxide, HBr adds by a free-radical mechanism in which the more stable secondary radical is formed.',
  key: 'a',
  sol: 'Both are true. The Br· radical adds to the terminal carbon to give the more stable secondary radical, so Br ends up on C1; R explains A — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('prep-match', match({
  stem: 'Match each conversion with its named reaction.',
  pairs: [
    ['Benzenediazonium chloride → chlorobenzene', 'Sandmeyer'],
    ['Chloroethane → iodoethane', 'Finkelstein'],
    ['Bromomethane → fluoromethane', 'Swarts'],
    ['Bromoethane → butane', 'Wurtz'],
  ],
  order: [3, 1, 0, 2],
  sol: 'CuCl on a diazonium salt: Sandmeyer; NaI/acetone: Finkelstein; AgF: Swarts; Na in dry ether: Wurtz.',
  d: 1, c: 'recall', t: [2, 5],
}));
add('prep-short3', short({
  marks: 3, wl: null,
  stem: 'Write equations, with conditions, for preparing (a) chloroethane from ethanol using thionyl chloride, (b) chlorobenzene from benzene, (c) fluoromethane from bromomethane. State one advantage of the method in (a).',
  model: r`(a) $\ce{C2H5OH + SOCl2 ->[pyridine] C2H5Cl + SO2 + HCl}$; advantage: SO₂ and HCl are gases and escape, so the chloroethane is obtained pure.

(b) $\ce{C6H6 + Cl2 ->[FeCl3] C6H5Cl + HCl}$ (in the dark, anhydrous catalyst).

(c) $\ce{CH3Br + AgF -> CH3F + AgBr}$ (Swarts reaction).`,
  sol: 'Thionyl chloride, Lewis-acid chlorination, Swarts exchange.',
  scheme: [['(a) equation and advantage', 1], ['(b) equation with FeCl₃', 1], ['(c) Swarts equation', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 physical properties
add('bp-isomer-mcq', mcq({
  stem: 'Which has the highest boiling point?',
  right: '1-Bromobutane',
  wrong: ['2-Bromobutane', '2-Bromo-2-methylpropane', 'All three boil at the same temperature'],
  sol: 'The isomers have equal mass; the unbranched chain has the largest surface area and strongest van der Waals forces — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('density-mcq', mcq({
  stem: 'A few drops of a colourless haloalkane are added to water in a test tube and sink to the bottom. The haloalkane is most likely:',
  right: 'bromoethane',
  wrong: ['fluoroethane', 'chloromethane gas', 'a long-chain chloroalkane that floats'],
  sol: 'Bromo- and iodoalkanes are denser than water, because heavy halogen atoms add mass without much volume — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('solubility-ar', ar({
  a: 'Haloalkanes are only very slightly soluble in water.',
  r: 'Haloalkanes are non-polar molecules.',
  key: 'c',
  sol: 'A is true. R is false: haloalkanes are polar. They dissolve poorly because the energy needed to break the hydrogen bonds of water is not released by forming new, weaker attractions — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('bp-ar', ar({
  a: 'Bromoethane has a higher boiling point than chloroethane.',
  r: 'Bromine is less electronegative than chlorine.',
  key: 'b',
  sol: 'Both statements are true, but the higher boiling point is due to the greater mass and polarisability of bromine (stronger van der Waals forces), not to its lower electronegativity — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('haloarene-ar', ar({
  a: 'Chlorobenzene undergoes nucleophilic substitution more easily than chloroethane.',
  r: 'The C–Cl bond in chlorobenzene has partial double-bond character because of resonance.',
  key: 'd',
  sol: 'A is false: chlorobenzene is much less reactive. R is true, and is in fact the main reason for its low reactivity — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('pdcb-short', short({
  marks: 2,
  stem: 'The three dichlorobenzenes have similar boiling points, but 1,4-dichlorobenzene melts at 323 K while the 1,2- and 1,3-isomers melt below 260 K. Explain.',
  model: 'Boiling depends mainly on attractions in the liquid, which are similar for the three isomers. Melting also depends on how well molecules pack in the crystal. The symmetrical para isomer packs closely in the solid lattice, so more energy is needed to break it and its melting point is much higher.',
  sol: 'Symmetry and crystal packing.',
  scheme: [['Symmetrical para isomer packs better in the crystal', 1], ['More energy needed to melt; boiling unaffected by packing', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 nucleophilic substitution
add('sn-mechanism-mcq', mcq({
  stem: 'A haloalkane reacts with hydroxide ions. Doubling [OH⁻] doubles the rate, and an optically active reactant gives a product of opposite configuration. The mechanism is:',
  right: 'SN2',
  wrong: ['SN1', 'Elimination (E1)', 'Free-radical substitution'],
  sol: 'Rate depends on the nucleophile (second order) and configuration is inverted: SN2 — option (@K). SN1 (@1) would be independent of [OH⁻] and give racemisation.',
  d: 2, c: 'application', t: [4],
}));
add('sn2-order-mcq', mcq({
  stem: 'Which compound reacts fastest with aqueous NaOH by the SN2 mechanism?',
  right: 'Bromomethane',
  wrong: ['2-Bromopropane', '2-Bromo-2-methylpropane', '2-Bromobutane'],
  sol: 'SN2 needs backside attack; the least crowded carbon reacts fastest: CH₃X > 1° > 2° > 3° — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('sn1-order-mcq', mcq({
  stem: 'Arrange in increasing order of reactivity by the SN1 mechanism: (CH₃)₃CCl, CH₃Cl, (CH₃)₂CHCl, CH₃CH₂Cl.',
  right: 'CH₃Cl < CH₃CH₂Cl < (CH₃)₂CHCl < (CH₃)₃CCl',
  wrong: ['(CH₃)₃CCl < (CH₃)₂CHCl < CH₃CH₂Cl < CH₃Cl', 'CH₃CH₂Cl < CH₃Cl < (CH₃)₂CHCl < (CH₃)₃CCl', 'CH₃Cl < (CH₃)₂CHCl < CH₃CH₂Cl < (CH₃)₃CCl'],
  sol: 'SN1 rate follows carbocation stability, which increases with the number of alkyl groups on the positive carbon: methyl < primary < secondary < tertiary — option (@K). (@1) is the SN2 order.',
  d: 3, c: 'application', t: [4],
}));
add('kcn-mcq', mcq({
  stem: 'Bromoethane is warmed with ethanolic silver cyanide. The main organic product is:',
  right: r`ethyl isocyanide, $\ce{CH3CH2NC}$`,
  wrong: [r`propanenitrile, $\ce{CH3CH2CN}$`, 'ethanol', 'ethene'],
  sol: 'AgCN is mainly covalent, so the lone pair on nitrogen attacks: an isocyanide forms — option (@K). KCN (ionic) gives the nitrile (@1).',
  d: 2, c: 'understanding', t: [4],
}));
add('agno2-mcq', mcq({
  stem: 'A student wants to make nitroethane from iodoethane. Which reagent should be used?',
  right: 'Silver nitrite, AgNO₂',
  wrong: ['Potassium nitrite, KNO₂', 'Concentrated nitric acid', 'Sodium nitrate, NaNO₃'],
  sol: 'With AgNO₂ the nitrogen attacks, giving R–NO₂ (nitroalkane); KNO₂ gives the alkyl nitrite R–O–N=O (@1) — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('racemic-mcq', mcq({
  stem: 'An optically active sample of 3-bromo-3-methylhexane is hydrolysed in aqueous acetone by the SN1 mechanism. The product is:',
  right: 'largely racemic, because the planar carbocation is attacked from both faces',
  wrong: ['entirely the inverted alcohol', 'entirely the alcohol with retained configuration', 'optically active, because the carbocation is chiral'],
  sol: 'The carbocation intermediate is planar (sp²), so water attacks either face almost equally: mainly a racemic product — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('sn-ar', ar({
  a: 'Tertiary butyl bromide reacts with aqueous NaOH faster by SN1 than by SN2.',
  r: 'Tertiary carbocations are stabilised by three alkyl groups, while the backside of a tertiary carbon is crowded.',
  key: 'a',
  sol: 'Both are true; easy carbocation formation favours SN1 while steric crowding blocks SN2, so R explains A — option (a).',
  d: 3, c: 'understanding', t: [4],
}));
add('allylic-ar', ar({
  a: 'Allyl chloride is hydrolysed more readily than 1-chloropropane by the SN1 route.',
  r: 'The C–Cl bond in allyl chloride is part of a vinylic system with partial double-bond character.',
  key: 'c',
  sol: 'A is true: the allyl carbocation is stabilised by resonance. R is false: the chlorine in allyl chloride is on an sp³ carbon (allylic), not vinylic; there is no partial double-bond character in its C–Cl bond — option (c).',
  d: 4, c: 'analysis', t: [4],
}));
add('sn2-rate-num', num({
  stem: 'For an SN2 reaction, rate = k[RX][Nu⁻]. By what factor does the rate change if [RX] is tripled and [Nu⁻] is doubled?',
  value: 6, tol: 0, unit: null,
  sol: r`New rate $= k(3[\ce{RX}])(2[\ce{Nu-}])$, a factor of $3 \times 2 = 6$.`,
  scheme: [['Factor 3 × 2 = 6', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(3 * 2, 6) || 'factor');
add('sn1-rate-num', num({
  stem: 'For an SN1 reaction, rate = k[RX]. By what factor does the rate change if [RX] is doubled and [Nu⁻] is tripled?',
  value: 2, tol: 0, unit: null,
  sol: r`The nucleophile is not in the rate law, so only the doubling of RX matters: factor $2 \times 1 = 2$.`,
  scheme: [['Only [RX] counts: factor 2', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(2 * Math.pow(3, 0), 2) || 'factor');
add('chiral-short', short({
  marks: 2,
  stem: 'What is meant by a chiral molecule? Identify the chiral compound among 2-bromobutane and 1-bromobutane, and say why.',
  model: 'A chiral molecule is not superimposable on its mirror image. 2-Bromobutane is chiral: its C2 carries four different groups (H, Br, CH₃ and C₂H₅). 1-Bromobutane has no carbon with four different groups, so it is achiral.',
  sol: 'Look for a carbon with four different groups.',
  scheme: [['Definition of chirality', 1], ['2-Bromobutane chiral with reason', 1]],
  d: 2, c: 'application', t: [4],
}));
add('sn1sn2-short3', short({
  marks: 3,
  stem: 'Give three differences between the SN1 and SN2 mechanisms of nucleophilic substitution.',
  model: 'SN1 occurs in two steps through a carbocation intermediate, while SN2 occurs in one step through a transition state. The SN1 rate depends only on the haloalkane (first order), while the SN2 rate depends on both the haloalkane and the nucleophile (second order). SN1 gives mainly racemisation of a chiral centre, while SN2 gives inversion of configuration. (Also: SN1 reactivity 3° > 2° > 1°; SN2 reactivity 1° > 2° > 3°.)',
  sol: 'Steps, kinetics, stereochemistry, reactivity order.',
  scheme: [['Difference 1', 1], ['Difference 2', 1], ['Difference 3', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 elimination, metals, haloarenes
add('haloarene-mcq', mcq({
  stem: 'Chlorobenzene is far less reactive than chloroethane towards nucleophilic substitution, mainly because:',
  right: 'resonance gives the C–Cl bond partial double-bond character, making it shorter and stronger',
  wrong: ['chlorine in chlorobenzene is less electronegative', 'chlorobenzene is a gas at room temperature', 'the C–Cl carbon in chlorobenzene is sp³ hybridised'],
  sol: 'Delocalisation of a Cl lone pair into the ring strengthens the C–Cl bond; the carbon is sp² (not sp³ as in @3) — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('saytzeff-mcq', mcq({
  stem: '2-Bromo-2-methylbutane is heated with alcoholic KOH. The major product is:',
  right: '2-methylbut-2-ene',
  wrong: ['2-methylbut-1-ene', '2-methylbutan-2-ol', '3-methylbut-1-ene'],
  sol: 'β-Elimination by Saytzeff’s rule gives the more substituted alkene, (CH₃)₂C=CHCH₃ — option (@K). The alcohol (@2) would need aqueous KOH.',
  d: 3, c: 'application', t: [5],
}));
add('wurtz-mcq', mcq({
  stem: 'A mixture of bromoethane and bromomethane is treated with sodium in dry ether. Which set of alkanes forms?',
  right: 'Ethane, propane and butane',
  wrong: ['Propane only', 'Ethane and butane only', 'Methane, ethane and propane'],
  sol: 'Wurtz coupling joins any two alkyl groups: CH₃–CH₃, CH₃–C₂H₅ and C₂H₅–C₂H₅ — option (@K). This is why the Wurtz reaction is used only for symmetrical alkanes.',
  d: 4, c: 'analysis', t: [5],
}));
add('grignard-mcq', mcq({
  stem: 'Why must Grignard reagents be prepared in dry ether?',
  right: 'Water reacts with RMgX to give an alkane, destroying the reagent.',
  wrong: ['Water oxidises magnesium to magnesium oxide.', 'Ether makes the reagent more acidic.', 'Grignard reagents are explosive in moist air.'],
  sol: r`$\ce{CH3CH2MgBr + H2O -> CH3CH3 + Mg(OH)Br}$: any trace of water protonates the reagent — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}));
add('op-mcq', mcq({
  stem: 'Chlorobenzene is nitrated with a mixture of concentrated nitric and sulfuric acids. The main product is:',
  right: '1-chloro-4-nitrobenzene',
  wrong: ['1-chloro-3-nitrobenzene', 'nitrobenzene', '1,3-dinitrobenzene'],
  sol: 'Cl is ortho/para-directing (resonance), and the para product predominates for steric reasons — option (@K). Meta (@1) is only a minor product.',
  d: 2, c: 'application', t: [5],
}));
add('nitro-mcq', mcq({
  stem: 'Which compound is hydrolysed most easily by aqueous NaOH to the corresponding phenol?',
  right: '1-Chloro-2,4-dinitrobenzene',
  wrong: ['Chlorobenzene', '1-Chloro-3-nitrobenzene', '4-Chlorotoluene'],
  sol: 'Nitro groups at ortho and para positions withdraw electrons and stabilise the negatively charged intermediate, so substitution is easiest — option (@K). A meta nitro group (@2) helps much less; a methyl group (@3) hinders.',
  d: 4, c: 'analysis', t: [5],
}));
add('elim-short', short({
  marks: 2,
  stem: 'Explain, with an example, how the product of the reaction of a haloalkane with KOH depends on whether the KOH is aqueous or alcoholic.',
  model: 'In aqueous KOH, hydroxide acts mainly as a nucleophile and substitutes the halogen: bromoethane gives ethanol. In alcoholic KOH, the ethoxide/hydroxide acts mainly as a base and removes HBr (β-elimination): bromoethane gives ethene.',
  sol: 'Nucleophile (substitution) versus base (elimination).',
  scheme: [['Aqueous: substitution with example', 1], ['Alcoholic: elimination with example', 1]],
  d: 2, c: 'understanding', t: [4, 5],
}));
add('grignard-short', short({
  marks: 2, wl: null,
  stem: 'Write equations for (a) the preparation of ethylmagnesium bromide and (b) its reaction with water. Why is this reaction a problem in the laboratory?',
  model: r`(a) $\ce{CH3CH2Br + Mg ->[dry ether] CH3CH2MgBr}$

(b) $\ce{CH3CH2MgBr + H2O -> CH3CH3 + Mg(OH)Br}$

Any moisture in the apparatus or reagents destroys the Grignard reagent, so everything must be completely dry.`,
  sol: 'Preparation in dry ether; protonation by water.',
  scheme: [['Both equations', 1], ['Moisture destroys the reagent', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('haloarene-short3', short({
  marks: 3,
  stem: 'Give three reasons why haloarenes are much less reactive than haloalkanes towards nucleophilic substitution.',
  model: 'First, resonance delocalises a lone pair of the halogen into the ring, giving the C–X bond partial double-bond character, so it is shorter and stronger. Second, the carbon bonded to the halogen is sp² hybridised; being more electronegative, it holds the bonding electrons more tightly. Third, the phenyl cation that an SN1 path would need is very unstable, and the electron-rich ring repels an approaching nucleophile, hindering SN2 attack.',
  sol: 'Resonance, sp² carbon, unstable phenyl cation / repulsion.',
  scheme: [['Resonance, partial double bond', 1], ['sp² carbon, shorter bond', 1], ['Unstable phenyl cation or repulsion of the nucleophile', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('conversion-short3', short({
  marks: 3, wl: null,
  stem: 'How would you carry out these conversions? (a) Bromoethane to propanenitrile; (b) 2-bromopropane to propene; (c) chlorobenzene to toluene.',
  model: r`(a) Warm with ethanolic KCN: $\ce{CH3CH2Br + KCN -> CH3CH2CN + KBr}$.

(b) Heat with alcoholic KOH (β-elimination): $\ce{CH3CHBrCH3 + KOH -> CH3CH=CH2 + KBr + H2O}$.

(c) Wurtz–Fittig reaction with chloromethane and sodium in dry ether: $\ce{C6H5Cl + CH3Cl + 2Na -> C6H5CH3 + 2NaCl}$.`,
  sol: 'Substitution with KCN; elimination; Wurtz–Fittig.',
  scheme: [['(a) KCN, nitrile', 1], ['(b) alc. KOH, propene', 1], ['(c) CH₃Cl/Na, dry ether', 1]],
  d: 3, c: 'application', t: [4, 5],
}));
add('wurtz-num', num({
  marks: 2,
  stem: r`$0.20\ \text{mol}$ of bromoethane reacts completely with sodium in dry ether by the Wurtz reaction. What mass of butane, in grams, forms? ($\ce{C4H10}$, $M = 58\ \text{g mol}^{-1}$)`,
  value: 5.8, tol: 0.05, unit: 'g',
  sol: r`$\ce{2C2H5Br + 2Na -> C4H10 + 2NaBr}$: 2 mol bromoethane give 1 mol butane, so $\dfrac{0.20}{2} = 0.10$ mol butane; mass $= 0.10 \times 58 = 5.8$, so $5.8\ \text{g}$.`,
  scheme: [['2 : 1 ratio, 0.10 mol', 1], ['5.8 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near((0.2 / 2) * 58, 5.8) || 'butane');
add('grignard-num', num({
  stem: r`What mass of methane, in grams, forms when $0.020\ \text{mol}$ of methylmagnesium bromide reacts completely with water? ($\ce{CH4}$, $M = 16\ \text{g mol}^{-1}$)`,
  value: 0.32, tol: 0.005, unit: 'g',
  sol: r`$\ce{CH3MgBr + H2O -> CH4 + Mg(OH)Br}$ is 1 : 1, so $0.020$ mol methane; mass $= 0.020 \times 16 = 0.32$, so $0.32\ \text{g}$.`,
  scheme: [['1 : 1 ratio and 0.32 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(0.02 * 16, 0.32) || 'CH4');

// ---------------------------------------------------------------- t06 polyhalogen compounds
add('chcl3-mcq', mcq({
  stem: 'Chloroform is stored in closed, dark-coloured bottles filled to the brim because:',
  right: 'air and light oxidise it to poisonous phosgene, COCl₂',
  wrong: ['it evaporates to form explosive vapour', 'light converts it into iodoform', 'it absorbs water from air and becomes acidic only'],
  sol: r`$\ce{2CHCl3 + O2 ->[light] 2COCl2 + 2HCl}$: excluding air and light prevents phosgene formation — option (@K).`,
  d: 1, c: 'recall', t: [6],
}));
add('freon-mcq', mcq({
  stem: 'Freons were once ideal refrigerants but have now been phased out because they:',
  right: 'release chlorine atoms in the stratosphere that break down ozone',
  wrong: ['are highly toxic to humans at low levels', 'are flammable and explode easily', 'react quickly with water in the lower atmosphere'],
  sol: 'Being very stable, CFCs reach the stratosphere, where UV light frees Cl atoms that destroy ozone catalytically — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('ddt-tf', tf({
  stem: 'DDT is a problem in the environment mainly because it breaks down very quickly into toxic gases.',
  key: 'f',
  sol: 'False. DDT is a problem because it is NOT readily biodegradable; it persists and accumulates in fatty tissue and food chains.',
  d: 1, c: 'understanding', t: [6],
}));
add('iodoform-fill', fill({
  stem: 'Triiodomethane is used as an antiseptic because it liberates free ___.',
  acc: [['iodine', 'I2']],
  sol: 'Its antiseptic action is due to the **iodine** released, not to iodoform itself.',
  d: 1, c: 'recall', t: [6],
}));
add('poly-short', short({
  marks: 2,
  stem: 'Give one use and one harmful effect each of dichloromethane and carbon tetrachloride.',
  model: 'Dichloromethane is used as a paint remover and solvent; high exposure affects the central nervous system and can cause dizziness and nausea. Carbon tetrachloride was used as a solvent and in making refrigerants; it damages the liver and contributes to ozone depletion when released into the air.',
  sol: 'One use and one hazard for each.',
  scheme: [['Dichloromethane: use and hazard', 1], ['Carbon tetrachloride: use and hazard', 1]],
  d: 2, c: 'recall', t: [6],
}));

// ---------------------------------------------------------------- more practice
add('lucas-mcq', mcq({
  stem: 'Which alcohol turns Lucas reagent (conc. HCl + anhydrous ZnCl₂) cloudy almost at once at room temperature?',
  right: '2-Methylpropan-2-ol',
  wrong: ['Butan-1-ol', 'Butan-2-ol', 'Methanol'],
  sol: 'Tertiary alcohols form a stable tertiary carbocation, so the insoluble chloroalkane separates immediately; secondary alcohols take minutes and primary ones react only on heating — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('bp-halide-mcq', mcq({
  stem: 'Arrange in increasing order of boiling point: CH₃I, CH₃Cl, CH₃Br.',
  right: 'CH₃Cl < CH₃Br < CH₃I',
  wrong: ['CH₃I < CH₃Br < CH₃Cl', 'CH₃Br < CH₃Cl < CH₃I', 'All boil at the same temperature'],
  sol: 'Molar mass and polarisability increase from Cl to I, strengthening van der Waals forces — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('sn1-tf', tf({
  stem: 'Hydrolysis of an optically active tertiary bromide by the SN1 mechanism gives a product with complete inversion of configuration.',
  key: 'f',
  sol: 'False. The planar carbocation is attacked from both faces, so SN1 gives mainly racemisation; complete inversion is typical of SN2.',
  d: 2, c: 'understanding', t: [4],
}));
add('fittig-mcq', mcq({
  stem: 'Bromobenzene is heated with sodium in dry ether. The organic product is:',
  right: 'biphenyl',
  wrong: ['benzene', 'toluene', 'phenol'],
  sol: r`$\ce{2C6H5Br + 2Na -> C6H5C6H5 + 2NaBr}$ (Fittig reaction): two phenyl groups join — option (@K).`,
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- long answers
add('sn-long', long({
  stem: '(a) Describe the SN2 mechanism for the reaction of hydroxide ions with bromomethane, including the rate law and the stereochemical result.\n\n(b) Describe the SN1 mechanism for the hydrolysis of 2-bromo-2-methylpropane, including the rate law.\n\n(c) Explain why primary halides prefer SN2 and tertiary halides prefer SN1.',
  model: 'In SN2, the hydroxide ion attacks the carbon from the side opposite the bromine. In a single step, the O–C bond forms as the C–Br bond breaks, through a transition state in which carbon is partly bonded to both and the three hydrogens lie in a plane. Rate = k[CH₃Br][OH⁻], and the configuration is inverted. In SN1, the C–Br bond of 2-bromo-2-methylpropane first breaks slowly to give a tertiary carbocation and bromide; then water or hydroxide attacks the planar carbocation quickly. Rate = k[(CH₃)₃CBr]; a chiral reactant would give mainly a racemic product. Primary halides have an unhindered carbon for backside attack and form unstable carbocations, so they react by SN2; tertiary halides are too crowded for backside attack but form stable carbocations, so they react by SN1.',
  sol: 'Steps, rate laws, stereochemistry, and the steric/carbocation argument.',
  scheme: [['(a) One-step mechanism with backside attack', 1], ['(a) Rate law and inversion', 1], ['(b) Carbocation mechanism and rate law', 1.5], ['(c) Steric and carbocation-stability reasons', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('reactions-long', long({
  wl: null,
  stem: 'Starting from 2-bromopropane, show how you would obtain: (a) propan-2-ol, (b) propene, (c) 2,3-dimethylbutane, (d) 2-methylpropanenitrile, (e) propane. Write an equation and the conditions for each.',
  model: r`(a) Aqueous KOH, warm: $\ce{(CH3)2CHBr + KOH -> (CH3)2CHOH + KBr}$.

(b) Alcoholic KOH, heat: $\ce{(CH3)2CHBr + KOH -> CH3CH=CH2 + KBr + H2O}$.

(c) Sodium in dry ether (Wurtz): $\ce{2(CH3)2CHBr + 2Na -> (CH3)2CHCH(CH3)2 + 2NaBr}$.

(d) Ethanolic KCN: $\ce{(CH3)2CHBr + KCN -> (CH3)2CHCN + KBr}$.

(e) Make the Grignard reagent with Mg in dry ether, then add water: $\ce{(CH3)2CHBr + Mg -> (CH3)2CHMgBr}$, then $\ce{(CH3)2CHMgBr + H2O -> CH3CH2CH3 + Mg(OH)Br}$.`,
  sol: 'Choose substitution, elimination, Wurtz, cyanide and Grignard routes.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 4, c: 'application', t: [4, 5],
}));
add('prep-long', long({
  stem: '(a) Describe three methods of converting an alcohol into a chloroalkane and say which is best and why.\n\n(b) Explain the Finkelstein and Swarts reactions with equations.\n\n(c) Explain why the boiling points of haloalkanes increase from fluoro to iodo, and decrease with branching.',
  model: 'An alcohol can be converted to a chloroalkane with HCl and anhydrous ZnCl₂, with phosphorus pentachloride (giving POCl₃ and HCl), or with thionyl chloride (giving SO₂ and HCl). Thionyl chloride is best because both by-products are gases that escape, leaving the pure product. In the Finkelstein reaction, a chloro- or bromoalkane is heated with NaI in dry acetone to give an iodoalkane; NaCl or NaBr precipitates, so the reaction goes to completion. In the Swarts reaction, a chloro- or bromoalkane is heated with AgF, Hg₂F₂ or SbF₃ to give a fluoroalkane, for example CH₃Br + AgF → CH₃F + AgBr. Boiling points rise from fluoro to iodo because molecular mass and size, and hence van der Waals forces, increase. Branching makes molecules more compact, reducing the surface area of contact and the van der Waals forces, so the boiling point falls.',
  sol: 'Three reagents and the best; two exchange reactions; two boiling-point trends with reasons.',
  scheme: [['(a) Three methods', 1.5], ['(a) Best method with reason', 0.5], ['(b) Finkelstein and Swarts', 1.5], ['(c) Two trends explained', 1.5]],
  d: 3, c: 'understanding', t: [2, 3],
}));
add('haloarene-long', long({
  stem: '(a) Explain, using resonance, why chlorobenzene does not undergo nucleophilic substitution easily, and give the conditions needed to convert it into phenol.\n\n(b) How does a nitro group at the para position affect this reaction?\n\n(c) Explain why the chlorine atom in chlorobenzene is deactivating yet ortho/para-directing in electrophilic substitution, and give the products of its nitration.',
  model: 'A lone pair on chlorine is delocalised into the benzene ring, so in the resonance hybrid the C–Cl bond has partial double-bond character; it is shorter and stronger and is not easily broken. The carbon is sp², and the phenyl cation needed for SN1 is unstable. Conversion to phenol needs aqueous NaOH at about 623 K and 300 atm, followed by acidification. A para nitro group withdraws electron density and stabilises the negatively charged intermediate formed when the nucleophile adds, so substitution becomes much easier at lower temperatures. In electrophilic substitution, chlorine withdraws electrons by its −I effect, making the ring less reactive than benzene (deactivating), but its +R effect increases electron density at the ortho and para positions, so the electrophile enters there. Nitration gives 1-chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene, the para isomer being major.',
  sol: 'Resonance and conditions; effect of o/p nitro; −I versus +R.',
  scheme: [['(a) Resonance argument', 1], ['(a) Conditions for phenol', 1], ['(b) Effect of p-nitro', 1], ['(c) Deactivating but o/p-directing explained', 1.5], ['(c) Nitration products', 0.5]],
  d: 4, c: 'analysis', t: [5],
}));
add('poly-long', long({
  stem: '(a) Give the uses and hazards of chloroform and explain how it is stored safely.\n\n(b) What are freons? Explain how they damage the ozone layer.\n\n(c) Why was DDT widely used, and why has its use been restricted?',
  model: 'Chloroform is a solvent for fats and alkaloids and was once an anaesthetic; its vapour depresses the nervous system and damages the liver. Air and light oxidise it to poisonous phosgene, so it is kept in dark bottles filled to the top. Freons are chlorofluorocarbons such as CCl₂F₂, used as refrigerants and propellants because they are non-toxic and unreactive. This stability lets them reach the stratosphere, where UV light frees chlorine atoms that destroy ozone in a chain reaction, letting more UV reach the Earth. DDT is a powerful insecticide against malaria mosquitoes and crop pests, but it is not biodegradable: it persists, builds up in fatty tissues and food chains and harms wildlife, so its use is restricted.',
  sol: 'Chloroform storage; ozone depletion by Cl atoms; persistence and bioaccumulation of DDT.',
  scheme: [['(a) Uses, hazards, phosgene and storage', 2], ['(b) Freons and the ozone mechanism', 1.5], ['(c) Reason for use and for restriction', 1.5]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- case-based
add('kinetics-case', mk.case({
  passage: r`A student measures initial rates of reaction of two isomeric bromides, X and Y (both $\ce{C4H9Br}$), with hydroxide ions in aqueous ethanol at the same temperature.

| Run | Bromide | [bromide] / M | $[\ce{OH-}]$ / M | Initial rate (relative) |
|---|---|---|---|---|
| 1 | X | 0.10 | 0.10 | 1.0 |
| 2 | X | 0.10 | 0.20 | 2.0 |
| 3 | Y | 0.10 | 0.10 | 50 |
| 4 | Y | 0.10 | 0.20 | 50 |

One of the bromides is 1-bromobutane and the other is 2-bromo-2-methylpropane. (Illustrative data.)`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which statement about X is correct?',
      right: 'X reacts by SN2, because its rate is proportional to [OH⁻].',
      wrong: ['X reacts by SN1, because its rate depends on [OH⁻].', 'X reacts by SN2, because its rate is independent of [OH⁻].', 'X undergoes elimination only.'],
      sol: 'Doubling [OH⁻] doubles the rate of X (runs 1, 2): second order overall, SN2 — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Identify Y, giving a reason from the data.',
      model: '2-Bromo-2-methylpropane: its rate does not change with [OH⁻] (SN1), as expected for a tertiary halide.',
      sol: 'Rate independent of nucleophile: SN1, tertiary halide.',
      scheme: [['Y is the tertiary bromide, rate independent of [OH⁻]', 1]],
      d: 3, c: 'analysis', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why Y reacts much faster than X under these conditions.',
      model: 'Y forms a tertiary carbocation, stabilised by three alkyl groups, so its slow ionisation step is relatively fast in the polar solvent. X is primary: its carbocation would be very unstable, so it must react by the slower SN2 route.',
      sol: 'Carbocation stability controls the SN1 rate.',
      scheme: [['Stable tertiary carbocation for Y', 1], ['Primary X cannot ionise easily; slower SN2', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Write the rate laws for X and Y, and predict the relative rate for X in a run with [X] = 0.20 M and [OH⁻] = 0.20 M.',
        model: 'X: rate = k[X][OH⁻]; Y: rate = k[Y]. Compared with run 1, [X] and [OH⁻] are both doubled, so the rate is 2 × 2 = 4 times larger: relative rate 4.0.',
        sol: 'Second order for X; first order for Y.',
        scheme: [['Both rate laws', 1], ['Relative rate 4.0', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}));
add('anaesthetic-case', mk.case({
  passage: r`In the nineteenth century, chloroform was widely used as an anaesthetic in surgery. It was abandoned because of its effects on the heart and liver, and because old bottles sometimes contained phosgene: $\ce{2CHCl3 + O2 ->[light] 2COCl2 + 2HCl}$. A hospital pharmacist tests an old bottle by shaking a little of the chloroform with silver nitrate solution. (C = 12, H = 1, O = 16, Cl = 35.5)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What would a white precipitate in the silver nitrate test show?',
      right: 'The chloroform has partly decomposed, because HCl formed with the phosgene gives AgCl.',
      wrong: ['The chloroform is pure, because chloroform itself gives AgCl.', 'Phosgene has reacted with silver to form silver metal.', 'Water is present in the bottle.'],
      sol: 'Chloroform itself does not give free Cl⁻; the HCl formed on oxidation does, precipitating AgCl — option (@K).',
      d: 2, c: 'application', t: [6],
    })),
    part('b', num({
      stem: r`What mass of phosgene ($\ce{COCl2}$), in grams, can form from $2.39\ \text{g}$ of chloroform?`,
      value: 1.98, tol: 0.01, unit: 'g',
      sol: r`$M(\ce{CHCl3}) = 119.5$, so moles $= \dfrac{2.39}{119.5} = 0.02$; ratio 1 : 1, so $0.02$ mol $\ce{COCl2}$; $M(\ce{COCl2}) = 99$, mass $= 0.02 \times 99 = 1.98$, so $1.98\ \text{g}$.`,
      scheme: [['0.02 mol and 1.98 g', 1]],
      d: 3, c: 'application', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'How should chloroform be stored, and why does each precaution help?',
      model: 'It should be kept in dark-coloured bottles, because light drives the oxidation, and the bottles should be closed and filled to the top, so that no air (oxygen) is present above the liquid. A little ethanol is often added, which converts any phosgene formed into a harmless compound.',
      sol: 'Exclude light and air.',
      scheme: [['Dark bottles: light drives oxidation', 1], ['Full, closed bottles: no oxygen', 1]],
      d: 2, c: 'understanding', t: [6],
    }), [
      short({
        marks: 2,
        stem: 'Chloroform has been replaced as an anaesthetic. Give two reasons, using information from the passage and your knowledge.',
        model: 'Chloroform depresses the heart and can damage the liver, so it is unsafe for patients. In addition, old stocks can contain poisonous phosgene formed by oxidation in air and light, so a bottle may be dangerous without warning. Safer anaesthetics are now available.',
        sol: 'Toxicity to the body; risk of phosgene.',
        scheme: [['Effects on heart or liver', 1], ['Risk of phosgene in old stock', 1]],
        d: 2, c: 'evaluation', t: [6],
      }),
    ]),
  ],
}), () => near((2.39 / 119.5) * 99, 1.98) || 'phosgene');
add('ozone-case', mk.case({
  passage: 'For decades, refrigerators and aerosol cans used CFCs such as CCl₂F₂ (freon-12). Because they are unreactive, CFCs released at ground level survive for many years and slowly reach the stratosphere. There, ultraviolet light splits off chlorine atoms, which take part in a cycle: Cl + O₃ → ClO + O₂, then ClO + O → Cl + O₂. Under the Montreal Protocol, CFCs were phased out and replaced by less harmful compounds.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why can a single chlorine atom destroy many ozone molecules?',
      right: 'It is regenerated in the second step, so it acts as a catalyst in a chain reaction.',
      wrong: ['It combines permanently with ozone to form a stable compound.', 'It is a very large atom that blocks sunlight.', 'It reacts only with oxygen molecules, not ozone.'],
      sol: 'Adding the two steps gives O₃ + O → 2O₂ with Cl regenerated — a catalytic cycle — option (@K).',
      d: 3, c: 'analysis', t: [6],
    })),
    part('b', short({
      marks: 1,
      stem: 'Write the overall equation for the two steps.',
      model: 'O₃ + O → 2O₂ (chlorine is regenerated).',
      sol: 'Add the steps and cancel Cl and ClO.',
      scheme: [['O₃ + O → 2O₂', 1]],
      d: 2, c: 'application', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'The property that made CFCs safe to use at home is the same property that made them harmful to the ozone layer. Explain.',
      model: 'CFCs are chemically unreactive, non-toxic and non-flammable, which made them safe in refrigerators and sprays. But because they do not break down in the lower atmosphere, they survive long enough to reach the stratosphere, where UV light finally breaks C–Cl bonds and releases ozone-destroying chlorine atoms.',
      sol: 'Stability is both the benefit and the problem.',
      scheme: [['Stability made them safe at ground level', 1], ['Same stability lets them reach the stratosphere and release Cl', 1]],
      d: 3, c: 'evaluation', t: [6],
    }), [
      short({
        marks: 2,
        stem: 'Why does ozone depletion matter for human health?',
        model: 'Stratospheric ozone absorbs most of the harmful ultraviolet radiation from the Sun. Thinner ozone lets more UV reach the ground, increasing the risk of skin cancer, cataracts and damage to crops and plankton.',
        sol: 'Ozone shields the Earth from UV.',
        scheme: [['Ozone absorbs UV', 1], ['More UV causes skin cancer, cataracts or ecosystem damage', 1]],
        d: 2, c: 'understanding', t: [6],
      }),
    ]),
  ],
}));
add('synthesis-case', mk.case({
  passage: 'A student is asked to make butane in the laboratory from bromoethane. She considers two routes: Route A, heating bromoethane with sodium in dry ether (Wurtz reaction); Route B, preparing ethylmagnesium bromide and then adding water. Her teacher points out that only one of the routes gives butane.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which route gives butane?',
      right: 'Route A, because two ethyl groups are joined by sodium',
      wrong: ['Route B, because water joins two ethyl groups', 'Both routes give butane', 'Neither route gives butane'],
      key: 'a',
      sol: '2C₂H₅Br + 2Na → C₄H₁₀ + 2NaBr (Wurtz). Route B gives ethane — option (@K).',
      d: 2, c: 'application', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the hydrocarbon formed in Route B.',
      model: 'Ethane (C₂H₅MgBr + H₂O → C₂H₆ + Mg(OH)Br).',
      sol: 'Water protonates the Grignard reagent.',
      scheme: [['Ethane', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why must both routes be carried out in dry ether?',
      model: 'Sodium reacts violently with water, and the Grignard reagent is destroyed by water, giving the alkane before it can be used. Dry ether is an inert solvent that dissolves the reactants (and, for Grignard, stabilises RMgX) without destroying them.',
      sol: 'Na and RMgX both react with water.',
      scheme: [['Na and RMgX react with water', 1], ['Ether is an inert, dry solvent', 1]],
      d: 2, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Another student uses a mixture of bromoethane and bromomethane in Route A, hoping to make propane. Evaluate this plan.',
        model: 'The plan gives a mixture, not pure propane. Sodium couples any two alkyl groups, so ethane (CH₃–CH₃), propane (CH₃–C₂H₅) and butane (C₂H₅–C₂H₅) all form and must be separated. The Wurtz reaction is suitable only for symmetrical alkanes.',
        sol: 'Mixed Wurtz gives three products.',
        scheme: [['Three alkanes form (ethane, propane, butane)', 1], ['So the plan is poor; Wurtz suits symmetrical alkanes', 1]],
        d: 4, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}));

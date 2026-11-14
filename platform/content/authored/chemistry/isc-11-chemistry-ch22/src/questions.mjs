// ch22 Alkenes — question bank (ISC style). AR keys planned: a c b d c b. MCQ keys are placed by the builder.
// Numbers printed in stems are the exact values used in the computations (strings carry the significant figures).
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const MV = 22.4; // L at STP

// ---------------------------------------------------------------- t01 nomenclature, structure, isomerism
add('name-mcq', mcq({
  stem: 'A flavour chemist draws the structure CH₃CH(CH₃)CH=CHCH₂CH₃ for a compound isolated from a plant oil. Its IUPAC name is:',
  right: '2-methylhex-3-ene',
  wrong: ['5-methylhex-3-ene', '2-methylhex-4-ene', '1-isopropylbut-1-ene'],
  sol: 'The longest chain containing C=C has 6 carbons. The double bond is at C-3 from either end, so the tie is broken by the methyl group, which gets the lower locant 2: 2-methylhex-3-ene, option (@K). Option (@1) numbers from the wrong end, (@2) gives the double bond a higher locant and (@3) does not use the longest chain.',
  d: 2, c: 'application', t: [1],
}));
add('hyb-mcq', mcq({
  stem: 'In a molecule of propene, CH₃–CH=CH₂, the hybridisation of the three carbon atoms, taken from the CH₃ end, is:',
  right: 'sp³, sp², sp²',
  wrong: ['sp², sp², sp²', 'sp³, sp³, sp²', 'sp³, sp², sp'],
  sol: 'The CH₃ carbon has four σ bonds (sp³); each doubly bonded carbon has three σ bonds and one π bond (sp²). The order is sp³, sp², sp² — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sigma-mcq', mcq({
  stem: 'The numbers of σ bonds and π bonds in one molecule of propene, C₃H₆, are respectively:',
  right: '8 and 1',
  wrong: ['9 and 1', '7 and 2', '8 and 2'],
  sol: 'Propene has 2 C–C bonds (one of them double) and 6 C–H bonds. All 8 links give σ bonds and the C=C adds one π bond, so 8 σ and 1 π — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('isoc5-mcq', mcq({
  stem: 'A student counts every open-chain structural isomer of C₅H₁₀ that contains one carbon–carbon double bond, ignoring cis–trans forms. The number is:',
  right: '5',
  wrong: ['3', '4', '6'],
  sol: 'The isomers are pent-1-ene, pent-2-ene, 2-methylbut-1-ene, 3-methylbut-1-ene and 2-methylbut-2-ene: 5 in all — option (@K). Counting the cis and trans forms of pent-2-ene separately would give 6 (@3).',
  d: 2, c: 'application', t: [1],
}));
add('geom-mcq', mcq({
  stem: 'Which of these bromo-compounds exists as a pair of cis–trans isomers?',
  right: 'CH₃CH=CHBr',
  wrong: ['CH₂=CHBr', '(CH₃)₂C=CHBr', 'CH₂=CBr₂'],
  sol: 'Cis–trans isomerism needs two different groups on each doubly bonded carbon. In CH₃CH=CHBr each carbon has H and a different group — option (@K). The others have two identical groups (H, H; CH₃, CH₃; Br, Br) on one carbon (@1, @2, @3).',
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('dehyd-mcq', mcq({
  stem: 'Ethanol is heated with an excess of concentrated sulphuric acid at 443 K. The main organic product is:',
  right: 'ethene',
  wrong: ['ethoxyethane', 'ethanal', 'ethane'],
  sol: 'At 443 K with excess acid, ethanol loses water from adjacent carbons to give ethene, option (@K). Ethoxyethane (@1) forms at about 413 K with excess alcohol.',
  d: 1, c: 'recall', t: [2],
}));
add('saytzeff-mcq', mcq({
  stem: 'A student heats 2-bromo-3-methylbutane with alcoholic potassium hydroxide. According to Saytzeff\'s rule, the major product is:',
  right: '2-methylbut-2-ene',
  wrong: ['3-methylbut-1-ene', '2-methylbut-1-ene', '3-methylbutan-2-ol'],
  sol: 'The carbon with Br is C-2; its β-carbons are C-1 (3 H) and C-3 (1 H). Removing the C-3 hydrogen gives the more substituted alkene, (CH₃)₂C=CHCH₃, 2-methylbut-2-ene — option (@K). Loss from C-1 gives 3-methylbut-1-ene (@1); (@2) has the wrong skeleton and (@3) is a substitution product that alcoholic KOH does not favour.',
  d: 2, c: 'application', t: [2],
}));
add('vic-mcq', mcq({
  stem: 'A sample of 1,2-dibromopropane is warmed with zinc dust in ethanol. The organic product is:',
  right: 'propene',
  wrong: ['propane', 'propyne', 'propan-2-ol'],
  sol: 'Zinc removes the two bromine atoms from adjacent carbons as ZnBr₂ and leaves a C=C bond: propene — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('kolbe-alk-mcq', mcq({
  stem: 'A concentrated aqueous solution of potassium succinate, KOOC–CH₂–CH₂–COOK, is electrolysed. The hydrocarbon liberated at the anode is:',
  right: 'ethene',
  wrong: ['ethane', 'ethyne', 'butane'],
  sol: 'Each carboxylate group is lost as CO₂ and the two remaining CH₂ carbons join by a double bond: ⁻OOC–CH₂–CH₂–COO⁻ gives CH₂=CH₂ + 2CO₂ + 2e⁻. The product is ethene — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('alkyne-red-mcq', mcq({
  stem: 'Hex-2-yne is treated with sodium in liquid ammonia. The main product is:',
  right: 'trans-hex-2-ene',
  wrong: ['cis-hex-2-ene', 'hexane', 'hex-1-ene'],
  sol: 'Sodium in liquid ammonia reduces an alkyne to the trans alkene by anti addition of hydrogen: trans-hex-2-ene — option (@K). The cis isomer (@1) needs H₂/Lindlar catalyst; hexane (@2) would need full hydrogenation.',
  d: 2, c: 'application', t: [2],
}));
add('ease-mcq', mcq({
  stem: 'Four alcohols are warmed with the same concentrated acid under identical conditions. The one that dehydrates most easily is:',
  right: '2-methylpropan-2-ol',
  wrong: ['butan-1-ol', 'butan-2-ol', 'ethanol'],
  sol: 'The ease of dehydration follows carbocation stability: tertiary > secondary > primary. 2-Methylpropan-2-ol is tertiary — option (@K); butan-2-ol (@2) is secondary and butan-1-ol and ethanol (@1, @3) are primary.',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 physical properties
add('bpcis-mcq', mcq({
  stem: 'cis-But-2-ene boils at 277 K and trans-but-2-ene at 274 K. The main reason why the cis isomer has the higher boiling point is that it:',
  right: 'has a small net dipole moment, so it has extra dipole–dipole attraction',
  wrong: ['has a larger molar mass', 'is more symmetrical and packs better in the liquid', 'forms hydrogen bonds between molecules'],
  sol: 'The two isomers have the same molar mass (@1). In the cis form the two C–CH₃ bond dipoles do not cancel, so the molecule is slightly polar and has extra dipole–dipole attraction; in the trans form they cancel — option (@K). Symmetry (@2) raises the melting point, not the boiling point, and there is no hydrogen bonding (@3).',
  d: 2, c: 'understanding', t: [3],
}));
add('dipole-mcq', mcq({
  stem: 'Of these four chlorine-containing alkenes, the one with a zero dipole moment is:',
  right: 'trans-1,2-dichloroethene',
  wrong: ['cis-1,2-dichloroethene', 'chloroethene', '1,1-dichloroethene'],
  sol: 'In the trans isomer the two C–Cl bond dipoles point in opposite directions and cancel, giving zero net dipole moment — option (@K). The cis isomer (about 1.9 D), chloroethene and 1,1-dichloroethene all have a net dipole.',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 addition reactions
add('markov-mcq', mcq({
  stem: 'But-1-ene reacts with hydrogen chloride in the absence of peroxides. The major product is:',
  right: '2-chlorobutane',
  wrong: ['1-chlorobutane', 'butan-2-ol', '1,2-dichlorobutane'],
  sol: 'By Markownikoff\'s rule H goes to C-1 (which has more hydrogens) and Cl to C-2, via the secondary carbocation: CH₃CH₂CHClCH₃, 2-chlorobutane — option (@K). Option (@1) is the anti-Markownikoff product; (@2) and (@3) need other reagents.',
  d: 2, c: 'application', t: [4],
}));
add('hydrat-mcq', mcq({
  stem: 'Propene is passed into dilute sulphuric acid and the mixture is warmed. The main product is:',
  right: 'propan-2-ol',
  wrong: ['propan-1-ol', 'propane-1,2-diol', 'propanone'],
  sol: 'Acid-catalysed hydration follows Markownikoff\'s rule: H adds to C-1 and OH to C-2, giving CH₃CH(OH)CH₃, propan-2-ol — option (@K). Propan-1-ol (@1) would be the anti-Markownikoff product; (@2) needs oxidising conditions and (@3) is a ketone.',
  d: 2, c: 'application', t: [4],
}));
add('carbocat-mcq', mcq({
  stem: 'In the acid-catalysed hydration of 2-methylpropene, the carbocation formed in the first step is:',
  right: '(CH₃)₃C⁺',
  wrong: ['(CH₃)₂CHCH₂⁺', 'CH₃CH₂CH₂⁺', 'CH₃⁺'],
  sol: 'H⁺ adds to the CH₂ carbon, leaving the positive charge on the carbon bearing two methyl groups: the tertiary carbocation (CH₃)₃C⁺ — option (@K). Adding H⁺ to the other carbon would give the less stable primary cation (@1).',
  d: 2, c: 'application', t: [4],
}));
add('perox-mcq', mcq({
  stem: 'But-1-ene reacts with hydrogen bromide in the presence of benzoyl peroxide. The major product is:',
  right: '1-bromobutane',
  wrong: ['2-bromobutane', 'butan-1-ol', '1,2-dibromobutane'],
  sol: 'With a peroxide, HBr adds by a free-radical chain: Br• attacks C-1 to give the more stable secondary radical, so Br ends on C-1 (anti-Markownikoff): 1-bromobutane — option (@K). Option (@1) is the product without peroxide.',
  d: 2, c: 'application', t: [4],
}));
add('bromine-mcq', mcq({
  stem: 'Ethene gas is bubbled into a red-brown solution of bromine in tetrachloromethane. The observation and the organic product are:',
  right: 'the solution becomes colourless; 1,2-dibromoethane',
  wrong: ['the solution stays red-brown; bromoethane', 'a white precipitate forms; ethane', 'the solution turns green; ethanol'],
  sol: 'Bromine adds across the C=C bond, so its colour is lost and colourless 1,2-dibromoethane forms — option (@K). This is the usual test for unsaturation.',
  d: 1, c: 'understanding', t: [4],
}));
add('peroxhx-mcq', mcq({
  stem: 'The peroxide effect is not observed with hydrogen chloride mainly because:',
  right: 'the H–Cl bond is too strong, so the step in which the carbon radical takes hydrogen from HCl is unfavourable',
  wrong: ['chlorine radicals cannot add to a C=C bond at all', 'chlorine is less electronegative than bromine', 'peroxides react with HCl and are used up'],
  sol: 'The radical chain needs the carbon radical to abstract H from HX. The H–Cl bond (431 kJ mol⁻¹) is much stronger than H–Br (366 kJ mol⁻¹), so this step is energetically unfavourable and the chain does not propagate — option (@K). Chlorine radicals do add to alkenes (@1), electronegativity (@2) is not the issue, and peroxides are not consumed by HCl (@3).',
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 oxidation, polymerisation
add('baeyer-mcq', mcq({
  stem: 'Propene is shaken with cold, dilute, alkaline potassium permanganate solution. The organic product is:',
  right: 'propane-1,2-diol',
  wrong: ['propan-2-ol', 'ethanoic acid', 'propanone'],
  sol: 'Cold dilute alkaline KMnO₄ adds two OH groups across the C=C bond (Baeyer\'s test): CH₃CH(OH)CH₂OH, propane-1,2-diol — option (@K). Ethanoic acid (@2) and propanone (@3) are cleavage products formed only with hot concentrated reagent.',
  d: 2, c: 'application', t: [5],
}));
add('hot-mcq', mcq({
  stem: 'But-2-ene is boiled with hot, concentrated acidified potassium permanganate. The organic product is:',
  right: 'ethanoic acid',
  wrong: ['ethanal', 'butane-2,3-diol', 'propanoic acid'],
  sol: 'Hot KMnO₄ cleaves the C=C bond and oxidises each =CHCH₃ fragment to CH₃COOH. Two molecules of ethanoic acid form — option (@K). Ethanal (@1) would be the ozonolysis product; the diol (@2) forms with the cold reagent.',
  d: 2, c: 'application', t: [5],
}));
add('ozon-mcq', mcq({
  stem: 'An alkene is treated with ozone and the ozonide is decomposed with zinc and water. The only organic product is propanone. The alkene is:',
  right: '2,3-dimethylbut-2-ene',
  wrong: ['2-methylbut-2-ene', '2-methylpropene', 'but-2-ene'],
  sol: 'Propanone, (CH₃)₂C=O, is the only product, so both ends of the double bond are =C(CH₃)₂. Joining two such carbons gives (CH₃)₂C=C(CH₃)₂, 2,3-dimethylbut-2-ene — option (@K). The others would give propanone plus another compound (@1, @2) or only ethanal (@3).',
  d: 3, c: 'application', t: [5],
}));
add('poly-mcq', mcq({
  stem: 'The repeating unit in the polymer formed from propene is:',
  right: '–CH(CH₃)–CH₂–',
  wrong: ['–CH₂–CH₂–', '–CH₂–CH₂–CH₂–', '–CH₂–C(CH₃)₂–'],
  sol: 'Opening the double bond of CH₃CH=CH₂ gives the unit –CH(CH₃)–CH₂–, repeated n times in polypropene — option (@K). Option (@1) is the unit of polythene.',
  d: 1, c: 'recall', t: [5],
}));
{
  const V = 2.4;
  const vO2 = 3 * V;
  add('combust-mcq', mcq({
    stem: `Ethene burns completely in oxygen. At the same temperature and pressure, the volume of oxygen needed for ${V.toFixed(1)} L of ethene is:`,
    right: `${vO2.toFixed(1)} L`,
    wrong: [`${V.toFixed(1)} L`, `${(2 * V).toFixed(1)} L`, `${(4 * V).toFixed(1)} L`],
    sol: r`C₂H₄ + 3O₂ → 2CO₂ + 2H₂O. By Gay-Lussac's law the volumes of gases are in the ratio of the coefficients, so $V(\text{O}_2) = 3 \times ${V.toFixed(1)} = ${vO2.toFixed(1)}\ \text{L}$ — option (@K).`,
    d: 2, c: 'application', t: [5],
  }), () => near(vO2, 7.2, 0.001) || 'vO2');
}

// ---------------------------------------------------------------- assertion-reason (registered in the order a c b d c b)
add('markov-ar', ar({
  a: 'Hydrogen bromide adds to propene in the absence of a peroxide to give mainly 2-bromopropane.',
  r: 'The addition proceeds through the more stable secondary carbocation.',
  key: 'a',
  sol: 'Both are true, and R explains A: H⁺ adds to C-1, forming the secondary carbocation on C-2, which Br⁻ then attacks — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('perox-ar', ar({
  a: 'In the presence of a peroxide, hydrogen bromide adds to propene to give 1-bromopropane.',
  r: 'The peroxide effect proceeds through a carbocation intermediate formed by the attack of H⁺ on the double bond.',
  key: 'c',
  sol: 'A is true. R is false: the peroxide effect is a free-radical chain, with a bromine radical adding first and a secondary radical as intermediate — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('cistrans-ar', ar({
  a: 'trans-But-2-ene has a higher melting point than cis-but-2-ene.',
  r: 'Both cis-but-2-ene and trans-but-2-ene decolourise bromine water.',
  key: 'b',
  sol: 'Both are true (melting points −105.5 °C and −138.9 °C; both are alkenes that add bromine). The higher melting point of the trans isomer comes from its symmetry and better crystal packing, not from its reaction with bromine, so R does not explain A — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('baeyer-ar', ar({
  a: 'Cold dilute alkaline potassium permanganate oxidises ethene to ethanoic acid.',
  r: 'The purple colour of the permanganate is retained throughout the reaction.',
  key: 'd',
  sol: 'Both are false: the product is ethane-1,2-diol, and the purple colour disappears as a brown precipitate of MnO₂ forms — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('ozon-ar', ar({
  a: 'Ozonolysis of but-2-ene, followed by reduction with zinc and water, gives two molecules of ethanal.',
  r: 'Reductive work-up with zinc converts the ozonide directly into carboxylic acids.',
  key: 'c',
  sol: 'A is true: the C=C is cut and each CHCH₃ carbon becomes CH₃CHO. R is false: reductive work-up gives aldehydes and ketones; oxidation to acids needs an oxidising work-up (or hot KMnO₄) — option (c).',
  d: 3, c: 'analysis', t: [5],
}));
add('saytz-ar', ar({
  a: '2-Bromobutane gives mainly but-2-ene when heated with alcoholic potassium hydroxide.',
  r: 'Alkenes are insoluble in water.',
  key: 'b',
  sol: 'Both are true. The preference for but-2-ene follows from Saytzeff\'s rule (the more substituted alkene is more stable); solubility in water has no bearing on it — option (b).',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- true-false, fill, match
add('pi-tf', tf({
  stem: 'The π bond in ethene is formed by the sideways overlap of unhybridised p orbitals, and its electron cloud lies above and below the plane of the molecule.',
  key: 't',
  sol: 'True. The p orbitals are perpendicular to the plane of the σ framework, so their overlap places the π cloud above and below it.',
  d: 1, c: 'understanding', t: [1],
}));
add('perox-tf', tf({
  stem: 'In the presence of benzoyl peroxide, hydrogen bromide adds to propene to give mainly 2-bromopropane.',
  key: 'f',
  sol: 'False. With a peroxide the radical mechanism operates and the main product is 1-bromopropane (anti-Markownikoff); 2-bromopropane is formed without peroxide.',
  d: 2, c: 'understanding', t: [4],
}));
add('alk-tf', tf({
  stem: 'Alkenes are insoluble in water and are less dense than water.',
  key: 't',
  sol: 'True. Alkenes are non-polar or only weakly polar and cannot hydrogen bond with water; their densities are below 1 g mL⁻¹.',
  d: 1, c: 'recall', t: [3],
}));
add('ozonide-fill', fill({
  stem: 'Ozone adds to the C=C bond of an alkene to form an unstable cyclic compound called an ___.',
  acc: [['ozonide', 'ozonides']],
  sol: 'An **ozonide**, which is decomposed by zinc and water to carbonyl compounds.',
  d: 1, c: 'recall', t: [5],
}));
add('bond-fill', fill({
  stem: 'The length of the carbon–carbon double bond in ethene is about ___ pm.',
  acc: [['134', '133', '135']],
  sol: 'About **134** pm (shorter than the 154 pm of a C–C single bond).',
  d: 1, c: 'recall', t: [1],
}));
add('sp2-fill', fill({
  stem: 'Each carbon atom of ethene is ___ hybridised.',
  acc: [['sp2', 'sp²']],
  sol: '**sp²** hybridised: three σ bonds in one plane and one unhybridised p orbital for the π bond.',
  d: 1, c: 'recall', t: [1],
}));
add('prep-match', match({
  stem: 'Match each preparation of an alkene in Column I with the reagent or condition in Column II.',
  pairs: [
    ['Dehydration of ethanol', 'Concentrated H₂SO₄ at 443 K'],
    ['Dehydrohalogenation of bromoethane', 'Alcoholic KOH, heat'],
    ['Dehalogenation of 1,2-dibromoethane', 'Zinc dust in ethanol'],
    ['Reduction of but-2-yne to cis-but-2-ene', 'H₂ with Lindlar catalyst'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Ethanol loses water with hot conc. H₂SO₄; alkyl halides lose HX with alcoholic KOH; vicinal dihalides lose X₂ with zinc; Lindlar catalyst gives the cis alkene.',
  d: 2, c: 'understanding', t: [2],
}));
add('prod-match', match({
  stem: 'Match each reaction of propene or ethene in Column I with its main organic product in Column II.',
  pairs: [
    ['Propene + HBr (no peroxide)', '2-Bromopropane'],
    ['Propene + HBr (with peroxide)', '1-Bromopropane'],
    ['Ethene + cold dilute alkaline KMnO₄', 'Ethane-1,2-diol'],
    ['Propene + H₂ over Ni', 'Propane'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Markownikoff addition gives 2-bromopropane; the peroxide effect gives 1-bromopropane; the cold alkaline reagent gives the diol; hydrogenation gives the alkane.',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- numericals
{
  const m = 4.2;
  const M = 42; // C3H6
  const n = m / M; // 0.100 mol
  const V = n * MV; // 2.24 L
  add('h2-num', num({
    stem: `Propene (${m.toFixed(2)} g) is completely hydrogenated over a nickel catalyst. What volume of hydrogen, in litres at STP, is needed? (C = 12, H = 1; molar volume ${MV} L)`,
    value: 2.24, tol: 0.01, unit: 'L',
    sol: r`$M(\text{C}_3\text{H}_6) = 42\ \text{g mol}^{-1}$, so $n = ${m.toFixed(2)} \div 42 = ${n.toFixed(3)}\ \text{mol}$. One mole of propene takes one mole of H₂: $V = ${n.toFixed(3)} \times ${MV} = ${V.toFixed(2)}\ \text{L}$.`,
    scheme: [['n(propene) = 0.100 mol and 1 : 1 ratio', 0.5], ['V = 2.24 L', 0.5]],
    d: 2, c: 'application', t: [4],
  }), () => near(V, 2.24, 0.001) || 'V');
}
{
  const mA = 2.8;
  const mB = 8.0;
  const nB = mB / 160;
  const M = mA / nB; // 56
  const n = M / 14;
  add('brom-num', num({
    stem: `An alkene of mass ${mA.toFixed(2)} g decolourises exactly ${mB.toFixed(2)} g of bromine (Br₂ = 160 g mol⁻¹). How many carbon atoms does one molecule of the alkene contain? (C = 12, H = 1)`,
    value: 4, tol: 0, marks: 2,
    sol: r`One mole of alkene adds one mole of Br₂. $n(\text{Br}_2) = ${mB.toFixed(2)} \div 160 = ${nB.toFixed(3)}\ \text{mol}$, so $M = ${mA.toFixed(2)} \div ${nB.toFixed(3)} = ${M.toFixed(0)}\ \text{g mol}^{-1}$. For $\text{C}_n\text{H}_{2n}$, $14n = ${M.toFixed(0)}$, so $n = ${n.toFixed(0)}$.`,
    scheme: [['Moles of Br₂ = moles of alkene = 0.0500', 1], ['M = 56 g mol⁻¹', 0.5], ['n = 4', 0.5]],
    d: 3, c: 'application', t: [4],
  }), () => near(n, 4, 0.001) || 'n');
}
{
  const m = 4.2;
  const n = m / 42; // 0.100
  const mE = n * 44; // 4.40 g ethanal
  add('ozon-num', num({
    stem: `Propene (${m.toFixed(2)} g) is subjected to ozonolysis with zinc and water, giving ethanal and methanal. Assuming complete conversion, what mass of ethanal, in grams, is formed? (C = 12, H = 1, O = 16)`,
    value: 4.4, tol: 0.05, unit: 'g',
    sol: r`CH₃CH=CH₂ gives one CH₃CHO and one HCHO per molecule. $n(\text{propene}) = ${m.toFixed(2)} \div 42 = ${n.toFixed(3)}\ \text{mol}$, so $n(\text{CH}_3\text{CHO}) = ${n.toFixed(3)}\ \text{mol}$ and $m = ${n.toFixed(3)} \times 44 = ${mE.toFixed(2)}\ \text{g}$.`,
    scheme: [['1 : 1 ratio, n = 0.100 mol', 0.5], ['m = 4.40 g', 0.5]],
    d: 3, c: 'application', t: [5],
  }), () => near(mE, 4.4, 0.001) || 'mE');
}
{
  const M = 63000;
  const unit = 42;
  const n = M / unit; // 1500
  add('poly-num', num({
    stem: `A sample of polypropene has an average molar mass of 63000 g mol⁻¹. The repeating unit, –CH(CH₃)–CH₂–, has a mass of ${unit} g mol⁻¹. What is the average number of repeating units in a chain?`,
    value: 1500, tol: 1,
    sol: r`$n = \dfrac{63000}{42} = ${n.toFixed(0)}$.`,
    scheme: [['n = molar mass of polymer ÷ mass of repeating unit', 0.5], ['1500', 0.5]],
    d: 2, c: 'understanding', t: [5],
  }), () => near(n, 1500, 0.001) || 'n');
}

// ---------------------------------------------------------------- short answers, 2 marks
add('bond-short', short({
  marks: 2,
  stem: 'Describe the bonding between the two carbon atoms of ethene in terms of hybridisation, naming the type of each bond.',
  model: 'Each carbon is sp² hybridised. One sp² orbital of each carbon overlaps head-on with the other to form the C–C σ bond (the other sp² orbitals form C–H σ bonds). The unhybridised p orbitals, perpendicular to the plane, overlap sideways to form a π bond above and below the plane. The double bond is therefore one σ bond and one π bond.',
  sol: 'sp² carbons; σ from sp²; π from p.',
  scheme: [['sp² hybridisation, σ bond by head-on overlap', 1], ['π bond by sideways overlap of p orbitals', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('geom-short', short({
  marks: 2,
  stem: 'But-2-ene shows cis–trans isomerism but but-1-ene does not. Explain this, naming the cause of the restricted rotation.',
  model: 'Rotation about the C=C bond is restricted because turning one carbon would break the π bond. Cis–trans isomers need two different groups on each doubly bonded carbon: in but-2-ene each such carbon carries H and CH₃, so two arrangements exist, but in but-1-ene C-1 carries two identical hydrogen atoms, so there is only one.',
  sol: 'π bond; two different groups on each carbon.',
  scheme: [['Restricted rotation due to the π bond', 1], ['Different groups on each carbon in but-2-ene; two H on C-1 of but-1-ene', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('dehydrEq-short', short({
  marks: 2,
  stem: 'A student prepares ethene in the laboratory from ethanol. Write the equation with the reagent and temperature, and say what is formed if the temperature is kept near 413 K with excess ethanol.',
  model: r`$\ce{CH3CH2OH ->[conc H2SO4][443 K] CH2=CH2 + H2O}$. With excess ethanol at about 413 K, ethoxyethane (diethyl ether) is formed instead.`,
  sol: 'Equation; ether at 413 K.',
  scheme: [['Equation with conc. H₂SO₄ and 443 K', 1.5], ['Ethoxyethane at 413 K', 0.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('vicEq-short', short({
  marks: 2,
  stem: 'Write the equation for the preparation of but-2-ene from 2,3-dibromobutane using zinc dust, and name the type of reaction.',
  model: r`$\ce{CH3CHBrCHBrCH3 + Zn -> CH3CH=CHCH3 + ZnBr2}$. The reaction is a dehalogenation (elimination of two bromine atoms from adjacent carbons).`,
  sol: 'Equation; dehalogenation.',
  scheme: [['Balanced equation', 1.5], ['Dehalogenation named', 0.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('kolbeAlk-short', short({
  marks: 2,
  stem: 'Aqueous potassium succinate is electrolysed in a cell with platinum electrodes. Write the overall equation and state which product is formed at each electrode.',
  model: r`$\ce{CH2(COOK)CH2COOK + 2H2O -> CH2=CH2 + 2CO2 + H2 + 2KOH}$. At the anode, the succinate ion loses two electrons and CO₂ to give ethene (with CO₂); at the cathode, hydrogen is liberated and the solution becomes alkaline (KOH).`,
  sol: 'Overall equation; anode ethene and CO₂; cathode H₂.',
  scheme: [['Balanced overall equation', 1], ['Ethene and CO₂ at the anode; H₂ at the cathode', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('alkyne-short', short({
  marks: 2,
  stem: 'Starting from hept-3-yne, name the reagents by which you could obtain (i) cis-hept-3-ene and (ii) trans-hept-3-ene.',
  model: 'cis-Hept-3-ene: hydrogen over Lindlar\'s catalyst (palladium on calcium carbonate, partly poisoned), which adds both hydrogens on the same side. trans-Hept-3-ene: sodium in liquid ammonia, which adds the hydrogens on opposite sides.',
  sol: 'Lindlar for cis; Na/NH₃ for trans.',
  scheme: [['Lindlar catalyst gives cis', 1], ['Na in liquid NH₃ gives trans', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('physcis-short', short({
  marks: 2,
  stem: 'cis-1,2-Dichloroethene boils at 60.3 °C and trans-1,2-dichloroethene at 47.5 °C. Explain the difference using dipole moments.',
  model: 'In the cis isomer the two C–Cl bond dipoles point to the same side and add up (net dipole moment about 1.9 D), so the molecules attract each other by extra dipole–dipole forces and the boiling point is higher. In the trans isomer the bond dipoles are equal and opposite and cancel (dipole moment zero), so only weaker dispersion forces act and the boiling point is lower.',
  sol: 'cis polar; trans dipoles cancel.',
  scheme: [['cis: bond dipoles add; net dipole moment; higher boiling point', 1], ['trans: dipoles cancel; zero dipole moment; lower boiling point', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('tests-short', short({
  marks: 2,
  stem: 'A laboratory assistant has two colourless gas jars, one of ethane and one of ethene. Describe two tests, with the observations, that distinguish them.',
  model: 'Bromine test: shake each gas with bromine in tetrachloromethane (or bromine water): ethene decolourises the red-brown solution (forming 1,2-dibromoethane), ethane does not. Baeyer\'s test: shake with cold dilute alkaline KMnO₄: with ethene the purple colour disappears and a brown precipitate of MnO₂ forms; ethane gives no change.',
  sol: 'Bromine decolourised; permanganate decolourised.',
  scheme: [['Bromine test with observation', 1], ['Baeyer\'s test with observation', 1]],
  d: 2, c: 'application', t: [4, 5],
}));
add('poly-short', short({
  marks: 2,
  stem: 'Write the equation for the polymerisation of ethene and name one condition that gives low-density polythene and one catalyst that gives high-density polythene.',
  model: 'n CH₂=CH₂ → (–CH₂–CH₂–)ₙ. Low-density polythene is made at high pressure (1000–2000 atm) and about 350–570 K with a trace of oxygen as initiator. High-density polythene is made with a Ziegler–Natta catalyst (triethylaluminium and titanium(IV) chloride) at low pressure.',
  sol: 'Equation; condition; catalyst.',
  scheme: [['Equation', 1], ['High pressure and trace oxygen for low density', 0.5], ['Ziegler–Natta catalyst for high density', 0.5]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- short answers, 3 marks
add('saytz-short3', short({
  marks: 3,
  stem: 'A student heats 2-bromopentane with alcoholic potassium hydroxide. Write the equation for the formation of the major product, name the minor product, and state the rule that decides which alkene is major.',
  model: r`Major: $\ce{CH3CHBrCH2CH2CH3 + KOH -> CH3CH=CHCH2CH3 + KBr + H2O}$ (pent-2-ene). Minor: pent-1-ene. By Saytzeff's rule, the more substituted (more stable) alkene is the major product: pent-2-ene has two alkyl groups on the C=C, pent-1-ene only one, because hydrogen is lost mainly from the β-carbon with fewer hydrogens (C-3).`,
  sol: 'Equation; pent-1-ene; Saytzeff.',
  scheme: [['Balanced equation for pent-2-ene', 1], ['Pent-1-ene as minor product', 0.5], ['Saytzeff\'s rule with reason', 1.5]],
  d: 3, c: 'application', t: [2],
}));
add('mech-short3', short({
  marks: 3,
  stem: 'Using curved arrows described in words, write the mechanism for the addition of hydrogen bromide to 2-methylpropene and name the carbocation and the product.',
  model: 'Step 1 (slow): the π electrons of (CH₃)₂C=CH₂ attack the hydrogen of H–Br; H bonds to the CH₂ carbon and Br⁻ leaves, giving the tertiary carbocation (CH₃)₃C⁺. Step 2 (fast): Br⁻ donates a lone pair to the positive carbon, giving (CH₃)₃CBr, 2-bromo-2-methylpropane. The tertiary carbocation is the most stable possible intermediate, which is why Markownikoff\'s product forms.',
  sol: 'Step 1; step 2; product.',
  scheme: [['Step 1: attack of π electrons on H; tertiary carbocation', 1.5], ['Step 2: attack of Br⁻', 1], ['2-Bromo-2-methylpropane named', 0.5]],
  d: 3, c: 'application', t: [4],
}));
add('perox-short3', short({
  marks: 3,
  stem: 'Explain, with equations for the steps, how the addition of HBr to propene in the presence of benzoyl peroxide gives 1-bromopropane and not 2-bromopropane.',
  model: 'The peroxide splits into radicals which abstract H from HBr to give Br•. Propagation: Br• adds to the CH₂ end of CH₃CH=CH₂, giving the more stable secondary radical CH₃–C•H–CH₂Br; this takes H from HBr to give CH₃CH₂CH₂Br (1-bromopropane) and a new Br•. Because the first attack is by the bromine atom on the terminal carbon, the bromine ends up on C-1 (anti-Markownikoff).',
  sol: 'Br• from peroxide; secondary radical; 1-bromopropane.',
  scheme: [['Br• formed by the peroxide', 0.5], ['Br• adds to C-1 to give the secondary radical', 1.5], ['Radical takes H from HBr; 1-bromopropane', 1]],
  d: 3, c: 'application', t: [4],
}));
add('hydrat-short3', short({
  marks: 3,
  stem: 'Propene is passed into cold concentrated sulphuric acid and the product is then warmed with water. Write the two equations and name the final organic product, giving the rule that decides its structure.',
  model: r`$\ce{CH3CH=CH2 + H2SO4 -> CH3CH(OSO3H)CH3}$ (propan-2-yl hydrogensulphate), then $\ce{CH3CH(OSO3H)CH3 + H2O -> CH3CH(OH)CH3 + H2SO4}$. The final product is propan-2-ol, because Markownikoff's rule puts the negative group (–OSO₃H) on the carbon with fewer hydrogens.`,
  sol: 'Two equations; propan-2-ol; Markownikoff.',
  scheme: [['First equation', 1], ['Second equation and propan-2-ol', 1], ['Markownikoff\'s rule', 1]],
  d: 3, c: 'application', t: [4],
}));
add('ozon-short3', short({
  marks: 3,
  stem: 'An alkene A of formula C₆H₁₂ gives propanone and propanal on ozonolysis with zinc and water. Deduce its structure and name, and give the products when A is boiled with hot concentrated potassium permanganate.',
  model: 'Joining the carbonyl carbons of (CH₃)₂C=O and CH₃CH₂CHO by a C=C bond gives (CH₃)₂C=CHCH₂CH₃, 2-methylpent-2-ene (C₃H₆O + C₃H₆O = C₆H₁₂O₂, which is C₆H₁₂ plus two O atoms). With hot KMnO₄ the =CHR end is oxidised to a carboxylic acid, so the products are propanone and propanoic acid.',
  sol: '2-Methylpent-2-ene; propanone and propanoic acid.',
  scheme: [['Structure obtained by joining the carbonyl carbons', 1], ['Name 2-methylpent-2-ene', 0.5], ['Propanone and propanoic acid with hot KMnO₄', 1.5]],
  d: 3, c: 'analysis', t: [5],
}));
add('baeyer-short3', short({
  marks: 3,
  stem: 'Compare the products obtained when propene is treated with (i) cold dilute alkaline potassium permanganate and (ii) hot concentrated potassium permanganate, and state the visible change in (i).',
  model: '(i) Cold dilute alkaline KMnO₄ adds two OH groups across the double bond: CH₃CH=CH₂ + [O] + H₂O gives CH₃CH(OH)CH₂OH, propane-1,2-diol; the purple colour disappears and a brown precipitate of MnO₂ forms (Baeyer\'s test). (ii) Hot concentrated KMnO₄ cleaves the C=C bond: the CH₃CH= end gives ethanoic acid and the =CH₂ end gives CO₂ and water.',
  sol: 'Diol with colour change; cleavage to ethanoic acid and CO₂.',
  scheme: [['(i) diol named', 1], ['(i) purple to brown precipitate', 0.5], ['(ii) ethanoic acid and CO₂ and water', 1.5]],
  d: 3, c: 'application', t: [5],
}));
add('stab-short3', short({
  marks: 3,
  stem: 'Explain why a tertiary carbocation is more stable than a primary carbocation, using the ideas of inductive effect and hyperconjugation, and say how this controls the product of the addition of HBr to propene.',
  model: 'Alkyl groups push electrons towards the positive carbon (+I effect) and the C–H bonds on the adjacent carbons overlap with its empty p orbital (hyperconjugation), spreading the charge; a tertiary cation has three alkyl groups and nine such C–H bonds, a primary cation one alkyl group and three. So the stability order is tertiary > secondary > primary. In propene, H⁺ adds to give the secondary carbocation rather than the primary one, so Br⁻ ends on C-2 and 2-bromopropane is the main product.',
  sol: '+I and hyperconjugation; order; product.',
  scheme: [['+I effect of alkyl groups', 0.5], ['Hyperconjugation with more C–H bonds', 1], ['Link to the secondary carbocation and 2-bromopropane', 1.5]],
  d: 3, c: 'analysis', t: [4],
}));
{
  const V = 5.6;
  const n = V / MV; // 0.250
  const vO2 = 3 * n * MV; // 16.8
  const mCO2 = 2 * n * 44; // 22.0
  const mH2O = 2 * n * 18; // 9.0
  add('comb-short3', short({
    marks: 3,
    stem: `A sample of ${V.toFixed(2)} L of ethene, measured at STP, is burnt completely in air. Write the balanced equation and calculate the volume of oxygen consumed at STP and the mass of carbon dioxide formed. (C = 12, O = 16; molar volume ${MV} L)`,
    model: r`$\ce{C2H4 + 3O2 -> 2CO2 + 2H2O}$. $n(\text{C}_2\text{H}_4) = 5.60 \div 22.4 = 0.250$ mol. Oxygen: $3 \times 0.250 = 0.750$ mol, so $V = 0.750 \times 22.4 = 16.8$ L. Carbon dioxide: $2 \times 0.250 = 0.500$ mol, so mass $= 0.500 \times 44 = 22.0$ g.`,
    sol: 'Equation; oxygen 16.8 L; CO₂ 22.0 g.',
    scheme: [['Balanced equation', 1], ['Oxygen 16.8 L', 1], ['Carbon dioxide 22.0 g', 1]],
    d: 3, c: 'application', t: [5],
  }), () => near(vO2, 16.8, 0.001) && near(mCO2, 22, 0.001) && near(mH2O, 9, 0.001) || 'comb');
}
add('cistrans-short3', short({
  marks: 3,
  stem: 'cis-But-2-ene has a boiling point of 3.7 °C and a melting point of −138.9 °C; trans-but-2-ene has a boiling point of 0.9 °C and a melting point of −105.5 °C. Identify which property is higher for each isomer and explain both orders.',
  model: 'The cis isomer has the higher boiling point (3.7 °C) and the trans isomer the higher melting point (−105.5 °C). In the cis form the bond dipoles do not cancel, so the slight polarity adds dipole–dipole attraction in the liquid and raises the boiling point. The trans form is symmetrical (zero dipole moment) and packs more regularly in the crystal lattice, so more energy is needed to melt it.',
  sol: 'cis higher bp; trans higher mp; dipole and packing.',
  scheme: [['cis higher boiling point and trans higher melting point', 1], ['Dipole–dipole forces explain the boiling points', 1], ['Symmetry and packing explain the melting points', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('poly-short3', short({
  marks: 3,
  stem: 'Write equations for the polymerisation of (i) ethene and (ii) propene, name the polymers, and give one use of each.',
  model: '(i) n CH₂=CH₂ → (–CH₂–CH₂–)ₙ, polythene (polyethylene), used for carrier bags, films and cable insulation. (ii) n CH₃CH=CH₂ → (–CH(CH₃)–CH₂–)ₙ, polypropene, used for ropes, crates and fibres.',
  sol: 'Two equations; names; uses.',
  scheme: [['Polythene equation and name', 1], ['Polypropene equation and name', 1], ['One use of each', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- long answers (5 marks, in parts)
add('struct-long', long({
  stem: '(a) Describe the structure of the C=C bond in ethene in terms of hybridisation, σ and π bonds, giving the approximate bond angle and the bond length. [2]\n\n(b) Write the structures and IUPAC names of the three structural isomers of C₄H₈ that are alkenes, and say which of them shows geometrical isomerism. [2]\n\n(c) Why does the π bond prevent rotation about the C=C bond? [1]',
  model: '(a) Each carbon is sp² hybridised: the three sp² orbitals form σ bonds (one C–C, two C–H) in one plane at about 120° (H–C–H 117°); the unhybridised p orbitals overlap sideways to form a π bond above and below the plane. The C=C length is about 134 pm. (b) But-1-ene, CH₂=CHCH₂CH₃; but-2-ene, CH₃CH=CHCH₃; 2-methylpropene, (CH₃)₂C=CH₂. Only but-2-ene shows geometrical (cis–trans) isomerism, because each doubly bonded carbon carries two different groups. (c) Rotating one carbon would turn its p orbital away from that of the other, breaking the π overlap, which needs a large amount of energy.',
  sol: 'sp² structure; three isomers; π overlap.',
  scheme: [['(a) sp², σ and π bonds', 1], ['(a) about 120° and 134 pm', 1], ['(b) three structures named', 1], ['(b) but-2-ene shows cis–trans', 1], ['(c) rotation breaks the π overlap', 1]],
  d: 3, c: 'application', t: [1],
}));
add('prep-long', long({
  stem: '(a) Write equations, with conditions, for preparing propene from (i) propan-2-ol and (ii) 1,2-dibromopropane. [2]\n\n(b) 2-Bromo-2,3-dimethylbutane is heated with alcoholic KOH. Name the major and the minor alkene and say which rule decides the major product. [2]\n\n(c) State how hex-2-yne can be converted into trans-hex-2-ene. [1]',
  model: r`(a) (i) $\ce{CH3CH(OH)CH3 ->[conc H2SO4][443 K] CH3CH=CH2 + H2O}$. (ii) $\ce{CH3CHBrCH2Br + Zn -> CH3CH=CH2 + ZnBr2}$. (b) The carbon with Br is C-2; the β-hydrogen on the tertiary C-3 is lost to give 2,3-dimethylbut-2-ene (major, four alkyl groups on C=C); loss from a CH₃ group gives 2,3-dimethylbut-1-ene (minor). Saytzeff's rule: the more substituted alkene predominates. (c) Treat hex-2-yne with sodium in liquid ammonia (anti addition of hydrogen).`,
  sol: 'Propene preparations; Saytzeff; Na/NH₃.',
  scheme: [['(a)(i) dehydration equation', 1], ['(a)(ii) dehalogenation equation', 1], ['(b) major and minor alkenes', 1], ['(b) Saytzeff\'s rule', 1], ['(c) sodium in liquid ammonia', 1]],
  d: 3, c: 'application', t: [2],
}));
add('add-long', long({
  stem: '(a) Write the mechanism of the addition of hydrogen bromide to propene in the absence of a peroxide, showing the intermediate, and name the major product. [3]\n\n(b) What is the major product when the reaction is carried out in the presence of benzoyl peroxide? Write the two propagation steps. [2]',
  model: '(a) Step 1 (slow): the π electrons of CH₃CH=CH₂ attack the hydrogen of H–Br; H bonds to C-1 and Br⁻ departs, giving the secondary carbocation CH₃–C⁺H–CH₃. Step 2 (fast): Br⁻ attacks the positive carbon to give CH₃CHBrCH₃, 2-bromopropane (Markownikoff product, via the more stable secondary carbocation). (b) The major product is 1-bromopropane (peroxide effect). Propagation: CH₃CH=CH₂ + Br• → CH₃–C•H–CH₂Br; CH₃–C•H–CH₂Br + HBr → CH₃CH₂CH₂Br + Br•.',
  sol: 'Mechanism; 2-bromopropane; peroxide effect.',
  scheme: [['(a) step 1 with the carbocation', 1.5], ['(a) step 2 and 2-bromopropane', 1.5], ['(b) 1-bromopropane', 0.5], ['(b) two propagation steps', 1.5]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [4],
}));
{
  const V = 1.12;
  const n = V / MV; // 0.0500
  const vCO2 = 2 * n * MV; // 2.24
  add('ox-long', long({
    stem: `(a) Propene is shaken with cold dilute alkaline potassium permanganate. Name the organic product and describe what is seen. [2]\n\n(b) Write the equation for the polymerisation of ethene and name the polymer. [1]\n\n(c) Ethene (${V.toFixed(2)} L at STP) is burnt completely. Calculate the volume of carbon dioxide formed at STP (molar volume ${MV} L), and say what kind of flame ethene burns with. [2]`,
    model: `(a) Propane-1,2-diol, CH₃CH(OH)CH₂OH; the purple colour of the permanganate disappears and a brown precipitate of manganese(IV) oxide forms. (b) n CH₂=CH₂ → (–CH₂–CH₂–)ₙ; the polymer is polythene (polyethylene). (c) C₂H₄ + 3O₂ → 2CO₂ + 2H₂O; n(C₂H₄) = ${V.toFixed(2)} ÷ 22.4 = ${n.toFixed(3)} mol, n(CO₂) = 2 × ${n.toFixed(3)} = ${(2 * n).toFixed(3)} mol, so V = ${(2 * n).toFixed(3)} × 22.4 = ${vCO2.toFixed(2)} L. Ethene burns with a luminous, slightly smoky flame.`,
    sol: 'Diol and colour change; polythene; 2.24 L.',
    scheme: [['(a) propane-1,2-diol', 1], ['(a) purple to brown precipitate', 1], ['(b) equation and polythene', 1], ['(c) 2.24 L', 1], ['(c) luminous smoky flame', 1]],
    d: 3, c: 'application', t: [5],
  }), () => near(vCO2, 2.24, 0.001) || 'vCO2');
}
{
  const mX = 4.9;
  const M = 98;
  const n = mX / M; // 0.0500
  const mB = n * 72; // 3.60 g butanone
  add('ozon-long', long({
    stem: `An alkene X, C₇H₁₄, gives only propanal and butanone when it is treated with ozone and then with zinc and water.\n\n(a) Deduce the structure of X and give its IUPAC name. [2]\n\n(b) Name the two products formed when X is boiled with hot concentrated potassium permanganate. [1]\n\n(c) Does X show cis–trans isomerism? Give a reason. [1]\n\n(d) What mass of butanone, in grams, can be obtained from ${mX.toFixed(1)} g of X? (C = 12, H = 1, O = 16; M(butanone) = 72 g mol⁻¹) [1]`,
    model: `(a) Join the carbonyl carbons of CH₃CH₂CHO and CH₃COCH₂CH₃ by C=C: CH₃CH₂CH=C(CH₃)CH₂CH₃, which is 3-methylhex-3-ene (C₃H₆O + C₄H₈O = C₇H₁₄O₂, that is C₇H₁₄ plus two O atoms). (b) Propanoic acid and butanone. (c) Yes: C-3 carries H and C₂H₅, and C-4 carries CH₃ and C₂H₅, so each doubly bonded carbon has two different groups. (d) n(X) = ${mX.toFixed(1)} ÷ ${M} = ${n.toFixed(3)} mol; 1 mol X gives 1 mol butanone, so mass = ${n.toFixed(3)} × 72 = ${mB.toFixed(1)} g.`,
    sol: '3-Methylhex-3-ene; propanoic acid and butanone; yes; 3.6 g.',
    scheme: [['(a) structure from the carbonyl products', 1], ['(a) name 3-methylhex-3-ene', 1], ['(b) propanoic acid and butanone', 1], ['(c) yes, two different groups on each carbon', 0.5], ['(d) 3.6 g', 1.5]].slice(0, 5),
    d: 4, c: 'analysis', t: [5],
  }), () => near(mB, 3.6, 0.001) || 'mB');
}
add('phys-long', long({
  stem: 'The following data are for isomeric alkenes and for an alkane: cis-but-2-ene, bp 3.7 °C, mp −138.9 °C; trans-but-2-ene, bp 0.9 °C, mp −105.5 °C; pent-1-ene, bp 30.0 °C; pentane, bp 36.1 °C.\n\n(a) Which of the two butene isomers is slightly polar? Explain how this shows in its boiling point. [2]\n\n(b) Why does the trans isomer have the higher melting point? [2]\n\n(c) Pent-1-ene and pentane have similar boiling points. Why? [1]',
  model: '(a) The cis isomer: its two C–CH₃ bond dipoles point to the same side and do not cancel, giving a small dipole moment. The resulting extra dipole–dipole attraction raises its boiling point (3.7 °C against 0.9 °C). (b) The trans isomer is more symmetrical, so its molecules pack more closely and regularly in the crystal; more energy is needed to break the lattice, giving the higher melting point. (c) Both are non-polar or only weakly polar molecules of almost equal size and shape, held by London dispersion forces of similar strength.',
  sol: 'cis polar; symmetry and packing; similar dispersion forces.',
  scheme: [['(a) cis is polar because dipoles do not cancel', 1], ['(a) dipole–dipole attraction raises the boiling point', 1], ['(b) trans is symmetrical and packs better', 1], ['(b) more energy to break the crystal lattice', 1], ['(c) similar size and dispersion forces', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ch09 Hydrocarbons — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Numbers are computed here, interpolated into stems and solutions, and re-solved by the checks passed to add().
import { mk, add, r, dec, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- helpers (all computed in JS)
const AM = { C: 12, H: 1, O: 16, Ca: 40 };
const F = (C, H, O = 0) => ({ C, H, O });
const mass = (f) => Object.entries(f).reduce((s, [e, n]) => s + AM[e] * n, 0);
const same = (a, b) => a.C === b.C && a.H === b.H && a.O === b.O;
const CARB = { methanal: F(1, 2, 1), ethanal: F(2, 4, 1), propanal: F(3, 6, 1), butanal: F(4, 8, 1), propanone: F(3, 6, 1), butanone: F(4, 8, 1) };
/** Ozonolysis in reverse: the two carbonyl fragments are joined by C=C and their oxygens removed. */
const alkeneFrom = (a, b) => F(CARB[a].C + CARB[b].C, CARB[a].H + CARB[b].H, 0);
const isAlkene = (f) => f.O === 0 && f.H === 2 * f.C;
const huckel = (e) => e >= 2 && (e - 2) % 4 === 0;
const E = (theta) => 6.25 * (1 + Math.cos((3 * theta * Math.PI) / 180)); // theta from the eclipsed form, kJ mol-1

// ---------------------------------------------------------------- t01 alkanes
add('name-mcq', mcq({
  stem: r`The IUPAC name of $\ce{(CH3)2CHCH(CH2CH3)2}$ is:`,
  right: '3-ethyl-2-methylpentane',
  wrong: ['2-ethyl-3-methylpentane', '2,3-diethylbutane', '2-methyl-3-ethylpentane'],
  sol: 'Two five-carbon chains are possible; the one carrying two substituents (methyl and ethyl) is chosen, and numbering from the methyl end gives the locants 2 and 3. Substituents are listed alphabetically, ethyl before methyl: 3-ethyl-2-methylpentane — option (@K). Option (@3) has the substituents out of alphabetical order.',
  d: 2, c: 'application', t: [1],
}), () => same(F(3 + 1 + 4, 0 + 0), F(8, 0)) || 'carbon count');
add('isomers-mcq', mcq({
  stem: r`How many chain isomers (including the straight-chain compound) has hexane, $\ce{C6H14}$?`,
  right: '5',
  wrong: ['4', '6', '7'],
  sol: 'Hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane and 2,3-dimethylbutane: five isomers — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('wurtz-mcq', mcq({
  stem: '2-Bromobutane is warmed with sodium metal in dry ether. The alkane formed is:',
  right: '3,4-dimethylhexane',
  wrong: ['octane', '2,3-dimethylhexane', '3-methylheptane'],
  sol: r`Two $\ce{CH3CH2CH(CH3)-}$ groups join through their C2 atoms: $\ce{CH3CH2CH(CH3)CH(CH3)CH2CH3}$. The longest chain has six carbons with methyl groups on C3 and C4 — option (@K). Octane (@1) would need 1-bromobutane.`,
  d: 3, c: 'application', t: [1],
}));
add('decarb-mcq', mcq({
  stem: 'Sodium butanoate is heated strongly with soda lime (NaOH and CaO). The hydrocarbon formed is:',
  right: 'propane',
  wrong: ['butane', 'ethane', 'pentane'],
  sol: r`Decarboxylation removes the carboxylate carbon as carbonate: $\ce{CH3CH2CH2COONa + NaOH -> CH3CH2CH3 + Na2CO3}$. The alkane has one carbon less than the salt, so propane — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('conf-mcq', mcq({
  stem: 'Which statement about the conformations of ethane is correct?',
  right: 'The staggered form has the lower energy because the C–H bonds of the two carbons are as far apart as possible.',
  wrong: ['The eclipsed form has the lower energy because the hydrogen atoms are closest together.', 'The two forms have the same energy, since the C–C bond is a single bond.', 'The staggered form has a dihedral angle of 0°.'],
  sol: 'In the staggered form the bonding electron pairs of the two carbons are farthest apart, so torsional strain is minimal; the eclipsed form is about 12.5 kJ mol⁻¹ higher — option (@K). The dihedral angle of the staggered form is 60° (@3 is wrong).',
  d: 2, c: 'understanding', t: [1],
}));
add('arom-mcq', mcq({
  stem: 'n-Heptane is passed over a Cr₂O₃-based catalyst at 773 K and high pressure. The aromatic hydrocarbon formed is:',
  right: 'methylbenzene',
  wrong: ['benzene', 'ethylbenzene', '1,2-dimethylbenzene'],
  sol: r`Cyclisation and dehydrogenation: $\ce{C7H16 -> C7H8 + 4H2}$, with seven carbons retained as a methyl-substituted ring — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('dihedral-mcq', mcq({
  stem: 'In the staggered conformation of ethane, the dihedral angle between a hydrogen on the front carbon and the nearest hydrogen on the back carbon is:',
  right: '60°',
  wrong: ['0°', '90°', '120°'],
  sol: 'The three hydrogens on each carbon are 120° apart, and in the staggered form each back hydrogen lies midway between two front hydrogens, so the angle is 60° — option (@K). 0° is the eclipsed form.',
  d: 1, c: 'understanding', t: [1],
}));
add('propagation-mcq', mcq({
  stem: 'In the chlorination of ethane in sunlight, which of these is a chain-propagation step?',
  right: 'CH₃CH₂• + Cl₂ → CH₃CH₂Cl + Cl•',
  wrong: ['Cl₂ → 2Cl•', 'Cl• + Cl• → Cl₂', 'CH₃CH₂• + Cl• → CH₃CH₂Cl'],
  sol: 'A propagation step consumes one radical and forms another, so the chain continues: the ethyl radical reacts with Cl₂ to give the product and a new Cl• — option (@K). (@1) is initiation; (@2) and (@3) are termination steps in which two radicals disappear.',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 alkenes
add('geo-mcq', mcq({
  stem: 'Which of these alkenes can exist as cis and trans isomers?',
  right: 'pent-2-ene',
  wrong: ['pent-1-ene', '2-methylbut-2-ene', '2-methylprop-1-ene'],
  sol: 'Each carbon of the double bond must carry two different groups. In pent-2-ene, C2 has H and CH₃ and C3 has H and C₂H₅ — option (@K). In the others one double-bond carbon has two identical groups (H, H or CH₃, CH₃).',
  d: 2, c: 'application', t: [2],
}));
add('na-nh3-mcq', mcq({
  stem: 'Hex-3-yne is treated with sodium in liquid ammonia. The main product is:',
  right: 'trans-hex-3-ene',
  wrong: ['cis-hex-3-ene', 'hexane', 'hex-1-ene'],
  sol: 'Sodium in liquid ammonia reduces an internal alkyne to the trans alkene, while hydrogen with Lindlar catalyst gives the cis alkene — option (@K). Hexane (@2) needs H₂/Ni.',
  d: 2, c: 'application', t: [2],
}));
add('markov-mcq', mcq({
  stem: '2-Methylbut-2-ene, $\\ce{(CH3)2C=CHCH3}$, reacts with HI. The major product is:',
  right: '2-iodo-2-methylbutane',
  wrong: ['2-iodo-3-methylbutane', '1-iodo-2-methylbutane', '1-iodo-3-methylbutane'],
  sol: 'By Markovnikov’s rule, H adds to the carbon with one hydrogen (C3) and I to C2, the carbon with none. The intermediate is a tertiary carbocation, which gives 2-iodo-2-methylbutane — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('peroxide-mcq', mcq({
  stem: r`3-Methylbut-1-ene, $\ce{(CH3)2CHCH=CH2}$, is treated with HBr in the presence of benzoyl peroxide. The main product is:`,
  right: '1-bromo-3-methylbutane',
  wrong: ['2-bromo-3-methylbutane', '2-bromo-2-methylbutane', '1-bromo-2-methylbutane'],
  sol: 'With peroxide, HBr adds through bromine radicals: Br• attacks the terminal carbon to give the more stable secondary radical, so bromine ends up on C1 — option (@K). Without peroxide the product would be 2-bromo-3-methylbutane (@1) or its rearranged isomer (@2).',
  d: 3, c: 'application', t: [2],
}));
add('ozone-mcq', mcq({
  stem: 'An alkene gives only propanone and methanal when it is treated with ozone and then with zinc and water. The alkene is:',
  right: '2-methylprop-1-ene',
  wrong: ['but-1-ene', 'but-2-ene', '2-methylbut-2-ene'],
  sol: r`Join the carbonyl carbons and remove the oxygens: $\ce{(CH3)2C=CH2}$, formula $\ce{C4H8}$ (3 + 1 carbons) — option (@K). But-2-ene (@2) gives two ethanal.`,
  d: 2, c: 'application', t: [2],
}), () => (isAlkene(alkeneFrom('propanone', 'methanal')) && same(alkeneFrom('propanone', 'methanal'), F(4, 8))) || 'ozonolysis formula');
add('baeyer-mcq', mcq({
  stem: 'Cold, dilute, alkaline potassium permanganate is added to a liquid hydrocarbon X. The purple colour disappears and a brown precipitate forms. X could be:',
  right: 'propene',
  wrong: ['propane', 'cyclohexane', 'benzene'],
  sol: 'Alkenes are oxidised to vicinal diols (Baeyer’s test) while MnO₄⁻ is reduced to brown MnO₂ — option (@K). Alkanes and benzene do not react in the cold.',
  d: 2, c: 'application', t: [2],
}));
add('carbocation-mcq', mcq({
  stem: 'Which carbocation is the most stable?',
  right: '(CH₃)₃C⁺',
  wrong: ['CH₃CH₂⁺', '(CH₃)₂CH⁺', 'CH₃⁺'],
  sol: 'Three alkyl groups donate electron density (inductive effect and hyperconjugation) and spread the charge, so the tertiary carbocation is the most stable — option (@K). The order is 3° > 2° > 1° > methyl.',
  d: 1, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 alkynes
add('hybrid-mcq', mcq({
  stem: 'In propyne, CH₃–C≡C–H, the hybridisation of the three carbon atoms, starting from the methyl carbon, is:',
  right: 'sp³, sp, sp',
  wrong: ['sp³, sp², sp', 'sp², sp, sp', 'sp³, sp³, sp'],
  sol: 'The methyl carbon has four σ bonds (sp³); each triple-bond carbon has two σ bonds and two π bonds (sp) — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('hbr-alkyne-mcq', mcq({
  stem: 'Excess hydrogen bromide is passed into but-1-yne. The product is:',
  right: '2,2-dibromobutane',
  wrong: ['1,1-dibromobutane', '1,2-dibromobutane', '2,3-dibromobutane'],
  sol: r`Each addition follows Markovnikov’s rule, so both bromine atoms end on C2: $\ce{CH#CCH2CH3 + 2HBr -> CH3CBr2CH2CH3}$ — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('butyne-hydr-mcq', mcq({
  stem: 'But-1-yne is shaken with dilute sulfuric acid containing mercury(II) sulfate. The final product is:',
  right: 'butan-2-one',
  wrong: ['butanal', 'butan-2-ol', 'butanoic acid'],
  sol: 'Water adds by Markovnikov’s rule to give the enol CH₂=C(OH)CH₂CH₃, which rearranges (tautomerism) to the ketone butan-2-one — option (@K). Only ethyne gives an aldehyde.',
  d: 3, c: 'application', t: [3],
}));
add('terminal-mcq', mcq({
  stem: 'Which of these hydrocarbons liberates hydrogen gas when sodium metal is added?',
  right: 'pent-1-yne',
  wrong: ['pent-2-yne', 'pent-1-ene', 'pentane'],
  sol: 'Only a terminal alkyne has a hydrogen on an sp carbon acidic enough to be replaced by sodium: $\\ce{2C3H7C#CH + 2Na -> 2C3H7C#CNa + H2}$ — option (@K).',
  d: 1, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 aromatic
add('bondlen-mcq', mcq({
  stem: 'In benzene all carbon–carbon bonds are 139 pm long, between the C–C (154 pm) and C=C (134 pm) values. This is because:',
  right: 'the six π electrons are delocalised over the ring, so every bond has partial double-bond character',
  wrong: ['the ring changes rapidly between single and double bonds', 'the carbon atoms are sp³ hybridised', 'three bonds are single and three are double, giving an average'],
  sol: 'Sideways overlap of six p orbitals spreads the π electrons over all six bonds, so they are identical and intermediate in length — option (@K). Benzene is a resonance hybrid, not a rapidly flipping pair of structures (@1).',
  d: 2, c: 'understanding', t: [4],
}));
add('fc-acyl-mcq', mcq({
  stem: 'Benzene is treated with propanoyl chloride, CH₃CH₂COCl, in the presence of anhydrous aluminium chloride. The product is:',
  right: '1-phenylpropan-1-one',
  wrong: ['propylbenzene', 'isopropylbenzene', 'propanoic acid'],
  sol: r`Friedel–Crafts acylation replaces H by the acyl group: $\ce{C6H6 + CH3CH2COCl -> C6H5COCH2CH3 + HCl}$, an aryl ketone — option (@K). The alkylbenzenes (@1, @2) would need an alkyl halide.`,
  d: 2, c: 'application', t: [4],
}));
add('nitronium-mcq', mcq({
  stem: 'In the nitration of benzene with concentrated nitric acid and concentrated sulfuric acid, the attacking electrophile is:',
  right: 'the nitronium ion, NO₂⁺',
  wrong: ['the nitrate ion, NO₃⁻', 'the nitrite ion, NO₂⁻', 'the hydrogensulfate ion, HSO₄⁻'],
  sol: r`Sulfuric acid protonates nitric acid, which loses water: $\ce{HNO3 + 2H2SO4 -> NO2^+ + H3O^+ + 2HSO4^-}$. The electron-poor NO₂⁺ is attacked by the π cloud — option (@K).`,
  d: 1, c: 'recall', t: [4],
}));
add('pah-mcq', mcq({
  stem: 'Which of these is a carcinogenic polynuclear hydrocarbon formed in the incomplete combustion of coal, petroleum and tobacco?',
  right: 'benzpyrene',
  wrong: ['toluene', 'cyclohexane', 'naphthalene'],
  sol: 'Benzpyrene, with five fused rings, is converted in the body into products that damage DNA — option (@K). Naphthalene has only two rings and is not classed as a carcinogen at this level.',
  d: 1, c: 'recall', t: [4],
}));
add('huckel-mcq', mcq({
  stem: 'Which of these compounds is aromatic?',
  right: 'anthracene (14 π electrons, planar, fully conjugated)',
  wrong: ['cyclobutadiene (4 π electrons)', 'cyclooctatetraene (8 π electrons, tub-shaped)', 'cyclohexene (one C=C)'],
  sol: r`Anthracene is planar, cyclic and fully conjugated with 14 π electrons, and $14 = 4 \times 3 + 2$, so it obeys the Hückel rule — option (@K). 4 and 8 are of the form 4n, and cyclohexene is not conjugated.`,
  d: 2, c: 'application', t: [4],
}), () => huckel(14) && !huckel(4) && !huckel(8) || 'huckel');
add('meta-mcq', mcq({
  stem: 'Benzonitrile, C₆H₅CN, is treated with bromine and iron(III) bromide. The main product is:',
  right: '3-bromobenzonitrile',
  wrong: ['2-bromobenzonitrile', '4-bromobenzonitrile', 'bromomethylbenzene'],
  sol: 'The –CN group withdraws electrons and deactivates the ring, directing the electrophile to the meta position: 3-bromobenzonitrile — option (@K).',
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- assertion-reason
add('peroxide-ar', ar({
  a: 'In the presence of a peroxide, HBr adds to but-1-ene to give 1-bromobutane, but HCl does not show this behaviour.',
  r: 'In the radical chain, both propagation steps are energetically favourable for HBr but not for HCl.',
  key: 'a',
  sol: 'Both are true. For HCl the strong H–Cl bond makes hydrogen abstraction by the alkyl radical unfavourable, so the chain breaks down; R explains A — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('conf-ar', ar({
  a: 'At room temperature the CH₃ groups of ethane rotate almost freely about the C–C bond.',
  r: 'The staggered conformation of ethane is more stable than the eclipsed conformation.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. The free rotation arises because the barrier (about 12.5 kJ mol⁻¹) is small compared with the energy available in collisions at room temperature — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('acid-ar', ar({
  a: 'Ethyne reacts with sodium metal to liberate hydrogen gas.',
  r: 'Ethyne is a weaker acid than ethene.',
  key: 'c',
  sol: 'A is true: the sp C–H of ethyne is acidic enough for sodium to replace H. R is false: the sp carbon (50% s-character) makes ethyne a stronger acid than ethene — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('benzene-ar', ar({
  a: 'Benzene readily undergoes addition reactions with bromine water, like cyclohexene.',
  r: 'Benzene has a delocalised π electron cloud that gives it extra stability.',
  key: 'd',
  sol: 'A is false: benzene does not decolourise bromine water, since addition would destroy its delocalisation energy. R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('nitro-ar', ar({
  a: 'Nitrobenzene does not undergo Friedel–Crafts alkylation.',
  r: 'The nitro group strongly deactivates the benzene ring towards attack by electrophiles.',
  key: 'a',
  sol: 'Both are true. The ring is too electron-poor to attack the carbocation, so the reaction fails; R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('cistrans-ar', ar({
  a: 'trans-But-2-ene has a higher melting point than cis-but-2-ene.',
  r: 'trans-But-2-ene is more polar than cis-but-2-ene.',
  key: 'c',
  sol: 'A is true (168 K against 134 K) because the symmetrical trans molecules pack better in the crystal. R is false: the bond dipoles cancel in the trans isomer, which is the less polar one — option (c).',
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- true-false and fill
add('tf-isomer', tf({
  stem: 'Propene and cyclopropane are isomers of each other.',
  key: 't',
  sol: r`True. Both have the molecular formula $\ce{C3H6}$ but different structures (open chain with C=C, and a ring).`,
  d: 1, c: 'understanding', t: [2],
}));
add('tf-but1', tf({
  stem: 'But-1-ene shows cis–trans isomerism.',
  key: 'f',
  sol: r`False. In $\ce{CH2=CHCH2CH3}$ the terminal carbon carries two identical hydrogen atoms, so no geometric isomers exist.`,
  d: 2, c: 'application', t: [2],
}));
add('tf-cbd', tf({
  stem: 'Cyclobutadiene, C₄H₄, is aromatic because it is planar, cyclic and fully conjugated.',
  key: 'f',
  sol: 'False. It has 4 π electrons, which does not fit the 4n + 2 rule, so it is not aromatic (it is highly unstable).',
  d: 2, c: 'application', t: [4],
}), () => !huckel(4) || 'huckel');
add('fill-wurtz', fill({
  stem: 'The Wurtz reaction uses sodium metal in dry ___ as the solvent.',
  acc: [['ether', 'diethyl ether']],
  sol: 'Dry **ether** (diethyl ether); water would destroy sodium.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-ag', fill({
  stem: 'A terminal alkyne gives a white precipitate of silver ___ with ammoniacal silver nitrate.',
  acc: [['alkynide', 'acetylide', 'ethynide']],
  sol: 'The precipitate is the silver **alkynide** (acetylide), formed because the terminal ≡C–H is acidic.',
  d: 2, c: 'recall', t: [3],
}));
add('fill-lindlar', fill({
  stem: 'Lindlar catalyst is palladium on calcium carbonate poisoned with ___.',
  acc: [['quinoline', 'sulfur', 'sulphur']],
  sol: 'It is poisoned with **quinoline** (or sulfur compounds), so hydrogenation of an alkyne stops at the cis alkene.',
  d: 1, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- match
add('match-alkyne', match({
  stem: 'Match each conversion in Column I with its reagent or condition in Column II.',
  pairs: [
    ['But-2-yne → cis-but-2-ene', 'H₂ over Pd/CaCO₃ poisoned with quinoline'],
    ['But-2-yne → trans-but-2-ene', 'Na in liquid NH₃'],
    ['Ethyne → ethanal', 'Dilute H₂SO₄ with Hg²⁺'],
    ['Ethyne → benzene', 'Red-hot iron tube, 873 K'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Lindlar catalyst gives cis; Na/liquid NH₃ gives trans; hydration with Hg²⁺/H⁺ gives ethanal; cyclic polymerisation in a red-hot iron tube gives benzene.',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('match-direct', match({
  stem: 'Match each substituent on a benzene ring with its effect in electrophilic substitution.',
  pairs: [
    ['–OH', 'Strongly activating, ortho and para directing'],
    ['–CH₃', 'Weakly activating, ortho and para directing'],
    ['–Br', 'Deactivating, ortho and para directing'],
    ['–CN', 'Deactivating, meta directing'],
  ],
  order: [2, 0, 3, 1],
  sol: '–OH donates a lone pair (+M) strongly; –CH₃ donates weakly (+I, hyperconjugation); halogens withdraw by –I but direct o/p through +M; –CN withdraws (–M, –I) and directs meta.',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- numericals
{
  const n = 6;
  const M = 14 * n + 2;
  add('num-n', num({
    stem: `An open-chain saturated hydrocarbon has a molar mass of ${M} g mol⁻¹ (C = 12, H = 1). How many carbon atoms does a molecule contain?`,
    value: n, tol: 0, unit: null,
    sol: String.raw`For an alkane, $M = 12n + (2n + 2) = 14n + 2 = ${M}$, so $14n = ${M - 2}$ and $n = ${n}$. The hydrocarbon is hexane (or an isomer).`,
    scheme: [['Uses CₙH₂ₙ₊₂ and solves n = 6', 1]],
    d: 2, c: 'application', t: [1],
  }), () => near(14 * n + 2, M) && near(mass(F(n, 2 * n + 2)), M) || 'alkane mass');
}
{
  const molM = mass(F(5, 12));
  const g = 7.2;
  const mol = g / molM;
  const co2 = 5 * mol;
  const m = co2 * 44;
  add('num-co2', num({
    stem: `A sample of ${g} g of 2,2-dimethylpropane is burned completely in excess oxygen. What mass of carbon dioxide is formed, in grams? (C = 12, H = 1, O = 16)`,
    value: Math.round(m * 100) / 100, tol: 0.1, unit: 'g',
    sol: String.raw`$\ce{C5H12 + 8O2 -> 5CO2 + 6H2O}$. $M(\ce{C5H12}) = 5 \times 12 + 12 \times 1 = ${molM}$, so $n = ${g} \div ${molM} = ${dec(mol, 2)}$ mol. Moles of $\ce{CO2} = 5 \times ${dec(mol, 2)} = ${dec(co2, 2)}$, and mass $= ${dec(co2, 2)} \times 44 = ${dec(m, 2)}$ g.`,
    scheme: [['Balanced equation and moles of alkane', 0.5], ['5 mol CO₂ per mol and mass 22 g', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(m, 22) && near(7.2 / 72 * 5 * 44, 22) || 'co2 mass');
}
{
  const R = 8.314;
  const T = 298;
  const barrier = 12500;
  const RT = R * T;
  const ratio = Math.exp(-barrier / RT);
  const per1000 = Math.round(ratio * 1000 * 10) / 10;
  add('num-boltz', num({
    stem: `The torsional barrier of ethane is 12.5 kJ mol⁻¹. Treating one eclipsed and one staggered conformation as the only two states (ignore entropy differences), calculate how many molecules are eclipsed for every 1000 that are staggered at ${T} K. (R = 8.314 J K⁻¹ mol⁻¹)`,
    value: per1000, tol: 0.2, unit: null,
    sol: String.raw`Ratio $= e^{-\Delta E/RT}$. $RT = 8.314 \times 298 \approx ${Math.round(RT)}\ \text{J mol}^{-1}$, so $\Delta E / RT = 12500 \div ${Math.round(RT)} \approx ${dec(barrier / RT, 3)}$ and the ratio is $e^{-${dec(barrier / RT, 3)}} \approx ${dec(ratio, 2)}$. Per 1000 staggered: $1000 \times ${dec(per1000 / 1000, 2)} = ${dec(per1000, 2)}$.`,
    scheme: [['RT and ΔE/RT', 0.5], ['Exponential and 6.4 per 1000', 0.5]],
    d: 3, c: 'application', t: [1],
  }), () => near(Math.exp(-12500 / (8.314 * 298)) * 1000, 6.43, 0.01) || 'boltzmann');
}
{
  const hc = 119.5;
  const hb = 208.4;
  const exp3 = 3 * hc;
  const re = exp3 - hb;
  add('num-resonance', num({
    stem: `The enthalpy of hydrogenation of cyclohexene is −${hc} kJ mol⁻¹ and that of benzene to cyclohexane is −${hb} kJ mol⁻¹ (given). Calculate the resonance energy of benzene, in kJ mol⁻¹.`,
    value: Math.round(re * 10) / 10, tol: 0.5, unit: 'kJ mol⁻¹',
    sol: String.raw`Three isolated C=C bonds would release $3 \times ${hc} = ${dec(exp3, 4)}$ kJ mol⁻¹. Observed: ${hb}. Resonance energy $= ${dec(exp3, 4)} - ${hb} = ${dec(re, 4)}$ kJ mol⁻¹.`,
    scheme: [['Expected value for three double bonds', 0.5], ['Difference = 150.1 kJ mol⁻¹', 0.5]],
    d: 2, c: 'application', t: [4],
  }), () => near(3 * 119.5 - 208.4, 150.1, 0.001) || 'resonance energy');
}
{
  const prim = 9;
  const tert = 1;
  const rt = 5;
  const pct = (tert * rt) / (prim * 1 + tert * rt) * 100;
  add('num-chlor', num({
    stem: 'Chlorination of 2-methylpropane, (CH₃)₃CH, in light gives (CH₃)₂CHCH₂Cl and (CH₃)₃CCl. If a tertiary hydrogen is 5.0 times as reactive as a primary hydrogen (given), what percentage of the monochloro product is (CH₃)₃CCl?',
    value: Math.round(pct * 10) / 10, tol: 0.5, unit: '%',
    sol: String.raw`There are $${prim}$ primary and $${tert}$ tertiary hydrogens. Relative amounts: primary $= ${prim} \times 1 = ${prim}$, tertiary $= ${tert} \times ${rt} = ${tert * rt}$. Percentage of tertiary chloride $= ${tert * rt} \div (${prim} + ${tert * rt}) \times 100 = ${dec(pct, 3)}$.`,
    scheme: [['Counts 9 primary and 1 tertiary H, weighted 9 : 5', 0.5], ['35.7%', 0.5]],
    d: 3, c: 'analysis', t: [1],
  }), () => near((1 * 5) / (9 + 5) * 100, 35.7, 0.01) || 'chlorination');
}
{
  const alk = F(6, 12);
  const Malk = mass(alk);
  const g = 4.2;
  const mol = g / Malk;
  const prop = 2 * mol;
  const Mp = mass(CARB.propanone);
  const mp = prop * Mp;
  add('num-ozone', num({
    stem: `An alkene of molecular formula C₆H₁₂ gives only propanone on ozonolysis (Zn, H₂O). What mass of propanone, in grams, is obtained from ${g} g of the alkene? (C = 12, H = 1, O = 16)`,
    value: Math.round(mp * 100) / 100, tol: 0.1, unit: 'g',
    sol: String.raw`The alkene is $\ce{(CH3)2C=C(CH3)2}$, which splits into two propanone molecules. $M(\ce{C6H12}) = 6 \times 12 + 12 = ${Malk}$, so $n = ${g} \div ${Malk} = ${dec(mol, 2)}$ mol, giving $2 \times ${dec(mol, 2)} = ${dec(prop, 2)}$ mol of propanone. $M(\ce{C3H6O}) = ${Mp}$, so mass $= ${dec(prop, 2)} \times ${Mp} = ${dec(mp, 2)}$ g.`,
    scheme: [['Identifies the symmetrical alkene and 2 mol per mol', 0.5], ['Mass 5.8 g', 0.5]],
    d: 3, c: 'application', t: [2],
  }), () => (same(alkeneFrom('propanone', 'propanone'), alk) && near(mp, 5.8)) || 'ozonolysis mass');
}
{
  const g = 3.2;
  const Mc = AM.Ca + 2 * AM.C;
  const mol = g / Mc;
  const V = mol * 22.4;
  add('num-cac2', num({
    stem: `Calcium carbide (${g} g) reacts completely with excess water, $\\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. What volume of ethyne is obtained at STP, in dm³? (Ca = 40, C = 12; molar volume at STP = 22.4 dm³ mol⁻¹)`,
    value: Math.round(V * 100) / 100, tol: 0.02, unit: 'dm³',
    sol: String.raw`$M(\ce{CaC2}) = 40 + 2 \times 12 = ${Mc}$, so $n = ${g} \div ${Mc} = ${dec(mol, 2)}$ mol. The ratio is 1 : 1, so $${dec(mol, 2)}$ mol of ethyne, with volume $${dec(mol, 2)} \times 22.4 = ${dec(V, 3)}$ dm³.`,
    scheme: [['Moles of CaC₂ = moles of C₂H₂', 0.5], ['Volume 1.12 dm³', 0.5]],
    d: 2, c: 'application', t: [3],
  }), () => near(3.2 / 64 * 22.4, 1.12) || 'ethyne volume');
}

// ---------------------------------------------------------------- short 2-mark
add('wurtz-short', short({
  marks: 2,
  stem: 'A mixture of bromomethane and 2-bromopropane is warmed with sodium in dry ether. Name all the alkanes that can form, and say why the Wurtz reaction is unsuitable for making an unsymmetrical alkane.',
  model: 'Three alkanes form: ethane (methyl with methyl), 2-methylpropane (methyl with isopropyl) and 2,3-dimethylbutane (isopropyl with isopropyl). Coupling occurs between like and unlike groups at random, so the mixture is difficult to separate and the yield of the unsymmetrical alkane is low.',
  sol: 'Three coupling combinations; poor selectivity.',
  scheme: [['Three alkanes named', 1], ['Mixture, hard to separate, low yield', 1]],
  d: 3, c: 'application', t: [1],
}));
add('lindlar-short', short({
  marks: 2,
  stem: 'How would you convert hex-3-yne into (i) cis-hex-3-ene and (ii) trans-hex-3-ene? Name the reagent in each case.',
  model: '(i) Hydrogen over Lindlar catalyst, palladium on calcium carbonate poisoned with quinoline: both hydrogens add to the same face of the triple bond on the catalyst surface, giving the cis alkene and stopping before the alkane. (ii) Sodium in liquid ammonia: the trans alkene is formed.',
  sol: 'Lindlar gives cis; Na/NH₃ gives trans.',
  scheme: [['(i) Lindlar catalyst and cis product', 1], ['(ii) Na in liquid NH₃ and trans product', 1]],
  d: 2, c: 'application', t: [2],
}));
add('kolbe-short', short({
  marks: 2,
  stem: 'Write the equation for the electrolysis of aqueous potassium propanoate and name the products formed at the anode and at the cathode.',
  model: r`$\ce{2C2H5COOK + 2H2O -> C4H10 + 2CO2 + H2 + 2KOH}$. At the anode, the propanoate ions lose electrons to give butane and carbon dioxide. At the cathode, water is reduced to hydrogen gas, leaving potassium hydroxide in solution.`,
  sol: 'Kolbe electrolysis joins two ethyl groups.',
  scheme: [['Balanced equation', 1], ['Anode products and cathode product', 1]],
  d: 2, c: 'application', t: [1],
}));
add('cistrans-short', short({
  marks: 2,
  stem: 'cis-1,2-Dichloroethene boils at about 333 K and the trans isomer at about 321 K. Explain the difference.',
  model: 'In the cis isomer the two C–Cl bond dipoles point to the same side and add up, so the molecule is polar and has dipole–dipole attractions as well as dispersion forces. In the trans isomer the dipoles cancel and the molecule is non-polar, so the forces are weaker and it boils lower.',
  sol: 'Polarity decides the boiling point.',
  scheme: [['Dipoles add in cis, cancel in trans', 1], ['Stronger intermolecular forces in cis', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('peroxide-short', short({
  marks: 2,
  stem: 'Explain why the peroxide effect is observed with HBr but not with HCl or HI.',
  model: 'In the radical chain, the carbon radical must remove a hydrogen from HX. For HCl the H–Cl bond is so strong that this step is unfavourable, and for HI the iodine atom adds to the alkene too slowly and simply pairs up to give I₂. Only HBr has both propagation steps favourable.',
  sol: 'Only HBr suits both chain steps.',
  scheme: [['HCl: strong H–Cl bond, hydrogen abstraction unfavourable', 1], ['HI: iodine atoms too unreactive; HBr suits both steps', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('acidity-short', short({
  marks: 2,
  stem: 'Explain why ethyne reacts with sodium amide whereas ethene does not.',
  model: r`The carbons of ethyne are sp hybridised with 50 percent s-character, so they hold electrons nearer the nucleus and are more electronegative than the sp² carbons of ethene (33 percent). The ≡C–H hydrogen is therefore acidic and is removed by the strong base: $\ce{CH#CH + NaNH2 -> CH#CNa + NH3}$.`,
  sol: 'sp carbon stabilises the carbanion.',
  scheme: [['Higher s-character of sp carbon makes ≡C–H acidic', 1], ['Equation with NaNH₂', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('benzene-short', short({
  marks: 2,
  stem: 'Benzene is drawn with three C=C bonds, yet it undergoes substitution rather than addition. Explain.',
  model: 'The six π electrons are delocalised over the whole ring, which gives benzene about 150 kJ per mole of extra stability. Addition reactions would destroy this delocalisation, whereas substitution keeps the aromatic ring intact, so benzene prefers electrophilic substitution to addition.',
  sol: 'Resonance stabilisation is retained in substitution.',
  scheme: [['Delocalisation gives extra stability', 1], ['Substitution retains the ring, addition destroys it', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- short 3-mark
add('huckel-short3', short({
  marks: 3,
  stem: 'Apply the Hückel rule to benzene, naphthalene and cyclooctatetraene, and state which are aromatic.',
  model: 'A ring is aromatic if it is planar, cyclic, fully conjugated and has 4n + 2 π electrons. Benzene has 6 electrons (n = 1) and naphthalene has 10 (n = 2); both are planar and conjugated, so both are aromatic. Cyclooctatetraene has 8 π electrons, which is 4n and not 4n + 2, and it is tub-shaped rather than planar, so it is not aromatic.',
  sol: 'Count π electrons and test 4n + 2.',
  scheme: [['Statement of the rule with its conditions', 1], ['Benzene and naphthalene aromatic with n values', 1], ['Cyclooctatetraene not aromatic, with reason', 1]],
  d: 2, c: 'application', t: [4],
}), () => huckel(6) && huckel(10) && !huckel(8) || 'huckel');
add('iso-short3', short({
  marks: 3,
  stem: 'Write the structures and IUPAC names of all the chain isomers of C₅H₁₂. Which has the lowest boiling point, and why?',
  model: r`Pentane, $\ce{CH3CH2CH2CH2CH3}$; 2-methylbutane, $\ce{(CH3)2CHCH2CH3}$; and 2,2-dimethylpropane, $\ce{C(CH3)4}$. These are the only three arrangements of five carbon atoms in a chain. The last, the most branched, boils lowest (about 283 K) because its molecules are almost spherical, with the smallest surface area of contact and the weakest van der Waals forces.`,
  sol: 'Three isomers; branching lowers the boiling point.',
  scheme: [['Pentane and 2-methylbutane', 1], ['2,2-Dimethylpropane', 0.5], ['Lowest boiling point identified with reason', 1.5]],
  d: 2, c: 'application', t: [1],
}));
add('ozonolysis-short3', short({
  marks: 3,
  stem: '(a) An alkene A, C₅H₁₀, gives ethanal and propanal on ozonolysis with Zn and water. Identify A. (b) Predict the products of ozonolysis of 2-methylbut-2-ene.',
  model: r`(a) Ozonolysis turns each carbon of the double bond into a carbonyl carbon, so to find A we join the two carbonyl carbons by a double bond and remove the oxygens: $\ce{CH3CH=CHCH2CH3}$, pent-2-ene. (b) The alkene $\ce{(CH3)2C=CHCH3}$ is cut at the double bond; the $\ce{(CH3)2C=}$ end gives propanone and the $\ce{=CHCH3}$ end gives ethanal.`,
  sol: 'Work forwards or backwards across the C=C bond.',
  scheme: [['(a) Pent-2-ene with reasoning', 1], ['(b) Propanone', 1], ['(b) Ethanal', 1]],
  d: 3, c: 'application', t: [2],
}), () => (same(alkeneFrom('ethanal', 'propanal'), F(5, 10)) && isAlkene(F(5, 10)) && same(F(3, 6, 1), CARB.propanone)) || 'ozonolysis C5');
add('directing-short3', short({
  marks: 3,
  stem: 'Classify –OH, –Cl and –NO₂ as activating or deactivating and as ortho/para or meta directing. Why does –NO₂ direct meta?',
  model: '–OH is activating and ortho/para directing; –Cl is deactivating but ortho/para directing; –NO₂ is deactivating and meta directing. The nitro group withdraws electrons by its –M and –I effects, and this removes more electron density from the ortho and para positions than from the meta position, so the electrophile attacks meta, the least deactivated site.',
  sol: 'Electron withdrawal is felt most at o and p.',
  scheme: [['–OH and –Cl classified', 1], ['–NO₂ classified', 0.5], ['Reason for meta direction', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('mech-short3', short({
  marks: 3,
  stem: 'Describe the three stages of the free-radical monochlorination of methane in sunlight, with an equation for each.',
  model: 'Initiation: light splits a chlorine molecule, Cl₂ → 2Cl•. Propagation: Cl• + CH₄ → HCl + CH₃•, then CH₃• + Cl₂ → CH₃Cl + Cl•, so the chain repeats. Termination: two radicals combine, for example Cl• + Cl• → Cl₂, CH₃• + CH₃• → C₂H₆ or CH₃• + Cl• → CH₃Cl, which ends the chain.',
  sol: 'Initiation, propagation, termination.',
  scheme: [['Initiation', 1], ['Two propagation steps', 1], ['Termination', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('pah-short3', short({
  marks: 3,
  stem: 'What are polynuclear aromatic hydrocarbons? Give one example, say how it is formed, and explain why it is dangerous.',
  model: 'Polynuclear hydrocarbons contain three or more benzene rings fused together. Benzpyrene is an example. It forms when coal, petroleum, wood or tobacco burn incompletely. Entering the body, it undergoes biochemical reactions that give products which damage DNA and can cause cancer, so such compounds are carcinogenic.',
  sol: 'Fused rings; incomplete combustion; DNA damage.',
  scheme: [['Definition and example', 1], ['Formation by incomplete combustion', 1], ['DNA damage and cancer', 1]],
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- long 5-mark
add('alkane-long', long({
  stem: '(a) Describe the preparation of ethane by (i) the Wurtz reaction, (ii) decarboxylation and (iii) Kolbe electrolysis, giving equations. (b) Describe the mechanism of the monochlorination of methane in sunlight.',
  model: r`(a) (i) Bromomethane with sodium in dry ether: $\ce{2CH3Br + 2Na -> C2H6 + 2NaBr}$. (ii) Sodium propanoate heated with soda lime loses one carbon: $\ce{CH3CH2COONa + NaOH -> CH3CH3 + Na2CO3}$. (iii) Electrolysis of aqueous sodium ethanoate joins two methyl groups at the anode: $\ce{2CH3COONa + 2H2O -> C2H6 + 2CO2 + H2 + 2NaOH}$. (b) Initiation: light splits Cl₂ into two Cl• radicals. Propagation: Cl• takes H from methane giving HCl and CH₃•; CH₃• takes Cl from Cl₂ giving CH₃Cl and a new Cl•. Termination: two radicals combine, ending the chain.`,
  sol: 'Three preparations with equations; three-stage radical mechanism.',
  scheme: [['Wurtz with equation', 1], ['Decarboxylation with equation', 1], ['Kolbe with equation', 1], ['Initiation and propagation', 1.5], ['Termination', 0.5]],
  d: 3, c: 'understanding', t: [1],
}));
add('benzene-long', long({
  stem: '(a) Explain the structure of benzene in terms of resonance and its π cloud. (b) Write the mechanism of the nitration of benzene, showing how the electrophile is produced.',
  model: r`(a) Benzene is a planar hexagon with all C–C bonds 139 pm, between a single and a double bond. It is a resonance hybrid of two Kekulé structures; each carbon is sp² and the six p orbitals overlap sideways, so six π electrons are delocalised above and below the ring. (b) Nitric acid and sulfuric acid form the nitronium ion: $\ce{HNO3 + 2H2SO4 -> NO2^+ + H3O^+ + 2HSO4^-}$. The π cloud attacks NO₂⁺ in the slow step to give the arenium ion, in which the charge is spread over the ring. Loss of H⁺ restores aromaticity and gives nitrobenzene.`,
  sol: 'Resonance and delocalisation; two-step electrophilic substitution.',
  scheme: [['Resonance hybrid and bond length', 1], ['π cloud and delocalisation of six electrons', 1], ['Generation of NO₂⁺', 1], ['Slow attack giving the arenium ion', 1], ['Loss of H⁺ giving nitrobenzene', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('markov-long', long({
  stem: '(a) State Markovnikov’s rule and explain it with the mechanism of the addition of HBr to propene. (b) Explain how the product of the addition of HBr to but-1-ene changes in the presence of a peroxide, and give the mechanism.',
  model: r`(a) In the addition of HX to an unsymmetrical alkene, hydrogen goes to the carbon with more hydrogens. The π bond attacks H⁺ to give the more stable secondary carbocation $\ce{CH3CH^+CH3}$, which bromide traps to give 2-bromopropane. (b) With peroxide, Br• radicals form: ROOR gives RO•, which takes H from HBr. Br• adds to the terminal carbon, giving the more stable secondary radical; this takes H from HBr, giving 1-bromobutane and a new Br•, so the chain continues. The product is anti-Markovnikov.`,
  sol: 'Carbocation route; radical route with peroxide.',
  scheme: [['Statement of the rule', 1], ['Carbocation mechanism and stability argument', 1.5], ['Radical initiation and anti-Markovnikov addition', 1.5], ['Propagation and product 1-bromobutane', 1]],
  d: 4, c: 'application', t: [2],
}));
add('conformation-long', long({
  stem: '(a) Draw Newman projections of the staggered and eclipsed conformations of ethane. (b) Sketch the graph of energy against dihedral angle for one full rotation, marking the energies. (c) Why is rotation about the C–C bond of ethane regarded as almost free at room temperature?',
  model: r`(a) Staggered: the three hydrogens of the back carbon lie midway between those of the front carbon (dihedral angle 60°). Eclipsed: the back hydrogens are directly behind the front ones (0°). (b) The graph is a wave repeating every 120°: minima of zero at 60°, 180° and 300° (staggered) and maxima of 12.5 kJ mol⁻¹ at 0°, 120°, 240° and 360° (eclipsed). (c) The barrier of 12.5 kJ mol⁻¹ is only about five times RT (2.5 kJ mol⁻¹), so collisions carry molecules over it very rapidly and the conformers cannot be separated.`,
  sol: 'Newman projections; sinusoidal graph; barrier comparable with thermal energy.',
  scheme: [['Staggered Newman projection', 1], ['Eclipsed Newman projection', 1], ['Graph with minima and maxima', 1.5], ['Value 12.5 kJ mol⁻¹ marked', 0.5], ['Explanation of free rotation', 1]],
  d: 3, c: 'application', t: [1],
}));
add('alkyne-long', long({
  stem: '(a) Explain why terminal alkynes are acidic, with the reactions of ethyne with sodium and with sodium amide. (b) How is ethyne converted into (i) ethanal and (ii) benzene? (c) Give a test that distinguishes pent-1-yne from pent-2-yne.',
  model: r`(a) The sp carbon (50 percent s-character) is more electronegative than sp² or sp³ carbon, so the ≡C–H hydrogen is acidic: $\ce{2CH#CH + 2Na -> 2CH#CNa + H2}$ and $\ce{CH#CH + NaNH2 -> CH#CNa + NH3}$. (b) (i) Dilute sulfuric acid with Hg²⁺ adds water, and the enol rearranges to ethanal. (ii) Passing ethyne through a red-hot iron tube at 873 K trimerises it to benzene. (c) Only pent-1-yne gives a white precipitate with ammoniacal silver nitrate, because it has a terminal ≡C–H; it also releases hydrogen with sodium.`,
  sol: 'Acidity from s-character; hydration and trimerisation; terminal alkyne test.',
  scheme: [['Reason for acidity', 1], ['Two equations', 1], ['Conversion to ethanal', 1], ['Conversion to benzene', 1], ['Test for terminal alkyne', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- case-based
{
  const rows = [0, 30, 60, 90, 120].map((t) => [t, E(t)]);
  const tbl = rows.map(([t, e]) => `| ${t}° | ${dec(e, 3)} |`).join('\n');
  const perPair = 12.5 / 3;
  add('conformer-case', mk.case({
    passage: String.raw`A computational chemist rotates one methyl group of ethane about the C–C bond and records the relative potential energy (illustrative values from the model $E = 6.25\,(1 + \cos 3\theta)$ kJ mol⁻¹, where θ is the dihedral angle measured from the eclipsed form).

| Dihedral angle θ | Relative energy / kJ mol⁻¹ |
|---|---|
${tbl}

At 298 K, $RT \approx 2.5\ \text{kJ mol}^{-1}$.`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which dihedral angle in the table corresponds to the most stable conformation?',
        right: '60°',
        wrong: ['0°', '30°', '120°'],
        sol: 'The lowest energy (0 kJ mol⁻¹) occurs at 60°, the staggered conformation — option (@K). 0° and 120° are eclipsed (12.5 kJ mol⁻¹).',
        d: 2, c: 'analysis', t: [1],
      })),
      part('b', num({
        stem: 'The torsional strain of the eclipsed form is shared equally by three eclipsed H–H pairs. Calculate the strain per pair, in kJ mol⁻¹.',
        value: Math.round(perPair * 100) / 100, tol: 0.05, unit: 'kJ mol⁻¹',
        sol: String.raw`$12.5 \div 3 = ${dec(perPair, 3)}$ kJ mol⁻¹ per eclipsed pair.`,
        scheme: [['12.5 ÷ 3 = 4.17', 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why ethane is regarded as rotating almost freely at 298 K even though the barrier is 12.5 kJ mol⁻¹.',
        model: 'The thermal energy RT is about 2.5 kJ per mole, and collisions give many molecules far more than that. The barrier is only about five times RT, so it is crossed very rapidly and the staggered conformers interconvert too fast to be separated.',
        sol: 'Barrier small compared with collision energies.',
        scheme: [['Compares barrier with RT', 1], ['Fast interconversion, conformers cannot be isolated', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'State how many energy maxima occur in one complete 360° rotation and which conformation each represents, using the model values.',
          model: 'There are three maxima, at 0°, 120° and 240°, each an eclipsed conformation of energy 12.5 kJ per mole. Between them lie three minima at 60°, 180° and 300°, the staggered conformations, of energy zero.',
          sol: 'Period of 120°.',
          scheme: [['Three maxima, eclipsed, 12.5', 1], ['Three minima, staggered', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), () => (near(E(0), 12.5) && near(E(60), 0.0000001, 1) && near(E(120), 12.5) && near(12.5 / 3, 4.17, 0.01)) || 'conformer');
}
add('alkene-case', mk.case({
  passage: r`Three isomeric alkenes P, Q and R have the molecular formula $\ce{C6H12}$. Each is subjected to ozonolysis with zinc and water, and the carbonyl compounds are identified.

| Alkene | Products of ozonolysis |
|---|---|
| P | Propanal only |
| Q | Ethanal and butanal |
| R | Propanone and propanal |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Alkene P is:',
      right: 'hex-3-ene',
      wrong: ['hex-2-ene', 'hex-1-ene', '2-methylpent-2-ene'],
      sol: r`Two propanal molecules join across C=C: $\ce{CH3CH2CH=CHCH2CH3}$, hex-3-ene — option (@K). Hex-2-ene (@1) would give ethanal and butanal.`,
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Identify Q, giving the reason.',
      model: 'Q is hex-2-ene, CH₃CH=CHCH₂CH₂CH₃: the CH₃CH= end gives ethanal and the =CHCH₂CH₂CH₃ end gives butanal.',
      sol: 'Join ethanal and butanal carbons.',
      scheme: [['Hex-2-ene with fragments assigned', 1]],
      d: 3, c: 'analysis', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'R adds HBr in the absence of peroxide. Name the major product and explain it using carbocation stability.',
      model: 'R is 2-methylpent-2-ene, (CH₃)₂C=CHCH₂CH₃. H adds to C3 (which has a hydrogen) to give a tertiary carbocation at C2, more stable than the secondary one, so the major product is 2-bromo-2-methylpentane.',
      sol: 'Markovnikov through a tertiary carbocation.',
      scheme: [['2-Bromo-2-methylpentane', 1], ['Tertiary carbocation more stable than secondary', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Name the product when R reacts with HBr in the presence of a peroxide and explain how it forms.',
        model: 'Peroxide generates bromine radicals. Br• adds to C3, the carbon bearing a hydrogen, to give the more stable tertiary radical at C2. This abstracts H from HBr, giving 3-bromo-2-methylpentane and a new Br•, so the product is anti-Markovnikov.',
        sol: 'Radical chain, Br adds to the less substituted carbon.',
        scheme: [['3-Bromo-2-methylpentane', 1], ['Br• adds first to give the more stable radical', 1]],
        d: 4, c: 'application', t: [2],
      }),
    ]),
  ],
}), () => (same(alkeneFrom('propanal', 'propanal'), F(6, 12)) && same(alkeneFrom('ethanal', 'butanal'), F(6, 12)) && same(alkeneFrom('propanone', 'propanal'), F(6, 12)) && isAlkene(F(6, 12))) || 'case ozonolysis');
add('alkyne-case', mk.case({
  passage: r`Two isomeric hydrocarbons X and Y have the formula $\ce{C4H6}$. X reacts with sodium to give hydrogen and gives a white precipitate with ammoniacal silver nitrate. Y does not react with either reagent. Y adds one mole of hydrogen in the presence of Lindlar catalyst to give an alkene boiling at 277 K, and adds one mole of hydrogen with sodium in liquid ammonia to give an isomeric alkene boiling at 274 K.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'X is:',
      right: 'but-1-yne',
      wrong: ['but-2-yne', 'buta-1,3-diene', 'cyclobutene'],
      sol: 'Only a terminal alkyne reacts with sodium and gives a silver precipitate: but-1-yne — option (@K). But-2-yne (@1) has no ≡C–H.',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Identify Y and give a reason.',
      model: 'Y is but-2-yne: it has no terminal hydrogen, and partial reduction gives the cis and trans isomers of but-2-ene.',
      sol: 'Internal alkyne giving two geometric isomers.',
      scheme: [['But-2-yne with reason', 1]],
      d: 2, c: 'analysis', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the alkene formed from Y with each reagent and explain which one boils at 277 K.',
      model: 'Lindlar catalyst gives cis-but-2-ene; sodium in liquid ammonia gives trans-but-2-ene. The cis isomer boils at 277 K because it is polar, with dipole–dipole attraction, whereas the non-polar trans isomer boils at 274 K.',
      sol: 'Lindlar cis, Na/NH₃ trans; cis is polar.',
      scheme: [['Both alkenes named correctly', 1], ['Boiling point assigned using polarity', 1]],
      d: 3, c: 'analysis', t: [2, 3],
    }), [
      short({
        marks: 2,
        stem: 'Write the equation for the reaction of X with sodium amide, and explain why Y does not react.',
        model: r`$\ce{CH3CH2C#CH + NaNH2 -> CH3CH2C#CNa + NH3}$. The terminal ≡C–H of X is acidic because its sp carbon has 50 percent s-character. Y has no hydrogen on a triple-bond carbon, so there is nothing for the amide ion to remove.`,
        sol: 'Acidic terminal hydrogen in X only.',
        scheme: [['Equation', 1], ['Y has no terminal ≡C–H', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => same(F(4, 6), F(4, 6)) || 'case alkyne');
{
  const o = 58;
  const mt = 4;
  const p = 38;
  const perOrtho = o / 2;
  add('directing-case', mk.case({
    passage: String.raw`Nitration of two substituted benzenes under the same conditions gives these approximate (illustrative) product distributions and relative rates compared with benzene (= 1).

| Compound | Ortho | Meta | Para | Relative rate |
|---|---|---|---|---|
| Methylbenzene | ${o}% | ${mt}% | ${p}% | about 25 |
| Nitrobenzene | 6% | 93% | 1% | about 0.000 000 06 |`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which conclusion do the data support?',
        right: 'The methyl group activates the ring and directs ortho/para; the nitro group deactivates it and directs meta.',
        wrong: ['Both groups activate the ring but direct to different positions.', 'The methyl group deactivates the ring and directs meta.', 'The nitro group activates the ring and directs ortho/para.'],
        sol: 'Methylbenzene reacts faster than benzene (25 times) and gives mostly ortho and para products; nitrobenzene reacts far slower and gives mostly the meta product — option (@K).',
        d: 2, c: 'analysis', t: [4],
      })),
      part('b', num({
        stem: `Methylbenzene has two ortho positions. Calculate the percentage of nitration at each single ortho position.`,
        value: perOrtho, tol: 0.5, unit: '%',
        sol: String.raw`$${o} \div 2 = ${perOrtho}$ per ortho position.`,
        scheme: [['58 ÷ 2 = 29', 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the nitro group directs the incoming group to the meta position.',
        model: 'The nitro group withdraws electrons by its –M and –I effects, making the whole ring electron-poor. The effect is greatest at the ortho and para positions, so the meta position is the least deactivated and is attacked by the electrophile.',
        sol: 'Electron withdrawal greatest at o and p.',
        scheme: [['Nitro withdraws electrons (–M, –I)', 1], ['Meta is the least deactivated site', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Explain, using the arenium ion, why methylbenzene reacts faster than benzene and gives mainly ortho and para products.',
          model: 'The methyl group donates electrons through its inductive effect and hyperconjugation. In ortho or para attack the positive charge of the arenium ion falls on the carbon carrying the methyl group, where it is stabilised, so these routes are faster than meta attack and faster than benzene.',
          sol: 'Charge next to CH₃ is stabilised.',
          scheme: [['Methyl donates electrons (+I, hyperconjugation)', 1], ['Charge at the carbon bearing CH₃ in o and p attack', 1]],
          d: 3, c: 'analysis', t: [4],
        }),
      ]),
    ],
  }), () => (near(58 / 2, 29) && o + mt + p === 100) || 'directing');
}

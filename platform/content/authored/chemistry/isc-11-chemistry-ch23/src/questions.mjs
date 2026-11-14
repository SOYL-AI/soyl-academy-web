// ch23 Alkynes — question bank (ISC style). AR keys planned: a b c d c b. MCQ keys are placed by the builder.
// Numbers printed in stems are the exact values used in the computations (strings carry the significant figures).
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const MV = 22.4; // L at STP

// ---------------------------------------------------------------- t01 nomenclature, structure, isomerism
add('name-mcq', mcq({
  stem: 'A perfumer\'s assistant draws the structure CH₃CH(CH₃)CH₂C≡CCH₃ for a hydrocarbon found in a floral extract. Its IUPAC name is:',
  right: '5-methylhex-2-yne',
  wrong: ['2-methylhex-4-yne', '4-methylhex-2-yne', '5-methylhex-3-yne'],
  sol: 'The longest chain containing C≡C has 6 carbons. Numbering from the CH₃–C≡ end gives the triple bond locant 2 (from the other end it would be 4), so the methyl group is on C-5: 5-methylhex-2-yne, option (@K). Option (@1) numbers from the wrong end, (@2) puts the methyl on the wrong carbon and (@3) gives the triple bond the wrong locant.',
  d: 2, c: 'application', t: [1],
}));
add('hyb-mcq', mcq({
  stem: 'In a molecule of but-1-yne, HC≡C–CH₂–CH₃, the hybridisation of the four carbon atoms, taken from the ≡CH end, is:',
  right: 'sp, sp, sp³, sp³',
  wrong: ['sp, sp, sp², sp³', 'sp², sp, sp³, sp³', 'sp, sp², sp³, sp³'],
  sol: 'The two carbons of the triple bond each have two σ bonds and two π bonds, so they are sp; the CH₂ and CH₃ carbons have four σ bonds each, so sp³. The order is sp, sp, sp³, sp³ — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('sigpi-mcq', mcq({
  stem: 'A student counts the bonds in one molecule of 3-methylbut-1-yne, (CH₃)₂CH–C≡CH. The numbers of σ bonds and π bonds are respectively:',
  right: '12 and 2',
  wrong: ['13 and 2', '12 and 3', '10 and 2'],
  sol: 'The molecule C₅H₈ has 13 atoms joined in an open chain, so it has 12 σ bonds (8 C–H and 4 C–C, the triple bond contributing one σ). The triple bond has two π bonds. So 12 σ and 2 π — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('isom-mcq', mcq({
  stem: 'A student lists every open-chain structural isomer of C₅H₈ that contains one carbon–carbon triple bond and no other multiple bond. The number of such isomers is:',
  right: '3',
  wrong: ['2', '4', '5'],
  sol: 'The isomers are pent-1-yne, pent-2-yne and 3-methylbut-1-yne: 3 in all — option (@K). No alkyne has cis–trans isomers, so the count cannot rise to (@2) or (@3), and 2 (@1) misses the branched isomer.',
  d: 2, c: 'application', t: [1],
}));
{
  const BE = { CC: 347, C2: 611, C3: 837 };
  const first = BE.C2 - BE.CC; // 264
  const second = BE.C3 - BE.C2; // 226
  const both = BE.C3 - BE.CC; // 490
  add('piE-mcq', mcq({
    stem: `The average bond enthalpies of C–C, C=C and C≡C are ${BE.CC}, ${BE.C2} and ${BE.C3} kJ mol⁻¹ respectively. The energy contributed by the second π bond, the extra enthalpy gained when a C=C bond becomes a C≡C bond, is:`,
    right: `${second} kJ mol⁻¹`,
    wrong: [`${first} kJ mol⁻¹`, `${both} kJ mol⁻¹`, `${BE.C3} kJ mol⁻¹`],
    sol: `Second π bond = ${BE.C3} − ${BE.C2} = ${second} kJ mol⁻¹ — option (@K). The first π bond is ${BE.C2} − ${BE.CC} = ${first} kJ mol⁻¹ (@1), so the second π bond is weaker than the first; ${both} kJ mol⁻¹ (@2) is the two π bonds together and ${BE.C3} (@3) is the whole triple bond.`,
    d: 3, c: 'analysis', t: [1],
  }), () => (second === 226 && first === 264 && both === 490) || 'piE');
}

// ---------------------------------------------------------------- t02 preparation and physical properties
add('prep-mcq', mcq({
  stem: 'In a school laboratory the teacher needs a gas jar of ethyne quickly and cheaply. The pair of reactants that gives ethyne directly is:',
  right: 'calcium carbide and water',
  wrong: ['sodium ethanoate and soda lime', 'ethanol and concentrated sulphuric acid at 443 K', 'bromoethane and aqueous potassium hydroxide'],
  sol: 'Calcium carbide with cold water gives ethyne and calcium hydroxide, CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂ — option (@K). Sodium ethanoate with soda lime gives methane (@1), ethanol with hot conc. H₂SO₄ gives ethene (@2) and bromoethane with aqueous KOH gives ethanol (@3).',
  d: 1, c: 'recall', t: [2],
}));
add('dihal-mcq', mcq({
  stem: 'A technician heats 1,1-dichloropropane with a large excess of alcoholic potassium hydroxide. The organic product is:',
  right: 'propyne',
  wrong: ['propene', 'propane', 'propan-1-ol'],
  sol: 'A geminal dihalide loses two molecules of HCl with alcoholic KOH, forming a triple bond: CH₃CH₂CHCl₂ gives CH₃C≡CH, propyne — option (@K). Loss of only one HCl would give a chloropropene; propene (@1) and propane (@2) would need reduction and propan-1-ol (@3) forms with aqueous KOH.',
  d: 2, c: 'application', t: [2],
}));
add('kolbe-mcq', mcq({
  stem: 'A concentrated aqueous solution of potassium maleate, KOOC–CH=CH–COOK, is electrolysed between platinum electrodes. Besides carbon dioxide, the hydrocarbon formed at the anode is:',
  right: 'ethyne',
  wrong: ['ethene', 'ethane', 'but-2-yne'],
  sol: 'Each carboxylate group is lost as CO₂ and the two remaining =CH– carbons are joined by a triple bond: ⁻OOC–CH=CH–COO⁻ gives HC≡CH + 2CO₂ + 2e⁻ — option (@K). Ethene (@1) comes from potassium succinate, which has a saturated CH₂–CH₂ unit.',
  d: 2, c: 'application', t: [2],
}));
add('bp-mcq', mcq({
  stem: 'A student has four five-carbon hydrocarbons with boiling points of 27.8, 30.0, 36.1 and 40.2 °C: pent-1-yne, pent-1-ene, pentane and 2-methylbutane. Which sequence lists them in increasing order of boiling point?',
  right: '2-methylbutane < pent-1-ene < pentane < pent-1-yne',
  wrong: ['pent-1-yne < pentane < pent-1-ene < 2-methylbutane', 'pent-1-ene < 2-methylbutane < pentane < pent-1-yne', '2-methylbutane < pentane < pent-1-ene < pent-1-yne'],
  sol: 'The branched isomer 2-methylbutane (27.8 °C) boils lowest because it is more compact; pent-1-ene (30.0 °C) is a little below pentane (36.1 °C); the linear, easily polarised pent-1-yne (40.2 °C) boils highest — option (@K). Option (@1) is the exact reverse; (@2) and (@3) each swap two neighbours.',
  d: 3, c: 'application', t: [2],
}));
add('natgas-mcq', mcq({
  stem: 'Methane from natural gas is passed through an electric arc at about 1773 K, and the hot gases are cooled very rapidly. The two products are:',
  right: 'ethyne and hydrogen',
  wrong: ['ethene and hydrogen', 'ethane and carbon', 'ethyne and carbon monoxide'],
  sol: '2CH₄ → C₂H₂ + 3H₂ at about 1773 K; rapid quenching stops the ethyne from decomposing into carbon and hydrogen — option (@K). Ethene (@1) and ethane (@2) are not the main products, and carbon monoxide (@3) forms only in the partial-oxidation route, which needs oxygen.',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 acidity and acetylides
add('acid-mcq', mcq({
  stem: 'Which statement best explains why the hydrogen atoms of ethyne are more acidic than those of ethene?',
  right: 'The C–H bond of ethyne uses an sp orbital, which has more s character than the sp² orbital of ethene',
  wrong: ['The C≡C bond of ethyne is longer than the C=C bond of ethene', 'Ethyne has more hydrogen atoms than ethene has', 'The π bonds of ethyne are formed by overlap of s orbitals'],
  sol: 'An sp orbital is 50% s, an sp² orbital 33.3% s. The more s character, the closer the electrons are held to the nucleus, so the carbon is more electronegative and the HC≡C⁻ ion is more stable — option (@K). The C≡C bond is shorter, not longer (@1); ethyne has fewer hydrogens (@2); π bonds come from p orbitals (@3).',
  d: 2, c: 'understanding', t: [3],
}));
add('acidorder-mcq', mcq({
  stem: 'A student ranks the C–H bonds of ethane, ethene and ethyne by the s character (25, 33.3 and 50 per cent) of the carbon orbital that holds the hydrogen. The order of increasing acidity is:',
  right: 'ethane < ethene < ethyne',
  wrong: ['ethyne < ethene < ethane', 'ethene < ethane < ethyne', 'ethane < ethyne < ethene'],
  sol: 'Acidity increases with the s character of the carbon orbital: sp³ (25%) < sp² (33.3%) < sp (50%), so ethane < ethene < ethyne — option (@K). Option (@1) is the reverse order; (@2) and (@3) put the sp² compound out of sequence.',
  d: 2, c: 'understanding', t: [3],
}));
add('amide-mcq', mcq({
  stem: 'Sodium amide in liquid ammonia is added separately to four hydrocarbons in four flasks. Ammonia is liberated and a sodium salt is formed in the flask containing:',
  right: 'but-1-yne',
  wrong: ['but-2-yne', 'but-1-ene', 'butane'],
  sol: 'NH₂⁻ removes a proton only from a sufficiently acidic C–H, and among these only a terminal alkyne has one: CH₃CH₂C≡CH + NaNH₂ → CH₃CH₂C≡CNa + NH₃ — option (@K). But-2-yne (@1) has no ≡C–H and the alkene (@2) and alkane (@3) are far too weakly acidic.',
  d: 2, c: 'application', t: [3],
}));
add('agtest-mcq', mcq({
  stem: 'Two isomeric alkynes A and B have the formula C₅H₈. Only A gives a white precipitate with ammoniacal silver nitrate, and boiling A with hot acidified potassium permanganate gives butanoic acid and carbon dioxide. A is:',
  right: 'pent-1-yne',
  wrong: ['pent-2-yne', '3-methylbut-1-yne', 'penta-1,3-diene'],
  sol: 'The precipitate shows that A is a terminal alkyne. Hot KMnO₄ turns the ≡CH carbon into CO₂ and the other carbon into COOH, so CH₃CH₂CH₂–C≡CH gives CH₃CH₂CH₂COOH (butanoic acid) + CO₂: pent-1-yne — option (@K). 3-Methylbut-1-yne (@2) would give 2-methylpropanoic acid, pent-2-yne (@1) gives no precipitate and the diene (@3) is not an alkyne.',
  d: 3, c: 'analysis', t: [3, 5],
}));

// ---------------------------------------------------------------- t04 addition, oxidation, polymerisation
add('hx-mcq', mcq({
  stem: 'Propyne is passed into an excess of hydrogen chloride in the presence of mercury(II) chloride. The final product is:',
  right: '2,2-dichloropropane',
  wrong: ['1,1-dichloropropane', '1,2-dichloropropane', '2-chloropropene'],
  sol: 'The first HCl adds by Markownikoff\'s rule to give 2-chloropropene, CH₃C(Cl)=CH₂; the second HCl adds to the same carbon again, giving CH₃CCl₂CH₃, 2,2-dichloropropane — option (@K). 2-Chloropropene (@3) is only the intermediate; (@1) and (@2) put the chlorine on the wrong carbons.',
  d: 2, c: 'application', t: [4],
}));
add('hydr-mcq', mcq({
  stem: 'Hex-3-yne is warmed with dilute sulphuric acid containing mercury(II) sulphate. The single carbonyl compound formed is:',
  right: 'hexan-3-one',
  wrong: ['hexanal', 'hexan-2-one', 'hexane-3,4-dione'],
  sol: 'OH adds to one of the two identical triple-bond carbons to give the enol CH₃CH₂CH=C(OH)CH₂CH₃, which shifts to the ketone CH₃CH₂CH₂–CO–CH₂CH₃, hexan-3-one — option (@K). No aldehyde (@1) forms because neither carbon is terminal, hexan-2-one (@2) would need the triple bond at C-2 and the dione (@3) is an ozonolysis-type product.',
  d: 2, c: 'application', t: [4],
}));
add('lindlar-mcq', mcq({
  stem: 'Oct-4-yne is shaken with hydrogen over palladium on calcium carbonate that has been poisoned with quinoline. The main product is:',
  right: 'cis-oct-4-ene',
  wrong: ['trans-oct-4-ene', 'octane', 'cis-oct-3-ene'],
  sol: 'Poisoned palladium (Lindlar\'s catalyst) adds one molecule of H₂ on the same face of the triple bond (syn addition) and stops at the alkene: cis-oct-4-ene — option (@K). The trans isomer (@1) needs sodium in liquid ammonia, octane (@2) needs an unpoisoned catalyst and the position of the double bond cannot move (@3).',
  d: 2, c: 'application', t: [4],
}));
add('kmno4-mcq', mcq({
  stem: 'Hept-3-yne, CH₃CH₂C≡CCH₂CH₂CH₃, is boiled with hot acidified potassium permanganate. The organic products are:',
  right: 'propanoic acid and butanoic acid',
  wrong: ['propanoic acid only', 'propanal and butanal', 'heptane-3,4-dione'],
  sol: 'Hot KMnO₄ cleaves the triple bond and oxidises each carbon to COOH: the CH₃CH₂– side gives propanoic acid and the CH₃CH₂CH₂– side gives butanoic acid — option (@K). Only one acid would form from a symmetrical alkyne (@1); the aldehydes (@2) are over-oxidised and the dione (@3) would need controlled ozonolysis.',
  d: 3, c: 'application', t: [4],
}));
add('poly-mcq', mcq({
  stem: 'Propyne vapour is passed through an iron tube heated to redness, and the cyclic trimer is collected. The aromatic product is:',
  right: '1,3,5-trimethylbenzene',
  wrong: ['methylbenzene', '1,2,3-trimethylbenzene', 'benzene'],
  sol: 'Three propyne molecules (C₃H₄) join to give C₉H₁₂ with a benzene ring; each ring carbon comes from an alternate carbon of the chain, so the three methyl groups end up on alternate carbons: 1,3,5-trimethylbenzene — option (@K). Methylbenzene has only 7 carbons (@1) and benzene (@3) is the product from ethyne.',
  d: 2, c: 'application', t: [4],
}));
add('flame-mcq', mcq({
  stem: 'Ethane, ethene and ethyne are burnt in air from three identical burners. Ethyne gives by far the sootiest flame because:',
  right: 'its percentage of carbon by mass is the highest, so combustion in air is the least complete',
  wrong: ['it has the highest enthalpy of combustion per mole', 'it contains no carbon–hydrogen bonds', 'it is the only one of the three that is unsaturated'],
  sol: 'The percentages of carbon are 80.0 (ethane), 85.7 (ethene) and 92.3 (ethyne). With a limited air supply, the carbon-rich compound leaves the most unburnt carbon as soot — option (@K). Ethyne\'s enthalpy of combustion per mole (about 1300 kJ) is the lowest of the three (@1), it does have C–H bonds (@2) and ethene is also unsaturated (@3).',
  d: 3, c: 'analysis', t: [4],
}));
add('brom-mcq', mcq({
  stem: 'Ethyne is bubbled slowly into a solution of bromine in tetrachloromethane until exactly one mole of bromine has been used for each mole of ethyne. The main product is:',
  right: '1,2-dibromoethene',
  wrong: ['1,1,2,2-tetrabromoethane', '1,2-dibromoethane', 'bromoethene'],
  sol: 'One mole of Br₂ adds across one of the two π bonds: HC≡CH + Br₂ → CHBr=CHBr, 1,2-dibromoethene — option (@K). A second mole would give the tetrabromo compound (@1); (@2) would need a saturated product from a double bond and (@3) contains only one Br.',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 tests
add('test-mcq', mcq({
  stem: 'Which single reagent gives a different observation with but-1-yne and but-2-yne?',
  right: 'ammoniacal silver nitrate solution',
  wrong: ['bromine water', 'cold dilute alkaline potassium permanganate', 'hydrogen with a nickel catalyst'],
  sol: 'Only but-1-yne has a ≡C–H group, so only it gives a white precipitate of silver butynide with ammoniacal AgNO₃ — option (@K). Both alkynes decolourise bromine water (@1) and Baeyer\'s reagent (@2) and both take up hydrogen over nickel (@3).',
  d: 2, c: 'application', t: [5],
}));
add('tests2-mcq', mcq({
  stem: 'A gas decolourises bromine water and cold dilute alkaline potassium permanganate, but gives no precipitate with ammoniacal silver nitrate. The gas could be:',
  right: 'propene',
  wrong: ['propyne', 'propane', 'ethyne'],
  sol: 'Decolourising both reagents shows an unsaturated compound, and no precipitate rules out a terminal alkyne: propene — option (@K). Propyne (@1) and ethyne (@3) would both give a precipitate, and propane (@2) would not decolourise bromine water.',
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- assertion-reason (registered in the order a b c d c b)
add('acid-ar', ar({
  a: 'Ethyne liberates hydrogen gas when sodium metal is added to it under suitable conditions.',
  r: 'The C–H bond of ethyne uses an sp orbital with 50% s character, which makes its hydrogen weakly acidic.',
  key: 'a',
  sol: 'Both are true, and R explains A: the sp carbon holds the C–H pair tightly, so the hydrogen is displaced by sodium as 2HC≡CH + 2Na → 2HC≡CNa + H₂ — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('carbide-ar', ar({
  a: 'Calcium carbide reacts with cold water to give ethyne and calcium hydroxide.',
  r: 'Calcium carbide is manufactured by heating lime and coke in an electric arc furnace.',
  key: 'b',
  sol: 'Both are true. The hydrolysis of CaC₂ happens because the carbide ion C₂²⁻ is a strong base that takes protons from water; the way carbide is manufactured has no bearing on this, so R does not explain A — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('hydr-ar', ar({
  a: 'Hydration of propyne with mercury(II) sulphate and dilute sulphuric acid gives propanone.',
  r: 'The enol formed first is stable and can be isolated from the reaction mixture.',
  key: 'c',
  sol: 'A is true. R is false: the enol CH₂=C(OH)CH₃ is unstable and rearranges at once to the keto form, propanone (tautomerism) — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('lindlar-ar', ar({
  a: 'Hydrogenation of but-2-yne over Lindlar\'s catalyst gives trans-but-2-ene.',
  r: 'Lindlar\'s catalyst is palladium on charcoal without any poison, so the reduction continues to the alkane.',
  key: 'd',
  sol: 'Both are false: Lindlar\'s catalyst is palladium on calcium carbonate, poisoned with lead acetate and quinoline, and it stops at the cis alkene by syn addition — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('bond-ar', ar({
  a: 'The carbon–carbon bond in ethyne is shorter than the carbon–carbon bond in ethene.',
  r: 'The two π bonds of ethyne are formed by head-on overlap of sp hybrid orbitals.',
  key: 'c',
  sol: 'A is true (120 pm against 134 pm). R is false: π bonds are formed by the sideways overlap of unhybridised p orbitals; head-on overlap of sp orbitals gives the σ bond — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('sat-ar', ar({
  a: 'Propyne adds two moles of hydrogen bromide to give 2,2-dibromopropane.',
  r: 'Propyne is a gas at room temperature.',
  key: 'b',
  sol: 'Both are true (propyne boils at −23.2 °C). The product follows from Markownikoff addition twice to the same carbon, which has nothing to do with the physical state — option (b).',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- true-false, fill, match
add('linear-tf', tf({
  stem: 'All four atoms of an ethyne molecule lie on one straight line because each carbon atom is sp hybridised.',
  key: 't',
  sol: 'True. The two sp orbitals of each carbon point in opposite directions (180°), so H–C≡C–H is linear.',
  d: 1, c: 'understanding', t: [1],
}));
add('but2yne-tf', tf({
  stem: 'But-2-yne gives a white precipitate when it is passed into ammoniacal silver nitrate solution.',
  key: 'f',
  sol: 'False. But-2-yne has no hydrogen on a triple-bonded carbon, so it cannot form an acetylide; only terminal alkynes such as but-1-yne give the precipitate.',
  d: 2, c: 'understanding', t: [3],
}));
add('ketone-tf', tf({
  stem: 'Every alkyne other than ethyne gives a ketone, not an aldehyde, on hydration with mercury(II) sulphate and dilute sulphuric acid.',
  key: 't',
  sol: 'True. OH adds to the carbon with fewer hydrogens (or to either carbon of an internal alkyne), so the carbonyl carbon always has two carbon neighbours; only ethyne gives an aldehyde, ethanal.',
  d: 2, c: 'understanding', t: [4],
}));
add('enol-fill', fill({
  stem: 'The unstable first product of the hydration of an alkyne, which has an OH group on a doubly bonded carbon, is called an ___.',
  acc: [['enol', 'enols']],
  sol: 'An **enol**, which shifts to the carbonyl compound.',
  d: 1, c: 'recall', t: [4],
}));
add('hyb-fill', fill({
  stem: 'The carbon atoms joined by the triple bond in ethyne are ___ hybridised.',
  acc: [['sp']],
  sol: '**sp** hybridised: two σ bonds in a line and two p orbitals for the two π bonds.',
  d: 1, c: 'recall', t: [1],
}));
add('iron-fill', fill({
  stem: 'Ethyne forms benzene when passed through a red-hot iron tube kept at about ___ K.',
  acc: [['873', '870', '873 K']],
  sol: 'About **873** K (600 °C).',
  d: 1, c: 'recall', t: [4],
}));
add('react-match', match({
  stem: 'Match each reaction of ethyne in Column I with its main product in Column II.',
  pairs: [
    ['Ethyne with one mole of HCl and HgCl₂', 'Chloroethene'],
    ['Ethyne with water, HgSO₄ and dilute H₂SO₄', 'Ethanal'],
    ['Ethyne with sodium amide in liquid ammonia', 'Sodium acetylide'],
    ['Ethyne through a red-hot iron tube', 'Benzene'],
  ],
  order: [2, 0, 3, 1],
  sol: 'One mole of HCl adds once to give chloroethene; hydration gives the enol and then ethanal; NaNH₂ removes the acidic hydrogen to give the acetylide; trimerisation gives benzene.',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('prep-match', match({
  stem: 'Match each source of ethyne in Column I with the key reagent or condition in Column II.',
  pairs: [
    ['Calcium carbide', 'Cold water'],
    ['1,2-Dibromoethane', 'Alcoholic KOH, then NaNH₂'],
    ['Potassium fumarate solution', 'Electrolysis'],
    ['Methane of natural gas', 'Electric arc at about 1773 K, then quenching'],
  ],
  order: [3, 0, 1, 2],
  sol: 'Carbide is hydrolysed by water; a vicinal dihalide loses two HBr with alkali and amide; Kolbe electrolysis of the dicarboxylate gives ethyne; methane is cracked in an arc and quenched.',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- numericals
{
  const mS = '16.0';
  const pc = '80.0';
  const mCaC2 = (Number(mS) * Number(pc)) / 100; // 12.8 g
  const n = mCaC2 / 64; // 0.200
  const V = n * MV; // 4.48
  add('cac2-num', num({
    stem: `A caver in Meghalaya charges a lamp with ${mS} g of technical calcium carbide that contains ${pc}% CaC₂ by mass; water drips on it until all the CaC₂ has reacted. What volume of ethyne, in litres at STP, is released? (Ca = 40, C = 12; molar volume ${MV} L)`,
    value: 4.48, tol: 0.01, unit: 'L',
    sol: r`Pure CaC₂ $= ${mS} \times ${pc}/100 = ${mCaC2.toFixed(1)}\ \text{g}$, so $n = ${mCaC2.toFixed(1)} \div 64 = ${n.toFixed(3)}\ \text{mol}$. From $\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$, 1 mol gives 1 mol of ethyne: $V = ${n.toFixed(3)} \times ${MV} = ${V.toFixed(2)}\ \text{L}$.`,
    scheme: [['Mass of pure CaC₂ = 12.8 g and n = 0.200 mol', 1], ['V = 0.200 × 22.4 = 4.48 L', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  }), () => near(V, 4.48, 0.001) || 'V');
}
{
  const m = '5.20';
  const Y = '75.0';
  const M = 24 + 2 + 4 * 80; // C2H2Br4 = 346
  const n = Number(m) / 26;
  const th = n * M; // 69.2
  const act = (th * Number(Y)) / 100; // 51.9
  add('tbe-num', num({
    stem: `A student in a polymer laboratory bubbles ${m} g of ethyne into excess bromine in tetrachloromethane and isolates 1,1,2,2-tetrabromoethane with a yield of ${Y}%. What mass of the product, in grams, is obtained? (C = 12, H = 1, Br = 80)`,
    value: 51.9, tol: 0.1, unit: 'g',
    sol: r`$\ce{HC#CH + 2Br2 -> CHBr2CHBr2}$. $n(\text{C}_2\text{H}_2) = ${m} \div 26 = ${n.toFixed(3)}\ \text{mol}$ and $M(\text{C}_2\text{H}_2\text{Br}_4) = ${M}\ \text{g mol}^{-1}$, so the theoretical mass is $${n.toFixed(3)} \times ${M} = ${th.toFixed(1)}\ \text{g}$. At ${Y}% yield, $m = ${th.toFixed(1)} \times ${Y}/100 = ${act.toFixed(1)}\ \text{g}$.`,
    scheme: [['Balanced equation, n(C₂H₂) = 0.200 mol', 1], ['Theoretical mass 69.2 g', 1], ['75.0% of 69.2 = 51.9 g', 1]],
    marks: 3, d: 3, c: 'application', t: [4],
  }), () => near(act, 51.9, 0.002) || 'act');
}
{
  const vMix = '50.0';
  const vH = '60.0';
  const vYne = Number(vH) / 2; // 30.0
  const vEthane = Number(vMix) - vYne; // 20.0
  add('mixh2-num', num({
    stem: `A gas sample of ${vMix} mL, a mixture of ethane and ethyne, needs ${vH} mL of hydrogen for complete hydrogenation over a nickel catalyst (all volumes at the same temperature and pressure). What volume of ethane, in mL, does the sample contain?`,
    value: 20, tol: 0.1, unit: 'mL',
    sol: r`Ethane does not react; $\ce{HC#CH + 2H2 -> CH3CH3}$ takes 2 volumes of H₂ per volume of ethyne. $V(\text{ethyne}) = ${vH} \div 2 = ${vYne.toFixed(1)}\ \text{mL}$, so $V(\text{ethane}) = ${vMix} - ${vYne.toFixed(1)} = ${vEthane.toFixed(1)}\ \text{mL}$.`,
    scheme: [['2 volumes of H₂ per volume of ethyne gives 30.0 mL ethyne', 1], ['Ethane = 50.0 − 30.0 = 20.0 mL', 1]],
    marks: 2, d: 3, c: 'application', t: [4, 5],
  }), () => near(vEthane, 20, 0.001) || 'vEthane');
}

// ---------------------------------------------------------------- short answers, 2 marks
add('bond-short', short({
  marks: 2,
  stem: 'Describe the bonding in an ethyne molecule: give the hybridisation of carbon, the kinds of bond between the two carbons and the shape of the molecule.',
  model: 'Each carbon is sp hybridised. The two carbons are joined by one σ bond (head-on overlap of sp orbitals) and two π bonds (sideways overlap of the two pairs of unhybridised p orbitals, in perpendicular planes). The other sp orbital of each carbon bonds to hydrogen, so the molecule is linear, H–C≡C–H, with an angle of 180°.',
  sol: 'sp; one σ and two π; linear.',
  scheme: [['sp hybridisation; one σ and two π bonds', 1], ['Linear shape with 180° angle', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('sp-short', short({
  marks: 2,
  stem: 'The carbon–carbon bond lengths in ethane, ethene and ethyne are 154 pm, 134 pm and 120 pm. Explain this trend.',
  model: 'As the number of bonds between the carbons rises from one to two to three, more electron density lies between the nuclei and pulls them closer, so the bond shortens. In addition, the carbon orbital of the σ bond has more s character (sp³ 25%, sp² 33%, sp 50%), and an s orbital is smaller and nearer the nucleus, which shortens the bond further.',
  sol: 'More bonds; more s character.',
  scheme: [['More bonding electrons between the nuclei pull the carbons closer', 1], ['Greater s character gives a shorter σ bond', 1]],
  d: 2, c: 'application', t: [1],
}));
add('carbEq-short', short({
  marks: 2,
  stem: 'Write balanced equations for (i) the formation of calcium carbide from quicklime and coke in an electric furnace and (ii) the production of ethyne from calcium carbide.',
  model: r`(i) $\ce{CaO + 3C -> CaC2 + CO}$ (about 2273 K). (ii) $\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$.`,
  sol: 'Two equations.',
  scheme: [['Equation for calcium carbide', 1], ['Equation for ethyne', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('dihEq-short', short({
  marks: 2,
  stem: 'Write the equation for the preparation of propyne from 1,2-dibromopropane with excess alcoholic potassium hydroxide, and explain why two moles of the alkali are needed for each mole of the dihalide.',
  model: r`$\ce{CH3CHBrCH2Br + 2KOH -> CH3C#CH + 2KBr + 2H2O}$. Each KOH removes one molecule of HBr: the first gives a bromopropene and the second removes another H and Br to form the triple bond, so two moles are needed.`,
  sol: 'Equation; two HBr removed.',
  scheme: [['Balanced equation', 1], ['Two moles of HBr are eliminated, one per KOH', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('kolbe-short', short({
  marks: 2,
  stem: 'Aqueous potassium maleate is electrolysed in a cell with inert electrodes. Write the overall equation and name the products at the anode and at the cathode.',
  model: r`$\ce{KOOCCH=CHCOOK + 2H2O -> HC#CH + 2CO2 + H2 + 2KOH}$. At the anode, the carboxylate ions lose electrons and CO₂ to give ethyne together with carbon dioxide; at the cathode, water is reduced to hydrogen gas and hydroxide ions (KOH).`,
  sol: 'Overall equation; anode ethyne and CO₂; cathode H₂.',
  scheme: [['Balanced overall equation', 1], ['Ethyne and CO₂ at the anode; H₂ at the cathode', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('acid-short', short({
  marks: 2,
  stem: 'Account for the order of acidity ethyne > ethene > ethane in terms of the hybridisation of carbon.',
  model: 'The acidity depends on the s character of the carbon orbital in the C–H bond: sp in ethyne (50%), sp² in ethene (33.3%) and sp³ in ethane (25%). An orbital with more s character is nearer the nucleus, so the carbon is more electronegative, the proton is lost more easily and the carbanion formed is more stable.',
  sol: 'sp > sp² > sp³ in s character.',
  scheme: [['s character 50%, 33.3% and 25%', 1], ['More s character: carbanion more stable, proton lost more easily', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('acetEq-short', short({
  marks: 2,
  stem: 'Write equations for the reaction of ethyne with (i) ammoniacal silver nitrate and (ii) ammoniacal cuprous chloride, and give the colour of each precipitate.',
  model: r`(i) $\ce{HC#CH + 2AgNO3 + 2NH4OH -> AgC#CAg + 2NH4NO3 + 2H2O}$, a white precipitate of silver acetylide. (ii) $\ce{HC#CH + Cu2Cl2 + 2NH4OH -> CuC#CCu + 2NH4Cl + 2H2O}$, a red precipitate of copper acetylide.`,
  sol: 'Two equations; white and red.',
  scheme: [['Silver acetylide equation and white colour', 1], ['Copper acetylide equation and red colour', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('poly-short', short({
  marks: 2,
  stem: 'Write equations for the cyclic polymerisation of (i) ethyne and (ii) propyne, giving the conditions and naming the products.',
  model: r`(i) $\ce{3C2H2 -> C6H6}$ when ethyne is passed through a red-hot iron tube at about 873 K; the product is benzene. (ii) $\ce{3CH3C#CH -> C9H12}$ under the same conditions; the product is 1,3,5-trimethylbenzene.`,
  sol: 'Two equations with names.',
  scheme: [['Ethyne to benzene with conditions', 1], ['Propyne to 1,3,5-trimethylbenzene', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('hydr-short', short({
  marks: 2,
  stem: 'Describe how ethyne is converted into ethanal. Name the reagents, the unstable intermediate and the kind of isomerism by which the intermediate changes into the product.',
  model: r`Ethyne is warmed with dilute H₂SO₄ and HgSO₄. Water adds to give the enol ethenol, $\ce{CH2=CHOH}$, which is unstable and rearranges at once to ethanal, $\ce{CH3CHO}$. The change of enol into carbonyl compound is tautomerism (keto–enol).`,
  sol: 'HgSO₄/H₂SO₄; enol; tautomerism.',
  scheme: [['Reagents and the enol intermediate', 1], ['Rearrangement to ethanal by tautomerism', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- short answers, 3 marks
add('iso-short3', short({
  marks: 3,
  stem: 'Write the condensed structures and IUPAC names of all the alkynes of formula C₅H₈, and state which of them give a white precipitate with ammoniacal silver nitrate.',
  model: 'CH₃CH₂CH₂C≡CH, pent-1-yne; CH₃CH₂C≡CCH₃, pent-2-yne; (CH₃)₂CHC≡CH, 3-methylbut-1-yne. Pent-1-yne and 3-methylbut-1-yne are terminal alkynes (they have a ≡C–H group) and give the white precipitate of the silver acetylide; pent-2-yne has no hydrogen on a triple-bonded carbon and gives none.',
  sol: 'Three isomers; two terminal.',
  scheme: [['Three structures drawn', 1], ['Three names correct', 1], ['Pent-1-yne and 3-methylbut-1-yne give the precipitate', 1]],
  d: 3, c: 'application', t: [1, 3],
}));
add('carbide-short3', short({
  marks: 3,
  stem: 'Ethyne made from technical calcium carbide has a garlic-like smell. Write the equation for its formation, say what causes the smell, and name a reagent that purifies the gas.',
  model: r`$\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. Impurities in the coke and lime form traces of phosphine, hydrogen sulphide and ammonia in the carbide, and these gases are released with the ethyne; phosphine causes the garlic-like smell. They are removed by passing the gas through acidified copper(II) sulphate solution (or acidified potassium dichromate).`,
  sol: 'Equation; phosphine; acidified CuSO₄.',
  scheme: [['Balanced equation', 1], ['Smell due to phosphine (and H₂S, NH₃) from impurities', 1], ['Acidified copper(II) sulphate solution', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sodium-short3', short({
  marks: 3,
  stem: 'Write equations for the reaction of propyne with (i) sodium amide in liquid ammonia and (ii) ammoniacal silver nitrate, and explain why but-2-yne does not react with either reagent.',
  model: r`(i) $\ce{CH3C#CH + NaNH2 -> CH3C#CNa + NH3}$. (ii) $\ce{CH3C#CH + AgNO3 + NH4OH -> CH3C#CAg + NH4NO3 + H2O}$, a white precipitate. But-2-yne, CH₃C≡CCH₃, has no hydrogen on a triple-bonded carbon, so it has no acidic C–H to lose and cannot form an acetylide.`,
  sol: 'Two equations; no ≡C–H.',
  scheme: [['Sodium amide equation', 1], ['Silver nitrate equation', 1], ['No acidic ≡C–H in but-2-yne', 1]],
  d: 3, c: 'application', t: [3],
}));
add('hx-short3', short({
  marks: 3,
  stem: 'Ethyne is treated with an excess of hydrogen chloride in the presence of mercury(II) chloride. Write the equations for the two successive additions, name the intermediate and the final product, and state the rule that fixes the position of the second chlorine atom.',
  model: r`$\ce{HC#CH + HCl -> CH2=CHCl}$ (chloroethene), then $\ce{CH2=CHCl + HCl -> CH3CHCl2}$ (1,1-dichloroethane). The second chlorine goes to the carbon that already carries one, following Markownikoff's rule: the negative part of HX adds to the carbon with fewer hydrogens, and the chlorine stabilises the positive charge on its own carbon.`,
  sol: 'Two equations; geminal product; Markownikoff.',
  scheme: [['First equation with chloroethene', 1], ['Second equation with 1,1-dichloroethane', 1], ['Markownikoff\'s rule stated', 1]],
  d: 3, c: 'application', t: [4],
}));
add('hydrProp-short3', short({
  marks: 3,
  stem: 'Explain, using the structure of the enol, why the hydration of propyne gives propanone and not propanal.',
  model: 'Water adds by Markownikoff\'s rule: H goes to the terminal carbon, which has more hydrogens, and OH to the middle carbon, giving the enol CH₂=C(OH)CH₃ (prop-1-en-2-ol). The enol is unstable and shifts its hydrogen from O to the terminal carbon, giving the carbonyl compound CH₃–CO–CH₃, propanone. For propanal the OH would have to be on the terminal carbon, which Markownikoff addition does not give.',
  sol: 'Markownikoff; enol; tautomerism.',
  scheme: [['OH on the middle carbon by Markownikoff\'s rule', 1], ['Enol CH₂=C(OH)CH₃ shown', 1], ['Tautomerises to propanone', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('ox-short3', short({
  marks: 3,
  stem: 'Give the organic products formed when (i) hex-2-yne is boiled with hot acidified potassium permanganate and (ii) ethyne is burnt in a plentiful supply of oxygen, and name one industrial use of the second reaction.',
  model: r`(i) Hot KMnO₄ cleaves the triple bond and oxidises each carbon to a carboxylic acid: ethanoic acid, CH₃COOH, and butanoic acid, CH₃CH₂CH₂COOH. (ii) $\ce{2C2H2 + 5O2 -> 4CO2 + 2H2O}$; the very hot oxy-acetylene flame (about 3000 °C) is used for welding and cutting metals.`,
  sol: 'Ethanoic and butanoic acids; combustion; welding.',
  scheme: [['Ethanoic acid and butanoic acid', 1], ['Balanced combustion equation', 1], ['Welding or cutting as the use', 1]],
  d: 3, c: 'application', t: [4],
}));
{
  const V = '2.80';
  const n = Number(V) / MV; // 0.125
  const vO2 = 2.5 * n * MV; // 7.00
  const mCO2 = 2 * n * 44; // 11.0
  add('comb-short3', short({
    marks: 3,
    stem: `A welder's cylinder releases ${V} L of ethyne, measured at STP, which is burnt completely in oxygen. Write the balanced equation and calculate the volume of oxygen consumed at STP and the mass of carbon dioxide formed. (C = 12, O = 16; molar volume ${MV} L)`,
    model: r`$\ce{2C2H2 + 5O2 -> 4CO2 + 2H2O}$. $n(\text{C}_2\text{H}_2) = ${V} \div ${MV} = ${n.toFixed(3)}$ mol. Oxygen: $2.5 \times ${n.toFixed(3)} = ${(2.5 * n).toFixed(4)}$ mol, so $V = ${vO2.toFixed(2)}$ L. Carbon dioxide: $2 \times ${n.toFixed(3)} = ${(2 * n).toFixed(3)}$ mol, so mass $= ${(2 * n).toFixed(3)} \times 44 = ${mCO2.toFixed(1)}$ g.`,
    sol: 'Equation; oxygen 7.00 L; CO₂ 11.0 g.',
    scheme: [['Balanced equation', 1], ['Oxygen 7.00 L', 1], ['Carbon dioxide 11.0 g', 1]],
    d: 3, c: 'application', t: [4],
  }), () => near(vO2, 7.0, 0.001) && near(mCO2, 11.0, 0.001) || 'comb');
}
{
  const pc = (a, b) => ((a * 12) / (a * 12 + b)) * 100;
  const pEthane = pc(2, 6); // 80.0
  const pEthene = pc(2, 4); // 85.7
  const pEthyne = pc(2, 2); // 92.3
  add('flame-short3', short({
    marks: 3,
    stem: 'Calculate the percentage of carbon by mass in ethane, ethene and ethyne (C = 12, H = 1), and use the values to explain why ethyne burns with a sooty flame in air but gives a very hot, soot-free flame when burnt in pure oxygen.',
    model: `Ethane C₂H₆: 24/30 × 100 = ${pEthane.toFixed(1)}%; ethene C₂H₄: 24/28 × 100 = ${pEthene.toFixed(1)}%; ethyne C₂H₂: 24/26 × 100 = ${pEthyne.toFixed(1)}%. Ethyne is the richest in carbon, and the air supply of an ordinary burner is not enough to oxidise all of it, so unburnt carbon glows as a sooty flame. In pure oxygen the supply is ample, so combustion is complete: 2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O, and the heat evolved gives the very hot oxy-acetylene flame.`,
    sol: 'Percentages 80.0, 85.7, 92.3; incomplete combustion in air.',
    scheme: [['Three percentages computed', 1], ['Highest carbon content leads to incomplete combustion in air', 1], ['Complete combustion in oxygen gives a hot, clean flame', 1]],
    d: 3, c: 'analysis', t: [4],
  }), () => near(pEthane, 80.0, 0.001) && near(pEthene, 85.7, 0.001) && near(pEthyne, 92.3, 0.001) || 'pct');
}
add('test-short3', short({
  marks: 3,
  stem: 'Three gas jars in a store-room are labelled only A, B and C. They contain ethane, ethene and ethyne in some order. Describe a sequence of tests, with the observations, that identifies each gas.',
  model: 'Pass each gas through ammoniacal silver nitrate solution: the gas that gives a white precipitate is ethyne (a terminal alkyne). Shake the other two with bromine water: the one that decolourises it is ethene; the one that causes no change is ethane (an alkane does not react). Baeyer\'s reagent can be used in place of bromine water in the second test.',
  sol: 'Ammoniacal AgNO₃ then bromine water.',
  scheme: [['Ammoniacal AgNO₃: white precipitate identifies ethyne', 1], ['Bromine water decolourised by ethene', 1], ['No change for ethane', 1]],
  d: 3, c: 'application', t: [5],
}));
add('ac-short3', short({
  marks: 3,
  stem: 'Ethyne reacts with sodium amide but gives no useful acetylide with aqueous sodium hydroxide. Using the approximate pKa values of ethyne (25) and water (15.7), explain this, and say what you would observe on adding sodium metal to ethyne in liquid ammonia.',
  model: 'A base can deprotonate an acid effectively only if the acid it forms is weaker than the one it removes the proton from. Water (pKa 15.7) is a much stronger acid than ethyne (pKa 25), so the OH⁻ ion is not basic enough and the equilibrium lies on the side of ethyne and OH⁻. The amide ion is the conjugate base of ammonia, a far weaker acid, so it removes the proton completely. With sodium in liquid ammonia, bubbles of hydrogen are seen as sodium acetylide forms.',
  sol: 'Ethyne is a weaker acid than water; NH₂⁻ is a stronger base.',
  scheme: [['Compare the acidity of ethyne and water', 1], ['NH₂⁻ is a stronger base than OH⁻', 1], ['Hydrogen evolved with sodium', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- long answers (5 marks, in parts)
add('struct-long', long({
  stem: '(a) Describe the bonding in ethyne, giving the hybridisation of carbon, the number of σ and π bonds in the molecule and its shape. [2]\n\n(b) The carbon–carbon bond lengths are 154 pm in ethane, 134 pm in ethene and 120 pm in ethyne. Which bond is the strongest, and why is it the shortest? [1]\n\n(c) Write the structures and IUPAC names of the two alkynes of formula C₄H₆ and say why neither has cis–trans isomers. [2]',
  model: '(a) Each carbon is sp hybridised; ethyne has 3 σ bonds (two C–H and one C–C) and 2 π bonds, and is linear (180°). (b) The C≡C bond is the strongest and shortest: three bonding pairs (one σ and two π) hold the carbons together, and the sp orbital of the σ bond has the most s character. (c) CH₃CH₂C≡CH, but-1-yne, and CH₃C≡CCH₃, but-2-yne. Cis–trans isomerism needs two different groups on each carbon of a double bond in a planar arrangement; each triple-bonded carbon carries only one other group, on a straight line.',
  sol: 'sp; 3σ, 2π; strongest; two isomers; no cis–trans.',
  scheme: [['(a) sp hybridisation; 3 σ and 2 π bonds', 1], ['(a) linear, 180°', 1], ['(b) strongest and shortest because of three bonding pairs and s character', 1], ['(c) two structures and names', 1], ['(c) no cis–trans: one group per carbon on a straight line', 1]],
  d: 3, c: 'application', t: [1],
}));
add('prep-long', long({
  stem: '(a) Write balanced equations for the manufacture of ethyne from limestone, coke and water, through calcium oxide and calcium carbide. [2]\n\n(b) State how ethyne is obtained from natural gas, with the equation and conditions. [1]\n\n(c) Write the equation for the preparation of propyne from 1,1-dibromopropane, and state the reagent and the number of moles of it that are needed. [2]',
  model: r`(a) $\ce{CaCO3 -> CaO + CO2}$; $\ce{CaO + 3C -> CaC2 + CO}$ (electric furnace, about 2273 K); $\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. (b) Methane is heated in an electric arc to about 1773 K and quenched rapidly: $\ce{2CH4 -> C2H2 + 3H2}$. (c) $\ce{CH3CH2CHBr2 + 2KOH -> CH3C#CH + 2KBr + 2H2O}$; alcoholic KOH, 2 mol per mole of dibromide.`,
  sol: 'Carbide route; arc process; geminal dihalide.',
  scheme: [['(a) lime and carbide equations', 1], ['(a) ethyne equation', 1], ['(b) arc equation with conditions', 1], ['(c) balanced equation', 1], ['(c) alcoholic KOH, 2 mol', 1]],
  d: 3, c: 'application', t: [2],
}));
add('acid-long', long({
  stem: '(a) The s character of the carbon orbital in the C–H bond is 25% in ethane, 33.3% in ethene and 50% in ethyne. Explain how this accounts for the acidity of ethyne. [2]\n\n(b) Write equations for the reaction of ethyne with sodium and with ammoniacal silver nitrate. [2]\n\n(c) How can ethyne be regenerated from the silver compound? [1]',
  model: r`(a) The orbital with more s character is closer to the nucleus, so the sp carbon is more electronegative than sp² or sp³ carbon; it holds the bonding pair more strongly, the hydrogen is released as H⁺ more easily, and the HC≡C⁻ ion is stabilised. (b) $\ce{2HC#CH + 2Na -> 2HC#CNa + H2}$ and $\ce{HC#CH + 2AgNO3 + 2NH4OH -> AgC#CAg + 2NH4NO3 + 2H2O}$. (c) Treat the (moist) precipitate with dilute nitric acid, which protonates the acetylide and gives back ethyne.`,
  sol: 's character; two equations; dilute HNO₃.',
  scheme: [['(a) more s character, nearer the nucleus, more electronegative', 1], ['(a) acetylide ion stabilised', 1], ['(b) sodium equation', 1], ['(b) silver equation', 1], ['(c) dilute HNO₃', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('add-long', long({
  stem: '(a) State the reagents by which but-2-yne can be converted into (i) cis-but-2-ene, (ii) trans-but-2-ene and (iii) butane. [2]\n\n(b) But-1-yne is warmed with mercury(II) sulphate and dilute sulphuric acid. Write the structure of the enol first formed and the final product, and name the type of isomerism between them. [2]\n\n(c) Name the product when propyne reacts with an excess of hydrogen bromide. [1]',
  model: '(a) (i) H₂ with Lindlar\'s catalyst (Pd on CaCO₃, poisoned); (ii) sodium in liquid ammonia; (iii) H₂ in excess with Ni (or Pt, Pd). (b) The enol is CH₂=C(OH)CH₂CH₃ (OH on the carbon with fewer hydrogens); it rearranges to butanone, CH₃COCH₂CH₃, the change being tautomerism. (c) Two moles of HBr add to the same carbon by Markownikoff\'s rule, giving 2,2-dibromopropane.',
  sol: 'Lindlar; Na/NH₃; Ni; enol and butanone; 2,2-dibromopropane.',
  scheme: [['(a) Lindlar and sodium in liquid ammonia', 1], ['(a) excess H₂ with Ni', 1], ['(b) enol structure', 0.5], ['(b) butanone and tautomerism', 1.5], ['(c) 2,2-dibromopropane', 1]],
  d: 3, c: 'application', t: [4],
}));
{
  const mX = '4.10';
  const M = 82; // C6H10
  const n = Number(mX) / M; // 0.0500
  const V = 2 * n * MV; // 2.24 L of H2
  add('ox-long', long({
    stem: `A hydrocarbon X of molecular formula C₆H₁₀ gives a white precipitate with ammoniacal silver nitrate. On boiling with hot acidified potassium permanganate it gives pentanoic acid and carbon dioxide.\n\n(a) Deduce the structure of X and name it. [2]\n\n(b) An isomer Y of X gives no precipitate with ammoniacal silver nitrate, and hot permanganate converts it into ethanoic acid and butanoic acid. Identify Y. [1]\n\n(c) Give the product when X is hydrated with HgSO₄ and dilute H₂SO₄. [1]\n\n(d) What volume of hydrogen at STP is needed to convert ${mX} g of X completely into the alkane? (C = 12, H = 1; molar volume ${MV} L) [1]`,
    model: `(a) The precipitate shows a terminal alkyne; the acid and CO₂ mean CH₃CH₂CH₂CH₂–C≡CH is oxidised to CH₃CH₂CH₂CH₂COOH + CO₂. X is hex-1-yne. (b) Y has no ≡C–H and splits into a 2-carbon and a 4-carbon acid: CH₃–C≡C–CH₂CH₂CH₃, hex-2-yne. (c) OH adds to C-2, giving the enol which rearranges to hexan-2-one, CH₃COCH₂CH₂CH₂CH₃. (d) n(X) = ${mX} ÷ ${M} = ${n.toFixed(3)} mol; 2 mol of H₂ per mole of alkyne gives ${(2 * n).toFixed(3)} mol, so V = ${(2 * n).toFixed(3)} × ${MV} = ${V.toFixed(2)} L.`,
    sol: 'Hex-1-yne; hex-2-yne; hexan-2-one; 2.24 L.',
    scheme: [['(a) terminal alkyne with a straight chain; hex-1-yne', 2], ['(b) hex-2-yne', 1], ['(c) hexan-2-one', 1], ['(d) 2.24 L', 1]],
    d: 4, c: 'analysis', t: [3, 4, 5],
  }), () => near(V, 2.24, 0.001) || 'V');
}
add('test-long', long({
  stem: 'Three colourless gases A, B and C are each one of ethane, ethene and ethyne. Each is tested in turn with three reagents, with the results below.\n\nA: ammoniacal silver nitrate gives a white precipitate; bromine water is decolourised.\nB: no precipitate; bromine water is decolourised; cold dilute alkaline permanganate is decolourised.\nC: no precipitate; bromine water and permanganate are both unchanged.\n\n(a) Identify A, B and C, giving a reason for each. [3]\n\n(b) Write the equation for the reaction of A with an excess of bromine. [1]\n\n(c) Why would bromine water alone not have been enough to separate A from B? [1]',
  model: r`(a) A is ethyne: the precipitate needs a terminal alkyne with an acidic ≡C–H. B is ethene: it is unsaturated (it decolourises both reagents) but has no acidic hydrogen. C is ethane: a saturated alkane does not react with any of the reagents. (b) $\ce{HC#CH + 2Br2 -> CHBr2CHBr2}$ (1,1,2,2-tetrabromoethane). (c) Both ethyne and ethene decolourise bromine water, so only the silver nitrate test separates them.`,
  sol: 'A ethyne; B ethene; C ethane; tetrabromoethane.',
  scheme: [['(a) A ethyne with reason', 1], ['(a) B ethene with reason', 1], ['(a) C ethane with reason', 1], ['(b) balanced equation', 1], ['(c) both unsaturated gases decolourise bromine water', 1]],
  d: 3, c: 'analysis', t: [5],
}));

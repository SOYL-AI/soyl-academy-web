// ch09 Amines — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a c b d a c.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 structure, classification, naming
add('classify-mcq', mcq({
  stem: r`Propan-2-amine, $\ce{(CH3)2CHNH2}$, is a:`,
  right: 'primary amine',
  wrong: ['secondary amine', 'tertiary amine', 'quaternary ammonium salt'],
  sol: 'Only one carbon group is bonded to nitrogen, so it is primary — option (@K). The carbon bearing N being secondary does not matter for amines (@1).',
  d: 2, c: 'understanding', t: [1],
}));
add('name-mcq', mcq({
  stem: r`The IUPAC name of $\ce{CH3CH2N(CH3)2}$ is:`,
  right: 'N,N-dimethylethanamine',
  wrong: ['N-ethyl-N-methylmethanamine', 'dimethylethylamine', 'N,N-diethylmethanamine'],
  sol: 'The longest chain on nitrogen is ethyl (ethanamine); the two methyl groups on N are N,N-dimethyl — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('structure-mcq', mcq({
  stem: 'The shape of the trimethylamine molecule around nitrogen is:',
  right: 'pyramidal, with a lone pair on nitrogen',
  wrong: ['trigonal planar', 'tetrahedral with four bonds', 'linear'],
  sol: 'Nitrogen is sp³ with three bonds and one lone pair, giving a pyramid — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('class-tf', tf({
  stem: 'N-Methylbenzenamine (C₆H₅NHCH₃) is a secondary amine.',
  key: 't',
  sol: 'True. Two carbon groups (phenyl and methyl) are bonded to nitrogen.',
  d: 1, c: 'understanding', t: [1],
}));
add('name-match', match({
  stem: 'Match each amine with its IUPAC name.',
  pairs: [
    ['C₆H₅NH₂', 'Benzenamine'],
    ['H₂NCH₂CH₂NH₂', 'Ethane-1,2-diamine'],
    ['(CH₃)₃N', 'N,N-Dimethylmethanamine'],
    ['CH₃CH(NH₂)CH₃', 'Propan-2-amine'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Aniline is benzenamine; the diamine is ethane-1,2-diamine; trimethylamine is N,N-dimethylmethanamine; isopropylamine is propan-2-amine.',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('gabriel-mcq', mcq({
  stem: 'Which amine can be prepared by the Gabriel phthalimide synthesis?',
  right: 'Butan-1-amine',
  wrong: ['Aniline', 'N-Methylethanamine', 'Triethylamine'],
  sol: 'Gabriel synthesis gives pure primary aliphatic amines — option (@K). Aryl halides do not react with the phthalimide anion (@1); it cannot give 2° or 3° amines.',
  d: 2, c: 'understanding', t: [2],
}));
add('hoffmann-mcq', mcq({
  stem: 'Propanamide is warmed with bromine and aqueous sodium hydroxide. The amine formed is:',
  right: 'ethanamine',
  wrong: ['propan-1-amine', 'butan-1-amine', 'N-methylethanamine'],
  sol: 'Hoffmann bromamide degradation removes the carbonyl carbon: CH₃CH₂CONH₂ → CH₃CH₂NH₂ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('reduction-mcq', mcq({
  stem: 'Ethanenitrile is reduced with lithium aluminium hydride. The product is:',
  right: 'ethanamine',
  wrong: ['methanamine', 'ethanal', 'ethanamide'],
  sol: r`$\ce{CH3CN + 4[H] -> CH3CH2NH2}$ (written with H₂: $\ce{CH3CN + 2H2 -> CH3CH2NH2}$) — option (@K). No carbon is lost.`,
  d: 1, c: 'understanding', t: [2],
}));
add('ammonolysis-mcq', mcq({
  stem: 'Why is ammonolysis of an alkyl halide a poor way to make a pure primary amine?',
  right: 'The primary amine formed is itself a nucleophile and reacts further with the alkyl halide.',
  wrong: ['Ammonia does not react with alkyl halides.', 'The reaction gives only tertiary amines.', 'Alkyl halides are reduced to alkanes by ammonia.'],
  sol: 'RNH₂ attacks more RX, giving R₂NH, R₃N and R₄N⁺X⁻ — a mixture — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('chain-mcq', mcq({
  stem: 'Which route converts bromoethane into propan-1-amine?',
  right: 'KCN in ethanol, then reduction with LiAlH₄',
  wrong: ['Excess ammonia in ethanol, heated', 'Potassium phthalimide, then hydrolysis with NaOH(aq)', 'Heating with ethanamide, bromine and NaOH'],
  sol: 'Substitution by cyanide adds one carbon (propanenitrile); reduction gives CH₃CH₂CH₂NH₂ — option (@K). Ammonolysis (@1) and Gabriel synthesis (@2) keep two carbons, giving ethanamine.',
  d: 3, c: 'application', t: [2],
}));
add('gabriel-ar', ar({
  a: 'Aniline cannot be prepared by the Gabriel phthalimide synthesis.',
  r: 'Aryl halides do not undergo nucleophilic substitution with the anion formed from phthalimide.',
  key: 'a',
  sol: 'Both are true, and R explains A: the C–X bond of an aryl halide resists nucleophilic substitution — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('fe-fill', fill({
  stem: 'Nitrobenzene is reduced to aniline industrially using scrap iron and ___ acid.',
  acc: [['hydrochloric', 'HCl']],
  sol: 'Fe + **hydrochloric** acid; FeCl₂ formed hydrolyses and regenerates HCl.',
  d: 1, c: 'recall', t: [2],
}));
add('aniline-num', num({
  marks: 2,
  stem: r`What mass of aniline ($M = 93$), in grams, can be obtained from $12.3\ \text{g}$ of nitrobenzene ($M = 123$) assuming complete conversion?`,
  value: 9.3, tol: 0.05, unit: 'g',
  sol: r`$\ce{C6H5NO2 + 3H2 -> C6H5NH2 + 2H2O}$ (1 : 1). Moles $= \dfrac{12.3}{123} = 0.1$; mass $= 0.1 \times 93 = 9.3$, so $9.3\ \text{g}$.`,
  scheme: [['0.1 mol', 1], ['9.3 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near((12.3 / 123) * 93, 9.3) || 'aniline');
add('hoffmann-num', num({
  stem: r`What mass of methanamine ($M = 31$), in grams, is formed from $5.9\ \text{g}$ of ethanamide ($M = 59$) by Hoffmann bromamide degradation?`,
  value: 3.1, tol: 0.02, unit: 'g',
  sol: r`1 : 1. Moles $= \dfrac{5.9}{59} = 0.1$; mass $= 0.1 \times 31 = 3.1$, so $3.1\ \text{g}$.`,
  scheme: [['0.1 mol and 3.1 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near((5.9 / 59) * 31, 3.1) || 'methanamine');
add('prep-short', short({
  marks: 2, wl: null,
  stem: 'Write equations for (a) the reduction of nitrobenzene to aniline with H₂/Ni and (b) the Hoffmann bromamide degradation of ethanamide.',
  model: r`(a) $\ce{C6H5NO2 + 3H2 ->[Ni] C6H5NH2 + 2H2O}$

(b) $\ce{CH3CONH2 + Br2 + 4NaOH -> CH3NH2 + Na2CO3 + 2NaBr + 2H2O}$`,
  sol: 'Two balanced equations with conditions.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 physical properties and basicity
add('bp-mcq', mcq({
  stem: 'Which of these isomers (C₃H₉N) has the lowest boiling point?',
  right: 'N,N-Dimethylmethanamine',
  wrong: ['Propan-1-amine', 'Propan-2-amine', 'N-Methylethanamine'],
  sol: 'The tertiary amine has no N–H bond, so it cannot hydrogen-bond with its own molecules — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('basicity-mcq', mcq({
  stem: 'Which is the weakest base?',
  right: '4-Nitroaniline',
  wrong: ['Aniline', 'Methanamine', 'Ammonia'],
  sol: 'The lone pair of aniline is delocalised into the ring, and the para nitro group withdraws still more electron density — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('pkb-order-mcq', mcq({
  stem: 'Which order of basic strength in aqueous solution is correct?',
  right: '(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃',
  wrong: ['(CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃', 'NH₃ > CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N', 'CH₃NH₂ > NH₃ > (CH₃)₂NH > (CH₃)₃N'],
  sol: 'In water, +I effect, solvation and steric hindrance combine to give (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃ — option (@K). (@1) is the gas-phase order.',
  d: 3, c: 'understanding', t: [3],
}));
add('toluidine-mcq', mcq({
  stem: 'Which is the strongest base?',
  right: '4-Methylaniline',
  wrong: ['Aniline', '4-Nitroaniline', '4-Chloroaniline'],
  sol: 'An electron-releasing methyl group at para increases electron density on nitrogen; Cl and NO₂ withdraw it — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('basicity-ar', ar({
  a: 'Aniline is a weaker base than ammonia.',
  r: 'The phenyl group releases electrons to nitrogen by its +I effect.',
  key: 'c',
  sol: 'A is true. R is false: the phenyl group draws the nitrogen lone pair into the ring by resonance, making it less available — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('tertiary-ar', ar({
  a: 'In water, trimethylamine is a weaker base than dimethylamine.',
  r: 'The trimethylammonium ion has only one N–H bond and is less stabilised by hydrogen bonding with water.',
  key: 'a',
  sol: 'Both are true, and poorer solvation (with steric crowding) of the trimethylammonium ion explains the lower basicity — option (a).',
  d: 3, c: 'understanding', t: [3],
}));
add('pkb-num', num({
  marks: 2,
  stem: r`The pKb of methanamine is 3.38. Calculate $K_\text{b}$ in units of $10^{-4}$.`,
  value: 4.17, tol: 0.03, unit: '× 10⁻⁴',
  sol: r`$K_\text{b} = 10^{-3.38} = 0.000417$; in units of $10^{-4}$: $0.000417 \times 10000 = 4.17$.`,
  scheme: [['Kb = 10^(−pKb)', 1], ['4.17 × 10⁻⁴', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(Math.pow(10, -3.38) * 1e4, 4.17, 0.003) || 'Kb');
add('benzylamine-mcq', mcq({
  stem: 'Benzylamine, C₆H₅CH₂NH₂, and aniline, C₆H₅NH₂, both contain a benzene ring. Which is the stronger base, and why?',
  right: 'Benzylamine, because the CH₂ group keeps its nitrogen lone pair out of conjugation with the ring',
  wrong: ['Aniline, because the ring releases electrons to nitrogen', 'Aniline, because it has more resonance structures', 'Neither; both have the same pKb because both have an –NH₂ group'],
  sol: 'In benzylamine nitrogen is attached to an sp³ carbon, so its lone pair is not delocalised and it behaves like an alkylamine — option (@K). Resonance in aniline lowers its basicity (@2).',
  d: 3, c: 'application', t: [3],
}));
add('salt-num', num({
  stem: r`What mass of anilinium chloride, $\ce{C6H5NH3Cl}$ ($M = 129.5$), in grams, forms when $4.65\ \text{g}$ of aniline ($M = 93$) dissolves in excess dilute HCl?`,
  value: 6.48, tol: 0.03, unit: 'g',
  sol: r`$\ce{C6H5NH2 + HCl -> C6H5NH3Cl}$ (1 : 1). Moles $= 4.65 \div 93 = 0.05$; mass $= 0.05 \times 129.5 = 6.475$, so about $6.48\ \text{g}$.`,
  scheme: [['0.05 mol and 6.48 g', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((4.65 / 93) * 129.5, 6.475) || 'salt');
add('separate-short', short({
  marks: 2,
  stem: 'A student has a solution of aniline and nitrobenzene in ether. Explain how dilute HCl and then NaOH can be used to recover the aniline.',
  model: 'Shake the ether solution with dilute HCl. Aniline is basic and forms anilinium chloride, a salt that moves into the water layer; nitrobenzene is not basic and stays in the ether. Separate the layers, then add NaOH to the water layer: it removes the proton and frees aniline, which separates as an oily layer.',
  sol: 'Salt formation and release with base.',
  scheme: [['Aniline forms a water-soluble salt; nitrobenzene stays in ether', 1], ['NaOH liberates aniline from the aqueous layer', 1]],
  d: 3, c: 'application', t: [3],
}));
add('bp-short', short({
  marks: 2,
  stem: 'Explain why propan-1-amine (M = 59) boils at a lower temperature than propan-1-ol (M = 60).',
  model: 'Both form intermolecular hydrogen bonds, but nitrogen is less electronegative than oxygen, so the N–H bond is less polar and N–H···N hydrogen bonds are weaker than O–H···O bonds. Less energy is needed to separate the amine molecules, so it boils lower.',
  sol: 'Weaker N–H···N hydrogen bonds.',
  scheme: [['N less electronegative than O', 1], ['Weaker hydrogen bonds, lower bp', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('basicity-short3', short({
  marks: 3,
  stem: 'Explain why, in water, the order of basic strength of methyl amines is (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N.',
  model: 'Three effects act together. The +I effect of methyl groups increases electron density on nitrogen, which alone would make the tertiary amine strongest. In water, the protonated amine is stabilised by hydrogen bonding with water; the more N–H bonds it has, the better it is solvated, which favours primary and secondary amines. In the tertiary amine, three methyl groups also crowd the nitrogen, hindering protonation and solvation. The balance makes the secondary amine strongest and the tertiary amine weaker than the primary.',
  sol: '+I, solvation, steric effects.',
  scheme: [['+I effect', 1], ['Solvation of the ammonium ion', 1], ['Steric hindrance and conclusion', 1]],
  d: 4, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 reactions of amines
add('carbylamine-mcq', mcq({
  stem: 'Which compound gives a foul-smelling product when warmed with chloroform and alcoholic KOH?',
  right: 'Aniline',
  wrong: ['N-Methylaniline', 'N,N-Dimethylaniline', 'Diethylamine'],
  sol: 'The carbylamine test is given only by primary amines (aliphatic or aromatic) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('hinsberg-mcq', mcq({
  stem: 'An amine reacts with benzenesulfonyl chloride to give a product that is insoluble in aqueous KOH. The amine is:',
  right: 'a secondary amine',
  wrong: ['a primary amine', 'a tertiary amine', 'ammonia'],
  sol: 'A secondary amine gives an N,N-disubstituted sulfonamide with no acidic N–H, so it does not dissolve in alkali — option (@K). A primary amine’s product dissolves (@1); tertiary amines do not react (@2).',
  d: 2, c: 'application', t: [4],
}));
add('acylation-mcq', mcq({
  stem: 'Which amine does NOT react with ethanoyl chloride to form an amide?',
  right: 'Triethylamine',
  wrong: ['Ethanamine', 'Diethylamine', 'Aniline'],
  sol: 'Acylation replaces an N–H hydrogen; tertiary amines have none — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('nitrous-mcq', mcq({
  stem: 'Ethanamine is treated with NaNO₂ and dilute HCl at room temperature. The observation is:',
  right: 'bubbles of nitrogen gas, with ethanol formed',
  wrong: ['a stable diazonium salt that can be stored', 'an orange azo dye', 'no reaction'],
  sol: r`Aliphatic diazonium ions decompose at once: $\ce{RNH2 + HNO2 -> ROH + N2 + H2O}$ — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}));
add('aniline-br-mcq', mcq({
  stem: 'Aniline is shaken with bromine water at room temperature. The product is:',
  right: '2,4,6-tribromoaniline',
  wrong: ['4-bromoaniline', '3-bromoaniline', 'bromobenzene'],
  sol: r`–NH₂ strongly activates the o/p positions: $\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}$ — option (@K). 4-Bromoaniline (@1) needs protection by acetylation first.`,
  d: 2, c: 'understanding', t: [4],
}));
add('nitration-mcq', mcq({
  stem: 'Direct nitration of aniline with concentrated HNO₃ and H₂SO₄ gives a substantial amount of the meta isomer because:',
  right: 'in strong acid aniline is protonated to the anilinium ion, which is meta-directing',
  wrong: ['the –NH₂ group is meta-directing', 'nitration always gives meta products', 'the para position is blocked by sulfuric acid'],
  sol: '–NH₃⁺ is electron-withdrawing and meta-directing, so the mixture contains o-, m- and p-nitroanilines (plus oxidation products) — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('fc-mcq', mcq({
  stem: 'Aniline does not undergo Friedel–Crafts alkylation because:',
  right: 'it forms a salt with AlCl₃, which places a positive charge on nitrogen and deactivates the ring',
  wrong: ['its ring is too strongly activated', 'it is insoluble in organic solvents', 'AlCl₃ oxidises aniline to nitrobenzene'],
  sol: 'The basic –NH₂ donates its lone pair to the Lewis acid AlCl₃; the resulting group strongly deactivates the ring — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('sulphanilic-mcq', mcq({
  stem: 'Sulphanilic acid, formed by sulphonation of aniline, has a high melting point and is insoluble in organic solvents because it:',
  right: 'exists as a zwitterion (dipolar ion)',
  wrong: ['is a covalent non-polar molecule', 'forms a polymer', 'contains a nitro group'],
  sol: 'The acidic –SO₃H protonates the basic –NH₂ in the same molecule, giving ⁻O₃S–C₆H₄–NH₃⁺ — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('fc-ar', ar({
  a: 'Acetanilide gives mainly the para product on bromination, while aniline gives 2,4,6-tribromoaniline.',
  r: 'In acetanilide the nitrogen lone pair is partly delocalised onto the carbonyl oxygen, reducing its activating effect.',
  key: 'a',
  sol: 'Both are true; the amide resonance lowers the activating power, so substitution stops at one bromine (para favoured by the bulky group) — option (a).',
  d: 3, c: 'understanding', t: [4],
}));
add('carbylamine-ar', ar({
  a: 'N-Methylaniline gives the carbylamine test.',
  r: 'The carbylamine test is given only by primary amines.',
  key: 'd',
  sol: 'A is false: N-methylaniline is a secondary amine. R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('tribromo-num', num({
  marks: 2,
  stem: r`What mass of bromine ($\ce{Br2}$, $M = 160$), in grams, reacts with $0.93\ \text{g}$ of aniline ($M = 93$) in bromine water?`,
  value: 4.8, tol: 0.05, unit: 'g',
  sol: r`$\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}$. Moles of aniline $= \dfrac{0.93}{93} = 0.01$; $\ce{Br2} = 3 \times 0.01 = 0.03$ mol; mass $= 0.03 \times 160 = 4.8$, so $4.8\ \text{g}$.`,
  scheme: [['1 : 3 ratio', 1], ['4.8 g', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((0.93 / 93) * 3 * 160, 4.8) || 'Br2');
add('hinsberg-tf', tf({
  stem: 'An amine of formula C₃H₉N that does not react with benzenesulfonyl chloride must be N,N-dimethylmethanamine.',
  key: 't',
  sol: 'True. No reaction in the Hinsberg test means a tertiary amine, and the only tertiary amine with formula C₃H₉N is (CH₃)₃N.',
  d: 3, c: 'application', t: [1, 4],
}));
add('hinsberg-short', short({
  marks: 2,
  stem: 'Describe the Hinsberg test and how it distinguishes ethanamine, N-ethylethanamine and N,N-diethylethanamine.',
  model: 'Each amine is shaken with benzenesulfonyl chloride (Hinsberg’s reagent). Ethanamine (1°) gives a sulfonamide with an acidic N–H that dissolves in KOH. N-Ethylethanamine (2°) gives a sulfonamide insoluble in KOH. N,N-Diethylethanamine (3°) does not react.',
  sol: 'Reagent and three results.',
  scheme: [['Reagent named', 0.5], ['Three results correctly assigned', 1.5]],
  d: 2, c: 'application', t: [4],
}));
add('acetylation-short', short({
  marks: 2,
  stem: 'Why is the amino group of aniline acetylated before nitration, and how is the amino group recovered afterwards?',
  model: 'Acetylation converts –NH₂ into –NHCOCH₃, whose lone pair is shared with the carbonyl group, so it activates the ring less, is not protonated by the acid and protects the ring from oxidation; nitration then gives mainly the para product. Afterwards, hydrolysis with acid or alkali removes the acetyl group to give 4-nitroaniline.',
  sol: 'Reduced activation and protection; hydrolysis.',
  scheme: [['Reason for acetylation', 1], ['Hydrolysis to recover –NH₂', 1]],
  d: 3, c: 'application', t: [4],
}));
add('aniline-short', short({
  marks: 2,
  stem: 'Aniline is colourless when freshly distilled but turns brown on standing in air, and it dissolves in dilute HCl though it is insoluble in water. Explain both.',
  model: 'The electron-rich aniline is slowly oxidised by air to coloured products, so it darkens. With dilute HCl it acts as a base and forms anilinium chloride, an ionic salt that dissolves in water.',
  sol: 'Air oxidation; salt formation.',
  scheme: [['Oxidation in air gives coloured products', 1], ['Forms a soluble salt with HCl', 1]],
  d: 2, c: 'application', t: [3, 4],
}));
add('identify-short3', short({
  marks: 3,
  stem: 'An amine A (C₂H₇N) gives off nitrogen with nitrous acid and gives a foul smell with chloroform and alcoholic KOH. Its isomer B does not give the carbylamine test but reacts with benzenesulfonyl chloride to give a product insoluble in alkali. Identify A and B, giving reasons.',
  model: 'A is ethanamine, CH₃CH₂NH₂: evolution of nitrogen with nitrous acid and a positive carbylamine test show a primary aliphatic amine. B is N-methylmethanamine, (CH₃)₂NH: a negative carbylamine test rules out a primary amine, and a Hinsberg product insoluble in alkali shows a secondary amine. These are the only primary and secondary amines with the formula C₂H₇N.',
  sol: 'Primary from N₂ and carbylamine; secondary from Hinsberg.',
  scheme: [['A identified with reasons', 1.5], ['B identified with reasons', 1.5]],
  d: 4, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 diazonium salts
add('diazo-reagent-mcq', mcq({
  stem: 'Which reagent converts benzenediazonium chloride into benzonitrile?',
  right: 'CuCN/KCN',
  wrong: ['KCN in ethanol without copper', 'HBF₄', 'H₃PO₂'],
  sol: 'The Sandmeyer reaction with copper(I) cyanide replaces –N₂⁺ by –CN — option (@K). HBF₄ (@2) leads to fluorobenzene; H₃PO₂ (@3) to benzene.',
  d: 2, c: 'understanding', t: [5],
}));
add('coupling-mcq', mcq({
  stem: 'Benzenediazonium chloride is added to an alkaline solution of phenol in an ice bath. The product is:',
  right: '4-hydroxyazobenzene, an orange dye',
  wrong: ['chlorobenzene and phenol', 'diphenyl ether', '2,4,6-trichlorophenol'],
  sol: 'The diazonium ion couples at the para position of the activated phenoxide ring, keeping both nitrogen atoms (–N=N–) — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('diazo-temp-mcq', mcq({
  stem: 'Diazotisation of aniline is carried out at 273–278 K because:',
  right: 'benzenediazonium chloride decomposes at higher temperatures, giving phenol and nitrogen',
  wrong: ['nitrous acid boils above 278 K', 'aniline freezes above 278 K', 'the reaction is endothermic and needs cooling to start'],
  sol: 'Warming the diazonium salt replaces –N₂⁺ by –OH; keeping it cold preserves the salt for the next step — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('fluoro-mcq', mcq({
  stem: 'Fluorobenzene is best prepared from aniline by:',
  right: 'diazotisation, then treatment with HBF₄ and heating the dry diazonium fluoroborate',
  wrong: ['direct fluorination of aniline with F₂', 'diazotisation, then CuF', 'treating aniline with HF'],
  sol: 'The Balz–Schiemann route: ArN₂⁺BF₄⁻ → ArF + BF₃ + N₂ on heating — option (@K). Direct fluorination (@1) is violent and unselective.',
  d: 3, c: 'application', t: [5],
}));
add('diazo-ar', ar({
  a: 'Benzenediazonium chloride is more stable than ethanediazonium chloride.',
  r: 'The positive charge of the arenediazonium ion is delocalised by resonance with the benzene ring.',
  key: 'a',
  sol: 'Both are true, and resonance stabilisation explains why arenediazonium salts survive in cold solution while alkyl ones decompose at once — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('coupling-ar', ar({
  a: 'Coupling of benzenediazonium chloride with aniline gives 4-aminoazobenzene.',
  r: 'The diazonium ion is a strong electrophile that attacks even deactivated rings such as nitrobenzene.',
  key: 'c',
  sol: 'A is true. R is false: the diazonium ion is a weak electrophile and couples only with activated rings such as phenols and aryl amines — option (c).',
  d: 3, c: 'understanding', t: [5],
}));
add('dye-fill', fill({
  stem: 'Compounds containing the –N=N– group joining two aromatic rings are called ___ compounds; many are dyes.',
  acc: [['azo']],
  sol: 'They are **azo** compounds.',
  d: 1, c: 'recall', t: [5],
}));
add('diazo-match', match({
  stem: 'Match the reagent used on benzenediazonium chloride with the product.',
  pairs: [
    ['CuCl/HCl', 'Chlorobenzene'],
    ['KI', 'Iodobenzene'],
    ['H₂O, warm', 'Phenol'],
    ['H₃PO₂', 'Benzene'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Sandmeyer gives ArCl; KI gives ArI; warm water gives phenol; hypophosphorous acid replaces the group by H.',
  d: 1, c: 'recall', t: [5],
}));
add('n2-num', num({
  stem: r`$0.93\ \text{g}$ of aniline ($M = 93$) is diazotised and the solution is warmed until all the diazonium salt decomposes. What volume of nitrogen, in litres at STP (22.4 L mol⁻¹), is released?`,
  value: 0.224, tol: 0.002, unit: 'L',
  sol: r`1 mol aniline → 1 mol diazonium salt → 1 mol $\ce{N2}$. Moles $= \dfrac{0.93}{93} = 0.01$; volume $= 0.01 \times 22.4 = 0.224$, so $0.224\ \text{L}$.`,
  scheme: [['0.01 mol N₂ and 0.224 L', 1]],
  d: 2, c: 'application', t: [5],
}), () => near((0.93 / 93) * 22.4, 0.224) || 'N2');
add('benzoic-short', short({
  marks: 2, wl: null,
  stem: 'Show, with reagents and conditions, how benzoic acid can be made from aniline in three steps.',
  model: 'Diazotise aniline with NaNO₂ and HCl at 273–278 K to give benzenediazonium chloride. Treat it with CuCN/KCN to give benzonitrile, C₆H₅CN. Hydrolyse the nitrile by heating with dilute acid to give benzoic acid, C₆H₅COOH.',
  sol: 'Diazotisation, Sandmeyer cyanation, hydrolysis.',
  scheme: [['Diazotisation with conditions', 0.5], ['CuCN/KCN to benzonitrile', 0.5], ['Acid hydrolysis to benzoic acid', 1]],
  d: 3, c: 'application', t: [5],
}));
add('diazo-short', short({
  marks: 2, wl: null,
  stem: 'Write the equation for the preparation of benzenediazonium chloride, stating the conditions, and one reason why it is so useful in synthesis.',
  model: r`$\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}$ at 273–278 K. It is useful because the –N₂⁺ group leaves easily as nitrogen gas and can be replaced by groups such as F, I, CN and OH that are hard to introduce directly.`,
  sol: 'Equation, temperature, usefulness.',
  scheme: [['Equation with 273–278 K', 1], ['Reason for usefulness', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sandmeyer-short3', short({
  marks: 3, wl: null,
  stem: 'Starting from benzenediazonium chloride, how would you prepare (a) bromobenzene, (b) iodobenzene, (c) benzene? Name the reaction where there is one.',
  model: '(a) Warm with CuBr/HBr (Sandmeyer reaction) — or Cu powder + HBr (Gattermann reaction).\n\n(b) Warm with aqueous KI.\n\n(c) Treat with hypophosphorous acid, H₃PO₂ (or ethanol): reduction replaces –N₂⁺ by H.',
  sol: 'Sandmeyer/Gattermann; KI; H₃PO₂.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('conversions-short3', short({
  marks: 3, wl: null,
  stem: 'Show how you would convert (a) aniline into 4-bromoaniline, (b) aniline into phenol, (c) 4-nitroaniline into nitrobenzene.',
  model: '(a) Acetylate with ethanoic anhydride → acetanilide; brominate with Br₂ in ethanoic acid → 4-bromoacetanilide; hydrolyse → 4-bromoaniline.\n\n(b) NaNO₂/HCl at 273–278 K, then warm the solution with water.\n\n(c) Diazotise (NaNO₂/HCl, 273–278 K), then H₃PO₂.',
  sol: 'Protection strategy; diazonium hydrolysis; deamination.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4, 5],
}));

// ---------------------------------------------------------------- long answers
add('prep-long', long({
  stem: '(a) Describe the Gabriel phthalimide synthesis and state why it cannot be used to prepare aniline.\n\n(b) Describe the Hoffmann bromamide degradation with an equation and explain how it changes chain length.\n\n(c) Why is ammonolysis of alkyl halides unsuitable for preparing a pure primary amine, and why is Fe/HCl preferred for reducing nitrobenzene?',
  model: 'In the Gabriel synthesis, phthalimide is treated with ethanolic KOH to form potassium phthalimide, which is heated with an alkyl halide to give an N-alkylphthalimide; hydrolysis with aqueous alkali releases the pure primary amine. Aniline cannot be made because aryl halides do not undergo nucleophilic substitution with the phthalimide anion. In the Hoffmann bromamide degradation, an amide is heated with bromine and aqueous NaOH: CH₃CONH₂ + Br₂ + 4NaOH → CH₃NH₂ + Na₂CO₃ + 2NaBr + 2H₂O. The carbonyl carbon is lost as carbonate, so the amine has one carbon fewer. In ammonolysis the primary amine formed is a nucleophile that reacts further, giving a mixture of amines and quaternary salts. Fe/HCl is preferred because the FeCl₂ formed is hydrolysed, releasing HCl, so only a small amount of acid is needed.',
  sol: 'Gabriel steps and limitation; Hoffmann equation and −1 C; ammonolysis mixture; Fe/HCl.',
  scheme: [['(a) Gabriel steps', 1.5], ['(a) Why not aniline', 0.5], ['(b) Hoffmann equation and −1 C', 1.5], ['(c) Ammonolysis and Fe/HCl reasons', 1.5]],
  d: 3, c: 'understanding', t: [2],
}));
add('diazo-long', long({
  stem: '(a) How is benzenediazonium chloride prepared? Why must the temperature be kept low?\n\n(b) Write reactions in which the diazonium group is replaced by Cl, I, F and H.\n\n(c) Describe a coupling reaction and explain why diazonium salts couple only with activated rings.',
  model: 'Aniline is dissolved in dilute HCl and treated with aqueous NaNO₂ at 273–278 K; nitrous acid formed in situ converts it into benzenediazonium chloride: C₆H₅NH₂ + NaNO₂ + 2HCl → C₆H₅N₂Cl + NaCl + 2H₂O. At higher temperatures the salt decomposes, giving phenol and nitrogen. Replacement: with CuCl/HCl, chlorobenzene (Sandmeyer); with KI, iodobenzene; with HBF₄ followed by heating, fluorobenzene; with H₃PO₂, benzene. Coupling: benzenediazonium chloride reacts with phenol in alkaline solution at the para position to give 4-hydroxyazobenzene, an orange azo dye, in which the two rings are joined by –N=N–. The diazonium ion is only a weak electrophile, so it attacks only rings made electron-rich by –OH or –NH₂ groups.',
  sol: 'Preparation and temperature; four replacements; coupling and weak electrophile.',
  scheme: [['(a) Preparation and reason for low temperature', 1.5], ['(b) Four replacements', 2], ['(c) Coupling example and explanation', 1.5]],
  d: 3, c: 'understanding', t: [5],
}));
add('basicity-long', long({
  stem: '(a) Explain why amines are basic, and why alkylamines are stronger bases than ammonia.\n\n(b) Explain why the order of basicity of methyl amines in water differs from that in the gas phase.\n\n(c) Explain why aniline is a much weaker base than ammonia, and predict the effect of a para methyl group and of a para nitro group.',
  model: 'Amines have a lone pair on nitrogen that can accept a proton: RNH₂ + H₂O ⇌ RNH₃⁺ + OH⁻. Alkyl groups release electrons (+I), increasing electron density on nitrogen and stabilising the ammonium ion, so alkylamines are stronger bases than ammonia. In the gas phase only the +I effect operates, so basicity increases from primary to tertiary. In water, the ammonium ions are also stabilised by hydrogen bonding with water; this solvation is greatest with three N–H bonds and least with one, and three alkyl groups also hinder solvation sterically. The combined effects give (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃. In aniline the lone pair is delocalised into the benzene ring, so it is less available, and protonation destroys this resonance stabilisation. A para methyl group releases electrons and increases basicity slightly; a para nitro group withdraws electrons and decreases it greatly.',
  sol: 'Lone pair; +I; solvation and steric effects; resonance in aniline; substituent effects.',
  scheme: [['(a) Lone pair and +I effect', 1.5], ['(b) Gas phase vs water: solvation and steric effects', 1.5], ['(c) Resonance in aniline', 1], ['(c) Effects of CH₃ and NO₂', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('reactions-long', long({
  stem: '(a) Describe the carbylamine and Hinsberg tests and state which classes of amine respond to each.\n\n(b) Describe the reaction of nitrous acid with a primary aliphatic amine and with aniline.\n\n(c) Explain why aniline must be acetylated before mono-nitration and why it does not undergo Friedel–Crafts reactions.',
  model: 'Carbylamine test: warming with chloroform and alcoholic KOH gives a foul-smelling isocyanide only with primary amines. Hinsberg test: with benzenesulfonyl chloride, a primary amine gives a sulfonamide soluble in alkali, a secondary amine one insoluble in alkali, and a tertiary amine no reaction. Nitrous acid converts a primary aliphatic amine into an alcohol with nitrogen gas, but converts aniline at 273–278 K into benzenediazonium chloride. Direct nitration oxidises aniline and, in acid, the meta-directing anilinium ion forms; acetylation moderates activation and prevents protonation, giving mainly the para product. Aniline forms a salt with AlCl₃, which deactivates the ring, so Friedel–Crafts reactions fail.',
  sol: 'Two tests; nitrous acid with each type; protection and AlCl₃ salt.',
  scheme: [['(a) Carbylamine test', 1], ['(a) Hinsberg test', 1], ['(b) Two nitrous acid reactions', 1.5], ['(c) Acetylation and Friedel–Crafts reasons', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('synthesis-long', long({
  wl: null,
  stem: 'Give reagents and conditions for each conversion: (a) nitrobenzene → aniline; (b) ethanamide → methanamine; (c) aniline → benzonitrile; (d) aniline → 4-nitroaniline; (e) bromomethane → ethanamine.',
  model: '(a) Fe and HCl (or Sn/HCl), then NaOH to free the amine.\n\n(b) Br₂ and aqueous NaOH, warm (Hoffmann bromamide degradation).\n\n(c) NaNO₂/HCl at 273–278 K, then CuCN/KCN (Sandmeyer).\n\n(d) Ethanoic anhydride (acetylation); conc. HNO₃/H₂SO₄ at low temperature; hydrolysis with acid or alkali.\n\n(e) KCN (ethanolic) to give ethanenitrile, then LiAlH₄ (or H₂/Ni).',
  sol: 'One correct route per conversion.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 4, c: 'application', t: [2, 4, 5],
}));

// ---------------------------------------------------------------- case-based
add('dye-case', mk.case({
  passage: r`A small textile unit in Surat makes an orange dye. Aniline is dissolved in dilute HCl, cooled in ice, and sodium nitrite solution is added slowly while the temperature is kept between 273 and 278 K. The cold solution is then poured into an ice-cold alkaline solution of phenol, and an orange solid separates. One day the cooling fails, the first solution warms to room temperature, and bubbles appear. (C = 12, H = 1, N = 14, O = 16)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What forms in the first, cold solution?',
      right: 'Benzenediazonium chloride',
      wrong: ['Chlorobenzene', 'Nitrobenzene', 'Anilinium nitrite crystals'],
      sol: 'NaNO₂ + HCl generate nitrous acid, which diazotises aniline at 273–278 K — option (@K).',
      d: 1, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: r`What mass of the dye, 4-hydroxyazobenzene ($\ce{C12H10N2O}$, $M = 198$), in grams, can form from $0.020\ \text{mol}$ of aniline at 100% yield?`,
      value: 3.96, tol: 0.02, unit: 'g',
      sol: r`1 mol aniline gives 1 mol dye; mass $= 0.020 \times 198 = 3.96$, so $3.96\ \text{g}$.`,
      scheme: [['1 : 1 and 3.96 g', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain what happened when the cooling failed.',
      model: 'Above about 278 K the diazonium salt decomposes: the –N₂⁺ group is replaced by –OH from water, giving phenol and nitrogen gas, which caused the bubbles. Little diazonium salt remains for coupling, so the yield of dye falls.',
      sol: 'Warm diazonium salt → phenol + N₂.',
      scheme: [['Decomposition to phenol with N₂ bubbles', 1], ['Less diazonium salt, less dye', 1]],
      d: 3, c: 'analysis', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Why is the coupling done in alkaline solution, and why does the new bond form at the para position of phenol?',
        model: 'In alkali, phenol is converted into phenoxide, whose O⁻ makes the ring much more electron-rich, so the weakly electrophilic diazonium ion can attack. The ortho and para positions are activated; para is favoured because it is less hindered.',
        sol: 'Phenoxide is strongly activating; para less hindered.',
        scheme: [['Phenoxide activates the ring for the weak electrophile', 1], ['Para favoured (o/p activated, less hindered)', 1]],
        d: 3, c: 'application', t: [5],
      }),
    ]),
  ],
}), () => near(0.02 * 198, 3.96) || 'dye');
add('unknown-case', mk.case({
  passage: 'A chemistry student is given three amines, P, Q and R, each C₄H₁₁N, and records these results:\n\n| Test | P | Q | R |\n|---|---|---|---|\n| CHCl₃ + alcoholic KOH, warm | Foul smell | No smell | No smell |\n| C₆H₅SO₂Cl, then KOH | Clear solution | White solid | No reaction |\n| Dilute HCl | Dissolves | Dissolves | Dissolves |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which amine is tertiary?',
      right: 'R',
      wrong: ['P', 'Q', 'All three'],
      sol: 'R gives neither the carbylamine reaction nor any reaction with Hinsberg’s reagent: it has no N–H — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Suggest a possible structure for Q and name it.',
      model: '(C₂H₅)₂NH, N-ethylethanamine (any secondary C₄H₁₁N amine).',
      sol: 'Hinsberg product insoluble in alkali: secondary.',
      scheme: [['A correct secondary amine', 1]],
      d: 3, c: 'application', t: [1, 4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the Hinsberg product of P dissolves in KOH but that of Q does not.',
      model: 'P is primary, so its product C₆H₅SO₂NHR still has one hydrogen on nitrogen; the strongly electron-withdrawing sulfonyl group makes this H acidic, so KOH removes it and the salt dissolves. Q is secondary, so its product C₆H₅SO₂NR₂ has no N–H and cannot form a salt.',
      sol: 'Acidic N–H in the primary product.',
      scheme: [['Primary product has acidic N–H, forms soluble salt', 1], ['Secondary product has no N–H', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Why do all three amines dissolve in dilute HCl although some are only slightly soluble in water?',
        model: 'All amines are bases: the lone pair on nitrogen accepts a proton from HCl, giving ammonium chloride salts. These ionic salts dissolve readily in water.',
        sol: 'Salt formation.',
        scheme: [['Amines are bases (lone pair accepts H⁺)', 1], ['Ionic ammonium salts are water-soluble', 1]],
        d: 2, c: 'understanding', t: [3],
      }),
    ]),
  ],
}));
add('fish-case', mk.case({
  passage: 'Cooks in coastal Kerala squeeze lemon juice over fish or rinse their hands with tamarind water after cleaning fish. The fishy smell comes mainly from trimethylamine, (CH₃)₃N, a volatile amine (boiling point 276 K) released as fish begins to spoil. Lemon juice contains citric acid.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why does lemon juice reduce the fishy smell?',
      right: 'The acid converts volatile trimethylamine into a non-volatile ammonium salt.',
      wrong: ['Citric acid oxidises trimethylamine to nitrogen gas.', 'Lemon juice has a stronger smell that simply hides it.', 'Trimethylamine dissolves in the oil of lemon peel.'],
      sol: 'Acid–base reaction: (CH₃)₃N + H⁺ → (CH₃)₃NH⁺, an ion that does not evaporate — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why is trimethylamine more volatile than its isomer propan-1-amine (boiling point 321 K)?',
      model: 'Trimethylamine has no N–H bond, so it cannot form hydrogen bonds with its own molecules.',
      sol: 'No N–H, no hydrogen bonding.',
      scheme: [['No N–H, no intermolecular H-bonding', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'In water, trimethylamine (pKb 4.22) is a weaker base than dimethylamine (pKb 3.27) although it has more methyl groups. Explain.',
      model: 'Three methyl groups give the greatest +I effect, but the trimethylammonium ion has only one N–H to hydrogen-bond with water, so it is poorly solvated; the bulky methyl groups also hinder solvation. Dimethylammonium, with two N–H, is better stabilised, so dimethylamine is the stronger base in water.',
      sol: 'Solvation and steric effects outweigh +I.',
      scheme: [['Poor solvation of the tertiary ammonium ion', 1], ['Steric hindrance; secondary better stabilised', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Suggest why washing hands with plain water is less effective than tamarind water at removing the smell.',
        model: 'Trimethylamine is only partly protonated in plain water, so much of it stays as the volatile free base. Tamarind water is acidic (tartaric acid), converting the amine almost completely into its non-volatile, water-soluble salt, which is washed away.',
        sol: 'Acid converts the free base into a soluble salt.',
        scheme: [['Free base remains volatile in plain water', 1], ['Acid forms soluble non-volatile salt', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}));
add('paracetamol-case', mk.case({
  passage: r`Paracetamol, $\ce{HOC6H4NHCOCH3}$, is made by acetylating 4-aminophenol with ethanoic anhydride. The –NH₂ group reacts faster than the –OH group, so the amide forms selectively. 4-Aminophenol itself can be made by reducing 4-nitrophenol. (Paracetamol $M = 151$; 4-aminophenol $M = 109$)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which functional group is formed in the acetylation step?',
      right: 'An amide (–NHCOCH₃)',
      wrong: ['An ester (–OCOCH₃)', 'An amine (–NH₂)', 'A diazonium group (–N₂⁺)'],
      sol: 'Acylation of –NH₂ by ethanoic anhydride gives an N-aryl amide — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'What mass of paracetamol, in grams, can be made from 10.9 g of 4-aminophenol at 100% yield?',
      value: 15.1, tol: 0.1, unit: 'g',
      sol: r`Moles $= \dfrac{10.9}{109} = 0.1$; 1 : 1, so mass $= 0.1 \times 151 = 15.1$, so $15.1\ \text{g}$.`,
      scheme: [['0.1 mol and 15.1 g', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why does the –NH₂ group react with ethanoic anhydride faster than the –OH group?',
      model: 'Nitrogen is less electronegative than oxygen, so its lone pair is held less tightly and is more available to attack the carbonyl carbon of the anhydride. The amino group is therefore the stronger nucleophile.',
      sol: 'Nitrogen lone pair more available.',
      scheme: [['N less electronegative, lone pair more available', 1], ['Amine is the better nucleophile', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Suggest reagents for reducing 4-nitrophenol to 4-aminophenol, and explain why the product dissolves in dilute HCl.',
        model: 'Fe or Sn with HCl (then neutralise), or H₂ over Ni or Pd. The –NH₂ group of 4-aminophenol is basic and forms a water-soluble ammonium chloride salt with HCl.',
        sol: 'Reduction of –NO₂; basic –NH₂.',
        scheme: [['A suitable reducing agent', 1], ['Salt formation explains solubility', 1]],
        d: 2, c: 'application', t: [2, 3],
      }),
    ]),
  ],
}), () => near((10.9 / 109) * 151, 15.1) || 'paracetamol');

// ISC 12 Chemistry ch20 Cyanides, Isocyanides and Diazonium Salts — question bank (ISC style). Stems name their own
// compounds and data. MCQ keys are placed by the builder; AR keys planned: a c b d a. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 cyanides and isocyanides
add('kcn-mcq', mcq({
  stem: '2-Bromopropane is heated with silver cyanide. The main organic product is:',
  right: '2-isocyanopropane, (CH₃)₂CHNC',
  wrong: ['2-methylpropanenitrile, (CH₃)₂CHCN', 'propan-2-amine', 'propene'],
  sol: 'Covalent AgCN attacks through N — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('compare-mcq', mcq({
  stem: 'Isocyanoethane, CH₃CH₂NC, is hydrolysed with dilute acid. The products are:',
  right: 'ethanamine and methanoic acid',
  wrong: ['propanoic acid and ammonium ions', 'ethanol and hydrogen cyanide', 'ethanoic acid and methanamine'],
  sol: 'RNC + 2H₂O → RNH₂ + HCOOH — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('name-mcq', mcq({
  stem: 'The IUPAC name of isopropyl cyanide, (CH₃)₂CHCN, is:',
  right: '2-methylpropanenitrile',
  wrong: ['propanenitrile', '2-cyanopropane', 'butanenitrile'],
  sol: 'Count the CN carbon: four carbons with a methyl on C-2 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('amide-mcq', mcq({
  stem: 'Butanamide is heated with phosphorus pentoxide. The product is:',
  right: 'butanenitrile',
  wrong: ['butan-1-amine', 'propan-1-amine', 'butanoic acid'],
  sol: 'Dehydration of the amide — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('reduce-mcq', mcq({
  stem: 'Isocyanomethane, CH₃NC, is reduced with H₂ over nickel. The product is:',
  right: 'N-methylmethanamine (dimethylamine)',
  wrong: ['ethanamine', 'methanamine', 'ethanenitrile'],
  sol: 'Isocyanides give secondary amines: CH₃NHCH₃ — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('smell-mcq', mcq({
  stem: 'Which property distinguishes ethanenitrile from its isomer isocyanomethane?',
  right: 'Ethanenitrile has a pleasant smell; isocyanomethane has a very unpleasant smell',
  wrong: ['Ethanenitrile has a lower boiling point', 'Isocyanomethane gives ethanoic acid on hydrolysis', 'They have different molecular formulae'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('carbyl-mcq', mcq({
  stem: '4-Methylaniline is warmed with chloroform and alcoholic KOH. The product is:',
  right: '1-isocyano-4-methylbenzene (4-methylphenyl isocyanide)',
  wrong: ['4-methylbenzonitrile', '4-methylphenol', 'N-methylaniline'],
  sol: 'Carbylamine reaction of a primary amine — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('agcn-ar', ar({
  a: 'Alkyl halides give mainly isocyanides with silver cyanide.',
  r: 'In AgCN the Ag–C bond is largely covalent, so only the lone pair on nitrogen is available to attack.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('iso-ar', ar({
  a: 'Nitriles have higher boiling points than the isomeric isocyanides.',
  r: 'Nitriles are less polar than isocyanides.',
  key: 'c',
  sol: 'A is true. R is false: nitriles are more polar — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('isomer-tf', tf({
  stem: 'On heating, isocyanides rearrange into the more stable isomeric nitriles.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'recall', t: [1],
}));
add('nitrile-fill', fill({
  stem: 'The IUPAC name of CH₃CH₂CN is propane___.',
  acc: [['nitrile']],
  sol: 'Propane**nitrile**.',
  d: 1, c: 'application', t: [1],
}));
add('cn-match', match({
  stem: 'Match each reaction with its main organic product.',
  pairs: [
    ['1-Iodopropane + KCN', 'Butanenitrile'],
    ['1-Iodopropane + AgCN', '1-Isocyanopropane'],
    ['Propanamide + P₂O₅', 'Propanenitrile'],
    ['Propan-1-amine + CHCl₃ + alc. KOH', '1-Isocyanopropane (foul smell)'],
  ],
  order: [2, 0, 3, 1],
  sol: 'KCN → butanenitrile; AgCN → 1-isocyanopropane; P₂O₅ → propanenitrile; carbylamine → 1-isocyanopropane.',
  d: 2, c: 'application', t: [1],
}));
add('nitrile-num', num({
  marks: 2,
  stem: r`$13.7\ \text{g}$ of 1-bromobutane ($M = 137$) is heated with excess ethanolic KCN. If the yield of pentanenitrile ($M = 83$) is 80%, what mass is obtained?`,
  value: 6.64, tol: 0.03, unit: 'g',
  sol: r`$n = 13.7 \div 137 = 0.100\ \text{mol}$; mass $= 0.100 \times 83 \times 0.80 = 6.64\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['6.64 g', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(0.1 * 83 * 0.8, 6.64) || 'mass');
add('prep-short', short({
  marks: 2,
  stem: 'Write equations for preparing (a) propanenitrile from propanamide and (b) isocyanoethane from iodoethane.',
  model: r`(a) $\ce{CH3CH2CONH2 ->[P2O5][\Delta] CH3CH2CN + H2O}$. (b) $\ce{CH3CH2I + AgCN -> CH3CH2NC + AgI}$.`,
  sol: 'Dehydration; AgCN.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1],
}));
add('kcnag-short', short({
  marks: 2,
  stem: 'Explain why 1-bromopropane gives butanenitrile with KCN but 1-isocyanopropane with AgCN.',
  model: 'CN⁻ is ambident. KCN is ionic, so the free cyanide ion attacks through carbon, the more nucleophilic end, giving the nitrile. AgCN is largely covalent (Ag–C bond); the carbon lone pair is tied up, so attack occurs through nitrogen, giving the isocyanide.',
  sol: 'Ionic vs covalent cyanide.',
  scheme: [['KCN ionic, C attacks', 1], ['AgCN covalent, N attacks', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare propanenitrile and isocyanoethane with respect to (a) the product of acid hydrolysis, (b) the product of reduction with LiAlH₄ and (c) smell.',
  model: '(a) Propanenitrile → propanoic acid + NH₄⁺; isocyanoethane → ethanamine + methanoic acid. (b) Propanenitrile → propan-1-amine (1°); isocyanoethane → N-methylethanamine (2°). (c) The nitrile has a pleasant smell; the isocyanide is foul-smelling.',
  sol: 'Hydrolysis; reduction; smell.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('name-short3', short({
  marks: 3,
  stem: 'Write the IUPAC names of (a) CH₃CH₂CH₂CN, (b) C₆H₅CN and (c) (CH₃)₃CNC, and state which is an isocyanide.',
  model: '(a) Butanenitrile. (b) Benzonitrile. (c) 2-Isocyano-2-methylpropane — the isocyanide.',
  sol: 'Butanenitrile; benzonitrile; 2-isocyano-2-methylpropane.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 diazonium salts: preparation
add('diazo-mcq', mcq({
  stem: 'A student diazotises 4-chloroaniline but allows the mixture to warm to 300 K. The main organic product will be:',
  right: '4-chlorophenol, with evolution of nitrogen',
  wrong: ['4-chlorobenzenediazonium chloride, unchanged', '4-chloronitrobenzene', 'chlorobenzene'],
  sol: 'Warm diazonium salts are hydrolysed to phenols — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('reagent-mcq', mcq({
  stem: 'In diazotisation, nitrous acid is generated in the reaction mixture from:',
  right: 'sodium nitrite and hydrochloric acid',
  wrong: ['sodium nitrate and sulphuric acid', 'nitric acid alone', 'ammonium nitrite on heating'],
  sol: 'NaNO₂ + HCl → HNO₂ + NaCl — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('stab-mcq', mcq({
  stem: 'Benzenediazonium chloride is far more stable in cold solution than ethanediazonium chloride because:',
  right: 'the positive charge of the aryl diazonium ion is delocalised into the benzene ring',
  wrong: ['benzene rings release nitrogen easily', 'ethanediazonium chloride is a solid', 'aromatic amines are stronger bases'],
  sol: 'Resonance stabilisation — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('dry-tf', tf({
  stem: 'Dry benzenediazonium chloride is a safe, stable solid that can be stored for long periods.',
  key: 'f',
  sol: 'False. Dry diazonium salts can explode; they are used in solution at once.',
  d: 1, c: 'recall', t: [2],
}));
add('starch-fill', fill({
  stem: 'Excess nitrous acid at the end of diazotisation is detected with starch–___ paper, which turns blue.',
  acc: [['iodide', 'potassium iodide', 'KI']],
  sol: 'Starch–**iodide** paper.',
  d: 2, c: 'recall', t: [2],
}));
add('diazo-ar', ar({
  a: 'Diazotisation of aniline is carried out in an ice bath.',
  r: 'Benzenediazonium chloride decomposes to phenol and nitrogen at higher temperatures.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('diazo-num', num({
  marks: 2,
  stem: r`$4.65\ \text{g}$ of aniline ($M = 93$) is diazotised completely. How many grams of sodium nitrite ($M = 69$) are needed at least? ($\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}$)`,
  value: 3.45, tol: 0.02, unit: 'g',
  sol: r`$n = 4.65 \div 93 = 0.0500\ \text{mol}$; mass of NaNO₂ $= 0.0500 \times 69 = 3.45\ \text{g}$.`,
  scheme: [['0.0500 mol', 1], ['3.45 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.05 * 69, 3.45) || 'mass');
add('diazo-short', short({
  marks: 2,
  stem: 'Write the equation for the diazotisation of 4-methylaniline and state the conditions.',
  model: r`$\ce{CH3C6H4NH2 + NaNO2 + 2HCl -> CH3C6H4N2Cl + NaCl + 2H2O}$; aqueous solution in excess HCl, cooled in ice to 273–278 K, NaNO₂ added slowly.`,
  sol: 'Equation; 273–278 K.',
  scheme: [['Equation', 1], ['Conditions', 1]],
  d: 2, c: 'application', t: [2],
}));
add('stab-short3', short({
  marks: 3,
  stem: '(a) Why are aromatic diazonium salts more stable than aliphatic ones? (b) What happens when an aqueous solution of benzenediazonium chloride is warmed? (c) Why must dry diazonium salts be avoided?',
  model: r`(a) The –N₂⁺ group is conjugated with the ring, so the positive charge is delocalised (resonance); aliphatic diazonium ions have no such stabilisation and lose N₂ at once. (b) It decomposes: $\ce{C6H5N2Cl + H2O -> C6H5OH + N2 + HCl}$. (c) Dry diazonium salts are shock-sensitive and can explode.`,
  sol: 'Resonance; phenol + N₂; explosive.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 replacement reactions
add('replace-mcq', mcq({
  stem: '4-Nitrobenzenediazonium chloride is treated with copper(I) cyanide in KCN solution. The product is:',
  right: '4-nitrobenzonitrile',
  wrong: ['4-nitrophenyl isocyanide', '4-nitroaniline', 'nitrobenzene'],
  sol: 'Sandmeyer reaction introduces –CN — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('fluoro-mcq', mcq({
  stem: '4-Fluorotoluene is best made from 4-methylaniline by:',
  right: 'diazotising, precipitating the fluoroborate with HBF₄ and heating the dry salt',
  wrong: ['heating with F₂ and FeF₃', 'diazotising and adding KF', 'heating with CuF and HF'],
  sol: 'Balz–Schiemann reaction — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('h3po2-mcq', mcq({
  stem: '2,4,6-Tribromobenzenediazonium chloride is warmed with hypophosphorous acid, H₃PO₂. The product is:',
  right: '1,3,5-tribromobenzene',
  wrong: ['2,4,6-tribromophenol', '2,4,6-tribromoaniline', 'bromobenzene'],
  sol: 'H₃PO₂ replaces –N₂⁺ by –H — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('gatt-mcq', mcq({
  stem: 'In the Gattermann reaction for preparing chlorobenzene from benzenediazonium chloride, the reagent used is:',
  right: 'copper powder and hydrochloric acid',
  wrong: ['copper(I) chloride and hydrochloric acid', 'chlorine and FeCl₃', 'potassium chloride alone'],
  sol: 'CuCl/HCl is Sandmeyer; Cu powder + HCl is Gattermann — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('iodo-mcq', mcq({
  stem: 'Which reagent converts 3-methylbenzenediazonium chloride into 3-iodotoluene?',
  right: 'Aqueous potassium iodide, warmed',
  wrong: ['CuI and HI', 'I₂ with FeI₃', 'HI with red phosphorus'],
  sol: 'Iodide replaces –N₂⁺ without a copper catalyst — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('nitro-mcq', mcq({
  stem: 'Benzenediazonium fluoroborate is heated with aqueous NaNO₂ in the presence of copper. The product is:',
  right: 'nitrobenzene',
  wrong: ['fluorobenzene', 'phenol', 'nitrosobenzene'],
  sol: '–N₂⁺ is replaced by –NO₂ — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('ethanol-ar', ar({
  a: 'Warming benzenediazonium chloride with ethanol gives benzene.',
  r: 'Ethanol is oxidised to ethanal while the diazonium group is replaced by hydrogen.',
  key: 'a',
  sol: 'Both true; R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('ki-tf', tf({
  stem: 'Iodobenzene is obtained from benzenediazonium chloride only in the presence of a copper(I) catalyst.',
  key: 'f',
  sol: 'False. Warming with KI alone is enough.',
  d: 1, c: 'understanding', t: [3],
}));
add('bs-fill', fill({
  stem: 'The conversion of an arenediazonium fluoroborate into an aryl fluoride by heating is called the Balz–___ reaction.',
  acc: [['Schiemann']],
  sol: 'Balz–**Schiemann**.',
  d: 1, c: 'recall', t: [3],
}));
add('n2-num', num({
  marks: 2,
  stem: r`$0.050\ \text{mol}$ of 4-methylbenzenediazonium chloride is converted completely into 4-bromotoluene by the Sandmeyer reaction. What volume of nitrogen is released at STP? (Molar volume $22.4\ \text{L}$)`,
  value: 1.12, tol: 0.01, unit: 'L',
  sol: r`1 mol N₂ per mol diazonium salt: $V = 0.050 \times 22.4 = 1.12\ \text{L}$.`,
  scheme: [['1 : 1', 1], ['1.12 L', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(0.05 * 22.4, 1.12) || 'v');
add('ki-num', num({
  marks: 2,
  stem: r`$9.3\ \text{g}$ of aniline ($M = 93$) is diazotised and treated with KI. If the overall yield of iodobenzene ($M = 204$) is 70%, what mass is obtained?`,
  value: 14.28, tol: 0.05, unit: 'g',
  sol: r`$n = 9.3 \div 93 = 0.100\ \text{mol}$; mass $= 0.100 \times 204 \times 0.70 = 14.28\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['14.28 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(0.1 * 204 * 0.7, 14.28) || 'mass');
add('sand-short', short({
  marks: 2,
  stem: 'Distinguish between the Sandmeyer and Gattermann reactions, using the preparation of chlorobenzene as the example.',
  model: r`Sandmeyer: copper(I) chloride in HCl — $\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}$. Gattermann: copper powder with HCl — $\ce{C6H5N2Cl ->[Cu/HCl] C6H5Cl + N2}$; yields are usually lower.`,
  sol: 'CuCl/HCl vs Cu/HCl.',
  scheme: [['Sandmeyer', 1], ['Gattermann', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('bs-short', short({
  marks: 2,
  stem: 'Write equations for the Balz–Schiemann preparation of fluorobenzene from benzenediazonium chloride.',
  model: r`$\ce{C6H5N2Cl + HBF4 -> C6H5N2BF4 + HCl}$ (fluoroborate precipitates); $\ce{C6H5N2BF4 ->[\Delta] C6H5F + BF3 + N2}$.`,
  sol: 'Fluoroborate; heat.',
  scheme: [['First step', 1], ['Second step', 1]],
  d: 2, c: 'application', t: [3],
}));
add('replace-short3', short({
  marks: 3,
  stem: 'Give reagents to convert 3-nitrobenzenediazonium chloride into (a) 1-bromo-3-nitrobenzene, (b) 3-nitrophenol and (c) nitrobenzene.',
  model: '(a) CuBr/HBr (Sandmeyer) or Cu + HBr (Gattermann). (b) Warm with water (dilute H₂SO₄). (c) H₃PO₂ (or ethanol).',
  sol: 'CuBr; water; H₃PO₂.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('eq-short3', short({
  marks: 3,
  stem: 'Write balanced equations for converting benzenediazonium chloride into (a) benzonitrile, (b) benzene with H₃PO₂ and (c) iodobenzene.',
  model: r`(a) $\ce{C6H5N2Cl + CuCN -> C6H5CN + N2 + CuCl}$. (b) $\ce{C6H5N2Cl + H3PO2 + H2O -> C6H6 + N2 + H3PO3 + HCl}$. (c) $\ce{C6H5N2Cl + KI -> C6H5I + KCl + N2}$.`,
  sol: 'Three equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 coupling and synthesis
add('couple-mcq', mcq({
  stem: 'Benzenediazonium chloride is added to N,N-dimethylaniline in mildly acidic solution at 273 K. The product is:',
  right: '4-(dimethylamino)azobenzene, a yellow dye',
  wrong: ['N,N-dimethyl-4-nitroaniline', 'diphenylamine', 'phenol and N₂'],
  sol: 'Para coupling with the activated amine — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ph-mcq', mcq({
  stem: 'Coupling of benzenediazonium chloride with phenol is carried out in mildly alkaline solution because:',
  right: 'phenol is converted into the more strongly activated phenoxide ion',
  wrong: ['the diazonium ion is more stable in strong alkali', 'alkali converts phenol into benzene', 'acid would oxidise phenol'],
  sol: 'PhO⁻ is a better nucleophile for the weakly electrophilic ArN₂⁺ — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('colour-mcq', mcq({
  stem: 'Azo compounds such as 4-hydroxyazobenzene are coloured mainly because:',
  right: 'the –N=N– group links two rings in an extended conjugated system that absorbs visible light',
  wrong: ['they contain metal ions', 'they are ionic salts', 'they contain a nitro group'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('synth-mcq', mcq({
  stem: 'Which sequence converts aniline into 1,3,5-tribromobenzene?',
  right: 'Bromine water; then NaNO₂/HCl at 273 K; then H₃PO₂',
  wrong: ['Br₂/FeBr₃ three times', 'NaNO₂/HCl; then CuBr/HBr; then Br₂ water', 'H₃PO₂; then Br₂/FeBr₃'],
  sol: 'NH₂ directs Br to 2,4,6; diazotise and remove — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('naphthol-mcq', mcq({
  stem: 'A colourless aromatic amine is diazotised in the cold and the solution is added to alkaline 2-naphthol; an orange-red precipitate forms. The amine is most likely:',
  right: 'a primary aromatic amine such as 4-methylaniline',
  wrong: ['a tertiary aliphatic amine', 'a secondary aliphatic amine', 'ethanamine'],
  sol: 'Only ArNH₂ gives stable diazonium salts that couple — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('couple-ar', ar({
  a: 'Benzenediazonium ion couples with aniline in strongly acidic solution.',
  r: 'In strongly acidic solution aniline is protonated to the deactivated anilinium ion.',
  key: 'd',
  sol: 'A is false (coupling needs mildly acidic conditions). R is true and explains why strong acid prevents coupling — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('para-tf', tf({
  stem: 'In azo coupling with phenol, the azo group enters mainly at the para position to the –OH group.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('azo-fill', fill({
  stem: 'Coupling benzenediazonium chloride with aniline in mildly acidic solution gives 4-aminoazobenzene, known as aniline ___.',
  acc: [['yellow']],
  sol: 'Aniline **yellow**.',
  d: 1, c: 'recall', t: [4],
}));
add('dye-num', num({
  marks: 2,
  stem: r`$0.025\ \text{mol}$ of benzenediazonium chloride couples completely with excess 2-naphthol to give 1-phenylazo-2-naphthol ($M = 248$). What mass of dye is formed?`,
  value: 6.2, tol: 0.02, unit: 'g',
  sol: r`1 : 1: mass $= 0.025 \times 248 = 6.2\ \text{g}$.`,
  scheme: [['1 : 1', 1], ['6.2 g', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(0.025 * 248, 6.2) || 'mass');
add('couple-short', short({
  marks: 2,
  stem: 'Write the equation for coupling benzenediazonium chloride with phenol and state the conditions and the colour of the product.',
  model: r`$\ce{C6H5N2Cl + C6H5OH + NaOH -> HOC6H4N=NC6H5 + NaCl + H2O}$; mildly alkaline, 273–278 K; orange 4-hydroxyazobenzene.`,
  sol: 'Equation; alkaline, cold; orange.',
  scheme: [['Equation', 1], ['Conditions and colour', 1]],
  d: 2, c: 'application', t: [4],
}));
add('synth-short', short({
  marks: 2,
  stem: 'Show how benzoic acid can be made from aniline using a diazonium salt, naming the intermediates.',
  model: 'Aniline → (NaNO₂/HCl, 273–278 K) benzenediazonium chloride → (CuCN/KCN, Sandmeyer) benzonitrile → (H₃O⁺, heat) benzoic acid.',
  sol: 'Diazonium → nitrile → acid.',
  scheme: [['Intermediates', 1], ['Reagents', 1]],
  d: 3, c: 'application', t: [4],
}));
add('synth-short3', short({
  marks: 3,
  stem: 'Explain, with one example each, why diazonium salts are important in synthesis: (a) introducing groups that cannot be put on a ring directly, (b) placing substituents in positions not available by direct substitution and (c) making dyes.',
  model: '(a) F, I, CN and OH can replace –N₂⁺ (e.g. fluorobenzene by Balz–Schiemann; iodobenzene with KI). (b) The –NH₂ group directs substitution and is then removed via –N₂⁺ (e.g. aniline → 2,4,6-tribromoaniline → 1,3,5-tribromobenzene with H₃PO₂). (c) Coupling with phenols or amines gives azo dyes (e.g. 4-hydroxyazobenzene, orange).',
  sol: 'Three uses with examples.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('cond-short3', short({
  marks: 3,
  stem: 'Explain the pH conditions needed for coupling a diazonium salt with (a) phenol and (b) aniline, and (c) why coupling occurs at the para position.',
  model: '(a) Mildly alkaline: phenol is converted into the strongly activating phenoxide ion; strong alkali would convert the diazonium ion into a non-electrophilic diazotate. (b) Mildly acidic: free aniline remains (strong acid would give anilinium, deactivating the ring). (c) Para is strongly activated by –OH/–NH₂ and less hindered than ortho.',
  sol: 'Alkaline; mildly acidic; para.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 4, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- long answers
add('cn-long', long({
  stem: '(a) Write equations for preparing (i) butanenitrile from 1-bromopropane and (ii) isocyanomethane from methanamine. [2]\n\n(b) Compare ethanenitrile and isocyanomethane with respect to hydrolysis and reduction products. [2]\n\n(c) Explain why KCN and AgCN give different products with alkyl halides. [1]',
  model: r`(a) (i) $\ce{CH3CH2CH2Br + KCN -> CH3CH2CH2CN + KBr}$. (ii) $\ce{CH3NH2 + CHCl3 + 3KOH -> CH3NC + 3KCl + 3H2O}$.

(b) Hydrolysis: CH₃CN → CH₃COOH + NH₄⁺; CH₃NC → CH₃NH₂ + HCOOH. Reduction: CH₃CN → CH₃CH₂NH₂ (1°); CH₃NC → CH₃NHCH₃ (2°).

(c) KCN is ionic: CN⁻ attacks through C → nitrile. AgCN is covalent: only N attacks → isocyanide.`,
  sol: 'Two preparations; comparison; ionic vs covalent.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b) Hydrolysis', 1], ['(b) Reduction', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [1],
}));
add('replace-long', long({
  stem: '(a) How is benzenediazonium chloride prepared from aniline? State the conditions. [1½]\n\n(b) Give reagents and equations to convert it into (i) fluorobenzene, (ii) benzonitrile and (iii) benzene. [3]\n\n(c) What is formed if the diazonium solution is allowed to warm up? [½]',
  model: r`(a) $\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}$ at 273–278 K, NaNO₂ added slowly to aniline in excess HCl.

(b) (i) HBF₄, then heat the dry fluoroborate: $\ce{C6H5N2BF4 -> C6H5F + BF3 + N2}$. (ii) CuCN/KCN: $\ce{C6H5N2Cl + CuCN -> C6H5CN + N2 + CuCl}$. (iii) H₃PO₂: $\ce{C6H5N2Cl + H3PO2 + H2O -> C6H6 + N2 + H3PO3 + HCl}$.

(c) Phenol (+ N₂ + HCl).`,
  sol: 'Diazotisation; three replacements; phenol.',
  scheme: [['(a)', 1.5], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)', 0.5]],
  d: 3, c: 'application', t: [2, 3],
}));
add('couple-long', long({
  stem: '(a) Write equations for coupling benzenediazonium chloride with (i) phenol and (ii) aniline, giving the conditions. [2]\n\n(b) Why are azo compounds coloured? [1]\n\n(c) Show how 1,3,5-tribromobenzene is made from aniline, and explain why it cannot be made by brominating benzene. [2]',
  model: r`(a) (i) $\ce{C6H5N2Cl + C6H5OH + NaOH -> HOC6H4N=NC6H5 + NaCl + H2O}$ (mildly alkaline, cold; orange). (ii) $\ce{C6H5N2Cl + C6H5NH2 -> H2NC6H4N=NC6H5 + HCl}$ (mildly acidic, cold; yellow).

(b) The –N=N– group joins two aromatic rings in an extended conjugated system that absorbs visible light.

(c) Aniline + bromine water → 2,4,6-tribromoaniline; NaNO₂/HCl at 273–278 K → diazonium salt; H₃PO₂ → 1,3,5-tribromobenzene. Bromine is o/p directing, so bromination of benzene gives 1,2- and 1,4-dibromo patterns, never three bromines all meta to one another.`,
  sol: 'Two couplings; conjugation; tribromobenzene synthesis.',
  scheme: [['(a)', 2], ['(b)', 1], ['(c)', 2]],
  d: 4, c: 'analysis', t: [4],
}));
add('conv-long', long({
  stem: 'Starting from aniline, show how you would obtain each of the following, giving reagents and conditions. [1 each]\n\n(a) Phenol\n\n(b) Iodobenzene\n\n(c) Chlorobenzene (Gattermann)\n\n(d) Nitrobenzene\n\n(e) 4-Hydroxyazobenzene',
  model: 'First diazotise each time: NaNO₂ + HCl at 273–278 K. Then: (a) warm with water. (b) Warm with aqueous KI. (c) Copper powder + HCl. (d) HBF₄ to give the fluoroborate, then NaNO₂ with copper, heat. (e) Add to phenol in cold NaOH solution.',
  sol: 'Five conversions via the diazonium salt.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 2, c: 'application', t: [3, 4],
}));
add('ident-long', long({
  stem: 'Compound A, C₃H₅N, has a pleasant smell; on acid hydrolysis it gives B, C₃H₆O₂, and on reduction with LiAlH₄ it gives C, C₃H₉N. Its isomer D is foul-smelling and on hydrolysis gives methanoic acid and E, C₂H₇N.\n\n(a) Identify A to E. [4]\n\n(b) Name the reagent that converts bromoethane into A. [1]',
  model: '(a) A: propanenitrile, CH₃CH₂CN. B: propanoic acid, CH₃CH₂COOH. C: propan-1-amine, CH₃CH₂CH₂NH₂. D: isocyanoethane, CH₃CH₂NC. E: ethanamine, CH₃CH₂NH₂.\n\n(b) Ethanolic KCN (or NaCN).',
  sol: 'Propanenitrile, propanoic acid, propan-1-amine, isocyanoethane, ethanamine.',
  scheme: [['A', 1], ['B and C', 1], ['D', 1], ['E', 1], ['(b)', 1]],
  d: 4, c: 'analysis', t: [1],
}));
add('path-short3', short({
  marks: 3,
  stem: 'Starting from 4-methylaniline, how would you obtain (a) 4-methylphenol, (b) 4-methylbenzoic acid and (c) toluene? Give reagents for each step.',
  model: 'Diazotise first: NaNO₂ + HCl at 273–278 K → 4-methylbenzenediazonium chloride. (a) Warm with water → 4-methylphenol. (b) CuCN/KCN → 4-methylbenzonitrile; then hydrolyse with hot dilute acid → 4-methylbenzoic acid. (c) H₃PO₂ (or ethanol) → toluene.',
  sol: 'Diazotise; water; CuCN then hydrolysis; H₃PO₂.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3, 4],
}));

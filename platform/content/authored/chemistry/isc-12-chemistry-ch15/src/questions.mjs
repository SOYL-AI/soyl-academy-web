// ISC 12 Chemistry ch15 Phenols and Ethers — question bank (ISC style). Stems name their own compounds and data.
// MCQ keys are placed by the builder; AR keys planned: a b a a c d. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, names, preparation
add('prep-mcq', mcq({
  stem: 'Sodium benzenesulphonate is fused with solid sodium hydroxide at about 573 K and the melt is then acidified. The organic product is:',
  right: 'phenol',
  wrong: ['benzene', 'benzoic acid', 'benzenethiol'],
  sol: 'C₆H₅SO₃Na + 2NaOH → C₆H₅ONa + Na₂SO₃ + H₂O; acid releases phenol — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('resorcinol-mcq', mcq({
  stem: 'Resorcinol, used in some antiseptic creams, has the IUPAC name:',
  right: 'benzene-1,3-diol',
  wrong: ['benzene-1,2-diol', 'benzene-1,4-diol', 'benzene-1,2,3-triol'],
  sol: 'Resorcinol is the meta-diol — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cresol-mcq', mcq({
  stem: 'm-Cresol, a constituent of coal-tar disinfectants, is:',
  right: '3-methylphenol',
  wrong: ['2-methylphenol', '4-methylphenol', 'phenylmethanol'],
  sol: 'Meta = position 3 relative to –OH — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cumene-mcq', mcq({
  stem: 'Cumene, the starting material for the industrial manufacture of phenol, is made by reacting benzene with:',
  right: 'propene, in the presence of an acid catalyst',
  wrong: ['propanone, with zinc dust', 'propan-1-ol, with sodium', 'ethene, with ultraviolet light'],
  sol: 'C₆H₆ + CH₂=CHCH₃ → C₆H₅CH(CH₃)₂ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cumene-tf', tf({
  stem: 'The cumene process yields propanone as a valuable co-product along with phenol.',
  key: 't',
  sol: 'True. Cumene hydroperoxide splits into phenol and propanone.',
  d: 1, c: 'recall', t: [1],
}));
add('quinol-fill', fill({
  stem: 'Benzene-1,4-diol, used as a photographic developer, is commonly called ___.',
  acc: [['quinol', 'hydroquinone']],
  sol: '**Quinol** (hydroquinone).',
  d: 1, c: 'recall', t: [1],
}));
add('cumene-num', num({
  marks: 2,
  stem: r`$12.0\ \text{g}$ of cumene ($M = 120$) is converted by the cumene process. If the overall yield is 80%, what mass of propanone ($M = 58$) is obtained?`,
  value: 4.64, tol: 0.02, unit: 'g',
  sol: r`$n = 12.0 \div 120 = 0.100\ \text{mol}$; mass $= 0.100 \times 58 \times 0.80 = 4.64\ \text{g}$.`,
  scheme: [['0.100 mol, 1 : 1', 1], ['4.64 g', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(0.1 * 58 * 0.8, 4.64) || 'mass');
add('sulph-short', short({
  marks: 2,
  stem: 'Starting from sodium benzenesulphonate, how is phenol obtained? Give the equations and conditions.',
  model: r`Fuse with solid NaOH at about 573 K: $\ce{C6H5SO3Na + 2NaOH -> C6H5ONa + Na2SO3 + H2O}$. Acidify the sodium phenoxide: $\ce{C6H5ONa + HCl -> C6H5OH + NaCl}$.`,
  sol: 'Alkali fusion; acidification.',
  scheme: [['Fusion equation with conditions', 1], ['Acidification', 1]],
  d: 2, c: 'application', t: [1],
}));
add('classify-short3', short({
  marks: 3,
  stem: 'Write the structures and IUPAC names of catechol, quinol and pyrogallol, and classify each as dihydric or trihydric.',
  model: 'Catechol: 1,2-C₆H₄(OH)₂, benzene-1,2-diol (dihydric). Quinol: 1,4-C₆H₄(OH)₂, benzene-1,4-diol (dihydric). Pyrogallol: 1,2,3-C₆H₃(OH)₃, benzene-1,2,3-triol (trihydric).',
  sol: 'Three structures and names.',
  scheme: [['Catechol', 1], ['Quinol', 1], ['Pyrogallol', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 physical properties, acidity, –OH reactions
add('acid-mcq', mcq({
  stem: 'Phenol dissolves in aqueous sodium hydroxide but does not liberate CO₂ from aqueous sodium hydrogencarbonate. This shows that phenol is:',
  right: 'a stronger acid than water but a weaker acid than carbonic acid',
  wrong: ['a stronger acid than carbonic acid', 'a weaker acid than water', 'a base'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('nitroacid-mcq', mcq({
  stem: 'Of phenol, 4-methylphenol, 3-nitrophenol and 4-nitrophenol, which has the lowest pKa?',
  right: '4-Nitrophenol',
  wrong: ['Phenol', '4-Methylphenol', '3-Nitrophenol'],
  sol: 'A para-NO₂ delocalises the negative charge by −R as well as −I (pKa 7.1) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('intra-mcq', mcq({
  stem: '2-Nitrophenol boils at a lower temperature than 4-nitrophenol. The reason is that 2-nitrophenol:',
  right: 'forms intramolecular hydrogen bonds, so its molecules are not linked to one another',
  wrong: ['has a smaller molar mass', 'cannot form any hydrogen bonds', 'is more polar'],
  sol: 'Chelation within the molecule replaces intermolecular association — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('zn-mcq', mcq({
  stem: 'Phenol vapour is passed over heated zinc dust. The organic product is:',
  right: 'benzene',
  wrong: ['cyclohexanol', 'biphenyl', 'zinc phenoxide only'],
  sol: 'C₆H₅OH + Zn → C₆H₆ + ZnO — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('pcl5-mcq', mcq({
  stem: 'Phenol gives only a poor yield of chlorobenzene with phosphorus pentachloride, unlike ethanol, which gives chloroethane readily. The main reason is that in phenol:',
  right: 'the C–O bond has partial double-bond character because of resonance',
  wrong: ['the O–H bond is very weak', 'phenol is a gas', 'PCl₅ reacts only with alcohols that have a methyl group'],
  sol: 'The strengthened C–O bond is hard to break — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('acyl-mcq', mcq({
  stem: 'Phenol is warmed with ethanoic anhydride. The ester formed is:',
  right: 'phenyl ethanoate',
  wrong: ['ethyl benzoate', 'methyl benzoate', 'phenyl methanoate'],
  sol: 'C₆H₅OH + (CH₃CO)₂O → CH₃COOC₆H₅ + CH₃COOH — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('acid-ar', ar({
  a: 'Phenol is a stronger acid than ethanol.',
  r: 'The phenoxide ion is stabilised by delocalisation of its negative charge into the benzene ring.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('meth-ar', ar({
  a: '4-Methoxyphenol is a slightly weaker acid than phenol.',
  r: 'The methoxy group withdraws electrons from the ring by its −I effect.',
  key: 'b',
  sol: 'Both statements are true, but A is due to the stronger +R (electron-releasing) effect of –OCH₃ at the para position, not its −I effect — option (b).',
  d: 4, c: 'analysis', t: [2],
}));
add('nahco3-tf', tf({
  stem: 'Phenol liberates carbon dioxide from aqueous sodium hydrogencarbonate.',
  key: 'f',
  sol: 'False. Phenol (pKa 10) is weaker than carbonic acid.',
  d: 1, c: 'understanding', t: [2],
}));
add('na-num', num({
  marks: 2,
  stem: r`$4.7\ \text{g}$ of phenol ($M = 94$) is dissolved in excess aqueous NaOH. What mass of sodium phenoxide ($M = 116$) is present in the solution?`,
  value: 5.8, tol: 0.02, unit: 'g',
  sol: r`$n = 4.7 \div 94 = 0.050\ \text{mol}$; mass $= 0.050 \times 116 = 5.8\ \text{g}$.`,
  scheme: [['0.050 mol', 1], ['5.8 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.05 * 116, 5.8) || 'mass');
add('acid-short', short({
  marks: 2,
  stem: 'Using resonance, explain why phenol (pKa 10.0) is a much stronger acid than cyclohexanol (pKa about 16).',
  model: 'Loss of H⁺ from phenol gives the phenoxide ion, in which the negative charge is delocalised from oxygen onto the ortho and para carbons of the ring (several resonance structures), stabilising the ion. The cyclohexoxide ion has no such delocalisation; its charge stays on oxygen, and the alkyl group (+I) destabilises it further.',
  sol: 'Phenoxide resonance; no delocalisation in alkoxide.',
  scheme: [['Phenoxide delocalisation', 1], ['Alkoxide not stabilised', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('hbond-short', short({
  marks: 2,
  stem: 'Phenol (M = 94) boils at 455 K, whereas toluene (M = 92) boils at 384 K. Explain.',
  model: 'Phenol molecules are associated by intermolecular hydrogen bonds through their –OH groups; extra energy is needed to break these. Toluene has only weak van der Waals forces.',
  sol: 'Hydrogen bonding in phenol.',
  scheme: [['H-bonding in phenol', 1], ['Only dispersion in toluene', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('react-short3', short({
  marks: 3,
  stem: 'Write equations for the reaction of phenol with (a) sodium, (b) ethanoyl chloride and (c) zinc dust on heating, naming the organic products.',
  model: r`(a) $\ce{2C6H5OH + 2Na -> 2C6H5ONa + H2}$: sodium phenoxide. (b) $\ce{C6H5OH + CH3COCl -> CH3COOC6H5 + HCl}$: phenyl ethanoate. (c) $\ce{C6H5OH + Zn -> C6H6 + ZnO}$: benzene.`,
  sol: 'Three equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('rank-short3', short({
  marks: 3,
  stem: 'Arrange 2,4-dinitrophenol, phenol, 4-methylphenol and 3-nitrophenol in order of increasing acid strength, and explain the order.',
  model: '4-Methylphenol < phenol < 3-nitrophenol < 2,4-dinitrophenol. –CH₃ releases electrons (+I, hyperconjugation), destabilising the phenoxide. –NO₂ withdraws electrons: from the meta position only by −I; from ortho and para positions also by −R, delocalising the negative charge onto the nitro oxygens. Two o/p nitro groups give the greatest stabilisation.',
  sol: 'Order with +I/−I/−R reasoning.',
  scheme: [['Order', 1], ['Methyl effect', 1], ['Nitro effects', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 electrophilic substitution, named reactions, tests
add('test-mcq', mcq({
  stem: 'Which reagent distinguishes phenol from cyclohexanol by giving an orange dye with phenol only?',
  right: 'Benzenediazonium chloride in cold alkaline solution',
  wrong: ['Sodium metal', 'Acidified potassium dichromate', 'Concentrated sulphuric acid'],
  sol: 'Coupling gives 4-hydroxyazobenzene, an orange azo dye — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('brcs2-mcq', mcq({
  stem: 'Phenol is treated with bromine dissolved in carbon disulphide at 273 K. The main product is:',
  right: '4-bromophenol',
  wrong: ['2,4,6-tribromophenol', '3-bromophenol', 'bromobenzene'],
  sol: 'In a non-polar solvent at low temperature, monosubstitution occurs, mainly para — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('carbene-mcq', mcq({
  stem: 'In the Reimer–Tiemann reaction of phenol with chloroform and aqueous NaOH, the electrophile that attacks the phenoxide ion is:',
  right: 'dichlorocarbene, :CCl₂',
  wrong: ['the trichloromethyl cation, CCl₃⁺', 'the chloride ion, Cl⁻', 'carbon dioxide'],
  sol: 'CHCl₃ + OH⁻ → :CCl₂ + H₂O + Cl⁻ — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('aspirin-mcq', mcq({
  stem: 'Salicylic acid, made from sodium phenoxide by Kolbe’s reaction, is converted into aspirin by:',
  right: 'acetylation with ethanoic anhydride',
  wrong: ['nitration with conc. HNO₃', 'reduction with zinc dust', 'bromination with bromine water'],
  sol: 'Aspirin is acetylsalicylic acid — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('sulph-mcq', mcq({
  stem: 'Phenol is heated with concentrated sulphuric acid at about 373 K. The major product is:',
  right: '4-hydroxybenzenesulphonic acid',
  wrong: ['2-hydroxybenzenesulphonic acid', '3-hydroxybenzenesulphonic acid', 'diphenyl sulphate'],
  sol: 'At higher temperature the para isomer predominates (ortho at about 290 K) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('picric-mcq', mcq({
  stem: 'Picric acid, obtained by treating phenol with concentrated nitric acid, is:',
  right: '2,4,6-trinitrophenol',
  wrong: ['2,4-dinitrophenol', '4-nitrophenol', 'trinitrotoluene'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('fecl3-mcq', mcq({
  stem: 'A few drops of neutral iron(III) chloride solution are added to an aqueous solution of phenol. The observation is:',
  right: 'a violet colour',
  wrong: ['a white precipitate', 'effervescence', 'a silver mirror'],
  sol: 'Phenols give coloured iron(III) complexes — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('brw-ar', ar({
  a: 'Phenol gives 2,4,6-tribromophenol with bromine water but mainly monobromophenols with bromine in CS₂.',
  r: 'In water phenol partly ionises to the more strongly activated phenoxide ion, and bromine is more polarised.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('kolbe-tf', tf({
  stem: 'Kolbe’s reaction introduces the –COOH group mainly at the para position of phenol.',
  key: 'f',
  sol: 'False. It gives mainly salicylic acid (ortho).',
  d: 1, c: 'recall', t: [3],
}));
add('rt-fill', fill({
  stem: 'The Reimer–Tiemann reaction of phenol gives 2-hydroxybenzaldehyde, commonly called ___.',
  acc: [['salicylaldehyde']],
  sol: '**Salicylaldehyde**.',
  d: 1, c: 'recall', t: [3],
}));
add('phenol-match', match({
  stem: 'Match each reaction of phenol (or sodium phenoxide) with its product.',
  pairs: [
    ['Heat with zinc dust', 'Benzene'],
    ['CHCl₃ + aqueous NaOH, then acid', 'Salicylaldehyde'],
    ['Sodium phenoxide + CO₂ under pressure, then acid', 'Salicylic acid'],
    ['Concentrated HNO₃', 'Picric acid'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Zn → benzene; Reimer–Tiemann → salicylaldehyde; Kolbe → salicylic acid; conc. HNO₃ → picric acid.',
  d: 2, c: 'application', t: [3],
}));
add('aspirin-num', num({
  marks: 2,
  stem: r`$4.7\ \text{g}$ of phenol ($M = 94$) is converted via sodium phenoxide into salicylic acid ($M = 138$) by Kolbe’s reaction with a 70% yield. What mass of salicylic acid is obtained?`,
  value: 4.83, tol: 0.02, unit: 'g',
  sol: r`$n = 4.7 \div 94 = 0.050\ \text{mol}$; mass $= 0.050 \times 138 \times 0.70 = 4.83\ \text{g}$.`,
  scheme: [['0.050 mol', 1], ['4.83 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(0.05 * 138 * 0.7, 4.83) || 'mass');
add('kolbe-short', short({
  marks: 2,
  stem: 'Write the equations for Kolbe’s reaction starting from sodium phenoxide, and name the product and one of its uses.',
  model: r`$\ce{C6H5ONa + CO2 ->[400 K, 4-7 atm] HOC6H4COONa}$ (sodium salicylate); $\ce{HOC6H4COONa + HCl -> HOC6H4COOH + NaCl}$: salicylic acid (2-hydroxybenzoic acid), used to make aspirin (or in skin preparations).`,
  sol: 'Salicylic acid; aspirin.',
  scheme: [['Equations with conditions', 1], ['Product and use', 1]],
  d: 2, c: 'application', t: [3],
}));
add('azo-short', short({
  marks: 2,
  stem: 'Describe the azo dye test for phenol, with the equation.',
  model: r`Phenol is dissolved in NaOH and added to cold (273–278 K) benzenediazonium chloride; an orange dye, 4-hydroxyazobenzene, forms. $\ce{C6H5N2Cl + C6H5OH + NaOH -> HOC6H4N=NC6H5 + NaCl + H2O}$.`,
  sol: 'Orange 4-hydroxyazobenzene.',
  scheme: [['Conditions and observation', 1], ['Equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('eas-short3', short({
  marks: 3,
  stem: 'Name the main products when phenol reacts with (a) dilute nitric acid at 298 K, (b) concentrated sulphuric acid at about 290 K and at about 373 K, and (c) bromine water.',
  model: '(a) 2-Nitrophenol and 4-nitrophenol. (b) 2-Hydroxybenzenesulphonic acid at about 290 K; 4-hydroxybenzenesulphonic acid at about 373 K. (c) 2,4,6-Tribromophenol (white precipitate).',
  sol: 'o/p-nitrophenols; o or p sulphonic acid; tribromophenol.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('test-short3', short({
  marks: 3,
  stem: 'Give one chemical test, with observations, to distinguish phenol from (a) benzoic acid, (b) anisole and (c) cyclohexanol.',
  model: '(a) Aqueous NaHCO₃: benzoic acid effervesces (CO₂); phenol does not. (b) Neutral FeCl₃: phenol gives a violet colour; anisole does not (or aqueous NaOH: phenol dissolves, anisole does not). (c) Bromine water: phenol gives a white precipitate of 2,4,6-tribromophenol; cyclohexanol does not.',
  sol: 'NaHCO₃; FeCl₃; bromine water.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 aliphatic ethers
add('williamson-mcq', mcq({
  stem: 'Which pair of reactants gives the best yield of 2-methoxy-2-methylbutane, CH₃CH₂C(CH₃)₂OCH₃, by Williamson’s synthesis?',
  right: 'Sodium 2-methylbutan-2-oxide and iodomethane',
  wrong: ['2-Chloro-2-methylbutane and sodium methoxide', '2-Methylbutan-2-ol and methanol with conc. H₂SO₄', 'Methanol and 2-methylbut-2-ene with sodium'],
  sol: 'The tertiary group must be on the alkoxide; a tertiary halide would undergo elimination — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('nameether-mcq', mcq({
  stem: 'The IUPAC name of ethyl isopropyl ether, CH₃CH₂OCH(CH₃)₂, is:',
  right: '2-ethoxypropane',
  wrong: ['1-ethoxypropane', '2-propoxyethane', 'ethoxyisopropane'],
  sol: 'The larger group (propane) is the parent; ethoxy at C-2 — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('peroxide-mcq', mcq({
  stem: 'A bottle of ethoxyethane that has stood in sunlight for months should not be distilled to dryness because:',
  right: 'it may contain explosive peroxides formed by reaction with air',
  wrong: ['it will have turned into ethanol', 'it decomposes into toxic chlorine', 'its boiling point will have risen above 500 K'],
  sol: 'Ethers form peroxides with O₂ in light; these explode on concentration — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('pcl5ether-mcq', mcq({
  stem: 'Ethoxyethane is heated with phosphorus pentachloride. The products are:',
  right: 'chloroethane (2 mol) and POCl₃',
  wrong: ['ethanol and PCl₃', 'chloroethane and ethanol', '1,1-dichloroethane and POCl₃'],
  sol: 'C₂H₅OC₂H₅ + PCl₅ → 2C₂H₅Cl + POCl₃ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cl2-mcq', mcq({
  stem: 'Ethoxyethane reacts with chlorine in the dark. The main product is:',
  right: '1-chloroethoxyethane, CH₃CHClOC₂H₅',
  wrong: ['perchlorodiethyl ether', 'chloroethane and ethanol', '2-chloroethanol'],
  sol: 'In the dark, the α-hydrogen next to oxygen is substituted — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('hi-mcq', mcq({
  stem: '1-Methoxypropane is heated with one equivalent of hydrogen iodide. The products are:',
  right: 'iodomethane and propan-1-ol',
  wrong: ['1-iodopropane and methanol', 'iodomethane and 1-iodopropane', 'propene and methanol'],
  sol: 'SN2 attack of I⁻ on the less hindered methyl carbon — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('hi-ar', ar({
  a: '2-Ethoxy-2-methylpropane reacts with HI to give 2-iodo-2-methylpropane and ethanol.',
  r: 'The protonated ether ionises by SN1 to give the stable tertiary carbocation.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('bp-ar', ar({
  a: 'Ethoxyethane is much more soluble in water than pentane, which has a similar molar mass.',
  r: 'Ethoxyethane molecules form hydrogen bonds with one another.',
  key: 'c',
  sol: 'A is true (water forms hydrogen bonds to the ether oxygen). R is false: ethers have no O–H and cannot hydrogen-bond with each other — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('etherhb-tf', tf({
  stem: 'Ether molecules can accept hydrogen bonds from water but cannot form hydrogen bonds with one another.',
  key: 't',
  sol: 'True. The ether oxygen has lone pairs but there is no O–H hydrogen.',
  d: 2, c: 'understanding', t: [4],
}));
add('perox-fill', fill({
  stem: 'Peroxides are removed from old samples of ether by shaking with acidified iron(II) ___ solution.',
  acc: [['sulphate', 'sulfate']],
  sol: 'Iron(II) **sulphate**.',
  d: 1, c: 'recall', t: [4],
}));
add('williamson-num', num({
  marks: 2,
  stem: r`$6.8\ \text{g}$ of sodium ethoxide ($M = 68$) reacts with excess 1-bromopropane. If the yield of 1-ethoxypropane ($M = 88$) is 75%, what mass is obtained?`,
  value: 6.6, tol: 0.02, unit: 'g',
  sol: r`$n = 6.8 \div 68 = 0.100\ \text{mol}$; mass $= 0.100 \times 88 \times 0.75 = 6.6\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['6.6 g', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(0.1 * 88 * 0.75, 6.6) || 'mass');
add('will-short', short({
  marks: 2,
  stem: 'Explain why 2-ethoxy-2-methylbutane cannot be made in good yield from 2-bromo-2-methylbutane and sodium ethoxide, and suggest a better pair of reactants.',
  model: 'Sodium ethoxide is a strong base; with a tertiary halide, backside SN2 attack is blocked and elimination of HBr gives mainly 2-methylbut-2-ene. Better: sodium 2-methylbutan-2-oxide with bromoethane (primary halide, SN2).',
  sol: 'Elimination with 3° halide; put 3° group on the alkoxide.',
  scheme: [['Elimination explained', 1], ['Correct pair', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('cleave-short', short({
  marks: 2,
  stem: 'Give the products when ethoxyethane is heated with (a) one mole of cold HI and (b) excess hot HI.',
  model: r`(a) $\ce{C2H5OC2H5 + HI -> C2H5I + C2H5OH}$: iodoethane and ethanol. (b) $\ce{C2H5OC2H5 + 2HI -> 2C2H5I + H2O}$: iodoethane only (the ethanol is also converted).`,
  sol: 'Iodoethane + ethanol; 2 iodoethane.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('reactether-short3', short({
  marks: 3,
  stem: 'Write equations or describe the products for the reaction of ethoxyethane with (a) chlorine in sunlight, (b) phosphorus pentachloride on heating and (c) oxygen of the air on long standing in light.',
  model: r`(a) All hydrogens replaced: $\ce{C2H5OC2H5 + 10Cl2 -> C2Cl5OC2Cl5 + 10HCl}$ (perchlorodiethyl ether). (b) $\ce{C2H5OC2H5 + PCl5 -> 2C2H5Cl + POCl3}$. (c) A peroxide forms, e.g. $\ce{C2H5OC2H5 + O2 -> CH3CH(OOH)OC2H5}$, which can explode on distillation.`,
  sol: 'Perchloroether; chloroethane + POCl₃; peroxide.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('cleave-short3', short({
  marks: 3,
  stem: 'Give the products of reaction with one equivalent of HI, and the mechanism type, for (a) 1-methoxybutane, (b) 2-ethoxy-2-methylpropane and (c) ethoxybenzene.',
  model: '(a) Iodomethane + butan-1-ol (SN2: I⁻ attacks the less hindered CH₃). (b) 2-Iodo-2-methylpropane + ethanol (SN1: stable tertiary carbocation). (c) Phenol + iodoethane (SN2 at ethyl; the aryl C–O bond does not break).',
  sol: 'CH₃I + BuOH; t-BuI + EtOH; PhOH + EtI.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [4, 5],
}));

// ---------------------------------------------------------------- t05 anisole
add('anisole-mcq', mcq({
  stem: 'Anisole is treated with chloromethane and anhydrous aluminium chloride. The major product is:',
  right: '4-methylanisole (1-methoxy-4-methylbenzene)',
  wrong: ['3-methylanisole', 'phenol and chloromethane', 'toluene and methanol'],
  sol: '–OCH₃ is o/p directing; para predominates — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('nitr-mcq', mcq({
  stem: 'Anisole is nitrated with a mixture of concentrated nitric and sulphuric acids. The major product is:',
  right: '4-nitroanisole',
  wrong: ['3-nitroanisole', 'nitrobenzene', '4-nitrophenol'],
  sol: 'Para substitution relative to –OCH₃ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('anprep-mcq', mcq({
  stem: 'Anisole is best prepared in the laboratory from:',
  right: 'sodium phenoxide and iodomethane',
  wrong: ['bromobenzene and sodium methoxide', 'phenol and methanol with zinc dust', 'benzene and methanol with AlCl₃'],
  sol: 'Williamson synthesis; aryl halides do not react with alkoxides — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('anisole-ar', ar({
  a: 'Anisole reacts with hydrogen iodide to give iodobenzene and methanol.',
  r: 'The aryl C–O bond in anisole has partial double-bond character.',
  key: 'd',
  sol: 'A is false: anisole gives phenol and iodomethane. R is true, and is the reason the aryl C–O bond does not break — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('anisole-tf', tf({
  stem: 'Bromination of anisole requires a Lewis acid catalyst such as FeBr₃.',
  key: 'f',
  sol: 'False. The ring is activated by –OCH₃; bromine in ethanoic acid suffices.',
  d: 2, c: 'understanding', t: [5],
}));
add('anisole-short', short({
  marks: 2,
  stem: 'Explain why anisole undergoes electrophilic substitution faster than benzene and mainly at the ortho and para positions.',
  model: 'A lone pair on the oxygen of –OCH₃ is delocalised into the ring (+R), increasing electron density, especially at ortho and para positions; this outweighs its −I effect. The ring is therefore activated, and the σ-complexes for o/p attack are stabilised by an extra resonance form with the positive charge on oxygen.',
  sol: '+R activation; o/p stabilisation.',
  scheme: [['+R activation', 1], ['o/p directing', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('anisole-short3', short({
  marks: 3,
  stem: 'Write equations for the reaction of anisole with (a) bromine in ethanoic acid, (b) ethanoyl chloride with anhydrous AlCl₃ and (c) concentrated nitric and sulphuric acids, naming the major products.',
  model: r`(a) $\ce{C6H5OCH3 + Br2 -> BrC6H4OCH3 + HBr}$: 4-bromoanisole. (b) $\ce{C6H5OCH3 + CH3COCl -> CH3COC6H4OCH3 + HCl}$: 4-methoxyacetophenone. (c) $\ce{C6H5OCH3 + HNO3 -> O2NC6H4OCH3 + H2O}$: 4-nitroanisole (with some 2-isomer).`,
  sol: 'Three para products.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- long answers
add('phenolprep-long', long({
  stem: '(a) Write equations for preparing phenol from (i) sodium benzenesulphonate and (ii) benzenediazonium chloride. [2]\n\n(b) Explain, using resonance, why phenol is acidic, and how a 4-nitro group and a 4-methyl group affect its acidity. [2]\n\n(c) Write equations for the reactions of phenol with sodium and with zinc dust. [1]',
  model: r`(a) (i) $\ce{C6H5SO3Na + 2NaOH ->[573 K] C6H5ONa + Na2SO3 + H2O}$, then $\ce{C6H5ONa + HCl -> C6H5OH + NaCl}$. (ii) $\ce{C6H5N2Cl + H2O ->[warm] C6H5OH + N2 + HCl}$.

(b) The phenoxide ion is stabilised by delocalisation of the negative charge over the oxygen and the ortho and para carbons. A 4-NO₂ group withdraws electrons (−R, −I) and delocalises the charge further onto its oxygens, increasing acidity; a 4-CH₃ group releases electrons (+I, hyperconjugation), destabilising the ion and decreasing acidity.

(c) $\ce{2C6H5OH + 2Na -> 2C6H5ONa + H2}$; $\ce{C6H5OH + Zn -> C6H6 + ZnO}$.`,
  sol: 'Two preparations; resonance and substituents; Na and Zn.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 2], ['(c)', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('phenoleas-long', long({
  stem: '(a) Compare the bromination of phenol in water and in carbon disulphide, and explain the difference. [1½]\n\n(b) Write equations for the Kolbe and Reimer–Tiemann reactions. [2]\n\n(c) Give two tests that distinguish phenol from ethanol. [1½]',
  model: r`(a) In water: 2,4,6-tribromophenol (white precipitate) at once. In CS₂ at 273 K: mainly 4-bromophenol with some 2-bromophenol. In water phenol partly ionises to the strongly activating phenoxide ion and Br₂ is polarised; in non-polar CS₂ neither happens, so substitution is milder.

(b) Kolbe: $\ce{C6H5ONa + CO2 ->[400 K, 4-7 atm] HOC6H4COONa}$, then H⁺ → salicylic acid. Reimer–Tiemann: $\ce{C6H5OH + CHCl3 + 3NaOH -> HOC6H4CHO + 3NaCl + 2H2O}$ (via the phenoxide; acidify) → salicylaldehyde.

(c) Neutral FeCl₃: violet with phenol, none with ethanol. Bromine water: white precipitate with phenol only. (Or: phenol dissolves in NaOH; azo dye test.)`,
  sol: 'Tribromo vs mono; Kolbe and RT; FeCl₃ and Br₂ water.',
  scheme: [['(a)', 1.5], ['(b) Kolbe', 1], ['(b) Reimer–Tiemann', 1], ['(c)', 1.5]],
  d: 3, c: 'application', t: [3],
}));
add('ether-long', long({
  stem: '(a) Describe Williamson’s synthesis of 1-ethoxypropane, and explain why tertiary alkyl halides are unsuitable for this synthesis. [2]\n\n(b) Predict the products, and the mechanism type, when (i) 1-methoxybutane and (ii) 2-ethoxy-2-methylpropane react with one equivalent of HI. [2]\n\n(c) Why are ethers stored in dark, airtight bottles? [1]',
  model: r`(a) $\ce{CH3CH2ONa + CH3CH2CH2Br -> CH3CH2OCH2CH2CH3 + NaBr}$ (SN2; or sodium propoxide + bromoethane). With a tertiary halide the alkoxide acts as a base and elimination gives an alkene.

(b) (i) Iodomethane + butan-1-ol (SN2 at the methyl carbon). (ii) 2-Iodo-2-methylpropane + ethanol (SN1 via the tertiary carbocation).

(c) In air and light ethers slowly form explosive peroxides.`,
  sol: 'Williamson; HI cleavage; peroxides.',
  scheme: [['(a) Equation', 1], ['(a) Tertiary halides', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4],
}));
add('anisole-long', long({
  stem: '(a) How is anisole prepared? Give the equation. [1]\n\n(b) Write equations for the bromination, nitration and Friedel–Crafts acylation of anisole, naming the major products. [3]\n\n(c) What are the products when anisole is heated with HI? [1]',
  model: r`(a) $\ce{C6H5ONa + CH3I -> C6H5OCH3 + NaI}$ (Williamson).

(b) $\ce{C6H5OCH3 + Br2 ->[CH3COOH] BrC6H4OCH3 + HBr}$: 4-bromoanisole. $\ce{C6H5OCH3 + HNO3 ->[H2SO4] O2NC6H4OCH3 + H2O}$: 4-nitroanisole. $\ce{C6H5OCH3 + CH3COCl ->[AlCl3] CH3COC6H4OCH3 + HCl}$: 4-methoxyacetophenone (2-isomers minor).

(c) $\ce{C6H5OCH3 + HI -> C6H5OH + CH3I}$: phenol and iodomethane.`,
  sol: 'Williamson; three para products; phenol + CH₃I.',
  scheme: [['(a)', 1], ['(b) Three equations', 3], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('conv-long', long({
  stem: 'How would you carry out the following conversions? Give reagents and conditions. [1 each]\n\n(a) Phenol to anisole\n\n(b) Phenol to salicylaldehyde\n\n(c) Phenol to benzene\n\n(d) Chlorobenzene to 2,4,6-tribromophenol\n\n(e) Phenol to phenyl ethanoate',
  model: '(a) NaOH, then CH₃I (Williamson). (b) CHCl₃ + aqueous NaOH at about 340 K, then acidify (Reimer–Tiemann). (c) Heat with zinc dust. (d) NaOH at 623 K and 300 atm, acidify to phenol (Dow), then bromine water. (e) Ethanoyl chloride (with pyridine) or ethanoic anhydride.',
  sol: 'Five conversions.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 4, c: 'analysis', t: [2, 3, 5],
}));

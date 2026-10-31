// ISC 12 Chemistry ch17 Benzaldehyde — question bank (ISC style). Stems name their own reagents and data.
// MCQ keys are placed by the builder; AR keys planned: a c b d a. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 preparation and physical properties
add('etard-mcq', mcq({
  stem: 'In the Etard reaction, toluene is converted into benzaldehyde by:',
  right: 'chromyl chloride in CS₂, followed by hydrolysis of the brown complex',
  wrong: ['hot alkaline KMnO₄, followed by acidification', 'chlorine in the dark with FeCl₃', 'hydrogen over Pd/BaSO₄'],
  sol: 'CrO₂Cl₂ oxidises the CH₃ group only as far as CHO — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('benzal-mcq', mcq({
  stem: 'Boiling toluene is treated with chlorine in sunlight until two chlorine atoms have entered, and the product is heated with water at 373 K. The final product is:',
  right: 'benzaldehyde',
  wrong: ['benzyl alcohol', 'benzoic acid', '2-chlorotoluene'],
  sol: 'C₆H₅CHCl₂ (benzal chloride) is hydrolysed to C₆H₅CHO — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('gk-mcq', mcq({
  stem: 'In the Gattermann–Koch reaction, benzene is converted into benzaldehyde using:',
  right: 'CO and HCl with anhydrous AlCl₃ and CuCl',
  wrong: ['CrO₂Cl₂ in CS₂', 'CH₃COCl and AlCl₃', 'HCN and HCl'],
  sol: 'C₆H₆ + CO → C₆H₅CHO (HCl, AlCl₃/CuCl) — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('crystals-mcq', mcq({
  stem: 'White crystals form around the stopper of an old bottle of benzaldehyde. They are most probably:',
  right: 'benzoic acid, formed by air oxidation',
  wrong: ['benzyl alcohol', 'benzoin', 'sodium benzoate'],
  sol: '2C₆H₅CHO + O₂ → 2C₆H₅COOH — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('smell-fill', fill({
  stem: 'Benzaldehyde is a colourless oily liquid with the smell of bitter ___.',
  acc: [['almonds', 'almond']],
  sol: 'Bitter **almonds**.',
  d: 1, c: 'recall', t: [1],
}));
add('alpha-tf', tf({
  stem: 'Benzaldehyde has no α-hydrogen atom.',
  key: 't',
  sol: 'True. The carbon next to C=O is a ring carbon bearing no hydrogen.',
  d: 1, c: 'understanding', t: [1],
}));
add('kmno4-ar', ar({
  a: 'Hot alkaline KMnO₄ is not used to convert toluene into benzaldehyde.',
  r: 'KMnO₄ oxidises the side chain of toluene all the way to the –COOH group.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('etard-num', num({
  marks: 2,
  stem: r`$9.2\ \text{g}$ of toluene ($M = 92$) is converted into benzaldehyde ($M = 106$) by the Etard reaction with a 60% yield. What mass of benzaldehyde is obtained?`,
  value: 6.36, tol: 0.03, unit: 'g',
  sol: r`$n = 9.2 \div 92 = 0.100\ \text{mol}$; mass $= 0.100 \times 106 \times 0.60 = 6.36\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['6.36 g', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(0.1 * 106 * 0.6, 6.36) || 'mass');
add('prep-short', short({
  marks: 2,
  stem: 'Write equations for preparing benzaldehyde from toluene via benzal chloride, giving the conditions.',
  model: r`$\ce{C6H5CH3 + 2Cl2 ->[h\nu][boiling toluene] C6H5CHCl2 + 2HCl}$; $\ce{C6H5CHCl2 + H2O ->[373 K] C6H5CHO + 2HCl}$.`,
  sol: 'Side-chain chlorination; hydrolysis.',
  scheme: [['Chlorination', 1], ['Hydrolysis', 1]],
  d: 2, c: 'application', t: [1],
}));
add('props-short', short({
  marks: 2,
  stem: 'State two physical properties of benzaldehyde and explain why it should be stored in a tightly closed bottle.',
  model: 'Colourless oily liquid with a smell of bitter almonds; b.p. 452 K; slightly soluble in water, miscible with organic solvents (any two). It is slowly oxidised by air to benzoic acid, so air must be excluded.',
  sol: 'Two properties; air oxidation.',
  scheme: [['Two properties', 1], ['Air oxidation', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('etard-short3', short({
  marks: 3,
  stem: 'Describe the Etard reaction for preparing benzaldehyde from toluene, explaining why the oxidation stops at the aldehyde, and give one other method of making benzaldehyde from benzene.',
  model: 'Toluene is treated with chromyl chloride (CrO₂Cl₂) in CS₂ or CCl₄; a brown chromium complex (Etard complex) precipitates. Hydrolysis with water gives benzaldehyde. The aldehyde is bound in the complex, so it is not oxidised further until it is released by hydrolysis. From benzene: Gattermann–Koch reaction — CO and HCl with anhydrous AlCl₃/CuCl.',
  sol: 'CrO₂Cl₂/CS₂; complex; Gattermann–Koch.',
  scheme: [['Reagents and complex', 1], ['Why it stops at CHO', 1], ['Second method', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 oxidation, reduction, addition, ammonia derivatives, PCl₅
add('fehling-mcq', mcq({
  stem: 'Benzaldehyde is warmed separately with Tollens’ reagent and with Fehling’s solution. The results are:',
  right: 'a silver mirror with Tollens’ reagent; no change with Fehling’s solution',
  wrong: ['no change with either', 'a silver mirror and a red-brown precipitate', 'a red-brown precipitate only'],
  sol: 'Aromatic aldehydes reduce Tollens’ but not Fehling’s — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('addn-mcq', mcq({
  stem: 'Benzaldehyde reacts with HCN in the presence of a little base. The product, hydrolysed with dilute acid, gives:',
  right: 'mandelic acid, C₆H₅CH(OH)COOH',
  wrong: ['benzoic acid', 'cinnamic acid', 'phenylethanoic acid'],
  sol: 'Mandelonitrile, C₆H₅CH(OH)CN, hydrolyses to mandelic acid — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pcl5-mcq', mcq({
  stem: 'Benzaldehyde is treated with phosphorus pentachloride. The organic product is:',
  right: 'benzal chloride, C₆H₅CHCl₂',
  wrong: ['benzoyl chloride, C₆H₅COCl', 'chlorobenzene', 'benzyl chloride, C₆H₅CH₂Cl'],
  sol: 'PCl₅ replaces the carbonyl O by two Cl — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('oxime-mcq', mcq({
  stem: 'Benzaldehyde reacts with hydroxylamine. The product is:',
  right: 'benzaldoxime, C₆H₅CH=NOH',
  wrong: ['benzamide', 'benzylamine', 'benzaldehyde hydrazone'],
  sol: 'Addition then loss of water — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('nabh4-mcq', mcq({
  stem: 'Benzaldehyde is reduced with sodium borohydride. The product is:',
  right: 'phenylmethanol (benzyl alcohol)',
  wrong: ['toluene', 'benzoic acid', 'cyclohexanecarbaldehyde'],
  sol: 'Aldehyde → primary alcohol — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('clem-mcq', mcq({
  stem: 'Benzaldehyde is heated with zinc amalgam and concentrated hydrochloric acid. The product is:',
  right: 'toluene',
  wrong: ['benzyl alcohol', 'benzene', 'benzoic acid'],
  sol: 'Clemmensen reduction: CHO → CH₃ — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('react-mcq', mcq({
  stem: 'Benzaldehyde is slightly less reactive than ethanal towards nucleophilic addition. The main reason is that:',
  right: 'conjugation with the ring reduces the positive charge on the carbonyl carbon',
  wrong: ['benzaldehyde has more α-hydrogens', 'the ring makes the carbonyl carbon sp³', 'benzaldehyde is a ketone'],
  sol: 'Electron donation from the ring by resonance lowers δ+ on C — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('fehling-ar', ar({
  a: 'Benzaldehyde does not reduce Fehling’s solution.',
  r: 'Benzaldehyde is not oxidised by any reagent.',
  key: 'c',
  sol: 'A is true. R is false: benzaldehyde is oxidised by air, Tollens’ reagent and KMnO₄ — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('bisulph-tf', tf({
  stem: 'Benzaldehyde can be separated from a mixture with toluene by shaking with saturated sodium hydrogensulphite solution.',
  key: 't',
  sol: 'True. Benzaldehyde forms a crystalline bisulphite adduct; toluene does not.',
  d: 2, c: 'application', t: [2],
}));
add('mandelo-fill', fill({
  stem: 'The cyanohydrin formed when HCN adds to benzaldehyde is called ___.',
  acc: [['mandelonitrile']],
  sol: '**Mandelonitrile**.',
  d: 1, c: 'recall', t: [2],
}));
add('reag-match', match({
  stem: 'Match each reagent used on benzaldehyde with the product.',
  pairs: [
    ['Phenylhydrazine', 'Benzaldehyde phenylhydrazone'],
    ['PCl₅', 'Benzal chloride'],
    ['H₂/Ni', 'Benzyl alcohol'],
    ['NaHSO₃', 'Crystalline bisulphite adduct'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Phenylhydrazine → phenylhydrazone; PCl₅ → C₆H₅CHCl₂; H₂/Ni → C₆H₅CH₂OH; NaHSO₃ → adduct.',
  d: 2, c: 'application', t: [2],
}));
add('tollens-num', num({
  marks: 2,
  stem: r`$1.06\ \text{g}$ of benzaldehyde ($M = 106$) is warmed with excess Tollens’ reagent: $\ce{C6H5CHO + 2[Ag(NH3)2]+ + 3OH- -> C6H5COO- + 2Ag + 2H2O + 4NH3}$. What mass of silver ($M = 108$) is deposited?`,
  value: 2.16, tol: 0.01, unit: 'g',
  sol: r`$n(\text{aldehyde}) = 1.06 \div 106 = 0.0100\ \text{mol}$; $n(\text{Ag}) = 0.0200\ \text{mol}$; mass $= 0.0200 \times 108 = 2.16\ \text{g}$.`,
  scheme: [['1 : 2 ratio', 1], ['2.16 g', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(0.02 * 108, 2.16) || 'mass');
add('ox-short', short({
  marks: 2,
  stem: 'Write the equation for the air oxidation of benzaldehyde and name one reagent that oxidises benzaldehyde in the laboratory.',
  model: r`$\ce{2C6H5CHO + O2 -> 2C6H5COOH}$ (benzoic acid). Laboratory oxidants: acidified K₂Cr₂O₇, alkaline KMnO₄ (then acid), or Tollens’ reagent.`,
  sol: 'Equation; an oxidant.',
  scheme: [['Equation', 1], ['Reagent', 1]],
  d: 1, c: 'application', t: [2],
}));
add('nh2-short', short({
  marks: 2,
  stem: 'Write equations for the reaction of benzaldehyde with (a) hydrazine and (b) phenylhydrazine, naming the products.',
  model: r`(a) $\ce{C6H5CHO + NH2NH2 -> C6H5CH=NNH2 + H2O}$: benzaldehyde hydrazone. (b) $\ce{C6H5CHO + C6H5NHNH2 -> C6H5CH=NNHC6H5 + H2O}$: benzaldehyde phenylhydrazone.`,
  sol: 'Hydrazone; phenylhydrazone.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('red-short3', short({
  marks: 3,
  stem: 'Give the product when benzaldehyde is treated with (a) LiAlH₄, (b) hydrazine followed by KOH in ethylene glycol on heating and (c) HCN followed by acid hydrolysis.',
  model: '(a) Benzyl alcohol, C₆H₅CH₂OH. (b) Toluene, C₆H₅CH₃ (Wolff–Kishner). (c) Mandelic acid, C₆H₅CH(OH)COOH.',
  sol: 'Benzyl alcohol; toluene; mandelic acid.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('add-short3', short({
  marks: 3,
  stem: 'Write equations for benzaldehyde with (a) sodium hydrogensulphite, (b) hydroxylamine and (c) phosphorus pentachloride.',
  model: r`(a) $\ce{C6H5CHO + NaHSO3 -> C6H5CH(OH)SO3Na}$. (b) $\ce{C6H5CHO + NH2OH -> C6H5CH=NOH + H2O}$. (c) $\ce{C6H5CHO + PCl5 -> C6H5CHCl2 + POCl3}$.`,
  sol: 'Three equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 Cannizzaro, benzoin, Perkin
add('named-mcq', mcq({
  stem: 'Benzaldehyde is heated with acetic anhydride and anhydrous sodium acetate at about 453 K. The organic acid formed is:',
  right: 'cinnamic acid, C₆H₅CH=CHCOOH',
  wrong: ['benzoic acid', 'mandelic acid', 'phenylethanoic acid'],
  sol: 'Perkin reaction — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('benzoin-mcq', mcq({
  stem: 'Benzaldehyde is warmed with potassium cyanide in aqueous ethanol. The product is:',
  right: 'benzoin, C₆H₅CH(OH)COC₆H₅',
  wrong: ['mandelonitrile', 'benzyl cyanide', 'benzoic acid'],
  sol: 'Benzoin condensation; CN⁻ is only a catalyst — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cann-mcq', mcq({
  stem: 'Benzaldehyde is shaken with 50% aqueous KOH. The products are:',
  right: 'benzyl alcohol and potassium benzoate',
  wrong: ['benzoin only', 'cinnamic acid and potassium acetate', 'toluene and potassium benzoate'],
  sol: 'Cannizzaro disproportionation — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('hydride-mcq', mcq({
  stem: 'The key step in the Cannizzaro reaction of benzaldehyde is the transfer of:',
  right: 'a hydride ion from one aldehyde-derived anion to a second benzaldehyde molecule',
  wrong: ['a proton from an α-carbon', 'a hydroxyl radical', 'a benzoyl cation'],
  sol: 'H⁻ transfer reduces one molecule and oxidises the other — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('crosscann-mcq', mcq({
  stem: 'A mixture of benzaldehyde and methanal is treated with concentrated NaOH. Benzaldehyde is converted mainly into:',
  right: 'benzyl alcohol',
  wrong: ['sodium benzoate', 'benzoin', 'cinnamic acid'],
  sol: 'Crossed Cannizzaro: methanal is oxidised, benzaldehyde reduced — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('cann-ar', ar({
  a: 'Benzaldehyde gives the Cannizzaro reaction but not aldol condensation.',
  r: 'Benzaldehyde has no α-hydrogen, so it cannot form an enolate ion.',
  key: 'a',
  sol: 'Both are true; R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('benzoin-ar', ar({
  a: 'In the benzoin condensation, cyanide ion acts as a catalyst.',
  r: 'Cyanide ion is a strong oxidising agent.',
  key: 'c',
  sol: 'A is true (CN⁻ is regenerated). R is false — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('perkin-tf', tf({
  stem: 'In the Perkin reaction, sodium acetate acts as a base that removes an α-hydrogen from acetic anhydride.',
  key: 't',
  sol: 'True. The resulting anion attacks the benzaldehyde carbonyl.',
  d: 2, c: 'understanding', t: [3],
}));
add('cann-num', num({
  marks: 2,
  stem: r`$21.2\ \text{g}$ of benzaldehyde ($M = 106$) undergoes complete Cannizzaro reaction with concentrated NaOH. What mass of benzyl alcohol ($M = 108$) forms?`,
  value: 10.8, tol: 0.05, unit: 'g',
  sol: r`$n(\text{aldehyde}) = 21.2 \div 106 = 0.200\ \text{mol}$; $n(\text{alcohol}) = 0.200 \div 2 = 0.100\ \text{mol}$; mass $= 0.100 \times 108 = 10.8\ \text{g}$.`,
  scheme: [['2 : 1 ratio', 1], ['10.8 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(0.1 * 108, 10.8) || 'mass');
add('perkin-num', num({
  marks: 2,
  stem: r`$10.6\ \text{g}$ of benzaldehyde ($M = 106$) is converted by the Perkin reaction into cinnamic acid ($M = 148$) with a 70% yield. What mass of cinnamic acid is obtained?`,
  value: 10.36, tol: 0.05, unit: 'g',
  sol: r`$n = 10.6 \div 106 = 0.100\ \text{mol}$; mass $= 0.100 \times 148 \times 0.70 = 10.36\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['10.36 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(0.1 * 148 * 0.7, 10.36) || 'mass');
add('cann-short', short({
  marks: 2,
  stem: 'Write the equation for the Cannizzaro reaction of benzaldehyde, and explain how the two products are separated and the acid obtained.',
  model: r`$\ce{2C6H5CHO + NaOH -> C6H5CH2OH + C6H5COONa}$. Benzyl alcohol is extracted with ether (sodium benzoate stays in water); acidifying the aqueous layer with HCl precipitates benzoic acid.`,
  sol: 'Equation; extraction and acidification.',
  scheme: [['Equation', 1], ['Separation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('benzoin-short', short({
  marks: 2,
  stem: 'Write the equation for the benzoin condensation and name the functional groups present in benzoin.',
  model: r`$\ce{2C6H5CHO ->[KCN][ethanol] C6H5CH(OH)COC6H5}$. Benzoin contains a secondary alcohol (–CH(OH)–) and a ketone (–CO–) group: it is an α-hydroxy ketone.`,
  sol: 'Equation; alcohol and ketone.',
  scheme: [['Equation with catalyst', 1], ['Functional groups', 1]],
  d: 2, c: 'application', t: [3],
}));
add('perkin-short', short({
  marks: 2,
  stem: 'Write the equation for the Perkin reaction of benzaldehyde, naming the reagents’ roles and the product.',
  model: r`$\ce{C6H5CHO + (CH3CO)2O ->[CH3COONa][453 K] C6H5CH=CHCOOH + CH3COOH}$. Acetic anhydride supplies the α-carbon; sodium acetate is the base catalyst; product: cinnamic acid (3-phenylprop-2-enoic acid).`,
  sol: 'Equation; roles; cinnamic acid.',
  scheme: [['Equation', 1], ['Roles and product', 1]],
  d: 2, c: 'application', t: [3],
}));
add('named-short3', short({
  marks: 3,
  stem: 'Identify the reaction and give the product for benzaldehyde with (a) conc. NaOH, (b) KCN in ethanol and (c) acetic anhydride with sodium acetate at 453 K.',
  model: '(a) Cannizzaro: benzyl alcohol + sodium benzoate. (b) Benzoin condensation: benzoin. (c) Perkin reaction: cinnamic acid.',
  sol: 'Cannizzaro; benzoin; Perkin.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cannmech-short3', short({
  marks: 3,
  stem: 'Outline the mechanism of the Cannizzaro reaction of benzaldehyde and explain why ethanal does not give this reaction.',
  model: 'OH⁻ adds to the carbonyl carbon of one benzaldehyde molecule, giving a tetrahedral anion. This anion transfers a hydride ion (H⁻) to the carbonyl carbon of a second molecule, becoming benzoic acid while the second becomes the benzyloxide ion. Proton exchange gives benzoate and benzyl alcohol. Ethanal has α-hydrogens; with alkali it forms an enolate and undergoes aldol reactions instead.',
  sol: 'OH⁻ addition; hydride transfer; ethanal aldol.',
  scheme: [['OH⁻ addition', 1], ['Hydride transfer and products', 1], ['Ethanal: α-H, aldol', 1]],
  d: 4, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 ring substitution, tests, uses
add('meta-mcq', mcq({
  stem: 'Benzaldehyde is nitrated with a mixture of concentrated nitric and sulphuric acids in the cold. The major product is:',
  right: '3-nitrobenzaldehyde',
  wrong: ['4-nitrobenzaldehyde', '2-nitrobenzaldehyde', 'nitrobenzene'],
  sol: '–CHO is meta directing — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('deact-mcq', mcq({
  stem: 'The –CHO group directs electrophiles to the meta position because:',
  right: 'it withdraws electrons, and o/p attack would place positive charge next to it in the σ-complex',
  wrong: ['it donates electrons by resonance to o and p positions', 'it is too large to allow o/p attack', 'it has an α-hydrogen'],
  sol: 'Meta attack avoids the destabilised resonance form — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('distinguish-mcq', mcq({
  stem: 'Which test gives a positive result with ethanal but not with benzaldehyde?',
  right: 'Fehling’s test (red-brown precipitate)',
  wrong: ['Tollens’ test (silver mirror)', '2,4-DNP test (orange precipitate)', 'Reaction with NaHSO₃'],
  sol: 'Benzaldehyde does not reduce Fehling’s solution — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('iodo-mcq', mcq({
  stem: 'Benzaldehyde and ethanal are each warmed with iodine and NaOH. The observation is:',
  right: 'ethanal gives a yellow precipitate; benzaldehyde does not',
  wrong: ['both give yellow precipitates', 'benzaldehyde gives a yellow precipitate; ethanal does not', 'neither reacts'],
  sol: 'Only ethanal has CH₃CO– — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('chlor-mcq', mcq({
  stem: 'Benzaldehyde reacts with chlorine in the presence of anhydrous FeCl₃. The major product is:',
  right: '3-chlorobenzaldehyde',
  wrong: ['4-chlorobenzaldehyde', 'benzoyl chloride', 'benzal chloride'],
  sol: 'Ring substitution, meta to CHO — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('use-mcq', mcq({
  stem: 'Cinnamaldehyde, the flavour of cinnamon, is made from benzaldehyde by:',
  right: 'cross aldol condensation with ethanal in dilute alkali',
  wrong: ['the Perkin reaction', 'the Cannizzaro reaction', 'oxidation with KMnO₄'],
  sol: 'C₆H₅CHO + CH₃CHO → C₆H₅CH=CHCHO + H₂O — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('meta-ar', ar({
  a: 'Nitration of benzaldehyde is slower than nitration of benzene.',
  r: 'The –CHO group donates electrons to the ring by resonance.',
  key: 'c',
  sol: 'A is true (–CHO deactivates). R is false: –CHO withdraws electrons — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('cold-ar', ar({
  a: 'Nitration of benzaldehyde is carried out at low temperature.',
  r: 'Hot concentrated nitric acid would oxidise the –CHO group to –COOH.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('tollens-tf', tf({
  stem: 'Both benzaldehyde and ethanal give a silver mirror with Tollens’ reagent.',
  key: 't',
  sol: 'True. Tollens’ reagent cannot distinguish them; Fehling’s or iodoform can.',
  d: 1, c: 'recall', t: [4],
}));
add('ortho-tf', tf({
  stem: 'Bromination of benzaldehyde with Br₂/FeBr₃ gives mainly 4-bromobenzaldehyde.',
  key: 'f',
  sol: 'False. –CHO directs meta: 3-bromobenzaldehyde.',
  d: 2, c: 'application', t: [4],
}));
add('malachite-fill', fill({
  stem: 'Benzaldehyde condenses with N,N-dimethylaniline in the manufacture of the dye malachite ___.',
  acc: [['green']],
  sol: 'Malachite **green**.',
  d: 1, c: 'recall', t: [4],
}));
add('meta-short', short({
  marks: 2,
  stem: 'Explain why the –CHO group is meta directing and deactivating in electrophilic substitution of benzaldehyde.',
  model: 'The –CHO group withdraws electrons from the ring by −I and −R effects, lowering electron density (deactivation). In the σ-complexes for ortho and para attack, one resonance form places the positive charge on the carbon bearing the electron-withdrawing –CHO group, which is very unfavourable; meta attack avoids this, so meta substitution is preferred.',
  sol: '−I/−R; σ-complex argument.',
  scheme: [['Deactivation', 1], ['Meta direction', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('dist-short', short({
  marks: 2,
  stem: 'Give two chemical tests, with observations, that distinguish benzaldehyde from ethanal.',
  model: '(i) Fehling’s solution, warm: ethanal gives a red-brown precipitate of Cu₂O; benzaldehyde does not react. (ii) I₂ + NaOH, warm: ethanal gives a yellow precipitate of iodoform; benzaldehyde does not.',
  sol: 'Fehling’s; iodoform.',
  scheme: [['Test 1', 1], ['Test 2', 1]],
  d: 2, c: 'application', t: [4],
}));
add('eas-short3', short({
  marks: 3,
  stem: 'Write equations for (a) the nitration and (b) the chlorination of benzaldehyde, naming the major products, and (c) explain why the nitration is done in the cold.',
  model: r`(a) $\ce{C6H5CHO + HNO3 ->[conc. H2SO4][273-283 K] O2NC6H4CHO + H2O}$: 3-nitrobenzaldehyde. (b) $\ce{C6H5CHO + Cl2 ->[FeCl3] ClC6H4CHO + HCl}$: 3-chlorobenzaldehyde. (c) At higher temperature nitric acid would oxidise –CHO to –COOH.`,
  sol: 'Meta products; avoid oxidation.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('uses-short3', short({
  marks: 3,
  stem: 'Name the compound made from benzaldehyde in each case and give one use: (a) by the Perkin reaction, (b) by cross aldol condensation with ethanal and (c) by addition of HCN followed by hydrolysis.',
  model: '(a) Cinnamic acid — perfumes and flavourings (esters). (b) Cinnamaldehyde — cinnamon flavour. (c) Mandelic acid — in skin-care products and as a urinary antiseptic (any reasonable use).',
  sol: 'Cinnamic acid; cinnamaldehyde; mandelic acid.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- long answers
add('prep-long', long({
  stem: '(a) Describe the Etard reaction for converting toluene into benzaldehyde. [1½]\n\n(b) Write equations for the reaction of benzaldehyde with (i) HCN, (ii) NaHSO₃ and (iii) PCl₅. [2]\n\n(c) Explain why benzaldehyde reduces Tollens’ reagent but not Fehling’s solution, and give the product of its reduction with NaBH₄. [1½]',
  model: r`(a) Toluene + CrO₂Cl₂ in CS₂ gives a brown chromium complex; hydrolysis with water gives benzaldehyde; oxidation stops at the aldehyde.

(b) (i) $\ce{C6H5CHO + HCN -> C6H5CH(OH)CN}$. (ii) $\ce{C6H5CHO + NaHSO3 -> C6H5CH(OH)SO3Na}$. (iii) $\ce{C6H5CHO + PCl5 -> C6H5CHCl2 + POCl3}$.

(c) The –CHO group of benzaldehyde is conjugated with the ring, which makes it harder to oxidise than an aliphatic –CHO. Ammoniacal Ag⁺ (Tollens’) is able to oxidise it, but the weaker Cu²⁺ tartrate complex in Fehling’s solution is not, so no Cu₂O forms. NaBH₄ gives benzyl alcohol.`,
  sol: 'Etard; three equations; Tollens’ vs Fehling’s.',
  scheme: [['(a)', 1.5], ['(b)', 2], ['(c)', 1.5]],
  d: 3, c: 'application', t: [1, 2],
}));
add('named-long', long({
  stem: '(a) Write equations for the Cannizzaro, benzoin and Perkin reactions of benzaldehyde, giving the reagents and conditions. [3]\n\n(b) Why does benzaldehyde undergo the Cannizzaro reaction rather than aldol condensation? [1]\n\n(c) What happens when benzaldehyde and methanal are treated together with concentrated NaOH? [1]',
  model: r`(a) Cannizzaro: $\ce{2C6H5CHO + NaOH -> C6H5CH2OH + C6H5COONa}$ (conc. alkali). Benzoin: $\ce{2C6H5CHO ->[KCN][ethanol] C6H5CH(OH)COC6H5}$. Perkin: $\ce{C6H5CHO + (CH3CO)2O ->[CH3COONa][453 K] C6H5CH=CHCOOH + CH3COOH}$.

(b) It has no α-hydrogen, so no enolate can form.

(c) Crossed Cannizzaro: $\ce{C6H5CHO + HCHO + NaOH -> C6H5CH2OH + HCOONa}$ — benzaldehyde is reduced, methanal oxidised.`,
  sol: 'Three named reactions; no α-H; crossed Cannizzaro.',
  scheme: [['(a) Cannizzaro', 1], ['(a) Benzoin', 1], ['(a) Perkin', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3],
}));
add('ring-long', long({
  stem: '(a) Explain, with reference to the intermediate, why the –CHO group is meta directing. [2]\n\n(b) Write equations for the nitration and chlorination of benzaldehyde. [2]\n\n(c) Give two uses of benzaldehyde. [1]',
  model: r`(a) –CHO withdraws electrons (−I, −R). In the σ-complex for ortho or para attack, one resonance structure places + on the ring carbon bonded to the electron-withdrawing –CHO group, which is strongly destabilised; for meta attack no such structure exists. So the meta σ-complex is the least unstable, and meta substitution predominates (though slower than in benzene).

(b) $\ce{C6H5CHO + HNO3 ->[H2SO4][cold] O2NC6H4CHO + H2O}$ (3-nitrobenzaldehyde); $\ce{C6H5CHO + Cl2 ->[FeCl3] ClC6H4CHO + HCl}$ (3-chlorobenzaldehyde).

(c) Flavouring (almond); perfumery; manufacture of dyes (malachite green), cinnamic acid, mandelic acid.`,
  sol: 'σ-complex argument; meta products; uses.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('ident-long', long({
  stem: 'An aromatic compound A, C₇H₆O, gives a silver mirror with Tollens’ reagent but no precipitate with Fehling’s solution. With concentrated NaOH, A gives B and C; C on acidification gives D, C₇H₆O₂. A with KCN in ethanol gives E, C₁₄H₁₂O₂.\n\n(a) Identify A to E. [4]\n\n(b) Write the equation for the formation of E. [1]',
  model: r`(a) A: benzaldehyde, C₆H₅CHO. B: benzyl alcohol, C₆H₅CH₂OH. C: sodium benzoate, C₆H₅COONa. D: benzoic acid, C₆H₅COOH. E: benzoin, C₆H₅CH(OH)COC₆H₅.

(b) $\ce{2C6H5CHO ->[KCN][ethanol] C6H5CH(OH)COC6H5}$.`,
  sol: 'Benzaldehyde, benzyl alcohol, sodium benzoate, benzoic acid, benzoin.',
  scheme: [['A', 1], ['B and C', 1], ['D', 1], ['E', 1], ['(b)', 1]],
  d: 4, c: 'analysis', t: [2, 3],
}));
add('conv-long', long({
  stem: 'How would you carry out the following conversions? Give reagents and conditions. [1 each]\n\n(a) Toluene to benzaldehyde\n\n(b) Benzaldehyde to cinnamic acid\n\n(c) Benzaldehyde to benzoin\n\n(d) Benzaldehyde to 3-nitrobenzaldehyde\n\n(e) Benzaldehyde to toluene',
  model: '(a) CrO₂Cl₂ in CS₂, then H₂O (Etard). (b) (CH₃CO)₂O + CH₃COONa, 453 K (Perkin). (c) KCN in aqueous ethanol, warm (benzoin condensation). (d) Conc. HNO₃ + conc. H₂SO₄, cold. (e) Zn–Hg + conc. HCl (Clemmensen) or NH₂NH₂ then KOH/ethylene glycol.',
  sol: 'Five conversions.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 2, c: 'application', t: [1, 2, 3, 4],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare benzaldehyde and ethanal in their behaviour with (a) Fehling’s solution, (b) dilute NaOH and (c) concentrated NaOH, giving reasons.',
  model: '(a) Ethanal reduces Fehling’s solution (red-brown Cu₂O); benzaldehyde does not, because its conjugated –CHO is harder to oxidise. (b) Ethanal, which has α-hydrogens, undergoes aldol condensation; benzaldehyde has no α-H and does not. (c) Benzaldehyde undergoes the Cannizzaro reaction (benzyl alcohol + sodium benzoate); ethanal gives aldol products and resins instead.',
  sol: 'Fehling’s; aldol; Cannizzaro.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}));

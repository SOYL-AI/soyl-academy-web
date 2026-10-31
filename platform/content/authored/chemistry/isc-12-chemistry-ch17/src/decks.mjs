// ISC 12 Chemistry ch17 Benzaldehyde — two decks: Part 1 (t01–t02) preparation (Etard), physical properties,
// oxidation, reduction, nucleophilic addition and reactions with ammonia derivatives and PCl₅; Part 2 (t03–t04)
// Cannizzaro, benzoin and Perkin reactions, electrophilic substitution, distinguishing tests and uses.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { NUCADD } from './svgs.mjs';

export const V = {
  nucadd: svgV(NUCADD, 'Two-step nucleophilic addition: the nucleophile attacks the carbonyl carbon to give a tetrahedral alkoxide intermediate, which takes a proton to give the product'),
};

export const deck1 = deck({
  part: 1,
  title: 'Benzaldehyde — Part 1: Preparation, properties and addition reactions',
  goals: [
    'Write the Etard reaction and other preparations of benzaldehyde',
    'Describe the physical properties of benzaldehyde',
    'Write oxidation, reduction and nucleophilic addition reactions of benzaldehyde',
    'Write the products with hydroxylamine, hydrazine, phenylhydrazine and PCl₅',
  ],
  slides: [
    sl('title', 'Benzaldehyde', {
      b: 'Part 1 — C₆H₅CHO: the simplest aromatic aldehyde, its preparation and its addition reactions.',
      v: table(['Use or occurrence', 'Detail'], [['Bitter almond oil', 'Natural source (as a glycoside, amygdalin)'], ['Flavouring', 'Almond and cherry flavours'], ['Perfumery', 'Soaps and cosmetics'], ['Dyes', 'Malachite green'], ['Synthesis', 'Cinnamic acid, mandelic acid, benzoin']], 'Table of uses and occurrence of benzaldehyde'),
      n: 'Namaste! The smell of bitter almonds comes from benzaldehyde, the simplest aromatic aldehyde, with an aldehyde group attached directly to a benzene ring. It flavours foods, scents soaps and is a starting material for dyes and drugs. In this part we see how it is prepared, what it looks like, and how its aldehyde group reacts.',
    }),
    sl('concept', 'Structure', {
      b: 'In C₆H₅CHO the –CHO carbon is **sp²** and **conjugated** with the ring. Benzaldehyde has **no α-hydrogen** (the carbon next to C=O is a ring carbon with no H to lose as an enolate), so it cannot undergo aldol self-condensation. Conjugation slightly reduces the δ+ on the carbonyl carbon, so it is a little less reactive than aliphatic aldehydes.',
      v: table(['Feature', 'Benzaldehyde', 'Ethanal'], [['Carbonyl carbon', 'sp², conjugated with ring', 'sp²'], ['α-Hydrogen', 'None', 'Three'], ['Aldol with itself', 'No', 'Yes'], ['Cannizzaro', 'Yes', 'No'], ['Fehling’s test', 'Negative', 'Positive']], 'Table comparing benzaldehyde and ethanal'),
      n: 'The aldehyde group in benzaldehyde sits directly on the ring, and its double bond is conjugated with the ring’s pi electrons, which slightly reduces the positive charge on the carbonyl carbon. Importantly, the carbon next to the carbonyl group is part of the ring and carries no hydrogen that can be removed, so benzaldehyde has no alpha hydrogen. This decides much of its chemistry.',
    }),
    sl('concept', 'Laboratory preparation: the Etard reaction', {
      b: 'Toluene is oxidised by **chromyl chloride** (CrO₂Cl₂) in CS₂ or CCl₄; a brown chromium complex (Etard complex) separates, which is hydrolysed by water to benzaldehyde. Mild oxidation stops at the aldehyde. Other routes: side-chain chlorination of toluene to benzal chloride and hydrolysis; Gattermann–Koch (benzene + CO + HCl, AlCl₃/CuCl).',
      m: [r`\ce{C6H5CH3 + 2Cl2 ->[h\nu] C6H5CHCl2 + 2HCl}`, r`\ce{C6H5CHCl2 + H2O ->[373 K] C6H5CHO + 2HCl}`, r`\ce{C6H6 + CO ->[HCl][AlCl3/CuCl] C6H5CHO}`],
      v: flow('LR', [['a', 'Toluene'], ['b', 'CrO₂Cl₂ in CS₂'], ['c', 'Brown Etard complex'], ['d', 'H₃O⁺ → benzaldehyde']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the Etard reaction'),
      n: 'In the laboratory, benzaldehyde is made by the Etard reaction. Chromyl chloride in carbon disulphide gently oxidises the methyl group of toluene, forming a brown complex. Water breaks down the complex to give benzaldehyde, without further oxidation to benzoic acid. Benzaldehyde can also be made by chlorinating the side chain of toluene to benzal chloride and hydrolysing it, or from benzene, carbon monoxide and hydrogen chloride.',
    }),
    sl('example', 'Worked example: routes from toluene', {
      b: r`**Problem.** Give two ways of converting toluene into benzaldehyde, and explain why acidified KMnO₄ is not used.

**Route 1 (Etard).** CrO₂Cl₂ in CS₂, then hydrolysis with water.

**Route 2.** Cl₂ in sunlight (boiling toluene) gives benzal chloride; heating with water at 373 K gives benzaldehyde.

**KMnO₄** is too strong: it oxidises the side chain all the way to **benzoic acid**.`,
      v: table(['Reagent', 'Product from toluene'], [['CrO₂Cl₂, then H₂O', 'Benzaldehyde'], ['Cl₂/hν, then H₂O', 'Benzaldehyde (via C₆H₅CHCl₂)'], ['Hot KMnO₄', 'Benzoic acid']], 'Table of products from toluene'),
      n: 'Both routes stop at the aldehyde. In the Etard reaction, the chromium complex protects the aldehyde from further oxidation until water is added. In the second route, two chlorines are put on the methyl carbon and then replaced by an oxygen on hydrolysis. Potassium permanganate is too strong an oxidant: it converts the methyl group all the way to a carboxylic acid group.',
    }),
    sl('concept', 'Physical properties', {
      b: 'Colourless oily liquid with a smell of **bitter almonds**; b.p. 452 K; slightly soluble in water, miscible with organic solvents; denser than water (1.04 g cm⁻³). On standing in air it slowly **oxidises to benzoic acid** (white crystals appear around the stopper).',
      v: table(['Property', 'Value'], [['Appearance', 'Colourless oily liquid'], ['Odour', 'Bitter almonds'], ['Boiling point', '452 K'], ['Density', '1.04 g cm⁻³'], ['In air', 'Oxidised to benzoic acid']], 'Table of physical properties of benzaldehyde'),
      n: 'Benzaldehyde is a colourless oily liquid that smells of bitter almonds. It boils at four hundred and fifty two kelvin, is only slightly soluble in water and mixes with organic solvents. Old bottles often show white crystals around the neck: air has slowly oxidised some of the benzaldehyde to benzoic acid.',
    }),
    sl('check', 'Quick check: preparation and properties', {
      b: 'Identify the Etard reagent or a property of benzaldehyde.',
      n: 'Quick check. Chromyl chloride stops at the aldehyde; air slowly turns benzaldehyde into benzoic acid.',
      chk: 'etard-mcq',
    }),
    sl('concept', 'Oxidation and reduction', {
      b: '**Oxidation:** air, acidified K₂Cr₂O₇ or alkaline KMnO₄ → benzoic acid; **Tollens’ reagent → silver mirror**; but **Fehling’s solution is not reduced** (aromatic aldehyde). **Reduction:** H₂/Ni, NaBH₄ or LiAlH₄ → **benzyl alcohol** (phenylmethanol); Zn–Hg/HCl (Clemmensen) or Wolff–Kishner → **toluene**.',
      m: [r`\ce{2C6H5CHO + O2 -> 2C6H5COOH}`, r`\ce{C6H5CHO + H2 ->[Ni] C6H5CH2OH}`],
      v: table(['Reagent', 'Product'], [['Air / K₂Cr₂O₇, H⁺', 'Benzoic acid'], ['Tollens’ reagent', 'Benzoate + silver mirror'], ['Fehling’s solution', 'No reaction'], ['H₂/Ni or NaBH₄', 'Benzyl alcohol'], ['Zn–Hg, HCl', 'Toluene']], 'Table of oxidation and reduction of benzaldehyde'),
      n: 'Benzaldehyde is easily oxidised to benzoic acid, even by air, and it gives a silver mirror with Tollens’ reagent. Unlike aliphatic aldehydes, however, it does not reduce Fehling’s solution. Reduction with hydrogen and nickel or with sodium borohydride gives benzyl alcohol, while the Clemmensen or Wolff–Kishner method removes the oxygen completely to give toluene.',
    }),
    sl('diagram', 'Nucleophilic addition: HCN and NaHSO₃', {
      b: 'Benzaldehyde adds nucleophiles at the carbonyl carbon. **HCN** gives **mandelonitrile** (benzaldehyde cyanohydrin), hydrolysed to **mandelic acid**. **NaHSO₃** gives a crystalline bisulphite adduct (used to separate benzaldehyde).',
      v: V.nucadd,
      m: [r`\ce{C6H5CHO + HCN -> C6H5CH(OH)CN}`, r`\ce{C6H5CHO + NaHSO3 -> C6H5CH(OH)SO3Na}`],
      n: 'Like other aldehydes, benzaldehyde adds nucleophiles. Cyanide ions attack the carbonyl carbon, and protonation gives mandelonitrile, which acid hydrolysis converts into mandelic acid, two-hydroxy-two-phenylethanoic acid. Sodium hydrogensulphite forms a crystalline adduct, which can be filtered off and decomposed again: a convenient way to separate benzaldehyde from other substances.',
    }),
    sl('concept', 'Ammonia derivatives and PCl₅', {
      b: 'Ammonia derivatives add and eliminate water (C=O → C=N). **PCl₅** replaces the carbonyl oxygen by two chlorines, giving **benzal chloride**.',
      m: [r`\ce{C6H5CHO + NH2OH -> C6H5CH=NOH + H2O}`, r`\ce{C6H5CHO + C6H5NHNH2 -> C6H5CH=NNHC6H5 + H2O}`, r`\ce{C6H5CHO + PCl5 -> C6H5CHCl2 + POCl3}`],
      v: table(['Reagent', 'Product'], [['NH₂OH', 'Benzaldoxime, C₆H₅CH=NOH'], ['NH₂NH₂', 'Benzaldehyde hydrazone, C₆H₅CH=NNH₂'], ['C₆H₅NHNH₂', 'Benzaldehyde phenylhydrazone'], ['PCl₅', 'Benzal chloride, C₆H₅CHCl₂']], 'Table of reactions with ammonia derivatives and PCl₅'),
      n: 'Hydroxylamine, hydrazine and phenylhydrazine react with benzaldehyde by addition followed by loss of water, giving benzaldoxime, the hydrazone and the phenylhydrazone, all crystalline solids useful for identification. Phosphorus pentachloride swaps the carbonyl oxygen for two chlorine atoms, giving benzal chloride, the same compound obtained by chlorinating the side chain of toluene.',
    }),
    sl('example', 'Worked example: products of benzaldehyde', {
      b: r`**Problem.** Give the product of benzaldehyde with (a) LiAlH₄; (b) HCN, then H₃O⁺ and heat; (c) phenylhydrazine; (d) PCl₅; (e) Zn–Hg/HCl.

**(a)** Benzyl alcohol, $\ce{C6H5CH2OH}$.

**(b)** Mandelic acid, $\ce{C6H5CH(OH)COOH}$ (via mandelonitrile).

**(c)** Benzaldehyde phenylhydrazone, $\ce{C6H5CH=NNHC6H5}$.

**(d)** Benzal chloride, $\ce{C6H5CHCl2}$.

**(e)** Toluene, $\ce{C6H5CH3}$.`,
      v: table(['Reagent', 'Product'], [['LiAlH₄', 'Benzyl alcohol'], ['HCN; H₃O⁺', 'Mandelic acid'], ['C₆H₅NHNH₂', 'Phenylhydrazone'], ['PCl₅', 'Benzal chloride'], ['Zn–Hg/HCl', 'Toluene']], 'Table of products'),
      n: 'Work through each reagent. Lithium aluminium hydride reduces the aldehyde to benzyl alcohol. Hydrogen cyanide gives the cyanohydrin, and hydrolysing its nitrile group gives mandelic acid. Phenylhydrazine gives the phenylhydrazone. Phosphorus pentachloride gives benzal chloride. And the Clemmensen reagents reduce the CHO group right down to a methyl group.',
    }),
    sl('check', 'Quick check: addition reactions', {
      b: 'Predict the product of benzaldehyde with an addition or ammonia-derivative reagent.',
      n: 'Quick check. Addition across the carbonyl group, or addition followed by loss of water.',
      chk: 'addn-mcq',
    }),
    sl('check', 'Quick check: oxidation and reduction', {
      b: 'Decide whether benzaldehyde reduces a given reagent, or what it is reduced to.',
      n: 'Quick check. Tollens’ yes, Fehling’s no; hydride gives benzyl alcohol, Clemmensen gives toluene.',
      chk: 'fehling-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'No α-H; CHO conjugated with ring.',
        'Etard: toluene + CrO₂Cl₂ (CS₂), then H₂O; also benzal chloride hydrolysis and Gattermann–Koch.',
        'Colourless oil, bitter almond smell, b.p. 452 K; air-oxidised to benzoic acid.',
        'Tollens’ positive, Fehling’s negative; reduction → benzyl alcohol or toluene.',
        'HCN → mandelonitrile; NaHSO₃ adduct; oxime, hydrazone, phenylhydrazone; PCl₅ → benzal chloride.',
      ],
      v: table(['Reagent', 'Product'], [['CrO₂Cl₂ (toluene)', 'Benzaldehyde'], ['HCN', 'Mandelonitrile'], ['PCl₅', 'Benzal chloride']], 'Summary table'),
      n: 'Let us sum up Part 1. Benzaldehyde has no alpha hydrogen and its aldehyde group is conjugated with the ring. It is made in the laboratory by the Etard reaction. It is easily oxidised to benzoic acid and reduces Tollens’ reagent but not Fehling’s solution. It adds hydrogen cyanide and sodium hydrogensulphite, forms derivatives with ammonia derivatives, and gives benzal chloride with phosphorus pentachloride.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Name chromyl chloride and the solvent (CS₂) for the Etard reaction.',
        'Benzaldehyde reduces Tollens’ but not Fehling’s.',
        'Mandelonitrile → mandelic acid on hydrolysis.',
        'PCl₅ gives benzal chloride, not benzoyl chloride.',
      ],
      v: table(['Slip', 'Fix'], [['KMnO₄ for toluene → benzaldehyde', 'Use CrO₂Cl₂ (Etard)'], ['Benzaldehyde gives red ppt with Fehling’s', 'No reaction'], ['PCl₅ gives C₆H₅COCl', 'Gives C₆H₅CHCl₂']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. For the Etard reaction, name chromyl chloride and carbon disulphide. Remember that benzaldehyde gives the Tollens’ test but not the Fehling’s test. The cyanohydrin is mandelonitrile. And phosphorus pentachloride gives benzal chloride, not benzoyl chloride, which comes from benzoic acid.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Benzaldehyde — Part 2: Named reactions, ring substitution and tests',
  goals: [
    'Write equations for the Cannizzaro, benzoin and Perkin reactions of benzaldehyde',
    'Explain why the –CHO group is meta directing and write ring substitution reactions',
    'Distinguish benzaldehyde from aliphatic aldehydes and state its uses',
  ],
  slides: [
    sl('title', 'Benzaldehyde’s special reactions', {
      b: 'Part 2 — reactions that depend on having no α-hydrogen, and substitution on the ring.',
      v: flow('LR', [['a', 'C₆H₅CHO (no α-H)'], ['b', 'Conc. NaOH: Cannizzaro'], ['c', 'KCN (ethanolic): benzoin'], ['d', '(CH₃CO)₂O/CH₃COONa: Perkin'], ['e', 'Ring: meta substitution']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['a', 'e']], 'Flow of the reactions in Part 2'),
      n: 'Because benzaldehyde has no alpha hydrogen, it shows reactions that aliphatic aldehydes like ethanal do not: the Cannizzaro reaction, the benzoin condensation and, with acetic anhydride, the Perkin reaction. Its ring also undergoes substitution, but the aldehyde group sends new groups to the meta position. We end with tests and uses.',
    }),
    sl('concept', 'Cannizzaro reaction', {
      b: 'With **concentrated** NaOH or KOH, benzaldehyde **disproportionates**: one molecule is reduced to **benzyl alcohol**, the other oxidised to **sodium benzoate** (acidify → benzoic acid). OH⁻ adds to one C=O; the intermediate transfers a **hydride ion** to a second molecule.',
      m: [r`\ce{2C6H5CHO + NaOH -> C6H5CH2OH + C6H5COONa}`],
      v: flow('LR', [['a', 'OH⁻ adds to C=O'], ['b', 'Tetrahedral anion'], ['c', 'Hydride (H⁻) transferred to 2nd C₆H₅CHO'], ['d', 'C₆H₅COO⁻ + C₆H₅CH₂OH']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the Cannizzaro mechanism'),
      n: 'With concentrated sodium hydroxide, half the benzaldehyde is oxidised and half reduced. Hydroxide adds to one molecule, and the tetrahedral anion pushes a hydride ion onto the carbonyl carbon of a second molecule. The first becomes benzoic acid, as its sodium salt, and the second becomes benzyl alcohol. The products are separated by extraction, and acidification releases benzoic acid.',
    }),
    sl('concept', 'Benzoin condensation', {
      b: 'Benzaldehyde heated with **ethanolic KCN** (CN⁻ catalyst) dimerises to **benzoin**, an α-hydroxy ketone: 2-hydroxy-1,2-diphenylethan-1-one.',
      m: [r`\ce{2C6H5CHO ->[KCN][ethanol, \Delta] C6H5CH(OH)COC6H5}`],
      v: table(['Feature', 'Benzoin condensation'], [['Reagent', 'Ethanolic KCN (catalytic CN⁻)'], ['Product', 'Benzoin, C₆H₅CH(OH)COC₆H₅'], ['Type', 'Self-condensation of aromatic aldehyde'], ['Functional groups in product', 'Secondary alcohol and ketone']], 'Table of the benzoin condensation'),
      n: 'When benzaldehyde is warmed with potassium cyanide in ethanol, two molecules join to give benzoin, which has a hydroxyl group on one carbon and a ketone group on the next. Cyanide acts only as a catalyst: it adds to one molecule, makes its former carbonyl carbon able to attack a second molecule, and is released again at the end.',
    }),
    sl('concept', 'Perkin reaction', {
      b: 'Benzaldehyde is heated (about 453 K) with **acetic anhydride** and **sodium acetate**; the product is **cinnamic acid** (3-phenylprop-2-enoic acid), an α,β-unsaturated acid.',
      m: [r`\ce{C6H5CHO + (CH3CO)2O ->[CH3COONa][453 K] C6H5CH=CHCOOH + CH3COOH}`],
      v: table(['Reagents', 'Role'], [['Benzaldehyde', 'Electrophile (no α-H)'], ['Acetic anhydride', 'Provides the α-carbon (enolate)'], ['Sodium acetate', 'Base catalyst'], ['Product', 'Cinnamic acid (trans)']], 'Table of the Perkin reaction'),
      n: 'In the Perkin reaction, benzaldehyde is heated with acetic anhydride and sodium acetate. The acetate ion removes a hydrogen from the anhydride, and the resulting anion attacks the benzaldehyde carbonyl. After loss of water and hydrolysis, cinnamic acid is formed, with a carbon–carbon double bond between the ring and the acid group. Cinnamic acid and its esters are used in perfumes and flavours.',
    }),
    sl('example', 'Worked example: three named reactions', {
      b: r`**Problem.** Identify the reaction and product: (a) benzaldehyde + 50% KOH; (b) benzaldehyde + KCN in ethanol, warm; (c) benzaldehyde + (CH₃CO)₂O + CH₃COONa, 453 K; (d) benzaldehyde + methanal + conc. NaOH.

**(a)** Cannizzaro: benzyl alcohol + potassium benzoate.

**(b)** Benzoin condensation: benzoin.

**(c)** Perkin: cinnamic acid.

**(d)** Crossed Cannizzaro: benzyl alcohol + sodium methanoate.`,
      v: table(['Reagent', 'Reaction', 'Product'], [['Conc. KOH', 'Cannizzaro', 'C₆H₅CH₂OH + C₆H₅COOK'], ['KCN/ethanol', 'Benzoin', 'C₆H₅CH(OH)COC₆H₅'], ['(CH₃CO)₂O/CH₃COONa', 'Perkin', 'C₆H₅CH=CHCOOH'], ['HCHO + conc. NaOH', 'Crossed Cannizzaro', 'C₆H₅CH₂OH + HCOONa']], 'Table of named reactions of benzaldehyde'),
      n: 'Recognise each reaction by its reagent. Concentrated alkali alone: Cannizzaro. Cyanide in ethanol: benzoin condensation. Acetic anhydride with sodium acetate on heating: Perkin. With methanal and concentrated alkali, methanal is the one oxidised, so all the benzaldehyde becomes benzyl alcohol, which is a useful way to make it.',
    }),
    sl('check', 'Quick check: named reactions', {
      b: 'Match a reagent to the named reaction and product.',
      n: 'Quick check. Concentrated alkali, ethanolic cyanide, or anhydride with acetate.',
      chk: 'named-mcq',
    }),
    sl('concept', 'Electrophilic substitution: meta direction', {
      b: 'The –CHO group withdraws electrons (−I and −R), **deactivating** the ring; positive charge in the σ-complex is placed on the carbon bearing CHO for o/p attack (destabilised), but not for meta attack. So substitution is **meta** and slower than in benzene.',
      m: [r`\ce{C6H5CHO + HNO3 ->[conc. H2SO4][273-283 K] O2NC6H4CHO + H2O}`, r`\ce{C6H5CHO + Cl2 ->[FeCl3] ClC6H4CHO + HCl}`],
      v: table(['Reaction', 'Reagent', 'Product'], [['Nitration', 'conc. HNO₃ + H₂SO₄ (cold)', '3-Nitrobenzaldehyde'], ['Chlorination', 'Cl₂, anhydrous FeCl₃', '3-Chlorobenzaldehyde'], ['Sulphonation', 'Fuming H₂SO₄', '3-Formylbenzenesulphonic acid']], 'Table of electrophilic substitution of benzaldehyde'),
      n: 'The aldehyde group pulls electrons out of the ring, both through the sigma bond and by resonance, so the ring reacts more slowly than benzene. Resonance structures show that attack at ortho or para positions would place positive charge right next to the electron-withdrawing group, which is unfavourable, while meta attack avoids this. So nitration, chlorination and sulphonation all give meta products.',
    }),
    sl('example', 'Worked example: meta products', {
      b: r`**Problem.** Give the major product of benzaldehyde with (a) conc. HNO₃/H₂SO₄ in the cold, (b) Br₂/FeBr₃. Why is the nitration done in the cold?

**(a)** 3-Nitrobenzaldehyde. **(b)** 3-Bromobenzaldehyde.

**Cold:** the –CHO group is easily oxidised by hot nitric acid (to –COOH), so a low temperature keeps the aldehyde intact.`,
      v: table(['Reagent', 'Major product'], [['HNO₃/H₂SO₄, cold', '3-Nitrobenzaldehyde'], ['Br₂/FeBr₃', '3-Bromobenzaldehyde']], 'Table of meta products'),
      n: 'Both electrophilic substitutions go meta to the aldehyde group, giving three-nitrobenzaldehyde and three-bromobenzaldehyde. Nitration is carried out at low temperature because hot concentrated nitric acid would also oxidise the aldehyde group to a carboxylic acid group.',
    }),
    sl('check', 'Quick check: ring substitution', {
      b: 'Predict the position of electrophilic substitution in benzaldehyde.',
      n: 'Quick check. The aldehyde group is electron-withdrawing and meta directing.',
      chk: 'meta-mcq',
    }),
    sl('concept', 'Aromatic versus aliphatic aldehydes', {
      b: 'Tests that distinguish **benzaldehyde** from **ethanal** (or other aliphatic aldehydes):',
      v: table(['Test', 'Benzaldehyde', 'Ethanal'], [['Fehling’s / Benedict’s solution', 'No reaction', 'Red-brown Cu₂O'], ['Iodoform (I₂/NaOH)', 'No yellow ppt', 'Yellow CHI₃'], ['Dilute NaOH', 'No aldol', 'Aldol (resinous on heating)'], ['Conc. NaOH', 'Cannizzaro', 'Aldol / resin'], ['Tollens’ reagent', 'Silver mirror', 'Silver mirror']], 'Table of tests distinguishing benzaldehyde from ethanal'),
      n: 'Several tests tell benzaldehyde from aliphatic aldehydes such as ethanal. Fehling’s solution is reduced by ethanal but not by benzaldehyde. Ethanal gives iodoform; benzaldehyde does not. Ethanal undergoes aldol reactions with alkali, while benzaldehyde, with no alpha hydrogen, gives the Cannizzaro reaction. Tollens’ reagent, however, is reduced by both.',
    }),
    sl('concept', 'Uses of benzaldehyde', {
      b: 'Flavouring (almond, cherry); perfumes and soaps; manufacture of **dyes** (malachite green), **cinnamic acid** (Perkin), **mandelic acid** (via HCN) and **benzoin**; as a solvent for some resins.',
      v: table(['Product made from benzaldehyde', 'Reaction'], [['Cinnamic acid', 'Perkin'], ['Mandelic acid', 'HCN, then hydrolysis'], ['Benzoin', 'Benzoin condensation'], ['Cinnamaldehyde', 'Cross aldol with ethanal'], ['Malachite green', 'Condensation with N,N-dimethylaniline']], 'Table of products made from benzaldehyde'),
      n: 'Benzaldehyde is used directly as an almond flavouring and in perfumes and soaps. It is also a starting material: the Perkin reaction gives cinnamic acid, hydrogen cyanide leads to mandelic acid, the benzoin condensation gives benzoin, a cross aldol with ethanal gives cinnamaldehyde, the flavour of cinnamon, and condensation with dimethylaniline leads to the dye malachite green.',
    }),
    sl('check', 'Quick check: distinguishing tests', {
      b: 'Choose a test that distinguishes benzaldehyde from an aliphatic aldehyde.',
      n: 'Quick check. Fehling’s solution and the iodoform test both work for ethanal but not for benzaldehyde.',
      chk: 'distinguish-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Cannizzaro: 2C₆H₅CHO + NaOH → C₆H₅CH₂OH + C₆H₅COONa (hydride transfer).',
        'Benzoin: 2C₆H₅CHO (KCN, ethanol) → C₆H₅CH(OH)COC₆H₅.',
        'Perkin: C₆H₅CHO + (CH₃CO)₂O (CH₃COONa, 453 K) → cinnamic acid.',
        '–CHO: deactivating, meta directing (3-nitro-, 3-chlorobenzaldehyde).',
        'Benzaldehyde vs ethanal: Fehling’s and iodoform negative for benzaldehyde; both reduce Tollens’.',
      ],
      v: table(['Named reaction', 'Product'], [['Cannizzaro', 'Benzyl alcohol + benzoate'], ['Benzoin', 'Benzoin'], ['Perkin', 'Cinnamic acid']], 'Summary table of named reactions'),
      n: 'Let us sum up Part 2. Having no alpha hydrogen, benzaldehyde undergoes the Cannizzaro reaction with concentrated alkali, the benzoin condensation with cyanide, and the Perkin reaction with acetic anhydride. Its aldehyde group deactivates the ring and directs substitution to the meta position. It is distinguished from aliphatic aldehydes by the Fehling’s and iodoform tests.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Give the catalyst/conditions for each named reaction (conc. alkali; KCN in ethanol; CH₃COONa at 453 K).',
        'Name cinnamic acid as 3-phenylprop-2-enoic acid.',
        'Explain meta direction with the σ-complex argument.',
        'For tests, describe results with both compounds.',
      ],
      v: table(['Slip', 'Fix'], [['–CHO is o/p directing', 'Meta directing'], ['Perkin gives cinnamaldehyde', 'Gives cinnamic acid'], ['Benzoin uses NaOH', 'Uses KCN in ethanol']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Always give the reagents and conditions that identify each named reaction. Remember that the Perkin reaction gives cinnamic acid. Explain meta direction using the intermediate. And when distinguishing compounds, describe what happens with each one.',
    }),
  ],
});

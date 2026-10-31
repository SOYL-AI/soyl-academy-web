// ISC 12 Chemistry ch16 Aldehydes and Ketones — two decks: Part 1 (t01–t02) nomenclature, structure, physical
// properties and preparation; Part 2 (t03–t06) nucleophilic addition with mechanism, oxidation, iodoform and
// reduction, aldol, cross aldol and Cannizzaro reactions, tests and uses.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CARBONYL, NUCADD } from './svgs.mjs';

export const V = {
  carbonyl: svgV(CARBONYL, 'A planar carbonyl group with about 120 degree bond angles, a partial positive charge on carbon, a partial negative charge on oxygen and a nucleophile attacking the carbon'),
  nucadd: svgV(NUCADD, 'Two-step nucleophilic addition: the nucleophile attacks the carbonyl carbon to give a tetrahedral alkoxide intermediate, which takes a proton to give the product'),
};

export const deck1 = deck({
  part: 1,
  title: 'Aldehydes and Ketones — Part 1: Structure, properties and preparation',
  goals: [
    'Name aldehydes and ketones by IUPAC rules and describe the carbonyl group',
    'Explain the boiling points of carbonyl compounds compared with alcohols and alkanes',
    'Write equations to prepare aldehydes and ketones from alcohols, alkenes, alkynes, acid chlorides, calcium salts, nitriles and esters',
  ],
  slides: [
    sl('title', 'Carbonyl compounds', {
      b: 'Part 1 — aldehydes (R–CHO) and ketones (R–CO–R′): names, structure, properties and preparation.',
      v: table(['Compound', 'Where you meet it'], [['Methanal (formalin, 40%)', 'Preserving biological specimens; resins'], ['Propanone (acetone)', 'Nail-polish remover; solvent'], ['Butanone', 'Industrial solvent'], ['Vanillin (an aldehyde)', 'Flavour of vanilla'], ['Camphor (a ketone)', 'Medicines, pujas']], 'Table of familiar carbonyl compounds'),
      n: 'Namaste! The smell of vanilla, the solvent in nail-polish remover and the preservative formalin all contain the carbonyl group, a carbon doubly bonded to oxygen. In aldehydes this carbon carries at least one hydrogen; in ketones it is joined to two carbon groups. In this part we name these compounds, study the carbonyl group and learn many ways of making them.',
    }),
    sl('concept', 'Nomenclature', {
      b: '**Aldehydes:** replace -e of the alkane by **-al**; the CHO carbon is C-1. **Ketones:** replace -e by **-one**, with the lowest locant for C=O. Common names come from the related acids (formaldehyde, acetaldehyde) or alkyl groups + ketone.',
      v: table(['Structure', 'Common name', 'IUPAC name'], [['HCHO', 'Formaldehyde', 'Methanal'], ['CH₃CH₂CHO', 'Propionaldehyde', 'Propanal'], ['(CH₃)₂CHCHO', 'Isobutyraldehyde', '2-Methylpropanal'], ['CH₃COCH₂CH₃', 'Ethyl methyl ketone', 'Butan-2-one'], ['CH₃CH₂COCH₂CH₃', 'Diethyl ketone', 'Pentan-3-one'], ['CH₃CH=CHCHO', 'Crotonaldehyde', 'But-2-enal']], 'Table of names of aldehydes and ketones'),
      n: 'An aldehyde is named by changing the ending of the alkane to al; the aldehyde carbon is always carbon one, so it needs no number. A ketone ends in one, with a number for the carbonyl carbon when needed, as in butan-two-one and pentan-three-one. Many common names come from the related acids: formaldehyde from formic acid, acetaldehyde from acetic acid.',
    }),
    sl('diagram', 'Structure of the carbonyl group', {
      b: 'The carbonyl carbon is **sp²**: three σ bonds in a plane at about 120°, and a π bond to oxygen. C=O is **polar** (C δ+, O δ−) and is represented as a resonance hybrid of C=O and C⁺–O⁻. The carbon is attacked by **nucleophiles**; the oxygen by electrophiles (H⁺).',
      v: V.carbonyl,
      n: 'The carbonyl carbon is sp two hybridised, so the group is flat with angles of about one hundred and twenty degrees. Oxygen is more electronegative and pulls the pi electrons towards itself; we can think of the group as partly C plus, O minus. This makes the carbon a target for nucleophiles, and because the group is flat, attack can come from either face.',
    }),
    sl('concept', 'Physical properties', {
      b: 'Methanal is a gas; lower members are liquids, higher ones solids. Carbonyl compounds are **polar** (dipole–dipole attractions) but **cannot hydrogen-bond with each other**: b.p. higher than alkanes and ethers of similar mass, lower than alcohols. Lower members **dissolve in water** (H-bonds from water to C=O); solubility falls with chain length.',
      v: table(['Compound (M ≈ 58–60)', 'b.p. / K', 'Main attraction'], [['Butane', '273', 'Dispersion'], ['Methoxyethane', '281', 'Weak dipole'], ['Propanal', '322', 'Dipole–dipole'], ['Propanone', '329', 'Dipole–dipole'], ['Propan-1-ol', '370', 'Hydrogen bonding']], 'Table of boiling points of compounds of similar mass'),
      n: 'Compare compounds of similar molar mass. Butane boils lowest, with only weak dispersion forces. Propanal and propanone boil higher, because their polar carbonyl groups attract each other. Propan-one-ol boils highest of all, because its molecules hydrogen-bond. Small aldehydes and ketones dissolve in water, because water molecules hydrogen-bond to the carbonyl oxygen.',
    }),
    sl('example', 'Worked example: naming', {
      b: r`**Problem.** Give IUPAC names: (a) $\ce{CH3CH(CH3)CH2CHO}$; (b) $\ce{CH3COCH(CH3)2}$; (c) $\ce{CH3CH2CH(CH3)COCH3}$; (d) $\ce{OHCCH2CH2CHO}$.

**(a)** 3-Methylbutanal (CHO carbon is C-1).

**(b)** 3-Methylbutan-2-one.

**(c)** 3-Methylpentan-2-one.

**(d)** Butanedial.`,
      v: flow('LR', [['a', 'Longest chain including C=O carbon'], ['b', 'Aldehyde: CHO = C-1; ketone: lowest locant'], ['c', 'Substituents with locants'], ['d', '-al or -one']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for naming carbonyl compounds'),
      n: 'Choose the longest chain containing the carbonyl carbon. For an aldehyde, number from the CHO carbon. For a ketone, number to give the carbonyl the lowest locant. So the first compound is three-methylbutanal, the second three-methylbutan-two-one and the third three-methylpentan-two-one. A chain with an aldehyde group at each end is a dial: butanedial.',
    }),
    sl('check', 'Quick check: names and properties', {
      b: 'Name a carbonyl compound or compare its boiling point.',
      n: 'Quick check. Remember that carbonyl compounds are polar but cannot hydrogen-bond with each other.',
      chk: 'name-mcq',
    }),
    sl('concept', 'From alcohols, alkenes and alkynes', {
      b: '**Alcohols:** 1° → aldehyde (PCC, or Cu at 573 K); 2° → ketone (K₂Cr₂O₇/H⁺ or Cu at 573 K). **Alkenes:** ozonolysis (O₃, then Zn/H₂O) splits C=C into two C=O groups. **Alkynes:** hydration with dilute H₂SO₄ + HgSO₄: ethyne → ethanal; other alkynes → ketones.',
      m: [r`\ce{CH3CH2OH ->[Cu][573 K] CH3CHO + H2}`, r`\ce{HC#CH + H2O ->[HgSO4][dil. H2SO4] CH3CHO}`, r`\ce{CH3C#CH + H2O ->[HgSO4][dil. H2SO4] CH3COCH3}`],
      v: table(['Starting compound', 'Method', 'Product'], [['Propan-1-ol', 'PCC', 'Propanal'], ['Butan-2-ol', 'Cu, 573 K', 'Butanone'], ['But-2-ene', 'O₃; Zn/H₂O', 'Ethanal (2 mol)'], ['2-Methylpropene', 'O₃; Zn/H₂O', 'Propanone + methanal'], ['Propyne', 'H₂O, Hg²⁺, H⁺', 'Propanone']], 'Table of preparations from alcohols, alkenes and alkynes'),
      n: 'Gentle oxidation or dehydrogenation of alcohols gives aldehydes from primary alcohols and ketones from secondary alcohols. Ozone cuts a carbon–carbon double bond, and work-up with zinc and water gives two carbonyl compounds; this also helps locate the double bond. Water adds to alkynes with mercury two ions as catalyst: ethyne gives ethanal, and other alkynes give ketones.',
    }),
    sl('concept', 'From acid chlorides and calcium salts', {
      b: '**Rosenmund:** RCOCl + H₂ over Pd/BaSO₄ (poisoned, so the aldehyde is not reduced further) → RCHO. **Dialkylcadmium:** 2RCOCl + R′₂Cd → 2RCOR′ + CdCl₂ (ketones). **Calcium salts:** dry distillation of a calcium carboxylate gives a ketone; with calcium methanoate, an aldehyde.',
      m: [r`\ce{CH3CH2COCl + H2 ->[Pd/BaSO4] CH3CH2CHO + HCl}`, r`\ce{2CH3COCl + (CH3CH2)2Cd -> 2CH3COCH2CH3 + CdCl2}`, r`\ce{(CH3COO)2Ca ->[\Delta] CH3COCH3 + CaCO3}`, r`\ce{(CH3COO)2Ca + (HCOO)2Ca ->[\Delta] 2CH3CHO + 2CaCO3}`],
      v: table(['Method', 'Product type'], [['Rosenmund (H₂, Pd/BaSO₄)', 'Aldehyde'], ['R′₂Cd with RCOCl', 'Ketone'], ['Heat (RCOO)₂Ca', 'Symmetrical ketone'], ['Heat (RCOO)₂Ca + (HCOO)₂Ca', 'Aldehyde']], 'Table of preparations from acid chlorides and calcium salts'),
      n: 'Acid chlorides are reduced to aldehydes by hydrogen over palladium deliberately poisoned with barium sulphate, so the reduction stops at the aldehyde: the Rosenmund reaction. Dialkylcadmium compounds turn acid chlorides into ketones. Heating calcium salts of carboxylic acids also gives ketones, such as propanone from calcium ethanoate; heating with calcium methanoate gives an aldehyde instead.',
    }),
    sl('concept', 'From nitriles and esters', {
      b: '**Stephen reaction:** nitrile + SnCl₂/HCl → imine hydrochloride → (H₂O) aldehyde. **Grignard:** nitrile + RMgX → imine salt → (H₃O⁺) **ketone**. **DIBAL-H** (diisobutylaluminium hydride) reduces nitriles and esters to aldehydes at low temperature.',
      v: table(['Starting compound', 'Reagent', 'Product'], [['CH₃CN', 'SnCl₂/HCl; H₂O', 'Ethanal'], ['CH₃CN', 'CH₃CH₂MgBr; H₃O⁺', 'Butan-2-one'], ['C₆H₅CN', 'CH₃MgI; H₃O⁺', 'Acetophenone'], ['CH₃COOC₂H₅', 'DIBAL-H; H₂O', 'Ethanal'], ['CH₃CH₂CN', 'DIBAL-H; H₂O', 'Propanal']], 'Table of preparations from nitriles and esters'),
      n: 'Nitriles are versatile. In the Stephen reaction, tin two chloride and hydrochloric acid reduce a nitrile to an imine, which water hydrolyses to an aldehyde. A Grignard reagent adds to the nitrile carbon, and acid hydrolysis then gives a ketone, so ethanenitrile and ethylmagnesium bromide give butanone. DIBAL-H reduces nitriles and esters gently, stopping at the aldehyde.',
    }),
    sl('example', 'Worked example: choosing a preparation', {
      b: r`**Problem.** Suggest a method: (a) propanoyl chloride → propanal; (b) ethanoyl chloride → pentan-2-one; (c) calcium propanoate → a ketone (name it); (d) propanenitrile → pentan-3-one.

**(a)** H₂, Pd/BaSO₄ (Rosenmund).

**(b)** Dipropylcadmium: $\ce{2CH3COCl + (CH3CH2CH2)2Cd -> 2CH3COCH2CH2CH3 + CdCl2}$.

**(c)** Heat: pentan-3-one, $\ce{(CH3CH2COO)2Ca -> CH3CH2COCH2CH3 + CaCO3}$.

**(d)** $\ce{CH3CH2MgBr}$, then $\ce{H3O+}$.`,
      v: table(['Conversion', 'Method'], [['RCOCl → RCHO', 'Rosenmund'], ['RCOCl → RCOR′', 'R′₂Cd'], ['(RCOO)₂Ca → RCOR', 'Dry distillation'], ['RCN → RCOR′', 'R′MgX, then H₃O⁺']], 'Table of conversions'),
      n: 'Choose by the target. To stop an acid chloride at the aldehyde, use the Rosenmund reduction. To turn ethanoyl chloride into pentan-two-one, add a propyl group with dipropylcadmium. Heating calcium propanoate gives pentan-three-one, a symmetrical ketone. And propanenitrile with ethylmagnesium bromide, after hydrolysis, also gives pentan-three-one.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Pick the method that gives a particular aldehyde or ketone.',
      n: 'Quick check. Rosenmund and Stephen give aldehydes; cadmium reagents and Grignard reagents with nitriles give ketones.',
      chk: 'prep-mcq',
    }),
    sl('concept', 'Preparation summary', {
      b: 'Every route at a glance.',
      v: flow('LR', [['a', '1° alcohol / RCOCl / RCN / RCOOR′'], ['b', 'Aldehyde'], ['c', '2° alcohol / RCOCl + R′₂Cd / RCN + R′MgX / (RCOO)₂Ca'], ['d', 'Ketone']], [['a', 'b'], ['c', 'd']], 'Flow summarising routes to aldehydes and ketones'),
      n: 'Here is the whole picture. Aldehydes come from primary alcohols, acid chlorides by the Rosenmund reaction, nitriles by the Stephen reaction or DIBAL-H, and esters by DIBAL-H. Ketones come from secondary alcohols, acid chlorides with dialkylcadmium, nitriles with Grignard reagents, and calcium salts on heating. Alkenes and alkynes can give either, depending on their structure.',
    }),
    sl('check', 'Quick check: from alkenes and alkynes', {
      b: 'Predict the carbonyl compound formed by ozonolysis or by hydration of an alkyne.',
      n: 'Quick check. Ozonolysis splits the double bond; only ethyne gives an aldehyde on hydration.',
      chk: 'ozone-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Aldehydes -al (CHO = C-1); ketones -one with locant.',
        'C=O sp², planar, polar; carbon electrophilic.',
        'B.p.: alkanes, ethers < aldehydes, ketones < alcohols; lower members water-soluble.',
        'Aldehydes from 1° alcohols, Rosenmund, Stephen, DIBAL-H, ethyne hydration, calcium salts + formate.',
        'Ketones from 2° alcohols, R′₂Cd + RCOCl, RCN + R′MgX, (RCOO)₂Ca, alkyne hydration; ozonolysis gives either.',
      ],
      v: table(['Reaction', 'Gives'], [['Rosenmund', 'Aldehyde'], ['Stephen', 'Aldehyde'], ['R′₂Cd + RCOCl', 'Ketone'], ['RCN + R′MgX', 'Ketone']], 'Summary table of named preparations'),
      n: 'Let us sum up Part 1. Aldehydes and ketones are named with the endings al and one. The flat, polar carbonyl group gives them boiling points between those of alkanes and alcohols. They can be made from alcohols, alkenes, alkynes, acid chlorides, calcium salts, nitriles and esters, and the choice of method decides whether an aldehyde or a ketone is obtained.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Explain why Pd is poisoned with BaSO₄ in the Rosenmund reaction.',
        'For calcium salts, remember calcium methanoate gives aldehydes.',
        'For Grignard + nitrile, include the hydrolysis step.',
        'Compare b.p. using dipole–dipole forces and hydrogen bonding.',
      ],
      v: table(['Slip', 'Fix'], [['Propyne hydration gives propanal', 'Gives propanone'], ['Stephen gives ketones', 'Gives aldehydes'], ['Aldehydes H-bond with each other', 'They cannot']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Explain the purpose of the barium sulphate poison in the Rosenmund reaction. Remember that calcium methanoate is needed to make aldehydes from calcium salts. Include the hydrolysis step in Grignard and Stephen reactions. And remember that carbonyl compounds cannot hydrogen-bond with each other.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Aldehydes and Ketones — Part 2: Reactions, mechanisms and tests',
  goals: [
    'Draw the mechanism of nucleophilic addition of HCN and explain why aldehydes are more reactive than ketones',
    'Write additions of NaHSO₃, Grignard reagents and ammonia derivatives',
    'Write oxidation, iodoform and reduction reactions (Clemmensen, Wolff–Kishner, red P/HI)',
    'Draw the aldol mechanism; predict aldol, cross aldol or Cannizzaro; use tests to distinguish carbonyl compounds',
  ],
  slides: [
    sl('title', 'Reactions of carbonyl compounds', {
      b: 'Part 2 — addition to C=O, oxidation and reduction, reactions of α-hydrogens, and tests.',
      v: flow('LR', [['a', 'C=O'], ['b', 'Nucleophilic addition'], ['c', 'Oxidation (aldehydes) / reduction'], ['d', 'α-H: aldol; no α-H: Cannizzaro'], ['e', 'Tests']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['d', 'e']], 'Flow of the reactions in Part 2'),
      n: 'The polar carbonyl group gives aldehydes and ketones a rich chemistry. Nucleophiles add to the carbonyl carbon. Aldehydes are easily oxidised, while both aldehydes and ketones can be reduced. Hydrogens on the neighbouring carbon are acidic, leading to aldol reactions. And these properties give simple tests to tell the compounds apart.',
    }),
    sl('diagram', 'Nucleophilic addition and reactivity', {
      b: 'A nucleophile attacks the carbonyl carbon; carbon becomes **sp³** in a tetrahedral alkoxide, which is protonated. **Reactivity: HCHO > RCHO > R₂CO**: alkyl groups (+I) reduce the δ+ on carbon and **sterically hinder** attack.',
      v: V.nucadd,
      n: 'The nucleophile attacks the partly positive carbonyl carbon, the pi electrons move onto oxygen, and a tetrahedral intermediate forms, which then picks up a proton. Methanal reacts fastest, then other aldehydes, then ketones. Alkyl groups push electrons towards the carbonyl carbon, making it less positive, and they crowd the approach of the nucleophile.',
    }),
    sl('concept', 'Mechanism: addition of HCN', {
      b: r`A trace of base generates CN⁻: $\ce{HCN + OH- -> CN- + H2O}$. (1) CN⁻ attacks the carbonyl carbon (slow), giving a tetrahedral alkoxide. (2) The alkoxide takes H⁺ from HCN (fast), regenerating CN⁻. Product: a **cyanohydrin**, which can be hydrolysed to an α-hydroxy acid.`,
      m: [r`\ce{CH3CH2CHO + HCN -> CH3CH2CH(OH)CN}`, r`\ce{CH3COCH3 + HCN -> (CH3)2C(OH)CN}`],
      v: flow('LR', [['a', 'HCN + OH⁻ → CN⁻'], ['b', 'CN⁻ attacks C=O (slow)'], ['c', 'Alkoxide ion'], ['d', '+ H⁺ from HCN → cyanohydrin']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the HCN addition mechanism'),
      n: 'Hydrogen cyanide itself is a poor nucleophile, so a little base is added to make cyanide ions. In the slow step, cyanide attacks the carbonyl carbon, giving an alkoxide ion. This ion then takes a proton from hydrogen cyanide, forming the cyanohydrin and regenerating cyanide. Propanone gives propanone cyanohydrin, an industrial intermediate for Perspex.',
    }),
    sl('concept', 'Other additions: NaHSO₃, Grignard and ammonia derivatives', {
      b: '**NaHSO₃:** crystalline bisulphite adducts (aldehydes and methyl ketones); decomposed by acid or alkali — used to purify. **Grignard:** HCHO → 1°, RCHO → 2°, R₂CO → 3° alcohols. **Ammonia derivatives** (Z–NH₂) add and then lose water (addition–elimination) to give C=N–Z.',
      m: [r`\ce{CH3CHO + NaHSO3 -> CH3CH(OH)SO3Na}`, r`\ce{CH3CHO + NH2OH -> CH3CH=NOH + H2O}`],
      v: table(['Reagent Z–NH₂', 'Product', 'Example with propanone'], [['NH₂OH (hydroxylamine)', 'Oxime', '(CH₃)₂C=NOH'], ['NH₂NH₂ (hydrazine)', 'Hydrazone', '(CH₃)₂C=NNH₂'], ['C₆H₅NHNH₂', 'Phenylhydrazone', '(CH₃)₂C=NNHC₆H₅'], ['NH₂NHCONH₂', 'Semicarbazone', '(CH₃)₂C=NNHCONH₂'], ['2,4-DNP', '2,4-Dinitrophenylhydrazone (orange)', 'Test for C=O']], 'Table of ammonia derivatives and products'),
      n: 'Sodium hydrogensulphite adds to aldehydes and methyl ketones to form crystalline solids, which can be filtered off and broken down again with acid or alkali: a good way to purify them. Grignard reagents give alcohols. Ammonia derivatives such as hydroxylamine, hydrazine, phenylhydrazine and semicarbazide add to the carbonyl group and then lose water, giving solid derivatives with sharp melting points used to identify the original compound.',
    }),
    sl('example', 'Worked example: addition products', {
      b: r`**Problem.** Give the product of butanone with (a) HCN, (b) NaHSO₃, (c) phenylhydrazine, (d) semicarbazide, (e) CH₃MgI then H₃O⁺.

**(a)** $\ce{CH3CH2C(OH)(CH3)CN}$, butanone cyanohydrin.

**(b)** $\ce{CH3CH2C(OH)(CH3)SO3Na}$.

**(c)** $\ce{CH3CH2C(CH3)=NNHC6H5}$, butanone phenylhydrazone.

**(d)** $\ce{CH3CH2C(CH3)=NNHCONH2}$, butanone semicarbazone.

**(e)** 2-Methylbutan-2-ol.`,
      v: table(['Reagent', 'Product type'], [['HCN', 'Cyanohydrin'], ['NaHSO₃', 'Bisulphite adduct'], ['C₆H₅NHNH₂', 'Phenylhydrazone'], ['Semicarbazide', 'Semicarbazone'], ['CH₃MgI; H₃O⁺', 'Tertiary alcohol']], 'Table of addition products of butanone'),
      n: 'Each reagent adds to the same carbonyl carbon. Hydrogen cyanide and sodium hydrogensulphite simply add across the carbon–oxygen double bond. Phenylhydrazine and semicarbazide add and then lose water, giving a carbon–nitrogen double bond. A Grignard reagent adds a methyl group, and hydrolysis gives a tertiary alcohol, two-methylbutan-two-ol.',
    }),
    sl('check', 'Quick check: nucleophilic addition', {
      b: 'Predict an addition product or compare reactivity towards nucleophiles.',
      n: 'Quick check. Methanal is most reactive; ammonia derivatives give compounds with a carbon–nitrogen double bond after losing water.',
      chk: 'add-mcq',
    }),
    sl('concept', 'Oxidation and the iodoform reaction', {
      b: 'Aldehydes are oxidised easily to acids (even by Tollens’ and Fehling’s reagents); ketones resist mild oxidants and are cleaved only by strong oxidants on heating. **Iodoform reaction:** compounds with **CH₃CO–** (or CH₃CH(OH)–) react with I₂/NaOH to give yellow **CHI₃** and the carboxylate with one carbon fewer.',
      m: [r`\ce{CH3COCH2CH3 + 3I2 + 4NaOH -> CHI3 + CH3CH2COONa + 3NaI + 3H2O}`],
      v: table(['Compound', 'Iodoform test'], [['Ethanal', 'Positive'], ['Methanal', 'Negative'], ['Propanone', 'Positive'], ['Butanone', 'Positive'], ['Pentan-3-one', 'Negative'], ['Propanal', 'Negative']], 'Table of iodoform test results'),
      n: 'Aldehydes have a hydrogen on the carbonyl carbon, so they are easily oxidised to carboxylic acids. Ketones resist mild oxidants. Any compound with a methyl group next to the carbonyl, a methyl ketone or ethanal, gives the iodoform reaction: the methyl group becomes yellow iodoform and the rest becomes a carboxylate. So butanone gives iodoform but pentan-three-one does not.',
    }),
    sl('concept', 'Reduction', {
      b: '**To alcohols:** NaBH₄, LiAlH₄ or H₂/Ni: aldehydes → 1°, ketones → 2°. **To alkanes (C=O → CH₂):** **Clemmensen** (Zn–Hg, conc. HCl); **Wolff–Kishner** (NH₂NH₂, then KOH in ethylene glycol, about 453–473 K); **red P + HI** (heat).',
      m: [r`\ce{CH3COCH3 + 4HI ->[red P][\Delta] CH3CH2CH3 + H2O + 2I2}`, r`\ce{(CH3)2C=NNH2 ->[KOH][ethylene glycol, \Delta] CH3CH2CH3 + N2}`],
      v: table(['Reagent', 'Butanone gives'], [['NaBH₄', 'Butan-2-ol'], ['Zn–Hg, conc. HCl (Clemmensen)', 'Butane'], ['NH₂NH₂; KOH, heat (Wolff–Kishner)', 'Butane'], ['Red P + HI', 'Butane']], 'Table of reduction products of butanone'),
      n: 'Hydride reagents and catalytic hydrogen reduce aldehydes and ketones to alcohols. To remove the oxygen completely, three methods are used: the Clemmensen reduction with zinc amalgam and hydrochloric acid, suitable for compounds stable to acid; the Wolff–Kishner reduction, which forms the hydrazone and then heats it with alkali, suitable for compounds stable to base; and red phosphorus with hydrogen iodide.',
    }),
    sl('check', 'Quick check: oxidation and reduction', {
      b: 'Predict a reduction product or an iodoform result.',
      n: 'Quick check. Clemmensen and Wolff–Kishner give alkanes; iodoform needs a methyl group next to the carbonyl.',
      chk: 'red-mcq',
    }),
    sl('concept', 'Acidity of α-hydrogens; aldol mechanism', {
      b: r`α-Hydrogens are acidic because the **enolate** formed is resonance-stabilised (charge shared with O). **Aldol** (dilute NaOH): (1) OH⁻ removes an α-H → enolate; (2) enolate attacks the C=O of a second molecule; (3) the alkoxide takes H⁺ from water → **β-hydroxy carbonyl** (aldol); on heating, loss of water → **α,β-unsaturated** carbonyl.`,
      m: [r`\ce{2CH3CHO ->[dil. NaOH] CH3CH(OH)CH2CHO}`, r`\ce{CH3CH(OH)CH2CHO ->[\Delta] CH3CH=CHCHO + H2O}`],
      v: flow('LR', [['a', 'OH⁻ removes α-H'], ['b', 'Enolate (resonance)'], ['c', 'Attacks C=O of 2nd molecule'], ['d', 'Protonation → aldol'], ['e', 'Heat: −H₂O → enal']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the aldol mechanism'),
      n: 'A hydrogen on the carbon next to the carbonyl group can be removed by a base, because the resulting enolate ion spreads its negative charge onto oxygen. In the aldol reaction, hydroxide removes such a hydrogen from ethanal; the enolate attacks the carbonyl carbon of a second ethanal molecule; and protonation gives three-hydroxybutanal, the aldol. Heating removes water to give but-two-enal.',
    }),
    sl('concept', 'Cross aldol and Cannizzaro reactions', {
      b: '**Cross aldol:** two different carbonyl compounds; if both have α-H, four products form. Useful when one partner has **no α-H** (HCHO, C₆H₅CHO). **Cannizzaro:** aldehydes with **no α-H** + **concentrated** NaOH → alcohol + carboxylate salt (disproportionation, via hydride transfer). **Crossed Cannizzaro** with HCHO: HCHO is oxidised to methanoate, the other aldehyde reduced.',
      m: [r`\ce{HCHO + CH3CHO ->[dil. NaOH] HOCH2CH2CHO}`, r`\ce{2HCHO + NaOH -> HCOONa + CH3OH}`, r`\ce{C6H5CHO + HCHO + NaOH -> C6H5CH2OH + HCOONa}`],
      v: table(['Aldehyde(s)', 'Alkali', 'Reaction'], [['CH₃CHO', 'Dilute', 'Aldol'], ['HCHO', 'Concentrated', 'Cannizzaro'], ['HCHO + CH₃CHO', 'Dilute', 'Cross aldol (3-hydroxypropanal)'], ['C₆H₅CHO + HCHO', 'Concentrated', 'Crossed Cannizzaro']], 'Table of aldol and Cannizzaro conditions'),
      n: 'When two different carbonyl compounds both have alpha hydrogens, a cross aldol gives a mixture of four products, so it is most useful when one partner, such as methanal, has none. An aldehyde with no alpha hydrogen cannot form an enolate; with concentrated alkali, one molecule transfers a hydride to another, giving an alcohol and a carboxylate salt: the Cannizzaro reaction. With methanal present, methanal is always the one oxidised.',
    }),
    sl('example', 'Worked example: aldol or Cannizzaro?', {
      b: r`**Problem.** Give the products: (a) propanal + dilute NaOH, then heat; (b) 2,2-dimethylpropanal + conc. NaOH; (c) methanal + ethanal (dilute NaOH); (d) 4-methylbenzaldehyde + methanal + conc. NaOH.

**(a)** Aldol: 3-hydroxy-2-methylpentanal → 2-methylpent-2-enal.

**(b)** No α-H: Cannizzaro → 2,2-dimethylpropan-1-ol + sodium 2,2-dimethylpropanoate.

**(c)** Cross aldol: 3-hydroxypropanal.

**(d)** Crossed Cannizzaro: (4-methylphenyl)methanol + sodium methanoate.`,
      v: table(['Case', 'α-H?', 'Reaction'], [['(a) Propanal', 'Yes', 'Aldol'], ['(b) (CH₃)₃CCHO', 'No', 'Cannizzaro'], ['(c) HCHO + CH₃CHO', 'One partner', 'Cross aldol'], ['(d) ArCHO + HCHO', 'No', 'Crossed Cannizzaro']], 'Table classifying four cases'),
      n: 'Look for alpha hydrogens and check the alkali concentration. Propanal has them, so dilute alkali gives the aldol, which dehydrates on heating. Two-two-dimethylpropanal has a quaternary carbon next to the aldehyde group and no alpha hydrogens, so it undergoes the Cannizzaro reaction. Methanal and ethanal give a cross aldol. With methanal and an aromatic aldehyde in concentrated alkali, methanal is oxidised and the aromatic aldehyde reduced.',
    }),
    sl('check', 'Quick check: aldol or Cannizzaro', {
      b: 'Decide which base-catalysed reaction occurs.',
      n: 'Quick check. Alpha hydrogens and dilute alkali: aldol. No alpha hydrogens and concentrated alkali: Cannizzaro.',
      chk: 'aldol-mcq',
    }),
    sl('concept', 'Tests and uses', {
      b: '**Aldehyde vs ketone:** Tollens’ reagent → silver mirror (aldehydes); Fehling’s / Benedict’s → red-brown Cu₂O (aliphatic aldehydes); Schiff’s reagent → pink (aldehydes). **Methanal vs ethanal:** iodoform (ethanal only). **Methyl ketone vs other ketone:** iodoform. **Uses:** methanal (formalin, Bakelite, urotropine), ethanal (ethanoic acid, ethyl ethanoate), propanone (solvent, nail-polish remover), butanone (solvent).',
      m: [r`\ce{CH3CHO + 2[Ag(NH3)2]+ + 3OH- -> CH3COO- + 2Ag + 2H2O + 4NH3}`, r`\ce{6HCHO + 4NH3 -> (CH2)6N4 + 6H2O}`],
      v: table(['Test', 'Methanal', 'Ethanal', 'Propanone'], [['Tollens’', 'Silver mirror', 'Silver mirror', 'No change'], ['Fehling’s', 'Red-brown ppt', 'Red-brown ppt', 'No change'], ['Iodoform', 'No', 'Yellow ppt', 'Yellow ppt']], 'Table of tests for methanal, ethanal and propanone'),
      n: 'Tollens’ reagent, ammoniacal silver nitrate, is reduced by aldehydes to a silver mirror; Fehling’s solution gives a red-brown precipitate of copper one oxide with aliphatic aldehydes. Ketones give neither. Methanal and ethanal both reduce these reagents, but only ethanal gives iodoform. Methanal is used as formalin and to make resins and urotropine; propanone is a common solvent.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Nucleophilic addition: HCHO > RCHO > R₂CO (+I, steric). HCN via CN⁻ (base catalyst) → cyanohydrin.',
        'NaHSO₃ adducts; Grignard → alcohols; Z–NH₂ → oxime, hydrazone, phenylhydrazone, semicarbazone.',
        'Aldehydes oxidised easily; iodoform for CH₃CO–; reduction to alcohols (NaBH₄) or alkanes (Clemmensen, Wolff–Kishner, red P/HI).',
        'α-H acidic (enolate); aldol (dilute alkali) → β-hydroxy carbonyl → enal; cross aldol.',
        'No α-H + conc. alkali: Cannizzaro; crossed Cannizzaro with HCHO.',
        'Tests: Tollens’, Fehling’s, iodoform; uses of methanal, ethanal, propanone.',
      ],
      v: table(['Reaction', 'Condition'], [['Aldol', 'α-H, dilute OH⁻'], ['Cannizzaro', 'No α-H, conc. OH⁻'], ['Clemmensen', 'Zn–Hg/HCl'], ['Wolff–Kishner', 'NH₂NH₂/KOH']], 'Summary table of key reactions'),
      n: 'Let us sum up Part 2. Nucleophiles add to the carbonyl group, aldehydes more readily than ketones. Aldehydes are easily oxidised, which gives the Tollens’ and Fehling’s tests, while methyl ketones give iodoform. Carbonyl groups are reduced to alcohols or right down to CH two groups. Alpha hydrogens make the aldol reaction possible, and aldehydes without them undergo the Cannizzaro reaction.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Show CN⁻ formation and both steps in the HCN mechanism.',
        'State dilute or concentrated alkali when predicting aldol or Cannizzaro.',
        'For reduction to alkane, name the method and its condition (acid or base).',
        'For tests, give observations for both compounds.',
      ],
      v: table(['Slip', 'Fix'], [['Benzaldehyde gives aldol with itself', 'No α-H: Cannizzaro'], ['Ketones give silver mirror', 'Only aldehydes'], ['Methanal gives iodoform', 'It does not']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. In the hydrogen cyanide mechanism, show how cyanide ions are formed and both steps. Say whether the alkali is dilute or concentrated before choosing between aldol and Cannizzaro. Name the reduction method with its conditions. And in distinguishing tests, describe what happens with each compound.',
    }),
  ],
});

// ch08 Aldehydes, Ketones and Carboxylic Acids — two decks: Part 1 (t01–t03) carbonyl compounds: naming, structure,
// preparation, reactions; Part 2 (t04–t05) carboxylic acids: preparation, acidity, reactions and uses.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CARBONYL, NUCADD, CARBOXYLATE } from './svgs.mjs';

export const V = {
  carbonyl: svgV(CARBONYL, 'A planar carbonyl group with about 120 degree bond angles, a partial positive charge on carbon, a partial negative charge on oxygen and a nucleophile attacking the carbon'),
  nucadd: svgV(NUCADD, 'Two-step nucleophilic addition: the nucleophile attacks the carbonyl carbon to give a tetrahedral alkoxide intermediate, which takes a proton to give the product'),
  carboxylate: svgV(CARBOXYLATE, 'Two equivalent resonance structures of the carboxylate ion with the negative charge on either oxygen atom'),
};

export const deck1 = deck({
  part: 1,
  title: 'Aldehydes, Ketones and Carboxylic Acids — Part 1: Aldehydes and ketones',
  goals: [
    'Name aldehydes and ketones and explain the structure and polarity of the carbonyl group',
    'Write methods of preparing aldehydes and ketones, including Rosenmund, Stephen, Etard and Friedel–Crafts reactions',
    'Explain nucleophilic addition and the relative reactivity of aldehydes and ketones',
    'Write reduction, oxidation (Tollens’ and Fehling’s tests), aldol, Cannizzaro and haloform reactions',
  ],
  slides: [
    sl('title', 'Aldehydes, Ketones and Carboxylic Acids', {
      b: 'Part 1 — compounds with the carbonyl group C=O: naming, making and their reactions.',
      v: table(['Compound', 'Where you meet it'], [['Methanal (formalin)', 'Preserving biological specimens'], ['Propanone (acetone)', 'Nail-polish remover, solvent'], ['Benzaldehyde', 'Bitter-almond flavour'], ['Cinnamaldehyde', 'Smell of cinnamon (dalchini)'], ['Ethanoic acid', 'Vinegar']], 'Table of familiar carbonyl compounds and carboxylic acids and where they are met'),
      n: 'Namaste! The smell of cinnamon, the flavour of almonds, the sharp taste of vinegar and the solvent in nail-polish remover all come from compounds containing the carbonyl group, a carbon atom double bonded to oxygen. In aldehydes the carbonyl carbon carries at least one hydrogen; in ketones it is joined to two carbon groups. In this part we name them, make them and study their many reactions.',
    }),
    sl('concept', 'Naming aldehydes and ketones', {
      b: 'Aldehydes: replace **-e** of the alkane by **-al** (the CHO carbon is C1). Ketones: replace **-e** by **-one**, with a locant. Aromatic examples have common names that are still used.',
      v: table(['Structure', 'Common name', 'IUPAC name'], [[r`$\ce{HCHO}$`, 'Formaldehyde', 'Methanal'], [r`$\ce{CH3CHO}$`, 'Acetaldehyde', 'Ethanal'], [r`$\ce{CH3CH(CH3)CHO}$`, 'Isobutyraldehyde', '2-Methylpropanal'], [r`$\ce{CH3COCH3}$`, 'Acetone', 'Propan-2-one (propanone)'], [r`$\ce{CH3COCH2CH3}$`, 'Ethyl methyl ketone', 'Butan-2-one'], [r`$\ce{C6H5CHO}$`, 'Benzaldehyde', 'Benzenecarbaldehyde'], [r`$\ce{C6H5COCH3}$`, 'Acetophenone', '1-Phenylethan-1-one']], 'Table of common and IUPAC names of aldehydes and ketones'),
      n: 'For aldehydes, the carbonyl carbon is always carbon one, so no number is needed: methanal, ethanal, two-methylpropanal. For ketones, the carbonyl carbon is inside the chain, so we give its position: butan-two-one. Some common names are still widely used, such as acetone for propanone, benzaldehyde, and acetophenone, which is one-phenylethan-one-one.',
    }),
    sl('diagram', 'Structure of the carbonyl group', {
      b: 'The carbonyl carbon is **sp²** hybridised: three σ bonds in a plane at about 120°, plus a π bond to oxygen. Oxygen is more electronegative, so the C=O bond is **polar**: carbon is an **electrophile**, oxygen a **nucleophile/Lewis base**.',
      v: V.carbonyl,
      n: 'The carbonyl carbon is sp two hybridised, so it and the three atoms bonded to it lie in a flat plane, with angles of about one hundred and twenty degrees. The double bond is strongly polar: oxygen pulls the electrons, leaving carbon slightly positive. That positive carbon is attacked by nucleophiles, and because the group is flat, attack can come from above or below the plane.',
    }),
    sl('concept', 'Preparing aldehydes and ketones', {
      b: '**Oxidation** of 1° alcohols (PCC, or Cu at 573 K) gives aldehydes; of 2° alcohols, ketones. **Ozonolysis** of alkenes. **Hydration of alkynes** (Hg²⁺/H₂SO₄): ethyne → ethanal; others → ketones. **Rosenmund reduction** of acid chlorides. **Stephen reaction** of nitriles (SnCl₂/HCl, then water). **DIBAL-H** reduces nitriles and esters to aldehydes.',
      m: [r`\ce{C6H5COCl + H2 ->[Pd/BaSO4] C6H5CHO + HCl}`],
      v: table(['Starting compound', 'Reagent', 'Product'], [['Primary alcohol', 'PCC', 'Aldehyde'], ['Secondary alcohol', 'K₂Cr₂O₇/H⁺', 'Ketone'], ['Acid chloride', 'H₂, Pd/BaSO₄ (Rosenmund)', 'Aldehyde'], ['Nitrile', 'SnCl₂ + HCl, then H₃O⁺ (Stephen)', 'Aldehyde'], ['Ethyne', 'H₂O, Hg²⁺, H₂SO₄', 'Ethanal'], ['Alkene', 'O₃, then Zn/H₂O', 'Aldehydes or ketones']], 'Table of preparation methods for aldehydes and ketones with reagents and products'),
      n: 'Aldehydes and ketones can be made in many ways. Gentle oxidation of a primary alcohol with pyridinium chlorochromate stops at the aldehyde; secondary alcohols give ketones. Acid chlorides are reduced to aldehydes by hydrogen over palladium poisoned with barium sulfate, so the reduction stops at the aldehyde: the Rosenmund reduction. Nitriles are reduced to aldehydes by tin two chloride and acid in the Stephen reaction.',
    }),
    sl('concept', 'Aromatic aldehydes and ketones', {
      b: '**Etard reaction:** toluene + chromyl chloride (CrO₂Cl₂) → benzaldehyde. Toluene can also be oxidised with CrO₃ in acetic anhydride, or side-chain chlorinated to benzal chloride and hydrolysed. **Gatterman–Koch:** benzene + CO + HCl (AlCl₃/CuCl) → benzaldehyde. **Friedel–Crafts acylation** gives aryl ketones.',
      m: [r`\ce{C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl}`],
      v: flow('LR', [['a', 'Toluene'], ['b', 'Benzaldehyde'], ['c', 'Benzene'], ['d', 'Acetophenone']], [['a', 'b', 'CrO₂Cl₂ (Etard)'], ['c', 'b', 'CO, HCl, AlCl₃ (Gatterman–Koch)'], ['c', 'd', 'CH₃COCl, AlCl₃']], 'Flow of routes to benzaldehyde from toluene and benzene, and to acetophenone by Friedel–Crafts acylation'),
      n: 'For aromatic carbonyl compounds there are special methods. In the Etard reaction, chromyl chloride oxidises the methyl group of toluene only as far as the aldehyde, giving benzaldehyde. Benzene itself can be converted to benzaldehyde with carbon monoxide and hydrogen chloride, the Gatterman–Koch reaction. And Friedel–Crafts acylation with an acid chloride and aluminium chloride gives aromatic ketones such as acetophenone.',
    }),
    sl('example', 'Worked example: choosing a preparation', {
      b: r`**Problem.** Suggest a method for each: (a) benzoyl chloride → benzaldehyde; (b) ethanenitrile → ethanal; (c) benzene → acetophenone; (d) toluene → benzaldehyde.

**(a)** $\ce{H2}$, Pd/BaSO₄ (Rosenmund).

**(b)** SnCl₂/HCl, then water (Stephen), or DIBAL-H then water.

**(c)** $\ce{CH3COCl}$, anhydrous $\ce{AlCl3}$ (Friedel–Crafts acylation).

**(d)** $\ce{CrO2Cl2}$, then $\ce{H3O+}$ (Etard).`,
      v: table(['Conversion', 'Named reaction'], [['Acid chloride → aldehyde', 'Rosenmund'], ['Nitrile → aldehyde', 'Stephen'], ['Arene → aryl ketone', 'Friedel–Crafts acylation'], ['Toluene → benzaldehyde', 'Etard']], 'Table matching four conversions with their named reactions'),
      n: 'Match the named reaction to the starting material. An acid chloride is gently reduced by the Rosenmund method. A nitrile becomes an aldehyde by the Stephen reaction. Benzene is acylated by Friedel–Crafts to give a ketone. Toluene’s methyl group is oxidised to an aldehyde group by chromyl chloride in the Etard reaction.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Pick the named reaction that converts a given starting material into an aldehyde.',
      n: 'Quick check. Look at the functional group you start with: acid chloride, nitrile or methylbenzene.',
      chk: 'rosenmund-mcq',
    }),
    sl('diagram', 'Nucleophilic addition', {
      b: 'The typical reaction: a nucleophile adds to the carbonyl carbon, the carbon becomes **sp³** in a tetrahedral alkoxide, which is then protonated. **Aldehydes are more reactive than ketones**: less steric hindrance and less electron release (+I) to the carbonyl carbon.',
      v: V.nucadd,
      n: 'Most reactions of aldehydes and ketones begin the same way. A nucleophile attacks the partly positive carbonyl carbon, the pi electrons move onto oxygen, and a tetrahedral intermediate forms. Then the negative oxygen picks up a proton. Aldehydes react faster than ketones because the small hydrogen leaves more room for attack, and a ketone’s two alkyl groups push electrons towards the carbon, making it less positive.',
    }),
    sl('concept', 'Nucleophilic addition reactions', {
      b: 'Important additions to the C=O group.',
      m: [r`\ce{CH3CHO + HCN -> CH3CH(OH)CN}`, r`\ce{CH3COCH3 + NaHSO3 -> (CH3)2C(OH)SO3Na}`],
      v: table(['Reagent', 'Product', 'Note'], [['HCN (base catalyst)', 'Cyanohydrin', 'Adds one carbon'], ['NaHSO₃', 'Crystalline bisulfite adduct', 'Separates and purifies aldehydes'], ['RMgX, then H₃O⁺', 'Alcohol', '2° from aldehydes, 3° from ketones'], ['Alcohol, dry HCl', 'Hemiacetal → acetal (ketal from ketones with diols)', 'Protects C=O'], ['NH₂OH', 'Oxime', 'Addition then loss of water'], ['NH₂NH₂ / 2,4-DNP', 'Hydrazone / 2,4-DNP derivative (orange)', 'Test for C=O']], 'Table of nucleophilic addition and addition–elimination reactions of carbonyl compounds'),
      n: 'Here are the important additions. Hydrogen cyanide gives a cyanohydrin, adding a carbon atom to the chain. Sodium hydrogensulfite gives crystalline adducts used to purify aldehydes. Grignard reagents give alcohols. Alcohols with dry hydrogen chloride give acetals, which protect the carbonyl group. Ammonia derivatives such as hydroxylamine, hydrazine and two four dinitrophenylhydrazine add and then lose water, forming solids with sharp melting points.',
    }),
    sl('concept', 'Reduction', {
      b: 'Aldehydes → 1° alcohols, ketones → 2° alcohols (NaBH₄, LiAlH₄, H₂/catalyst). **Clemmensen** (Zn–Hg + conc. HCl) and **Wolff–Kishner** (NH₂NH₂, then KOH in ethylene glycol, heat) reduce C=O fully to **CH₂**.',
      v: table(['Reagent', 'Propanone gives', 'Benzaldehyde gives'], [['NaBH₄ or LiAlH₄', 'Propan-2-ol', 'Phenylmethanol'], ['Zn–Hg, conc. HCl (Clemmensen)', 'Propane', 'Toluene'], ['NH₂NH₂; KOH, heat (Wolff–Kishner)', 'Propane', 'Toluene']], 'Table of reduction products of propanone and benzaldehyde with three reagents'),
      n: 'Reduction can stop at the alcohol or go all the way to a hydrocarbon. Sodium borohydride or lithium aluminium hydride gives alcohols: primary from aldehydes, secondary from ketones. The Clemmensen reduction, with zinc amalgam and hydrochloric acid, and the Wolff–Kishner reduction, with hydrazine and hot alkali, replace the carbonyl oxygen by two hydrogens, giving a CH two group.',
    }),
    sl('concept', 'Oxidation: telling aldehydes from ketones', {
      b: 'Aldehydes are oxidised even by **mild oxidants**; ketones are not (except under vigorous conditions, with C–C cleavage). **Tollens’ reagent** (ammoniacal silver nitrate) gives a **silver mirror**; **Fehling’s solution** gives a **red-brown precipitate of Cu₂O** (aliphatic aldehydes only).',
      m: [r`\ce{RCHO + 2[Ag(NH3)2]+ + 3OH- -> RCOO- + 2Ag + 2H2O + 4NH3}`, r`\ce{RCHO + 2Cu^2+ + 5OH- -> RCOO- + Cu2O + 3H2O}`],
      v: table(['Test', 'Ethanal', 'Benzaldehyde', 'Propanone'], [['Tollens’ reagent', 'Silver mirror', 'Silver mirror', 'No change'], ['Fehling’s solution', 'Red-brown ppt', 'No change', 'No change']], 'Table of results of Tollens’ and Fehling’s tests for ethanal, benzaldehyde and propanone'),
      n: 'The hydrogen on an aldehyde’s carbonyl carbon makes it easy to oxidise, so mild reagents can tell aldehydes from ketones. Tollens’ reagent, a solution of silver ions in ammonia, is reduced to metallic silver, which coats the tube as a bright mirror. Fehling’s solution, containing copper two ions, gives a red-brown precipitate of copper one oxide with aliphatic aldehydes. Ketones give neither result.',
    }),
    sl('check', 'Quick check: aldehyde or ketone?', {
      b: 'Use a mild oxidising agent to tell an aldehyde from a ketone.',
      n: 'Quick check. Which of the two has a hydrogen on the carbonyl carbon that is easily oxidised?',
      chk: 'tollens-mcq',
    }),
    sl('example', 'Worked example: identifying a carbonyl compound', {
      b: r`**Problem.** Compound A ($\ce{C3H6O}$) gives an orange precipitate with 2,4-DNP, no silver mirror with Tollens’ reagent, and a yellow precipitate with iodine and NaOH. Identify A.

**Step 1.** 2,4-DNP positive → a carbonyl compound.

**Step 2.** Tollens’ negative → a ketone, not an aldehyde.

**Step 3.** Iodoform positive → contains $\ce{CH3CO-}$. So A is **propanone**, $\ce{CH3COCH3}$.`,
      v: flow('LR', [['a', '2,4-DNP: orange ppt → C=O'], ['b', 'Tollens’: negative → ketone'], ['c', 'Iodoform: yellow ppt → CH₃CO–'], ['d', 'Propanone']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of deductions from the 2,4-DNP, Tollens’ and iodoform tests to propanone'),
      n: 'Combine the test results step by step. An orange precipitate with two four DNP shows a carbonyl group. No silver mirror rules out an aldehyde, so it is a ketone. A yellow precipitate of iodoform shows a methyl group next to the carbonyl. The only ketone with three carbons is propanone, which fits all three results.',
    }),
    sl('concept', 'Reactions involving α-hydrogen: aldol and haloform', {
      b: 'Hydrogens on the carbon next to C=O (**α-hydrogens**) are acidic. With **dilute alkali**, aldehydes or ketones with α-H undergo **aldol condensation**: an aldol forms, which loses water on heating to give an α,β-unsaturated carbonyl compound. Methyl ketones give the **haloform reaction** (yellow iodoform with I₂/NaOH).',
      m: [r`\ce{2CH3CHO ->[dil. NaOH] CH3CH(OH)CH2CHO}`, r`\ce{CH3COCH3 + 3I2 + 4NaOH -> CHI3 + CH3COONa + 3NaI + 3H2O}`],
      v: table(['Compound', 'α-H?', 'Aldol?', 'Iodoform?'], [['Ethanal', 'Yes', 'Yes', 'Yes (CH₃CHO)'], ['Propanone', 'Yes', 'Yes', 'Yes'], ['Methanal', 'No', 'No', 'No'], ['Benzaldehyde', 'No', 'No', 'No']], 'Table showing which compounds have alpha hydrogens and give aldol and iodoform reactions'),
      n: 'Hydrogens on the carbon next to the carbonyl group are slightly acidic, because the ion formed when one is removed is stabilised by resonance. With dilute sodium hydroxide, two molecules of ethanal join to give an aldol, three-hydroxybutanal, which loses water on warming to give but-two-enal. Methyl ketones and ethanal react with iodine and alkali to give yellow iodoform, a useful test.',
    }),
    sl('concept', 'The Cannizzaro reaction', {
      b: 'Aldehydes **without α-hydrogen** (methanal, benzaldehyde) disproportionate with **concentrated alkali**: one molecule is oxidised to the carboxylate, the other reduced to the alcohol.',
      m: [r`\ce{2HCHO + NaOH -> HCOONa + CH3OH}`],
      v: table(['Aldehyde', 'Conc. NaOH gives'], [['Methanal', 'Sodium methanoate + methanol'], ['Benzaldehyde', 'Sodium benzoate + phenylmethanol'], ['Ethanal (has α-H)', 'Aldol reaction instead']], 'Table of Cannizzaro products of methanal and benzaldehyde, and ethanal undergoing aldol instead'),
      n: 'If an aldehyde has no alpha hydrogen, it cannot undergo aldol condensation. Instead, with concentrated alkali, two molecules exchange a hydride: one is oxidised to a carboxylate salt and the other reduced to an alcohol. Methanal gives sodium methanoate and methanol; benzaldehyde gives sodium benzoate and phenylmethanol. This is the Cannizzaro reaction.',
    }),
    sl('check', 'Quick check: aldol or Cannizzaro?', {
      b: 'Decide which reaction an aldehyde undergoes with alkali.',
      n: 'Quick check. Look for hydrogens on the carbon next to the carbonyl group, and note whether the alkali is dilute or concentrated.',
      chk: 'cannizzaro-mcq',
    }),
    sl('example', 'Worked example: predicting products', {
      b: r`**Problem.** Give the products: (a) benzaldehyde + conc. NaOH; (b) propanal + dil. NaOH; (c) butan-2-one + I₂/NaOH; (d) acetophenone + Zn–Hg/HCl.

**(a)** Sodium benzoate + phenylmethanol (Cannizzaro).

**(b)** 3-Hydroxy-2-methylpentanal (aldol), which on heating gives 2-methylpent-2-enal.

**(c)** Iodoform $\ce{CHI3}$ + sodium propanoate.

**(d)** Ethylbenzene (Clemmensen).`,
      v: table(['Reaction', 'Type'], [['(a)', 'Cannizzaro'], ['(b)', 'Aldol condensation'], ['(c)', 'Haloform'], ['(d)', 'Clemmensen reduction']], 'Table naming the reaction type in each of the four examples'),
      n: 'Identify the reaction from the reagent and the structure. Benzaldehyde has no alpha hydrogen and the alkali is concentrated, so Cannizzaro. Propanal has alpha hydrogens and the alkali is dilute, so aldol. Butan-two-one is a methyl ketone, so iodine and alkali give iodoform. Zinc amalgam and hydrochloric acid remove the carbonyl oxygen completely, turning acetophenone into ethylbenzene.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Names: -al (aldehydes), -one (ketones). C=O is planar (sp²) and polar; C is electrophilic.',
        'Preparation: oxidation of alcohols, ozonolysis, alkyne hydration, Rosenmund, Stephen, Etard, Gatterman–Koch, Friedel–Crafts acylation.',
        'Nucleophilic addition: HCN, NaHSO₃, RMgX, alcohols, NH₂–Z derivatives; aldehydes more reactive than ketones.',
        'Reduction: NaBH₄/LiAlH₄ → alcohols; Clemmensen, Wolff–Kishner → CH₂.',
        'Tests: Tollens’ (silver mirror), Fehling’s (red Cu₂O, aliphatic aldehydes), iodoform (CH₃CO–).',
        'α-H: aldol with dilute alkali; no α-H: Cannizzaro with concentrated alkali.',
      ],
      v: table(['Reagent', 'Positive for'], [['Tollens’ reagent', 'All aldehydes'], ['Fehling’s solution', 'Aliphatic aldehydes'], ['I₂ + NaOH', 'CH₃CO– (and CH₃CH(OH)–)'], ['2,4-DNP', 'Aldehydes and ketones']], 'Summary table of tests and what they detect'),
      n: 'Let us sum up Part 1. Aldehydes end in al and ketones in one. The carbonyl group is flat and polar, so it undergoes nucleophilic addition, faster for aldehydes. We have many named methods to make these compounds and to reduce them. Tollens’ and Fehling’s tests pick out aldehydes, iodoform picks out methyl ketones, and compounds with alpha hydrogens give aldols while those without give the Cannizzaro reaction.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Rosenmund needs poisoned Pd (BaSO₄) so the aldehyde is not reduced further.',
        'Benzaldehyde gives Tollens’ test but not Fehling’s test.',
        'Aldol needs α-H and dilute alkali; Cannizzaro needs no α-H and concentrated alkali.',
        'Explain reactivity with both steric and electronic (+I) effects.',
        'For Clemmensen and Wolff–Kishner, the product has CH₂ in place of C=O.',
      ],
      v: table(['Slip', 'Fix'], [['Methanal gives aldol', 'No α-H: Cannizzaro'], ['Propanone gives silver mirror', 'Ketones do not'], ['NaBH₄ gives alkane', 'NaBH₄ gives alcohol']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. In the Rosenmund reduction, the barium sulfate poisons the catalyst so that the aldehyde survives. Benzaldehyde reduces Tollens’ reagent but not Fehling’s solution. Check for alpha hydrogens before choosing between aldol and Cannizzaro. When comparing reactivity, mention both crowding and electron release. And remember that Clemmensen and Wolff–Kishner give hydrocarbons.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Aldehydes, Ketones and Carboxylic Acids — Part 2: Carboxylic acids',
  goals: [
    'Write methods of preparing carboxylic acids from alcohols, aldehydes, nitriles, Grignard reagents and alkylbenzenes',
    'Explain the physical properties and acidity of carboxylic acids and the effect of substituents',
    'Write reactions of carboxylic acids, including formation of acid derivatives, reduction, decarboxylation and the HVZ reaction',
    'State uses of methanoic, ethanoic and benzoic acids and their esters',
  ],
  slides: [
    sl('title', 'Carboxylic acids', {
      b: 'Part 2 — the –COOH group: preparation, acidity, reactions and uses.',
      v: table(['Acid', 'Common name', 'Source or use'], [['Methanoic acid', 'Formic acid', 'Ant stings; leather tanning'], ['Ethanoic acid', 'Acetic acid', 'Vinegar (about 5%)'], ['Butanoic acid', 'Butyric acid', 'Rancid butter smell'], ['Benzoic acid', '—', 'Sodium benzoate food preservative'], ['Hexanedioic acid', 'Adipic acid', 'Making nylon-6,6']], 'Table of common carboxylic acids with their common names and sources or uses'),
      n: 'Carboxylic acids contain the carboxyl group, a carbonyl group joined to a hydroxyl group. The sting of an ant, the sourness of vinegar, the smell of rancid butter and the preservative in many packaged foods all come from these acids. In this part we see how they are made, why they are acidic, how substituents change their strength, and how they are turned into esters, amides and other derivatives.',
    }),
    sl('concept', 'Naming and preparing carboxylic acids', {
      b: 'IUPAC: replace **-e** by **-oic acid** (the COOH carbon is C1): ethanoic acid, 3-methylbutanoic acid, benzoic acid. **Preparation:** oxidation of 1° alcohols and aldehydes (KMnO₄, K₂Cr₂O₇); oxidation of **alkylbenzenes** (any side chain → –COOH); hydrolysis of **nitriles** and amides; **Grignard reagent + CO₂**, then acid; hydrolysis of esters, anhydrides and acid chlorides.',
      m: [r`\ce{CH3CN + 2H2O + HCl -> CH3COOH + NH4Cl}`, r`\ce{CH3MgBr + CO2 -> CH3COOMgBr}`],
      v: table(['From', 'Reagent', 'Example product'], [['Primary alcohol', 'Alkaline KMnO₄, then H⁺', 'Propanoic acid from propan-1-ol'], ['Alkylbenzene', 'KMnO₄, KOH, heat; then H⁺', 'Benzoic acid from ethylbenzene'], ['Nitrile', 'H₃O⁺, heat', 'Ethanoic acid from ethanenitrile'], ['Grignard reagent', 'Dry ice (CO₂), then H₃O⁺', 'Ethanoic acid from CH₃MgBr']], 'Table of preparation methods for carboxylic acids with reagents and example products'),
      n: 'Carboxylic acids are named by changing the e of the alkane to oic acid. They are made by strong oxidation of primary alcohols or aldehydes, and of alkylbenzenes, where the whole side chain, however long, is cut back to a single carboxyl group on the ring. Nitriles are hydrolysed to acids. Grignard reagents add to carbon dioxide, so they make acids with one more carbon than the alkyl halide.',
    }),
    sl('example', 'Worked example: preparations with chain length', {
      b: r`**Problem.** Prepare (a) propanoic acid from bromoethane in two ways; (b) benzoic acid from propylbenzene.

**(a)** Route 1: KCN gives propanenitrile ($\ce{CH3CH2CN}$), then acid hydrolysis → propanoic acid. Route 2: Mg in dry ether gives $\ce{CH3CH2MgBr}$, then $\ce{CO2}$ and $\ce{H3O+}$ → propanoic acid.

**(b)** Hot alkaline KMnO₄, then acid: the whole propyl chain is oxidised to –COOH.`,
      v: flow('LR', [['a', 'Bromoethane (C₂)'], ['b', 'Propanenitrile (C₃)'], ['c', 'Ethylmagnesium bromide'], ['d', 'Propanoic acid (C₃)']], [['a', 'b', 'KCN'], ['b', 'd', 'H₃O⁺'], ['a', 'c', 'Mg, ether'], ['c', 'd', 'CO₂, H₃O⁺']], 'Flow of two routes from bromoethane to propanoic acid, via the nitrile or via the Grignard reagent'),
      n: 'Both the nitrile route and the Grignard route add one carbon atom to the chain, so bromoethane, with two carbons, gives propanoic acid, with three. For aromatic acids, potassium permanganate is a blunt instrument: whatever alkyl group is on the ring, it is cut back to a carboxyl group, so propylbenzene and toluene both give benzoic acid.',
    }),
    sl('concept', 'Physical properties', {
      b: 'Carboxylic acids have **higher boiling points** than alcohols of similar mass, because they form **hydrogen-bonded dimers** (even in the vapour). Lower acids (C1–C4) are miscible with water; solubility falls as the chain grows.',
      v: table(['Compound', 'Molar mass', 'Boiling point / K'], [['Propan-1-ol', '60', '370'], ['Ethanoic acid', '60', '391'], ['Propanal', '58', '322']], 'Table comparing the boiling points of propan-1-ol, ethanoic acid and propanal of similar molar mass'),
      n: 'Ethanoic acid boils higher than propan-one-ol, although they have the same molar mass. Carboxylic acid molecules pair up through two hydrogen bonds each, forming dimers that behave like much larger molecules. Small acids mix with water because they hydrogen-bond with it, but as the hydrocarbon chain grows they become less soluble.',
    }),
    sl('concept', 'Acidity of carboxylic acids', {
      b: r`Carboxylic acids are stronger than alcohols and phenols: the **carboxylate ion** is stabilised by two **equivalent** resonance structures, with the charge on two oxygen atoms. They react with $\ce{NaHCO3}$, releasing $\ce{CO2}$ (a test that distinguishes them from phenols).`,
      m: [r`\ce{CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2}`],
      v: V.carboxylate,
      n: 'Carboxylic acids are the strongest common organic acids. When the proton leaves, the negative charge on the carboxylate ion is shared equally by two oxygen atoms, through two identical resonance structures. In phenoxide the charge spreads onto less electronegative carbon atoms, which is less effective. That is why carboxylic acids, but not phenols, fizz with sodium hydrogencarbonate.',
    }),
    sl('concept', 'Effect of substituents on acidity', {
      b: '**Electron-withdrawing groups** (–Cl, –F, –NO₂, –CN) stabilise the carboxylate and **increase** acidity; the effect is larger with more such groups and when they are **closer** to –COOH. **Electron-releasing groups** (alkyl) **decrease** acidity.',
      v: table(['Acid', 'pKa'], [['CF₃COOH', '0.23'], ['CCl₃COOH', '0.65'], ['CHCl₂COOH', '1.26'], ['FCH₂COOH', '2.66'], ['ClCH₂COOH', '2.86'], ['HCOOH', '3.75'], ['C₆H₅COOH', '4.19'], ['CH₃COOH', '4.76'], ['CH₃CH₂COOH', '4.88']], 'Table of pKa values of substituted ethanoic acids, methanoic, benzoic, ethanoic and propanoic acids'),
      n: 'Substituents tune acid strength. Look at the table. Each chlorine on ethanoic acid pulls electron density away and stabilises the ion, so acidity rises steadily from mono to trichloroethanoic acid. Fluorine, more electronegative, has a bigger effect than chlorine. Alkyl groups push electrons the other way, so propanoic acid is slightly weaker than ethanoic acid, and methanoic acid, with no alkyl group, is stronger.',
    }),
    sl('example', 'Worked example: ranking acid strength', {
      b: r`**Problem.** Arrange in increasing acidity: $\ce{CH3COOH}$, $\ce{ClCH2COOH}$, $\ce{Cl2CHCOOH}$, $\ce{CH3CH2COOH}$, $\ce{FCH2COOH}$.

**Step 1.** Alkyl groups (+I) weaken: propanoic < ethanoic.

**Step 2.** Halogens (−I) strengthen; F > Cl; two Cl > one Cl.

**Answer.** $\ce{CH3CH2COOH}$ < $\ce{CH3COOH}$ < $\ce{ClCH2COOH}$ < $\ce{FCH2COOH}$ < $\ce{Cl2CHCOOH}$.`,
      v: table(['Acid', 'pKa', 'Effect'], [['Propanoic', '4.88', '+I of ethyl'], ['Ethanoic', '4.76', '+I of methyl'], ['Chloroethanoic', '2.86', '−I of one Cl'], ['Fluoroethanoic', '2.66', '−I of F (stronger)'], ['Dichloroethanoic', '1.26', '−I of two Cl']], 'Table ranking five acids by pKa with the substituent effect in each'),
      n: 'Rank acids by asking how well each substituent stabilises the carboxylate ion. Electron-releasing alkyl groups destabilise it, so propanoic acid is weakest. One chlorine helps a lot; fluorine, being more electronegative, helps a little more; two chlorines help most of all. The pKa values confirm the order.',
    }),
    sl('check', 'Quick check: acidity', {
      b: 'Choose the strongest acid from a set of substituted acids.',
      n: 'Quick check. Count the electron-withdrawing groups and check how close they are to the carboxyl group.',
      chk: 'acid-strength-mcq',
    }),
    sl('concept', 'Reactions: acid derivatives', {
      b: 'The –OH of –COOH can be replaced to form **acid derivatives**.',
      m: [r`\ce{CH3COOH + PCl5 -> CH3COCl + POCl3 + HCl}`, r`\ce{CH3COOH + SOCl2 -> CH3COCl + SO2 + HCl}`, r`\ce{CH3COOH + C2H5OH <=>[H+] CH3COOC2H5 + H2O}`, r`\ce{CH3COONH4 ->[\Delta] CH3CONH2 + H2O}`],
      v: table(['Reagent', 'Derivative'], [['PCl₅, PCl₃ or SOCl₂', 'Acid chloride'], ['Alcohol + conc. H₂SO₄', 'Ester (esterification)'], ['NH₃, then heat', 'Amide'], ['P₂O₅ or heat with acid', 'Anhydride']], 'Table of reagents converting carboxylic acids into acid chlorides, esters, amides and anhydrides'),
      n: 'Replacing the hydroxyl part of the carboxyl group gives a family of derivatives. Phosphorus chlorides or thionyl chloride give acid chlorides. Alcohols with a little concentrated sulfuric acid give esters, which smell fruity. Ammonia gives the ammonium salt, which loses water on heating to form an amide. Removing water between two acid molecules gives an anhydride.',
    }),
    sl('concept', 'Reduction, decarboxylation and the HVZ reaction', {
      b: '**Reduction:** LiAlH₄ (or B₂H₆) reduces –COOH to –CH₂OH (NaBH₄ does not). **Decarboxylation:** sodium salts + soda lime (NaOH + CaO), heat → alkane with **one carbon fewer**; Kolbe electrolysis of salts gives alkanes. **Hell–Volhard–Zelinsky (HVZ):** acids with α-H + X₂ and red P → α-halo acids.',
      m: [r`\ce{CH3COONa + NaOH ->[CaO][\Delta] CH4 + Na2CO3}`, r`\ce{CH3COOH + Cl2 ->[red P] ClCH2COOH + HCl}`],
      v: table(['Reaction', 'Reagent', 'Product from ethanoic acid (or its salt)'], [['Reduction', 'LiAlH₄, then H₃O⁺', 'Ethanol'], ['Decarboxylation', 'Soda lime, heat', 'Methane'], ['HVZ', 'Cl₂, red P', 'Chloroethanoic acid'], ['Ring substitution (benzoic acid)', 'Conc. HNO₃/H₂SO₄', '3-Nitrobenzoic acid (meta)']], 'Table of reduction, decarboxylation, HVZ and ring substitution reactions with products'),
      n: 'Lithium aluminium hydride reduces carboxylic acids to primary alcohols. Heating the sodium salt with soda lime removes carbon dioxide, giving an alkane with one carbon fewer: sodium ethanoate gives methane. In the Hell–Volhard–Zelinsky reaction, chlorine or bromine with red phosphorus replaces an alpha hydrogen, giving alpha-halo acids. On a benzene ring, the carboxyl group is deactivating and meta-directing.',
    }),
    sl('example', 'Worked example: distinguishing tests', {
      b: r`**Problem.** Give a test to distinguish (a) ethanoic acid and phenol; (b) methanoic acid and ethanoic acid; (c) ethanal and propanone.

**(a)** $\ce{NaHCO3}$: ethanoic acid gives brisk effervescence of $\ce{CO2}$; phenol does not.

**(b)** Tollens’ reagent: methanoic acid (which has an –CHO-like H) gives a silver mirror; ethanoic acid does not.

**(c)** Tollens’ or Fehling’s: ethanal positive; propanone negative.`,
      v: table(['Pair', 'Reagent', 'Positive'], [['Ethanoic acid / phenol', 'NaHCO₃', 'Acid: CO₂ effervescence'], ['Methanoic / ethanoic acid', 'Tollens’ reagent', 'Methanoic: silver mirror'], ['Ethanal / propanone', 'Fehling’s solution', 'Ethanal: red-brown ppt']], 'Table of three distinguishing tests with reagents and positive results'),
      n: 'Carboxylic acids are strong enough to release carbon dioxide from sodium hydrogencarbonate, but phenol is not. Methanoic acid is unusual: its structure contains a hydrogen attached to the carbonyl carbon, so it behaves like an aldehyde and reduces Tollens’ reagent. And aldehydes such as ethanal give positive Tollens’ and Fehling’s tests, while ketones such as propanone do not.',
    }),
    sl('check', 'Quick check: reactions of acids', {
      b: 'Predict the product of a reaction of a carboxylic acid or its salt.',
      n: 'Quick check. Decide whether the reagent replaces the hydroxyl group, removes carbon dioxide or substitutes an alpha hydrogen.',
      chk: 'sodalime-mcq',
    }),
    sl('concept', 'Uses of carboxylic acids', {
      b: 'Carboxylic acids and their esters have many uses.',
      v: table(['Acid or derivative', 'Use'], [['Methanoic acid', 'Rubber, textile, dyeing, leather and electroplating industries'], ['Ethanoic acid', 'Vinegar; solvent; making cellulose acetate'], ['Hexanedioic acid', 'Manufacture of nylon-6,6'], ['Sodium benzoate', 'Food preservative'], ['Esters of benzoic acid', 'Perfumery'], ['Higher fatty acids (sodium salts)', 'Soaps and detergents']], 'Table of uses of carboxylic acids and their derivatives'),
      n: 'Carboxylic acids are everyday industrial chemicals. Methanoic acid is used in the rubber, textile and leather industries. Vinegar is a dilute solution of ethanoic acid. Hexanedioic acid is one of the two building blocks of nylon six six. Sodium benzoate keeps pickles and sauces from spoiling, and the sodium salts of long-chain fatty acids are soaps.',
    }),
    sl('check', 'Quick check: tests', {
      b: 'Identify a test that distinguishes a carboxylic acid from a phenol.',
      n: 'Quick check. Which reagent is a carboxylic acid strong enough to decompose, releasing a gas?',
      chk: 'nahco3-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Names: alkanoic acids; preparation from 1° alcohols, aldehydes, alkylbenzenes (KMnO₄), nitriles (H₃O⁺), RMgX + CO₂.',
        'Dimers by hydrogen bonding → high boiling points; lower acids water-soluble.',
        'Acidity from resonance in carboxylate; −I groups increase, +I groups decrease acidity; react with NaHCO₃.',
        'Derivatives: acid chlorides (SOCl₂, PCl₅), esters, amides, anhydrides.',
        'LiAlH₄ → 1° alcohol; soda lime → alkane (one C fewer); HVZ → α-halo acid; –COOH is meta-directing.',
      ],
      v: table(['Reagent', 'Product from RCOOH'], [['SOCl₂', 'RCOCl'], ['R′OH, H⁺', 'RCOOR′'], ['LiAlH₄', 'RCH₂OH'], ['NaOH + CaO (salt)', 'RH'], ['X₂, red P', 'α-Halo acid']], 'Summary table of reagents and products from carboxylic acids'),
      n: 'Let us sum up Part 2. Carboxylic acids are made by oxidation, from nitriles and from Grignard reagents with carbon dioxide. Hydrogen-bonded dimers raise their boiling points. Their acidity comes from the resonance-stabilised carboxylate ion and is increased by electron-withdrawing groups. They form acid chlorides, esters, amides and anhydrides, are reduced by lithium aluminium hydride, lose carbon dioxide with soda lime and are halogenated by the HVZ reaction.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For acidity order, mention −I/+I effects, number of substituents and distance from –COOH.',
        'Decarboxylation with soda lime gives one carbon fewer; nitrile and Grignard routes give one carbon more.',
        'NaBH₄ does not reduce –COOH; LiAlH₄ does.',
        'Use NaHCO₃ to tell acids from phenols; Tollens’ to tell methanoic acid from other acids.',
        'HVZ needs an α-hydrogen and red phosphorus.',
      ],
      v: table(['Slip', 'Fix'], [['Benzoic acid is o/p-directing', '–COOH is meta-directing'], ['Soda lime keeps all carbons', 'Loses one C as CO₂'], ['Phenol + NaHCO₃ → CO₂', 'No reaction']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. In acidity questions, always discuss the type, number and distance of substituents. Keep track of chain length: nitriles and Grignard reagents add a carbon, soda lime removes one. Sodium borohydride cannot reduce carboxylic acids. Use sodium hydrogencarbonate to tell acids from phenols. And remember that the carboxyl group directs incoming groups to the meta position.',
    }),
  ],
});

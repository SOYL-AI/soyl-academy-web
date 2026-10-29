// ch08 Aldehydes, Ketones and Carboxylic Acids — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Aldehydes, Ketones and Carboxylic Acids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Nomenclature and structure of the carbonyl group',
      r`**Names:** aldehydes -al (methanal, ethanal, 2-methylpropanal, benzaldehyde = benzenecarbaldehyde); ketones -one with locant (propanone, butan-2-one, 1-phenylethan-1-one = acetophenone).

**Structure:** the carbonyl carbon is sp², trigonal planar (about 120°), with a σ and a π bond to oxygen. The C=O bond is polar (C δ+, O δ−); the carbon is electrophilic and is attacked by nucleophiles from above or below the plane.`,
      [kt('Carbonyl group', 'The C=O group, present in aldehydes, ketones and carboxylic acids and their derivatives.'), kt('Electrophilic carbon', 'A carbon carrying partial positive charge, open to attack by nucleophiles.')],
      [],
      V.carbonyl,
      [1],
    ),
    sec(
      '2. Preparation of aldehydes and ketones',
      r`- Oxidation of alcohols: 1° → aldehyde (PCC; Cu, 573 K); 2° → ketone (K₂Cr₂O₇/H⁺).
- Ozonolysis of alkenes (O₃, then Zn/H₂O).
- Hydration of alkynes (H₂O, Hg²⁺, H₂SO₄): ethyne → ethanal; propyne → propanone.
- **Rosenmund reduction:** $\ce{C6H5COCl + H2 ->[Pd/BaSO4] C6H5CHO + HCl}$.
- **Stephen reaction:** nitrile + SnCl₂/HCl → imine, then H₃O⁺ → aldehyde; DIBAL-H also reduces nitriles and esters to aldehydes.
- **Etard reaction:** toluene + CrO₂Cl₂ → benzaldehyde; also CrO₃/acetic anhydride, or side-chain chlorination to benzal chloride and hydrolysis.
- **Gatterman–Koch:** benzene + CO + HCl (anhydrous AlCl₃/CuCl) → benzaldehyde.
- **Friedel–Crafts acylation:** $\ce{C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl}$.
- Ketones from nitriles + Grignard reagent, then hydrolysis; from acid chlorides + dialkylcadmium.`,
      [kt('Rosenmund reduction', 'Hydrogenation of an acid chloride over Pd poisoned with BaSO₄ to give an aldehyde.'), kt('Etard reaction', 'Oxidation of toluene to benzaldehyde by chromyl chloride.'), kt('Stephen reaction', 'Reduction of a nitrile by SnCl₂/HCl followed by hydrolysis, giving an aldehyde.')],
      [],
      flow('LR', [['a', 'Acid chloride'], ['b', 'Nitrile'], ['c', 'Toluene'], ['d', 'Benzene'], ['x', 'Aldehyde / ketone']], [['a', 'x', 'Rosenmund'], ['b', 'x', 'Stephen'], ['c', 'x', 'Etard'], ['d', 'x', 'Gatterman–Koch, Friedel–Crafts']], 'Flow of named preparations of aldehydes and ketones'),
      [2],
    ),
    sec(
      '3. Reactions of aldehydes and ketones',
      r`**Nucleophilic addition** (aldehydes more reactive than ketones: steric and +I effects): HCN → cyanohydrin ($\ce{CH3CHO + HCN -> CH3CH(OH)CN}$); NaHSO₃ → bisulfite adduct (purification); RMgX → alcohols; alcohols/dry HCl → hemiacetal, acetal (ketones + ethylene glycol → ketal); NH₂–Z derivatives (hydroxylamine → oxime, hydrazine → hydrazone, 2,4-DNP → orange 2,4-DNP derivative, semicarbazide → semicarbazone).

**Reduction:** NaBH₄/LiAlH₄/H₂ → alcohols; **Clemmensen** (Zn–Hg, conc. HCl) and **Wolff–Kishner** (NH₂NH₂; KOH/ethylene glycol, heat) → CH₂.

**Oxidation:** aldehydes → acids with mild oxidants. **Tollens’ test** (silver mirror) for all aldehydes; **Fehling’s test** (red-brown Cu₂O) for aliphatic aldehydes. Ketones are oxidised only vigorously, with C–C cleavage.

**α-Hydrogen reactions:** **aldol condensation** (dilute NaOH): $\ce{2CH3CHO -> CH3CH(OH)CH2CHO}$, then dehydration to but-2-enal; crossed aldol gives mixtures. **Haloform reaction** (CH₃CO– group, I₂/NaOH → yellow CHI₃).

**Cannizzaro reaction** (no α-H, conc. alkali): $\ce{2HCHO + NaOH -> HCOONa + CH3OH}$; benzaldehyde → sodium benzoate + phenylmethanol.

**Aromatic ring:** –CHO and –COR are deactivating and meta-directing.`,
      [kt('Aldol condensation', 'Base-catalysed self-addition of carbonyl compounds having α-hydrogens, giving β-hydroxy carbonyl compounds.'), kt('Cannizzaro reaction', 'Disproportionation of an aldehyde without α-hydrogen in concentrated alkali to an alcohol and a carboxylate.'), kt('Tollens’ reagent', 'Ammoniacal silver nitrate; gives a silver mirror with aldehydes.')],
      [],
      V.nucadd,
      [3],
      [table(['Test', 'Aldehyde (aliphatic)', 'Aromatic aldehyde', 'Ketone'], [['Tollens’', '+', '+', '−'], ['Fehling’s', '+', '−', '−'], ['2,4-DNP', '+', '+', '+']], 'Results of carbonyl tests')],
    ),
    sec(
      '4. Carboxylic acids: preparation',
      r`- Oxidation of 1° alcohols and aldehydes (KMnO₄, K₂Cr₂O₇, CrO₃).
- Oxidation of alkylbenzenes with hot alkaline KMnO₄ (any side chain → –COOH on the ring).
- Hydrolysis of nitriles and amides: $\ce{CH3CN + 2H2O + HCl -> CH3COOH + NH4Cl}$ (one carbon more than the alkyl halide used to make the nitrile).
- Grignard reagent + CO₂ (dry ice), then H₃O⁺: $\ce{CH3MgBr + CO2 -> CH3COOMgBr}$ → $\ce{CH3COOH}$.
- Hydrolysis of acid chlorides, anhydrides and esters.`,
      [kt('Dry ice', 'Solid carbon dioxide, used with Grignard reagents to make carboxylic acids.')],
      [],
      table(['From', 'Reagent', 'Change in carbon count'], [['RCH₂OH', 'KMnO₄', 'Same'], ['C₆H₅R', 'KMnO₄, heat', 'Side chain → COOH'], ['RX → RCN', 'KCN, then H₃O⁺', '+1'], ['RX → RMgX', 'CO₂, then H₃O⁺', '+1']], 'Preparation methods for carboxylic acids and the change in carbon count'),
      [4],
    ),
    sec(
      '5. Carboxylic acids: properties, acidity, reactions and uses',
      r`**Physical:** hydrogen-bonded dimers → higher bp than alcohols of similar mass (ethanoic acid 391 K, propan-1-ol 370 K); C1–C4 acids water-miscible.

**Acidity:** stronger than alcohols and phenols (carboxylate resonance, charge on two O atoms); liberate CO₂ from NaHCO₃: $\ce{CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2}$. −I groups (F, Cl, NO₂, CN) increase acidity (more groups, closer → stronger); +I alkyl groups decrease it. pKa: CF₃COOH 0.23, CCl₃COOH 0.65, CHCl₂COOH 1.26, FCH₂COOH 2.66, ClCH₂COOH 2.86, HCOOH 3.75, C₆H₅COOH 4.19, CH₃COOH 4.76, CH₃CH₂COOH 4.88.

**Reactions:** acid chlorides (PCl₅, PCl₃, SOCl₂); esters (alcohol, H⁺); amides (NH₃, heat); anhydrides (P₂O₅ or heat); reduction to 1° alcohols (LiAlH₄ or B₂H₆, not NaBH₄); **decarboxylation** $\ce{CH3COONa + NaOH ->[CaO] CH4 + Na2CO3}$ (one C fewer), Kolbe electrolysis; **HVZ** $\ce{CH3COOH + Cl2 ->[red P] ClCH2COOH + HCl}$; ring substitution of benzoic acid at meta (no Friedel–Crafts).

**Uses:** methanoic acid (rubber, textiles, leather, electroplating); ethanoic acid (vinegar, solvent); hexanedioic acid (nylon-6,6); sodium benzoate (preservative); esters of benzoic acid (perfumes); higher fatty acids (soaps).`,
      [kt('Decarboxylation', 'Loss of CO₂ from a carboxylic acid or its salt, e.g. with soda lime, giving a hydrocarbon with one carbon fewer.'), kt('HVZ reaction', 'α-Halogenation of a carboxylic acid with Cl₂ or Br₂ and red phosphorus.')],
      [],
      V.carboxylate,
      [5],
      [table(['Acid', 'pKa'], [['CCl₃COOH', '0.65'], ['ClCH₂COOH', '2.86'], ['HCOOH', '3.75'], ['C₆H₅COOH', '4.19'], ['CH₃COOH', '4.76']], 'Selected pKa values')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Claiming ketones give Tollens’ or Fehling’s tests; or that benzaldehyde gives Fehling’s test.
- Choosing aldol for compounds without α-H (they give Cannizzaro with conc. alkali).
- Forgetting that soda lime removes one carbon and that nitrile/Grignard routes add one.
- Using NaBH₄ to reduce a carboxylic acid.
- Ranking acidity without considering the number and position of −I groups.

**How marks are usually awarded**
- 1-mark items: product, reagent, name, test result.
- Named reactions (2 marks): equation (1) + conditions/reagent (1).
- Tests (2 marks): reagent (½–1) + observation for each compound.
- Acidity explanations: conjugate-base stability with the effect named (−I/+I, resonance).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'IUPAC name of CH₃COCH₂CH₃?', 'Butan-2-one.', 'example', 1),
    fc(2, 'Hybridisation and shape at the carbonyl carbon?', 'sp², trigonal planar (about 120°).', 'fact', 1),
    fc(3, 'Why is the carbonyl carbon attacked by nucleophiles?', 'The polar C=O leaves carbon partially positive (electrophilic).', 'concept', 1),
    fc(4, 'Rosenmund reduction?', 'RCOCl + H₂ over Pd/BaSO₄ → RCHO + HCl.', 'formula', 2),
    fc(5, 'Why is BaSO₄ added in Rosenmund reduction?', 'It poisons Pd so the aldehyde is not reduced further to an alcohol.', 'concept', 2),
    fc(6, 'Stephen reaction?', 'RCN + SnCl₂/HCl → imine; H₃O⁺ → RCHO.', 'formula', 2),
    fc(7, 'Etard reaction?', 'Toluene + CrO₂Cl₂, then H₃O⁺ → benzaldehyde.', 'formula', 2),
    fc(8, 'Friedel–Crafts acylation of benzene with CH₃COCl?', 'Acetophenone (C₆H₅COCH₃), with anhydrous AlCl₃.', 'example', 2),
    fc(9, 'Why are aldehydes more reactive than ketones to nucleophiles?', 'Less steric hindrance and less electron release (+I) to the carbonyl carbon.', 'concept', 3),
    fc(10, 'HCN + ethanal?', 'Ethanal cyanohydrin, CH₃CH(OH)CN.', 'example', 3),
    fc(11, 'Use of NaHSO₃ addition?', 'Forms crystalline adducts used to separate and purify aldehydes and some ketones.', 'fact', 3),
    fc(12, 'Clemmensen vs Wolff–Kishner?', 'Both reduce C=O to CH₂: Zn–Hg/conc. HCl (acid) vs NH₂NH₂ then KOH/heat (base).', 'concept', 3),
    fc(13, 'Tollens’ test result?', 'Silver mirror with aldehydes (not ketones).', 'fact', 3),
    fc(14, 'Fehling’s test result?', 'Red-brown Cu₂O with aliphatic aldehydes; not with benzaldehyde or ketones.', 'fact', 3),
    fc(15, 'Condition for aldol condensation?', 'At least one α-hydrogen; dilute alkali.', 'concept', 3),
    fc(16, 'Aldol of ethanal?', '3-Hydroxybutanal; on heating, but-2-enal.', 'example', 3),
    fc(17, 'Cannizzaro reaction?', 'Aldehyde with no α-H + conc. alkali → alcohol + carboxylate salt.', 'definition', 3),
    fc(18, 'Iodoform test is given by…?', 'Compounds with CH₃CO– (or CH₃CH(OH)–): yellow CHI₃ with I₂/NaOH.', 'fact', 3),
    fc(19, '2,4-DNP test?', 'Orange/yellow precipitate with aldehydes and ketones.', 'fact', 3),
    fc(20, 'Benzoic acid from propylbenzene?', 'Hot alkaline KMnO₄, then acid (whole side chain → COOH).', 'example', 4),
    fc(21, 'Grignard reagent + CO₂?', 'Carboxylic acid with one more carbon (after H₃O⁺).', 'formula', 4),
    fc(22, 'Why do carboxylic acids boil higher than alcohols of similar mass?', 'They form hydrogen-bonded dimers.', 'concept', 5),
    fc(23, 'Why are carboxylic acids stronger than phenols?', 'Carboxylate charge is shared by two O atoms in equivalent resonance structures.', 'concept', 5),
    fc(24, 'Effect of Cl on acidity of ethanoic acid?', '−I effect stabilises the anion: ClCH₂COOH is stronger; more Cl, stronger.', 'concept', 5),
    fc(25, 'Test: carboxylic acid vs phenol?', 'NaHCO₃: acids give CO₂ effervescence; phenols do not.', 'fact', 5),
    fc(26, 'Reagent to convert RCOOH to RCOCl?', 'SOCl₂ (or PCl₅, PCl₃).', 'fact', 5),
    fc(27, 'Decarboxylation with soda lime?', 'RCOONa + NaOH (CaO), heat → RH + Na₂CO₃ (one C fewer).', 'formula', 5),
    fc(28, 'HVZ reaction?', 'RCH₂COOH + X₂ (red P) → RCHXCOOH.', 'formula', 5),
    fc(29, 'Directing effect of –COOH on benzene?', 'Deactivating and meta-directing.', 'fact', 5),
    fc(30, 'Use of hexanedioic acid?', 'Manufacture of nylon-6,6.', 'fact', 5),
    fc(31, 'Exam tip: methanoic acid', 'It reduces Tollens’ reagent, unlike other carboxylic acids.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};

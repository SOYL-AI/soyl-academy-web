// ISC 12 Chemistry ch19 Amines — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Amines — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Classification, structure and nomenclature',
      `1° RNH₂, 2° R₂NH, 3° R₃N (count groups on **N**); R₄N⁺X⁻ quaternary salts; general formula CₙH₂ₙ₊₃N. N **sp³**, pyramidal (C–N–C ≈ 108°), **lone pair** → basic and nucleophilic. IUPAC: alkanamine with N-prefixes (N,N-diethylethanamine; hexane-1,6-diamine); aniline = benzenamine.`,
      [kt('Primary amine', 'An amine with one carbon group on nitrogen, RNH₂.'), kt('Quaternary ammonium salt', 'R₄N⁺X⁻, nitrogen bonded to four carbon groups.')],
      [],
      V.pyramid,
      [1],
    ),
    sec(
      '2. Preparation',
      r`- ROH + NH₃ (Al₂O₃, 633 K) → mixture of amines.
- RX + alcoholic NH₃ (sealed tube) → mixture; excess NH₃ favours 1°.
- **Nitriles:** H₂/Ni, LiAlH₄ or Na/ethanol → RCH₂NH₂ (+1 C).
- **Hofmann:** $\ce{RCONH2 + Br2 + 4KOH -> RNH2 + K2CO3 + 2KBr + 2H2O}$ (−1 C).
- **Nitro compounds:** Sn/HCl or Fe/HCl, then NaOH; H₂/Ni.
- **Gabriel:** potassium phthalimide + RX → hydrolysis → pure RNH₂ (not aryl amines).`,
      [kt('Gabriel synthesis', 'Preparation of pure primary amines from potassium phthalimide and an alkyl halide.'), kt('Hofmann degradation', 'Conversion of an amide into a primary amine with one carbon fewer using Br₂ and KOH.')],
      [fm(r`\ce{C6H5NO2 + 3H2 ->[Ni] C6H5NH2 + 2H2O}`, 'Reduction of nitrobenzene')],
      table(['Method', 'Carbon change'], [['Nitrile reduction', '+1'], ['Hofmann', '−1'], ['Gabriel', '0']], 'Table of preparations'),
      [2],
    ),
    sec(
      '3. Physical properties',
      `Lower amines: gases/volatile liquids, fishy smell; aniline darkens in air. 1° and 2° amines form N–H···N hydrogen bonds — **weaker than O–H···O**, so amines boil lower than alcohols of similar mass. Isomers: **1° > 2° > 3°** (3° has no N–H). Lower amines water-soluble.`,
      [kt('N–H···N hydrogen bond', 'Hydrogen bond between amine molecules; weaker than O–H···O.')],
      [],
      table(['C₃H₉N isomer', 'b.p. / K'], [['(CH₃)₃N', '276'], ['CH₃NHC₂H₅', '310'], ['CH₃CH₂CH₂NH₂', '321']], 'Table of boiling points of amine isomers'),
      [3],
    ),
    sec(
      '4. Basicity',
      r`$\ce{RNH2 + H2O <=> RNH3+ + OH-}$; smaller pKb → stronger base. **Gas:** 3° > 2° > 1° > NH₃ (+I). **Water:** (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃; (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃ — +I effect, **solvation** of the cation (more N–H better) and **steric** hindrance.

**Aniline** (pKb 9.38) ≪ NH₃ (4.75): lone pair delocalised into the ring. EDG (–CH₃, –OCH₃) increase, EWG (–NO₂, –Cl) decrease basicity. Benzylamine (N on CH₂) ≈ alkyl amines.`,
      [kt('pKb', '−log Kb; a smaller pKb means a stronger base.')],
      [],
      V.aniline,
      [4],
    ),
    sec(
      '5. Alkylation, acylation and tests',
      r`**Alkylation** (SN2 by N lone pair): 1° → 2° → 3° → R₄N⁺X⁻. **Acylation** (addition–elimination at C=O of RCOCl/(RCO)₂O; pyridine removes HCl): 1° and 2° → amides; 3° no reaction; benzoylation (Schotten–Baumann).

**HNO₂:** 1° aliphatic → ROH + N₂; 1° aromatic (273–278 K) → ArN₂⁺; 2° → yellow N-nitrosamine; 3° aliphatic → salt. **Carbylamine** (CHCl₃ + alc. KOH): 1° only → foul isocyanide. **Hinsberg** (C₆H₅SO₂Cl + KOH): 1° product soluble in KOH; 2° insoluble; 3° no reaction.`,
      [kt('Carbylamine test', 'Primary amines + CHCl₃ + alcoholic KOH → foul-smelling isocyanide.'), kt('Hinsberg’s reagent', 'Benzenesulphonyl chloride, C₆H₅SO₂Cl.')],
      [fm(r`\ce{C6H5NH2 + CHCl3 + 3KOH -> C6H5NC + 3KCl + 3H2O}`, 'Carbylamine reaction')],
      table(['Test', '1°', '2°', '3°'], [['Carbylamine', '+', '−', '−'], ['Hinsberg (KOH)', 'Soluble', 'Insoluble', 'No reaction'], ['HNO₂', 'N₂ (aliphatic)', 'Yellow oil', 'Salt']], 'Table of tests'),
      [5],
    ),
    sec(
      '6. Aniline',
      r`**Preparation:** C₆H₅NO₂ + Sn/HCl → C₆H₅NH₃Cl → (NaOH) C₆H₅NH₂; steam distil. **–NH₂ reactions:** salts with acids; acetylation (acetanilide), benzoylation (benzanilide), alkylation, carbylamine, diazotisation.

**Ring:** –NH₂ strongly activating (o/p): Br₂(aq) → 2,4,6-tribromoaniline; for monosubstitution acetylate first (protects from oxidation, moderates activation, avoids anilinium meta direction) → 4-nitro/4-bromoacetanilide → hydrolyse; sulphonation → sulphanilic acid (zwitter ion); no Friedel–Crafts.

**Tests:** azo dye (diazotise cold + alkaline 2-naphthol → orange-red); bromine water (white ppt); bleaching powder (violet). **Uses:** dyes, drugs, rubber chemicals, polyurethanes.`,
      [kt('Acetanilide', 'N-Phenylethanamide, C₆H₅NHCOCH₃.'), kt('Sulphanilic acid', '4-Aminobenzenesulphonic acid, a zwitter ion.')],
      [fm(r`\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}`, 'Bromination of aniline')],
      table(['Reagent', 'Product'], [['Br₂(aq)', '2,4,6-Tribromoaniline'], ['(CH₃CO)₂O', 'Acetanilide'], ['NaNO₂/HCl, cold', 'C₆H₅N₂Cl'], ['Conc. H₂SO₄, 453 K', 'Sulphanilic acid']], 'Table of aniline reactions'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Classifying butan-2-amine as secondary (it is primary).
- Saying trimethylamine is the strongest base in water.
- Giving the carbylamine test for 2° amines.
- Nitrating aniline directly and expecting only the para product.

**How marks are usually awarded**
- Basicity (2–3 marks): order with +I, solvation, steric and resonance arguments.
- Tests (2–3 marks): reagent, observation for each class, reason.
- Aniline conversions (1 mark per step): protection, substitution, deprotection.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'How are amines classified?', 'By number of C groups on N.', 'concept', 1),
    fc(2, 'IUPAC name of (C₂H₅)₃N?', 'N,N-Diethylethanamine.', 'fact', 1),
    fc(3, 'Shape of amines?', 'Pyramidal (sp³ N with lone pair).', 'fact', 1),
    fc(4, 'Nitrile + LiAlH₄?', 'RCH₂NH₂ (one more C).', 'fact', 2),
    fc(5, 'Hofmann degradation?', 'Amide + Br₂ + KOH → amine (one fewer C).', 'definition', 2),
    fc(6, 'Why Gabriel gives pure 1° amines?', 'Phthalimide N has one H; only one alkylation.', 'concept', 2),
    fc(7, 'Why no aniline by Gabriel?', 'Aryl halides do not undergo SN2.', 'concept', 2),
    fc(8, 'Nitrobenzene → aniline?', 'Sn/HCl then NaOH, or H₂/Ni.', 'fact', 2),
    fc(9, 'Why amines boil below alcohols?', 'Weaker N–H···N hydrogen bonds.', 'concept', 3),
    fc(10, 'B.p. order of isomeric amines?', '1° > 2° > 3°.', 'fact', 3),
    fc(11, 'Strongest methylamine base in water?', '(CH₃)₂NH.', 'fact', 4),
    fc(12, 'Basicity order in gas phase?', '3° > 2° > 1° > NH₃.', 'fact', 4),
    fc(13, 'Three factors for basicity in water?', '+I, solvation, steric hindrance.', 'concept', 4),
    fc(14, 'Why is aniline weakly basic?', 'Lone pair delocalised into ring.', 'concept', 4),
    fc(15, 'Effect of 4-NO₂ on aniline basicity?', 'Decreases it.', 'fact', 4),
    fc(16, 'Benzylamine vs aniline?', 'Benzylamine stronger (no delocalisation).', 'fact', 4),
    fc(17, 'Excess CH₃I with an amine?', 'Quaternary ammonium salt.', 'fact', 5),
    fc(18, 'Which amines form amides?', '1° and 2°.', 'fact', 5),
    fc(19, '1° aliphatic amine + HNO₂?', 'ROH + N₂.', 'fact', 5),
    fc(20, '2° amine + HNO₂?', 'Yellow N-nitrosamine.', 'fact', 5),
    fc(21, 'Carbylamine test given by?', '1° amines only.', 'fact', 5),
    fc(22, 'Hinsberg: 1° product?', 'Soluble in KOH.', 'fact', 5),
    fc(23, 'Hinsberg: 2° product?', 'Insoluble in KOH.', 'fact', 5),
    fc(24, 'Aniline + bromine water?', '2,4,6-Tribromoaniline.', 'fact', 6),
    fc(25, 'Why acetylate before nitration?', 'Protect from oxidation; control substitution.', 'concept', 6),
    fc(26, 'Why direct nitration gives meta product?', 'Anilinium ion is a meta director.', 'concept', 6),
    fc(27, 'Sulphanilic acid?', '4-Aminobenzenesulphonic acid (zwitter ion).', 'fact', 6),
    fc(28, 'Why no Friedel–Crafts on aniline?', '–NH₂ binds AlCl₃.', 'concept', 6),
    fc(29, 'Test distinguishing aniline from ethanamine?', 'Azo dye with 2-naphthol.', 'fact', 6),
    fc(30, 'Diazotisation temperature?', '273–278 K.', 'fact', 6),
    fc(31, 'Exam tip: amine tests', 'Give reagent, observation and class for each test.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};

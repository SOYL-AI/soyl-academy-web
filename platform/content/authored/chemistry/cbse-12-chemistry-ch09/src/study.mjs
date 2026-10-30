// ch09 Amines — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Amines — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Structure, classification and nomenclature',
      r`Amines are derivatives of ammonia: **primary** RNH₂, **secondary** R₂NH, **tertiary** R₃N (class = number of carbon groups on N). Nitrogen is sp³ and pyramidal with a lone pair (C–N–C about 108°).

**IUPAC:** alkanamine (ethanamine, propan-2-amine); groups on N as N-prefixes (N-methylethanamine, N,N-dimethylmethanamine); diamines (ethane-1,2-diamine); aryl amines as benzenamines (aniline = benzenamine, N,N-dimethylbenzenamine).`,
      [kt('Primary amine', 'An amine with one carbon group on nitrogen, RNH₂.'), kt('Aryl amine', 'An amine with nitrogen bonded directly to an aromatic ring, e.g. aniline.')],
      [],
      V.pyramid,
      [1],
    ),
    sec(
      '2. Preparation of amines',
      r`- **Reduction of nitro compounds:** H₂/Ni, Pt, Pd; Fe/HCl (preferred — FeCl₂ hydrolyses and regenerates HCl) or Sn/HCl: $\ce{C6H5NO2 + 3H2 ->[Ni] C6H5NH2 + 2H2O}$.
- **Ammonolysis of alkyl halides:** $\ce{CH3CH2Br + 2NH3 -> CH3CH2NH2 + NH4Br}$ — gives a mixture of 1°, 2°, 3° amines and quaternary salts.
- **Reduction of nitriles** (LiAlH₄ or H₂/Ni): $\ce{CH3CN + 2H2 -> CH3CH2NH2}$ — one carbon more than the alkyl halide.
- **Reduction of amides** (LiAlH₄).
- **Gabriel phthalimide synthesis:** phthalimide → K salt → N-alkylphthalimide → NaOH(aq) → pure 1° aliphatic amine (not aryl amines).
- **Hoffmann bromamide degradation:** $\ce{CH3CONH2 + Br2 + 4NaOH -> CH3NH2 + Na2CO3 + 2NaBr + 2H2O}$ — one carbon fewer.`,
      [kt('Ammonolysis', 'Reaction of an alkyl halide with ammonia, giving a mixture of amines.'), kt('Gabriel synthesis', 'Preparation of pure primary amines from potassium phthalimide and alkyl halides.'), kt('Hoffmann bromamide degradation', 'Conversion of an amide into a primary amine with one carbon fewer, using Br₂ and NaOH.')],
      [],
      flow('LR', [['a', 'Nitro compound'], ['b', 'Nitrile (+1 C)'], ['c', 'Amide'], ['d', 'Alkyl halide'], ['x', 'Amine']], [['a', 'x', 'Fe/HCl'], ['b', 'x', 'LiAlH₄'], ['c', 'x', 'LiAlH₄ or Br₂/NaOH (−1 C)'], ['d', 'x', 'NH₃ or Gabriel']], 'Routes to amines'),
      [2],
    ),
    sec(
      '3. Physical properties and basicity',
      r`**Physical:** 1° and 2° amines form N–H···N hydrogen bonds (weaker than O–H···O): boiling points between alkanes and alcohols; for isomers 1° > 2° > 3° (propan-1-amine 321 K, N-methylethanamine 310 K, trimethylamine 276 K). Lower amines are water-soluble; aryl amines are colourless when pure but darken in air (oxidation).

**Basicity:** $\ce{RNH2 + H2O <=> RNH3+ + OH-}$; smaller pKb = stronger base. pKb: (C₂H₅)₂NH 3.00, (C₂H₅)₃N 3.25, (CH₃)₂NH 3.27, C₂H₅NH₂ 3.29, CH₃NH₂ 3.38, (CH₃)₃N 4.22, NH₃ 4.75, C₆H₅NH₂ 9.38.
- Alkylamines > NH₃: +I effect of alkyl groups.
- In water the order also depends on **solvation** of the ammonium ion (more N–H, better H-bonding) and **steric** hindrance: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃; (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃. In the gas phase: 3° > 2° > 1° > NH₃.
- Aryl amines ≪ NH₃: the lone pair is delocalised into the ring (resonance), lost on protonation. –CH₃, –OCH₃ on the ring increase basicity; –NO₂ decreases it.`,
      [kt('pKb', 'Negative logarithm of the base dissociation constant; smaller pKb means a stronger base.'), kt('Solvation effect', 'Stabilisation of the protonated amine by hydrogen bonding with water.')],
      [],
      V.aniline,
      [3],
      [table(['Amine', 'pKb'], [['(C₂H₅)₂NH', '3.00'], ['CH₃NH₂', '3.38'], ['(CH₃)₃N', '4.22'], ['NH₃', '4.75'], ['C₆H₅NH₂', '9.38']], 'Selected pKb values')],
    ),
    sec(
      '4. Chemical reactions of amines',
      r`- **Salts** with acids; amine released by NaOH.
- **Alkylation** to 2°, 3° amines and quaternary ammonium salts.
- **Acylation** (1° and 2° only): $\ce{C2H5NH2 + CH3COCl -> C2H5NHCOCH3 + HCl}$ (pyridine removes HCl); benzoylation with C₆H₅COCl.
- **Carbylamine test** (1° only, aliphatic and aromatic): $\ce{C6H5NH2 + CHCl3 + 3KOH -> C6H5NC + 3KCl + 3H2O}$ — foul-smelling isocyanide.
- **Nitrous acid:** 1° aliphatic → alcohol + N₂ ($\ce{RNH2 + HNO2 -> ROH + N2 + H2O}$); aniline at 273–278 K → benzenediazonium chloride.
- **Hinsberg test** (C₆H₅SO₂Cl): 1° → sulfonamide soluble in alkali; 2° → sulfonamide insoluble in alkali; 3° → no reaction.
- **Aniline ring:** –NH₂ strongly activating, o/p-directing. Bromine water → 2,4,6-tribromoaniline ($\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}$). Protect by acetylation ($\ce{C6H5NH2 + (CH3CO)2O -> C6H5NHCOCH3 + CH3COOH}$) for monosubstitution. Direct nitration gives oxidation and about 47% meta product (anilinium ion is meta-directing). Sulphonation → sulphanilic acid (zwitterion). No Friedel–Crafts reaction (salt with AlCl₃).`,
      [kt('Carbylamine test', 'Test for primary amines: warming with CHCl₃ and alcoholic KOH gives a foul-smelling isocyanide.'), kt('Hinsberg’s reagent', 'Benzenesulfonyl chloride, used to distinguish 1°, 2° and 3° amines.'), kt('Acetanilide', 'N-Phenylethanamide; the acetylated, less activated form of aniline.')],
      [],
      table(['Test', '1°', '2°', '3°'], [['Carbylamine', 'Foul smell', 'No', 'No'], ['Hinsberg product + KOH', 'Dissolves', 'Insoluble', 'No reaction']], 'Tests for amines'),
      [4],
    ),
    sec(
      '5. Diazonium salts',
      r`**Preparation:** $\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}$ at 273–278 K. Arenediazonium salts are stabilised by resonance; they are used in cold solution.

**Replacement of N₂:** Sandmeyer (CuCl/HCl, CuBr/HBr, CuCN/KCN) → ArCl, ArBr, ArCN; Gattermann (Cu + HX) → ArCl, ArBr; KI → ArI; HBF₄ then heat → ArF (Balz–Schiemann); warm water → phenol; H₃PO₂ or ethanol → arene ($\ce{C6H5N2Cl + H3PO2 + H2O -> C6H6 + N2 + H3PO3 + HCl}$).

**Coupling (N retained):** with phenol (alkaline) → 4-hydroxyazobenzene (orange); with aniline (mildly acidic) → 4-aminoazobenzene (yellow). Azo compounds are dyes.

**Importance:** introduce F, I, CN, OH and H into rings where direct substitution fails or is unselective; make azo dyes.`,
      [kt('Diazotisation', 'Conversion of a primary aromatic amine into a diazonium salt with NaNO₂ and HCl at 273–278 K.'), kt('Coupling reaction', 'Reaction of a diazonium ion with an activated arene to form an azo compound.'), kt('Sandmeyer reaction', 'Replacement of –N₂⁺ by Cl, Br or CN using copper(I) salts.')],
      [],
      flow('LR', [['a', 'C₆H₅N₂⁺Cl⁻'], ['b', 'ArCl, ArBr, ArCN'], ['c', 'ArI'], ['d', 'ArF'], ['e', 'ArOH'], ['f', 'ArH'], ['g', 'Azo dye']], [['a', 'b', 'CuX'], ['a', 'c', 'KI'], ['a', 'd', 'HBF₄, heat'], ['a', 'e', 'H₂O, warm'], ['a', 'f', 'H₃PO₂'], ['a', 'g', 'phenol or aniline']], 'Reactions of benzenediazonium chloride'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Classifying amines by the carbon atom (as for alcohols) instead of by the number of groups on nitrogen.
- Using Gabriel synthesis to make aniline.
- Saying tertiary amines are always the strongest bases (not in water).
- Claiming 2° or 3° amines give the carbylamine test.
- Forgetting to protect –NH₂ before mono-bromination or nitration of aniline.
- Warming diazonium salts when another product is intended (they give phenol).

**How marks are usually awarded**
- 1-mark items: product, reagent, class or order.
- Basicity explanations (2–3 marks): +I effect, solvation, steric effect and/or resonance, each worth a mark.
- Tests (2 marks): reagent and result for each compound.
- Conversions (2–3 marks): correct reagents and conditions (temperature for diazotisation).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'How are amines classified?', 'By the number of carbon groups on N: 1° RNH₂, 2° R₂NH, 3° R₃N.', 'definition', 1),
    fc(2, 'IUPAC name of CH₃NHCH₂CH₃?', 'N-Methylethanamine (a secondary amine).', 'example', 1),
    fc(3, 'Shape around N in amines?', 'Pyramidal (sp³ with a lone pair); C–N–C about 108°.', 'fact', 1),
    fc(4, 'Why is Fe/HCl preferred for reducing nitrobenzene?', 'FeCl₂ formed is hydrolysed, regenerating HCl, so only a little acid is needed.', 'concept', 2),
    fc(5, 'Drawback of ammonolysis?', 'Gives a mixture of 1°, 2°, 3° amines and quaternary salts.', 'concept', 2),
    fc(6, 'Gabriel synthesis gives…?', 'Pure primary aliphatic amines (not aryl amines).', 'fact', 2),
    fc(7, 'Hoffmann bromamide: ethanamide gives…?', 'Methanamine (one carbon fewer).', 'example', 2),
    fc(8, 'Nitrile reduction changes carbon count by…?', '+1 relative to the alkyl halide used to make the nitrile.', 'concept', 2),
    fc(9, 'Boiling points of isomeric amines?', '1° > 2° > 3° (fewer N–H for hydrogen bonding).', 'concept', 3),
    fc(10, 'Why are alkylamines stronger bases than ammonia?', 'The +I effect of alkyl groups increases electron density on N.', 'concept', 3),
    fc(11, 'Why is aniline a weaker base than ammonia?', 'Its lone pair is delocalised into the ring and is less available.', 'concept', 3),
    fc(12, 'Order of basicity of methyl amines in water?', '(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃.', 'fact', 3),
    fc(13, 'Why is (CH₃)₃N weaker than (CH₃)₂NH in water?', 'Its protonated form has one N–H, so it is poorly solvated; also steric crowding.', 'concept', 3),
    fc(14, 'Effect of –NO₂ on aniline’s basicity?', 'Decreases it (withdraws electron density).', 'concept', 3),
    fc(15, 'Which amines are acylated?', 'Primary and secondary (they have N–H); not tertiary.', 'fact', 4),
    fc(16, 'Carbylamine test?', '1° amine + CHCl₃ + alc. KOH → foul-smelling isocyanide.', 'definition', 4),
    fc(17, 'Hinsberg test results?', '1°: product soluble in alkali; 2°: insoluble; 3°: no reaction.', 'fact', 4),
    fc(18, '1° aliphatic amine + HNO₂?', 'Alcohol + N₂ gas (+ H₂O).', 'formula', 4),
    fc(19, 'Aniline + bromine water?', '2,4,6-Tribromoaniline (white precipitate).', 'example', 4),
    fc(20, 'Why acetylate aniline before nitration?', 'Reduces activation and prevents oxidation and meta product; gives mainly p-nitro product.', 'concept', 4),
    fc(21, 'Why does aniline not undergo Friedel–Crafts reactions?', 'It forms a salt with AlCl₃, which deactivates the ring.', 'concept', 4),
    fc(22, 'What is sulphanilic acid?', '4-Aminobenzenesulfonic acid, existing as a zwitterion.', 'definition', 4),
    fc(23, 'Conditions for diazotisation?', 'NaNO₂ + HCl at 273–278 K.', 'fact', 5),
    fc(24, 'Sandmeyer vs Gattermann?', 'Sandmeyer: Cu(I) salts (CuCl, CuBr, CuCN). Gattermann: Cu powder + HX.', 'concept', 5),
    fc(25, 'Diazonium salt → fluorobenzene?', 'HBF₄, then heat the dry fluoroborate (Balz–Schiemann).', 'formula', 5),
    fc(26, 'Diazonium salt → benzene?', 'H₃PO₂ (or ethanol).', 'formula', 5),
    fc(27, 'Diazonium salt + phenol (alkaline)?', '4-Hydroxyazobenzene, an orange azo dye.', 'example', 5),
    fc(28, 'Why are arenediazonium salts more stable than alkyl ones?', 'Resonance with the benzene ring.', 'concept', 5),
    fc(29, 'Why are diazonium salts useful in synthesis?', 'They introduce F, I, CN, OH or H into rings where direct substitution fails.', 'concept', 5),
    fc(30, 'Exam tip: amine class', 'Count groups on N, not on the carbon carrying N.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};

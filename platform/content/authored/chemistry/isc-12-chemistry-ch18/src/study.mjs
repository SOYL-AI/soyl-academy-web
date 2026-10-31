// ISC 12 Chemistry ch18 Carboxylic Acids — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Carboxylic Acids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Classification, names and physical properties',
      `Mono- (CₙH₂ₙ₊₁COOH) and dicarboxylic acids. IUPAC **-oic acid**: 2-methylpropanoic acid; diacids **-dioic acid**: ethanedioic (oxalic), propanedioic (malonic), butanedioic (succinic), hexanedioic (adipic); benzene-1,2-dicarboxylic (phthalic).

Carboxyl C sp²; **H-bonded cyclic dimers** → b.p. higher than alcohols of similar mass (ethanoic 391 K vs propan-1-ol 370 K). C1–C4 miscible with water.`,
      [kt('Dimer', 'Two acid molecules held by two hydrogen bonds.')],
      [],
      table(['Common', 'IUPAC'], [['Formic', 'Methanoic'], ['Oxalic', 'Ethanedioic'], ['Succinic', 'Butanedioic'], ['Adipic', 'Hexanedioic']], 'Table of names'),
      [1],
    ),
    sec(
      '2. Preparation',
      r`- Oxidation of 1° alcohols and aldehydes (K₂Cr₂O₇/H⁺, KMnO₄).
- Alkylbenzenes + hot alkaline KMnO₄, then H⁺ → benzoic acid (any side chain).
- Nitrile hydrolysis: $\ce{RCN + 2H2O + HCl -> RCOOH + NH4Cl}$ (one C more than RX).
- Grignard: $\ce{RMgX + CO2 -> RCOOMgX}$, then H₃O⁺ (one C more).`,
      [kt('Dry ice', 'Solid CO₂, used with Grignard reagents to make carboxylic acids.')],
      [fm(r`\ce{C6H5MgBr + CO2 -> C6H5COOMgBr}`, 'Grignard carboxylation')],
      table(['From', 'Product'], [['Propylbenzene + KMnO₄', 'Benzoic acid'], ['C₃H₇MgBr + CO₂', 'Butanoic acid'], ['C₃H₇CN + H₃O⁺', 'Butanoic acid']], 'Table of preparations'),
      [2],
    ),
    sec(
      '3. Acidity',
      `Carboxylate stabilised by **two equivalent resonance structures** (charge on two O; C–O both 127 pm) → pKa 4–5; stronger than phenols (10) and alcohols (16); decompose NaHCO₃.

**Substituents:** −I groups (F > Cl > Br; more groups; nearer –COOH) increase acidity: CCl₃COOH 0.65, CHCl₂COOH 1.26, FCH₂COOH 2.66, ClCH₂COOH 2.86; 2-, 3-, 4-chlorobutanoic 2.86, 4.05, 4.52. +I alkyl groups decrease: HCOOH 3.75 > CH₃COOH 4.76 > CH₃CH₂COOH 4.88.

**Benzoic acids:** 4-NO₂ 3.41, 4-Cl 3.98, H 4.19, 4-CH₃ 4.37, 4-OCH₃ 4.47; ortho-substituted acids usually stronger (ortho effect).`,
      [kt('Inductive effect', 'Electron withdrawal (−I) or release (+I) through σ bonds; weakens with distance.'), kt('Ortho effect', 'Most ortho-substituted benzoic acids are stronger than benzoic acid regardless of the substituent.')],
      [],
      V.carboxylate,
      [3],
    ),
    sec(
      '4. Acid reactions and derivatives',
      r`Na → H₂; NaOH → salt + H₂O; Na₂CO₃/NaHCO₃ → CO₂ (phenols do not).

**Derivatives:** PCl₅ ($\ce{RCOOH + PCl5 -> RCOCl + POCl3 + HCl}$), PCl₃ (+ H₃PO₃), SOCl₂ (+ SO₂ + HCl) → acid chlorides; P₂O₅/heat → anhydrides; R′OH + conc. H₂SO₄ → esters (reversible); NH₃ → RCOONH₄ → (heat) RCONH₂.`,
      [kt('Acid derivative', 'A compound in which the –OH of –COOH is replaced: acid chloride, anhydride, ester, amide.')],
      [fm(r`\ce{CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2}`, 'Test with NaHCO₃')],
      table(['Reagent', 'Derivative'], [['SOCl₂, PCl₅, PCl₃', 'RCOCl'], ['P₂O₅', '(RCO)₂O'], ['R′OH/H⁺', 'RCOOR′'], ['NH₃, heat', 'RCONH₂']], 'Table of derivatives'),
      [4],
    ),
    sec(
      '5. Decarboxylation, Kolbe electrolysis, HVZ and ring substitution',
      r`**Soda lime** (NaOH + CaO): $\ce{RCOONa + NaOH -> RH + Na2CO3}$ (one C fewer). **Kolbe electrolysis:** $\ce{2RCOO- -> R-R + 2CO2 + 2e-}$ at the anode (R–R). **HVZ:** α-H + X₂ (red P) → α-halo acid; excess Cl₂ → CCl₃COOH. **Benzoic acid:** –COOH deactivating, meta directing (3-nitro-, 3-bromobenzoic acid); no Friedel–Crafts.`,
      [kt('Decarboxylation', 'Removal of CO₂ from a carboxylic acid or its salt.'), kt('HVZ reaction', 'α-Halogenation of carboxylic acids with X₂ and red phosphorus.')],
      [fm(r`\ce{2CH3COONa + 2H2O -> CH3CH3 + 2CO2 + 2NaOH + H2}`, 'Kolbe electrolysis')],
      table(['Salt', 'Soda lime', 'Kolbe'], [['CH₃COONa', 'CH₄', 'C₂H₆'], ['C₂H₅COONa', 'C₂H₆', 'C₄H₁₀']], 'Table of decarboxylation products'),
      [5],
    ),
    sec(
      '6. Tests and uses',
      `All three effervesce with NaHCO₃. **Formic acid:** reduces Tollens’ (silver mirror), Fehling’s (red ppt), HgCl₂ (white Hg₂Cl₂ → grey). **Acetic acid:** neutral FeCl₃ → deep red colour (brown-red ppt on boiling); fruity ester with ethanol/H₂SO₄. **Benzoic acid:** neutral FeCl₃ → buff precipitate; sublimes.

**Uses:** formic — rubber coagulation, dyeing, tanning; acetic — vinegar, cellulose acetate, esters, solvent; benzoic — sodium benzoate preservative, medicines, dyes; adipic — nylon-6,6; terephthalic — polyester.`,
      [kt('Neutral FeCl₃ test', 'Distinguishes ethanoate (red colour) from benzoate (buff precipitate).')],
      [fm(r`\ce{HCOOH + 2HgCl2 -> Hg2Cl2 + CO2 + 2HCl}`, 'Formic acid with HgCl₂')],
      table(['Test', 'Formic', 'Acetic', 'Benzoic'], [['Tollens’', '+', '−', '−'], ['Neutral FeCl₃', '−', 'Red', 'Buff ppt']], 'Table of tests'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Ranking CH₃COOH above HCOOH in acid strength.
- Forgetting that −I effects fade with distance.
- Kolbe electrolysis of ethanoate giving methane (it gives ethane).
- Applying HVZ to benzoic acid (no α-H).

**How marks are usually awarded**
- Acid strength (2–3 marks): correct order plus named electronic effects.
- Preparations (1 mark each): reagent, condition and product; mention carbon count.
- Tests (1–2 marks): reagent and result for each acid.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'IUPAC name of adipic acid?', 'Hexanedioic acid.', 'fact', 1),
    fc(2, 'IUPAC name of oxalic acid?', 'Ethanedioic acid.', 'fact', 1),
    fc(3, 'Why do acids boil high?', 'H-bonded dimers.', 'concept', 1),
    fc(4, 'Alkylbenzene + hot KMnO₄?', 'Benzoic acid (any side chain).', 'fact', 2),
    fc(5, 'Nitrile hydrolysis gives?', 'Carboxylic acid (+ NH₄⁺).', 'fact', 2),
    fc(6, 'RMgX + CO₂, then H₃O⁺?', 'RCOOH (one more C).', 'fact', 2),
    fc(7, 'Why is RCOOH acidic?', 'Carboxylate has two equivalent resonance structures.', 'concept', 3),
    fc(8, 'pKa of ethanoic acid?', '4.76.', 'fact', 3),
    fc(9, 'Strongest: ClCH₂COOH or FCH₂COOH?', 'FCH₂COOH.', 'fact', 3),
    fc(10, 'Effect of distance on −I?', 'Weakens quickly.', 'concept', 3),
    fc(11, 'HCOOH vs CH₃COOH?', 'HCOOH stronger (no +I methyl).', 'concept', 3),
    fc(12, '4-Nitrobenzoic vs benzoic acid?', '4-Nitro stronger.', 'fact', 3),
    fc(13, 'Ortho effect?', 'Ortho-substituted benzoic acids usually stronger.', 'concept', 3),
    fc(14, 'Acid + NaHCO₃?', 'Salt + H₂O + CO₂.', 'fact', 4),
    fc(15, 'Do phenols react with NaHCO₃?', 'No.', 'fact', 4),
    fc(16, 'Acid chloride reagents?', 'PCl₅, PCl₃, SOCl₂.', 'fact', 4),
    fc(17, 'Anhydride reagent?', 'P₂O₅, heat.', 'fact', 4),
    fc(18, 'Amide from acid?', 'NH₃, then heat ammonium salt.', 'fact', 4),
    fc(19, 'By-product with PCl₃?', 'H₃PO₃.', 'fact', 4),
    fc(20, 'Soda lime composition?', 'NaOH + CaO.', 'fact', 5),
    fc(21, 'Sodium propanoate + soda lime?', 'Ethane.', 'fact', 5),
    fc(22, 'Kolbe electrolysis of ethanoate?', 'Ethane (+ CO₂ at anode).', 'fact', 5),
    fc(23, 'HVZ reagents?', 'X₂ + red P.', 'fact', 5),
    fc(24, 'HVZ on propanoic acid with Br₂?', '2-Bromopropanoic acid.', 'fact', 5),
    fc(25, 'Benzoic acid nitration?', '3-Nitrobenzoic acid.', 'fact', 5),
    fc(26, 'Why no Friedel–Crafts on benzoic acid?', 'Deactivated ring; –COOH binds AlCl₃.', 'concept', 5),
    fc(27, 'Which acid reduces Tollens’?', 'Methanoic acid.', 'fact', 6),
    fc(28, 'Neutral FeCl₃ with ethanoate?', 'Deep red colour.', 'fact', 6),
    fc(29, 'Neutral FeCl₃ with benzoate?', 'Buff precipitate.', 'fact', 6),
    fc(30, 'Use of methanoic acid?', 'Coagulating rubber latex.', 'fact', 6),
    fc(31, 'Exam tip: acid strength', 'Name the effect (−I/+I/−R/+R) and its distance.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
